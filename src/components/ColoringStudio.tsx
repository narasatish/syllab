/**
 * ColoringStudio — interactive coloring for kids, two ways (PicsArt / MS-Paint style):
 *   • Fill  — tap a colour, then tap any region of the picture to flood it.
 *   • Brush — draw freehand over the picture with an adjustable brush.
 *   • Eraser — rub out your brush strokes.
 * A transparent <canvas> sits on top of the line-art SVG for freehand painting.
 * Reset to start over; Save exports a PNG that merges the fills + brush strokes.
 * 100% client-side, no cost.
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, RotateCcw, X, Paintbrush, PaintBucket, Eraser } from 'lucide-react';
import type { ColoringPage } from '../data/kids/coloring';

const PALETTE = [
  { name: 'Red', hex: '#ef4444' }, { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#facc15' }, { name: 'Green', hex: '#22c55e' },
  { name: 'Sky', hex: '#38bdf8' }, { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' }, { name: 'Pink', hex: '#ec4899' },
  { name: 'Brown', hex: '#92400e' }, { name: 'Skin', hex: '#fcd5b5' },
  { name: 'Black', hex: '#1e293b' }, { name: 'White', hex: '#ffffff' },
];
const FILLABLE = new Set(['path', 'polygon', 'circle', 'rect', 'ellipse']);
const CANVAS_PX = 800; // internal brush resolution (square, matches the art box)

type Tool = 'fill' | 'brush' | 'eraser';

export default function ColoringStudio({ pages }: { pages: ColoringPage[] }) {
  const [active, setActive] = useState<ColoringPage | null>(null);
  const [color, setColor] = useState(PALETTE[0].hex);
  const [tool, setTool] = useState<Tool>('fill');
  const [brushSize, setBrushSize] = useState(18);
  const [resetKey, setResetKey] = useState(0);
  // Paint state lives in React (region index → colour), NOT only in the DOM, so a
  // colour fill is never lost if React re-renders/re-creates the injected SVG. This
  // is what lets the child colour many regions, each its own colour, reliably.
  const [fills, setFills] = useState<Record<string, string>>({});
  const artRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastPt = useRef<{ x: number; y: number } | null>(null);
  // Refs assigned DURING RENDER (not in an effect) so the once-attached native click
  // listener always reads the CURRENT colour/tool — no effect-timing staleness.
  const colorRef = useRef(color); colorRef.current = color;
  const toolRef = useRef(tool); toolRef.current = tool;

  // Bake hittability into the SVG MARKUP itself (not via post-mount DOM mutation).
  // Every fillable shape gets a baseline white fill + pointer-events:all so its whole
  // interior is tappable (a fill="none" shape only reacts on its thin outline). Doing
  // this in the markup means it SURVIVES every React re-render — the previous approach
  // mutated the injected DOM in an effect, and those mutations silently vanished when
  // React recreated the node (and the effect didn't re-run), so fill quietly stopped
  // working. White-on-white keeps the line-art look untouched. Memoised on [active] so
  // the __html string is stable across colour/tool changes → React preserves the user's
  // painted fills instead of wiping them.
  // Give every fillable shape a baseline white fill, pointer-events:all (so the whole
  // interior is tappable, not just the thin outline) and a stable data-ci index we use
  // to track which region holds which colour. White-on-white keeps the line-art look.
  const preparedSvg = useMemo(() => {
    if (!active) return '';
    let i = 0;
    return active.svg.replace(
      /<(path|polygon|circle|rect|ellipse)\b/g,
      (_m, tag) => `<${tag} data-ci="${i++}" fill="#ffffff" pointer-events="all" style="cursor:pointer"`,
    );
  }, [active]);

  // Clear the brush canvas whenever a picture opens or is reset.
  useEffect(() => {
    const cv = canvasRef.current;
    if (cv) { cv.width = CANVAS_PX; cv.height = CANVAS_PX; cv.getContext('2d')?.clearRect(0, 0, CANVAS_PX, CANVAS_PX); }
  }, [active, resetKey]);

  // Re-apply the React-held fills to the live SVG after EVERY render. If React ever
  // re-creates the injected markup (StrictMode, a re-render, HMR…), the painted colours
  // are restored from state instead of vanishing — the bug that made fill "stop working".
  useLayoutEffect(() => {
    const el = artRef.current;
    if (!el) return;
    Object.entries(fills).forEach(([idx, col]) => {
      const s = el.querySelector(`[data-ci="${idx}"]`) as SVGElement | null;
      if (s) { s.setAttribute('fill', col); s.style.fill = col; }
    });
  });

  // Flood-fill via a NATIVE click listener attached to the art container. A native
  // listener fires reliably for clicks bubbled up from the dangerouslySetInnerHTML SVG
  // (React's synthetic onClick proved unreliable over injected SVG children here).
  // elementsFromPoint resolves the TOP-MOST fillable region under the finger — so taps on
  // a stroke/line or where shapes overlap still colour the right region. We record the
  // fill in React state keyed by the region's data-ci; the layout effect above paints it,
  // so colours persist across re-renders and many regions can each hold their own colour.
  useEffect(() => {
    if (!active) return;
    const el = artRef.current;
    if (!el) return;
    const onFillClick = (e: MouseEvent) => {
      if (toolRef.current !== 'fill') return;
      const shape = document.elementsFromPoint(e.clientX, e.clientY).find(
        (n) => FILLABLE.has(n.tagName.toLowerCase()) && el.contains(n),
      ) as SVGElement | undefined;
      const idx = shape?.getAttribute('data-ci');
      if (idx != null) setFills((prev) => ({ ...prev, [idx]: colorRef.current }));
    };
    el.addEventListener('click', onFillClick);
    return () => el.removeEventListener('click', onFillClick);
  }, [active, resetKey]);

  // ── Freehand brush on the overlay canvas ──────────────────────────────────
  const toCanvasPt = (e: React.PointerEvent) => {
    const cv = canvasRef.current; if (!cv) return null;
    const r = cv.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * CANVAS_PX,
      y: ((e.clientY - r.top) / r.height) * CANVAS_PX,
    };
  };

  const strokeTo = (p: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext('2d'); if (!ctx) return;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    // brushSize is in display px (~max-w-sm ≈ 384) → scale up to canvas px.
    ctx.lineWidth = brushSize * (CANVAS_PX / 384);
    if (tool === 'eraser') { ctx.globalCompositeOperation = 'destination-out'; ctx.strokeStyle = 'rgba(0,0,0,1)'; }
    else { ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = color; }
    const from = lastPt.current || p;
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    lastPt.current = p;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (tool === 'fill') return;
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drawing.current = true;
    const p = toCanvasPt(e); if (!p) return;
    lastPt.current = p;
    strokeTo(p); // a dot on tap
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current || tool === 'fill') return;
    const p = toCanvasPt(e); if (p) strokeTo(p);
  };
  const onPointerUp = () => { drawing.current = false; lastPt.current = null; };

  const download = useCallback(async () => {
    const svg = artRef.current?.querySelector('svg');
    if (!svg) return;
    const W = CANVAS_PX, H = CANVAS_PX;
    const clone = svg.cloneNode(true) as SVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(W));
    clone.setAttribute('height', String(H));
    const svgData = new XMLSerializer().serializeToString(clone);
    const out = document.createElement('canvas'); out.width = W; out.height = H;
    const cctx = out.getContext('2d'); if (!cctx) return;
    cctx.fillStyle = '#ffffff'; cctx.fillRect(0, 0, W, H);
    const img = new Image();
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
    await new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); img.src = url; });
    try { cctx.drawImage(img, 0, 0, W, H); } catch { /* ignore */ }
    if (canvasRef.current) cctx.drawImage(canvasRef.current, 0, 0, W, H);
    const link = document.createElement('a');
    link.href = out.toDataURL('image/png');
    link.download = `${active?.id || 'art'}-coloured.png`;
    link.click();
  }, [active]);

  return (
    <>
      {/* Gallery */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <motion.button
            key={page.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setActive(page); setTool('fill'); setFills({}); setResetKey((k) => k + 1); }}
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

              {/* Tool switch */}
              <div className="flex items-center justify-center gap-2 border-b border-slate-100 px-4 py-2">
                {([
                  { id: 'fill' as Tool, label: 'Fill', Icon: PaintBucket },
                  { id: 'brush' as Tool, label: 'Brush', Icon: Paintbrush },
                  { id: 'eraser' as Tool, label: 'Eraser', Icon: Eraser },
                ]).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTool(id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black ${tool === id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  ><Icon size={14} /> {label}</button>
                ))}
                {tool !== 'fill' ? (
                  <label className="ml-2 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    Size
                    <input type="range" min={4} max={48} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-20 accent-pink-500" />
                  </label>
                ) : null}
              </div>

              {/* Canvas: SVG line-art with a transparent brush canvas on top */}
              <div className="flex-1 overflow-auto bg-slate-50 p-4">
                <div className="relative mx-auto aspect-square w-full max-w-sm rounded-xl bg-white p-3 shadow-inner">
                  <div
                    key={resetKey}
                    ref={artRef}
                    className={`absolute inset-3 [&_svg]:h-full [&_svg]:w-full ${tool === 'fill' ? 'cursor-pointer' : ''}`}
                    dangerouslySetInnerHTML={{ __html: preparedSvg }}
                  />
                  <canvas
                    ref={canvasRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                    className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] touch-none"
                    style={{ pointerEvents: tool === 'fill' ? 'none' : 'auto', cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
                  />
                </div>
                <p className="mt-2 text-center text-xs font-bold text-slate-400">
                  {tool === 'fill' ? 'Tap a colour, then tap a part of the picture to fill it!'
                    : tool === 'eraser' ? 'Drag to rub out your brush strokes.'
                    : 'Pick a colour and draw anywhere — just like painting! 🖌️'}
                </p>
              </div>

              {/* Palette + actions */}
              <div className="border-t border-slate-100 p-4">
                <div className="mb-3 flex flex-wrap justify-center gap-2">
                  {PALETTE.map((c) => (
                    <button
                      key={c.hex}
                      title={c.name}
                      onClick={() => { setColor(c.hex); if (tool === 'eraser') setTool('brush'); }}
                      style={{ backgroundColor: c.hex }}
                      className={`h-9 w-9 rounded-full border-2 transition-transform ${color === c.hex && tool !== 'eraser' ? 'scale-110 border-slate-900 ring-2 ring-slate-300' : 'border-white shadow'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-center gap-2">
                  <button onClick={() => { setFills({}); setResetKey((k) => k + 1); }} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"><RotateCcw size={15} /> Reset</button>
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
