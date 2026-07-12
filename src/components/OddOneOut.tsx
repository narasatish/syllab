/**
 * OddOneOut — tap the picture that doesn't belong. Builds observation and
 * categorisation skills for Syllab Junior. Static rounds, 100% client-side.
 */
import { useMemo, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Check, RotateCcw, PartyPopper } from 'lucide-react';

// Each round: items + the index of the odd one + a hint of why.
const ROUNDS: { items: string[]; odd: number; why: string }[] = [
  { items: ['🍎', '🍌', '🐶', '🍇'], odd: 2, why: 'Dog is an animal — the rest are fruits.' },
  { items: ['🐱', '🐶', '🚗', '🐮'], odd: 2, why: 'Car is a vehicle — the rest are animals.' },
  { items: ['🔴', '🔵', '🟢', '🍕'], odd: 3, why: 'Pizza is food — the rest are colours.' },
  { items: ['⚽', '🏀', '🎾', '🌹'], odd: 3, why: 'Rose is a flower — the rest are balls.' },
  { items: ['✈️', '🚀', '🚁', '🐟'], odd: 3, why: 'Fish swims — the rest fly.' },
  { items: ['🍓', '🍒', '🍅', '🚌'], odd: 3, why: 'Bus is a vehicle — the rest are red foods.' },
  { items: ['🐝', '🦋', '🐜', '🐘'], odd: 3, why: 'Elephant is big — the rest are insects.' },
  { items: ['☀️', '🌙', '⭐', '🍎'], odd: 3, why: 'Apple is a fruit — the rest are in the sky.' },
];

function shuffle<T>(a: T[]): T[] { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; }

export default function OddOneOut() {
  const [seed, setSeed] = useState(0);
  const rounds = useMemo(() => shuffle(ROUNDS), [seed]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const round = rounds[idx];
  const done = idx >= rounds.length;

  const pick = useCallback((i: number) => {
    if (revealed) return;
    if (i === round.odd) { setScore((s) => s + 1); setRevealed(true); window.setTimeout(next, 1100); }
    else { setWrongPick(i); window.setTimeout(() => setWrongPick(null), 450); }
  }, [revealed, round]); // eslint-disable-line react-hooks/exhaustive-deps

  function next() { setRevealed(false); setWrongPick(null); setIdx((i) => i + 1); }
  function replay() { setIdx(0); setScore(0); setRevealed(false); setWrongPick(null); setSeed((s) => s + 1); }

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-black text-slate-800">🔍 Odd One Out</h3>
        <span className="text-xs font-bold text-slate-400">{done ? rounds.length : idx + 1}/{rounds.length} · ⭐ {score}</span>
      </div>
      {done ? (
        <div className="py-8 text-center">
          <PartyPopper size={44} className="mx-auto text-amber-500" />
          <p className="mt-2 text-xl font-black text-slate-800">You scored {score}/{rounds.length}! 🎉</p>
          <button onClick={replay} className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600"><RotateCcw size={15} /> Play again</button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-center text-sm font-bold text-slate-500">Tap the one that does NOT belong!</p>
          <div className="grid grid-cols-4 gap-3">
            {round.items.map((it, i) => {
              const isOdd = revealed && i === round.odd;
              const isWrong = wrongPick === i;
              return (
                <motion.button key={i} onClick={() => pick(i)} whileTap={{ scale: 0.94 }}
                  animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}
                  className={`flex aspect-square items-center justify-center rounded-2xl text-4xl transition-colors ${isOdd ? 'border-2 border-emerald-400 bg-emerald-50' : isWrong ? 'border-2 border-rose-400 bg-rose-50' : 'border-2 border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                  {isOdd ? <span className="relative">{it}<Check size={16} className="absolute -right-1 -top-1 rounded-full bg-emerald-500 p-0.5 text-white" /></span> : it}
                </motion.button>
              );
            })}
          </div>
          {revealed ? <p className="mt-3 rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-700">{round.why}</p> : null}
        </>
      )}
    </div>
  );
}
