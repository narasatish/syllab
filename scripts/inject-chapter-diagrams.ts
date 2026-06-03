/**
 * inject-chapter-diagrams.ts
 *
 * Some science decks (Bio/Physics/Chemistry/Science) had ZERO real images —
 * every slide fell back to an emoji because slide-level diagram matching missed.
 * This deterministically injects ONE verified diagram (from the 180-image
 * library, class + subject matched against the chapter title) into the first
 * emoji slide of each such deck. The original emoji is preserved as the
 * data-fb fallback, so if the image ever 404s the slide degrades gracefully.
 *
 * No Gemini calls — the existing slide text is untouched. Run:
 *   npx tsx scripts/inject-chapter-diagrams.ts          (apply)
 *   npx tsx scripts/inject-chapter-diagrams.ts --dry     (report only)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pickChapterDiagram } from '../src/lib/lessonImages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DECKS = path.join(ROOT, 'public', 'generated-decks');
const DRY = process.argv.includes('--dry');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SUBJECTS = ['Science', 'Physics', 'Chemistry', 'Biology'];

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(fp));
    else if (e.name.endsWith('.html')) out.push(fp);
  }
  return out;
}

/** Derive {classLevel, subject, chapter} from the deck path:
 *  …/generated-decks/<Board>/Class <N>/<Subject>/<Chapter_File>.html */
function meta(fp: string) {
  const parts = fp.split(path.sep);
  const i = parts.lastIndexOf('generated-decks');
  const subject = parts[i + 3];
  const clsMatch = (parts[i + 2] || '').match(/Class\s*(\d+)/i);
  const classLevel = clsMatch ? clsMatch[1] : '10';
  const chapter = path.basename(fp, '.html').replace(/_/g, ' ').trim();
  return { subject, classLevel, chapter };
}

async function main() {
  const files = (await walk(DECKS)).filter((f) => {
    const parts = f.split(path.sep);
    return SUBJECTS.some((s) => parts.includes(s));
  });

  let injected = 0, skippedHasImg = 0, noDiagram = 0;
  const noDiagramList: string[] = [];

  for (const fp of files) {
    let html = await fs.readFile(fp, 'utf8');
    if (html.includes('class="rimg"')) { skippedHasImg++; continue; } // already has a real image

    const { subject, classLevel, chapter } = meta(fp);
    const dia = pickChapterDiagram(chapter, classLevel, subject);
    if (!dia) { noDiagram++; noDiagramList.push(`C${classLevel} ${subject} — ${chapter}`); continue; }

    // Replace the FIRST emoji visual box with a real-image box (emoji kept as fallback).
    const boxRe = /<div class="vbox dashed"><div class="bigicon">([\s\S]*?)<\/div>(?:<div class="vcap">([\s\S]*?)<\/div>)?<\/div>/;
    const m = html.match(boxRe);
    if (!m) { noDiagram++; noDiagramList.push(`C${classLevel} ${subject} — ${chapter} (no emoji box)`); continue; }

    const emoji = m[1];
    const caption = dia.caption || dia.alt || m[2] || '';
    const imgBox =
      `<div class="vbox imgbox"><img class="rimg" src="${esc(dia.url)}" data-fb="${esc(emoji)}" ` +
      `alt="${esc(dia.alt || caption)}" loading="lazy" onerror="syllabImgFail(this)"/>` +
      `${caption ? `<div class="vcap">${esc(caption)}</div>` : ''}</div>`;

    html = html.replace(boxRe, imgBox);
    if (!DRY) await fs.writeFile(fp, html, 'utf8');
    injected++;
    console.log(`✓ ${DRY ? '[dry] ' : ''}C${classLevel} ${subject} — ${chapter}  →  ${dia.alt}`);
  }

  console.log(`\n— ${injected} decks ${DRY ? 'WOULD GET' : 'got'} a real diagram; ${skippedHasImg} already had images; ${noDiagram} had no matching diagram.`);
  if (noDiagramList.length) console.log('No diagram (non-diagram topics, left as emoji):\n  ' + noDiagramList.join('\n  '));
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
