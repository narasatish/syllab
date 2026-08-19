#!/usr/bin/env node
/**
 * audit-dark-banks.mjs — find content banks that NO loader consumes.
 *
 * audit-projections.mjs answers "of the banks we listed, is every stored field
 * rendered?". It cannot answer "did we list every bank?", and that gap is where
 * the damage has been. Six clusters in one session turned out to be authored
 * content that reached no page, and in three of them — whatToStudy,
 * visualLessons, englishTopics — there was no loader and no audit entry at all,
 * so nothing in the repo could report them dark. A registry you have to remember
 * to update is not a check; it is a habit.
 *
 * This inverts it: enumerate every array export under src/data/ and fail on any
 * that is page content and reaches no loader. Banks that are legitimately
 * client-only — UI copy, quiz seeds, reward tables — are listed in APP_ONLY with
 * a reason, so the exemption is a decision on the record rather than an
 * oversight.
 *
 *     node scripts/audit-dark-banks.mjs            # report
 *     node scripts/audit-dark-banks.mjs --strict   # exit 1 on an unexplained dark bank
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

/**
 * Banks that feed the React app rather than a prerendered page. Each needs a
 * reason: "it is not page content" is a claim, and the next person should be
 * able to check it.
 */
const APP_ONLY = {
  // predictorData.ts drives the interactive College/Career Predictor in
  // CareerPredictor.tsx — the user enters a rank and the tool computes against
  // these tables client-side. The prerendered /college-predictor pages are built
  // from the main colleges bank instead, which is larger and NIRF-verified.
  JOSAA_CUTOFFS: 'in-app predictor engine (CareerPredictor.tsx) — computed against a user-entered rank',
  NEET_COLLEGE_CUTOFFS: 'in-app predictor engine — computed against a user-entered rank',
  STREAM_GUIDES: 'in-app career-quiz output, shown after the user answers',
  ENG_EXAMS: 'in-app predictor engine — exam input scales and rank conversion tables',
  CAREER_LIBRARY: 'in-app career-quiz output',
  COLLEGE_DIRECTORY: 'in-app predictor result set; the prerendered pages use the main colleges bank',
  COLLEGE_PREDICTORS: 'registry of in-app predictor tools, not page content',
  // Question pools are the quiz engine's source. Rendering them would publish
  // every answer and destroy the quiz.
  BIOLOGY_POOL: 'NEET quiz engine question pool — rendering it would publish the answers',
  JEE_CHEM_POOL: 'JEE quiz engine question pool — rendering it would publish the answers',
  JEE_PHY_POOL: 'JEE quiz engine question pool — rendering it would publish the answers',
  JEE_MATH_POOL: 'JEE quiz engine question pool — rendering it would publish the answers',
  PYQ_EXAMS: 'exam filter list for the in-app /pyqs browser, not body content',
  FINANCIAL_LITERACY: 'in-app lesson module; no /financial-literacy route exists to render it',
  // The four below were checked against their consumers before being exempted,
  // not assumed. Each feeds the running app; none has a page that would render
  // it, so forcing them onto one would be content invented to satisfy an audit.
  JUNIOR_SYLLABUS: 'Class 1-5 chapter list; syllabus.ts folds it into SYLLABUS, which drives the in-app /syllabus, /practice and dashboard views — the prerendered class pages are built from the NCERT artefact instead',
  STATE_BOARD_SYLLABUS: 'state-board chapter seeds, folded into the same in-app SYLLABUS; chapterMatchesBoard() filters them client-side by the board the user picked',
  BOARD_OPTIONS: 'the board selector itself (id, label, ncertAligned) — UI control data, not page content',
  EXAM_CALENDAR: 'exam-date rows rendered client-side by CareerPredictor.tsx and WhatToStudy.tsx; dates change through the year and are shown with the app disclaimer rather than baked into static HTML',


  STUDY_QUOTES: 'study-room UI copy, shown in-app only',
  STUDY_TIPS: 'study-room UI copy, shown in-app only',
  BREAK_IDEAS: 'study-room UI copy, shown in-app only',
  EXAM_COUNTDOWNS: 'study-room widget state, not a page',
  AVATAR_REWARDS: 'gamification table, in-app only',
  HERO_QUIZ_SAMPLES: 'homepage hero widget seed',
  QUIZ_PACKS: 'in-app quiz engine data',
  CORE_QUESTIONS: 'in-app quiz engine data',
  MOCK_TESTS: 'in-app mock-test engine data',
  AVAILABLE_MOCK_TESTS: 'in-app mock-test engine data',
  INTEREST_QUIZ: 'in-app career-quiz engine data',
  DIAGRAMS: 'diagram-lab canvas definitions, rendered client-side',
  SOCIAL_IMAGES: 'OG image generation input, not a page',
  TOOLS: 'tool registry powering the /tools nav, not page content',
  UPLOADED_DECKS: 'user-uploaded deck index, empty by default',
  FORMULA_BANK: 'in-app formula lookup widget',
  ALTERNATIVES: 'comparison rows embedded in the alternatives pages',
  ELEMENTS: 'periodic-table widget data, rendered client-side',
  FUN_FACTS: 'in-app fact rotator',
};

