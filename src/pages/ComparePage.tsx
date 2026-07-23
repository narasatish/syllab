/**
 * ComparePage.tsx — free, 100% private text & document comparison. Paste text or
 * load a PDF / DOCX / TXT into either side; extraction runs in the browser
 * (pdf.js getTextContent — reliable, NOT canvas render; mammoth for DOCX; the
 * File API for TXT), all lazy-loaded. The diff itself is a pure LCS diff
 * (src/lib/textDiff): line-level, and word-level within changed lines so you see
 * exactly which words changed. Files never leave the device. Indexable SEO page.
 */
import { useMemo, useRef, useState } from 'react';
import { UploadCloud, ShieldCheck, ArrowLeftRight, Loader2, Trash2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { diffLines, diffWords, diffStats, type DiffSegment } from '../lib/textDiff';
import { formatBytes, MAX_PDF_BYTES } from '../lib/fileTools';

const SITE = 'https://syllab.in';

/**
 * A display row: an unchanged/added/removed line, or a "changed" line where a
 * deletion and the addition that replaced it are shown as ONE line with the
 * exact changed words highlighted inline (word-level diff).
 */
type Row = { kind: 'same' | 'del' | 'add'; text: string } | { kind: 'changed'; words: DiffSegment[] };

/** Turn a line diff into rows, pairing each replaced line with its replacement for a word-level diff. */
function buildRows(segs: DiffSegment[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  while (i < segs.length) {
    if (segs[i].type === 'same') { rows.push({ kind: 'same', text: segs[i].text }); i++; continue; }
    const dels: string[] = [];
    while (i < segs.length && segs[i].type === 'del') { dels.push(segs[i].text); i++; }
    const adds: string[] = [];
    while (i < segs.length && segs[i].type === 'add') { adds.push(segs[i].text); i++; }
    const pairs = Math.min(dels.length, adds.length);
    for (let k = 0; k < pairs; k++) rows.push({ kind: 'changed', words: diffWords(dels[k], adds[k]) });
    for (let k = pairs; k < dels.length; k++) rows.push({ kind: 'del', text: dels[k] });
    for (let k = pairs; k < adds.length; k++) rows.push({ kind: 'add', text: adds[k] });
  }
  return rows;
}

/** Extract plain text from a loaded file, in-browser. Heavy libs are lazy-loaded. */
async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (file.type === 'application/pdf' || name.endsWith('.pdf')) {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
    const buf = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: buf }).promise;
    const parts: string[] = [];
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      parts.push(tc.items.map((it) => ('str' in it ? it.str : '')).join(' '));
    }
    return parts.join('\n').trim();
  }
  if (name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const mod = await import('mammoth/mammoth.browser.js');
    const mammoth = (mod as { extractRawText?: unknown; default?: unknown }).extractRawText ? mod : (mod as { default: typeof mod }).default;
    const buf = await file.arrayBuffer();
    const res = await (mammoth as { extractRawText: (o: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }> }).extractRawText({ arrayBuffer: buf });
    return (res.value || '').trim();
  }
  // .txt / .md / anything else readable as text
  return (await file.text()).trim();
}

interface SideProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onLoad: (f: File) => void;
  fileName: string;
  busy: boolean;
}

function Side({ label, value, onChange, onLoad, fileName, busy }: SideProps) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</span>
        <button type="button" onClick={() => input.current?.click()} disabled={busy}
          className="inline-flex min-h-[40px] items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-700 px-3.5 text-[11px] font-black text-slate-600 dark:text-slate-200 hover:bg-slate-200 disabled:opacity-50">
          {busy ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />} Load file
        </button>
        <input ref={input} type="file" accept=".txt,.md,.pdf,.docx,application/pdf,text/plain" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onLoad(f); e.target.value = ''; }} />
      </div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false}
        placeholder="Paste text here, or load a PDF / DOCX / TXT file…"
        className="h-56 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[13px] leading-relaxed outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
      {fileName && <p className="mt-1 truncate text-[11px] text-slate-400">Loaded: {fileName}</p>}
    </div>
  );
}

