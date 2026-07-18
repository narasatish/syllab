/**
 * ImageToolkit.tsx — free, 100% private image tools. Everything runs in the
 * browser via <canvas>; files never leave the device. No external library for
 * the canvas ops (fast + reliable); HEIC decoding lazy-loads heic2any only when
 * the HEIC→JPG tool is used. Indexable SEO page.
 *
 * Tools: Compress · Resize · Convert (JPG/PNG/WebP) · Rotate · Flip · Crop ·
 *        HEIC→JPG.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { UploadCloud, Download, Loader2, ImageIcon, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { MAX_IMAGE_BYTES, fitWithin, formatBytes, centeredCrop } from '../lib/fileTools';

const SITE = 'https://syllab.in';

type Mode = 'compress' | 'resize' | 'convert' | 'rotate' | 'flip' | 'crop' | 'heic';
const MODES: { id: Mode; label: string }[] = [
  { id: 'compress', label: 'Compress' },
  { id: 'resize', label: 'Resize' },
  { id: 'convert', label: 'Convert' },
  { id: 'rotate', label: 'Rotate' },
  { id: 'flip', label: 'Flip' },
  { id: 'crop', label: 'Crop' },
  { id: 'heic', label: 'HEIC → JPG' },
];

const isHeicName = (n: string) => /\.(heic|heif)$/i.test(n);

interface Loaded { file: File; width: number; height: number; previewUrl: string | null; isHeic: boolean }
interface Output { url: string; name: string; size: number }

export default function ImageToolkit() {
  const [mode, setMode] = useState<Mode>('compress');
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [out, setOut] = useState<Output | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // options
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState('');           // compress/resize cap
  const [rw, setRw] = useState(''); const [rh, setRh] = useState(''); const [keepAspect, setKeepAspect] = useState(true);
  const [fmt, setFmt] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/png');
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [flipDir, setFlipDir] = useState<'h' | 'v'>('h');
  const [aspect, setAspect] = useState('1:1');

  const fileInput = useRef<HTMLInputElement>(null);

  // Revoke object URLs on unmount / replacement.
  useEffect(() => () => { if (loaded?.previewUrl) URL.revokeObjectURL(loaded.previewUrl); }, [loaded]);
  useEffect(() => () => { if (out?.url) URL.revokeObjectURL(out.url); }, [out]);

  const reset = () => {
    setLoaded((l) => { if (l?.previewUrl) URL.revokeObjectURL(l.previewUrl); return null; });
    setOut((o) => { if (o?.url) URL.revokeObjectURL(o.url); return null; });
    setError('');
  };

  const onPick = useCallback(async (file: File | undefined) => {
    reset();
    if (!file) return;
    const heic = isHeicName(file.name) || /heic|heif/i.test(file.type);
    if (!heic && !file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    if (file.size > MAX_IMAGE_BYTES) { setError(`That image is ${formatBytes(file.size)} — please use one under ${formatBytes(MAX_IMAGE_BYTES)} so your browser doesn’t freeze.`); return; }
    if (mode !== 'heic' && heic) { setError('HEIC files can only be used with the “HEIC → JPG” tool — switch to it above.'); return; }
    if (mode === 'heic' && !heic) { setError('The HEIC → JPG tool needs a .heic or .heif photo (usually from an iPhone).'); return; }

    if (heic) {
      // Browsers can't decode HEIC, so we can't read its dimensions — show a placeholder.
      setLoaded({ file, width: 0, height: 0, previewUrl: null, isHeic: true });
      return;
    }
    try {
      const bmp = await createImageBitmap(file);
      const url = URL.createObjectURL(file);
      setLoaded({ file, width: bmp.width, height: bmp.height, previewUrl: url, isHeic: false });
      bmp.close?.();
    } catch {
      setError('Could not read that image — it may be corrupted or an unsupported format.');
    }
  }, [mode]);

  // ── Canvas processing ──────────────────────────────────────────────────
  async function draw(fn: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, bmp: ImageBitmap) => void, type: string, q?: number): Promise<Blob> {
    const bmp = await createImageBitmap(loaded!.file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    fn(ctx, canvas, bmp);
    bmp.close?.();
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, type, q));
    if (!blob) throw new Error('encode-failed');
    return blob;
  }

  const process = async () => {
    if (!loaded) return;
    setBusy(true); setError('');
    setOut((o) => { if (o?.url) URL.revokeObjectURL(o.url); return null; });
    try {
      let blob: Blob;
      let ext: string;
      const base = loaded.file.name.replace(/\.[^.]+$/, '');

      if (mode === 'heic') {
        const heic2any = (await import('heic2any')).default;
        const result = await heic2any({ blob: loaded.file, toType: 'image/jpeg', quality: 0.9 });
        blob = Array.isArray(result) ? result[0] : result;
        ext = 'jpg';
      } else if (mode === 'compress') {
        const cap = Number(maxWidth) > 0 ? Number(maxWidth) : Infinity;
        blob = await draw((ctx, canvas, bmp) => {
          const { width, height } = fitWithin(bmp.width, bmp.height, cap, Infinity);
          canvas.width = width; canvas.height = height;
          ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height); // flatten alpha for JPEG
          ctx.drawImage(bmp, 0, 0, width, height);
        }, 'image/jpeg', quality);
        ext = 'jpg';
      } else if (mode === 'resize') {
        let tw = Number(rw), th = Number(rh);
        if (keepAspect) { const f = fitWithin(loaded.width, loaded.height, tw > 0 ? tw : Infinity, th > 0 ? th : Infinity); tw = f.width; th = f.height; }
        if (!(tw > 0) || !(th > 0)) throw new Error('Enter a width and/or height.');
        const outType = loaded.file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
        blob = await draw((ctx, canvas, bmp) => {
          canvas.width = tw; canvas.height = th;
          if (outType === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, tw, th); }
          ctx.drawImage(bmp, 0, 0, tw, th);
        }, outType, 0.92);
        ext = outType === 'image/jpeg' ? 'jpg' : 'png';
      } else if (mode === 'convert') {
        blob = await draw((ctx, canvas, bmp) => {
          canvas.width = bmp.width; canvas.height = bmp.height;
          if (fmt === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, bmp.width, bmp.height); }
          ctx.drawImage(bmp, 0, 0);
        }, fmt, fmt === 'image/png' ? undefined : 0.92);
        ext = fmt === 'image/jpeg' ? 'jpg' : fmt === 'image/webp' ? 'webp' : 'png';
      } else if (mode === 'rotate') {
        const outType = loaded.file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
        blob = await draw((ctx, canvas, bmp) => {
          const swap = angle === 90 || angle === 270;
          canvas.width = swap ? bmp.height : bmp.width;
          canvas.height = swap ? bmp.width : bmp.height;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((angle * Math.PI) / 180);
          ctx.drawImage(bmp, -bmp.width / 2, -bmp.height / 2);
        }, outType, 0.92);
        ext = outType === 'image/jpeg' ? 'jpg' : 'png';
      } else if (mode === 'flip') {
        const outType = loaded.file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
        blob = await draw((ctx, canvas, bmp) => {
          canvas.width = bmp.width; canvas.height = bmp.height;
          if (flipDir === 'h') { ctx.translate(bmp.width, 0); ctx.scale(-1, 1); }
          else { ctx.translate(0, bmp.height); ctx.scale(1, -1); }
          ctx.drawImage(bmp, 0, 0);
        }, outType, 0.92);
        ext = outType === 'image/jpeg' ? 'jpg' : 'png';
      } else { // crop
        const [aw, ah] = aspect.split(':').map(Number);
        const outType = loaded.file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
        blob = await draw((ctx, canvas, bmp) => {
          const c = centeredCrop(bmp.width, bmp.height, aw, ah);
          canvas.width = c.w; canvas.height = c.h;
          if (outType === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.w, c.h); }
          ctx.drawImage(bmp, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
        }, outType, 0.92);
        ext = outType === 'image/jpeg' ? 'jpg' : 'png';
      }

      const url = URL.createObjectURL(blob);
      setOut({ url, name: `${base}-syllab.${ext}`, size: blob.size });
    } catch (e) {
      setError(e instanceof Error && e.message && !/encode-failed/.test(e.message) ? e.message : 'Something went wrong processing that image. Try another file.');
    } finally {
      setBusy(false);
    }
  };

  const inputCls = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free Image Tools — Compress, Resize, Convert, HEIC to JPG | Syllab.in"
        description="Free private image tools that work 100% in your browser — your files never leave your device. Compress, resize, convert (JPG/PNG/WebP), rotate, flip, crop and convert HEIC to JPG. No upload, no signup, no watermark."
        keywords="compress image, resize image, convert image, jpg to png, png to webp, heic to jpg, rotate image, flip image, crop image, free image tools, image compressor online free, private image tools"
        url={`${SITE}/image-tools`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Image Toolkit', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', url: `${SITE}/image-tools`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Are my images uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Every image tool here runs entirely in your browser using the canvas API — your photos never leave your device and are never uploaded. That makes it fully private, unlike most online image tools.' } },
            { '@type': 'Question', name: 'How do I convert HEIC to JPG for free?', acceptedAnswer: { '@type': 'Answer', text: 'Open the HEIC → JPG tool, choose your .heic photo (usually from an iPhone) and download the JPG. It runs privately in your browser — no upload.' } },
          ] },
        ]}
      />
      <PageHero emoji="🖼️" title="Image Tools" subtitle="Compress, resize, convert, rotate, flip, crop & HEIC→JPG — 100% in your browser." className="mb-3" />

      <p className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300"><ShieldCheck size={13} /> Private — your files never leave your browser</p>

      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button key={m.id} type="button" onClick={() => { setMode(m.id); reset(); }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${mode === m.id ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {/* File picker */}
      <div className="mt-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <button type="button" onClick={() => fileInput.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 py-8 text-slate-500 hover:border-primary hover:text-primary transition">
          <UploadCloud size={26} />
          <span className="text-sm font-black">{loaded ? loaded.file.name : 'Choose an image'}</span>
          <span className="text-[11px]">{mode === 'heic' ? '.heic / .heif' : 'JPG, PNG, WebP…'} · up to {formatBytes(MAX_IMAGE_BYTES)}</span>
        </button>
        <input ref={fileInput} type="file" accept={mode === 'heic' ? '.heic,.heif,image/heic,image/heif' : 'image/*'} className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])} />

        {loaded && (
          <div className="mt-4 flex items-center gap-4">
            {loaded.previewUrl ? (
              <img src={loaded.previewUrl} alt="preview" className="h-20 w-20 rounded-xl object-cover border border-slate-100 dark:border-slate-700" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400"><ImageIcon size={26} /></div>
            )}
            <div className="text-sm">
              <p className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[220px]">{loaded.file.name}</p>
              <p className="text-slate-500">{formatBytes(loaded.file.size)}{loaded.width ? ` · ${loaded.width}×${loaded.height}px` : loaded.isHeic ? ' · HEIC' : ''}</p>
            </div>
          </div>
        )}

        {/* Mode options */}
        {loaded && !loaded.isHeic && (
          <div className="mt-4 flex flex-wrap items-end gap-3">
            {mode === 'compress' && (<>
              <label className="block"><span className="text-[11px] font-bold text-slate-500">Quality {Math.round(quality * 100)}%</span>
                <input type="range" min="0.1" max="0.95" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="mt-1 block w-40 accent-primary" /></label>
              <label className="block"><span className="text-[11px] font-bold text-slate-500">Max width px (optional)</span>
                <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} placeholder="e.g. 1600" className={`mt-1 w-32 ${inputCls}`} /></label>
            </>)}
            {mode === 'resize' && (<>
              <label className="block"><span className="text-[11px] font-bold text-slate-500">Width px</span>
                <input type="number" value={rw} onChange={(e) => setRw(e.target.value)} placeholder="width" className={`mt-1 w-28 ${inputCls}`} /></label>
              <label className="block"><span className="text-[11px] font-bold text-slate-500">Height px</span>
                <input type="number" value={rh} onChange={(e) => setRh(e.target.value)} placeholder="height" className={`mt-1 w-28 ${inputCls}`} /></label>
              <label className="inline-flex items-center gap-1.5 pb-2 text-xs font-bold text-slate-600 dark:text-slate-300"><input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} className="accent-primary" /> Keep aspect ratio</label>
            </>)}
            {mode === 'convert' && (
              <label className="block"><span className="text-[11px] font-bold text-slate-500">Convert to</span>
                <select value={fmt} onChange={(e) => setFmt(e.target.value as typeof fmt)} className={`mt-1 ${inputCls}`}>
                  <option value="image/png">PNG</option><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option>
                </select></label>
            )}
            {mode === 'rotate' && (
              <div className="flex gap-2">{[90, 180, 270].map((a) => (
                <button key={a} type="button" onClick={() => setAngle(a as 90 | 180 | 270)} className={`rounded-lg px-3 py-1.5 text-xs font-black ${angle === a ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}>{a}°</button>
              ))}</div>
            )}
            {mode === 'flip' && (
              <div className="flex gap-2">
                <button type="button" onClick={() => setFlipDir('h')} className={`rounded-lg px-3 py-1.5 text-xs font-black ${flipDir === 'h' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}>Horizontal</button>
                <button type="button" onClick={() => setFlipDir('v')} className={`rounded-lg px-3 py-1.5 text-xs font-black ${flipDir === 'v' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}>Vertical</button>
              </div>
            )}
            {mode === 'crop' && (
              <label className="block"><span className="text-[11px] font-bold text-slate-500">Aspect ratio</span>
                <select value={aspect} onChange={(e) => setAspect(e.target.value)} className={`mt-1 ${inputCls}`}>
                  {['1:1', '4:5', '16:9', '4:3', '3:2'].map((a) => <option key={a} value={a}>{a}</option>)}
                </select></label>
            )}
          </div>
        )}

        {loaded && (
          <button type="button" onClick={process} disabled={busy}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-40 transition">
            {busy ? <><Loader2 size={16} className="animate-spin" /> Working…</> : <>{mode === 'heic' ? 'Convert to JPG' : MODES.find((m) => m.id === mode)!.label} image</>}
          </button>
        )}

        {error && <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700">{error}</p>}

        {out && (
          <div className="mt-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm">
                <p className="font-black text-emerald-800 dark:text-emerald-200">Done ✅</p>
                <p className="text-emerald-700 dark:text-emerald-300">{formatBytes(out.size)}{loaded ? ` (was ${formatBytes(loaded.file.size)}${loaded.file.size > out.size ? `, −${Math.round((1 - out.size / loaded.file.size) * 100)}%` : ''})` : ''}</p>
              </div>
              <a href={out.url} download={out.name} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 transition"><Download size={14} /> Download</a>
            </div>
          </div>
        )}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Private image tools that never upload your files</h2>
        <p>Most online image tools upload your photos to a server. These don’t: every operation — <strong>compress, resize, convert (JPG/PNG/WebP), rotate, flip, crop</strong> and <strong>HEIC→JPG</strong> — runs entirely in your browser with the canvas API, so your images stay on your device. Perfect for shrinking a photo under an exam-form’s size limit, or turning an iPhone HEIC into a JPG a website will accept.</p>
        <p>100% free, no sign-up, no watermark. Need PDFs too? Use the free <a href="/pdf-tools" className="font-bold text-primary hover:underline">PDF Tools</a> — also fully private.</p>
      </section>

      <ToolRelated current="/image-tools" />
    </div>
  );
}
