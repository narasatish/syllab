import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
}

const POSTS: BlogPost[] = [
  {
    id: 'class10-board-tips',
    title: 'How to Score 90+ in Class 10 CBSE Board Exams: Complete Preparation Guide',
    description: 'Proven strategies, subject-wise tips, and a 3-month study plan to help you score 90+ in Class 10 CBSE board exams.',
    date: 'May 15, 2026',
    readTime: '8 min read',
    category: 'Class 10',
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Scoring 90+ in CBSE Class 10 board exams is achievable with the right strategy. Thousands of students clear this milestone every year with consistent effort, smart planning, and the correct resources. This guide breaks down exactly what you need to do — subject by subject.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Why Class 10 Boards Matter</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Class 10 marks are the first major academic milestone in India. They determine your stream selection (Science, Commerce, Arts), eligibility for top junior colleges, scholarships, and — for many families — your academic identity for years. A strong score opens doors. A weak one closes them.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">3-Month Study Plan for Class 10 CBSE</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-2">
          <strong>Month 1 — Cover the Syllabus:</strong> Complete every NCERT chapter for all subjects. Don't skip intext questions. For Maths, solve all exercises. For Science, understand diagrams (they appear directly in boards). For Social Science, make chapter-wise notes.
        </p>
        <p className="text-slate-600 text-base leading-relaxed mb-2">
          <strong>Month 2 — Revise and Practice:</strong> Attempt chapter-wise MCQs and short-answer questions. Use CBSE sample papers from the official website. Time yourself. Identify weak chapters and revisit them.
        </p>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          <strong>Month 3 — Mock Tests and Mistakes:</strong> Solve 5+ full mock papers under real exam conditions. Review every mistake. Focus on presentation, labeling diagrams, and writing key terms in bold.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Subject-Wise Tips</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>Mathematics:</strong> NCERT exercises are the bible. Practice Class 10 Maths chapters like Real Numbers, Triangles, Arithmetic Progressions, and Quadratic Equations thoroughly. Board questions are often lifted directly from NCERT examples.</li>
          <li><strong>Science:</strong> Learn Chemical Reactions, Life Processes, Electricity, and Light well — they carry the most marks. Draw and label diagrams during practice, not just reading.</li>
          <li><strong>English:</strong> Read all Footprints Without Feet and First Flight stories. Practice letter writing and notice writing. Grammar: Tenses, Reported Speech, and Modals appear every year.</li>
          <li><strong>Social Science:</strong> History needs date-event mapping. Geography needs map practice. Political Science: understand concepts, not just facts. Economics: Chapter 1 (Development) is always asked.</li>
          <li><strong>Hindi:</strong> Learn all poem summaries, prose summaries, and grammar rules (Sandhi, Samas, Ras). Writing section (letter/essay) is the easiest scoring opportunity.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Common Mistakes Students Make</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li>Studying only from guides instead of NCERT textbooks</li>
          <li>Skipping intext questions (they appear in boards)</li>
          <li>Not practicing map work for Geography</li>
          <li>Ignoring time management during exams</li>
          <li>Not reading the question carefully before answering</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">How Syllab Helps Class 10 Students</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Syllab.in provides NCERT-aligned chapter summaries, chapter-wise MCQs, and daily practice challenges specifically designed for Class 10 CBSE students. You can practice Maths, Science, and Social Science chapters with instant AI feedback, track your weak areas, and take timed mock tests — all completely free.
        </p>
      </div>
    ),
  },
  {
    id: 'jee-preparation-guide',
    title: 'JEE Mains 2027 Preparation Guide: How to Start from Class 11',
    description: 'A complete roadmap for JEE Mains preparation starting from Class 11, including subject-wise strategy, important chapters, and daily study schedule.',
    date: 'May 12, 2026',
    readTime: '10 min read',
    category: 'JEE',
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          JEE Mains is the gateway to NITs, IIITs, and the IITs (through JEE Advanced). Over 12 lakh students appear every year. Getting a rank under 10,000 requires 2 years of focused, structured preparation starting from Class 11. Here's exactly how to do it.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Understanding JEE Mains Pattern</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          JEE Mains has 3 subjects: Physics, Chemistry, and Mathematics. Each subject has 20 MCQs (4 marks each, -1 for wrong) and 10 integer-type questions (4 marks, no negative). Total: 300 marks in 3 hours. The exam is conducted twice — January and April.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Most Important Chapters for JEE Mains</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>Physics:</strong> Mechanics (Newton's Laws, Work-Energy, Rotational), Electrostatics, Current Electricity, Waves and Optics, Modern Physics. These 5 areas give 60-70% of Physics marks.</li>
          <li><strong>Chemistry:</strong> Organic Chemistry reactions (GOC, Alkyl Halides, Carbonyl), Thermodynamics, Chemical Equilibrium, Mole Concept, Coordination Compounds, Electrochemistry.</li>
          <li><strong>Mathematics:</strong> Calculus (Limits, Derivatives, Integrals), Coordinate Geometry (Conic Sections, Circles), Algebra (Complex Numbers, Matrices, Binomial Theorem), Trigonometry, Vectors & 3D.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Class 11 JEE Study Plan</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-2">
          Class 11 covers roughly 40% of JEE syllabus. Do NOT neglect it. Many students focus on Class 12 and fail because Class 11 topics like Mechanics, Organic Chemistry basics, and Calculus form the foundation.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li>Study 6-8 hours daily: 3 hours school, 3-4 hours self-study</li>
          <li>Complete NCERT first, then move to DC Pandey (Physics), NCERT Exemplar + MS Chauhan (Chemistry), RD Sharma / SL Loney (Maths)</li>
          <li>Attempt 25-30 questions per chapter after finishing it</li>
          <li>Revise every 2 weeks — don't let chapters become "forgotten"</li>
          <li>Join a test series by November of Class 11</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Class 12 JEE Strategy</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          From June to November: Complete Class 12 syllabus + revise Class 11. From December to January: Full mock tests, solve PYQs (Previous Year Questions) from 2015-2024. For JEE Mains January attempt: you should have done 30+ mocks. Use the April attempt to improve score using January feedback.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">The Role of NCERT in JEE</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Chemistry NCERT is non-negotiable. 25-30% of Chemistry questions in JEE Mains are directly from NCERT. Read every line of Inorganic Chemistry NCERT. Physics and Maths NCERT are the conceptual base — understand them deeply before moving to advanced problems.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Practice on Syllab for JEE Prep</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Syllab.in offers chapter-wise MCQ practice for Class 11 and 12 Physics, Chemistry, and Mathematics. The daily challenges include JEE-level questions with AI explanations. Use the Mock Tests section for timed JEE-pattern practice — completely free.
        </p>
      </div>
    ),
  },
  {
    id: 'neet-study-plan',
    title: 'NEET 2027 Study Plan: Subject-Wise Strategy and Important Topics',
    description: 'Complete NEET preparation guide with Biology, Physics, and Chemistry strategies, chapter weightage, and a month-by-month study plan.',
    date: 'May 10, 2026',
    readTime: '9 min read',
    category: 'NEET',
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          NEET 2027 will see over 20 lakh students competing for roughly 1 lakh MBBS seats in India. Getting a score of 650+ requires mastering Biology, and doing well enough in Physics and Chemistry to stay ahead. This guide gives you the exact strategy to crack NEET.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">NEET Exam Pattern</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          NEET has 200 questions (180 to attempt): Physics — 50 Qs (45 attempt), Chemistry — 50 Qs (45 attempt), Biology (Botany + Zoology) — 100 Qs (90 attempt). Marking: +4 for correct, -1 for wrong. Maximum score: 720. Cutoff for government MBBS varies by category — typically 550+ for General.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Biology: The Scoring Machine (360 marks)</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-2">
          Biology is where NEET is won or lost. 90 questions, all from NCERT. No book outside NCERT is needed for Biology — just NCERT Class 11 and 12 Biology textbooks, read line by line.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>High weightage topics:</strong> Genetics and Evolution (15-18 Qs), Plant Physiology (10-12 Qs), Human Physiology (12-15 Qs), Cell Biology (8-10 Qs), Reproduction (10-12 Qs), Ecology (10-12 Qs)</li>
          <li>Make handwritten notes for every chapter — Biology is memory-heavy</li>
          <li>Learn all diagrams: Heart, Brain, Nephron, Ear, Eye, Flower — they appear in assertion-reason or diagram-based questions</li>
          <li>Solve NCERT exemplar after finishing each chapter</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Chemistry for NEET</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>Physical Chemistry:</strong> Mole Concept, Thermodynamics, Chemical Kinetics, Electrochemistry — these are calculation-heavy but scoring</li>
          <li><strong>Organic Chemistry:</strong> General Organic Chemistry, Hydrocarbons, Biomolecules — NCERT is sufficient</li>
          <li><strong>Inorganic Chemistry:</strong> Read NCERT word for word. P-block, D-block, Coordination Compounds are frequently tested</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Physics for NEET (Don't Ignore It)</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          NEET Physics is conceptual and formula-based. Focus on: Mechanics (Laws of Motion, Work Energy), Electrostatics, Current Electricity, Ray Optics, Modern Physics (Atoms, Nuclei, Semiconductors). Use HC Verma for concepts and NCERT for board-level grounding.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Month-by-Month NEET Plan</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>Class 11 (June–March):</strong> Complete Class 11 Biology + Chemistry + Physics syllabus alongside school. Never delay Biology — it's 360 marks.</li>
          <li><strong>Class 12 (April–December):</strong> Complete Class 12, revise Class 11 simultaneously. Start weekly full tests by August.</li>
          <li><strong>Jan–April (Final Stretch):</strong> 40+ mock tests, PYQ analysis, NCERT Biology 3rd reading, weak chapter revision.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Free NEET Practice on Syllab</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Syllab.in has NEET-pattern daily challenges and mock tests covering Biology, Physics, and Chemistry. Practice chapter-wise MCQs with AI explanations and track your weak topics in the Progress Hub — all free, no subscription needed.
        </p>
      </div>
    ),
  },
  {
    id: 'ncert-importance',
    title: 'Why NCERT Books Are the Foundation of CBSE Success (Class 6 to 12)',
    description: 'Understand why NCERT textbooks are the most important study material for CBSE students and how to use them effectively for boards and competitive exams.',
    date: 'May 8, 2026',
    readTime: '6 min read',
    category: 'Study Tips',
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Every CBSE topper, every JEE ranker, every NEET qualifier says the same thing: "I finished NCERT first." Yet millions of students buy expensive guides and reference books while leaving their NCERT textbooks unread. Here's why that's a mistake — and how to fix it.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">NCERT Books Are Written by Experts for CBSE</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          NCERT (National Council of Educational Research and Training) writes textbooks in direct alignment with the CBSE curriculum. Every CBSE board question — whether for Class 6 or Class 12 — originates from NCERT content. The CBSE Board paper setters are instructed to base questions on NCERT content.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Which NCERT Books Matter Most</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>Class 10:</strong> All 5 subjects — Maths, Science, English, Social Science, Hindi — must be fully read and practiced from NCERT only.</li>
          <li><strong>Class 11 & 12 Physics:</strong> NCERT is the conceptual base. Every example and exercise is important.</li>
          <li><strong>Class 11 & 12 Chemistry:</strong> NCERT is sufficient for 80% of board questions. For NEET, read every line of Biology NCERT.</li>
          <li><strong>Class 11 & 12 Maths:</strong> NCERT examples and exercises are the minimum. JEE requires additional practice.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">How to Study NCERT Effectively</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li>Read the chapter once without taking notes (understand the flow)</li>
          <li>Read again, underline key definitions, formulas, and important statements</li>
          <li>Solve all intext questions (many appear in boards)</li>
          <li>Solve all exercise questions (all of them — not selectively)</li>
          <li>Read NCERT Exemplar for deeper practice</li>
          <li>For Science: draw every diagram from memory after reading</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">NCERT + Syllab: The Winning Combination</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Syllab.in provides AI-powered summaries of every NCERT chapter (Class 5 to 12), chapter-wise MCQs based on NCERT content, and an AI tutor that answers NCERT-related doubts instantly. Students who combine NCERT reading with Syllab practice see 40-50% improvement in test scores within 4 weeks.
        </p>
      </div>
    ),
  },
  {
    id: 'class12-study-plan',
    title: 'Class 12 Board Exam Study Plan: How to Manage Boards + JEE/NEET Together',
    description: 'A practical month-by-month study schedule for Class 12 students balancing CBSE board preparation alongside JEE or NEET competitive exam preparation.',
    date: 'May 5, 2026',
    readTime: '7 min read',
    category: 'Class 12',
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Class 12 is the most pressure-packed year in an Indian student's academic life. You have CBSE board exams (which determine college admissions) AND JEE/NEET preparation happening simultaneously. Thousands of students crack both — here's how they do it.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">The Good News: Boards and JEE/NEET Overlap</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Approximately 70% of Class 12 CBSE board content overlaps with JEE/NEET syllabus. When you study Electrochemistry for boards, you're also covering NEET Chemistry. When you master Calculus for boards, it directly helps JEE Maths. The strategy is to study NCERT deeply — for both.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Month-by-Month Class 12 Study Schedule</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>April–May (Class 11 Summer):</strong> Complete all pending Class 11 chapters. This is non-negotiable if you want JEE/NEET success.</li>
          <li><strong>June–August:</strong> Cover 60% of Class 12 syllabus. Physics: Electrostatics, Current Electricity. Chemistry: Solid State, Solutions. Maths: Relations, Matrices, Continuity.</li>
          <li><strong>September–October:</strong> Complete Class 12 syllabus. Start chapter-wise test series. Attempt previous year board questions.</li>
          <li><strong>November–December:</strong> Full revision of both Class 11 and 12. Weekly mock tests. Board practical preparation.</li>
          <li><strong>January:</strong> JEE Mains attempt (January session). Board pre-board exams. Keep calm — pre-boards are not finals.</li>
          <li><strong>February–March:</strong> Final board revision. Focus on presentation, handwriting, and time management. Don't start new topics.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Time Management During Class 12</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li>School: 7 hours (attend, pay attention — saves revision time)</li>
          <li>Self-study: 4-5 hours on school days, 8-10 hours on weekends</li>
          <li>Divide between school subjects and competitive prep: 60/40 until November, then 70/30 boards-focused</li>
          <li>Saturday: Full mock test. Sunday: Review mistakes, weak chapter revision.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Which Subjects to Prioritize</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          For Science students: Physics and Maths take the most time but give the highest marks. Chemistry (especially Organic) needs consistent daily practice. Biology (for NEET) — read NCERT every single day. Never let Biology revision slip even for a week.
        </p>
      </div>
    ),
  },
  {
    id: 'free-resources-india',
    title: 'Best Free Online Study Resources for Class 9 and 10 Students in India',
    description: 'A curated list of completely free online resources — apps, websites, and tools — to help Class 9 and 10 CBSE students study smarter.',
    date: 'May 2, 2026',
    readTime: '5 min read',
    category: 'Resources',
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Quality education shouldn't cost money. There are dozens of genuinely useful, completely free resources for Class 9 and 10 students — you just need to know where to look. This curated list covers the best ones.
        </p>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Free Platforms for CBSE Class 9 & 10</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>Syllab.in:</strong> AI-powered NCERT chapter summaries, chapter-wise MCQ practice, daily challenges, and an AI tutor — completely free for Class 5 to 12. The best option for comprehensive practice with instant feedback.</li>
          <li><strong>NCERT Official Website (ncert.nic.in):</strong> Download all NCERT textbooks, solutions, and exemplar problems for free in PDF format.</li>
          <li><strong>CBSE Official Website:</strong> Download sample papers, marking schemes, and previous year question papers for free.</li>
          <li><strong>Khan Academy:</strong> Excellent for Maths and Science concepts. Their Class 9 and 10 playlists are well-structured and free.</li>
          <li><strong>Diksha (NCERT):</strong> Government's official e-learning platform with NCERT-aligned content in multiple Indian languages, completely free.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">YouTube Channels Worth Following</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li><strong>NCERT Official:</strong> Video lectures aligned with NCERT textbooks</li>
          <li><strong>Vedantu (Free Content):</strong> Live classes and revision videos for Class 9-10</li>
          <li><strong>Unacademy (Free Tier):</strong> Board exam and competitive exam content</li>
          <li><strong>ExamFear:</strong> Chapter-by-chapter Maths and Science videos specifically for CBSE</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">How to Use These Resources Effectively</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base mb-4">
          <li>Read NCERT first. Use videos only to clarify doubts — not as a replacement for reading.</li>
          <li>Practice on Syllab.in after each chapter to test understanding with AI feedback.</li>
          <li>Download CBSE sample papers and solve them under exam conditions (pen, paper, timer).</li>
          <li>Use Diksha for vernacular content if English explanation is hard to follow.</li>
        </ul>

        <h3 className="text-xl font-black text-slate-900 mt-6 mb-3">Why Free Resources Can Beat Paid Coaching</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-4">
          Paid coaching doesn't make you score better — consistent study does. Many Class 10 toppers (95%+) study only from NCERT + free online resources. The key is discipline: study 4-5 hours daily, practice regularly, review mistakes, and sleep well before exams. No expensive course is needed if you use free resources intelligently.
        </p>
      </div>
    ),
  },
];

