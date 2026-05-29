#!/usr/bin/env node
/**
 * Daily Instagram post for @syllab.in
 *
 * Pipeline:
 *   1. Pick a post type for today (rotates through templates)
 *   2. Generate content via Gemini (or fallback if no API key)
 *   3. Render branded 1080×1080 PNG via SVG → resvg
 *   4. Pick 20-25 trending hashtags
 *   5. Append hashtags to caption
 *   6. Post to Instagram via Graph API (or DRY_RUN to preview)
 *
 * Run:
 *   DRY_RUN=true node scripts/instagram-bot/post-daily.mjs           # safe preview
 *   node scripts/instagram-bot/post-daily.mjs                         # actual post
 *   node scripts/instagram-bot/post-daily.mjs --type=puzzle           # force a template
 *
 * Schedule daily via GitHub Actions, Render cron, or Vercel cron — see README.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateContent, pickTemplate } from './content-generator.mjs';
import { generateImage } from './image-generator.mjs';
import { pickHashtags } from './hashtag-picker.mjs';
import { postToInstagram } from './instagram-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUTPUT_DIR = path.join(ROOT, '.instagram-bot-output');

/* ── Pick post type ────────────────────────────────────────────────────── */
// Rotation: different type each day of the week
const WEEKDAY_TYPES = [
  'gk-fact',          // Sunday — GK to start the week
  'daily-question',   // Monday — academic question
  'coding-tip',       // Tuesday — coding (tech-tuesday)
  'puzzle',           // Wednesday — puzzle
  'exam-update',      // Thursday — news drop
  'ncert-tip',        // Friday — study hack
  'motivation',       // Saturday — weekend motivation
];

function parseArgs() {
  const args = { type: null, force: false };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--type=')) args.type = arg.slice('--type='.length);
    if (arg === '--force') args.force = true;
  }
  return args;
}

async function main() {
  const args = parseArgs();
  const dayIdx = new Date().getDay(); // 0 = Sun
  const todayType = args.type || WEEKDAY_TYPES[dayIdx];
  console.log(`\n📸 Syllab Instagram Bot — ${new Date().toISOString().slice(0, 10)}`);
  console.log(`Day: ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIdx]} → template: ${todayType}\n`);

  // 1. Generate content
  const { template, content, caption: baseCaption } = await generateContent(todayType);

  // 2. Render image
  console.log('Rendering image...');
  const imagePath = generateImage(template, content, OUTPUT_DIR);
  console.log('  →', imagePath);

  // 3. Pick hashtags
  const hashtags = pickHashtags(template.type, {
    subject: content.subject?.toLowerCase(),
    exam: content.exam,
  });
  const tagsLine = hashtags.join(' ');
  const fullCaption = `${baseCaption}\n\n.\n.\n.\n${tagsLine}`;
  console.log(`Hashtags (${hashtags.length}):`, hashtags.slice(0, 5).join(' '), '...');

  // 4. Post (or dry-run)
  try {
    const result = await postToInstagram(imagePath, fullCaption);
    console.log('\n✅ Done.', result);

    // Audit log (JSONL)
    const fs = await import('node:fs');
    const auditLog = path.join(OUTPUT_DIR, 'audit.jsonl');
    fs.appendFileSync(auditLog, JSON.stringify({
      timestamp: new Date().toISOString(),
      templateId: template.id,
      postId: result.postId,
      dryRun: result.dryRun,
      imagePath,
      caption: fullCaption,
    }) + '\n');
    console.log(`Audit log appended → ${auditLog}`);
  } catch (err) {
    console.error('\n❌ Post failed:', err.message);
    process.exit(1);
  }
}

main();
