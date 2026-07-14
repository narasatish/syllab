import { describe, it, expect } from 'vitest';
import { buildStudyPlan, addDays } from './studyPlanner';

describe('addDays', () => {
  it('adds days timezone-safely', () => {
    expect(addDays('2026-07-13', 1)).toBe('2026-07-14');
    expect(addDays('2026-07-31', 1)).toBe('2026-08-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
});

describe('buildStudyPlan', () => {
  it('returns empty for no subjects or no days', () => {
    expect(buildStudyPlan({ subjects: [], days: 10, hoursPerDay: 4, startISO: '2026-07-13' })).toEqual([]);
    expect(buildStudyPlan({ subjects: ['Maths'], days: 0, hoursPerDay: 4, startISO: '2026-07-13' })).toEqual([]);
  });

  it('produces exactly `days` entries, dated consecutively', () => {
    const p = buildStudyPlan({ subjects: ['Maths', 'Physics', 'Chemistry'], days: 12, hoursPerDay: 5, startISO: '2026-07-13' });
    expect(p.length).toBe(12);
    expect(p[0].date).toBe('2026-07-13');
    expect(p[11].date).toBe('2026-07-24');
  });

  it('ends with a Revise tail and a Mock day for longer plans', () => {
    const p = buildStudyPlan({ subjects: ['Maths', 'Physics'], days: 12, hoursPerDay: 4, startISO: '2026-07-13' });
    expect(p[p.length - 1].phase).toBe('Mock');
    expect(p.some((d) => d.phase === 'Revise')).toBe(true);
    expect(p.some((d) => d.phase === 'Learn')).toBe(true);
  });

  it('covers every subject in the learn phase', () => {
    const subjects = ['Maths', 'Physics', 'Chemistry', 'Biology'];
    const p = buildStudyPlan({ subjects, days: 20, hoursPerDay: 6, startISO: '2026-07-13' });
    const learned = new Set(p.filter((d) => d.phase === 'Learn').flatMap((d) => d.subjects));
    for (const s of subjects) expect(learned.has(s)).toBe(true);
  });

  it('stays simple for very short windows (no mock/revise below 3 days)', () => {
    const p = buildStudyPlan({ subjects: ['Maths', 'Physics'], days: 2, hoursPerDay: 3, startISO: '2026-07-13' });
    expect(p.length).toBe(2);
    expect(p.every((d) => d.phase === 'Learn')).toBe(true);
  });
});
