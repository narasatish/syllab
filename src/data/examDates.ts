/**
 * examDates.ts — exam schedule data for the homepage "Exam watch" section.
 *
 * HARD RULE: never invent a date. Every entry is either
 *   status 'confirmed' — an official date published by the conducting body and
 *                        verified against that body's OWN page or document, or
 *   status 'awaiting'  — no official date yet, so we say so and point at the
 *                        source, instead of counting down to a guess.
 *
 * "Verified against the primary source" means exactly that. CLAT 2027 is
 * confirmed here because the Consortium's own press release PDF says, in as
 * many words: "CLAT 2027 shall be conducted on Sunday, 6th December, 2026,
 * from 2:00 p.m. to 4:00 p.m." Coaching sites reporting the same date were NOT
 * treated as sufficient.
 *
 * NDA & NA (I) 2027 is a deliberate example of the rule biting. Several
 * outlets report UPSC's 2027 annual calendar (released 20 May 2026) putting it
 * on 11 April 2027, and that is probably right — but the calendar document
 * itself could not be read at the time of writing, so it stays 'awaiting'
 * rather than getting a countdown on a date nobody here has actually seen.
 *
 * Checked 2026-08-09: no official 2027 date existed for JEE Main (NTA brochure
 * due ~Nov 2026), NEET UG (NTA calendar due ~Sep 2026), or the CBSE boards
 * (date sheet due ~Oct 2026). State CETs generally announce 3-5 months ahead.
 * `expectedWindow` records the historical pattern as PROSE ONLY — never as a
 * Date the UI can count down to.
 *
 * Every sourceUrl below returned HTTP 200 on 2026-08-09.
 *
 * TO PROMOTE AN EXAM once the real date is published: set status 'confirmed',
 * fill `date`, update `verifiedOn`, and note the primary source in `sourceNote`.
 * The card becomes a live countdown automatically.
 */

export type ExamStatus = 'confirmed' | 'awaiting';

