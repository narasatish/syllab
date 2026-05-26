/**
 * WebSlideViewer.tsx — Clean PPT viewer
 * Renders AI-generated lessons in a broad, colorful, single-column layout.
 * Markdown (e.g. **bold**) is rendered properly. No more literal asterisks.
 * Sidebar (Teacher Notes / Visual / Exam Focus) removed for a cleaner look.
 * Export button prints all slides as a PDF-ready document with syllab.in watermark.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Download,
  PenLine,
  X,
} from 'lucide-react';
import type { DeepPptLesson, DeepPptSlide } from '../lib/pptLessonApi';
import { cn } from '../lib/utils';

type Props = {
  lesson: DeepPptLesson;
  onClose?: () => void;
  onAskAI?: (slideNumber: number, context?: string) => void;
  onPractice?: () => void;
};

// ─── Per-layout color theme (header AND slide background) ─────────────────────
const LAYOUT_THEME: Record<string, { header: string; body: string; accent: string; chip: string }> = {
  title:    { header: 'from-emerald-700 via-emerald-600 to-teal-600',   body: 'from-emerald-50 via-white to-teal-50',     accent: 'bg-emerald-600',   chip: 'bg-emerald-100 text-emerald-800' },
  concept:  { header: 'from-blue-700 via-indigo-600 to-violet-600',     body: 'from-blue-50 via-white to-indigo-50',      accent: 'bg-indigo-600',    chip: 'bg-indigo-100 text-indigo-800' },
  diagram:  { header: 'from-violet-700 via-purple-600 to-fuchsia-600',  body: 'from-violet-50 via-white to-fuchsia-50',   accent: 'bg-violet-600',    chip: 'bg-violet-100 text-violet-800' },
  example:  { header: 'from-amber-600 via-orange-500 to-red-500',       body: 'from-amber-50 via-white to-orange-50',     accent: 'bg-orange-500',    chip: 'bg-orange-100 text-orange-800' },
  table:    { header: 'from-cyan-700 via-sky-600 to-blue-600',          body: 'from-cyan-50 via-white to-sky-50',         accent: 'bg-sky-600',       chip: 'bg-sky-100 text-sky-800' },
  question: { header: 'from-orange-600 via-rose-500 to-pink-500',       body: 'from-orange-50 via-white to-rose-50',      accent: 'bg-rose-500',      chip: 'bg-rose-100 text-rose-800' },
  revision: { header: 'from-emerald-700 via-green-600 to-lime-500',     body: 'from-emerald-50 via-white to-lime-50',     accent: 'bg-emerald-600',   chip: 'bg-emerald-100 text-emerald-800' },
};

// ─── Strip JSON-like blobs that Gemini sometimes returns in text fields ──────
// Detects {"question":"...","steps":[...],"answer":"..."} and extracts readable parts.
function unwrapJsonText(text: string): string {
  if (!text) return text;
  const trimmed = text.trim();
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return text;

  try {
    const parsed = JSON.parse(trimmed);
    const parts: string[] = [];
    const walk = (obj: any) => {
      if (obj == null) return;
      if (typeof obj === 'string') { parts.push(obj); return; }
      if (Array.isArray(obj)) { obj.forEach(walk); return; }
      if (typeof obj === 'object') {
        // Prefer common keys in a sensible order
        for (const k of ['question', 'prompt', 'steps', 'solution', 'answer', 'explanation', 'text', 'value']) {
          if (obj[k] != null) walk(obj[k]);
        }
      }
    };
    walk(parsed);
    return parts.join(' • ').replace(/\s+/g, ' ').trim() || text;
  } catch {
    return text;
  }
}

// ─── Lightweight inline markdown renderer ─────────────────────────────────────
// Converts **bold** and *italic*, strips stray asterisks. Defensive against
// non-string inputs (Gemini sometimes returns arrays/objects mid-stream).
function renderInline(raw: unknown): React.ReactNode {
  if (raw == null) return null;
  let text: string;
  if (typeof raw === 'string') {
    text = unwrapJsonText(raw);
  } else if (Array.isArray(raw)) {
    text = raw.map(x => (typeof x === 'string' ? unwrapJsonText(x) : '')).join(' ');
  } else if (typeof raw === 'object') {
    try { text = unwrapJsonText(JSON.stringify(raw)); } catch { return null; }
  } else {
    text = String(raw);
  }
  if (!text) return null;

  try {
    // First normalize: collapse runs of 3+ asterisks to "**", strip lone leading/trailing "*"
    const cleaned = text
      .replace(/\*{3,}/g, '**')
      .replace(/(^|\s)\*(?=\s|$)/g, '$1');

    const parts = cleaned.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g);
    return parts.map((p, i) => {
      if (p.startsWith('**') && p.endsWith('**') && p.length > 4) {
        return <strong key={i} className="font-black text-slate-900">{p.slice(2, -2)}</strong>;
      }
      if (p.startsWith('*') && p.endsWith('*') && p.length > 2) {
        return <em key={i} className="italic">{p.slice(1, -1)}</em>;
      }
      return <React.Fragment key={i}>{p}</React.Fragment>;
    });
  } catch {
    return <span>{text}</span>;
  }
}

// Safe array helper — Gemini sometimes returns strings/null where arrays expected
function asStringArray(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(x => x != null).map(x => (typeof x === 'string' ? x : String(x)));
  if (typeof raw === 'string') return [raw];
  return [];
}

// ─── Error boundary so one malformed slide doesn't kill the deck ─────────────
class SlideErrorBoundary extends React.Component<
  { children: React.ReactNode; slideNumber?: number },
  { hasError: boolean; err?: Error }
> {
  state = { hasError: false, err: undefined as Error | undefined };
  static getDerivedStateFromError(err: Error) { return { hasError: true, err }; }
  componentDidCatch(err: Error) { console.error('Slide render error:', err); }
  componentDidUpdate(prev: { slideNumber?: number }) {
    if (prev.slideNumber !== this.props.slideNumber && this.state.hasError) {
      this.setState({ hasError: false, err: undefined });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[420px] rounded-[2rem] border border-amber-200 bg-amber-50 p-12 text-center">
          <AlertTriangle className="mx-auto mb-3 text-amber-500" size={40} />
          <h3 className="text-xl font-black text-slate-900 mb-2">This slide had a rendering issue</h3>
          <p className="text-sm text-slate-600 mb-1">Use the arrow buttons to skip to the next slide.</p>
          <p className="text-xs text-slate-400 mt-3">{this.state.err?.message || 'Unknown error'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Split a long example into clean step-by-step lines ─────────────────────
function splitIntoSteps(text: string): string[] {
  if (!text) return [];
  // First normalize: replace explicit \n with real newlines
  let t = text.replace(/\\n/g, '\n');
  // Insert newline before "Step N:" patterns if not already on their own line
  t = t.replace(/([.)])\s+(Step\s+\d+[:.)])/gi, '$1\n$2');
  t = t.replace(/\s+(Step\s+\d+[:.)])/gi, '\n$1');
  // Also split on numbered "1.", "2." patterns at start of sentence
  t = t.replace(/([.)])\s+(\d+\.\s)/g, '$1\n$2');
  const lines = t.split(/\n+/).map(s => s.trim()).filter(Boolean);
  return lines.length > 1 ? lines : [t.trim()];
}

// ─── Single slide body (no sidebar, broad layout) ─────────────────────────────
function SlideBody({ slide, theme, lessonOverview }: {
  slide: DeepPptSlide;
  theme: typeof LAYOUT_THEME[string];
  lessonOverview?: string[];   // chapter-level topic preview for title slides
}) {
  return (
    <div className={cn(
      'min-h-[280px] rounded-[2rem] border border-slate-100 bg-gradient-to-br p-5 sm:p-8 md:p-12 sm:min-h-[400px] md:min-h-[480px]',
      theme.body,
    )}>
      <div className={cn('mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest', theme.chip)}>
        <BookOpen className="h-3.5 w-3.5" />
        {slide.layout || 'Concept'} · Slide {slide.slideNumber}
      </div>

      <h3 className="text-xl font-black leading-tight text-slate-950 sm:text-3xl md:text-4xl">
        {renderInline(slide.title)}
      </h3>
      {slide.subtitle && (
        <p className="mt-3 text-lg font-bold text-slate-600">
          {renderInline(slide.subtitle)}
        </p>
      )}

      {(() => {
        const bullets = asStringArray(slide.bullets);
        // Title slide fallback: if there are no bullets, show "What you'll learn"
        // from the rest of the deck's slide titles.
        const isTitleSlide = (slide.layout || '').toLowerCase() === 'title';
        if (bullets.length === 0 && isTitleSlide && lessonOverview && lessonOverview.length > 0) {
          return (
            <div className="mt-8">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">What you'll learn</p>
              <ul className="space-y-3">
                {lessonOverview.slice(0, 8).map((line, i) => (
                  <li key={i} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', theme.accent)} />
                    <span>{renderInline(line)}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (bullets.length === 0) return null;
        return (
          <ul className="mt-5 space-y-3">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-base leading-7 text-slate-800 sm:gap-4 sm:text-lg sm:leading-8">
                <span className={cn('mt-3 h-2.5 w-2.5 shrink-0 rounded-full', theme.accent)} />
                <span>{renderInline(bullet)}</span>
              </li>
            ))}
          </ul>
        );
      })()}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {slide.example && (() => {
          const steps = splitIntoSteps(typeof slide.example === 'string' ? slide.example : String(slide.example));
          return (
            <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-5 md:col-span-2">
              <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-700">
                <PenLine className="h-3.5 w-3.5" /> Worked Example
              </p>
              {steps.length > 1 ? (
                <ol className="space-y-3">
                  {steps.map((step, i) => (
                    <li key={i} className="flex gap-3 leading-7 text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-200 text-orange-900 text-[11px] font-black">{i + 1}</span>
                      <span className="flex-1">{renderInline(step.replace(/^Step\s+\d+[:.)]\s*/i, '').replace(/^\d+\.\s*/, ''))}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="leading-7 text-slate-700">{renderInline(slide.example)}</p>
              )}
            </div>
          );
        })()}

        {slide.commonMistake && (
          <div className="rounded-2xl border border-red-200 bg-red-50/70 p-5 md:col-span-2">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" /> Common Mistake
            </p>
            <p className="leading-7 text-slate-700">{renderInline(slide.commonMistake)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Hard gate — must pass before any PDF/print export is allowed. */
function canExportLesson(lesson: DeepPptLesson): boolean {
  if (!lesson || !Array.isArray(lesson.slides)) return false;
  if ((lesson as any).isFallback === true) return false;
  if ((lesson as any).quality === 'quick_fallback') return false;
  if ((lesson as any).canExport === false) return false;
  if (lesson.source === 'fallback') return false;
  if (lesson.slides.length < 12) return false;
  const text = lesson.slides
    .map(s => [s.title, s.subtitle, ...(s.bullets || []), s.example].filter(Boolean).join(' '))
    .join(' ');
  const BAD = [
    'Quick Study Guide',
    'Full AI lesson is being prepared',
    'lesson is still loading',
    'Study this concept thoroughly',
    'Refer to your NCERT textbook',
    'Practice related questions to reinforce',
  ];
  return !BAD.some(p => text.includes(p));
}

// ─── PDF Export via window.print() with syllab.in watermark ───────────────────
function exportLessonAsPDF(lesson: DeepPptLesson) {
  // HARD GATE — never let a fallback / placeholder lesson reach the export window.
  if (!canExportLesson(lesson)) {
    alert(
      'The full AI lesson is still being prepared. Please reopen "PPT Lesson" in about a minute and try Download PDF again.',
    );
    return;
  }
  // NOTE: do NOT use `noopener` here — it breaks document.write on some browsers.
  const w = window.open('', '_blank', 'width=900,height=1200,scrollbars=yes,resizable=yes');
  if (!w) {
    alert('Popup was blocked. Please allow popups for this site, then click Export PDF again.');
    return;
  }

  const esc = (s: string) =>
    (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Render markdown to safe HTML (handles JSON blobs, **bold**, *italic*)
  const md = (s: any) => {
    if (s == null) return '';
    let text = typeof s === 'string' ? s : String(s);
    // Strip JSON-wrapped content
    const trimmed = text.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        const acc: string[] = [];
        const walk = (o: any) => {
          if (o == null) return;
          if (typeof o === 'string') { acc.push(o); return; }
          if (Array.isArray(o)) { o.forEach(walk); return; }
          if (typeof o === 'object') {
            for (const k of ['question','prompt','steps','solution','answer','explanation','text','value']) {
              if (o[k] != null) walk(o[k]);
            }
          }
        };
        walk(parsed);
        text = acc.join(' • ').replace(/\s+/g, ' ').trim() || text;
      } catch { /* keep original */ }
    }
    return esc(text)
      .replace(/\*{3,}/g, '**')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|\s)\*([^*\s][^*]*?)\*(?=\s|$|[.,!?])/g, '$1<em>$2</em>');
  };

  const themeFor = (layout?: string) => {
    const map: Record<string, string> = {
      title: '#059669', concept: '#4f46e5', diagram: '#7c3aed',
      example: '#ea580c', table: '#0284c7', question: '#e11d48', revision: '#059669',
    };
    return map[layout || 'concept'] || '#4f46e5';
  };

  const slidesHtml = lesson.slides.map((s, idx) => {
    const color = themeFor(s.layout);
    return `
      <section class="slide" style="border-top:8px solid ${color}">
        <div class="slide-chip" style="background:${color}1a;color:${color}">
          ${esc(s.layout || 'Concept')} · Slide ${s.slideNumber || idx + 1}
        </div>
        <h2>${md(s.title || '')}</h2>
        ${s.subtitle ? `<p class="subtitle">${md(s.subtitle)}</p>` : ''}
        ${s.bullets && s.bullets.length ? `
          <ul>${s.bullets.map(b => `<li><span class="dot" style="background:${color}"></span><span>${md(b)}</span></li>`).join('')}</ul>
        ` : ''}
        <div class="grid">
          ${s.example ? `<div class="callout" style="border-color:#fed7aa;background:#fff7ed"><p class="callout-label" style="color:#c2410c">EXAMPLE</p><p>${md(s.example)}</p></div>` : ''}
          ${s.commonMistake ? `<div class="callout" style="border-color:#fecaca;background:#fef2f2"><p class="callout-label" style="color:#b91c1c">COMMON MISTAKE</p><p>${md(s.commonMistake)}</p></div>` : ''}
        </div>
        <div class="watermark">syllab.in</div>
      </section>
    `;
  }).join('');

  w.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${esc(lesson.title || 'Lesson')} — Syllab</title>
<script>
  // Robust auto-print: wait for full load (incl. fonts), then trigger print.
  // Fallback: if window.print() throws or fonts hang, user can still click the Save as PDF button.
  function triggerPrint() {
    try { window.focus(); window.print(); }
    catch (e) { /* user can still click the button */ }
  }
  if (document.readyState === 'complete') {
    setTimeout(triggerPrint, 1200);
  } else {
    window.addEventListener('load', function() {
      // Give fonts/layout time to settle
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function() { setTimeout(triggerPrint, 600); });
      } else {
        setTimeout(triggerPrint, 1500);
      }
    });
  }
