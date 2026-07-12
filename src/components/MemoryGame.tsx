/**
 * MemoryGame — a flip-and-match memory game for Syllab Junior. Flip two cards;
 * if they match they stay face-up. Match all pairs to win. Builds visual memory
 * and concentration. 100% client-side.
 */
import { useCallback, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, PartyPopper } from 'lucide-react';

const POOL = ['🍎', '🐶', '⭐', '🌸', '🚗', '🐱', '🦋', '🐟', '🌈', '🐝', '🍓', '🚀'];

function shuffle<T>(a: T[]): T[] { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; }

export default function MemoryGame() {
  const [round, setRound] = useState(0);
  const cards = useMemo(() => {
    const picked = shuffle(POOL).slice(0, 6);
    return shuffle([...picked, ...picked]).map((emoji, i) => ({ id: i, emoji }));
  }, [round]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);

  const matchedCount = cards.filter((c) => matched.has(c.emoji)).length;
  const won = matchedCount === cards.length && cards.length > 0;

  const flip = useCallback((idx: number) => {
    if (busy) return;
    const card = cards[idx];
    if (matched.has(card.emoji) || flipped.includes(idx)) return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (cards[a].emoji === cards[b].emoji) {
        setMatched((m) => new Set(m).add(cards[a].emoji));
        setFlipped([]);
      } else {
        setBusy(true);
        window.setTimeout(() => { setFlipped([]); setBusy(false); }, 800);
      }
    }
  }, [busy, cards, matched, flipped]);

  const replay = () => { setFlipped([]); setMatched(new Set()); setMoves(0); setBusy(false); setRound((r) => r + 1); };

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-black text-slate-800">🧠 Memory Match</h3>
        <span className="text-xs font-bold text-slate-400">{moves} moves · {matchedCount / 2}/{cards.length / 2} pairs</span>
      </div>
      {won ? (
        <div className="py-8 text-center">
          <PartyPopper size={44} className="mx-auto text-amber-500" />
          <p className="mt-2 text-xl font-black text-slate-800">You found all pairs in {moves} moves! 🎉</p>
          <button onClick={replay} className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-600"><RotateCcw size={15} /> Play again</button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-center text-xs font-bold text-slate-400">Flip two cards to find a matching pair!</p>
          <div className="mx-auto grid max-w-sm grid-cols-4 gap-2">
            {cards.map((c, idx) => {
              const isUp = flipped.includes(idx) || matched.has(c.emoji);
              return (
                <motion.button key={c.id} onClick={() => flip(idx)} whileTap={{ scale: 0.94 }}
                  className={`flex aspect-square items-center justify-center rounded-xl text-3xl transition-colors ${isUp ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-gradient-to-br from-indigo-400 to-purple-500'}`}>
                  {isUp ? c.emoji : <span className="text-white/80 text-xl">?</span>}
                </motion.button>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <button onClick={replay} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-200"><RotateCcw size={13} /> New game</button>
          </div>
        </>
      )}
    </div>
  );
}
