import { describe, it, expect } from 'vitest';
import { parseBreakResponse } from './studyRoomAi';

describe('parseBreakResponse', () => {
  it('parses clean JSON', () => {
    const r = parseBreakResponse('{"recap":"Great job!","cards":[{"q":"What is sin 30?","a":"0.5"}]}');
    expect(r.recap).toBe('Great job!');
    expect(r.cards).toHaveLength(1);
    expect(r.cards[0]).toEqual({ q: 'What is sin 30?', a: '0.5' });
  });

  it('strips ```json code fences and surrounding prose', () => {
    const raw = 'Sure!\n```json\n{"recap":"Nice work","cards":[{"q":"Q1","a":"A1"},{"q":"Q2","a":"A2"}]}\n```';
    const r = parseBreakResponse(raw);
    expect(r.recap).toBe('Nice work');
    expect(r.cards).toHaveLength(2);
  });

  it('caps cards at 3 and drops malformed entries', () => {
    const raw = '{"recap":"ok","cards":[{"q":"a","a":"1"},{"q":"b","a":"2"},{"q":"c","a":"3"},{"q":"d","a":"4"},{"bad":true}]}';
    const r = parseBreakResponse(raw);
    expect(r.cards).toHaveLength(3);
  });

  it('falls back to raw text as recap when JSON is missing', () => {
    const r = parseBreakResponse('Just some plain encouragement, no json here.');
    expect(r.recap).toContain('plain encouragement');
    expect(r.cards).toEqual([]);
  });

  it('returns empty for blank input', () => {
    expect(parseBreakResponse('')).toEqual({ recap: '', cards: [] });
    expect(parseBreakResponse('   ')).toEqual({ recap: '', cards: [] });
  });
});
