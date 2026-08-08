#!/usr/bin/env node
/**
 * measure-cwv.mjs — the ONLY sanctioned way to get performance numbers for syllab.in.
 *
 * WHY THIS EXISTS
 * ---------------
 * Performance numbers were repeatedly reported from `npx lighthouse` run on the
 * dev laptop. Those numbers were wrong — not noisy, WRONG. Local Lighthouse said
 * the homepage scored 54 with 1,100ms TBT; Google's own PSI measured the same
 * page, the same day, at 72 with 20ms TBT.
 *
 * The cause: `--throttling-method=simulate` measures the host CPU (benchmarkIndex)
 * and applies a slowdown multiplier on top of it. On a machine already busy with
 * builds and test workers, the host is slow AND the multiplier is applied to that
 * slow baseline, so the error compounds. Lighthouse reports this in
 * `environment.benchmarkIndex` and in `runWarnings` — both were ignored.
 *
 * Worse, local Lighthouse can only ever produce LAB data. Google ranks on FIELD
 * data (CrUX): what real users on real phones actually experienced over 28 days.
 * Lab and field disagree routinely, and only field decides whether Core Web
 * Vitals pass. Every conclusion drawn from a local run was answering the wrong
 * question with the wrong hardware.
 *
 * So: this script asks Google. The PSI API runs Lighthouse on Google's
 * infrastructure and returns CrUX field data in the same response. Nothing about
 * this machine can influence the result.
 *
 * COST: the PSI API is FREE and needs no key (~25k requests/day unauthenticated).
 * Set PSI_API_KEY only if you start getting 429s. No paid credential is involved,
 * so the free-first ladder does not apply here.
 *
 *   node scripts/measure-cwv.mjs                      # homepage, mobile + desktop
 *   node scripts/measure-cwv.mjs --url https://syllab.in/ncert-solutions
 *   node scripts/measure-cwv.mjs --save               # append to docs/cwv-history.json
 *   node scripts/measure-cwv.mjs --compare            # diff against the last saved run
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HISTORY = path.join(ROOT, 'docs', 'cwv-history.json');

const argv = process.argv.slice(2);
const flag = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i < 0 ? d : (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true);
};
const URL_ = flag('url', 'https://syllab.in/');
const SAVE = !!flag('save', false);
const COMPARE = !!flag('compare', false);

/** Core Web Vitals thresholds. Field data is judged at the 75th percentile. */
const T = {
  LARGEST_CONTENTFUL_PAINT_MS: { good: 2500, poor: 4000, unit: 'ms', label: 'LCP' },
  INTERACTION_TO_NEXT_PAINT: { good: 200, poor: 500, unit: 'ms', label: 'INP' },
  CUMULATIVE_LAYOUT_SHIFT_SCORE: { good: 0.1, poor: 0.25, unit: '', label: 'CLS' },
  FIRST_CONTENTFUL_PAINT_MS: { good: 1800, poor: 3000, unit: 'ms', label: 'FCP' },
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: { good: 800, poor: 1800, unit: 'ms', label: 'TTFB' },
};
/** Only these three decide the pass/fail verdict. FCP and TTFB are diagnostics. */
const CORE = ['LARGEST_CONTENTFUL_PAINT_MS', 'INTERACTION_TO_NEXT_PAINT', 'CUMULATIVE_LAYOUT_SHIFT_SCORE'];

const fmt = (key, v) => {
  if (v == null) return 'n/a';
  const t = T[key];
  if (!t) return String(v);
  return t.unit === 'ms' ? `${(v / 1000).toFixed(2)}s` : (v / 100).toFixed(3);
};
const verdict = (key, v) => {
  if (v == null) return '·';
  const t = T[key];
  const val = t.unit === 'ms' ? v : v / 100;
  return val <= t.good ? 'PASS' : val <= t.poor ? 'NEEDS WORK' : 'POOR';
};

