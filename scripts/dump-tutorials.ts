/**
 * dump-tutorials.ts — export the coding-course content for the prerenderer.
 *
 * WHY THIS EXISTS
 * /coding is 908 URLs — a quarter of the sitemap — and a thin-content audit
 * measured its crawl-time content at a median of 236 words, most of which is
 * the boot skeleton's inline CSS. Not because the content is missing: the
 * tutorial data is megabytes (aiLearning.ts alone is 258 KB). The prerenderer
 * simply had no body generator for these routes, so every one of the 908 pages
 * shipped a title, a meta description and nothing else.
 *
 * Post-March-2026 that profile is a domain-level liability: a large cluster of
 * near-empty pages drags down the pages that are genuinely good (this site's
 * /ncert-solutions pages carry ~835 words).
 *
 * WHY A DUMP STEP rather than parsing the .ts files
 * studyClusters.mjs reads data with readArray(), which slices between a marker
 * and "\n];" and then JSON.parses. That works for the generated data files, but
 * the tutorial modules are hand-written TypeScript: single-quoted strings,
 * unquoted keys, backticked code samples full of braces and brackets. Parsing
 * them textually would be guesswork. Importing them through tsx uses the app's
 * OWN loaders, so the prerendered page cannot drift from what the app renders.
 *
 *   npx tsx scripts/dump-tutorials.ts
 *   -> writes .cache/tutorials.json (gitignored; regenerated every build)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGUAGES, loadLanguageTopics } from '../src/data/tutorials/index';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '.cache', 'tutorials.json');

interface DumpTopic {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  theory: string[];
  syntax: string;
  keyPoints: string[];
}

interface DumpLanguage {
  id: string;
  name: string;
  description: string;
  topics: DumpTopic[];
  roles: string[];
  avgSalary: string;
  topCompanies: string[];
  nextSkills: string[];
  tip: string;
}

function asStrings(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0);
  if (typeof v === 'string' && v.trim()) return [v];
  return [];
}

async function main() {
  const out: DumpLanguage[] = [];
  let totalTopics = 0;
  let totalWords = 0;

  for (const lang of LANGUAGES) {
    const raw = await loadLanguageTopics(lang.id);
    const topics: DumpTopic[] = (raw ?? []).map((t) => {
      const rec = t as unknown as Record<string, unknown>;
      return {
        id: String(rec.id ?? ''),
        title: String(rec.title ?? ''),
        category: String(rec.category ?? ''),
        difficulty: String(rec.difficulty ?? ''),
        theory: asStrings(rec.theory),
        syntax: typeof rec.syntax === 'string' ? rec.syntax : '',
        keyPoints: asStrings(rec.keyPoints ?? rec.points ?? rec.takeaways),
      };
    }).filter((t) => t.id && t.title);

    const guide = (lang as unknown as Record<string, unknown>).careerGuide as Record<string, unknown> | undefined;
    out.push({
      id: lang.id,
      name: lang.name,
      description: String((lang as unknown as Record<string, unknown>).description ?? ''),
      topics,
      roles: asStrings(guide?.roles),
      avgSalary: String(guide?.avgSalary ?? ''),
      topCompanies: asStrings(guide?.topCompanies),
      nextSkills: asStrings(guide?.nextSkills),
      tip: String(guide?.tip ?? ''),
    });

    totalTopics += topics.length;
    totalWords += topics.reduce((n, t) => n + t.theory.join(' ').split(/\s+/).length, 0);
    process.stdout.write(`  ${lang.id.padEnd(20)} ${String(topics.length).padStart(4)} topics\n`);
  }

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(out), 'utf8');

  const bytes = (await fs.stat(OUT)).size;
  console.log(`\n${out.length} languages, ${totalTopics} topics, ~${totalWords.toLocaleString()} words of theory`);
  console.log(`written to .cache/tutorials.json (${(bytes / 1024).toFixed(0)} KB)`);

  if (totalTopics === 0) {
    console.error('\nNo topics loaded — the prerenderer would silently emit empty bodies. Failing.');
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
