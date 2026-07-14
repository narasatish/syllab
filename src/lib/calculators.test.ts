import { describe, it, expect } from 'vitest';
import {
  percentage, cgpaToPercentage, percentageToCgpa,
  attendancePercent, classesYouCanSkip, classesToReachTarget,
  marksNeededForTarget, semesterGpa, emiPlan, cuetScore, cbseGrade,
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

describe('marksNeededForTarget', () => {
  it('computes marks needed in the final exam', () => {
    // 320/400 so far, final out of 100, want 75% of 500 = 375 → need 55
    expect(marksNeededForTarget(320, 400, 100, 75)).toBe(55);
  });
  it('returns 0 when target is already locked in', () => {
    // 380/400, final/100, want 75% of 500 = 375 → already there
    expect(marksNeededForTarget(380, 400, 100, 75)).toBe(0);
  });
  it('returns -1 when even full marks fall short', () => {
    // 200/400, final/100, want 90% of 500 = 450 → need 250 > 100
    expect(marksNeededForTarget(200, 400, 100, 90)).toBe(-1);
  });
  it('guards invalid inputs', () => {
    expect(marksNeededForTarget(100, 200, 0, 75)).toBe(0);
    expect(marksNeededForTarget(100, 200, 100, 0)).toBe(0);
  });
});

describe('semesterGpa', () => {
  it('credit-weights grade points', () => {
    // (9*4 + 8*3 + 10*3) / (4+3+3) = 90/10 = 9
    expect(semesterGpa([{ points: 9, credits: 4 }, { points: 8, credits: 3 }, { points: 10, credits: 3 }])).toBe(9);
  });
  it('ignores rows with no credits', () => {
    expect(semesterGpa([{ points: 9, credits: 4 }, { points: 8, credits: 0 }])).toBe(9);
    expect(semesterGpa([{ points: NaN, credits: 4 }])).toBe(0);
  });
  it('returns 0 with no valid credits', () => {
    expect(semesterGpa([])).toBe(0);
  });
});

describe('emiPlan (education loan)', () => {
  it('computes EMI with the standard reducing-balance formula', () => {
    // ₹10,00,000 at 10% for 10 years → EMI ≈ ₹13,215
    const r = emiPlan(1000000, 10, 10);
    expect(r.months).toBe(120);
    expect(r.emi).toBeGreaterThan(13100);
    expect(r.emi).toBeLessThan(13300);
    expect(r.totalPayment).toBe(r.emi * 120);
    expect(r.totalInterest).toBe(r.totalPayment - 1000000);
  });
  it('handles a 0% (interest-free) loan', () => {
    const r = emiPlan(120000, 0, 1);
    expect(r.emi).toBe(10000);
    expect(r.totalInterest).toBe(0);
  });
  it('guards invalid inputs', () => {
    expect(emiPlan(0, 10, 5).emi).toBe(0);
    expect(emiPlan(100000, 10, 0).emi).toBe(0);
  });
});

describe('cuetScore', () => {
  it('applies +5 correct / −1 wrong', () => {
    const r = cuetScore(30, 5, 40);
    expect(r.score).toBe(30 * 5 - 5); // 145
    expect(r.max).toBe(200);
    expect(r.percentage).toBe(72.5);
  });
  it('derives max from attempted when total omitted', () => {
    expect(cuetScore(10, 0).max).toBe(50);
  });
});

describe('cbseGrade', () => {
  it('maps marks to the 9-point grade', () => {
    expect(cbseGrade(95)).toEqual({ grade: 'A1', point: 10 });
    expect(cbseGrade(85)).toEqual({ grade: 'A2', point: 9 });
    expect(cbseGrade(33)).toEqual({ grade: 'D', point: 4 });
    expect(cbseGrade(20)).toEqual({ grade: 'E', point: 0 });
  });
});
