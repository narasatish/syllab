/**
 * SkillsLab.tsx — /skills-lab
 * W3Schools-style full tutorial system: Python, HTML, CSS, JavaScript, SQL, Java.
 * Left sidebar (categories + topics) + main content (theory → syntax → code → Try It → Practice).
 * Live iframe preview for HTML/CSS/JS; AI feedback for Python/SQL/Java.
 */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code2,
  Eye,
  Lightbulb,
  Loader2,
  Menu,
  Play,
  RefreshCw,
  Send,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { getCodingFeedback, CodingFeedback } from '../lib/api';
import {
  LANGUAGES,
  TOPICS_BY_LANGUAGE,
  getTopics,
  firstTopic,
  type TutorialTopic,
  type LanguageConfig,
} from '../data/tutorials/index';

/* ─── Local storage helpers ────────────────────────────────────────────────── */
const LS_KEY = 'syllab_skills_completed';

function loadCompleted(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
}
function saveCompleted(data: Record<string, string[]>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

/* ─── Difficulty badge ─────────────────────────────────────────────────────── */
function DiffBadge({ level }: { level: TutorialTopic['difficulty'] }) {
  return (
    <span
      className={cn(
        'text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
        level === 'Beginner'
          ? 'bg-emerald-100 text-emerald-700'
          : level === 'Intermediate'
          ? 'bg-amber-100 text-amber-700'
          : 'bg-red-100 text-red-700',
      )}
    >
      {level}
    </span>
  );
}

/* ─── Live Preview (HTML / CSS / JS) ───────────────────────────────────────── */
function LivePreviewEditor({
  initialCode,
  task,
  language = 'html',
}: {
  initialCode: string;
  task?: string;
  language?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState(initialCode);
  const [tab, setTab] = useState<'editor' | 'preview'>('editor');
  const [aiLoading, setAiLoading] = useState<null | 'check' | 'hint'>(null);
  const [aiFeedback, setAiFeedback] = useState<CodingFeedback | null>(null);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const hasTask = !!task;

  const run = () => setPreview(code);

  const askAI = async (mode: 'check' | 'hint') => {
    if (aiLoading) return;
    setAiLoading(mode);
    setAiFeedback(null);
    setAiHint(null);
    try {
      const fb = await getCodingFeedback({
        language,
        code: code.trim() || '(empty)',
        task: task || 'Practice exercise',
      });
      if (mode === 'check') setAiFeedback(fb);
      else setAiHint(fb.hint || fb.improvements?.[0] || fb.summary || 'Think about what the task asks step by step.');
    } catch {
      if (mode === 'check') {
        setAiFeedback({
          score: 0,
          verdict: 'Error',
          summary: 'Could not reach the AI tutor. Check your internet and try again.',
          strengths: [],
          improvements: [],
          hint: '',
        });
      } else {
        setAiHint('Could not reach the AI tutor. Try again in a moment.');
      }
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Tab bar + action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl bg-slate-100 p-1 gap-1">
          <button
            onClick={() => setTab('editor')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',
              tab === 'editor' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600',
            )}
          >
            <Code2 size={12} /> Editor
          </button>
          <button
            onClick={() => { run(); setTab('preview'); }}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',
              tab === 'preview' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600',
            )}
          >
            <Eye size={12} /> Preview
          </button>
        </div>
        <button
          onClick={() => { run(); setTab('preview'); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-500/30"
        >
          <Play size={12} /> Run
        </button>
        {hasTask && (
          <>
            <button
              onClick={() => askAI('check')}
              disabled={aiLoading !== null || !code.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all disabled:opacity-50"
            >
              {aiLoading === 'check' ? <Loader2 size={12} className="animate-spin" /> : <Brain size={12} />}
              {aiLoading === 'check' ? 'Checking...' : 'AI Check'}
            </button>
            <button
              onClick={() => askAI('hint')}
              disabled={aiLoading !== null}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-50"
            >
              {aiLoading === 'hint' ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {aiLoading === 'hint' ? 'Thinking...' : 'Hint'}
            </button>
          </>
        )}
        <button
          onClick={() => setCode(initialCode)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          title="Reset to original"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {tab === 'editor' ? (
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-56 rounded-2xl border border-slate-200 bg-slate-900 text-emerald-400 font-mono text-sm p-5 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed"
          spellCheck={false}
        />
      ) : (
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Preview</span>
          </div>
          <iframe
            srcDoc={preview}
            className="w-full h-56 border-0"
            sandbox="allow-scripts"
            title="Live Preview"
          />
        </div>
      )}

      {/* AI hint card */}
      {aiHint && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
          <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={16} />
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">Hint</p>
            <p className="text-sm leading-6 text-slate-700">{aiHint}</p>
          </div>
          <button onClick={() => setAiHint(null)} className="text-amber-600 hover:text-amber-800 text-xs">✕</button>
        </div>
      )}

      {/* AI check feedback card */}
      {aiFeedback && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              'text-2xl font-black',
              aiFeedback.score >= 80 ? 'text-emerald-500' : aiFeedback.score >= 60 ? 'text-amber-500' : 'text-rose-500',
            )}>{aiFeedback.score}/100</div>
            <span className={cn(
              'text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
              aiFeedback.verdict === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
              aiFeedback.verdict === 'Good' ? 'bg-blue-100 text-blue-700' :
              aiFeedback.verdict === 'Error' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700',
            )}>{aiFeedback.verdict}</span>
          </div>
          <p className="text-sm leading-6 text-slate-700">{aiFeedback.summary}</p>
          {aiFeedback.strengths && aiFeedback.strengths.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1">✓ What's good</p>
              <ul className="space-y-1">
                {aiFeedback.strengths.map((s, i) => <li key={i} className="text-sm text-slate-600">• {s}</li>)}
              </ul>
            </div>
          )}
          {aiFeedback.improvements && aiFeedback.improvements.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">→ Try this next</p>
              <ul className="space-y-1">
                {aiFeedback.improvements.map((s, i) => <li key={i} className="text-sm text-slate-600">• {s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── AI Feedback Editor (Python / SQL / Java) ─────────────────────────────── */
function AIFeedbackEditor({
  initialCode,
  language,
  task,
}: {
  initialCode: string;
  language: string;
  task: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState<null | 'check' | 'hint'>(null);
  const [feedback, setFeedback] = useState<CodingFeedback | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!code.trim() || loading) return;
    setLoading('check');
    setFeedback(null);
    setHint(null);
    try {
      const fb = await getCodingFeedback({ language, code, task });
      setFeedback(fb);
    } catch {
      setFeedback({
        score: 0,
        verdict: 'Error',
        summary: 'Could not get AI feedback. Please check your connection and try again.',
        strengths: [],
        improvements: ['Make sure the backend is running and your internet is connected.'],
        hint: '',
      });
    } finally {
      setLoading(null);
    }
  };

  const handleHint = async () => {
    if (loading) return;
    setLoading('hint');
    setHint(null);
    try {
      const fb = await getCodingFeedback({ language, code: code.trim() || '(empty)', task });
      setHint(fb.hint || fb.improvements?.[0] || 'Think about what the task asks step by step.');
    } catch {
      setHint('Could not reach the AI tutor. Try again in a moment.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-52 rounded-2xl border border-slate-200 bg-slate-900 text-emerald-400 font-mono text-sm p-5 resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 leading-relaxed"
          placeholder={`# Write your ${language} code here…`}
          spellCheck={false}
        />
        <div className="absolute top-3 right-4 flex items-center gap-2">
          <button
            onClick={() => setCode(initialCode)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-all"
            title="Reset"
          >
            <RefreshCw size={12} />
          </button>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">
            {language}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleSubmit}
          disabled={loading !== null || !code.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          {loading === 'check' ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
          {loading === 'check' ? 'Checking…' : 'Submit for AI Check'}
        </button>
        <button
          onClick={handleHint}
          disabled={loading !== null}
          className="flex items-center gap-2 px-5 py-3 bg-amber-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading === 'hint' ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
          {loading === 'hint' ? 'Thinking…' : 'Get Hint'}
        </button>
      </div>

      {hint && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
          <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={16} />
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">Hint</p>
            <p className="text-sm leading-6 text-slate-700">{hint}</p>
          </div>
          <button onClick={() => setHint(null)} className="text-amber-600 hover:text-amber-800 text-xs">✕</button>
        </div>
      )}

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'text-3xl font-black',
                  feedback.score >= 80
                    ? 'text-emerald-500'
                    : feedback.score >= 60
                    ? 'text-amber-500'
                    : 'text-red-500',
                )}
              >
                {feedback.score}/100
              </div>
              <div>
                <span
                  className={cn(
                    'text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                    feedback.verdict === 'Excellent'
                      ? 'bg-emerald-100 text-emerald-700'
                      : feedback.verdict === 'Good'
                      ? 'bg-blue-100 text-blue-700'
                      : feedback.verdict === 'Needs Work'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700',
                  )}
                >
                  {feedback.verdict}
                </span>
                <p className="text-sm font-semibold text-slate-600 mt-1">{feedback.summary}</p>
              </div>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feedback.score}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  feedback.score >= 80
                    ? 'bg-emerald-500'
                    : feedback.score >= 60
                    ? 'bg-amber-500'
                    : 'bg-red-500',
                )}
              />
            </div>

            {feedback.strengths.length > 0 && (
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-2">✅ Strengths</p>
                <ul className="space-y-1">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 font-medium flex gap-2">
                      <span className="text-emerald-500 mt-0.5 shrink-0">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.improvements.length > 0 && (
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-2">💡 Improve</p>
                <ul className="space-y-1">
                  {feedback.improvements.map((imp, i) => (
                    <li key={i} className="text-sm text-slate-600 font-medium flex gap-2">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.hint && (
              <div className="bg-violet-50 rounded-xl px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-violet-600 mb-1">🔮 Hint</p>
                <p className="text-sm text-slate-700 font-medium">{feedback.hint}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Practice Challenge (HackerRank-style) ────────────────────────────────── */
function PracticeChallenge({
  topic,
  lang,
}: {
  topic: TutorialTopic;
  lang: LanguageConfig;
  onComplete?: () => void;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const p = topic.practice;

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Header bar */}
      <div
        className={cn(
          'flex items-center gap-3 px-6 py-4',
          lang.bgClass,
        )}
      >
        <Trophy size={18} className={lang.textClass} />
        <div>
          <p className={cn('text-[9px] font-black uppercase tracking-widest', lang.textClass)}>
            Practice Challenge
          </p>
          <p className="text-base font-black text-slate-900">{p.title}</p>
        </div>
        <DiffBadge level={topic.difficulty} />
      </div>

      <div className="p-6 space-y-5">
        {/* Description */}
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Task Description</p>
          <p className="text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line">
            {p.description}
          </p>
        </div>

        {/* Expected output */}
        {p.expectedOutput && (
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Expected Output</p>
            <pre className="bg-slate-100 rounded-xl px-4 py-3 text-xs font-mono text-slate-700 overflow-x-auto">
              {p.expectedOutput}
            </pre>
          </div>
        )}

        {/* Hint toggle */}
        {p.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors"
          >
            <Lightbulb size={13} />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        <AnimatePresence>
          {showHint && p.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <p className="text-sm text-amber-800 font-semibold">{p.hint}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor — ALWAYS starts blank. The user solves it from scratch. */}
        {topic.livePreview ? (
          <LivePreviewEditor initialCode="" task={p.description} language={lang.id} />
        ) : (
          <AIFeedbackEditor
            initialCode=""
            language={lang.id}
            task={p.description}
          />
        )}

        {/* Show solution — hidden by default, user clicks to reveal */}
        {p.solution && (
          <div>
            <button
              onClick={() => setShowSolution((v) => !v)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors border border-amber-200 bg-amber-50 px-3 py-2 rounded-xl"
            >
              {showSolution ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {showSolution ? '🙈 Hide Answer' : '💡 Show Answer (only after trying!)'}
            </button>
            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <pre className="bg-slate-900 text-emerald-400 rounded-2xl p-5 text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed">
                    {p.solution}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Topic Content (main right panel) ─────────────────────────────────────── */
function TopicContent({
  topic,
  lang,
  onComplete,
  isCompleted,
}: {
  topic: TutorialTopic;
  lang: LanguageConfig;
  onComplete: () => void;
  isCompleted: boolean;
}) {
  const [showTryIt, setShowTryIt] = useState(false);

  // Reset try-it when topic changes
  useEffect(() => {
    setShowTryIt(false);
  }, [topic.id]);

  return (
    <div className="space-y-8 pb-16">
      {/* Topic header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              {topic.category}
            </span>
            <span className="text-slate-300">•</span>
            <DiffBadge level={topic.difficulty} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {topic.title}
          </h1>
        </div>
        {isCompleted ? (
          <div className="flex items-center gap-1.5 text-emerald-600 shrink-0 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
            <CheckCircle2 size={15} />
            <span className="text-[9px] font-black uppercase tracking-widest">Completed</span>
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 text-[9px] font-black uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-600 transition-all shrink-0"
          >
            <CheckCircle2 size={13} /> Mark Done
          </button>
        )}
      </div>

      {/* Theory */}
      <section>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <BookOpen size={12} /> Theory
        </h2>
        <div className="space-y-4">
          {topic.theory.map((para, i) => (
            <p key={i} className="text-base text-slate-700 font-medium leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Syntax box */}
      {topic.syntax && (
        <section>
          <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <Terminal size={12} /> Syntax
          </h2>
          <pre className="bg-slate-800 text-sky-300 rounded-2xl p-6 text-sm font-mono overflow-x-auto whitespace-pre leading-relaxed border border-slate-700">
            {topic.syntax}
          </pre>
        </section>
      )}

      {/* Code example */}
      <section>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <Code2 size={12} /> Code Example
        </h2>
        <pre className="bg-slate-900 text-emerald-400 rounded-2xl p-6 text-sm font-mono overflow-x-auto whitespace-pre leading-relaxed">
          {topic.code}
        </pre>
        {topic.output && (
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Output</p>
            <pre className="text-sm font-mono text-slate-700 whitespace-pre">{topic.output}</pre>
          </div>
        )}
      </section>

      {/* Notes */}
      {topic.notes && topic.notes.length > 0 && (
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-3">📌 Key Notes</p>
          <ul className="space-y-2">
            {topic.notes.map((note, i) => (
              <li key={i} className="text-sm font-semibold text-slate-700 flex gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">•</span> {note}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Try It Yourself */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Play size={12} /> Try It Yourself
          </h2>
          <button
            onClick={() => setShowTryIt((v) => !v)}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
              showTryIt
                ? 'bg-slate-100 text-slate-600'
                : `${lang.bgClass} ${lang.textClass} hover:opacity-80`,
            )}
          >
            <Code2 size={12} />
            {showTryIt ? 'Hide Editor' : 'Open Editor'}
          </button>
        </div>

        <AnimatePresence>
          {showTryIt && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {topic.livePreview ? (
                <LivePreviewEditor initialCode={topic.code} />
              ) : (
                <AIFeedbackEditor
                  initialCode={topic.code}
                  language={lang.id}
                  task={`Practice: ${topic.title}`}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Practice challenge */}
      <section>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <Trophy size={12} /> Practice Challenge
        </h2>
        <PracticeChallenge topic={topic} lang={lang} />
      </section>
    </div>
  );
}

/* ─── Sidebar ───────────────────────────────────────────────────────────────── */
function Sidebar({
  lang,
  topics,
  activeTopicId,
  completedIds,
  onSelect,
  viewMode,
  onViewChange,
}: {
  lang: LanguageConfig;
  topics: TutorialTopic[];
  activeTopicId: string;
  completedIds: string[];
  onSelect: (id: string) => void;
  viewMode: 'topic' | 'career' | 'project';
  onViewChange: (mode: 'topic' | 'career' | 'project') => void;
}) {
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filteredTopics = useMemo(
    () => levelFilter === 'All' ? topics : topics.filter(t => t.difficulty === levelFilter),
    [topics, levelFilter],
  );

  // When filter changes, if active topic isn't in filtered set, jump to first filtered topic
  useEffect(() => {
    if (levelFilter === 'All') return;
    const filtered = topics.filter(t => t.difficulty === levelFilter);
    if (filtered.length > 0 && !filtered.find(t => t.id === activeTopicId)) {
      onSelect(filtered[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelFilter]);

  const categories = useMemo(
    () => [...new Set(filteredTopics.map((t) => t.category))],
    [filteredTopics],
  );

  const LEVELS = [
    { key: 'All', label: 'All', color: 'bg-slate-200 text-slate-700' },
    { key: 'Beginner', label: '🟢 Basic', color: 'bg-emerald-100 text-emerald-700' },
    { key: 'Intermediate', label: '🟡 Mid', color: 'bg-amber-100 text-amber-700' },
    { key: 'Advanced', label: '🔴 Adv', color: 'bg-red-100 text-red-700' },
  ] as const;

  return (
    <nav className="h-full overflow-y-auto px-3 py-4 space-y-4">
      {/* Language badge */}
      <div className={cn('flex items-center gap-3 px-3 py-3 rounded-2xl', lang.bgClass)}>
        <span className="text-2xl">{lang.emoji}</span>
        <div>
          <p className="font-black text-base text-white">{lang.name}</p>
          <p className="text-[9px] font-bold text-white/70">
            {topics.length} Topics · {completedIds.length} Done
          </p>
        </div>
      </div>

      {/* Career Guide & Project Idea quick links */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => onViewChange(viewMode === 'career' ? 'topic' : 'career')}
          className={cn(
            'rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all',
            viewMode === 'career'
              ? `${lang.bgClass} text-white`
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          )}
        >
          💼 Career
        </button>
        <button
          type="button"
          onClick={() => onViewChange(viewMode === 'project' ? 'topic' : 'project')}
          className={cn(
            'rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all',
            viewMode === 'project'
              ? `${lang.bgClass} text-white`
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          )}
        >
          🛠️ Project
        </button>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
          <span>Progress</span>
          <span>
            {topics.length > 0
              ? Math.round((completedIds.length / topics.length) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-700', lang.bgClass)}
            style={{
              width: `${topics.length > 0 ? (completedIds.length / topics.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Level filter tabs */}
      <div className="flex gap-1 flex-wrap">
        {LEVELS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setLevelFilter(key)}
            className={cn(
              'px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all',
              levelFilter === key
                ? `${lang.bgClass} text-white`
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {levelFilter !== 'All' && (
        <p className="text-[9px] text-slate-400 font-semibold px-1">
          Showing {filteredTopics.length} {levelFilter} topics
        </p>
      )}

      {/* Topics by category */}
      {categories.map((cat) => {
        const catTopics = filteredTopics.filter((t) => t.category === cat);
        return (
          <div key={cat}>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 mb-2">
              {cat} <span className="text-slate-300">({catTopics.length})</span>
            </p>
            <ul className="space-y-0.5">
              {catTopics.map((t) => {
                const done = completedIds.includes(t.id);
                const active = t.id === activeTopicId;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => onSelect(t.id)}
                      className={cn(
                        'w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold',
                        active
                          ? `${lang.bgClass} text-white font-black shadow-sm`
                          : done
                          ? 'text-slate-500 hover:bg-slate-50'
                          : 'text-slate-600 hover:bg-slate-50',
                      )}
                    >
                      <span className="shrink-0">
                        {done ? (
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        ) : (
                          <span
                            className={cn(
                              'w-3.5 h-3.5 rounded-full border-2 inline-block',
                              active ? lang.borderClass : 'border-slate-300',
                            )}
                          />
                        )}
                      </span>
                      <span className="truncate leading-snug">{t.title}</span>
                      <span className={cn(
                        'ml-auto shrink-0 text-[7px] font-black px-1.5 py-0.5 rounded-md',
                        t.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-600' :
                        t.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-600' :
                        'bg-red-100 text-red-600',
                      )}>
                        {t.difficulty === 'Beginner' ? 'B' : t.difficulty === 'Intermediate' ? 'M' : 'A'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

/* ─── Career Guide view ─────────────────────────────────────────────────────── */
function CareerGuideView({ lang }: { lang: LanguageConfig }) {
  const cg = lang.careerGuide;
  if (!cg) return (
    <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-400 font-bold">Career guide coming soon for {lang.name}!</div>
  );
  return (
    <div className="space-y-5 pb-12">
      <div className={cn('rounded-2xl p-6 text-white', lang.bgClass)}>
        <div className="text-3xl mb-2">{lang.emoji}</div>
        <h2 className="text-2xl font-black">Career Guide — {lang.name}</h2>
        <p className="mt-1 text-sm font-medium text-white/80">{lang.description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white shadow p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">💼 Job Roles</p>
          <ul className="space-y-2">
            {cg.roles.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className={cn('h-2 w-2 rounded-full', lang.bgClass)} />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white shadow p-5 space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">💰 Average Salary (India)</p>
            <p className={cn('text-2xl font-black', lang.textClass)}>{cg.avgSalary}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">🏢 Top Companies Hiring</p>
            <div className="flex flex-wrap gap-1.5">
              {cg.topCompanies.map((c) => (
                <span key={c} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">🚀 What to Learn Next</p>
          <ul className="space-y-2">
            {cg.nextSkills.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="text-emerald-500 font-black">→</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('rounded-2xl p-5 border-2', lang.borderClass, 'bg-white shadow')}>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">💡 Career Tip</p>
          <p className={cn('text-base font-bold leading-relaxed', lang.textClass)}>"{cg.tip}"</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Idea view ─────────────────────────────────────────────────────── */
function ProjectIdeaView({ lang }: { lang: LanguageConfig }) {
  const pi = lang.projectIdea;
  if (!pi) return (
    <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-400 font-bold">Project idea coming soon for {lang.name}!</div>
  );
  return (
    <div className="space-y-5 pb-12">
      <div className={cn('rounded-2xl p-6 text-white', lang.bgClass)}>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-2">🛠️ Simple Project Idea</p>
        <h2 className="text-2xl font-black">{pi.title}</h2>
        <p className="mt-2 text-sm font-medium text-white/80">{pi.description}</p>
        <div className="mt-3 flex items-center gap-3">
          <span className={cn('rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest', pi.difficulty === 'Beginner' ? 'bg-emerald-400/30 text-white' : 'bg-amber-400/30 text-white')}>
            {pi.difficulty}
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">{pi.techStack}</span>
        </div>
      </div>
      <div className="rounded-2xl bg-white shadow p-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">📋 Step-by-Step Plan</p>
        <ol className="space-y-3">
          {pi.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black text-white', lang.bgClass)}>
                {i + 1}
              </span>
              <p className="text-sm font-medium leading-relaxed text-slate-700 mt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-2">💡 Pro Tip</p>
        <p className="text-sm font-medium text-slate-700">Build this project, upload it to GitHub, and add it to your resume or LinkedIn. Recruiters love seeing real projects more than certificates!</p>
      </div>
    </div>
  );
}

/* ─── Language selector grid ────────────────────────────────────────────────── */
function LanguageGrid({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const NEW_LANGUAGES = new Set(['git-github', 'prompt-engineering', 'ai-agents', 'cloud-computing', 'data-mining']);
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang.id)}
          className={cn(
            'relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all',
            active === lang.id
              ? `${lang.bgClass} ${lang.borderClass} shadow-sm text-white`
              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm',
          )}
        >
          {NEW_LANGUAGES.has(lang.id) && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              NEW
            </span>
          )}
          <span className="text-2xl">{lang.emoji}</span>
          <span
            className={cn(
              'text-[9px] font-black uppercase tracking-widest text-center leading-tight',
              active === lang.id ? 'text-white' : 'text-slate-500',
            )}
          >
            {lang.name}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Topic Navigator (prev/next) ───────────────────────────────────────────── */
function TopicNav({
  topics,
  activeId,
  onSelect,
}: {
  topics: TutorialTopic[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const idx = topics.findIndex((t) => t.id === activeId);
  const prev = idx > 0 ? topics[idx - 1] : null;
  const next = idx < topics.length - 1 ? topics[idx + 1] : null;

  return (
    <div className="flex items-center justify-between gap-4 pt-8 border-t border-slate-200">
      {prev ? (
        <button
          onClick={() => onSelect(prev.id)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:border-slate-300 transition-all"
        >
          <ChevronLeft size={14} />
          <span className="truncate max-w-[140px]">{prev.title}</span>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => onSelect(next.id)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          <span className="truncate max-w-[140px]">{next.title}</span>
          <ChevronRight size={14} />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

/* ─── Main page component ───────────────────────────────────────────────────── */
interface SkillsLabProps {
  setTab: (tab: string) => void;
  openTutor?: () => void;
  currentUser?: FirebaseUser | null;
}

export default function SkillsLab({ setTab, openTutor, currentUser }: SkillsLabProps) {
  const [activeLangId, setActiveLangId] = useState<string>('python');
  const [activeTopicId, setActiveTopicId] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'topic' | 'career' | 'project'>('topic');
  const [completed, setCompleted] = useState<Record<string, string[]>>(loadCompleted);
  const [pointsToast, setPointsToast] = useState<{ pts: number; topic: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const lang = useMemo(
    () => LANGUAGES.find((l) => l.id === activeLangId) ?? LANGUAGES[0],
    [activeLangId],
  );
  const topics = useMemo(() => getTopics(activeLangId), [activeLangId]);
  const activeTopic = useMemo(
    () => topics.find((t) => t.id === activeTopicId) ?? topics[0],
    [topics, activeTopicId],
  );
  const completedIds = completed[activeLangId] ?? [];

  // When language changes, reset to first topic and clear view mode
  useEffect(() => {
    const first = firstTopic(activeLangId);
    if (first) setActiveTopicId(first.id);
    setSidebarOpen(false);
    setViewMode('topic');
  }, [activeLangId]);

  // Scroll to top of content on topic change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTopicId]);

  const markComplete = useCallback(() => {
    if (!activeTopic) return;
    const alreadyDone = (completed[activeLangId] ?? []).includes(activeTopic.id);
    setCompleted((prev) => {
      const langDone = Array.from(new Set([...(prev[activeLangId] ?? []), activeTopic.id]));
      const next = { ...prev, [activeLangId]: langDone };
      saveCompleted(next);
      // Notify profile page
      window.dispatchEvent(new CustomEvent('syllab:skills-updated'));
      return next;
    });
    // Save to Firestore if not already done and user is logged in
    if (!alreadyDone && currentUser && FIRESTORE_FEATURES_ENABLED) {
      try {
        addDoc(collection(db, 'userActivities'), {
          userId: currentUser.uid,
          type: 'skill',
          title: activeTopic.title,
          subject: lang.name,
          completedAt: serverTimestamp(),
        }).catch(() => { /* non-fatal */ });
      } catch {
        /* non-fatal */
      }
    }
    // Show points toast only for first-time completion
    if (!alreadyDone) {
      setPointsToast({ pts: 10, topic: activeTopic.title });
      window.setTimeout(() => setPointsToast(null), 3000);
    }
  }, [activeLangId, activeTopic, completed, currentUser, lang.name]);

  const totalTopics = Object.values(TOPICS_BY_LANGUAGE).reduce(
    (sum, t) => sum + t.length,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SEO
        title="Skills Lab — Python, SQL, AI, Git, Cloud Computing & 18 Subjects | Syllab.in"
        description="Free tutorials for Python, Java, HTML, JavaScript, SQL, AI Learning, Data Mining, Cloud Computing, Git & GitHub, Prompt Engineering, Cybersecurity and more. Career guides + project ideas for every subject."
        keywords="skills lab, Python tutorial India, Java programming, SQL tutorial, AI learning, cloud computing basics, Git GitHub tutorial, prompt engineering, cybersecurity basics, data mining, coding for students India"
        url="https://syllab.in/skills-lab"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Skills Lab Courses — Syllab.in',
            description: 'Free hands-on skill courses for Indian students covering Python, Java, SQL, AI, Data Analytics, Cloud Computing, Cybersecurity and more.',
            url: 'https://syllab.in/skills-lab',
            itemListElement: [
              { '@type': 'ListItem', position: 1, item: { '@type': 'Course', name: 'Python Programming', url: 'https://syllab.in/skills-lab', provider: { '@type': 'Organization', name: 'Syllab.in' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } } },
              { '@type': 'ListItem', position: 2, item: { '@type': 'Course', name: 'SQL Database Basics', url: 'https://syllab.in/skills-lab', provider: { '@type': 'Organization', name: 'Syllab.in' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } } },
              { '@type': 'ListItem', position: 3, item: { '@type': 'Course', name: 'AI & Machine Learning Basics', url: 'https://syllab.in/skills-lab', provider: { '@type': 'Organization', name: 'Syllab.in' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } } },
              { '@type': 'ListItem', position: 4, item: { '@type': 'Course', name: 'Data Analytics', url: 'https://syllab.in/skills-lab', provider: { '@type': 'Organization', name: 'Syllab.in' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } } },
              { '@type': 'ListItem', position: 5, item: { '@type': 'Course', name: 'HTML & CSS Web Development', url: 'https://syllab.in/skills-lab', provider: { '@type': 'Organization', name: 'Syllab.in' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } } },
            ],
          },
        ]}
      />

      {/* Points toast */}
      <AnimatePresence>
        {pointsToast && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-2xl bg-violet-600 text-white px-6 py-4 shadow-2xl shadow-violet-500/40 font-black"
          >
            <span className="text-xl">🎉</span>
            <div>
              <div className="text-sm">Topic Completed!</div>
              <div className="text-[10px] font-black text-violet-200">+10 Skill Points · {pointsToast.topic}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white mb-6">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl shrink-0">
            🧪
          </div>
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">
              Skills Lab
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
              Learn to Code — Topic by Topic
            </h1>
            <p className="text-white/70 font-semibold text-sm max-w-2xl leading-relaxed">
              Python, Java, HTML, JS, SQL, AI, Data Mining, Cloud Computing, Git, Prompt Engineering, Cybersecurity and more.
              Theory, code examples, AI feedback, Career Guides and Project Ideas for every subject.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Languages', value: String(LANGUAGES.length), emoji: '🌐' },
            { label: 'Topics', value: `${totalTopics}+`, emoji: '📖' },
            { label: 'AI Feedback', value: 'Instant', emoji: '🤖' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="bg-white/10 rounded-2xl px-4 py-4 text-center">
              <div className="text-xl mb-1">{emoji}</div>
              <div className="text-lg font-black">{value}</div>
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Language selector ── */}
      <div className="mb-6">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">
          Choose a Language
        </p>
        <LanguageGrid active={activeLangId} onSelect={setActiveLangId} />
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative flex gap-0 rounded-[1.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[75vh]">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-600"
          >
            <Menu size={14} />
            {sidebarOpen ? 'Close Menu' : 'Topics'}
          </button>
        </div>

        {/* Sidebar — desktop: always visible; mobile: slide-in overlay */}
        <AnimatePresence>
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {(sidebarOpen || true) && (
            <>
              {/* Desktop sidebar */}
              <div className="hidden md:block w-64 shrink-0 border-r border-slate-100 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
                <Sidebar
                  lang={lang}
                  topics={topics}
                  activeTopicId={activeTopic?.id ?? ''}
                  completedIds={completedIds}
                  viewMode={viewMode}
                  onViewChange={setViewMode}
                  onSelect={(id) => { setActiveTopicId(id); setViewMode('topic'); }}
                />
              </div>

              {/* Mobile sidebar */}
              {sidebarOpen && (
                <motion.div
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                  className="md:hidden fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl border-r border-slate-100 pt-16 overflow-y-auto"
                >
                  <Sidebar
                    lang={lang}
                    topics={topics}
                    activeTopicId={activeTopic?.id ?? ''}
                    completedIds={completedIds}
                    viewMode={viewMode}
                    onViewChange={(m) => { setViewMode(m); setSidebarOpen(false); }}
                    onSelect={(id) => { setActiveTopicId(id); setViewMode('topic'); setSidebarOpen(false); }}
                  />
                </motion.div>
              )}
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div
          ref={contentRef}
          className="flex-1 min-w-0 overflow-y-auto px-6 md:px-10 pt-16 md:pt-8 pb-8"
        >
          <AnimatePresence mode="wait">
            {viewMode === 'career' ? (
              <motion.div key={`career-${activeLangId}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <CareerGuideView lang={lang} />
              </motion.div>
            ) : viewMode === 'project' ? (
              <motion.div key={`project-${activeLangId}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <ProjectIdeaView lang={lang} />
              </motion.div>
            ) : activeTopic ? (
              <motion.div
                key={`${activeLangId}-${activeTopic.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <TopicContent
                  topic={activeTopic}
                  lang={lang}
                  onComplete={markComplete}
                  isCompleted={completedIds.includes(activeTopic.id)}
                />
                <TopicNav
                  topics={topics}
                  activeId={activeTopic.id}
                  onSelect={setActiveTopicId}
                />

                {/* Bottom CTA */}
                <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-slate-900">Need help with this topic?</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      Ask our AI Tutor any question about {activeTopic.title}.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (openTutor) {
                        openTutor();
                      } else {
                        setTab('learning_lab');
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 shrink-0"
                  >
                    <Brain size={14} />
                    Ask AI Tutor
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400 font-semibold">
                Select a topic from the sidebar to begin.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
