/**
 * EnglishLab — Dedicated English learning page.
 *
 * 8 tabs: Daily Challenge | AI Speaking | Reading | Listening | Writing |
 *         Grammar | Vocabulary | Stories
 *
 * Level-aware (Basic/Intermediate/Advanced) via dropdown.
 * All AI calls route through backend (no client-side keys).
 */
import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { recordLearningActivity } from '../lib/progressTracker';
import {
  BookOpen, Calendar, ChevronLeft, ChevronRight, Flame, GraduationCap,
  Headphones, Loader2, Mic, PenLine, Shuffle, Sparkles, Volume2,
} from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { getReadingByLevel, pickRandom, type Level, type ReadingPassage } from '../data/english/readingData';
import { getListeningByLevel, type ListeningTest } from '../data/english/listeningData';
import { getWritingByLevel, type WritingPrompt } from '../data/english/writingData';
import { getGrammarByLevel } from '../data/english/grammarData';
import { getVocabByLevel, getWordOfDay } from '../data/english/vocabData';
import { getStoriesByLevel } from '../data/english/storiesData';
import { askTutor, API_URL } from '../lib/api';

const VoiceEnglishTeacher = lazy(() => import('../components/VoiceEnglishTeacher'));

type Tab = 'daily' | 'speaking' | 'reading' | 'listening' | 'writing' | 'grammar' | 'vocab' | 'stories';

interface EnglishLabProps {
  currentUser: FirebaseUser | null;
   
  setTab?: (tab: string) => void;
}

const LEVELS: { id: Level; label: string; range: string }[] = [
  { id: 'basic', label: 'Basic', range: 'Classes 1–4 · Pre-A1/A1' },
  { id: 'intermediate', label: 'Intermediate', range: 'Classes 5–7 · A2/B1' },
  { id: 'advanced', label: 'Advanced', range: 'Classes 8–10 · B2/C1' },
];

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'daily',     label: 'Daily Challenge', icon: Calendar },
  { id: 'speaking',  label: 'AI Speaking',     icon: Mic },
  { id: 'reading',   label: 'Reading',         icon: BookOpen },
  { id: 'listening', label: 'Listening',       icon: Headphones },
  { id: 'writing',   label: 'Writing',         icon: PenLine },
  { id: 'grammar',   label: 'Grammar',         icon: GraduationCap },
  { id: 'vocab',     label: 'Vocabulary',      icon: Sparkles },
  { id: 'stories',   label: 'Stories',         icon: BookOpen },
];

