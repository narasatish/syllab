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

import { promises as fs, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollegesManifest } from './collegesData.mjs';
import { getMedicalManifest } from './medicalColleges.mjs';
import { getBlogArticles } from './blogArticles.mjs';
import { getNcertChapters } from './ncertChapters.mjs';
import { getStateBoardChapters } from './stateBoardChapters.mjs';
import { getAiHubTopics } from './aiHubTopics.mjs';
import { getDifferences } from './differencesData.mjs';
import { getFullForms, getGlossary, getRevisionNotes, getSamplePapers, getMathsTables, getEnglishWriting, getChapterMcqs, getStaticGk, getEnglishVocab, getEnglishLiterature, getConcepts, getSolvedExamples, getLabPracticals, getVisualLessons, getTimelines, getWhatToStudy, getPyqs, getFormulaSheets } from './studyClusters.mjs';

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
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Free Mock Tests for JEE, NEET, EAMCET & State Exams',
        description: 'Practice with full mock tests for JEE Mains, NEET, EAMCET, BITSAT, WBJEE, TNEA, UPSEE, MHT-CET, KCET, COMEDK, GUJCET, OJEE and Olympiads — 200+ mocks total, all free',
        provider: { '@type': 'Organization', name: 'Syllab.in', sameAs: 'https://syllab.in' },
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        educationalLevel: 'Class 9 to Class 12',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Syllab Mock Tests',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        isAccessibleForFree: true,
        description: '200+ full-length mock tests for JEE, NEET, EAMCET and state engineering exams',
      },
    ],
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
    bodyHtml: `
      <p style="font-size:0.8rem;color:#666;">Last updated: 11 June 2026</p>
      <p>By using Syllab.in you agree to these terms. Please read them. If you do not agree, please do not use the service.</p>
      <h2>1. The service</h2>
      <p>Syllab provides free educational content and tools (syllabus notes, practice, mock tests, an AI tutor, a career &amp; college predictor, worksheets and more) for students in India. Features may change or improve over time.</p>
      <h2>2. Eligibility</h2>
      <p>Syllab is intended for school students. If you are under 18, you should use Syllab with the involvement and consent of a parent or guardian.</p>
      <h2>3. Acceptable use</h2>
      <p>Use Syllab for learning. Do not misuse it — no attempts to break, overload or reverse-engineer the service, no scraping at scale, no uploading unlawful or harmful content, and no using the AI features to generate abusive or unsafe content.</p>
      <h2>4. Educational guidance only</h2>
      <p>All content — including AI answers, rank/college predictions, cut-offs, fees and placement figures — is indicative and for guidance only, and may contain errors. Always verify important decisions against official sources (NCERT/CBSE, the exam board, JoSAA/MCC/NTA, and college websites). Syllab does not provide professional, legal, medical or financial advice.</p>
      <h2>5. Intellectual property</h2>
      <p>Syllab's name, design and original content belong to Syllab. You may use the content for personal, non-commercial learning. Third-party names and trademarks belong to their owners.</p>
      <h2>6. Disclaimers &amp; liability</h2>
      <p>The service is provided "as is", without warranties. To the extent permitted by law, Syllab is not liable for any loss arising from reliance on the content or from interruptions to the free service.</p>
      <h2>7. Changes, termination &amp; law</h2>
      <p>We may update these terms and may suspend accounts that misuse the service. These terms are governed by the laws of India. Questions? Email <a href="mailto:narasatish966@gmail.com">narasatish966@gmail.com</a>.</p>
    `,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Syllab.in',
    description: 'Read the Privacy Policy for Syllab.in. We are committed to protecting student data and your privacy.',
    keywords: 'Syllab privacy policy, data protection, student privacy',
    noindex: true,
    bodyHtml: `
      <p style="font-size:0.8rem;color:#666;">Last updated: 11 June 2026</p>
      <p>Syllab.in ("Syllab", "we", "us") is a free learning platform for students in India. We respect your privacy and keep data collection to the minimum needed to run the service. This policy explains what we collect, why, and your choices.</p>
      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Account details</strong> (optional): if you sign in, your name, email and class/board — to save your progress.</li>
        <li><strong>Learning activity</strong>: quizzes, practice, study sessions and progress, so we can show your dashboard.</li>
        <li><strong>On-device storage</strong>: your browser's local storage (cached answers, preferences) — this stays on your device.</li>
        <li><strong>Basic analytics</strong>: anonymised usage data to improve the product. We do not sell your data.</li>
      </ul>
      <h2>2. How we use it</h2>
      <p>To provide and improve learning features, save your progress, personalise content to your class/board, and keep the service secure. We do not sell or rent personal data, and we do not show third-party behavioural ads to children.</p>
      <h2>3. Children's privacy</h2>
      <p>Syllab is used by school students, including those under 18. We collect only what is necessary for learning. In line with India's Digital Personal Data Protection (DPDP) Act, 2023, we expect a parent or guardian to provide consent for a child's account. Parents can request access to or deletion of a child's data by contacting us.</p>
      <h2>4. Service providers</h2>
      <p>We use trusted providers to run Syllab — Google Firebase (authentication, database, hosting) and AI APIs that generate explanations. They process data only to provide their service, under their own security and privacy terms.</p>
      <h2>5. Data security &amp; retention</h2>
      <p>We use reasonable technical safeguards (encrypted connections, access rules) to protect data. We keep account and progress data only while your account is active, or as required by law.</p>
      <h2>6. Your rights</h2>
      <p>You can access, correct or delete your personal data, and withdraw consent, at any time. To do so, email us and we'll act on your request promptly.</p>
      <h2>7. Changes &amp; contact</h2>
      <p>We may update this policy and will revise the date above. Questions or requests? Email <a href="mailto:narasatish966@gmail.com">narasatish966@gmail.com</a>.</p>
    `,
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
        isAccessibleForFree: true,
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

// City college hubs — "Top Engineering Colleges in {City}" (cities with 2+ colleges).
const cityHubMap = new Map();
for (const c of COLLEGES_M) {
  const slug = c.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const e = cityHubMap.get(slug) || { city: c.city, slug, state: c.stateName, list: [] };
  e.list.push(c);
  cityHubMap.set(slug, e);
}
for (const ci of cityHubMap.values()) {
  if (ci.list.length < 2) continue;
  const sorted = [...ci.list].sort((a, b) => (a.nirf ?? 999) - (b.nirf ?? 999));
  ROUTES.push({
    path: `/colleges/city/${ci.slug}`,
    title: `Top ${ci.list.length} Engineering Colleges in ${ci.city} 2026 — Fees, Cutoff & Ranking | Syllab.in`,
    description: `Best engineering colleges in ${ci.city}, ${ci.state} 2026 — NIRF rank, B.Tech fees, cutoffs, placements and admission process. Compare the top engineering colleges in ${ci.city}.`,
    keywords: `top engineering colleges in ${ci.city}, best engineering colleges in ${ci.city}, engineering colleges in ${ci.city} fees, ${ci.city} btech admission, ${ci.city} college cutoff 2026`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'ItemList', name: `Top Engineering Colleges in ${ci.city}`,
      itemListElement: sorted.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE}/colleges/${c.stateSlug}/${c.slug}` })),
    },
  });
}

// ─── NCERT Solutions: index + per-chapter pages (high-volume "NCERT solutions") ─
const today = new Date().toISOString().split('T')[0];
const NCERT_CHAPTERS = getNcertChapters();
// Static link hub: list every chapter as a real <a> so crawlers discover the
// chapter pages from the index without running JS (internal linking + PageRank flow).
const ncertHubBody = (() => {
  const byCls = {};
  for (const c of NCERT_CHAPTERS) { (byCls[c.classLevel] ||= {}); (byCls[c.classLevel][c.subject] ||= []).push(c); }
  let html = '<h2>NCERT Solutions by Class &amp; Subject</h2>';
  for (const cls of Object.keys(byCls).sort((a, b) => Number(a) - Number(b))) {
    for (const subj of Object.keys(byCls[cls]).sort()) {
      html += `<h3>Class ${cls} ${esc(subj)}</h3><ul>`;
      for (const c of byCls[cls][subj]) html += `<li><a href="/ncert-solutions/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}">${esc(c.title)} — Class ${c.classLevel} ${esc(c.subject)} NCERT Solutions</a></li>`;
      html += '</ul>';
    }
  }
  return html;
})();
ROUTES.push({
  path: '/ncert-solutions',
  title: 'Free NCERT Solutions for Class 6–12 (CBSE 2026-27) — Chapter-wise PDF | Syllab.in',
  description: 'Free NCERT solutions for CBSE Class 6 to 12 — chapter-wise, step-by-step answers to textbook exercises in Science, Maths, Physics, Chemistry & Biology for Indian students.',
  keywords: 'NCERT solutions free, NCERT solutions Class 10, NCERT solutions Class 9, NCERT solutions Class 12, CBSE NCERT solutions chapter wise, free textbook solutions India',
  bodyHtml: ncertHubBody,
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'NCERT Solutions for Class 6–12', url: `${SITE}/ncert-solutions` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are NCERT solutions free on Syllab?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All NCERT solutions on Syllab are completely free for Class 6 to 12 — chapter-wise, step-by-step answers with no subscription.' } },
      { '@type': 'Question', name: 'Which classes and subjects are covered?', acceptedAnswer: { '@type': 'Answer', text: 'Syllab covers NCERT solutions for Class 6–12 in Science, Mathematics, Physics, Chemistry, Biology and Social Science, aligned to the CBSE/NCERT syllabus.' } },
      { '@type': 'Question', name: 'Are these solutions aligned to the CBSE board exam?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the solutions follow the NCERT textbook exercises used by CBSE and most state boards, so they map directly to board exam preparation.' } },
    ] },
  ],
});
for (const c of NCERT_CHAPTERS) {
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

// Junior "tap & listen" GK picture topics — high-intent "X for kids" searches.
for (const t of [
  { slug: 'animals', name: 'Animals & Their Sounds', kw: 'animals and their sounds for kids, animal names for kids, domestic and wild animals' },
  { slug: 'birds', name: 'Birds', kw: 'birds name for kids, birds for kindergarten, list of birds' },
  { slug: 'fruits', name: 'Fruits', kw: 'fruits name for kids, fruits for LKG, fruit names list' },
  { slug: 'vegetables', name: 'Vegetables', kw: 'vegetables name for kids, vegetables for kids, vegetable names list' },
  { slug: 'body', name: 'Body Parts', kw: 'body parts for kids, parts of the body for kids, human body for kindergarten' },
  { slug: 'colours', name: 'Colours', kw: 'colours name for kids, learn colors for kids, colours for LKG' },
  { slug: 'opposites', name: 'Opposites', kw: 'opposites for kids, opposite words for kids, opposite words list' },
  { slug: 'transport', name: 'Vehicles & Transport', kw: 'means of transport for kids, vehicles name for kids, modes of transport' },
  { slug: 'helpers', name: 'Community Helpers', kw: 'community helpers for kids, names of community helpers, helpers around us' },
  { slug: 'habits', name: 'Good Habits', kw: 'good habits for kids, healthy habits for children, good manners for kids' },
  { slug: 'wild', name: 'Wild Animals', kw: 'wild animals name for kids, wild animals for kindergarten' },
  { slug: 'water', name: 'Water Animals', kw: 'water animals for kids, sea animals name for kids, aquatic animals' },
  { slug: 'insects', name: 'Insects', kw: 'insects name for kids, insects for kindergarten, types of insects' },
  { slug: 'flowers', name: 'Flowers', kw: 'flowers name for kids, flower names for kids, types of flowers' },
  { slug: 'family', name: 'My Family', kw: 'family members name for kids, my family for kids, family for LKG' },
  { slug: 'days', name: 'Days of the Week', kw: 'days of the week for kids, seven days for kids, weekdays names' },
  { slug: 'seasons', name: 'Seasons', kw: 'seasons for kids, seasons in India for kids, types of seasons' },
  { slug: 'national', name: 'National Symbols of India', kw: 'national symbols of India for kids, national bird animal flower of India, GK for kids India' },
  { slug: 'festivals', name: 'Festivals of India', kw: 'festivals of India for kids, Indian festivals names, festivals for kids' },
  { slug: 'hindi-swar', name: 'Hindi Varnamala Swar (Vowels)', kw: 'hindi varnamala for kids, hindi swar, hindi vowels for kids, hindi alphabet learning' },
  { slug: 'hindi-vyanjan', name: 'Hindi Varnamala Vyanjan (Consonants)', kw: 'hindi vyanjan for kids, hindi consonants, hindi varnamala ka kha ga, learn hindi alphabet' },
  { slug: 'hindi-numbers', name: 'Hindi Numbers (१–१०)', kw: 'hindi numbers for kids, hindi ginti 1 to 10, hindi counting for kids' },
  { slug: 'tamil-vowels', name: 'Tamil Vowels (Uyir Ezhuthu)', kw: 'tamil letters for kids, tamil vowels, tamil alphabet uyir ezhuthu, learn tamil' },
  { slug: 'telugu-vowels', name: 'Telugu Vowels (Achchulu)', kw: 'telugu letters for kids, telugu vowels achchulu, telugu alphabet, learn telugu' },
  { slug: 'kannada-vowels', name: 'Kannada Vowels (Swaragalu)', kw: 'kannada letters for kids, kannada vowels swaragalu, kannada alphabet, learn kannada' },
  { slug: 'tamil-consonants', name: 'Tamil Consonants (Mei Ezhuthu)', kw: 'tamil consonants for kids, tamil mei ezhuthu, tamil alphabet consonants, learn tamil letters' },
  { slug: 'telugu-consonants', name: 'Telugu Consonants (Hallulu)', kw: 'telugu consonants for kids, telugu hallulu, telugu alphabet consonants, learn telugu letters' },
  { slug: 'kannada-consonants', name: 'Kannada Consonants (Vyanjanagalu)', kw: 'kannada consonants for kids, kannada vyanjana, kannada alphabet consonants, learn kannada letters' },
]) {
  ROUTES.push({
    path: `/kids/learn/${t.slug}`,
    title: `${t.name} for Kids — Free Learning (Tap & Listen) | Syllab Junior`,
    description: `Learn ${t.name.toLowerCase()} the fun way — tap each picture to hear it. Free GK for Pre-KG, LKG, UKG and Class 1 kids in India.`,
    keywords: t.kw,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${t.name} for Kids`, url: `${SITE}/kids/learn/${t.slug}`, inLanguage: 'en-IN', isAccessibleForFree: true, educationalLevel: 'Preschool' },
  });
}

