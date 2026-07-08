/**
 * webStories.mjs — generates valid AMP Web Stories from the memory-first visual
 * lessons, for Google Discover + the Stories carousel (a free mobile traffic
 * channel). Called from generate-prerender.mjs (which already loads the full
 * lesson data from the SSR bundle) and writes directly into dist/web-stories/:
 *   • /web-stories/<slug>.html   — one AMP story per lesson
 *   • /web-stories/index.html    — a plain-HTML hub listing all stories
 *   • /web-stories/posters/<slug>.png  — portrait poster (poster-portrait-src)
 *   • /web-stories/logo.png            — 96×96 publisher logo
 * Poster/logo PNGs are rendered with @resvg/resvg-js (same dep as the OG images).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SITE = 'https://syllab.in';
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Subject → gradient palette for slide backgrounds + posters.
const PALETTE = {
  Biology: ['#065f46', '#10b981'], Physics: ['#1e3a8a', '#3b82f6'], Chemistry: ['#7c2d12', '#f59e0b'],
  Science: ['#0c4a6e', '#0ea5e9'], Maths: ['#4c1d95', '#8b5cf6'], Mathematics: ['#4c1d95', '#8b5cf6'],
};
const paletteFor = (subject) => PALETTE[subject] || ['#0f172a', '#0ea5e9'];

const AMP_BOILERPLATE = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`;

const STORY_CSS = `
  amp-story{font-family:'Segoe UI',system-ui,Roboto,Arial,sans-serif}
  amp-story-grid-layer{padding:2.2em 1.6em}
  .cover{justify-content:flex-end}
  .pill{display:inline-block;align-self:flex-start;background:rgba(255,255,255,.18);color:#fff;font-weight:800;font-size:.8em;padding:.35em .9em;border-radius:999px;margin-bottom:.7em}
  h1{color:#fff;font-size:2.3em;line-height:1.1;margin:0 0 .3em;font-weight:900;letter-spacing:-.5px}
  h2{color:#fff;font-size:1.5em;line-height:1.2;margin:0 0 .5em;font-weight:900}
  p{color:#f8fafc;font-size:1.15em;line-height:1.5;margin:.2em 0;font-weight:500}
  .kicker{color:#fff;font-size:.85em;font-weight:900;letter-spacing:2px;text-transform:uppercase;opacity:.85;margin-bottom:.4em}
  ul{margin:.4em 0 0;padding:0;list-style:none}
  li{color:#f8fafc;font-size:1.08em;line-height:1.4;font-weight:500;margin:.5em 0;padding-left:1.1em;position:relative}
  li:before{content:'▸';position:absolute;left:0;color:#fff;font-weight:900}
  .brand{color:#fff;font-size:.9em;font-weight:800;opacity:.9}
  .q{color:#fff;font-weight:900;font-size:1.3em;margin-bottom:.4em}
  .a{background:rgba(255,255,255,.15);border-radius:14px;padding:.7em .9em}
`;

function gridLayer(subject, inner, extraClass = '') {
  const [from, to] = paletteFor(subject);
  const bg = `background:linear-gradient(160deg,${from},${to})`;
  return `<amp-story-grid-layer template="fill"><div style="${bg};width:100%;height:100%"></div></amp-story-grid-layer>` +
    `<amp-story-grid-layer template="vertical" class="${extraClass}">${inner}</amp-story-grid-layer>`;
}

function page(id, subject, inner, extraClass = '') {
  return `<amp-story-page id="${id}">${gridLayer(subject, inner, extraClass)}</amp-story-page>`;
}

/** Build one valid AMP Web Story from a lesson (with memory content). */
export function buildStoryHtml(l) {
  const url = `${SITE}/web-stories/${l.slug}.html`;
  const pages = [];
  pages.push(page('cover', l.subject,
    `<span class="pill">${esc(l.subject)} · ${esc(l.classLevel)}</span>` +
    `<h1>${esc(l.title)}</h1><p>${esc(l.intro).slice(0, 140)}</p><p class="brand" style="margin-top:.8em">syllab.in · free</p>`,
    'cover'));
  if (l.memoryHook) pages.push(page('remember', l.subject, `<p class="kicker">🧠 Remember it</p><h2>${esc(l.title)}</h2><p>${esc(l.memoryHook)}</p>`));
  if (l.realLifeExample) pages.push(page('reallife', l.subject, `<p class="kicker">🌏 In real life</p><p>${esc(l.realLifeExample)}</p>`));
  if (Array.isArray(l.cruxNotes) && l.cruxNotes.length) {
    const items = l.cruxNotes.slice(0, 4).map((n) => `<li>${esc(n)}</li>`).join('');
    pages.push(page('notes', l.subject, `<p class="kicker">📝 Quick notes</p><ul>${items}</ul>`));
  }
  if (Array.isArray(l.recall) && l.recall.length) {
    const r = l.recall[0];
    pages.push(page('quiz', l.subject, `<p class="kicker">🎯 Test yourself</p><p class="q">${esc(r.q)}</p><p class="a">${esc(r.a)}</p>`));
  }
  const cta = `<amp-story-page id="cta">${gridLayer(l.subject, `<p class="kicker">Learn it fully — free</p><h2>See the animated, step-by-step ${esc(l.title)} lesson on Syllab</h2><p class="brand">syllab.in</p>`)}` +
    `<amp-story-page-outlink layout="nodisplay"><a href="${SITE}/visual-learning/${l.slug}">Open the full lesson</a></amp-story-page-outlink></amp-story-page>`;
  pages.push(cta);

  return `<!doctype html><html amp lang="en"><head>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
<title>${esc(l.title)} — Visual Story | Syllab.in</title>
<link rel="canonical" href="${url}">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${esc(l.intro).slice(0, 150)}">
${AMP_BOILERPLATE}
<style amp-custom>${STORY_CSS}</style>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: `${l.title} — Visual Story`, description: String(l.intro).slice(0, 150), image: [`${SITE}/web-stories/posters/${l.slug}.png`], author: { '@type': 'Organization', name: 'Syllab.in' }, publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/web-stories/logo.png` } }, mainEntityOfPage: url })}</script>
</head><body>
<amp-story standalone title="${esc(l.title)}" publisher="Syllab.in" publisher-logo-src="${SITE}/web-stories/logo.png" poster-portrait-src="${SITE}/web-stories/posters/${l.slug}.png">
${pages.join('\n')}
</amp-story></body></html>`;
}

/** Portrait poster SVG (640×853) for poster-portrait-src. */
export function posterSvg(l) {
  const [from, to] = paletteFor(l.subject);
  const title = esc(l.title);
  // Wrap the title across up to 3 lines (~14 chars/line at this size).
  const words = String(l.title).split(' ');
  const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > 14 && cur) { lines.push(cur); cur = w; } else { cur = (cur + ' ' + w).trim(); } }
  if (cur) lines.push(cur);
  const titleTspans = lines.slice(0, 3).map((ln, i) => `<text x="60" y="${430 + i * 70}" font-family="Arial,sans-serif" font-size="58" font-weight="900" fill="#fff">${esc(ln)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="853" viewBox="0 0 640 853">
<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/></linearGradient></defs>
<rect width="640" height="853" fill="url(#g)"/>
<circle cx="560" cy="120" r="180" fill="#ffffff" opacity="0.08"/>
<circle cx="80" cy="760" r="150" fill="#ffffff" opacity="0.07"/>
<rect x="60" y="70" width="70" height="70" rx="18" fill="#ffffff" opacity="0.95"/>
<text x="95" y="120" font-family="Arial Black,Arial,sans-serif" font-size="42" font-weight="900" fill="${from}" text-anchor="middle">S</text>
<text x="150" y="118" font-family="Arial,sans-serif" font-size="34" font-weight="900" fill="#fff">Syllab.in</text>
<rect x="60" y="330" width="${44 + (l.subject.length + l.classLevel.length) * 13}" height="46" rx="23" fill="#ffffff" opacity="0.2"/>
<text x="82" y="361" font-family="Arial,sans-serif" font-size="22" font-weight="800" fill="#fff">${esc(l.subject)} · ${esc(l.classLevel)}</text>
${titleTspans}
<text x="60" y="790" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#fff" opacity="0.92">Free visual lesson · tap to learn ▸</text>
</svg>`;
}

/** 96×96 publisher logo SVG. */
export function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
<rect width="96" height="96" rx="20" fill="#0ea5e9"/>
<text x="48" y="66" font-family="Arial Black,Arial,sans-serif" font-size="56" font-weight="900" fill="#fff" text-anchor="middle">S</text></svg>`;
}

