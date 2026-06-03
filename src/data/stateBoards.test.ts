import { describe, expect, it } from 'vitest';
import { STATE_BOARD_SYLLABUS, chapterMatchesBoard } from './stateBoards';

describe('state board syllabus', () => {
  it('has chapters for all four boards', () => {
    const boards = new Set(STATE_BOARD_SYLLABUS.map(c => c.board));
    expect(boards).toContain('AP');
    expect(boards).toContain('TS');
    expect(boards).toContain('Karnataka');
    expect(boards).toContain('Maharashtra');
  });

  it('every chapter is tagged with a non-CBSE board and a valid subject', () => {
    for (const c of STATE_BOARD_SYLLABUS) {
      expect(c.board).toBeDefined();
      expect(c.board).not.toBe('CBSE');
      expect(['Mathematics', 'Science']).toContain(c.subject);
      expect(c.title.length).toBeGreaterThan(2);
      expect(['9', '10']).toContain(c.classLevel);
    }
  });

  it('chapter ids are unique', () => {
    const ids = STATE_BOARD_SYLLABUS.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains a reasonable number of chapters (data actually populated)', () => {
    expect(STATE_BOARD_SYLLABUS.length).toBeGreaterThan(120);
  });

  it('no chapter title contains numbering prefixes or markdown', () => {
    for (const c of STATE_BOARD_SYLLABUS) {
      expect(c.title).not.toMatch(/^\d+[.)]/);
      expect(c.title).not.toContain('**');
    }
  });
});

describe('board content reuse / fallback (no empty class/subject)', () => {
  const cbse = (classLevel: string, subject: string) => ({ classLevel, subject }); // board undefined = CBSE

  it('CBSE shows only CBSE chapters', () => {
    expect(chapterMatchesBoard(cbse('11', 'Physics'), 'CBSE')).toBe(true);
    expect(chapterMatchesBoard({ board: 'TS', classLevel: '10', subject: 'Science' }, 'CBSE')).toBe(false);
  });

  it('NCERT-aligned boards (UP) reuse all CBSE chapters', () => {
    expect(chapterMatchesBoard(cbse('1', 'Mathematics'), 'UP')).toBe(true);
    expect(chapterMatchesBoard(cbse('12', 'Biology'), 'UP')).toBe(true);
    expect(chapterMatchesBoard({ board: 'AP', classLevel: '10', subject: 'Science' }, 'UP')).toBe(false);
  });

  it('Telangana falls back to CBSE for classes/subjects it does not define', () => {
    // TS does NOT define Class 11 — must show NCERT (fixes the empty-page bug)
    expect(chapterMatchesBoard(cbse('11', 'Physics'), 'TS')).toBe(true);
    expect(chapterMatchesBoard(cbse('1', 'Mathematics'), 'TS')).toBe(true);
    expect(chapterMatchesBoard(cbse('8', 'Science'), 'TS')).toBe(true);
  });

  it('Telangana shows its OWN chapters PLUS the full CBSE library (additive, deduped)', () => {
    const tsOwn = STATE_BOARD_SYLLABUS.find(c => c.board === 'TS' && c.classLevel === '10' && c.subject === 'Science')!;
    expect(chapterMatchesBoard(tsOwn, 'TS')).toBe(true);
    // CBSE chapters are now ALSO shown to TS students for complete coverage…
    expect(chapterMatchesBoard(cbse('10', 'Science'), 'TS')).toBe(true);
    // …except an exact-title duplicate of a chapter TS already defines (deduped).
    expect(chapterMatchesBoard({ classLevel: tsOwn.classLevel, subject: tsOwn.subject, title: tsOwn.title }, 'TS')).toBe(false);
  });
});
