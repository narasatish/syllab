#!/usr/bin/env node
/**
 * gsc-report.mjs — turn a Search Console export into decisions.
 *
 * Search Console holds the only data that says what actually brings traffic,
 * and none of it is reachable from this repo. So the workflow is: export, then
 * run this. It does the analysis that was done by hand on 21 August 2026 while
 * chasing a traffic collapse, and it does it the same way every time.
 *
 *   Search Console -> Performance -> Export -> Download CSV  (a .zip)
 *   node scripts/gsc-report.mjs ~/Downloads/....Performance-on-Search-....zip
 *
 * Optionally pass an OLDER export second to get a comparison:
 *   node scripts/gsc-report.mjs new.zip old.zip
 *
 * WHAT IT ANSWERS, and why each question earned its place:
 *
 *   1. Did traffic fall off a cliff, and when? A two-day crawl outage in August
 *      2026 dropped clicks from 44/day to 0 and took nine days to notice.
 *
 *   2. Which pages earn clicks while carrying noindex? Fifty-eight
 *      /difference-between pages were doing exactly that — 5.9% of all site
 *      clicks from pages Google was being told to drop.
 *
 *   3. Which pages draw impressions but no clicks? /full-forms drew 66,595
 *      impressions for 37 clicks — a 0.06% CTR. Re-indexing that cluster would
 *      have restored a third of the site's impressions and 2% of its clicks
 *      while putting 461 thin pages back in the index. Impressions are not the
 *      goal; this separates the two.
 *
 *   4. Which queries rank just off page one? Position 11-20 is where a small
 *      improvement moves the most traffic.
 */
import { readFileSync, existsSync, readdirSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!args.length) {
  console.log(`
Usage:  node scripts/gsc-report.mjs <export.zip|folder> [older-export.zip|folder]

Get the export from Search Console -> Performance -> Export -> Download CSV.
Pass an older export as a second argument to see what changed between them.
`);
  process.exit(0);
}

