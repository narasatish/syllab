/**
 * LessonViewer — unified slide-based lesson experience.
 *
 * Replaces both "Learn" (ConceptView) and "PPT Lesson" with a single
 * beautiful slide viewer that:
 *   • Shows instantly (story hook slide is client-built, no API wait)
 *   • Streams in AI slides in the background via existing PPT API
 *   • Has per-slide read-aloud (Web Speech API — free, no key)
 *   • Adapts tone for Classes 1-5 (stories) vs 6-10 (examples) vs 11-12 (exam)
 *   • Embeds interactive quiz slides from the lesson's question slides
 *   • 20-25 slides per chapter
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { getDeepPptLesson, DeepPptSlide } from '../lib/pptLessonApi';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type SlideKind =
  | 'hook' | 'concept' | 'visual' | 'example'
  | 'mistake' | 'tip' | 'quiz' | 'summary' | 'celebrate';

interface ViewSlide {
  kind: SlideKind;
  emoji: string;
  title: string;
  body: string;
  bullets?: string[];
  highlight?: string;   // callout box
  footNote?: string;    // small italic text (common mistake etc.)
  bg: string;           // Tailwind gradient string
  // quiz only
  question?: string;
  options?: string[];
  correct?: number;
  explanation?: string;
}

export interface LessonViewerProps {
  classLevel: string;
  subject: string;
  chapterId: string;
  chapterName: string;
  onClose: () => void;
  onPractice: () => void;
}

/* ─── Design constants ───────────────────────────────────────────────────────── */
const SUBJ_EMOJI: Record<string, string> = {
  Physics: '⚡', Chemistry: '🧪', Biology: '🌿', Mathematics: '📐',
  Science: '🔬', English: '📚', History: '🏛️', Geography: '🌏',
  'Social Science': '🌍', default: '📖',
};

const KIND_BG: Record<SlideKind, string> = {
  hook:      'from-violet-600 to-purple-800',
  concept:   'from-blue-600 to-indigo-700',
  visual:    'from-cyan-600 to-blue-700',
  example:   'from-teal-600 to-cyan-700',
  mistake:   'from-rose-600 to-red-700',
  tip:       'from-amber-500 to-yellow-600',
  quiz:      'from-indigo-600 to-violet-700',
  summary:   'from-emerald-600 to-green-700',
  celebrate: 'from-yellow-400 to-orange-500',
};

const KIND_LABEL: Record<SlideKind, string> = {
  hook: '🌟 Story Hook', concept: '📖 Core Concept', visual: '🗺️ Visual',
  example: '✏️ Example', mistake: '⚠️ Watch Out', tip: '💡 Pro Tip',
  quiz: '🧠 Quick Check', summary: '📝 Summary', celebrate: '🎉 Complete',
};

