/**
 * PeriodicTable.tsx — free interactive periodic table. Renders all 118 elements
 * in the standard 18-column IUPAC layout (with the lanthanide/actinide strips),
 * coloured by category; tap any element for its full details. Pure client-side
 * (data/periodicTable.ts). Indexable SEO page.
 */
import { useMemo, useState } from 'react';
import { X, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { ELEMENTS, type Element } from '../data/periodicTable';

const SITE = 'https://syllab.in';

const CATEGORY: Record<Element['category'], { label: string; cls: string }> = {
  'alkali-metal': { label: 'Alkali metal', cls: 'bg-rose-100 text-rose-800 border-rose-200' },
  'alkaline-earth-metal': { label: 'Alkaline earth metal', cls: 'bg-orange-100 text-orange-800 border-orange-200' },
  'transition-metal': { label: 'Transition metal', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  'post-transition-metal': { label: 'Post-transition metal', cls: 'bg-lime-100 text-lime-800 border-lime-200' },
  'metalloid': { label: 'Metalloid', cls: 'bg-teal-100 text-teal-800 border-teal-200' },
  'reactive-nonmetal': { label: 'Reactive nonmetal', cls: 'bg-sky-100 text-sky-800 border-sky-200' },
  'noble-gas': { label: 'Noble gas', cls: 'bg-violet-100 text-violet-800 border-violet-200' },
  'lanthanide': { label: 'Lanthanide', cls: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200' },
  'actinide': { label: 'Actinide', cls: 'bg-pink-100 text-pink-800 border-pink-200' },
  'unknown': { label: 'Unknown properties', cls: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export default function PeriodicTable() {
  const [selected, setSelected] = useState<Element | null>(null);
  const [q, setQ] = useState('');

  const match = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return null;
    return new Set(ELEMENTS.filter((e) =>
      e.name.toLowerCase().includes(s) || e.symbol.toLowerCase() === s || String(e.z) === s
    ).map((e) => e.z));
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SEO
        title="Interactive Periodic Table of Elements (2026) — Free | Syllab.in"
        description="Free interactive periodic table with all 118 elements — tap any element for its atomic number, symbol, atomic mass, category, group, period, electron configuration and state. For CBSE, NCERT chemistry, JEE & NEET."
        keywords="periodic table, interactive periodic table, periodic table of elements, 118 elements, atomic mass, electron configuration, periodic table for JEE NEET, chemistry periodic table free"
        url={`${SITE}/periodic-table`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Interactive Periodic Table', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/periodic-table`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="⚛️" title="Interactive Periodic Table" subtitle="All 118 elements — tap any element for its atomic mass, category, group, period, electron configuration and state. Free." className="mb-5" />

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search element, symbol or number…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
      </div>

      {/* Grid (scrolls horizontally on small screens) */}
      <div className="overflow-x-auto pb-3">
        <div className="grid gap-1 min-w-[820px]" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {ELEMENTS.map((e) => {
            const c = CATEGORY[e.category];
            const dim = match && !match.has(e.z);
            return (
              <button key={e.z} type="button" onClick={() => setSelected(e)}
                style={{ gridColumn: e.xpos, gridRow: e.ypos }}
                title={`${e.name} — ${c.label}`}
                className={`aspect-square rounded-md border p-0.5 text-left transition ${c.cls} ${dim ? 'opacity-25' : 'hover:scale-[1.08] hover:z-10 hover:shadow-md'}`}>
                <div className="text-[7px] font-bold leading-none opacity-70">{e.z}</div>
                <div className="text-center text-[13px] font-black leading-tight">{e.symbol}</div>
                <div className="hidden sm:block text-center text-[6px] leading-none truncate opacity-80">{e.name}</div>
              </button>
            );
          })}
          {/* Small labels linking the f-block strips to the main table */}
          <div style={{ gridColumn: 3, gridRow: 6 }} className="flex items-center justify-center rounded-md border border-dashed border-fuchsia-200 text-[8px] font-bold text-fuchsia-500">57–71</div>
          <div style={{ gridColumn: 3, gridRow: 7 }} className="flex items-center justify-center rounded-md border border-dashed border-pink-200 text-[8px] font-bold text-pink-500">89–103</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {Object.values(CATEGORY).map((c) => (
          <span key={c.label} className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-2xl" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className={`flex h-20 w-20 flex-col items-center justify-center rounded-xl border ${CATEGORY[selected.category].cls}`}>
                <span className="text-[10px] font-bold opacity-70">{selected.z}</span>
                <span className="text-3xl font-black leading-none">{selected.symbol}</span>
                <span className="text-[9px] font-bold">{selected.mass}</span>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X size={18} /></button>
            </div>
            <h2 className="mt-3 text-xl font-black text-slate-900 dark:text-slate-100">{selected.name}</h2>
            <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] font-bold ${CATEGORY[selected.category].cls}`}>{CATEGORY[selected.category].label}</span>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Row k="Atomic number" v={String(selected.z)} />
              <Row k="Atomic mass" v={selected.mass} />
              <Row k="Group" v={selected.group ? String(selected.group) : '— (f-block)'} />
              <Row k="Period" v={String(selected.period)} />
              <Row k="State (STP)" v={selected.phase[0].toUpperCase() + selected.phase.slice(1)} />
              <Row k="Electron config." v={selected.config} />
            </dl>
          </div>
        </div>
      )}

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">The periodic table of elements</h2>
        <p>The periodic table arranges all 118 known chemical elements by increasing atomic number into 18 vertical <strong>groups</strong> and 7 horizontal <strong>periods</strong>. Elements in the same group share similar chemical properties because they have the same number of valence electrons. Tap any element above to see its atomic mass, category, group, period, state at room temperature and electron configuration — everything you need for CBSE/NCERT chemistry, JEE and NEET.</p>
        <p>The two rows below the main table are the <strong>lanthanides</strong> (elements 57–71) and <strong>actinides</strong> (89–103), the f-block. Colours group elements into families — alkali metals, alkaline earth metals, transition metals, metalloids, nonmetals, halogens (a reactive nonmetal family) and noble gases. Free, no sign-up. Make revision cards for tricky symbols with the free <a href="/flashcards" className="font-bold text-primary hover:underline">flashcards tool</a>.</p>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-slate-50 dark:border-slate-700 pb-1">
      <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{k}</dt>
      <dd className="font-bold text-slate-800 dark:text-slate-100">{v}</dd>
    </div>
  );
}
