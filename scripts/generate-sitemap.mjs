#!/usr/bin/env node
/**
 * Sitemap generator for syllab.in
 * Outputs public/sitemap.xml with:
 *   • Static page URLs (main tabs)
 *   • Class pages 1-12
 *   • Per-language Skills Lab landing pages
 *   • Every individual topic deep link
 *
 * Run:  node scripts/generate-sitemap.mjs
 * Or:   npm run build:sitemap
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollegesManifest } from './collegesData.mjs';
import { getBlogArticles } from './blogArticles.mjs';
import { getNcertChapters } from './ncertChapters.mjs';
import { getStateBoardChapters } from './stateBoardChapters.mjs';
import { getMedicalManifest } from './medicalColleges.mjs';
import { getAiHubTopics } from './aiHubTopics.mjs';
import { IQ_PILOT } from './iq-pilot.mjs';
import { getDifferences } from './differencesData.mjs';
import { getFullForms, getGlossary, getRevisionNotes, getSamplePapers, getMathsTables, getEnglishWriting, getChapterMcqs, getStaticGk, getEnglishVocab, getEnglishLiterature, getConcepts, getSolvedExamples, getLabPracticals, getVisualLessons, getTimelines, getWhatToStudy, getPyqs, getFormulaSheets } from './studyClusters.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, '..');
const SITE       = process.env.VITE_SITE_URL || 'https://syllab.in';
const OUT        = path.join(ROOT, 'public', 'sitemap.xml');

// ─── Read the tutorials index to discover all topics ─────────────────────────
async function readTopics() {
  const indexPath = path.join(ROOT, 'src', 'data', 'tutorials', 'index.ts');
  const src = await fs.readFile(indexPath, 'utf8');

  // Extract language ids from LANGUAGES array
  const langIds = [];
  const langMatches = src.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/gi);
  for (const m of langMatches) langIds.push(m[1]);

  // De-dupe
  const languages = [...new Set(langIds)];
  // 'ai-agents' topics live in ai-agents.ts but are merged into ai-learning at
  // runtime, so they aren't an id: in index.ts. Add the lang explicitly so its
  // lesson pages (/coding/ai-agents/:topic) are sitemapped (and prerendered) with
  // proper self-canonicals instead of falling back to the homepage canonical.
  if (!languages.includes('ai-agents')) languages.push('ai-agents');

  // For each topic file, read and extract topic ids
  const topicsByLang = {};
  for (const lang of languages) {
    const candidates = [
      `${lang}.ts`,
      `${lang.replace(/-/g, '')}.ts`,
      `${lang.replace(/-/g, 'L')}.ts`, // ai-learning -> aiLearning
    ];
    // Manual map for non-trivial cases
    const fileMap = {
      'ai-learning': 'aiLearning.ts',
      'data-analytics': 'dataAnalytics.ts',
      'app-dev': 'app-dev.ts',
      'game-dev': 'game-dev.ts',
    };
    const filename = fileMap[lang] || `${lang}.ts`;
    const fp = path.join(ROOT, 'src', 'data', 'tutorials', filename);
    try {
      const content = await fs.readFile(fp, 'utf8');
      const ids = [...content.matchAll(/^\s*id:\s*['"]([a-z0-9-]+)['"]/gm)].map(m => m[1]);
      topicsByLang[lang] = ids;
    } catch {
      // Skip missing files (e.g. registered but not yet created)
      topicsByLang[lang] = [];
    }
  }

  return { languages, topicsByLang };
}

// ─── Build the URL list ──────────────────────────────────────────────────────
function buildUrls({ languages, topicsByLang }) {
  const urls = [];

  // Home — top priority
  urls.push({ loc: '/',                    priority: 1.0, changefreq: 'daily' });

  // Main tabs — high (must match TAB_TO_PATH in App.tsx exactly).
  // May 2026 rename: /exams→/mock-tests, /learning-lab→/ai-tutor,
  // /skills-lab→/coding, /english-lab→/english, /progress→/dashboard,
  // /general-knowledge→/gk-quiz. (/3d-lab removed.)
  for (const p of ['/syllabus', '/practice', '/daily-challenges', '/mock-tests', '/gk-quiz',
                   '/ai-tutor', '/coding', '/english', '/updates', '/career-predictor',
                   '/preparation', '/coding-challenges', '/mini-projects']) {
    urls.push({ loc: p, priority: 0.9, changefreq: 'daily' });
  }

  // SEO landing pages — high priority (target high-volume keywords)
  for (const p of ['/coding-for-kids', '/python-for-kids', '/computer-basics',
                   '/cyber-safety', '/ai-for-students', '/web-development']) {
    urls.push({ loc: p, priority: 0.8, changefreq: 'weekly' });
  }

  // Static pages — medium. NOTE: /parent, /profile, /dashboard are private
  // (auth-gated, user-specific) and /sitemap is the in-app HTML sitemap — none
  // are prerendered, so they're intentionally EXCLUDED from the public sitemap
  // (listing them = soft-404s for crawlers).
  for (const p of ['/about', '/contact', '/blog', '/terms', '/privacy']) {
    urls.push({ loc: p, priority: 0.6, changefreq: 'monthly' });
  }

  // Class pages
  for (let c = 1; c <= 12; c++) {
    urls.push({ loc: `/class-${c}`, priority: 0.7, changefreq: 'weekly' });
  }

  // Skills Lab language landings (these are prerendered with unique meta).
  for (const lang of languages) {
    urls.push({ loc: `/coding/${lang}`, priority: 0.7, changefreq: 'weekly' });
  }

  // College directory: index + per-state + per-college (all prerendered).
  const { states: collegeStates, colleges } = getCollegesManifest(ROOT);
  urls.push({ loc: '/colleges', priority: 0.8, changefreq: 'weekly' });
  for (const s of collegeStates) {
    urls.push({ loc: `/colleges/${s.slug}`, priority: 0.7, changefreq: 'weekly' });
  }
  for (const c of colleges) {
    urls.push({ loc: `/colleges/${c.stateSlug}/${c.slug}`, priority: 0.6, changefreq: 'monthly' });
  }
  // City college hubs — "Top Engineering Colleges in {City}" (cities with 2+ colleges).
  const cityCounts = new Map();
  for (const c of colleges) {
    const slug = c.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    cityCounts.set(slug, (cityCounts.get(slug) || 0) + 1);
  }
  for (const [slug, count] of cityCounts) {
    if (count >= 2) urls.push({ loc: `/colleges/city/${slug}`, priority: 0.7, changefreq: 'weekly' });
  }

  // Deep coding topic pages are now PRERENDERED with unique titles + a
  // self-referencing canonical (see generate-prerender.mjs), so they're valid
  // indexable URLs — list them so Google can discover the long-tail.
  for (const lang of languages) {
    for (const topicId of (topicsByLang[lang] || [])) {
      urls.push({ loc: `/coding/${lang}/${topicId}`, priority: 0.5, changefreq: 'monthly' });
    }
  }

  // Live multiplayer quiz landing.
  urls.push({ loc: '/live-quiz', priority: 0.8, changefreq: 'monthly' });

  // Free-alternatives pages (high-intent competitor SEO).
  urls.push({ loc: '/free-alternatives', priority: 0.8, changefreq: 'monthly' });
  for (const s of ['kahoot-alternative', 'byjus-alternative', 'unacademy-alternative', 'vedantu-alternative', 'toppr-alternative']) {
    urls.push({ loc: `/${s}`, priority: 0.7, changefreq: 'monthly' });
  }

  // NCERT solutions: index + each chapter that has solutions.
  urls.push({ loc: '/ncert-solutions', priority: 0.8, changefreq: 'weekly' });
  for (const c of getNcertChapters()) {
    urls.push({ loc: `/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`, priority: 0.6, changefreq: 'monthly' });
  }

  // Photo Doubt-Solver.
  urls.push({ loc: '/doubt-solver', priority: 0.8, changefreq: 'monthly' });

  // AI Study Room.
  urls.push({ loc: '/study-room', priority: 0.8, changefreq: 'monthly' });
  urls.push({ loc: '/quiz-duel', priority: 0.7, changefreq: 'monthly' });
  urls.push({ loc: '/maths-for-kids', priority: 0.8, changefreq: 'monthly' });
  urls.push({ loc: '/science-for-kids', priority: 0.8, changefreq: 'monthly' });
  urls.push({ loc: '/english-for-kids', priority: 0.8, changefreq: 'monthly' });

  // Free student calculators.
  urls.push({ loc: '/calculators', priority: 0.8, changefreq: 'monthly' });

  // Free printable worksheets.
  urls.push({ loc: '/worksheets', priority: 0.8, changefreq: 'weekly' });

  // Story-based learning — index page with all class sections.
  urls.push({ loc: '/story-lessons', priority: 0.9, changefreq: 'weekly' });

  // GK Questions cluster — index + per class (5–12).
  urls.push({ loc: '/gk-questions', priority: 0.8, changefreq: 'weekly' });
  for (let c = 5; c <= 12; c++) {
    urls.push({ loc: `/gk-questions/class-${c}`, priority: 0.7, changefreq: 'monthly' });
  }

  // Important Questions cluster — index + per class + per subject (6–12).
  const IQ = {
    6: ['mathematics', 'science', 'social-science', 'english'], 7: ['mathematics', 'science', 'social-science', 'english'],
    8: ['mathematics', 'science', 'social-science', 'english'], 9: ['mathematics', 'science', 'social-science', 'english'],
    10: ['mathematics', 'science', 'social-science', 'english'], 11: ['physics', 'chemistry', 'biology', 'mathematics'],
    12: ['physics', 'chemistry', 'biology', 'mathematics'],
  };
  urls.push({ loc: '/important-questions', priority: 0.8, changefreq: 'weekly' });
  for (const [c, subs] of Object.entries(IQ)) {
    urls.push({ loc: `/important-questions/class-${c}`, priority: 0.7, changefreq: 'monthly' });
    for (const s of subs) urls.push({ loc: `/important-questions/class-${c}/${s}`, priority: 0.6, changefreq: 'monthly' });
  }
  // Chapter-level important-questions PILOT (substantive pages; see scripts/iq-pilot.mjs).
  for (const ch of IQ_PILOT) {
    urls.push({ loc: `/important-questions/class-${ch.cls}/${ch.subjSlug}/${ch.chapSlug}`, priority: 0.6, changefreq: 'monthly' });
  }

  // Mock-test exam landing pages
  for (const slug of ['jee-main', 'neet', 'ap-eapcet', 'ts-eapcet', 'bitsat', 'kcet', 'mht-cet', 'wbjee', 'science-olympiad', 'maths-olympiad']) {
    urls.push({ loc: `/mock-tests/${slug}`, priority: 0.7, changefreq: 'monthly' });
  }
  // English grammar topic pages
  urls.push({ loc: '/english-grammar', priority: 0.7, changefreq: 'monthly' });
  for (const slug of ['tenses', 'parts-of-speech', 'nouns', 'pronouns', 'verbs', 'adjectives', 'adverbs', 'articles', 'prepositions', 'active-passive-voice', 'direct-indirect-speech', 'subject-verb-agreement', 'essay-writing', 'letter-writing', 'reading-comprehension']) {
    urls.push({ loc: `/english-grammar/${slug}`, priority: 0.6, changefreq: 'monthly' });
  }
  // Career guide pages
  urls.push({ loc: '/career', priority: 0.7, changefreq: 'monthly' });
  for (const slug of ['which-stream-after-10th', 'which-stream-after-12th', 'how-to-become-engineer', 'how-to-become-doctor', 'how-to-become-data-scientist', 'how-to-become-software-engineer', 'how-to-become-chartered-accountant', 'how-to-become-lawyer', 'how-to-become-ias-officer', 'careers-after-12th-commerce', 'careers-after-12th-arts', 'careers-after-12th-science']) {
    urls.push({ loc: `/career/${slug}`, priority: 0.6, changefreq: 'monthly' });
  }
  // College predictor landing pages
  urls.push({ loc: '/college-predictor', priority: 0.8, changefreq: 'weekly' });
  for (const slug of ['jee-main', 'neet', 'ts-eapcet', 'ap-eapcet', 'kcet', 'mht-cet', 'wbjee', 'bitsat']) {
    urls.push({ loc: `/college-predictor/${slug}`, priority: 0.7, changefreq: 'monthly' });
  }
  // Previous Year Questions (PYQ) & Sample Papers cluster
  urls.push({ loc: '/previous-year-papers', priority: 0.8, changefreq: 'monthly' });
  for (const slug of ['cbse-class-10', 'cbse-class-12', 'jee-main', 'neet', 'ts-eamcet', 'ap-eamcet', 'cbse-class-9', 'kcet', 'mht-cet', 'wbjee', 'bitsat', 'cuet']) {
    urls.push({ loc: `/previous-year-papers/${slug}`, priority: 0.7, changefreq: 'monthly' });
  }
  // Formula Sheets cluster (free PDF revision assets) — subject + per-chapter sheets
  urls.push({ loc: '/formula-sheets', priority: 0.8, changefreq: 'monthly' });
  for (const s of getFormulaSheets(ROOT)) {
    urls.push({ loc: `/formula-sheets/${s.slug}`, priority: 0.7, changefreq: 'monthly' });
  }
  // State Board Solutions (AP / TS / Karnataka / Maharashtra)
  urls.push({ loc: '/state-board-solutions', priority: 0.8, changefreq: 'weekly' });
  for (const c of getStateBoardChapters()) {
    urls.push({ loc: `/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`, priority: 0.6, changefreq: 'monthly' });
  }
  // Medical / MBBS colleges
  const med = getMedicalManifest(ROOT);
  urls.push({ loc: '/medical-colleges', priority: 0.8, changefreq: 'weekly' });
  for (const s of med.states) {
    if (med.colleges.some((c) => c.stateSlug === s.slug)) urls.push({ loc: `/medical-colleges/${s.slug}`, priority: 0.7, changefreq: 'weekly' });
  }
  for (const c of med.colleges) {
    urls.push({ loc: `/medical-colleges/${c.stateSlug}/${c.slug}`, priority: 0.6, changefreq: 'monthly' });
  }
  // College Finder — colleges-accepting/<exam> + best-colleges/<course>
  urls.push({ loc: '/colleges-accepting', priority: 0.7, changefreq: 'weekly' });
  for (const slug of ['jee-main', 'jee-advanced', 'neet', 'bitsat', 'viteee', 'tnea', 'kcet', 'comedk', 'mht-cet', 'ts-eapcet', 'ap-eapcet', 'wbjee']) {
    urls.push({ loc: `/colleges-accepting/${slug}`, priority: 0.7, changefreq: 'monthly' });
  }
  urls.push({ loc: '/best-colleges', priority: 0.7, changefreq: 'weekly' });
  for (const slug of ['cse', 'ai-ml', 'ece', 'it', 'electrical', 'mechanical', 'civil', 'mbbs']) {
    urls.push({ loc: `/best-colleges/${slug}`, priority: 0.7, changefreq: 'monthly' });
  }
  // Scholarships
  urls.push({ loc: '/scholarships', priority: 0.8, changefreq: 'weekly' });
  // Embed / link-to-us
  urls.push({ loc: '/embed', priority: 0.5, changefreq: 'monthly' });
  // AI Hub ("AI for Students" guides)
  urls.push({ loc: '/ai-hub', priority: 0.8, changefreq: 'weekly' });
  for (const t of getAiHubTopics(ROOT)) {
    urls.push({ loc: `/ai-hub/${t.slug}`, priority: 0.7, changefreq: 'monthly' });
  }

  // Difference Between (comparison) cluster — marked noindex (thin content).
  // Index only hub, not individual comparison pages.
  urls.push({ loc: '/difference-between', priority: 0.8, changefreq: 'weekly' });

  // Full Forms cluster — marked noindex (thin content: 1–2 sentence definitions with
  // minimal unique value). These are SEO-scaled templates that drag domain quality.
  // Index only the hub, not individual forms.
  urls.push({ loc: '/full-forms', priority: 0.8, changefreq: 'weekly' });
  // Individual full form pages are omitted to avoid thin-content penalty

  // Glossary cluster — marked noindex (thin content). Index only hub.
  urls.push({ loc: '/glossary', priority: 0.8, changefreq: 'weekly' });
  // Individual glossary term pages are omitted to avoid thin-content penalty

  // Revision Notes cluster
  urls.push({ loc: '/revision-notes', priority: 0.8, changefreq: 'weekly' });
  for (const r of getRevisionNotes(ROOT)) {
    urls.push({ loc: `/revision-notes/${r.slug}`, priority: 0.7, changefreq: 'monthly' });
  }

  // Sample Papers cluster
  urls.push({ loc: '/sample-papers', priority: 0.8, changefreq: 'weekly' });
  for (const p of getSamplePapers(ROOT)) {
    urls.push({ loc: `/sample-papers/${p.slug}`, priority: 0.7, changefreq: 'monthly' });
  }

  // New study clusters (maths tables, writing, mcqs, gk, vocab, literature)
  for (const [base, fn] of [['/maths-tables', getMathsTables], ['/english-writing', getEnglishWriting], ['/mcqs', getChapterMcqs], ['/gk-facts', getStaticGk], ['/vocabulary', getEnglishVocab], ['/english-literature', getEnglishLiterature], ['/concepts', getConcepts], ['/solved-examples', getSolvedExamples], ['/lab-practicals', getLabPracticals], ['/visual-learning', getVisualLessons], ['/timelines', getTimelines], ['/what-to-study', getWhatToStudy], ['/pyqs', getPyqs]]) {
    urls.push({ loc: base, priority: 0.8, changefreq: 'weekly' });
    for (const x of fn(ROOT)) urls.push({ loc: `${base}/${x.slug}`, priority: 0.7, changefreq: 'monthly' });
  }

  // Microlearning index + modules.
  urls.push({ loc: '/micro', priority: 0.8, changefreq: 'weekly' });
  for (const m of ['quadratic-formula','newtons-first-law','trigonometry-ratios','photosynthesis','periodic-table-trends','probability-basics','linear-equations','surface-area-volume','acids-bases','fractions-decimals','imperialism-colonialism','plate-tectonics','english-tenses','photosynthesis-respiration','mean-median-mode']) {
    urls.push({ loc: `/micro/${m}`, priority: 0.6, changefreq: 'monthly' });
  }

  // Kids / Pre-school section.
  urls.push({ loc: '/kids', priority: 0.8, changefreq: 'weekly' });
  for (const s of ['alphabet', 'numbers', 'shapes', 'rhymes', 'coloring', 'stories', 'action-rhymes', 'games']) {
    urls.push({ loc: `/kids/${s}`, priority: 0.7, changefreq: 'monthly' });
  }
  // Junior "learn by tapping" picture topics.
  for (const t of ['animals', 'birds', 'fruits', 'vegetables', 'body', 'colours', 'opposites', 'transport', 'helpers', 'habits',
    'wild', 'water', 'insects', 'flowers', 'family', 'days', 'seasons', 'national', 'festivals',
    'hindi-swar', 'hindi-vyanjan', 'hindi-numbers', 'tamil-vowels', 'telugu-vowels', 'kannada-vowels',
    'tamil-consonants', 'telugu-consonants', 'kannada-consonants']) {
    urls.push({ loc: `/kids/learn/${t}`, priority: 0.6, changefreq: 'monthly' });
  }

  // Blog: the canonical /updates page + each article as its own indexable URL.
  urls.push({ loc: '/updates', priority: 0.7, changefreq: 'daily' });
  for (const a of getBlogArticles()) {
    urls.push({ loc: `/updates/${a.slug}`, priority: 0.6, changefreq: 'weekly' });
  }

  // De-duplicate by loc — a topic id can appear under more than one language
  // list, which previously produced duplicate <url> entries.
  const deduped = [];
  const seenLoc = new Set();
  for (const u of urls) {
    if (seenLoc.has(u.loc)) continue;
    seenLoc.add(u.loc);
    deduped.push(u);
  }
  return deduped;
}

// ─── Parse existing sitemap to preserve lastmod dates ───────────────────────
async function readExistingSitemapDates() {
  const dateMap = {};
  try {
    const content = await fs.readFile(OUT, 'utf8');
    const locMatches = content.matchAll(/<loc>https:\/\/syllab\.in([^<]+)<\/loc>\s*\n\s*<lastmod>([^<]+)<\/lastmod>/g);
    for (const m of locMatches) {
      dateMap[m[1]] = m[2];
    }
  } catch {
    // File doesn't exist yet (first run) — dateMap stays empty
  }
  return dateMap;
}

// ─── XML serialization ───────────────────────────────────────────────────────
function toXml(urls, existingDates = {}) {
  const today = new Date().toISOString().split('T')[0];
  const items = urls.map(u => {
    // Reuse previous lastmod if the URL already existed; only use today for new URLs
    const lastmod = existingDates[u.loc] || today;
    return (
      `  <url>\n` +
      `    <loc>${SITE}${u.loc}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority.toFixed(1)}</priority>\n` +
      `  </url>`
    );
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────
async function main() {
  const data = await readTopics();
  const urls = buildUrls(data);
  const existingDates = await readExistingSitemapDates();
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, toXml(urls, existingDates), 'utf8');
  console.log(`✅ Sitemap written: ${OUT}`);
  console.log(`   ${urls.length} URLs across ${data.languages.length} languages`);
}

main().catch(err => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
