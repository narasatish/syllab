import { describe, it, expect } from 'vitest';
import { ringGeometry, clampPercent, xpToNextLevel, flameScale } from './progressRing';

describe('clampPercent', () => {
  it.each([
    [0, 0], [50, 50], [100, 100],
    [-10, 0], [140, 100],
  ])('%p -> %p', (input, expected) => {
    expect(clampPercent(input)).toBe(expected);
  });

  // XP arrives from Firestore and can be undefined/NaN. An NaN dashoffset
  // renders nothing at all, silently, so this must never propagate.
  it.each([NaN, Infinity, -Infinity, undefined as unknown as number])(
    'treats non-finite %p as 0', (v) => {
      expect(clampPercent(v)).toBe(0);
    },
  );
});

describe('ringGeometry', () => {
  it('circumference matches the radius', () => {
    const g = ringGeometry(0, 100, 10);
    expect(g.radius).toBeCloseTo(45, 5);            // 100/2 - 10/2
    expect(g.circumference).toBeCloseTo(2 * Math.PI * 45, 5);
  });

  it('0% hides the whole ring, 100% reveals it', () => {
    const empty = ringGeometry(0);
    const full = ringGeometry(100);
    expect(empty.dashOffset).toBeCloseTo(empty.circumference, 5);
    expect(full.dashOffset).toBeCloseTo(0, 5);
  });

  it('50% leaves exactly half the circumference offset', () => {
    const g = ringGeometry(50);
    expect(g.dashOffset).toBeCloseTo(g.circumference / 2, 5);
  });

  it('dashOffset decreases monotonically as percent rises', () => {
    let prev = Infinity;
    for (let p = 0; p <= 100; p += 5) {
      const { dashOffset } = ringGeometry(p);
      expect(dashOffset).toBeLessThanOrEqual(prev);
      prev = dashOffset;
    }
  });

  it('keeps the stroke inside the viewBox', () => {
    const size = 96, stroke = 8;
    const g = ringGeometry(70, size, stroke);
    expect(g.radius + stroke / 2).toBeLessThanOrEqual(size / 2);
  });

  it('centre is half the size', () => {
    expect(ringGeometry(0, 120).center).toBe(60);
  });

  it('never produces NaN, for any input combination', () => {
    const inputs = [NaN, -5, 0, 50, 100, 1e9];
    for (const p of inputs) {
      for (const size of [0, 1, 96, 400]) {
        for (const stroke of [0, 8, 1000]) {
          const g = ringGeometry(p, size, stroke);
          for (const [k, v] of Object.entries(g)) {
            expect(Number.isFinite(v), `${k} was ${v} for (${p}, ${size}, ${stroke})`).toBe(true);
          }
        }
      }
    }
  });

  it('a stroke wider than the box does not give a negative radius', () => {
    expect(ringGeometry(50, 20, 1000).radius).toBeGreaterThanOrEqual(0);
  });
});

describe('xpToNextLevel', () => {
  it('reports the remaining XP', () => {
    expect(xpToNextLevel(250, 300)).toBe(50);
  });

  it('is 0 at the top level, where nextXp is Infinity', () => {
    expect(xpToNextLevel(99999, Infinity)).toBe(0);
  });

  it('never goes negative once the threshold is passed', () => {
    expect(xpToNextLevel(400, 300)).toBe(0);
  });

  it('treats a non-finite xp as 0', () => {
    expect(xpToNextLevel(NaN, 300)).toBe(300);
  });

  it('rounds up so "1 XP to go" never displays as 0', () => {
    expect(xpToNextLevel(299.2, 300)).toBe(1);
  });
});

describe('flameScale', () => {
  it('is 0 with no streak, so the caller can hide the flame', () => {
    expect(flameScale(0)).toBe(0);
    expect(flameScale(-3)).toBe(0);
    expect(flameScale(NaN)).toBe(0);
  });

  it('grows with the streak', () => {
    expect(flameScale(10)).toBeGreaterThan(flameScale(1));
    expect(flameScale(30)).toBeGreaterThan(flameScale(10));
  });

  it('saturates so a huge streak cannot blow up the layout', () => {
    expect(flameScale(30)).toBe(flameScale(400));
    expect(flameScale(9999)).toBeLessThanOrEqual(1.6);
  });

  it('stays within a sane CSS scale range', () => {
    for (const d of [1, 5, 15, 30, 100]) {
      expect(flameScale(d)).toBeGreaterThan(1);
      expect(flameScale(d)).toBeLessThanOrEqual(1.6);
    }
  });
});
