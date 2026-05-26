/**
 * PPT Lesson API — cache-first, backend second, offline fallback third.
 *
 * Flow:
 *  1. Check Firestore cache (shared_ppt_lessons_v2/{lessonKey})
 *  2. If cached slides exist → return instantly (source: "cache")
 *  3. Else call backend (/api/ppt-lesson) with mobile-aware short timeout
 *  4. If backend succeeds → cache result → return (source: "backend")
 *  5. If backend fails/times out → build offline slides from chapter data (source: "fallback")
 *
 * Mobile vs desktop:
 *  - Mobile gets a 20-second timeout so users are never stuck waiting
 *  - Desktop gets 60 seconds (Render cold start can take ~45 s)
 */

import { API_URL } from './api';
import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

/* ─── Types ─────────────────────────────────────────────────────────────── */

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
  /** Added by cache-first layer — "cache" | "backend" | "fallback" */
  source?: string;
  /** Quality tag — "full_ai" only when backend returns >=15 chapter-specific slides. */
  quality?: 'full_ai' | 'quick_fallback';
  /** True when slides are a temporary client-built guide, not real AI lesson. */
  isFallback?: boolean;
  /** False when slides are a fallback — PDF/PPT export is blocked. */
  canExport?: boolean;
  /** Friendly message when source is "fallback" */
  fallbackMessage?: string;
};

export type DeepPptLessonRequest = {
  classLevel: string | number;
  subject: string;
  chapterTitle: string;
  chapterId?: string;
  topics?: string[];
  examGoal?: string;
  forceRefresh?: boolean;
  /** Optional chapter summary for offline fallback slides */
  summary?: string;
  /** Optional list of sub-topics for fallback slide content */
  concepts?: string[];
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const PPT_COLLECTION = 'shared_ppt_lessons_v2';

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function makeLessonKey(payload: DeepPptLessonRequest): string {
  const id = payload.chapterId || payload.chapterTitle.toLowerCase().replace(/\s+/g, '-');
  return `${payload.classLevel}_${payload.subject}_${id}`.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/* ─── Quality validation — reject cached fallbacks ───────────────────────── */

/** Generic placeholder phrases that identify a fallback-quality lesson. */
const PLACEHOLDER_PHRASES = [
  'Study this concept thoroughly for your exams',
  'Refer to your NCERT textbook for detailed explanations',
  'Practice related questions to reinforce your understanding',
  'Full AI lesson is being prepared',
  'Quick Study Guide',
  'Define the main concept of',
  'State the key principles or laws',
];

/** Returns true if the lesson is a high-quality full AI lesson, not a fallback. */
function isHighQualityLesson(lesson: DeepPptLesson): boolean {
  if (!lesson || !Array.isArray(lesson.slides)) return false;
  // Reject explicit fallback tags
  if (lesson.isFallback === true) return false;
  if (lesson.quality === 'quick_fallback') return false;
  // Must have a reasonable number of slides
  if (lesson.slides.length < 12) return false;
  // Must not contain placeholder phrases (sampled — first slide of each chunk)
  const text = lesson.slides
    .map(s => [s.title, ...(s.bullets || []), s.subtitle, s.example].filter(Boolean).join(' '))
    .join(' ');
  for (const phrase of PLACEHOLDER_PHRASES) {
    if (text.includes(phrase)) return false;
  }
  return true;
}

/* ─── Firestore cache ────────────────────────────────────────────────────── */

async function getCached(lessonKey: string): Promise<DeepPptLesson | null> {
  try {
    const snap = await getDoc(doc(db, PPT_COLLECTION, lessonKey));
    if (!snap.exists()) return null;
    const data = snap.data() as DeepPptLesson;
    if (!data.slides?.[0]?.slideNumber) return null; // old format — ignore
    // Reject cached fallbacks — these were saved before the quality gate or
    // by older code that didn't distinguish full lessons from fallbacks.
    if (!isHighQualityLesson(data)) return null;
    return data;
  } catch {
    return null; // Firestore unavailable — fall through
  }
}

async function saveCache(lessonKey: string, lesson: DeepPptLesson): Promise<void> {
  // Refuse to cache anything that doesn't pass the quality gate.
  if (!isHighQualityLesson(lesson)) return;
  try {
    await setDoc(doc(db, PPT_COLLECTION, lessonKey), {
      ...lesson,
      id: lessonKey,
      quality: 'full_ai',
      isFallback: false,
      canExport: true,
      updatedAt: serverTimestamp(),
    });
  } catch {
    // Non-fatal — just means next load will call backend again
  }
}

/* ─── Backend call ───────────────────────────────────────────────────────── */

async function fetchFromBackend(
  payload: DeepPptLessonRequest,
  timeoutMs: number,
): Promise<DeepPptLesson> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_URL}/api/ppt-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      let msg = 'Backend returned error.';
      try { const b = await res.json(); if (b?.error) msg = b.error; } catch { /* ignore */ }
      throw new Error(msg);
    }

    const data = await res.json();
    if (!data.lesson || !Array.isArray(data.lesson.slides)) {
      throw new Error('Invalid lesson response from backend.');
    }
    return data.lesson as DeepPptLesson;
  } finally {
    clearTimeout(timer);
  }
}

