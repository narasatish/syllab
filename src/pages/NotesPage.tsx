/**
 * NotesPage.tsx — a free, private, rich-text notepad (Docs/Word-lite). Multiple
 * notes in a sidebar; each has a title + a contentEditable rich body with a
 * formatting toolbar (document.execCommand). Auto-saves to localStorage
 * (debounced), survives reload, and works fully offline. No signup, no upload.
 *
 * SECURITY: a note body is user HTML that we re-render, so it is sanitised on
 * PASTE, on SAVE and on LOAD (src/lib/notepad.sanitizeHtml). The sidebar preview
 * uses textContent only. We NEVER dangerouslySetInnerHTML unsanitised.
 *
 * contentEditable + React: innerHTML is written from state ONLY in an effect
 * keyed on the active note id (not on every keystroke) so the caret never jumps;
 * on input we READ innerHTML to save, and the div is never a controlled input.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Bold, Italic, Underline, Heading, List, ListOrdered, RemoveFormatting,
  Plus, Trash2, NotebookPen, ShieldCheck,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { sanitizeHtml, previewText, wordCount } from '../lib/notepad';

const SITE = 'https://syllab.in';
const STORE_KEY = 'syllab_notes_v1';

interface Note { id: string; title: string; body: string; updated: number }

const newId = () => `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
const blankNote = (): Note => ({ id: newId(), title: '', body: '', updated: Date.now() });

function load(): Note[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Sanitise every body ON LOAD — stored HTML is still untrusted.
    return arr
      .filter((n) => n && typeof n.id === 'string')
      .map((n) => ({ id: n.id, title: String(n.title || ''), body: sanitizeHtml(String(n.body || '')), updated: Number(n.updated) || Date.now() }));
  } catch { return []; }
}

const TOOLBAR: { cmd: string; arg?: string; icon: typeof Bold; label: string }[] = [
  { cmd: 'bold', icon: Bold, label: 'Bold' },
  { cmd: 'italic', icon: Italic, label: 'Italic' },
  { cmd: 'underline', icon: Underline, label: 'Underline' },
  { cmd: 'formatBlock', arg: 'H3', icon: Heading, label: 'Heading' },
  { cmd: 'insertUnorderedList', icon: List, label: 'Bullet list' },
  { cmd: 'insertOrderedList', icon: ListOrdered, label: 'Numbered list' },
  { cmd: 'removeFormat', icon: RemoveFormatting, label: 'Clear formatting' },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [words, setWords] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<number | null>(null);

  const active = useMemo(() => notes.find((n) => n.id === activeId) || null, [notes, activeId]);

  // Initial load (client only).
  useEffect(() => {
    const loaded = load();
    if (loaded.length) { setNotes(loaded); setActiveId(loaded[0].id); }
    else { const n = blankNote(); setNotes([n]); setActiveId(n.id); }
  }, []);

  const persist = useCallback((next: Note[]) => {
    setNotes(next);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* quota — ignore */ }
  }, []);

  // Write the editor's HTML from state ONLY when the active note changes
  // (switch / create / delete) — never on keystroke, so the caret is stable.
  useEffect(() => {
    if (!editorRef.current || !active) return;
    const clean = sanitizeHtml(active.body);
    editorRef.current.innerHTML = clean;
    setWords(wordCount(clean));
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save of the live editor HTML into the active note.
  const scheduleSave = useCallback(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      const el = editorRef.current;
      if (!el || !activeId) return;
      const clean = sanitizeHtml(el.innerHTML); // sanitise ON SAVE
      setNotes((prev) => {
        const next = prev.map((n) => (n.id === activeId ? { ...n, body: clean, updated: Date.now() } : n));
        try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
        return next;
      });
    }, 400);
  }, [activeId]);

  const onInput = () => {
    if (editorRef.current) setWords(wordCount(editorRef.current.innerHTML)); // live count
    scheduleSave();
  };

  // Sanitise pasted content BEFORE it enters the live DOM (an <img onerror>
  // would otherwise execute on insertion). Insert clean HTML instead.
  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const clean = html ? sanitizeHtml(html) : escapeText(e.clipboardData.getData('text/plain'));
    document.execCommand('insertHTML', false, clean);
    onInput();
  };

  const exec = (cmd: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, arg);
    onInput();
  };

  const setTitle = (title: string) => {
    if (!activeId) return;
    persist(notes.map((n) => (n.id === activeId ? { ...n, title, updated: Date.now() } : n)));
  };

  const addNote = () => {
    const n = blankNote();
    persist([n, ...notes]);
    setActiveId(n.id);
  };

  const removeNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    const label = note?.title?.trim() || previewText(note?.body || '', 30) || 'this note';
    if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;
    const next = notes.filter((n) => n.id !== id);
    if (next.length === 0) { const fresh = blankNote(); persist([fresh]); setActiveId(fresh.id); return; }
    persist(next);
    if (id === activeId) setActiveId(next[0].id);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <style>{`.notes-editor:empty::before{content:attr(data-placeholder);color:#94a3b8;pointer-events:none;}.notes-editor h3{font-size:1.15rem;font-weight:800;margin:.4rem 0;}.notes-editor ul{list-style:disc;padding-left:1.4rem;}.notes-editor ol{list-style:decimal;padding-left:1.4rem;}.notes-editor a{color:#0ea5e9;text-decoration:underline;}`}</style>
      <SEO
        title="Free Online Notepad That Saves — Private Notes App | Syllab.in"
        description="A free online notepad that saves automatically in your browser. Write rich-text notes with bold, headings and lists, keep multiple notes, and they stay after you reload — no signup, nothing uploaded, works offline."
        keywords="free online notepad, notepad that saves, notes app browser, save notes online, online notepad, rich text notepad, private notes, notepad no login"
        url={`${SITE}/notes`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Notepad', applicationCategory: 'Productivity', operatingSystem: 'Web', url: `${SITE}/notes`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'Do my notes get saved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every note auto-saves to your browser as you type and stays after you reload or close the tab. Notes are stored on your device only — nothing is uploaded.' } },
            { '@type': 'Question', name: 'Is this notepad private?', acceptedAnswer: { '@type': 'Answer', text: 'Completely. Notes never leave your browser and there is no account or upload. Clearing your browser data will remove them, so copy anything important elsewhere too.' } },
          ] },
        ]}
      />
      <PageHero emoji="📝" title="Notepad" subtitle="A private rich-text notepad that saves as you type. Multiple notes, formatting, offline." className="mb-3" />

      <p className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300"><ShieldCheck size={13} /> Saves locally & instantly — nothing is uploaded</p>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-56 md:flex-shrink-0">
          <button type="button" onClick={addNote} className="mb-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow hover:opacity-90 transition">
            <Plus size={15} /> New note
          </button>
          <ul className="space-y-1.5 md:max-h-[30rem] md:overflow-auto">
            {notes.map((n) => {
              const title = n.title.trim() || previewText(n.body, 40) || 'Untitled note';
              return (
                <li key={n.id}>
                  <div className={`group flex items-center gap-1 rounded-xl border px-3 py-2 transition ${n.id === activeId ? 'border-primary/40 bg-primary/5' : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-200'}`}>
                    <button type="button" onClick={() => setActiveId(n.id)} className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-sm font-black text-slate-800 dark:text-slate-100">{title}</span>
                      <span className="block truncate text-[11px] text-slate-400">{previewText(n.body, 46) || 'Empty'}</span>
                    </button>
                    <button type="button" onClick={() => removeNote(n.id)} aria-label="Delete note" className="rounded-lg p-1 text-slate-300 hover:bg-rose-50 hover:text-rose-500"><Trash2 size={14} /></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Editor */}
        <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <input value={active?.title ?? ''} onChange={(e) => setTitle(e.target.value)} placeholder="Note title"
            className="w-full rounded-t-2xl border-b border-slate-100 dark:border-slate-700 bg-transparent px-4 py-3 text-lg font-black text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-300" />

          <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 dark:border-slate-700 px-2 py-1.5">
            {TOOLBAR.map(({ cmd, arg, icon: Icon, label }) => (
              // onMouseDown + preventDefault so the editor keeps its selection.
              <button key={label} type="button" title={label} aria-label={label}
                onMouseDown={(e) => { e.preventDefault(); exec(cmd, arg); }}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition">
                <Icon size={16} />
              </button>
            ))}
            <span className="ml-auto pr-2 text-[11px] font-bold text-slate-400">{words} word{words === 1 ? '' : 's'}</span>
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={onInput}
            onPaste={onPaste}
            data-placeholder="Start writing… your note saves automatically."
            className="notes-editor min-h-[24rem] w-full overflow-auto px-4 py-3 text-[15px] leading-relaxed text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">A free online notepad that actually saves</h2>
        <p>Type notes with <strong>bold, italics, headings and lists</strong>, keep as many notes as you like, and everything <strong>auto-saves to your browser</strong> — so your notes are still here when you come back, even offline. There is no login and nothing is uploaded; your notes stay private on your device.</p>
        <p>Because notes live in this browser, clearing your browser data removes them — copy anything important elsewhere too. Comparing two drafts? Use the free <a href="/compare" className="font-bold text-primary hover:underline">Compare</a> tool, or turn notes into a PDF with <a href="/pdf-tools" className="font-bold text-primary hover:underline">PDF Tools</a>.</p>
      </section>

      <ToolRelated current="/notes" />
    </div>
  );
}

function escapeText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}
