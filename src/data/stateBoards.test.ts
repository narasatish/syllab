import { describe, expect, it } from 'vitest';
import { STATE_BOARD_SYLLABUS } from './stateBoards';

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
