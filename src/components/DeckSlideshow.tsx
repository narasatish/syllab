/**
 * DeckSlideshow — shows an uploaded chapter PPT (exported as slide images) exactly
 * as designed. One image per slide, Prev/Next + dots, mobile-first. The parent
 * hides the global AI-tutor FAB while this is open (see Syllabus `lessonOpen`).
 */
import { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import type { UploadedDeck } from '../data/uploadedDecks';

export default function DeckSlideshow({ deck, onClose }: { deck: UploadedDeck; onClose?: () => void }) {
  const total = deck.slides.length;
  const [i, setI] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI((v) => Math.min(total - 1, v + 1));
      else if (e.key === 'ArrowLeft') setI((v) => Math.max(0, v - 1));
      else if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total, onClose]);

  // Preload the neighbouring slides for snappy nav.
  useEffect(() => {
    [i + 1, i - 1].forEach((n) => {
      if (n >= 0 && n < total) { const im = new Image(); im.src = deck.slides[n]; }
    });
  }, [i, total, deck.slides]);

  const goFullscreen = () => { wrapRef.current?.requestFullscreen?.().catch(() => {}); };

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-white sm:rounded-[2rem] sm:border sm:border-slate-100">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 p-3 text-white sm:p-4">
        <div className="min-w-0">
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/80">Story Lesson · Class {deck.classLevel}{deck.subject ? ` · ${deck.subject}` : ''}</p>
          <h2 className="truncate text-base font-extrabold leading-tight sm:text-xl">{deck.chapter}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button onClick={goFullscreen} aria-label="Fullscreen" className="hidden rounded-xl bg-white/15 p-2.5 text-white hover:bg-white/25 transition-all sm:block touch-manipulation"><Maximize2 size={18} /></button>
          {onClose && <button onClick={onClose} aria-label="Close" className="rounded-xl bg-white/15 p-2.5 text-white hover:bg-white/25 transition-all touch-manipulation"><X size={20} /></button>}
        </div>
      </div>

      {/* Slide image */}
      <div ref={wrapRef} className="relative flex flex-1 min-h-0 items-center justify-center bg-slate-900 p-2 sm:p-4">
        <img
          src={deck.slides[i]}
          alt={`${deck.chapter} — slide ${i + 1}`}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          loading="eager"
          decoding="async"
        />
        {/* Tap zones for mobile: left half = prev, right half = next */}
        <button aria-label="Previous slide" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} className="absolute inset-y-0 left-0 w-1/3 cursor-default disabled:pointer-events-none" />
        <button aria-label="Next slide" onClick={() => setI((v) => Math.min(total - 1, v + 1))} disabled={i === total - 1} className="absolute inset-y-0 right-0 w-1/3 cursor-default disabled:pointer-events-none" />
      </div>

      {/* Nav */}
      <div className="shrink-0 border-t border-slate-100 bg-white p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <button onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} className="flex min-w-[84px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-40 touch-manipulation">
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>
          <div className="flex max-w-[45%] items-center gap-1 overflow-x-auto scrollbar-none px-1">
            {deck.slides.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} className={`h-2 shrink-0 rounded-full transition-all touch-manipulation ${n === i ? 'w-6 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'}`} />
            ))}
          </div>
          <button onClick={() => (i === total - 1 ? onClose?.() : setI((v) => Math.min(total - 1, v + 1)))} className="flex min-w-[84px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 touch-manipulation">
            {i === total - 1 ? 'Done' : <>Next <ArrowRight className="h-4 w-4" /></>}
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">Slide {i + 1} of {total}</p>
      </div>
    </section>
  );
}
