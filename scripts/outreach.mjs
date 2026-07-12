#!/usr/bin/env node
/**
 * Backlink-outreach helper. Generates a prioritised TARGET LIST + ready-to-send,
 * personalised email/DM templates for earning quality edu backlinks the legit way
 * (free-resource pages, teacher blogs, directories). It does NOT send anything —
 * link building must be done by a human, one genuine relationship at a time.
 *
 * Run:  node scripts/outreach.mjs           → writes docs/outreach-pack.md
 * The research is clear: schools/teachers link to genuinely useful FREE tools.
 * Syllab already has them (worksheets, calculators, Study Room, NCERT solutions) —
 * this pack helps you pitch those assets.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://syllab.in';

// The link-worthy free assets we pitch (the "ask for a link" hooks).
const ASSETS = [
  { name: '200+ free printable worksheets', url: `${SITE}/worksheets`, hook: 'no signup, watermarked PDFs across 12 categories' },
  { name: 'free student calculators (CGPA, %, attendance)', url: `${SITE}/calculators`, hook: 'instant, mobile-friendly, free' },
  { name: 'AI Study Room (focus timer + flashcards)', url: `${SITE}/study-room`, hook: 'free Pomodoro + AI flashcards that track weak chapters' },
  { name: 'free NCERT solutions', url: `${SITE}/ncert-solutions`, hook: 'chapter-wise, CBSE-aligned, free' },
  { name: 'Syllab Junior (free preschool learning)', url: `${SITE}/kids`, hook: 'rhymes, stories, games, worksheets — Pre-KG to Class 3' },
];

// Target categories (search operators to FIND prospects — run these in Google).
const TARGETS = [
  { type: 'School resource pages', query: 'site:.edu.in "useful links" OR "resources for students"', why: 'Schools list free study resources — perfect for a worksheets/NCERT link.' },
  { type: 'Teacher / parenting blogs (India)', query: '"free worksheets" OR "free study resources" india blog -site:syllab.in', why: 'Bloggers happily link to free printables and tools.' },
  { type: '"Best free study apps/sites" listicles', query: 'intitle:"best free" (study OR learning OR ncert) sites OR apps students india', why: 'Ask to be added to existing listicles (easy wins).' },
  { type: 'Free educational tool directories', query: 'free educational tools directory submit OR "add your tool"', why: 'Self-serve listings = fast backlinks.' },
  { type: 'Coaching / tuition centre sites', query: '"recommended resources" OR "helpful links" tuition OR coaching india', why: 'They link to free practice/worksheets for their students.' },
  { type: 'Reddit / Quora / communities', query: 'site:reddit.com OR site:quora.com free ncert solutions OR worksheets india', why: 'Answer real questions and cite the relevant free page (no spam).' },
];

function emailTemplate(asset) {
  return [
    `Subject: A free resource your students might like — ${asset.name}`,
    ``,
    `Hi {{name}},`,
    ``,
    `I run Syllab.in, a free learning platform for Indian students (Class 1–12). I noticed your {{page}} lists helpful resources for students/parents.`,
    ``,
    `We've made ${asset.name} completely free (${asset.hook}) — no login, no payment: ${asset.url}`,
    ``,
    `If you think it'd help your readers, a mention or link would mean a lot. Either way, happy to send a custom worksheet pack for your class/subject — just say the word.`,
    ``,
    `Thanks for the great work you do,`,
    `{{your name}} · Syllab.in`,
  ].join('\n');
}

async function main() {
  const lines = [];
  lines.push(`# Syllab.in — Backlink Outreach Pack`);
  lines.push(`_Generated helper. Find prospects with the queries below, then personalise a template. Build relationships, never spam._\n`);

  lines.push(`## 1. Link-worthy free assets (your pitch hooks)`);
  for (const a of ASSETS) lines.push(`- **${a.name}** — ${a.url}  \n  _${a.hook}_`);
  lines.push('');

  lines.push(`## 2. Where to find backlink prospects (run in Google)`);
  for (const t of TARGETS) {
    lines.push(`### ${t.type}`);
    lines.push('```');
    lines.push(t.query);
    lines.push('```');
    lines.push(`_Why:_ ${t.why}\n`);
  }

  lines.push(`## 3. Email / DM templates (one per asset)`);
  for (const a of ASSETS) {
    lines.push(`<details><summary>Pitch: ${a.name}</summary>\n`);
    lines.push('```');
    lines.push(emailTemplate(a));
    lines.push('```');
    lines.push(`</details>\n`);
  }

  lines.push(`## 4. High-authority freebies to do this month`);
  lines.push(`- Submit to: Product Hunt, AlternativeTo, Saashub, free-tools directories.`);
  lines.push(`- Post genuinely-helpful answers on Reddit (r/CBSE, r/JEE, r/Indian_Academia), Quora — cite the exact free page.`);
  lines.push(`- Create a small **scholarship/contest page** → pitch to school & college resource pages (proven .edu link tactic).`);
  lines.push(`- Offer teacher creators (YouTube/Insta) a free custom worksheet pack in exchange for an honest feature.`);

  const outDir = path.join(ROOT, 'docs');
  await fs.mkdir(outDir, { recursive: true });
  const out = path.join(outDir, 'outreach-pack.md');
  await fs.writeFile(out, lines.join('\n'), 'utf8');
  console.log(`✅ Outreach pack written: ${out}`);
  console.log(`   ${ASSETS.length} assets · ${TARGETS.length} prospect sources · ${ASSETS.length} templates`);
}

main();
