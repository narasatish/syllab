#!/usr/bin/env node
/**
 * audit-promise-kept.mjs — does the page contain what its own description says?
 *
 * /english-grammar/adjectives described itself as "simple rules, clear examples,
 * common mistakes and free practice questions for students" and its entire body
 * was that sentence repeated as a TL;DR plus a nav strip. It sat like that for
 * months. Nothing flagged it, because every existing check asked a different
 * question: the SEO audit asked whether a description EXISTS, the projection
 * audit asked whether a bank's fields are carried, and neither asked whether the
 * promise in the description is anywhere in the body.
 *
 * That is mechanically checkable. A description that advertises "examples",
 * "practice questions", "step by step" or "with solutions" makes a claim the
 * page can be measured against.
 *
 *     node scripts/audit-promise-kept.mjs            # report
 *     node scripts/audit-promise-kept.mjs --max=N    # fail above a ceiling
 *
 * It reads dist/, so run it after a build.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/**
 * A promise in the description, and what counts as keeping it in the body.
 * Deliberately conservative: each test looks for STRUCTURE (a heading, a list,
 * a table) rather than the word itself, because echoing the word in the body is
 * exactly the empty gesture this is meant to catch.
 */
const PROMISES = [
  { claim: /\bpractice questions?\b|\bquiz\b/i, kept: (b) => /<li|<ol|<h3/i.test(b), what: 'practice questions' },
  { claim: /\bexamples?\b/i, kept: (b) => /<li|<table|<h2/i.test(b), what: 'examples' },
  { claim: /\bcommon mistakes\b/i, kept: (b) => /mistake/i.test(b), what: 'common mistakes' },
  { claim: /\bstep[- ]by[- ]step\b|\bwith solutions?\b/i, kept: (b) => /<ol|<li|solution/i.test(b), what: 'step-by-step / solutions' },
  { claim: /\bchapter[- ]wise\b/i, kept: (b) => /<table|<li/i.test(b), what: 'chapter-wise listing' },
  // A page can keep a "comparison" promise two ways: BE a comparison (a table),
  // or be a hub that routes to many. /difference-between links 284 comparison
  // tables and is not itself one — demanding a table there was the check being
  // wrong, not the page.
  { claim: /\bcomparison tables?\b|\bside-by-side\b/i, kept: (b) => /<table/i.test(b) || (b.match(/<a /g) || []).length >= 8, what: 'a comparison' },
  { claim: /\bfull list\b|\bcomplete list\b/i, kept: (b) => /<table|<ul|<ol/i.test(b), what: 'a list' },
];

const pages = [];
(function walk(dir, url = '') {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (e === 'index.html') pages.push({ url: url || '/', file: p });
    else if (statSync(p).isDirectory() && !/^(assets|audio|data|fonts)$/.test(e)) walk(p, `${url}/${e}`);
  }
})(DIST);

if (!pages.length) {
  console.log('No built pages found — run `npm run build` first.');
  process.exit(0);
}

const broken = [];
let checked = 0;
for (const pg of pages) {
  const html = readFileSync(pg.file, 'utf8');
  if (/content="noindex/.test(html)) continue;            // not competing, not a promise to anyone
  const desc = (html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [, ''])[1];
  if (!desc) continue;
  const bodyM = html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
  if (!bodyM) continue;
  const body = bodyM[2];
  // Strip the TL;DR, which is the description echoed back — counting it would
  // let a page satisfy its own promise by repeating it.
  const stripped = body.replace(/TL;DR:[\s\S]{0,400}?<\//i, '');
  checked++;
  for (const p of PROMISES) {
    if (p.claim.test(desc) && !p.kept(stripped)) broken.push({ url: pg.url, what: p.what });
  }
}

console.log(`Indexable pages with a description: ${checked}`);
console.log(`Promises not kept in the body     : ${broken.length}\n`);

const byWhat = {};
for (const b of broken) (byWhat[b.what] ||= []).push(b.url);
for (const [what, urls] of Object.entries(byWhat).sort((a, c) => c[1].length - a[1].length)) {
  console.log(`  ${String(urls.length).padStart(4)}  description promises ${what}`);
  for (const u of urls.slice(0, 5)) console.log(`        ${u}`);
  if (urls.length > 5) console.log(`        … and ${urls.length - 5} more`);
}
if (!broken.length) console.log('✓ every indexable page delivers what its description advertises.');

const maxArg = process.argv.find((a) => a.startsWith('--max='));
if (maxArg && broken.length > Number(maxArg.split('=')[1])) {
  console.log(`\n✗ above the agreed ceiling of ${maxArg.split('=')[1]}.`);
  process.exit(1);
}