// Moral stories, action rhymes, matching games — big evergreen kid searches.
ROUTES.push({
  path: '/kids/stories',
  title: 'Moral Stories for Kids — Short Bedtime Stories with Morals | Syllab Junior',
  description: 'Free short moral stories for kids — Thirsty Crow, Lion and the Mouse, Hare and the Tortoise and more Panchatantra & Aesop favourites, read aloud. For Pre-KG to Class 3.',
  keywords: 'moral stories for kids, short stories with morals, panchatantra stories for kids, bedtime stories for children, thirsty crow story, hare and tortoise story',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Moral Stories for Kids', url: `${SITE}/kids/stories`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
ROUTES.push({
  path: '/kids/action-rhymes',
  title: 'Action Rhymes for Kids — Sing & Move | Syllab Junior',
  description: 'Free action rhymes for preschoolers — Head Shoulders Knees and Toes, Wheels on the Bus, Itsy Bitsy Spider and more, with simple actions to do. For Pre-KG to Class 1.',
  keywords: 'action rhymes for kids, action songs for preschool, head shoulders knees and toes, wheels on the bus, nursery rhymes with actions',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Action Rhymes for Kids', url: `${SITE}/kids/action-rhymes`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
ROUTES.push({
  path: '/kids/games',
  title: 'Matching Games for Kids — Free Fun Learning Games | Syllab Junior',
  description: 'Free matching games for kids — match animals to sounds, capital to small letters, numbers to counts, fruits to colours and more. Fun learning for Pre-KG to Class 2.',
  keywords: 'matching games for kids, free learning games for kids, match the following for kids, educational games for children, free online kids games',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Matching Games for Kids', url: `${SITE}/kids/games`, inLanguage: 'en-IN', isAccessibleForFree: true },
});

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

// ─── GK Questions — programmatic SEO cluster (index + per class) ─────────────
ROUTES.push({
  path: '/gk-questions',
  title: 'GK Questions for Students — Class 5 to 12 (Free, with Answers) | Syllab.in',
  description: 'Free General Knowledge questions and answers for Indian students Class 5 to 12 — history, geography, polity, science, static GK and current affairs, with clear explanations.',
  keywords: 'gk questions with answers, general knowledge for students, gk for class 5 6 7 8 9 10, gk questions india, static gk, current affairs for students',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'GK Questions for Students', url: `${SITE}/gk-questions`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const c of [5, 6, 7, 8, 9, 10, 11, 12]) {
  ROUTES.push({
    path: `/gk-questions/class-${c}`,
    title: `GK Questions for Class ${c} with Answers (Free) | Syllab.in`,
    description: `Free General Knowledge questions and answers for Class ${c} — GK across history, geography, polity, science and current affairs, with clear explanations for Indian students.`,
    keywords: `gk questions for class ${c}, general knowledge for class ${c}, gk for class ${c} with answers, class ${c} gk quiz, gk questions india class ${c}`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GK Questions', item: `${SITE}/gk-questions` },
      { '@type': 'ListItem', position: 2, name: `Class ${c}`, item: `${SITE}/gk-questions/class-${c}` },
    ] },
  });
}

// ─── Important Questions — programmatic cluster (Class 6–12, per subject) ─────
const IQ_SUBJECTS = {
  '6': ['mathematics', 'science', 'social-science', 'english'],
  '7': ['mathematics', 'science', 'social-science', 'english'],
  '8': ['mathematics', 'science', 'social-science', 'english'],
  '9': ['mathematics', 'science', 'social-science', 'english'],
  '10': ['mathematics', 'science', 'social-science', 'english'],
  '11': ['physics', 'chemistry', 'biology', 'mathematics'],
  '12': ['physics', 'chemistry', 'biology', 'mathematics'],
};
const subjName = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
ROUTES.push({
  path: '/important-questions',
  title: 'Important Questions for Class 6 to 12 — Chapter-wise (Free) | Syllab.in',
  description: 'Free chapter-wise important questions and key chapters for Class 6 to 12 — Maths, Science, Physics, Chemistry, Biology, Social Science & more, CBSE/NCERT-aligned for Indian students.',
  keywords: 'important questions, important questions class 10, important questions class 9, cbse important questions, ncert important questions, important chapters',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Important Questions for Class 6–12', url: `${SITE}/important-questions`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const [c, subs] of Object.entries(IQ_SUBJECTS)) {
  ROUTES.push({
    path: `/important-questions/class-${c}`,
    title: `Important Questions for Class ${c} — All Subjects (Free) | Syllab.in`,
    description: `Chapter-wise important questions and key chapters for Class ${c} — pick a subject. Free, CBSE/NCERT-aligned practice for Indian students.`,
    keywords: `important questions class ${c}, class ${c} important chapters, cbse class ${c} important questions`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
      { '@type': 'ListItem', position: 2, name: `Class ${c}`, item: `${SITE}/important-questions/class-${c}` },
    ] },
  });
  for (const s of subs) {
    ROUTES.push({
      path: `/important-questions/class-${c}/${s}`,
      title: `Important Questions for Class ${c} ${subjName(s)} (Chapter-wise, Free) | Syllab.in`,
      description: `Important questions and high-weightage chapters for Class ${c} ${subjName(s)} — chapter-wise key topics with free practice. CBSE/NCERT-aligned.`,
      keywords: `important questions class ${c} ${s.replace(/-/g, ' ')}, class ${c} ${s.replace(/-/g, ' ')} important chapters, cbse class ${c} ${s.replace(/-/g, ' ')}`,
      jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
        { '@type': 'ListItem', position: 2, name: `Class ${c}`, item: `${SITE}/important-questions/class-${c}` },
        { '@type': 'ListItem', position: 3, name: subjName(s), item: `${SITE}/important-questions/class-${c}/${s}` },
      ] },
    });
  }
}

// ─── SEO landing clusters: mock-test exams, English grammar, career guides ────
const tcSlug = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const MOCK_EXAM_NAMES = { 'jee-main': 'JEE Main', 'neet': 'NEET', 'ap-eapcet': 'AP EAPCET', 'ts-eapcet': 'TS EAPCET', 'bitsat': 'BITSAT', 'kcet': 'KCET', 'mht-cet': 'MHT-CET', 'wbjee': 'WBJEE', 'science-olympiad': 'Science Olympiad', 'maths-olympiad': 'Maths Olympiad' };
for (const [slug, name] of Object.entries(MOCK_EXAM_NAMES)) {
  ROUTES.push({
    path: `/mock-tests/${slug}`,
    title: `Free ${name} Mock Test 2026 — Online Practice with Answers | Syllab.in`,
    description: `Take a free ${name} mock test online — timed, exam-pattern practice with answers and instant review. Free for Indian students on Syllab.in.`,
    keywords: `${name} mock test free, ${name} online test, ${name} practice test 2026, ${name} exam pattern`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mock Tests', item: `${SITE}/mock-tests` },
      { '@type': 'ListItem', position: 2, name: `${name} Mock Test`, item: `${SITE}/mock-tests/${slug}` },
    ] },
  });
}
const ENGLISH_TOPIC_SLUGS = ['tenses', 'parts-of-speech', 'nouns', 'pronouns', 'verbs', 'adjectives', 'adverbs', 'articles', 'prepositions', 'active-passive-voice', 'direct-indirect-speech', 'subject-verb-agreement', 'essay-writing', 'letter-writing', 'reading-comprehension'];
ROUTES.push({ path: '/english-grammar', title: 'English Grammar for Students — Free Lessons, Examples & Practice | Syllab.in', description: 'Learn English grammar free — tenses, parts of speech, articles, prepositions, voice, narration, essay & letter writing and more, with examples and practice for Indian students.', keywords: 'english grammar for students, learn english grammar free, grammar rules with examples, english practice', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'English Grammar for Students', url: `${SITE}/english-grammar`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const slug of ENGLISH_TOPIC_SLUGS) {
  const T = tcSlug(slug);
  ROUTES.push({
    path: `/english-grammar/${slug}`,
    title: `${T} — English Grammar Rules, Examples & Practice (Free) | Syllab.in`,
    description: `Learn ${T} in English grammar with simple rules, clear examples, common mistakes and free practice questions for students.`,
    keywords: `${T.toLowerCase()} english grammar, ${T.toLowerCase()} rules examples, ${T.toLowerCase()} practice for students`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'English Grammar', item: `${SITE}/english-grammar` },
      { '@type': 'ListItem', position: 2, name: T, item: `${SITE}/english-grammar/${slug}` },
    ] },
  });
}
const CAREER_GUIDE_SLUGS = ['which-stream-after-10th', 'which-stream-after-12th', 'how-to-become-engineer', 'how-to-become-doctor', 'how-to-become-data-scientist', 'how-to-become-software-engineer', 'how-to-become-chartered-accountant', 'how-to-become-lawyer', 'how-to-become-ias-officer', 'careers-after-12th-commerce', 'careers-after-12th-arts', 'careers-after-12th-science'];
ROUTES.push({ path: '/career', title: 'Career Guidance for Students — Streams, Courses & Roadmaps (Free) | Syllab.in', description: 'Free career guidance for Indian students — which stream after 10th/12th, how to become an engineer, doctor, data scientist, CA, lawyer and more, with courses, exams, skills and roadmaps.', keywords: 'career guidance students india, which stream after 10th, which stream after 12th, career options after 12th', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Career Guidance for Students', url: `${SITE}/career`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const slug of CAREER_GUIDE_SLUGS) {
  const T = tcSlug(slug);
  ROUTES.push({
    path: `/career/${slug}`,
    title: `${T} — Courses, Exams, Skills & Roadmap | Syllab.in`,
    description: `${T}: subjects to focus on, courses, entrance exams, skills, an indicative salary range and a step-by-step roadmap for Indian students.`,
    keywords: `${T.toLowerCase()}, ${slug.replace(/-/g, ' ')}, career roadmap india`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Career Guidance', item: `${SITE}/career` },
      { '@type': 'ListItem', position: 2, name: T, item: `${SITE}/career/${slug}` },
    ] },
  });
}

