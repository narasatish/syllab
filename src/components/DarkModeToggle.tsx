/**
 * Dark Mode Toggle
 * Uses localStorage to persist preference
 * Adds/removes 'dark' class on <html>
 */
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

const LS_DARK_MODE = 'syllab_dark_mode';

interface DarkModeToggleProps {
  className?: string;
  size?: number;
}

export default function DarkModeToggle({ className = '', size = 18 }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_DARK_MODE);
      if (saved !== null) return saved === 'true';
      // Default to LIGHT for everyone (ignore the OS setting) until the user
      // explicitly chooses dark. Their choice is then remembered permanently.
      return false;
    } catch {
      return false;
    }
  });

  // Sync to DOM and localStorage
  useEffect(() => {
    try {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      localStorage.setItem(LS_DARK_MODE, isDark.toString());
    } catch (e) {
      console.error('[dark-mode] sync failed', e);
    }
  }, [isDark]);

  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors',
        className
      )}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
}