/* ─── Offline fallback slides ────────────────────────────────────────────── */

function buildFallbackSlides(payload: DeepPptLessonRequest): DeepPptSlide[] {
  const title = payload.chapterTitle;
  const cls = String(payload.classLevel);
  const sub = payload.subject;
  const summary = payload.summary || `${title} is an important topic in Class ${cls} ${sub}.`;
  const concepts: string[] = payload.concepts?.length
    ? payload.concepts
    : [
        `Introduction to ${title}`,
        `Key definitions and terminology`,
        `Important principles and laws`,
        `Real-world examples and applications`,
        `Common exam questions`,
      ];

  const slides: DeepPptSlide[] = [
    {
      slideNumber: 1,
      layout: 'title',
      title,
      subtitle: `Class ${cls} ${sub} — Quick Study Guide`,
      bullets: [],
    },
    {
      slideNumber: 2,
      layout: 'concept',
      title: 'Chapter Overview',
      bullets: [summary],
    },
  ];

  concepts.slice(0, 6).forEach((concept, i) => {
    slides.push({
      slideNumber: i + 3,
      layout: 'concept',
      title: concept,
      bullets: [
        `Study this concept thoroughly for your exams.`,
        `Refer to your NCERT textbook for detailed explanations.`,
        `Practice related questions to reinforce your understanding.`,
      ],
    });
  });

  slides.push(
    {
      slideNumber: slides.length + 1,
      layout: 'revision',
      title: 'Quick Revision',
      bullets: [
        `Review all key points of ${title}.`,
        `Make brief notes in your own words.`,
        `Solve at least 10 practice questions today.`,
        `Check NCERT examples and exercises.`,
      ],
    },
    {
      slideNumber: slides.length + 2,
      layout: 'question',
      title: 'Practice Questions',
      bullets: [
        `1. Define the main concept of ${title}.`,
        `2. State the key principles or laws.`,
        `3. Give two real-world applications.`,
        `4. Draw and label a relevant diagram.`,
        `5. Solve one numerical/problem from NCERT.`,
      ],
    },
    {
      slideNumber: slides.length + 3,
      layout: 'revision',
      title: `Well done! Keep studying ${title} 🎉`,
      subtitle: 'Full AI lesson is being prepared. Refresh in a minute to get it.',
      bullets: [],
    },
  );

  return slides;
}

/* ─── Main exported function ─────────────────────────────────────────────── */

export async function getDeepPptLesson(payload: DeepPptLessonRequest): Promise<DeepPptLesson> {
  const lessonKey = makeLessonKey(payload);
  const mobile = isMobile();
  // Mobile: 15s hard cap — phone browsers kill idle connections fast.
  // Desktop: 60s — accommodates Render free-tier cold start.
  const timeoutMs = mobile ? 15_000 : 60_000;

  // Signal cold-start banner after 5 s (only if we end up calling backend)
  let slowTimer: ReturnType<typeof setTimeout> | null = null;

  try {
    // ── Step 1: Firestore cache (instant on any device) ──────────────────
    const cached = await getCached(lessonKey);
    if (cached) {
      return { ...cached, source: 'cache', id: lessonKey };
    }

    // ── Step 2: Backend API ───────────────────────────────────────────────
    slowTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('syllab:ai-slow', { detail: { source: 'pptLesson' } }));
    }, 5000);

    try {
      const lesson = await fetchFromBackend(payload, timeoutMs);
      // Only cache + return as full lesson if it actually passes the quality gate.
      if (isHighQualityLesson(lesson)) {
        void saveCache(lessonKey, lesson);
        return {
          ...lesson,
          source: 'backend',
          quality: 'full_ai',
          isFallback: false,
          canExport: true,
          id: lessonKey,
        };
      }
      // Backend returned junk (e.g. partial / empty) — fall through to fallback path.
      console.warn('[pptLessonApi] backend returned low-quality lesson — using fallback');
    } catch (backendErr) {
      console.warn('[pptLessonApi] backend failed:', (backendErr as Error)?.message);
    }

    // ── Step 3: Quick fallback (NEVER cached, NEVER exported) ───────────
    const fallbackSlides = buildFallbackSlides(payload);
    return {
      id: lessonKey,
      chapterId: payload.chapterId || lessonKey,
      classLevel: String(payload.classLevel),
      subject: payload.subject,
      chapterTitle: payload.chapterTitle,
      title: payload.chapterTitle,
      slides: fallbackSlides,
      source: 'fallback',
      quality: 'quick_fallback',
      isFallback: true,
      canExport: false,
      fallbackMessage:
        'Quick study guide shown — the full AI lesson is still being prepared. Tap Retry in a minute for the full chapter-by-chapter lesson with examples and practice questions.',
    };
  } finally {
    if (slowTimer !== null) clearTimeout(slowTimer);
    window.dispatchEvent(new CustomEvent('syllab:ai-fast', { detail: { source: 'pptLesson' } }));
  }
}
