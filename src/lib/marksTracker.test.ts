import { describe, it, expect } from 'vitest';
import { summarise, marksToTarget, type Subject } from './marksTracker';

const subs: Subject[] = [
  { name: 'Maths', obtained: 90, max: 100 },
  { name: 'Science', obtained: 60, max: 100 },
  { name: 'English', obtained: 75, max: 100 },
];

describe('summarise', () => {
  it('computes overall %, grade, weakest and strongest', () => {
    const s = summarise(subs);
    expect(s.totalObtained).toBe(225);
    expect(s.totalMax).toBe(300);
    expect(s.percentage).toBe(75);
    expect(s.grade).toBe('B1'); // 75 → B1 (71–80)
    expect(s.weakest).toBe('Science');
    expect(s.strongest).toBe('Maths');
  });
  it('ignores invalid rows and handles empty input', () => {
    expect(summarise([]).percentage).toBe(0);
    expect(summarise([{ name: 'x', obtained: 5, max: 0 }]).totalMax).toBe(0);
    const s = summarise([{ name: 'A', obtained: 40, max: 50 }, { name: 'B', obtained: NaN, max: 50 }]);
    expect(s.totalMax).toBe(50);
    expect(s.percentage).toBe(80);
  });
  it('caps obtained at max', () => {
    expect(summarise([{ name: 'A', obtained: 120, max: 100 }]).percentage).toBe(100);
  });
});

describe('marksToTarget', () => {
  it('marks needed in remaining exams to hit a target', () => {
    // have 225/300, one 100-mark exam left, want 80% overall → need 0.8*400 - 225 = 95
    expect(marksToTarget(225, 300, 100, 80)).toBe(95);
  });
  it('returns 0 when already at target', () => {
    expect(marksToTarget(320, 400, 100, 60)).toBe(0);
  });
  it('returns -1 when impossible', () => {
    expect(marksToTarget(100, 300, 100, 90)).toBe(-1);
  });
  it('guards invalid input', () => {
    expect(marksToTarget(100, 300, 0, 80)).toBe(0);
  });
});
