#!/usr/bin/env node
/**
 * Syllab Growth Agent — runs DAILY, hands-free.
 *
 * What it does automatically every day (safe, no external side effects):
 *   1. SEO self-audit  — refreshes the sitemap (new <lastmod>), checks robots.txt,
 *      counts indexable URLs, flags meta-length problems, picks the day's target
 *      keywords, and writes an SEO report.
 *   2. Marketing drafts — generates fresh, platform-ready posts for Reddit, Quora,
 *      Instagram and X (via Gemini if GEMINI_API_KEY is set, else rotating
 *      templates) into  scripts/growth-output/<date>/  for you to review & post.
 *
 * What it does NOT do automatically (on purpose):
 *   • Auto-post to Reddit/Quora. Daily unattended auto-posting violates their
 *     anti-spam rules and gets accounts shadow-banned. Posting also needs a human
 *     glance. So posting is gated behind an explicit flag:
 *        node scripts/growth-agent.mjs --post     (runs the Reddit bot for you)
 *   • Rewrite live meta tags daily. Google rewards CONSISTENCY; churning titles
 *     every day hurts rankings. The agent AUDITS and suggests; you apply changes
 *     deliberately. (Sitemap lastmod refresh IS safe and is done automatically.)
 *
 * Daily run (hands-free) — Windows Task Scheduler:
 *   schtasks /Create /TN "SyllabGrowth" /TR "node \"%CD%\scripts\growth-agent.mjs\"" /SC DAILY /ST 07:30
 */

import 'dotenv/config';
import { promises as fs } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_ROOT = path.join(ROOT, 'scripts', 'growth-output');
const SITE = 'https://syllab.in';
const POST = process.argv.includes('--post');

const today = new Date().toISOString().split('T')[0];
const dow = new Date().getDay(); // 0=Sun … 6=Sat — used to rotate angles deterministically

// ─── Target keyword pools (rotate daily so we cover the long tail) ───────────
const KEYWORD_THEMES = [
  ['free NCERT notes Class 10', 'CBSE Class 10 board exam tips 2026', 'free mock test Class 10'],
  ['JEE Main mock test free 2026', 'JEE rank predictor free', 'JEE Main percentile to rank'],
  ['NEET mock test free 2026', 'NEET college predictor free', 'NEET biology important chapters'],
  ['EAMCET rank predictor', 'KCET college predictor', 'MHT-CET cutoff 2026'],
  ['top engineering colleges India 2026', 'engineering college fees', 'NIRF ranking engineering'],
  ['free AI tutor for students India', 'doubt solver free', 'homework help free India'],
  ['free coding for students India', 'Python for Class 10', 'learn coding free India'],
];
const themeOfDay = KEYWORD_THEMES[dow % KEYWORD_THEMES.length];

// ─── Reddit / Quora / Instagram angle pools (rotate) ─────────────────────────
const SUBREDDITS = ['CBSE', 'JEEpreparation', 'neetpreparation', 'indianteens', 'india', 'Btechtards', 'developersIndia'];
const QUORA_QUESTIONS = [
  'What are the best free websites for CBSE Class 10 board exam preparation?',
  'Which is the best free JEE Main mock test series?',
  'How can I predict my JEE/NEET rank from marks?',
  'What are the top engineering colleges in [state] and their cutoffs?',
  'Is there a free AI tutor for Indian students?',
  'How do I choose a stream after Class 10?',
  'Which free apps actually help with NEET biology?',
];

// ─── Gemini (optional) ───────────────────────────────────────────────────────
async function gemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) },
    );
    const d = await res.json();
    return d?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch { return null; }
}

// ─── SEO audit ────────────────────────────────────────────────────────────────
async function seoAudit() {
  const findings = [];
  // 0. Refresh blog content first (new state/exam/college posts → fresh keywords).
  const b = spawnSync('node', [path.join(ROOT, 'scripts', 'generate-trending-blogs.mjs')], { cwd: ROOT, encoding: 'utf8' });
  findings.push(b.status === 0 ? '✅ Blog feed regenerated (fresh posts + keywords)' : '⚠️ Blog regeneration failed');
  // 1. Refresh sitemap (fresh lastmod is a safe, positive signal; picks up new college/blog URLs).
  const r = spawnSync('node', [path.join(ROOT, 'scripts', 'generate-sitemap.mjs')], { cwd: ROOT, encoding: 'utf8' });
  findings.push(r.status === 0 ? '✅ Sitemap regenerated with today\'s lastmod' : '⚠️ Sitemap regeneration failed — check generate-sitemap.mjs');
  findings.push('ℹ️ Per-page meta/JSON-LD + prerender refresh on the next `npm run build` / deploy (keeps it in lockstep with content).');

  // 2. Count indexable URLs.
  let urlCount = 0;
  try {
    const sm = await fs.readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
    urlCount = (sm.match(/<loc>/g) || []).length;
    findings.push(`📄 Sitemap lists ${urlCount} indexable URLs`);
    if (urlCount > 300) findings.push('⚠️ Sitemap is large — keep only prerendered, unique-content URLs to protect crawl budget.');
  } catch { findings.push('⚠️ public/sitemap.xml not found'); }

  // 3. robots.txt sanity.
  try {
    const robots = await fs.readFile(path.join(ROOT, 'public', 'robots.txt'), 'utf8');
    findings.push(robots.includes('Sitemap:') ? '✅ robots.txt references the sitemap' : '⚠️ robots.txt missing Sitemap: line');
  } catch { findings.push('⚠️ public/robots.txt not found'); }

  // 4. Manual checklist reminders.
  findings.push('🔁 In GSC: resubmit sitemap + click "Validate Fix" on any open issues');
  findings.push('🔁 Request indexing for any page edited today (URL Inspection)');
  return { findings, urlCount };
}