// ─── College Predictor landing pages (JEE/NEET/EAMCET/KCET/MHT-CET/WBJEE/BITSAT) ─
const CP_EXAMS = { 'jee-main': 'JEE Main', 'neet': 'NEET', 'ts-eapcet': 'TS EAPCET', 'ap-eapcet': 'AP EAPCET', 'kcet': 'KCET', 'mht-cet': 'MHT-CET', 'wbjee': 'WBJEE', 'bitsat': 'BITSAT' };
ROUTES.push({ path: '/college-predictor', title: 'Free College Predictor 2026 — JEE Main, NEET, EAMCET, KCET & More | Syllab.in', description: 'Free college predictors for Indian students — predict your colleges by rank for JEE Main, NEET, TS/AP EAPCET, KCET, MHT-CET, WBJEE and BITSAT, with category and quota. Indicative & free.', keywords: 'college predictor free, jee main college predictor, neet college predictor, eamcet college predictor, college predictor by rank', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'College Predictors', url: `${SITE}/college-predictor`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const [slug, name] of Object.entries(CP_EXAMS)) {
  ROUTES.push({
    path: `/college-predictor/${slug}`,
    title: `${name} College Predictor 2026 — Predict Colleges by Rank (Free) | Syllab.in`,
    description: `Free ${name} college predictor — estimate the colleges you can get by rank, category and quota. Indicative and free for Indian students on Syllab.in.`,
    keywords: `${name.toLowerCase()} college predictor, ${name.toLowerCase()} college predictor by rank, ${name.toLowerCase()} rank predictor, ${name.toLowerCase()} college predictor 2026 free`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'College Predictor', item: `${SITE}/college-predictor` },
      { '@type': 'ListItem', position: 2, name: `${name} Predictor`, item: `${SITE}/college-predictor/${slug}` },
    ] },
  });
}

// ─── Previous Year Questions (PYQ) & Sample Papers cluster ────────────────────
const PYQ_GUIDES = { 'cbse-class-10': 'CBSE Class 10', 'cbse-class-12': 'CBSE Class 12', 'jee-main': 'JEE Main', 'neet': 'NEET', 'ts-eamcet': 'TS EAMCET', 'ap-eamcet': 'AP EAMCET', 'cbse-class-9': 'CBSE Class 9', 'kcet': 'KCET', 'mht-cet': 'MHT-CET', 'wbjee': 'WBJEE', 'bitsat': 'BITSAT', 'cuet': 'CUET' };
ROUTES.push({ path: '/previous-year-papers', title: 'Previous Year Question Papers & Sample Papers (Free) — CBSE, JEE, NEET, EAMCET | Syllab.in', description: 'Free guides to previous year question papers (PYQ) & sample papers for CBSE Class 10 & 12, JEE Main, NEET and EAMCET — exam pattern, high-weightage topics, how to use PYQs, and free mock tests for Indian students.', keywords: 'previous year question papers, sample papers, cbse previous year papers, jee main pyq, neet previous year papers, eamcet previous papers', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Previous Year Question Papers & Sample Papers', url: `${SITE}/previous-year-papers`, inLanguage: 'en-IN', isAccessibleForFree: true } });
// Map each guide to the classes whose real chapter-wise PYQs we link to.
const PYQ_ALL = getPyqs(ROOT);
const PYQ_BY_CLASS = {};
for (const p of PYQ_ALL) (PYQ_BY_CLASS[p.classLevel] ||= []).push(p);
const GUIDE_CLASSES = {
  'cbse-class-10': ['Class 10'], 'cbse-class-12': ['Class 12'], 'cbse-class-9': ['Class 9'],
  'jee-main': ['Class 11', 'Class 12'], 'neet': ['Class 11', 'Class 12'], 'ts-eamcet': ['Class 11', 'Class 12'],
  'ap-eamcet': ['Class 11', 'Class 12'], 'kcet': ['Class 11', 'Class 12'], 'mht-cet': ['Class 11', 'Class 12'],
  'wbjee': ['Class 11', 'Class 12'], 'bitsat': ['Class 11', 'Class 12'], 'cuet': ['Class 12'],
};
for (const [slug, name] of Object.entries(PYQ_GUIDES)) {
  const pyqs = (GUIDE_CLASSES[slug] || []).flatMap((c) => PYQ_BY_CLASS[c] || []);
  const bySubj = {};
  for (const p of pyqs) (bySubj[p.subject] ||= []).push(p);
  const listHtml = Object.keys(bySubj).sort().map((subj) =>
    `<h3>${esc(name)} ${esc(subj)} — Chapter-wise PYQs</h3><ul>${bySubj[subj].slice(0, 30).map((p) => `<li><a href="/pyqs/${p.slug}">${esc(p.chapter)} — Previous Year Questions with solutions</a></li>`).join('')}</ul>`,
  ).join('');
  const bodyHtml = pyqs.length
    ? `<p class="speakable">Practice <strong>${name} previous year questions (PYQs)</strong> chapter-by-chapter with full step-by-step solutions — free, no login. Solving PYQs is the single highest-ROI revision: the same question patterns repeat every year.</p>
       <h2>${esc(name)} Previous Year Questions — by Chapter</h2>${listHtml}
       <p><a href="/mock-tests">Take a free ${esc(name)} mock test →</a> · <a href="/pyqs">Browse all PYQs →</a> · <a href="/sample-papers">Sample papers →</a></p>`
    : undefined;
  const route = {
    path: `/previous-year-papers/${slug}`,
    title: `${name} Previous Year Question Papers (PYQ) — Chapter-wise with Solutions (Free) | Syllab.in`,
    description: `Free ${name} previous year questions (PYQ) — chapter-wise with full solutions, exam pattern, most-repeated topics & free mock tests. No login. ${pyqs.length}+ solved chapters.`,
    keywords: `${name.toLowerCase()} previous year papers, ${name.toLowerCase()} pyq, ${name.toLowerCase()} sample papers, ${name.toLowerCase()} question paper, ${name.toLowerCase()} exam pattern`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Previous Year Papers', item: `${SITE}/previous-year-papers` },
      { '@type': 'ListItem', position: 2, name: `${name} Previous Year Papers`, item: `${SITE}/previous-year-papers/${slug}` },
    ] },
  };
  if (bodyHtml) route.bodyHtml = bodyHtml;
  ROUTES.push(route);
}

// ─── Formula Sheets (free PDF revision assets — strong linkable/backlink magnet) ─
const FORMULA_SHEETS_DATA = getFormulaSheets(ROOT);
ROUTES.push({ path: '/formula-sheets', title: 'Free Formula Sheets (PDF) — Maths, Physics & Chemistry Class 9–12 | Syllab.in', description: `Free downloadable formula sheets for CBSE Class 9–12 — ${FORMULA_SHEETS_DATA.length}+ chapter & subject sheets in Maths, Physics & Chemistry. Every formula on one page for fast revision before boards, JEE & NEET. Free PDF, no signup.`, keywords: 'formula sheet pdf, class 12 physics formula sheet, class 10 maths formulas, class 11 chemistry formulas, all formulas pdf free download', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Formula Sheets for Class 9–12', url: `${SITE}/formula-sheets`, inLanguage: 'en-IN', isAccessibleForFree: true } });
// Group for sibling internal links (same class+subject).
const FS_BY_GROUP = {};
for (const s of FORMULA_SHEETS_DATA) (FS_BY_GROUP[`${s.classLevel}|${s.subject}`] ||= []).push(s);
for (const s of FORMULA_SHEETS_DATA) {
  const flat = (s.sections || []).flatMap((sec) => sec.formulas || []);
  const formulaHtml = (s.sections || []).map((sec) => `<h2>${esc(sec.heading)}</h2><table><thead><tr><th>Formula</th><th>Expression</th></tr></thead><tbody>${(sec.formulas || []).map((fm) => `<tr><td>${esc(fm.name)}</td><td>${esc(fm.formula)}${fm.note ? ` — ${esc(fm.note)}` : ''}</td></tr>`).join('')}</tbody></table>`).join('');
  const faqHtml = (s.faqs || []).length ? `<h2>FAQs</h2>${s.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const sibs = (FS_BY_GROUP[`${s.classLevel}|${s.subject}`] || []).filter((y) => y.slug !== s.slug).slice(0, 6);
  const relHtml = sibs.length ? `<h2>More Class ${esc(s.classLevel)} ${esc(s.subject)} Formula Sheets</h2><ul>${sibs.map((y) => `<li><a href="/formula-sheets/${y.slug}">${esc(y.title)}</a></li>`).join('')}</ul>` : '';
  ROUTES.push({
    path: `/formula-sheets/${s.slug}`,
    title: `${s.title} (PDF) — All Important Formulas Free | Syllab.in`,
    description: `Free ${s.title.toLowerCase()} — all ${flat.length} key formulas on one page, downloadable as PDF for fast revision before CBSE board exams${Number(s.classLevel) >= 11 ? ', JEE & NEET' : ''}. No signup.`,
    keywords: `${s.title.toLowerCase()}, ${s.title.toLowerCase()} pdf, formula sheet, all formulas`,
    bodyHtml: `<p class="speakable">${esc(s.intro)}</p>${formulaHtml}${faqHtml}${relHtml}<p><a href="/formula-sheets">See all formula sheets →</a></p>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Formula Sheets', item: `${SITE}/formula-sheets` },
      { '@type': 'ListItem', position: 2, name: s.title, item: `${SITE}/formula-sheets/${s.slug}` },
    ] },
  });
}

// ─── State Board Solutions (AP/TS/Karnataka/Maharashtra) — index + per-chapter ──
const SB_CHAPTERS = getStateBoardChapters();
const sbHubBody = (() => {
  const byBoard = {};
  for (const c of SB_CHAPTERS) { ((byBoard[c.boardLabel] ||= {})[c.classLevel] ||= {})[c.subject] ||= []; byBoard[c.boardLabel][c.classLevel][c.subject].push(c); }
  let html = '<h2>State Board Solutions by Board, Class &amp; Subject</h2>';
  for (const bl of Object.keys(byBoard)) {
    for (const cls of Object.keys(byBoard[bl]).sort()) {
      for (const subj of Object.keys(byBoard[bl][cls]).sort()) {
        html += `<h3>${esc(bl)} — Class ${cls} ${esc(subj)}</h3><ul>`;
        for (const c of byBoard[bl][cls][subj]) html += `<li><a href="/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}">${esc(c.title)}</a></li>`;
        html += '</ul>';
      }
    }
  }
  return html;
})();
ROUTES.push({ path: '/state-board-solutions', title: 'State Board Solutions — AP, Telangana, Karnataka & Maharashtra (Free) | Syllab.in', description: 'Free chapter-wise textbook solutions for AP (SSC), Telangana (SSC), Karnataka (SSLC) and Maharashtra (SSC) — Class 9 & 10 Maths and Science, step-by-step answers for board exam prep.', keywords: 'AP SSC solutions, TS SSC solutions, Karnataka SSLC solutions, Maharashtra SSC solutions, state board maths science solutions free', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'State Board Solutions', url: `${SITE}/state-board-solutions`, inLanguage: 'en-IN', isAccessibleForFree: true }, bodyHtml: sbHubBody });
for (const c of SB_CHAPTERS) {
  const u = `${SITE}/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`;
  const lim = Math.min(5, c.qa.length);
  let body = '<div style="margin-top:1.5rem;">';
  for (let i = 0; i < lim; i++) body += `<div style="margin-bottom:1.25rem;padding:1rem;background:#f9f9f9;border-left:3px solid #0066cc;"><h3 style="margin:0 0 .5rem;font-size:1.02rem;">Q${i + 1}: ${esc(c.qa[i].q)}</h3><div style="font-size:.95rem;color:#555;line-height:1.5;white-space:pre-line;">${esc(c.qa[i].solution).slice(0, 500)}${c.qa[i].solution.length > 500 ? '…' : ''}</div></div>`;
  if (c.qa.length > lim) body += `<p style="color:#666;font-size:.9rem;font-style:italic;">Showing ${lim} of ${c.qa.length} questions — full solutions on the page.</p>`;
  body += '</div>';
  ROUTES.push({
    path: `/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}/${c.chapSlug}`,
    title: `${c.title} — ${c.boardLabel} Class ${c.classLevel} ${c.subject} Solutions (Free) | Syllab.in`,
    description: `Free step-by-step ${c.boardLabel} Class ${c.classLevel} ${c.subject} solutions for "${c.title}" — important questions with detailed answers, download PDF for board exam preparation.`,
    keywords: `${c.title} ${c.board} solutions, ${c.boardLabel} class ${c.classLevel} ${c.subject.toLowerCase()} ${c.title.toLowerCase()}, state board ${c.title.toLowerCase()} answers free`,
    bodyHtml: body,
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Article', headline: `${c.title} — ${c.boardLabel} Class ${c.classLevel} ${c.subject} Solutions`, url: u, inLanguage: 'en-IN', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in', url: SITE } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'State Board Solutions', item: `${SITE}/state-board-solutions` },
        { '@type': 'ListItem', position: 2, name: `${c.boardLabel} Class ${c.classLevel} ${c.subject}`, item: `${SITE}/state-board-solutions/${c.boardSlug}/class-${c.classLevel}/${c.subjSlug}` },
        { '@type': 'ListItem', position: 3, name: c.title, item: u },
      ] },
    ],
  });
}

