/**
 * Pure, framework-free helpers for the Study Room — extracted so they can be
 * unit-tested without rendering React or touching the DOM.
 */

export interface StudyStore {
  totalMinutes: number;
  streak: number;
  lastStudyDate: string;
  /** Minutes studied on `dailyDate` only — powers the daily-goal ring. */
  dailyMinutes?: number;
  dailyDate?: string;
}

/** Minutes counted for `todayStr` (0 if the stored daily total is from another day). */
export function minutesToday(store: StudyStore, todayStr: string): number {
  return store.dailyDate === todayStr ? (store.dailyMinutes || 0) : 0;
}

/** Seconds → "MM:SS" (zero-padded). Clamps negatives to 0. */
export function mmss(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/** Whole days from `now` until midnight of an ISO date (YYYY-MM-DD). Never negative. */
export function daysUntil(iso: string, now: number = Date.now()): number {
  const target = new Date(iso + 'T00:00:00').getTime();
  if (Number.isNaN(target)) return 0;
  return Math.max(0, Math.ceil((target - now) / 86_400_000));
}

/**
 * Compute the next persisted store after a study session.
 * - same day  → streak unchanged
 * - yesterday → streak + 1
 * - older/none → streak resets to 1
 * minutes <= 0 leaves the store unchanged (nothing studied).
 */
export function computeNextStore(prev: StudyStore, minutes: number, todayStr: string, yesterdayStr: string): StudyStore {
  if (minutes <= 0) return prev;
  let streak: number;
  if (prev.lastStudyDate === todayStr) streak = prev.streak || 1;
  else if (prev.lastStudyDate === yesterdayStr) streak = prev.streak + 1;
  else streak = 1;
  const dailyMinutes = (prev.dailyDate === todayStr ? (prev.dailyMinutes || 0) : 0) + minutes;
  return { totalMinutes: prev.totalMinutes + minutes, streak, lastStudyDate: todayStr, dailyMinutes, dailyDate: todayStr };
}
