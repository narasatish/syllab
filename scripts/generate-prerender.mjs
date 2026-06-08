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
        // NO aggregateRating — fabricated review counts violate Google's
        // structured-data policy (manual-penalty risk). Add only with real data.
      },
      {
        '@context': 'https://schema.org', '@type': 'EducationalOrganization',
        name: 'Syllab.in', url: SITE,
        description: 'Free AI education platform for Indian students Class 1-12',
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
const today = new Date().toISOString().split('T')[0];
ROUTES.push({
  path: '/ncert-solutions',
  title: 'Free NCERT Solutions for Class 6–12 (CBSE) — Chapter-wise Answers | Syllab.in',
  description: 'Free NCERT solutions for CBSE Class 6 to 12 — chapter-wise, step-by-step answers to textbook exercises in Science, Maths, Physics, Chemistry & Biology for Indian students.',
  keywords: 'NCERT solutions free, NCERT solutions Class 10, NCERT solutions Class 9, NCERT solutions Class 12, CBSE NCERT solutions chapter wise, free textbook solutions India',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'NCERT Solutions for Class 6–12', url: `${SITE}/ncert-solutions` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are NCERT solutions free on Syllab?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All NCERT solutions on Syllab are completely free for Class 6 to 12 — chapter-wise, step-by-step answers with no subscription.' } },
      { '@type': 'Question', name: 'Which classes and subjects are covered?', acceptedAnswer: { '@type': 'Answer', text: 'Syllab covers NCERT solutions for Class 6–12 in Science, Mathematics, Physics, Chemistry, Biology and Social Science, aligned to the CBSE/NCERT syllabus.' } },
      { '@type': 'Question', name: 'Are these solutions aligned to the CBSE board exam?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the solutions follow the NCERT textbook exercises used by CBSE and most state boards, so they map directly to board exam preparation.' } },
    ] },
  ],
});
for (const c of getNcertChapters()) {
  const today = new Date().toISOString().split('T')[0];
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
      author: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
      publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
      datePublished: today,
      dateModified: today,
    },
  });
}

// ─── Live Quiz landing (the game itself is dynamic/private) ───────────────────
ROUTES.push({
  path: '/live-quiz',
  title: 'Live Quiz — Free Multiplayer Classroom Quiz Game (Kahoot-style) | Syllab.in',
  description: 'Host a free live multiplayer quiz for your class — students join with a PIN and compete on a real-time leaderboard. Free GK, Science, Maths, Reasoning & English quiz games for Indian students.',
  keywords: 'live quiz game free, multiplayer classroom quiz, kahoot alternative India, online quiz competition for students, live quiz with PIN, school quiz game free',
  jsonLd: [
    {
      '@context': 'https://schema.org', '@type': 'WebApplication',
      name: 'Syllab Live Quiz', applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web', url: `${SITE}/live-quiz`, inLanguage: 'en-IN',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the live quiz game free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Syllab Live Quiz is completely free with no player limit and no paid tiers.' } },
      { '@type': 'Question', name: 'How many students can join a live quiz?', acceptedAnswer: { '@type': 'Answer', text: 'There is no limit — any number of students can join a game using the 6-digit PIN from their phone or computer browser.' } },
      { '@type': 'Question', name: 'Do students need an app or account to join?', acceptedAnswer: { '@type': 'Answer', text: 'No. Students just open the live quiz page in any browser and enter the PIN — no app to install and no account needed to join.' } },
    ] },
  ],
});

// ─── Free-alternatives pages (high-intent "alternative to X" SEO) ─────────────
ROUTES.push({
  path: '/free-alternatives',
  title: "Free Alternatives to BYJU'S, Unacademy, Kahoot & Vedantu (2026) | Syllab.in",
  description: "Looking for a free alternative to BYJU'S, Unacademy, Vedantu, Toppr or Kahoot? Syllab gives Indian students free NCERT solutions, mock tests, an AI tutor and live quizzes for Class 1–12 — no subscription.",
  keywords: 'free alternative to byjus, unacademy free alternative, kahoot alternative India, vedantu free alternative, toppr alternative, free learning app India',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Alternatives to Top Learning Apps', url: `${SITE}/free-alternatives` },
});
for (const a of [
  { slug: 'kahoot-alternative', brand: 'Kahoot!' },
  { slug: 'byjus-alternative', brand: "BYJU'S" },
  { slug: 'unacademy-alternative', brand: 'Unacademy' },
  { slug: 'vedantu-alternative', brand: 'Vedantu' },
  { slug: 'toppr-alternative', brand: 'Toppr' },
]) {
  ROUTES.push({
    path: `/${a.slug}`,
    title: `Free Alternative to ${a.brand} — Syllab.in (2026)`,
    description: `Looking for a free alternative to ${a.brand}? Syllab gives Indian students free NCERT solutions, mock tests, an AI tutor and live quizzes for Class 1–12 — no subscription needed.`,
    keywords: `free alternative to ${a.brand}, ${a.brand} free alternative, ${a.brand} vs Syllab, free learning app like ${a.brand}`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: `Free Alternative to ${a.brand}`, url: `${SITE}/${a.slug}`, inLanguage: 'en-IN', isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: SITE } },
  });
}