export default function EnglishLab({ currentUser }: EnglishLabProps) {
  const [activeTab, setActiveTab] = useState<Tab>('daily');
  const [level, setLevel] = useState<Level>(() => {
    return (localStorage.getItem('syllab_english_level') as Level) || 'intermediate';
  });

  useEffect(() => {
    localStorage.setItem('syllab_english_level', level);
  }, [level]);

  // Prewarm the backend when Speaking tab becomes active so the Render
  // dyno is already awake by the time the user taps the mic.
  useEffect(() => {
    if (activeTab !== 'speaking') return;
    fetch(`${API_URL}/api/ai/health`, { method: 'GET' }).catch(() => {/* ignore */});
  }, [activeTab]);

  return (
    <main className="space-y-6 pb-12">
      <SEO
        title="English Lab — AI Speaking, Daily Challenge, Grammar & Vocabulary | Syllab.in"
        description="Practice English daily with AI voice conversation, grammar challenges, reading passages, vocabulary builder and story-based activities. Free for CBSE Classes 1–10 students."
        keywords="English speaking practice India, AI English teacher free, CBSE English grammar, English vocabulary builder, daily English challenge, NCERT English Class 1 to 10, reading comprehension practice, English voice practice"
        url="https://syllab.in/english"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'English Lab — AI-Powered English Learning',
          description: 'Free AI-powered English learning for CBSE students. Daily challenges, AI speaking practice, grammar lessons, reading passages, and vocabulary builder.',
          url: 'https://syllab.in/english',
          provider: { '@type': 'Organization', name: 'Syllab.in', url: 'https://syllab.in' },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          educationalLevel: 'Class 1 to 10',
          inLanguage: 'en',
          hasCourseInstance: [
            { '@type': 'CourseInstance', name: 'Daily English Challenge', courseMode: 'online' },
            { '@type': 'CourseInstance', name: 'AI Speaking Practice', courseMode: 'online' },
            { '@type': 'CourseInstance', name: 'Grammar Lessons', courseMode: 'online' },
          ],
        }}
      />

      {/* SEO cross-link → English grammar topic pages */}
      <a href="/english-grammar" className="flex items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-left transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/40">
        <span className="text-sm font-black text-indigo-900 dark:text-indigo-200">📖 Free English grammar lessons — tenses, parts of speech, voice, narration, essay & letter writing</span>
        <span className="shrink-0 text-sm font-black text-indigo-700 dark:text-indigo-300">Explore grammar →</span>
      </a>

      {/* Hero */}
      <section className="rounded-[2rem] bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 p-7 text-white shadow-2xl shadow-indigo-500/20 sm:p-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
              <BookOpen size={12} /> English Lab
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Master English, Step by Step</h1>
            <p className="mt-3 text-sm font-medium leading-relaxed text-white/85 sm:text-base">
              Daily challenge, AI speaking practice, reading, listening, writing, grammar, vocabulary, and stories — all aligned with CBSE/NCERT for Classes 1–10.
            </p>
          </div>
          {/* Level selector */}
          <div className="shrink-0 rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/70">Your Level</p>
            <div className="flex flex-col gap-1.5">
              {LEVELS.map((lv) => (
                <button
                  key={lv.id}
                  type="button"
                  onClick={() => setLevel(lv.id)}
                  className={cn(
                    'rounded-xl px-4 py-2 text-left text-xs font-black transition-all',
                    level === lv.id ? 'bg-white text-indigo-700' : 'text-white/80 hover:bg-white/10',
                  )}
                >
                  <div>{lv.label}</div>
                  <div className="text-[11px] font-bold opacity-70">{lv.range}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <section className="overflow-x-auto rounded-2xl bg-white p-2 shadow-md shadow-slate-200/40">
        <div className="flex min-w-max gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-500 hover:bg-slate-100',
                )}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${level}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'daily'     && <DailyChallenge level={level} currentUser={currentUser} />}
          {activeTab === 'speaking'  && (
            <Suspense fallback={<LoadingCard label="Loading AI Speaking Teacher..." />}>
              <VoiceEnglishTeacher context={`English ${level} level practice`} />
            </Suspense>
          )}
          {activeTab === 'reading'   && <ReadingSection level={level} />}
          {activeTab === 'listening' && <ListeningSection level={level} />}
          {activeTab === 'writing'   && <WritingSection level={level} />}
          {activeTab === 'grammar'   && <GrammarSection level={level} />}
          {activeTab === 'vocab'     && <VocabSection level={level} />}
          {activeTab === 'stories'   && <StoriesSection level={level} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-white p-12 shadow text-sm font-bold text-slate-400">
      <Loader2 size={20} className="animate-spin" /> {label}
    </div>
  );
}

/* ─── DAILY CHALLENGE ──────────────────────────────────────────────────── */
const DAILY_LS_KEY = 'syllab_english_daily';

