import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { ALTERNATIVES, getAlternative, type Alternative } from '../data/alternatives';

const SITE = 'https://syllab.in';

function currentSlug(): string {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/free-alternatives';
  return path.replace(/^\//, '').replace(/\/$/, '');
}

export default function AlternativesPage() {
  const [slug, setSlug] = useState(currentSlug());
  useEffect(() => {
    const onPop = () => setSlug(currentSlug());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const alt = getAlternative(slug);
  return alt ? <AltDetail alt={alt} /> : <AltHub />;
}

// ------------------------------- HUB -------------------------------
function AltHub() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SEO
        title="Free Alternatives to BYJU'S, Unacademy, Kahoot & Vedantu (2026) | Syllab.in"
        description="Looking for a free alternative to BYJU'S, Unacademy, Vedantu, Toppr or Kahoot? Syllab gives Indian students free NCERT solutions, mock tests, an AI tutor and live quizzes for Class 1–12 — no subscription."
        keywords="free alternative to byjus, unacademy free alternative, kahoot alternative India, vedantu free alternative, toppr alternative, free learning app India, free education app for students"
        url={`${SITE}/free-alternatives`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'CollectionPage',
          name: 'Free Alternatives to Top Learning Apps', url: `${SITE}/free-alternatives`,
          isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: SITE },
        }}
      />
      <PageHero
        emoji="🆓"
        title="Free Alternatives to India's Top Learning Apps"
        subtitle="Everything those apps charge for — NCERT solutions, mock tests, an AI tutor and live quizzes — free on Syllab, for Class 1–12."
        gradient="from-emerald-500 via-teal-600 to-cyan-700"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {ALTERNATIVES.map((a) => (
          <a key={a.slug} href={`/${a.slug}`}
            className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl">
            <div className="text-3xl">{a.emoji}</div>
            <h2 className="mt-2 font-black text-slate-900">Free alternative to {a.brand}</h2>
            <p className="text-sm text-slate-600">Known for {a.knownFor}. See how Syllab does it free →</p>
          </a>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Brand names are used only to help you compare. Syllab is an independent, free platform and is not affiliated
        with these companies. Pricing/features as commonly advertised — check each provider for current plans.
      </p>
    </div>
  );
}

// ------------------------------ DETAIL ------------------------------
function AltDetail({ alt }: { alt: Alternative }) {
  const rows: { label: string; syllab: string; them: string }[] = [
    { label: 'Price', syllab: 'Free forever (₹0)', them: alt.pricingNote },
    { label: 'NCERT solutions (Class 6–12)', syllab: '✓ Free, chapter-wise', them: 'Often in a paid plan' },
    { label: 'Mock tests & practice', syllab: '✓ Free, unlimited', them: 'Often in a paid plan' },
    { label: 'AI tutor — 24/7 doubts', syllab: '✓ Free', them: 'Limited / paid' },
    { label: 'Live multiplayer quiz', syllab: '✓ Free, no player limit', them: 'Varies' },
    { label: 'Account to get started', syllab: 'Optional', them: 'Sign-up required' },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: alt.faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SEO
        title={`Free Alternative to ${alt.brand} — Syllab.in (2026)`}
        description={`Looking for a free alternative to ${alt.brand}? Syllab gives Indian students free NCERT solutions, mock tests, an AI tutor and live quizzes for Class 1–12 — no subscription needed.`}
        keywords={`free alternative to ${alt.brand}, ${alt.brand} free alternative, ${alt.brand} vs Syllab, free ${alt.knownFor} India, free learning app like ${alt.brand}`}
        url={`${SITE}/${alt.slug}`}
        jsonLd={faqJsonLd}
      />
      <PageHero
        emoji={alt.emoji}
        title={`A free alternative to ${alt.brand}`}
        subtitle={`${alt.brand} is popular for ${alt.knownFor}. Syllab gives Indian students the same kind of help — free.`}
        gradient={alt.gradient}
      />

      {/* Hero feature CTA */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
        <h2 className="text-xl font-black text-slate-900">{alt.heroFeature.name} — free</h2>
        <p className="mt-2 text-slate-600">{alt.heroFeature.blurb}</p>
        <a href={alt.heroFeature.path}
          className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-2.5 font-black text-white transition hover:bg-emerald-700">
          Try it free →
        </a>
      </div>

      {/* Comparison */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-3 bg-slate-50 text-sm font-black text-slate-500">
          <div className="p-3" />
          <div className="p-3 text-center text-emerald-700">Syllab</div>
          <div className="p-3 text-center">{alt.brand} &amp; similar paid apps</div>
        </div>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-3 border-t border-slate-100 text-sm">
            <div className="p-3 font-semibold text-slate-700">{r.label}</div>
            <div className="p-3 text-center font-bold text-emerald-700">{r.syllab}</div>
            <div className="p-3 text-center text-slate-500">{r.them}</div>
          </div>
        ))}
      </div>

      {/* Also free */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
        <h3 className="text-lg font-black text-slate-900">Also free on Syllab</h3>
        <ul className="mt-3 space-y-2">
          {alt.alsoFree.map((f) => (
            <li key={f} className="flex items-start gap-2 text-slate-700"><span className="text-emerald-600">✓</span>{f}</li>
          ))}
        </ul>
      </div>

      {/* FAQ (visible + schema) */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
        <h3 className="text-lg font-black text-slate-900">Frequently asked questions</h3>
        <div className="mt-3 divide-y divide-slate-100">
          {alt.faqs.map((f) => (
            <div key={f.q} className="py-3">
              <p className="font-bold text-slate-800">{f.q}</p>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="flex flex-wrap gap-2">
        {[['NCERT Solutions', '/ncert-solutions'], ['Mock Tests', '/mock-tests'], ['AI Tutor', '/ai-tutor'], ['Live Quiz', '/live-quiz'], ['All free alternatives', '/free-alternatives']].map(([t, p]) => (
          <a key={p} href={p} className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200">{t} →</a>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        Syllab is an independent, free platform and is not affiliated with {alt.brand}. {alt.brand} is a trademark of its
        owner; the name is used here only for comparison. Pricing/features as commonly advertised — check the provider for current plans.
      </p>
    </div>
  );
}
