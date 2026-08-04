/**
 * userDefaults.ts — the empty-user shapes, with NO Firebase import.
 *
 * These used to live in lib/firebase.ts. App.tsx needs them on first render to
 * seed state, and importing them from there dragged the whole Firebase SDK
 * (~519 KB: app + app-check + auth + firestore) into the critical path for
 * every visitor — including the ~97% who arrive from search and never sign in.
 *
 * Splitting the plain data out lets App.tsx import it statically for free and
 * pull the SDK itself only when auth actually starts. lib/firebase re-exports
 * both names, so existing importers are unaffected.
 */
import type { UserProgress, UserStats } from '../types';

export const DEFAULT_USER_STATS: UserStats = {
  score: 0,
  xp: 0,
  rank: 'Beginner',
  streak: 0,
  level: 1,
  badges: [],
};

export const DEFAULT_USER_PROGRESS: UserProgress = {
  completedChapters: [],
  lastChapter: '',
  conceptProgress: {},
};

/** Role is read on first paint to pick the nav, so it stays Firebase-free. */
export function getStoredRole(): 'student' | 'parent' | null {
  try { return localStorage.getItem('syllab_user_role') as 'student' | 'parent' | null; } catch { return null; }
}

export function setStoredRole(role: 'student' | 'parent'): void {
  try { localStorage.setItem('syllab_user_role', role); } catch { /* ignore */ }
}
