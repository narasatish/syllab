/**
 * printPdf.ts — lightweight PDF export via window.print() + new window
 * Reuses the pattern from WebSlideViewer.tsx for consistency.
 * Opens formatted HTML in a new window, adds syllab.in watermark via CSS,
 * and triggers browser's save-as-PDF dialog.
 */

export interface ExportOptions {
  title: string;
  classLevel?: string | number;
  subject?: string;
  items: Array<{
    number: number;
    question: string;
    solution: string;
  }>;
}

export interface ArticleSection {
  heading?: string;
  /** Plain text; newlines become line breaks. May include simple bullet lines ("• …"). */
  body: string;
}

/**
 * Generic chapter/article → PDF export (Revision Notes, Solved Examples, Lab
 * Practicals, Concepts…). Same look as exportNcertChapterAsPDF: cover page,
 * section headings, syllab.in watermark, auto "Save as PDF".
 */
export function exportArticleAsPDF(opts: { title: string; subtitle?: string; sections: ArticleSection[] }) {
  const w = window.open('', '_blank', 'width=900,height=1200,scrollbars=yes,resizable=yes');
  if (!w) {
    alert('Popup was blocked. Please allow popups for this site, then try again.');
    return;
  }
  const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = (s: string) => esc(s).replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  const sectionsHtml = opts.sections
    .filter((s) => s && (s.heading || s.body))
    .map((s) => `
      <div class="block">
        ${s.heading ? `<h3 class="heading">${esc(s.heading)}</h3>` : ''}
        ${s.body ? `<div class="body">${fmt(s.body)}</div>` : ''}
      </div>`)
    .join('');

  w.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${esc(opts.title)} — Syllab</title>
<script>
  function triggerPrint(){ try { window.focus(); window.print(); } catch(e){} }
  if (document.readyState === 'complete') { setTimeout(triggerPrint, 1200); }
  else { window.addEventListener('load', function(){ if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function(){ setTimeout(triggerPrint, 600); }); } else { setTimeout(triggerPrint, 1500); } }); }
