import { describe, it, expect, beforeEach } from 'vitest';
import { recordMasteryResult, getStats, getMasteryCounts } from './mastery';

describe('mastery progression', () => {
  beforeEach(() => { localStorage.clear(); });

  it('starts unfamiliar (no attempts)', () => {
    const stats = getStats('c1');
    expect(stats.level).toBe('unfamiliar');
    expect(stats.accuracy).toBe(0);
  });

  it('becomes familiar after some correct answers', () => {
    recordMasteryResult('c1', 3, 5); // 3/5 correct
    const stats = getStats('c1');
    expect(stats.level).toBe('familiar');
    expect(stats.accuracy).toBe(60);
    expect(stats.attempts).toBe(5);
    expect(stats.correct).toBe(3);
  });

  it('reaches proficient at ≥80% recent accuracy', () => {
    // 12 correct out of 15 = 80%
    recordMasteryResult('c1', 12, 15);
    const stats = getStats('c1');
    expect(stats.level).toBe('proficient');
    expect(stats.recentAccuracy).toBe(80);
  });

  it('reaches mastered at ≥90% recent accuracy', () => {
    // 14 correct out of 15 = ~93%
    recordMasteryResult('c1', 14, 15);
    const stats = getStats('c1');
    expect(stats.level).toBe('mastered');
    expect(stats.recentAccuracy).toBeGreaterThanOrEqual(90);
  });

  it('reaches mastered with 5 consecutive correct (via streak)', () => {
    // recordMasteryResult(key, correct, total) creates attempts in order:
    // [T, T, T, T, T, F, F, F, F, F, F, F, F, F, F] for (5, 15)
    // So the FIRST 5 are correct, not the last 5. The streak at end is 0.
    // To get mastered via streak, we need the LAST 5 to be correct.
    // So we record multiple sessions to build that pattern:
    // First session: some wrong, then correct
    recordMasteryResult('c1', 1, 10); // [T,F,F,F,F,F,F,F,F,F] — streak 0
    // Second session: add 5 more correct to the window
    recordMasteryResult('c1', 5, 5);  // [T,F,F,F,F,F,F,F,F,F,T,T,T,T,T] — streak 5 at end
    const stats = getStats('c1');
    expect(stats.level).toBe('mastered');
    expect(stats.streak).toBe(5);
  });

  it('is per-chapter independent', () => {
    recordMasteryResult('c1', 12, 15); // proficient
    recordMasteryResult('c2', 2, 10); // familiar
    expect(getStats('c1').level).toBe('proficient');
    expect(getStats('c2').level).toBe('familiar');
  });

  it('counts mastery across chapters', () => {
    recordMasteryResult('c1', 14, 15); // mastered
    recordMasteryResult('c2', 12, 15); // proficient
    recordMasteryResult('c3', 3, 5); // familiar
    const counts = getMasteryCounts();
    expect(counts.mastered).toBe(1);
    expect(counts.proficient).toBe(1);
    expect(counts.familiar).toBe(1);
    expect(counts.unfamiliar).toBe(0);
  });

  it('ignores empty keys', () => {
    const stats = getStats('');
    expect(stats.level).toBe('unfamiliar');
    expect(stats.accuracy).toBe(0);
  });
});
