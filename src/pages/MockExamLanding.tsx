/**
 * Mock Exam Landing Pages — programmatic SEO cluster for India's entrance exams.
 * One rich, indexable page per exam (/mock-tests/{slug}). Each page includes:
 * - SEO with BreadcrumbList and FAQPage JSON-LD
 * - Exam pattern details (questions, duration, marking, sections)
 * - Preparation tips and FAQs
 * - Cross-links to other exams
 */
import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { MOCK_EXAMS } from '../data/mockExams';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

function parseSlug(pathname: string): string | null {
  const m = pathname.match(/\/mock-tests\/([a-z-]+)/);
  return m ? m[1] : null;
}

// Broad subjects the AI question generator handles well. We pick the exam's
// first few of these so "Start mock test" launches a real, exam-relevant paper.
const GENERATABLE = new Set([
  'Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'English Language',
  'General Knowledge', 'Current Affairs', 'Logical Reasoning', 'Quantitative Ability',
  'Reasoning', 'General Aptitude', 'Aptitude', 'Verbal Ability',
]);

/** Map an exam to a mock config the generator can actually build a paper from. */
function mockConfigFor(exam: { subjects: string[] }): { class: string; subjects: string[]; level: string; count: number } {
  const preferred = exam.subjects.filter((s) => GENERATABLE.has(s));
  const subjects = (preferred.length ? preferred : exam.subjects).slice(0, 3);
  return { class: '12', subjects, level: 'Medium', count: 30 };
}

// Exam-specific counselling/admission route (accurate, evergreen — no dated numbers).
const COUNSELLING: Record<string, string> = {
  'neet': 'MCC (mcc.nic.in) for the 15% All-India Quota, plus your state counselling authority for state-quota seats',
  'jee-main': 'JoSAA (josaa.nic.in) for NITs, IIITs and CFTIs, followed by CSAB special rounds',
  'jee-advanced': 'JoSAA (josaa.nic.in) for admission to the IITs',
  'clat': 'the CLAT Consortium (consortiumofnlus.ac.in) for the participating National Law Universities',
  'ailet': "National Law University (NLU) Delhi's own admission portal",
  'ipmat': "IIM Indore's admission process (and other participating IIMs)",
  'nata': 'the Council of Architecture and the relevant state/institute counselling for B.Arch admission',
  'bitsat': 'the BITS Pilani admissions portal (bitsadmission.com)',
  'viteee': "VIT's own rank-based counselling across its campuses",
  'srmjeee': "SRM's own rank-based counselling across its campuses",
  'comedk-uget': 'the COMEDK counselling portal for private Karnataka colleges',
  'cuet': "the CUET-participating universities' own CSAS/admission portals",
  'ap-eapcet': 'the AP state counselling authority (APSCHE)',
  'ts-eapcet': 'the Telangana state counselling authority (TSCHE)',
  'kcet': 'the Karnataka Examinations Authority (KEA) counselling',
  'mht-cet': 'the Maharashtra CET Cell (CAP rounds)',
  'wbjee': 'the West Bengal Joint Entrance Examinations Board counselling',
  'gujcet': 'the Gujarat ACPC counselling',
};
const counsellingFor = (slug: string) => COUNSELLING[slug] || "the official conducting body's counselling / admission process";

