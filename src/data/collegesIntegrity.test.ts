import { describe, it, expect } from 'vitest';
import { COLLEGES, COLLEGES_LIVE, COLLEGE_STATE_INFO, DUPLICATE_COLLEGE_SLUGS } from './colleges';
import { MEDICAL_COLLEGES, MEDICAL_STATE_INFO, medFullCourse } from './medicalColleges';

describe('engineering COLLEGES integrity', () => {
  const stateNames = new Set(COLLEGE_STATE_INFO.map((s) => s.name));
  const validTypes = new Set(['IIT', 'NIT/IIIT', 'Government', 'Private/Deemed', 'Private']);

  /**
   * A college fee is a number a family budgets on, so the two fee fields must
   * not contradict each other.
   *
   * As of 2026-08-16, 16 of the 78 colleges holding numeric fees do contradict:
   * 11 store feesTotal as exactly 10x feesPerYear and 5 store 6x, against 62
   * that correctly store 4x for a four-year B.Tech. ITER Bhubaneswar — the
   * most-searched college on this site — stores ₹3,00,000/yr and ₹30,00,000
   * "full course".
   *
   * Both renderers now DERIVE the four-year figure from feesPerYear, so nothing
   * user-facing shows the contradicted number. This test does not fail on the
   * existing 16, because which field is authoritative cannot be settled without
   * official fee schedules and guessing is worse than the inconsistency. It
   * fails if the problem SPREADS, so the count can only go down.
   */
  it('the feesTotal/feesPerYear contradiction does not spread beyond the known 16', () => {
    const KNOWN_BAD = 16;
    const num = (v: unknown) => {
      const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''));
      return Number.isFinite(n) && n > 0 ? n : null;
    };
    const bad = COLLEGES.filter((c) => {
      if (/[₹L–]/.test(String(c.feesTotal))) return false; // range strings have no annual number
      const t = num(c.feesTotal), y = num(c.feesPerYear);
      if (!t || !y) return false;
      return Math.abs(t / y - 4) > 0.15;
    }).map((c) => `${c.slug} (${c.feesPerYear}/yr vs ${c.feesTotal} total)`);
    expect(bad.length, `feesTotal contradicts feesPerYear on:\n  ${bad.join('\n  ')}`)
      .toBeLessThanOrEqual(KNOWN_BAD);
  });

  it('has unique slugs', () => {
    const slugs = COLLEGES.map((c) => c.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(dupes, `duplicate college slugs: ${[...new Set(dupes)].join(', ')}`).toEqual([]);
  });

  it("every college's state matches a COLLEGE_STATE_INFO name", () => {
    for (const c of COLLEGES) {
      expect(stateNames.has(c.state), `college "${c.slug}" has state "${c.state}" with no matching state page`).toBe(true);
    }
  });

  it('every college has required fields + a valid type', () => {
    for (const c of COLLEGES) {
      expect(c.slug).toBeTruthy();
      expect(c.name, `name missing for ${c.slug}`).toBeTruthy();
      expect(c.city, `city missing for ${c.slug}`).toBeTruthy();
      expect(validTypes.has(c.type), `invalid type "${c.type}" for ${c.slug}`).toBe(true);
      expect(c.feesPerYear, `feesPerYear missing for ${c.slug}`).toBeTruthy();
      expect(c.about, `about missing for ${c.slug}`).toBeTruthy();
      expect(Array.isArray(c.exams) && c.exams.length, `exams missing for ${c.slug}`).toBeTruthy();
      expect(Number.isFinite(c.established), `established invalid for ${c.slug}`).toBe(true);
    }
  });
});

