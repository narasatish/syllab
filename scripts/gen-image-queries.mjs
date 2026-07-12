/**
 * gen-image-queries.mjs — use Gemini (text) to read every story slide and write a
 * PRECISE image search term to slide.image.prompt (the literal visible subject of
 * the slide, e.g. "Mango Basket Problem" → "mangoes", "Groups and Repeated
 * Addition" with abacus → "abacus"). Keyword heuristics mis-picked (matched
 * "counting" → beads); the model reads the actual content.
 *
 * Prefers a generic 1-2 word subject so many slides dedupe to the same Pexels
 * query (keeps us under the free rate limit). add-story-images.mjs --force then
 * fetches by image.prompt. Re-runnable: skips slides that already have a
 * gemini-written prompt unless --force.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEN_DIR = path.join(ROOT, 'src', 'data', 'story-gen');
const FORCE = process.argv.includes('--force');
const KEY = (readFileSync(path.join(ROOT, '.env'), 'utf8').match(/GEMINI_API_KEY\s*=\s*(.+)/) || [])[1]?.trim();
const MODEL = 'gemini-2.5-flash';

async function gemini(prompt) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2 } }),
    });
    if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000)); continue; }
    const j = await r.json();
    return j?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
  return '';
}

function buildPrompt(slides) {
  const list = slides.map((s, i) => `${i + 1}. Title: "${s.title}". Story: ${(s.storyContext || '').slice(0, 180)}${s.example ? ' Example: ' + s.example.problem.slice(0, 80) : ''}`).join('\n');
  return `You pick stock-photo search terms for a children's textbook (Indian context).
For each slide below, give the SINGLE most relevant, photographable subject as a 1-2 word search term — the literal object or scene a child would see (e.g. a basket of mangoes -> "mangoes"; counting on an abacus -> "abacus"; a pizza cut into fractions -> "pizza"; a magnet experiment -> "magnet"; a river journey -> "river"). Prefer a concrete common noun. Avoid abstract words like "math", "concept", "learning", "counting".
Return ONLY a JSON array of ${slides.length} lowercase strings, in order. No other text.

${list}`;
}

function parseArray(txt, n) {
  const m = txt.match(/\[[\s\S]*\]/);
  if (!m) return null;
  try { const a = JSON.parse(m[0]); return Array.isArray(a) && a.length === n ? a.map((x) => String(x).toLowerCase().trim()) : null; } catch { return null; }
}

async function main() {
  if (!KEY) { console.error('No GEMINI_API_KEY'); process.exit(1); }
  const files = readdirSync(GEN_DIR).filter((f) => /^class-[\w-]+\.json$/.test(f)).sort();
  let done = 0, skipped = 0, failed = 0;
  for (const f of files) {
    const fp = path.join(GEN_DIR, f);
    const lessons = JSON.parse(readFileSync(fp, 'utf8'));
    // Flatten slides needing a prompt
    const todo = [];
    for (const l of lessons) for (const s of l.slides || []) {
      if (!FORCE && s.image && s.image.gq) { skipped++; continue; }
      todo.push(s);
    }
    for (let i = 0; i < todo.length; i += 12) {
      const batch = todo.slice(i, i + 12);
      const out = parseArray(await gemini(buildPrompt(batch)), batch.length);
      if (!out) { failed += batch.length; continue; }
      batch.forEach((s, k) => { s.image = { ...(s.image || {}), prompt: out[k], gq: true }; delete s.image.url; delete s.image.q; done++; });
      await new Promise((res) => setTimeout(res, 600));
    }
    writeFileSync(fp, JSON.stringify(lessons, null, 2));
    console.log(`${f}: queries done`);
  }
  console.log(`\nGemini queries written: ${done} | skipped ${skipped} | failed ${failed}`);
}
main();
