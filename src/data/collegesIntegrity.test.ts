import { describe, it, expect } from 'vitest';
import { COLLEGES, COLLEGE_STATE_INFO } from './colleges';
import { MEDICAL_COLLEGES, MEDICAL_STATE_INFO } from './medicalColleges';

describe('engineering COLLEGES integrity', () => {
  const stateNames = new Set(COLLEGE_STATE_INFO.map((s) => s.name));
  const validTypes = new Set(['IIT', 'NIT/IIIT', 'Government', 'Private/Deemed', 'Private']);

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
