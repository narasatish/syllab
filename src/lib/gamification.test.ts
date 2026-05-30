import { beforeEach, describe, expect, it } from 'vitest';
import {
  getLevel, touchStreak, getStreak, evaluateBadges, getEarnedBadges,
  getCounters, BADGES,
} from './gamification';

function setStreak(count: number, last: string, best = count) {
  localStorage.setItem('syllab_streak_v1', JSON.stringify({ count, best, last }));
}
function ymd(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

describe('gamification — levels', () => {
  it('maps XP to the correct named level', () => {
    expect(getLevel(0).name).toBe('Beginner');
    expect(getLevel(0).level).toBe(1);
    expect(getLevel(150).name).toBe('Explorer');
    expect(getLevel(700).name).toBe('Scholar');
    expect(getLevel(3000).name).toBe('Topper');
  });

  it('computes progress toward the next level', () => {
    // Explorer starts at 100, Learner at 300 → halfway = 200
    const info = getLevel(200);
    expect(info.name).toBe('Explorer');
    expect(info.progress).toBe(50);
    expect(info.nextXp).toBe(300);
  });

  it('caps at max level with 100% progress and Infinity next', () => {
    const info = getLevel(999999);
    expect(info.level).toBe(10);
    expect(info.progress).toBe(100);
    expect(info.nextXp).toBe(Infinity);
  });

  it('never returns negative or NaN for junk input', () => {
    expect(getLevel(-50).level).toBe(1);
    expect(getLevel(NaN).level).toBe(1);
  });
});

describe('gamification — daily streak', () => {
  beforeEach(() => localStorage.clear());

  it('starts a streak at 1 on the first activity', () => {
    const s = touchStreak();
    expect(s.count).toBe(1);
    expect(s.best).toBe(1);
  });

  it('does not double-count the same day', () => {
    touchStreak();
    const s = touchStreak();
    expect(s.count).toBe(1);
  });

  it('increments when yesterday had activity', () => {
    setStreak(4, ymd(-1));
    const s = touchStreak();
    expect(s.count).toBe(5);
    expect(s.best).toBe(5);
  });

  it('resets to 1 when a day was missed', () => {
    setStreak(9, ymd(-3));
    const s = touchStreak();
    expect(s.count).toBe(1);
    expect(s.best).toBe(9); // best is preserved
  });

  it('getStreak shows 0 when more than a day has passed (expired)', () => {
    setStreak(6, ymd(-2));
    expect(getStreak().count).toBe(0);
  });
});

describe('gamification — badges', () => {
  beforeEach(() => localStorage.clear());

  it('unlocks the first-step badge after one activity', () => {
    localStorage.setItem('syllab_gami_counters_v1', JSON.stringify({ total: 1 }));
    const newly = evaluateBadges(0);
    expect(newly.some(b => b.id === 'first-step')).toBe(true);
    expect(getEarnedBadges()).toContain('first-step');
  });

  it('does not re-award an already-earned badge', () => {
    localStorage.setItem('syllab_gami_counters_v1', JSON.stringify({ total: 1 }));
    evaluateBadges(0);
    const second = evaluateBadges(0);
    expect(second.find(b => b.id === 'first-step')).toBeUndefined();
  });

  it('unlocks XP badges at the right thresholds', () => {
    const newly = evaluateBadges(5000);
    const ids = newly.map(b => b.id);
    expect(ids).toContain('xp-1000');
    expect(ids).toContain('xp-5000');
    expect(ids).not.toContain('xp-15000');
  });

  it('every badge has a unique id and a check function', () => {
    const ids = new Set(BADGES.map(b => b.id));
    expect(ids.size).toBe(BADGES.length);
    expect(BADGES.every(b => typeof b.check === 'function')).toBe(true);
  });

  it('counters default to zero object', () => {
    localStorage.clear();
    expect(getCounters().total).toBe(0);
  });
});
