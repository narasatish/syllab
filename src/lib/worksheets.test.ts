import { describe, it, expect } from 'vitest';
import { buildCatalog, type WorksheetCategory } from './worksheets';

const ALL_CATEGORIES: WorksheetCategory[] = [
  'Letters', 'Phonics', 'Vocabulary', 'Reading', 'Writing',
  'Numbers & Counting', 'Simple Math', 'Shapes', 'Colors',
  'Science', 'Social & Emotional', 'Other Activities',
];

describe('worksheet catalog', () => {
  const catalog = buildCatalog();

  it('produces a large library', () => {
    expect(catalog.length).toBeGreaterThan(90);
  });

  it('covers every one of the 12 taxonomy categories', () => {
    const present = new Set(catalog.map((w) => w.category));
    for (const c of ALL_CATEGORIES) {
      expect(present.has(c), `missing category: ${c}`).toBe(true);
    }
  });

  it('has unique ids', () => {
    const ids = catalog.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every worksheet renders valid watermarked A4 SVG', () => {
    for (const w of catalog) {
      expect(w.title.trim().length, w.id).toBeGreaterThan(0);
      expect(w.emoji.trim().length, w.id).toBeGreaterThan(0);
      const svg = w.svg();
      expect(svg.startsWith('<svg'), `${w.id} should start with <svg`).toBe(true);
      expect(svg.trimEnd().endsWith('</svg>'), `${w.id} should end with </svg>`).toBe(true);
      expect(svg.includes('viewBox="0 0 595 842"'), `${w.id} should be A4`).toBe(true);
      expect(svg.includes('syllab.in'), `${w.id} should carry the watermark`).toBe(true);
    }
  });
});
