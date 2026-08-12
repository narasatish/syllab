/**
 * HomeInteractiveDemo — auto-rotating mini demos visitors can interact with
 * directly on the home page. Replaces the static "How to use Syllab" section.
 *
 * Three demos:
 *  1. Quick MCQ — answer a real Class 8 question, see instant feedback
 *  2. AI Tutor preview — typewriter animation of an AI explanation
 *  3. Coding preview — code snippet with a "Run on Coding →" CTA
 */
import React, { useState, useEffect, useRef } from 'react';
// framer-motion removed — pure-CSS animations (see .demo-* in index.css) keep
// the vendor-motion chunk off the home critical path.
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  onNavigate: (tab: string) => void;
}

const ROTATE_MS = 12000;

/* ─── Demo 1: Quick MCQ ───────────────────────────────────────────────────── */
function QuickMcqDemo({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 1; // index of correct option

  const options = ['12', '13', '14', '15'];

  return (
    <div className="grid sm:grid-cols-2 gap-6 items-center h-full">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-3">
          🎯 Try a real question
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          What is √169?
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          Class 8 NCERT · Squares & Square Roots
        </p>
      </div>

      <div className="space-y-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correct;
          const showResult = selected !== null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              disabled={selected !== null}
              className={cn(
                'w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-bold transition-all',
                !showResult && 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50',
                showResult && isCorrect && 'border-emerald-500 bg-emerald-50 text-emerald-800',
                showResult && isSelected && !isCorrect && 'border-rose-500 bg-rose-50 text-rose-800',
                showResult && !isSelected && !isCorrect && 'border-slate-200 bg-slate-50 text-slate-400 opacity-60',
              )}
            >
              <span className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0',
                !showResult && 'bg-slate-100 text-slate-700',
                showResult && isCorrect && 'bg-emerald-500 text-white',
                showResult && isSelected && !isCorrect && 'bg-rose-500 text-white',
                showResult && !isSelected && !isCorrect && 'bg-slate-200 text-slate-400',
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {showResult && isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
              {showResult && isSelected && !isCorrect && <XCircle size={18} className="text-rose-600" />}
            </button>
          );
        })}
        {selected !== null && (
          <div className="demo-fade-up mt-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-xs font-bold text-slate-700">
              {selected === correct ? '🎉 Correct!' : 'Not quite —'}{' '}
              <span className="font-normal text-slate-500">
                √169 = 13 because 13 × 13 = 169.
              </span>
            </p>
            <button
              type="button"
              onClick={() => onNavigate('arena')}
              className="mt-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700"
            >
              Practice 1000+ more →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Demo 2: AI Tutor preview ────────────────────────────────────────────── */
const AI_RESPONSE = "Photosynthesis is how plants make their own food using sunlight! 🌱\n\nThe equation is: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\nIt happens in the leaves, inside the chloroplasts. The green chlorophyll absorbs sunlight, water comes from the roots, and CO₂ comes from the air. The plant makes glucose (food) and releases oxygen for us to breathe!";

function AiTutorDemo({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [text, setText] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setText('');
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setText(AI_RESPONSE.slice(0, i));
      if (i >= AI_RESPONSE.length) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 20);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="grid sm:grid-cols-2 gap-6 items-center h-full">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-3">
          🤖 Ask the AI Tutor
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Stuck on a concept? Just ask.
        </h3>
        <p className="text-sm text-slate-500 font-medium mb-4">
          Get step-by-step explanations in plain English. Available 24/7. Free.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('learning_lab')}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 text-white px-5 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors"
        >
          <Sparkles size={14} />
          Open AI Tutor
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 max-h-[280px] overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-violet-600 text-white text-sm font-bold rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
            Explain photosynthesis to me 🌿
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 text-sm">🤖</div>
          <div className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%] whitespace-pre-line">
            {text}
            <span className="demo-cursor inline-block w-0.5 h-4 bg-violet-500 ml-0.5 align-middle" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Demo 3: Coding preview ──────────────────────────────────────────────── */
function CodingDemo({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 items-center h-full">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-3">
          💻 Live coding
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Run real code in your browser.
        </h3>
        <p className="text-sm text-slate-500 font-medium mb-4">
          Python, JavaScript, SQL & Java — no install needed. AI explains your code.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('skills_lab')}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
        >
          Start Coding
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900 p-4 font-mono text-sm">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500 ml-2">python · main.py</span>
        </div>
        <div className="demo-code-in">
          <div className="text-slate-400"><span className="text-violet-400">def</span> <span className="text-cyan-300">greet</span>(name):</div>
          <div className="text-slate-300 pl-4"><span className="text-violet-400">return</span> <span className="text-emerald-300">f"Namaste, {`{name}`}! 🙏"</span></div>
          <div className="mt-2 text-slate-500">{'>>>'} <span className="text-slate-300">greet(<span className="text-emerald-300">"Priya"</span>)</span></div>
          <div className="demo-line-in text-emerald-400">
            'Namaste, Priya! 🙏'
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Carousel wrapper ────────────────────────────────────────────────────── */
export default function HomeInteractiveDemo({ onNavigate }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const demos = [QuickMcqDemo, AiTutorDemo, CodingDemo];
  const labels = ['Quick Quiz', 'AI Tutor', 'Coding'];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % demos.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, demos.length]);

  const CurrentDemo = demos[index];

  return (
    <section
      className="max-w-6xl mx-auto px-5 py-12 sm:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-[11px] font-black uppercase tracking-widest mb-4">
          <Sparkles size={13} /> See it in action
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
          Try Syllab right here.
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          No sign-up. No tour. Just real features you can poke at.
        </p>
      </div>

      <div className="relative">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 sm:p-8 min-h-[340px]">
          <div key={index} className="demo-slide-in h-full">
            <CurrentDemo onNavigate={onNavigate} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + demos.length) % demos.length)}
          className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg hover:bg-slate-50 hover:scale-110 transition-all flex items-center justify-center"
          aria-label="Previous demo"
        >
          <ChevronLeft size={20} className="text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % demos.length)}
          className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg hover:bg-slate-50 hover:scale-110 transition-all flex items-center justify-center"
          aria-label="Next demo"
        >
          <ChevronRight size={20} className="text-slate-700" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-widest transition-all',
              i === index
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}
          >
            <span className={cn(
              'w-1.5 h-1.5 rounded-full',
              i === index ? 'bg-white' : 'bg-slate-400',
            )} />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
