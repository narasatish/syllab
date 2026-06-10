/**
 * Student calculators — pure, framework-free maths so it can be unit-tested.
 * Powers the free /calculators tools (percentage, CGPA↔%, attendance).
 */

/** Marks → percentage. Returns 0 for non-positive totals. Rounded to 2 dp. */
export function percentage(obtained: number, total: number): number {
  if (total <= 0) return 0;
  return round2((obtained / total) * 100);
}

/** CBSE CGPA → percentage (default multiplier 9.5). */
export function cgpaToPercentage(cgpa: number, factor = 9.5): number {
  if (cgpa < 0) return 0;
  return round2(cgpa * factor);
}

/** Percentage → CGPA (default divisor 9.5). */
export function percentageToCgpa(pct: number, factor = 9.5): number {
  if (pct <= 0 || factor <= 0) return 0;
  return round2(pct / factor);
}

/** Current attendance percentage. */
export function attendancePercent(attended: number, total: number): number {
  if (total <= 0) return 0;
  return round2((Math.min(attended, total) / total) * 100);
}

/**
 * How many upcoming classes you can SKIP and still stay at/above `target`%.
 * Returns 0 if you're already below target.
 */
export function classesYouCanSkip(attended: number, total: number, target: number): number {
  if (target <= 0 || target > 100 || total <= 0) return 0;
  // attended / (total + x) >= target/100  →  x <= attended*100/target - total
  const x = Math.floor((attended * 100) / target - total);
  return Math.max(0, x);
}

/**
 * How many upcoming classes you must ATTEND IN A ROW to reach `target`%.
 * Returns 0 if already at/above target. Returns -1 if target is unreachable
 * (target >= 100 while you've already missed classes).
 */
export function classesToReachTarget(attended: number, total: number, target: number): number {
  if (target <= 0) return 0;
  if (attendancePercent(attended, total) >= target) return 0;
  if (target >= 100) return attended === total ? 0 : -1; // can never hit 100% after a miss
  // (attended + x)/(total + x) >= target/100  →  x >= (target*total - 100*attended)/(100 - target)
  const x = Math.ceil((target * total - 100 * attended) / (100 - target));
  return Math.max(0, x);
}

function round2(n: number): number { return Math.round(n * 100) / 100; }
