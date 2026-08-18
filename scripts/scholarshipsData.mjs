/**
 * scholarshipsData.mjs — loader for SCHOLARSHIPS in src/data/scholarships.ts.
 *
 * /scholarships is indexable and its description names eleven specific schemes —
 * NSP pre/post-matric, NMMS, PM YASASVI, INSPIRE, AICTE Pragati — and promises
 * "eligibility, amount, deadlines and how to apply". The prerendered page named
 * none of them. The bank holds 19 schemes with exactly those four fields plus
 * the official portal, and no build script read it.
 *
 * The records are written as JSON with quoted keys, so they are parsed rather
 * than regexed: a hand-rolled matcher here would be a second thing to keep in
 * step with the file for no gain.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function getScholarships(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'scholarships.ts'), 'utf8').replace(/\r\n/g, '\n');
    const start = ts.indexOf('export const SCHOLARSHIPS');
    if (start < 0) return [];
    // Find the array literal, not the `Scholarship[]` in the type annotation
    // that sits between the export name and the `=`.
    const eq = ts.indexOf('= [', start);
    const open = eq < 0 ? -1 : eq + 2;
    const end = ts.indexOf('\n];', open);
    if (open < 0 || end < 0) return [];
    // Tolerate a trailing comma before the closing bracket; JSON does not.
    const json = ts.slice(open, end + 1).replace(/,(\s*[}\]])/g, '$1') + ']';
    const rows = JSON.parse(json);
    return Array.isArray(rows) ? rows.filter((r) => r && r.slug && r.name) : [];
  } catch {
    return [];
  }
}
