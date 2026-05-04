import React from 'react';

/**
 * SEO Content Blocks
 * ==================
 *
 * One component per main page. Each contains the keyword-rich written content
 * Google needs to rank the page. Drop-in: just import and place at the bottom
 * of your existing page.
 *
 * Usage example in Syllabus.tsx:
 *   import { SyllabusContent } from '../components/pageContent';
 *   ...
 *   <SyllabusContent />  // place at the end of your page
 *
 * Tailwind classes used here match your existing styles.
 */

// Reusable FAQ component — used by all pages
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={i}
          className="group bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 cursor-pointer"
        >
          <summary className="font-bold text-slate-900 text-base sm:text-lg list-none flex justify-between items-start gap-3">
            <span>{item.q}</span>
            <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl flex-shrink-0">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

// ============================================================================
// SYLLABUS PAGE CONTENT  (/syllabus)
// ============================================================================
export function SyllabusContent() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-16 sm:py-20 space-y-10">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          About the CBSE NCERT Syllabus
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed mb-4">
          The Central Board of Secondary Education (CBSE) follows the National Council of Educational Research and Training (NCERT) curriculum across India. This syllabus forms the foundation for board examinations as well as competitive exams like JEE, NEET, NTSE, and various Olympiads. On Syllab, you can browse the complete CBSE NCERT syllabus organized by class and subject — from Class 5 right up to Class 12 — with practice questions and concept notes for every chapter.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          What's covered
        </h2>
        <div className="space-y-3 text-slate-600 font-medium leading-relaxed">
          <p>
            <strong className="text-slate-900">Classes 5 to 8 (Foundation):</strong> Mathematics, Science (or EVS for younger students), English, and Social Science. These years build the conceptual base students will use for the rest of their school journey.
          </p>
          <p>
            <strong className="text-slate-900">Classes 9 and 10 (Secondary):</strong> Maths and Science (combined Physics, Chemistry, Biology) at the secondary level, plus English and Social Science. Class 10 ends with the CBSE Board examination.
          </p>
          <p>
            <strong className="text-slate-900">Classes 11 and 12 (Senior Secondary):</strong> Subject-wise specialization. Science stream covers Physics, Chemistry, Biology, and Mathematics. Class 12 board exam scores feed directly into university admissions through CUET and other entrance tests.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Why NCERT-aligned matters
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          NCERT textbooks form the question-paper basis for almost every major Indian examination. CBSE board papers are drawn directly from NCERT. JEE Main and NEET both list NCERT as their primary reference. Even competitive exams like NTSE and Olympiads test concepts rooted in the NCERT curriculum. By staying NCERT-aligned, Syllab makes sure students aren't wasting time on content that won't appear in their actual exams.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <FAQ
          items={[
            {
              q: 'Is the Syllab syllabus free to access?',
              a: 'Yes. Browsing chapters and topics is completely free. Practice questions and AI tutoring are also free with daily limits.',
            },
            {
              q: 'Does this cover the latest 2025–26 CBSE syllabus?',
              a: 'Yes, our content reflects the current NCERT editions in use across CBSE schools, including the new NCF books for Classes 6 and 7.',
            },
            {
              q: 'How many chapters are in Class 10 Maths?',
              a: 'The Class 10 Mathematics syllabus has 14 chapters covering Real Numbers through Probability.',
            },
            {
              q: 'Can I prepare for JEE and NEET using NCERT alone?',
              a: 'NCERT mastery is essential. For NEET and JEE Main, NCERT covers approximately 70-85% of the paper. JEE Advanced needs additional reference material.',
            },
            {
              q: 'Do you cover ICSE syllabus too?',
              a: 'Currently we focus on CBSE NCERT. Many concepts overlap with ICSE, but exact chapter alignment is CBSE-first.',
            },
          ]}
        />
      </div>
    </section>
  );
}

