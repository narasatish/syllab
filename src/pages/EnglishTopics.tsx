/**
 * English Topics — programmatic SEO cluster for English grammar lessons.
 * Route structure:
 *   /english-grammar (index) — lists all grammar topics
 *   /english-grammar/{slug} (detail) — full lesson on one topic with FAQs, practice, cross-links
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { ENGLISH_TOPICS } from '../data/englishTopics';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/english-grammar\/([a-z-]+)/);
  return m ? m[1] : null;
}

export default function EnglishTopics({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = (to: string) => {
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const slug = parseSlug(path);
  const topic = useMemo(() => ENGLISH_TOPICS.find((t) => t.slug === slug), [slug]);

  // ── Index page: /english-grammar ──
  if (!slug) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SEO
          title="English Grammar for Students — Free Lessons, Examples & Practice | Syllab.in"
          description="Master English grammar with free lessons on tenses, parts of speech, nouns, verbs, adjectives, adverbs, and more. Includes examples, common mistakes, practice questions, and FAQs."
          keywords="english grammar, grammar lessons free, parts of speech, tenses, nouns, verbs, adjectives, adverbs, prepositions, subject verb agreement, essay writing, letter writing, reading comprehension"
          url={`${SITE}/english-grammar`}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'English Grammar for Students',
            description: 'Free English grammar lessons with examples, practice questions, and FAQs.',
            url: `${SITE}/english-grammar`,
            inLanguage: 'en-IN',
            isAccessibleForFree: true,
            image: 'https://syllab.in/og-image.png',
          }}
        />
        <PageHero
          emoji="📚"
          title="English Grammar for Students"
          subtitle="Master grammar with free lessons, examples, practice questions, and FAQs."
          className="mb-6"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {ENGLISH_TOPICS.map((t) => (
            <button
              key={t.slug}
              onClick={() => go(`/english-grammar/${t.slug}`)}
              className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-center shadow-sm transition-all hover:border-primary hover:bg-emerald-50"
            >
              <div className="text-2xl">{t.emoji}</div>
              <div className="mt-2 text-sm font-bold text-slate-800">{t.title}</div>
              <div className="mt-1 text-xs text-slate-400">{t.keyPoints.length} concepts</div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4">
          <p className="flex-1 text-sm font-bold text-emerald-800">
            Ready to practice? Try the English Lab for interactive grammar exercises and real-time feedback.
          </p>
          <button
            onClick={() => setTab('english_lab')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600"
          >
            Practice Now <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // ── Topic detail page: /english-grammar/{slug} ──
  if (!topic) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-center text-slate-600">Topic not found. {topic ? topic.title : ''}</p>
      </div>
    );
  }

  const otherTopics = ENGLISH_TOPICS.filter((t) => t.slug !== slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${topic.title} — Rules, Examples & Practice (Free) | Syllab.in`}
        description={`Learn ${topic.title.toLowerCase()} with free lessons, examples, common mistakes, practice questions, and FAQs. Master this grammar topic with Syllab — the ultimate guide for Indian students.`}
        keywords={`${topic.title.toLowerCase()}, ${topic.title.toLowerCase()} rules, ${topic.title.toLowerCase()} examples, ${topic.title.toLowerCase()} practice, free english grammar, ${topic.slug}`}
        url={`${SITE}/english-grammar/${slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'English Grammar', item: `${SITE}/english-grammar` },
              { '@type': 'ListItem', position: 2, name: topic.title, item: `${SITE}/english-grammar/${slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: topic.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
        ]}
      />

      <button
        onClick={() => go('/english-grammar')}
        className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"
      >
        <ArrowLeft size={14} /> All topics
      </button>

      <PageHero emoji={topic.emoji} title={topic.title} subtitle={topic.intro} className="mb-6" />

      {/* Key Points Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-black text-slate-900">Key Concepts</h2>
        <ul className="space-y-3">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
              <span className="shrink-0 font-black text-primary">{i + 1}.</span>
              <p className="text-sm text-slate-700">{point}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Examples Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-black text-slate-900">Examples</h2>
        <div className="space-y-3">
          {topic.examples.map((example, i) => (
            <div key={i} className="rounded-lg border-l-4 border-emerald-400 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-slate-800">{example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-black text-slate-900">Common Mistakes</h2>
        <div className="space-y-3">
          {topic.commonMistakes.map((mistake, i) => (
            <div key={i} className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
              <p className="text-sm font-medium text-slate-800">{mistake}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-black text-slate-900">Practice Questions</h2>
        <div className="space-y-3">
          {topic.practice.map((item, i) => (
            <div key={i} className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
              <p className="font-bold text-slate-800">Q{i + 1}. {item.q}</p>
              <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-800">
                <strong>Answer:</strong> {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-black text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {topic.faqs.map((faq, i) => (
            <div key={i} className="border border-slate-100 bg-white shadow-sm">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-slate-50"
              >
                <p className="font-bold text-slate-800">{faq.q}</p>
                {expandedFaq === i ? (
                  <ChevronUp size={18} className="shrink-0 text-primary" />
                ) : (
                  <ChevronDown size={18} className="shrink-0 text-slate-400" />
                )}
              </button>
              {expandedFaq === i && (
                <div className="border-t border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA to English Lab */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4">
        <p className="flex-1 text-sm font-bold text-emerald-800">
          Ready to sharpen your grammar skills? Try interactive exercises in the English Lab.
        </p>
        <button
          onClick={() => setTab('english_lab')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600"
        >
          Go to English Lab <ArrowRight size={15} />
        </button>
      </div>

      {/* Related Topics Navigation */}
      <nav className="mt-6 border-t border-slate-100 pt-4">
        <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">Explore other grammar topics</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {otherTopics.slice(0, 6).map((t) => (
            <button
              key={t.slug}
              onClick={() => go(`/english-grammar/${t.slug}`)}
              className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200"
            >
              {t.emoji} {t.title}
            </button>
          ))}
        </div>
        {otherTopics.length > 6 && (
          <button
            onClick={() => go('/english-grammar')}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-emerald-700"
          >
            View all topics <ArrowRight size={12} />
          </button>
        )}
      </nav>
    </div>
  );
}