// Read EVERY script, not a hand-listed subset. The first version named the
// loader files explicitly and went stale the same day: kidsData.mjs and
// microModules.mjs were added, and their nine banks were still reported dark. A
// tool built to replace a registry you must remember to update should not itself
// depend on one.
const loaderSrc = readdirSync(path.join(ROOT, 'scripts'))
  .filter((f) => f.endsWith('.mjs') && !f.startsWith('audit-'))
  .map((f) => { try { return readFileSync(path.join(ROOT, 'scripts', f), 'utf8'); } catch { return ''; } })
  .join('\n');

const banks = [];
// Recurse. This scanned only the top level of src/data, so the nine banks under
// src/data/kids/ — 71 KB of rhymes, stories and picture topics — were invisible
// to the very audit built to find invisible banks.
const dataFiles = [];
(function walk(dir, prefix = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(path.join(dir, entry.name), prefix + entry.name + '/');
    else if (entry.name.endsWith('.ts') && !entry.name.includes('.test.')) dataFiles.push(prefix + entry.name);
  }
})(DATA);
for (const file of dataFiles) {
  const src = readFileSync(path.join(DATA, file), 'utf8');
  for (const m of src.matchAll(/^export const ([A-Z][A-Z0-9_]+)\s*:\s*[^=]+\[\]\s*=/gm)) {
    banks.push({ name: m[1], file, kb: Math.round(src.length / 1024) });
  }
}

// Two signals, deliberately kept apart. A loader may parse a FILE generically
// without ever naming the export inside it - collegesData.mjs reads colleges.ts
// and never mentions COLLEGE_STATE_INFO - so "the name appears nowhere" alone
// would report a consumed bank as dark. Keeping those separate holds the strict
// failure list to the cases we are actually confident about.
const dark = banks.filter((b) => !loaderSrc.includes(b.name));
const fileRead = (b) => loaderSrc.includes("'" + b.file + "'");
const uncertain = dark.filter((b) => !APP_ONLY[b.name] && fileRead(b));
const unexplained = dark.filter((b) => !APP_ONLY[b.name] && !fileRead(b));
const explained = dark.filter((b) => APP_ONLY[b.name]);

console.log(`Array exports under src/data: ${banks.length}`);
console.log(`  consumed by a loader      : ${banks.length - dark.length}`);
console.log(`  app-only (declared)       : ${explained.length}`);
console.log(`  file parsed, export unnamed: ${uncertain.length}  (lower confidence)`);
console.log(`  DARK, unexplained         : ${unexplained.length}\n`);
if (uncertain.length) {
  console.log('Lower confidence - a loader reads the file but never names this export:');
  for (const b of uncertain.sort((a, c) => c.kb - a.kb)) console.log(`  ${String(b.kb).padStart(4)}KB  ${b.name.padEnd(26)} ${b.file}`);
  console.log('');
}

if (unexplained.length) {
  console.log('These are page content that reaches no loader — render them, or add them to');
  console.log('APP_ONLY with a reason:');
  for (const b of unexplained.sort((a, c) => c.kb - a.kb)) {
    console.log(`  ${String(b.kb).padStart(4)}KB  ${b.name.padEnd(26)} ${b.file}`);
  }
} else {
  console.log('✓ every bank is either consumed by a loader or declared app-only.');
}

/**
 * A ratchet, not a wall.
 *
 * Wiring --strict into npm test while banks are still unrendered would give a
 * gate that fails on day one, and a permanently red check is one people learn
 * to skip. --max=N fails only when the count RISES above a recorded baseline,
 * so the suite stays green today and a NEW dark bank breaks the build
 * immediately. Lower the number as the list is worked down; it should never go
 * up without a reason in the commit message.
 */
const maxArg = process.argv.find((a) => a.startsWith('--max='));
if (maxArg) {
  const max = Number(maxArg.split('=')[1]);
  if (unexplained.length > max) {
    console.log(`\n✗ ${unexplained.length} unexplained dark bank(s), above the agreed ceiling of ${max}.`);
    console.log('  Render the new bank, or add it to APP_ONLY with a reason.');
    process.exit(1);
  }
  console.log(`\n✓ ${unexplained.length} unexplained, at or below the ceiling of ${max}.`);
}
if (process.argv.includes('--strict') && unexplained.length) process.exit(1);
