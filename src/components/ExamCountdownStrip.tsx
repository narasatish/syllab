import { EXAMS, daysUntil, upcomingConfirmed, awaitingDate } from '../data/examDates';

/**
 * Homepage strip showing where the big exams stand.
 *
 * Two deliberate constraints:
 *
 * 1. HONESTY. It counts down only to dates an official body has actually
 *    published. For everything else it says the date is not out yet, when the
 *    announcement is due, and links the official source. As of 2026-08-09 that
 *    is all three exams — NTA and CBSE had published nothing for 2027. The
 *    widely-copied "expected" dates are extrapolation, and a student planning
 *    around a fake countdown is worse off than one who knows to check.
 *
 * 2. PERFORMANCE. No state, no effects, no timers, no interval re-render. Days
 *    are computed once during render. This sits on the homepage, which just had
 *    Firebase and analytics moved off the load path to fix a failing LCP; a
 *    ticking widget would put that work straight back.
 */
export default function ExamCountdownStrip() {
  const confirmed = upcomingConfirmed(EXAMS);
  const awaiting = awaitingDate(EXAMS);
  if (!confirmed.length && !awaiting.length) return null;

  return (
    <section className="reveal mx-auto max-w-6xl px-5 py-8 sm:py-10" aria-labelledby="exam-countdown-heading">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="exam-countdown-heading" className="text-lg font-black tracking-tight sm:text-xl">
          Exam watch
        </h2>
        <p className="label">Dates shown only when officially announced</p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {confirmed.map((e) => {
          const d = daysUntil(e.date as string);
          return (
            <li
              key={e.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800"
            >
              <div className="label-caps">{e.short}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black tabular-nums text-primary">{d}</span>
                <span className="text-sm font-bold text-slate-600">
                  {d === 0 ? 'today' : d === 1 ? 'day to go' : 'days to go'}
                </span>
              </div>
              <div className="mt-1 text-xs font-medium text-slate-500">{e.name}</div>
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

        {awaiting.map((e) => (
          <li
            key={e.id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800"
          >
            <div className="label-caps">{e.short}</div>
            <div className="mt-1 text-sm font-black text-slate-700">Date not announced yet</div>
            {e.announcementDue ? (
              <div className="mt-1 text-xs font-medium text-slate-500">{e.announcementDue}</div>
            ) : null}
            {e.expectedWindow ? (
              <div className="mt-0.5 text-xs font-medium text-slate-500">
                Held {e.expectedWindow} in past years — not a confirmed date.
              </div>
            ) : null}
            <a
              href={e.sourceUrl}
              target="_blank"
              rel="noopener nofollow"
              className="mt-2 inline-block text-[11px] font-bold text-primary hover:underline"
            >
              Check {e.sourceLabel}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
