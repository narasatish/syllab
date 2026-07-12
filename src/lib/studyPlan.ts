/**
 * Study plan + memory — powers the Study Room's "pick your chapters → flashcards
 * → remember what you're weak in" loop. Pure helpers + a small localStorage store
 * (also mirrored to the dashboard). No network here; AI generation lives in
 * studyFlashcards.ts. Everything degrades gracefully if storage is unavailable.
 */
import { SYLLABUS } from '../data/syllabus';
import type { ClassLevel, Subject } from '../types';

export interface ChapterRef { id: string; title: string; subject: Subject; classLevel: ClassLevel; }

/** Distinct class levels that actually have chapters, sorted 1→12. */
export function availableClasses(): ClassLevel[] {
  const set = new Set<ClassLevel>();
  for (const c of SYLLABUS) set.add(c.classLevel);
  return Array.from(set).sort((a, b) => Number(a) - Number(b));
}

/** Subjects offered for a class. */
export function subjectsFor(classLevel: ClassLevel): Subject[] {
  const set = new Set<Subject>();
  for (const c of SYLLABUS) if (c.classLevel === classLevel) set.add(c.subject);
  return Array.from(set);
}

/** Chapters for a class + subject. */
export function chaptersFor(classLevel: ClassLevel, subject: Subject): ChapterRef[] {
  return SYLLABUS
    .filter((c) => c.classLevel === classLevel && c.subject === subject)
    .map((c) => ({ id: c.id, title: c.title, subject: c.subject, classLevel: c.classLevel }));
}

// ── Study memory (localStorage) ──────────────────────────────────────────────
export interface ChapterStat {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  attempts: number;
  correct: number;   // total correct flashcards across attempts
  total: number;     // total flashcards seen across attempts
  lastScore: number; // 0..1 of the most recent session
  completed: boolean;
  updated: string;   // ISO date
  nextReview?: string; // ISO date the chapter is next due for spaced revision
}

/** Spaced-repetition interval (days) based on the latest score + attempt count. */
function reviewIntervalDays(score: number, attempts: number): number {
  if (score < 0.6) return 1;        // weak → revise tomorrow
  if (score < 0.8) return 3;        // shaky → 3 days
  return attempts <= 2 ? 7 : 14;    // strong → 1–2 weeks
}
function addDays(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export interface StudyMemory { chapters: Record<string, ChapterStat>; }

const MEM_KEY = 'syllab_study_memory_v1';
const LAST_PLAN_KEY = 'syllab_study_lastplan_v1';

export function loadMemory(): StudyMemory {
  try { const r = localStorage.getItem(MEM_KEY); if (r) return JSON.parse(r) as StudyMemory; } catch { /* ignore */ }
  return { chapters: {} };
}
function saveMemory(m: StudyMemory) { try { localStorage.setItem(MEM_KEY, JSON.stringify(m)); } catch { /* ignore */ } }

/** Record a finished flashcard session for one chapter. correct/total in [0..n]. */
export function recordChapterResult(ch: ChapterRef, correct: number, total: number, isoDate: string): ChapterStat {
  const m = loadMemory();
  const prev = m.chapters[ch.id];
  const lastScore = total > 0 ? correct / total : 0;
  const attempts = (prev?.attempts ?? 0) + 1;
  const stat: ChapterStat = {
    id: ch.id, title: ch.title, subject: String(ch.subject), classLevel: String(ch.classLevel),
    attempts,
    correct: (prev?.correct ?? 0) + correct,
    total: (prev?.total ?? 0) + total,
    lastScore,
    completed: prev?.completed ?? false,
    updated: isoDate,
    nextReview: addDays(isoDate, reviewIntervalDays(lastScore, attempts)),
  };
  m.chapters[ch.id] = stat;
  saveMemory(m);
  return stat;
}

/** Toggle a chapter as completed (ticked). */
export function setChapterCompleted(ch: ChapterRef, completed: boolean, isoDate: string) {
  const m = loadMemory();
  const prev = m.chapters[ch.id];
  m.chapters[ch.id] = {
    id: ch.id, title: ch.title, subject: String(ch.subject), classLevel: String(ch.classLevel),
    attempts: prev?.attempts ?? 0, correct: prev?.correct ?? 0, total: prev?.total ?? 0,
    lastScore: prev?.lastScore ?? 0, completed, updated: isoDate, nextReview: prev?.nextReview,
  };
  saveMemory(m);
}

/** Chapters whose spaced-revision date is due (on/before today), weakest first. */
export function dueForReview(todayISO: string, limit = 5): ChapterStat[] {
  const m = loadMemory();
  return Object.values(m.chapters)
    .filter((c) => c.attempts > 0 && c.nextReview && c.nextReview <= todayISO)
    .sort((a, b) => a.lastScore - b.lastScore)
    .slice(0, limit);
}

/** Chapters the student is weak in (mastery < 0.6 after at least one attempt). */
export function weakChapters(limit = 5): ChapterStat[] {
  const m = loadMemory();
  return Object.values(m.chapters)
    .filter((c) => c.total >= 3 && c.correct / Math.max(1, c.total) < 0.6)
    .sort((a, b) => a.correct / Math.max(1, a.total) - b.correct / Math.max(1, b.total))
    .slice(0, limit);
}

/** A short list of chapters studied recently, newest first. */
export function recentChapters(limit = 6): ChapterStat[] {
  const m = loadMemory();
  return Object.values(m.chapters)
    .filter((c) => c.attempts > 0 || c.completed)
    .sort((a, b) => (a.updated < b.updated ? 1 : -1))
    .slice(0, limit);
}

export function masteryPct(c: ChapterStat): number {
  return c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
}

// ── Last plan (so we can pre-fill the entry screen next time) ─────────────────
export interface SavedPlan { classLevel: ClassLevel; subject: Subject; chapterIds: string[]; }
export function loadLastPlan(): SavedPlan | null {
  try { const r = localStorage.getItem(LAST_PLAN_KEY); if (r) return JSON.parse(r) as SavedPlan; } catch { /* ignore */ }
  return null;
}
export function saveLastPlan(p: SavedPlan) { try { localStorage.setItem(LAST_PLAN_KEY, JSON.stringify(p)); } catch { /* ignore */ } }
