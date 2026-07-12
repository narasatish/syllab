import { TutorialTopic, LanguageConfig, CareerGuide, ProjectIdea } from './types';

export type { TutorialTopic, LanguageConfig, CareerGuide, ProjectIdea };

// ─── Language registry ────────────────────────────────────────────────────────
export const LANGUAGES: LanguageConfig[] = [
  {
    id: 'python',
    name: 'Python',
    emoji: '🐍',
    color: '#3776AB',
    bgClass: 'bg-blue-600',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-600',
    editorMode: 'feedback',
    description: 'Beginner-friendly, versatile language used in AI, data science, and web backends.',
    careerGuide: {
      roles: ['Python Developer', 'Data Scientist', 'ML Engineer', 'Backend Developer', 'Automation Engineer'],
      avgSalary: '₹5–30 LPA',
      topCompanies: ['Google', 'Amazon', 'Flipkart', 'Zomato', 'ISRO', 'TCS', 'Infosys'],
      nextSkills: ['Django/Flask (web)', 'Pandas & NumPy (data)', 'TensorFlow/PyTorch (AI)', 'FastAPI (APIs)'],
      tip: 'Python is the #1 language for AI/ML jobs — master it and you open doors in every tech domain.',
    },
    projectIdea: {
      title: 'Student Result Analyser',
      description: 'Build a Python program that reads student marks from a list, calculates grades, finds toppers, and generates a summary report.',
      steps: [
        'Create a list of student dictionaries with name and subject marks',
        'Write a function to calculate total and percentage',
        'Add grade logic (A/B/C/D/F based on percentage)',
        'Find class topper and average marks',
        'Print a formatted report with all results',
      ],
      difficulty: 'Beginner',
      techStack: 'Python 3, lists, dicts, functions',
    },
  },
  {
    id: 'java',
    name: 'Java',
    emoji: '☕',
    color: '#ED8B00',
    bgClass: 'bg-amber-600',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-600',
    editorMode: 'feedback',
    description: 'Object-oriented powerhouse used in Android apps, enterprise systems, and big data.',
    careerGuide: {
      roles: ['Java Backend Developer', 'Android Developer', 'Software Engineer', 'Full-Stack Developer', 'DevOps Engineer'],
      avgSalary: '₹5–28 LPA',
      topCompanies: ['Wipro', 'Infosys', 'HCL', 'Paytm', 'Juspay', 'Oracle', 'SAP'],
      nextSkills: ['Spring Boot (backend)', 'Android Studio (mobile)', 'Hibernate (ORM)', 'Microservices'],
      tip: 'Java dominates enterprise and Android development — it is the language most used in IT service companies that hire lakhs of engineers.',
    },
    projectIdea: {
      title: 'Library Book Management System',
      description: 'Build a Java console app to manage a school library: add books, issue to students, return books, and view available stock.',
      steps: [
        'Create a Book class with title, author, ISBN, available copies',
        'Create a Student class with name and borrowed books list',
        'Implement issueBook() and returnBook() methods',
        'Use ArrayList to store all books and students',
        'Add a menu-driven interface with switch-case',
      ],
      difficulty: 'Intermediate',
      techStack: 'Java OOP, ArrayList, Scanner, Switch-case',
    },
  },
  {
    id: 'html',
    name: 'HTML',
    emoji: '🌐',
    color: '#E34F26',
    bgClass: 'bg-orange-600',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-600',
    editorMode: 'live',
    description: 'The structure language of the web — every website starts with HTML.',
    careerGuide: {
      roles: ['Frontend Developer', 'Web Designer', 'UI Developer', 'Full-Stack Developer'],
      avgSalary: '₹3–18 LPA',
      topCompanies: ['Naukri', 'MakeMyTrip', 'Swiggy', 'Ola', 'Razorpay', 'any web startup'],
      nextSkills: ['CSS & Tailwind (styling)', 'JavaScript (interactivity)', 'React (UI frameworks)', 'Figma (design)'],
      tip: 'HTML is your entry point to web development — combine it with CSS and JavaScript to become job-ready in 3–6 months.',
    },
    projectIdea: {
      title: 'Personal Portfolio Website',
      description: 'Build a personal webpage showcasing your name, photo, skills, projects, and contact info — a digital resume that impresses any recruiter.',
      steps: [
        'Create the page structure with header, sections, footer',
        'Add an About Me section with your photo and intro',
        'Add a Skills section with icons/badges',
        'List 2–3 projects with descriptions and links',
        'Add a Contact section with email and social links',
      ],
      difficulty: 'Beginner',
      techStack: 'HTML5, semantic tags, forms, links',
    },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    emoji: '⚡',
    color: '#F7DF1E',
    bgClass: 'bg-yellow-400',
    textClass: 'text-yellow-600',
    borderClass: 'border-yellow-400',
    editorMode: 'live',
    description: 'The programming language of the web — dynamic pages, interactivity, and full-stack apps.',
    careerGuide: {
      roles: ['Frontend Developer', 'Full-Stack Developer', 'React Developer', 'Node.js Developer', 'UI Engineer'],
      avgSalary: '₹5–35 LPA',
      topCompanies: ['Razorpay', 'Freshworks', 'Swiggy', 'Meesho', 'Zepto', 'Atlassian', 'Microsoft'],
      nextSkills: ['React.js (UI)', 'Node.js (backend)', 'TypeScript (typed JS)', 'Next.js (fullstack)'],
      tip: 'JavaScript is the only language that runs in the browser AND the server — mastering it makes you a complete web developer.',
    },
    projectIdea: {
      title: 'Interactive Quiz App',
      description: 'Build a 10-question MCQ quiz app that keeps score, shows correct/wrong answers, and displays a results screen at the end.',
      steps: [
        'Create an array of 10 question objects (question + 4 options + correct index)',
        'Show one question at a time with clickable option buttons',
        'Highlight correct/wrong on click and increment score',
        'Show a "Next" button after each answer',
        'Display final score with percentage and grade on last question',
      ],
      difficulty: 'Beginner',
      techStack: 'JavaScript DOM, arrays, event listeners, functions',
    },
  },
  {
    id: 'sql',
    name: 'SQL',
    emoji: '🗄️',
    color: '#336791',
    bgClass: 'bg-indigo-600',
    textClass: 'text-indigo-600',
    borderClass: 'border-indigo-600',
    editorMode: 'feedback',
    description: 'Query language for relational databases — used in every data-driven application.',
    careerGuide: {
      roles: ['Database Administrator', 'Data Analyst', 'Business Intelligence Analyst', 'Backend Developer', 'Data Engineer'],
      avgSalary: '₹4–22 LPA',
      topCompanies: ['Accenture', 'Capgemini', 'PhonePe', 'HDFC Bank', 'BigBasket', 'Mu Sigma'],
      nextSkills: ['PostgreSQL advanced', 'NoSQL (MongoDB)', 'Power BI / Tableau', 'Python + SQL (pandas)'],
      tip: 'SQL is required in 80% of tech jobs involving data — it is the one skill that bridges coding and business analytics.',
    },
    projectIdea: {
      title: 'School Database System',
      description: 'Design and query a school database with students, teachers, subjects, and exam results tables.',
      steps: [
        'Create tables: Students, Teachers, Subjects, Marks',
        'Insert sample data for 5 students, 3 subjects, 3 teachers',
        'Write queries to find top scorer per subject',
        'Use JOIN to fetch student names with their marks',
        'Calculate class average and identify failing students',
      ],
      difficulty: 'Beginner',
      techStack: 'SQL DDL, DML, JOIN, GROUP BY, aggregate functions',
    },
  },
  {
    id: 'ai-learning',
    name: 'AI Learning',
    emoji: '🤖',
    color: '#7C3AED',
    bgClass: 'bg-violet-600',
    textClass: 'text-violet-600',
    borderClass: 'border-violet-600',
    editorMode: 'feedback',
    description: 'Understand how AI, Machine Learning, Neural Networks, and Generative AI really work — with Python.',
    careerGuide: {
      roles: ['ML Engineer', 'AI Researcher', 'NLP Engineer', 'Computer Vision Engineer', 'GenAI Engineer'],
      avgSalary: '₹8–50 LPA',
      topCompanies: ['Google DeepMind', 'OpenAI', 'Sarvam AI', 'Krutrim', 'Amazon AI', 'Microsoft Research India'],
      nextSkills: ['TensorFlow/PyTorch deep learning', 'Hugging Face (NLP)', 'LangChain (LLM apps)', 'MLOps & deployment'],
      tip: 'AI is the fastest-growing field in India — ISRO, DRDO, and every major startup are hiring AI engineers at premium salaries.',
    },
    projectIdea: {
      title: 'Handwritten Digit Recogniser',
      description: 'Train a neural network on the MNIST dataset to recognise handwritten digits (0-9) with 95%+ accuracy.',
      steps: [
        'Load the MNIST dataset using TensorFlow/Keras',
        'Preprocess images (normalise pixel values 0-1)',
        'Build a simple neural network: Dense layers with ReLU',
        'Train for 5 epochs and evaluate accuracy on test set',
        'Test your model on custom hand-drawn digit images',
      ],
      difficulty: 'Intermediate',
      techStack: 'Python, TensorFlow/Keras, NumPy, Matplotlib',
    },
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    emoji: '📊',
    color: '#059669',
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-600',
    editorMode: 'feedback',
    description: 'Analyse data with Python, find patterns, build charts, and draw insights from real datasets.',
    careerGuide: {
      roles: ['Data Analyst', 'Business Analyst', 'BI Developer', 'Analytics Consultant', 'Product Analyst'],
      avgSalary: '₹4–20 LPA',
      topCompanies: ['Flipkart', 'Walmart Global Tech', 'Mu Sigma', 'Fractal Analytics', 'Tiger Analytics', 'KPMG India'],
      nextSkills: ['Tableau/Power BI (dashboards)', 'SQL (advanced queries)', 'Statistics & probability', 'Machine Learning basics'],
      tip: 'Data analysts are needed in every industry — from banking to cricket — and Python + SQL is all you need to land your first role.',
    },
    projectIdea: {
      title: 'IPL Match Data Analyser',
      description: 'Analyse IPL cricket match data to find top run-scorers, most successful teams, and win trends by venue.',
      steps: [
        'Load IPL dataset CSV using pandas',
        'Clean data: handle missing values, fix column types',
        'Find top 10 batsmen by total runs scored',
        'Calculate win percentage for each team',
        'Plot bar charts and pie charts using Matplotlib/Seaborn',
      ],
      difficulty: 'Beginner',
      techStack: 'Python, Pandas, Matplotlib, Seaborn, CSV data',
    },
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    emoji: '🧮',
    color: '#DC2626',
    bgClass: 'bg-rose-600',
    textClass: 'text-rose-600',
    borderClass: 'border-rose-600',
    editorMode: 'feedback',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability for competitive exams and placements.',
    careerGuide: {
      roles: ['Any engineering/IT role requiring placement tests', 'Government competitive exam qualifier (SSC/IBPS/UPSC)', 'CAT/MAT/GMAT aspirant for MBA'],
      avgSalary: 'Unlocks ₹3–15 LPA placement roles',
      topCompanies: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'all campus placement drives'],
      nextSkills: ['Advanced reasoning (CAT level)', 'Verbal ability (RC & vocab)', 'Data interpretation', 'Mock test practice'],
      tip: 'Aptitude is the gatekeeper for 90% of Indian IT/govt job selections — 2 hours daily practice for 3 months can transform your career.',
    },
    projectIdea: {
      title: 'Aptitude Quiz Generator',
      description: 'Build a Python tool that generates 20 random aptitude questions from different topics and scores your responses.',
      steps: [
        'Create a question bank with 50+ problems across topics',
        'Random-select 20 questions without repetition',
        'Display one at a time with a 60-second timer per question',
        'Award 1 mark for correct, 0.25 negative for wrong',
        'Show final score with topic-wise performance breakdown',
      ],
      difficulty: 'Beginner',
      techStack: 'Python, random module, time module, functions',
    },
  },
  {
    id: 'app-dev',
    name: 'App Dev',
    emoji: '📱',
    color: '#F59E0B',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-500',
    editorMode: 'live',
    description: 'Build web and mobile apps from scratch — HTML, CSS, JS, React, and deployment.',
    careerGuide: {
      roles: ['Frontend Developer', 'React Native Developer', 'Flutter Developer', 'Full-Stack Developer', 'Freelance App Developer'],
      avgSalary: '₹4–25 LPA',
      topCompanies: ['Ola', 'Urban Company', 'Zepto', 'Blinkit', 'CRED', 'PharmEasy', 'any product startup'],
      nextSkills: ['React.js or Vue.js (web apps)', 'React Native or Flutter (mobile)', 'Firebase (backend-as-a-service)', 'App Store deployment'],
      tip: 'App development is one of the most direct paths to freelancing — one good app can earn you ₹50,000+ from clients.',
    },
    projectIdea: {
      title: 'Expense Tracker Web App',
      description: 'Build a web app to track daily expenses — add entries, categorise them, and see a monthly summary chart.',
      steps: [
        'Design UI with HTML/CSS: input form + expense list',
        'Add JavaScript to store expenses in localStorage',
        'Show a running total and categorised breakdown',
        'Add a delete button for each expense entry',
        'Plot a pie chart of spending by category',
      ],
      difficulty: 'Intermediate',
      techStack: 'HTML, CSS, JavaScript, localStorage, Chart.js',
    },
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    emoji: '🛡️',
    color: '#EF4444',
    bgClass: 'bg-red-600',
    textClass: 'text-red-600',
    borderClass: 'border-red-600',
    editorMode: 'feedback',
    description: 'Learn to protect data, networks, and yourself online — passwords, phishing, encryption, and ethical hacking.',
    careerGuide: {
      roles: ['Cybersecurity Analyst', 'Ethical Hacker / Penetration Tester', 'SOC Analyst', 'Security Engineer', 'CISO (Chief Information Security Officer)'],
      avgSalary: '₹5–40 LPA',
      topCompanies: ['CERT-In (Govt)', 'DRDO', 'Quick Heal', 'Wipro CyberDefense', 'IBM Security', 'Palo Alto', 'CrowdStrike'],
      nextSkills: ['CEH / OSCP certifications', 'Kali Linux & tools (Nmap, Metasploit)', 'Network security', 'Bug bounty programs'],
      tip: 'India has a massive cybersecurity talent gap — even a basic CEH certification can land you ₹8–12 LPA at banks and IT companies.',
    },
    projectIdea: {
      title: 'Password Strength Checker & Generator',
      description: 'Build a Python tool that evaluates password strength and generates secure random passwords with custom rules.',
      steps: [
        'Check password length, uppercase, lowercase, digits, symbols',
        'Score password: Weak / Medium / Strong / Very Strong',
        'Show specific improvement tips for weak passwords',
        'Generate a random strong password with desired length and character types',
        'Check if the password appears in a list of common passwords',
      ],
      difficulty: 'Beginner',
      techStack: 'Python, string module, secrets module, regex',
    },
  },
  {
    id: 'robotics',
    name: 'Robotics',
    emoji: '🦾',
    color: '#3B82F6',
    bgClass: 'bg-blue-600',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-600',
    editorMode: 'feedback',
    description: 'Sensors, actuators, Arduino, line followers, robot arms, ROS, and computer vision — build robots from scratch.',
    careerGuide: {
      roles: ['Robotics Engineer', 'Automation Engineer', 'Embedded Systems Developer', 'Mechatronics Engineer', 'ROS Developer'],
      avgSalary: '₹5–25 LPA',
      topCompanies: ['ISRO', 'DRDO', 'Ola Electric', 'GreyOrange', 'Addverb Technologies', 'Bosch India', 'ABB India'],
      nextSkills: ['ROS (Robot Operating System)', 'OpenCV (computer vision)', 'Raspberry Pi advanced', 'Control systems', 'SLAM (mapping)'],
      tip: 'Robotics combines hardware + software — participating in competitions like WRO or FRC gives you hands-on experience that companies love.',
    },
    projectIdea: {
      title: 'Line-Following Robot',
      description: 'Build a simple line-following robot using Arduino, two IR sensors, and a motor driver — make it follow a black line on white paper.',
      steps: [
        'Assemble chassis with two DC motors and wheels',
        'Connect two IR sensors (left/right) to Arduino digital pins',
        'Wire an L298N motor driver between Arduino and motors',
        'Write Arduino code: if left sensor sees line → turn left, else turn right',
        'Test on a track and tune sensor sensitivity',
      ],
      difficulty: 'Intermediate',
      techStack: 'Arduino Uno, L298N driver, IR sensors, C++ (Arduino IDE)',
    },
  },
  {
    id: 'game-dev',
    name: 'Game Dev',
    emoji: '🎮',
    color: '#EC4899',
    bgClass: 'bg-pink-600',
    textClass: 'text-pink-600',
    borderClass: 'border-pink-600',
    editorMode: 'live',
    description: 'Learn game development with p5.js — interactive graphics, physics, collision detection, and mini game projects.',
    careerGuide: {
      roles: ['Game Developer', 'Unity/Unreal Developer', 'Game Designer', 'AR/VR Developer', 'Indie Game Developer'],
      avgSalary: '₹4–20 LPA (studio) or ₹5–50 LPA (top studios / abroad)',
      topCompanies: ['nCore Games', 'Nazara Technologies', 'Ubisoft India', 'Electronic Arts India', 'Dream11 (fantasy gaming)'],
      nextSkills: ['Unity 3D (C#)', 'Unreal Engine 5 (C++)', 'Blender (3D art)', 'Game design patterns', 'Mobile game publishing'],
      tip: "India's gaming industry is booming — Free Fire and BGMI have millions of players. Start with simple 2D games and gradually level up to Unity 3D.",
    },
    projectIdea: {
      title: 'Brick Breaker Game',
      description: 'Build a classic brick-breaker game with a paddle, bouncing ball, and rows of colourful bricks — add score tracking and game-over logic.',
      steps: [
        'Create paddle that moves left/right with arrow keys',
        'Create a ball that bounces off walls and paddle',
        'Draw a grid of 5×8 coloured bricks at top',
        'Detect ball-brick collision and remove hit bricks',
        'Track score (+10 per brick), add lives system, show game over',
      ],
      difficulty: 'Intermediate',
      techStack: 'p5.js, JavaScript, HTML Canvas',
    },
  },
  // ─── NEW SUBJECTS ──────────────────────────────────────────────────────────
  {
    id: 'git-github',
    name: 'Git & GitHub',
    emoji: '🔀',
    color: '#F05032',
    bgClass: 'bg-orange-500',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-500',
    editorMode: 'feedback',
    description: 'Master version control with Git and collaborate on code with GitHub — essential for every developer.',
    careerGuide: {
      roles: ['Every software developer role requires Git', 'DevOps Engineer', 'Open Source Contributor', 'Technical Lead'],
      avgSalary: 'Required for all dev roles (₹4–50 LPA)',
      topCompanies: ['GitHub (Microsoft)', 'All software companies worldwide', 'Open source projects'],
      nextSkills: ['GitHub Actions (CI/CD)', 'GitLab', 'Docker (containerisation)', 'Linux commands'],
      tip: 'Git knowledge is non-negotiable in any developer interview — not knowing Git is like a driver not knowing traffic rules.',
    },
    projectIdea: {
      title: 'Open Source Contribution',
      description: 'Fork a beginner-friendly open source project on GitHub, fix a "good first issue" bug, and submit your first Pull Request.',
      steps: [
        'Find a project on GitHub labelled "good first issue" (e.g. a documentation fix)',
        'Fork the repo and clone it to your machine',
        'Create a new branch: git checkout -b fix/typo-in-readme',
        'Make the fix, commit with a clear message',
        'Push branch and open a Pull Request with description',
      ],
      difficulty: 'Beginner',
      techStack: 'Git, GitHub, any language of the project',
    },
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    emoji: '💬',
    color: '#0EA5E9',
    bgClass: 'bg-sky-600',
    textClass: 'text-sky-600',
    borderClass: 'border-sky-600',
    editorMode: 'feedback',
    description: 'Learn to communicate with AI models effectively — craft prompts that get precise, powerful results every time.',
    careerGuide: {
      roles: ['Prompt Engineer', 'AI Product Manager', 'AI Content Strategist', 'LLM Application Developer', 'AI Consultant'],
      avgSalary: '₹6–30 LPA (rapidly growing field)',
      topCompanies: ['OpenAI', 'Anthropic', 'Google DeepMind', 'Sarvam AI', 'any company building AI products'],
      nextSkills: ['LangChain & LlamaIndex (LLM apps)', 'Python API integration', 'RAG systems', 'AI safety & alignment'],
      tip: 'Prompt engineering is the bridge between AI capability and real-world usefulness — people who can communicate clearly with AI will lead the next decade.',
    },
    projectIdea: {
      title: 'AI Study Assistant Prompt System',
      description: 'Design a set of 10 optimised prompts for different study tasks — summarising chapters, generating MCQs, explaining concepts, and more.',
      steps: [
        'Design a "summarise chapter" prompt with role + context + output format',
        'Create a "generate 10 MCQs with answers" prompt template',
        'Build a "explain like I\'m 15" concept explainer prompt',
        'Write a "find mistakes in my essay" prompt with evaluation criteria',
        'Test all prompts with ChatGPT/Claude and iterate to improve',
      ],
      difficulty: 'Beginner',
      techStack: 'Any LLM (ChatGPT, Claude, Gemini), text editor',
    },
  },
  // AI Agents merged into AI Learning — topics available under 'ai-learning'
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    emoji: '☁️',
    color: '#0369A1',
    bgClass: 'bg-sky-700',
    textClass: 'text-sky-700',
    borderClass: 'border-sky-700',
    editorMode: 'feedback',
    description: 'Understand cloud platforms (AWS, Azure, GCP), deploy apps, and learn the services powering every modern application.',
    careerGuide: {
      roles: ['Cloud Engineer', 'DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer (SRE)', 'Cloud Solutions Consultant'],
      avgSalary: '₹7–35 LPA',
      topCompanies: ['Amazon AWS India', 'Microsoft Azure India', 'Google Cloud India', 'Accenture Cloud', 'Wipro Cloud'],
      nextSkills: ['AWS Solutions Architect certification', 'Kubernetes & Docker', 'Terraform (Infrastructure as Code)', 'Security in cloud'],
      tip: 'Cloud certifications are the fastest way to a ₹12+ LPA job — AWS Certified Solutions Architect is accepted globally with no engineering degree required.',
    },
    projectIdea: {
      title: 'Deploy a Website on the Cloud',
      description: 'Host your personal portfolio website on AWS S3 as a static website with a custom domain and HTTPS enabled.',
      steps: [
        'Create an AWS Free Tier account',
        'Build your HTML/CSS portfolio website locally',
        'Create an S3 bucket, enable Static Website Hosting',
        'Upload your files and set public read permissions',
        'Enable CloudFront for HTTPS and faster global delivery',
      ],
      difficulty: 'Beginner',
      techStack: 'AWS S3, CloudFront, HTML/CSS, AWS Console',
    },
  },
  {
    id: 'data-mining',
    name: 'Data Mining',
    emoji: '⛏️',
    color: '#D97706',
    bgClass: 'bg-amber-600',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-600',
    editorMode: 'feedback',
    description: 'Discover hidden patterns in large datasets — classification, clustering, association rules, and predictive analytics with Python.',
    careerGuide: {
      roles: ['Data Scientist', 'Data Mining Engineer', 'Machine Learning Engineer', 'Research Analyst', 'BI & Analytics Developer'],
      avgSalary: '₹7–35 LPA',
      topCompanies: ['Fractal Analytics', 'Mu Sigma', 'Tiger Analytics', 'Amazon', 'Flipkart Analytics', 'NASSCOM partners'],
      nextSkills: ['Deep learning (Neural Networks)', 'Big Data (Spark, Hadoop)', 'Feature engineering advanced', 'MLOps & model deployment'],
      tip: 'Data mining skills combined with domain knowledge (finance, healthcare, retail) command the highest salaries in analytics.',
    },
    projectIdea: {
      title: 'Customer Purchase Pattern Analyser',
      description: 'Use association rule mining to find which products are frequently bought together in a grocery dataset.',
      steps: [
        'Load a sample transaction dataset (grocery store purchases)',
        'Preprocess data: one-hot encode items per transaction',
        'Apply Apriori algorithm (mlxtend library)',
        'Find rules with support > 5%, confidence > 60%',
        'Visualise top 10 association rules in a network graph',
      ],
      difficulty: 'Intermediate',
      techStack: 'Python, mlxtend, pandas, matplotlib, networkx',
    },
  },
  {
    id: 'computer-basics',
    name: 'Computer Basics',
    emoji: '💻',
    color: '#0369A1',
    bgClass: 'bg-sky-500',
    textClass: 'text-sky-600',
    borderClass: 'border-sky-500',
    editorMode: 'feedback',
    description: 'Learn how computers work — hardware, software, internet, cyber safety, and your first steps into coding.',
    careerGuide: {
      roles: ['Any IT Professional', 'Software Engineer', 'IT Support', 'Hardware Engineer', 'Cybersecurity Professional'],
      avgSalary: 'Foundation for all tech careers (₹3–50 LPA)',
      topCompanies: ['All tech companies', 'Every IT industry', 'Government IT roles'],
      nextSkills: ['Programming (Python, Java)', 'Networking & Security', 'System Administration', 'Hardware & Troubleshooting'],
      tip: 'Understanding computer fundamentals is the foundation for every tech career — it opens doors to coding, IT support, hacking, and beyond.',
    },
    projectIdea: {
      title: 'Design Your Dream Computer Setup',
      description: 'Research real computer components, design your ideal PC or laptop setup for gaming/coding/design, and calculate the total budget.',
      steps: [
        'Choose a purpose: gaming, coding, design, or school work',
        'Research components: CPU, GPU, RAM, Storage, Motherboard, PSU',
        'Compare options and prices on Flipkart, Amazon, or local stores',
        'Create a shopping list with links and prices',
        'Calculate total cost and write why each component matters',
      ],
      difficulty: 'Beginner',
      techStack: 'Internet research, spreadsheet, learning about PC hardware',
    },
  },
  {
    id: 'dsa',
    name: 'DSA (Data Structures & Algorithms)',
    emoji: '🧩',
    color: '#6366f1',
    bgClass: 'bg-indigo-600',
    textClass: 'text-indigo-600',
    borderClass: 'border-indigo-600',
    editorMode: 'feedback',
    description: 'The #1 skill for coding interviews and placements — arrays, hashing, linked lists, stacks, queues, recursion, sorting, searching, trees, heaps, graphs and dynamic programming, with Python examples and hands-on practice.',
    careerGuide: {
      roles: ['Software Engineer', 'SDE', 'Backend Developer', 'Competitive Programmer', 'Data Engineer'],
      avgSalary: '₹6–40 LPA',
      topCompanies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Flipkart', 'Atlassian'],
      nextSkills: ['System Design', 'Advanced DP & Graphs', 'Competitive Programming (Codeforces)', 'A core language (Python / Java / C++)'],
      tip: 'DSA is what every product company tests in interviews — strong DSA plus a project portfolio beats a fancy degree for landing a high-paying SDE role.',
    },
    projectIdea: {
      title: 'Build a mini "LeetCode" progress tracker',
      description: 'Track the DSA problems you solve, by topic and difficulty, and visualise your progress and weakest areas.',
      steps: [
        'List topics (arrays, trees, DP...) with a target count for each',
        'Store solved problems (name, topic, difficulty, date) in a list or JSON file',
        'Compute progress per topic and overall',
        'Surface your weakest topic so you know what to practise next',
        'Add a daily streak counter to stay consistent',
      ],
      difficulty: 'Intermediate',
      techStack: 'Python (or any language), lists/dicts, simple file storage',
    },
  },
];

