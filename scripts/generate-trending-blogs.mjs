#!/usr/bin/env node
/**
 * Automated Trending Blog Generator for Syllab.in
 * Generates blog posts based on templates and trending topics for Indian students.
 *
 * Usage: node scripts/generate-trending-blogs.mjs
 * Output: src/data/autoBlogs.json
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'src', 'data', 'autoBlogs.json');

// Blog templates for trending topics relevant to Indian students
const BLOG_TEMPLATES = [
  {
    id: 'cbse-class-10-board-tips-2026',
    title: 'How to Score 90+ in Class 10 CBSE Board Exams 2026: Subject-Wise Strategy',
    category: 'Class 10',
    description: 'Proven strategies, subject-wise tips, and a 3-month study plan to help you score 90+ in Class 10 CBSE board exams 2026.',
    readTime: '8 min read',
    content: `Scoring 90+ in CBSE Class 10 board exams is achievable with the right strategy. Thousands of students clear this milestone every year with consistent effort, smart planning, and the correct resources. This guide breaks down exactly what you need to do — subject by subject.

## Why Class 10 Boards Matter

Class 10 marks are the first major academic milestone in India. They determine your stream selection (Science, Commerce, Arts), eligibility for top junior colleges, scholarships, and — for many families — your academic identity for years. A strong score opens doors. A weak one closes them.

## 3-Month Study Plan for Class 10 CBSE

**Month 1 — Cover the Syllabus:** Complete every NCERT chapter for all subjects. Don't skip intext questions. For Maths, solve all exercises. For Science, understand diagrams (they appear directly in boards). For Social Science, make chapter-wise notes.

**Month 2 — Revise and Practice:** Attempt chapter-wise MCQs and short-answer questions. Use CBSE sample papers from the official website. Time yourself. Identify weak chapters and revisit them.

**Month 3 — Mock Tests and Mistakes:** Solve 5+ full mock papers under real exam conditions. Review every mistake. Focus on presentation, labeling diagrams, and writing key terms in bold.

## Subject-Wise Tips

- **Mathematics:** NCERT exercises are the bible. Practice Class 10 Maths chapters like Real Numbers, Triangles, Arithmetic Progressions, and Quadratic Equations thoroughly. Board questions are often lifted directly from NCERT examples.
- **Science:** Learn Chemical Reactions, Life Processes, Electricity, and Light well — they carry the most marks. Draw and label diagrams during practice, not just reading.
- **English:** Read all Footprints Without Feet and First Flight stories. Practice letter writing and notice writing. Grammar: Tenses, Reported Speech, and Modals appear every year.
- **Social Science:** History needs date-event mapping. Geography needs map practice. Political Science: understand concepts, not just facts. Economics: Chapter 1 (Development) is always asked.
- **Hindi:** Learn all poem summaries, prose summaries, and grammar rules. Writing section (letter/essay) is the easiest scoring opportunity.

## Common Mistakes Students Make

- Studying only from guides instead of NCERT textbooks
- Skipping intext questions (they appear in boards)
- Not practicing map work for Geography
- Ignoring time management during exams
- Not reading the question carefully before answering`,
  },
  {
    id: 'jee-mains-2027-preparation-guide',
    title: 'JEE Mains 2027: Complete Preparation Roadmap from Class 11',
    category: 'JEE',
    description: 'A complete roadmap for JEE Mains preparation starting from Class 11, including subject-wise strategy, important chapters, and daily study schedule.',
    readTime: '10 min read',
    content: `JEE Mains is the gateway to NITs, IIITs, and the IITs (through JEE Advanced). Over 12 lakh students appear every year. Getting a rank under 10,000 requires 2 years of focused, structured preparation starting from Class 11. Here's exactly how to do it.

## Understanding JEE Mains Pattern

JEE Mains has 3 subjects: Physics, Chemistry, and Mathematics. Each subject has 20 MCQs (4 marks each, -1 for wrong) and 10 integer-type questions (4 marks, no negative). Total: 300 marks in 3 hours. The exam is conducted twice — January and April.

## Most Important Chapters for JEE Mains

**Physics:** Mechanics (Newton's Laws, Work-Energy, Rotational), Electrostatics, Current Electricity, Waves and Optics, Modern Physics. These 5 areas give 60-70% of Physics marks.

**Chemistry:** Organic Chemistry reactions (GOC, Alkyl Halides, Carbonyl), Thermodynamics, Chemical Equilibrium, Mole Concept, Coordination Compounds, Electrochemistry.

**Mathematics:** Calculus (Limits, Derivatives, Integrals), Coordinate Geometry (Conic Sections, Circles), Algebra (Complex Numbers, Matrices, Binomial Theorem), Trigonometry, Vectors & 3D.

## Class 11 JEE Study Plan

Class 11 covers roughly 40% of JEE syllabus. Do NOT neglect it. Many students focus on Class 12 and fail because Class 11 topics like Mechanics, Organic Chemistry basics, and Calculus form the foundation.

- Study 6-8 hours daily: 3 hours school, 3-4 hours self-study
- Complete NCERT thoroughly for Chemistry and Physics
- Do all examples, intext questions, and exercises
- Solve previous year JEE papers from 2015 onwards (50% of questions repeat every year)
- Join a mock test series (TestBook, Vedantu, Byju's — pick any with good reviews)

## Crucial Do's and Don'ts

**Do:** Focus on concepts, not shortcuts. Shortcuts fail in advanced problems.

**Don't:** Memorize formulas. Derive them 5 times and you'll never forget.

**Do:** Review every mistake within 24 hours.

**Don't:** Study only from YouTube. Use books (HC Verma, DC Pandey) as your primary source.`,
  },
  {
    id: 'neet-2026-preparation-strategy',
    title: 'NEET 2026: Biology, Chemistry & Physics Preparation Strategy',
    category: 'NEET',
    description: 'Strategic preparation guide for NEET 2026, including syllabus weightage, chapter priorities, and daily study plan to crack India\'s toughest medical entrance exam.',
    readTime: '9 min read',
    content: `NEET is India's most competitive medical entrance exam, with over 18 lakh students competing for roughly 100,000 seats. Your NEET score determines whether you get AIIMS, JIPMER, or a government medical college. Here's how to prepare strategically.

## NEET Exam Pattern (2026)

180 MCQs across 3 sections: Biology (90), Chemistry (45), Physics (45). Each correct = 4 marks, wrong = -1 mark. Total = 720 marks in 3 hours. No sectional cutoff, but high Biology percentage (50%) makes it the easiest section to score in.

## Syllabus Weightage (High Priority)

**Biology (Botany):** Plant Physiology, Cell Biology, Genetics, Photosynthesis, Respiration. (30% of Biology)

**Biology (Zoology):** Human Physiology, Reproduction, Evolution, Ecology, Invertebrate Phyla. (20% of Biology)

**Chemistry:** Organic Chemistry (30%), Inorganic Chemistry (35%), Physical Chemistry (35%).

**Physics:** Mechanics (30%), Electrostatics & Magnetism (30%), Modern Physics (15%), Heat & Thermodynamics (10%), Waves & Sound (10%), Optics (5%).

## 24-Month NEET Preparation Timeline

**Months 1-8 (Class 11):** Finish NCERT thoroughly. Biology = 4 hours/day. Chemistry = 2 hours. Physics = 2 hours. Do all intext questions, exercises, examples.

**Months 9-18 (Class 12 + Revision):** Finish Class 12 NCERT. Take 1 full mock per week. Identify weak areas. Revise weak chapters 2x per week.

**Months 19-24 (Final Push):** Solve previous year NEET papers (2013-2025). Take 5 full mocks per week. Target 660+.

## High-Yield Biology Topics

- Photosynthesis & Respiration (appears in 2-3 questions every year)
- Reproduction (5-7 questions)
- Genetics & Inheritance (5-7 questions)
- Nervous & Hormonal System (4-6 questions)
- Immunity & Disease (3-4 questions)

## Chemistry: Reactions You Must Memorize

- Organic reaction mechanisms (25-30 marks worth)
- Inorganic salts and their reactions
- Electrochemistry and redox reactions
- Equilibrium and kinetics numericals`,
  },
  {
    id: 'cbse-class-12-board-exam-tips',
    title: 'Class 12 CBSE Board Exam 2026: Subject-Wise Preparation Guide',
    category: 'Class 12',
    description: 'Complete Class 12 CBSE board exam preparation guide with important chapters, study plan, and last-minute tips to score 90+.',
    readTime: '8 min read',
    content: `Class 12 board exams are high-stakes. Your score determines college stream eligibility (Engineering, Medical, Commerce), merit scholarships, and even job placements. Here's a comprehensive preparation guide.

## Class 12 CBSE Pattern (2026)

Board exams are 3-hour papers (Theory) + practical exams. Weightage: Theory = 70%, Practical = 30%. Some subjects (Maths, Physics, Chemistry, Biology) have 5-mark practicals.

## Subject-Wise Strategy

**Physics:** Focus on Electromagnetism, Optics, Modern Physics, Semiconductors. Numerical problems carry 40% marks — practice 200+ problems.

**Chemistry:** Organic Chemistry = 40 marks. Master name reactions, mechanisms, isomerism. Inorganic = 30 marks. Physical Chemistry = 30 marks (Equilibrium, Kinetics, Thermodynamics).

**Mathematics:** Calculus = 40%, Algebra = 40%, Trigonometry/Geometry = 20%. Differentiation, Integration, and Applications carry the most marks.

**Biology (Botany):** Plant Physiology, Ecology, Genetics, Evolution. Diagrams in answers = 10-15% extra marks.

**Biology (Zoology):** Reproduction, Human Physiology, Inheritance, Ecology. Flowcharts and labeling diagrams are key.

**English:** Read all prescribed books (Flamingo, Vistas). Write 3 practice essays, 5 letters, 5 comprehension passages per week.

## 6-Month Board Exam Study Plan

**Month 1:** Cover entire syllabus. Read NCERT 2x. Don't solve questions yet.

**Month 2-4:** Solve chapter-wise questions. Take 1 unit test per week.

**Month 5:** Take 2 full mock papers per week. Review mistakes.

**Month 6:** Practice answer writing. Focus on presentation and time management.

## Common Mistakes to Avoid

- Not reading questions carefully (costs 5-10 marks)
- Poor presentation and untidy handwriting (loses 2-3 marks per answer)
- Not labeling diagrams (Biology loses 10+ marks easily)
- Time management — spending 30 mins on a 2-mark question
- Not practicing enough numericals (Physics/Chemistry/Maths)`,
  },
  {
    id: 'ai-tools-education-2026',
    title: 'How AI is Changing Education in India 2026: ChatGPT, Claude, and Study Apps',
    category: 'Technology',
    description: 'Explore how AI tools like ChatGPT, Claude, and AI learning platforms are revolutionizing education for Indian students in 2026.',
    readTime: '7 min read',
    content: `Artificial Intelligence is transforming how Indian students learn. ChatGPT, Claude, Gemini, and AI-powered educational platforms are making quality education more accessible than ever. Here's what you need to know.

## AI Tools Every Student Should Know

**ChatGPT (OpenAI):** Use for concept explanations, essay writing help, practice question generation, doubt solving. Free version available.

**Claude (Anthropic):** Better at reasoning and problem-solving. Great for complex Maths/Physics problem walkthroughs.

**Google Gemini:** Free and integrated with Gmail. Good for homework help and quick Q&A.

**Syllab.in Learning Lab:** AI generates concept notes, MCQs, and flashcards from any topic in seconds.

## How to Use AI for Studying (The RIGHT Way)

**Don't:** Just copy-paste answers from ChatGPT and submit them. Teachers can detect AI-written content, and you learn nothing.

**Do:** Use AI to:
1. Understand confusing concepts by asking "Explain this like I'm 10 years old"
2. Generate 10 practice questions and solve them yourself
3. Review your solutions against AI explanations
4. Ask follow-up questions to go deeper

## AI for Each Subject

**Mathematics:** Use AI to work through problem steps, explain why each step is done, and generate similar practice problems.

**Physics:** Visualize concepts. "Draw a free body diagram for this problem" + understand each force.

**Chemistry:** Understand reaction mechanisms. "Explain this organic reaction mechanism in detail."

**Biology:** Use AI to create flashcards, generate mnemonics, explain complex processes.

## The Future of AI in Indian Education

By 2027, AI will likely:
- Generate personalized study plans based on your weak areas
- Provide real-time doubt solving 24/7
- Create adaptive exams that adjust difficulty based on your performance
- Predict which concepts you'll struggle with and proactively teach them

## A Word of Caution

AI is a tool, not a replacement for effort. Students who use AI + hard work will succeed. Students who use only AI will fail. The choice is yours.`,
  },
  {
    id: 'best-free-apps-class-11-12-students',
    title: 'Top 10 Free Apps for Class 11 & 12 Students in 2026: Study Smarter',
    category: 'Resources',
    description: 'Curated list of the best free educational apps for Class 11 and 12 students preparing for boards, JEE, and NEET in 2026.',
    readTime: '6 min read',
    content: `The right app can multiply your study efficiency. Here are the 10 best free apps for Class 11 & 12 students in 2026.

## Study & Learning Apps

**1. Syllab.in:** Free AI tutor, NCERT chapters, chapter-wise MCQs, mock tests, coding labs. Everything a student needs.

**2. Khan Academy:** Free Maths and Science videos from basics to advanced. Best for concept clarity.

**3. BYJU'S Lite:** Free version available with core CBSE content. Good for visual learners.

**4. Vedantu Lite:** Free doubt-solving and sample papers. Large teacher network.

**5. PhysicsWallah:** YouTube channel + free app. Best for Physics concepts. Teacher: Alakh Pandey is excellent.

## Exam & Practice

**6. Testbook:** Free mock tests for JEE, NEET, CBSE, EAMCET. Detailed solutions.

**7. CBSE Guide:** Official CBSE chapter summaries and important questions.

**8. Previous Year Papers:** Download CBSE/JEE/NEET papers from official websites. Practice is key.

## Note-Taking & Organization

**9. Notion:** Free note-taking app. Create study plans, to-do lists, flashcards in one place.

**10. Evernote:** Save important notes, screenshots, links. Organize by subject.

## My Honest Verdict

Free > Paid if used correctly. Most expensive apps teach nothing new. A ₹0 app + your effort = 99% of students' success. Paid apps = 1% edge at best.

Best strategy: Use 2-3 of these apps (Pick: Syllab.in + Khan Academy + TestBook), not 10 apps.`,
  },

  /* ── State board syllabus posts (huge regional search volume) ───────────── */
  {
    id: 'up-board-class-10-syllabus-2026',
    title: 'UP Board Class 10 Syllabus 2026: Free NCERT Notes, PPTs & Practice',
    category: 'UP Board',
    description: 'Complete UP Board (UPMSP) Class 10 syllabus 2026 for Maths & Science. UP Board follows NCERT — get free notes, slide lessons, and chapter-wise MCQ practice on Syllab.in.',
    readTime: '6 min read',
    content: `UP Board (UPMSP) is India's largest school board by student count. The good news for Class 10 students: **UP Board follows the NCERT textbooks** for Maths and Science — so the chapters are the same as CBSE.

## What this means for you

You can use the exact same free NCERT resources CBSE students use. On Syllab.in, just set your board to **UP Board** in your profile and you instantly get the full Class 1–12 NCERT notes, slide (PPT) lessons, voice narration and chapter-wise practice — at zero cost.

## UP Board Class 10 Maths chapters (NCERT)

Real Numbers, Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Introduction to Trigonometry, Applications of Trigonometry, Circles, Areas Related to Circles, Surface Areas & Volumes, Statistics, Probability.

## UP Board Class 10 Science chapters (NCERT)

Chemical Reactions, Acids Bases & Salts, Metals & Non-metals, Carbon Compounds, Life Processes, Control & Coordination, Reproduction, Heredity, Light, Human Eye, Electricity, Magnetic Effects, Our Environment.

## How to score 90+ in UP Board 2026

1. Finish NCERT line by line — UP Board questions stay close to the textbook.
2. Practice chapter-wise MCQs (free on Syllab.in) to lock concepts.
3. Solve previous-year UP Board papers under timed conditions.
4. Revise diagrams for Science — they carry direct marks.

Everything you need is free — no coaching fees required.`,
  },
  {
    id: 'bihar-board-bseb-class-10-2026',
    title: 'Bihar Board (BSEB) Class 10 2026: Free Syllabus, Notes & Mock Practice',
    category: 'Bihar Board',
    description: 'Bihar Board (BSEB) Class 10 follows NCERT for Maths & Science. Get the 2026 syllabus, free notes, PPT lessons and chapter-wise MCQ practice free on Syllab.in.',
    readTime: '5 min read',
    content: `Bihar Board (BSEB) Class 10 students can prepare 100% free. BSEB's Maths and Science follow the **NCERT curriculum**, so the same high-quality NCERT resources apply.

## Free BSEB Class 10 prep on Syllab.in

Set your board to **Bihar** in your profile → get NCERT-aligned notes, slide lessons, voice narration and chapter-wise MCQ practice for every chapter, free.

## Smart 3-step plan

1. **Cover NCERT fully** — BSEB papers reward textbook mastery.
2. **Practice MCQs + short answers** chapter by chapter.
3. **Time yourself** on past BSEB papers.

Coaching in many Bihar towns is expensive or unavailable — a free phone-friendly platform closes that gap.`,
  },

  /* ── Exam update posts (high-intent, time-sensitive search) ─────────────── */
  {
    id: 'jee-main-2026-dates-pattern-free-mocks',
    title: 'JEE Main 2026: Exam Dates, Pattern & Free Mock Tests',
    category: 'JEE',
    description: 'JEE Main 2026 exam dates (Session 1 & 2), paper pattern, marking scheme, and free full-length mock tests + a rank predictor on Syllab.in.',
    readTime: '6 min read',
    content: `JEE Main 2026 is conducted by NTA in two sessions. Here's everything you need plus free practice.

## JEE Main 2026 — indicative dates

- **Session 1:** late January 2026
- **Session 2:** early April 2026
- Best of both sessions' NTA scores is considered.

## Pattern

3 subjects (Physics, Chemistry, Maths), 75 questions (25 each, 20 MCQ + 5 numerical), 300 marks, 3 hours. +4 correct, −1 wrong (MCQ).

## Free prep on Syllab.in

- Full-length **JEE Main mock tests** with section analysis.
- A free **JEE rank predictor** (percentile → rank) and **college predictor**.
- Browse **top engineering colleges** by state with cutoffs and fees.

Confirm exact dates on jeemain.nta.ac.in.`,
  },
  {
    id: 'neet-2026-date-syllabus-free-practice',
    title: 'NEET 2026: Exam Date, Syllabus & Free Biology Practice',
    category: 'NEET',
    description: 'NEET UG 2026 exam date, subject-wise syllabus, marking scheme, and free chapter-wise Biology/Physics/Chemistry practice + NEET college predictor on Syllab.in.',
    readTime: '6 min read',
    content: `NEET UG 2026 (NTA) is the single gateway to MBBS/BDS in India. Here's the plan plus free practice.

## NEET 2026 — indicative date

Early May 2026 (pen-and-paper). Confirm on neet.nta.nic.in.

## Pattern

Physics, Chemistry, Biology (Botany + Zoology), 180 questions, 720 marks. +4 correct, −1 wrong.

## Why Biology decides your rank

Biology is 360/720. It rewards deep conceptual clarity, not rote learning. On Syllab.in the **AI tutor explains why each wrong answer is wrong** — built exactly for NEET Biology.

## Free NEET prep on Syllab.in

Chapter-wise MCQ practice, full NEET mocks, a **marks → rank predictor** and an **MBBS college predictor**. All free.`,
  },
  {
    id: 'eamcet-2026-ap-ts-dates-free-mocks',
    title: 'EAMCET 2026 (AP & TS EAPCET): Dates, Pattern & Free Mock Tests',
    category: 'EAMCET',
    description: 'AP EAPCET & TS EAPCET (EAMCET) 2026 dates, exam pattern, and free mock tests plus an EAMCET rank predictor and engineering college predictor on Syllab.in.',
    readTime: '5 min read',
    content: `EAMCET (now EAPCET) is the engineering & agriculture entrance for Andhra Pradesh and Telangana.

## Indicative 2026 windows

- **AP EAPCET & TS EAPCET:** April–May 2026.

## Pattern

160 questions (Maths/Bio 80, Physics 40, Chemistry 40), 160 marks, no negative marking — so attempt everything.

## Free prep on Syllab.in

EAMCET mock tests, a **rank predictor** (marks → rank) and a **college predictor** for AP/TS engineering colleges with cutoffs and fees. All free.`,
  },

  /* ── College guide posts (drive the /colleges pages) ─────────────────────── */
  {
    id: 'top-engineering-colleges-tamil-nadu-2026',
    title: 'Top Engineering Colleges in Tamil Nadu 2026: Fees, Cutoffs & Placements',
    category: 'Colleges',
    description: 'The best engineering colleges in Tamil Nadu 2026 — Anna University CEG, PSG Tech, VIT, SSN, Thiagarajar and more. Compare TNEA/JEE cutoffs, fees, NIRF rank and placements free on Syllab.in.',
    readTime: '6 min read',
    content: `Tamil Nadu has India's largest engineering ecosystem. Here are the top picks for 2026 with how to get in.

## Government & aided (best value)

- **CEG, Anna University (Chennai)** — the state's #1; CSE cutoff ~199.5/200 via TNEA. Fees ~₹0.5L/yr.
- **PSG College of Technology (Coimbatore)** — top aided college, strong industry links.
- **Thiagarajar College of Engineering (Madurai)** and **MIT Chennai** — excellent value.

## Top private

- **VIT Vellore** — via VITEEE; huge recruiter base.
- **SSN (Chennai)**, **SASTRA (Thanjavur)**, **Amrita (Coimbatore)** — strong CSE placements.

## How admission works

Most government/aided seats are filled by **TNEA** using your Class 12 (PCM) cutoff marks — no separate entrance for many. Private/deemed use VITEEE/AEEE or JEE.

See full fees, cutoffs, NIRF + multi-source rankings and the step-by-step admission process for each on Syllab.in's free college directory.`,
  },
  {
    id: 'top-engineering-colleges-karnataka-2026',
    title: 'Top Engineering Colleges in Karnataka 2026: KCET & COMEDK Cutoffs',
    category: 'Colleges',
    description: 'Best engineering colleges in Karnataka 2026 — RVCE, BMSCE, MSRIT, PES, NITK, Manipal and more. KCET/COMEDK cutoffs, fees, NIRF rank and placements, free on Syllab.in.',
    readTime: '6 min read',
    content: `Bengaluru is India's tech capital, and Karnataka's colleges feed it. Top picks for 2026:

## Bengaluru's best

- **RVCE** — the top private college; CSE KCET rank ≤ 500.
- **BMSCE**, **MSRIT**, **PES University**, **BIT** — all excellent for CSE/ISE.
- **IIIT-Bangalore** — outstanding placements (₹25 LPA average).

## Beyond Bengaluru

- **NITK Surathkal** — premier NIT (via JEE Main).
- **Manipal Institute of Technology**, **JSSSTU Mysuru**, **KLE Tech Hubli**.

## Admission

State seats via **KCET**; private seats via **COMEDK** or institute tests (PESSAT, MET). Compare every college's fees, cutoff, NIRF/IIRF rank and placements on Syllab.in's free directory.`,
  },
  {
    id: 'cbse-vs-state-board-which-to-choose',
    title: 'CBSE vs State Board (UP, Telangana, AP…): Which Should You Choose?',
    category: 'Guidance',
    description: 'CBSE vs state boards (UP, Bihar, Rajasthan, MP, Telangana, AP, Karnataka, Maharashtra) — syllabus differences, pros and cons, and how to get free notes, PPTs and practice for any board on Syllab.in.',
    readTime: '5 min read',
    content: `Choosing a board confuses many families. Here's a clear, honest comparison.

## The key fact

**UP, Bihar, Rajasthan and MP boards follow the NCERT textbooks** — the same as CBSE. So the academic content is nearly identical; the difference is mostly the exam pattern and medium.

**AP, Telangana, Karnataka and Maharashtra** have their own (different) syllabi for some subjects.

## Quick guide

- **Want national mobility (JEE/NEET alignment)?** CBSE or any NCERT-following board.
- **Local/state college focus + regional language?** Your state board is perfectly fine.

## Free for every board on Syllab.in

Set your board in your profile and you instantly get notes, slide (PPT) lessons, voice narration and chapter-wise practice — NCERT-aligned boards share the full CBSE content, and AP/TS/Karnataka/Maharashtra get their own. All free.`,
  },
];

/**
 * Generate blog posts from templates
 * Rotates through templates each time the script runs
 */
function generateBlogs() {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);

  // Publish ALL evergreen templates (state syllabus, exam updates, study guides)
  // so every post is indexable. Dates are spread across recent days so the feed
  // looks freshly updated rather than all-on-one-day.
  const blogs = BLOG_TEMPLATES.map((template, i) => {
    const postDate = new Date(now.getTime() - ((i * 3 + (dayOfYear % 3)) % 60) * 86400000);
    return {
      id: template.id,
      title: template.title,
      description: template.description,
      date: postDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: template.readTime,
      category: template.category,
      content: template.content,
    };
  });

  return blogs;
}

/**
 * Main: Generate and write blogs
 */
async function main() {
  try {
    const blogs = generateBlogs();
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(blogs, null, 2), 'utf8');
    console.log(`✓ Generated ${blogs.length} trending blogs → ${OUTPUT_PATH}`);
    console.log('Blogs:', blogs.map((b) => b.title));
  } catch (error) {
    console.error('Error generating blogs:', error);
    process.exit(1);
  }
}

main();
