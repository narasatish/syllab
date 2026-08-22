#!/usr/bin/env node
/**
 * audit-loader-registry.mjs — every content loader must be audited by something.
 *
 * There are two ways authored content fails to reach a page, and each needed its
 * own check:
 *
 *   the bank reaches no loader            -> audit-dark-banks.mjs
 *   a loader reaches it but drops most    -> audit-projections.mjs
 *
 * This closes the hole one level up. audit-projections only inspects loaders
 * somebody remembered to add to its BANKS list, so a loader written and never
 * registered is silently unaudited — and reports nothing at all, which reads
 * exactly like passing. getAiHubTopics lived in that hole: its own header
 * promised it was "the single source of truth so the build can never drift", and
 * it returned 3 of 7 fields, dropping 107 sections and 64 FAQs across 19 guides.
 * Nothing in the repo could have told you.
 *
 * A registry you must remember to update is a habit, not a check. So: enumerate
 * the loaders that exist and fail on any that no audit covers. Loaders that
 * genuinely cannot be audited this way are listed in EXEMPT with a reason, so
 * the exemption is a decision on the record.
 *
 *     node scripts/audit-loader-registry.mjs            # report
 *     node scripts/audit-loader-registry.mjs --strict   # exit 1 on an unregistered loader
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPTS = path.join(ROOT, 'scripts');

/**
 * Loaders that audit-projections structurally cannot cover. Each needs a reason
 * that says WHY, not merely that it is exempt.
 */
const EXEMPT = {
  getCollegesManifest: 'colleges.ts stores one record per line, so neither JSON.parse nor the 4-space field-name scan in audit-projections can read it; covered instead by src/data/collegesIntegrity.test.ts',
  getRouteChunks: 'build helper in routeChunks.mjs — parses App.tsx and resolves chunk files in dist/assets to emit modulepreloads; reads no authored bank, and returns null rather than guessing when a route cannot be resolved',
  getMathRef: 'generator helper in generate-maths-tables.mjs — writes mathsTables.ts, does not read a bank',
  getBlogArticles: 'reads src/pages/Updates.tsx, not a bank under src/data — audit-projections resolves files relative to src/data',
  getWorksheets: 'the catalog is not stored data — src/lib/worksheets.ts BUILDS 200 sheets from twelve generator modules, so there are no stored fields for audit-projections to compare against; covered instead by src/lib/worksheets.test.ts',
  getNcertChapters: 'reads public/data/ncert-solutions.json, a build artefact rather than an authored bank',
  getStateBoardChapters: 'reads public/data/state-board-solutions.json, a build artefact rather than an authored bank',
};

const loaders = [];
for (const file of readdirSync(SCRIPTS)) {
  if (!file.endsWith('.mjs') || file.startsWith('audit-')) continue;
  const src = readFileSync(path.join(SCRIPTS, file), 'utf8');
  for (const m of src.matchAll(/^export (?:async )?function ((?:get|read|load)[A-Za-z]+)/gm)) {
    loaders.push({ fn: m[1], file });
  }
}

const auditSrc = readFileSync(path.join(SCRIPTS, 'audit-projections.mjs'), 'utf8');
const registered = (fn) => auditSrc.includes(`'${fn}'`);

const covered = loaders.filter((l) => registered(l.fn));
const exempt = loaders.filter((l) => !registered(l.fn) && EXEMPT[l.fn]);
const orphan = loaders.filter((l) => !registered(l.fn) && !EXEMPT[l.fn]);

console.log(`Content loaders exported from scripts/: ${loaders.length}`);
console.log(`  audited by audit-projections        : ${covered.length}`);
console.log(`  exempt (with a stated reason)        : ${exempt.length}`);
console.log(`  UNAUDITED                            : ${orphan.length}\n`);

if (exempt.length) {
  for (const l of exempt) console.log(`  exempt  ${l.fn.padEnd(24)} ${EXEMPT[l.fn]}`);
  console.log('');
}

if (orphan.length) {
  console.log('These loaders are covered by nothing. Register them in the BANKS list of');
  console.log('audit-projections.mjs, or add them to EXEMPT here with a reason:');
  for (const l of orphan) console.log(`  ${l.fn.padEnd(26)} ${l.file}`);
} else {
  console.log('✓ every content loader is either audited or exempt with a reason.');
}

if (process.argv.includes('--strict') && orphan.length) process.exit(1);
