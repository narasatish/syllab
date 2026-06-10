/**
 * ColoringStudio — interactive "fill with colors" coloring for kids (PicArt-style).
 * Tap a colour, then tap any part of the picture to fill it. Reset to start over,
 * or download the finished art. 100% client-side, no cost.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, RotateCcw, X } from 'lucide-react';
import type { ColoringPage } from '../data/kids/coloring';

const PALETTE = [
  { name: 'Red', hex: '#ef4444' }, { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#facc15' }, { name: 'Green', hex: '#22c55e' },
  { name: 'Sky', hex: '#38bdf8' }, { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' }, { name: 'Pink', hex: '#ec4899' },
  { name: 'Brown', hex: '#92400e' }, { name: 'Skin', hex: '#fcd5b5' },
  { name: 'Black', hex: '#1e293b' }, { name: 'White (erase)', hex: '#ffffff' },
];
const FILLABLE = new Set(['path', 'polygon', 'circle', 'rect', 'ellipse']);

export default function ColoringStudio({ pages }: { pages: ColoringPage[] }) {
  const [active, setActive] = useState<ColoringPage | null>(null);
  const [color, setColor] = useState(PALETTE[0].hex);
  const [resetKey, setResetKey] = useState(0);
  const artRef = useRef<HTMLDivElement | null>(null);

  // After the picture mounts (open or reset), make every region tappable:
  // SVG shapes with fill="none" ignore clicks on their interior, so give them a
  // white fill + pointer-events:all. Now tapping anywhere inside a region fills it.
  useEffect(() => {
    if (!active) return;
    const el = artRef.current;
    if (!el) return;
    el.querySelectorAll('path, polygon, circle, rect, ellipse').forEach((s) => {
      (s as SVGElement).style.pointerEvents = 'all';
      const f = s.getAttribute('fill');
      if (!f || f === 'none') s.setAttribute('fill', '#ffffff');
    });
  }, [active, resetKey]);

  const fill = (e: React.MouseEvent) => {
    const t = e.target as Element;
    if (t && FILLABLE.has(t.tagName.toLowerCase())) t.setAttribute('fill', color);
  };

  const download = () => {
    const svg = artRef.current?.querySelector('svg');
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const data = `<?xml version="1.0"?>\n${new XMLSerializer().serializeToString(clone)}`;
    const link = document.createElement('a');
    link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`;
    link.download = `${active?.id || 'art'}-coloured.svg`;
    link.click();
  };

  return (
    <>
      {/* Gallery */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <motion.button
            key={page.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setActive(page); setResetKey((k) => k + 1); }}
            className="rounded-2xl bg-white p-4 text-left shadow-md transition-all"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-black text-slate-800">{page.title}</h3>
              <span className="text-2xl">{page.emoji}</span>
            </div>
            <div className="mb-3 h-40 w-full rounded-lg bg-slate-50 p-3 [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: page.svg }} />
            <span className="inline-block w-full rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 py-2 text-center text-xs font-black text-white">🎨 Tap to colour</span>
          </motion.button>
        ))}
      </div>

      {/* Studio modal */}
      <AnimatePresence>
        {active ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={() => setActive(null)}>
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <h3 className="font-black text-slate-900">{active.emoji} {active.title}</h3>
                <button onClick={() => setActive(null)} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
              </div>

              {/* Canvas */}
              <div className="flex-1 overflow-auto bg-slate-50 p-4">
                <div
                  key={resetKey}
                  ref={artRef}
                  onClick={fill}
                  className="mx-auto aspect-square w-full max-w-sm cursor-pointer rounded-xl bg-white p-3 shadow-inner [&_svg]:h-full [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: active.svg }}
                />
                <p className="mt-2 text-center text-xs font-bold text-slate-400">Tap a colour, then tap a part of the picture to fill it!</p>
              </div>

              {/* Palette + actions */}
              <div className="border-t border-slate-100 p-4">
                <div className="mb-3 flex flex-wrap justify-center gap-2">
                  {PALETTE.map((c) => (
                    <button
                      key={c.hex}
                      title={c.name}
                      onClick={() => setColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`h-9 w-9 rounded-full border-2 transition-transform ${color === c.hex ? 'scale-110 border-slate-900 ring-2 ring-slate-300' : 'border-white shadow'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-center gap-2">
                  <button onClick={() => setResetKey((k) => k + 1)} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"><RotateCcw size={15} /> Reset</button>
                  <button onClick={download} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600"><Download size={15} /> Save my art</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
