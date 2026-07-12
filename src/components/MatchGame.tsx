/**
 * MatchGame — tap-to-connect matching game for Syllab Junior. The two columns are
 * shuffled; tap a left item, then its partner on the right. Correct pairs lock in
 * green; wrong taps shake. Finish to celebrate, then play again. 100% client-side.
 */
import { useMemo, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Check, RotateCcw, PartyPopper } from 'lucide-react';
import type { MatchSet } from '../data/kids/matchSets';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function MatchGame({ set }: { set: MatchSet }) {
  const [round, setRound] = useState(0); // bump to reshuffle
  const left = useMemo(() => shuffle(set.pairs), [set, round]);
  const right = useMemo(() => shuffle(set.pairs), [set, round]);
  const [picked, setPicked] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  const done = matched.size === set.pairs.length;

  const tapRight = useCallback((id: string) => {
    if (!picked || matched.has(id)) return;
    if (id === picked) {
      setMatched((m) => new Set(m).add(id));
      setPicked(null);
    } else {
      setWrong(id);
      window.setTimeout(() => setWrong(null), 450);
      setPicked(null);
    }
  }, [picked, matched]);

  const replay = () => { setMatched(new Set()); setPicked(null); setWrong(null); setRound((r) => r + 1); };

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-black text-slate-800">{set.emoji} {set.title}</h3>
        <span className="text-xs font-bold text-slate-400">{matched.size}/{set.pairs.length}</span>
      </div>

      {done ? (
        <div className="py-8 text-center">
          <PartyPopper size={44} className="mx-auto text-amber-500" />
          <p className="mt-2 text-xl font-black text-slate-800">You matched them all! 🎉</p>
          <button onClick={replay} className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600"><RotateCcw size={15} /> Play again</button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-center text-xs font-bold text-slate-400">Tap a picture on the left, then tap its match on the right!</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {left.map((p) => {
                const isMatched = matched.has(p.id);
                const isPicked = picked === p.id;
                return (
                  <button key={`L-${p.id}`} disabled={isMatched} onClick={() => setPicked(p.id)}
                    className={`flex w-full items-center justify-center rounded-xl border-2 px-3 py-3 text-2xl font-black transition-all ${isMatched ? 'border-emerald-400 bg-emerald-50 text-emerald-600' : isPicked ? 'border-primary bg-primary/10 ring-2 ring-primary' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                    {isMatched ? <Check size={20} className="mr-1 text-emerald-500" /> : null}{p.left}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              {right.map((p) => {
                const isMatched = matched.has(p.id);
                const isWrong = wrong === p.id;
                return (
                  <motion.button key={`R-${p.id}`} disabled={isMatched} onClick={() => tapRight(p.id)}
                    animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}
                    className={`flex w-full items-center justify-center rounded-xl border-2 px-3 py-3 text-xl font-black transition-all ${isMatched ? 'border-emerald-400 bg-emerald-50 text-emerald-600' : isWrong ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                    {p.right}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
