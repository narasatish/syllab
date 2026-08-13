import { describe, it, expect } from 'vitest';
import { MCQ_CHAPTERS } from './chapterMcqs';
import { PYQ_CHAPTERS } from './pyqs';
import { REVISION_NOTES } from './revisionNotes';

/**
 * Cross-bank content-integrity guard.
 *
 * Written after an audit of all 22 content banks (2,641 items) that followed a
 * user report: /sample-papers/class-7-english said "read the passage" and had no
 * passage, so every question in it was unanswerable. The markup was valid, the
 * SEO audit passed, and Google saw a healthy page — nothing caught it.
 *
 * These assert the properties a student actually depends on. They deliberately
 * do NOT try to verify arithmetic: an attempt at that flagged 667 "errors" which
 * were, on inspection, all parser artifacts (chained equations, comma-grouped
 * thousands, mixed numbers like "15/8 = 1 7/8", ratios, percentages). Zero real
 * arithmetic errors were found in 313 checkable statements. Factual accuracy
 * needs human or model review, not a regex.
 */

/** Text promising material the page has no field to render. */
// NB: "circuit" is deliberately absent. Physics questions routinely say "apply
// KVL to the circuit: EMF 10 V, r = 1 Ω, R = 9 Ω" — the circuit is fully
// described in words, so the question is self-contained.
const DANGLING = /\bthe (passage|diagram|figure|graph|extract)\b|\bgiven (figure|diagram|passage)\b|shown (above|below)/i;
/** A stub left in published content. "placeholder" alone is excluded — it is a real maths word. */
const STUB = /lorem ipsum|\bTODO\b|\bFIXME\b|\bTBD\b|\[insert\b/i;

describe('MCQ bank', () => {
  const all = MCQ_CHAPTERS.flatMap((c) => c.mcqs.map((q) => ({ c, q })));

  it('has questions', () => expect(all.length).toBeGreaterThan(500));

  it('every question has exactly 4 distinct options and a valid answer index', () => {
    for (const { c, q } of all) {
      const where = `${c.slug}: ${q.q.slice(0, 45)}`;
      expect(q.options, where).toHaveLength(4);
      expect(new Set(q.options.map((o) => o.trim().toLowerCase())).size, `${where} (duplicate options)`).toBe(4);
      expect(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3, `${where} correct=${q.correct}`).toBe(true);
      expect(q.options[q.correct]?.trim().length, `${where} (correct option is empty)`).toBeGreaterThan(0);
    }
  });

  it('every question has a real explanation', () => {
    const thin = all.filter(({ q }) => (q.explanation ?? '').trim().length < 15).map(({ q }) => q.q.slice(0, 45));
    expect(thin).toEqual([]);
  });

  it('no question references a figure or passage that cannot be shown', () => {
    const bad = all.filter(({ q }) => DANGLING.test(q.q)).map(({ q }) => q.q.slice(0, 55));
    expect(bad).toEqual([]);
  });

  it('correct answers are spread across A-D, not concentrated on one letter', () => {
    // Was A13/B54/C28/D4 — answering "B" to everything scored ~54%.
    const dist = [0, 0, 0, 0];
    for (const { q } of all) dist[q.correct]++;
    for (const [i, n] of dist.entries()) {
      const pct = (n / all.length) * 100;
      expect(pct, `option ${'ABCD'[i]} is ${pct.toFixed(0)}% of answers`).toBeGreaterThan(15);
      expect(pct, `option ${'ABCD'[i]} is ${pct.toFixed(0)}% of answers`).toBeLessThan(35);
    }
  });

  it('no study-advice filler masquerading as a subject question', () => {
    // When the model ran short for a chapter it padded with "What should you do
    // when a question contains unfamiliar data?" — and the backend cache served
    // that padding back on every re-run. Not subject knowledge; not allowed.
    const FILLER = /what should you do when a question|what is the best way to revise|best way to prepare for|how should you (revise|approach|study)|which study habit/i;
    const padding = all.filter(({ q }) => FILLER.test(q.q)).map(({ q }) => q.q.slice(0, 60));
    expect(padding).toEqual([]);
  });

  /**
   * Explanations must be an ANSWER, not the model's scratchpad.
   *
   * A verification sweep found 8 explanations containing leaked chain-of-thought
   * — "Wait, let me recalculate", "Hmm, this doesn't match", "I'll mark option 0
   * as the closest intended answer" — one of them 1,606 characters long. Worse,
   * the leak was a reliable tell: in 6 of the 8 the working was RIGHT and the
   * stored key was WRONG, because the generator second-guessed itself into the
   * wrong option. Three more had no correct option at all.
   *
   * So this guard is not cosmetic. Text like this in an explanation means the
   * question itself is probably broken.
   */
  it('explanations contain no leaked model reasoning', () => {
    const LEAK = /wait,|let me (recalculate|recompute|recheck|verify)|i'll mark|assuming (a )?typo|none of the options|but the option says|hmm,|this doesn't match|as an ai/i;
    const leaked = all
      .filter(({ q }) => LEAK.test(q.explanation ?? ''))
      .map(({ q }) => `${q.q.slice(0, 50)} — "${(q.explanation ?? '').match(LEAK)?.[0]}"`);
    expect(leaked).toEqual([]);
  });

  it('explanations stay a readable length', () => {
    // The leaked-reasoning ones ran to 1,606 chars. A genuine explanation for a
    // school MCQ does not need 600.
    const bloated = all
      .filter(({ q }) => (q.explanation ?? '').length > 600)
      .map(({ q }) => `${q.q.slice(0, 45)} (${(q.explanation ?? '').length} chars)`);
    expect(bloated).toEqual([]);
  });

  /*
   * DELIBERATELY NOT TESTED: options that are the same value written two ways.
   *
   * One real instance existed — "2000 sqrt(3) + 2000 m" and "2000 + 2000
   * sqrt(3) m" on the same question, giving it two correct answers. It has been
   * removed by hand.
   *
   * Two attempts at a guard were written and both deleted, because a
   * sorted-character fingerprint cannot tell equivalence from difference:
   *
   *   prose  "importing more than exporting" vs "exporting more than importing"
   *          — anagrams, opposite meanings, and both are good distractors.
   *   maths  "x^2 + x - 6 = 0" vs "x^2 - x + 6 = 0"  — differ only in sign.
   *          "sqrt(3)/2" vs "2/sqrt(3)"              — differ only in order.
   *
   * Nine false positives, zero true positives. Doing this properly needs
   * symbolic evaluation of each option, not string comparison. A test that
   * cries wolf is worse than no test — it teaches people to skip the output.
   * The same conclusion was reached earlier about an arithmetic checker that
   * produced 667 false positives. Do not re-add a string-based version.
   */

  it('chapter slugs are unique', () => {
    const s = MCQ_CHAPTERS.map((c) => c.slug);
    expect(new Set(s).size).toBe(s.length);
  });
});

describe('previous-year questions', () => {
  const all = PYQ_CHAPTERS.flatMap((c) => (c.questions ?? []).map((q) => ({ c, q })));

  it('every question carries a year, marks and a substantial answer', () => {
    for (const { c, q } of all) {
      const where = `${c.slug}: ${String(q.q).slice(0, 40)}`;
      expect(q.year, `${where} (no year)`).toBeTruthy();
      expect(Number(q.marks), `${where} (no marks)`).toBeGreaterThan(0);
      expect(String(q.answer ?? '').trim().length, `${where} (thin answer)`).toBeGreaterThan(25);
    }
  });

  it('no question references a figure that cannot be shown', () => {
    const bad = all.filter(({ q }) => DANGLING.test(String(q.q))).map(({ q }) => String(q.q).slice(0, 55));
    expect(bad).toEqual([]);
  });

  /**
   * Same guard as the MCQ bank, for the same reason. Four PYQ/solved-example
   * answers shipped the model's scratchpad — "Wait, let me recalculate", "This
   * is wrong... Error in given data or my interpretation. Assuming |m| = 3".
   *
   * These are worked solutions, so the damage is worse than a wrong MCQ key: a
   * student reads them to learn the METHOD. Two of the four were also
   * unanswerable questions (contradictory data, no integer solution), which the
   * model said out loud before guessing.
   */
  it('answers contain no leaked model reasoning', () => {
    const LEAK = /wait,|let me (recalculate|recompute|recheck|verify|reconsider)|hmm,|which contradicts|error in given data|assuming it's solvable|doesn't yield/i;
    const leaked = all
      .filter(({ q }) => LEAK.test(String(q.answer ?? '')))
      .map(({ q }) => `${String(q.q).slice(0, 48)} — "${String(q.answer).match(LEAK)?.[0]}"`);
    expect(leaked).toEqual([]);
  });
});

describe('revision notes', () => {
  it('every note has sections, key terms and FAQs', () => {
    for (const r of REVISION_NOTES) {
      expect(r.sections?.length, `${r.slug}: no sections`).toBeGreaterThan(0);
      expect(r.keyTerms?.length, `${r.slug}: no key terms`).toBeGreaterThan(0);
      expect(r.faqs?.length, `${r.slug}: no FAQs`).toBeGreaterThan(0);
    }
  });

  it('slugs are unique', () => {
    const s = REVISION_NOTES.map((r) => r.slug);
    expect(new Set(s).size).toBe(s.length);
  });
});

describe('no published stub content', () => {
  it('no bank contains a TODO/lorem/TBD left behind', () => {
    const banks: [string, unknown][] = [
      ['chapterMcqs', MCQ_CHAPTERS],
      ['pyqs', PYQ_CHAPTERS],
      ['revisionNotes', REVISION_NOTES],
    ];
    for (const [name, data] of banks) {
      const hit = JSON.stringify(data).match(STUB);
      expect(hit ? `${name}: ${hit[0]}` : null).toBeNull();
    }
  });
});
