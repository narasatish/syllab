/**
 * WebSlideViewer.tsx
 * Full-screen interactive slide viewer for PPT lessons.
 * No heavy libraries — uses Tailwind + Framer Motion already in the project.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Printer,
  X,
  XCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { PptLesson, PptSlide } from '../lib/api';

/* ─── Slide background palettes ─── */
const BG_PALETTE: Record<string, string> = {
  'gradient-blue': 'from-blue-600 to-indigo-700',
  'gradient-green': 'from-emerald-500 to-teal-700',
  'gradient-orange': 'from-orange-500 to-red-600',
  'gradient-purple': 'from-violet-600 to-purple-800',
  'gradient-pink': 'from-pink-500 to-rose-600',
};
const DEFAULT_BG = 'from-emerald-500 to-teal-700';

function getBg(slide: PptSlide, index: number) {
  if (slide.bg && BG_PALETTE[slide.bg]) return BG_PALETTE[slide.bg];
  const gradients = Object.values(BG_PALETTE);
  return gradients[index % gradients.length];
}

/* ─── Slide renderers ─── */

function TitleSlide({ slide }: { slide: PptSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-6">
      <div className="text-7xl md:text-9xl">{slide.emoji || '📚'}</div>
      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="text-lg md:text-2xl text-white/80 font-semibold max-w-2xl">{slide.subtitle}</p>
      )}
    </div>
  );
}

function OverviewSlide({ slide }: { slide: PptSlide }) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 py-10 gap-6">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{slide.emoji || '📋'}</span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{slide.title}</h2>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {(slide.bullets || []).map((b, i) => (
          <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white font-black text-sm">
              {i + 1}
            </span>
            <span className="text-white font-semibold text-sm md:text-base leading-relaxed">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptSlide({ slide }: { slide: PptSlide }) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 py-10 gap-6">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{slide.emoji || '💡'}</span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">{slide.title}</h2>
      </div>
      {slide.content && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-white/90 font-semibold text-base md:text-lg leading-relaxed">{slide.content}</p>
        </div>
      )}
      {slide.highlight && (
        <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-2xl px-6 py-4">
          <p className="text-yellow-200 font-black text-sm md:text-base">⭐ {slide.highlight}</p>
        </div>
      )}
      {(slide.keyPoints || []).length > 0 && (
        <div className="flex-1 space-y-3">
          {slide.keyPoints!.map((kp, i) => (
            <div key={i} className="flex items-start gap-3">
              <ArrowRight size={16} className="mt-1 text-white/60 shrink-0" />
              <span className="text-white font-semibold text-sm md:text-base leading-relaxed">{kp}</span>
            </div>
          ))}
        </div>
      )}
      {slide.diagramHint && (
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
          <p className="text-white/60 font-mono text-xs md:text-sm whitespace-pre-line">{slide.diagramHint}</p>
        </div>
      )}
    </div>
  );
}

