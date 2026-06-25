/**
 * differencesData.mjs — single source of truth for the /difference-between
 * cluster used by the sitemap + prerender scripts. Reads src/data/differences.ts
 * (whose DIFFERENCES array body is valid JSON) so the build never drifts.
 * Returns [{ slug, title, termA, termB, category, classLevel, intro }].
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function getDifferences(root) {
  const file = path.join(root, 'src', 'data', 'differences.ts');
  const ts = readFileSync(file, 'utf8');
  const marker = 'export const DIFFERENCES: DiffTopic[] = ';
  const s = ts.indexOf(marker);
  if (s < 0) return [];
  const from = s + marker.length;
  const e = ts.indexOf('\n];', from);
  if (e < 0) return [];
  const json = ts.slice(from, e + 2).trim(); // "[ ... ]"
  let arr;
  try { arr = JSON.parse(json); } catch { return []; }
  return arr
    .filter((d) => d && d.slug && d.title)
    .map((d) => ({ slug: d.slug, title: d.title, termA: d.termA, termB: d.termB, category: d.category, classLevel: d.classLevel, intro: String(d.intro || '').slice(0, 155), table: Array.isArray(d.table) ? d.table : [], keyPoints: Array.isArray(d.keyPoints) ? d.keyPoints : [] }));
}
