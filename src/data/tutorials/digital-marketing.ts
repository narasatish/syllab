import { TutorialTopic } from './types';

/**
 * Digital Marketing — a high-demand, degree-optional career skill. Covers the
 * full funnel: SEO, content, social, email, paid ads, analytics and strategy.
 * Non-coding course (feedback editor): "code" blocks are worked examples /
 * checklists / metric calculations; practice asks the learner to compute or plan.
 */
export const digitalMarketingTopics: TutorialTopic[] = [
  {
    id: 'dm-intro-funnel',
    category: 'Foundations',
    title: 'What is Digital Marketing & the Funnel',
    difficulty: 'Beginner',
    theory: [
      'Digital marketing is promoting products, services or ideas using online channels — search engines, websites, social media, email and ads — and measuring the results with data. Unlike a newspaper ad, almost everything online is trackable: you know how many people saw, clicked and bought. That measurability is what makes it powerful and testable.',
      'The core mental model is the marketing funnel, describing the journey from stranger to customer: Awareness (they discover you) → Interest / Consideration (they learn more) → Conversion (they buy or sign up) → Retention / Loyalty (they come back and refer others). Each stage needs a different message and channel — you cannot ask someone to buy the moment they meet you.',
      'The two big families of traffic are organic (free, earned over time — SEO, content, social posts) and paid (ads you buy — Google, Meta, YouTube). Good marketers use both: paid for speed and scale, organic for durable, compounding results. Everything in this course maps onto that funnel and that organic/paid split.',
    ],
    syntax: 'Funnel: Awareness → Interest → Conversion → Retention\nTraffic: Organic (earned) + Paid (bought)',
    code: `Example funnel for a free study app:

Awareness   → a YouTube Short + an SEO blog post reach 10,000 people
Interest    → 1,000 visit the site and read a lesson
Conversion  → 100 sign up for a free account
Retention   → 40 come back weekly and tell friends

Notice the numbers shrink at each stage — that's normal.
The marketer's job is to improve each step's %.`,
    output: 'A staged journey: reach → engage → convert → retain',
    notes: [
      'Different funnel stages need different content: awareness = helpful/entertaining, conversion = clear offer.',
      'Organic compounds (a blog post ranks for years); paid stops the moment you stop paying.',
      'Track the % that moves between stages — improving conversion is often cheaper than buying more traffic.',
    ],
    xp: 10,
    practice: {
      title: 'Label the stage',
      description: 'A user who has bought once and now receives a "we miss you" email offer is being marketed to at which funnel stage?',
      startCode: `Stage: ?`,
      hint: 'They are already a customer; the goal is to bring them back.',
      solution: `Retention / Loyalty stage — winning back an existing customer.`,
      expectedOutput: 'Retention',
    },
  },
  {
    id: 'dm-seo',
    category: 'Organic Channels',
    title: 'SEO — Ranking on Google',
    difficulty: 'Intermediate',
    theory: [
      'Search Engine Optimisation (SEO) is the practice of getting your pages to rank high in unpaid Google results for what your audience searches. It is the highest-ROI channel over time because a page that ranks brings free, high-intent traffic for years. SEO has three pillars: on-page, off-page and technical.',
      'On-page SEO is making a single page relevant and useful for a target keyword: a clear title tag and H1, the keyword and related terms used naturally, helpful in-depth content that actually answers the query, internal links, and a readable URL. Modern SEO rewards genuinely helpful content (Google\'s "helpful content" system) and penalises thin, mass-produced pages.',
      'Off-page SEO is mostly backlinks — links from other reputable sites, which act as votes of trust. Technical SEO ensures Google can crawl and index your site fast: mobile-friendly, fast-loading (Core Web Vitals), a sitemap, and structured data (schema). Keyword research (finding what people actually type, and how competitive it is) drives the whole effort — you write for real demand, not guesses.',
    ],
    syntax: 'On-page: title + H1 + helpful content + internal links\nOff-page: quality backlinks\nTechnical: fast, mobile, crawlable, schema',
    code: `Optimising a page for "free NCERT notes Class 10":

Title:  Free NCERT Notes for Class 10 (All Subjects) | Syllab
H1:     Class 10 NCERT Notes — Free PDF & Online
Body:   genuinely useful notes, chapter list, FAQs
URL:    /notes/class-10
Links:  internal links to each subject's page
Schema: Course / FAQ structured data

Result over months: ranks and earns free organic clicks.`,
    output: 'A relevant, helpful, crawlable page that can rank organically',
    notes: [
      'Match "search intent": if people want a list, give a list; if a definition, define it up top.',
      'Quality over quantity — Google\'s 2024+ updates hit sites that mass-produce thin pages.',
      'Backlinks are earned with genuinely linkable content (data, tools, guides), never bought or faked.',
    ],
    xp: 18,
    practice: {
      title: 'Pick the on-page fix',
      description: 'A page targeting "JEE mock test free" has a title "Home - Page 1" and no headings. Name the single most important on-page change.',
      startCode: `Fix: ?`,
      hint: 'The title tag is one of the strongest on-page ranking signals.',
      solution: `Rewrite the title tag (and H1) to include the target keyword, e.g. "Free JEE Mock Test 2026 (with Solutions)".`,
      expectedOutput: 'Fix the title tag/H1 to include the target keyword',
    },
  },
  {
    id: 'dm-content',
    category: 'Organic Channels',
    title: 'Content Marketing',
    difficulty: 'Beginner',
    theory: [
      'Content marketing means attracting and keeping an audience by creating genuinely useful or entertaining content — blog posts, videos, guides, infographics, newsletters — rather than just running ads. You earn attention by helping first; the selling comes later, once you have trust. It fuels SEO, social and email all at once.',
      'The heart of it is understanding your audience\'s problems and answering them better than anyone else. A good piece targets a specific question the audience actually has, delivers a clear answer, and includes a next step (subscribe, try, read more). One strong "pillar" piece can be repurposed into many social posts, an email and a video — work once, distribute many times.',
      'Content works on a compounding, long-term timeline: most pieces get little traffic at first, but the winners accumulate readers and links for years. Consistency and quality beat volume — a few excellent, evergreen pieces outperform a flood of forgettable ones, especially after Google\'s helpful-content updates.',
    ],
    syntax: 'Audience problem → helpful content → trust → conversion\nCreate once → repurpose into many formats',
    code: `Repurposing one guide "How to study for boards in 30 days":

Pillar blog post (SEO)  ──► ranks on Google
      │
      ├─► 5 Instagram carousels (tips)
      ├─► a YouTube video / Short
      ├─► an email to subscribers
      └─► a downloadable checklist (lead magnet)

One idea, six touchpoints, many audiences.`,
    output: 'One pillar piece distributed across many channels',
    notes: [
      'Answer a real question better than the current top results — that is the whole game.',
      'Always add a call-to-action: what should the reader do next?',
      'Repurpose relentlessly — most of your audience will only see one format.',
    ],
    xp: 12,
    practice: {
      title: 'Repurpose it',
      description: 'You wrote a detailed blog post that ranks well. Name two other formats you could turn it into to reach new audiences.',
      startCode: `Format 1: ?\nFormat 2: ?`,
      hint: 'Think video, social carousel, email, infographic, checklist.',
      solution: `e.g. Format 1: a YouTube video/Short; Format 2: an Instagram carousel (or email newsletter / infographic).`,
      expectedOutput: 'Any two of: video, social carousel, email, infographic, checklist',
    },
  },
  {
    id: 'dm-social',
    category: 'Organic Channels',
    title: 'Social Media Marketing',
    difficulty: 'Beginner',
    theory: [
      'Social media marketing uses platforms like Instagram, YouTube, LinkedIn, X and WhatsApp to build an audience, engage them, and drive them toward your product. Each platform has its own culture and best format: Instagram (visuals, Reels), YouTube (long + Shorts), LinkedIn (professional/B2B), X (news/conversation). You pick the platforms where your audience actually spends time — you cannot be everywhere well.',
      'Algorithms reward content that keeps people on the platform: watch time, saves, shares and comments matter more than raw likes. The winning approach is a content pillar strategy — a few recurring themes (e.g. tips, behind-the-scenes, wins) posted consistently — plus genuine engagement (replying to comments, joining conversations). Hooks in the first 3 seconds decide whether short video content is watched at all.',
      'Vanity metrics (follower count) matter less than engagement rate and conversions. A small, engaged audience that trusts you is worth more than a large passive one. Track which posts drive profile visits, link clicks and sign-ups — those are the ones to make more of.',
    ],
    syntax: 'Right platform × consistent pillars × strong hooks × real engagement\nOptimise for saves/shares/watch-time, not just likes',
    code: `Engagement rate = (likes + comments + shares + saves)
                  ÷ reach (or followers) × 100

Example: a Reel gets 4,000 interactions on 50,000 reach
  = 4,000 / 50,000 × 100 = 8% engagement rate
(a strong number — most posts are 1–3%).`,
    output: 'Engagement rate ≈ 8% in the example (strong)',
    notes: [
      'Post where your audience is — one platform done well beats five done poorly.',
      'The first 3 seconds (the hook) make or break short-form video.',
      'Reply to comments early — engagement signals boost how far a post spreads.',
    ],
    xp: 12,
    practice: {
      title: 'Compute engagement rate',
      description: 'A post reaches 20,000 people and gets 1,000 total interactions (likes + comments + shares + saves). What is its engagement rate?',
      startCode: `Engagement rate = 1,000 / 20,000 × 100 = ?`,
      hint: 'Divide interactions by reach, then multiply by 100.',
      solution: `1,000 / 20,000 × 100 = 5% engagement rate`,
      expectedOutput: '5%',
    },
  },
  {
    id: 'dm-email',
    category: 'Direct Channels',
    title: 'Email Marketing',
    difficulty: 'Intermediate',
    theory: [
      'Email marketing is sending targeted messages to people who gave you their address — and it remains one of the highest-ROI channels because you own the list (unlike social followers an algorithm controls). You grow the list with a lead magnet (a free checklist, template or mini-course) offered in exchange for an email, then nurture subscribers toward becoming customers.',
      'Two workhorses: broadcasts (a newsletter sent to everyone) and automations (a pre-built sequence triggered by an action — a welcome series when someone signs up, a cart-abandonment reminder). Segmentation (sending different emails to different groups based on interest or behaviour) dramatically improves results over blasting everyone the same message.',
      'The metrics that matter: open rate (did the subject line work?), click-through rate (did the content and call-to-action work?), and conversions. Deliverability — actually landing in the inbox, not spam — depends on permission (never buy lists), a recognisable sender, and not tripping spam filters. Always include an easy unsubscribe; a healthy list is an engaged one.',
    ],
    syntax: 'Lead magnet → subscribe → welcome automation → nurture → offer\nMetrics: open rate, click-through rate (CTR), conversions',
    code: `Open rate  = emails opened  / emails delivered × 100
CTR        = link clicks    / emails delivered × 100

Sent 5,000, delivered 4,900, opened 1,470, clicked 245:
  Open rate = 1,470 / 4,900 × 100 = 30%
  CTR       =   245 / 4,900 × 100 = 5%`,
    output: 'Open rate 30%, CTR 5% in the example',
    notes: [
      'You own your email list; you only rent your social audience — build the list.',
      'The subject line decides the open; the call-to-action decides the click.',
      'Never buy email lists — it destroys deliverability and is often illegal; use permission opt-ins.',
    ],
    xp: 18,
    practice: {
      title: 'Open rate',
      description: 'An email is delivered to 2,000 people and opened by 500. What is the open rate?',
      startCode: `Open rate = 500 / 2,000 × 100 = ?`,
      hint: 'Opens divided by delivered, times 100.',
      solution: `500 / 2,000 × 100 = 25% open rate`,
      expectedOutput: '25%',
    },
  },
  {
    id: 'dm-paid-ads',
    category: 'Paid Channels',
    title: 'Paid Ads: Google & Meta',
    difficulty: 'Advanced',
    theory: [
      'Paid advertising buys attention instantly. The two giants are Google Ads (search ads that appear when someone searches a keyword — high intent, they already want it) and Meta Ads (Facebook/Instagram — interruption ads shown to people by interest/behaviour, great for awareness and demand creation). Search captures existing demand; social creates it.',
      'Ads run on auctions and you usually pay per click (CPC) or per thousand impressions (CPM). You set a budget, choose targeting (keywords or audiences), write the ad and pick a landing page. The key skill is matching a specific audience to a specific message to a specific landing page — a mismatch wastes money fast. Always send clicks to a focused landing page, not a generic homepage.',
      'Paid marketing lives or dies by the numbers: ROAS (Return On Ad Spend) = revenue ÷ ad spend, and CAC (Customer Acquisition Cost) = spend ÷ customers acquired. If it costs ₹200 to acquire a customer worth ₹1,000, scale up; if it costs ₹1,200, fix or stop. You test small, measure, kill losers, and pour budget into winners.',
    ],
    syntax: 'CPC = spend / clicks\nROAS = revenue / ad spend\nCAC = spend / customers acquired',
    code: `Campaign results:
  Spend         = ₹10,000
  Clicks        = 2,000  → CPC = 10,000 / 2,000 = ₹5
  Customers     = 50     → CAC = 10,000 / 50   = ₹200
  Revenue       = ₹40,000 → ROAS = 40,000 / 10,000 = 4×

ROAS of 4 means ₹4 back for every ₹1 spent — scale it.`,
    output: 'CPC ₹5, CAC ₹200, ROAS 4× — a profitable campaign',
    notes: [
      'Google search = capture existing demand; Meta = create/awaken demand by interest.',
      'Send ad clicks to a focused landing page that matches the ad — never a generic homepage.',
      'Start with a small test budget; scale only what shows a profitable ROAS/CAC.',
    ],
    xp: 20,
    practice: {
      title: 'Compute ROAS',
      description: 'A campaign spends ₹5,000 and generates ₹25,000 in revenue. What is the ROAS (return on ad spend)?',
      startCode: `ROAS = 25,000 / 5,000 = ?`,
      hint: 'Revenue divided by spend.',
      solution: `25,000 / 5,000 = 5× (₹5 revenue per ₹1 spent)`,
      expectedOutput: '5×',
    },
  },
  {
    id: 'dm-analytics',
    category: 'Measurement',
    title: 'Analytics & Key Metrics',
    difficulty: 'Intermediate',
    theory: [
      'You cannot improve what you do not measure. Web analytics tools (Google Analytics 4, plus platform dashboards) show where visitors come from, what they do, and whether they convert. The marketer\'s job is to turn that data into decisions — double down on what works, fix or drop what does not.',
      'Core metrics across channels: sessions/traffic (volume), conversion rate (% who take the desired action), bounce/engagement (did they stay?), and cost metrics (CPC, CAC) versus value metrics (revenue, ROAS, customer lifetime value / LTV). The most important single lever is often conversion rate — turning more of your existing traffic into customers is usually cheaper than buying more traffic.',
      'A/B testing is how you improve scientifically: show version A to half your audience and version B to the other half, and keep whichever converts better. Change one thing at a time (a headline, a button colour, an offer) so you know what caused the difference. Data beats opinion — "let\'s test it" should replace "I think".',
    ],
    syntax: 'Conversion rate = conversions / visitors × 100\nLTV > CAC  ⇒  a sustainable business',
    code: `Conversion rate:
  1,000 visitors, 40 sign-ups
  = 40 / 1,000 × 100 = 4%

A/B test a landing page headline:
  Version A → 3.0% conversion
  Version B → 4.2% conversion
  Keep B. (Test one change at a time.)

Health check: LTV ₹1,500 vs CAC ₹300 → sustainable.`,
    output: 'Conversion rate 4%; winning variant kept; LTV > CAC = healthy',
    notes: [
      'Improving conversion rate is usually cheaper than buying more traffic.',
      'Change ONE variable per A/B test, or you won\'t know what worked.',
      'A business is sustainable only if customer lifetime value (LTV) exceeds acquisition cost (CAC).',
    ],
    xp: 18,
    practice: {
      title: 'Conversion rate',
      description: 'A landing page gets 2,500 visitors and 75 of them sign up. What is the conversion rate?',
      startCode: `Conversion rate = 75 / 2,500 × 100 = ?`,
      hint: 'Conversions divided by visitors, times 100.',
      solution: `75 / 2,500 × 100 = 3% conversion rate`,
      expectedOutput: '3%',
    },
  },
  {
    id: 'dm-strategy',
    category: 'Measurement',
    title: 'Building a Marketing Strategy',
    difficulty: 'Advanced',
    theory: [
      'A strategy ties all the channels together toward a goal. Start with a SMART objective (Specific, Measurable, Achievable, Relevant, Time-bound) — e.g. "get 1,000 free sign-ups in 3 months" — not a vague "grow the brand". Then define your target audience (who, what they want, where they hang out) and your positioning (why choose you over alternatives).',
      'Next, pick channels that fit the audience and goal, and map content to funnel stages: awareness content on social/SEO, consideration content (comparisons, demos) on your site/email, conversion offers on landing pages and ads. Set a budget and, crucially, the KPIs (key performance indicators) you\'ll judge success by — traffic, sign-ups, CAC, ROAS. A plan without metrics is a wish.',
      'Finally, treat marketing as a loop: plan → execute → measure → learn → adjust. Run small experiments, keep winners, cut losers, and reinvest. The best marketers are not the most creative — they are the most systematic about testing and doubling down on what the data proves works.',
    ],
    syntax: 'SMART goal → audience → positioning → channels → content per stage → budget → KPIs → measure → iterate',
    code: `Mini-strategy for a free study app:

Goal:      1,000 sign-ups in 3 months (SMART)
Audience:  Class 10–12 students preparing for boards/JEE
Position:  "Free, AI-powered, made for Indian students"
Channels:  SEO blog (awareness) + Instagram Reels (awareness)
           + email welcome series (conversion)
Budget:    small paid test on Meta to top up organic
KPIs:      sign-ups, CAC, weekly active users
Loop:      measure monthly → keep winners → scale`,
    output: 'A goal-driven, measurable, channel-mapped plan',
    notes: [
      'A SMART goal turns "grow" into something you can actually measure and hit.',
      'Map content to funnel stages — don\'t ask for the sale before building awareness.',
      'Marketing is a loop, not a launch: measure, learn and adjust every cycle.',
    ],
    xp: 20,
    practice: {
      title: 'Make it SMART',
      description: 'Rewrite the vague goal "get more users" into a SMART goal (add a number and a deadline).',
      startCode: `SMART goal: ?`,
      hint: 'Add a specific measurable target and a time frame.',
      solution: `e.g. "Get 500 new free sign-ups within the next 60 days." (specific, measurable, time-bound)`,
      expectedOutput: 'A specific, measurable, time-bound version, e.g. "500 sign-ups in 60 days"',
    },
  },
];
