import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

// Track across the full session — once dismissed or auto-hid, don't show again for 15 min
let sessionShownAt = 0;
const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes between re-shows

export default function ColdStartBanner() {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const onSlow = () => {
      const now = Date.now();
      // Only show if not shown recently this session
      if (now - sessionShownAt > COOLDOWN_MS) {
        sessionShownAt = now;
        setSlow(true);
      }
    };
    const onFast = () => setSlow(false);

    window.addEventListener('syllab:ai-slow', onSlow);
    window.addEventListener('syllab:ai-fast', onFast);

    return () => {
      window.removeEventListener('syllab:ai-slow', onSlow);
      window.removeEventListener('syllab:ai-fast', onFast);
    };
  }, []);

  if (!slow) return null;

  return (
    <div className="fixed top-4 left-1/2 z-[100] -translate-x-1/2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-2.5 shadow-lg flex items-center gap-3 text-xs font-bold text-amber-700 max-w-xs sm:max-w-sm">
      <Loader2 size={14} className="animate-spin shrink-0" />
      <span>AI is warming up… takes ~30s after idle.</span>
      <button
        onClick={() => setSlow(false)}
        className="ml-auto shrink-0 text-amber-500 hover:text-amber-700"
        title="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}
