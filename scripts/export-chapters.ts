/**
 * export-chapters.ts — dumps the full Class 1–12 chapter list (all boards +
 * subjects) to docs/CHAPTER-LIST.md so PPTs can be authored against exact names.
 * Run: npx tsx scripts/export-chapters.ts
 */
import { writeFileSync, mkdirSync } from 'fs';
import { SYLLABUS } from '../src/data/syllabus';

const byBoard: Record<string, Record<string, Record<string, string[]>>> = {};
for (const c of SYLLABUS) {
  const board = c.board || 'CBSE';
  const cls = `Class ${c.classLevel}`;
  byBoard[board] ??= {};
  byBoard[board][cls] ??= {};
  byBoard[board][cls][c.subject] ??= [];
  byBoard[board][cls][c.subject].push(c.title);
}

const classOrder = (k: string) => parseInt(k.replace('Class ', ''), 10);
let out = `# Syllab — Full Chapter List (for PPT authoring)\n\nGenerated from the app syllabus. Total chapters: ${SYLLABUS.length}\n`;
let total = 0;

for (const board of Object.keys(byBoard).sort()) {
  out += `\n\n## Board: ${board}\n`;
  const classes = Object.keys(byBoard[board]).sort((a, b) => classOrder(a) - classOrder(b));
  for (const cls of classes) {
    out += `\n### ${cls}\n`;
    for (const subject of Object.keys(byBoard[board][cls]).sort()) {
      const chapters = byBoard[board][cls][subject];
      out += `\n**${subject}** (${chapters.length})\n`;
      chapters.forEach((t, i) => { out += `${i + 1}. ${t}\n`; total++; });
    }
  }
}

mkdirSync('docs', { recursive: true });
writeFileSync('docs/CHAPTER-LIST.md', out, 'utf8');
console.log(`Wrote docs/CHAPTER-LIST.md — ${total} chapters across ${Object.keys(byBoard).length} boards.`);

// Also print a compact per-class-count summary
for (const board of Object.keys(byBoard).sort()) {
  for (const cls of Object.keys(byBoard[board]).sort((a, b) => classOrder(a) - classOrder(b))) {
    const n = Object.values(byBoard[board][cls]).reduce((s, a) => s + a.length, 0);
    console.log(`${board} · ${cls}: ${n} chapters`);
  }
}
