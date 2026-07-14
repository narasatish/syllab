/**
 * unitConverter.ts — pure, testable unit conversions for students (physics,
 * chemistry, maths, everyday). Each category defines its units as a factor
 * relative to a base unit; conversion is value × fromFactor ÷ toFactor.
 * Temperature is special-cased (affine, not a simple factor).
 */

export interface Unit { id: string; label: string; factor: number } // factor = how many base units in 1 of this unit
export interface Category { id: string; label: string; base: string; units: Unit[] }

export const CATEGORIES: Category[] = [
  { id: 'length', label: 'Length', base: 'm', units: [
    { id: 'km', label: 'Kilometre (km)', factor: 1000 },
    { id: 'm', label: 'Metre (m)', factor: 1 },
    { id: 'cm', label: 'Centimetre (cm)', factor: 0.01 },
    { id: 'mm', label: 'Millimetre (mm)', factor: 0.001 },
    { id: 'mile', label: 'Mile', factor: 1609.344 },
    { id: 'yard', label: 'Yard', factor: 0.9144 },
    { id: 'foot', label: 'Foot (ft)', factor: 0.3048 },
    { id: 'inch', label: 'Inch (in)', factor: 0.0254 },
  ] },
  { id: 'mass', label: 'Mass / Weight', base: 'kg', units: [
    { id: 'tonne', label: 'Tonne (t)', factor: 1000 },
    { id: 'quintal', label: 'Quintal', factor: 100 },
    { id: 'kg', label: 'Kilogram (kg)', factor: 1 },
    { id: 'g', label: 'Gram (g)', factor: 0.001 },
    { id: 'mg', label: 'Milligram (mg)', factor: 1e-6 },
    { id: 'lb', label: 'Pound (lb)', factor: 0.45359237 },
    { id: 'oz', label: 'Ounce (oz)', factor: 0.028349523125 },
  ] },
  { id: 'time', label: 'Time', base: 's', units: [
    { id: 'ms', label: 'Millisecond (ms)', factor: 0.001 },
    { id: 's', label: 'Second (s)', factor: 1 },
    { id: 'min', label: 'Minute', factor: 60 },
    { id: 'hour', label: 'Hour', factor: 3600 },
    { id: 'day', label: 'Day', factor: 86400 },
    { id: 'week', label: 'Week', factor: 604800 },
  ] },
  { id: 'area', label: 'Area', base: 'm²', units: [
    { id: 'km2', label: 'Square kilometre (km²)', factor: 1e6 },
    { id: 'm2', label: 'Square metre (m²)', factor: 1 },
    { id: 'cm2', label: 'Square centimetre (cm²)', factor: 1e-4 },
    { id: 'hectare', label: 'Hectare', factor: 1e4 },
    { id: 'acre', label: 'Acre', factor: 4046.8564224 },
    { id: 'ft2', label: 'Square foot (ft²)', factor: 0.09290304 },
  ] },
  { id: 'volume', label: 'Volume', base: 'L', units: [
    { id: 'm3', label: 'Cubic metre (m³)', factor: 1000 },
    { id: 'l', label: 'Litre (L)', factor: 1 },
    { id: 'ml', label: 'Millilitre (mL)', factor: 0.001 },
    { id: 'gal', label: 'US Gallon', factor: 3.785411784 },
    { id: 'cup', label: 'Cup (metric)', factor: 0.25 },
  ] },
  { id: 'speed', label: 'Speed', base: 'm/s', units: [
    { id: 'mps', label: 'Metre/second (m/s)', factor: 1 },
    { id: 'kmph', label: 'Kilometre/hour (km/h)', factor: 1000 / 3600 },
    { id: 'mph', label: 'Miles/hour (mph)', factor: 0.44704 },
    { id: 'knot', label: 'Knot', factor: 1852 / 3600 },
  ] },
  { id: 'energy', label: 'Energy', base: 'J', units: [
    { id: 'j', label: 'Joule (J)', factor: 1 },
    { id: 'kj', label: 'Kilojoule (kJ)', factor: 1000 },
    { id: 'cal', label: 'Calorie (cal)', factor: 4.184 },
    { id: 'kcal', label: 'Kilocalorie (kcal)', factor: 4184 },
    { id: 'wh', label: 'Watt-hour (Wh)', factor: 3600 },
    { id: 'kwh', label: 'Kilowatt-hour (kWh)', factor: 3.6e6 },
  ] },
  { id: 'pressure', label: 'Pressure', base: 'Pa', units: [
    { id: 'pa', label: 'Pascal (Pa)', factor: 1 },
    { id: 'kpa', label: 'Kilopascal (kPa)', factor: 1000 },
    { id: 'bar', label: 'Bar', factor: 1e5 },
    { id: 'atm', label: 'Atmosphere (atm)', factor: 101325 },
    { id: 'psi', label: 'PSI', factor: 6894.757293168 },
    { id: 'mmhg', label: 'mmHg (torr)', factor: 133.322387415 },
  ] },
  { id: 'data', label: 'Digital storage', base: 'byte', units: [
    { id: 'bit', label: 'Bit', factor: 0.125 },
    { id: 'byte', label: 'Byte', factor: 1 },
    { id: 'kb', label: 'Kilobyte (KB)', factor: 1024 },
    { id: 'mb', label: 'Megabyte (MB)', factor: 1024 ** 2 },
    { id: 'gb', label: 'Gigabyte (GB)', factor: 1024 ** 3 },
    { id: 'tb', label: 'Terabyte (TB)', factor: 1024 ** 4 },
  ] },
  { id: 'temperature', label: 'Temperature', base: 'C', units: [
    { id: 'c', label: 'Celsius (°C)', factor: 1 },
    { id: 'f', label: 'Fahrenheit (°F)', factor: 1 },
    { id: 'k', label: 'Kelvin (K)', factor: 1 },
  ] },
];

/** Temperature is affine, so convert via Celsius as the pivot. */
function toCelsius(v: number, unit: string): number {
  if (unit === 'f') return (v - 32) * 5 / 9;
  if (unit === 'k') return v - 273.15;
  return v;
}
function fromCelsius(c: number, unit: string): number {
  if (unit === 'f') return c * 9 / 5 + 32;
  if (unit === 'k') return c + 273.15;
  return c;
}

/**
 * Convert `value` from `fromId` to `toId` within `categoryId`. Returns NaN if
 * the units are unknown for that category.
 */
export function convert(value: number, fromId: string, toId: string, categoryId: string): number {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!cat || !Number.isFinite(value)) return NaN;
  if (categoryId === 'temperature') return fromCelsius(toCelsius(value, fromId), toId);
  const from = cat.units.find((u) => u.id === fromId);
  const to = cat.units.find((u) => u.id === toId);
  if (!from || !to) return NaN;
  return (value * from.factor) / to.factor;
}

/** Round to a sensible number of significant figures for display. */
export function fmt(n: number): string {
  if (!Number.isFinite(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-4) return n.toExponential(4).replace(/\.?0+e/, 'e');
  return String(Math.round(n * 1e6) / 1e6);
}