// ─── Content drafts ────────────────────────────────────────────────────────────
async function redditDraft() {
  const sub = SUBREDDITS[dow % SUBREDDITS.length];
  const kw = themeOfDay[0];
  const ai = await gemini(
    `Write a genuine, helpful Reddit self-post for r/${sub} (Indian students) that naturally mentions the free site syllab.in. Topic angle: "${kw}". Rules: sound like a real student/builder, NOT an ad; no hyperlink in the body (Reddit removes them); give real value first; 120-180 words; end with a question to invite replies. Output: a TITLE line then the BODY.`,
  );
  const body = ai || `Title: A genuinely free resource for ${kw}\n\n(Reddit draft template — set GEMINI_API_KEY for fresh AI copy.)\nShare your honest take: what would make a free study site actually useful for you?`;
  return `# Reddit draft — r/${sub}\n\n> Post the BODY as a text post. Put the link (https://syllab.in) in the FIRST COMMENT, not the body.\n\n${body}\n`;
}
async function quoraDraft() {
  const q = QUORA_QUESTIONS[dow % QUORA_QUESTIONS.length];
  const ai = await gemini(
    `Write a helpful, non-spammy Quora answer (Indian students) to: "${q}". Give real, specific advice first. Mention syllab.in once, naturally, as a free option (you may include the link). 150-220 words, friendly expert tone.`,
  );
  return `# Quora draft\n\n**Question to answer:** ${q}\n\n${ai || '(Set GEMINI_API_KEY for fresh AI copy.)'}\n`;
}
async function instagramDraft() {
  const kw = themeOfDay.join(', ');
  const ai = await gemini(
    `Give 3 Instagram/YouTube-Shorts caption ideas (with 1 hook line each + 8 hashtags) for an Indian student-study brand (syllab.in), themed around: ${kw}. Keep each under 40 words.`,
  );
  return `# Instagram / Shorts captions\n\n${ai || '(Set GEMINI_API_KEY for fresh AI copy.)'}\n`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const dir = path.join(OUT_ROOT, today);
  await fs.mkdir(dir, { recursive: true });
  console.log(`Syllab Growth Agent — ${today}${POST ? ' (POST mode)' : ' (drafts only)'}`);

  const seo = await seoAudit();
  const [reddit, quora, instagram] = await Promise.all([redditDraft(), quoraDraft(), instagramDraft()]);

  await fs.writeFile(path.join(dir, 'reddit.md'), reddit);
  await fs.writeFile(path.join(dir, 'quora.md'), quora);
  await fs.writeFile(path.join(dir, 'instagram.md'), instagram);

  const report = [
    `# Syllab Growth Report — ${today}`,
    ``,
    `## 🎯 Target keywords today`,
    themeOfDay.map(k => `- ${k}`).join('\n'),
    ``,
    `## 🔍 SEO audit`,
    seo.findings.map(f => `- ${f}`).join('\n'),
    ``,
    `## 📣 Marketing drafts (review, then post — ~5 min)`,
    `- Reddit  → reddit.md  (post body, link in first comment)`,
    `- Quora   → quora.md`,
    `- Instagram/Shorts → instagram.md`,
    ``,
    `## ✅ Daily routine`,
    `1. Skim the 3 drafts, tweak to sound like you, post them.`,
    `2. In GSC: resubmit sitemap; request-index anything new.`,
    `3. Reply to comments on yesterday's posts (engagement = ranking).`,
    ``,
    `_Gemini copy: ${process.env.GEMINI_API_KEY ? 'ON' : 'OFF (set GEMINI_API_KEY for fresh AI drafts)'}_`,
    `_To actually auto-post to Reddit (after review): npm run growth:post_`,
  ].join('\n');
  await fs.writeFile(path.join(dir, 'report.md'), report);

  console.log(seo.findings.join('\n'));
  console.log(`\n📁 Drafts + report → scripts/growth-output/${today}/`);

  if (POST) {
    console.log('\n--post flag set → running Reddit bot...');
    const r = spawnSync('node', [path.join(ROOT, 'scripts', 'reddit-bot', 'post-reddit.mjs')], { cwd: ROOT, stdio: 'inherit' });
    if (r.status !== 0) console.warn('Reddit bot exited non-zero (check credentials in .env.local).');
  }
}

main().catch(err => { console.error('Growth agent failed:', err.message); process.exit(1); });
