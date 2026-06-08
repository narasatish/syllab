/**
 * Microlearning modules — bite-sized 5–10 minute learning modules.
 * Each module covers a single focused concept with a tight explanation,
 * 1 worked example, and 2–3 quick MCQs.
 */

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  q: string;
  options: QuizOption[];
  answer: string; // The correct option text
  explain: string; // Explanation for the answer
}

export interface MicroModule {
  id: string;
  slug: string;
  title: string;
  subject: 'Maths' | 'Science' | 'Physics' | 'Chemistry' | 'Biology' | 'English' | 'History' | 'Geography' | 'GK';
  classLevel: string; // e.g. "10", "11", "12"
  estMinutes: number;
  summary: string; // TL;DR
  explanation: string; // 2–3 short paragraphs
  example: {
    title: string;
    problem: string;
    solution: string;
  };
  quickQuiz: QuizQuestion[];
}

export const MICROLEARNING_MODULES: MicroModule[] = [
  {
    id: 'quadratic-formula',
    slug: 'quadratic-formula',
    title: 'Quadratic Formula — Solving ax² + bx + c = 0',
    subject: 'Maths',
    classLevel: '10',
    estMinutes: 6,
    summary: 'The quadratic formula x = (-b ± √(b² - 4ac)) / 2a solves any quadratic equation instantly. No factoring needed.',
    explanation: `
A quadratic equation has the form ax² + bx + c = 0, where a ≠ 0. Sometimes these are hard to factor, so mathematicians derived the quadratic formula.

The formula is: x = (-b ± √(b² - 4ac)) / 2a

The part under the square root, b² - 4ac, is called the **discriminant**. It tells you how many real solutions exist:
- If discriminant > 0: two different real roots
- If discriminant = 0: one repeated root
- If discriminant < 0: no real roots (only complex)

Just plug in your a, b, c values and compute. The ± means you'll get two answers (one with +, one with −).
    `,
    example: {
      title: 'Solve 2x² - 5x + 3 = 0',
      problem: 'Find x using the quadratic formula where a = 2, b = −5, c = 3.',
      solution: `
x = (-(-5) ± √((-5)² - 4(2)(3))) / 2(2)
x = (5 ± √(25 - 24)) / 4
x = (5 ± √1) / 4
x = (5 ± 1) / 4

So x = (5 + 1) / 4 = 6/4 = 3/2, or x = (5 - 1) / 4 = 4/4 = 1

Answer: x = 3/2 or x = 1
      `,
    },
    quickQuiz: [
      {
        q: 'Using the quadratic formula for x² - 4 = 0, what is the discriminant b² - 4ac?',
        options: [
          { text: '0', isCorrect: false },
          { text: '16', isCorrect: true },
          { text: '-16', isCorrect: false },
          { text: '4', isCorrect: false },
        ],
        answer: '16',
        explain: 'For x² - 4 = 0: a = 1, b = 0, c = -4. Discriminant = 0² - 4(1)(-4) = 0 + 16 = 16.',
      },
      {
        q: 'What does a discriminant of 0 mean?',
        options: [
          { text: 'Two different real roots', isCorrect: false },
          { text: 'One repeated root (double root)', isCorrect: true },
          { text: 'No real roots', isCorrect: false },
          { text: 'Three roots', isCorrect: false },
        ],
        answer: 'One repeated root (double root)',
        explain: 'When discriminant = 0, the ± in the formula gives the same value twice, so there\'s only one unique solution.',
      },
      {
        q: 'Solve 3x² + 0x - 12 = 0 using the quadratic formula. What are the roots?',
        options: [
          { text: 'x = 2 or x = -2', isCorrect: true },
          { text: 'x = 4 or x = -4', isCorrect: false },
          { text: 'x = 1 or x = -1', isCorrect: false },
          { text: 'No real roots', isCorrect: false },
        ],
        answer: 'x = 2 or x = -2',
        explain: 'a = 3, b = 0, c = -12. x = (0 ± √(0 - 4(3)(-12))) / 6 = (± √144) / 6 = ± 12/6 = ± 2.',
      },
    ],
  },

  {
    id: 'newtons-first-law',
    slug: 'newtons-first-law',
    title: 'Newton\'s First Law — Inertia & Motion',
    subject: 'Physics',
    classLevel: '11',
    estMinutes: 5,
    summary: 'An object at rest stays at rest, and an object in motion stays in motion unless acted on by a net force. This is inertia.',
    explanation: `
Newton's First Law of Motion states: **An object at rest will remain at rest, and an object in motion will remain in motion with constant velocity, unless acted upon by a net external force.**

This property of objects—to resist changes in their state of motion—is called **inertia**. Inertia is a measure of how difficult it is to change an object's motion. More massive objects have greater inertia.

Real-world examples: When a car suddenly brakes, your body wants to keep moving forward (inertia). When you spin a bucket of water overhead, the water stays in the bucket because it's constantly pulled toward the center by the bucket's force.

The law essentially says that **motion is the natural state of objects**. We don't need a force to keep something moving at constant velocity—we need a force only to *change* that motion.
    `,
    example: {
      title: 'Sudden Braking Car',
      problem: 'A passenger is sitting in a car moving at 60 km/h. The driver suddenly brakes. Explain why the passenger lurches forward.',
      solution: `
The passenger and car are both moving at 60 km/h. When the car brakes, a net force (friction) acts on the car, slowing it down.

However, *no force acts directly on the passenger* at that instant. By Newton's First Law, the passenger continues moving forward at 60 km/h while the car slows down beneath them. The passenger "lurches" forward relative to the car.

A seatbelt applies a force to the passenger, bringing them to rest (or slowing them) along with the car. Without it, the passenger would continue forward until hitting the windshield.
      `,
    },
    quickQuiz: [
      {
        q: 'A book rests on a table. Is there a net force on the book?',
        options: [
          { text: 'Yes, gravity pulls it down', isCorrect: false },
          { text: 'No, the normal force from the table cancels gravity', isCorrect: true },
          { text: 'Yes, friction acts on it', isCorrect: false },
          { text: 'No force acts on it at all', isCorrect: false },
        ],
        answer: 'No, the normal force from the table cancels gravity',
        explain: 'Gravity pulls the book downward, but the table pushes upward with equal normal force. Net force = 0, so the book stays at rest.',
      },
      {
        q: 'Which object has more inertia?',
        options: [
          { text: 'A 2 kg bowling ball', isCorrect: false },
          { text: 'A 5 kg bowling ball', isCorrect: true },
          { text: 'Both have the same inertia', isCorrect: false },
          { text: 'Inertia depends on speed', isCorrect: false },
        ],
        answer: 'A 5 kg bowling ball',
        explain: 'Inertia is proportional to mass. The heavier ball requires more force to change its motion, so it has greater inertia.',
      },
      {
        q: 'An ice skater glides across frictionless ice with no forces acting. What happens?',
        options: [
          { text: 'They slow down and stop', isCorrect: false },
          { text: 'They continue moving at constant velocity indefinitely', isCorrect: true },
          { text: 'They speed up', isCorrect: false },
          { text: 'They accelerate backward', isCorrect: false },
        ],
        answer: 'They continue moving at constant velocity indefinitely',
        explain: 'With no net force, Newton\'s First Law says motion continues unchanged. No friction = no deceleration.',
      },
    ],
  },

  {
    id: 'trigonometry-ratios',
    slug: 'trigonometry-ratios',
    title: 'Trigonometric Ratios — sin, cos, tan in Right Triangles',
    subject: 'Maths',
    classLevel: '10',
    estMinutes: 7,
    summary: 'sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Remember SOHCAHTOA.',
    explanation: `
In a right triangle, the three main trigonometric ratios relate the angles to the sides.

**SOHCAHTOA** is the mnemonic:
- **S**in = **O**pposite / **H**ypotenuse
- **C**os = **A**djacent / **H**ypotenuse
- **T**an = **O**pposite / **A**djacent

In a right triangle, the "opposite" side is across from the angle you're measuring. The "adjacent" side is next to the angle. The hypotenuse is the longest side, opposite the right angle.

These ratios are *always the same* for a given angle, no matter how big or small the triangle. This is why trig tables and calculators work—sin(30°) is always 0.5.

Tangent also equals sin/cos: tan(θ) = sin(θ) / cos(θ).
    `,
    example: {
      title: 'Find a Side in a Right Triangle',
      problem: 'In a right triangle, the angle is 35° and the hypotenuse is 10 cm. Find the opposite side.',
      solution: `
We know the hypotenuse and want the opposite side. Use sine:

sin(35°) = opposite / hypotenuse
sin(35°) = opposite / 10
opposite = 10 × sin(35°)
opposite ≈ 10 × 0.574
opposite ≈ 5.74 cm
      `,
    },
    quickQuiz: [
      {
        q: 'In a right triangle, if cos(θ) = 3/5, what is sin(θ) if the opposite side is 4?',
        options: [
          { text: '3/5', isCorrect: false },
          { text: '4/5', isCorrect: true },
          { text: '5/4', isCorrect: false },
          { text: '3/4', isCorrect: false },
        ],
        answer: '4/5',
        explain: 'If cos(θ) = 3/5, then adjacent = 3 and hypotenuse = 5. With opposite = 4, sin(θ) = 4/5.',
      },
      {
        q: 'What is tan(θ) if sin(θ) = 0.6 and cos(θ) = 0.8?',
        options: [
          { text: '0.75', isCorrect: true },
          { text: '0.6', isCorrect: false },
          { text: '0.8', isCorrect: false },
          { text: '1.33', isCorrect: false },
        ],
        answer: '0.75',
        explain: 'tan(θ) = sin(θ) / cos(θ) = 0.6 / 0.8 = 0.75.',
      },
      {
        q: 'In right triangle ABC with right angle at C, angle A = 40° and side BC (opposite to A) = 5. Find the hypotenuse AB.',
        options: [
          { text: '5 / sin(40°) ≈ 7.78', isCorrect: true },
          { text: '5 × sin(40°) ≈ 3.21', isCorrect: false },
          { text: '5 × tan(40°) ≈ 4.19', isCorrect: false },
          { text: '5 / cos(40°) ≈ 6.53', isCorrect: false },
        ],
        answer: '5 / sin(40°) ≈ 7.78',
        explain: 'sin(40°) = opposite / hypotenuse = 5 / AB, so AB = 5 / sin(40°) ≈ 7.78.',
      },
    ],
  },

  {
    id: 'photosynthesis',
    slug: 'photosynthesis',
    title: 'Photosynthesis — Plants Make Food from Light',
    subject: 'Biology',
    classLevel: '10',
    estMinutes: 8,
    summary: 'Plants use sunlight, water, and CO₂ to make glucose (food) and oxygen. The equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.',
    explanation: `
**Photosynthesis** is the process by which plants convert light energy into chemical energy stored in food (glucose).

The overall equation is:
**6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂**

Photosynthesis happens in two main stages:

1. **Light-Dependent Reactions** (in the thylakoid membranes)
   - Chlorophyll absorbs photons from sunlight.
   - Water molecules are split, releasing electrons, hydrogen ions, and oxygen.
   - Energy is captured in molecules like ATP and NADPH.

2. **Light-Independent Reactions** (Calvin Cycle, in the stroma)
   - Uses ATP and NADPH from stage 1 to fix CO₂.
   - CO₂ is reduced into glucose molecules.

The oxygen we breathe is a byproduct—plants release it to the atmosphere. The glucose feeds the plant (and eventually the food chain).
    `,
    example: {
      title: 'Why Do Plants Need Light?',
      problem: 'Explain why plants cannot survive in a dark room, even with water and CO₂ available.',
      solution: `
Without light, the light-dependent reactions cannot occur. Chlorophyll cannot absorb photons, so no electrons are excited and no ATP/NADPH is produced.

Without these energy carriers, the Calvin Cycle cannot proceed—CO₂ cannot be fixed into glucose. The plant cannot make its own food and will eventually starve.

While CO₂ and water are necessary *inputs*, light energy is essential to *power the process*. No light = no photosynthesis = no food = plant death.
      `,
    },
    quickQuiz: [
      {
        q: 'Where does the oxygen produced in photosynthesis come from?',
        options: [
          { text: 'From CO₂ in the air', isCorrect: false },
          { text: 'From water (H₂O) molecules', isCorrect: true },
          { text: 'From glucose', isCorrect: false },
          { text: 'From soil nutrients', isCorrect: false },
        ],
        answer: 'From water (H₂O) molecules',
        explain: 'In the light-dependent reactions, water is split, releasing O₂ as a byproduct. This was proven using isotope labeling experiments.',
      },
      {
        q: 'Which stage of photosynthesis requires light?',
        options: [
          { text: 'Only the Calvin Cycle', isCorrect: false },
          { text: 'Only the light-dependent reactions', isCorrect: false },
          { text: 'The light-dependent reactions; the Calvin Cycle uses ATP/NADPH produced by them', isCorrect: true },
          { text: 'Neither stage requires light directly', isCorrect: false },
        ],
        answer: 'The light-dependent reactions; the Calvin Cycle uses ATP/NADPH produced by them',
        explain: 'Light is directly absorbed in stage 1. Stage 2 (Calvin Cycle) runs on the energy carriers ATP and NADPH from stage 1.',
      },
      {
        q: 'What would happen if a plant is kept in a room with plenty of CO₂ and water but no light for a week?',
        options: [
          { text: 'It would grow faster without light competing for resources', isCorrect: false },
          { text: 'It would survive indefinitely', isCorrect: false },
          { text: 'It would gradually weaken and eventually die', isCorrect: true },
          { text: 'Nothing—light is not essential for plants', isCorrect: false },
        ],
        answer: 'It would gradually weaken and eventually die',
        explain: 'Without light, photosynthesis cannot occur. The plant uses stored glucose for respiration but cannot make new food, so it starves.',
      },
    ],
  },

  {
    id: 'periodic-table-trends',
    slug: 'periodic-table-trends',
    title: 'Periodic Table Trends — Atomic Radius, Ionization Energy & Electronegativity',
    subject: 'Chemistry',
    classLevel: '11',
    estMinutes: 7,
    summary: 'Atomic radius increases down a group, electronegativity decreases. Across a period, radius decreases, ionization energy increases.',
    explanation: `
The periodic table reveals patterns in how atomic properties change across groups (columns) and periods (rows).

**Across a Period (left to right):**
- **Atomic Radius** decreases: More protons pull electrons closer.
- **Ionization Energy** increases: Harder to remove an electron as it's held tighter.
- **Electronegativity** increases: Atoms pull electrons more strongly in bonds.

**Down a Group (top to bottom):**
- **Atomic Radius** increases: New electron shells are added, pushing electrons farther from nucleus.
- **Ionization Energy** decreases: Valence electrons are farther away and easier to remove.
- **Electronegativity** decreases: Distant valence electrons are less attracted to the nucleus.

These trends explain reactivity. Alkali metals (left of period, down the group) are very reactive because they have low ionization energy and give up electrons easily. Halogens (right of period, top of group) are reactive because they have high electronegativity and greedily pull electrons.
    `,
    example: {
      title: 'Compare Ionization Energies',
      problem: 'Which element requires more energy to remove an electron: Na or Cl? Explain.',
      solution: `
Sodium (Na, atomic #11) and Chlorine (Cl, atomic #17) are both in period 3. Across a period, ionization energy increases.

Chlorine is to the right of sodium, so Cl has higher ionization energy. This is because Cl has a stronger nuclear charge (more protons) pulling on the valence electrons, and it's closer to having a full octet, so it holds onto electrons tightly.

Expected values: Na ≈ 495.8 kJ/mol, Cl ≈ 1251.2 kJ/mol.
Cl >> Na in ionization energy.
      `,
    },
    quickQuiz: [
      {
        q: 'Which of these elements has the largest atomic radius?',
        options: [
          { text: 'Fluorine (F)', isCorrect: false },
          { text: 'Chlorine (Cl)', isCorrect: false },
          { text: 'Bromine (Br)', isCorrect: true },
          { text: 'Iodine (I)', isCorrect: false },
        ],
        answer: 'Bromine (Br)',
        explain: 'All are halogens (Group 17). Atomic radius increases down a group, so Br > Cl > F.',
      },
      {
        q: 'Electronegativity of Ne is ~3.0, O is ~3.4. Is this consistent with periodic trends?',
        options: [
          { text: 'Yes, O is to the left of Ne in period 2, but O > Ne in electronegativity', isCorrect: false },
          { text: 'No, Ne should have higher electronegativity since it\'s to the right', isCorrect: false },
          { text: 'Electronegativity values don\'t follow simple trends', isCorrect: false },
          { text: 'Yes, O is to the left but has higher because it forms bonds; Ne is inert', isCorrect: true },
        ],
        answer: 'Yes, O is to the left but has higher because it forms bonds; Ne is inert',
        explain: 'Ne is a noble gas and rarely forms bonds, so its electronegativity is not measured in the usual way. O does bond and pulls electrons strongly.',
      },
      {
        q: 'Which element has the highest ionization energy?',
        options: [
          { text: 'Neon (Ne)', isCorrect: true },
          { text: 'Helium (He)', isCorrect: false },
          { text: 'Lithium (Li)', isCorrect: false },
          { text: 'Argon (Ar)', isCorrect: false },
        ],
        answer: 'Neon (Ne)',
        explain: 'Neon has a full valence shell (2s² 2p⁶) and is the smallest of the noble gases shown, making it extremely hard to remove an electron.',
      },
    ],
  },

  {
    id: 'probability-basics',
    slug: 'probability-basics',
    title: 'Probability Basics — Events, Outcomes & Simple Probability',
    subject: 'Maths',
    classLevel: '9',
    estMinutes: 6,
    summary: 'Probability = (favorable outcomes) / (total outcomes). Always between 0 and 1. P(certain) = 1, P(impossible) = 0.',
    explanation: `
**Probability** measures how likely something is to happen. It's a number between 0 and 1 (or 0% to 100%).

**P(Event) = (Number of favorable outcomes) / (Total number of possible outcomes)**

Examples:
- A fair die has 6 faces. P(rolling a 3) = 1/6 ≈ 0.167 or 16.7%.
- A coin has 2 sides. P(heads) = 1/2 = 0.5 or 50%.
- If there are 10 red and 5 blue balls in a bag, P(drawing red) = 10/15 = 2/3.

**Key rules:**
- P(Event) = 0 → impossible (will never happen)
- P(Event) = 1 → certain (will definitely happen)
- P(Event A) + P(not A) = 1
- P(A and B) = P(A) × P(B) if A and B are independent

Probability is used in weather forecasts, insurance, gambling, and every decision involving uncertainty.
    `,
    example: {
      title: 'Bag of Colored Balls',
      problem: 'A bag contains 3 red, 4 green, and 5 blue balls. If you draw one ball randomly, what is the probability it is green?',
      solution: `
Total balls = 3 + 4 + 5 = 12
Favorable outcomes (green) = 4
Probability = 4/12 = 1/3 ≈ 0.333 or 33.3%

There's a 1 in 3 chance of drawing green.
      `,
    },
    quickQuiz: [
      {
        q: 'A standard deck has 52 cards (4 suits, 13 ranks). What is P(drawing a King)?',
        options: [
          { text: '1/13', isCorrect: true },
          { text: '1/52', isCorrect: false },
          { text: '4/13', isCorrect: false },
          { text: '1/4', isCorrect: false },
        ],
        answer: '1/13',
        explain: 'There are 4 Kings in 52 cards. P = 4/52 = 1/13.',
      },
      {
        q: 'If P(rain tomorrow) = 0.3, what is P(no rain)?',
        options: [
          { text: '0.3', isCorrect: false },
          { text: '0.7', isCorrect: true },
          { text: '0.5', isCorrect: false },
          { text: 'Cannot be determined', isCorrect: false },
        ],
        answer: '0.7',
        explain: 'P(rain) + P(no rain) = 1, so P(no rain) = 1 - 0.3 = 0.7.',
      },
      {
        q: 'You flip a fair coin twice. What is P(both heads)?',
        options: [
          { text: '1/2', isCorrect: false },
          { text: '1/4', isCorrect: true },
          { text: '1/3', isCorrect: false },
          { text: '2/3', isCorrect: false },
        ],
        answer: '1/4',
        explain: 'First flip: P(H) = 1/2. Second flip: P(H) = 1/2. P(both H) = 1/2 × 1/2 = 1/4.',
      },
    ],
  },

  {
    id: 'linear-equations',
    slug: 'linear-equations',
    title: 'Linear Equations in Two Variables — Graphing & Solving',
    subject: 'Maths',
    classLevel: '9',
    estMinutes: 7,
    summary: 'An equation like y = 2x + 3 is linear. Graph it as a straight line. Solve systems of two equations to find intersection points.',
    explanation: `
A **linear equation in two variables** has the form **ax + by = c** (or **y = mx + b** in slope-intercept form).

**Key terms:**
- **Slope (m)**: How steep the line is. m = (change in y) / (change in x).
- **y-intercept (b)**: Where the line crosses the y-axis (when x = 0).
- **x-intercept**: Where the line crosses the x-axis (when y = 0).

To graph y = 2x + 3:
- b = 3, so plot (0, 3) on the y-axis.
- m = 2, so rise 2 units and run 1 unit right. Plot (1, 5).
- Draw a straight line through these points.

To solve a **system of two linear equations**, find the (x, y) point where both lines intersect. This point satisfies both equations.

Methods: substitution, elimination, or graphing.
    `,
    example: {
      title: 'Solve a System',
      problem: 'Solve: y = 2x + 1 and y = -x + 4',
      solution: `
Both equal y, so set them equal:
2x + 1 = -x + 4
3x = 3
x = 1

Substitute back: y = 2(1) + 1 = 3

Solution: (1, 3)

Check: y = -1 + 4 = 3 ✓
      `,
    },
    quickQuiz: [
      {
        q: 'What is the y-intercept of y = -3x + 7?',
        options: [
          { text: '-3', isCorrect: false },
          { text: '7', isCorrect: true },
          { text: '3', isCorrect: false },
          { text: '-7', isCorrect: false },
        ],
        answer: '7',
        explain: 'In y = mx + b, b is the y-intercept. Here b = 7.',
      },
      {
        q: 'Two lines are parallel if they have the same ___.',
        options: [
          { text: 'y-intercept', isCorrect: false },
          { text: 'slope', isCorrect: true },
          { text: 'x-intercept', isCorrect: false },
          { text: 'length', isCorrect: false },
        ],
        answer: 'slope',
        explain: 'Parallel lines never intersect because they have equal slopes (same angle).',
      },
      {
        q: 'What is the slope of the line through (2, 3) and (5, 9)?',
        options: [
          { text: '1', isCorrect: false },
          { text: '2', isCorrect: true },
          { text: '3', isCorrect: false },
          { text: '6', isCorrect: false },
        ],
        answer: '2',
        explain: 'Slope = (y₂ - y₁) / (x₂ - x₁) = (9 - 3) / (5 - 2) = 6/3 = 2.',
      },
    ],
  },

  {
    id: 'surface-area-volume',
    slug: 'surface-area-volume',
    title: 'Surface Area & Volume — Spheres, Cones & Cylinders',
    subject: 'Maths',
    classLevel: '10',
    estMinutes: 8,
    summary: 'Surface area is the total area of all faces. Volume is the space inside. Know the formulas for sphere, cone, and cylinder.',
    explanation: `
**Surface Area** is the total area of all outer faces of a 3D shape.
**Volume** is the amount of space inside the shape.

**Cylinder** (radius r, height h):
- Surface area = 2πr² + 2πrh (two circular bases + curved side)
- Volume = πr²h

**Cone** (radius r, height h, slant height l):
- Surface area = πr² + πrl (base + curved surface)
- Volume = (1/3)πr²h

**Sphere** (radius r):
- Surface area = 4πr²
- Volume = (4/3)πr³

These formulas appear frequently in competitive exams and real-world problems (water tanks, ice cream cones, planets).

**Tip**: Volume is always in cubic units (cm³, m³), and surface area in square units (cm², m²).
    `,
    example: {
      title: 'Volume of a Cone',
      problem: 'A cone has radius 5 cm and height 12 cm. Find its volume.',
      solution: `
Volume = (1/3)πr²h
Volume = (1/3)π(5)²(12)
Volume = (1/3)π(25)(12)
Volume = (1/3)π(300)
Volume = 100π cm³
Volume ≈ 314.16 cm³
      `,
    },
    quickQuiz: [
      {
        q: 'A sphere has radius 3 cm. What is its surface area?',
        options: [
          { text: '36π cm²', isCorrect: true },
          { text: '9π cm²', isCorrect: false },
          { text: '12π cm²', isCorrect: false },
          { text: '81π cm²', isCorrect: false },
        ],
        answer: '36π cm²',
        explain: 'Surface area = 4πr² = 4π(3)² = 4π(9) = 36π cm².',
      },
      {
        q: 'A cylinder has radius 2 cm and height 10 cm. What is its volume?',
        options: [
          { text: '40π cm³', isCorrect: true },
          { text: '20π cm³', isCorrect: false },
          { text: '80π cm³', isCorrect: false },
          { text: '60π cm³', isCorrect: false },
        ],
        answer: '40π cm³',
        explain: 'Volume = πr²h = π(2)²(10) = π(4)(10) = 40π cm³.',
      },
      {
        q: 'Which shape has the smallest surface area for the same volume?',
        options: [
          { text: 'Cube', isCorrect: false },
          { text: 'Cylinder', isCorrect: false },
          { text: 'Sphere', isCorrect: true },
          { text: 'Cone', isCorrect: false },
        ],
        answer: 'Sphere',
        explain: 'A sphere minimizes surface area for a given volume—why soap bubbles are spherical. This is a fundamental principle in nature.',
      },
    ],
  },

  {
    id: 'acids-bases',
    slug: 'acids-bases',
    title: 'Acids & Bases — pH Scale & Neutralization',
    subject: 'Chemistry',
    classLevel: '10',
    estMinutes: 6,
    summary: 'Acids have pH < 7 and taste sour. Bases have pH > 7 and feel slippery. pH 7 is neutral. Acid + Base → Salt + Water.',
    explanation: `
**Acids** are substances that donate protons (H⁺ ions) in solution. They taste sour, turn litmus paper red, and have pH < 7.
Examples: HCl, H₂SO₄, citric acid in lemons, acetic acid in vinegar.

**Bases** are substances that accept protons and produce hydroxide ions (OH⁻). They taste bitter, feel slippery, turn litmus paper blue, and have pH > 7.
Examples: NaOH, KOH, ammonia, baking soda.

The **pH scale** ranges from 0 to 14:
- pH < 7: acidic
- pH = 7: neutral (pure water)
- pH > 7: basic (alkaline)

**Neutralization** is the reaction between an acid and a base:
Acid + Base → Salt + Water
Example: HCl + NaOH → NaCl + H₂O

The salt produced depends on which acid and base react. Strong acids + strong bases → soluble salts.
    `,
    example: {
      title: 'Neutralization Reaction',
      problem: 'Write the balanced equation for HNO₃ (nitric acid) reacting with KOH (potassium hydroxide).',
      solution: `
HNO₃ + KOH → KNO₃ + H₂O

This is already balanced. One H⁺ from HNO₃ combines with one OH⁻ from KOH to form water. The remaining K⁺ and NO₃⁻ form potassium nitrate, a soluble salt.
      `,
    },
    quickQuiz: [
      {
        q: 'What is the pH of a solution that is neither acidic nor basic?',
        options: [
          { text: '0', isCorrect: false },
          { text: '7', isCorrect: true },
          { text: '14', isCorrect: false },
          { text: '3', isCorrect: false },
        ],
        answer: '7',
        explain: 'pH 7 is neutral. Pure water at 25°C has pH 7.',
      },
      {
        q: 'Which gas is produced when an acid reacts with a metal?',
        options: [
          { text: 'Oxygen (O₂)', isCorrect: false },
          { text: 'Carbon dioxide (CO₂)', isCorrect: false },
          { text: 'Hydrogen (H₂)', isCorrect: true },
          { text: 'Nitrogen (N₂)', isCorrect: false },
        ],
        answer: 'Hydrogen (H₂)',
        explain: 'Acid + Metal → Salt + H₂ gas. E.g., 2HCl + Zn → ZnCl₂ + H₂↑',
      },
      {
        q: 'A solution has pH 3. How many times more acidic is it than pH 6?',
        options: [
          { text: '3 times', isCorrect: false },
          { text: '1000 times', isCorrect: true },
          { text: '10 times', isCorrect: false },
          { text: '100 times', isCorrect: false },
        ],
        answer: '1000 times',
        explain: 'The pH scale is logarithmic (base 10). Each step = 10×. pH 3 to 6 = 3 steps = 10³ = 1000 times more acidic.',
      },
    ],
  },

  {
    id: 'fractions-decimals',
    slug: 'fractions-decimals',
    title: 'Fractions & Decimals — Converting & Operations',
    subject: 'Maths',
    classLevel: '6',
    estMinutes: 7,
    summary: '3/4 = 0.75. To add fractions, find a common denominator. Decimals are fractions with denominators that are powers of 10.',
    explanation: `
**Fractions** represent parts of a whole. 3/4 means 3 out of 4 equal parts.

**Converting fractions to decimals**: Divide numerator by denominator.
- 1/2 = 0.5
- 3/4 = 0.75
- 1/3 ≈ 0.333...

**Converting decimals to fractions**: Put the decimal over a power of 10 and simplify.
- 0.25 = 25/100 = 1/4
- 0.5 = 5/10 = 1/2

**Adding/Subtracting fractions**: Find a common denominator.
- 1/2 + 1/3 = 3/6 + 2/6 = 5/6

**Multiplying fractions**: Multiply numerators and denominators.
- 2/3 × 3/4 = 6/12 = 1/2

**Dividing fractions**: Multiply by the reciprocal.
- 2/3 ÷ 1/2 = 2/3 × 2/1 = 4/3

**Decimals** are a special way of writing fractions where the denominator is 10, 100, 1000, etc.
    `,
    example: {
      title: 'Add Fractions',
      problem: 'Add 2/5 + 3/4',
      solution: `
Find the LCD (least common denominator) of 5 and 4: LCD = 20

2/5 = 8/20
3/4 = 15/20

2/5 + 3/4 = 8/20 + 15/20 = 23/20 = 1 3/20
      `,
    },
    quickQuiz: [
      {
        q: 'What is 3/8 as a decimal?',
        options: [
          { text: '0.3', isCorrect: false },
          { text: '0.375', isCorrect: true },
          { text: '0.4', isCorrect: false },
          { text: '0.35', isCorrect: false },
        ],
        answer: '0.375',
        explain: '3 ÷ 8 = 0.375',
      },
      {
        q: 'What is 1/4 + 1/6?',
        options: [
          { text: '2/10 = 1/5', isCorrect: false },
          { text: '5/12', isCorrect: true },
          { text: '2/24', isCorrect: false },
          { text: '1/5', isCorrect: false },
        ],
        answer: '5/12',
        explain: 'LCD = 12. 1/4 = 3/12, 1/6 = 2/12. Sum = 5/12.',
      },
      {
        q: '2/3 × 3/5 = ?',
        options: [
          { text: '6/15 = 2/5', isCorrect: true },
          { text: '5/8', isCorrect: false },
          { text: '1', isCorrect: false },
          { text: '6/8', isCorrect: false },
        ],
        answer: '6/15 = 2/5',
        explain: 'Multiply: (2 × 3) / (3 × 5) = 6/15, simplify to 2/5.',
      },
    ],
  },

  {
    id: 'imperialism-colonialism',
    slug: 'imperialism-colonialism',
    title: 'Imperialism & Colonialism — British Rule in India',
    subject: 'History',
    classLevel: '9',
    estMinutes: 8,
    summary: 'Colonialism: Britain ruled India directly. Imperialism: the ideology of expansion. British Raj (1857–1947) centralized Indian governance.',
    explanation: `
**Colonialism** is the political and economic control of one country by another, typically involving settlement.
**Imperialism** is the ideology and policy of extending a country's power and influence.

Britain's control of India evolved over ~250 years:
- **1757**: British East India Company wins the Battle of Plassey, gaining power in Bengal.
- **1857**: Indian Rebellion (Mutiny) against Company rule leads to the British Crown taking direct control.
- **1858–1947**: The **British Raj** — direct British imperial rule. India becomes the "Jewel in the Crown."

**Key aspects of British rule:**
- **Administrative centralization**: Direct governance from London; English as the official language.
- **Economic extraction**: Raw materials exported from India, finished goods sold back at high prices.
- **Divide and rule**: Exploiting religious and caste differences to prevent united resistance.
- **Infrastructure for exploitation**: Railways and roads built to extract resources, not for Indian development.

This colonial rule laid the groundwork for the **Indian Independence Movement** (1900s–1947), led by figures like Gandhi and Nehru, using non-violent resistance and civil disobedience.
    `,
    example: {
      title: 'Why Did the 1857 Rebellion Occur?',
      problem: 'Explain the causes of the Indian Rebellion of 1857.',
      solution: `
Multiple grievances:
1. **Economic resentment**: Zamindari system taxed villages heavily; peasants were poor.
2. **Religious insensitivity**: The British alienated both Hindu and Muslim soldiers by forcing them to bite cartridges greased with animal fat (seen as defiling).
3. **Loss of power**: Rulers and landowners were displaced; local authority was removed.
4. **Cultural domination**: British laws and customs were imposed; Indian traditions were dismissed.

The rebellion started as a military mutiny in Meerut but became a widespread uprising. Though crushed within a year, it marked a shift: the Company was replaced by direct Crown rule, and Indians began organized resistance to colonialism.
      `,
    },
    quickQuiz: [
      {
        q: 'Which company first established British power in India?',
        options: [
          { text: 'British Government', isCorrect: false },
          { text: 'East India Company', isCorrect: true },
          { text: 'Royal Navy Trading Co.', isCorrect: false },
          { text: 'London Merchants Guild', isCorrect: false },
        ],
        answer: 'East India Company',
        explain: 'The East India Company was a private merchant company chartered to trade. It gradually became a political and military power.',
      },
      {
        q: 'When did the British Crown take direct control of India (start of the Raj)?',
        options: [
          { text: '1757', isCorrect: false },
          { text: '1858', isCorrect: true },
          { text: '1900', isCorrect: false },
          { text: '1947', isCorrect: false },
        ],
        answer: '1858',
        explain: 'After the 1857 Rebellion, the Crown dissolved the Company and took direct rule. This period (1858–1947) is called the British Raj.',
      },
      {
        q: 'What strategy did the British use to maintain control of India despite being vastly outnumbered?',
        options: [
          { text: 'Superior military technology alone', isCorrect: false },
          { text: 'Divide and rule — exploiting religious and caste divisions', isCorrect: true },
          { text: 'Sharing power with Indian rulers', isCorrect: false },
          { text: 'Promoting Indian education and culture', isCorrect: false },
        ],
        answer: 'Divide and rule — exploiting religious and caste divisions',
        explain: 'The British prevented unified resistance by promoting divisions. They allied with some Indian rulers and pitted communities against each other.',
      },
    ],
  },

  {
    id: 'plate-tectonics',
    slug: 'plate-tectonics',
    title: 'Plate Tectonics — Earth\'s Moving Continents',
    subject: 'Geography',
    classLevel: '9',
    estMinutes: 7,
    summary: 'Earth\'s crust is divided into tectonic plates that move. Plate boundaries cause earthquakes, volcanoes, and mountain formation.',
    explanation: `
**Plate tectonics** is the theory that Earth's crust is divided into large moving plates that interact at their boundaries.

**The three types of plate boundaries:**

1. **Divergent boundaries** (plates move apart):
   - New crust forms as magma rises.
   - Example: Mid-Atlantic Ridge (Atlantic Ocean expands).

2. **Convergent boundaries** (plates collide):
   - One plate may subduct (slide under) the other.
   - Causes volcanic arcs and mountain ranges.
   - Example: Indian Plate meets Eurasian Plate → Himalayas.

3. **Transform boundaries** (plates slide horizontally):
   - Friction causes earthquakes but no new/destroyed crust.
   - Example: San Andreas Fault in California.

**Evidence for plate tectonics:**
- **Continental fit**: Continents puzzle together (Africa and South America).
- **Fossil distribution**: Same species on continents now separated (e.g., mesosaurs in Africa and South America).
- **Seafloor spreading**: Magnetic stripes on the ocean floor match the ages of rocks.
- **Earthquakes and volcanoes**: Concentrated at plate boundaries.

Plates move slowly (~2–10 cm/year), but over millions of years, they reshape the planet.
    `,
    example: {
      title: 'The Himalayas',
      problem: 'Explain how the Himalayas formed using plate tectonics.',
      solution: `
The Indian Plate drifted northward from Gondwana and collided with the Eurasian Plate ~40–50 million years ago.

Because both plates are made of light continental crust, neither subducts. Instead, they buckle and fold upward, pushing the crust thicker and higher.

This ongoing collision continues to lift the Himalayas at ~5 mm/year. It's still the tallest mountain range on Earth because the collision hasn't stopped—India is still moving north into Asia.
      `,
    },
    quickQuiz: [
      {
        q: 'At a divergent plate boundary, what happens to the crust?',
        options: [
          { text: 'It is destroyed', isCorrect: false },
          { text: 'It is created as magma rises', isCorrect: true },
          { text: 'It remains stationary', isCorrect: false },
          { text: 'It slides horizontally', isCorrect: false },
        ],
        answer: 'It is created as magma rises',
        explain: 'Divergent boundaries are where plates move apart, allowing new oceanic crust to form.',
      },
      {
        q: 'Which boundary type is responsible for the San Andreas Fault in California?',
        options: [
          { text: 'Divergent', isCorrect: false },
          { text: 'Convergent', isCorrect: false },
          { text: 'Transform', isCorrect: true },
          { text: 'Subduction', isCorrect: false },
        ],
        answer: 'Transform',
        explain: 'Transform boundaries involve lateral sliding, creating earthquakes. The San Andreas is where the Pacific Plate slides northwest relative to the North American Plate.',
      },
      {
        q: 'The Mariana Trench (deepest point in the ocean) forms at which type of boundary?',
        options: [
          { text: 'Divergent', isCorrect: false },
          { text: 'Convergent (subduction)', isCorrect: true },
          { text: 'Transform', isCorrect: false },
          { text: 'Rift valley', isCorrect: false },
        ],
        answer: 'Convergent (subduction)',
        explain: 'The Pacific Plate subducts beneath the Mariana Plate, creating a deep trench as the oceanic crust is pulled downward.',
      },
    ],
  },

  {
    id: 'english-tenses',
    slug: 'english-tenses',
    title: 'English Tenses — Past, Present, Future (Simple & Continuous)',
    subject: 'English',
    classLevel: '9',
    estMinutes: 8,
    summary: 'Simple tenses state facts. Continuous tenses show ongoing action. Master past, present, future for clear writing.',
    explanation: `
English has 12 main tenses, but here are the six essentials:

**Simple tenses** (fact-based):
- **Simple present**: "I eat." (habitual or general truth)
- **Simple past**: "I ate." (completed action)
- **Simple future**: "I will eat." (planned action)

**Continuous tenses** (ongoing action):
- **Present continuous**: "I am eating." (happening now)
- **Past continuous**: "I was eating." (was happening when something else occurred)
- **Future continuous**: "I will be eating." (will be happening at a specific future time)

**Key differences:**
- "I go to school every day." (simple present = habit)
- "I am going to school right now." (present continuous = now)

- "She wrote a letter yesterday." (simple past = completed)
- "She was writing a letter when I arrived." (past continuous = ongoing at that moment)

Choose the right tense to match the time and whether the action is complete or ongoing.
    `,
    example: {
      title: 'Choose the Right Tense',
      problem: 'Fill in: "While I (study/was studying), my phone (rang/was ringing)."',
      solution: `
While I was studying (ongoing action in the past), my phone rang (completed action that interrupted).

The correct sentence: "While I was studying, my phone rang."

The past continuous sets the scene (the background action), and the simple past shows the interruption.
      `,
    },
    quickQuiz: [
      {
        q: 'Which sentence is correct?',
        options: [
          { text: 'I am living in Delhi for 10 years.', isCorrect: false },
          { text: 'I have lived in Delhi for 10 years.', isCorrect: false },
          { text: 'I live in Delhi since 10 years.', isCorrect: false },
          { text: 'I have been living in Delhi for 10 years.', isCorrect: true },
        ],
        answer: 'I have been living in Delhi for 10 years.',
        explain: 'For a duration that started in the past and continues now, use present perfect continuous.',
      },
      {
        q: 'What is the tense of "They had finished their work by 5 PM"?',
        options: [
          { text: 'Simple past', isCorrect: false },
          { text: 'Past perfect', isCorrect: true },
          { text: 'Past continuous', isCorrect: false },
          { text: 'Present perfect', isCorrect: false },
        ],
        answer: 'Past perfect',
        explain: 'Past perfect shows an action completed before another past action.',
      },
      {
        q: 'Choose the correct completion: "By next month, I ___ here for two years."',
        options: [
          { text: 'will work', isCorrect: false },
          { text: 'will have worked', isCorrect: true },
          { text: 'have worked', isCorrect: false },
          { text: 'am working', isCorrect: false },
        ],
        answer: 'will have worked',
        explain: 'Use future perfect for an action that will be completed by a specific future time.',
      },
    ],
  },

  {
    id: 'photosynthesis-respiration',
    slug: 'photosynthesis-respiration',
    title: 'Photosynthesis vs Respiration — Energy Flow in Plants',
    subject: 'Biology',
    classLevel: '10',
    estMinutes: 6,
    summary: 'Photosynthesis captures solar energy into glucose. Respiration releases that energy for the plant to use. They\'re almost opposite.',
    explanation: `
**Photosynthesis** and **Respiration** are complementary processes that manage energy in plants.

**Photosynthesis** (in chloroplasts during the day):
- 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
- Converts light energy into chemical energy (glucose).
- Produces oxygen as a byproduct.

**Respiration** (in mitochondria, day and night):
- C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP)
- Breaks down glucose to release energy the plant needs for growth, transport, and cellular work.
- Produces CO₂ and water.

**Key comparison:**
- Photosynthesis: **energy input** (sun) → energy storage (glucose)
- Respiration: **energy release** (glucose) → energy for work (ATP)
- Equations are nearly opposites (just reversed).

**Net result**: A plant makes more glucose than it respires, so it grows. The excess glucose becomes fruits, seeds, and stored starch.

Both processes are essential: no photosynthesis = no food; no respiration = no energy to use that food.
    `,
    example: {
      title: 'Why Do Plants Respire at Night?',
      problem: 'Plants cannot photosynthesize at night (no light), but they still respire. Why?',
      solution: `
Even in darkness, a plant's cells need energy for:
- Growth (cell division, protein synthesis)
- Transport (moving minerals, sugars through phloem)
- Maintenance (repairing damaged cells)
- Reproduction (flower and seed production)

The plant breaks down stored glucose via respiration to release ATP, the energy currency. This ATP fuels all these activities.

During the day, photosynthesis produces more glucose than respiration consumes, so the plant builds reserves. At night, it lives off these reserves.
      `,
    },
    quickQuiz: [
      {
        q: 'Which process requires light energy?',
        options: [
          { text: 'Both photosynthesis and respiration', isCorrect: false },
          { text: 'Only photosynthesis', isCorrect: true },
          { text: 'Only respiration', isCorrect: false },
          { text: 'Neither process requires light', isCorrect: false },
        ],
        answer: 'Only photosynthesis',
        explain: 'Light is absorbed by chlorophyll in the light-dependent reactions. Respiration is a chemical process that doesn\'t need light.',
      },
      {
        q: 'If a plant photosynthesizes 10 kg of glucose but respires 6 kg, what happens to the remaining 4 kg?',
        options: [
          { text: 'It is released as oxygen', isCorrect: false },
          { text: 'It is stored in the plant (growth, seeds, fruits)', isCorrect: true },
          { text: 'It is lost as heat', isCorrect: false },
          { text: 'It becomes water', isCorrect: false },
        ],
        answer: 'It is stored in the plant (growth, seeds, fruits)',
        explain: 'Net photosynthesis = gross photosynthesis − respiration. The surplus builds the plant\'s biomass and stored energy.',
      },
      {
        q: 'The oxygen produced in photosynthesis comes from ___.',
        options: [
          { text: 'CO₂ in the air', isCorrect: false },
          { text: 'Water (H₂O)', isCorrect: true },
          { text: 'Glucose', isCorrect: false },
          { text: 'The plant\'s cells', isCorrect: false },
        ],
        answer: 'Water (H₂O)',
        explain: 'Water is split in the light-dependent reactions, releasing O₂. This was proven using isotope-labeled water (H₂¹⁸O).',
      },
    ],
  },

  {
    id: 'mean-median-mode',
    slug: 'mean-median-mode',
    title: 'Mean, Median, Mode — Measures of Central Tendency',
    subject: 'Maths',
    classLevel: '8',
    estMinutes: 6,
    summary: 'Mean = average. Median = middle value when sorted. Mode = most frequent. Use each depending on your data.',
    explanation: `
**Mean**, **Median**, and **Mode** summarize data in one number.

**Mean** (Average):
- Sum all values and divide by count.
- Example: (2, 4, 6, 8) → (2+4+6+8)/4 = 20/4 = 5
- Sensitive to outliers (very high/low values skew it).

**Median** (Middle):
- Sort values; the middle one is the median.
- If even count, average the two middle values.
- Example: (2, 4, 6, 8) → median = (4+6)/2 = 5
- Robust to outliers.

**Mode** (Most Frequent):
- The value that appears most often.
- Example: (2, 4, 4, 6, 8) → mode = 4
- A dataset can have one, many, or no mode.

**Which to use:**
- **Mean**: For symmetric data without outliers (e.g., test scores in a class).
- **Median**: For skewed data or when outliers exist (e.g., house prices—one mansion skews the mean).
- **Mode**: For categorical data (e.g., "What's the most popular shoe size?").
    `,
    example: {
      title: 'Find All Three',
      problem: 'Find the mean, median, and mode of: 5, 7, 7, 9, 12',
      solution: `
**Mean**: (5 + 7 + 7 + 9 + 12) / 5 = 40 / 5 = 8

**Median**: Sort (already sorted). Middle value (3rd of 5) = 7

**Mode**: 7 appears twice; others appear once. Mode = 7

Answer: Mean = 8, Median = 7, Mode = 7
      `,
    },
    quickQuiz: [
      {
        q: 'The mean of 3, 5, 7, 9 is ___.',
        options: [
          { text: '5', isCorrect: false },
          { text: '6', isCorrect: true },
          { text: '7', isCorrect: false },
          { text: '8', isCorrect: false },
        ],
        answer: '6',
        explain: '(3+5+7+9)/4 = 24/4 = 6',
      },
      {
        q: 'The median of 2, 2, 4, 8, 100 is ___.',
        options: [
          { text: '2', isCorrect: false },
          { text: '4', isCorrect: true },
          { text: '23.2', isCorrect: false },
          { text: '100', isCorrect: false },
        ],
        answer: '4',
        explain: 'Sorted: 2, 2, 4, 8, 100. Middle value (3rd of 5) = 4. Note: Mean = 23.2, but median = 4 (better summary here due to outlier 100).',
      },
      {
        q: 'The mode of 1, 2, 2, 2, 3, 3, 4 is ___.',
        options: [
          { text: '2', isCorrect: true },
          { text: '2.43', isCorrect: false },
          { text: '2.5', isCorrect: false },
          { text: '3', isCorrect: false },
        ],
        answer: '2',
        explain: '2 appears three times; 3 appears twice; others once. Mode = 2 (most frequent).',
      },
    ],
  },
];
