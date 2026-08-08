/**
 * TimestampPage.tsx — free Unix timestamp / epoch converter. Epoch → human date
 * (auto-detects seconds vs milliseconds) with a "Now" button, and date → epoch.
 * Pure client-side (src/lib/webUtils). Indexable SEO page.
 */
import { useState } from 'react';
import { Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { parseEpoch, dateToEpoch } from '../lib/webUtils';

const SITE = 'https://syllab.in';
const inputCls = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
      <span className="w-28 flex-shrink-0 text-[11px] font-black uppercase tracking-wide text-slate-500">{k}</span>
      <span className="break-all font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{v}</span>
    </div>
  );
}

export default function TimestampPage() {
  const [epoch, setEpoch] = useState('1700000000');
  const [dateStr, setDateStr] = useState('2024-01-01T00:00:00Z');

  const fromEpoch = epoch.trim() ? parseEpoch(epoch) : null;
  const epochError = epoch.trim() !== '' && fromEpoch === null;

  const toEpoch = dateStr.trim() ? dateToEpoch(dateStr) : null;
  const dateError = dateStr.trim() !== '' && toEpoch === null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO
        title="Unix Timestamp Converter — Epoch to Date & Back (Free) | Syllab.in"
        description="Free Unix timestamp / epoch converter. Convert an epoch (seconds or milliseconds, auto-detected) to a human-readable UTC and ISO 8601 date, or a date back to epoch. Includes a Now button. Runs in your browser."
        keywords="unix timestamp converter, epoch converter, epoch to date, timestamp to date, unix time, epoch time, iso 8601 converter, current unix timestamp"
        url={`${SITE}/timestamp`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Unix Timestamp Converter', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE}/timestamp`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="🕑" title="Unix Timestamp Converter" subtitle="Convert an epoch to a readable date and back — seconds or milliseconds, auto-detected." className="mb-6" />

      <div className="space-y-5">
        {/* Epoch → date */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-end gap-2">
            <label className="block flex-1"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Epoch → Date</span>
              <input type="text" inputMode="numeric" value={epoch} onChange={(e) => setEpoch(e.target.value)} placeholder="1700000000" className={`mt-1.5 ${inputCls}`} /></label>
            <button type="button" onClick={() => setEpoch(String(Math.floor(Date.now() / 1000)))} className="inline-flex h-[46px] items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-black text-white shadow hover:opacity-90 transition"><Clock size={15} /> Now</button>
          </div>
          {epochError
            ? <p className="mt-2 text-sm font-bold text-rose-600">Enter a numeric epoch (digits only).</p>
            : fromEpoch && (
              <div className="mt-3 space-y-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 p-3">
                <Field k="ISO 8601" v={fromEpoch.iso} />
                <Field k="UTC" v={fromEpoch.utc} />
                <Field k="Seconds" v={String(fromEpoch.seconds)} />
                <Field k="Millis" v={String(fromEpoch.ms)} />
              </div>
            )}
        </div>

        {/* Date → epoch */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
          <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Date → Epoch</span>
            <input type="text" value={dateStr} onChange={(e) => setDateStr(e.target.value)} placeholder="2024-01-01T00:00:00Z" className={`mt-1.5 ${inputCls}`} /></label>
          {dateError
            ? <p className="mt-2 text-sm font-bold text-rose-600">Couldn’t read that date. Try an ISO date like 2024-01-01T00:00:00Z.</p>
            : toEpoch && (
              <div className="mt-3 space-y-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 p-3">
                <Field k="Seconds" v={String(toEpoch.seconds)} />
                <Field k="Millis" v={String(toEpoch.ms)} />
              </div>
            )}
        </div>
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">About Unix time</h2>
        <p>A Unix timestamp (or epoch) is the number of seconds since <strong>1 January 1970 UTC</strong>. Ten-digit values are seconds; thirteen-digit values are milliseconds — this converter detects which automatically. Output is shown in ISO 8601 and a readable UTC string. All times are in UTC.</p>
      </section>

      <ToolRelated current="/timestamp" />
    </div>
  );
}
