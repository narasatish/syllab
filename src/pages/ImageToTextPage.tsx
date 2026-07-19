/**
 * ImageToTextPage.tsx — free, private OCR. Extract text from a photo, screenshot
 * or scanned page entirely in your browser using Tesseract.js (WASM, lazy-loaded
 * and self-hosted so it's CSP-safe and never calls a paid server). The image is
 * never uploaded. Indexable SEO page.
 */
import { useCallback, useRef, useState } from 'react';
import { UploadCloud, Download, Loader2, ShieldCheck, Copy, Check, ScanText } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { MAX_IMAGE_BYTES, formatBytes } from '../lib/fileTools';
import type { Worker as OcrWorker } from 'tesseract.js'; // type-only — erased at build, no runtime load

const SITE = 'https://syllab.in';

const STAGE_LABEL: Record<string, string> = {
  'loading tesseract core': 'Loading OCR engine…',
  'initializing tesseract': 'Starting OCR engine…',
  'loading language traineddata': 'Loading language data…',
  'initializing api': 'Preparing…',
  'recognizing text': 'Reading the image…',
};

export default function ImageToTextPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const onPick = useCallback((picked: FileList | null) => {
    setError(''); setText(''); setStage(''); setProgress(0);
    const f = picked?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { setError('Please choose an image (JPG, PNG, WebP or similar).'); return; }
    if (f.size > MAX_IMAGE_BYTES) { setError(`“${f.name}” is ${formatBytes(f.size)} — please use an image under ${formatBytes(MAX_IMAGE_BYTES)}.`); return; }
    setPreview((old) => { if (old) URL.revokeObjectURL(old); return URL.createObjectURL(f); });
    setFile(f);
  }, []);

  const run = async () => {
    if (!file) return;
    setBusy(true); setError(''); setText(''); setProgress(0); setStage('loading tesseract core');
    let worker: OcrWorker | null = null;
    try {
      const { createWorker } = await import('tesseract.js');
      // Self-hosted engine + language data → CSP-safe, no CDN, no server.
      worker = await createWorker('eng', 1, {
        workerPath: '/tesseract/worker.min.js',
        corePath: '/tesseract',
        langPath: '/tesseract/tessdata',
        workerBlobURL: false,
        logger: (m: { status: string; progress: number }) => {
          setStage(m.status);
          if (m.status === 'recognizing text') setProgress(Math.round((m.progress || 0) * 100));
        },
      });
      const { data } = await worker.recognize(file);
      const out = (data.text || '').trim();
      setText(out);
      if (!out) setError('No readable text was found. Try a sharper, higher-contrast image with clear printed text.');
    } catch {
      setError('Could not read this image. Please try a clearer image, or check your connection the first time (the OCR engine downloads once).');
    } finally {
      // Always terminate the worker — even if recognize() threw — so no OCR
      // background thread is ever left running.
      if (worker) { try { await worker.terminate(); } catch { /* already gone */ } }
      setBusy(false); setStage(''); setProgress(0);
    }
  };

  const copy = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* blocked */ }
  };
  const downloadUrl = text ? URL.createObjectURL(new Blob([text], { type: 'text/plain' })) : '';

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO
        title="Image to Text (OCR) — Free & Private, In Your Browser | Syllab.in"
        description="Free image to text converter (OCR). Extract text from a photo, screenshot or scanned page instantly — everything runs in your browser with Tesseract, so your image is never uploaded. Copy or download the text."
        keywords="image to text, photo to text, jpg to text, ocr online free, extract text from image, picture to text, screenshot to text, scanned document to text, handwriting to text"
        url={`${SITE}/image-to-text`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Image to Text (OCR)', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/image-to-text`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Is my image uploaded when I extract text?', acceptedAnswer: { '@type': 'Answer', text: 'No. The OCR runs entirely in your browser using Tesseract (WebAssembly). Your image never leaves your device and is never uploaded to a server.' } },
            { '@type': 'Question', name: 'What images work best for OCR?', acceptedAnswer: { '@type': 'Answer', text: 'Clear, high-contrast images of printed text work best — a straight, well-lit photo or screenshot. Very small, blurry or handwritten text is less accurate.' } },
          ] },
        ]}
      />
      <PageHero emoji="🔎" title="Image to Text (OCR)" subtitle="Extract text from a photo, screenshot or scan — 100% in your browser." className="mb-3" />

      <p className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300"><ShieldCheck size={13} /> Private — your image never leaves your browser</p>

      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <button type="button" onClick={() => fileInput.current?.click()}
          className="flex min-h-[44px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 py-8 text-slate-500 hover:border-primary hover:text-primary transition">
          <UploadCloud size={26} />
          <span className="text-sm font-black">{file ? file.name : 'Choose an image'}</span>
          <span className="text-[11px]">JPG, PNG, WebP · up to {formatBytes(MAX_IMAGE_BYTES)}</span>
        </button>
        <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => onPick(e.target.files)} />

        {preview && <img src={preview} alt="Selected" className="mt-3 max-h-56 w-auto rounded-xl border border-slate-100 dark:border-slate-700" />}

        {file && (
          <button type="button" onClick={run} disabled={busy} className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-6 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-50 transition">
            {busy ? <><Loader2 size={16} className="animate-spin" /> {STAGE_LABEL[stage] || 'Working…'}{stage === 'recognizing text' ? ` ${progress}%` : ''}</> : <><ScanText size={16} /> Extract text</>}
          </button>
        )}

        {busy && stage === 'recognizing text' && (
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
        )}

        {error && <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700">{error}</p>}

        {text && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Extracted text</span>
              <div className="flex gap-2">
                <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 px-2.5 py-1.5 text-[11px] font-black text-slate-600 dark:text-slate-200 hover:bg-slate-200">{copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}</button>
                <a href={downloadUrl} download={`${(file?.name || 'text').replace(/\.[^.]+$/, '')}.txt`} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-black text-white hover:bg-emerald-700"><Download size={13} /> .txt</a>
              </div>
            </div>
            <textarea readOnly value={text} className="h-56 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[13px] leading-relaxed outline-none dark:bg-slate-900 dark:border-slate-700" />
          </div>
        )}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Turn a photo of notes into editable text</h2>
        <p>Snap or upload a picture of <strong>printed notes, a textbook page, a screenshot or a worksheet</strong> and this tool reads the text out of it — right in your browser with Tesseract OCR, so your image is never uploaded. Copy the text or download it as a .txt file. The OCR engine and English language data download once on first use, then work offline.</p>
        <p>Got the text? Count it with the <a href="/word-counter" className="font-bold text-primary hover:underline">Word Counter</a>, listen with <a href="/text-to-speech" className="font-bold text-primary hover:underline">Text-to-Speech</a>, or turn it into a <a href="/pdf-tools" className="font-bold text-primary hover:underline">PDF</a>.</p>
      </section>

      <ToolRelated current="/image-to-text" />
    </div>
  );
}
