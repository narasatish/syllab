import { describe, it, expect } from 'vitest';
import { HERO_QUIZ_SAMPLES } from './heroQuizSamples';
import { MCQ_CHAPTERS } from './chapterMcqs';

/**
 * The homepage showcase deliberately does NOT import the 677 KB MCQ bank, so
 * its five questions live in a small generated copy. That copy could drift, or
 * someone could hand-write a plausible-looking question into it.
 *
 * These tests close that hole: every sample must still exist, character for
 * character, in the real bank — same question, same four options in the same
 * order, same correct index. Editing a question in chapterMcqs.ts without
 * re-generating breaks the build rather than leaving the shop window showing
 * something that is no longer true.
 */

describe('hero quiz samples are real', () => {
  const bank = MCQ_CHAPTERS.flatMap((c) =>
    c.mcqs.map((q) => ({ q, classLevel: String(c.classLevel), subject: c.subject, chapter: c.chapter })),
  );

  it('there are samples to show', () => {
    expect(HERO_QUIZ_SAMPLES.length).toBeGreaterThanOrEqual(3);
  });

  it('every sample matches a bank question VERBATIM', () => {
    for (const s of HERO_QUIZ_SAMPLES) {
      const hit = bank.find((b) => b.q.q === s.q);
      expect(hit, `not in the bank at all: "${s.q}"`).toBeTruthy();
      if (!hit) continue;
      expect(hit.q.options, `options drifted for: "${s.q}"`).toEqual(s.options);
      expect(hit.q.correct, `correct index drifted for: "${s.q}"`).toBe(s.correct);
    }
  });

  it('the attribution (class / subject / chapter) matches the bank too', () => {
    for (const s of HERO_QUIZ_SAMPLES) {
      const hit = bank.find((b) => b.q.q === s.q);
      if (!hit) continue;
      expect(hit.classLevel, `class drifted for: "${s.q}"`).toBe(s.classLevel);
      expect(hit.subject, `subject drifted for: "${s.q}"`).toBe(s.subject);
      expect(hit.chapter, `chapter drifted for: "${s.q}"`).toBe(s.chapter);
    }
  });

  it('each sample is well-formed: 4 distinct options, valid correct index', () => {
    for (const s of HERO_QUIZ_SAMPLES) {
      expect(s.options, s.q).toHaveLength(4);
      expect(new Set(s.options.map((o) => o.trim().toLowerCase())).size, `duplicate options: ${s.q}`).toBe(4);
      expect(Number.isInteger(s.correct) && s.correct >= 0 && s.correct <= 3, `bad index: ${s.q}`).toBe(true);
      expect(s.options[s.correct].trim().length, `empty correct option: ${s.q}`).toBeGreaterThan(0);
    }
  });

  it('no duplicate questions in the showcase', () => {
    const qs = HERO_QUIZ_SAMPLES.map((s) => s.q);
    expect(new Set(qs).size).toBe(qs.length);
  });

  it('stays small — this ships on the homepage critical path', () => {
    // A guard against someone pasting the whole bank in here.
    expect(HERO_QUIZ_SAMPLES.length).toBeLessThanOrEqual(12);
    const bytes = JSON.stringify(HERO_QUIZ_SAMPLES).length;
    expect(bytes, `showcase payload is ${bytes} bytes`).toBeLessThan(4000);
  });

  it('spans more than one subject, so the showcase is not all one topic', () => {
    expect(new Set(HERO_QUIZ_SAMPLES.map((s) => s.subject)).size).toBeGreaterThanOrEqual(3);
  });
});