// ============================================================================
// PRACTICE ARENA PAGE CONTENT  (/practice-arena)
// ============================================================================
export function PracticeArenaContent() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-16 sm:py-20 space-y-10">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Practice that turns understanding into marks
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Practice is what turns understanding into marks. The Syllab Practice Arena gives Indian students unlimited NCERT-aligned multiple choice questions for every chapter from Class 5 to Class 12, across Maths, Science, Physics, Chemistry, Biology, and more. Pick your class, choose a subject, then select a chapter — the Arena loads a fresh set of MCQs each time.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Question types we cover
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed mb-4">
          We don't just stick to textbook questions. Each chapter mixes multiple question patterns:
        </p>
        <ul className="space-y-2 text-slate-600 font-medium">
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">NCERT-level:</strong> Direct from textbook examples and exercises</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Board exam pattern:</strong> The way CBSE actually frames questions</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Olympiad style:</strong> Slightly trickier, application-heavy (IMO, NSO, NTSE)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">JEE/NEET foundation</strong> (Class 9–10): Builds the muscle for competitive exams later</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">JEE Main, NEET, BITSAT</strong> (Class 11–12): Real exam-pattern MCQs</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Why daily practice changes outcomes
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Most students fail not because they don't understand chapters, but because they haven't practiced enough variations. A single concept like "Quadratic Equations" can be asked in 30 different ways. Practice Arena exposes you to those variations. Ten questions a day is enough to see results in 6–8 weeks. Streaks help build the habit — most top scorers practice for at least 20 minutes daily.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <FAQ
          items={[
            {
              q: 'Are practice questions free?',
              a: 'Yes, the Practice Arena is free to use with daily question limits. Premium users get unlimited access.',
            },
            {
              q: 'Are solutions provided for every question?',
              a: 'Every MCQ has a detailed step-by-step solution. Wrong-answer explanations are included so you understand the trap.',
            },
            {
              q: 'Do you have JEE and NEET pattern questions?',
              a: 'Yes, for Class 11 and 12 specifically. Class 9–10 has foundation-level competitive questions tagged separately.',
            },
            {
              q: 'How are questions generated?',
              a: 'We use a mix of curated content and AI-assisted question generation, all reviewed for NCERT alignment and exam-pattern accuracy.',
            },
            {
              q: 'Can I do mock tests?',
              a: 'Standalone full-length mock tests are coming soon. Right now, every chapter session works as a focused mini-test.',
            },
          ]}
        />
      </div>
    </section>
  );
}

// ============================================================================
// STUDY ARENA PAGE CONTENT  (/study-arena)
// ============================================================================
export function StudyArenaContent() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-16 sm:py-20 space-y-10">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Study notes that actually click
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Confused by your textbook? The Syllab Study Arena breaks down every chapter from Class 5 to Class 12 into clear, simple concept notes that follow the NCERT curriculum without the dry textbook tone. Notes are written for the student — not the examiner. We focus on understanding first, marks second.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          What's inside Study Arena
        </h2>
        <ul className="space-y-2 text-slate-600 font-medium">
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Concept summary:</strong> Explains the chapter in 5 minutes</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Key formulas and definitions</strong> all in one place</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Real-world examples</strong> connecting theory to daily life</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Common mistakes</strong> other students make and how to avoid them</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Exam tricks</strong> that help spot question patterns</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          How students use Study Arena
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          The most effective study flow is: read the concept notes, attempt 5–10 practice questions in the Arena, then ask the AI tutor about anything still unclear. This loop is faster than re-reading textbooks because you're testing yourself constantly.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <FAQ
          items={[
            {
              q: 'Are concept notes free?',
              a: 'Yes, all concept notes are free to read on Syllab.',
            },
            {
              q: 'Can I download notes as PDFs?',
              a: 'PDF download is on the roadmap for premium users.',
            },
            {
              q: 'Do you cover all subjects?',
              a: 'Maths and Science have the most depth currently. Other subjects expand monthly.',
            },
            {
              q: 'Are these enough for board exams?',
              a: 'For most students, concept notes plus the Practice Arena cover everything needed for CBSE boards. JEE Advanced and Olympiads need additional reference material.',
            },
            {
              q: 'Are notes aligned with the latest NCERT edition?',
              a: 'Yes. We update notes to match current NCERT editions, including new NCF books rolled out in Classes 6 and 7.',
            },
          ]}
        />
      </div>
    </section>
  );
}