async function psi(strategy) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', URL_);
  u.searchParams.set('strategy', strategy);
  u.searchParams.append('category', 'PERFORMANCE');
  if (process.env.PSI_API_KEY) u.searchParams.set('key', process.env.PSI_API_KEY);

  for (let attempt = 1; attempt <= 4; attempt++) {
    const r = await fetch(u, { signal: AbortSignal.timeout(180_000) });
    if (r.ok) return r.json();
    if (r.status === 429) {
      if (process.env.PSI_API_KEY) {
        if (attempt === 4) throw new Error(`PSI ${strategy}: 429 even with PSI_API_KEY — daily quota exhausted, retry tomorrow.`);
        await new Promise((s) => setTimeout(s, 30_000 * attempt));
        continue;
      }
      // Unauthenticated PSI is throttled aggressively and retrying will not help.
      // Fail loudly with the fix rather than silently falling back to a local
      // Lighthouse run — a local run is exactly the thing that produced wrong
      // numbers before, and a wrong number is worse than no number.
      throw new Error(
        `PSI ${strategy}: 429 (rate limited, no API key set).\n\n` +
        `  Unauthenticated PSI quota is too small to be reliable. Fix it once:\n` +
        `    1. https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com  → Enable\n` +
        `    2. APIs & Services → Credentials → Create credentials → API key\n` +
        `    3. Add to .env:  PSI_API_KEY=...\n\n` +
        `  The PageSpeed Insights API is FREE (~25k req/day) and needs no billing\n` +
        `  account. Until then use https://pagespeed.web.dev/ by hand.\n\n` +
        `  Do NOT substitute a local \`npx lighthouse\` run. On a loaded dev machine\n` +
        `  simulated throttling compounds host slowness and reports numbers that are\n` +
        `  simply false (measured: local 54 / TBT 1100ms vs Google 72 / TBT 20ms).`,
      );
    }
    if (r.status >= 500) {
      if (attempt === 4) throw new Error(`PSI ${strategy}: ${r.status} after 4 attempts`);
      await new Promise((s) => setTimeout(s, 5000 * attempt));
      continue;
    }
    throw new Error(`PSI ${strategy}: ${r.status} ${(await r.text()).slice(0, 300)}`);
  }
}

function extract(json, strategy) {
  const lh = json.lighthouseResult ?? {};
  const a = lh.audits ?? {};
  // Page-level field data is often absent for low-traffic URLs; PSI then only has
  // origin-level. Report WHICH one we got — they are not interchangeable.
  const pageField = json.loadingExperience?.metrics;
  const originField = json.originLoadingExperience?.metrics;
  const field = pageField ?? originField;

  return {
    strategy,
    fieldScope: pageField ? 'this URL' : originField ? 'whole origin (no per-URL data)' : 'none',
    field: field
      ? Object.fromEntries(Object.keys(T).map((k) => [k, field[k]?.percentile ?? null]))
      : null,
    lab: {
      score: Math.round((lh.categories?.performance?.score ?? 0) * 100),
      FCP: a['first-contentful-paint']?.numericValue ?? null,
      LCP: a['largest-contentful-paint']?.numericValue ?? null,
      TBT: a['total-blocking-time']?.numericValue ?? null,
      CLS: a['cumulative-layout-shift']?.numericValue ?? null,
      SI: a['speed-index']?.numericValue ?? null,
    },
    // Proof the run is trustworthy — the exact fields ignored when local runs
    // produced bogus numbers. benchmarkIndex is Google's host, not ours.
    environment: {
      benchmarkIndex: lh.environment?.benchmarkIndex ?? null,
      lighthouseVersion: lh.lighthouseVersion ?? null,
      runWarnings: lh.runWarnings ?? [],
    },
  };
}

