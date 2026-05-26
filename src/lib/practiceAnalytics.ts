import { Question } from '../types';

const STORAGE_KEY = 'syllab_practice_attempts';
const MAX_ATTEMPTS = 100;

export type PracticeAttempt = {
  id: string;
  userId: string;
  completedAt: string;
  subject: string;
  chapterIds: string[];
  chapterTitles: string[];
  score: number;
  total: number;
  accuracy: number;
  elapsedSeconds: number;
  avgSecondsPerQuestion: number;
};

const readAll = (): PracticeAttempt[] => {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (attempts: PracticeAttempt[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts.slice(0, MAX_ATTEMPTS)));
};

export const recordPracticeAttempt = (
  userId: string | null,
  questions: Question[],
  score: number,
  elapsedSeconds: number,
) => {
  if (!questions.length) return;
  const subjects = Array.from(new Set(questions.map((q) => q.subject).filter(Boolean)));
  const chapterIds = Array.from(new Set(questions.map((q) => q.chapter_id).filter(Boolean)));
  const chapterTitles = Array.from(new Set(questions.map((q) => q.chapter_name).filter(Boolean)));
  const total = questions.length;
  const attempt: PracticeAttempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId: userId || 'guest',
    completedAt: new Date().toISOString(),
    subject: subjects.length === 1 ? subjects[0] : 'Mixed',
    chapterIds,
    chapterTitles,
    score,
    total,
    accuracy: Math.round((score / total) * 100),
    elapsedSeconds: Math.max(1, Math.round(elapsedSeconds)),
    avgSecondsPerQuestion: Math.max(1, Math.round(elapsedSeconds / total)),
  };
  writeAll([attempt, ...readAll()]);
  window.dispatchEvent(new CustomEvent('syllab:progress-updated'));
};

export const getPracticeAttempts = (userId: string | null): PracticeAttempt[] => {
  const owner = userId || 'guest';
  return readAll().filter((attempt) => attempt.userId === owner);
};
