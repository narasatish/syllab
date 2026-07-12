/**
 * Shared answer cache (Firestore) for the Important Questions cluster.
 * Cache-first pattern: the first logged-in student who generates an answer saves
 * it to Firestore; everyone else (including logged-out visitors) READS it for free
 * and instantly. One doc per chapter holds a map of question-index → {q,a}, so a
 * whole chapter's answers load in a single read. Never throws.
 *
 * Rules (firestore.rules → importantAnswers): public read, auth-gated write.
 */
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const COL = 'importantAnswers';
export interface StoredAnswer { q: string; a: string; }

function chapterDocId(cls: string, subjSlug: string, chapterId: string): string {
  return `${cls}_${subjSlug}_${chapterId}`.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 380);
}

/** Read all cached answers for a chapter (qi → {q,a}). Empty object on miss/error. */
export async function fetchChapterAnswers(cls: string, subjSlug: string, chapterId: string): Promise<Record<string, StoredAnswer>> {
  try {
    const snap = await getDoc(doc(db, COL, chapterDocId(cls, subjSlug, chapterId)));
    if (snap.exists()) {
      const items = (snap.data() as { items?: Record<string, StoredAnswer> }).items;
      if (items && typeof items === 'object') return items;
    }
  } catch { /* offline / rules / not found — fall through */ }
  return {};
}

/** Persist one generated answer to the shared cache (only logged-in users can write). */
export async function saveSharedAnswer(cls: string, subjSlug: string, chapterId: string, qi: number, q: string, a: string): Promise<void> {
  try {
    if (!auth?.currentUser) return; // rules require auth to write the shared cache
    await setDoc(
      doc(db, COL, chapterDocId(cls, subjSlug, chapterId)),
      { items: { [String(qi)]: { q: q.slice(0, 500), a: a.slice(0, 8000) } }, cls, subject: subjSlug, updated: Date.now() },
      { merge: true },
    );
  } catch { /* best-effort — local cache still has it */ }
}
