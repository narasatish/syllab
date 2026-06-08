// src/lib/api.ts
// Single source of truth for ALL backend calls.
// In dev mode, use '' (relative URL) so Vite's /api proxy handles requests
// without CORS issues.  In production the full Render URL is used.
const rawApiUrl = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL ||
     import.meta.env.VITE_API_URL ||
     "https://syllab-backend.onrender.com");

export const API_URL = String(rawApiUrl).replace(/\/+$/, "");

/* ───────────── Types ───────────── */

export interface ChatTurn {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface MCQ {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface ConceptCard {
  title: string;
  detail: string;
}

export interface StudyMaterial {
  concepts: ConceptCard[];
  flashcards: Flashcard[];
  mcqs: MCQ[];
}

export interface UserStats {
  xp: number;
  level: number;
  accuracy: number;
  streak: number;
  rank: string;
}

/* ───────────── fetch wrapper ───────────── */

/**
 * Build a USER-FRIENDLY error from a failed API response. The raw backend text
 * (e.g. "[GoogleGenerativeAI Error] … 429 Too Many Requests") is kept on
 * `.detail` for console logging, but `.message` is something safe to show a
 * student — surfaces that render `err.message` never leak raw 429/500 text.
 */
function apiError(path: string, status: number, rawBody: string): Error {
  let friendly: string;
  if (status === 429) {
    friendly = "Our AI is very busy right now. Please wait a minute and try again.";
  } else if (status >= 500) {
    friendly = "The AI service is taking a break. Please try again in a moment.";
  } else if (status === 404) {
    friendly = "That wasn’t found. Please try again.";
  } else if (status === 401 || status === 403) {
    friendly = "Please sign in and try again.";
  } else {
    friendly = "Something went wrong. Please try again.";
  }
  const err = new Error(friendly) as Error & { status?: number; detail?: string };
  err.status = status;
  err.detail = `API ${path} ${status}: ${rawBody.slice(0, 200)}`;
  console.warn(err.detail); // keep the raw reason in the console for debugging
  return err;
}

async function post<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw apiError(path, res.status, errText);
  }
  return res.json();
}

async function get<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw apiError(path, res.status, errText);
  }
  return res.json();
}

/* ───────────── Tutor ───────────── */

export async function askTutor(prompt: string, history: ChatTurn[] = [], timeoutMs = 75_000): Promise<string> {
  const controller = new AbortController();
  const abortTimer = setTimeout(() => controller.abort(), timeoutMs);
  const slowTimer = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('syllab:ai-slow', { detail: { source: 'askTutor' } }));
  }, 5000);

  try {
    const res = await fetch(`${API_URL}/api/tutor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw apiError('/api/tutor', res.status, errText);
    }
    const data = await res.json();
    return data.text || '';
  } finally {
    clearTimeout(abortTimer);
    window.clearTimeout(slowTimer);
    window.dispatchEvent(new CustomEvent('syllab:ai-fast', { detail: { source: 'askTutor' } }));
  }
}

/* ───────────── Practice Arena ───────────── */

export interface GenerateQuestionsArgs {
  classLevel: string | number;
  subject: string;
  chapter: string;
  chapterId?: string;
  difficulty: string;
  count: number;
}

export async function generateQuestions(args: GenerateQuestionsArgs): Promise<{ questions: MCQ[] }> {
  const slowTimer = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('syllab:ai-slow', { detail: { source: 'generateQuestions' } }));
  }, 5000);

  try {
    return await post<{ questions: MCQ[] }>("/api/questions/batch", args);
  } finally {
    window.clearTimeout(slowTimer);
    window.dispatchEvent(new CustomEvent('syllab:ai-fast', { detail: { source: 'generateQuestions' } }));
  }
}

/* ───────────── Scan & Solve ───────────── */

export async function scanAndSolve(fileDataUrl: string): Promise<string> {
  const data = await post<{ response: string }>("/api/ai", { file: fileDataUrl });
  return data.response || "";
}

/* ───────────── Study Arena ───────────── */

export async function extractStudyConcepts(text: string): Promise<StudyMaterial> {
  const data = await post<{ concepts: ConceptCard[]; flashcards: Flashcard[]; mcqs: MCQ[] }>(
    "/api/study",
    { text }
  );
  return {
    concepts: data.concepts || [],
    flashcards: data.flashcards || [],
    mcqs: data.mcqs || [],
  };
}

export async function generateMoreMCQs(text: string, existingQuestions: string[]): Promise<MCQ[]> {
  const data = await post<{ mcqs: MCQ[] }>("/api/study/more-mcqs", { text, existingQuestions });
  return data.mcqs || [];
}

export async function generateMoreFlashcards(
  text: string,
  existingQuestions: string[]
): Promise<Flashcard[]> {
  const data = await post<{ flashcards: Flashcard[] }>("/api/study/more-flashcards", {
    text,
    existingQuestions,
  });
  return data.flashcards || [];
}

/* ───────────── Concepts (Syllabus Learn button) ───────────── */

export interface LoadConceptArgs {
  classLevel: string | number;
  subject: string;
  chapterTitle: string;
  chapterId: string;
}

function isMobileUA(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Load a chapter concept from the backend. Mobile gets a 15-second hard cap
 * (phone browsers kill idle sockets fast); desktop waits up to 60 s for
 * Render cold start. On any failure, returns a minimal fallback concept
 * built from the chapter title so the "Learn" button NEVER shows an error
 * dialog on mobile.
 */
export async function loadConcept(args: LoadConceptArgs): Promise<any> {
  const mobile = isMobileUA();
  const timeoutMs = mobile ? 15_000 : 60_000;
  const controller = new AbortController();
  const abortTimer = setTimeout(() => controller.abort(), timeoutMs);
  const slowTimer = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('syllab:ai-slow', { detail: { source: 'loadConcept' } }));
  }, 5000);

  try {
    const res = await fetch(`${API_URL}/api/concept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`API /api/concept ${res.status}`);
    }
    const data = await res.json();
    if (!data.concept) throw new Error('No concept returned');
    return data.concept;
  } catch (err) {
    console.warn('[loadConcept] backend failed, returning fallback:', (err as Error)?.message);
    // Minimal client-side fallback — same shape as backend Concept so the
    // viewer renders without errors. User can retry once Render warms up.
    return {
      id: args.chapterId,
      chapterId: args.chapterId,
      title: args.chapterTitle,
      summary: `${args.chapterTitle} is a Class ${args.classLevel} ${args.subject} chapter from the NCERT/CBSE syllabus.`,
      keyPoints: [
        `Open your NCERT textbook to "${args.chapterTitle}" to read the full chapter.`,
        'Take notes on the key definitions and examples.',
        'Try the in-chapter exercises and end-of-chapter questions.',
      ],
      examples: [],
      _isFallback: true,
    };
  } finally {
    clearTimeout(abortTimer);
    clearTimeout(slowTimer);
    window.dispatchEvent(new CustomEvent('syllab:ai-fast', { detail: { source: 'loadConcept' } }));
  }
}