function FormulaSlide({ slide }: { slide: PptSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 md:px-16 py-10 gap-8 text-center">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{slide.emoji || '🧮'}</span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{slide.title}</h2>
      </div>
      {slide.highlight && (
        <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl">
          <p className="text-2xl md:text-4xl font-black text-slate-900 font-mono">{slide.highlight}</p>
        </div>
      )}
      {slide.content && (
        <p className="text-white/80 font-semibold text-base md:text-lg max-w-2xl leading-relaxed">{slide.content}</p>
      )}
      {(slide.keyPoints || []).length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {slide.keyPoints!.map((kp, i) => (
            <span key={i} className="bg-white/20 text-white rounded-full px-4 py-2 text-sm font-bold">{kp}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function McqSlide({
  slide,
  answered,
  setAnswered,
}: {
  slide: PptSlide;
  answered: number | null;
  setAnswered: (i: number) => void;
}) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 py-10 gap-6">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{slide.emoji || '✅'}</span>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{slide.title}</h2>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <p className="text-white font-bold text-lg md:text-xl leading-relaxed">{slide.question}</p>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {(slide.options || []).map((opt, i) => {
          const isCorrect = i === slide.correct;
          const isChosen = answered === i;
          const showResult = answered !== null;
          return (
            <button
              key={i}
              onClick={() => { if (answered === null) setAnswered(i); }}
              disabled={answered !== null}
              className={cn(
                'flex items-start gap-3 rounded-2xl p-5 text-left transition-all font-semibold text-sm md:text-base',
                !showResult && 'bg-white/10 text-white hover:bg-white/20',
                showResult && isCorrect && 'bg-emerald-400/30 border-2 border-emerald-400 text-white',
                showResult && isChosen && !isCorrect && 'bg-red-400/30 border-2 border-red-400 text-white',
                showResult && !isChosen && !isCorrect && 'bg-white/5 text-white/50',
              )}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {showResult && isCorrect && <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />}
              {showResult && isChosen && !isCorrect && <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>
      {answered !== null && slide.explanation && (
        <div className="bg-white/10 rounded-2xl px-6 py-4">
          <p className="text-white/90 font-semibold text-sm md:text-base">
            💬 {slide.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function SummarySlide({ slide }: { slide: PptSlide }) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 py-10 gap-6">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{slide.emoji || '📝'}</span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{slide.title}</h2>
      </div>
      <div className="flex-1 space-y-4">
        {(slide.bullets || []).map((b, i) => (
          <div key={i} className="flex items-start gap-4 bg-white/10 rounded-2xl px-6 py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 font-black text-white text-sm">
              {i + 1}
            </span>
            <span className="text-white font-semibold text-sm md:text-base leading-relaxed">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EndSlide({ slide, onRestart }: { slide: PptSlide; onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-8">
      <div className="text-8xl md:text-[120px]">{slide.emoji || '🏆'}</div>
      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{slide.title}</h1>
      {slide.subtitle && <p className="text-lg md:text-2xl text-white/80 font-semibold">{slide.subtitle}</p>}
      {slide.callToAction && (
        <p className="text-base md:text-lg text-white/70 max-w-xl font-medium">{slide.callToAction}</p>
      )}
      <button
        onClick={onRestart}
        className="mt-4 bg-white text-emerald-700 font-black px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform text-sm uppercase tracking-widest"
      >
        ↩ View from Start
      </button>
    </div>
  );
}

function renderSlide(
  slide: PptSlide,
  mcqState: { answered: number | null; setAnswered: (i: number) => void },
  onRestart: () => void,
) {
  switch (slide.type) {
    case 'title': return <TitleSlide slide={slide} />;
    case 'overview': return <OverviewSlide slide={slide} />;
    case 'formula': return <FormulaSlide slide={slide} />;
    case 'mcq': return <McqSlide slide={slide} answered={mcqState.answered} setAnswered={mcqState.setAnswered} />;
    case 'summary': return <SummarySlide slide={slide} />;
    case 'end': return <EndSlide slide={slide} onRestart={onRestart} />;
    default: return <ConceptSlide slide={slide} />;
  }
}

/* ─── Teacher Notes panel ─── */
function TeacherNotesPanel({ notes, index, onClose }: { notes: string[]; index: number; onClose: () => void }) {
  const note = notes[index] || notes[0] || 'No notes for this slide.';
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute right-0 top-0 bottom-0 w-72 bg-slate-900 text-white p-6 flex flex-col gap-4 shadow-2xl z-20"
    >
      <div className="flex items-center justify-between">
        <span className="font-black text-sm uppercase tracking-widest text-slate-400">Teacher Notes</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <p className="text-white/80 font-medium text-sm leading-relaxed whitespace-pre-line">{note}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */

interface WebSlideViewerProps {
  lesson: PptLesson;
  onClose: () => void;
  onAskTutor: (question: string) => void;
}

export default function WebSlideViewer({ lesson, onClose, onAskTutor }: WebSlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [mcqAnswered, setMcqAnswered] = useState<number | null>(null);
  const slides = lesson.slides || [];
  const total = slides.length;
  const slide = slides[current];
  const progress = total > 1 ? (current / (total - 1)) * 100 : 0;
  const notesRef = useRef(lesson.teacherNotes || []);
  notesRef.current = lesson.teacherNotes || [];

  // Reset MCQ answer when slide changes
  useEffect(() => { setMcqAnswered(null); }, [current]);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= total) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current, total]);

  const goNext = useCallback(() => goTo(current + 1), [goTo, current]);
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, onClose]);

  // Print/PDF
  const handlePrint = () => {
    window.print();
  };

  if (!slide) return null;

  const bgGradient = getBg(slide, current);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.95 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-slate-900 print:static print:inset-auto print:z-auto"
    >
      {/* ─── Top bar ─── */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-slate-900/80 backdrop-blur-sm border-b border-white/5 shrink-0 print:hidden">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
          >
            <X size={16} />
          </button>
          <div className="min-w-0">
            <p className="text-white font-black text-sm truncate">{lesson.chapterTitle}</p>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">
              {lesson.subject} · Class {lesson.classLevel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Ask AI */}
          <button
            onClick={() => onAskTutor(`Explain slide ${current + 1} of "${lesson.chapterTitle}" in simple terms`)}
            title="Ask AI Tutor about this slide"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <Bot size={14} />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
          {/* Notes */}
          {notesRef.current.length > 0 && (
            <button
              onClick={() => setShowNotes(v => !v)}
              title="Teacher Notes"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all text-[11px] font-black uppercase tracking-widest"
            >
              📖 <span className="hidden sm:inline">Notes</span>
            </button>
          )}
          {/* Print */}
          <button
            onClick={handlePrint}
            title="Print / Save as PDF"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <Printer size={14} />
          </button>
        </div>
      </div>

      {/* ─── Progress bar ─── */}
      <div className="h-1 bg-white/10 shrink-0 print:hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ─── Slide area ─── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className={cn(
              'absolute inset-0 bg-gradient-to-br overflow-y-auto',
              bgGradient,
            )}
          >
            {renderSlide(
              slide,
              { answered: mcqAnswered, setAnswered: setMcqAnswered },
              () => goTo(0),
            )}
          </motion.div>
        </AnimatePresence>

        {/* Teacher Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <TeacherNotesPanel
              notes={notesRef.current}
              index={current}
              onClose={() => setShowNotes(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom controls ─── */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-slate-900/80 backdrop-blur-sm border-t border-white/5 shrink-0 print:hidden">
        {/* Prev */}
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-2xl bg-white/10 text-white font-black text-[11px] uppercase tracking-widest hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Slide counter + dots */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 font-bold text-xs">
            {current + 1} / {total}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[200px] md:max-w-xs">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === current ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60',
                )}
              />
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={current === total - 1}
          className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ─── Print styles ─── */}
      <style>{`
        @media print {
          body > *:not(.ppt-print-area) { display: none !important; }
          .ppt-print-area { display: block !important; }
        }
      `}</style>
    </motion.div>
  );
}
