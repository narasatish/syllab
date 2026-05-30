/**
 * gamification.ts — Levels, badges, daily streaks and counters.
 *
 * Builds ON TOP of the existing XP system (recordLearningActivity increments
 * users/{uid}.xp and fires `syllab:progress-updated`). This module:
 *   • derives a named LEVEL from total XP
 *   • tracks a daily STREAK (localStorage, timezone-safe by calendar day)
 *   • keeps simple activity COUNTERS for badge criteria
 *   • evaluates BADGES (achievements) and remembers which are newly unlocked
 *
 * It listens to `syllab:progress-updated` and re-dispatches
 * `syllab:gamification-updated` so any UI can refresh instantly. All state is
 * localStorage-backed so it works offline and without a backend round-trip.
 */

/* ─── Levels ─────────────────────────────────────────────────────────────── */
export interface LevelInfo {
  level: number;
  name: string;
  emoji: string;
  minXp: number;
  /** XP needed to reach the NEXT level (Infinity at max). */
  nextXp: number;
  /** 0–100 progress toward the next level. */
  progress: number;
}

const LEVELS: { level: number; name: string; emoji: string; minXp: number }[] = [
  { level: 1, name: 'Beginner',   emoji: '🌱', minXp: 0 },
  { level: 2, name: 'Explorer',   emoji: '🧭', minXp: 100 },
  { level: 3, name: 'Learner',    emoji: '📘', minXp: 300 },
  { level: 4, name: 'Scholar',    emoji: '🎓', minXp: 700 },
  { level: 5, name: 'Achiever',   emoji: '⭐', minXp: 1500 },
  { level: 6, name: 'Topper',     emoji: '🏆', minXp: 3000 },
  { level: 7, name: 'Master',     emoji: '💎', minXp: 6000 },
  { level: 8, name: 'Legend',     emoji: '🔥', minXp: 12000 },
  { level: 9, name: 'Genius',     emoji: '🧠', minXp: 24000 },
  { level: 10, name: 'Syllab GOAT', emoji: '👑', minXp: 50000 },
];

export function getLevel(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp || 0));
  let current = LEVELS[0];
  for (const l of LEVELS) if (safeXp >= l.minXp) current = l;
  const idx = LEVELS.findIndex(l => l.level === current.level);
  const next = LEVELS[idx + 1];
  const nextXp = next ? next.minXp : Infinity;
  const span = next ? next.minXp - current.minXp : 1;
  const into = safeXp - current.minXp;
  const progress = next ? Math.min(100, Math.round((into / span) * 100)) : 100;
  return { ...current, nextXp, progress };
}

/* ─── Daily streak ───────────────────────────────────────────────────────── */
const STREAK_KEY = 'syllab_streak_v1';
interface StreakState { count: number; best: number; last: string; }