interface BlogPageProps {
  setTab?: (tab: string) => void;
}

export default function BlogPage({ setTab }: BlogPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(POSTS[0].id);

  return (
    <>
      <SEO
        title="Study Tips, JEE NEET CBSE Guides & Free Resources | Syllab.in Blog"
        description="Expert tips and guides for CBSE Class 5-12, JEE Mains, NEET preparation. Free study plans, important chapters, and resources for Indian students."
        keywords="CBSE study tips, JEE preparation guide, NEET study plan, Class 10 board exam tips, Class 12 study schedule, NCERT importance, free online resources India"
        url="https://syllab.in/blog"
      />

      {/* JSON-LD for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Syllab.in Learning Blog',
            url: 'https://syllab.in/blog',
            description: 'Expert study guides, tips, and resources for CBSE, JEE, and NEET students in India.',
            blogPost: POSTS.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              author: { '@type': 'Organization', name: 'Syllab.in' },
              publisher: { '@type': 'Organization', name: 'Syllab.in', url: 'https://syllab.in' },
            })),
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-widest mb-4">
            <BookOpen size={13} />
            Learning Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-3">
            Study Guides & Tips
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl">
            Expert advice on CBSE, JEE, NEET and board exam preparation — written for Indian students.
          </p>
        </div>

        {/* Ad Placeholder - Top */}
        <div className="w-full bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center h-24 mb-8 text-slate-400 text-xs font-bold">
          {/* Google AdSense ad unit will appear here */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {POSTS.map((post, idx) => {
            const isOpen = expandedId === post.id;
            return (
              <article
                key={post.id}
                id={post.id}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : post.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        <Tag size={10} />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{post.date}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isOpen ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 border-t border-slate-100 pt-6">
                    {post.content}

                    {/* Mid-article ad placeholder */}
                    {idx % 2 === 0 && (
                      <div className="my-6">
                        <ins
                          className="adsbygoogle"
                          style={{ display: 'block' }}
                          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                          data-ad-slot="9876543210"
                          data-ad-format="auto"
                          data-full-width-responsive="true"
                        />
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <button
                        onClick={() => setTab && setTab('syllabus')}
                        className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg"
                      >
                        Start Practicing on Syllab <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom ad placeholder */}
        <div className="mt-8 mb-4">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="1122334455"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-3">Ready to put this into practice?</h2>
          <p className="text-slate-300 font-medium mb-6 text-sm">
            Syllab.in gives you NCERT chapter practice, AI tutor, mock tests, and daily challenges — completely free.
          </p>
          <button
            onClick={() => setTab && setTab('syllabus')}
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform shadow-xl"
          >
            Open Syllabus Explorer <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
