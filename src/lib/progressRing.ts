/**
 * progressRing.ts — SVG geometry for the XP progress ring.
 *
 * Pure maths, kept out of the component so the arc can be unit-tested. The
 * level/XP thresholds are NOT duplicated here — getLevel() in gamification.ts
 * already owns those and returns a 0–100 `progress`; this module only turns a
 * percentage into stroke values.
 */

export interface RingGeometry {
  /** Radius of the path the stroke is centred on. */
  radius: number;
  /** Full circumference — the dasharray. */
  circumference: number;
  /** Dashoffset that reveals exactly `percent` of the ring. */
  dashOffset: number;
  /** SVG viewBox side length. */
  size: number;
  /** Centre coordinate (size / 2). */
  center: number;
}

/**
 * Geometry for a ring drawn inside a `size` x `size` box.
 *
 * The radius is inset by half the stroke so the stroke sits fully inside the
 * viewBox — otherwise a thick stroke is clipped at the edges.
 *
 * `percent` is clamped to 0–100 and non-finite input is treated as 0, because
 * XP can arrive from Firestore as undefined/NaN and an NaN dashoffset silently
 * renders nothing at all.
 */
export function ringGeometry(percent: number, size = 96, stroke = 8): RingGeometry {
  const safeSize = Math.max(1, size);
  const safeStroke = Math.max(0, Math.min(stroke, safeSize / 2));
  const radius = Math.max(0, safeSize / 2 - safeStroke / 2);
  const circumference = 2 * Math.PI * radius;
  const p = clampPercent(percent);
  return {
    radius,
    circumference,
    dashOffset: circumference * (1 - p / 100),
    size: safeSize,
    center: safeSize / 2,
  };
}

/** 0–100, with non-finite input treated as 0. */
export function clampPercent(percent: number): number {
  if (!Number.isFinite(percent)) return 0;
  return Math.max(0, Math.min(100, percent));
}

/**
 * XP still needed to reach the next level.
 *
 * getLevel() reports `nextXp: Infinity` at the top level; that becomes 0 here
 * rather than Infinity, so the UI can render "0 to go" instead of "Infinity".
 */
export function xpToNextLevel(xp: number, nextXp: number): number {
  if (!Number.isFinite(nextXp)) return 0;
  const safeXp = Number.isFinite(xp) ? xp : 0;
  return Math.max(0, Math.ceil(nextXp - safeXp));
}

/**
 * Flame size for a streak, as a CSS scale factor.
 *
 * Grows with the streak but saturates, so a 400-day streak does not render a
 * flame the size of the page. 0 days returns 0 so the caller can hide it.
 */
export function flameScale(streakDays: number): number {
  if (!Number.isFinite(streakDays) || streakDays <= 0) return 0;
  const capped = Math.min(streakDays, 30);
  return +(1 + (capped / 30) * 0.6).toFixed(3); // 1.0 -> 1.6
}
