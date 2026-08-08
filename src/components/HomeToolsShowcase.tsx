/**
 * HomeToolsShowcase.tsx — an attractive spotlight on Syllab's free tools, shown
 * on the home page. Driven by the shared toolsRegistry (single source of truth),
 * so every new tool appears here automatically. Cards navigate SPA-style via
 * pushState + popstate (App resolves the path to a tab), the same pattern the
 * ToolRelated strip uses — so it works without a path→tab map.
 */
import { TOOLS } from '../data/toolsRegistry';

// The freshest / highest-appeal tools get a "New" badge to draw the eye.
const NEW_PATHS = new Set<string>([
  '/image-to-text', '/compare', '/pdf-tools', '/notes', '/text-to-speech', '/everyday',
]);

function go(path: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== path) window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function HomeToolsShowcase() {
  return (
    <section className="reveal max-w-6xl mx-auto px-5 py-10">
      <div className="mb-1 flex items-center justify-center gap-2">
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">100% Free · No signup</span>
      </div>
      <h2 className="mb-1 text-center text-xl font-black text-slate-900 sm:text-2xl dark:text-slate-100">{TOOLS.length}+ free study &amp; utility tools</h2>
      <p className="mx-auto mb-6 max-w-xl text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        PDF &amp; image tools, OCR, a notepad, calculators, converters and more — most run <strong>100% in your browser</strong>, so your files never leave your device.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <a
            key={t.path}
            href={t.path}
            onClick={(e) => { e.preventDefault(); go(t.path); }}
            className="group relative flex min-w-0 flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            {NEW_PATHS.has(t.path) && (
              <span className="absolute right-2.5 top-2.5 rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-black uppercase tracking-wide text-white">New</span>
            )}
            <span className="text-2xl">{t.emoji}</span>
            <span className="mt-2 block text-sm font-black text-slate-800 group-hover:text-primary dark:text-slate-100">{t.title}</span>
            <span className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-slate-500">{t.desc}</span>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="/tools"
          onClick={(e) => { e.preventDefault(); go('/tools'); }}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow transition-transform hover:opacity-90 active:scale-95"
        >
          Explore all free tools →
        </a>
      </div>
    </section>
  );
}
