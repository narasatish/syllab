/**
 * ContrastCheckerPage.tsx — free WCAG colour contrast checker. Pick a foreground
 * and background colour; see the contrast ratio, a live preview, and AA/AAA
 * pass-fail pills. Pure client-side (src/lib/webUtils). Indexable SEO page.
 */
import { useState } from 'react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { contrastRatio, wcagLevels } from '../lib/webUtils';

const SITE = 'https://syllab.in';

function Pill({ label, pass }: { label: string; pass: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${pass ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'}`}>
      {pass ? '✓' : '✕'} {label}
    </span>
  );
}

export default function ContrastCheckerPage() {
  const [fg, setFg] = useState('#1e293b');
  const [bg, setBg] = useState('#ffffff');

  const ratio = contrastRatio(fg, bg);
  const levels = ratio != null ? wcagLevels(ratio) : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO
        title="Colour Contrast Checker (WCAG) — Free AA / AAA Test | Syllab.in"
        description="Free WCAG colour contrast checker. Pick a text and background colour to see the contrast ratio and whether it passes WCAG AA and AAA for normal and large text, with a live preview. Runs in your browser."
        keywords="color contrast checker, wcag contrast checker, contrast ratio calculator, aa aaa contrast, accessibility contrast, text background contrast, colour contrast checker"
        url={`${SITE}/contrast-checker`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Colour Contrast Checker', applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE}/contrast-checker`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="🎨" title="Colour Contrast Checker" subtitle="Check text vs background contrast against WCAG AA and AAA — with a live preview." className="mb-6" />

      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Foreground (text)</span>
            <div className="mt-1.5 flex items-center gap-2">
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} aria-label="Foreground colour" className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200 bg-transparent dark:border-slate-700" />
              <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base uppercase outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
            </div>
          </label>
          <label className="block"><span className="text-[11px] font-black uppercase tracking-wide text-slate-500">Background</span>
            <div className="mt-1.5 flex items-center gap-2">
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} aria-label="Background colour" className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200 bg-transparent dark:border-slate-700" />
              <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base uppercase outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
            </div>
          </label>
        </div>

        {/* Live preview */}
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center" style={{ backgroundColor: bg, color: fg }}>
          <p className="text-lg font-black">The quick brown fox</p>
          <p className="text-sm">jumps over the lazy dog · 0123456789</p>
        </div>

        {ratio != null && levels ? (
          <div className="mt-4">
            <div className="text-center">
              <span className="text-4xl font-black text-slate-900 dark:text-slate-100">{ratio.toFixed(2)}</span>
              <span className="text-lg font-black text-slate-400">:1</span>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Pill label="AA normal (≥4.5)" pass={levels.aaNormal} />
              <Pill label="AA large (≥3)" pass={levels.aaLarge} />
              <Pill label="AAA (≥7)" pass={levels.aaa} />
            </div>
          </div>
        ) : (
          <p className="mt-4 text-center text-sm font-bold text-rose-600">Enter two valid hex colours (e.g. #1e293b).</p>
        )}
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">What the WCAG contrast ratios mean</h2>
        <p>The contrast ratio ranges from <strong>1:1</strong> (identical) to <strong>21:1</strong> (black on white). WCAG asks for at least <strong>4.5:1</strong> for normal text (AA), <strong>3:1</strong> for large text, and <strong>7:1</strong> for the stricter AAA level. Higher is easier to read, especially for low-vision users. This checker uses the official relative-luminance formula.</p>
      </section>

      <ToolRelated current="/contrast-checker" />
    </div>
  );
}
