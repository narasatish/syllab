import { describe, it, expect, beforeEach } from 'vitest';
import { markStep, getMastery, getMasteredCount } from './mastery';

describe('mastery loop', () => {
  beforeEach(() => { localStorage.clear(); });

  it('starts empty (0%)', () => {
    expect(getMastery('c1')).toEqual({ learn: false, practice: false, test: false, pct: 0 });
  });

  it('fills the ring as steps complete', () => {
    markStep('c1', 'learn');
    expect(getMastery('c1').pct).toBe(33);
    markStep('c1', 'practice');
    expect(getMastery('c1').pct).toBe(67);
    const full = markStep('c1', 'test');
    expect(full.pct).toBe(100);
    expect(full).toMatchObject({ learn: true, practice: true, test: true });
  });

  it('is idempotent and per-chapter', () => {
    markStep('c1', 'learn');
    markStep('c1', 'learn');
    expect(getMastery('c1').pct).toBe(33);
    expect(getMastery('c2').pct).toBe(0);
  });

  it('counts fully-mastered chapters', () => {
    (['learn', 'practice', 'test'] as const).forEach((s) => markStep('c1', s));
    markStep('c2', 'learn');
    expect(getMasteredCount()).toBe(1);
  });

  it('ignores an empty chapter id', () => {
    expect(markStep('', 'learn').pct).toBe(0);
  });
});
