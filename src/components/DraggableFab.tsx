/**
 * DraggableFab — the floating AI-tutor button. Users can drag it anywhere on
 * screen (helpful on mobile so it never covers the content they're reading); the
 * position is remembered. A real drag is distinguished from a tap, so tapping
 * still opens/closes the tutor. Smaller on mobile so it stays unobtrusive.
 * Keeps id="tutor-fab" so existing CSS (hide while a lesson is open) still works.
 */
import { useEffect, useRef, useState } from 'react';
import { Bot } from 'lucide-react';

const POS_KEY = 'syllab_fab_pos_v1';

export default function DraggableFab({
  isOpen,
  onToggle,
  panel,
}: {
  isOpen: boolean;
  onToggle: () => void;
  panel: React.ReactNode;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);

  // Restore saved position (and keep it on-screen after resize/rotate).
  useEffect(() => {
    try { const s = localStorage.getItem(POS_KEY); if (s) setPos(JSON.parse(s)); } catch { /* ignore */ }
    const onResize = () => setPos((p) => {
      if (!p) return p;
      const m = 8, size = 64;
      return { x: Math.min(window.innerWidth - size, Math.max(m, p.x)), y: Math.min(window.innerHeight - size, Math.max(m, p.y)) };
    });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = wrapRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    drag.current = { sx: e.clientX, sy: e.clientY, ox: r.left, oy: r.top, moved: false };
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.moved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) d.moved = true;
    if (d.moved) {
      const m = 8, size = (wrapRef.current?.offsetWidth || 56);
      const x = Math.min(window.innerWidth - size - m, Math.max(m, d.ox + dx));
      const y = Math.min(window.innerHeight - size - m, Math.max(m, d.oy + dy));
      setPos({ x, y });
    }
  };
  const onPointerUp = () => {
    const d = drag.current; drag.current = null;
    if (!d) return;
    if (!d.moved) { onToggle(); return; }
    setPos((p) => { if (p) { try { localStorage.setItem(POS_KEY, JSON.stringify(p)); } catch { /* ignore */ } } return p; });
  };

  const style: React.CSSProperties = pos ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' } : {};

  return (
    <div
      id="tutor-fab"
      ref={wrapRef}
      style={style}
      className={`fixed z-[55] flex flex-col items-end gap-3 ${pos ? '' : 'bottom-5 right-5'}`}
    >
      {isOpen ? (
        <div className="app-tutor-in h-[min(680px,calc(100dvh-7rem))] w-[min(420px,calc(100vw-2rem))]">
          {panel}
        </div>
      ) : null}
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        className="flex h-12 w-12 sm:h-14 sm:w-14 cursor-grab touch-none select-none items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 active:cursor-grabbing"
        aria-label={isOpen ? 'Close AI tutor' : 'Open AI tutor (drag to move)'}
        title="Tap to chat · drag to move"
      >
        <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
