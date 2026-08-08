/**
 * GoalRing — a small circular progress ring for the daily study-time goal.
 * Pure presentational: give it minutes done + the goal, it draws the arc.
 */
interface Props { minutes: number; goalMinutes?: number; size?: number; }

export default function GoalRing({ minutes, goalMinutes = 120, size = 92 }: Props) {
  const pct = Math.max(0, Math.min(1, goalMinutes > 0 ? minutes / goalMinutes : 0));
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  const done = pct >= 1;
  const label = `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  const goalLabel = goalMinutes % 60 === 0 ? `${goalMinutes / 60}h` : `${goalMinutes}m`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={8} className="stroke-white/10" />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={8} strokeLinecap="round"
            className={done ? 'stroke-amber-400' : 'stroke-emerald-400'}
            strokeDasharray={`${dash} ${c}`}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-black text-white">{Math.round(pct * 100)}%</span>
          {done ? <span className="text-[11px]">🎉</span> : null}
        </div>
      </div>
      <p className="mt-1 text-[11px] font-bold text-white/60">{label} / {goalLabel} today</p>
    </div>
  );
}
