/**
 * Career Guides — programmatic SEO cluster data.
 * Covers streams (10th, 12th), professional paths (engineer, doctor, data scientist, etc.),
 * and post-12th specializations (commerce, arts, science). All India-specific, free, student/parent-friendly.
 */

export interface CareerGuide {
  slug: string;
  title: string;
  emoji: string;
  overview: string;
  whoShouldChoose: string;
  subjects: string[];
  coursesAfter: string[];
  entranceExams: string[];
  skills: string[];
  salaryRange: string;
  roadmap: string[];
  faqs: { q: string; a: string }[];
}

export const CAREER_GUIDES: CareerGuide[] = [
  {
    slug: 'which-stream-after-10th',
    title: 'Which Stream Should You Choose After 10th Grade?',
    emoji: '🎓',
    overview: 'Choosing a stream after 10th Grade is one of the most important decisions in an Indian student\'s academic journey. Science, Commerce, and Humanities are the three main paths, each opening different career doors. This guide explains what each stream covers, typical careers, and how to choose based on your interests and strengths.',
    whoShouldChoose: 'Students in Class 10 preparing to choose a stream for Class 11-12, parents wanting to understand stream options, and educators advising students on career pathways.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'History', 'Geography', 'Political Science'],
    coursesAfter: ['Bachelor of Engineering (B.Tech)', 'Bachelor of Commerce (B.Com)', 'Bachelor of Arts (B.A)', 'Bachelor of Science (B.Sc)'],
    entranceExams: ['JEE Main', 'NEET UG', 'CUET'],
    skills: ['Analytical thinking', 'Problem-solving', 'Decision-making', 'Self-assessment', 'Career planning'],
    salaryRange: 'Indicative: ₹3–15 LPA depending on field and education; varies widely by specialization.',
    roadmap: [
      '1. Assess your interests: Do you prefer numbers, languages, or a mix?',
      '2. Evaluate strengths: Which subjects do you enjoy and perform well in?',
      '3. Research career options: Explore typical careers for each stream.',
      '4. Talk to counselors: Seek guidance from school or professional career counselors.',
      '5. Make an informed choice: Select the stream aligned with your goals.',
    ],
    faqs: [
      {
        q: 'Can I change my stream after 11th Grade?',
        a: 'Yes, many schools allow stream changes after the first term of 11th Grade, but policies vary. Check with your school for deadlines and procedures.',
      },
      {
        q: 'Which stream is easiest?',
        a: 'There\'s no "easiest" stream — difficulty depends on your strengths. Science requires strong math; Commerce involves accounts and economics; Arts focuses on language and social studies.',
      },
      {
        q: 'Is Science mandatory to become an engineer?',
        a: 'Yes, most engineering colleges require a Science background (Math, Physics, Chemistry). Commerce and Arts students typically cannot directly pursue engineering.',
      },
    ],
  },

  {
    slug: 'which-stream-after-12th',
    title: 'Best Streams & Specializations After 12th Grade',
    emoji: '📚',
    overview: 'After 12th Grade, your stream (Science, Commerce, or Arts) determines your undergraduate specialization. This guide covers the top streams and specializations available post-12th, entrance exams you might need, and typical salary expectations in India.',
    whoShouldChoose: 'Class 12 students finalizing their higher education path, parents supporting their child\'s decision, and students considering change of specialization.',
    subjects: ['Subject selection based on prior stream', 'Mathematics/Advanced Math', 'Physics', 'Chemistry', 'Biology', 'Economics', 'History'],
    coursesAfter: ['B.Tech / B.E (Engineering)', 'MBBS (Medicine)', 'B.Com / B.Com (Honors)', 'B.A / B.Sc (various specializations)', 'BCA (Computer Applications)', 'B.Pharmacy'],
    entranceExams: ['JEE Main & Advanced', 'NEET UG', 'CUET (Common University Entrance Test)', 'CLAT (Law)', 'CAT (MBA)'],
    skills: ['Subject mastery', 'Entrance exam preparation', 'Time management', 'Adaptability', 'Leadership'],
    salaryRange: 'Indicative: ₹4–25 LPA for graduates; varies by degree, specialization, institution, and job role.',
    roadmap: [
      '1. Finalize your stream before 12th board exams.',
      '2. Focus on board exams and standardized test prep (JEE, NEET, CUET) simultaneously.',
      '3. Research colleges and specialization options in your stream.',
      '4. Take entrance exams in your final year or after 12th.',
      '5. Apply to colleges and choose your specialization.',
    ],
    faqs: [
      {
        q: 'Do I need to take an entrance exam for all undergraduate courses?',
        a: 'Major courses like engineering (JEE), medicine (NEET), and central universities (CUET) require entrance exams. Some colleges also conduct their own entrance tests.',
      },
      {
        q: 'Can Commerce students pursue Engineering?',
        a: 'No, most engineering programs require a Science background (Math, Physics, Chemistry). Commerce students can pursue commerce-based courses or some specialized diplomas.',
      },
      {
        q: 'What if I don\'t get into my first-choice specialization?',
        a: 'You can take a different specialization and later pursue a postgraduate degree, diploma, or lateral entry in your desired field.',
      },
    ],
  },

  {
    slug: 'how-to-become-engineer',
    title: 'How to Become an Engineer in India — Steps, Exams & Career Path',
    emoji: '🔧',
    overview: 'Engineering is one of India\'s most sought-after careers, offering diverse specializations from mechanical to software. This guide covers the educational path, entrance exams, specializations, and career growth in engineering.',
    whoShouldChoose: 'Students strong in Math and Physics, interested in problem-solving and technology, aspiring to build or design systems.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Programming fundamentals', 'Engineering mechanics', 'Thermodynamics'],
    coursesAfter: ['B.Tech / B.E (4 years)', 'Diploma in Engineering (3 years)', 'M.Tech (Postgraduate)', 'Specialized certificates'],
    entranceExams: ['JEE Main (for NITs, IIITs)', 'JEE Advanced (for IITs)', 'State-level entrance exams', 'College-specific exams'],
    skills: ['Mathematical problem-solving', 'CAD and design tools', 'Programming', 'Teamwork', 'Technical communication'],
    salaryRange: 'Indicative: ₹5–30 LPA for freshers; ₹15–60+ LPA with experience and specialization (software, core, specializations vary widely).',
    roadmap: [
      '1. Choose Science with Math in 11th-12th Grade.',
      '2. Score well in JEE Main or state entrance exams.',
      '3. Enroll in a B.Tech program at NIT, IIT, or college (4 years).',
      '4. Build projects and gain internship experience in your specialization.',
      '5. Join your first company or pursue higher education (M.Tech, MBA).',
    ],
    faqs: [
      {
        q: 'What\'s the difference between JEE Main and JEE Advanced?',
        a: 'JEE Main is the gateway exam for NITs and IIITs. Top JEE Main rankers can attempt JEE Advanced, which is required for IIT admission.',
      },
      {
        q: 'Can I become an engineer via diploma?',
        a: 'Yes, a 3-year diploma from a polytechnic institute leads to engineer positions. You can also pursue a lateral entry to the 2nd year of a B.Tech program.',
      },
      {
        q: 'Which engineering specialization pays the most?',
        a: 'Software Engineering, Computer Science, and specialized roles in data science often command higher salaries. Core engineering (mechanical, civil) can also be lucrative with the right company and experience.',
      },
    ],
  },

  {
    slug: 'how-to-become-doctor',
    title: 'How to Become a Doctor in India — NEET, MBBS & Medical Career Guide',
    emoji: '⚕️',
    overview: 'Medicine is a prestigious and impactful career in India. This guide covers the NEET exam, MBBS admission, specializations, and what it takes to become a doctor.',
    whoShouldChoose: 'Students passionate about healthcare and helping others, strong in Biology and Chemistry, aiming to serve society through medicine.',
    subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Medical sciences fundamentals'],
    coursesAfter: ['MBBS (Bachelor of Medicine, 5.5 years)', 'MD/MS Specialization (3 years)', 'DNB (Diploma in National Board)', 'Super specializations'],
    entranceExams: ['NEET UG (mandatory for MBBS)', 'NEET PG (for postgraduate specialization)', 'State-level medical exams'],
    skills: ['Strong biology and chemistry knowledge', 'Empathy', 'Manual dexterity', 'Continuous learning', 'Patient communication'],
    salaryRange: 'Indicative: ₹5–20 LPA for MBBS graduates; ₹15–50+ LPA for specialists; varies by specialization, practice type (private/government), and experience.',
    roadmap: [
      '1. Choose Science with Biology in 10th-12th Grade.',
      '2. Prepare intensively for NEET UG during 11th-12th.',
      '3. Score high in NEET and qualify for MBBS admission.',
      '4. Complete 5.5-year MBBS program and clinical rotations.',
      '5. Pursue MD/MS specialization or start practice in your field.',
    ],
    faqs: [
      {
        q: 'Is NEET mandatory for all medical colleges in India?',
        a: 'Yes, NEET UG is mandatory for admission to all government and private medical colleges in India (except some deemed universities with their own entrance tests).',
      },
      {
        q: 'How long does it take to become a doctor in India?',
        a: 'MBBS takes 5.5 years (5 years of coursework + 1 year mandatory internship). MD/MS specialization adds 3 more years, making it 8.5 years total for a specialist.',
      },
      {
        q: 'Can I become a doctor if I score average marks in 12th?',
        a: 'Yes, but NEET is highly competitive. Focus on NEET preparation rather than 12th marks alone. Many top scorers come from average academic backgrounds but excel in focused entrance exam prep.',
      },
    ],
  },

  {
    slug: 'how-to-become-data-scientist',
    title: 'How to Become a Data Scientist in India — Skills, Degrees & Salary',
    emoji: '📊',
    overview: 'Data science is one of India\'s fastest-growing careers, combining statistics, programming, and business acumen. This guide covers educational paths, required skills, and career growth.',
    whoShouldChoose: 'Students strong in math and programming, interested in deriving insights from data, curious about AI and machine learning applications.',
    subjects: ['Mathematics (Statistics, Linear Algebra)', 'Computer Science / Programming', 'Chemistry/Physics (for data science fundamentals)', 'Data structures'],
    coursesAfter: ['B.Tech Computer Science (+ Data Science specialization)', 'B.Sc Statistics/Mathematics (+ Postgraduate Diploma)', 'PGP Data Science (Post-Bachelor)', 'M.Tech Data Science'],
    entranceExams: ['JEE Main (for B.Tech programs)', 'University-specific entrance for postgraduate programs'],
    skills: ['Python/R programming', 'Statistics and probability', 'Machine Learning', 'SQL and databases', 'Data visualization'],
    salaryRange: 'Indicative: ₹8–20 LPA for entry-level; ₹25–50+ LPA for senior data scientists and ML engineers; varies by company, specialization, and experience.',
    roadmap: [
      '1. Choose Science with Math in 10th-12th Grade.',
      '2. Pursue B.Tech in Computer Science or B.Sc in Mathematics/Statistics.',
      '3. Develop programming skills (Python, R) and learn statistics.',
      '4. Complete internships and build data science projects.',
      '5. Apply to companies or pursue a postgraduate diploma/M.Tech for advanced roles.',
    ],
    faqs: [
      {
        q: 'Do I need a specialized degree in Data Science?',
        a: 'No, you can become a data scientist with a B.Tech in CS, B.Sc in Math/Statistics, or even unrelated degrees with strong self-learning. A postgraduate diploma or M.Tech accelerates entry.',
      },
      {
        q: 'Is programming mandatory for data science?',
        a: 'Yes, proficiency in Python or R is essential. You\'ll also need SQL for data handling and familiarity with ML libraries like scikit-learn and TensorFlow.',
      },
      {
        q: 'What\'s the difference between Data Science and Data Analysis?',
        a: 'Data analysts focus on interpreting existing data. Data scientists build predictive models and develop new data solutions using machine learning and statistics.',
      },
    ],
  },

  {
    slug: 'how-to-become-software-engineer',
    title: 'How to Become a Software Engineer in India — Career Guide & Salary',
    emoji: '💻',
    overview: 'Software engineering is the backbone of India\'s IT industry. This guide covers the path to becoming a software engineer, required skills, specializations, and career growth.',
    whoShouldChoose: 'Students passionate about coding and problem-solving, interested in building applications, tech-savvy and eager to learn new technologies.',
    subjects: ['Mathematics', 'Computer Science', 'Programming fundamentals', 'Data structures', 'Algorithms'],
    coursesAfter: ['B.Tech Computer Science / IT (4 years)', 'BCA - Bachelor of Computer Applications (3 years)', 'M.Tech CS (Postgraduate)'],
    entranceExams: ['JEE Main (for B.Tech programs)', 'University entrance for BCA programs', 'GATE (for M.Tech)'],
    skills: ['Programming languages (Java, Python, C++)', 'Web development', 'Database management', 'Version control (Git)', 'Problem-solving'],
    salaryRange: 'Indicative: ₹6–15 LPA for freshers; ₹25–60+ LPA for senior engineers and specialists; varies by company, specialization, and tech stack expertise.',
    roadmap: [
      '1. Choose Computer Science or IT stream in 11th-12th Grade.',
      '2. Gain JEE Main rank for B.Tech or BCA admission.',
      '3. Learn programming languages and build projects during college.',
      '4. Intern at tech companies and contribute to open-source projects.',
      '5. Join as a Software Developer / Engineer or pursue specialization roles.',
    ],
    faqs: [
      {
        q: 'Do I need a B.Tech to become a software engineer?',
        a: 'No, many engineers start with BCA, bootcamps, or self-learning combined with portfolio projects. However, B.Tech opens more doors in India\'s corporate sector.',
      },
      {
        q: 'Which programming language should I start with?',
        a: 'Python or Java are beginner-friendly. Choose based on your interests: Python for data/AI, Java for enterprise applications, JavaScript for web development.',
      },
      {
        q: 'How important are college placements?',
        a: 'Very important in India, especially for top companies. Build a strong coding portfolio and GitHub profile as backup if your college doesn\'t have placements.',
      },
    ],
  },

  {
    slug: 'how-to-become-chartered-accountant',
    title: 'How to Become a Chartered Accountant (CA) in India — Steps & Salary',
    emoji: '💼',
    overview: 'Chartered Accountancy is a prestigious finance profession in India. This guide covers the CA qualification process, career paths, and salary expectations.',
    whoShouldChoose: 'Commerce students with strong accounting and math skills, interested in finance, auditing, and business advisory roles.',
    subjects: ['Accounts', 'Economics', 'Mathematics', 'Business law', 'Income tax', 'Cost accounting'],
    coursesAfter: ['CA Foundation (4 months)', 'CA Intermediate (8 months)', 'CA Final (8 months)', 'Articleship (3 years)'],
    entranceExams: ['CA Foundation entrance test', 'CA Intermediate exams (Group 1 & 2)', 'CA Final exams (Group 1 & 2)'],
    skills: ['Accounting and taxation', 'Auditing', 'Financial analysis', 'Business acumen', 'Attention to detail'],
    salaryRange: 'Indicative: ₹4–10 LPA during articleship; ₹12–40+ LPA as practicing CA or in corporate roles; varies by specialization and practice type.',
    roadmap: [
      '1. Complete Class 12 (Commerce or any stream).',
      '2. Register for CA Foundation and complete 4 months of study.',
      '3. Appear for CA Foundation exams.',
      '4. Enroll for CA Intermediate (8 months study + 8 months work experience).',
      '5. Complete CA Final exam (8 months study) + 3-year articleship to obtain CA certification.',
    ],
    faqs: [
      {
        q: 'Can non-Commerce students become a Chartered Accountant?',
        a: 'Yes, any stream can pursue CA after 12th. However, Commerce students find the curriculum more relatable.',
      },
      {
        q: 'How long does the entire CA qualification take?',
        a: 'Typically 4.5–5.5 years: Foundation (4 months), Intermediate (8 months + 8 months experience), Final (8 months + 3-year articleship).',
      },
      {
        q: 'Is CA more valuable than B.Com?',
        a: 'Yes, CA is a professional qualification more valued in the job market. A B.Com graduate must pursue CA separately. Many pursue both or just CA.',
      },
    ],
  },

  {
    slug: 'how-to-become-lawyer',
    title: 'How to Become a Lawyer in India — Law Degree, Bar Exam & Career',
    emoji: '⚖️',
    overview: 'Law is a respected profession in India with diverse specializations. This guide covers the path to becoming a lawyer, entrance exams, and career opportunities.',
    whoShouldChoose: 'Students passionate about justice and constitutional law, strong in reasoning and communication, interested in advocacy or legal practice.',
    subjects: ['English', 'History', 'Political Science', 'Economics', 'Logical reasoning', 'Legal studies'],
    coursesAfter: ['BA LLB (5 years integrated)', 'BBA LLB (5 years)', 'LLB (3 years after graduation)'],
    entranceExams: ['CLAT (Common Law Admission Test) — national entrance', 'State law entrance exams', 'Bar Council exam (AIBE)'],
    skills: ['Legal research', 'Argumentation', 'Written and verbal communication', 'Analytical thinking', 'Ethics'],
    salaryRange: 'Indicative: ₹3–8 LPA in law firms as junior associates; ₹15–50+ LPA for senior advocates; varies by practice type (private, corporate, government).',
    roadmap: [
      '1. Complete Class 12 (any stream, but humanities preferred).',
      '2. Prepare for CLAT or state-level law entrance exams.',
      '3. Secure admission to a BA LLB (5 years integrated) or pursue LLB after a bachelor\'s degree (3 years).',
      '4. Complete legal internships during law school.',
      '5. Pass the All India Bar Examination (AIBE) and enroll with state bar council.',
    ],
    faqs: [
      {
        q: 'Is CLAT necessary to become a lawyer in India?',
        a: 'CLAT is for national law universities. State universities have their own entrance exams. You can also do LLB after any bachelor\'s degree. CLAT scores open doors to top law schools.',
      },
      {
        q: 'How long does it take to become a lawyer?',
        a: 'Typically 5 years (BA LLB integrated) or 3 years (LLB after bachelor\'s), plus bar exam preparation and enrollment (a few months).',
      },
      {
        q: 'Can I practice law immediately after law school?',
        a: 'No, you must pass the All India Bar Examination (AIBE) and enroll with your state\'s bar council before practicing.',
      },
    ],
  },

  {
    slug: 'how-to-become-ias-officer',
    title: 'How to Become an IAS Officer — UPSC Exam, Preparation & Career Path',
    emoji: '🏛️',
    overview: 'The Indian Administrative Service (IAS) is India\'s most prestigious civil service. This guide covers the UPSC exam, preparation strategy, and what it takes to succeed.',
    whoShouldChoose: 'Graduates passionate about public service, strong in general studies and current affairs, aiming for administrative and policy-making roles.',
    subjects: ['General Studies', 'Current Affairs', 'Indian Constitution', 'History', 'Geography', 'Economics', 'Optional subject of choice'],
    coursesAfter: ['IAS (IFS, IPS alternatives)', 'State-level civil services exams', 'UPSC CAPF, CDS exams'],
    entranceExams: ['UPSC Civil Services Exam (Prelims, Mains, Interview)'],
    skills: ['Current affairs knowledge', 'Essay writing', 'Analytical thinking', 'Communication', 'Leadership'],
    salaryRange: 'Indicative: ₹56,100 base + allowances (₹1+ LPA total) for IAS officers; ₹2–4 LPA in-hand depending on posting and experience; considerable perks and pension.',
    roadmap: [
      '1. Complete your bachelor\'s degree (any subject; no age bar for graduation).',
      '2. Understand UPSC syllabus and exam pattern (Prelims, Mains, Interview).',
      '3. Register for UPSC Civil Services Exam (typically 1–2 years after graduation).',
      '4. Prepare intensively: 1–2 years of focused study on general studies, current affairs, and optional subject.',
      '5. Clear prelims, mains (9 papers), interview to secure IAS rank and undergo training.',
    ],
    faqs: [
      {
        q: 'Which stream is best for UPSC preparation?',
        a: 'Any stream works. Humanities students find general studies familiar, but engineers, doctors, and science graduates are equally successful. Your dedication matters more than background.',
      },
      {
        q: 'How many attempts can I make for UPSC?',
        a: 'Typically 6 attempts before age 32 (for general category). OBC and SC/ST candidates get additional attempts and age relaxation.',
      },
      {
        q: 'Do I need coaching for UPSC?',
        a: 'Not mandatory, but many succeed with self-study. Coaching helps with strategy, but discipline and consistent effort are more critical.',
      },
    ],
  },

  {
    slug: 'careers-after-12th-commerce',
    title: 'Best Careers After 12th Commerce — Streams, Courses & Salary Guide',
    emoji: '📊',
    overview: 'Commerce stream opens doors to diverse careers in finance, business, and accounting. This guide covers specializations, entrance exams, and career paths for commerce students.',
    whoShouldChoose: 'Commerce students interested in finance, business management, accounting, or economics; students not pursuing pure science.',
    subjects: ['Accounts', 'Business Studies', 'Economics', 'Mathematics/Statistics', 'Commercial Law', 'Cost Accounting'],
    coursesAfter: ['B.Com (3 years)', 'BBA (3 years)', 'CA - Chartered Accountant', 'CS - Company Secretary', 'CMA - Cost Accountant'],
    entranceExams: ['CUET (for B.Com in central universities)', 'CLAT (for law specialization)', 'College-specific exams for BBA'],
    skills: ['Accounting and financial analysis', 'Business acumen', 'Communication', 'Problem-solving', 'Data interpretation'],
    salaryRange: 'Indicative: ₹4–10 LPA for B.Com graduates; ₹8–20 LPA for BBA; ₹12–40+ LPA for CA/CS professionals; varies by specialization and experience.',
    roadmap: [
      '1. Complete 12th Grade in Commerce stream.',
      '2. Decide on specialization: Accounting (CA), Business (BBA), or Company Secretary (CS).',
      '3. Appear for CUET or relevant entrance exams.',
      '4. Enroll in B.Com, BBA, or professional qualification program.',
      '5. Gain internship experience and specialize in your chosen domain.',
    ],
    faqs: [
      {
        q: 'Is B.Com better than BBA?',
        a: 'Both are equally respected. B.Com focuses on accounting and finance; BBA is broader in business management. Choose based on your interests.',
      },
      {
        q: 'Can I do CA while pursuing B.Com?',
        a: 'Yes, many students register for CA Foundation after 12th and pursue it alongside or after B.Com. Combining both accelerates your career.',
      },
      {
        q: 'What\'s the scope of Commerce careers in 2025?',
        a: 'Excellent. Finance, fintech, startup management, and international business are growing. AI tools are changing accounting, but skilled professionals are always in demand.',
      },
    ],
  },

  {
    slug: 'careers-after-12th-arts',
    title: 'Top Careers After 12th Arts — Courses, Exams & Salary Guide',
    emoji: '📖',
    overview: 'Arts stream is versatile, offering careers in civil services, law, journalism, academia, and humanities. This guide covers popular specializations and career paths.',
    whoShouldChoose: 'Arts students interested in history, literature, politics, social sciences, or public service; students seeking diverse career options.',
    subjects: ['History', 'Geography', 'Political Science', 'Economics', 'English/Regional Language', 'Philosophy/Sociology'],
    coursesAfter: ['BA (3 years)', 'BA (Honors)', 'BJ (Bachelor of Journalism)', 'BA LLB (Law)', 'Other professional courses'],
    entranceExams: ['CUET (for central universities)', 'CLAT (for law)', 'UPSC Civil Services (for IAS/IPS)', 'State-level exams'],
    skills: ['Research and analysis', 'Communication', 'Writing', 'Critical thinking', 'Cultural awareness'],
    salaryRange: 'Indicative: ₹3–8 LPA for BA graduates; ₹6–15 LPA for specialized professionals (journalist, lawyer, academics); ₹1–4 LPA as IAS officer with significant perks.',
    roadmap: [
      '1. Complete 12th Grade in Arts stream.',
      '2. Choose specialization: Civil services (UPSC), Law (CLAT), Journalism, or general BA.',
      '3. Appear for relevant entrance exams (CUET, CLAT, UPSC).',
      '4. Enroll in your chosen degree program.',
      '5. Gain experience through internships and competitive exams if pursuing civil services.',
    ],
    faqs: [
      {
        q: 'Is there a salary gap between Arts and Science graduates?',
        a: 'Initially, yes. Science/Engineering graduates often earn higher starting salaries. However, arts professionals (especially IAS officers, lawyers, and senior journalists) can earn significantly more with experience.',
      },
      {
        q: 'What are the best careers for Arts students?',
        a: 'Civil services (IAS/IPS), law, journalism, academia, publishing, NGO work, foreign services, and public administration are top choices.',
      },
      {
        q: 'Can Arts students pursue research careers?',
        a: 'Yes, through MA/PhD programs in humanities and social sciences. Research in history, literature, sociology, and geography is thriving.',
      },
    ],
  },

  {
    slug: 'careers-after-12th-science',
    title: 'Top Careers After 12th Science — Engineering, Medicine & Beyond',
    emoji: '🔬',
    overview: 'Science stream offers prestigious careers in engineering, medicine, research, and allied fields. This guide covers the most popular paths and competitive exams.',
    whoShouldChoose: 'Science students strong in Math, Physics, and Chemistry; students aiming for engineering, medicine, or research careers.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Environmental Science'],
    coursesAfter: ['B.Tech Engineering', 'MBBS (Medicine)', 'B.Sc (various specializations)', 'BCA (Computer Applications)', 'B.Pharmacy'],
    entranceExams: ['JEE Main & Advanced (Engineering)', 'NEET UG (Medicine)', 'CUET (B.Sc programs)', 'Various college-specific exams'],
    skills: ['Problem-solving', 'Analytical thinking', 'Laboratory skills', 'Programming (for engineering)', 'Research acumen'],
    salaryRange: 'Indicative: ₹5–15 LPA for engineering freshers; ₹5–20 LPA for MBBS graduates; ₹8–60+ LPA for specialized roles; varies widely by field and experience.',
    roadmap: [
      '1. Complete 12th Grade in Science with Math and/or Biology.',
      '2. Choose specialization: Engineering (JEE), Medicine (NEET), or Research (B.Sc + postgraduate).',
      '3. Prepare intensively for relevant entrance exams.',
      '4. Secure admission to engineering college, medical college, or science university.',
      '5. Complete your degree and enter your chosen field or pursue postgraduate specialization.',
    ],
    faqs: [
      {
        q: 'Is JEE or NEET harder?',
        a: 'Both are highly competitive. JEE tests deeper conceptual understanding; NEET tests broader coverage. Difficulty depends on individual strengths.',
      },
      {
        q: 'Can I pursue both engineering and research?',
        a: 'Yes, many pursue B.Tech followed by M.Tech or PhD. Some companies also support research roles for engineers.',
      },
      {
        q: 'Are government colleges better than private ones?',
        a: 'Top government colleges (IITs, NITs, AIIMS) have stronger brands and placements. But private colleges offer flexibility and sometimes better facilities. Choose based on rank and fee affordability.',
      },
    ],
  },
];
