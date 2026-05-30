/**
 * generate-slides.ts — Batch-generate image-rich slide decks for every chapter,
 * then zip them class-wise. This does what the Gemini chat UI can't: call the
 * API programmatically, fetch real images, write files, and package zips.
 *
 * Pipeline per chapter:
 *   1. Gemini generates a 25-slide deck as JSON (title, bullets, imageQuery, notes)
 *   2. For each slide, fetch a REAL photo from Pexels (free) matching imageQuery
 *   3. Render a clean, self-contained HTML deck (arrow-key navigation)
 *   4. Write to output/slides/<board>/Class N/<subject>/<chapter>.html
 *   5. Zip each class folder → output/zips/<board>-Class-N.zip
 *
 * Setup (in syllab/.env.local):
 *   GEMINI_API_KEY=...        (required — same key the backend uses)
 *   PEXELS_API_KEY=...        (optional but recommended — free at pexels.com/api)
 *
 * Usage:
 *   npx tsx scripts/generate-slides.ts --board=CBSE --class=1
 *   npx tsx scripts/generate-slides.ts --board=CBSE --class=1-5      (range)
 *   npx tsx scripts/generate-slides.ts --all                        (everything)
 *   npx tsx scripts/generate-slides.ts --board=CBSE --class=10 --subject=Science
 *   add --zip to package each class folder into a .zip
 *   add --limit=5 to cap how many chapters (test run)
 *
 * Resumable: existing .html files are skipped, so you can re-run safely.
 */

import 'dotenv/config';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { SYLLABUS } from '../src/data/syllabus';

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const PEXELS_KEY = process.env.PEXELS_API_KEY;
if (!GEMINI_KEY) { console.error('Missing GEMINI_API_KEY in .env.local'); process.exit(1); }
if (!PEXELS_KEY) console.warn('⚠️  No PEXELS_API_KEY — slides will use coloured placeholders instead of real photos.\n');

/* ── CLI args ─────────────────────────────────────────────────────────────── */
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? 'true'];
}));
const wantAll = args.all === 'true';
const boardArg = (args.board as string) || 'CBSE';
const subjectArg = args.subject as string | undefined;
const limit = args.limit ? parseInt(args.limit as string, 10) : Infinity;
const doZip = args.zip === 'true';

let classFilter: (n: number) => boolean = () => true;
if (args.class) {
  const c = args.class as string;
  if (c.includes('-')) { const [a, b] = c.split('-').map(Number); classFilter = n => n >= a && n <= b; }
  else { const n = Number(c); classFilter = x => x === n; }
}

const chapters = SYLLABUS.filter(ch => {
  if (!wantAll && (ch.board || 'CBSE') !== boardArg) return false;
  if (!classFilter(Number(ch.classLevel))) return false;
  if (subjectArg && ch.subject !== subjectArg) return false;
  return true;
}).slice(0, limit);

console.log(`Generating ${chapters.length} chapter deck(s)...\n`);

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const slug = (s: string) => s.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 60);
const esc = (s: string) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function gemini(prompt: string): Promise<any> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.7 } }) }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(text);
}

const pexelsCache = new Map<string, string>();
async function pexelsImage(query: string): Promise<string | null> {
  if (!PEXELS_KEY || !query) return null;
  if (pexelsCache.has(query)) return pexelsCache.get(query)!;
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } });
    if (!res.ok) return null;
    const data = await res.json();
    const url = data?.photos?.[0]?.src?.large || null;
    if (url) pexelsCache.set(query, url);
    return url;
  } catch { return null; }
}

function buildPrompt(ch: typeof SYLLABUS[number]): string {
  const cls = Number(ch.classLevel);
  const tone = cls <= 5
    ? 'Class 1-5: very simple words, story-led, lots of imagery, real-life examples a child sees daily (pizza for fractions, mangoes for counting). Minimal text per slide.'
    : cls <= 10
    ? 'Class 6-10: clear explanations with one real-life example and a diagram idea per concept.'
    : 'Class 11-12: exam-focused, accurate, with worked examples and common mistakes.';
  return `You are an expert Indian school teacher. Create a 25-slide lesson as JSON.
Chapter: "${ch.title}"  Subject: ${ch.subject}  Class: ${ch.classLevel}  Board: ${ch.board || 'CBSE'}.
Tone: ${tone}
Return ONLY JSON: { "title": string, "slides": [ { "heading": string, "bullets": string[] (2-5 short points, NO markdown stars), "imageQuery": string (2-4 words to find a REAL photo for this slide, e.g. "green plant leaf"), "notes": string (2-3 sentences a teacher would say aloud) } ] }
Exactly 25 slides. Slide 1 = title/hook. Include concept slides, real-life examples, worked examples, 3-4 quick questions, and a recap. Keep bullets concrete and age-appropriate.`;
}

