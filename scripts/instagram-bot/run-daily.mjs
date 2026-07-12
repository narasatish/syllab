#!/usr/bin/env node
/**
 * run-daily.mjs — end-to-end daily Instagram pipeline for @syllab.in.
 *
 *   1. Build today's deterministic 10-post plan (5 reels, 3 carousels, 2 images)
 *      from unseen website content — persisted to plan-<date>.json so multiple
 *      "slot" runs share ONE plan.
 *   2. Generate real media (PNGs / MP4s) for the slot's posts.
 *   3. Publish via Graph API (or DRY_RUN preview — default, zero cost).
 *   4. Mark content used (never repeats) + append an audit log.
 *
 * Usage:
 *   DRY_RUN=true node scripts/instagram-bot/run-daily.mjs            # preview all 10
 *   node scripts/instagram-bot/run-daily.mjs                         # post all 10
 *   node scripts/instagram-bot/run-daily.mjs --slot=0 --slots=5      # post posts 1-2
 *   DRY_RUN=true node scripts/instagram-bot/run-daily.mjs --max=1    # quick smoke
 *
 * Schedule via GitHub Actions / cron — see README. Best practice: 5 slots at IST
 * peak hours (07:30, 12:30, 16:00, 19:30, 21:30) → 2 posts each, spread for reach.
 */
// Honour a `--dry` CLI flag (cross-platform, no env needed) by setting DRY_RUN
// before anything reads it.
if (process.argv.includes('--dry')) process.env.DRY_RUN = 'true';

import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDayPlan } from './lib/content-engine.mjs';
import { markUsed } from './lib/dedup.mjs';
import { generateMedia } from './lib/media-generators.mjs';
import { publishPost } from './lib/publisher.mjs';
import { isYouTubeReady, uploadShort } from './lib/youtube.mjs';
import { cleanup } from './lib/data-loader.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, '.instagram-bot-output');
const DRY_RUN = String(process.env.DRY_RUN || '').toLowerCase() === 'true';

function args() {
  const a = { slot: null, slots: null, max: null, type: null };
  for (const x of process.argv.slice(2)) {
    if (x.startsWith('--slot=')) a.slot = parseInt(x.slice(7), 10);
    else if (x.startsWith('--slots=')) a.slots = parseInt(x.slice(8), 10);
    else if (x.startsWith('--max=')) a.max = parseInt(x.slice(6), 10);
    else if (x.startsWith('--type=')) a.type = x.slice(7);
  }
  return a;
}

function dateKey(d = new Date()) {
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
}

/** Build the plan once per day and cache it so slot runs share it. */
async function getDayPlan(dk) {
  const planFile = path.join(OUT, `plan-${dk}.json`);
  if (existsSync(planFile)) {
    try { return JSON.parse(readFileSync(planFile, 'utf8')); } catch { /* rebuild */ }
  }
  const seed = parseInt(dk, 10) % 100000;
  const plan = await buildDayPlan(seed, { commit: false });
  mkdirSync(OUT, { recursive: true });
  writeFileSync(planFile, JSON.stringify(plan, null, 2), 'utf8');
  return plan;
}

/** Load scripts/instagram-bot/.env (gitignored) into process.env for any keys
 *  not already set (so CI env/secrets always take precedence). */
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    if (/^\s*#/.test(line)) continue;
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (v && process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

async function main() {
  loadEnv();
  const a = args();
  const dk = dateKey();
  console.log(`\n📸 Syllab IG pipeline — ${dk} ${DRY_RUN ? '(DRY RUN)' : '(LIVE)'}`);

  let plan = await getDayPlan(dk);
  if (a.type) plan = plan.filter((p) => p.format === a.type);

  // Slot slicing: divide the day's posts across `slots` runs, this run does `slot`.
  let slice = plan;
  if (a.slot != null && a.slots) {
    const per = Math.ceil(plan.length / a.slots);
    slice = plan.slice(a.slot * per, a.slot * per + per);
    console.log(`Slot ${a.slot + 1}/${a.slots} → ${slice.length} post(s) of ${plan.length}`);
  }
  if (a.max != null) slice = slice.slice(0, a.max);

  const mediaDir = path.join(OUT, dk);
  mkdirSync(mediaDir, { recursive: true });

  let ok = 0, fail = 0;
  const posted = [];
  for (let i = 0; i < slice.length; i++) {
    const post = slice[i];
    const label = `${post.format.toUpperCase()} [${(post.keys || []).join(',')}]`;
    console.log(`\n[${i + 1}/${slice.length}] ${label}`);
    try {
      const media = await generateMedia(post, mediaDir, `${dk}-${post.format}-${i}`);
      console.log(`   media: ${media.type} (${media.files.length} file(s))`);
      const firstComment = (post.caption.hashtags?.firstComment || []).join(' ');
      const result = await publishPost(media, post.caption.text, firstComment);
      console.log(`   ✅ ${result.dryRun ? 'previewed' : 'posted ' + result.postId}`);

      // #5 — cross-post reels to YouTube Shorts (2nd free channel) when configured.
      if (media.type === 'REELS' && !DRY_RUN && isYouTubeReady()) {
        try {
          const title = post.caption.text.split('\n')[0].replace(/^[^\w]+/, '').slice(0, 90);
          const yt = await uploadShort(media.files[0], { title, description: post.caption.text, tags: [post.topic].filter(Boolean) });
          console.log(`   ▶️  YouTube Short: ${yt.url}`);
        } catch (e) { console.warn(`   YouTube upload skipped: ${e.message}`); }
      }
      posted.push(...(post.keys || []));
      ok++;
      appendFileSync(path.join(OUT, 'audit.jsonl'), JSON.stringify({
        ts: new Date().toISOString(), date: dk, format: post.format, type: media.type,
        keys: post.keys, postId: result.postId, dryRun: result.dryRun, files: media.files,
      }) + '\n');
      // Gentle spacing between live posts (avoid burst / rate flags).
      if (!DRY_RUN && i < slice.length - 1) await new Promise((r) => setTimeout(r, 30000));
    } catch (err) {
      fail++;
      console.error(`   ❌ ${err.message}`);
    }
  }

  // Commit dedup only for content actually posted/previewed.
  if (posted.length) markUsed(posted);
  cleanup();
  console.log(`\n📊 Done: ${ok} ok, ${fail} failed. ${DRY_RUN ? 'Media in ' + mediaDir : ''}`);
  if (fail && !DRY_RUN) process.exitCode = 1;
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
