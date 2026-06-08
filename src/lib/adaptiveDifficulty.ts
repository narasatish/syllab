/**
 * adaptiveDifficulty.ts — Real-time adaptive difficulty adjustment for practice sessions.
 *
 * Maintains a running "ability" signal based on recent answer performance:
 * - Correctness (is the student getting answers right?)
 * - Response speed (are they answering quickly?)
 *
 * Uses a sliding window of the last 3–5 answers to compute an ability score,
 * then targets the next question's difficulty tier (easy/medium/hard).
 *
 * Strategy:
 *   - If ability is high (consistently correct + fast): serve harder questions
 *   - If ability is medium: serve medium questions
 *   - If ability is low (struggling or slow): serve easier questions
 *
 * Gracefully falls back if the available pool lacks questions in the target tier.
 */

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export interface PerformanceRecord {
  correct: boolean;
  /** Response time in seconds. */
  responseTime: number;
  /** Timestamp (ms) for potential future filtering. */
  timestamp: number;
}

export interface AdaptiveState {
  /** Sliding window of recent answers (last 3–5 attempts). */
  recentAnswers: PerformanceRecord[];
  /** Computed ability score (0–1). */
  abilityScore: number;
  /** Current difficulty recommendation. */
  targetDifficulty: DifficultyTier;
}

// =====================================================================
// Thresholds — tweakable based on learning data
// =====================================================================

/** Window size: last N answers used to compute ability. */
const RECENT_WINDOW_SIZE = 5;

/**
 * Ability thresholds map to difficulty targets.
 *   - ≥ 0.75: high ability → hard questions
 *   - 0.50 to 0.75: medium ability → medium questions
 *   - < 0.50: struggling → easy questions
 */
const ABILITY_HARD_THRESHOLD = 0.75;
const ABILITY_MEDIUM_THRESHOLD = 0.5;

/**
 * Bonus for fast answers (encourages fluency).
 * If a student answers within 50% of the time limit, +0.1 bonus to ability.
 */
const FAST_ANSWER_BONUS = 0.1;
const FAST_ANSWER_TIME_RATIO = 0.5; // 50% of the time limit

// =====================================================================
// Initialization
// =====================================================================

export function initializeAdaptiveState(): AdaptiveState {
  return {
    recentAnswers: [],
    abilityScore: 0.5, // Start neutral
    targetDifficulty: 'medium',
  };
}

// =====================================================================
// Core Logic: Record an answer and update ability signal
// =====================================================================

/**
 * Record a single answer attempt.
 * @param state Current adaptive state
 * @param correct Whether the answer was correct
 * @param responseTime Time taken to answer in seconds
 * @param timePerQuestion Time limit for the question in seconds (used to compute "fast" bonus)
 * @returns Updated state with new ability score and target difficulty
 */
export function recordAnswer(
  state: AdaptiveState,
  correct: boolean,
  responseTime: number,
  timePerQuestion: number,
): AdaptiveState {
  const record: PerformanceRecord = {
    correct,
    responseTime,
    timestamp: Date.now(),
  };

  // Add to window
  const updatedAnswers = [...state.recentAnswers, record];

  // Trim to recent window size (keep last N)
  if (updatedAnswers.length > RECENT_WINDOW_SIZE) {
    updatedAnswers.shift();
  }

  // Compute ability score from recent window
  const abilityScore = computeAbility(updatedAnswers, timePerQuestion);

  // Pick target difficulty from ability
  const targetDifficulty = abilityToTarget(abilityScore);

  return {
    recentAnswers: updatedAnswers,
    abilityScore,
    targetDifficulty,
  };
}

// =====================================================================
// Ability Computation
// =====================================================================

/**
 * Compute ability score from recent answers.
 *
 * Formula:
 *   1. Correctness (60% weight): accuracy in recent window
 *   2. Speed bonus (40% weight): if student answers fast, add bonus
 *
 * Result: 0–1 score where 1 = perfect ability.
 */
