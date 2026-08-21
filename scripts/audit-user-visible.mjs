#!/usr/bin/env node
/**
 * audit-user-visible.mjs — is the authored prose delivered to the reader?
 *
 * Every page ships its body inside #prerender-seo: position:absolute, 1x1,
 * clip:rect(0,0,0,0), aria-hidden="true". That is deliberate — SSR was switched
 * off in v288 because it shipped a permanent spinner (see DEFAULT_SSR_ROUTES in
 * generate-prerender.mjs) — and it is what lets a non-JS crawler read the page.
 * Once React mounts, the reader sees whatever the React components render
 * INSTEAD.
 *
 * main.tsx used to DELETE that block on mount, so any paragraph the React
 * components did not themselves render was visible to Googlebot and to nobody
 * else. Measured in a real browser on /best-colleges/cse: 1,726 words in the
 * hidden block against 791 visible, with "Choosing a Branch, Not Just a
 * College" and the FAQ appearing only in the hidden copy.
 *
 * That is fixed — revealPrerenderedProse() now keeps the sections the
 * components do not already render and puts them on the page. This script
 * therefore does two different jobs, and it is worth being clear about which
 * number means what:
 *
 *   DIAGNOSTIC. How much of each page's prose the React components do not
 *   contain, found by checking whether the text exists anywhere in the shipped
 *   JavaScript or JSON. That is the content the reveal is responsible for
 *   delivering. It is not a defect count — since the fix, a high number here
 *   means the reveal is doing a lot of work, not that anything is broken.
 *
 *   THE GATE. That the reveal still ships. If someone restores the one-line
 *   `.remove()`, 4,521 paragraphs across 1,880 pages go dark again in silence
 *   and nothing else in this repo would notice.
 *
 *     node scripts/audit-user-visible.mjs             # report by cluster
 *     node scripts/audit-user-visible.mjs --list      # name the pages
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
console.log(`Paragraphs the components lack      : ${probesMissing}  (${Math.round((probesMissing / probesTotal) * 100)}%)`);
console.log(`Pages relying on the reveal to deliver prose : ${missingPages.length}`);
console.log('(the components do not contain this text; revealPrerenderedProse shows it)\n');

const rows = Object.entries(byCluster).sort((a, b) => b[1].missing - a[1].missing);
console.log('cluster                       pages  affected  paras via reveal  sample');
for (const [c, v] of rows) {
  if (!v.missing) continue;
  console.log(`  ${c.padEnd(28)} ${String(v.pages).padStart(5)}  ${String(v.hitPages).padStart(8)}  ${String(v.missing).padStart(18)}  ${v.sample}`);
}
if (!missingPages.length) console.log('Every authored paragraph is also present in the component bundle.');

if (process.argv.includes('--list')) {
  console.log('\nPages whose prose exists only in the hidden block:');
  for (const u of missingPages.slice(0, 200)) console.log('  ' + u);
  if (missingPages.length > 200) console.log(`  … and ${missingPages.length - 200} more`);
}

/**
 * The verdict, and why it is not the paragraph count above.
 *
 * This audit was written when main.tsx DELETED #prerender-seo on mount, so a
 * paragraph absent from the bundle was a paragraph no reader could ever see.
 * That is no longer how the page works: revealPrerenderedProse() now keeps the
 * sections the React components do not already render and puts them on the
 * page, reading them out of the prerendered DOM rather than out of the bundle.
 *
 * So the counts above are now a DIAGNOSTIC — they say how much of the page's
 * prose the React components do not themselves contain, which is exactly the
 * content the reveal is responsible for delivering. They are no longer a
 * defect count, and failing the build on them would be failing on a problem
 * that was fixed.
 *
 * What must not regress is the mechanism. If someone restores the old
 * one-line `.remove()`, those 4,521 paragraphs go dark again silently and
 * nothing else in the repo would notice. So that is what is gated.
 */
const bundle = (() => {
  let js = '';
  if (existsSync(assets)) for (const f of readdirSync(assets)) if (f.endsWith('.js')) js += readFileSync(path.join(assets, f), 'utf8');
  return js;
})();
const revealShips = bundle.includes('prerender-prose');

console.log(`\nReveal mechanism present in the built client: ${revealShips ? 'yes' : 'NO'}`);
if (!revealShips) {
  console.log('✗ #prerender-seo is being removed without being shown.');
  console.log('  Every paragraph counted above would then be readable by crawlers and by nobody else.');
  console.log('  Restore revealPrerenderedProse() in src/main.tsx.');
  process.exit(1);
}
console.log('✓ prose the components do not render is revealed to the reader rather than deleted.');