// ─── Kids / Pre-school (Pre-KG → Class 3) — high-volume early-learning SEO ─────
ROUTES.push({
  path: '/kids',
  title: 'Syllab Junior — Free Pre-KG, LKG & UKG Learning, Rhymes & Coloring | Syllab.in',
  description: 'Free playful learning for Indian kids (Pre-KG to Class 3): alphabet & phonics, numbers, shapes & colors, nursery rhymes and printable coloring pages — fun, safe and free.',
  keywords: 'free kids learning India, Pre-KG LKG UKG activities, nursery rhymes for kids, free kids coloring pages, phonics for kindergarten, preschool worksheets free',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Syllab Junior — Kids Learning', url: `${SITE}/kids`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const k of [
  { slug: 'alphabet', name: 'Alphabet & Phonics', kw: 'learn alphabet, phonics for kids, abcd for kids free' },
  { slug: 'numbers', name: 'Numbers & Counting', kw: 'numbers for kids, counting 1 to 20, maths for LKG' },
  { slug: 'shapes', name: 'Shapes & Colors', kw: 'shapes and colors for kids, learn colours, basic shapes' },
  { slug: 'rhymes', name: 'Nursery Rhymes', kw: 'nursery rhymes lyrics, kids rhymes free, twinkle twinkle' },
  { slug: 'coloring', name: 'Coloring Pages', kw: 'free coloring pages for kids, printable colouring, kids drawing' },
]) {
  ROUTES.push({
    path: `/kids/${k.slug}`,
    title: `${k.name} for Kids — Free & Printable | Syllab Junior`,
    description: `Free ${k.name.toLowerCase()} for Pre-KG, LKG, UKG and early-primary kids — playful, mobile-friendly and free on Syllab Junior.`,
    keywords: k.kw,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${k.name} for Kids`, url: `${SITE}/kids/${k.slug}`, inLanguage: 'en-IN', isAccessibleForFree: true, educationalLevel: 'Preschool' },
  });
}

// ─── Microlearning: index + bite-sized module pages ──────────────────────────
ROUTES.push({
  path: '/micro',
  title: 'Microlearning — Free 5-Minute Revision Modules for Class 6–12 | Syllab.in',
  description: 'Learn any concept in 5 minutes — free bite-sized modules with a quick explanation, worked example and instant quiz. Mobile-friendly, low-data revision for Indian students.',
  keywords: 'microlearning India, 5 minute revision, quick revision Class 10, bite sized learning, learn fast, short lessons students free',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Microlearning — 5-Minute Modules', url: `${SITE}/micro`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const m of ['quadratic-formula','newtons-first-law','trigonometry-ratios','photosynthesis','periodic-table-trends','probability-basics','linear-equations','surface-area-volume','acids-bases','fractions-decimals','imperialism-colonialism','plate-tectonics','english-tenses','photosynthesis-respiration','mean-median-mode']) {
  const mname = m.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  ROUTES.push({
    path: `/micro/${m}`,
    title: `${mname} in 5 Minutes — Free Quick Revision | Syllab.in`,
    description: `Learn ${mname} in about 5 minutes — a free bite-sized module with a clear explanation, a worked example and a quick quiz for Indian students.`,
    keywords: `${mname} in 5 minutes, ${mname} quick revision, learn ${mname} fast`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${mname} — 5-Minute Module`, url: `${SITE}/micro/${m}`, inLanguage: 'en-IN', isAccessibleForFree: true, learningResourceType: 'Microlearning module' },
  });
}

