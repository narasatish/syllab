/**
 * InstallPrompt — shows a small "Install App" banner when the browser fires
 * the `beforeinstallprompt` event. Lets users install Syllab as a PWA on
 * their phone/desktop home screen.
 *
 * Behaviour:
 *  - Only renders if the browser exposes the install event AND the user
 *    hasn't dismissed it in the last 14 days (localStorage flag).
 *  - Tapping "Install" calls the native prompt; we don't fake it.
 *  - On iOS Safari (which doesn't fire beforeinstallprompt) we show a one-
 *    line hint pointing to the Share → Add to Home Screen flow.
 */
import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const LS_DISMISSED = 'syllab_install_dismissed_at';
const REMIND_AFTER_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function wasRecentlyDismissed(): boolean {
  try {
    const v = localStorage.getItem(LS_DISMISSED);
    if (!v) return false;
    const t = parseInt(v, 10);
    if (!Number.isFinite(t)) return false;
    return Date.now() - t < REMIND_AFTER_MS;
  } catch {
    return false;
  }
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  // Chrome / Android / desktop installed PWA
  if (window.matchMedia?.('(display-mode: standalone)').matches) return true;
  // iOS Safari home-screen launch
  return !!(window.navigator as any).standalone;
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [hidden, setHidden] = useState(() => isStandalone() || wasRecentlyDismissed());

  useEffect(() => {
    if (hidden) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener('beforeinstallprompt', onBIP);

    // iOS doesn't fire beforeinstallprompt — show a hint after a short delay
    if (isIOS() && !isStandalone()) {
      const t = window.setTimeout(() => setShowIosHint(true), 4000);
      return () => {
        window.removeEventListener('beforeinstallprompt', onBIP);
        window.clearTimeout(t);
      };
    }

    return () => window.removeEventListener('beforeinstallprompt', onBIP);
  }, [hidden]);

  const dismiss = () => {
    try { localStorage.setItem(LS_DISMISSED, String(Date.now())); } catch { /* ignore */ }
    setHidden(true);
    setDeferred(null);
    setShowIosHint(false);
  };

  const install = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch { /* user cancelled or browser refused — that's fine */ }
    setDeferred(null);
    setHidden(true);
  };

  if (hidden) return null;
  if (!deferred && !showIosHint) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 w-[calc(100%-2rem)] max-w-md">
      <div className="flex items-start gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-2xl ring-1 ring-white/10">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 text-white">
          <Download size={18} />
        </div>
        <div className="min-w-0 flex-1">
          {deferred ? (
            <>
              <p className="text-sm font-black">Install Syllab as an app</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-300">Faster launches · Works offline · Home-screen icon</p>
            </>
          ) : (
            <>
              <p className="text-sm font-black">Add Syllab to Home Screen</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-300">Tap <span className="font-black">Share</span> → <span className="font-black">Add to Home Screen</span></p>
            </>
          )}
        </div>
        {deferred && (
          <button
            type="button"
            onClick={install}
            className="shrink-0 rounded-xl bg-emerald-500 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-white hover:bg-emerald-400 transition-colors"
          >
            Install
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
