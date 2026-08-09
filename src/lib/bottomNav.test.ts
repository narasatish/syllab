import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { BOTTOM_NAV, activeIndexForTab, activeIndexForPath, normalisePath } from './bottomNav';

describe('BOTTOM_NAV shape', () => {
  it('has at most five items so touch targets stay usable on a 360px screen', () => {
    expect(BOTTOM_NAV.length).toBeGreaterThan(0);
    expect(BOTTOM_NAV.length).toBeLessThanOrEqual(5);
  });

  it('tabs and paths are unique', () => {
    expect(new Set(BOTTOM_NAV.map((i) => i.tab)).size).toBe(BOTTOM_NAV.length);
    expect(new Set(BOTTOM_NAV.map((i) => i.path)).size).toBe(BOTTOM_NAV.length);
  });

  it('every item has a label and an absolute path', () => {
    for (const i of BOTTOM_NAV) {
      expect(i.label.trim().length, `${i.tab}: no label`).toBeGreaterThan(0);
      expect(i.path.startsWith('/'), `${i.tab}: path must be absolute`).toBe(true);
      expect(i.label.length, `${i.tab}: label too long for a phone tab`).toBeLessThanOrEqual(10);
    }
  });
});

/**
 * The important one. Canonical URLs and the sitemap are generated from
 * App.tsx's TAB_TO_PATH; if this nav disagrees, we ship links that contradict
 * our own canonicals. Parsed from source rather than imported, because
 * importing App.tsx would drag the whole component tree into the test.
 */
describe('paths agree with App.tsx TAB_TO_PATH', () => {
  const src = readFileSync('src/App.tsx', 'utf8');
  const start = src.indexOf('const TAB_TO_PATH: Record<string, string> = {');
  const body = src.slice(start, src.indexOf('};', start));

  const map = new Map<string, string>();
  for (const m of body.matchAll(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*'([^']*)'/gm)) {
    map.set(m[1], m[2]);
  }

  it('parsed the map (guards against this test silently passing on nothing)', () => {
    expect(map.size).toBeGreaterThan(5);
    expect(map.get('home')).toBe('/');
  });

  it('every bottom-nav tab exists in TAB_TO_PATH', () => {
    for (const i of BOTTOM_NAV) {
      expect(map.has(i.tab), `TAB_TO_PATH has no entry for "${i.tab}"`).toBe(true);
    }
  });

  it('every bottom-nav path matches TAB_TO_PATH exactly', () => {
    for (const i of BOTTOM_NAV) {
      expect(map.get(i.tab), `path mismatch for "${i.tab}" — canonicals would disagree`).toBe(i.path);
    }
  });
});

describe('activeIndexForTab', () => {
  it('finds each item by its tab', () => {
    BOTTOM_NAV.forEach((item, idx) => {
      expect(activeIndexForTab(item.tab)).toBe(idx);
    });
  });

  it('returns -1 for a page the bar does not cover', () => {
    expect(activeIndexForTab('blog')).toBe(-1);
    expect(activeIndexForTab('colleges')).toBe(-1);
    expect(activeIndexForTab('')).toBe(-1);
  });
});

describe('activeIndexForPath', () => {
  it('matches each canonical path', () => {
    BOTTOM_NAV.forEach((item, idx) => {
      expect(activeIndexForPath(item.path)).toBe(idx);
    });
  });

  it('does NOT prefix-match — "/" must not win on every page', () => {
    expect(activeIndexForPath('/ncert-solutions')).toBe(-1);
    expect(activeIndexForPath('/blog/some-post')).toBe(-1);
    expect(activeIndexForPath('/syllabus/class-10')).toBe(-1);
  });

  it('tolerates a trailing slash', () => {
    expect(activeIndexForPath('/syllabus/')).toBe(activeIndexForPath('/syllabus'));
  });

  it('ignores query strings and hashes', () => {
    expect(activeIndexForPath('/practice?class=10')).toBe(activeIndexForPath('/practice'));
    expect(activeIndexForPath('/practice#top')).toBe(activeIndexForPath('/practice'));
  });
});

describe('normalisePath', () => {
  it.each([
    ['/', '/'],
    ['', '/'],
    ['/syllabus', '/syllabus'],
    ['/syllabus/', '/syllabus'],
    ['/tools?a=1', '/tools'],
    ['/tools#x', '/tools'],
    ['/tools/?a=1', '/tools'],
  ])('%s -> %s', (input, expected) => {
    expect(normalisePath(input)).toBe(expected);
  });

  it('never strips a lone slash into an empty string', () => {
    expect(normalisePath('/')).toBe('/');
  });
});
