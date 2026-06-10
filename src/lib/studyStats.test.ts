import { describe, it, expect } from 'vitest';
import { isoWeek, weekKeyFor } from './studyStats';

describe('isoWeek', () => {
  it('returns YYYY-Www format', () => {
    expect(isoWeek(new Date('2026-06-09'))).toMatch(/^\d{4}-W\d{2}$/);
  });
  it('computes known ISO weeks correctly', () => {
    // 2026-01-01 is a Thursday → ISO week 01 of 2026
    expect(isoWeek(new Date('2026-01-01'))).toBe('2026-W01');
    // Mid-year sanity
    expect(isoWeek(new Date('2026-06-09'))).toBe('2026-W24');
  });
  it('pads single-digit weeks', () => {
    expect(isoWeek(new Date('2026-01-05'))).toBe('2026-W02');
  });
});

describe('weekKeyFor', () => {
  it('combines ISO week with the uid', () => {
    expect(weekKeyFor('abc123', new Date('2026-06-09'))).toBe('2026-W24-abc123');
  });
});
