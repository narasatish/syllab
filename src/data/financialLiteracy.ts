/**
 * Financial Literacy curriculum — Classes 5 to 12, basics → advanced.
 * Money, saving, banking, investing, stocks, currencies, commodities (gold/oil),
 * trade and markets. Surfaced as a "Financial Literacy" subject inside the
 * existing Syllabus page, so each chapter gets the full Lesson experience
 * (AI slides + natural voice + images + practice) — no new page needed.
 */

import { Chapter, ClassLevel } from '../types';

interface FinSeed {
  cls: ClassLevel;
  title: string;
  topics: string[];
  example: string;
  difficulty: Chapter['difficulty'];
}

const SEEDS: FinSeed[] = [
  // ── Classes 5-6: What money is, saving, needs vs wants ──────────────────────
  { cls: '5', title: 'What is Money? Coins, Notes & Why We Use It',
    topics: ['barter system', 'coins and notes', 'value of money', 'why money exists'],
    example: 'Before money, people swapped a cow for grain (barter). Money made trading fair and easy.',
    difficulty: 'Easy' },
  { cls: '5', title: 'Needs vs Wants — Smart Spending',
    topics: ['needs', 'wants', 'spending choices', 'priorities'],
    example: 'Food and school books are needs; a new toy is a want. Needs come first.',
    difficulty: 'Easy' },
  { cls: '5', title: 'Saving Money — The Piggy Bank Habit',
    topics: ['saving', 'piggy bank', 'goals', 'pocket money'],
    example: 'Save ₹10 from your ₹50 pocket money each week — in 10 weeks you have ₹100 for something special.',
    difficulty: 'Easy' },
  { cls: '6', title: 'Budgeting — Planning Your Pocket Money',
    topics: ['budget', 'income', 'expense', 'planning'],
    example: 'A budget is a plan: of ₹100, keep ₹40 for snacks, ₹30 to save, ₹30 for gifts.',
    difficulty: 'Easy' },
  { cls: '6', title: 'Banks — Where Money Stays Safe',
    topics: ['bank', 'savings account', 'passbook', 'deposit and withdraw'],
    example: 'A bank keeps your money safe and even pays you a little extra (interest) for keeping it there.',
    difficulty: 'Easy' },

  // ── Classes 7-8: banking, interest, digital money ───────────────────────────
  { cls: '7', title: 'Interest — How Money Grows in a Bank',
    topics: ['simple interest', 'principal', 'rate', 'time'],
    example: '₹1000 at 10% for 1 year earns ₹100 interest. Formula: SI = (P × R × T) / 100.',
    difficulty: 'Medium' },
  { cls: '7', title: 'Digital Money — UPI, Cards & Online Payments',
    topics: ['UPI', 'debit card', 'online payment', 'digital safety'],
    example: 'Scanning a QR code to pay ₹50 for a snack uses UPI — money moves instantly from your bank.',
    difficulty: 'Easy' },
  { cls: '8', title: 'Income, Expense & Profit — Running a Small Shop',
    topics: ['income', 'expense', 'profit', 'loss'],
    example: 'Buy 10 pencils for ₹50, sell for ₹80 → profit = ₹30. Profit = Selling Price − Cost Price.',
    difficulty: 'Medium' },
  { cls: '8', title: 'Compound Interest & The Power of Time',
    topics: ['compound interest', 'reinvesting', 'growth', 'rule of 72'],
    example: 'Compound interest pays interest on interest. ₹1000 at 10% becomes ₹1100, then ₹1210 next year.',
    difficulty: 'Medium' },

  // ── Classes 9-10: investing, stocks intro, inflation, currencies ────────────
  { cls: '9', title: 'Inflation — Why Prices Rise Over Time',
    topics: ['inflation', 'purchasing power', 'cost of living', 'CPI'],
    example: 'A ₹10 chocolate in 2010 costs ₹40 today. That fall in money\'s value is inflation.',
    difficulty: 'Medium' },
  { cls: '9', title: 'Saving vs Investing — Making Money Work',
    topics: ['saving', 'investing', 'risk', 'return'],
    example: 'Saving keeps money safe; investing grows it but with some risk — like planting a seed for a tree.',
    difficulty: 'Medium' },
  { cls: '9', title: 'What is the Stock Market? Owning a Piece of a Company',
    topics: ['shares', 'stock exchange', 'NSE BSE', 'ownership'],
    example: 'Buying 1 share of a company means you own a tiny piece of it. If it grows, your share grows.',
    difficulty: 'Medium' },
  { cls: '10', title: 'Currencies & Exchange Rates — Money Around the World',
    topics: ['currency', 'exchange rate', 'rupee dollar', 'forex'],
    example: 'If $1 = ₹83, a $10 toy costs ₹830. Exchange rates change daily based on demand.',
    difficulty: 'Medium' },
  { cls: '10', title: 'Mutual Funds & SIP — Investing Made Simple',
    topics: ['mutual fund', 'SIP', 'diversification', 'fund manager'],
    example: 'A SIP of ₹500/month into a mutual fund spreads your money across many companies automatically.',
    difficulty: 'Medium' },
  { cls: '10', title: 'Gold & Commodities — Real Things People Trade',
    topics: ['gold', 'silver', 'commodities', 'safe haven'],
    example: 'Indians buy gold as savings. When markets fall, gold prices often rise — a "safe haven".',
    difficulty: 'Medium' },

  // ── Classes 11-12: advanced markets, trading, derivatives, portfolio ────────
  { cls: '11', title: 'How the Stock Market Works — Buyers, Sellers & Prices',
    topics: ['demand and supply', 'bid ask', 'market order', 'price discovery'],
    example: 'A share price rises when more people want to buy than sell — just like cricket-match tickets.',
    difficulty: 'Hard' },
  { cls: '11', title: 'Reading Stocks — Sensex, Nifty & Market Indices',
    topics: ['Sensex', 'Nifty 50', 'index', 'market cap'],
    example: 'The Nifty 50 tracks 50 big companies. When it rises, the overall market is generally up.',
    difficulty: 'Hard' },
  { cls: '11', title: 'Bonds, FDs & Fixed Income — Lending Your Money',
    topics: ['bonds', 'fixed deposit', 'yield', 'government securities'],
    example: 'A bond is a loan you give a company/government; they pay you fixed interest in return.',
    difficulty: 'Hard' },
  { cls: '11', title: 'The Oil Market — Why Petrol Prices Change',
    topics: ['crude oil', 'OPEC', 'supply shock', 'import'],
    example: 'India imports most of its oil. When global crude rises, petrol at your local pump gets costlier.',
    difficulty: 'Hard' },
  { cls: '12', title: 'Trading vs Investing — Time Horizons & Strategy',
    topics: ['intraday', 'long term', 'fundamental analysis', 'technical analysis'],
    example: 'A trader may buy and sell in one day; an investor holds for years. Different goals, different risks.',
    difficulty: 'Hard' },
  { cls: '12', title: 'Derivatives — Futures & Options Explained Simply',
    topics: ['futures', 'options', 'hedging', 'leverage'],
    example: 'A futures contract locks tomorrow\'s price today — a farmer can fix his crop price before harvest.',
    difficulty: 'Advanced' },
  { cls: '12', title: 'Forex & Global Trade — Imports, Exports & Balance',
    topics: ['exports', 'imports', 'trade deficit', 'currency strength'],
    example: 'India exports software and imports oil. If imports cost more than exports, that\'s a trade deficit.',
    difficulty: 'Advanced' },
  { cls: '12', title: 'Building a Portfolio — Risk, Return & Diversification',
    topics: ['portfolio', 'asset allocation', 'risk management', 'compounding'],
    example: 'Don\'t put all money in one stock. Spread across stocks, gold, and bonds to lower risk.',
    difficulty: 'Advanced' },
  { cls: '12', title: 'Taxes, Insurance & Smart Money Habits for Life',
    topics: ['income tax', 'insurance', 'emergency fund', 'financial planning'],
    example: 'Insurance protects against big losses; an emergency fund covers 6 months of expenses if income stops.',
    difficulty: 'Advanced' },
];

export const FINANCIAL_LITERACY: Chapter[] = SEEDS.map((s, i) => ({
  id: `${s.cls}-fin-${i + 1}`,
  title: s.title,
  subject: 'Financial Literacy',
  classLevel: s.cls,
  topics: Array.from(new Set([s.title, ...s.topics, 'Financial Literacy'])).slice(0, 8),
  sourceBook: 'Syllab Money & Markets',
  explanation: `A Financial Literacy lesson for Class ${s.cls}: ${s.title}. Taught with simple real-life examples and visuals.`,
  realWorldExample: s.example,
  examInsight: 'Understand the term, see the real example, then try the small calculation or scenario yourself.',
  difficulty: s.difficulty,
  concepts: [],
}));
