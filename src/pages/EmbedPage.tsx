/**
 * EmbedPage (/embed) — "Link to / Embed Syllab" page. Gives teachers, bloggers and
 * school sites ready copy-paste HTML badges + widgets that contain a REAL anchor
 * link back to Syllab (a legitimate, white-hat backlink enabler). Each snippet is
 * plain HTML the host pastes into their own page, so the backlink lives on THEIR site.
 */
import { useState } from 'react';
import { Copy, Check, Link2 } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const SITE = 'https://syllab.in';

interface Snippet { id: string; label: string; note: string; code: string; }

const SNIPPETS: Snippet[] = [
  {
    id: 'badge',
    label: 'Syllab badge (text link)',
    note: 'A simple, clean text link — great for a school/blog "useful resources" list.',
    code: `<a href="https://syllab.in" target="_blank" rel="noopener" style="font-family:system-ui,sans-serif;font-weight:700;color:#10b981;text-decoration:none;">📚 Free CBSE &amp; NCERT learning — Syllab.in</a>`,
  },
  {
    id: 'card',
    label: 'Resource card (styled box)',
    note: 'A styled card linking to free NCERT solutions — looks good in a sidebar or resources page.',
    code: `<a href="https://syllab.in/ncert-solutions" target="_blank" rel="noopener" style="display:block;max-width:320px;padding:16px 18px;border:1px solid #e2e8f0;border-radius:16px;font-family:system-ui,sans-serif;text-decoration:none;color:#0f172a;box-shadow:0 1px 3px rgba(0,0,0,.06);">
  <div style="font-size:22px">📖</div>
  <div style="font-weight:800;margin-top:6px">Free NCERT Solutions (Class 6–12)</div>
  <div style="font-size:13px;color:#64748b;margin-top:4px">Step-by-step answers, free on Syllab.in</div>
</a>`,
  },
  {
    id: 'tools',
    label: 'Free tools list',
    note: 'Links to your most useful free resources — ideal for a teacher/parent blog.',
    code: `<div style="font-family:system-ui,sans-serif;max-width:360px">
  <strong>Free study resources (Syllab.in):</strong>
  <ul style="margin:8px 0 0;padding-left:18px;line-height:1.9">
    <li><a href="https://syllab.in/ncert-solutions" rel="noopener">NCERT Solutions</a></li>
    <li><a href="https://syllab.in/formula-sheets" rel="noopener">Formula Sheets (PDF)</a></li>
    <li><a href="https://syllab.in/previous-year-papers" rel="noopener">Previous Year Papers</a></li>
    <li><a href="https://syllab.in/calculators" rel="noopener">Student Calculators</a></li>
  </ul>
</div>`,
  },
];

function SnippetBox({ s }: { s: Snippet }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(s.code); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="font-black text-slate-800 dark:text-slate-100">{s.label}</div>
        <button onClick={copy} className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-black text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
          {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
      <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">{s.note}</p>
      {/* eslint-disable-next-line react/no-danger -- trusted static preview */}
      <div className="mb-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/40" dangerouslySetInnerHTML={{ __html: s.code }} />
      <textarea readOnly value={s.code} onFocus={(e) => e.currentTarget.select()} className="h-28 w-full resize-none rounded-lg bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-emerald-200" />
    </div>
  );
}

export default function EmbedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Link to Syllab — Free Embed Badges & Widgets for Your Site | Syllab.in"
        description="Add Syllab's free study resources to your school site, blog or classroom page. Copy-paste badges and widgets linking to free NCERT solutions, formula sheets and more — 100% free."
        keywords="link to syllab, embed free study tools, education widget for website, free ncert solutions widget, school resources link"
        url={`${SITE}/embed`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Link to Syllab', url: `${SITE}/embed`, inLanguage: 'en-IN' }}
      />
      <PageHero emoji="🔗" title="Add Syllab to Your Site" subtitle="Teachers, bloggers & schools — embed our free resources with one copy-paste. Help your readers, free forever." className="mb-6" />

      <div className="mb-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <div className="flex items-start gap-2">
          <Link2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            Pick a snippet, click <strong>Copy</strong>, and paste the HTML into your website, blog or LMS page. It shows a clean link to Syllab's free resources — no signup, no cost, and you can edit the text to fit your page.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {SNIPPETS.map((s) => <SnippetBox key={s.id} s={s} />)}
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        Running a school, coaching centre or education blog? Email <a href="/contact" className="text-primary underline">contact</a> for a custom worksheet/resource pack to share with your students.
      </p>
    </div>
  );
}