// ─── Photo Doubt-Solver (snap a problem → instant AI solution) ────────────────
ROUTES.push({
  path: '/doubt-solver',
  title: 'Photo Doubt Solver — Snap & Solve Any Homework Question Free | Syllab.in',
  description: 'Stuck on a question? Take a photo and get an instant, free, step-by-step solution. Free AI math & science homework solver for Indian students (Class 1–12) — no signup, no waiting for a video.',
  keywords: 'photo question solver free, math problem solver photo, homework scanner free India, scan and solve maths, doubt solver free, snap and solve question, AI homework helper India, free Doubtnut alternative',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Photo Doubt Solver', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/doubt-solver`, inLanguage: 'en-IN', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the photo doubt solver free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — snap or upload a photo of any homework question and get a free step-by-step solution instantly. No subscription, no signup.' } },
      { '@type': 'Question', name: 'What subjects does it solve?', acceptedAnswer: { '@type': 'Answer', text: 'It solves Maths, Physics, Chemistry and other academic problems for Class 1–12, including CBSE/NCERT questions, with clean step-by-step working.' } },
      { '@type': 'Question', name: 'Do I need to wait for a video?', acceptedAnswer: { '@type': 'Answer', text: 'No. Unlike video-based apps, Syllab returns a written step-by-step solution instantly using AI.' } },
    ] },
  ],
});

// ─── Per-article blog pages (/updates/:slug) — each becomes an indexable page ─
for (const a of getBlogArticles()) {
  const desc = a.summary.length > 165 ? a.summary.slice(0, 162).trim() + '…' : a.summary;
  const today = new Date().toISOString().split('T')[0];
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
      author: { '@type': 'Organization', name: 'Syllab.in', url: SITE },
      publisher: { '@type': 'Organization', name: 'Syllab.in', logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
      datePublished: today,
      dateModified: today,
    },
  });
}

// ─── Coding tutorial pages (/coding/:lang and /coding/:lang/:topic) ──────────
// These were flagged "Duplicate without user-selected canonical" because the SPA
// shell served the home canonical. Prerendering each gives a SELF-referencing
// canonical (buildHeadBlock uses SITE+route.path) + unique title → fixes the
// duplicate error and makes them indexable long-tail pages.
//
// NEW: Extract rich topic content (title, theory, syntax) per topic so each
// page's body is genuinely unique (~30–40% unique text, not 71% duplicate).

/**
 * Parse a TS file of TutorialTopic objects to extract their content.
 * Returns: { topicId: { title, theoryText, syntaxText }, ... }
 */
