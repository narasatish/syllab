import { TutorialTopic } from './types';

export const entrepreneurshipTopics: TutorialTopic[] = [
  {
    id: 'ent-entrepreneurship-mindset',
    category: 'Entrepreneurship',
    title: 'What is Entrepreneurship & the Mindset',
    difficulty: 'Beginner',
    theory: [
      'Entrepreneurship is the process of identifying opportunities, taking calculated risks, and building something of value—whether a product, service, or business—to solve a problem. Unlike traditional employment where you exchange time for a salary, entrepreneurs create systems that can scale beyond their own effort. The entrepreneur acts as a problem-solver, innovator, and risk-taker.',
      'The entrepreneurial mindset is a way of thinking that emphasizes resilience, curiosity, and learning from failure. Successful entrepreneurs view setbacks as experiments and data, not defeats. They balance optimism (believing they can succeed) with realism (understanding market constraints). Indian entrepreneurs like Ritesh Agarwal (OYO) and Bhavish Aggarwal (Ola) exemplify this—they identified gaps in Indian markets, adapted quickly, and scaled rapidly.',
      'Key traits include: (1) Problem obsession—staying focused on solving a real problem, not just building for the sake of it; (2) Bias for action—learning by doing, not endless planning; (3) Resourcefulness—doing more with less; (4) Grit—persisting through rejection and failure; (5) Customer empathy—truly understanding what users need.'
    ],
    code: `const entrepreneurialMindset = {
  identifier: "Opportunity spotter",
  riskTolerance: "Calculated",
  failureView: "Learning experiment",
  timeline: "Long-term vision, short-term iteration",
  traits: [
    "Resilience",
    "Curiosity",
    "Bias for action",
    "Customer empathy",
    "Grit"
  ],
  exampleJourney: {
    phase1: "Identify problem from personal pain",
    phase2: "Talk to potential customers",
    phase3: "Build minimum viable solution",
    phase4: "Learn, iterate, scale"
  }
};`,
    notes: [
      'Entrepreneurship is not just starting a startup—you can be entrepreneurial within a company (intrapreneur) or in any field.',
      'Failure rate is high, but most failures teach valuable lessons that feed future success.',
      'India\'s startup ecosystem has grown 10x since 2015; support is now available (incubators, angel networks, government schemes like DPIIT).'
    ],
    xp: 100,
    practice: {
      title: 'Reflect on Your Problem',
      description: 'Identify a problem you or people around you face regularly. Write down what it is, who faces it, and why current solutions don\'t work well.',
      startCode: `Your problem statement:
- Problem: _______________
- Who faces it: _______________
- Current solutions: _______________
- Why they fall short: _______________`,
      hint: 'Think about frustrations in your daily life—education, travel, food, social connection, productivity. The best startup ideas often come from personal pain.',
      solution: `Example: "Parents in tier-2 Indian cities struggle to find quality online tutoring in regional languages. Most platforms only offer English. Existing tutors are scattered and unverified."`,
      expectedOutput: 'A 2-3 sentence problem statement that clearly identifies who has the problem and why it matters.'
    }
  },
  {
    id: 'ent-customer-discovery',
    category: 'Entrepreneurship',
    title: 'Finding & Validating a Problem/Idea (Customer Discovery)',
    difficulty: 'Beginner',
    theory: [
      'Customer discovery is the process of validating that a problem is real, significant, and worth solving before building. Most failed startups fail because they solved a problem nobody had, not because of poor execution. The goal is to spend time talking to potential customers—not selling, but deeply understanding their pain.',
      'Validation methods include: (1) Surveys—broad but shallow feedback; (2) Interviews—deep 1-on-1 conversations (10–15 qualitative interviews reveal 80% of insights); (3) Landing pages—measure interest via clicks and sign-ups; (4) Problem immersion—shadowing customers in their daily life. Steve Blank\'s "Get Out of the Building" methodology emphasizes observing behavior, not asking hypothetical questions. A customer may say they\'d use your product but never actually pay for it.',
      'Red flags in customer conversations: (1) "That\'s a nice idea but I wouldn\'t use it"; (2) Lack of urgency—if they\'re not bothered by the problem now, they won\'t pay; (3) One-off solutions—the problem only affects 1–2 people; (4) You doing all the talking—good discovery is 80% listening. Green flags: customers volunteer the problem unprompted, ask when your solution launches, or offer to pay.'
    ],
    code: `const customerDiscoveryTemplate = {
      goal: "Validate problem, not sell solution",
      interview_structure: {
        intro: "Thanks for your time. I'm learning about [problem area]. Can you share your experience?",
        openQuestions: [
          "Walk me through the last time you faced [problem].",
          "What did you try? What worked, what didn't?",
          "What's the biggest frustration?",
          "How much time/money does this cost you monthly?"
        ],
        listen_for: [
          "Emotional intensity—do they care?",
          "Frequency—does it happen often?",
          "Willingness to pay—do they see value?"
        ]
      },
      targetSize: "10-15 interviews minimum",
      output: "Pattern synthesis—common pain, frequency, purchase intent"
    };`,
    notes: [
      'Confirmation bias is real: you\'ll find people who agree with you. Seek critical voices too.',
      'In India, warm introductions (through a mutual contact) often yield better interview quality than cold outreach.',
      'Document everything—quotes, patterns, insights. Revisit after 10 interviews.'
    ],
    xp: 100,
    practice: {
      title: 'Conduct 3 Customer Discovery Interviews',
      description: 'Schedule 15-minute conversations with 3 people who face the problem you identified. Use open-ended questions to understand their pain, not to pitch.',
      startCode: `Interview 1: _______________
Problem severity (1-10): ___
Frequency (daily/weekly/monthly): ___
Quote (one thing they said): "_______________"

Interview 2: _______________
Problem severity (1-10): ___
Frequency: ___
Quote: "_______________"

Interview 3: _______________
Problem severity (1-10): ___
Frequency: ___
Quote: "_______________"`,
      hint: 'Ask "Tell me about the last time..." rather than "Would you ever...". Observe their reactions and whether they bring up the problem themselves.',
      solution: `Analyze your 3 interviews: Did all three mention similar pain? Did any say they\'d be willing to pay or that it wastes significant time/money? High validation = yes to both.`,
      expectedOutput: 'A summary: "3 out of 3 users face this problem weekly and spend ₹X/month on workarounds" or similar quantified validation.'
    }
  },
  {
    id: 'ent-market-research',
    category: 'Entrepreneurship',
    title: 'Market Research & Understanding Your Customer',
    difficulty: 'Intermediate',
    theory: [
      'Market research answers: Who is my customer? How big is the market? Who are my competitors? Market sizing uses TAM/SAM/SOM: Total Addressable Market (global opportunity), Serviceable Addressable Market (your geographic + segment reach), and Serviceable Obtainable Market (realistic capture in 5 years). For example, India\'s online education TAM is ~₹50 lakh crore, but your SAM might be ₹10,000 crore (tier-1/2 cities, students seeking prep), and your SOM might be ₹100 crore (realistic 5-year target).',
      'Competitive analysis maps existing players on dimensions like price, quality, geography, and customer segment. Direct competitors do exactly what you do; indirect competitors solve the same problem differently. A student may choose between online tutoring (direct) or offline coaching (indirect). Understanding why customers pick competitors reveals your advantage—faster results, local language support, affordability, community.',
      'Customer personas—semi-fictional profiles of your ideal users—keep the team aligned. Instead of "students," create "Priya, 16, CBSE Class 10, studies in Bhopal, wants JEE coaching but can only afford ₹500/month." Every feature decision asks: Does Priya need this? Personas prevent building features for edge cases instead of your core customer.'
    ],
    code: `const marketResearchFramework = {
      TAM_SAM_SOM: {
        TAM: "India online education: ₹50 lakh crore (all students + all ages + all subjects)",
        SAM: "Class 9-12 competitive exam prep: ₹10,000 crore",
        SOM: "Your 5-year realistic capture: ₹100-500 crore (5-50% of SAM)"
      },
      competitiveMapping: {
        dimension1: { name: "Price", range: "₹0 (free) to ₹50,000 (premium)" },
        dimension2: { name: "Medium", options: ["Video", "Live", "Text", "Offline"] },
        dimension3: { name: "Language", options: ["English", "Hindi", "Regional"] }
      },
      customerPersona: {
        name: "Priya",
        age: 16,
        location: "Bhopal, Tier-2",
        goal: "Score 95% in Class 10 boards",
        budget: "₹500/month",
        frustration: "Offline coaching too expensive; English-medium online tools are confusing",
        deviceAccess: "Android phone, shared family laptop"
      }
    };`,
    notes: [
      'TAM numbers are often inflated. Use bottom-up sizing (e.g., "100,000 students × ₹10,000/year") rather than top-down guessing.',
      'Competitive landscape is not zero-sum—multiple players thrive by serving different segments or geographies.',
      'Survey 30-50 customers to build personas; don\'t guess from office hunches.'
    ],
    xp: 150,
    practice: {
      title: 'Build Your Market Sizing & Persona',
      description: 'Use TAM/SAM/SOM to size your market opportunity. Create one detailed customer persona based on interviews.',
      startCode: `TAM (Total market): _______________
SAM (Your addressable slice): _______________
SOM (Realistic 5-year capture): _______________

Persona Name: _______________
Age/Demographics: _______________
Goal: _______________
Budget: _______________
Device: _______________
Top frustration with current solutions: _______________`,
      hint: 'Use India population data (Class 9-12 = ~40 million), penetration rates, and price points. For persona, base it on your interviews.',
      solution: `TAM: ₹50,000 crore (all Indian students). SAM: ₹5,000 crore (only competitive exam prep, tier-1/2). SOM: ₹100 crore (realistic capture = 2% of SAM by year 5).`,
      expectedOutput: 'Documented TAM/SAM/SOM with clear assumptions + one persona with 6+ data points and a direct quote from a customer interview.'
    }
  },
  {
    id: 'ent-business-model',
    category: 'Entrepreneurship',
    title: 'Business Models & the Business Model Canvas',
    difficulty: 'Intermediate',
    theory: [
      'A business model describes how your company creates, delivers, and captures value. Common models include: Subscription (recurring fee, e.g., YouTube Premium), Freemium (free + paid premium, e.g., Duolingo), Marketplace (commission on transactions, e.g., Swiggy), Ad-supported (free product, revenue from advertisers, e.g., Google), Licensing (one-time or per-seat license, e.g., enterprise software). Choosing a model early shapes product design, marketing, and financial runway.',
      'The Business Model Canvas (Osterwalder & Pigneur) is a one-page visual tool with 9 blocks: (1) Customer Segments, (2) Value Proposition (what you offer), (3) Channels (how customers find you), (4) Customer Relationships (support, community), (5) Revenue Streams, (6) Key Resources (team, tech), (7) Key Activities (what you do daily), (8) Key Partnerships, (9) Cost Structure. Filling it forces clarity: if you can\'t articulate a value prop in one sentence, you\'re not ready.',
      'In India, hybrid models are common. Vedantu uses Freemium + Ads + Subscription. Unacademy uses Free + Ads + Paid courses + Live subscriptions. Matching the model to customer economics matters—students in tier-2 cities often can\'t afford ₹10,000/month subscriptions, but may pay ₹50–500 per course or tolerate ads.'
    ],
    code: `const businessModelCanvas = {
      customerSegments: ["Students Class 9-12", "Parents", "School administrators"],
      valueProposition: "AI-driven personalized learning in regional languages at ₹500/month",
      channels: ["Mobile app", "Instagram", "School partnerships"],
      customerRelationships: ["24/7 chatbot support", "Weekly check-in calls", "Community forum"],
      revenueStreams: {
        subscriptionMonthly: "₹500",
        schoolBulkLicense: "₹50,000/year per school",
        parentPay: "Optional tutoring add-on ₹2,000/month"
      },
      keyResources: ["ML engineers", "Content creators", "Cloud infrastructure"],
      keyActivities: ["Content creation", "ML model training", "Customer support"],
      keyPartnerships: ["Regional content creators", "School networks", "Payment gateways"],
      costStructure: ["Cloud hosting: 15%", "Content creation: 30%", "Customer acquisition: 40%", "Ops: 15%"]
    };`,
    notes: [
      'Freemium is popular in India but hard to make profitable if free-to-paid conversion is below 2–5%.',
      'Schools and institutions often prefer annual licensing over per-student pricing for simplicity.',
      'Your model must align with customer willingness to pay, discovered in interviews.'
    ],
    xp: 150,
    practice: {
      title: 'Fill Out Your Business Model Canvas',
      description: 'Complete all 9 blocks of the Business Model Canvas for your startup idea.',
      startCode: `Customer Segments: _______________
Value Proposition: _______________
Channels: _______________
Customer Relationships: _______________
Revenue Streams: _______________
Key Resources: _______________
Key Activities: _______________
Key Partnerships: _______________
Cost Structure: _______________`,
      hint: 'Start with the customer and value prop (what problem you solve). Work outward to channels (how they hear about you) and partnerships (who helps you scale).',
      solution: `Each block should be a 1-2 sentence statement, specific to your market. "Revenue: Subscription ₹500/month" is better than vague "Freemium model."`,
      expectedOutput: 'Completed Business Model Canvas with 9 blocks filled, realistic to your market and customer research.'
    }
  },
  {
    id: 'ent-mvp-lean',
    category: 'Entrepreneurship',
    title: 'MVP — Building a Minimum Viable Product & Lean Startup',
    difficulty: 'Intermediate',
    theory: [
      'An MVP (Minimum Viable Product) is the smallest version of your idea that lets you test core assumptions with real customers. It\'s not a full product—it\'s a learning tool. Common MVPs for edtech: a WhatsApp bot, a Google Form + email responses, a landing page with Calendly for 1-on-1 sessions, or a simple web app with 1–2 core features. The goal is speed—launch in weeks, not months. Notion templates, Zapier automation, and no-code tools let you build without a technical team.',
      'The Lean Startup methodology (Eric Ries) emphasizes: (1) Build → (2) Measure → (3) Learn → repeat. Each cycle answers one assumption. Launch fast, gather data, and iterate based on what users do (not what they say). Pivoting—changing core assumptions (e.g., from B2C to B2B, or from web to mobile-first)—is a sign you\'re learning, not failing.',
      'In India, MVPs often skip polish in favor of core utility. Ola started with just a few cities and basic UX. Grofers launched with manual operations before automation. Your MVP should be "embarrassingly simple" but solve a real problem. Launch when 80% of potential users would find value, not when it\'s perfect.'
    ],
    code: `const MVPStrategy = {
      failFast: true,
      coreAssumptions: [
        "Students will pay ₹500/month for AI tutoring",
        "Regional language content increases adoption by 3x",
        "Personalized practice (vs static notes) improves scores"
      ],
      versionZero: {
        platform: "WhatsApp bot + Google Sheets backend",
        features: ["Quiz from Class 10 Maths", "Instant feedback", "Progress tracker"],
        targetUsers: 50,
        timeline: "2 weeks to launch"
      },
      versionOne: {
        additions: ["Mobile web version", "2 more subjects", "Push reminders"],
        targetUsers: 500,
        timeline: "2 months post-launch"
      },
      metrics: {
        dailyActiveUsers: "Track Monday-Friday",
        conversionFree2Paid: "Target 3%+",
        userRetention: "Target 40% after 30 days",
        netPromoterScore: "Target 50+"
      },
      pivotTrigger: "If retention drops below 20%, test new hypothesis"
    };`,
    notes: [
      'Launch MVP to friendly users first (friends, family, beta testers) to catch basic issues without reputational risk.',
      'Metrics matter: pick 1–3 primary metrics (DAU, retention, NPS) and track religiously. Vanity metrics (total sign-ups) mislead.',
      'Iteration speed beats perfection. Ship monthly, then weekly as you scale.'
    ],
    xp: 200,
    practice: {
      title: 'Design Your MVP Launch Plan',
      description: 'Outline the smallest version of your product you can build in 4 weeks. What 1–3 core features does it have? How will you measure learning?',
      startCode: `MVP Name: _______________
Platform: (WhatsApp/Web/Mobile/Email) _______________
Core features (max 3):
  1. _______________
  2. _______________
  3. _______________
Initial users to target: _______________
Launch date: _______________
Primary metric to track: _______________
Success threshold: _______________`,
      hint: 'Think small. Can you build this without engineers? Can users test it in 2 weeks? If it takes >4 weeks or >3 people, it\'s not minimal.',
      solution: `MVP: "WhatsApp bot that gives Class 10 Maths MCQs and explains answers via voice. Target: 30 students at our school. Launch: 2 weeks. Metric: Users who solve 5+ questions per week (goal: 70%)."`,
      expectedOutput: 'A 1-page MVP plan with platform, 2–3 features, user count, launch date, and primary metric.'
    }
  },
  {
    id: 'ent-startup-finance',
    category: 'Entrepreneurship',
    title: 'Basic Startup Finance (Revenue, Costs, Unit Economics, Break-Even)',
    difficulty: 'Intermediate',
    theory: [
      'Unit economics answers: How much does it cost to serve one customer? How much revenue does one customer generate? If your unit economics are negative, you\'ll never be profitable no matter how much you scale. Example: if it costs ₹500 to acquire a customer (CAC) and they generate ₹300/year in revenue (LTV), you\'re losing money per customer. The LTV-to-CAC ratio should be 3:1 or better to be sustainable.',
      'Break-even analysis calculates when cumulative revenue equals cumulative costs. If fixed costs are ₹10 lakh/month (team, servers, operations) and you earn ₹500 × 100 users = ₹50,000/month in subscription revenue, you need 20 months and 200 paying customers to break even. Runway is how many months until cash runs out. If you have ₹50 lakh in the bank and burn ₹10 lakh/month, you have 5 months to reach profitability or raise more funding.',
      'Common financial metrics: (1) MRR (Monthly Recurring Revenue) from subscriptions; (2) ARR (Annual Recurring Revenue); (3) CAC (Customer Acquisition Cost) = marketing spend / new customers; (4) LTV (Lifetime Value) = average customer revenue before they churn; (5) Churn rate = % of customers who leave per month; (6) Gross margin = revenue - cost of goods sold. For a SaaS platform, gross margin is often 70–90% (low variable costs). For content creation or tutoring, it\'s lower (40–60%).'
    ],
    code: `const breakEvenCalculator = {
      scenario: "Edtech platform with 500 paying users at ₹500/month",
      revenue: {
        monthlyRecurringRevenue_MRR: 500 * 500,
        annualRecurringRevenue_ARR: (500 * 500) * 12
      },
      costs: {
        monthlyFixed: {
          team_2engineers_1pm: 5 * 2 + 1.5,
          cloudHosting_AWS: 1.5,
          tools_payment_gateway: 0.5,
          operations: 1,
          total: 10
        },
        unitVariable: {
          perUserPerMonth_contentDelivery: 0.05,
          perUserPerMonth_support: 0.25,
          total: 0.3
        }
      },
      calculations: {
        grossRevenue: "₹2,50,000/month",
        variableCosts: 500 * 0.3,
        contribulationMargin: "₹2,50,000 - ₹150 = ₹2,49,850",
        grossMargin_percent: "99.94% (very healthy)",
        netMargin: "₹2,49,850 - ₹10,00,000 fixed = -₹7,50,150 loss/month",
        breakEvenUsers: "Math: ₹10,00,000 fixed / (₹500 - ₹150 variable) ≈ 2,857 paying users",
        monthsToBreakEven: "From 500 to 2,857 users at 50% MoM growth = ~6 months"
      },
      unitEconomics: {
        CAC_costToAcquireOneCustomer: "₹1,000 (if ₹50K/month marketing / 50 new users)",
        LTV_lifetimeValue: "₹30,000 (₹500/month × 60 month avg lifetime)",
        LTV_CAC_ratio: "30,000 / 1,000 = 30:1 (healthy, >3:1 is good)"
      }
    };`,
    notes: [
      'Break-even is not the same as profitability. Even after breaking even, growth costs money. Plan cash runway for 12–18 months.',
      'Churn is silent killer. If 10% of users leave monthly, you lose 100% of users in 10 months (without growth).',
      'In India, most edtech platforms target <₹1,000/month pricing due to low student purchasing power. Margins come from volume and efficiency.'
    ],
    xp: 200,
    practice: {
      title: 'Calculate Your Break-Even Point',
      description: 'Build a simple financial model for your startup. Calculate fixed costs, variable costs, monthly revenue, and break-even user count.',
      startCode: `Monthly Fixed Costs:
- Team: ₹_____
- Infrastructure: ₹_____
- Operations: ₹_____
- TOTAL FIXED: ₹_____

Per-User Variable Cost: ₹_____
Revenue per user (monthly): ₹_____

Customer Acquisition Cost (CAC): ₹_____
Expected Customer Lifetime (months): ___
Lifetime Value (LTV): ₹_____
LTV:CAC Ratio: _____

Break-even users = Total Fixed / (Revenue - Variable): _____`,
      hint: 'Estimate conservatively. Get actual quotes for hosting, real costs for customer support, and honest CAC from your marketing plan.',
      solution: `Fixed ₹10L/mo, Revenue ₹500/user/mo, Variable ₹30/user/mo → Break-even = 10,00,000 / (500-30) ≈ 2,100 users. CAC ₹1,000, LTV ₹30,000 → LTV:CAC = 30:1 (healthy).`,
      expectedOutput: 'A filled financial table showing fixed costs, variable costs, break-even user count, and LTV:CAC ratio (should be >3:1).'
    }
  },
  {
    id: 'ent-marketing-first-customers',
    category: 'Entrepreneurship',
    title: 'Marketing & Getting Your First Customers',
    difficulty: 'Intermediate',
    theory: [
      'Early-stage marketing (before your product is famous) relies on guerrilla tactics: direct outreach, partnerships, and authentic storytelling. Paid ads are expensive and inefficient when you don\'t know who your customer is. Instead, start with founder-led sales—the founder talks to 10 potential customers, converts 2, learns why, and repeats. This is not scalable but it teaches you what works.',
      'Channels for student-focused products in India: WhatsApp group marketing (free, high engagement), school partnerships (bulk adoption), YouTube tutorials (build audience), Instagram/TikTok short content, email newsletters to warm leads, product hunt launches (free PR), word-of-mouth incentives (₹100 per referral). Each channel takes weeks to see results. Launch on multiple channels but master one first.',
      'Growth loops compound. Example: Each student who signs up can refer a friend via a unique link and both get 1 free week. If 5% of new users refer a friend (realistic), and 50% of referred friends sign up, you\'re growing your user base beyond your acquisition spend. Viral coefficients >1 are gold.'
    ],
    code: `const earlyStageMarketingPlaybook = {
      phase1_founderLedSales: {
        target: "Talk to 10 potential customers",
        approach: "Direct WhatsApp, LinkedIn, warm intro from teacher/parent",
        offer: "Free beta access in exchange for feedback",
        goal: "2 customers who use it weekly (20% conversion is excellent early)"
      },
      phase2_referralGrowth: {
        mechanic: "Give ₹100 Amazon voucher for each referral who signs up and completes 10 quizzes",
        paymentMethod: "Send via email or WhatsApp",
        budget: "₹10,000/month for 50 referrals",
        expectedGrowth: "10 → 15 → 22 → 33 users (35% weekly growth)"
      },
      phase3_partnership: {
        partner: "Approach 5 schools in your city",
        pitch: "Free trial for 100 students, if 10+ adopt, we negotiate bulk license ₹50,000/year",
        timeline: "3-month trial period",
        expectedWin: "1 school = 100 users instantly"
      },
      contentMarketeting: {
        channel: "YouTube short-form (60-90 sec) tips for Class 10 Maths",
        frequency: "3x per week",
        callToAction: "Link to WhatsApp group in bio",
        expectedConversion: "2-5% of viewers join WhatsApp group; 10-20% of group convert to paying"
      }
    };`,
    notes: [
      'In India, WhatsApp and YouTube are more effective for student acquisition than Facebook or LinkedIn.',
      'School partnerships are high-effort but high-reward; approach school counselors, not principals.',
      'Monthly spending should not exceed monthly revenue until you\'ve proven unit economics work.'
    ],
    xp: 200,
    practice: {
      title: 'Build Your Customer Acquisition Roadmap',
      description: 'Plan how you\'ll get your first 100 customers in the next 3 months. Pick 2–3 channels and detail the approach for each.',
      startCode: `Channel 1: _______________
- Tactic: _______________
- Timeline: _______________
- Cost: ₹_______________
- Expected outcome: ___ customers

Channel 2: _______________
- Tactic: _______________
- Timeline: _______________
- Cost: ₹_______________
- Expected outcome: ___ customers

Channel 3: _______________
- Tactic: _______________
- Timeline: _______________
- Cost: ₹_______________
- Expected outcome: ___ customers

Total cost: ₹_______________ for ___ customers`,
      hint: 'Be specific. "Reach out to 20 teachers on WhatsApp with personalized message" is better than "get customers from schools."',
      solution: `Channel 1: Founder outreach (free). Reach 20 students, convert 2. Channel 2: School partnership. Pitch 5 schools, close 1. Channel 3: YouTube. Post 12 videos, get 500 views, convert 30 to WhatsApp, convert 3 to paid.`,
      expectedOutput: '3 channels with specific tactics, costs, timelines, and realistic customer targets that sum to 100 in 3 months.'
    }
  },
  {
    id: 'ent-funding-bootstrapping',
    category: 'Entrepreneurship',
    title: 'Funding — Bootstrapping vs Investors, Pitching',
    difficulty: 'Advanced',
    theory: [
      'Funding options: (1) Bootstrapping—self-funding with personal savings or early revenue, keeping full control but moving slowly; (2) Friends & Family—borrowing from people who know you, informal terms; (3) Angel investors—high-net-worth individuals investing ₹10–100 lakh for 5–20% equity; (4) Venture Capital—professional funds investing ₹50 lakh–₹10+ crore for 15–40% equity, expecting 10x–100x returns; (5) Government grants (DPIIT, startups India program)—non-dilutive but competitive. Most Indian edtech startups started bootstrapped (Vedantu, Unacademy early days) and scaled with Series A/B once they hit ₹10–50 lakh MRR.',
      'Investor expectations differ by stage. At seed stage (~$50K–$500K), investors care about: founder quality, problem traction (customer interviews, early revenue), and unfair advantage. At Series A (~$1–10M), they demand: ₹50 lakh+ MRR, retention >30%, a defensible moat. Pitching is storytelling: (1) Problem + emotional hook, (2) Customer traction (numbers), (3) Your insight (why you\'ll win), (4) Business model + path to profitability, (5) Ask (how much capital, what\'s it for?). Investors fund founders as much as ideas—they bet on your execution.',
      'In India, key startup networks: (1) YCombinator (if accepted, opens US investor doors); (2) 500 Global, Accel (early-stage VCs active in India); (3) IIM/BITS/IITD angel networks; (4) NASSCOM startup programs; (5) Government schemes (DPIIT startup certification gives credibility). Avoid predatory terms—equity beyond 50% dilution for seed funding is unusual.'
    ],
    code: `const fundingStrategy = {
      phase1_bootstrapped: {
        timeline: "0-6 months",
        capital: "Personal savings + early revenue from customers",
        goal: "10 paying customers, ₹10K MRR, validate business model",
        dilution: "0% (you own 100%)",
        pros: ["Full control", "Lean discipline", "No investor pressure"],
        cons: ["Slow growth", "Limited marketing budget", "Co-founder must work day job"]
      },
      phase2_seed_round: {
        timeline: "6-12 months (after hitting ₹10K+ MRR)",
        targetRaise: "₹50-200 lakh",
        dilution: "10-20% equity",
        investor_type: "Friends & Family, angel investors, early-stage VCs",
        pitchDeck_sections: [
          "Problem (slide 1)",
          "Market size & opportunity",
          "Product demo",
          "Traction (revenue, users, retention)",
          "Team & why you",
          "Business model & path to profitability",
          "Use of funds (hiring 2 engineers, marketing, 12-month runway)",
          "Ask (₹100 lakh for 15% equity)"
        ],
        expectations: "₹20K–₹100K MRR, retention >30%, clear product-market fit signal"
      },
      phase3_seriesA: {
        timeline: "18-24 months (after ₹50L+ MRR and 50%+ YoY growth)",
        targetRaise: "₹5-20 crore",
        dilution: "15-30% equity (total dilution with seed ~35-40%)",
        investor_type: "Tier-1 VCs (Accel, Sequoia, Lightspeed)",
        milestones: "Profitable or clear path to profitability, market leadership in one segment"
      }
    };`,
    notes: [
      'Pitch deck template: Problem, Market, Product, Traction, Team, Business Model, Use of Funds, Ask. Keep it 10–12 slides.',
      'Government schemes like DPIIT recognition (free), NASSCOM membership, and state startup incentives offer validation without dilution.',
      'Common mistake: raising capital too early (before product-market fit) burns runway without clarity.'
    ],
    xp: 250,
    practice: {
      title: 'Draft Your Seed Funding Ask',
      description: 'Write the "Ask" slide for a hypothetical seed pitch. How much capital do you need? What will you spend it on? What will it help you achieve?',
      startCode: `We are raising: ₹_______________ for _____% equity

Use of funds:
- Engineering (salaries, hiring): ₹_______________ (___%)
- Marketing & customer acquisition: ₹_______________ (___%)
- Infrastructure & operations: ₹_______________ (___%)
- 12-month runway buffer: ₹_______________ (___%)

Milestones this capital will unlock:
1. _______________
2. _______________
3. _______________

Valuation: ₹_______________ (pre-money)`,
      hint: 'Most seed rounds are ₹50-200 lakh. Use it for: team (40%), marketing (40%), ops (20%). By month 12, you should aim for breakeven or clear profitability path.',
      solution: `Raising ₹100 lakh for 20% equity. Spend: ₹50L engineering (hire 2 engineers), ₹30L marketing, ₹20L ops/buffer. Valuation: ₹500L pre-money. Milestones: 10,000 active users, ₹50K MRR, retention >40%.`,
      expectedOutput: 'A completed funding ask slide with capital amount, equity stake, use-of-funds breakdown, and 3 concrete milestones.'
    }
  },
  {
    id: 'ent-scaling-ecosystem',
    category: 'Entrepreneurship',
    title: 'Scaling, Common Failure Reasons & the Indian Startup Ecosystem',
    difficulty: 'Advanced',
    theory: [
      'Scaling means growing revenue while keeping unit economics healthy. At 1–10 customers, every customer is an exception. At 10,000+ customers, processes matter—onboarding, support, retention, churn management must be systematized or quality collapses. Red flags when scaling: (1) Churn accelerates as you grow (sign: product doesn\'t work at scale); (2) Customer support cost rises (sign: poor automation or over-complication); (3) Unit economics decline (sign: CAC creeping up, LTV stagnant); (4) Team friction (sign: unclear roles, bad hiring).',
      'Why Indian startups fail: (1) Premature scaling—raising money, hiring 50 people, then discovering product-market fit doesn\'t exist; (2) Low unit economics—pricing too low to sustain ops at scale; (3) Churn—acquisition-focused, retention ignored; (4) Talent retention—hiring fast, bleeding experienced people; (5) Execution focus—pivoting constantly without committing; (6) Market timing—launching too early (before demand exists) or too late (competitors entrenched). The Indian startup ecosystem is now mature: incubators, accelerators, angel networks, and government support exist.',
      'India\'s startup advantage: 1.4 billion potential users, rising middle class, mobile-first adoption, low labor costs for AI/engineering talent, government support (DPIIT startup certification, tax incentives via Startups India Scheme). Institutions like IIT alumni networks (NASSCOM), NASSCOM startup programs, TiE, Nasscom, Y Combinator India batches, and regional accelerators (Mumbai Angels, Delhi Angels, Bangalore startup ecosystem) offer capital, mentorship, and networks. Many unicorns (Ola, Flipkart, Paytm, Vedantu) emerged because founders solved India-specific problems (affordability, regional language support, payment infrastructure).'
    ],
    code: `const scalingPlaybook = {
      phase1_10_to_1000_users: {
        focus: "Product quality + retention",
        keyMetric: "30-day retention target: 40%+",
        teamSize: "3-5 people (founder, 1-2 engineers, 1 customer success)",
        operations: "Mostly manual; founder in every decision"
      },
      phase2_1000_to_10000_users: {
        focus: "Operations systematization + unit economics",
        automation: {
          onboarding: "Automated email sequences + 1 manual call for key customers",
          support: "Chatbot for 80% questions, humans for 20%",
          billing: "Stripe automation, auto-refund for churn"
        },
        teamSize: "8-15 people (eng, product, marketing, ops, support)",
        keyHires: "CFO/analyst (financial rigor), head of customer success (retention)"
      },
      phase3_10000_plus_users: {
        focus: "Profitability + market leadership",
        structure: "Full P&L org (eng, product, marketing, sales, ops, finance)",
        keyRisks: [
          "Churn acceleration → simplify product, double down on core features",
          "Hiring mistakes → better processes, culture documentation",
          "Feature bloat → ruthless prioritization, kill experiments"
        ]
      },
      indianEcosystem: {
        government: {
          DPIIT_recognition: "Free, gives tax benefits + credibility, apply via startups.gov.in",
          startup_india_scheme: "Deduction from taxable income for 5 years"
        },
        institutions: {
          NASSCOM: "Network, events, partner ecosystem",
          IIT_alumni_networks: "Mentor + angel investor access",
          YCombinator: "₹$500K, network, US expansion support (selective)"
        },
        regions: {
          Bangalore: "Talent density, VC concentration",
          Mumbai: "Financial hub, angel networks strong",
          Delhi: "Startup density, government proximity"
        }
      }
    };`,
    notes: [
      'Retention is cheaper than acquisition. A 5% improvement in 30-day retention can 2x your growth if acquisition stays flat.',
      'Profitability in India edtech typically means: >50% gross margins, CAC paid back in 6–12 months, <10% monthly churn.',
      'Many Indian startups scale by expanding to underserved geographies (Tier 2/3 cities) or languages (Hindi, Tamil, Telugu content).'
    ],
    xp: 300,
    practice: {
      title: 'Design a Scaling Plan for Your Startup',
      description: 'Outline how you\'d grow from 100 users to 10,000 users. What metrics matter? What operations need to change? What team do you need?',
      startCode: `PHASE 1 (100 → 1,000 users, 3 months):
- Team size: ___
- Key metric to hit: ___ (target: ___%)
- One process to automate: ___
- Budget: ₹___

PHASE 2 (1,000 → 10,000 users, 6 months):
- Team size: ___
- Automated support plan: ___
- Revenue run rate target: ₹___
- Main risk: ___

PHASE 3 (10,000+ users, path to profitability):
- Team structure: ___
- Gross margin target: ____%
- Monthly churn target: ____%
- Unfair advantage to defend: ___`,
      hint: 'Phase 1 is scrappy founder-led. Phase 2 adds ops specialists. Phase 3 builds sustainable systems. Churn is silent killer—never ignore it.',
      solution: `Phase 1: 3 people, 40% retention, automate onboarding email, ₹5L budget. Phase 2: 8 people, chatbot + humans for support, ₹50L/month revenue, main risk = churn climbing. Phase 3: 15 people, 60% gross margin, <5% churn, defensible via AI personalization or regional language depth.`,
      expectedOutput: '3-phase scaling plan with team size, key metrics, automation strategy, and risk mitigation for each phase.'
    }
  }
];
