import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  Loader2,
  PlayCircle,
  Save,
  Target,
  XCircle,
  Zap,
  Bot,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { cn } from '../lib/utils';
import { SYLLABUS } from '../data/syllabus';
import { Difficulty, Question } from '../types';
import { recordMistake, saveQuizSession, getPausedSession, QuizSession } from '../lib/firebase';
import ReactMarkdown from 'react-markdown';
import LoginRequiredModal from '../components/LoginRequiredModal';

// =====================================================================
// API base — works in both Vite and CRA
// =====================================================================
const API_BASE: string = (() => {
  if (typeof window !== 'undefined' && (window as any).__PADHAI_API__) {
    return (window as any).__PADHAI_API__;
  }
  try {
    // @ts-ignore - Vite import.meta.env
    const viteUrl = import.meta?.env?.VITE_API_BASE;
    if (viteUrl) return viteUrl;
  } catch { /* not Vite */ }
  return 'http://localhost:5000';
})();

// =====================================================================
// LocalStorage question bank — 50 per difficulty per chapter
// =====================================================================
type Diff = 'easy' | 'medium' | 'hard';
type Bank = { easy: Question[]; medium: Question[]; hard: Question[] };
const TARGET_PER_DIFF = 50;
const bankKey = (chapterId: string) => `padhai:bank:${chapterId}`;

function loadBank(chapterId: string): Bank {
  try {
    const raw = localStorage.getItem(bankKey(chapterId));
    if (!raw) return { easy: [], medium: [], hard: [] };
    const parsed = JSON.parse(raw);
    return {
      easy: Array.isArray(parsed.easy) ? parsed.easy : [],
      medium: Array.isArray(parsed.medium) ? parsed.medium : [],
      hard: Array.isArray(parsed.hard) ? parsed.hard : [],
    };
  } catch {
    return { easy: [], medium: [], hard: [] };
  }
}

function saveBank(chapterId: string, bank: Bank) {
  try {
    localStorage.setItem(bankKey(chapterId), JSON.stringify(bank));
  } catch (e) {
    console.warn('localStorage quota hit, bank not persisted', e);
  }
}

function bankCounts(bank: Bank) {
  return {
    easy: bank.easy.length,
    medium: bank.medium.length,
    hard: bank.hard.length,
    total: bank.easy.length + bank.medium.length + bank.hard.length,
  };
}

