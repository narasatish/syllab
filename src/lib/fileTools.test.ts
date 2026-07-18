import { describe, it, expect } from 'vitest';
import { parsePageRanges, fitWithin, formatBytes, centeredCrop } from './fileTools';

describe('parsePageRanges', () => {
  it('parses a mixed spec "1-3,5,8-" against a 10-page doc', () => {
    expect(parsePageRanges('1-3,5,8-', 10)).toEqual([1, 2, 3, 5, 8, 9, 10]);
  });
  it('supports open-ended low range "-3"', () => {
    expect(parsePageRanges('-3', 10)).toEqual([1, 2, 3]);
  });
  it('de-duplicates and sorts overlapping ranges', () => {
    expect(parsePageRanges('5,1-3,2-4', 10)).toEqual([1, 2, 3, 4, 5]);
  });
  it('clamps to the document length', () => {
    expect(parsePageRanges('8-99', 10)).toEqual([8, 9, 10]);
  });
  it('normalises reversed ranges', () => {
    expect(parsePageRanges('5-2', 10)).toEqual([2, 3, 4, 5]);
  });
  it('ignores junk tokens without breaking the rest', () => {
    expect(parsePageRanges('1, abc, 3', 10)).toEqual([1, 3]);
  });
  it('returns empty for empty spec or bad total', () => {
    expect(parsePageRanges('', 10)).toEqual([]);
    expect(parsePageRanges('1-3', 0)).toEqual([]);
  });
});

describe('fitWithin', () => {
  it('scales down to fit the box, preserving aspect', () => {
    expect(fitWithin(4000, 3000, 1000, 1000)).toEqual({ width: 1000, height: 750 });
  });
  it('never upscales a small image', () => {
    expect(fitWithin(200, 100, 1000, 1000)).toEqual({ width: 200, height: 100 });
  });
  it('constrains by the tighter dimension', () => {
    expect(fitWithin(1000, 2000, 500, 500)).toEqual({ width: 250, height: 500 });
  });
  it('guards zero input', () => {
    expect(fitWithin(0, 100, 100, 100)).toEqual({ width: 0, height: 0 });
  });
});

describe('formatBytes', () => {
  it('formats across units', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5 MB');
  });
});

describe('centeredCrop', () => {
  it('trims the sides of a wide image to a square', () => {
    expect(centeredCrop(1000, 500, 1, 1)).toEqual({ x: 250, y: 0, w: 500, h: 500 });
  });
  it('trims the top/bottom of a tall image to 16:9', () => {
    // 1000x1000 → 16:9 → h = 1000/(16/9)=562.5→563
    const c = centeredCrop(1000, 1000, 16, 9);
    expect(c.w).toBe(1000);
    expect(c.h).toBe(563);
    expect(c.x).toBe(0);
  });
});
