/**
 * resolve-diagram-urls.ts — find a CORRECT Wikimedia file for every broken
 * diagram URL (from diagram-url-report.json), using the Commons search API.
 *
 * For each broken diagram we search Commons (File namespace), score candidates
 * by how well their filename overlaps the diagram's name (so "Human Eye" picks
 * an eye file, not a random hit), prefer SVG > PNG > JPG, then VERIFY the chosen
 * file returns HTTP 200 before accepting it. Anything we can't confidently
 * resolve is left in `unresolved` for manual handling — we never accept a
 * file whose name doesn't overlap the concept (a wrong image is worse than an emoji).
 *
 * Output: scripts/diagram-url-fixes.json  { fixes: {id,old,new,score,file}[], unresolved: [...] }
 *
 *   npx tsx scripts/resolve-diagram-urls.ts
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPORT = path.join(__dirname, 'diagram-url-report.json');
const OUT = path.join(__dirname, 'diagram-url-fixes.json');
const UA = { 'User-Agent': 'SyllabBot/1.0 (https://syllab.in; education)' };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const GENERIC = new Set(['the', 'a', 'an', 'of', 'and', 'in', 'on', 'for', 'with', 'vs', 'its', 'their',
  'structure', 'diagram', 'system', 'types', 'type', 'process', 'model', 'basic', 'simple']);
const tok = (s: string) => s.toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9\s]/g, ' ')
  .split(/\s+/).filter((w) => w.length > 2 && !GENERIC.has(w));

// SVG only — Commons SVGs are overwhelmingly clean schematics/diagrams, never
// photos, paintings, book covers or scenery. This single constraint removes
// nearly all the wrong-image risk that free-text search otherwise introduces.
const EXT_RANK: Record<string, number> = { svg: 3 };

// Titles that are clearly NOT a school diagram even if they're SVG.
const JUNK = /\b(flag|coat of arms|logo|seal|emblem|map of|locator|patent|infected|disease|pathogen|stamp|signature|portrait|barnstar|icon|wikiproject|userbox|orthographic)\b/i;
// Non-English-labelled diagram hints (we want English or unlabelled).
const NON_EN = /\b(farsi|espa|deutsch|fran[cç]|portugu|italiano|русск|中文|日本|한국|arabic|türk|polski|svenska|nederlands|catal[aà]|ed-|-de\.|-es\.|-fr\.|-pt\.|-ru\.)\b/i;

async function fileStatus(url: string): Promise<number> {
  try { return (await fetch(url, { redirect: 'follow', headers: UA })).status; } catch { return 0; }
}

async function searchCommons(query: string): Promise<string[]> {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=15&srsearch=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(u, { headers: UA });
    const d: any = await res.json();
    return (d?.query?.search || []).map((s: any) => String(s.title).replace(/^File:/, ''));
  } catch { return []; }
}

function pathFor(file: string) {
  // encodeURIComponent leaves ' unescaped, which breaks single-quoted TS strings
  // when the URL is written into source — force %27.
  const enc = encodeURIComponent(file.replace(/ /g, '_')).replace(/'/g, '%27');
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${enc}?width=500`;
}

async function resolveOne(name: string): Promise<{ file: string; url: string; score: number } | null> {
  const want = new Set(tok(name));
  const queries = [name.replace(/\([^)]*\)/g, '').trim(), `${name.replace(/\([^)]*\)/g, '').trim()} diagram`];
  const seen = new Set<string>();
  const scored: { file: string; score: number; ext: number }[] = [];
  for (const q of queries) {
    const files = await searchCommons(q);
    await sleep(200);
    for (const f of files) {
      if (seen.has(f)) continue; seen.add(f);
      const ext = (f.split('.').pop() || '').toLowerCase();
      if (!(ext in EXT_RANK)) continue;       // SVG only
      if (JUNK.test(f) || NON_EN.test(f)) continue; // not a school diagram / wrong language
      const overlap = tok(f).filter((t) => want.has(t)).length;
      if (overlap < 1) continue;              // must be about the concept
      scored.push({ file: f, score: overlap, ext: EXT_RANK[ext] });
    }
    if (scored.length >= 3) break;
  }
  scored.sort((a, b) => b.score - a.score || b.ext - a.ext);
  // Verify the top few actually resolve (200) and accept the first that does.
  for (const c of scored.slice(0, 5)) {
    const url = pathFor(c.file);
    if (await fileStatus(url) === 200) return { file: c.file, url, score: c.score };
    await sleep(150);
  }
  return null;
}

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT, 'utf8'));
  const broken: { id: string; name: string; url: string }[] = report.broken;
  console.log(`Resolving ${broken.length} broken diagram URLs via Commons API…`);
  const fixes: any[] = [];
  const unresolved: any[] = [];
  let i = 0;
  for (const b of broken) {
    i++;
    const r = await resolveOne(b.name);
    if (r) { fixes.push({ id: b.id, name: b.name, old: b.url, new: r.url, file: r.file, score: r.score }); console.log(`  ✓ ${b.id} — ${b.name} → ${r.file} (score ${r.score})`); }
    else { unresolved.push({ id: b.id, name: b.name, old: b.url }); console.log(`  ? ${b.id} — ${b.name} — NO confident match`); }
    if (i % 20 === 0) console.log(`  …${i}/${broken.length}`);
    await sleep(250);
  }
  await fs.writeFile(OUT, JSON.stringify({ fixesCount: fixes.length, unresolvedCount: unresolved.length, fixes, unresolved }, null, 2), 'utf8');
  console.log(`\n✅ Resolved ${fixes.length}/${broken.length}; ${unresolved.length} unresolved → ${OUT}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
