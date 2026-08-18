#!/usr/bin/env node
/**
 * audit-projections.mjs — catch content that is stored but never rendered.
 *
 * studyClusters.mjs hands the prerenderer a PROJECTION of each content bank:
 * an explicit `.map()` naming the fields to keep. Anything not named is
 * silently discarded. The record still loads, TypeScript still passes, every
 * test still passes, the React page (which imports the module directly) still
 * shows the field — and the crawlable page never sees it.
 *
 * That failure mode has now produced five separate incidents on this codebase:
 *
 *   /concepts          ~112,900 words dropped (sections, examples, realLife,
 *                      commonMistakes) on the site's LARGEST source of
 *                      impressions — 8,730 across 38 pages
 *   /english-writing   the model answer, format and tips dropped; users saw
 *                      ~316 words and Google saw 145
 *   /revision-notes    no deep body existed at all
 *   /mcqs              27,143 bank questions reached one ranking page in six
 *   caseStudies        would have vanished the moment it was added, had this
 *                      projection not been updated in the same commit
 *
 * Run it whenever a content bank gains a field:
 *
 *     node scripts/audit-projections.mjs           # report
 *     node scripts/audit-projections.mjs --strict  # exit 1 on any new drop
 *
 * --strict is what a CI step or a pre-deploy check should use. Fields that are
 * genuinely not meant to reach a page belong in ALLOWED below, WITH A REASON —
 * an empty allowlist entry is indistinguishable from an oversight.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as clusters from './studyClusters.mjs';
import * as differencesData from './differencesData.mjs';
import * as aiHubTopics from './aiHubTopics.mjs';
import * as ncertChapters from './ncertChapters.mjs';
import * as stateBoardChapters from './stateBoardChapters.mjs';
import * as medicalCollegesData from './medicalColleges.mjs';

/** Loader modules this audit knows about, beyond studyClusters.mjs. */
const MODULES = { clusters, differencesData, ncertChapters, stateBoardChapters, medicalCollegesData, aiHubTopics };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Same reader studyClusters.mjs uses, so raw and projected share one source. */
/**
 * Field names at record depth, for banks JSON.parse cannot read.
 *
 * readArray() JSON.parses the raw source, which only works for banks that are
 * JSON.stringify output. The hand-authored ones — single quotes, backticks,
 * FRAME(...) calls — throw, so three banks sat outside this audit completely.
 * That is precisely where the damage was: getVisualLessons dropped six authored
 * fields and getWhatToStudy discarded the units table and invented an intro,
 * and this tool reported the site clean throughout. Reading the field NAMES out
 * of the source gives no values, so no word counts, but it does answer the only
 * question that matters: does every stored field reach the projection?
 */
function readFieldNames(file, marker) {
  const out = new Set();
  try {
    const ts = readFileSync(path.join(ROOT, 'src', 'data', file), 'utf8');
    const start = ts.indexOf(marker);
    if (start < 0) return out;
    const end = ts.indexOf('\n];', start);
    const body = ts.slice(start, end < 0 ? undefined : end);
    for (const m of body.matchAll(/^\s{4}([a-zA-Z][a-zA-Z0-9]*):/gm)) out.add(m[1]);
  } catch { /* fall through to an empty set */ }
  return out;
}

function readArray(file, marker) {
  try {
    const ts = readFileSync(path.join(ROOT, 'src', 'data', file), 'utf8');
    const s = ts.indexOf(marker);
    if (s < 0) return null;
    const from = s + marker.length;
    const e = ts.indexOf('\n];', from);
    if (e < 0) return null;
    return JSON.parse(ts.slice(from, e + 2).trim());
  } catch {
    return null;
  }
}

/**
 * Loader, source file, and the export marker. Keep the markers character-exact
 * with studyClusters.mjs — a stale marker makes a bank silently UNAUDITED,
 * which is the same class of bug this script exists to catch.
 */
