/**
 * AI flashcard generation for the Study Room. ONE Gemini call (via askTutor)
 * produces N recall flashcards for the chosen chapters. Pure parser + a fetch
 * wrapper that never throws (returns [] on any failure).
 */
import { askTutor } from './api';

export interface QuizCard { q: string; a: string; }

/** Extract a JSON array of {q,a} from the model reply (handles fences/prose). */
export function parseCards(raw: string, max: number): QuizCard[] {
  if (!raw || !raw.trim()) return [];
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) return [];
  try {
    const arr = JSON.parse(raw.slice(start, end + 1));
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((c: unknown) => c && typeof (c as QuizCard).q === 'string' && typeof (c as QuizCard).a === 'string')
      .slice(0, max)
      .map((c: QuizCard) => ({ q: String(c.q).slice(0, 220).trim(), a: String(c.a).slice(0, 320).trim() }));
  } catch {
    return [];
  }
}

export interface FlashcardRequest {
  classLevel: string;
  subject: string;
  chapterTitles: string[];
  count: number; // 10 | 20 | 30
}

/** One on-demand call. Returns [] on failure so the UI can show a friendly retry. */
export async function generateFlashcards(req: FlashcardRequest): Promise<QuizCard[]> {
  const n = Math.max(5, Math.min(40, req.count));
  const chapters = req.chapterTitles.slice(0, 8).join('; ');
  const prompt =
    `You are an exam coach for an Indian student in Class ${req.classLevel}, subject ${req.subject}. ` +
    `Create exactly ${n} short recall flashcards that cover the most important, exam-relevant points from these chapter(s): ${chapters}. ` +
    `Mix definitions, key facts, formulae and one-line application questions. ` +
    `Return ONLY a minified JSON array (no markdown, no prose) of this exact shape: ` +
    `[{"q":"<question, under 25 words>","a":"<crisp answer, under 30 words>"}]. ` +
    `Make questions clear for a school student and answers accurate and concise.`;
  try {
    const raw = await askTutor(prompt);
    return parseCards(raw, n);
  } catch {
    return [];
  }
}
