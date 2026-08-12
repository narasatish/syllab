/**
 * FunFactCarousel — auto-rotating animated card showing one fun fact at a time.
 * Auto-advances every 8s. Tap dots or arrows to jump. Pauses on hover.
 * Uses framer-motion (already in deps).
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shuffle, Sparkles } from 'lucide-react';
import { FUN_FACTS, pickRandomFacts, type FunFact } from '../data/funFacts';
import { cn } from '../lib/utils';

const ROTATE_MS = 8000;
const VISIBLE_COUNT = 12; // how many to cycle through per session

export default function FunFactCarousel() {
  // Pick a fresh random selection each mount — students see different facts every visit
  const [facts, setFacts] = useState<FunFact[]>(() => pickRandomFacts(VISIBLE_COUNT));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, ROTATE_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, facts.length]);

  const current = facts[index];

  const next = () => setIndex((i) => (i + 1) % facts.length);
  const prev = () => setIndex((i) => (i - 1 + facts.length) % facts.length);
  const shuffle = () => {
    setFacts(pickRandomFacts(VISIBLE_COUNT));
    setIndex(0);
  };

  return (
    <section
      className="mb-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Fun to know — daily science and history facts"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl"
          >
            <Sparkles className="text-amber-500" size={24} />
          </motion.div>
          <h2 className="text-2xl font-black text-slate-900">
            Fun to Know! <span className="text-amber-500">✨</span>
          </h2>
        </div>
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex items-center gap-2 rounded-xl bg-white border-2 border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-700 hover:border-amber-400 hover:bg-amber-50 transition-all"
        >
          <Shuffle size={14} />
          New facts
        </button>
      </div>

      <div className="relative h-[280px] sm:h-[260px] rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute inset-0 flex flex-col justify-between p-6 sm:p-8 text-white bg-gradient-to-br shadow-2xl',
              current.gradient,
            )}
          >
            {/* Decorative floating shapes */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'blur(40px)' }}
            />
            <motion.div
              className="absolute bottom-0 left-10 w-32 h-32 rounded-full bg-white/10"
              animate={{ scale: [1.1, 1, 1.1], rotate: [180, 90, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'blur(30px)' }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-start gap-4">
              <motion.div
                className="text-6xl sm:text-7xl drop-shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {current.emoji}
              </motion.div>
              <div className="flex-1 min-w-0">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-3">
                  {current.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight mb-2 drop-shadow-md">
                  {current.hook}
                </h3>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-sm sm:text-base font-medium leading-relaxed text-white/95 drop-shadow">
                {current.fact}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next buttons */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Previous fact"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Next fact"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {facts.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === index ? 'w-6 bg-amber-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400',
            )}
            aria-label={`Jump to fact ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