const BANKS = [
  ['getRevisionNotes', 'revisionNotes.ts', 'export const REVISION_NOTES: RevisionNote[] = '],
  ['getChapterMcqs', 'chapterMcqs.ts', 'export const MCQ_CHAPTERS: McqChapter[] = '],
  ['getPyqs', 'pyqs.ts', 'export const PYQ_CHAPTERS: PyqChapter[] = '],
  ['getConcepts', 'conceptExplainers.ts', 'export const CONCEPT_EXPLAINERS: ConceptExplainer[] = '],
  ['getEnglishWriting', 'englishWriting.ts', 'export const ENGLISH_WRITING: EnglishWriting[] = '],
  ['getSolvedExamples', 'solvedExamples.ts', 'export const SOLVED_SETS: SolvedSet[] = '],
  ['getLabPracticals', 'labPracticals.ts', 'export const LAB_PRACTICALS: LabPractical[] = '],
  ['getEnglishVocab', 'englishVocab.ts', 'export const VOCAB_SETS: VocabSet[] = '],
  ['getEnglishLiterature', 'englishLiterature.ts', 'export const LIT_CHAPTERS: LitChapter[] = '],
  ['getGlossary', 'glossary.ts', 'export const GLOSSARY: GlossaryTerm[] = '],
  ['getMathsTables', 'mathsTables.ts', 'export const MATHS_TABLES: MathRef[] = '],
  ['getStaticGk', 'staticGk.ts', 'export const GK_TOPICS: GkTopic[] = '],
  ['getFormulaSheets', 'formulaSheets.ts', 'export const FORMULA_SHEETS: FormulaSheet[] = '],
  // Added after these three were found to be outside the audit entirely. They are
  // hand-authored TS, so they are covered by the field-name scan above rather than
  // by JSON.parse — an audit that cannot read a bank must say so, not skip it.
  ['getWhatToStudy', 'whatToStudy.ts', 'export const WEIGHTAGE_SUBJECTS: WeightageSubject[] = '],
  ['getTimelines', 'timelines.ts', 'export const TIMELINES: HistoryTimeline[] = '],
  ['getVisualLessons', 'visualLessons.ts', 'export const VISUAL_LESSONS: VisualLesson[] = '],
  ['getEnglishTopics', 'englishTopics.ts', 'export const ENGLISH_TOPICS: EnglishTopic[] = '],
  ['getCareerGuides', 'careerGuides.ts', 'export const CAREER_GUIDES: CareerGuide[] = '],
  // aiHub.ts is valid JSON, so this parses normally. It was simply never listed —
  // and its loader projected 3 of 7 fields, dropping 107 sections and 64 FAQs.
  ['getAiHubTopics', 'aiHub.ts', 'AI_TOPICS: AiTopic[] = ', 'aiHubTopics'],
  ['getFullForms', 'fullForms.ts', 'export const FULL_FORMS: FullForm[] = '],
  ['getSamplePapers', 'samplePapers.ts', 'export const SAMPLE_PAPERS: SamplePaper[] = '],

  // Loaders OUTSIDE studyClusters.mjs. These were unaudited until 2026-08-16 —
  // and an audit that silently skips a loader is the same shape of blind spot
  // it exists to catch. A 4th element names the module.
  ['getDifferences', 'differences.ts', 'export const DIFFERENCES: DiffTopic[] = ', 'differencesData'],
  ['getMedicalManifest', 'medicalColleges.ts', 'export const MEDICAL_COLLEGES: MedicalCollege[] = ', 'medicalCollegesData'],
];

/** `${loader}.${field}` -> why it is deliberately not carried through. */
const ALLOWED = {
  // { label, tab } — a target for an in-app tab, not page content. The static
  // page cannot turn a tab id into a URL without guessing, and a wrong internal
  // link is worse than an absent one.
  'getVisualLessons.practice': 'in-app tab target, not body content',

  // Presentation-only: the detail page derives its own heading from classLevel
  // and subject, and the exam label is already in the route title.
  'getPyqs.exam': 'route title already carries the exam name; not body content',

  // Checked 2026-08-16: only 438 of 1,358 entries (32%) resolve to a real
  // /full-forms page — they are free-text abbreviations, not slugs. Rendering
  // them would emit 68% dead links, and this cluster is deliberately
  // noindex,follow with zero-click intent (69,773 impressions, 38 clicks), so
  // the surviving third would pass equity between pages that are already
  // decaying on purpose. Not worth it unless the field is cleaned up first.
  'getFullForms.related': '68% of entries do not resolve to a page; cluster is noindex by design',

  // Checked 2026-08-16 against the built pages, not assumed. The 17 GSC-proven
  // difference pages that are ALLOWED TO INDEX render a curated FAQ set from
  // diff-reindex.mjs plus diff-deep extraFaqs — verified: an indexed page
  // carries the FAQ heading and 16 <h3> entries. The other 267 are noindex, so
  // a crawler-facing FAQ there would serve nobody, and the React page still
  // shows this field to actual readers. Superseded, not lost.
  'getDifferences.faqs': 'indexed pages use the curated diff-reindex FAQs; the rest are noindex',
};

