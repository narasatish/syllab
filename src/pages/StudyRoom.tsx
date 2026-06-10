/**
 * Study Room — a full-screen, immersive AI focus space (free to run; AI only on
 * the actual doubt / break recap). Continuous hands-free voice tutor (Sahay),
 * Pomodoro timer + auto breaks, animated rotating quotes & study tips, rich
 * generated soundscapes, gentle distraction/idle nudges, study-time + streak
 * tracking, an optional on-device focus camera, a session goal with an
 * end-of-session check-in, and an animated break screen with an AI recap.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Pause, RotateCcw, Flame, Clock, Target, Camera, CameraOff,
  CheckCircle2, X, LogOut, Quote as QuoteIcon, Maximize, Minimize, Share2,
} from 'lucide-react';
import LiveTutor from '../components/LiveTutor';
import CoStudyPanel from '../components/CoStudyPanel';
import GoalRing from '../components/GoalRing';
import TaskChecklist, { type SessionTask } from '../components/TaskChecklist';
import BreakFlashcards from '../components/BreakFlashcards';
import { Ambience, AMBIENCE_OPTIONS, type AmbienceKey } from '../lib/ambience';
import { STUDY_QUOTES, EXAM_COUNTDOWNS, STUDY_TIPS, BREAK_IDEAS } from '../data/studyRoom';
import { mmss, daysUntil, computeNextStore, minutesToday, type StudyStore } from '../lib/studyTime';
import { recordStudyMinutes } from '../lib/studyStats';
import { fetchBreakContent, type Flashcard } from '../lib/studyRoomAi';
import { useWakeLock } from '../lib/useWakeLock';
import { cn } from '../lib/utils';

const PRESETS = [
  { label: '25 / 5', focus: 25, brk: 5 },
  { label: '50 / 10', focus: 50, brk: 10 },
  { label: '15 / 3', focus: 15, brk: 3 },
];
const STORE_KEY = 'syllab_studyroom_v1';
const IDLE_NUDGE_MS = 12 * 60 * 1000;

interface Props { onExit?: () => void; userUid?: string | null; userName?: string | null; }

function today(): string { return new Date().toISOString().split('T')[0]; }
function yesterday(): string { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; }
function loadStore(): StudyStore {
  try { const r = localStorage.getItem(STORE_KEY); if (r) return JSON.parse(r) as StudyStore; } catch { /* ignore */ }
  return { totalMinutes: 0, streak: 0, lastStudyDate: '' };
}

