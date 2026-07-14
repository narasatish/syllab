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

/**
 * Marks you must score in an upcoming exam to reach a target overall %.
 * `scoredSoFar`/`maxSoFar` = marks already earned and their max; `finalMax` = max
 * of the upcoming exam. Returns 0 if the target is already locked in, or -1 if it
 * is impossible (you'd need more than `finalMax`).
 */
export function marksNeededForTarget(
  scoredSoFar: number, maxSoFar: number, finalMax: number, targetPct: number,
): number {
  if (finalMax <= 0 || maxSoFar < 0 || targetPct <= 0 || targetPct > 100) return 0;
  const needed = (targetPct / 100) * (maxSoFar + finalMax) - scoredSoFar;
  if (needed <= 0) return 0;            // already there
  if (needed > finalMax) return -1;     // not achievable in one exam
  return round2(needed);
}

/**
 * Semester GPA (SGPA) from a list of (gradePoints, credits) rows.
 * SGPA = Σ(gradePoints × credits) / Σ(credits). Ignores rows with ≤0 credits.
 * Returns 0 when there are no valid credits.
 */
export function semesterGpa(rows: { points: number; credits: number }[]): number {
  let totalPoints = 0, totalCredits = 0;
  for (const r of rows) {
    if (!(r.credits > 0) || Number.isNaN(r.points)) continue;
    totalPoints += r.points * r.credits;
    totalCredits += r.credits;
  }
  if (totalCredits <= 0) return 0;
  return round2(totalPoints / totalCredits);
}

/**
 * Education-loan / EMI. Standard reducing-balance formula:
 * EMI = P·r·(1+r)^n / ((1+r)^n − 1), r = monthly rate, n = months.
 * Returns rounded rupee figures. r = 0 handled (interest-free).
 */
export function emiPlan(principal: number, annualRatePct: number, years: number): {
  emi: number; totalPayment: number; totalInterest: number; months: number;
} {
  const months = Math.round(years * 12);
  if (principal <= 0 || months <= 0 || annualRatePct < 0) return { emi: 0, totalPayment: 0, totalInterest: 0, months: Math.max(0, months) };
  const r = annualRatePct / 12 / 100;
  let emiExact: number;
  if (r === 0) emiExact = principal / months;
  else { const pow = Math.pow(1 + r, months); emiExact = (principal * r * pow) / (pow - 1); }
  // Report totals from the rounded EMI so the displayed figures reconcile for
  // the user (EMI × months = total payment, exactly).
  const emi = Math.round(emiExact);
  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal, months };
}

/**
 * CUET (UG) style scoring: +5 for a correct answer, −1 for a wrong one,
 * 0 for unattempted. `totalQuestions` sets the max (×5); if omitted, max is
 * derived from attempted (correct + wrong).
 */
export function cuetScore(correct: number, wrong: number, totalQuestions = 0): {
  score: number; max: number; percentage: number;
} {
  const c = Math.max(0, Math.floor(correct || 0));
  const w = Math.max(0, Math.floor(wrong || 0));
  const score = 5 * c - 1 * w;
  const max = (totalQuestions > 0 ? totalQuestions : c + w) * 5;
  const percentage = max > 0 ? round2((score / max) * 100) : 0;
  return { score, max, percentage };
}

/**
 * CBSE absolute grade + grade point from a subject mark (out of 100).
 * A1≥91, A2≥81, B1≥71, B2≥61, C1≥51, C2≥41, D≥33, else E (fail).
 */
export function cbseGrade(marks: number): { grade: string; point: number } {
  const m = Number.isFinite(marks) ? marks : 0;
  if (m >= 91) return { grade: 'A1', point: 10 };
  if (m >= 81) return { grade: 'A2', point: 9 };
  if (m >= 71) return { grade: 'B1', point: 8 };
  if (m >= 61) return { grade: 'B2', point: 7 };
  if (m >= 51) return { grade: 'C1', point: 6 };
  if (m >= 41) return { grade: 'C2', point: 5 };
  if (m >= 33) return { grade: 'D', point: 4 };
  return { grade: 'E', point: 0 };
}

function round2(n: number): number { return Math.round(n * 100) / 100; }
