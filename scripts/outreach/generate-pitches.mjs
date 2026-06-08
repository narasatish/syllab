#!/usr/bin/env node

/**
 * generate-pitches.mjs
 *
 * Reads targets.json + boilerplate.json and generates ready-to-send outreach
 * draft emails and templates into scripts/outreach/drafts/ directory.
 *
 * Output:
 *   - scripts/outreach/drafts/DIRECTORY_*.txt      (one per directory listing)
 *   - scripts/outreach/drafts/GUEST_POST_*.txt     (one per guest post target)
 *   - scripts/outreach/drafts/HARO_*.txt           (one per HARO/PR source)
 *   - scripts/outreach/drafts/INDEX.md             (summary of all targets + cadence)
 *
 * IMPORTANT: This script DOES NOT send emails or hit any network/API.
 * It only generates draft text files for manual review and sending.
 *
 * Usage: node scripts/outreach/generate-pitches.mjs
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUTREACH_DIR = path.join(__dirname);
const DRAFTS_DIR = path.join(__dirname, 'drafts');

// ────────────────────────────────────────────────────────────────────────
// Helper functions
// ────────────────────────────────────────────────────────────────────────

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

// ────────────────────────────────────────────────────────────────────────
// Main script
// ────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📝 Generating outreach drafts...\n');

  // Ensure drafts directory exists
  await ensureDir(DRAFTS_DIR);

  // Load targets and boilerplate
  const targetsPath = path.join(__dirname, 'targets.json');
  const boilerplatePath = path.join(__dirname, 'boilerplate.json');

  let targets, boilerplate;
  try {
    const targetsData = await fs.readFile(targetsPath, 'utf8');
    targets = JSON.parse(targetsData);
  } catch (e) {
    console.error(`❌ Failed to load targets.json: ${e.message}`);
    process.exit(1);
  }

  try {
    const boilerplateData = await fs.readFile(boilerplatePath, 'utf8');
    boilerplate = JSON.parse(boilerplateData);
  } catch (e) {
    console.error(`❌ Failed to load boilerplate.json: ${e.message}`);
    process.exit(1);
  }

  let dirCount = 0, guestCount = 0, haroCount = 0;
  const indexEntries = [];

  // ────────────────────────────────────────────────────────────────────────
  // Generate directory listing drafts
  // ────────────────────────────────────────────────────────────────────────
  console.log('📁 Generating directory listing drafts...');
  for (const dir of targets.directories || []) {
    const filename = `DIRECTORY_${sanitizeFilename(dir.name)}.txt`;
    const filepath = path.join(DRAFTS_DIR, filename);

    const draft = [
      `═══════════════════════════════════════════════════════════════`,
      `DIRECTORY LISTING DRAFT: ${dir.name}`,
      `═══════════════════════════════════════════════════════════════\n`,
      `URL: ${dir.url}`,
      dir.verify ? `⚠️  VERIFY: Confirm the exact submission URL before posting.\n` : `\n`,
      `NOTES:`,
      `${dir.notes}\n`,
      `ACTION:`,
      `${dir.action}\n`,
      `───────────────────────────────────────────────────────────────`,
      `ONE-LINER FOR LISTING:`,
      `${boilerplate.oneLiner}\n`,
      `───────────────────────────────────────────────────────────────`,
      `50-WORD DESCRIPTION:`,
      `${boilerplate.fiftyWord}\n`,
      `───────────────────────────────────────────────────────────────`,
      `TAGS:`,
      `${boilerplate.tags.join(', ')}\n`,
      `───────────────────────────────────────────────────────────────`,
      `OPTIONAL: Logo/screenshot links`,
      `- Syllab logo: https://syllab.in/logo.png (verify this exists)`,
      `- Hero screenshot: https://syllab.in/screenshot.png (verify this exists)\n`,
      `STATUS: [ ] Not started  [ ] Draft sent  [ ] Confirmed\n`,
    ].join('\n');

    await fs.writeFile(filepath, draft);
    dirCount++;
    indexEntries.push({ type: 'directory', name: dir.name, file: filename });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Generate guest post pitch drafts
  // ────────────────────────────────────────────────────────────────────────
  console.log('📝 Generating guest post pitch drafts...');
  for (const post of targets.guestPosts || []) {
    const filename = `GUEST_POST_${sanitizeFilename(post.category)}_${sanitizeFilename(post.name || 'generic')}.txt`;
    const filepath = path.join(DRAFTS_DIR, filename);

    const draft = [
      `═══════════════════════════════════════════════════════════════`,
      `GUEST POST PITCH DRAFT: ${post.category}`,
      `═══════════════════════════════════════════════════════════════\n`,
      `TARGET: ${post.name}`,
      `URL: ${post.url}`,
      post.verify ? `⚠️  VERIFY: Confirm the editor email and submission guidelines.\n` : `\n`,
      `EDITOR EMAIL: ${post.editorEmail}`,
      `IDEAL LENGTH: ${post.idealLength}\n`,
      `───────────────────────────────────────────────────────────────`,
      `SUBJECT LINE:`,
      `Guest post idea: "${post.action}"\n`,
      `───────────────────────────────────────────────────────────────`,
      `EMAIL BODY:\n`,
      `Hi [Editor Name],\n`,
      `I hope this email finds you well. I'm reaching out with a guest post idea for [Publication Name].\n`,
      `PITCH:\n`,
      `"${post.action}"\n`,
      `This article would explore how free, AI-powered tutoring is changing exam prep for Indian\n`,
      `students—and why accessibility matters more than ever.\n\n`,
      `WHY NOW:\n`,
      `Indian students increasingly expect free, high-quality learning tools. According to recent\n`,
      `surveys, over 60% of Indian parents seek free alternatives to paid edtech platforms.\n`,
      `This article would speak directly to your readers' needs.\n\n`,
      `ABOUT SYLLAB:\n`,
      `${boilerplate.fiftyWord}\n\n`,
      `ARTICLE OUTLINE (rough):\n`,
      `1. The problem: exam prep costs real money; many students are left behind\n`,
      `2. How AI tutoring is changing the game: personalized feedback, instant explanations\n`,
      `3. Case study: Why Syllab is free (mission-driven, not freemium)\n`,
      `4. What students are doing differently with this tool\n`,
      `5. What's next: scaling free quality education in India\n\n`,
      `I'm happy to:\n`,
      `- Provide data/quotes from our 500K+ active learners\n`,
      `- Offer exclusive insights on free edtech trends in India\n`,
      `- Include original research or infographics\n\n`,
      `Estimated word count: ${post.idealLength}\n`,
      `Timeline: Available to write immediately upon your go-ahead.\n\n`,
      `Would this be of interest? I'd love to hear your thoughts.\n\n`,
      `Best regards,\n`,
      `${boilerplate.authorBio}\n\n`,
      `───────────────────────────────────────────────────────────────`,
      `NOTES:`,
      `${post.notes}\n`,
      `STATUS: [ ] Not started  [ ] Pitch sent  [ ] Confirmed\n`,
    ].join('\n');

    await fs.writeFile(filepath, draft);
    guestCount++;
    indexEntries.push({ type: 'guest_post', name: `${post.category} - ${post.name}`, file: filename });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Generate HARO / PR source response templates
  // ────────────────────────────────────────────────────────────────────────
  console.log('🎙️  Generating HARO/PR response templates...');
  for (const haro of targets.haroAndPR || []) {
    const filename = `HARO_${sanitizeFilename(haro.name)}.txt`;
    const filepath = path.join(DRAFTS_DIR, filename);

    const draft = [
      `═══════════════════════════════════════════════════════════════`,
      `HARO / JOURNALIST QUERY RESPONSE TEMPLATE: ${haro.name}`,
      `═══════════════════════════════════════════════════════════════\n`,
      `SOURCE: ${haro.name}`,
      `URL: ${haro.url}\n`,
      `───────────────────────────────────────────────────────────────`,
      `STEPS TO USE:`,
      `1. Monitor ${haro.name} for relevant journalist queries`,
      `2. When you find a query that fits, copy your response here`,
      `3. Personalize with the specific journalist name and query`,
      `4. Submit and track the publication\n`,
      `───────────────────────────────────────────────────────────────`,
      `TEMPLATE RESPONSE:\n`,
      `Hi [Journalist Name],\n`,
      `Great question on [topic]. Happy to share Syllab's perspective.\n\n`,
      `[Your specific quote or insight addressing the query]\n\n`,
      `BACKGROUND:\n`,
      `${boilerplate.hundredWord}\n\n`,
      `KEY QUOTE (use or adapt):\n`,
      `"Free, AI-powered tutoring isn't just nice to have—it's necessary. When 5M+ students\n`,
      `in India still can't access quality education, we had to build it ourselves. Our mission\n`,
      `is simple: geography and income should never determine a student's potential."\n\n`,
      `— [Your Name], [Your Title] at Syllab\n\n`,
      `ADDITIONAL RESOURCES:\n`,
      `- Syllab homepage: https://syllab.in\n`,
      `- About page: https://syllab.in/about\n`,
      `- Founder story: [link if available]\n\n`,
      `Happy to provide data, student testimonials, or additional expert commentary.\n\n`,
      `Best regards,\n`,
      `${boilerplate.authorBio}\n\n`,
      `───────────────────────────────────────────────────────────────`,
      `NOTES:`,
      `${haro.notes}\n`,
      `ACTION:`,
      `${haro.action}\n`,
      `STATUS: [ ] Not started  [ ] Monitoring active  [ ] Response submitted\n`,
    ].join('\n');

    await fs.writeFile(filepath, draft);
    haroCount++;
    indexEntries.push({ type: 'haro', name: haro.name, file: filename });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Generate INDEX.md
  // ────────────────────────────────────────────────────────────────────────
  console.log('📋 Generating INDEX.md...');

  const cadenceSection = `### Week 1: Directory Listings
- Submit 2–3 directory listings (AlternativeTo, GetApp, Capterra)
- Goal: Get listed on directories where students search for free alternatives
- Effort: ~15 min per listing (copy-paste boilerplate, create account if needed)

### Week 2: Guest Post Pitches (Round 1)
- Send 2 guest post pitches to Indian parenting/education blogs
- Goal: High-intent audience; backlinks + credibility
- Effort: ~20 min per pitch (personalize, send)

### Week 3: HARO Monitoring
- Monitor all HARO/journalist sources daily (5–10 min per day)
- Goal: Get quoted in mainstream media (zero cost, high ROI)
- Effort: Response template is pre-written; ~5 min per response

### Week 4: Guest Post Pitches (Round 2) + Follow-up
- Follow up on Week 2 pitches (non-pushy)
- Send 2 new pitches to board-prep or career blogs
- Goal: Diversify audience, increase backlinks
- Effort: ~20 min per pitch

### Ongoing: Repeat & Measure
- Aim for 1 directory listing + 1 guest post pitch + 2–3 HARO responses per week
- Track responses in the 'STATUS' field of each draft
- After publication, note the URL in \`scripts/outreach/published.log\``;

  const keyMessagingSection = boilerplate.keyMessages.map(msg => `- ${msg}`).join('\n');

  const directoryListingsSection = indexEntries
    .filter(e => e.type === 'directory')
    .map(e => `- **${e.name}** → \`${e.file}\``)
    .join('\n');

  const guestPostSection = indexEntries
    .filter(e => e.type === 'guest_post')
    .map(e => `- **${e.name}** → \`${e.file}\``)
    .join('\n');

  const haroSection = indexEntries
    .filter(e => e.type === 'haro')
    .map(e => `- **${e.name}** → \`${e.file}\``)
    .join('\n');

  const indexMd = `# Syllab Outreach Pipeline

**Generated:** ${new Date().toISOString().split('T')[0]}
**Status:** Draft mode — no emails sent, no network calls made.

---

## Quick Start

Each file in this directory is a ready-to-send draft. Review, personalize, and send manually.

### File Structure

- **DIRECTORY_*.txt** — Directory listing submissions (AlternativeTo, G2, Product Hunt, etc.)
- **GUEST_POST_*.txt** — Email pitches for guest articles on blogs and publications
- **HARO_*.txt** — Response templates for journalist queries and expert roundups

---

## Summary

| Type | Count | Notes |
|------|-------|-------|
| Directory Listings | ${dirCount} | Submit to app/product directories |
| Guest Post Pitches | ${guestCount} | Email to editors; target 800–2500 word pieces |
| HARO/PR Templates | ${haroCount} | Monitor sources; respond to journalist queries |
| **Total** | **${dirCount + guestCount + haroCount}** | **Outreach opportunities** |

---

## Suggested Weekly Cadence

${cadenceSection}

---

## Key Messaging (Consistent Across All Pitches)

${keyMessagingSection}

---

## Targets by Type

### Directory Listings (${dirCount})

${directoryListingsSection}

### Guest Post Opportunities (${guestCount})

${guestPostSection}

### HARO / Journalist Sources (${haroCount})

${haroSection}

---

## Important Notes

1. **No automation:** This script generates drafts only. Each outreach must be reviewed and sent manually.
2. **No network calls:** Zero emails, zero API calls, zero external requests. Drafts only.
3. **Personalization required:** All [brackets] placeholders MUST be filled in before sending.
4. **Verify URLs:** Some targets require confirmation of exact submission/contact URLs (marked \`verify: true\`).
5. **Track responses:** Update the 'STATUS' field in each draft file as you progress.
6. **Publish log:** After a pitch is published, record the URL in \`scripts/outreach/published.log\`.

---

## Boilerplate Used

All drafts use consistent messaging from \`boilerplate.json\`:

**One-liner:**
${boilerplate.oneLiner}

**50 words:**
${boilerplate.fiftyWord}

**100 words:**
${boilerplate.hundredWord}

---

## Scripts & Tools

- \`scripts/outreach/targets.json\` — List of all targets (directories, guest posts, HARO sources)
- \`scripts/outreach/boilerplate.json\` — Reusable descriptions, tags, key messages
- \`scripts/outreach/generate-pitches.mjs\` — This script (generates all drafts)
- \`scripts/outreach/drafts/\` — Generated draft files (this directory)

---

**Generated by:** \`node scripts/outreach/generate-pitches.mjs\`
**Next step:** Review drafts, personalize, and send manually.
`;

  await fs.writeFile(path.join(DRAFTS_DIR, 'INDEX.md'), indexMd);

  // ────────────────────────────────────────────────────────────────────────
  // Summary
  // ────────────────────────────────────────────────────────────────────────
  console.log('\n✅ Done!\n');
  console.log(`📊 Generated Files:`);
  console.log(`   📁 Directory listings:    ${dirCount}`);
  console.log(`   📝 Guest post pitches:    ${guestCount}`);
  console.log(`   🎙️  HARO/PR responses:    ${haroCount}`);
  console.log(`   📋 INDEX.md:              1`);
  console.log(`   ───────────────────────────────`);
  console.log(`   Total files:              ${dirCount + guestCount + haroCount + 1}`);
  console.log(`\n📂 Location: ${DRAFTS_DIR}\n`);
  console.log(`⚠️  IMPORTANT:`);
  console.log(`   - NO emails sent (draft mode only)`);
  console.log(`   - NO network calls made`);
  console.log(`   - Review each draft before sending`);
  console.log(`   - Personalize all [brackets] placeholders`);
  console.log(`   - Verify URLs marked with 'verify: true'\n`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
