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

const loaderSrc = ['studyClusters.mjs', 'generate-prerender.mjs', 'generate-sitemap.mjs', 'collegesData.mjs', 'medicalColleges.mjs', 'blogArticles.mjs', 'ncertChapters.mjs', 'stateBoardChapters.mjs', 'aiHubTopics.mjs', 'differencesData.mjs']
  .map((f) => { try { return readFileSync(path.join(ROOT, 'scripts', f), 'utf8'); } catch { return ''; } })
  .join('\n');

const banks = [];
for (const file of readdirSync(DATA)) {
  if (!file.endsWith('.ts') || file.includes('.test.')) continue;
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

if (process.argv.includes('--strict') && unexplained.length) process.exit(1);