function DailyChallenge({ level, currentUser }: { level: Level; currentUser: FirebaseUser | null }) {
  const todayKey = new Date().toDateString();
  const word = getWordOfDay(level);
  const grammar = getGrammarByLevel(level)[0]; // first grammar lesson as daily tip
  const passage = getReadingByLevel(level)[0]; // first reading as daily reading
  const fiveWords = useMemo(() => {
    const pool = getVocabByLevel(level);
    const seed = new Date().getDate();
    return Array.from({ length: 5 }, (_, i) => pool[(seed + i * 7) % pool.length]);
  }, [level]);

  const [completed, setCompleted] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(DAILY_LS_KEY) || '{}');
      return data.lastDate === todayKey;
    } catch { return false; }
  });
  const [streak, setStreak] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(DAILY_LS_KEY) || '{}');
      return data.streak || 0;
    } catch { return 0; }
  });

  const completeChallenge = () => {
    if (completed) return;
    const data = (() => {
      try { return JSON.parse(localStorage.getItem(DAILY_LS_KEY) || '{}'); }
      catch { return {}; }
    })();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = data.lastDate === yesterday ? (data.streak || 0) + 1 : 1;
    localStorage.setItem(DAILY_LS_KEY, JSON.stringify({ lastDate: todayKey, streak: newStreak }));
    setCompleted(true);
    setStreak(newStreak);

    // Canonical progress write — English daily challenge.
    if (currentUser) {
      void recordLearningActivity({
        uid: currentUser.uid,
        type: 'english_lab',
        title: 'English Daily Challenge',
        subject: 'English',
        xpGained: 15,
        metadata: { level },
      });
    }
  };

  return (
    <section className="space-y-5">
      {/* Streak banner */}
      <div className="flex items-center justify-between rounded-[2rem] bg-gradient-to-r from-amber-100 to-orange-100 p-5 shadow">
        <div className="flex items-center gap-3">
          <Flame size={28} className="text-orange-600" />
          <div>
            <p className="text-2xl font-black text-orange-700">{streak} day streak 🔥</p>
            <p className="text-xs font-bold text-orange-600">Complete today's challenge to keep it alive!</p>
          </div>
        </div>
        {completed && (
          <div className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-black text-white shadow">
            ✓ Done today
          </div>
        )}
      </div>

      {/* Grammar tip */}
      <div className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-700">
          <GraduationCap size={11} /> Grammar Tip
        </div>
        <h3 className="text-xl font-black text-slate-900">{grammar.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{grammar.whatIs}</p>
        {grammar.examples?.length ? (
          <ul className="mt-3 space-y-1 text-xs font-medium text-slate-500">
            {grammar.examples.slice(0, 3).map((ex, i) => (
              <li key={i} className="rounded-lg bg-slate-50 px-3 py-1.5">{ex}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* 5 Vocab words */}
      <div className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-700">
          <Sparkles size={11} /> 5 Words to Learn
        </div>
        <h3 className="text-xl font-black text-slate-900">Today's Vocabulary</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {fiveWords.map((w) => (
            <div key={w.word} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-black text-sky-700">{w.word}</span>
                <span className="text-xs font-medium text-slate-500">— {w.meaning}</span>
              </div>
              <p className="mt-1 text-xs italic text-slate-400">{w.example}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-gradient-to-r from-pink-50 to-violet-50 p-4 border border-pink-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-pink-600">⭐ Word of the Day</p>
          <p className="mt-1 text-2xl font-black text-pink-700">{word.word}</p>
          <p className="text-sm font-medium text-slate-600">{word.meaning}</p>
          <p className="mt-1 text-xs italic text-slate-500">"{word.example}"</p>
        </div>
      </div>

      {/* Short reading */}
      <div className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
          <BookOpen size={11} /> Short Reading
        </div>
        <h3 className="text-xl font-black text-slate-900">{passage.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 whitespace-pre-line">{passage.text}</p>
      </div>

      {/* Complete button */}
      <button
        type="button"
        disabled={completed}
        onClick={completeChallenge}
        className={cn(
          'w-full rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all',
          completed ? 'cursor-not-allowed bg-emerald-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]',
        )}
      >
        {completed ? '✓ Challenge Completed Today' : '✅ Mark as Completed — Keep My Streak!'}
      </button>
    </section>
  );
}

/* ─── READING SECTION (all 30 per set, reshuffled on New Set) ───────────── */
function ReadingSection({ level }: { level: Level }) {
  const allPassages = getReadingByLevel(level);
  const [set, setSet] = useState<ReadingPassage[]>(() => pickRandom(allPassages, allPassages.length));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setSet(pickRandom(allPassages, allPassages.length)); setIdx(0); setAnswers({}); setSubmitted(false); }, [allPassages, level]);

  const passage = set[idx];
  if (!passage) return null;
  const newSet = () => { setSet(pickRandom(allPassages, allPassages.length)); setIdx(0); setAnswers({}); setSubmitted(false); };
  const next = () => { setIdx((idx + 1) % set.length); setAnswers({}); setSubmitted(false); };
  const prev = () => { setIdx((idx - 1 + set.length) % set.length); setAnswers({}); setSubmitted(false); };
  const score = passage.questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
            Passage {idx + 1} of {set.length} · {allPassages.length} total
          </p>
          <h2 className="text-2xl font-black text-slate-900">{passage.title}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={newSet} className="inline-flex items-center gap-1.5 rounded-xl bg-violet-100 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-violet-700 hover:bg-violet-200" title="Reshuffle all passages in a new order"><Shuffle size={13} />New Set</button>
          <button onClick={prev} className="rounded-xl bg-slate-100 p-2 hover:bg-slate-200"><ChevronLeft size={18} /></button>
          <button onClick={next} className="rounded-xl bg-slate-100 p-2 hover:bg-slate-200"><ChevronRight size={18} /></button>
        </div>
      </div>
      <p className="rounded-xl bg-slate-50 p-5 text-base leading-relaxed text-slate-700 whitespace-pre-line">{passage.text}</p>
      <h3 className="mt-6 mb-3 text-sm font-black text-slate-700">Comprehension Questions</h3>
      <div className="space-y-4">
        {passage.questions.map((q, qi) => (
          <div key={qi}>
            <p className="mb-2 font-bold text-slate-800">{qi + 1}. {q.text}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi;
                const isCorrect = submitted && oi === q.correct;
                const isWrong = submitted && isSelected && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [qi]: oi })}
                    className={cn(
                      'rounded-xl border-2 px-4 py-2.5 text-left text-sm font-bold transition-all',
                      !submitted && isSelected && 'border-emerald-500 bg-emerald-50',
                      !isSelected && !submitted && 'border-slate-200 hover:border-emerald-300',
                      isCorrect && 'border-emerald-500 bg-emerald-100 text-emerald-700',
                      isWrong && 'border-rose-500 bg-rose-50 text-rose-700',
                    )}
                  >
                    <span className="font-black">{String.fromCharCode(65 + oi)}.</span> {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button type="button" onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < passage.questions.length} className="mt-5 w-full rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow disabled:opacity-50">
          Submit Answers
        </button>
      ) : (
        <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
          <p className="text-lg font-black text-emerald-700">Score: {score} / {passage.questions.length}</p>
          <button onClick={next} className="mt-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
            Next Passage →
          </button>
        </div>
      )}
    </section>
  );
}