// ============================================================================
// AI TUTOR PAGE CONTENT  (/ai-tutor)
// ============================================================================
export function AITutorContent() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-16 sm:py-20 space-y-10">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          A tutor in your pocket — without the hourly fee
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Stuck at midnight before an exam? The Syllab AI Tutor is available 24/7 to answer your doubts in plain English or Hinglish. It's like having a private tutor in your pocket — without the hourly fee. Type your doubt in the chat, and the AI considers your class level (Class 5 vs Class 12 get very different explanations) before answering using NCERT-aligned reasoning.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          What the AI Tutor can do
        </h2>
        <ul className="space-y-2 text-slate-600 font-medium">
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Explain any concept</strong> from your CBSE textbook in simpler words</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Solve specific problems</strong> step-by-step, showing the working</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Compare two ideas</strong> when similar concepts get confusing</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Quiz you</strong> on a chapter so you know what you've learned</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Suggest study plans</strong> based on your weak chapters</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          When AI tutoring works best
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          The AI tutor is excellent for doubts that come up at odd hours, embarrassing questions you're afraid to ask in class, comparing similar concepts (like the difference between speed and velocity), and quick formula explanations. For deep coaching and one-on-one mentorship, human teachers still win. Use the AI for the small stuff, save real tutors for big concepts.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <FAQ
          items={[
            {
              q: 'Is the AI Tutor free?',
              a: 'Yes, with daily query limits. Premium users get unlimited tutor access.',
            },
            {
              q: 'Does it support Hindi?',
              a: 'Yes, you can chat in Hindi or Hinglish, and the AI will reply in the same language.',
            },
            {
              q: 'Is it as accurate as a human tutor?',
              a: 'For NCERT-level content, accuracy is high. For very advanced or trick questions, double-check with a teacher.',
            },
            {
              q: 'Will my doubts be saved for future reference?',
              a: 'Yes, your past conversations stay in your account so you can revisit any topic later.',
            },
            {
              q: 'Can it help with homework?',
              a: 'Yes, but use it to understand, not to copy. Students who use the AI to learn improve much faster than those who use it to shortcut.',
            },
          ]}
        />
      </div>
    </section>
  );
}

// ============================================================================
// SCAN & SOLVE PAGE CONTENT  (/scan-solve)
// ============================================================================
export function ScanSolveContent() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-16 sm:py-20 space-y-10">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Photo to solution in seconds
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Got a tough question in your textbook? Just take a picture. Syllab's Scan & Solve reads the problem from your photo and gives you a complete step-by-step solution — usually in under 10 seconds. Works for handwritten questions, printed textbook problems, and worksheets.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          What it can solve
        </h2>
        <ul className="space-y-2 text-slate-600 font-medium">
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Math problems:</strong> From simple arithmetic up to Class 12 calculus, trigonometry, and algebra</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Physics numericals:</strong> Mechanics, electricity, optics, modern physics</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Chemistry questions:</strong> Stoichiometry, organic reactions, equilibrium calculations</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500 font-black">•</span>
            <span><strong className="text-slate-900">Word problems:</strong> Any subject — the AI breaks down what's being asked</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Tips for best results
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Take the photo in good light, make sure the entire question fits in the frame, avoid shadows and glare on the page, and write clearly if it's handwritten. If a scan fails, you can also type the question manually.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Scan & Solve vs AI Tutor
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed">
          Use <strong className="text-slate-900">Scan & Solve</strong> when you already understand the chapter and just need a quick answer check, or for problems that are tedious to type out. Use the <strong className="text-slate-900">AI Tutor</strong> when you actually want to learn the concept and ask follow-up questions. Most students use both.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <FAQ
          items={[
            {
              q: 'Is Scan & Solve free?',
              a: 'Yes, with daily scan limits. Premium gets unlimited scans.',
            },
            {
              q: 'Does it work for Hindi-medium textbooks?',
              a: 'Currently optimized for English. Hindi support is coming soon.',
            },
            {
              q: 'Can it solve geometry problems with diagrams?',
              a: 'Yes, the AI can interpret diagrams in most cases. Complex 3D geometry may need text explanation.',
            },
            {
              q: 'Does it just give the answer, or show steps?',
              a: 'It always shows steps. The goal is to help you learn the method, not just get the answer.',
            },
            {
              q: 'Will it work for Olympiad and JEE problems?',
              a: 'For JEE Main and NEET, yes. For JEE Advanced and Olympiad-level questions, success rate is lower — these often need creative methods AI can miss.',
            },
          ]}
        />
      </div>
    </section>
  );
}
