import { describe, it, expect } from 'vitest';
import { Ambience, AMBIENCE_OPTIONS, type AmbienceKey } from './ambience';

describe('AMBIENCE_OPTIONS', () => {
  it('includes an Off option and several soundscapes', () => {
    expect(AMBIENCE_OPTIONS.length).toBeGreaterThanOrEqual(6);
    expect(AMBIENCE_OPTIONS.some((o) => o.key === 'off')).toBe(true);
  });
  it('has unique keys and a label + emoji for each', () => {
    const keys = AMBIENCE_OPTIONS.map((o) => o.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const o of AMBIENCE_OPTIONS) {
      expect(o.label.trim().length).toBeGreaterThan(0);
      expect(o.emoji.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('Ambience controller (no Web Audio in test env)', () => {
  it('constructs and reports current = off', () => {
    const a = new Ambience();
    expect(a.current).toBe('off');
  });

  it('never throws when AudioContext is unavailable', async () => {
    const a = new Ambience();
    // jsdom has no AudioContext → play() must fail silently, not throw.
    for (const key of AMBIENCE_OPTIONS.map((o) => o.key) as AmbienceKey[]) {
      await expect(a.play(key)).resolves.toBeUndefined();
    }
    expect(() => a.setVolume(0.3)).not.toThrow();
    expect(() => a.stop()).not.toThrow();
    expect(() => a.dispose()).not.toThrow();
  });

  it('stop() resets current to off', async () => {
    const a = new Ambience();
    await a.play('rain');
    a.stop();
    expect(a.current).toBe('off');
  });
});
