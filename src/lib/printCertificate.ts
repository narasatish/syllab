/**
 * printCertificate — opens a printable "Syllab Junior" achievement certificate
 * (A4 landscape) for a child, then triggers the browser print dialog (Save as PDF).
 * 100% client-side, free. Parents love these and they earn shares/backlinks.
 */
export function printCertificate(name: string, achievement = 'Syllab Junior Star'): void {
  const safe = (s: string) => (s || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] || c));
  const child = safe(name).slice(0, 40) || 'A Wonderful Learner';
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Certificate — ${child}</title>
  <style>
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Georgia, 'Times New Roman', serif; }
    .cert { position: relative; width: 297mm; height: 210mm; padding: 18mm; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
            background: radial-gradient(circle at 50% 0%, #fef9c3 0%, #ffffff 55%); }
    .frame { position: absolute; inset: 8mm; border: 6px solid #f59e0b; border-radius: 14px; }
    .frame::after { content: ''; position: absolute; inset: 5px; border: 2px solid #fbbf24; border-radius: 10px; }
    .brand { color: #059669; font-weight: 900; letter-spacing: 3px; font-family: Arial, sans-serif; font-size: 16px; }
    .title { font-size: 46px; font-weight: 900; color: #b45309; margin: 8px 0 0; letter-spacing: 1px; }
    .sub { font-size: 16px; color: #64748b; margin-top: 6px; font-family: Arial, sans-serif; }
    .name { font-size: 54px; font-weight: 900; color: #0f172a; margin: 22px 0 6px; }
    .line { width: 60%; border-bottom: 2px solid #cbd5e1; margin: 0 auto 14px; }
    .ach { font-size: 22px; color: #334155; }
    .stars { font-size: 40px; margin: 14px 0; }
    .foot { display: flex; justify-content: space-between; width: 70%; margin-top: 26px; font-family: Arial, sans-serif; font-size: 13px; color: #475569; }
    .wm { position: absolute; bottom: 12mm; left: 0; right: 0; text-align: center; color: rgba(5,150,105,.5); font-family: Arial; font-weight: 900; letter-spacing: 2px; font-size: 12px; }
    @media screen { body { background:#e2e8f0; padding:16px; } .cert { box-shadow: 0 10px 40px rgba(0,0,0,.2); margin: 0 auto; } }
  </style></head><body>
    <div class="cert">
      <div class="frame"></div>
      <div class="brand">🎓 SYLLAB JUNIOR</div>
      <div class="title">Certificate of Achievement</div>
      <div class="sub">This certificate is proudly presented to</div>
      <div class="name">${child}</div>
      <div class="line"></div>
      <div class="ach">for being a wonderful <strong>${safe(achievement)}</strong> — keep learning and shining! 🌟</div>
      <div class="stars">⭐ ⭐ ⭐ ⭐ ⭐</div>
      <div class="foot"><span>Date: ${date}</span><span>syllab.in</span></div>
      <div class="wm">syllab.in · free learning for kids</div>
    </div>
    <script>window.onload=function(){setTimeout(function(){window.print();},300);};</script>
  </body></html>`;
  const w = window.open('', '_blank');
  if (!w) { alert('Please allow pop-ups to print the certificate.'); return; }
  w.document.open();
  w.document.write(html);
  w.document.close();
}
