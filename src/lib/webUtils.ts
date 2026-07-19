/**
 * webUtils.ts — pure, framework-free helpers for the developer/utility tools:
 * Roman numerals (two-way), WCAG colour contrast, Unix epoch conversion, and a
 * quote-aware CSV → JSON parser. No dependencies; fully unit-tested. Every
 * function validates at the boundary and returns null on invalid input.
 */

/* ─────────────── Roman numerals ─────────────── */

const ROMAN_MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Integer 1–3999 → Roman numeral. Returns null for anything out of range. */
export function toRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let out = '';
  let x = n;
  for (const [v, s] of ROMAN_MAP) {
    while (x >= v) { out += s; x -= v; }
  }
  return out;
}

/**
 * Roman numeral → integer. Only M D C L X V I are allowed, and the string must
 * be the canonical/legal subtractive form (so "IIII", "IC", "VX" are rejected).
 */
export function fromRoman(s: string): number | null {
  const str = String(s).trim().toUpperCase();
  if (!str || !/^[MDCLXVI]+$/.test(str)) return null;
  const val: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    const cur = val[str[i]];
    const next = val[str[i + 1]] || 0;
    if (cur < next) total -= cur; else total += cur;
  }
  // Canonical check: the only valid spelling of `total` is `str` itself.
  if (toRoman(total) !== str) return null;
  return total;
}

/* ─────────────── WCAG colour contrast ─────────────── */

export interface Rgb { r: number; g: number; b: number }

/** Parse a #rgb or #rrggbb hex colour into 0–255 channels. Null if malformed. */
export function hexToRgb(hex: string): Rgb | null {
  const h = String(hex).trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) {
    const [r, g, b] = h.split('').map((c) => parseInt(c + c, 16));
    return { r, g, b };
  }
  if (/^[0-9a-f]{6}$/i.test(h)) {
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  return null;
}

function channelToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** WCAG relative luminance (0–1) of a hex colour. Null if malformed. */
export function relativeLuminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return 0.2126 * channelToLinear(rgb.r) + 0.7152 * channelToLinear(rgb.g) + 0.0722 * channelToLinear(rgb.b);
}

/** WCAG contrast ratio (1–21) between two hex colours. Null if either is malformed. */
export function contrastRatio(fg: string, bg: string): number | null {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  if (l1 == null || l2 == null) return null;
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

export interface WcagPass { aaNormal: boolean; aaLarge: boolean; aaa: boolean }

/** Which WCAG thresholds a contrast ratio passes. */
export function wcagLevels(ratio: number): WcagPass {
  return { aaNormal: ratio >= 4.5, aaLarge: ratio >= 3, aaa: ratio >= 7 };
}

/* ─────────────── Unix epoch ─────────────── */

export interface EpochResult { seconds: number; ms: number; iso: string; utc: string }

/**
 * Parse an epoch value, auto-detecting seconds vs milliseconds by digit count
 * (13+ digits = milliseconds, otherwise seconds). Null on non-numeric or an
 * out-of-range date.
 */
export function parseEpoch(input: string | number): EpochResult | null {
  const raw = String(input).trim();
  if (!/^-?\d+$/.test(raw)) return null;
  const digits = raw.replace('-', '').length;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  const ms = digits >= 13 ? n : n * 1000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return { seconds: Math.floor(ms / 1000), ms, iso: d.toISOString(), utc: d.toUTCString() };
}

/** Convert a date string (anything Date can parse) → epoch seconds + ms. Null if invalid. */
export function dateToEpoch(dateStr: string): { seconds: number; ms: number } | null {
  if (!String(dateStr).trim()) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() };
}

/* ─────────────── CSV → JSON ─────────────── */

/**
 * Quote-aware CSV parser → array of rows (each an array of field strings).
 * Handles commas inside "quoted, fields", "" escaped quotes, and CRLF/newlines
 * inside quoted fields.
 */
export function parseCsv(text: string): string[][] {
  const s = String(text ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; } // escaped quote
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/**
 * Parse CSV text into an array of objects: the first row supplies the keys.
 * Empty trailing lines are ignored. Returns [] if there is no data row.
 */
export function csvToJson(text: string): Record<string, string>[] {
  const rows = parseCsv(text).filter((r) => !(r.length === 1 && r[0] === ''));
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cols) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = cols[i] ?? ''; });
    return obj;
  });
}