/* ─── LISTENING SECTION (all per set, reshuffled on New Set) ────────────── */
function ListeningSection({ level }: { level: Level }) {
  const allTests = getListeningByLevel(level);
  const [set, setSet] = useState<ListeningTest[]>(() => pickRandom(allTests, allTests.length));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setSet(pickRandom(allTests, allTests.length)); setIdx(0); setSelected(null); setSubmitted(false); }, [allTests, level]);

  const test = set[idx];
  if (!test) return null;

  const newSet = () => { setSet(pickRandom(allTests, allTests.length)); setIdx(0); setSelected(null); setSubmitted(false); window.speechSynthesis?.cancel(); };

  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(test.text);
    utter.lang = 'en-IN';
    utter.rate = level === 'basic' ? 0.85 : 0.95;
    window.speechSynthesis.speak(utter);
  };

  const next = () => {
    setIdx((idx + 1) % set.length);
    setSelected(null);
    setSubmitted(false);
    window.speechSynthesis?.cancel();
  };

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-600">
            Test {idx + 1} of {set.length} · {allTests.length} total
          </p>
          <h2 className="text-2xl font-black text-slate-900">Listen and answer</h2>
        </div>
        <button onClick={newSet} className="inline-flex items-center gap-1.5 rounded-xl bg-violet-100 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-violet-700 hover:bg-violet-200" title="Reshuffle all tests in a new order"><Shuffle size={13} />New Set</button>
      </div>
      <button
        type="button"
        onClick={speak}
        className="flex items-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 active:scale-95 transition-all"
      >
        <Volume2 size={20} /> {window.speechSynthesis ? 'Tap to Listen 🔊' : 'Audio not supported'}
      </button>
      <p className="mt-5 text-base font-bold text-slate-800">Question: {test.question}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {test.options.map((opt, oi) => {
          const isSelected = selected === oi;
          const isCorrect = submitted && oi === test.correct;
          const isWrong = submitted && isSelected && oi !== test.correct;
          return (
            <button
              key={oi}
              type="button"
              disabled={submitted}
              onClick={() => setSelected(oi)}
              className={cn(
                'rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-all',
                !submitted && isSelected && 'border-sky-500 bg-sky-50',
                !isSelected && !submitted && 'border-slate-200 hover:border-sky-300',
                isCorrect && 'border-emerald-500 bg-emerald-100 text-emerald-700',
                isWrong && 'border-rose-500 bg-rose-50 text-rose-700',
              )}
            >
              <span className="font-black">{String.fromCharCode(65 + oi)}.</span> {opt}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
          className="mt-5 w-full rounded-2xl bg-sky-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow disabled:opacity-50"
        >
          Check Answer
        </button>
      ) : (
        <div className={cn(
          'mt-5 rounded-2xl border p-4 text-center',
          selected === test.correct ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700',
        )}>
          <p className="text-base font-black">
            {selected === test.correct ? '✅ Correct!' : `❌ Correct answer: ${test.options[test.correct]}`}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-600">The text was: "{test.text}"</p>
          <button onClick={next} className="mt-3 rounded-xl bg-sky-600 px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
            Next Test →
          </button>
        </div>
      )}
    </section>
  );
}