export interface ExamEntry {
  id: string;
  name: string;
  /** Short label for the compact chip / card header. */
  short: string;
  body: string;
  status: ExamStatus;
  /** ISO date. REQUIRED for 'confirmed', and MUST be absent for 'awaiting'. */
  date?: string;
  /** How we know, for 'confirmed'. Forces the provenance to be written down. */
  sourceNote?: string;
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

const CHECKED = '2026-08-09';

export const EXAMS: ExamEntry[] = [
  {
    id: 'clat-2027',
    name: 'CLAT 2027',
    short: 'CLAT',
    body: 'Consortium of NLUs',
    status: 'confirmed',
    date: '2026-12-06',
    sourceNote:
      'Consortium press release: "CLAT 2027 shall be conducted on Sunday, 6th December, 2026, from 2:00 p.m. to 4:00 p.m." Applications 3 Aug – 31 Oct 2026.',
    sourceUrl: 'https://consortiumofnlus.ac.in/',
    sourceLabel: 'consortiumofnlus.ac.in',
    verifiedOn: CHECKED,
  },

  /* ── National ─────────────────────────────────────────────────────────── */
  {
    id: 'jee-main-2027',
    name: 'JEE Main 2027 (Session 1)',
    short: 'JEE Main',
    body: 'NTA',
    status: 'awaiting',
    expectedWindow: 'usually late January',
    announcementDue: 'NTA information brochure expected November 2026',
    sourceUrl: 'https://jeemain.nta.nic.in/',
    sourceLabel: 'jeemain.nta.nic.in',
    verifiedOn: CHECKED,
  },
  {
    id: 'jee-advanced-2027',
    name: 'JEE Advanced 2027',
    short: 'JEE Advanced',
    body: 'IIT (rotating host)',
    status: 'awaiting',
    expectedWindow: 'usually late May',
    announcementDue: 'announced by the hosting IIT, typically early in the year',
    sourceUrl: 'https://jeeadv.ac.in/',
    sourceLabel: 'jeeadv.ac.in',
    verifiedOn: CHECKED,
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
    verifiedOn: CHECKED,
  },
  {
    id: 'cuet-ug-2027',
    name: 'CUET UG 2027',
    short: 'CUET UG',
    body: 'NTA',
    status: 'awaiting',
    expectedWindow: 'usually May–June',
    announcementDue: 'NTA 2027 exam calendar expected September 2026',
    sourceUrl: 'https://cuet.nta.nic.in/',
    sourceLabel: 'cuet.nta.nic.in',
    verifiedOn: CHECKED,
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
    verifiedOn: CHECKED,
  },
  {
    id: 'nda-1-2027',
    name: 'NDA & NA (I) 2027',
    short: 'NDA (I)',
    body: 'UPSC',
    status: 'awaiting',
    expectedWindow: 'usually April',
    announcementDue: "UPSC's 2027 annual calendar is out — check it for the exact date",
    sourceUrl: 'https://upsc.gov.in/examinations/exam-calendar',
    sourceLabel: 'upsc.gov.in',
    verifiedOn: CHECKED,
  },

  /* ── State & private engineering entrances ────────────────────────────── */
  {
    id: 'ts-eapcet-2027',
    name: 'TS EAPCET 2027 (formerly TS EAMCET)',
    short: 'TS EAPCET',
    body: 'TGCHE',
    status: 'awaiting',
    expectedWindow: 'usually April–May',
    announcementDue: 'schedule typically out 3–4 months before',
    sourceUrl: 'https://eapcet.tgche.ac.in/',
    sourceLabel: 'eapcet.tgche.ac.in',
    verifiedOn: CHECKED,
  },
  {
    id: 'ap-eapcet-2027',
    name: 'AP EAPCET 2027 (formerly AP EAMCET)',
    short: 'AP EAPCET',
    body: 'APSCHE',
    status: 'awaiting',
    expectedWindow: 'usually April–May',
    announcementDue: 'schedule typically out 3–4 months before',
    sourceUrl: 'https://cets.apsche.ap.gov.in/EAPCET/',
    sourceLabel: 'cets.apsche.ap.gov.in',
    verifiedOn: CHECKED,
  },
  {
    id: 'kcet-2027',
    name: 'Karnataka CET 2027',
    short: 'KCET',
    body: 'KEA',
    status: 'awaiting',
    expectedWindow: 'usually April',
    announcementDue: 'KEA notification typically out 2–3 months before',
    sourceUrl: 'https://cetonline.karnataka.gov.in/kea/',
    sourceLabel: 'cetonline.karnataka.gov.in',
    verifiedOn: CHECKED,
  },
  {
    id: 'mht-cet-2027',
    name: 'MHT CET 2027',
    short: 'MHT CET',
    body: 'Maharashtra CET Cell',
    status: 'awaiting',
    expectedWindow: 'usually April–May',
    announcementDue: 'CET Cell schedule typically out 3–4 months before',
    sourceUrl: 'https://cetcell.mahacet.org/',
    sourceLabel: 'cetcell.mahacet.org',
    verifiedOn: CHECKED,
  },
  {
    id: 'wbjee-2027',
    name: 'WBJEE 2027',
    short: 'WBJEE',
    body: 'WBJEEB',
    status: 'awaiting',
    expectedWindow: 'usually late April',
    announcementDue: 'WBJEEB notification typically out 3–4 months before',
    sourceUrl: 'https://wbjeeb.nic.in/',
    sourceLabel: 'wbjeeb.nic.in',
    verifiedOn: CHECKED,
  },
  {
    id: 'gujcet-2027',
    name: 'GUJCET 2027',
    short: 'GUJCET',
    body: 'GSEB',
    status: 'awaiting',
    expectedWindow: 'usually March–April',
    announcementDue: 'GSEB schedule typically out 2–3 months before',
    sourceUrl: 'https://gseb.org/',
    sourceLabel: 'gseb.org',
    verifiedOn: CHECKED,
  },
  {
    id: 'bitsat-2027',
    name: 'BITSAT 2027',
    short: 'BITSAT',
    body: 'BITS Pilani',
    status: 'awaiting',
    expectedWindow: 'usually May and June, in two sessions',
    announcementDue: 'BITS admissions notification typically out in January',
    sourceUrl: 'https://www.bitsadmission.com/',
    sourceLabel: 'bitsadmission.com',
    verifiedOn: CHECKED,
  },
  {
    id: 'comedk-2027',
    name: 'COMEDK UGET 2027',
    short: 'COMEDK',
    body: 'COMEDK',
    status: 'awaiting',
    expectedWindow: 'usually May',
    announcementDue: 'COMEDK notification typically out in January',
    sourceUrl: 'https://www.comedk.org/',
    sourceLabel: 'comedk.org',
    verifiedOn: CHECKED,
  },
  {
    id: 'viteee-2027',
    name: 'VITEEE 2027',
    short: 'VITEEE',
    body: 'VIT',
    status: 'awaiting',
    expectedWindow: 'usually April',
    announcementDue: 'VIT applications typically open in November',
    sourceUrl: 'https://viteee.vit.ac.in/',
    sourceLabel: 'viteee.vit.ac.in',
    verifiedOn: CHECKED,
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
