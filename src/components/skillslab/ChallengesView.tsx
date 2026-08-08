/**
 * ChallengesView — inline coding challenges tab inside each Skills Lab language.
 * JS challenges run live in a sandboxed Function. Python/SQL/Java get AI feedback only.
 */
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Lightbulb, Sparkles, ChevronRight, X, Shuffle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getCodingFeedback, CodingFeedback } from '../../lib/api';
import { codingChallenges } from '../../data/codingChallenges';
import type { LanguageConfig } from '../../data/tutorials/index';

type ChallengeLang = 'javascript' | 'python' | 'sql' | 'java';

// Map Skills Lab language id → challenge language id
const LANG_MAP: Record<string, ChallengeLang | null> = {
  python: 'python',
  javascript: 'javascript',
  sql: 'sql',
  java: 'java',
  html: 'javascript',
  css: 'javascript',
  aptitude: 'python',
  'app-dev': 'javascript',
  robotics: 'python',
  'game-dev': 'javascript',
  'git-github': 'python',
  'prompt-engineering': 'python',
  'cloud-computing': 'python',
  'data-mining': 'python',
};

// Safe JS sandbox
function runJs(code: string): { output: string; error?: string } {
  const logs: string[] = [];
  const mock = {
    log: (...a: unknown[]) => logs.push(a.map(String).join(' ')),
    error: (...a: unknown[]) => logs.push('ERROR: ' + a.map(String).join(' ')),
  };
  try {
    // eslint-disable-next-line no-new-func
    new Function('console', code)(mock);
  } catch (e) {
    return { output: logs.join('\n'), error: String(e) };
  }
  return { output: logs.join('\n') };
}

interface Props {
  lang: LanguageConfig;
  activeLangId: string;
}

type Diff = 'all' | 'beginner' | 'intermediate' | 'advanced';

