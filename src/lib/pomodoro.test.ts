import { describe, it, expect } from 'vitest';
import { nextPhase, phaseMinutes, mmss, DEFAULT_SETTINGS } from './pomodoro';

describe('nextPhase', () => {
  it('focus → short break normally, long break every 4th', () => {
    expect(nextPhase('focus', 1)).toBe('short');
    expect(nextPhase('focus', 2)).toBe('short');
    expect(nextPhase('focus', 3)).toBe('short');
    expect(nextPhase('focus', 4)).toBe('long');
    expect(nextPhase('focus', 8)).toBe('long');
  });
  it('any break → focus', () => {
    expect(nextPhase('short', 4)).toBe('focus');
    expect(nextPhase('long', 4)).toBe('focus');
  });
  it('respects a custom longEvery', () => {
    expect(nextPhase('focus', 2, 2)).toBe('long');
    expect(nextPhase('focus', 3, 2)).toBe('short');
  });
});

describe('phaseMinutes', () => {
  it('reads durations from settings', () => {
    expect(phaseMinutes('focus', DEFAULT_SETTINGS)).toBe(25);
    expect(phaseMinutes('short', DEFAULT_SETTINGS)).toBe(5);
    expect(phaseMinutes('long', DEFAULT_SETTINGS)).toBe(15);
  });
});

describe('mmss', () => {
  it('formats seconds as mm:ss', () => {
    expect(mmss(0)).toBe('00:00');
    expect(mmss(65)).toBe('01:05');
    expect(mmss(1500)).toBe('25:00');
    expect(mmss(-5)).toBe('00:00');
  });
});
