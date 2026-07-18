/**
 * everyday.ts — pure, framework-free math for the Everyday Tools page.
 * Every function is total and side-effect free: coerce inputs, return `null`
 * on anything invalid (never NaN/Infinity), so the UI can guard on `!= null`.
 * Fully unit-tested with exact expected values.
 */

/* ─────────────── Unit conversion ─────────────── */

export type FactorCategory = 'length' | 'weight' | 'data' | 'speed' | 'area';
export type UnitCategory = FactorCategory | 'temperature';

// Each table maps a unit → how many BASE units it equals (base noted per row).
export const UNIT_FACTORS: Record<FactorCategory, Record<string, number>> = {
  length: { Millimetre: 0.001, Centimetre: 0.01, Metre: 1, Kilometre: 1000, Inch: 0.0254, Foot: 0.3048, Yard: 0.9144, Mile: 1609.344 }, // base: metre
  weight: { Milligram: 0.001, Gram: 1, Kilogram: 1000, Tonne: 1e6, Ounce: 28.349523125, Pound: 453.59237 }, // base: gram
  data: { Bit: 0.125, Byte: 1, Kilobyte: 1024, Megabyte: 1048576, Gigabyte: 1073741824, Terabyte: 1099511627776 }, // base: byte
  speed: { 'Metre/sec': 1, 'Km/hour': 1000 / 3600, 'Mile/hour': 1609.344 / 3600, Knot: 1852 / 3600, 'Foot/sec': 0.3048 }, // base: m/s
  area: { 'Sq metre': 1, 'Sq kilometre': 1e6, 'Sq foot': 0.09290304, 'Sq mile': 2589988.110336, Acre: 4046.8564224, Hectare: 10000 }, // base: m²
};

export const TEMPERATURE_UNITS = ['Celsius', 'Fahrenheit', 'Kelvin'] as const;

export function unitsFor(category: UnitCategory): string[] {
  if (category === 'temperature') return [...TEMPERATURE_UNITS];
  return Object.keys(UNIT_FACTORS[category]);
}

/** Convert a temperature between Celsius / Fahrenheit / Kelvin. */
export function convertTemperature(value: number, from: string, to: string): number | null {
  const v = Number(value);
  if (!Number.isFinite(v)) return null;
  let c: number;
  if (from === 'Celsius') c = v;
  else if (from === 'Fahrenheit') c = (v - 32) * 5 / 9;
  else if (from === 'Kelvin') c = v - 273.15;
  else return null;
  if (to === 'Celsius') return c;
  if (to === 'Fahrenheit') return c * 9 / 5 + 32;
  if (to === 'Kelvin') return c + 273.15;
  return null;
}

/** Convert `value` from `from` to `to` within a category. Returns null on invalid input/units. */
export function convertUnit(category: UnitCategory, value: number, from: string, to: string): number | null {
  const v = Number(value);
  if (!Number.isFinite(v)) return null;
  if (category === 'temperature') return convertTemperature(v, from, to);
  const table = UNIT_FACTORS[category];
  if (!table || !(from in table) || !(to in table)) return null;
  return v * table[from] / table[to];
}

/* ─────────────── Percentage ─────────────── */

export type PercentMode = 'of' | 'isWhat' | 'change';

/** `mode` 'of' → a% of b · 'isWhat' → a is what % of b · 'change' → % change a→b. Null on divide-by-zero. */
export function percentage(mode: PercentMode, a: number, b: number): number | null {
  const x = Number(a);
  const y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (mode === 'of') return (x / 100) * y;
  if (mode === 'isWhat') return y === 0 ? null : (x / y) * 100;
  if (mode === 'change') return x === 0 ? null : ((y - x) / x) * 100;
  return null;
}

/* ─────────────── Age from date of birth ─────────────── */

export interface AgeResult { years: number; months: number; days: number; totalDays: number }

/** Parse a 'YYYY-MM-DD' string into a LOCAL-midnight Date (avoids UTC/TZ day-shift). */
function parseYMD(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso).trim());
  if (!m) { const d = new Date(iso); return Number.isNaN(d.getTime()) ? null : d; }
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Exact age (years/months/days with borrow) + total days, between a DOB and a reference date. */
export function ageBetween(dobISO: string, refISO: string): AgeResult | null {
  const dob = parseYMD(dobISO);
  const now = parseYMD(refISO);
  if (!dob || !now) return null;
  if (dob.getTime() > now.getTime()) return null; // future DOB → invalid

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // days in the previous month
  }
  if (months < 0) { years -= 1; months += 12; }

  const totalDays = Math.round((now.getTime() - dob.getTime()) / 86_400_000);
  return { years, months, days, totalDays };
}

/* ─────────────── Date difference ─────────────── */

export interface DateDiff { days: number; weeks: number; remainderDays: number }

/** Whole days (and weeks + leftover) between two dates, order-independent. */
export function dateDifference(aISO: string, bISO: string): DateDiff | null {
  const a = parseYMD(aISO);
  const b = parseYMD(bISO);
  if (!a || !b) return null;
  const days = Math.abs(Math.round((b.getTime() - a.getTime()) / 86_400_000));
  return { days, weeks: Math.floor(days / 7), remainderDays: days % 7 };
}

/* ─────────────── BMI ─────────────── */

export interface BmiResult { bmi: number; category: string }

/** BMI from weight (kg) + height (cm). Null when either is ≤ 0. */
export function bmi(kg: number, cm: number): BmiResult | null {
  const w = Number(kg);
  const h = Number(cm);
  if (!(w > 0) || !(h > 0)) return null;
  const metres = h / 100;
  const value = Math.round((w / (metres * metres)) * 10) / 10;
  let category: string;
  if (value < 18.5) category = 'Underweight';
  else if (value < 25) category = 'Normal weight';
  else if (value < 30) category = 'Overweight';
  else category = 'Obese';
  return { bmi: value, category };
}

/* ─────────────── Lorem ipsum ─────────────── */

const LOREM_POOL = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat'.split(' ');

function clampCount(count: number): number {
  const n = Math.floor(Number(count));
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(200, n));
}

const capFirst = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Deterministic sentence (8–13 words) so output is testable and stable.
function loremSentence(seed: number): string {
  const len = 8 + (seed % 6);
  const words = Array.from({ length: len }, (_, i) => LOREM_POOL[(seed + i) % LOREM_POOL.length]);
  return capFirst(words.join(' ')) + '.';
}

/** Generate deterministic placeholder text: `count` words / sentences / paragraphs (clamped 1–200). */
export function lorem(kind: 'words' | 'sentences' | 'paragraphs', count: number): string {
  const n = clampCount(count);
  if (kind === 'words') {
    const words = Array.from({ length: n }, (_, i) => LOREM_POOL[i % LOREM_POOL.length]);
    return capFirst(words.join(' ')) + '.';
  }
  if (kind === 'sentences') {
    return Array.from({ length: n }, (_, i) => loremSentence(i * 3)).join(' ');
  }
  // paragraphs — 4 sentences each, blank line between.
  return Array.from({ length: n }, (_, p) =>
    Array.from({ length: 4 }, (_, s) => loremSentence(p * 4 + s)).join(' '),
  ).join('\n\n');
}

/** Round to `dp` decimals and drop trailing zeros — for tidy result display. */
export function tidy(n: number, dp = 4): string {
  if (!Number.isFinite(n)) return '';
  const r = Number(n.toFixed(dp));
  return String(r);
}
