/**
 * mastery.ts — per-chapter mastery loop: Learn → Practice → Test.
 *
 * Each chapter has three steps; completing them fills a progress ring. Signals
 * are recorded from the surfaces the student already uses (opening a lesson =
 * "learn", finishing a practice quiz = "practice", a mock/chapter test = "test").
 * Local-first (localStorage), keyed by chapter id.
 */

const LS_KEY = 'syllab:mastery:v1';

export type MasteryStep = 'learn' | 'practice' | 'test';
export const MASTERY_STEPS: MasteryStep[] = ['learn', 'practice', 'test'];

export interface ChapterMastery {
  learn: boolean;
  practice: boolean;
  test: boolean;
  /** 0–100 — fraction of the three steps completed. */
  pct: number;
}

type Store = Record<string, { learn?: boolean; practice?: boolean; test?: boolean }>;

function load(): Store {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') as Store; }
  catch { return {}; }
}
function save(s: Store): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

function toMastery(rec: Store[string] | undefined): ChapterMastery {
  const learn = !!rec?.learn, practice = !!rec?.practice, test = !!rec?.test;
  const done = [learn, practice, test].filter(Boolean).length;
  return { learn, practice, test, pct: Math.round((done / 3) * 100) };
}

/** Mark a step complete for a chapter. No-op without a chapter id. */
export function markStep(chapterId: string, step: MasteryStep): ChapterMastery {
  if (!chapterId) return toMastery(undefined);
  const s = load();
  (s[chapterId] ||= {})[step] = true;
  save(s);
  return toMastery(s[chapterId]);
}

export function getMastery(chapterId: string): ChapterMastery {
  return toMastery(load()[chapterId]);
}

/** Count of fully-mastered chapters (all three steps) — for dashboards. */
export function getMasteredCount(): number {
  return Object.values(load()).filter((r) => r.learn && r.practice && r.test).length;
}