/** Accept a .zip or an already-unzipped folder. */
function open(src) {
  if (!existsSync(src)) { console.error(`Not found: ${src}`); process.exit(1); }
  if (!src.endsWith('.zip')) return src;
  const dir = path.join(os.tmpdir(), `gsc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
  mkdirSync(dir, { recursive: true });
  // python is the one unzip tool present on every machine this repo is used on
  execFileSync('python', ['-c',
    `import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])`, src, dir], { stdio: 'ignore' });
  return dir;
}

function csv(dir, name) {
  const f = path.join(dir, name);
  if (!existsSync(f)) return [];
  const text = readFileSync(f, 'utf8').replace(/^﻿/, '');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const head = lines.shift().split(',');
  return lines.map((l) => {
    // GSC quotes any field containing a comma
    const cells = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
    return Object.fromEntries(head.map((h, i) => [h, cells[i] ?? '']));
  });
}

const dir = open(args[0]);
const prevDir = args[1] ? open(args[1]) : null;

const chart = csv(dir, 'Chart.csv');
const pages = csv(dir, 'Pages.csv');
const queries = csv(dir, 'Queries.csv');
const n = (v) => Number(String(v).replace(/[^0-9.]/g, '')) || 0;

console.log('\n══ SEARCH CONSOLE REPORT ═══════════════════════════════════════════\n');

// ── 1. the trend, and any cliff ────────────────────────────────────────────
if (chart.length) {
  const rows = chart.map((r) => ({ d: r.Date, c: n(r.Clicks), i: n(r.Impressions), p: n(r.Position) }));
  const tot = rows.reduce((a, r) => ({ c: a.c + r.c, i: a.i + r.i }), { c: 0, i: 0 });
  console.log(`  PERIOD  ${rows[0].d} to ${rows[rows.length - 1].d}`);
  console.log(`          ${tot.c} clicks · ${tot.i} impressions · CTR ${(tot.c * 100 / Math.max(tot.i, 1)).toFixed(2)}%\n`);

  const last14 = rows.slice(-14);
  console.log('  LAST 14 DAYS');
  for (const r of last14) {
    const bar = '█'.repeat(Math.min(40, Math.round(r.c / Math.max(1, Math.max(...last14.map((x) => x.c))) * 40)));
    console.log(`    ${r.d}  ${String(r.c).padStart(4)} clicks ${String(r.i).padStart(6)} impr  pos ${String(r.p.toFixed(1)).padStart(5)}  ${bar}`);
  }

  // A cliff is a day that loses most of the previous day's impressions. That is
  // what a crawl or indexing failure looks like; a ranking change is gradual.
  const cliffs = [];
  for (let i = 1; i < rows.length; i++) {
    const prev = rows[i - 1], cur = rows[i];
    if (prev.i >= 500 && cur.i < prev.i * 0.35) cliffs.push({ from: prev, to: cur });
  }
  console.log('');
  if (cliffs.length) {
    console.log('  ⚠ CLIFF DETECTED — impressions lost more than 65% in a day:');
    for (const c of cliffs.slice(-3)) {
      console.log(`      ${c.from.d}  ${c.from.i} impr, pos ${c.from.p.toFixed(1)}`);
      console.log(`      ${c.to.d}  ${c.to.i} impr, pos ${c.to.p.toFixed(1)}   <-- check Crawl stats for this date`);
    }
    console.log('      A same-day collapse is almost never a ranking change. Look at');
    console.log('      Settings -> Crawl stats -> Host status first.');
  } else {
    console.log('  ✓ no single-day collapse in this period');
  }
}

// ── 2 & 3. what the built site says about the pages that earn ──────────────
if (pages.length && existsSync(DIST)) {
  const statusOf = (url) => {
    const p = url.replace('https://syllab.in', '') || '/';
    for (const f of [path.join(DIST, p, 'index.html'), path.join(DIST, `${p}.html`)]) {
      if (existsSync(f)) return /content="noindex/.test(readFileSync(f, 'utf8')) ? 'noindex' : 'index';
    }
    return 'missing';
  };
  const rows = pages.map((r) => ({
    url: r['Top pages'] || r.Page || '',
    c: n(r.Clicks), i: n(r.Impressions),
  })).filter((r) => r.url);
  for (const r of rows) r.status = statusOf(r.url);

  const earningNoindex = rows.filter((r) => r.status === 'noindex' && r.c > 0).sort((a, b) => b.c - a.c);
  console.log('\n  ── PAGES EARNING CLICKS WHILE NOINDEXED ──────────────────────────');
  if (earningNoindex.length) {
    const tc = earningNoindex.reduce((a, r) => a + r.c, 0);
    const ti = earningNoindex.reduce((a, r) => a + r.i, 0);
    console.log(`  ${earningNoindex.length} pages · ${tc} clicks · ${ti} impressions · CTR ${(tc * 100 / ti).toFixed(2)}%`);
    console.log('  These rank and convert while being told to drop. Candidates for re-indexing');
    console.log('  — but deepen them first, or you are re-indexing thin pages.\n');
    for (const r of earningNoindex.slice(0, 15)) {
      console.log(`    ${String(r.i).padStart(5)} impr ${String(r.c).padStart(3)} clk  CTR ${(r.c * 100 / r.i).toFixed(2).padStart(5)}%  ${r.url.replace('https://syllab.in', '')}`);
    }
  } else {
    console.log('  none — every click-earning page is indexable');
  }

  // The mirage: heavy impressions, no clicks. Indexing these buys vanity.
  const mirage = rows.filter((r) => r.i >= 500 && r.c === 0).sort((a, b) => b.i - a.i);
  console.log('\n  ── IMPRESSION MIRAGES (500+ impressions, ZERO clicks) ────────────');
  if (mirage.length) {
    console.log(`  ${mirage.length} pages · ${mirage.reduce((a, r) => a + r.i, 0)} impressions · 0 clicks`);
    console.log('  Google answers these in the result. Ranking them harder changes nothing.\n');
    for (const r of mirage.slice(0, 10)) console.log(`    ${String(r.i).padStart(5)} impr   ${r.url.replace('https://syllab.in', '')}`);
  } else {
    console.log('  none');
  }

  // cluster view
  const byCluster = {};
  for (const r of rows) {
    const k = '/' + (r.url.replace('https://syllab.in', '').split('/')[1] || '');
    const c = (byCluster[k] ||= { c: 0, i: 0, n: 0, noindex: 0 });
    c.c += r.c; c.i += r.i; c.n++; if (r.status === 'noindex') c.noindex++;
  }
  console.log('\n  ── BY CLUSTER ────────────────────────────────────────────────────');
  console.log('     clicks   impr    CTR   pages  noindex  cluster');
  for (const [k, v] of Object.entries(byCluster).sort((a, b) => b[1].c - a[1].c).slice(0, 15)) {
    console.log(`    ${String(v.c).padStart(6)} ${String(v.i).padStart(7)} ${(v.c * 100 / Math.max(v.i, 1)).toFixed(2).padStart(6)}% ${String(v.n).padStart(6)} ${String(v.noindex).padStart(8)}  ${k}`);
  }
}

// ── 4. queries just off page one ───────────────────────────────────────────
if (queries.length) {
  const rows = queries.map((r) => ({
    q: r['Top queries'] || r.Query || '', c: n(r.Clicks), i: n(r.Impressions), p: n(r.Position),
  })).filter((r) => r.q);
  const striking = rows.filter((r) => r.p >= 8 && r.p <= 20 && r.i >= 50).sort((a, b) => b.i - a.i);
  console.log('\n  ── QUERIES JUST OFF PAGE ONE (position 8-20, 50+ impressions) ────');
  console.log('  The cheapest traffic on the site: these already rank, they just rank low.\n');
  for (const r of striking.slice(0, 20)) {
    console.log(`    pos ${r.p.toFixed(1).padStart(4)}  ${String(r.i).padStart(5)} impr ${String(r.c).padStart(3)} clk   ${r.q.slice(0, 58)}`);
  }
  if (!striking.length) console.log('    none in range');
}

// ── comparison with an older export ────────────────────────────────────────
if (prevDir) {
  const prevPages = csv(prevDir, 'Pages.csv');
  const key = (r) => r['Top pages'] || r.Page || '';
  const prev = Object.fromEntries(prevPages.map((r) => [key(r), { c: n(r.Clicks), i: n(r.Impressions) }]));
  const moved = pages.map((r) => {
    const p = prev[key(r)] || { c: 0, i: 0 };
    return { url: key(r).replace('https://syllab.in', ''), dc: n(r.Clicks) - p.c, di: n(r.Impressions) - p.i };
  }).filter((r) => r.dc !== 0);
  moved.sort((a, b) => a.dc - b.dc);
  console.log('\n  ── CHANGE VS THE OLDER EXPORT ────────────────────────────────────');
  console.log('  biggest click losses:');
  for (const r of moved.filter((x) => x.dc < 0).slice(0, 8)) console.log(`    ${String(r.dc).padStart(5)} clicks ${String(r.di).padStart(7)} impr  ${r.url}`);
  console.log('  biggest click gains:');
  for (const r of moved.filter((x) => x.dc > 0).slice(-8).reverse()) console.log(`    ${String('+' + r.dc).padStart(5)} clicks ${String(r.di).padStart(7)} impr  ${r.url}`);
}

// keep a dated snapshot so the next run can compare without hunting for zips
try {
  const out = path.join(ROOT, 'docs', 'gsc-snapshots');
  mkdirSync(out, { recursive: true });
  const last = chart.length ? chart[chart.length - 1].Date : new Date().toISOString().slice(0, 10);
  writeFileSync(path.join(out, `${last}.json`), JSON.stringify({
    through: last,
    totals: chart.reduce((a, r) => ({ clicks: a.clicks + n(r.Clicks), impressions: a.impressions + n(r.Impressions) }), { clicks: 0, impressions: 0 }),
    daily: chart.map((r) => ({ d: r.Date, c: n(r.Clicks), i: n(r.Impressions), p: n(r.Position) })),
  }, null, 2));
  console.log(`\n  snapshot written to docs/gsc-snapshots/${last}.json`);
} catch { /* snapshot is a nicety */ }

// clean up anything we unzipped
for (const d of [dir, prevDir]) {
  if (d && d.includes('gsc-') && d.startsWith(os.tmpdir())) { try { rmSync(d, { recursive: true, force: true }); } catch {} }
}
console.log('');
