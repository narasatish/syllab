/**
 * progressTracker.ts — Canonical learning-progress recorder.
 *
 * One function, one batch write, three Firestore docs updated:
 *   1. activityEvents/{autoId}   — single row in the All Activity feed
 *   2. progress/{uid}            — aggregate counters + last-activity summary
 *   3. users/{uid}               — xp + rewards.xp incremented atomically
 *
 * Every completion handler (Daily Dose, Practice, Olympiad, Mock/Exam, PPT,
 * Skill Lab) MUST call recordLearningActivity() exactly once per finished
 * session — never per question. The Progress page and Parent Hub both
 * onSnapshot() the same collections, so the UI updates in real time.
 *
 * Never throws. If Firestore writes fail (offline / rules / network), we log
 * to console but always dispatch the `syllab:progress-updated` window event
 * so any localStorage-backed UI can still refresh.
 */

import {
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { FIRESTORE_FEATURES_ENABLED } from './cloudFeatures';

export type LearningActivityType =
  | 'daily_challenge'
  | 'practice_session'
  | 'olympiad'
  | 'mock_test'
  | 'exam'
  | 'ppt_lesson'
  | 'skill_lab'
  | 'english_lab';

export interface LearningActivityInput {
  uid: string;
  type: LearningActivityType;
  title: string;
  subject?: string;
  classLevel?: string | number;
  score?: number;
  total?: number;
  percentage?: number;
  xpGained?: number;
  sourceId?: string;
  metadata?: Record<string, unknown>;
}

const DEV = (() => {
  try {
    return typeof import.meta !== 'undefined' && (import.meta as any)?.env?.DEV === true;
  } catch { return false; }
})();

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * Record a completed learning activity.
 * - Always dispatches `syllab:progress-updated` (used by ProgressPage / Analytics
 *   for instant local refresh — does NOT depend on Firestore success).
 * - Best-effort Firestore writes — never throws.
 *
 * Returns the activity-event id (or null if Firestore is disabled / unavailable).
 */
export async function recordLearningActivity(
  input: LearningActivityInput,
): Promise<string | null> {
  const xpGained = clamp(Number(input.xpGained ?? 0) || 0, 0, 1000);
  let percentage = input.percentage;
  if (percentage == null && typeof input.score === 'number' && typeof input.total === 'number' && input.total > 0) {
    percentage = Math.round((input.score / input.total) * 100);
  }
  if (typeof percentage === 'number') {
    percentage = clamp(Math.round(percentage), 0, 100);
  }

  // Always notify local listeners FIRST so UI refreshes even if Firestore is offline.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('syllab:progress-updated', {
      detail: { type: input.type, xpGained, title: input.title },
    }));
  }

  if (!FIRESTORE_FEATURES_ENABLED || !input.uid) {
    if (DEV) console.warn('[progressTracker] firestore disabled or no uid', input);
    return null;
  }

  try {
    if (DEV) console.log('[progressTracker] recording', input);

    const eventRef = doc(collection(db, 'activityEvents'));
    const progressRef = doc(db, 'progress', input.uid);
    const userRef = doc(db, 'users', input.uid);

    // Counter increments per type
    const counterKey: Record<LearningActivityType, string> = {
      daily_challenge:   'dailyChallengesCompleted',
      practice_session:  'practiceSessionsCompleted',
      olympiad:          'olympiadsCompleted',
      mock_test:         'mockTestsCompleted',
      exam:              'mockTestsCompleted',
      ppt_lesson:        'pptLessonsCompleted',
      skill_lab:         'skillLabCompleted',
      english_lab:       'englishLabCompleted',
    };

    const eventPayload: Record<string, unknown> = {
      uid: input.uid,
      type: input.type,
      title: input.title || 'Activity Completed',
      subject: input.subject ?? null,
      classLevel: input.classLevel != null ? String(input.classLevel) : null,
      score: typeof input.score === 'number' ? input.score : null,
      total: typeof input.total === 'number' ? input.total : null,
      percentage: typeof percentage === 'number' ? percentage : null,
      xpGained,
      sourceId: input.sourceId ?? null,
      metadata: input.metadata ?? null,
      createdAt: serverTimestamp(),
    };

    const progressPayload: Record<string, unknown> = {
      uid: input.uid,
      totalXP: increment(xpGained),
      totalActivities: increment(1),
      [counterKey[input.type]]: increment(1),
      lastActivityAt: serverTimestamp(),
      lastActivityTitle: input.title || 'Activity Completed',
      lastActivityType: input.type,
      updatedAt: serverTimestamp(),
    };

    const userPayload: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    };
    if (xpGained > 0) {
      userPayload.xp = increment(xpGained);
      userPayload['rewards.xp'] = increment(xpGained);
    }

    const batch = writeBatch(db);
    batch.set(eventRef, eventPayload);
    batch.set(progressRef, progressPayload, { merge: true });
    batch.set(userRef, userPayload, { merge: true });
    await batch.commit();

    if (DEV) console.log('[progressTracker] saved', { uid: input.uid, type: input.type, xpGained, id: eventRef.id });
    return eventRef.id;
  } catch (err) {
    console.error('[progressTracker] failed', err);
    return null;
  }
}
