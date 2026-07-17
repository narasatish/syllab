import { describe, it, expect } from 'vitest';
import { addEvent, hasActivity, streak, totals, lastDays, prune, type StatsData } from './toolStats';

const T = '2026-07-14';

describe('addEvent / hasActivity', () => {
  it('accumulates counts per day and type immutably', () => {
    let d: StatsData = {};
    d = addEvent(d, 'focus', T);
    d = addEvent(d, 'focus', T);
    d = addEvent(d, 'flashcard', T, 5);
    expect(d[T]).toEqual({ focus: 2, flashcard: 5 });
    const before = addEvent({}, 'focus', T);
    const after = addEvent(before, 'focus', T);
    expect(before[T].focus).toBe(1); // original untouched
    expect(after[T].focus).toBe(2);
  });
  it('hasActivity is false for empty/zero days', () => {
    expect(hasActivity({}, T)).toBe(false);
    expect(hasActivity({ [T]: {} }, T)).toBe(false);
    expect(hasActivity({ [T]: { focus: 0 } }, T)).toBe(false);
    expect(hasActivity({ [T]: { focus: 1 } }, T)).toBe(true);
  });
});

describe('streak', () => {
  it('counts consecutive days ending today', () => {
    const d: StatsData = { '2026-07-12': { focus: 1 }, '2026-07-13': { focus: 1 }, '2026-07-14': { focus: 1 } };
    expect(streak(d, T)).toBe(3);
  });
  it('survives a day with no activity yet (measures from yesterday)', () => {
    const d: StatsData = { '2026-07-12': { focus: 1 }, '2026-07-13': { flashcard: 2 } };
    expect(streak(d, T)).toBe(2); // today empty, but yesterday active
  });
  it('breaks after a full missed day', () => {
    const d: StatsData = { '2026-07-10': { focus: 1 }, '2026-07-11': { focus: 1 } };
    expect(streak(d, T)).toBe(0);
  });
  it('is 0 with no data', () => {
    expect(streak({}, T)).toBe(0);
  });
  it('ignores gaps further back', () => {
    const d: StatsData = { '2026-07-01': { focus: 1 }, '2026-07-13': { focus: 1 }, '2026-07-14': { focus: 1 } };
    expect(streak(d, T)).toBe(2);
  });
});

describe('totals', () => {
  it('sums lifetime counts and active days', () => {
    const d: StatsData = { '2026-07-13': { focus: 2, flashcard: 10 }, '2026-07-14': { focus: 1 }, '2026-07-12': {} };
    expect(totals(d)).toEqual({ focus: 3, flashcard: 10, activeDays: 2 });
  });
});

describe('lastDays', () => {
  it('returns n days oldest→newest with combined counts', () => {
    const d: StatsData = { '2026-07-14': { focus: 1, flashcard: 2 }, '2026-07-13': { focus: 1 } };
    const r = lastDays(d, T, 3);
    expect(r.map((x) => x.date)).toEqual(['2026-07-12', '2026-07-13', '2026-07-14']);
    expect(r.map((x) => x.count)).toEqual([0, 1, 3]);
  });
});

describe('prune', () => {
  it('drops days older than the retention window', () => {
    const d: StatsData = { '2020-01-01': { focus: 1 }, '2026-07-14': { focus: 1 } };
    const p = prune(d, T);
    expect(p['2020-01-01']).toBeUndefined();
    expect(p['2026-07-14']).toBeDefined();
  });
});
