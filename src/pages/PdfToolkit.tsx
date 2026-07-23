/**
 * PdfToolkit.tsx — free, 100% private PDF tools. Everything runs in the browser
 * (pdf-lib for editing, pdf.js for text extraction), both LAZY-loaded so the
 * main bundle and page speed are untouched until a tool is actually used. Files
 * never leave the device. Indexable SEO page.
 *
 * Tools: Merge · Split (page ranges) · Rotate · Delete pages · Images→PDF ·
 *        Watermark · Page numbers · Flatten form · PDF→Text.
 *
 * Deliberately NOT included: PDF-compress and PDF→image. They require pdf.js
 * canvas page.render(), which hangs on real PDFs (verified). Text extraction
 * via getTextContent() works and is what we ship.
 */
import { useCallback, useRef, useState } from 'react';
import { UploadCloud, Download, Loader2, ShieldCheck, FileText, Eraser } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { MAX_PDF_BYTES, parsePageRanges, formatBytes } from '../lib/fileTools';

const SITE = 'https://syllab.in';

type Mode = 'merge' | 'split' | 'rotate' | 'delete' | 'img2pdf' | 'watermark' | 'numbers' | 'flatten' | 'totext' | 'sign';
const MODES: { id: Mode; label: string; multi?: boolean; images?: boolean }[] = [
  { id: 'merge', label: 'Merge', multi: true },
  { id: 'split', label: 'Split' },
  { id: 'rotate', label: 'Rotate' },
  { id: 'delete', label: 'Delete pages' },
  { id: 'img2pdf', label: 'Images → PDF', multi: true, images: true },
  { id: 'watermark', label: 'Watermark' },
  { id: 'numbers', label: 'Page numbers' },
  { id: 'sign', label: 'Sign' },
  { id: 'flatten', label: 'Flatten form' },
  { id: 'totext', label: 'PDF → Text' },
];

type SigPos = 'left' | 'center' | 'right';

/** A canvas the user draws a signature on with pointer events (works on touch). */
function SignaturePad({ canvasRef, onChange }: { canvasRef: React.RefObject<HTMLCanvasElement | null>; onChange: (hasSig: boolean) => void }) {
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (canvas.width / rect.width), y: (e.clientY - rect.top) * (canvas.height / rect.height) };
  };
  const start = (e: React.PointerEvent<HTMLCanvasElement>) => { drawing.current = true; last.current = pos(e); e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = pos(e);
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(last.current!.x, last.current!.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p; onChange(true);
  };
  const end = () => { drawing.current = false; last.current = null; };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    onChange(false);
  };

  return (
    <div>
      <span className="text-[11px] font-bold text-slate-500">Draw your signature</span>
      <div className="mt-1 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 bg-white">
        <canvas ref={canvasRef} width={480} height={160}
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end}
          style={{ touchAction: 'none', width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }} />
      </div>
      <button type="button" onClick={clear} className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-black text-slate-500 hover:text-slate-700"><Eraser size={12} /> Clear</button>
    </div>
  );
}

interface Output { url: string; name: string; size: number; text?: string }

