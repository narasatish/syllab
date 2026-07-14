/**
 * studyPlanner.ts — pure, testable revision-timetable generator.
 * Given subjects, the days left and hours/day, it builds a day-by-day plan that
 * (a) spreads subjects evenly in a learn phase, (b) reserves the tail for full
 * revision, and (c) ends on a mock-test day. No framework, no Date.now() so it
 * is deterministic and unit-testable (dates are derived from an explicit start).
 */
export interface PlanDay {
  date: string;        // YYYY-MM-DD
  phase: 'Learn' | 'Revise' | 'Mock';
  subjects: string[];
  hours: number;
}

/** Add `n` days to a YYYY-MM-DD date, timezone-safe (UTC arithmetic). */
export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const t = Date.UTC(y, (m || 1) - 1, d || 1) + n * 86400000;
  return new Date(t).toISOString().slice(0, 10);
}

export function buildStudyPlan(opts: {
  subjects: string[];
  days: number;
  hoursPerDay: number;
  startISO: string;
}): PlanDay[] {
  const subjects = opts.subjects.map((s) => s.trim()).filter(Boolean);
  const days = Math.floor(opts.days);
  const hours = opts.hoursPerDay > 0 ? opts.hoursPerDay : 0;
  if (!subjects.length || days <= 0) return [];

  // Reserve the tail for revision (~25%, at least 1 day when there's room), and
  // the very last day for a full mock — but only if we have more than 2 days.
  const hasMock = days >= 3;
  const reviseDays = days >= 4 ? Math.max(1, Math.round(days * 0.25)) : 0;
  const learnDays = Math.max(0, days - reviseDays - (hasMock ? 1 : 0));

  const plan: PlanDay[] = [];
  let idx = 0;
  // Learn phase — one primary subject per day, round-robin for even coverage.
  for (let i = 0; i < learnDays; i++) {
    plan.push({ date: addDays(opts.startISO, idx++), phase: 'Learn', subjects: [subjects[i % subjects.length]], hours });
  }
  // Revise phase — two subjects per day, cycling through all.
  let r = 0;
  for (let i = 0; i < reviseDays; i++) {
    const a = subjects[r % subjects.length];
    const b = subjects.length > 1 ? subjects[(r + 1) % subjects.length] : '';
    r += 2;
    plan.push({ date: addDays(opts.startISO, idx++), phase: 'Revise', subjects: b ? [a, b] : [a], hours });
  }
  // Mock day — full-length practice across all subjects.
  if (hasMock) {
    plan.push({ date: addDays(opts.startISO, idx++), phase: 'Mock', subjects: [...subjects], hours });
  }
  return plan;
}
