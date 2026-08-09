/**
 * quizRotation.ts — the state machine behind the homepage quiz showcase.
 *
 * Kept as pure functions, deliberately, so the behaviour can be unit-tested
 * without a DOM, fake timers or a rendered component. The component owns only
 * "call advance() when the clock says so"; every decision about what is on
 * screen lives here.
 *
 * Cycle per question:
 *   asking   — question + options, nothing selected
 *   answering— the correct option is highlighted as if picked
 *   revealed — answer confirmed, explanation line visible
 *   then it moves to the next question and starts again, wrapping forever.
 */

export type QuizPhase = 'asking' | 'answering' | 'revealed';

export interface QuizRotationState {
  /** Index into the sample array. */
  index: number;
  phase: QuizPhase;
  /** Bumped every full cycle; lets the UI key an animation without re-mounting. */
  loops: number;
}

/** How long each phase sits on screen. */
export const PHASE_MS: Record<QuizPhase, number> = {
  asking: 2600,
  answering: 900,
  revealed: 2200,
};

export const INITIAL_STATE: QuizRotationState = { index: 0, phase: 'asking', loops: 0 };

/**
 * Next state. `total` is the number of questions available.
 *
 * Wraps at the end and increments `loops`. A `total` of 0 or less is treated as
 * a no-op rather than dividing by zero or producing NaN — the component may
 * render before data is ready.
 */
export function advance(state: QuizRotationState, total: number): QuizRotationState {
  if (!Number.isFinite(total) || total <= 0) return state;

  if (state.phase === 'asking') return { ...state, phase: 'answering' };
  if (state.phase === 'answering') return { ...state, phase: 'revealed' };

  // revealed -> next question
  const next = state.index + 1;
  const wrapped = next >= total;
  return {
    index: wrapped ? 0 : next,
    phase: 'asking',
    loops: wrapped ? state.loops + 1 : state.loops,
  };
}

/** Milliseconds the current phase should remain on screen. */
export function phaseDuration(state: QuizRotationState): number {
  return PHASE_MS[state.phase];
}

/** Should the correct option be shown as chosen? */
export function isOptionHighlighted(state: QuizRotationState, optionIndex: number, correct: number): boolean {
  if (optionIndex !== correct) return false;
  return state.phase === 'answering' || state.phase === 'revealed';
}

/** Only true once the answer is confirmed, so the tick does not appear early. */
export function isAnswerRevealed(state: QuizRotationState): boolean {
  return state.phase === 'revealed';
}

/** One full pass through every question, for documentation and tests. */
export function cycleDurationMs(total: number): number {
  const perQuestion = PHASE_MS.asking + PHASE_MS.answering + PHASE_MS.revealed;
  return Math.max(0, total) * perQuestion;
}
