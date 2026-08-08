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

/**
 * Has this browser EVER completed a sign-in?
 *
 * Firebase cannot answer that without downloading ~519 KB first, which is the
 * whole problem: PageSpeed put the SDK in the homepage critical request chain
 * (index -> vendor-motion -> firebase -> vendor-firebase-2, 794 ms) because the
 * auth bootstrap ran on a requestIdleCallback with a 2000 ms timeout — on a
 * throttled mobile thread the idle slot never arrives, so it always fired at
 * the timeout, right in the middle of LCP.
 *
 * A visitor who has never signed in on this device cannot be signed in now, so
 * for them the download is pure waste. This flag lets us skip it entirely until
 * they actually interact. It is a HINT, not an auth decision — it never grants
 * access to anything; the real check is still onAuthStateChanged. Worst case the
 * flag is stale and auth simply starts a moment later than it could have.
 */
export function hasSignedInBefore(): boolean {
  try { return localStorage.getItem('syllab_seen_auth') === '1'; } catch { return false; }
}

/** Called once auth resolves, so the NEXT load knows which path to take. */
export function setSignedInHint(signedIn: boolean): void {
  try {
    if (signedIn) localStorage.setItem('syllab_seen_auth', '1');
    else localStorage.removeItem('syllab_seen_auth');
  } catch { /* ignore quota/private-mode */ }
}
