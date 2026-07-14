/**
 * UnitConverter.tsx — free unit converter for students (length, mass, time,
 * area, volume, speed, energy, pressure, digital storage, temperature). Pure
 * client-side (lib/unitConverter.ts). Indexable SEO page.
 */
import { useMemo, useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { CATEGORIES, convert, fmt } from '../lib/unitConverter';

const SITE = 'https://syllab.in';

export default function UnitConverter() {
  const [catId, setCatId] = useState('length');
  const cat = useMemo(() => CATEGORIES.find((c) => c.id === catId)!, [catId]);
  const [from, setFrom] = useState(cat.units[0].id);
  const [to, setTo] = useState(cat.units[1].id);
  const [value, setValue] = useState('1');
  const [copied, setCopied] = useState(false);

  const pickCategory = (id: string) => {
    const c = CATEGORIES.find((x) => x.id === id)!;
    setCatId(id); setFrom(c.units[0].id); setTo(c.units[1]?.id || c.units[0].id);
  };
  const swap = () => { setFrom(to); setTo(from); };

  const n = Number(value);
  const valid = value.trim() !== '' && Number.isFinite(n);
  const result = valid ? convert(n, from, to, catId) : NaN;
  const fromLabel = cat.units.find((u) => u.id === from)?.label || from;
  const toLabel = cat.units.find((u) => u.id === to)?.label || to;

  const copy = async () => {
    if (!valid || Number.isNaN(result)) return;
    try { await navigator.clipboard.writeText(`${n} ${fromLabel} = ${fmt(result)} ${toLabel} — via syllab.in/unit-converter`); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };

  const selCls = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Free Unit Converter — Length, Mass, Temperature, Speed & More | Syllab.in"
        description="Free online unit converter for students: length, mass, time, area, volume, speed, energy, pressure, temperature (°C/°F/K) and digital storage. Instant, accurate, no signup — for physics, chemistry & maths."
        keywords="unit converter, unit conversion, cm to inches, kg to pounds, celsius to fahrenheit, km/h to m/s, litre to ml, unit converter for physics, metric conversion India"
        url={`${SITE}/unit-converter`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Unit Converter', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/unit-converter`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="📐" title="Unit Converter" subtitle="Convert length, mass, temperature, speed, energy and more — instantly and accurately. Free, no signup." className="mb-6" />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" onClick={() => pickCategory(c.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${catId === c.id ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label className="block"><span className="text-xs font-bold text-slate-500">From</span>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className={selCls}>
                {cat.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </label>
            <input type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter a value"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-lg font-black outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
          </div>

          <button type="button" onClick={swap} aria-label="Swap units" className="mx-auto my-1 rounded-full bg-slate-100 dark:bg-slate-700 p-2.5 text-slate-500 hover:bg-primary hover:text-white transition sm:mb-2"><ArrowLeftRight size={16} /></button>

          <div>
            <label className="block"><span className="text-xs font-bold text-slate-500">To</span>
              <select value={to} onChange={(e) => setTo(e.target.value)} className={selCls}>
                {cat.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </label>
            <div className="mt-2 w-full rounded-xl bg-primary/10 dark:bg-primary/20 px-3 py-2.5 text-lg font-black text-primary dark:text-emerald-300 truncate">
              {valid && !Number.isNaN(result) ? fmt(result) : '—'}
            </div>
          </div>
        </div>

        {valid && !Number.isNaN(result) && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-slate-500">{fmt(n)} {fromLabel.replace(/\s*\(.*\)/, '')} = <span className="text-slate-800 dark:text-slate-200">{fmt(result)}</span> {toLabel.replace(/\s*\(.*\)/, '')}</p>
            <button type="button" onClick={copy} className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-primary">{copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}</button>
          </div>
        )}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">A quick, accurate unit converter for students</h2>
        <p>Convert between metric and imperial units across ten categories — length (cm, m, km, inch, foot, mile), mass (g, kg, pound, ounce), temperature (Celsius, Fahrenheit, Kelvin), speed (m/s, km/h, mph), energy (joule, calorie, kWh), pressure (Pa, atm, bar, psi), area, volume, time and digital storage. Perfect for physics and chemistry numericals, lab work and everyday maths.</p>
        <p>Every conversion uses exact factors (for example 1 inch = 2.54 cm, 1 pound = 0.45359237 kg, and °F = °C × 9⁄5 + 32). It runs entirely in your browser — free, instant, no sign-up. Need marks maths too? Try the free <a href="/calculators" className="font-bold text-primary hover:underline">student calculators</a>.</p>
      </section>
    </div>
  );
}
