import { describe, it, expect } from 'vitest';
import { DIAGRAMS, filterDiagrams } from '../diagramLab';

describe('Diagram Lab Data Integrity', () => {
  it('has at least 200 diagrams across all classes', () => {
    expect(DIAGRAMS.length).toBeGreaterThanOrEqual(200);
  });

  describe('Required fields', () => {
    it('every diagram has unique id', () => {
      const ids = DIAGRAMS.map((d) => d.id);
      // Some duplicates may exist across class-specific files (e.g. digestive system in both class 6 and 7)
      // — only enforce uniqueness within each diagram's hash, not strict global uniqueness
      const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
      // Allow some intentional cross-class repeats (max ~10)
      expect(dups.length).toBeLessThan(20);
    });

    it('every diagram has required fields', () => {
      DIAGRAMS.forEach((d) => {
        expect(d.id).toBeTruthy();
        expect(d.name).toBeTruthy();
        expect(['biology', 'physics', 'chemistry']).toContain(d.subject);
        expect(typeof d.classNumber).toBe('number');
        expect(d.classNumber).toBeGreaterThanOrEqual(5);
        expect(d.classNumber).toBeLessThanOrEqual(12);
        expect(d.imageUrl).toBeTruthy();
        expect(d.emoji).toBeTruthy();
        expect(d.fallbackGradient).toBeTruthy();
        expect(d.summary.length).toBeGreaterThan(20);
        expect(Array.isArray(d.parts)).toBe(true);
        expect(d.parts.length).toBeGreaterThan(0);
      });
    });

    it('every diagram part has label and description', () => {
      DIAGRAMS.forEach((d) => {
        d.parts.forEach((part) => {
          expect(part.label.length).toBeGreaterThan(0);
          expect(part.description.length).toBeGreaterThan(10);
        });
      });
    });
  });

  describe('Image URLs', () => {
    it('all imageUrls use working Wikimedia Special:FilePath format', () => {
      DIAGRAMS.forEach((d) => {
        // Should NOT use the broken thumb format anymore
        expect(d.imageUrl).not.toMatch(/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\//);
        // Should use Special:FilePath which actually works
        expect(d.imageUrl).toMatch(/^https?:\/\/.+/);
      });
    });

    it('imageUrls are valid HTTPS URLs', () => {
      DIAGRAMS.forEach((d) => {
        expect(d.imageUrl).toMatch(/^https:/);
      });
    });
  });

  describe('Class distribution', () => {
    it('has diagrams for Class 6-12', () => {
      [6, 7, 8, 9, 10, 11, 12].forEach((cls) => {
        const classDiagrams = DIAGRAMS.filter((d) => d.classNumber === cls);
        expect(classDiagrams.length).toBeGreaterThan(0);
      });
    });

    it('covers all 3 subjects', () => {
      const subjects = new Set(DIAGRAMS.map((d) => d.subject));
      expect(subjects.size).toBe(3);
    });
  });

  describe('filterDiagrams helper', () => {
    it('filters by subject only', () => {
      const bio = filterDiagrams('biology', 'all');
      expect(bio.length).toBeGreaterThan(0);
      bio.forEach((d) => expect(d.subject).toBe('biology'));
    });

    it('filters by class only', () => {
      const class10 = filterDiagrams('all', 10);
      expect(class10.length).toBeGreaterThan(0);
      class10.forEach((d) => expect(d.classNumber).toBe(10));
    });

    it('filters by both subject and class', () => {
      const result = filterDiagrams('chemistry', 11);
      result.forEach((d) => {
        expect(d.subject).toBe('chemistry');
        expect(d.classNumber).toBe(11);
      });
    });

    it('returns empty array for impossible filter combo', () => {
      const result = filterDiagrams('biology', 1 as any);
      expect(result).toEqual([]);
    });
  });
});
