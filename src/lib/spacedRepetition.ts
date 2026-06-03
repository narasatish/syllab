/**
 * spacedRepetition.ts — lightweight spaced-repetition for MCQ practice.
 *
 * When a student answers a question, we record it. Wrong answers come back
 * soon; repeatedly-correct answers are pushed out on a 1 → 3 → 7 → 21-day
 * ladder (SM-2-lite). The Practice/Daily pages can then resurface "due"
 * questions so weak spots are revisited at the right time — the core of
 * adaptive revision. All state is local (localStorage), keyed by question id.
 */

const LS_KEY = 'syllab:srs:v1';
const DAY = 24 * 60 * 60 * 1000;
// Days until next review by box level (0 = just got it wrong).
const LADDER = [0, 1, 3, 7, 21, 60];

export interface SrsCard {
  id: string;
  box: number;     // 0..LADDER.length-1
  due: number;     // epoch ms when this card is next due
  seen: number;    // total times answered
  wrong: number;   // total wrong
}

type SrsStore = Record<string, SrsCard>;

function load(): SrsStore {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') as SrsStore; }
  catch { return {}; }
}
function save(store: SrsStore): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(store)); } catch { /* ignore */ }
}

/** Record an answer. `now` is injectable for testing. */
export function recordAnswer(id: string, correct: boolean, now: number = Date.now()): SrsCard {
  if (!id) return { id, box: 0, due: now, seen: 0, wrong: 0 };
  const store = load();
  const prev = store[id] || { id, box: 0, due: now, seen: 0, wrong: 0 };
  const box = correct ? Math.min(prev.box + 1, LADDER.length - 1) : 0;
  const card: SrsCard = {
    id,
    box,
    due: now + LADDER[box] * DAY,
    seen: prev.seen + 1,
    wrong: prev.wrong + (correct ? 0 : 1),
  };
  store[id] = card;
  save(store);
  return card;
}

/** IDs that are due for review right now (wrong/learning cards surface first). */
export function getDueIds(now: number = Date.now()): string[] {
  const store = load();
  return Object.values(store)
    .filter((c) => c.due <= now && c.box < LADDER.length - 1) // not yet "mastered"
    .sort((a, b) => a.box - b.box || a.due - b.due)            // weakest + most overdue first
    .map((c) => c.id);
}

/** How many cards are due now (for a "Review (N)" badge). */
export function getDueCount(now: number = Date.now()): number {
  return getDueIds(now).length;
}

/** From a pool of available questions, pick up to `limit` that are due. */
export function pickDue<T extends { id: string }>(pool: T[], limit = 10, now: number = Date.now()): T[] {
  const due = new Set(getDueIds(now));
  return pool.filter((q) => due.has(q.id)).slice(0, limit);
}

/** Total cards still being learned (not mastered) — for progress display. */
export function getLearningCount(): number {
  return Object.values(load()).filter((c) => c.box < LADDER.length - 1).length;
}