const words = (v) => JSON.stringify(v ?? '')
  .replace(/[^A-Za-z0-9ऀ-ॿ ]+/g, ' ')
  .trim().split(/\s+/).filter(Boolean).length;

const keysOf = (arr) => {
  const s = new Set();
  for (const r of arr) if (r && typeof r === 'object') Object.keys(r).forEach((k) => s.add(k));
  return s;
};

const strict = process.argv.includes('--strict');
let violations = 0;
const unaudited = [];

for (const [fn, file, marker, moduleName = 'clusters'] of BANKS) {
  const mod = MODULES[moduleName];
  if (!mod || typeof mod[fn] !== 'function') { unaudited.push(`${fn} — not exported by ${moduleName}`); continue; }
  let raw = readArray(file, marker);
  let namesOnly = false;
  if (!raw || !raw.length) {
    const names = readFieldNames(file, marker);
    if (!names.size) { unaudited.push(`${fn} (${file}) — marker not found, NOT AUDITED`); continue; }
    raw = [Object.fromEntries([...names].map((k) => [k, 1]))];
    namesOnly = true;
  }
  let projected = mod[fn](ROOT);
  // Some loaders return a manifest object rather than a bare array.
  if (projected && !Array.isArray(projected)) {
    projected = projected.colleges || projected.chapters || projected.items || null;
  }
  if (!Array.isArray(projected) || !projected.length) { unaudited.push(`${fn} — loader returned nothing, NOT AUDITED`); continue; }

  const kept = keysOf(projected);
  const dropped = [...keysOf(raw)]
    .filter((k) => !kept.has(k))
    .map((k) => ({
      k,
      n: raw.reduce((a, r) => a + (r && r[k] !== undefined ? words(r[k]) : 0), 0),
      items: raw.filter((r) => r && r[k] !== undefined).length,
    }))
    .filter((d) => namesOnly || d.n > 0)
    .sort((a, b) => b.n - a.n);

  const unexplained = dropped.filter((d) => !ALLOWED[`${fn}.${d.k}`]);
  if (!dropped.length) { console.log(`  ok       ${fn.padEnd(22)} ${String(raw.length).padStart(4)} records`); continue; }

  const tag = unexplained.length ? 'DROPS   ' : '  ok(*)  ';
  console.log(`${tag} ${fn.padEnd(22)} ${String(raw.length).padStart(4)} records`);
  for (const d of dropped) {
    const why = ALLOWED[`${fn}.${d.k}`];
    console.log(`           ${d.k.padEnd(16)} ~${d.n} words / ${d.items} records${why ? `   [allowed: ${why}]` : '   <-- NOT RENDERED'}`);
  }
  violations += unexplained.length;
}

console.log('');
if (unaudited.length) {
  console.log('NOT AUDITED — do not read these as clean:');
  unaudited.forEach((u) => console.log(`  - ${u}`));
  console.log('');
}
if (violations) {
  console.log(`✗ ${violations} field(s) stored but not carried to any page.`);
  console.log('  Either render them, or add them to ALLOWED with a reason.');
  if (strict) process.exit(1);
} else {
  console.log('✓ every stored field is either rendered or explicitly allowed.');
}
if (strict && unaudited.length) {
  console.log('✗ --strict: a bank could not be audited, which hides exactly this bug.');
  process.exit(1);
}
