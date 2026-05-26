const STORAGE_KEY = 'syllab_mock_test_attempts';
const MAX_ATTEMPTS = 30;

export type MockAnswerStatus = 'answered' | 'review' | 'unanswered' | 'not_visited';

export type MockAttemptQuestion = {
  id: string;
  subject: string;
  chapter?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  marks: number;
  negativeMarks: number;
};

export type MockAttempt = {
  id: string;
  userId: string;
  exam: string;
  mockId: string;
  title: string;
  completedAt: string;
  elapsedSeconds: number;
  score: number;
  maxScore: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  answers: Record<string, number>;
  statuses: Record<string, MockAnswerStatus>;
  questions: MockAttemptQuestion[];
};

const readAll = (): MockAttempt[] => {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (attempts: MockAttempt[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts.slice(0, MAX_ATTEMPTS)));
};

export const recordMockAttempt = (attempt: Omit<MockAttempt, 'id' | 'completedAt'>) => {
  const nextAttempt: MockAttempt = {
    ...attempt,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: new Date().toISOString(),
  };
  writeAll([nextAttempt, ...readAll()]);
  window.dispatchEvent(new CustomEvent('syllab:progress-updated'));
  return nextAttempt;
};

export const getMockAttempts = (userId: string | null): MockAttempt[] => {
  const owner = userId || 'guest';
  return readAll().filter((attempt) => attempt.userId === owner);
};