export default function ChallengesView({ lang, activeLangId }: Props) {
  const challengeLang = LANG_MAP[activeLangId] ?? null;

  const challenges = useMemo(
    () => (challengeLang ? codingChallenges.filter(c => c.language === challengeLang) : []),
    [challengeLang],
  );

  const [diff, setDiff] = useState<Diff>('all');
  const [selected, setSelected] = useState<(typeof challenges)[0] | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [runErr, setRunErr] = useState('');
  const [hintIdx, setHintIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [aiFb, setAiFb] = useState<CodingFeedback | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const visible = useMemo(
    () => (diff === 'all' ? challenges : challenges.filter(c => c.difficulty === diff)),
    [challenges, diff],
  );

  const open = useCallback((c: (typeof challenges)[0]) => {
    setSelected(c); setCode(c.starterCode);
    setOutput(''); setRunErr(''); setHintIdx(0); setShowHint(false); setShowAnswer(false); setAiFb(null);
  }, []);

  const random = useCallback(() => {
    if (!challenges.length) return;
    open(challenges[Math.floor(Math.random() * challenges.length)]);
  }, [challenges, open]);

  const doRun = () => {
    if (!selected) return;
    const r = runJs(code);
    setOutput(r.output); setRunErr(r.error ?? ''); setAiFb(null);
  };

  const doAI = async () => {
    if (!selected || aiLoading) return;
    setAiLoading(true);
    try {
      const fb = await getCodingFeedback({
        language: selected.language, code: code.trim() || '(empty)', task: selected.task,
      });
      setAiFb(fb);
    } catch {
      setAiFb({ score: 0, verdict: 'Error', summary: 'Could not reach AI tutor.', strengths: [], improvements: [], hint: '' });
    } finally { setAiLoading(false); }
  };

  if (!challengeLang) {
    return (
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-10 text-center space-y-2">
        <div className="text-4xl">🎮</div>
        <p className="font-black text-slate-700 text-lg">{lang.name} challenges coming soon!</p>
        <p className="text-sm text-slate-500 font-medium">We're writing them. Check back next update.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className={cn('rounded-2xl p-5 text-white flex items-center justify-between gap-4', lang.bgClass)}>
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-white/70 mb-1">🎮 Coding Challenges</p>
          <h2 className="text-xl font-black">{lang.name} Challenges</h2>
          <p className="text-sm text-white/80 font-medium mt-0.5">
            {challenges.length} challenges · Instant AI feedback
          </p>
        </div>
        <button
          onClick={random}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all text-[10px] font-black uppercase tracking-widest shrink-0"
        >
          <Shuffle size={14} /> Random
        </button>
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'beginner', 'intermediate', 'advanced'] as Diff[]).map(d => (
          <button key={d} onClick={() => setDiff(d)}
            className={cn('px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all',
              diff === d ? `${lang.bgClass} text-white` : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}>
            {d === 'all' ? 'All' : d === 'beginner' ? '🟢 Beginner' : d === 'intermediate' ? '🟡 Mid' : '🔴 Advanced'}
          </button>
        ))}
      </div>

      {/* Challenge grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map(c => (
          <button key={c.id} onClick={() => open(c)}
            className="text-left p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all group">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-black text-slate-800 text-sm group-hover:text-emerald-600 transition-colors">{c.title}</p>
                <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">{c.story}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 shrink-0 mt-1 transition-colors" />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className={cn('text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                c.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700' :
                c.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700',
              )}>{c.difficulty}</span>
              <span className="text-[11px] text-slate-500 font-bold">+{c.xp} XP</span>
              <span className="text-[11px] text-slate-500 font-bold">~{c.estimatedMinutes}min</span>
            </div>
          </button>
        ))}
      </div>

      {/* Challenge modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl"
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            >
              <div className={cn('flex items-center justify-between gap-3 px-6 py-5 rounded-t-[2rem]', lang.bgClass)}>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-white/70">Challenge</p>
                  <p className="text-lg font-black text-white">{selected.title}</p>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all">
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-[11px] font-black uppercase tracking-widest text-amber-700 mb-1">📖 Story</p>
                  <p className="text-sm font-medium text-slate-700">{selected.story}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-700 mb-1">🎯 Task</p>
                  <p className="text-sm font-semibold text-slate-700">{selected.task}</p>
                </div>

                {/* Code editor */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    💻 Write Your Code
                    <span className="ml-2 normal-case font-medium text-slate-400">— type below, then click AI Feedback</span>
                  </p>
                  <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    rows={9}
                    spellCheck={false}
                    className="w-full bg-slate-900 text-emerald-400 rounded-xl p-4 text-sm font-mono resize-y border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {selected.language === 'javascript' && (
                    <button onClick={doRun}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">
                      <Play size={13} /> Run Code
                    </button>
                  )}
                  <button onClick={doAI} disabled={aiLoading}
                    className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                      aiLoading ? 'bg-slate-100 text-slate-400 cursor-wait' : 'bg-violet-600 text-white hover:bg-violet-700',
                    )}>
                    <Sparkles size={13} /> {aiLoading ? 'Checking…' : 'AI Feedback'}
                  </button>
                  <button
                    onClick={() => { setShowHint(true); setHintIdx(h => Math.min(h + 1, selected.hints.length - 1)); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest hover:bg-amber-200 transition-all">
                    <Lightbulb size={13} /> Hint
                  </button>
                </div>

                {/* Run output */}
                {(output || runErr) && (
                  <div className={cn('rounded-xl p-4', runErr ? 'bg-red-50 border border-red-100' : 'bg-slate-900')}>
                    <p className={cn('text-[11px] font-black uppercase tracking-widest mb-2', runErr ? 'text-red-600' : 'text-slate-500')}>
                      {runErr ? '❌ Error' : '▶ Output'}
                    </p>
                    <pre className={cn('text-sm font-mono whitespace-pre-wrap', runErr ? 'text-red-700' : 'text-emerald-400')}>
                      {runErr || output || '(no output)'}
                    </pre>
                  </div>
                )}

                {/* Hint */}
                {showHint && selected.hints[hintIdx] && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-[11px] font-black uppercase tracking-widest text-amber-700 mb-1">
                      💡 Hint {hintIdx + 1} of {selected.hints.length}
                    </p>
                    <p className="text-sm font-medium text-slate-700">{selected.hints[hintIdx]}</p>
                  </div>
                )}

                {/* Reveal expected output (hidden by default — don't spoil!) */}
                <button
                  onClick={() => setShowAnswer(v => !v)}
                  className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-600 transition-colors"
                >
                  {showAnswer ? '🙈 Hide Answer' : '👀 Reveal Expected Output'}
                </button>
                {showAnswer && selected.expectedOutput && (
                  <div className="bg-slate-800 rounded-xl p-4">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">Expected Output</p>
                    <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">{selected.expectedOutput}</pre>
                  </div>
                )}

                {/* AI feedback */}
                {aiFb && (
                  <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={cn('text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full',
                        aiFb.score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                        aiFb.score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700',
                      )}>{aiFb.verdict}</span>
                      <span className="text-sm font-black text-slate-600">{aiFb.score}/100</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{aiFb.summary}</p>
                    {aiFb.hint && (
                      <div className="bg-violet-50 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                        <span className="font-black text-violet-700">Hint: </span>{aiFb.hint}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