// ─── AI Hub ("AI for Students" guides — rides the AI search trend) ────────────
// Read every /ai-hub guide straight from src/data/aiHub.ts so prerender never
// drifts from the app's actual AI-hub pages.
const AI_HUB = getAiHubTopics(ROOT).map((t) => [t.slug, t.title, t.desc]);
ROUTES.push({ path: '/ai-hub', title: 'AI for Students — Free Guides: ChatGPT, AI Tools, AI Careers | Syllab.in', description: 'Free, simple AI guides for students & teachers — what is AI & ChatGPT, best free AI study tools 2026, AI prompts for studying, is AI cheating, and how to become an AI engineer in India.', keywords: 'AI for students, what is ChatGPT, best free AI tools for students, AI prompts for studying, how to become AI engineer India', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI for Students Hub', url: `${SITE}/ai-hub`, inLanguage: 'en-IN', isAccessibleForFree: true } });
for (const [slug, title, desc] of AI_HUB) {
  ROUTES.push({
    path: `/ai-hub/${slug}`,
    title: `${title} | AI for Students — Syllab.in`,
    description: desc,
    keywords: `${title.toLowerCase()}, AI for students, artificial intelligence students india`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AI for Students', item: `${SITE}/ai-hub` },
      { '@type': 'ListItem', position: 2, name: title, item: `${SITE}/ai-hub/${slug}` },
    ] },
  });
}

// ─── Difference Between (/difference-between, /difference-between/:slug) ───────
const DIFFS = getDifferences(ROOT);
ROUTES.push({
  path: '/difference-between',
  title: 'Difference Between — Topic-wise Comparisons for Students | Syllab.in',
  description: `Free 'difference between' comparison tables for Class 6–12 — ${DIFFS.length}+ side-by-side comparisons across Biology, Physics, Chemistry, Maths and more, with key points and FAQs. CBSE/NCERT aligned.`,
  keywords: 'difference between, comparison table, mitosis and meiosis, speed and velocity, mass and weight, acid and base, CBSE difference between, NCERT comparison',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Difference Between — Student Comparisons', url: `${SITE}/difference-between`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
const DIFF_BY_CAT = {};
for (const x of DIFFS) (DIFF_BY_CAT[x.category] ||= []).push(x);
for (const d of DIFFS) {
  const rows = (d.table || []).slice(0, 12);
  const tableHtml = rows.length
    ? `<table><thead><tr><th>Basis</th><th>${esc(d.termA)}</th><th>${esc(d.termB)}</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.aspect)}</td><td>${esc(r.a)}</td><td>${esc(r.b)}</td></tr>`).join('')}</tbody></table>`
    : '';
  const kp = (d.keyPoints || []).slice(0, 6);
  const kpHtml = kp.length ? `<h2>Key Points</h2><ul>${kp.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : '';
  const sib = (DIFF_BY_CAT[d.category] || []).filter((x) => x.slug !== d.slug).slice(0, 6);
  const relHtml = sib.length ? `<h2>More ${esc(d.category)} Comparisons</h2><ul>${sib.map((x) => `<li><a href="/difference-between/${x.slug}">${esc(x.title)}</a></li>`).join('')}</ul>` : '';
  const bodyHtml = `
    <p class="speakable"><strong>The main difference between ${esc(d.termA)} and ${esc(d.termB)}:</strong> ${esc(d.intro)}</p>
    <h2>${esc(d.termA)} vs ${esc(d.termB)} — Comparison Table</h2>
    ${tableHtml}
    ${kpHtml}
    ${relHtml}
    <p><a href="/difference-between">See all difference-between comparisons →</a></p>`;
  ROUTES.push({
    path: `/difference-between/${d.slug}`,
    bodyHtml,
    title: `${d.title} (with Comparison Table) | Syllab.in`,
    description: d.intro,
    keywords: `difference between ${d.termA.toLowerCase()} and ${d.termB.toLowerCase()}, ${d.termA.toLowerCase()} vs ${d.termB.toLowerCase()}, ${d.category.toLowerCase()} comparison, ${d.classLevel.toLowerCase()}`,
    noindex: true, // Post-March-2026 update: thin templated content drags domain quality.
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Difference Between', item: `${SITE}/difference-between` },
      { '@type': 'ListItem', position: 2, name: d.title, item: `${SITE}/difference-between/${d.slug}` },
    ] },
  });
}

// ─── Full Forms (/full-forms, /full-forms/:slug) ──────────────────────────────
const FULL_FORMS_DATA = getFullForms(ROOT);
ROUTES.push({
  path: '/full-forms',
  title: 'Full Forms — A to Z List for Students (NCERT, CPU, NEET…) | Syllab.in',
  description: `Free A-to-Z full forms list — ${FULL_FORMS_DATA.length}+ abbreviations across education, computer, science, medical and banking with meanings.`,
  keywords: 'full form, full forms list, NCERT full form, CPU full form, NEET full form, RAM full form, IFSC full form, abbreviations for students',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Full Forms for Students', url: `${SITE}/full-forms`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
// Lookups for internal linking (related abbreviations + same-category siblings).
const FF_BY_TERM = new Map(FULL_FORMS_DATA.map((x) => [String(x.term).toUpperCase(), x]));
const FF_BY_CAT = {};
for (const x of FULL_FORMS_DATA) (FF_BY_CAT[x.category] ||= []).push(x);

for (const f of FULL_FORMS_DATA) {
  const t = f.term;
  const answer = `${t} stands for ${f.fullForm}.`;
  let desc = `${answer} ${f.description}`;
  if (desc.length > 158) desc = desc.slice(0, 156).replace(/\s+\S*$/, '') + '…';
  // Internal links: related abbreviations first, then same-category siblings (≤8).
  const rel = [];
  const seen = new Set([f.slug]);
  for (const r of (f.related || [])) { const x = FF_BY_TERM.get(String(r).toUpperCase()); if (x && !seen.has(x.slug)) { rel.push(x); seen.add(x.slug); } }
  for (const x of (FF_BY_CAT[f.category] || [])) { if (rel.length >= 8) break; if (!seen.has(x.slug)) { rel.push(x); seen.add(x.slug); } }
  const relHtml = rel.length
    ? `<h2>Related Full Forms</h2><ul>${rel.map((x) => `<li><a href="/full-forms/${x.slug}">${esc(x.term)} Full Form</a> — ${esc(x.fullForm)}</li>`).join('')}</ul>`
    : '';
  const bodyHtml = `
    <p class="speakable"><strong>${esc(t)} stands for ${esc(f.fullForm)}.</strong></p>
    <p>${esc(f.description)}</p>
    <h2>${esc(t)} Full Form in Detail</h2>
    <p>The abbreviation <strong>${esc(t)}</strong> expands to <strong>${esc(f.fullForm)}</strong>${f.category ? ` and is commonly used in ${esc(f.category)}` : ''}. Knowing what ${esc(t)} stands for helps you read questions, notes and notices faster.</p>
    ${relHtml}
    <p><a href="/full-forms">Browse all full forms (A–Z) →</a></p>`;
  ROUTES.push({
    path: `/full-forms/${f.slug}`,
    bodyHtml,
    // CTR-first title: leads with the exact query, promises MORE than the bare
    // expansion (which Google answers inline) so there's a reason to click.
    title: `${t} Full Form — Meaning, Definition & Uses | Syllab.in`,
    description: desc,
    keywords: `${t.toLowerCase()} full form, full form of ${t.toLowerCase()}, what does ${t.toLowerCase()} stand for, ${t.toLowerCase()} meaning, ${t.toLowerCase()} abbreviation`,
    noindex: true, // Post-March-2026 update: thin templated content (1–2 sentences) drags domain quality.
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Full Forms', item: `${SITE}/full-forms` },
        { '@type': 'ListItem', position: 2, name: `${t} Full Form`, item: `${SITE}/full-forms/${f.slug}` },
      ] },
      // Per-page FAQ → eligible for the "People also ask" / featured snippet.
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: `What is the full form of ${t}?`, acceptedAnswer: { '@type': 'Answer', text: `${answer} ${f.description}`.slice(0, 320) } },
        { '@type': 'Question', name: `What does ${t} stand for?`, acceptedAnswer: { '@type': 'Answer', text: answer } },
      ] },
    ],
  });
}

