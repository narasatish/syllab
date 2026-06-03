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

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { getDeepPptLesson, DeepPptSlide } from '../lib/pptLessonApi';
import Mascot, { MascotMood } from './Mascot';
import { playCorrect, playWrong, playPage, playCelebrate, isSoundMuted, setSoundMuted } from '../lib/soundFx';
import { pickSlideImage, LessonImage } from '../lib/lessonImages';
import { getNaturalAudioUrl, TTS_LANGUAGES, TtsLang, TtsVoice } from '../lib/ttsApi';
import SlideDoubtBox from './SlideDoubtBox';
import { MessageCircleQuestion } from 'lucide-react';
import { markStep } from '../lib/mastery';

/* ─── Markdown cleanup ───────────────────────────────────────────────────────── */
// The AI returns markdown like "**Reflection** is ...". We render bold properly
// and strip stray markdown so users never see raw ** or * characters.
function formatInline(text: string): React.ReactNode {
  if (!text) return null;
  const cleaned = text.replace(/`/g, '').replace(/^[\s*•\-]+/, '');
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i} className="font-black text-white">{p.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{p.replace(/\*\*/g, '').replace(/\*/g, '')}</React.Fragment>;
  });
}
// Plain text (for speech) — no markdown symbols at all
function cleanText(text: string): string {
  return (text || '').replace(/\*\*/g, '').replace(/[*`#_]/g, '').replace(/\s+/g, ' ').trim();
}

/* ─── Bullet structuring ─────────────────────────────────────────────────────
   The AI often crams "Example: … Solution: 1. … 2. … 3. …" into ONE line.
   We split that into clean, separately-rendered pieces: labels (Example /
   Solution), numbered steps, and plain points. */
type BulletPiece = { type: 'label' | 'step' | 'point'; text: string; num?: string };

function splitLines(raw: string): string[] {
  let t = (raw || '').trim();
  // Break before section labels
  t = t.replace(/\s*(Solution|Example|Answer|Step|Note|Formula)\s*:/gi, '\n$1:');
  // Break before numbered steps like " 1. " " 2. " (but not decimals like 9.8)
  t = t.replace(/\s+(\d{1,2})\.\s+(?=[A-Za-z(])/g, '\n$1. ');
  return t.split('\n').map(s => s.trim()).filter(Boolean);
}

function expandBullets(bullets: string[]): BulletPiece[] {
  const out: BulletPiece[] = [];
  for (const b of bullets) {
    for (const ln of splitLines(b)) {
      const step = ln.match(/^(\d{1,2})\.\s+(.*)$/);
      const label = ln.match(/^(?:📌\s*)?(Example|Solution|Answer|Note|Formula)\s*:\s*(.*)$/i);
      if (step) {
        out.push({ type: 'step', num: step[1], text: step[2] });
      } else if (label) {
        out.push({ type: 'label', text: label[1] });
        if (label[2]) out.push({ type: 'point', text: label[2] });
      } else {
        out.push({ type: 'point', text: ln });
      }
    }
  }
  return out;
}

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
  image?: LessonImage;  // optional relevant picture
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
  'Social Science': '🌍', 'Financial Literacy': '💰', default: '📖',
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
    image: pickSlideImage(name, classLevel, subject) || undefined,
  };
}

