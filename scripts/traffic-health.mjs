#!/usr/bin/env node
/**
 * traffic-health.mjs — one command for everything that brings traffic.
 *
 * WHY THIS EXISTS
 *
 * On 16-17 August 2026 robots.txt became unfetchable. Googlebot stopped
 * crawling the entire site for two days — the only two zero-crawl days in 89 —
 * and when it resumed the site had fallen roughly 40 positions. Clicks went from
 * 44 a day to 0. Nothing in this repo noticed: the build passed, the tests
 * passed, the SEO audit passed, and the site served 200s the whole time. The
 * failure was found nine days later by reading a Search Console export by hand.
 *
 * Every check below is one that would have caught a real regression this
 * codebase has actually shipped. They were written one at a time while chasing
 * separate incidents; this file is the standing version, so the next one is
 * caught by a command rather than by noticing.
 *
 *     node scripts/traffic-health.mjs              # offline checks (fast, CI)
 *     node scripts/traffic-health.mjs --live       # + live HTTP against production
 *     node scripts/traffic-health.mjs --json       # machine-readable, for trends
 *
 * Exit code is non-zero if any check FAILS. WARN does not fail the build: a warn
 * is something to look at, a fail is something that costs traffic today.
 *
 * SCOPE, STATED HONESTLY. This measures what is measurable from the repo, the
 * build output and live HTTP. It cannot see rankings, backlinks, Search Console
 * or CrUX field data — those need exports or paid APIs, and the checks that
 * depend on them say so rather than quietly passing.
 */
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://syllab.in';
const LIVE = process.argv.includes('--live');
const JSON_OUT = process.argv.includes('--json');

const results = [];
const add = (area, name, status, detail, evidence) => results.push({ area, name, status, detail, evidence });
const PASS = 'PASS', WARN = 'WARN', FAIL = 'FAIL', SKIP = 'SKIP';

if (!existsSync(DIST)) {
  console.log('No dist/ — run `npm run build` first.');
  process.exit(0);
}

// ── load the built site once ────────────────────────────────────────────────
const pages = new Map();     // url -> { html, body, noindex }
(function walk(dir, url = '') {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (entry === 'index.html') {
      const html = readFileSync(p, 'utf8');
      const seo = html.match(/<div id="prerender-seo"[^>]*>([\s\S]*)$/i);
      const art = html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
      pages.set(url || '/', {
        html,
        body: seo ? seo[1] : (art ? art[2] : ''),
        noindex: /content="noindex/.test(html),
      });
    } else if (statSync(p).isDirectory() && !/^(assets|audio|data|fonts|images|icons|posters|web-stories)$/.test(entry)) {
      walk(p, `${url}/${entry}`);
    }
  }
})(DIST);

const indexable = [...pages].filter(([, v]) => !v.noindex);

/**
 * Does this URL resolve on the live site?
 *
 * Firebase serves this project with cleanUrls, so /posters/x is answered by the
 * file posters/x.html. Checking only for <path>/index.html reported eight
 * perfectly good poster links as 404s on the first run of this script — a false
 * alarm, and a checker that raises those is a checker people learn to skip.
 */
