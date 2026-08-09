import { describe, it, expect } from 'vitest';
import { EXAMS, daysUntil, upcomingConfirmed, awaitingDate, type ExamEntry } from './examDates';

/**
 * These exist mainly to enforce the honesty invariant: the strip must never be
 * able to count down to a date nobody official has published. A future edit
 * that adds a guessed date should fail here, not ship.
 */

describe('exam data integrity', () => {
  it('every entry has a name, body, official source and a verified date', () => {
    for (const e of EXAMS) {
      expect(e.name.trim().length, `${e.id}: no name`).toBeGreaterThan(0);
      expect(e.short.trim().length, `${e.id}: no short label`).toBeGreaterThan(0);
      expect(e.body.trim().length, `${e.id}: no conducting body`).toBeGreaterThan(0);
      expect(e.sourceUrl, `${e.id}: source must be https`).toMatch(/^https:\/\//);
      expect(e.verifiedOn, `${e.id}: verifiedOn must be ISO yyyy-mm-dd`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('ids are unique', () => {
    const ids = EXAMS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('a confirmed exam MUST carry a real ISO date', () => {
    for (const e of EXAMS.filter((x) => x.status === 'confirmed')) {
      expect(e.date, `${e.id}: confirmed but no date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(`${e.date}T00:00:00`).getTime()), `${e.id}: unparseable date`).toBe(false);
    }
  });

  // Provenance is the whole point of allowing a countdown at all. A date with
  // no note saying where it came from is indistinguishable from a guess.
  it('a confirmed exam MUST record where the date came from', () => {
    for (const e of EXAMS.filter((x) => x.status === 'confirmed')) {
      expect(e.sourceNote, `${e.id}: confirmed with no sourceNote`).toBeTruthy();
      expect((e.sourceNote ?? '').length, `${e.id}: sourceNote too thin to be evidence`).toBeGreaterThan(30);
    }
  });

  it('covers the exams Indian students actually sit', () => {
    const shorts = EXAMS.map((e) => e.short);
    for (const must of ['JEE Main', 'NEET UG', 'CBSE Boards', 'TS EAPCET', 'AP EAPCET', 'KCET', 'MHT CET', 'WBJEE', 'BITSAT', 'COMEDK', 'VITEEE', 'CUET UG', 'CLAT']) {
      expect(shorts, `missing ${must}`).toContain(must);
    }
  });

  it('an awaiting exam MUST NOT carry a date — that is the whole point', () => {
    for (const e of EXAMS.filter((x) => x.status === 'awaiting')) {
      expect(e.date, `${e.id}: awaiting but has a date; either confirm it or remove it`).toBeUndefined();
      expect(e.announcementDue, `${e.id}: awaiting needs announcementDue so we can tell users when to look`).toBeTruthy();
    }
  });

  it('expectedWindow is prose, never something parseable as a specific day', () => {
    // Guards against "expected 2 May 2027" creeping in and being treated as fact.
    for (const e of EXAMS) {
      if (!e.expectedWindow) continue;
      expect(/\d{4}-\d{2}-\d{2}/.test(e.expectedWindow), `${e.id}: expectedWindow looks like an ISO date`).toBe(false);
      expect(/\b\d{1,2}\s+\w+\s+20\d\d\b/.test(e.expectedWindow), `${e.id}: expectedWindow names a specific day`).toBe(false);
    }
  });
});

describe('daysUntil', () => {
  const from = new Date(2026, 7, 9); // 9 Aug 2026, local

  it('counts whole days forward', () => {
    expect(daysUntil('2026-08-10', from)).toBe(1);
    expect(daysUntil('2026-09-08', from)).toBe(30);
  });

  it('is 0 on the day itself', () => {
    expect(daysUntil('2026-08-09', from)).toBe(0);
  });

  it('goes negative once past', () => {
    expect(daysUntil('2026-08-01', from)).toBe(-8);
  });

  it('is unaffected by the time of day it is called', () => {
    const morning = new Date(2026, 7, 9, 0, 5);
    const night = new Date(2026, 7, 9, 23, 55);
    expect(daysUntil('2026-12-25', morning)).toBe(daysUntil('2026-12-25', night));
  });
});

describe('selectors', () => {
  const now = new Date(2026, 7, 9);
  const fixture: ExamEntry[] = [
    { id: 'past', name: 'Past', short: 'P', body: 'X', status: 'confirmed', date: '2026-01-01', sourceUrl: 'https://a.test/', sourceLabel: 'a', verifiedOn: '2026-08-09' },
    { id: 'soon', name: 'Soon', short: 'S', body: 'X', status: 'confirmed', date: '2026-09-01', sourceUrl: 'https://a.test/', sourceLabel: 'a', verifiedOn: '2026-08-09' },
    { id: 'later', name: 'Later', short: 'L', body: 'X', status: 'confirmed', date: '2027-01-01', sourceUrl: 'https://a.test/', sourceLabel: 'a', verifiedOn: '2026-08-09' },
    { id: 'tbd', name: 'TBD', short: 'T', body: 'X', status: 'awaiting', announcementDue: 'soon', sourceUrl: 'https://a.test/', sourceLabel: 'a', verifiedOn: '2026-08-09' },
  ];

  it('drops exams whose date has passed rather than showing a negative count', () => {
    expect(upcomingConfirmed(fixture, now).map((e) => e.id)).toEqual(['soon', 'later']);
  });

  it('sorts soonest first', () => {
    const ids = upcomingConfirmed(fixture, now).map((e) => e.id);
    expect(ids[0]).toBe('soon');
  });

  it('keeps the exam happening today', () => {
    const today: ExamEntry[] = [{ ...fixture[1], date: '2026-08-09' }];
    expect(upcomingConfirmed(today, now)).toHaveLength(1);
  });

  it('separates the awaiting ones', () => {
    expect(awaitingDate(fixture).map((e) => e.id)).toEqual(['tbd']);
  });

  it('CLAT 2027 is the one confirmed date, verified from the Consortium PDF', () => {
    const clat = EXAMS.find((e) => e.id === 'clat-2027');
    expect(clat?.status).toBe('confirmed');
    expect(clat?.date).toBe('2026-12-06');
    // "Sunday, 6th December, 2026" per the official press release.
    expect(new Date('2026-12-06T00:00:00').getDay(), 'the official notice says Sunday').toBe(0);
  });

  it('most exams are still awaiting a date — that is the honest state, not a bug', () => {
    expect(awaitingDate().length).toBeGreaterThan(0);
  });
});
