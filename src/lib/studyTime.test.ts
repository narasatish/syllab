import { describe, it, expect } from 'vitest';
import { mmss, daysUntil, computeNextStore, minutesToday, type StudyStore } from './studyTime';

describe('mmss', () => {
  it('formats seconds as zero-padded MM:SS', () => {
    expect(mmss(0)).toBe('00:00');
    expect(mmss(5)).toBe('00:05');
    expect(mmss(65)).toBe('01:05');
    expect(mmss(25 * 60)).toBe('25:00');
    expect(mmss(3599)).toBe('59:59');
  });
  it('clamps negatives to 00:00 and floors fractions', () => {
    expect(mmss(-10)).toBe('00:00');
    expect(mmss(90.9)).toBe('01:30');
  });
});

describe('daysUntil', () => {
  const now = new Date('2026-06-09T12:00:00Z').getTime();
  it('counts whole days to a future date', () => {
    expect(daysUntil('2026-06-10', now)).toBe(1);
    expect(daysUntil('2026-06-19', now)).toBe(10);
  });
  it('never returns negative for past dates', () => {
    expect(daysUntil('2026-06-01', now)).toBe(0);
  });
  it('returns 0 for an invalid date string', () => {
    expect(daysUntil('not-a-date', now)).toBe(0);
  });
});

describe('computeNextStore (streak logic)', () => {
  const base: StudyStore = { totalMinutes: 100, streak: 3, lastStudyDate: '2026-06-08' };
  const TODAY = '2026-06-09';
  const YDAY = '2026-06-08';

  it('increments streak when last study was yesterday', () => {
    const next = computeNextStore(base, 25, TODAY, YDAY);
    expect(next.streak).toBe(4);
    expect(next.totalMinutes).toBe(125);
    expect(next.lastStudyDate).toBe(TODAY);
  });

  it('keeps streak when already studied today', () => {
    const sameDay: StudyStore = { totalMinutes: 50, streak: 5, lastStudyDate: TODAY };
    const next = computeNextStore(sameDay, 10, TODAY, YDAY);
    expect(next.streak).toBe(5);
    expect(next.totalMinutes).toBe(60);
  });

  it('resets streak to 1 after a gap', () => {
    const stale: StudyStore = { totalMinutes: 200, streak: 9, lastStudyDate: '2026-06-01' };
    const next = computeNextStore(stale, 30, TODAY, YDAY);
    expect(next.streak).toBe(1);
    expect(next.totalMinutes).toBe(230);
  });

  it('starts a streak at 1 for a brand-new user', () => {
    const fresh: StudyStore = { totalMinutes: 0, streak: 0, lastStudyDate: '' };
    const next = computeNextStore(fresh, 25, TODAY, YDAY);
    expect(next.streak).toBe(1);
  });

  it('leaves the store unchanged when nothing was studied', () => {
    const next = computeNextStore(base, 0, TODAY, YDAY);
    expect(next).toEqual(base);
  });

  it('accumulates daily minutes within the same day', () => {
    const start = computeNextStore({ totalMinutes: 0, streak: 0, lastStudyDate: '' }, 25, TODAY, YDAY);
    expect(start.dailyMinutes).toBe(25);
    const more = computeNextStore(start, 15, TODAY, YDAY);
    expect(more.dailyMinutes).toBe(40);
    expect(more.dailyDate).toBe(TODAY);
  });

  it('resets daily minutes on a new day', () => {
    const ydayStore: StudyStore = { totalMinutes: 50, streak: 2, lastStudyDate: YDAY, dailyMinutes: 50, dailyDate: YDAY };
    const next = computeNextStore(ydayStore, 20, TODAY, YDAY);
    expect(next.dailyMinutes).toBe(20);
  });
});

describe('minutesToday', () => {
  it('returns daily minutes only when the stored date is today', () => {
    expect(minutesToday({ totalMinutes: 0, streak: 0, lastStudyDate: '', dailyMinutes: 40, dailyDate: '2026-06-09' }, '2026-06-09')).toBe(40);
    expect(minutesToday({ totalMinutes: 0, streak: 0, lastStudyDate: '', dailyMinutes: 40, dailyDate: '2026-06-08' }, '2026-06-09')).toBe(0);
    expect(minutesToday({ totalMinutes: 0, streak: 0, lastStudyDate: '' }, '2026-06-09')).toBe(0);
  });
});