export default function ComparePage() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [busyA, setBusyA] = useState(false);
  const [busyB, setBusyB] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DiffSegment[] | null>(null);

  const load = async (which: 'a' | 'b', file: File) => {
    setError('');
    if (file.size > MAX_PDF_BYTES) { setError(`“${file.name}” is ${formatBytes(file.size)} — please use files under ${formatBytes(MAX_PDF_BYTES)}.`); return; }
    const setBusy = which === 'a' ? setBusyA : setBusyB;
    setBusy(true);
    try {
      const text = await extractText(file);
      if (which === 'a') { setA(text); setNameA(file.name); } else { setB(text); setNameB(file.name); }
      if (!text) setError(`No selectable text found in “${file.name}”. A scanned/image PDF has no text layer to compare.`);
    } catch {
      setError(`Could not read “${file.name}”. Please check it is a valid PDF, DOCX or text file.`);
    } finally {
      setBusy(false);
    }
  };

  const compare = () => {
    setError('');
    try {
      setResult(diffLines(a, b));
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : 'Could not compare these documents.');
    }
  };

  const clearAll = () => { setA(''); setB(''); setNameA(''); setNameB(''); setResult(null); setError(''); };

  const stats = useMemo(() => (result ? diffStats(result) : null), [result]);
  const rows = useMemo(() => (result ? buildRows(result) : []), [result]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Compare Text & Documents Online — Free Diff Checker | Syllab.in"
        description="Free online tool to compare two texts or documents and highlight the differences word by word. Paste text or load a PDF, Word (DOCX) or TXT file — everything runs privately in your browser, nothing is uploaded. See exactly what was added and removed."
        keywords="compare text online, text diff, diff checker, compare two documents, compare pdf free, compare word documents, find differences between two texts, online diff tool, word level diff"
        url={`${SITE}/compare`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Compare (Diff Checker)', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: `${SITE}/compare`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Are my documents uploaded when I compare them?', acceptedAnswer: { '@type': 'Answer', text: 'No. Both texts are compared entirely in your browser — PDF and DOCX text is extracted locally with pdf.js and mammoth. Your files never leave your device and are never uploaded.' } },
            { '@type': 'Question', name: 'Can I compare a PDF with a Word document?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Load a PDF on one side and a DOCX (or paste text) on the other. The tool extracts the plain text from each and highlights every added and removed line, down to the exact changed words.' } },
          ] },
        ]}
      />
      <PageHero emoji="🔍" title="Compare Text & Documents" subtitle="Paste text or load a PDF, Word or TXT file on each side and see exactly what changed — word by word." className="mb-3" />

      <p className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300"><ShieldCheck size={13} /> Private — your files never leave your browser</p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Side label="Original" value={a} onChange={setA} onLoad={(f) => load('a', f)} fileName={nameA} busy={busyA} />
        <Side label="Changed" value={b} onChange={setB} onLoad={(f) => load('b', f)} fileName={nameB} busy={busyB} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={compare} disabled={busyA || busyB || (!a && !b)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-40 transition">
          <ArrowLeftRight size={16} /> Compare
        </button>
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 px-4 py-2.5 text-sm font-black text-slate-600 dark:text-slate-200 hover:bg-slate-200 transition">
          <Trash2 size={15} /> Clear
        </button>
      </div>

      {error && <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700">{error}</p>}

      {result && stats && (
        <div className="mt-5 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs font-black">
            {stats.identical
              ? <span className="text-emerald-600">✓ The two texts are identical</span>
              : <><span className="text-emerald-600">+{stats.added} added</span><span className="text-rose-500">&minus;{stats.removed} removed</span><span className="text-slate-400">{stats.same} unchanged</span><span className="text-amber-500">changed words highlighted</span></>}
          </div>
          <div className="max-h-[28rem] overflow-auto bg-white dark:bg-slate-900">
            <pre className="m-0 p-0 font-mono text-[12.5px] leading-relaxed">
              {rows.map((row, i) => {
                if (row.kind === 'changed') {
                  return (
                    <div key={i} className="whitespace-pre-wrap break-words bg-amber-50 dark:bg-amber-950/30 px-3">
                      <span className="select-none text-amber-500">&plusmn; </span>
                      {row.words.map((w, k) => (
                        <span key={k} className={
                          w.type === 'del' ? 'rounded bg-rose-200/70 text-rose-800 line-through dark:bg-rose-900/50 dark:text-rose-200'
                            : w.type === 'add' ? 'rounded bg-emerald-200/70 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
                              : 'text-slate-600 dark:text-slate-300'
                        }>{w.text}</span>
                      ))}
                    </div>
                  );
                }
                return (
                  <div key={i}
                    className={
                      row.kind === 'add' ? 'whitespace-pre-wrap break-words bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-3'
                        : row.kind === 'del' ? 'whitespace-pre-wrap break-words bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-3'
                          : 'whitespace-pre-wrap break-words text-slate-600 dark:text-slate-300 px-3'
                    }>
                    <span className="select-none text-slate-400">{row.kind === 'add' ? '+ ' : row.kind === 'del' ? '− ' : '  '}</span>
                    {row.text || ' '}
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      )}

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">A private diff checker for text, PDF and Word files</h2>
        <p>Paste two versions of an essay, answer or contract — or load a <strong>PDF, Word (DOCX) or TXT</strong> file into each side — and this tool highlights every <strong>added</strong> and <strong>removed</strong> line, and within a changed line it highlights the <strong>exact words</strong> that changed. The text from PDFs and Word documents is extracted right in your browser (with pdf.js and mammoth), so nothing is ever uploaded.</p>
        <p>100% free, no sign-up. Need to edit a PDF instead? Try the free <a href="/pdf-tools" className="font-bold text-primary hover:underline">PDF Tools</a>, or jot ideas in the private <a href="/notes" className="font-bold text-primary hover:underline">Notepad</a>.</p>
      </section>

      <ToolRelated current="/compare" />
    </div>
  );
}