function extractTopicContent(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const topics = {};

    // Find all topic objects: match from id: 'xxx' to the closing }
    // Simple regex approach: look for patterns like:
    // { id: 'ai-intro', category: ..., title: 'XXX', theory: [...]
    const topicMatches = [...content.matchAll(
      /\{\s*id:\s*['"]([a-z0-9-]+)['"][^}]*?title:\s*['"]([^'"]*)['"]/gm
    )];

    for (const match of topicMatches) {
      const topicId = match[1];
      const title = match[2];
      topics[topicId] = { title, theoryText: '', syntaxText: '' };
    }

    // For each topic, extract first theory paragraph (most substantial)
    const theoryPattern = /id:\s*['"]([a-z0-9-]+)['"][^}]*?theory:\s*\[\s*`([^`]{200,600})/gm;
    for (const match of content.matchAll(theoryPattern)) {
      const topicId = match[1];
      if (topics[topicId]) {
        topics[topicId].theoryText = match[2];
      }
    }

    // Extract syntax if present
    const syntaxPattern = /id:\s*['"]([a-z0-9-]+)['"][^}]*?syntax:\s*`([^`]{50,300})/gm;
    for (const match of content.matchAll(syntaxPattern)) {
      const topicId = match[1];
      if (topics[topicId]) {
        topics[topicId].syntaxText = match[2];
      }
    }

    return topics;
  } catch (e) {
    console.warn(`⚠️  Failed to extract topics from ${filePath}: ${e.message}`);
    return {};
  }
}

function readCodingTopics() {
  try {
    const idx = readFileSync(path.join(ROOT, 'src', 'data', 'tutorials', 'index.ts'), 'utf8');
    const languages = [...new Set([...idx.matchAll(/id:\s*['"]([a-z0-9-]+)['"]/gi)].map(m => m[1]))];
    const fileMap = { 'ai-learning': 'aiLearning.ts', 'data-analytics': 'dataAnalytics.ts', 'app-dev': 'app-dev.ts', 'game-dev': 'game-dev.ts' };
    const topicsByLang = {};
    const contentByLang = {};

    for (const lang of languages) {
      try {
        const filePath = path.join(ROOT, 'src', 'data', 'tutorials', fileMap[lang] || `${lang}.ts`);
        const content = readFileSync(filePath, 'utf8');
        topicsByLang[lang] = [...content.matchAll(/^\s*id:\s*['"]([a-z0-9-]+)['"]/gm)].map(m => m[1]);
        // Also extract rich content for each topic
        contentByLang[lang] = extractTopicContent(filePath);
      } catch {
        topicsByLang[lang] = [];
        contentByLang[lang] = {};
      }
    }
    return { languages, topicsByLang, contentByLang };
  } catch { return { languages: [], topicsByLang: {}, contentByLang: {} }; }
}
const titleCase = (slug) => slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const langLabel = (l) => ({ 'ai-learning': 'AI & ML', 'data-analytics': 'Data Analytics', 'data-mining': 'Data Mining', 'app-dev': 'App Development', 'game-dev': 'Game Development', 'git-github': 'Git & GitHub', 'prompt-engineering': 'Prompt Engineering', 'cloud-computing': 'Cloud Computing', 'cybersecurity': 'Cyber Security', 'ai-agents': 'AI Agents' }[l] || titleCase(l));
const existingCoding = new Set(ROUTES.map(r => r.path));
const { languages: CODE_LANGS, topicsByLang: CODE_TOPICS, contentByLang: CODE_CONTENT } = readCodingTopics();
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
      topicContent: CODE_CONTENT[lang] && CODE_CONTENT[lang][topic],
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

// Load NCERT solutions data once (for per-chapter rich content)
let ncertDataCache = null;
function getNcertData() {
  if (!ncertDataCache) {
    try {
      const data = readFileSync(path.join(ROOT, 'public', 'data', 'ncert-solutions.json'), 'utf8');
      ncertDataCache = JSON.parse(data);
    } catch (e) {
      ncertDataCache = {};
    }
  }
  return ncertDataCache;
}

/**
 * Build unique, crawler-visible HTML body content for prerendered pages.
 * Injected into <div id="root">...content...</div> so crawlers see semantic HTML
 * without JavaScript. React's createRoot().render() will replace this on mount.
 */
function buildBodyContent(route) {
  // Common components for all routes
  const stripTitle = (t) => t.replace(/\s*[\|—]\s*Syllab\.in.*$/i, '').trim();
  const title = stripTitle(route.title);
  const desc = route.description;

  // E-E-A-T: publication and freshness dates
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const formattedDate = new Date(today).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Breadcrumb nav
  const pathParts = route.path.split('/').filter(Boolean);
  const breadcrumb = `
    <nav style="margin-bottom: 2rem; font-size: 0.95rem;">
      <a href="/" style="color: #0066cc; text-decoration: none;">Home</a>
      ${pathParts.map((p, i) => {
        const url = '/' + pathParts.slice(0, i + 1).join('/');
        const label = p.replace(/^class-/, 'Class ').replace(/-/g, ' ');
        return ` › <a href="${esc(url)}" style="color: #0066cc; text-decoration: none;">${esc(label)}</a>`;
      }).join('')}
    </nav>
  `;

  // E-E-A-T: TL;DR summary + byline with date (visible author + freshness signals)
  const tldrBlock = `
    <div style="margin: 1.5rem 0; padding: 1rem; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
      <p style="margin: 0; font-weight: 600; color: #2e7d32; font-size: 0.95rem;"><strong>TL;DR:</strong> ${esc(desc.length > 150 ? desc.slice(0, 150).trim() + '…' : desc)}</p>
    </div>
    <p style="margin: 1rem 0; font-size: 0.85rem; color: #666;">By <strong>Syllab.in</strong> · Updated <time datetime="${today}">${formattedDate}</time></p>
  `;

  // Quick nav to main sections (helps crawl internal structure)
  const mainNav = `
    <nav style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #ddd;">
      <p style="font-weight: 600; margin-bottom: 0.5rem;">Explore:</p>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.9rem;">
        <li><a href="/syllabus" style="color: #0066cc; text-decoration: none;">Syllabus</a></li>
        <li><a href="/practice" style="color: #0066cc; text-decoration: none;">Practice</a></li>
        <li><a href="/mock-tests" style="color: #0066cc; text-decoration: none;">Mock Tests</a></li>
        <li><a href="/ncert-solutions" style="color: #0066cc; text-decoration: none;">NCERT Solutions</a></li>
        <li><a href="/coding" style="color: #0066cc; text-decoration: none;">Coding</a></li>
        <li><a href="/gk-quiz" style="color: #0066cc; text-decoration: none;">GK Quiz</a></li>
        <li><a href="/career-predictor" style="color: #0066cc; text-decoration: none;">Career Predictor</a></li>
        <li><a href="/ai-tutor" style="color: #0066cc; text-decoration: none;">AI Tutor</a></li>
      </ul>
    </nav>
  `;

  // Route-specific rich content
  let richContent = '';

  // NCERT chapter pages — render actual Q&A for high SEO value + numbered list + table
  const ncertMatch = route.path.match(/^\/ncert-solutions\/class-(\d+)\/([a-z-]+)\/([a-z-]+)$/);
  if (ncertMatch) {
    const [, classLevel, subjSlug, chapSlug] = ncertMatch;
    const ncertKey = `${classLevel}::${slugToSubject(subjSlug)}::${chapSlug}`;
    const ncertData = getNcertData();
    const qas = ncertData[ncertKey] || [];

    if (qas.length > 0) {
      const displayLimit = Math.min(3, qas.length); // Show first 3 Q&A for brevity
      richContent = `<div style="margin-top: 1.5rem;">`;

      // Numbered list of key concepts/questions
      richContent += `
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Key Questions Covered:</h2>
          <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8;">
      `;
      for (let i = 0; i < displayLimit; i++) {
        const qa = qas[i];
        richContent += `<li style="margin-bottom: 0.5rem;">${esc(qa.q.length > 80 ? qa.q.slice(0, 77) + '…' : qa.q)}</li>`;
      }
      if (qas.length > displayLimit) {
        richContent += `<li style="margin-top: 0.5rem; color: #999; font-size: 0.9rem;">+ ${qas.length - displayLimit} more questions in the full chapter</li>`;
      }
      richContent += `</ol></div>`;

      // Table summary
      richContent += `
        <div style="margin-bottom: 2rem; overflow-x: auto;">
          <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Solutions Summary:</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd;">
            <thead style="background: #f5f5f5;">
              <tr>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Question</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600;">Status</th>
              </tr>
            </thead>
            <tbody>
      `;
      for (let i = 0; i < displayLimit; i++) {
        const qa = qas[i];
        richContent += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;">${esc(qa.q.length > 60 ? qa.q.slice(0, 57) + '…' : qa.q)}</td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Solved</span></td>
              </tr>
        `;
      }
      richContent += `
            </tbody>
          </table>
          <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">Showing ${displayLimit} of ${qas.length} questions</p>
        </div>
      `;

      // Q&A details
      for (let i = 0; i < displayLimit; i++) {
        const qa = qas[i];
        richContent += `
          <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f9f9f9; border-left: 3px solid #0066cc;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.05rem; color: #333;">Q${i + 1}: ${esc(qa.q)}</h3>
            <div style="font-size: 0.95rem; color: #555; line-height: 1.5;">
              ${esc(qa.solution).slice(0, 300)}${qa.solution.length > 300 ? '...' : ''}
            </div>
          </div>
        `;
      }
      richContent += `<p style="color: #666; font-size: 0.9rem; font-style: italic;">Showing ${displayLimit} of ${qas.length} questions. Visit the full page for complete solutions.</p></div>`;
    }
  }

  // Coding tutorial pages (individual topic) — show rich topic content + numbered list + table
  else if (route.path.match(/^\/coding\/[a-z-]+\/[a-z0-9-]+$/)) {
    const [, lang, topic] = route.path.match(/^\/coding\/([a-z-]+)\/([a-z0-9-]+)$/);
    const topicContent = route.topicContent;
    if (topicContent && topicContent.theoryText) {
      // Rich, unique content: topic's theory paragraph + syntax if available + numbered list + table
      richContent = `
        <div style="margin-top: 1.5rem;">
          <div style="padding: 1rem; background: #f9f9f9; border-left: 3px solid #667eea; margin-bottom: 1.5rem;">
            <h2 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: #333;">Overview:</h2>
            <p style="margin: 0; font-size: 0.95rem; color: #555; line-height: 1.6;">
              ${esc(topicContent.theoryText.slice(0, 400))}${topicContent.theoryText.length > 400 ? '...' : ''}
            </p>
          </div>

          <!-- Numbered list of learning steps -->
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1rem; margin-bottom: 0.75rem; color: #333;">Learning Path:</h3>
            <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8; font-size: 0.95rem;">
              <li style="margin-bottom: 0.5rem;"><strong>Understand the fundamentals</strong> — Learn core concepts and terminology</li>
              <li style="margin-bottom: 0.5rem;"><strong>Study syntax and structure</strong> — Master the language-specific patterns</li>
              <li style="margin-bottom: 0.5rem;"><strong>Practice with examples</strong> — Apply concepts through hands-on exercises</li>
              <li style="margin-bottom: 0.5rem;"><strong>Build projects</strong> — Combine skills to create real applications</li>
            </ol>
          </div>

          <!-- Key concepts comparison table -->
          <div style="margin-bottom: 2rem; overflow-x: auto;">
            <h3 style="font-size: 1rem; margin-bottom: 0.75rem; color: #333;">Key Concepts:</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd;">
              <thead style="background: #f5f5f5;">
                <tr>
                  <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #667eea; font-weight: 600; width: 40%;">Concept</th>
                  <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #667eea; font-weight: 600;">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem;"><strong>${esc(titleCase(topic))}</strong></td>
                  <td style="padding: 0.75rem; color: #666; font-size: 0.9rem;">Essential programming concept for ${esc(langLabel(lang))}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem;"><strong>Use Case</strong></td>
                  <td style="padding: 0.75rem; color: #666; font-size: 0.9rem;">Practical applications and real-world scenarios</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem;"><strong>Difficulty</strong></td>
                  <td style="padding: 0.75rem; color: #666; font-size: 0.9rem;">Beginner-friendly with step-by-step guidance</td>
                </tr>
              </tbody>
            </table>
          </div>

          ${topicContent.syntaxText ? `
            <div style="padding: 1rem; background: #f5f5f5; border-left: 3px solid #4caf50; margin-bottom: 1.5rem;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; color: #333;">Syntax Reference:</h3>
              <pre style="margin: 0; font-size: 0.85rem; color: #555; white-space: pre-wrap; font-family: 'Courier New', monospace;">
${esc(topicContent.syntaxText)}
              </pre>
            </div>
          ` : ''}
          <p style="font-size: 0.9rem; color: #666; font-style: italic; margin-top: 1rem;">
            Explore the interactive tutorial above to learn ${titleCase(topic)} step-by-step with practice exercises.
          </p>
        </div>
      `;
    }
  }

  // Coding language landing pages — show list of available topics (but keep small)
  else if (route.path.match(/^\/coding\/[a-z-]+$/)) {
    const lang = route.path.split('/')[2];
    const topics = CODE_TOPICS[lang] || [];
    if (topics.length > 0) {
      // Smaller topics list to reduce duplication. Keep only first 5 to reduce bulk.
      richContent = `
        <div style="margin-top: 1.5rem;">
          <h2 style="font-size: 1.2rem; margin-bottom: 1rem;">Popular Topics:</h2>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.9rem;">
            ${topics.slice(0, 5).map(t => `
              <li style="padding: 0.5rem 0;">
                <a href="/coding/${lang}/${t}" style="color: #0066cc; text-decoration: none;">→ ${esc(titleCase(t))}</a>
              </li>
            `).join('')}
            ${topics.length > 5 ? `<li style="padding: 0.5rem 0; color: #999; font-size: 0.85rem;">+ ${topics.length - 5} more topics in the interactive editor</li>` : ''}
          </ul>
        </div>
      `;
    }
  }

  // College pages — render details
  else if (route.path.match(/^\/colleges\/([a-z-]+)\/([a-z-]+)$/)) {
    const [, stateSlug, collegeSlug] = route.path.match(/^\/colleges\/([a-z-]+)\/([a-z-]+)$/);
    const college = COLLEGES_M.find(c => c.stateSlug === stateSlug && c.slug === collegeSlug);
    if (college) {
      richContent = `
        <div style="margin-top: 1.5rem; padding: 1rem; background: #f0f8ff; border-radius: 8px;">
          <h2 style="font-size: 1.1rem; margin: 0 0 0.5rem 0;">Key Details:</h2>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem;">
            <li style="margin: 0.3rem 0;"><strong>Location:</strong> ${esc(college.city)}, ${esc(college.stateName)}</li>
            <li style="margin: 0.3rem 0;"><strong>Fees:</strong> ${esc(college.feesPerYear)} per year</li>
            <li style="margin: 0.3rem 0;"><strong>Cutoff:</strong> ${esc(college.cutoff)}</li>
            <li style="margin: 0.3rem 0;"><strong>Avg. Package:</strong> ${esc(college.placementAvg)}</li>
          </ul>
        </div>
      `;
    }
  }

  // Blog article pages — show summary
  else if (route.path.match(/^\/updates\/[a-z0-9-]+$/)) {
    const slug = route.path.split('/')[2];
    const article = (getBlogArticles() || []).find(a => a.slug === slug);
    if (article) {
      richContent = `
        <div style="margin-top: 1.5rem; padding: 1rem; background: #fffef0; border-left: 4px solid #ff9800;">
          <p style="font-size: 0.95rem; line-height: 1.6; color: #555;">
            ${esc(article.summary)}
          </p>
        </div>
      `;
    }
  }

  // Mock tests page — show numbered list of exam types + table of exams covered
  else if (route.path === '/mock-tests') {
    richContent = `
      <div style="margin-top: 2rem;">
        <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Exam Types Available:</h2>
        <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8; font-size: 0.95rem;">
          <li style="margin-bottom: 0.5rem;"><strong>Engineering Entrance Exams</strong> — JEE Main, BITSAT, EAMCET, WBJEE, and state exams</li>
          <li style="margin-bottom: 0.5rem;"><strong>Medical Entrance Exams</strong> — NEET UG with multiple mock tests and analysis</li>
          <li style="margin-bottom: 0.5rem;"><strong>Olympiad Exams</strong> — Math and Science Olympiad practice papers</li>
          <li style="margin-bottom: 0.5rem;"><strong>Board Exams</strong> — Class 10 and Class 12 sample papers and practice tests</li>
        </ol>

        <h2 style="font-size: 1.1rem; margin: 2rem 0 0.75rem 0; color: #333;">Exam Coverage:</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd; margin-bottom: 1rem;">
            <thead style="background: #f5f5f5;">
              <tr>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Exam</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600;">Mocks Available</th>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Level</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>JEE Main</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">10+</td>
                <td style="padding: 0.75rem;">Advanced</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>NEET UG</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">10+</td>
                <td style="padding: 0.75rem;">Advanced</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>EAMCET / KCET / MHT-CET</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">5+</td>
                <td style="padding: 0.75rem;">Intermediate</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Math & Science Olympiad</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">8+</td>
                <td style="padding: 0.75rem;">All levels</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;"><strong>CBSE Board Exams</strong></td>
                <td style="padding: 0.75rem; text-align: center; color: #0066cc;">Unlimited</td>
                <td style="padding: 0.75rem;">Class 10 & 12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="color: #666; font-size: 0.9rem; font-style: italic;">All mock tests include detailed solutions and performance analytics to track your progress.</p>
      </div>
    `;
  }

  // Free alternatives page — show comparison table + list
  else if (route.path === '/free-alternatives') {
    richContent = `
      <div style="margin-top: 2rem;">
        <h2 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #333;">Free Features of Syllab:</h2>
        <ol style="margin: 0; padding-left: 1.5rem; color: #555; line-height: 1.8; font-size: 0.95rem;">
          <li style="margin-bottom: 0.5rem;"><strong>NCERT Solutions</strong> — Free chapter-wise answers for Class 6–12 with detailed explanations</li>
          <li style="margin-bottom: 0.5rem;"><strong>Mock Tests</strong> — 200+ full-length mock tests for JEE, NEET, EAMCET, and board exams</li>
          <li style="margin-bottom: 0.5rem;"><strong>AI Tutor</strong> — 24/7 homework helper with scan-and-solve and concept notes generation</li>
          <li style="margin-bottom: 0.5rem;"><strong>Coding Courses</strong> — Python, JavaScript, AI, Data Science and more — all completely free</li>
          <li style="margin-bottom: 0.5rem;"><strong>Live Quiz Games</strong> — Kahoot-style multiplayer quizzes with real-time leaderboards</li>
        </ol>

        <h2 style="font-size: 1.1rem; margin: 2rem 0 0.75rem 0; color: #333;">App Comparison:</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; background: white; border: 1px solid #ddd; margin-bottom: 1rem;">
            <thead style="background: #f5f5f5;">
              <tr>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #0066cc; font-weight: 600;">Feature</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600; color: #4caf50;">Syllab</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #0066cc; font-weight: 600;">Premium Apps</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Cost</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">100% Free</span></td>
                <td style="padding: 0.75rem; text-align: center;">Subscriptions ₹299–999/mo</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Mock Tests</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Unlimited</span></td>
                <td style="padding: 0.75rem; text-align: center;">Limited to premium</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>AI Doubt Solver</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Yes</span></td>
                <td style="padding: 0.75rem; text-align: center;">Paid add-ons</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.75rem;"><strong>Coding Courses</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">✓ Included</span></td>
                <td style="padding: 0.75rem; text-align: center;">Not available</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;"><strong>Sign-up Required</strong></td>
                <td style="padding: 0.75rem; text-align: center;"><span style="color: #4caf50; font-weight: 600;">No</span></td>
                <td style="padding: 0.75rem; text-align: center;">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Homepage — brief overview
  else if (route.path === '/') {
    richContent = `
      <div style="margin-top: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
        <h2 style="margin: 0 0 0.5rem 0;">Free AI Learning for Indian Students</h2>
        <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
          Access NCERT solutions, mock tests, AI tutoring, coding courses, and career planning — all completely free for Class 1–12. No subscriptions, no ads.
        </p>
      </div>
    `;
  }

  return `
    <article style="max-width: 800px; margin: 0 auto; padding: 1rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6;">
      ${breadcrumb}
      <h1 style="font-size: 1.8rem; margin: 0.5rem 0 1rem 0; color: #222;">${esc(title)}</h1>
      <p style="font-size: 1rem; margin: 0 0 1.5rem 0; color: #666;">${esc(desc)}</p>
      ${tldrBlock}
      ${richContent}
      ${mainNav}
      <footer style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #ddd; font-size: 0.85rem; color: #999;">
        <p style="margin: 0;">Syllab.in — Free learning for Indian students, Class 1–12</p>
      </footer>
    </article>
  `;
}

// Helper: convert slug to NCERT subject name for data key lookup
function slugToSubject(slug) {
  const map = {
    'mathematics': 'Mathematics',
    'science': 'Science',
    'social-science': 'Social Science',
    'english': 'English',
    'hindi': 'Hindi',
    'sanskrit': 'Sanskrit',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'biology': 'Biology',
    'accountancy': 'Accountancy',
    'business-studies': 'Business Studies',
    'evs': 'EVS',
  };
  return map[slug] || slug;
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
    `  <link rel="alternate" type="application/rss+xml" title="Syllab.in Blog — Free Exam Prep & Study Updates" href="${SITE}/feed.xml" />`,
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
 * Replace the per-page meta block inside the <head> of dist/index.html
 * AND inject unique body content into <div id="root">.
 *
 * Crawlers now see:
 * - Unique <title>, description, canonical in <head> ✓
 * - Unique, semantic HTML content in <body id="root"> ✓
 * - React still safely mounts on client (createRoot clears #root and rerenders) ✓
 */
function injectMeta(baseHtml, route) {
  const headBlock = buildHeadBlock(route);
  const bodyContent = buildBodyContent(route);

  // Strip any pre-existing <title> in the template so we never emit two <title>
  // tags (the default index.html title was surviving outside the replaced block,
  // producing duplicate titles on every prerendered page — bad for SEO).
  baseHtml = baseHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');

  // The base index.html injects a GENERIC site-wide FAQPage on every page — that
  // is an anti-pattern (irrelevant FAQ on every URL, and a duplicate on pages
  // that declare their own FAQ). Keep the generic FAQ only on the home page;
  // every other page carries only its own page-specific FAQ (if any).
  if (route.path !== '/') {
    baseHtml = baseHtml.replace(
      /\s*<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"@type":\s*"FAQPage"(?:(?!<\/script>)[\s\S])*?<\/script>/,
      '',
    );
  }

  // Replace from <title> through </title> and all following meta/link tags
  // until we hit the first <link rel="preconnect"> (we keep preconnect onwards).
  // Strategy: replace the entire block between <meta name="theme-color"> and
  // <!-- Preconnect to critical origins --> with our per-page block.
  baseHtml = baseHtml.replace(
    /(<meta name="theme-color"[^>]*\/>)\s*([\s\S]*?)(<!-- Preconnect to critical origins -->)/,
    `$1\n\n${headBlock}\n\n  $3`,
  );

  // Inject unique body content into <div id="root">...</div>
  // Use a non-greedy match to handle any existing content (from previous prerender runs).
  // React's createRoot().render() will CLEAR this and re-render on mount, so it's safe.
  // Matches: <div id="root">...</div> with any content inside (greedy nesting).
  baseHtml = baseHtml.replace(
    /<div\s+id="root"[\s\S]*?<\/div>/i,
    `<div id="root">${bodyContent}</div>`,
  );

  return baseHtml;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // CRITICAL: read the BUILT template from dist/index.html (it has the hashed
  // /assets/*.js bundle tags). The root index.html references /src/main.tsx (the
  // dev entry) which does NOT exist in production — using it would 404 the app
  // and blank the whole site. We read it ONCE here, before the loop writes any
  // route (the '/' route later overwrites dist/index.html, but this in-memory
  // copy stays clean). Always run `vite build` immediately before this script.
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
