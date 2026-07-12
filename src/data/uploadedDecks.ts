/**
 * Uploaded story-PPT decks. The owner exports each chapter's PPT slides as images
 * (Slide1.png, Slide2.png…) into public/story-decks/<class-n-slug>/. The ingest
 * script (scripts/ingest-story-decks.mjs) scans those folders and writes
 * uploadedDecksData.ts. When a chapter has an uploaded deck, the Syllabus "Lesson"
 * button opens it in DeckSlideshow (the exact uploaded design), taking priority
 * over the auto-generated story lesson.
 */
import { UPLOADED_DECKS } from './uploadedDecksData';

export interface UploadedDeck {
  /** `class-{n}-{chapterSlug}` — folder name under public/story-decks/. */
  key: string;
  classLevel: string;
  chapterSlug: string;
  /** Display title (best-effort from the slug or matched syllabus title). */
  chapter: string;
  subject?: string;
  /** Ordered absolute image URLs, e.g. ["/story-decks/class-3-multiplication/Slide1.png", …]. */
  slides: string[];
}

export const slugifyChapter = (s: string): string =>
  String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Find an uploaded deck for a chapter by class + chapter title (slug match). */
export function getUploadedDeck(classLevel?: string, chapter?: string): UploadedDeck | null {
  if (!classLevel || !chapter) return null;
  const cls = String(classLevel).replace(/[^0-9]/g, '');
  const want = slugifyChapter(chapter);
  return (
    UPLOADED_DECKS.find(
      (d) => d.classLevel === cls && (d.chapterSlug === want || want.includes(d.chapterSlug) || d.chapterSlug.includes(want)),
    ) || null
  );
}

export function hasUploadedDeck(classLevel?: string, chapter?: string): boolean {
  return getUploadedDeck(classLevel, chapter) !== null;
}

export { UPLOADED_DECKS };
