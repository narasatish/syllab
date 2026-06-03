/**
 * generate-slides.ts — Auto-generate clean, designed slide decks per chapter,
 * matching the Gemini visual language (teal/orange theme, rounded white cards,
 * icon boxes, comparison bars, friendly rounded font).
 *
 * Each slide gets a VISUAL chosen by the model:
 *   • icon    → big emoji in a dashed rounded box (+ caption)   e.g. ↕ Height
 *   • compare → row of cards with teal bars                      e.g. Longest/Medium/Shortest
 *   • steps   → numbered cards
 *   • image   → an Imagen illustration (only for real objects/scenes)
 *   • none    → clean full-width text
 * Most slides use CSS/emoji visuals (free, instant); Imagen is used sparingly,
 * so cost stays low and the look is consistent.
 *
 * Slides: 20 for Class 1-5, 25 for Class 6-12.
 * Setup: GEMINI_API_KEY in .env.local (billing on for Imagen).
 * Usage:  npx tsx scripts/generate-slides.ts --board=CBSE --class=1 --zip
 */

import 'dotenv/config';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { SYLLABUS } from '../src/data/syllabus';
import { pickSlideImage } from '../src/lib/lessonImages';

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const SUBJECT_EMOJI: Record<string, string> = {
  Physics: '⚛️', Chemistry: '🧪', Biology: '🌿', Science: '🔬',
  Mathematics: '🔢', English: '📖', 'The World Around Us': '🌍',
  'Financial Literacy': '💰',
};
if (!GEMINI_KEY) { console.error('Missing GEMINI_API_KEY in .env.local'); process.exit(1); }
// Cost guard: calls Gemini + Imagen (paid on a billed key). Disabled by default.
if (process.env.ALLOW_PAID_GEMINI !== '1') {
  console.error('\n⛔ generate-slides is disabled to prevent surprise charges.\n   It calls Gemini + Imagen (costs money on a paid key — Imagen especially).\n   Decks are already generated — you likely do NOT need to run this.\n   To run intentionally on a FREE-TIER key: set ALLOW_PAID_GEMINI=1\n');
  process.exit(1);
}
const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'imagen-4.0-fast-generate-001';

/* ── CLI ──────────────────────────────────────────────────────────────────── */
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? 'true']; }));
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
console.log(`Generating ${chapters.length} designed deck(s)...\n`);

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const slug = (s: string) => s.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 60);
const esc = (s: string) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function gemini(prompt: string, attempt = 1): Promise<any> {
  let res: Response;
  try {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${GEMINI_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        // 90s timeout so a hung connection can't stall the whole batch.
        signal: AbortSignal.timeout(90_000),
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.65 } }) });
  } catch (e) {
    // Network error / timeout — retry with backoff.
    if (attempt <= 5) { await new Promise((r) => setTimeout(r, 2000 * attempt)); return gemini(prompt, attempt + 1); }
    throw e;
  }
  if (!res.ok) {
    // Retry transient errors (429 rate-limit, 5xx) with exponential backoff.
    if ((res.status === 429 || res.status >= 500) && attempt <= 5) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return gemini(prompt, attempt + 1);
    }
    throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 160)}`);
  }
  const data = await res.json();
  return JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}');
}

async function imagen(prompt: string, attempt = 1): Promise<string | null> {
  const styled = `Flat, modern, colourful children's educational illustration. Clean, friendly, simple shapes, plain white background, NO text or letters. Subject: ${prompt}`;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:predict?key=${GEMINI_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: [{ prompt: styled }], parameters: { sampleCount: 1, aspectRatio: '4:3' } }) });
    if (res.status === 429 && attempt <= 4) { await sleep(5000 * attempt); return imagen(prompt, attempt + 1); }
    if (!res.ok) return null;
    return (await res.json())?.predictions?.[0]?.bytesBase64Encoded || null;
  } catch { return null; }
}

