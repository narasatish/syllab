/**
 * textDiff.ts — pure, framework-free line diff for the Compare tool.
 * Classic LCS (longest-common-subsequence) dynamic-programming diff: split both
 * sides on newlines, build the LCS table, then backtrack to emit a list of
 * {type:'same'|'add'|'del', text} segments. No dependencies, fully unit-tested.
 */

export type DiffType = 'same' | 'add' | 'del';
export interface DiffSegment { type: DiffType; text: string }

/**
 * Guard against pathological inputs: the LCS table is n*m cells, so two very
 * large files would allocate gigabytes and freeze the tab. Above this many
 * cells we bail with a friendly error instead.
 */
export const MAX_DIFF_CELLS = 4_000_000;

/**
 * Diff two blocks of text line by line. Throws if the inputs are too large to
 * compare (see MAX_DIFF_CELLS).
 */
export function diffLines(a: string, b: string): DiffSegment[] {
  const A = String(a ?? '').split('\n');
  const B = String(b ?? '').split('\n');
  const n = A.length;
  const m = B.length;

  if (n * m > MAX_DIFF_CELLS) {
    throw new Error('These documents are too large to compare line by line. Please compare smaller sections.');
  }

  // dp[i][j] = length of the LCS of A[i..] and B[j..].
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  // Backtrack from the top-left to build the diff in reading order.
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