// ─── Dynamic topic loaders ────────────────────────────────────────────────────
// Maps language ID to an async function that loads its topics.
// Each language is its own dynamic import to enable code splitting per language.
const LANGUAGE_LOADERS: Record<string, () => Promise<{ default: TutorialTopic[] }>> = {
  python: () => import('./python').then(m => ({ default: m.pythonTopics })),
  java: () => import('./java').then(m => ({ default: m.javaTopics })),
  html: () => import('./html').then(m => ({ default: m.htmlTopics })),
  javascript: () => import('./javascript').then(m => ({ default: m.javascriptTopics })),
  sql: () => import('./sql').then(m => ({ default: m.sqlTopics })),
  'ai-learning': () => import('./aiLearning').then(m =>
    import('./ai-agents').then(m2 => ({ default: [...m.aiLearningTopics, ...m2.aiAgentsTopics] }))
  ),
  'data-analytics': () => import('./dataAnalytics').then(m => ({ default: m.dataAnalyticsTopics })),
  aptitude: () => import('./aptitude').then(m => ({ default: m.aptitudeTopics })),
  'app-dev': () => import('./app-dev').then(m => ({ default: m.appDevTopics })),
  cybersecurity: () => import('./cybersecurity').then(m => ({ default: m.cybersecurityTopics })),
  robotics: () => import('./robotics').then(m => ({ default: m.roboticsTopics })),
  'game-dev': () => import('./game-dev').then(m => ({ default: m.gameDevTopics })),
  'git-github': () => import('./git-github').then(m => ({ default: m.gitGithubTopics })),
  'prompt-engineering': () => import('./prompt-engineering').then(m => ({ default: m.promptEngineeringTopics })),
  'cloud-computing': () => import('./cloud-computing').then(m => ({ default: m.cloudComputingTopics })),
  'data-mining': () => import('./data-mining').then(m => ({ default: m.dataMiningTopics })),
  'computer-basics': () => import('./computer-basics').then(m => ({ default: m.computerBasicsTopics })),
  dsa: () => import('./dsa').then(m => ({ default: m.dsaTopics })),
};

