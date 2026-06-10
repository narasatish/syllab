/**
 * TracingPad — kids trace letters & numbers with a finger or mouse over a faint
 * guide character. Free, client-side. Pick a character, hear it, trace it, clear.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eraser, Volume2 } from 'lucide-react';
import PageHero from './PageHero';
import { cn } from '../lib/utils';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUMBERS = '0123456789'.split('');
const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f97316', '#a855f7'];

function speak(text: string) {
  try {
    if (!window.speechSynthesis || !text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find((x) => x.lang === 'en-IN') || voices.find((x) => /^en/i.test(x.lang)) || null;
    if (v) u.voice = v;
    u.lang = v?.lang || 'en-IN'; u.rate = 0.68; u.pitch = 1.1; // slow + clear for little ears
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}

export default function TracingPad({ goBack }: { goBack: (parent: string) => void }) {
  const [mode, setMode] = useState<'letters' | 'numbers'>('letters');
  const [char, setChar] = useState('A');
  const [color, setColor] = useState(COLORS[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  const clear = () => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (ctx) ctx.clearRect(0, 0, c.width, c.height);
  };
  // Clear the canvas whenever the character changes.
  useEffect(() => { clear(); }, [char]);

  const pos = (e: React.PointerEvent) => {
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };
  const down = (e: React.PointerEvent) => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    drawing.current = true;
    const { x, y } = pos(e);
    ctx.strokeStyle = color; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x, y);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d'); if (!ctx) return;
    const { x, y } = pos(e); ctx.lineTo(x, y); ctx.stroke();
  };
  const up = () => { drawing.current = false; };

  const chars = mode === 'letters' ? LETTERS : NUMBERS;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="✏️" title="Tracing" subtitle="Pick a letter or number, then trace over it with your finger!" className="mb-6" />

      {/* Mode toggle */}
      <div className="mb-4 flex justify-center gap-2">
        {(['letters', 'numbers'] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setChar(m === 'letters' ? 'A' : '0'); }}
            className={cn('rounded-full px-4 py-1.5 text-sm font-black capitalize', mode === m ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
            {m}
          </button>
        ))}
      </div>

      {/* Character chips */}
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {chars.map((ch) => (
          <button key={ch} onClick={() => { setChar(ch); speak(mode === 'letters' ? `${ch}.` : ch); }}
            className={cn('h-9 w-9 rounded-lg text-sm font-black transition-transform', char === ch ? 'scale-110 bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}>
            {ch}
          </button>
        ))}
      </div>

      {/* Trace canvas with faint guide character behind */}
      <div className="mx-auto w-full max-w-sm">
        <div className="relative aspect-square w-full rounded-3xl border-4 border-dashed border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="select-none font-black text-slate-200" style={{ fontSize: '16rem', lineHeight: 1 }}>{char}</span>
          </div>
          <canvas
            ref={canvasRef}
            width={360}
            height={360}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerLeave={up}
            className="absolute inset-0 h-full w-full touch-none rounded-3xl"
          />
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex gap-1.5">
            {COLORS.map((c) => (
              <button key={c} onClick={() => setColor(c)} style={{ backgroundColor: c }}
                className={cn('h-8 w-8 rounded-full border-2 transition-transform', color === c ? 'scale-110 border-slate-900' : 'border-white shadow')} />
            ))}
          </div>
          <button onClick={() => speak(mode === 'letters' ? `${char}.` : char)} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700 hover:bg-slate-200">
            <Volume2 size={15} /> Hear
          </button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={clear} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">
            <Eraser size={15} /> Clear
          </motion.button>
        </div>
      </div>
    </div>
  );
}
