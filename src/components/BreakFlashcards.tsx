/**
 * BreakFlashcards — tap-to-flip recall cards shown on the break screen.
 * Lightweight active-recall while the student rests. Data comes from one
 * Gemini call per break (see lib/studyRoomAi).
 */
import { useState } from 'react';
import { motion } from 'motion/react';
import type { Flashcard } from '../lib/studyRoomAi';

export default function BreakFlashcards({ cards }: { cards: Flashcard[] }) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  if (!cards.length) return null;
  return (
    <div className="mt-5 w-full">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-amber-200/70">Quick recall — tap to flip</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            className="min-h-[84px] rounded-xl border border-white/15 bg-white/10 p-3 text-left text-sm text-white transition-colors hover:bg-white/15"
          >
            {flipped[i] ? (
              <span><span className="text-[10px] font-black uppercase text-emerald-300">Answer</span><br />{c.a}</span>
            ) : (
              <span><span className="text-[10px] font-black uppercase text-amber-200/70">Q{i + 1}</span><br />{c.q}</span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
