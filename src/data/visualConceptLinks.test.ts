import { describe, it, expect } from 'vitest';
import { VISUAL_TO_CONCEPT, CONCEPT_TO_VISUAL } from './visualConceptLinks';
import { VISUAL_LESSONS } from './visualLessons';
import { CONCEPT_EXPLAINERS } from './conceptExplainers';

const lessonSlugs = new Set(VISUAL_LESSONS.map((l) => l.slug));
const conceptSlugs = new Set(CONCEPT_EXPLAINERS.map((c) => c.slug));

describe('visualConceptLinks integrity', () => {
  it('every VISUAL_TO_CONCEPT key is a real visual-lesson slug', () => {
    for (const vslug of Object.keys(VISUAL_TO_CONCEPT)) {
      expect(lessonSlugs.has(vslug), `visual lesson slug "${vslug}" not found in VISUAL_LESSONS`).toBe(true);
    }
  });

  it('every VISUAL_TO_CONCEPT value is a real concept slug (no broken cross-link)', () => {
    for (const [vslug, cslug] of Object.entries(VISUAL_TO_CONCEPT)) {
      expect(conceptSlugs.has(cslug), `concept slug "${cslug}" (from lesson "${vslug}") not found in CONCEPT_EXPLAINERS`).toBe(true);
    }
  });

  it('CONCEPT_TO_VISUAL is the exact inverse of VISUAL_TO_CONCEPT', () => {
    const entries = Object.entries(VISUAL_TO_CONCEPT);
    // Same size (no collisions where two lessons map to the same concept).
    expect(Object.keys(CONCEPT_TO_VISUAL).length).toBe(entries.length);
    for (const [vslug, cslug] of entries) {
      expect(CONCEPT_TO_VISUAL[cslug]).toBe(vslug);
    }
  });

  it('has no duplicate concept targets (a concept maps back to exactly one lesson)', () => {
    const targets = Object.values(VISUAL_TO_CONCEPT);
    expect(new Set(targets).size).toBe(targets.length);
  });
});
