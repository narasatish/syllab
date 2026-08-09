import { Home, BookOpen, Target, Bot, LayoutGrid } from 'lucide-react';
import { BOTTOM_NAV, activeIndexForTab, type BottomNavItem } from '../lib/bottomNav';

const ICONS = {
  home: Home,
  book: BookOpen,
  target: Target,
  bot: Bot,
  grid: LayoutGrid,
} as const;

interface Props {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

/**
 * Phone-only bottom tab bar.
 *
 * Hidden from `md` up — desktop already has the full header nav, and showing
 * both would be redundant chrome.
 *
 * Notes on the details that matter:
 *  - Real <a href> underneath, with onClick calling the SPA navigate and
 *    preventDefault. Crawlers and middle-click still see a normal link; the
 *    hrefs come from the same table the canonicals do.
 *  - pb-[env(safe-area-inset-bottom)] keeps it clear of the iPhone home bar.
 *  - min-h-[3.25rem] per target gives ~52px touch targets, above the 44px
 *    guideline, on a 360px-wide screen.
 *  - No entry animation and fixed positioning, so it contributes nothing to
 *    CLS — it is out of flow entirely.
 *  - When the current page is not one of these five, nothing is highlighted.
 *    Lighting up "Home" on an unrelated page would be a lie.
 */
export default function BottomTabBar({ activeTab, onNavigate }: Props) {
  const active = activeIndexForTab(activeTab);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden dark:border-slate-800 dark:bg-slate-900/95"
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {BOTTOM_NAV.map((item: BottomNavItem, i) => {
          const Icon = ICONS[item.icon];
          const isActive = i === active;
          return (
            <li key={item.tab} className="flex-1">
              <a
                href={item.path}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  // Let ctrl/cmd/middle-click open a real tab.
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  onNavigate(item.tab);
                }}
                className={
                  'flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] font-bold no-underline transition-colors ' +
                  (isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400')
                }
              >
                <Icon size={20} strokeWidth={isActive ? 2.6 : 2} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
