#!/usr/bin/env node
/**
 * audit-user-visible.mjs — does the authored prose reach a reader, or only a crawler?
 *
 * Every page ships its body inside #prerender-seo: position:absolute, 1x1,
 * clip:rect(0,0,0,0), aria-hidden="true". That is deliberate — SSR was switched
 * off in v288 because it shipped a permanent spinner (see DEFAULT_SSR_ROUTES in
 * generate-prerender.mjs) — and it is what lets a non-JS crawler read the page.
 * Once React mounts, the reader sees whatever the React components render
 * INSTEAD.
 *
 * So a paragraph written into the prerendered body reaches a reader only if the
 * React side happens to render the same thing. On /best-colleges/cse it does
 * not: measured in a real browser, 1,726 words in the hidden block against 791
 * visible, with "Choosing a Branch, Not Just a College" and the FAQ block
 * appearing only in the hidden copy.
 *
 * Checking that for 2,483 pages needs no browser. Static copy that React
 * renders has to EXIST in the shipped JavaScript (or in the JSON the app
 * fetches). If a phrase appears nowhere in either, the app cannot render it,
 * and the prose is crawler-only. That direction of the test is conclusive: a
 * miss is proof of absence, not a guess.
 *
 * The reverse is not claimed. A phrase found in the bundle is only evidence the
 * app COULD render it — this reports those as "present in the client", not as
 * confirmed visible.
 *
 *     node scripts/audit-user-visible.mjs             # report by cluster
 *     node scripts/audit-user-visible.mjs --list      # name the pages
 *     node scripts/audit-user-visible.mjs --max=N     # fail above a ceiling
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.log('No dist/ — run `npm run build` first.');
  process.exit(0);
}

// ── the haystack: everything the client can possibly get its text from ──────
let haystack = '';
const assets = path.join(DIST, 'assets');
if (existsSync(assets)) {
  for (const f of readdirSync(assets)) {
    if (f.endsWith('.js') || f.endsWith('.css')) haystack += readFileSync(path.join(assets, f), 'utf8');
  }
}
const dataDir = path.join(DIST, 'data');
if (existsSync(dataDir)) {
  for (const f of readdirSync(dataDir)) {
    if (f.endsWith('.json')) haystack += readFileSync(path.join(dataDir, f), 'utf8');
  }
}
// Normalise: bundlers escape quotes and split whitespace differently from HTML.
const norm = (s) => s
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\\n|\\r|\\t/g, ' ')
  .replace(/\\"/g, '"').replace(/\\'/g, "'")
  .replace(/[\s ]+/g, ' ')
  .toLowerCase();
haystack = norm(haystack);

if (haystack.length < 10000) {
  console.log('Client bundle looks empty — run `npm run build` first.');
  process.exit(0);
}

// ── collect the prose each page hides ───────────────────────────────────────
const pages = [];
(function walk(dir, url = '') {
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (e === 'index.html') {
      const html = readFileSync(p, 'utf8');
      if (!/content="noindex/.test(html)) pages.push({ url: url || '/', html });
    } else if (statSync(p).isDirectory() && !/^(assets|audio|data|fonts|images|icons|posters|web-stories)$/.test(e)) {
      walk(p, `${url}/${e}`);
    }
  }
})(DIST);

/**
 * A probe is a distinctive run of words from an authored paragraph or heading.
 * Six words is long enough to be unique to this site and short enough to
 * survive a bundler splitting a string across concatenations.
 */
