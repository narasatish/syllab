import { describe, it, expect } from 'vitest';
import {
  convertUnit, convertTemperature, percentage, ageBetween,
  dateDifference, bmi, lorem, unitsFor,
} from './everyday';

describe('convertUnit', () => {
  it('length: 1000 m → 1 km', () => {
    expect(convertUnit('length', 1000, 'Metre', 'Kilometre')).toBe(1);
  });
  it('length: 1 inch → 2.54 cm', () => {
    expect(convertUnit('length', 1, 'Inch', 'Centimetre')).toBeCloseTo(2.54, 10);
  });
  it('weight: 1 kg → 1000 g', () => {
    expect(convertUnit('weight', 1, 'Kilogram', 'Gram')).toBe(1000);
  });
  it('data: 1 MB → 1024 KB', () => {
    expect(convertUnit('data', 1, 'Megabyte', 'Kilobyte')).toBe(1024);
  });
  it('speed: 36 km/h → 10 m/s', () => {
    expect(convertUnit('speed', 36, 'Km/hour', 'Metre/sec')).toBeCloseTo(10, 10);
  });
  it('area: 1 hectare → 10000 m²', () => {
    expect(convertUnit('area', 1, 'Hectare', 'Sq metre')).toBe(10000);
  });
  it('same unit → same value', () => {
    expect(convertUnit('length', 42, 'Metre', 'Metre')).toBe(42);
  });
  it('returns null for unknown units or bad input', () => {
    expect(convertUnit('length', 1, 'Furlong', 'Metre')).toBeNull();
    expect(convertUnit('length', NaN, 'Metre', 'Metre')).toBeNull();
  });
});

describe('convertTemperature', () => {
  it('0 °C → 32 °F', () => expect(convertTemperature(0, 'Celsius', 'Fahrenheit')).toBe(32));
  it('100 °C → 212 °F', () => expect(convertTemperature(100, 'Celsius', 'Fahrenheit')).toBe(212));
  it('0 °C → 273.15 K', () => expect(convertTemperature(0, 'Celsius', 'Kelvin')).toBeCloseTo(273.15, 10));
  it('212 °F → 100 °C', () => expect(convertTemperature(212, 'Fahrenheit', 'Celsius')).toBeCloseTo(100, 10));
  it('via convertUnit dispatch', () => expect(convertUnit('temperature', 37, 'Celsius', 'Fahrenheit')).toBeCloseTo(98.6, 10));
});

describe('percentage', () => {
  it('20% of 150 = 30', () => expect(percentage('of', 20, 150)).toBe(30));
  it('30 is what % of 150 = 20', () => expect(percentage('isWhat', 30, 150)).toBe(20));
  it('% change 100 → 150 = 50', () => expect(percentage('change', 100, 150)).toBe(50));
  it('% change 100 → 80 = -20', () => expect(percentage('change', 100, 80)).toBe(-20));
  it('null on divide-by-zero', () => {
    expect(percentage('isWhat', 5, 0)).toBeNull();
    expect(percentage('change', 0, 5)).toBeNull();
  });
});

describe('ageBetween', () => {
  it('exact years on a birthday', () => {
    expect(ageBetween('2000-06-15', '2020-06-15')).toMatchObject({ years: 20, months: 0, days: 0 });
  });
  it('borrows months and days', () => {
    const a = ageBetween('2000-06-15', '2020-06-10');
    expect(a).toMatchObject({ years: 19, months: 11 });
    expect(a!.days).toBeGreaterThan(0);
  });
  it('computes total days', () => {
    expect(ageBetween('2020-01-01', '2020-01-31')!.totalDays).toBe(30);
  });
  it('null for a future DOB', () => {
    expect(ageBetween('2030-01-01', '2020-01-01')).toBeNull();
  });
});

describe('dateDifference', () => {
  it('counts whole days', () => {
    expect(dateDifference('2024-01-01', '2024-01-15')).toEqual({ days: 14, weeks: 2, remainderDays: 0 });
  });
  it('is order-independent', () => {
    expect(dateDifference('2024-01-15', '2024-01-01')!.days).toBe(14);
  });
  it('weeks + remainder', () => {
    expect(dateDifference('2024-01-01', '2024-01-11')).toEqual({ days: 10, weeks: 1, remainderDays: 3 });
  });
});

describe('bmi', () => {
  it('70 kg, 175 cm → 22.9 Normal', () => {
    expect(bmi(70, 175)).toEqual({ bmi: 22.9, category: 'Normal weight' });
  });
  it('classifies underweight', () => expect(bmi(45, 175)!.category).toBe('Underweight'));
  it('classifies obese', () => expect(bmi(100, 160)!.category).toBe('Obese'));
  it('null on non-positive input', () => {
    expect(bmi(0, 175)).toBeNull();
    expect(bmi(70, 0)).toBeNull();
  });
});

describe('lorem', () => {
  it('produces the requested number of words', () => {
    expect(lorem('words', 5).replace('.', '').split(' ')).toHaveLength(5);
  });
  it('clamps count to 1..200', () => {
    expect(lorem('words', 0).replace('.', '').split(' ')).toHaveLength(1);
    expect(lorem('words', 999).replace('.', '').split(' ')).toHaveLength(200);
  });
  it('sentences end with a period and start capitalised', () => {
    const s = lorem('sentences', 2);
    expect(s.endsWith('.')).toBe(true);
    expect(s[0]).toBe(s[0].toUpperCase());
  });
  it('paragraphs are separated by blank lines', () => {
    expect(lorem('paragraphs', 3).split('\n\n')).toHaveLength(3);
  });
  it('is deterministic', () => {
    expect(lorem('sentences', 3)).toBe(lorem('sentences', 3));
  });
});

describe('unitsFor', () => {
  it('lists temperature units', () => expect(unitsFor('temperature')).toEqual(['Celsius', 'Fahrenheit', 'Kelvin']));
  it('lists length units', () => expect(unitsFor('length')).toContain('Metre'));
});