/* ─── WRITING SECTION (all per set, reshuffled on New Set) ──────────────── */
function WritingSection({ level }: { level: Level }) {
  const allPrompts = getWritingByLevel(level);
  const [set, setSet] = useState<WritingPrompt[]>(() => pickRandom(allPrompts, allPrompts.length));
  const [idx, setIdx] = useState(0);
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setSet(pickRandom(allPrompts, allPrompts.length)); setIdx(0); setEssay(''); setFeedback(null); }, [allPrompts, level]);

  const prompt = set[idx];
  if (!prompt) return null;

  const newSet = () => { setSet(pickRandom(allPrompts, allPrompts.length)); setIdx(0); setEssay(''); setFeedback(null); };

  const evaluate = async () => {
    if (essay.trim().length < 20) return;
    setLoading(true);
    setFeedback(null);
    try {
      const tutorPrompt = `Evaluate this English essay by a CBSE Class ${level === 'basic' ? '1-4' : level === 'intermediate' ? '5-7' : '8-10'} student on the topic: "${prompt.topic}".\n\nStudent's essay:\n"${essay}"\n\nGive a brief evaluation in 3 short paragraphs:\n1. Score out of 10 + one-line verdict\n2. Two strengths\n3. Two specific improvements (with examples)\n\nBe warm and encouraging. Keep total feedback under 150 words.`;
      const response = await askTutor(tutorPrompt);
      setFeedback(response);
    } catch {
      setFeedback('Could not get feedback. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const next = () => { setIdx((idx + 1) % set.length); setEssay(''); setFeedback(null); };

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
      <div className="mb-4 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
            Prompt {idx + 1} of {set.length} · {allPrompts.length} total
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-900">{prompt.topic}</h2>
          <p className="mt-2 text-sm font-medium text-amber-700">💡 Hint: {prompt.hint}</p>
          <p className="mt-1 text-xs text-slate-400">Aim for at least {prompt.minWords} words.</p>
        </div>
        <button onClick={newSet} className="inline-flex items-center gap-1.5 rounded-xl bg-violet-100 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-violet-700 hover:bg-violet-200" title="Reshuffle all prompts in a new order"><Shuffle size={13} />New Set</button>
      </div>
      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Start writing here..."
        className="h-48 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-relaxed focus:border-amber-400 focus:bg-white outline-none"
      />
      <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-slate-400">
        <span>Words: {essay.trim().split(/\s+/).filter(Boolean).length} / {prompt.minWords}</span>
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => void evaluate()}
          disabled={loading || essay.trim().length < 20}
          className="rounded-2xl bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow disabled:opacity-50"
        >
          {loading ? '⏳ AI is reviewing...' : '✨ Get AI Feedback'}
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded-2xl bg-slate-100 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600"
        >
          Next Topic →
        </button>
      </div>
      {feedback && (
        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
          {feedback}
        </div>
      )}
    </section>
  );
}

