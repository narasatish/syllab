import { describe, it, expect } from 'vitest';
import {
  percentage, cgpaToPercentage, percentageToCgpa,
  attendancePercent, classesYouCanSkip, classesToReachTarget,
} from './calculators';

describe('percentage', () => {
  it('computes marks percentage', () => {
    expect(percentage(450, 500)).toBe(90);
    expect(percentage(1, 3)).toBe(33.33);
  });
  it('guards against zero/negative totals', () => {
    expect(percentage(50, 0)).toBe(0);
    expect(percentage(50, -10)).toBe(0);
  });
});

describe('CGPA conversions (CBSE 9.5 rule)', () => {
  it('CGPA → percentage', () => {
    expect(cgpaToPercentage(10)).toBe(95);
    expect(cgpaToPercentage(8.2)).toBe(77.9);
    expect(cgpaToPercentage(-1)).toBe(0);
  });
  it('percentage → CGPA', () => {
    expect(percentageToCgpa(95)).toBe(10);
    expect(percentageToCgpa(0)).toBe(0);
  });
  it('respects a custom factor', () => {
    expect(cgpaToPercentage(9, 10)).toBe(90);
  });
});

describe('attendance', () => {
  it('current percentage', () => {
    expect(attendancePercent(45, 50)).toBe(90);
    expect(attendancePercent(0, 0)).toBe(0);
  });

  it('classes you can skip and stay >= target', () => {
    // 90/100 = 90%, target 75% → can skip 30 (90/120 = 75%)
    expect(classesYouCanSkip(90, 100, 75)).toBe(20);
    // already at target boundary
    expect(classesYouCanSkip(75, 100, 75)).toBe(0);
    // below target → 0
    expect(classesYouCanSkip(60, 100, 75)).toBe(0);
  });

  it('classes to attend to reach target', () => {
    // 60/100 = 60%, want 75% → need 60 more (120/160 = 75%)
    expect(classesToReachTarget(60, 100, 75)).toBe(60);
    // already above → 0
    expect(classesToReachTarget(90, 100, 75)).toBe(0);
    // 100% target after a miss is unreachable → -1
    expect(classesToReachTarget(40, 50, 100)).toBe(-1);
  });
});
