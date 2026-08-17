#!/usr/bin/env node
/**
 * audit-cannibalisation.mjs — find indexable pages competing for the same query.
 *
 * Two pages targeting one intent split their own signals: each earns half the
 * links and half the engagement, and Google picks one — often the weaker one.
 * The v320 handoff lists cannibalisation under "never checked", and the first
 * query examined turned up three overlapping pages (cube-roots-1-to-20,
 * cube-roots-1-to-30, cubes-1-to-30) all indexed and all thin.
 *
 * Only INDEXABLE pages can cannibalise, so noindex pages are excluded — that is
 * what makes this different from a plain duplicate-title check. A pruned tail
 * page sharing a title with a live one is not a problem.
 *
 *     node scripts/audit-cannibalisation.mjs            # report
 *     node scripts/audit-cannibalisation.mjs --strict   # exit 1 on exact dupes
 *
 * Exact duplicate titles are always a defect. Near-duplicates are judgement:
 * "Cube Roots 1 to 20" and "Cube Roots 1 to 30" are legitimately different
 * charts, but they compete for the same searcher, so they are reported for a
 * human to decide rather than failed automatically.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** Words carrying no topical meaning — stripped before comparing titles. */
const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'with',
  'free', 'full', 'chart', 'quick', 'revision', 'explained', 'simply', 'syllab', 'in',
  'notes', 'guide', 'complete', 'best', 'top', 'online', 'download', 'pdf', 'class']);

/** Reduce a title to its topical fingerprint: sorted, de-stopworded word set. */
function fingerprint(title) {
  return [...new Set(
    String(title)
      .replace(/\|.*$/, '')                    // drop the " | Syllab.in" suffix
      .replace(/&[a-z]+;/gi, ' ')
      .toLowerCase()
      // Devanagari is KEPT: stripping it collapsed every /hi/ page to the same
      // near-empty fingerprint and reported them as competing with each other.
      .replace(/[^a-z0-9ऀ-ॿ\s]/g, ' ')
      .split(/\s+/)
      // Single characters are KEPT when numeric: dropping them made
      // "multiplication table of 2" and "... of 3" identical, which reported
      // the entire /maths-tables cluster as one duplicate group.
      .filter((w) => w && !STOP.has(w) && (w.length > 1 || /[0-9]/.test(w))),
  )].sort().join(' ');
}

/** Jaccard overlap of two fingerprints. */
function overlap(a, b) {
  const A = new Set(a.split(' ')), B = new Set(b.split(' '));
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / (A.size + B.size - inter);
}

/**
 * Class number and subject, pulled from the URL.
 *
 * Without this the near-duplicate pass is useless: "class 10 science" and
 * "class 10 social science" share most of their tokens, as do the Class 9 and
 * Class 11 versions of "work energy power". Those are legitimately separate
 * pages for separate audiences and must never be reported as competing. A tool
 * whose output you have to hand-filter is one nobody runs twice.
 */
const SUBJECTS = ['social-science', 'science', 'maths', 'mathematics', 'physics', 'chemistry',
  'biology', 'english', 'hindi', 'sst', 'economics', 'history', 'geography', 'civics'];
function facets(url) {
  const cls = (url.match(/class-(\d+)/) || [, null])[1];
  const subj = SUBJECTS.find((s) => url.includes(`-${s}`) || url.includes(`/${s}`)) || null;
  return { cls, subj };
}
/** True when two URLs target genuinely different audiences. */
function differentAudience(urlA, urlB) {
  // DIFFERENT CLUSTERS ARE NEVER DUPLICATES. /revision-notes/class-10-maths-circles
  // and /mcqs/class-10-maths-circles share a topical fingerprint but answer
  // different intents — read the chapter versus practise it. Without this rule
  // the audit proposed retiring 39 revision-note pages because the matching MCQ
  // page happened to be longer, which would have deleted a whole cluster's worth
  // of legitimate pages while appearing to remove duplicates.
  if (urlA.split('/')[1] !== urlB.split('/')[1]) return true;
  // /hi/* pages are Hindi translations carrying reciprocal hreflang with their
  // English counterparts. An alternate is the OPPOSITE of a duplicate — telling
  // Google these compete would be exactly wrong.
  if (urlA.startsWith('/hi/') !== urlB.startsWith('/hi/')) return true;
  const a = facets(urlA), b = facets(urlB);
  if (a.cls && b.cls && a.cls !== b.cls) return true;
  if (a.subj && b.subj && a.subj !== b.subj) return true;
  return false;
}

