/**
 * updateArticles.ts — Full article content for the Updates page.
 * Every article is complete — no "coming soon", no placeholders.
 * 50% evergreen + 50% trending content for SEO.
 */

export interface ArticleSection {
  heading: string;
  body: string; // paragraphs separated by \n\n
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface FullArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  updatedAt: string;
  author: string;
  emoji: string;
  coverColor: string;
  tags: string[];
  trending?: boolean;
  pinned?: boolean;
  sections: ArticleSection[];
  faq: ArticleFAQ[];
  relatedLinks: { label: string; tab: string }[];
}

export const FULL_ARTICLES: FullArticle[] = [
  /* ──────────────────────────────────────────────────────────────────
     AI TOOLS
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'a1', slug: 'claude-sonnet-4-5-for-students', category: 'ai-tools',
    title: 'Claude Sonnet 4.5: What Students Need to Know in 2026',
    summary: "Anthropic's Claude Sonnet 4.5 is faster and smarter. Here's how students can use it for NCERT concepts, essays, Python debugging, and exam prep — completely free.",
    seoTitle: 'Claude Sonnet 4.5 for Students 2026 | Free AI Study Guide | Syllab.in',
    seoDescription: 'Learn how to use Claude Sonnet 4.5 for NCERT revision, Python debugging, essay writing, and JEE/NEET prep. Free guide for Indian students.',
    readingTime: 6, updatedAt: '2026-05-20', author: 'Syllab Team',
    emoji: '🤖', coverColor: 'from-violet-600 to-purple-800',
    tags: ['Claude', 'AI Tutor', 'Free AI'], trending: true,
    sections: [
      {
        heading: 'What is Claude Sonnet 4.5?',
        body: `Claude Sonnet 4.5 is the latest AI assistant from Anthropic, released in 2025. It is significantly faster than earlier Claude versions while being smarter at reasoning, mathematics, coding, and long-form writing. For students in India, it is one of the best free AI tools available right now.\n\nUnlike ChatGPT or Gemini, Claude is particularly good at following detailed instructions, explaining concepts step-by-step, and giving honest answers when it doesn't know something — which makes it safer for exam preparation.`,
      },
      {
        heading: '5 Ways Students Can Use Claude for Studying',
        body: `**1. NCERT Chapter Explanations**\nType: "Explain Class 10 Science Chapter: Chemical Reactions and Equations in simple language with examples." Claude gives you a clean, structured explanation that's easier to understand than the textbook.\n\n**2. Essay and Answer Writing**\nPaste your rough draft and ask: "Improve this essay for Class 12 English with better vocabulary and structure." Claude rewrites it while keeping your original ideas.\n\n**3. Python and Java Debugging**\nPaste your broken code and ask what's wrong. Claude explains the exact error in plain English and gives you the corrected version with explanation.\n\n**4. MCQ Practice**\nAsk: "Give me 10 MCQs on Newton's Laws for Class 9 with answers and explanations." You get instant practice with correct explanations.\n\n**5. Formula and Definition Sheets**\nAsk: "Give me all important formulas for Class 12 Physics Electrostatics in one table." You get a clean, printable revision sheet.`,
      },
      {
        heading: 'How to Access Claude for Free',
        body: `Go to claude.ai on any browser — mobile or desktop. The free tier includes Claude Sonnet 4.5 with a generous daily limit. No credit card is required. Sign up with your Google account and start chatting immediately.\n\nFor Indian students, the free tier is more than enough for daily study sessions. You get around 50–80 messages per day on the free plan.`,
      },
      {
        heading: 'Tips to Get Better Answers from Claude',
        body: `**Be specific:** Instead of "explain maths," say "explain the quadratic formula for Class 10 with 2 solved examples."\n\n**Set context:** Start with "I am a Class 11 student preparing for JEE. Please explain..." — Claude adjusts its level automatically.\n\n**Ask for Indian examples:** Add "use Indian examples like cricket, ISRO, or cooking" to get relatable explanations.\n\n**Quiz yourself:** After Claude explains a topic, ask "Now give me 5 questions to test my understanding." This is more effective than re-reading.\n\n**Request step-by-step:** For Maths and Physics, always say "solve this step-by-step and explain each step."`,
      },
      {
        heading: 'Safety Tips for Students',
        body: `Claude is helpful but not perfect. For official exam dates, syllabus changes, and admit card information, always verify on the official website (cbse.gov.in, nta.ac.in, jeemain.nta.nic.in).\n\nNever submit Claude-generated essays or code as your own without understanding and rewriting them. Use it to learn and improve, not to copy. Teachers can often detect AI-written content that hasn't been personalised.`,
      },
    ],
    faq: [
      { question: 'Is Claude free for students?', answer: 'Yes. claude.ai has a free tier with Claude Sonnet 4.5. No credit card needed. You get approximately 50–80 messages per day on the free plan.' },
      { question: 'Is Claude better than ChatGPT for studying?', answer: 'Claude is generally better for long explanations, coding help, and honest answers. ChatGPT is better for creative writing and brainstorming. Both are useful — try both and see which suits you.' },
      { question: 'Can Claude explain NCERT topics?', answer: 'Yes, very well. Just specify your class, subject, and chapter name. Ask for examples and it adjusts to your level.' },
      { question: 'Is it safe for students to use Claude?', answer: 'Yes, Claude is designed to be honest and safe. It will refuse harmful requests and tells you when it is not sure about something. Always verify official exam information from official websites.' },
    ],
    relatedLinks: [{ label: 'Ask AI Tutor', tab: 'home' }, { label: 'Skills Lab', tab: 'skills_lab' }, { label: 'Practice MCQs', tab: 'arena' }],
  },

  {
    id: 'a2', slug: 'chatgpt-vs-gemini-vs-claude-for-students', category: 'ai-tools',
    title: 'ChatGPT vs Gemini vs Claude: Best AI Tool for Indian Students in 2026',
    summary: 'We compared all three AI tools for homework help, exam prep, coding, and essay writing. Here is which one wins for Indian students — and which ones are completely free.',
    seoTitle: 'ChatGPT vs Gemini vs Claude for Students India 2026 | Syllab.in',
    seoDescription: 'Complete comparison of ChatGPT, Google Gemini, and Claude for Indian school students. Which AI is best for CBSE, JEE, NEET, and coding?',
    readingTime: 7, updatedAt: '2026-05-19', author: 'Syllab Team',
    emoji: '⚡', coverColor: 'from-emerald-500 to-teal-700',
    tags: ['ChatGPT', 'Gemini', 'Claude', 'AI Comparison'], trending: true,
    sections: [
      {
        heading: 'The Three Giants: Quick Overview',
        body: `In 2026, three AI assistants dominate student use worldwide: ChatGPT (by OpenAI), Gemini (by Google), and Claude (by Anthropic). All three are available in India, all have free tiers, and all can help with studying — but each has very different strengths and weaknesses.\n\nThis comparison is based on real student use cases: NCERT explanations, essay writing, coding help, and exam question practice.`,
      },
      {
        heading: 'ChatGPT (GPT-4o) — Best for Creative Tasks',
        body: `**Strengths:**\n- Excellent for brainstorming ideas and creative writing\n- Great for coding help in Python, Java, and JavaScript\n- Good for explaining concepts in simple language\n- Huge library of plugins and custom GPTs\n\n**Weaknesses:**\n- Sometimes gives outdated information (training data cutoff)\n- Can "hallucinate" — make up facts that sound real but aren't\n- Free tier is now limited to GPT-4o mini\n\n**Best for:** Creative writing, coding projects, brainstorming study strategies`,
      },
      {
        heading: 'Google Gemini 2.5 Pro — Best for Current Information',
        body: `**Strengths:**\n- Integrated with Google Search — gives you real-time information\n- Excellent for finding current exam updates and official notices\n- Good at summarising long NCERT chapters\n- Free tier is very generous in India (Gemini 1.5 Flash free)\n\n**Weaknesses:**\n- Long responses can be hard to read\n- Not as good as Claude for deep reasoning problems\n\n**Best for:** Finding recent exam dates, NCERT summaries, current news and updates`,
      },
      {
        heading: 'Claude Sonnet 4.5 — Best for Accuracy and Coding',
        body: `**Strengths:**\n- Most honest — clearly says when it doesn't know something\n- Excellent for step-by-step Math and Physics solutions\n- Best for debugging Python, Java, and SQL code\n- Great for long detailed explanations without making things up\n\n**Weaknesses:**\n- No live internet search in free tier\n- Slightly fewer plugins than ChatGPT\n\n**Best for:** Deep concept explanations, coding help, Maths and Physics problem solving`,
      },
      {
        heading: 'Our Final Recommendation for Indian Students',
        body: `**For exam updates and official news:** Use Gemini — it searches the internet in real-time.\n\n**For concept explanations and Maths/Physics:** Use Claude — it is the most accurate and step-by-step.\n\n**For creative writing and coding projects:** Use ChatGPT — it is the most versatile.\n\n**Smart strategy:** Use all three together. Spend 5 minutes on Gemini for current information, then use Claude for deep learning, and ChatGPT when you need creative ideas. All three have free tiers — you don't need to pay.`,
      },
      {
        heading: 'One More Option: Kimi AI for Long Documents',
        body: `If you need to upload and analyse long NCERT textbooks or past papers, try Kimi AI (kimi.ai). It supports 200,000 tokens — meaning it can read an entire textbook in one go and answer questions about it. This is useful for studying previous years' question patterns or summarising large reference books.`,
      },
    ],
    faq: [
      { question: 'Which AI is best for JEE preparation?', answer: 'Claude Sonnet 4.5 is best for JEE because it gives accurate step-by-step solutions for Physics and Maths. Use Gemini to search for the latest JEE syllabus updates.' },
      { question: 'Is Gemini free for students in India?', answer: 'Yes. Gemini 1.5 Flash is free with a Google account. Gemini 2.5 Pro is available in Google One AI Premium (paid), but the free version is excellent for most student needs.' },
      { question: 'Can AI write my homework for me?', answer: 'AI can help you understand topics and improve your answers, but submitting AI-generated work as your own is academic dishonesty. Use AI to learn, not to cheat.' },
    ],
    relatedLinks: [{ label: 'AI Tutor', tab: 'home' }, { label: 'Skills Lab — AI Learning', tab: 'skills_lab' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     JEE
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'b1', slug: 'best-books-jee-main-2026', category: 'jee',
    title: 'Best Books for JEE Main 2026 — Subject-Wise Complete List',
    summary: 'From H.C. Verma Physics to R.D. Sharma Maths and O.P. Tandon Chemistry — the definitive book list for JEE Main 2026 with study order, tips, and common mistakes.',
    seoTitle: 'Best Books for JEE Main 2026 | Physics Chemistry Maths | Syllab.in',
    seoDescription: 'Complete subject-wise book list for JEE Main 2026 preparation. H.C. Verma, R.D. Sharma, NCERT, O.P. Tandon — which to read first and how.',
    readingTime: 9, updatedAt: '2026-04-01', author: 'Syllab Team',
    emoji: '📖', coverColor: 'from-orange-500 to-red-700',
    tags: ['JEE Books', 'JEE Main 2026', 'Physics', 'Chemistry', 'Maths'], pinned: true,
    sections: [
      {
        heading: 'The Golden Rule: NCERT First, Always',
        body: `Before buying any reference book, complete your NCERT textbooks for Class 11 and 12. Every JEE Main topper says the same thing: NCERT is the foundation. The exam frequently tests concepts that appear directly in NCERT — especially in Chemistry.\n\nRead NCERT at least twice for all three subjects. Solve all NCERT exercise questions. Only then move to reference books for extra practice.`,
      },
      {
        heading: 'Physics: Best Books for JEE Main 2026',
        body: `**H.C. Verma — Concepts of Physics (Vol 1 & 2)**\nThis is the most recommended Physics book for JEE. It builds concepts from scratch with clear explanations and excellent exercise problems. Do every exercise, especially the short-answer and long-answer sections.\n\n**D.C. Pandey — Objective Physics**\nAfter H.C. Verma, use D.C. Pandey for JEE-level MCQ practice. It has topic-wise questions, past JEE questions, and difficulty levels.\n\n**NCERT Exemplar (Physics)**\nNot all students use this, but NCERT Exemplar problems are excellent for developing problem-solving skills. Recommended for Class 11 and 12 topics.\n\n**Study order:** NCERT Class 11 → NCERT Class 12 → H.C. Verma Vol 1 → H.C. Verma Vol 2 → D.C. Pandey`,
      },
      {
        heading: 'Chemistry: Best Books for JEE Main 2026',
        body: `**NCERT Chemistry (Class 11 & 12) — MANDATORY**\nFor JEE Chemistry, especially Inorganic Chemistry, NCERT is everything. Read every line, table, and footnote. Many JEE questions are lifted almost directly from NCERT.\n\n**O.P. Tandon — Organic Chemistry**\nFor Organic Chemistry reactions, mechanisms, and named reactions, O.P. Tandon is the best reference. It covers all topics needed for JEE Main.\n\n**V.K. Jaiswal — Inorganic Chemistry**\nFor Inorganic Chemistry MCQ practice and revision, V.K. Jaiswal is excellent. The question bank is well-organised by chapter.\n\n**Study order:** NCERT Class 11 Chemistry → NCERT Class 12 Chemistry → O.P. Tandon (Organic) → V.K. Jaiswal (Inorganic)`,
      },
      {
        heading: 'Mathematics: Best Books for JEE Main 2026',
        body: `**R.D. Sharma — Mathematics (Class 11 & 12)**\nFor building conceptual clarity and solving standard problems, R.D. Sharma is excellent. Cover all chapters thoroughly before moving to advanced books.\n\n**NCERT Mathematics — Compulsory**\nSolve all NCERT exercises and examples. The JEE Main directly tests NCERT-level understanding.\n\n**S.L. Loney — Trigonometry and Co-ordinate Geometry**\nFor Trigonometry and Co-ordinate Geometry specifically, S.L. Loney is the gold standard for JEE preparation.\n\n**Arihant — 40 Years JEE Problems**\nPast JEE papers are your most valuable resource. Solve all 40 years of JEE problems for pattern recognition and speed building.\n\n**Study order:** NCERT Class 11 → NCERT Class 12 → R.D. Sharma → S.L. Loney (Trigonometry) → 40 Years JEE Papers`,
      },
      {
        heading: 'Books to AVOID (Common Mistakes)',
        body: `**Do not use too many books.** The most common mistake is collecting 5–6 books and reading none of them completely. Choose 1–2 reference books per subject and master them completely.\n\n**Do not skip NCERT.** Students who skip NCERT for fancy reference books often lose easy marks that NCERT-level questions would have given.\n\n**Do not buy books beyond your syllabus.** IIT-JEE Advanced books are too difficult for JEE Main preparation. Stick to JEE Main level resources.`,
      },
    ],
    faq: [
      { question: 'Is H.C. Verma enough for JEE Main Physics?', answer: 'H.C. Verma + NCERT is sufficient for JEE Main Physics. For JEE Advanced, you would need D.C. Pandey and more advanced resources.' },
      { question: 'How many times should I read NCERT?', answer: 'At least 3 times for Chemistry. Twice for Physics and Maths. The more you revise NCERT, the better your exam performance.' },
      { question: 'Should I buy physical books or use digital?', answer: 'Physical books are better for studying. However, NCERT PDFs are available free on ncert.nic.in — use them for initial reading and buy physical books for practice.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  {
    id: 'b2', slug: 'jee-main-vs-jee-advanced-differences', category: 'jee',
    title: 'JEE Main vs JEE Advanced: Key Differences Every Student Must Know',
    summary: 'Confused about JEE Main and JEE Advanced? We explain eligibility, syllabus differences, difficulty, paper pattern, cut-offs, and how to prepare for both.',
    seoTitle: 'JEE Main vs JEE Advanced Differences 2026 | Complete Guide | Syllab.in',
    seoDescription: 'Understand the key differences between JEE Main and JEE Advanced — eligibility, syllabus, difficulty, paper pattern, IIT seats, and preparation strategy.',
    readingTime: 7, updatedAt: '2026-03-15', author: 'Syllab Team',
    emoji: '🔬', coverColor: 'from-amber-500 to-orange-700',
    tags: ['JEE Main', 'JEE Advanced', 'IIT', 'Differences'], pinned: true,
    sections: [
      {
        heading: 'What is JEE Main?',
        body: `JEE Main (Joint Entrance Examination Main) is the first stage of IIT entrance. It is conducted by NTA (National Testing Agency) twice a year — typically in January and April. JEE Main scores are used for admission to NITs, IIITs, and other centrally-funded technical institutions (CFTIs).\n\nJEE Main Paper 1 is for B.Tech/B.E. and Paper 2 is for B.Arch/B.Planning.`,
      },
      {
        heading: 'What is JEE Advanced?',
        body: `JEE Advanced is the second stage and is conducted by one of the IITs on rotation. Only the top 2.5 lakh candidates from JEE Main Paper 1 can appear for JEE Advanced. Clearing JEE Advanced is the only way to get into the 23 IITs.\n\nJEE Advanced is significantly harder than JEE Main and requires deeper conceptual understanding and problem-solving ability.`,
      },
      {
        heading: 'Key Differences: JEE Main vs JEE Advanced',
        body: `**Eligibility:**\n- JEE Main: Class 12 passed/appearing students, max 3 attempts\n- JEE Advanced: Must qualify JEE Main first, max 2 attempts, age limit applies\n\n**Difficulty:**\n- JEE Main: Moderate — tests conceptual knowledge and application\n- JEE Advanced: Very hard — tests deep understanding, multi-concept problems\n\n**Syllabus:**\n- JEE Main: Based on Class 11 and 12 NCERT syllabus\n- JEE Advanced: Similar but includes some extra topics and harder derivations\n\n**Paper Pattern:**\n- JEE Main: 90 questions (MCQ + numerical) in 3 hours; online CBT mode\n- JEE Advanced: 2 papers of 3 hours each; multiple question types including integer, matrix-match, paragraph\n\n**Negative Marking:**\n- JEE Main: -1 for wrong MCQ (numerical questions have no negative marking)\n- JEE Advanced: -1 or -2 depending on question type — be very careful\n\n**Seats:**\n- JEE Main qualifiers: ~31,000 seats in NITs, IIITs, GFTIs\n- JEE Advanced qualifiers: ~16,000+ seats in 23 IITs`,
      },
      {
        heading: 'Which Should You Focus On?',
        body: `**If your target is NIT/IIIT:** Focus on JEE Main preparation. Get a good score (90+ percentile) and choose the right college through JoSAA counselling.\n\n**If your target is IIT:** You must clear JEE Main first, so prepare for both. Start with JEE Main-level mastery and then build deeper skills for JEE Advanced.\n\n**Smart strategy:** Prepare for JEE Advanced from the beginning. Since Advanced is harder, students who prepare for Advanced automatically do well in Main. Don't limit yourself.`,
      },
      {
        heading: 'Preparation Timeline',
        body: `**Class 11 (Years 1-2 before exam):**\nBuild concepts from scratch. NCERT first. Then H.C. Verma, R.D. Sharma. Start practice problems.\n\n**Class 12 (Year of exam):**\nComplete Class 12 syllabus by October. October to January: Intensive revision and JEE Main preparation. After January JEE: Start JEE Advanced focused preparation.\n\n**Mock tests:** Start taking full mock tests 4 months before JEE Main.`,
      },
    ],
    faq: [
      { question: 'Can I get into IIT without JEE Advanced?', answer: 'No. IIT admission requires clearing both JEE Main (for eligibility) and JEE Advanced. There is no other route to IITs through engineering entrance.' },
      { question: 'How many times can I attempt JEE?', answer: 'JEE Main: maximum 3 consecutive years after Class 12. JEE Advanced: maximum 2 attempts in consecutive years.' },
      { question: 'What percentile in JEE Main qualifies for Advanced?', answer: 'The cut-off varies each year. In 2024, the cut-off was approximately 89 percentile for General category. Plan for 95+ percentile to be safe.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     NEET
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'c1', slug: 'best-books-neet-2026', category: 'neet',
    title: 'Complete NEET 2026 Book Guide: Biology, Physics, Chemistry',
    summary: 'NCERT is the Bible for NEET Biology. For Physics: DC Pandey. For Chemistry: NCERT + MTG. Full guide with month-wise study plan included.',
    seoTitle: 'Best Books for NEET 2026 | Biology Physics Chemistry | Syllab.in',
    seoDescription: 'Complete NEET 2026 book list: NCERT Biology, DC Pandey Physics, MTG Chemistry. Study order, month-wise plan, and tips for scoring 650+ in NEET.',
    readingTime: 9, updatedAt: '2026-04-05', author: 'Syllab Team',
    emoji: '🧬', coverColor: 'from-rose-500 to-pink-700',
    tags: ['NEET Books', 'NEET 2026', 'Biology', 'Physics', 'Chemistry'], pinned: true,
    sections: [
      {
        heading: 'The NEET Reality: NCERT is Everything for Biology',
        body: `NEET Biology is unique among all competitive exams — approximately 85–90% of questions come directly from NCERT Class 11 and 12 Biology textbooks. Word-for-word. This means if you know your NCERT Biology thoroughly, you will score 300+ marks in Biology alone.\n\nThis is not an exaggeration. NEET toppers with 700+ scores consistently say: "I read NCERT Biology 6–8 times." Start here.`,
      },
      {
        heading: 'Biology: Complete Book List for NEET 2026',
        body: `**NCERT Biology Class 11 and 12 — COMPULSORY**\nRead every line, every diagram caption, every table, every footnote. Know every term. The questions come from anywhere — including page footnotes.\n\n**MTG Fingertips Biology**\nAfter 3 thorough reads of NCERT, use MTG Fingertips for chapter-wise MCQ practice. It has 15,000+ questions aligned to NCERT.\n\n**Previous Year NEET Papers**\nSolve the last 10 years of NEET papers. Pattern recognition is crucial for NEET Biology.\n\n**Trueman's Biology**\nFor additional explanations of difficult Biology concepts, Trueman's is useful. But do not replace NCERT with it — use it only to understand what NCERT says.\n\n**How to revise:** Read NCERT → Highlight difficult terms → MTG practice → NEET past papers → Repeat`,
      },
      {
        heading: 'Physics: Book List for NEET 2026',
        body: `**NCERT Physics Class 11 and 12**\nNEET Physics is based on NCERT. Read all NCERT examples and exercises. Understand every derivation.\n\n**D.C. Pandey — Objective Physics for NEET**\nThe most recommended Physics book for NEET. Chapter-wise questions with solutions. Focused on NEET-level difficulty.\n\n**H.C. Verma — Concepts of Physics**\nOptional but useful for building fundamental understanding. Use it for conceptual clarity, not for advanced problems.\n\n**Important note:** NEET Physics is not as difficult as JEE Physics. Focus on NCERT + D.C. Pandey and you will score comfortably.`,
      },
      {
        heading: 'Chemistry: Book List for NEET 2026',
        body: `**NCERT Chemistry Class 11 and 12 — COMPULSORY**\nLike Biology, NEET Chemistry is heavily NCERT-based. Know all reactions, all definitions, all exceptions mentioned in NCERT.\n\n**MTG Objective Chemistry**\nFor chapter-wise NEET-focused MCQ practice. Well-organised by topic and difficulty.\n\n**N Avasthi — Physical Chemistry**\nFor Physical Chemistry numerical practice. Covers Mole Concept, Electrochemistry, Thermodynamics with NEET-level problems.\n\n**VK Jaiswal — Inorganic Chemistry MCQ**\nFor Inorganic Chemistry revision and practice. Essential for s, p, d, f-block elements.\n\n**Approach:** Organic Chemistry concepts → Physical Chemistry numericals → Inorganic Chemistry facts from NCERT`,
      },
      {
        heading: 'Month-Wise Study Plan for NEET 2026',
        body: `**June 2025 – August 2025:**\nComplete Class 11 NCERT for all three subjects. Make short notes.\n\n**September 2025 – November 2025:**\nComplete Class 12 NCERT for all subjects. Start MCQ practice (MTG, DC Pandey).\n\n**December 2025 – January 2026:**\nRevision of Class 11. Full mock tests every week.\n\n**February – March 2026:**\nRevision of Class 12. Intensive Biology NCERT revision. Daily past papers.\n\n**April 2026:**\nRapid revision only. No new topics. Past papers and NCERT re-reading.`,
      },
    ],
    faq: [
      { question: 'How many times should I read NCERT for NEET Biology?', answer: 'Minimum 5 times. Toppers read it 8–10 times. Every re-reading reveals new details you missed before.' },
      { question: 'Is coaching necessary for NEET?', answer: 'No. Many students have qualified NEET with self-study using NCERT + good reference books. Coaching can help structure your preparation but is not mandatory.' },
      { question: 'What is a good target score for a government medical college?', answer: 'For government MBBS seats, target 620+ out of 720. State quota cut-offs vary, but 600+ gives you a good chance in most states.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     CBSE
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'd1', slug: 'cbse-class-10-board-tips-2026', category: 'cbse',
    title: 'CBSE Class 10 Board Exam 2026: Complete Last-Month Strategy',
    summary: 'Subject-wise priorities, NCERT revision checklist, sample paper strategy, and the most common mistakes Class 10 students make — all in one guide.',
    seoTitle: 'CBSE Class 10 Board Exam 2026 Preparation Guide | Syllab.in',
    seoDescription: 'Complete last-month strategy for CBSE Class 10 Board Exams 2026. Subject priorities, NCERT revision, sample papers, common mistakes to avoid.',
    readingTime: 8, updatedAt: '2026-05-15', author: 'Syllab Team',
    emoji: '📝', coverColor: 'from-blue-500 to-blue-700',
    tags: ['CBSE Class 10', 'Board Exam 2026', 'Strategy'], trending: true,
    sections: [
      {
        heading: 'The 4-Week Board Exam Strategy',
        body: `With one month before your board exams, the strategy changes completely. Stop studying new topics. Focus entirely on revision, practice, and speed. Here is how to use your remaining 4 weeks.\n\n**Week 1:** Complete revision of all chapters. Read chapter summaries, important definitions, and formula lists. Make revision notes for each chapter.\n\n**Week 2:** Solve CBSE Sample Papers (official papers released on cbse.gov.in). Time yourself strictly — 3 hours per paper, no extra time.\n\n**Week 3:** Focus on weak subjects. Identify your lowest-scoring subjects from practice papers and give them extra attention. Do chapter-wise practice.\n\n**Week 4 (Final Week):** Light revision only. Read your short notes. Solve 1 previous year paper per day. Sleep 8 hours — your brain needs rest to perform.`,
      },
      {
        heading: 'Subject-Wise Priorities for Class 10 Boards',
        body: `**Science:** Focus on Chemical Reactions, Electricity, Human Eye, Carbon Compounds, Life Processes, and Heredity. These chapters carry the most marks. Learn all diagrams (electric circuit, refraction of light, human eye, digestive system).\n\n**Mathematics:** Don't leave any chapter. Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Trigonometry, and Statistics are high-weightage. Practice previous year questions for every chapter.\n\n**Social Science:** Focus on Map Work (10 marks), History (Industrial Revolution, Nationalism), Geography (Resources, Manufacturing Industries), and Economics (Money and Credit).\n\n**English:** Practice Letter Writing, Notice Writing, and Paragraph topics. Read the reader chapters (prose and poetry) and learn important quotes.\n\n**Hindi:** Practice all grammar sections (Vyakaran). Learn all poem meanings and question-answers from the textbooks.`,
      },
      {
        heading: 'NCERT is Your Best Preparation Resource',
        body: `For CBSE Class 10 boards, NCERT is the question paper source. Every question in your board paper comes from or is based on NCERT. Do not waste time on heavy reference books.\n\n**The right approach:** Read NCERT once slowly. Then solve NCERT exercise questions. Then read NCERT again. Then solve CBSE sample papers.\n\nIf you have completed NCERT and want extra practice, use NCERT Exemplar — it has higher-order thinking questions that match board exam style.`,
      },
      {
        heading: '5 Common Mistakes That Cost Marks in Board Exams',
        body: `**1. Not reading the question carefully:** Students answer what they think is asked, not what is actually asked. Read every question twice before writing.\n\n**2. Skipping diagram practice:** Diagrams carry 2–3 marks each. Practice drawing eye, ear, digestive system, and electric circuits until you can draw them perfectly in 2 minutes.\n\n**3. Writing too short answers for long questions:** A 5-mark answer needs 5–6 points. A 3-mark answer needs 3 clear points. Plan your answer length before writing.\n\n**4. Not attempting all questions:** In CBSE boards, attempt every question. Even a partial attempt gets you partial marks. Never leave a question blank.\n\n**5. Messy presentation:** Underline key terms, write in paragraphs, use sub-headings for long answers. A neat paper gets the benefit of doubt in borderline marking.`,
      },
    ],
    faq: [
      { question: 'How many sample papers should I solve?', answer: 'Solve all 5 official CBSE sample papers released for 2026, plus at least 3 previous year papers per subject. That is your minimum target.' },
      { question: 'Should I study till midnight before exams?', answer: 'No. Stop studying by 10 PM the day before any exam. Sleep 8 hours. Your brain consolidates memory during sleep. Being well-rested is more valuable than studying an extra hour.' },
      { question: 'What if I haven\'t finished the syllabus?', answer: 'Focus on chapters with highest weightage. Drop low-weightage chapters that you haven\'t started. Doing 80% of the syllabus thoroughly is better than covering 100% superficially.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     CODING SKILLS
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'e1', slug: 'python-roadmap-class-6-to-12', category: 'coding-skills',
    title: 'Python Roadmap for Indian Students: Class 6 to Class 12',
    summary: 'From print("Hello") in Class 6 to Data Science in Class 12 — the complete Python learning roadmap for Indian school students with free resources at every stage.',
    seoTitle: 'Python Roadmap for Students Class 6 to 12 | Free Guide | Syllab.in',
    seoDescription: 'Complete Python learning roadmap for Indian school students from Class 6 to Class 12. Topics, milestones, projects, and free resources included.',
    readingTime: 9, updatedAt: '2026-04-10', author: 'Syllab Team',
    emoji: '🐍', coverColor: 'from-blue-500 to-blue-800',
    tags: ['Python', 'Roadmap', 'Programming', 'Students'], pinned: true,
    sections: [
      {
        heading: 'Why Learn Python as a School Student?',
        body: `Python is the most popular programming language in the world in 2026 — and for good reason. It is easy to read, beginner-friendly, and used in every industry: web development, data science, artificial intelligence, automation, and robotics.\n\nFor Indian students, Python is increasingly part of the school curriculum (CBSE Class 11 and 12 Computer Science). But more importantly, knowing Python at school level gives you a massive head start in college and career.\n\nYou can start learning Python at any age — even Class 5 students can write their first program in an afternoon.`,
      },
      {
        heading: 'Class 6–7: Python Foundations (Ages 11–13)',
        body: `At this stage, the goal is to understand what programming is and write simple programs.\n\n**Topics to cover:**\n- What is Python? How does it work?\n- Installing Python or using an online editor (replit.com or python.org)\n- print() function — your first output\n- Variables — storing information\n- Basic arithmetic (add, subtract, multiply, divide)\n- Simple user input with input()\n- if/else conditions\n- Simple for loops\n\n**First milestone project:** A calculator that adds, subtracts, multiplies, and divides two numbers.\n\n**Time needed:** 4–6 weeks at 30 minutes per day`,
      },
      {
        heading: 'Class 8–9: Core Python Concepts (Ages 13–15)',
        body: `Now you build real programming skills.\n\n**Topics:**\n- Lists — storing multiple values\n- Dictionaries — key-value pairs\n- Functions — reusable blocks of code\n- Loops (for and while) — advanced usage\n- Strings and string methods\n- File handling basics\n- Error handling (try/except)\n- Object-Oriented Programming (classes and objects)\n\n**Projects at this stage:**\n- Contact book (stores names and phone numbers)\n- Quiz game (10 questions with score tracking)\n- Marks grade calculator\n\n**Time needed:** 8–10 weeks at 45 minutes per day`,
      },
      {
        heading: 'Class 10: Applied Python (Age 15–16)',
        body: `You can build real programs now. Focus on applying your skills.\n\n**Topics:**\n- Modules (math, random, datetime, os)\n- List comprehensions\n- Working with CSV files\n- Simple data processing\n- Recursion basics\n\n**Projects:**\n- Student report card generator\n- Weather data analysis\n- Number guessing game with high score tracking\n- Mini text-based adventure game\n\n**CBSE Computer Science:** If you have CS in Class 10, this covers your entire Python syllabus and more.`,
      },
      {
        heading: 'Class 11–12: Advanced Python and Data Science (Ages 16–18)',
        body: `This is where Python becomes a powerful career skill.\n\n**Topics:**\n- NumPy — numerical computations\n- Pandas — data analysis with tables\n- Matplotlib — charts and graphs\n- Basic statistics with Python\n- Introduction to Machine Learning (scikit-learn)\n- Web scraping (BeautifulSoup) — for learning only\n- API calls and JSON handling\n\n**Projects:**\n- Student marks analysis dashboard\n- Stock price trend analysis (using free API data)\n- Simple ML: predict exam pass/fail based on study hours\n- Data visualisation project for school Science project\n\n**CBSE Class 11/12 CS:** This covers the entire Python and Data Science portion of the CBSE computer science curriculum.`,
      },
      {
        heading: 'Free Resources to Learn Python',
        body: `**Syllab Skills Lab:** (You are here!) — Full Python course with theory, code examples, and practice challenges. Completely free.\n\n**python.org/doc:** Official Python documentation and beginner's guide.\n\n**W3Schools Python:** Good reference for syntax and standard library functions.\n\n**Kaggle Learn:** Free Data Science and Machine Learning courses using Python. Excellent for Class 11–12 students.`,
      },
    ],
    faq: [
      { question: 'At what age should I start learning Python?', answer: 'Class 6 (age 11–12) is ideal. But you can start at any age. The earlier you start, the more time you have to build projects before college admissions.' },
      { question: 'Is Python useful for JEE/NEET?', answer: 'Python does not directly help with JEE/NEET exam preparation. But programming skills are valuable for engineering college and career. Balance both.' },
      { question: 'Do I need to install anything to learn Python?', answer: 'No. You can practice Python online at replit.com or python.org/shell for free without installing anything. Syllab Skills Lab also has an editor.' },
    ],
    relatedLinks: [{ label: 'Python in Skills Lab', tab: 'skills_lab' }, { label: 'Practice Coding', tab: 'skills_lab' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     STUDY TIPS
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'f1', slug: 'pomodoro-technique-students-india', category: 'study-tips',
    title: 'The Pomodoro Technique: Why Top JEE/NEET Students Use It',
    summary: '25 minutes of focus, 5-minute break — repeat. How Indian toppers use the Pomodoro technique for board exams, JEE, and NEET with a free daily schedule template.',
    seoTitle: 'Pomodoro Technique for JEE NEET Students India | Syllab.in',
    seoDescription: 'Learn how to use the Pomodoro technique for JEE, NEET, and CBSE board exam preparation. Includes sample daily schedule for Indian students.',
    readingTime: 6, updatedAt: '2026-05-18', author: 'Syllab Team',
    emoji: '⏱️', coverColor: 'from-red-500 to-rose-700',
    tags: ['Study Tips', 'Pomodoro', 'Focus', 'JEE', 'NEET'], trending: true,
    sections: [
      {
        heading: 'What is the Pomodoro Technique?',
        body: `The Pomodoro Technique was created by Francesco Cirillo in the 1980s using a tomato-shaped kitchen timer (pomodoro = tomato in Italian). The principle is simple: work in focused 25-minute sessions separated by short breaks.\n\n**The basic cycle:**\n1. Choose ONE task (e.g., "Revise Newton's Laws of Motion")\n2. Set a timer for 25 minutes\n3. Work with 100% focus — no phone, no notifications, no multitasking\n4. When the timer rings, take a 5-minute break (walk, stretch, drink water)\n5. After 4 cycles (2 hours), take a longer 20–30 minute break\n\nThis one cycle is called one "Pomodoro."`,
      },
      {
        heading: 'Why This Works for Students',
        body: `Your brain works best in focused short bursts, not marathon sessions. Research in cognitive science shows that:\n\n- Attention naturally dips after 20–30 minutes of intense focus\n- Short breaks restore mental energy without losing momentum\n- Knowing there is a break coming makes it easier to resist distractions\n- The time pressure of a timer creates productive urgency\n\nStudents who study for 3 hours straight often absorb far less than students who do 6 Pomodoros (3 hours) with proper breaks. The breaks are not wasted time — they are what makes the focused time effective.`,
      },
      {
        heading: 'Sample Daily Schedule for JEE/NEET Aspirants (12 Pomodoros)',
        body: `This schedule fits 12 Pomodoros = 5 hours of focused study into a day with school and meals.\n\n**6:00 AM – 6:50 AM:** 2 Pomodoros — Physics concepts and problems\n**7:00 AM – 8:00 AM:** Breakfast, school preparation\n**4:00 PM – 4:50 PM:** 2 Pomodoros — Mathematics\n**5:00 PM – 5:50 PM:** 2 Pomodoros — Chemistry (theory)\n**6:00 PM – 6:30 PM:** Sports, walk, or physical activity\n**7:00 PM – 7:50 PM:** 2 Pomodoros — Biology/Chemistry (numericals)\n**8:00 PM – 8:30 PM:** Dinner\n**8:30 PM – 9:20 PM:** 2 Pomodoros — Revision and notes\n**9:30 PM:** Light reading or NCERT revision (no screen time)\n**10:00 PM:** Sleep\n\n**Note:** Do not study past 10:30 PM. Sleep is when your brain consolidates everything you learned.`,
      },
      {
        heading: 'Adaptation for CBSE Class 10 Students (8 Pomodoros)',
        body: `For Class 10 board exam students who have school during the day:\n\n**Morning (6:00–7:00 AM):** 2 Pomodoros — Most difficult subject first (Maths or Science)\n**After School (4:00–5:30 PM):** 3 Pomodoros — Second priority subject\n**Evening (7:00–8:30 PM):** 3 Pomodoros — Third subject and revision\n**Sunday:** 10–12 Pomodoros — Catch up and full mock paper practice\n\nThis gives you 40 Pomodoros per week = 20 hours of focused study. More than enough for CBSE board preparation.`,
      },
      {
        heading: 'Practical Tips to Make It Work',
        body: `**Phone management:** Put your phone in another room or use airplane mode. Even having your phone visible reduces focus by 20%.\n\n**What to do in breaks:** Walk around, do 10 jumping jacks, drink water, or just sit quietly. Do NOT check social media — it makes it harder to return to studying.\n\n**Tracking:** Keep a simple tally of your Pomodoros. Aim for at least 6 per day, build to 10–12 as exams approach.\n\n**When you lose focus mid-Pomodoro:** Write down the distraction on a paper, set it aside, and return to studying. Review your distraction list later during breaks.`,
      },
    ],
    faq: [
      { question: 'What if 25 minutes is too short?', answer: 'Some students prefer 50-minute focus sessions with 10-minute breaks. This is called the "52/17 rule." Experiment and find what works for your attention span.' },
      { question: 'What apps can I use for Pomodoro?', answer: 'Forest, Focus To-Do, or just your phone timer. The app is not important — consistency is. Even a basic kitchen timer works perfectly.' },
      { question: 'Should I do Pomodoro for all subjects?', answer: 'Yes. It works for all subjects — even reading NCERT Biology or memorising Chemistry reactions. The structured break keeps your energy up throughout long study sessions.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }],
  },

  {
    id: 'f2', slug: 'active-recall-vs-rereading', category: 'study-tips',
    title: 'Active Recall vs Re-Reading: Which Works Better for Board Exams?',
    summary: 'Re-reading feels productive but the science says it doesn\'t work. Active recall boosts retention by 400%. Here is how to use it for every subject.',
    seoTitle: 'Active Recall vs Re-Reading for CBSE JEE NEET Students | Syllab.in',
    seoDescription: 'Learn why re-reading is ineffective for CBSE board and JEE/NEET preparation. How to use active recall for 4x better memory retention in every subject.',
    readingTime: 6, updatedAt: '2026-05-12', author: 'Syllab Team',
    emoji: '🧠', coverColor: 'from-purple-500 to-violet-700',
    tags: ['Active Recall', 'Study Science', 'Memory', 'Study Tips'],
    sections: [
      {
        heading: 'The Problem with Re-Reading',
        body: `Re-reading feels productive. You are looking at the material, it seems familiar, you feel like you know it. This feeling is called the "fluency illusion" — you mistake familiarity for knowledge.\n\nThe problem is that recognition (knowing something looks familiar) is very different from recall (being able to retrieve information without seeing it). Board exams and competitive exams test recall. Re-reading only builds recognition.\n\nStudies at Washington University and other institutions consistently show that students who re-read score 30–40% lower on tests than students who used active recall methods — even though the re-readers often felt more confident.`,
      },
      {
        heading: 'What is Active Recall?',
        body: `Active recall means testing yourself — trying to retrieve information from memory without looking at notes or the book.\n\nThe moment you close your book and try to write down or say out loud what you just read, you are doing active recall. Your brain struggles, searches, and retrieves. This struggle is what builds long-term memory.\n\nActive recall is the principle behind flashcards, practice tests, past paper solving, and verbal self-quizzing. All of these work because they force you to retrieve information, not just recognise it.`,
      },
      {
        heading: 'How to Use Active Recall for Every Subject',
        body: `**Science (Physics, Chemistry, Biology):**\nAfter reading a NCERT chapter, close the book. Write down from memory: the main concepts, definitions, formulas, and diagrams. Then check what you missed. Read those parts again. Repeat.\n\nFor Biology: Cover the page and try to draw the labelled diagram from memory. Check how many labels you got right.\n\n**Mathematics:**\nDo not re-read solved examples. Cover the solution and try to solve the problem yourself first. This is the most powerful way to build problem-solving skills.\n\n**Social Science:**\nAfter reading a History or Geography chapter, write a brief summary from memory — dates, events, causes, effects. Then check the chapter for what you missed.\n\n**Language subjects:**\nFor grammar, make your own sentence examples for each rule. For literature, try to summarise the theme, plot, and character motivations from memory.`,
      },
      {
        heading: 'Flashcards: The Ultimate Active Recall Tool',
        body: `Flashcards are the most time-tested active recall method. One side: question or term. Other side: answer or definition.\n\n**For Chemistry:** Front: "What is the formula for Sulphuric Acid?" Back: "H₂SO₄"\n**For Biology:** Front: "What is osmosis?" Back: "Movement of water from a region of high water concentration to low water concentration through a semi-permeable membrane"\n**For Physics:** Front: "State Newton's Second Law" Back: "Force = mass × acceleration (F = ma)"\n\nFree apps: Anki (best for spaced repetition), Quizlet. Or just use physical index cards.`,
      },
      {
        heading: 'Spaced Repetition: The Final Upgrade',
        body: `Combine active recall with spaced repetition for maximum retention. Spaced repetition means reviewing information at increasing intervals:\n\n- Day 1: Learn the topic\n- Day 2: Review it\n- Day 4: Review it again\n- Day 8: Review\n- Day 16: Review\n- Day 30: Final review before exam\n\nEach review is short (5–10 minutes per topic). Your brain consolidates the memory better when you revisit it just as you are about to forget it. The Anki app automates this spaced repetition schedule for you.`,
      },
    ],
    faq: [
      { question: 'Is active recall useful for Maths?', answer: 'Extremely. The equivalent for Maths is solving problems without looking at the solution. Close the textbook and try the problem first. That struggle is active recall.' },
      { question: 'How long should I do active recall sessions?', answer: 'After every 25-minute study session (one Pomodoro), spend 5 minutes doing active recall — close your notes and try to recall what you just studied. This takes barely any extra time.' },
      { question: 'What if I forget too much during active recall?', answer: 'Forgetting is normal and actually good. The act of trying to remember, even if you fail, strengthens the memory trace. Do not get discouraged — each attempt makes the next recall easier.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Skills Lab', tab: 'skills_lab' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     EAMCET
  ────────────────────────────────────────────────────────────────── */
  {
    id: 'g1', slug: 'eamcet-2026-preparation-strategy', category: 'eamcet',
    title: 'EAMCET 2026 Complete Preparation Strategy for AP & TS Students',
    summary: 'EAMCET weightage, important chapters in Physics, Chemistry, Maths/Biology, previous year analysis, and month-wise study plan for AP EAMCET and TS EAMCET 2026.',
    seoTitle: 'EAMCET 2026 Preparation Guide | AP TS EAMCET Strategy | Syllab.in',
    seoDescription: 'Complete EAMCET 2026 preparation strategy for Andhra Pradesh and Telangana students. Chapter weightage, books, study plan, and tips for scoring 130+.',
    readingTime: 10, updatedAt: '2026-04-15', author: 'Syllab Team',
    emoji: '📐', coverColor: 'from-violet-500 to-purple-800',
    tags: ['EAMCET 2026', 'TS EAMCET', 'AP EAMCET', 'Engineering', 'Medical'], pinned: true,
    sections: [
      {
        heading: 'Understanding EAMCET 2026',
        body: `EAMCET (Engineering, Agriculture and Medical Common Entrance Test) is the state-level entrance exam for undergraduate engineering (B.Tech) and medical/pharmacy (MBBS/B.Pharmacy) admissions in Andhra Pradesh and Telangana.\n\n**AP EAMCET:** Conducted by JNTUK (Jawaharlal Nehru Technological University, Kakinada)\n**TS EAMCET:** Conducted by JNTUH (Jawaharlal Nehru Technological University, Hyderabad)\n\nBoth exams are based on Class 11 and 12 Intermediate (Board) syllabus and are conducted in online CBT mode. The exam has 160 questions for engineering (Maths: 80, Physics: 40, Chemistry: 40) and 160 for medical (Botany: 40, Zoology: 40, Physics: 40, Chemistry: 40).`,
      },
      {
        heading: 'Most Important Chapters — Engineering (PCM)',
        body: `**Physics (High Weightage):**\nElectrostatics, Current Electricity, Moving Charges and Magnetism, Electromagnetic Induction, Optics, Modern Physics, Semiconductor Devices, Mechanics (Laws of Motion, Work-Energy, Rotational Motion)\n\n**Chemistry (High Weightage):**\nAtomic Structure, Chemical Bonding, Stoichiometry, Equilibrium, Electrochemistry, Organic Chemistry (IUPAC, Reactions, Named Reactions), Coordination Compounds, Thermodynamics\n\n**Mathematics (High Weightage):**\nAlgebra (Matrices, Complex Numbers), Trigonometry, Coordinate Geometry (Circles, Parabola, Ellipse, Hyperbola), Calculus (Differentiation, Integration, Differential Equations), Probability, Vectors`,
      },
      {
        heading: 'Most Important Chapters — Medical (PCB)',
        body: `**Botany (High Weightage):**\nCell Biology, Plant Kingdom Classification, Genetics, Plant Physiology, Ecology, Biotechnology\n\n**Zoology (High Weightage):**\nAnimal Kingdom Classification, Human Physiology (Digestion, Circulation, Respiration, Excretion, Nervous System), Genetics and Evolution, Human Reproduction, Animal Biotechnology\n\n**Physics and Chemistry:** Same high-weightage chapters as Engineering stream above.`,
      },
      {
        heading: 'Month-Wise Preparation Plan',
        body: `**6 Months Before Exam (October–November 2025):**\nComplete Class 11 syllabus for all subjects. Focus on understanding fundamentals. Start MCQ practice after each chapter.\n\n**4 Months Before (December 2025 – January 2026):**\nComplete Class 12 syllabus. Maintain revision notes. Start solving EAMCET previous year papers (2020–2024).\n\n**2 Months Before (February – March 2026):**\nIntensive revision of high-weightage chapters. Full mock tests weekly. Time management practice.\n\n**Last Month (April 2026):**\nRapid revision only. No new topics. EAMCET past papers daily. Review mistakes.`,
      },
      {
        heading: 'EAMCET vs JEE: Should You Prepare Separately?',
        body: `EAMCET and JEE Main have significant overlap in syllabus. If you prepare for JEE Main with NCERT + reference books, you will also be well-prepared for EAMCET.\n\nHowever, EAMCET has some unique aspects:\n- EAMCET is slightly easier than JEE Main\n- More emphasis on Intermediate (Class 11/12 AP/TS board) textbooks\n- Some state-specific content in Chemistry and Biology\n\nRecommendation: Prepare for JEE Main level. EAMCET will come naturally. Spend the last 2 months solving EAMCET-specific past papers for pattern familiarity.`,
      },
    ],
    faq: [
      { question: 'What is a good rank in EAMCET for NIT/good engineering college?', answer: 'For top government engineering colleges in AP/TS, aim for rank under 5000. For NIT Warangal through EAMCET quota, you need top 100 ranks typically.' },
      { question: 'Can I write both AP EAMCET and TS EAMCET?', answer: 'Yes. Students can appear for both exams. AP students can also write TS EAMCET and vice versa, expanding college options.' },
      { question: 'Is coaching mandatory for EAMCET?', answer: 'No. Many students qualify EAMCET with self-study and good books. However, if you are targeting top ranks, structured coaching helps with practice and mock tests.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  /* More articles */
  {
    id: 'e2', slug: 'sql-basics-school-students', category: 'coding-skills',
    title: 'SQL for School Students: From SELECT to JOINs — Simple Guide',
    summary: 'SQL is used in every company in the world. This guide takes you from your first SELECT statement to JOINs and Aggregates in plain English with Indian examples.',
    seoTitle: 'SQL Basics for School Students India | Learn SQL Free | Syllab.in',
    seoDescription: 'Learn SQL from scratch for Indian school students. SELECT, WHERE, JOIN, GROUP BY explained with simple Indian examples. Free SQL guide.',
    readingTime: 8, updatedAt: '2026-04-05', author: 'Syllab Team',
    emoji: '🗄️', coverColor: 'from-indigo-500 to-indigo-800',
    tags: ['SQL', 'Databases', 'Coding', 'Beginners'],
    sections: [
      { heading: 'What is SQL and Why Should Students Learn It?', body: `SQL (Structured Query Language) is the language used to talk to databases. Every website, every app, every company that stores data uses SQL (or something very similar). WhatsApp, Instagram, Swiggy, Amazon, every bank — they all use databases managed with SQL.\n\nFor students, SQL is valuable for three reasons:\n1. It is part of CBSE Class 11/12 Computer Science curriculum\n2. It is one of the most-demanded skills in every technology job\n3. It is much easier to learn than Python or Java — you can be useful in SQL within 2 weeks` },
      { heading: 'The Database Concept: Tables, Rows, and Columns', body: `A database is like a collection of spreadsheets. Each spreadsheet is called a table. Each table has rows (records) and columns (fields).\n\nExample: A school database might have a Students table:\n| StudentID | Name | Class | Marks | City |\n|-----------|------|-------|-------|------|\n| 1 | Arjun | 10 | 95 | Delhi |\n| 2 | Priya | 11 | 88 | Mumbai |\n| 3 | Rahul | 10 | 72 | Chennai |\n\nSQL lets you ask questions about this data: "Who scored more than 80?" "How many students are in Delhi?" "What is the average marks?" These are called queries.` },
      { heading: 'Basic SQL Commands Every Student Must Know', body: `**SELECT — Get data:**\nSELECT * FROM Students; (get all columns)\nSELECT Name, Marks FROM Students; (get specific columns)\n\n**WHERE — Filter data:**\nSELECT * FROM Students WHERE Marks > 80;\nSELECT * FROM Students WHERE City = 'Delhi';\n\n**ORDER BY — Sort data:**\nSELECT * FROM Students ORDER BY Marks DESC; (highest first)\n\n**INSERT — Add new data:**\nINSERT INTO Students VALUES (4, 'Anjali', 12, 91, 'Hyderabad');\n\n**UPDATE — Change data:**\nUPDATE Students SET Marks = 96 WHERE StudentID = 1;\n\n**DELETE — Remove data:**\nDELETE FROM Students WHERE StudentID = 3;` },
      { heading: 'Aggregate Functions: Count, Sum, Average', body: `Aggregate functions calculate summaries across many rows:\n\nSELECT COUNT(*) FROM Students; — How many students?\nSELECT AVG(Marks) FROM Students; — Average marks of all students\nSELECT MAX(Marks) FROM Students; — Highest marks\nSELECT MIN(Marks) FROM Students; — Lowest marks\nSELECT SUM(Marks) FROM Students; — Total marks (not very useful here)\n\nWith GROUP BY:\nSELECT City, COUNT(*) FROM Students GROUP BY City;\n(Shows how many students from each city)` },
      { heading: 'JOINs: Connecting Multiple Tables', body: `Real databases have many tables that are connected. For example: a Students table and a Scores table. JOIN lets you combine data from both.\n\nINNER JOIN — Only matching records:\nSELECT Students.Name, Scores.Subject, Scores.Marks\nFROM Students\nINNER JOIN Scores ON Students.StudentID = Scores.StudentID;\n\nThis shows each student's name alongside their scores from the Scores table.\n\nJOINs are the most powerful feature of SQL. Once you understand JOINs, you can answer complex questions about any dataset.` },
    ],
    faq: [
      { question: 'Is SQL in the CBSE Computer Science syllabus?', answer: 'Yes. SQL is part of CBSE Class 11 and 12 Computer Science (Informatics Practices). Learning SQL will directly help your board exam scores.' },
      { question: 'Where can I practice SQL online for free?', answer: 'SQLiteOnline.com, DB Fiddle, and W3Schools SQL Tryit are free online SQL editors. Syllab Skills Lab also has SQL practice.' },
      { question: 'Is SQL a programming language?', answer: 'SQL is a query language, not a general-purpose programming language. It is designed specifically for talking to relational databases. It is easier than Python or Java to learn.' },
    ],
    relatedLinks: [{ label: 'SQL in Skills Lab', tab: 'skills_lab' }, { label: 'Practice Coding', tab: 'skills_lab' }],
  },

  {
    id: 'a3', slug: 'best-ai-tools-students-india-2026', category: 'ai-tools',
    title: 'Best AI Tools for Students in India 2026: Complete Free Guide',
    summary: 'Claude, Gemini, ChatGPT, Kimi, NotebookLM, Perplexity — which AI tool is best for what task? Complete guide for Indian students with free tier details.',
    seoTitle: 'Best Free AI Tools for Indian Students 2026 | Syllab.in',
    seoDescription: 'Complete guide to the best free AI tools for Indian school and college students in 2026. Claude, Gemini, ChatGPT, Kimi, NotebookLM, Perplexity reviewed.',
    readingTime: 8, updatedAt: '2026-05-15', author: 'Syllab Team',
    emoji: '🌟', coverColor: 'from-blue-500 to-indigo-700',
    tags: ['AI Tools', 'Free AI', 'Students', 'ChatGPT', 'Gemini', 'Claude', 'NotebookLM'], trending: true,
    sections: [
      { heading: 'Why AI Tools Matter for Students in 2026', body: `Artificial Intelligence tools have fundamentally changed how students can study, revise, and solve problems. In 2026, a student with the right AI tools has access to:\n- A personal tutor available 24/7\n- Instant concept explanations at any level\n- Unlimited practice questions\n- Essay feedback and improvement\n- Code debugging and explanation\n- Summarisation of long textbooks\n\nAll of this is available for free — or nearly free — for students in India. Here is what each tool does best.` },
      { heading: 'Claude Sonnet 4.5 — Best for Accuracy', body: `**What it does best:** Detailed concept explanations, step-by-step Maths and Physics, coding help, essay feedback\n**Free tier:** Yes (claude.ai, ~80 messages/day)\n**Why use it:** Claude is the most honest AI — it tells you when it doesn't know something instead of making things up. For exam preparation, accuracy matters more than speed.\n**Best use:** "Explain Class 12 Physics Electrostatics step by step with solved examples."` },
      { heading: 'Google Gemini 2.5 — Best for Current Information', body: `**What it does best:** Real-time information, NCERT summaries, current exam updates, research\n**Free tier:** Yes (gemini.google.com, Gemini 1.5 Flash)\n**Why use it:** Gemini searches the internet in real-time, so it knows current exam dates, latest syllabus changes, and recent news.\n**Best use:** "What is the JEE Main 2026 exam date?" or "Summarise NCERT Class 10 Chapter 1 Acids Bases Salts"` },
      { heading: 'NotebookLM — Best for Studying Your Own Books', body: `**What it does best:** Upload your NCERT PDFs/notes and ask questions about them\n**Free tier:** Yes (notebooklm.google.com)\n**Why use it:** You can upload your entire NCERT textbook as a PDF, and NotebookLM answers questions about it, creates summaries, and generates practice questions — all based only on what you uploaded.\n**Best use:** Upload Class 12 Chemistry NCERT → Ask "Give me 20 important questions from Electrochemistry chapter with answers."` },
      { heading: 'Kimi AI — Best for Long Documents', body: `**What it does best:** Analysing very long documents (200,000 tokens)\n**Free tier:** Yes (kimi.ai)\n**Why use it:** If you have multiple chapters or a complete textbook PDF, Kimi can analyse the entire thing in one session. Perfect for studying large reference books or past paper collections.\n**Best use:** Upload 10 years of NEET past papers → "What are the most frequently tested Biology topics across all years?"` },
      { heading: 'Perplexity AI — Best for Research', body: `**What it does best:** Research with citations from reliable sources\n**Free tier:** Yes (perplexity.ai)\n**Why use it:** Unlike ChatGPT or Claude, Perplexity gives you sources for every answer. Perfect for school projects, essays, and research where you need to cite references.\n**Best use:** "Explain the Green Revolution in India and give me sources I can cite in my project."` },
    ],
    faq: [
      { question: 'Which AI tool is completely free?', answer: 'Claude, Gemini, ChatGPT (limited), Kimi, Perplexity, and NotebookLM all have free tiers. You can use all of them without paying anything.' },
      { question: 'Is it cheating to use AI for homework?', answer: 'Using AI to understand concepts and check your work is not cheating. Copy-pasting AI answers as your own work is cheating. Use AI to learn, not to replace your thinking.' },
      { question: 'Which AI is best for Python and Java coding?', answer: 'Claude Sonnet 4.5 and ChatGPT GPT-4o are both excellent for coding help. They debug code, explain errors, and suggest improvements well.' },
    ],
    relatedLinks: [{ label: 'Skills Lab — AI Learning', tab: 'skills_lab' }, { label: 'AI Tutor', tab: 'home' }],
  },

  /* ──────────────────────────────────────────────────────────────────
     NEW ARTICLES (12 STUB TO FULL)
  ────────────────────────────────────────────────────────────────── */

  {
    id: 'k1', slug: 'class-1-4-worksheets-launched', category: 'class-1-4',
    title: 'NEW: 130+ Free Printable Worksheets for Class 1 to 4',
    summary: 'Maths, English, and Science worksheets aligned to CBSE NCERT — instant PDF download or send to your inbox by email. Built for young learners with simple language and clear examples.',
    seoTitle: 'Free Printable Worksheets Class 1-4 CBSE NCERT | Syllab.in',
    seoDescription: 'Download 130+ free worksheets for Class 1-4 Maths, English, Science. CBSE NCERT aligned, printable PDFs for early learners. Simple, clear, with examples.',
    readingTime: 3, updatedAt: '2026-05-24', author: 'Syllab Team',
    emoji: '📚', coverColor: 'from-rose-500 to-orange-500',
    tags: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Worksheets', 'CBSE'], trending: true, pinned: true,
    sections: [
      {
        heading: 'What Are These Worksheets and Why They Work',
        body: `These 130+ printable worksheets are designed specifically for young learners in Class 1 to 4. They follow the CBSE NCERT curriculum and cover Maths, English, and Science topics that students study in school.\n\nUnlike generic worksheets found online, these are created by teachers who understand the learning pace of early primary students. Each worksheet has large fonts, simple language, and plenty of space for children to write. The questions build confidence rather than frustration.`,
      },
      {
        heading: 'What\'s Included in the Worksheet Collection',
        body: `**Maths Worksheets (60 worksheets):**\nNumber recognition, counting 1-100, simple addition and subtraction, word problems, measuring length and weight, telling time, money concepts, shapes and patterns, skip counting, and more.\n\n**English Worksheets (40 worksheets):**\nAlphabet tracing, phonics practice, word building, sentence formation, simple reading comprehension, vocabulary building, punctuation, grammar basics.\n\n**Science Worksheets (30+ worksheets):**\nLiving and non-living things, five senses, seasons, animals and plants, human body, water and food, safety, simple experiments, and nature observation.`,
      },
      {
        heading: 'How to Use These Worksheets at Home',
        body: `**For parents:** Print one worksheet per day and let your child work at their own pace. Worksheets are designed for 15–20 minutes of focus. Don\'t force completion — if your child struggles, step back and revisit the topic later.\n\n**For teachers:** Use these as homework supplements or in-class practice. The worksheets align to NCERT pacing, so you can match them to what you\'ve taught that week.\n\n**Practice approach:** Start with the simpler worksheets in each category and progress to harder ones. Let your child practice the same concept across 2–3 worksheets for mastery.`,
      },
      {
        heading: 'Download and Print Instructions',
        body: `Each worksheet is a single-page PDF optimised for standard A4 paper (210mm × 297mm). Download from your inbox or the Syllab website. Print in black and white or colour.\n\nTip: Laminate the worksheets or put them in plastic sleeves. Children can then solve with whiteboard markers and erase to reuse the same worksheet multiple times. This saves paper and cost.`,
      },
    ],
    faq: [
      { question: 'Are these worksheets aligned to CBSE curriculum?', answer: 'Yes. All 130+ worksheets follow CBSE NCERT Class 1-4 syllabus. They match the topics and difficulty levels taught in Indian schools.' },
      { question: 'Can I print and reuse the worksheets?', answer: 'Yes. For personal/home use, print as many times as you like. Laminate them and use whiteboard markers to reuse them. For classroom use, check the usage rights in your download confirmation.' },
      { question: 'How much time should a child spend on one worksheet?', answer: 'Most worksheets are designed for 15-20 minutes. If your child finishes faster, let them. If they struggle, do not force — take a break and revisit later. Speed is not the goal — understanding is.' },
      { question: 'Are answers provided?', answer: 'Yes. A separate answer key PDF comes with the download so you can check your child\'s work.' },
    ],
    relatedLinks: [{ label: 'Learning Lab', tab: 'learning_lab' }, { label: 'Skills Lab', tab: 'skills_lab' }, { label: 'Parent Corner', tab: 'parent' }],
  },

  {
    id: 'k2', slug: 'how-to-teach-young-kids-maths', category: 'class-1-4',
    title: 'How to Teach Maths to Class 1 & 2 Kids — A Parent\'s Guide',
    summary: 'Counting with fingers, real-life examples, fun shapes, simple addition games — every parent\'s playbook for making early maths joyful (not stressful).',
    seoTitle: 'Teach Maths to Class 1-2 Kids | Parent Guide | Syllab.in',
    seoDescription: 'How to teach maths to young kids in Class 1 and 2 at home. Fun counting games, number concepts, simple addition. Make maths joyful for early learners.',
    readingTime: 6, updatedAt: '2026-05-23', author: 'Syllab Team',
    emoji: '🔢', coverColor: 'from-amber-500 to-orange-600',
    tags: ['Class 1', 'Class 2', 'Maths', 'Parenting Tips'], trending: true,
    sections: [
      {
        heading: 'The Two Biggest Mistakes Parents Make Teaching Maths',
        body: `**Mistake 1: Starting with memorisation instead of understanding.** Many parents buy flashcards and ask their child to memorise "2+3=5" without letting the child understand what "5" actually means. Understanding comes first. Memorisation follows.\n\n**Mistake 2: Making it stressful.** If a child feels pressure, anxiety, or hears "you are bad at maths," they develop maths anxiety that lasts into high school. Maths should feel playful, not like punishment.`,
      },
      {
        heading: 'Foundation 1: Master Counting (Before Any Addition)',
        body: `Your child must count fluently — not just say "1, 2, 3, 4," but understand that "4" means "four objects," not just a sound.\n\n**Activity 1: Counting real things.** Count fingers, toes, toys, cookies, anything in your home. Touch each item while counting. Repeat daily.\n\n**Activity 2: Counting backwards.** After forward counting is easy, count backwards: 10, 9, 8, 7... This is harder and helps with subtraction later.\n\n**Activity 3: Skip counting.** Count by 2s: 2, 4, 6, 8... Count by 5s: 5, 10, 15, 20... This is preparation for multiplication, but don\'t explain that yet.`,
      },
      {
        heading: 'Foundation 2: Number Recognition and Value',
        body: `Child must see a number card (2, 5, 8) and know instantly "that\'s two/five/eight." They must count out exactly that many objects.\n\n**Activity 1: Number cards with dots.** Use dots below each number (e.g., "5" with 5 dots). Child counts the dots and matches them to the number.\n\n**Activity 2: Comparing numbers.** Show two cards (3 and 7) and ask "which has more?" Do not tell the answer; let them count and discover.\n\n**Activity 3: Number hunt.** Find numbers around your home (on buses, house numbers, clocks). Say the number out loud.`,
      },
      {
        heading: 'Teaching Simple Addition (Class 2)',
        body: `Only after counting and number value are solid, teach addition. Start with single-digit addition (2+3) and keep sums under 10.\n\n**Activity 1: Concrete objects.** Give your child 2 toys. Add 3 more toys. Count all: "1, 2, 3, 4, 5 — so 2+3=5." Repeat with different objects (pencils, stones, fruits). The object changes, but 2+3 always equals 5.\n\n**Activity 2: Fingers.** Use your fingers to show 2+3. "Hold up 2 fingers on one hand, 3 on the other. Count all: 1, 2, 3, 4, 5." This is a bridge to more abstract thinking.\n\n**Activity 3: Word problems from daily life.** "You have 2 apples. I give you 3 more. How many now?" Real situations help maths make sense.\n\n**Rule:** Do not teach carrying/borrowing (like 7+5) until they are very confident with sums under 10.`,
      },
      {
        heading: 'Make It Playful: Games That Teach Without Feeling Like Lessons',
        body: `**Dice game:** Roll a die (shows 1–6), child counts that many steps. Roll again, add the two numbers. Repeat. This teaches addition naturally.\n\n**Card game:** Use playing cards (remove face cards). Flip two cards, child adds them. Keep a tally of how many they get right. Make it a race.\n\n**Money game (Class 2):** Use toy coins (1 rupee and 5 rupee). "You have 5 rupees. I give you 3 more. How much now?" Real-world value matters.\n\n**Shape hunt:** Find shapes in your home. "How many circles? How many squares?" Count and add: "3 circles and 2 circles make 5 circles."`,
      },
      {
        heading: 'When to Seek Help (Red Flags)',
        body: `If your child still cannot count fluently by mid-Class 1, or cannot match "3" to three objects by mid-Class 2, talk to their teacher. They might need a bit more time or targeted support — and that is completely normal. Early intervention is always easier than waiting.`,
      },
    ],
    faq: [
      { question: 'My child is memorising but not understanding maths. What should I do?', answer: 'Stop all memorisation. Go back to concrete objects. Make your child count out 2+3 using toys 20 times until they understand the concept before you worry about memorising the answer.' },
      { question: 'How much daily practice is needed?', answer: 'For Class 1-2, just 10-15 minutes of play-based maths is enough. Consistency matters more than duration. Daily 10 minutes beats weekly 60 minutes.' },
      { question: 'Should I use maths apps for young kids?', answer: 'Apps can be fun but are no substitute for hands-on counting with real objects. A child needs to physically touch items, count, and see the quantity. Use apps as a supplement, not the main method.' },
      { question: 'What if my child hates maths?', answer: 'Maths anxiety often comes from pressure. Remove all pressure. Make it 100% play. Play maths games, count things in the kitchen while cooking, play board games. Let them rediscover that maths is fun.' },
    ],
    relatedLinks: [{ label: 'Learning Lab', tab: 'learning_lab' }, { label: 'Parent Resources', tab: 'parent' }, { label: 'Skills Lab', tab: 'skills_lab' }],
  },

  {
    id: 'k3', slug: 'class-3-4-science-everyday-experiments', category: 'class-1-4',
    title: '10 Easy Science Experiments for Class 3 & 4 at Home',
    summary: 'No lab needed — just everyday things from the kitchen. Plant growth, water cycle, sink vs float, magnets, shadows, and more. Each experiment takes under 15 minutes.',
    seoTitle: 'Easy Science Experiments Class 3-4 | Home Experiments | Syllab.in',
    seoDescription: '10 simple science experiments for Class 3 and 4 kids. Do at home with kitchen items. Plant growth, water cycle, magnets, floating, shadows — fun learning.',
    readingTime: 8, updatedAt: '2026-05-22', author: 'Syllab Team',
    emoji: '🔬', coverColor: 'from-emerald-500 to-teal-600',
    tags: ['Class 3', 'Class 4', 'Science', 'Experiments'],
    sections: [
      {
        heading: 'Why Do Hands-On Science Experiments?',
        body: `Experiments are how real science works. Your child reads "water boils at 100°C" in a textbook, but when they actually heat water in a glass and see steam rise, it clicks. Textbook learning goes into short-term memory. Hands-on learning goes into long-term memory and becomes part of how the child thinks about the world.`,
      },
      {
        heading: 'Experiment 1: Seed Sprouting (Plant Growth)',
        body: `**What you need:** Bean seeds, wet cotton, clear glass jar, water\n\n**Steps:** Place wet cotton at the bottom of a clear jar. Place bean seeds on the cotton. Keep cotton moist. Observe daily.\n\n**What happens:** Within 3-5 days, roots appear going downward, and shoots appear going upward. Explain gravity: roots always go down (towards water), shoots go up (towards sunlight).\n\n**Learning:** Plant growth, gravity, roots absorb water, photosynthesis`,
      },
      {
        heading: 'Experiment 2: Water Cycle in a Bag',
        body: `**What you need:** Ziplock plastic bag, water, permanent marker, sunny window\n\n**Steps:** Draw rain, clouds, sun on the bag with marker. Fill with water. Seal completely. Stick on a sunny window with tape.\n\n**What happens:** Water evaporates (turns to invisible steam), condenses (becomes droplets on the bag), and falls as rain inside the bag. The cycle repeats.\n\n**Learning:** Evaporation, condensation, water cycle`,
      },
      {
        heading: 'Experiment 3: Sink or Float',
        body: `**What you need:** Large bowl of water, various household items (pencil, orange, stone, paper, apple, toy)\n\n**Steps:** Predict: will this float or sink? Then test each object.\n\n**What happens:** Light objects float. Heavy or dense objects sink. You can cut an apple in half and test both — both sink because apples are dense.\n\n**Challenge:** Try placing a stone on a tin foil boat. The foil floats but stone sinks. Explain: shape and air pockets matter.\n\n**Learning:** Density, buoyancy, mass vs volume`,
      },
      {
        heading: 'Experiment 4: Magnet Strength Through Different Materials',
        body: `**What you need:** Magnet, iron filings or small paper clips, plastic sheet, cloth, aluminium foil, paper\n\n**Steps:** Place magnet under plastic. Sprinkle iron filings on plastic. Observe the pattern. Repeat with cloth, foil, paper.\n\n**What happens:** The magnet\'s force passes through some materials (paper, plastic, cloth) but not others (metal foils).\n\n**Learning:** Magnetism, magnetic fields, materials that block magnetism`,
      },
      {
        heading: 'Experiment 5: Shadow Length Changes (Angle of Sun)',
        body: `**What you need:** Stick, paper, pencil, sunny outdoor space, measuring tape\n\n**Steps:** Stick a pencil straight up in paper. Measure its shadow length at 8 AM, 10 AM, 12 PM, 2 PM.\n\n**What happens:** Shadow length changes. At noon, shadow is shortest. Shadow also rotates as the sun moves.\n\n**Learning:** Sun\'s position changes throughout the day, shadows depend on light angle`,
      },
      {
        heading: 'Experiment 6: Colour Mixing (Pigments and Light)',
        body: `**What you need:** Water, food colouring (red, blue, yellow), clear cups\n\n**Steps:** Mix red + blue → purple. Mix red + yellow → orange. Mix blue + yellow → green. Try all combinations.\n\n**What happens:** Primary colours mix to make secondary colours.\n\n**Challenge:** Add more red to purple → magenta. Explain concentration and shades.\n\n**Learning:** Colour theory, primary colours, mixing ratios`,
      },
      {
        heading: 'Safety Rules for Home Experiments',
        body: `All experiments here are safe for Class 3-4 kids but follow these rules:\n\n- Adult supervision always\n- Never taste or drink any liquids used in experiments\n- Wash hands after finishing\n- Clean up immediately\n- If something breaks, ask an adult\n- Hot water experiments (like Experiment 2 if in sun too long): let it cool before touching`,
      },
    ],
    faq: [
      { question: 'What if an experiment doesn\'t work perfectly?', answer: 'Perfect! That\'s real science. Talk about why: maybe not enough time, temperature was wrong, or we did something differently. Use it to understand variables.' },
      { question: 'How do I record the experiment?', answer: 'Draw pictures or write: What did we predict? What happened? Was it surprising? Take before/after photos. Write a few sentences explaining what you learned.' },
      { question: 'Can I do these at school?', answer: 'Yes. These are safe for classroom use too. Teachers often use hands-on experiments to match NCERT Science curriculum.' },
      { question: 'How long does each experiment take?', answer: 'Setup: 2-5 minutes. Observation: 10-30 minutes. Some (like seed sprouting) need observations over several days.' },
    ],
    relatedLinks: [{ label: 'Learning Lab', tab: 'learning_lab' }, { label: 'Science Resources', tab: 'skills_lab' }, { label: 'Parent Guide', tab: 'parent' }],
  },

  {
    id: 'a4', slug: 'kimi-ai-tool-for-students', category: 'ai-tools',
    title: 'Kimi AI: The Hidden Gem for Long Document Study in 2026',
    summary: 'Kimi AI handles 200,000 tokens — meaning it can read your entire textbook in one go. Here\'s how students use it to analyse NCERT PDFs and past papers.',
    seoTitle: 'Kimi AI for Students | Long Document AI | NCERT Study | Syllab.in',
    seoDescription: 'Learn how to use Kimi AI (200k tokens) to study NCERT textbooks, analyse past papers, and generate practice questions. Free for Indian students.',
    readingTime: 4, updatedAt: '2026-05-17', author: 'Syllab Team',
    emoji: '🌙', coverColor: 'from-slate-600 to-slate-800',
    tags: ['Kimi', 'Long Context', 'PDF Study', 'AI Tools'],
    sections: [
      {
        heading: 'What Makes Kimi Different From ChatGPT and Claude?',
        body: `ChatGPT has a 128k token limit. Claude Sonnet has 200k. But most students only use the free tier, which has much tighter limits. Kimi AI (created by Moonshot AI, a Chinese company) offers 200,000 tokens on the free tier — no limit on message length.\n\nWhat does 200k tokens mean? It is roughly 600-700 pages of text. That means you can upload:\n- An entire NCERT textbook (usually 200-300 pages)\n- All past JEE or NEET papers from the last 10 years\n- Multiple chapters of a reference book\n\nIn ONE conversation. And Kimi understands all of it.`,
      },
      {
        heading: 'How to Upload and Use NCERT PDFs on Kimi',
        body: `**Step 1:** Go to kimi.ai and sign up with email (free, no credit card).\n\n**Step 2:** Click "New Conversation" and look for the attachment/upload button (usually a paperclip or "+" icon).\n\n**Step 3:** Upload your NCERT PDF. Wait 30 seconds for it to process.\n\n**Step 4:** Ask questions about it:\n- "Summarise Chapter 3 in bullet points"\n- "What are the 10 most important definitions in this chapter?"\n- "Create 20 MCQ questions about Photosynthesis with answers"\n- "Explain the Water Cycle diagram in the PDF"\n\nKimi reads your PDF and answers only based on what is in that document — no hallucinations.`,
      },
      {
        heading: 'Use Case 1: Analysing Past Papers (NEET/JEE)',
        body: `Upload 10 years of NEET past papers (1000+ pages) to Kimi. Then ask:\n\n"What are the 20 most frequently tested Biology topics in NEET over the past 10 years?"\n\nKimi analyses all papers and tells you exactly which chapters appear most often. This tells you where to focus your limited study time.\n\nAnother prompt: "For every topic that appears more than 5 times, give me a 1-line summary of what students must know to answer these questions."\n\nYou get a super-focused study guide extracted from actual past papers — this is much better than random study guides.`,
      },
      {
        heading: 'Use Case 2: Creating Practice Questions From Your Textbook',
        body: `Upload Class 12 Physics NCERT (all chapters). Ask:\n\n"Generate 50 important MCQ questions from the Electrostatics and Current Electricity chapters with correct answers and explanations."\n\nKimi extracts key concepts from your NCERT and generates practice questions instantly. You get unlimited practice material from your own textbook.`,
      },
      {
        heading: 'Use Case 3: Comparing Textbooks (NCERT vs Reference Books)',
        body: `Confused whether your reference book covers everything in NCERT? Upload both PDFs to separate conversations (free — you can have unlimited conversations).\n\nKimi from NCERT conversation: "List all important terms and formulas"\nKimi from reference book conversation: "List all important terms and formulas"\n\nCompare the two lists. See gaps. Know exactly what your reference book is missing.`,
      },
      {
        heading: 'Tips for Getting the Best Results From Kimi',
        body: `**Be specific in your prompts:** Instead of "summarise this chapter," say "Summarise Chapter 5 in bullet points with main concepts, definitions, and formulas."\n\n**Ask follow-up questions:** "Now explain this point in simpler language for a Class 10 student."\n\n**Request multiple formats:** "Give me this in a table," "Create a mind map," "List in order of importance."\n\n**Verify important answers:** If Kimi says something is on page X, check your PDF. Kimi usually gets it right but double-check critical information.`,
      },
    ],
    faq: [
      { question: 'Is Kimi AI free?', answer: 'Yes. Kimi AI has a free tier with 200,000 tokens per conversation. No credit card needed. Completely free for students.' },
      { question: 'Is Kimi available in India?', answer: 'Yes. You can access kimi.ai from India using any browser. No VPN needed. The interface is available in English.' },
      { question: 'Can I upload copyrighted NCERT textbooks?', answer: 'NCERT textbooks are government educational material. Using them for personal study on Kimi is fine. Do not share Kimi links with the PDF publicly.' },
      { question: 'Can I use Kimi for homework answers?', answer: 'Kimi can help you understand. It should not be used to copy homework answers directly. Use it to learn, then do your own homework.' },
    ],
    relatedLinks: [{ label: 'AI Tools Guide', tab: 'updates' }, { label: 'Skills Lab', tab: 'skills_lab' }, { label: 'Mock Tests', tab: 'mock_tests' }],
  },

  {
    id: 'a5', slug: 'github-copilot-coding-students', category: 'ai-tools',
    title: 'GitHub Copilot for Students: Free Access + How to Use It for Python & Java',
    summary: 'GitHub Copilot is free for students. Learn how to use it for completing Python assignments, understanding Java OOP concepts, and writing SQL queries faster.',
    seoTitle: 'GitHub Copilot Free for Students | Python Java | Syllab.in',
    seoDescription: 'How to get GitHub Copilot free for students and use it for Python, Java, and SQL assignments. Complete guide with real examples.',
    readingTime: 5, updatedAt: '2026-05-16', author: 'Syllab Team',
    emoji: '🐙', coverColor: 'from-gray-700 to-gray-900',
    tags: ['GitHub Copilot', 'Python', 'Java', 'Coding'],
    sections: [
      {
        heading: 'What is GitHub Copilot and Why Students Should Use It?',
        body: `GitHub Copilot is an AI code assistant that watches what you type and suggests the next lines of code. It is like having a coding partner who instantly knows the syntax and common patterns.\n\nFor example, you start typing:\n\\\`\\\`\\\`python\ndef calculate_gcd(a, b):\n\\\`\\\`\\\`\n\nCopilot suggests the entire Euclidean algorithm implementation. You review the suggestion, use it if correct, or modify it.\n\nCopilot is trained on billions of lines of public code from GitHub, so it knows virtually every common pattern in Python, Java, JavaScript, SQL, and more.`,
      },
      {
        heading: 'How to Get GitHub Copilot Free for Students',
        body: `GitHub Copilot Individual is normally $10/month, but students get it free.\n\n**Step 1:** Go to github.com/login or create an account.\n\n**Step 2:** Verify with a GitHub-verified email (your school email works).\n\n**Step 3:** Go to github.com/settings/copilot/billing.\n\n**Step 4:** Under "Billing," select "Student" and verify your student status (upload a screenshot of your school ID or acceptance letter).\n\n**Step 5:** GitHub approves it (usually within 24 hours). Copilot is now free until you graduate.\n\nOnce approved, install the Copilot extension in VS Code (or your IDE). It works automatically.`,
      },
      {
        heading: 'Using Copilot for Python Assignments (Class 11/12)',
        body: `**Scenario:** You need to write a function to check if a number is prime.\n\n**Without Copilot:** You think about the logic, type slowly, and debug.\n\n**With Copilot:**\n\nType:\n\\\`\\\`\\\`python\ndef is_prime(n):\n\\\`\\\`\\\`\n\nCopilot instantly suggests:\n\\\`\\\`\\\`python\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\\\`\\\`\\\`\n\nReview the logic. If correct, press Tab to accept. If you want different logic, ignore it and type your own. This is 10x faster than typing manually, and you learn the pattern.`,
      },
      {
        heading: 'Using Copilot for Java (OOP Concepts)',
        body: `**Scenario:** Creating a Student class with constructor, getters, and setters.\n\n**Type:**\n\\\`\\\`\\\`java\npublic class Student {\n\\\`\\\`\\\`\n\n**Copilot suggests the full class with private fields, constructor, and getter/setter methods.**\n\nYou review, accept, and focus on understanding why it does \\\`this.name = name;\\\` and why getters return \\\`this.name;\\\`. This is how OOP works — you see 20 working examples daily.\n\nWithout Copilot, you copy-paste boilerplate from StackOverflow and half-understand it. With Copilot, you see correct patterns repeatedly and internalize them.`,
      },
      {
        heading: 'Using Copilot for SQL Queries',
        body: `**Scenario:** Write a SQL query to find students who scored above 80 in Math from a Students table.\n\n**Type:**\n\\\`\\\`\\\`sql\nSELECT * FROM Students WHERE subject = 'Math' AND marks >\n\\\`\\\`\\\`\n\n**Copilot completes it:** \n\\\`\\\`\\\`sql\nSELECT * FROM Students WHERE subject = 'Math' AND marks > 80;\n\\\`\\\`\\\`\n\nFor complex JOINs, GROUP BY, and aggregate functions, Copilot is invaluable. It shows correct syntax instantly.`,
      },
      {
        heading: 'Important: Understanding vs Copy-Paste',
        body: `Copilot is a learning tool, not a shortcut for homework dishonesty.\n\n**Good use:** Copilot suggests code → You read it → You understand it → You use it\n\n**Bad use:** Copilot suggests code → You copy-paste without reading → You submit\n\nIf you submit code you don't understand, you will fail the exam when you have to write similar code without Copilot. Use Copilot to learn faster, not to cheat faster.`,
      },
    ],
    faq: [
      { question: 'Is GitHub Copilot safe to use?', answer: 'Yes. Copilot is made by Microsoft/GitHub and widely used by professionals. The code it suggests is from public repositories, so it is the same code you\'d find on StackOverflow.' },
      { question: 'Does Copilot work for CBSE Computer Science exams?', answer: 'No. Exams are offline and paper-based. You cannot use Copilot during exams. But Copilot is perfect for learning and doing homework before exams.' },
      { question: 'Will Copilot make me a bad programmer?', answer: 'No. Copilot helps with syntax and boilerplate. Actual problem-solving and logic are still your job. Using Copilot is like using a dictionary while writing an essay — it helps but doesn\'t do the thinking for you.' },
      { question: 'Can I use Copilot after graduation?', answer: 'No. Free Copilot is only for verified students. After graduation, you would need a paid plan ($10/month) or use free alternatives like Tabnine or Open Interpreter.' },
    ],
    relatedLinks: [{ label: 'Coding Skills', tab: 'updates' }, { label: 'Skills Lab', tab: 'skills_lab' }, { label: 'Python Roadmap', tab: 'updates' }],
  },

  {
    id: 'b3', slug: 'jee-physics-most-important-chapters', category: 'jee',
    title: 'JEE Physics: 10 Most Important Chapters & Weightage Analysis 2026',
    summary: 'Electrostatics, Mechanics, Optics, and Modern Physics account for 65% of JEE Physics. Here\'s the exact weightage analysis with smart preparation strategy.',
    seoTitle: 'JEE Physics Important Chapters 2026 | Weightage Analysis | Syllab.in',
    seoDescription: 'Complete chapter weightage analysis for JEE Physics 2026. Which chapters to prioritise, which to skip, and smart study strategy for 90+ marks.',
    readingTime: 7, updatedAt: '2026-03-10', author: 'Syllab Team',
    emoji: '⚛️', coverColor: 'from-blue-500 to-violet-700',
    tags: ['JEE Physics', 'Chapters', 'Weightage'],
    sections: [
      {
        heading: 'Understanding JEE Physics Weightage Distribution',
        body: `JEE Physics has 40 questions out of 90 total questions in the Main exam. Each question carries 4 marks. So Physics is worth 160 marks total.\n\nNot all chapters are equally important. Some chapters appear in 3-4 questions every year. Others appear rarely. By understanding this weightage, you can allocate your study time smartly.`,
      },
      {
        heading: 'Tier 1: Highest Weightage (40% of marks)',
        body: `These chapters appear in 4-5 questions per year. Master these completely.\n\n**Mechanics (14-16 marks):** Laws of Motion, Work Energy Power, Circular Motion, Rotational Motion, Gravitation\n\n**Electrostatics (12-14 marks):** Electric Field, Electric Potential, Capacitors\n\n**Electromagnetic Induction (8-10 marks):** Faraday\'s Law, Lenz\'s Law, Self-Inductance\n\n**Optics (10-12 marks):** Refraction, Lens Formula, Wave Optics, Double Slit Experiment\n\n**Modern Physics (10-12 marks):** Photoelectric Effect, Bohr\'s Model, Nuclear Physics`,
      },
      {
        heading: 'Tier 2: Medium Weightage (35% of marks)',
        body: `These chapters appear in 2-3 questions per year. Know them well but don\'t over-invest.\n\n**Current Electricity (8-10 marks):** Ohm\'s Law, EMF, Kirchhoff\'s Laws, Heating Effects\n\n**Waves and Sound (6-8 marks):** Wave Equation, Doppler Effect, Standing Waves\n\n**Magnetic Force (6-8 marks):** Lorentz Force, Cyclotron, Mass Spectrometer\n\n**Thermodynamics (6-8 marks):** Laws of Thermodynamics, Heat Capacity`,
      },
      {
        heading: 'Tier 3: Lower Weightage (25% of marks)',
        body: `These chapters appear in 1-2 questions per year. Basic knowledge is enough.\n\n**Oscillations (4-6 marks):** SHM, Pendulum\n\n**Semiconductors (4-6 marks):** Diodes, Transistors (basic)\n\n**Units and Dimensions (2-3 marks):** Usually 1 easy question\n\n**Fluid Mechanics (4-6 marks):** Bernoulli\'s Theorem, Viscosity`,
      },
      {
        heading: 'Smart 4-Month Preparation Strategy for JEE Physics',
        body: `**Month 1 (October):** Build Tier 1 concepts from scratch. Study Laws of Motion, Gravitation, Electrostatics, Modern Physics. Read NCERT first, then H.C. Verma. Solve NCERT exercises completely.\n\n**Month 2 (November):** Continue Tier 1. Add Tier 2 (Current Electricity, Magnetic Force, Thermodynamics). Start solving chapter-wise MCQs from DC Pandey.\n\n**Month 3 (December):** Complete all Tier 1 and Tier 2. Start Tier 3. Take full mock tests. Identify weak chapters.\n\n**Month 4 (January, before JEE Main):** Intensive revision of Tier 1 only. Re-solve all Tier 1 problems. Take 2 mock tests per week. Do not study new material.`,
      },
      {
        heading: 'Which Chapters to Skip (If Short on Time)',
        body: `If you are running out of time:\n\n**Do NOT skip:** Mechanics, Electrostatics, Electromagnetic Induction, Optics, Modern Physics (Tier 1). These are 70% of the exam.\n\n**Can be minimised:** Oscillations, Semiconductors, Fluid Mechanics. If you understand the basics, 1-2 marks are manageable even with shallow knowledge.\n\n**Priority:** 100 marks from Tier 1 > 160 marks of scattered study across all chapters.`,
      },
    ],
    faq: [
      { question: 'Is H.C. Verma alone enough for JEE Physics?', answer: 'Yes. H.C. Verma + NCERT covers 100% of JEE Physics material. Add DC Pandey only for MCQ practice and speed building, not for concept learning.' },
      { question: 'How many times should I solve a chapter before I move on?', answer: 'Minimum 2 times. First reading: focus on understanding. Second: solving all problems. Third: revision and speed building (optional but recommended for Tier 1).' },
      { question: 'What is a good score to aim for in JEE Physics?', answer: 'For JEE Advanced: 70+ marks (out of 120). For JEE Main: 80+ percentile means 120+ marks (out of 160).' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  {
    id: 'b4', slug: 'jee-main-2026-online-offline-mode', category: 'jee',
    title: 'JEE Main 2026: Online or Offline? Exam Mode Explained',
    summary: 'JEE Main is conducted in Computer-Based Test (CBT) mode only. We explain what this means, how to practice, best mock test platforms, and exam day tips.',
    seoTitle: 'JEE Main 2026 Exam Mode CBT | Online Preparation | Syllab.in',
    seoDescription: 'JEE Main 2026 is fully online (CBT). Learn how to prepare, practice online, take mock tests, and manage keyboard/mouse on exam day.',
    readingTime: 4, updatedAt: '2026-05-10', author: 'Syllab Team',
    emoji: '💻', coverColor: 'from-cyan-500 to-blue-700',
    tags: ['JEE Main 2026', 'Exam Mode', 'CBT'],
    sections: [
      {
        heading: 'JEE Main 2026 is 100% Computer-Based (CBT) — No Pen and Paper',
        body: `JEE Main is conducted entirely on computers. There is no offline/pen-paper option anymore. You sit at a computer, read questions on the monitor, and type/click your answers.\n\nThis has significant implications for how you prepare. It is not the same as a paper exam.`,
      },
      {
        heading: 'How the CBT Exam Works on Exam Day',
        body: `**Before you start:** You get 30 minutes of "demonstration" on how to use the software. Watch the instructions video. They teach you how to:\n- Navigate between questions\n- Mark for review\n- Change answers\n- Submit\n\n**The actual test:** 90 minutes, 90 questions. You read on screen, click options, submit.\n\n**Time pressure is different:** In a paper exam, you can see all questions at once. In CBT, you see one question at a time. This affects strategy.\n\n**No scratching:** You cannot write rough calculations on paper in the exam hall. Some centres give whiteboard sheets (erasable). Know the rules for your exam centre.`,
      },
      {
        heading: 'The Biggest Difference: Keyboard Speed Matters',
        body: `On a paper exam, writing "A B A D C" takes 2 seconds. On a computer, clicking radio buttons takes the same time usually. But if you are slow with a mouse, you lose time.\n\nAlso: scrolling to see all options, clicking "Next," marking for review — all these actions you do not do on paper. You must practice these 1000 times before the exam, or you will waste precious time fumbling with the interface.`,
      },
      {
        heading: 'Best Platforms to Practice Online',
        body: `**1. NTA CSIM (Official Practice):**\nNTA releases official mock tests. Go to jeemain.nta.ac.in and solve their free mock tests. This is 100% the same interface as the real exam.\n\n**2. Syllab Arena:**\nFull mock tests with proper CBT interface, instant feedback, detailed solutions.\n\n**3. Vedantu Pro / Unacademy Plus:**\nBoth have full-length CBT-style mock tests with detailed analysis.\n\n**4. Arihant Online:**\nArihant (the book publisher) has an online test series closely matching JEE level.`,
      },
      {
        heading: 'Exam Day Tips Specific to CBT',
        body: `**Tip 1: Time your breaks.** You get 5-10 minutes total for break. Use it for bathroom, drinking water. Do not waste mental energy on the computer.\n\n**Tip 2: Change answers wisely.** Changing is fast (1 click) on CBT. But changing due to panic is how you lose marks. Mark for review and come back only if you solved it differently.\n\n**Tip 3: Ignore the timer initially.** You get a timer at top-right. Do not check it every minute. Focus on the questions. Check only at 30-min and 15-min marks.\n\n**Tip 4: Do NOT try new question types on exam day.** If you practiced only on paper, CBT will feel weird. If you practiced on CBT, exam day will feel normal.`,
      },
    ],
    faq: [
      { question: 'What if I am slow with computers?', answer: 'Practice 1 hour daily on online mock tests for 1-2 months. Your speed will build automatically. Speed on CBT is very different from handwriting speed.' },
      { question: 'Can I use a calculator in JEE Main CBT?', answer: 'No physical calculator, but a virtual calculator tool is provided on the computer. You access it from the toolbar. Practice using it — it is different from your phone calculator.' },
      { question: 'What if the exam computer crashes during my test?', answer: 'NTA has backup computers. Your test is automatically saved. You are moved to a backup computer. You do NOT lose any time or questions. The system is robust.' },
      { question: 'Is the online exam harder than paper exams?', answer: 'Difficulty is the same. But time pressure feels different because you see one question at a time. With proper practice on CBT mock tests, you will handle it.' },
    ],
    relatedLinks: [{ label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Practice MCQs', tab: 'arena' }, { label: 'JEE Guide', tab: 'updates' }],
  },

  {
    id: 'c2', slug: 'neet-biology-ncert-strategy', category: 'neet',
    title: 'How to Score 340/360 in NEET Biology Using Only NCERT',
    summary: '90% of NEET Biology questions come directly from NCERT. Learn the exact page-reading strategy, diagram practice technique, and revision method to score 340+.',
    seoTitle: 'Score 340 NEET Biology NCERT Only | Strategy | Syllab.in',
    seoDescription: 'How to score 340+/360 in NEET Biology using only NCERT. Reading strategy, important diagrams, revision technique. No coaching needed.',
    readingTime: 8, updatedAt: '2026-03-20', author: 'Syllab Team',
    emoji: '🌿', coverColor: 'from-emerald-500 to-green-700',
    tags: ['NEET Biology', 'NCERT Strategy', 'Score 340'],
    sections: [
      {
        heading: 'The NEET Biology Reality: NCERT is Everything',
        body: `NEET Biology has 90 questions worth 180 marks (Class 11 + 12). Approximately 85-90 of these questions come directly from NCERT or minor variations of NCERT content.\n\nThis means if you know NCERT Biology thoroughly, you will score 340-360. There are no tricks, no "gotcha" questions. Just NCERT, thoroughly.`,
      },
      {
        heading: 'The Exact NCERT Reading Strategy That Works',
        body: `**Reading 1 (Slow Reading - 3 weeks):**\nRead NCERT page by page. Read ALL text, ALL boxes, ALL footnotes, ALL photo captions. Write down every term and definition in your notebook. Do not read for understanding at this point — just read and write.\n\n**Reading 2 (Understanding - 2 weeks):**\nRead the same chapters again. This time, try to understand. By Reading 2, things make sense because you have already seen the terms.\n\n**Reading 3 (Active Recall - 2 weeks):**\nRead and STOP. Close the book. Write down from memory: 5 main points from this section, 3 important terms, 1 diagram description. Check what you forgot. Read that part again.\n\n**Reading 4-8 (Spaced Revision - ongoing):**\nEach revision is shorter. Just review notes, re-draw diagrams, check if you remember key concepts.`,
      },
      {
        heading: 'Diagrams Are HALF Your Score',
        body: `NEET asks 15-20 diagram-based questions. These come directly from NCERT.\n\nImportant diagrams to master:\n- Human digestive system (label all parts)\n- Human circulatory system (heart, arteries, veins)\n- Human respiratory system\n- Human nervous system (brain, spinal cord, neurons)\n- Plant root and stem (cross-sections)\n- Flower parts (androecium, gynoecium)\n- Stages of meiosis (8 diagrams)\n- Double helix (DNA structure)\n\nFor each diagram:\n1. Copy it from NCERT\n2. Label all parts\n3. Know the function of each part\n4. Draw it from memory 10 times until you can do it in 2 minutes with eyes closed\n\nPractice: A student who can draw these 10 diagrams perfectly will score +50 marks from diagram questions alone.`,
      },
      {
        heading: 'Which Chapters Are Highest Weightage?',
        body: `**Biology Part 1 (Class 11):**\n- Unit IV: Plant Physiology (9-12 marks)\n- Unit V: Human Physiology (9-12 marks)\n\n**Biology Part 2 (Class 12):**\n- Unit VI: Genetics (13-15 marks) ← HIGHEST\n- Unit VII: Ecology (8-10 marks)\n- Unit VIII: Biotechnology (8-10 marks)\n\nGive extra time to Genetics and Human Physiology. These are the heaviest chapters.`,
      },
      {
        heading: 'The 6-Month Timeline to Score 340+',
        body: `**Month 1 (June):** Read NCERT Part 1 (Class 11) Slow Reading + Understanding. Copy all diagrams.\n\n**Month 2 (July):** Read NCERT Part 2 (Class 12) Slow Reading + Understanding. Copy all diagrams.\n\n**Month 3 (August):** Active Recall Reading of all chapters. Create flashcards of definitions. Redraw all diagrams.\n\n**Month 4 (September):** Practice NEET MCQs (use MTG Fingertips). Take 2 practice tests per week.\n\n**Month 5 (October):** Intensive revision. Daily flashcards. Redraw diagrams. Solve 10 previous years questions per day.\n\n**Month 6 (November-April):** Light revision only. Past papers. Identify weak areas. Final revision of those areas.`,
      },
      {
        heading: 'What NOT to Do (Common Mistakes)',
        body: `**Mistake 1: Using heavy reference books.** Do not use Trueman\'s or other thick reference books as your main study material. NCERT is lighter, more focused, and 100% covers NEET.\n\n**Mistake 2: Skipping NCERT for "faster" shortcuts.** Some students try to shortcut NCERT. This always backfires. There is no shortcut to 340+.\n\n**Mistake 3: Not mastering diagrams.** Students read text but ignore diagrams. Diagrams are 20% of the questions. Neglecting them means losing 40 marks easily.\n\n**Mistake 4: Reading too fast.** Reading NCERT once in 2 weeks is not enough. You need 5-8 careful readings.`,
      },
    ],
    faq: [
      { question: 'Do I really need coaching to score 340+?', answer: 'No. Many self-taught students score 340+ using just NCERT + MTG practice. Coaching helps with time management and structured study, but is not essential.' },
      { question: 'How many times should I read NCERT?', answer: 'Minimum 5 times. Toppers read it 8-10 times. Each reading reveals new details. More readings = higher marks.' },
      { question: 'What if I run out of time and cannot finish all chapters?', answer: 'Focus on Genetics, Human Physiology, and Ecology (60% of marks). If you must drop a chapter, drop Units on Diversity (10% marks).' },
      { question: 'Is 340/360 (94%) a good NEET score?', answer: 'Yes. 340+ typically gives you top government medical college through counselling in most states. For AIIMS, you would need 350+.' },
    ],
    relatedLinks: [{ label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Practice MCQs', tab: 'arena' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  {
    id: 'd2', slug: 'cbse-class-12-physics-important-chapters', category: 'cbse',
    title: 'CBSE Class 12 Physics: Most Important Chapters for 2026 Boards',
    summary: 'Electrostatics, Current Electricity, and Optics carry 45 marks. Here\'s the full chapter-wise breakdown with tips, formulas, and free practice links.',
    seoTitle: 'CBSE Class 12 Physics Important Chapters 2026 | Syllab.in',
    seoDescription: 'Chapter-wise weightage for CBSE Class 12 Physics 2026. Which chapters to prioritise, formulas to memorise, and preparation strategy.',
    readingTime: 6, updatedAt: '2026-04-20', author: 'Syllab Team',
    emoji: '⚡', coverColor: 'from-indigo-500 to-purple-700',
    tags: ['CBSE Class 12', 'Physics', 'Chapters'],
    sections: [
      {
        heading: 'CBSE Class 12 Physics Paper Structure',
        body: `CBSE Class 12 Physics board exam is 70 marks (+ 30 marks internal assessment). The 70-mark paper is 3 hours and has three sections:\n\n**Section A:** 5 very short answer questions (1 mark each) = 5 marks\n**Section B:** 5 short answer questions (2 marks each) = 10 marks\n**Section C:** 4 long answer questions (3 marks each) + 2 long answer questions (5 marks) = 22 marks\n\nRemaining marks come from numerical problems mixed into all sections. Total: 70 marks.`,
      },
      {
        heading: 'Highest Weightage Chapters (45 marks total)',
        body: `**1. Electrostatics (15 marks):**\nElectric field, electric potential, capacitors, Coulomb\'s law. This chapter has 3-4 questions every year. Very important.\n\nKey formulas: E = kQ/r², V = kQ/r, C = Q/V, Energy = ½CV²\n\nLimits: Unit 1 + 2 = 8 chapters, typically 3 chapters are tested each year. Electrostatics is in top 3 almost always.\n\n**2. Current Electricity (12 marks):**\nOhm\'s law, resistance, EMF, internal resistance, Kirchhoff\'s laws. 2-3 numerical problems every year.\n\nKey formulas: V = IR, R = ρL/A, P = I²R, ε = I(R + r)\n\n**3. Optics (18 marks):**\nRefraction, lenses, lens formula, wave optics, diffraction, polarisation. Highest weightage chapter. Can appear as 1 long question + several short questions.\n\nKey formulas: n₁sinθ₁ = n₂sinθ₂, 1/f = 1/v + 1/u, λ = a·sinθ/n`,
      },
      {
        heading: 'Medium Weightage Chapters (15 marks total)',
        body: `**4. Magnetic Effects of Current (10 marks):**\nMagnetic field due to current, force on conductor, torque, cyclotron. 1-2 numerical problems.\n\n**5. Electromagnetic Induction (5 marks):**\nFaraday\'s law, Lenz\'s law, self-inductance. Usually 1 short question or part of a long question.`,
      },
      {
        heading: 'Lower Weightage Chapters (10 marks)',
        body: `**6. Semiconductors (4 marks):**\nDiodes, transistors, gates. Usually 1-2 theory questions.\n\n**7. Nuclei (3 marks):**\nNuclear structure, radioactivity, decay. Usually 1 short question.\n\n**8. Units & Dimensions (2-3 marks):**\nDimensional analysis. Usually embedded in numerical problems.`,
      },
      {
        heading: 'Smart Board Exam Strategy',
        body: `**Time allocation (180 minutes for 70 marks):**\n- Electrostatics & Current: 50 minutes (master these completely)\n- Optics: 60 minutes (longest chapter)\n- Magnetic Effects: 30 minutes\n- Other chapters: 30 minutes\n- Review and final check: 10 minutes\n\n**Numerical practice:** Solve minimum 50 numericals covering all topics. Boards heavily test numericals.\n\n**Diagram practice:** Draw ray diagrams (refraction, lenses), magnetic field patterns, electric field lines 10 times each.\n\n**Revision schedule (last 2 weeks):** Day 1-3: Electrostatics + Current. Day 4-6: Optics. Day 7-10: Magnetic Effects. Day 11-14: Review all formulas and solve past papers.`,
      },
    ],
    faq: [
      { question: 'How much weightage should Optics get in my study time?', answer: 'Optics is 25% of marks (18/70). Give it 25% of your study time. Do not neglect it despite being difficult.' },
      { question: 'Can I score well in boards without doing numericals?', answer: 'No. Boards have 15-20 marks of numericals. Numericals are easy marks if you know the formulas. Do minimum 50 numericals before exam.' },
      { question: 'What if I don\'t have time to study all chapters?', answer: 'Prioritise: Electrostatics (full) > Current Electricity (full) > Optics (full) > Everything else (basics only). This 3 chapter focus gives you 45/70 marks guaranteed.' },
    ],
    relatedLinks: [{ label: 'Practice MCQs', tab: 'arena' }, { label: 'Mock Tests', tab: 'mock_tests' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  {
    id: 'd3', slug: 'ncert-vs-reference-books-cbse', category: 'cbse',
    title: 'NCERT or Reference Books? The Answer Every CBSE Student Needs',
    summary: 'For boards: NCERT is enough. For JEE/NEET: supplement with reference books. We break down exactly when to use which, subject by subject, for Class 9-12.',
    seoTitle: 'NCERT vs Reference Books CBSE | Which to Use | Syllab.in',
    seoDescription: 'NCERT vs reference books for CBSE boards and JEE/NEET. Which is better for each subject? When to use which? Complete comparison.',
    readingTime: 5, updatedAt: '2026-02-28', author: 'Syllab Team',
    emoji: '📚', coverColor: 'from-teal-500 to-cyan-700',
    tags: ['NCERT', 'Reference Books', 'CBSE Strategy'], pinned: true,
    sections: [
      {
        heading: 'The Simple Rule: NCERT for Boards, Reference Books for JEE/NEET',
        body: `**CBSE Board Exams:** NCERT is 100% sufficient. Every question in boards comes from NCERT.\n\n**JEE Main:** NCERT + reference books (20% boost)\n\n**NEET:** NCERT + light reference books (10% boost)\n\n**JEE Advanced:** NCERT + reference books + advanced problem-solving\n\nIf your goal is only boards, stop reading here: use NCERT only. If your goal is JEE/NEET after boards, continue.`,
      },
      {
        heading: 'NCERT: The Complete Reference (Pros & Cons)',
        body: `**Pros:**\n- Covers 100% of board exam syllabus\n- Written for Class 11/12 students (appropriate level)\n- CBSE designs board exams from NCERT\n- Free online (ncert.nic.in)\n- Lighter than reference books\n\n**Cons:**\n- Does not go deeper for JEE/NEET\n- Fewer practice problems than reference books\n- Some topics lack explanation depth (especially Physics derivations)`,
      },
      {
        heading: 'Best Reference Books — Subject-Wise',
        body: `**For CBSE Boards Alone:** Do NOT use reference books. NCERT is enough and saves you money.\n\n**For Physics (CBSE + JEE):** H.C. Verma + NCERT\n\n**For Chemistry (CBSE + JEE):** NCERT + O.P. Tandon (Organic) + V.K. Jaiswal (Inorganic)\n\n**For Maths (CBSE + JEE):** NCERT + R.D. Sharma\n\n**For Biology (CBSE + NEET):** NCERT + Trueman (optional, only if budget allows)\n\n**For English/Hindi (CBSE):** NCERT + your school\'s study material`,
      },
      {
        heading: 'When to Use Reference Books',
        body: `**Month 1-2 (NCERT First):** Complete NCERT of all chapters thoroughly. Solve all NCERT exercises.\n\n**Month 3 onwards (Add Reference):** ONLY after finishing NCERT, start reference books. Use them for:\n- Extra practice problems\n- Deeper explanations of difficult topics\n- Speed building for competitive exams\n\n**Rule:** NCERT is foundation. Reference books are supplement, never replacement.`,
      },
      {
        heading: 'Money-Smart Decision: What to Buy?',
        body: `**If budget is tight:**\n- Buy only reference books for your weakest subject\n- Get free NCERT PDFs from ncert.nic.in\n- Borrow reference books from your school library\n\n**Smart combination:** NCERT (buy or use free) + 1 reference book per subject (buy used copies)\n\n**Don\'t waste money on:** Multiple reference books for one subject. H.C. Verma + D.C. Pandey + Irodov all for Physics is overkill. H.C. Verma alone is enough.`,
      },
    ],
    faq: [
      { question: 'Is NCERT enough if I want 95% in CBSE boards?', answer: 'Yes. NCERT is 100% sufficient for board exams. Most toppers score 95%+ using only NCERT. Reference books are not needed for boards.' },
      { question: 'Can I score 90+ percentile in JEE Main using only NCERT?', answer: 'Very difficult. You would need perfect NCERT mastery + excellent practice. Add reference books and it becomes achievable.' },
      { question: 'Should I buy physical books or use PDFs?', answer: 'Physical books are better for sustained study (less eye strain, better retention). PDFs are free. Use PDFs for initial study, buy physical if you can afford.' },
      { question: 'Which reference book is best for Physics?', answer: 'H.C. Verma is the gold standard for Class 11-12 Physics. It goes deep into concepts without being too advanced. Best investment if you can buy only one Physics book.' },
    ],
    relatedLinks: [{ label: 'CBSE Study Guide', tab: 'updates' }, { label: 'JEE Books', tab: 'updates' }, { label: 'Syllabus', tab: 'syllabus' }],
  },

  {
    id: 'e3', slug: 'html-css-javascript-beginners', category: 'coding-skills',
    title: 'Build Your First Website: HTML + CSS + JavaScript in 1 Hour',
    summary: 'No experience needed. This step-by-step guide teaches you to build a real webpage from scratch using HTML structure, CSS styling, and JavaScript interactivity.',
    seoTitle: 'Learn HTML CSS JavaScript | Build Website in 1 Hour | Syllab.in',
    seoDescription: 'Build your first website from scratch using HTML, CSS, and JavaScript in 60 minutes. Step-by-step guide for complete beginners.',
    readingTime: 9, updatedAt: '2026-03-25', author: 'Syllab Team',
    emoji: '🌐', coverColor: 'from-orange-500 to-orange-800',
    tags: ['HTML', 'CSS', 'JavaScript', 'Beginners'],
    sections: [
      {
        heading: 'What You\'ll Build Today: A Simple Colour-Changing Button Website',
        body: `In this one-hour guide, you will create a real website that:\n- Has a heading and description (HTML)\n- Looks beautiful with colors and fonts (CSS)\n- Has a clickable button that changes colours (JavaScript)\n\nThis project teaches all three languages working together. It is saved as a single .html file on your computer that you can share with anyone.`,
      },
      {
        heading: 'Step 1: Create Your HTML File (5 minutes)',
        body: `Open any text editor (Notepad, VS Code, even Google Docs). Type:\n\n\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Website</title>\n</head>\n<body>\n  <h1>Welcome to My Website</h1>\n  <p>Click the button below to change colours!</p>\n  <button id=\"colourBtn\">Click Me!</button>\n</body>\n</html>\n\`\`\`\n\nSave it as index.html (with .html at the end). Double-click the file to open it in your browser. You will see a page with text and a button. This is HTML — the structure of the website.`,
      },
      {
        heading: 'Step 2: Make It Beautiful With CSS (15 minutes)',
        body: `Between <head> and </head>, add:\n\n\`\`\`html\n<style>\n  body {\n    background-colour: #f0f0f0;\n    font-family: Arial, sans-serif;\n    text-align: center;\n    padding: 50px;\n  }\n  h1 {\n    colour: #333;\n    font-size: 48px;\n  }\n  button {\n    background-colour: #4CAF50;\n    colour: white;\n    padding: 15px 30px;\n    font-size: 18px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n  }\n  button:hover {\n    background-colour: #45a049;\n  }\n</style>\n\`\`\`\n\nSave and refresh your browser. Now the page has colors, proper spacing, and the button looks clickable. This is CSS — making things beautiful.`,
      },
      {
        heading: 'Step 3: Make It Interactive With JavaScript (20 minutes)',
        body: `Before </body>, add:\n\n\`\`\`html\n<script>\n  const colours = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];\n  let currentColour = 0;\n  \n  document.getElementById('colourBtn').addEventListener('click', function() {\n    currentColour = (currentColour + 1) % colours.length;\n    document.body.style.backgroundColor = colours[currentColour];\n  });\n</script>\n\`\`\`\n\nSave and refresh. Now click the button. The background colour changes! This is JavaScript — making things interactive. The button click triggers code that changes the background.`,
      },
      {
        heading: 'The Complete Code (All Together)',
        body: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Website</title>\n  <style>\n    body {\n      background-colour: #f0f0f0;\n      font-family: Arial, sans-serif;\n      text-align: center;\n      padding: 50px;\n      transition: background-colour 0.5s; /* Smooth colour change */\n    }\n    h1 {\n      colour: #333;\n      font-size: 48px;\n    }\n    button {\n      background-colour: #4CAF50;\n      colour: white;\n      padding: 15px 30px;\n      font-size: 18px;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n    }\n    button:hover {\n      background-colour: #45a049;\n    }\n  </style>\n</head>\n<body>\n  <h1>Welcome to My Website</h1>\n  <p>Click the button below to change colours!</p>\n  <button id=\"colourBtn\">Click Me!</button>\n  \n  <script>\n    const colours = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];\n    let currentColour = 0;\n    \n    document.getElementById('colourBtn').addEventListener('click', function() {\n      currentColour = (currentColour + 1) % colours.length;\n      document.body.style.backgroundColor = colours[currentColour];\n    });\n  </script>\n</body>\n</html>\n\`\`\`\n\nThis is your complete website. Copy-paste into a text editor, save as index.html, and open in your browser.`,
      },
      {
        heading: 'Next Steps: Build More Complex Projects',
        body: `Now that you understand HTML + CSS + JavaScript working together, you can build:\n\n**Level 2:** To-do list app (add/remove tasks with JavaScript)\n**Level 3:** Calculator (perform math operations)\n**Level 4:** Quiz game (keep score, check answers)\n**Level 5:** Portfolio website (multiple pages, project showcase)\n\nEach project teaches you one new concept. Start with the button project, then move to the next.`,
      },
    ],
    faq: [
      { question: 'Do I need any software or coding app to write HTML?', answer: 'No. Notepad (on Windows) or TextEdit (on Mac) is enough. VS Code is better but not required for beginners.' },
      { question: 'How do I share my website?', answer: 'Right now it works only on your computer. To share it online, you need web hosting (free options: Vercel, Netlify, GitHub Pages). Upgrade to this after your first project.' },
      { question: 'Is JavaScript hard?', answer: 'JavaScript is one of the easiest programming languages to learn. This button project teaches the core: variables, events, and functions. That is 80% of what you need.' },
      { question: 'Can I use this as my school Computer Science project?', answer: 'Yes. This is a perfect Class 11/12 project. You can expand it (add more features, better CSS, more interactivity) to match your school requirements.' },
    ],
    relatedLinks: [{ label: 'Coding Skills', tab: 'updates' }, { label: 'Skills Lab', tab: 'skills_lab' }, { label: 'Python Roadmap', tab: 'updates' }],
  },

  {
    id: 'f3', slug: 'revision-schedule-class-12', category: 'study-tips',
    title: '7-Day Rapid Revision Schedule for Class 12 Board Exams',
    summary: 'With 7 days to go, here\'s the exact daily schedule for Class 12 revision — subject-wise, time-wise, with formula sheets, sample paper practice, and rest days.',
    seoTitle: '7-Day Revision Schedule Class 12 Boards | Last Week | Syllab.in',
    seoDescription: 'Final week revision schedule for Class 12 board exams. Day-by-day breakdown, subject priorities, practice tests, and sleep schedule.',
    readingTime: 5, updatedAt: '2026-05-08', author: 'Syllab Team',
    emoji: '📅', coverColor: 'from-amber-500 to-yellow-700',
    tags: ['Class 12', 'Revision', 'Schedule'],
    sections: [
      {
        heading: 'The 7-Day Revision Principle: No New Learning',
        body: `With one week left, your goal is NOT to study new topics. Your goal is to:\n- Revise what you already know\n- Build speed and confidence\n- Fix weak spots\n- Sleep 8 hours\n\nIf you try to "complete" chapters in the last week, you will panic. Ignore new content. Focus on polishing what you know.`,
      },
      {
        heading: 'Day 1-3: Subject Rotation (3-Subject Cycle)',
        body: `These days, follow a rotation: Maths → Science → Social Studies → Maths (repeat).\n\n**Day 1:**\n- 6:00 AM - 8:00 AM: Maths formulas revision (no solving yet)\n- 8:00 AM - 10:00 AM: Breakfast, prep for school/exams\n- 4:00 PM - 6:00 PM: Science (Physics/Chemistry) - revision of important questions only\n- 6:00 PM - 8:00 PM: Social Studies - read 2 chapters, no notes\n- 8:00 PM - 10:00 PM: Sports, walk, light TV (no screens after 10 PM)\n- 10:00 PM - Sleep\n\n**Day 2:** Rotate: Science → Social Studies → Maths (same time blocks)\n\n**Day 3:** Rotate: Social Studies → Maths → Science`,
      },
      {
        heading: 'Day 4-5: Mock Papers and Timed Practice',
        body: `These are your most important days. Do full mock papers under exam conditions.\n\n**Day 4:**\n- 9:00 AM - 12:00 PM: Full Maths paper (3-hour mock)\n- 2:00 PM - 3:00 PM: Check answers, identify mistakes\n- 3:00 PM - 4:00 PM: Revise only the topics you got wrong\n- 4:00 PM - 6:00 PM: Science full paper (3 hours) — Yes, another mock same day\n\n**Day 5:**\n- 9:00 AM - 12:00 PM: Social Studies paper\n- 2:00 PM - 3:00 PM: Check, analyse\n- 3:00 PM onwards: Light revision of weak areas`,
      },
      {
        heading: 'Day 6: Review and Weak Spot Fix',
        body: `**Morning:** Review all answers from Day 4 and 5 mocks.\n\n**What went wrong?** Analyze:\n- Time management: Did you run out of time?\n- Silly mistakes: Did you mis-read questions?\n- Concepts: Did you forget a formula or concept?\n\n**Fix each issue:**\n- Time management → Practice 1-2 more timed papers\n- Silly mistakes → Read every question twice before answering\n- Concepts → Revise that 1 chapter intensively\n\n**Evening:** Light reading of NCERT summaries (no solving). This builds confidence.`,
      },
      {
        heading: 'Day 7: Rest Day + Light Review',
        body: `**No studying in the exam.** This day is for rest and final confidence-building.\n\n**Morning:** 30-minute review of formula sheets (Maths, Physics, Chemistry). Just read, do not solve.\n\n**Afternoon:** Organize your exam hall supplies: pen, pencil, eraser, geometry box, calculator (as allowed).\n\n**Evening:** Read 1 chapter from your strongest subject (to feel confident). Then light dinner and bed by 9 PM.\n\n**Sleep:** Get 8-9 hours of sleep. Your brain consolidates memory during sleep. Being well-rested is more valuable than studying extra.`,
      },
    ],
    faq: [
      { question: 'Should I solve new practice papers in the last week?', answer: 'Yes — sample papers and previous year papers under timed conditions. Do NOT study new textbooks or learn new concepts.' },
      { question: 'What if I still don\'t remember a formula?', answer: 'Write it on your formula sheet. On exam day, you can reference your sheet for any formula. But after 7 days, you should remember most formulas from repetition.' },
      { question: 'Is cramming the night before helpful?', answer: 'No. Your brain is tired. Study normally until exam day, then rest. 1 hour of study on Day 7 is not worth the sleep loss.' },
      { question: 'What if I have an exam on Day 7?', answer: 'Adjust the schedule: Do exam in the morning. Light revision in afternoon. This schedule is flexible — adapt it to your actual exam dates.' },
    ],
    relatedLinks: [{ label: 'CBSE Guide', tab: 'updates' }, { label: 'Study Tips', tab: 'updates' }, { label: 'Mock Tests', tab: 'mock_tests' }],
  },
];

/** Look up a full article by slug */
export function getArticleBySlug(slug: string): FullArticle | undefined {
  return FULL_ARTICLES.find(a => a.slug === slug);
}

/** Get articles by category */
export function getArticlesByCategory(category: string): FullArticle[] {
  if (category === 'all') return FULL_ARTICLES;
  return FULL_ARTICLES.filter(a => a.category === category);
}
