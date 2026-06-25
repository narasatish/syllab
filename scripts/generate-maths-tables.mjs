/**
 * generate-maths-tables.mjs — builds src/data/mathsTables.ts (deterministic, no AI).
 * Multiplication tables, squares, cubes, roots, primes, Roman numerals etc. —
 * high-search reference pages for the /maths-tables cluster.
 * Run: node scripts/generate-maths-tables.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const entries = [];
const faq = (q, a) => ({ q, a });

// Multiplication tables 2–20
for (let n = 2; n <= 20; n++) {
  entries.push({
    slug: `multiplication-table-of-${n}`,
    title: `Multiplication Table of ${n}`,
    category: 'Multiplication Tables',
    intro: `The multiplication table of ${n} from ${n}×1 to ${n}×20 — learn and revise the ${n} times table for fast mental maths.`,
    columns: ['Multiplication', 'Result'],
    rows: Array.from({ length: 20 }, (_, i) => [`${n} × ${i + 1}`, String(n * (i + 1))]),
    faqs: [
      faq(`What is ${n} times ${n}?`, `${n} × ${n} = ${n * n}.`),
      faq(`How to learn the table of ${n} fast?`, `Add ${n} repeatedly: ${n}, ${n * 2}, ${n * 3}, and so on. Practising daily for a few minutes helps you memorise it quickly.`),
    ],
  });
}

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// Squares 1–50
entries.push({
  slug: 'squares-1-to-50', title: 'Squares from 1 to 50', category: 'Squares & Cubes',
  intro: 'List of square numbers from 1 to 50 (n²) — useful for fast calculation, quadratic equations and competitive exams.',
  columns: ['Number', 'Square'], rows: range(1, 50).map((n) => [String(n), String(n * n)]),
  faqs: [faq('What is the square of 25?', '25² = 625.'), faq('What is a perfect square?', 'A perfect square is a number that is the square of an integer, like 1, 4, 9, 16, 25.')],
});
// Cubes 1–30
entries.push({
  slug: 'cubes-1-to-30', title: 'Cubes from 1 to 30', category: 'Squares & Cubes',
  intro: 'List of cube numbers from 1 to 30 (n³) — handy for fast calculation and competitive exams.',
  columns: ['Number', 'Cube'], rows: range(1, 30).map((n) => [String(n), String(n * n * n)]),
  faqs: [faq('What is the cube of 12?', '12³ = 1728.'), faq('What is a perfect cube?', 'A perfect cube is a number that is the cube of an integer, like 1, 8, 27, 64.')],
});
// Square roots 1–30
entries.push({
  slug: 'square-roots-1-to-30', title: 'Square Roots from 1 to 30', category: 'Squares & Cubes',
  intro: 'Square root values (√n) from 1 to 30, rounded to 3 decimals — quick reference for maths and physics calculations.',
  columns: ['Number', 'Square Root (√n)'], rows: range(1, 30).map((n) => [String(n), (Math.sqrt(n)).toFixed(3)]),
  faqs: [faq('What is the square root of 2?', '√2 ≈ 1.414.'), faq('Which numbers have whole square roots?', 'Only perfect squares (1, 4, 9, 16, 25, ...) have whole-number square roots.')],
});
// Cube roots 1–30
entries.push({
  slug: 'cube-roots-1-to-30', title: 'Cube Roots from 1 to 30', category: 'Squares & Cubes',
  intro: 'Cube root values (∛n) from 1 to 30, rounded to 3 decimals — quick reference for fast calculation.',
  columns: ['Number', 'Cube Root (∛n)'], rows: range(1, 30).map((n) => [String(n), Math.cbrt(n).toFixed(3)]),
  faqs: [faq('What is the cube root of 27?', '∛27 = 3.'), faq('What is a cube root?', 'The cube root of a number x is the value that, when multiplied by itself three times, gives x.')],
});

// Prime numbers 1–100
const primes = range(2, 100).filter((n) => { for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; });
entries.push({
  slug: 'prime-numbers-1-to-100', title: 'Prime Numbers from 1 to 100', category: 'Number Lists',
  intro: `There are ${primes.length} prime numbers between 1 and 100. A prime number has exactly two factors — 1 and itself.`,
  columns: ['#', 'Prime Number'], rows: primes.map((p, i) => [String(i + 1), String(p)]),
  faqs: [faq('How many prime numbers are there from 1 to 100?', `There are ${primes.length} prime numbers between 1 and 100.`), faq('Is 1 a prime number?', 'No. 1 has only one factor (itself), so it is neither prime nor composite. The smallest prime number is 2.')],
});

// Roman numerals 1–100 (key values)
const toRoman = (num) => {
  const map = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let r = ''; for (const [v, s] of map) { while (num >= v) { r += s; num -= v; } } return r;
};
entries.push({
  slug: 'roman-numerals-1-to-100', title: 'Roman Numerals from 1 to 100', category: 'Number Lists',
  intro: 'Roman numerals from 1 to 100 (I, II, III … C) with their values — a complete chart for students.',
  columns: ['Number', 'Roman Numeral'], rows: range(1, 100).map((n) => [String(n), toRoman(n)]),
  faqs: [faq('How do you write 50 in Roman numerals?', '50 is written as L.'), faq('What is the Roman numeral for 100?', '100 is written as C.')],
});

// Even / Odd numbers 1–100
entries.push({
  slug: 'even-numbers-1-to-100', title: 'Even Numbers from 1 to 100', category: 'Number Lists',
  intro: 'List of all even numbers from 1 to 100. An even number is divisible by 2.',
  columns: ['#', 'Even Number'], rows: range(1, 50).map((i) => [String(i), String(i * 2)]),
  faqs: [faq('How many even numbers are there from 1 to 100?', 'There are 50 even numbers from 1 to 100.'), faq('Is 0 an even number?', 'Yes, 0 is considered an even number because it is divisible by 2.')],
});
entries.push({
  slug: 'odd-numbers-1-to-100', title: 'Odd Numbers from 1 to 100', category: 'Number Lists',
  intro: 'List of all odd numbers from 1 to 100. An odd number is not divisible by 2.',
  columns: ['#', 'Odd Number'], rows: range(0, 49).map((i) => [String(i + 1), String(i * 2 + 1)]),
  faqs: [faq('How many odd numbers are there from 1 to 100?', 'There are 50 odd numbers from 1 to 100.'), faq('Is 1 an odd number?', 'Yes, 1 is the first odd number.')],
});

const header = `// AUTO-GENERATED by scripts/generate-maths-tables.mjs — do not edit by hand.
// Deterministic maths reference data for the /maths-tables cluster.

export interface MathRefFaq { q: string; a: string; }
export interface MathRef {
  slug: string;
  title: string;
  category: string;
  intro: string;
  columns: string[];
  rows: string[][];
  faqs: MathRefFaq[];
}

export const MATHS_TABLES: MathRef[] = ${JSON.stringify(entries, null, 2)};

export const MT_CATEGORIES = (): string[] => [...new Set(MATHS_TABLES.map((m) => m.category))];
export function getMathRef(slug: string): MathRef | undefined {
  return MATHS_TABLES.find((m) => m.slug === slug);
}
`;

writeFileSync(join(ROOT, 'src/data/mathsTables.ts'), header, 'utf8');
console.log(`✅ mathsTables.ts written: ${entries.length} reference pages.`);
