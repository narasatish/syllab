/**
 * QuizItem — one self-check question from a deep content block, shared by the
 * /difference-between and /revision-notes clusters. Reveals the explanation
 * only after an answer is picked, so the question is actually attempted.
 */
import { useState } from 'react';
import type { DeepQuiz } from './deepContent';

export default function QuizItem({ item, n }: { item: DeepQuiz; n: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <p className="font-bold text-slate-900 dark:text-slate-100">Q{n}. {item.q}</p>
      <div className="mt-3 grid gap-2">
        {item.options.map((o, j) => {
          const isRight = j === item.correct;
          const show = picked !== null;
          const tone = !show
            ? 'border-slate-200 hover:border-primary hover:bg-primary/5 dark:border-slate-600'
            : isRight
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
              : j === picked
                ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30'
                : 'border-slate-200 opacity-60 dark:border-slate-600';
          return (
            <button
              key={j}
              type="button"
              disabled={show}
              onClick={() => setPicked(j)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition-colors dark:text-slate-200 ${tone}`}
            >
              <span className="mr-2 font-black text-slate-400">{'ABCD'[j]}.</span>{o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <strong className={picked === item.correct ? 'text-emerald-600' : 'text-rose-600'}>
            {picked === item.correct ? 'Correct. ' : `Not quite — the answer is ${'ABCD'[item.correct]}. `}
          </strong>
          {item.why}
        </p>
      )}
    </div>
  );
}
