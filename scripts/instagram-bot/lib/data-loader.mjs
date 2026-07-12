/**
 * data-loader.mjs — mines REAL content from the Syllab website data files so
 * every Instagram post is grounded in actual site content (and links back to it).
 *
 * Uses esbuild (already a Vite dependency) to transpile each TypeScript data file
 * and import its exported array — robust against `[`/`]` inside strings, unlike
 * regex/bracket parsing. Results are cached in-process.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transform } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..');
const DATA = path.join(ROOT, 'src', 'data');
const TMP = path.join(ROOT, '.ig-tmp');

const _cache = new Map();

/** Transpile a TS data file and return one of its named array exports. */
export async function loadExport(relFile, exportName) {
  const key = `${relFile}#${exportName}`;
  if (_cache.has(key)) return _cache.get(key);
  const ts = readFileSync(path.join(DATA, relFile), 'utf8');
  const { code } = await transform(ts, { loader: 'ts', format: 'esm' });
  mkdirSync(TMP, { recursive: true });
  const tmp = path.join(TMP, relFile.replace(/[\\/]/g, '_') + '.mjs');
  writeFileSync(tmp, code);
  const mod = await import(pathToFileURL(tmp).href + '?t=' + Date.now());
  const val = mod[exportName] || [];
  _cache.set(key, val);
  return val;
}

export function cleanup() {
  try { rmSync(TMP, { recursive: true, force: true }); } catch { /* ignore */ }
}

const BANKS = path.join(__dirname, '..', 'banks');
/** Load a purpose-built JSON content bank (scripts/instagram-bot/banks/). */
function loadBank(file) {
  try { return JSON.parse(readFileSync(path.join(BANKS, file), 'utf8')); }
  catch { return []; }
}
/** Every *.json item across all bank files (so new gen-*.json files are auto-detected). */
function allBankItems() {
  const out = [];
  try {
    for (const f of readdirSync(BANKS)) {
      if (!f.endsWith('.json')) continue;
      const data = loadBank(f);
      if (Array.isArray(data)) for (const it of data) out.push(it);
    }
  } catch { /* no banks dir */ }
  return out;
}

const SITE = 'https://syllab.in';

/**
 * Normalised "content atoms" from across the site. Each atom is a self-contained
 * idea that can become a post. `key` is the stable dedup id; `link` deep-links to
 * the relevant page so the bio/caption can drive traffic.
 */
