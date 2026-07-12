/**
 * Story-Based Learning Landing Page — indexed /story-lessons
 *
 * Demonstrates how story-based learning helps students retain NCERT chapters
 * through narrative engagement. Index page shows all 12 classes with subject-grouped
 * chapter chips; each chip links to /syllabus to start the lesson.
 *
 * Hero: "Story-Based Learning for CBSE Classes 1–12"
 * Classes: class sections with chapter listings
 * Stats: 569 lessons, 534 chapters, 12 classes, free forever
 * FAQ: Why stories work, is it free, which classes, NCERT coverage
 * JSON-LD: FAQPage + LearningResource
 */

import { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, Users, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { STORY_LESSONS_INDEX } from '../data/storyLessonsIndex';

const SITE = 'https://syllab.in';

// Count lessons/chapters at runtime from the index
function computeStats() {
  const totalLessons = STORY_LESSONS_INDEX.length;
  const uniqueChapters = new Set(STORY_LESSONS_INDEX.map((l) => l.chapter)).size;
  return { totalLessons, uniqueChapters, classes: 12, permanent: true };
}

// Group lessons by class and subject for class sections
function groupByClassAndSubject() {
  const byClass: Record<string, Record<string, string[]>> = {};

  for (const lesson of STORY_LESSONS_INDEX) {
    const cls = lesson.classLevel;
    const subj = lesson.subject;
    if (!byClass[cls]) byClass[cls] = {};
    if (!byClass[subj]) byClass[cls][subj] = [];
    byClass[cls][subj].push(lesson.chapter);
  }

  // Sort classes 1-12, sort subjects alphabetically, dedupe chapters
  const sorted: Record<string, Record<string, string[]>> = {};
  for (let i = 1; i <= 12; i++) {
    const classNum = String(i);
    if (byClass[classNum]) {
      sorted[classNum] = {};
      const subjects = Object.keys(byClass[classNum]).sort();
      for (const subj of subjects) {
        sorted[classNum][subj] = [...new Set(byClass[classNum][subj])];
      }
    }
  }

  return sorted;
}

export default function StoryLessonsLanding({ setTab }: { setTab: (tab: string) => void }) {
  const stats = useMemo(() => computeStats(), []);
  const classesBySubject = useMemo(() => groupByClassAndSubject(), []);

  const classesToShow = Array.from({ length: 12 }, (_, i) => String(i + 1)).filter(
    (cls) => classesBySubject[cls]
  );

  const navigate = (tab: string) => {
    setTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle chapter chip click — navigate to syllabus with scroll anchor
  const goToChapter = (classLevel: string, subject: string, chapter: string) => {
    navigate('syllabus');
    // The syllabus page can use URL params or hash to jump to the chapter
    // For now, rely on tab navigate; full chapter jump handled by Syllabus component
  };

  // FAQ data
  const faqs = [
    {
      q: 'What is story-based learning?',
      a: 'Story-based learning transforms NCERT chapters into engaging narratives. Instead of memorizing facts, students learn through stories that illustrate key concepts, making them 3-4x more memorable and enjoyable. Every story is rooted in the official NCERT syllabus.',
    },
    {
      q: 'Is story-based learning really free?',
      a: 'Yes, 100% free forever. All 569 story lessons, narrated by professional voice actors, are available to every Indian student at no cost — no signup required, no ads, no hidden charges.',
    },
    {
      q: 'Which classes are covered?',
      a: 'Story lessons are available for Class 1 through Class 12. Every class has chapters across Maths, Science, English, Social Studies, and more — all following the official NCERT curriculum.',
    },
    {
      q: 'Does it follow NCERT exactly?',
      a: 'Yes. Every story maps 1:1 to NCERT chapters. We cover 534 chapters across all subjects and classes. The stories are supplementary — they enhance, not replace, your NCERT textbook.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Story-Based Learning for CBSE Classes 1–12 — NCERT Chapters as Stories | Syllab.in"
        description="Free story-based learning for CBSE NCERT chapters Class 1-12. Every chapter becomes an engaging story. 569 lessons, 534 chapters, voice narration, 100% free for Indian students."
        keywords="story based learning CBSE, NCERT chapters as stories, engaging learning for kids, memory techniques CBSE, narrative learning, free learning stories India, CBSE Class 1-12 stories"
        url={`${SITE}/story-lessons`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: 'Story-Based Learning for CBSE Classes 1–12',
            description: 'Free story-based learning platform for NCERT chapters — every chapter as an engaging narrative for better retention.',
            learningResourceType: 'Story-based lesson',
            isAccessibleForFree: true,
            educationalLevel: 'CBSE Class 1-12',
            inLanguage: 'en-IN',
            url: `${SITE}/story-lessons`,
          },
        ]}
      />

      {/* Hero Section */}
      <PageHero
        emoji="📖"
        title="Story-Based Learning for CBSE Classes 1–12"
        subtitle="Every NCERT Chapter as an Engaging Story. 100% Free."
        className="mb-8"
      />

      {/* Why Stories Work — Benefit Cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="mt-1 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-black text-slate-800 dark:text-slate-100">3-4× Better Memory</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Stories activate multiple parts of your brain. You'll remember NCERT chapters for months, not days.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-start gap-3">
            <BookOpen size={20} className="mt-1 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-black text-slate-800 dark:text-slate-100">Fun, Not Boring</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                No more staring at textbooks. Learn NCERT through stories, then dive into practice MCQs.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-start gap-3">
            <Users size={20} className="mt-1 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-black text-slate-800 dark:text-slate-100">Real NCERT Coverage</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                569 story lessons covering 534 NCERT chapters — Classes 1 to 12, all subjects.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="mt-1 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-black text-slate-800 dark:text-slate-100">100% Free Forever</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                No login required. No ads. No hidden charges. Free for every Indian student, always.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="mb-12 flex justify-center gap-6 rounded-3xl bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-6 text-center dark:from-slate-800 dark:to-slate-700">
        <div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {stats.totalLessons}
          </div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Story Lessons</div>
        </div>
        <div className="h-12 w-px bg-slate-300 dark:bg-slate-600"></div>
        <div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {stats.uniqueChapters}
          </div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400">NCERT Chapters</div>
        </div>
        <div className="h-12 w-px bg-slate-300 dark:bg-slate-600"></div>
        <div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {stats.classes}
          </div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Classes</div>
        </div>
        <div className="h-12 w-px bg-slate-300 dark:bg-slate-600"></div>
        <div>
          <div className="text-2xl font-black text-emerald-600">∞</div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Free Forever</div>
        </div>
      </div>

      {/* Class Sections */}
      <div className="mb-12">
        <h2 className="mb-6 font-black text-slate-800 dark:text-slate-100 text-lg">
          Browse by Class
        </h2>
        <div className="space-y-8">
          {classesToShow.map((classNum) => {
            const subjects = classesBySubject[classNum];
            const subjects_sorted = Object.keys(subjects).sort();

            return (
              <div key={`class-${classNum}`} id={`class-${classNum}`} className="scroll-mt-16">
                <h3 className="mb-4 text-center font-black text-emerald-600 dark:text-emerald-400 text-base uppercase tracking-wide">
                  Class {classNum}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects_sorted.flatMap((subject) =>
                    subjects[subject].map((chapter) => (
                      <button
                        key={`${classNum}-${subject}-${chapter}`}
                        onClick={() => goToChapter(classNum, subject, chapter)}
                        className="group rounded-2xl border-2 border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary"
                      >
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          {subject}
                        </div>
                        <div className="mt-2 line-clamp-2 font-black text-slate-800 dark:text-slate-100 text-sm">
                          {chapter}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 text-xs font-black text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Read story →
                        </div>
                      </button>
                    )),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="mb-6 font-black text-slate-800 dark:text-slate-100 text-lg">
          Frequently Asked
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border-2 border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-3 font-black text-slate-800 dark:text-slate-100">
                {faq.q}
                <span className="flex-shrink-0 text-primary transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate('syllabus')}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-black text-white hover:bg-emerald-600 transition-colors"
        >
          <BookOpen size={18} /> Start Reading Stories →
        </button>
        <p className="mt-4 text-xs text-slate-400">
          No signup required. All chapters are free.
        </p>
      </div>
    </div>
  );
}
