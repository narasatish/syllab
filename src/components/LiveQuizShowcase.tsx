import { useEffect, useRef, useState } from 'react';
import { HERO_QUIZ_SAMPLES } from '../data/heroQuizSamples';
import {
  advance, phaseDuration, isOptionHighlighted, isAnswerRevealed,
  INITIAL_STATE, type QuizRotationState,
} from '../lib/quizRotation';

/**
 * Homepage showcase: a real MCQ that answers itself, on a loop.
 *
 * Placement: BELOW the hero, never inside it. The hero <h1> is the LCP element
 * and a card this size would take that role, undoing the LCP work.
 *
 * Timing: the rotation does not start until 4s after mount, via setTimeout —
 * NOT requestIdleCallback. ric(cb, { timeout: N }) fires at the first idle
 * moment or N, whichever is SOONER, so it does not defer anything; that exact
 * mistake is what made two earlier "deferrals" in this codebase no-ops. Until
 * the timer fires the card sits on question 1 in its resting state, which is
 * also exactly what a visitor with JS disabled or reduced-motion set will see.
 *
 * Layout stability: the card has a fixed min-height and the options list always
 * renders four rows, so cycling between a short question and a long one cannot
 * shift the page. Desktop field CLS is already borderline.
 *
 * Accessibility: this is decorative motion, so it is aria-hidden from the
 * rotation's point of view — a screen reader gets one static, complete
 * question rather than content mutating underneath it. prefers-reduced-motion
 * stops the rotation entirely.
 */
export default function LiveQuizShowcase() {
  const samples = HERO_QUIZ_SAMPLES;
  const [state, setState] = useState<QuizRotationState>(INITIAL_STATE);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!samples.length) return;
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // stays on question 1, fully readable

    let cancelled = false;
    // The next timer is scheduled OUT here, from a local, and setState is
    // handed a plain value. It must NOT go inside a setState(prev => …)
    // updater: React StrictMode double-invokes updater functions in
    // development to surface impurity, so a setTimeout in there would be
    // scheduled twice per step — and each of those two would schedule two
    // more. That is exponential timer growth, not a style nit.
    let current = INITIAL_STATE;
    const step = () => {
      if (cancelled) return;
      current = advance(current, samples.length);
      setState(current);
      timer.current = window.setTimeout(step, phaseDuration(current));
    };

    // Start well clear of LCP. A real timer, not requestIdleCallback.
    const kickoff = window.setTimeout(step, 4000);

    return () => {
      cancelled = true;
      clearTimeout(kickoff);
      if (timer.current !== undefined) clearTimeout(timer.current);
    };
  }, [samples.length]);

  if (!samples.length) return null;

  const s = samples[state.index];
  const revealed = isAnswerRevealed(state);

  return (
    <section className="reveal mx-auto max-w-6xl px-5 py-8 sm:py-10" aria-labelledby="live-quiz-heading">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="live-quiz-heading" className="text-lg font-black tracking-tight sm:text-xl">
          Try a real question
        </h2>
        <p className="label">Straight from our free chapter-wise MCQ bank</p>
      </div>

      <div className="grid items-center gap-6 sm:grid-cols-[1.1fr_1fr]">
        {/* Fixed floor height so the box does not resize as questions of
            different lengths rotate through it — every resize would shift
            everything below it. 19rem was measured as too small: the card went
            325px -> 347px between two questions. 23rem clears the tallest of
            the five with headroom; a full-cycle measurement asserts the height
            never changes. Re-check this if a longer question is added. */}
        <div className="min-h-[23rem] rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800">
          <div className="label-caps">
            Class {s.classLevel} · {s.subject}
          </div>
          <p className="mt-2 text-base font-black leading-snug text-slate-900 sm:text-lg dark:text-slate-100">
            {s.q}
          </p>

          <ul className="mt-4 space-y-2">
            {s.options.map((opt, i) => {
              const hot = isOptionHighlighted(state, i, s.correct);
              return (
                <li
                  key={opt}
                  className={
                    'flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-bold transition-colors duration-300 ' +
                    (hot
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700')
                  }
                >
                  <span
                    className={
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ' +
                      (hot ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500')
                    }
                  >
                    {hot && revealed ? '✓' : 'ABCD'[i]}
                  </span>
                  <span className="min-w-0">{opt}</span>
                </li>
              );
            })}
          </ul>

          {/* Reserved row: always present so revealing the answer adds no height. */}
          <p className="mt-3 min-h-[1.25rem] text-xs font-bold text-primary">
            {revealed ? `Correct — ${s.options[s.correct]}` : ' '}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            Every chapter comes with practice MCQs, the correct answer and a worked
            explanation — no sign-up, no paywall.
          </p>
          <a
            href="/mcqs"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-white"
          >
            Practise chapter-wise MCQs
          </a>
          <p className="label mt-3">{s.chapter}</p>
        </div>
      </div>
    </section>
  );
}
