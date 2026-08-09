import { describe, it, expect } from 'vitest';
import {
  advance, phaseDuration, isOptionHighlighted, isAnswerRevealed,
  cycleDurationMs, INITIAL_STATE, PHASE_MS,
  type QuizRotationState,
} from './quizRotation';

describe('advance', () => {
  it('walks asking -> answering -> revealed', () => {
    let s = INITIAL_STATE;
    expect(s.phase).toBe('asking');
    s = advance(s, 5); expect(s.phase).toBe('answering');
    s = advance(s, 5); expect(s.phase).toBe('revealed');
  });

  it('moves to the next question after revealed, back to asking', () => {
    let s: QuizRotationState = { index: 0, phase: 'revealed', loops: 0 };
    s = advance(s, 5);
    expect(s).toEqual({ index: 1, phase: 'asking', loops: 0 });
  });

  it('wraps to the first question and counts the loop', () => {
    const s = advance({ index: 4, phase: 'revealed', loops: 0 }, 5);
    expect(s).toEqual({ index: 0, phase: 'asking', loops: 1 });
  });

  it('never returns an index outside the array, over many steps', () => {
    let s = INITIAL_STATE;
    for (let i = 0; i < 200; i++) {
      s = advance(s, 5);
      expect(s.index).toBeGreaterThanOrEqual(0);
      expect(s.index).toBeLessThan(5);
    }
  });

  it('visits every question in order across one loop', () => {
    let s = INITIAL_STATE;
    const seen: number[] = [s.index];
    while (s.loops === 0) {
      s = advance(s, 4);
      if (s.phase === 'asking' && s.loops === 0) seen.push(s.index);
    }
    expect(seen).toEqual([0, 1, 2, 3]);
  });

  it('is pure — the input state is not mutated', () => {
    const s: QuizRotationState = { index: 2, phase: 'asking', loops: 7 };
    const copy = { ...s };
    advance(s, 5);
    expect(s).toEqual(copy);
  });

  it('handles a single question by looping on itself', () => {
    let s = INITIAL_STATE;
    s = advance(s, 1); s = advance(s, 1); s = advance(s, 1);
    expect(s).toEqual({ index: 0, phase: 'asking', loops: 1 });
  });

  // The component can render before data arrives; this must not produce NaN
  // or an out-of-range index.
  it.each([0, -1, NaN, Infinity])('is a no-op for a total of %p', (total) => {
    const s: QuizRotationState = { index: 0, phase: 'asking', loops: 0 };
    expect(advance(s, total as number)).toBe(s);
  });
});

describe('phaseDuration', () => {
  it('returns the configured duration for each phase', () => {
    expect(phaseDuration({ index: 0, phase: 'asking', loops: 0 })).toBe(PHASE_MS.asking);
    expect(phaseDuration({ index: 0, phase: 'answering', loops: 0 })).toBe(PHASE_MS.answering);
    expect(phaseDuration({ index: 0, phase: 'revealed', loops: 0 })).toBe(PHASE_MS.revealed);
  });

  it('every phase lasts long enough to be readable and is finite', () => {
    for (const ms of Object.values(PHASE_MS)) {
      expect(Number.isFinite(ms)).toBe(true);
      expect(ms).toBeGreaterThanOrEqual(600);
    }
  });
});

describe('isOptionHighlighted', () => {
  const at = (phase: QuizRotationState['phase']): QuizRotationState => ({ index: 0, phase, loops: 0 });

  it('highlights nothing while still asking', () => {
    expect(isOptionHighlighted(at('asking'), 2, 2)).toBe(false);
  });

  it('highlights only the correct option once answering', () => {
    expect(isOptionHighlighted(at('answering'), 2, 2)).toBe(true);
    for (const wrong of [0, 1, 3]) {
      expect(isOptionHighlighted(at('answering'), wrong, 2)).toBe(false);
    }
  });

  it('keeps the correct option highlighted through reveal', () => {
    expect(isOptionHighlighted(at('revealed'), 2, 2)).toBe(true);
  });

  it('never highlights a wrong option in any phase', () => {
    for (const phase of ['asking', 'answering', 'revealed'] as const) {
      expect(isOptionHighlighted(at(phase), 0, 3)).toBe(false);
    }
  });
});

describe('isAnswerRevealed', () => {
  it('is true only in the revealed phase', () => {
    expect(isAnswerRevealed({ index: 0, phase: 'asking', loops: 0 })).toBe(false);
    expect(isAnswerRevealed({ index: 0, phase: 'answering', loops: 0 })).toBe(false);
    expect(isAnswerRevealed({ index: 0, phase: 'revealed', loops: 0 })).toBe(true);
  });
});

describe('cycleDurationMs', () => {
  it('is the per-question total times the number of questions', () => {
    const per = PHASE_MS.asking + PHASE_MS.answering + PHASE_MS.revealed;
    expect(cycleDurationMs(5)).toBe(per * 5);
  });

  it('is never negative', () => {
    expect(cycleDurationMs(-3)).toBe(0);
    expect(cycleDurationMs(0)).toBe(0);
  });
});
