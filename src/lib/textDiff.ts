/**
 * textDiff.ts — pure, framework-free diff for the Compare tool.
 * Classic LCS (longest-common-subsequence) dynamic-programming diff: it works on
 * any array of tokens, so the same core powers a line diff (diffLines) and an
 * intra-line word diff (diffWords) used to highlight exactly which words changed
 * in a modified line. No dependencies, fully unit-tested.
 */

export type DiffType = 'same' | 'add' | 'del';
export interface DiffSegment { type: DiffType; text: string }

/**
 * Guard against pathological inputs: the LCS table is n*m cells, so two very
 * large inputs would allocate gigabytes and freeze the tab. Above this many
 * cells we bail (diffLines throws; diffWords falls back to a whole-line change).
 */
export const MAX_DIFF_CELLS = 4_000_000;

/** Generic LCS diff over two token arrays, returned in reading order. */
function lcsDiff(A: string[], B: string[]): DiffSegment[] {
  const n = A.length;
  const m = B.length;

  // dp[i][j] = length of the LCS of A[i..] and B[j..].
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const out: DiffSegment[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { out.push({ type: 'same', text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: 'del', text: A[i] }); i++; }
    else { out.push({ type: 'add', text: B[j] }); j++; }
  }
  while (i < n) { out.push({ type: 'del', text: A[i] }); i++; }
  while (j < m) { out.push({ type: 'add', text: B[j] }); j++; }
  return out;
}

/** Diff two blocks of text line by line. Throws if the inputs are too large. */
export function diffLines(a: string, b: string): DiffSegment[] {
  const A = String(a ?? '').split('\n');
  const B = String(b ?? '').split('\n');
  if (A.length * B.length > MAX_DIFF_CELLS) {
    throw new Error('These documents are too large to compare line by line. Please compare smaller sections.');
  }
  return lcsDiff(A, B);
}

/** Split into word + whitespace tokens so a diff can be reassembled with spacing intact. */
function tokenizeWords(s: string): string[] {
  return String(s ?? '').match(/\s+|[^\s]+/g) || [];
}

/**
 * Word-level diff of two single lines — highlights exactly which words changed
 * within a modified line. Whitespace is preserved as its own token, so joining
 * the segments reproduces the original text. Falls back to a whole-line del+add
 * on pathologically large inputs.
 */
export function diffWords(a: string, b: string): DiffSegment[] {
  const A = tokenizeWords(a);
  const B = tokenizeWords(b);
  if (A.length * B.length > MAX_DIFF_CELLS) return [{ type: 'del', text: a }, { type: 'add', text: b }];
  return lcsDiff(A, B);
}

export interface DiffStats { added: number; removed: number; same: number; identical: boolean }

/** Tally a diff: how many lines were added, removed, unchanged, and whether the two sides are identical. */
export function diffStats(diff: DiffSegment[]): DiffStats {
  let added = 0;
  let removed = 0;
  let same = 0;
  for (const d of diff) {
    if (d.type === 'add') added++;
    else if (d.type === 'del') removed++;
    else same++;
  }
  return { added, removed, same, identical: added === 0 && removed === 0 };
}
