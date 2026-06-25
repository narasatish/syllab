/**
 * FlashcardSession — a timed flashcard quiz. Shows one card at a time with an
 * optional per-question countdown; the student reveals the answer and self-rates
 * "Got it" / "Review". Reports the final score so the Study Room can remember
 * which chapters the student is weak in.
 */
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Eye, Trophy, Sparkles } from 'lucide-react';
import type { QuizCard } from '../lib/studyFlashcards';
import { askTutor } from '../lib/api';

interface Props {
  cards: QuizCard[];
  perCardSeconds: number; // 0 = no timer
  title: string;
  onFinish: (correct: number, total: number) => void;
  onClose: () => void;
}

export default function FlashcardSession({ cards, perCardSeconds, title, onFinish, onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(perCardSeconds);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState<QuizCard[]>([]);
  const [explain, setExplain] = useState<Record<number, string>>({});

  const card = cards[idx];

  const explainCard = useCallback(async (q: QuizCard, i: number) => {
    if (explain[i]) return;
    setExplain((e) => ({ ...e, [i]: '…' }));
    try {
      const r = await askTutor(`A student got this wrong. Question: "${q.q}". Correct answer: "${q.a}". Explain WHY this is the answer, simply, for a school student in 2-3 short sentences.`);
      setExplain((e) => ({ ...e, [i]: (r || '').trim() || 'Try reviewing this topic again.' }));
    } catch { setExplain((e) => ({ ...e, [i]: 'Could not load an explanation — please try again.' })); }
  }, [explain]);

  // Per-card countdown → auto-reveals the answer when it hits 0.
  useEffect(() => {
    if (done || perCardSeconds <= 0 || revealed) return;
    setTimeLeft(perCardSeconds);
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { window.clearInterval(id); setRevealed(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [idx, revealed, perCardSeconds, done]);

  const rate = useCallback((known: boolean) => {
    if (!known) setWrong((w) => (w.some((c) => c.q === card.q) ? w : [...w, card]));
    const nextCorrect = correct + (known ? 1 : 0);
    if (idx + 1 >= cards.length) {
      setCorrect(nextCorrect);
      setDone(true);
      onFinish(nextCorrect, cards.length);
      return;
    }
    setCorrect(nextCorrect);
    setIdx((i) => i + 1);
    setRevealed(false);
  }, [correct, idx, cards.length, onFinish]);

  if (!card && !done) return null;

  if (done) {
    const pct = cards.length ? Math.round((correct / cards.length) * 100) : 0;
    const tone = pct >= 80 ? 'Excellent! 🎉' : pct >= 60 ? 'Good job 👍' : 'Keep practising 💪';
    return (
      <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-md rounded-3xl bg-white p-6 text-center text-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <Trophy size={40} className="mx-auto text-amber-500" />
          <h3 className="mt-2 text-2xl font-black">{pct}%</h3>
          <p className="mt-1 text-sm text-slate-600">You got <strong>{correct}/{cards.length}</strong> — {tone}</p>
          <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">{pct < 60 ? "We'll remember this is a weak spot and remind you to revise it." : 'Nice — this is getting stronger. Keep it up!'}</p>

          {wrong.length ? (
            <div className="mt-4 max-h-56 overflow-y-auto text-left">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-rose-500">Review these ({wrong.length})</p>
              <div className="space-y-2">
                {wrong.map((q, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-sm font-bold text-slate-800">{q.q}</p>
                    <p className="mt-1 text-sm text-emerald-600">✓ {q.a}</p>
                    {explain[i] ? (
                      <p className="mt-2 rounded-lg bg-indigo-50 p-2 text-xs leading-relaxed text-indigo-900">{explain[i]}</p>
                    ) : (
                      <button onClick={() => void explainCard(q, i)} className="mt-2 inline-flex items-center gap-1 rounded-full bg-indigo-500 px-2.5 py-1 text-[11px] font-black text-white hover:bg-indigo-600"><Sparkles size={11} /> Explain why</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <button onClick={onClose} className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-black text-white hover:bg-emerald-400">Done</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[85] flex flex-col items-center justify-center bg-slate-900/90 px-5 backdrop-blur-md">
      <div className="w-full max-w-lg">
        <div className="mb-3 flex items-center justify-between text-xs font-bold text-white/70">
          <span className="truncate">🃏 {title}</span>
          <span>{idx + 1} / {cards.length}{perCardSeconds > 0 && !revealed ? ` · ⏱️ ${timeLeft}s` : ''}</span>
        </div>
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${((idx) / cards.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            className="min-h-[220px] rounded-3xl border border-white/10 bg-white/10 p-6 text-center text-white"
          >
            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-300">Question</p>
            <p className="mt-3 text-xl font-bold leading-relaxed">{card.q}</p>
            {revealed ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 border-t border-white/10 pt-4">
                <p className="text-[11px] font-black uppercase tracking-widest text-amber-300">Answer</p>
                <p className="mt-2 text-lg text-white/90">{card.a}</p>
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5">
          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="mx-auto flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-black text-white hover:bg-white/25"><Eye size={16} /> Show answer</button>
          ) : (
            <div className="flex justify-center gap-3">
              <button onClick={() => rate(false)} className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/90 px-5 py-3 text-sm font-black text-white hover:bg-rose-500"><X size={16} /> Review</button>
              <button onClick={() => rate(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400"><Check size={16} /> Got it</button>
            </div>
          )}
        </div>

        <button onClick={onClose} className="mx-auto mt-5 block text-xs font-bold text-white/40 hover:text-white/70">Exit flashcards</button>
      </div>
    </div>
  );
}
