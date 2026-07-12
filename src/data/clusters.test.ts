/**
 * clusters.test.ts — pin-to-pin integrity checks across EVERY content cluster.
 * Guards the data that powers the programmatic-SEO pages: non-empty arrays,
 * unique + URL-safe slugs, required fields populated, and per-type correctness
 * (MCQ answer indices in range, sample-paper marks numeric, coloring SVGs valid).
 */
import { describe, it, expect } from 'vitest';
import { CONCEPT_EXPLAINERS } from './conceptExplainers';
import { GLOSSARY } from './glossary';
import { DIFFERENCES } from './differences';
import { FULL_FORMS } from './fullForms';
import { REVISION_NOTES } from './revisionNotes';
import { SOLVED_SETS } from './solvedExamples';
import { LAB_PRACTICALS } from './labPracticals';
import { SAMPLE_PAPERS } from './samplePapers';
import { MCQ_CHAPTERS } from './chapterMcqs';
import { ENGLISH_WRITING } from './englishWriting';
import { LIT_CHAPTERS } from './englishLiterature';
import { VOCAB_SETS } from './englishVocab';
import { GK_TOPICS } from './staticGk';
import { MATHS_TABLES } from './mathsTables';
import { VISUAL_LESSONS } from './visualLessons';
import { TIMELINES } from './timelines';
import { WEIGHTAGE_SUBJECTS, EXAM_CALENDAR } from './whatToStudy';
import { PYQ_CHAPTERS } from './pyqs';
import { coloringPages } from './kids/coloring';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Shared integrity: non-empty array, unique URL-safe slugs, key fields filled. */
function checkCluster<T extends Record<string, unknown>>(
  name: string,
  arr: T[],
  slugKey: keyof T,
  requiredText: (keyof T)[],
) {
  describe(name, () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBeGreaterThan(0);
    });
    it('every item has a URL-safe slug', () => {
      arr.forEach((it) => {
        const slug = String(it[slugKey] ?? '');
        expect(slug, JSON.stringify(it).slice(0, 80)).toMatch(SLUG_RE);
      });
    });
    it('slugs are unique', () => {
      const slugs = arr.map((it) => String(it[slugKey]));
      expect(new Set(slugs).size).toBe(slugs.length);
    });
    it('required text fields are non-empty', () => {
      arr.forEach((it) => {
        requiredText.forEach((k) => {
          expect(String(it[k] ?? '').trim().length, `${name}.${String(k)} empty in ${String(it[slugKey])}`).toBeGreaterThan(0);
        });
      });
    });
  });
}

checkCluster('CONCEPT_EXPLAINERS', CONCEPT_EXPLAINERS as any, 'slug', ['title', 'subject', 'intro']);
checkCluster('GLOSSARY', GLOSSARY as any, 'slug', ['term', 'definition']);
checkCluster('DIFFERENCES', DIFFERENCES as any, 'slug', ['title', 'termA', 'termB']);
checkCluster('FULL_FORMS', FULL_FORMS as any, 'slug', ['term', 'fullForm', 'description']);
checkCluster('REVISION_NOTES', REVISION_NOTES as any, 'slug', ['chapter', 'subject', 'intro']);
checkCluster('SOLVED_SETS', SOLVED_SETS as any, 'slug', ['chapter', 'subject', 'intro']);
checkCluster('LAB_PRACTICALS', LAB_PRACTICALS as any, 'slug', ['title', 'aim']);
checkCluster('SAMPLE_PAPERS', SAMPLE_PAPERS as any, 'slug', ['title', 'subject']);
checkCluster('MCQ_CHAPTERS', MCQ_CHAPTERS as any, 'slug', ['chapter', 'subject']);
checkCluster('ENGLISH_WRITING', ENGLISH_WRITING as any, 'slug', ['title', 'category', 'sample']);
checkCluster('LIT_CHAPTERS', LIT_CHAPTERS as any, 'slug', ['chapter', 'summary']);
checkCluster('VOCAB_SETS', VOCAB_SETS as any, 'slug', ['title', 'category']);
checkCluster('GK_TOPICS', GK_TOPICS as any, 'slug', ['title', 'intro']);
checkCluster('MATHS_TABLES', MATHS_TABLES as any, 'slug', ['title']);
checkCluster('VISUAL_LESSONS', VISUAL_LESSONS as any, 'slug', ['title', 'subject', 'intro', 'whyItMatters']);
checkCluster('PYQ_CHAPTERS', PYQ_CHAPTERS as any, 'slug', ['chapter', 'subject', 'exam', 'intro']);

