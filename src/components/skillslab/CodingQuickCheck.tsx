/**
 * CodingQuickCheck — "Quick Check" MCQs shown after a coding topic's lesson
 * (DataCamp-style follow-up questions). Loads questions lazily per topic id;
 * renders nothing if a topic has none. Instant feedback + explanation.
 */
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { loadCodingMcqs, CodingMcq } from '../../lib/codingMcqs';

export default function CodingQuickCheck({ topicId }: { topicId: string }) {
  const [mcqs, setMcqs] = useState<CodingMcq[] | null>(null);
  const [picks, setPicks] = useState<Record<number, number>>({});

  useEffect(() => {
    let alive = true;
    setPicks({});
    loadCodingMcqs().then((all) => { if (alive) setMcqs(all[topicId] || []); });
    return () => { alive = false; };
  }, [topicId]);

  if (!mcqs || mcqs.length === 0) return null;

  return (
    <section className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-slate-700 dark:bg-slate-800/40">
      <div className="mb-3 flex items-center gap-2">
        <HelpCircle size={18} className="text-indigo-500" />
        <h3 className="text-sm font-black uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Quick Check</h3>
        <span className="ml-auto text-[11px] font-semibold text-slate-500">{mcqs.length} questions</span>
      </div>
      <div className="space-y-5">
        {mcqs.map((m, qi) => {
          const picked = picks[qi];
          const answered = picked !== undefined;
          return (
            <div key={qi} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <p className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-100">{qi + 1}. {m.q}</p>
              <div className="grid gap-2">
                {m.options.map((opt, oi) => {
                  const isCorrect = oi === m.correct;
                  const isPicked = picked === oi;
                  const cls = !answered
                    ? 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                    : isCorrect
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10'
                    : isPicked
                    ? 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-500/10'
                    : 'border-slate-200 bg-white opacity-60 dark:border-slate-700 dark:bg-slate-800';
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() => setPicks((p) => ({ ...p, [qi]: oi }))}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors dark:text-slate-200 ${cls}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect ? <CheckCircle2 size={16} className="text-emerald-500" /> : null}
                      {answered && isPicked && !isCorrect ? <XCircle size={16} className="text-rose-500" /> : null}
                    </button>
                  );
                })}
              </div>
              {answered ? (
                <p className="mt-2 rounded-xl bg-slate-50 p-3 text-xs font-semibold leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {picked === m.correct ? '✅ Correct! ' : '❌ Not quite. '}{m.explanation}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
