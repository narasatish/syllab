/**
 * CsvToJsonPage.tsx — free CSV → JSON converter. Paste CSV; the first row becomes
 * the object keys and each following row an object. Quote-aware parsing handles
 * commas inside "quoted, fields". Pure client-side (src/lib/webUtils). SEO page.
 */
import { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { csvToJson } from '../lib/webUtils';

const SITE = 'https://syllab.in';
const SAMPLE = 'name,city,score\nAsha,"New Delhi, DL",92\nRavi,Mumbai,88';

export default function CsvToJsonPage() {
  const [csv, setCsv] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const { json, count, error } = useMemo(() => {
    if (!csv.trim()) return { json: '', count: 0, error: '' };
    try {
      const rows = csvToJson(csv);
      return { json: JSON.stringify(rows, null, 2), count: rows.length, error: rows.length ? '' : 'Add a header row and at least one data row.' };
    } catch {
      return { json: '', count: 0, error: 'Could not parse that CSV.' };
    }
  }, [csv]);

  const copy = async () => {
    if (!json) return;
    try { await navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };

  const taCls = 'h-64 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[13px] leading-relaxed outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="CSV to JSON Converter — Free & Private (In Your Browser) | Syllab.in"
        description="Free CSV to JSON converter that runs entirely in your browser — nothing uploaded. Paste CSV and get pretty-printed JSON, with quote-aware parsing that handles commas inside quoted fields. Copy with one click."
        keywords="csv to json, csv to json converter, convert csv to json, csv json online, csv parser, csv to json free, spreadsheet to json"
        url={`${SITE}/csv-to-json`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab CSV to JSON Converter', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE}/csv-to-json`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="🔀" title="CSV → JSON Converter" subtitle="Paste CSV and get clean JSON — quote-aware, private, in your browser." className="mb-6" />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col">
          <span className="mb-1.5 text-[11px] font-black uppercase tracking-wide text-slate-500">CSV in</span>
          <textarea value={csv} onChange={(e) => setCsv(e.target.value)} spellCheck={false} placeholder="name,age&#10;Asha,12" className={taCls} />
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wide text-slate-500">JSON out {count ? `· ${count} row${count === 1 ? '' : 's'}` : ''}</span>
            <button type="button" onClick={copy} disabled={!json} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 px-3.5 text-[11px] font-black text-slate-600 dark:text-slate-200 hover:bg-slate-200 disabled:opacity-40">
              {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
            </button>
          </div>
          <textarea readOnly value={error && !json ? '' : json} placeholder="[ ]" className={taCls} />
        </div>
      </div>
      {error && <p className="mt-3 text-sm font-bold text-rose-600">{error}</p>}

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">CSV to JSON, done right and private</h2>
        <p>The first CSV row becomes the JSON keys and every row after it becomes an object. The parser is <strong>quote-aware</strong>, so commas inside <code>"quoted, fields"</code> and escaped <code>""</code> quotes are handled correctly. Everything runs in your browser — your data is never uploaded.</p>
      </section>

      <ToolRelated current="/csv-to-json" />
    </div>
  );
}
