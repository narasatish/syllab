#!/usr/bin/env node
/**
 * Static meta-tag pre-renderer for Syllab.in
 *
 * Runs AFTER `vite build`. For each known public route, copies dist/index.html
 * into dist/{route}/index.html with the correct per-page <title>, description,
 * canonical, OG tags and JSON-LD injected into the <head>.
 *
 * Why: Firebase Hosting serves physical files before falling through to the
 * SPA rewrite. So dist/syllabus/index.html is served statically for /syllabus —
 * Googlebot gets proper meta tags even without running JavaScript.
 *
 * Run: node scripts/generate-prerender.mjs  (called by npm run build automatically)
 */

import { promises as fs, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollegesManifest } from './collegesData.mjs';
import { getBlogArticles } from './blogArticles.mjs';
import { getNcertChapters } from './ncertChapters.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://syllab.in';

// ─── Per-route SEO data (must stay in sync with App.tsx PAGE_SEO) ──────────
// Keys are the URL paths (without leading slash where used as dir names).
const ROUTES = [
  {
    // Homepage — without this, dist/index.html ships with no <link rel="canonical">,
    // which is exactly what GSC reported ("User-declared canonical: None").
    // route.path "/" → split/filter(Boolean) is [] → writes dist/index.html. ✓
    path: '/',
    title: 'Syllab.in — Free AI Learning for CBSE, NCERT, JEE & NEET | Class 1–12',
    description: 'India\'s free AI learning platform for Class 1–12. NCERT chapters, MCQ practice, JEE/NEET/EAMCET mock tests, coding, daily GK, AI tutor, career & college predictor — free for every Indian student.',
    keywords: 'free learning app India, AI tutor free India, NCERT solutions free, CBSE notes free Class 1-12, JEE preparation free 2026, NEET preparation free, EAMCET mock test, career predictor free, free education India',
    jsonLd: [
      {
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: 'Syllab.in', operatingSystem: 'Web', applicationCategory: 'EducationApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, isAccessibleForFree: true,
        description: 'Free AI-powered learning platform for Class 1–12 CBSE Indian students',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '12000', bestRating: '5' },
      },
      {
        '@context': 'https://schema.org', '@type': 'EducationalOrganization',
        name: 'Syllab.in', url: SITE,
        description: 'Free AI education platform for Indian students Class 1-12',
        sameAs: ['https://twitter.com/syllabdotin'],
      },
      {
        '@context': 'https://schema.org', '@type': 'WebSite', name: 'Syllab.in', url: SITE,
        potentialAction: { '@type': 'SearchAction', target: `${SITE}/syllabus?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
      },
    ],
  },
  {
    path: '/syllabus',
    title: 'Class 1–12 NCERT Syllabus + Free Financial Literacy | CBSE Chapters | Syllab.in',
    description: 'Browse NCERT chapters for every class and subject. AI-powered summaries, concept notes, practice questions, and learning guides for Class 1 to 12 CBSE students.',
    keywords: 'NCERT syllabus, CBSE syllabus Class 1 to 12, chapter notes, NCERT chapters, subject-wise chapters',
  },
  {
    path: '/practice',
    title: 'Practice — Free Chapter-wise MCQs for CBSE NCERT | Syllab.in',
    description: 'Practice timed chapter-wise MCQs for NCERT CBSE with instant scoring, explanations, and AI mistake tracking. Free for all Class 1–12 students.',
    keywords: 'CBSE MCQ practice, NCERT questions, chapter wise quiz, online MCQ test, timed practice, CBSE exam prep, free MCQ India, practice arena alternative',
  },
  {
    path: '/daily-challenges',
    title: 'Daily Challenge — JEE NEET EAMCET & School Daily Quiz | Syllab.in',
    description: 'Take a daily quiz challenge for JEE, NEET, EAMCET, and school aptitude with live rankings and streak tracking. Same quiz for all users — compete with friends. Practice every day, improve your rank.',
    keywords: 'daily challenge free India, daily quiz, JEE daily practice, NEET daily questions, EAMCET quiz, daily challenge app, quiz competition, daily dose CBSE',
  },
  {
    path: '/mock-tests',
    title: 'Mock Tests — Free JEE, NEET, EAMCET & State Exam Papers | Syllab.in',
    description: 'Free mock tests for JEE Main, NEET, EAMCET, VIT, BITSAT, and all state engineering entrance exams (WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE). 10+ mocks each. Math & Science Olympiads included.',
    keywords: 'JEE Main mock test 2026 free, NEET mock test 2026 free, EAMCET mock test free, VIT mock test, BITSAT mock test free, WBJEE mock test free, TNEA mock test, UPSEE 2026 free, MHT-CET mock test free, KCET 2026 mock test, COMEDK UGET practice, GUJCET practice free, OJEE mock test free, state engineering entrance exams, full length mock test free India, board exam practice test Class 10, Math Olympiad free, Science Olympiad practice, sample paper CBSE 2026, previous year question paper, engineering entrance exam preparation free',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Free Mock Tests for JEE, NEET, EAMCET & State Exams',
      description: 'Practice with full mock tests for JEE Mains, NEET, EAMCET, BITSAT, WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE and Olympiads — 200+ mocks total, all free',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      educationalLevel: 'Class 9 to Class 12',
    },
  },
  {
    path: '/ai-tutor',
    title: 'AI Tutor — Free AI Homework Helper, Notes & Doubt Solver | Syllab.in',
    description: 'Free AI Tutor for Indian students. Generate AI concept notes, flashcards, practice MCQs. Scan & solve homework problems step-by-step. 24/7 doubt solving — no subscription, free for Class 1-12.',
    keywords: 'AI tutor free India, AI homework helper India free, AI notes generator free, flashcard maker free, question paper generator AI, AI tutor homework, concept notes generator AI, AI doubt solver free, scan and solve homework, photo question solver India, ChatGPT alternative for students free, Gemini tutor free, AI math solver India',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Free AI Tutor for Indian Students',
      description: 'AI-powered tutoring with notes generation, flashcards, scan-and-solve, and 24/7 doubt clearing for CBSE NCERT students',
      provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      educationalLevel: 'Class 1 to Class 12',
    },
  },
  {
    path: '/coding',
    title: 'Coding — Free Python, JavaScript, SQL & AI for Students | Syllab.in',
    description: 'Free coding courses for Indian students Class 5-12. Learn Python, JavaScript, SQL, Java, AI basics, Data Analytics, App Dev, Robotics, Game Dev, Git, Cloud, and Prompt Engineering. Build Mini Projects with instant AI feedback.',
    keywords: 'free coding India students, learn coding free India, Python for students India free, Python course Class 10, JavaScript basics free India, SQL basics free, SQL tutorial students, AI basics for students, data science course free India, coding skills students, competitive programming free India, HackerRank alternative free, LeetCode alternative free India, Python tutorial Class 10 11 India, Java basics free, coding course India free, free coding bootcamp India',
  },
  {
    path: '/coding/aptitude',
    title: 'Free Aptitude Training for Students India | Skills Lab | Syllab.in',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability free. Practice for TCS, Infosys, JEE, NEET, and all competitive exams.',
    keywords: 'aptitude training free India, aptitude for placement, competitive exam aptitude, TCS aptitude questions, NEET aptitude, JEE reasoning free',
  },
  {
    path: '/coding/app-dev',
    title: 'Free App Development Course for Students India | Syllab.in',
    description: 'Learn web and mobile app development — HTML, CSS, JavaScript, React, and build real projects. Free for Class 5–12 students.',
    keywords: 'app development for students India, HTML CSS JavaScript free, learn web development, mobile app development beginners, React tutorial free',
  },
  {
    path: '/coding/robotics',
    title: 'Free Robotics Course for Students India | Arduino, Sensors | Syllab.in',
    description: 'Learn robotics from scratch — Arduino programming, sensors, actuators, line followers, and robot arms. Perfect for Class 8–12 students.',
    keywords: 'robotics for students India, Arduino tutorial, robotics course free, line follower robot, robotics projects students, WRO preparation',
  },
  {
    path: '/coding/game-dev',
    title: 'Free Game Development Course for Students India | Syllab.in',
    description: 'Learn game development with p5.js — interactive graphics, physics, collision detection, and build mini games. Free for Class 5–12.',
    keywords: 'game development for students, p5.js tutorial, game design course free, learn game development, interactive graphics free',
  },
  {
    path: '/coding/git-github',
    title: 'Free Git & GitHub Course for Developers | Version Control | Syllab.in',
    description: 'Master version control with Git and GitHub — essential for every developer. Learn branching, merging, pull requests, and open source contribution.',
    keywords: 'Git tutorial free, GitHub for students, version control learning, Git commands guide, GitHub pages free, open source contribution',
  },
  {
    path: '/coding/prompt-engineering',
    title: 'Free Prompt Engineering Course | ChatGPT, Claude AI | Syllab.in',
    description: 'Learn to communicate with AI models — craft prompts that get precise results. Master ChatGPT, Claude, and LLM applications.',
    keywords: 'prompt engineering for students, ChatGPT prompts tutorial, AI prompt guide, Claude AI prompts, LLM applications free learning',
  },
  {
    path: '/coding/cloud-computing',
    title: 'Free Cloud Computing Course for Students India | AWS, Azure, GCP | Syllab.in',
    description: 'Learn cloud platforms — AWS, Azure, GCP. Deploy apps, understand cloud services, and get cloud-certified. Free for Class 8–12 students.',
    keywords: 'cloud computing for students India, AWS course free, cloud certification, deploy website cloud, cloud engineer training',
  },
  {
    path: '/coding/data-mining',
    title: 'Free Data Mining Course for Students India | Python Analytics | Syllab.in',
    description: 'Discover patterns in large datasets — classification, clustering, association rules, and predictive analytics with Python.',
    keywords: 'data mining for students, data mining tutorial free, machine learning basics, Python data analysis, predictive analytics learning',
  },
  {
    path: '/english',
    title: 'English — Free AI Speaking, Grammar & Vocabulary Practice | Syllab.in',
    description: 'Practice English daily with AI speaking coach, grammar challenges, reading passages, NCERT story guides, vocabulary builder, and IELTS prep — all free for Indian students.',
    keywords: 'English speaking practice free India, IELTS preparation free, English grammar CBSE Class 10, English vocabulary app free, spoken English practice app, NCERT English Class 9 10, English reading comprehension free, AI English teacher free India, free English coach India, spoken English course free, learn English online free India',
  },
  {
    path: '/preparation',
    title: 'JEE NEET EAMCET Board Exam Preparation Guides | Syllab.in',
    description: 'Comprehensive preparation guides for JEE Mains, NEET, EAMCET, and CBSE boards — chapter weightage, study plans, important formulas, and tips from top scorers.',
    keywords: 'JEE preparation guide, NEET study plan, EAMCET tips, board exam preparation, CBSE study strategy',
  },
  {
    path: '/about',
    title: 'About Syllab.in — Free AI Education for Every Indian Student',
    description: 'Syllab.in is on a mission to make AI-powered, high-quality education completely free for every Indian student from Class 1 to 12.',
    keywords: 'about Syllab, AI education India, free edtech, Indian student app, mission free learning',
  },
  {
    path: '/contact',
    title: 'Contact Syllab.in — Student Support & Partnership Enquiries',
    description: 'Get help from Syllab.in support for learning issues, platform questions, school partnerships, and academic queries.',
    keywords: 'contact Syllab, student support, help center, school partnership, edtech support India',
  },
  {
    path: '/blog',
    title: 'Study Tips & Guides for CBSE JEE NEET Students | Syllab.in Blog',
    description: 'Free study tips, chapter guides, exam strategies, and preparation advice for CBSE Class 5–12, JEE Mains, NEET, and EAMCET students. Auto-updated weekly with trending topics.',
    keywords: 'study tips CBSE students, JEE preparation strategy 2026, NEET exam guide, board exam tips Class 10, how to score high, important chapters high weightage, exam strategy blog, free NCERT notes Class 10, JEE NEET EAMCET 2026 preparation, best free coding platforms India students, CBSE Class 10 board exam tips 2026',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Syllab.in Blog',
      description: 'Free study tips, exam guides, and preparation strategies for Indian students Class 1-12. Auto-refreshed with trending topics every week.',
      url: 'https://syllab.in/blog',
      publisher: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      inLanguage: 'en-IN',
    },
  },
  {
    path: '/updates',
    title: 'Blog — Latest CBSE, JEE, NEET, AI & Study Tips for Indian Students | Syllab.in',
    description: 'Daily updates for Indian students: CBSE notifications 2026, JEE Mains updates, NEET 2026 news, EAMCET schedule, AI tool launches (ChatGPT, Claude, Gemini), coding trends, study tips. Aggregated from top edtech sources, refreshed daily.',
    keywords: 'CBSE updates 2025 2026, CBSE notification 2026, JEE Mains 2026 news, JEE Mains January 2026 dates, NEET latest news 2026, NEET 2026 schedule, EAMCET 2026 notification, AI tools for students 2026, ChatGPT for students, Claude AI tutor, Gemini AI study, coding skills India trending, student news updates India, edtech news India, NCERT updates 2026, board exam news 2026, free education news India, daily student news, education news today India',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: 'Syllab.in Updates',
      description: 'Daily-updated education news for Indian students Class 1-12 covering CBSE, JEE, NEET, EAMCET, AI tools, and coding trends',
      url: 'https://syllab.in/updates',
      publisher: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
      inLanguage: 'en-IN',
    },
  },
  {
    path: '/coding-challenges',
    title: 'Free Coding Challenges for Students | JavaScript Python | Syllab.in',
    description: 'Practice coding with free interactive challenges for Indian students. Run JavaScript code in your browser, earn XP, and level up your programming skills.',
    keywords: 'competitive programming India free, coding practice students free, LeetCode alternative free India, HackerRank free students, JavaScript practice problems, Python coding challenges, programming contests free',
  },
  {
    path: '/mini-projects',
    title: 'Mini Coding Projects for Students | Python JavaScript HTML | Syllab.in',
    description: 'Build 24 free mini coding projects in Python, JavaScript, HTML and SQL. Step-by-step guided projects for Indian students, Class 6 to 12.',
    keywords: 'mini coding projects students India, Python projects beginners, JavaScript projects, HTML CSS projects Class 10 11',
  },
  {
    path: '/coding-for-kids',
    title: 'Free Coding for Kids India | Class 3–8 Programming | Syllab.in',
    description: 'Learn coding for free with fun games and challenges designed for Indian kids Class 3 to 8. Start with Scratch basics, Python, and JavaScript — no prior experience needed.',
    keywords: 'coding for kids India, free coding Class 3 4 5 6 7 8, kids programming India, learn coding children, coding games for kids free',
  },
  {
    path: '/python-for-kids',
    title: 'Free Python for Kids India | Class 6–10 Python Basics | Syllab.in',
    description: 'Learn Python programming free for Indian students Class 6 to 10. Easy Python tutorials, projects, and practice — the most popular coding language for careers in AI and data science.',
    keywords: 'Python for kids India, free Python Class 6 7 8 9 10, Python beginners students, learn Python free India, Python projects students',
  },
  {
    path: '/computer-basics',
    title: 'Free Computer Basics for Class 3–8 | CBSE ICT Notes | Syllab.in',
    description: 'Learn computer basics free — hardware, software, internet, cyber safety for CBSE Class 3 to 8 students. Aligned with NCERT ICT syllabus with fun quizzes.',
    keywords: 'computer basics Class 3 4 5 6 7 8, CBSE computer science, free ICT notes students India, hardware software basics, computer parts kids',
  },
  {
    path: '/cyber-safety',
    title: 'Free Cyber Safety for Students India | Class 5–10 | Syllab.in',
    description: 'Learn internet safety, cyberbullying awareness, and online privacy for free. Essential cyber safety course for Indian students Class 5 to 10 by Syllab.in.',
    keywords: 'cyber safety for students India, internet safety kids, cyberbullying awareness Class 8 9 10, online safety free course India, digital literacy students',
  },
  {
    path: '/ai-for-students',
    title: 'Free AI for Students India | Class 8–12 Artificial Intelligence | Syllab.in',
    description: 'Learn Artificial Intelligence free for Indian students Class 8 to 12. AI basics, machine learning, ChatGPT, and career paths — free course at Syllab.in.',
    keywords: 'AI for students India, artificial intelligence Class 8 9 10 11 12, machine learning students free, ChatGPT for students, AI career India',
  },
  {
    path: '/web-development',
    title: 'Free Web Development for Students India | HTML CSS JavaScript | Syllab.in',
    description: 'Learn web development free — HTML, CSS, JavaScript projects for Indian students Class 8 to 12. Build real websites and launch your tech career.',
    keywords: 'web development for students India, free HTML CSS JavaScript Class 10 11 12, website building beginners India, front-end development students free',
  },
  {
    path: '/gk-quiz',
    title: 'GK Quiz — Free General Knowledge MCQs for Indian Students | Syllab.in',
    description: 'Practice 150+ GK quiz questions on Indian history, geography, polity, static GK, current affairs 2025-26, and science. Free daily GK quiz for Class 5-12 students. Same quiz for all users daily.',
    keywords: 'GK questions India free, general knowledge MCQ free India, Indian history MCQ Class 8 9 10, geography questions India, current affairs 2026 India, GK quiz Class 5 6 7 8 9 10, CBSE GK questions free, competitive exam GK preparation, polity questions UPSC SSC, daily GK quiz India, static GK MCQ, Indian constitution MCQ, GK for SSC banking, GK Olympiad questions, NTSE GK preparation, Indian states capitals quiz, ISRO missions GK, awards 2026 India',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Free General Knowledge Quiz for Indian Students',
        description: '150+ GK MCQs on Indian history, geography, polity, current affairs and science — free daily quiz for Class 5-12',
        provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        educationalLevel: 'Class 5 to Class 12',
        teaches: 'Indian History, Geography, Polity, Static GK, Current Affairs, Science GK',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
          { '@type': 'ListItem', position: 2, name: 'General Knowledge', item: 'https://syllab.in/gk-quiz' },
        ],
      },
    ],
  },
  {
    path: '/career-predictor',
    title: 'Free Career Predictor: JEE/NEET Rank & College Predictor, Career Quiz & Exam Dates | Syllab.in',
    description: 'Free career predictor for Indian students — JEE Main & state (EAMCET/KCET/MHT-CET/WBJEE) rank & college predictor, NEET marks-to-rank & MBBS college predictor (all categories), career explorer with salaries, an interest quiz to find your stream, the 2026 exam calendar and scholarships. Indicative estimates from 2024 data.',
    keywords: 'career predictor free India, JEE rank predictor free, JEE Main percentile to rank, JEE college predictor free, NEET rank predictor free, NEET college predictor, MBBS college predictor India, EAMCET rank predictor, KCET college predictor, MHT-CET predictor, WBJEE predictor, career quiz after 10th, which stream after 10th, career options after 12th India, career salary India, 2026 exam dates JEE NEET CUET, scholarships for students India, JoSAA cutoff predictor',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Syllab Career & College Predictor',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        isAccessibleForFree: true,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
          { '@type': 'ListItem', position: 2, name: 'Career & Predictor', item: 'https://syllab.in/career-predictor' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is the Syllab career & college predictor free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the JEE/NEET rank predictor, college predictor, career explorer, interest quiz, exam calendar and scholarships list are 100% free for all Indian students, with no sign-up required.' } },
          { '@type': 'Question', name: 'How accurate is the JEE / NEET rank predictor?', acceptedAnswer: { '@type': 'Answer', text: 'It gives an indicative estimate based on publicly reported 2024 JoSAA/MCC/NTA data. Real cutoffs change every year with exam difficulty, number of applicants and category, so always confirm on the official counselling website before any decision.' } },
          { '@type': 'Question', name: 'Which entrance exams does the predictor cover?', acceptedAnswer: { '@type': 'Answer', text: 'JEE Main, BITSAT, AP & TS EAPCET (EAMCET), KCET, MHT-CET, WBJEE for engineering, plus NEET UG for MBBS/medical colleges. Reservation categories (General, EWS, OBC, SC, ST) are supported.' } },
          { '@type': 'Question', name: 'Can it help me choose a stream after Class 10?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — take the free 6-question interest quiz to get a best-fit stream (Science PCM/PCB, Commerce or Arts), then explore careers with salary ranges, education paths and the exams you would need.' } },
        ],
      },
    ],
  },
  {
    path: '/terms',
    title: 'Terms of Service | Syllab.in',
    description: 'Read the Terms of Service for Syllab.in — India\'s free AI learning platform for Class 1 to 12 students.',
    keywords: 'Syllab terms of service, terms and conditions',
    noindex: true,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Syllab.in',
    description: 'Read the Privacy Policy for Syllab.in. We are committed to protecting student data and your privacy.',
    keywords: 'Syllab privacy policy, data protection, student privacy',
    noindex: true,
  },
];

// Class pages with rich Course JSON-LD
const CLASS_SUBJECTS = {
  1: ['Mathematics', 'EVS', 'English', 'Hindi'],
  2: ['Mathematics', 'EVS', 'English', 'Hindi'],
  3: ['Mathematics', 'EVS', 'English', 'Hindi'],
  4: ['Mathematics', 'EVS', 'English', 'Hindi'],
  5: ['Mathematics', 'EVS', 'English', 'Hindi'],
  6: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
  7: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
  8: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
  9: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  10: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  11: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Accountancy', 'Business Studies'],
  12: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Accountancy', 'Business Studies'],
};

for (let c = 1; c <= 12; c++) {
  const isBoard = c === 10 || c === 12;
  const isJeeNeet = c === 11 || c === 12;
  const subjects = CLASS_SUBJECTS[c].join(', ');
  const examSuffix = isJeeNeet ? ', JEE and NEET foundation' : isBoard ? ' and Board exam preparation' : '';
  const boardKeywords = isBoard ? `, CBSE board exam Class ${c}, NCERT solutions Class ${c}, ${isBoard && c === 10 ? 'board exam preparation Class 10, CBSE Class 10 Maths, CBSE Class 10 Science, board exam tips Class 10' : 'board exam preparation Class 12, JEE NEET preparation Class 12'}` : '';
  const jeeNeetKeywords = isJeeNeet ? `, JEE preparation Class ${c}, NEET preparation Class ${c}, competitive exam Class ${c}` : '';
  ROUTES.push({
    path: `/class-${c}`,
    title: `Class ${c} NCERT Syllabus${isBoard ? ', Board Exam Guide' : ''} | Syllab.in`,
    description: `Class ${c} CBSE NCERT complete study guide covering ${subjects}. Free practice questions, chapter notes${examSuffix} — all free on Syllab.in.`,
    keywords: `Class ${c} NCERT, Class ${c} CBSE, Class ${c} syllabus, free NCERT notes Class ${c}, CBSE chapter-wise notes Class ${c}${boardKeywords}${jeeNeetKeywords}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `Class ${c} CBSE NCERT Full Course`,
      description: `Complete CBSE NCERT curriculum for Class ${c} covering ${subjects}.`,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Syllab.in',
        url: SITE,
      },
      url: `${SITE}/class-${c}`,
      educationalLevel: `Grade ${c}`,
      inLanguage: 'en-IN',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      hasCourseInstance: CLASS_SUBJECTS[c].map(sub => ({
        '@type': 'CourseInstance',
        name: `Class ${c} ${sub}`,
        courseMode: 'online',
      })),
    },
  });
}

