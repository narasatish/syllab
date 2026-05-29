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
];

/**
 * Generate blog posts from templates
 * Rotates through templates each time the script runs
 */
function generateBlogs() {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);

  // Pick 3 random templates based on day (ensures rotation)
  const selectedIndices = [];
  for (let i = 0; i < 3; i++) {
    const idx = (dayOfYear + i * 7) % BLOG_TEMPLATES.length;
    selectedIndices.push(idx);
  }

  const blogs = selectedIndices.map((idx) => {
    const template = BLOG_TEMPLATES[idx];
    return {
      id: template.id,
      title: template.title,
      description: template.description,
      date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
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
