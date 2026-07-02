import React from 'react';
import { cn } from '../lib/utils';

export interface HubNavItem {
  label: string;
  emoji: string;
  path: string;
  tab: string;
}

export interface HubNavProps {
  items: HubNavItem[];
  active: string;
  onNavigate?: (tab: string) => void;
  label?: string; // Eyebrow label above the pills
}

export default function HubNav({ items, active, onNavigate, label }: HubNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: HubNavItem) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item.tab);
      // Also update URL via history for shareable links
      if (window.location.pathname !== item.path) {
        window.history.pushState({ syllabNav: true }, '', item.path);
      }
    }
  };

  return (
    <div className="mb-6">
      {label && (
        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 px-4">
          {label}
        </p>
      )}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 pb-2 min-w-min">
          {items.map((item) => {
            const isActive = active === item.tab;
            return (
              <a
                key={item.tab}
                href={item.path}
                onClick={(e) => handleClick(e, item)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap',
                  'font-black text-xs uppercase tracking-wide transition-colors',
                  'min-h-[44px] min-w-[44px] flex items-center justify-center', // Mobile a11y targets
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                )}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
