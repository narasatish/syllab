/**
 * StoryLessonViewer — renders a narrative, story-based lesson (see
 * src/data/storyLessons.ts). Mobile-first: one slide at a time, big tap targets,
 * swipe-free simple nav, and the global AI-tutor FAB is hidden by the parent
 * while this is open (so it never overlaps the Next button).
 */
import { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Sparkles, BookOpen, PenLine, Trophy, Map } from 'lucide-react';
import type { StoryLesson, StorySlide } from '../data/storyLessons';

const KIND_META: Record<StorySlide['kind'], { label: string; Icon: typeof BookOpen; grad: string }> = {
  title:     { label: 'Story',     Icon: Sparkles, grad: 'from-violet-500 to-indigo-600' },
  story:     { label: 'Story Time', Icon: BookOpen, grad: 'from-violet-500 to-indigo-600' },
  concept:   { label: 'Concept',   Icon: Map,      grad: 'from-emerald-500 to-teal-600' },
  example:   { label: 'Worked Example', Icon: PenLine, grad: 'from-orange-500 to-amber-600' },
  challenge: { label: 'Challenge', Icon: Trophy,   grad: 'from-pink-500 to-rose-600' },
  recap:     { label: 'Recap',     Icon: Trophy,   grad: 'from-emerald-600 to-green-700' },
};

function StoryImage({ url, alt }: { url: string; alt?: string }) {
  // Same mobile-hardening as the lesson viewer: eager + no-referrer + retry once.
  const retries = useRef(0);
  return (
    <img
      src={url}
      alt={alt || ''}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (retries.current < 1) {
          retries.current += 1;
          e.currentTarget.src = url + (url.includes('?') ? '&' : '?') + 'retry=' + retries.current;
        } else {
          e.currentTarget.style.display = 'none';
        }
      }}
      className="mx-auto max-h-[34vh] w-auto rounded-2xl object-contain bg-white shadow-lg"
    />
  );
}

export default function StoryLessonViewer({ lesson, onClose }: { lesson: StoryLesson; onClose?: () => void }) {
  const total = lesson.slides.length + 1; // +1 for the cover
  const [index, setIndex] = useState(0);
  const isCover = index === 0;
  const slide = isCover ? null : lesson.slides[index - 1];
  const progress = Math.round(((index + 1) / total) * 100);

  // Keyboard nav + reset scroll on slide change.
  const bodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((v) => Math.min(total - 1, v + 1));
      else if (e.key === 'ArrowLeft') setIndex((v) => Math.max(0, v - 1));
      else if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, total, onClose]);

  const meta = slide ? KIND_META[slide.kind] : KIND_META.title;

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-white sm:rounded-[2rem] sm:border sm:border-slate-100">
      {/* Header */}
      <div className={`shrink-0 bg-gradient-to-r p-4 text-white sm:p-6 ${meta.grad}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/80">
              Story Lesson · {lesson.subject} · Class {lesson.classLevel}
            </p>
            <h2 className="mt-1 truncate text-lg font-extrabold leading-tight sm:text-2xl">{lesson.title}</h2>
            <p className="mt-0.5 text-xs text-white/80">{isCover ? 'Cover' : `Slide ${index} of ${lesson.slides.length}`}</p>
          </div>
          {onClose && (
            <button onClick={onClose} aria-label="Close" className="shrink-0 rounded-xl bg-white/15 p-2.5 text-white hover:bg-white/25 transition-all touch-manipulation">
              <X size={20} />
            </button>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8">
        <div className="mx-auto flex min-h-full max-w-2xl flex-col">
          {/* my-auto centres short slides vertically; tall slides collapse the
              auto margins and scroll normally — so slides never look half-empty. */}
          <div className="my-auto w-full">
          {isCover ? (
            <div className="text-center">
              <div className="text-6xl sm:text-7xl">📖</div>
              <h1 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{lesson.title}</h1>
              <p className="mt-3 text-base font-semibold text-slate-600 sm:text-lg">{lesson.hook}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {lesson.characters.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-left">
                    <span className="text-2xl">{c.emoji || '🙂'}</span>
                    <span><span className="block text-sm font-black text-slate-900">{c.name}</span><span className="block text-[11px] font-medium text-slate-500">{c.role}</span></span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">Tap Next to begin the journey →</p>
            </div>
          ) : slide ? (
            <>
              <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-white ${meta.grad}`}>
                <meta.Icon className="h-3.5 w-3.5" /> {meta.label}
                {slide.emoji ? <span className="text-sm">{slide.emoji}</span> : null}
              </div>

              {slide.emoji && <div className="mb-2 text-5xl leading-none sm:text-6xl">{slide.emoji}</div>}

              <h3 className="text-xl font-extrabold leading-tight text-slate-900 sm:text-3xl">{slide.title}</h3>

              {slide.storyContext && (
                <p className="mt-4 rounded-r-2xl border-l-4 border-violet-300 bg-violet-50/60 py-4 pl-5 pr-4 text-lg italic leading-relaxed text-slate-700 sm:text-xl">
                  {slide.storyContext}
                </p>
              )}

              {slide.image?.url && (
                <div className="mt-5"><StoryImage url={slide.image.url} alt={slide.image.alt} /></div>
              )}

              {slide.points && slide.points.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {slide.points.map((p, i) => (
                    <li key={i} className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm sm:p-4">
                      {p.label && <span className="mb-1 block text-[11px] font-black uppercase tracking-widest text-primary-dark">{p.label}</span>}
                      <span className="text-base leading-7 text-slate-800">{p.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {slide.example && (
                <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50/70 p-4 sm:p-5">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-700"><PenLine className="h-3.5 w-3.5" /> Worked Example</p>
                  <p className="font-semibold text-slate-800">{slide.example.problem}</p>
                  <p className="mt-2 leading-7 text-slate-700"><span className="font-black text-orange-700">Solution: </span>{slide.example.solution}</p>
                </div>
              )}

              {slide.inSimpleWords && (
                <div className="mt-5 flex items-start gap-2 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <p className="text-base font-bold leading-relaxed text-emerald-900"><span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">In simple words </span><br />{slide.inSimpleWords}</p>
                </div>
              )}
            </>
          ) : null}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="shrink-0 border-t border-slate-100 bg-white p-3 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setIndex((v) => Math.max(0, v - 1))}
            disabled={index === 0}
            className="flex min-w-[80px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-40 touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>

          <div className="flex max-w-[40%] gap-1 overflow-x-auto scrollbar-none">
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i}`}
                className={`h-2 shrink-0 rounded-full transition-all touch-manipulation ${i === index ? 'w-6 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'}`} />
            ))}
          </div>

          {index === total - 1 ? (
            <button onClick={onClose} className="flex min-w-[80px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 touch-manipulation">
              Done <Trophy className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => setIndex((v) => Math.min(total - 1, v + 1))}
              className="flex min-w-[80px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 touch-manipulation">
              Next <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
