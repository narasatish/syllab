import { describe, it, expect } from 'vitest';
import { MOCK_EXAMS } from './mockExams';
import { EXAM_LIST, EXAM_CATEGORIES } from '../../scripts/exam-slugs.mjs';

describe('MOCK_EXAMS data integrity', () => {
  it('has unique slugs', () => {
    const slugs = MOCK_EXAMS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every exam has all required fields populated', () => {
    for (const e of MOCK_EXAMS) {
      expect(e.slug, `slug missing`).toBeTruthy();
      expect(e.name, `name missing for ${e.slug}`).toBeTruthy();
      expect(e.fullName, `fullName missing for ${e.slug}`).toBeTruthy();
      expect(e.about.length, `about too short for ${e.slug}`).toBeGreaterThan(40);
      expect(e.pattern.questions, `questions invalid for ${e.slug}`).toBeGreaterThan(0);
      expect(e.pattern.durationMin, `duration invalid for ${e.slug}`).toBeGreaterThan(0);
      expect(e.pattern.marking, `marking missing for ${e.slug}`).toBeTruthy();
      expect(e.pattern.sections.length, `no sections for ${e.slug}`).toBeGreaterThan(0);
      expect(e.subjects.length, `no subjects for ${e.slug}`).toBeGreaterThan(0);
      expect(e.tips.length, `no tips for ${e.slug}`).toBeGreaterThan(0);
      expect(e.faqs.length, `no faqs for ${e.slug}`).toBeGreaterThan(0);
      for (const f of e.faqs) { expect(f.q).toBeTruthy(); expect(f.a).toBeTruthy(); }
    }
  });

  it('slugs are consistent between mockExams.ts and exam-slugs.mjs (both directions)', () => {
    const dataSlugs = new Set(MOCK_EXAMS.map((e) => e.slug));
    const listSlugs = new Set(EXAM_LIST.map((e) => e.slug));
    for (const s of listSlugs) expect(dataSlugs.has(s), `exam-slugs "${s}" has no MOCK_EXAMS record`).toBe(true);
    for (const s of dataSlugs) expect(listSlugs.has(s), `MOCK_EXAMS "${s}" missing from exam-slugs`).toBe(true);
  });

  it('every EXAM_LIST category is declared in EXAM_CATEGORIES', () => {
    for (const e of EXAM_LIST) {
      expect(EXAM_CATEGORIES.includes(e.category), `category "${e.category}" (${e.slug}) not in EXAM_CATEGORIES`).toBe(true);
    }
  });
});
