/**
 * mastery.ts — Khan-style Familiar → Proficient → Mastered progression.
 *
 * Per chapter/topic (keyed by chapter id), track attempts and correct answers
 * over time. Derives mastery level based on recent performance:
 *   - Familiar: has seen some correct answers (attempts > 0 and correct > 0)
 *   - Proficient: ≥80% accuracy over recent window
 *   - Mastered: sustained ≥90% accuracy or N consecutive correct
 *
 * Local-first (localStorage), deterministic and unit-test-friendly.
 */

const LS_KEY = 'syllab:mastery:v2';

export type MasteryLevel = 'unfamiliar' | 'familiar' | 'proficient' | 'mastered';

export interface MasteryRecord {
  /** Total attempts (answered questions) for this key. */
  attempts: number;
  /** Total correct answers for this key. */
  correct: number;
  /** Recent attempt window (last N attempts). keyed by attempt timestamp (ms). */
  recentWindow: Array<{ timestamp: number; correct: boolean }>;
}

export interface MasteryStats {
  level: MasteryLevel;
  /** Overall accuracy across all attempts (0–100). */
  accuracy: number;
  /** Recent accuracy in the sliding window (0–100). */
  recentAccuracy: number;
  /** Consecutive correct answers at the end of recent window. */
  streak: number;
  attempts: number;
  correct: number;
}

type Store = Record<string, MasteryRecord>;

// Mastery thresholds (with comments)
const RECENT_WINDOW_SIZE = 15; // Last 15 attempts form the "recent" window
const PROFICIENT_THRESHOLD = 0.8; // ≥80% recent accuracy = Proficient
const MASTERED_THRESHOLD = 0.9; // ≥90% recent accuracy = Mastered
const MASTERED_STREAK = 5; // OR 5 consecutive correct = Mastered (bonus path)

function load(): Store {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') as Store; }
  catch { return {}; }
}

function save(s: Store): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

/**
 * Derive mastery level from a record.
 * Looks at recent window (last ~15 attempts) for accuracy and streak.
 */
function deriveLevel(record: MasteryRecord): MasteryLevel {
  if (record.attempts === 0) return 'unfamiliar';
  if (record.correct === 0) return 'unfamiliar'; // Never got one right

  // Streak: how many consecutive correct at the END of recent window?
  let streak = 0;
  for (let i = record.recentWindow.length - 1; i >= 0; i--) {
    if (record.recentWindow[i]?.correct) streak++;
    else break;
  }

  // Recent window accuracy
  const recentCorrect = record.recentWindow.filter(a => a.correct).length;
  const recentAcc = record.recentWindow.length > 0
    ? recentCorrect / record.recentWindow.length
    : 0;

  // Mastered: ≥90% recent OR 5+ streak
  if (recentAcc >= MASTERED_THRESHOLD || streak >= MASTERED_STREAK) {
    return 'mastered';
  }
  // Proficient: ≥80% recent
  if (recentAcc >= PROFICIENT_THRESHOLD) {
    return 'proficient';
  }
  // Familiar: has attempted and gotten some right (checked above)
  return 'familiar';
}

/**
 * Record a practice/mock/daily challenge result.
 * `correct` = number correct, `total` = total attempted.
 * Updates the recent window and derives new level.
 */
export function recordMasteryResult(
  key: string,
  correct: number,
  total: number,
): MasteryStats {
  if (!key || total <= 0) return getStats('');

  const store = load();
  const record = store[key] || {
    attempts: 0,
    correct: 0,
    recentWindow: [],
  };

  // Add each attempt to the recent window
  for (let i = 0; i < total; i++) {
    record.recentWindow.push({
      timestamp: Date.now() + i, // Small offset so all are unique
      correct: i < correct,
    });
  }

  // Trim recent window to RECENT_WINDOW_SIZE
  if (record.recentWindow.length > RECENT_WINDOW_SIZE) {
    record.recentWindow = record.recentWindow.slice(-RECENT_WINDOW_SIZE);
  }

  // Update totals
  record.attempts += total;
  record.correct += correct;

  store[key] = record;
  save(store);

  return getStats(key);
}

/** Get current mastery stats for a key. */
export function getStats(key: string): MasteryStats {
  if (!key) {
    return {
      level: 'unfamiliar',
      accuracy: 0,
      recentAccuracy: 0,
      streak: 0,
      attempts: 0,
      correct: 0,
    };
  }

  const store = load();
  const record = store[key] || { attempts: 0, correct: 0, recentWindow: [] };

  const level = deriveLevel(record);
  const accuracy = record.attempts > 0 ? Math.round((record.correct / record.attempts) * 100) : 0;

  let recentCorrect = 0;
  let streak = 0;
  if (record.recentWindow.length > 0) {
    recentCorrect = record.recentWindow.filter(a => a.correct).length;
    for (let i = record.recentWindow.length - 1; i >= 0; i--) {
      if (record.recentWindow[i]?.correct) streak++;
      else break;
    }
  }
  const recentAccuracy = record.recentWindow.length > 0
    ? Math.round((recentCorrect / record.recentWindow.length) * 100)
    : 0;

  return {
    level,
    accuracy,
    recentAccuracy,
    streak,
    attempts: record.attempts,
    correct: record.correct,
  };
}

/** Get all mastery stats, grouped by level. */
export function getAllStats(): Record<MasteryLevel, string[]> {
  const store = load();
  const result: Record<MasteryLevel, string[]> = {
    unfamiliar: [],
    familiar: [],
    proficient: [],
    mastered: [],
  };

  for (const [key, record] of Object.entries(store)) {
    const level = deriveLevel(record);
    result[level].push(key);
  }

  return result;
}

/** Count stats keyed by level. */
export function getMasteryCounts(): Record<MasteryLevel, number> {
  const groups = getAllStats();
  return {
    unfamiliar: groups.unfamiliar.length,
    familiar: groups.familiar.length,
    proficient: groups.proficient.length,
    mastered: groups.mastered.length,
  };
}
