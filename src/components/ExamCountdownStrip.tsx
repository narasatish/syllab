import { EXAMS, daysUntil, upcomingConfirmed, awaitingDate } from '../data/examDates';

/**
 * "Exam watch" — where the big exams stand.
 *
 * Layout follows from the honesty rule. Exams with an officially published
 * date get a real countdown card; everything else becomes a compact chip
 * showing when the announcement is due, with a link to the official source.
 * An earlier version gave every exam a full-size card, which meant a wall of
 * "Date not announced yet" — technically honest but a poor thing to lead with,
 * so this section also sits near the BOTTOM of the home page now rather than
 * directly under the hero.
 *
 * Performance: no state, no effects, no timers. Days are computed once during
 * render. Firebase and analytics were moved off the load path to fix a failing
 * LCP; a ticking widget would put that work straight back.
 */
export default function ExamCountdownStrip() {
  const confirmed = upcomingConfirmed(EXAMS);
  const awaiting = awaitingDate(EXAMS);
  if (!confirmed.length && !awaiting.length) return null;

  return (
    <section className="reveal mx-auto max-w-6xl px-5 py-10 sm:py-14" aria-labelledby="exam-countdown-heading">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="exam-countdown-heading" className="text-xl font-black tracking-tight sm:text-2xl">
          Exam watch
        </h2>
        <p className="label">Countdowns only for officially announced dates</p>
      </div>

      {confirmed.length ? (
        <ul className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {confirmed.map((e) => {
            const d = daysUntil(e.date as string);
            return (
              <li
                key={e.id}
                className="rounded-2xl border border-primary/25 bg-primary/5 p-4 shadow-sm dark:border-primary/30"
              >
                <div className="label-caps">{e.short} · {e.body}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black tabular-nums text-primary">{d}</span>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {d === 0 ? 'today' : d === 1 ? 'day to go' : 'days to go'}
                  </span>
                </div>
                <div className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-200">{e.name}</div>
                <div className="mt-0.5 text-xs font-medium text-slate-500">
                  {new Date(`${e.date}T00:00:00`).toLocaleDateString('en-IN', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </div>
                <a
                  href={e.sourceUrl}
                  target="_blank"
                  rel="noopener nofollow"
                  className="mt-2 inline-block text-[11px] font-bold text-primary hover:underline"
                >
                  {e.sourceLabel}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}

      {awaiting.length ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800">
          <p className="mb-3 text-xs font-bold text-slate-600 dark:text-slate-300">
            Dates not announced yet — these link straight to the official site so you can check
            for yourself:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {awaiting.map((e) => (
              <li key={e.id} className="rounded-xl border border-slate-100 px-3 py-2 dark:border-slate-800">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-xs font-black text-slate-800 dark:text-slate-100">{e.short}</span>
                  <a
                    href={e.sourceUrl}
                    target="_blank"
                    rel="noopener nofollow"
                    className="shrink-0 text-[11px] font-bold text-primary hover:underline"
                  >
                    check
                  </a>
                </div>
                {e.announcementDue ? (
                  <div className="mt-0.5 line-clamp-2 text-[11px] font-medium text-slate-500">
                    {e.announcementDue}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
