/**
 * examDates.ts — exam schedule data for the homepage countdown strip.
 *
 * HARD RULE: never invent a date. Every entry is either
 *   status 'confirmed' — an official date published by the conducting body, or
 *   status 'awaiting'  — no official date yet, so we say so and point at the
 *                        source, instead of counting down to a guess.
 *
 * Checked 2026-08-09: NONE of JEE Main 2027, NEET UG 2027 or the CBSE 2027
 * board exams had official dates. Sources say NTA's 2027 exam calendar is due
 * around September 2026, the CBSE date sheet around October 2026, and the JEE
 * Main information brochure around November 2026. Widely republished "expected"
 * dates (late Jan 2027, 2 May 2027, etc.) are extrapolations from previous
 * years, not announcements, so they are recorded here as `expectedWindow`
 * PROSE ONLY — never as a Date the UI can count down to.
 *
 * TO PROMOTE AN EXAM once the real date is published: set status: 'confirmed',
 * fill `date` with the official date, and update `verifiedOn`. The strip turns
 * into a live countdown automatically; no component changes needed.
 */

export type ExamStatus = 'confirmed' | 'awaiting';

export interface ExamEntry {
  id: string;
  name: string;
  /** Short label for the narrow mobile strip. */
  short: string;
  body: string;
  status: ExamStatus;
  /** ISO date. REQUIRED for 'confirmed', and MUST be absent for 'awaiting'. */
  date?: string;
  /** Plain-English window, for 'awaiting' only. Never parsed, only displayed. */
  expectedWindow?: string;
  /** When the conducting body is expected to publish the real schedule. */
  announcementDue?: string;
  /** Official source a student can check themselves. */
  sourceUrl: string;
  sourceLabel: string;
  /** Date we last checked the source, so staleness is visible. */
  verifiedOn: string;
}

export const EXAMS: ExamEntry[] = [
  {
    id: 'jee-main-2027',
    name: 'JEE Main 2027 (Session 1)',
    short: 'JEE Main',
    body: 'NTA',
    status: 'awaiting',
    expectedWindow: 'usually late January',
    announcementDue: 'NTA notification expected November 2026',
    sourceUrl: 'https://jeemain.nta.nic.in/',
    sourceLabel: 'jeemain.nta.nic.in',
    verifiedOn: '2026-08-09',
  },
  {
    id: 'neet-ug-2027',
    name: 'NEET UG 2027',
    short: 'NEET UG',
    body: 'NTA',
    status: 'awaiting',
    expectedWindow: 'usually the first Sunday of May',
    announcementDue: 'NTA 2027 exam calendar expected September 2026',
    sourceUrl: 'https://neet.nta.nic.in/',
    sourceLabel: 'neet.nta.nic.in',
    verifiedOn: '2026-08-09',
  },
  {
    id: 'cbse-boards-2027',
    name: 'CBSE Board Exams 2027 (Class 10 & 12)',
    short: 'CBSE Boards',
    body: 'CBSE',
    status: 'awaiting',
    expectedWindow: 'usually February–March',
    announcementDue: 'CBSE date sheet expected October 2026',
    sourceUrl: 'https://www.cbse.gov.in/',
    sourceLabel: 'cbse.gov.in',
    verifiedOn: '2026-08-09',
  },
];

/** Whole days from `from` until the exam. Negative once the date has passed. */
export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = new Date(`${isoDate}T00:00:00`);
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((target.getTime() - start.getTime()) / 86_400_000);
}

/**
 * Confirmed exams still in the future, soonest first. An exam whose date has
 * passed drops out rather than showing a negative countdown — a stale date is
 * worse than no date.
 */
export function upcomingConfirmed(exams: ExamEntry[] = EXAMS, now: Date = new Date()): ExamEntry[] {
  return exams
    .filter((e) => e.status === 'confirmed' && e.date && daysUntil(e.date, now) >= 0)
    .sort((a, b) => daysUntil(a.date as string, now) - daysUntil(b.date as string, now));
}

/** Exams with no official date yet. */
export function awaitingDate(exams: ExamEntry[] = EXAMS): ExamEntry[] {
  return exams.filter((e) => e.status === 'awaiting');
}
