/**
 * Study Room — Syllab's flagship focus space. Free to run; AI is only called when
 * the student asks Sahay a question, generates flashcards, or on a break recap.
 *
 * Flow: pick Class → Subject → Chapter(s) (or all) → enter an immersive room with
 * a Pomodoro timer, calm YouTube music, a text AI tutor (Sahay), a chapter
 * checklist, AI flashcards (choose count + time per question) that remember which
 * chapters you're weak in, big flashing motivational quotes, exam countdowns and a
 * shareable end-of-session summary. Progress + weak chapters sync to the dashboard
 * and power the "revise this" nudge on the home page.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Pause, RotateCcw, Flame, Clock, Camera, CameraOff,
  CheckCircle2, X, LogOut, Quote as QuoteIcon, Maximize, Minimize, Share2,
  Layers, Sparkles, ChevronRight,
} from 'lucide-react';
import LiveTutor from '../components/LiveTutor';
import CoStudyPanel from '../components/CoStudyPanel';
import GoalRing from '../components/GoalRing';
import TaskChecklist, { type SessionTask } from '../components/TaskChecklist';
import BreakFlashcards from '../components/BreakFlashcards';
import StudyMusic from '../components/StudyMusic';
import StudyChat from '../components/StudyChat';
import FlashcardSession from '../components/FlashcardSession';
import { Ambience, AMBIENCE_OPTIONS, type AmbienceKey } from '../lib/ambience';
import { STUDY_QUOTES, EXAM_COUNTDOWNS, STUDY_TIPS, BREAK_IDEAS } from '../data/studyRoom';
import { mmss, daysUntil, computeNextStore, minutesToday, type StudyStore } from '../lib/studyTime';
import { recordStudyMinutes } from '../lib/studyStats';
import { fetchBreakContent, type Flashcard } from '../lib/studyRoomAi';
import { askTutor } from '../lib/api';
import { generateFlashcards, type QuizCard } from '../lib/studyFlashcards';
import {
  availableClasses, subjectsFor, chaptersFor, type ChapterRef,
  recordChapterResult, setChapterCompleted, loadMemory, saveLastPlan, loadLastPlan,
  dueForReview, type ChapterStat,
} from '../lib/studyPlan';
import type { ClassLevel, Subject } from '../types';
import { useWakeLock } from '../lib/useWakeLock';
import { cn } from '../lib/utils';

const PRESETS = [
  { label: '25 / 5', focus: 25, brk: 5 },
  { label: '50 / 10', focus: 50, brk: 10 },
  { label: '15 / 3', focus: 15, brk: 3 },
];
const TOUR_STEPS = [
  { emoji: '⏱️', title: 'Your focus timer', body: 'Start a Pomodoro block to study in focused sprints. Your streak, daily goal and completed blocks all live here.' },
  { emoji: '💬', title: 'Meet Sahay, your AI buddy', body: 'Ask any doubt by text — or tap “Talk to Sahay” for hands-free voice. He explains, gives examples and cheers you on.' },
  { emoji: '⚡', title: 'AI Flashcards', body: 'Generate quiz cards for your chapters. We remember what you get wrong and bring it back for spaced revision.' },
];
const STORE_KEY = 'syllab_studyroom_v1';
const IDLE_NUDGE_MS = 12 * 60 * 1000;
const FLASH_COUNTS = [10, 20, 30];
const FLASH_TIMES = [{ label: '30s', s: 30 }, { label: '60s', s: 60 }, { label: '90s', s: 90 }, { label: 'No timer', s: 0 }];
const GOAL_OPTIONS = [30, 60, 90, 120, 180];
const THEMES: Record<string, { label: string; bg: string }> = {
  aurora: { label: '🌌 Aurora', bg: 'from-slate-900 via-slate-900 to-emerald-950' },
  night: { label: '🌙 Night', bg: 'from-slate-950 via-indigo-950 to-slate-900' },
  forest: { label: '🌲 Forest', bg: 'from-slate-900 via-emerald-950 to-green-950' },
  sunset: { label: '🌅 Sunset', bg: 'from-slate-900 via-purple-950 to-rose-950' },
  ocean: { label: '🌊 Ocean', bg: 'from-slate-900 via-sky-950 to-cyan-950' },
};
const ls = {
  get: (k: string, d = '') => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

interface Props { onExit?: () => void; userUid?: string | null; userName?: string | null; }

function today(): string { return new Date().toISOString().split('T')[0]; }
function yesterday(): string { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; }
function loadStore(): StudyStore {
  try { const r = localStorage.getItem(STORE_KEY); if (r) return JSON.parse(r) as StudyStore; } catch { /* ignore */ }
  return { totalMinutes: 0, streak: 0, lastStudyDate: '' };
}
/** Check if TTS is available on this browser/device. */
function isTtsAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.speechSynthesis) return false;
  const voices = window.speechSynthesis.getVoices() || [];
  return voices.length > 0;
}

