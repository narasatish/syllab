import { describe, it, expect } from 'vitest';
import { STUDY_QUOTES, EXAM_COUNTDOWNS, STUDY_TIPS, BREAK_IDEAS } from './studyRoom';

describe('Study Room data integrity', () => {
  it('has a healthy pool of quotes, each with text + author', () => {
    expect(STUDY_QUOTES.length).toBeGreaterThanOrEqual(15);
    for (const q of STUDY_QUOTES) {
      expect(q.text.trim().length).toBeGreaterThan(0);
      expect(q.author.trim().length).toBeGreaterThan(0);
    }
  });

  it('has unique quote texts (no accidental duplicates)', () => {
    const texts = STUDY_QUOTES.map((q) => q.text);
    expect(new Set(texts).size).toBe(texts.length);
  });

  it('has non-empty study tips and break ideas', () => {
    expect(STUDY_TIPS.length).toBeGreaterThanOrEqual(10);
    expect(BREAK_IDEAS.length).toBeGreaterThanOrEqual(5);
    for (const t of [...STUDY_TIPS, ...BREAK_IDEAS]) expect(t.trim().length).toBeGreaterThan(0);
  });

  it('has exam countdowns with valid ISO dates and labels', () => {
    expect(EXAM_COUNTDOWNS.length).toBeGreaterThan(0);
    for (const ex of EXAM_COUNTDOWNS) {
      expect(ex.name.trim().length).toBeGreaterThan(0);
      expect(ex.emoji.trim().length).toBeGreaterThan(0);
      expect(ex.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(ex.date + 'T00:00:00').getTime())).toBe(false);
    }
  });
});
