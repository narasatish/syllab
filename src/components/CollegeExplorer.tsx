/**
 * CollegeExplorer — phase-2 of the Career Compass: filter the whole college list
 * (by type / exam / search) and select up to 3 to compare side-by-side in a table.
 * Pure client-side over the existing COLLEGES data. Used on the Colleges index.
 */
import { useMemo, useState } from 'react';
import { Search, X, GitCompare, MapPin, ChevronRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { stateSlugForCollege, type CollegeFull } from '../data/colleges';

const TYPES = ['All', 'IIT', 'NIT/IIIT', 'Government', 'Private/Deemed'] as const;
const typeColor: Record<string, string> = {
  IIT: 'bg-rose-100 text-rose-700',
  'NIT/IIIT': 'bg-amber-100 text-amber-700',
  Government: 'bg-emerald-100 text-emerald-700',
  'Private/Deemed': 'bg-indigo-100 text-indigo-700',
};
const MAX_COMPARE = 3;

export default function CollegeExplorer({ colleges, go }: { colleges: CollegeFull[]; go: (to: string) => void }) {
  const [type, setType] = useState<(typeof TYPES)[number]>('All');
  const [exam, setExam] = useState('All');
  const [query, setQuery] = useState('');
  const [compare, setCompare] = useState<string[]>([]); // slugs
  const [showCompare, setShowCompare] = useState(false);

  const examOptions = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach((c) => c.exams.forEach((e) => set.add(e)));
    return ['All', ...Array.from(set).sort()];
  }, [colleges]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return colleges
      .filter((c) => (type === 'All' || c.type === type))
      .filter((c) => (exam === 'All' || c.exams.includes(exam)))
      .filter((c) => !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q))
      .sort((a, b) => (a.nirf ?? 999) - (b.nirf ?? 999));
  }, [colleges, type, exam, query]);

  const toggleCompare = (slug: string) => {
    setCompare((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length >= MAX_COMPARE ? prev : [...prev, slug]);
  };
  const compareCols = compare.map((s) => colleges.find((c) => c.slug === s)).filter(Boolean) as CollegeFull[];

  return (
    <div>
      {/* Filters */}
      <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={cn('rounded-full px-3 py-1.5 text-xs font-black transition-colors', type === t ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
              {t === 'NIT/IIIT' ? 'NIT / IIIT' : t === 'Private/Deemed' ? 'Private' : t}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
            <Search size={15} className="text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search college, city or state…"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" />
            {query ? <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600"><X size={14} /></button> : null}
          </div>
          <select value={exam} onChange={(e) => setExam(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none">
            {examOptions.map((e) => <option key={e} value={e}>{e === 'All' ? 'All exams' : e}</option>)}
          </select>
        </div>
        <p className="mt-2 text-xs text-slate-400">{filtered.length} college{filtered.length === 1 ? '' : 's'} · tick up to {MAX_COMPARE} to compare</p>
      </div>

      {/* Comparison table */}
      {showCompare && compareCols.length >= 2 ? (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-indigo-200 bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-black text-indigo-900"><GitCompare size={15} /> Compare ({compareCols.length})</span>
            <button onClick={() => setShowCompare(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Close</button>
          </div>
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <tbody>
              {[
                ['College', (c: CollegeFull) => c.shortName || c.name],
                ['Type', (c: CollegeFull) => c.type],
                ['City', (c: CollegeFull) => `${c.city}, ${c.state}`],
                ['NIRF rank', (c: CollegeFull) => (c.nirf ? `#${c.nirf}` : '—')],
                ['Total fees', (c: CollegeFull) => c.feesTotal],
                ['Cutoff (top)', (c: CollegeFull) => c.cutoff],
                ['Avg package', (c: CollegeFull) => c.placementAvg],
                ['Highest', (c: CollegeFull) => c.placementHighest],
                ['Placement', (c: CollegeFull) => c.placementRate],
                ['Top branches', (c: CollegeFull) => c.topBranches.slice(0, 3).join(', ')],
              ].map(([label, fn], i) => (
                <tr key={i as number} className={i % 2 ? 'bg-slate-50' : ''}>
                  <th className="whitespace-nowrap border-b border-slate-100 px-2 py-1.5 text-left text-xs font-black uppercase tracking-wide text-slate-400">{label as string}</th>
                  {compareCols.map((c) => (
                    <td key={c.slug} className="border-b border-slate-100 px-2 py-1.5 align-top font-semibold text-slate-700">{(fn as (c: CollegeFull) => string)(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Results grid */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {filtered.slice(0, 60).map((c) => {
          const picked = compare.includes(c.slug);
          return (
            <div key={c.slug} className={cn('rounded-2xl border bg-white p-4 shadow-sm transition-all', picked ? 'border-indigo-400 ring-1 ring-indigo-300' : 'border-slate-100')}>
              <div className="flex items-start justify-between gap-2">
                <button onClick={() => go(`/colleges/${stateSlugForCollege(c)}/${c.slug}`)} className="min-w-0 text-left">
                  <h3 className="truncate font-black text-slate-900 hover:text-indigo-700">{c.shortName || c.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><MapPin size={11} /> {c.city}, {c.state}</p>
                </button>
                <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black', typeColor[c.type])}>{c.type}</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 py-1.5"><p className="text-[10px] font-bold text-slate-400">NIRF</p><p className="text-sm font-black text-slate-800">{c.nirf ? `#${c.nirf}` : '—'}</p></div>
                <div className="rounded-lg bg-slate-50 py-1.5"><p className="text-[10px] font-bold text-slate-400">Fees</p><p className="text-xs font-black text-slate-800">{c.feesTotal}</p></div>
                <div className="rounded-lg bg-slate-50 py-1.5"><p className="text-[10px] font-bold text-slate-400">Avg pkg</p><p className="text-xs font-black text-slate-800">{c.placementAvg}</p></div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <button onClick={() => go(`/colleges/${stateSlugForCollege(c)}/${c.slug}`)} className="inline-flex items-center gap-1 text-xs font-black text-indigo-700 hover:underline">Details <ChevronRight size={12} /></button>
                <button onClick={() => toggleCompare(c.slug)} disabled={!picked && compare.length >= MAX_COMPARE}
                  className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black transition-colors disabled:opacity-40',
                    picked ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                  {picked ? <><Check size={12} /> Added</> : <><GitCompare size={12} /> Compare</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length > 60 ? <p className="mt-3 text-center text-xs text-slate-400">Showing top 60 — refine with filters or search to narrow down.</p> : null}
      {!filtered.length ? <p className="mt-4 text-center text-sm text-slate-500">No colleges match these filters. Try clearing the search or exam filter.</p> : null}

      {/* Sticky compare tray */}
      {compare.length ? (
        <div className="sticky bottom-3 z-20 mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-indigo-900 p-3 text-white shadow-xl">
          <span className="text-xs font-black text-amber-300">Compare:</span>
          {compareCols.map((c) => (
            <span key={c.slug} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold">
              {c.shortName || c.name.slice(0, 18)}
              <button onClick={() => toggleCompare(c.slug)} className="text-white/60 hover:text-white"><X size={11} /></button>
            </span>
          ))}
          <div className="ml-auto flex gap-2">
            <button onClick={() => setCompare([])} className="rounded-full px-3 py-1.5 text-xs font-bold text-white/70 hover:text-white">Clear</button>
            <button onClick={() => setShowCompare(true)} disabled={compare.length < 2}
              className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black text-slate-900 hover:bg-amber-300 disabled:opacity-50">
              <GitCompare size={13} /> Compare {compare.length < 2 ? '(pick 2+)' : `(${compare.length})`}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