// ─── Glossary (/glossary, /glossary/:slug) ────────────────────────────────────
// ── Rich crawlable body builders: surface the REAL Q&A / notes / examples that
//    currently render client-side only, so Google sees substantive pages. ──
const faqBlock = (faqs) => (faqs && faqs.length) ? `<h2>Frequently Asked Questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
const sibLabel = (s) => s.chapter || s.title || s.term || s.slug;
const relBlock = (sibs, base, heading) => (sibs && sibs.length) ? `<h2>${esc(heading)}</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(sibLabel(s))}</a></li>`).join('')}</ul>` : '';
const aiCta = `<p>🤖 <a href="/ai-tutor">Stuck on any of these? Ask Syllab's free AI Tutor to explain step by step →</a></p>`;
const nl2br = (t) => esc(String(t || '')).replace(/\n/g, '<br>');
const faqJsonLd = (faqs) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.slice(0, 6).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
function pyqBody(x, sibs, base) {
  const qs = (x.questions || []).map((q) => `<div class="qa"><h3>Q${q.year ? ` (${esc(String(q.year))}, ${esc(String(q.marks || ''))} mark${Number(q.marks) > 1 ? 's' : ''})` : ''}: ${esc(q.q)}</h3><p><strong>Answer:</strong> ${nl2br(q.answer)}</p></div>`).join('');
  return `<p class="speakable">${esc(x.intro)}</p><h2>${esc(x.chapter)} — Previous Year Questions with Solutions</h2>${qs}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.classLevel)} ${esc(x.subject)} PYQs`)}${aiCta}`;
}
function mcqBody(x, sibs, base) {
  const qs = (x.mcqs || []).map((m, i) => { const opts = (m.options || []).map((o, j) => `<li>${esc(o)}${j === m.correct ? ' ✓ (correct)' : ''}</li>`).join(''); return `<div class="qa"><h3>Q${i + 1}. ${esc(m.q)}</h3><ol type="A">${opts}</ol>${m.exp ? `<p><strong>Explanation:</strong> ${esc(m.exp)}</p>` : ''}</div>`; }).join('');
  return `<p class="speakable">${esc(x.intro)}</p><h2>${esc(x.chapter)} MCQs with Answers &amp; Explanations</h2>${qs}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.classLevel)} ${esc(x.subject)} MCQs`)}${aiCta}`;
}
function solvedBody(x, sibs, base) {
  const ex = (x.examples || []).map((e, i) => `<div class="qa"><h3>Example ${i + 1}: ${esc(e.problem)}</h3><p><strong>Solution:</strong> ${nl2br(e.solution)}</p></div>`).join('');
  const tips = (x.tips || []).length ? `<h2>Tips</h2><ul>${x.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p><h2>${esc(x.chapter)} — Solved Numerical Examples (Step by Step)</h2>${ex}${tips}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.subject)} Solved Examples`)}${aiCta}`;
}
function litBody(x, sibs, base) {
  const summary = x.summary ? `<h2>${esc(x.chapter)} — Summary</h2><p>${nl2br(x.summary)}</p>` : '';
  const chars = (x.characters || []).length ? `<h2>Characters</h2><ul>${x.characters.map((c) => `<li><strong>${esc(c.name)}:</strong> ${esc(c.description)}</li>`).join('')}</ul>` : '';
  const themes = (x.themes || []).length ? `<h2>Themes</h2><ul>${x.themes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${summary}${chars}${themes}${faqBlock(x.faqs)}${relBlock(sibs, base, `More ${esc(x.classLevel)} English Chapters`)}${aiCta}`;
}
function labBody(x, sibs, base) {
  const list = (arr, h) => (arr || []).length ? `<h2>${esc(h)}</h2><ul>${arr.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
  const theory = x.theory ? `<h2>Theory</h2><p>${nl2br(x.theory)}</p>` : '';
  const proc = (x.procedure || []).length ? `<h2>Procedure</h2><ol>${x.procedure.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : '';
  const obs = x.observation ? `<h2>Observation</h2><p>${nl2br(x.observation)}</p>` : '';
  const res = x.result ? `<h2>Result</h2><p>${nl2br(x.result)}</p>` : '';
  const viva = (x.viva || []).length ? `<h2>Viva Questions</h2>${x.viva.map((v) => `<h3>${esc(v.q)}</h3><p>${esc(v.a)}</p>`).join('')}` : '';
  return `<p class="speakable"><strong>Aim:</strong> ${esc(x.aim)}</p>${list(x.materials, 'Materials Required')}${theory}${proc}${obs}${res}${list(x.precautions, 'Precautions')}${viva}${relBlock(sibs, base, `More ${esc(x.classLevel)} ${esc(x.subject)} Practicals`)}${aiCta}`;
}
function gkBody(x, sibs, base) {
  const items = (x.items || []).length ? `<h2>${esc(x.title)}</h2><ul>${x.items.map((i) => `<li><strong>${esc(i.name)}:</strong> ${esc(i.detail)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${items}${faqBlock(x.faqs)}${relBlock(sibs, base, 'More GK Topics')}${aiCta}`;
}
function vocabBody(x, sibs, base) {
  const items = (x.items || []).length ? `<h2>${esc(x.title)}</h2><ul>${x.items.map((i) => `<li><strong>${esc(i.term)}</strong> — ${esc(i.meaning)}${i.example ? ` <em>(e.g. ${esc(i.example)})</em>` : ''}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${items}${faqBlock(x.faqs)}${relBlock(sibs, base, 'More Vocabulary Sets')}${aiCta}`;
}
function glossaryBody(g, sibs) {
  const def = `<p class="speakable"><strong>${esc(g.term)}:</strong> ${esc(g.defFull || g.definition)}</p>`;
  const expl = g.explanation ? `<h2>Explanation</h2><p>${nl2br(g.explanation)}</p>` : '';
  const ex = g.example ? `<h2>Example</h2><p>${nl2br(g.example)}</p>` : '';
  return `${def}${expl}${ex}${faqBlock(g.faqs)}${relBlock(sibs, '/glossary', `More ${esc(g.category || '')} Terms`)}${aiCta}`;
}
function revisionBody(x, sibs) {
  const secs = (x.sections || []).map((s) => `<h2>${esc(s.heading)}</h2><ul>${(s.points || []).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`).join('');
  const kt = (x.keyTerms || []).length ? `<h2>Key Terms</h2><ul>${x.keyTerms.map((t) => `<li><strong>${esc(t.term)}:</strong> ${esc(t.meaning)}</li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${secs}${kt}${faqBlock(x.faqs)}${relBlock(sibs, '/revision-notes', `More ${esc(x.classLevel)} ${esc(x.subject)} Revision Notes`)}${aiCta}`;
}

const GLOSSARY_DATA = getGlossary(ROOT);
ROUTES.push({
  path: '/glossary',
  title: 'Glossary — Key Science, Maths & Subject Definitions for Students | Syllab.in',
  description: `Free student glossary — clear definitions of ${GLOSSARY_DATA.length}+ key terms across Biology, Physics, Chemistry, Maths and more, with examples. CBSE/NCERT aligned.`,
  keywords: 'definition, glossary, what is photosynthesis, science definitions, maths definitions, CBSE terms, NCERT definitions',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Student Glossary', url: `${SITE}/glossary`, inLanguage: 'en-IN', isAccessibleForFree: true },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Student Glossary',
      description: `${GLOSSARY_DATA.length}+ key terms across Biology, Physics, Chemistry, Maths and more`,
      hasDefinedTerm: GLOSSARY_DATA.slice(0, 20).map(g => ({
        '@type': 'DefinedTerm',
        name: g.term,
        description: g.definition,
        url: `${SITE}/glossary/${g.slug}`,
      })),
    },
  ],
});
const GLOSS_BY_CAT = {};
for (const g of GLOSSARY_DATA) (GLOSS_BY_CAT[g.category || ''] ||= []).push(g);
for (const g of GLOSSARY_DATA) {
  const sibs = (GLOSS_BY_CAT[g.category || ''] || []).filter((y) => y.slug !== g.slug).slice(0, 6);
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Glossary', item: `${SITE}/glossary` },
    { '@type': 'ListItem', position: 2, name: g.term, item: `${SITE}/glossary/${g.slug}` },
  ] };
  ROUTES.push({
    path: `/glossary/${g.slug}`,
    title: `What is ${g.term}? Definition, Meaning & Example | Syllab.in`,
    description: g.definition,
    keywords: `${g.term.toLowerCase()} definition, what is ${g.term.toLowerCase()}, ${g.term.toLowerCase()} meaning, ${(g.category||'').toLowerCase()}`,
    noindex: true, // Post-March-2026 update: thin templated content drags domain quality.
    bodyHtml: glossaryBody(g, sibs),
    jsonLd: (g.faqs && g.faqs.length) ? [breadcrumb, faqJsonLd(g.faqs)] : breadcrumb,
  });
}

// ─── Revision Notes (/revision-notes, /revision-notes/:slug) ──────────────────
const REVISION_DATA = getRevisionNotes(ROOT);
ROUTES.push({
  path: '/revision-notes',
  title: 'CBSE Revision Notes Class 9 & 10 — Quick Chapter Notes | Syllab.in',
  description: `Free CBSE revision notes — ${REVISION_DATA.length}+ chapter-wise quick notes for Class 9 & 10 Science and Maths, with key points, formulas and FAQs. NCERT aligned.`,
  keywords: 'CBSE revision notes, class 10 science notes, class 10 maths notes, class 9 notes, quick revision notes, NCERT chapter notes',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'CBSE Revision Notes', url: `${SITE}/revision-notes`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
const REV_BY_GROUP = {};
for (const r of REVISION_DATA) (REV_BY_GROUP[`${r.classLevel}|${r.subject}`] ||= []).push(r);
for (const r of REVISION_DATA) {
  const sibs = (REV_BY_GROUP[`${r.classLevel}|${r.subject}`] || []).filter((y) => y.slug !== r.slug).slice(0, 6);
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Revision Notes', item: `${SITE}/revision-notes` },
    { '@type': 'ListItem', position: 2, name: `${r.chapter} (${r.classLevel} ${r.subject})`, item: `${SITE}/revision-notes/${r.slug}` },
  ] };
  ROUTES.push({
    path: `/revision-notes/${r.slug}`,
    title: `${r.chapter} ${r.classLevel} ${r.subject} — Revision Notes | Syllab.in`,
    description: r.intro,
    keywords: `${r.chapter.toLowerCase()} revision notes, ${r.classLevel.toLowerCase()} ${(r.subject||'').toLowerCase()} ${r.chapter.toLowerCase()} notes, cbse ${(r.subject||'').toLowerCase()} notes`,
    bodyHtml: revisionBody(r, sibs),
    jsonLd: (r.faqs && r.faqs.length) ? [breadcrumb, faqJsonLd(r.faqs)] : breadcrumb,
  });
}

// ─── Sample Papers (/sample-papers, /sample-papers/:slug) ─────────────────────
const SAMPLE_DATA = getSamplePapers(ROOT);
ROUTES.push({
  path: '/sample-papers',
  title: 'CBSE Sample Papers 2026 (with Solutions) — Class 9 to 12 | Syllab.in',
  description: `Free CBSE sample papers with solutions — ${SAMPLE_DATA.length}+ original model question papers for Class 9–12 Maths, Science, Social Science & English, exam-pattern with marking scheme and answers.`,
  keywords: 'CBSE sample papers, class 10 sample paper, class 9 sample paper, class 12 sample paper, model question paper, sample paper with solutions, practice paper',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'CBSE Sample Papers', url: `${SITE}/sample-papers`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const p of SAMPLE_DATA) {
  ROUTES.push({
    path: `/sample-papers/${p.slug}`,
    title: `${p.title} — Free PDF | Syllab.in`,
    description: p.intro,
    keywords: `${(p.classLevel||'').toLowerCase()} ${(p.subject||'').toLowerCase()} sample paper, cbse ${(p.subject||'').toLowerCase()} sample paper, ${(p.classLevel||'').toLowerCase()} model paper`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sample Papers', item: `${SITE}/sample-papers` },
      { '@type': 'ListItem', position: 2, name: p.title, item: `${SITE}/sample-papers/${p.slug}` },
    ] },
  });
}

// ─── New study clusters (maths tables, writing, mcqs, gk, vocab, literature) ──
// Rich crawlable body builders (answer block + real content + internal links).
function mathsTableBody(x, sibs, base) {
  const chart = (x.rows || []).length
    ? `<h2>${esc(x.title)} — Full Chart</h2><table><thead><tr>${(x.columns || []).map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${x.rows.slice(0, 40).map((r) => `<tr>${r.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
    : '';
  const faqs = (x.faqs || []).slice(0, 4);
  const faqHtml = faqs.length ? `<h2>FAQs</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}` : '';
  const rel = sibs.length ? `<h2>More Maths Tables & Charts</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(s.title)}</a></li>`).join('')}</ul>` : '';
  return `<p class="speakable">${esc(x.intro)}</p>${chart}${faqHtml}${rel}<p><a href="${base}">See all maths tables &amp; charts →</a></p>`;
}
function conceptBody(x, sibs, base) {
  const rel = sibs.length ? `<h2>Related ${esc(x.subject || '')} Concepts</h2><ul>${sibs.map((s) => `<li><a href="${base}/${s.slug}">${esc(s.title)} Explained</a></li>`).join('')}</ul>` : '';
  return `<p class="speakable"><strong>${esc(x.title)}:</strong> ${esc(x.intro)}</p><h2>${esc(x.title)} Explained Simply</h2><p>${esc(x.intro)}${x.classLevel || x.subject ? ` This is a key ${esc(x.subject || '')} concept${x.classLevel ? ` for ${esc(x.classLevel)}` : ''}.` : ''}</p>${rel}<p><a href="${base}">Browse all concepts →</a></p>`;
}
const STUDY_CLUSTERS = [
  { base: '/maths-tables', name: 'Maths Tables & Charts', kw: 'maths tables, multiplication table, squares cubes primes', data: getMathsTables(ROOT), label: (x) => x.title, titleSuffix: '— Full Chart & Quick Revision', body: mathsTableBody },
  { base: '/english-writing', name: 'English Writing Skills', kw: 'essay writing, letter writing, notice article speech writing', data: getEnglishWriting(ROOT), label: (x) => x.title },
  { base: '/mcqs', name: 'Chapter-wise MCQs', kw: 'MCQ with answers, objective questions, online test CBSE', data: getChapterMcqs(ROOT), label: (x) => `${x.chapter} (${x.classLevel} ${x.subject})`, body: mcqBody },
  { base: '/gk-facts', name: 'General Knowledge', kw: 'general knowledge, static GK, GK for exams', data: getStaticGk(ROOT), label: (x) => x.title, body: gkBody },
  { base: '/vocabulary', name: 'English Vocabulary', kw: 'idioms and phrases, proverbs, one word substitution, synonyms antonyms', data: getEnglishVocab(ROOT), label: (x) => x.title, body: vocabBody },
  { base: '/english-literature', name: 'English Literature', kw: 'english summary, character sketch, NCERT english chapter summary', data: getEnglishLiterature(ROOT), label: (x) => `${x.chapter} (${x.classLevel} English)`, body: litBody },
  { base: '/concepts', name: 'Concepts Explained', kw: 'concept explained, science maths concepts simple, real-life examples', data: getConcepts(ROOT), label: (x) => `${x.title} Explained`, body: conceptBody },
  { base: '/solved-examples', name: 'Solved Numerical Examples', kw: 'solved examples, numerical problems with solutions, step by step', data: getSolvedExamples(ROOT), label: (x) => `${x.chapter} Solved Examples (${x.classLevel} ${x.subject})`, body: solvedBody },
  { base: '/lab-practicals', name: 'Lab Practicals & Viva', kw: 'lab practical, science experiment procedure, viva questions, CBSE practical', data: getLabPracticals(ROOT), label: (x) => `${x.title} (${x.classLevel} ${x.subject} Practical)`, body: labBody },
  { base: '/visual-learning', name: 'Visual Learning — Interactive Diagrams', kw: 'animated diagrams, interactive diagrams, step by step science diagrams, water cycle photosynthesis heart', data: getVisualLessons(ROOT), label: (x) => `${x.title} — Interactive Diagram` },
  { base: '/timelines', name: 'History Timelines', kw: 'history timeline, indian freedom struggle timeline, mughal empire timeline, important dates history', data: getTimelines(ROOT), label: (x) => `${x.title} — Interactive Timeline` },
  { base: '/what-to-study', name: 'What to Study — Marks Weightage', kw: 'important chapters by marks, cbse weightage, what to study for boards, marks distribution', data: getWhatToStudy(ROOT), label: (x) => `Most Important Chapters — ${x.title}` },
  { base: '/pyqs', name: 'Previous Year Questions (PYQ)', kw: 'previous year questions, pyq chapter wise, board questions with solutions, important questions', data: getPyqs(ROOT), label: (x) => `${x.chapter} — Previous Year Questions (${x.classLevel} ${x.subject})`, body: pyqBody },
];
for (const c of STUDY_CLUSTERS) {
  ROUTES.push({ path: c.base, title: `${c.name} — Free for Students | Syllab.in`, description: `${c.name} — ${c.data.length}+ free resources for Indian students. ${c.kw}.`, keywords: c.kw, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, url: `${SITE}${c.base}`, inLanguage: 'en-IN', isAccessibleForFree: true } });
  // Group for sibling internal links (by category/subject/class when available).
  const gKey = (x) => x.category || x.subject || x.classLevel || 'all';
  const byGroup = {};
  for (const x of c.data) (byGroup[gKey(x)] ||= []).push(x);
  for (const x of c.data) {
    const nm = c.label(x);
    const route = {
      path: `${c.base}/${x.slug}`,
      title: `${nm} ${c.titleSuffix || ''} | Syllab.in`.replace(/\s+\|/, ' |'),
      description: x.intro || nm,
      keywords: `${nm.toLowerCase()}, ${c.kw}`,
      jsonLd: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: c.name, item: `${SITE}${c.base}` },
        { '@type': 'ListItem', position: 2, name: nm, item: `${SITE}${c.base}/${x.slug}` },
      ] },
    };
    if (c.body) {
      const sibs = (byGroup[gKey(x)] || []).filter((y) => y.slug !== x.slug).slice(0, 6);
      route.bodyHtml = c.body(x, sibs, c.base);
    }
    if (x.faqs && x.faqs.length) {
      route.jsonLd = [route.jsonLd, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: x.faqs.slice(0, 6).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }];
    }
    ROUTES.push(route);
  }
}

// ─── Medical / MBBS colleges (/medical-colleges, /:state, /:state/:slug) ──────
const { states: MED_STATES, colleges: MED_COLLEGES } = getMedicalManifest(ROOT);
ROUTES.push({
  path: '/medical-colleges',
  title: 'Top Medical Colleges in India (MBBS/BDS) — NEET Cutoffs, Fees & Admission | Syllab.in',
  description: 'Browse the top medical colleges in India by state — AIIMS, JIPMER and the best government & private MBBS colleges. Compare NEET cutoffs, MBBS fees, seats and the full admission process. Free.',
  keywords: 'top medical colleges India, MBBS colleges by state, NEET cutoff colleges, AIIMS MBBS fees, best government medical colleges, private MBBS colleges fees, NEET college list',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Top Medical Colleges in India', url: `${SITE}/medical-colleges`, inLanguage: 'en-IN', isAccessibleForFree: true },
});
for (const s of MED_STATES) {
  const inState = MED_COLLEGES.filter((c) => c.stateSlug === s.slug);
  if (!inState.length) continue;
  ROUTES.push({
    path: `/medical-colleges/${s.slug}`,
    title: `Top Medical Colleges in ${s.name} (MBBS) — NEET Cutoffs & Fees 2026 | Syllab.in`,
    description: `Best MBBS medical colleges in ${s.name} — NEET cutoffs, MBBS fees, seats and admission process. ${s.blurb}`,
    keywords: `medical colleges in ${s.name}, MBBS colleges ${s.name}, NEET cutoff ${s.name}, ${s.name} government medical colleges, MBBS fees ${s.name}`,
    bodyHtml: `<ul>${inState.map((c) => `<li><a href="/medical-colleges/${s.slug}/${c.slug}">${esc(c.name)}</a> — ${esc(c.city)}, ${esc(c.type)}; MBBS fees ${esc(c.feesPerYear)}/yr, ${c.mbbsSeats} seats, NEET: ${esc(c.neetCutoff)}</li>`).join('')}</ul>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Medical Colleges in ${s.name}`, url: `${SITE}/medical-colleges/${s.slug}`, inLanguage: 'en-IN' },
  });
}
for (const c of MED_COLLEGES) {
  const u = `${SITE}/medical-colleges/${c.stateSlug}/${c.slug}`;
  ROUTES.push({
    path: `/medical-colleges/${c.stateSlug}/${c.slug}`,
    title: `${c.name} — MBBS Fees, NEET Cutoff, Seats & Admission | Syllab.in`,
    description: `${c.name}, ${c.city}: MBBS fees ${c.feesPerYear}/yr, ${c.neetCutoff}, ${c.mbbsSeats} seats${c.nirf ? `, NIRF #${c.nirf}` : ''}. Admission via NEET UG — full process, courses, internship & hostel.`,
    keywords: `${c.name} fees, ${c.shortName} NEET cutoff, ${c.name} MBBS admission, ${c.name} seats, ${c.city} medical college`,
    bodyHtml: `<p>${esc(c.about)}</p><p><strong>MBBS fees:</strong> ${esc(c.feesPerYear)}/yr (${esc(c.feesTotal)} full course). <strong>Seats:</strong> ${c.mbbsSeats}. <strong>NEET cutoff (indicative):</strong> ${esc(c.neetCutoff)}.</p><h2>Admission process (NEET UG)</h2><ol>${(c.admissionSteps || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: c.name, foundingDate: String(c.established), url: `https://${c.website}`, address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: c.state, addressCountry: 'IN' } },
  });
}