// =====================================================================
// Parallel AI fetch — splits into chunks of 10, fires concurrently
// =====================================================================
async function fetchAIBatch(
  classLevel: string,
  subject: string,
  chapterTitle: string,
  chapterId: string,
  difficulty: Difficulty | Diff,
  count: number,
  onProgress?: (done: number, total: number) => void,
): Promise<Question[]> {
  const CHUNK = 10;
  const chunks: number[] = [];
  let remaining = count;
  while (remaining > 0) {
    chunks.push(Math.min(CHUNK, remaining));
    remaining -= CHUNK;
  }

  let done = 0;
  const results = await Promise.all(
    chunks.map(async (size) => {
      try {
        const res = await fetch(`${API_BASE}/api/questions/batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            classLevel, subject, chapter: chapterTitle, chapterId, difficulty, count: size,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        done++;
        onProgress?.(done, chunks.length);
        return Array.isArray(data.questions) ? data.questions : [];
      } catch (err) {
        done++;
        onProgress?.(done, chunks.length);
        console.error('Chunk failed:', err);
        return [];
      }
    }),
  );
  return results.flat();
}

interface ArenaPageProps {
  questions: Question[];
  practiceConfig: Record<string, unknown> | null;
  clearConfig: () => void;
  currentUser: FirebaseUser | null;
  onSessionComplete: (summary: {
    completedChapters: string[];
    lastChapter: string;
    scoreGained: number;
    xpGained: number;
  }) => Promise<void> | void;
}

type GameMode = 'config' | 'loading' | 'quiz' | 'result';

export default function ArenaPage({
  questions,
  practiceConfig,
  clearConfig,
  currentUser,
  onSessionComplete,
}: ArenaPageProps) {
  const [mode, setMode] = useState<GameMode>('config');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadProgress, setLoadProgress] = useState({ done: 0, total: 0 });
  const [isPrefilling, setIsPrefilling] = useState(false);

  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [timePerQuestion, setTimePerQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [selClass, setSelClass] = useState('5');
  const [selSubject, setSelSubject] = useState('Mathematics');
  const [selChapter, setSelChapter] = useState('');
  const [selCount, setSelCount] = useState('10');
  const [pausedSession, setPausedSession] = useState<QuizSession | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pinnedChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem('syllab_pinned_chapters');
    return saved ? JSON.parse(saved) : [];
  });

  // Bank state — drives the "X/50 easy" status display
  const [bank, setBank] = useState<Bank>({ easy: [], medium: [], hard: [] });
  const counts = bankCounts(bank);

  // Reload bank whenever selected chapter / class / subject changes
  useEffect(() => {
    if (selChapter) {
      setBank(loadBank(selChapter));
    } else {
      const first = SYLLABUS.find((c) => c.classLevel === selClass && c.subject === selSubject);
      setBank(first ? loadBank(first.id) : { easy: [], medium: [], hard: [] });
    }
  }, [selChapter, selClass, selSubject]);

  useEffect(() => {
    const checkPaused = async () => {
      if (currentUser) {
        const session = await getPausedSession(currentUser.uid);
        if (session && (session as Record<string, unknown>).active !== false) {
          setPausedSession(session);
        }
      }
    };
    checkPaused();
  }, [currentUser]);

  const resumeSession = () => {
    if (!pausedSession) return;
    setQuizQuestions(pausedSession.questions);
    setCurrentIndex(pausedSession.currentIndex);
    setScore(pausedSession.score);
    setIsTimerEnabled(pausedSession.config.isTimerEnabled as boolean);
    setTimePerQuestion(pausedSession.config.timePerQuestion as number);
    setMode('quiz');
    setPausedSession(null);
  };

  useEffect(() => {
    if (practiceConfig) {
      if (practiceConfig.classLevel) setSelClass(practiceConfig.classLevel as string);
      if (practiceConfig.subject) setSelSubject(practiceConfig.subject as string);
      if (practiceConfig.chapterId) setSelChapter(practiceConfig.chapterId as string);
      setSelectedDifficulty('mixed');
      setSelCount('150');
      clearConfig();
    }
  }, [clearConfig, practiceConfig]);

  useEffect(() => {
    if (mode === 'quiz' && isTimerEnabled && !isAnswered && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (isTimerEnabled && timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
      setSelectedAnswer(-1);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isAnswered, isTimerEnabled, mode, timeLeft]);

  useEffect(() => {
    const submitSession = async () => {
      if (mode !== 'result' || quizQuestions.length === 0 || isSubmittingResult) return;
      setIsSubmittingResult(true);
      const completedChapters = Array.from(new Set(quizQuestions.map((q) => q.chapter_id)));
      const lastChapter = quizQuestions[quizQuestions.length - 1]?.chapter_id ?? '';
      await onSessionComplete({
        completedChapters,
        lastChapter,
        scoreGained: score * 10,
        xpGained: score * 10,
      });
    };
    void submitSession();
  }, [isSubmittingResult, mode, onSessionComplete, quizQuestions, score]);

  // =====================================================================
  // Helpers
  // =====================================================================
  const resolveChapter = () => {
    if (selChapter) return SYLLABUS.find((c) => c.id === selChapter);
    return SYLLABUS.find((c) => c.classLevel === selClass && c.subject === selSubject);
  };

  // Build a session: cache first, AI fills the deficit
  const buildSession = async (
    requestedDifficulty: Difficulty,
    requestedCount: number,
  ): Promise<Question[]> => {
    const chapter = resolveChapter();
    if (!chapter) throw new Error('No valid chapter selected.');

    const currentBank = loadBank(chapter.id);

    let pool: Question[] = [];
    if (requestedDifficulty === 'mixed') {
      pool = [...currentBank.easy, ...currentBank.medium, ...currentBank.hard];
    } else {
      pool = [...currentBank[requestedDifficulty as Diff]];
    }
    pool = pool.sort(() => 0.5 - Math.random());

    // Cache hit ⚡
    if (pool.length >= requestedCount) {
      return pool.slice(0, requestedCount);
    }

    // Fill deficit
    const deficit = requestedCount - pool.length;
    setLoadProgress({ done: 0, total: Math.ceil(deficit / 10) });

    const fetched = await fetchAIBatch(
      chapter.classLevel,
      chapter.subject,
      chapter.title,
      chapter.id,
      requestedDifficulty,
      deficit,
      (done, total) => setLoadProgress({ done, total }),
    );

    // Persist new questions to bank (capped at TARGET_PER_DIFF per bucket)
    const updated: Bank = { ...currentBank };
    fetched.forEach((q) => {
      const d = ((q.difficulty || 'easy').toLowerCase() as Diff);
      const bucket = updated[d] || updated.easy;
      if (bucket.length < TARGET_PER_DIFF) bucket.push(q);
    });
    saveBank(chapter.id, updated);
    setBank(updated);

    return [...pool, ...fetched].slice(0, requestedCount);
  };

  const startQuiz = async (overrideCount?: number, overrideDifficulty?: Difficulty) => {
    setLoadError(null);

    const chapter = resolveChapter();
    if (!chapter) {
      window.alert('Please select a class, subject and chapter first.');
      return;
    }

    const wantCount = overrideCount ?? parseInt(selCount, 10);
    const wantDiff = overrideDifficulty ?? selectedDifficulty;

    // Skip loading screen if cache already has enough
    const currentBank = loadBank(chapter.id);
    const cachedFor =
      wantDiff === 'mixed'
        ? currentBank.easy.length + currentBank.medium.length + currentBank.hard.length
        : currentBank[wantDiff as Diff].length;

    if (cachedFor < wantCount) setMode('loading');

    try {
      const session = await buildSession(wantDiff, wantCount);
      if (session.length === 0) throw new Error('Could not generate any questions. Check backend.');

      setQuizQuestions(session);
      setCurrentIndex(0);
      setScore(0);
      setMode('quiz');
      setIsAnswered(false);
      setSelectedAnswer(null);
      setIsSubmittingResult(false);
      setTimeLeft(timePerQuestion * 60);
    } catch (err) {
      console.error('[startQuiz]', err);
      setLoadError((err as Error).message);
      setMode('config');
    }
  };

  // Build the full 150-question bank for current chapter (background)
  const prefillBank = async () => {
    const chapter = resolveChapter();
    if (!chapter || isPrefilling) return;

    setIsPrefilling(true);
    setLoadError(null);
    try {
      const currentBank = loadBank(chapter.id);
      const tasks: Array<{ d: Diff; n: number }> = [];
      (['easy', 'medium', 'hard'] as Diff[]).forEach((d) => {
        const need = TARGET_PER_DIFF - currentBank[d].length;
        if (need > 0) tasks.push({ d, n: need });
      });

      if (tasks.length === 0) {
        setIsPrefilling(false);
        return;
      }

      const results = await Promise.all(
        tasks.map((t) =>
          fetchAIBatch(chapter.classLevel, chapter.subject, chapter.title, chapter.id, t.d, t.n)
            .then((arr) => ({ d: t.d, arr })),
        ),
      );

      const updated = loadBank(chapter.id);
      results.forEach(({ d, arr }) => {
        arr.forEach((q) => {
          if (updated[d].length < TARGET_PER_DIFF) updated[d].push(q);
        });
      });
      saveBank(chapter.id, updated);
      setBank(updated);
    } catch (e) {
      console.error('prefill failed', e);
      setLoadError((e as Error).message);
    } finally {
      setIsPrefilling(false);
    }
  };

  const handleAnswer = async (optionIndex: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    const cq = quizQuestions[currentIndex];
    if (optionIndex === cq.correct_index) {
      setScore((p) => p + 1);
      return;
    }
    if (currentUser && optionIndex >= 0) {
      try {
        await recordMistake(currentUser.uid, cq, cq.options[optionIndex] ?? '');
      } catch (e) { console.error(e); }
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((p) => p + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(timePerQuestion * 60);
      return;
    }
    setMode('result');
  };

  const handleSaveAndExit = async () => {
    if (!currentUser) { setIsLoginModalOpen(true); return; }
    try {
      await saveQuizSession(currentUser.uid, {
        questions: quizQuestions, currentIndex, score,
        config: { isTimerEnabled, timePerQuestion },
      });
      setMode('config');
    } catch (e) { console.error(e); }
  };

  const availableClasses = useMemo(
    () => Array.from(new Set(SYLLABUS.map((c) => c.classLevel))).sort((a, b) => Number(a) - Number(b)),
    [],
  );
  const availableSubjects = useMemo(
    () => Array.from(new Set(SYLLABUS.filter((c) => c.classLevel === selClass).map((c) => c.subject))).sort(),
    [selClass],
  );
  useEffect(() => {
    if (!availableSubjects.length || availableSubjects.includes(selSubject)) return;
    setSelSubject(availableSubjects[0]);
    setSelChapter('');
  }, [availableSubjects, selSubject]);

  const filteredChapters = SYLLABUS.filter(
    (c) => c.classLevel === selClass && c.subject === selSubject,
  );

  return (
    <div className="space-y-8 pb-20">
      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        message="Login to Syllab to save your practice session and exit. Your progress will be waiting for you later!"
      />

      {pausedSession && mode === 'config' && (
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <PlayCircle size={24} />
            </div>
            <div>
              <h4 className="font-black text-slate-900">Resume Previous Session?</h4>
              <p className="text-xs font-semibold text-slate-500">You have a saved practice session at question {pausedSession.currentIndex + 1}.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPausedSession(null)} className="px-6 py-2 rounded-xl text-slate-400 font-bold hover:bg-slate-100 transition-all text-sm">Discard</button>
            <button onClick={resumeSession} className="flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
              <Zap size={14} fill="currentColor" className="text-primary" /> Continue Practice
            </button>
          </div>
        </div>
      )}

      {/* ============== LOADING ============== */}
      {mode === 'loading' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl py-24 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary text-white shadow-2xl shadow-emerald-500/30">
            <Loader2 size={48} className="animate-spin" />
          </div>
          <h2 className="mb-4 text-4xl font-black tracking-tight">Please wait, page is loading…</h2>
          <p className="mb-2 font-medium text-slate-500">Preparing fresh exam-pattern questions for you.</p>
          {loadProgress.total > 0 && (
            <div className="mt-8 mx-auto max-w-md">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(loadProgress.done / loadProgress.total) * 100}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                {loadProgress.done} of {loadProgress.total} batches ready
              </p>
            </div>
          )}
        </motion.div>
      ) : null}

      {/* ============== CONFIG ============== */}
      {mode === 'config' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
          <section className="relative mb-12 overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary-light to-primary p-12 text-white shadow-2xl md:p-20">
            <div className="absolute inset-0 z-0 opacity-10">
              <img src="https://picsum.photos/seed/tactical/1200/600?blur=4" alt="Arena background" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                <Target size={14} fill="currentColor" /> Strategic Command
              </div>
              <h1 className="text-5xl font-black leading-tight tracking-tighter md:text-7xl">
                Master the <span className="italic">Arena</span>
              </h1>
              <p className="max-w-xl text-xl font-medium leading-relaxed text-white/80">
                Real exam-pattern questions from NCERT, JEE, NEET, BITSAT, VIT &amp; EAMCET — generated fresh by AI for every session.
              </p>
            </div>
          </section>

          <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid grid-cols-1 gap-8 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20 md:grid-cols-2 md:p-12">
              {/* Class */}
              <div className="space-y-3">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Class Level</label>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                  {availableClasses.map((value) => (
                    <button key={value} type="button" onClick={() => { setSelClass(value); setSelChapter(''); }}
                      className={cn(
                        'rounded-2xl py-3 text-sm font-black transition-all',
                        selClass === value ? 'bg-primary text-white shadow-xl shadow-violet-500/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100',
                      )}>
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Subject Arena</label>
                <select value={selSubject} onChange={(e) => { setSelSubject(e.target.value); setSelChapter(''); }}
                  className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 font-bold text-primary outline-none transition-all focus:ring-2 focus:ring-primary/20">
                  {availableSubjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Chapter */}
              <div className="space-y-3 md:col-span-2">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Chapter Focus</label>
                <select value={selChapter} onChange={(e) => setSelChapter(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 font-bold text-primary outline-none transition-all focus:ring-2 focus:ring-primary/20">
                  <option value="">All Chapters</option>
                  {pinnedChapters.length > 0 && (
                    <optgroup label="Pinned Chapters">
                      {SYLLABUS.filter((c) => pinnedChapters.includes(c.id)).map((c) => (
                        <option key={`p-${c.id}`} value={c.id}>{c.title} ({c.subject} Class {c.classLevel})</option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label="Syllabus Chapters">
                    {filteredChapters.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </optgroup>
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Difficulty</label>
                <div className="flex gap-2">
                  {(['easy', 'medium', 'hard', 'mixed'] as Difficulty[]).map((d) => (
                    <button key={d} type="button" onClick={() => setSelectedDifficulty(d)}
                      className={cn(
                        'flex-1 rounded-2xl border-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all',
                        selectedDifficulty === d ? 'border-primary bg-primary text-white shadow-lg' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200',
                      )}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count + Practice More */}
              <div className="space-y-3">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Question Count</label>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-5 gap-2">
                    {['10', '20', '30', '40', '50'].map((c) => (
                      <button key={c} type="button" onClick={() => setSelCount(c)}
                        className={cn(
                          'rounded-xl py-3 text-xs font-bold transition-all',
                          selCount === c ? 'border-2 border-orange-200 bg-orange-50 text-orange-600' : 'border-2 border-transparent bg-slate-50 text-slate-400',
                        )}>
                        {c}
                      </button>
                    ))}
                  </div>

                  {/* Practice Extra Questions — 50 / 100 / 150 */}
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[50, 100, 150].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => { setSelCount(String(n)); setSelectedDifficulty('mixed'); }}
                        className={cn(
                          'flex items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all',
                          selCount === String(n) && selectedDifficulty === 'mixed' && 'border-primary bg-primary/15',
                        )}
                      >
                        <Crown size={12} fill="currentColor" />
                        Practice +{n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="space-y-3">
                <label className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Timer</label>
                <div className="flex gap-2 rounded-2xl bg-slate-50 p-2">
                  <button type="button" onClick={() => setIsTimerEnabled(true)}
                    className={cn('flex-1 rounded-xl py-1.5 text-[9px] font-black uppercase tracking-wider transition-all', isTimerEnabled ? 'bg-primary text-white' : 'text-slate-400')}>
                    Enabled
                  </button>
                  <button type="button" onClick={() => setIsTimerEnabled(false)}
                    className={cn('flex-1 rounded-xl py-1.5 text-[9px] font-black uppercase tracking-wider transition-all', !isTimerEnabled ? 'bg-primary text-white' : 'text-slate-400')}>
                    Disabled
                  </button>
                </div>
                {isTimerEnabled && (
                  <div className="mt-2 flex items-center gap-2 px-2">
                    <Clock size={14} className="text-slate-300" />
                    <input type="range" min="0.5" max="10" step="0.5" value={timePerQuestion}
                      onChange={(e) => setTimePerQuestion(parseFloat(e.target.value))}
                      className="flex-1 accent-primary" />
                    <span className="whitespace-nowrap text-[10px] font-black">{timePerQuestion}m/q</span>
                  </div>
                )}
              </div>

              {/* Start Quiz */}
              <button type="button" onClick={() => void startQuiz()}
                className="mt-4 flex w-full items-center justify-center gap-4 rounded-3xl bg-primary px-12 py-6 font-black uppercase tracking-widest text-white shadow-2xl shadow-blue-900/20 transition-all hover:bg-primary-light md:col-span-2">
                <Zap size={24} fill="currentColor" />
                <span className="text-lg">Start Quiz</span>
                <ChevronRight size={20} />
              </button>

              {loadError && (
                <div className="md:col-span-2 rounded-2xl bg-rose-50 border border-rose-100 p-4 text-center">
                  <p className="text-xs font-semibold text-rose-600">{loadError}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* ============== QUIZ ============== */}
      {mode === 'quiz' && quizQuestions[currentIndex] ? (
        <div className="mx-auto max-w-4xl py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex gap-4">
              <button type="button" onClick={() => setMode('config')} className="text-sm font-bold text-slate-400 transition-colors hover:text-primary">Exit</button>
              <button type="button" onClick={() => void handleSaveAndExit()} className="flex items-center gap-2 text-sm font-black text-primary transition-all hover:gap-3 group">
                <Save size={16} /> Save & Exit Session
              </button>
            </div>
            <div className="flex items-center gap-6">
              {isTimerEnabled && (
                <div className={cn('flex items-center gap-2 rounded-xl border-2 px-4 py-2 font-mono text-lg font-black',
                  timeLeft < 15 ? 'animate-pulse border-rose-100 bg-rose-50 text-rose-500' : 'border-slate-100 bg-white text-primary')}>
                  <Clock size={20} /> {timeLeft}s
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="h-3 w-48 overflow-hidden rounded-full border border-slate-100 bg-slate-100 p-0.5">
                  <motion.div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }} />
                </div>
                <span className="text-[10px] font-black text-slate-400 tabular-nums">{currentIndex + 1} / {quizQuestions.length}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[3rem] border-none bg-white p-10 md:p-14 shadow-2xl shadow-emerald-500/5">
              <div className="absolute left-10 top-10 flex gap-2">
                <span className="rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  {(quizQuestions[currentIndex] as any).source || 'AI Generated'}
                </span>
              </div>
              <div className="absolute right-10 top-10 flex gap-2">
                <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Zap size={12} className="text-amber-500" fill="currentColor" /> {quizQuestions[currentIndex].difficulty}
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-12 text-2xl font-black leading-snug md:text-4xl text-slate-900 tracking-tight">
                  {quizQuestions[currentIndex].question_text}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {quizQuestions[currentIndex].options.map((option, index) => (
                    <button key={`${currentIndex}-${index}`} type="button" disabled={isAnswered}
                      onClick={() => void handleAnswer(index)}
                      className={cn(
                        'group flex h-full w-full items-center justify-between rounded-3xl border-2 p-6 text-left transition-all relative overflow-hidden',
                        !isAnswered && 'border-slate-50 bg-slate-50/30 hover:border-primary hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5',
                        isAnswered && index === quizQuestions[currentIndex].correct_index && 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-500/10',
                        isAnswered && selectedAnswer === index && index !== quizQuestions[currentIndex].correct_index && 'border-rose-500 bg-rose-50 text-rose-900 shadow-lg shadow-rose-500/10',
                        isAnswered && index !== quizQuestions[currentIndex].correct_index && selectedAnswer !== index && 'border-slate-50 opacity-40',
                      )}>
                      <div className="flex items-center gap-5 relative z-10">
                        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all',
                          !isAnswered ? 'bg-white text-slate-400 group-hover:bg-primary group-hover:text-white' : 'bg-slate-900/5')}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-bold text-sm md:text-base leading-relaxed">{option}</span>
                      </div>
                      <div className="relative z-10">
                        {isAnswered && index === quizQuestions[currentIndex].correct_index ? <CheckCircle2 className="text-emerald-500" size={28} fill="white" /> : null}
                        {isAnswered && selectedAnswer === index && index !== quizQuestions[currentIndex].correct_index ? <XCircle className="text-rose-500" size={28} fill="white" /> : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isAnswered || (isTimerEnabled && timeLeft === 0) ? (
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="overflow-hidden rounded-[3rem] bg-slate-900 shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <div className="p-10 md:p-14 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                          <Bot size={20} />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">AI Reasoning &amp; Insight</h4>
                      </div>
                      {isTimerEnabled && selectedAnswer === -1 ? (
                        <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-black uppercase tracking-widest border border-rose-500/20">
                          Time Limit Exceeded
                        </span>
                      ) : null}
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Step-by-step Solution</p>
                        <div className="prose prose-invert prose-emerald max-w-none">
                          <div className="text-lg font-medium leading-relaxed text-slate-200">
                            <ReactMarkdown>{quizQuestions[currentIndex].explanation}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={nextQuestion}
                      className="flex w-full items-center justify-center gap-3 rounded-[2rem] bg-primary px-10 py-6 font-black text-white transition-all hover:bg-emerald-400 hover:-translate-y-1 shadow-xl shadow-emerald-500/20 group/next">
                      <span className="uppercase tracking-[0.3em] text-sm">
                        {currentIndex === quizQuestions.length - 1 ? 'Finalize Result' : 'Advance to Next'}
                      </span>
                      <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      ) : null}

      {/* ============== RESULT ============== */}
      {mode === 'result' ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-xl py-12 text-center">
          <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[3rem] bg-primary text-white shadow-2xl shadow-violet-500/40">
            <Crown size={64} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30" />
          </div>
          <h2 className="mb-4 text-5xl font-black tracking-tight">Quiz Complete</h2>
          <p className="mb-12 font-medium text-slate-500">
            {isSubmittingResult ? 'Saving your score and progress...' : 'Your progress has been merged into your study profile.'}
          </p>
          <div className="mb-12 grid grid-cols-2 gap-6">
            <div className="rounded-3xl border border-slate-50 bg-white p-6 shadow-lg">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Accuracy</div>
              <div className="text-4xl font-black text-primary">{quizQuestions.length ? Math.round((score / quizQuestions.length) * 100) : 0}%</div>
            </div>
            <div className="rounded-3xl border border-slate-50 bg-white p-6 shadow-lg">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">XP Gained</div>
              <div className="text-4xl font-black text-emerald-500">+{score * 10}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button type="button" onClick={() => setMode('config')} className="btn-primary flex-1 rounded-2xl py-5 text-lg">Start New Session</button>
            <button type="button"
              onClick={() => { setMode('config'); setSelChapter(quizQuestions[0]?.chapter_id || ''); }}
              className="btn-secondary flex-1 rounded-2xl py-5 text-lg">
              Practice This Chapter More
            </button>
          </div>
          {!currentUser ? (
            <p className="mt-6 text-sm font-semibold text-slate-500">Sign in to store your results, completed chapters, and mistakes in Firestore.</p>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}