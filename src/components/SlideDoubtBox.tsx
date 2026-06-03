/**
 * SlideDoubtBox — inline AI doubt-solving for a lesson slide (Syllab's free,
 * instant alternative to paid human tutors). Two actions:
 *   • "Explain simpler"  → re-explains the current slide at an easier level
 *   • "Ask a doubt"      → free-text question answered with slide context
 * Uses the existing askTutor() backend. Fully self-contained and additive.
 */
import React, { useState } from 'react';
import { Sparkles, MessageCircleQuestion, Loader2 } from 'lucide-react';
import { askTutor } from '../lib/api';

interface Props {
  subject: string;
  chapter: string;
  classLevel: string;
  slideTitle: string;
  slideText: string;
}

export default function SlideDoubtBox({ subject, chapter, classLevel, slideTitle, slideText }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async (instruction: string) => {
    setLoading(true);
    setAnswer('');
    setOpen(true);
    const context =
      `You are a warm, encouraging Indian teacher helping a Class ${classLevel} student studying ${subject}. ` +
      `Chapter: "${chapter}". The student is on this slide: "${slideTitle}" — ${slideText}. ` +
      `Answer in simple, clear language with one relatable Indian example. Keep it under 120 words.`;
    try {
      const a = await askTutor(`${context}\n\n${instruction}`);
      setAnswer(a || 'Hmm, I could not generate an answer. Please try again.');
    } catch {
      setAnswer('I could not reach the AI tutor just now (it may be waking up). Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => ask('Explain this slide again in the simplest possible way, as if to a 10-year-old, using one everyday example.')}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-indigo-600 shadow-sm ring-1 ring-indigo-100 hover:bg-indigo-50 disabled:opacity-50 dark:bg-slate-700 dark:text-indigo-300 dark:ring-slate-600"
        >
          <Sparkles size={14} /> Explain simpler
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-600"
        >
          <MessageCircleQuestion size={14} /> Ask a doubt
        </button>
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-indigo-400">Free AI tutor</span>
      </div>

      {open ? (
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && q.trim() && !loading) ask(`The student's doubt: ${q.trim()}`); }}
              placeholder="Type your doubt about this slide…"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={() => q.trim() && !loading && ask(`The student's doubt: ${q.trim()}`)}
              disabled={loading || !q.trim()}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Ask
            </button>
          </div>
          {loading ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-indigo-500"><Loader2 size={14} className="animate-spin" /> Thinking…</p>
          ) : null}
          {answer ? (
            <div className="whitespace-pre-wrap rounded-xl bg-white p-3 text-sm leading-relaxed text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-100">{answer}</div>
          ) : null}
        </div>
      ) : loading ? (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-indigo-500"><Loader2 size={14} className="animate-spin" /> Thinking…</p>
      ) : answer ? (
        <div className="mt-3 whitespace-pre-wrap rounded-xl bg-white p-3 text-sm leading-relaxed text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-100">{answer}</div>
      ) : null}
    </div>
  );
}
