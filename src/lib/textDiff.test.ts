import { describe, it, expect } from 'vitest';
import { diffLines, diffWords, diffStats, MAX_DIFF_CELLS } from './textDiff';

describe('diffLines', () => {
  it('marks identical text as all-same', () => {
    const d = diffLines('a\nb\nc', 'a\nb\nc');
    expect(d.every((s) => s.type === 'same')).toBe(true);
    expect(d.map((s) => s.text)).toEqual(['a', 'b', 'c']);
  });

  it('detects a changed middle line as del+add', () => {
    const d = diffLines('a\nb\nc', 'a\nB\nc');
    expect(d).toEqual([
      { type: 'same', text: 'a' },
      { type: 'del', text: 'b' },
      { type: 'add', text: 'B' },
      { type: 'same', text: 'c' },
    ]);
  });

  it('detects a pure insertion', () => {
    const d = diffLines('a\nc', 'a\nb\nc');
    expect(d.filter((s) => s.type === 'add')).toEqual([{ type: 'add', text: 'b' }]);
    expect(d.filter((s) => s.type === 'del')).toEqual([]);
  });

  it('detects a pure deletion', () => {
    const d = diffLines('a\nb\nc', 'a\nc');
    expect(d.filter((s) => s.type === 'del')).toEqual([{ type: 'del', text: 'b' }]);
    expect(d.filter((s) => s.type === 'add')).toEqual([]);
  });

  it('handles one side empty', () => {
    const d = diffLines('', 'x\ny');
    expect(d).toEqual([
      { type: 'del', text: '' },
      { type: 'add', text: 'x' },
      { type: 'add', text: 'y' },
    ]);
  });

  it('preserves reading order across multiple edits', () => {
    const d = diffLines('one\ntwo\nthree', 'one\n2\nthree\nfour');
    expect(d.map((s) => `${s.type}:${s.text}`)).toEqual([
      'same:one', 'del:two', 'add:2', 'same:three', 'add:four',
    ]);
  });

  it('throws on inputs above the cell guard', () => {
    const big = Array.from({ length: 2100 }, (_, i) => `line ${i}`).join('\n'); // 2100*2100 > 4M
    expect(() => diffLines(big, big + '\nx')).toThrow(/too large/i);
  });

  it('stays under the guard for moderate inputs', () => {
    const a = Array.from({ length: 1000 }, (_, i) => `l${i}`).join('\n');
    expect(1001 * 1001).toBeLessThan(MAX_DIFF_CELLS);
    expect(() => diffLines(a, a)).not.toThrow();
  });
});

describe('diffWords', () => {
  it('highlights only the changed word', () => {
    const d = diffWords('the quick brown fox', 'the quick red fox');
    expect(d.filter((s) => s.type === 'del').map((s) => s.text)).toEqual(['brown']);
    expect(d.filter((s) => s.type === 'add').map((s) => s.text)).toEqual(['red']);
  });

  it('reassembles the NEW text from same+add segments (spacing preserved)', () => {
    const d = diffWords('the quick brown fox', 'the quick red fox');
    expect(d.filter((s) => s.type !== 'del').map((s) => s.text).join('')).toBe('the quick red fox');
  });

  it('reassembles the OLD text from same+del segments', () => {
    const d = diffWords('a b c', 'a x c');
    expect(d.filter((s) => s.type !== 'add').map((s) => s.text).join('')).toBe('a b c');
  });

  it('is all-same for identical lines', () => {
    expect(diffWords('hello world', 'hello world').every((s) => s.type === 'same')).toBe(true);
  });

  it('handles a pure word insertion', () => {
    const d = diffWords('read the book', 'read the whole book');
    expect(d.filter((s) => s.type === 'add').map((s) => s.text.trim()).filter(Boolean)).toEqual(['whole']);
    expect(d.some((s) => s.type === 'del')).toBe(false);
  });
});

describe('diffStats', () => {
  it('counts added/removed/same and identical flag', () => {
    const d = diffLines('a\nb\nc', 'a\nB\nc');
    expect(diffStats(d)).toEqual({ added: 1, removed: 1, same: 2, identical: false });
  });

  it('flags identical inputs', () => {
    const d = diffLines('same\ntext', 'same\ntext');
    const s = diffStats(d);
    expect(s.identical).toBe(true);
    expect(s.added).toBe(0);
    expect(s.removed).toBe(0);
  });
});
