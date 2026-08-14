/**
 * check-test-coverage.mjs — fail loudly when the test runner silently drops files.
 *
 * THE PROBLEM THIS EXISTS FOR
 * vitest's worker pool intermittently drops whole test files on this machine
 * and STILL EXITS 0. Six runs of an unchanged suite on 2026-08-14 reported
 * 48, 59, 59, 48 and 37 files. The summary just shows a smaller number — a
 * dropped file is never reported as a failure — so `npm test` going green is
 * not evidence the suite ran. That is a correctness hole under every future
 * change, not a cosmetic annoyance.
 *
 * WHY NOT JUST DISABLE PARALLELISM
 * `--no-file-parallelism` is deterministic and does give a clean 59/844, but
 * it takes >10 minutes here. Slowing every run by 3x to dodge a bug you cannot
 * see is the wrong trade. This keeps the fast parallel run and turns the silent
 * failure into a loud one: run the suite, then compare the files that actually
 * executed against the files on disk. Any gap is a hard error naming the
 * missing files, with the deterministic command to fall back to.
 *
 *   node scripts/check-test-coverage.mjs
 *   node scripts/check-test-coverage.mjs --retry   # re-run sequentially on a gap
 */
import { readdirSync, readFileSync, existsSync, unlinkSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT = path.join(ROOT, '.vitest-coverage-report.json');
const RETRY = process.argv.includes('--retry');
const VITEST_BIN = path.join(ROOT, 'node_modules', 'vitest', 'vitest.mjs');

if (!existsSync(VITEST_BIN)) {
  console.error(`Cannot find vitest at ${VITEST_BIN} — run npm install.`);
  process.exit(1);
}

/** Every test file on disk, repo-relative with forward slashes. */
function testFilesOnDisk(dir = path.join(ROOT, 'src'), acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) testFilesOnDisk(full, acc);
    else if (/\.test\.tsx?$/.test(entry.name)) {
      acc.push(path.relative(ROOT, full).split(path.sep).join('/'));
    }
  }
  return acc;
}

function runVitest(sequential) {
  if (existsSync(REPORT)) unlinkSync(REPORT);
  const args = ['vitest', 'run', '--reporter=json', `--outputFile=${REPORT}`];
  if (sequential) args.push('--no-file-parallelism');
  // Run vitest's own entry with the SAME node binary, rather than going through
  // npx. Two reasons: `shell: true` with an args array concatenates instead of
  // escaping (node DEP0190), and dropping the shell to avoid that makes Windows
  // refuse to spawn npx.cmd at all — which silently produced no report.
  // Invoking the .mjs directly sidesteps both.
  const res = spawnSync(process.execPath, [VITEST_BIN, ...args.slice(1)], { cwd: ROOT, stdio: 'inherit' });
  if (!existsSync(REPORT) || statSync(REPORT).size < 10) {
    console.error('\nNo JSON report was written — vitest did not finish. Treating as failure.');
    process.exit(1);
  }
  return { report: JSON.parse(readFileSync(REPORT, 'utf8')), status: res.status };
}

function filesThatRan(report) {
  return new Set(
    (report.testResults ?? []).map((t) =>
      path.relative(ROOT, t.name).split(path.sep).join('/'),
    ),
  );
}

let { report, status } = runVitest(RETRY);
const onDisk = testFilesOnDisk();
let ran = filesThatRan(report);
let missing = onDisk.filter((f) => !ran.has(f));

// A gap means the pool dropped files. Retry once sequentially — that has been
// reliable — so a flaky run does not block a legitimate change.
if (missing.length && !RETRY) {
  console.error(`\n⚠  ${missing.length} test file(s) did not run under the parallel pool.`);
  console.error('   Re-running sequentially to get a trustworthy result...\n');
  ({ report, status } = runVitest(true));
  ran = filesThatRan(report);
  missing = onDisk.filter((f) => !ran.has(f));
}

const passed = report.numPassedTests ?? 0;
const failed = report.numFailedTests ?? 0;

console.log('\n─────────────────────────────────────────────');
console.log(`test files on disk : ${onDisk.length}`);
console.log(`test files that ran: ${ran.size}`);
console.log(`tests              : ${passed} passed, ${failed} failed`);

if (missing.length) {
  console.error(`\n✖ ${missing.length} test file(s) NEVER RAN — this run proves nothing:`);
  for (const m of missing) console.error(`    ${m}`);
  console.error('\n  Run deterministically:  npx vitest run --no-file-parallelism');
  process.exit(1);
}

if (failed > 0 || status !== 0) {
  console.error('\n✖ Test failures present.');
  process.exit(1);
}

console.log(`\n✅ All ${onDisk.length} test files ran. ${passed} tests passed.`);
