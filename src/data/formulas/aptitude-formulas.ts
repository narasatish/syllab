/**
 * Aptitude Formulas — Quantitative & Reasoning
 * Entrance exam focused (CAT, GATE, SSC, Banking)
 */

import type { FormulaSubject } from '../formulaBank';

export const aptitudeFormulaData: FormulaSubject = {
  id: 'aptitude',
  label: 'Aptitude',
  icon: '🧠',
  gradient: 'from-violet-500 to-purple-600',
  textColor: 'text-violet-700',
  sections: [
    {
      classLabel: 'Quantitative',
      topics: [
        {
          topic: 'Number System',
          items: [
            { name: 'Divisibility by 3', formula: 'Sum of digits divisible by 3', variables: '', example: '342: 3+4+2=9, divisible by 3 ✓' },
            { name: 'Divisibility by 9', formula: 'Sum of digits divisible by 9', variables: '', example: '729: 7+2+9=18, divisible by 9 ✓' },
            { name: 'HCF × LCM', formula: 'HCF(a,b) × LCM(a,b) = a × b', variables: 'Only valid for 2 numbers' },
            { name: 'Sum of first n naturals', formula: 'S = n(n+1)/2', variables: 'n = last number', example: '1+2+…+100 = 5050' },
            { name: 'Sum of n² terms', formula: 'S = n(n+1)(2n+1)/6', variables: 'Sum of squares' },
            { name: 'Sum of n³ terms', formula: 'S = [n(n+1)/2]²', variables: 'Sum of cubes' },
            { name: 'LCM using HCF', formula: 'LCM(a,b) = (a×b)/HCF(a,b)', variables: '' },
          ],
        },
        {
          topic: 'Percentage & Profit',
          items: [
            { name: 'Percentage', formula: 'Percentage = (Part ÷ Whole) × 100', variables: '', example: '40 out of 200 = 20%' },
            { name: 'Percentage Change', formula: '% Change = [(New − Old) / Old] × 100', variables: '+ve = increase, −ve = decrease' },
            { name: 'Successive Discount', formula: 'Net % = a + b − ab/100', variables: 'a, b = two successive discounts %' },
            { name: 'Marked Price', formula: 'SP = MP × (1 − Discount%/100)', variables: '' },
            { name: 'Profit & Loss', formula: 'SP = CP × (1 + Profit%/100)', variables: '' },
            { name: 'Profit % Formula', formula: 'Profit % = [(SP − CP)/CP] × 100', variables: '' },
            { name: 'Loss % Formula', formula: 'Loss % = [(CP − SP)/CP] × 100', variables: '' },
          ],
        },
        {
          topic: 'Time, Speed & Distance',
          items: [
            { name: 'Basic Formula', formula: 'Speed = Distance / Time', variables: 'Use consistent units: km/h or m/s' },
            { name: 'm/s to km/h', formula: 'km/h = m/s × 18/5', variables: 'Multiply m/s by 3.6' },
            { name: 'Average Speed', formula: 'Avg Speed = Total Distance / Total Time', variables: 'NOT average of individual speeds' },
            { name: 'Relative Speed (same dir)', formula: 'Rel Speed = v₁ − v₂', variables: 'Faster − Slower' },
            { name: 'Relative Speed (opp dir)', formula: 'Rel Speed = v₁ + v₂', variables: 'When moving towards each other' },
            { name: 'Train crossing pole', formula: 'Time = Train Length / Speed', variables: '' },
            { name: 'Train crossing bridge', formula: 'Time = (Train Length + Bridge Length) / Speed', variables: '' },
          ],
        },
        {
          topic: 'Ages Problem',
          items: [
            { name: 'Ratio of Ages', formula: 'If A:B = x:y at time t, then A = xk, B = yk for some k', variables: 'Find k using another condition' },
            { name: 'Current Age Sum', formula: 'If sum of ages = S and ratio = a:b, then A = (a/(a+b))×S', variables: '' },
            { name: 'Age Difference Constant', formula: 'Difference between two persons = constant over time', variables: 'Age difference never changes' },
          ],
        },
        {
          topic: 'Boats & Streams',
          items: [
            { name: 'Downstream Speed', formula: 'v_d = v_b + v_s', variables: 'v_b = boat speed in still water, v_s = stream speed' },
            { name: 'Upstream Speed', formula: 'v_u = v_b − v_s', variables: 'Always less than downstream' },
            { name: 'Boat Speed (both known)', formula: 'v_b = (v_d + v_u) / 2', variables: '' },
            { name: 'Stream Speed (both known)', formula: 'v_s = (v_d − v_u) / 2', variables: '' },
          ],
        },
        {
          topic: 'Logarithms',
          items: [
            { name: 'Log Definition', formula: 'If aˣ = b, then logₐ b = x', variables: 'a = base, b = argument' },
            { name: 'Log of Product', formula: 'log(AB) = log A + log B', variables: '' },
            { name: 'Log of Quotient', formula: 'log(A/B) = log A − log B', variables: '' },
            { name: 'Log of Power', formula: 'log(Aⁿ) = n log A', variables: '' },
            { name: 'Change of Base', formula: 'logₐ b = (log b)/(log a) = ln b / ln a', variables: 'Convert to any base' },
            { name: 'Common Log', formula: 'log₁₀ 100 = 2, log₁₀ 1000 = 3', variables: 'Base 10' },
            { name: 'Natural Log', formula: 'ln e = 1, ln 1 = 0', variables: 'Base e ≈ 2.718' },
          ],
        },
        {
          topic: 'Time & Work',
          items: [
            { name: 'Work Rate', formula: 'Work done = Rate × Time', variables: 'Rate of A = 1/days A takes alone' },
            { name: 'Combined Work', formula: '1/T = 1/A + 1/B', variables: 'T = time together, A,B = individual times' },
            { name: 'Pipes & Cisterns', formula: 'Net rate = Filling rate − Emptying rate', variables: 'Emptying pipe is negative contribution' },
            { name: 'Work Sharing', formula: 'If A and B work together: (A+B) complete work in 1/T days', variables: '' },
          ],
        },
        {
          topic: 'Ratio, Proportion & Mixtures',
          items: [
            { name: 'Alligation (Mean)', formula: 'Cheap qty : Dear qty = (Dear − Mean) : (Mean − Cheap)', variables: '', example: 'Mix Rs.6 & Rs.10, mean Rs.8 → ratio 2:2 = 1:1' },
            { name: 'Compounded Ratio', formula: '(a:b) compounded with (c:d) = ac:bd', variables: '' },
            { name: 'Ratio to Fraction', formula: 'If A:B = 3:5, then A = 3/(3+5) of total', variables: '' },
          ],
        },
        {
          topic: 'Simple & Compound Interest',
          items: [
            { name: 'Simple Interest', formula: 'SI = (P × R × T) / 100', variables: 'P = Principal, R = Rate %, T = Time (years)' },
            { name: 'Amount (SI)', formula: 'A = P + SI = P[1 + (RT/100)]', variables: '' },
            { name: 'Compound Interest', formula: 'A = P(1 + R/100)ⁿ', variables: 'n = number of years' },
            { name: 'CI Formula', formula: 'CI = A − P = P[(1+R/100)ⁿ − 1]', variables: '' },
            { name: 'SI vs CI (2 years)', formula: 'CI − SI = P(R/100)²', variables: 'Useful shortcut for comparison' },
            { name: 'Rule of 72 (Doubling)', formula: 'Time to double (approx) = 72/Rate %', variables: 'For compound interest' },
            { name: 'Continuous Compounding', formula: 'A = Pe^(RT/100)', variables: 'e ≈ 2.718' },
          ],
        },
        {
          topic: 'Permutation & Combination',
          items: [
            { name: 'Permutation', formula: 'ⁿPᵣ = n! / (n−r)!', variables: 'Ordered arrangements', example: '⁵P₂ = 5!/3! = 20' },
            { name: 'Combination', formula: 'ⁿCᵣ = n! / [r!(n−r)!]', variables: 'Unordered selections', example: '⁵C₂ = 10' },
            { name: 'Relation', formula: 'ⁿPᵣ = ⁿCᵣ × r!', variables: 'Perms with same r items in each' },
            { name: 'Circular Permutation', formula: '(n−1)!', variables: 'Arrange n items in circle' },
            { name: 'Combination with Replacement', formula: 'ⁿCᵣ = ⁿ⁺ʳ⁻¹Cᵣ', variables: '' },
          ],
        },
        {
          topic: 'Partnership',
          items: [
            { name: 'Profit Ratio', formula: 'Profit ratio = Capital × Time ratio', variables: 'Profits distributed as capital × time' },
            { name: 'Equal Capital', formula: 'Profit ratio = Time ratio', variables: 'When all partners invest equally' },
            { name: 'Equal Time', formula: 'Profit ratio = Capital ratio', variables: 'When all partners invest for same period' },
          ],
        },
      ],
    },
    {
      classLabel: 'Reasoning',
      topics: [
        {
          topic: 'Series & Patterns',
          items: [
            { name: 'AP Series', formula: 'Tₙ = a + (n−1)d', variables: 'a = first term, d = common difference' },
            { name: 'GP Series', formula: 'Tₙ = a × rⁿ⁻¹', variables: 'a = first term, r = common ratio' },
            { name: 'Prime Number Check', formula: 'Test divisibility by primes up to √n', variables: 'If none divide, n is prime' },
            { name: 'Fibonacci Series', formula: 'Fₙ = Fₙ₋₁ + Fₙ₋₂', variables: 'F₁=1, F₂=1, F₃=2, F₄=3, F₅=5...' },
          ],
        },
        {
          topic: 'Calendar Problems',
          items: [
            { name: 'Odd Days (ordinary year)', formula: '365 days = 52 weeks + 1 day = 1 odd day', variables: '' },
            { name: 'Odd Days (leap year)', formula: '366 days = 52 weeks + 2 days = 2 odd days', variables: '' },
            { name: 'Odd Days (100 years)', formula: '24 leap years + 76 ordinary = (24×2) + 76 = 5 odd days', variables: '' },
            { name: 'Odd Days (400 years)', formula: '100 leap years + 300 ordinary = 0 odd days (repeat cycle)', variables: '' },
            { name: 'Leap Year Rule', formula: 'Div by 4 → leap; century: div by 400 → leap', variables: '2000 = leap; 1900 = not leap' },
          ],
        },
        {
          topic: 'Clock Problems',
          items: [
            { name: 'Angle Between Hands', formula: 'θ = |30H − 5.5M|', variables: 'H = hours, M = minutes' },
            { name: 'Minute Hand Speed', formula: 'Minute hand gains 5.5° per minute on hour hand', variables: '360°/60min = 6°/min (minute), 360°/12hr = 0.5°/min (hour)' },
            { name: 'Hands Overlap', formula: 'Hands overlap 11 times in 12 hours', variables: 'At 0:00, 1:05:27, 2:10:54...' },
          ],
        },
        {
          topic: 'Coding-Decoding',
          items: [
            { name: 'Letter Shift', formula: 'A→B (shift 1), A→C (shift 2), etc.', variables: 'PYTHON → QZUIPM (shift 1)' },
            { name: 'Reverse Coding', formula: 'A↔Z, B↔Y, C↔X, etc.', variables: 'Position from end = 27 − position' },
            { name: 'Substitution', formula: 'Replace each letter with fixed code', variables: 'A=1, B=2, ..., Z=26' },
          ],
        },
        {
          topic: 'Seating Arrangement',
          items: [
            { name: 'Linear Arrangement', formula: 'n people in line = n! permutations', variables: '' },
            { name: 'Circular Arrangement', formula: 'n people in circle = (n−1)! arrangements', variables: 'Fix one position, arrange others' },
            { name: 'Relative Positions', formula: 'If A is to the left of B, and B is to left of C: A < B < C', variables: '' },
          ],
        },
        {
          topic: 'Blood Relations',
          items: [
            { name: 'Parent Notation', formula: 'Father = F, Mother = M, Sibling = S', variables: '' },
            { name: 'Spouse', formula: 'Brother−in−law of A = Husband of A\'s sister OR Sibling\'s spouse', variables: '' },
            { name: 'Generational Relatives', formula: 'Grandparent = FF/FM/MF/MM; Grandchild = inverse', variables: '' },
            { name: 'Cousin', formula: 'Child of parent\'s sibling = cousin', variables: '1st cousin vs 2nd cousin = generational distance' },
          ],
        },
        {
          topic: 'Direction & Distance',
          items: [
            { name: 'Cardinal Directions', formula: 'N↑, S↓, E→, W←; NE, NW, SE, SW (diagonals)', variables: '' },
            { name: 'Right Turn (clockwise)', formula: 'N→E→S→W→N', variables: '90° per turn' },
            { name: 'Shadow Direction', formula: 'At sunrise: shadow points West; At sunset: shadow points East', variables: 'Sunrise = East, Sunset = West' },
          ],
        },
      ],
    },
  ],
};