export async function loadAtoms() {
  const atoms = [];

  // ── Fun facts → "Did you know?" (great for reels + images) ───────────────
  try {
    const ff = await loadExport('funFacts.ts', 'FUN_FACTS');
    for (const f of ff) {
      atoms.push({
        key: `funfact:${f.id}`, kind: 'funfact', topic: f.category,
        emoji: f.emoji || '💡', hook: f.hook, body: f.fact,
        link: `${SITE}/gk-quiz`,
      });
    }
  } catch (e) { console.warn('[data] funFacts skipped:', e.message); }

  // ── GK MCQs → quiz posts (carousel reveal + reels) ───────────────────────
  try {
    const gk = await loadExport('generalKnowledge.ts', 'GK_QUESTIONS');
    for (const q of gk) {
      atoms.push({
        key: `gk:${q.id}`, kind: 'gk', topic: q.category,
        emoji: '🧠', question: q.question, options: q.options,
        answerIndex: q.correctIndex, explanation: q.explanation,
        classLevels: q.classLevels || [],
        link: `${SITE}/gk-quiz`,
      });
    }
  } catch (e) { console.warn('[data] GK skipped:', e.message); }

  // ── PYQs → "PYQ of the day" (carousel: question → answer) ────────────────
  try {
    const pyqs = await loadExport('pyqs.ts', 'PYQ_CHAPTERS');
    for (const ch of pyqs) {
      for (let i = 0; i < (ch.questions || []).length; i++) {
        const q = ch.questions[i];
        atoms.push({
          key: `pyq:${ch.slug}:${i}`, kind: 'pyq', topic: ch.subject,
          emoji: '📝', classLabel: ch.classLevel, subject: ch.subject,
          chapter: ch.chapter, exam: ch.exam, year: q.year, marks: q.marks,
          question: q.q, answer: q.answer,
          link: `${SITE}/pyqs/${ch.slug}`,
        });
      }
    }
  } catch (e) { console.warn('[data] PYQs skipped:', e.message); }

  // ── Full forms → quick "X = ?" reels/images ──────────────────────────────
  try {
    const fforms = await loadExport('fullForms.ts', 'FULL_FORMS');
    for (const it of (Array.isArray(fforms) ? fforms : [])) {
      const abbr = it.term || it.abbr;
      const full = it.fullForm || it.full;
      if (!abbr || !full) continue;
      atoms.push({
        key: `fullform:${String(abbr).toLowerCase()}`, kind: 'fullform',
        topic: it.category || 'general', emoji: '🔤',
        abbr, full, note: (it.description || it.note || '').slice(0, 120),
        link: `${SITE}/full-forms`,
      });
    }
  } catch (e) { console.warn('[data] fullForms skipped:', e.message); }

  // ── Content banks (auto-discovered from banks/*.json by shape) ───────────
  // Any new gen-*.json the agents add is picked up automatically:
  //   {cover, slides[]}       → formula carousel   {question, options[]} → MCQ
  //   {headline, sub, type}   → tip / mistake       {headline, sub}       → concept
  try {
    const L = (c) => (c ? `Class ${c}` : '');
    for (const it of allBankItems()) {
      if (it.hook && it.fact) {
        // Engaging fact (history/physics/chemistry) → funfact post (photo bg).
        atoms.push({ key: `fact:${slugify(it.hook)}`, kind: 'funfact', topic: it.subject || 'general', emoji: '💡', hook: it.hook, body: it.fact, link: `${SITE}/gk-quiz` });
      } else if (it.cover && Array.isArray(it.slides)) {
        atoms.push({ key: `formula:${slugify(`${it.subject || ''}-${it.class || ''}-${it.chapter}`)}`, kind: 'formula', plain: true,
          topic: it.subject || 'maths', subject: it.subject, classLabel: L(it.class), chapter: it.chapter, cover: it.cover, slides: it.slides, link: `${SITE}/formula-sheets` });
      } else if (it.question && Array.isArray(it.options)) {
        atoms.push({ key: `mcq:${slugify(`${it.class || ''}-${it.question}`)}`, kind: 'mcq', plain: true, emoji: '🧮',
          topic: it.subject || 'study', subject: it.subject, classLabel: L(it.class), question: it.question, options: it.options, answer: it.answer, explanation: it.explanation || '', link: `${SITE}/practice` });
      } else if (it.subject === 'Coding' && it.headline && it.sub) {
        // Split "code — explanation" into a code block + note for the dev card.
        const m = String(it.sub).split(/\s+[—–-]\s+/);
        const codeStr = m[0].trim();
        const note = m.slice(1).join(' - ').trim();
        atoms.push({ key: `coding:${slugify(it.headline)}`, kind: 'coding', plain: true,
          topic: 'coding', subject: 'Coding', headline: it.headline, code: codeStr, note, link: `${SITE}/coding` });
      } else if (it.headline && it.type) {
        atoms.push({ key: `tip:${slugify(it.headline)}`, kind: 'tip', plain: true,
          topic: it.subject || 'study', subject: it.subject, classLabel: L(it.class), ttype: it.type, headline: it.headline, sub: it.sub || '', link: `${SITE}/preparation` });
      } else if (it.headline && it.sub) {
        atoms.push({ key: `concept:${slugify(it.headline)}`, kind: 'concept', plain: true,
          topic: it.subject || 'study', subject: it.subject, classLabel: L(it.class), headline: it.headline, sub: it.sub, link: `${SITE}/concepts` });
      }
    }
  } catch (e) { console.warn('[data] banks skipped:', e.message); }

  // ── Glossary → "term of the day" single ──────────────────────────────────
  try {
    const gl = await loadExport('glossary.ts', 'GLOSSARY');
    for (const g of gl) {
      if (!g.term || !g.definition) continue;
      atoms.push({
        key: `glossary:${g.slug || slugify(g.term)}`, kind: 'glossary', topic: g.category || 'study',
        emoji: '📖', term: g.term, definition: g.definition, example: g.example || '',
        classLabel: g.classLevel || '', subject: g.category, link: `${SITE}/glossary`,
      });
    }
  } catch (e) { console.warn('[data] glossary skipped:', e.message); }

  // ── Differences ("X vs Y") → comparison carousel ─────────────────────────
  try {
    const diffs = await loadExport('differences.ts', 'DIFFERENCES');
    for (const d of diffs) {
      const rows = d.table || d.rows || [];
      if (!d.termA || !d.termB || !rows.length) continue;
      atoms.push({
        key: `diff:${d.slug || slugify(d.title)}`, kind: 'difference', topic: d.category || 'study',
        emoji: '⚖️', termA: d.termA, termB: d.termB, title: d.title, rows,
        classLabel: d.classLevel || '', subject: d.category, link: `${SITE}/difference-between`,
      });
    }
  } catch (e) { console.warn('[data] differences skipped:', e.message); }

  // ── Timelines (website TIMELINES + gen-timelines.json bank) → carousels ──
  try {
    const web = await loadExport('timelines.ts', 'TIMELINES').catch(() => []);
    const bank = loadBank('gen-timelines.json');
    for (const t of [...(Array.isArray(web) ? web : []), ...(Array.isArray(bank) ? bank : [])]) {
      const events = t.events || [];
      if (!t.title || events.length < 3) continue;
      atoms.push({
        key: `timeline:${t.slug || slugify(t.title)}`, kind: 'timeline', topic: t.subject || 'history',
        emoji: '🕰️', title: t.title, subject: t.subject, classLabel: t.classLevel || '',
        events: events.map((e) => ({ year: e.year || '', title: e.title || '', detail: e.detail || '' })),
        link: `${SITE}/timelines`,
      });
    }
  } catch (e) { console.warn('[data] timelines skipped:', e.message); }

  return atoms;
}

function slugify(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50); }
