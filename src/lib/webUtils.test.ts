import { describe, it, expect } from 'vitest';
import {
  toRoman, fromRoman, hexToRgb, contrastRatio, wcagLevels,
  parseEpoch, dateToEpoch, csvToJson, parseCsv,
} from './webUtils';

describe('Roman numerals', () => {
  it('converts numbers to Roman', () => {
    expect(toRoman(1)).toBe('I');
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(1994)).toBe('MCMXCIV');
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });
  it('round-trips number → Roman → number', () => {
    for (const n of [1, 9, 40, 444, 1000, 2024, 3888]) {
      expect(fromRoman(toRoman(n)!)).toBe(n);
    }
  });
  it('rejects out-of-range numbers', () => {
    expect(toRoman(0)).toBeNull();
    expect(toRoman(4000)).toBeNull();
    expect(toRoman(3.5)).toBeNull();
  });
  it('rejects illegal Roman strings', () => {
    expect(fromRoman('IIII')).toBeNull();  // should be IV
    expect(fromRoman('IC')).toBeNull();    // illegal subtractive
    expect(fromRoman('VX')).toBeNull();
    expect(fromRoman('ABC')).toBeNull();   // non-roman letters
    expect(fromRoman('')).toBeNull();
  });
  it('accepts lowercase and trims', () => {
    expect(fromRoman(' xiv ')).toBe(14);
  });
});

describe('WCAG contrast', () => {
  it('parses hex colours (3 and 6 digit)', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
  });
  it('black on white is 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });
  it('same colour is 1:1', () => {
    expect(contrastRatio('#777777', '#777777')).toBeCloseTo(1, 5);
  });
  it('classifies pass/fail levels', () => {
    expect(wcagLevels(21)).toEqual({ aaNormal: true, aaLarge: true, aaa: true });
    expect(wcagLevels(4.5)).toEqual({ aaNormal: true, aaLarge: true, aaa: false });
    expect(wcagLevels(3)).toEqual({ aaNormal: false, aaLarge: true, aaa: false });
    expect(wcagLevels(2)).toEqual({ aaNormal: false, aaLarge: false, aaa: false });
  });
  it('returns null on invalid hex', () => {
    expect(contrastRatio('nope', '#fff')).toBeNull();
    expect(hexToRgb('#12')).toBeNull();
  });
});

describe('Unix epoch', () => {
  it('parses seconds', () => {
    const r = parseEpoch('0');
    expect(r?.iso).toBe('1970-01-01T00:00:00.000Z');
    expect(r?.seconds).toBe(0);
  });
  it('auto-detects milliseconds (13+ digits)', () => {
    const r = parseEpoch('1700000000000');
    expect(r?.ms).toBe(1700000000000);
    expect(r?.seconds).toBe(1700000000);
  });
  it('treats 10-digit as seconds', () => {
    const r = parseEpoch('1700000000');
    expect(r?.ms).toBe(1700000000000);
  });
  it('round-trips date → epoch → iso', () => {
    const e = dateToEpoch('2021-01-01T00:00:00.000Z');
    expect(e?.seconds).toBe(1609459200);
    expect(parseEpoch(e!.ms)?.iso).toBe('2021-01-01T00:00:00.000Z');
  });
  it('guards invalid input', () => {
    expect(parseEpoch('abc')).toBeNull();
    expect(parseEpoch('12.5')).toBeNull();
    expect(dateToEpoch('not a date')).toBeNull();
    expect(dateToEpoch('')).toBeNull();
  });
});

describe('CSV → JSON', () => {
  it('uses the first row as keys', () => {
    expect(csvToJson('name,age\nAsha,12\nRavi,15')).toEqual([
      { name: 'Asha', age: '12' },
      { name: 'Ravi', age: '15' },
    ]);
  });
  it('handles commas inside quoted fields', () => {
    expect(csvToJson('name,city\n"Rao, A",Delhi')).toEqual([
      { name: 'Rao, A', city: 'Delhi' },
    ]);
  });
  it('handles escaped quotes', () => {
    expect(parseCsv('"she said ""hi""",x')[0]).toEqual(['she said "hi"', 'x']);
  });
  it('round-trips through JSON shape', () => {
    const rows = csvToJson('a,b\n1,2');
    expect(JSON.parse(JSON.stringify(rows))).toEqual([{ a: '1', b: '2' }]);
  });
  it('returns [] for empty / header-only input', () => {
    expect(csvToJson('')).toEqual([]);
    expect(csvToJson('only,header')).toEqual([]);
  });
});