function render(r) {
  console.log(`\n${'='.repeat(66)}\n  ${r.strategy.toUpperCase()}\n${'='.repeat(66)}`);

  console.log(`\n  FIELD — real users, CrUX 28-day p75  [scope: ${r.fieldScope}]`);
  if (!r.field) {
    console.log('    no field data (not enough real-user traffic yet)');
  } else {
    for (const k of Object.keys(T)) {
      const v = r.field[k];
      const core = CORE.includes(k) ? '*' : ' ';
      console.log(`   ${core} ${T[k].label.padEnd(5)} ${fmt(k, v).padStart(8)}   ${verdict(k, v)}`);
    }
    const judged = CORE.filter((k) => r.field[k] != null);
    const failed = judged.filter((k) => verdict(k, r.field[k]) !== 'PASS');
    console.log(`\n    Core Web Vitals: ${failed.length ? `FAILED — ${failed.map((k) => T[k].label).join(', ')}` : 'PASSED'}`);
    console.log('    (* = decides the verdict; FCP/TTFB are diagnostics only)');
  }

  console.log(`\n  LAB — Google's hardware, single synthetic run`);
  const l = r.lab;
  console.log(`    score ${l.score}   FCP ${(l.FCP / 1000).toFixed(2)}s   LCP ${(l.LCP / 1000).toFixed(2)}s   TBT ${Math.round(l.TBT)}ms   CLS ${l.CLS?.toFixed(3)}   SI ${(l.SI / 1000).toFixed(2)}s`);
  console.log(`    host benchmarkIndex ${r.environment.benchmarkIndex} · Lighthouse ${r.environment.lighthouseVersion}`);
  for (const w of r.environment.runWarnings) console.log(`    ⚠ ${w}`);
}

async function main() {
  console.log(`Measuring ${URL_} via Google PageSpeed Insights API`);
  console.log('(runs on Google hardware — this machine cannot affect the result)');

  const results = [];
  for (const s of ['mobile', 'desktop']) {
    results.push(extract(await psi(s), s));
  }
  results.forEach(render);

  const entry = { at: new Date().toISOString(), url: URL_, results };

  if (COMPARE || SAVE) {
    let hist = [];
    try { hist = JSON.parse(await fs.readFile(HISTORY, 'utf8')); } catch { /* first run */ }

    if (COMPARE) {
      const prev = [...hist].reverse().find((h) => h.url === URL_);
      console.log(`\n${'='.repeat(66)}\n  vs PREVIOUS SAVED RUN\n${'='.repeat(66)}`);
      if (!prev) console.log('  no previous run saved for this URL');
      else {
        console.log(`  previous: ${prev.at}`);
        for (const cur of results) {
          const old = prev.results.find((x) => x.strategy === cur.strategy);
          if (!old) continue;
          const d = (a, b) => (a == null || b == null ? '   n/a' : `${a - b >= 0 ? '+' : ''}${(a - b).toFixed(0)}`);
          console.log(`  ${cur.strategy.padEnd(8)} lab score ${old.lab.score} → ${cur.lab.score} (${d(cur.lab.score, old.lab.score)})   ` +
            `LCP ${(old.lab.LCP / 1000).toFixed(2)}s → ${(cur.lab.LCP / 1000).toFixed(2)}s   TBT ${Math.round(old.lab.TBT)} → ${Math.round(cur.lab.TBT)}ms`);
          if (cur.field && old.field) {
            const f = 'LARGEST_CONTENTFUL_PAINT_MS';
            console.log(`  ${' '.repeat(8)} field LCP ${fmt(f, old.field[f])} → ${fmt(f, cur.field[f])}  (28-day window — moves slowly)`);
          }
        }
      }
    }

    if (SAVE) {
      hist.push(entry);
      await fs.mkdir(path.dirname(HISTORY), { recursive: true });
      await fs.writeFile(HISTORY, JSON.stringify(hist, null, 2), 'utf8');
      console.log(`\nSaved to ${path.relative(ROOT, HISTORY)} (${hist.length} runs on file)`);
    }
  }

  console.log('\nNote: field data is a 28-day rolling average. A deploy today will not');
  console.log('show up here for days, and will not fully land for ~4 weeks. Lab moves');
  console.log('immediately; field is what Google actually ranks on.\n');
}

main().catch((e) => { console.error(`\n${e.message}\n`); process.exit(1); });