function pptToView(s: DeepPptSlide, subject: string, _chapter: string, classLevel: string): ViewSlide {
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
      title: cleanText(s.title) || 'Quick Check', body: '',
      question: cleanText(q.question),
      explanation: cleanText(q.explanation || q.answer),
      bg: KIND_BG.quiz,
    };
  }

  return {
    kind, emoji,
    title: cleanText(s.title),
    body: s.subtitle || (bullets.length === 1 ? bullets[0] : ''),
    bullets: bullets.length > 1 ? bullets : undefined,
    highlight: s.rememberThis || s.examFocus || undefined,
    footNote: s.commonMistake ? `Common mistake: ${cleanText(s.commonMistake)}` : undefined,
    bg: KIND_BG[kind],
    // Match an image to THIS slide's own content (title + first point), not the chapter.
    // Subject-gated so e.g. Financial Literacy never matches a science diagram.
    image: pickSlideImage(`${s.title} ${bullets[0] || ''} ${s.visualSuggestion || ''}`, classLevel, subject) || undefined,
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
// Pick the most natural-sounding available English voice (prefer Google / neural,
// then an Indian-English voice, then any English voice).
function pickVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find(v => /google/i.test(v.name) && v.lang.startsWith('en')) ||
    voices.find(v => v.lang === 'en-IN') ||
    voices.find(v => /natural|neural/i.test(v.name) && v.lang.startsWith('en')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0]
  );
}
const say = (text: string, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(cleanText(text));
  const v = pickVoice();
  if (v) u.voice = v;
  u.lang = v?.lang || 'en-IN';
  u.rate = 0.9; u.pitch = 1.05;
  if (onEnd) u.onend = onEnd;
  window.speechSynthesis.speak(u);
};
const hush = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function LessonViewer({
  classLevel, subject, chapterId, chapterName, onClose, onPractice,
}: LessonViewerProps) {
  const cls = parseInt(classLevel) || 8;
  const isYoung = cls <= 5;

  const [slides, setSlides] = useState<ViewSlide[]>([makeHook(chapterName, subject, classLevel)]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>({});
  const [autoPlay, setAutoPlay] = useState(false);   // hands-free read mode (Class 1-5)
  const [muted, setMuted]       = useState(isSoundMuted());
  const [lang, setLang]         = useState<TtsLang>('en');
  const [langOpen, setLangOpen] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [doubtOpen, setDoubtOpen] = useState(false);
  // Mastery loop: opening a lesson completes the "Learn" step for this chapter.
  useEffect(() => { if (chapterId) markStep(chapterId, 'learn'); }, [chapterId]);
  const currentRef = useRef(current);
  currentRef.current = current;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speakSeq = useRef(0);  // cancels stale async narration when slide changes
  const ttsVoice: TtsVoice = isYoung ? 'friendly' : 'warm';

  /* Fetch AI slides — hook shows instantly while this loads in background */
  useEffect(() => {
    setLoading(true);
    getDeepPptLesson({ classLevel, subject, chapterTitle: chapterName, chapterId })
      .then(lesson => {
        if (lesson?.slides?.length) {
          const hook = makeHook(chapterName, subject, classLevel);
          const ai = lesson.slides.map(s => pptToView(s, subject, chapterName, classLevel));
          // De-duplicate images: each picture appears on at most ONE slide.
          // Slides whose image is a repeat fall back to clean full-width text.
          const usedImg = new Set<string>();
          if (hook.image) usedImg.add(hook.image.url);
          for (const sl of ai) {
            if (sl.image) {
              if (usedImg.has(sl.image.url)) sl.image = undefined;
              else usedImg.add(sl.image.url);
            }
          }
          setSlides([hook, ...ai, makeCelebrate(chapterName)]);
        } else {
          setSlides(prev => [...prev, makeCelebrate(chapterName)]);
        }
      })
      .catch(() => setSlides(prev => [...prev, makeCelebrate(chapterName)]))
      .finally(() => setLoading(false));
    return () => hush();
  }, [chapterId, classLevel, subject, chapterName]);

  // Stop EVERYTHING that's making sound — browser speech + cached audio + pending async
  const stopAll = () => {
    speakSeq.current++;            // invalidate any in-flight getNaturalAudioUrl
    hush();                        // cancel Web Speech
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setSpeaking(false);
    setAudioLoading(false);
  };

  const goTo = (idx: number) => {
    stopAll();
    if (idx !== current) playPage();
    setDir(idx > current ? 1 : -1);
    setCurrent(Math.max(0, Math.min(idx, slides.length - 1)));
  };

  const slide = slides[current];
  const pct   = slides.length > 1 ? Math.round((current / (slides.length - 1)) * 100) : 0;

  const slideText = (s: ViewSlide) =>
    cleanText([s.title, s.body, s.question, ...(s.bullets || []), s.image?.caption, s.highlight].filter(Boolean).join('. '));

  // Speak a slide using natural neural voice (backend), falling back to Web Speech.
  const speak = async (text: string, onDone?: () => void) => {
    const seq = ++speakSeq.current;
    setSpeaking(true);
    setAudioLoading(true);
    let url: string | null = null;
    try {
      url = await getNaturalAudioUrl(text, { lang, voice: ttsVoice });
    } catch { /* fall through */ }
    if (seq !== speakSeq.current) return;   // slide changed while we were fetching
    setAudioLoading(false);

    if (url) {
      const audio = audioRef.current || new Audio();
      audioRef.current = audio;
      audio.src = url;
      audio.muted = muted;
      audio.onended = () => { if (seq === speakSeq.current) { setSpeaking(false); onDone?.(); } };
      audio.onerror = () => { if (seq === speakSeq.current) say(text, () => { setSpeaking(false); onDone?.(); }); };
      audio.play().catch(() => { if (seq === speakSeq.current) say(text, () => { setSpeaking(false); onDone?.(); }); });
    } else {
      // No backend audio → browser Web Speech (English only)
      say(text, () => { if (seq === speakSeq.current) { setSpeaking(false); onDone?.(); } });
    }
  };

  const toggleRead = () => {
    if (speaking) { stopAll(); return; }
    void speak(slideText(slide));
  };

  const toggleMute = () => {
    const m = !muted; setMuted(m); setSoundMuted(m);
    if (audioRef.current) audioRef.current.muted = m;
  };

  // GUARANTEE: whenever the slide index changes, all narration stops immediately.
  useEffect(() => {
    return () => { hush(); if (audioRef.current) audioRef.current.pause(); };
  }, [current]);

  // Celebrate sound on the final slide
  useEffect(() => {
    if (slide.kind === 'celebrate') playCelebrate();
  }, [slide.kind]);

  // Auto-play (hands-free): narrate each slide, then advance when narration ends.
  useEffect(() => {
    if (!autoPlay) return;
    if (slide.kind === 'quiz' || slide.kind === 'celebrate') { setAutoPlay(false); return; }
    const idxAtStart = current;
    void speak(slideText(slide), () => {
      if (currentRef.current !== idxAtStart) return;
      setTimeout(() => {
        if (currentRef.current !== idxAtStart) return;
        if (idxAtStart < slides.length - 1) { setDir(1); setCurrent(idxAtStart + 1); playPage(); }
        else setAutoPlay(false);
      }, 600);
    });
    return () => { speakSeq.current++; hush(); if (audioRef.current) audioRef.current.pause(); };
  }, [autoPlay, current, slide.kind]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-stretch justify-center bg-slate-900/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => { stopAll(); onClose(); }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full overflow-hidden shadow-2xl sm:max-w-6xl sm:rounded-[2rem]"
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
              <div className="flex gap-2 items-center">
                {/* Language picker for narration */}
                <div className="relative">
                  <button onClick={() => setLangOpen(o => !o)} title="Narration language"
                    className="rounded-xl bg-white/15 px-2.5 py-2 text-white hover:bg-white/25 transition-colors touch-manipulation text-xs font-black flex items-center gap-1">
                    🌐 {lang.toUpperCase()}
                  </button>
                  {langOpen && (
                    <div className="absolute right-0 mt-1 w-32 rounded-xl bg-white shadow-xl overflow-hidden z-30">
                      {TTS_LANGUAGES.map(l => (
                        <button key={l.code}
                          onClick={() => { stopAll(); setLang(l.code); setLangOpen(false); }}
                          className={`block w-full text-left px-3 py-2 text-xs font-bold transition-colors ${lang === l.code ? 'bg-violet-100 text-violet-700' : 'text-slate-700 hover:bg-slate-100'}`}>
                          {l.native} <span className="text-slate-400">({l.label})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Auto-play (hands-free) — shown for young learners */}
                {isYoung && (
                  <button onClick={() => { if (autoPlay) stopAll(); setAutoPlay(a => !a); }}
                    title={autoPlay ? 'Pause auto-read' : 'Auto-read (hands-free)'}
                    className={`rounded-xl p-2 transition-colors touch-manipulation ${autoPlay ? 'bg-white text-violet-700' : 'bg-white/15 text-white hover:bg-white/25'}`}>
                    {autoPlay ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                )}
                <button onClick={toggleRead} title="Read this slide aloud"
                  className="rounded-xl bg-white/15 p-2 text-white hover:bg-white/25 transition-colors touch-manipulation">
                  {audioLoading ? <span className="block h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button onClick={toggleMute} title={muted ? 'Unmute sounds' : 'Mute sounds'}
                  className="rounded-xl bg-white/15 px-2 text-white hover:bg-white/25 transition-colors touch-manipulation text-xs font-black">
                  {muted ? '🔇' : '🔊'}
                </button>
                <button onClick={() => setDoubtOpen(o => !o)} title="Ask the AI tutor about this slide"
                  className={`rounded-xl p-2 transition-colors touch-manipulation ${doubtOpen ? 'bg-white text-indigo-700' : 'bg-white/15 text-white hover:bg-white/25'}`}>
                  <MessageCircleQuestion size={14} />
                </button>
                <button onClick={() => { stopAll(); onClose(); }}
                  className="rounded-xl bg-white/15 p-2 text-white hover:bg-white/25 transition-colors touch-manipulation">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Slide content — centered, max width so full-screen looks clean */}
            <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-3">
              <div className="w-full max-w-4xl mx-auto">
                {slide.kind === 'quiz'      ? <QuizBlock  slide={slide} idx={current} picks={quizPicks} setPicks={setQuizPicks} /> :
                 slide.kind === 'celebrate' ? <CelebBlock onPractice={onPractice} onClose={onClose} /> :
                 <NormalBlock slide={slide} cls={cls} isYoung={isYoung} />}
              </div>
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

        {/* Inline AI doubt-solving — free, instant, on every slide */}
        {doubtOpen && (
          <div className="absolute bottom-0 left-0 right-0 z-30 max-h-[58%] overflow-y-auto rounded-t-3xl bg-white/95 p-4 shadow-2xl backdrop-blur dark:bg-slate-900/95">
            <div className="mx-auto max-w-3xl">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wide text-indigo-500">Ask about: {slide.title}</p>
                <button onClick={() => setDoubtOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={16} /></button>
              </div>
              <SlideDoubtBox
                subject={subject}
                chapter={chapterName}
                classLevel={classLevel}
                slideTitle={slide.title}
                slideText={slide.body || (slide.bullets || []).join('. ')}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Image (calls onFail so the slide can fall back to full-width text) ──────── */
function SlideImage({ image, onFail }: { image: LessonImage; onFail: () => void }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-white/20">
        <img
          src={image.url} alt={image.alt} onError={onFail}
          loading="lazy"
          className="max-h-[40vh] sm:max-h-[52vh] w-auto object-contain bg-white"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-2 text-xs text-white/70 italic text-center max-w-xs">{image.caption}</figcaption>
      )}
    </figure>
  );
}

/* ─── Slide sub-components ───────────────────────────────────────────────────── */
function NormalBlock({ slide, cls, isYoung }: { slide: ViewSlide; cls: number; isYoung: boolean }) {
  // If the matched image fails to load, drop it and use clean full-width text —
  // never show an empty emoji box. (NormalBlock remounts per slide, so this resets.)
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = !!slide.image && !imgFailed;

  // Big emoji / mascot ONLY on the opening hook slide — never on content slides.
  const isHook = slide.kind === 'hook';
  const showMascot = isYoung && (isHook || slide.kind === 'tip' || slide.kind === 'mistake');
  const mascotMood: MascotMood = slide.kind === 'mistake' ? 'oops' : slide.kind === 'tip' ? 'cheer' : 'happy';

  const sizeCls = cls <= 5 ? 'text-base sm:text-lg' : 'text-sm sm:text-[15px]';

  const textCol = (
    <div className={`flex flex-col ${hasImage ? 'text-left items-start' : 'text-center items-center'}`}>
      {showMascot ? (
        <div className="mb-2"><Mascot mood={mascotMood} size={64} /></div>
      ) : isHook && !hasImage ? (
        <div className="mb-4 text-6xl sm:text-7xl select-none">{slide.emoji}</div>
      ) : null}

      <h2 className={`font-black text-white leading-tight mb-4 ${cls <= 5 ? 'text-3xl sm:text-4xl' : hasImage ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
        {formatInline(slide.title)}
      </h2>

      {slide.body && (
        <p className={`text-white/90 mb-5 leading-relaxed ${cls <= 5 ? 'text-lg sm:text-xl' : hasImage ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} ${hasImage ? '' : 'max-w-3xl'}`}>
          {formatInline(slide.body)}
        </p>
      )}

      {slide.bullets && slide.bullets.length > 0 && (
        <div className={`text-left space-y-3 mb-5 w-full ${hasImage ? '' : 'max-w-3xl'}`}>
          {expandBullets(slide.bullets).map((p, i) => {
            if (p.type === 'label') {
              return (
                <p key={i} className="pt-1 text-[11px] font-black uppercase tracking-widest text-white/60">
                  {p.text}
                </p>
              );
            }
            if (p.type === 'step') {
              return (
                <div key={i} className={`flex gap-3 text-white/90 leading-relaxed ${sizeCls}`}>
                  <span className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-black text-white">{p.num}</span>
                  <span className="flex-1">{formatInline(p.text)}</span>
                </div>
              );
            }
            return (
              <div key={i} className={`flex gap-3 text-white/90 leading-relaxed ${sizeCls}`}>
                <span className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="flex-1">{formatInline(p.text)}</span>
              </div>
            );
          })}
        </div>
      )}

      {slide.highlight && (
        <div className={`rounded-2xl bg-white/15 border border-white/20 px-5 py-3.5 text-sm sm:text-base font-bold text-white text-left w-full ${hasImage ? '' : 'max-w-3xl'}`}>
          {formatInline(slide.highlight)}
        </div>
      )}
      {slide.footNote && (
        <p className="mt-3 text-xs sm:text-sm text-amber-200/90 italic">⚠️ {formatInline(slide.footNote.replace(/^⚠️\s*/, ''))}</p>
      )}
    </div>
  );

  // No image (or it failed) → clean full-width text, no emoji box.
  if (!hasImage) return textCol;

  // Two-column: image + text side by side on desktop, stacked on mobile.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 items-center">
      <div className="order-1 sm:order-none"><SlideImage image={slide.image!} onFail={() => setImgFailed(true)} /></div>
      <div className="order-2">{textCol}</div>
    </div>
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
    <div className="flex flex-col items-center text-center">
      <div className="text-5xl mb-2 select-none">🧠</div>
      <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-3">Quick Check</p>
      <p className="text-base sm:text-lg font-black text-white mb-5 leading-snug max-w-lg">
        {formatInline(slide.question || slide.body)}
      </p>

      {slide.options?.length ? (
        <div className="w-full max-w-md space-y-2">
          {slide.options.map((opt, i) => (
            <button key={i} disabled={answered}
              onClick={() => {
                if (answered) return;
                setPicks(p => ({ ...p, [idx]: i }));
                if (i === slide.correct) playCorrect(); else playWrong();
              }}
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
          className="mt-4 w-full max-w-md rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white/85 text-left">
          💡 {formatInline(slide.explanation)}
        </motion.div>
      )}
    </div>
  );
}

function CelebBlock({ onPractice, onClose }: { onPractice: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center">
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
    </div>
  );
}