/* ─── GRAMMAR SECTION ──────────────────────────────────────────────────── */
function GrammarSection({ level }: { level: Level }) {
  const lessons = getGrammarByLevel(level);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const lesson = lessons[idx];

  const next = () => { setIdx((idx + 1) % lessons.length); setAnswers({}); setSubmitted(false); };
  const prev = () => { setIdx((idx - 1 + lessons.length) % lessons.length); setAnswers({}); setSubmitted(false); };
  const score = lesson.quiz.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">Lesson {idx + 1} of {lessons.length}</p>
          <h2 className="text-2xl font-black text-slate-900">{lesson.title}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="rounded-xl bg-slate-100 p-2"><ChevronLeft size={18} /></button>
          <button onClick={next} className="rounded-xl bg-slate-100 p-2"><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* What is */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 p-5 border border-violet-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">📖 What is it?</p>
        <p className="mt-1.5 text-base font-medium leading-relaxed text-slate-800">{lesson.whatIs}</p>
      </div>

      {/* Examples */}
      {lesson.examples?.length ? (
        <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-5">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-emerald-600">✨ Examples</p>
          <ul className="space-y-2">
            {lesson.examples.map((ex, i) => (
              <li key={i} className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                {ex}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Rule */}
      {lesson.rule && (
        <div className="mt-4 rounded-2xl bg-amber-50 border-2 border-amber-200 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">📏 Key Rule</p>
          <p className="mt-1.5 text-sm font-bold text-amber-900">{lesson.rule}</p>
        </div>
      )}

      {/* Common mistake */}
      {lesson.commonMistake && (
        <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-200 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">⚠️ Common Mistake</p>
          <p className="mt-1.5 text-sm font-bold text-rose-900">{lesson.commonMistake}</p>
        </div>
      )}

      {/* Quiz */}
      <div className="mt-6 rounded-2xl bg-white border-2 border-slate-100 p-5">
        <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-indigo-600">🎯 Quick Quiz</p>
        <div className="space-y-4">
          {lesson.quiz.map((q, qi) => (
            <div key={qi}>
              <p className="mb-2 font-bold text-slate-800">{qi + 1}. {q.text}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[qi] === oi;
                  const isCorrect = submitted && oi === q.correct;
                  const isWrong = submitted && isSelected && oi !== q.correct;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers({ ...answers, [qi]: oi })}
                      className={cn(
                        'rounded-xl border-2 px-4 py-2.5 text-left text-sm font-bold transition-all',
                        !submitted && isSelected && 'border-indigo-500 bg-indigo-50',
                        !isSelected && !submitted && 'border-slate-200 hover:border-indigo-300',
                        isCorrect && 'border-emerald-500 bg-emerald-100 text-emerald-700',
                        isWrong && 'border-rose-500 bg-rose-50 text-rose-700',
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < lesson.quiz.length}
            className="mt-4 w-full rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow disabled:opacity-50"
          >
            Check My Answers
          </button>
        ) : (
          <div className="mt-4 rounded-2xl bg-indigo-50 border border-indigo-200 p-4 text-center">
            <p className="text-lg font-black text-indigo-700">Quiz Score: {score} / {lesson.quiz.length}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── VOCABULARY SECTION ───────────────────────────────────────────────── */
function VocabSection({ level }: { level: Level }) {
  const words = getVocabByLevel(level);
  const wordOfDay = getWordOfDay(level);
  const [flashIdx, setFlashIdx] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const card = words[flashIdx];

  return (
    <section className="space-y-5">
      {/* Full vocabulary reference library (idioms, proverbs, one-word substitutions,
          synonyms, antonyms, phrasal verbs…) — the former standalone /vocabulary page,
          now surfaced here inside English. Route + detail pages stay live for SEO. */}
      <a
        href="/vocabulary"
        className="block rounded-[2rem] border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow transition-all hover:border-emerald-400 sm:p-8"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">📚 Vocabulary Reference Library</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">Idioms, Proverbs, One-Word Substitutions, Synonyms &amp; Antonyms</h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Browse the full collection of exam-ready vocabulary sets with meanings and example sentences →
        </p>
      </a>

      {/* Word of the Day */}
      <div className="rounded-[2rem] bg-gradient-to-br from-pink-100 to-purple-100 p-6 shadow sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-pink-700">⭐ Word of the Day</p>
        <h2 className="mt-2 text-5xl font-black text-pink-700">{wordOfDay.word}</h2>
        <p className="mt-2 text-lg font-bold text-slate-700">{wordOfDay.meaning}</p>
        <p className="mt-2 text-base italic text-slate-600">"{wordOfDay.example}"</p>
      </div>

      {/* Flashcards */}
      <div className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">Flashcards</p>
            <h2 className="text-xl font-black text-slate-900">Tap card to flip</h2>
          </div>
          <p className="text-xs font-black text-slate-400">{flashIdx + 1} / {words.length}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowMeaning((v) => !v)}
          className="block w-full h-44 rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-pink-50 p-6 text-center transition-all hover:scale-[1.02] active:scale-100"
        >
          {!showMeaning ? (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-violet-500">English Word</p>
              <p className="mt-4 text-4xl font-black text-violet-700">{card.word}</p>
              <p className="mt-4 text-xs font-bold text-violet-400">tap to see meaning</p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-pink-500">Meaning</p>
              <p className="mt-3 text-lg font-bold text-pink-700">{card.meaning}</p>
              <p className="mt-2 text-sm italic text-slate-600">"{card.example}"</p>
            </div>
          )}
        </button>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => { setFlashIdx((flashIdx - 1 + words.length) % words.length); setShowMeaning(false); }}
            className="flex-1 rounded-xl bg-slate-100 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200"
          >← Previous</button>
          <button
            onClick={() => { setFlashIdx(Math.floor(Math.random() * words.length)); setShowMeaning(false); }}
            className="rounded-xl bg-violet-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-violet-700 hover:bg-violet-200"
          >🎲 Random</button>
          <button
            onClick={() => { setFlashIdx((flashIdx + 1) % words.length); setShowMeaning(false); }}
            className="flex-1 rounded-xl bg-violet-600 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-violet-700"
          >Next →</button>
        </div>
      </div>

      {/* All words list */}
      <div className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
        <h2 className="mb-4 text-xl font-black text-slate-900">All {words.length} Words in This Level</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {words.map((w, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="font-black text-violet-700">{w.word}</span>
              <span className="text-xs text-slate-500"> — {w.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STORIES SECTION (image hero + new story) ──────────────────────────── */
function StoriesSection({ level }: { level: Level }) {
  const stories = getStoriesByLevel(level);
  const [idx, setIdx] = useState(0);
  const story = stories[idx];


  const newStory = () => {
    let newIdx = Math.floor(Math.random() * stories.length);
    if (newIdx === idx && stories.length > 1) newIdx = (idx + 1) % stories.length;
    setIdx(newIdx);
  };

  const readAloud = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(`${story.title}. ${story.content} The moral of the story is: ${story.moral}`);
    utter.lang = 'en-IN';
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  };

  return (
    <section className="rounded-[2rem] bg-white shadow sm:p-0 p-0 overflow-hidden">
      {/* Visual hero */}
      <div className={cn('relative h-44 sm:h-56 bg-gradient-to-br', story.gradient)}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/90">{story.category} · Story {idx + 1} of {stories.length}</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-black text-white drop-shadow">{story.title}</h2>
          </div>
          <div className="text-6xl sm:text-7xl drop-shadow-lg" aria-hidden>{story.emoji}</div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={readAloud}
            className="flex items-center gap-2 rounded-xl bg-rose-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-rose-700 hover:bg-rose-200"
          >
            <Volume2 size={14} /> Read Aloud
          </button>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 p-6 border border-amber-100">
          <div className="text-base font-medium leading-relaxed text-slate-700 whitespace-pre-line">{story.content}</div>
          <div className="mt-5 rounded-xl bg-emerald-100 border border-emerald-200 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">🌟 Moral of the Story</p>
            <p className="mt-1 text-base italic font-bold text-emerald-800">{story.moral}</p>
          </div>
        </div>

        <div className="mt-5 flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIdx((idx - 1 + stories.length) % stories.length)}
            className="rounded-xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600"
          >← Previous</button>
          <button
            type="button"
            onClick={newStory}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow hover:bg-rose-600"
          >
            ✨ New Story Please!
          </button>
          <button
            type="button"
            onClick={() => setIdx((idx + 1) % stories.length)}
            className="rounded-xl bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600"
          >Next →</button>
        </div>
      </div>
    </section>
  );
}
