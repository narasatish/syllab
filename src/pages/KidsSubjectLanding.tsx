/**
 * KidsSubjectLanding — keyword-targeted SEO landing pages for "<subject> for kids"
 * searches (Maths / Science / English for kids). One component, 3 routes; the
 * subject is read from the path. Funnels visitors into the free Kids Zone.
 */
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

interface SubjectLanding {
  path: string;
  emoji: string;
  h1: string;
  keyword: string;
  intro: string;
  learn: string[];
  faqs: { q: string; a: string }[];
  ctas: { label: string; tab: string }[];
}

const SUBJECTS: Record<string, SubjectLanding> = {
  '/maths-for-kids': {
    path: '/maths-for-kids', emoji: '🔢', h1: 'Maths for Kids — Free, Fun & Online',
    keyword: 'maths for kids',
    intro: 'Make numbers fun! Syllab’s free Maths for Kids helps children from Pre-KG to Class 5 learn counting, shapes, addition, subtraction and tables through colourful games, tap-to-count activities and printable worksheets — no fees, no ads-for-kids, no login needed.',
    learn: ['Counting 1–100 with visual dots', 'Shapes, patterns and sorting', 'Addition & subtraction with pictures', 'Multiplication tables 2–20 (printable charts)', 'Fun maths games and 200+ printable worksheets'],
    faqs: [
      { q: 'Is Maths for Kids on Syllab really free?', a: 'Yes — every counting activity, game, table chart and worksheet is 100% free, with no signup required.' },
      { q: 'What age is it for?', a: 'It’s designed for children from Pre-KG to Class 5 (roughly ages 3–10), starting from counting and going up to tables and basic operations.' },
      { q: 'Can I print the maths worksheets?', a: 'Yes. Syllab has 200+ free printable PDF worksheets you can download and print at home.' },
    ],
    ctas: [{ label: '🔢 Start counting & maths games', tab: 'kids' }, { label: '🖨️ Free maths worksheets', tab: 'worksheets' }, { label: '📐 Maths tables & charts', tab: 'maths_tables' }],
  },
  '/science-for-kids': {
    path: '/science-for-kids', emoji: '🔬', h1: 'Science for Kids — Free, Fun & Online',
    keyword: 'science for kids',
    intro: 'Spark curiosity! Syllab’s free Science for Kids introduces young learners to animals, plants, the human body, weather and space through animated diagrams, simple stories and tap-to-learn activities — all free for Indian kids.',
    learn: ['Animals, insects, birds and where they live', 'Plants, the water cycle and weather', 'The human body — eyes, heart, digestion (animated!)', 'The solar system and phases of the Moon', 'Everyday science explained in simple words'],
    faqs: [
      { q: 'Is Science for Kids free?', a: 'Yes — all the animated lessons, activities and reading are completely free, no login needed.' },
      { q: 'How does the animated learning work?', a: 'Syllab’s Visual Learning plays each concept step by step — like the water cycle or the human heart — so kids can watch and understand, not just read.' },
    ],
    ctas: [{ label: '🐾 Explore animals & nature', tab: 'kids' }, { label: '🎬 Watch animated science', tab: 'visual_learning' }, { label: '🖨️ Free science worksheets', tab: 'worksheets' }],
  },
  '/english-for-kids': {
    path: '/english-for-kids', emoji: '🔤', h1: 'English for Kids — Free, Fun & Online',
    keyword: 'english for kids',
    intro: 'Help your child read, speak and spell with confidence. Syllab’s free English for Kids covers the alphabet, phonics, sight words, rhymes and stories with audio — plus printable worksheets — for Pre-KG to Class 5, completely free.',
    learn: ['Alphabet A–Z with sounds (phonics)', 'Sight words and easy reading', 'Nursery rhymes and moral stories', 'Spelling, vocabulary and simple grammar', 'Printable English worksheets and tracing sheets'],
    faqs: [
      { q: 'Is English for Kids free on Syllab?', a: 'Yes — alphabet, phonics, rhymes, stories and worksheets are all free, with no signup.' },
      { q: 'Does it help with reading and pronunciation?', a: 'Yes. Activities include audio so children hear correct sounds, and the older English section has an AI speaking coach for fluency.' },
    ],
    ctas: [{ label: '🔤 Start alphabet & phonics', tab: 'kids' }, { label: '🗣️ English speaking practice', tab: 'english_lab' }, { label: '🖨️ Free English worksheets', tab: 'worksheets' }],
  },
};

export default function KidsSubjectLanding({ setTab }: { setTab?: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const s = SUBJECTS[path] || SUBJECTS['/maths-for-kids'];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${s.h1} | Syllab.in`}
        description={s.intro.slice(0, 158)}
        keywords={`${s.keyword}, ${s.keyword} free, ${s.keyword} online, free ${s.keyword} india, ${s.keyword} games, ${s.keyword} worksheets, learn ${s.keyword}`}
        url={`${SITE}${s.path}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'LearningResource', name: s.h1, description: s.intro, educationalLevel: 'Pre-KG to Class 5', inLanguage: 'en-IN', isAccessibleForFree: true, audience: { '@type': 'EducationalAudience', educationalRole: 'student' }, publisher: { '@type': 'Organization', name: 'Syllab.in' } },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        ]}
      />
      <PageHero emoji={s.emoji} title={s.h1} subtitle="Free for every Indian child — games, activities and printable worksheets. No fees, no login." className="mb-6" />

      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{s.intro}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        {s.ctas.map((c) => (
          <button key={c.label} onClick={() => setTab?.(c.tab)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">{c.label}</button>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-xl font-black text-slate-900 dark:text-slate-100">What your child will learn</h2>
      <ul className="space-y-2">
        {s.learn.map((l) => (
          <li key={l} className="flex gap-2 text-slate-700 dark:text-slate-300"><span className="mt-0.5 text-primary">✓</span> {l}</li>
        ))}
      </ul>

      <h2 className="mb-3 mt-8 text-xl font-black text-slate-900 dark:text-slate-100">Frequently asked questions</h2>
      <div className="space-y-3">
        {s.faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
            <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-center dark:bg-emerald-950/30">
        <p className="font-black text-emerald-900 dark:text-emerald-200">Everything on Syllab is 100% free — open the Kids Zone and start now!</p>
        <button onClick={() => setTab?.('kids')} className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-white hover:bg-emerald-600">Open Kids Zone →</button>
      </div>
    </div>
  );
}