const flatFiles = new Set();
(function walkFlat(dir, url = '') {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) { if (!/^(assets|audio|data|fonts|images|icons)$/.test(entry)) walkFlat(p, `${url}/${entry}`); }
    else if (entry === 'index.html') flatFiles.add(url || '/');   // dirs excluded from the page scan (e.g. /web-stories) still resolve
    else if (entry.endsWith('.html')) flatFiles.add(`${url}/${entry.replace(/\.html$/, '')}`);
  }
})(DIST);
const resolves = (u) => pages.has(u) || flatFiles.has(u) || flatFiles.has(u.replace(/\.html$/, ''));
const words = (s) => String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
const decode = (s) => String(s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// ═══ AREA 1 — CRAWL & INDEX ════════════════════════════════════════════════
// The area that actually cost traffic. Everything here is a hard fail.

{
  // robots.txt is the highest-stakes file on the site: a 5xx or a timeout stops
  // Googlebot crawling EVERYTHING, not just that file.
  const f = path.join(DIST, 'robots.txt');
  if (!existsSync(f)) {
    add('crawl', 'robots.txt present', FAIL, 'dist/robots.txt is missing — the SPA rewrite will answer with HTML and a 200');
  } else {
    const t = readFileSync(f, 'utf8');
    const problems = [];
    if (t.trimStart().startsWith('<')) problems.push('served HTML, not directives');
    if (!/user-agent:/i.test(t)) problems.push('no User-agent directive');
    if (!/sitemap:/i.test(t)) problems.push('no Sitemap: line');
    add('crawl', 'robots.txt valid', problems.length ? FAIL : PASS,
      problems.length ? problems.join('; ') : `${t.length} bytes, has User-agent and Sitemap`);
  }
}

{
  // Sitemap and build must agree in BOTH directions. They have drifted three
  // times: retirement rules, city counts, and noindexed important-questions.
  const smFile = path.join(DIST, 'sitemap.xml');
  if (!existsSync(smFile)) {
    add('crawl', 'sitemap present', FAIL, 'dist/sitemap.xml missing');
  } else {
    const sm = readFileSync(smFile, 'utf8');
    const locs = [...sm.matchAll(/<loc>https:\/\/syllab\.in([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
    const inSm = new Set(locs);
    const missing = indexable.filter(([u]) => !inSm.has(u) && !u.startsWith('/web-stories')).length;
    const ghosts = [...pages].filter(([u, v]) => v.noindex && inSm.has(u)).length;
    const dotHtml = locs.filter((u) => /\.html$/.test(u)).length;
    add('crawl', 'sitemap ↔ build agree', ghosts ? FAIL : PASS,
      `${locs.length} URLs · ${ghosts} noindex pages wrongly listed · ${missing} indexable pages absent (some intentional)`);
    // cleanUrls turns /x.html into a 301, so a .html <loc> is a redirect in the sitemap
    add('crawl', 'no redirect traps in sitemap', dotHtml ? FAIL : PASS,
      dotHtml ? `${dotHtml} sitemap URLs end in .html and will 301 under cleanUrls` : 'no .html URLs');
  }
}

{
  // A page no link reaches is a page only the sitemap knows about. 286 pages
  // sat in that state until August 2026 — whole clusters of them.
  const linksFrom = (u) => {
    const out = new Set();
    for (const m of (pages.get(u)?.body || '').matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1].replace(/\/$/, '') || '/';
      if (pages.has(href)) out.add(href);
    }
    return out;
  };
  const seen = new Set(['/']);
  const queue = ['/'];
  while (queue.length) for (const n of linksFrom(queue.shift())) if (!seen.has(n)) { seen.add(n); queue.push(n); }
  const unreachable = indexable.filter(([u]) => !seen.has(u)).length;
  add('crawl', 'every indexable page reachable', unreachable ? FAIL : PASS,
    unreachable ? `${unreachable} pages reachable only via the sitemap` : `all ${indexable.length} reachable from /`);
}

{
  // 1,195 internal links pointed at 66 hard 404s until August 2026, because the
  // breadcrumb linked every path segment whether a page existed there or not.
  const broken = new Map();
  const redirects = new Set();
  for (const [u, v] of pages) {
    for (const m of v.body.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1].replace(/\/$/, '') || '/';
      if (/\.(html|htm)$/.test(href)) { redirects.add(href); continue; }
      if (/\.(pdf|png|svg|xml|json|txt|jpg|webp)$/.test(href)) continue;
      if (href.startsWith('/web-stories')) continue;
      if (!resolves(href)) broken.set(href, (broken.get(href) || 0) + 1);
    }
  }
  const total = [...broken.values()].reduce((a, b) => a + b, 0);
  add('links', 'no internal links to 404s', broken.size ? FAIL : PASS,
    broken.size ? `${total} links to ${broken.size} dead targets` : 'none',
    [...broken.keys()].slice(0, 8));
  add('links', 'no internal links to redirects', redirects.size ? WARN : PASS,
    redirects.size ? `${redirects.size} link targets end in .html and 301 under cleanUrls` : 'none',
    [...redirects].slice(0, 5));
}

// ═══ AREA 2 — CONTENT QUALITY ══════════════════════════════════════════════

{
  const T = new Map(), D = new Map();
  let tLong = 0, dLong = 0, thin = 0, noH1 = 0, multiH1 = 0, skips = 0;
  for (const [u, v] of indexable) {
    const t = decode((v.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]).trim();
    const d = decode((v.html.match(/name="description" content="([^"]*)"/i) || [, ''])[1]);
    if (t) (T.get(t) || T.set(t, []).get(t)).push(u);
    if (d) (D.get(d) || D.set(d, []).get(d)).push(u);
    if (t.length > 65) tLong++;
    if (d.length > 160) dLong++;
    if (words(v.body) < 250) thin++;
    const h1 = (v.body.match(/<h1/g) || []).length;
    if (h1 === 0) noH1++; else if (h1 > 1) multiH1++;
    const order = [...v.body.matchAll(/<h([1-6])/g)].map((x) => Number(x[1]));
    for (let i = 1; i < order.length; i++) if (order[i] - order[i - 1] > 1) { skips++; break; }
  }
  const dupT = [...T].filter(([, a]) => a.length > 1);
  const dupD = [...D].filter(([, a]) => a.length > 1);
  add('content', 'no duplicate titles', dupT.length ? FAIL : PASS, `${dupT.length} groups`, dupT.slice(0, 3).map(([k]) => k.slice(0, 60)));
  add('content', 'no duplicate descriptions', dupD.length ? FAIL : PASS, `${dupD.length} groups`);
  add('content', 'exactly one H1', (multiH1 || noH1 > 1) ? FAIL : PASS, `${multiH1} pages with >1, ${noH1} with none`);
  add('content', 'no heading-level skips', skips ? WARN : PASS, `${skips} pages jump a level`);
  add('content', 'titles fit the result', tLong > indexable.length * 0.35 ? WARN : PASS, `${tLong} of ${indexable.length} over 65 chars`);
  add('content', 'descriptions fit the result', dLong ? WARN : PASS, `${dLong} over 160 chars`);
  add('content', 'no thin indexable pages', thin ? WARN : PASS, `${thin} indexable pages under 250 words`);
}

{
  // Article rich results need image, publisher and a real datePublished. 492
  // nodes had no image and 352 claimed to be published on the day of the build.
  let arts = 0, noImg = 0, noPub = 0, noDate = 0, badJson = 0, today = 0;
  const stamp = new Date().toISOString().slice(0, 10);
  for (const [, v] of indexable) {
    for (const m of v.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let j; try { j = JSON.parse(m[1]); } catch { badJson++; continue; }
      for (const n of (Array.isArray(j) ? j : [j])) {
        if (!n || n['@type'] !== 'Article') continue;
        arts++;
        if (!n.image) noImg++;
        if (!n.publisher) noPub++;
        if (!n.datePublished) noDate++;
        else if (n.datePublished === stamp) today++;
      }
    }
  }
  add('schema', 'JSON-LD parses', badJson ? FAIL : PASS, `${badJson} invalid blocks`);
  add('schema', 'Article nodes complete', (noImg || noPub || noDate) ? FAIL : PASS,
    `${arts} Article nodes · ${noImg} without image · ${noPub} without publisher · ${noDate} without datePublished`);
  add('schema', 'no build-stamped publish dates', today ? FAIL : PASS,
    today ? `${today} Articles claim to be published today — the date moves every build` : 'dates are stable');
}

// ═══ AREA 3 — GEO / AI SEARCH ══════════════════════════════════════════════

{
  const robots = existsSync(path.join(DIST, 'robots.txt')) ? readFileSync(path.join(DIST, 'robots.txt'), 'utf8') : '';
  const bots = ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'];
  const missing = bots.filter((b) => !new RegExp(`User-agent:\\s*${b}`, 'i').test(robots));
  add('geo', 'AI crawlers addressed', missing.length ? WARN : PASS,
    missing.length ? `not named in robots.txt: ${missing.join(', ')}` : `all ${bots.length} named`);

  const llms = path.join(DIST, 'llms.txt');
  if (!existsSync(llms)) {
    add('geo', 'llms.txt present', FAIL, 'missing — the hint file AI crawlers read');
  } else {
    const t = readFileSync(llms, 'utf8');
    const linked = new Set([...t.matchAll(/https:\/\/syllab\.in(\/[^\s)]*)/g)].map((m) => m[1].replace(/\/$/, '') || '/'));
    const dead = [...linked].filter((u) => !resolves(u));
    add('geo', 'llms.txt links resolve', dead.length ? FAIL : PASS,
      dead.length ? `${dead.length} of ${linked.size} links point at pages that do not exist` : `${linked.size} links, all resolve`,
      dead.slice(0, 5));
  }

  // Passage-level citability: an AI answer engine quotes a self-contained
  // sentence. speakable marks which one we intend it to be.
  const withSpeakable = indexable.filter(([, v]) => /class="speakable"/.test(v.body)).length;
  const pct = Math.round((withSpeakable / indexable.length) * 100);
  add('geo', 'citable opening passage', pct < 40 ? WARN : PASS,
    `${withSpeakable} of ${indexable.length} indexable pages (${pct}%) mark a speakable passage`);

  const withFaq = indexable.filter(([, v]) => /FAQPage/.test(v.html)).length;
  add('geo', 'FAQ schema coverage', withFaq === 0 ? WARN : PASS,
    `${withFaq} indexable pages carry FAQPage schema`);
}

// ═══ AREA 4 — PERFORMANCE (structural, deterministic) ══════════════════════
// Lab timings swing wildly on a loaded machine; these do not.

{
  const home = pages.get('/')?.html || '';
  const head = home.slice(0, home.indexOf('</head>'));
  const blocking = (head.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || []).length;
  const sync = (head.match(/<script(?![^>]*(defer|async|type="module"|type="application))[^>]*src=/g) || []).length;
  add('perf', 'no synchronous scripts in head', sync ? FAIL : PASS, `${sync} blocking scripts`);
  add('perf', 'render-blocking stylesheets', blocking > 1 ? WARN : PASS, `${blocking} blocking stylesheet(s)`);

  // A non-composited animation repaints on every frame. One lived on the LCP
  // element — the hero H1 — animating background-position forever.
  const cssFile = existsSync(path.join(DIST, 'assets')) && readdirSync(path.join(DIST, 'assets')).find((f) => f.endsWith('.css'));
  if (cssFile) {
    const css = readFileSync(path.join(DIST, 'assets', cssFile), 'utf8');
    const props = new Set();
    for (const m of css.matchAll(/@keyframes\s+[\w-]+\s*\{([\s\S]*?)\n?\}/g)) for (const p of m[1].matchAll(/([a-z-]+)\s*:/g)) props.add(p[1]);
    const bad = [...props].filter((p) => !['transform', 'opacity', 'filter', 'visibility', 'animation-timing-function', 'offset-distance'].includes(p));
    add('perf', 'animations are composited', bad.length ? WARN : PASS,
      bad.length ? `keyframes animate ${bad.join(', ')} — these repaint every frame` : 'transform/opacity only');
    const kb = Math.round(css.length / 1024);
    add('perf', 'stylesheet size', kb > 400 ? WARN : PASS, `${kb}KB raw (served brotli)`);
  }

  const heaviest = [...pages].map(([u, v]) => [v.html.length, u]).sort((a, b) => b[0] - a[0])[0];
  add('perf', 'no oversized HTML', heaviest[0] > 250 * 1024 ? WARN : PASS,
    `heaviest page ${Math.round(heaviest[0] / 1024)}KB (${heaviest[1]})`);
}

// ═══ AREA 5 — ACCESSIBILITY (deterministic subset) ═════════════════════════

{
  const lum = (hex) => {
    const c = hex.replace('#', '');
    const f = c.length === 3 ? c.split('').map((x) => x + x).join('') : c;
    const v = [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) / 255)
      .map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
  /**
   * Only judge a colour when the white page background is a safe assumption.
   *
   * The first version regexed every `color:` in the body and compared it with
   * white. That reported #fff at 1.00:1 across 4,358 pages — white text on the
   * green and gradient panels, which is correct as written and unreadable only
   * in the checker's imagination. So: read whole style attributes, and skip any
   * declaration that sets its own background, because then the page background
   * is not what the text sits on. Escaped code samples are skipped too — a
   * lesson that teaches `color: #ccc` is content, not styling.
   */
  const used = new Map();
  let skippedOwnBg = 0;
  for (const [, v] of pages) {
    const b = v.body.replace(/&(?:quot|lt|gt|amp|#39);/g, ' ');
    for (const m of b.matchAll(/style="([^"]*)"/g)) {
      const decl = m[1];
      const col = decl.match(/(?:^|;|\s)color:\s*(#[0-9a-fA-F]{3,6})/);
      if (!col) continue;
      if (/background(-color)?\s*:/.test(decl)) { skippedOwnBg++; continue; }
      const k = col[1].toLowerCase();
      used.set(k, (used.get(k) || 0) + 1);
    }
  }
  const failing = [...used].filter(([c]) => ratio(c, '#ffffff') < 4.5);
  add('a11y', 'text contrast meets AA', failing.length ? FAIL : PASS,
    failing.length ? failing.map(([c, n]) => `${c} (${ratio(c, '#ffffff').toFixed(2)}:1, ${n} uses)`).join(', ')
      : `all ${used.size} colours on the page background ≥ 4.5:1 · ${skippedOwnBg} declarations skipped (they set their own background)`);
}

// ═══ AREA 6 — LIVE (only with --live) ══════════════════════════════════════

if (LIVE) {
  const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' };
  const get = async (u) => {
    try {
      const r = await fetch(SITE + u, { headers: UA, redirect: 'manual', signal: AbortSignal.timeout(20000) });
      return { status: r.status, headers: r.headers, text: r.status < 300 ? await r.text() : '' };
    } catch (e) { return { status: 0, error: String(e.message || e) }; }
  };

  const rb = await get('/robots.txt');
  add('live', 'robots.txt serves 200', rb.status === 200 ? PASS : FAIL, `HTTP ${rb.status || rb.error}`);
  if (rb.status === 200) {
    const ct = rb.headers.get('content-type') || '';
    add('live', 'robots.txt is text/plain', /text\/plain/.test(ct) ? PASS : WARN, ct);
    add('live', 'robots.txt is edge-cacheable', /max-age=([1-9]\d*)/.test(rb.headers.get('cache-control') || '') ? PASS : WARN,
      `Cache-Control: ${rb.headers.get('cache-control')} — max-age=0 forces an origin round trip on the one file whose failure halts crawling`);
  }

  // sample the sitemap rather than all of it
  const smFile = path.join(DIST, 'sitemap.xml');
  if (existsSync(smFile)) {
    const locs = [...readFileSync(smFile, 'utf8').matchAll(/<loc>https:\/\/syllab\.in([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
    const byCluster = {};
    for (const u of locs) (byCluster['/' + (u.split('/')[1] || '')] ||= []).push(u);
    const sample = Object.values(byCluster).map((a) => a[0]).slice(0, 60);
    let bad = 0;
    for (const u of sample) { const r = await get(u); if (r.status !== 200) bad++; }
    add('live', 'sitemap URLs return 200', bad ? FAIL : PASS, `${sample.length} sampled across clusters · ${bad} non-200`);
  }

  const home = await get('/');
  add('live', 'homepage serves 200', home.status === 200 ? PASS : FAIL, `HTTP ${home.status || home.error}`);
  if (home.status === 200) {
    add('live', 'no X-Robots-Tag noindex', /noindex/i.test(home.headers.get('x-robots-tag') || '') ? FAIL : PASS,
      home.headers.get('x-robots-tag') || 'header absent');
  }
} else {
  add('live', 'live checks', SKIP, 'run with --live to check production HTTP');
}

// ── things no script here can know ─────────────────────────────────────────
add('external', 'Core Web Vitals field data', SKIP, 'needs a PSI API key or a CrUX export — last known: LCP 3.3s FAIL, INP 165ms, CLS 0 (mobile, 2026-08-21)');
add('external', 'rankings & impressions', SKIP, 'needs a Search Console export — run scripts/gsc-report.mjs against one');
add('external', 'backlinks', SKIP, 'needs Search Console Links or a paid API — see docs/backlinks.md for the tracked register');

// ── report ─────────────────────────────────────────────────────────────────
const order = ['crawl', 'links', 'content', 'schema', 'geo', 'perf', 'a11y', 'live', 'external'];
const label = { crawl: 'CRAWL & INDEX', links: 'INTERNAL LINKS', content: 'CONTENT QUALITY', schema: 'STRUCTURED DATA', geo: 'GEO / AI SEARCH', perf: 'PERFORMANCE', a11y: 'ACCESSIBILITY', live: 'LIVE SITE', external: 'NEEDS EXTERNAL DATA' };
const mark = { PASS: '✓', WARN: '!', FAIL: '✗', SKIP: '–' };

if (JSON_OUT) {
  console.log(JSON.stringify({ generated: new Date().toISOString(), results }, null, 2));
} else {
  console.log('\n══ SYLLAB TRAFFIC HEALTH ══════════════════════════════════════════\n');
  for (const a of order) {
    const rows = results.filter((r) => r.area === a);
    if (!rows.length) continue;
    console.log(`  ${label[a]}`);
    for (const r of rows) {
      console.log(`    ${mark[r.status]} ${r.name.padEnd(34)} ${r.detail || ''}`);
      if (r.evidence?.length) for (const e of r.evidence) console.log(`        · ${e}`);
    }
    console.log('');
  }
  const f = results.filter((r) => r.status === FAIL).length;
  const w = results.filter((r) => r.status === WARN).length;
  const s = results.filter((r) => r.status === SKIP).length;
  console.log('───────────────────────────────────────────────────────────────────');
  console.log(`  ${results.filter((r) => r.status === PASS).length} pass · ${w} warn · ${f} FAIL · ${s} need external data`);
  if (f) console.log(`\n  ✗ ${f} failing check(s) — these cost traffic today.`);
  console.log('');
}

// snapshot for trend tracking
try {
  const dir = path.join(ROOT, 'docs', 'traffic-health');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, `${new Date().toISOString().slice(0, 10)}.json`),
    JSON.stringify({ generated: new Date().toISOString(), results }, null, 2));
} catch { /* snapshot is a nicety, never a failure */ }

if (results.some((r) => r.status === FAIL)) process.exit(1);