/* ───────────── Dashboard stats ───────────── */

export async function getUserStats(uid: string): Promise<UserStats> {
  return get<UserStats>(`/api/user/stats/${uid}`);
}

/* ───────────── PPT Lesson ───────────── */

export interface PptSlide {
  index: number;
  type: 'title' | 'overview' | 'concept' | 'diagram' | 'example' | 'formula' | 'activity' | 'keypoints' | 'mcq' | 'summary' | 'end';
  title: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  keyPoints?: string[];
  emoji?: string;
  highlight?: string;
  diagramHint?: string;
  question?: string;
  options?: string[];
  correct?: number;
  explanation?: string;
  callToAction?: string;
  bg?: string;
}

export interface PptLesson {
  chapterTitle: string;
  subject: string;
  classLevel: string;
  totalSlides: number;
  slides: PptSlide[];
  teacherNotes?: string[];
  chapterId?: string;
}

export interface GetPptLessonArgs {
  classLevel: string | number;
  subject: string;
  chapterTitle: string;
  chapterId: string;
}

export async function getPptLesson(args: GetPptLessonArgs): Promise<PptLesson> {
  const data = await post<{ lesson: PptLesson; fromCache?: boolean }>('/api/ppt-lesson', args);
  if (!data.lesson) throw new Error('No lesson returned from API');
  return data.lesson;
}

/* ───────────── English Voice Feedback ───────────── */

export interface EnglishFeedback {
  correction: string;
  explanation: string;
  encouragement: string;
  betterVersion?: string;
}

export interface EnglishChatTurn {
  role: 'student' | 'teacher';
  text: string;
}

/**
 * Conversational reply — the AI acts as a friendly chat partner who asks
 * follow-up questions and keeps the conversation flowing. No grammar critique
 * unless there's a major error. Returns a single short spoken response.
 */
