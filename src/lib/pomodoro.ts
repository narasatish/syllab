/**
 * pomodoro.ts — pure, testable Pomodoro cycle logic. The Pomodoro technique
 * alternates focused work with short breaks, and a longer break after every few
 * focus sessions. Durations live here as defaults; the page owns the ticking.
 */
export type Phase = 'focus' | 'short' | 'long';

export interface PomodoroSettings {
  focus: number; // minutes
  short: number;
  long: number;
  longEvery: number; // a long break after this many focus sessions
}

export const DEFAULT_SETTINGS: PomodoroSettings = { focus: 25, short: 5, long: 15, longEvery: 4 };

export const PHASE_LABEL: Record<Phase, string> = { focus: 'Focus', short: 'Short break', long: 'Long break' };

/**
 * Given the phase that just finished and the number of focus sessions completed
 * so far (including the one that just finished, if `finished` is 'focus'),
 * return the next phase. A long break comes after every `longEvery`-th focus.
 */
export function nextPhase(finished: Phase, completedFocus: number, longEvery = DEFAULT_SETTINGS.longEvery): Phase {
  if (finished === 'focus') {
    return completedFocus > 0 && completedFocus % longEvery === 0 ? 'long' : 'short';
  }
  return 'focus';
}

/** Duration (in minutes) of a phase for the given settings. */
export function phaseMinutes(phase: Phase, s: PomodoroSettings): number {
  return phase === 'focus' ? s.focus : phase === 'short' ? s.short : s.long;
}

/** mm:ss from a whole number of seconds. */
export function mmss(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