// ─── College pages (/colleges, /colleges/:state, /colleges/:state/:slug) ─────
const { states: COLLEGE_STATES_M, colleges: COLLEGES_M } = getCollegesManifest(ROOT);

ROUTES.push({
  path: '/colleges',
  title: 'Top Engineering Colleges in India 2026 — Fees, NIRF Rank, Cutoffs & Admission | Syllab.in',
  description: 'Browse top engineering colleges across India by state — IITs, NITs and the best government & private colleges in Tamil Nadu, Karnataka, Maharashtra, Telangana, Andhra Pradesh, Delhi-NCR & West Bengal. Compare fees, NIRF rank, cutoffs, placements and the full admission process. Free.',
  keywords: 'top engineering colleges India 2026, best engineering colleges by state, engineering college fees, NIRF ranking engineering, college cutoff 2026, engineering admission process, IIT NIT cutoff, college predictor India',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Top Engineering Colleges in India', url: `${SITE}/colleges` },
});

for (const s of COLLEGE_STATES_M) {
  const inState = COLLEGES_M.filter(c => c.stateSlug === s.slug);
  ROUTES.push({
    path: `/colleges/${s.slug}`,
    title: `Top ${inState.length} Engineering Colleges in ${s.name} 2026 — Fees, Cutoff & Ranking | Syllab.in`,
    description: `Best engineering colleges in ${s.name} 2026 — NIRF rank, B.Tech fees, cutoffs, placements and admission process. ${s.blurb}`,
    keywords: `top engineering colleges ${s.name}, best engineering colleges ${s.name} 2026, ${s.name} engineering college fees, engineering admission ${s.name}, college cutoff ${s.name}`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'ItemList', name: `Top Engineering Colleges in ${s.name}`,
      itemListElement: inState.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE}/colleges/${s.slug}/${c.slug}` })),
    },
  });
}

for (const c of COLLEGES_M) {
  ROUTES.push({
    path: `/colleges/${c.stateSlug}/${c.slug}`,
    title: `${c.shortName} — Fees, Cutoff, Placements & Admission 2026 | Syllab.in`,
    description: `${c.name}, ${c.city}: B.Tech fees ${c.feesPerYear}/yr, ${c.cutoff}, average package ${c.placementAvg}. Full admission process, hostel & placements — free guide on Syllab.in.`,
    keywords: `${c.name} fees, ${c.shortName} cutoff 2026, ${c.shortName} placements, ${c.name} admission process, ${c.name} hostel, ${c.city} engineering college`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: c.name,
      url: `${SITE}/colleges/${c.stateSlug}/${c.slug}`,
      address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: c.stateName, addressCountry: 'IN' },
    },
  });
}

// ─── NCERT Solutions: index + per-chapter pages (high-volume "NCERT solutions") ─
ROUTES.push({
  path: '/ncert-solutions',
  title: 'Free NCERT Solutions for Class 6–12 (CBSE) — Chapter-wise Answers | Syllab.in',
  description: 'Free NCERT solutions for CBSE Class 6 to 12 — chapter-wise, step-by-step answers to textbook exercises in Science, Maths, Physics, Chemistry & Biology for Indian students.',
  keywords: 'NCERT solutions free, NCERT solutions Class 10, NCERT solutions Class 9, NCERT solutions Class 12, CBSE NCERT solutions chapter wise, free textbook solutions India',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'NCERT Solutions for Class 6–12', url: `${SITE}/ncert-solutions` },
});
for (const c of getNcertChapters()) {
  ROUTES.push({
    path: `/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`,
    title: `${c.title} — Class ${c.classLevel} ${c.subject} NCERT Solutions (Free) | Syllab.in`,
    description: `Free step-by-step NCERT solutions for Class ${c.classLevel} ${c.subject} chapter "${c.title}" — ${c.count} important questions with detailed answers for CBSE board exam preparation.`,
    keywords: `${c.title} NCERT solutions, Class ${c.classLevel} ${c.subject} NCERT solutions, CBSE ${c.title} questions and answers free`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `${c.title} — Class ${c.classLevel} ${c.subject} NCERT Solutions`,
      url: `${SITE}/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`,
      inLanguage: 'en-IN', isAccessibleForFree: true,
      author: { '@type': 'Organization', name: 'Syllab.in' },
    },
  });
}

// ─── Per-article blog pages (/updates/:slug) — each becomes an indexable page ─
for (const a of getBlogArticles()) {
  const desc = a.summary.length > 165 ? a.summary.slice(0, 162).trim() + '…' : a.summary;
  ROUTES.push({
    path: `/updates/${a.slug}`,
    title: `${a.title} | Syllab.in`,
    description: desc,
    keywords: `${a.title}, Syllab blog, free study guide India, CBSE JEE NEET tips, Indian students`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: desc,
      url: `${SITE}/updates/${a.slug}`,
      image: `${SITE}/og-image.png`,
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      author: { '@type': 'Organization', name: 'Syllab.in' },
      publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/icon.svg` } },
    },
  });
}

