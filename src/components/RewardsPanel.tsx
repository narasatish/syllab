/**
 * RewardsPanel — shows the student's level, XP progress, daily streak and badges.
 * Pure display: reads from gamification.ts (localStorage) + the xp prop.
 * Drop it into the Profile / Dashboard / Home.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getLevel, getStreak, getCounters, getEarnedBadges, BADGES,
} from '../lib/gamification';

interface Props {
  xp: number;
  compact?: boolean;
}

export default function RewardsPanel({ xp, compact = false }: Props) {
  const [, force] = useState(0);
  useEffect(() => {
    const h = () => force(n => n + 1);
    window.addEventListener('syllab:gamification-updated', h);
    window.addEventListener('syllab:progress-updated', h);
    return () => {
      window.removeEventListener('syllab:gamification-updated', h);
      window.removeEventListener('syllab:progress-updated', h);
    };
  }, []);

  const level = getLevel(xp);
  const streak = getStreak().count;
  const best = getStreak().best;
  const counters = getCounters();
  const earned = new Set(getEarnedBadges());
  const earnedCount = earned.size;

  return (
    <div className="space-y-5">
      {/* Level + XP */}
      <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-4xl">
            {level.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Level {level.level}</p>
            <h3 className="text-xl font-black truncate">{level.name}</h3>
            <p className="text-xs text-white/70 font-bold">{xp.toLocaleString()} XP</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2.5 w-full rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }} animate={{ width: `${level.progress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <p className="mt-1.5 text-[11px] font-bold text-white/70">
            {level.nextXp === Infinity
              ? 'Max level reached — you are a legend! 👑'
              : `${(level.nextXp - xp).toLocaleString()} XP to next level`}
          </p>
        </div>
      </div>

      {/* Streak + stat chips */}
      <div className="grid grid-cols-3 gap-3">
        <StatChip emoji="🔥" value={streak} label="Day streak" sub={best > 0 ? `best ${best}` : undefined} accent="from-orange-500 to-red-500" />
        <StatChip emoji="🏅" value={earnedCount} label="Badges" sub={`of ${BADGES.length}`} accent="from-amber-500 to-yellow-500" />
        <StatChip emoji="✅" value={counters.total} label="Activities" accent="from-emerald-500 to-teal-500" />
      </div>

      {/* Badges */}
      {!compact && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">🏅 Achievements</h4>
            <span className="text-[11px] font-bold text-slate-500">{earnedCount}/{BADGES.length} unlocked</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {BADGES.map(b => {
              const got = earned.has(b.id);
              return (
                <div key={b.id}
                  title={b.desc}
                  className={`flex flex-col items-center text-center rounded-2xl border p-3 transition-all ${
                    got ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-slate-50 opacity-60'
                  }`}>
                  <span className={`text-3xl mb-1 ${got ? '' : 'grayscale'}`}>{got ? b.emoji : '🔒'}</span>
                  <span className="text-[10px] font-black text-slate-700 leading-tight">{b.name}</span>
                  <span className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">{b.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatChip({ emoji, value, label, sub, accent }: {
  emoji: string; value: number; label: string; sub?: string; accent: string;
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${accent} p-3 text-white text-center shadow`}>
      <div className="text-2xl">{emoji}</div>
      <div className="text-2xl font-black leading-none mt-1">{value}</div>
      <div className="text-[11px] font-black uppercase tracking-widest text-white/80 mt-1">{label}</div>
      {sub && <div className="text-[11px] font-bold text-white/60">{sub}</div>}
    </div>
  );
}
