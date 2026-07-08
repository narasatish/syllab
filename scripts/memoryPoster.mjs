/**
 * memoryPoster.mjs — builds a printable, shareable "Science Memory Tricks"
 * cheat-sheet from the visual lessons' memory hooks (a deliberate linkable /
 * WhatsApp-shareable asset). Called from generate-prerender.mjs with the full
 * lesson data; writes dist/posters/science-memory-tricks.html (served directly
 * by Firebase Hosting). Complements the formula posters in public/posters/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SITE = 'https://syllab.in';
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SUBJECT_ORDER = ['Physics', 'Chemistry', 'Biology', 'Science'];

export function buildMemoryPosterHtml(lessons) {
  const withHook = (lessons || []).filter((l) => l && l.title && l.memoryHook);
  // Group by subject, in a sensible order.
  const groups = {};
  for (const l of withHook) (groups[l.subject] ||= []).push(l);
  const orderedSubjects = [
    ...SUBJECT_ORDER.filter((s) => groups[s]),
    ...Object.keys(groups).filter((s) => !SUBJECT_ORDER.includes(s)),
  ];
  const total = withHook.length;
  const url = `${SITE}/posters/science-memory-tricks.html`;

  const cards = orderedSubjects.map((sub) => `
    <section class="grp">
      <h2>${esc(sub)}</h2>
      ${groups[sub].map((l) => `
        <div class="row">
          <p class="t">${esc(l.title)}</p>
          <p class="h">${esc(l.memoryHook)}</p>
        </div>`).join('')}
    </section>`).join('');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CBSE Science Memory Tricks — ${total} Mnemonics on One Page (Free Printable) | Syllab.in</title>
<meta name="description" content="Free printable cheat-sheet of ${total} science memory tricks &amp; mnemonics for CBSE/NCERT Class 6–10 — photosynthesis, the human heart, chemical reactions, the eye and more. Print it, share it on WhatsApp, remember it.">
<link rel="canonical" href="${url}">
<meta property="og:title" content="CBSE Science Memory Tricks — ${total} Mnemonics, Free Printable">
<meta property="og:description" content="Every tricky science concept with a memory hook, on one shareable page. Free for classrooms and WhatsApp study groups.">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:url" content="${url}">
<meta name="robots" content="index,follow,max-snippet:-1">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'LearningResource',
  name: `CBSE Science Memory Tricks — ${total} Mnemonics`,
  description: 'Printable cheat-sheet of science mnemonics and memory hooks for CBSE/NCERT students, free to share.',
  educationalLevel: 'Class 6–10', inLanguage: 'en-IN', isAccessibleForFree: true,
  learningResourceType: 'Poster', url,
  provider: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
})}</script>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI',system-ui,-apple-system,sans-serif; background:#f1f5f9; color:#0f172a; line-height:1.4; }
  .toolbar { position:sticky; top:0; background:#7c3aed; color:#fff; padding:10px 16px; display:flex; align-items:center; gap:12px; flex-wrap:wrap; z-index:5; }
  .toolbar strong { font-size:15px; }
  .toolbar .sp { flex:1; }
  .toolbar button, .toolbar a.btn { background:#fff; color:#6d28d9; border:0; border-radius:8px; padding:8px 16px; font-weight:800; font-size:14px; cursor:pointer; text-decoration:none; }
  .page { max-width:210mm; margin:0 auto; background:#fff; padding:10mm 9mm; }
  header.head { text-align:center; border-bottom:3px solid #7c3aed; padding-bottom:6px; margin-bottom:10px; }
  header.head h1 { font-size:22px; color:#5b21b6; }
  header.head p { font-size:11.5px; color:#475569; margin-top:3px; }
  .grid { columns:2; column-gap:9px; }
  .grp { break-inside:avoid; border:1.5px solid #ede9fe; border-radius:8px; padding:7px 9px; margin-bottom:8px; }
  .grp h2 { font-size:13px; background:#f5f3ff; color:#5b21b6; margin:-7px -9px 6px; padding:5px 9px; border-radius:6px 6px 0 0; border-bottom:1.5px solid #ede9fe; }
  .row { margin-bottom:6px; break-inside:avoid; }
  .row .t { font-size:11px; font-weight:800; color:#334155; }
  .row .h { font-size:10.5px; color:#0f172a; }
  footer.foot { margin-top:8px; padding-top:6px; border-top:2px solid #7c3aed; display:flex; justify-content:space-between; font-size:9.5px; color:#475569; }
  footer.foot b { color:#5b21b6; }
  @media print {
    .toolbar { display:none; }
    body { background:#fff; }
    .page { max-width:none; padding:4mm 5mm; }
    @page { size:A4 portrait; margin:6mm; }
  }
</style>
</head>
<body>
<div class="toolbar">
  <strong>🧠 Free CBSE Science Memory Tricks</strong>
  <span class="sp"></span>
  <button onclick="window.print()">🖨️ Print / Save as PDF</button>
  <a class="btn" href="/visual-learning">Animated lessons →</a>
</div>
<div class="page">
  <header class="head">
    <h1>CBSE Science Memory Tricks — ${total} Mnemonics on One Page</h1>
    <p>One memory hook for every tricky concept. Print it, stick it on the wall, or share it in your WhatsApp study group — then watch the animated lesson to lock it in at syllab.in.</p>
  </header>
  <div class="grid">${cards}</div>
  <footer class="foot">
    <span><b>syllab.in</b> — free NCERT notes, visual lessons, mock tests &amp; AI tutor for Class 1–12</span>
    <span>Free to print &amp; share · ${url.replace('https://', '')}</span>
  </footer>
</div>
</body>
</html>
`;
}

export function generateMemoryPoster(ROOT, lessons) {
  const html = buildMemoryPosterHtml(lessons);
  const outDir = path.join(ROOT, 'dist', 'posters');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'science-memory-tricks.html'), html);
  const count = (lessons || []).filter((l) => l && l.memoryHook).length;
  console.log(`🧠 Memory-tricks poster written to dist/posters/science-memory-tricks.html (${count} mnemonics).`);
  return count;
}