function todayStr(): string {
  // Local calendar day YYYY-MM-DD
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function dayDiff(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00'); const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}
function readStreak(): StreakState {
  try { const s = JSON.parse(localStorage.getItem(STREAK_KEY) || ''); if (s && typeof s.count === 'number') return s; } catch { /* ignore */ }
  return { count: 0, best: 0, last: '' };
}
function writeStreak(s: StreakState) { try { localStorage.setItem(STREAK_KEY, JSON.stringify(s)); } catch { /* ignore */ } }

/** Call when the user completes any activity today. Returns the updated streak. */
export function touchStreak(): StreakState {
  const s = readStreak();
  const today = todayStr();
  if (s.last === today) return s; // already counted today
  const gap = s.last ? dayDiff(s.last, today) : 999;
  s.count = gap === 1 ? s.count + 1 : 1; // consecutive day → +1, else reset to 1
  s.best = Math.max(s.best, s.count);
  s.last = today;
  writeStreak(s);
  return s;
}

/** Read streak without mutating. Auto-expires if a day was fully missed. */
export function getStreak(): StreakState {
  const s = readStreak();
  if (s.last && dayDiff(s.last, todayStr()) > 1) return { ...s, count: 0 };
  return s;
}

/* ─── Activity counters (for badge criteria) ────────────────────────────────*/
const COUNTERS_KEY = 'syllab_gami_counters_v1';
export interface Counters {
  total: number;
  practice: number;
  mock: number;
  lesson: number;
  daily: number;
  coding: number;
  english: number;
  perfect: number; // 100% scores
}
const ZERO: Counters = { total: 0, practice: 0, mock: 0, lesson: 0, daily: 0, coding: 0, english: 0, perfect: 0 };

export function getCounters(): Counters {
  try { return { ...ZERO, ...JSON.parse(localStorage.getItem(COUNTERS_KEY) || '{}') }; } catch { return { ...ZERO }; }
}
function writeCounters(c: Counters) { try { localStorage.setItem(COUNTERS_KEY, JSON.stringify(c)); } catch { /* ignore */ } }

function bumpCounters(type: string, percentage?: number): Counters {
  const c = getCounters();
  c.total += 1;
  if (type === 'practice_session') c.practice += 1;
  else if (type === 'mock_test' || type === 'exam') c.mock += 1;
  else if (type === 'ppt_lesson') c.lesson += 1;
  else if (type === 'daily_challenge') c.daily += 1;
  else if (type === 'skill_lab') c.coding += 1;
  else if (type === 'english_lab') c.english += 1;
  if (typeof percentage === 'number' && percentage >= 100) c.perfect += 1;
  writeCounters(c);
  return c;
}

/* ─── Badges ─────────────────────────────────────────────────────────────── */
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  check: (ctx: { xp: number; streak: number; counters: Counters }) => boolean;
}

export const BADGES: Badge[] = [
  { id: 'first-step',   name: 'First Step',     emoji: '👣', desc: 'Complete your first activity', check: c => c.counters.total >= 1 },
  { id: 'getting-going',name: 'Getting Going',  emoji: '🚀', desc: 'Complete 10 activities',       check: c => c.counters.total >= 10 },
  { id: 'century',      name: 'Centurion',      emoji: '💯', desc: 'Complete 100 activities',      check: c => c.counters.total >= 100 },
  { id: 'streak-3',     name: 'On Fire',        emoji: '🔥', desc: '3-day learning streak',        check: c => c.streak >= 3 },
  { id: 'streak-7',     name: 'Week Warrior',   emoji: '📅', desc: '7-day learning streak',        check: c => c.streak >= 7 },
  { id: 'streak-30',    name: 'Unstoppable',    emoji: '🏅', desc: '30-day learning streak',       check: c => c.streak >= 30 },
  { id: 'practice-25',  name: 'Practice Pro',   emoji: '🎯', desc: '25 practice sessions',         check: c => c.counters.practice >= 25 },
  { id: 'mock-10',      name: 'Mock Master',    emoji: '📝', desc: 'Attempt 10 mock tests',        check: c => c.counters.mock >= 10 },
  { id: 'lesson-20',    name: 'Bookworm',       emoji: '📚', desc: 'Finish 20 lessons',            check: c => c.counters.lesson >= 20 },
  { id: 'coder',        name: 'Code Ninja',     emoji: '💻', desc: 'Complete 10 coding tasks',     check: c => c.counters.coding >= 10 },
  { id: 'perfect-5',    name: 'Perfectionist',  emoji: '✨', desc: 'Score 100% five times',        check: c => c.counters.perfect >= 5 },
  { id: 'xp-1000',      name: 'Rising Star',    emoji: '⭐', desc: 'Earn 1,000 XP',                check: c => c.xp >= 1000 },
  { id: 'xp-5000',      name: 'XP Champion',    emoji: '🏆', desc: 'Earn 5,000 XP',                check: c => c.xp >= 5000 },
  { id: 'xp-15000',     name: 'Legend',         emoji: '👑', desc: 'Earn 15,000 XP',               check: c => c.xp >= 15000 },
];

const EARNED_KEY = 'syllab_badges_v1';
export function getEarnedBadges(): string[] {
  try { const a = JSON.parse(localStorage.getItem(EARNED_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch { return []; }
}
function writeEarned(ids: string[]) { try { localStorage.setItem(EARNED_KEY, JSON.stringify(ids)); } catch { /* ignore */ } }

/** Evaluate all badges; return any NEWLY unlocked since last check. */
export function evaluateBadges(xp: number): Badge[] {
  const streak = getStreak().count;
  const counters = getCounters();
  const earned = new Set(getEarnedBadges());
  const newly: Badge[] = [];
  for (const b of BADGES) {
    if (!earned.has(b.id) && b.check({ xp, streak, counters })) {
      earned.add(b.id); newly.push(b);
    }
  }
  if (newly.length) writeEarned([...earned]);
  return newly;
}

/* ─── Wiring: listen to progress events, update streak/counters/badges ──────── */
let wired = false;
/** Read the user's current XP from the global stats snapshot if available. */
function readXp(): number {
  try {
    const fromWin = (window as any).__syllabXp;
    if (typeof fromWin === 'number') return fromWin;
    const ls = Number(localStorage.getItem('syllab_xp_mirror') || '0');
    return Number.isFinite(ls) ? ls : 0;
  } catch { return 0; }
}

export function initGamification(): void {
  if (wired || typeof window === 'undefined') return;
  wired = true;
  window.addEventListener('syllab:progress-updated', (e: Event) => {
    const detail = (e as CustomEvent).detail || {};
    const xpGained = Number(detail.xpGained || 0);
    // Mirror running XP locally so badges/levels work without a Firestore read.
    try {
      const mirror = Number(localStorage.getItem('syllab_xp_mirror') || '0') + xpGained;
      localStorage.setItem('syllab_xp_mirror', String(mirror));
      (window as any).__syllabXp = mirror;
    } catch { /* ignore */ }

    const streak = touchStreak();
    bumpCounters(detail.type, detail.percentage);
    const newBadges = evaluateBadges(readXp());

    window.dispatchEvent(new CustomEvent('syllab:gamification-updated', {
      detail: { streak: streak.count, newBadges },
    }));
  });
}

/** Seed the local XP mirror from the authoritative Firestore value on login. */
export function syncXpMirror(xp: number): void {
  try {
    localStorage.setItem('syllab_xp_mirror', String(Math.max(0, Math.floor(xp || 0))));
    (window as any).__syllabXp = Math.max(0, Math.floor(xp || 0));
  } catch { /* ignore */ }
  // Re-evaluate badges against the authoritative XP (covers XP earned elsewhere).
  evaluateBadges(xp);
}
