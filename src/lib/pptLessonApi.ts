/* Deep PPT V3 — types + API call */

export type DeepPptQuestion = {
  type: 'MCQ' | '1-mark' | '2-mark' | '3-mark' | 'case-based' | 'assertion-reason' | string;
  question: string;
  answer: string;
  explanation?: string;
};

export type DeepPptSlide = {
  slideNumber: number;
  layout: 'title' | 'concept' | 'diagram' | 'example' | 'table' | 'question' | 'revision' | string;
  title: string;
  subtitle?: string;
  bullets: string[];
  teacherNotes?: string;
  visualSuggestion?: string;
  diagramPrompt?: string;
  example?: string;
  examFocus?: string;
  rememberThis?: string;
  commonMistake?: string;
  questions?: DeepPptQuestion[];
};

export type DeepPptLesson = {
  id: string;
  chapterId: string;
  classLevel: string;
  subject: string;
  chapterTitle: string;
  title: string;
  promptVersion?: string;
  generatedBy?: string;
  slides: DeepPptSlide[];
};

export type DeepPptLessonRequest = {
  classLevel: string | number;
  subject: string;
  chapterTitle: string;
  chapterId?: string;
  topics?: string[];
  examGoal?: string;
  forceRefresh?: boolean;
};

import { API_URL } from './api';

const PPT_TIMEOUT_MS = 75_000;  // 75 s per attempt
const PPT_MAX_RETRIES = 2;      // auto-retry once on network failures

async function fetchPptOnce(payload: DeepPptLessonRequest, attempt: number): Promise<DeepPptLesson> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PPT_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}/api/ppt-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      let msg = 'Could not load PPT lesson.';
      try { const body = await res.json(); if (body?.error) msg = body.error; } catch { /* ignore */ }
      throw new Error(msg);
    }

    const data = await res.json();
    if (!data.lesson) throw new Error('Invalid PPT lesson response from server.');

    return data.lesson as DeepPptLesson;
  } catch (err) {
    const isNetworkErr = err instanceof TypeError || (err as Error)?.name === 'AbortError';
    if (isNetworkErr && attempt < PPT_MAX_RETRIES) {
      // Short pause before retry so the backend has a moment to wake up
      await new Promise(r => setTimeout(r, 3000));
      return fetchPptOnce(payload, attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function getDeepPptLesson(payload: DeepPptLessonRequest): Promise<DeepPptLesson> {
  // Show the cold-start banner after 5 s if the backend is still waking up
  const slowTimer = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('syllab:ai-slow', { detail: { source: 'pptLesson' } }));
  }, 5000);

  try {
    return await fetchPptOnce(payload, 1);
  } finally {
    clearTimeout(slowTimer);
    window.dispatchEvent(new CustomEvent('syllab:ai-fast', { detail: { source: 'pptLesson' } }));
  }
}
