/**
 * Exam share-code encoding for the live-exam flow.
 *
 * A parent/teacher creates a custom exam, gets a short code, and shares it with
 * students who join by entering the code (the full config is also persisted to
 * Firestore under the code as the key).
 *
 * The previous implementation used `btoa(JSON.stringify(config)).substring(0,8)`,
 * which kept only the first 8 base64 chars. Because every config's JSON starts
 * with the identical `{"class":"…` prefix, totally different exams collided onto
 * the SAME code (e.g. Class 10 Maths and Class 12 Physics both → "EYJJBGFZ").
 * Since the code is the Firestore doc key, one exam silently overwrote another.
 *
 * This version hashes the WHOLE canonical config (two independent hashes for
 * spread) so the code depends on every field, making collisions vanishingly
 * unlikely for realistic inputs.
 */

export interface ExamConfig {
  class: string;
  subjects: string[];
  level: string;
  count: number;
}

/** Canonical JSON so subject order / key order never changes the code. */
function canonicalize(config: ExamConfig): string {
  return JSON.stringify({
    class: String(config.class),
    subjects: [...config.subjects].map((s) => String(s)).sort(),
    level: String(config.level),
    count: Number(config.count),
  });
}

/** Produce a deterministic 8-char uppercase alphanumeric join code. */
export function encodeExamConfig(config: ExamConfig): string {
  const s = canonicalize(config);

  // djb2
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  }
  // sdbm — independent mixing so adjacent configs spread apart
  let g = 0;
  for (let i = 0; i < s.length; i++) {
    g = (s.charCodeAt(i) + (g << 6) + (g << 16) - g) >>> 0;
  }

  const raw = (h.toString(36) + g.toString(36)).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return raw.substring(0, 8).padEnd(8, '0');
}