// ─── Coding tutorial pages (/coding/:lang and /coding/:lang/:topic) ──────────
// These were flagged "Duplicate without user-selected canonical" because the SPA
// shell served the home canonical. Prerendering each gives a SELF-referencing
// canonical (buildHeadBlock uses SITE+route.path) + unique title → fixes the
// duplicate error and makes them indexable long-tail pages.
function readCodingTopics() {
  try {
    const idx = readFileSync(path.join(ROOT, 'src', 'data', 'tutorials', 'index.ts'), 'utf8');
    const languages = [...new Set([...idx.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/gi)].map(m => m[1]))];
    const fileMap = { 'ai-learning': 'aiLearning.ts', 'data-analytics': 'dataAnalytics.ts', 'app-dev': 'app-dev.ts', 'game-dev': 'game-dev.ts' };
    const topicsByLang = {};
    for (const lang of languages) {
      try {
        const content = readFileSync(path.join(ROOT, 'src', 'data', 'tutorials', fileMap[lang] || `${lang}.ts`), 'utf8');
        topicsByLang[lang] = [...content.matchAll(/^\s*id:\s*['"]([a-z0-9-]+)['"]/gm)].map(m => m[1]);
      } catch { topicsByLang[lang] = []; }
    }
    return { languages, topicsByLang };
  } catch { return { languages: [], topicsByLang: {} }; }
}
const titleCase = (slug) => slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const langLabel = (l) => ({ 'ai-learning': 'AI & ML', 'data-analytics': 'Data Analytics', 'data-mining': 'Data Mining', 'app-dev': 'App Development', 'game-dev': 'Game Development', 'git-github': 'Git & GitHub', 'prompt-engineering': 'Prompt Engineering', 'cloud-computing': 'Cloud Computing', 'cybersecurity': 'Cyber Security', 'ai-agents': 'AI Agents' }[l] || titleCase(l));
const existingCoding = new Set(ROUTES.map(r => r.path));
const { languages: CODE_LANGS, topicsByLang: CODE_TOPICS } = readCodingTopics();
for (const lang of CODE_LANGS) {
  const L = langLabel(lang);
  const langPath = `/coding/${lang}`;
  if (!existingCoding.has(langPath)) {
    ROUTES.push({
      path: langPath,
      title: `Learn ${L} Free — Tutorials & Practice for Students | Syllab.in`,
      description: `Free ${L} tutorials, examples and coding practice for Indian students. Beginner to advanced, with an in-browser editor and AI feedback — no cost.`,
      keywords: `learn ${L} free, ${L} tutorial India, ${L} for students, ${L} coding practice free`,
    });
  }
  for (const topic of (CODE_TOPICS[lang] || [])) {
    ROUTES.push({
      path: `/coding/${lang}/${topic}`,
      title: `${titleCase(topic)} — Free ${L} Tutorial | Syllab.in`,
      description: `Learn ${titleCase(topic)} in ${L} with a free, beginner-friendly tutorial, examples and practice for Indian students on Syllab.in.`,
      keywords: `${titleCase(topic)}, ${L} ${titleCase(topic)}, learn ${L} free, ${L} tutorial`,
    });
  }
}

// ─── HTML injection helpers ──────────────────────────────────────────────────

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHeadBlock(route) {
  const canonical = `${SITE}${route.path}`;
  const robots = route.noindex
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large,max-snippet:-1';

  const lines = [
    `  <title>${esc(route.title)}</title>`,
    `  <meta name="description" content="${esc(route.description)}" />`,
    `  <meta name="keywords" content="${esc(route.keywords || '')}" />`,
    `  <meta name="robots" content="${robots}" />`,
    `  <meta name="googlebot" content="${robots}" />`,
    `  <link rel="canonical" href="${canonical}" />`,
    `  <meta property="og:title" content="${esc(route.title)}" />`,
    `  <meta property="og:description" content="${esc(route.description)}" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="Syllab.in" />`,
    `  <meta property="og:locale" content="en_IN" />`,
    `  <meta property="og:image" content="${SITE}/og-image.png" />`,
    `  <meta property="og:image:width" content="1200" />`,
    `  <meta property="og:image:height" content="630" />`,
    `  <meta property="og:image:type" content="image/png" />`,
    `  <meta property="og:image:alt" content="${esc(route.title)}" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:site" content="@syllabdotin" />`,
    `  <meta name="twitter:title" content="${esc(route.title)}" />`,
    `  <meta name="twitter:description" content="${esc(route.description)}" />`,
    `  <meta name="twitter:image" content="${SITE}/og-image.png" />`,
    `  <meta name="twitter:image:alt" content="${esc(route.title)}" />`,
  ];

  if (route.jsonLd) {
    lines.push(
      `  <script type="application/ld+json">`,
      `  ${JSON.stringify(route.jsonLd, null, 2).split('\n').join('\n  ')}`,
      `  </script>`,
    );
  }

  // Auto BreadcrumbList (Home → this page) for every non-home route, unless the
  // route already declares its own breadcrumb. Gives Google breadcrumb rich
  // results across the whole site (class pages, coding, colleges, etc.) from one
  // place — no per-route editing.
  const hasBreadcrumb = JSON.stringify(route.jsonLd || '').includes('BreadcrumbList');
  if (route.path !== '/' && !hasBreadcrumb) {
    const pageName = String(route.title).split('|')[0].split('—')[0].trim() || 'Page';
    const crumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: pageName, item: canonical },
      ],
    };
    lines.push(
      `  <script type="application/ld+json">`,
      `  ${JSON.stringify(crumb, null, 2).split('\n').join('\n  ')}`,
      `  </script>`,
    );
  }

  return lines.join('\n');
}

