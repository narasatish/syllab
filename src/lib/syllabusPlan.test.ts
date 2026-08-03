import { describe, it, expect } from 'vitest';
import { syllabusProgress, remainingChapters, buildSyllabusPlan } from './syllabusPlan';
import type { ChapterRef } from './studyPlan';

const ch = (id: string, title: string, subject: string): ChapterRef =>
  ({ id, title, subject, classLevel: '10' }) as ChapterRef;

const PHY = [ch('p1', 'Light', 'Physics'), ch('p2', 'Electricity', 'Physics'), ch('p3', 'Magnetism', 'Physics')];
const CHE = [ch('c1', 'Acids & Bases', 'Chemistry'), ch('c2', 'Metals', 'Chemistry')];
const ALL = [...PHY, ...CHE];

describe('syllabusProgress', () => {
  it('counts overall and per-subject completion', () => {
    const p = syllabusProgress(ALL, new Set(['p1', 'c1']));
    expect(p.total).toBe(5);
    expect(p.done).toBe(2);
    expect(p.remaining).toBe(3);
    expect(p.pct).toBe(40);
    expect(p.bySubject).toEqual([
      { subject: 'Physics', total: 3, done: 1, pct: 33 },
      { subject: 'Chemistry', total: 2, done: 1, pct: 50 },
    ]);
  });

  it('is 0% (not NaN) with no chapters', () => {
    const p = syllabusProgress([], new Set());
    expect(p.pct).toBe(0);
    expect(p.bySubject).toEqual([]);
  });

  it('reaches 100% when everything is ticked', () => {
    expect(syllabusProgress(ALL, new Set(ALL.map((c) => c.id))).pct).toBe(100);
  });

  it('ignores done-ids that are not in the selection', () => {
    expect(syllabusProgress(PHY, new Set(['c1', 'zzz'])).done).toBe(0);
  });
});

describe('remainingChapters', () => {
  it('drops completed chapters and keeps syllabus order', () => {
    expect(remainingChapters(ALL, new Set(['p2'])).map((c) => c.id)).toEqual(['p1', 'p3', 'c1', 'c2']);
  });
});

describe('buildSyllabusPlan', () => {
  const base = { chapters: ALL, doneIds: new Set<string>(), hoursPerDay: 4, startISO: '2026-08-03' };

  it('names actual chapters on learn days', () => {
    const plan = buildSyllabusPlan({ ...base, days: 10 });
    const learn = plan.filter((d) => d.phase === 'Learn');
    expect(learn.length).toBeGreaterThan(0);
    expect(learn.flatMap((d) => d.chapters)).toEqual(
      expect.arrayContaining(['Light', 'Acids & Bases']),
    );
  });

  it('schedules every remaining chapter exactly once', () => {
    const plan = buildSyllabusPlan({ ...base, days: 10 });
    const scheduled = plan.flatMap((d) => d.chapters);
    expect(scheduled).toHaveLength(ALL.length);
    expect(new Set(scheduled).size).toBe(ALL.length);
  });

  it('skips chapters already ticked off', () => {
    const plan = buildSyllabusPlan({ ...base, days: 10, doneIds: new Set(['p1', 'p2']) });
    const scheduled = plan.flatMap((d) => d.chapters);
    expect(scheduled).not.toContain('Light');
    expect(scheduled).not.toContain('Electricity');
    expect(scheduled).toHaveLength(3);
  });

  it('alternates subjects instead of finishing one before starting the next', () => {
    const plan = buildSyllabusPlan({ ...base, days: 12 });
    const order = plan.filter((d) => d.phase === 'Learn').flatMap((d) => d.chapters);
    // interleaved: Physics, Chemistry, Physics, Chemistry, Physics
    expect(order).toEqual(['Light', 'Acids & Bases', 'Electricity', 'Metals', 'Magnetism']);
  });

  it('ends with a revise tail and a mock day', () => {
    const plan = buildSyllabusPlan({ ...base, days: 12 });
    expect(plan[plan.length - 1].phase).toBe('Mock');
    expect(plan.some((d) => d.phase === 'Revise')).toBe(true);
  });

  it('always produces exactly `days` days', () => {
    for (const days of [1, 2, 3, 5, 12, 40]) {
      expect(buildSyllabusPlan({ ...base, days })).toHaveLength(days);
    }
  });

  it('turns surplus days into revision rather than half-empty learn days', () => {
    // 40 days, 5 chapters → at most 5 learn days, the rest revise/mock
    const plan = buildSyllabusPlan({ ...base, days: 40 });
    expect(plan.filter((d) => d.phase === 'Learn')).toHaveLength(5);
    expect(plan.filter((d) => d.phase === 'Revise').length).toBeGreaterThan(30);
  });

  it('packs chapters into fewer days when time is short', () => {
    const plan = buildSyllabusPlan({ ...base, days: 4 });
    expect(plan).toHaveLength(4);
    expect(plan.flatMap((d) => d.chapters)).toHaveLength(5); // nothing dropped
  });

  it('is all revision once the syllabus is complete', () => {
    const plan = buildSyllabusPlan({ ...base, days: 6, doneIds: new Set(ALL.map((c) => c.id)) });
    expect(plan.filter((d) => d.phase === 'Learn')).toHaveLength(0);
    expect(plan).toHaveLength(6);
    expect(plan[plan.length - 1].phase).toBe('Mock');
  });

  it('returns nothing for empty or non-positive input', () => {
    expect(buildSyllabusPlan({ ...base, days: 0 })).toEqual([]);
    expect(buildSyllabusPlan({ ...base, days: -5 })).toEqual([]);
    expect(buildSyllabusPlan({ ...base, chapters: [], days: 10 })).toEqual([]);
  });

  it('advances the date by one day per entry', () => {
    const plan = buildSyllabusPlan({ ...base, days: 3 });
    expect(plan.map((d) => d.date)).toEqual(['2026-08-03', '2026-08-04', '2026-08-05']);
  });

  it('carries hours through to every day', () => {
    expect(buildSyllabusPlan({ ...base, days: 5 }).every((d) => d.hours === 4)).toBe(true);
  });
});