export default function MockExamLanding({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
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
  const exam = useMemo(() => MOCK_EXAMS.find((e) => e.slug === slug), [slug]);
  const otherExams = useMemo(() => MOCK_EXAMS.filter((e) => e.slug !== slug), [slug]);

  // ── Fallback: No exam matched ──
  if (!exam) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SEO
          title="Free Mock Tests for Entrance Exams | JEE, NEET, EAPCET & More | Syllab.in"
          description="Practice free mock tests for JEE Main, NEET, AP EAPCET, TS EAPCET, BITSAT, KCET, MHT CET, WBJEE, and Science/Maths Olympiads. Online exam practice with answers."
          keywords="mock test free, jee main mock test, neet mock test, eapcet mock test, bitsat mock test, online mock test india, entrance exam practice"
          url={`${SITE}/mock-tests`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Mock Tests for Entrance Exams', url: `${SITE}/mock-tests`, inLanguage: 'en-IN', isAccessibleForFree: true }}
        />
        <PageHero emoji="📝" title="Mock Tests for Entrance Exams" subtitle="Choose an exam to start your free practice mock test." className="mb-6" />
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm font-bold text-slate-600">Exam not found. Please go back and select a valid exam.</p>
          <button
            onClick={() => setTab('mock_tests')}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-emerald-600"
          >
            <ArrowLeft size={16} /> Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  // ── Per-exam page ──
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`Free ${exam.fullName} Mock Test 2026 | Online Practice with Answers | Syllab.in`}
        description={`Free ${exam.name} mock tests, plus exam pattern, syllabus, preparation tips, and how the ${exam.name} result, cutoff and counselling work. ${exam.about.substring(0, 90)}...`}
        keywords={`${exam.slug} mock test, ${exam.name} mock test free, ${exam.name} practice test, ${exam.name} exam pattern, ${exam.name} cutoff, ${exam.name} result, ${exam.name} counselling, ${exam.name} syllabus, entrance exam practice`}
        url={`${SITE}/mock-tests/${exam.slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Mock Tests', item: `${SITE}/mock-tests` },
              { '@type': 'ListItem', position: 2, name: exam.fullName, item: `${SITE}/mock-tests/${exam.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: exam.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
        ]}
      />

      {/* Back button */}
      <button
        onClick={() => go('/mock-tests')}
        className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"
      >
        <ArrowLeft size={14} /> All exams
      </button>

      {/* Hero */}
      <PageHero
        emoji={exam.emoji}
        title={exam.name}
        subtitle={exam.fullName}
        className="mb-6"
      />

      {/* About */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">About the Exam</h2>
        <p className="text-sm text-slate-700 leading-relaxed">{exam.about}</p>
      </section>

      {/* Exam Pattern */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Exam Pattern</h2>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-bold text-slate-600">Total Questions</span>
            <span className="text-sm font-black text-slate-900">{exam.pattern.questions}</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3">
            <span className="text-sm font-bold text-slate-600">Duration</span>
            <span className="text-sm font-black text-slate-900">{exam.pattern.durationMin} minutes</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3">
            <span className="text-sm font-bold text-slate-600">Marking</span>
            <span className="text-sm font-black text-slate-900">{exam.pattern.marking}</span>
          </div>
          <div className="border-t border-slate-100 pt-3">
            <p className="mb-2 text-sm font-bold text-slate-600">Sections</p>
            <div className="space-y-1">
              {exam.pattern.sections.map((section, idx) => (
                <div key={idx} className="text-sm text-slate-700">• {section}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Covered */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Subjects & Topics Covered</h2>
        <div className="flex flex-wrap gap-2">
          {exam.subjects.map((subject, idx) => (
            <span key={idx} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              {subject}
            </span>
          ))}
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Preparation Tips</h2>
        <div className="space-y-3">
          {exam.tips.map((tip, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-black text-primary">Tip {idx + 1}:</span> {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Result, Cutoff & Counselling — evergreen, exam-aware (no dated numbers) */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">{exam.name} Result, Cutoff &amp; Counselling</h2>
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-sm">
          <p><span className="font-black text-slate-900">How to check the result:</span> Once the {exam.name} result is declared, log in to the official conducting body's website with your application number and password / date of birth, then download your scorecard or rank card.</p>
          <p><span className="font-black text-slate-900">Understanding the cutoff:</span> The {exam.name} cutoff is the minimum rank or score needed to get a seat. It changes every year with the number of candidates, the paper's difficulty and the seats available, and it also differs by category (General / OBC / SC / ST / EWS) and quota — so always check the latest official cutoff.</p>
          <p><span className="font-black text-slate-900">Counselling &amp; admission:</span> Admission is through {counsellingFor(exam.slug)}. You register, fill your college/branch choices by rank, and report for document verification and seat confirmation.</p>
          <p className="text-xs text-slate-500">📌 Exact dates, cutoffs and the counselling process are announced officially each year — always verify on the official website before acting.</p>
        </div>
      </section>

      {/* CTA Button */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 mb-8">
        <p className="flex-1 text-sm font-bold text-emerald-800">
          Ready to start your {exam.name} mock test? Practice now with full answers and explanations.
        </p>
        <button
          onClick={() => {
            try { sessionStorage.setItem('syllab_mock_autostart', JSON.stringify(mockConfigFor(exam))); } catch { /* ignore */ }
            setTab('mock_tests');
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600"
        >
          Start {exam.name} Mock Test <ArrowRight size={15} />
        </button>
      </div>

      {/* FAQs */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-black text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {exam.faqs.map((faq, idx) => (
            <details key={idx} className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <summary className="cursor-pointer p-4 font-bold text-slate-800 hover:text-primary">
                {faq.q}
              </summary>
              <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-700 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold text-amber-800">
            📌 Disclaimer: This mock test is for practice and learning purposes only. Please verify the official exam pattern, dates, and eligibility criteria on the official exam website before appearing for the actual exam.
          </p>
        </div>
      </section>

      {/* Cross-links to other exams */}
      {otherExams.length > 0 && (
        <nav className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">Try other entrance exams</p>
          <div className="flex flex-wrap gap-2">
            {otherExams.slice(0, 6).map((other) => (
              <button
                key={other.slug}
                onClick={() => go(`/mock-tests/${other.slug}`)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
              >
                {other.emoji} {other.name}
              </button>
            ))}
            {otherExams.length > 6 && (
              <button
                onClick={() => setTab('mock_tests')}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
              >
                +{otherExams.length - 6} more
              </button>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
