import { describe, it, expect } from 'vitest';
import { makeRng, shuffle, countAvailable, buildPaper, answerKey, type SourceChapter } from './questionPaper';

const mcq = (q: string, correct = 0) => ({ q, options: ['A', 'B', 'C', 'D'], correct, explanation: 'because' });

const CH = (chapter: string, n: number, subject = 'Science'): SourceChapter => ({
  slug: chapter.toLowerCase().replace(/\s+/g, '-'),
  classLevel: '10',
  subject,
  chapter,
  mcqs: Array.from({ length: n }, (_, i) => mcq(`${chapter} Q${i + 1}`, i % 4)),
});

describe('makeRng / shuffle', () => {
  it('is deterministic for a given seed', () => {
    const a = Array.from({ length: 5 }, makeRng(42));
    const b = Array.from({ length: 5 }, makeRng(42));
    expect(a).toEqual(b);
  });

  it('differs across seeds', () => {
    expect(makeRng(1)()).not.toBe(makeRng(2)());
  });

  it('shuffle keeps every element and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input, makeRng(7));
    expect(out.sort()).toEqual([1, 2, 3, 4, 5]);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('countAvailable', () => {
  it('sums questions across chapters', () => {
    expect(countAvailable([CH('A', 3), CH('B', 4)])).toBe(7);
  });
  it('is 0 for no chapters', () => {
    expect(countAvailable([])).toBe(0);
  });
});

describe('buildPaper', () => {
  it('returns exactly the requested number when enough exist', () => {
    const p = buildPaper([CH('A', 10), CH('B', 10)], 12, 1);
    expect(p.questions).toHaveLength(12);
    expect(p.truncated).toBe(false);
  });

  it('never invents questions — caps at what is available and flags it', () => {
    const p = buildPaper([CH('A', 3)], 20, 1);
    expect(p.questions).toHaveLength(3);
    expect(p.available).toBe(3);
    expect(p.truncated).toBe(true);
  });

  it('spreads questions across chapters instead of draining one', () => {
    const p = buildPaper([CH('A', 20), CH('B', 20)], 10, 3);
    const fromA = p.questions.filter((q) => q.chapter === 'A').length;
    const fromB = p.questions.filter((q) => q.chapter === 'B').length;
    expect(Math.abs(fromA - fromB)).toBeLessThanOrEqual(1);
  });

  it('is reproducible: same seed → identical paper', () => {
    const a = buildPaper([CH('A', 8), CH('B', 8)], 6, 99);
    const b = buildPaper([CH('A', 8), CH('B', 8)], 6, 99);
    expect(a.questions.map((q) => q.q)).toEqual(b.questions.map((q) => q.q));
  });

  it('different seeds give a different order', () => {
    const a = buildPaper([CH('A', 12), CH('B', 12)], 8, 1);
    const b = buildPaper([CH('A', 12), CH('B', 12)], 8, 2);
    expect(a.questions.map((q) => q.q)).not.toEqual(b.questions.map((q) => q.q));
  });

  it('never repeats a question within a paper', () => {
    const p = buildPaper([CH('A', 10), CH('B', 10), CH('C', 10)], 30, 5);
    expect(new Set(p.questions.map((q) => q.q)).size).toBe(p.questions.length);
  });

  it('tags each question with its chapter and subject', () => {
    const p = buildPaper([CH('A', 4, 'Maths')], 2, 1);
    expect(p.questions[0].chapter).toBe('A');
    expect(p.questions[0].subject).toBe('Maths');
  });

  it('handles empty / zero-count input safely', () => {
    expect(buildPaper([], 10, 1).questions).toHaveLength(0);
    expect(buildPaper([CH('A', 5)], 0, 1).questions).toHaveLength(0);
    expect(buildPaper([CH('A', 5)], -3, 1).questions).toHaveLength(0);
  });

  it('skips chapters that have no questions', () => {
    const empty: SourceChapter = { slug: 'e', classLevel: '10', subject: 'Science', chapter: 'Empty', mcqs: [] };
    const p = buildPaper([empty, CH('A', 4)], 4, 1);
    expect(p.questions).toHaveLength(4);
    expect(p.questions.every((q) => q.chapter === 'A')).toBe(true);
  });
});

describe('answerKey', () => {
  it('maps correct indices to option letters, 1-based', () => {
    const p = buildPaper([CH('A', 4)], 4, 1);
    const key = answerKey(p);
    expect(key).toHaveLength(4);
    expect(key[0].n).toBe(1);
    expect(key.every((k) => /^[A-D]$/.test(k.answer))).toBe(true);
  });

  it('matches the questions it was built from', () => {
    const p = buildPaper([CH('A', 6)], 3, 2);
    const key = answerKey(p);
    key.forEach((k, i) => {
      expect(k.answer).toBe(String.fromCharCode(65 + p.questions[i].correct));
    });
  });
});
