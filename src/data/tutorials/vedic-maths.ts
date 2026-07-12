import { TutorialTopic } from './types';

export const vedicMathsTopics: TutorialTopic[] = [
  {
    id: 'vm-intro',
    category: 'Vedic Maths Fundamentals',
    title: 'Introduction to Vedic Maths & Mental Math Benefits',
    difficulty: 'Beginner',
    theory: [
      'Vedic Mathematics is an ancient system of calculation techniques derived from Vedic sutras (aphorisms). Unlike conventional algorithms that work digit-by-digit from right to left, Vedic methods often work left-to-right, matching how we naturally think. This makes calculations faster, require fewer intermediate steps, and reduce mental effort.',
      'The core principle is "working from the whole to the parts" — you estimate the magnitude first, then refine. For competitive exams like JEE, NEET, and CAT, these techniques save crucial time. Mental math strengthens numerical intuition, improves pattern recognition, and builds confidence in problem-solving.',
      'Research shows students who master Vedic methods calculate 3–5× faster than those using traditional algorithms alone, with significantly fewer errors. The techniques are not "tricks" but mathematically rigorous methods that reveal the underlying structure of numbers.',
    ],
    code: `
// Why Vedic Maths works: Example of Left-to-Right Addition
// Traditional: 234 + 567 → work right to left (4+7=11, 3+6=10, 2+5=11)
// Vedic: 234 + 567 → work left to right immediately (2+5=7, 3+6=9, 4+7=11)

const traditionalAddition = () => {
  // 234 + 567
  // Step 1: 4 + 7 = 11 (write 1, carry 1)
  // Step 2: 3 + 6 + 1(carry) = 10 (write 0, carry 1)
  // Step 3: 2 + 5 + 1(carry) = 8
  // Result: 801
  return 801;
};

const vedicAddition = () => {
  // 234 + 567
  // Step 1: 2 + 5 = 7 (hundreds)
  // Step 2: 3 + 6 = 9 (tens)
  // Step 3: 4 + 7 = 11 (ones)
  // Adjust: 9 + 1 = 10 (carry one to hundreds)
  // Result: 7 + 1 = 8, 0, 1 → 801
  return 801;
};

console.log('Traditional result:', traditionalAddition()); // 801
console.log('Vedic result:', vedicAddition()); // 801
    `.trim(),
    notes: [
      'Vedic methods work best when learned as patterns, not isolated tricks.',
      'Practice with 2-digit and 3-digit numbers before moving to larger numbers.',
      'Mental math is a skill — it improves with daily 5–10 minute practice.',
    ],
    xp: 50,
    practice: {
      title: 'Why Vedic Maths?',
      description: 'Write down three advantages of Vedic maths over traditional algorithms. (Hint: speed, pattern recognition, confidence.)',
      hint: 'Think about how you naturally count or estimate — that\'s closer to Vedic thinking than column arithmetic.',
      solution: 'Vedic maths is faster (fewer steps), reveals number patterns (improves intuition), and reduces calculation errors through pattern-based shortcuts.',
    },
  },
  {
    id: 'vm-add-subtract',
    category: 'Vedic Maths Fundamentals',
    title: 'Fast Addition & Subtraction (Left-to-Right, Complements)',
    difficulty: 'Beginner',
    theory: [
      'Left-to-right addition mirrors natural thinking. Instead of starting from the ones place, start from the highest place value. This gives you the magnitude immediately and makes adjustments for carry-overs simpler. For 456 + 289: compute 4+2=6 (hundreds), 5+8=13 (adjust to 7 in tens place, carry 1), 6+9=15 (ones). Result: 745.',
      'Subtraction by complement works on the principle that subtracting a number is equivalent to adding its complement. The complement of a digit to 9 is (9 − digit). For 1000 − 347, take complement of 347 = 652, then adjust: 1000 − 347 = 653. This converts subtraction (which requires borrowing) into simpler addition.',
      'These methods are faster because they eliminate borrowing in subtraction and reduce mental holding of intermediate results in addition. Mastering these builds speed for all arithmetic.',
    ],
    code: `
const fastAddition = () => {
  // 456 + 289
  // Step 1: 4 + 2 = 6 (hundreds place)
  // Step 2: 5 + 8 = 13 → write 1 in tens, carry 1 to hundreds
  // Step 3: 6 + 9 = 15 → write 5 in ones, carry 1 to tens
  // Adjustments: 6 + 1(carry) = 7 (hundreds), 1 + 1(carry) = 2 (tens)
  // Result: 745
  return 456 + 289; // 745
};

const fastSubtractionByComplement = () => {
  // 1000 - 347 using complement method
  // Complement of 347: 9-3=6, 9-4=5, 10-7=3 → 653
  // Then: 1000 - 347 = 653
  return 1000 - 347; // 653
};

const fastSubtractionExample = () => {
  // 800 - 235
  // Complement of 235: 9-2=7, 9-3=6, 10-5=5 → 765
  // 800 - 235 = 565 (subtract complement method)
  return 800 - 235; // 565
};

console.log('456 + 289 =', fastAddition()); // 745
console.log('1000 - 347 =', fastSubtractionByComplement()); // 653
console.log('800 - 235 =', fastSubtractionExample()); // 565
    `.trim(),
    notes: [
      'In left-to-right addition, always note down carries as you go.',
      'Complement method is especially useful for subtraction from powers of 10 (1000, 10000, etc.).',
      'Practice alternating between addition and subtraction to build speed.',
    ],
    xp: 75,
    practice: {
      title: 'Left-to-Right Addition Challenge',
      description: 'Calculate 567 + 234 using left-to-right method. Show your work step-by-step.',
      hint: 'Start from the hundreds place: 5+2=7. Then 6+3=9. Then 7+4=11.',
      solution: 'Step 1: 5+2=7 (hundreds). Step 2: 6+3=9 (tens). Step 3: 7+4=11 (ones, carry 1). Adjust: 7 (no change), 9+1=10, 0. Result: 801',
    },
  },
  {
    id: 'vm-multiply-11',
    category: 'Vedic Maths Multiplication',
    title: 'Multiplication by 11 and by Powers of 10',
    difficulty: 'Beginner',
    theory: [
      'Multiplying by 11 has a beautiful shortcut: add adjacent digits and place the sum between them. For 34 × 11: place 3 and 4 at the ends, then insert 3+4=7 in between → 374. If the sum of adjacent digits exceeds 9 (e.g., 8+7=15), write 5 and carry 1. This works because 11 = 10 + 1, so multiplying by 11 shifts left and adds the original number.',
      'Powers of 10 (10, 100, 1000, etc.) are trivial: append zeros equal to the power. 456 × 100 = 45600. This is foundational for scaling results of other calculations.',
      'These "trivial" tricks form the building blocks of faster multiplication strategies. Mastering them allows you to decompose larger multiplications into manageable parts.',
    ],
    code: `
const multiplyBy11Method = () => {
  // 34 × 11
  // Adjacent pairs: 3 and 4
  // Insert sum: 3 | (3+4) | 4 → 3 | 7 | 4 → 374
  // Verify: 34 × 11 = 34 × (10 + 1) = 340 + 34 = 374
  return 34 * 11; // 374
};

const multiplyBy11Carry = () => {
  // 78 × 11
  // Adjacent pairs: 7 and 8
  // Insert sum: 7 | (7+8) | 8 → 7 | 15 | 8
  // Since 15 > 9: write 5, carry 1 → (7+1) | 5 | 8 → 858
  // Verify: 78 × 11 = 78 × (10 + 1) = 780 + 78 = 858
  return 78 * 11; // 858
};

const multiplyBy100 = () => {
  // 456 × 100
  // Append 2 zeros (power of 100 = 10^2)
  // Result: 45600
  return 456 * 100; // 45600
};

const multiplyBy1000 = () => {
  // 89 × 1000
  // Append 3 zeros (power of 1000 = 10^3)
  // Result: 89000
  return 89 * 1000; // 89000
};

console.log('34 × 11 =', multiplyBy11Method()); // 374
console.log('78 × 11 =', multiplyBy11Carry()); // 858
console.log('456 × 100 =', multiplyBy100()); // 45600
console.log('89 × 1000 =', multiplyBy1000()); // 89000
    `.trim(),
    notes: [
      'For 3-digit × 11: 456 × 11 → 4|(4+5)|(5+6)|6 → 4|9|11|6 → 5016 (after carry)',
      'Powers of 10 apply to division too: 4560 ÷ 100 = 45.6',
    ],
    xp: 75,
    practice: {
      title: 'Multiply by 11',
      description: 'Calculate 63 × 11 and 92 × 11 using the adjacent-digit method.',
      hint: 'For 63: write 6, insert 6+3=9, write 3. For 92: write 9, insert 9+2=11 (carry!), write 2.',
      solution: '63 × 11 = 693. 92 × 11 = 1012 (9+1=10, so 10|0|2 = 1012).',
    },
  },
  {
    id: 'vm-nikhilam',
    category: 'Vedic Maths Multiplication',
    title: 'Multiplying Numbers Near a Base (Nikhilam)',
    difficulty: 'Intermediate',
    theory: [
      'Nikhilam ("all from 9 and the last from 10") is powerful for numbers close to powers of 10. For 98 × 97, both are close to 100. Deviations: 98 is 2 below 100, and 97 is 3 below. The formula is: (base − dev₁) × (base − dev₂) = base² − base(dev₁ + dev₂) + dev₁ × dev₂. Here: 100² − 100(2+3) + 2×3 = 10000 − 500 + 6 = 9506.',
      'The method: find the base (usually the nearest power of 10), compute deviations, multiply using the formula. The genius is that the "cross product" (dev₁ × dev₂) is small and easy to compute mentally, and the middle term (base × sum of deviations) is just appending digits to the base.',
      'This extends to any base: 28 × 32 (base 30): deviations −2 and +2. Result: 30² − 30(−2+2) + (−2)(+2) = 900 − 0 − 4 = 896. The method shines when both numbers are equidistant from the base.',
    ],
    code: `
const nikhilamMultiplication = () => {
  // 98 × 97, base = 100
  // Deviations: 98 = 100 - 2, 97 = 100 - 3
  // Formula: base² - base(dev₁ + dev₂) + dev₁ × dev₂
  // = 100² - 100(2 + 3) + 2 × 3
  // = 10000 - 500 + 6
  // = 9506
  const base = 100;
  const dev1 = 2;   // 100 - 98
  const dev2 = 3;   // 100 - 97
  const result = base * base - base * (dev1 + dev2) + dev1 * dev2;
  return result; // 9506
};

const nikhilamBase30 = () => {
  // 28 × 32, base = 30
  // Deviations: 28 = 30 - 2, 32 = 30 + 2
  // Formula: 30² - 30(-2 + 2) + (-2) × 2
  // = 900 - 30(0) - 4
  // = 900 - 4
  // = 896
  const base = 30;
  const dev1 = 2;   // 30 - 28
  const dev2 = -2;  // 32 - 30
  const result = base * base - base * (dev1 + dev2) + dev1 * dev2;
  return result; // 896
};

const nikhilamBase1000 = () => {
  // 994 × 998, base = 1000
  // Deviations: 994 = 1000 - 6, 998 = 1000 - 2
  // Formula: 1000² - 1000(6 + 2) + 6 × 2
  // = 1000000 - 8000 + 12
  // = 992012
  const base = 1000;
  const dev1 = 6;   // 1000 - 994
  const dev2 = 2;   // 1000 - 998
  const result = base * base - base * (dev1 + dev2) + dev1 * dev2;
  return result; // 992012
};

console.log('98 × 97 =', nikhilamMultiplication()); // 9506
console.log('28 × 32 =', nikhilamBase30()); // 896
console.log('994 × 998 =', nikhilamBase1000()); // 992012
    `.trim(),
    notes: [
      'Choose base as the nearest power of 10 or a round number.',
      'The method is fastest when both numbers are equidistant from the base (deviations sum to 0 or small).',
      'Great for squaring numbers close to a base.',
    ],
    xp: 100,
    practice: {
      title: 'Nikhilam Multiplication',
      description: 'Calculate 103 × 107 using Nikhilam method with base 100.',
      hint: 'Deviations: 103 is +3 from 100, 107 is +7 from 100. Use: 100² + 100(3+7) + 3×7',
      solution: '100² + 100(10) + 21 = 10000 + 1000 + 21 = 11021',
    },
  },
  {
    id: 'vm-urdhva',
    category: 'Vedic Maths Multiplication',
    title: 'General Multiplication (Urdhva Tiryagbhyam / Criss-Cross)',
    difficulty: 'Intermediate',
    theory: [
      'Urdhva Tiryagbhyam ("vertical and crosswise") is the universal multiplication method. For any two numbers, align them and process columns of products in a specific order: ones-place products, cross products with carries, and so on. The beauty is symmetry: you process vertically, then diagonals (criss-cross), then vertically again.',
      'For 23 × 12: write them vertically, then compute 3×2=6 (rightmost), 2×2+3×1=7 (cross), 2×1=2 (leftmost). Result: 276. This method uses the distributive property naturally and requires minimal carrying logic.',
      'Unlike long multiplication (which requires memorizing steps), Urdhva can be visualized as processing product columns. This makes it scalable to any number of digits and is often faster than traditional multiplication for 3+ digit numbers.',
    ],
    code: `
const urdhvaMultiplication = () => {
  // 23 × 12 using Urdhva Tiryagbhyam
  // Vertical layout:
  //    2 3
  //  ×   1 2
  // -------
  // Step 1 (rightmost): 3 × 2 = 6
  // Step 2 (cross): 2 × 2 + 3 × 1 = 4 + 3 = 7
  // Step 3 (leftmost): 2 × 1 = 2
  // Result: 276
  const prod1 = 3 * 2;          // 6
  const prod2 = 2 * 2 + 3 * 1;  // 7
  const prod3 = 2 * 1;          // 2
  return 200 + prod3 * 10 + prod2 + prod1; // 276
};

const urdhvaMultiplier3Digits = () => {
  // 124 × 35 using Urdhva Tiryagbhyam
  // Vertical layout:
  //      1 2 4
  //    ×     3 5
  // -----------
  // Rightmost: 4 × 5 = 20 (write 0, carry 2)
  // Cross: 2×5 + 4×3 = 10 + 12 = 22, plus carry 2 = 24 (write 4, carry 2)
  // Diagonal: 1×5 + 2×3 = 5 + 6 = 11, plus carry 2 = 13 (write 3, carry 1)
  // Leftmost: 1×3 = 3, plus carry 1 = 4
  // Result: 4340
  return 124 * 35; // 4340
};

const urdhvaMultiplier2by2 = () => {
  // 47 × 23
  // Rightmost: 7 × 3 = 21 (write 1, carry 2)
  // Cross: 4×3 + 7×2 = 12 + 14 = 26, plus carry 2 = 28 (write 8, carry 2)
  // Leftmost: 4×2 = 8, plus carry 2 = 10 (write 10)
  // Result: 1081
  return 47 * 23; // 1081
};

console.log('23 × 12 =', urdhvaMultiplication()); // 276
console.log('124 × 35 =', urdhvaMultiplier3Digits()); // 4340
console.log('47 × 23 =', urdhvaMultiplier2by2()); // 1081
    `.trim(),
    notes: [
      'Draw columns visually to track which digits multiply; this aids memory and reduces errors.',
      'Urdhva scales beautifully to larger numbers and is often faster than traditional long multiplication.',
      'Practice with 2×2, then 2×3, then 3×3 digit multiplications.',
    ],
    xp: 125,
    practice: {
      title: 'Urdhva Tiryagbhyam',
      description: 'Multiply 34 × 25 using criss-cross method. Show all product columns.',
      hint: 'Rightmost: 4×5=20. Cross: 3×5+4×2=23. Leftmost: 3×2=6. Combine with carries.',
      solution: 'Rightmost: 4×5=20 (0, carry 2). Cross: 15+8=23 + carry 2 = 25 (5, carry 2). Leftmost: 6 + carry 2 = 8. Result: 850',
    },
  },
  {
    id: 'vm-squaring',
    category: 'Vedic Maths Multiplication',
    title: 'Squaring Numbers Ending in 5 and Near a Base',
    difficulty: 'Intermediate',
    theory: [
      'Squaring numbers ending in 5 has an instant formula: (10a + 5)² = 100a(a+1) + 25. For 85²: a=8, so 100×8×9 + 25 = 7200 + 25 = 7225. The logic: (10a+5)² = 100a² + 100a + 25 = 100a(a+1) + 25. You multiply the tens digit by (tens digit + 1), then append 25.',
      'For squaring near a base (e.g., base 100), use (base − d)² = base² − 2×base×d + d². For 96²: (100−4)² = 10000 − 800 + 16 = 9216. This is an application of Nikhilam with the same number twice.',
      'These shortcuts turn squaring from a lengthy multiplication into a mental calculation. Combined with addition shortcuts, squaring becomes as fast as single-digit arithmetic.',
    ],
    code: `
const squareEndingIn5 = () => {
  // 85² using the formula (10a+5)² = 100a(a+1) + 25
  // Here a = 8
  // Formula: 100 × 8 × (8+1) + 25
  //        = 100 × 8 × 9 + 25
  //        = 7200 + 25
  //        = 7225
  const a = 8;
  return 100 * a * (a + 1) + 25; // 7225
};

const squareEndingIn5Alt = () => {
  // 45²
  // a = 4
  // Formula: 100 × 4 × 5 + 25 = 2000 + 25 = 2025
  const a = 4;
  return 100 * a * (a + 1) + 25; // 2025
};

const squareNearBase100 = () => {
  // 96² = (100 - 4)² using Nikhilam
  // Formula: base² - 2 × base × d + d²
  //        = 100² - 2 × 100 × 4 + 4²
  //        = 10000 - 800 + 16
  //        = 9216
  const base = 100;
  const d = 4;
  return base * base - 2 * base * d + d * d; // 9216
};

const squareNearBase100Alt = () => {
  // 104² = (100 + 4)²
  // Formula: base² + 2 × base × d + d²
  //        = 100² + 2 × 100 × 4 + 4²
  //        = 10000 + 800 + 16
  //        = 10816
  const base = 100;
  const d = 4;
  return base * base + 2 * base * d + d * d; // 10816
};

console.log('85² =', squareEndingIn5()); // 7225
console.log('45² =', squareEndingIn5Alt()); // 2025
console.log('96² =', squareNearBase100()); // 9216
console.log('104² =', squareNearBase100Alt()); // 10816
    `.trim(),
    notes: [
      'Squaring ending in 5: just multiply tens digit by (tens + 1) and append 25.',
      'For 115²: 11×12=132, then 13225.',
      'Near-base squares extend to any base: for 97 near base 100 or 28 near base 30.',
    ],
    xp: 100,
    practice: {
      title: 'Squaring Numbers Ending in 5',
      description: 'Calculate 55², 75², and 125² using the ending-in-5 method.',
      hint: 'For 55: 5×6=30, append 25 → 3025. For 75: 7×8=56, append 25 → 5625. For 125: 12×13=156, append 25 → 15625.',
      solution: '55²=3025, 75²=5625, 125²=15625',
    },
  },
  {
    id: 'vm-division',
    category: 'Vedic Maths Division',
    title: 'Fast Division Techniques',
    difficulty: 'Intermediate',
    theory: [
      'Fast division often relies on decomposition and approximation. For simple divisors (2, 5, 10, etc.), shortcuts abound: dividing by 5 is multiplying by 2 and dividing by 10. For 630 ÷ 5: multiply by 2 to get 1260, then divide by 10 → 126.',
      'For division by larger numbers, the Vedic "flag" method or long-division variants can speed up the process by pre-computing multiples or using estimation. More importantly, understanding divisibility rules (next topic) lets you eliminate impossibilities and check answers.',
      'In competitive exams, you rarely need exact long division; instead, estimate the quotient and verify using multiplication or modular arithmetic. These techniques build that confidence.',
    ],
    code: `
const divideBy5 = () => {
  // 630 ÷ 5
  // Method: Multiply by 2, then divide by 10
  // Step 1: 630 × 2 = 1260
  // Step 2: 1260 ÷ 10 = 126
  return (630 * 2) / 10; // 126
};

const divideBy25 = () => {
  // 1250 ÷ 25
  // Method: Multiply by 4, then divide by 100
  // Step 1: 1250 × 4 = 5000
  // Step 2: 5000 ÷ 100 = 50
  return (1250 * 4) / 100; // 50
};

const divideBy125 = () => {
  // 8000 ÷ 125
  // Method: Multiply by 8, then divide by 1000
  // Step 1: 8000 × 8 = 64000
  // Step 2: 64000 ÷ 1000 = 64
  return (8000 * 8) / 1000; // 64
};

const estimatedDivision = () => {
  // 1575 ÷ 7
  // Traditional: long division
  // Vedic: 7 × 200 = 1400, remainder 175
  //        7 × 20 = 140, remainder 35
  //        7 × 5 = 35, remainder 0
  // Result: 225
  return 1575 / 7; // 225
};

console.log('630 ÷ 5 =', divideBy5()); // 126
console.log('1250 ÷ 25 =', divideBy25()); // 50
console.log('8000 ÷ 125 =', divideBy125()); // 64
console.log('1575 ÷ 7 =', estimatedDivision()); // 225
    `.trim(),
    notes: [
      'Dividing by 5 = multiplying by 2 then dividing by 10.',
      'Dividing by 25 = multiplying by 4 then dividing by 100.',
      'Dividing by 125 = multiplying by 8 then dividing by 1000.',
      'Use divisibility rules to predict remainders without full division.',
    ],
    xp: 100,
    practice: {
      title: 'Fast Division',
      description: 'Calculate 2150 ÷ 5 and 5000 ÷ 25 using Vedic shortcuts.',
      hint: 'For ÷5: multiply by 2, divide by 10. For ÷25: multiply by 4, divide by 100.',
      solution: '2150÷5: 2150×2=4300, 4300÷10=430. 5000÷25: 5000×4=20000, 20000÷100=200.',
    },
  },
  {
    id: 'vm-divisibility',
    category: 'Vedic Maths Fundamentals',
    title: 'Divisibility Rules & Checking Answers (Digit Sum)',
    difficulty: 'Beginner',
    theory: [
      'Divisibility rules let you instantly determine if a number is divisible by 2, 3, 5, 9, 11, etc. For instance, a number is divisible by 3 if the sum of its digits is divisible by 3; divisible by 9 if digit-sum is divisible by 9. For 4536: digit sum = 4+5+3+6 = 18, which is divisible by 9, so 4536 is divisible by 9.',
      'The digit-sum method (also called "casting out nines") is powerful for checking arithmetic. After computing 456 × 78 = 35568, verify: 456 has digit-sum 15→6, 78 has digit-sum 15→6, product digit-sum should be 6×6=36→9. Check: 35568 digit-sum = 3+5+5+6+8 = 27→9. Matches!',
      'These rules are not shortcuts for calculation but shortcuts for verification. In exams, a few seconds spent checking prevents costly errors. Divisibility rules also help identify patterns and factor numbers mentally.',
    ],
    code: `
const digitSum = (n) => {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum > 9 ? digitSum(sum) : sum;
};

const checkDivisibilityBy9 = () => {
  // Is 4536 divisible by 9?
  // Digit sum: 4 + 5 + 3 + 6 = 18 → 1 + 8 = 9
  // Since digit-sum is 9, 4536 is divisible by 9
  const num = 4536;
  const ds = digitSum(num);
  return ds === 9 || ds === 0; // true
};

const checkMultiplication = () => {
  // Verify: 456 × 78 = 35568
  // Digit sums: 456 → 4+5+6=15 → 6
  //             78  → 7+8=15 → 6
  //             Product digit-sum should be: 6 × 6 = 36 → 9
  const a = 456, b = 78, result = 35568;
  const dsA = digitSum(a);
  const dsB = digitSum(b);
  const dsResult = digitSum(result);
  const dsExpected = digitSum(dsA * dsB);
  return dsResult === dsExpected; // true (both are 9)
};

const divisibilityBy11 = () => {
  // Is 4521 divisible by 11?
  // Alternating digit sum: 4 - 5 + 2 - 1 = 0
  // Since alternating sum is 0 (divisible by 11), 4521 is divisible by 11
  const num = 4521;
  const digits = num.toString().split('').map(Number);
  let altSum = 0;
  for (let i = 0; i < digits.length; i++) {
    altSum += (i % 2 === 0 ? 1 : -1) * digits[i];
  }
  return altSum % 11 === 0; // true
};

console.log('4536 divisible by 9?', checkDivisibilityBy9()); // true
console.log('456 × 78 = 35568?', checkMultiplication()); // true
console.log('4521 divisible by 11?', divisibilityBy11()); // true
    `.trim(),
    notes: [
      'Divisibility by 2: last digit is even.',
      'Divisibility by 3: digit-sum divisible by 3.',
      'Divisibility by 5: last digit is 0 or 5.',
      'Divisibility by 11: alternating digit-sum (first − second + third − …) divisible by 11.',
    ],
    xp: 75,
    practice: {
      title: 'Check Divisibility & Verify Calculation',
      description: 'Is 6789 divisible by 9? Verify that 234 × 19 = 4446 using digit-sum method.',
      hint: 'For 6789: digit sum = 6+7+8+9=30→3. For 234: digit sum = 2+3+4=9. For 19: 1+9=10→1. Product: 9×1=9.',
      solution: '6789 digit-sum=3, not divisible by 9. For 234×19=4446: 9×1=9, and 4446 digit-sum = 4+4+4+6=18→9. Verified!',
    },
  },
  {
    id: 'vm-mental-calcs',
    category: 'Vedic Maths Advanced',
    title: 'Working with Fractions, Percentages & Squares/Cubes Mentally',
    difficulty: 'Advanced',
    theory: [
      'Mental fraction arithmetic relies on quick conversion. To add 3/4 + 2/5: find LCM(4,5)=20, then 15/20 + 8/20 = 23/20. Vedic approaches simplify by recognizing common patterns: 1/4 = 0.25, 1/5 = 0.2, 3/8 = 0.375. Percentages are fractions with denominator 100, so 25% = 0.25 = 1/4.',
      'For percentages, use breakdowns: 15% of 320 = 10% of 320 + 5% of 320 = 32 + 16 = 48. Squaring and cubing near bases: 23² is (20+3)² = 400 + 2×20×3 + 9 = 400 + 120 + 9 = 529. Cubing: 12³ = (10+2)³ = 1000 + 3×100×2 + 3×10×4 + 8 = 1728.',
      'Mental arithmetic with fractions and percentages is crucial for competitive exams and real-world problem solving. These techniques convert abstract fractions into concrete visual processes.',
    ],
    code: `
const fractionAddition = () => {
  // 3/4 + 2/5
  // LCM(4, 5) = 20
  // 3/4 = 15/20, 2/5 = 8/20
  // 15/20 + 8/20 = 23/20 = 1 + 3/20
  return 15 + 8; // numerator sum (23), denominator is 20
};

const percentageCalculation = () => {
  // 15% of 320
  // Break as: 10% + 5%
  // 10% of 320 = 32
  // 5% of 320 = 16
  // Total: 32 + 16 = 48
  return 0.1 * 320 + 0.05 * 320; // 48
};

const cubingNearBase = () => {
  // 12³ = (10 + 2)³
  // Formula: (a + b)³ = a³ + 3a²b + 3ab² + b³
  // = 10³ + 3×10²×2 + 3×10×2² + 2³
  // = 1000 + 600 + 120 + 8
  // = 1728
  const a = 10, b = 2;
  return a * a * a + 3 * a * a * b + 3 * a * b * b + b * b * b; // 1728
};

const percentageDiscount = () => {
  // 20% discount on ₹500
  // 20% of 500 = 100
  // Price after discount: 500 - 100 = 400
  return 500 - 0.2 * 500; // 400
};

console.log('3/4 + 2/5 (numerator sum):', fractionAddition()); // 23 (out of 20)
console.log('15% of 320:', percentageCalculation()); // 48
console.log('12³:', cubingNearBase()); // 1728
console.log('20% discount on ₹500:', percentageDiscount()); // 400
    `.trim(),
    notes: [
      'Common percentages: 10%=1/10, 20%=1/5, 25%=1/4, 50%=1/2, 75%=3/4.',
      'For cubing: (a+b)³ = a³ + 3a²b + 3ab² + b³. Break into manageable parts.',
      'Compound percentage: 10% then 20% = ×0.9 × 0.8 = ×0.72 (28% off total).',
    ],
    xp: 125,
    practice: {
      title: 'Mental Calculations with Fractions & Percentages',
      description: 'Calculate 18% of 250 and 13³ mentally.',
      hint: '18% = 10% + 8%. 10% of 250 = 25, 8% ≈ 20. For 13³: (10+3)³ = 1000 + 900 + 270 + 27.',
      solution: '18% of 250: 25+20=45. 13³: 1000+3×100×3+3×10×9+27 = 1000+900+270+27 = 2197',
    },
  },
  {
    id: 'vm-practice-plan',
    category: 'Vedic Maths Exam Strategy',
    title: 'Speed-Math Practice Plan for Exams',
    difficulty: 'Advanced',
    theory: [
      'Mastery requires structured practice. Week 1–2: focus on 11-multiplication and ending-in-5 squares (high confidence, quick wins). Week 3–4: Nikhilam and left-to-right addition (moderate complexity, broad applicability). Week 5–6: Urdhva and divisibility rules (integration and verification). Week 7+: mix problems from all techniques and simulate exam conditions.',
      'The goal is internalization: these shortcuts should feel as natural as single-digit arithmetic. Start with 2-digit calculations, progress to 3-digit, then practice under time pressure. Track your speed: aim for 98%+ accuracy at ≥5 problems/min by week 8.',
      'Exam strategy: use Vedic methods for multiplication, squaring, and division in main calculations; use digit-sum to verify final answers in the last 5 seconds before moving on. This balance of speed and correctness minimizes wasted time and careless errors.',
    ],
    code: `
const practiceSchedule = () => {
  return \`
  WEEK 1–2: Foundations
  - Day 1–3: 11-multiplication (2-digit and 3-digit), 100+ problems
  - Day 4–6: Ending-in-5 squares, 50+ problems
  - Day 7: Mixed speed test, 30 problems, aim for <90 sec

  WEEK 3–4: Middle Techniques
  - Day 1–3: Nikhilam (numbers near 100, 1000), 80+ problems
  - Day 4–6: Left-to-right addition/subtraction, 100+ problems
  - Day 7: Mixed speed test, 40 problems, aim for <120 sec

  WEEK 5–6: Advanced Multiplication
  - Day 1–3: Urdhva 2×2 and 2×3 digit, 60+ problems
  - Day 4–6: Divisibility rules and digit-sum verification, 80+ problems
  - Day 7: Mixed speed test, 50 problems, aim for <150 sec

  WEEK 7+: Exam Simulation
  - Every day: 60–80 mixed problems (Vedic + standard), timed
  - Verify every 5th answer using digit-sum
  - Target: 90%+ accuracy at 6+ problems/min
  \`;
};

const speedTestFormat = () => {
  return {
    duration_minutes: 5,
    number_of_problems: 25,
    problem_types: ['11-multiplication', 'squares', 'Nikhilam', 'Urdhva', 'division'],
    success_criteria: '20+/25 correct, <5 min',
    repeat_until: 'Three consecutive 100% or 24/25 scores',
  };
};

const dailyRoutine = () => {
  return \`
  Morning (5 min): Warm-up
  - 10 two-digit × 11 multiplications
  - 5 ending-in-5 squares
  - Check accuracy; note errors

  Midday (10 min): Focused Practice
  - 20–30 problems from current week's technique
  - Timed; track speed and accuracy
  - Review mistakes immediately

  Evening (5 min): Speed Drill
  - 15–20 mixed-technique problems under time pressure
  - Aim for 90%+ accuracy
  - Celebrate progress

  Weekend (30 min): Full Exam Simulation
  - 80–100 mixed problems over 25–30 minutes
  - Simulate exam conditions (no breaks, single session)
  - Review and refine weakest techniques
  \`;
};

console.log(practiceSchedule());
console.log(JSON.stringify(speedTestFormat(), null, 2));
console.log(dailyRoutine());
    `.trim(),
    notes: [
      'Consistency beats intensity: 5 min daily beats 2 hours once a week.',
      'Use a notebook or app to track speed and accuracy; identify weak techniques early.',
      'In exams, reserve Vedic methods for time-critical calculations; use digit-sum for final verification only.',
      'Mental math is a skill; expect 4–6 weeks to see noticeable improvements.',
    ],
    xp: 150,
    practice: {
      title: 'Design Your Practice Plan',
      description: 'Outline a 2-week practice schedule focusing on Nikhilam and Urdhva multiplication. Specify daily goals.',
      hint: 'Week 1: Nikhilam (base 100, base 30, mixed). Week 2: Urdhva (2×2, 2×3, 3×2). Track time and accuracy.',
      solution: 'Day 1–3: Nikhilam 50+ problems each (base 100 pairs, equidistant and non-equidistant). Day 4–7: Urdhva 40–60 problems (2×2, 2×3 mixed). Aim: Nikhilam <2 sec/problem, Urdhva <3 sec/problem by Day 14.',
    },
  },
];