export default function PdfToolkit() {
  const [mode, setMode] = useState<Mode>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [out, setOut] = useState<Output | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ranges, setRanges] = useState('1-3,5');
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [wmText, setWmText] = useState('CONFIDENTIAL');
  const [signPos, setSignPos] = useState<SigPos>('right');
  const [signPage, setSignPage] = useState(''); // blank = last page
  const [hasSig, setHasSig] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const sigCanvas = useRef<HTMLCanvasElement | null>(null);

  const cfg = MODES.find((m) => m.id === mode)!;

  const reset = () => { setOut((o) => { if (o?.url) URL.revokeObjectURL(o.url); return null; }); setError(''); };

  const onPick = useCallback((picked: FileList | null) => {
    reset();
    if (!picked || !picked.length) return;
    const arr = Array.from(picked);
    const wantImages = cfg.images;
    for (const f of arr) {
      const okType = wantImages ? f.type.startsWith('image/') : (f.type === 'application/pdf' || /\.pdf$/i.test(f.name));
      if (!okType) { setError(wantImages ? 'Please choose image files (JPG or PNG).' : 'Please choose PDF files.'); return; }
      if (f.size > MAX_PDF_BYTES) { setError(`“${f.name}” is ${formatBytes(f.size)} — please use files under ${formatBytes(MAX_PDF_BYTES)}.`); return; }
    }
    setFiles(cfg.multi ? arr : [arr[0]]);
  }, [cfg]);

  const process = async () => {
    if (!files.length) return;
    setBusy(true); setError('');
    setOut((o) => { if (o?.url) URL.revokeObjectURL(o.url); return null; });
    try {
      if (mode === 'totext') {
        const pdfjs = await import('pdfjs-dist');
        const workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
        const buf = await files[0].arrayBuffer();
        const doc = await pdfjs.getDocument({ data: buf }).promise;
        const parts: string[] = [];
        for (let p = 1; p <= doc.numPages; p++) {
          const page = await doc.getPage(p);
          const tc = await page.getTextContent();
          parts.push(tc.items.map((it) => ('str' in it ? it.str : '')).join(' '));
        }
        const text = parts.join('\n\n').trim();
        const blob = new Blob([text || '(No selectable text found — this PDF may be a scanned image.)'], { type: 'text/plain' });
        setOut({ url: URL.createObjectURL(blob), name: files[0].name.replace(/\.pdf$/i, '') + '.txt', size: blob.size, text: text.slice(0, 4000) });
        return;
      }

      const { PDFDocument, degrees, rgb, StandardFonts } = await import('pdf-lib');
      let outDoc;
      const base = files[0].name.replace(/\.[^.]+$/, '');

      if (mode === 'merge') {
        outDoc = await PDFDocument.create();
        for (const f of files) {
          const src = await PDFDocument.load(await f.arrayBuffer());
          const pages = await outDoc.copyPages(src, src.getPageIndices());
          pages.forEach((pg) => outDoc.addPage(pg));
        }
      } else if (mode === 'img2pdf') {
        outDoc = await PDFDocument.create();
        for (const f of files) {
          const bytes = new Uint8Array(await f.arrayBuffer());
          const img = /png$/i.test(f.type) || /\.png$/i.test(f.name) ? await outDoc.embedPng(bytes) : await outDoc.embedJpg(bytes);
          const page = outDoc.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
      } else if (mode === 'split') {
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        const pages = parsePageRanges(ranges, src.getPageCount());
        if (!pages.length) throw new Error('No valid pages in that range for this document.');
        outDoc = await PDFDocument.create();
        const copied = await outDoc.copyPages(src, pages.map((p) => p - 1));
        copied.forEach((pg) => outDoc.addPage(pg));
      } else if (mode === 'delete') {
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        const total = src.getPageCount();
        const remove = new Set(parsePageRanges(ranges, total));
        const keep = [];
        for (let p = 1; p <= total; p++) if (!remove.has(p)) keep.push(p - 1);
        if (!keep.length) throw new Error('That would delete every page — keep at least one.');
        outDoc = await PDFDocument.create();
        const copied = await outDoc.copyPages(src, keep);
        copied.forEach((pg) => outDoc.addPage(pg));
      } else if (mode === 'rotate') {
        outDoc = await PDFDocument.load(await files[0].arrayBuffer());
        outDoc.getPages().forEach((pg) => pg.setRotation(degrees((pg.getRotation().angle + angle) % 360)));
      } else if (mode === 'watermark') {
        outDoc = await PDFDocument.load(await files[0].arrayBuffer());
        const font = await outDoc.embedFont(StandardFonts.HelveticaBold);
        const text = (wmText || 'CONFIDENTIAL').slice(0, 40);
        outDoc.getPages().forEach((pg) => {
          const { width, height } = pg.getSize();
          pg.drawText(text, { x: width / 2 - Math.min(width, 360) / 2, y: height / 2, size: Math.max(24, Math.min(60, width / 10)), font, color: rgb(0.6, 0.6, 0.6), rotate: degrees(45), opacity: 0.28 });
        });
      } else if (mode === 'numbers') {
        outDoc = await PDFDocument.load(await files[0].arrayBuffer());
        const font = await outDoc.embedFont(StandardFonts.Helvetica);
        const pages = outDoc.getPages();
        pages.forEach((pg, i) => {
          const { width } = pg.getSize();
          const label = `${i + 1} / ${pages.length}`;
          pg.drawText(label, { x: width / 2 - font.widthOfTextAtSize(label, 10) / 2, y: 18, size: 10, font, color: rgb(0.35, 0.35, 0.35) });
        });
      } else if (mode === 'sign') {
        const canvas = sigCanvas.current;
        if (!canvas || !hasSig) throw new Error('Please draw your signature in the box first.');
        outDoc = await PDFDocument.load(await files[0].arrayBuffer());
        // IMPORTANT: decode the data URL with atob → Uint8Array. fetch() on a
        // data: URL can hang and freeze the tool (verified) — never fetch here.
        const b64 = canvas.toDataURL('image/png').split(',')[1] || '';
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const png = await outDoc.embedPng(bytes);
        const pages = outDoc.getPages();
        const idx = Math.min(Math.max(1, parseInt(signPage, 10) || pages.length), pages.length) - 1;
        const page = pages[idx];
        const { width } = page.getSize();
        const sigW = Math.min(160, width - 48);
        const sigH = (png.height / png.width) * sigW;
        const margin = 28;
        const x = signPos === 'center' ? (width - sigW) / 2 : signPos === 'right' ? width - sigW - margin : margin;
        page.drawImage(png, { x, y: margin, width: sigW, height: sigH });
      } else { // flatten
        outDoc = await PDFDocument.load(await files[0].arrayBuffer());
        const form = outDoc.getForm();
        if (form.getFields().length === 0) throw new Error('This PDF has no fillable form fields to flatten.');
        form.flatten();
      }

      const bytes = await outDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setOut({ url: URL.createObjectURL(blob), name: `${base}-syllab.pdf`, size: blob.size });
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : 'Could not process that PDF. It may be encrypted, corrupted, or an unusual format.');
    } finally {
      setBusy(false);
    }
  };

  const needsRanges = mode === 'split' || mode === 'delete';
  const inputCls = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free PDF Tools — Merge, Split, Sign, Watermark, PDF to Text | Syllab.in"
        description="Free private PDF tools that work 100% in your browser — your files never leave your device. Merge, split, rotate, delete pages, images to PDF, add a watermark, add page numbers, sign a PDF, flatten forms and extract text. No upload, no signup."
        keywords="free pdf tools, merge pdf, split pdf, sign pdf free, add signature to pdf, e-sign pdf online, watermark pdf, add page numbers pdf, pdf to text, flatten pdf, images to pdf, rotate pdf, delete pdf pages, ilovepdf free alternative, private pdf editor"
        url={`${SITE}/pdf-tools`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab PDF Toolkit', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: `${SITE}/pdf-tools`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Are my PDFs uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Every PDF tool here runs entirely in your browser (using pdf-lib and pdf.js) — your files never leave your device and are never uploaded, unlike iLovePDF or SmallPDF. That makes it fully private.' } },
            { '@type': 'Question', name: 'How do I merge PDF files for free?', acceptedAnswer: { '@type': 'Answer', text: 'Open the Merge tool, choose two or more PDFs in the order you want, click Merge and download the combined PDF — all privately in your browser, no upload or signup.' } },
          ] },
        ]}
      />
      <PageHero emoji="📄" title="PDF Tools" subtitle="Merge, split, rotate, watermark, page numbers, images→PDF & PDF→text — 100% in your browser." className="mb-3" />

      <p className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300"><ShieldCheck size={13} /> Private — your files never leave your browser</p>

      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button key={m.id} type="button" onClick={() => { setMode(m.id); setFiles([]); setHasSig(false); reset(); }}
            className={`inline-flex min-h-[40px] items-center rounded-full px-4 text-xs font-black transition ${mode === m.id ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <button type="button" onClick={() => fileInput.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 py-8 text-slate-500 hover:border-primary hover:text-primary transition">
          <UploadCloud size={26} />
          <span className="text-sm font-black">{files.length ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : cfg.multi ? `Choose ${cfg.images ? 'images' : 'PDFs'}` : 'Choose a PDF'}</span>
          <span className="text-[11px]">{cfg.images ? 'JPG or PNG' : 'PDF'}{cfg.multi ? ' · you can pick several' : ''} · up to {formatBytes(MAX_PDF_BYTES)}</span>
        </button>
        <input ref={fileInput} type="file" multiple={cfg.multi} accept={cfg.images ? 'image/jpeg,image/png' : 'application/pdf,.pdf'} className="hidden" onChange={(e) => onPick(e.target.files)} />

        {files.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm">
            {files.map((f, i) => (<li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><FileText size={14} className="text-slate-400" /><span className="truncate">{f.name}</span><span className="text-slate-400">· {formatBytes(f.size)}</span></li>))}
          </ul>
        )}

        {/* options */}
        <div className="mt-4 flex flex-wrap items-end gap-3">
          {needsRanges && (
            <label className="block"><span className="text-[11px] font-bold text-slate-500">{mode === 'split' ? 'Pages to keep' : 'Pages to delete'} (e.g. 1-3,5,8-)</span>
              <input value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="1-3,5,8-" className={`mt-1 w-48 ${inputCls}`} /></label>
          )}
          {mode === 'rotate' && (
            <div className="flex gap-2">{[90, 180, 270].map((a) => (<button key={a} type="button" onClick={() => setAngle(a as 90 | 180 | 270)} className={`rounded-lg px-3 py-1.5 text-xs font-black ${angle === a ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}>{a}°</button>))}</div>
          )}
          {mode === 'watermark' && (
            <label className="block"><span className="text-[11px] font-bold text-slate-500">Watermark text</span>
              <input value={wmText} onChange={(e) => setWmText(e.target.value)} maxLength={40} placeholder="CONFIDENTIAL" className={`mt-1 w-56 ${inputCls}`} /></label>
          )}
          {mode === 'sign' && (
            <div className="w-full space-y-3">
              <SignaturePad canvasRef={sigCanvas} onChange={setHasSig} />
              <div className="flex flex-wrap items-end gap-3">
                <div><span className="text-[11px] font-bold text-slate-500">Position</span>
                  <div className="mt-1 flex gap-2">{(['left', 'center', 'right'] as SigPos[]).map((p) => (
                    <button key={p} type="button" onClick={() => setSignPos(p)} className={`rounded-lg px-3 py-1.5 text-xs font-black capitalize ${signPos === p ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}>{p}</button>
                  ))}</div>
                </div>
                <label className="block"><span className="text-[11px] font-bold text-slate-500">Page (blank = last)</span>
                  <input type="number" min={1} value={signPage} onChange={(e) => setSignPage(e.target.value)} placeholder="last" className={`mt-1 w-28 ${inputCls}`} /></label>
              </div>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <button type="button" onClick={process} disabled={busy} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-40 transition">
            {busy ? <><Loader2 size={16} className="animate-spin" /> Working…</> : <>{cfg.label}</>}
          </button>
        )}

        {error && <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700">{error}</p>}

        {out && (
          <div className="mt-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm"><p className="font-black text-emerald-800 dark:text-emerald-200">Done ✅</p><p className="text-emerald-700 dark:text-emerald-300">{out.name} · {formatBytes(out.size)}</p></div>
              <a href={out.url} download={out.name} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 transition"><Download size={14} /> Download</a>
            </div>
            {out.text != null && (
              <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-white dark:bg-slate-900 p-3 text-xs text-slate-700 dark:text-slate-300">{out.text || '(No selectable text — this PDF may be a scanned image.)'}</pre>
            )}
          </div>
        )}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Private PDF tools that never upload your files</h2>
        <p>Unlike iLovePDF or SmallPDF, these tools never upload your documents. <strong>Merge, split, rotate, delete pages, turn images into a PDF, add a watermark or page numbers, sign a PDF, flatten a filled form and extract text</strong> — all run entirely in your browser with pdf-lib and pdf.js, so your files stay private on your device.</p>
        <p>100% free, no sign-up, no watermark added by us. Working with photos? Try the free <a href="/image-tools" className="font-bold text-primary hover:underline">Image Tools</a> — also fully private.</p>
      </section>

      <ToolRelated current="/pdf-tools" />
    </div>
  );
}