// Social Science decks need a different shape than maths/science — narrative,
// causes/effects, dates, maps and Indian examples (BYJU's/Vedantu style).
function socialGuidance(ch: typeof SYLLABUS[number]): string {
  const strand = (ch.topics && ch.topics[0]) || 'Social Science';
  const common = "Social Science (BYJU's/Vedantu quality): explain WHY and HOW, not just facts. Use concrete Indian examples, exact dates/names where they matter, and end with exam-style \"why/how\" points. Use \"steps\" for sequences/timelines and \"compare\" for contrasts; pick an apt emoji icon otherwise (🗺️ map, 🏛️ institutions, 📜 history, ⚖️ rights, 💰 economy, 🚂 transport).";
  if (/History/i.test(strand)) return `${common} HISTORY structure: hook → background/causes → key events in order (with dates) → main figures → effects & significance → why it matters today. Include a short timeline ("steps").`;
  if (/Geography/i.test(strand)) return `${common} GEOGRAPHY structure: where (location on the India map) → physical/feature description → types/classification → human use & significance for India → conservation/issues. Reference the India map.`;
  if (/Civics/i.test(strand)) return `${common} CIVICS structure: define the concept → how it works in India (institution/process) → a real Indian example → why it protects democracy/citizens → key terms.`;
  return `${common} ECONOMICS structure: define the idea → how it works → an Indian real-life example with simple numbers → why it matters for development → key terms.`;
}

function buildPrompt(ch: typeof SYLLABUS[number], n: number): string {
  const cls = Number(ch.classLevel);
  const tone = ch.subject === 'Social Science'
    ? socialGuidance(ch)
    : cls <= 5
    ? 'Class 1-5: very simple words, story-led, one clear visual per slide, real-life examples a child sees daily. 1-3 short lines per slide.'
    : cls <= 10 ? 'Class 6-10: clear explanations, a visual on most concept slides, one real example per concept.'
    : 'Class 11-12: exam-focused, accurate, worked examples + common mistakes; visuals on key slides.';
  return `You are an expert Indian teacher AND slide designer. Create a ${n}-slide lesson as JSON.
Chapter: "${ch.title}"  Subject: ${ch.subject}  Class: ${ch.classLevel}  Board: ${ch.board || 'CBSE'}.
Tone: ${tone}

Return ONLY JSON: { "title": string, "slides": [ {
  "heading": string,
  "highlight": string,   // ONE word/short phrase from the heading to colour-accent (or "")
  "bullets": string[],   // 1-4 short points, NO markdown
  "visual": {
     "type": "icon" | "emojiScene" | "compare" | "steps" | "none",
     "icon": string,        // type=icon: ONE big relevant emoji (e.g. "📏","⏰","↕️")
     "caption": string,     // type=icon/emojiScene: a short label (or "")
     "emoji": string,       // type=emojiScene: the emoji to repeat (e.g. "🍎")
     "count": number,       // type=emojiScene: how many to show (1-10) — great for counting/groups
     "items": [ { "label": string, "value": number } ]  // type=compare(2-4, value 1-5 bar) or steps(ordered labels)
  },
  "notes": string        // 2-3 sentences the teacher says aloud
} ] }

DESIGN RULES (IMPORTANT — use ONLY these free visuals, never request photos):
- "emojiScene" for counting / quantities / groups (e.g. show 5 apples) — pick a fitting emoji + count.
- "icon" for a concept (a single big emoji in a box, e.g. ⏰ for time, ↕️ for height, 💰 for money).
- "compare" for comparing sizes/amounts (bars). "steps" for a process/method.
- "none" for title / question / recap slides.
- Every concept slide should have a visual. Choose the emoji that best matches the idea.

BYJU'S-STYLE LESSON ARC (follow this order across the ${n} slides):
1. Title/hook slide. 2. A real-world HOOK or short story/question that makes the student curious. 3. "What you'll learn" (2-3 clear learning objectives). 4-N. Build each concept ONE idea at a time, each introduced with a simple ANALOGY or relatable Indian example before the formal definition. Use worked examples with steps. Add 3-5 "quick check" question slides spread through. Near the end: a "Common Mistakes" slide (what students get wrong), an "Exam Tips" slide (how it's asked + scoring), and a final "Recap" slide summarising the key points.
- Teach concept-first: curiosity → analogy/example → clear explanation → practice. Never just list facts.
- Exactly ${n} slides. Concrete, accurate, age-appropriate, and genuinely engaging.`;
}