/* ─── Slide builders ─────────────────────────────────────────────────────────── */
function makeHook(name: string, subject: string, classLevel: string): ViewSlide {
  const cls = parseInt(classLevel) || 8;
  let body = '';

  if (cls <= 5) {
    const s: Record<string, string> = {
      Mathematics: `Riya wanted to share her chocolates with 4 friends equally. To do that she needed to know ${name}! Let's help her — and learn something amazing! 🍫`,
      Science:     `Arjun was playing outside when he saw something strange happen. "Why does this happen?" he asked. The answer is ${name}! Let's find out! 🌟`,
      English:     `Once upon a time, a curious student just like YOU wanted to master ${name}. With one simple trick, everything clicked! Let's learn it! ✨`,
      Biology:     `Meera watered her plant every day. "How does it grow so tall?" she wondered. Plants use ${name} to make food! Let's explore! 🌱`,
    };
    body = s[subject] || `Meet Meera and Arjun! They discovered ${name} while playing outside — and it changed how they saw the whole world! Ready to explore? 🌈`;
  } else if (cls <= 10) {
    const s: Record<string, string> = {
      Physics:    `Every bridge, every roller coaster, every smartphone — they all use ${name}. Today you'll understand the science that makes them work! 🌉`,
      Chemistry:  `From the rust on an iron gate to the fizz in your cola — ${name} is happening all around you right now. Let's decode it! ⚗️`,
      Biology:    `Your body performs ${name} millions of times every single second — without you even noticing. Let's zoom in and see what's happening! 🔬`,
      Mathematics:`Architects, engineers and game developers use ${name} every day. Today you're learning their secret tool! 📐`,
    };
    body = s[subject] || `${name} sounds like just a school topic — but it explains real things happening around you right now. Let's discover the connection! 🚀`;
  } else {
    const s: Record<string, string> = {
      Physics:    `${name} is tested in every JEE/NEET paper. Today we build real understanding — not just formula recall. Both are needed to score. 🎯`,
      Chemistry:  `${name} connects theoretical chemistry to real-world applications. Boards test concepts; JEE tests problem-solving. We'll master both. 🧪`,
      Biology:    `${name} is central to NEET Biology. Deep conceptual clarity here earns you marks that memorisation alone can't guarantee. 🌿`,
      Mathematics:`${name} appears in 3-5 questions in every JEE paper. Let's build it from ground level to advanced problem types. 📐`,
    };
    body = s[subject] || `${name} — a topic that demands both conceptual clarity and problem-solving speed. Today we build both together. Let's go. 🏆`;
  }

  return {
    kind: 'hook',
    emoji: SUBJ_EMOJI[subject] || '📖',
    title: name,
    body,
    highlight: cls <= 5
      ? '🎮 Learning is fun — let\'s go!'
      : cls <= 10
      ? '💡 Real-world connections ahead'
      : '🏆 Board + JEE / NEET ready',
    bg: KIND_BG.hook,
  };
}

function pptToView(s: DeepPptSlide, subject: string): ViewSlide {
  const kind: SlideKind =
    s.layout === 'question' ? 'quiz' :
    s.layout === 'revision' ? 'summary' :
    s.layout === 'diagram'  ? 'visual' :
    s.layout === 'example'  ? 'example' :
    s.commonMistake         ? 'mistake' :
    (s.rememberThis || s.examFocus) ? 'tip' :
    'concept';

  const bullets = [...(s.bullets || [])];
  if (s.example && bullets.length > 0 && !bullets.some(b => b.includes(s.example!))) {
    bullets.push(`📌 Example: ${s.example}`);
  }

  const emoji =
    kind === 'mistake' ? '⚠️' : kind === 'tip' ? '💡' : kind === 'visual' ? '🗺️' :
    kind === 'example' ? '✏️' : kind === 'summary' ? '📝' : kind === 'quiz' ? '🧠' :
    SUBJ_EMOJI[subject] || '📖';

  // Quiz slide — interactive
  if (kind === 'quiz' && s.questions?.length) {
    const q = s.questions[0];
    return {
      kind: 'quiz', emoji: '🧠',
      title: s.title || 'Quick Check', body: '',
      question: q.question,
      explanation: q.explanation || q.answer,
      bg: KIND_BG.quiz,
    };
  }

  return {
    kind, emoji,
    title: s.title,
    body: s.subtitle || bullets[0] || '',
    bullets: bullets.length > 1 ? bullets : undefined,
    highlight: s.rememberThis || s.examFocus || undefined,
    footNote: s.commonMistake ? `⚠️ Common mistake: ${s.commonMistake}` : undefined,
    bg: KIND_BG[kind],
  };
}

function makeCelebrate(name: string): ViewSlide {
  return {
    kind: 'celebrate', emoji: '🎉',
    title: 'Lesson Complete!',
    body: `You've finished the full lesson on "${name}". Now lock in what you learned with practice questions!`,
    highlight: '⭐ You\'re ready to practice!',
    bg: KIND_BG.celebrate,
  };
}

