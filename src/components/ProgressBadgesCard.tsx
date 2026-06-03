/**
 * ProgressBadgesCard — centralises gamification: current level + progress to the
 * next level, the learning streak, and the full badge grid (earned vs locked).
 * Pure display over the existing gamification lib.
 */
import { getLevel, getStreak, getCounters, BADGES } from '../lib/gamification';

export default function ProgressBadgesCard({ xp }: { xp: number }) {
  const level = getLevel(xp);
  const streak = getStreak();
  const counters = getCounters();
  const ctx = { xp, streak: streak.count, counters };
  const earned = BADGES.filter((b) => b.check(ctx));
  const locked = BADGES.filter((b) => !b.check(ctx));

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 space-y-5 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Your Progress</h2>
        <span className="text-2xl" title={level.name}>{level.emoji}</span>
      </div>

      {/* Level + progress to next */}
      <div>
        <div className="mb-1 flex items-center justify-between text-sm font-bold">
          <span className="text-slate-700 dark:text-slate-200">Level {level.level} · {level.name}</span>
          <span className="text-slate-400">{xp.toLocaleString()} XP</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all" style={{ width: `${Math.round(level.progress)}%` }} />
        </div>
        <p className="mt-1 text-xs font-semibold text-slate-400">
          {level.nextXp === Infinity ? 'Max level reached — legend! 👑' : `${Math.max(0, level.nextXp - xp).toLocaleString()} XP to next level`}
        </p>
      </div>

      {/* Streak */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-2xl bg-orange-50 p-3 text-center dark:bg-orange-500/10">
          <p className="text-2xl font-black text-orange-600">🔥 {streak.count}</p>
          <p className="text-[10px] font-black uppercase tracking-wide text-orange-400">Day streak</p>
        </div>
        <div className="flex-1 rounded-2xl bg-emerald-50 p-3 text-center dark:bg-emerald-500/10">
          <p className="text-2xl font-black text-emerald-600">🏅 {streak.best}</p>
          <p className="text-[10px] font-black uppercase tracking-wide text-emerald-400">Best streak</p>
        </div>
        <div className="flex-1 rounded-2xl bg-indigo-50 p-3 text-center dark:bg-indigo-500/10">
          <p className="text-2xl font-black text-indigo-600">{earned.length}/{BADGES.length}</p>
          <p className="text-[10px] font-black uppercase tracking-wide text-indigo-400">Badges</p>
        </div>
      </div>

      {/* Badge grid */}
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Badges</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {[...earned, ...locked].map((b) => {
            const isEarned = earned.includes(b);
            return (
              <div
                key={b.id}
                title={`${b.name} — ${b.desc}`}
                className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center transition-colors ${
                  isEarned ? 'bg-amber-50 dark:bg-amber-500/10' : 'bg-slate-50 opacity-50 grayscale dark:bg-slate-800'
                }`}
              >
                <span className="text-2xl">{b.emoji}</span>
                <span className="text-[10px] font-bold leading-tight text-slate-600 dark:text-slate-300">{b.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
