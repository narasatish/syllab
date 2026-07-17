/**
 * ToolRelated.tsx — a small "Explore more free tools" strip shown at the bottom
 * of each tool page. Cross-links sibling tools (discovery + SEO interlinking)
 * and always offers a link back to the /tools hub. Uses real crawlable links
 * with SPA-friendly navigation.
 */
import { relatedTools } from '../data/toolsRegistry';

function go(path: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== path) window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function ToolRelated({ current, count = 3 }: { current: string; count?: number }) {
  const items = relatedTools(current, count);
  if (!items.length) return null;
  return (
    <section className="mt-10 border-t border-slate-100 dark:border-slate-700 pt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Explore more free tools</h2>
        <a href="/tools" onClick={(e) => { e.preventDefault(); go('/tools'); }} className="text-xs font-black text-primary hover:underline">All tools →</a>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((t) => (
          // min-w-0 is required on the grid item itself: grid/flex children default
          // to min-width:auto, so the nowrap `truncate` text below gives them a large
          // min-content width and they refuse to shrink into their track (they then
          // overflow and get clipped on narrow screens).
          <a key={t.path} href={t.path} onClick={(e) => { e.preventDefault(); go(t.path); }}
            className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 hover:border-primary/40 hover:shadow-sm transition">
            <span className="text-2xl">{t.emoji}</span>
            <span className="min-w-0">
              <span className="block text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors truncate">{t.title}</span>
              <span className="block text-[11px] text-slate-400 truncate">{t.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
