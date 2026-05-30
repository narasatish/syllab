/**
 * RewardToast — global, lightweight popups for XP gains and badge unlocks.
 * Mount once near the app root. Listens to:
 *   • `syllab:progress-updated`     → "+N XP" toast
 *   • `syllab:gamification-updated` → "🏅 Badge unlocked!" toast(s)
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Toast { id: number; kind: 'xp' | 'badge'; title: string; sub?: string; emoji: string; }

let counter = 0;

export default function RewardToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const add = (t: Omit<Toast, 'id'>) => {
      const id = ++counter;
      setToasts(prev => [...prev, { ...t, id }].slice(-3));
      window.setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 3800);
    };

    const onXp = (e: Event) => {
      const xp = Number((e as CustomEvent).detail?.xpGained || 0);
      if (xp > 0) add({ kind: 'xp', emoji: '⚡', title: `+${xp} XP`, sub: 'Keep going!' });
    };
    const onGami = (e: Event) => {
      const badges = (e as CustomEvent).detail?.newBadges || [];
      for (const b of badges) add({ kind: 'badge', emoji: b.emoji, title: 'Badge unlocked!', sub: b.name });
    };

    window.addEventListener('syllab:progress-updated', onXp);
    window.addEventListener('syllab:gamification-updated', onGami);
    return () => {
      window.removeEventListener('syllab:progress-updated', onXp);
      window.removeEventListener('syllab:gamification-updated', onGami);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 shadow-2xl text-white ${
              t.kind === 'badge'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                : 'bg-gradient-to-r from-violet-600 to-indigo-600'
            }`}
          >
            <span className="text-2xl">{t.emoji}</span>
            <div className="leading-tight">
              <p className="text-sm font-black">{t.title}</p>
              {t.sub && <p className="text-[11px] font-bold text-white/80">{t.sub}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