describe('PYQ_CHAPTERS structure', () => {
  it('every chapter has questions with text, a numeric marks and a solution', () => {
    PYQ_CHAPTERS.forEach((c) => {
      expect(c.questions.length, c.slug).toBeGreaterThan(0);
      c.questions.forEach((q) => {
        expect(q.q.trim().length, c.slug).toBeGreaterThan(0);
        expect(typeof q.marks).toBe('number');
        expect(q.marks).toBeGreaterThan(0);
        expect(q.answer.trim().length, `${c.slug} answer empty`).toBeGreaterThan(0);
      });
    });
  });
});
checkCluster('TIMELINES', TIMELINES as any, 'slug', ['title', 'subject', 'intro', 'whyItMatters']);

checkCluster('WEIGHTAGE_SUBJECTS', WEIGHTAGE_SUBJECTS as any, 'slug', ['subject', 'exam', 'intro']);

describe('WEIGHTAGE_SUBJECTS correctness', () => {
  it('unit marks sum to the stated total for each subject', () => {
    WEIGHTAGE_SUBJECTS.forEach((s) => {
      const sum = s.units.reduce((t, u) => t + u.marks, 0);
      expect(sum, `${s.slug}: units sum ${sum} ≠ total ${s.totalMarks}`).toBe(s.totalMarks);
    });
  });
  it('every unit has a non-empty tip and positive marks', () => {
    WEIGHTAGE_SUBJECTS.forEach((s) => s.units.forEach((u) => {
      expect(u.marks).toBeGreaterThan(0);
      expect(u.tip.trim().length).toBeGreaterThan(0);
    }));
  });
  it('exam calendar entries are complete', () => {
    expect(EXAM_CALENDAR.length).toBeGreaterThan(0);
    EXAM_CALENDAR.forEach((e) => {
      expect(e.exam.trim().length).toBeGreaterThan(0);
      expect(e.window.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('TIMELINES structure', () => {
  it('every timeline has events with year, title and detail', () => {
    TIMELINES.forEach((t) => {
      expect(t.events.length, t.slug).toBeGreaterThan(1);
      t.events.forEach((e) => {
        expect(e.year.trim().length, t.slug).toBeGreaterThan(0);
        expect(e.title.trim().length).toBeGreaterThan(0);
        expect(e.detail.trim().length).toBeGreaterThan(10);
      });
    });
  });
});

describe('VISUAL_LESSONS structure', () => {
  it('every lesson has steps, each with a caption and a valid <svg>', () => {
    VISUAL_LESSONS.forEach((l) => {
      expect(l.steps.length, l.slug).toBeGreaterThan(0);
      l.steps.forEach((s) => {
        expect(s.caption.trim().length, l.slug).toBeGreaterThan(0);
        expect(s.svg, l.slug).toMatch(/<svg[\s>]/);
      });
    });
  });
});

describe('MCQ_CHAPTERS correctness', () => {
  it('every chapter has questions, each with 4 options and an in-range answer', () => {
    MCQ_CHAPTERS.forEach((ch) => {
      expect(ch.mcqs.length, ch.slug).toBeGreaterThan(0);
      ch.mcqs.forEach((q) => {
        expect(q.options.length, `${ch.slug}: ${q.q}`).toBe(4);
        expect(Number.isInteger(q.correct)).toBe(true);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThanOrEqual(3);
        expect(q.q.trim().length).toBeGreaterThan(0);
      });
    });
  });
});

describe('SAMPLE_PAPERS correctness', () => {
  it('every paper has numeric totalMarks and at least one section', () => {
    SAMPLE_PAPERS.forEach((p) => {
      expect(typeof p.totalMarks, p.slug).toBe('number');
      expect(p.totalMarks).toBeGreaterThan(0);
      expect(p.sections.length).toBeGreaterThan(0);
    });
  });
});

describe('REVISION_NOTES structure', () => {
  it('every note has at least one section with points', () => {
    REVISION_NOTES.forEach((n) => {
      expect(n.sections.length, n.slug).toBeGreaterThan(0);
      n.sections.forEach((s) => expect(Array.isArray(s.points)).toBe(true));
    });
  });
});

describe('coloringPages SVGs', () => {
  it('have unique ids', () => {
    const ids = coloringPages.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('contain a valid <svg> with at least one fillable shape', () => {
    coloringPages.forEach((p) => {
      expect(p.svg, p.id).toMatch(/<svg[\s>]/);
      expect(/<(path|polygon|circle|rect|ellipse)\b/.test(p.svg), `${p.id} has no fillable shape`).toBe(true);
    });
  });
});
