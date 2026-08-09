import { getLevel } from '../lib/gamification';
import { ringGeometry, xpToNextLevel, flameScale } from '../lib/progressRing';

interface Props {
  xp: number;
  streakDays: number;
  size?: number;
}

/**
 * XP progress ring with a streak flame.
 *
 * Level names, thresholds and the 0–100 progress all come from getLevel() in
 * gamification.ts — deliberately not re-derived here, so there is one source
 * of truth for what "Scholar" means. This component only draws.
 *
 * The ring is two stacked circles: a track and an arc revealed by
 * stroke-dashoffset. Rotated -90deg so the arc starts at 12 o'clock instead of
 * 3 o'clock, which is what people expect of a progress dial.
 *
 * The flame animates via the shared `animate-flame` keyframes (transform only,
 * so it stays on the compositor) and is hidden entirely at a 0-day streak
 * rather than shown cold — an unlit flame reads as a bug.
 */
export default function XpStreakRing({ xp, streakDays, size = 96 }: Props) {
  const level = getLevel(xp);
  const g = ringGeometry(level.progress, size, 8);
  const toGo = xpToNextLevel(xp, level.nextXp);
  const flame = flameScale(streakDays);

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: g.size, height: g.size }}>
        <svg
          width={g.size}
          height={g.size}
          viewBox={`0 0 ${g.size} ${g.size}`}
          className="-rotate-90"
          role="img"
          aria-label={`Level ${level.level}, ${level.name}. ${level.progress}% to the next level.`}
        >
          <circle
            cx={g.center} cy={g.center} r={g.radius}
            fill="none" strokeWidth={8}
            className="stroke-slate-200 dark:stroke-slate-700"
          />
          <circle
            cx={g.center} cy={g.center} r={g.radius}
            fill="none" strokeWidth={8} strokeLinecap="round"
            strokeDasharray={g.circumference}
            strokeDashoffset={g.dashOffset}
            className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg leading-none" aria-hidden="true">{level.emoji}</span>
          <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">Lv {level.level}</span>
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-sm font-black text-slate-900 dark:text-slate-100">{level.name}</div>
        <div className="label mt-0.5">
          {xp.toLocaleString()} XP
          {toGo > 0 ? ` · ${toGo.toLocaleString()} to next level` : ' · max level'}
        </div>
        {flame > 0 ? (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span
              className="inline-block animate-flame text-base leading-none"
              style={{ transform: `scale(${flame})`, transformOrigin: 'bottom center' }}
              aria-hidden="true"
            >
              🔥
            </span>
            <span className="text-xs font-bold text-amber-600">
              {streakDays}-day streak
            </span>
          </div>
        ) : (
          <div className="mt-1.5 text-xs font-medium text-slate-500">
            Practise today to start a streak
          </div>
        )}
      </div>
    </div>
  );
}