</script>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; margin: 0; color: #0f172a; line-height: 1.6; }
  .toolbar { position: sticky; top: 0; background: #0f172a; color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 100; gap: 16px; flex-wrap: wrap; }
  .toolbar-title { font-weight: 900; font-size: 14px; }
  .toolbar button { background: #10b981; color: white; border: 0; padding: 10px 20px; border-radius: 10px; font-weight: 900; cursor: pointer; font-size: 14px; }
  .toolbar button:hover { background: #059669; }
  .toolbar-tip { font-size: 11px; opacity: 0.7; }
  .cover { max-width: 820px; margin: 0 auto; padding: 60px 40px 40px; text-align: center; background: white; page-break-after: always; }
  .cover h1 { font-size: 2.5rem; font-weight: 900; margin: 0 0 10px; color: #064e3b; }
  .cover p { color: #64748b; font-weight: 600; margin: 4px 0; }
  .cover .brand { margin-top: 30px; font-weight: 900; color: #059669; letter-spacing: 2px; }
  .content { max-width: 820px; margin: 0 auto; background: white; padding: 40px; }
  .block { margin-bottom: 26px; page-break-inside: avoid; }
  .heading { font-size: 1.05rem; font-weight: 900; margin: 0 0 8px; color: #065f46; border-bottom: 2px solid #d1fae5; padding-bottom: 4px; }
  .body { font-size: 0.95rem; color: #334155; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word; }
  .watermark { position: fixed; bottom: 40px; right: 40px; font-size: 11px; font-weight: 900; color: rgba(5,150,105,0.4); letter-spacing: 2px; text-transform: uppercase; pointer-events: none; }
  @media print { .toolbar { display: none; } body { background: white; } .block { page-break-inside: avoid; } }
</style>
</head><body>
<div class="toolbar">
  <span class="toolbar-title">📄 ${esc(opts.title)}</span>
  <div class="toolbar-actions">
    <span class="toolbar-tip">Choose "Save as PDF" in the print destination</span>
    <button onclick="window.print()">⬇ Save as PDF</button>
  </div>
</div>
<div class="cover">
  <h1>${esc(opts.title)}</h1>
  ${opts.subtitle ? `<p>${esc(opts.subtitle)}</p>` : ''}
  <p class="brand">SYLLAB.IN</p>
</div>
<div class="content">${sectionsHtml}</div>
<div class="watermark">syllab.in</div>
</body></html>`);
  w.document.close();
}

export function exportNcertChapterAsPDF(opts: ExportOptions) {
  const w = window.open('', '_blank', 'width=900,height=1200,scrollbars=yes,resizable=yes');
  if (!w) {
    alert('Popup was blocked. Please allow popups for this site, then try again.');
    return;
  }

  // HTML-safe escape
  const esc = (s: string) =>
    (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Convert newlines and preserve structure
  const formatText = (text: string) => {
    return esc(text)
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  };

  const itemsHtml = opts.items
    .map((item) => {
      return `
      <div class="qa-pair">
        <h3 class="question">
          <span class="q-num">${item.number}</span> ${esc(item.question)}
        </h3>
        <div class="solution">${formatText(item.solution)}</div>
      </div>
    `;
    })
    .join('');

  w.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${esc(opts.title)} — NCERT Solutions — Syllab</title>
<script>
  function triggerPrint() {
    try { window.focus(); window.print(); }
    catch (e) { /* user can still click the button */ }
  }
  if (document.readyState === 'complete') {
    setTimeout(triggerPrint, 1200);
  } else {
    window.addEventListener('load', function() {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function() { setTimeout(triggerPrint, 600); });
      } else {
        setTimeout(triggerPrint, 1500);
      }
    });
  }
</script>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f1f5f9;
    margin: 0;
    color: #0f172a;
    line-height: 1.6;
  }
  .toolbar {
    position: sticky;
    top: 0;
    background: #0f172a;
    color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    gap: 16px;
    flex-wrap: wrap;
  }
  .toolbar-title {
    font-weight: 900;
    font-size: 14px;
  }
  .toolbar-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .toolbar-tip {
    font-size: 11px;
    opacity: 0.7;
  }
  .toolbar button {
    background: #10b981;
    color: white;
    border: 0;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 900;
    cursor: pointer;
    font-size: 14px;
  }
  .toolbar button:hover {
    background: #059669;
  }
  .cover {
    max-width: 820px;
    margin: 0 auto;
    padding: 60px 40px 40px;
    text-align: center;
    background: white;
    page-break-after: always;
  }
  .cover h1 {
    font-size: 2.5rem;
    font-weight: 900;
    margin: 0 0 10px;
    color: #064e3b;
  }
  .cover p {
    color: #64748b;
    font-weight: 600;
    margin: 4px 0;
  }
  .cover .brand {
    margin-top: 30px;
    font-weight: 900;
    color: #059669;
    letter-spacing: 2px;
  }
  .content {
    max-width: 820px;
    margin: 0 auto;
    background: white;
    padding: 40px;
  }
  .qa-pair {
    margin-bottom: 32px;
    position: relative;
    page-break-inside: avoid;
  }
  .qa-pair:not(:last-child) {
    padding-bottom: 24px;
    border-bottom: 1px solid #e2e8f0;
  }
  .question {
    font-size: 1rem;
    font-weight: 900;
    margin: 0 0 12px;
    color: #0f172a;
    display: flex;
    gap: 12px;
  }
  .q-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #d1fae5;
    color: #065f46;
    font-weight: 900;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .solution {
    font-size: 0.95rem;
    color: #475569;
    line-height: 1.8;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .watermark {
    position: fixed;
    bottom: 40px;
    right: 40px;
    font-size: 11px;
    font-weight: 900;
    color: rgba(5, 150, 105, 0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
    pointer-events: none;
    rotation: -45deg;
    transform-origin: center;
  }
  @media print {
    .toolbar { display: none; }
    body { background: white; }
    .content { box-shadow: none; }
    .qa-pair { page-break-inside: avoid; }
    .watermark { display: block; }
  }
</style>
</head><body>
<div class="toolbar">
  <span class="toolbar-title">📄 ${esc(opts.title)} — NCERT Solutions</span>
  <div class="toolbar-actions">
    <span class="toolbar-tip">Choose "Save as PDF" in the print destination</span>
    <button onclick="window.print()">⬇ Save as PDF</button>
  </div>
</div>
<div class="cover">
  <h1>${esc(opts.title)}</h1>
  <p>${esc(opts.subject || 'NCERT Solutions')} · Class ${esc(String(opts.classLevel || ''))}</p>
  <p>${opts.items.length} Questions with Solutions</p>
  <p class="brand">SYLLAB.IN</p>
</div>
<div class="content">
  ${itemsHtml}
</div>
<div class="watermark">syllab.in</div>
</body></html>`);
  w.document.close();
}