</script>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; margin: 0; color: #0f172a; }
  .cover { max-width: 820px; margin: 0 auto; padding: 60px 40px 40px; text-align: center; }
  .cover h1 { font-size: 2.5rem; font-weight: 900; margin: 0 0 10px; color: #064e3b; }
  .cover p { color: #64748b; font-weight: 600; margin: 4px 0; }
  .cover .brand { margin-top: 30px; font-weight: 900; color: #059669; letter-spacing: 2px; }
  .slide {
    max-width: 820px; margin: 24px auto; background: #fff;
    border-radius: 20px; padding: 40px;
    box-shadow: 0 10px 30px rgba(15,23,42,0.08);
    position: relative; page-break-after: always;
  }
  .slide-chip {
    display: inline-block; padding: 6px 14px; border-radius: 999px;
    font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 18px;
  }
  .slide h2 { font-size: 1.8rem; font-weight: 900; line-height: 1.2; margin: 0 0 10px; color: #0f172a; }
  .slide .subtitle { color: #475569; font-weight: 700; margin: 0 0 16px; font-size: 1.05rem; }
  .slide ul { list-style: none; padding: 0; margin: 18px 0; }
  .slide li { display: flex; gap: 12px; line-height: 1.7; margin: 10px 0; color: #1e293b; font-size: 1rem; }
  .slide .dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 9px; flex-shrink: 0; }
  .slide .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 18px; }
  .slide .span2 { grid-column: 1 / -1; }
  .callout { border: 1px solid; border-radius: 14px; padding: 16px 18px; }
  .callout-label { font-size: 10px; font-weight: 900; letter-spacing: 2px; margin: 0 0 6px; text-transform: uppercase; }
  .callout p { margin: 6px 0; line-height: 1.6; color: #334155; }
  .answer { font-size: 0.9rem; color: #64748b; }
  .watermark {
    position: absolute; bottom: 14px; right: 24px;
    font-size: 11px; font-weight: 900; color: rgba(5,150,105,0.6);
    letter-spacing: 2px; text-transform: uppercase;
  }
  .toolbar { position: sticky; top: 0; background: #0f172a; color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 100; }
  .toolbar button { background: #10b981; color: white; border: 0; padding: 10px 20px; border-radius: 10px; font-weight: 900; cursor: pointer; font-size: 14px; }
  .toolbar button:hover { background: #059669; }
  @media print {
    .toolbar { display: none; }
    body { background: white; }
    .slide { box-shadow: none; margin: 0 auto; page-break-after: always; }
    .cover { page-break-after: always; }
  }
</style>
</head><body>
<div class="toolbar">
  <span style="font-weight:900;">📄 ${esc(lesson.title || 'Lesson')} — ${esc(lesson.subject || '')}</span>
  <div style="display:flex;gap:8px;align-items:center;">
    <span style="font-size:11px;opacity:0.7;">Tip: choose "Save as PDF" in the print destination</span>
    <button onclick="window.print()" style="background:#10b981;color:white;border:0;padding:10px 20px;border-radius:10px;font-weight:900;cursor:pointer;font-size:14px;">⬇ Save as PDF</button>
  </div>
</div>
<div class="cover">
  <h1>${esc(lesson.title || 'Lesson')}</h1>
  <p>${esc(lesson.subject || '')} · Class ${esc(String(lesson.classLevel || ''))}</p>
  <p>${lesson.slides.length} Slides</p>
  <p class="brand">SYLLAB.IN</p>
</div>
${slidesHtml}
</body></html>`);
  w.document.close();
}

export default function WebSlideViewer({ lesson, onClose, onAskAI, onPractice }: Props) {
  const [index, setIndex] = useState(0);
  const total = lesson.slides.length;
  const slide = lesson.slides[index];
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;
  const isFallback = (lesson as any).source === 'fallback';
  const fallbackMsg = (lesson as any).fallbackMessage as string | undefined;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') setIndex(v => Math.min(total - 1, v + 1));
    if (e.key === 'ArrowLeft') setIndex(v => Math.max(0, v - 1));
    if (e.key === 'Escape') onClose?.();
  }, [total, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!slide) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center">
        <p className="font-bold text-slate-400">No slides available.</p>
        {onClose && (
          <button onClick={onClose} className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white">
            Close
          </button>
        )}
      </div>
    );
  }

  const theme = LAYOUT_THEME[slide.layout || 'concept'] || LAYOUT_THEME.concept;

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl shadow-slate-200/60 sm:rounded-[2rem] sm:border sm:border-slate-100">
      {/* Fallback banner — shown when backend was unreachable */}
      {isFallback && fallbackMsg && (
        <div className="shrink-0 flex items-start gap-3 border-b border-amber-100 bg-amber-50 px-4 py-3 sm:px-6">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-amber-800 leading-snug">{fallbackMsg}</p>
          </div>
        </div>
      )}

      {/* Header — fixed at top */}
      <div className={cn('shrink-0 bg-gradient-to-r p-4 text-white sm:p-6', theme.header)}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/80">
              Syllab Lesson · {lesson.subject} · Class {lesson.classLevel}
            </p>
            <h2 className="mt-1 text-lg font-black leading-tight sm:text-2xl">{lesson.title}</h2>
            <p className="mt-0.5 text-xs text-white/80">
              Slide {index + 1} of {total}{slide.layout ? ` · ${slide.layout}` : ''}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 p-2.5 text-white hover:bg-white/20 transition-all shrink-0 touch-manipulation"
              title="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Dot navigator — scrollable on mobile */}
        <div className="mt-3 flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {lesson.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                'h-2 rounded-full shrink-0 transition-all touch-manipulation',
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60',
              )}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide content — flexes to fill available space, scrolls if too tall */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8">
        <SlideErrorBoundary slideNumber={slide.slideNumber}>
          <SlideBody
            slide={slide}
            theme={theme}
            lessonOverview={lesson.slides
              .filter((s, i) => i > 0 && s.title && (s.layout || '') !== 'title')
              .map(s => s.title)}
          />
        </SlideErrorBoundary>
      </div>

      {/* Navigation — fixed at bottom, touch-friendly */}
      <div className="shrink-0 border-t border-slate-100 bg-white p-3 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setIndex(v => Math.max(0, v - 1))}
            disabled={index === 0}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-all touch-manipulation min-w-[80px] justify-center"
          >
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>

          <div className="flex flex-wrap gap-2 justify-center">
            {onAskAI && (
              <button
                onClick={() => onAskAI(slide.slideNumber, slide.title)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-3 py-3 text-xs font-black text-white hover:bg-slate-800 transition-all touch-manipulation"
              >
                <Brain className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            )}
            {/* PDF export only shown if the lesson actually passes the hard
                quality gate — never let users save a placeholder as PPT. */}
            {canExportLesson(lesson) && (
              <button
                type="button"
                onClick={() => exportLessonAsPDF(lesson)}
                title="Export as PDF"
                className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs font-black text-emerald-700 hover:bg-emerald-100 transition-all touch-manipulation"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setIndex(v => Math.min(total - 1, v + 1))}
            disabled={index === total - 1}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white disabled:opacity-40 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 touch-manipulation min-w-[80px] justify-center"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 hidden sm:block text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest">
          ← → Arrow keys · Esc to close
        </p>
      </div>
    </section>
  );
}