describe('MEDICAL_COLLEGES integrity', () => {
  const medStateNames = new Set(MEDICAL_STATE_INFO.map((s) => s.name));

  it('has unique slugs', () => {
    const slugs = MEDICAL_COLLEGES.map((c) => c.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(dupes, `duplicate medical slugs: ${[...new Set(dupes)].join(', ')}`).toEqual([]);
  });

  it("every medical college's state matches a MEDICAL_STATE_INFO name", () => {
    for (const c of MEDICAL_COLLEGES) {
      expect(medStateNames.has(c.state), `medical college "${c.slug}" has state "${c.state}" with no matching state page`).toBe(true);
    }
  });

  it('every medical college has required fields', () => {
    for (const c of MEDICAL_COLLEGES) {
      expect(c.slug).toBeTruthy();
      expect(c.name, `name missing for ${c.slug}`).toBeTruthy();
      // mbbsSeats can legitimately be 0 for PG-only institutes (e.g. PGIMER), so
      // only require it to be a valid non-negative number.
      expect(Number.isFinite(c.mbbsSeats) && c.mbbsSeats >= 0, `mbbsSeats invalid for ${c.slug}`).toBe(true);
      expect(c.about, `about missing for ${c.slug}`).toBeTruthy();
    }
  });
});

/**
 * NIRF ranks are the single most load-bearing number on a college page: a family
 * uses it to decide where to apply. On 2026-08-17 the stored ranks were audited
 * against the official India Rankings 2025 (Engineering) tables and 52 of the 62
 * institutes that appear in the published top 100 held the WRONG rank — Jamia
 * Millia was stored as #3, LPU as #121 and #50 on its two duplicate pages, IIT
 * (BHU) as #15 and #9. A further 29 published a precise rank while not being in
 * the published list at all.
 *
 * These tests pin the values to the checked-in official table, so a future edit
 * cannot quietly reintroduce an invented rank.
 */
describe('NIRF ranks match the official published table', async () => {
  const NIRF = (await import('./nirf2025Engineering.json')).default as {
    ranks: Record<string, { rank: number; city: string }>;
    bands: Record<string, { band: string; city: string }>;
  };
  const officialRanks = new Set(Object.values(NIRF.ranks).map((r) => r.rank));
  const officialBands = new Set(Object.values(NIRF.bands).map((b) => b.band));

  it('every stored rank is a position that actually exists in the top 100', () => {
    for (const c of COLLEGES) {
      if (c.nirf == null) continue;
      expect(Number.isInteger(c.nirf) && c.nirf >= 1 && c.nirf <= 100,
        `${c.slug} stores NIRF ${c.nirf}; only ranks 1-100 are published as exact positions`).toBe(true);
      expect(officialRanks.has(c.nirf), `${c.slug} stores rank ${c.nirf}, absent from the official table`).toBe(true);
    }
  });

  it('no college carries both an exact rank and a band', () => {
    for (const c of COLLEGES) {
      expect(!(c.nirf != null && c.nirfBand), `${c.slug} has both nirf=${c.nirf} and nirfBand=${c.nirfBand}`).toBe(true);
    }
  });

  it('every stored band is one NIRF actually publishes', () => {
    for (const c of COLLEGES) {
      if (!c.nirfBand) continue;
      expect(officialBands.has(c.nirfBand), `${c.slug} stores band "${c.nirfBand}", which NIRF does not publish`).toBe(true);
    }
  });

  it('no two live colleges claim the same exact rank', () => {
    const seen = new Map<number, string>();
    for (const c of COLLEGES_LIVE) {
      if (c.nirf == null) continue;
      // Rank 67 is a genuine tie in the official 2025 table (Sathyabama and PSG).
      const prev = seen.get(c.nirf);
      if (prev && c.nirf !== 67) {
        throw new Error(`rank #${c.nirf} claimed by both ${prev} and ${c.slug}`);
      }
      seen.set(c.nirf, c.slug);
    }
    expect(seen.size).toBeGreaterThan(40);
  });

  it('the retired duplicate slugs still exist as records so their URLs resolve', () => {
    for (const slug of DUPLICATE_COLLEGE_SLUGS) {
      expect(COLLEGES.some((c) => c.slug === slug), `${slug} was deleted; its URL would 404`).toBe(true);
      expect(COLLEGES_LIVE.some((c) => c.slug === slug), `${slug} must not appear in listings`).toBe(false);
    }
  });
});

/**
 * The medical dataset carried the same fabricated-rank defect as the engineering
 * one, and worse: 21 ranks were claimed by two or three colleges at once, and the
 * AIIMS entries looked numbered sequentially rather than ranked — AIIMS Bhopal
 * stored #4 against an actual #25, Medical College Kolkata #15 against #41. NIRF
 * publishes a top 50 only for Medical, with no rank bands, so a college absent
 * from that list has no published rank at all.
 */
describe('medical NIRF ranks match the official published table', async () => {
  const MED = (await import('./nirf2025Medical.json')).default as { ranks: Record<string, number> };
  const official = new Set(Object.values(MED.ranks));

  it('the checked-in table is a complete 1-50 with no gaps or repeats', () => {
    expect([...official].sort((a, b) => a - b)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  });

  it('every stored rank is a position that exists in the official top 50', () => {
    for (const c of MEDICAL_COLLEGES) {
      if (c.nirf == null) continue;
      expect(official.has(c.nirf), `${c.slug} stores NIRF ${c.nirf}; Medical publishes only ranks 1-50`).toBe(true);
    }
  });

  it('no two medical colleges claim the same rank', () => {
    const seen = new Map<number, string>();
    for (const c of MEDICAL_COLLEGES) {
      if (c.nirf == null) continue;
      const prev = seen.get(c.nirf);
      expect(prev, `rank #${c.nirf} claimed by both ${prev} and ${c.slug}`).toBeUndefined();
      seen.set(c.nirf, c.slug);
    }
  });

  it('a full-course fee is only shown when it agrees with the per-year figure', () => {
    for (const c of MEDICAL_COLLEGES) {
      const shown = medFullCourse(c);
      if (shown == null || /[₹L–]/.test(String(shown))) continue;
      const y = Number(String(c.feesPerYear).replace(/[^0-9.]/g, ''));
      const t = Number(String(shown).replace(/[^0-9.]/g, ''));
      expect(Math.abs(t / y - 4.5) <= 1.0, `${c.slug} shows full-course ${shown} against ${c.feesPerYear}/yr`).toBe(true);
    }
  });

  it('contradictory totals are suppressed rather than silently rendered', () => {
    const contradictory = MEDICAL_COLLEGES.filter((c) => {
      const raw = String(c.feesTotal ?? '');
      if (!raw || /[₹L–]/.test(raw)) return false;
      const y = Number(String(c.feesPerYear).replace(/[^0-9.]/g, ''));
      const t = Number(raw.replace(/[^0-9.]/g, ''));
      return y > 0 && t > 0 && Math.abs(t / y - 4.5) > 1.0;
    });
    for (const c of contradictory) expect(medFullCourse(c), `${c.slug} still renders a contradictory total`).toBeNull();
    expect(contradictory.length).toBeGreaterThan(0);
  });
});