// ─── College Finder: colleges-accepting/<exam> + best-colleges/<course> ───────
const CF_EXAMS = [['jee-main','JEE Main'],['jee-advanced','JEE Advanced'],['neet','NEET'],['bitsat','BITSAT'],['viteee','VITEEE'],['tnea','TNEA'],['kcet','KCET'],['comedk','COMEDK'],['mht-cet','MHT-CET'],['ts-eapcet','TS EAPCET'],['ap-eapcet','AP EAPCET'],['wbjee','WBJEE']];
const CF_COURSES = [['cse','CSE','Computer Science Engineering'],['ai-ml','AI/ML','AI, ML & Data Science'],['ece','ECE','Electronics & Communication'],['it','IT','Information Technology'],['electrical','Electrical','Electrical Engineering'],['mechanical','Mechanical','Mechanical Engineering'],['civil','Civil','Civil Engineering'],['mbbs','MBBS','MBBS (Medical)']];
ROUTES.push({ path: '/colleges-accepting', title: 'Colleges Accepting JEE, NEET, EAMCET, KCET & More (2026) | Syllab.in', description: 'Find the colleges that accept each entrance exam — JEE Main, JEE Advanced, NEET, BITSAT, VITEEE, KCET, COMEDK, MHT-CET, EAMCET, WBJEE. Fees, cutoffs & admission, free.', keywords: 'colleges accepting jee main, colleges accepting neet, colleges accepting kcet, exam wise college list india', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Colleges by Entrance Exam', url: `${SITE}/colleges-accepting`, inLanguage: 'en-IN' } });
for (const [slug, label] of CF_EXAMS) {
  ROUTES.push({ path: `/colleges-accepting/${slug}`, title: `Colleges Accepting ${label} (2026) — Full List, Fees & Cutoffs | Syllab.in`, description: `Complete list of top colleges that accept ${label} — fees, cutoffs, seats and the admission process. Free and indicative for guidance.`, keywords: `colleges accepting ${label.toLowerCase()}, ${label.toLowerCase()} college list, ${label.toLowerCase()} cutoff colleges, ${label.toLowerCase()} colleges fees`, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Colleges accepting ${label}`, url: `${SITE}/colleges-accepting/${slug}`, inLanguage: 'en-IN' } });
}
ROUTES.push({ path: '/best-colleges', title: 'Best Colleges by Course — CSE, ECE, MBBS & More (2026 Rankings) | Syllab.in', description: 'Find the best colleges in India for your course — CSE, AI/ML, ECE, IT, Mechanical, Civil and MBBS. Ranked by NIRF with fees, cutoffs & placements. Free.', keywords: 'best CSE colleges India, best MBBS colleges India, best ECE colleges, course wise college ranking', jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Best Colleges by Course', url: `${SITE}/best-colleges`, inLanguage: 'en-IN' } });
for (const [slug, short, full] of CF_COURSES) {
  ROUTES.push({ path: `/best-colleges/${slug}`, title: `Best ${short} Colleges in India 2026 — Ranking, Fees & Cutoffs | Syllab.in`, description: `Top ${full} colleges in India — ranked by NIRF with fees, cutoffs, placements and admission. Free and indicative.`, keywords: `best ${short.toLowerCase()} colleges india, top ${short.toLowerCase()} colleges, ${short.toLowerCase()} college ranking, ${full.toLowerCase()} fees cutoff`, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Best ${short} Colleges in India`, url: `${SITE}/best-colleges/${slug}`, inLanguage: 'en-IN' } });
}

// ─── Scholarships (free, highly-linkable resource page) ───────────────────────
ROUTES.push({
  path: '/scholarships',
  title: 'Scholarships for Students in India 2026 — Govt, State & Private (Free List) | Syllab.in',
  description: 'Free, updated list of scholarships for Indian students — NSP pre/post-matric, NMMS, PM YASASVI, INSPIRE, AICTE Pragati/Saksham, Reliance, Tata & more. Eligibility, amount, deadlines and how to apply.',
  keywords: 'scholarships for students India 2026, NSP scholarship, NMMS scholarship, INSPIRE scholarship, PM YASASVI, AICTE Pragati, private scholarships India, scholarship class 10 12',
  jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Scholarships for Students in India', url: `${SITE}/scholarships`, inLanguage: 'en-IN', isAccessibleForFree: true },
});

// ─── Embed / Link-to-us (backlink enabler page) ───────────────────────────────
ROUTES.push({
  path: '/embed',
  title: 'Link to Syllab — Free Embed Badges & Widgets for Your Site | Syllab.in',
  description: "Add Syllab's free study resources to your school site, blog or classroom page. Copy-paste badges and widgets linking to free NCERT solutions, formula sheets and more — 100% free.",
  keywords: 'link to syllab, embed free study tools, education widget for website, free ncert solutions widget',
  jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Link to Syllab', url: `${SITE}/embed`, inLanguage: 'en-IN' },
});

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

// Keyword-targeted "<subject> for kids" SEO landing pages.
for (const k of [
  { p: '/maths-for-kids', kw: 'maths for kids', t: 'Maths for Kids — Free, Fun & Online (Pre-KG to Class 5) | Syllab.in', d: 'Free Maths for Kids — counting, shapes, addition, tables and printable worksheets through fun games. Pre-KG to Class 5, no signup. 100% free for Indian kids.' },
  { p: '/science-for-kids', kw: 'science for kids', t: 'Science for Kids — Free, Fun & Online (Animated) | Syllab.in', d: 'Free Science for Kids — animals, plants, the human body, weather and space with animated diagrams and activities. Pre-KG to Class 5, completely free.' },
  { p: '/english-for-kids', kw: 'english for kids', t: 'English for Kids — Free Alphabet, Phonics, Rhymes & Stories | Syllab.in', d: 'Free English for Kids — alphabet, phonics, sight words, rhymes and stories with audio, plus printable worksheets. Pre-KG to Class 5, no signup.' },
]) {
  ROUTES.push({ path: k.p, title: k.t, description: k.d, keywords: `${k.kw}, ${k.kw} free, ${k.kw} online, free ${k.kw} india, ${k.kw} games, ${k.kw} worksheets`, jsonLd: [{ '@context': 'https://schema.org', '@type': 'LearningResource', name: k.t, description: k.d, educationalLevel: 'Pre-KG to Class 5', inLanguage: 'en-IN', isAccessibleForFree: true }] });
}
ROUTES.push({
  path: '/quiz-duel',
  title: 'Quiz Duel — Free 1v1 GK Quiz Battle for Students | Syllab.in',
  description: 'Battle the AI or challenge a friend in a fast, timed GK quiz duel. 8 questions, beat the clock and share your score on WhatsApp — free for Indian students.',
  keywords: 'quiz battle, gk quiz duel, 1v1 quiz game, online quiz students India, challenge friend quiz, free quiz game',
  jsonLd: [{ '@context': 'https://schema.org', '@type': 'Game', name: 'Syllab Quiz Duel', url: `${SITE}/quiz-duel`, inLanguage: 'en-IN', isAccessibleForFree: true }],
});
ROUTES.push({
  path: '/study-room',
  title: 'AI Study Room — Focus Timer, Study Music & AI Tutor (Free) | Syllab.in',
  description: 'Free AI study room for Indian students: Pomodoro focus timer, calming study ambience, exam countdowns, a voice AI tutor for instant doubts, break reminders and study-streak tracking — like having a tuition teacher beside you.',
  keywords: 'study room online free, pomodoro timer study, AI tutor voice India, study with me focus timer, study music free, exam countdown CBSE JEE NEET, distraction blocker study, online study room India students, virtual study room free',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab AI Study Room', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/study-room`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Is the Syllab Study Room free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the focus timer, study ambience, exam countdowns and break reminders are completely free. The AI tutor answers your doubts on demand at no cost.' } },
      { '@type': 'Question', name: 'Does it work like a personal tuition teacher?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You set a study goal, the Pomodoro timer keeps you focused with automatic breaks, and the built-in AI teacher explains any doubt by text or voice and can plan your study session.' } },
      { '@type': 'Question', name: 'Is the focus camera private?', acceptedAnswer: { '@type': 'Answer', text: 'Completely. The optional focus camera runs only on your device as a focus mirror — nothing is ever recorded or uploaded.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/calculators',
  title: 'Free Student Calculators — Percentage, CGPA & Attendance | Syllab.in',
  description: 'Free online calculators for Indian students: marks-to-percentage, CGPA to percentage (CBSE 9.5 rule) and back, and an attendance "can I bunk?" calculator. Instant, no signup, no ads.',
  keywords: 'percentage calculator, CGPA to percentage calculator, CBSE CGPA calculator, attendance calculator, can I bunk calculator, marks percentage calculator India, student calculators free',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Student Calculators', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/calculators`, inLanguage: 'en-IN', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How do I convert CGPA to percentage?', acceptedAnswer: { '@type': 'Answer', text: 'Under the CBSE rule, Percentage = CGPA × 9.5. For example, a 9.2 CGPA equals 87.4%. Use the free Syllab calculator to convert instantly both ways.' } },
      { '@type': 'Question', name: 'How many classes can I skip and keep 75% attendance?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your attended and total classes with a 75% target in the attendance calculator — it instantly shows how many classes you can skip while staying at or above your target.' } },
    ] },
  ],
});

