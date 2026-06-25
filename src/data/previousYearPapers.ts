/**
 * Previous Year Questions (PYQ) & Sample Papers — programmatic SEO cluster.
 * High-intent, high-volume India searches ("CBSE Class 10 previous year papers",
 * "JEE Main PYQ", "NEET previous year question papers"). We do NOT host copyrighted
 * board papers — each page provides original guidance: exam pattern, high-weightage
 * topics, how to use PYQs effectively, tips and FAQs, and links to Syllab's own free
 * mock tests + important questions for actual practice. All free, all static data.
 */

export interface PaperGuide {
  slug: string;
  exam: string;            // short label, e.g. "CBSE Class 10"
  title: string;          // full H1 / page title
  emoji: string;
  intro: string;          // overview paragraph
  pattern: string[];      // exam-pattern bullet points
  howToUse: string[];     // how to use PYQs effectively
  keyTopics: { subject: string; topics: string }[]; // high-weightage / repeated areas
  tips: string[];
  faqs: { q: string; a: string }[];
  /** Where to actually practise on Syllab (internal links keep these pages useful + aid SEO). */
  practice: { label: string; tab?: string; href?: string }[];
}

export const PAPER_GUIDES: PaperGuide[] = [
  {
    slug: 'cbse-class-10',
    exam: 'CBSE Class 10',
    title: 'CBSE Class 10 Previous Year Question Papers & Sample Papers (Free Guide)',
    emoji: '📘',
    intro:
      'Solving CBSE Class 10 previous year question papers (PYQs) and sample papers is the single most effective way to prepare for the board exams. They show you the exact pattern, the marks distribution, and the questions that repeat year after year. This free guide explains the latest pattern, the highest-weightage chapters in every subject, and how to use PYQs the right way — plus free mock tests and important questions to practise on Syllab.',
    pattern: [
      'Each subject paper is 80 marks (theory) + 20 marks (internal assessment) = 100.',
      'Question types: Multiple Choice (MCQ), Very Short Answer (VSA, 1–2 marks), Short Answer (SA, 3 marks), Long Answer (LA, 5 marks) and case/competency-based questions.',
      'Competency-based questions now make up ~50% of the paper — focus on application, not rote.',
      'Exam duration is 3 hours; CBSE releases official sample papers and the marking scheme on cbseacademic.nic.in each year.',
    ],
    howToUse: [
      'Finish the syllabus once, then solve the last 5 years of PYQs subject by subject.',
      'Always solve a full paper in one 3-hour sitting to build exam stamina and time management.',
      'After each paper, mark every question by chapter and find your weak chapters — revise those first.',
      'Solve the latest CBSE sample paper last, under strict exam conditions, as a final mock.',
      'Compare your answers with the official marking scheme to learn how marks are awarded (step marks matter).',
    ],
    keyTopics: [
      { subject: 'Maths', topics: 'Trigonometry, Triangles, Statistics & Probability, Quadratic Equations, Surface Areas & Volumes, Coordinate Geometry' },
      { subject: 'Science', topics: 'Chemical Reactions, Acids-Bases-Salts, Life Processes, Light (Reflection/Refraction), Electricity, Heredity' },
      { subject: 'Social Science', topics: 'Nationalism in India, Resources & Development, Power Sharing, Money & Credit, Manufacturing Industries' },
      { subject: 'English', topics: 'Reading comprehension, Writing (letter/analytical paragraph), Grammar (tenses, voice, reported speech), Literature' },
    ],
    tips: [
      'Maths & Science have the most repeated numericals — practise them until they are automatic.',
      'Write the formula/step even if unsure of the final answer; CBSE gives step marks.',
      'Attempt the paper in order of confidence, not order of questions, to bank easy marks first.',
      'In the last month, solve one full PYQ or sample paper every alternate day.',
    ],
    faqs: [
      { q: 'How many years of CBSE Class 10 previous year papers should I solve?', a: 'Solve at least the last 5 years of board papers plus the latest 2–3 official CBSE sample papers. That covers almost every repeating question type and the current competency-based pattern.' },
      { q: 'Where can I get the official CBSE Class 10 sample papers?', a: 'CBSE publishes official sample question papers and marking schemes for free on the academic website (cbseacademic.nic.in) every year, usually a few months before the exams.' },
      { q: 'Are previous year papers enough to pass Class 10 boards?', a: 'PYQs are excellent for revision and pattern familiarity, but pair them with concept study and chapter-wise practice. Use Syllab\'s free lessons and practice MCQs to build the concepts first, then PYQs to test yourself.' },
      { q: 'Do the same questions repeat in CBSE board exams?', a: 'Exact questions rarely repeat, but question types, numericals and high-weightage chapters repeat heavily. Spotting these patterns from PYQs is what makes them so valuable.' },
    ],
    practice: [
      { label: 'Practise free Class 10 mock tests', tab: 'mock_tests' },
      { label: 'Class 10 important questions', href: '/important-questions' },
      { label: 'Class 10 chapter lessons', href: '/class-10' },
    ],
  },
  {
    slug: 'cbse-class-12',
    exam: 'CBSE Class 12',
    title: 'CBSE Class 12 Previous Year Question Papers & Sample Papers (Free Guide)',
    emoji: '📗',
    intro:
      'CBSE Class 12 previous year question papers (PYQs) and sample papers are essential for board prep and for building the speed and accuracy you also need for JEE and NEET. This free guide breaks down the latest exam pattern, the most important chapters in Physics, Chemistry, Maths, Biology and the commerce/humanities subjects, and a proven way to use PYQs — with free mock tests and important questions to practise on Syllab.',
    pattern: [
      'Most theory papers are 70 marks + 30 practical/internal, or 80 + 20 depending on subject.',
      'Mix of MCQ, assertion-reason, short answer, long answer and case-based questions.',
      'Competency-based and application questions are a growing share of every paper.',
      'Exam duration is 3 hours; official sample papers and marking schemes are released on cbseacademic.nic.in.',
    ],
    howToUse: [
      'Solve the last 5–7 years of PYQs subject-wise after completing each subject once.',
      'For Physics/Chemistry/Maths, maintain an error log of every numerical you get wrong.',
      'Time every paper strictly — Class 12 papers are long and time management decides marks.',
      'Use the latest CBSE sample paper as your final full-length mock before the exam.',
      'Cross-check derivations and long answers against the official marking scheme.',
    ],
    keyTopics: [
      { subject: 'Physics', topics: 'Electrostatics, Current Electricity, Magnetism, EMI & AC, Optics, Modern Physics (Dual Nature, Atoms, Nuclei)' },
      { subject: 'Chemistry', topics: 'Electrochemistry, Chemical Kinetics, Coordination Compounds, Aldehydes/Ketones/Acids, Biomolecules, p-block' },
      { subject: 'Maths', topics: 'Calculus (Integrals, Differential Equations), Vectors & 3D Geometry, Probability, Matrices & Determinants, LPP' },
      { subject: 'Biology', topics: 'Genetics & Evolution, Human Reproduction, Biotechnology, Ecology, Molecular Basis of Inheritance' },
    ],
    tips: [
      'Derivations and named reactions are repeatedly asked — keep a one-page list per subject.',
      'For Maths, accuracy in calculus and 3D fetches the bulk of long-answer marks.',
      'Revise NCERT line-by-line for Biology and inorganic Chemistry — boards stay close to NCERT.',
      'Solve at least 10 full papers (PYQ + sample) before the exam for each main subject.',
    ],
    faqs: [
      { q: 'How many CBSE Class 12 previous year papers should I solve?', a: 'Aim for the last 5–7 years of board papers per subject, plus the latest official CBSE sample papers. This covers the full range of question types and current pattern.' },
      { q: 'Are Class 12 PYQs useful for JEE and NEET too?', a: 'Yes — the NCERT-based theory overlaps heavily, and the speed/accuracy you build solving board PYQs directly helps with the MCQ entrance exams. Use Syllab\'s free JEE/NEET mock tests alongside.' },
      { q: 'Where are the official CBSE Class 12 sample papers?', a: 'They are published free each year on cbseacademic.nic.in along with the marking scheme, typically a few months before the board exams.' },
      { q: 'Should I solve PYQs chapter-wise or full-paper-wise?', a: 'Do both: chapter-wise PYQs while studying a topic to master it, then full-length papers in the last 1–2 months to build exam temperament and timing.' },
    ],
    practice: [
      { label: 'Practise free Class 12 mock tests', tab: 'mock_tests' },
      { label: 'Class 12 important questions', href: '/important-questions' },
      { label: 'Class 12 chapter lessons', href: '/class-12' },
    ],
  },
  {
    slug: 'jee-main',
    exam: 'JEE Main',
    title: 'JEE Main Previous Year Question Papers (PYQ) — Free Guide & Practice',
    emoji: '🧮',
    intro:
      'For JEE Main, previous year questions (PYQs) are gold. The exam reuses concepts and question patterns relentlessly, and toppers consistently say solving 10+ years of PYQs was their biggest score booster. This free guide covers the latest JEE Main pattern, the highest-weightage chapters in Physics, Chemistry and Maths, and exactly how to use PYQs — with free JEE Main mock tests on Syllab.',
    pattern: [
      '90 questions (30 each in Physics, Chemistry, Maths); you attempt 75 (20 MCQ + 5 of 10 numerical per subject).',
      'Marking: +4 correct, −1 wrong (MCQ); numerical-value questions also have negative marking now.',
      'Duration 3 hours; conducted online (CBT) by NTA in multiple sessions per year.',
      'Score is normalised across sessions into a percentile; NTA releases official question papers and answer keys after each session.',
    ],
    howToUse: [
      'Solve at least the last 10 years of JEE Main PYQs, chapter-wise first, then full mocks.',
      'Track which chapters your mistakes come from and prioritise high-weightage weak areas.',
      'Practise numerical-value questions separately — many students lose easy marks there.',
      'Take full 3-hour mocks weekly to build stamina and a question-selection strategy.',
      'Review every wrong answer the same day; an error log is more valuable than re-solving correct ones.',
    ],
    keyTopics: [
      { subject: 'Physics', topics: 'Mechanics, Electrostatics & Current Electricity, Modern Physics, Optics, Heat & Thermodynamics' },
      { subject: 'Chemistry', topics: 'Physical: Mole Concept, Equilibrium, Thermodynamics; Inorganic: Coordination, p-block; Organic: GOC, reactions' },
      { subject: 'Maths', topics: 'Calculus, Coordinate Geometry, Algebra (Sequences, Complex Numbers), Vectors & 3D, Probability' },
    ],
    tips: [
      'Chemistry (especially inorganic + physical) is the fastest-scoring section — secure it first.',
      'Speed matters: 75 questions in 180 minutes is ~2.4 min each. PYQs train this pace.',
      'Memorise standard results and shortcuts that PYQs reveal are tested repeatedly.',
      'Attempt the numerical section confidently — it often has straightforward formula-based questions.',
    ],
    faqs: [
      { q: 'How many years of JEE Main PYQs should I solve?', a: 'Solve at least the last 10 years (and ideally 15) of JEE Main papers. Concepts and question patterns repeat heavily, so this is one of the highest-ROI things you can do.' },
      { q: 'Are JEE Main previous year questions enough?', a: 'PYQs are essential but pair them with concept study and topic-wise practice. Build concepts with Syllab\'s free lessons, then use PYQs and full mock tests to test and time yourself.' },
      { q: 'Where can I find official JEE Main question papers?', a: 'NTA releases the official question papers and answer keys on the JEE Main website (jeemain.nta.ac.in) after each session.' },
      { q: 'Do questions repeat in JEE Main?', a: 'Exact questions are rare, but the same concepts, formulae and question types repeat constantly across years — which is why PYQ practice is so effective.' },
    ],
    practice: [
      { label: 'Take a free JEE Main mock test', href: '/mock-tests/jee-main' },
      { label: 'JEE Main college predictor', href: '/college-predictor/jee-main' },
      { label: 'All free mock tests', tab: 'mock_tests' },
    ],
  },
  {
    slug: 'neet',
    exam: 'NEET',
    title: 'NEET Previous Year Question Papers (PYQ) — Free Guide & Practice',
    emoji: '🩺',
    intro:
      'NEET rewards students who master NCERT and drill previous year questions (PYQs). A large share of NEET questions are directly NCERT-based, and PYQs reveal exactly which lines and concepts NTA tests again and again. This free guide covers the latest NEET pattern, the most important chapters in Biology, Physics and Chemistry, and how to use PYQs — with free NEET mock tests on Syllab.',
    pattern: [
      '200 questions (180 to be attempted): Physics 45, Chemistry 45, Botany 45, Zoology 45.',
      'Marking: +4 correct, −1 wrong; duration 3 hours 20 minutes.',
      'Pen-and-paper (OMR) exam conducted by NTA, usually once a year.',
      'Biology carries half the paper (360/720 marks) — it is the deciding section.',
    ],
    howToUse: [
      'Solve the last 10+ years of NEET PYQs, subject-wise, alongside line-by-line NCERT revision.',
      'For Biology, map each PYQ back to its NCERT line — that\'s where most answers live.',
      'Time full mocks at 200 questions in 200 minutes to build speed and accuracy.',
      'Maintain a mistakes notebook, especially for Physics numericals and inorganic Chemistry.',
      'Revise high-yield NCERT diagrams and tables that PYQs show are repeatedly asked.',
    ],
    keyTopics: [
      { subject: 'Biology', topics: 'Genetics & Evolution, Human Physiology, Plant Physiology, Cell Biology, Ecology, Biotechnology, Reproduction' },
      { subject: 'Chemistry', topics: 'Organic (GOC, reactions), Coordination Compounds, Chemical Bonding, Equilibrium, Biomolecules, p-block' },
      { subject: 'Physics', topics: 'Mechanics, Electrodynamics, Modern Physics, Optics, Thermodynamics' },
    ],
    tips: [
      'Biology is your scoring engine — aim for near-full marks by mastering NCERT + PYQs.',
      'Physics is the toughest for most NEET aspirants; PYQs show the recurring formula-based questions.',
      'Stick close to NCERT for Chemistry — boards and NEET both lean heavily on it.',
      'Practise OMR-filling under time pressure so it never costs you in the real exam.',
    ],
    faqs: [
      { q: 'How many NEET previous year papers should I solve?', a: 'Solve at least the last 10–15 years of NEET (and AIPMT) PYQs. A huge fraction of NEET questions echo earlier papers and NCERT lines.' },
      { q: 'Is NCERT enough for NEET, or do I need PYQs too?', a: 'NCERT is the foundation (especially for Biology and Chemistry), and PYQs tell you how that NCERT content is tested. Use both — NCERT to learn, PYQs and mocks to apply.' },
      { q: 'Where can I get official NEET question papers?', a: 'NTA publishes official NEET question papers and answer keys on the NEET website (neet.nta.nic.in) after the exam.' },
      { q: 'How important is Biology in NEET?', a: 'Very — Biology is 360 of 720 marks (half the paper). Strong Biology from NCERT + PYQs is the most reliable path to a high NEET score.' },
    ],
    practice: [
      { label: 'Take a free NEET mock test', href: '/mock-tests/neet' },
      { label: 'NEET college predictor', href: '/college-predictor/neet' },
      { label: 'All free mock tests', tab: 'mock_tests' },
    ],
  },
  {
    slug: 'ts-eamcet',
    exam: 'TS EAMCET',
    title: 'TS EAMCET Previous Year Question Papers (PYQ) — Free Guide & Practice',
    emoji: '🎓',
    intro:
      'TS EAMCET (TG EAPCET) is highly predictable, which makes previous year questions (PYQs) extremely powerful. The exam sticks closely to the Telangana intermediate syllabus and reuses question patterns each year. This free guide covers the pattern, high-weightage topics for the Engineering stream, and how to use PYQs — with free EAMCET-style mock tests on Syllab.',
    pattern: [
      '160 questions: Mathematics 80, Physics 40, Chemistry 40 (Engineering stream).',
      'No negative marking — attempt every question.',
      'Duration 3 hours; computer-based test conducted for TGCHE/JNTU Hyderabad.',
      'Weightage: 75% from the qualifying exam (Intermediate) marks + 25% EAMCET rank in final ranking.',
    ],
    howToUse: [
      'Maths carries half the paper — make PYQ practice in Maths your top priority.',
      'Solve the last 8–10 years of TS EAMCET papers; the pattern barely changes year to year.',
      'Since there\'s no negative marking, practise attempting all 160 in time.',
      'Focus on Telangana Intermediate (BIE) textbook content — that\'s what EAMCET tests.',
      'Take full timed mocks to perfect your Maths-first time-allocation strategy.',
    ],
    keyTopics: [
      { subject: 'Mathematics', topics: 'Calculus, Trigonometry, Coordinate Geometry, Algebra, Vectors, Probability' },
      { subject: 'Physics', topics: 'Mechanics, Electricity & Magnetism, Modern Physics, Waves & Oscillations, Thermodynamics' },
      { subject: 'Chemistry', topics: 'Chemical Bonding, States of Matter, Organic Chemistry, p-block, Solutions, Electrochemistry' },
    ],
    tips: [
      'With 80 Maths questions and no negative marking, Maths accuracy + speed decides your rank.',
      'Stick to the BIE Intermediate syllabus — EAMCET rarely goes beyond it.',
      'Attempt easy Chemistry questions first to bank quick marks.',
      'Solve at least 10 full PYQ/mock papers before the exam.',
    ],
    faqs: [
      { q: 'How many TS EAMCET previous year papers should I solve?', a: 'Solve the last 8–10 years of TS EAMCET (and EAPCET) papers. The pattern is very stable, so older papers remain highly relevant.' },
      { q: 'Is there negative marking in TS EAMCET?', a: 'No — there is no negative marking, so you should attempt all 160 questions even when unsure.' },
      { q: 'Where can I find official TS EAMCET papers?', a: 'Official question papers and keys are released on the TS/TG EAMCET website (eapcet.tgche.ac.in) after the exam.' },
      { q: 'How is the TS EAMCET rank calculated?', a: 'The final rank weights 75% your Intermediate (qualifying exam) marks and 25% your EAMCET score, so both matter.' },
    ],
    practice: [
      { label: 'Take a free EAMCET mock test', tab: 'mock_tests' },
      { label: 'TS EAPCET college predictor', href: '/college-predictor/ts-eapcet' },
      { label: 'Telangana engineering colleges', href: '/colleges/telangana' },
    ],
  },
  {
    slug: 'ap-eamcet',
    exam: 'AP EAMCET',
    title: 'AP EAMCET Previous Year Question Papers (PYQ) — Free Guide & Practice',
    emoji: '🎓',
    intro:
      'AP EAMCET (AP EAPCET) closely follows the Andhra Pradesh intermediate syllabus and a stable, repeating pattern — so previous year questions (PYQs) are one of the best ways to prepare. This free guide covers the exam pattern, high-weightage topics for the Engineering stream, and how to use PYQs — with free EAMCET-style mock tests on Syllab.',
    pattern: [
      '160 questions: Mathematics 80, Physics 40, Chemistry 40 (Engineering stream).',
      'No negative marking — attempt all questions.',
      'Duration 3 hours; computer-based test conducted by JNTU Kakinada for APSCHE.',
      'Final rank weights 75% Intermediate marks + 25% EAMCET score.',
    ],
    howToUse: [
      'Prioritise Maths PYQs — 80 of 160 questions come from Mathematics.',
      'Solve the last 8–10 years of AP EAMCET papers; the pattern is consistent.',
      'With no negative marking, train to attempt every question within the time limit.',
      'Base your prep on the AP Intermediate (BIEAP) textbooks that EAMCET follows.',
      'Use full timed mocks to lock in a Maths-first attempt strategy.',
    ],
    keyTopics: [
      { subject: 'Mathematics', topics: 'Calculus, Trigonometry, Coordinate Geometry, Algebra, Vectors, Probability' },
      { subject: 'Physics', topics: 'Mechanics, Electricity & Magnetism, Modern Physics, Waves, Thermodynamics' },
      { subject: 'Chemistry', topics: 'Chemical Bonding, Organic Chemistry, p-block, States of Matter, Electrochemistry, Solutions' },
    ],
    tips: [
      'Maths is half the paper and has no negative marking — accuracy and speed here decide your rank.',
      'Keep strictly to the BIEAP Intermediate syllabus.',
      'Bank quick Chemistry marks early, then spend time on Maths.',
      'Solve 10+ full PYQ/mock papers before the exam for confidence and timing.',
    ],
    faqs: [
      { q: 'How many AP EAMCET previous year papers should I solve?', a: 'Solve the last 8–10 years of AP EAMCET/EAPCET papers. The stable pattern means older papers are still very useful.' },
      { q: 'Is there negative marking in AP EAMCET?', a: 'No — there is no negative marking, so attempt all 160 questions.' },
      { q: 'Where can I find official AP EAMCET papers?', a: 'Official papers and answer keys are released on the AP EAPCET website (cets.apsche.ap.gov.in) after the exam.' },
      { q: 'How is the AP EAMCET rank calculated?', a: 'It weights 75% your Intermediate (qualifying) marks and 25% your EAMCET score.' },
    ],
    practice: [
      { label: 'Take a free EAMCET mock test', tab: 'mock_tests' },
      { label: 'AP EAPCET college predictor', href: '/college-predictor/ap-eapcet' },
      { label: 'Andhra Pradesh engineering colleges', href: '/colleges/andhra-pradesh' },
    ],
  },
,
{
  "slug": "cbse-class-9",
  "exam": "CBSE Class 9",
  "title": "CBSE Class 9 Previous Year Question Papers (PYQ) — Free Guide & Practice",
  "emoji": "📚",
  "intro": "CBSE Class 9 PYQs are your roadmap to acing annual board exams. Solving previous years' papers reveals the exact question types, weightage, and difficulty level that appear in the final exam. Master these papers and you'll walk into the exam hall with confidence.",
  "pattern": [
    "Mathematics: 4 sections (A: MCQs, B: Short Answer, C: Long Answer, D: Case Study); total 80 marks + 20 internal",
    "Science: Biology, Physics, Chemistry mixed with practicals; 80 marks (theory) + 20 (practicals/project)",
    "Social Science: History, Geography, Political Science, Economics; 80 marks theory + 20 internal",
    "English: Reading, Writing, Literature, Grammar; 100 marks (80 exam + 20 internal assessment)",
    "Exam duration: 3 hours per subject; 40% conceptual, 30% application, 30% analytical questions"
  ],
  "howToUse": [
    "Solve papers in exam conditions: 3 hours, no interruptions, calculator only for Math",
    "Identify your weak chapters by analyzing PYQ trends — if a topic appears every year, prioritize it",
    "Practice the exact format: answers must fit the given space, follow CBSE marking scheme strictly",
    "Review your answers against the official marking scheme to understand step-wise allocation",
    "Track time per question — Science usually needs 100 mins for 80 marks, English needs careful reading"
  ],
  "keyTopics": [
    {
      "subject": "Mathematics",
      "topics": "Linear equations, Polynomials, Geometry (circles, triangles), Quadratic equations, Statistics, Probability"
    },
    {
      "subject": "Science",
      "topics": "Cell structure, Tissues, Atoms/Molecules, Gravitation, Work/Energy, Magnetism, Periodic table, Chemical reactions"
    },
    {
      "subject": "Social Science",
      "topics": "French Revolution, Socialism, Nationalism, Map skills, Climate, Soil, Natural resources, Government structure"
    }
  ],
  "tips": [
    "Section A (MCQs) in Math: read questions twice, eliminate obviously wrong answers first — saves time",
    "Science practicals: draw diagrams neatly with labels; examiners often award marks just for clarity",
    "Social Science: use map skills wherever possible — 2-3 questions always reward good map annotation",
    "English: don't skip poetry/unseen passages — these are highest-scoring with direct text evidence"
  ],
  "faqs": [
    {
      "q": "How many PYQs should I solve before the exam?",
      "a": "Minimum 5 full papers per subject in the final month. Ideally, solve one complete set per week for the last 8 weeks."
    },
    {
      "q": "Will the same questions repeat in my exam?",
      "a": "Not exactly, but CBSE repeats concepts, question types, and weightage. PYQs show what WILL be tested."
    },
    {
      "q": "Should I memorize PYQ answers?",
      "a": "No. Understand the concept, then practice explaining it in your own words. CBSE values analytical thinking, not rote."
    },
    {
      "q": "How do I improve from 60% to 85% on practice papers?",
      "a": "Track every wrong answer: was it a concept gap, calculation error, or poor time management? Target concept gaps first."
    }
  ],
  "practice": [
    {
      "label": "Take a free mock test",
      "tab": "mock_tests"
    },
    {
      "label": "Class 9 study guide",
      "href": "/class-9"
    }
  ]
},
{
  "slug": "kcet",
  "exam": "KCET",
  "title": "KCET Previous Year Question Papers (PYQ) — Free Guide & Practice",
  "emoji": "🎯",
  "intro": "Karnataka CET PYQs are your direct ticket to engineering college seats. KCET follows a predictable pattern: 180 MCQs in 180 minutes across Maths, Physics, and Chemistry. Solving 8-10 previous papers boosts your score by 15-20% as you learn timing, question tricks, and high-weightage topics.",
  "pattern": [
    "Total questions: 180 (60 Maths, 60 Physics, 60 Chemistry)",
    "Duration: 3 hours (180 minutes)",
    "Marking: +1 per correct answer, no negative marking",
    "Format: Multiple Choice (4 options A, B, C, D)",
    "Difficulty: 40% easy, 45% medium, 15% difficult; focus on medium-level questions for maximum returns"
  ],
  "howToUse": [
    "Solve at least one full paper per week for 8 weeks; time yourself strictly at 1 minute per question",
    "Skip questions you're unsure about on first pass, return to them if time permits (eliminates -1 speed traps)",
    "Identify your subject weakness: if Physics drags, solve Physics PYQs 2x per week until speed matches Math",
    "Track your score trajectory: if jumping from 120 to 160, you've found your ceiling and can now focus on accuracy",
    "Review wrong answers immediately after each paper — note if error was concept, calculation, or misread"
  ],
  "keyTopics": [
    {
      "subject": "Mathematics",
      "topics": "Trigonometry, Calculus (limits, derivatives, integrals), Vectors, 3D Geometry, Permutations/Combinations, Probability"
    },
    {
      "subject": "Physics",
      "topics": "Mechanics (motion, forces, circular motion), Heat, Thermodynamics, Electricity, Magnetism, Modern Physics, Optics"
    },
    {
      "subject": "Chemistry",
      "topics": "Organic reactions, Periodic properties, Chemical bonding, Equilibrium, Electrochemistry, Coordination compounds"
    }
  ],
  "tips": [
    "Maths: trigonometry and calculus appear in 25-30 questions combined — master these two topics for a 30-point jump",
    "Physics: modern physics (nuclear, photoelectric, atom models) has jumped in recent years — prioritize post-2020 papers",
    "Chemistry: organic reaction mechanisms repeat every year — practice named reactions and reagents extensively",
    "All subjects: when two answers seem close, re-read the question for hidden keywords like 'maximum,' 'approximate,' 'possible'"
  ],
  "faqs": [
    {
      "q": "What's the minimum score to get a good engineering college?",
      "a": "160+/180 secures top colleges (NIT Surathkal, BMS ITM). 140-160 gets decent government colleges in tier-2 cities."
    },
    {
      "q": "Should I solve JEE Advanced papers for KCET prep?",
      "a": "No. JEE is harder and different in approach. Stick to KCET PYQs — they mirror your actual exam difficulty."
    },
    {
      "q": "How do I manage time to finish all 180 questions?",
      "a": "Allocate 60 seconds per question. Spend 30s on easy ones (gain 10s per question), 90s on hard ones. Skip uncertain ones."
    },
    {
      "q": "Can I score 180/180 by only solving PYQs?",
      "a": "Unlikely — you need strong fundamentals first. PYQs fine-tune your speed and expose weak spots. Use them after covering basics."
    }
  ],
  "practice": [
    {
      "label": "Take a free mock test",
      "tab": "mock_tests"
    },
    {
      "label": "KCET college predictor",
      "href": "/college-predictor/kcet"
    },
    {
      "label": "Browse colleges in Karnataka",
      "href": "/colleges/karnataka"
    }
  ]
},
{
  "slug": "mht-cet",
  "exam": "MHT-CET",
  "title": "MHT-CET Previous Year Question Papers (PYQ) — Free Guide & Practice",
  "emoji": "⚡",
  "intro": "MHT-CET is Maharashtra's gateway to NIT Nagpur, college of engineering and technology seats. With 200 questions in 150 minutes, speed is your weapon. Solving previous year papers trains your brain to spot patterns, calculate faster, and prioritize high-confidence questions.",
  "pattern": [
    "Physics: 50 questions, 50 minutes (1 mark per MCQ, no negatives)",
    "Chemistry: 50 questions, 50 minutes (1 mark per MCQ)",
    "Maths: 100 questions, 50 minutes (1 mark per MCQ; double the density)",
    "Total: 200 questions × 1 mark = 200 total marks",
    "Difficulty jumps each year; 2023-24 papers notably harder in Math integration and Physics modern topics"
  ],
  "howToUse": [
    "Practice Math at extreme speed: 30 seconds per question is survival level, 20 seconds wins the exam",
    "Solve Physics and Chemistry at normal pace first (2 weeks), then compress to 1 min per question (6 weeks)",
    "Don't solve full papers initially — solve by chapter for 3 weeks, then full papers for last 4 weeks",
    "Use a stopwatch app on your phone; pause = zero — trains your brain to reject distractions mid-exam",
    "Track Math vs Physics vs Chemistry speed gaps; your weakest subject needs 2x practice time"
  ],
  "keyTopics": [
    {
      "subject": "Physics",
      "topics": "Kinematics, Newton's laws, Circular motion, Gravitation, Oscillations, Waves, Electricity, Magnetism, Modern physics, Semiconductors"
    },
    {
      "subject": "Chemistry",
      "topics": "Atomic structure, Chemical bonding, States of matter, Thermochemistry, Equilibrium, Redox reactions, Coordination chemistry, Amines"
    },
    {
      "subject": "Mathematics",
      "topics": "Trigonometry, Calculus (integration, application), Vectors, 3D geometry, Matrices, Permutation/Combination, Probability, Statistics"
    }
  ],
  "tips": [
    "Math speed hack: memorize all trigonometric identities and common integrals — don't derive them in the exam",
    "Physics: semiconductors and modern physics are recurring high-scorers — allocate extra time here",
    "Chemistry: coordination compounds and organic functional groups often have 6-8 questions — master these",
    "Maths time pressure: if behind by question 50, make educated guesses on remaining 50 rather than solving deeply"
  ],
  "faqs": [
    {
      "q": "Is MHT-CET easier than JEE Main?",
      "a": "Yes, but speed-wise harder. MHT-CET demands 1.3 questions per minute vs JEE's 0.8. Concept-wise, JEE is deeper."
    },
    {
      "q": "How many papers should I solve to be exam-ready?",
      "a": "Minimum 10 full papers in the last month. Ideally 15-20 papers, reviewed thoroughly. Target 180+/200."
    },
    {
      "q": "Do I need coaching to clear MHT-CET?",
      "a": "No. Self-study with PYQs, YouTube (top channels), and one good textbook (HC Verma for Physics, OP Tandon for Chemistry) suffices."
    },
    {
      "q": "What if I score 150/200? Can I get a decent college?",
      "a": "Yes — 150+ gets solid government colleges in Pune, Aurangabad, Kolhapur. For Mumbai colleges, you'd typically need 170+."
    }
  ],
  "practice": [
    {
      "label": "Take a free mock test",
      "tab": "mock_tests"
    },
    {
      "label": "MHT-CET college predictor",
      "href": "/college-predictor/mht-cet"
    },
    {
      "label": "Browse colleges in Maharashtra",
      "href": "/colleges/maharashtra"
    }
  ]
},
{
  "slug": "wbjee",
  "exam": "WBJEE",
  "title": "WBJEE Previous Year Question Papers (PYQ) — Free Guide & Practice",
  "emoji": "🏛️",
  "intro": "WBJEE is West Bengal's premier engineering entrance, your path to Jadavpur, Calcutta, and NIT Durgapur. The exam emphasizes conceptual depth over speed: 200 minutes for 100 questions means 2 minutes per question. Solving PYQs reveals WBJEE's preference for application-based questions and logical reasoning.",
  "pattern": [
    "Physics: 40 questions (30 MCQ single-answer + 10 MCQ multiple-answer)",
    "Chemistry: 40 questions (30 MCQ single-answer + 10 MCQ multiple-answer)",
    "Maths: 20 questions (15 MCQ single-answer + 5 MCQ multiple-answer)",
    "Total time: 200 minutes (100 seconds per question average)",
    "Marking: Single-answer +1, Multiple-answer +2 for all correct (0 if any wrong), -1/4 for wrong single-answer"
  ],
  "howToUse": [
    "Don't rush — WBJEE rewards deep thinking, not speed. Allocate 2-3 minutes per question; skip obvious trap answers",
    "Multiple-answer questions: only mark if all options are verified. Partial credit doesn't exist — all or nothing",
    "Solve papers chapter-wise first (2 weeks), then full papers (4 weeks), reviewing every single wrong choice",
    "Pay attention to WBJEE's unique question style: often tests borderline cases, rare exceptions, and combined concepts",
    "Compare with JEE Main: WBJEE is less formulaic, more about whether you truly understand the concept"
  ],
  "keyTopics": [
    {
      "subject": "Physics",
      "topics": "Mechanics (all subtopics), Thermodynamics, Properties of matter, Oscillations, Waves, Electrostatics, Current electricity, Magnetism, Optics, Modern physics"
    },
    {
      "subject": "Chemistry",
      "topics": "Atomic structure, Chemical bonding, Gaseous state, Thermochemistry, Equilibrium, Redox, Electrochemistry, Solutions, Organic mechanisms, Periodic table"
    },
    {
      "subject": "Mathematics",
      "topics": "Functions and limits, Continuity and differentiability, Applications of derivatives, Indefinite and definite integrals, Differential equations, Vectors"
    }
  ],
  "tips": [
    "Physics multiple-choice traps: WBJEE often has 3 correct-looking answers — read each statement word-by-word",
    "Chemistry: inorganic salt preparation and qualitative analysis appear every year — master these two topics",
    "Maths: calculus application problems (maxima/minima, curve sketching) are common — practice these extensively",
    "When stuck between two options: eliminate by considering edge cases (zero, infinity, extreme values)"
  ],
  "faqs": [
    {
      "q": "How is WBJEE different from JEE Main?",
      "a": "WBJEE is region-specific (West Bengal), has more time per question, emphasizes logical reasoning, and gives -1/4 for wrong single-answers (JEE gives -1)."
    },
    {
      "q": "What score gets me into Jadavpur or Calcutta University?",
      "a": "Jadavpur Engineering (top tier): 130+/200. Calcutta University (tier-2): 100-130. NIT Durgapur: 90-110."
    },
    {
      "q": "Should I solve JEE papers for WBJEE prep?",
      "a": "Yes, as supplementary practice. But prioritize WBJEE PYQs first — they match your exam format and style exactly."
    },
    {
      "q": "How do I avoid mistakes in multiple-answer questions?",
      "a": "Verify each option independently. If even one doubt exists, don't mark all four. Unmarked = 0, but wrong = -2."
    }
  ],
  "practice": [
    {
      "label": "Take a free mock test",
      "tab": "mock_tests"
    },
    {
      "label": "WBJEE college predictor",
      "href": "/college-predictor/wbjee"
    },
    {
      "label": "Browse colleges in West Bengal",
      "href": "/colleges/west-bengal"
    }
  ]
},
{
  "slug": "bitsat",
  "exam": "BITSAT",
  "title": "BITSAT Previous Year Question Papers (PYQ) — Free Guide & Practice",
  "emoji": "💻",
  "intro": "BITSAT is your path to Birla Institute of Technology: India's most selective tech entrance. Unlike JEE, BITSAT tests speed, English fluency, and logical reasoning alongside Physics, Chemistry, Math. Solving PYQs reveals BITSAT's obsession with application-based problems and its unusual 12-minute English section.",
  "pattern": [
    "Physics: 40 questions, 12 minutes allocated",
    "Chemistry: 30 questions, 9 minutes allocated",
    "Maths: 55 questions, 16.5 minutes allocated",
    "English & Logical Reasoning: 25 questions, 7.5 minutes allocated",
    "Total: 150 questions in 180 minutes with 1 mark/correct, -1 per wrong, no negatives for unattempted"
  ],
  "howToUse": [
    "BITSAT is a time pressure exam disguised as a concept exam — allocate exactly the suggested time per section and track strictly",
    "Practice English and Logical Reasoning first (4 weeks); this section surprises most JEE aspirants and kills scores",
    "Solve Maths and Physics from JEE resources, but practice BITSAT-specific question types via official papers",
    "Use the calculator provided in the exam — BITSAT expects you to use it, so practice calculation shortcuts with a real calculator",
    "Attempt every question (150 questions, 180 mins = 1.2 mins/question); guessing intelligently beats leaving blanks"
  ],
  "keyTopics": [
    {
      "subject": "Mathematics",
      "topics": "Algebra (quadratic equations, progressions), Trigonometry, Coordinate geometry, Calculus (integration, applications), Statistics, Probability"
    },
    {
      "subject": "Physics",
      "topics": "Mechanics, Gravitation, Oscillations, Waves, Electrostatics, Current electricity, Magnetism, Electromagnetic induction, Optics, Modern physics"
    },
    {
      "subject": "Chemistry",
      "topics": "Atomic structure, Bonding, Gaseous state, Thermochemistry, Equilibrium, Electrochemistry, Organic chemistry (reactions, synthesis), Periodic table"
    }
  ],
  "tips": [
    "English: BITSAT prefers straightforward comprehension — no tricky inference questions. Read once, answer directly.",
    "Logical Reasoning: pattern recognition, series completion, Venn diagrams — practice mental math speed here",
    "Physics and Chemistry: BITSAT leans toward numerical problems requiring real calculation, not just concept understanding",
    "Maths speed: calculator reduces complex calculations to 10 seconds — practice finding the shortcut in every problem"
  ],
  "faqs": [
    {
      "q": "How is BITSAT ranked compared to JEE Main?",
      "a": "Harder than JEE Main but narrower in scope. JEE is deeper; BITSAT is faster and broader. Cutoff: 260+/360 for BIT Pilani."
    },
    {
      "q": "Do I need to be strong in English for BITSAT?",
      "a": "Yes. BITSAT's English section is a deal-breaker for many JEE toppers. Allocate serious prep time here (4+ weeks)."
    },
    {
      "q": "Can I score 300+ and get a seat at BITS?",
      "a": "Typically 300+ secures a seat in a good branch at BITS Pilani or a guaranteed seat at BITS Goa/Hyderabad."
    },
    {
      "q": "Should I solve BITSAT papers before JEE or after?",
      "a": "After. Complete JEE prep first, then spend 4-6 weeks on BITSAT-specific papers (English, speed, question style)."
    }
  ],
  "practice": [
    {
      "label": "Take a free mock test",
      "tab": "mock_tests"
    },
    {
      "label": "BITSAT college predictor",
      "href": "/college-predictor/bitsat"
    }
  ]
},
{
  "slug": "cuet",
  "exam": "CUET UG",
  "title": "CUET UG Previous Year Question Papers (PYQ) — Free Guide & Practice",
  "emoji": "🎓",
  "intro": "CUET UG is the unified gate to 44 central universities including Delhi, JNU, BHU, Calcutta. Unlike school exams, CUET is a multi-subject test where you choose your domain (Science, Commerce, Humanities) plus a language and General Test. Solving PYQs reveals CUET's focus: breadth over depth, Indian context, and reading comprehension.",
  "pattern": [
    "Domain subjects (choose 3): each 45 questions in 45 minutes (1 mark/question)",
    "Languages (choose 2 from 13): each 40 questions in 45 minutes",
    "General Test: 75 questions in 60 minutes (GK, logic, data interpretation, quantitative)",
    "Total sections: varies by stream. Commerce: Accounting, Economics, Business Studies + 2 languages + General Test",
    "Science: Physics/Chemistry/Maths/Biology + 2 languages + General Test. Humanities: History/Geography/Political Science + 2 languages + General Test"
  ],
  "howToUse": [
    "Identify your domain stream early and focus your PYQ practice on those 3 subjects — don't scatter yourself across all subjects",
    "Practice one language PYQ per week; CUET languages test reading comprehension, not grammar or writing",
    "General Test is high-variance — allocate 30% of prep time here. It includes current affairs (2024-2025 focus) plus logic puzzles",
    "Take full mock tests in your exact stream combination, not random subject mixes",
    "Track your accuracy per subject: if History is 70% accurate but English only 50%, it reveals where your edge is"
  ],
  "keyTopics": [
    {
      "subject": "Science Domain",
      "topics": "Physics: Mechanics, Thermodynamics, Waves, Electricity, Magnetism, Modern Physics. Chemistry: Atomic structure, Bonding, Equilibrium, Organic reactions. Maths/Biology: varies by choice"
    },
    {
      "subject": "Commerce Domain",
      "topics": "Accounting: Ledgers, trial balance, financial statements. Economics: Microeconomics (demand, supply), Macroeconomics (inflation, GDP). Business: Management, marketing, finance"
    },
    {
      "subject": "Humanities Domain",
      "topics": "History: Ancient India, Medieval India, Modern India (1857-1950). Geography: India's physical features, climate, agriculture, industry. Political Science: Constitution, rights, federalism"
    }
  ],
  "tips": [
    "General Test: current affairs from the last 24 months is heavily tested. Read monthly news summaries, not just textbooks.",
    "Languages: CUET doesn't test grammar-heavy questions — it tests reading speed and comprehension. Practice unseen passages.",
    "Domain subjects: CUET asks application-based, real-world questions. A History question might be set in a specific year asking 'why did this happen?' — requires critical thinking, not rote dates.",
    "Time allocation: 45 mins for 45 domain questions = 60 seconds per question. Some questions need 90s; others, 15s. Adjust dynamically."
  ],
  "faqs": [
    {
      "q": "How many marks do I need to get into Delhi University?",
      "a": "Delhi University (top colleges like Miranda House, St. Stephen's): 750+ out of 1000. Mid-tier DU: 600+. Budget colleges: 500+."
    },
    {
      "q": "Is CUET harder than CBSE Class 12 board exam?",
      "a": "Different, not harder. CBSE tests depth in 2-3 subjects; CUET tests breadth across 5-6 topics in 5-6 subjects in 150 minutes. Speed matters more."
    },
    {
      "q": "Can I get into BHU, JNU, or Calcutta University with CUET?",
      "a": "Yes. BHU/JNU are highly competitive (top 5% scores). Calcutta University is slightly more accessible. Check merit lists per university."
    },
    {
      "q": "Should I prepare differently for CUET vs JEE?",
      "a": "Yes. JEE is deep technical knowledge in 3 subjects. CUET is broad knowledge in 5-6 subjects across arts/commerce/science. Time pressure and variety are CUET's challenges."
    }
  ],
  "practice": [
    {
      "label": "Take a free mock test",
      "tab": "mock_tests"
    },
    {
      "label": "CUET study materials",
      "href": "/cuet"
    }
  ]
}
];

export function getPaperGuide(slug: string): PaperGuide | undefined {
  return PAPER_GUIDES.find((p) => p.slug === slug);
}

export const PAPER_SLUGS = PAPER_GUIDES.map((p) => p.slug);

export const PAPERS_DISCLAIMER =
  'Syllab does not host or distribute copyrighted board/entrance exam papers. This page provides original study guidance and links to official sources. Exam patterns, marks distribution and dates change — always confirm details on the official board/exam website before relying on them.';