/* ─── Speech helpers ─────────────────────────────────────────────────────────── */
const say = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-IN'; u.rate = 0.88;
  window.speechSynthesis.speak(u);
};
const hush = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function LessonViewer({
  classLevel, subject, chapterId, chapterName, onClose, onPractice,
}: LessonViewerProps) {
  const [slides, setSlides] = useState<ViewSlide[]>([makeHook(chapterName, subject, classLevel)]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>({});

  /* Fetch AI slides — hook shows instantly while this loads in background */
  useEffect(() => {
    setLoading(true);
    getDeepPptLesson({ classLevel, subject, chapterTitle: chapterName, chapterId })
      .then(lesson => {
        if (lesson?.slides?.length) {
          const ai = lesson.slides.map(s => pptToView(s, subject));
          setSlides([makeHook(chapterName, subject, classLevel), ...ai, makeCelebrate(chapterName)]);
        } else {
          setSlides(prev => [...prev, makeCelebrate(chapterName)]);
        }
      })
      .catch(() => setSlides(prev => [...prev, makeCelebrate(chapterName)]))
      .finally(() => setLoading(false));
    return () => hush();
  }, [chapterId, classLevel, subject, chapterName]);

  const goTo = (idx: number) => {
    hush(); setSpeaking(false);
    setDir(idx > current ? 1 : -1);
    setCurrent(Math.max(0, Math.min(idx, slides.length - 1)));
  };

  const slide = slides[current];
  const cls   = parseInt(classLevel) || 8;
  const pct   = slides.length > 1 ? Math.round((current / (slides.length - 1)) * 100) : 0;

  const toggleRead = () => {
    if (speaking) { hush(); setSpeaking(false); return; }
    const text = [slide.title, slide.body, slide.question, ...(slide.bullets || [])].filter(Boolean).join('. ');
    say(text); setSpeaking(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-stretch justify-center bg-slate-900/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full overflow-hidden shadow-2xl sm:max-w-xl sm:rounded-[2.5rem]"
        style={{ height: '100dvh', maxHeight: '100dvh' }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-white/20">
          <motion.div className="h-full bg-white/90" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 180 }} />
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current} custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 70, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (d: number) => ({ x: -d * 70, opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className={`absolute inset-0 flex flex-col bg-gradient-to-br ${slide.bg}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-6 z-10 shrink-0">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/50 block">
                  {KIND_LABEL[slide.kind]}
                </span>
                <span className="text-[9px] font-black text-white/40">{current + 1} / {slides.length}{loading && ' · loading…'}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={toggleRead} title="Read aloud"
                  className="rounded-xl bg-white/15 p-2 text-white hover:bg-white/25 transition-colors touch-manipulation">
                  {speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button onClick={() => { hush(); onClose(); }}
                  className="rounded-xl bg-white/15 p-2 text-white hover:bg-white/25 transition-colors touch-manipulation">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-3 text-center">
              {slide.kind === 'quiz'      ? <QuizBlock  slide={slide} idx={current} picks={quizPicks} setPicks={setQuizPicks} /> :
               slide.kind === 'celebrate' ? <CelebBlock onPractice={onPractice} onClose={onClose} /> :
               <NormalBlock slide={slide} cls={cls} />}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-5 pb-7 shrink-0">
              <button onClick={() => current > 0 && goTo(current - 1)} disabled={current === 0}
                className="flex items-center gap-1 rounded-2xl bg-white/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white disabled:opacity-0 hover:bg-white/25 transition touch-manipulation">
                <ChevronLeft size={13} />Back
              </button>

              {/* Dots */}
              <div className="flex gap-[3px] flex-wrap justify-center max-w-[160px]">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className={`rounded-full h-1.5 transition-all ${i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/55'}`} />
                ))}
              </div>

              {current >= slides.length - 1 ? (
                <button onClick={onPractice}
                  className="flex items-center gap-1 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-slate-800 hover:scale-105 transition touch-manipulation">
                  Practice 🎯
                </button>
              ) : (
                <button onClick={() => goTo(current + 1)}
                  className="flex items-center gap-1 rounded-2xl bg-white/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/25 transition touch-manipulation">
                  Next<ChevronRight size={13} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Slide sub-components ───────────────────────────────────────────────────── */
function NormalBlock({ slide, cls }: { slide: ViewSlide; cls: number }) {
  return (
    <>
      <div className="mb-3 text-6xl sm:text-7xl select-none">{slide.emoji}</div>
      <h2 className={`font-black text-white leading-tight mb-3 ${cls <= 5 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
        {slide.title}
      </h2>
      {slide.body && (
        <p className={`text-white/88 leading-relaxed mb-4 ${cls <= 5 ? 'text-base' : 'text-sm sm:text-base'}`}>
          {slide.body}
        </p>
      )}
      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="text-left w-full max-w-sm space-y-2.5 mb-4">
          {slide.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-white/85 text-sm leading-snug">
              <span className="shrink-0 text-white/40 mt-0.5 font-black">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {slide.highlight && (
        <div className="w-full max-w-sm rounded-2xl bg-white/15 border border-white/20 px-4 py-3 text-sm font-bold text-white text-left">
          {slide.highlight}
        </div>
      )}
      {slide.footNote && (
        <p className="mt-3 text-xs text-white/55 italic max-w-sm">{slide.footNote}</p>
      )}
    </>
  );
}

function QuizBlock({ slide, idx, picks, setPicks }: {
  slide: ViewSlide; idx: number;
  picks: Record<number, number>;
  setPicks: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}) {
  const chosen   = picks[idx] ?? -1;
  const answered = chosen !== -1;

  return (
    <>
      <div className="text-5xl mb-2 select-none">🧠</div>
      <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-3">Quick Check</p>
      <p className="text-base font-black text-white mb-5 leading-snug max-w-sm">
        {slide.question || slide.body}
      </p>

      {slide.options?.length ? (
        <div className="w-full max-w-sm space-y-2">
          {slide.options.map((opt, i) => (
            <button key={i} disabled={answered}
              onClick={() => !answered && setPicks(p => ({ ...p, [idx]: i }))}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-left transition-colors touch-manipulation
                ${answered
                  ? i === slide.correct  ? 'bg-emerald-500 text-white'
                    : i === chosen       ? 'bg-rose-500/80 text-white'
                    : 'bg-white/10 text-white/35'
                  : 'bg-white/15 text-white hover:bg-white/25'}`}>
              <span className="font-black mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          ))}
        </div>
      ) : (
        !answered && (
          <button onClick={() => setPicks(p => ({ ...p, [idx]: 0 }))}
            className="rounded-2xl bg-white/20 px-6 py-3 text-sm font-black text-white hover:bg-white/30 transition">
            Show Answer
          </button>
        )
      )}

      {answered && slide.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 w-full max-w-sm rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white/85 text-left">
          💡 {slide.explanation}
        </motion.div>
      )}
    </>
  );
}

function CelebBlock({ onPractice, onClose }: { onPractice: () => void; onClose: () => void }) {
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.5 }}
        className="text-7xl mb-4 select-none">🎉</motion.div>
      <h2 className="text-2xl font-black text-white mb-2">Lesson Complete!</h2>
      <p className="text-white/80 text-sm mb-6 max-w-xs leading-relaxed">
        Excellent work! You've covered the full lesson. Now test what you know with practice questions.
      </p>
      <button onClick={onPractice}
        className="rounded-2xl bg-white px-8 py-3 font-black text-slate-800 hover:scale-105 transition mb-3 text-sm">
        Practice Now 🎯
      </button>
      <button onClick={onClose} className="text-xs text-white/50 hover:text-white/80 transition">
        ← Back to Syllabus
      </button>
    </>
  );
}