/** Plain-HTML hub listing all stories (crawlable directory page). */
export function hubHtml(lessons) {
  const cards = lessons.map((l) => {
    const [from, to] = paletteFor(l.subject);
    return `<a class="card" href="/web-stories/${l.slug}.html" style="background:linear-gradient(160deg,${from},${to})">
      <span class="s">${esc(l.subject)} · ${esc(l.classLevel)}</span>
      <span class="t">${esc(l.title)}</span></a>`;
  }).join('\n');
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8">
<title>Visual Web Stories — Quick Science Revision | Syllab.in</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="canonical" href="${SITE}/web-stories">
<meta name="description" content="Free tappable visual web stories for CBSE/NCERT science — memory tricks, real-life examples and quick revision you'll actually remember. Photosynthesis, the human heart, electricity and more.">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Syllab Visual Web Stories', url: `${SITE}/web-stories`, inLanguage: 'en-IN', isAccessibleForFree: true })}</script>
<style>
  :root{color-scheme:light dark}
  body{font-family:'Segoe UI',system-ui,Roboto,Arial,sans-serif;margin:0;background:#f8fafc;color:#0f172a}
  header{padding:40px 20px 10px;max-width:1000px;margin:0 auto}
  h1{font-size:1.9rem;margin:0 0 6px;font-weight:900}
  header p{color:#475569;margin:0;font-weight:500}
  .grid{max-width:1000px;margin:20px auto 60px;padding:0 20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
  .card{aspect-ratio:3/4;border-radius:18px;padding:16px;display:flex;flex-direction:column;justify-content:flex-end;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.12);transition:transform .15s}
  .card:hover{transform:translateY(-3px)}
  .card .s{color:#fff;font-size:.7rem;font-weight:800;opacity:.85;text-transform:uppercase;letter-spacing:1px}
  .card .t{color:#fff;font-size:1.05rem;font-weight:900;line-height:1.15;margin-top:4px}
  footer{text-align:center;padding:20px;color:#64748b;font-size:.85rem}
  @media(prefers-color-scheme:dark){body{background:#0f172a;color:#f1f5f9}header p{color:#94a3b8}}
</style></head><body>
<header><h1>📱 Visual Web Stories</h1><p>Tappable, 30-second science revision — memory tricks, real-life examples and quick quizzes. Free.</p></header>
<main class="grid">${cards}</main>
<footer>© Syllab.in · Free learning for Indian students · <a href="/visual-learning">All visual lessons →</a></footer>
</body></html>`;
}

/** Write all web-story artifacts into dist/web-stories/. Returns the count. */
export async function generateWebStories(ROOT, lessons) {
  const withMemory = (lessons || []).filter((l) => l && l.slug && (l.memoryHook || l.cruxNotes));
  if (!withMemory.length) { console.warn('⚠️  Web Stories skipped (no lesson memory data).'); return 0; }
  let Resvg;
  try { ({ Resvg } = await import('@resvg/resvg-js')); }
  catch { console.warn('⚠️  Web Stories skipped: @resvg/resvg-js not installed.'); return 0; }

  const outDir = path.join(ROOT, 'dist', 'web-stories');
  const posterDir = path.join(outDir, 'posters');
  mkdirSync(posterDir, { recursive: true });

  // Publisher logo (once).
  writeFileSync(path.join(outDir, 'logo.png'), new Resvg(logoSvg(), { fitTo: { mode: 'width', value: 96 } }).render().asPng());

  for (const l of withMemory) {
    writeFileSync(path.join(outDir, `${l.slug}.html`), buildStoryHtml(l));
    writeFileSync(path.join(posterDir, `${l.slug}.png`), new Resvg(posterSvg(l), { fitTo: { mode: 'width', value: 640 } }).render().asPng());
  }
  writeFileSync(path.join(outDir, 'index.html'), hubHtml(withMemory));
  console.log(`📱 Web Stories: ${withMemory.length} AMP stories + posters + hub written to dist/web-stories/.`);
  return withMemory.length;
}
