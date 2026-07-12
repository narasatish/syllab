import { TutorialTopic } from './types';

export const interviewPrepTopics: TutorialTopic[] = [
  {
    id: 'iv-resume-structure',
    category: 'Resume Building',
    title: 'Building a Strong One-Page Resume',
    difficulty: 'Beginner',
    theory: [
      'Indian recruiters spend 6–10 seconds scanning a resume before deciding to reject or review. A one-page resume forces you to prioritize ruthlessly: only the most relevant education, skills, and projects that directly match the job description matter. Structure beats length. Use clear sections: Contact Info → Professional Summary (2–3 lines) → Experience → Education → Skills → Projects/Certifications. Most Indian freshers make the mistake of listing every school achievement or hobby; instead, treat your resume as a targeted marketing document, not a CV.',
      'The "reverse chronological" format works best: most recent/relevant first. For each role or project, list only 3–4 bullet points. Use the ATS-friendly font (Arial, Calibri, or Helvetica in 10–11 pt). White space matters—cramped resumes signal desperation. Include quantifiable metrics wherever possible: "₹2L+ in sales," "15% reduction in runtime," "3 peer-reviewed publications." Recruiters at tier-1 Indian companies (TCS, Accenture, Amazon, Flipkart, Zomato) now parse resumes digitally first, so consistency in formatting beats fancy design.',
      'Critical additions for Indian freshers: mention your JEE/NEET rank if competitive (top 5,000), CGPA if ≥7.5, or major hackathon wins (HackIndia, Smart India Hackathon). Add certifications from recognized sources: Google Cloud, AWS, IBM (valued highly by product companies). LinkedIn URL and GitHub portfolio link are now expected, not optional. Avoid "Objective" sections (outdated) and subjective adjectives like "hardworking" or "team player"—let your achievements speak.'
    ],
    code: `CONTACT INFO
Aryan Kapoor • +91-9876-543-210 • aryan.kapoor@email.com
LinkedIn: linkedin.com/in/aryankpoor • GitHub: github.com/aryankapoor
Location: Bangalore, India

PROFESSIONAL SUMMARY
B.Tech Computer Science graduate (CGPA 8.2) with hands-on experience in full-stack web development. Built 3 live projects; AWS-certified. Seeking SDE-1 roles at early-stage startups or product companies.

EXPERIENCE
Software Development Intern | CodeDaily (YC S24) | Jun–Aug 2024
• Reduced API response latency by 40% (800ms → 480ms) using Redis caching and query optimization
• Designed real-time notification system serving 50K+ daily active users with 99.5% uptime
• Mentored 2 junior interns on React best practices and TypeScript migrations

EDUCATION
B.Tech Computer Science | IIT Delhi (2024) | CGPA: 8.2/10.0
JEE Advanced Rank: 1,847 (2020)
Relevant Coursework: Data Structures, Operating Systems, Databases, ML Basics

SKILLS
Languages: JavaScript, Python, C++, SQL, TypeScript
Frameworks: React 19, Node.js, Express, Firebase, Tailwind CSS
Tools: Git, Figma, AWS (Lambda, S3, RDS), PostgreSQL, Docker
Certifications: AWS Certified Cloud Practitioner (2024)

PROJECTS
Real-time Chat App (React + Firebase + Tailwind) | Jan 2024
• Built end-to-end encrypted chat with 500+ test users in beta
• Implemented offline-first architecture; synced 100K+ messages seamlessly

E-commerce Search Engine (Node + ElasticSearch + React) | Nov 2023
• Optimized search latency from 3s to 120ms via ElasticSearch indexing
• Ranked top 15 across 200+ teams in college hackathon`,
    output: 'A clean, ATS-scannable resume that passes both human and digital screening.',
    notes: [
      'Keep it to 1 page—use compact margins (0.6–0.75 inch) if needed',
      'PDF format only; no images or fancy graphics',
      'Match 3–5 keywords from the job description in your resume',
      'No spelling errors, no inconsistent date formats',
      'Save as FirstName_LastName_Resume.pdf'
    ],
    xp: 50,
    practice: {
      title: 'Refactor Your Resume',
      description: 'Take a section of your current resume (experience or education) and rewrite it using the action-verb + impact model. Replace vague terms like "responsible for" with quantified results.',
      startCode: `BEFORE:
• Responsible for developing web features for the company
• Worked on optimization of backend systems
• Contributed to team projects

AFTER:
[Write your 3 bullet points using the STAR + quantified impact model]`,
      hint: 'Start each bullet with an action verb (Built, Reduced, Designed, Implemented, Optimized). Follow with the task. End with numbers: %, $, K users, ms latency, etc.',
      solution: `AFTER:
• Built authentication system for 5-user Django admin panel; reduced login errors by 85%
• Optimized database queries reducing page load time from 3.2s to 800ms for 10K+ monthly users
• Implemented Redis caching strategy decreasing backend latency by 45% across 12 API endpoints`,
      expectedOutput: 'Each bullet should have: action verb + task + quantifiable result (%, money, users, time saved)'
    }
  },
  {
    id: 'iv-bullet-points',
    category: 'Resume Building',
    title: 'Writing Achievement-Focused Bullet Points',
    difficulty: 'Intermediate',
    theory: [
      'The STAR method (Situation, Task, Action, Result) is the gold standard for resume bullets, but it must fit in 1–2 lines. Most Indian students write "I did X" bullets instead of "X impact happened because I did Y." The shift from responsibility to result is critical. A bad bullet says "Developed a feature." A great bullet says "Developed a real-time notification feature used by 50K daily active users, reducing manual check-ins by 95%." Start every bullet with a strong action verb: Built, Designed, Reduced, Increased, Optimized, Automated, Implemented, Launched, etc. Weak verbs like "worked," "helped," "participated" vanish in recruiters\' eyes.',
      'Quantify everything measurable: percentage gains (15% faster), absolute numbers (500K users, ₹50L), or time saved (halved deployment time). If you cannot quantify, show the tangible deliverable: "Shipped X; learnt Y; owned Z." For projects without obvious metrics (e.g., a personal website), reframe around adoption or quality: "Built portfolio site; served 1K visits in month 1" or "Reduced bounce rate to 15% via dark mode + mobile optimization." Tailor each bullet to the job description—include 1–2 keywords (e.g., "React" if the role emphasizes React) without forcing it.',
      'Common mistakes: (1) Too long—if it wraps to 3 lines, split or cut. (2) Jargon overload—"leveraged paradigm-shifting synergies" signals inexperience. (3) "Responsible for" (too passive). (4) Multiple actions in one bullet (picks one impact). (5) Zero metrics (unverifiable). For internships, freelance work, or academics: scale down the metric (200 users instead of 50K) but keep the result-focused format. Indian hiring managers now expect this discipline even from freshers.'
    ],
    code: `WEAK BULLETS (AVOID):
❌ Responsible for building a web application
❌ Worked on optimizing backend code
❌ Participated in a team project using React
❌ Helped with deployment and testing

STRONG BULLETS (FOLLOW THIS):
✓ Built real-time collaboration editor (React + WebSocket) used by 3K+ students in beta; reduced latency from 500ms to 80ms
✓ Optimized database queries using indexes and caching; reduced backend response time by 60% for 10K concurrent users
✓ Shipped mobile-responsive UI for 8 new features; achieved 96% Lighthouse performance score
✓ Automated deployment pipeline with GitHub Actions; reduced release time from 2 hours to 10 minutes`,
    notes: [
      'Use strong action verbs: Built, Designed, Optimized, Automated, Scaled, Reduced, Increased, Shipped, Launched',
      'Every metric should be realistic and verifiable (you may be asked in an interview)',
      'Front-load the business impact first, then the technical detail',
      'One clear result per bullet; avoid comma chains'
    ],
    xp: 60,
    practice: {
      title: 'Transform a Passive Bullet',
      description: 'Rewrite a weak bullet from your resume using the action verb + impact model. Include at least one quantified result.',
      startCode: `Your weak bullet:
[Paste a bullet from your resume that starts with "Responsible for", "Worked on", or lacks numbers]

Your rewrite:
[Replace it using the format: Action verb + task + metric/impact]`,
      hint: 'Metrics can be: percentage (%), absolute numbers (users, requests, time), uptime, deployments, bugs fixed, or adoption rate. If the number is rough, estimate conservatively and note it. "~40%" is acceptable.',
      solution: `Example transformation:
❌ "Worked on backend optimization"
✓ "Optimized SQL queries using indexes and caching; improved API response time from 2.1s to 450ms, enabling 5K concurrent users vs. 500 prior"`,
      expectedOutput: 'A single bullet with: action verb + clear task + quantified result (%, time, users, or concrete deliverable)'
    }
  },
  {
    id: 'iv-beat-ats',
    category: 'Resume Building',
    title: 'Beating the ATS (Applicant Tracking System)',
    difficulty: 'Beginner',
    theory: [
      'Indian tech companies (especially large ones: TCS, Infosys, Cognizant, Amazon, Microsoft India) filter resumes through Applicant Tracking Systems before human eyes see them. An ATS is a parser—it reads your resume as plain text, strips formatting, and checks for keywords matching the job description. If your resume is rejected at the ATS stage, no cover letter will save you. The #1 mistake: fancy design (graphics, columns, tables, colored text). ATS cannot read images or parse multi-column layouts; it sees a scrambled mess. Solution: plain formatting, standard fonts, clear section headers, and consistent structure.',
      'Keyword matching is the core mechanic. If a job posting asks for "Python, Django, PostgreSQL, AWS, Docker," your resume must contain these exact words in the same order or nearby. Use the same terminology as the job description: if they say "Full Stack Development," use that phrase; if they say "CI/CD pipeline," don\'t substitute "deployment automation." Study the job description for 10–15 keywords and weave them naturally into your experience and skills sections. Pro tip: save the job description as plain text, search it for technical keywords, and mirror them in your resume.',
      'ATS red flags: (1) PDF with embedded graphics or unusual fonts (use .docx or simple PDF instead). (2) Headers/footers (some ATS ignores them). (3) Bullet points using symbols like ◆ or ● (use plain - or •). (4) Table format (merge into plain text). (5) Inconsistent date formats (use "Jan 2024" or "01/2024" throughout). (6) Missing key sections (if the job lists required skills, have a dedicated Skills section). (7) Acronyms defined only once (spell out "AWS (Amazon Web Services)" on first use, then use "AWS" consistently). Indian recruiters are increasingly strict about ATS compliance because volume is high.'
    ],
    code: `❌ ATS POISON (WILL BE REJECTED):
═══════════════════════════════════
   ARYAN KAPOOR
   Full-Stack Developer 🚀
═══════════════════════════════════
[Multi-column layout with colored boxes]
│ SKILLS: Python │ SKILLS: React │
◆ Built a web app
◆ Optimized something
PDF with images, tables, or 2-column format

✓ ATS-FRIENDLY FORMAT:
ARYAN KAPOOR
aryan.kapoor@email.com | +91-9876-543-210
linkedin.com/in/aryankpoor | github.com/aryankapoor

EXPERIENCE
Software Developer | TechCorp (Jan 2024 – Present)
- Architected Python Django REST API serving 500K requests/day
- Implemented AWS Lambda functions for real-time event processing
- Optimized PostgreSQL queries reducing latency by 50%

SKILLS
Programming Languages: Python, JavaScript, C++, SQL
Frameworks & Tools: Django, React, Node.js, Express, Flask
Databases: PostgreSQL, MongoDB, Firebase
Cloud & DevOps: AWS, Docker, GitHub Actions, Kubernetes`,
    output: 'Resume passes keyword scanning and is human-readable in .docx or plain PDF format.',
    notes: [
      'Test your resume: copy-paste into a plain text editor; if it looks good, it\'s ATS-safe',
      'Use .docx or simple .pdf; avoid graphics-heavy PDF',
      'Mirror keywords from the job posting 3–5 times naturally',
      'Check dates, acronyms, and section headers for consistency'
    ],
    xp: 40,
    practice: {
      title: 'ATS Audit Your Resume',
      description: 'Test your resume against ATS parsing rules. Copy-paste it into plain text and check for formatting corruption.',
      startCode: `[Save your resume as .txt (copy-paste from Word or PDF)]
Paste the plain text here and look for:
1. Garbled characters or symbols (❌ bad)
2. Missing section headers (❌ bad)
3. All text readable left-to-right (✓ good)`,
      hint: 'If formatting is broken, your resume is ATS-failed. Reformat in .docx with 11pt Arial/Calibri, plain bullet points, and save as .pdf or .docx. Then re-test.',
      solution: `Corrected resume should:
✓ Have readable plain text with no corruption
✓ Show clear sections: EXPERIENCE, EDUCATION, SKILLS
✓ Use simple - or • bullets
✓ Match job keywords exactly (Python, React, AWS, etc.)
✓ Have consistent date format (Jan 2024 or 01/2024)`,
      expectedOutput: 'Plain-text version of your resume with zero formatting errors and all keywords from the job posting present'
    }
  },
  {
    id: 'iv-linkedin-cover',
    category: 'Application & Networking',
    title: 'The Cover Letter & LinkedIn Profile',
    difficulty: 'Intermediate',
    theory: [
      'Most Indian tech companies no longer require cover letters (ATS filters applications before anyone reads them). However, startups, NGOs, and mid-size firms (Delhivery, Razorpay, Freshworks) often request them, and a strong cover letter can move a borderline candidate from "maybe" to "interview." A cover letter is not a summary of your resume—it\'s a narrative addressing "Why you? Why this role? Why now?" Start with a hook: mention a specific product, person, or problem the company solves. "I\'ve used Zerodha for 2 years and was impressed by your Kite platform\'s speed" beats generic "I\'m excited about your company."',
      'Structure: (1) Hook: show you know the company (2) Why you: 1–2 skills you bring directly matching the job (3) Why this role: what excites you about the problem (4) Close: one line about why you\'ll be great, then sign off. Limit to 250 words—recruiters have 30 seconds. LinkedIn is now the primary discovery channel for Indian tech hiring. Your profile must: have a professional photo (headshot, friendly smile, blurred background), include keywords from your target role in the headline (not "Aspiring SDE" but "Full-Stack Developer | React + Python | Open to SDE-1 Roles"), list all projects with live links, and ask for recommendations from peers or managers. A strong LinkedIn profile can bring recruiter inbound messages, saving you the application grind.',
      'LinkedIn strategy specific to Indian freshers: (1) Headline: "[Role I want] | [2–3 tech skills] | [What I\'ve built]" (2) About section: 100 words on what problems you solve and your learning journey (3) Experience: match resume but add richer project context with images (link to GitHub) (4) Articles: share 1–2 posts on learnings (increases visibility; Google indexes them) (5) Endorsements: ask 5 peers to endorse top skills (signals expertise) (6) Open to Work: enable it privately so recruiters see you. Engage with content in your field (like posts on AI, web dev, data science) and comment thoughtfully—the algorithm surfaces active members.'
    ],
    code: `COVER LETTER TEMPLATE:
Dear [Hiring Manager Name or "Hiring Team"],

I discovered Flipkart\'s problem space through your 2024 hackathon problem: building low-latency checkout for 1M concurrent users. As a developer who shipped a real-time chat app to 50K users, I\'ve wrestled with this exact challenge—and I\'m convinced your infrastructure approach (mentioned in [blog/talk]) is the right path.

I bring three skills to the table: deep React + Node.js proficiency, experience optimizing for scale (reduced API latency by 60% in my last project), and a hunger to learn from world-class systems. I\'ve read your tech blog on Kafka-based event streaming and spent last weekend replicating your architecture locally to understand it deeper.

The role excites me because it\'s not just a job—it\'s the chance to ship high-performance systems millions rely on. I\'d bring that same rigor and curiosity to your team.

I\'m available to chat at +91-[phone] or aryan@email.com.

Best regards,
Aryan Kapoor
linkedin.com/in/aryankpoor
github.com/aryankapoor

LINKEDIN HEADLINE EXAMPLES:
❌ "Aspiring Software Engineer"
✓ "Full-Stack Developer | React + Python + AWS | Built 50K-user chat app | Open to SDE-1"
✓ "Computer Science @ IIT Delhi | Interested in Systems & ML"`,
    notes: [
      'Cover letters: only if explicitly requested (apply-form field or email prompt)',
      'Keep to 1 short paragraph (~250 words) or 3 short paragraphs',
      'Research the hiring manager\'s name if possible (LinkedIn or company site)',
      'LinkedIn: add rich media (project screenshots, GitHub links, certificates) not just text',
      'Engage with content 2–3x/week to boost algorithm visibility'
    ],
    xp: 55,
    practice: {
      title: 'Draft a Targeted Cover Letter',
      description: 'Write a 200–250 word cover letter for a specific job posting. Include: (1) a specific product/problem you know, (2) one matching skill, (3) why the role excites you.',
      startCode: `Target Company: [e.g., Razorpay, Delhivery, Swiggy]
Job Title: [e.g., SDE-1 Backend]
One specific problem the company solves:
[e.g., "Building India's payment infrastructure"]

Your draft:
[Write 1 hook sentence + 2 body sentences + 1 closing line]`,
      hint: 'Hook: "I\'ve used [product] and noticed [problem]. As an SDE, I\'ve tackled this via [your approach]." Then pitch 1 skill. Close with "I\'d love to contribute to this mission."',
      solution: `Example:
"Dear Hiring Team,
I\'ve built with Razorpay\'s API and was impressed by its speed under load. As someone who optimized a real-time notification system for 50K users, I understand the infrastructure challenges you face at scale. My experience with async job queues, payment reconciliation logic, and distributed systems aligns with your SDE-1 backend role.
I\'m excited about building the rails millions of Indians depend on daily.
Best, Aryan"`,
      expectedOutput: 'A 200–250 word cover letter with a hook (specific product knowledge), 1–2 matching skills, and a closing sentence about impact'
    }
  },
  {
    id: 'iv-tell-me-about-yourself',
    category: 'Interview Preparation',
    title: '"Tell Me About Yourself" & Common HR Questions',
    difficulty: 'Beginner',
    theory: [
      'This is the opening question in 95% of Indian interviews (HR screening calls and first rounds). Recruiters use it to assess: (1) communication clarity, (2) self-awareness (can you summarize yourself?), (3) relevance to the role. Most candidates ramble for 3+ minutes or give a mechanical resume-read. Instead, aim for 60–90 seconds. Structure: "I\'m [name], [background]. I\'ve built/worked on [1–2 key projects/experiences]. I\'m seeking [target role] where I can apply [1–2 skills]." Avoid: childhood stories, unrelated hobbies, "I don\'t know what I want," or false humility. Use this as a gentle pitch, not a life story.',
      'Follow-up HR questions are predictable: "Why do you want to work here?" (Know the company\'s mission or a recent product launch—YouTube for 30 seconds on them), "What are your strengths?" (Pick 2–3 relevant to the role, with proof: "I\'m fast at debugging; I fixed 12 production bugs in my internship"), "What\'s a failure?" (Use a real setback, explain what went wrong, and what you learned—this signals maturity and resilience). Common traps: "I\'m a perfectionist" (not a weakness; find a real one), "I don\'t work well with people" (disqualifying), or "I haven\'t failed" (unbelievable and makes you sound inexperienced).',
      'Indian cultural context: Hierarchy and respect matter. Call the interviewer "Sir/Madam" or "Mr./Ms. [Name]" initially; if they say "Call me X," follow their lead. Show gratitude for the opportunity and the time spent. If asked "Do you have any questions?" always ask 2–3 (never say "no")—it shows genuine interest and critical thinking. Good questions: "What does a typical day look like for this role?" "What\'s the biggest challenge the team faces?" "How do you measure success in this role?" Avoid: "What\'s the salary?" or "How many vacation days?" (ask this in offer negotiation, not the first call).'
    ],
    code: `"TELL ME ABOUT YOURSELF" — 90-SECOND TEMPLATE:

Hi, I'm Aryan, a recent B.Tech graduate from IIT Delhi with 3 years of hands-on experience in full-stack web development. During my internship at CodeDaily, I owned the performance optimization project: architected a caching system that reduced API latency from 800ms to 300ms, directly enabling the platform to serve 50K daily active users without outages. I'm particularly drawn to systems thinking and writing robust, scalable code.

I'm now seeking an SDE-1 role where I can ship features from end-to-end—both frontend and backend—while learning from engineers who've built products at scale. Your company's [mention a specific product or recent announcement] aligns perfectly with what I'm passionate about.

---

COMMON HR QUESTIONS + ANSWERS:

Q: "Why do you want to work here?"
A: "I've followed [Company]'s journey with [specific product], and I admire how you solved [concrete problem]. I'm particularly interested in your tech stack [mention one detail from their blog or careers page]. I believe my experience building [one of your projects] will let me contribute meaningfully."

Q: "What's a weakness?"
A: "I used to shy away from speaking up in group meetings. But I realized clarity of thought was more valuable than silence. Over the past year, I've been actively participating in team standups and code reviews, and I've noticed my ideas now shape how my team approaches problems."

Q: "How do you handle stress?"
A: "I break big problems into smaller, solvable chunks. When my payment reconciliation system failed in production [real scenario], I systematically logged each transaction, identified the edge case in 45 minutes, and shipped a fix. I also learned to test edge cases better after that."

Q: "Do you have questions for me?"
✓ "What does a typical day look like for this role?"
✓ "What's the biggest technical challenge the team is solving right now?"
✓ "How do you measure success for someone in this position after 6 months?"`,
    notes: [
      'Practice your "Tell me about yourself" answer until it feels natural, not scripted',
      'Research the company for 10 minutes before the call (mission, recent news, tech blog)',
      'Weaknesses should be real, paired with an action you took to improve',
      'Always prepare 2–3 thoughtful questions to ask the interviewer',
      'End with: "Thank you for the time. I\'m excited about this opportunity."'
    ],
    xp: 45,
    practice: {
      title: 'Record Your "Tell Me About Yourself"',
      description: 'Write and rehearse your 60–90 second intro. Record yourself and listen for: clarity, pacing, relevance to the role, no rambling.',
      startCode: `Your intro:
[Write 1 sentence: background]
[Write 2 sentences: key project or experience]
[Write 1 sentence: why this role]
[Speak it aloud; time yourself]`,
      hint: 'Aim for 60–90 seconds. Too short (30s) = seems disinterested. Too long (2+ min) = rambler. Natural pacing = conversational, not robotic.',
      solution: `Checklist:
✓ Mentioned your name, education/background
✓ Highlighted 1–2 concrete projects with metrics
✓ Explained why this role fits your goals
✓ No "um", "uh", or long pauses (rehearse it!)
✓ Sounds like talking to a friend, not reading`,
      expectedOutput: 'A 60–90 second intro (not a ramble) that covers background, key work, and goal. Recorded and confidence-checked.'
    }
  },
  {
    id: 'iv-star-method',
    category: 'Interview Preparation',
    title: 'The STAR Method for Behavioural Questions',
    difficulty: 'Intermediate',
    theory: [
      'Behavioural questions ("Tell me about a time when you…") are asked by ~80% of Indian companies to assess how you handle conflict, failure, pressure, and teamwork. They\'re testing soft skills: communication, problem-solving, and growth mindset. The STAR method structures your answer: (1) Situation: set the scene in 1–2 sentences (where, when, context), (2) Task: what was your responsibility or the challenge?, (3) Action: what specific steps did YOU take (not "we decided," but "I proposed"), (4) Result: what was the outcome? (metrics, learning, or resolution). The result is critical—vague answers tank. "I learned a lot" loses to "I reduced response time by 40% and the manager promoted me to lead the feature."',
      'Common behavioural prompts at Indian tech companies: "Tell me about a time you failed." (Handled gracefully; learned and shipped a better solution later.) "A time you disagreed with your manager." (Respectfully voiced your view; listened to their perspective; maybe they were right, maybe you found common ground.) "A time you had to work with a difficult person." (Found their strength; communicated clearly; focused on the task.) "Under pressure/tight deadline." (Prioritized ruthlessly; communicated with stakeholders; shipped a working version on time.) "A time you took ownership." (Identified a problem no one was owning; solved it end-to-end; measured the impact.) Prepare 5–7 real stories before your interview so you can adapt them to different questions.',
      'Pro tips specific to Indian culture: (1) Emphasize collaboration and respect—don\'t trash-talk your old team or manager. (2) Show humility: "I realized I was wrong" is respected, not weakness. (3) Quantify results where possible, but integrity matters more than flashy numbers. (4) If your story involves a failure, emphasize what you learned and how you prevented it next time. (5) Keep stories concise: 2–3 minutes max. (6) Use the future tense for learning: "That taught me to X, which I now do in Y situations." This signals continuous growth, highly valued in Indian startups and MNCs alike.'
    ],
    code: `POOR STAR ANSWER (VAGUE, NO RESULT):
"I was assigned a project once, and we worked as a team. It was challenging, but we pushed hard and finished it. I learned that teamwork is important. The manager was happy with it."

STRONG STAR ANSWER (CONCRETE, METRICS):
Situation: "At CodeDaily, I was assigned the real-time notifications feature for a platform serving 50K users."
Task: "The initial design proposed by the team would add 500ms latency to every API call, which would break our UX goals."
Action: "I analyzed the bottleneck, proposed a queue-based architecture using Celery + Redis, wrote a proof-of-concept in 2 days, and presented it to the team with latency benchmarks."
Result: "We adopted the design. Latency stayed at 100ms, we shipped on time, and the feature had a 92% adoption rate. My manager specifically noted the initiative in my performance review."

EXAMPLE: "Tell me about a time you failed."
S: "My first Django project had a race condition I missed in testing. A payment got processed twice in production."
T: "I was responsible for payment logic and fixing it."
A: "I added database-level constraints (unique on idempotency_key), added integration tests covering concurrent requests, and deployed a hotfix within 90 minutes. I also documented the lesson in our team wiki."
R: "Zero payment duplicates after that. The team adopted the pattern for all financial operations."`,
    notes: [
      'Prepare 5–7 stories before the interview (failure, conflict, pressure, teamwork, ownership, disagreement, learning)',
      'Each story should take 2–3 minutes to tell (not shorter, not longer)',
      'Always end with a concrete result: metric, decision made, or learning applied',
      'Use "I" not "we"—own your action, acknowledge the team\'s role',
      'Practice saying these out loud; interview calls require verbal fluency'
    ],
    xp: 70,
    practice: {
      title: 'Craft a STAR Story',
      description: 'Choose a real challenge from your past. Structure it as a complete STAR answer (2–3 minutes spoken).',
      startCode: `Situation: [Where? When? Context in 1–2 sentences]
Task: [What was the challenge or your role?]
Action: [What specific steps did YOU take? 3–4 bullet points]
Result: [Metric, learning, or outcome achieved?]`,
      hint: 'Action should be detailed: "I reviewed 10 database queries, indexed 3 of them, ran load tests showing 50% improvement." Vague is: "I optimized it."',
      solution: `Complete STAR (verbal, 2–3 min):
"At my internship, our team\'s API was timing out for 20% of requests under load [Situation]. I was tasked with diagnosing and fixing it [Task]. I profiled the slow endpoints, discovered N+1 queries, added eager loading, and optimized our most-hit index [Action]. Response time dropped from 2.1s to 400ms, errors fell to <1%, and the platform could handle 10x peak traffic [Result]."`,
      expectedOutput: 'A 2–3 minute spoken STAR story with clear Situation, Task, Action (specific steps), and Result (with metrics or learning)'
    }
  },
  {
    id: 'iv-technical-prep',
    category: 'Interview Preparation',
    title: 'Technical Interview Prep & Asking Good Questions',
    difficulty: 'Advanced',
    theory: [
      'Indian tech companies (Amazon, Google, Flipkart, Swiggy, Razorpay) typically run 2–3 technical rounds after HR screening. For SDE-1 roles, expect: (1) Coding round (1–2 LeetCode-style problems in 60–90 min), (2) System design round (architecture an app for 10M users—less common for SDE-1, more for mid-level), (3) Problem-solving/debugging round. You need both breadth and depth: know data structures (arrays, linked lists, trees, heaps, graphs, hash maps), sorting/searching algorithms (binary search, merge sort, DFS/BFS), complexity analysis (Big O), and 1–2 domains deeply (e.g., backend systems or frontend performance). Most Indian interviewers expect clean, working code—syntax matters; partial solutions earn points but lose marks for unhandled edge cases.',
      'Preparation roadmap: Week 1–2: Solve 50 LeetCode problems (Easy level) focusing on arrays, strings, and hash maps. Week 3–4: Move to Medium; focus on trees, graphs, and dynamic programming. Week 5+: Review hard problems selectively; spend time on system design concepts (databases, caching, load balancing, microservices). Use platforms like InterviewBit (popular with Indian candidates) or CodeChef for practice. Mock interviews on Pramp or Interviewing.io help simulate real-time pressure. During the actual interview, think aloud: "I\'ll use a hash map to track X in O(1), then iterate once…" This shows your thought process even if you stumble on syntax. Ask for hints if you\'re stuck—interviewers respect curiosity, not silence.',
      'Asking good questions is a superpower. At the end of every round ("Any questions for me?"), ask 2–3 thoughtful questions that show you\'ve researched and think critically. Good questions: "What does the onboarding look like for new engineers?" "What\'s the biggest technical debt the team is working on?" "How do you balance shipping features with technical health?" "What does career growth look like in this team?" Avoid: "What\'s the salary?" or "How much vacation?" (ask during offer negotation). Asking nothing signals disinterest; interviewers read this. After an interview (especially final round), send a thank-you email within 24 hours mentioning a specific conversation point—this keeps you memorable and shows professionalism.'
    ],
    code: `EXAMPLE TECHNICAL PROBLEM + SOLUTION:

PROBLEM:
"Given a string, find the longest substring without repeating characters."
Input: "abcabcbb"
Output: 3 (substring "abc")

APPROACH (Think Aloud):
"I'll use a sliding window with a hash map to track character indices. Expand the window by moving the right pointer; when I hit a duplicate, shrink from the left. Track the max length."

SOLUTION (Python):
\`\`\`python
def lengthOfLongestSubstring(s: str) -> int:
    char_index = {}  # char -> most recent index
    max_length = 0
    left = 0

    for right in range(len(s)):
        if s[right] in char_index:
            # Move left pointer past the duplicate
            left = max(left, char_index[s[right]] + 1)

        char_index[s[right]] = right
        max_length = max(max_length, right - left + 1)

    return max_length
\`\`\`

Complexity: O(n) time, O(min(n, charset)) space.

GOOD QUESTIONS TO ASK (after technical round):
✓ "What was the toughest part of building [system they discussed]?"
✓ "How do you approach code review in your team?"
✓ "What does the typical day look like for someone in this role?"
✓ "What's a recent technical decision you regret and why?"
✗ "What's the salary?" (ask only in final offer stage)
✗ "How much vacation?" (not relevant yet)`,
    notes: [
      'Practice 30–50 LeetCode problems before your first technical interview',
      'Learn to explain your thought process aloud—interviewers care about reasoning, not just the answer',
      'Test edge cases: empty strings, single elements, duplicates, negative numbers',
      'Write clean code with variable names that explain intent',
      'Ask questions after the round; silence signals disinterest'
    ],
    xp: 100,
    practice: {
      title: 'Solve a LeetCode-style Problem & Explain',
      description: 'Solve one medium-difficulty problem (arrays, strings, or trees). Record yourself explaining your approach out loud.',
      startCode: `Choose a problem from LeetCode (Medium difficulty):
Example: "Two Sum II - Input Array Is Sorted"

Write your solution:
[Code here with comments]

Explain out loud (2 min):
"I'll use a two-pointer approach: left at start, right at end. If sum equals target, return indices. If sum is too small, move left pointer right. If too large, move right pointer left. Time: O(n), space: O(1)."`,
      hint: 'Edge cases matter: what if no solution exists? What if there are duplicates? Handle these in your code.',
      solution: `Example solution (Two Sum II):
\`\`\`python
def twoSum(numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]  # 1-indexed
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []
\`\`\`
Complexity: O(n) time, O(1) space.`,
      expectedOutput: 'A working solution + verbal explanation of approach and complexity (2–3 min recording)'
    }
  },
  {
    id: 'iv-salary-weaknesses',
    category: 'Interview Preparation',
    title: 'Handling Salary, Weaknesses & Tricky Questions',
    difficulty: 'Advanced',
    theory: [
      'Salary negotiation is often the most stressful part for Indian freshers. Key principle: Never mention a number first. If asked "What are your salary expectations?" redirect: "I\'m flexible and open to competitive offers for the role and location. What\'s the range for this position?" Most Indian companies have published ranges (or will share them). Research beforehand: Glassdoor India, Levels.fyi, and discussions on platforms like AskBenStalk show that SDE-1 roles at top Indian tech companies now range ₹15–30 LPA (tier-1 startups/MNCs); tier-2 companies ₹10–18 LPA. Base salary is just the start—ask about bonus (8–15%), RSUs/ESOPs (1–3 year vesting), and benefits (health, relocation). For freshers, negotiation room exists but is smaller (20–30% wiggle room); for mid-level, bigger (40–50%). In India, counter-offer timing matters: wait until you receive a written offer, then respond in writing to HR, not verbally. A polite counter: "Thank you for the offer. Based on my research and compensation at similar roles in Bangalore, I believe ₹X is more aligned with market rates. Can we discuss?"',
      'Weaknesses: "I\'m a perfectionist" is overused and rings false. Real weaknesses: "I used to rush through code reviews, missing edge cases." (Action: "Now I spend 15 min per review, ask clarifying questions, and the team noticed quality improved.") "I struggle with public speaking." (Action: "I joined Toastmasters, presented in 3 team meetings, and I\'m more confident now.") "I sometimes get frustrated with slow systems." (Action: "I learned to debug methodically; frustration doesn\'t help. Now I write it down and trace through logs.") The key: real + actionable + shows growth. Avoid disqualifying weaknesses ("I don\'t work well with teams," "I\'m lazy," "I miss deadlines") or red flags.',
      'Tricky questions you\'ll hear: (1) "Why are you leaving your current job?" (Never trash-talk; focus on growth: "I want exposure to systems at scale.") (2) "Why should we hire you over other candidates?" (Confidence + specificity: "I\'ve shipped 3 production features, reduced latency by 40%, and I\'m hungry to learn. I\'ll add value on day one.") (3) "Where do you see yourself in 5 years?" (Be honest: "I want to master backend systems, maybe lead a small team, and contribute to open source.") (4) "What would your manager say about you?" (Honest: "That I\'m detail-oriented, ask good questions, and improve things incrementally.") (5) "Convince me you\'re not just smart on paper." (Talk about impact: "I don\'t just implement features; I measure them. My last feature had 92% adoption.") These questions reward authenticity and self-awareness, not a rehearsed answer.'
    ],
    code: `SALARY NEGOTIATION SCRIPT:

❌ DON'T START THE NUMBER:
Recruiter: "What's your salary expectation?"
Bad: "₹20 LPA?"

✓ DO REDIRECT:
Recruiter: "What's your salary expectation?"
Good: "I'm excited about this role. To set realistic expectations, what's the salary range you've budgeted for this position?"
[They give range: ₹18–25 LPA]
Response: "That range sounds reasonable. Are bonuses, RSUs, or relocation part of that, or separate?"

✓ IF YOU NEED TO COUNTER:
[After receiving written offer: ₹18 LPA base + 12% bonus + 0 RSUs]
Email to HR: "Thank you for the offer. I'm genuinely excited about joining the team. Based on my research of market compensation for SDE-1 roles in Bangalore (Levels.fyi, Glassdoor) and my background [mention 1 strong point: "shipped 3 production features," "AWS certified"], I believe ₹22 LPA base better reflects the value I'll add. Can we bridge this gap?"
[They may say: ₹20 LPA or "that's our max." Accept or walk away.]

---

WEAKNESS EXAMPLES (WITH RECOVERY):

Bad: "I'm a perfectionist."
Good: "I used to overthink every code change, which slowed shipping. I learned that shipping a working v1 and iterating is better than a perfect v0.5. Now I ship first, refactor based on real metrics."

Bad: "I don't work well in teams."
Good: [This is disqualifying. Don't say it.]

Good: "I struggle with ambiguous requirements. I'd spend days coding in the wrong direction. Now I ask clarifying questions upfront and write specs before coding. In my last project, this saved 2 weeks."

---

TRICKY QUESTIONS:

Q: "Why should we hire you?"
A: "I've shipped 4 features end-to-end: frontend, backend, and launch. I measure impact obsessively—my last feature had 92% adoption. I'm not just good at coding; I'm good at solving problems. And I'm genuinely excited about your company's mission."

Q: "Where do you see yourself in 5 years?"
A: "In this company, I see myself mastering distributed systems, maybe moving into architecture or tech lead. I want to be the person who optimizes critical paths and mentors junior engineers. I'm also interested in contributing to open-source projects in my domain."

Q: "What's a recent failure?"
A: [See STAR method, but keep it brief and focus on recovery]`,
    notes: [
      'Never state a number first in salary discussions. Wait for the company range.',
      'Research market rates before interviews: Levels.fyi, Glassdoor India, AskBenStalk',
      'Negotiate in writing after receiving a written offer, not verbally',
      'Counter once, max. If they say "that\'s our max," believe them or walk away.',
      'Weaknesses must be real + paired with action taken to improve',
      'Avoid disqualifying answers that end the interview'
    ],
    xp: 85,
    practice: {
      title: 'Prep Your Weakness + Response',
      description: 'Identify a genuine weakness from your past. Write how you\'ve addressed it. Practice saying it aloud (60 seconds).',
      startCode: `My weakness: [Something real, e.g., "I used to miss deadlines"]
Action I took: [Specific change, e.g., "Started using Jira to track tasks + weekly standups"]
How I say it (60 sec):
"I used to struggle with time management on large projects. I'd underestimate scope and miss deadlines. [Pause.] So I started using Jira to break tasks into bite-sized pieces and joined weekly standups where I commit to deliverables. In my last project, I shipped on time for 8 consecutive weeks."`,
      hint: 'Weakness must be real, believable, and paired with a recovery story. Practice saying it naturally (not reading from paper).',
      solution: `Checklist:
✓ Real weakness (not "perfectionism")
✓ Specific action taken (not vague "I learned")
✓ Proof of change (metric or example)
✓ Takes 60 seconds to say
✓ Sounds humble, not defensive`,
      expectedOutput: 'A 60-second verbal answer about a weakness + how you fixed it. Sounds natural and reflects growth.'
    }
  },
  {
    id: 'iv-day-of-interview',
    category: 'Interview Day',
    title: 'Interview-Day Etiquette, Virtual Interviews & Follow-Up',
    difficulty: 'Beginner',
    theory: [
      'First impressions matter intensely in Indian hiring. For in-person interviews: Arrive 10–15 minutes early (not late; lateness is disrespectful). Dress smart-casual (button-up shirt or kurta, trousers, closed shoes; avoid casual t-shirts or overly formal blazers unless it\'s a bank or consulting firm). Greet with a firm handshake and "Namaste" or "Good morning, Sir/Madam." Turn off your phone before entering the office. During the interview: Sit up straight, maintain eye contact, nod when they speak. If you don\'t understand a question, ask clarification: "Just to clarify, are you asking about my approach to X or the result of Y?" It\'s better to ask than to ramble off-topic. Speak clearly; avoid "umm" and "uh." Take 2–3 seconds before answering to gather thoughts (silence is fine; rushing makes you sound nervous).',
      'Virtual interviews (Zoom, Google Meet, Teams) require extra prep: Test camera, mic, and internet 30 minutes early. Use a clean, professional background (blurred or a plain wall). Dress the same as in-person (not casual below the frame; Zoom calls have been known to pan out). Position your camera at eye level (laptop on a stand, not a desk). No distractions: close email, Slack, other browser tabs. During the call, look at the camera when speaking (not at their face on screen), which simulates eye contact. If internet lags or you freeze, say "I\'m sorry, I\'m experiencing a connection issue. Can you hear me?" Then restart calmly. Most interviewers are patient about tech glitches; panic is worse.',
      'Follow-up etiquette is often overlooked but high-impact. Within 24 hours of the interview, send a thank-you email to your interviewer. Template: "Dear [Name], Thank you for taking the time to speak with me today. Our discussion about [specific topic] was insightful, and I\'m even more excited about the opportunity to contribute to [team/product]. Please let me know if you need any additional information. Best regards, [Your name]." If you interviewed with multiple people, send individualized emails (not a mass BCC). If you receive a rejection, respond graciously: "Thank you for the opportunity. I\'d appreciate feedback on areas I can improve." This keeps the door open for future roles or referrals. If an offer comes, don\'t accept verbally—ask for it in writing and take 24–48 hours to review before responding (especially if you\'re negotiating).'
    ],
    code: `IN-PERSON INTERVIEW CHECKLIST:
□ Arrive 10–15 min early
□ Phone OFF (not silent; off)
□ Dress: smart-casual (shirt, trousers, closed shoes)
□ Firm handshake, smile, "Namaste" or "Good morning"
□ Sit up straight; eye contact
□ Speak clearly, pause before answering
□ No "umm," "uh," or rushing
□ Ask clarifying questions if confused
□ At the end: "Any tips for success in this role?" or "What does the team most value?"

VIRTUAL INTERVIEW CHECKLIST:
□ Test camera, mic, internet 30 min early
□ Blurred or clean background
□ Positioned at eye level (camera at nose height)
□ Dressed fully (not casual below frame)
□ Close email, Slack, other browser tabs
□ Look at the camera, not the screen
□ Professional Zoom link: slack_name or firstname_lastname
□ Background name on Zoom: "FirstName LastName"

THANK-YOU EMAIL (24 hrs after interview):
Subject: Thank You – [Your Name] – [Date of Interview]

Dear Mr./Ms. [Name],

Thank you for taking the time to interview me today. I particularly enjoyed our discussion about [mention a specific topic from the interview—e.g., "the real-time notification architecture you're building" or "your team's approach to testing"].

Your insights into [another specific detail] have reinforced my enthusiasm for joining your team and contributing to [concrete goal related to the role].

I look forward to hearing from you. Please let me know if you need any additional information.

Best regards,
[Your Full Name]
[Phone Number]
[LinkedIn Profile URL]

---

IF REJECTED:
Subject: Thank You & Feedback Request

Dear [Name],

Thank you for the opportunity to interview with your team. While I'm disappointed with the outcome, I'm genuinely grateful for the experience and the feedback I received. I'd deeply appreciate any specific areas you feel I could improve for future opportunities with [Company] or elsewhere.

I remain very interested in [Company]'s mission and would welcome the chance to apply for future openings.

Best regards,
[Name]`,
    notes: [
      'Turn off phone completely—vibration on a desk is visible and rude',
      'Pause for 2–3 seconds before answering; silence is better than rambling',
      'Virtual interviews: test tech 30 minutes early; background matters',
      'Send thank-you emails within 24 hours; personalize each one',
      'If rejected, ask for feedback and respond gracefully (doors may reopen)',
      'Don\'t accept offers verbally; ask for written offer; take 24–48 hrs to review'
    ],
    xp: 40,
    practice: {
      title: 'Run a Mock Interview',
      description: 'Conduct a practice interview with a friend or record yourself. Focus on body language, tone, and handling questions.',
      startCode: `Mock Interview Agenda (30 min):
1. "Tell me about yourself" (2 min)
2. "Why do you want to work here?" (2 min)
3. A technical question (coding or system design) (10 min)
4. "What's a weakness?" (2 min)
5. "Any questions for us?" (You ask 2–3 questions) (5 min)
6. Feedback (7 min)

Record video or practice with a friend.
Self-review: Clarity? Pacing? Eye contact? Confidence?`,
      hint: 'If practicing solo, use Zoom with a friend or OBS to record. Watch the playback for tics, filler words, or unclear explanations.',
      solution: `Scorecard (after mock interview):
✓ Spoke clearly, no filler words
✓ Answered concisely (not rambling)
✓ Showed enthusiasm
✓ Asked thoughtful questions back
✓ Handled uncertainty (asked for clarification)
✓ Professional demeanor (looked prepared)`,
      expectedOutput: 'A 30-minute mock interview (video or recorded) where you practice pacing, tone, and confidence. Self-assess 1–2 improvements.'
    }
  }
];
