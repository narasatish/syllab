/**
 * Scholarships (/scholarships) — free, comprehensive list of scholarships for Indian
 * students (government, state, private, merit). A highly linkable/shareable resource
 * (backlink magnet) — schools, teachers and parents reference scholarship lists.
 */
import { useState } from 'react';
import { GraduationCap, ExternalLink, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { SCHOLARSHIPS } from '../data/scholarships';

const SITE = 'https://syllab.in';
const CATS = ['All', 'Government', 'State', 'Private', 'Merit'];

export default function Scholarships() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? SCHOLARSHIPS : SCHOLARSHIPS.filter((s) => s.category === cat);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Scholarships for Students in India 2026 — Govt, State & Private (Free List) | Syllab.in"
        description="Free, updated list of scholarships for Indian students — NSP pre/post-matric, NMMS, PM YASASVI, INSPIRE, AICTE Pragati/Saksham, Reliance, Tata & more. Eligibility, amount, deadlines and how to apply."
        keywords="scholarships for students India 2026, NSP scholarship, NMMS scholarship, INSPIRE scholarship, PM YASASVI, AICTE Pragati scholarship, private scholarships India, scholarship for class 10 12 students, scholarship.gov.in list"
        url={`${SITE}/scholarships`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Scholarships for Students in India', url: `${SITE}/scholarships`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="💰" title="Scholarships for Students in India" subtitle="Government, state & private scholarships — who's eligible, how much, deadlines, and how to apply. Free, no signup." className="mb-6" />

      <div className="mb-4 flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <span>Amounts & windows are <strong>indicative</strong> — always confirm eligibility & dates on the official portal before applying.</span>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Filter size={15} className="text-slate-400" />
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1.5 text-xs font-black transition-colors ${cat === c ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>{c}</button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((s) => (
          <div key={s.slug} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{s.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-black text-slate-900 dark:text-slate-100">{s.name}</h2>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{s.category}</span>
                  {s.level ? <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">{s.level}</span> : null}
                </div>
                <p className="mt-0.5 text-[11px] font-bold text-slate-400">{s.provider}</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{s.forWhom}</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  <Fact label="Benefit" value={s.amount} />
                  <Fact label="When to apply" value={s.window} />
                  <Fact label="How" value={s.howToApply} />
                </div>
                {s.official ? (
                  <a href={`https://${s.official.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-black text-primary hover:underline dark:text-emerald-400">
                    <ExternalLink size={12} /> {s.official.replace(/^https?:\/\//, '')}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <GraduationCap size={18} className="text-emerald-600" />
        <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Most government scholarships are applied for free at the National Scholarship Portal (scholarships.gov.in). Never pay an agent to apply.</p>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/40"><p className="text-[9px] font-bold uppercase text-slate-400">{label}</p><p className="mt-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">{value}</p></div>;
}
