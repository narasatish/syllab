/**
 * OfflineBanner — a small, honest indicator when the device loses connection.
 *
 * Syllab is a PWA: the app shell and any pages you've already opened are cached,
 * and the free tools (calculators, timer, flashcards, converter, periodic table,
 * marks tracker, planner) run entirely on-device — so they keep working offline.
 * Anything that needs the network (AI tutor, mock tests, saving to your account)
 * will not. This tells the student exactly that instead of letting them hit
 * confusing failures.
 *
 * Renders nothing when online. Also announces a brief "back online" state.
 */
import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineBanner() {
  // Start optimistic: navigator.onLine is unreliable during SSR/first paint.
  const [offline, setOffline] = useState(false);
  const [justBack, setJustBack] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const sync = () => setOffline(!navigator.onLine);
    sync();

    const goOffline = () => { setOffline(true); setJustBack(false); };
    const goOnline = () => {
      setOffline(false);
      setJustBack(true);
      window.setTimeout(() => setJustBack(false), 3000);
    };
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline && !justBack) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-1/2 z-[90] -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm rounded-2xl px-4 py-2.5 shadow-2xl ring-1 transition-all ${
        offline
          ? 'bg-slate-900 text-white ring-white/10'
          : 'bg-emerald-600 text-white ring-emerald-400/30'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {offline ? <WifiOff size={16} className="shrink-0" /> : <Wifi size={16} className="shrink-0" />}
        <div className="min-w-0">
          {offline ? (
            <>
              <p className="text-xs font-black">You’re offline</p>
              <p className="text-[11px] font-medium text-slate-300">Your saved pages and the free tools still work. AI and mock tests need a connection.</p>
            </>
          ) : (
            <p className="text-xs font-black">Back online ✅</p>
          )}
        </div>
      </div>
    </div>
  );
}
