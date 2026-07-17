/**
 * toolStats.ts — the on-device "study health" record behind the free tools.
 * Tools call recordStat() when the student actually does work (a completed
 * Pomodoro focus session, a flashcard review); the /tools hub renders the
 * streak and totals.
 *
 * Distinct from lib/studyStats.ts, which is the Firestore-backed weekly
 * study-minutes feature for the Study Room → Parent Dashboard. This one is
 * purely local (no account needed) and never leaves the device.
 *
 * The maths is pure and date-injected so it is deterministic and unit-testable;
 * only load/save/recordStat touch localStorage.
 */
import { addDays } from './studyPlanner';

export type StatEvent = 'focus' | 'flashcard';
/** date (YYYY-MM-DD) → counts per event type */
export type StatsData = Record<string, Partial<Record<StatEvent, number>>>;

const STORE_KEY = 'syllab_tool_stats_v1';
const MAX_DAYS = 400; // prune anything older so localStorage can't grow forever

/* ───────────── pure core ───────────── */

/** Add `n` of `type` on `dateISO`, returning a new StatsData. */
export function addEvent(data: StatsData, type: StatEvent, dateISO: string, n = 1): StatsData {
  const day = { ...(data[dateISO] || {}) };
  day[type] = (day[type] || 0) + n;
  return { ...data, [dateISO]: day };
}

/** True if the day has any recorded activity. */
export function hasActivity(data: StatsData, dateISO: string): boolean {
  const d = data[dateISO];
  return !!d && Object.values(d).some((v) => (v || 0) > 0);
}

/**
 * Consecutive-day streak ending today. If today has no activity yet the streak
 * is measured from yesterday, so it only breaks after a full missed day.
 */
export function streak(data: StatsData, todayISO: string): number {
  let cursor = hasActivity(data, todayISO) ? todayISO : addDays(todayISO, -1);
  if (!hasActivity(data, cursor)) return 0;
  let n = 0;
  while (hasActivity(data, cursor) && n < MAX_DAYS) {
    n += 1;
    cursor = addDays(cursor, -1);
  }
  return n;
}

/** Lifetime totals plus the number of days with any activity. */
export function totals(data: StatsData): { focus: number; flashcard: number; activeDays: number } {
  let focus = 0, flashcard = 0, activeDays = 0;
  for (const day of Object.values(data)) {
    const f = day.focus || 0, c = day.flashcard || 0;
    focus += f; flashcard += c;
    if (f + c > 0) activeDays += 1;
  }
  return { focus, flashcard, activeDays };
}

/** The last `n` days (oldest→newest) with a total count each — for a sparkline. */
export function lastDays(data: StatsData, todayISO: string, n = 7): { date: string; count: number }[] {
  const out: { date: string; count: number }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = addDays(todayISO, -i);
    const d = data[date] || {};
    out.push({ date, count: (d.focus || 0) + (d.flashcard || 0) });
  }
  return out;
}

/** Drop days older than MAX_DAYS so the store stays small. */
export function prune(data: StatsData, todayISO: string): StatsData {
  const cutoff = addDays(todayISO, -MAX_DAYS);
  const out: StatsData = {};
  for (const [date, v] of Object.entries(data)) if (date >= cutoff) out[date] = v;
  return out;
}

/* ───────────── localStorage bridge ───────────── */

export function todayISO(): string {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function loadStats(): StatsData {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed as StatsData : {};
  } catch { return {}; }
}

export function saveStats(data: StatsData): void {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* quota / private mode */ }
}

/** Record one unit of work from a tool. Safe to call from any page; never throws. */
export function recordStat(type: StatEvent, n = 1): void {
  try {
    const today = todayISO();
    saveStats(prune(addEvent(loadStats(), type, today, n), today));
    window.dispatchEvent(new CustomEvent('syllab:tool-stats-updated'));
  } catch { /* SSR or storage unavailable */ }
}
