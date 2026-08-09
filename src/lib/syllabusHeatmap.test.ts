import { describe, it, expect } from 'vitest';
import {
  buildHeatmap, cellLevel, strongestSubjects,
  type HeatmapChapter,
} from './syllabusHeatmap';

const CH: HeatmapChapter[] = [
  { id: 'c10-sci-1', title: 'Light', subject: 'Science', classLevel: '10' },
  { id: 'c10-sci-2', title: 'Electricity', subject: 'Science', classLevel: '10' },
  { id: 'c10-sci-3', title: 'Acids', subject: 'Science', classLevel: '10' },
  { id: 'c10-mat-1', title: 'Trigonometry', subject: 'Mathematics', classLevel: '10' },
  { id: 'c10-mat-2', title: 'Circles', subject: 'Mathematics', classLevel: '10' },
  // a different class — must never leak into a Class 10 grid
  { id: 'c9-sci-1', title: 'Light', subject: 'Science', classLevel: '9' },
];

describe('buildHeatmap', () => {
  it('only includes chapters for the requested class', () => {
    const h = buildHeatmap(CH, [], '10');
    expect(h.total).toBe(5);
    expect(h.rows.flatMap((r) => r.cells).some((c) => c.id === 'c9-sci-1')).toBe(false);
  });

  it('matches on chapter ID, not title', () => {
    // 'Light' exists in both Class 9 and Class 10. Completing the Class 9 one
    // must NOT light up the Class 10 cell.
    const h = buildHeatmap(CH, ['c9-sci-1'], '10');
    const light = h.rows.flatMap((r) => r.cells).find((c) => c.id === 'c10-sci-1');
    expect(light?.done).toBe(false);
    expect(h.doneCount).toBe(0);
  });

  it('marks completed cells and counts them', () => {
    const h = buildHeatmap(CH, ['c10-sci-1', 'c10-mat-2'], '10');
    expect(h.doneCount).toBe(2);
    expect(h.total).toBe(5);
    expect(h.percent).toBe(40);
  });

  it('groups by subject with per-subject totals', () => {
    const h = buildHeatmap(CH, ['c10-sci-1', 'c10-sci-2'], '10');
    const sci = h.rows.find((r) => r.subject === 'Science');
    const mat = h.rows.find((r) => r.subject === 'Mathematics');
    expect(sci).toMatchObject({ doneCount: 2, total: 3, percent: 67 });
    expect(mat).toMatchObject({ doneCount: 0, total: 2, percent: 0 });
  });

  it('sorts rows by subject so the layout does not reshuffle between renders', () => {
    const h = buildHeatmap(CH, [], '10');
    expect(h.rows.map((r) => r.subject)).toEqual(['Mathematics', 'Science']);
    const shuffled = buildHeatmap([...CH].reverse(), [], '10');
    expect(shuffled.rows.map((r) => r.subject)).toEqual(['Mathematics', 'Science']);
  });

  it('handles a class with no chapters without dividing by zero', () => {
    const h = buildHeatmap(CH, [], '42');
    expect(h).toMatchObject({ rows: [], doneCount: 0, total: 0, percent: 0 });
  });

  it.each<[string[] | undefined | null]>([[undefined], [null], [[]]])(
    'treats %p completed as nothing done', (completed) => {
      const h = buildHeatmap(CH, completed, '10');
      expect(h.doneCount).toBe(0);
      expect(h.percent).toBe(0);
    },
  );

  it('ignores completed IDs that are not in the syllabus', () => {
    const h = buildHeatmap(CH, ['ghost-chapter', 'c10-sci-1'], '10');
    expect(h.doneCount).toBe(1);
  });

  it('never reports more done than total, even with duplicate IDs', () => {
    const h = buildHeatmap(CH, ['c10-sci-1', 'c10-sci-1', 'c10-sci-1'], '10');
    expect(h.doneCount).toBe(1);
    expect(h.doneCount).toBeLessThanOrEqual(h.total);
  });

  it('reaches exactly 100% when everything is done', () => {
    const all = CH.filter((c) => c.classLevel === '10').map((c) => c.id);
    const h = buildHeatmap(CH, all, '10');
    expect(h.percent).toBe(100);
    expect(h.doneCount).toBe(h.total);
  });

  it('accepts a numeric class level (Firestore sometimes stores numbers)', () => {
    const h = buildHeatmap(CH, [], 10 as unknown as string);
    expect(h.total).toBe(5);
  });
});

describe('cellLevel', () => {
  it('is binary — we have no half-done signal to colour', () => {
    expect(cellLevel({ id: 'a', title: 'A', done: true })).toBe(1);
    expect(cellLevel({ id: 'a', title: 'A', done: false })).toBe(0);
  });
});

describe('strongestSubjects', () => {
  it('lists only subjects with progress, best first', () => {
    const h = buildHeatmap(CH, ['c10-sci-1', 'c10-sci-2', 'c10-mat-1'], '10');
    const top = strongestSubjects(h);
    expect(top.map((r) => r.subject)).toEqual(['Science', 'Mathematics']); // 67% then 50%
  });

  it('excludes untouched subjects', () => {
    const h = buildHeatmap(CH, ['c10-mat-1'], '10');
    expect(strongestSubjects(h).map((r) => r.subject)).toEqual(['Mathematics']);
  });

  it('returns nothing when nothing is done', () => {
    expect(strongestSubjects(buildHeatmap(CH, [], '10'))).toEqual([]);
  });

  it('respects the limit', () => {
    const h = buildHeatmap(CH, ['c10-sci-1', 'c10-mat-1'], '10');
    expect(strongestSubjects(h, 1)).toHaveLength(1);
  });
});