export async function getEnglishConversationReply(
  transcript: string,
  history: EnglishChatTurn[] = [],
  context?: string,
): Promise<string> {
  const recentHistory = history.slice(-8).map(t => `${t.role === 'student' ? 'Student' : 'Teacher'}: ${t.text}`).join('\n');
  const prompt = `You are a warm, friendly English conversation partner for an Indian school student. Your job is to have a NATURAL spoken conversation — like a friend chatting. Do NOT correct grammar unless it is a major confusion. Keep replies SHORT (1-2 sentences max) so the student speaks more than you do. Always end with a question or invitation so the student replies back.

${context ? `Conversation topic: ${context}\n` : ''}${recentHistory ? `Recent conversation:\n${recentHistory}\n` : ''}
Student just said: "${transcript}"

Respond with ONLY your spoken reply (no JSON, no labels, no explanation). 1-2 sentences. End with a question that invites the student to talk more.`;

  const raw = await askTutor(prompt, []);
  // Strip any accidental JSON/markdown wrapping
  return raw.replace(/```[a-z]*\n?|\n?```/g, '').replace(/^["']|["']$/g, '').trim();
}

/**
 * Opening line — AI starts the conversation with a warm greeting + topic question.
 */
export async function getEnglishConversationOpener(context?: string): Promise<string> {
  const prompt = `You are a warm, friendly English conversation partner for an Indian school student starting a spoken practice session.${context ? ` The topic is: "${context}".` : ''} Start the conversation with a warm 1-sentence greeting AND a clear open-ended question. Total 1-2 sentences. Just the spoken text — no labels, no JSON.`;
  const raw = await askTutor(prompt, []);
  return raw.replace(/```[a-z]*\n?|\n?```/g, '').replace(/^["']|["']$/g, '').trim();
}

export async function getEnglishVoiceFeedback(transcript: string, context?: string): Promise<EnglishFeedback> {
  const prompt = `You are a friendly, encouraging English teacher AI for Indian school students.

The student just said or wrote: "${transcript}"
${context ? `Context / task: ${context}` : ''}

Evaluate their English briefly and helpfully. Respond in this exact JSON format (no markdown, just JSON):
{
  "correction": "If there are grammar/vocabulary mistakes, gently point them out. If correct, say 'Great grammar!'",
  "explanation": "One short explanation of the grammar rule or vocabulary tip.",
  "encouragement": "One friendly, motivating sentence to keep the student going.",
  "betterVersion": "If improvements exist, write the corrected/improved version. If already good, omit this field or set to null."
}

Keep each field to 1-2 sentences. Be warm and encouraging. Use simple language.`;

  const raw = await askTutor(prompt, []);
  try {
    const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleaned) as EnglishFeedback;
    return {
      correction: parsed.correction || 'Good effort!',
      explanation: parsed.explanation || '',
      encouragement: parsed.encouragement || 'Keep practicing!',
      betterVersion: parsed.betterVersion || undefined,
    };
  } catch {
    return {
      correction: raw.slice(0, 200),
      explanation: '',
      encouragement: 'Keep practicing — you\'re doing great!',
    };
  }
}

/* ───────────── Coding Feedback ───────────── */

export interface CodingFeedback {
  score: number;
  verdict: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  hint: string;
  correctedCode?: string;
}

export interface GetCodingFeedbackArgs {
  language: string;
  code: string;
  task?: string;
  classLevel?: string | number;
}

export async function getCodingFeedback(args: GetCodingFeedbackArgs): Promise<CodingFeedback> {
  const slowTimer = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('syllab:ai-slow', { detail: { source: 'getCodingFeedback' } }));
  }, 5000);

  try {
    return await post<CodingFeedback>('/api/coding-feedback', args);
  } finally {
    window.clearTimeout(slowTimer);
    window.dispatchEvent(new CustomEvent('syllab:ai-fast', { detail: { source: 'getCodingFeedback' } }));
  }
}

/**
 * Fetch a model "correct answer" for a coding task on demand (used by the
 * "Show Answer" button when a challenge has no hard-coded solution). Returns
 * clean code only. Falls back to a friendly message if the AI is unreachable.
 */
export async function getModelSolution(language: string, task: string): Promise<string> {
  const prompt =
    `Write the correct, minimal ${language} solution for this task. ` +
    `Return ONLY the code (no markdown fences, no explanation):\n\n${task}`;
  try {
    const raw = await askTutor(prompt);
    return raw.replace(/^```[a-z]*\n?/i, '').replace(/```\s*$/i, '').trim();
  } catch {
    return '// Could not load the solution right now. Please try again in a moment.';
  }
}

/* ───────────── Mock Test Explanations ───────────── */

/**
 * Fetch an explanation for a mock test question. Returns a 2-3 sentence
 * explanation of why the correct answer is right.
 */
export async function getMockQuestionExplanation(
  question: string,
  options: string[],
  correctAnswerIndex: number,
): Promise<string> {
  const correctOption = options[correctAnswerIndex];
  const prompt =
    `Explain in 2-3 sentences why the correct answer to this MCQ is option ${String.fromCharCode(65 + correctAnswerIndex)}: "${correctOption}". ` +
    `Question: ${question}\n\n` +
    `Options:\n${options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}`;

  try {
    const raw = await askTutor(prompt, [], 30_000); // 30s timeout for explanations
    return raw.trim();
  } catch (err) {
    const friendly = (err as Error & { message?: string }).message || 'Could not load explanation. Please try again.';
    throw new Error(friendly);
  }
}
