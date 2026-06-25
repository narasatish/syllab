/**
 * Mock Exam Landing Pages — programmatic SEO cluster for India's leading entrance exams
 * Each exam has a landing page at /mock-tests/{slug} with full details, pattern info,
 * preparation tips, and FAQs. Slugs are optimized for high-intent searches.
 */

export interface MockExam {
  slug: string;
  name: string;
  fullName: string;
  emoji: string;
  about: string;
  pattern: {
    questions: number;
    durationMin: number;
    marking: string;
    sections: string[];
  };
  subjects: string[];
  tips: string[];
  faqs: Array<{ q: string; a: string }>;
}

export const MOCK_EXAMS: MockExam[] = [
  {
    slug: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    emoji: '⚛️',
    about: 'JEE Main is the all-India entrance exam for admission into National Institutes of Technology (NITs), Indian Institutes of Information Technology (IIITs), and other top engineering colleges. It tests your understanding of Physics, Chemistry, and Mathematics at the 11th and 12th standard level. Over 10 lakh students appear for JEE Main annually, making it one of the world\'s largest entrance exams.',
    pattern: {
      questions: 75,
      durationMin: 180,
      marking: '+4 for correct, −1 for incorrect, 0 for unattempted',
      sections: ['Physics (25 questions)', 'Chemistry (25 questions)', 'Mathematics (25 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Mechanics', 'Thermodynamics', 'Organic Chemistry', 'Inorganic Chemistry', 'Calculus', 'Algebra', 'Trigonometry'],
    tips: [
      'Master the NCERT textbooks thoroughly — 70% of JEE Main questions come from NCERT. Read theory, solve examples, and practice end-of-chapter questions.',
      'Create a formula sheet and revision notes for all chapters. Update it as you learn new concepts; it becomes invaluable during the final 30 days of revision.',
      'Practice at least 20 full mock tests under real exam conditions (no breaks, 3 hours, no reference materials). Analyze your performance after each test.',
      'Balance accuracy and speed: aim for 70% accuracy initially, then push for 85%+. Never sacrifice accuracy for speed — wrong answers cost marks.',
    ],
    faqs: [
      { q: 'Is JEE Main sufficient for engineering college admission in India?', a: 'JEE Main scores are used for admission to NITs, IIITs, and other Centrally Funded Technical Institutions (CFTIs). For IITs, you must also qualify JEE Advanced. Many private engineering colleges also accept JEE Main scores.' },
      { q: 'How many times can I attempt JEE Main in a year?', a: 'JEE Main is conducted twice a year (January and April sessions). You can attempt it up to 5 times in consecutive years.' },
      { q: 'What is the difficulty level of JEE Main?', a: 'JEE Main is moderately difficult. The questions test conceptual understanding and application rather than just memorization. With 6–8 months of focused preparation, any 12th pass student can crack it.' },
      { q: 'Should I join a coaching center for JEE Main?', a: 'Not mandatory. Many students crack JEE Main through self-study with good books and online resources. However, coaching provides structured guidance, doubt-clearing, and motivation.' },
    ],
  },
  {
    slug: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test for Undergraduate',
    emoji: '🔬',
    about: 'NEET is the sole national-level entrance exam for admission to medical and dental undergraduate courses in India, including all government and private medical colleges. Over 20 lakh students compete for approximately 1.5 lakh seats annually. NEET tests your knowledge of Biology, Chemistry, and Physics at the 11th and 12th standard level, with a strong focus on concept-based questions.',
    pattern: {
      questions: 180,
      durationMin: 200,
      marking: '+4 for correct, −1 for incorrect, 0 for unattempted',
      sections: ['Physics (45 questions)', 'Chemistry (45 questions)', 'Biology: Botany (45 questions)', 'Biology: Zoology (45 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology', 'Human Anatomy', 'Physiology', 'Ecology', 'Genetics', 'Evolution', 'Cell Biology'],
    tips: [
      'Build a strong foundation in Biology — it carries 50% of the paper and is highly scoring. Memorize structures (anatomy), processes (photosynthesis), and lifecycle patterns (lifecycle of Plasmodium).',
      'Make flashcards for Biology: one-liners for definitions, diagrams for structures, and mnemonics for long lists (e.g., ABCDE for kingdom classification). Review them daily.',
      'Solve previous 10 years\' NEET papers to understand the question pattern. You\'ll notice that 30% of questions are repeated or similar to past years.',
      'Study from NCERT + good reference books (like MTG or Marvel Biology). Do NOT skip NCERT — ~95% of NEET comes from NCERT biology.',
    ],
    faqs: [
      { q: 'Can I get admission to a medical college with a NEET score of 500?', a: 'It depends on your category and state. For General category, 500 is below the cut-off for most government colleges. However, private colleges may accept it. Aim for at least 600+ to be competitive.' },
      { q: 'Is NCERT sufficient for NEET preparation?', a: 'NCERT is the backbone of NEET. However, for deeper understanding, especially in Physics and Chemistry, reference books like DC Pandey and O.P. Tandon are helpful.' },
      { q: 'How long should I study each day for NEET?', a: 'Ideal preparation involves 7–8 hours of focused study daily for 1 year. Quality of study matters more than quantity — stay focused and avoid distractions.' },
      { q: 'What is the age limit for NEET?', a: 'There is no upper age limit. You can appear for NEET as long as you meet the educational qualification (12th pass). The only restriction is appearing a maximum of 3 times in a calendar year.' },
    ],
  },
  {
    slug: 'ap-eapcet',
    name: 'AP EAPCET',
    fullName: 'Andhra Pradesh Engineering, Agriculture & Pharmacy Common Entrance Test',
    emoji: '🏢',
    about: 'AP EAPCET is the entrance exam conducted by Andhra Pradesh for admission to engineering, agriculture, and pharmacy courses in state universities and colleges. It serves as the qualifying exam for engineering and agriculture aspirants from Andhra Pradesh seeking admission to their state institutions. The exam has two streams: Engineering (E) for engineering colleges, and Agriculture & Pharmacy (AP) for agricultural and pharmacy colleges.',
    pattern: {
      questions: 160,
      durationMin: 180,
      marking: '+1 for correct, 0 for incorrect, 0 for unattempted',
      sections: ['Physics (40 questions)', 'Chemistry (40 questions)', 'Mathematics (40 questions)', 'Biology/Agronomy (40 questions for AP stream)'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Agronomy', 'Soil Science', 'Plant Biology', 'Animal Science', 'Environmental Science'],
    tips: [
      'AP EAPCET has a focus on conceptual clarity with less emphasis on numerical problems compared to JEE Main. Study NCERT thoroughly and practice questions from the official question bank.',
      'Time management is crucial — 160 questions in 180 minutes means roughly 1 minute per question. Start with your strongest section to build confidence and momentum.',
      'For the AP stream (Agriculture & Pharmacy), botany and zoology are important. Focus on life cycles, classification, and ecological concepts.',
      'Solve previous 5 years\' papers to get familiar with the question style. AP EAPCET prefers straightforward questions over tricky ones.',
    ],
    faqs: [
      { q: 'Is AP EAPCET valid for colleges outside Andhra Pradesh?', a: 'AP EAPCET is primarily for AP state colleges. However, some private colleges in other states may accept AP EAPCET scores. It is not valid for NIT or IIIT admissions.' },
      { q: 'What is the validity of AP EAPCET score?', a: 'AP EAPCET scores are valid for the academic year only. If you score in 2024, it is used for 2024 admissions. You must re-appear if you want to apply in 2025.' },
      { q: 'Can non-AP residents appear for AP EAPCET?', a: 'Yes, but they typically fall into a different category during counseling. State domicile status may affect seat allotment.' },
      { q: 'What is the syllabus for AP EAPCET?', a: 'The syllabus follows Intermediate (11th and 12th) physics, chemistry, and mathematics from AP Board curriculum, which is broadly aligned with NCERT.' },
    ],
  },
  {
    slug: 'ts-eapcet',
    name: 'TS EAPCET',
    fullName: 'Telangana Engineering, Agriculture & Pharmacy Common Entrance Test',
    emoji: '🏗️',
    about: 'TS EAPCET is the entrance exam conducted by Telangana State for admission to engineering, agriculture, and pharmacy programs in state universities and colleges. It is the primary entrance exam for engineering aspirants in Telangana seeking admission to state-funded institutions. The exam is conducted separately for engineering and agriculture/pharmacy courses.',
    pattern: {
      questions: 160,
      durationMin: 180,
      marking: '+1 for correct, 0 for incorrect, 0 for unattempted',
      sections: ['Physics (40 questions)', 'Chemistry (40 questions)', 'Mathematics (40 questions)', 'Biology/Agriculture (40 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Crop Science', 'Horticulture', 'Soil Science', 'Agricultural Economics', 'Plant Breeding'],
    tips: [
      'TS EAPCET follows the Telangana Board curriculum closely. If you studied from your school textbooks and NCERT, you are already familiar with the required content.',
      'The exam is less competitive than JEE Main and more straightforward. Focus on building accuracy — questions are not tricky.',
      'Allocate time based on comfort: spend more time on sections where you are weaker. Since there\'s no negative marking, attempt all questions.',
      'Mock tests are essential to understand question patterns and improve speed. Take at least 10 full-length mocks before the actual exam.',
    ],
    faqs: [
      { q: 'Can Andhra Pradesh students appear for TS EAPCET?', a: 'Technically, anyone can appear, but you must meet residency requirements for seat allotment. As an AP student, you would be placed in a different category during counseling.' },
      { q: 'Is TS EAPCET only for Telangana colleges?', a: 'Yes, TS EAPCET scores are recognized only by Telangana state colleges and universities. Private colleges outside Telangana may or may not accept them.' },
      { q: 'What is the cut-off for TS EAPCET?', a: 'The cut-off varies by course and category. For engineering, it typically ranges from 400–500+ for General category. Check the official website for exact cut-offs.' },
      { q: 'How many attempts are allowed for TS EAPCET?', a: 'Students can appear for TS EAPCET multiple times within the same academic year if it is held multiple times. Otherwise, it is held once per year.' },
    ],
  },
  {
    slug: 'bitsat',
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    emoji: '💻',
    about: 'BITSAT is the entrance exam conducted by BITS Pilani for admission to engineering and science undergraduate programs at its campuses in Pilani, Goa, and Hyderabad. BITSAT is known for its balanced difficulty level, focus on conceptual understanding, and comprehensive paper that tests not just engineering basics but also general awareness and logical reasoning. It attracts the top engineering aspirants from across India.',
    pattern: {
      questions: 130,
      durationMin: 180,
      marking: '+3 for correct, −1 for incorrect in Part 1; +2 for correct, −0.67 for incorrect in Parts 2–4; 0 for unattempted',
      sections: ['Physics (40 questions)', 'Chemistry (40 questions)', 'Mathematics (40 questions)', 'English & Logical Reasoning (10 questions)', 'General Awareness (10 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Logical Reasoning', 'English Comprehension', 'General Knowledge', 'Current Affairs'],
    tips: [
      'BITSAT uniquely includes General Awareness and English sections. Don\'t neglect them — they are moderate-difficulty and can boost your overall score significantly.',
      'The exam follows a computer-adaptive format: questions get harder if you answer correctly and easier if you answer incorrectly. Don\'t waste time on very difficult questions; move on strategically.',
      'Practice with the official BITSAT mock tests and previous papers. The interface is different from traditional pen-and-paper exams, so get familiar with the online format.',
      'Time allocation: Physics 45 minutes, Chemistry 45 minutes, Mathematics 50 minutes, Logical Reasoning & General Awareness 20 minutes. Adjust based on your comfort.',
    ],
    faqs: [
      { q: 'What is the required score to get admission in BITSAT?', a: 'BITSAT does not have a fixed cut-off. Admission is based on merit and available seats. Typically, a score of 300+ (out of 450) is competitive. BITS Pilani is harder to get into (350+), while Goa and Hyderabad are relatively easier (300+).' },
      { q: 'Is BITSAT valid outside BITS campuses?', a: 'BITSAT scores are recognized only by BITS Pilani and its campuses. However, if you are qualified in JEE Main, you are automatically eligible to apply to BITS.' },
      { q: 'How many times can I attempt BITSAT?', a: 'BITSAT is conducted once per year. You can attempt it multiple times in consecutive years, but only the latest score is considered.' },
      { q: 'What is the difficulty level of BITSAT compared to JEE Main?', a: 'BITSAT is moderately difficult, roughly on par with JEE Main. The questions are more balanced and less tricky. If you can score 300+ in JEE Main, you can score 300+ in BITSAT.' },
    ],
  },
  {
    slug: 'kcet',
    name: 'KCET',
    fullName: 'Karnataka Common Entrance Test',
    emoji: '🎓',
    about: 'KCET is the state-level entrance exam conducted by Karnataka for admission to engineering, agricultural, and pharmacy undergraduate programs in recognized colleges across Karnataka. It is one of the most popular entrance exams in South India with over 2 lakh applicants annually. KCET serves as the gateway to prestigious engineering colleges in Karnataka like NIT Surathkal, RVCE Bangalore, and various state universities.',
    pattern: {
      questions: 180,
      durationMin: 180,
      marking: '+1 for correct, 0 for incorrect, 0 for unattempted',
      sections: ['Physics (60 questions)', 'Chemistry (60 questions)', 'Mathematics (60 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Mechanics', 'Thermodynamics', 'Organic Chemistry', 'Inorganic Chemistry', 'Calculus', 'Coordinate Geometry'],
    tips: [
      'KCET has a very fast-paced paper: 180 questions in 180 minutes means exactly 1 minute per question. Speed and accuracy are equally important — practice under time pressure.',
      'Since there\'s no negative marking, attempt all questions. Even a 25% guess rate will give you points. Don\'t leave blanks.',
      'The syllabus follows Karnataka Board curriculum (11th and 12th), which is slightly different from NCERT. Get NCERT textbooks and supplement with Karnataka Board resources.',
      'Solve at least 15 full-length mock tests. Each mock should be done in exactly 180 minutes to build the rhythm and stamina needed for the actual exam.',
    ],
    faqs: [
      { q: 'Is KCET valid outside Karnataka?', a: 'KCET scores are primarily for Karnataka colleges. A few private colleges outside Karnataka may accept KCET, but it\'s not widely recognized.' },
      { q: 'What is the typical KCET cut-off for engineering colleges?', a: 'For NIT Surathkal (top engineering college in Karnataka), the cut-off is around 550+. For RVCE, it\'s around 500+. For state engineering colleges, 400+ is generally competitive.' },
      { q: 'Can I apply for KCET if I am not a Karnataka resident?', a: 'Yes, anyone can appear for KCET, but non-residents fall into a different category during counseling, which may affect seat allotment.' },
      { q: 'Is KCET harder than JEE Main?', a: 'KCET is generally considered slightly easier than JEE Main. Questions are more straightforward and less conceptually heavy. However, the speed required is much higher.' },
    ],
  },
  {
    slug: 'mht-cet',
    name: 'MHT CET',
    fullName: 'Maharashtra Health Sciences and Technical Common Entrance Test',
    emoji: '⚙️',
    about: 'MHT CET is the entrance exam conducted by Maharashtra for admission to engineering, pharmacy, agriculture, and health sciences undergraduate courses in state colleges and universities. It is one of the most competitive entrance exams in India with over 5 lakh applicants annually. Admission to prestigious institutions like COEP, MIT Pune, and various state engineering colleges is solely through MHT CET.',
    pattern: {
      questions: 200,
      durationMin: 180,
      marking: '+1 for correct, 0 for incorrect, 0 for unattempted (Physics & Chemistry); +1 for correct, −0.25 for incorrect (Mathematics)',
      sections: ['Physics (50 questions)', 'Chemistry (50 questions)', 'Mathematics (100 questions)', 'Or Biology (100 questions) for agriculture/pharmacy stream'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Biotechnology', 'Pharmacology', 'Agricultural Science'],
    tips: [
      'Mathematics has 100 questions with a ¼ negative mark per wrong answer — be careful. Focus on accuracy in math more than speed.',
      'MHT CET syllabus includes both 11th and 12th standard content in equal proportion. Don\'t skip 11th standard topics.',
      'The exam is known for time crunch — 200 questions in 180 minutes is brutal. Practice solving questions in 50 seconds per question.',
      'Maharashtra Board textbooks (HSC) and NCERT both cover the syllabus. Use both as supplements to ensure complete coverage.',
    ],
    faqs: [
      { q: 'What is the required score for COEP or MIT Pune?', a: 'Top engineering colleges in Maharashtra like COEP and MIT typically have cut-offs of 600+ for General category. Aiming for 700+ gives a safe margin.' },
      { q: 'Is MHT CET valid outside Maharashtra?', a: 'MHT CET is recognized only by Maharashtra colleges. However, if you\'ve appeared in JEE Main, you are eligible for NIT admissions as an alternative.' },
      { q: 'How many attempts are allowed for MHT CET?', a: 'You can appear for MHT CET multiple times. However, only the latest score is considered for admission.' },
      { q: 'What is the difference between Physics+Chemistry+Mathematics and Physics+Chemistry+Biology?', a: 'The Mathematics stream (PCM) is for engineering colleges. The Biology stream (PCB) is for agriculture, pharmacy, and health sciences colleges.' },
    ],
  },
  {
    slug: 'wbjee',
    name: 'WBJEE',
    fullName: 'West Bengal Joint Entrance Examination',
    emoji: '🌉',
    about: 'WBJEE is the entrance exam conducted by West Bengal for admission to engineering, technology, pharmacy, and architecture programs in state colleges and universities. It is one of the popular entrance exams in Eastern India with over 1.5 lakh applicants annually. WBJEE is the primary exam for admission to prestigious colleges like IIEST Shibpur and Jadavpur University in West Bengal.',
    pattern: {
      questions: 200,
      durationMin: 180,
      marking: '+1 for correct (Category 1); +2 for correct (Category 2); no negative marking',
      sections: ['Physics (40 Category 1 + 20 Category 2 questions)', 'Chemistry (40 Category 1 + 20 Category 2 questions)', 'Mathematics (40 Category 1 + 20 Category 2 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Mechanics', 'Waves', 'Thermodynamics', 'Organic & Inorganic Chemistry', 'Algebra', 'Geometry', 'Trigonometry'],
    tips: [
      'WBJEE has two question categories: Category 1 (1 mark each, no negative marking) and Category 2 (2 marks each, no negative marking). Since there\'s no negative mark, attempt everything.',
      'Physics and Chemistry are equally important with 80 questions each. Don\'t underestimate Chemistry — it can be a game-changer.',
      'The exam follows West Bengal Board curriculum (12th standard), which has some differences from NCERT. Use WB Board textbooks along with NCERT.',
      'Mock tests designed for WBJEE are crucial. Practice with official sample papers and previous years\' papers to get familiar with the question style.',
    ],
    faqs: [
      { q: 'What is the required score for IIEST Shibpur or Jadavpur University?', a: 'For IIEST Shibpur (top engineering college in West Bengal), the cut-off is typically 500+ for General category. For Jadavpur, it\'s around 450+.' },
      { q: 'Is WBJEE valid outside West Bengal?', a: 'WBJEE scores are primarily recognized by West Bengal colleges. Some colleges in Eastern India may accept WBJEE, but it is not widely accepted outside the region.' },
      { q: 'What is the advantage of WBJEE over JEE Main?', a: 'WBJEE has no negative marking, making it relatively more student-friendly. However, it is less competitive and prestigious than JEE Main.' },
      { q: 'How many attempts are allowed for WBJEE?', a: 'WBJEE can be attempted multiple times. Generally, the latest score is considered for admission.' },
    ],
  },
  {
    slug: 'science-olympiad',
    name: 'Science Olympiad',
    fullName: 'National Science Olympiad',
    emoji: '🔭',
    about: 'The National Science Olympiad is a nationwide exam conducted by Science Olympiad Foundation (SOF) for school students from Class 1 to 12. It tests scientific knowledge, logical reasoning, and problem-solving skills through objective questions. Science Olympiad is not just an exam but also a platform that recognizes and nurtures young scientific talent across India. Over 50 lakh students participate annually across multiple rounds.',
    pattern: {
      questions: 50,
      durationMin: 60,
      marking: '+1 for each correct, 0 for unattempted, −0.25 for incorrect (may vary by class)',
      sections: ['Science Concepts (35 questions)', 'Everyday Science (10 questions)', 'Logical Reasoning (5 questions)'],
    },
    subjects: ['Physics', 'Chemistry', 'Biology', 'Life Science', 'Earth Science', 'Space Science', 'Logical Reasoning', 'Scientific Thinking'],
    tips: [
      'Science Olympiad encourages curiosity and deep understanding of science concepts. Focus on the "why" behind concepts, not just memorizing facts.',
      'Read the NCERT textbooks thoroughly for your class level. Most Olympiad questions are based on NCERT curriculum but require deeper conceptual understanding.',
      'Practice daily with Science Olympiad previous years\' papers. These papers give you an idea of the question style and difficulty level.',
      'Join coaching or study groups that specifically prepare for Science Olympiad. Many schools conduct internal Olympiad coaching programs.',
    ],
    faqs: [
      { q: 'What is the difference between different rounds of Science Olympiad?', a: 'Round 1 is conducted in schools and is easier. Top students from Round 1 qualify for Round 2, which is conducted at regional/zonal level. Round 2 is harder and competitiveness increases significantly.' },
      { q: 'What are the benefits of winning Science Olympiad?', a: 'Winners get recognitions, certificates, and sometimes scholarships. More importantly, it boosts your competitive exam preparation and develops scientific thinking skills essential for future exams like JEE and NEET.' },
      { q: 'Can I prepare for Science Olympiad alongside school studies?', a: 'Absolutely. Science Olympiad preparation enhances your school learning. Dedicate 1–2 hours per week to Olympiad-specific questions and you are good.' },
      { q: 'What is the difficulty level of Science Olympiad compared to school exams?', a: 'Science Olympiad is moderately harder than school exams. It tests deeper understanding and logical reasoning, not just memorization. If you score well in your school exam, you can do well in Olympiad with some extra preparation.' },
    ],
  },
  {
    slug: 'maths-olympiad',
    name: 'Maths Olympiad',
    fullName: 'National Mathematics Olympiad',
    emoji: '📐',
    about: 'The National Mathematics Olympiad (NMO), coordinated by the Mathematics Olympiad Foundation, is a prestigious exam that identifies and develops mathematical talent among Indian school students from Class 1 to 12. Unlike school mathematics which focuses on solving problems using memorized formulas, Maths Olympiad emphasizes logical reasoning, pattern recognition, and creative problem-solving. Over 40 lakh students compete annually in multiple rounds.',
    pattern: {
      questions: 50,
      durationMin: 60,
      marking: '+1 for each correct, 0 for unattempted, −0.25 for incorrect (may vary by class)',
      sections: ['Algebra (15 questions)', 'Geometry (15 questions)', 'Number Theory & Combinatorics (20 questions)'],
    },
    subjects: ['Algebra', 'Geometry', 'Trigonometry', 'Number Theory', 'Combinatorics', 'Probability', 'Mathematical Reasoning', 'Problem-Solving Strategies'],
    tips: [
      'Maths Olympiad is about creative problem-solving, not calculations. Practice solving problems using different approaches. One problem may have 2–3 elegant solutions.',
      'Start with the basics: build strong foundations in algebra, geometry, and number theory. Most Olympiad problems are variants of classical problems.',
      'Solve problems from previous Olympiad papers and mathematics puzzle books. Don\'t just read the solutions — try to solve independently first.',
      'Join Maths Olympiad coaching or study groups. Discussing problems with peers helps you understand different problem-solving strategies and shortcuts.',
    ],
    faqs: [
      { q: 'What is the difference between Maths Olympiad and school mathematics?', a: 'School math teaches standard formulas and procedures. Olympiad math teaches logical reasoning, pattern recognition, and creative problem-solving. Olympiad is much harder and conceptually deeper.' },
      { q: 'Can I prepare for Maths Olympiad while preparing for board exams?', a: 'Yes. Olympiad preparation strengthens your mathematical thinking, which helps in board exams. However, Olympiad questions are not directly part of board syllabus.' },
      { q: 'What are the advantages of winning Maths Olympiad?', a: 'You get certificates, recognition, and scholarships. Winning Maths Olympiad significantly strengthens your JEE and other competitive exam preparation. It also opens doors to science and engineering college scholarships.' },
      { q: 'Is Maths Olympiad harder than JEE Main?', a: 'They test different skills. Olympiad tests deep logical reasoning. JEE Main tests application of concepts. A Maths Olympiad topper may not automatically excel in JEE, and vice versa. However, Olympiad skills are very valuable for JEE prep.' },
    ],
  },
];
