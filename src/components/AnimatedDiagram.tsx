/**
 * AnimatedDiagram — a mobile-first, step-through "explain it visually" player.
 *
 * Each lesson is a sequence of SVG frames (progressive reveal). The learner can
 * auto-play, step forward/back, and tap any step. Below the figure: the current
 * step's caption, a "why this matters" line, and an optional "Practice this"
 * button that deep-links into the relevant study area. 100% client-side static
 * SVG → works offline via the service worker, no API cost.
 */
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import type { VisualLesson } from '../data/visualLessons';

export default function AnimatedDiagram({ lesson, onPractice, onComplete }: { lesson: VisualLesson; onPractice?: (tab: string) => void; onComplete?: () => void }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completed = useRef(false);
  const last = lesson.steps.length - 1;

  // Fire onComplete once, the first time the learner reaches the final step.
  useEffect(() => {
    if (step >= last && !completed.current) { completed.current = true; onComplete?.(); }
  }, [step, last, onComplete]);

  // Auto-advance while playing; stop at the final frame.
  useEffect(() => {
    if (!playing) return;
    if (step >= last) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep((s) => Math.min(s + 1, last)), 2600);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, step, last]);

  const go = (n: number) => { setPlaying(false); setStep(Math.max(0, Math.min(n, last))); };
  const current = lesson.steps[step];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Figure */}
      <div className="relative bg-gradient-to-br from-sky-50 to-emerald-50 p-4 dark:from-slate-900 dark:to-slate-800">
        <div
          key={step}
          className="mx-auto aspect-[4/3] w-full max-w-md animate-[fadeIn_.4s_ease] [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: current.svg }}
        />
        <span className="absolute right-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black text-slate-500 shadow-sm dark:bg-slate-700/80 dark:text-slate-300">
          {step + 1} / {lesson.steps.length}
        </span>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
      </div>

      {/* Caption */}
      <div className="px-5 pt-4">
        <p className="min-h-[3.5rem] text-[15px] font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-white">{step + 1}</span>
          {current.caption}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 px-5 py-3">
        <button onClick={() => go(step - 1)} disabled={step === 0} className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-40 dark:bg-slate-700 dark:text-slate-200" aria-label="Previous step"><ChevronLeft size={18} /></button>
        {step >= last ? (
          <button onClick={() => go(0)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600"><RotateCcw size={16} /> Replay</button>
        ) : (
          <button onClick={() => setPlaying((p) => !p)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600">
            {playing ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play</>}
          </button>
        )}
        <button onClick={() => go(step + 1)} disabled={step === last} className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-40 dark:bg-slate-700 dark:text-slate-200" aria-label="Next step"><ChevronRight size={18} /></button>
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-1.5 pb-3">
        {lesson.steps.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Step ${i + 1}`} className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : 'w-2 bg-slate-300 dark:bg-slate-600'}`} />
        ))}
      </div>

      {/* Why it matters + practice */}
      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/40">
        <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-black text-slate-800 dark:text-slate-100">💡 Why this matters: </span>{lesson.whyItMatters}</p>
        {lesson.practice && onPractice && (
          <button onClick={() => onPractice(lesson.practice!.tab)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-black text-white hover:opacity-90">
            <Sparkles size={15} /> {lesson.practice.label}
          </button>
        )}
      </div>
    </div>
  );
}