/**
 * Replace the per-page meta block inside the <head> of dist/index.html.
 * We look for the existing <title>...</title> and meta tags that come after
 * <meta charset> and <meta viewport>, then replace them with per-route data.
 */
function injectMeta(baseHtml, route) {
  const headBlock = buildHeadBlock(route);

  // Replace from <title> through </title> and all following meta/link tags
  // until we hit the first <link rel="preconnect"> (we keep preconnect onwards).
  // Strategy: replace the entire block between <meta name="theme-color"> and
  // <!-- Preconnect to critical origins --> with our per-page block.
  return baseHtml.replace(
    /(<meta name="theme-color"[^>]*\/>)\s*([\s\S]*?)(<!-- Preconnect to critical origins -->)/,
    `$1\n\n${headBlock}\n\n  $3`,
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const baseHtmlPath = path.join(DIST, 'index.html');
  let baseHtml;
  try {
    baseHtml = await fs.readFile(baseHtmlPath, 'utf8');
  } catch {
    console.error('❌ dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  let written = 0;
  let skipped = 0;

  for (const route of ROUTES) {
    // Convert "/some-path" → "dist/some-path/index.html"
    const routeDir = path.join(DIST, ...route.path.split('/').filter(Boolean));
    const outFile = path.join(routeDir, 'index.html');

    try {
      const injected = injectMeta(baseHtml, route);
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(outFile, injected, 'utf8');
      written++;
    } catch (err) {
      console.warn(`⚠️  Skipped ${route.path}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`✅ Pre-render complete: ${written} routes written, ${skipped} skipped.`);
  console.log(`   Routes: ${ROUTES.map(r => r.path).join(', ')}`);
}

main().catch(err => {
  console.error('❌ Pre-render failed:', err);
  process.exit(1);
});