// A curated real image (from the vetted free libraries) with an emoji fallback.
function renderRealImage(url: string, caption: string, fallback: string): string {
  // Inline onerror so the fallback is registered at PARSE time — a 404 that
  // errors before the end-of-body script runs is still caught (no broken icon).
  return `<div class="vbox imgbox"><img class="rimg" src="${esc(url)}" data-fb="${esc(fallback)}" alt="${esc(caption)}" loading="lazy" onerror="syllabImgFail(this)"/>${caption ? `<div class="vcap">${esc(caption)}</div>` : ''}</div>`;
}

function renderVisual(v: any): string {
  if (!v) return '';
  if (v.type === 'emojiScene' && v.emoji) {
    const count = Math.max(1, Math.min(10, Number(v.count) || 1));
    const items = Array.from({ length: count }, () => `<span>${esc(v.emoji)}</span>`).join('');
    return `<div class="vbox dashed"><div class="scene">${items}</div>${v.caption ? `<div class="vcap">${esc(v.caption)}</div>` : ''}</div>`;
  }
  if (v.type === 'icon' && v.icon) {
    return `<div class="vbox dashed"><div class="bigicon">${esc(v.icon)}</div>${v.caption ? `<div class="vcap">${esc(v.caption)}</div>` : ''}</div>`;
  }
  if (v.type === 'compare' && Array.isArray(v.items) && v.items.length) {
    const max = Math.max(...v.items.map((i: any) => Number(i.value) || 1));
    const cards = v.items.map((i: any) => {
      const w = Math.max(18, Math.round(((Number(i.value) || 1) / max) * 100));
      return `<div class="ccard"><div class="cbar" style="width:${w}%"></div><div class="clabel">${esc(i.label)}</div></div>`;
    }).join('');
    return `<div class="compare">${cards}</div>`;
  }
  if (v.type === 'steps' && Array.isArray(v.items) && v.items.length) {
    const steps = v.items.map((i: any, k: number) => `<div class="step"><span class="snum">${k + 1}</span><span>${esc(i.label)}</span></div>`).join('');
    return `<div class="steps">${steps}</div>`;
  }
  return '';
}

function renderHeading(h: string, hl: string): string {
  if (hl && h.includes(hl)) {
    const parts = h.split(hl);
    return `${esc(parts[0])}<span class="hl">${esc(hl)}</span>${esc(parts.slice(1).join(hl))}`;
  }
  return esc(h);
}

