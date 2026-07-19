import { describe, it, expect } from 'vitest';
import { textStats, formatDuration } from './textStats';

describe('textStats', () => {
  it('counts words and characters', () => {
    const s = textStats('Hello world');
    expect(s.words).toBe(2);
    expect(s.characters).toBe(11);
    expect(s.charactersNoSpaces).toBe(10);
  });

  it('counts sentences', () => {
    expect(textStats('Hello world. How are you? Great!').sentences).toBe(3);
  });

  it('treats text without terminal punctuation as one sentence', () => {
    expect(textStats('just some words').sentences).toBe(1);
  });

  it('counts paragraphs split by blank lines', () => {
    expect(textStats('Para one.\n\nPara two.\n\nPara three.').paragraphs).toBe(3);
  });

  it('counts lines', () => {
    expect(textStats('a\nb\nc').lines).toBe(3);
  });

  it('is all-zero for empty input', () => {
    const s = textStats('');
    expect(s).toMatchObject({ words: 0, characters: 0, sentences: 0, paragraphs: 0, lines: 0 });
  });

  it('handles whitespace-only input', () => {
    expect(textStats('   \n  ').words).toBe(0);
  });

  it('estimates reading time (~200 wpm)', () => {
    const text = Array.from({ length: 200 }, () => 'word').join(' ');
    expect(textStats(text).readingSeconds).toBe(60);
  });
});

describe('formatDuration', () => {
  it('formats under a minute', () => expect(formatDuration(35)).toBe('35 sec'));
  it('formats exact minutes', () => expect(formatDuration(120)).toBe('2 min'));
  it('formats minutes and seconds', () => expect(formatDuration(95)).toBe('1 min 35 sec'));
});
