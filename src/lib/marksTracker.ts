/**
 * marksTracker.ts — pure, testable maths for the marks / GPA tracker. Given a
 * list of subjects with marks obtained out of a maximum, it computes the overall
 * percentage, the CBSE-style grade per subject, the weakest subject, and how
 * many more marks are needed to reach a target overall percentage.
 */
import { percentage, cbseGrade } from './calculators';

export interface Subject { name: string; obtained: number; max: number }

export interface Summary {
  totalObtained: number;
  totalMax: number;
  percentage: number;       // overall %, 0 if no marks
  grade: string;            // CBSE grade for the overall %
  weakest: string | null;   // subject name with the lowest %
  strongest: string | null; // subject name with the highest %
}

/** Only subjects with a positive max and a valid obtained score count. */
function valid(s: Subject): boolean {
  return s.max > 0 && Number.isFinite(s.obtained) && s.obtained >= 0;
}

export function summarise(subjects: Subject[]): Summary {
  const rows = subjects.filter(valid);
  const totalObtained = rows.reduce((a, s) => a + Math.min(s.obtained, s.max), 0);
  const totalMax = rows.reduce((a, s) => a + s.max, 0);
  const pct = totalMax > 0 ? percentage(totalObtained, totalMax) : 0;
  let weakest: string | null = null, strongest: string | null = null;
  let lo = Infinity, hi = -Infinity;
  for (const s of rows) {
    const p = percentage(s.obtained, s.max);
    if (p < lo) { lo = p; weakest = s.name || 'Untitled'; }
    if (p > hi) { hi = p; strongest = s.name || 'Untitled'; }
  }
  return { totalObtained, totalMax, percentage: pct, grade: cbseGrade(pct).grade, weakest, strongest };
}

/**
 * Marks still needed (out of the remaining max) to reach `targetPct` overall.
 * Returns 0 if already there, or -1 if impossible even with full remaining marks.
 * `remainingMax` = the max marks of exams not yet taken.
 */
export function marksToTarget(totalObtained: number, totalMax: number, remainingMax: number, targetPct: number): number {
  if (remainingMax <= 0 || targetPct <= 0 || targetPct > 100) return 0;
  const needed = (targetPct / 100) * (totalMax + remainingMax) - totalObtained;
  if (needed <= 0) return 0;
  if (needed > remainingMax) return -1;
  return Math.round(needed * 100) / 100;
}
