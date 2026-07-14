import { describe, it, expect } from 'vitest';
import { convert, fmt, CATEGORIES } from './unitConverter';

describe('convert — factor categories', () => {
  it('length: km ↔ m ↔ mile', () => {
    expect(convert(1, 'km', 'm', 'length')).toBe(1000);
    expect(convert(1609.344, 'm', 'mile', 'length')).toBeCloseTo(1, 6);
    expect(convert(12, 'inch', 'foot', 'length')).toBeCloseTo(1, 6);
  });
  it('mass: kg ↔ g ↔ lb', () => {
    expect(convert(1, 'kg', 'g', 'mass')).toBe(1000);
    expect(convert(1, 'lb', 'kg', 'mass')).toBeCloseTo(0.45359237, 8);
  });
  it('speed: km/h → m/s', () => {
    expect(convert(36, 'kmph', 'mps', 'speed')).toBeCloseTo(10, 6);
  });
  it('energy: kcal → kJ', () => {
    expect(convert(1, 'kcal', 'kj', 'energy')).toBeCloseTo(4.184, 6);
  });
  it('data: 1 GB → MB (binary)', () => {
    expect(convert(1, 'gb', 'mb', 'data')).toBe(1024);
  });
  it('returns NaN for unknown units', () => {
    expect(Number.isNaN(convert(1, 'nope', 'm', 'length'))).toBe(true);
  });
});

describe('convert — temperature (affine)', () => {
  it('0 °C = 32 °F = 273.15 K', () => {
    expect(convert(0, 'c', 'f', 'temperature')).toBe(32);
    expect(convert(0, 'c', 'k', 'temperature')).toBeCloseTo(273.15, 6);
  });
  it('100 °C = 212 °F', () => {
    expect(convert(100, 'c', 'f', 'temperature')).toBe(212);
  });
  it('98.6 °F ≈ 37 °C', () => {
    expect(convert(98.6, 'f', 'c', 'temperature')).toBeCloseTo(37, 6);
  });
  it('300 K → °C', () => {
    expect(convert(300, 'k', 'c', 'temperature')).toBeCloseTo(26.85, 6);
  });
});

describe('fmt', () => {
  it('formats normal and tiny/huge numbers', () => {
    expect(fmt(1000)).toBe('1000');
    expect(fmt(0)).toBe('0');
    expect(fmt(1234567)).toContain('e');
  });
});

describe('data integrity', () => {
  it('every category has a base unit present in its unit list (except temperature which is affine)', () => {
    for (const c of CATEGORIES) {
      if (c.id === 'temperature') continue;
      const hasBaseFactorOne = c.units.some((u) => u.factor === 1);
      expect(hasBaseFactorOne).toBe(true);
    }
  });
});
