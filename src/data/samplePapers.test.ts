import { describe, it, expect } from 'vitest';
import { SAMPLE_PAPERS } from './samplePapers';

/**
 * Content-integrity guard for the sample papers.
 *
 * These shipped for months with Section A saying "Read the passage and answer
 * all 10 questions" above no passage at all — 59 questions across 10 papers were
 * literally unanswerable, on the site's best-converting section. The markup was
 * valid the whole time, so nothing caught it. These tests assert the thing that
 * actually matters: a student can answer every question from what is on the page.
 */

/** Instructions that promise the student some text to read. */
const PROMISES_TEXT = /read the (passage|extract|poem|text)|based on the (passage|extract)/i;
/** References to material a paper cannot show (no figure/table support exists). */
const DANGLING = /\bthe (diagram|figure|graph|circuit)\b|\bgiven (figure|diagram)\b|shown (above|below)|prescribed text/i;

describe('sample papers — every question must be answerable', () => {
  it('a section that says "read the passage" actually has one', () => {
    const broken = SAMPLE_PAPERS.flatMap((p) =>
      p.sections
        .filter((s) => (PROMISES_TEXT.test(s.instructions) || PROMISES_TEXT.test(s.name)) && !s.passage?.trim())
        .map((s) => `${p.slug} → ${s.name}`),
    );
    expect(broken).toEqual([]);
  });

  it('no QUESTION mentions a passage its section does not supply', () => {
    // The first version of this guard only checked section instructions, and
    // missed 4 sections whose questions referenced a passage while the
    // instructions did not use the words "read the passage".
    const REFERS = /the (passage|extract)|given (passage|extract)/i;
    const orphans = SAMPLE_PAPERS.flatMap((p) =>
      p.sections.flatMap((s) =>
        s.passage ? [] : s.questions.filter((q) => REFERS.test(q.q)).map((q) => `${p.slug}: ${q.q.slice(0, 55)}`),
      ),
    );
    expect(orphans).toEqual([]);
  });

  it('no question references a figure, table or unnamed prescribed text', () => {
    const dangling = SAMPLE_PAPERS.flatMap((p) =>
      p.sections.flatMap((s) =>
        s.questions.filter((q) => DANGLING.test(q.q)).map((q) => `${p.slug}: ${q.q.slice(0, 60)}`),
      ),
    );
    expect(dangling).toEqual([]);
  });

  it('a supplied passage is substantial enough to answer questions from', () => {
    for (const p of SAMPLE_PAPERS) {
      for (const s of p.sections) {
        if (!s.passage) continue;
        // 60 words, not 80: Hindi gadyansh are far more compact than English
        // prose for the same content.
        expect(s.passage.trim().split(/\s+/).length, `${p.slug} → ${s.name}`).toBeGreaterThan(60);
      }
    }
  });

  it('every question has non-empty text, positive marks and a real answer', () => {
    for (const p of SAMPLE_PAPERS) {
      for (const s of p.sections) {
        for (const q of s.questions) {
          expect(q.q.trim().length, `${p.slug}: empty question`).toBeGreaterThan(8);
          expect(q.marks, `${p.slug}: "${q.q.slice(0, 40)}" marks`).toBeGreaterThan(0);
          // A one-character answer is legitimate here — "7" for the pH of a
          // neutral solution, "4" for a radius. Only emptiness is a defect.
          expect(q.answer.trim().length, `${p.slug}: "${q.q.slice(0, 40)}" answer`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('section marks add up to the paper total', () => {
    for (const p of SAMPLE_PAPERS) {
      const sum = p.sections.reduce((n, s) => n + s.marks, 0);
      expect(sum, `${p.slug}: sections sum to ${sum}, paper says ${p.totalMarks}`).toBe(Number(p.totalMarks));
    }
  });

  it('question marks add up to the section total', () => {
    // 105 sections used to claim more marks than their questions carried, and 46
    // told the student to "answer all 10 questions" above 5 — the papers are
    // shortened practice sets and now say so instead of posing as full mocks.
    const off = SAMPLE_PAPERS.flatMap((p) =>
      p.sections
        .filter((s) => s.questions.reduce((n, q) => n + q.marks, 0) !== s.marks)
        .map((s) => `${p.slug} → ${s.name}`),
    );
    expect(off).toEqual([]);
  });

  it('instructions never claim more questions than the section contains', () => {
    const lying = SAMPLE_PAPERS.flatMap((p) =>
      p.sections.flatMap((s) => {
        const m = /all (\d+) questions?/i.exec(s.instructions);
        return m && Number(m[1]) !== s.questions.length
          ? [`${p.slug} → ${s.name}: says ${m[1]}, has ${s.questions.length}`]
          : [];
      }),
    );
    expect(lying).toEqual([]);
  });

  it('slugs are unique', () => {
    const slugs = SAMPLE_PAPERS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
