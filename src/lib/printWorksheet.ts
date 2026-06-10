/**
 * printWorksheet — open a generated A4 worksheet SVG in a new window and trigger
 * the browser's "Save as PDF" / print dialog. The syllab.in watermark is already
 * baked into the SVG. Pure client-side, free, works everywhere.
 */
export function printWorksheet(title: string, svg: string): void {
  const w = window.open('', '_blank', 'width=820,height=1100,scrollbars=yes,resizable=yes');
  if (!w) {
    alert('Popup was blocked. Please allow popups for this site, then try again.');
    return;
  }
  const safeTitle = (title || 'Worksheet').replace(/[<>]/g, '');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${safeTitle} — Syllab.in Worksheet</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f1f5f9; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; }
  .bar { position: sticky; top: 0; background: #0f172a; color: #fff; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .bar button { background: #10b981; color: #fff; border: 0; padding: 9px 18px; border-radius: 10px; font-weight: 900; cursor: pointer; }
  .sheet { max-width: 820px; margin: 16px auto; background: #fff; box-shadow: 0 4px 24px rgba(0,0,0,.12); }
  .sheet svg { display: block; width: 100%; height: auto; }
  @media print { .bar { display: none; } body { background: #fff; } .sheet { margin: 0; box-shadow: none; max-width: none; } }
</style>
<script>
  function go(){ try { window.focus(); window.print(); } catch(e){} }
  window.addEventListener('load', function(){ setTimeout(go, 500); });
</script>
</head><body>
<div class="bar"><span style="font-weight:900;font-size:14px">📄 ${safeTitle}</span>
  <button onclick="window.print()">⬇ Save as PDF / Print</button></div>
<div class="sheet">${svg}</div>
</body></html>`);
  w.document.close();
}
