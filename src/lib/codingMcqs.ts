/**
 * codingMcqs.ts — per-topic "Quick Check" MCQs for the coding tutorials (all
 * languages). Kept OUT of the JS bundle (lazy-fetched static asset) so the
 * coding page stays light. Written by scripts/generate-coding-mcqs.ts.
 */
export interface CodingMcq {
  q: string;
  options: string[];
  correct: number;       // 0-3
  explanation: string;
}

let cache: Record<string, CodingMcq[]> | null = null;
let loading: Promise<Record<string, CodingMcq[]>> | null = null;

export function loadCodingMcqs(): Promise<Record<string, CodingMcq[]>> {
  if (cache) return Promise.resolve(cache);
  if (loading) return loading;
  loading = (typeof fetch === 'undefined'
    ? Promise.resolve({})
    : fetch('/data/coding-mcqs.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})))
    .then((data: Record<string, CodingMcq[]>) => { cache = data || {}; return cache; });
  return loading;
}