function probesFor(html) {
  const block = html.match(/<div id="prerender-seo"[^>]*>([\s\S]*?)<\/div>\s*(?=<script|<\/body)/i);
  const body = block ? block[1] : (html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i) || [, '', ''])[2];
  const out = [];
  for (const m of body.matchAll(/<(p|h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = norm(m[2].replace(/<[^>]*>/g, ' ')).trim();
    const words = text.split(' ').filter(Boolean);
    if (words.length < 8) continue;                    // too short to be distinctive
    if (/^(home|explore|skip to)/.test(text)) continue; // chrome
    /**
     * Prerender-only furniture is not withheld content.
     *
     * buildBodyContent wraps every page in a TL;DR, an author line, an AI-tutor
     * prompt and a footer. None of it is authored page content and none of it is
     * meant to appear in the app, so counting it made all 2,483 pages look
     * affected and buried the real signal. Excluded by exact opening phrase, so
     * a genuine paragraph that merely mentions Syllab still counts.
     */
    if (/^(written & reviewed by the syllab\.in|tl;dr:|stuck on any question|syllab\.in . free learning for indian students|✓ 100% free)/.test(text)) continue;
    // Three windows across the paragraph, not just the opening.
    //
    // A single 6-word probe taken from the start of a sentence straddles the
    // interpolated values these templates are built from — "free ncert
    // solutions for class 10" is `Free NCERT solutions for Class ${cls}` and
    // never appears verbatim in a bundle even when React renders the very same
    // sentence. Sampling the middle and end as well means a paragraph counts as
    // present if ANY stretch of it is in the client, which is the conservative
    // direction: it under-reports gaps rather than inventing them.
    const mid = Math.max(0, Math.floor(words.length / 2) - 3);
    const end = Math.max(0, words.length - 7);
    out.push([
      words.slice(0, 6).join(' '),
      words.slice(mid, mid + 6).join(' '),
      words.slice(end, end + 6).join(' '),
    ].filter((x) => x.split(' ').length >= 5));
    if (out.length >= 6) break;
  }
  return out;
}

const byCluster = {};
const missingPages = [];
let checked = 0, probesTotal = 0, probesMissing = 0;

/**
 * One pass over the bundle, not one per probe.
 *
 * Searching a 16 MB haystack for each of 44,000 probes is minutes of work and
 * timed out. Instead: collect every probe, then slide a six-word window across
 * the bundle once and look each window up in a Set. Same answer, seconds.
 */
const allProbes = new Map();          // url -> string[][]
for (const p of pages) {
  const probes = probesFor(p.html);
  if (probes.length) allProbes.set(p.url, probes);
}
const wanted = new Set();
for (const probes of allProbes.values()) for (const windows of probes) for (const q of windows) wanted.add(q);

const found = new Set();
{
  const words = haystack.split(' ');
  for (let i = 0; i + 6 <= words.length; i++) {
    const g = words.slice(i, i + 6).join(' ');
    if (wanted.has(g)) found.add(g);
  }
}

for (const p of pages) {
  const probes = allProbes.get(p.url);
  if (!probes) continue;
  checked++;
  const miss = probes.filter((windows) => !windows.some((q) => found.has(q)));
  probesTotal += probes.length;
  probesMissing += miss.length;
  const cluster = '/' + (p.url.split('/')[1] || 'root');
  const c = (byCluster[cluster] ||= { pages: 0, hitPages: 0, probes: 0, missing: 0, sample: '' });
  c.pages++; c.probes += probes.length; c.missing += miss.length;
  /**
   * Flag a page for ANY crawler-only paragraph, not only for all of them.
   *
   * The first version required every probe on a page to be missing, and that
   * excused /best-colleges/cse — whose authored prose ("Choosing a Branch, Not
   * Just a College" and its FAQ) is provably absent from the client JS, and was
   * measured as unrendered in a real browser — because one generic phrase
   * elsewhere on the page happened to match. A page that shows the reader nine
   * paragraphs out of ten still withholds the tenth, and the per-page metric
   * reported that page as clean. Counting paragraphs is the honest unit.
   */
  if (miss.length) {
    c.hitPages++;
    if (!c.sample) c.sample = `${p.url}  —  "${miss[0][0]}…"`;
    missingPages.push(p.url);
  }
}

console.log(`Indexable pages with authored prose : ${checked}`);
console.log(`Prose/heading probes taken          : ${probesTotal}`);
console.log(`Probes found nowhere in the client  : ${probesMissing}  (${Math.round((probesMissing / probesTotal) * 100)}%)`);
console.log(`Pages with at least one crawler-only paragraph: ${missingPages.length}\n`);

const rows = Object.entries(byCluster).sort((a, b) => b[1].missing - a[1].missing);
console.log('cluster                       pages  affected  crawler-only paras  sample');
for (const [c, v] of rows) {
  if (!v.missing) continue;
  console.log(`  ${c.padEnd(28)} ${String(v.pages).padStart(5)}  ${String(v.hitPages).padStart(8)}  ${String(v.missing).padStart(18)}  ${v.sample}`);
}
if (!missingPages.length) console.log('✓ every authored paragraph exists somewhere in the client bundle.');

if (process.argv.includes('--list')) {
  console.log('\nPages whose prose exists only in the hidden block:');
  for (const u of missingPages.slice(0, 200)) console.log('  ' + u);
  if (missingPages.length > 200) console.log(`  … and ${missingPages.length - 200} more`);
}

const maxArg = process.argv.find((a) => a.startsWith('--max='));
if (maxArg && missingPages.length > Number(maxArg.split('=')[1])) {
  console.log(`\n✗ ${missingPages.length} pages above the agreed ceiling of ${maxArg.split('=')[1]}.`);
  process.exit(1);
}