function renderHtml(deck: any, ch: typeof SYLLABUS[number]): string {
  const usedImg = new Set<string>();
  const subjEmoji = SUBJECT_EMOJI[ch.subject] || '📘';
  const slides = (deck.slides || []).map((s: any, i: number) => {
    // Prefer a curated, free, SAFE real image when the slide content matches
    // one (science diagrams / kid concept images). Never random web search.
    let visual = '';
    const text = `${s.heading || ''} ${(s.bullets || [])[0] || ''}`;
    const img = i === 0 ? null : pickSlideImage(text, String(ch.classLevel), ch.subject, ch.title);
    if (img && !usedImg.has(img.url)) {
      usedImg.add(img.url);
      visual = renderRealImage(img.url, img.caption || '', s.visual?.icon || subjEmoji);
    } else {
      visual = renderVisual(s.visual);
    }
    const bullets = (s.bullets || []).map((b: string) => `<li>${esc(b)}</li>`).join('');
    const hasVisual = visual !== '';
    return `<section class="slide"><div class="card ${hasVisual ? '' : 'solo'}">
      <span class="blob b1"></span><span class="blob b2"></span>
      <div class="content ${hasVisual ? 'split' : ''}">
        <div class="txt">
          <span class="num">${i + 1} / ${deck.slides.length}</span>
          <h2>${renderHeading(s.heading || '', s.highlight || '')}</h2>
          ${bullets ? `<ul>${bullets}</ul>` : ''}
          ${s.notes ? `<p class="notes">🎙️ ${esc(s.notes)}</p>` : ''}
        </div>
        ${hasVisual ? `<div class="visual">${visual}</div>` : ''}
      </div>
    </div></section>`;
  }).join('\n');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="robots" content="noindex,follow"/>
<title>${esc(deck.title || ch.title)} — Syllab.in</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Nunito',system-ui,sans-serif;background:#0b1220;overflow:hidden}
.slide{display:none;height:100vh;width:100vw;padding:3.5vh 4vw;background:linear-gradient(135deg,#0d9488,#6366f1)}
.slide.active{display:flex;align-items:center}
.card{position:relative;overflow:hidden;width:100%;max-width:1180px;margin:auto;background:#fff;border-radius:32px;padding:54px 56px;min-height:66vh;display:flex;align-items:center;box-shadow:0 30px 90px rgba(0,0,0,.3)}
.blob{position:absolute;border-radius:50%;z-index:0}
.b1{width:260px;height:260px;top:-90px;right:-70px;background:#fff7ed}
.b2{width:200px;height:200px;bottom:-80px;left:-70px;background:#ccfbf1}
.content{position:relative;z-index:1;width:100%}
.content.split{display:flex;gap:4vw;align-items:center}
.txt{flex:1}
.num{font-family:'Fredoka';font-size:13px;font-weight:600;letter-spacing:2px;color:#14b8a6;text-transform:uppercase}
h2{font-family:'Fredoka';font-weight:700;font-size:clamp(28px,3.8vw,46px);color:#0f766e;line-height:1.08;margin:10px 0 24px}
.hl{color:#f97316}
ul{list-style:none;display:flex;flex-direction:column;gap:16px}
li{font-size:clamp(17px,1.7vw,22px);line-height:1.5;color:#1f2937;padding-left:16px;position:relative}
li:before{content:"";position:absolute;left:0;top:11px;width:8px;height:8px;border-radius:50%;background:#14b8a6}
.notes{margin-top:24px;font-size:14px;color:#64748b;font-style:italic;border-left:3px solid #5eead4;padding-left:14px}
.visual{flex:1;max-width:46%;display:flex;justify-content:center}
.vbox{width:100%;border-radius:24px;overflow:hidden}
.vbox img{width:100%;display:block;border-radius:24px}
.vbox.dashed{border:3px dashed #99f6e4;background:#f0fdfa;padding:42px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px}
.vbox.imgbox{display:flex;flex-direction:column;align-items:center}
.rimg{width:100%;max-height:52vh;object-fit:contain;border-radius:20px;background:#fff;box-shadow:0 12px 30px rgba(0,0,0,.12)}
.bigicon{font-size:clamp(90px,12vw,150px);line-height:1}
.scene{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;max-width:360px}
.scene span{font-size:clamp(40px,6vw,64px);line-height:1}
.vcap{font-family:'Fredoka';font-weight:600;color:#0f766e;font-size:20px;margin-top:18px;text-align:center}
.compare{display:flex;gap:18px;width:100%}
.ccard{flex:1;border:2px solid #ccfbf1;border-radius:18px;padding:18px;display:flex;flex-direction:column;align-items:center;gap:14px;justify-content:flex-end;min-height:160px}
.cbar{height:14px;border-radius:8px;background:#0d9488}
.clabel{font-family:'Fredoka';font-weight:600;color:#0f766e}
.steps{display:flex;flex-direction:column;gap:14px;width:100%}
.step{display:flex;align-items:center;gap:14px;background:#f0fdfa;border-radius:16px;padding:14px 18px;font-size:18px;color:#1f2937}
.snum{flex:none;width:34px;height:34px;border-radius:50%;background:#0d9488;color:#fff;font-family:'Fredoka';font-weight:700;display:flex;align-items:center;justify-content:center}
.card.solo .txt{text-align:center}.card.solo ul{align-items:flex-start;max-width:640px;margin:0 auto}
.bar{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:rgba(11,18,32,.92)}
button{font-family:'Fredoka';background:#fff;color:#0f172a;border:0;border-radius:14px;padding:10px 20px;font-weight:600;cursor:pointer}
.brand{color:#94a3b8;font-family:'Fredoka';font-weight:600;letter-spacing:1px;font-size:13px}
.pdfbtn{background:#f97316;color:#fff}
/* ---- Print / Save-as-PDF: show every slide, one per page, with a syllab.in watermark ---- */
@media print{
  @page{size:landscape;margin:0}
  body{background:#fff;overflow:visible}
  .bar{display:none!important}
  .slide{display:flex!important;page-break-after:always;break-after:page;height:100vh;width:100vw;background:linear-gradient(135deg,#0d9488,#6366f1);-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .slide:last-child{page-break-after:auto}
  .card{min-height:0;height:86vh}
  /* diagonal repeating watermark on every printed page */
  .slide::before{content:"syllab.in";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-32deg);font-family:'Fredoka',sans-serif;font-weight:700;font-size:7vw;color:rgba(15,118,110,.10);letter-spacing:6px;z-index:5;pointer-events:none;white-space:nowrap}
}
</style>
<script>
// Defined in <head> so it exists before any <img> parses — a curated image that
// 404s falls back to a clean emoji box instead of a broken-image icon.
function syllabImgFail(im){var b=im.closest('.vbox');if(b&&!b.classList.contains('dashed')){b.classList.remove('imgbox');b.classList.add('dashed');b.innerHTML='<div class="bigicon">'+(im.getAttribute('data-fb')||'📘')+'</div>';}}
</script>
</head><body>
${slides}
<div class="bar"><button onclick="go(-1)">‹ Back</button>
<span class="brand">Syllab.in · ${esc(ch.board || 'CBSE')} Class ${ch.classLevel} · ${esc(ch.subject)}</span>
<button class="pdfbtn" onclick="window.print()">⬇ PDF</button>
<button onclick="go(1)">Next ›</button></div>
<script>let i=0;const s=[...document.querySelectorAll('.slide')];
function show(n){s.forEach((x,k)=>x.classList.toggle('active',k===n))}
function go(d){i=Math.max(0,Math.min(s.length-1,i+d));show(i)}
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
// Sweep: any image that ALREADY failed before this script ran (complete but no
// pixels) gets the emoji fallback too. Inline onerror handles the rest.
document.querySelectorAll('img.rimg').forEach(im=>{if(im.complete&&im.naturalWidth===0)syllabImgFail(im);});
show(0);</script></body></html>`;
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
(async () => {
  const touched = new Set<string>();
  let made = 0, skipped = 0, failed = 0, imgCount = 0;
  for (const ch of chapters) {
    const board = ch.board || 'CBSE';
    const classDir = join('public', 'generated-decks', board, `Class ${ch.classLevel}`);
    const dir = join(classDir, slug(ch.subject));
    const base = slug(ch.title);
    const file = join(dir, `${base}.html`);
    const imgDir = join(dir, `${base}_img`);
    touched.add(classDir);
    // --force regenerates existing decks in place (overwrite, no delete → no 404 window).
    if (existsSync(file) && args.force !== 'true') { skipped++; continue; }
    void imgDir; // (no images now — fully free, emoji/CSS visuals only)
    // BYJU's-style decks: 30 slides for all senior chapters (every subject);
    // Classes 1-5 kept a bit lighter (young learners) but still full.
    const nSlides = Number(ch.classLevel) <= 5 ? 24 : 30;
    try {
      process.stdout.write(`• ${board} C${ch.classLevel} ${ch.subject} — ${ch.title.slice(0, 40)} `);
      const deck = await gemini(buildPrompt(ch, nSlides));
      const slides = deck.slides || [];
      mkdirSync(dir, { recursive: true });
      writeFileSync(file, renderHtml(deck, ch), 'utf8');
      made++; console.log(`✓ (${slides.length} slides)`);
      await sleep(300); // gentle pacing for the free text tier
    } catch (e) { failed++; console.log('FAILED:', (e as Error).message); }
  }
  console.log(`\n✅ ${made} decks · ${skipped} skipped · ${failed} failed · ₹0 (no paid images)`);
  void imgCount; void imagen;
  if (doZip) {
    mkdirSync(join('output', 'zips'), { recursive: true });
    for (const cd of touched) {
      const name = cd.replace(/[\\/]/g, '-').replace('output-slides-', '');
      try { execSync(`powershell -Command "Compress-Archive -Path '${cd}\\*' -DestinationPath 'output/zips/${name}.zip' -Force"`, { stdio: 'ignore' }); console.log(`📦 output/zips/${name}.zip`); }
      catch (e) { console.log('zip failed', (e as Error).message); }
    }
  }
})();
