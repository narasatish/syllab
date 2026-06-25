/**
 * Worksheets — a free, printable worksheet library (tracing letters, numbers,
 * counting, shapes) generated as A4 SVGs with a syllab.in watermark. Browse by
 * category, preview, and download as PDF (print → Save as PDF).
 */
import { useMemo, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import PageHero from '../components/PageHero';
import { buildCatalog, type WorksheetCategory } from '../lib/worksheets';
import { printWorksheet } from '../lib/printWorksheet';
import { cn } from '../lib/utils';

// Display order for the category chips; any new category in the catalog still
// shows up (appended) even if it's missing here.
const CATEGORY_ORDER: WorksheetCategory[] = [
  'Letters', 'Phonics', 'Vocabulary', 'Reading', 'Writing',
  'Numbers & Counting', 'Simple Math', 'Shapes', 'Colors',
  'Science', 'Social & Emotional', 'Other Activities',
];

// Friendly, Syllab-original heading labels (the internal category keys stay
// stable; only the displayed wording changes so it isn't a copy of any one
// worksheet site). Emojis make the chips child-friendly.
const CATEGORY_LABELS: Record<WorksheetCategory, string> = {
  'Letters': '🔤 Alphabet Fun',
  'Phonics': '🔊 Sounds & Phonics',
  'Vocabulary': '💬 Word Power',
  'Reading': '📖 Story Time',
  'Writing': '✍️ Handwriting',
  'Numbers & Counting': '🔢 Count & Numbers',
  'Simple Math': '➕ Everyday Maths',
  'Shapes': '🔷 Shape Explorer',
  'Colors': '🎨 Colours & Art',
  'Science': '🔬 Science & Nature',
  'Social & Emotional': '💗 Feelings & Friends',
  'Other Activities': '🧠 Thinking Skills',
};
const label = (c: WorksheetCategory | 'All') => (c === 'All' ? '⭐ All' : CATEGORY_LABELS[c] ?? c);

export default function Worksheets() {
  const catalog = useMemo(() => buildCatalog(), []);
  const CATEGORIES = useMemo<(WorksheetCategory | 'All')[]>(() => {
    const present = new Set(catalog.map((w) => w.category));
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
    const extra = [...present].filter((c) => !CATEGORY_ORDER.includes(c));
    return ['All', ...ordered, ...extra];
  }, [catalog]);
  const [cat, setCat] = useState<WorksheetCategory | 'All'>('Letters');

  const shown = useMemo(
    () => (cat === 'All' ? catalog : catalog.filter((w) => w.category === cat)),
    [catalog, cat],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PageHero
        emoji="📝"
        title="Free Printable Worksheets"
        subtitle="Letters, phonics, vocabulary, reading, writing, numbers, maths, shapes, colours, science, social-emotional & more — print or download as PDF, free."
        className="mb-6"
      />

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-black transition-colors',
              cat === c ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
          >
            {label(c)} {c !== 'All' ? `(${catalog.filter((w) => w.category === c).length})` : `(${catalog.length})`}
          </button>
        ))}
      </div>

      {/* Worksheet grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((ws) => (
          <div key={ws.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            {/* A4 thumbnail */}
            <div
              className="aspect-[595/842] w-full overflow-hidden border-b border-slate-100 bg-slate-50 [&>svg]:h-full [&>svg]:w-full"
              role="img"
              aria-label={`Worksheet preview: ${ws.title}`}
              dangerouslySetInnerHTML={{ __html: ws.svg() }}
            />
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-900">{ws.emoji} {ws.title}</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label(ws.category)} · {ws.band}</p>
              </div>
              <button
                onClick={() => printWorksheet(ws.title, ws.svg())}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-black text-white hover:bg-emerald-600"
              >
                <Download size={14} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-4 text-center text-xs font-bold text-emerald-700">
        <Printer size={16} /> Tip: click <strong>PDF</strong> → choose “Save as PDF” (or print) → every sheet is free and watermarked syllab.in.
      </div>
    </div>
  );
}