// ─── In-memory cache for loaded topics ─────────────────────────────────────────
const TOPICS_CACHE: Record<string, TutorialTopic[]> = {};

// ─── Topic lookup by language (lazy-loaded) ──────────────────────────────────
export const TOPICS_BY_LANGUAGE: Record<string, TutorialTopic[]> = {};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Load topics for a language asynchronously (on-demand).
 * Caches the result so subsequent calls are instant.
 * Use this when opening a language for the first time.
 */
export async function loadLanguageTopics(languageId: string): Promise<TutorialTopic[]> {
  // Return cached if already loaded
  if (TOPICS_CACHE[languageId]) {
    return TOPICS_CACHE[languageId];
  }

  // Load via dynamic import
  const loader = LANGUAGE_LOADERS[languageId];
  if (!loader) {
    console.warn(`No topics loader found for language: ${languageId}`);
    return [];
  }

  try {
    const loaded = await loader();
    const topics = loaded.default || [];
    TOPICS_CACHE[languageId] = topics;
    TOPICS_BY_LANGUAGE[languageId] = topics;
    return topics;
  } catch (error) {
    console.error(`Failed to load topics for ${languageId}:`, error);
    return [];
  }
}

/** Return all topics for a language (must be already loaded) */
export function getTopics(languageId: string): TutorialTopic[] {
  return TOPICS_BY_LANGUAGE[languageId] ?? TOPICS_CACHE[languageId] ?? [];
}

/** Return unique categories for a language, preserving insertion order */
export function getCategories(languageId: string): string[] {
  const topics = getTopics(languageId);
  return [...new Set(topics.map((t) => t.category))];
}

/** Find a single topic by language + topic id */
export function findTopic(languageId: string, topicId: string): TutorialTopic | undefined {
  return getTopics(languageId).find((t) => t.id === topicId);
}

/** Return the first topic of a language */
export function firstTopic(languageId: string): TutorialTopic | undefined {
  return getTopics(languageId)[0];
}

/** Total topic count across all languages (only counts loaded topics) */
export function totalTopicCount(): number {
  return Object.values(TOPICS_CACHE).reduce((sum, topics) => sum + topics.length, 0);
}

/** Get languages in a specific group */
export const LANGUAGE_GROUPS = {
  coding: ['python', 'java', 'html', 'javascript', 'sql', 'app-dev', 'game-dev', 'git-github'],
  ai: ['ai-learning', 'ai-agents', 'prompt-engineering'],
  analytics: ['data-analytics', 'data-mining'],
  cloud: ['cloud-computing'],
  security: ['cybersecurity'],
  reasoning: ['aptitude'],
  engineering: ['robotics'],
};