function speakOnce(text: string) {
  try {
    if (!window.speechSynthesis || !text.trim()) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-IN'; u.rate = 0.98;
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}

export default function StudyRoom({ onExit, userUid, userName }: Props) {
  const [goal, setGoal] = useState('');
  const [goalSet, setGoalSet] = useState(false);

  const [preset, setPreset] = useState(PRESETS[0]);
  const [phase, setPhase] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(PRESETS[0].focus * 60);
  const [running, setRunning] = useState(false);
  const [blocksDone, setBlocksDone] = useState(0);
  const [sessionFocusSec, setSessionFocusSec] = useState(0);

  const [quoteIdx, setQuoteIdx] = useState(0);
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
  const phoneShown = useRef(false);
  const taskSeq = useRef(0);

  // Keep the screen awake while actively focusing.
  useWakeLock(running && phase === 'focus');

  const ambRef = useRef<Ambience | null>(null);
  const lastActivity = useRef<number>(Date.now());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const prevFrame = useRef<Uint8ClampedArray | null>(null);
  const stillTicks = useRef(0);

  const markActivity = useCallback(() => { lastActivity.current = Date.now(); setIdleNudge(false); }, []);

  // Task checklist handlers
  const addTask = useCallback((text: string) => setTasks((t) => [...t, { id: 'task_' + (++taskSeq.current), text, done: false }]), []);
  const toggleTask = useCallback((id: string) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x))), []);
  const removeTask = useCallback((id: string) => setTasks((t) => t.filter((x) => x.id !== id)), []);

  // Start/Pause — first start shows a one-time "put your phone away" nudge.
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

  // Shareable "I studied X min today" card → native share (image) or clipboard fallback.
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

  // Quote rotation
  useEffect(() => {
    const id = window.setInterval(() => setQuoteIdx((i) => (i + 1) % STUDY_QUOTES.length), 18_000);
    return () => window.clearInterval(id);
  }, []);

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

  // On entering a BREAK: pick a break idea + (one Gemini call) AI recap + 3 flashcards.
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

  // Camera attention proctor: sample frames on-device (nothing uploaded). If there's
  // no movement for ~90s while focusing, gently nudge — you may have stepped away.
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
          const avg = diff / (cur.length / 4); // mean per-pixel red-channel change
          if (avg < 4) stillTicks.current += 1; else stillTicks.current = 0;
          if (stillTicks.current >= 18) { setIdleNudge(true); stillTicks.current = 0; } // 18×5s ≈ 90s still
        }
        prevFrame.current = cur.slice(0);
      } catch { /* ignore frame errors */ }
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
    void recordStudyMinutes(userUid, Math.round(sessionFocusSec / 60)); // syncs to Parent Dashboard if logged in
    setEnded(true);
    ambRef.current?.stop();
    setAmbience('off');
  }, [persist, sessionFocusSec, userUid]);

  const total = phase === 'focus' ? preset.focus * 60 : preset.brk * 60;
  const pct = Math.round(((total - secondsLeft) / total) * 100);
  const quote = STUDY_QUOTES[quoteIdx];
  const liveSessionMin = Math.round(sessionFocusSec / 60);
  const todayMins = minutesToday(store, today()) + liveSessionMin;

  // ── Goal gate (immersive) ────────────────────────────────────────────────
  if (!goalSet) {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 px-6 text-white">
        <Blobs />
        {onExit ? <button onClick={onExit} className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 hover:bg-white/20"><LogOut size={14} /> Exit</button> : null}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-lg text-center">
          <div className="text-5xl">📚</div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Welcome to your Study Room</h1>
          <p className="mt-2 text-sm text-white/70">A calm, full-screen focus space with a hands-free AI tutor, a timer, study sounds and gentle nudges. Free, forever.</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <label className="flex items-center justify-center gap-2 text-sm font-black"><Target size={16} className="text-emerald-300" /> What are you studying today?</label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && goal.trim()) setGoalSet(true); }}
              placeholder='e.g. "Class 10 Maths — Trigonometry"'
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm text-white placeholder-white/40 outline-none focus:border-emerald-400"
            />
            <button onClick={() => goal.trim() && setGoalSet(true)} disabled={!goal.trim()} className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-black text-white transition-opacity hover:bg-emerald-400 disabled:opacity-40">Enter the Study Room →</button>
            {savedStreak > 0 ? <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300"><Flame size={14} /> {savedStreak}-day streak — keep it alive!</p> : null}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Immersive room ────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white">
      <Blobs />
      {/* Top bar */}
      <div className="relative flex items-center justify-between gap-3 px-5 py-4">
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
          {phoneReminder ? (
            <Toast key="phone" tone="emerald" onClose={() => setPhoneReminder(false)}>📵 Put your phone in another room — out of sight is the #1 focus trick. You&apos;ve got this!</Toast>
          ) : null}
          {idleNudge ? (
            <Toast key="idle" tone="amber" onClose={() => setIdleNudge(false)}>You&apos;ve been still a while — stuck? Tap Sahay below and ask, or take a short break. 🌿</Toast>
          ) : null}
          {tip ? (
            <Toast key="tip" tone="emerald" onClose={() => setTip(null)}><strong>Remember:</strong> {tip}</Toast>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-6 px-5 pb-12 lg:grid-cols-5">
        {/* LEFT: timer + quote + ambience */}
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
            <div className="mt-5 flex justify-center border-t border-white/10 pt-5"><GoalRing minutes={todayMins} /></div>
          </div>

          {/* Session tasks */}
          <TaskChecklist tasks={tasks} onAdd={addTask} onToggle={toggleTask} onRemove={removeTask} />

          {/* Animated quote */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <QuoteIcon size={18} className="text-emerald-300/50" />
            <AnimatePresence mode="wait">
              <motion.div key={quoteIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                <p className="mt-1 text-base font-medium italic leading-relaxed text-white/90">“{quote.text}”</p>
                <p className="mt-1 text-xs font-bold text-white/50">— {quote.author}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Ambience + camera */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Study sounds</span>
              <button onClick={toggleCamera} className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold', camOn ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20')}>{camOn ? <><CameraOff size={13} /> Camera off</> : <><Camera size={13} /> Focus camera</>}</button>
            </div>
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

        {/* RIGHT: AI agent + exams */}
        <div className="space-y-6 lg:col-span-2">
          <LiveTutor onActivity={markActivity} onSpeakingChange={setAgentSpeaking} context={goal} />

          <CoStudyPanel userUid={userUid} userName={userName} goal={goal} minutes={liveSessionMin} />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-white/50">Exam countdown</p>
            <ul className="space-y-2">
              {EXAM_COUNTDOWNS.map((ex) => (
                <li key={ex.name} className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-bold text-white/80">{ex.emoji} {ex.name} <span className="text-[10px] font-medium text-white/40">(expected)</span></span>
                  <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-black text-emerald-300">{daysUntil(ex.date)}d</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur">
            <span className="font-bold text-white/80">🎧 AI recap &amp; flashcards at breaks</span>
            <input type="checkbox" checked={recapOn} onChange={(e) => setRecapOn(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
          </label>

          <button onClick={endSession} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-black text-white/80 hover:bg-white/10">End session &amp; save progress</button>
        </div>
      </div>

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

      {/* End check-in */}
      <AnimatePresence>
        {ended ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onClick={() => setEnded(false)}>
            <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-md rounded-3xl bg-white p-6 text-center text-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
              <h3 className="mt-2 text-xl font-black">Great work! 🎉</h3>
              <p className="mt-1 text-sm text-slate-600">You focused for <strong>{liveSessionMin} minutes</strong> across <strong>{blocksDone}</strong> block{blocksDone === 1 ? '' : 's'}.</p>
              {tasks.length ? <p className="mt-2 text-sm text-slate-600">Tasks done: <strong>{tasks.filter((t) => t.done).length}/{tasks.length}</strong></p> : null}
              <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">Did you finish: <strong>{goal}</strong>?</p>
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
