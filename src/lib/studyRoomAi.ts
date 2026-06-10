/**
 * Study Room break content — ONE Gemini call per break returns a short spoken
 * recap plus 3 quick recall flashcards about what the student studied.
 * The parser is pure + tested; the fetch wrapper never throws.
 */
import { askTutor } from './api';

export interface Flashcard { q: string; a: string; }
export interface BreakContent { recap: string; cards: Flashcard[]; }

/** Robustly parse the model's reply (handles ```json fences / extra prose). */
export function parseBreakResponse(raw: string): BreakContent {
  const empty: BreakContent = { recap: '', cards: [] };
  if (!raw || !raw.trim()) return empty;
  // Extract the first {...} JSON object, ignoring code fences or surrounding text.
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return { recap: raw.trim().slice(0, 240), cards: [] };
  try {
    const obj = JSON.parse(raw.slice(start, end + 1));
    const recap = typeof obj.recap === 'string' ? obj.recap.trim() : '';
    const cards: Flashcard[] = Array.isArray(obj.cards)
      ? obj.cards
          .filter((c: unknown) => c && typeof (c as Flashcard).q === 'string' && typeof (c as Flashcard).a === 'string')
          .slice(0, 3)
          .map((c: Flashcard) => ({ q: String(c.q).slice(0, 160), a: String(c.a).slice(0, 220) }))
      : [];
    return { recap: recap.slice(0, 240), cards };
  } catch {
    return { recap: raw.trim().slice(0, 240), cards: [] };
  }
}

/** One on-demand call when a break starts. Returns empty content on any failure. */
export async function fetchBreakContent(goal: string): Promise<BreakContent> {
  const prompt =
    `A student just finished a focus block studying "${goal}". ` +
    `Return ONLY minified JSON (no markdown) with this exact shape: ` +
    `{"recap":"<2 warm spoken sentences congratulating them and naming one key idea to recall, under 35 words>",` +
    `"cards":[{"q":"<short recall question>","a":"<one-line answer>"},{"q":"...","a":"..."},{"q":"...","a":"..."}]}. ` +
    `The 3 cards must test the most important points of "${goal}". Keep answers concise.`;
  try {
    const raw = await askTutor(prompt);
    return parseBreakResponse(raw);
  } catch {
    return { recap: '', cards: [] };
  }
}
