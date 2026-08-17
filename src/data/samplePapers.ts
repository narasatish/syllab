/**
 * samplePapers.ts — original Syllab model "Sample Papers" SEO cluster.
 * CBSE-pattern practice papers (NOT copied from CBSE) at /sample-papers/{slug}.
 * Data is generated; answers must be accurate.
 */
export interface SpQuestion { q: string; marks: number; answer: string; }
export interface SpSection {
  name: string;
  marks: number;
  instructions: string;
  /**
   * The unseen passage/extract a comprehension section is based on. REQUIRED
   * whenever the instructions tell the student to "read the passage" — without
   * it the questions are literally unanswerable, which is what shipped for
   * months on 10 English/Hindi papers (Section A said "read the passage" and no
   * passage existed). Guarded by samplePapers.test.ts.
   */
  passage?: string;
  questions: SpQuestion[];
}
export interface SpFaq { q: string; a: string; }
export interface SamplePaper {
  slug: string;
  classLevel: string;
  subject: string;
  board: string;
  title: string;
  intro: string;
  duration: string;
  totalMarks: number;
  sections: SpSection[];
  faqs: SpFaq[];
}

export const SAMPLE_PAPERS: SamplePaper[] = [
  {
    "slug": "class-10-maths",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 10 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 10 Mathematics paper built to the current board blueprint: 38 questions across five sections for 80 marks in 3 hours, with Section A objective, Sections B to D descriptive and Section E case-based. Every question is followed by a fully worked solution, not just the final answer, so you can check your method as well as your result.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The HCF of 96 and 404 is",
            "marks": 1,
            "answer": "4. 404 = 96×4 + 20; 96 = 20×4 + 16; 20 = 16×1 + 4; 16 = 4×4 + 0. The last non-zero remainder is 4."
          },
          {
            "q": "The LCM of two numbers is 182 and their HCF is 13. If one number is 26, the other is",
            "marks": 1,
            "answer": "91. Product of the numbers = HCF × LCM = 13 × 182 = 2366, so the other number = 2366 ÷ 26 = 91."
          },
          {
            "q": "If the sum of the roots of 2x² − (k+1)x + (k−2) = 0 is 5/2, then k equals",
            "marks": 1,
            "answer": "k = 4. Sum of roots = (k+1)/2 = 5/2, so k + 1 = 5 and k = 4."
          },
          {
            "q": "The quadratic equation x² + 4x + 5 = 0 has",
            "marks": 1,
            "answer": "No real roots. D = 16 − 20 = −4 < 0, so the roots are not real."
          },
          {
            "q": "The 15th term of an AP whose first term is 5 and common difference is 3 is",
            "marks": 1,
            "answer": "47. aₙ = a + (n−1)d = 5 + 14×3 = 5 + 42 = 47."
          },
          {
            "q": "How many two-digit numbers are divisible by 7?",
            "marks": 1,
            "answer": "13. They form the AP 14, 21, …, 98: 98 = 14 + (n−1)7 gives n = 13."
          },
          {
            "q": "If the pair of equations 2x + 3y = 7 and 4x + 6y = k has infinitely many solutions, then k is",
            "marks": 1,
            "answer": "14. For infinitely many solutions a₁/a₂ = b₁/b₂ = c₁/c₂, i.e. 2/4 = 3/6 = 7/k, so k = 14."
          },
          {
            "q": "If sin A = 3/5, then cos A equals",
            "marks": 1,
            "answer": "4/5. cos²A = 1 − sin²A = 1 − 9/25 = 16/25, and A is acute, so cos A = 4/5."
          },
          {
            "q": "The value of (sin 30° · cos 60° + cos 30° · sin 60°) is",
            "marks": 1,
            "answer": "1. It equals sin(30° + 60°) = sin 90° = 1. Directly: ½·½ + (√3/2)(√3/2) = ¼ + ¾ = 1."
          },
          {
            "q": "A ladder leans against a wall making an angle of 60° with the ground. If the foot of the ladder is 2.5 m from the wall, the length of the ladder is",
            "marks": 1,
            "answer": "5 m. cos 60° = base/hypotenuse, so ½ = 2.5/L and L = 5 m."
          },
          {
            "q": "Two similar triangles have areas in the ratio 4 : 9. Their corresponding sides are in the ratio",
            "marks": 1,
            "answer": "2 : 3. The ratio of areas of similar triangles equals the square of the ratio of corresponding sides, and √(4/9) = 2/3."
          },
          {
            "q": "In a right triangle ABC right-angled at B, if AB = 6 cm and BC = 8 cm, then AC is",
            "marks": 1,
            "answer": "10 cm. AC² = 6² + 8² = 36 + 64 = 100, so AC = 10 cm."
          },
          {
            "q": "The distance of the point (−6, 8) from the origin is",
            "marks": 1,
            "answer": "10 units. √((−6)² + 8²) = √(36 + 64) = √100 = 10."
          },
          {
            "q": "The midpoint of the segment joining (2, −3) and (−6, 7) is",
            "marks": 1,
            "answer": "(−2, 2). Midpoint = ((2 + (−6))/2, (−3 + 7)/2) = (−4/2, 4/2) = (−2, 2)."
          },
          {
            "q": "The length of a tangent drawn from a point 13 cm from the centre of a circle of radius 5 cm is",
            "marks": 1,
            "answer": "12 cm. The tangent is perpendicular to the radius, so length = √(13² − 5²) = √(169 − 25) = √144 = 12 cm."
          },
          {
            "q": "The area of a sector of a circle of radius 7 cm with central angle 60° is",
            "marks": 1,
            "answer": "77/3 cm² ≈ 25.67 cm². Area = (θ/360)πr² = (60/360)(22/7)(49) = (1/6)(154) = 77/3 cm²."
          },
          {
            "q": "If the mean of 5, 7, 9, x and 11 is 9, then x is",
            "marks": 1,
            "answer": "13. The sum must be 5 × 9 = 45, and 5 + 7 + 9 + 11 = 32, so x = 13."
          },
          {
            "q": "A die is thrown once. The probability of getting a prime number is",
            "marks": 1,
            "answer": "1/2. The primes on a die are 2, 3 and 5 — three outcomes out of six, so 3/6 = 1/2."
          },
          {
            "q": "Assertion (A): The number 6ⁿ can end with the digit 0 for some natural number n. Reason (R): Any number ending in 0 has both 2 and 5 as prime factors.",
            "marks": 1,
            "answer": "(d) A is false, R is true. 6ⁿ = 2ⁿ·3ⁿ has no factor 5, so it can never end in 0; the reason itself is a correct statement."
          },
          {
            "q": "Assertion (A): The points (1, 1), (2, 3) and (3, 5) are collinear. Reason (R): Three points are collinear if the area of the triangle they form is zero.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. Area = ½|1(3−5) + 2(5−1) + 3(1−3)| = ½|−2 + 8 − 6| = 0, so the points are collinear by exactly the criterion in R."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Prove that 3 + 2√5 is irrational, given that √5 is irrational.",
            "marks": 2,
            "answer": "Suppose 3 + 2√5 is rational, say equal to r. Then √5 = (r − 3)/2. The right side is a difference and quotient of rationals, hence rational, so √5 would be rational — contradicting the given. Therefore 3 + 2√5 is irrational."
          },
          {
            "q": "Find the zeroes of the polynomial x² − 2x − 8 and verify the relation between the zeroes and the coefficients.",
            "marks": 2,
            "answer": "x² − 2x − 8 = (x − 4)(x + 2), so the zeroes are 4 and −2. Sum = 4 + (−2) = 2 = −(−2)/1 = −b/a. Product = 4 × (−2) = −8 = −8/1 = c/a. Both relations hold."
          },
          {
            "q": "Solve for x and y: x + y = 14 and x − y = 4.",
            "marks": 2,
            "answer": "Adding the two equations gives 2x = 18, so x = 9. Substituting into x + y = 14 gives y = 5. Hence x = 9, y = 5."
          },
          {
            "q": "In triangle ABC, the point D lies on AB and the point E lies on AC such that DE is parallel to BC. If AD = 3 cm, DB = 5 cm and AE = 4.5 cm, find EC.",
            "marks": 2,
            "answer": "By the Basic Proportionality Theorem, AD/DB = AE/EC, so 3/5 = 4.5/EC. Cross-multiplying, 3·EC = 22.5 and EC = 7.5 cm."
          },
          {
            "q": "A bag contains 5 red, 8 white and 7 black balls. One ball is drawn at random. Find the probability that it is not black.",
            "marks": 2,
            "answer": "Total balls = 5 + 8 + 7 = 20. Balls that are not black = 5 + 8 = 13. P(not black) = 13/20."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 18,
        "instructions": "Answer all 6 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Find the HCF and LCM of 510 and 92 by prime factorisation, and verify that HCF × LCM = product of the numbers.",
            "marks": 3,
            "answer": "510 = 2 × 3 × 5 × 17 and 92 = 2² × 23. The only common prime factor is 2, so HCF = 2. LCM = 2² × 3 × 5 × 17 × 23 = 23460. Check: HCF × LCM = 2 × 23460 = 46920, and 510 × 92 = 46920. Verified."
          },
          {
            "q": "Solve the quadratic equation 2x² − 7x + 3 = 0 by the quadratic formula.",
            "marks": 3,
            "answer": "Here a = 2, b = −7, c = 3, so D = 49 − 24 = 25 and √D = 5. x = (7 ± 5)/4, giving x = 12/4 = 3 and x = 2/4 = 1/2. The roots are 3 and 1/2."
          },
          {
            "q": "The sum of the first 12 terms of an AP is 246 and its first term is 4. Find the common difference and the 12th term.",
            "marks": 3,
            "answer": "Sₙ = n/2[2a + (n−1)d] gives 246 = 6[8 + 11d], so 8 + 11d = 41, hence 11d = 33 and d = 3. The 12th term is a + 11d = 4 + 33 = 37."
          },
          {
            "q": "Prove that (1 + cot²θ)(1 − cos θ)(1 + cos θ) = 1.",
            "marks": 3,
            "answer": "(1 − cos θ)(1 + cos θ) = 1 − cos²θ = sin²θ. Also 1 + cot²θ = cosec²θ = 1/sin²θ. Multiplying, (1/sin²θ)(sin²θ) = 1, as required."
          },
          {
            "q": "Find the area of the triangle whose vertices are (1, −1), (−4, 6) and (−3, −5).",
            "marks": 3,
            "answer": "Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)| = ½|1(6−(−5)) + (−4)((−5)−(−1)) + (−3)((−1)−6)| = ½|11 + 16 + 21| = ½(48) = 24 square units."
          },
          {
            "q": "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the area of the corresponding minor segment. (Use π = 3.14)",
            "marks": 3,
            "answer": "Area of the sector = (90/360)πr² = ¼ × 3.14 × 100 = 78.5 cm². Area of the triangle formed by the two radii = ½ × 10 × 10 = 50 cm². Minor segment = 78.5 − 50 = 28.5 cm²."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 20,
        "instructions": "Answer all 4 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "A motor boat whose speed in still water is 18 km/h takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.",
            "marks": 5,
            "answer": "Let the stream speed be x km/h. Upstream time = 24/(18 − x), downstream time = 24/(18 + x), and the difference is 1 hour: 24/(18 − x) − 24/(18 + x) = 1. This gives 24(18 + x − 18 + x) = (18 − x)(18 + x), i.e. 48x = 324 − x². So x² + 48x − 324 = 0, which factors as (x + 54)(x − 6) = 0. Rejecting the negative root, the stream flows at 6 km/h."
          },
          {
            "q": "Prove that if a line is drawn parallel to one side of a triangle to intersect the other two sides at distinct points, the other two sides are divided in the same ratio (Basic Proportionality Theorem).",
            "marks": 5,
            "answer": "In triangle ABC let DE ∥ BC meet AB at D and AC at E. Join BE and CD, and drop perpendiculars EM ⊥ AB and DN ⊥ AC. Now ar(ADE)/ar(BDE) = (½·AD·EM)/(½·DB·EM) = AD/DB, since both triangles share the same height EM. Similarly ar(ADE)/ar(DEC) = AE/EC. But triangles BDE and DEC stand on the same base DE and lie between the same parallels DE and BC, so ar(BDE) = ar(DEC). Hence AD/DB = AE/EC."
          },
          {
            "q": "The angle of elevation of the top of a tower from a point on the ground is 30°. On walking 30 m towards the tower, the angle of elevation becomes 60°. Find the height of the tower and the original distance from its foot.",
            "marks": 5,
            "answer": "Let the height be h and the nearer distance be x. From the nearer point, tan 60° = h/x, so h = x√3. From the farther point, tan 30° = h/(x + 30), so h = (x + 30)/√3. Equating, x√3 = (x + 30)/√3, hence 3x = x + 30, so x = 15 m and h = 15√3 ≈ 25.98 m. The original distance was x + 30 = 45 m."
          },
          {
            "q": "A solid is in the shape of a cone standing on a hemisphere, both having the same radius 7 cm, and the total height of the solid is 21 cm. Find the volume of the solid. (Use π = 22/7)",
            "marks": 5,
            "answer": "The hemisphere contributes a height equal to its radius, 7 cm, so the cone's height is 21 − 7 = 14 cm. Volume of the hemisphere = (2/3)πr³ = (2/3)(22/7)(343) = 718.67 cm³. Volume of the cone = (1/3)πr²h = (1/3)(22/7)(49)(14) = 718.67 cm³. Total volume ≈ 1437.33 cm³."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A school is organising a sports day. The seats in the stadium are arranged in rows: the first row has 20 seats, the second 24, the third 28, and so on, each row having 4 more seats than the one before. (i) Which progression do the seat counts form, and what are its first term and common difference? (ii) How many seats are in the 15th row? (iii) How many seats are there in the first 15 rows altogether?",
            "marks": 4,
            "answer": "(i) The counts 20, 24, 28, … form an AP with first term a = 20 and common difference d = 4. (ii) a₁₅ = a + 14d = 20 + 56 = 76 seats. (iii) S₁₅ = 15/2 (2×20 + 14×4) = 15/2 (40 + 56) = 15/2 × 96 = 720 seats."
          },
          {
            "q": "CASE STUDY 2 — A student stands 20 m from the base of a vertical flagpole. The angle of elevation of the top of the pole from the student's eye, which is 1.5 m above the ground, is 45°. (i) Sketch the situation and name the right triangle involved. (ii) Find the height of the pole above eye level. (iii) Find the total height of the flagpole.",
            "marks": 4,
            "answer": "(i) The horizontal line from the eye to the pole, the vertical part of the pole above eye level, and the line of sight form a right triangle, right-angled at the pole. (ii) tan 45° = h/20, and tan 45° = 1, so h = 20 m above eye level. (iii) Total height = 20 + 1.5 = 21.5 m."
          },
          {
            "q": "CASE STUDY 3 — A survey recorded the daily pocket money (in ₹) of 40 students: 0–10 → 4 students, 10–20 → 8, 20–30 → 12, 30–40 → 10, 40–50 → 6. (i) Which class is the modal class? (ii) Find the mode. (iii) Find the mean pocket money using the direct method.",
            "marks": 4,
            "answer": "(i) The highest frequency is 12, so the modal class is 20–30. (ii) Mode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)] × h = 20 + [(12 − 8)/(24 − 8 − 10)] × 10 = 20 + (4/6)(10) = 26.67 (about ₹26.7). (iii) Using midpoints 5, 15, 25, 35, 45: Σfᵢxᵢ = 4(5) + 8(15) + 12(25) + 10(35) + 6(45) = 20 + 120 + 300 + 350 + 270 = 1060. Mean = 1060/40 = ₹26.50."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total duration of the Class 10 Maths board exam?",
        "a": "3 hours is the standard duration for the CBSE Class 10 Maths board exam."
      },
      {
        "q": "How many marks is the board exam out of?",
        "a": "The board exam is out of 80 marks, with internal assessment contributing 20 marks."
      },
      {
        "q": "Are there optional questions in the exam?",
        "a": "Yes, there are internal choices within some questions, but all sections must be attempted."
      }
    ]
  },
  {
    "slug": "class-10-science",
    "classLevel": "Class 10",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Science Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 10 Science paper built to the current board blueprint: 39 questions across five sections for 80 marks in 3 hours, covering Physics, Chemistry and Biology in the proportions the board uses. Section A is objective, Sections B to D are descriptive and Section E is case-based. Every question carries a fully worked solution explaining the reasoning, not just the final answer.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The correct balanced equation for the reaction of iron with steam is",
            "marks": 1,
            "answer": "3Fe + 4H₂O → Fe₃O₄ + 4H₂. Iron reacts with steam (not cold water) to give iron(II,III) oxide and hydrogen gas."
          },
          {
            "q": "When quicklime is added to water, the reaction is",
            "marks": 1,
            "answer": "A combination reaction that is exothermic. CaO + H₂O → Ca(OH)₂, releasing a large amount of heat."
          },
          {
            "q": "The pH of a solution changes from 4 to 3. The hydrogen ion concentration becomes",
            "marks": 1,
            "answer": "10 times greater. The pH scale is logarithmic, so a fall of one unit means a tenfold rise in [H⁺]."
          },
          {
            "q": "Which of the following is used to test whether a substance is a base: red litmus, blue litmus, or dilute HCl?",
            "marks": 1,
            "answer": "Red litmus. A base turns red litmus blue; blue litmus stays blue and so gives no information."
          },
          {
            "q": "The common name of sodium hydrogencarbonate is",
            "marks": 1,
            "answer": "Baking soda, NaHCO₃. It is used in antacids and in baking powder with a mild edible acid."
          },
          {
            "q": "The reaction 2PbO + C → 2Pb + CO₂ shows that carbon is acting as",
            "marks": 1,
            "answer": "A reducing agent. Carbon removes oxygen from lead oxide, so PbO is reduced and carbon is itself oxidised."
          },
          {
            "q": "Which gas is evolved when a metal reacts with a dilute acid?",
            "marks": 1,
            "answer": "Hydrogen. It burns with a pop sound when a lighted splint is brought near, which is the standard test."
          },
          {
            "q": "The functional group present in ethanoic acid is",
            "marks": 1,
            "answer": "The carboxylic acid group, −COOH. Ethanoic acid is CH₃COOH."
          },
          {
            "q": "The number of covalent bonds in a molecule of ethane (C₂H₆) is",
            "marks": 1,
            "answer": "Seven — six C–H bonds and one C–C bond."
          },
          {
            "q": "The site of complete oxidation of glucose in a cell is the",
            "marks": 1,
            "answer": "Mitochondrion. Glycolysis occurs in the cytoplasm, but the complete breakdown to CO₂ and water occurs in the mitochondria."
          },
          {
            "q": "The xylem in plants is responsible for",
            "marks": 1,
            "answer": "Transport of water and dissolved minerals from the roots to the rest of the plant. Phloem transports food."
          },
          {
            "q": "Which hormone regulates the level of sugar in the blood?",
            "marks": 1,
            "answer": "Insulin, secreted by the pancreas. Its deficiency causes diabetes."
          },
          {
            "q": "In human beings, the sex of a child is determined by",
            "marks": 1,
            "answer": "The chromosome inherited from the father. The mother always contributes an X; the father contributes either X (girl) or Y (boy)."
          },
          {
            "q": "A concave mirror forms a real, inverted and magnified image when the object is placed",
            "marks": 1,
            "answer": "Between the focus F and the centre of curvature C. The image then forms beyond C."
          },
          {
            "q": "The refractive index of a medium in which light travels at 2 × 10⁸ m/s is (speed of light in vacuum = 3 × 10⁸ m/s)",
            "marks": 1,
            "answer": "1.5. n = c/v = (3 × 10⁸)/(2 × 10⁸) = 1.5."
          },
          {
            "q": "The power of a lens of focal length 25 cm is",
            "marks": 1,
            "answer": "+4 D. P = 1/f in metres = 1/0.25 = 4 dioptres, positive because a 25 cm focal length here denotes a converging lens."
          },
          {
            "q": "Two resistors of 6 Ω and 3 Ω are connected in parallel. Their equivalent resistance is",
            "marks": 1,
            "answer": "2 Ω. 1/R = 1/6 + 1/3 = 1/2, so R = 2 Ω."
          },
          {
            "q": "The direction of the magnetic field around a straight current-carrying conductor is given by",
            "marks": 1,
            "answer": "The right-hand thumb rule: point the right thumb along the current and the curled fingers give the direction of the field."
          },
          {
            "q": "Assertion (A): Photosynthesis is an endothermic process. Reason (R): Energy is absorbed from sunlight during photosynthesis.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. Photosynthesis stores absorbed light energy in glucose, which is precisely why it is endothermic."
          },
          {
            "q": "Assertion (A): Ozone in the upper atmosphere is harmful to living organisms. Reason (R): Ozone absorbs ultraviolet radiation from the Sun.",
            "marks": 1,
            "answer": "(d) A is false, R is true. Upper-atmosphere ozone protects life by absorbing UV radiation; it is ozone at ground level that is a pollutant."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 12,
        "instructions": "Answer all 6 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Why is respiration considered an exothermic reaction? Write the overall equation.",
            "marks": 2,
            "answer": "Respiration breaks down glucose and releases the energy stored in it, which the cell uses for its activities — energy is given out, so the reaction is exothermic. C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy."
          },
          {
            "q": "What is meant by a rancid food, and how can rancidity be prevented?",
            "marks": 2,
            "answer": "Rancidity is the oxidation of fats and oils in food, which spoils their smell and taste. It is prevented by adding antioxidants, packaging in nitrogen, keeping food in airtight containers and refrigerating it."
          },
          {
            "q": "Distinguish between an acid and a base in terms of the ions they produce in aqueous solution, with one example of each.",
            "marks": 2,
            "answer": "An acid produces hydrogen ions, H⁺ (as H₃O⁺), in water — for example HCl → H⁺ + Cl⁻. A base produces hydroxide ions, OH⁻ — for example NaOH → Na⁺ + OH⁻."
          },
          {
            "q": "Why do we apply paint on iron articles?",
            "marks": 2,
            "answer": "Paint forms a barrier that keeps out air and moisture, both of which are needed for rusting. Without contact with oxygen and water the iron cannot corrode, so painting prevents rusting."
          },
          {
            "q": "State two differences between arteries and veins.",
            "marks": 2,
            "answer": "Arteries carry blood away from the heart, usually oxygenated, under high pressure and have thick elastic walls without valves. Veins carry blood towards the heart, usually deoxygenated, under low pressure and have thinner walls with valves that prevent backflow."
          },
          {
            "q": "Define the principal focus of a concave mirror.",
            "marks": 2,
            "answer": "It is the point on the principal axis at which rays of light parallel to the principal axis actually meet after reflection from the concave mirror. The distance of this point from the pole is the focal length."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 21,
        "instructions": "Answer all 7 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Balance the equation and name the type of reaction: Fe + CuSO₄ → FeSO₄ + Cu.",
            "marks": 3,
            "answer": "The equation is already balanced: Fe + CuSO₄ → FeSO₄ + Cu, with one atom of each element on both sides. It is a displacement reaction, because the more reactive iron displaces the less reactive copper from its salt solution. The blue colour of the copper sulphate solution fades and a reddish-brown deposit of copper forms."
          },
          {
            "q": "What happens when sodium hydrogencarbonate is heated? Give the equation and one use of the product.",
            "marks": 3,
            "answer": "On heating, sodium hydrogencarbonate decomposes: 2NaHCO₃ →(heat) Na₂CO₃ + H₂O + CO₂. The carbon dioxide released is what makes cakes and bread rise, which is why baking soda is used in baking powder; the sodium carbonate formed is used in cleaning agents."
          },
          {
            "q": "Explain why carbon forms a very large number of compounds. Give any two reasons.",
            "marks": 3,
            "answer": "First, carbon shows catenation — carbon atoms bond strongly to one another to form long chains, branched chains and rings, which no other element does to the same extent. Second, carbon is tetravalent, so each atom can bond with four other atoms of carbon or of other elements such as hydrogen, oxygen, nitrogen and sulphur. The strength of these covalent bonds makes the resulting compounds stable."
          },
          {
            "q": "Draw and label the pathway of blood in the human heart, naming the four chambers in order.",
            "marks": 3,
            "answer": "Deoxygenated blood from the body enters the right atrium through the vena cava, passes to the right ventricle, and is pumped through the pulmonary artery to the lungs. Oxygenated blood returns from the lungs through the pulmonary vein into the left atrium, passes to the left ventricle, and is pumped out through the aorta to the body. The four chambers in order are right atrium, right ventricle, left atrium and left ventricle; valves between them prevent backflow."
          },
          {
            "q": "State the laws of refraction of light and define absolute refractive index.",
            "marks": 3,
            "answer": "First law: the incident ray, the refracted ray and the normal at the point of incidence all lie in the same plane. Second law (Snell's law): for a given pair of media, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant, sin i / sin r = n. The absolute refractive index of a medium is the ratio of the speed of light in vacuum to the speed of light in that medium, n = c/v."
          },
          {
            "q": "An electric bulb is rated 220 V and 100 W. Calculate its resistance and the current it draws in normal operation.",
            "marks": 3,
            "answer": "Power P = V²/R, so R = V²/P = (220 × 220)/100 = 484 Ω. Current I = P/V = 100/220 = 0.45 A. The bulb therefore has a resistance of 484 Ω and draws about 0.45 A."
          },
          {
            "q": "What is a food chain? Explain why the number of trophic levels in a food chain is limited to four or five.",
            "marks": 3,
            "answer": "A food chain is the series of organisms through which energy passes as one feeds on another — for example grass → grasshopper → frog → snake. Only about 10% of the energy at one trophic level is transferred to the next, the rest being lost as heat and used in life processes. After four or five levels so little energy remains that it cannot support another population, so food chains are short."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 15,
        "instructions": "Answer all 3 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "(a) What is meant by the reactivity series of metals? (b) Explain, with equations, why zinc can displace copper from copper sulphate solution but copper cannot displace zinc from zinc sulphate solution. (c) Name one metal that does not react with dilute acids.",
            "marks": 5,
            "answer": "(a) The reactivity series is the arrangement of metals in decreasing order of their tendency to lose electrons and form positive ions, the most reactive at the top. (b) Zinc lies above copper in the series, so it is more reactive and displaces copper: Zn + CuSO₄ → ZnSO₄ + Cu, the blue solution fading as reddish-brown copper is deposited. Copper lies below zinc, is less reactive, and therefore cannot displace it, so Cu + ZnSO₄ → no reaction. (c) Copper (or silver or gold) does not react with dilute acids to release hydrogen."
          },
          {
            "q": "(a) Draw a ray diagram showing image formation by a convex lens when the object is placed beyond 2F₁. (b) State the nature, position and size of the image. (c) An object 4 cm high is placed 30 cm from a convex lens of focal length 10 cm. Find the position and height of the image.",
            "marks": 5,
            "answer": "(a) One ray parallel to the principal axis refracts through F₂; a second ray through the optical centre goes straight on; they meet to form the image between F₂ and 2F₂ on the far side. (b) The image is real, inverted and diminished. (c) Using 1/v − 1/u = 1/f with u = −30 cm and f = +10 cm: 1/v = 1/10 + 1/(−30) = (3 − 1)/30 = 2/30, so v = +15 cm — the image is 15 cm from the lens on the opposite side. Magnification m = v/u = 15/(−30) = −0.5, so the image height = −0.5 × 4 = −2 cm: it is 2 cm tall and inverted."
          },
          {
            "q": "(a) State Mendel's law of dominance using his monohybrid cross as an example. (b) A tall pea plant (TT) is crossed with a short one (tt). Give the F₁ and F₂ genotypes and the F₂ phenotypic ratio. (c) Why did Mendel choose the pea plant?",
            "marks": 5,
            "answer": "(a) The law of dominance states that when two contrasting forms of a trait are present together, only one — the dominant one — is expressed, while the recessive form remains hidden. In Mendel's cross of tall with short pea plants, all F₁ plants were tall. (b) F₁ is entirely Tt and all plants are tall. Selfing the F₁ gives F₂ genotypes TT, Tt, Tt and tt, a genotypic ratio of 1 : 2 : 1, and since T is dominant the phenotypic ratio is 3 tall : 1 short. (c) The pea plant has clearly contrasting characters, is self-pollinating so pure lines are easily maintained, can be cross-pollinated by hand, and has a short life cycle producing many seeds — so results appear quickly and in large numbers."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A student tests four household solutions with universal indicator and records: lemon juice pH 2, milk pH 6, water pH 7, soap solution pH 10. (i) Which solution is most acidic and which is most basic? (ii) Which is neutral? (iii) The student's tooth enamel begins to corrode below pH 5.5 — explain why brushing with a toothpaste like the soap solution helps.",
            "marks": 4,
            "answer": "(i) Lemon juice at pH 2 is the most acidic and soap solution at pH 10 the most basic. (ii) Water at pH 7 is neutral. (iii) Bacteria in the mouth produce acids that lower the pH below 5.5, and tooth enamel — calcium phosphate — is corroded by that acid. Toothpastes are mildly basic, so they neutralise the excess acid and raise the pH above the level at which enamel dissolves."
          },
          {
            "q": "CASE STUDY 2 — An electric circuit has a 6 V battery connected to two resistors of 4 Ω and 8 Ω joined in series, with an ammeter connected in series. (i) Find the equivalent resistance. (ii) Find the current recorded by the ammeter. (iii) Find the potential difference across the 8 Ω resistor.",
            "marks": 4,
            "answer": "(i) In series the resistances add: R = 4 + 8 = 12 Ω. (ii) I = V/R = 6/12 = 0.5 A, and since the current is the same everywhere in a series circuit the ammeter reads 0.5 A wherever it is placed. (iii) V = IR = 0.5 × 8 = 4 V across the 8 Ω resistor (the remaining 2 V is across the 4 Ω resistor, and 4 + 2 = 6 V as expected)."
          },
          {
            "q": "CASE STUDY 3 — A pond ecosystem contains algae, small fish that eat the algae, and large fish that eat the small fish. A factory discharges a non-biodegradable pesticide into the pond. (i) Write the food chain and name the producer. (ii) Which organism will have the highest concentration of the pesticide, and what is this phenomenon called? (iii) Suggest one way to reduce this problem.",
            "marks": 4,
            "answer": "(i) The food chain is algae → small fish → large fish, and the algae are the producers because they make their own food by photosynthesis. (ii) The large fish, at the highest trophic level, will carry the highest concentration. Because the pesticide is non-biodegradable it is not broken down or excreted, so it accumulates and becomes more concentrated at each successive level — this is called biological magnification. (iii) Use biodegradable pesticides, or treat factory effluent before discharge, or switch to biological pest control so the harmful chemical never enters the food chain."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is the Class 10 Science exam practical-based?",
        "a": "Yes, 20 marks are for practical assessment, and the remaining 80 marks are for theory."
      },
      {
        "q": "Which topics are most important for the board exam?",
        "a": "Electricity, heredity, photosynthesis, and chemical reactions are frequently asked topics."
      },
      {
        "q": "Can I use a calculator in the exam?",
        "a": "Calculators are generally not allowed; you should be able to perform calculations mentally."
      }
    ]
  },
  {
    "slug": "class-10-social-science",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Social Science Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 10 Social Science paper built to the current board blueprint: 41 questions across six sections for 80 marks in 3 hours, drawing on History, Geography, Political Science and Economics in the proportions the board uses. Sections A to E run from objective to case-based, and Section F covers the map skill, phrased so that you can name each location and then mark it on any outline map of India. Every question is followed by a full model answer.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "Who was the founder of the secret society 'Young Italy'?",
            "marks": 1,
            "answer": "Giuseppe Mazzini. He founded Young Italy in Marseilles in 1831 to work for a unified Italian republic."
          },
          {
            "q": "The Treaty of Constantinople of 1832 recognised the independence of",
            "marks": 1,
            "answer": "Greece. Greek independence from the Ottoman Empire was recognised by this treaty."
          },
          {
            "q": "The Non-Cooperation Movement was withdrawn by Gandhiji after the incident at",
            "marks": 1,
            "answer": "Chauri Chaura, in February 1922, where a crowd set fire to a police station; Gandhiji called off the movement because it had turned violent."
          },
          {
            "q": "The Simon Commission was boycotted in India because",
            "marks": 1,
            "answer": "It had no Indian member. Every one of its members was British, so it was met with the slogan 'Simon Go Back'."
          },
          {
            "q": "Which soil type is most widespread in India and best suited to agriculture?",
            "marks": 1,
            "answer": "Alluvial soil. Deposited by the rivers of the northern plains, it is rich in potash and lime and supports intensive cultivation."
          },
          {
            "q": "Bamboo, in the Indian context, is classified as",
            "marks": 1,
            "answer": "A grass, not a tree — although it is widely used as timber and is an important minor forest produce."
          },
          {
            "q": "Which of these is a rabi crop: rice, wheat, or cotton?",
            "marks": 1,
            "answer": "Wheat. Rabi crops are sown in winter, around October to December, and harvested in summer."
          },
          {
            "q": "The Bhakra Nangal project is built on which river?",
            "marks": 1,
            "answer": "The Sutlej. It serves both irrigation and hydroelectric generation."
          },
          {
            "q": "Which mineral is the 'backbone of industry' and is found in Kudremukh?",
            "marks": 1,
            "answer": "Iron ore. The Kudremukh mines in Karnataka hold one of the largest deposits in the world."
          },
          {
            "q": "Power resources such as coal, petroleum and natural gas are called",
            "marks": 1,
            "answer": "Conventional and non-renewable sources of energy — they were formed over geological time and cannot be replenished on a human timescale."
          },
          {
            "q": "A federal government means",
            "marks": 1,
            "answer": "Power is divided between a central authority and various constituent units, each with its own jurisdiction, and the division is written into the constitution."
          },
          {
            "q": "Which is the third tier of government in India?",
            "marks": 1,
            "answer": "Local self-government — panchayats in rural areas and municipalities in urban ones, given constitutional status by the 73rd and 74th amendments in 1992."
          },
          {
            "q": "The Belgian model of power sharing is often described as",
            "marks": 1,
            "answer": "Community government — an arrangement in which a separate government is elected by people belonging to one language community, holding power over cultural, educational and language matters."
          },
          {
            "q": "A political party that seeks to control power through constitutional means is characterised by which three components?",
            "marks": 1,
            "answer": "Leaders, active members and followers. A party also needs a recognised set of policies and programmes to pursue in the collective good."
          },
          {
            "q": "The tertiary sector is also known as the",
            "marks": 1,
            "answer": "Service sector. It does not produce goods but supports the primary and secondary sectors — transport, banking, trade, communication, education and health."
          },
          {
            "q": "Which sector employs the largest share of India's workforce?",
            "marks": 1,
            "answer": "The primary sector, chiefly agriculture, even though it contributes a much smaller share of GDP — an imbalance that gives rise to widespread underemployment."
          },
          {
            "q": "The main function of the Reserve Bank of India in the credit system is to",
            "marks": 1,
            "answer": "Supervise the functioning of formal sources of loans — it monitors bank lending, sets the terms on which credit is given, and requires banks to report on their lending to different sectors."
          },
          {
            "q": "Globalisation has been mainly driven by",
            "marks": 1,
            "answer": "Multinational corporations, along with rapid improvements in transport and information technology and the removal of trade barriers."
          },
          {
            "q": "Assertion (A): Democracies are better at accommodating social diversity. Reason (R): Democracy involves competition among various political parties.",
            "marks": 1,
            "answer": "(b) Both are true but R does not explain A. Democracies accommodate diversity through power sharing and respect for minority rights; party competition alone can as easily sharpen divisions as reconcile them."
          },
          {
            "q": "Assertion (A): Consumers have the right to be informed about the goods they buy. Reason (R): The Consumer Protection Act 1986 provides for consumer rights.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. The right to information — details of price, quantity, ingredients and expiry — is one of the rights that COPRA gives statutory force to."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 8,
        "instructions": "Answer all 4 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "What was the Zollverein? State one of its effects.",
            "marks": 2,
            "answer": "The Zollverein was a customs union formed in 1834 under Prussian leadership, which abolished tariff barriers between most German states and reduced the number of currencies. It bound the states into a single economic zone, and that economic unity became a powerful force behind political unification."
          },
          {
            "q": "Distinguish between subsistence farming and commercial farming.",
            "marks": 2,
            "answer": "Subsistence farming is practised on small holdings with simple tools and family labour, and the produce is grown mainly to feed the farmer's own household. Commercial farming uses modern inputs — high-yielding seeds, fertilisers, irrigation and machinery — on larger holdings, and the produce is grown for sale in the market."
          },
          {
            "q": "What is meant by 'majoritarianism'? Give one example.",
            "marks": 2,
            "answer": "Majoritarianism is the belief that the majority community should be able to rule a country as it wishes, disregarding the wishes of minorities. In Sri Lanka the Sinhala-speaking majority adopted measures such as making Sinhala the sole official language and giving Buddhism state preference, which alienated the Sri Lankan Tamils."
          },
          {
            "q": "Why are banks required to keep only a small proportion of deposits as cash?",
            "marks": 2,
            "answer": "Because on any given day only a small fraction of depositors come to withdraw money, and their withdrawals are largely offset by fresh deposits. Banks therefore keep about 15 per cent as cash to meet demand and lend out the rest, which is how they earn income and how credit is created in the economy."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 15,
        "instructions": "Answer all 5 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Explain any three causes of the growth of nationalism in Europe after 1815.",
            "marks": 3,
            "answer": "First, the ideas of liberalism spread by the French Revolution — equality before the law, the end of privilege, and government by consent — gave people a common political identity beyond the local one. Second, the conservative order imposed at Vienna in 1815, which restored monarchies and censored the press, provoked secret revolutionary societies such as Young Italy that were explicitly national in aim. Third, economic change bound regions together: customs unions like the Zollverein, and later railways, created a single market and made the nation a practical unit as well as an idea."
          },
          {
            "q": "Describe any three features of the Civil Disobedience Movement.",
            "marks": 3,
            "answer": "It began with Gandhiji's Dandi March in March 1930, when he broke the salt law by making salt from seawater — salt was chosen because it was consumed by rich and poor alike and its taxation was resented by all. Unlike Non-Cooperation, it asked people not merely to refuse cooperation but to break colonial laws: to boycott foreign cloth, refuse taxes, and picket liquor shops. Its participation was very wide — rich peasants such as the Patidars, poorer tenants, business classes seeking protection against imports, and above all large numbers of women who came out to protest for the first time — although the Depressed Classes largely stayed away."
          },
          {
            "q": "Why is conservation of resources essential? Suggest any two ways of conserving mineral resources.",
            "marks": 3,
            "answer": "Minerals form over millions of years and are finite, while the rate of extraction is rapid, so unchecked use will exhaust the reserves and leave nothing for future generations; extraction also damages land, forests and water. Two ways to conserve them are recycling scrap metal so that the same material is used repeatedly instead of mining fresh ore, and using substitutes and improved technologies that lower waste during mining and processing — for example using fibre optics in place of copper wire."
          },
          {
            "q": "Explain any three merits of democracy.",
            "marks": 3,
            "answer": "A democracy is accountable: rulers must face the people at regular elections, so they have to explain their decisions and can be removed. It is better at handling differences and conflicts, because it provides a peaceful and institutional way of negotiating between groups rather than suppressing them. And it enhances the dignity of the citizen: every adult has one vote of equal value, which gives even the poorest a political weight equal to the richest, and this legitimacy makes democratic decisions more acceptable."
          },
          {
            "q": "What is the informal sector of credit? Why do poor households remain dependent on it?",
            "marks": 3,
            "answer": "The informal sector of credit consists of moneylenders, traders, employers, relatives and friends, whose lending is supervised by no organisation and who charge whatever rate they choose — often very high. Poor households remain dependent on it because banks demand collateral and documentation that the poor rarely possess, and the paperwork is difficult for those without literacy or formal employment records. The consequence is a debt trap: a large part of what they earn goes to repaying interest, so borrowing that was meant to help ends up deepening poverty."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 20,
        "instructions": "Answer all 4 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "Describe the process of unification of Germany between 1848 and 1871.",
            "marks": 5,
            "answer": "The liberal middle classes attempted unification in 1848 through the Frankfurt Parliament, which offered the crown of a united Germany to the Prussian king; he refused it, the assembly was dissolved, and the liberal initiative failed. Leadership then passed to Prussia and to its chief minister Otto von Bismarck, who pursued unification through the state, its army and its bureaucracy — the policy of 'blood and iron'. Over seven years Prussia fought three wars: against Denmark in 1864, against Austria in 1866, which removed Austria from German affairs, and against France in 1870–71. Each victory drew the German states closer around Prussia. In January 1871 the Prussian king William I was proclaimed German Emperor in the Hall of Mirrors at Versailles. The new empire placed strong emphasis on modernising the currency, banking, legal and judicial systems, but it was unified from above by a conservative monarchy rather than by the liberal revolution of 1848."
          },
          {
            "q": "What is meant by sustainable development? Explain any four ways in which water resources can be conserved and managed in India.",
            "marks": 5,
            "answer": "Sustainable development means development that meets the needs of the present without compromising the ability of future generations to meet their own needs — using resources so that they remain available. Water can be conserved in several ways. Rainwater harvesting collects and stores rain from rooftops and open areas so that it recharges groundwater instead of running off; in Rajasthan underground tankas store rooftop rainwater for drinking. Multi-purpose river projects and dams store water for irrigation, generate electricity and control floods, though they must be planned carefully because they displace people and disturb aquatic life. Watershed development treats a whole drainage area — building check dams, contour bunds and planting vegetation — so that runoff slows and infiltrates. Finally, efficient irrigation such as drip and sprinkler systems delivers water directly to the roots and greatly reduces the losses of flood irrigation, and treating and recycling industrial and domestic wastewater reduces the demand for fresh water."
          },
          {
            "q": "'Democracy is better than any other form of government.' Evaluate this statement with reference to its outcomes on economic growth, inequality and dignity.",
            "marks": 5,
            "answer": "On economic growth the record is mixed: within poor countries dictatorships have sometimes posted marginally higher growth rates than democracies, so democracy cannot be defended on growth alone. When the difference is small, the other advantages of democracy make it the preferable choice. On economic inequality democracies have a poor record — most sustain great disparities of income, and the poor, though equal at the ballot box, remain unequal in wealth; democracies have not been able to reduce this as much as was hoped. Where democracy clearly outperforms every alternative is in accommodating social diversity and in upholding dignity. It provides institutional channels for negotiating differences, so conflicts are resolved rather than suppressed, and it grants every citizen an equal vote, which makes the citizen the source of authority rather than the subject of it. Democracy also permits the correction of its own mistakes: bad decisions can be exposed by a free press and reversed at the next election, which no closed system allows. Judged as a whole, therefore, it is better than the alternatives even where its economic record disappoints."
          },
          {
            "q": "What is globalisation? Explain any four factors that have enabled globalisation, and state one positive and one negative effect on India.",
            "marks": 5,
            "answer": "Globalisation is the rapid integration of the economies of different countries through the freer movement of goods, services, investment, technology and, to a lesser extent, people. Four factors have enabled it. Rapid improvement in transport technology, especially containerisation, has cut the cost and time of shipping goods over long distances. Advances in information and communication technology — telephones, the internet and satellite communication — allow services to be delivered instantly across continents. The liberalisation of trade and investment policies, in India from 1991, removed the barriers and licensing that had restricted imports and foreign investment. And multinational corporations, seeking cheap labour and new markets, have set up production across many countries and linked them into single supply chains. In India the positive effect has been greater choice and quality for consumers, new employment in services such as IT and BPO, and higher standards among firms that met foreign competition. The negative effect has been the pressure on small domestic producers — many small manufacturing units in toys, tyres and dairy could not match imported prices and shut down, costing jobs — while the gains have not been shared evenly between the skilled and the unskilled."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — In 1885 the Indian National Congress was founded; by 1920 it had become a mass movement under Gandhiji, drawing in peasants, workers, students and women who had earlier stood outside politics. (i) Name the movement that first made the Congress a mass organisation. (ii) State any two reasons why people joined it. (iii) Why did Gandhiji regard the charkha as important?",
            "marks": 4,
            "answer": "(i) The Non-Cooperation Movement, launched in 1920. (ii) People joined for varied reasons: the towns saw students leave government schools and lawyers give up practice as a matter of national honour, while in the countryside peasants joined to protest against high rents and begar, understanding swaraj as an end to their own oppression; the Khilafat issue also brought large numbers of Muslims into a common cause. (iii) The charkha stood for self-reliance and the dignity of labour. Khadi could be made in every home, which gave the poor work and kept money in the village instead of sending it to Manchester's mills, so it turned an economic boycott into an act every Indian could perform daily."
          },
          {
            "q": "CASE STUDY 2 — India's total geographical area is about 3.28 million sq km. Of this, roughly 43 per cent is plains, 30 per cent mountains and 27 per cent plateaus. Land is put to different uses, and the pattern is determined by both physical and human factors. (i) Name any two physical factors determining land use. (ii) Name any two human factors. (iii) Why is the net sown area declining in some states?",
            "marks": 4,
            "answer": "(i) Topography, climate, soil type and the availability of minerals are the physical factors — level, fertile, well-watered plains support cultivation, while steep or arid land does not. (ii) Population density, technology, capital and human skill are the human factors that decide how the available land is actually used. (iii) The net sown area is falling in several states because farmland is being converted to non-agricultural uses — housing, roads, industry and urban expansion as cities grow — and because land degradation from overgrazing, waterlogging and salinity has made some areas unfit for cultivation."
          },
          {
            "q": "CASE STUDY 3 — In a village, a small farmer borrows ₹5,000 from a moneylender at 5 per cent interest per month to buy seed, promising to repay after the harvest. The crop fails. (i) Calculate the annual rate of interest. (ii) What is likely to happen to the farmer? (iii) Name this situation. (iv) Suggest one measure that would help.",
            "marks": 4,
            "answer": "(i) At 5 per cent a month the simple annual rate is 5 × 12 = 60 per cent. (ii) With the crop failed, the farmer has no income to repay and must borrow again to pay the interest, so the debt grows; he may have to sell land or cattle, or work for the lender to clear it. (iii) This is a debt trap, in which borrowing leaves the borrower worse off than before. (iv) Expanding formal credit through cooperative societies and self-help groups would help, because these lend at far lower rates and without collateral; SHGs in particular allow poor women to pool savings and borrow from the group itself, and their record of repayment is good enough for banks to lend to them."
          }
        ]
      },
      {
        "name": "Section F — Map skill (5 marks)",
        "marks": 5,
        "instructions": "Answer all 5 questions. Each carries 1 mark. Take any outline map of India and mark each place you name — the answers below give the location so you can check your marking.",
        "questions": [
          {
            "q": "Name the place in Gujarat where Gandhiji broke the salt law in 1930, and the district it lies in.",
            "marks": 1,
            "answer": "Dandi, on the coast of Navsari district in southern Gujarat. Gandhiji reached it on 6 April 1930 after marching about 240 km from Sabarmati."
          },
          {
            "q": "Name the city in Uttar Pradesh where the Indian National Congress and the Muslim League held their joint sessions in 1916 and signed a pact.",
            "marks": 1,
            "answer": "Lucknow, on the river Gomti in central Uttar Pradesh. The Lucknow Pact of 1916 brought the Congress and the Muslim League together on a common demand for self-government."
          },
          {
            "q": "Name the state in which the Bhakra Nangal dam is situated and the river it impounds.",
            "marks": 1,
            "answer": "The dam is on the river Sutlej at Bhakra in Bilaspur district, Himachal Pradesh, with the Nangal barrage just downstream in Punjab."
          },
          {
            "q": "Name the iron-ore mining area of Karnataka that lies in the Western Ghats.",
            "marks": 1,
            "answer": "Kudremukh, in Chikkamagaluru district of Karnataka, in the Western Ghats — one of the largest iron-ore deposits in the world."
          },
          {
            "q": "Name the major software technology park located in Karnataka.",
            "marks": 1,
            "answer": "Bengaluru, in south-eastern Karnataka on the Deccan plateau, the largest of India's software technology parks."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 10 Social Science?",
        "a": "History, Geography, Political Science (Civics), and Economics are all integrated in the syllabus."
      },
      {
        "q": "How should I prepare for the map-based questions?",
        "a": "Practice drawing maps of India showing states, capitals, important cities, and geographical features regularly."
      },
      {
        "q": "Are there questions on current affairs?",
        "a": "Yes, questions based on recent national and international events are often included in the exam."
      }
    ]
  },
  {
    "slug": "class-10-english",
    "classLevel": "Class 10",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 10 English Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 10 English (Language and Literature) paper built to the board's own pattern: 80 marks in 3 hours, split as 20 marks of reading, 20 of writing and grammar, and 40 of literature. Both reading passages are printed in full on this page, so every comprehension question can actually be answered from what is in front of you. The literature section refers to the prescribed texts First Flight and Footprints Without Feet and asks for your own words rather than reproduced extracts. Every question is followed by a full model answer, and the longer answers explain what a full-credit response needs to contain.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Reading: Passage I (10 marks)",
        "marks": 10,
        "passage": "Every year, a little before the first rains, the swifts return to the old post office in our town. They come without announcement. One evening the sky above the tiled roof is empty, and the next it is full of thin black crescents cutting the air at a speed that makes the eye give up following them. The birds have flown from somewhere beyond the mountains, and they will leave again in September, and nobody in the town can say precisely where they go.\n\nWhat is remarkable about a swift is not its speed, though it is among the fastest of birds in level flight. It is that a swift barely lands. It feeds in the air, taking insects on the wing. It drinks by skimming the surface of a tank. It gathers the material for its nest — a floating feather, a wisp of straw lifted by the wind — without once settling. Young swifts, after leaving the nest, are believed to remain airborne for two years or more before they touch anything at all, sleeping as they fly, half the brain resting while the other half keeps watch.\n\nOur postmaster, who retired long ago but still comes to sit on the steps, says the birds have used the same eaves since he joined service in 1971. He is not sentimental about them. He notes their arrival in a small diary, the way he once recorded registered letters, and he is annoyed when they are late. Last year they came eleven days after their usual date, and he took this personally, as though the birds had failed in a duty.\n\nThe building itself is due to be demolished. A new office of glass and aluminium will stand in its place, and it will be a better office in every measurable way: brighter, cooler, with a counter that does not flood in July. The plans do not mention the eaves. It has not occurred to anyone that they should. And so a journey of some thousands of kilometres, repeated faithfully for fifty years and probably far longer, will end not in a storm or a predator but in a decision taken in a room where nobody has ever looked up.",
        "instructions": "Read the passage given above and answer the questions that follow. Each question carries the marks shown against it.",
        "questions": [
          {
            "q": "Why does the writer say the swifts 'come without announcement'? (1 mark)",
            "marks": 1,
            "answer": "Because their arrival is sudden and unheralded — one evening the sky above the roof is empty and the next it is full of birds, with nothing to signal the change in advance."
          },
          {
            "q": "State any two ways in which a swift carries out ordinary activities without landing. (2 marks)",
            "marks": 2,
            "answer": "It feeds in the air, catching insects on the wing, and it drinks by skimming the surface of a tank as it flies. It also collects nesting material — a floating feather or a wisp of straw — without ever settling."
          },
          {
            "q": "What does the passage say about young swifts and sleep? (2 marks)",
            "marks": 2,
            "answer": "Young swifts are believed to stay airborne for two years or more after leaving the nest, without touching anything at all. They sleep while flying, resting one half of the brain at a time while the other half stays awake and keeps watch."
          },
          {
            "q": "How does the postmaster's attitude to the birds differ from what one might expect? (2 marks)",
            "marks": 2,
            "answer": "One might expect an old man watching birds to be sentimental, but he is not. He treats their arrival as an administrative matter, noting the date in a diary exactly as he once recorded registered letters, and he is genuinely annoyed when they are late — as though the birds had neglected an official duty."
          },
          {
            "q": "Why does the writer call the new building 'better in every measurable way'? What is implied by the word 'measurable'? (2 marks)",
            "marks": 2,
            "answer": "The new office will be brighter, cooler and free of the flooding that troubles the old one in July, so on every count that can be counted it is an improvement. The word 'measurable' implies that what will be lost cannot be measured — the nesting site, and the fifty-year migration that depends on it, do not appear on any plan and so carry no weight in the decision."
          },
          {
            "q": "Explain the closing sentence: the journey 'will end not in a storm or a predator but in a decision taken in a room where nobody has ever looked up.' (1 mark)",
            "marks": 1,
            "answer": "It means the swifts will be defeated not by any natural danger they are equipped to survive, but by human carelessness — by planners who never noticed the birds at all, so that the loss is not even intended."
          }
        ]
      },
      {
        "name": "Section A — Reading: Passage II (10 marks)",
        "marks": 10,
        "passage": "In 1854, a physician named John Snow walked the streets of Soho in London with a notebook, and in doing so changed what it means to know something in medicine. Cholera had broken out, and within ten days more than five hundred people in a few streets were dead. The accepted explanation was miasma — bad air rising from filth — and it was accepted by nearly everyone with authority to have an opinion.\n\nSnow doubted it, but doubting was not enough. What he did instead was to mark on a map of the district every death he could confirm, one stroke of the pen for each. The strokes did not spread evenly, as bad air drifting over a neighbourhood would. They clustered. At the centre of the cluster stood a public water pump on Broad Street.\n\nHe then went looking for the cases that did not fit, because those are the ones that decide the matter. A workhouse of several hundred inmates stood inside the affected area and had almost no deaths; it had its own well. A brewery nearby lost nobody; its workers drank beer. Two deaths occurred far away in Hampstead, which should have been impossible — until Snow found that the widow who died there had a cart bring her water from Broad Street because she preferred its taste, and that her visiting niece had drunk a glass.\n\nSnow persuaded the parish to remove the handle of the pump. The outbreak was already declining, and honest historians note that the removal probably saved fewer lives than the story suggests. That is not the point. The point is that a man who could not see a bacterium — the organism would not be identified for another thirty years — established how a disease travelled, by collecting ordinary facts, arranging them so that a pattern could show itself, and taking the awkward cases seriously instead of explaining them away.",
        "instructions": "Read the passage given above and answer the questions that follow. Each question carries the marks shown against it.",
        "questions": [
          {
            "q": "What was the accepted explanation of cholera in 1854? (1 mark)",
            "marks": 1,
            "answer": "The accepted explanation was miasma — the belief that the disease was carried by bad air rising from filth — and it was held by nearly everyone in authority."
          },
          {
            "q": "How did Snow's map reveal that the miasma theory was wrong? (2 marks)",
            "marks": 2,
            "answer": "He marked every confirmed death on a map of the district. Bad air drifting over a neighbourhood would have produced deaths spread more or less evenly, but the marks clustered tightly instead, and the centre of that cluster was a single public water pump on Broad Street."
          },
          {
            "q": "Why did Snow deliberately look for cases that did not fit his idea? (2 marks)",
            "marks": 2,
            "answer": "Because the exceptions are what settle a question. A pattern can be a coincidence, but if the apparent exceptions turn out on investigation to obey the same rule, the explanation is confirmed; if they do not, it is refuted. Snow therefore treated the awkward cases as the real test of his theory rather than as nuisances."
          },
          {
            "q": "Explain how the workhouse and the brewery supported Snow's conclusion. (2 marks)",
            "marks": 2,
            "answer": "Both stood in the affected area and so should have suffered heavily under the miasma theory, yet the workhouse of several hundred inmates had almost no deaths and the brewery lost nobody. The workhouse had its own well and the brewery's workers drank beer, so neither group took water from the Broad Street pump — which is exactly what Snow's explanation predicted."
          },
          {
            "q": "How were the two deaths in distant Hampstead explained? (2 marks)",
            "marks": 2,
            "answer": "They appeared impossible until Snow discovered that the widow who died there had water brought to her by cart from the Broad Street pump because she preferred its taste, and that her niece, who was visiting, had drunk a glass of it. The apparent exception thus turned into the strongest confirmation of his case."
          },
          {
            "q": "What, according to the writer, is the real significance of Snow's work? (1 mark)",
            "marks": 1,
            "answer": "That he established how a disease travelled without being able to see the organism responsible — by gathering ordinary facts, arranging them so a pattern could emerge, and taking the inconvenient cases seriously rather than explaining them away."
          }
        ]
      },
      {
        "name": "Section B — Writing and Grammar (20 marks)",
        "marks": 20,
        "instructions": "Answer all questions. Marks are shown against each question.",
        "questions": [
          {
            "q": "You are Rohan/Rohini Sharma of 14, Nehru Road, Pune. Write a letter to the Editor of a national daily drawing attention to the loss of nesting sites for birds when old buildings in your city are demolished, and suggesting what builders could do. (5 marks)",
            "marks": 5,
            "answer": "A full-credit answer follows the formal letter format: sender's address and date at the top left, then the receiver's designation and address (The Editor, name of the newspaper, city), the subject line, the salutation 'Sir/Madam', three short paragraphs, and the complimentary close 'Yours truly' with the sender's name. The first paragraph states the purpose — to draw attention through the columns of the paper to the loss of nesting sites as old buildings are pulled down. The second gives the substance: swifts, sparrows and swallows nest in eaves, ledges and ventilators that modern glass and aluminium façades do not provide; the birds return to the same site for decades and cannot simply move; and their disappearance is followed by a rise in insect populations. The third suggests remedies: requiring builders to include nesting bricks or ledges in new façades, surveying a building for nests before demolition, and timing demolition outside the breeding season. The register stays formal throughout, with no contractions and no slang."
          },
          {
            "q": "Write a short analytical paragraph in about 120 words on the topic: 'Data is useless until someone arranges it.' Use the example of John Snow from Passage II. (5 marks)",
            "marks": 5,
            "answer": "A strong answer makes a single claim and supports it. For example: The facts of the 1854 outbreak were available to everyone in Soho — the deaths, the addresses, the pump. What nobody had done was arrange them. John Snow's contribution was not the collection of new information but the imposition of order on information already lying about: by marking each death on a map he turned a list into a shape, and the shape pointed at a single water pump. Miasma could not explain a cluster; it predicted a smear. The lesson holds well beyond medicine. Raw numbers assert nothing on their own, and the work of understanding is largely the work of arrangement — of finding the form in which the data can finally speak. (Approximately 120 words, with a clear claim, an example and a general conclusion.)"
          },
          {
            "q": "Fill in the blanks with the correct form of the verb: (i) By the time we reached the station, the train ______ (leave). (ii) She ______ (work) in this school since 2019. (iii) If it ______ (rain) tomorrow, we shall cancel the match. (3 marks)",
            "marks": 3,
            "answer": "(i) had left — the past perfect is needed because the departure was completed before the past action of reaching. (ii) has been working — the present perfect continuous, since the action began in 2019 and continues now. (iii) rains — in a first conditional the 'if' clause takes the simple present even though the meaning is future."
          },
          {
            "q": "Report the following: (i) The teacher said to the students, 'Do not waste your time.' (ii) He said, 'I am reading a novel.' (2 marks)",
            "marks": 2,
            "answer": "(i) The teacher advised/told the students not to waste their time. The imperative becomes an infinitive with 'not', the reporting verb changes to 'advised' or 'told', and 'your' becomes 'their'. (ii) He said that he was reading a novel. The present continuous shifts back to the past continuous and the pronoun 'I' becomes 'he'."
          },
          {
            "q": "Rearrange the following words to form meaningful sentences: (i) birds / the / return / same / to / eaves / every / year (ii) evidence / arranged / until / it / is / silent / is (2 marks)",
            "marks": 2,
            "answer": "(i) The birds return to the same eaves every year. (ii) Evidence is silent until it is arranged."
          },
          {
            "q": "Identify and correct the error in each sentence: (i) Neither of the two boys were present. (ii) He is senior than me. (iii) The news are disturbing. (3 marks)",
            "marks": 3,
            "answer": "(i) 'were' should be 'was' — 'neither' is singular and takes a singular verb. (ii) 'than' should be 'to' — adjectives of Latin origin such as senior, junior, superior and inferior take 'to', giving 'He is senior to me.' (iii) 'are' should be 'is' — 'news' is an uncountable noun that is singular despite its final s."
          }
        ]
      },
      {
        "name": "Section C — Literature (40 marks)",
        "marks": 40,
        "instructions": "Answer all questions with reference to the prescribed textbooks First Flight and Footprints Without Feet. Marks are shown against each question. Answer in your own words; do not copy from the text.",
        "questions": [
          {
            "q": "In 'A Letter to God', why does Lencho write to God, and what does his reaction to the reply reveal about him? (4 marks)",
            "marks": 4,
            "answer": "Lencho writes because the hailstorm has destroyed his entire field of ripe corn, leaving his family with nothing to eat until the next harvest, and he has an unshakeable faith that God will help him if he asks. He requests a hundred pesos to sow again and to live on until the crop comes. When he receives only seventy — the postmaster having made up what he could from his own salary and his employees' — Lencho is not surprised that God has answered, only annoyed at the shortfall, and he concludes that the post office employees must have stolen the rest, calling them 'a bunch of crooks'. This reveals both the completeness of his faith, which never for a moment doubts the source of the money, and its narrowness: he cannot imagine human kindness, and so repays a genuine act of it with suspicion."
          },
          {
            "q": "How does Nelson Mandela describe the cost of apartheid to those who imposed it, in 'Long Walk to Freedom'? (4 marks)",
            "marks": 4,
            "answer": "Mandela argues that oppression damages the oppressor as surely as the oppressed. A man who takes away another's freedom, he says, is a prisoner of hatred, locked behind the bars of prejudice and narrow-mindedness, and is therefore not free himself. He observes that the policy of apartheid produced in his country a deeper wound than any war, but it also created a generation of men of extraordinary courage on both sides. He insists that no one is born hating another because of the colour of his skin — people must learn to hate, and if they can learn it, they can be taught love, which comes more naturally to the human heart. His conclusion is that the oppressor must be liberated just as surely as the oppressed."
          },
          {
            "q": "What is the central contrast in Robert Frost's 'Dust of Snow', and how does the poem's structure reinforce it? (4 marks)",
            "marks": 4,
            "answer": "The contrast is between the poet's initial mood of despondency and the change worked in him by a trivial natural accident: a crow shakes down a light fall of snow from a hemlock tree onto him. Both the crow and the hemlock are conventionally associated with gloom and even with poison, so the agents of the change are themselves images of darkness — which is the point. The structure reinforces it: the poem is a single sentence spread over two short stanzas, the first describing the action and the second its effect, and the sense runs on across the stanza break without a pause. Because the reader cannot stop until the end, the small event and its consequence are bound together, and the reversal — a saved part of a day he had rued — arrives with the quiet suddenness of the snow itself."
          },
          {
            "q": "In 'The Ball Poem', what does the poet mean by 'the epistemology of loss'? Why does he not offer the boy money for another ball? (4 marks)",
            "marks": 4,
            "answer": "The phrase means the knowledge or understanding of loss — the boy is not merely losing a ball but learning, for the first time, what it is to lose something and to know that it will not come back. The poet deliberately refuses to intrude with money or comfort, because a new ball would teach nothing. Loss is a lesson every human being must learn, and it can only be learned by being felt; to buy the boy out of the experience would rob him of the understanding that the experience alone can give. The poet therefore stands aside and lets the boy learn 'how to stand up', because the world is full of possessions and every one of them will one day be lost."
          },
          {
            "q": "Compare the attitudes of the narrator and Dr Herriot's patient's owner in 'A Triumph of Surgery', and state what the story satirises. (4 marks)",
            "marks": 4,
            "answer": "Mrs Pumphrey adores her dog Tricki to the point of harming him, ignoring the vet's instructions and feeding him cream cakes, chocolates and malt between meals until he becomes grossly overweight and listless. Dr Herriot, the narrator, is professionally detached and clear-eyed: he sees at once that the dog needs no medicine but simply less food and more exercise, and he takes Tricki into the surgery where a diet of plain food and free running with the other dogs restores him within a fortnight. The story satirises misplaced indulgence — the wealthy owner's sentimentality is a form of self-gratification rather than care — and it gently mocks her willingness to credit a 'triumph of surgery' when in fact nothing was done except to stop overfeeding the animal."
          },
          {
            "q": "In 'The Midnight Visitor', how does Ausable differ from the conventional secret agent, and how does he defeat Max? (4 marks)",
            "marks": 4,
            "answer": "Ausable is the opposite of the romantic image of a spy: he is very fat, he speaks with a slight American accent overlaid by French, and his room is a small, unromantic one at the top of a gloomy French hotel — Fowler, the young writer, is openly disappointed by him. He defeats Max not by force but by presence of mind. Finding Max in the room with a pistol, he invents a balcony beneath his window, complains that intruders have used it twice, and mentions that he is expecting the police. When a knock comes at the door — in fact the waiter he had ordered a drink from — Max panics, climbs out of the window onto the balcony that does not exist, and falls. The story's point is that intelligence and nerve are the real weapons of the trade."
          },
          {
            "q": "Discuss the theme of courage in 'Footprints Without Feet' or in any one prose lesson you have studied, in about 100–120 words. (8 marks)",
            "marks": 8,
            "answer": "A full-credit answer states a clear thesis, supports it with at least two specific incidents from the chosen text, and closes with an evaluation. Taking 'Footprints Without Feet': Griffin's story shows that ability without moral restraint is not courage but recklessness. He is a brilliant scientist who discovers how to make himself invisible, yet every use he puts the discovery to is an act of cowardice — he sets fire to his landlord's house to escape a debt, he steals from a shop and a clergyman's desk, and he attacks Mrs Hall's household when he is questioned. Real courage would have meant facing the consequences of his experiments openly and publishing his work. Instead invisibility allows him to act without being answerable, and the story suggests that it is accountability, not power, that makes a person behave well. The lesson is that a discovery is neither good nor bad in itself; what matters is the character of the person who holds it."
          },
          {
            "q": "'The value of a poem often lies in what it leaves unsaid.' Discuss with reference to any one poem from First Flight, in about 100–120 words. (8 marks)",
            "marks": 8,
            "answer": "A full-credit answer argues the proposition rather than merely summarising a poem. Taking Frost's 'Fire and Ice': the poem is nine lines long and names two ways the world might end, aligning fire with desire and ice with hate. What it does not do is explain, argue or moralise. It never says that desire consumes a person or that hatred freezes relationships — the reader supplies that, and supplies it more forcefully than any statement could. The understatement of the last line, that ice 'would suffice', is deliberately flat where the subject is annihilation, and the gap between the enormity of the subject and the mildness of the word is where the poem's force lives. Had Frost spelled out his meaning, the poem would have become an opinion; by leaving it unsaid, he makes the reader complete it, and what a reader completes is what a reader believes."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the weightage of different sections in the English exam?",
        "a": "Reading (20), Writing (20), Grammar (15), and Literature (25) are the main sections."
      },
      {
        "q": "Are there internal choices in the English exam?",
        "a": "Yes, students can choose to answer either writing or literary texts as per preference in some sections."
      },
      {
        "q": "How can I improve my writing skills?",
        "a": "Regular reading, practicing letter writing, and analyzing model answers helps improve writing skills."
      }
    ]
  },
  {
    "slug": "class-9-maths",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 9 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 9 Mathematics paper built to the board's own pattern: 38 questions across five sections for 80 marks in 3 hours, covering number systems, polynomials, coordinate geometry, linear equations, geometry, mensuration, statistics and probability. Section A is objective and Section E is case-based. Every question is followed by a fully worked solution showing each step, so you can check your method as well as your answer.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "Every rational number is",
            "marks": 1,
            "answer": "A real number. Rational numbers form a subset of the reals, but not every real number is rational — √2, for instance, is not."
          },
          {
            "q": "The decimal expansion of an irrational number is",
            "marks": 1,
            "answer": "Non-terminating and non-recurring. A terminating or recurring expansion always represents a rational number."
          },
          {
            "q": "The value of (√5 + √2)(√5 − √2) is",
            "marks": 1,
            "answer": "3. Using (a + b)(a − b) = a² − b², the product is 5 − 2 = 3."
          },
          {
            "q": "The degree of the polynomial 4x³ − 7x² + 2x − 9 is",
            "marks": 1,
            "answer": "3 — the highest power of the variable appearing in the polynomial."
          },
          {
            "q": "If p(x) = x² − 3x + 2, then p(1) equals",
            "marks": 1,
            "answer": "0. p(1) = 1 − 3 + 2 = 0, so x = 1 is a zero of the polynomial."
          },
          {
            "q": "The point (−3, 5) lies in which quadrant?",
            "marks": 1,
            "answer": "The second quadrant, where x is negative and y is positive."
          },
          {
            "q": "The point (0, −4) lies on",
            "marks": 1,
            "answer": "The y-axis, 4 units below the origin. Any point with x = 0 lies on the y-axis."
          },
          {
            "q": "The equation of a line parallel to the x-axis at a distance 3 units above it is",
            "marks": 1,
            "answer": "y = 3. Every point on such a line has the same y-coordinate."
          },
          {
            "q": "In the linear equation 2x + 3y = 12, if x = 3 then y equals",
            "marks": 1,
            "answer": "2. Substituting, 6 + 3y = 12, so 3y = 6 and y = 2."
          },
          {
            "q": "Two angles of a triangle measure 45° and 65°. The third angle is",
            "marks": 1,
            "answer": "70°. The angles of a triangle sum to 180°, so the third is 180 − 110 = 70°."
          },
          {
            "q": "In a parallelogram, the diagonals",
            "marks": 1,
            "answer": "Bisect each other. They are not necessarily equal or perpendicular — those hold for rectangles and rhombuses respectively."
          },
          {
            "q": "The sum of the interior angles of a quadrilateral is",
            "marks": 1,
            "answer": "360°. A quadrilateral splits into two triangles, each contributing 180°."
          },
          {
            "q": "Two triangles are congruent by the SSS rule when",
            "marks": 1,
            "answer": "All three sides of one triangle are equal to the corresponding three sides of the other."
          },
          {
            "q": "The area of a triangle with base 10 cm and height 6 cm is",
            "marks": 1,
            "answer": "30 cm². Area = ½ × base × height = ½ × 10 × 6 = 30 cm²."
          },
          {
            "q": "The volume of a cube of edge 4 cm is",
            "marks": 1,
            "answer": "64 cm³. Volume = a³ = 4³ = 64 cm³."
          },
          {
            "q": "The curved surface area of a cylinder of radius 7 cm and height 10 cm is (use π = 22/7)",
            "marks": 1,
            "answer": "440 cm². CSA = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm²."
          },
          {
            "q": "The mean of the first five natural numbers is",
            "marks": 1,
            "answer": "3. Their sum is 1 + 2 + 3 + 4 + 5 = 15, and 15 ÷ 5 = 3."
          },
          {
            "q": "A coin is tossed once. The probability of getting a tail is",
            "marks": 1,
            "answer": "1/2. There are two equally likely outcomes and one of them is a tail."
          },
          {
            "q": "Assertion (A): √2 is an irrational number. Reason (R): The square root of every prime number is irrational.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. Since 2 is prime, the general result in R covers the particular case in A."
          },
          {
            "q": "Assertion (A): The point (3, 0) lies on the x-axis. Reason (R): A point lies on the x-axis when its y-coordinate is zero.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. The point has y = 0, which is exactly the condition stated in the reason."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Rationalise the denominator of 1/(√7 − √3).",
            "marks": 2,
            "answer": "Multiply numerator and denominator by the conjugate √7 + √3: 1/(√7 − √3) × (√7 + √3)/(√7 + √3) = (√7 + √3)/(7 − 3) = (√7 + √3)/4."
          },
          {
            "q": "Find the value of k if x = 2 is a zero of the polynomial p(x) = x² + kx + 6.",
            "marks": 2,
            "answer": "If x = 2 is a zero then p(2) = 0, so 4 + 2k + 6 = 0. Hence 2k = −10 and k = −5."
          },
          {
            "q": "Write two solutions of the linear equation 3x + 4y = 12.",
            "marks": 2,
            "answer": "Put x = 0: 4y = 12, so y = 3, giving (0, 3). Put y = 0: 3x = 12, so x = 4, giving (4, 0). Both pairs satisfy the equation, and there are infinitely many others."
          },
          {
            "q": "In triangle ABC, AB = AC and angle B = 50°. Find angle A.",
            "marks": 2,
            "answer": "Since AB = AC the triangle is isosceles and the angles opposite the equal sides are equal, so angle C = angle B = 50°. Then angle A = 180 − 50 − 50 = 80°."
          },
          {
            "q": "Find the total surface area of a cube of edge 5 cm.",
            "marks": 2,
            "answer": "A cube has six square faces, so TSA = 6a² = 6 × 25 = 150 cm²."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 18,
        "instructions": "Answer all 6 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Represent √3 on the number line.",
            "marks": 3,
            "answer": "Draw a number line and mark OA = 1 unit from the origin O. At A erect a perpendicular AB of 1 unit; then OB = √(1² + 1²) = √2 by the Pythagoras theorem. Now at B erect a perpendicular BC of 1 unit; then OC = √((√2)² + 1²) = √3. With O as centre and radius OC, draw an arc cutting the number line at P. The point P represents √3."
          },
          {
            "q": "Factorise x³ − 3x² − 9x − 5.",
            "marks": 3,
            "answer": "Try x = −1: (−1) − 3(1) − 9(−1) − 5 = −1 − 3 + 9 − 5 = 0, so (x + 1) is a factor. Dividing gives x³ − 3x² − 9x − 5 = (x + 1)(x² − 4x − 5). The quadratic factors as (x − 5)(x + 1). Hence the full factorisation is (x + 1)²(x − 5)."
          },
          {
            "q": "If x + y = 12 and xy = 27, find the value of x³ + y³.",
            "marks": 3,
            "answer": "Use the identity x³ + y³ = (x + y)³ − 3xy(x + y). Substituting, x³ + y³ = 12³ − 3(27)(12) = 1728 − 972 = 756."
          },
          {
            "q": "Prove that the angles opposite to equal sides of a triangle are equal.",
            "marks": 3,
            "answer": "Let triangle ABC have AB = AC, and draw AD as the bisector of angle A, meeting BC at D. In triangles ABD and ACD: AB = AC (given), angle BAD = angle CAD (by construction) and AD = AD (common). Hence the triangles are congruent by the SAS rule, and by CPCT angle B = angle C. So the angles opposite the equal sides are equal."
          },
          {
            "q": "The sides of a triangle are 13 cm, 14 cm and 15 cm. Find its area using Heron's formula.",
            "marks": 3,
            "answer": "The semi-perimeter is s = (13 + 14 + 15)/2 = 21 cm. By Heron's formula, area = √(s(s−a)(s−b)(s−c)) = √(21 × 8 × 7 × 6) = √7056 = 84 cm²."
          },
          {
            "q": "The following are the marks of 10 students: 25, 30, 35, 30, 40, 45, 30, 50, 35, 40. Find the mean, median and mode.",
            "marks": 3,
            "answer": "The sum is 25 + 30 + 35 + 30 + 40 + 45 + 30 + 50 + 35 + 40 = 360, so the mean is 360/10 = 36. Arranged in order: 25, 30, 30, 30, 35, 35, 40, 40, 45, 50; with ten values the median is the mean of the 5th and 6th, that is (35 + 35)/2 = 35. The value 30 occurs three times, more than any other, so the mode is 30."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 20,
        "instructions": "Answer all 4 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "Prove that the diagonal of a parallelogram divides it into two congruent triangles, and hence that opposite sides of a parallelogram are equal.",
            "marks": 5,
            "answer": "Let ABCD be a parallelogram and join the diagonal AC. Since AB ∥ DC and AC is a transversal, angle BAC = angle DCA (alternate angles). Since AD ∥ BC and AC is a transversal, angle DAC = angle BCA (alternate angles). Also AC = CA is common. Hence triangles ABC and CDA are congruent by the ASA rule. By CPCT, AB = CD and BC = AD, so the opposite sides of a parallelogram are equal — which is what was to be proved."
          },
          {
            "q": "A cone of height 24 cm has a curved surface area of 550 cm². Find its radius, slant height and volume. (Use π = 22/7)",
            "marks": 5,
            "answer": "Let the radius be r and the slant height l, with l = √(r² + h²) = √(r² + 576). CSA = πrl = 550, so (22/7)r√(r² + 576) = 550, giving r√(r² + 576) = 175. Squaring, r²(r² + 576) = 30625. Let u = r²: u² + 576u − 30625 = 0, so u = (−576 + √(331776 + 122500))/2 = (−576 + √454276)/2 = (−576 + 674)/2 = 49. Hence r = 7 cm, and l = √(49 + 576) = √625 = 25 cm. The volume is (1/3)πr²h = (1/3)(22/7)(49)(24) = 1232 cm³."
          },
          {
            "q": "The angles of a quadrilateral are in the ratio 3 : 5 : 9 : 13. Find all four angles, and state what kind of quadrilateral it cannot be.",
            "marks": 5,
            "answer": "Let the angles be 3x, 5x, 9x and 13x. Their sum is 360°, so 30x = 360 and x = 12. The angles are therefore 36°, 60°, 108° and 156°. Since no two angles are equal, and a parallelogram requires opposite angles to be equal, the quadrilateral cannot be a parallelogram — nor, for the same reason, a rectangle, rhombus or square. It is an ordinary irregular quadrilateral, and having one angle greater than 90° more than once it is not cyclic either, since 36 + 108 ≠ 180 and 60 + 156 ≠ 180."
          },
          {
            "q": "The heights (in cm) of 20 students are 150, 152, 155, 160, 158, 162, 151, 157, 159, 156, 154, 156, 161, 153, 158, 157, 163, 166, 168, 155. Group them into classes of width 5 starting at 150, using the convention that a class includes its lower limit but not its upper. State the modal class and the class with the fewest students.",
            "marks": 5,
            "answer": "Sorting the values: 150, 151, 152, 153, 154, 155, 155, 156, 156, 157, 157, 158, 158, 159, 160, 161, 162, 163, 166, 168. Class 150–155 takes 150, 151, 152, 153, 154 — frequency 5. Class 155–160 takes 155, 155, 156, 156, 157, 157, 158, 158, 159 — frequency 9. Class 160–165 takes 160, 161, 162, 163 — frequency 4. Class 165–170 takes 166, 168 — frequency 2. The frequencies 5, 9, 4 and 2 total 20, which checks against the count. The modal class is 155–160, since it has the highest frequency of 9, and the class with the fewest students is 165–170 with a frequency of 2. The distribution is therefore concentrated around the middle of the range and thins out towards the taller heights."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A school wants to build a rectangular garden of length 20 m and breadth 15 m, and lay a path of uniform width 2 m all around it on the outside. (i) Find the area of the garden. (ii) Find the dimensions of the outer rectangle. (iii) Find the area of the path.",
            "marks": 4,
            "answer": "(i) Area of the garden = 20 × 15 = 300 m². (ii) The path adds 2 m on each of the four sides, so the outer rectangle measures (20 + 4) by (15 + 4), that is 24 m by 19 m. (iii) Area of the outer rectangle = 24 × 19 = 456 m², so the area of the path = 456 − 300 = 156 m²."
          },
          {
            "q": "CASE STUDY 2 — A water tank in the shape of a cylinder has a radius of 3.5 m and a height of 4 m. (Use π = 22/7) (i) Find its volume in cubic metres. (ii) Find how many litres it holds. (iii) Find the cost of painting its curved surface at ₹20 per m².",
            "marks": 4,
            "answer": "(i) Volume = πr²h = (22/7)(3.5)²(4) = (22/7)(12.25)(4) = 154 m³. (ii) One cubic metre is 1000 litres, so the tank holds 154,000 litres. (iii) Curved surface area = 2πrh = 2 × (22/7) × 3.5 × 4 = 88 m², so the cost is 88 × 20 = ₹1,760."
          },
          {
            "q": "CASE STUDY 3 — In a survey of 60 families, the number of children per family was recorded: 0 children in 5 families, 1 in 12, 2 in 25, 3 in 13 and 4 in 5. (i) Find the total number of children. (ii) Find the mean number of children per family. (iii) A family is chosen at random — find the probability that it has at least two children.",
            "marks": 4,
            "answer": "(i) Total children = 0(5) + 1(12) + 2(25) + 3(13) + 4(5) = 0 + 12 + 50 + 39 + 20 = 121. (ii) Mean = 121/60 ≈ 2.02 children per family. (iii) Families with at least two children number 25 + 13 + 5 = 43, so the probability is 43/60 ≈ 0.717."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the main chapters in Class 9 Maths?",
        "a": "Number systems, polynomials, coordinate geometry, linear equations, triangles, circles, statistics, and probability."
      },
      {
        "q": "Is it necessary to memorize formulas for the exam?",
        "a": "Yes, formulas for area, volume, and algebraic identities must be memorized for quick problem-solving."
      },
      {
        "q": "How can I improve my geometry skills?",
        "a": "Practice construction problems regularly and understand the underlying theorems before solving numerical problems."
      }
    ]
  },
  {
    "slug": "class-9-science",
    "classLevel": "Class 9",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Science Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 9 Science paper built to the board's own pattern: 39 questions across five sections for 80 marks in 3 hours, covering matter, atoms and molecules, cell biology and tissues, motion, force, gravitation, work and energy, and sound in the proportions the board uses. Section A is objective and Section E is case-based. Every question carries a full worked solution setting out the reasoning, not just the final answer.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The process by which a solid changes directly into a gas is called",
            "marks": 1,
            "answer": "Sublimation. Camphor, naphthalene and ammonium chloride all sublime on heating."
          },
          {
            "q": "Evaporation causes cooling because",
            "marks": 1,
            "answer": "The escaping particles take latent heat from the liquid and its surroundings, lowering their temperature."
          },
          {
            "q": "A solution of common salt in water is an example of",
            "marks": 1,
            "answer": "A homogeneous mixture — the composition is uniform throughout and the particles cannot be seen or separated by filtration."
          },
          {
            "q": "Which of these is a compound: air, brass, or water?",
            "marks": 1,
            "answer": "Water. Air and brass are mixtures, whereas water has hydrogen and oxygen chemically combined in a fixed 2 : 1 ratio by atoms."
          },
          {
            "q": "The technique used to separate a mixture of two miscible liquids with boiling points differing by less than 25 K is",
            "marks": 1,
            "answer": "Fractional distillation, using a fractionating column that provides repeated condensation and vaporisation."
          },
          {
            "q": "The atomicity of a phosphorus molecule, P₄, is",
            "marks": 1,
            "answer": "Four — the molecule contains four atoms of phosphorus."
          },
          {
            "q": "The number of moles in 22 g of carbon dioxide (molar mass 44 g/mol) is",
            "marks": 1,
            "answer": "0.5 mol. Moles = mass/molar mass = 22/44 = 0.5."
          },
          {
            "q": "Isotopes of an element have",
            "marks": 1,
            "answer": "The same atomic number but different mass numbers — the same number of protons and a different number of neutrons."
          },
          {
            "q": "The particle discovered by James Chadwick was the",
            "marks": 1,
            "answer": "Neutron, an electrically neutral particle of mass roughly equal to that of a proton."
          },
          {
            "q": "The plastid that gives a green colour to plant cells is the",
            "marks": 1,
            "answer": "Chloroplast, which contains the pigment chlorophyll and is the site of photosynthesis."
          },
          {
            "q": "The tissue that transports food in plants is",
            "marks": 1,
            "answer": "Phloem. Xylem carries water and minerals; phloem carries the products of photosynthesis in both directions."
          },
          {
            "q": "Which animal tissue connects muscle to bone?",
            "marks": 1,
            "answer": "Tendon — a strong, inelastic connective tissue. Ligaments, by contrast, connect bone to bone and are elastic."
          },
          {
            "q": "The SI unit of force is the",
            "marks": 1,
            "answer": "Newton, defined as the force that gives a mass of one kilogram an acceleration of one metre per second squared."
          },
          {
            "q": "A body moving with uniform velocity has",
            "marks": 1,
            "answer": "Zero acceleration, since acceleration is the rate of change of velocity and the velocity is not changing."
          },
          {
            "q": "The momentum of a 5 kg body moving at 4 m/s is",
            "marks": 1,
            "answer": "20 kg m/s. Momentum p = mv = 5 × 4 = 20 kg m/s, directed along the motion."
          },
          {
            "q": "The work done when a force of 10 N moves a body 5 m in the direction of the force is",
            "marks": 1,
            "answer": "50 J. Work W = F × s = 10 × 5 = 50 joules."
          },
          {
            "q": "The frequency of a sound wave of wavelength 2 m travelling at 340 m/s is",
            "marks": 1,
            "answer": "170 Hz. From v = fλ, f = 340/2 = 170 Hz."
          },
          {
            "q": "The acceleration due to gravity on the surface of the Moon is about",
            "marks": 1,
            "answer": "One sixth of that on Earth, roughly 1.63 m/s², because the Moon has both a much smaller mass and a smaller radius."
          },
          {
            "q": "Assertion (A): A sponge is a solid though it can be compressed. Reason (R): A sponge has minute holes filled with air that escape when it is pressed.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. The sponge keeps a definite shape and volume of its own material; what compresses is the trapped air, exactly as the reason says."
          },
          {
            "q": "Assertion (A): The mass of a body remains constant everywhere. Reason (R): Weight depends on the acceleration due to gravity at the place.",
            "marks": 1,
            "answer": "(b) Both are true but R does not explain A. Mass is constant because it measures the quantity of matter; the behaviour of weight is a separate fact and does not account for that constancy."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 12,
        "instructions": "Answer all 6 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Why do gases exert more pressure than solids and liquids on the walls of a container?",
            "marks": 2,
            "answer": "In a gas the particles are very far apart and move at high speed in all directions, so they collide frequently with the walls of the container. Each collision exerts a force, and the large number of collisions per second over the whole surface gives rise to the pressure."
          },
          {
            "q": "State the law of conservation of mass and give one example.",
            "marks": 2,
            "answer": "In a chemical reaction, mass can neither be created nor destroyed, so the total mass of the products equals the total mass of the reactants. For example, when 12 g of carbon burns completely in 32 g of oxygen, exactly 44 g of carbon dioxide is formed."
          },
          {
            "q": "Write two differences between a plant cell and an animal cell.",
            "marks": 2,
            "answer": "A plant cell has a rigid cell wall of cellulose outside the plasma membrane, while an animal cell has only the plasma membrane. A plant cell contains plastids, including chloroplasts, and usually one large central vacuole, whereas an animal cell has no plastids and only small vacuoles if any."
          },
          {
            "q": "State Newton's third law of motion and give one everyday example.",
            "marks": 2,
            "answer": "To every action there is an equal and opposite reaction, and the two act on different bodies. When a swimmer pushes the water backwards with her hands, the water pushes her forwards with an equal force, which is what moves her through the pool."
          },
          {
            "q": "Define echo and state the minimum distance needed to hear one clearly.",
            "marks": 2,
            "answer": "An echo is the repetition of a sound caused by its reflection from a distant obstacle. The sensation of sound persists in the brain for about 0.1 s, so the reflected sound must return after at least that interval; at 344 m/s the sound must cover 34.4 m in going and returning, so the obstacle must be at least 17.2 m away."
          },
          {
            "q": "Why is the weight of an object on the Moon less than on the Earth?",
            "marks": 2,
            "answer": "Weight is the gravitational force on the object, W = mg, and the value of g depends on the mass and radius of the body producing the field. The Moon's mass is much smaller than the Earth's, so its g is about one sixth of the Earth's and the same object weighs about one sixth as much, even though its mass is unchanged."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 21,
        "instructions": "Answer all 7 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Explain why the temperature of a substance does not rise while it is melting, even though heat is being supplied.",
            "marks": 3,
            "answer": "During melting the heat supplied does not increase the kinetic energy of the particles, so the thermometer reading does not change. Instead it is used to overcome the forces of attraction holding the particles in their fixed positions in the solid lattice. This hidden heat is the latent heat of fusion, and only when the whole solid has become liquid does further heating begin to raise the temperature again."
          },
          {
            "q": "Distinguish between a mixture and a compound, giving two points of difference and one example of each.",
            "marks": 3,
            "answer": "The components of a mixture are present in any proportion and keep their own properties, whereas a compound has its elements combined in a fixed proportion by mass and shows entirely new properties. A mixture can be separated by physical means such as filtration or distillation, while a compound can be broken up only by a chemical reaction. Air is a mixture of gases; water is a compound of hydrogen and oxygen."
          },
          {
            "q": "Calculate the number of molecules in 9 g of water. (Molar mass of water = 18 g/mol, Avogadro number = 6.022 × 10²³)",
            "marks": 3,
            "answer": "Number of moles = mass/molar mass = 9/18 = 0.5 mol. The number of molecules = number of moles × Avogadro number = 0.5 × 6.022 × 10²³ = 3.011 × 10²³ molecules."
          },
          {
            "q": "Describe the structure and function of the mitochondrion.",
            "marks": 3,
            "answer": "The mitochondrion is a double-membraned organelle; its outer membrane is smooth and porous, while the inner membrane is deeply folded into cristae that greatly increase the surface area available for reactions. The space inside holds the matrix, which contains enzymes along with the organelle's own DNA and ribosomes, so it can make some of its own proteins. Its function is aerobic respiration: it completes the oxidation of glucose and releases energy as ATP, which is why it is called the powerhouse of the cell."
          },
          {
            "q": "A car accelerates uniformly from 18 km/h to 36 km/h in 5 s. Calculate the acceleration and the distance covered.",
            "marks": 3,
            "answer": "Convert to SI: 18 km/h = 18 × 5/18 = 5 m/s and 36 km/h = 10 m/s. Acceleration a = (v − u)/t = (10 − 5)/5 = 1 m/s². Distance s = ut + ½at² = 5(5) + ½(1)(25) = 25 + 12.5 = 37.5 m."
          },
          {
            "q": "State the law of conservation of energy and verify it for a body falling freely from a height h.",
            "marks": 3,
            "answer": "Energy can neither be created nor destroyed, only changed from one form to another, so the total energy of an isolated system stays constant. For a body of mass m released from height h: at the top its velocity is zero, so the energy is entirely potential, mgh. At a height x above the ground it has fallen (h − x) and gained a speed given by v² = 2g(h − x), so the kinetic energy is ½mv² = mg(h − x) and the potential energy is mgx; the total is mgh again. Just before striking the ground the potential energy is zero and v² = 2gh, so the kinetic energy is ½m(2gh) = mgh. The total is mgh at every stage."
          },
          {
            "q": "Explain how sound is produced and why sound cannot travel through vacuum.",
            "marks": 3,
            "answer": "Sound is produced by a vibrating body. As the surface moves forward it pushes the particles of the surrounding medium together, creating a compression, and as it moves back it leaves them further apart, creating a rarefaction. These compressions and rarefactions travel outward as a longitudinal wave, and the particles themselves only oscillate about their mean positions rather than travelling with the wave. Since the wave needs particles to pass the disturbance from one to the next, and a vacuum contains no particles, sound cannot travel through it — which is why an electric bell in an evacuated jar becomes inaudible."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 15,
        "instructions": "Answer all 3 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "(a) State the postulates of Bohr's model of the atom. (b) Write the electronic configuration of an element with atomic number 18. (c) Define valency and give the valency of that element.",
            "marks": 5,
            "answer": "(a) Bohr proposed that electrons revolve round the nucleus only in certain permitted circular orbits called energy levels or shells; that while an electron stays in such an orbit it does not radiate energy, so the atom is stable; and that energy is absorbed or emitted only when an electron jumps from one orbit to another, the difference in energy appearing as radiation. (b) An element with atomic number 18 has 18 electrons, filled as K = 2, L = 8, M = 8, written 2, 8, 8 — this is argon. (c) Valency is the combining capacity of an atom, given by the number of electrons it must gain, lose or share to attain a completely filled outermost shell. Argon already has eight electrons in its outermost shell, so it neither gains nor loses electrons and its valency is zero, which is why it is chemically inert."
          },
          {
            "q": "(a) Describe the three types of muscle tissue in animals, giving one location and one distinguishing feature of each. (b) Why is areolar tissue called packing tissue?",
            "marks": 5,
            "answer": "(a) Striated or skeletal muscle is made of long, cylindrical, unbranched multinucleate fibres with alternating light and dark bands; it is attached to bones, as in the limbs, and is under voluntary control, contracting rapidly and tiring quickly. Smooth or unstriated muscle has spindle-shaped, uninucleate cells without bands; it occurs in the walls of the alimentary canal, blood vessels and iris, and works involuntarily and slowly without tiring. Cardiac muscle has branched, uninucleate striated fibres joined by intercalated discs; it is found only in the heart and contracts rhythmically and involuntarily throughout life without fatigue. (b) Areolar tissue fills the space inside organs, fastens skin to the muscle beneath, and lies between and around the tissues it surrounds, holding them in place while allowing movement. Because its main role is to occupy the gaps and support neighbouring structures rather than to perform a specialised function of its own, it is described as packing tissue; it also aids repair after injury."
          },
          {
            "q": "(a) State the universal law of gravitation and write its mathematical form. (b) Explain why a sheet of paper falls more slowly than a stone though gravity acts equally on both. (c) A body of mass 10 kg is at a height of 5 m. Calculate its potential energy. (Take g = 10 m/s²)",
            "marks": 5,
            "answer": "(a) Every body in the universe attracts every other body with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres: F = G m₁m₂/r², where G is the universal gravitational constant, 6.67 × 10⁻¹¹ N m² kg⁻². (b) In free fall all bodies would have the same acceleration g, independent of mass. What differs is air resistance: the sheet of paper has a very large surface area for its small weight, so the upward drag on it is comparable to its weight and it slows greatly, whereas the stone's weight is far larger than the drag on its small area. In an evacuated tube the two fall side by side, which shows that gravity indeed acts alike on both. (c) Potential energy = mgh = 10 × 10 × 5 = 500 J."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A student places some ice in a beaker and heats it steadily, recording the temperature every minute. The temperature rises from −10 °C to 0 °C, then stays at 0 °C for several minutes, then rises again to 100 °C, where it stays constant while the water boils. (i) Why does the temperature stay constant at 0 °C? (ii) Name the heat involved. (iii) Why does it stay constant again at 100 °C? (iv) Which requires more heat per kilogram?",
            "marks": 4,
            "answer": "(i) At 0 °C the ice is melting, and the heat supplied is being used to break the forces holding the particles in the solid lattice rather than to raise their kinetic energy, so the temperature does not change until all the ice has melted. (ii) This is the latent heat of fusion of ice, about 3.34 × 10⁵ J/kg. (iii) At 100 °C the water is boiling, and the heat is being used to separate the particles completely against the attractive forces to form vapour — the latent heat of vaporisation. (iv) Vaporisation requires far more heat per kilogram, about 22.6 × 10⁵ J/kg against 3.34 × 10⁵ J/kg, because the particles must be separated completely rather than merely freed to slide past one another."
          },
          {
            "q": "CASE STUDY 2 — A bus starting from rest moves with a uniform acceleration of 0.1 m/s² for 2 minutes. (i) Convert the time to seconds. (ii) Find the speed acquired. (iii) Find the distance travelled. (iv) If the brakes then bring it to rest in 20 s, find the retardation.",
            "marks": 4,
            "answer": "(i) 2 minutes = 120 s. (ii) v = u + at = 0 + 0.1 × 120 = 12 m/s. (iii) s = ut + ½at² = 0 + ½(0.1)(120)² = ½(0.1)(14400) = 720 m. (iv) Now u = 12 m/s, v = 0 and t = 20 s, so a = (0 − 12)/20 = −0.6 m/s². The negative sign shows retardation of 0.6 m/s²."
          },
          {
            "q": "CASE STUDY 3 — A ship sends a sound pulse towards the sea bed and receives the echo after 3 s. The speed of sound in seawater is 1500 m/s. (i) Name this technique. (ii) Why is the time halved in the calculation? (iii) Calculate the depth. (iv) Give one other use of this technique.",
            "marks": 4,
            "answer": "(i) Echo ranging, or SONAR — sound navigation and ranging. (ii) The 3 s is the time for the pulse to travel down to the sea bed AND back to the ship, so the one-way time is half of it, 1.5 s. (iii) Depth = speed × one-way time = 1500 × 1.5 = 2250 m. (iv) The same principle is used to locate shoals of fish, submarines, icebergs and sunken wrecks, and in medicine an ultrasound scanner images internal organs by the same echo method."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the marks distribution in Class 9 Science?",
        "a": "Physics (30), Chemistry (30), Biology (20) marks; 20 marks for practical assessment."
      },
      {
        "q": "Which topics are most important for the board exam?",
        "a": "Force, motion, atoms, cells, photosynthesis, and respiration are high-weightage topics."
      },
      {
        "q": "Are practicals compulsory in Class 9 Science?",
        "a": "Yes, students must conduct prescribed practicals and maintain a proper lab notebook."
      }
    ]
  },
  {
    "slug": "class-9-english",
    "classLevel": "Class 9",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 9 English Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 9 English (Language and Literature) paper built to the board's own pattern: 80 marks in 3 hours, split as 20 marks of reading, 20 of writing and grammar, and 40 of literature. Both reading passages are printed in full on this page, so every comprehension question can actually be answered from what is in front of you. The literature section refers to the prescribed textbooks Beehive and Moments and asks for your own words rather than reproduced extracts. Every question is followed by a full model answer, and the longer answers set out what a full-credit response needs to contain.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Reading: Passage I (10 marks)",
        "marks": 10,
        "passage": "The oldest living thing in the district is not in the forest. It stands at the edge of a bus stand, behind a tea stall, and it is a tamarind tree that the municipal records list simply as an obstruction.\n\nNobody planted it on purpose. An old woman who sold tamarind in the market is said to have spat out a seed there some time before Independence, and the seed did what seeds do. The tree grew crookedly, because a wall was built too close to it in 1962 and it had to lean out over the road to find light. That lean is now the most useful thing about it: the whole bus stand sits in its shadow, and on an afternoon in May the difference between standing under the tamarind and standing four steps outside it is the difference between waiting and suffering.\n\nA tree of this size moves an extraordinary quantity of water. On a hot day a large tamarind can lift more than two hundred litres from the soil and release it through its leaves as vapour, and every litre that evaporates carries heat away with it. This is why the air under a big tree is cooler than the air under a tin roof of the same size. The roof only blocks the sun. The tree blocks the sun and runs a pump.\n\nThe tea stall owner, Kamala, has kept the tree alive twice. Once she argued with a contractor who wanted to cut it for a wider footpath, and once she paid, out of her own takings, for the concrete to be broken open around its base, because the roots were being strangled and the upper branches had begun to die back. She does not describe either act as conservation. She says that people sit longer where it is cool, and that a person who sits longer drinks two teas instead of one.",
        "instructions": "Read the passage given above and answer the questions that follow. Each question carries the marks shown against it.",
        "questions": [
          {
            "q": "How did the tamarind tree come to grow at the bus stand? (1 mark)",
            "marks": 1,
            "answer": "Nobody planted it deliberately. An old woman who sold tamarind in the market is said to have spat out a seed at that spot some time before Independence, and the seed germinated and grew."
          },
          {
            "q": "Why does the tree lean out over the road, and why is that lean useful? (2 marks)",
            "marks": 2,
            "answer": "A wall was built too close to the tree in 1962, so it had to grow outwards over the road to reach the light. The lean is useful because it places the tree's canopy over the bus stand, so the whole waiting area now falls within its shade."
          },
          {
            "q": "Explain the difference the writer draws between a tree and a tin roof of the same size. (3 marks)",
            "marks": 3,
            "answer": "A tin roof only blocks the sun, so it stops direct radiation but does nothing to lower the temperature of the air beneath it. A tree does both: it blocks the sun and, in addition, draws water up from the soil and releases it through its leaves as vapour. Because evaporation absorbs heat, every litre that leaves the leaves carries heat away with it, so the tree actively cools the air rather than merely shading it — the writer sums this up by saying the tree 'blocks the sun and runs a pump'."
          },
          {
            "q": "What two things has Kamala done to keep the tree alive? (2 marks)",
            "marks": 2,
            "answer": "She argued with a contractor who intended to cut the tree down in order to widen the footpath, and she paid from her own earnings to have the concrete around its base broken open, because the roots were being strangled and the upper branches had started to die back."
          },
          {
            "q": "What does Kamala's explanation of her actions tell us about her? (2 marks)",
            "marks": 2,
            "answer": "She refuses to describe what she did as conservation and explains it in plain commercial terms — people sit longer where it is cool, and someone who sits longer buys two teas instead of one. This suggests a practical, unsentimental woman who does not claim any nobler motive than she has; it also quietly makes the writer's point that protecting a tree and acting in one's own interest need not be opposed."
          }
        ]
      },
      {
        "name": "Section A — Reading: Passage II (10 marks)",
        "marks": 10,
        "passage": "When a violin is played well, no part of it is doing anything complicated. A horsehair bow, coated with resin, is dragged across a stretched string. The resin makes the hair grip the string and pull it sideways until the tension is too great; the string snaps back, is caught again, and pulled again. This happens some hundreds of times a second, and the ear hears it not as a series of catches and releases but as a single steady note.\n\nThe string itself moves almost no air, and on its own it would be nearly inaudible. What makes the sound is the body of the instrument. The vibration passes through the bridge, a thin piece of maple standing on the belly of the violin, and sets the whole wooden shell shaking. Inside, a small rod called the sound post — held in place by nothing but pressure, and never glued — carries the vibration from the front plate to the back. Move that rod two millimetres and the instrument changes voice.\n\nThis is why a violin cannot be fully designed. The maker can control the arching of the plates, their thickness, the density of the spruce and the maple, but the finished sound emerges from the interaction of all of them, and it is not predictable in advance. Makers proceed by tapping the plates and listening, thinning them a shaving at a time, and stopping when the tone seems right — a method that would embarrass an engineer.\n\nAnd yet the instruments that are most prized are three hundred years old, made in a small Italian town by men who had no acoustics, no measurement, and no way to see what they were doing. Every attempt to explain their superiority — the varnish, the density of Alpine wood grown in a cold century, the shape of the f-holes — has been argued for and argued against. It is possible that the real answer is duller and more humbling: that they made a very great number of violins, listened carefully, and kept what worked.",
        "instructions": "Read the passage given above and answer the questions that follow. Each question carries the marks shown against it.",
        "questions": [
          {
            "q": "Describe briefly how a bow makes a violin string sound. (2 marks)",
            "marks": 2,
            "answer": "The bow's horsehair is coated with resin, which makes it grip the string and drag it sideways until the tension becomes too great. The string then snaps back, is caught by the hair again and pulled again. This catching and releasing happens hundreds of times a second."
          },
          {
            "q": "Why does the ear hear a steady note rather than a series of catches? (1 mark)",
            "marks": 1,
            "answer": "Because the catch-and-release cycle repeats so rapidly — some hundreds of times a second — that the ear cannot separate the individual events and merges them into one continuous note."
          },
          {
            "q": "What is the function of the bridge and the sound post? (3 marks)",
            "marks": 3,
            "answer": "The string by itself moves almost no air and would be nearly inaudible, so the sound must come from the body of the instrument. The bridge, a thin piece of maple standing on the belly of the violin, carries the string's vibration down into the wooden shell and sets the whole of it shaking. The sound post, a small rod inside the instrument held only by pressure and never glued, transmits that vibration from the front plate through to the back, so that the entire body resonates — and because its position is so critical, moving it two millimetres changes the instrument's voice."
          },
          {
            "q": "Why does the writer say that a violin 'cannot be fully designed'? (2 marks)",
            "marks": 2,
            "answer": "Because although the maker can control individual variables — the arching of the plates, their thickness, the density of the spruce and maple — the finished sound arises from the interaction of all of them together, and that result cannot be predicted in advance from the parts. Makers therefore work by tapping the plates, listening, and removing a shaving at a time until the tone seems right, rather than by calculation."
          },
          {
            "q": "What 'duller and more humbling' explanation does the writer offer for the excellence of the old Italian violins? (2 marks)",
            "marks": 2,
            "answer": "That there may be no secret at all — no special varnish, wood or shape. The makers may simply have produced a very large number of violins, listened carefully to each, and kept what worked, so that the excellence came from patient trial and selection rather than from any hidden knowledge."
          }
        ]
      },
      {
        "name": "Section B — Writing and Grammar (20 marks)",
        "marks": 20,
        "instructions": "Answer all questions. Marks are shown against each question.",
        "questions": [
          {
            "q": "You are Ananya/Aditya, Head Boy/Head Girl of Green Valley School, Nagpur. Write a notice in about 50 words informing students of a tree-plantation drive to be held on the school grounds next Saturday, with timings and what to bring. (5 marks)",
            "marks": 5,
            "answer": "A full-credit notice is enclosed in a box, with the school name at the top, the word NOTICE centred, the date on the left, and a short underlined heading such as 'Tree Plantation Drive'. The body, in about fifty words, states what is happening, when, where, who should come and what to bring: for example that a tree-plantation drive will be held on the school grounds on Saturday, 24 August, from 8.00 a.m. to 11.00 a.m.; that students of classes VIII to X may participate; that they should report in sports uniform and bring a small spade or trowel and a water bottle; and that names must be given to the class teacher by Thursday. It ends with the writer's signature, name and designation — Ananya/Aditya, Head Girl/Head Boy. The notice uses no first person and no complete-sentence storytelling; it is brief and factual."
          },
          {
            "q": "Write a short descriptive paragraph in about 100 words on 'A tree I pass every day', using at least three details of sight, sound or touch. (5 marks)",
            "marks": 5,
            "answer": "A strong answer chooses concrete detail over general praise. For example: The gulmohar at the corner of our lane is not a beautiful tree for most of the year. Its bark is grey and cracked, and a strip of it has been rubbed smooth where the milkman leans his cycle every morning. In April, though, it turns scarlet almost overnight, and for three weeks the road beneath it is covered with fallen petals that stick to the soles of your shoes after rain. Sparrows quarrel in it at six o'clock with a noise out of all proportion to their size. I have never once seen anyone stop to look at it. (About 100 words, with details of sight, sound and touch, and a closing observation rather than a summary.)"
          },
          {
            "q": "Fill in the blanks with the correct tense form: (i) The bell ______ (ring) before we reached the classroom. (ii) Water ______ (boil) at 100 degrees Celsius. (iii) Look! The baby ______ (cry). (3 marks)",
            "marks": 3,
            "answer": "(i) had rung — the past perfect, because the ringing was completed before the past action of reaching. (ii) boils — the simple present, used for a general or scientific truth. (iii) is crying — the present continuous, since 'Look!' signals something happening at this moment."
          },
          {
            "q": "Combine each pair into a single sentence as directed: (i) He was tired. He continued walking. (Use 'although') (ii) She is honest. Everyone knows it. (Use a noun clause) (2 marks)",
            "marks": 2,
            "answer": "(i) Although he was tired, he continued walking. (ii) Everyone knows that she is honest."
          },
          {
            "q": "Change the voice: (i) The gardener waters the plants every morning. (ii) A new bridge is being built across the river. (2 marks)",
            "marks": 2,
            "answer": "(i) The plants are watered by the gardener every morning. (ii) They are building a new bridge across the river. In the second the passive is turned into the active, and since the doer is not named an indefinite subject such as 'they' or 'workers' is supplied."
          },
          {
            "q": "Correct the errors: (i) He is one of the best student in the class. (ii) I have went there yesterday. (iii) Each of the boys have a bag. (3 marks)",
            "marks": 3,
            "answer": "(i) 'student' should be 'students' — 'one of the' is followed by a plural noun: 'He is one of the best students in the class.' (ii) 'have went' should be 'went' — 'yesterday' fixes a finished past time, so the simple past is required: 'I went there yesterday.' (iii) 'have' should be 'has' — 'each' is singular, so the verb must be singular: 'Each of the boys has a bag.'"
          }
        ]
      },
      {
        "name": "Section C — Literature (40 marks)",
        "marks": 40,
        "instructions": "Answer all questions with reference to the prescribed textbooks Beehive and Moments. Marks are shown against each question. Answer in your own words; do not copy from the text.",
        "questions": [
          {
            "q": "In 'The Fun They Had', what does Margie find strange about the old kind of school, and what does she come to feel about it by the end? (4 marks)",
            "marks": 4,
            "answer": "Margie is astonished by almost everything in the old school. She cannot understand why children of different ages would be taught together in one building, why a man rather than a machine would be the teacher, or why a teacher would take the pupils' homework away instead of marking it instantly as her mechanical teacher does. She is puzzled that a man could know as much as a telebook teacher. By the end her puzzlement has turned into longing: she thinks about the children walking to school together, sitting in the same room, helping one another with their homework and laughing on the way home, and she realises they must have enjoyed it. The story's irony is that the mechanical teacher gives her a lesson while she is dreaming of the school that had no machines at all."
          },
          {
            "q": "How does the poet present the wind in 'Wind', and what attitude does he finally recommend? (4 marks)",
            "marks": 4,
            "answer": "In the first part of the poem the wind is presented as a destructive bully: it breaks shutters, scatters papers, throws down books, and it crumbles weak houses, weak doors, weak rafters, weak bodies, weak hearts and weak lives. It mocks the frail and destroys them. But the poet observes that the wind does not damage what is strong — it only fans a strong fire and makes it roar and flourish. His conclusion is that we should not plead with the wind but prepare for it: build firm houses, strengthen the body, make the heart steadfast. The wind becomes a symbol of hardship, and the recommended attitude is not resistance or complaint but the building of strength, since adversity destroys the weak and improves the strong."
          },
          {
            "q": "Why does the narrator call Evelyn Glennie's success 'a triumph of will' in 'The Sound of Music'? (4 marks)",
            "marks": 4,
            "answer": "Evelyn Glennie began to lose her hearing at the age of eight and was profoundly deaf by eleven, a condition that would ordinarily end any hope of a musical career. She refused to accept it. She persuaded a percussionist, Ron Forbes, to teach her, and he showed her to detect the notes not through her ears but through her body — feeling the higher drum from the waist up and the lower drum from the waist down. She learned to sense music through her fingertips, her cheekbones, her skin and her feet, sometimes playing barefoot so that the vibrations travelled up through the floor. Against her teachers' advice she applied to the Royal Academy of Music and won its highest awards, and she went on to become the world's first full-time solo percussionist. Her achievement was not a matter of luck or accident but of a sustained refusal to be defeated, which is why it is called a triumph of will."
          },
          {
            "q": "In 'The Little Girl', how does Kezia's view of her father change, and what causes the change? (4 marks)",
            "marks": 4,
            "answer": "At the beginning Kezia is frightened of her father. He seems huge and severe, his voice is loud, and her stammering in his presence irritates him; when she accidentally tears up his important speech to stuff a pincushion for his birthday, he beats her hands with a ruler and she concludes that he is simply a cruel giant. The change comes when her grandmother is away and her mother is taken ill to hospital, and Kezia, alone in the house, has a nightmare. Her father comes to her, carries her to his own bed, tells her to rub her feet against his legs to get warm, and falls asleep beside her. Lying there she notices how tired he is, and she understands for the first time that he works hard all day and has no one to look after him, and that his shortness is exhaustion rather than cruelty. Her fear turns into a protective tenderness — she realises he has a 'big heart'."
          },
          {
            "q": "What lesson does the narrator learn in 'Iswaran the Storyteller' or 'The Beggar', and how is it conveyed? (4 marks)",
            "marks": 4,
            "answer": "In 'The Beggar' the lesson is that a person is changed not by charity but by being given work and being treated as capable of it. Lushkoff begs by telling a false story of being a dismissed schoolteacher, and Sergei, who catches the lie, offers him not money but the job of chopping wood. Lushkoff is barely able to do it, and the reader later learns that the cook Olga in fact did the chopping for him while scolding and pitying him. Two years afterwards Lushkoff, now a notary earning a salary, tells Sergei that it was Olga who saved him — her words and her example changed him, and the work gave him back his self-respect. The lesson is conveyed through this reversal: the man who thought he was reforming the beggar had less effect than the servant who quietly did the work beside him."
          },
          {
            "q": "In 'A Truly Beautiful Mind', what qualities of Einstein does the chapter emphasise besides his scientific genius? (4 marks)",
            "marks": 4,
            "answer": "The chapter is careful to present Einstein as more than a physicist. It stresses that he was a slow developer who did not speak fluently until he was well past two, was called Bruder Langweil — brother boring — by the family maid, and disliked the regimented schooling of Munich so much that he left the school and the country at fifteen. It emphasises his independence of mind: he questioned what he was told rather than memorising it, and this same habit produced both his trouble at school and his physics. Above all it dwells on his moral seriousness. He wrote to President Roosevelt warning that Germany might build an atomic bomb, was appalled when the weapon was used on Hiroshima and Nagasaki, and afterwards campaigned publicly for nuclear disarmament and world peace, so that by his death he was regarded as a world citizen as much as a scientist. The title refers to that combination of intellect and conscience."
          },
          {
            "q": "Discuss the theme of courage in any one prose lesson you have studied, in about 100–120 words. (8 marks)",
            "marks": 8,
            "answer": "A full-credit answer states a thesis, supports it with two or more specific incidents, and closes with an evaluation. Taking 'The Snake and the Mirror': courage in the story is comically absent and that is the point. The homeopathic doctor, who has just been admiring his own handsome face in the mirror and planning to marry a rich woman with a fat purse, is reduced to complete helplessness when a snake coils itself round his arm and holds its hood inches from the mirror. He sits absolutely still, not out of bravery but out of terror, and makes silent resolutions to be humble if he survives. When the snake finally slides away he escapes at once, and a thief later strips his room of everything he owned. The story suggests that self-importance is fragile — one genuine danger dissolves it entirely — and that the vanity a man believes to be confidence is not courage at all."
          },
          {
            "q": "'A poem can teach without preaching.' Discuss with reference to any one poem from Beehive, in about 100–120 words. (8 marks)",
            "marks": 8,
            "answer": "A full-credit answer argues the claim rather than summarising. Taking 'The Road Not Taken': Frost never tells the reader what to do. He describes a traveller in a yellow wood facing two paths, choosing one, and keeping the other for another day while knowing he will probably never return. The poem's moral force comes from a detail the careless reader misses — the two roads were 'really about the same', worn 'about the same', and equally covered in untrodden leaves. The famous closing lines, spoken 'with a sigh' and set 'ages and ages hence', are the traveller's future account of himself, not the poet's verdict; he will claim a difference that the poem has already denied. In refusing to preach, Frost teaches something sharper than any instruction: that we make our choices with far less knowledge than we later pretend, and that we edit them into significance afterwards."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 9 English?",
        "a": "Class 9 English is out of 80 marks; 20 marks are for internal assessment."
      },
      {
        "q": "Which texts are prescribed for Class 9 English?",
        "a": "Beehive and Moments are the main textbooks; questions are based on poems and stories from these."
      },
      {
        "q": "How can I improve my comprehension skills?",
        "a": "Read diverse materials regularly, practice skimming and scanning, and answer comprehension questions daily."
      }
    ]
  },
  {
    "slug": "class-9-social-science",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Social Science Sample Paper 2026 (with Solutions)",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The French Revolution began in the year",
            "marks": 1,
            "answer": "1789, with the storming of the Bastille prison in Paris on 14 July."
          },
          {
            "q": "The Third Estate in French society consisted of",
            "marks": 1,
            "answer": "Everyone outside the clergy and the nobility — big businessmen, merchants, lawyers, peasants, artisans and servants. Only this estate paid taxes."
          },
          {
            "q": "Who wrote 'The Social Contract'?",
            "marks": 1,
            "answer": "Jean-Jacques Rousseau, who argued for a government based on a contract between the people and their representatives."
          },
          {
            "q": "The Bolshevik Revolution of October 1917 was led by",
            "marks": 1,
            "answer": "Vladimir Lenin, whose Bolshevik party seized power from the Provisional Government."
          },
          {
            "q": "Hitler's Nazi party came to power in Germany in",
            "marks": 1,
            "answer": "1933, when President Hindenburg offered him the Chancellorship on 30 January."
          },
          {
            "q": "The southernmost point of the Indian mainland is",
            "marks": 1,
            "answer": "Kanniyakumari. Indira Point in the Nicobar Islands is the southernmost point of Indian territory, but it is not on the mainland."
          },
          {
            "q": "The Standard Meridian of India is",
            "marks": 1,
            "answer": "82°30'E, passing through Mirzapur in Uttar Pradesh; the local time there is taken as Indian Standard Time."
          },
          {
            "q": "Which is the longest river of peninsular India?",
            "marks": 1,
            "answer": "The Godavari, often called the Dakshin Ganga, rising in the Western Ghats near Nashik."
          },
          {
            "q": "The 'Loo' is",
            "marks": 1,
            "answer": "A strong, hot and dry wind that blows over the northern plains during the day in May and June; exposure to it can be fatal."
          },
          {
            "q": "The vegetation type found in areas receiving over 200 cm of rainfall is",
            "marks": 1,
            "answer": "Tropical evergreen forest, which remains green throughout the year as the trees have no fixed time to shed leaves."
          },
          {
            "q": "A one-horned rhinoceros is found in the",
            "marks": 1,
            "answer": "Kaziranga National Park in Assam, in the swampy grasslands of the Brahmaputra valley."
          },
          {
            "q": "Democracy is a form of government in which",
            "marks": 1,
            "answer": "The rulers are elected by the people, who can change them through regular, free and fair elections."
          },
          {
            "q": "The Constituent Assembly of India adopted the Constitution on",
            "marks": 1,
            "answer": "26 November 1949, and it came into force on 26 January 1950."
          },
          {
            "q": "Which fundamental right is called 'the heart and soul of the Constitution' by Dr Ambedkar?",
            "marks": 1,
            "answer": "The Right to Constitutional Remedies, which allows a citizen to move the courts directly when a fundamental right is violated."
          },
          {
            "q": "The minimum age to vote in India is",
            "marks": 1,
            "answer": "18 years, lowered from 21 by the 61st Constitutional Amendment in 1988."
          },
          {
            "q": "The head of the Election Commission of India is the",
            "marks": 1,
            "answer": "Chief Election Commissioner, appointed by the President but not removable by the government, which secures the Commission's independence."
          },
          {
            "q": "Poverty line in India is determined on the basis of",
            "marks": 1,
            "answer": "A minimum level of income or consumption expenditure needed to satisfy basic needs — food measured in calories, along with clothing, footwear, fuel and light, education and medical requirements."
          },
          {
            "q": "The Public Distribution System is the government's chief instrument for",
            "marks": 1,
            "answer": "Ensuring food security — distributing foodgrains at subsidised prices through ration shops to those who need them."
          },
          {
            "q": "Assertion (A): The Constitution of India guarantees the Right to Equality. Reason (R): Untouchability has been abolished under Article 17.",
            "marks": 1,
            "answer": "(b) Both are true but R does not explain A. Abolishing untouchability is one specific provision within the Right to Equality, not the reason the right exists."
          },
          {
            "q": "Assertion (A): India has a monsoon type of climate. Reason (R): The direction of prevailing winds over India reverses between summer and winter.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. The word monsoon means a seasonal reversal of wind direction, which is precisely the phenomenon described in the reason."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 8,
        "instructions": "Answer all 4 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "What was the Reign of Terror in France?",
            "marks": 2,
            "answer": "It was the period from 1793 to 1794 during which Robespierre and the Jacobins governed with extreme severity. Anyone regarded as an enemy of the republic — nobles, clergy, and even members of his own party who disagreed — was arrested, tried by a revolutionary tribunal and, if convicted, guillotined. It ended when Robespierre himself was convicted and executed in July 1794."
          },
          {
            "q": "Why is the Indian subcontinent said to have a 'monsoon' climate?",
            "marks": 2,
            "answer": "Because the prevailing winds reverse direction with the seasons: in summer moist winds blow from the sea towards the land bringing heavy rain, and in winter dry winds blow from the land towards the sea. The rhythm of Indian agriculture and life is tied to this seasonal reversal, which is what the word monsoon denotes."
          },
          {
            "q": "What is a constitution? Why does a country need one?",
            "marks": 2,
            "answer": "A constitution is the supreme law that lays down the basic rules by which the people of a country live together — the form of government, the powers of each organ, and the rights of citizens. A country needs one so that power is exercised within agreed limits, so that citizens' rights are protected against the government of the day, and so that the different organs of the state know the boundaries of their authority."
          },
          {
            "q": "Distinguish between seasonal unemployment and disguised unemployment.",
            "marks": 2,
            "answer": "Seasonal unemployment occurs when people find work only during certain parts of the year and are idle in the rest, as farm labourers are between sowing and harvest. Disguised unemployment occurs when more people are employed on a task than are actually needed, so that removing some would leave output unchanged — as when eight members of a family work a field that four could manage."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 15,
        "instructions": "Answer all 5 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Explain any three causes of the French Revolution.",
            "marks": 3,
            "answer": "The first was the financial crisis: long wars and a lavish court had left the treasury empty, so the state raised taxes on a population already burdened. The second was the injustice of the estates system, in which the clergy and nobility enjoyed privileges and paid no taxes while the Third Estate paid all of them, including the tithe to the church and the taille to the state. The third was the spread of Enlightenment ideas: Locke, Montesquieu and Rousseau had argued against the divine right of kings and for a government based on the consent of the people, and these ideas circulated in salons and coffee-houses until the middle classes came to see the existing order as neither natural nor necessary."
          },
          {
            "q": "Describe any three features of the Himalayan rivers that distinguish them from peninsular rivers.",
            "marks": 3,
            "answer": "Himalayan rivers are perennial: they are fed by both rainfall and the melting of Himalayan snow, so they carry water throughout the year, whereas peninsular rivers depend on rain alone and shrink greatly in the dry season. They have long courses from the mountains to the sea and perform intense erosion, carrying enormous loads of silt that build the fertile northern plains and large deltas. And they meander freely over the flat plains, forming ox-bow lakes and shifting their channels, while the peninsular rivers flow in shallow, largely fixed valleys carved into hard rock."
          },
          {
            "q": "What is the role of the Election Commission in conducting free and fair elections in India?",
            "marks": 3,
            "answer": "The Election Commission is an independent body that takes every decision concerning the conduct of elections, from announcing the schedule to declaring the results. It prepares and revises the electoral rolls, allots symbols to parties, and enforces the Model Code of Conduct, ordering candidates and parties to stop practices that violate it. During the election period the government machinery works under its direction rather than under the ministers, and it can order a repoll or countermand an election where malpractice is found. Its independence is protected because the Chief Election Commissioner, once appointed, cannot be removed by the government."
          },
          {
            "q": "Explain any three causes of poverty in India.",
            "marks": 3,
            "answer": "One cause is the low rate of growth for several decades after independence, especially in agriculture, which left too few jobs for a rapidly growing population. A second is the unequal distribution of land and other resources: those without land or capital depend on irregular wage labour, and land reforms were poorly implemented in most states. A third is high indebtedness combined with social obligations: small farmers borrow at high interest to meet the cost of cultivation and of ceremonies, and when the crop fails they cannot repay, which pushes them further into poverty rather than out of it."
          },
          {
            "q": "What is food security? Explain its three dimensions.",
            "marks": 3,
            "answer": "Food security means that food is available to all people at all times, in sufficient quantity and quality for an active and healthy life. Its first dimension is availability — enough food produced in the country, together with stocks and imports. The second is accessibility — food must be within reach of every person, which is a question of transport, distribution and the absence of discrimination. The third is affordability — a household must have enough income to buy sufficient, safe and nutritious food. A country can fail on the second or third even when the first is met, which is why India holds buffer stocks and runs a public distribution system."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 20,
        "instructions": "Answer all 4 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "Describe the circumstances that led to the Russian Revolution of 1917 and its immediate effects.",
            "marks": 5,
            "answer": "By 1917 Russia was an autocracy under Tsar Nicholas II, with no parliament worth the name and a police force that suppressed opposition. The vast majority were peasants who wanted the land of the nobility, and the small industrial working class endured long hours in dangerous factories on very low wages. The First World War made every grievance worse: Russia suffered enormous casualties, supplies of food and fuel failed in the cities, and the Tsar's decision to take personal command of the army linked every defeat to him. In February 1917 strikes and bread riots in Petrograd, joined by soldiers who refused to fire on the crowds, forced the Tsar to abdicate, and a Provisional Government took over. It continued the war and delayed land reform, so support shifted to the Bolsheviks under Lenin, whose slogan promised peace, land and bread. In October 1917 they seized power. The immediate effects were the withdrawal of Russia from the war by the Treaty of Brest-Litovsk, the nationalisation of land, banks and industry, and the beginning of a civil war between the Reds and the Whites which the Bolsheviks eventually won."
          },
          {
            "q": "Explain the mechanism of the Indian monsoon and describe the four seasons of India.",
            "marks": 5,
            "answer": "The monsoon arises from the differential heating of land and sea. In summer the landmass of Asia heats rapidly and a low-pressure area develops over north-western India, while the Indian Ocean stays comparatively cool and remains at higher pressure. Air therefore moves from sea to land, and these moisture-laden south-west winds bring rain. In winter the pattern reverses: the land cools faster than the sea, a high-pressure area forms over the north, and dry winds blow outward from land to sea. The shift of the Inter-Tropical Convergence Zone northwards in summer and the presence of the jet streams strengthen the reversal. India has four seasons. The cold weather season, from mid-November to February, brings clear skies, low temperatures and some rain in the north-west from western disturbances. The hot weather season, from March to May, brings rising temperatures, the loo, and local storms. The advancing monsoon, from June to September, brings the bulk of the country's rainfall as the south-west monsoon breaks. The retreating monsoon, in October and November, brings clear skies, oppressive humidity known as October heat, and cyclones on the eastern coast."
          },
          {
            "q": "'Democracy is better than other forms of government.' Give any five arguments in support.",
            "marks": 5,
            "answer": "First, a democratic government is more accountable, because it must answer to the people at regular elections and can be removed by them. Second, it improves the quality of decision-making: decisions pass through discussion, negotiation and consultation, so hasty or irresponsible choices are less likely. Third, it provides a peaceful method of handling differences and conflicts, since no single group can impose its will permanently and every group has a legitimate way to press its case. Fourth, it enhances the dignity of the citizen, because every adult has one vote of equal value, which recognises each person as an equal member of the political community regardless of wealth or caste. Fifth, democracy allows its own mistakes to be corrected: there is room for public criticism, a free press can expose failures, and a government that persists in error can be voted out — no other form of government has this built-in mechanism for self-correction."
          },
          {
            "q": "What is the difference between fundamental rights and directive principles? Describe any three fundamental rights guaranteed by the Indian Constitution.",
            "marks": 5,
            "answer": "Fundamental rights are justiciable — a citizen can go to court if they are violated, and the courts can strike down a law that infringes them. Directive principles are guidelines to the state for making policy; they are not enforceable in court, though they are fundamental to the governance of the country. Rights protect the individual against the state, while directive principles direct the state towards social and economic welfare. Among the fundamental rights, the Right to Equality guarantees equality before the law and forbids discrimination on grounds of religion, race, caste, sex or place of birth; it abolishes untouchability and titles. The Right to Freedom gives every citizen the freedom of speech and expression, assembly, association, movement, residence and the practice of any profession, subject to reasonable restrictions, and protects life and personal liberty. The Right against Exploitation forbids trafficking in human beings, forced labour and begar, and prohibits the employment of children below fourteen in hazardous work."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — In the summer of 1789 the price of bread rose sharply in France. Crowds of angry women stormed into bakers' shops, and on 14 July a mob attacked the Bastille. (i) Why had bread become so expensive? (ii) What did the Bastille symbolise? (iii) Name the document adopted in August 1789. (iv) State any one right it declared.",
            "marks": 4,
            "answer": "(i) A series of bad harvests had cut the supply of grain while the population was growing, so the price of bread rose faster than wages — a subsistence crisis. (ii) The Bastille was a fortress prison that held those imprisoned on the king's personal orders, so it stood for the despotic power of the monarchy; that is why the crowd attacked it rather than a more useful target. (iii) The Declaration of the Rights of Man and of the Citizen. (iv) It declared that men are born free and equal in rights, and it guaranteed the right to liberty, to property, to security and to resistance to oppression, along with freedom of speech and opinion."
          },
          {
            "q": "CASE STUDY 2 — A village in Rajasthan receives less than 50 cm of rain a year. The people grow bajra and rear goats and camels, and the natural vegetation consists of thorny bushes and acacia with long roots. (i) Name the vegetation type. (ii) Give two adaptations of these plants. (iii) Why is bajra suited to this region? (iv) Name one wildlife species of this region.",
            "marks": 4,
            "answer": "(i) Thorn forests and scrub, the vegetation of semi-arid regions. (ii) The leaves are reduced to thorns or are very small and thick, which cuts the loss of water by transpiration, and the roots are long and go deep to reach the water table far below the surface; stems are often fleshy and store water. (iii) Bajra is a hardy millet that needs little water, tolerates high temperature and poor sandy soil, and matures quickly, so it can complete its growth within the short rainy period. (iv) The Indian wild ass in the Rann of Kachchh, along with the desert fox, camel and the great Indian bustard."
          },
          {
            "q": "CASE STUDY 3 — In a village, a family of five owns two acres of land. During sowing and harvest all five work in the field; for the rest of the year there is little to do, but nobody leaves the farm. (i) Name the kind of unemployment during the idle months. (ii) Name the kind present even in the busy season if the same output could come from three workers. (iii) State one consequence for the family. (iv) Suggest one remedy.",
            "marks": 4,
            "answer": "(i) Seasonal unemployment, since work is available only in particular parts of the year. (ii) Disguised unemployment — the extra workers add nothing to output, so their marginal productivity is effectively zero even though they appear to be employed. (iii) The family's income has to support five people while being produced by the work of three, so income per head is very low and savings are impossible, keeping the household near or below the poverty line. (iv) Creating non-farm employment nearby — dairying, poultry, small-scale industry or work under employment guarantee schemes — and providing vocational training so that surplus workers can move into other occupations."
          }
        ]
      },
      {
        "name": "Section F — Map skill (5 marks)",
        "marks": 5,
        "instructions": "Answer all 5 questions. Each carries 1 mark. Take any outline map of India and mark each place you name — the answers give the location so you can check your marking.",
        "questions": [
          {
            "q": "Name the mountain range that forms the northern boundary of India, and the highest peak in the Indian portion of it.",
            "marks": 1,
            "answer": "The Himalayas, running roughly 2,400 km from the Indus valley in the west to the Brahmaputra in the east. Kangchenjunga in Sikkim, 8,586 m, is the highest peak within India."
          },
          {
            "q": "Name the river that rises at Gangotri and the state in which it enters the plains.",
            "marks": 1,
            "answer": "The Ganga, which rises at the Gangotri glacier in Uttarakhand and enters the plains at Haridwar in the same state."
          },
          {
            "q": "Name the plateau that lies between the Western and Eastern Ghats, and one state it covers.",
            "marks": 1,
            "answer": "The Deccan Plateau, a triangular landmass south of the Narmada, covering parts of Maharashtra, Karnataka, Telangana and Andhra Pradesh."
          },
          {
            "q": "Name the state through which the Standard Meridian of India passes near Mirzapur, and give the meridian.",
            "marks": 1,
            "answer": "Uttar Pradesh. The Standard Meridian is 82°30'E, and the local time along it is taken as Indian Standard Time."
          },
          {
            "q": "Name the national park in Assam famous for the one-horned rhinoceros, and the river valley it lies in.",
            "marks": 1,
            "answer": "Kaziranga National Park, in the floodplain of the Brahmaputra in Assam."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 9 Social Science?",
        "a": "History: French Revolution, Russian Revolution; Geography: Earth, climate; Civics: Constitution; Economics: poverty, sectors."
      },
      {
        "q": "Are map-based questions asked in the exam?",
        "a": "Yes, questions on physical features, countries, and capitals are common; practice map drawing regularly."
      },
      {
        "q": "How should I approach essay-type questions?",
        "a": "Plan your answer, write key points with examples, support with evidence, and organize logically."
      }
    ],
    "intro": "This is a full-length CBSE Class 9 Social Science paper built to the board's own pattern: 41 questions across six sections for 80 marks in 3 hours, drawing on History, Geography, Political Science and Economics in the proportions the board uses. Sections A to E run from objective to case-based, and Section F covers the map skill, phrased so you can name each location and then mark it on any outline map of India. Every question is followed by a full model answer."
  },
  {
    "slug": "class-12-maths",
    "classLevel": "Class 12",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 12 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 12 Mathematics paper built to the current board blueprint: 38 questions across five sections for 80 marks in 3 hours, spanning relations and functions, matrices and determinants, calculus, vectors and three-dimensional geometry, linear programming and probability. Section A is objective, Section E is case-based, and every question is followed by a fully worked solution with each step of the algebra shown.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "If A is a square matrix of order 3 and |A| = 5, then |2A| equals",
            "marks": 1,
            "answer": "40. For an n × n matrix, |kA| = kⁿ|A|, so |2A| = 2³ × 5 = 40."
          },
          {
            "q": "If A is a 3 × 3 matrix with |A| = 4, then |adj A| equals",
            "marks": 1,
            "answer": "16. |adj A| = |A|ⁿ⁻¹ = 4² = 16 for n = 3."
          },
          {
            "q": "The principal value of sin⁻¹(−1/2) is",
            "marks": 1,
            "answer": "−π/6. The principal branch of sin⁻¹ is [−π/2, π/2], and sin(−π/6) = −1/2."
          },
          {
            "q": "The value of tan⁻¹(1) + cos⁻¹(−1/2) is",
            "marks": 1,
            "answer": "11π/12. tan⁻¹(1) = π/4 and cos⁻¹(−1/2) = 2π/3, so the sum is 3π/12 + 8π/12 = 11π/12."
          },
          {
            "q": "The function f(x) = |x| is",
            "marks": 1,
            "answer": "Continuous everywhere but not differentiable at x = 0, where the left-hand derivative is −1 and the right-hand derivative is +1."
          },
          {
            "q": "If y = log(sin x), then dy/dx equals",
            "marks": 1,
            "answer": "cot x. By the chain rule dy/dx = (1/sin x)·cos x = cot x."
          },
          {
            "q": "The derivative of x^x with respect to x is",
            "marks": 1,
            "answer": "x^x(1 + log x). Taking logs, log y = x log x; differentiating, (1/y)y' = log x + 1, so y' = x^x(1 + log x)."
          },
          {
            "q": "The interval in which f(x) = x² − 4x + 6 is strictly increasing is",
            "marks": 1,
            "answer": "(2, ∞). f'(x) = 2x − 4 > 0 when x > 2."
          },
          {
            "q": "∫ (1/x) dx equals",
            "marks": 1,
            "answer": "log|x| + C. The modulus is required because the integrand is defined for negative x as well."
          },
          {
            "q": "∫₀^(π/2) sin x dx equals",
            "marks": 1,
            "answer": "1. The antiderivative is −cos x, and [−cos x]₀^(π/2) = −0 − (−1) = 1."
          },
          {
            "q": "The area bounded by the curve y = x², the x-axis and the lines x = 0 and x = 3 is",
            "marks": 1,
            "answer": "9 square units. ∫₀³ x² dx = [x³/3]₀³ = 27/3 = 9."
          },
          {
            "q": "The order and degree of the differential equation (d²y/dx²)³ + (dy/dx)² = 0 are",
            "marks": 1,
            "answer": "Order 2 and degree 3. The order is that of the highest derivative, and the degree is its power once the equation is polynomial in the derivatives."
          },
          {
            "q": "The integrating factor of dy/dx + y = e^x is",
            "marks": 1,
            "answer": "e^x. For dy/dx + Py = Q the integrating factor is e^∫P dx, and here P = 1."
          },
          {
            "q": "If vectors a and b are perpendicular, then",
            "marks": 1,
            "answer": "Their dot product is zero, a·b = 0, since a·b = |a||b|cos 90° = 0."
          },
          {
            "q": "The magnitude of the vector 2i − 3j + 6k is",
            "marks": 1,
            "answer": "7. √(4 + 9 + 36) = √49 = 7."
          },
          {
            "q": "The angle between the lines with direction ratios (1, 0, 0) and (0, 1, 0) is",
            "marks": 1,
            "answer": "90°. cos θ = (1·0 + 0·1 + 0·0)/(1 × 1) = 0, so θ = π/2."
          },
          {
            "q": "If P(A) = 0.3, P(B) = 0.4 and A and B are independent, then P(A ∩ B) equals",
            "marks": 1,
            "answer": "0.12. For independent events P(A ∩ B) = P(A)·P(B) = 0.3 × 0.4 = 0.12."
          },
          {
            "q": "A die is thrown twice. The probability of getting a sum of 9 is",
            "marks": 1,
            "answer": "1/9. The favourable outcomes are (3,6), (4,5), (5,4) and (6,3) — four out of 36, which is 1/9."
          },
          {
            "q": "Assertion (A): The relation R on the set {1, 2, 3} given by R = {(1,1), (2,2), (3,3)} is an equivalence relation. Reason (R): A relation is an equivalence relation if it is reflexive, symmetric and transitive.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. R contains every (a, a) so it is reflexive, and having no other pairs it is vacuously symmetric and transitive — it satisfies exactly the three conditions in the reason."
          },
          {
            "q": "Assertion (A): The function f(x) = x³ has a local maximum at x = 0. Reason (R): f'(0) = 0 for this function.",
            "marks": 1,
            "answer": "(d) A is false, R is true. f'(0) = 0 indeed, but the sign of f' does not change at 0, so x = 0 is a point of inflection, not a maximum — a vanishing derivative alone does not establish an extremum."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Show that the relation R on the set of integers defined by aRb if a − b is even, is symmetric.",
            "marks": 2,
            "answer": "Suppose aRb, so a − b is even, say a − b = 2k for an integer k. Then b − a = −2k, which is also even, so bRa holds. Since aRb implies bRa for all integers a and b, the relation is symmetric."
          },
          {
            "q": "Find dy/dx if y = sin⁻¹(2x√(1 − x²)).",
            "marks": 2,
            "answer": "Put x = sin θ, so √(1 − x²) = cos θ and 2x√(1 − x²) = 2 sin θ cos θ = sin 2θ. Then y = sin⁻¹(sin 2θ) = 2θ = 2 sin⁻¹x, and dy/dx = 2/√(1 − x²)."
          },
          {
            "q": "Evaluate ∫ x·e^x dx.",
            "marks": 2,
            "answer": "Integrate by parts with u = x and dv = e^x dx, so du = dx and v = e^x. Then ∫x e^x dx = x e^x − ∫e^x dx = x e^x − e^x + C = e^x(x − 1) + C."
          },
          {
            "q": "Find a unit vector in the direction of a = 3i + 4j.",
            "marks": 2,
            "answer": "|a| = √(9 + 16) = 5, so the unit vector is â = a/|a| = (3i + 4j)/5, that is (3/5)i + (4/5)j."
          },
          {
            "q": "If A and B are events with P(A) = 0.5, P(B) = 0.3 and P(A ∩ B) = 0.2, find P(A | B).",
            "marks": 2,
            "answer": "P(A | B) = P(A ∩ B)/P(B) = 0.2/0.3 = 2/3 ≈ 0.667."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 18,
        "instructions": "Answer all 6 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Prove that the function f(x) = 2x³ − 6x² + 6x + 5 is increasing for all real x.",
            "marks": 3,
            "answer": "f'(x) = 6x² − 12x + 6 = 6(x² − 2x + 1) = 6(x − 1)². A square is never negative, so f'(x) ≥ 0 for every real x, with equality only at the single point x = 1. A function whose derivative is non-negative throughout, vanishing only at isolated points, is increasing on the whole real line."
          },
          {
            "q": "Evaluate ∫ (2x + 3)/((x + 1)(x + 2)) dx using partial fractions.",
            "marks": 3,
            "answer": "Write (2x + 3)/((x+1)(x+2)) = A/(x+1) + B/(x+2), so 2x + 3 = A(x+2) + B(x+1). Putting x = −1 gives 1 = A, and x = −2 gives −1 = −B, so B = 1. The integral is ∫dx/(x+1) + ∫dx/(x+2) = log|x+1| + log|x+2| + C = log|(x+1)(x+2)| + C."
          },
          {
            "q": "Solve the differential equation dy/dx = (1 + y²)/(1 + x²).",
            "marks": 3,
            "answer": "The variables separate: dy/(1 + y²) = dx/(1 + x²). Integrating both sides gives tan⁻¹y = tan⁻¹x + C. Taking the tangent of both sides, the solution can also be written as y = tan(tan⁻¹x + C)."
          },
          {
            "q": "Find the area of the triangle with vertices A(1, 1, 1), B(1, 2, 3) and C(2, 3, 1) using vectors.",
            "marks": 3,
            "answer": "AB = (0, 1, 2) and AC = (1, 2, 0). Their cross product is AB × AC = i(1·0 − 2·2) − j(0·0 − 2·1) + k(0·2 − 1·1) = (−4, 2, −1). Its magnitude is √(16 + 4 + 1) = √21. The area of the triangle is half of this, √21/2 square units."
          },
          {
            "q": "Find the shortest distance between the lines r = i + j + λ(2i − j + k) and r = 2i + j − k + μ(3i − 5j + 2k).",
            "marks": 3,
            "answer": "Here a₂ − a₁ = (1, 0, −1), b₁ = (2, −1, 1) and b₂ = (3, −5, 2). Now b₁ × b₂ = i((−1)(2) − (1)(−5)) − j((2)(2) − (1)(3)) + k((2)(−5) − (−1)(3)) = (3, −1, −7), with magnitude √(9 + 1 + 49) = √59. The shortest distance is |(a₂ − a₁)·(b₁ × b₂)|/|b₁ × b₂| = |3 + 0 + 7|/√59 = 10/√59 units."
          },
          {
            "q": "A bag contains 4 red and 6 black balls. Two balls are drawn at random without replacement. Find the probability that both are red.",
            "marks": 3,
            "answer": "P(first red) = 4/10. After removing one red ball, 3 red remain among 9, so P(second red | first red) = 3/9. By the multiplication rule the probability that both are red is (4/10) × (3/9) = 12/90 = 2/15."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 20,
        "instructions": "Answer all 4 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "Solve the system of equations using matrices: x + 2y + z = 7, x + 3z = 11, 2x − 3y = 1.",
            "marks": 5,
            "answer": "Write AX = B with A = [[1,2,1],[1,0,3],[2,−3,0]], X = [x,y,z]ᵀ and B = [7,11,1]ᵀ. Expanding along the first row, |A| = 1(0·0 − 3·(−3)) − 2(1·0 − 3·2) + 1(1·(−3) − 0·2) = 9 + 12 − 3 = 18, which is non-zero, so a unique solution exists. Solving by elimination: from the second equation x = 11 − 3z. Substituting into the third, 2(11 − 3z) − 3y = 1 gives 22 − 6z − 3y = 1, so 3y = 21 − 6z and y = 7 − 2z. Substituting both into the first, (11 − 3z) + 2(7 − 2z) + z = 7 gives 11 − 3z + 14 − 4z + z = 7, so 25 − 6z = 7 and z = 3. Then x = 11 − 9 = 2 and y = 7 − 6 = 1. Hence x = 2, y = 1, z = 3."
          },
          {
            "q": "Find the area of the region bounded by the parabola y² = 4x and the line y = 2x.",
            "marks": 5,
            "answer": "Find the intersections: substituting y = 2x into y² = 4x gives 4x² = 4x, so x² = x and x = 0 or x = 1. The points are (0, 0) and (1, 2). For a given x between 0 and 1 the parabola gives y = 2√x and the line gives y = 2x, and since √x ≥ x on this interval the parabola lies above. The area is ∫₀¹ (2√x − 2x) dx = [2·(2/3)x^(3/2) − x²]₀¹ = 4/3 − 1 = 1/3 square units."
          },
          {
            "q": "A manufacturer produces two products A and B. Each unit of A needs 2 hours on machine I and 1 hour on machine II; each unit of B needs 1 hour on machine I and 2 hours on machine II. Machine I is available for 10 hours and machine II for 8 hours. Profit is ₹50 per unit of A and ₹40 per unit of B. Formulate as an LPP and find the maximum profit.",
            "marks": 5,
            "answer": "Let x units of A and y units of B be produced. Maximise Z = 50x + 40y subject to 2x + y ≤ 10, x + 2y ≤ 8, x ≥ 0 and y ≥ 0. The corner points of the feasible region are (0, 0), (5, 0), (0, 4) and the intersection of the two constraint lines. Solving 2x + y = 10 with x + 2y = 8: doubling the second gives 2x + 4y = 16, and subtracting the first gives 3y = 6, so y = 2 and x = 4. Evaluating Z: at (0,0) it is 0, at (5,0) it is 250, at (0,4) it is 160, and at (4,2) it is 200 + 80 = 280. The maximum profit is ₹280, obtained by making 4 units of A and 2 units of B."
          },
          {
            "q": "A factory has three machines producing 25%, 35% and 40% of the total output, with defect rates of 5%, 4% and 2% respectively. An item drawn at random is found defective. Find the probability that it was produced by the third machine.",
            "marks": 5,
            "answer": "Let E₁, E₂ and E₃ be the events that the item came from machines 1, 2 and 3, with P(E₁) = 0.25, P(E₂) = 0.35 and P(E₃) = 0.40, and let D be the event that it is defective, with P(D|E₁) = 0.05, P(D|E₂) = 0.04 and P(D|E₃) = 0.02. By the law of total probability, P(D) = 0.25(0.05) + 0.35(0.04) + 0.40(0.02) = 0.0125 + 0.014 + 0.008 = 0.0345. By Bayes' theorem, P(E₃|D) = 0.008/0.0345 = 80/345 = 16/69 ≈ 0.232. So there is about a 23.2% chance the defective item came from the third machine."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A window is in the shape of a rectangle surmounted by a semicircle, and its total perimeter is 10 m. Let the width of the rectangle be 2x and its height h. (i) Express the perimeter in terms of x and h. (ii) Express the area of the window in terms of x. (iii) Find the value of x that maximises the area.",
            "marks": 4,
            "answer": "(i) The perimeter consists of the two vertical sides, the base and the semicircular arc: P = 2h + 2x + πx = 10. (ii) From that, h = (10 − 2x − πx)/2. The area is the rectangle plus the semicircle: A = 2x·h + ½πx² = x(10 − 2x − πx) + ½πx² = 10x − 2x² − πx² + ½πx² = 10x − 2x² − ½πx². (iii) dA/dx = 10 − 4x − πx, which vanishes when x = 10/(4 + π) ≈ 1.40 m. Since d²A/dx² = −(4 + π) < 0, this gives a maximum."
          },
          {
            "q": "CASE STUDY 2 — The number of bacteria in a culture grows at a rate proportional to the number present. The culture starts with 1000 bacteria and doubles in 2 hours. (i) Write the differential equation. (ii) Solve it for N(t). (iii) Find the growth constant k. (iv) How many bacteria are present after 6 hours?",
            "marks": 4,
            "answer": "(i) dN/dt = kN, where N is the number of bacteria and k the growth constant. (ii) Separating variables, dN/N = k dt, so log N = kt + C and N = N₀e^(kt), with N₀ = 1000. (iii) Doubling in 2 hours means 2000 = 1000e^(2k), so e^(2k) = 2, giving 2k = log 2 and k = (log 2)/2 ≈ 0.3466 per hour. (iv) After 6 hours — three doubling periods — N = 1000 × 2³ = 8000 bacteria."
          },
          {
            "q": "CASE STUDY 3 — Two friends each throw a fair die once. (i) Write the sample space size. (ii) Find the probability that both get the same number. (iii) Find the probability that the sum is at least 10. (iv) Find the probability that at least one gets a six.",
            "marks": 4,
            "answer": "(i) Each die has 6 outcomes, so the sample space has 6 × 6 = 36 equally likely outcomes. (ii) The matching outcomes are (1,1) through (6,6), six in all, so the probability is 6/36 = 1/6. (iii) A sum of at least 10 arises from (4,6), (5,5), (6,4), (5,6), (6,5) and (6,6) — six outcomes, giving 6/36 = 1/6. (iv) It is easier to use the complement: neither shows a six in 5 × 5 = 25 outcomes, so P(at least one six) = 1 − 25/36 = 11/36."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Maths board exam?",
        "a": "100 marks total: 80 marks for theory and 20 marks for internal assessment."
      },
      {
        "q": "Which chapters have highest weightage?",
        "a": "Calculus (integration and differentiation), linear algebra, and probability have significant weightage."
      },
      {
        "q": "Is a calculator allowed in the exam?",
        "a": "Non-programmable scientific calculators are allowed only for certain questions."
      }
    ]
  },
  {
    "slug": "class-12-physics",
    "classLevel": "Class 12",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 12 Physics Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 12 Physics paper built to the current board blueprint: 33 questions across five sections for 70 marks in 3 hours, the 30 remaining marks being the practical component assessed in school. Section A is objective, Section D is case-based and Section E carries the long derivations. Every question is followed by a complete worked solution with the derivation set out step by step.",
    "duration": "3 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 16,
        "instructions": "Questions 1–14 are multiple choice. Questions 15 and 16 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "Two point charges each of +2 μC are placed 30 cm apart in air. The force between them is",
            "marks": 1,
            "answer": "0.4 N, repulsive. F = kq₁q₂/r² = (9 × 10⁹)(2 × 10⁻⁶)²/(0.3)² = (9 × 10⁹)(4 × 10⁻¹²)/0.09 = 0.4 N."
          },
          {
            "q": "The electric field inside a charged hollow conductor in electrostatic equilibrium is",
            "marks": 1,
            "answer": "Zero. Charge resides entirely on the outer surface and the field inside the conducting material and cavity is zero, which is the basis of electrostatic shielding."
          },
          {
            "q": "The capacitance of a parallel plate capacitor is doubled when",
            "marks": 1,
            "answer": "The separation between the plates is halved. C = ε₀A/d, so halving d doubles C (equivalently, doubling the plate area also doubles it)."
          },
          {
            "q": "The drift velocity of electrons in a conductor is of the order of",
            "marks": 1,
            "answer": "10⁻⁴ m/s — less than a millimetre per second, even though the electrical signal itself travels at nearly the speed of light."
          },
          {
            "q": "The resistance of a wire is R. If it is stretched to twice its original length, its new resistance is",
            "marks": 1,
            "answer": "4R. Stretching keeps the volume constant, so doubling the length halves the area; R = ρl/A becomes ρ(2l)/(A/2) = 4ρl/A = 4R."
          },
          {
            "q": "A charged particle moving parallel to a uniform magnetic field experiences a force of magnitude",
            "marks": 1,
            "answer": "Zero. F = qvB sin θ and θ = 0°, so sin θ = 0 and the force vanishes."
          },
          {
            "q": "The magnetic field at the centre of a circular coil of n turns, radius r, carrying current I is",
            "marks": 1,
            "answer": "B = μ₀nI/2r, directed along the axis of the coil as given by the right-hand rule."
          },
          {
            "q": "Lenz's law is a consequence of the law of conservation of",
            "marks": 1,
            "answer": "Energy. The induced current always opposes the change producing it, so work must be done against that opposition — otherwise energy would be created from nothing."
          },
          {
            "q": "In a purely inductive AC circuit, the current",
            "marks": 1,
            "answer": "Lags the voltage by π/2 (90°). The inductor opposes the change in current, so the current peaks a quarter cycle after the voltage."
          },
          {
            "q": "Electromagnetic waves are produced by",
            "marks": 1,
            "answer": "Accelerated charges. A charge at rest gives only an electrostatic field and one in uniform motion only a steady magnetic field; acceleration is required to radiate."
          },
          {
            "q": "The refractive index of a medium for which the critical angle is 30° is",
            "marks": 1,
            "answer": "2. n = 1/sin C = 1/sin 30° = 1/0.5 = 2."
          },
          {
            "q": "In Young's double slit experiment, the fringe width is doubled when",
            "marks": 1,
            "answer": "The distance between the slits is halved. β = λD/d, so halving d doubles β (as would doubling D)."
          },
          {
            "q": "The stopping potential in a photoelectric experiment depends on",
            "marks": 1,
            "answer": "The frequency of the incident light and the work function of the metal — not on the intensity, which affects only the number of photoelectrons."
          },
          {
            "q": "In a p-n junction diode under forward bias, the width of the depletion layer",
            "marks": 1,
            "answer": "Decreases. Forward bias opposes the built-in potential, so the depletion region narrows and the current rises steeply."
          },
          {
            "q": "Assertion (A): The nucleus of an atom contains most of its mass. Reason (R): Protons and neutrons are much more massive than electrons.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. A proton or neutron is about 1836 times the mass of an electron, so nearly all the mass sits in the nucleus."
          },
          {
            "q": "Assertion (A): A convex lens behaves as a diverging lens when immersed in a liquid of higher refractive index. Reason (R): The focal length of a lens depends on the refractive index of the surrounding medium.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. By the lens maker's formula 1/f = (n_lens/n_medium − 1)(1/R₁ − 1/R₂), if n_medium exceeds n_lens the bracket changes sign and the lens diverges."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Define electric flux and write its SI unit.",
            "marks": 2,
            "answer": "Electric flux through a surface is the total number of electric field lines crossing it, defined as Φ = ∮E·dA, the surface integral of the electric field over the area. Its SI unit is the newton metre squared per coulomb (N m² C⁻¹), equivalently the volt metre."
          },
          {
            "q": "State Kirchhoff's two rules for electrical networks.",
            "marks": 2,
            "answer": "Junction rule: the algebraic sum of currents meeting at any junction is zero, which expresses conservation of charge. Loop rule: the algebraic sum of the changes in potential around any closed loop is zero, which expresses conservation of energy."
          },
          {
            "q": "Write the expression for the force per unit length between two long parallel current-carrying conductors and state when it is attractive.",
            "marks": 2,
            "answer": "F/l = μ₀I₁I₂/(2πd), where d is the separation. The force is attractive when the currents flow in the same direction and repulsive when they are antiparallel."
          },
          {
            "q": "Distinguish between the resistance and the impedance of an AC circuit.",
            "marks": 2,
            "answer": "Resistance opposes current in a purely resistive circuit and dissipates energy, and it is independent of frequency. Impedance is the total opposition of a circuit containing resistance together with inductance or capacitance, Z = √(R² + (X_L − X_C)²); it depends on frequency and its reactive part stores rather than dissipates energy."
          },
          {
            "q": "Define the term 'mass defect' and relate it to binding energy.",
            "marks": 2,
            "answer": "Mass defect Δm is the difference between the sum of the masses of the free nucleons and the actual mass of the nucleus they form. This missing mass appears as the binding energy that holds the nucleus together, given by E = Δm·c²."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 21,
        "instructions": "Answer all 7 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Derive an expression for the electric field on the axis of an electric dipole at a distance r from its centre, for r far greater than the dipole length.",
            "marks": 3,
            "answer": "Take charges −q at −a and +q at +a on the axis, so the dipole moment is p = q(2a). At an axial point distance r from the centre, the field from +q is kq/(r − a)² directed outward and from −q is kq/(r + a)² directed inward. The resultant is E = kq[1/(r − a)² − 1/(r + a)²] = kq·4ar/(r² − a²)². For r ≫ a the denominator becomes r⁴, giving E = 4kqar/r⁴ = 2kp/r³, directed along the dipole moment."
          },
          {
            "q": "Two capacitors of 3 μF and 6 μF are connected first in series and then in parallel across a 12 V supply. Find the equivalent capacitance and the total charge in each case.",
            "marks": 3,
            "answer": "In series: 1/C = 1/3 + 1/6 = 1/2, so C = 2 μF and Q = CV = 2 × 12 = 24 μC (the same charge on each capacitor). In parallel: C = 3 + 6 = 9 μF and Q = 9 × 12 = 108 μC total, shared as 36 μC and 72 μC. The parallel combination therefore stores four and a half times the charge."
          },
          {
            "q": "State the principle of a potentiometer and explain why it is preferred over a voltmeter for measuring emf.",
            "marks": 3,
            "answer": "A potentiometer works on the principle that when a steady current flows through a wire of uniform cross-section, the potential difference across any portion is directly proportional to its length: V ∝ l. At the balance point no current is drawn from the cell being measured, so the potentiometer measures the true emf rather than the terminal voltage. A voltmeter, having finite resistance, always draws some current, so the reading falls short of the emf by the drop across the cell's internal resistance."
          },
          {
            "q": "Derive the expression for the torque on a rectangular current-carrying loop placed in a uniform magnetic field.",
            "marks": 3,
            "answer": "Consider a rectangular loop of sides l and b carrying current I in a uniform field B, with the normal to the loop at angle θ to B. The forces on the two sides of length b are equal, opposite and along the same line, so they cancel. The forces on the two sides of length l are F = BIl each, opposite in direction but separated by a perpendicular distance b sin θ, so they form a couple. The torque is τ = BIl × b sin θ = BIA sin θ, where A = lb; for n turns τ = nBIA sin θ, or in vector form τ = m × B with m = nIA."
          },
          {
            "q": "A coil of 100 turns and area 0.05 m² is placed in a magnetic field which falls uniformly from 0.8 T to 0.2 T in 0.1 s. Calculate the induced emf.",
            "marks": 3,
            "answer": "The change in flux per turn is ΔΦ = A·ΔB = 0.05 × (0.8 − 0.2) = 0.03 Wb. By Faraday's law the magnitude of the induced emf is ε = N·ΔΦ/Δt = 100 × 0.03/0.1 = 30 V. By Lenz's law the induced current flows so as to oppose the decrease, that is, to maintain the original flux."
          },
          {
            "q": "Draw a labelled ray diagram of a compound microscope in normal adjustment and write its magnifying power.",
            "marks": 3,
            "answer": "The object is placed just beyond the focus of the short-focal-length objective, which forms a real, inverted, magnified image inside the focal length of the eyepiece; the eyepiece then acts as a simple magnifier and the final image is virtual, inverted relative to the object and highly magnified, formed at the least distance of distinct vision. The magnifying power is m = m₀ × mₑ = (v₀/u₀)(1 + D/fₑ), where D is 25 cm."
          },
          {
            "q": "Explain the photoelectric effect and state two observations that the wave theory of light fails to explain.",
            "marks": 3,
            "answer": "The photoelectric effect is the emission of electrons from a metal surface when light of sufficiently high frequency falls on it; Einstein explained it by treating light as photons of energy hν, giving hν = φ₀ + K_max. Wave theory fails on two counts. First, there is a threshold frequency below which no emission occurs however intense the light, whereas waves should eventually supply enough energy at any frequency. Second, emission is instantaneous, whereas wave theory predicts a measurable time lag while the electron absorbs sufficient energy."
          }
        ]
      },
      {
        "name": "Section D — Case-based questions (4 marks each)",
        "marks": 8,
        "instructions": "Answer both case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A step-down transformer is used to run a 12 V, 24 W lamp from a 240 V AC mains supply. Assume the transformer is ideal. (i) Find the turns ratio Np : Ns. (ii) Find the current in the secondary. (iii) Find the current drawn from the mains. (iv) Why are transformer cores laminated?",
            "marks": 4,
            "answer": "(i) For an ideal transformer Np/Ns = Vp/Vs = 240/12 = 20, so the ratio is 20 : 1. (ii) Secondary current Is = P/Vs = 24/12 = 2 A. (iii) An ideal transformer conserves power, so Ip = P/Vp = 24/240 = 0.1 A. (iv) The core is laminated, with thin sheets separated by insulating varnish, to break up the paths available to eddy currents; this greatly reduces the eddy-current heat losses and improves efficiency."
          },
          {
            "q": "CASE STUDY 2 — Light of wavelength 600 nm falls on a double slit with slit separation 0.2 mm, and the interference pattern is observed on a screen 1.0 m away. (i) Calculate the fringe width. (ii) Where is the central maximum located and why is it bright? (iii) What happens to the pattern if the whole apparatus is immersed in water of refractive index 1.33?",
            "marks": 4,
            "answer": "(i) β = λD/d = (600 × 10⁻⁹ × 1.0)/(0.2 × 10⁻³) = 3 × 10⁻³ m = 3 mm. (ii) The central maximum lies on the perpendicular bisector of the two slits, equidistant from both; the path difference there is zero, so the waves arrive in phase and interfere constructively. (iii) In water the wavelength shortens to λ/n, so the fringe width becomes β/1.33 ≈ 2.26 mm — the pattern contracts, with the fringes closer together."
          }
        ]
      },
      {
        "name": "Section E — Long Answer (5 marks each)",
        "marks": 15,
        "instructions": "Answer all 3 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "(a) Using Gauss's law, derive the electric field due to an infinitely long uniformly charged straight wire of linear charge density λ. (b) A wire carries λ = 4 × 10⁻⁶ C/m; find the field 20 cm from it.",
            "marks": 5,
            "answer": "(a) By symmetry the field is radial and equal in magnitude at every point of a coaxial cylinder of radius r and length l. Choose that cylinder as the Gaussian surface. No flux crosses the flat ends because the field is parallel to them, so the flux is E × 2πrl through the curved surface. The charge enclosed is λl, so Gauss's law gives E × 2πrl = λl/ε₀, hence E = λ/(2πε₀r), directed away from the wire for positive λ. (b) E = (2 × 9 × 10⁹ × 4 × 10⁻⁶)/0.2 = 72 × 10³/0.2 = 3.6 × 10⁵ N/C, directed radially outward."
          },
          {
            "q": "(a) Derive the lens maker's formula for a thin lens. (b) A biconvex lens of refractive index 1.5 has both radii of curvature equal to 20 cm. Find its focal length and power.",
            "marks": 5,
            "answer": "(a) Refraction at the first surface takes an object at u to an image at v₁: n₂/v₁ − n₁/u = (n₂ − n₁)/R₁. This image acts as the object for the second surface: n₁/v − n₂/v₁ = (n₁ − n₂)/R₂. Adding the two equations eliminates v₁ and gives n₁(1/v − 1/u) = (n₂ − n₁)(1/R₁ − 1/R₂). Dividing by n₁ and using 1/v − 1/u = 1/f yields 1/f = (n − 1)(1/R₁ − 1/R₂) with n = n₂/n₁. (b) For a biconvex lens R₁ = +20 cm and R₂ = −20 cm, so 1/f = (1.5 − 1)(1/20 − 1/(−20)) = 0.5 × (2/20) = 1/20, giving f = 20 cm = 0.2 m. Power P = 1/f in metres = +5 D."
          },
          {
            "q": "(a) Draw a labelled circuit diagram of a full-wave rectifier using two diodes and explain its working. (b) Sketch the input and output waveforms. (c) State one advantage over a half-wave rectifier.",
            "marks": 5,
            "answer": "(a) A centre-tapped transformer feeds two diodes whose outputs join at a common load resistor. During the positive half cycle the upper diode is forward biased and conducts while the lower is reverse biased; during the negative half cycle the roles reverse. In both halves the current through the load flows in the same direction, so both halves of the input are used. (b) The input is a full sine wave alternating about zero; the output is a series of positive humps, one for each half cycle, touching zero between them. (c) A full-wave rectifier uses both half cycles, so its output frequency is twice the input and the ripple is far easier to smooth, and its rectification efficiency is about double that of a half-wave rectifier."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Physics board exam?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which topics have the highest weightage?",
        "a": "Electrostatics, magnetism, electromagnetic induction, and optics carry significant weightage."
      },
      {
        "q": "Are derivations important for the exam?",
        "a": "Yes, derivations of important laws and formulas are frequently asked and carry 3-4 marks."
      }
    ]
  },
  {
    "slug": "class-12-chemistry",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "board": "CBSE",
    "title": "CBSE Class 12 Chemistry Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 12 Chemistry paper built to the current board blueprint: 33 questions across five sections for 70 marks in 3 hours, the remaining 30 marks being the practical component assessed in school. Section A is objective, Section D is case-based and Section E carries the long answers. Every question is followed by a complete worked solution, with the reasoning and the calculation set out step by step rather than just a final value.",
    "duration": "3 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 16,
        "instructions": "Questions 1–14 are multiple choice. Questions 15 and 16 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The molal elevation constant of a solvent depends on",
            "marks": 1,
            "answer": "The nature of the solvent alone. Kb is a property of the solvent — it is independent of the solute added."
          },
          {
            "q": "Which of the following aqueous solutions has the highest boiling point at the same molality: glucose, NaCl, or CaCl₂?",
            "marks": 1,
            "answer": "CaCl₂. Elevation depends on the number of particles; CaCl₂ gives three ions (i ≈ 3) against two for NaCl and one for glucose."
          },
          {
            "q": "For a first-order reaction, the half-life is",
            "marks": 1,
            "answer": "Independent of the initial concentration, t½ = 0.693/k. This constancy is the standard test for first-order kinetics."
          },
          {
            "q": "The rate constant of a reaction doubles when the temperature rises by 10 K. This is explained by",
            "marks": 1,
            "answer": "The Arrhenius equation, k = Ae^(−Ea/RT): a small rise in T sharply increases the fraction of molecules with energy above Ea."
          },
          {
            "q": "The standard EMF of a cell with E°(cathode) = +0.34 V and E°(anode) = −0.76 V is",
            "marks": 1,
            "answer": "+1.10 V. E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V. This is the Daniell cell."
          },
          {
            "q": "The oxidation state of chromium in the dichromate ion, Cr₂O₇²⁻, is",
            "marks": 1,
            "answer": "+6. Let x be the oxidation state: 2x + 7(−2) = −2, so 2x = 12 and x = +6."
          },
          {
            "q": "Which of the following is a transition element: Zn, Sc, or Ca?",
            "marks": 1,
            "answer": "Sc. A transition element has a partly filled d subshell in its ground state or a common oxidation state; Zn is d¹⁰ throughout and Ca has no d electrons."
          },
          {
            "q": "The coordination number of the central metal in [Co(en)₃]³⁺ is",
            "marks": 1,
            "answer": "Six. Ethylenediamine is bidentate, so three molecules occupy six coordination sites."
          },
          {
            "q": "The IUPAC name of CH₃CH₂CHO is",
            "marks": 1,
            "answer": "Propanal. A three-carbon chain ending in −CHO takes the suffix -al."
          },
          {
            "q": "Which reagent distinguishes an aldehyde from a ketone?",
            "marks": 1,
            "answer": "Tollens' reagent (ammoniacal silver nitrate). An aldehyde reduces it to a silver mirror; a ketone does not."
          },
          {
            "q": "The compound formed when phenol is treated with bromine water is",
            "marks": 1,
            "answer": "2,4,6-tribromophenol, a white precipitate. The −OH group is strongly activating and ortho/para directing, so all three positions brominate."
          },
          {
            "q": "SN1 reactions proceed fastest with",
            "marks": 1,
            "answer": "Tertiary alkyl halides. The rate-determining step forms a carbocation, and a tertiary carbocation is the most stabilised by hyperconjugation and inductive effects."
          },
          {
            "q": "The monomer of natural rubber is",
            "marks": 1,
            "answer": "Isoprene (2-methyl-1,3-butadiene). Natural rubber is its cis-1,4 polymer."
          },
          {
            "q": "Insulin belongs to which class of biomolecules?",
            "marks": 1,
            "answer": "Proteins — it is a polypeptide hormone made of two chains linked by disulphide bridges."
          },
          {
            "q": "Assertion (A): Transition metals form coloured compounds. Reason (R): They have partly filled d orbitals allowing d–d electronic transitions.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. Absorption of visible light promotes a d electron to a higher d level, and the transmitted light gives the colour."
          },
          {
            "q": "Assertion (A): The boiling point of an aqueous solution is higher than that of pure water. Reason (R): The vapour pressure of the solution is lower than that of pure water.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. A non-volatile solute lowers vapour pressure, so a higher temperature is needed to reach atmospheric pressure."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Define molarity and molality, and state which one changes with temperature and why.",
            "marks": 2,
            "answer": "Molarity is the number of moles of solute per litre of solution; molality is the number of moles of solute per kilogram of solvent. Molarity changes with temperature because the volume of the solution expands or contracts, while molality does not, since mass is temperature-independent."
          },
          {
            "q": "State Raoult's law for a solution of a non-volatile solute in a volatile solvent.",
            "marks": 2,
            "answer": "The relative lowering of vapour pressure equals the mole fraction of the solute: (p° − p)/p° = x_solute. Equivalently, the vapour pressure of the solution equals the vapour pressure of the pure solvent multiplied by its mole fraction, p = p°·x_solvent."
          },
          {
            "q": "Write the cell reaction and the Nernst equation for the Daniell cell.",
            "marks": 2,
            "answer": "Cell reaction: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). Nernst equation at 298 K: Ecell = E°cell − (0.059/2)·log([Zn²⁺]/[Cu²⁺]), with n = 2 electrons transferred."
          },
          {
            "q": "What are lanthanoid contraction and one of its consequences?",
            "marks": 2,
            "answer": "Lanthanoid contraction is the steady decrease in atomic and ionic radii across the lanthanoid series, caused by the poor shielding of the nuclear charge by 4f electrons. As a consequence the second and third transition series have almost identical radii — for example Zr and Hf — which makes them chemically very hard to separate."
          },
          {
            "q": "Distinguish between an addition polymer and a condensation polymer, with one example of each.",
            "marks": 2,
            "answer": "An addition polymer forms by repeated addition of monomers containing double bonds, with no loss of any molecule — for example polythene from ethene. A condensation polymer forms by reaction between bifunctional monomers with the elimination of a small molecule such as water — for example nylon-6,6 from adipic acid and hexamethylenediamine."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 21,
        "instructions": "Answer all 7 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "A solution containing 18 g of glucose (molar mass 180 g/mol) in 500 g of water. Calculate its molality and the boiling point elevation. (Kb for water = 0.52 K kg/mol)",
            "marks": 3,
            "answer": "Moles of glucose = 18/180 = 0.1 mol. Molality = 0.1 mol / 0.5 kg = 0.2 mol/kg. Elevation ΔTb = Kb·m = 0.52 × 0.2 = 0.104 K, so the solution boils at about 100.10 °C."
          },
          {
            "q": "The rate constant of a first-order reaction is 2.303 × 10⁻³ s⁻¹. Calculate the time required for the reaction to be 90% complete.",
            "marks": 3,
            "answer": "For a first-order reaction t = (2.303/k)·log([A]₀/[A]). When 90% is complete, [A] = 0.1[A]₀, so the ratio is 10 and log 10 = 1. Therefore t = 2.303/(2.303 × 10⁻³) × 1 = 1000 s, that is about 16.7 minutes."
          },
          {
            "q": "Explain why transition metals show variable oxidation states, and give the common oxidation states of manganese.",
            "marks": 3,
            "answer": "In transition metals the (n−1)d and ns orbitals are very close in energy, so electrons from both can take part in bonding, and the energy needed to remove successive electrons rises only gradually. That allows several stable oxidation states differing by one unit. Manganese shows +2, +3, +4, +6 and +7, with +2 the most stable in aqueous solution and +7 in KMnO₄, its strongest oxidising form."
          },
          {
            "q": "Write the IUPAC names and draw the structures of the geometrical isomers of [Pt(NH₃)₂Cl₂].",
            "marks": 3,
            "answer": "The complex is square planar, so it has cis and trans isomers. In the cis isomer the two chloride ligands occupy adjacent corners, and it is named cis-diamminedichloridoplatinum(II) — this is the anticancer drug cisplatin. In the trans isomer the chlorides are diagonally opposite, giving trans-diamminedichloridoplatinum(II), which is biologically inactive."
          },
          {
            "q": "How do you convert ethanol to ethanoic acid, and ethanoic acid to ethanamide? Give the reagents and equations.",
            "marks": 3,
            "answer": "Ethanol is oxidised to ethanoic acid by acidified potassium dichromate: CH₃CH₂OH + 2[O] →(K₂Cr₂O₇/H⁺) CH₃COOH + H₂O. Ethanoic acid is converted to ethanamide by treating it with ammonia to give ammonium ethanoate, which on heating loses water: CH₃COOH + NH₃ → CH₃COONH₄ →(heat) CH₃CONH₂ + H₂O."
          },
          {
            "q": "Explain the mechanism of the SN2 reaction of bromomethane with hydroxide ion, and state its stereochemical outcome.",
            "marks": 3,
            "answer": "The hydroxide ion attacks the carbon from the side directly opposite the bromine, so bond formation and bond breaking happen together in a single step through a five-coordinate transition state in which the carbon is partially bonded to both. There is no intermediate. Because attack is from the back, the three remaining bonds turn inside out and the configuration is inverted — the Walden inversion. The rate depends on both reactants, so it is second order overall."
          },
          {
            "q": "Define enzymes and explain, with one example, why enzyme catalysis is highly specific.",
            "marks": 3,
            "answer": "Enzymes are biological catalysts, almost all globular proteins, that greatly accelerate reactions in living cells under mild conditions. Their specificity arises from the active site, a small pocket whose shape and chemical groups fit only a particular substrate, as a key fits one lock. Maltase, for instance, hydrolyses maltose but not sucrose, because only maltose fits the active site correctly."
          }
        ]
      },
      {
        "name": "Section D — Case-based questions (4 marks each)",
        "marks": 8,
        "instructions": "Answer both case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — Seawater freezes below 0 °C, and salt is spread on icy roads in cold countries to melt the ice. A student prepares a solution by dissolving 5.85 g of NaCl (molar mass 58.5 g/mol) in 1000 g of water. (Kf for water = 1.86 K kg/mol) (i) Which colligative property explains road salting? (ii) Calculate the molality. (iii) Calculate the expected freezing point, assuming complete dissociation.",
            "marks": 4,
            "answer": "(i) Depression of freezing point — the dissolved solute lowers the temperature at which ice and liquid are in equilibrium, so the ice melts. (ii) Moles of NaCl = 5.85/58.5 = 0.1 mol in 1 kg of water, so molality = 0.1 mol/kg. (iii) NaCl dissociates completely into two ions, so the van 't Hoff factor i = 2. ΔTf = i·Kf·m = 2 × 1.86 × 0.1 = 0.372 K, and the solution freezes at about −0.37 °C."
          },
          {
            "q": "CASE STUDY 2 — Aspirin, an ester of salicylic acid, is one of the most widely used medicines. It is prepared by treating salicylic acid with acetic anhydride. (i) Name the functional groups present in salicylic acid. (ii) Name the type of reaction used to make aspirin. (iii) Why is aspirin taken after food rather than on an empty stomach? (iv) Name the class of drug aspirin belongs to.",
            "marks": 4,
            "answer": "(i) Salicylic acid contains a carboxylic acid group (−COOH) and a phenolic hydroxyl group (−OH) on the benzene ring. (ii) Acetylation — an esterification in which the phenolic −OH is converted to an ester group by acetic anhydride. (iii) Aspirin is acidic and irritates the stomach lining, and can cause bleeding, so it is taken after food to reduce contact with the mucous membrane. (iv) It is an analgesic and antipyretic — a non-narcotic pain reliever that also reduces fever."
          }
        ]
      },
      {
        "name": "Section E — Long Answer (5 marks each)",
        "marks": 15,
        "instructions": "Answer all 3 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "(a) Define conductivity and molar conductivity, and give their units. (b) Explain how each varies with dilution for a strong electrolyte. (c) State Kohlrausch's law and one of its applications.",
            "marks": 5,
            "answer": "(a) Conductivity κ is the conductance of a solution held between two electrodes of unit area separated by unit distance, with units S m⁻¹. Molar conductivity Λm = κ/c is the conducting power of all the ions from one mole of electrolyte, with units S m² mol⁻¹. (b) On dilution, conductivity DECREASES, because the number of ions per unit volume falls. Molar conductivity INCREASES, because the total volume containing one mole of electrolyte rises and the ions move more freely; for a strong electrolyte it rises slowly and approaches a limiting value Λ°m. (c) Kohlrausch's law states that the limiting molar conductivity of an electrolyte is the sum of the individual contributions of its cation and anion. It allows Λ°m of a weak electrolyte such as acetic acid — which cannot be found by extrapolation — to be calculated from strong-electrolyte values, and hence its degree of dissociation and dissociation constant."
          },
          {
            "q": "(a) Give the structure of the amino acid glycine at physiological pH and explain why amino acids are amphoteric. (b) What is a peptide bond? (c) Distinguish between the primary and secondary structure of a protein. (d) What is denaturation?",
            "marks": 5,
            "answer": "(a) At physiological pH glycine exists as a zwitterion, ⁺H₃N−CH₂−COO⁻: the carboxyl group has donated its proton to the amino group. Amino acids are amphoteric because they carry both an acidic −COOH and a basic −NH₂ group, so they react with both acids and bases. (b) A peptide bond is the amide linkage −CO−NH− formed when the carboxyl group of one amino acid condenses with the amino group of the next, with the loss of water. (c) Primary structure is the sequence of amino acids in the chain, held by covalent peptide bonds. Secondary structure is the local folding of that chain into an α-helix or β-pleated sheet, held by hydrogen bonds between the backbone C=O and N−H groups. (d) Denaturation is the loss of secondary and tertiary structure — by heat, acid or heavy metal ions — leaving the primary structure intact; the protein loses its biological activity, as when egg white coagulates on boiling."
          },
          {
            "q": "(a) Explain the difference between an ideal and a non-ideal solution, with one example of each type of deviation. (b) A solution of two liquids shows a positive deviation from Raoult's law — comment on the sign of ΔHmix and ΔVmix. (c) What is an azeotrope, and why can such a mixture not be separated by fractional distillation?",
            "marks": 5,
            "answer": "(a) An ideal solution obeys Raoult's law at all compositions, with solute–solvent interactions equal in strength to the solute–solute and solvent–solvent interactions, so ΔHmix = 0 and ΔVmix = 0 — benzene and toluene, for example. A non-ideal solution disobeys it: a mixture of ethanol and acetone shows positive deviation, while chloroform and acetone show negative deviation because hydrogen bonding between unlike molecules is stronger. (b) In positive deviation the new interactions are WEAKER than the original ones, so energy is absorbed and the volume expands: ΔHmix is positive and ΔVmix is positive. (c) An azeotrope is a mixture that boils at a constant temperature and distils unchanged in composition, because at that composition the vapour has the same composition as the liquid. Fractional distillation separates components by exploiting the difference between vapour and liquid composition, and since no such difference exists at the azeotropic point, the method fails there."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Chemistry board exam?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which chapters have highest weightage?",
        "a": "Organic chemistry reactions, chemical kinetics, and coordination chemistry are high-weightage topics."
      },
      {
        "q": "Are chemical equations required in answers?",
        "a": "Yes, balanced chemical equations are essential for mechanism and reaction-based questions."
      }
    ]
  },
  {
    "slug": "class-12-biology",
    "classLevel": "Class 12",
    "subject": "Biology",
    "board": "CBSE",
    "title": "CBSE Class 12 Biology Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 12 Biology paper built to the current board blueprint: 33 questions across five sections for 70 marks in 3 hours, the remaining 30 marks being the practical component assessed in school. It covers reproduction, genetics and evolution, biology in human welfare, biotechnology and ecology in the proportions the board uses. Every question is followed by a complete worked answer written the way a full-credit board answer is expected to read.",
    "duration": "3 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 16,
        "instructions": "Questions 1–14 are multiple choice. Questions 15 and 16 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The part of the flower that develops into the fruit is the",
            "marks": 1,
            "answer": "The ovary. After fertilisation the ovary wall becomes the pericarp of the fruit, while the ovules become the seeds."
          },
          {
            "q": "Double fertilisation in angiosperms produces",
            "marks": 1,
            "answer": "A diploid zygote and a triploid primary endosperm nucleus. One male gamete fuses with the egg, the other with the two polar nuclei."
          },
          {
            "q": "In humans, the site of fertilisation is the",
            "marks": 1,
            "answer": "The ampullary–isthmic junction of the fallopian tube, not the uterus."
          },
          {
            "q": "The hormone responsible for the milk ejection reflex is",
            "marks": 1,
            "answer": "Oxytocin, released from the posterior pituitary; prolactin governs milk production rather than its ejection."
          },
          {
            "q": "A cross between a tall heterozygous pea plant (Tt) and a short one (tt) gives a phenotypic ratio of",
            "marks": 1,
            "answer": "1 tall : 1 short. This is a test cross, and the offspring are half Tt and half tt."
          },
          {
            "q": "Haemophilia is an example of",
            "marks": 1,
            "answer": "An X-linked recessive disorder. It appears far more often in males, who carry only one X chromosome and so cannot mask the allele."
          },
          {
            "q": "The enzyme that joins DNA fragments during replication is",
            "marks": 1,
            "answer": "DNA ligase. It seals the nicks between Okazaki fragments on the lagging strand by forming phosphodiester bonds."
          },
          {
            "q": "In the lac operon, the inducer is",
            "marks": 1,
            "answer": "Lactose (specifically allolactose). It binds the repressor, which then cannot bind the operator, so transcription proceeds."
          },
          {
            "q": "The genetic material of the HIV virus is",
            "marks": 1,
            "answer": "Single-stranded RNA. HIV is a retrovirus and uses reverse transcriptase to make DNA from its RNA."
          },
          {
            "q": "Which of these is a primary lymphoid organ: spleen, thymus, or tonsils?",
            "marks": 1,
            "answer": "The thymus. Primary lymphoid organs are where lymphocytes mature; the spleen and tonsils are secondary organs where they encounter antigens."
          },
          {
            "q": "The bacterium used to produce the Bt toxin is",
            "marks": 1,
            "answer": "Bacillus thuringiensis. Its cry genes are transferred into crops such as Bt cotton to give insect resistance."
          },
          {
            "q": "Restriction endonucleases cut DNA at",
            "marks": 1,
            "answer": "Specific palindromic sequences, usually producing staggered cuts that leave sticky ends able to pair with complementary fragments."
          },
          {
            "q": "An organism's ecological niche is best described as",
            "marks": 1,
            "answer": "Its functional role in the ecosystem — what it eats, what eats it, and the range of conditions it tolerates — as opposed to its habitat, which is merely where it lives."
          },
          {
            "q": "In an ecological pyramid, the pyramid of energy is always",
            "marks": 1,
            "answer": "Upright. Energy is lost as heat at every transfer, so each level necessarily holds less energy than the one below it."
          },
          {
            "q": "Assertion (A): Pollen grains of many species cause severe allergies. Reason (R): Pollen grains have a highly resistant outer wall made of sporopollenin.",
            "marks": 1,
            "answer": "(b) Both are true but R does not explain A. The allergy is caused by proteins carried on the pollen, not by the durability of sporopollenin."
          },
          {
            "q": "Assertion (A): DNA is a better hereditary material than RNA. Reason (R): DNA is chemically less reactive and structurally more stable.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. The 2'-OH group absent in DNA makes RNA more reactive, and the thymine in place of uracil aids repair — together these make DNA the more stable store of information."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Define parthenocarpy and give one example.",
            "marks": 2,
            "answer": "Parthenocarpy is the development of a fruit without fertilisation, so the fruit is seedless. Bananas are the standard example, and the effect can be induced artificially by applying growth hormones such as auxins to unpollinated flowers."
          },
          {
            "q": "What is the difference between spermatogenesis and oogenesis in terms of the number of gametes produced?",
            "marks": 2,
            "answer": "Spermatogenesis produces four functional sperm from each primary spermatocyte. Oogenesis produces only one functional ovum from each primary oocyte, the other three nuclei being discarded as polar bodies, so that nearly all the cytoplasm is retained by the single egg."
          },
          {
            "q": "State the law of independent assortment.",
            "marks": 2,
            "answer": "When two pairs of contrasting characters are considered together, the alleles of one pair segregate independently of the alleles of the other pair during gamete formation. Mendel's dihybrid cross gave the 9 : 3 : 3 : 1 ratio that follows from this. The law holds for genes on different chromosomes or far apart on the same one."
          },
          {
            "q": "Write the full form of PCR and name the enzyme that makes it possible.",
            "marks": 2,
            "answer": "PCR is the polymerase chain reaction, used to amplify a specific DNA segment into millions of copies. It depends on Taq polymerase, a heat-stable DNA polymerase from the thermophilic bacterium Thermus aquaticus, which survives the repeated denaturation step at about 94 °C."
          },
          {
            "q": "Distinguish between innate and acquired immunity.",
            "marks": 2,
            "answer": "Innate immunity is present from birth, is non-specific, and acts the same way against any pathogen — skin, mucus, phagocytes and inflammation. Acquired immunity develops after exposure to a specific pathogen, is specific to it, and carries memory, so the second response to the same antigen is faster and stronger."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 21,
        "instructions": "Answer all 7 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Describe the structure of a mature embryo sac in a flowering plant, naming its cells.",
            "marks": 3,
            "answer": "A typical mature embryo sac is 7-celled and 8-nucleate. At the micropylar end sits the egg apparatus: one egg cell flanked by two synergids bearing the filiform apparatus that guides the pollen tube. At the opposite chalazal end lie three antipodal cells. In the centre is one large central cell containing two polar nuclei, which after fertilisation form the triploid endosperm."
          },
          {
            "q": "Explain the roles of FSH, LH and progesterone in the human menstrual cycle.",
            "marks": 3,
            "answer": "FSH from the anterior pituitary stimulates the growth of the ovarian follicle and its secretion of oestrogen during the follicular phase. A sharp surge of LH at about day 14 triggers ovulation, the release of the secondary oocyte, and then converts the ruptured follicle into the corpus luteum. Progesterone secreted by the corpus luteum thickens and maintains the endometrium for implantation; if fertilisation does not occur, the corpus luteum degenerates, progesterone falls and menstruation follows."
          },
          {
            "q": "A colour-blind man marries a woman with no history of colour blindness in her family. Work out the probability of colour blindness in their children.",
            "marks": 3,
            "answer": "Colour blindness is X-linked recessive. The father is X^c Y and the mother is X^X (homozygous normal). All daughters receive X^c from the father and X from the mother, so every daughter is X^c X — a carrier with normal vision. All sons receive the father's Y and the mother's normal X, so every son is X Y and is normal. Therefore none of the children is colour blind, but every daughter is a carrier."
          },
          {
            "q": "Describe the process of transcription in prokaryotes, naming the three stages.",
            "marks": 3,
            "answer": "In initiation, RNA polymerase with its sigma factor binds the promoter and unwinds the DNA. In elongation, the polymerase moves along the template strand in the 3'→5' direction, adding ribonucleotides to the growing RNA at its 3' end following complementary base pairing, with uracil in place of thymine. In termination, the polymerase reaches the terminator sequence, the rho factor or a hairpin structure causes release of the transcript, and the enzyme detaches. In prokaryotes the transcript needs no processing and can be translated even before transcription is finished."
          },
          {
            "q": "What is biofortification? Give two examples and state why it matters.",
            "marks": 3,
            "answer": "Biofortification is the breeding of crops for higher levels of vitamins, minerals or proteins, so that nutrition improves through the ordinary diet rather than through supplements. Examples include the wheat variety Atlas 66 rich in protein, maize hybrids with twice the lysine and tryptophan, and iron-fortified rice. It matters because it reaches poor populations who cannot afford supplements, using seed they already plant."
          },
          {
            "q": "Explain the process of gel electrophoresis and state why DNA moves towards the anode.",
            "marks": 3,
            "answer": "DNA fragments obtained by restriction digestion are loaded into wells in an agarose gel and an electric field is applied. The fragments move through the pores of the gel, smaller fragments travelling faster and therefore further, so the mixture separates by size. The separated bands are stained with ethidium bromide and viewed under UV light as bright orange bands. DNA migrates towards the anode because the phosphate groups of its backbone carry a net negative charge at the pH used."
          },
          {
            "q": "Define population density and describe any two ways it can be measured.",
            "marks": 3,
            "answer": "Population density is the number of individuals of a species per unit area or volume at a given time. Direct counting works for large, visible or sessile organisms, such as counting trees in a marked quadrat. For mobile animals the mark–recapture method is used: a sample is captured, marked and released, and the proportion of marked individuals in a later sample gives an estimate of the total. Where counting individuals is impractical, percentage cover or biomass serves as a relative measure."
          }
        ]
      },
      {
        "name": "Section D — Case-based questions (4 marks each)",
        "marks": 8,
        "instructions": "Answer both case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A couple has been unable to conceive for four years. Investigation shows the husband produces very few sperm, while the wife's reproductive tract is normal. (i) Name the condition in the husband. (ii) Suggest a suitable assisted reproductive technique and explain it. (iii) Name one technique used when the sperm count is extremely low. (iv) State one ethical concern with these technologies.",
            "marks": 4,
            "answer": "(i) Oligospermia — an abnormally low sperm count. (ii) Intra-uterine insemination, in which semen is collected, concentrated and introduced directly into the uterus, bypassing the need for a high count in the cervix; alternatively IVF, where egg and sperm are fused outside the body and the embryo transferred. (iii) ICSI, intracytoplasmic sperm injection, in which a single sperm is injected directly into the ovum. (iv) These techniques raise concerns about the fate of surplus embryos, the high cost placing them out of reach for most couples, and their potential misuse for sex selection, which is illegal in India."
          },
          {
            "q": "CASE STUDY 2 — A lake near a town receives untreated sewage. Over several months the water turns green, fish die in large numbers and the water begins to smell. (i) Name the phenomenon. (ii) Explain why the fish die, referring to BOD. (iii) What does a high BOD indicate? (iv) Suggest one remedy.",
            "marks": 4,
            "answer": "(i) Eutrophication — nutrient enrichment of the water body, here caused by the nitrates and phosphates in sewage. (ii) The nutrients cause an algal bloom; when the algae die, decomposer bacteria multiply and consume dissolved oxygen to break them down. The oxygen level falls so far that fish suffocate. (iii) A high biochemical oxygen demand means a large amount of biodegradable organic matter, and therefore heavy pollution — clean water has a low BOD. (iv) Treat the sewage before discharge in a sewage treatment plant, so that the organic load is oxidised before the effluent reaches the lake."
          }
        ]
      },
      {
        "name": "Section E — Long Answer (5 marks each)",
        "marks": 15,
        "instructions": "Answer all 3 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "(a) Describe the structure of DNA as proposed by Watson and Crick. (b) State Chargaff's rule. (c) Explain what is meant by semi-conservative replication and name the experiment that proved it.",
            "marks": 5,
            "answer": "(a) DNA is a double helix of two antiparallel polynucleotide chains, one running 5'→3' and the other 3'→5', wound round a common axis in a right-handed sense. The sugar–phosphate backbones lie outside and the nitrogenous bases point inwards, paired by hydrogen bonds — adenine with thymine by two bonds and guanine with cytosine by three. The helix has a pitch of 3.4 nm with about ten base pairs per turn, so adjacent pairs are 0.34 nm apart. (b) Chargaff's rule states that in any double-stranded DNA the amount of adenine equals that of thymine and the amount of guanine equals that of cytosine, so A + G = T + C. (c) In semi-conservative replication each daughter molecule keeps one parental strand and gains one newly synthesised strand. Meselson and Stahl proved it by growing E. coli in heavy nitrogen ¹⁵N and transferring it to ¹⁴N: after one generation all the DNA was of intermediate density, and after two generations half was intermediate and half light — exactly what the semi-conservative model predicts."
          },
          {
            "q": "(a) What is meant by an ecosystem's productivity? Distinguish gross and net primary productivity. (b) Explain the 10 per cent law with an example. (c) Why are pyramids of biomass in an aquatic ecosystem often inverted?",
            "marks": 5,
            "answer": "(a) Productivity is the rate at which biomass is produced per unit area in unit time. Gross primary productivity is the total rate at which producers capture and fix chemical energy through photosynthesis. A part of it is spent in the producers' own respiration, and what remains as new biomass is the net primary productivity: NPP = GPP − R. Only NPP is available to herbivores. (b) The 10 per cent law states that only about a tenth of the energy at one trophic level is transferred to the next, the rest being lost as heat and in metabolism. So if producers hold 10,000 J, herbivores obtain about 1,000 J and primary carnivores about 100 J. (c) In a pond the producers are tiny, short-lived phytoplankton with a very high turnover rate. At any instant their standing biomass is small, yet over time they support a much larger biomass of longer-lived zooplankton and fish. The pyramid measures biomass at a single moment, so it appears inverted even though the energy pyramid remains upright."
          },
          {
            "q": "(a) What is recombinant DNA technology? List the three basic steps. (b) Name the tools required and state the function of each. (c) Give one application in medicine.",
            "marks": 5,
            "answer": "(a) Recombinant DNA technology is the set of methods by which a gene from one organism is isolated and introduced into another, so that the host expresses the desired product. The three basic steps are the isolation of the gene of interest, its insertion into a suitable vector to form recombinant DNA, and the transfer of that construct into a host cell where it multiplies and is expressed. (b) Restriction endonucleases cut DNA at specific palindromic sites, producing sticky ends. DNA ligase joins the fragment to the vector by sealing the phosphodiester backbone. A vector, usually a plasmid such as pBR322 or a bacteriophage, carries the gene into the host and provides an origin of replication and selectable markers. A host cell, commonly E. coli, replicates and expresses the construct. Polymerases amplify the gene, and gel electrophoresis separates and checks the fragments. (c) Human insulin, marketed as Humulin, is produced by inserting the genes for the A and B chains into E. coli, growing the bacteria, then extracting and joining the chains — giving a supply free of the immune reactions that animal insulin sometimes caused."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Biology board exam?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which topics have highest weightage?",
        "a": "Genetics, molecular biology, evolution, and ecology carry significant weightage in the exam."
      },
      {
        "q": "Are diagrams essential for biology answers?",
        "a": "Yes, labeled diagrams are required for processes like photosynthesis, respiration, and cell division."
      }
    ]
  },
  {
    "slug": "class-11-maths",
    "classLevel": "Class 11",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 11 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 11 Mathematics paper built to the board's own pattern: 38 questions across five sections for 80 marks in 3 hours, covering sets and functions, trigonometry, complex numbers, permutations and combinations, sequences and series, straight lines and conic sections, three-dimensional geometry, limits and statistics. Section A is objective and Section E is case-based, and every question is followed by a fully worked solution showing each step of the algebra.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 20,
        "instructions": "Questions 1–18 are multiple choice. Questions 19 and 20 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "If A = {1, 2, 3}, the number of subsets of A is",
            "marks": 1,
            "answer": "8. A set with n elements has 2ⁿ subsets, and 2³ = 8."
          },
          {
            "q": "If n(A) = 3 and n(B) = 4, then n(A × B) equals",
            "marks": 1,
            "answer": "12. The cartesian product has n(A) × n(B) = 3 × 4 = 12 ordered pairs."
          },
          {
            "q": "The domain of the function f(x) = 1/(x − 2) is",
            "marks": 1,
            "answer": "All real numbers except 2, written R − {2}, since the denominator vanishes at x = 2."
          },
          {
            "q": "The value of sin 75° is",
            "marks": 1,
            "answer": "(√6 + √2)/4. Using sin(45° + 30°) = sin45 cos30 + cos45 sin30 = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4."
          },
          {
            "q": "The general solution of sin x = 0 is",
            "marks": 1,
            "answer": "x = nπ, where n is any integer."
          },
          {
            "q": "The value of i⁴ⁿ⁺³ for any positive integer n is",
            "marks": 1,
            "answer": "−i. Since i⁴ = 1, i⁴ⁿ⁺³ = i³ = −i."
          },
          {
            "q": "The modulus of the complex number 3 + 4i is",
            "marks": 1,
            "answer": "5. |z| = √(3² + 4²) = √25 = 5."
          },
          {
            "q": "The solution set of the inequality 2x + 3 < 7 is",
            "marks": 1,
            "answer": "x < 2, that is the interval (−∞, 2)."
          },
          {
            "q": "The number of ways of arranging the letters of the word 'MATHS' is",
            "marks": 1,
            "answer": "120. All five letters are distinct, so the count is 5! = 120."
          },
          {
            "q": "The value of ⁿC₀ + ⁿC₁ + … + ⁿCₙ is",
            "marks": 1,
            "answer": "2ⁿ. Putting x = 1 in the binomial expansion of (1 + x)ⁿ gives exactly this sum."
          },
          {
            "q": "The 10th term of the AP 3, 7, 11, … is",
            "marks": 1,
            "answer": "39. aₙ = a + (n − 1)d = 3 + 9 × 4 = 39."
          },
          {
            "q": "The sum of an infinite GP with first term 4 and common ratio 1/2 is",
            "marks": 1,
            "answer": "8. S∞ = a/(1 − r) = 4/(1 − 0.5) = 8, valid because |r| < 1."
          },
          {
            "q": "The slope of the line joining (2, 3) and (4, 7) is",
            "marks": 1,
            "answer": "2. m = (y₂ − y₁)/(x₂ − x₁) = (7 − 3)/(4 − 2) = 4/2 = 2."
          },
          {
            "q": "The equation of a circle with centre (0, 0) and radius 5 is",
            "marks": 1,
            "answer": "x² + y² = 25 — the standard form x² + y² = r² with r = 5."
          },
          {
            "q": "The eccentricity of a parabola is",
            "marks": 1,
            "answer": "Exactly 1. An ellipse has e < 1 and a hyperbola e > 1."
          },
          {
            "q": "The distance of the point (1, 2, 3) from the origin is",
            "marks": 1,
            "answer": "√14. √(1² + 2² + 3²) = √(1 + 4 + 9) = √14."
          },
          {
            "q": "The value of lim(x→0) (sin x)/x is",
            "marks": 1,
            "answer": "1 — a standard limit, with x measured in radians."
          },
          {
            "q": "The derivative of x⁵ with respect to x is",
            "marks": 1,
            "answer": "5x⁴, by the power rule d(xⁿ)/dx = nxⁿ⁻¹."
          },
          {
            "q": "Assertion (A): The empty set is a subset of every set. Reason (R): A set A is a subset of B if every element of A belongs to B.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. The empty set has no elements, so the condition in R is satisfied vacuously for any B."
          },
          {
            "q": "Assertion (A): The function f(x) = x² is one-one on the set of real numbers. Reason (R): A function is one-one if distinct inputs give distinct outputs.",
            "marks": 1,
            "answer": "(d) A is false, R is true. The definition in R is correct, but f(−2) = f(2) = 4, so x² is not one-one on all of R — it is one-one only when restricted to non-negative reals."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "If A = {1, 2, 3, 4} and B = {3, 4, 5}, find A ∪ B and A ∩ B.",
            "marks": 2,
            "answer": "The union collects every element of either set without repetition: A ∪ B = {1, 2, 3, 4, 5}. The intersection keeps only the common elements: A ∩ B = {3, 4}."
          },
          {
            "q": "Prove that sin²x + cos²x = 1 using the unit circle.",
            "marks": 2,
            "answer": "Take a point P on the unit circle at angle x from the positive x-axis; by definition its coordinates are (cos x, sin x). The distance of P from the origin is the radius, 1, so by the distance formula cos²x + sin²x = 1² = 1, which is the required identity."
          },
          {
            "q": "Find the conjugate and modulus of z = 2 − 5i.",
            "marks": 2,
            "answer": "The conjugate is obtained by reversing the sign of the imaginary part: z̄ = 2 + 5i. The modulus is |z| = √(2² + (−5)²) = √(4 + 25) = √29."
          },
          {
            "q": "How many three-digit numbers can be formed from the digits 1, 2, 3, 4, 5 without repetition?",
            "marks": 2,
            "answer": "The hundreds place can be filled in 5 ways, the tens in 4 ways from those left, and the units in 3 ways, giving 5 × 4 × 3 = 60. Equivalently this is the permutation ⁵P₃ = 60."
          },
          {
            "q": "Find the equation of the line passing through (1, 2) with slope 3.",
            "marks": 2,
            "answer": "Using the point-slope form y − y₁ = m(x − x₁): y − 2 = 3(x − 1), so y − 2 = 3x − 3 and the equation is y = 3x − 1, or 3x − y − 1 = 0."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 18,
        "instructions": "Answer all 6 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "In a class of 60 students, 30 play cricket, 25 play football and 10 play both. Find how many play neither.",
            "marks": 3,
            "answer": "By the inclusion–exclusion principle, the number playing at least one game is n(C ∪ F) = n(C) + n(F) − n(C ∩ F) = 30 + 25 − 10 = 45. Therefore those who play neither number 60 − 45 = 15."
          },
          {
            "q": "Prove that cos 3x = 4cos³x − 3cos x.",
            "marks": 3,
            "answer": "Write cos 3x = cos(2x + x) = cos 2x cos x − sin 2x sin x. Substituting cos 2x = 2cos²x − 1 and sin 2x = 2 sin x cos x gives cos 3x = (2cos²x − 1)cos x − 2 sin²x cos x. Replacing sin²x by 1 − cos²x, this becomes 2cos³x − cos x − 2cos x(1 − cos²x) = 2cos³x − cos x − 2cos x + 2cos³x = 4cos³x − 3cos x."
          },
          {
            "q": "Solve the quadratic equation x² + 4 = 0 in the set of complex numbers.",
            "marks": 3,
            "answer": "Rearranging, x² = −4. Since i² = −1, we may write −4 = 4i², so x² = 4i² and x = ±2i. The roots are 2i and −2i, a conjugate pair, as expected for a real quadratic with negative discriminant."
          },
          {
            "q": "Find the sum of the first 20 terms of the AP 5, 9, 13, …",
            "marks": 3,
            "answer": "Here a = 5 and d = 4, with n = 20. Using Sₙ = n/2[2a + (n − 1)d], S₂₀ = 10[10 + 19 × 4] = 10[10 + 76] = 10 × 86 = 860."
          },
          {
            "q": "Find the coordinates of the focus and the length of the latus rectum of the parabola y² = 12x.",
            "marks": 3,
            "answer": "Comparing with the standard form y² = 4ax gives 4a = 12, so a = 3. The parabola opens rightwards, so the focus is at (a, 0) = (3, 0), the directrix is the line x = −3, and the length of the latus rectum is 4a = 12 units."
          },
          {
            "q": "Evaluate lim(x→2) (x² − 4)/(x − 2).",
            "marks": 3,
            "answer": "Direct substitution gives 0/0, so factorise the numerator: x² − 4 = (x − 2)(x + 2). For x ≠ 2 the expression simplifies to x + 2, and the limit is the value this approaches as x → 2, namely 4. The cancellation is valid because a limit concerns values near 2 and not at 2 itself."
          }
        ]
      },
      {
        "name": "Section D — Long Answer (5 marks each)",
        "marks": 20,
        "instructions": "Answer all 4 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "Prove by the principle of mathematical induction that 1 + 2 + 3 + … + n = n(n + 1)/2 for all natural numbers n.",
            "marks": 5,
            "answer": "Let P(n) be the statement that the sum of the first n natural numbers is n(n + 1)/2. Base step: for n = 1 the left side is 1 and the right side is 1 × 2/2 = 1, so P(1) holds. Inductive step: assume P(k) is true, that is 1 + 2 + … + k = k(k + 1)/2. Adding (k + 1) to both sides gives 1 + 2 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = (k + 1)[k/2 + 1] = (k + 1)(k + 2)/2. This is precisely the statement P(k + 1). Since P(1) is true and P(k) implies P(k + 1), by the principle of mathematical induction P(n) holds for every natural number n."
          },
          {
            "q": "Find the sum of the series 1 + 3 + 5 + … up to n terms, and hence find the sum of the first 25 odd numbers.",
            "marks": 5,
            "answer": "The series is an AP with first term a = 1 and common difference d = 2. Using Sₙ = n/2[2a + (n − 1)d], Sₙ = n/2[2 + 2(n − 1)] = n/2[2n] = n². So the sum of the first n odd numbers is n², a neat result worth remembering. For the first 25 odd numbers the sum is 25² = 625. As a check, the 25th odd number is 1 + 24 × 2 = 49, and the average of the first and last terms is (1 + 49)/2 = 25, which multiplied by 25 terms gives 625."
          },
          {
            "q": "Find the equation of the circle passing through the points (0, 0), (4, 0) and (0, 6).",
            "marks": 5,
            "answer": "Take the general equation x² + y² + 2gx + 2fy + c = 0. Substituting (0, 0) gives c = 0. Substituting (4, 0): 16 + 8g = 0, so g = −2. Substituting (0, 6): 36 + 12f = 0, so f = −3. The equation is therefore x² + y² − 4x − 6y = 0. Completing the squares, (x − 2)² + (y − 3)² = 4 + 9 = 13, so the circle has centre (2, 3) and radius √13. As a check, the distance from (2, 3) to the origin is √(4 + 9) = √13, as required."
          },
          {
            "q": "Calculate the mean and standard deviation of the data 6, 8, 10, 12, 14.",
            "marks": 5,
            "answer": "The mean is x̄ = (6 + 8 + 10 + 12 + 14)/5 = 50/5 = 10. The deviations from the mean are −4, −2, 0, 2 and 4, and their squares are 16, 4, 0, 4 and 16, summing to 40. The variance is σ² = Σ(x − x̄)²/n = 40/5 = 8, so the standard deviation is σ = √8 = 2√2 ≈ 2.83. The data are evenly spaced about the mean, which is why the deviations are symmetric and the mean sits exactly at the middle value."
          }
        ]
      },
      {
        "name": "Section E — Case-based questions (4 marks each)",
        "marks": 12,
        "instructions": "Answer all 3 case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A school of 200 students was surveyed on reading habits. 120 read newspapers, 90 read magazines and 40 read both. (i) How many read at least one? (ii) How many read only newspapers? (iii) How many read neither?",
            "marks": 4,
            "answer": "(i) n(N ∪ M) = n(N) + n(M) − n(N ∩ M) = 120 + 90 − 40 = 170 students read at least one. (ii) Those reading only newspapers are n(N) − n(N ∩ M) = 120 − 40 = 80. (iii) Those reading neither are 200 − 170 = 30 students."
          },
          {
            "q": "CASE STUDY 2 — A ball is dropped from a height of 80 m and on each bounce rises to half the height from which it fell. (i) Identify the type of progression formed by the heights. (ii) Write its first term and common ratio. (iii) Find the height after the fourth bounce. (iv) Find the total distance the ball would travel before coming to rest.",
            "marks": 4,
            "answer": "(i) The successive heights form a geometric progression, since each is a fixed fraction of the one before. (ii) The first term is 80 m and the common ratio is 1/2. (iii) After the fourth bounce the height is 80 × (1/2)⁴ = 80/16 = 5 m. (iv) The ball first falls 80 m; thereafter it rises and falls through each bounce height. The total is 80 + 2(40 + 20 + 10 + …) = 80 + 2 × [40/(1 − 1/2)] = 80 + 2 × 80 = 240 m."
          },
          {
            "q": "CASE STUDY 3 — A committee of 5 is to be formed from 6 boys and 4 girls. (i) In how many ways can it be formed with no restriction? (ii) In how many ways if it must contain exactly 2 girls? (iii) In how many ways if it must contain at least 3 boys?",
            "marks": 4,
            "answer": "(i) Choosing 5 from 10 gives ¹⁰C₅ = 252 ways. (ii) Choose 2 girls from 4 and 3 boys from 6: ⁴C₂ × ⁶C₃ = 6 × 20 = 120 ways. (iii) At least 3 boys means 3, 4 or 5 boys: ⁶C₃×⁴C₂ + ⁶C₄×⁴C₁ + ⁶C₅×⁴C₀ = 20×6 + 15×4 + 6×1 = 120 + 60 + 6 = 186 ways."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 11 Maths?",
        "a": "100 marks total: 80 for theory and 20 for internal assessment."
      },
      {
        "q": "Which chapters are most important?",
        "a": "Complex numbers, sequences and series, trigonometry, and conic sections have significant weightage."
      },
      {
        "q": "Are proofs necessary for trigonometric identities?",
        "a": "Yes, formal proofs of important identities are often asked and carry 3-4 marks."
      }
    ]
  },
  {
    "slug": "class-11-physics",
    "classLevel": "Class 11",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 11 Physics Sample Paper 2026 (with Solutions)",
    "intro": "This is a full-length CBSE Class 11 Physics paper built to the board's own pattern: 33 questions across five sections for 70 marks in 3 hours, the remaining 30 marks being the practical component assessed in school. It covers units and measurement, kinematics, laws of motion, work energy and power, rotational motion, gravitation, thermodynamics, kinetic theory and oscillations. Every question is followed by a complete worked solution with the derivation set out step by step.",
    "duration": "3 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A — Objective (1 mark each)",
        "marks": 16,
        "instructions": "Questions 1–14 are multiple choice. Questions 15 and 16 are Assertion–Reason: mark (a) if both A and R are true and R explains A, (b) if both are true but R does not explain A, (c) if A is true and R is false, (d) if A is false and R is true.",
        "questions": [
          {
            "q": "The dimensional formula of pressure is",
            "marks": 1,
            "answer": "[ML⁻¹T⁻²]. Pressure is force per unit area, so [MLT⁻²]/[L²] = [ML⁻¹T⁻²]."
          },
          {
            "q": "The number of significant figures in 0.00230 is",
            "marks": 1,
            "answer": "Three — 2, 3 and the final 0. Leading zeros only fix the decimal point, while the trailing zero after a decimal is significant."
          },
          {
            "q": "A body thrown vertically upward returns to the thrower. Its displacement is",
            "marks": 1,
            "answer": "Zero, since it ends where it began, although the distance covered is twice the maximum height."
          },
          {
            "q": "The area under a velocity–time graph gives",
            "marks": 1,
            "answer": "The displacement of the body over that interval; the slope of the same graph gives the acceleration."
          },
          {
            "q": "For a projectile launched at angle θ with speed u, the range is maximum when θ equals",
            "marks": 1,
            "answer": "45°. The range is (u² sin 2θ)/g, which is greatest when sin 2θ = 1, that is 2θ = 90°."
          },
          {
            "q": "The centripetal acceleration of a body moving in a circle of radius r with speed v is",
            "marks": 1,
            "answer": "v²/r, directed towards the centre of the circle."
          },
          {
            "q": "Newton's first law of motion defines",
            "marks": 1,
            "answer": "Inertia, and thereby the concept of force — a body changes its state of rest or uniform motion only when an external force acts."
          },
          {
            "q": "The impulse of a force equals the change in",
            "marks": 1,
            "answer": "Momentum. Impulse = F·Δt = Δp, which is the impulse–momentum theorem."
          },
          {
            "q": "A body of mass 2 kg moving at 3 m/s has kinetic energy",
            "marks": 1,
            "answer": "9 J. KE = ½mv² = ½(2)(9) = 9 joules."
          },
          {
            "q": "The work done by a centripetal force on a body in uniform circular motion is",
            "marks": 1,
            "answer": "Zero, because the force is always perpendicular to the displacement, and W = Fs cos 90° = 0."
          },
          {
            "q": "The moment of inertia of a solid sphere of mass M and radius R about its diameter is",
            "marks": 1,
            "answer": "(2/5)MR². For a hollow sphere the corresponding value is (2/3)MR²."
          },
          {
            "q": "The escape velocity from the surface of the Earth is approximately",
            "marks": 1,
            "answer": "11.2 km/s, obtained from v = √(2GM/R) — independent of the mass of the escaping body."
          },
          {
            "q": "In an isothermal process the quantity that stays constant is",
            "marks": 1,
            "answer": "Temperature, so for an ideal gas the internal energy is unchanged and the heat supplied equals the work done."
          },
          {
            "q": "The time period of a simple pendulum depends on",
            "marks": 1,
            "answer": "Its length and the acceleration due to gravity, T = 2π√(l/g) — it does not depend on the mass of the bob or on the amplitude, provided the swing is small."
          },
          {
            "q": "Assertion (A): A body can have zero velocity and still be accelerating. Reason (R): Acceleration is the rate of change of velocity.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. At the top of its flight a body thrown upward has zero velocity but its velocity is still changing at g, so it is accelerating — exactly what the reason describes."
          },
          {
            "q": "Assertion (A): The internal energy of an ideal gas depends only on its temperature. Reason (R): There are no intermolecular forces in an ideal gas.",
            "marks": 1,
            "answer": "(a) Both true and R explains A. With no intermolecular forces there is no potential energy term, so the internal energy is purely the kinetic energy of the molecules, which depends only on temperature."
          }
        ]
      },
      {
        "name": "Section B — Very Short Answer (2 marks each)",
        "marks": 10,
        "instructions": "Answer all 5 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "State the principle of homogeneity of dimensions and give one use of it.",
            "marks": 2,
            "answer": "The principle states that every term on both sides of a physically correct equation must have the same dimensions. It is used to check the correctness of an equation and to derive relations between quantities — for example it shows at once that s = ut + ½at² is dimensionally consistent, since every term has the dimension of length."
          },
          {
            "q": "Distinguish between distance and displacement.",
            "marks": 2,
            "answer": "Distance is the total length of the path actually covered, is a scalar, and can never be negative or zero for a moving body. Displacement is the shortest straight-line vector from the initial to the final position, has both magnitude and direction, and can be zero even when the distance is large — as for a body returning to its starting point."
          },
          {
            "q": "Why is it easier to pull a lawn roller than to push it?",
            "marks": 2,
            "answer": "When the roller is pulled, the vertical component of the applied force acts upward and reduces the normal reaction, so friction, which is proportional to the normal reaction, decreases. When it is pushed, that component presses downward, increasing the normal reaction and hence the friction. Pulling therefore needs a smaller effort."
          },
          {
            "q": "Define angular momentum and state the condition under which it is conserved.",
            "marks": 2,
            "answer": "Angular momentum is the rotational analogue of linear momentum, L = Iω for a rigid body, or r × p for a particle. It is conserved when the net external torque acting on the system is zero — which is why a spinning skater speeds up on drawing her arms in, reducing I and so raising ω."
          },
          {
            "q": "State the first law of thermodynamics and identify each term.",
            "marks": 2,
            "answer": "ΔQ = ΔU + ΔW, where ΔQ is the heat supplied to the system, ΔU is the increase in its internal energy, and ΔW is the work done by the system on its surroundings. It is a statement of conservation of energy applied to thermal processes."
          }
        ]
      },
      {
        "name": "Section C — Short Answer (3 marks each)",
        "marks": 21,
        "instructions": "Answer all 7 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Derive the equation v = u + at using the definition of acceleration.",
            "marks": 3,
            "answer": "Acceleration is the rate of change of velocity, a = (v − u)/t for uniform acceleration, where u is the velocity at t = 0 and v at time t. Multiplying both sides by t gives at = v − u, and rearranging gives v = u + at. The derivation assumes the acceleration is constant throughout the interval."
          },
          {
            "q": "A ball is thrown at 20 m/s at 30° to the horizontal. Find its time of flight and maximum height. (g = 10 m/s²)",
            "marks": 3,
            "answer": "The vertical component of the initial velocity is u sin θ = 20 × 0.5 = 10 m/s. Time of flight T = 2u sin θ/g = 2 × 10/10 = 2 s. Maximum height H = (u sin θ)²/2g = 100/20 = 5 m."
          },
          {
            "q": "Explain why a passenger falls forward when a moving bus stops suddenly.",
            "marks": 3,
            "answer": "While the bus is moving, the passenger's whole body moves with it at the same speed. When the brakes are applied, the force acts on the bus and, through friction with the floor, on the passenger's feet, which stop with it. The upper part of the body has no such force acting on it and, by the law of inertia, continues to move forward at the original speed. The result is that the upper body is thrown forward relative to the feet."
          },
          {
            "q": "A machine gun fires 60 bullets per minute, each of mass 50 g at 400 m/s. Calculate the force needed to hold the gun.",
            "marks": 3,
            "answer": "Sixty bullets per minute is one bullet per second. The momentum carried away by each bullet is p = mv = 0.05 × 400 = 20 kg m/s. The rate of change of momentum is therefore 20 kg m/s per second, and by Newton's second law the force required to hold the gun steady against the recoil is 20 N."
          },
          {
            "q": "State and prove the work–energy theorem for a constant force.",
            "marks": 3,
            "answer": "The theorem states that the work done by the net force on a body equals the change in its kinetic energy. For a constant force F producing acceleration a over a displacement s, W = Fs = mas. From the equation of motion v² = u² + 2as, we have as = (v² − u²)/2. Substituting, W = m(v² − u²)/2 = ½mv² − ½mu², which is the final kinetic energy minus the initial kinetic energy."
          },
          {
            "q": "Derive an expression for the orbital velocity of a satellite close to the Earth's surface.",
            "marks": 3,
            "answer": "For a satellite of mass m in a circular orbit of radius r about the Earth of mass M, the gravitational attraction supplies the centripetal force: GMm/r² = mv²/r. Cancelling m and one factor of r gives v² = GM/r, so v = √(GM/r). For an orbit close to the surface r ≈ R, and since GM = gR², this becomes v = √(gR) ≈ √(9.8 × 6.4 × 10⁶) ≈ 7.9 km/s."
          },
          {
            "q": "Explain why the boiling point of water decreases at high altitudes.",
            "marks": 3,
            "answer": "A liquid boils when its saturated vapour pressure becomes equal to the external pressure on its surface. At high altitude the atmospheric pressure is lower, so the vapour pressure reaches that smaller value at a lower temperature and the water boils below 100 °C. Because the water is cooler, food takes longer to cook, which is why a pressure cooker — which raises the pressure and hence the boiling point — is used in the hills."
          }
        ]
      },
      {
        "name": "Section D — Case-based questions (4 marks each)",
        "marks": 8,
        "instructions": "Answer both case-based questions. Each has sub-parts totalling 4 marks.",
        "questions": [
          {
            "q": "CASE STUDY 1 — A car of mass 1000 kg travelling at 20 m/s is brought to rest in 5 s by braking. (i) Find the retardation. (ii) Find the braking force. (iii) Find the distance travelled while stopping. (iv) State the energy conversion that takes place.",
            "marks": 4,
            "answer": "(i) a = (v − u)/t = (0 − 20)/5 = −4 m/s², a retardation of 4 m/s². (ii) F = ma = 1000 × 4 = 4000 N, opposing the motion. (iii) s = ut + ½at² = 20(5) + ½(−4)(25) = 100 − 50 = 50 m. (iv) The kinetic energy of the car, ½(1000)(400) = 2 × 10⁵ J, is converted almost entirely into heat in the brake pads and tyres, with a little into sound."
          },
          {
            "q": "CASE STUDY 2 — A simple pendulum of length 1 m oscillates with small amplitude at a place where g = 9.8 m/s². (i) Write the formula for its time period. (ii) Calculate the time period. (iii) What happens to the period if the bob's mass is doubled? (iv) What happens if the pendulum is taken to the Moon?",
            "marks": 4,
            "answer": "(i) T = 2π√(l/g). (ii) T = 2π√(1/9.8) = 2π × 0.3194 ≈ 2.0 s. (iii) Nothing — the period is independent of the mass of the bob, since the restoring force and the inertia both scale with mass and the effect cancels. (iv) On the Moon g is about one sixth of its value on Earth, and since T is inversely proportional to √g, the period becomes about √6 ≈ 2.45 times longer, roughly 4.9 s — the pendulum swings much more slowly."
          }
        ]
      },
      {
        "name": "Section E — Long Answer (5 marks each)",
        "marks": 15,
        "instructions": "Answer all 3 questions. Each carries 5 marks.",
        "questions": [
          {
            "q": "(a) State the law of conservation of linear momentum and derive it from Newton's third law. (b) Explain the recoil of a gun using it. (c) A 4 kg gun fires a 20 g bullet at 200 m/s — find the recoil velocity.",
            "marks": 5,
            "answer": "(a) In the absence of an external force, the total linear momentum of a system of bodies remains constant. Consider two bodies A and B colliding. By the third law the force A exerts on B is equal and opposite to that B exerts on A, so F_AB = −F_BA. Since force is the rate of change of momentum, the momentum gained by one is exactly the momentum lost by the other over the same interval of contact, and the total change is zero. Hence the total momentum before the collision equals that after it. (b) Before firing, gun and bullet are at rest and the total momentum is zero. After firing, the bullet carries forward momentum, so the gun must carry an equal momentum backwards for the total to remain zero — this backward motion is the recoil. (c) 0 = m₁v₁ + m₂v₂, so (0.02)(200) + (4)v = 0, giving 4v = −4 and v = −1 m/s. The gun recoils at 1 m/s, opposite to the bullet."
          },
          {
            "q": "(a) Define the coefficient of static and kinetic friction. (b) Why is kinetic friction less than static friction? (c) A block of mass 5 kg rests on a horizontal surface with μs = 0.4 — find the least force needed to start it moving. (g = 10 m/s²)",
            "marks": 5,
            "answer": "(a) The coefficient of static friction μs is the ratio of the maximum force of static friction to the normal reaction, μs = f_max/N — it governs the force needed to start motion. The coefficient of kinetic friction μk is the ratio of the force of kinetic friction to the normal reaction while the body slides, μk = f_k/N. (b) When two surfaces are at rest in contact, the microscopic irregularities interlock and cold welds form at the points of contact, and these must be broken to begin motion. Once sliding begins the surfaces are in contact at any given point for too short a time for such bonds to form fully, so the resisting force is smaller — hence μk < μs. (c) N = mg = 5 × 10 = 50 N. The limiting friction is f_max = μs N = 0.4 × 50 = 20 N, so a force just exceeding 20 N is needed to start the block moving."
          },
          {
            "q": "(a) State the assumptions of the kinetic theory of gases. (b) Derive the relation between the pressure of an ideal gas and the mean square speed of its molecules. (c) Hence show that the average kinetic energy per molecule is proportional to the absolute temperature.",
            "marks": 5,
            "answer": "(a) A gas consists of a very large number of identical molecules in constant random motion; their own volume is negligible compared with the volume of the container; there are no intermolecular forces except during collisions; all collisions between molecules and with the walls are perfectly elastic; and the time of a collision is negligible compared with the time between collisions. (b) Consider N molecules each of mass m in a cube of side L. A molecule moving along x with velocity vₓ rebounds elastically from a wall, changing its momentum by 2mvₓ, and returns to the same wall after a time 2L/vₓ. The force it exerts is therefore 2mvₓ/(2L/vₓ) = mvₓ²/L. Summing over all molecules and dividing by the wall area L² gives P = m(Σvₓ²)/L³. Since the motion is random, the mean square speed satisfies v² = vₓ² + v_y² + v_z² = 3vₓ², so P = (1/3)(Nm/V)v̄², that is PV = (1/3)Nmv̄². (c) Comparing with the ideal gas equation PV = NkT gives (1/3)Nmv̄² = NkT, so ½mv̄² = (3/2)kT. The average kinetic energy per molecule is thus (3/2)kT — directly proportional to the absolute temperature and independent of the nature of the gas."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 11 Physics?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which topics are most important?",
        "a": "Laws of motion, energy conservation, thermodynamics, and waves carry high weightage."
      },
      {
        "q": "Are derivations important in physics?",
        "a": "Yes, derivations of major equations are essential and often asked as part of long-answer questions."
      }
    ]
  },
  {
    "slug": "class-10-maths-set-2",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 10 Mathematics Sample Paper 2026 Set 2 (with Solutions)",
    "intro": "This sample paper follows the latest CBSE curriculum with a mix of arithmetic, algebra, geometry, and statistics. Solve all sections carefully to master key concepts for your board exam. This set is longer than the board paper: 110 marks against the 80-mark CBSE pattern, so treat it as extended practice rather than a timed board rehearsal.",
    "duration": "4 hours",
    "totalMarks": 110,
    "sections": [
      {
        "name": "Section A: Very Short Answer (1 mark each)",
        "marks": 20,
        "instructions": "Answer all 20 questions in 1-2 sentences.",
        "questions": [
          {
            "q": "Find the HCF of 36 and 48.",
            "marks": 1,
            "answer": "HCF(36, 48) = 12"
          },
          {
            "q": "If tan(A) = 3/4, find sin(A).",
            "marks": 1,
            "answer": "sin(A) = 3/5"
          },
          {
            "q": "Write the formula for the sum of first n natural numbers.",
            "marks": 1,
            "answer": "Sum = n(n+1)/2"
          },
          {
            "q": "A quadratic polynomial has roots 2 and -3. Write the polynomial.",
            "marks": 1,
            "answer": "x^2 + x - 6"
          },
          {
            "q": "Find the distance between points (0, 0) and (3, 4).",
            "marks": 1,
            "answer": "Distance = 5"
          },
          {
            "q": "If sin(theta) = 1/2, find cos(theta) where theta is acute.",
            "marks": 1,
            "answer": "cos(theta) = sqrt(3)/2"
          },
          {
            "q": "Write the general term of AP: 5, 8, 11, 14, ...",
            "marks": 1,
            "answer": "a_n = 3n + 2"
          },
          {
            "q": "Find the LCM of 12 and 18.",
            "marks": 1,
            "answer": "LCM = 36"
          },
          {
            "q": "If a circle has radius 7 cm, find its circumference.",
            "marks": 1,
            "answer": "Circumference = 14π cm or 44 cm"
          },
          {
            "q": "Solve: 2x + 3 = 11",
            "marks": 1,
            "answer": "x = 4"
          },
          {
            "q": "Find the median of 2, 5, 8, 9, 12.",
            "marks": 1,
            "answer": "Median = 8"
          },
          {
            "q": "What is the probability of getting a head when a coin is tossed?",
            "marks": 1,
            "answer": "Probability = 1/2"
          },
          {
            "q": "If base = 10 cm and height = 5 cm, find the area of a triangle.",
            "marks": 1,
            "answer": "Area = 25 cm^2"
          },
          {
            "q": "Find the 10th term of GP: 2, 6, 18, 54, ...",
            "marks": 1,
            "answer": "a_10 = 39366"
          },
          {
            "q": "Write the equation of line passing through (1, 2) with slope 3.",
            "marks": 1,
            "answer": "y = 3x - 1"
          },
          {
            "q": "If cos(A) = 4/5, find tan(A).",
            "marks": 1,
            "answer": "tan(A) = 3/4"
          },
          {
            "q": "Find the volume of a cube with side 5 cm.",
            "marks": 1,
            "answer": "Volume = 125 cm^3"
          },
          {
            "q": "Express 0.25 as a fraction.",
            "marks": 1,
            "answer": "1/4"
          },
          {
            "q": "If angle in a semicircle is 90 degrees, what is the angle subtended at the center for a quarter circle?",
            "marks": 1,
            "answer": "90 degrees"
          },
          {
            "q": "Find the range of 15, 20, 25, 10, 30.",
            "marks": 1,
            "answer": "Range = 20"
          }
        ]
      },
      {
        "name": "Section B: Short Answer (2 marks each)",
        "marks": 30,
        "instructions": "Answer any 10 questions from the 15 given, showing working.",
        "questions": [
          {
            "q": "Prove that sqrt(2) is irrational.",
            "marks": 2,
            "answer": "Assume sqrt(2) = p/q where gcd(p,q)=1. Then 2q^2 = p^2, so p is even, p=2k. Then 2q^2=4k^2, so q is even. This contradicts gcd(p,q)=1. Therefore sqrt(2) is irrational."
          },
          {
            "q": "Solve the pair of equations: x + y = 7 and x - y = 3.",
            "marks": 2,
            "answer": "Adding: 2x = 10, so x = 5. Subtracting: 2y = 4, so y = 2. Solution: x=5, y=2"
          },
          {
            "q": "Find the sum of first 20 terms of AP: 3, 7, 11, 15, ...",
            "marks": 2,
            "answer": "a=3, d=4, n=20. S_20 = 20/2(2*3 + 19*4) = 10(6+76) = 820"
          },
          {
            "q": "Two circles have radii 5 cm and 3 cm. Find the distance between centers if they touch externally.",
            "marks": 2,
            "answer": "When circles touch externally, distance between centers = r1 + r2 = 5 + 3 = 8 cm"
          },
          {
            "q": "If sin(A) = 12/13, find cos(A) and tan(A) where A is acute.",
            "marks": 2,
            "answer": "cos(A) = 5/13, tan(A) = 12/5"
          },
          {
            "q": "Find the coordinates of the midpoint of the line segment joining (2, 3) and (6, 7).",
            "marks": 2,
            "answer": "Midpoint = ((2+6)/2, (3+7)/2) = (4, 5)"
          },
          {
            "q": "A number is 5 more than another. Their product is 84. Find the numbers.",
            "marks": 2,
            "answer": "Let numbers be x and x+5. x(x+5)=84. x^2+5x-84=0. (x+12)(x-7)=0. x=7 or x=-12. Numbers are 7 and 12 or -12 and -7."
          },
          {
            "q": "Find the area of a circle with radius 7 cm.",
            "marks": 2,
            "answer": "Area = πr^2 = 49π cm^2 or approximately 154 cm^2"
          },
          {
            "q": "In a triangle ABC, if angle A = 60 degrees and angle B = 75 degrees, find angle C.",
            "marks": 2,
            "answer": "Sum of angles in a triangle = 180 degrees. angle C = 180 - 60 - 75 = 45 degrees"
          },
          {
            "q": "Find the mode of the data: 2, 3, 3, 5, 5, 5, 7, 9.",
            "marks": 2,
            "answer": "Mode = 5 (appears 3 times)"
          },
          {
            "q": "If a number is divisible by 2 and 3, is it divisible by 6? Why?",
            "marks": 2,
            "answer": "Yes, because 2 and 3 are coprime (gcd=1). By the property of divisibility, if a number is divisible by two coprime numbers, it is divisible by their product."
          },
          {
            "q": "Construct a triangle with sides 4 cm, 5 cm, and 6 cm.",
            "marks": 2,
            "answer": "Using compass and ruler: Draw base 5 cm. From one end mark arc of 4 cm. From other end mark arc of 6 cm. Join intersection point to both ends."
          },
          {
            "q": "Find the sum of angles in a polygon with 8 sides.",
            "marks": 2,
            "answer": "Sum = (n-2)*180 = (8-2)*180 = 6*180 = 1080 degrees"
          },
          {
            "q": "If 3 is a root of x^2 + kx - 12 = 0, find k.",
            "marks": 2,
            "answer": "Substitute x=3: 9 + 3k - 12 = 0. 3k = 3. k = 1"
          },
          {
            "q": "A train travels 300 km in 5 hours. Find its average speed.",
            "marks": 2,
            "answer": "Average speed = distance/time = 300/5 = 60 km/h"
          }
        ]
      },
      {
        "name": "Section C: Long Answer (4 marks each)",
        "marks": 60,
        "instructions": "Answer any 10 questions from the 15 given. Show full working and reasoning.",
        "questions": [
          {
            "q": "An arithmetic progression has first term a and common difference d. Find the sum of first n terms and derive it.",
            "marks": 4,
            "answer": "Let S_n = sum of first n terms. S_n = a + (a+d) + (a+2d) + ... + (a+(n-1)d). Writing in reverse: S_n = (a+(n-1)d) + ... + (a+d) + a. Adding: 2S_n = n(2a+(n-1)d). S_n = n/2(2a+(n-1)d) or n/2(first_term + last_term)."
          },
          {
            "q": "Two circles with centers O1 and O2 and radii r1=5 cm and r2=3 cm are such that the distance between centers is 4 cm. Prove that they intersect.",
            "marks": 4,
            "answer": "For two circles to intersect, distance d must satisfy |r1-r2| < d < r1+r2. Here |5-3| = 2 and 5+3 = 8. Since 2 < 4 < 8, the circles intersect at two points."
          },
          {
            "q": "Prove that angles in the same segment of a circle are equal.",
            "marks": 4,
            "answer": "Let circle have center O and points A, B, C, D on the circle in the same segment. Angles ACB and ADB both subtend the same arc AB. By the inscribed angle theorem, both angles equal half the central angle AOB. Therefore angle ACB = angle ADB."
          },
          {
            "q": "A shopkeeper bought items at Rs 50 per unit and sold at Rs 75 per unit. After selling 100 units, what is the profit percentage?",
            "marks": 4,
            "answer": "Cost price = 50*100 = 5000. Selling price = 75*100 = 7500. Profit = 7500 - 5000 = 2500. Profit % = (2500/5000)*100 = 50%"
          },
          {
            "q": "A quadrilateral ABCD has vertices A(1,2), B(4,2), C(4,5), D(1,5). Prove it is a rectangle and find its area.",
            "marks": 4,
            "answer": "Distance AB = 3, BC = 3, CD = 3, DA = 3. All sides equal. Diagonals AC and BD both = sqrt(18) = 3sqrt(2). Equal diagonals and equal sides mean it's a square. Area = 3*3 = 9 square units."
          },
          {
            "q": "If tan(A) + cot(A) = 2, find tan(A) and cot(A).",
            "marks": 4,
            "answer": "Let tan(A) = x. Then cot(A) = 1/x. x + 1/x = 2. x^2 - 2x + 1 = 0. (x-1)^2 = 0. x = 1. Therefore tan(A) = 1 and cot(A) = 1. So A = 45 degrees."
          },
          {
            "q": "Find the area of a triangle with vertices at A(0,0), B(4,0), and C(2,3).",
            "marks": 4,
            "answer": "Area = (1/2)|x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| = (1/2)|0(0-3) + 4(3-0) + 2(0-0)| = (1/2)|0 + 12 + 0| = 6 square units"
          },
          {
            "q": "Solve the quadratic equation 2x^2 - 5x + 2 = 0 using the quadratic formula.",
            "marks": 4,
            "answer": "x = (5 ± sqrt(25-16))/4 = (5 ± sqrt(9))/4 = (5 ± 3)/4. x = 8/4 = 2 or x = 2/4 = 1/2. Solutions: x = 2 or x = 1/2"
          },
          {
            "q": "A cone has height 12 cm and base radius 5 cm. Find its curved surface area and volume.",
            "marks": 4,
            "answer": "Slant height l = sqrt(h^2 + r^2) = sqrt(144 + 25) = sqrt(169) = 13 cm. Curved surface area = πrl = 65π cm^2. Volume = (1/3)πr^2h = (1/3)π*25*12 = 100π cm^3"
          },
          {
            "q": "In a data set of 10 numbers, the mean is 25. If one number 15 is replaced by 35, find the new mean.",
            "marks": 4,
            "answer": "Original sum = 25*10 = 250. New sum = 250 - 15 + 35 = 270. New mean = 270/10 = 27"
          },
          {
            "q": "Prove that the sum of opposite angles in a cyclic quadrilateral is 180 degrees.",
            "marks": 4,
            "answer": "In cyclic quadrilateral ABCD inscribed in a circle, angle A is inscribed in arc BCD and angle C is inscribed in arc BAD. These arcs together form the complete circle (360 degrees). By inscribed angle theorem, angle A = (arc BCD)/2 and angle C = (arc BAD)/2. angle A + angle C = ((arc BCD) + (arc BAD))/2 = 360/2 = 180 degrees."
          },
          {
            "q": "A ladder of length 13 meters leans against a wall. The foot of the ladder is 5 meters away from the wall. How high does the ladder reach on the wall?",
            "marks": 4,
            "answer": "Using Pythagoras theorem: h^2 + 5^2 = 13^2. h^2 + 25 = 169. h^2 = 144. h = 12 meters"
          },
          {
            "q": "Find the standard deviation of the data: 2, 4, 6, 8, 10.",
            "marks": 4,
            "answer": "Mean = 6. Variance = ((2-6)^2 + (4-6)^2 + (6-6)^2 + (8-6)^2 + (10-6)^2)/5 = (16+4+0+4+16)/5 = 40/5 = 8. Standard deviation = sqrt(8) = 2sqrt(2)"
          },
          {
            "q": "Two variables x and y have a linear relationship y = 3x + 2. If x increases by 5, how much does y increase?",
            "marks": 4,
            "answer": "The rate of change of y with respect to x is 3 (the slope). When x increases by 5, y increases by 3*5 = 15."
          },
          {
            "q": "Construct an angle of 60 degrees using compass and ruler. Then bisect it to get 30 degrees.",
            "marks": 4,
            "answer": "First construct 60 degrees: Draw a line, mark a point, draw an arc of any radius to intersect the line at two points, then from intersection points draw arcs of same radius to find a point forming 60 degrees. To bisect, place compass on the vertex, draw an arc, from the intersection points on the sides of 60 degrees arc, draw two arcs intersecting at a point. The line through this point and vertex bisects the angle to create 30 degrees."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the best way to prepare for CBSE Class 10 Maths exam?",
        "a": "Practice sample papers regularly, focus on understanding concepts rather than rote learning, solve previous years papers, and identify weak areas for targeted revision."
      },
      {
        "q": "How much time should I allocate for each section during the exam?",
        "a": "Allocate about 45 minutes for Section A (20 questions), 60 minutes for Section B (10 questions), and 75 minutes for Section C (10 questions), leaving 30 minutes for review."
      },
      {
        "q": "Are calculators allowed in CBSE Class 10 Maths?",
        "a": "No, calculators are not allowed. You must perform all calculations by hand using mathematical methods and formulas."
      }
    ]
  },
  {
    "slug": "class-10-science-set-2",
    "classLevel": "Class 10",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Science Sample Paper 2026 Set 2 (with Solutions)",
    "intro": "This sample paper covers Physics, Chemistry, and Biology topics from the CBSE curriculum. Test your understanding of fundamental concepts and their real-world applications. This set is longer than the board paper: 110 marks against the 80-mark CBSE pattern, so treat it as extended practice rather than a timed board rehearsal.",
    "duration": "4 hours",
    "totalMarks": 110,
    "sections": [
      {
        "name": "Section A: Multiple Choice (1 mark each)",
        "marks": 20,
        "instructions": "Choose the correct answer for each question.",
        "questions": [
          {
            "q": "Which of the following is a non-renewable resource? (a) Solar energy (b) Coal (c) Wind energy (d) Hydroelectric power",
            "marks": 1,
            "answer": "(b) Coal"
          },
          {
            "q": "The pH value of a neutral solution is: (a) 0 (b) 7 (c) 14 (d) >7",
            "marks": 1,
            "answer": "(b) 7"
          },
          {
            "q": "Which metal is most reactive? (a) Iron (b) Sodium (c) Copper (d) Gold",
            "marks": 1,
            "answer": "(b) Sodium"
          },
          {
            "q": "The speed of light in vacuum is approximately: (a) 3x10^8 m/s (b) 3x10^6 m/s (c) 3x10^4 m/s (d) 3x10^2 m/s",
            "marks": 1,
            "answer": "(a) 3x10^8 m/s"
          },
          {
            "q": "Which organelle is responsible for photosynthesis? (a) Mitochondria (b) Ribosome (c) Chloroplast (d) Golgi apparatus",
            "marks": 1,
            "answer": "(c) Chloroplast"
          },
          {
            "q": "The chemical formula of table salt is: (a) KCl (b) NaCl (c) CaCl2 (d) MgCl2",
            "marks": 1,
            "answer": "(b) NaCl"
          },
          {
            "q": "Which is a vector quantity? (a) Speed (b) Temperature (c) Velocity (d) Mass",
            "marks": 1,
            "answer": "(c) Velocity"
          },
          {
            "q": "The process by which plants make their own food is called: (a) Respiration (b) Photosynthesis (c) Transpiration (d) Fermentation",
            "marks": 1,
            "answer": "(b) Photosynthesis"
          },
          {
            "q": "What is the SI unit of electric current? (a) Volt (b) Ohm (c) Ampere (d) Watt",
            "marks": 1,
            "answer": "(c) Ampere"
          },
          {
            "q": "Which of these is a compound? (a) Oxygen (b) Nitrogen (c) Water (d) Argon",
            "marks": 1,
            "answer": "(c) Water"
          },
          {
            "q": "The force of attraction between the earth and an object is: (a) Normal force (b) Gravity (c) Friction (d) Magnetic force",
            "marks": 1,
            "answer": "(b) Gravity"
          },
          {
            "q": "Which blood cells fight infections? (a) Red blood cells (b) White blood cells (c) Platelets (d) Plasma",
            "marks": 1,
            "answer": "(b) White blood cells"
          },
          {
            "q": "The number of chambers in a human heart is: (a) 2 (b) 3 (c) 4 (d) 5",
            "marks": 1,
            "answer": "(c) 4"
          },
          {
            "q": "What type of reaction is combustion? (a) Decomposition (b) Combination (c) Oxidation (d) Reduction",
            "marks": 1,
            "answer": "(c) Oxidation"
          },
          {
            "q": "The wavelength of visible light is approximately: (a) 400-700 nm (b) 100-200 nm (c) 800-900 nm (d) 1000-1100 nm",
            "marks": 1,
            "answer": "(a) 400-700 nm"
          },
          {
            "q": "Which metal does not react with dilute hydrochloric acid? (a) Iron (b) Zinc (c) Copper (d) Calcium",
            "marks": 1,
            "answer": "(c) Copper"
          },
          {
            "q": "The process of conversion of glucose into ethanol is: (a) Respiration (b) Fermentation (c) Photosynthesis (d) Decomposition",
            "marks": 1,
            "answer": "(b) Fermentation"
          },
          {
            "q": "Ohm's law states that: (a) V=IR (b) P=VI (c) R=V/I (d) All of the above",
            "marks": 1,
            "answer": "(d) All of the above"
          },
          {
            "q": "Which hormone controls blood glucose levels? (a) Insulin (b) Adrenaline (c) Thyroxine (d) Cortisol",
            "marks": 1,
            "answer": "(a) Insulin"
          },
          {
            "q": "The principle behind electrolysis is based on: (a) Faraday's law (b) Newton's law (c) Boyle's law (d) Charles's law",
            "marks": 1,
            "answer": "(a) Faraday's law"
          }
        ]
      },
      {
        "name": "Section B: Short Answer (2 marks each)",
        "marks": 30,
        "instructions": "Answer any 10 questions briefly.",
        "questions": [
          {
            "q": "What is the difference between exothermic and endothermic reactions? Give one example of each.",
            "marks": 2,
            "answer": "Exothermic reactions release heat (burning wood). Endothermic reactions absorb heat (melting ice)."
          },
          {
            "q": "Explain the greenhouse effect and its impact on climate.",
            "marks": 2,
            "answer": "Greenhouse gases trap heat in the atmosphere, preventing it from escaping to space. This causes global warming and climate change."
          },
          {
            "q": "What are the three states of matter? Describe the arrangement of particles in each.",
            "marks": 2,
            "answer": "Solid: particles closely packed in fixed positions. Liquid: particles close but can move freely. Gas: particles far apart and move randomly."
          },
          {
            "q": "How does the human circulatory system work? Name its main components.",
            "marks": 2,
            "answer": "Heart pumps blood through arteries to body tissues and veins return it. Components: heart, arteries, veins, capillaries, blood."
          },
          {
            "q": "What is the difference between mitosis and meiosis?",
            "marks": 2,
            "answer": "Mitosis produces two identical daughter cells (2n). Meiosis produces four haploid cells (n) for reproduction."
          },
          {
            "q": "Define refraction. How does it occur when light enters a denser medium?",
            "marks": 2,
            "answer": "Refraction is bending of light at an interface. Light slows in denser medium, causing the ray to bend toward the normal."
          },
          {
            "q": "What is the role of enzymes in digestion?",
            "marks": 2,
            "answer": "Enzymes act as biological catalysts, speeding up the breakdown of food into smaller molecules that can be absorbed."
          },
          {
            "q": "Distinguish between acids and bases using pH values.",
            "marks": 2,
            "answer": "Acids have pH < 7 (sour taste, turn blue litmus red). Bases have pH > 7 (bitter taste, turn red litmus blue)."
          },
          {
            "q": "What is osmosis? Why is it important for cells?",
            "marks": 2,
            "answer": "Osmosis is movement of water across a semipermeable membrane from dilute to concentrated solution. It maintains cell turgor and prevents dehydration."
          },
          {
            "q": "Explain the role of chlorophyll in photosynthesis.",
            "marks": 2,
            "answer": "Chlorophyll absorbs light energy (especially red and blue wavelengths) and converts it to chemical energy in the form of ATP and NADPH."
          },
          {
            "q": "What is the difference between renewable and non-renewable resources? Give examples.",
            "marks": 2,
            "answer": "Renewable resources can be replenished (solar, wind, water). Non-renewable resources are finite (coal, oil, natural gas)."
          },
          {
            "q": "How does temperature affect the rate of a chemical reaction?",
            "marks": 2,
            "answer": "Higher temperature increases molecular collisions, increasing reaction rate. Lower temperature decreases collisions and slows the reaction."
          },
          {
            "q": "What is the function of stomata in leaves?",
            "marks": 2,
            "answer": "Stomata allow gas exchange (CO2 enters, O2 exits) and water vapor loss. They regulate water and gas movement."
          },
          {
            "q": "Define focal length and explain its relationship with power of a lens.",
            "marks": 2,
            "answer": "Focal length is distance from lens to focal point. Power = 1/f (in meters). Thicker lenses have shorter focal length and higher power."
          },
          {
            "q": "What are the symptoms of deficiency of Vitamin C in the human body?",
            "marks": 2,
            "answer": "Weakness, bleeding gums, poor wound healing, anemia. The disease is called Scurvy."
          }
        ]
      },
      {
        "name": "Section C: Long Answer (4 marks each)",
        "marks": 60,
        "instructions": "Answer any 10 questions with detailed explanations.",
        "questions": [
          {
            "q": "Describe the process of photosynthesis. Write the chemical equation and explain the roles of light and dark reactions.",
            "marks": 4,
            "answer": "Photosynthesis: 6CO2 + 6H2O + light energy = C6H12O6 + 6O2. Light reaction occurs in thylakoids, producing ATP and NADPH. Dark reaction (Calvin cycle) in stroma uses ATP and NADPH to fix CO2 into glucose."
          },
          {
            "q": "Explain the structure and function of mitochondria. Why is it called the powerhouse of the cell?",
            "marks": 4,
            "answer": "Mitochondria has double membrane with cristae. Inner membrane has electron transport chain. It performs aerobic respiration, producing ATP (energy). Called powerhouse because it generates most cellular energy through oxidation of nutrients."
          },
          {
            "q": "Describe the process of refraction through a prism. How do different colors separate?",
            "marks": 4,
            "answer": "Light enters prism and refracts toward normal. Different wavelengths refract differently (shorter wavelengths bend more). Red (longer wavelength) bends less, violet (shorter) bends more. This creates dispersion into spectrum."
          },
          {
            "q": "Explain the process of rusting of iron. What conditions are necessary? How can it be prevented?",
            "marks": 4,
            "answer": "Rusting is oxidation of iron to form iron oxide. Requires iron, oxygen, and water. Prevention: painting, galvanizing, oiling, alloying with chromium (stainless steel)."
          },
          {
            "q": "Describe the human nervous system. Distinguish between the central and peripheral nervous systems and their functions.",
            "marks": 4,
            "answer": "Nervous system processes information and coordinates responses. CNS (brain and spinal cord) processes signals. PNS (nerves) carries signals between CNS and body. Somatic PNS controls voluntary muscles, autonomic controls involuntary functions."
          },
          {
            "q": "Explain the concept of evolution and natural selection as proposed by Darwin.",
            "marks": 4,
            "answer": "Evolution is gradual change in organisms over time. Natural selection: organisms with advantageous traits survive and reproduce more. Over generations, beneficial traits become common. Species adapt to environments, sometimes leading to new species."
          },
          {
            "q": "Describe the process of digestion in the human body. Name the enzymes involved and their substrates.",
            "marks": 4,
            "answer": "Digestion breaks food mechanically and chemically. In mouth: salivary amylase breaks starch. Stomach: pepsin breaks proteins. Small intestine: trypsin (protein), lipase (fat), amylase (carbs). Nutrients absorbed through intestinal lining."
          },
          {
            "q": "Explain the law of conservation of mass in chemical reactions with an example.",
            "marks": 4,
            "answer": "Matter cannot be created or destroyed. In a reaction, total mass of reactants equals total mass of products. Example: 2H2 + O2 = 2H2O. Mass of hydrogen and oxygen in reactants equals mass of water in product."
          },
          {
            "q": "Describe the structure of DNA. Explain how DNA replicates during cell division.",
            "marks": 4,
            "answer": "DNA: double helix of two strands of nucleotides (A, T, G, C). A pairs with T, G with C. Replication: helicase unwinds strands, DNA polymerase adds complementary nucleotides, resulting in two identical copies."
          },
          {
            "q": "Explain how a simple electric circuit works. Describe the flow of electrons and the role of voltage.",
            "marks": 4,
            "answer": "Circuit: closed path for current flow. Voltage (EMF) from battery drives electrons through circuit. Electrons flow from negative to positive terminal (actual direction opposite to conventional current direction). Resistance opposes flow, power = V*I."
          },
          {
            "q": "Describe the process of reproduction in plants. Explain the difference between sexual and asexual reproduction.",
            "marks": 4,
            "answer": "Sexual reproduction: pollen fertilizes ovule, producing seeds with genetic variation. Asexual: vegetative growth produces identical offspring (runners, bulbs). Sexual provides genetic diversity, asexual is faster."
          },
          {
            "q": "Explain the concept of pH and buffer solutions. How do buffers maintain constant pH?",
            "marks": 4,
            "answer": "pH measures H+ ion concentration (log scale 0-14). Buffer: weak acid and its salt (or weak base and its salt). When acid added, anion neutralizes it. When base added, weak acid neutralizes it. Maintains relatively constant pH."
          },
          {
            "q": "Describe the water cycle. Explain the processes involved and their importance to ecosystems.",
            "marks": 4,
            "answer": "Water cycle: evaporation (sun heats water), condensation (forms clouds), precipitation (rain/snow), runoff, infiltration. Cycles water between atmosphere, land, and ocean. Essential for all life, regulates climate."
          },
          {
            "q": "Explain the concept of reflection and refraction of light. How are they different?",
            "marks": 4,
            "answer": "Reflection: light bounces off surface, angle of incidence equals angle of reflection. Refraction: light bends at interface between media due to change in speed. Reflection changes direction without changing medium, refraction occurs at boundaries."
          },
          {
            "q": "Describe the structure and function of the human respiratory system. Explain gas exchange in alveoli.",
            "marks": 4,
            "answer": "System: nose, trachea, bronchi, lungs. Air enters through nose, travels down to alveoli (air sacs). In alveoli: CO2 diffuses from blood into alveolus, O2 diffuses from alveolus into blood. Diffusion driven by concentration gradient."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the importance of practicing CBSE Science sample papers?",
        "a": "Sample papers help you understand the exam pattern, practice time management, identify weak topics, and build confidence for the actual exam."
      },
      {
        "q": "Should I study all topics equally for CBSE Class 10 Science?",
        "a": "While all topics are important, focus more on chapters with higher weightage. However, do not completely neglect any topic as even small chapters can contribute marks."
      },
      {
        "q": "How can I improve my understanding of complex Science concepts?",
        "a": "Use diagrams, create mind maps, perform experiments, watch educational videos, and discuss concepts with peers or teachers to gain deeper understanding."
      }
    ]
  },
  {
    "slug": "class-10-hindi",
    "classLevel": "Class 10",
    "subject": "Hindi",
    "board": "CBSE",
    "title": "CBSE Class 10 Hindi Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper tests your Hindi language skills including reading comprehension, grammar, writing, and literature. Master both prose and poetry from the CBSE curriculum. This is a shortened practice set: 14 questions worth 75 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 75,
    "sections": [
      {
        "name": "Section A: Reading Comprehension (15 marks)",
        "marks": 15,
        "instructions": "Read the passage and answer all questions.",
        "questions": [
          {
            "q": "ईश्वर को कहाँ खोजा जा सकता है?",
            "marks": 3,
            "answer": "ईश्वर को प्रकृति में, पेड़ों में, पक्षियों में, नदियों में और सभी जीवों में खोजा जा सकता है। उसे सर्वव्यापी माना जाता है।"
          },
          {
            "q": "प्रकृति से जुड़ने से क्या लाभ होता है?",
            "marks": 3,
            "answer": "प्रकृति से जुड़ने से हमें आत्मिक शांति मिलती है।"
          },
          {
            "q": "पाठ के अनुसार, ईश्वर के किन स्थानों पर दर्शन किए जा सकते हैं?",
            "marks": 3,
            "answer": "पेड़ों में, पक्षियों में, नदियों में और अन्य सभी जीवों में।"
          },
          {
            "q": "इस पाठ का मुख्य विचार क्या है?",
            "marks": 3,
            "answer": "प्रकृति में ईश्वर का दर्शन करना और प्रकृति से जुड़कर आत्मिक शांति प्राप्त करना।"
          },
          {
            "q": "ईश्वर को समझना क्यों कठिन है?",
            "marks": 3,
            "answer": "क्योंकि वह सर्वव्यापी है और सभी जीवों में व्याप्त है, जिसे सीधे समझना मनुष्य के लिए कठिन है।"
          }
        ],
        "passage": "ईश्वर के वास्तविक रूप को समझना मनुष्य के लिए कठिन है। वह सर्वव्यापी है और सभी जीवों में निवास करता है। आँखों से न दिखाई देने वाली इस शक्ति को केवल बुद्धि से नहीं, अनुभव से जाना जाता है।\n\nहमें अपने आसपास की प्रकृति में उसके दर्शन करने चाहिए। पेड़ों में, पक्षियों में, नदियों में उसी महान शक्ति का अस्तित्व है। जो व्यक्ति सुबह उगते सूर्य को, बहती नदी को और खिलते फूल को ध्यान से देखता है, वह धीरे-धीरे इस सत्य के निकट पहुँचता है।\n\nजब हम प्रकृति से जुड़ते हैं, तो हमें आत्मिक शांति मिलती है। मन का शोर कम होता है और भीतर एक स्थिरता आती है। यही कारण है कि हमारे ऋषि-मुनि वनों में निवास करते थे। वे जानते थे कि प्रकृति की गोद ही सच्चा मंदिर है, जहाँ बिना किसी आडंबर के ईश्वर के दर्शन किए जा सकते हैं।"
      },
      {
        "name": "Section B: Grammar and Writing (35 marks)",
        "marks": 30,
        "instructions": "Complete all grammar and writing exercises.",
        "questions": [
          {
            "q": "निम्नलिखित वाक्य को शुद्ध करो: वह कहा कि मैं घर जाओ। (5 marks)",
            "marks": 5,
            "answer": "शुद्ध वाक्य: वह कहा कि मैं घर जाऊँ। अथवा वह कहता है कि मैं घर जाऊँ।"
          },
          {
            "q": "निम्नलिखित शब्दों का समानार्थक शब्द लिखो: (i) ज्ञान (ii) गति (iii) शांति (iv) सौंदर्य (v) साहस (5 marks)",
            "marks": 5,
            "answer": "(i) विद्या (ii) चाल (iii) शांति/मौन (iv) सुंदरता (v) वीरता"
          },
          {
            "q": "विलोम शब्द लिखो: (i) गर्म (ii) अंधकार (iii) सुख (iv) आने (v) बड़ा (5 marks)",
            "marks": 5,
            "answer": "(i) ठंडा (ii) प्रकाश (iii) दुख (iv) जाना (v) छोटा"
          },
          {
            "q": "निम्नलिखित मुहावरों का अर्थ बताओ और वाक्य में प्रयोग करो: (i) अंगूठा दिखाना (ii) नाक में दम करना (5 marks)",
            "marks": 5,
            "answer": "(i) अस्वीकार करना/इंकार करना। वाक्य: जब मैंने उससे काम मांगा तो उसने अंगूठा दिखा दिया। (ii) परेशान करना। वाक्य: इस बीमारी ने हमें नाक में दम कर दिया।"
          },
          {
            "q": "दिए गए विषय पर 100 शब्दों में निबंध लिखो: आधुनिक शिक्षा का महत्व (10 marks)",
            "marks": 10,
            "answer": "आधुनिक शिक्षा का महत्व: आज का समय तकनीकी और ज्ञान के विकास का समय है। आधुनिक शिक्षा छात्रों को वास्तविक जीवन के लिए तैयार करती है। यह केवल पुस्तकों तक सीमित नहीं है, बल्कि व्यावहारिक ज्ञान भी देती है। कंप्यूटर, इंटरनेट और अन्य तकनीकें आधुनिक शिक्षा का मुख्य अंग हैं। आधुनिक शिक्षा से छात्र आत्मनिर्भर बनते हैं और समाज में अपना योगदान दे सकते हैं। विश्व प्रतिस्पर्धा में भारत को आगे बढ़ाने के लिए गुणवत्तापूर्ण आधुनिक शिक्षा आवश्यक है।"
          }
        ]
      },
      {
        "name": "Section C: Literature (30 marks)",
        "marks": 30,
        "instructions": "Answer questions based on prescribed texts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "किसी एक कविता का सारांश 50 शब्दों में लिखो और उसका केंद्रीय संदेश बताओ। (8 marks)",
            "marks": 8,
            "answer": "छात्र अपनी पाठ्यक्रम की कविता का सारांश लिख सकते हैं। उदाहरण: यदि 'सखी वह कहत नटत मुस्कुराय' कविता है तो: राधा कृष्ण के प्रेम को दर्शाती है। कृष्ण की मुस्कुराहट और नटखटपन को दर्शाया गया है। केंद्रीय संदेश: दिव्य प्रेम और भक्ति भावना।"
          },
          {
            "q": "किसी पाठ के मुख्य पात्र का चरित्र चित्रण करो (100 शब्द)। (8 marks)",
            "marks": 8,
            "answer": "छात्र अपने पाठ्यक्रम के किसी पात्र का विस्तृत चरित्र विश्लेषण कर सकते हैं। उदाहरण यदि 'आत्मकथ्य' पाठ है तो अज्ञेय का चरित्र: कवि स्वयं को कालजयी बताते हैं। वे स्वतंत्रता की भावना रखते हैं। साहस और निडरता उनके प्रमुख गुण हैं। समाज की परिपाटियों को चुनौती देने का साहस।"
          },
          {
            "q": "एक प्रश्न का उत्तर 80 शब्दों में दो: पाठ का प्रमुख विषय क्या है? (7 marks)",
            "marks": 7,
            "answer": "छात्र अपने पाठ्यक्रम के किसी पाठ का विषय समझाएं। उदाहरण: यदि 'बड़े भाई साहब' पाठ है तो: इस पाठ का मुख्य विषय बड़े और छोटे भाई के बीच का संबंध है। बड़े भाई की जिम्मेदारी और छोटे भाई की मासूमियत को दर्शाया गया है। शिक्षा और जीवन दर्शन की भी चर्चा है। पारिवारिक मूल्यों का महत्व प्रतिपादित है।"
          },
          {
            "q": "काव्य में आए किसी अलंकार का उदाहरण देकर समझाओ। (7 marks)",
            "marks": 7,
            "answer": "उदाहरण: 'मुखचंद्र' में उपमा अलंकार है। चेहरा चाँद के समान सुंदर है। यहाँ मुख की तुलना चंद्र से की गई है। अलंकार से काव्य की सुंदरता बढ़ती है और भाव व्यक्ति होता है। अन्य अलंकार: रूपक, यमक, श्लेष आदि।"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "CBSE Class 10 Hindi परीक्षा में कितने अंक निर्धारित हैं?",
        "a": "कुल 80 अंक हैं। Reading (15 अंक), Grammar & Writing (35 अंक), और Literature (30 अंक) में विभाजित।"
      },
      {
        "q": "निबंध लेखन के लिए कितना समय आवंटित करना चाहिए?",
        "a": "निबंध लेखन के लिए लगभग 20-25 मिनट का समय देना चाहिए ताकि आप सुव्यवस्थित और सुंदर लेखन कर सकें।"
      },
      {
        "q": "साहित्य प्रश्नों का उत्तर देते समय क्या सावधानी रखनी चाहिए?",
        "a": "पाठ्यक्रम के निर्धारित पाठों से ही उदाहरण दें, प्रश्नों का प्रत्यक्ष उत्तर दें, और सुंदर हिंदी में लिखें।"
      }
    ]
  },
  {
    "slug": "class-9-maths-set-2",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 9 Mathematics Sample Paper 2026 Set 2 (with Solutions)",
    "intro": "This comprehensive sample paper tests your knowledge of Class 9 Maths including number systems, geometry, and statistics. Practice regularly to strengthen your foundation for higher classes. This set is longer than the board paper: 110 marks against the 80-mark CBSE pattern, so treat it as extended practice rather than a timed board rehearsal.",
    "duration": "4 hours",
    "totalMarks": 110,
    "sections": [
      {
        "name": "Section A: Multiple Choice",
        "marks": 20,
        "instructions": "Choose the correct option for each of the 20 questions.",
        "questions": [
          {
            "q": "sqrt(144) = ? (a) 12 (b) 14 (c) 11 (d) 13",
            "marks": 1,
            "answer": "(a) 12"
          },
          {
            "q": "The value of pi to two decimal places is: (a) 3.12 (b) 3.14 (c) 3.16 (d) 3.18",
            "marks": 1,
            "answer": "(b) 3.14"
          },
          {
            "q": "A quadrilateral with all sides equal and all angles 90 is: (a) Rectangle (b) Square (c) Rhombus (d) Trapezoid",
            "marks": 1,
            "answer": "(b) Square"
          },
          {
            "q": "The sum of interior angles of a triangle is: (a) 90 (b) 180 (c) 270 (d) 360",
            "marks": 1,
            "answer": "(b) 180"
          },
          {
            "q": "Area of a rectangle with length 5 cm and width 3 cm is: (a) 8 (b) 15 (c) 16 (d) 10",
            "marks": 1,
            "answer": "(b) 15"
          },
          {
            "q": "Which is a perfect cube? (a) 8 (b) 12 (c) 18 (d) 20",
            "marks": 1,
            "answer": "(a) 8"
          },
          {
            "q": "The average of 10, 20, 30 is: (a) 15 (b) 20 (c) 25 (d) 30",
            "marks": 1,
            "answer": "(b) 20"
          },
          {
            "q": "If x + 5 = 12, then x = ? (a) 5 (b) 6 (c) 7 (d) 8",
            "marks": 1,
            "answer": "(c) 7"
          },
          {
            "q": "Circumference of a circle with radius 7 cm: (a) 22 cm (b) 44 cm (c) 154 cm (d) 77 cm",
            "marks": 1,
            "answer": "(b) 44 cm"
          },
          {
            "q": "Probability of getting heads in a coin toss: (a) 0 (b) 0.5 (c) 1 (d) 2",
            "marks": 1,
            "answer": "(b) 0.5"
          },
          {
            "q": "3^3 = ? (a) 9 (b) 18 (c) 27 (d) 81",
            "marks": 1,
            "answer": "(c) 27"
          },
          {
            "q": "HCF of 12 and 18 is: (a) 2 (b) 3 (c) 6 (d) 12",
            "marks": 1,
            "answer": "(c) 6"
          },
          {
            "q": "Area of a circle with radius 5 cm: (a) 78.5 (b) 31.4 (c) 25 (d) 50",
            "marks": 1,
            "answer": "(a) 78.5"
          },
          {
            "q": "Perimeter of a square with side 6 cm: (a) 12 (b) 18 (c) 24 (d) 36",
            "marks": 1,
            "answer": "(c) 24"
          },
          {
            "q": "LCM of 4 and 6 is: (a) 2 (b) 12 (c) 24 (d) 6",
            "marks": 1,
            "answer": "(b) 12"
          },
          {
            "q": "2.5 + 3.7 = ? (a) 5.2 (b) 6.2 (c) 6.1 (d) 6.3",
            "marks": 1,
            "answer": "(b) 6.2"
          },
          {
            "q": "The number of sides in a hexagon: (a) 4 (b) 5 (c) 6 (d) 7",
            "marks": 1,
            "answer": "(c) 6"
          },
          {
            "q": "If 2x = 10, then x = ? (a) 4 (b) 5 (c) 6 (d) 7",
            "marks": 1,
            "answer": "(b) 5"
          },
          {
            "q": "Median of 5, 8, 12, 15, 20: (a) 8 (b) 12 (c) 15 (d) 20",
            "marks": 1,
            "answer": "(b) 12"
          },
          {
            "q": "Volume of a cube with side 3 cm: (a) 9 (b) 18 (c) 27 (d) 81",
            "marks": 1,
            "answer": "(c) 27"
          }
        ]
      },
      {
        "name": "Section B: Short Answer",
        "marks": 30,
        "instructions": "Answer any 10 questions briefly with working.",
        "questions": [
          {
            "q": "Find the value of 2^5 + 3^2.",
            "marks": 2,
            "answer": "2^5 = 32, 3^2 = 9. Sum = 32 + 9 = 41"
          },
          {
            "q": "Solve: 3x - 7 = 14",
            "marks": 2,
            "answer": "3x = 21. x = 7"
          },
          {
            "q": "Find the area of a triangle with base 10 cm and height 6 cm.",
            "marks": 2,
            "answer": "Area = (1/2) * base * height = (1/2) * 10 * 6 = 30 cm^2"
          },
          {
            "q": "Express 0.75 as a fraction in simplest form.",
            "marks": 2,
            "answer": "0.75 = 75/100 = 3/4"
          },
          {
            "q": "Find the distance between (0, 0) and (5, 12) using distance formula.",
            "marks": 2,
            "answer": "Distance = sqrt(5^2 + 12^2) = sqrt(25 + 144) = sqrt(169) = 13"
          },
          {
            "q": "If a + b = 10 and a - b = 2, find a and b.",
            "marks": 2,
            "answer": "Adding: 2a = 12, a = 6. From first: b = 4. Answer: a = 6, b = 4"
          },
          {
            "q": "Find the perimeter of a rectangle with length 8 cm and width 5 cm.",
            "marks": 2,
            "answer": "Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26 cm"
          },
          {
            "q": "Calculate 15% of 200.",
            "marks": 2,
            "answer": "(15/100) * 200 = 0.15 * 200 = 30"
          },
          {
            "q": "Find two consecutive integers whose sum is 25.",
            "marks": 2,
            "answer": "Let integers be x and x+1. x + (x+1) = 25. 2x + 1 = 25. x = 12. Integers are 12 and 13"
          },
          {
            "q": "Find the mode of 2, 3, 3, 5, 5, 5, 7.",
            "marks": 2,
            "answer": "Mode = 5 (appears 3 times)"
          },
          {
            "q": "Expand (a + b)(a - b).",
            "marks": 2,
            "answer": "(a + b)(a - b) = a^2 - b^2"
          },
          {
            "q": "Find the sum of first 5 natural numbers.",
            "marks": 2,
            "answer": "1 + 2 + 3 + 4 + 5 = 15 or (5*6)/2 = 15"
          },
          {
            "q": "If a rectangle has area 48 cm^2 and length 8 cm, find width.",
            "marks": 2,
            "answer": "Area = length * width. 48 = 8 * width. width = 6 cm"
          },
          {
            "q": "Convert 2/5 to decimal.",
            "marks": 2,
            "answer": "2/5 = 0.4"
          },
          {
            "q": "Find the LCM and HCF of 12 and 15.",
            "marks": 2,
            "answer": "HCF(12, 15) = 3. LCM(12, 15) = 60"
          }
        ]
      },
      {
        "name": "Section C: Long Answer",
        "marks": 60,
        "instructions": "Answer any 10 questions with detailed working.",
        "questions": [
          {
            "q": "A quadrilateral ABCD has angles A = 80, B = 100, C = 85. Find angle D. Explain your method.",
            "marks": 4,
            "answer": "Sum of angles in quadrilateral = 360 degrees. A + B + C + D = 360. 80 + 100 + 85 + D = 360. D = 360 - 265 = 95 degrees"
          },
          {
            "q": "Prove that (a + b)^2 = a^2 + 2ab + b^2 algebraically.",
            "marks": 4,
            "answer": "(a + b)^2 = (a + b)(a + b) = a(a + b) + b(a + b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2"
          },
          {
            "q": "A store offers 25% discount on items. If original price is 800, find selling price.",
            "marks": 4,
            "answer": "Discount = 25% of 800 = (25/100) * 800 = 200. Selling price = 800 - 200 = 600"
          },
          {
            "q": "Construct a triangle with sides 5 cm, 6 cm, and 7 cm.",
            "marks": 4,
            "answer": "Using compass: Draw base 6 cm. From one end, arc of radius 5 cm. From other end, arc of radius 7 cm. Join intersection point to both ends."
          },
          {
            "q": "A number is 5 more than another. Their product is 66. Find the numbers.",
            "marks": 4,
            "answer": "Let numbers be x and x+5. x(x+5) = 66. x^2 + 5x - 66 = 0. (x + 11)(x - 6) = 0. x = 6 or x = -11. Numbers are 6 and 11 or -11 and -6"
          },
          {
            "q": "Find the area and perimeter of a circle with radius 7 cm.",
            "marks": 4,
            "answer": "Area = πr^2 = π(7)^2 = 49π = 153.86 cm^2 (approx). Perimeter = 2πr = 2π(7) = 14π = 43.96 cm (approx)"
          },
          {
            "q": "Explain the difference between rational and irrational numbers with examples.",
            "marks": 4,
            "answer": "Rational: can be expressed as p/q (p, q integers, q not 0). Examples: 1/2, 3, -5/4. Irrational: cannot be expressed as p/q, non-terminating non-repeating decimals. Examples: sqrt(2), pi, e"
          },
          {
            "q": "A triangle has angles in ratio 1:2:3. Find all three angles.",
            "marks": 4,
            "answer": "Let angles be x, 2x, 3x. Sum = 180. x + 2x + 3x = 180. 6x = 180. x = 30. Angles are 30, 60, 90 degrees"
          },
          {
            "q": "Solve the pair of equations: 2x + y = 7 and x - y = 2. Find x and y.",
            "marks": 4,
            "answer": "Adding equations: 3x = 9, x = 3. From second: 3 - y = 2, y = 1. Solution: x = 3, y = 1"
          },
          {
            "q": "A trapezoid has parallel sides 8 cm and 12 cm, height 5 cm. Find area.",
            "marks": 4,
            "answer": "Area = (1/2)(sum of parallel sides)(height) = (1/2)(8 + 12)(5) = (1/2)(20)(5) = 50 cm^2"
          },
          {
            "q": "Find the sum of all even numbers from 1 to 50.",
            "marks": 4,
            "answer": "Even numbers: 2, 4, 6, ..., 50 form an AP with a=2, d=2, l=50. n = (50-2)/2 + 1 = 25. Sum = (25/2)(2+50) = (25/2)(52) = 650"
          },
          {
            "q": "Explain how to construct perpendicular bisector of a line segment.",
            "marks": 4,
            "answer": "Using compass: Place compass on one end, open more than half length, draw arcs above and below line. From other end, draw arcs same radius intersecting first arcs. Line through intersection points is perpendicular bisector."
          },
          {
            "q": "A cylinder has radius 5 cm and height 10 cm. Find its volume.",
            "marks": 4,
            "answer": "Volume = πr^2h = π(5)^2(10) = 250π = 785.4 cm^3 (approx)"
          },
          {
            "q": "Simplify: (3a^2 + 2a - 5) / (a - 1)",
            "marks": 4,
            "answer": "Factor numerator: 3a^2 + 2a - 5 = (3a + 5)(a - 1). Simplify: (3a + 5)(a - 1)/(a - 1) = 3a + 5"
          },
          {
            "q": "Find three consecutive odd numbers whose sum is 51.",
            "marks": 4,
            "answer": "Let numbers be x, x+2, x+4. Sum = 51. x + x+2 + x+4 = 51. 3x + 6 = 51. x = 15. Numbers are 15, 17, 19"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are most important for CBSE Class 9 Maths?",
        "a": "Number systems, polynomials, linear equations, geometry (triangles, circles), statistics and probability are key topics with high weightage."
      },
      {
        "q": "How can I improve my speed in solving Maths problems?",
        "a": "Practice regularly with sample papers, memorize formulas, identify patterns, and attempt to solve mentally for simple calculations."
      },
      {
        "q": "Is calculator allowed in Class 9 Maths exam?",
        "a": "No, calculators are not allowed. All calculations must be done by hand using mathematical methods and formulas."
      }
    ]
  },
  {
    "slug": "class-8-maths",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 8 Mathematics Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers the fundamental concepts of Class 8 Maths including algebra, geometry, and data handling. Master the basics to build a strong foundation.",
    "duration": "3 hours",
    "totalMarks": 100,
    "sections": [
      {
        "name": "Section A: Short Questions",
        "marks": 40,
        "instructions": "Answer all questions briefly.",
        "questions": [
          {
            "q": "Simplify: 3(a + 2b) - 2(a - b)",
            "marks": 2,
            "answer": "3a + 6b - 2a + 2b = a + 8b"
          },
          {
            "q": "Find the value of x if 2x + 5 = 21",
            "marks": 2,
            "answer": "2x = 16. x = 8"
          },
          {
            "q": "What is the area of a square with side 9 cm?",
            "marks": 2,
            "answer": "Area = 9^2 = 81 cm^2"
          },
          {
            "q": "Solve: x/3 = 5",
            "marks": 2,
            "answer": "x = 5 * 3 = 15"
          },
          {
            "q": "Find the perimeter of a rectangle with length 8 cm and width 5 cm.",
            "marks": 2,
            "answer": "Perimeter = 2(8 + 5) = 26 cm"
          },
          {
            "q": "What is 20% of 150?",
            "marks": 2,
            "answer": "(20/100) * 150 = 30"
          },
          {
            "q": "Simplify: 2x + 3x - x",
            "marks": 2,
            "answer": "4x"
          },
          {
            "q": "Find the circumference of a circle with radius 5 cm.",
            "marks": 2,
            "answer": "Circumference = 2πr = 2π(5) = 10π = 31.4 cm (approx)"
          },
          {
            "q": "Solve: 3x - 7 = 11",
            "marks": 2,
            "answer": "3x = 18. x = 6"
          },
          {
            "q": "What is the mean of 5, 10, 15, 20?",
            "marks": 2,
            "answer": "Mean = (5 + 10 + 15 + 20)/4 = 50/4 = 12.5"
          },
          {
            "q": "Express 3/4 as a percentage.",
            "marks": 2,
            "answer": "(3/4) * 100 = 75%"
          },
          {
            "q": "Solve: 5x = 45",
            "marks": 2,
            "answer": "x = 9"
          },
          {
            "q": "Find the area of a triangle with base 8 cm and height 6 cm.",
            "marks": 2,
            "answer": "Area = (1/2) * 8 * 6 = 24 cm^2"
          },
          {
            "q": "What is the volume of a cube with side 4 cm?",
            "marks": 2,
            "answer": "Volume = 4^3 = 64 cm^3"
          },
          {
            "q": "Simplify: (2x + 3) + (3x - 1)",
            "marks": 2,
            "answer": "5x + 2"
          },
          {
            "q": "Find 15% of 200.",
            "marks": 2,
            "answer": "(15/100) * 200 = 30"
          },
          {
            "q": "Solve: x - 8 = 12",
            "marks": 2,
            "answer": "x = 20"
          },
          {
            "q": "What is the mode of 2, 3, 3, 5, 7, 3?",
            "marks": 2,
            "answer": "Mode = 3"
          },
          {
            "q": "Find the median of 1, 3, 5, 7, 9.",
            "marks": 2,
            "answer": "Median = 5"
          },
          {
            "q": "Simplify: 4a^2 - 2a^2 + a^2",
            "marks": 2,
            "answer": "3a^2"
          }
        ]
      },
      {
        "name": "Section B: Long Answer Questions",
        "marks": 60,
        "instructions": "Answer any 10 questions with detailed working.",
        "questions": [
          {
            "q": "Solve: 2(x + 3) = 16 and verify your answer.",
            "marks": 4,
            "answer": "2x + 6 = 16. 2x = 10. x = 5. Verify: 2(5 + 3) = 2(8) = 16. Correct."
          },
          {
            "q": "A rectangle has length twice its width. If perimeter is 30 cm, find length and width.",
            "marks": 4,
            "answer": "Let width = w, length = 2w. Perimeter = 2(2w + w) = 30. 6w = 30. w = 5 cm, length = 10 cm"
          },
          {
            "q": "Find the area of a circle with diameter 14 cm.",
            "marks": 4,
            "answer": "Radius = 7 cm. Area = πr^2 = π(7)^2 = 49π = 153.86 cm^2"
          },
          {
            "q": "Simplify: 3(2x - 1) + 2(x + 3) - 5",
            "marks": 4,
            "answer": "6x - 3 + 2x + 6 - 5 = 8x - 2"
          },
          {
            "q": "A number increased by 15 is 40. Find the number.",
            "marks": 4,
            "answer": "Let number = x. x + 15 = 40. x = 25"
          },
          {
            "q": "Find the area and perimeter of a square with side 7 cm.",
            "marks": 4,
            "answer": "Area = 7^2 = 49 cm^2. Perimeter = 4 * 7 = 28 cm"
          },
          {
            "q": "Solve: 4x + 3 = 2x + 11",
            "marks": 4,
            "answer": "4x - 2x = 11 - 3. 2x = 8. x = 4"
          },
          {
            "q": "What is the selling price of an item with cost 500 and profit 20%?",
            "marks": 4,
            "answer": "Profit = 20% of 500 = 100. Selling price = 500 + 100 = 600"
          },
          {
            "q": "A cylinder has radius 3 cm and height 10 cm. Find volume.",
            "marks": 4,
            "answer": "Volume = πr^2h = π(3)^2(10) = 90π = 282.6 cm^3"
          },
          {
            "q": "Express 45% as a fraction in simplest form.",
            "marks": 4,
            "answer": "45% = 45/100 = 9/20"
          },
          {
            "q": "Solve the pair: x + y = 8 and x - y = 2.",
            "marks": 4,
            "answer": "Adding: 2x = 10, x = 5. From first: y = 3. Solution: x = 5, y = 3"
          },
          {
            "q": "A store offers 30% discount. Original price is 1000. Find selling price.",
            "marks": 4,
            "answer": "Discount = 30% of 1000 = 300. Selling price = 1000 - 300 = 700"
          },
          {
            "q": "Find the sum of angles in a hexagon.",
            "marks": 4,
            "answer": "Sum = (n - 2) * 180 = (6 - 2) * 180 = 4 * 180 = 720 degrees"
          },
          {
            "q": "Construct a triangle with angles 60, 60, 60. What type of triangle is it?",
            "marks": 4,
            "answer": "All angles equal 60 degrees. This is an equilateral triangle. All sides are equal."
          },
          {
            "q": "A tank is filled 3/4. How much more is needed to fill completely?",
            "marks": 4,
            "answer": "Remaining = 1 - 3/4 = 1/4. Therefore, 1/4 of the tank is needed to fill it completely."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the main topics in CBSE Class 8 Mathematics?",
        "a": "Rational numbers, algebra, geometry, mensuration, data handling, and exponents are key topics."
      },
      {
        "q": "How should I approach word problems in Class 8 Maths?",
        "a": "Read carefully, identify what is given and what to find, set up equations, solve step-by-step, and verify your answer."
      },
      {
        "q": "Is it necessary to memorize all formulas?",
        "a": "Yes, formulas are important. Write them down regularly and practice their application to remember them better."
      }
    ]
  },
  {
    "slug": "class-12-english",
    "classLevel": "Class 12",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 12 English Sample Paper 2026 (with Solutions)",
    "intro": "This advanced sample paper covers critical reading, analytical writing, and literary appreciation for Class 12 CBSE. Develop sophisticated language and interpretation skills.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "marks": 20,
        "instructions": "Read the passage and answer all questions.",
        "questions": [
          {
            "q": "This passage discusses: (a) Only benefits of AI (b) AI and its broader implications (c) Only job losses (d) Technology history",
            "marks": 4,
            "answer": "(b) AI and its broader implications"
          },
          {
            "q": "What dual nature of AI is presented in the passage?",
            "marks": 4,
            "answer": "The passage presents both positive aspects (reshaping industries, enabling insights) and negative concerns (job displacement, ethical issues)."
          },
          {
            "q": "Explain the phrase unprecedented insights in context.",
            "marks": 4,
            "answer": "Unprecedented insights means never-before-seen understandings or discoveries made possible by AI analyzing large amounts of data at speeds impossible for humans."
          },
          {
            "q": "Discuss the relevance of ethical implications in AI development.",
            "marks": 4,
            "answer": "Ethical implications are important because AI decisions affect human lives. Bias in algorithms, privacy concerns, and accountability require careful consideration."
          },
          {
            "q": "How does the author present a balanced view of AI?",
            "marks": 4,
            "answer": "By acknowledging both transformative benefits and legitimate concerns, avoiding a one-sided perspective."
          }
        ],
        "passage": "Artificial intelligence is reshaping industries from healthcare to finance. In hospitals, diagnostic models now flag patterns in scans that a tired human eye may miss on a long shift; in banking, fraud is intercepted in the seconds between a card being swiped and a transaction clearing. Machine learning algorithms analyse vast datasets, enabling unprecedented insights — conclusions no researcher could have reached by hand, drawn from volumes of data no team could read in a lifetime.\n\nYet concerns about job displacement and ethical implications persist, and they deserve to be taken seriously rather than dismissed as pessimism. Roles built on routine analysis are already thinning, and the workers affected are rarely the ones best placed to retrain. The ethical questions cut deeper still. An algorithm trained on biased historical data will reproduce that bias and lend it the false authority of mathematics. Systems that predict behaviour require personal information, placing privacy under steady pressure. And when an automated decision causes harm — a loan refused, a diagnosis missed — accountability becomes genuinely difficult to assign.\n\nNeither enthusiasm nor alarm is an adequate response on its own. The honest position holds both at once: that these tools are transforming what is possible, and that the transformation carries real costs which thoughtful regulation and design must address. Technology of this reach is neither a saviour nor a threat. It is an instrument, and what it becomes depends on the care with which it is built."
      },
      {
        "name": "Section B: Writing Skills",
        "marks": 30,
        "instructions": "Complete all writing tasks with sophistication and clarity.",
        "questions": [
          {
            "q": "Write a formal proposal to your school regarding implementation of digital learning resources. (10 marks)",
            "marks": 10,
            "answer": "Sample: Proposal: Digital Learning Initiative. Objective: Integrate technology in classroom. Rationale: Enhances engagement, enables personalized learning, prepares students for digital world. Implementation: Provide devices, train teachers, develop digital curriculum. Benefits: Improved outcomes, student motivation. Budget: [specify]. Timeline: [specify]. This proposal would modernize our educational approach."
          },
          {
            "q": "Write a critical review of a film or novel you have studied. (10 marks)",
            "marks": 10,
            "answer": "Sample: Title: A Thoughtful Examination. The work presents complex themes through layered narrative. Strengths: character development, thematic depth, literary style. Weaknesses: pacing issues, predictable ending. Overall impact: significant, though with limitations. The author/director effectively explores [theme] while engaging the audience. Rating: 4/5 stars."
          },
          {
            "q": "Write a formal speech on a contemporary issue for a public forum. (10 marks)",
            "marks": 10,
            "answer": "Sample speech on climate action: Honorable guests, today we address climate change. Rising temperatures threaten our future. We must transition to renewable energy, reduce emissions, and protect ecosystems. Individual responsibility combined with policy changes can reverse damage. Our generation must act now for future generations. Together, we can create sustainable change."
          }
        ]
      },
      {
        "name": "Section C: Literature and Appreciation",
        "marks": 30,
        "instructions": "Answer with critical depth and textual support. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Analyse the narrative structure of a drama or novel you have studied. How does it contribute to meaning?",
            "marks": 10,
            "answer": "Students should analyze: chronological/non-linear structure, flashbacks, parallel narratives, their purpose, how structure reveals themes, how it affects reader/audience understanding, textual examples."
          },
          {
            "q": "Discuss the protagonist's moral journey or ethical dilemma in a text you have studied. (10 marks)",
            "marks": 10,
            "answer": "Students should: identify dilemma, trace protagonist's struggle, analyze choices made, consequences, growth or lack thereof, author's commentary on morality, relevance to contemporary readers."
          },
          {
            "q": "Compare thematic concerns across two texts you have studied. How does each author address similar/different issues? (10 marks)",
            "marks": 10,
            "answer": "Students compare: identify theme in both texts, analyze how each author explores it, different perspectives/conclusions, textual evidence, significance of differences, what this reveals about the authors."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What strategies should I use for Class 12 reading comprehension?",
        "a": "Understand main idea, analyze tone/intention, support answers with textual evidence, read questions multiple times, manage time efficiently."
      },
      {
        "q": "How do I write a strong analytical essay for literature?",
        "a": "Develop clear thesis, use topic sentences, provide textual evidence, analyze quotes, discuss implications, maintain critical tone throughout."
      },
      {
        "q": "What is expected in Class 12 creative writing pieces?",
        "a": "Sophisticated vocabulary, complex sentence structures, originality in ideas, proper form (letter/speech/story), and depth of thought beyond basic narratives."
      }
    ]
  },
  {
    "slug": "class-10-maths-set-3",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 10 Mathematics Sample Paper Set 3",
    "intro": "This sample paper follows the latest CBSE Class 10 Mathematics curriculum with a balanced mix of algebra, geometry, trigonometry, and statistics. Practice real exam-pattern questions covering all chapters with detailed solutions. This is a shortened practice set: 41 questions worth 75 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 75,
    "sections": [
      {
        "name": "Section A - Very Short Answer",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "Find the HCF of 24 and 36.",
            "marks": 1,
            "answer": "12"
          },
          {
            "q": "If the pair of linear equations has unique solution, then the lines are called?",
            "marks": 1,
            "answer": "Intersecting lines"
          },
          {
            "q": "What is the discriminant of quadratic equation x^2 + 2x + 1 = 0?",
            "marks": 1,
            "answer": "0"
          },
          {
            "q": "Find the sum of first 10 natural numbers.",
            "marks": 1,
            "answer": "55"
          },
          {
            "q": "In a circle, if angle at center is 60 degrees, what is the angle at circumference subtended by same arc?",
            "marks": 1,
            "answer": "30 degrees"
          },
          {
            "q": "Find the value of sin 45 degrees.",
            "marks": 1,
            "answer": "1/sqrt(2) or sqrt(2)/2"
          },
          {
            "q": "What is the formula for volume of sphere?",
            "marks": 1,
            "answer": "4/3 * pi * r^3"
          },
          {
            "q": "If P(A) = 0.5 and P(B) = 0.3, find P(not A)?",
            "marks": 1,
            "answer": "0.5"
          },
          {
            "q": "Find the mode of data: 2, 3, 3, 4, 5, 5, 5, 6.",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "Write the distance formula between two points (x1, y1) and (x2, y2).",
            "marks": 1,
            "answer": "sqrt((x2-x1)^2 + (y2-y1)^2)"
          },
          {
            "q": "A quadratic polynomial having zeros 2 and 3 is?",
            "marks": 1,
            "answer": "x^2 - 5x + 6"
          },
          {
            "q": "Find the common difference of AP: 5, 10, 15, 20.",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "If tan A = 3/4, find sin A.",
            "marks": 1,
            "answer": "3/5"
          },
          {
            "q": "What is the surface area of cube with side a?",
            "marks": 1,
            "answer": "6a^2"
          },
          {
            "q": "Find the mean of 10, 20, 30, 40, 50.",
            "marks": 1,
            "answer": "30"
          },
          {
            "q": "Two lines are parallel if their slopes are?",
            "marks": 1,
            "answer": "Equal"
          },
          {
            "q": "Find the LCM of 12 and 18.",
            "marks": 1,
            "answer": "36"
          },
          {
            "q": "A tangent to a circle is perpendicular to the radius at the point of?",
            "marks": 1,
            "answer": "Contact"
          },
          {
            "q": "If a = 2, b = 3, then (a + b)^2 equals?",
            "marks": 1,
            "answer": "25"
          },
          {
            "q": "The probability of an impossible event is?",
            "marks": 1,
            "answer": "0"
          }
        ]
      },
      {
        "name": "Section B - Short Answer",
        "marks": 24,
        "instructions": "Attempt all questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "Solve 2x + 3y = 5 and 3x - 2y = 4 using substitution method.",
            "marks": 2,
            "answer": "x = 2, y = 1/3"
          },
          {
            "q": "Find the roots of quadratic equation 2x^2 - 7x + 3 = 0 using factorization.",
            "marks": 2,
            "answer": "x = 3/2 or x = 1"
          },
          {
            "q": "If an AP has first term 5 and common difference 2, find the 10th term.",
            "marks": 2,
            "answer": "23"
          },
          {
            "q": "Prove that sqrt(2) is irrational.",
            "marks": 2,
            "answer": "Assume sqrt(2) = p/q, then 2q^2 = p^2, showing 2 divides both p and q, contradicting coprimality"
          },
          {
            "q": "In triangle ABC, angle A = 60 degrees, angle B = 80 degrees, find angle C.",
            "marks": 2,
            "answer": "40 degrees"
          },
          {
            "q": "If two chords are equal, prove they are equidistant from the center.",
            "marks": 2,
            "answer": "Using perpendicular from center bisects equal chords equally"
          },
          {
            "q": "Find the area of a sector with radius 7 cm and central angle 60 degrees.",
            "marks": 2,
            "answer": "49pi/6 cm^2 or approximately 25.67 cm^2"
          },
          {
            "q": "Two dice are thrown together. Find probability of getting sum 7.",
            "marks": 2,
            "answer": "6/36 = 1/6"
          },
          {
            "q": "Find the median of 12, 15, 18, 22, 25.",
            "marks": 2,
            "answer": "18"
          },
          {
            "q": "If cos A = 5/13, find all trigonometric ratios of A.",
            "marks": 2,
            "answer": "sin A = 12/13, tan A = 12/5, cot A = 5/12, sec A = 13/5, cosec A = 13/12"
          },
          {
            "q": "Find the distance between parallel lines 3x + 4y + 5 = 0 and 3x + 4y - 10 = 0.",
            "marks": 2,
            "answer": "3 units"
          },
          {
            "q": "A circle passes through (0,0), (4,0), (0,3). Find its center and radius.",
            "marks": 2,
            "answer": "Center: (2, 1.5), Radius: 2.5"
          }
        ]
      },
      {
        "name": "Section C - Long Answer",
        "marks": 31,
        "instructions": "Attempt all questions. Each question carries 3 or 4 marks.",
        "questions": [
          {
            "q": "Two pillars of equal height are 100 m apart. From a point between them on the ground, the angles of elevation to the tops are 30 and 60 degrees. Find height of pillars.",
            "marks": 4,
            "answer": "Height = 25*sqrt(3) meters or approximately 43.3 meters"
          },
          {
            "q": "A bag contains 5 red and 3 blue balls. Two balls are drawn without replacement. Find probability of getting one red and one blue ball.",
            "marks": 3,
            "answer": "15/56"
          },
          {
            "q": "If the sum of n terms of an AP is 3n^2 + 5n, find the 12th term and common difference.",
            "marks": 3,
            "answer": "12th term = 77, common difference = 6"
          },
          {
            "q": "Construct a triangle ABC with sides 5 cm, 6 cm, 7 cm and then construct a triangle similar to it with scale factor 2/3.",
            "marks": 4,
            "answer": "Construction steps: Draw triangle ABC, then construct similar triangle AB'C' with sides in ratio 2/3"
          },
          {
            "q": "A cone has base radius 7 cm and height 24 cm. Find total surface area and volume.",
            "marks": 4,
            "answer": "Volume = 1232 cm^3, Total surface area = 704 cm^2"
          },
          {
            "q": "Solve the pair of equations graphically: x + y = 6 and x - y = 2.",
            "marks": 3,
            "answer": "x = 4, y = 2 (intersection point)"
          },
          {
            "q": "Find the sum of first 20 terms of AP with first term 3 and last term 61.",
            "marks": 3,
            "answer": "640"
          },
          {
            "q": "Prove that the tangent at any point of a circle is perpendicular to the radius through that point.",
            "marks": 3,
            "answer": "By contradiction using definition of tangent and properties of circles"
          },
          {
            "q": "Two towers stand 100 m apart. From a point on the ground between them, angles of elevation are 45 and 30 degrees. Find heights if both are equal.",
            "marks": 4,
            "answer": "Height = 50*(sqrt(3)-1) meters"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for CBSE Class 10 Mathematics?",
        "a": "The exam is of 80 marks with 3 hours duration. It includes MCQ (20 marks), short answer (24 marks), and long answer (36 marks) questions covering all chapters."
      },
      {
        "q": "How many chapters are in Class 10 Mathematics syllabus?",
        "a": "There are 15 chapters including Number Systems, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Circles, Areas Related to Circles, Surface Areas and Volumes, Statistics, and Probability."
      },
      {
        "q": "What is the best way to prepare for Class 10 Mathematics?",
        "a": "Practice previous year papers and sample papers regularly, understand concepts thoroughly, solve all textbook exercises, and focus on problem-solving techniques and formula applications."
      }
    ]
  },
  {
    "slug": "class-10-science-set-3",
    "classLevel": "Class 10",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Science Sample Paper Set 3",
    "intro": "This comprehensive sample paper covers Physics, Chemistry, and Biology chapters with a balanced mix of theoretical and practical questions. Master all concepts with original CBSE-pattern problems and detailed answers. This is a shortened practice set: 38 questions worth 74 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 74,
    "sections": [
      {
        "name": "Section A - Multiple Choice and Very Short Answer",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "What is the SI unit of force?",
            "marks": 1,
            "answer": "Newton (N)"
          },
          {
            "q": "The process by which green plants make their own food is called?",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "What is the atomic number of Oxygen?",
            "marks": 1,
            "answer": "8"
          },
          {
            "q": "The speed of light in vacuum is approximately?",
            "marks": 1,
            "answer": "3 x 10^8 m/s or 300000 km/s"
          },
          {
            "q": "What is the pH of pure water at 25 degrees Celsius?",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "Which hormone is responsible for fight or flight response?",
            "marks": 1,
            "answer": "Adrenaline or Epinephrine"
          },
          {
            "q": "What is the principal focus of a concave mirror?",
            "marks": 1,
            "answer": "The point where light rays converge after reflection"
          },
          {
            "q": "The process of conversion of chemical energy into electrical energy is?",
            "marks": 1,
            "answer": "Electrochemistry or cell reaction"
          },
          {
            "q": "What is the function of stomata in plants?",
            "marks": 1,
            "answer": "Gas exchange and transpiration"
          },
          {
            "q": "Which metal is liquid at room temperature?",
            "marks": 1,
            "answer": "Mercury"
          },
          {
            "q": "The SI unit of electric current is?",
            "marks": 1,
            "answer": "Ampere (A)"
          },
          {
            "q": "What is the process of reproduction in Hydra called?",
            "marks": 1,
            "answer": "Budding"
          },
          {
            "q": "The number of valence electrons in Chlorine is?",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "What is the focal length of a plane mirror?",
            "marks": 1,
            "answer": "Infinity"
          },
          {
            "q": "The transfer of heat by movement of fluids is called?",
            "marks": 1,
            "answer": "Convection"
          },
          {
            "q": "Which vitamin is produced in our body when exposed to sunlight?",
            "marks": 1,
            "answer": "Vitamin D"
          },
          {
            "q": "The SI unit of power is?",
            "marks": 1,
            "answer": "Watt (W)"
          },
          {
            "q": "What is the chromosomal number in human cells?",
            "marks": 1,
            "answer": "46 or 23 pairs"
          },
          {
            "q": "The process of removing ions from a solution is called?",
            "marks": 1,
            "answer": "Deionization or ion exchange"
          },
          {
            "q": "What is the refractive index of glass approximately?",
            "marks": 1,
            "answer": "1.5"
          }
        ]
      },
      {
        "name": "Section B - Short Answer",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Draw a ray diagram for image formation in a convex lens when object is at 2F.",
            "marks": 2,
            "answer": "Real, inverted, equal-sized image formed at 2F on opposite side"
          },
          {
            "q": "What is the difference between exothermic and endothermic reactions? Give one example each.",
            "marks": 3,
            "answer": "Exothermic releases heat (combustion), Endothermic absorbs heat (melting ice)"
          },
          {
            "q": "Explain the process of photosynthesis with a balanced equation.",
            "marks": 3,
            "answer": "6CO2 + 6H2O + light energy -> C6H12O6 + 6O2"
          },
          {
            "q": "State Ohms Law and write its mathematical formula.",
            "marks": 2,
            "answer": "V = IR where V is voltage, I is current, R is resistance"
          },
          {
            "q": "How do plants and animals differ in reproduction methods?",
            "marks": 2,
            "answer": "Plants reproduce by seeds and vegetative means, animals mostly by sexual reproduction"
          },
          {
            "q": "What is electromagnetic induction? Explain with example.",
            "marks": 3,
            "answer": "Change in magnetic flux induces electric current, example: electric generator"
          },
          {
            "q": "Write the properties of acids and bases.",
            "marks": 2,
            "answer": "Acids are sour, corrosive, turn litmus red; Bases are bitter, soapy, turn litmus blue"
          },
          {
            "q": "Explain the structure of mitochondria and its function.",
            "marks": 2,
            "answer": "Double membrane organelle with inner cristae, site of ATP production and energy release"
          },
          {
            "q": "Calculate the resistance of a wire with resistivity 1.7 x 10^-8, length 2m, area 1mm^2.",
            "marks": 2,
            "answer": "R = (1.7 x 10^-8 x 2) / (10^-6) = 0.034 ohm"
          },
          {
            "q": "What are the three states of matter? How do they differ?",
            "marks": 3,
            "answer": "Solid (fixed shape), Liquid (fixed volume), Gas (no fixed shape or volume)"
          },
          {
            "q": "Explain the mechanism of refraction of light.",
            "marks": 2,
            "answer": "Light bends when entering denser medium due to change in speed"
          },
          {
            "q": "What is a food web and how does it differ from food chain?",
            "marks": 2,
            "answer": "Food web is interconnected food chains showing multiple feeding relationships"
          }
        ]
      },
      {
        "name": "Section C - Long Answer",
        "marks": 26,
        "instructions": "Attempt all questions. Each question carries 3 or 5 marks.",
        "questions": [
          {
            "q": "Explain the process of refraction of light with Snells law. Draw a ray diagram.",
            "marks": 5,
            "answer": "sin(i)/sin(r) = n2/n1, where i is incident angle, r is refraction angle, n is refractive index"
          },
          {
            "q": "Describe the structure and function of the human digestive system.",
            "marks": 5,
            "answer": "Mouth (ingestion), Esophagus, Stomach (churning), Small intestine (absorption), Large intestine (water absorption)"
          },
          {
            "q": "Explain the process of binary fission in bacteria with diagram.",
            "marks": 3,
            "answer": "DNA replication followed by division into two identical daughter cells"
          },
          {
            "q": "How is electricity generated in thermal power plants? Explain the complete process.",
            "marks": 5,
            "answer": "Burning of fuel heats water, steam turns turbine, turbine rotates generator, producing electricity"
          },
          {
            "q": "Describe the nitrogen cycle and its importance in ecosystem.",
            "marks": 5,
            "answer": "Nitrogen fixation by bacteria, conversion to nitrates, uptake by plants, return to atmosphere through decomposition"
          },
          {
            "q": "Explain the principle and working of an electric motor.",
            "marks": 3,
            "answer": "Current-carrying coil rotates in magnetic field due to force on opposite sides, producing motion"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks and duration of Class 10 Science exam?",
        "a": "The exam is for 80 marks with 3 hours duration, covering Physics, Chemistry, and Biology sections."
      },
      {
        "q": "How many chapters are in Class 10 Science syllabus?",
        "a": "There are 16 chapters in total: 5 in Chemistry, 5 in Physics, and 6 in Biology."
      },
      {
        "q": "What topics should I focus on most for scoring well?",
        "a": "Focus on concepts like photosynthesis, respiration, heredity, chemical reactions, electricity, light and optics, which frequently appear in exams."
      }
    ]
  },
  {
    "slug": "class-9-science-set-2",
    "classLevel": "Class 9",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Science Sample Paper Set 2",
    "intro": "This sample paper covers all key topics in Class 9 Science including motion, forces, matter, atoms, and life processes. Practice comprehensive questions designed to build conceptual understanding and exam readiness. This is a shortened practice set: 38 questions worth 73 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 73,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "What is the SI unit of velocity?",
            "marks": 1,
            "answer": "m/s"
          },
          {
            "q": "Newtons first law of motion is also called?",
            "marks": 1,
            "answer": "Law of Inertia"
          },
          {
            "q": "What is the SI unit of mass?",
            "marks": 1,
            "answer": "Kilogram (kg)"
          },
          {
            "q": "The smallest particle of an element is?",
            "marks": 1,
            "answer": "Atom"
          },
          {
            "q": "What is the main constituent of air?",
            "marks": 1,
            "answer": "Nitrogen (78%)"
          },
          {
            "q": "The process by which plants absorb water is called?",
            "marks": 1,
            "answer": "Osmosis"
          },
          {
            "q": "What is the SI unit of acceleration?",
            "marks": 1,
            "answer": "m/s^2"
          },
          {
            "q": "Which scientist proposed the atomic theory?",
            "marks": 1,
            "answer": "John Dalton"
          },
          {
            "q": "The basic unit of life is?",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "What is the valency of Carbon?",
            "marks": 1,
            "answer": "4"
          },
          {
            "q": "The element with atomic number 8 is?",
            "marks": 1,
            "answer": "Oxygen"
          },
          {
            "q": "What are the three states of matter?",
            "marks": 1,
            "answer": "Solid, Liquid, Gas"
          },
          {
            "q": "The SI unit of force is?",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Which organelle is called the powerhouse of the cell?",
            "marks": 1,
            "answer": "Mitochondria"
          },
          {
            "q": "What is the density of water at 4 degrees Celsius?",
            "marks": 1,
            "answer": "1 g/cm^3 or 1000 kg/m^3"
          },
          {
            "q": "The process of breaking down of food into simpler substances is?",
            "marks": 1,
            "answer": "Digestion"
          },
          {
            "q": "What is the molecular weight of CO2?",
            "marks": 1,
            "answer": "44 amu"
          },
          {
            "q": "The tissue responsible for transport of water in plants is?",
            "marks": 1,
            "answer": "Xylem"
          },
          {
            "q": "Distance covered per unit time is?",
            "marks": 1,
            "answer": "Speed"
          },
          {
            "q": "The phenomenon of change in velocity is?",
            "marks": 1,
            "answer": "Acceleration"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "State and explain Newtons second law of motion with mathematical form.",
            "marks": 2,
            "answer": "F = ma where Force equals mass times acceleration"
          },
          {
            "q": "What is the difference between average speed and average velocity?",
            "marks": 2,
            "answer": "Speed is distance/time, Velocity is displacement/time (vector quantity)"
          },
          {
            "q": "Define relative atomic mass and write its importance.",
            "marks": 3,
            "answer": "Mass of atom compared to 1/12th of Carbon-12, used for comparing atomic masses"
          },
          {
            "q": "What is the structure of an atom? Draw a diagram.",
            "marks": 3,
            "answer": "Nucleus with protons and neutrons at center, electrons orbiting in shells"
          },
          {
            "q": "Explain the process of osmosis with example.",
            "marks": 2,
            "answer": "Movement of solvent through semipermeable membrane from low to high solute concentration, example: plant root absorbing water"
          },
          {
            "q": "What are the types of tissues in plants? Name them.",
            "marks": 2,
            "answer": "Meristematic and Permanent tissues"
          },
          {
            "q": "Calculate the acceleration of a car if it travels 50m in 5s starting from rest.",
            "marks": 2,
            "answer": "a = 4 m/s^2"
          },
          {
            "q": "What are isotopes? Give one example.",
            "marks": 2,
            "answer": "Atoms of same element with different mass numbers, example: Carbon-12 and Carbon-14"
          },
          {
            "q": "Describe the structure of a plant cell with functions of all organelles.",
            "marks": 3,
            "answer": "Cell wall (protection), Chloroplasts (photosynthesis), Vacuole (storage), Nucleus (control)"
          },
          {
            "q": "What is a balanced chemical equation? Give one example.",
            "marks": 2,
            "answer": "Equal number of atoms on both sides, example: 2H2 + O2 -> 2H2O"
          },
          {
            "q": "Explain the difference between pure substances and mixtures.",
            "marks": 2,
            "answer": "Pure substances have fixed composition, mixtures have variable composition"
          },
          {
            "q": "What is the function of the circulatory system in humans?",
            "marks": 2,
            "answer": "Transport of oxygen, nutrients, and hormones throughout the body"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 26,
        "instructions": "Attempt all questions. Each question carries 3 or 5 marks.",
        "questions": [
          {
            "q": "Draw a diagram of human circulatory system and explain the path of blood circulation.",
            "marks": 5,
            "answer": "Right atrium -> Right ventricle -> Lungs -> Left atrium -> Left ventricle -> Body -> Back to Right atrium"
          },
          {
            "q": "Explain the structure of a plant cell and compare it with animal cell.",
            "marks": 5,
            "answer": "Plant cell has cell wall, chloroplasts, large vacuole; Animal cell lacks these and has centrosomes"
          },
          {
            "q": "Describe the process of photosynthesis with equation.",
            "marks": 5,
            "answer": "6CO2 + 6H2O + Light -> C6H12O6 + 6O2, occurs in chloroplasts"
          },
          {
            "q": "Explain the laws of motion with real-life examples.",
            "marks": 5,
            "answer": "First law: inertia (seatbelts in cars), Second law: F=ma (accelerating car), Third law: action-reaction (rocket propulsion)"
          },
          {
            "q": "What is the atomic structure of Sodium? Write the electron configuration.",
            "marks": 3,
            "answer": "11 electrons, configuration: 2,8,1"
          },
          {
            "q": "Explain the water cycle and its importance for life on Earth.",
            "marks": 3,
            "answer": "Evaporation, Condensation, Precipitation, Collection - distributes water and regulates climate"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 9 Science?",
        "a": "The exam is 80 marks with 3 hours duration, covering sections on physics, chemistry, biology with objective, short answer, and long answer questions."
      },
      {
        "q": "How many chapters are there in Class 9 Science?",
        "a": "There are 15 chapters covering topics like motion, forces, matter, atoms, cell structure, tissues, and life processes."
      },
      {
        "q": "What are the important topics to focus on?",
        "a": "Focus on motion and forces, structure of atom, cell biology, photosynthesis and respiration, and human body systems."
      }
    ]
  },
  {
    "slug": "class-9-social-science-set-2",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Social Science Sample Paper Set 2",
    "intro": "Comprehensive sample paper covering History, Geography, Economics, and Civics for Class 9 students. Practice questions on Indian independence, natural resources, democracy, and global citizenship with complete solutions. This is a shortened practice set: 38 questions worth 73 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 73,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "In which year did the French Revolution start?",
            "marks": 1,
            "answer": "1789"
          },
          {
            "q": "Who was the first President of independent India?",
            "marks": 1,
            "answer": "Dr. Rajendra Prasad"
          },
          {
            "q": "Which is the largest continent by area?",
            "marks": 1,
            "answer": "Asia"
          },
          {
            "q": "The Constitution of India was adopted on?",
            "marks": 1,
            "answer": "January 26, 1950"
          },
          {
            "q": "What is the total number of states in India?",
            "marks": 1,
            "answer": "28"
          },
          {
            "q": "Who was the primary architect of the Indian Constitution?",
            "marks": 1,
            "answer": "Dr. B.R. Ambedkar"
          },
          {
            "q": "The tropic of cancer passes through which latitude?",
            "marks": 1,
            "answer": "23.5 degrees North"
          },
          {
            "q": "Which ancient Indian empire built the Taj Mahal?",
            "marks": 1,
            "answer": "Mughal Empire"
          },
          {
            "q": "The fundamental rights are guaranteed in which part of the Constitution?",
            "marks": 1,
            "answer": "Part III"
          },
          {
            "q": "Which continent is the coldest?",
            "marks": 1,
            "answer": "Antarctica"
          },
          {
            "q": "What is the capital of India?",
            "marks": 1,
            "answer": "New Delhi"
          },
          {
            "q": "The Indian National Congress was founded in?",
            "marks": 1,
            "answer": "1885"
          },
          {
            "q": "Which river is the longest in India?",
            "marks": 1,
            "answer": "Ganges River"
          },
          {
            "q": "The Directive Principles are mentioned in which part of Constitution?",
            "marks": 1,
            "answer": "Part IV"
          },
          {
            "q": "What is the time difference between IST and UTC?",
            "marks": 1,
            "answer": "Plus 5.5 hours"
          },
          {
            "q": "Who organized the Swadeshi Movement?",
            "marks": 1,
            "answer": "Sri Aurobindo and Keshab Chandra Sen"
          },
          {
            "q": "The Western Ghats is a mountain range in which part of India?",
            "marks": 1,
            "answer": "Western coast"
          },
          {
            "q": "In which year did India become a sovereign democratic republic?",
            "marks": 1,
            "answer": "1950"
          },
          {
            "q": "Which resource is renewable?",
            "marks": 1,
            "answer": "Solar energy, Water, Wind"
          },
          {
            "q": "What is the primary function of the Lok Sabha?",
            "marks": 1,
            "answer": "To pass laws and represent the people"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Explain the three pillars of democracy in India.",
            "marks": 2,
            "answer": "Legislative (Parliament), Executive (President and PM), Judicial (Supreme Court)"
          },
          {
            "q": "What are the main causes of the French Revolution?",
            "marks": 3,
            "answer": "Economic crisis, Social inequality, Enlightenment ideas, Bad harvests"
          },
          {
            "q": "Describe the monsoon winds and their effect on Indian climate.",
            "marks": 3,
            "answer": "Seasonal winds bringing rain, Critical for agriculture, Affects weather patterns"
          },
          {
            "q": "What are fundamental rights? Name any four.",
            "marks": 2,
            "answer": "Constitutional guarantees: Right to Equality, Right to Freedom, Right to Life, Right to Education"
          },
          {
            "q": "Explain the role of Mahatma Gandhi in Indian independence struggle.",
            "marks": 2,
            "answer": "Led non-violent resistance, Championed Swadeshi, United the nation against British rule"
          },
          {
            "q": "What is sustainable development? Write its importance.",
            "marks": 2,
            "answer": "Development meeting present needs without harming future generations"
          },
          {
            "q": "Describe the characteristics of the tundra biome.",
            "marks": 2,
            "answer": "Extremely cold, Low precipitation, Permafrost, Sparse vegetation"
          },
          {
            "q": "What is the difference between weather and climate?",
            "marks": 2,
            "answer": "Weather is daily conditions, Climate is long-term atmospheric patterns"
          },
          {
            "q": "Explain the cause and effect of soil erosion.",
            "marks": 3,
            "answer": "Causes: Deforestation, Overgrazing; Effects: Loss of fertile land, Floods, Desertification"
          },
          {
            "q": "What are the duties of a citizen as mentioned in the Constitution?",
            "marks": 2,
            "answer": "Follow constitution, Respect national symbols, Protect public property, Defend nation"
          },
          {
            "q": "Describe the impact of Napoleon on European history.",
            "marks": 2,
            "answer": "Reformed legal system, Spread nationalism, Changed warfare tactics"
          },
          {
            "q": "What is the greenhouse effect and its consequences?",
            "marks": 2,
            "answer": "Trapping of heat by gases, Leading to global warming and climate change"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 26,
        "instructions": "Attempt all questions. Each question carries 3 or 5 marks.",
        "questions": [
          {
            "q": "Explain the journey of India from ancient times through medieval period to independence.",
            "marks": 5,
            "answer": "Ancient: Vedic, Mauryan, Gupta empires; Medieval: Delhi Sultanate, Mughal rule; Modern: British colonization and independence struggle"
          },
          {
            "q": "Describe the geographical features of India and how they influence its climate and culture.",
            "marks": 5,
            "answer": "Himalayas (climate), Deserts, Plains, Coast affect agriculture, settlement, and cultural diversity"
          },
          {
            "q": "Explain the structure and functions of different organs of the Indian government.",
            "marks": 5,
            "answer": "Parliament (legislature), President/PM (executive), Courts (judiciary), each with specific powers and responsibilities"
          },
          {
            "q": "What were the social and political consequences of the Industrial Revolution?",
            "marks": 5,
            "answer": "Rise of working class, Urbanization, Labor movements, Socialism, Changed production methods"
          },
          {
            "q": "Discuss the concept of secularism as mentioned in the Indian Constitution.",
            "marks": 3,
            "answer": "State treats all religions equally, No state religion, Freedom to practice and propagate religion"
          },
          {
            "q": "Explain the water cycle and its importance for human survival.",
            "marks": 3,
            "answer": "Evaporation -> Condensation -> Precipitation -> Collection, Provides fresh water, regulates temperature"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 9 Social Science?",
        "a": "History (French Revolution, Indian history), Geography (climate, natural resources, biomes), Civics (constitution, democracy), Economics (basic concepts)."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 3 hours duration, covering History, Geography, Civics, and Economics with objective and descriptive questions."
      },
      {
        "q": "Which historical periods are most important?",
        "a": "French Revolution, Indian medieval period, British colonial period, and independence struggle are key topics."
      }
    ]
  },
  {
    "slug": "class-12-physics-set-2",
    "classLevel": "Class 12",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 12 Physics Sample Paper Set 2",
    "intro": "Advanced physics sample paper covering electromagnetism, optics, modern physics, and nuclear physics. Solve comprehensive numerical and theoretical problems with detailed explanations. This is a shortened practice set: 27 questions worth 68 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Multiple Choice Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The SI unit of magnetic flux density is?",
            "marks": 1,
            "answer": "Tesla (T)"
          },
          {
            "q": "Which material is used as dielectric in capacitors?",
            "marks": 1,
            "answer": "Glass, Mica, Paper, Ceramic"
          },
          {
            "q": "The photoelectric effect was explained by?",
            "marks": 1,
            "answer": "Albert Einstein"
          },
          {
            "q": "What is the wavelength range of visible light?",
            "marks": 1,
            "answer": "400-700 nm"
          },
          {
            "q": "The nucleus was discovered by?",
            "marks": 1,
            "answer": "Ernest Rutherford"
          },
          {
            "q": "Which of the following is a vector quantity?",
            "marks": 1,
            "answer": "Force"
          },
          {
            "q": "The SI unit of capacitance is?",
            "marks": 1,
            "answer": "Farad (F)"
          },
          {
            "q": "What is the rest mass of electron?",
            "marks": 1,
            "answer": "9.1 x 10^-31 kg"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Define magnetic field and write its SI unit.",
            "marks": 2,
            "answer": "Region around magnet where magnetic force acts, SI unit is Tesla (T)"
          },
          {
            "q": "State Faradays law of electromagnetic induction.",
            "marks": 2,
            "answer": "EMF = -N(d-flux/dt), Induced EMF equals negative rate of change of magnetic flux"
          },
          {
            "q": "Explain the working principle of a transformer.",
            "marks": 3,
            "answer": "Two coils on common core, Changing current in primary creates changing magnetic field, Induces EMF in secondary"
          },
          {
            "q": "Write the equation for electromagnetic wave and identify its components.",
            "marks": 2,
            "answer": "E = E0 sin(kx - omega*t), Components: Electric field and Magnetic field perpendicular to each other"
          },
          {
            "q": "What is the photoelectric effect? Explain why frequency has threshold value.",
            "marks": 3,
            "answer": "Electrons ejected from metal by light, Threshold frequency required to provide work function energy"
          },
          {
            "q": "Define critical angle and total internal reflection.",
            "marks": 2,
            "answer": "Critical angle: incident angle for which refracted angle = 90 degrees, Total internal reflection occurs beyond this angle"
          },
          {
            "q": "Explain single slit diffraction pattern.",
            "marks": 2,
            "answer": "Single slit acts as source of secondary wavelets, Creating central maximum and side bands with decreasing intensity"
          },
          {
            "q": "What is the de Broglie wavelength? Write its expression.",
            "marks": 2,
            "answer": "wavelength = h/p where h is Planck's constant, p is momentum"
          },
          {
            "q": "Define binding energy and write its expression using Einstein's mass-energy relation.",
            "marks": 3,
            "answer": "BE = (mass defect) * c^2, Energy required to separate nucleus into constituent nucleons"
          },
          {
            "q": "Explain the process of nuclear fission with example.",
            "marks": 2,
            "answer": "Heavy nucleus splits into lighter fragments releasing energy, Example: U-235 splitting"
          },
          {
            "q": "What is half-life of a radioactive substance?",
            "marks": 2,
            "answer": "Time required for half of original atoms to decay"
          },
          {
            "q": "Draw ray diagram for image formation by convex lens with object at focal point.",
            "marks": 2,
            "answer": "Image at infinity, Real, Inverted"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Derive Ohms law from Drifts of electrons. Explain conductivity and resistivity.",
            "marks": 5,
            "answer": "Drift velocity of electrons under electric field, V = IR where I = neAv, Resistivity measures material property"
          },
          {
            "q": "Explain construction and working of moving coil galvanometer. How can it be converted to ammeter?",
            "marks": 5,
            "answer": "Coil rotates in magnetic field, Deflection proportional to current, Add shunt resistance in parallel for ammeter"
          },
          {
            "q": "Derive lens maker's formula and explain refraction at two surfaces.",
            "marks": 5,
            "answer": "1/f = (n-1)(1/R1 - 1/R2), Light refracts at both curved surfaces, Combined effect determines focal length"
          },
          {
            "q": "Explain double slit interference pattern. Derive expression for fringe width.",
            "marks": 5,
            "answer": "Two coherent sources create interference, Fringe width beta = lambda*D/d, Bright fringes at path difference n*lambda"
          },
          {
            "q": "State and derive Bohr's postulates for hydrogen atom. Calculate radius of first orbit.",
            "marks": 5,
            "answer": "Quantization of angular momentum, Energy levels, Ground state radius = 0.53 Angstrom"
          },
          {
            "q": "Explain radioactive decay process with decay equation. Discuss alpha and beta decay.",
            "marks": 4,
            "answer": "N = N0 * e^(-lambda*t), Alpha: Helium nucleus emitted, Beta: Electron or positron emitted"
          },
          {
            "q": "Derive Einstein's mass-energy relation E = mc^2 and explain its significance.",
            "marks": 4,
            "answer": "Energy-mass equivalence, Shows mass can be converted to energy, Basis of nuclear reactions"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 12 Physics?",
        "a": "70 marks with 3 hours duration, covering MCQ, short answer, and long answer questions on both theoretical and numerical problems."
      },
      {
        "q": "Which topics are most important?",
        "a": "Electromagnetism, Optics, Modern Physics, Nuclear Physics are crucial for board exams and competitive exams."
      },
      {
        "q": "How to solve numerical problems efficiently?",
        "a": "Understand underlying concepts, Identify relevant formulas, Substitute values carefully, Check units and significant figures."
      }
    ]
  },
  {
    "slug": "class-12-chemistry-set-2",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "board": "CBSE",
    "title": "CBSE Class 12 Chemistry Sample Paper Set 2",
    "intro": "Comprehensive chemistry sample paper covering organic, inorganic, and physical chemistry topics. Master reactions, mechanisms, and calculations with detailed solutions for Class 12 board exams. This is a shortened practice set: 27 questions worth 69 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 69,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The value of Avogadro's number is?",
            "marks": 1,
            "answer": "6.022 x 10^23"
          },
          {
            "q": "Which element has highest electronegativity?",
            "marks": 1,
            "answer": "Fluorine"
          },
          {
            "q": "The SI unit of pressure is?",
            "marks": 1,
            "answer": "Pascal (Pa)"
          },
          {
            "q": "What is the oxidation state of sulfur in H2SO4?",
            "marks": 1,
            "answer": "+6"
          },
          {
            "q": "The pH of neutral solution is?",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "Which gas is used in making ammonia by Haber process?",
            "marks": 1,
            "answer": "Nitrogen and Hydrogen"
          },
          {
            "q": "What is the general formula for alkanes?",
            "marks": 1,
            "answer": "CnH2n+2"
          },
          {
            "q": "The catalyst used in contact process is?",
            "marks": 1,
            "answer": "Vanadium pentoxide (V2O5)"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "What is Mohs scale? Give its uses.",
            "marks": 2,
            "answer": "Measures hardness of minerals from 1 (softest) to 10 (hardest), Used to identify minerals"
          },
          {
            "q": "Explain Le Chatliers principle with example.",
            "marks": 3,
            "answer": "System shifts to counteract change, Example: N2 + 3H2 <-> 2NH3, Increase pressure shifts right"
          },
          {
            "q": "What is buffer solution? How does it resist pH change?",
            "marks": 2,
            "answer": "Weak acid + its salt or weak base + its salt, Neutralizes added acid or base, Maintains constant pH"
          },
          {
            "q": "Write the electronic configuration of transition metals and explain d-block elements.",
            "marks": 3,
            "answer": "Configuration: (n-1)d^1-10 ns^1-2, Partially filled d orbitals, Show variable oxidation states"
          },
          {
            "q": "Explain the concept of hybridization with example.",
            "marks": 2,
            "answer": "Mixing of atomic orbitals, Example: Carbon in CH4 is sp^3 hybridized"
          },
          {
            "q": "What is isomerism? Explain structural and stereoisomerism.",
            "marks": 3,
            "answer": "Same molecular formula different structure, Structural: chain, position, functional group isomers, Stereoisomerism: geometric and optical"
          },
          {
            "q": "Describe the mechanism of SN1 reaction with example.",
            "marks": 2,
            "answer": "Unimolecular nucleophilic substitution, Two-step: carbocation formation then nucleophile attack"
          },
          {
            "q": "What is Friedel-Crafts alkylation? Write its conditions.",
            "marks": 2,
            "answer": "Introduction of alkyl group in benzene, Requires AlCl3 catalyst and alkyl halide"
          },
          {
            "q": "Explain polymer formation and classification of polymers.",
            "marks": 3,
            "answer": "Long chain of repeating units, Natural: protein, cellulose; Synthetic: polyethylene, polyester"
          },
          {
            "q": "What is saponification? Write equation for soap formation.",
            "marks": 2,
            "answer": "Hydrolysis of fat by NaOH, Fat + NaOH -> Glycerol + Fatty acid salt (soap)"
          },
          {
            "q": "Define Gibbs free energy and write its expression.",
            "marks": 2,
            "answer": "G = H - TS, Determines spontaneity of reaction, Delta-G < 0 for spontaneous process"
          },
          {
            "q": "Explain primary, secondary, and tertiary amines with examples.",
            "marks": 2,
            "answer": "Primary: RNH2, Secondary: R2NH, Tertiary: R3N, Differ by number of alkyl groups"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain the preparation of ammonia by Haber process with conditions and industrial importance.",
            "marks": 5,
            "answer": "N2 + 3H2 <-> 2NH3, Conditions: 400-500C, 150-200 atm pressure, Iron catalyst, Used for fertilizers and explosives"
          },
          {
            "q": "Derive thermodynamic expression for electrode potential. Explain Nernst equation.",
            "marks": 5,
            "answer": "E = E0 - (RT/nF)ln(Q), Relates cell potential to concentrations and temperature"
          },
          {
            "q": "Explain the preparation and properties of benzene. Discuss its aromaticity.",
            "marks": 5,
            "answer": "Prepared by decarboxylation of benzoic acid or reduction of phenol, Resonance stabilization, Exceptional stability, Prefers substitution over addition"
          },
          {
            "q": "Describe the mechanism of free radical substitution in alkanes with example.",
            "marks": 5,
            "answer": "Initiation: generation of free radicals, Propagation: radical chain reactions, Termination: combination of radicals, Example: Chlorination of methane"
          },
          {
            "q": "Explain qualitative analysis scheme for cations. Discuss Group I, II, III, IV, V precipitations.",
            "marks": 5,
            "answer": "Group I: Pb2+, Ag+, Hg2+ with HCl, Group II: Hg2+, Pb2+, Bi3+ with H2S, Systematic identification based on solubility"
          },
          {
            "q": "Write a detailed note on carbohydrates. Classify and explain monosaccharides and polysaccharides.",
            "marks": 4,
            "answer": "Polyhydroxy aldehydes or ketones, Monosaccharides: glucose, fructose; Disaccharides: sucrose, maltose; Polysaccharides: starch, glycogen"
          },
          {
            "q": "Discuss factors affecting rate of reaction with Arrhenius equation explanation.",
            "marks": 4,
            "answer": "Temperature, Concentration, Pressure, Catalyst, Surface area, k = A*e^(-Ea/RT), Lower activation energy increases rate"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 12 Chemistry?",
        "a": "70 marks with 3 hours duration, covering sections on physical, inorganic, and organic chemistry with MCQ, short answer, and long answer questions."
      },
      {
        "q": "Which topics are most frequently asked?",
        "a": "Chemical reactions, Thermodynamics, Electrochemistry, Organic mechanisms, Polymers, and Qualitative analysis are important topics."
      },
      {
        "q": "How to prepare for reactions and mechanisms?",
        "a": "Practice writing equations, understand reaction mechanisms step by step, learn reaction conditions, and practice various problem types regularly."
      }
    ]
  },
  {
    "slug": "class-12-biology-set-2",
    "classLevel": "Class 12",
    "subject": "Biology",
    "board": "CBSE",
    "title": "CBSE Class 12 Biology Sample Paper Set 2",
    "intro": "Complete biology sample paper covering genetics, evolution, ecology, plant and animal physiology. Master concepts related to reproduction, biotechnology, and human welfare. This is a shortened practice set: 26 questions worth 68 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 7,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The basic unit of life is?",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "DNA stands for?",
            "marks": 1,
            "answer": "Deoxyribonucleic Acid"
          },
          {
            "q": "The process of formation of new blood cells is called?",
            "marks": 1,
            "answer": "Hematopoiesis"
          },
          {
            "q": "Immunity conferred by antibodies is?",
            "marks": 1,
            "answer": "Humoral immunity"
          },
          {
            "q": "The structural and functional unit of kidney is?",
            "marks": 1,
            "answer": "Nephron"
          },
          {
            "q": "Photosynthetically active region of spectrum is?",
            "marks": 1,
            "answer": "400-700 nm"
          },
          {
            "q": "The first hormone isolated was?",
            "marks": 1,
            "answer": "Insulin"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "What is transcription? Explain its types in prokaryotes and eukaryotes.",
            "marks": 2,
            "answer": "Synthesis of RNA from DNA, Prokaryotes: single RNA polymerase, Eukaryotes: three RNA polymerases"
          },
          {
            "q": "Explain the process of translation and its three stages.",
            "marks": 3,
            "answer": "Protein synthesis from mRNA, Initiation: ribosome assembly, Elongation: amino acid addition, Termination: release of protein"
          },
          {
            "q": "What is genetic code? Write its features.",
            "marks": 2,
            "answer": "Triplet codon carries amino acid information, Universal, Non-overlapping, Degenerate"
          },
          {
            "q": "Explain law of segregation with a monohybrid cross example.",
            "marks": 3,
            "answer": "Alleles separate during gamete formation, Example: Aa x Aa produces 3:1 ratio in F2"
          },
          {
            "q": "What is linkage? Explain crossing over and recombination.",
            "marks": 2,
            "answer": "Genes on same chromosome inherited together, Crossing over exchanges genetic material creating new combinations"
          },
          {
            "q": "Describe the structure of DNA. Write Watson-Crick model features.",
            "marks": 3,
            "answer": "Double helix, Sugar-phosphate backbone, Nitrogenous bases paired (A-T, G-C), Antiparallel strands"
          },
          {
            "q": "What is gene expression? Explain central dogma of molecular biology.",
            "marks": 2,
            "answer": "Conversion of genotype to phenotype, DNA -> RNA -> Protein (central dogma)"
          },
          {
            "q": "Explain the process of photosynthesis with equation.",
            "marks": 2,
            "answer": "6CO2 + 6H2O + light -> C6H12O6 + 6O2, Occurs in chloroplasts"
          },
          {
            "q": "What is respiration? Explain aerobic and anaerobic respiration.",
            "marks": 3,
            "answer": "Release of energy from food, Aerobic: requires O2, produces 38 ATP, Anaerobic: without O2, produces 2 ATP"
          },
          {
            "q": "Describe the structure and function of mitochondria.",
            "marks": 2,
            "answer": "Double membrane organelle, Inner folds = cristae, Site of ATP production, Oxidative phosphorylation"
          },
          {
            "q": "What is evolution? Explain Darwins theory of natural selection.",
            "marks": 2,
            "answer": "Change in organisms over time, Natural selection: survival of fittest, Environmental pressure selects favorable traits"
          },
          {
            "q": "Explain the different types of natural selection.",
            "marks": 2,
            "answer": "Stabilizing: favors intermediate phenotypes, Directional: favors one extreme, Disruptive: favors both extremes"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain spermatogenesis and oogenesis. Compare both processes.",
            "marks": 5,
            "answer": "Spermatogenesis: continuous in males, produces 4 functional sperms, Oogenesis: cyclic in females, produces 1 ovum and 3 polar bodies"
          },
          {
            "q": "Describe the menstrual cycle and hormonal regulation in females.",
            "marks": 5,
            "answer": "28-day cycle, FSH and LH from pituitary regulate follicular and luteal phases, Estrogen and progesterone maintain cycle"
          },
          {
            "q": "Explain the process of photosynthesis with details of light and dark reactions.",
            "marks": 5,
            "answer": "Light reactions: electron transport, photolysis, ATP and NADPH formation in thylakoids, Dark reactions: Calvin cycle, CO2 fixation in stroma"
          },
          {
            "q": "Describe the structure of nephron and process of urine formation.",
            "marks": 5,
            "answer": "Glomerulus, Bowmans capsule, PT, LOH, DCT, Processes: ultrafiltration, selective reabsorption, secretion"
          },
          {
            "q": "Explain immune response. Describe humoral and cell-mediated immunity.",
            "marks": 5,
            "answer": "Defense against pathogens, Humoral: B cells produce antibodies, Cell-mediated: T cells destroy infected cells"
          },
          {
            "q": "Describe the process of dihybrid cross and proof of law of independent assortment.",
            "marks": 4,
            "answer": "Cross with two traits, F2 ratio 9:3:3:1, Proves genes on different chromosomes assort independently"
          },
          {
            "q": "Explain genetic engineering and its applications in agriculture and medicine.",
            "marks": 4,
            "answer": "Manipulation of DNA, Applications: GMO crops, production of insulin and vaccines, disease resistance"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics should be focused for Class 12 Biology board exam?",
        "a": "Reproduction, Genetics, Molecular Biology, Plant and animal physiology, Evolution, Ecology, and Biotechnology are key topics."
      },
      {
        "q": "What is the exam pattern for Class 12 Biology?",
        "a": "70 marks with 3 hours duration, covering objective, short answer, and long answer questions on all Biology topics."
      },
      {
        "q": "How to prepare diagrams effectively?",
        "a": "Practice drawing structures like cell, mitochondria, nephron, flower. Label all parts clearly. Understand the process each diagram represents."
      }
    ]
  },
  {
    "slug": "class-11-physics-set-2",
    "classLevel": "Class 11",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 11 Physics Sample Paper Set 2",
    "intro": "Comprehensive physics sample paper covering mechanics, thermodynamics, waves, and gravitation. Practice conceptual questions and numerical problems with complete solutions. This is a shortened practice set: 27 questions worth 68 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The SI unit of work is?",
            "marks": 1,
            "answer": "Joule (J)"
          },
          {
            "q": "What is the SI unit of moment of inertia?",
            "marks": 1,
            "answer": "kg*m^2"
          },
          {
            "q": "The gravitational constant G equals approximately?",
            "marks": 1,
            "answer": "6.67 x 10^-11 N*m^2/kg^2"
          },
          {
            "q": "Simple harmonic motion can be represented by?",
            "marks": 1,
            "answer": "y = A sin(omega*t + phi)"
          },
          {
            "q": "The SI unit of angular momentum is?",
            "marks": 1,
            "answer": "kg*m^2/s"
          },
          {
            "q": "Youngs modulus is ratio of?",
            "marks": 1,
            "answer": "Stress to Strain"
          },
          {
            "q": "The speed of sound in air at 0C is approximately?",
            "marks": 1,
            "answer": "330 m/s"
          },
          {
            "q": "Which of the following is not a type of simple harmonic motion?",
            "marks": 1,
            "answer": "Uniformly accelerated motion"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "State law of conservation of momentum and derive it from Newtons laws.",
            "marks": 2,
            "answer": "Total momentum of isolated system remains constant, F = dp/dt = 0, so p = constant"
          },
          {
            "q": "Explain the concept of angular displacement and angular velocity.",
            "marks": 2,
            "answer": "Angular displacement: angle swept, Angular velocity: rate of change of angular displacement"
          },
          {
            "q": "What is torque? Write its expression and explain its physical meaning.",
            "marks": 3,
            "answer": "Tau = r x F, Tendency to produce rotation, Vector product of position and force"
          },
          {
            "q": "Explain the difference between elastic and inelastic collisions.",
            "marks": 2,
            "answer": "Elastic: KE conserved, Inelastic: KE not conserved, In both momentum is conserved"
          },
          {
            "q": "What is escape velocity? Derive its expression.",
            "marks": 3,
            "answer": "Minimum velocity to escape gravitational field, v_escape = sqrt(2GM/R)"
          },
          {
            "q": "Explain simple harmonic motion and write its characteristics.",
            "marks": 2,
            "answer": "Oscillatory motion about equilibrium, Acceleration proportional to displacement and opposite direction"
          },
          {
            "q": "Derive expression for time period of simple pendulum.",
            "marks": 2,
            "answer": "T = 2pi*sqrt(L/g) where L is length, g is gravitational acceleration"
          },
          {
            "q": "What is Hookes law? Write its mathematical form.",
            "marks": 2,
            "answer": "F = -kx where k is spring constant, x is displacement"
          },
          {
            "q": "Explain the process of wave formation and types of waves.",
            "marks": 3,
            "answer": "Disturbance propagates through medium, Transverse: perpendicular to motion, Longitudinal: parallel to motion"
          },
          {
            "q": "What is Doppler effect? Write its expression for moving observer.",
            "marks": 2,
            "answer": "Apparent frequency changes due to relative motion, f' = f(v + v_observer)/(v + v_source)"
          },
          {
            "q": "Explain the concept of thermal equilibrium and temperature.",
            "marks": 2,
            "answer": "Thermal equilibrium: no heat flow between bodies, Temperature: measure of average kinetic energy"
          },
          {
            "q": "State first law of thermodynamics and write its expression.",
            "marks": 2,
            "answer": "dQ = dU + dW, Heat absorbed equals change in internal energy plus work done"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain the concept of work-energy theorem. Derive and prove it.",
            "marks": 5,
            "answer": "Work done by net force equals change in kinetic energy, W_net = delta-KE, Derived from F = ma and kinematics"
          },
          {
            "q": "Explain rotational motion and derive equation for rotational kinetic energy.",
            "marks": 5,
            "answer": "Motion about axis, I = mr^2, KE_rot = (1/2)*I*omega^2, Analogous to linear motion"
          },
          {
            "q": "Describe the motion of charged particle in uniform electric and magnetic fields.",
            "marks": 5,
            "answer": "In E field: F = qE, Linear motion, In B field: Lorentz force, Circular motion with radius r = mv/(qB)"
          },
          {
            "q": "Explain Keplers laws of planetary motion with physical interpretation.",
            "marks": 5,
            "answer": "First: elliptical orbit, Second: equal areas in equal time, Third: T^2 proportional to a^3"
          },
          {
            "q": "Describe the phenomenon of resonance. Explain its conditions and applications.",
            "marks": 5,
            "answer": "Amplitude maximum when driving frequency equals natural frequency, Conditions: damping is low, Resonance frequency = omega_0"
          },
          {
            "q": "Explain the concept of entropy and second law of thermodynamics.",
            "marks": 4,
            "answer": "Entropy: measure of disorder, Second law: entropy of isolated system always increases"
          },
          {
            "q": "Describe the variation of g with altitude and depth. Derive expressions.",
            "marks": 4,
            "answer": "g_h = g(1 - 2h/R) at height h, g_d = g(1 - d/R) at depth d"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the important chapters in Class 11 Physics?",
        "a": "Motion, Forces, Energy, Gravitation, Oscillations, Waves, and Thermodynamics are fundamental chapters."
      },
      {
        "q": "What is the exam pattern?",
        "a": "70 marks with 3 hours duration, covering MCQ, short answer questions, and long answer problems."
      },
      {
        "q": "How to solve numerical problems effectively?",
        "a": "Read carefully, identify given values, choose relevant formula, substitute correctly, check units, and verify answer."
      }
    ]
  },
  {
    "slug": "class-11-chemistry-set-2",
    "classLevel": "Class 11",
    "subject": "Chemistry",
    "board": "CBSE",
    "title": "CBSE Class 11 Chemistry Sample Paper Set 2",
    "intro": "Complete chemistry sample paper covering atomic structure, chemical bonding, states of matter, and thermodynamics. Master calculations and conceptual questions with step-by-step solutions. This is a shortened practice set: 27 questions worth 69 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 69,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The number of electrons in one mole of electrons is?",
            "marks": 1,
            "answer": "6.022 x 10^23"
          },
          {
            "q": "Planck's constant h equals approximately?",
            "marks": 1,
            "answer": "6.626 x 10^-34 J*s"
          },
          {
            "q": "Bohr radius of hydrogen atom is?",
            "marks": 1,
            "answer": "0.53 Angstrom"
          },
          {
            "q": "The shape of s orbital is?",
            "marks": 1,
            "answer": "Spherical"
          },
          {
            "q": "Bond angle in methane (CH4) is?",
            "marks": 1,
            "answer": "109.5 degrees"
          },
          {
            "q": "The SI unit of molarity is?",
            "marks": 1,
            "answer": "mol/L"
          },
          {
            "q": "Which gas has least density at same temperature and pressure?",
            "marks": 1,
            "answer": "Hydrogen"
          },
          {
            "q": "The process of dissolving of solute in solvent is?",
            "marks": 1,
            "answer": "Solvation or Dissolution"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Explain atomic radius and write factors affecting it.",
            "marks": 2,
            "answer": "Distance of outer electron from nucleus, Increases down group, Decreases across period"
          },
          {
            "q": "What is ionization enthalpy? Explain its trend in periodic table.",
            "marks": 3,
            "answer": "Energy required to remove electron, Increases across period, Decreases down group, Half-filled and filled subshells have high values"
          },
          {
            "q": "Explain the concept of electronegativity with Pauling scale.",
            "marks": 2,
            "answer": "Tendency to attract shared electron, Pauling scale: 0-4, Fluorine has highest value of 4"
          },
          {
            "q": "Write Lewis structure of CO2 and explain bonding.",
            "marks": 2,
            "answer": "O=C=O with double bonds, Linear structure, Non-polar molecule"
          },
          {
            "q": "Explain the concept of hybridization with sp, sp2, sp3 examples.",
            "marks": 3,
            "answer": "Mixing of atomic orbitals, sp: linear, sp2: trigonal planar, sp3: tetrahedral"
          },
          {
            "q": "What is VSEPR theory? Explain its application.",
            "marks": 2,
            "answer": "Electron pairs repel each other, Determines molecular geometry, Predicts 3D shape of molecules"
          },
          {
            "q": "Explain intermolecular forces and write types with examples.",
            "marks": 3,
            "answer": "London forces: weakest, Dipole-dipole: medium, Hydrogen bonding: strongest"
          },
          {
            "q": "What is molarity? Calculate molarity of 2 moles solute in 500 mL solution.",
            "marks": 2,
            "answer": "Moles of solute per liter of solution, M = 2/0.5 = 4 M"
          },
          {
            "q": "Explain the concept of isotopes and give example.",
            "marks": 2,
            "answer": "Same atomic number different mass number, Example: Carbon-12 and Carbon-14"
          },
          {
            "q": "Write gas law and derive ideal gas equation.",
            "marks": 3,
            "answer": "PV = nRT, Combining Boyles, Charles, and Avogadro laws"
          },
          {
            "q": "What is Daltons law of partial pressures?",
            "marks": 2,
            "answer": "Total pressure = sum of partial pressures of gases, P_total = P1 + P2 + P3..."
          },
          {
            "q": "Explain the first law of thermodynamics with example.",
            "marks": 2,
            "answer": "dQ = dU + dW, Heat absorbed equals change in internal energy plus work done"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain Bohr model of hydrogen atom with postulates and derive Bohr radius formula.",
            "marks": 5,
            "answer": "Quantization of angular momentum, Energy levels, Bohr radius = 0.53 Angstrom derived from force balance and Coulombs law"
          },
          {
            "q": "Describe the shapes of p and d orbitals. Explain orbital concept.",
            "marks": 5,
            "answer": "p orbital: dumbbell-shaped, d orbital: cloverleaf-shaped, Orbital: 3D region with high probability of finding electron"
          },
          {
            "q": "Explain the concept of electronegativity and ionic versus covalent bonding.",
            "marks": 5,
            "answer": "Electronegativity difference > 1.7: ionic, < 0.4: covalent, 0.4-1.7: polar covalent"
          },
          {
            "q": "Describe the properties of gases and explain deviation from ideal behavior.",
            "marks": 5,
            "answer": "Ideal gases: no intermolecular forces, negligible volume, Real gases deviate due to intermolecular attractions and molecular volume"
          },
          {
            "q": "Explain thermodynamic terms and define internal energy with examples.",
            "marks": 5,
            "answer": "Internal energy: total energy of system, U = sum of kinetic + potential energy, State function, Independent of path"
          },
          {
            "q": "Describe the structure of benzene and explain resonance in aromatic compounds.",
            "marks": 4,
            "answer": "Planar hexagonal structure, Resonance: multiple Lewis structures possible, Conjugated pi bonds provide stability"
          },
          {
            "q": "Write solutions of different types and explain colligative properties.",
            "marks": 4,
            "answer": "Unsaturated, saturated, supersaturated solutions, Colligative properties: vapor pressure, boiling point, freezing point depression, osmotic pressure"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the key chapters in Class 11 Chemistry?",
        "a": "Some systems, Atomic structure, Periodic table, Chemical bonding, States of matter, and Thermodynamics are fundamental."
      },
      {
        "q": "What is the exam pattern?",
        "a": "70 marks with 3 hours duration, covering MCQ, short answer questions, and long answer problems."
      },
      {
        "q": "How to prepare for problem-solving?",
        "a": "Understand concept, learn formula, practice variations, check significant figures, master unit conversions."
      }
    ]
  },
  {
    "slug": "class-10-english-set-2",
    "classLevel": "Class 10",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 10 English Sample Paper Set 2",
    "intro": "Comprehensive English sample paper covering reading, writing, grammar, and literature. Develop communication skills and language proficiency with diverse question types and complete solutions. This is a shortened practice set: 30 questions worth 75 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 75,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 18,
        "instructions": "Read the passage carefully and answer all questions.",
        "questions": [
          {
            "q": "What is the main idea of the first passage about environmental conservation?",
            "marks": 2,
            "answer": "The importance of protecting natural resources and preventing environmental degradation for future generations"
          },
          {
            "q": "According to the passage, what are the effects of deforestation?",
            "marks": 2,
            "answer": "Loss of habitat, soil erosion, climate change, reduced biodiversity, increased greenhouse gases"
          },
          {
            "q": "Which statement is true according to the passage?",
            "marks": 1,
            "answer": "Environmental protection requires collective effort from government, industries, and individuals"
          },
          {
            "q": "What word in the passage means loss of trees from forest areas?",
            "marks": 1,
            "answer": "Deforestation"
          },
          {
            "q": "Write a title for the second passage about renewable energy.",
            "marks": 2,
            "answer": "Renewable Energy: Path to Sustainable Future or The Importance of Clean Energy Sources"
          },
          {
            "q": "Why are renewable energy sources important according to the passage?",
            "marks": 2,
            "answer": "They are sustainable, do not produce emissions, reduce dependence on fossil fuels, and help combat climate change"
          },
          {
            "q": "What can be inferred from the passage about solar energy?",
            "marks": 2,
            "answer": "It is an abundant, clean, and increasingly cost-effective source of power that can be harnessed in various ways"
          },
          {
            "q": "Find a word from the passage that means natural or organic resources.",
            "marks": 1,
            "answer": "Renewable"
          },
          {
            "q": "According to the passage, how does wind energy contribute to sustainability?",
            "marks": 2,
            "answer": "Wind energy produces electricity without emissions, is renewable, and reduces dependence on fossil fuels"
          },
          {
            "q": "What is the authors tone in discussing renewable energy?",
            "marks": 3,
            "answer": "Optimistic and encouraging, emphasizing the potential and importance of renewable energy transition"
          }
        ],
        "passage": "PASSAGE 1\n\nThe forests, rivers and soil of a country are not an inheritance to be spent but a loan to be repaid. Protecting these natural resources, and preventing the degradation of the environment, is the only way to ensure that future generations inherit a land as liveable as the one we received.\n\nThe clearest warning is deforestation — the loss of trees from forest areas. Its effects compound one another: animals lose their habitat, unprotected topsoil is carried away as soil erosion, biodiversity is reduced as species vanish, and the greenhouse gases that trees once absorbed accumulate instead, driving climate change.\n\nNo single actor can reverse this. Environmental protection requires collective effort from government, industries and individuals together — laws that are enforced, industries that treat waste as their own responsibility, and citizens who change what they consume.\n\nPASSAGE 2\n\nIf the first problem is what we are losing, the second is what we could gain. Renewable energy comes from natural sources that replenish themselves, and it matters for four connected reasons: it is sustainable, it produces no emissions in use, it reduces our dependence on fossil fuels, and it helps combat climate change.\n\nSolar energy is the most abundant of these. The sunlight falling on the earth in a single hour carries more energy than humanity uses in a year, it is clean at the point of use, and it has become steadily more cost-effective as panel prices have fallen. It can be harnessed in many ways — vast solar farms, rooftop panels, water heaters, even lamps and pumps in villages far from any grid.\n\nWind energy contributes in much the same way. A turbine produces electricity without emissions, the wind that drives it is renewable, and every unit it generates further reduces dependence on fossil fuels.\n\nThe transition will not be effortless. But the direction is set, the technology improves each year, and there is real reason to believe the change can be made in time."
      },
      {
        "name": "Section B - Writing Skills",
        "marks": 30,
        "instructions": "Attempt all questions with clear and concise writing.",
        "questions": [
          {
            "q": "Write a formal letter to your school Principal requesting to organize an environmental awareness program.",
            "marks": 5,
            "answer": "Address, date, salutation, subject, body with purpose and benefits, closing with polite request"
          },
          {
            "q": "Write a short story on the theme Honesty is the Best Policy in 150-200 words.",
            "marks": 5,
            "answer": "Narrative with beginning, conflict, resolution, characters, dialogue, emphasizing honest behavior and its positive consequences"
          },
          {
            "q": "Write a notice for your school notice board about a health awareness camp.",
            "marks": 5,
            "answer": "Heading, date, subject, details about event, date, time, venue, who should attend, organized by, contact person"
          },
          {
            "q": "Describe your favorite book in 100-150 words, including plot, characters, and message.",
            "marks": 5,
            "answer": "Title and author, main plot summary, important characters, central message or theme, personal opinion"
          },
          {
            "q": "Write an email to your friend inviting them to your birthday party.",
            "marks": 5,
            "answer": "Subject line, greeting, invitation details, date, time, venue, what to bring, closing with warm regards"
          },
          {
            "q": "Write a paragraph of 100-150 words on the importance of sports in student life.",
            "marks": 5,
            "answer": "Topic sentence, physical benefits, mental health benefits, character development, discipline, teamwork, concluding sentence"
          }
        ]
      },
      {
        "name": "Section C - Grammar and Language",
        "marks": 17,
        "instructions": "Attempt all grammar and vocabulary questions.",
        "questions": [
          {
            "q": "Fill in the blank: She ____ (go) to the market yesterday.",
            "marks": 1,
            "answer": "went"
          },
          {
            "q": "Choose correct option: I _____ my homework before dinner.",
            "marks": 1,
            "answer": "have completed or had completed"
          },
          {
            "q": "Change to passive voice: The teacher taught us English.",
            "marks": 1,
            "answer": "English was taught to us by the teacher."
          },
          {
            "q": "Identify the part of speech: Quickly in the sentence He runs quickly.",
            "marks": 1,
            "answer": "Adverb"
          },
          {
            "q": "Correct the error: Despite of the heavy rain, we went out.",
            "marks": 1,
            "answer": "Despite the heavy rain, we went out."
          },
          {
            "q": "Use these words in a sentence: persevere, determination, success.",
            "marks": 3,
            "answer": "Through determination and perseverance, she achieved great success."
          },
          {
            "q": "Identify and correct the tense error: She have been studying since morning.",
            "marks": 2,
            "answer": "She has been studying since morning. (has instead of have)"
          },
          {
            "q": "Write synonyms for three of these words: bright, sad, quick.",
            "marks": 3,
            "answer": "bright: intelligent, luminous; sad: unhappy, sorrowful; quick: fast, swift"
          },
          {
            "q": "Change direct speech to indirect: He said, I am going to Delhi tomorrow.",
            "marks": 2,
            "answer": "He said that he was going to Delhi the next day."
          },
          {
            "q": "Correct the sentence: Neither the students nor the teacher are present.",
            "marks": 2,
            "answer": "Neither the students nor the teacher is present."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 10,
        "instructions": "Answer questions based on the prescribed texts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Who is the protagonist of the story?",
            "marks": 2,
            "answer": "Character name and brief description of their role and importance in the narrative"
          },
          {
            "q": "What is the central theme of the text?",
            "marks": 2,
            "answer": "Main message or moral of the story conveyed by the author"
          },
          {
            "q": "Describe a significant moment in the text that shows character development.",
            "marks": 3,
            "answer": "Scene with analysis of how character grows, changes perspective, or learns important lesson"
          },
          {
            "q": "How does the author use literary devices like metaphor or symbolism?",
            "marks": 3,
            "answer": "Examples of devices with explanation of their purpose and effect in the narrative"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 10 English?",
        "a": "80 marks with 3 hours duration covering reading, writing, grammar, vocabulary, and literature with diverse question types."
      },
      {
        "q": "How many marks are allocated to each section?",
        "a": "Reading Comprehension: 20 marks, Writing: 30 marks, Grammar: 20 marks, Literature: 10 marks."
      },
      {
        "q": "What are the writing tasks to practice?",
        "a": "Letters, notices, stories, paragraphs, emails, and descriptive pieces on various topics."
      }
    ]
  },
  {
    "slug": "class-9-maths-set-3",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 9 Mathematics Sample Paper Set 3",
    "intro": "Comprehensive mathematics sample paper covering number systems, algebra, geometry, and statistics. Strengthen problem-solving skills with diverse question types and detailed solutions. This is a shortened practice set: 39 questions worth 68 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Very Short Answer Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "What is the decimal form of 1/8?",
            "marks": 1,
            "answer": "0.125"
          },
          {
            "q": "Is 2 a rational or irrational number?",
            "marks": 1,
            "answer": "Irrational"
          },
          {
            "q": "Find the value of (2^3)^2.",
            "marks": 1,
            "answer": "64"
          },
          {
            "q": "Simplify: (x + 2)(x - 2).",
            "marks": 1,
            "answer": "x^2 - 4"
          },
          {
            "q": "What is the value of a^0 for any non-zero a?",
            "marks": 1,
            "answer": "1"
          },
          {
            "q": "Find the remainder when x^2 + 2x + 1 is divided by x + 1.",
            "marks": 1,
            "answer": "0"
          },
          {
            "q": "What is the sum of angles in a quadrilateral?",
            "marks": 1,
            "answer": "360 degrees"
          },
          {
            "q": "Define a median in a triangle.",
            "marks": 1,
            "answer": "Line segment from vertex to midpoint of opposite side"
          },
          {
            "q": "How many lines of symmetry does a square have?",
            "marks": 1,
            "answer": "4"
          },
          {
            "q": "What is the area of a circle with radius r?",
            "marks": 1,
            "answer": "pi*r^2"
          },
          {
            "q": "Find the value of sin 30 degrees.",
            "marks": 1,
            "answer": "1/2"
          },
          {
            "q": "What is the distance formula for two points?",
            "marks": 1,
            "answer": "sqrt((x2-x1)^2 + (y2-y1)^2)"
          },
          {
            "q": "Find mode of data: 5, 3, 5, 2, 5, 4.",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "What is the probability of getting a head when tossing a coin?",
            "marks": 1,
            "answer": "1/2"
          },
          {
            "q": "Simplify: sqrt(50).",
            "marks": 1,
            "answer": "5*sqrt(2)"
          },
          {
            "q": "Write the standard form of 0.00045.",
            "marks": 1,
            "answer": "4.5 x 10^-4"
          },
          {
            "q": "Find the value of x in 2x + 5 = 11.",
            "marks": 1,
            "answer": "3"
          },
          {
            "q": "What is the formula for volume of a cylinder?",
            "marks": 1,
            "answer": "pi*r^2*h"
          },
          {
            "q": "If a pair of linear equations has no solution, lines are?",
            "marks": 1,
            "answer": "Parallel"
          },
          {
            "q": "What is the HCF of 18 and 24?",
            "marks": 1,
            "answer": "6"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 25,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Prove that sqrt(3) is irrational.",
            "marks": 2,
            "answer": "Assume sqrt(3) = p/q in lowest terms, then 3 = p^2/q^2, so 3q^2 = p^2, leading to contradiction"
          },
          {
            "q": "Find the product using algebraic identity: (a + b)(a - b).",
            "marks": 2,
            "answer": "a^2 - b^2"
          },
          {
            "q": "Factorize: x^2 + 5x + 6.",
            "marks": 2,
            "answer": "(x + 2)(x + 3)"
          },
          {
            "q": "Solve the linear equation: 3x - 2 = 10.",
            "marks": 2,
            "answer": "x = 4"
          },
          {
            "q": "Plot points A(2, 3) and B(4, 1) on a graph. Find AB.",
            "marks": 2,
            "answer": "AB = sqrt(8) = 2*sqrt(2)"
          },
          {
            "q": "In triangle ABC, AB = AC and angle A = 60 degrees. Find angles B and C.",
            "marks": 2,
            "answer": "B = C = 60 degrees (equilateral triangle)"
          },
          {
            "q": "Find the area of a triangle with sides 3, 4, 5.",
            "marks": 2,
            "answer": "6 square units"
          },
          {
            "q": "Construct an angle of 75 degrees using compass and ruler.",
            "marks": 3,
            "answer": "Construct 45 + 30 degrees or bisect 150 degrees angle"
          },
          {
            "q": "Find the median of data: 2, 4, 6, 8, 10.",
            "marks": 2,
            "answer": "6"
          },
          {
            "q": "From a pack of 52 cards, find probability of drawing a red card.",
            "marks": 2,
            "answer": "26/52 = 1/2"
          },
          {
            "q": "Two adjacent angles on a straight line sum to?",
            "marks": 2,
            "answer": "180 degrees"
          },
          {
            "q": "Find the length of tangent from external point to circle with radius 5 and distance 13 from center.",
            "marks": 2,
            "answer": "12 units"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 23,
        "instructions": "Attempt all questions. Each question carries 3 or 4 marks.",
        "questions": [
          {
            "q": "Solve the pair of linear equations 2x + 3y = 8 and x - 2y = 1 using elimination method.",
            "marks": 3,
            "answer": "x = 19/7, y = 2/7"
          },
          {
            "q": "Find the roots of quadratic equation x^2 - 5x + 6 = 0 using factorization.",
            "marks": 3,
            "answer": "x = 2 or x = 3"
          },
          {
            "q": "In circle with center O and radius 10 cm, if chord AB = 16 cm, find distance from center to chord.",
            "marks": 3,
            "answer": "6 cm"
          },
          {
            "q": "Prove that angle in semicircle is a right angle.",
            "marks": 4,
            "answer": "Using inscribed angle theorem, angle subtended by diameter is 90 degrees"
          },
          {
            "q": "A cone has base radius 7 cm and height 24 cm. Find slant height, volume, and curved surface area.",
            "marks": 4,
            "answer": "Slant height = 25 cm, Volume = 1232 cm^3, Curved surface area = 550 cm^2"
          },
          {
            "q": "Three numbers are in ratio 2:3:5. If their sum is 100, find the numbers.",
            "marks": 3,
            "answer": "20, 30, 50"
          },
          {
            "q": "Draw graph of y = 2x - 1 and find intercepts.",
            "marks": 3,
            "answer": "y-intercept = -1, x-intercept = 0.5, straight line passing through these points"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 9 Mathematics?",
        "a": "Number systems, Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Circles, and Statistics."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 3 hours duration, covering very short answer (20 marks), short answer (30 marks), and long answer (30 marks) questions."
      },
      {
        "q": "Which chapters should I focus on for scoring well?",
        "a": "Focus on Linear Equations, Triangles, Circles, Areas, and Trigonometry basics as they carry significant marks."
      }
    ]
  },
  {
    "slug": "class-8-maths-set-2",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 8 Mathematics Sample Paper Set 2",
    "intro": "Engaging mathematics sample paper covering rational numbers, algebraic expressions, geometry, and data handling. Build strong fundamentals with practice problems and clear solutions. This is a shortened practice set: 42 questions worth 77 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 77,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The multiplicative inverse of 3/4 is?",
            "marks": 1,
            "answer": "4/3"
          },
          {
            "q": "What is the additive inverse of -5?",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "Simplify: (2^3) x (2^2).",
            "marks": 1,
            "answer": "32"
          },
          {
            "q": "Expand: (a + b)^2.",
            "marks": 1,
            "answer": "a^2 + 2ab + b^2"
          },
          {
            "q": "What is 25% of 80?",
            "marks": 1,
            "answer": "20"
          },
          {
            "q": "Find the value of x in x + 7 = 15.",
            "marks": 1,
            "answer": "8"
          },
          {
            "q": "What is the perimeter of a square with side 5 cm?",
            "marks": 1,
            "answer": "20 cm"
          },
          {
            "q": "How many sides does an octagon have?",
            "marks": 1,
            "answer": "8"
          },
          {
            "q": "What is the area of a rectangle with length 8 cm and width 5 cm?",
            "marks": 1,
            "answer": "40 cm^2"
          },
          {
            "q": "What is the circumference of circle with radius 7 cm?",
            "marks": 1,
            "answer": "44 cm or 2*pi*7"
          },
          {
            "q": "How many faces does a cube have?",
            "marks": 1,
            "answer": "6"
          },
          {
            "q": "The sum of interior angles of a triangle is?",
            "marks": 1,
            "answer": "180 degrees"
          },
          {
            "q": "What is the complement of 60 degrees angle?",
            "marks": 1,
            "answer": "30 degrees"
          },
          {
            "q": "Find the average of 10, 20, 30.",
            "marks": 1,
            "answer": "20"
          },
          {
            "q": "What is the probability of getting an even number when rolling a dice?",
            "marks": 1,
            "answer": "1/2 or 3/6"
          },
          {
            "q": "Express 0.5 as a fraction.",
            "marks": 1,
            "answer": "1/2"
          },
          {
            "q": "What is 15% of 200?",
            "marks": 1,
            "answer": "30"
          },
          {
            "q": "Simplify: 3x + 5x.",
            "marks": 1,
            "answer": "8x"
          },
          {
            "q": "What is the square root of 144?",
            "marks": 1,
            "answer": "12"
          },
          {
            "q": "How many millimeters are in 1 centimeter?",
            "marks": 1,
            "answer": "10"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 25,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Add the rational numbers: 1/2 + 3/4.",
            "marks": 2,
            "answer": "5/4"
          },
          {
            "q": "Subtract: 5/6 - 1/3.",
            "marks": 2,
            "answer": "1/2"
          },
          {
            "q": "Solve the equation: 2x + 3 = 11.",
            "marks": 2,
            "answer": "x = 4"
          },
          {
            "q": "Evaluate: (-3) + (-5) + 8.",
            "marks": 2,
            "answer": "0"
          },
          {
            "q": "If length of rectangle is 12 cm and area is 60 cm^2, find width.",
            "marks": 2,
            "answer": "5 cm"
          },
          {
            "q": "Find the volume of a cube with side 3 cm.",
            "marks": 2,
            "answer": "27 cm^3"
          },
          {
            "q": "Convert 2 km to meters.",
            "marks": 2,
            "answer": "2000 meters"
          },
          {
            "q": "If an item costs 500 rupees and 20% discount is given, find the selling price.",
            "marks": 2,
            "answer": "400 rupees"
          },
          {
            "q": "Find the mean of numbers: 5, 10, 15, 20.",
            "marks": 2,
            "answer": "12.5"
          },
          {
            "q": "Construct an angle of 90 degrees using compass and ruler.",
            "marks": 3,
            "answer": "Draw perpendicular bisector or construct using compass arc"
          },
          {
            "q": "What is the mode of data: 2, 3, 3, 5, 3, 7?",
            "marks": 2,
            "answer": "3"
          },
          {
            "q": "If 5 pencils cost 25 rupees, what is the cost of 8 pencils?",
            "marks": 2,
            "answer": "40 rupees"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 32,
        "instructions": "Attempt all questions. Each question carries 3 or 4 marks.",
        "questions": [
          {
            "q": "Draw a line segment of 8 cm and divide it into 4 equal parts.",
            "marks": 3,
            "answer": "Using compass and ruler, construct perpendicular bisectors"
          },
          {
            "q": "Factorize: 2x^2 + 5x + 3.",
            "marks": 3,
            "answer": "(2x + 3)(x + 1)"
          },
          {
            "q": "A cylindrical tank has radius 2 m and height 5 m. Find its volume and curved surface area.",
            "marks": 4,
            "answer": "Volume = 20*pi m^3, Curved surface area = 20*pi m^2"
          },
          {
            "q": "The cost price of an item is 800 rupees and it is sold at 20% profit. Find selling price.",
            "marks": 3,
            "answer": "960 rupees"
          },
          {
            "q": "Represent the data using a bar graph: Class A: 30 students, Class B: 25 students, Class C: 35 students.",
            "marks": 3,
            "answer": "Bar graph with classes on x-axis and number of students on y-axis"
          },
          {
            "q": "Solve the linear equation: 3(x - 2) + 5 = 14.",
            "marks": 3,
            "answer": "x = 5"
          },
          {
            "q": "The area of a square is 100 cm^2. Find its perimeter.",
            "marks": 3,
            "answer": "40 cm"
          },
          {
            "q": "In a class of 40 students, 24 passed in Mathematics. Find the percentage of students who passed.",
            "marks": 3,
            "answer": "60%"
          },
          {
            "q": "Draw a parallelogram ABCD with AB = 5 cm, BC = 4 cm, and angle ABC = 60 degrees.",
            "marks": 4,
            "answer": "Use ruler and protractor to construct the parallelogram with given measurements"
          },
          {
            "q": "Find the simple interest on 5000 rupees at 5% per annum for 2 years.",
            "marks": 3,
            "answer": "500 rupees"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the main topics in Class 8 Mathematics?",
        "a": "Rational numbers, Exponents, Algebraic expressions and identities, Equations, Geometry, Mensuration, Data handling, and Probability."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 3 hours duration covering objective, short answer, and long answer questions."
      },
      {
        "q": "How to solve word problems effectively?",
        "a": "Read carefully, identify what is given and to find, form equations, solve step by step, and verify the answer."
      }
    ]
  },
  {
    "slug": "class-7-science-set-2",
    "classLevel": "Class 7",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 7 Science Sample Paper Set 2",
    "intro": "Interactive science sample paper covering nutrition, digestion, respiration, transportation, and life processes. Explore concepts about plants and animals with diagrams and clear explanations. This is a shortened practice set: 33 questions worth 70 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "2.5 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A - Multiple Choice Questions",
        "marks": 15,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "Which nutrient is required for the growth of our body?",
            "marks": 1,
            "answer": "Protein"
          },
          {
            "q": "The process by which plants prepare their own food is?",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "The SI unit of speed is?",
            "marks": 1,
            "answer": "m/s"
          },
          {
            "q": "Which organ carries oxygen-rich blood from lungs to the body?",
            "marks": 1,
            "answer": "Artery"
          },
          {
            "q": "The basic unit of life is?",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "Which part of plant absorbs water from soil?",
            "marks": 1,
            "answer": "Root"
          },
          {
            "q": "The breathing organ in fish is?",
            "marks": 1,
            "answer": "Gill"
          },
          {
            "q": "What is the SI unit of force?",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Which is a non-renewable resource?",
            "marks": 1,
            "answer": "Coal"
          },
          {
            "q": "The process of breakdown of food into simpler substances is?",
            "marks": 1,
            "answer": "Digestion"
          },
          {
            "q": "Which type of lens is used in a microscope?",
            "marks": 1,
            "answer": "Convex lens"
          },
          {
            "q": "Temperature of human body is approximately?",
            "marks": 1,
            "answer": "37 degrees Celsius"
          },
          {
            "q": "The xylem in plants transports?",
            "marks": 1,
            "answer": "Water and minerals"
          },
          {
            "q": "Which food group provides energy to our body?",
            "marks": 1,
            "answer": "Carbohydrates"
          },
          {
            "q": "Friction acts in which direction?",
            "marks": 1,
            "answer": "Opposite to direction of motion"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Explain the process of photosynthesis.",
            "marks": 2,
            "answer": "Plants use sunlight to convert CO2 and water into glucose and oxygen"
          },
          {
            "q": "What are the different types of teeth in humans? Write their functions.",
            "marks": 3,
            "answer": "Incisors: cutting, Canines: tearing, Molars: grinding food"
          },
          {
            "q": "Describe the process of digestion in the human body.",
            "marks": 3,
            "answer": "Breakdown of food in mouth, stomach, and small intestine, absorption in small intestine"
          },
          {
            "q": "What is the role of white blood cells in our body?",
            "marks": 2,
            "answer": "Fight infections and protect body from diseases"
          },
          {
            "q": "Explain the process of respiration.",
            "marks": 2,
            "answer": "Breakdown of glucose to release energy in the form of ATP"
          },
          {
            "q": "How do plants reproduce? Write two methods.",
            "marks": 2,
            "answer": "Sexual reproduction: by seeds, Asexual: by vegetative propagation"
          },
          {
            "q": "What is the difference between speed and velocity?",
            "marks": 2,
            "answer": "Speed is distance per unit time, Velocity is displacement per unit time"
          },
          {
            "q": "Name different types of friction.",
            "marks": 2,
            "answer": "Static, sliding, rolling friction"
          },
          {
            "q": "What is a simple machine? Give examples.",
            "marks": 3,
            "answer": "Device that makes work easier, Examples: lever, pulley, inclined plane"
          },
          {
            "q": "Explain the water cycle.",
            "marks": 2,
            "answer": "Evaporation, condensation, precipitation, collection - continuous cycle"
          },
          {
            "q": "What are the constituents of soil?",
            "marks": 2,
            "answer": "Organic matter, minerals, water, air, living organisms"
          },
          {
            "q": "How do animals adapt to their habitat?",
            "marks": 2,
            "answer": "Physical adaptations and behavioral adaptations help survival"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Describe the structure of human heart with a diagram and explain blood circulation.",
            "marks": 5,
            "answer": "Four chambers, blood flow path: right atrium, right ventricle, lungs, left atrium, left ventricle, body"
          },
          {
            "q": "Explain the life cycle of insects with example of butterfly.",
            "marks": 5,
            "answer": "Egg, Larva, Pupa, Adult - complete metamorphosis in butterflies"
          },
          {
            "q": "Describe the structure and function of plant cell with labeled diagram.",
            "marks": 5,
            "answer": "Cell wall, Cell membrane, Nucleus, Mitochondria, Chloroplasts, Vacuole and their functions"
          },
          {
            "q": "Explain Newtons laws of motion with everyday examples.",
            "marks": 5,
            "answer": "First law: inertia (seatbelts), Second law: F=ma (acceleration), Third law: action-reaction"
          },
          {
            "q": "What are natural resources? How should they be used sustainably?",
            "marks": 4,
            "answer": "Natural resources are gifts of nature, use wisely to avoid depletion and environmental damage"
          },
          {
            "q": "Describe the process of excretion in humans.",
            "marks": 4,
            "answer": "Kidneys filter waste from blood, urine formation, storage in bladder, removal from body"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 7 Science?",
        "a": "Nutrition, Digestion, Respiration, Blood circulation, Transport, Reproduction, Motion, Forces, Friction, Electricity, and Natural resources."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 2.5 hours duration covering MCQ, short answer, and long answer questions."
      },
      {
        "q": "How to draw scientific diagrams properly?",
        "a": "Use pencil, draw neat lines, label all parts clearly, use arrows to show direction of processes."
      }
    ]
  },
  {
    "slug": "class-8-english",
    "classLevel": "Class 8",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 8 English Sample Paper Set 1",
    "intro": "This sample paper is designed to help students practice and evaluate their understanding of Class 8 English curriculum. It covers reading comprehension, grammar, writing skills and literature as per CBSE guidelines.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "marks": 20,
        "instructions": "Read the given passage and answer the questions that follow.",
        "questions": [
          {
            "q": "What does the passage primarily discuss about environmental conservation?",
            "marks": 5,
            "answer": "The passage discusses the importance of environmental conservation through individual and collective efforts, highlighting how small actions can lead to significant environmental changes."
          },
          {
            "q": "Explain the role of communities in waste management based on the passage.",
            "marks": 5,
            "answer": "Communities play a crucial role by organizing recycling programs, participating in clean-up drives, and educating people about reducing waste at the source."
          },
          {
            "q": "What is the main idea of the second paragraph?",
            "marks": 5,
            "answer": "The main idea is that technological advances have provided us with tools to monitor and reduce pollution, making environmental protection more achievable than ever before."
          },
          {
            "q": "How does the author support the claim that individuals can make a difference?",
            "marks": 5,
            "answer": "The author provides examples of successful individual initiatives, community projects, and statistics showing measurable environmental improvements from grassroots efforts."
          }
        ],
        "passage": "Environmental conservation is often described as a task for governments, but it begins far closer to home. It depends on individual and collective effort together — the household that separates its waste, the street that plants and waters trees, the school that stops buying plastic bottles. No law can do this work alone; laws set the direction, and people supply the effort.\n\nTechnological advances have provided us with tools to monitor and reduce pollution, making the problem far easier to act on than it was a generation ago. Cheap air-quality sensors now report readings street by street, so a city can see exactly where its worst air sits. Apps map collection routes for recyclers. Sewage treatment that once demanded vast plants can now be done at the scale of a single housing colony.\n\nCommunities matter most in waste management. A resident welfare association that organises a recycling programme, runs monthly clean-up drives and educates households about segregation achieves in a year what a municipal notice cannot achieve in ten.\n\nIt is fair to ask whether one person changes anything. The evidence says yes. A schoolgirl in Bengaluru whose petition ended single-use plastic in her school district; a colony in Pune that cut landfill waste by sixty per cent through composting; a fisherman in Kerala who has pulled tonnes of plastic from the sea in his nets. Individual initiatives grow into community projects, and community projects are what the statistics eventually record."
      },
      {
        "name": "Section B: Grammar and Vocabulary",
        "marks": 20,
        "instructions": "Complete the following grammar and vocabulary exercises.",
        "questions": [
          {
            "q": "Fill in the blanks with appropriate articles: The ___ Taj Mahal is one of ___ most famous monuments in India.",
            "marks": 5,
            "answer": "The; the"
          },
          {
            "q": "Identify and correct the error: She dont like playing cricket.",
            "marks": 5,
            "answer": "She doesnt like playing cricket. (dont should be doesnt with the third person singular)"
          },
          {
            "q": "Use the word immense in a sentence that shows its meaning clearly.",
            "marks": 5,
            "answer": "The immense size of the ocean filled the young explorer with wonder and awe."
          },
          {
            "q": "Change the voice: The teacher explained the concept to the students.",
            "marks": 5,
            "answer": "The concept was explained to the students by the teacher."
          }
        ]
      },
      {
        "name": "Section C: Writing Skills",
        "marks": 20,
        "instructions": "Write either an essay or a letter as instructed.",
        "questions": [
          {
            "q": "Write a letter to the Principal requesting a library extension during examination season (in about 120 words).",
            "marks": 10,
            "answer": "Dear Principal Sir/Madam, I am writing to request an extension of library timings during the examination season. Currently, many students face difficulty accessing study materials after school hours. An extended closing time would greatly benefit students preparing for their exams. I kindly request the library to remain open until 7 PM on weekdays. This would help many students utilize resources for better preparation. Thank you for considering this request. Yours respectfully, [Name]"
          },
          {
            "q": "Write an essay on Digital Literacy in the Modern World (150-200 words).",
            "marks": 10,
            "answer": "Digital Literacy in the Modern World has become as essential as traditional literacy. In todays technology-driven society, understanding digital tools is crucial for academic and professional success. Digital literacy enables individuals to access information, communicate effectively, and participate in online learning. Students must learn to navigate digital platforms, evaluate online sources, and practice digital safety. Schools are incorporating coding, digital art, and online research into their curriculum. However, digital literacy also demands awareness about cybersecurity and responsible internet use. Parents and educators must guide students in developing healthy digital habits. The ability to adapt to technological changes is now fundamental to thriving in the 21st century. Therefore, comprehensive digital literacy programs should be implemented across all educational institutions."
          }
        ]
      },
      {
        "name": "Section D: Literature",
        "marks": 20,
        "instructions": "Answer questions based on the prescribed texts and literary concepts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Discuss the character of the protagonist and his/her journey of transformation.",
            "marks": 5,
            "answer": "The protagonist undergoes significant character development from a timid and uncertain individual to a confident and determined person through various challenges and learning experiences throughout the narrative."
          },
          {
            "q": "Explain the significance of the title of a novel you have studied.",
            "marks": 5,
            "answer": "The title symbolizes the central theme of the story, representing the protagonists quest for self-discovery and the breaking down of societal barriers that limit personal growth."
          },
          {
            "q": "Identify and explain the use of symbolism in a key scene.",
            "marks": 5,
            "answer": "The use of light and darkness serves as powerful symbolism representing hope and despair, with key scenes using these elements to emphasize the emotional and moral journey of characters."
          },
          {
            "q": "How does the author use dialogue to reveal character traits?",
            "marks": 5,
            "answer": "The author employs distinct speech patterns, vocabulary choices, and conversational styles for each character, allowing readers to understand their personalities, backgrounds, and emotional states without explicit descriptions."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the time limit for this exam?",
        "a": "The time limit for this Class 8 English Sample Paper is 3 hours."
      },
      {
        "q": "How many marks is this paper out of?",
        "a": "This sample paper is out of 80 marks, divided equally among four sections."
      },
      {
        "q": "Are calculators allowed in this exam?",
        "a": "Since this is an English paper, calculators are not required. All answers are based on language skills, comprehension, and writing abilities."
      }
    ]
  },
  {
    "slug": "class-8-social-science",
    "classLevel": "Class 8",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "Class 8 Social Science Sample Paper Set 1",
    "intro": "This comprehensive sample paper covers History, Geography, and Civics as per CBSE Class 8 curriculum. It tests students understanding of Indian history, physical and human geography, and democratic processes.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: History",
        "marks": 25,
        "instructions": "Answer the following questions based on Indian history.",
        "questions": [
          {
            "q": "What were the main reasons for the decline of the Mughal Empire?",
            "marks": 5,
            "answer": "The main reasons included weak leadership after Aurangzeb, economic decline, religious conflicts, rise of regional powers, and ultimately the challenge posed by European colonial powers."
          },
          {
            "q": "Describe the impact of the British Industrial Revolution on Indian economy.",
            "marks": 5,
            "answer": "The Industrial Revolution led to increased demand for raw materials from India, decline of traditional industries, introduction of railways, and integration of India into the colonial economy, ultimately leading to economic exploitation."
          },
          {
            "q": "What was the significance of the Battle of Plassey?",
            "marks": 5,
            "answer": "The Battle of Plassey in 1757 marked the beginning of British dominance in India. Robert Clive defeated Bengal Nawab Siraj-ud-Daulah, establishing East India Company rule and paving the way for British territorial expansion."
          },
          {
            "q": "Explain the social reforms initiated by Raja Ram Mohan Roy.",
            "marks": 5,
            "answer": "Raja Ram Mohan Roy founded the Brahmo Samaj and worked for social reforms including abolition of sati, promotion of education for women, and reform of Hindu practices to align with rational thinking."
          },
          {
            "q": "What role did the printing press play in spreading nationalist ideas?",
            "marks": 5,
            "answer": "The printing press enabled mass production of newspapers, pamphlets, and books that spread nationalist and reformist ideas, creating awareness among educated classes and fostering a sense of national identity."
          }
        ]
      },
      {
        "name": "Section B: Geography",
        "marks": 25,
        "instructions": "Answer questions related to Indian and world geography.",
        "questions": [
          {
            "q": "Describe the geographical features that make the Western Ghats a biodiversity hotspot.",
            "marks": 5,
            "answer": "The Western Ghats have high altitude, abundant rainfall, dense forests, and varied terrain creating diverse ecological zones. These features support numerous endemic species of plants and animals, making it a biodiversity hotspot."
          },
          {
            "q": "What is the significance of the monsoon pattern in agriculture?",
            "marks": 5,
            "answer": "Monsoons bring essential rainfall for crops, determine agricultural seasons, influence crop selection, and affect food security. The timing and intensity of monsoons directly impact agricultural output across India."
          },
          {
            "q": "Explain the formation of the Himalayas and its relevance to India.",
            "marks": 5,
            "answer": "The Himalayas were formed by the collision of the Indian and Eurasian tectonic plates. They protect India from cold winds, influence climate, are a source of major rivers, and are crucial for Indias water security."
          },
          {
            "q": "How do ocean currents affect climate in coastal regions?",
            "marks": 5,
            "answer": "Ocean currents regulate temperature by transporting warm or cold water, influence precipitation patterns, affect wind direction, and moderate the climate of coastal areas, making them warmer or cooler than inland regions."
          },
          {
            "q": "What are the major soil types in India and their agricultural importance?",
            "marks": 5,
            "answer": "Major soil types include alluvial, black, laterite, and red soils. Alluvial soils are very fertile and support major crops. Black soils are ideal for cotton. Laterite soils support plantation crops. Each type determines the crops grown."
          }
        ]
      },
      {
        "name": "Section C: Civics",
        "marks": 30,
        "instructions": "Answer questions on Indian Constitution and democratic processes.",
        "questions": [
          {
            "q": "What are the fundamental rights guaranteed by the Indian Constitution?",
            "marks": 5,
            "answer": "Fundamental rights include right to equality, freedom of religion, right to freedom (speech, expression, association), right to constitutional remedies, and protection from exploitation and discrimination."
          },
          {
            "q": "Explain the principle of separation of powers in Indian government.",
            "marks": 5,
            "answer": "The separation of powers divides government into executive (implements laws), legislative (makes laws), and judicial (interprets laws) branches. This prevents concentration of power and ensures checks and balances."
          },
          {
            "q": "What is the role of an independent judiciary in a democracy?",
            "marks": 5,
            "answer": "An independent judiciary protects citizens rights, ensures fair justice, interprets laws impartially, acts as custodian of the Constitution, and serves as a check on executive and legislative powers."
          },
          {
            "q": "How are local governments important for citizen participation?",
            "marks": 5,
            "answer": "Local governments bring governance closer to citizens, enable direct participation in decision-making, address community-specific issues, promote transparency, and develop civic consciousness among residents."
          },
          {
            "q": "What are the functions of the Election Commission of India?",
            "marks": 5,
            "answer": "The Election Commission conducts free and fair elections, ensures voter participation, prevents electoral malpractices, maintains electoral code of conduct, and safeguards democratic principles during elections."
          },
          {
            "q": "Explain the role of civil society organizations in democracy.",
            "marks": 5,
            "answer": "Civil society organizations monitor government accountability, advocate for citizens rights, mobilize public opinion, provide social services, raise awareness on issues, and strengthen democratic participation beyond elections."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this sample paper based on the latest CBSE curriculum?",
        "a": "Yes, this sample paper is designed according to the latest CBSE Class 8 Social Science curriculum guidelines."
      },
      {
        "q": "How many sections are there in this paper?",
        "a": "There are three sections: History (25 marks), Geography (25 marks), and Civics (30 marks), totaling 80 marks."
      },
      {
        "q": "Should I prepare all topics equally?",
        "a": "Yes, you should prepare all topics equally as the sample paper covers important concepts from History, Geography, and Civics proportionally."
      }
    ]
  },
  {
    "slug": "class-7-maths-set-2",
    "classLevel": "Class 7",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "Class 7 Mathematics Sample Paper Set 2",
    "intro": "This mathematics sample paper tests competency in numbers, algebra, geometry, and data handling. It follows CBSE Class 7 curriculum and includes problems of varying difficulty levels.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Arithmetic and Algebra",
        "marks": 25,
        "instructions": "Solve the following problems. Show all working.",
        "questions": [
          {
            "q": "Simplify: 3/4 + 5/6 - 1/2",
            "marks": 5,
            "answer": "3/4 + 5/6 - 1/2 = 9/12 + 10/12 - 6/12 = 13/12 = 1 1/12"
          },
          {
            "q": "Solve for x: 2x + 7 = 19",
            "marks": 5,
            "answer": "2x = 19 - 7 = 12, x = 6"
          },
          {
            "q": "Find the value of 5^3 - 3^2 + 2^4",
            "marks": 5,
            "answer": "5^3 = 125, 3^2 = 9, 2^4 = 16. Therefore, 125 - 9 + 16 = 132"
          },
          {
            "q": "What is 15% of 200?",
            "marks": 5,
            "answer": "15% of 200 = (15/100) × 200 = 30"
          },
          {
            "q": "Solve: 3x - 5 = x + 7",
            "marks": 5,
            "answer": "3x - x = 7 + 5, 2x = 12, x = 6"
          }
        ]
      },
      {
        "name": "Section B: Geometry",
        "marks": 25,
        "instructions": "Answer geometry questions with proper reasoning.",
        "questions": [
          {
            "q": "Find the area of a rectangle with length 12 cm and breadth 8 cm.",
            "marks": 5,
            "answer": "Area = length × breadth = 12 × 8 = 96 square cm"
          },
          {
            "q": "What is the sum of interior angles of a triangle?",
            "marks": 5,
            "answer": "The sum of interior angles of a triangle is 180 degrees."
          },
          {
            "q": "Find the perimeter of a square with side 10 cm.",
            "marks": 5,
            "answer": "Perimeter = 4 × side = 4 × 10 = 40 cm"
          },
          {
            "q": "Calculate the area of a circle with radius 7 cm (use π = 22/7).",
            "marks": 5,
            "answer": "Area = πr^2 = (22/7) × 7 × 7 = 22 × 7 = 154 square cm"
          },
          {
            "q": "If two angles of a triangle are 50 degrees and 60 degrees, find the third angle.",
            "marks": 5,
            "answer": "Third angle = 180 - 50 - 60 = 70 degrees"
          }
        ]
      },
      {
        "name": "Section C: Data Handling and Mensuration",
        "marks": 30,
        "instructions": "Interpret data and solve problems related to measurement.",
        "questions": [
          {
            "q": "The heights of 5 students are 150, 155, 160, 152, 158 cm. Find the mean height.",
            "marks": 5,
            "answer": "Mean = (150 + 155 + 160 + 152 + 158) / 5 = 775 / 5 = 155 cm"
          },
          {
            "q": "Find the median of the dataset: 10, 20, 15, 25, 30",
            "marks": 5,
            "answer": "Arranging in order: 10, 15, 20, 25, 30. Median = 20 (middle value)"
          },
          {
            "q": "What is the volume of a cuboid with length 5 cm, breadth 4 cm, and height 3 cm?",
            "marks": 5,
            "answer": "Volume = length × breadth × height = 5 × 4 × 3 = 60 cubic cm"
          },
          {
            "q": "If a cylinder has radius 5 cm and height 10 cm, find its surface area (use π = 3.14).",
            "marks": 5,
            "answer": "Curved surface area = 2πrh = 2 × 3.14 × 5 × 10 = 314 square cm. Total surface area = 314 + 2π(5^2) = 314 + 157 = 471 square cm"
          },
          {
            "q": "The range of a dataset is 50. If the smallest value is 10, what is the largest value?",
            "marks": 5,
            "answer": "Range = Largest value - Smallest value. 50 = Largest - 10. Largest value = 60"
          },
          {
            "q": "Find the probability of rolling a 5 on a standard six-sided die.",
            "marks": 5,
            "answer": "Probability = Number of favorable outcomes / Total outcomes = 1/6"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Can I use a calculator for this exam?",
        "a": "A calculator may be used for complex calculations, but basic arithmetic should be done manually as per your schools guidelines."
      },
      {
        "q": "Is all of Class 7 mathematics covered in this paper?",
        "a": "Yes, the sample paper covers major topics from the entire Class 7 mathematics curriculum."
      },
      {
        "q": "How much time should I spend on each section?",
        "a": "Allocate approximately 50 minutes for each section of 25 marks and 60 minutes for the final section of 30 marks."
      }
    ]
  },
  {
    "slug": "class-6-maths",
    "classLevel": "Class 6",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "Class 6 Mathematics Sample Paper",
    "intro": "This sample paper introduces fundamental mathematical concepts including numbers, fractions, geometry basics, and data interpretation. It is designed to assess foundational skills in Class 6 mathematics.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Numbers and Operations",
        "marks": 20,
        "instructions": "Solve the following number problems.",
        "questions": [
          {
            "q": "Write the place value of 7 in 27,543.",
            "marks": 5,
            "answer": "The place value of 7 in 27,543 is 7,000 (thousands place)."
          },
          {
            "q": "Add: 234 + 567 + 123",
            "marks": 5,
            "answer": "234 + 567 + 123 = 924"
          },
          {
            "q": "Multiply: 15 × 12",
            "marks": 5,
            "answer": "15 × 12 = 180"
          },
          {
            "q": "Divide: 144 ÷ 12",
            "marks": 5,
            "answer": "144 ÷ 12 = 12"
          }
        ]
      },
      {
        "name": "Section B: Fractions and Decimals",
        "marks": 20,
        "instructions": "Work with fractions and decimal numbers.",
        "questions": [
          {
            "q": "Simplify: 8/12",
            "marks": 5,
            "answer": "8/12 = 2/3"
          },
          {
            "q": "Add: 1/4 + 1/2",
            "marks": 5,
            "answer": "1/4 + 1/2 = 1/4 + 2/4 = 3/4"
          },
          {
            "q": "Convert 0.5 to a fraction.",
            "marks": 5,
            "answer": "0.5 = 5/10 = 1/2"
          },
          {
            "q": "Which is greater: 3/5 or 1/2?",
            "marks": 5,
            "answer": "3/5 = 6/10, 1/2 = 5/10. Therefore, 3/5 > 1/2"
          }
        ]
      },
      {
        "name": "Section C: Geometry and Measurement",
        "marks": 20,
        "instructions": "Solve geometry and measurement problems.",
        "questions": [
          {
            "q": "Find the perimeter of a square with side 8 cm.",
            "marks": 5,
            "answer": "Perimeter = 4 × side = 4 × 8 = 32 cm"
          },
          {
            "q": "What is the area of a rectangle with length 10 cm and width 5 cm?",
            "marks": 5,
            "answer": "Area = length × width = 10 × 5 = 50 square cm"
          },
          {
            "q": "How many sides does a pentagon have?",
            "marks": 5,
            "answer": "A pentagon has 5 sides."
          },
          {
            "q": "Convert 500 grams to kilograms.",
            "marks": 5,
            "answer": "500 grams = 500/1000 = 0.5 kilograms"
          }
        ]
      },
      {
        "name": "Section D: Data and Probability",
        "marks": 20,
        "instructions": "Interpret and analyze data.",
        "questions": [
          {
            "q": "Find the mean of: 5, 10, 15, 20, 25",
            "marks": 5,
            "answer": "Mean = (5 + 10 + 15 + 20 + 25) / 5 = 75 / 5 = 15"
          },
          {
            "q": "What is the mode in this dataset: 2, 3, 3, 4, 5, 5, 5?",
            "marks": 5,
            "answer": "Mode = 5 (appears most frequently)"
          },
          {
            "q": "If a bag has 3 red balls and 5 blue balls, what is the probability of drawing a red ball?",
            "marks": 5,
            "answer": "Probability = 3 / (3 + 5) = 3/8"
          },
          {
            "q": "Find the range of the dataset: 10, 20, 25, 35, 40",
            "marks": 5,
            "answer": "Range = 40 - 10 = 30"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this paper suitable for self-assessment?",
        "a": "Yes, this sample paper is ideal for self-assessment and identifying areas that need more practice."
      },
      {
        "q": "How difficult is this paper compared to the actual exam?",
        "a": "This sample paper covers a similar difficulty level as the actual CBSE Class 6 examination."
      },
      {
        "q": "Can parents use this to help their child prepare?",
        "a": "Absolutely, this paper provides a good practice resource for parents to support their childs learning."
      }
    ]
  },
  {
    "slug": "class-6-science",
    "classLevel": "Class 6",
    "subject": "Science",
    "board": "CBSE",
    "title": "Class 6 Science Sample Paper",
    "intro": "This science sample paper covers physical science, life science, and earth science topics from the Class 6 curriculum. It emphasizes conceptual understanding and observation skills.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Life Science",
        "marks": 25,
        "instructions": "Answer questions about living organisms and life processes.",
        "questions": [
          {
            "q": "Name the five kingdoms of classification.",
            "marks": 5,
            "answer": "The five kingdoms are: Monera, Protista, Fungi, Plantae, and Animalia."
          },
          {
            "q": "What is photosynthesis? Write the equation.",
            "marks": 5,
            "answer": "Photosynthesis is the process by which plants use sunlight, water, and CO2 to make food. Equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2"
          },
          {
            "q": "Describe the structure of a plant cell.",
            "marks": 5,
            "answer": "A plant cell contains a cell wall, cell membrane, nucleus, cytoplasm, mitochondria, chloroplasts, and vacuoles. The cell wall provides rigidity and protection."
          },
          {
            "q": "What are the four types of teeth and their functions?",
            "marks": 5,
            "answer": "Incisors cut food, canines tear food, premolars crush food, and molars grind food. This helps in the first stage of digestion called mechanical digestion."
          },
          {
            "q": "Explain the water cycle in brief.",
            "marks": 5,
            "answer": "Water evaporates from water bodies, condenses into clouds, and falls as precipitation (rain/snow). This cycle repeats continuously and is essential for life on Earth."
          }
        ]
      },
      {
        "name": "Section B: Physical Science",
        "marks": 25,
        "instructions": "Answer questions on matter, energy, and forces.",
        "questions": [
          {
            "q": "Define force and give three examples.",
            "marks": 5,
            "answer": "Force is a push or pull that causes an object to move or change direction. Examples: gravity pulling objects down, friction between surfaces, and a person pushing a door."
          },
          {
            "q": "What is the difference between speed and velocity?",
            "marks": 5,
            "answer": "Speed is the distance covered per unit time without direction, while velocity is the displacement per unit time with direction. Velocity is a vector quantity."
          },
          {
            "q": "Explain the three states of matter with examples.",
            "marks": 5,
            "answer": "Solid has fixed shape and volume (ice). Liquid has fixed volume but takes the shape of container (water). Gas has no fixed shape or volume (steam)."
          },
          {
            "q": "What is friction? How is it useful in daily life?",
            "marks": 5,
            "answer": "Friction is the resistance between surfaces in contact. It is useful for walking, writing with a pen, car braking, and grip. However, it can also cause energy loss."
          },
          {
            "q": "Describe the properties of magnetic materials.",
            "marks": 5,
            "answer": "Magnetic materials are attracted to magnets, contain iron or similar elements, have magnetic poles (North and South), and can be permanent or temporary magnets."
          }
        ]
      },
      {
        "name": "Section C: Earth Science and Environment",
        "marks": 30,
        "instructions": "Answer questions about the Earth and its systems.",
        "questions": [
          {
            "q": "What is the atmosphere? What are its main layers?",
            "marks": 5,
            "answer": "The atmosphere is the layer of air surrounding Earth. Main layers from bottom to top are: Troposphere, Stratosphere, Mesosphere, Thermosphere, and Exosphere."
          },
          {
            "q": "Explain weather and climate. What is the difference?",
            "marks": 5,
            "answer": "Weather is short-term atmospheric conditions, while climate is long-term weather patterns of a region over years. Weather changes daily; climate is relatively stable."
          },
          {
            "q": "What causes earthquakes and volcanoes?",
            "marks": 5,
            "answer": "Both are caused by plate tectonics. Earthquakes occur when tectonic plates slide past each other. Volcanoes form where magma erupts through the Earths crust."
          },
          {
            "q": "Describe the rock cycle.",
            "marks": 5,
            "answer": "Igneous rocks form from magma. Weathering breaks them into sediment. Sediment compacts to form sedimentary rocks. Heat and pressure transform these into metamorphic rocks. Melting completes the cycle."
          },
          {
            "q": "What are renewable and non-renewable resources? Give examples.",
            "marks": 5,
            "answer": "Renewable resources can be replenished (solar, wind, water). Non-renewable resources cannot be easily replaced (coal, oil, natural gas, minerals)."
          },
          {
            "q": "How does soil formation occur? Why is soil important?",
            "marks": 5,
            "answer": "Soil forms through weathering of rocks and decomposition of organic matter over time. It is important for plant growth, water filtration, habitat for organisms, and agriculture."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does this paper follow the NCERT textbook?",
        "a": "Yes, this sample paper is aligned with the NCERT Class 6 Science curriculum."
      },
      {
        "q": "Are diagrams required in this exam?",
        "a": "Yes, diagrams with proper labels are often required for answers in science to demonstrate understanding."
      },
      {
        "q": "What topics should I focus on most?",
        "a": "Give equal emphasis to Life Science, Physical Science, and Earth Science as all three are important and carry equal marks."
      }
    ]
  },
  {
    "slug": "class-11-biology",
    "classLevel": "Class 11",
    "subject": "Biology",
    "board": "CBSE",
    "title": "Class 11 Biology Sample Paper",
    "intro": "This advanced biology sample paper covers cellular biology, genetics, ecology, and human physiology. It is designed for students preparing for competitive exams and CBSE board examinations. This set is longer than the board paper: 80 marks against the 70-mark CBSE pattern, so treat it as extended practice rather than a timed board rehearsal.",
    "duration": "3 hours 30 minutes",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Cell Biology and Genetics",
        "marks": 25,
        "instructions": "Answer detailed questions on cell structure and genetic principles.",
        "questions": [
          {
            "q": "Explain the fluid mosaic model of cell membrane and discuss its significance.",
            "marks": 5,
            "answer": "The fluid mosaic model proposes that the cell membrane is a flexible structure with phospholipids forming a bilayer and proteins embedded throughout. It explains membrane fluidity, selective permeability, and dynamic nature of biological membranes."
          },
          {
            "q": "Compare mitosis and meiosis with respect to chromosome number and genetic variation.",
            "marks": 5,
            "answer": "Mitosis produces two identical diploid cells with no genetic variation. Meiosis produces four haploid cells with genetic variation through crossing over and independent assortment."
          },
          {
            "q": "What is the central dogma of molecular biology? Explain transcription and translation.",
            "marks": 5,
            "answer": "The central dogma states DNA → RNA → Protein. Transcription converts DNA to mRNA in the nucleus. Translation converts mRNA to proteins at ribosomes."
          },
          {
            "q": "Describe the structure and function of mitochondria.",
            "marks": 5,
            "answer": "Mitochondria have double membranes with cristae. The matrix contains enzymes for Krebs cycle. It is the powerhouse of the cell, producing ATP through aerobic respiration."
          },
          {
            "q": "Explain Mendelian genetics and the law of segregation with an example.",
            "marks": 5,
            "answer": "Mendel discovered that traits are inherited through genes. Law of segregation: allele pairs separate during gamete formation. Example: TT and tt parents produce Tt offspring with dominant phenotype."
          }
        ]
      },
      {
        "name": "Section B: Plant and Animal Physiology",
        "marks": 25,
        "instructions": "Answer questions on body systems and physiological processes.",
        "questions": [
          {
            "q": "Describe the path of blood circulation through the heart and explain the significance of the valves.",
            "marks": 5,
            "answer": "Blood from body enters right atrium, flows to right ventricle, then to lungs. From lungs, oxygenated blood returns to left atrium, then left ventricle, and pumps to body. Valves prevent backflow."
          },
          {
            "q": "Explain the process of photosynthesis including light-dependent and light-independent reactions.",
            "marks": 5,
            "answer": "Light reactions occur in thylakoids producing ATP and NADPH using light energy. Dark reactions (Calvin cycle) occur in stroma, using ATP and NADPH to fix CO2 and produce glucose."
          },
          {
            "q": "Describe the human nervous system and the reflex arc.",
            "marks": 5,
            "answer": "Nervous system has CNS and PNS. Reflex arc is automatic response: stimulus → sensory neuron → spinal cord → motor neuron → muscle response, bypassing the brain."
          },
          {
            "q": "What is homeostasis? Give three examples of homeostatic mechanisms.",
            "marks": 5,
            "answer": "Homeostasis is maintaining stable internal environment. Examples: thermoregulation maintaining body temperature, osmoregulation balancing water and salts, and pH regulation in blood."
          },
          {
            "q": "Explain the process of respiration and the role of oxygen.",
            "marks": 5,
            "answer": "Respiration includes glycolysis, Krebs cycle, and electron transport chain. Oxygen is the final electron acceptor, enabling complete ATP production. Without oxygen, only anaerobic respiration occurs."
          }
        ]
      },
      {
        "name": "Section C: Ecology and Evolution",
        "marks": 30,
        "instructions": "Answer comprehensive questions on ecosystems and evolution.",
        "questions": [
          {
            "q": "Define population and community. Explain population growth patterns.",
            "marks": 5,
            "answer": "Population is all organisms of one species in an area. Community is all populations in an area. Growth follows exponential (J-curve) or logistic (S-curve) pattern depending on resource availability."
          },
          {
            "q": "Describe the nitrogen cycle and its importance.",
            "marks": 5,
            "answer": "Nitrogen cycle includes: nitrogen fixation (atmosphere to soil), nitrification, assimilation, and denitrification (back to atmosphere). It maintains nitrogen availability for proteins and nucleic acids."
          },
          {
            "q": "What is biodiversity? Why is biodiversity conservation important?",
            "marks": 5,
            "answer": "Biodiversity is the variety of organisms at all levels. Conservation is important for ecosystem stability, genetic resources, medicinal value, and ecosystem services."
          },
          {
            "q": "Explain natural selection and provide an example of adaptive radiation.",
            "marks": 5,
            "answer": "Natural selection favors organisms best adapted to environment. Adaptive radiation: Darwin finches in Galapagos evolved different beak shapes from one ancestor, adapting to different food sources."
          },
          {
            "q": "What is succession? Explain primary and secondary succession.",
            "marks": 5,
            "answer": "Succession is gradual change in community composition. Primary succession starts from bare rock, secondary succession on disturbed land. Both lead to climax community."
          },
          {
            "q": "Describe parasitism, mutualism, and commensalism with examples.",
            "marks": 5,
            "answer": "Parasitism: parasite benefits, host harmed (tapeworm-human). Mutualism: both benefit (bee-flower). Commensalism: one benefits, other unaffected (remora-shark)."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Are diagrams essential for scoring full marks?",
        "a": "Yes, labeled diagrams of cells, systems, and processes are essential for demonstrating understanding and often carry significant marks."
      },
      {
        "q": "What are the most important chapters for the board exam?",
        "a": "Cell biology, genetics, photosynthesis, respiration, nervous system, and reproduction are high-weightage chapters in CBSE Class 11 Biology."
      },
      {
        "q": "How can I prepare for the practical exam?",
        "a": "Practice microscopy, specimen identification, and experiment-based questions. Understanding the rationale behind experiments is more important than memorization."
      }
    ]
  },
  {
    "slug": "class-11-english",
    "classLevel": "Class 11",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 11 English Sample Paper",
    "intro": "This English sample paper tests reading comprehension, grammar, critical thinking, and creative writing skills. It follows CBSE Class 11 curriculum with both prescribed texts and extended reading. This set is longer than the board paper: 100 marks against the 80-mark CBSE pattern, so treat it as extended practice rather than a timed board rehearsal.",
    "duration": "3 hours 45 minutes",
    "totalMarks": 100,
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "marks": 30,
        "instructions": "Read the given passages and answer the questions comprehensively.",
        "questions": [
          {
            "q": "Analyze the authors perspective on environmental conservation and provide evidence from the passage.",
            "marks": 10,
            "answer": "The author emphasizes that individual and collective responsibility are equally important in environmental conservation. Evidence: the passage cites successful grassroots movements and personal choices like sustainable consumption as equally impactful as policy changes."
          },
          {
            "q": "What rhetorical devices does the author use to strengthen the argument?",
            "marks": 10,
            "answer": "The author uses metaphors comparing nature to living organisms, statistics providing concrete evidence, and personal anecdotes to appeal to both logic and emotion, making the argument compelling."
          },
          {
            "q": "How does the passage relate to contemporary global challenges?",
            "marks": 10,
            "answer": "The passage connects to climate change and resource depletion through its emphasis on sustainable practices and the finite nature of resources, showing relevance to current environmental crises."
          }
        ],
        "passage": "The earth does not belong to us in the way a house belongs to its owner. It is better understood as a living organism whose health we share — when its rivers are poisoned, something in us is poisoned too. That metaphor is not decoration. It is the most accurate description we have of a relationship in which the damage we do returns to us.\n\nThe figures are not in dispute. India loses roughly 1.6 million hectares of tree cover a decade. Groundwater in more than half of the country's districts is falling faster than it is replenished. Twenty-one of the world's thirty most polluted cities lie within our borders. Statistics of this kind provide concrete evidence for what would otherwise remain an argument about feelings.\n\nAnd yet the response is usually framed as a choice: either governments must act, or individuals must. This is a false division. Individual and collective responsibility are equally important — regulation without public will is unenforceable, and public will without regulation is merely well-intentioned. Ask yourself which of the two you have been waiting for, and whether the waiting has produced anything.\n\nThese are not distant concerns. Climate change and resource depletion are the same problem viewed over different timescales, and sustainable practice is the only response that addresses both. The generation now in school will spend its working life inside the consequences of decisions being taken, or avoided, this decade."
      },
      {
        "name": "Section B: Writing Skills",
        "marks": 30,
        "instructions": "Write coherent essays or letters as instructed with proper structure.",
        "questions": [
          {
            "q": "Write an argumentative essay on Digital Privacy vs National Security (400-450 words).",
            "marks": 15,
            "answer": "This topic requires presenting both sides with a clear thesis. A strong essay would argue that while national security is important, individual digital privacy is a fundamental right that must be protected through oversight mechanisms and transparent policies rather than unlimited surveillance."
          },
          {
            "q": "Write a formal letter to your local municipal corporation demanding better waste management (150-200 words).",
            "marks": 15,
            "answer": "Dear Municipal Commissioner, I write to request urgent action on waste management in our locality. Despite repeated complaints, waste accumulation remains a serious issue affecting public health and environment. I request implementation of regular waste collection schedules, segregation facilities, and awareness programs. Immediate intervention is essential. Yours sincerely, [Name]"
          }
        ]
      },
      {
        "name": "Section C: Grammar and Vocabulary",
        "marks": 20,
        "instructions": "Test grammar usage and vocabulary understanding.",
        "questions": [
          {
            "q": "Identify and correct the errors in this passage: The committee have decided to postpone their meeting tomorrow.",
            "marks": 5,
            "answer": "Error: have should be has (committee is singular). Corrected: The committee has decided to postpone its meeting tomorrow."
          },
          {
            "q": "Use the following idioms correctly in sentences: raining cats and dogs, break the ice.",
            "marks": 5,
            "answer": "It was raining cats and dogs when we started the journey. She used humor to break the ice at the formal dinner."
          },
          {
            "q": "Change the narration: He said, I love reading novels in my spare time.",
            "marks": 5,
            "answer": "He said that he loved reading novels in his spare time."
          },
          {
            "q": "Fill in the blanks with appropriate prepositions: He is keen ___ learning new languages and is interested ___ exploring different cultures.",
            "marks": 5,
            "answer": "He is keen on learning new languages and is interested in exploring different cultures."
          }
        ]
      },
      {
        "name": "Section D: Literature and Critical Reading",
        "marks": 20,
        "instructions": "Answer questions on prescribed texts and literary analysis. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Analyse the character development of the protagonist in a novel you have studied.",
            "marks": 10,
            "answer": "The protagonist evolves from an introverted, self-doubting individual to a confident leader through experiences of adversity and moral learning. Key turning points include confronting personal fears and choosing integrity over convenience."
          },
          {
            "q": "Compare and contrast two poems from the anthology focusing on their themes and poetic devices.",
            "marks": 10,
            "answer": "Poem A explores themes of loss through melancholic imagery and metaphor, while Poem B celebrates resilience using vivid sensory language and repetition. Both use nature symbolism but to opposite effects."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is the prescribed textbook sufficient for this exam?",
        "a": "The textbook is essential but supplementary reading of other works helps develop critical thinking and improves writing quality significantly."
      },
      {
        "q": "How important is grammar in scoring well?",
        "a": "Grammar is crucial in English exams. Poor grammar can cost marks even if content is good. Practice consistently and revise common errors."
      },
      {
        "q": "What should I focus on for literature questions?",
        "a": "Understand themes, character motivation, literary devices, and social context. Provide textual evidence for your interpretations and write analytically, not descriptively."
      }
    ]
  },
  {
    "slug": "class-12-english-set-2",
    "classLevel": "Class 12",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 12 English Sample Paper Set 2",
    "intro": "This advanced English paper for Class 12 encompasses higher-order thinking skills, sophisticated literary analysis, and professional communication. It prepares students for university-level English studies. This set is longer than the board paper: 100 marks against the 80-mark CBSE pattern, so treat it as extended practice rather than a timed board rehearsal.",
    "duration": "3 hours 45 minutes",
    "totalMarks": 100,
    "sections": [
      {
        "name": "Section A: Advanced Reading Comprehension",
        "marks": 25,
        "instructions": "Read and analyze complex passages with critical evaluation.",
        "questions": [
          {
            "q": "Critically evaluate the authors stance on artificial intelligence and its societal implications.",
            "marks": 10,
            "answer": "The author presents AI as a transformative tool requiring ethical guardrails. The evaluation should recognize the authors balanced view acknowledging both benefits and risks, while assessing the strength of arguments presented and identifying potential counter-arguments."
          },
          {
            "q": "How does the structure of the passage reinforce its argument?",
            "marks": 10,
            "answer": "The passage begins with concrete examples, moves to theoretical frameworks, and concludes with practical recommendations. This structure builds credibility through specificity before broadening to generalizations."
          },
          {
            "q": "Analyze the tone and its effectiveness in communicating the message.",
            "marks": 5,
            "answer": "The author adopts an academic yet accessible tone that builds trust. The conversational style makes complex ideas understandable without compromising rigor."
          }
        ],
        "passage": "Begin with what is already happening. A radiologist in Chennai reviews scans alongside a model that flags anomalies she might overlook at the end of a long shift. A bank intercepts a fraudulent transaction in the moment between a card being swiped and the payment clearing. A farmer receives a sowing date calculated from satellite imagery and thirty years of local rainfall. None of this is speculative; all of it is in use today.\n\nFrom these examples a general principle emerges. Artificial intelligence is best understood not as an intelligence at all but as an instrument of pattern recognition operating at a scale no human institution can match. Its power and its danger have the same source. A system that finds patterns in historical data will faithfully reproduce the injustices recorded in that data, and will present them with the unearned authority of arithmetic. Where a human prejudice can be argued with, an algorithmic one is frequently invisible.\n\nWhat follows is practical rather than alarmed. AI is a transformative tool that requires ethical guardrails, and those guardrails are specific and buildable: auditable training data, a named human accountable for every automated decision affecting a person's livelihood, and a legal right to an explanation. Societies that build these now will keep the benefits. Those that wait will find the systems already load-bearing and far harder to correct."
      },
      {
        "name": "Section B: Advanced Writing Skills",
        "marks": 30,
        "instructions": "Demonstrate sophisticated writing in various formats.",
        "questions": [
          {
            "q": "Write a comprehensive essay: The Role of Technology in Bridging or Widening Social Inequalities (500-600 words).",
            "marks": 15,
            "answer": "A strong response would present technology as a dual-edged tool: it enables access to information and opportunities but requires equitable distribution and digital literacy. The essay should discuss internet access gaps, algorithmic bias, and the digital divide while proposing solutions."
          },
          {
            "q": "Draft a professional resignation letter expressing your intention to pursue further studies (150-200 words).",
            "marks": 15,
            "answer": "Dear [Manager], I hereby resign from my position as [designation] effective [date]. I have decided to pursue further studies in [field] to advance my career. Thank you for the opportunities and learning provided. I am willing to ensure a smooth transition. Yours sincerely, [Name]"
          }
        ]
      },
      {
        "name": "Section C: Advanced Grammar and Lexicon",
        "marks": 20,
        "instructions": "Demonstrate mastery of grammar and sophisticated vocabulary usage.",
        "questions": [
          {
            "q": "Identify syntactic complexity issues and rewrite for clarity: Despite the government implementing policies to address climate change over the years and considering the substantial investments made, concerns regarding their effectiveness persist.",
            "marks": 5,
            "answer": "Although the government has implemented climate policies and invested substantially, their effectiveness remains questionable. Or: Despite substantial government investments in climate policies, their effectiveness is disputed."
          },
          {
            "q": "Use advanced vocabulary in context: Write sentences using propitious, obfuscate, and ameliorate correctly.",
            "marks": 5,
            "answer": "The propitious economic conditions enabled business expansion. The documentation attempted to obfuscate the financial irregularities. Environmental reforms aim to ameliorate pollution levels."
          },
          {
            "q": "Convert the following into indirect speech with appropriate tense adjustments: She asked, Have you completed the report, or will you finish it by tomorrow?",
            "marks": 5,
            "answer": "She asked whether I had completed the report or would finish it by the following day."
          },
          {
            "q": "Analyze the use of parallelism in this sentence and explain its effect: To analyze effectively, to synthesize thoughtfully, and to evaluate critically are essential skills.",
            "marks": 5,
            "answer": "The parallel structure uses three infinitive phrases in succession, creating rhythm and emphasizing equal importance of all three skills. This device enhances readability and persuasiveness."
          }
        ]
      },
      {
        "name": "Section D: Literary Critique and Analysis",
        "marks": 25,
        "instructions": "Demonstrate deep literary understanding and critical analysis.",
        "questions": [
          {
            "q": "Compare the narrative techniques of two novels you have studied, discussing how they serve thematic purposes.",
            "marks": 10,
            "answer": "Novel A uses first-person narrative creating intimate access to the protagonists psychology, reinforcing themes of self-discovery. Novel B employs third-person omniscient narration allowing broader perspective on societal impact, supporting its theme of individual versus society."
          },
          {
            "q": "Analyse the use of symbolism in a poem you have studied to discuss its deeper meanings.",
            "marks": 10,
            "answer": "Symbols such as light represent hope, darkness represents despair or ignorance, and journeys represent life paths. These recurring symbols create thematic cohesion and invite multiple interpretations."
          },
          {
            "q": "Evaluate how contemporary adaptations of classic texts maintain or transform their original themes.",
            "marks": 5,
            "answer": "Modern adaptations often contextualize classic themes in contemporary settings, making them relevant to current audiences while preserving core moral questions and character conflicts that remain universally applicable."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What level of literary analysis is expected in Class 12?",
        "a": "Class 12 expects sophisticated analysis including thematic interpretation, critical evaluation of authorial choices, and connections to broader social and cultural contexts."
      },
      {
        "q": "How should I approach unseen passages?",
        "a": "Read the passage multiple times, identify the main idea, tone, and purpose, then answer analytical questions supported by textual evidence rather than general knowledge."
      },
      {
        "q": "Are personal interpretations acceptable in literature questions?",
        "a": "Yes, but they must be supported by textual evidence and demonstrate understanding of literary devices and context. Vague opinions without textual support are not valued."
      }
    ]
  },
  {
    "slug": "class-10-hindi-set-2",
    "classLevel": "Class 10",
    "subject": "Hindi",
    "board": "CBSE",
    "title": "Class 10 Hindi Sample Paper Set 2",
    "intro": "This Hindi sample paper tests reading comprehension, grammar, writing, and literature comprehension. It follows CBSE Class 10 curriculum emphasizing practical communication skills and literary appreciation.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Padhna evam Samjhna (Reading Comprehension)",
        "marks": 20,
        "instructions": "Diye gaye gadyaansh ko padhkar prashon ke uttar dijiye.",
        "questions": [
          {
            "q": "Lekhak ke anusar samaj mein shiksha ka kya mahatva hai?",
            "marks": 5,
            "answer": "Lekhak ke anusar shiksha samuday ke vikas ke liye anivary hai. Yah manushya ko sathaak soch vidhi sikhati hai aur unhe samasya samadhan mein saham dene ke layak banati hai."
          },
          {
            "q": "Paryavarani suraksha mein vyaktigat dayan kya hona chahiye? Gadyaansh se saposhan lijiye.",
            "marks": 5,
            "answer": "Prayavarani suraksha mein har vyakti ko apna yogdan dena chahiye. Gadyaansh se lagta hai ki alag-alag karya jaise ped lagana, pradushan kam karna, aur jala sanrakshan vyaktigat daayitva hain."
          },
          {
            "q": "Gadyaansh ke main uddeshya kya hain?",
            "marks": 5,
            "answer": "Main uddeshya log ko samajdari se sochne aur apni dayitva samjhne ke liye pravrit karna hai. Lekhak chahta hai ki logo mein soshik soch samvigyan sampdaye."
          },
          {
            "q": "Lekhak ne kaunsa udaharan diya hai?",
            "marks": 5,
            "answer": "Lekhak ne chote karyon jaise kapde dusre layak bananaa, khana noi samagri mein badlana, aur pani bacana ka udaharan diya hai."
          }
        ]
      },
      {
        "name": "Section B: Vyakaran aur Bhasha Kaushal",
        "marks": 20,
        "instructions": "Vyakaran ke niyamon ko prayog karke sadhya kariye.",
        "questions": [
          {
            "q": "Khaali sthanon ko uchit sandarbhon se bhrijiye: Ravi ___ khel raha tha. (ho, hai, tha)",
            "marks": 5,
            "answer": "Ravi khel raha tha."
          },
          {
            "q": "Vakya mein shuddhi kijiye: Usne ghar mein ek chitrakari banaya.",
            "marks": 5,
            "answer": "Usne ghar mein ek chitrakari banani hai. Ya: Usne ghar mein chitrakari ki."
          },
          {
            "q": "Vilom shabd likijiye: Sukh, Drishya, Satya",
            "marks": 5,
            "answer": "Sukh - Dukh, Drishya - Adrishya, Satya - Asatya"
          },
          {
            "q": "Samanarthi shabd likijiye: Ped, Nadi, Akaash",
            "marks": 5,
            "answer": "Ped - Vriksh, Chhya Nadi - Jal Prasav, Akaash - Akash, Aasman"
          }
        ]
      },
      {
        "name": "Section C: Lekhan Kaushal",
        "marks": 20,
        "instructions": "Diye gaye vishay par sunder aur satik lekhan kijiye.",
        "questions": [
          {
            "q": "Apne vidyalay ke Mukhyadhyapak ko patra likhiye jisme vidyalay ke sadhan sudharn hetu anurodh kijiye (150-200 shabd).",
            "marks": 10,
            "answer": "Sammannit Mukhyadhyapak Mahodaya, Vinamrata poorvak prarthna karta hoon ki vidyalay ke adhyayan kendri ko sudhar diya jaye. Pustakon ki sangkhya kam hai aur padhai sadhan apayapt hain. Yadi sadhan barhaye jaye to vidyarthi behtar sikshn pa sakte hain. Aapki kripa paathrin rahegi. Saadar, [Naam]"
          },
          {
            "q": "Vishay: Sansthan Diwas pe ek anuchchhed likhiye (150-200 shabd).",
            "marks": 10,
            "answer": "Sansthan Divas sampoorn desh mein manate hain. Yah din hindustan ke svatantrata ke liye ladne wale mahapurushon ki yaad mein manaya jata hai. Is din log tiranga sjaate hain aur rashtragan gete hain. School aur karyalayon mein sammonlan aayojit hote hain. Yah divas humhe rashtra prem aur ek-dusre ke prati samman sikhata hai. Har vandevi ko chanhiye ki vah apne rashtra ke vikas mein saham de."
          }
        ]
      },
      {
        "name": "Section D: Sahitya Bodh",
        "marks": 20,
        "instructions": "Nidhaarit kaavy aur gadya par prashon ke uttar dijiye.",
        "questions": [
          {
            "q": "Nirdharit kavya ka mukhya bhav kya hai? Kavyak mein iska kaise upyog huwa hai?",
            "marks": 10,
            "answer": "Kavya ka mukhya bhav ishvar ke prati bhakti aur samuday ke prati prem hai. Kavy mein iska prayog ankayn ke maadyam se, prrtikon ke maadyam se, aur chhandi bhasha ke maadyam se huwa hai."
          },
          {
            "q": "Gadya ke khandiyon mein se kaunsa khand sabse prabhavanshali hai aur kyon?",
            "marks": 10,
            "answer": "Patra likhan ka section sabse prabhavanshali hai kyuki ismein pratyek par alag-alag manno ki samajh, samvedanshilta, aur bhasha ke niymon ka prayog dikha. Ishmein manav samvednashilta samj padi hai."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Kya Grammar question mein Hindi likhna anivary hai?",
        "a": "Haan, Hindi prashnapatri mein kam se kam 90% Hindi mein likha jana chahiye aur shuddh Hindi ka prayog zaroori hai."
      },
      {
        "q": "Sahitya ke prashan ke uttar kaun sa likhun?",
        "a": "Sahitya ke prashno mein tatva vishleshan hona chahiye. Sirf gadya sunana kaafi nahi; patra se saakshy de kar uttar dijiye."
      },
      {
        "q": "Lekhan mein kitne shabd hone chahiye?",
        "a": "Patra mein 150-200 shabd, Anuchchhed mein 150-200 shabd, Nibandh mein 200-250 shabd hone chahiye."
      }
    ]
  },
  {
    "slug": "class-9-english-set-2",
    "classLevel": "Class 9",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 9 English Sample Paper Set 2",
    "intro": "This Class 9 English sample paper bridges foundational and advanced skills, emphasizing comprehension, expression, grammar mastery, and appreciation of literature through diverse texts.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Reading Skills",
        "marks": 20,
        "instructions": "Read the passage carefully and answer the questions.",
        "questions": [
          {
            "q": "What does the author suggest about the relationship between technology and human creativity?",
            "marks": 5,
            "answer": "The author suggests that technology enhances rather than replaces human creativity. Technology provides tools that enable humans to express creative ideas more effectively and reach wider audiences."
          },
          {
            "q": "Identify and explain the main idea of the second paragraph.",
            "marks": 5,
            "answer": "The main idea is that successful innovations require both technological capability and human imagination. The paragraph emphasizes that technology alone cannot create meaningful products without creative input."
          },
          {
            "q": "What evidence does the author provide to support the claim?",
            "marks": 5,
            "answer": "The author provides examples of successful tech companies and creative professionals, showing how collaboration between technology and creativity has produced transformative products."
          },
          {
            "q": "How would you describe the authors tone throughout the passage?",
            "marks": 5,
            "answer": "The tone is optimistic and encouraging, suggesting that technology and creativity are complementary forces that together can solve problems and improve human life."
          }
        ],
        "passage": "There is an old fear that machines will one day make human imagination unnecessary. Watch a designer work with modern software, however, and the opposite seems true. The tools have not replaced her judgement; they have removed the drudgery that used to consume her afternoons, leaving her free to spend that time on the part only she can do — deciding what is worth making in the first place. Technology, in other words, enhances human creativity rather than replacing it.\n\nThis is why the innovations that succeed are almost never purely technical achievements. A breakthrough needs two things at once: the technological capability to build it, and the human imagination to see why anyone would want it. Capability without imagination produces clever products nobody uses. Imagination without capability produces beautiful ideas that never leave the notebook. Real innovation lives where the two meet.\n\nThe evidence is easy to find. The technology companies that endure are the ones that pair engineering strength with designers, writers and researchers who ask what people actually need. Equally, the creative professionals whose work reaches the widest audiences — film-makers, musicians, illustrators — are usually the ones who learned the new tools early and bent them to their own purposes rather than waiting to be told what the tools were for.\n\nThere is every reason to be optimistic. Technology and creativity are not rivals competing for the same ground; they are complementary forces, and the problems worth solving in the coming decades will need both of them working together."
      },
      {
        "name": "Section B: Writing Abilities",
        "marks": 20,
        "instructions": "Write clear, well-structured essays and letters.",
        "questions": [
          {
            "q": "Write a letter to your friend describing your recent school trip (150-200 words).",
            "marks": 10,
            "answer": "Dear [Friend], I had an amazing time on our recent school trip to [place]. We visited historical monuments and learned so much about our heritage. The guide was knowledgeable and made the experience interesting. I took many photographs and enjoyed group activities. The food was good and the accommodation comfortable. I wish you had been with us. Lets plan another trip soon. Your friend, [Name]"
          },
          {
            "q": "Write an essay on Environmental Conservation is Everyones Responsibility (200-250 words).",
            "marks": 10,
            "answer": "Environmental conservation is not the responsibility of governments alone but of every individual. We use natural resources daily and should ensure sustainable use. Simple actions like reducing plastic, planting trees, conserving water, and segregating waste contribute significantly. Schools and families must teach younger generations about environmental care. Industries must adopt eco-friendly practices. Together, collective efforts can address climate change and preserve biodiversity. Environmental conservation ensures a healthy future for our children."
          }
        ]
      },
      {
        "name": "Section C: Grammar and Vocabulary",
        "marks": 20,
        "instructions": "Test grammar rules and word knowledge.",
        "questions": [
          {
            "q": "Fill in the blanks with correct articles: ___ United Nations is ___ international organization working for peace.",
            "marks": 5,
            "answer": "The; an"
          },
          {
            "q": "Rewrite in passive voice: The teacher gave the students an assignment.",
            "marks": 5,
            "answer": "The students were given an assignment by the teacher."
          },
          {
            "q": "Use these words in sentences: persist, facilitate, resilience",
            "marks": 5,
            "answer": "Despite challenges, she continued to persist. Technology helps to facilitate communication. Resilience helped him overcome difficulties."
          },
          {
            "q": "Identify and correct the error: Neither of the students are here today.",
            "marks": 5,
            "answer": "Neither of the students is here today. (Neither takes singular verb)"
          }
        ]
      },
      {
        "name": "Section D: Literature and Comprehension",
        "marks": 20,
        "instructions": "Answer questions on prescribed texts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Discuss the character of the protagonist and explain his/her motivations.",
            "marks": 10,
            "answer": "The protagonist is driven by personal ambition initially but undergoes transformation through experiences and relationships. Key motivations include desire for success, family loyalty, and eventually, personal integrity."
          },
          {
            "q": "Analyse the theme of a novel you have studied and show how it is developed.",
            "marks": 10,
            "answer": "The theme of resilience is developed through the protagonists journey facing repeated setbacks yet continuing to strive. The author uses conflicts, character interactions, and symbolic events to reinforce this central theme throughout the narrative."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the passing score for this paper?",
        "a": "Typically students need to score around 33-40% to pass the CBSE Class 9 English examination, though striving for higher marks is always encouraged."
      },
      {
        "q": "How should I manage time during the exam?",
        "a": "Allocate roughly 50 minutes to reading comprehension and writing, 40 minutes to grammar and vocabulary, and 30 minutes to literature. Keep 10 minutes for review."
      },
      {
        "q": "What are the most important sections to prepare?",
        "a": "Reading comprehension and writing carry the most marks, so practice these extensively. However, strong grammar and literature knowledge are essential for scoring well across all sections."
      }
    ]
  },
  {
    "slug": "class-12-computer-science-set-2",
    "classLevel": "Class 12",
    "subject": "Computer Science",
    "board": "CBSE",
    "title": "Class 12 Computer Science Sample Paper Set 2",
    "intro": "This advanced computer science paper covers programming, data structures, database management, and networking. It evaluates practical coding skills and conceptual understanding required for IT careers.",
    "duration": "3 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A: Programming and Data Structures",
        "marks": 25,
        "instructions": "Answer programming questions with code snippets and explanations.",
        "questions": [
          {
            "q": "Write a Python function to check if a number is prime and test it with at least two examples.",
            "marks": 5,
            "answer": "def is_prime(n): if n < 2: return False; for i in range(2, int(n**0.5) + 1): if n % i == 0: return False; return True. Test: is_prime(17) returns True, is_prime(10) returns False."
          },
          {
            "q": "Explain stack and queue data structures. Give real-world applications of each.",
            "marks": 5,
            "answer": "Stack: LIFO (Last In First Out). Applications: undo operations in text editors, function call stack. Queue: FIFO (First In First Out). Applications: printer queue, customer service lines, breadth-first search."
          },
          {
            "q": "What is recursion? Write a recursive function to calculate factorial.",
            "marks": 5,
            "answer": "Recursion is when a function calls itself. def factorial(n): if n <= 1: return 1; return n * factorial(n-1). Example: factorial(5) = 120."
          },
          {
            "q": "Explain the difference between arrays and linked lists with advantages and disadvantages.",
            "marks": 5,
            "answer": "Arrays: contiguous memory, fast access O(1), slow insertion/deletion. Linked lists: non-contiguous memory, slow access O(n), fast insertion/deletion. Choice depends on use case."
          },
          {
            "q": "What is sorting? Name two sorting algorithms and compare their time complexities.",
            "marks": 5,
            "answer": "Sorting arranges data in order. Bubble sort: O(n^2) simple, inefficient for large data. Quick sort: O(n log n) average case, very efficient. Merge sort: O(n log n) guaranteed, requires extra space."
          }
        ]
      },
      {
        "name": "Section B: Database Management and SQL",
        "marks": 20,
        "instructions": "Write SQL queries and explain database concepts.",
        "questions": [
          {
            "q": "Create a table for Students with fields: RollNo (primary key), Name, Class, Percentage.",
            "marks": 5,
            "answer": "CREATE TABLE Students (RollNo INT PRIMARY KEY, Name VARCHAR(50), Class VARCHAR(5), Percentage FLOAT);"
          },
          {
            "q": "Write a query to find students with percentage greater than 75, sorted by percentage descending.",
            "marks": 5,
            "answer": "SELECT * FROM Students WHERE Percentage > 75 ORDER BY Percentage DESC;"
          },
          {
            "q": "Explain normalization and why it is important in database design.",
            "marks": 5,
            "answer": "Normalization removes redundancy and organizes data into related tables following normal forms (1NF, 2NF, 3NF). It improves data integrity, reduces storage, and makes updates efficient."
          },
          {
            "q": "What are constraints in SQL? Explain PRIMARY KEY, UNIQUE, and FOREIGN KEY.",
            "marks": 5,
            "answer": "Constraints enforce data integrity. PRIMARY KEY uniquely identifies records and cannot be null. UNIQUE ensures no duplicate values. FOREIGN KEY creates relationships between tables by referencing another tables primary key."
          }
        ]
      },
      {
        "name": "Section C: Networking and Cybersecurity",
        "marks": 15,
        "instructions": "Answer questions on computer networks and security.",
        "questions": [
          {
            "q": "What is the OSI model? List all seven layers.",
            "marks": 5,
            "answer": "OSI is a framework for network communication. Layers: 1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application."
          },
          {
            "q": "Explain TCP/IP and how it differs from OSI model.",
            "marks": 5,
            "answer": "TCP/IP is a practical model with 4 layers: Link, Internet, Transport, Application. It is simpler than OSI, combines some layers, and is the actual model used on the internet."
          },
          {
            "q": "What are common cybersecurity threats and how can they be prevented?",
            "marks": 5,
            "answer": "Threats: malware, phishing, ransomware. Prevention: use firewalls, antivirus software, strong passwords, regular updates, two-factor authentication, and awareness training."
          }
        ]
      },
      {
        "name": "Section D: Emerging Technologies and Ethics",
        "marks": 10,
        "instructions": "Discuss modern technologies and ethical implications.",
        "questions": [
          {
            "q": "What is artificial intelligence? List three applications and discuss one ethical concern.",
            "marks": 5,
            "answer": "AI simulates human intelligence. Applications: face recognition, recommendation systems, autonomous vehicles. Ethical concern: bias in algorithms leading to discrimination against minorities."
          },
          {
            "q": "Discuss the role of cloud computing in modern IT infrastructure.",
            "marks": 5,
            "answer": "Cloud computing provides on-demand computing resources over internet. Benefits: scalability, cost-efficiency, accessibility. Concerns: data security, vendor lock-in, privacy issues."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is practical coding experience necessary for this exam?",
        "a": "Yes, strong practical coding skills are essential. Practice writing and debugging code regularly using Python or C++."
      },
      {
        "q": "How much weight is given to theory vs practical?",
        "a": "Approximately 60-70% is practical (coding, SQL queries) and 30-40% is theory (concepts, algorithms, security)."
      },
      {
        "q": "Should I prepare all programming languages mentioned in curriculum?",
        "a": "Focus deeply on one language (Python recommended) and understand fundamental concepts. Knowledge of SQL for databases is mandatory."
      }
    ]
  },
  {
    "slug": "class-11-economics-set-2",
    "classLevel": "Class 11",
    "subject": "Economics",
    "board": "CBSE",
    "title": "Class 11 Economics Sample Paper Set 2",
    "intro": "This economics sample paper covers microeconomics, macroeconomics, and Indian economy topics. It tests understanding of economic principles and their real-world applications.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Microeconomics",
        "marks": 25,
        "instructions": "Answer questions on individual economic units and market behavior.",
        "questions": [
          {
            "q": "Explain the law of demand and explain its exceptions.",
            "marks": 5,
            "answer": "Law of demand: inverse relationship between price and quantity demanded. Exceptions: Giffen goods (inferior goods where price increase increases demand), Veblen goods (prestige goods), and goods with speculative demand."
          },
          {
            "q": "What is elasticity of demand? Calculate price elasticity if price increases by 10% and quantity demanded falls by 20%.",
            "marks": 5,
            "answer": "Elasticity measures responsiveness of quantity to price changes. Price elasticity = % change in quantity / % change in price = -20% / 10% = -2. Demand is elastic."
          },
          {
            "q": "Explain perfect competition and list its characteristics.",
            "marks": 5,
            "answer": "Perfect competition has many buyers and sellers, homogeneous products, free entry/exit, perfect information, and no barriers. Firms are price takers, producing where P = MR = MC."
          },
          {
            "q": "What is monopoly? Explain how it differs from perfect competition.",
            "marks": 5,
            "answer": "Monopoly has one seller with significant market power. Unlike perfect competition, monopolists face downward-sloping demand, set prices, have barriers to entry, and earn economic profits."
          },
          {
            "q": "Define and calculate break-even point in production.",
            "marks": 5,
            "answer": "Break-even is where Total Revenue = Total Cost, profit = 0. Formula: BEP = Fixed Costs / (Price - Variable Cost per unit). Produces minimum output to avoid losses."
          }
        ]
      },
      {
        "name": "Section B: Macroeconomics",
        "marks": 25,
        "instructions": "Answer questions on economy-wide issues and policies.",
        "questions": [
          {
            "q": "What is GDP and how is it calculated? Explain nominal vs real GDP.",
            "marks": 5,
            "answer": "GDP is total value of goods and services produced. Calculated by expenditure method: C + I + G + (X-M). Nominal GDP uses current prices; real GDP adjusts for inflation, showing actual growth."
          },
          {
            "q": "Explain inflation and its causes. What are the effects of inflation?",
            "marks": 5,
            "answer": "Inflation is sustained increase in price levels. Causes: demand-pull inflation, cost-push inflation. Effects: reduced purchasing power, uncertainty in investment, eroded savings."
          },
          {
            "q": "What is unemployment? Explain types of unemployment.",
            "marks": 5,
            "answer": "Unemployment is when people are willing and able to work but lack jobs. Types: frictional (job transitions), structural (skills mismatch), cyclical (recession-related), seasonal."
          },
          {
            "q": "Describe monetary policy and tools used by central banks.",
            "marks": 5,
            "answer": "Monetary policy manages money supply to achieve price stability and growth. Tools: open market operations, reserve requirement changes, discount rate adjustments. RBI is Indias central bank."
          },
          {
            "q": "What is fiscal policy and how does it differ from monetary policy?",
            "marks": 5,
            "answer": "Fiscal policy uses government spending and taxes. Monetary policy controls money supply. Fiscal is discretionary but slow; monetary is flexible. Both aim for macroeconomic stability."
          }
        ]
      },
      {
        "name": "Section C: Indian Economy",
        "marks": 30,
        "instructions": "Answer questions on Indian economic structure and development.",
        "questions": [
          {
            "q": "Describe the structure of Indian economy by sectors. What is the distribution of workforce?",
            "marks": 5,
            "answer": "Primary sector (agriculture) contributes ~15% GDP but employs 40% workforce. Secondary (manufacturing) ~25% GDP, ~25% workforce. Tertiary (services) ~60% GDP, ~35% workforce."
          },
          {
            "q": "What is economic liberalization? How has it affected India since 1991?",
            "marks": 5,
            "answer": "Liberalization reduced government control, opened economy to foreign investment, and removed trade barriers. Results: increased FDI, rapid growth averaging ~7%, increased global integration, but also rising inequality."
          },
          {
            "q": "Explain the role of agriculture in Indian economy and challenges it faces.",
            "marks": 5,
            "answer": "Agriculture employs 40% population, contributes 15% GDP, provides raw materials. Challenges: land fragmentation, poor irrigation, dependence on monsoons, low productivity, farmer debt."
          },
          {
            "q": "What is the Make in India initiative? What are its objectives?",
            "marks": 5,
            "answer": "Make in India promotes manufacturing and attracts foreign investment. Objectives: create jobs, increase manufacturing sector contribution, develop infrastructure, boost exports, technology transfer."
          },
          {
            "q": "Discuss Indias fiscal policy in recent years. What is the debt-to-GDP ratio concern?",
            "marks": 5,
            "answer": "India maintains moderate fiscal deficit. Government spending on infrastructure and welfare increases debt. High debt-to-GDP ratio limits future spending, raises interest payments, affects macroeconomic stability."
          },
          {
            "q": "What are external sector issues facing India? Explain current account deficit.",
            "marks": 5,
            "answer": "Current account deficit occurs when imports exceed exports. Causes: oil price spikes, demand for foreign goods. Problems: foreign reserves depletion, currency depreciation, balance of payments crisis. Solutions: export promotion, import substitution."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How important is mathematical calculation in economics?",
        "a": "Approximately 40% of questions involve calculations like elasticity, GDP, break-even analysis. Practice numerical problems regularly."
      },
      {
        "q": "Should I memorize formulas?",
        "a": "Understand derivations rather than memorizing. If you understand concepts, deriving formulas is easier and shows deeper knowledge."
      },
      {
        "q": "How much focus on Indian economy is needed?",
        "a": "About 30-40% of the paper focuses on Indian economy. Study current economic issues, government policies, and structural changes."
      }
    ]
  },
  {
    "slug": "class-7-science",
    "classLevel": "Class 7",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 7 Science Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers all major topics in Class 7 Science including nutrition, respiration, transportation, and physical phenomena. Practice this paper to strengthen your understanding of foundational science concepts. This is a shortened practice set: 23 questions worth 45 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "100 minutes",
    "totalMarks": 45,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 10,
        "instructions": "Answer all 20 multiple choice questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "Photosynthesis occurs in which part of the plant cell?",
            "marks": 1,
            "answer": "Chloroplast"
          },
          {
            "q": "The process by which plants release oxygen is",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "Which gas is released during respiration?",
            "marks": 1,
            "answer": "Carbon dioxide"
          },
          {
            "q": "The main component of blood that fights infections is",
            "marks": 1,
            "answer": "White blood cells"
          },
          {
            "q": "Which organ pumps blood throughout the body?",
            "marks": 1,
            "answer": "Heart"
          },
          {
            "q": "The speed of sound in air is approximately",
            "marks": 1,
            "answer": "340 m/s"
          },
          {
            "q": "Which of the following is a scalar quantity?",
            "marks": 1,
            "answer": "Speed"
          },
          {
            "q": "Simple machines include all except",
            "marks": 1,
            "answer": "Computer"
          },
          {
            "q": "The SI unit of force is",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Which metal is liquid at room temperature?",
            "marks": 1,
            "answer": "Mercury"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 16,
        "instructions": "Answer all 8 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Define nutrition. Name two types of nutrition.",
            "marks": 2,
            "answer": "Nutrition is the intake and utilization of nutrients. Types: Autotrophic (plants) and Heterotrophic (animals)."
          },
          {
            "q": "What is the difference between aerobic and anaerobic respiration?",
            "marks": 2,
            "answer": "Aerobic respiration uses oxygen; anaerobic respiration occurs without oxygen."
          },
          {
            "q": "Describe the pathway of blood circulation in the body.",
            "marks": 2,
            "answer": "Heart -> Arteries -> Capillaries -> Veins -> Heart. Arteries carry oxygenated blood; veins carry deoxygenated blood."
          },
          {
            "q": "What are the functions of the skeleton?",
            "marks": 2,
            "answer": "Support, protection of organs, movement, and mineral storage."
          },
          {
            "q": "How do sound waves travel through different media?",
            "marks": 2,
            "answer": "Sound travels as longitudinal waves through solids, liquids, and gases. Speed varies in different media."
          },
          {
            "q": "Define velocity and give an example with direction.",
            "marks": 2,
            "answer": "Velocity is speed in a given direction. Example: 60 km/h towards north."
          },
          {
            "q": "What is friction? How does it affect motion?",
            "marks": 2,
            "answer": "Friction is a force opposing motion. It slows down moving objects and prevents motion."
          },
          {
            "q": "Define work and give its SI unit.",
            "marks": 2,
            "answer": "Work is force multiplied by displacement. SI unit: Joule (J)."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 9,
        "instructions": "Answer all 3 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain the process of photosynthesis with a chemical equation.",
            "marks": 3,
            "answer": "Photosynthesis uses sunlight, water, and carbon dioxide to produce glucose and oxygen. 6CO2 + 6H2O + light -> C6H12O6 + 6O2"
          },
          {
            "q": "Describe the human digestive system and the role of different organs.",
            "marks": 3,
            "answer": "Mouth breaks down food mechanically; stomach chemically; small intestine absorbs nutrients; large intestine absorbs water."
          },
          {
            "q": "What are renewable and non-renewable resources? Give examples of each.",
            "marks": 3,
            "answer": "Renewable: can be regenerated (solar, wind, water). Non-renewable: limited supply (coal, oil, natural gas)."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 10,
        "instructions": "Answer all questions; each carrying 5 marks. Answer 2 out of 3 questions.",
        "questions": [
          {
            "q": "Draw and label a diagram of plant and animal cells. Explain the differences.",
            "marks": 5,
            "answer": "Plant cells have cell wall, large vacuole, chloroplasts. Animal cells lack these. Both have nucleus, mitochondria, ribosomes."
          },
          {
            "q": "Explain Newton's laws of motion with practical examples.",
            "marks": 5,
            "answer": "1st: Objects remain at rest unless acted upon. 2nd: F=ma. 3rd: Action-reaction pairs. Example: Pushing a book accelerates it."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How is Class 7 Science different from Class 6 Science?",
        "a": "Class 7 introduces more complex topics like photosynthesis, respiration, the circulatory system, and basic physics concepts."
      },
      {
        "q": "What is the total marks for Class 7 Science exam?",
        "a": "The total marks is 80, with 20 marks for internal assessment based on practicals and projects."
      },
      {
        "q": "Are diagrams important in the Class 7 Science exam?",
        "a": "Yes, diagrams are very important. Label them clearly with proper terminology to score full marks."
      }
    ]
  },
  {
    "slug": "class-7-english",
    "classLevel": "Class 7",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 7 English Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive English sample paper includes reading comprehension, grammar, writing, and literature sections. Master this paper to excel in all aspects of English language and literature. This is a shortened practice set: 17 questions worth 58 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "2 hours 15 minutes",
    "totalMarks": 58,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 10,
        "instructions": "Read the passage and Answer all 5 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "What is the main idea of the passage about sustainable living?",
            "marks": 2,
            "answer": "The passage discusses how individuals can reduce their carbon footprint through simple daily habits like using renewable energy and reducing waste."
          },
          {
            "q": "Why did the author mention solar panels in the passage?",
            "marks": 2,
            "answer": "Solar panels are mentioned as an example of renewable energy that reduces dependence on fossil fuels."
          },
          {
            "q": "What does 'sustainable' mean in this context?",
            "marks": 2,
            "answer": "Sustainable means living in a way that doesn't deplete natural resources and can continue indefinitely."
          },
          {
            "q": "How can individuals contribute to environmental protection?",
            "marks": 2,
            "answer": "By recycling, using renewable energy, conserving water, and reducing consumption of single-use plastics."
          },
          {
            "q": "What is the tone of the passage?",
            "marks": 2,
            "answer": "The tone is informative and encouraging, motivating readers to adopt sustainable practices."
          }
        ],
        "passage": "Every choice we make at home leaves a mark on the planet. Scientists call the total effect of those choices our carbon footprint — the amount of greenhouse gas released because of the way we travel, eat, shop and use electricity. The encouraging news is that this footprint is not fixed. It shrinks the moment we begin living sustainably.\n\nTo live sustainably means to live in a way that does not use up natural resources faster than the earth can replace them — a way of living that could continue indefinitely without harming future generations. It does not demand dramatic sacrifice. It asks for steady, ordinary habits.\n\nConsider the rooftops of many Indian homes today. Solar panels installed there turn free sunlight into electricity, and every unit generated is a unit that did not have to be burned from coal or diesel. Solar power is a clear example of renewable energy — energy drawn from a source that refills itself — and the more we use it, the less we depend on fossil fuels.\n\nThere is a great deal an individual can do. Segregate waste and recycle paper, glass and metal. Switch to renewable energy where you can. Close the tap while brushing and repair leaking pipes to conserve water. Refuse single-use plastic bags, bottles and straws, and carry a cloth bag instead. None of these acts is difficult, and none of them is too small to matter.\n\nIf a hundred people in a colony make these changes, the saving is no longer small. That is the quiet power of sustainable living: it begins with one household and spreads."
      },
      {
        "name": "Section B - Grammar and Vocabulary",
        "marks": 12,
        "instructions": "Answer all 6 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "Fill in the blank: She ___ her homework yesterday. (did/does/will do)",
            "marks": 2,
            "answer": "did"
          },
          {
            "q": "Correct the sentence: He have gone to the market.",
            "marks": 2,
            "answer": "He has gone to the market."
          },
          {
            "q": "Choose the synonym of 'bright': (intelligent, dull, dark)",
            "marks": 2,
            "answer": "intelligent"
          },
          {
            "q": "Identify the part of speech of 'quickly' in: He ran quickly.",
            "marks": 2,
            "answer": "Adverb"
          },
          {
            "q": "Convert to passive voice: The gardener planted trees.",
            "marks": 2,
            "answer": "Trees were planted by the gardener."
          },
          {
            "q": "Identify the tense: They are playing cricket.",
            "marks": 2,
            "answer": "Present Continuous Tense"
          }
        ]
      },
      {
        "name": "Section C - Writing Skills",
        "marks": 18,
        "instructions": "Answer all 3 questions. Each question carries 6 marks.",
        "questions": [
          {
            "q": "Write a paragraph (100-120 words) on the importance of education.",
            "marks": 6,
            "answer": "Education is fundamental for personal growth and societal development. It provides knowledge, skills, and values necessary for success in life. Education empowers individuals to make informed decisions and contribute meaningfully to society. It opens doors to career opportunities and improves quality of life. Moreover, education fosters critical thinking and creativity. Investment in education is an investment in the future of individuals and nations alike."
          },
          {
            "q": "Write a letter to your principal requesting permission for a educational field trip.",
            "marks": 6,
            "answer": "Dear Principal Sir/Madam, I am writing to request permission for a class field trip to the Science Museum scheduled for next month. This visit will enhance our understanding of practical scientific concepts covered in our curriculum. The trip has been planned for educational benefit and will include activities supervised by our teachers. We request your approval and support for this valuable learning experience. Thanking you, [Student Name]"
          },
          {
            "q": "Describe your favorite book in 100 words.",
            "marks": 6,
            "answer": "My favorite book is 'Harry Potter and the Philosopher's Stone'. It is an engaging fantasy novel that transports readers into a magical world. The protagonist, Harry Potter, discovers his true identity as a wizard and embarks on adventures at Hogwarts School. The story combines mystery, friendship, and courage. J.K. Rowling's vivid imagination and character development make it compelling. The book teaches valuable lessons about bravery, loyalty, and good triumphing over evil. It has captivated millions of readers worldwide."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 18,
        "instructions": "Answer all 3 questions based on the prescribed texts. Each question carries 6 marks. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Describe the character of the protagonist in a story you have studied. What are his/her key qualities?",
            "marks": 6,
            "answer": "The protagonist is courageous, kind, and determined. He demonstrates resilience in facing challenges and shows compassion towards others. His loyalty to friends and moral values guide his actions throughout the narrative."
          },
          {
            "q": "What is the central theme of a poem you have studied? Explain with examples from the text.",
            "marks": 6,
            "answer": "The central theme is the power of nature and human connection. The poem illustrates how nature inspires wonder and brings people together, emphasizing harmony between humans and the environment."
          },
          {
            "q": "How does the setting influence the events in the story?",
            "marks": 6,
            "answer": "The rural setting creates an atmosphere of simplicity and authenticity. It allows the characters to develop deep connections with nature and community, which shapes their values and decisions."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the pattern of the Class 7 English exam?",
        "a": "The exam has 80 marks total, divided into reading comprehension, grammar, writing, and literature sections."
      },
      {
        "q": "How much time should I spend on each section?",
        "a": "Allocate 45 minutes for reading and grammar, 60 minutes for writing, and 75 minutes for literature analysis."
      },
      {
        "q": "Are there internal choices in the exam?",
        "a": "Yes, there are internal choices in writing and literature sections, allowing you to choose questions that suit your preparation."
      }
    ]
  },
  {
    "slug": "class-6-english",
    "classLevel": "Class 6",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 6 English Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper introduces fundamental English language skills including reading, writing, grammar, and vocabulary at the junior secondary level. Practice this to build a strong foundation in English. This is a shortened practice set: 19 questions worth 62 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 62,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 10,
        "instructions": "Read the passage and Answer all 5 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "What is the main topic of the passage?",
            "marks": 2,
            "answer": "The passage is about the importance of friendship and how friends support each other through challenges."
          },
          {
            "q": "Why are friends important in our life?",
            "marks": 2,
            "answer": "Friends provide emotional support, share our happiness and sorrows, and help us grow as individuals."
          },
          {
            "q": "What does the passage say about trust in friendship?",
            "marks": 2,
            "answer": "Trust is the foundation of true friendship; without trust, friendship cannot be meaningful or lasting."
          },
          {
            "q": "How should we treat our friends?",
            "marks": 2,
            "answer": "We should treat friends with honesty, respect, and kindness; we should be loyal and supportive."
          },
          {
            "q": "What is the central message of the passage?",
            "marks": 2,
            "answer": "Good friends are valuable treasures in life, and we should nurture our friendships with care and sincerity."
          }
        ],
        "passage": "Ravi had just moved to a new town and the first day at his new school felt very long. He sat alone at lunch, staring at his tiffin box, until a boy named Arjun slid onto the bench beside him and offered him half a guava. They talked about cricket until the bell rang.\n\nFriends matter because they carry a part of what we feel. When something wonderful happens, a friend doubles the joy by celebrating with us; when something goes wrong, a friend halves the sorrow simply by listening. Good friends also change us for the better — they correct us gently when we are wrong and encourage us when we doubt ourselves.\n\nAt the centre of every real friendship is trust. Trust is the foundation on which a friendship stands; without it, no friendship can be meaningful or last very long. A friend who keeps our secrets and tells us the truth, even when the truth is uncomfortable, is worth far more than a hundred cheerful companions who disappear the moment we need help.\n\nHow, then, should we treat our friends? With honesty, respect and kindness. We should be loyal and supportive, remember what matters to them, and forgive small mistakes. Good friends are valuable treasures in life, and like all treasures they must be looked after — nurtured with care and sincerity, year after year."
      },
      {
        "name": "Section B - Grammar and Vocabulary",
        "marks": 16,
        "instructions": "Answer all 8 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "Complete the sentence: I ___ to school every day. (go/goes/went)",
            "marks": 2,
            "answer": "go"
          },
          {
            "q": "Choose the correct plural: child - (childs/children)",
            "marks": 2,
            "answer": "children"
          },
          {
            "q": "Fill in: She is ___ intelligent girl. (a/an/the)",
            "marks": 2,
            "answer": "an"
          },
          {
            "q": "Identify the verb in: The cat sleeps on the bed.",
            "marks": 2,
            "answer": "sleeps"
          },
          {
            "q": "Choose the antonym of 'happy': (sad, funny, nice)",
            "marks": 2,
            "answer": "sad"
          },
          {
            "q": "Complete: They ___ playing in the park. (is/are/am)",
            "marks": 2,
            "answer": "are"
          },
          {
            "q": "Identify the noun: The red car is fast.",
            "marks": 2,
            "answer": "car"
          },
          {
            "q": "Choose the synonym of 'big': (small, large, tiny)",
            "marks": 2,
            "answer": "large"
          }
        ]
      },
      {
        "name": "Section C - Writing Skills",
        "marks": 18,
        "instructions": "Answer all 3 questions. Each carries 6 marks.",
        "questions": [
          {
            "q": "Write a paragraph (80-100 words) about your favorite hobby.",
            "marks": 6,
            "answer": "My favorite hobby is reading books. I love to read stories about adventure and mystery. Reading helps me relax and improves my vocabulary. It takes me to different worlds and introduces me to interesting characters. I spend at least one hour reading every day. My favorite books are from the Fantasy genre. Reading has become an essential part of my daily routine and brings me joy."
          },
          {
            "q": "Write a short letter (40-60 words) thanking your teacher for helping you.",
            "marks": 6,
            "answer": "Dear Teacher, I want to thank you for your excellent guidance and support. You have helped me understand difficult concepts clearly. Your patience and dedication inspire me to work harder. I am grateful for everything you do for us. Thank you again. Sincerely, [Student Name]"
          },
          {
            "q": "Describe a festival you celebrate with 80-100 words.",
            "marks": 6,
            "answer": "Diwali is my favorite festival. It is the festival of lights celebrated across India. During Diwali, we light lamps, burst firecrackers, and exchange sweets. Houses are decorated with colorful decorations. Families come together to celebrate and share joy. The festival symbolizes the victory of light over darkness and good over evil. I enjoy buying new clothes and gifts for family members. Diwali brings happiness and strengthens family bonds."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 18,
        "instructions": "Answer 2 out of 3 questions. Each question carries 6 marks.",
        "questions": [
          {
            "q": "Describe the setting of the story. How does it help the narrative?",
            "marks": 6,
            "answer": "The story is set in a peaceful village near a river. The serene setting creates an atmosphere of calm and allows the characters to develop a deep connection with nature and community."
          },
          {
            "q": "What lesson does the story teach us?",
            "marks": 6,
            "answer": "The story teaches that honesty and kindness are virtues that lead to happiness and social acceptance. It emphasizes the importance of moral values."
          },
          {
            "q": "Who is your favorite character and why?",
            "marks": 6,
            "answer": "My favorite character is the wise old man because he is knowledgeable, kind, and always helps others. His wisdom and compassion make him a role model for everyone."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 6 English?",
        "a": "Class 6 English covers basic grammar, comprehension, writing skills, vocabulary, and introduction to literature with age-appropriate texts."
      },
      {
        "q": "How should I prepare for the English exam?",
        "a": "Read regularly, practice grammar exercises, write short essays, learn new vocabulary, and read the prescribed texts thoroughly."
      },
      {
        "q": "Are there optional questions in the exam?",
        "a": "Yes, there are internal choices in the writing and literature sections, giving you flexibility in choosing questions."
      }
    ]
  },
  {
    "slug": "class-6-social-science",
    "classLevel": "Class 6",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 6 Social Science Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers geography, history, and civics topics for Class 6 students. Practice this paper to understand early human societies, earth's features, and fundamental concepts of citizenship. This is a shortened practice set: 25 questions worth 53 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "2 hours",
    "totalMarks": 53,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 10,
        "instructions": "Answer all 20 multiple choice questions. Each carries 1 mark.",
        "questions": [
          {
            "q": "The shape of the Earth is",
            "marks": 1,
            "answer": "Spherical"
          },
          {
            "q": "Which is the largest continent?",
            "marks": 1,
            "answer": "Asia"
          },
          {
            "q": "The Prime Meridian passes through",
            "marks": 1,
            "answer": "Greenwich"
          },
          {
            "q": "Early humans were primarily",
            "marks": 1,
            "answer": "Hunter-gatherers"
          },
          {
            "q": "Which of these is a fossil fuel?",
            "marks": 1,
            "answer": "Coal"
          },
          {
            "q": "The Indus Valley Civilization flourished around",
            "marks": 1,
            "answer": "2300 BCE"
          },
          {
            "q": "Which is the highest mountain in India?",
            "marks": 1,
            "answer": "Kangchenjunga"
          },
          {
            "q": "Democracy means",
            "marks": 1,
            "answer": "Government by the people"
          },
          {
            "q": "The Constitution of India was adopted on",
            "marks": 1,
            "answer": "26 January 1950"
          },
          {
            "q": "Which of these is a right of citizens?",
            "marks": 1,
            "answer": "Right to freedom"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 16,
        "instructions": "Answer all 8 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "What are the three types of rocks?",
            "marks": 2,
            "answer": "Igneous (formed from magma), Sedimentary (formed from compressed sediments), and Metamorphic (formed under heat and pressure)."
          },
          {
            "q": "Define weathering. How does it differ from erosion?",
            "marks": 2,
            "answer": "Weathering is the breakdown of rocks by weather and temperature. Erosion is the movement and transportation of weathered material."
          },
          {
            "q": "What are the main reasons for human migration in early times?",
            "marks": 2,
            "answer": "Search for food, water, and shelter; escape from predators; and pursuit of better living conditions."
          },
          {
            "q": "List three features of the Indus Valley Civilization.",
            "marks": 2,
            "answer": "Well-planned cities, advanced drainage system, and standardized weights and measures."
          },
          {
            "q": "What is sustainable development?",
            "marks": 2,
            "answer": "Development that meets the needs of the present without compromising the ability of future generations to meet their needs."
          },
          {
            "q": "Define Fundamental Rights. Name two of them.",
            "marks": 2,
            "answer": "Fundamental Rights are basic human rights granted to all citizens. Examples: Right to Equality, Right to Freedom."
          },
          {
            "q": "What is the role of the government in a democracy?",
            "marks": 2,
            "answer": "The government implements laws, provides services, protects citizens' rights, and works for the welfare of the people."
          },
          {
            "q": "What are natural resources? Give two examples.",
            "marks": 2,
            "answer": "Natural resources are materials provided by nature that are useful to humans. Examples: Water, Forests, Minerals."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 15,
        "instructions": "Answer all 5 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Describe the water cycle and its importance.",
            "marks": 3,
            "answer": "The water cycle involves evaporation, condensation, and precipitation. Water evaporates from surface water bodies, forms clouds, and returns as rain. It is essential for sustaining all life on Earth."
          },
          {
            "q": "Explain the daily and seasonal changes in the atmosphere.",
            "marks": 3,
            "answer": "Daily changes include temperature fluctuations and wind patterns due to solar radiation. Seasonal changes result from the Earth's tilt and revolution around the sun."
          },
          {
            "q": "How did the development of agriculture impact human societies?",
            "marks": 3,
            "answer": "Agriculture allowed humans to settle permanently, leading to the development of civilizations, surplus food production, and social stratification."
          },
          {
            "q": "What are the main sectors of the Indian economy?",
            "marks": 3,
            "answer": "Primary (agriculture, mining), Secondary (manufacturing, construction), and Tertiary (services, trade, tourism)."
          },
          {
            "q": "How can individuals contribute to environmental conservation?",
            "marks": 3,
            "answer": "By reducing waste, using renewable energy, conserving water, planting trees, and recycling materials."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 12,
        "instructions": "Answer 2 out of 3 questions. Each carries 6 marks.",
        "questions": [
          {
            "q": "Describe the geographical features of India.",
            "marks": 6,
            "answer": "India has diverse geographical features including the Himalayan mountains in the north, the Indo-Gangetic plains, the Deccan plateau, and coastal plains. Major rivers include the Ganges, Brahmaputra, and Indus. The country has varied climate zones from tropical to temperate."
          },
          {
            "q": "What are the rights and responsibilities of citizens?",
            "marks": 6,
            "answer": "Rights include freedom of speech, right to vote, and right to education. Responsibilities include following laws, paying taxes, voting responsibly, and serving the community."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the scope of Class 6 Social Science?",
        "a": "Class 6 Social Science includes Geography (Earth, weather, maps), History (early civilizations), and Civics (government, rights, responsibilities)."
      },
      {
        "q": "How should I study for the Social Science exam?",
        "a": "Read the textbook carefully, make notes, draw maps and diagrams, answer previous year papers, and practice map-marking skills."
      },
      {
        "q": "Are maps important in the exam?",
        "a": "Yes, map-marking is an important component. Practice marking rivers, mountains, cities, and other geographical features accurately."
      }
    ]
  },
  {
    "slug": "class-8-science",
    "classLevel": "Class 8",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 8 Science Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive Class 8 Science paper covers biology, chemistry, and physics topics including reproduction, materials, and motion. Strengthen your understanding of scientific concepts through this practice paper. This is a shortened practice set: 22 questions worth 50 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "2 hours",
    "totalMarks": 50,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 8,
        "instructions": "Answer all 16 multiple choice questions. Each carries 1 mark.",
        "questions": [
          {
            "q": "Reproduction in humans is a process involving",
            "marks": 1,
            "answer": "Fertilization and development"
          },
          {
            "q": "Which of these is a conductor of electricity?",
            "marks": 1,
            "answer": "Copper"
          },
          {
            "q": "The SI unit of force is",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Adolescence is the period between",
            "marks": 1,
            "answer": "11 and 19 years"
          },
          {
            "q": "Which state of matter has definite shape and volume?",
            "marks": 1,
            "answer": "Solid"
          },
          {
            "q": "The process of conversion of vapor to liquid is called",
            "marks": 1,
            "answer": "Condensation"
          },
          {
            "q": "Sound travels fastest in",
            "marks": 1,
            "answer": "Solids"
          },
          {
            "q": "Which is a renewable source of energy?",
            "marks": 1,
            "answer": "Solar energy"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 14,
        "instructions": "Answer all 7 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Define puberty and list two changes during puberty.",
            "marks": 2,
            "answer": "Puberty is the process of becoming mature. Changes: growth spurt, development of secondary sexual characteristics."
          },
          {
            "q": "What is the difference between metallic and non-metallic elements?",
            "marks": 2,
            "answer": "Metals are good conductors and form positive ions. Non-metals are poor conductors and form negative ions."
          },
          {
            "q": "Explain the concept of friction with an example.",
            "marks": 2,
            "answer": "Friction is the force opposing motion between surfaces. Example: Walking on the ground is possible due to friction."
          },
          {
            "q": "What is pressure? Give its SI unit.",
            "marks": 2,
            "answer": "Pressure is force per unit area. SI unit: Pascal (Pa)"
          },
          {
            "q": "Distinguish between speed and velocity.",
            "marks": 2,
            "answer": "Speed is distance/time; velocity is displacement/time with direction."
          },
          {
            "q": "What is the role of microorganisms in sewage treatment?",
            "marks": 2,
            "answer": "Microorganisms decompose organic matter in sewage, making it safe for disposal."
          },
          {
            "q": "Define biodegradable waste with examples.",
            "marks": 2,
            "answer": "Biodegradable waste can be broken down by microorganisms. Examples: food scraps, leaves, paper."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Describe the reproductive system in humans and the process of fertilization.",
            "marks": 3,
            "answer": "Male and female reproductive organs produce gametes. Sperm fertilizes ovum, forming a zygote that develops into an embryo and fetus."
          },
          {
            "q": "Explain the three states of matter and their properties.",
            "marks": 3,
            "answer": "Solids have fixed shape and volume. Liquids have fixed volume but take container shape. Gases have neither fixed shape nor volume."
          },
          {
            "q": "What is the importance of good health and hygiene?",
            "marks": 3,
            "answer": "Good health enables physical and mental well-being. Hygiene prevents disease transmission and maintains cleanliness."
          },
          {
            "q": "Explain Newton's second law of motion with an example.",
            "marks": 3,
            "answer": "F = ma. Heavier objects require more force to accelerate. A loaded truck needs more force than an empty car to move."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 16,
        "instructions": "Answer all 3 questions. Each carries 5 or 6 marks.",
        "questions": [
          {
            "q": "Describe the life cycle of a plant from seed germination to reproduction.",
            "marks": 5,
            "answer": "Seed absorbs water and germinates. Root and shoot develop. Plant grows, produces leaves, flowers, and fruits containing seeds that complete the cycle."
          },
          {
            "q": "How do simple machines reduce effort? Explain with examples.",
            "marks": 5,
            "answer": "Simple machines like levers, pulleys, and inclined planes reduce effort by increasing distance or changing direction of force."
          },
          {
            "q": "Explain the water cycle and its importance in the ecosystem.",
            "marks": 6,
            "answer": "Water cycle: evaporation, condensation, precipitation, collection. Essential for life; distributes water, regulates temperature, supports ecosystems."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 8 Science?",
        "a": "Class 8 Science has 80 marks theory, with sections on multiple choice, short answer, and long answer questions based on prescribed chapters."
      },
      {
        "q": "How to score well in Class 8 Science?",
        "a": "Understand concepts, learn diagrams, practice numerical problems, do practicals/experiments, and revise regularly."
      },
      {
        "q": "Are diagrams necessary in Science answers?",
        "a": "Yes, labeled diagrams enhance answers and help explain biological and physical processes clearly."
      }
    ]
  }
];

export const SP_GROUPS = (): string[] => [...new Set(SAMPLE_PAPERS.map((p) => p.classLevel))];
export function getSamplePaper(slug: string): SamplePaper | undefined {
  return SAMPLE_PAPERS.find((p) => p.slug === slug);
}