// ── Collect indexable pages ──────────────────────────────────────────────────
const pages = [];
(function walk(dir, url = '') {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (e === 'index.html') {
      const h = readFileSync(p, 'utf8');
      if (/noindex/i.test(h)) return;                       // cannot cannibalise
      const t = (h.match(/<title[^>]*>([^<]*)<\/title>/i) || [, ''])[1];
      if (t) pages.push({ url: url || '/', title: t.trim(), fp: fingerprint(t) });
    } else if (statSync(p).isDirectory() && !/^(assets|audio|story-lessons|data)$/.test(e)) {
      walk(p, `${url}/${e}`);
    }
  }
})(DIST);

if (!pages.length) {
  console.log('No built pages found — run `npm run build` first.');
  process.exit(0);
}

// ── 1. Exact duplicate titles ────────────────────────────────────────────────
const byTitle = new Map();
for (const p of pages) {
  const k = p.title.toLowerCase();
  (byTitle.get(k) || byTitle.set(k, []).get(k)).push(p);
}
const exact = [...byTitle.values()].filter((g) => g.length > 1);

// ── 2. Same topical fingerprint, different title ─────────────────────────────
const byFp = new Map();
for (const p of pages) {
  if (!p.fp) continue;
  (byFp.get(p.fp) || byFp.set(p.fp, []).get(p.fp)).push(p);
}
const sameTopic = [...byFp.values()]
  .filter((g) => g.length > 1 && new Set(g.map((x) => x.title.toLowerCase())).size > 1)
  // Same reasoning as the near-duplicate pass: a shared fingerprint across
  // different classes or subjects is two audiences, not one contested query.
  .filter((g) => g.some((x, i) => g.some((y, j) => j > i && !differentAudience(x.url, y.url))));

// ── 3. Near-duplicates within a cluster (expensive, so cluster-scoped) ───────
const byCluster = new Map();
for (const p of pages) {
  const c = '/' + p.url.split('/')[1];
  (byCluster.get(c) || byCluster.set(c, []).get(c)).push(p);
}
const near = [];
for (const [cluster, group] of byCluster) {
  if (group.length < 2 || group.length > 600) continue;
  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      if (group[i].fp === group[j].fp) continue;             // already reported above
      if (differentAudience(group[i].url, group[j].url)) continue; // different class/subject
      const o = overlap(group[i].fp, group[j].fp);
      if (o >= 0.8) near.push({ cluster, o, a: group[i], b: group[j] });
    }
  }
}
near.sort((x, y) => y.o - x.o);

// ── Report ───────────────────────────────────────────────────────────────────
console.log(`Indexable pages scanned: ${pages.length}\n`);

console.log(`EXACT duplicate titles: ${exact.length} group(s)`);
for (const g of exact.slice(0, 15)) {
  console.log(`  "${g[0].title.slice(0, 70)}"`);
  g.forEach((p) => console.log(`      ${p.url}`));
}

console.log(`\nSAME topic, different wording: ${sameTopic.length} group(s)`);
for (const g of sameTopic.slice(0, 15)) {
  g.forEach((p) => console.log(`      ${p.url.padEnd(52)} ${p.title.slice(0, 58)}`));
  console.log('');
}

console.log(`NEAR-duplicates within a cluster (>=80% topic overlap): ${near.length} pair(s)`);
for (const n of near.slice(0, 20)) {
  console.log(`  ${(n.o * 100).toFixed(0)}%  ${n.a.url}`);
  console.log(`       ${n.b.url}`);
}

const fatal = exact.length + sameTopic.length;
console.log(`\n${fatal ? `✗ ${fatal} group(s) of pages competing for the same intent.` : '✓ no exact or same-topic collisions.'}`);
if (near.length) console.log(`  ${near.length} near-duplicate pair(s) need a human decision — see above.`);
if (process.argv.includes('--strict') && exact.length) process.exit(1);
