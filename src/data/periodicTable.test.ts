import { describe, it, expect } from 'vitest';
import { ELEMENTS } from './periodicTable';

describe('periodic table data integrity', () => {
  it('has exactly 118 elements with contiguous atomic numbers 1..118', () => {
    expect(ELEMENTS.length).toBe(118);
    const zs = ELEMENTS.map((e) => e.z).sort((a, b) => a - b);
    for (let i = 0; i < 118; i++) expect(zs[i]).toBe(i + 1);
  });

  it('places lanthanides (57–71) on row 9 and actinides (89–103) on row 10', () => {
    expect(ELEMENTS.filter((e) => e.z >= 57 && e.z <= 71).every((e) => e.ypos === 9)).toBe(true);
    expect(ELEMENTS.filter((e) => e.z >= 89 && e.z <= 103).every((e) => e.ypos === 10)).toBe(true);
  });

  it('has valid grid positions and known anchor values', () => {
    for (const e of ELEMENTS) {
      expect(e.xpos).toBeGreaterThanOrEqual(1);
      expect(e.xpos).toBeLessThanOrEqual(18);
      expect(e.symbol.length).toBeGreaterThan(0);
    }
    const byZ = Object.fromEntries(ELEMENTS.map((e) => [e.z, e]));
    expect(byZ[6]).toMatchObject({ symbol: 'C', name: 'Carbon', mass: '12.011', category: 'reactive-nonmetal', group: 14, period: 2 });
    expect(byZ[26]).toMatchObject({ symbol: 'Fe', category: 'transition-metal', group: 8 });
    expect(byZ[92]).toMatchObject({ symbol: 'U', category: 'actinide' });
    expect(byZ[118]).toMatchObject({ symbol: 'Og', category: 'noble-gas' });
  });
});
