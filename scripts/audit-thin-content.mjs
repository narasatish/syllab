/**
 * audit-thin-content.mjs — how much REAL text does each page type carry?
 *
 * Post-March-2026 Google penalises thin, mass-produced pages, and the penalty
 * is a domain-level quality signal — a large cluster of near-empty pages drags
 * down the pages that are actually good. So "how many pages do we have" is the
 * wrong question; "how many carry real content" is the right one.
 *
 * Measures visible words in the PRERENDERED html (what a crawler sees before
 * JS), stripping script/style/nav chrome. Samples per route group so it runs in
 * a couple of minutes rather than an hour.
 *
 *   node scripts/audit-thin-content.mjs
 *   node scripts/audit-thin-content.mjs --per 8 --base https://syllab.in
 */
import { readFile } from 'node:fs/promises';

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i < 0 ? d : argv[i + 1]; };
const BASE = arg('base', 'https://syllab.in');
const PER = parseInt(arg('per', '5'), 10);

const xml = await readFile('public/sitemap.xml', 'utf8');
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/');

const groups = new Map();
for (const p of paths) {
  const key = '/' + (p.split('/').filter(Boolean)[0] ?? '(home)');
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(p);
}

/** Visible words a crawler would read. */
function wordCount(html) {
  let t = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
  return t.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
}

const rows = [];
for (const [group, list] of groups) {
  // Spread the sample EVENLY across the group instead of taking the first N.
  // Taking the first N samples the hub pages (/colleges, /colleges/national,
  // …), which are short by design, and made a first run report /colleges at a
  // median of 120 words when /colleges/national/iit-madras alone has 802.
  const step = Math.max(1, Math.floor(list.length / PER));
  const sample = [];
  for (let i = 0; i < list.length && sample.length < PER; i += step) sample.push(list[i]);
  const counts = [];
  await Promise.all(sample.map(async (p) => {
    try {
      const res = await fetch(BASE + p, { signal: AbortSignal.timeout(40_000) });
      if (res.ok) counts.push(wordCount(await res.text()));
    } catch { /* skip */ }
  }));
  if (counts.length) {
    counts.sort((a, b) => a - b);
    rows.push({
      group,
      pages: list.length,
      sampled: counts.length,
      median: counts[Math.floor(counts.length / 2)],
      min: counts[0],
    });
  }
  process.stdout.write(`  ${rows.length}/${groups.size}\r`);
}

rows.sort((a, b) => a.median - b.median);

console.log('\n');
console.log('THIN-CONTENT AUDIT — visible words in prerendered HTML');
console.log('(Google\'s rough working threshold for "substantive" is ~600+ words;');
console.log(' under ~300 on a large cluster is a domain-level quality risk)\n');
console.log('group'.padEnd(26) + 'pages'.padStart(7) + 'median'.padStart(9) + 'min'.padStart(8) + '   verdict');
console.log('-'.repeat(70));

let atRisk = 0;
for (const r of rows) {
  let verdict = 'ok';
  if (r.median < 300) { verdict = r.pages >= 20 ? 'THIN AT SCALE' : 'thin'; }
  else if (r.median < 600) verdict = 'shallow';
  if (r.median < 300 && r.pages >= 20) atRisk += r.pages;
  console.log(
    r.group.padEnd(26) +
    String(r.pages).padStart(7) +
    String(r.median).padStart(9) +
    String(r.min).padStart(8) +
    '   ' + verdict,
  );
}
console.log('-'.repeat(70));
console.log(`pages in THIN-AT-SCALE clusters: ${atRisk} of ${paths.length}`);