function renderHtml(deck: any, ch: typeof SYLLABUS[number], images: (string | null)[]): string {
  const slidesHtml = (deck.slides || []).map((s: any, i: number) => {
    const img = images[i];
    const bullets = (s.bullets || []).map((b: string) => `<li>${esc(b)}</li>`).join('');
    return `<section class="slide">
      <div class="slide-inner">
        <div class="text">
          <span class="num">${i + 1} / ${deck.slides.length}</span>
          <h2>${esc(s.heading)}</h2>
          <ul>${bullets}</ul>
          ${s.notes ? `<p class="notes">🎙️ ${esc(s.notes)}</p>` : ''}
        </div>
        ${img ? `<div class="img"><img src="${img}" alt="${esc(s.imageQuery || s.heading)}" loading="lazy"/></div>` : ''}
      </div>
    </section>`;
  }).join('\n');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(deck.title || ch.title)} — Syllab.in</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,Segoe UI,Roboto,sans-serif}
  body{background:#0f172a;color:#fff;overflow:hidden}
  .slide{display:none;height:100vh;width:100vw;padding:5vh 6vw;background:linear-gradient(135deg,#4f46e5,#7c3aed)}
  .slide.active{display:flex;align-items:center}
  .slide-inner{display:flex;gap:5vw;align-items:center;width:100%;max-width:1200px;margin:auto}
  .text{flex:1}
  .num{font-size:12px;font-weight:800;letter-spacing:2px;opacity:.6;text-transform:uppercase}
  h2{font-size:clamp(24px,4vw,44px);margin:10px 0 20px;line-height:1.1}
  ul{list-style:none;display:flex;flex-direction:column;gap:14px}
  li{font-size:clamp(15px,1.6vw,20px);line-height:1.5;padding-left:22px;position:relative;opacity:.95}
  li:before{content:"›";position:absolute;left:0;font-weight:900;opacity:.5}
  .notes{margin-top:22px;font-size:14px;opacity:.7;font-style:italic;border-left:3px solid rgba(255,255,255,.3);padding-left:12px}
  .img{flex:1;max-width:46%}
  .img img{width:100%;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,.4)}
  .bar{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:rgba(0,0,0,.25)}
  button{background:#fff;color:#1e293b;border:0;border-radius:14px;padding:10px 18px;font-weight:800;cursor:pointer}
  .brand{font-weight:900;opacity:.8;letter-spacing:1px}
</style></head><body>
${slidesHtml}
<div class="bar">
  <button onclick="go(-1)">‹ Back</button>
  <span class="brand">Syllab.in · ${esc(ch.board || 'CBSE')} Class ${ch.classLevel} · ${esc(ch.subject)}</span>
  <button onclick="go(1)">Next ›</button>
</div>
<script>
  let i=0;const s=[...document.querySelectorAll('.slide')];
  function show(n){s.forEach((x,k)=>x.classList.toggle('active',k===n))}
  function go(d){i=Math.max(0,Math.min(s.length-1,i+d));show(i)}
  document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
  show(0);
</script></body></html>`;
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
(async () => {
  const touchedClassDirs = new Set<string>();
  let made = 0, skipped = 0, failed = 0;

  for (const ch of chapters) {
    const board = ch.board || 'CBSE';
    const classDir = join('output', 'slides', board, `Class ${ch.classLevel}`);
    const dir = join(classDir, slug(ch.subject));
    const file = join(dir, `${slug(ch.title)}.html`);
    touchedClassDirs.add(classDir);

    if (existsSync(file)) { skipped++; continue; }
    try {
      process.stdout.write(`• ${board} C${ch.classLevel} ${ch.subject} — ${ch.title.slice(0, 40)} ... `);
      const deck = await gemini(buildPrompt(ch));
      const images = await Promise.all((deck.slides || []).map((s: any) => pexelsImage(s.imageQuery)));
      mkdirSync(dir, { recursive: true });
      writeFileSync(file, renderHtml(deck, ch, images), 'utf8');
      made++;
      console.log('done');
      await sleep(1200); // gentle rate limiting
    } catch (e) {
      failed++;
      console.log('FAILED:', (e as Error).message);
    }
  }

  console.log(`\n✅ ${made} generated · ${skipped} skipped (existing) · ${failed} failed`);

  if (doZip) {
    mkdirSync(join('output', 'zips'), { recursive: true });
    for (const cd of touchedClassDirs) {
      const name = cd.replace(/[\\/]/g, '-').replace('output-slides-', '');
      const zip = join('output', 'zips', `${name}.zip`);
      try {
        execSync(`powershell -Command "Compress-Archive -Path '${cd}\\*' -DestinationPath '${zip}' -Force"`, { stdio: 'ignore' });
        console.log(`📦 ${zip}`);
      } catch (e) { console.log(`zip failed for ${cd}:`, (e as Error).message); }
    }
  }
})();
