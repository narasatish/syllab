/**
 * Cutoffs.tsx — engineering-cutoff explorer. Filters the verified college
 * directory by admission exam (and optional search) and shows each college's
 * indicative closing cutoff, NIRF rank and average package in one sortable
 * table. All figures come from the existing directory (colleges.ts) — nothing
 * is invented; the page just re-presents them in a cutoff-first view.
 */
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { COLLEGES, stateSlugForCollege } from '../data/colleges';

const SITE = 'https://syllab.in';

// Exams worth surfacing as quick filters, in a sensible order. Any exam present
// in the data but not listed here still appears via search.
const EXAM_ORDER = ['JEE Advanced', 'JEE Main', 'BITSAT', 'NEET', 'MHT-CET', 'KCET', 'COMEDK', 'WBJEE', 'AP EAPCET', 'TS EAPCET', 'VITEEE'];

export default function Cutoffs() {
  // Navigate within the SPA: push the URL and fire popstate so App re-resolves
  // the active tab (it listens on 'popstate'). No full reload.
  const navigate = (to: string) => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // All exams that actually appear in the directory, ordered.
  const exams = useMemo(() => {
    const set = new Set<string>();
    for (const c of COLLEGES) for (const e of c.exams) set.add(e);
    const present = [...set];
    const ordered = EXAM_ORDER.filter((e) => present.includes(e));
    const rest = present.filter((e) => !EXAM_ORDER.includes(e)).sort();
    return [...ordered, ...rest];
  }, []);

  const [exam, setExam] = useState<string>('JEE Main');
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return COLLEGES
      .filter((c) => c.exams.includes(exam))
      .filter((c) => !query || c.name.toLowerCase().includes(query) || c.city.toLowerCase().includes(query) || c.state.toLowerCase().includes(query))
      .sort((a, b) => (a.nirf ?? Infinity) - (b.nirf ?? Infinity));
  }, [exam, q]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title={`Engineering College Cutoffs 2026 — JEE Main, NEET & State Exams | Syllab.in`}
        description="Browse indicative closing cutoffs for top engineering colleges by exam — JEE Main, JEE Advanced, BITSAT, MHT-CET, KCET, WBJEE, EAPCET and more. Compare cutoff, NIRF rank and average package in one table. Free."
        keywords="engineering college cutoff 2026, JEE Main cutoff colleges, JEE Advanced cutoff, NIT cutoff, MHT-CET cutoff, KCET cutoff, WBJEE cutoff, closing rank engineering colleges, college cutoff list India"
        url={`${SITE}/cutoffs`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Engineering College Cutoffs', url: `${SITE}/cutoffs`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="🎯" title="Engineering College Cutoffs" subtitle="Pick an exam to see indicative closing cutoffs, NIRF rank & placements for top colleges — all in one table. Free." className="mb-6" />

      {/* Exam filter */}
      <div className="flex flex-wrap gap-2">
        {exams.map((e) => (
          <button key={e} type="button" onClick={() => setExam(e)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${exam === e ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {e}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-4 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search college, city or state…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary focus:bg-white dark:bg-slate-900 dark:border-slate-700" />
      </div>

      <p className="mt-3 text-xs font-bold text-slate-400">{rows.length} colleges admit via {exam}. Figures are indicative (2024) — verify on official counselling sites.</p>

      {/* Cutoff table */}
      <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wide text-slate-400">
            <tr><th className="px-3 py-2">College</th><th className="px-3 py-2">NIRF</th><th className="px-3 py-2">Indicative cutoff</th><th className="px-3 py-2">Avg pkg</th></tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.slug} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-3 py-2">
                  <button onClick={() => navigate(`/colleges/${stateSlugForCollege(c)}/${c.slug}`)} className="text-left font-bold text-primary dark:text-emerald-400 hover:underline">{c.shortName || c.name}</button>
                  <div className="text-[11px] text-slate-500">{c.city}, {c.state}</div>
                </td>
                <td className="px-3 py-2 font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{c.nirf ? `#${c.nirf}` : '—'}</td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.cutoff}</td>
                <td className="px-3 py-2 font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{c.placementAvg}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="px-3 py-6 text-center text-sm text-slate-400">No colleges match — try another exam or clear the search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">How to read engineering cutoffs</h2>
        <p>A “cutoff” is the closing rank or score at which admission to a branch closed in the last round of counselling. A lower closing rank means a more competitive college/branch. Cutoffs shift every year with the number of applicants, seats and difficulty, so always treat them as indicative and confirm on the official counselling website (JoSAA/CSAB for NITs &amp; IIITs, or your state authority).</p>
        <p>Want a personalized estimate? Try the free <a href="/career-predictor" className="font-bold text-primary hover:underline">rank &amp; college predictor</a>, or browse <a href="/colleges" className="font-bold text-primary hover:underline">all colleges by state</a>.</p>
      </section>

      <ToolRelated current="/cutoffs" />
    </div>
  );
}