function computeAbility(
  recentAnswers: PerformanceRecord[],
  timePerQuestion: number,
): number {
  if (recentAnswers.length === 0) return 0.5; // Neutral baseline

  // Correctness: % of recent answers that were correct
  const correctCount = recentAnswers.filter((a) => a.correct).length;
  const correctnessScore = correctCount / recentAnswers.length;

  // Speed bonus: if student answered significantly faster than the limit
  // Example: if limit is 60s and they answer in <30s (50%), add bonus
  const fastAnswers = recentAnswers.filter(
    (a) => a.responseTime < timePerQuestion * 60 * FAST_ANSWER_TIME_RATIO,
  ).length;
  const speedScore = Math.min(1, (fastAnswers / recentAnswers.length) * (1 + FAST_ANSWER_BONUS));

  // Combined: 60% correctness, 40% speed
  const ability = correctnessScore * 0.6 + speedScore * 0.4;

  return Math.min(1, Math.max(0, ability));
}

// =====================================================================
// Ability → Difficulty Mapping
// =====================================================================

/**
 * Map ability score to target difficulty tier.
 */
function abilityToTarget(abilityScore: number): DifficultyTier {
  if (abilityScore >= ABILITY_HARD_THRESHOLD) {
    return 'hard';
  }
  if (abilityScore >= ABILITY_MEDIUM_THRESHOLD) {
    return 'medium';
  }
  return 'easy';
}

// =====================================================================
// Question Selection
// =====================================================================

/**
 * Select the next question from a pool based on current target difficulty.
 *
 * Strategy:
 *   1. Filter questions by target difficulty
 *   2. If pool is empty, fall back to next easiest tier
 *   3. Return a random question from the matching tier (avoid repeats by using used set)
 *   4. If all tiers are exhausted, return null
 *
 * @param availableQuestions Questions not yet shown in this session
 * @param targetDifficulty Current adaptive target (e.g., 'hard')
 * @returns A question matching the target difficulty, or the next available tier
 */
export function selectNextQuestion<T extends { difficulty: string; id?: string }>(
  availableQuestions: T[],
  targetDifficulty: DifficultyTier,
): T | null {
  if (availableQuestions.length === 0) return null;

  // Try target tier first
  const matching = availableQuestions.filter((q) => q.difficulty === targetDifficulty);
  if (matching.length > 0) {
    return matching[Math.floor(Math.random() * matching.length)];
  }

  // Fallback: try adjacent tiers (medium → easy/hard, easy → medium, hard → medium)
  const fallbackTiers: DifficultyTier[] =
    targetDifficulty === 'hard'
      ? ['medium', 'easy']
      : targetDifficulty === 'easy'
        ? ['medium', 'hard']
        : ['easy', 'hard']; // medium → easy then hard

  for (const tier of fallbackTiers) {
    const fallback = availableQuestions.filter((q) => q.difficulty === tier);
    if (fallback.length > 0) {
      return fallback[Math.floor(Math.random() * fallback.length)];
    }
  }

  // Last resort: any question
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
}

// =====================================================================
// Diagnostics / Display Info
// =====================================================================

/**
 * Human-readable description of current adaptive state.
 * Used for showing a "difficulty indicator" UI badge.
 */
export function getAdaptiveIndicator(state: AdaptiveState): {
  direction: 'up' | 'down' | 'steady';
  label: string;
  score: number;
} {
  const prev =
    state.recentAnswers.length >= 2
      ? state.recentAnswers[state.recentAnswers.length - 2].correct
      : null;
  const current =
    state.recentAnswers.length >= 1
      ? state.recentAnswers[state.recentAnswers.length - 1].correct
      : null;

  let direction: 'up' | 'down' | 'steady' = 'steady';
  if (current !== null && prev !== null) {
    if (current && !prev) direction = 'up';
    else if (!current && prev) direction = 'down';
  }

  const label =
    state.targetDifficulty === 'hard'
      ? 'Mastering ↑'
      : state.targetDifficulty === 'easy'
        ? 'Building ↓'
        : 'Adapting →';

  return {
    direction,
    label,
    score: Math.round(state.abilityScore * 100),
  };
}
