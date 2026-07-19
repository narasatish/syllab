/**
 * RomanNumeralsPage.tsx — free two-way Roman numeral converter. Number → Roman
 * (1–3999) and Roman → number, both live as you type, with friendly validation.
 * Pure client-side (src/lib/webUtils). Indexable SEO page.
 */
import { useState } from 'react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { toRoman, fromRoman } from '../lib/webUtils';

const SITE = 'https://syllab.in';
const inputCls = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

export default function RomanNumeralsPage() {
  const [num, setNum] = useState('2024');
  const [rom, setRom] = useState('LIV');

  const numTrimmed = num.trim();
  const romanOut = numTrimmed === '' ? null : toRoman(Number(numTrimmed));
  const numError = numTrimmed !== '' && romanOut === null;

  const romTrimmed = rom.trim();
  const numberOut = romTrimmed === '' ? null : fromRoman(romTrimmed);
  const romError = romTrimmed !== '' && numberOut === null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO
        title="Roman Numeral Converter — Number ⇄ Roman (1–3999) Free | Syllab.in"
        description="Free two-way Roman numeral converter. Convert any number from 1 to 3999 into Roman numerals and Roman numerals back into numbers, live as you type, with validation. No signup, works in your browser."
        keywords="roman numeral converter, number to roman numerals, roman numerals to number, roman numeral translator, convert roman numerals, 1 to 3999 roman numerals"
        url={`${SITE}/roman-numerals`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Roman Numeral Converter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/roman-numerals`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="Ⅹ" title="Roman Numeral Converter" subtitle="Convert numbers to Roman numerals and back — both directions, live as you type." className="mb-6" />

      <div className="space-y-5">
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
          <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Number → Roman</span>
            <input type="text" inputMode="numeric" value={num} onChange={(e) => setNum(e.target.value)} placeholder="1 – 3999" className={`mt-1.5 ${inputCls}`} /></label>
          {numError
            ? <p className="mt-2 text-sm font-bold text-rose-600">Enter a whole number from 1 to 3999.</p>
            : romanOut && <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-3 text-center text-2xl font-black tracking-widest text-emerald-700 dark:text-emerald-300">{romanOut}</div>}
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
          <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Roman → Number</span>
            <input type="text" value={rom} onChange={(e) => setRom(e.target.value.toUpperCase())} placeholder="e.g. MMXXIV" className={`mt-1.5 uppercase tracking-widest ${inputCls}`} /></label>
          {romError
            ? <p className="mt-2 text-sm font-bold text-rose-600">Not a valid Roman numeral (use only M D C L X V I in legal form).</p>
            : numberOut != null && <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-3 text-center text-3xl font-black text-emerald-700 dark:text-emerald-300">{numberOut}</div>}
        </div>
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">How Roman numerals work</h2>
        <p>Roman numerals use seven letters — <strong>I (1), V (5), X (10), L (50), C (100), D (500), M (1000)</strong>. A smaller value before a larger one is subtracted (IV = 4, IX = 9, XL = 40), otherwise values add up. This converter validates both directions, so it rejects impossible forms like “IIII” or “IC”. Standard Roman numerals go from 1 to 3999.</p>
      </section>

      <ToolRelated current="/roman-numerals" />
    </div>
  );
}