function speakOnce(text: string) {
  try {
    if (!window.speechSynthesis || !text.trim()) return;
    const u = new SpeechSynthesisUtterance(text); u.lang = 'en-IN'; u.rate = 0.98;
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}

export default function StudyRoom({ onExit, userUid, userName }: Props) {
  // ── Setup (Class → Subject → Chapters) ─────────────────────────────────────
  const [entered, setEntered] = useState(false);
  const [classLevel, setClassLevel] = useState<ClassLevel | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const classes = useMemo(() => availableClasses(), []);
  const subjects = useMemo(() => (classLevel ? subjectsFor(classLevel) : []), [classLevel]);
  const chapterList = useMemo(() => (classLevel && subject ? chaptersFor(classLevel, subject) : []), [classLevel, subject]);
  const selectedChapters = useMemo(() => chapterList.filter((c) => selectedIds.has(c.id)), [chapterList, selectedIds]);

  // Pre-fill from the last plan.
  useEffect(() => {
    const last = loadLastPlan();
    if (last) { setClassLevel(last.classLevel); setSubject(last.subject); setSelectedIds(new Set(last.chapterIds)); }
  }, []);

  const goal = useMemo(() => {
    if (!classLevel || !subject) return '';
    const titles = selectedChapters.map((c) => c.title);
    const chapPart = titles.length ? ` — ${titles.slice(0, 4).join(', ')}${titles.length > 4 ? ` +${titles.length - 4} more` : ''}` : '';
    return `Class ${classLevel} ${subject}${chapPart}`;
  }, [classLevel, subject, selectedChapters]);

  // ── Timer / session state ───────────────────────────────────────────────────
  const [preset, setPreset] = useState(PRESETS[0]);
  const [phase, setPhase] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(PRESETS[0].focus * 60);
  const [running, setRunning] = useState(false);
  const [blocksDone, setBlocksDone] = useState(0);
  const [sessionFocusSec, setSessionFocusSec] = useState(0);

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [flashQuote, setFlashQuote] = useState<typeof STUDY_QUOTES[number] | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [breakIdea, setBreakIdea] = useState(BREAK_IDEAS[0]);
  const [recap, setRecap] = useState('');
  const [recapOn, setRecapOn] = useState(true);
  const [ambience, setAmbience] = useState<AmbienceKey>('off');
  const [distractions, setDistractions] = useState(0);
  const [idleNudge, setIdleNudge] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [ended, setEnded] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [store] = useState<StudyStore>(loadStore);
  const [savedStreak, setSavedStreak] = useState(store.streak);
  const [tasks, setTasks] = useState<SessionTask[]>([]);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [phoneReminder, setPhoneReminder] = useState(false);
  // Onboarding coachmark tour (first entry only).
  const [tourStep, setTourStep] = useState(-1);
  // Session goal + reward.
  const [flashAnswered, setFlashAnswered] = useState(0);
  const goalBlocks = 2;
  const goalCards = 20;
  const [goalCelebrated, setGoalCelebrated] = useState(false);

  // ── Chapter completion + flashcards ─────────────────────────────────────────
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [flashCount, setFlashCount] = useState(10);
  const [flashTime, setFlashTime] = useState(60);
  const [generating, setGenerating] = useState(false);
  const [quizCards, setQuizCards] = useState<QuizCard[] | null>(null);
  const [flashMsg, setFlashMsg] = useState('');
  const [dueChapters, setDueChapters] = useState<ChapterStat[]>([]);
  const [reviseGen, setReviseGen] = useState(false);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());
  const activeFlashRef = useRef<ChapterRef[]>([]);

  // Personalisation: daily goal, theme, quick notes, custom exam dates.
  const [dailyGoal, setDailyGoal] = useState<number>(() => Number(ls.get('syllab_sr_goal', '120')) || 120);
  const [theme, setTheme] = useState<string>(() => (THEMES[ls.get('syllab_sr_theme', 'aurora')] ? ls.get('syllab_sr_theme', 'aurora') : 'aurora'));
  const [notes, setNotes] = useState<string>(() => ls.get('syllab_sr_notes', ''));
  const [notesSummary, setNotesSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const [customExams, setCustomExams] = useState<{ name: string; date: string }[]>(() => {
    try { return JSON.parse(ls.get('syllab_sr_exams', '[]')) as { name: string; date: string }[]; } catch { return []; }
  });
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  useEffect(() => { ls.set('syllab_sr_goal', String(dailyGoal)); }, [dailyGoal]);
  useEffect(() => { ls.set('syllab_sr_theme', theme); }, [theme]);
  useEffect(() => { ls.set('syllab_sr_notes', notes); }, [notes]);
  useEffect(() => { ls.set('syllab_sr_exams', JSON.stringify(customExams)); }, [customExams]);

  const addExam = useCallback(() => {
    if (!examName.trim() || !examDate) return;
    setCustomExams((x) => [...x, { name: examName.trim(), date: examDate }]);
    setExamName(''); setExamDate('');
  }, [examName, examDate]);

  const summariseNotes = useCallback(async () => {
    if (!notes.trim() || summarizing) return;
    setSummarizing(true); setNotesSummary('');
    try {
      const r = await askTutor(`A student wrote these study notes/doubts: "${notes.slice(0, 1500)}". Summarise the key points and answer any doubts clearly in 3-5 short bullet lines for a school student.`);
      setNotesSummary((r || '').trim());
    } catch { setNotesSummary('Could not summarise right now — please try again.'); }
    finally { setSummarizing(false); }
  }, [notes, summarizing]);

  const phoneShown = useRef(false);
  const taskSeq = useRef(0);
  useWakeLock(running && phase === 'focus');
  const ambRef = useRef<Ambience | null>(null);
  const lastActivity = useRef<number>(Date.now());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const prevFrame = useRef<Uint8ClampedArray | null>(null);
  const stillTicks = useRef(0);

  const markActivity = useCallback(() => { lastActivity.current = Date.now(); setIdleNudge(false); }, []);
  const addTask = useCallback((text: string) => setTasks((t) => [...t, { id: 'task_' + (++taskSeq.current), text, done: false }]), []);
  const toggleTask = useCallback((id: string) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x))), []);
  const removeTask = useCallback((id: string) => setTasks((t) => t.filter((x) => x.id !== id)), []);

  const toggleRun = useCallback(() => {
    setRunning((r) => {
      const next = !r;
      if (next && !phoneShown.current) { phoneShown.current = true; setPhoneReminder(true); window.setTimeout(() => setPhoneReminder(false), 6500); }
      return next;
    });
    markActivity();
  }, [markActivity]);

  const toggleFullscreen = useCallback(() => {
    try { if (document.fullscreenElement) void document.exitFullscreen?.(); else void document.documentElement.requestFullscreen?.(); }
    catch { /* ignore */ }
  }, []);
  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const shareProgress = useCallback(async () => {
    const mins = Math.round(sessionFocusSec / 60);
    const text = `I just focused for ${mins} min in the Syllab Study Room 📚🔥 ${savedStreak}-day streak! Study free at syllab.in`;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 600; canvas.height = 315;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const g = ctx.createLinearGradient(0, 0, 600, 315);
        g.addColorStop(0, '#0f172a'); g.addColorStop(1, '#064e3b');
        ctx.fillStyle = g; ctx.fillRect(0, 0, 600, 315);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px system-ui, sans-serif'; ctx.fillText('📚 Syllab Study Room', 40, 72);
        ctx.font = 'bold 76px system-ui, sans-serif'; ctx.fillStyle = '#34d399'; ctx.fillText(`${mins} min`, 40, 170);
        ctx.font = '24px system-ui, sans-serif'; ctx.fillStyle = '#e2e8f0'; ctx.fillText(`focused today · 🔥 ${savedStreak}-day streak`, 40, 214);
        ctx.font = '20px system-ui, sans-serif'; ctx.fillStyle = '#94a3b8'; ctx.fillText('Study free at syllab.in', 40, 272);
      }
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      const file = blob ? new File([blob], 'syllab-study.png', { type: 'image/png' }) : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav = navigator as any;
      if (file && nav.canShare?.({ files: [file] })) await nav.share({ files: [file], text });
      else if (nav.share) await nav.share({ text, url: 'https://syllab.in' });
      else { await navigator.clipboard?.writeText(text); }
    } catch { /* cancelled or unsupported */ }
  }, [sessionFocusSec, savedStreak]);

  // Timer tick
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) { if (phase === 'focus') setSessionFocusSec((f) => f + 1); return s - 1; }
        if (phase === 'focus') { setBlocksDone((b) => b + 1); setPhase('break'); return preset.brk * 60; }
        setPhase('focus'); return preset.focus * 60;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, phase, preset]);

  // Quote rotation (persistent card)
  useEffect(() => {
    const id = window.setInterval(() => setQuoteIdx((i) => (i + 1) % STUDY_QUOTES.length), 18_000);
    return () => window.clearInterval(id);
  }, []);

  // Big flashing motivational quote — every ~2 min while focusing.
  useEffect(() => {
    if (!entered) return;
    const id = window.setInterval(() => {
      if (!running || phase !== 'focus') return;
      setFlashQuote(STUDY_QUOTES[Math.floor(Math.random() * STUDY_QUOTES.length)]);
      window.setTimeout(() => setFlashQuote(null), 5200);
    }, 120_000);
    return () => window.clearInterval(id);
  }, [entered, running, phase]);

  // Study-tip popups while focusing
  useEffect(() => {
    if (!running || phase !== 'focus') return;
    const id = window.setInterval(() => {
      setTip(STUDY_TIPS[Math.floor(Math.random() * STUDY_TIPS.length)]);
      window.setTimeout(() => setTip(null), 11_000);
    }, 7 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [running, phase]);

  // Idle nudge
  useEffect(() => {
    if (!running || phase !== 'focus') return;
    const id = window.setInterval(() => { if (Date.now() - lastActivity.current > IDLE_NUDGE_MS) setIdleNudge(true); }, 30_000);
    return () => window.clearInterval(id);
  }, [running, phase]);

  // Distraction counter + activity tracking
  useEffect(() => {
    const onVis = () => { if (document.hidden && running && phase === 'focus') setDistractions((d) => d + 1); };
    const onAct = () => markActivity();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('keydown', onAct);
    window.addEventListener('mousemove', onAct);
    return () => { document.removeEventListener('visibilitychange', onVis); window.removeEventListener('keydown', onAct); window.removeEventListener('mousemove', onAct); };
  }, [running, phase, markActivity]);

  // Break recap + flashcards (one Gemini call)
  useEffect(() => {
    if (phase !== 'break') { setRecap(''); setCards([]); return; }
    setBreakIdea(BREAK_IDEAS[Math.floor(Math.random() * BREAK_IDEAS.length)]);
    if (!recapOn || !goal || sessionFocusSec < 60) return;
    let cancelled = false;
    (async () => {
      const { recap: r, cards: c } = await fetchBreakContent(goal);
      if (cancelled) return;
      if (r) { setRecap(r); speakOnce(r); }
      if (c.length) setCards(c);
    })();
    return () => { cancelled = true; };
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ambience lifecycle
  useEffect(() => { ambRef.current = new Ambience(); return () => { ambRef.current?.dispose(); ambRef.current = null; }; }, []);
  const chooseAmbience = useCallback((key: AmbienceKey) => { setAmbience(key); void ambRef.current?.play(key); }, []);

  // Camera (optional, local-only)
  const toggleCamera = useCallback(async () => {
    if (camOn) { streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null; if (videoRef.current) videoRef.current.srcObject = null; setCamOn(false); return; }
    try { const st = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false }); streamRef.current = st; if (videoRef.current) videoRef.current.srcObject = st; setCamOn(true); } catch { /* denied */ }
  }, [camOn]);
  useEffect(() => () => { streamRef.current?.getTracks().forEach((t) => t.stop()); }, []);

  // Camera attention proctor
  useEffect(() => {
    if (!camOn || !running || phase !== 'focus') { prevFrame.current = null; stillTicks.current = 0; return; }
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 24;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const id = window.setInterval(() => {
      const v = videoRef.current;
      if (!v || !ctx || v.readyState < 2) return;
      try {
        ctx.drawImage(v, 0, 0, 32, 24);
        const cur = ctx.getImageData(0, 0, 32, 24).data;
        const prev = prevFrame.current;
        if (prev) {
          let diff = 0;
          for (let i = 0; i < cur.length; i += 4) diff += Math.abs(cur[i] - prev[i]);
          const avg = diff / (cur.length / 4);
          if (avg < 4) stillTicks.current += 1; else stillTicks.current = 0;
          if (stillTicks.current >= 18) { setIdleNudge(true); stillTicks.current = 0; }
        }
        prevFrame.current = cur.slice(0);
      } catch { /* ignore */ }
    }, 5000);
    return () => window.clearInterval(id);
  }, [camOn, running, phase]);

  const persist = useCallback((focusSec: number) => {
    const minutes = Math.round(focusSec / 60);
    if (minutes <= 0) return;
    const next = computeNextStore(loadStore(), minutes, today(), yesterday());
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setSavedStreak(next.streak);
  }, []);

  const reset = useCallback(() => { setRunning(false); setPhase('focus'); setSecondsLeft(preset.focus * 60); }, [preset]);
  const applyPreset = useCallback((p: typeof PRESETS[number]) => { setPreset(p); setPhase('focus'); setSecondsLeft(p.focus * 60); setRunning(false); }, []);
  const endSession = useCallback(() => {
    setRunning(false);
    persist(sessionFocusSec);
    void recordStudyMinutes(userUid, Math.round(sessionFocusSec / 60));
    setEnded(true);
    ambRef.current?.stop();
    setAmbience('off');
  }, [persist, sessionFocusSec, userUid]);

  // Toggle chapter completed (and remember it).
  const toggleChapterDone = useCallback((ch: ChapterRef) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      const done = !next.has(ch.id);
      if (done) next.add(ch.id); else next.delete(ch.id);
      setChapterCompleted(ch, done, today());
      return next;
    });
  }, []);

  // Generate AI flashcards for the selected chapters.
  const startFlashcards = useCallback(async () => {
    if (!classLevel || !subject) return;
    const chs = selectedChapters.length ? selectedChapters : chapterList.slice(0, 1);
    if (!chs.length) { setFlashMsg('Pick at least one chapter first.'); return; }
    activeFlashRef.current = chs;
    setGenerating(true); setFlashMsg('');
    const cardsOut = await generateFlashcards({
      classLevel: String(classLevel), subject: String(subject),
      chapterTitles: chs.map((c) => c.title), count: flashCount,
    });
    setGenerating(false);
    if (!cardsOut.length) { setFlashMsg('Could not generate flashcards — please try again.'); return; }
    setQuizCards(cardsOut);
  }, [classLevel, subject, selectedChapters, chapterList, flashCount]);

  // Spaced repetition: generate flashcards for the chapters that are due today.
  const reviseDue = useCallback(async () => {
    if (!dueChapters.length) return;
    const chs: ChapterRef[] = dueChapters.map((c) => ({ id: c.id, title: c.title, subject: c.subject as ChapterRef['subject'], classLevel: c.classLevel as ChapterRef['classLevel'] }));
    activeFlashRef.current = chs;
    setReviseGen(true); setFlashMsg('');
    const cardsOut = await generateFlashcards({
      classLevel: String(chs[0].classLevel), subject: String(chs[0].subject),
      chapterTitles: chs.map((c) => c.title), count: Math.min(20, Math.max(10, chs.length * 5)),
    });
    setReviseGen(false);
    if (cardsOut.length) setQuizCards(cardsOut);
  }, [dueChapters]);

  const onFlashFinish = useCallback((correct: number, total: number) => {
    // Record the session score against the active chapter set so weakness + the
    // spaced-revision schedule update.
    const chs = activeFlashRef.current.length ? activeFlashRef.current : (selectedChapters.length ? selectedChapters : chapterList.slice(0, 1));
    for (const ch of chs) recordChapterResult(ch, correct, total, today());
    setDueChapters(dueForReview(today())); // refresh the due list
    setFlashAnswered((a) => a + total); // session-goal progress
  }, [selectedChapters, chapterList]);

  // ── Onboarding tour (first entry) + session goal + Vibes presets ────────────
  useEffect(() => {
    if (!entered) return;
    try { if (!localStorage.getItem('syllab_sr_tour_v1')) setTourStep(0); } catch { /* ignore */ }
  }, [entered]);
  const endTour = useCallback(() => { setTourStep(-1); try { localStorage.setItem('syllab_sr_tour_v1', '1'); } catch { /* ignore */ } }, []);
  useEffect(() => {
    if (tourStep < 0) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') endTour(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tourStep, endTour]);

  // Reward when the session goal is met.
  useEffect(() => {
    if (!goalCelebrated && blocksDone >= goalBlocks && flashAnswered >= goalCards) setGoalCelebrated(true);
  }, [blocksDone, flashAnswered, goalCelebrated]);

  // One-tap "Vibes" = theme + ambient sound together.
  const applyVibe = useCallback((themeKey: string, amb: AmbienceKey) => {
    setTheme(themeKey); chooseAmbience(amb);
  }, [chooseAmbience]);

  const total = phase === 'focus' ? preset.focus * 60 : preset.brk * 60;
  const pct = Math.round(((total - secondsLeft) / total) * 100);
  const quote = STUDY_QUOTES[quoteIdx];
  const liveSessionMin = Math.round(sessionFocusSec / 60);
  const todayMins = minutesToday(store, today()) + liveSessionMin;
  const doneCount = selectedChapters.filter((c) => completedIds.has(c.id)).length;

  const enterRoom = () => {
    if (!classLevel || !subject) return;
    saveLastPlan({ classLevel, subject, chapterIds: Array.from(selectedIds) });
    // Seed completion ticks from memory.
    const mem = loadMemory();
    const seeded = new Set<string>();
    for (const id of selectedIds) if (mem.chapters[id]?.completed) seeded.add(id);
    setCompletedIds(seeded);
    setDueChapters(dueForReview(today()));
    setEntered(true);
  };

  const toggleChapterSelect = (id: string) => setSelectedIds((prev) => {
    const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next;
  });
  const selectAllChapters = () => setSelectedIds(new Set(chapterList.map((c) => c.id)));
  const clearChapters = () => setSelectedIds(new Set());

  // ── Setup gate (Class → Subject → Chapters) ────────────────────────────────
  if (!entered) {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col items-center overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 px-5 py-10 text-white">
        <Blobs />
        {onExit ? <button onClick={onExit} className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 hover:bg-white/20"><LogOut size={14} /> Exit</button> : null}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-2xl">
          <div className="text-center">
            <div className="text-5xl">📚</div>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Set up your Study Room</h1>
            <p className="mt-2 text-sm text-white/70">Pick what you&apos;re preparing — we&apos;ll make flashcards, track your weak chapters and keep you focused.</p>
            {savedStreak > 0 ? <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300"><Flame size={14} /> {savedStreak}-day streak — keep it alive!</p> : null}
          </div>

          {/* Class */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">1 · Your class</p>
            <div className="flex flex-wrap gap-2">
              {classes.map((c) => (
                <button key={c} onClick={() => { setClassLevel(c); setSubject(null); setSelectedIds(new Set()); }}
                  className={cn('rounded-full px-3.5 py-1.5 text-sm font-bold', classLevel === c ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20')}>Class {c}</button>
              ))}
            </div>
          </div>

          {/* Subject */}
          {classLevel ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">2 · Subject</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button key={s} onClick={() => { setSubject(s); setSelectedIds(new Set()); }}
                    className={cn('rounded-full px-3.5 py-1.5 text-sm font-bold', subject === s ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20')}>{s}</button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Chapters */}
          {classLevel && subject ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest text-white/50">3 · Chapters {selectedIds.size > 0 ? `(${selectedIds.size} selected)` : '(optional)'}</p>
                <div className="flex gap-2">
                  <button onClick={selectAllChapters} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200 hover:bg-emerald-500/30">All chapters</button>
                  {selectedIds.size > 0 ? <button onClick={clearChapters} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70 hover:bg-white/20">Clear</button> : null}
                </div>
              </div>
              <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                {chapterList.map((c) => {
                  const on = selectedIds.has(c.id);
                  return (
                    <button key={c.id} onClick={() => toggleChapterSelect(c.id)}
                      className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm', on ? 'bg-emerald-500/20 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10')}>
                      <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-md border', on ? 'border-emerald-400 bg-emerald-500' : 'border-white/30')}>{on ? <CheckCircle2 size={14} /> : null}</span>
                      <span className="flex-1">{c.title}</span>
                    </button>
                  );
                })}
                {chapterList.length === 0 ? <p className="text-sm text-white/50">No chapters listed for this subject yet — you can still start a focus session.</p> : null}
              </div>
              <p className="mt-2 text-[11px] text-white/40">Tip: pick the chapters for your test (e.g. quarterly exam) — your flashcards will cover only those.</p>
            </div>
          ) : null}

          <button onClick={enterRoom} disabled={!classLevel || !subject}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-black text-white transition-opacity hover:bg-emerald-400 disabled:opacity-40">
            Enter the Study Room <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Immersive room ──────────────────────────────────────────────────────────
  return (
    <div className={cn('fixed inset-0 z-[60] overflow-y-auto bg-gradient-to-br text-white', THEMES[theme]?.bg || THEMES.aurora.bg)}>
      <Blobs />
      {/* Top bar — sticky so Exit is always reachable while scrolling */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/5 bg-slate-950/40 px-5 py-4 backdrop-blur-md">
        <div className="min-w-0">
          <p className="truncate text-sm font-black">📚 {goal}</p>
          <p className="flex items-center gap-2 text-xs text-white/60"><Flame size={12} className="text-amber-300" /> {savedStreak}d streak · {Math.round(store.totalMinutes / 60)}h total</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={toggleFullscreen} title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 hover:bg-white/20">{fullscreen ? <Minimize size={14} /> : <Maximize size={14} />}</button>
          <button onClick={onExit} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 hover:bg-white/20"><LogOut size={14} /> Exit</button>
        </div>
      </div>

      {/* Nudges */}
      <div className="relative mx-auto max-w-5xl px-5">
        <AnimatePresence>
          {phoneReminder ? <Toast key="phone" tone="emerald" onClose={() => setPhoneReminder(false)}>📵 Put your phone in another room — out of sight is the #1 focus trick. You&apos;ve got this!</Toast> : null}
          {idleNudge ? <Toast key="idle" tone="amber" onClose={() => setIdleNudge(false)}>You&apos;ve been still a while — stuck? Ask Sahay on the right, or take a short break. 🌿</Toast> : null}
          {tip ? <Toast key="tip" tone="emerald" onClose={() => setTip(null)}><strong>Remember:</strong> {tip}</Toast> : null}
        </AnimatePresence>
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-6 px-5 pb-12 lg:grid-cols-5">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-3">
          {/* Timer */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest">
              {phase === 'focus' ? <><Clock size={13} /> Focus</> : <>☕ Break</>}
            </div>
            <motion.div key={`${phase}-${Math.floor(secondsLeft / 60)}`} initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="my-2 text-7xl font-black tabular-nums tracking-tight">{mmss(secondsLeft)}</motion.div>
            <div className="mx-auto mb-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
              <motion.div className={cn('h-full rounded-full', phase === 'focus' ? 'bg-emerald-400' : 'bg-amber-400')} animate={{ width: `${pct}%` }} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <button onClick={toggleRun} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-black hover:bg-emerald-400">{running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}</button>
              <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-3 text-sm font-black hover:bg-white/20"><RotateCcw size={16} /> Reset</button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {PRESETS.map((p) => <button key={p.label} onClick={() => applyPreset(p)} className={cn('rounded-full px-3 py-1 text-xs font-bold', preset.label === p.label ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20')}>{p.label}</button>)}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-bold text-white/60">
              <span>✅ {blocksDone} blocks</span><span>⏱️ {liveSessionMin} min</span>
              {distractions > 0 ? <span className="text-amber-300">👀 {distractions} switches</span> : null}
            </div>
            <div className="mt-5 flex flex-col items-center gap-2 border-t border-white/10 pt-5">
              <GoalRing minutes={todayMins} goalMinutes={dailyGoal} />
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/50">
                Goal:
                {GOAL_OPTIONS.map((g) => (
                  <button key={g} onClick={() => setDailyGoal(g)} className={cn('rounded-full px-2 py-0.5', dailyGoal === g ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20')}>{g >= 60 ? `${g / 60}h` : `${g}m`}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Session goal + reward */}
          <div className={cn('rounded-2xl border p-4 backdrop-blur', goalCelebrated ? 'border-emerald-400/40 bg-emerald-500/15' : 'border-white/10 bg-white/5')}>
            {goalCelebrated ? (
              <div className="text-center">
                <p className="text-base font-black text-emerald-200">🎉 Session goal smashed!</p>
                <p className="mt-1 text-xs text-white/70">{goalBlocks} focus blocks + {goalCards} flashcards done — brilliant work!</p>
                <button onClick={() => void shareProgress()} className="mx-auto mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-black text-white hover:bg-emerald-400">
                  <Share2 size={14} /> Share my win
                </button>
              </div>
            ) : (
              <>
                <p className="mb-3 text-xs font-black uppercase tracking-widest text-white/50">🎯 Today&apos;s goal</p>
                {([['Focus blocks', blocksDone, goalBlocks], ['Flashcards', flashAnswered, goalCards]] as const).map(([lbl, val, tgt]) => (
                  <div key={lbl} className="mb-2.5 last:mb-0">
                    <div className="mb-1 flex items-center justify-between text-xs font-bold text-white/70">
                      <span>{lbl}</span><span className="tabular-nums">{Math.min(val, tgt)}/{tgt}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${Math.min(100, (val / tgt) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Spaced repetition — chapters due for revision today */}
          {dueChapters.length ? (
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 backdrop-blur">
              <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-200">📆 Due for revision ({dueChapters.length})</p>
              <p className="mt-1 text-xs text-white/60">Spaced repetition keeps weak chapters in your memory. Quick revise these now:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {dueChapters.map((c) => (
                  <span key={c.id} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/80">{c.title}</span>
                ))}
              </div>
              <button onClick={() => void reviseDue()} disabled={reviseGen} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-2.5 text-sm font-black text-white hover:bg-amber-400 disabled:opacity-50">
                {reviseGen ? 'Preparing revision…' : <>Revise these now <ChevronRight size={15} /></>}
              </button>
            </div>
          ) : null}

          {/* Chapter checklist + flashcards */}
          {selectedChapters.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/50"><Layers size={13} /> Your chapters ({doneCount}/{selectedChapters.length} done)</span>
              </div>
              <div className="max-h-40 space-y-1.5 overflow-y-auto pr-1">
                {selectedChapters.map((c) => {
                  const done = completedIds.has(c.id);
                  return (
                    <button key={c.id} onClick={() => toggleChapterDone(c)} className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm', done ? 'bg-emerald-500/20 text-white/90 line-through decoration-emerald-300/60' : 'bg-white/5 text-white/80 hover:bg-white/10')}>
                      <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-md border', done ? 'border-emerald-400 bg-emerald-500' : 'border-white/30')}>{done ? <CheckCircle2 size={14} /> : null}</span>
                      <span className="flex-1">{c.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Flashcard launcher */}
              <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3">
                <p className="flex items-center gap-1.5 text-sm font-black text-emerald-200"><Sparkles size={14} /> AI Flashcards for these chapters</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-white/50">Cards:</span>
                  {FLASH_COUNTS.map((n) => <button key={n} onClick={() => setFlashCount(n)} className={cn('rounded-full px-2.5 py-1 font-bold', flashCount === n ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20')}>{n}</button>)}
                  <span className="ml-2 text-white/50">Time / Q:</span>
                  {FLASH_TIMES.map((t) => <button key={t.label} onClick={() => setFlashTime(t.s)} className={cn('rounded-full px-2.5 py-1 font-bold', flashTime === t.s ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20')}>{t.label}</button>)}
                </div>
                <button onClick={() => void startFlashcards()} disabled={generating} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-sm font-black text-white hover:bg-emerald-400 disabled:opacity-50">
                  {generating ? 'Generating flashcards…' : <>Start {flashCount} flashcards <ChevronRight size={15} /></>}
                </button>
                {flashMsg ? <p className="mt-1.5 text-[11px] font-bold text-amber-300">{flashMsg}</p> : null}
              </div>
            </div>
          ) : null}

          {/* Session tasks */}
          <TaskChecklist tasks={tasks} onAdd={addTask} onToggle={toggleTask} onRemove={removeTask} />

          {/* Persistent quote (bigger) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <QuoteIcon size={20} className="text-emerald-300/50" />
            <AnimatePresence mode="wait">
              <motion.div key={quoteIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                <p className="mt-1 text-xl font-bold italic leading-relaxed text-white/95 sm:text-2xl">“{quote.text}”</p>
                <p className="mt-2 text-sm font-bold text-white/50">— {quote.author}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Music + soundscapes + camera */}
          <StudyMusic />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Ambient sounds (optional)</span>
              <button onClick={toggleCamera} className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold', camOn ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20')}>{camOn ? <><CameraOff size={13} /> Camera off</> : <><Camera size={13} /> Focus camera</>}</button>
            </div>
            {/* TTS unavailable notice */}
            {ttsUnavailable && (
              <div className="mb-3 flex items-start gap-2 rounded-xl bg-slate-700/50 px-3 py-2 text-slate-200">
                <span className="text-sm font-medium">🔇 Audio isn't available on this browser/device.</span>
                <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-400 hover:text-slate-100"><X size={14} /></button>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {AMBIENCE_OPTIONS.map((o) => <button key={o.key} onClick={() => chooseAmbience(o.key)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', ambience === o.key ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20')}>{o.emoji} {o.label}</button>)}
            </div>
            {camOn ? (
              <div className="mt-3">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-[220px] rounded-xl border border-white/10" />
                <p className="mt-1 text-[11px] text-white/40">🔒 Camera stays on your device — never recorded or uploaded.</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 lg:col-span-2">
          {/* Text AI tutor bot */}
          <StudyChat context={goal} />

          {/* Hands-free voice tutor (optional) */}
          <LiveTutor onActivity={markActivity} onSpeakingChange={setAgentSpeaking} context={goal} />

          <CoStudyPanel userUid={userUid} userName={userName} goal={goal} minutes={liveSessionMin} />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">Exam countdown</p>
            <ul className="space-y-2">
              {EXAM_COUNTDOWNS.map((ex) => (
                <li key={ex.name} className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-bold text-white/80">{ex.emoji} {ex.name} <span className="text-[11px] font-medium text-white/40">(expected)</span></span>
                  <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-black text-emerald-300">{daysUntil(ex.date)}d</span>
                </li>
              ))}
              {customExams.map((ex, i) => (
                <li key={`c-${i}`} className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-bold text-white/80">📌 {ex.name}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="shrink-0 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-black text-amber-300">{daysUntil(ex.date)}d</span>
                    <button onClick={() => setCustomExams((x) => x.filter((_, j) => j !== i))} className="text-white/30 hover:text-white/70"><X size={13} /></button>
                  </span>
                </li>
              ))}
            </ul>
            {/* Add your own exam date */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="Your exam (e.g. Unit Test)" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-emerald-400" />
              <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-2 py-1.5 text-xs text-white outline-none focus:border-emerald-400" />
              <button onClick={addExam} disabled={!examName.trim() || !examDate} className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-400 disabled:opacity-40">Add</button>
            </div>
          </div>

          {/* Quick notes (+ AI summary) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">📝 Quick notes &amp; doubts</p>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Jot doubts or key points while you study…" className="w-full resize-y rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-emerald-400" />
            <button onClick={() => void summariseNotes()} disabled={summarizing || !notes.trim()} className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20 disabled:opacity-40">
              {summarizing ? 'Summarising…' : '✨ Summarise & answer with AI'}
            </button>
            {notesSummary ? <p className="mt-2 rounded-xl bg-emerald-500/10 p-3 text-xs leading-relaxed text-emerald-100">{notesSummary}</p> : null}
          </div>

          {/* Focus theme */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">🎚️ Vibes — set the mood in one tap</p>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                ['🌧️', 'Rainy Night', 'night', 'rain'],
                ['📚', 'Library', 'forest', 'focus'],
                ['🎧', 'Lo-Fi', 'aurora', 'lofi'],
                ['🌊', 'Ocean Calm', 'ocean', 'ocean'],
              ] as const).map(([emoji, label, th, amb]) => (
                <button
                  key={label}
                  onClick={() => applyVibe(th, amb as AmbienceKey)}
                  className={cn(
                    'flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors',
                    theme === th && ambience === amb ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20',
                  )}
                >
                  <span aria-hidden>{emoji}</span> {label}
                </button>
              ))}
            </div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">🎨 Focus theme</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button key={key} onClick={() => setTheme(key)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', theme === key ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20')}>{t.label}</button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur">
            <span className="font-bold text-white/80">🎧 AI recap &amp; flashcards at breaks</span>
            <input type="checkbox" checked={recapOn} onChange={(e) => setRecapOn(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
          </label>

          <button onClick={endSession} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-black text-white/80 hover:bg-white/10">End session &amp; save progress</button>
        </div>
      </div>

      {/* Big flashing quote */}
      <AnimatePresence>
        {flashQuote ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-[75] flex items-center justify-center px-8">
            <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.05, opacity: 0 }} transition={{ duration: 0.5 }} className="relative max-w-3xl text-center">
              <p className="text-3xl font-black leading-tight text-white sm:text-5xl">“{flashQuote.text}”</p>
              <p className="mt-4 text-base font-bold text-emerald-300 sm:text-lg">— {flashQuote.author}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Break overlay */}
      <AnimatePresence>
        {phase === 'break' && running ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-amber-950/80 px-6 text-center backdrop-blur-md">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md">
              <div className="text-5xl">☕</div>
              <h2 className="mt-3 text-3xl font-black">Break time — {mmss(secondsLeft)}</h2>
              <p className="mt-2 text-lg text-amber-100">{breakIdea}</p>
              {recap ? <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm italic text-white/90">{recap}</p> : null}
              <BreakFlashcards cards={cards} />
              <p className="mt-4 text-xs text-white/50">{agentSpeaking ? 'Sahay is speaking…' : 'Your timer will resume automatically.'}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Flashcard session */}
      {quizCards ? (
        <FlashcardSession
          cards={quizCards}
          perCardSeconds={flashTime}
          title={goal}
          onFinish={onFlashFinish}
          onClose={() => setQuizCards(null)}
        />
      ) : null}

      {/* End check-in */}
      <AnimatePresence>
        {ended ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onClick={() => setEnded(false)}>
            <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-md rounded-3xl bg-white p-6 text-center text-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
              <h3 className="mt-2 text-xl font-black">Great work! 🎉</h3>
              <p className="mt-1 text-sm text-slate-600">You focused for <strong>{liveSessionMin} minutes</strong> across <strong>{blocksDone}</strong> block{blocksDone === 1 ? '' : 's'}.</p>
              {selectedChapters.length ? <p className="mt-2 text-sm text-slate-600">Chapters ticked: <strong>{doneCount}/{selectedChapters.length}</strong></p> : null}
              <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">Keep it up with <strong>{goal}</strong>!</p>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-black text-amber-600"><Flame size={16} /> {savedStreak}-day streak</p>
              <button onClick={() => void shareProgress()} className="mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-black text-white hover:bg-slate-700"><Share2 size={14} /> Share my progress</button>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEnded(false)} className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-black text-slate-700 hover:bg-slate-200">Back to room</button>
                {onExit ? <button onClick={onExit} className="flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-black text-white hover:bg-emerald-400">Done</button> : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Onboarding coachmark tour (first entry only) */}
      <AnimatePresence>
        {tourStep >= 0 && tourStep < TOUR_STEPS.length ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-end justify-center bg-slate-950/70 p-5 backdrop-blur-sm sm:items-center"
            role="dialog" aria-modal="true" aria-label="Study Room guide" onClick={endTour}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl"
            >
              <div className="text-4xl" aria-hidden>{TOUR_STEPS[tourStep].emoji}</div>
              <h3 className="mt-2 text-lg font-black text-white">{TOUR_STEPS[tourStep].title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{TOUR_STEPS[tourStep].body}</p>
              <div className="mt-4 flex items-center justify-center gap-1.5">
                {TOUR_STEPS.map((_, i) => <span key={i} className={cn('h-1.5 rounded-full transition-all', i === tourStep ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/20')} />)}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button onClick={endTour} className="min-h-[44px] px-2 text-xs font-bold text-white/50 hover:text-white/80">Skip</button>
                <button
                  onClick={() => (tourStep + 1 < TOUR_STEPS.length ? setTourStep(tourStep + 1) : endTour())}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-400"
                >
                  {tourStep + 1 < TOUR_STEPS.length ? <>Next <ChevronRight size={15} /></> : 'Got it!'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity }} />
      <motion.div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 22, repeat: Infinity }} />
    </div>
  );
}

function Toast({ tone, onClose, children }: { tone: 'amber' | 'emerald'; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className={cn('mb-3 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm backdrop-blur', tone === 'amber' ? 'border-amber-300/30 bg-amber-400/10 text-amber-100' : 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100')}>
      <div className="flex-1 leading-relaxed">{children}</div>
      <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100"><X size={16} /></button>
    </motion.div>
  );
}
