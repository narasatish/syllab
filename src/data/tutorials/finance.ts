import { TutorialTopic } from './types';

/**
 * Financial Literacy & Money Basics — practical, India-focused money education
 * that schools never teach: budgeting, compound interest, banking, mutual funds,
 * the stock market, insurance and taxes. EDUCATIONAL ONLY — this is not
 * personalised investment advice; examples are illustrative. Feedback editor:
 * "code" blocks are worked calculations, practice asks the learner to compute.
 */
export const financeTopics: TutorialTopic[] = [
  {
    id: 'fin-intro-budget',
    category: 'Money Basics',
    title: 'Budgeting & the 50/30/20 Rule',
    difficulty: 'Beginner',
    theory: [
      'Financial literacy is simply knowing how to earn, spend, save and grow money wisely. It is one of the most useful life skills — yet rarely taught in school. The first habit is budgeting: deciding in advance where your money goes, so you spend on purpose instead of wondering where it disappeared.',
      'A popular starting framework is the 50/30/20 rule: of your take-home income, roughly 50% goes to needs (rent, food, transport, bills), 30% to wants (eating out, entertainment, shopping), and 20% to savings and paying off debt. The exact split is less important than the principle: always pay yourself first by saving a fixed slice before you spend the rest.',
      'The gap between income and spending is your savings — and it is the raw material for every future goal. Even a student earning ₹0 can practise by tracking pocket money. Tracking every rupee for one month is the single most eye-opening money exercise most people ever do.',
      'IMPORTANT: this course teaches general concepts for education only. It is not personalised financial advice — for decisions about your own money, consider a SEBI-registered advisor.',
    ],
    syntax: 'Savings = Income − Expenses\n50% Needs + 30% Wants + 20% Savings',
    code: `Monthly take-home income: ₹30,000

50% Needs   = 0.50 × 30,000 = ₹15,000
30% Wants   = 0.30 × 30,000 = ₹9,000
20% Savings = 0.20 × 30,000 = ₹6,000

Yearly savings at this rate = 6,000 × 12 = ₹72,000`,
    output: 'Needs ₹15,000 · Wants ₹9,000 · Savings ₹6,000/month (₹72,000/year)',
    notes: [
      'Pay yourself first: move savings out on payday, before you can spend it.',
      'The 50/30/20 split is a starting guide, not a rule — adjust to your real situation.',
      'Tracking for just one month reveals "leaks" (subscriptions, impulse buys) you can plug.',
    ],
    xp: 10,
    practice: {
      title: 'Apply the rule',
      description: 'A person takes home ₹20,000 a month. Using 50/30/20, how much should go to savings each month?',
      startCode: `Income = 20,000\nSavings (20%) = ?`,
      hint: '20% means multiply by 0.20.',
      solution: `Savings = 0.20 × 20,000 = ₹4,000 per month`,
      expectedOutput: '₹4,000',
    },
  },
  {
    id: 'fin-compound-interest',
    category: 'Money Basics',
    title: 'Compound Interest — the 8th Wonder',
    difficulty: 'Beginner',
    theory: [
      'Simple interest pays you only on your original amount (the principal). Compound interest pays you interest on your interest too — so your money grows faster and faster over time. This "snowball" effect is the most important idea in all of personal finance, and it rewards starting early more than investing large amounts.',
      'The formula is A = P × (1 + r)^t, where P is the principal, r the annual rate (as a decimal), t the years, and A the final amount. Because t is an exponent, small differences in time produce huge differences in the result. ₹1 growing at 10% becomes ~₹2.6 in 10 years but ~₹17.4 in 30 years.',
      'A handy shortcut is the Rule of 72: divide 72 by the annual return to estimate the years for money to double. At 12% a year, 72 ÷ 12 = 6 years to double. This is why starting to invest at 20 instead of 30 can more than double your final wealth for the same monthly saving.',
    ],
    syntax: 'A = P × (1 + r)^t\nRule of 72: years to double ≈ 72 ÷ rate%',
    code: `Invest P = ₹10,000 at r = 10% for t years:

t = 5:   10,000 × (1.10)^5  ≈ ₹16,105
t = 10:  10,000 × (1.10)^10 ≈ ₹25,937
t = 30:  10,000 × (1.10)^30 ≈ ₹1,74,494

Rule of 72 at 12%: 72 ÷ 12 = 6 years to double.`,
    output: '₹10,000 at 10% → ₹16,105 (5y), ₹25,937 (10y), ₹1,74,494 (30y)',
    notes: [
      'Time matters more than amount — the earlier you start, the harder compounding works.',
      'The same math works against you on debt: unpaid credit-card balances compound at 30–40% a year.',
      'Rule of 72 is an estimate, but close enough for quick mental math.',
    ],
    xp: 15,
    practice: {
      title: 'Rule of 72',
      description: 'An investment grows at about 9% per year. Using the Rule of 72, roughly how many years will it take to double?',
      startCode: `Years to double ≈ 72 ÷ ?`,
      hint: 'Divide 72 by the annual rate (9).',
      solution: `72 ÷ 9 = 8 years (approximately)`,
      expectedOutput: '8 years',
    },
  },
  {
    id: 'fin-banking',
    category: 'Money Basics',
    title: 'Banking, Emergency Fund & Good vs Bad Debt',
    difficulty: 'Beginner',
    theory: [
      'A savings account keeps money safe and liquid but pays low interest (~3–4%). A fixed deposit (FD) locks money for a set term at a higher fixed rate. A recurring deposit (RD) lets you deposit a fixed amount monthly. These are low-risk places for money you may need soon, but their returns often barely beat inflation.',
      'Before investing for growth, build an emergency fund: 3–6 months of essential expenses kept in an easily accessible account. It stops a job loss or medical bill from forcing you into high-interest debt. This safety net is the foundation everything else is built on.',
      'Not all debt is equal. "Good" debt can build value or income (an education loan, sometimes a home loan) and usually carries lower interest. "Bad" debt funds consumption at high interest — credit-card revolving balances (30–40% a year) and many personal loans. The rule of thumb: always pay off high-interest bad debt before investing, because no safe investment reliably beats a 36% interest cost.',
    ],
    syntax: 'Emergency fund = 3 to 6 × monthly essential expenses',
    code: `Monthly essential expenses: ₹18,000

Emergency fund target:
  3 months = 3 × 18,000 = ₹54,000
  6 months = 6 × 18,000 = ₹1,08,000

Credit-card debt of ₹50,000 at 36%/yr costs
≈ ₹18,000 in interest per year if unpaid — clear it first.`,
    output: 'Emergency fund ₹54,000–₹1,08,000; clear 36% card debt before investing',
    notes: [
      'Keep the emergency fund liquid (savings account / liquid fund), not locked in a long FD.',
      'Credit cards are fine if you pay the FULL bill every month — the trap is the "minimum due".',
      'FDs are safe but returns are taxed and often barely beat inflation — use them for stability, not growth.',
    ],
    xp: 12,
    practice: {
      title: 'Emergency fund size',
      description: 'Someone spends ₹25,000 a month on essentials. What is the minimum (3-month) emergency fund they should aim for?',
      startCode: `3-month fund = 3 × ?`,
      hint: 'Multiply monthly essentials by 3.',
      solution: `3 × 25,000 = ₹75,000`,
      expectedOutput: '₹75,000',
    },
  },
  {
    id: 'fin-inflation',
    category: 'Money Basics',
    title: 'Inflation & Real Returns',
    difficulty: 'Intermediate',
    theory: [
      'Inflation is the gradual rise in prices over time, which means each rupee buys a little less every year. In India it has historically averaged roughly 5–6% a year. If your money is not growing at least as fast as inflation, you are quietly getting poorer even though the number in your account stays the same.',
      'This is why the "real return" matters more than the headline rate. Real return ≈ nominal return − inflation. An FD paying 6% when inflation is 6% has a real return near 0% (and after tax, negative). An investment returning 12% during 6% inflation has a real return of about 6% — that is what actually grows your purchasing power.',
      'Inflation also reshapes long-term goals: something that costs ₹1,00,000 today may cost far more in 20 years. Planning for college fees, retirement or a house must use future (inflated) costs, not today\'s prices — which is another reason growth investments matter over decades.',
    ],
    syntax: 'Real return ≈ Nominal return − Inflation\nFuture cost = Present cost × (1 + inflation)^years',
    code: `FD nominal return = 6.5%, inflation = 6%
Real return ≈ 6.5% − 6% = 0.5%  (barely grows)

Future cost of a ₹1,00,000 item in 20 years at 6% inflation:
  1,00,000 × (1.06)^20 ≈ ₹3,20,714`,
    output: 'FD real return ≈ 0.5%; ₹1,00,000 today ≈ ₹3.2 lakh in 20 years',
    notes: [
      'Cash under the mattress loses ~6% of its value every year to inflation.',
      'To beat inflation over the long run, most people need some exposure to growth assets (equity).',
      'Always plan future goals in inflated rupees, not today\'s prices.',
    ],
    xp: 15,
    practice: {
      title: 'Real return',
      description: 'A bond returns 9% in a year when inflation is 6%. What is the approximate real return?',
      startCode: `Real return ≈ 9% − ?`,
      hint: 'Subtract inflation from the nominal return.',
      solution: `9% − 6% = 3% real return (approximately)`,
      expectedOutput: '3%',
    },
  },
  {
    id: 'fin-mutual-funds-sip',
    category: 'Investing',
    title: 'Mutual Funds & SIPs',
    difficulty: 'Intermediate',
    theory: [
      'A mutual fund pools money from many investors and a professional manager invests it in a basket of stocks and/or bonds. You get instant diversification (many holdings) with a small amount, instead of buying dozens of shares yourself. Equity funds invest in stocks (higher risk, higher long-term return), debt funds in bonds (lower risk), and hybrid funds mix both.',
      'A SIP (Systematic Investment Plan) means investing a fixed amount every month automatically. It builds discipline and gives you rupee-cost averaging: you buy more units when prices are low and fewer when high, smoothing out market ups and downs. SIPs are the most popular way Indians invest for long-term goals.',
      'Index funds are a low-cost type of mutual fund that simply tracks a market index like the Nifty 50, rather than trying to beat it. They charge very low fees (expense ratio), and over long periods they beat most actively managed funds precisely because of those lower costs. Understanding fees matters: a 1% higher annual fee can eat a large chunk of your returns over 25 years.',
    ],
    syntax: 'SIP future value grows via compounding on each monthly instalment\nLower expense ratio → more of the return stays with you',
    code: `SIP illustration (assumed 12%/yr, for education only):
  Invest ₹5,000/month for 20 years
  Total invested = 5,000 × 12 × 20 = ₹12,00,000
  Approx value at ~12% ≈ ₹49–50 lakh

The extra ~₹37 lakh over what you put in is compounding
on your monthly instalments. Actual returns are NOT guaranteed.`,
    output: '₹5,000/month for 20y (~12%) → ~₹49–50 lakh (illustrative, not guaranteed)',
    notes: [
      'Returns are never guaranteed — equity fluctuates; the 12% is an illustrative long-run assumption.',
      'Prefer low expense-ratio / index funds for long-term core investing — fees compound too.',
      'Choose "direct" plans over "regular" plans to avoid distributor commissions eating returns.',
    ],
    xp: 18,
    practice: {
      title: 'Total invested in an SIP',
      description: 'You invest ₹3,000 every month for 10 years. Ignoring growth, how much money did you put in overall?',
      startCode: `Total invested = 3,000 × 12 × ?`,
      hint: 'Monthly amount × 12 months × number of years.',
      solution: `3,000 × 12 × 10 = ₹3,60,000 invested (before any growth)`,
      expectedOutput: '₹3,60,000',
    },
  },
  {
    id: 'fin-stock-market',
    category: 'Investing',
    title: 'How the Stock Market Works',
    difficulty: 'Intermediate',
    theory: [
      'A share (stock) is a tiny ownership slice of a company. When you buy one share of a company, you own a fraction of it and share in its future profits and growth. Companies list their shares on exchanges — in India the NSE and BSE — through an IPO, and after that investors buy and sell them among each other, which is what moves prices up and down.',
      'A market index measures the overall market: the Nifty 50 tracks 50 large Indian companies, the Sensex tracks 30. When people say "the market went up 1%", they usually mean an index. Indices are a quick gauge of how the broad market is doing and the benchmark index funds try to match.',
      'Share prices rise and fall with company performance, news, interest rates and investor emotion. Over short periods prices are volatile and unpredictable; over long periods they tend to follow business growth. This is why long-term, diversified investing beats trying to time the market — a discipline that separates investors from gamblers.',
    ],
    syntax: 'Own shares → own part of the company\nIndex (Nifty 50 / Sensex) = a basket that measures the market',
    code: `Example (illustrative):
  You buy 10 shares of a company at ₹200 each = ₹2,000 invested.
  A year later the price is ₹250.
  Value = 10 × 250 = ₹2,500
  Gain = 2,500 − 2,000 = ₹500  (a 25% return, before tax/fees)

If instead it fell to ₹160: value ₹1,600, a ₹400 loss.
Prices go both ways — never invest money you need soon.`,
    output: '10 shares ₹200→₹250 = ₹500 gain (25%); ₹200→₹160 = ₹400 loss',
    notes: [
      'Diversify — never put all your money in one stock; one company can fail.',
      'Short-term prices are driven by emotion and news; long-term by business growth.',
      'Avoid "hot tips", intraday trading and leverage as a beginner — most lose money doing this.',
    ],
    xp: 18,
    practice: {
      title: 'Compute the return',
      description: 'You buy 5 shares at ₹100 each and sell them later at ₹120 each. What is your total profit (before fees)?',
      startCode: `Profit = 5 × (120 − ?)`,
      hint: 'Profit per share is (sell − buy); multiply by the number of shares.',
      solution: `5 × (120 − 100) = 5 × 20 = ₹100 profit`,
      expectedOutput: '₹100',
    },
  },
  {
    id: 'fin-risk-diversification',
    category: 'Investing',
    title: 'Risk, Return & Diversification',
    difficulty: 'Advanced',
    theory: [
      'Every investment trades off risk and return: generally, the higher the potential return, the higher the risk of loss. Cash and FDs are low risk, low return; equity is higher risk with higher long-term return; individual small-company stocks and crypto are very high risk. There is no "high return, no risk" option — anything promising that is a scam.',
      'Diversification is the one genuine "free lunch" in investing: spreading money across many assets that don\'t all move together reduces risk without necessarily reducing expected return. If one holding crashes, others cushion the blow. A diversified fund holding 50 companies is far safer than betting everything on one.',
      'Your ideal mix (asset allocation) depends on your time horizon and temperament. Money you need in 1–2 years should stay safe (savings/FD/debt). Money for goals 10+ years away can take more equity risk, because it has time to recover from downturns. Rebalancing — periodically trimming what grew and topping up what lagged — keeps your risk level steady.',
    ],
    syntax: 'Higher expected return ⇒ higher risk\nDiversify across assets that don\'t move together',
    code: `Two portfolios, both aiming for growth:

A) 100% in one stock  → if it drops 50%, you lose 50%.
B) Spread across 50 stocks (a fund) → one dropping 50%
   barely dents the whole; the others offset it.

Same market, very different risk. B is diversified.`,
    output: 'Concentration risks everything on one bet; diversification spreads it',
    notes: [
      'Match risk to time horizon: short-term money safe, long-term money can ride out volatility.',
      'If an "opportunity" promises high returns with no risk, assume it is a fraud.',
      'Rebalance occasionally (e.g. yearly) to keep your risk level where you intended.',
    ],
    xp: 20,
    practice: {
      title: 'Spot the red flag',
      description: 'A scheme promises "guaranteed 40% returns every month with zero risk". In one line, why should you avoid it?',
      startCode: `Reason: ?`,
      hint: 'Think about the risk–return trade-off and what "guaranteed + zero risk + huge return" implies.',
      solution: `Guaranteed high returns with zero risk are impossible — this is a classic Ponzi/scam pattern; avoid it.`,
      expectedOutput: 'No real investment gives guaranteed high returns with zero risk — it is a scam',
    },
  },
  {
    id: 'fin-insurance-tax',
    category: 'Protection & Tax',
    title: 'Insurance & Income Tax Basics (India)',
    difficulty: 'Intermediate',
    theory: [
      'Insurance protects you from financial disasters you cannot afford to self-fund. Term life insurance pays your family a large sum if you die during the term, for a very low premium — it is pure protection, not investment. Health insurance covers hospital bills, which can wipe out savings. The golden rule: keep insurance and investment separate; avoid "investment-cum-insurance" products that do both poorly.',
      'Income tax in India is charged on annual income in slabs — you pay a higher rate only on the income above each threshold, not on your whole income. There are two regimes: the new regime has lower rates but fewer deductions; the old regime has higher rates but lets you reduce taxable income through deductions like Section 80C (up to ₹1.5 lakh in investments such as PPF, ELSS, EPF) and 80D (health insurance).',
      'TDS (Tax Deducted at Source) means tax is often withheld before you receive salary or interest, which you reconcile when filing your annual Income Tax Return (ITR). Understanding your slab, deductions and which regime suits you can legally save a meaningful amount every year — a core part of financial literacy.',
    ],
    syntax: 'Term insurance = cheap pure protection\nTax is slab-based: higher rate only on income above each slab',
    code: `Simplified slab illustration (concept, not current-year exact):
  Income up to a basic exemption: 0% tax
  Next slab: taxed at a lower rate
  Higher slabs: taxed at higher rates

Only the portion of income WITHIN each slab is taxed at
that slab's rate — you never pay the top rate on all of it.

Section 80C (old regime): invest up to ₹1.5 lakh in
PPF/ELSS/EPF etc. to reduce taxable income.`,
    output: 'Slab-based tax; 80C can cut taxable income by up to ₹1.5 lakh (old regime)',
    notes: [
      'Buy a plain term plan for life cover — it is a fraction of the cost of endowment/ULIP plans.',
      'Health insurance is essential; one hospitalisation can erase years of savings.',
      'Compare old vs new tax regime each year — the better one depends on your deductions.',
      'Exact slabs and limits change with each Union Budget — always check the current year before filing.',
    ],
    xp: 18,
    practice: {
      title: 'Insurance vs investment',
      description: 'Your friend wants ONE product that both insures their life and grows their money. What is the better approach, in one line?',
      startCode: `Advice: ?`,
      hint: 'Recall the golden rule about combining insurance and investment.',
      solution: `Keep them separate: buy cheap term insurance for cover AND invest separately (e.g. index funds/SIP) — combined products do both poorly.`,
      expectedOutput: 'Keep insurance and investment separate: term plan + separate investments',
    },
  },
  {
    id: 'fin-goals-planning',
    category: 'Protection & Tax',
    title: 'Goal Planning & Avoiding Scams',
    difficulty: 'Beginner',
    theory: [
      'Money works best when tied to specific goals: an emergency fund, a laptop in 1 year, higher studies in 4 years, retirement in 35. Each goal has a target amount and a time horizon, and the horizon decides where you keep the money — short-term goals in safe instruments, long-term goals in growth assets that can ride out volatility.',
      'A simple plan: (1) build the emergency fund, (2) clear high-interest debt, (3) get term + health insurance, (4) then invest for goals via SIPs in low-cost diversified funds, (5) increase the amount as your income grows. Automating each step (auto-transfer on payday) makes the plan actually happen.',
      'Finally, protect yourself. Common scams target beginners: "guaranteed double your money", crypto/forex "signals", fake loan apps, and pump-and-dump stock tips on social media. Real wealth-building is slow, boring and diversified. If something is urgent, secret, guaranteed, or pressures you to act now, it is almost always a fraud — pause and verify with a trusted, regulated source.',
    ],
    syntax: 'Order: Emergency fund → clear bad debt → insurance → invest for goals',
    code: `A student's simple 5-step money plan:
  1. Save 1 month of expenses as a starter emergency fund.
  2. Pay off any high-interest debt (cards, personal loans).
  3. Get health cover (and term cover once you have dependents).
  4. Start a small SIP in a low-cost index fund for long-term goals.
  5. Raise the SIP amount every time your income rises.`,
    output: 'A prioritised, automatable personal finance roadmap',
    notes: [
      'Automate savings/SIPs on payday so the plan runs without willpower.',
      '"Guaranteed", "urgent", "secret", "double your money" = scam warning words.',
      'Increase your investment rate with every raise — lifestyle creep is the silent wealth killer.',
    ],
    xp: 12,
    practice: {
      title: 'Order the steps',
      description: 'Put these in the sensible order: (a) start an SIP for retirement, (b) build an emergency fund, (c) clear a 36% credit-card balance.',
      startCode: `Order: ?, ?, ?`,
      hint: 'Safety first, then kill the most expensive debt, then invest for growth.',
      solution: `Order: (b) emergency fund → (c) clear the 36% card debt → (a) start the retirement SIP.`,
      expectedOutput: 'b → c → a',
    },
  },
];