ROUTES.push({
  path: '/worksheets',
  title: 'Free Printable Worksheets — Letters, Phonics, Maths, Reading & More (PDF) | Syllab.in',
  description: 'Download 100+ free printable worksheets for Pre-KG to Class 2 kids: letters & tracing, phonics & beginning sounds, vocabulary & sight words, reading comprehension, early writing, numbers & counting, simple maths, shapes, colours, science and social-emotional learning — print or save as PDF. Free, watermarked, made-in-India.',
  keywords: 'free printable worksheets, alphabet tracing worksheets pdf, phonics worksheets, sight words worksheet, reading comprehension worksheets kids, addition subtraction worksheets, number tracing worksheet, counting worksheets preschool, shapes worksheet kids, colors worksheet, science worksheets kindergarten, social emotional worksheets, kindergarten worksheets free download India, pre-kg worksheets pdf, LKG UKG worksheets',
  jsonLd: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Free Printable Worksheets', url: `${SITE}/worksheets`, inLanguage: 'en-IN', isAccessibleForFree: true },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are the worksheets free to download?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — every worksheet is free to print or save as PDF. No signup, no payment. Each carries a small syllab.in watermark.' } },
      { '@type': 'Question', name: 'What worksheets are available?', acceptedAnswer: { '@type': 'Answer', text: 'Over 100 worksheets across 12 categories: Letters, Phonics, Vocabulary, Reading, Writing, Numbers & Counting, Simple Math, Shapes, Colors, Science, Social & Emotional and Other Activities — designed for Pre-KG to Class 2. More are added regularly.' } },
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
    // 'ai-agents' topics live in ai-agents.ts (merged into ai-learning at runtime),
    // so they aren't an id: in index.ts. Register the lang so /coding/ai-agents/:topic
    // pages get prerendered with a self-canonical (fixes GSC "alternate page with
    // proper canonical tag" where they fell back to the homepage canonical).
    if (!languages.includes('ai-agents')) languages.push('ai-agents');
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

  // Trust badge (#2) — the "free / no login" edge competitors that gate content
  // (Vedantu, BYJU'S, Toppr) literally cannot match. Visible + high-CTR.
  const trustBadge = `
    <div style="margin: 0 0 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.8rem; font-weight: 700;">
      <span style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:999px;">✓ 100% Free</span>
      <span style="background:#dbeafe;color:#1e40af;padding:4px 10px;border-radius:999px;">✓ No Login Needed</span>
      <span style="background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:999px;">✓ NCERT / CBSE Aligned</span>
      <span style="background:#f3e8ff;color:#6b21a8;padding:4px 10px;border-radius:999px;">✓ Download as PDF</span>
    </div>`;

  // E-E-A-T: TL;DR summary + reviewer byline (author authority + freshness signals)
  const tldrBlock = `
    ${trustBadge}
    <div style="margin: 1.5rem 0; padding: 1rem; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
      <p class="speakable" style="margin: 0; font-weight: 600; color: #2e7d32; font-size: 0.95rem;"><strong>TL;DR:</strong> ${esc(desc.length > 150 ? desc.slice(0, 150).trim() + '…' : desc)}</p>
    </div>
    <p style="margin: 1rem 0; font-size: 0.85rem; color: #666;">Written &amp; reviewed by the <strong>Syllab.in Academic Team</strong> (CBSE/NCERT subject experts) · Updated <time datetime="${today}">${formattedDate}</time></p>
    <div style="margin: 1rem 0; padding: 0.85rem 1rem; background:#eef2ff; border:1px solid #c7d2fe; border-radius:8px; font-size:0.9rem;">
      🤖 <strong>Stuck on any question?</strong> Ask <a href="/ai-tutor" style="color:#4f46e5;font-weight:700;text-decoration:none;">Syllab's free AI Tutor</a> for a step-by-step explanation — instant, unlimited, no login.
    </div>`;

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
        <li><a href="/live-quiz" style="color: #0066cc; text-decoration: none;">Live Quiz</a></li>
        <li><a href="/doubt-solver" style="color: #0066cc; text-decoration: none;">Doubt Solver</a></li>
        <li><a href="/micro" style="color: #0066cc; text-decoration: none;">Microlearning</a></li>
        <li><a href="/free-alternatives" style="color: #0066cc; text-decoration: none;">Free Alternatives</a></li>
        <li><a href="/kids" style="color: #0066cc; text-decoration: none;">Kids Zone</a></li>
        <li><a href="/study-room" style="color: #0066cc; text-decoration: none;">Study Room</a></li>
        <li><a href="/calculators" style="color: #0066cc; text-decoration: none;">Calculators</a></li>
        <li><a href="/worksheets" style="color: #0066cc; text-decoration: none;">Worksheets</a></li>
      </ul>
    </nav>
  `;

  // Route-specific rich content
  let richContent = '';

  // Routes that ship their own static body HTML (e.g. Privacy, Terms) — so the real
  // policy text is in the prerendered HTML for crawlers/reviewers that don't run JS.
  if (route.bodyHtml) {
    richContent = `<div style="margin-top:1.5rem;line-height:1.7;">${route.bodyHtml}</div>`;
  }

  // NCERT chapter pages — render actual Q&A for high SEO value + numbered list + table
  const ncertMatch = route.path.match(/^\/ncert-solutions\/class-(\d+)\/([a-z-]+)\/([a-z-]+)$/);
  if (ncertMatch) {
    const [, classLevel, subjSlug, chapSlug] = ncertMatch;
    const ncertKey = `${classLevel}::${slugToSubject(subjSlug)}::${chapSlug}`;
    const ncertData = getNcertData();
    const qas = ncertData[ncertKey] || [];

    if (qas.length > 0) {
      const displayLimit = Math.min(6, qas.length); // Show first 6 Q&A as rich, indexable static content
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
              ${esc(qa.solution).slice(0, 500)}${qa.solution.length > 500 ? '...' : ''}
            </div>
          </div>
        `;
      }
      richContent += `<p style="color: #666; font-size: 0.9rem; font-style: italic;">Showing ${displayLimit} of ${qas.length} questions. Visit the full page for complete solutions.</p>`;

      // Sibling-chapter interlinking — link other chapters in the same class + subject
      // (internal linking + topical clustering + dwell time; reuses existing data).
      const siblings = NCERT_CHAPTERS.filter((c) => c.classLevel === classLevel && c.subjSlug === subjSlug && c.chapSlug !== chapSlug);
      if (siblings.length) {
        richContent += `<div style="margin-top: 2rem;"><h2 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #333;">More Class ${classLevel} ${esc(slugToSubject(subjSlug))} NCERT Solutions</h2><ul style="line-height: 1.9; padding-left: 1.25rem;">`;
        for (const s of siblings) {
          richContent += `<li><a href="/ncert-solutions/class-${s.classLevel}/${s.subjSlug}/${s.chapSlug}" style="color: #0066cc; text-decoration: none;">${esc(s.title)} — Class ${s.classLevel} ${esc(s.subject)} NCERT Solutions</a></li>`;
        }
        richContent += `</ul></div>`;
      }
      richContent += `</div>`;
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

  // GK Questions cluster — unique intro + topic coverage + class cross-links
  else if (route.path === '/gk-questions' || route.path.startsWith('/gk-questions/class-')) {
    const m = route.path.match(/class-(\d+)/);
    const c = m ? m[1] : null;
    const topics = ['History', 'Geography', 'Polity & Civics', 'Science', 'Static GK', 'Current Affairs'];
    richContent = `
      <div style="margin-top: 1.5rem; color: #444; line-height: 1.8; font-size: 0.97rem;">
        <p>${c
          ? `Practise free <strong>General Knowledge questions for Class ${c}</strong> with answers and clear explanations. Every question is age-appropriate and aligned to what Indian students learn in school and need for quizzes, olympiads and competitive exams.`
          : `Free <strong>General Knowledge questions and answers</strong> for Indian students from Class 5 to 12 — with explanations, organised by topic, and a timed quiz to test yourself.`}
        </p>
        <h2 style="font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: #333;">Topics covered</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          ${topics.map((t) => `<li>${t}</li>`).join('')}
        </ul>
        <h2 style="font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: #333;">GK questions by class</h2>
        <ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${[5, 6, 7, 8, 9, 10, 11, 12].map((n) => `<li><a href="/gk-questions/class-${n}" style="color:#0066cc;text-decoration:none;">Class ${n} GK</a></li>`).join('')}
        </ul>
        <p style="margin-top: 1.25rem;"><a href="/gk-quiz" style="color:#0066cc;font-weight:600;text-decoration:none;">▶ Play the interactive GK Quiz</a></p>
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

  // Homepage uses H2 because the React app renders the primary H1 ("Learn smarter with AI by your side").
  // For all other pages, use H1 for the page title.
  const headingTag = route.path === '/' ? 'h2' : 'h1';

  return `
    <article style="max-width: 800px; margin: 0 auto; padding: 1rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6;">
      ${breadcrumb}
      <${headingTag} style="font-size: 1.8rem; margin: 0.5rem 0 1rem 0; color: #222;">${esc(title)}</${headingTag}>
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

// Pick the best Open Graph card for a page type (better social CTR than one
// generic image). Falls back to the default site card.
function ogImageFor(p) {
  if (p.startsWith('/worksheets')) return 'og-worksheets';
  if (p.startsWith('/kids')) return 'og-kids';
  if (p.startsWith('/study-room')) return 'og-study-room';
  if (p.startsWith('/gk-questions') || p.startsWith('/gk-quiz')) return 'og-gk';
  if (p.startsWith('/mock-tests')) return 'og-mock';
  if (p.startsWith('/coding')) return 'og-coding';
  return 'og-image';
}

function buildHeadBlock(route) {
  const canonical = `${SITE}${route.path}`;
  const robots = route.noindex
    ? 'noindex,follow' // follow (not nofollow): pruned thin pages still pass link equity
    : 'index,follow,max-image-preview:large,max-snippet:-1';
  const ogImg = `${SITE}/${ogImageFor(route.path)}.png`;

  const lines = [
    `  <title>${esc(route.title)}</title>`,
    `  <meta name="description" content="${esc(route.description)}" />`,
    `  <meta name="keywords" content="${esc(route.keywords || '')}" />`,
    `  <meta name="robots" content="${robots}" />`,
    `  <meta name="googlebot" content="${robots}" />`,
    `  <link rel="canonical" href="${canonical}" />`,
    `  <link rel="alternate" hreflang="en-IN" href="${canonical}" />`,
    `  <link rel="alternate" hreflang="en" href="${canonical}" />`,
    `  <link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `  <link rel="alternate" type="application/rss+xml" title="Syllab.in Blog — Free Exam Prep & Study Updates" href="${SITE}/feed.xml" />`,
    `  <meta property="og:title" content="${esc(route.title)}" />`,
    `  <meta property="og:description" content="${esc(route.description)}" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="Syllab.in" />`,
    `  <meta property="og:locale" content="en_IN" />`,
    `  <meta property="og:image" content="${ogImg}" />`,
    `  <meta property="og:image:width" content="1200" />`,
    `  <meta property="og:image:height" content="630" />`,
    `  <meta property="og:image:type" content="image/png" />`,
    `  <meta property="og:image:alt" content="${esc(route.title)}" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${esc(route.title)}" />`,
    `  <meta name="twitter:description" content="${esc(route.description)}" />`,
    `  <meta name="twitter:image" content="${ogImg}" />`,
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

  // WebPage + Speakable (so voice assistants / AI search know the concise answer
  // to read & cite) + author/publisher Organization (E-E-A-T trust signals).
  const todayISO = new Date().toISOString().split('T')[0];
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: String(route.title).split('|')[0].split('—')[0].trim(),
    url: canonical,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'Syllab.in', url: `${SITE}/` },
    publisher: { '@type': 'Organization', name: 'Syllab.in', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` } },
    author: { '@type': 'Organization', name: 'Syllab Editorial Team', url: `${SITE}/about` },
    dateModified: todayISO,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.speakable'] },
  };
  lines.push(
    `  <script type="application/ld+json">`,
    `  ${JSON.stringify(webPage, null, 2).split('\n').join('\n  ')}`,
    `  </script>`,
  );

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
function injectMeta(baseHtml, route, ssrBody) {
  const headBlock = buildHeadBlock(route);
  const bodyContent = buildBodyContent(route);

  // Strip any pre-existing <title> in the template so we never emit two <title>
  // tags (the default index.html title was surviving outside the replaced block,
  // producing duplicate titles on every prerendered page — bad for SEO).
  baseHtml = baseHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');

  // Strip the base index.html's hardcoded hreflang (it points to the homepage),
  // so each page keeps only its own self-referencing hreflang from the head block.
  baseHtml = baseHtml.replace(/\s*<link[^>]*rel="alternate"[^>]*hreflang=[^>]*>/gi, '');

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

  // Option A (CWV/CLS fix): instead of putting the SEO body INSIDE #root (where React
  // wipes it on mount → massive layout shift), we put a stable boot SKELETON in #root
  // (matches the app's fixed 80px header + content area → near-zero CLS when React takes
  // over) and move the crawlable SEO content into a visually-hidden sibling (#prerender-seo).
  // Non-JS crawlers still read the SEO content; React removes the hidden block on mount.
  const bootSkeleton =
    '<div id="boot-skeleton" aria-hidden="true">' +
    '<div class="bs-nav"><div class="bs-logo"></div></div>' +
    '<div class="bs-main">' +
    '<div class="bs-blk bs-title"></div>' +
    '<div class="bs-blk bs-line w90"></div>' +
    '<div class="bs-blk bs-line w80"></div>' +
    '<div class="bs-blk bs-line w70"></div>' +
    '<div class="bs-blk bs-card"></div>' +
    '</div></div>';
  const seoBlock =
    '<div id="prerender-seo" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">' +
    bodyContent + '</div>';

  if (ssrBody) {
    // TRUE SSR path: ship the real server-rendered app inside #root so the client
    // HYDRATES it (no re-render, content visible from the first byte). Mark the
    // document so main.tsx chooses hydrateRoot over createRoot. The per-route SEO
    // <head> is still produced by buildHeadBlock above, so we DON'T need the
    // hidden #prerender-seo fallback or the boot skeleton anymore.
    baseHtml = baseHtml.replace(/<html(\s|>)/i, '<html data-ssr="true"$1');
    baseHtml = baseHtml.replace(
      /<div\s+id="root"[\s\S]*?<\/div>/i,
      () => `<div id="root">${ssrBody}</div>`,
    );
    return baseHtml;
  }

  // Fallback (no SSR body): boot skeleton in #root + hidden crawlable SEO sibling.
  // Function replacer avoids `$`-sequence interpretation in bodyContent.
  baseHtml = baseHtml.replace(
    /<div\s+id="root"[\s\S]*?<\/div>/i,
    () => `<div id="root">${bootSkeleton}</div>\n  ${seoBlock}`,
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

  // ── Optional TRUE SSR ──────────────────────────────────────────────────────
  // When SSR_PRERENDER=1, render each route's REAL app HTML via entry-server.tsx
  // (React 19 prerender → resolves lazy routes) and hydrate on the client. Falls
  // back per-route to the boot-skeleton path if a render throws, so the build is
  // never blocked. SSR_LIMIT=N renders only the first N routes (for fast testing).
  // SSR auto-enables when the compiled bundle exists (so `npm run build` does it
  // with no fragile cross-platform env vars). Scope: an allowlist of routes —
  // default just the homepage `/` (the LCP-critical landing page), verified to
  // hydrate cleanly. Override with SSR_ROUTES="/,/x" or SSR_LIMIT=N for testing.
  const SSR_BUNDLE = path.join(ROOT, 'dist-ssr', 'entry-server.js');
  const SSR = process.env.SSR_PRERENDER === '1' || existsSync(SSR_BUNDLE);
  const SSR_LIMIT = process.env.SSR_LIMIT ? parseInt(process.env.SSR_LIMIT, 10) : null;
  // Allowlist: homepage only for now. The homepage hydrates cleanly; broader
  // content/hub pages currently throw a hydration mismatch (React #418) and must
  // have that root-caused before they're added here (else the LCP benefit erodes
  // and the console fills with errors). Override/expand via SSR_ROUTES="/,/x".
  const DEFAULT_SSR_ROUTES = ['/'];
  const SSR_ROUTES = new Set(
    process.env.SSR_ROUTES
      ? process.env.SSR_ROUTES.split(',').map((s) => s.trim()).filter(Boolean)
      : DEFAULT_SSR_ROUTES,
  );
  let render = null;
  let ssrOk = 0;
  let ssrFail = 0;
  if (SSR) {
    // Import the COMPILED SSR bundle (dist-ssr/entry-server.js), NOT vite's dev
    // ssrLoadModule — the dev module loader degrades after a few hundred sequential
    // renders (it started baking Suspense fallbacks into later routes). The compiled
    // bundle resolves React.lazy via real chunks and renders all 3,900+ routes
    // consistently. Build it first: `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
    const { pathToFileURL } = await import('node:url');
    const entryPath = path.join(ROOT, 'dist-ssr', 'entry-server.js');
    try {
      ({ render } = await import(pathToFileURL(entryPath).href));
    } catch (e) {
      console.error(`❌ SSR bundle not found at ${entryPath}. Run \`vite build --ssr src/entry-server.tsx --outDir dist-ssr\` first.`);
      throw e;
    }
    console.log('🔧 SSR mode ON — rendering real app HTML from compiled bundle.');
  }

  let written = 0;
  let skipped = 0;
  let i = 0;

  for (const route of ROUTES) {
    i++;
    // Convert "/some-path" → "dist/some-path/index.html"
    const routeDir = path.join(DIST, ...route.path.split('/').filter(Boolean));
    const outFile = path.join(routeDir, 'index.html');

    try {
      let ssrBody;
      const ssrThisRoute = SSR_LIMIT != null ? i <= SSR_LIMIT : SSR_ROUTES.has(route.path);
      if (render && ssrThisRoute) {
        try {
          const { body } = await render(route.path);
          if (body && body.length > 200) { ssrBody = body; ssrOk++; }
          else ssrFail++;
        } catch (e) {
          ssrFail++;
          if (ssrFail <= 5) console.warn(`   ⚠️  SSR render failed for ${route.path}: ${String(e).split('\n')[0].slice(0, 80)}`);
        }
      }
      const injected = injectMeta(baseHtml, route, ssrBody);
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(outFile, injected, 'utf8');
      written++;
    } catch (err) {
      console.warn(`⚠️  Skipped ${route.path}: ${err.message}`);
      skipped++;
    }
  }

  if (SSR) console.log(`   SSR bodies: ${ssrOk} rendered, ${ssrFail} fell back to skeleton.`);

  console.log(`✅ Pre-render complete: ${written} routes written, ${skipped} skipped.`);
  console.log(`   Routes: ${ROUTES.map(r => r.path).join(', ')}`);
}

main().catch(err => {
  console.error('❌ Pre-render failed:', err);
  process.exit(1);
});
