/**
 * Weekly study-time stats — written by the student from the Study Room, read by
 * a linked parent in the Parent Dashboard. Stored at weeklyStudyMinutes/{weekKey}
 * where weekKey = "<ISO-week>-<uid>" (e.g. "2026-W23-abc123").
 */
import { db } from './firebase';
import { doc, setDoc, onSnapshot, serverTimestamp, increment } from 'firebase/firestore';

/** ISO week label like "2026-W23". Pure + testable. */
export function isoWeek(d: Date): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Thursday in current week decides the year.
  const day = (date.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  date.setUTCDate(date.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((date.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function weekKeyFor(uid: string, when: Date = new Date()): string {
  return `${isoWeek(when)}-${uid}`;
}

/** Add this session's focused minutes to the student's current-week total. Never throws. */
export async function recordStudyMinutes(uid: string | undefined | null, minutes: number): Promise<void> {
  try {
    if (!uid || minutes <= 0) return;
    const key = weekKeyFor(uid);
    await setDoc(
      doc(db, 'weeklyStudyMinutes', key),
      { uid, weekKey: key, totalMinutes: increment(Math.round(minutes)), updatedAt: serverTimestamp() },
      { merge: true },
    );
  } catch { /* offline / not-signed-in — silently skip */ }
}

/** Subscribe to a (child) user's current-week study minutes. Returns an unsubscribe fn. */
export function subscribeWeeklyStudyMinutes(uid: string, cb: (minutes: number) => void): () => void {
  try {
    const key = weekKeyFor(uid);
    return onSnapshot(
      doc(db, 'weeklyStudyMinutes', key),
      (snap) => cb((snap.data()?.totalMinutes as number) || 0),
      () => cb(0),
    );
  } catch {
    cb(0);
    return () => {};
  }
}
