/**
 * textStats.ts — pure text metrics for the Word & Character Counter.
 * Word count, character counts, sentences, paragraphs, lines, plus reading and
 * speaking time estimates. No dependencies; fully unit-tested.
 */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingSeconds: number;  // ~200 words/min
  speakingSeconds: number; // ~130 words/min
}

export function textStats(text: string): TextStats {
  const s = String(text ?? '');
  const trimmed = s.trim();

  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const characters = s.length;
  const charactersNoSpaces = s.replace(/\s/g, '').length;
  const sentences = trimmed ? ((trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || 1) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).length : 0;
  const lines = s === '' ? 0 : s.split(/\n/).length;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingSeconds: Math.round((words / 200) * 60),
    speakingSeconds: Math.round((words / 130) * 60),
  };
}

/** Format a whole number of seconds as a short human string, e.g. 95 → "1 min 35 sec". */
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return `${s} sec`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem ? `${m} min ${rem} sec` : `${m} min`;
}
