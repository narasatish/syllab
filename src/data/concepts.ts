import { Concept } from '../types';

export const CONCEPTS: Concept[] = [
  {
    id: '10-math-1',
    subject: 'Mathematics',
    chapterId: '10-math-1',
    title: "Real Numbers",
    summary: "The foundation of the number system. Explore Euclid's Division Lemma, the Fundamental Theorem of Arithmetic, and the logic of irrationality.",
    visuals: [
      { type: 'model', title: 'Euclid\'s Division Lemma', desc: 'a = bq + r. The core of division logic.', icon: '🔢' },
      { type: 'model', title: 'Euclid\'s Algorithm', desc: 'Finding HCF iteratively.', icon: '🧮' },
      { type: 'model', title: 'Fund. Theorem of Arithmetic', desc: 'Prime factorization uniqueness.', icon: '⚛️' },
      { type: 'model', title: 'HCF & LCM Relation', desc: 'HCF * LCM = a * b.', icon: '⚖️' },
      { type: 'model', title: 'Irrationality Proofs', desc: 'Logic behind √2, √3 as non-repeating.', icon: '📉' },
      { type: 'model', title: 'Decimal Expansions', desc: 'Terminating vs Non-terminating.', icon: '➗' },
      { type: 'model', title: 'Rational Logic', desc: 'p/q form constraints.', icon: '👥' },
      { type: 'model', title: 'Divisibility Rules', desc: 'Shortcut logic for 2, 3, 5, 11.', icon: '🔍' },
      { type: 'model', title: 'Sieve of Eratosthenes', desc: 'Primes finding algorithm.', icon: '🕸️' },
      { type: 'model', title: 'Infinite Primes', desc: 'Euclid\'s proof of endless primes.', icon: '♾️' },
      { type: 'model', title: 'Composite Breakdown', desc: 'Analysis of non-prime structures.', icon: '🏗️' },
      { type: 'model', title: 'Co-prime properties', desc: 'Sets with HCF = 1.', icon: '🖇️' },
      { type: 'model', title: 'Number Line Mastery', desc: 'Real number visualization.', icon: '📏' },
      { type: 'model', title: 'Algebraic Integers', desc: 'Roots and integer relationships.', icon: '🧬' },
      { type: 'model', title: 'Modular Arithmetic Intro', desc: 'Remainders in loops.', icon: '🔄' },
      { type: 'model', title: 'Historical Context', desc: 'Evolution of number systems.', icon: '📜' }
    ],
    examples: [
      { scenario: 'Digital Security', details: 'Prime factorization is the basis of RSA encryption used in your banking apps and WhatsApp messages.' },
      { scenario: 'Scheduling', details: 'LCM helps in determining when two independent cyclic events (like traffic lights or gym schedules) will coincide.' },
      { scenario: 'Carpentry', details: 'HCF is used to find the largest possible square tiles that can cover a rectangular floor without any leftovers.' }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-2',
    subject: 'Mathematics',
    chapterId: '10-math-2',
    title: "Polynomials",
    summary: "The algebra of expressions. Master the geometric meaning of zeroes, relationship with coefficients, and the division algorithm.",
    visuals: [
      {
        type: 'model',
        title: 'Zeroes of a Polynomial',
        desc: 'The values of x for which P(x) = 0. Graphically, these are the points where the curve intersects the X-axis.',
        icon: '〽️'
      },
      {
        type: 'model',
        title: 'Quadratic Polynomials',
        desc: 'Sum of zeroes (α+β) = -b/a. Product of zeroes (αβ) = c/a. Forms a parabola on the graph.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'Cubic Polynomials',
        desc: 'α+β+γ = -b/a, αβ+βγ+γα = c/a, αβγ = -d/a. Have at most 3 real zeroes.',
        icon: '📊'
      },
      {
        type: 'model',
        title: 'Division Algorithm',
        desc: 'Dividend = (Divisor × Quotient) + Remainder. Used to find all zeroes if some are already known.',
        icon: '➗'
      },
      {
        type: 'model',
        title: 'Geometric Interpretation',
        desc: 'Observing how the number of X-axis intersections matches the degree of the polynomial.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Degree of Polynomial',
        desc: 'The highest power of the variable x. Linear (1), Quadratic (2), Cubic (3).',
        icon: '1️⃣'
      },
      {
        type: 'model',
        title: 'The Remainder Theorem',
        desc: 'Finding the remainder of P(x) when divided by (x-a) by simply calculating P(a).',
        icon: '🧾'
      },
      {
        type: 'model',
        title: 'Factor Theorem',
        desc: 'If P(a) = 0, then (x-a) is a guaranteed factor of the polynomial.',
        icon: '🧬'
      },
      {
        type: 'model',
        title: 'Biquadratic Equations',
        desc: 'Polynomials of degree 4. Understanding their symmetric properties and roots.',
        icon: '♾️'
      },
      {
        type: 'model',
        title: 'Values of Polynomial',
        desc: 'Evaluating P(x) at specific values to map out the entire function behavior.',
        icon: '🔢'
      }
    ],
    examples: [
      {
        scenario: 'Parabolic Arches',
        details: 'The path of a basketball or the shape of a bridge can be modeled by a quadratic polynomial, where the zeroes represent ground points.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-math-3',
    subject: 'Mathematics',
    chapterId: '10-math-3',
    title: "Pair of Linear Equations",
    summary: "Solving systems of two variables. Explore graphical solutions, algebraic methods, and consistency of equations.",
    visuals: [
      {
        type: 'model',
        title: 'Graphical Method',
        desc: 'Intersecting lines: Unique solution. Parallel lines: No solution. Coincident lines: Infinite solutions.',
        icon: '🛤️'
      },
      {
        type: 'model',
        title: 'Substitution Method',
        desc: 'Expressing one variable in terms of the other from one equation and substituting it into the second.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Elimination Method',
        desc: 'Making coefficients of one variable equal to cancel it out. The fastest method for most JEE problems.',
        icon: '🧹'
      },
      {
        type: 'model',
        title: 'Cross-Multiplication',
        desc: 'A formulaic approach using the coefficients a, b, c directly to find x and y.',
        icon: '✖️'
      },
      {
        type: 'model',
        title: 'Consistency Conditions',
        desc: 'Checking a1/a2, b1/b2, and c1/c2 ratios to predict solution types before solving.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Unique Solution Logic',
        desc: 'When lines meet at exactly one point. a1/a2 ≠ b1/b2.',
        icon: '☝️'
      },
      {
        type: 'model',
        title: 'Parallel Lines: No Sol',
        desc: 'When lines have the same slope but different intercepts. a1/a2 = b1/b2 ≠ c1/c2.',
        icon: '🚫'
      },
      {
        type: 'model',
        title: 'Coincident: Infinite Sol',
        desc: 'When both equations represent the same line. a1/a2 = b1/b2 = c1/c2.',
        icon: '♾️'
      },
      {
        type: 'model',
        title: 'Reducible to Linear',
        desc: 'Transforming complex fractional or radical equations into linear form using substitution.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'The Intercept Form',
        desc: 'x/a + y/b = 1. A visual way to plot lines quickly based on axis intercepts.',
        icon: '📍'
      }
    ],
    examples: [
      {
        scenario: 'Age Problems',
        details: 'Finding the current ages of a father and son based on their age relationships 5 years ago and 10 years hence.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-4',
    subject: 'Mathematics',
    chapterId: '10-math-4',
    title: "Quadratic Equations",
    summary: "Eqautions of the second degree. Master factorization, completing the square, and the discriminant logic.",
    visuals: [
      {
        type: 'model',
        title: 'Standard Form',
        desc: 'ax² + bx + c = 0, where a ≠ 0. The fundamental equation of projectile motion.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Factorization Method',
        desc: 'Splitting the middle term to find the roots (zeroes) of the equation.',
        icon: '✂️'
      },
      {
        type: 'model',
        title: 'Nature of Roots (D)',
        desc: 'D = b² - 4ac. D > 0: 2 Real/Distinct. D = 0: 2 Real/Equal. D < 0: No Real Roots.',
        icon: '🧠'
      },
      {
        type: 'model',
        title: 'Quadratic Formula',
        desc: 'x = [-b ± √(b² - 4ac)] / 2a. The universal "Sridharacharya" formula to solve any quadratic.',
        icon: '🧾'
      },
      {
        type: 'model',
        title: 'Completing the Square',
        desc: 'A geometric derivation that helps visualize quadratic relationships as areas.',
        icon: '⬛'
      },
      {
        type: 'model',
        title: 'Vertex of Parabola',
        desc: 'Finding the maximum or minimum point of a quadratic curve using x = -b/2a.',
        icon: '🏔️'
      },
      {
        type: 'model',
        title: 'Discriminant Visuals',
        desc: 'Seeing how D affects whether the parabola touches, crosses, or misses the X-axis.',
        icon: '👁️'
      },
      {
        type: 'model',
        title: 'Real World Modeling',
        desc: 'Using quadratics to predict ball trajectory, profit curves, or braking distances.',
        icon: '🚗'
      },
      {
        type: 'model',
        title: 'Common Root Logic',
        desc: 'Conditions for two quadratic equations to share one or both roots.',
        icon: '🖇️'
      },
      {
        type: 'model',
        title: 'Equation Transformation',
        desc: 'Forming equations whose roots are related to the roots of a given quadratic.',
        icon: '🔄'
      }
    ],
    examples: [
      {
        scenario: 'Area Optimization',
        details: 'Finding the dimensions of a rectangular park given its perimeter and area involves solving a quadratic equation.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-math-5',
    subject: 'Mathematics',
    chapterId: '10-math-5',
    title: "Arithmetic Progressions",
    summary: "Sequences with constant differences. Master the nth term formula and the summation of series.",
    visuals: [
      {
        type: 'model',
        title: 'Defining an AP',
        desc: 'A sequence where each term is obtained by adding a fixed number (d) to the preceding term.',
        icon: '🪜'
      },
      {
        type: 'model',
        title: 'The nth Term (an)',
        desc: 'an = a + (n - 1)d. Allows you to find any term in a sequence without listing them all.',
        icon: '🛰️'
      },
      {
        type: 'model',
        title: 'Sum of n Terms (Sn)',
        desc: 'Sn = n/2 [2a + (n - 1)d] or Sn = n/2 [a + l]. Used to calculate large series totals instantly.',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Common Difference (d)',
        desc: 'The gap between stages. Can be positive (increasing), negative (decreasing), or zero.',
        icon: '↔️'
      },
      {
        type: 'model',
        title: 'First Term (a)',
        desc: 'The starting point of the progression. Defines the baseline of the entire sequence.',
        icon: '🌱'
      },
      {
        type: 'model',
        title: 'Arithmetic Mean',
        desc: 'For any three numbers in AP, middle = (first + last) / 2.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'The Ladder Logic',
        desc: 'Visualizing series as climbing a ladder where each rung is exactly the same distance apart.',
        icon: '🪜'
      },
      {
        type: 'model',
        title: 'Gauss\'s Summation Trick',
        desc: 'The logic used by young Gauss to add 1 to 100 in seconds - pairing from both ends.',
        icon: '🪄'
      },
      {
        type: 'model',
        title: 'Finite vs Infinite AP',
        desc: 'Infinite progressions go on forever, while finite AP has a fixed last term.',
        icon: '♾️'
      },
      {
        type: 'model',
        title: 'Application in Finance',
        desc: 'Calculating fixed deposit growth or loan repayment schedules using AP logic.',
        icon: '💰'
      }
    ],
    examples: [
      {
        scenario: 'Savings Growth',
        details: 'If you save ₹100 in the first month and increase it by ₹50 each month, how much total will you have in 2 years?'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-6',
    subject: 'Mathematics',
    chapterId: '10-math-6',
    title: "Triangles",
    summary: "The geometry of similarity. Master Thales theorem, criteria for similarity, and the classic Pythagoras theorem.",
    visuals: [
      {
        type: 'model',
        title: 'Similar vs Congruent',
        desc: 'Similar triangles have the same shape but different sizes. Sides are proportional, angles are equal.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'BPT (Thales Theorem)',
        desc: 'If a line is parallel to one side of a triangle, it divides the other two sides in the same ratio.',
        icon: '🖇️'
      },
      {
        type: 'model',
        title: 'Criteria: AAA, SSS, SAS',
        desc: 'Minimal conditions to prove that two triangles are similar.',
        icon: '✅'
      },
      {
        type: 'model',
        title: 'Pythagoras Theorem',
        desc: 'In a right triangle, Hypotenuse² = Base² + Perpendicular². The cornerstone of trigonometry.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Area Ratio Theorem',
        desc: 'Ratio of areas is equal to the square of ratio of corresponding sides.',
        icon: '📊'
      },
      {
        type: 'model',
        title: 'Similarity in Right Triangles',
        desc: 'Altitude from right angle vertex to hypotenuse creates similar sub-triangles.',
        icon: '🔝'
      },
      {
        type: 'model',
        title: 'Converse of BPT',
        desc: 'If a line divides two sides in the same ratio, it is parallel to the third side.',
        icon: '↔️'
      },
      {
        type: 'model',
        title: 'Converse of Pythagoras',
        desc: 'If a² + b² = c², the angle opposite to side c is 90°.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Midpoint Corollary',
        desc: 'Segment joining midpoints is parallel to and half of the third side.',
        icon: '📍'
      },
      {
        type: 'model',
        title: 'Common Vertices Similarity',
        desc: 'Recognizing shared angles in overlapping triangles to prove similarity fast.',
        icon: '🔍'
      }
    ],
    examples: [
      {
        scenario: 'Shadow Height',
        details: 'Using the length of a shadow and a small pole to calculate the height of a massive tower via similarity.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-math-7',
    subject: 'Mathematics',
    chapterId: '10-math-7',
    title: "Coordinate Geometry",
    summary: "Algebra meets geometry. Master the distance formula, section formula, and area calculations on the Cartesian plane.",
    visuals: [
      {
        type: 'model',
        title: 'Distance Formula',
        desc: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]. Calculates the air distance between any two points.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Section Formula',
        desc: 'Finds the coordinates of a point dividing a line segment in a specific ratio m:n.',
        icon: '➗'
      },
      {
        type: 'model',
        title: 'Midpoint Formula',
        desc: 'A special case of section formula (1:1 ratio). [(x₁+x₂)/2, (y₁+y₂)/2].',
        icon: '📍'
      },
      {
        type: 'model',
        title: 'Area of Triangle',
        desc: 'Calculating the space enclosed by 3 points using their coordinates. If area = 0, points are collinear.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Centroid G',
        desc: 'The point where medians meet: [(x1+x2+x3)/3, (y1+y2+y3)/3].',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Quadrant Logic',
        desc: 'Mapping points in (+,+) through (-,-) sectors for visual orientation.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Origin Distance',
        desc: 'Specific formula when one point is zero: d = √(x² + y²).',
        icon: '🏁'
      },
      {
        type: 'model',
        title: 'Geometric Verification',
        desc: 'Using distance to prove if 3 points form an isosceles or equilateral triangle.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Collinearity Check',
        desc: 'Using either area formula (Area=0) or distance formula (AB+BC=AC) to verify straight lines.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'The XY Intercepts',
        desc: 'Understanding coordinates of points on X-axis (x,0) and Y-axis (0,y).',
        icon: '📍'
      }
    ],
    examples: [
      {
        scenario: 'Route Mapping',
        details: 'GPS systems use coordinate geometry to find the shortest distance and divide routes into sections for traffic analysis.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-8',
    subject: 'Mathematics',
    chapterId: '10-math-8',
    title: "Introduction to Trigonometry",
    summary: "The study of triangles and ratios. Master sin, cos, tan, and the identities that govern wave motion and geometry.",
    visuals: [
      {
        type: 'model',
        title: 'Trigonometric Ratios',
        desc: 'Sine (Opp/Hyp), Cosine (Adj/Hyp), Tangent (Opp/Adj). The foundation for all higher mathematics.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Standard Angles',
        desc: 'Values of ratios at 0°, 30°, 45°, 60°, and 90°. Essential for rapid problem solving.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Complementary Angles',
        desc: 'sin(90 - θ) = cos θ, tan(90 - θ) = cot θ. Shows the symmetry in triangle ratios.',
        icon: '☯️'
      },
      {
        type: 'model',
        title: 'Trig Identities',
        desc: 'sin²θ + cos²θ = 1. The most important relation in geometry, derived from Pythagoras theorem.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Reciprocal Identities',
        desc: 'cosecθ=1/sin, secθ=1/cos, cotθ=1/tan. Connecting all ratios.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Quadratic Identities',
        desc: '1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ. Advanced simplification tools.',
        icon: '🆔'
      },
      {
        type: 'model',
        title: 'The Unit Circle',
        desc: 'Visualizing sine as Y and cosine as X on a 1-unit radius circle.',
        icon: '🔘'
      },
      {
        type: 'model',
        title: 'Trig Equation Solving',
        desc: 'Techniques to find θ given a ratio value like sinθ = 1/2.',
        icon: '📝'
      },
      {
        type: 'model',
        title: 'ASTC Rule Intro',
        desc: 'Knowing which ratios are positive in each quadrant (All, Sin, Tan, Cos).',
        icon: '🧭'
      },
      {
        type: 'model',
        title: 'Application in Navigation',
        desc: 'How pilots and sailors use these ratios to stay on course.',
        icon: '🚢'
      }
    ],
    examples: [
      {
        scenario: 'The Steep Staircase',
        details: 'Calculating the angle of a ramp or staircase to ensure safety and compliance with building codes.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-math-9',
    subject: 'Mathematics',
    chapterId: '10-math-9',
    title: "Applications of Trigonometry",
    summary: "Trigonometry in the real world. Master heights and distances, angles of elevation, and the logic of surveying.",
    visuals: [
      {
        type: 'model',
        title: 'Line of Sight',
        desc: 'The imaginary line from the eye of an observer to the object being viewed.',
        icon: '👁️‍🗨️'
      },
      {
        type: 'model',
        title: 'Angle of Elevation',
        desc: 'The angle formed by the line of sight with the horizontal when the object is ABOVE the eye level.',
        icon: '🆙'
      },
      {
        type: 'model',
        title: 'Angle of Depression',
        desc: 'The angle formed by the line of sight with the horizontal when the object is BELOW the eye level.',
        icon: '🔽'
      }
    ],
    examples: [
      {
        scenario: 'Ship Navigation',
        details: 'A lighthouse keeper observes two ships. By measuring the angles of depression, they can calculate the exact distance between the ships.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-10',
    subject: 'Mathematics',
    chapterId: '10-math-10',
    title: "Circles",
    summary: "The geometry of curves. Master tangents, lengths, and the theorems that define circular properties.",
    visuals: [
      {
        type: 'model',
        title: 'Tangent to a Circle',
        desc: 'A line that touches the circle at exactly one point. It is always perpendicular to the radius at that point.',
        icon: '📍'
      },
      {
        type: 'model',
        title: 'Tangents from External Point',
        desc: 'The lengths of tangents drawn from an external point to a circle are always equal.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Point of Contact',
        desc: 'The specific junction where a tangent line meets the circumference.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Tangent Theorem Proof',
        desc: 'Rigorous derivation showing that radius is perpendicular to tangent at contact point.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Number of Tangents',
        desc: 'From inside: 0. On circle: 1. Outside circle: 2. Understanding geographic limitations.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Common Tangents',
        desc: 'Lines touching two separate circles. Crucial for mechanical belt designs.',
        icon: '🛤️'
      },
      {
        type: 'model',
        title: 'Secant Properties',
        desc: 'A line cutting the circle at two points and its relationship to chord lengths.',
        icon: '✂️'
      },
      {
        type: 'model',
        title: 'Concentric Circles Tangents',
        desc: 'Tangents of an inner circle acting as chords for the outer circle.',
        icon: '🔘'
      },
      {
        type: 'model',
        title: 'Inscribed Circle in Triangle',
        desc: 'How the incenter is equidistant from all tangent points on triangle sides.',
        icon: '⭕'
      },
      {
        type: 'model',
        title: 'Construction Logic',
        desc: 'Using a compass to locate the exact point of contact from an external point.',
        icon: '🖍️'
      }
    ],
    examples: [
      {
        scenario: 'Mechanical Gears',
        details: 'Designing gears and pulleys requires calculating the exact points where belts or chains act as tangents to circular surfaces.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-math-11',
    subject: 'Mathematics',
    chapterId: '10-math-11',
    title: "Areas Related to Circles",
    summary: "Calculating space in curves. Master the area of sectors, segments, and the logic of Pi.",
    visuals: [
      {
        type: 'model',
        title: 'Perimeter & Area',
        desc: 'Circumference = 2πr. Area = πr². These formulas work for everything from atoms to orbits.',
        icon: '⭕'
      },
      {
        type: 'model',
        title: 'Area of Sector',
        desc: 'A "slice" of the circle. Area = (θ/360) × πr². Used in pie charts and circular field design.',
        icon: '🍕'
      },
      {
        type: 'model',
        title: 'Area of Segment',
        desc: 'The region between a chord and an arc. Area of Sector - Area of Triangle.',
        icon: '🌙'
      },
      {
        type: 'model',
        title: 'Length of an Arc',
        desc: 'Calculating distance along a curve: l = (θ/360) × 2πr.',
        icon: '➰'
      },
      {
        type: 'model',
        title: 'Minor vs Major Sector',
        desc: 'Understanding the remaining area when a sector is removed from a circle.',
        icon: '🌗'
      },
      {
        type: 'model',
        title: 'Combination of Plane Figures',
        desc: 'Finding the area of shaded regions in complex circular patterns and designs.',
        icon: '🧩'
      },
      {
        type: 'model',
        title: 'Wheel Rotation Distance',
        desc: 'Distance covered in n rotations = n × circumference. Basis of car odometers.',
        icon: '🎡'
      },
      {
        type: 'model',
        title: 'The Constant Pi (π)',
        desc: 'The irrational ratio of circumference to diameter. Constant for all circles in the universe.',
        icon: '🥧'
      },
      {
        type: 'model',
        title: 'Inscribed Square area',
        desc: 'Maximum area of a square derived from the diameter of its circumcircle.',
        icon: '⬛'
      },
      {
        type: 'model',
        title: 'Circular Ring (Annulus)',
        desc: 'Area between two concentric circles: π(R² - r²). Used in pipe and washer design.',
        icon: '💍'
      }
    ],
    examples: [
      {
        scenario: 'Irrigation Sprinklers',
        details: 'Calculating the area of a lawn covered by a rotating sprinkler that sweeps through a specific angle.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-12',
    subject: 'Mathematics',
    chapterId: '10-math-12',
    title: "Surface Areas and Volumes",
    summary: "3D geometry. Master cubes, spheres, cones, and the complex logic of combination solids.",
    visuals: [
      {
        type: 'model',
        title: 'Cube & Cuboid',
        desc: 'SA = 2(lb+bh+hl). Vol = lwh. The building blocks of structural volume.',
        icon: '📦'
      },
      {
        type: 'model',
        title: 'Cylinder & Cone',
        desc: 'Cylinder Vol = πr²h. Cone Vol = 1/3 πr²h. They share a 3:1 ratio relationship.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Sphere & Hemisphere',
        desc: 'Sphere SA = 4πr². Volume = 4/3 πr³. The most efficient shape for containing volume with minimum surface.',
        icon: '🌐'
      },
      {
        type: 'model',
        title: 'Combination of Solids',
        desc: 'Calculating the total surface area or volume of complex objects like gulab jamuns, tents, or space capsules.',
        icon: '🚀'
      },
      {
        type: 'model',
        title: 'Solid Transformation',
        desc: 'Volume remains constant when melting one solid into another (e.g., sphere to cylinder).',
        icon: '🔥'
      },
      {
        type: 'model',
        title: 'Frustum of a Cone',
        desc: 'Area and volume of "cut-off" cones like buckets and glass tumblers.',
        icon: '🪣'
      },
      {
        type: 'model',
        title: 'Slant Height (l)',
        desc: 'Calculating l = √(h² + r²) for cones to find lateral surface area.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Hollow Pipe Volume',
        desc: 'Material volume = External Volume - Internal Volume.',
        icon: '🔌'
      },
      {
        type: 'model',
        title: 'Packing Efficiency',
        desc: 'How much empty space remains when recursive solids (like spheres) are packed in a box.',
        icon: '🍱'
      },
      {
        type: 'model',
        title: 'Water flow in Pipes',
        desc: 'Volume flow = Area of cross-section × Speed of water × Time.',
        icon: '🚿'
      }
    ],
    examples: [
      {
        scenario: 'Fuel Tanker Capacity',
        details: 'Calculating how many liters of petrol a tanker can carry based on its cylindrical body and hemispherical ends.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-math-13',
    subject: 'Mathematics',
    chapterId: '10-math-13',
    title: "Statistics",
    summary: "The science of data. Master mean, mode, and median calculations for grouped data.",
    visuals: [
      {
        type: 'model',
        title: 'Mean (Average)',
        desc: 'Direct Method, Assumed Mean Method, and Step-Deviation Method for grouped frequency distributions.',
        icon: '📊'
      },
      {
        type: 'model',
        title: 'Mode (Most Frequent)',
        desc: 'The value which appears most often. In grouped data, it is found in the modal class.',
        icon: '🔝'
      },
      {
        type: 'model',
        title: 'Median (Middle Value)',
        desc: 'The middle point of the data. Dividing the data into two equal halves using cumulative frequency.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Cumulative Frequency (Ogive)',
        desc: 'Graphical representation of median using "less than" and "more than" type curves.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'Empirical Relationship',
        desc: '3 Median = Mode + 2 Mean. A quick shortcut for checking consistency.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Class Interval & Mark',
        desc: 'Defining lower and upper limits and calculating midpoint (xi) for weightage.',
        icon: '📑'
      },
      {
        type: 'model',
        title: 'Modal Class Selection',
        desc: 'Identifying the interval with maximum frequency to apply the mode formula.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Standard Deviation (Intro)',
        desc: 'How far data spreads from the mean. Basic foundation for high-school physics data.',
        icon: '↔️'
      },
      {
        type: 'model',
        title: 'Grouped vs Ungrouped',
        desc: 'Understanding when to use raw lists vs frequency tables.',
        icon: '🗂️'
      },
      {
        type: 'model',
        title: 'Data Collection ethics',
        desc: 'The importance of unbiased sampling in survey statistics.',
        icon: '🤝'
      }
    ],
    examples: [
      {
        scenario: 'Crop Yield Analysis',
        details: 'Farmers use statistics to find the average yield per hectare across different plots to determine the best seeds.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-math-14',
    subject: 'Mathematics',
    chapterId: '10-math-14',
    title: "Probability",
    summary: "The math of chance. Master theoretical probability, outcomes, and the logic of events.",
    visuals: [
      {
        type: 'model',
        title: 'Theoretical Probability',
        desc: 'P(E) = Number of favorable outcomes / Total possible outcomes. Range is always 0 to 1.',
        icon: '🎲'
      },
      {
        type: 'model',
        title: 'Surely & Impossible',
        desc: 'Probability of a sure event is 1. Probability of an impossible event is 0.',
        icon: '⚪'
      },
      {
        type: 'model',
        title: 'Complementary Events',
        desc: 'P(E) + P(Not E) = 1. If the chance of rain is 0.3, the chance of no rain is 0.7.',
        icon: '🌓'
      },
      {
        type: 'model',
        title: 'Equally Likely Outcomes',
        desc: 'Understanding symmetry in coins, dice, and deck of cards.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Sample Space mapping',
        desc: 'Listing all possible outcomes for complex events like throwing two dice.',
        icon: '🗺️'
      },
      {
        type: 'model',
        title: 'Deck of Cards Logic',
        desc: 'Mastering the 52-card grid: 4 suits, face cards, and probability of specific draws.',
        icon: '🃏'
      },
      {
        type: 'model',
        title: 'Elementary Events',
        desc: 'Events that have only one outcome. The sum of probabilities of all elementary events is 1.',
        icon: '1️⃣'
      },
      {
        type: 'model',
        title: 'At least vs At most',
        desc: 'Logical distinction in probability questions that usually confuses students.',
        icon: '❓'
      },
      {
        type: 'model',
        title: 'Experimental Probability',
        desc: 'Based on actual trials and observations (relative frequency).',
        icon: '⚗️'
      },
      {
        type: 'model',
        title: 'Monty Hall Paradox',
        desc: 'A fun real-world example of how conditional probability can be counter-intuitive.',
        icon: '🚪'
      }
    ],
    examples: [
      {
        scenario: 'Insurance Risk',
        details: 'Actuaries use probability to calculate the chance of accidents or health issues to set premium rates.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-phy-1',
    subject: 'Physics',
    chapterId: '10-phy-1',
    title: "Light - Reflection and Refraction",
    summary: "The master guide to physical optics. From the fundamental laws of reflection to the advanced wave-particle duality and complex lens systems.",
    visuals: [
      {
        type: 'model',
        title: 'Light as a Wave & Particle',
        desc: 'Light behaves as both a wave (interference) and a particle (photoelectric effect). This is the foundation of Quantum Physics.',
        icon: '🌊'
      },
      {
        type: 'model',
        title: 'Laws of Reflection',
        desc: '1. Incident, Reflected, and Normal lie in the same plane. 2. Angle of Incidence (i) = Angle of Reflection (r).',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Spherical Mirrors: Terminology',
        desc: 'Pole (P), Center of Curvature (C), Radius (R), and Principal Focus (F). R = 2f.',
        icon: '📍'
      },
      {
        type: 'model',
        title: 'Concave: Image Formation',
        desc: 'Depending on U (Object distance), image can be real/inverted or virtual/erect. Used in headlamps and solar furnaces.',
        icon: '🔦'
      },
      {
        type: 'model',
        title: 'Convex: Global Field',
        desc: 'Always virtual, erect, and diminished. This wide-angle property is essential for security mirrors.',
        icon: '👀'
      },
      {
        type: 'model',
        title: 'Mirror Formula (Calculations)',
        desc: '1/v + 1/u = 1/f. Sign convention is critical: distances in direction of incident light are positive.',
        icon: '🧮'
      },
      {
        type: 'model',
        title: 'Linear Magnification',
        desc: 'm = height of image / height of object = -v/u. Tells you if the image is enlarged or diminished.',
        icon: '🔎'
      },
      {
        type: 'model',
        title: 'Refractive Index (Absolute)',
        desc: 'n = speed of light in vacuum / speed of light in medium. Water (1.33), Glass (1.5), Diamond (2.42).',
        icon: '🧊'
      },
      {
        type: 'model',
        title: 'Relative Refractive Index',
        desc: 'n₂₁ = n₂ / n₁. How much light bends when moving between TWO different media like water and glass.',
        icon: '📊'
      },
      {
        type: 'model',
        title: 'Snell\'s Law of Refraction',
        desc: 'n₁ sin i = n₂ sin r. Predicts the exact bending angle when light crosses boundaries.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Lateral Displacement',
        desc: 'The perpendicular distance between the incident and emergent rays when light passes through a rectangular glass slab.',
        icon: '↔️'
      },
      {
        type: 'model',
        title: 'Atmospheric Refraction',
        desc: 'The reason why stars twinkle and why the sun appears flattened at sunset.',
        icon: '🌌'
      },
      {
        type: 'model',
        title: 'Total Internal Reflection (TIR)',
        desc: 'When i > critical angle, light is 100% reflected back into the denser medium. Used in fiber optics.',
        icon: '💠'
      },
      {
        type: 'model',
        title: 'Mirage & Sparkling Diamonds',
        desc: 'Applications of TIR and refraction. Mirages are optical illusions in hot deserts.',
        icon: '🐫'
      },
      {
        type: 'model',
        title: 'Lens Maker\'s Formula',
        desc: '1/f = (n-1)(1/R₁ - 1/R₂). Used by optical engineers to design glasses and telescopes.',
        icon: '👓'
      },
      {
        type: 'model',
        title: 'Lens Power in Combination',
        desc: 'P_total = P₁ + P₂ + P₃... This allows for complex zoom lenses in cameras.',
        icon: '📷'
      },
      {
        type: 'model',
        title: 'Spherical Aberration',
        desc: 'The failure of a lens to focus all light rays to the exact same point, causing blurriness at edges.',
        icon: '🌫️'
      }
    ],
    examples: [
      {
        scenario: 'The Swimming Pool Depth',
        details: 'The bottom of a pool appears shallower than it is. Apparent Depth = Real Depth / n.'
      },
      {
        scenario: 'Fiber Optic Cable',
        details: 'Light pulses bounce inside glass cores via TIR, carrying data at the speed of light across continents.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '12-chem-1',
    subject: 'Chemistry',
    chapterId: '12-chem-1',
    title: "Electrochemistry",
    summary: "The intersection of electricity and molecules. Master the Nernst equation, electrolytic cells, and the chemistry of power.",
    visuals: [
      {
        type: 'model',
        title: 'Galvanic (Voltaic) Cell',
        desc: 'Converts chemical energy into electrical energy. Oxidation at Anode (-), Reduction at Cathode (+).',
        icon: '🔋'
      },
      {
        type: 'model',
        title: 'Salt Bridge',
        desc: 'Maintains electrical neutrality and completes the circuit using an inert electrolyte like KCl.',
        icon: '🌉'
      },
      {
        type: 'model',
        title: 'Standard Hydrogen Electrode',
        desc: 'The reference point for measuring electrode potentials. Assigned 0.00 Volts.',
        icon: '🎈'
      },
      {
        type: 'model',
        title: 'Nernst Equation',
        desc: 'Calculates electrode potential under non-standard conditions. E = E° - (RT/nF) ln Q.',
        icon: '📉'
      },
      {
        type: 'model',
        title: 'Gibbs Energy & Cell Potential',
        desc: 'ΔG = -nFE_cell. If E_cell is positive, the reaction is spontaneous.',
        icon: '🔥'
      },
      {
        type: 'model',
        title: 'Electrolysis of Water',
        desc: 'Passing current to split H₂O into Hydrogen (at cathode) and Oxygen (at anode).',
        icon: '💧'
      },
      {
        type: 'model',
        title: 'Faraday\'s Laws',
        desc: 'The amount of substance produced is proportional to the total electricity (Q=It) passed.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Fuel Cells',
        desc: 'Cells that convert fuel (Hydrogen) and oxidant (Oxygen) directly into water and electricity.',
        icon: '🚀'
      },
      {
        type: 'model',
        title: 'Corrosion: Electro-Chemical',
        desc: 'Rusting is an electrochemical process where iron acts as an anode and oxygen is reduced at the cathode.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Lead Storage Battery',
        desc: 'The secondary cell used in cars. Discharging and Recharging involves Pb and PbO₂.',
        icon: '🚒'
      }
    ],
    examples: [
      {
        scenario: 'Li-ion Batteries',
        details: 'The technology in your phone. Reversible lithium intercalation allows for hundreds of charge cycles.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-chem-2',
    subject: 'Chemistry',
    chapterId: '12-chem-2',
    title: "Chemical Kinetics",
    summary: "The speed of science. Master rate laws, collision theory, and the math of activation energy.",
    visuals: [
      {
        type: 'model',
        title: 'Average vs Instantaneous Rate',
        desc: 'Average rate is over a long interval; Instantaneous is at a specific second (the slope of Tangent).',
        icon: '⏱️'
      },
      {
        type: 'model',
        title: 'Order of Reaction',
        desc: 'The sum of powers of concentrations in the Rate Law equation. Can be 0, 1, 2 or even fractional.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Zero Order Reactions',
        desc: 'Rate is independent of reactant concentration. Common in surface-catalyzed reactions.',
        icon: '0️⃣'
      },
      {
        type: 'model',
        title: 'First Order Kinetics',
        desc: 'Rate depends linearly on concentration. Half-life (t1/2) is constant, a hallmark of radioactivity.',
        icon: '⏳'
      },
      {
        type: 'model',
        title: 'Activation Energy (Ea)',
        desc: 'The minimum energy required for a chemical reaction to occur. The "Mountain" atoms must climb.',
        icon: '🧗'
      },
      {
        type: 'model',
        title: 'Arrhenius Equation',
        desc: 'Shows how rate increases exponentially with temperature. k = A e^(-Ea/RT).',
        icon: '🌡️'
      },
      {
        type: 'model',
        title: 'Catalysts: The Tunnel',
        desc: 'Substances that speed up reactions by providing an alternative path with lower Activation Energy.',
        icon: '🚇'
      },
      {
        type: 'model',
        title: 'Collision Theory',
        desc: 'Molecules must collide with sufficient energy AND correct orientation to react.',
        icon: '💥'
      },
      {
        type: 'model',
        title: 'Pseudo First Order',
        desc: 'A higher order reaction that behaves like first order (e.g., Inversion of cane sugar in presence of excess water).',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Molecularity',
        desc: 'Number of reacting species that collide simultaneously. Always a whole number (1, 2, 3).',
        icon: '🔢'
      }
    ],
    examples: [
      {
        scenario: 'Food spoilage',
        details: 'Storing food in a fridge slows down the kinetic rate of bacterial growth by lowering T.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-chem-3',
    subject: 'Chemistry',
    chapterId: '10-chem-3',
    title: "Metals and Non-metals",
    summary: "Structural foundations of matter. Master the reactivity series, ionic bonding, and metallurgy.",
    visuals: [
      {
        type: 'model',
        title: 'Reactivity Series',
        desc: 'ranking metals from most to least reactive. Potassium at the top, Gold at the bottom.',
        icon: '⛓️'
      },
      {
        type: 'model',
        title: 'Ionic Bonding',
        desc: 'Transfer of electrons from a metal to a non-metal, forming strong electrostatic attractions.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Physical Properties of Metals',
        desc: 'Malleability, Ductility, Lustre, and high thermal/electrical conductivity.',
        icon: '🔨'
      },
      {
        type: 'model',
        title: 'Physical Properties of Non-metals',
        desc: 'Brittle, non-lustrous (except iodine), and poor conductors (except graphite).',
        icon: '🌑'
      },
      {
        type: 'model',
        title: 'Amphoteric Oxides',
        desc: 'Metal oxides like Al₂O₃ that react with both acids and bases to produce salt and water.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Aqua Regia: The King\'s Water',
        desc: 'A mixture of conc. HCl and conc. HNO₃ in 3:1 ratio that can dissolve gold and platinum.',
        icon: '👑'
      },
      {
        type: 'model',
        title: 'Metallurgy: Basic Steps',
        desc: 'Enrichment of ore, reduction to metal, and electrolytic refining.',
        icon: '🏗️'
      },
      {
        type: 'model',
        title: 'Roaming Free: Native State',
        desc: 'Highly unreactive metals like Gold and Silver found in their pure form in nature.',
        icon: '✨'
      },
      {
        type: 'model',
        title: 'Alloys: Better Properties',
        desc: 'Homogeneous mixtures of metals (like Brass, Bronze, Steel) to increase strength and resist corrosion.',
        icon: '🖇️'
      },
      {
        type: 'model',
        title: 'Anodising Aluminum',
        desc: 'Forming a thick oxide layer to prevent further corrosion and for decorative purposes.',
        icon: '🛡️'
      }
    ],
    examples: [
      {
        scenario: 'Aluminum Smelting',
        details: 'Extracting aluminum from bauxite ore using electrolysis, a process that revolutionized modern manufacturing.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-phy-4',
    subject: 'Physics',
    chapterId: '10-phy-4',
    title: "The Human Eye and the Colorful World",
    summary: "The physics of vision and light. Master eye structure, defects of vision, dispersion, and atmospheric refraction.",
    visuals: [
      {
        type: 'model',
        title: 'Eye Structure & Accommodation',
        desc: 'The Ciliary muscles adjust the lens curvature to focus on near or far objects (Power of Accommodation). The Retina acts as the screen where light is converted into neural signals.',
        icon: '👁️'
      },
      {
        type: 'model',
        title: 'Vision Defects: Myopia',
        desc: 'Nearsightedness. The eyeball is too long or lens too curved, focusing images IN FRONT of the retina. Corrected with a Concave (Diverging) lens.',
        icon: '👓'
      },
      {
        type: 'model',
        title: 'Dispersion: Inside the Prism',
        desc: 'White light splits into 7 colors (VIBGYOR) because different colors travel at different speeds in glass. Red bends the least, Violet bends the most.',
        icon: '🌈'
      },
      {
        type: 'model',
        title: 'Atmospheric Refraction',
        desc: 'Layers of air have different temperatures and densities, bending light constantly. This makes stars twinkle and allows us to see the sun 2 minutes before it actually rises.',
        icon: '🌃'
      },
      {
        type: 'model',
        title: 'Tyndall Effect & Scattering',
        desc: 'Tiny particles scatter light. Fine particles scatter blue light (why the sky is blue); large particles scatter all colors (why clouds are white).',
        icon: '☀️'
      },
      {
        type: 'model',
        title: 'Hypermetropia (Farsightedness)',
        desc: 'Focus falls behind the retina. Corrected with a Convex (Converging) lens of appropriate power.',
        icon: '🧐'
      },
      {
        type: 'model',
        title: 'Primary Colors of Light',
        desc: 'Red, Green, and Blue. Mixing them creates all other colors, including white.',
        icon: '🔴'
      },
      {
        type: 'model',
        title: 'The Iris & Pupil Control',
        desc: 'The iris acts as a variable aperture that controls the amount of light entering the eye through the pupil.',
        icon: '⚙️'
      },
      {
        type: 'model',
        title: 'Presbyopia (Old Eye)',
        desc: 'Loss of lens flexibility due to aging. Requires bifocal lenses for correction.',
        icon: '👴'
      },
      {
        type: 'model',
        title: 'The Rainbow Formation',
        desc: 'A combination of dispersion, refraction, and internal reflection within water droplets.',
        icon: '💧'
      }
    ],
    examples: [
      {
        scenario: 'Early Sunrise',
        details: 'Atmospheric refraction lets us see the sun 2 minutes before it actually crosses the horizon.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-bio-1',
    subject: 'Biology',
    chapterId: '10-bio-1',
    title: "Life Processes",
    summary: "How living systems maintain themselves. A deep dive into Nutrition, Respiration, Transportation, and Excretion with physiological precision.",
    visuals: [
      {
        type: 'model',
        title: 'Photosynthesis: Solar Panel',
        desc: 'Plants convert CO₂, water, and sunlight into glucose and oxygen. Occurs in Chloroplasts using Chlorophyll.',
        icon: '🍃'
      },
      {
        type: 'model',
        title: 'Stomata: Gas Exchange',
        desc: 'Tiny pores on leaf surfaces. Guard cells control their opening for CO₂ intake and water vapor release (Transpiration).',
        icon: '🕳️'
      },
      {
        type: 'model',
        title: 'Alimentary Canal',
        desc: 'The human digestive track from mouth to anus. Digestion involves mechanical and chemical breakdown by enzymes.',
        icon: '🥨'
      },
      {
        type: 'model',
        title: 'The Stomach: Acid Vat',
        desc: 'Secretes HCl (kills bacteria) and Pepsin (protein digestion). The mucus lining protects the stomach from self-digestion.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Small Intestine: Villi',
        desc: 'Primary site of absorption. Finger-like Villi increase surface area for maximum nutrient uptake into blood.',
        icon: '🧶'
      },
      {
        type: 'model',
        title: 'Aerobic vs Anaerobic',
        desc: 'Aerobic: Breakdown with O₂ (38 ATP). Anaerobic: Breakdown without O₂ (Lactic acid in muscles or Ethanol in yeast).',
        icon: '💨'
      },
      {
        type: 'model',
        title: 'The Human Heart: 4 Chambers',
        desc: 'Double circulation separates oxygenated and deoxygenated blood, ensuring high efficiency for warm-blooded animals.',
        icon: '❤️'
      },
      {
        type: 'model',
        title: 'Arteries vs Veins',
        desc: 'Arteries carry blood away from heart (thick walls). Veins carry blood towards heart (valves prevent backflow).',
        icon: '🩸'
      },
      {
        type: 'model',
        title: 'Xylem vs Phloem',
        desc: 'Xylem: Transports water/minerals upwards (unidirectional). Phloem: Transports food downwards/upwards (bidirectional).',
        icon: '🌱'
      },
      {
        type: 'model',
        title: 'Excretion: The Nephron',
        desc: 'Functional unit of kidney. Filters blood by removing nitrogenous waste (Urea) through filtration and reabsorption.',
        icon: '💧'
      },
      {
        type: 'model',
        title: 'Mitochondria: Powerhouse',
        desc: 'Site of cellular respiration where glucose is oxidized to form ATP (Adenosine Triphosphate).',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Salivary Amylase',
        desc: 'Enzyme in saliva that breaks down starch into simpler sugars like maltose.',
        icon: '🥣'
      },
      {
        type: 'model',
        title: 'Pancreatic Enzymes',
        desc: 'Trypsin (proteins), Lipase (fats), and Amylase (carbohydrates) finish digestion in the small intestine.',
        icon: '🧬'
      },
      {
        type: 'model',
        title: 'ATP: Energy Currency',
        desc: 'Short-term energy storage molecule. Breaking the final phosphate bond releases energy for metabolism.',
        icon: '🔋'
      },
      {
        type: 'model',
        title: 'Hemoglobin',
        desc: 'Respiratory pigment in RBCs. It has a high affinity for Oxygen, carrying it to every cell in the body.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Liver: Chemical Factory',
        desc: 'Secretes Bile (emulsifies fats) and stores glycogen. The largest gland in the human body.',
        icon: '🧼'
      },
      {
        type: 'model',
        title: 'Capillaries: The Exchange',
        desc: 'The thinnest blood vessels where diffusion of gases, nutrients, and waste between blood and tissues occurs.',
        icon: '🕸️'
      },
      {
        type: 'model',
        title: 'Translocation',
        desc: 'The transport of soluble products of photosynthesis (sucrose) through the phloem to all plant parts.',
        icon: '🚚'
      },
      {
        type: 'model',
        title: 'Dialysis: Artificial Filter',
        desc: 'A medical procedure to filter blood when kidneys fail, using a semi-permeable membrane and osmotic pressure.',
        icon: '🏥'
      }
    ],
    examples: [
      {
        scenario: 'Muscle Cramps',
        details: 'During intense exercise, lack of oxygen forced anaerobic respiration, producing lactic acid which caused the sharp pain.'
      },
      {
        scenario: 'Dialysis',
        details: 'When kidneys fail, an Artificial Kidney machine filters blood using selectively permeable tubes in a dialyzing fluid.'
      },
      {
        scenario: 'Root Pressure',
        details: 'At night, water absorption continues, creating pressure that pushes water up the xylem when transpiration is low.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-chem-1',
    subject: 'Chemistry',
    chapterId: '10-chem-1',
    title: "Chemical Reactions and Equations",
    summary: "The grammar of chemistry. Master the art of balancing equations, identifying reaction types, and observing chemical transformations.",
    visuals: [
      {
        type: 'model',
        title: 'Combination Reaction',
        desc: 'Two or more substances combine to form a single product. Example: Burning of coal or formation of water.',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Decomposition Reaction',
        desc: 'A single reactant breaks down into multiple products. Requires energy (Thermal, Electrolytic, or Photolytic).',
        icon: '✂️'
      },
      {
        type: 'model',
        title: 'Displacement Reaction',
        desc: 'A more reactive element kicks out a less reactive element from its compound. Based on the reactivity series.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Double Displacement',
        desc: 'Exchange of ions between two reactants to form new compounds. Often results in a precipitate.',
        icon: '🔀'
      },
      {
        type: 'model',
        title: 'Redox: Oxidation & Reduction',
        desc: 'Oxidation: Addition of Oxygen / Removal of Hydrogen. Reduction: Removal of Oxygen / Addition of Hydrogen.',
        icon: '🌗'
      },
      {
        type: 'model',
        title: 'Exothermic Reactions',
        desc: 'Reactions that release heat to the surroundings. Respiration and burning of natural gas are major examples.',
        icon: '🔥'
      },
      {
        type: 'model',
        title: 'Endothermic Reactions',
        desc: 'Reactions that absorb heat/energy. Photosynthesis and thermal decomposition of calcium carbonate.',
        icon: '❄️'
      },
      {
        type: 'model',
        title: 'Precipitation',
        desc: 'Formation of an insoluble solid during a double displacement reaction. Useful in laboratory identification.',
        icon: '🌨️'
      },
      {
        type: 'model',
        title: 'Corrosion of Iron (Rust)',
        desc: 'Oxidation of iron in the presence of moisture and air. Prevented by painting, oiling, or galvanizing.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Rancidity',
        desc: 'Oxidation of fats and oils in food, leading to unpleasant smell and taste. Prevented by antioxidants or nitrogen flushing.',
        icon: '🍕'
      },
      {
        type: 'model',
        title: 'Thermal Decomposition',
        desc: 'Heating lead nitrate or ferrous sulphate crystals to see gas evolution and color changes.',
        icon: '🌡️'
      },
      {
        type: 'model',
        title: 'Photolytic Decomposition',
        desc: 'Silver chloride turning grey in sunlight due to the release of chlorine gas. Used in black & white photography.',
        icon: '☀️'
      },
      {
        type: 'model',
        title: 'Balancing Equations',
        desc: 'Ensuring the Law of Conservation of Mass is followed by having equal atoms on both sides.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Catalysts in Reactions',
        desc: 'Substances that speed up chemical changes without being consumed themselves (e.g., enzymes in digestion).',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Evolution of Gas',
        desc: 'Common observation like Hydrogen gas pop-test when zinc reacts with dilute sulphuric acid.',
        icon: '💭'
      },
      {
        type: 'model',
        title: 'Change in State/Color',
        desc: 'Visual evidence of chemical change, like the blue copper sulphate turning green in an iron displacement reaction.',
        icon: '🎨'
      }
    ],
    examples: [
      {
        scenario: 'Magnesium Ribbon',
        details: 'Burning a magnesium ribbon in air produces a dazzling white flame and white powder (Magnesium Oxide).'
      },
      {
        scenario: 'Quicklime & Water',
        details: 'Adding water to quicklime (CaO) produces slaked lime [Ca(OH)₂] and releases a large amount of heat.'
      },
      {
        scenario: 'Bacteriology of Chips',
        details: 'Potato chips bags are flushed with nitrogen gas to prevent rancidity (oxidation of oils).'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-chem-2',
    subject: 'Chemistry',
    chapterId: '10-chem-2',
    title: "Acids, Bases and Salts",
    summary: "The chemistry of ions. Master indicators, pH scale, and the properties of common salts like baking soda and bleaching powder.",
    visuals: [
      {
        type: 'model',
        title: 'The Chemical Indicators',
        desc: 'Nature\'s warning signs. Litmus turns red in acid, blue in base. Turmeric turns red in base. Olfactory indicators (onion, vanilla) change smell.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'The Power of pH',
        desc: 'A scale from 0 to 14 measuring H+ ion concentration. pH 7 is neutral (Pure water). pH < 7 is Acidic (Lemon); pH > 7 is Basic (Milk of Magnesia).',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Neutralization: Balance',
        desc: 'Acid + Base → Salt + Water. HCl + NaOH → NaCl + H₂O. Energy is released in this exothermic reaction.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Baking Soda: The Leavener',
        desc: 'Sodium Hydrogen Carbonate (NaHCO₃). When heated, it releases CO₂ gas, which makes cakes and bread rise and become fluffy.',
        icon: '🧁'
      },
      {
        type: 'model',
        title: 'Plaster of Paris',
        desc: 'CaSO₄·½H₂O. Obtained by heating Gypsum. On mixing with water, it sets back into a hard solid mass (Gypsum), used for fractures and toys.',
        icon: '🏗️'
      },
      {
        type: 'model',
        title: 'Bleaching Powder',
        desc: 'CaOCl₂. Used for disinfecting drinking water and bleaching cotton in the textile industry.',
        icon: '⚪'
      },
      {
        type: 'model',
        title: 'Washing Soda',
        desc: 'Na₂CO₃·10H₂O. Used in glass, soap, and paper industries and for removing permanent hardness of water.',
        icon: '🧼'
      },
      {
        type: 'model',
        title: 'Strong vs Weak Acids',
        desc: 'Strong acids (HCl) ionize completely in water; weak acids (Acetic acid) ionize only partially.',
        icon: '🧊'
      },
      {
        type: 'model',
        title: 'Chlor-Alkali Process',
        desc: 'Electrolysis of brine (NaCl solution) to produce Chlorine gas, Hydrogen gas, and Sodium Hydroxide.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Salts of Strong/Weak combos',
        desc: 'Understanding why some salts (like NH4Cl) are acidic while others (like CH3COONa) are basic.',
        icon: '🧂'
      }
    ],
    examples: [
      {
        scenario: 'Antacid Relief',
        details: 'Drinking Magnesium Hydroxide (Milk of Magnesia) to neutralize excess HCl in the stomach and cure acidity.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-bio-2',
    subject: 'Biology',
    chapterId: '10-bio-2',
    title: "Control and Coordination",
    summary: "The neural and hormonal control systems of life. Understand how the brain, spine, and glands work together to respond to the environment.",
    visuals: [
      {
        type: 'model',
        title: 'The Neuron: Bio-Wire',
        desc: 'Structural unit of the nervous system. Dendrites receive signals, Axon transmits them via electrical impulses.',
        icon: '🕸️'
      },
      {
        type: 'model',
        title: 'Reflex Action & Arc',
        desc: 'Sudden response to stimulus. Signal goes to spinal cord and back immediately, bypassing brain for speed.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'The Human Brain',
        desc: 'Forebrain (thinking), Midbrain (reflexes), Hindbrain (Cerebellum, Medulla, Pons).',
        icon: '🧠'
      },
      {
        type: 'model',
        title: 'Cerebrum: Intellect',
        desc: 'Part of forebrain responsible for memory, learning, reasoning, and sensing environment.',
        icon: '💭'
      },
      {
        type: 'model',
        title: 'Cerebellum: Balance',
        desc: 'Controls voluntary actions that require precision, like walking in a straight line or riding a bicycle.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Medulla: Vitals',
        desc: 'Controls involuntary actions like heartbeat, breathing, blood pressure, and salivation.',
        icon: '💓'
      },
      {
        type: 'model',
        title: 'Endocrine Glands',
        desc: 'Ductless glands that secrete hormones directly into the bloodstream for long-distance signaling.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Adrenaline: Fight/Flight',
        desc: 'Hormone from Adrenal glands that increases heart rate and blood flow to muscles during stress.',
        icon: '🏃'
      },
      {
        type: 'model',
        title: 'Insulin & Diabetes',
        desc: 'Pancreas hormone that regulates blood sugar. Deficiency leads to High Blood Sugar (Diabetes).',
        icon: '🩸'
      },
      {
        type: 'model',
        title: 'Growth Hormone',
        desc: 'Pituitary gland hormone. Excess leads to Gigantism; deficiency leads to Dwarfism.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'Testosterone & Estrogen',
        desc: 'Hormones responsible for secondary sexual characteristics in males and females respectively.',
        icon: '🚻'
      },
      {
        type: 'model',
        title: 'Plant Hormones: Auxin',
        desc: 'Promotes cell elongation. Responsible for Phototropism (growth towards light).',
        icon: '🌞'
      },
      {
        type: 'model',
        title: 'Abscisic Acid (ABA)',
        desc: 'Growth-inhibiting plant hormone. Causes wilting of leaves and dormancy of seeds.',
        icon: '🍂'
      },
      {
        type: 'model',
        title: 'Geotropism',
        desc: 'Growth movement of plant parts towards (roots) or away from (shoots) the earth\'s gravity.',
        icon: '🌍'
      },
      {
        type: 'model',
        title: 'Synapse',
        desc: 'The tiny gap between two neurons where electrical signals convert to chemical signals (Neurotransmitters).',
        icon: '🌉'
      }
    ],
    examples: [
      {
        scenario: 'Sugar Rush',
        details: 'After eating a cake, blood sugar spikes. The pancreas detects this and releases Insulin to bring it down.'
      },
      {
        scenario: 'Hot Plate Reflex',
        details: 'Touching a 100°C plate causes you to pull back in 0.1s. The reflex arc processed this in the spinal cord, not the brain.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-chem-4',
    subject: 'Chemistry',
    chapterId: '10-chem-4',
    title: "Carbon and its Compounds",
    summary: "The versatile chemistry of the life-giving atom. Master covalent bonding, functional groups, and the logic of organic nomenclature.",
    visuals: [
      {
        type: 'model',
        title: 'Tetravalency of Carbon',
        desc: 'Carbon has 4 valence electrons. It can form 4 bonds, allowing it to create large, complex chains and rings.',
        icon: '🔗'
      },
      {
        type: 'model',
        title: 'Covalent Bonding',
        desc: 'Bonding by sharing electron pairs. Results in poor conductivity because there are no free ions or electrons.',
        icon: '🤝'
      },
      {
        type: 'model',
        title: 'Allotropes: Graphite vs Diamond',
        desc: 'Same atoms, different structure. Diamond is the hardest (3D network); Graphite is slippery and conducts electricity (hexagonal layers).',
        icon: '💎'
      },
      {
        type: 'model',
        title: 'Versatile Nature: Catention',
        desc: 'The unique ability of carbon to form bonds with other carbon atoms to give rise to large molecules.',
        icon: '⛓️'
      },
      {
        type: 'model',
        title: 'Functional Groups',
        desc: 'Oxygen, Nitrogen, or Halogens attached to carbon chains. Alcohols (-OH), Aldehydes (-CHO), Carboxylic Acids (-COOH) define chemical behavior.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Homologous Series',
        desc: 'A family of compounds with the same functional group and a constant CH₂ difference between neighbors.',
        icon: '👪'
      },
      {
        type: 'model',
        title: 'Nomenclature (IUPAC)',
        desc: 'The systematic naming of organic compounds based on their structure and functional groups.',
        icon: '🏷️'
      },
      {
        type: 'model',
        title: 'Soaps & Detergents: Micelles',
        desc: 'Hydrophilic heads and hydrophobic tails. They trap oil/dirt in a cluster (Micelle) that can be washed away by water.',
        icon: '🧼'
      },
      {
        type: 'model',
        title: 'Substitution Reaction',
        desc: 'In saturated hydrocarbons, chlorine can replace hydrogen atoms one by one in the presence of sunlight.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Addition Reaction',
        desc: 'Unsaturated hydrocarbons (alkenes/alkynes) add hydrogen in the presence of catalysts to become saturated.',
        icon: '➕'
      }
    ],
    examples: [
      {
        scenario: 'Ethanol',
        details: 'Commonly called alcohol. A good solvent and used in medicines. Reaction with sodium releases hydrogen gas.'
      },
      {
        scenario: 'Vinegar',
        details: 'A 5-8% solution of acetic acid (ethanoic acid) in water. Used as a preservative in pickles.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-bio-3',
    subject: 'Biology',
    chapterId: '10-bio-3',
    title: "How do Organisms Reproduce?",
    summary: "The blueprint of continuity. From simple cellular division to the complex dance of sexual reproduction and human health.",
    visuals: [
      {
        type: 'model',
        title: 'Asexual: Fission & Budding',
        desc: 'Binary fission in Amoeba, Budding in Hydra. Parent clones itself without requiring a second partner.',
        icon: '🔘'
      },
      {
        type: 'model',
        title: 'Fragmentation & Regeneration',
        desc: 'When an organism breaks (Planaria), each piece grows into a full new individual. Regeneration is limited in humans (Liver only).',
        icon: '🧩'
      },
      {
        type: 'model',
        title: 'DNA Copying',
        desc: 'Reproduction starts with copying blueprints. Small variations during copying lead to evolution.',
        icon: '🧬'
      },
      {
        type: 'model',
        title: 'Flower Power: Sexual Reproduction',
        desc: 'Stamen (male) and Carpel (female). Pollination brings pollen to the stigma, leading to fertilization and seeds.',
        icon: '🌸'
      },
      {
        type: 'model',
        title: 'Human Male System',
        desc: 'Testes produce sperm and testosterone. Vas deferens carries sperm to the urethra.',
        icon: '♂️'
      },
      {
        type: 'model',
        title: 'Human Female System',
        desc: 'Ovaries produce eggs and estrogen. Uterus is where the baby develops if fertilization occurs.',
        icon: '♀️'
      },
      {
        type: 'model',
        title: 'Menstruation Cycle',
        desc: 'The monthly cycle where the uterine lining thickens to prepare for a baby. If eggs aren\'t fertilized, the lining breaks down.',
        icon: '📅'
      },
      {
        type: 'model',
        title: 'Reproductive Health',
        desc: 'Methods of contraception (barrier, hormonal) to prevent STDs and manage family size.',
        icon: '🏥'
      }
    ],
    examples: [
      {
        scenario: 'Tissue Culture',
        details: 'Growing new plants from tiny pieces of parent tissue in an artificial medium. Used for orchids and ornamental plants.'
      },
      {
        scenario: 'Placenta',
        details: 'A special tissue that connects the baby to the mother, providing oxygen and nutrients while removing waste.',
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-math-1',
    subject: 'Mathematics',
    chapterId: '11-math-1',
    title: "Sets",
    summary: "The foundation of modern math. Master the logic of collections, Venn diagrams, and set operations.",
    visuals: [
      {
        type: 'model',
        title: 'Defining a Set',
        desc: 'A well-defined collection of distinct objects. Described using Roster form {1, 2, 3} or Set-builder form {x | x is a prime}.',
        icon: '📂'
      },
      {
        type: 'model',
        title: 'Empty & Singleton Sets',
        desc: 'The Null set (Φ) contains nothing. Singleton sets contain exactly one element.',
        icon: '🕳️'
      },
      {
        type: 'model',
        title: 'Subsets & Power Sets',
        desc: 'If every element of A is in B, A is a subset of B. The Power set P(A) is the set of all possible subsets.',
        icon: '📦'
      },
      {
        type: 'model',
        title: 'Universal Set',
        desc: 'The "Universe" (U) that contains all objects under consideration in a particular context.',
        icon: '🌌'
      },
      {
        type: 'model',
        title: 'Union & Intersection',
        desc: 'A ∪ B: Elements in A OR B. A ∩ B: Elements in A AND B (the overlaps).',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Complement of a Set',
        desc: 'A\': All elements in the Universal set that are NOT in set A.',
        icon: '🚫'
      },
      {
        type: 'model',
        title: 'Venn Diagrams',
        desc: 'Visual representation using circles to show relations between sets.',
        icon: '⭕'
      }
    ],
    examples: [
      {
        scenario: 'Numerical Proof',
        details: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B). Essential for probability and counting problems.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '11-chem-1',
    subject: 'Chemistry',
    chapterId: '11-chem-1',
    title: "Some Basic Concepts of Chemistry",
    summary: "The fundamental foundation. Master the SI system, mass conservation, and the absolute logic of the mole concept.",
    visuals: [
      {
        type: 'model',
        title: 'Precision & Accuracy',
        desc: 'Accuracy is how close you are to the true value. Precision is how close your repeated measurements are to each other.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Significant Figures',
        desc: 'Rules for counting digits that carry meaning. Non-zeros are always significant; leading zeros are not.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Law of Conservation of Mass',
        desc: 'Lavoisier\'s law: Matter is neither created nor destroyed in a chemical reaction.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Law of Definite Proportions',
        desc: 'A compound always contains exactly the same proportion of elements by mass.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Dalton\'s Atomic Theory',
        desc: 'Matter consists of indivisible atoms. Atoms of a given element are identical in mass.',
        icon: '⚛️'
      },
      {
        type: 'model',
        title: 'Mole: The Bridge',
        desc: '6.022 × 10²³ particles. 1 mole of any substance has a mass equal to its atomic/molecular weight in grams.',
        icon: '🌉'
      },
      {
        type: 'model',
        title: 'Molar Volume',
        desc: 'At STP, 1 mole of any gas occupies exactly 22.7 Litres.',
        icon: '🎈'
      },
      {
        type: 'model',
        title: 'Percentage Composition',
        desc: 'Calculating the mass percentage of each element in a compound to find its formula.',
        icon: '🍰'
      },
      {
        type: 'model',
        title: 'Empirical vs Molecular Formula',
        desc: 'Empirical is the simplest whole number ratio; Molecular is the actual number of atoms.',
        icon: '📝'
      },
      {
        type: 'model',
        title: 'Stoichiometry',
        desc: 'Calculating the quantities of reactants and products in a balanced chemical equation.',
        icon: '🧮'
      },
      {
        type: 'model',
        title: 'Limiting Reagent',
        desc: 'The reactant that gets consumed first, limiting the amount of product formed.',
        icon: '🛑'
      }
    ],
    examples: [
      {
        scenario: 'The Bunsen Burner',
        details: 'Calculating how much Oxygen is needed to burn 1 mole of Methane (CH₄ + 2O₂ → CO₂ + 2H₂O).'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-bio-1',
    subject: 'Biology',
    chapterId: '11-bio-1',
    title: "The Living World",
    summary: "Exploring the characteristics of life, taxonomy, and the systematic classification of organisms.",
    visuals: [
      {
        type: 'model',
        title: 'Definition of Living',
        desc: 'Growth, reproduction, ability to sense environment, and metabolism are key features of living organisms.',
        icon: '🦠'
      },
      {
        type: 'model',
        title: 'Metabolism',
        desc: 'The sum total of all chemical reactions occurring in a body. No non-living object exhibits metabolism.',
        icon: '♻️'
      },
      {
        type: 'model',
        title: 'Cellular Organization',
        desc: 'All living organisms are made of cells. This is the defining property of living beings.',
        icon: '🧫'
      },
      {
        type: 'model',
        title: 'Consciousness',
        desc: 'Ability to sense surroundings and respond to external stimuli (physical, chemical, or biological).',
        icon: '🧠'
      },
      {
        type: 'model',
        title: 'Biodiversity',
        desc: 'The number and types of organisms present on earth. Known species range between 1.7-1.8 million.',
        icon: '🌳'
      },
      {
        type: 'model',
        title: 'Nomenclature',
        desc: 'Standardizing names of organisms so they are known by the same name all over the world.',
        icon: '🏷️'
      },
      {
        type: 'model',
        title: 'Binomial Nomenclature',
        desc: 'System given by Carolus Linnaeus. Each name has two components: Generic name and Specific epithet.',
        icon: '✍️'
      },
      {
        type: 'model',
        title: 'Classification',
        desc: 'Process by which anything is grouped into convenient categories based on easily observable characters.',
        icon: '🗂️'
      },
      {
        type: 'model',
        title: 'Taxon',
        desc: 'Scientific term for these categories. E.g., Dogs, mammals, wheat, animals are all taxa.',
        icon: '🔍'
      },
      {
        type: 'model',
        title: 'Taxonomic Hierarchy',
        desc: 'Kingdom, Phylum, Class, Order, Family, Genus, Species. Species is the lowest category.',
        icon: '🪜'
      }
    ],
    examples: [
      {
        scenario: 'Mangifera indica',
        details: 'Scientific name for Mango. Mangifera represents the genus while indica represents the specific epithet.'
      },
      {
        scenario: 'Herbarium',
        details: 'A storehouse of collected plant specimens that are dried, pressed, and preserved on sheets.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-phy-1',
    subject: 'Physics',
    chapterId: '12-phy-1',
    title: "Electric Charges and Fields",
    summary: "The static world of electricity. Master Coulomb's force, electric flux, and the power of Gauss's Law.",
    visuals: [
      {
        type: 'model',
        title: 'Quantization of Charge',
        desc: 'Charge exists in discrete packets. q = ne, where e is the charge of an electron.',
        icon: '📦'
      },
      {
        type: 'model',
        title: 'Coulomb\'s Law',
        desc: 'Force between two charges is proportional to their product and inversely proportional to the square of distance.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Superposition Principle',
        desc: 'Total force on a charge is the vector sum of forces exerted by all other charges.',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Electric Field Lines',
        desc: 'Imaginary lines showing the path of a positive test charge. They never cross each other.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Electric Dipole',
        desc: 'Two equal and opposite charges separated by a small distance. Creates a unique field pattern.',
        icon: '↔️'
      },
      {
        type: 'model',
        title: 'Electric Flux (Φ)',
        desc: 'The total number of field lines passing through a surface. Φ = E · A cos θ.',
        icon: '🚿'
      },
      {
        type: 'model',
        title: 'Gauss\'s Law',
        desc: 'The total flux through a closed surface is equal to the net charge enclosed divided by ε₀.',
        icon: '🎩'
      },
      {
        type: 'model',
        title: 'Field due to Infinite Wire',
        desc: 'Uses Gauss\'s Law to show field drops off as 1/r from a long charged wire.',
        icon: '🧵'
      },
      {
        type: 'model',
        title: 'Field due to Charged Sheet',
        desc: 'The field is uniform and independent of distance near a large charged plane.',
        icon: '📄'
      },
      {
        type: 'model',
        title: 'Continuous Charge Dist',
        desc: 'Linear, Surface, and Volume charge densities (λ, σ, ρ) for calculating fields from large objects.',
        icon: '🌧️'
      },
      {
        type: 'model',
        title: 'Equipotential Surfaces',
        desc: 'Surfaces where the potential is same at all points. Work done in moving a charge is zero.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Van de Graaff Generator',
        desc: 'Device used to build up very high voltages using a moving belt and friction.',
        icon: '🎡'
      }
    ],
    examples: [
      {
        scenario: 'Static Shock',
        details: 'Walking on a carpet transfers electrons to your body. Touching a doorknob causes a rapid discharge.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-phy-2',
    subject: 'Physics',
    chapterId: '12-phy-2',
    title: "Current Electricity",
    summary: "The flow of energy. Master drift velocity, Kirchhoff's circuit laws, and the precision of the potentiometer.",
    visuals: [
      {
        type: 'model',
        title: 'Drift Velocity (vd)',
        desc: 'The average velocity with which free electrons drift towards the positive terminal under an electric field.',
        icon: '🏎️'
      },
      {
        type: 'model',
        title: 'Mobility (μ)',
        desc: 'Drift velocity per unit electric field. μ = vd / E.',
        icon: '🏃'
      },
      {
        type: 'model',
        title: 'Temperature Dependence',
        desc: 'Resistance of metals increases with temperature; semiconductors decrease (Negative Temperature Coefficient).',
        icon: '🌡️'
      },
      {
        type: 'model',
        title: 'Internal Resistance of Cell',
        desc: 'Resistance offered by the electrolyte inside a battery. Causes terminal voltage to be less than EMF.',
        icon: '🔋'
      },
      {
        type: 'model',
        title: 'Kirchhoff\'s First Law (KCL)',
        desc: 'The sum of currents entering a junction equals the sum of currents leaving (Conservation of Charge).',
        icon: '🕸️'
      },
      {
        type: 'model',
        title: 'Kirchhoff\'s Second Law (KVL)',
        desc: 'The algebraic sum of potential changes around any closed loop is zero (Conservation of Energy).',
        icon: '♻️'
      },
      {
        type: 'model',
        title: 'Wheatstone Bridge',
        desc: 'An arrangement of 4 resistors used to determine an unknown resistance when the bridge is balanced (Ig=0).',
        icon: '🌉'
      },
      {
        type: 'model',
        title: 'Meter Bridge',
        desc: 'Practical application of Wheatstone bridge. Uses a 1-meter wire to balance resistances.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Potentiometer',
        desc: 'A device for comparing EMFs and measuring internal resistance without drawing any current.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Cells in Combinations',
        desc: 'Series and Parallel arrangements of cells to maximize current or voltage depending on external resistance.',
        icon: '🖇️'
      },
      {
        type: 'model',
        title: 'Superconductivity',
        desc: 'Zero resistance in certain materials at very low temperatures. Allows for lossless energy transmission.',
        icon: '❄️'
      }
    ],
    examples: [
      {
        scenario: 'Battery Drain',
        details: 'Leaving lights on in a car. The internal resistance keeps heat building up as the battery discharges.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-phy-5',
    subject: 'Physics',
    chapterId: '11-phy-5',
    title: "Thermodynamics",
    summary: "The physics of heat and work. Master the Zeroth, First, and Second laws that govern every engine in the universe.",
    visuals: [
      {
        type: 'model',
        title: 'Zeroth Law',
        desc: 'If A and B are in thermal equilibrium with C, they are in equilibrium with each other. Basis for Temperature.',
        icon: '0️⃣'
      },
      {
        type: 'model',
        title: 'First Law: Energy Conservation',
        desc: 'ΔQ = ΔU + ΔW. Heat added equals internal energy increase plus work done by the system.',
        icon: '🔋'
      },
      {
        type: 'model',
        title: 'Isothermal Process',
        desc: 'Expansion or compression at constant temperature. ΔU = 0 for an ideal gas.',
        icon: '🌡️'
      },
      {
        type: 'model',
        title: 'Adiabatic Process',
        desc: 'No heat exchange (ΔQ = 0). Happens very fast or in insulated containers.',
        icon: '🧥'
      },
      {
        type: 'model',
        title: 'Isobaric & Isochoric',
        desc: 'Constant Pressure (Isobaric) and Constant Volume (Isochoric). No work is done in an isochoric process.',
        icon: '📦'
      },
      {
        type: 'model',
        title: 'Heat Engines',
        desc: 'Devices that convert heat from a source into work, rejecting waste heat to a sink.',
        icon: '🚂'
      },
      {
        type: 'model',
        title: 'The Carnot Cycle',
        desc: 'The most efficient theoretical engine cycle. Consists of two isothermal and two adiabatic processes.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Second Law of Thermo',
        desc: 'Heat cannot spontaneously flow from cold to hot. Systems naturally tend towards disorder (Entropy).',
        icon: '📉'
      },
      {
        type: 'model',
        title: 'Refrigerators & Heat Pumps',
        desc: 'Devices that use work to move heat from cold to hot. "Inverse Heat Engines."',
        icon: '❄️'
      },
      {
        type: 'model',
        title: 'Specific Heat Capacities',
        desc: 'Cp (at constant pressure) and Cv (at constant volume). Relation: Cp - Cv = R.',
        icon: '☀️'
      },
      {
        type: 'model',
        title: 'Molar Heat Capacity',
        desc: 'The amount of heat needed to raise the temperature of one mole of a substance by 1 Kelvin.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Entropy',
        desc: 'A measure of the molecular disorder or randomness of a system. Tends to increase over time.',
        icon: '🌪️'
      }
    ],
    examples: [
      {
        scenario: 'Internal Combustion Engine',
        details: 'Explosions in a car cylinder provide heat, pushing a piston to do work. Waste heat is expelled through the radiator.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-phy-2',
    subject: 'Physics',
    chapterId: '10-phy-2',
    title: "Electricity: The Flow of Power",
    summary: "Master the physics of moving charges. From Ohm's law to complex circuits and the math of heating effects.",
    visuals: [
      {
        type: 'model',
        title: 'Current: The Electron Parade',
        desc: 'Current (I) is the flow of charge (Q) over time (t). Unit: Ampere (A). Electrons move in a circuit from negative to positive terminals.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Potential: The Water Tank',
        desc: 'Voltage (V) is electrical pressure. Think of a high-placed water tank; the higher it is, the more pressure it provides to push water (current).',
        icon: '🔋'
      },
      {
        type: 'model',
        title: 'Ohm\'s Law & Resistance',
        desc: 'V = IR. Resistance (R) depends on material (Resistivity), length (L), and cross-sectional area (A). R = ρL/A. Longer wires = more resistance.',
        icon: '🔥'
      },
      {
        type: 'model',
        title: 'Resistors in Combination',
        desc: 'Series: R_total = R1 + R2 (Current is same). Parallel: 1/R_total = 1/R1 + 1/R2 (Voltage is same). Parallel circuits keep your house running!',
        icon: '🏠'
      },
      {
        type: 'model',
        title: 'Joule\'s Heating Law',
        desc: 'Heat produced (H) is proportional to I², R, and time (t). H = I²Rt. This is why bulb filaments glow and irons get hot.',
        icon: '♨️'
      },
      {
        type: 'model',
        title: 'Drift Velocity Concept',
        desc: 'The slow net speed of electrons despite their fast random motion due to the presence of an electric field.',
        icon: '🐌'
      },
      {
        type: 'model',
        title: 'Conductors vs Insulators',
        desc: 'Metals allow electron flow easily; non-metals (except graphite) block it. Semiconductors like Silicon lie in between.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Electrical Power (P)',
        desc: 'P = VI = I²R = V²/R. Measured in Watts (W). The rate at which energy is consumed by an appliance.',
        icon: '💡'
      },
      {
        type: 'model',
        title: 'The Kilowatt-Hour (kWh)',
        desc: 'The commercial unit of electrical energy. 1 unit = 1 kWh = 3.6 × 10⁶ Joules.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'Resistivity (ρ)',
        desc: 'The intrinsic property of a material to resist current, independent of size and shape.',
        icon: '🧬'
      }
    ],
    examples: [
      {
        scenario: 'Household Fuse',
        details: 'A safety device that melts if current exceeds a limit. Based on the heating effect of current to prevent electrical fires.'
      },
      {
        scenario: 'Filament Lamp',
        details: 'Tungsten is used for filaments because it has a very high melting point and can withstand the heat produced by resistance.'
      },
      {
        scenario: 'Rheostat',
        details: 'A variable resistor Used to change the current in a circuit without changing the voltage source.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '10-phy-3',
    subject: 'Physics',
    chapterId: '10-phy-3',
    title: "Magnetic Effects of Electric Current",
    summary: "Discover the electromagnetic bond. How moving charges create magnetic fields and how magnetic fields move motors through the Lorentz force.",
    visuals: [
      {
        type: 'model',
        title: 'The Magnetic Compass',
        desc: 'Hans Christian Ørsted discovered that a compass needle deflects near a current-carrying wire. Electricity and Magnetism are two sides of the same coin!',
        icon: '🧭'
      },
      {
        type: 'model',
        title: 'Right-Hand Thumb Rule',
        desc: 'Point your thumb in the direction of current; your curled fingers show the direction of Magnetic Field lines (Concentric Circles).',
        icon: '👍'
      },
      {
        type: 'model',
        title: 'Solenoids: The Soft Magnet',
        desc: 'A coil of wire behaves like a bar magnet when current flows. Inserting a soft iron core creates an electromagnet that can lift tons of scrap metal.',
        icon: '🌀'
      },
      {
        type: 'model',
        title: 'Fleming\'s Left Hand Rule',
        desc: 'Predicts the Force (Motion) on a conductor. Thumb = Motion, Forefinger = Field, Middle Finger = Current. The foundation of the Electric Motor.',
        icon: '🖐️'
      },
      {
        type: 'model',
        title: 'Electromagnetic Induction',
        desc: 'Michael Faraday found that changing the magnetic field through a coil "induces" a current. This was the birth of the Electric Generator.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Domestic Circuits',
        desc: 'Live (red), Neutral (black), and Earth (green) wires. The Fuse prevents overloading, while Earth wire protects against shocks from metallic bodies.',
        icon: '🔌'
      },
      {
        type: 'model',
        title: 'Magnetic Permeability',
        desc: 'How easily a material allows magnetic lines of force to pass through it. Soft iron has very high permeability.',
        icon: '🧲'
      },
      {
        type: 'model',
        title: 'Lenz\'s Law',
        desc: 'The direction of an induced current is such that it opposes the change that produced it.',
        icon: '🛑'
      },
      {
        type: 'model',
        title: 'Generator Principles (AC/DC)',
        desc: 'Using rotating coils in permanent magnetic fields to convert mechanical energy into electrical power.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Galvanometer: The Sensor',
        desc: 'An instrument that can detect the presence of even a very small current in a circuit.',
        icon: '📟'
      }
    ],
    examples: [
      {
        scenario: 'Electric Bell',
        details: 'Uses an electromagnet to pull a striker. The movement breaks the circuit, stopping the magnet, causing the striker to spring back and restart the cycle.'
      },
      {
        scenario: 'The MRI Machine',
        details: 'Uses super-powerful solenoids to align atoms in your body, allowing doctors to see internal organs without surgery.'
      },
      {
        scenario: 'Maglev Trains',
        details: 'Uses magnetic repulsion to "float" above tracks, eliminating friction and reaching speeds over 500 km/h.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '10-bio-4',
    subject: 'Biology',
    chapterId: '10-bio-4',
    title: "Heredity and Evolution",
    summary: "The logic of inheritance. Master Mendel's laws, the structure of genes, and the mechanisms that drive the origin of species.",
    visuals: [
      {
        type: 'model',
        title: 'Mendel\'s Pea Experiments',
        desc: 'Gregor Mendel, the father of genetics, discovered that traits are passed down as discrete units (Genes).',
        icon: '🫝'
      },
      {
        type: 'model',
        title: 'Law of Dominance',
        desc: 'In a pair of contrasting traits (like tall/dwarf), only one (Dominant) is expressed in the F1 generation.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'Law of Segregation',
        desc: 'Alleles separate during gamete formation so that each gamete receives only one allele for each trait.',
        icon: '✂️'
      },
      {
        type: 'model',
        title: 'Independent Assortment',
        desc: 'Inheritance of one trait does not affect the inheritance of another. Proved by Dihybrid crosses.',
        icon: '🎲'
      },
      {
        type: 'model',
        title: 'Sex Determination',
        desc: 'In humans, males have XY and females have XX. The father determines the sex of the child by providing either X or Y.',
        icon: '🚻'
      },
      {
        type: 'model',
        title: 'Natural Selection',
        desc: 'Darwin\'s theory: Organisms with favorable variations survive better and pass those traits to offspring.',
        icon: '🐢'
      },
      {
        type: 'model',
        title: 'Genetic Drift',
        desc: 'Random changes in gene frequency in small populations due to chance events, not necessarily fitness.',
        icon: '🌪️'
      },
      {
        type: 'model',
        title: 'Speciation',
        desc: 'The formation of new species due to geographical isolation, variation, and reproductive barriers.',
        icon: '🌍'
      },
      {
        type: 'model',
        title: 'Homologous Organs',
        desc: 'Organs with same structure but different functions (e.g., flippers of whale vs hands of humans). Proves common ancestry.',
        icon: '🦴'
      },
      {
        type: 'model',
        title: 'Analogous Organs',
        desc: 'Organs with different structure but same function (e.g., wings of birds vs wings of insects). Result of convergent evolution.',
        icon: '🦋'
      }
    ],
    examples: [
      {
        scenario: 'The Beetles of Different Colors',
        details: 'If green beetles have an advantage in green bushes, predators eat red ones more. Over time, the entire population becomes green.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '11-bio-2',
    subject: 'Biology',
    chapterId: '11-bio-2',
    title: "Biological Classification",
    summary: "The 5-Kingdom system. Master the characteristics of Monera, Protista, Fungi, Plantae, and Animalia.",
    visuals: [
      {
        type: 'model',
        title: 'Kingdom Monera',
        desc: 'Prokaryotic bacteria. Some are helpful (curd), some are harmful (pathogens). Found everywhere.',
        icon: '🦠'
      },
      {
        type: 'model',
        title: 'Kingdom Protista',
        desc: 'Unicellular eukaryotes like Amoeba and Paramecium. The bridge between bacteria and higher organisms.',
        icon: '🥄'
      },
      {
        type: 'model',
        title: 'Kingdom Fungi',
        desc: 'Heterotrophic organisms with chitinous cell walls. Mushrooms, yeast, and bread mold.',
        icon: '🍄'
      },
      {
        type: 'model',
        title: 'Archaebacteria',
        desc: 'Ancient bacteria that survive in extreme environments like hot springs (Thermophiles) or salty areas (Halophiles).',
        icon: '🌋'
      },
      {
        type: 'model',
        title: 'Eubacteria (True Bacteria)',
        desc: 'Characterized by a rigid cell wall and often a flagellum for movement.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'Viruses: Borderline Life',
        desc: 'Non-cellular organisms that only replicate inside a host. Consist of genetic material (DNA/RNA) in a protein coat.',
        icon: '⚠️'
      },
      {
        type: 'model',
        title: 'Viroids: Smaller than Viruses',
        desc: 'Infectious agents with only free RNA, lacking a protein coat.',
        icon: '🤏'
      },
      {
        type: 'model',
        title: 'Lichens: Symbiotic Duo',
        desc: 'Mutualistic association between algae (provides food) and fungi (provides shelter).',
        icon: '🤝'
      },
      {
        type: 'model',
        title: 'Kingdom Plantae',
        desc: 'Multicellular, eukaryotic, photosynthetic organisms with cellulosic cell walls.',
        icon: '🌿'
      },
      {
        type: 'model',
        title: 'Kingdom Animalia',
        desc: 'Multicellular, heterotrophic eukaryotes lacking cell walls. Characterized by locomotion.',
        icon: '🐘'
      }
    ],
    examples: [
      {
        scenario: 'The Bread Mold',
        details: 'Observing Rhizopus growing on a piece of moist bread left in the dark. It absorbs nutrients through thread-like hyphae.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-bio-3',
    subject: 'Biology',
    chapterId: '11-bio-3',
    title: "Plant Kingdom",
    summary: "From algae to angiosperms. Master the life cycles of Bryophytes, Pteridophytes, Gymnosperms, and the flowering world.",
    visuals: [
      {
        type: 'model',
        title: 'Algae: aquatic life',
        desc: 'Chlorophyll-bearing simple plants. Divided into Green, Brown, and Red algae based on pigments.',
        icon: '🍵'
      },
      {
        type: 'model',
        title: 'Bryophytes: Amphibians',
        desc: 'Need water for sexual reproduction. Mosses and Liverworts found in moist shaded areas.',
        icon: '🪵'
      },
      {
        type: 'model',
        title: 'Angiosperms: Flowers',
        desc: 'The most dominant plant group. Seeds are enclosed in fruits. Includes Monocots and Dicots.',
        icon: '🌻'
      },
      {
        type: 'model',
        title: 'Pteridophytes: First Vascula',
        desc: 'First land plants to possess xylem and phloem. Ferns and horsetails.',
        icon: '🌿'
      },
      {
        type: 'model',
        title: 'Gymnosperms: Naked Seeds',
        desc: 'Plants with unprotected seeds, often produced in cones. Huge importance in timber industry.',
        icon: '🌲'
      },
      {
        type: 'model',
        title: 'Diplontic Life Cycle',
        desc: 'The dominant phase is the diploid sporophyte. Characteristic of gymnosperms and angiosperms.',
        icon: '🔁'
      },
      {
        type: 'model',
        title: 'Alternation of Generations',
        desc: 'Shifting between haploid gametophyte and diploid sporophyte stages in a life cycle.',
        icon: '🌓'
      },
      {
        type: 'model',
        title: 'Monocots vs Dicots',
        desc: 'Diversity within angiosperms based on numbers of cotyledons in the embryo.',
        icon: '🍱'
      },
      {
        type: 'model',
        title: 'Hydrophytes',
        desc: 'Plants specially adapted to live in water (e.g., Lotus).',
        icon: '💧'
      },
      {
        type: 'model',
        title: 'Xerophytes',
        desc: 'Plants like Cactus adapted to extreme desert heat and water scarcity.',
        icon: '🏜️'
      }
    ],
    examples: [
      {
        scenario: 'Pines and Firs',
        details: 'Gymnosperms produce "naked seeds" in cones. Found in cold hilly regions where they can survive with Needle-like leaves.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '11-bio-4',
    subject: 'Biology',
    chapterId: '11-bio-4',
    title: "Animal Kingdom",
    summary: "The diversity of fauna. Master the classification from sponges to mammals based on symmetry, coelom, and level of organization.",
    visuals: [
      {
        type: 'model',
        title: 'Phylum Porifera',
        desc: 'Sponges with cellular level organization and water canal system.',
        icon: '🧽'
      },
      {
        type: 'model',
        title: 'Phylum Chordata',
        desc: 'Animals with a Notochord or vertical column. Includes Fish, Amphibians, Reptiles, Birds, and Mammals.',
        icon: '🦁'
      },
      {
        type: 'model',
        title: 'Phylum Coelenterata',
        desc: 'Aquatic creatures like Jellyfish with stinging cells (Cnidoblasts).',
        icon: '🎐'
      },
      {
        type: 'model',
        title: 'Phylum Arthropoda',
        desc: 'The largest phylum. Jointed appendages and exoskeleton. Insects, Crabs, Spiders.',
        icon: '🐜'
      },
      {
        type: 'model',
        title: 'Phylum Mollusca',
        desc: 'Soft-bodied animals often with a shell. Snails, Octopus, Squid.',
        icon: '🐚'
      },
      {
        type: 'model',
        title: 'Radial vs Bilateral Symmetry',
        desc: 'How animal bodies are organized around an axis or split into two equal halves.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Diploblastic vs Triploblastic',
        desc: 'Based on the number of embryonic layers (Ectoderm, Mesoderm, Endoderm).',
        icon: '🧅'
      },
      {
        type: 'model',
        title: 'Coelom Type',
        desc: 'The presence or absence of a body cavity between gut and body wall.',
        icon: '⭕'
      },
      {
        type: 'model',
        title: 'Metamerism',
        desc: 'Segmented bodies as seen in Earthworms or Arthropods.',
        icon: '🚋'
      },
      {
        type: 'model',
        title: 'Notochord',
        desc: 'A flexible rod supporting the body, the defining feature of Chordates.',
        icon: '🦯'
      }
    ],
    examples: [
      {
        scenario: 'The Penguin\'s Adaptation',
        details: 'Flightless birds (Aves) with streamlined bodies and thick blubber for survival in extreme arctic cold.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '12-bio-1',
    subject: 'Biology',
    chapterId: '12-bio-1',
    title: "Reproduction in Organisms",
    summary: "The basics of biological continuity. Master asexual modes and the fundamental processes of sexual fertilization.",
    visuals: [
      {
        type: 'model',
        title: 'Asexual: Vegetative Propagules',
        desc: 'Runners, Rhizomes, Suckers, Tubers, Bulbs. Plants cloning themselves via special vegetative parts.',
        icon: '🥔'
      },
      {
        type: 'model',
        title: 'Gametogenesis',
        desc: 'The formation of male (Sperm) and female (Ovum) haploid cells.',
        icon: '🧬'
      },
      {
        type: 'model',
        title: 'Fertilization (Syngamy)',
        desc: 'Fusion of male and female gametes to create a diploid Zygote.',
        icon: '🤝'
      },
      {
        type: 'model',
        title: 'Binary Fission',
        desc: 'A single cell splitting into two equal halves (e.g., Amoeba).',
        icon: '✂️'
      },
      {
        type: 'model',
        title: 'Budding',
        desc: 'Small outgrowth from parent body that eventually detaches (e.g., Yeast, Hydra).',
        icon: '🌿'
      },
      {
        type: 'model',
        title: 'Fragmentation',
        desc: 'Parent body breaks into pieces, each growing into a new individual (e.g., Spirogyra).',
        icon: '🧩'
      },
      {
        type: 'model',
        title: 'Internal vs External Fert',
        desc: 'Where the fusion of gametes occurs—inside the female body or in surrounding water.',
        icon: '🏠'
      },
      {
        type: 'model',
        title: 'Hermaphrodites',
        desc: 'Organisms possessing both male and female reproductive systems (e.g., Earthworms).',
        icon: '🚻'
      },
      {
        type: 'model',
        title: 'Life Span Diversity',
        desc: 'Comparing the reproductive potential and longevity of different species.',
        icon: '⏳'
      },
      {
        type: 'model',
        title: 'The Zygote: Vital Link',
        desc: 'The single cell that ensures continuity between generations.',
        icon: '⛓️'
      }
    ],
    examples: [
      {
        scenario: 'The Potato Tuber',
        details: 'The "eyes" on a potato are buds that can give rise to a whole new plant, a perfect example of natural cloning.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-bio-2',
    subject: 'Biology',
    chapterId: '12-bio-2',
    title: "Sexual Reproduction in Flowering Plants",
    summary: "The master guide to botany. Explore pollination, double fertilization, and seed development.",
    visuals: [
      {
        type: 'model',
        title: 'Double Fertilization',
        desc: 'A unique feature of angiosperms. One sperm fuses with egg, the other with two polar nuclei to form endosperm.',
        icon: '🌸'
      },
      {
        type: 'model',
        title: 'Pollen Grain Structure',
        desc: 'Exine (tough outer layer) and Intine. Contains Vegetative and Generative cells.',
        icon: '⚽'
      },
      {
        type: 'model',
        title: 'Ovule & Embryo Sac',
        desc: 'The female gametophyte containing 7 cells and 8 nuclei.',
        icon: '🥚'
      },
      {
        type: 'model',
        title: 'Pollination Types',
        desc: 'Autogamy (Self), Geitonogamy, and Xenogamy (Cross-pollination).',
        icon: '🐝'
      },
      {
        type: 'model',
        title: 'Pollen-Pistil Interaction',
        desc: 'The "chemical dialogue" that ensures only correct pollen grows through the style.',
        icon: '💬'
      },
      {
        type: 'model',
        title: 'Endosperm Development',
        desc: 'Triploid tissue that provides nutrition to the developing embryo.',
        icon: '🍼'
      },
      {
        type: 'model',
        title: 'Seed & Fruit Formation',
        desc: 'Ovules mature into seeds, and the ovary develops into a fruit.',
        icon: '🍎'
      },
      {
        type: 'model',
        title: 'Apomixis',
        desc: 'Formation of seeds without fertilization. Natural cloning in plants.',
        icon: '✨'
      },
      {
        type: 'model',
        title: 'Polyembryony',
        desc: 'Presence of more than one embryo in a seed (common in citrus fruits).',
        icon: '👯'
      },
      {
        type: 'model',
        title: 'Anther Structure',
        desc: 'Bithecous and tetrasporangiate structure that produces millions of pollen grains.',
        icon: '🏛️'
      }
    ],
    examples: [
      {
        scenario: 'Bees & Pollination',
        details: 'Biotic agents like insects carry pollen from anthers to stigma, enabling genetic diversity through cross-pollination.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '12-bio-3',
    subject: 'Biology',
    chapterId: '12-bio-3',
    title: "Human Reproduction",
    summary: "The miracle of life. Understand gametogenesis, the menstrual cycle, and the stages of embryonic development.",
    visuals: [
      {
        type: 'model',
        title: 'The Menstrual Cycle',
        desc: 'Regulated by LH, FSH, Estrogen, and Progesterone. Prepares the uterus for potential pregnancy each month.',
        icon: '📅'
      },
      {
        type: 'model',
        title: 'Male Reproductive System',
        desc: 'Testes, accessory ducts, and glands that produce and transport sperm.',
        icon: '♂️'
      },
      {
        type: 'model',
        title: 'Female Reproductive System',
        desc: 'Ovaries, Oviducts, Uterus, and mammary glands for egg production and fetal support.',
        icon: '♀️'
      },
      {
        type: 'model',
        title: 'Spermatogenesis',
        desc: 'The complex process of sperm production in the seminiferous tubules.',
        icon: '🏊'
      },
      {
        type: 'model',
        title: 'Oogenesis',
        desc: 'The formation of a mature female gamete, beginning even before a female is born.',
        icon: '🥚'
      },
      {
        type: 'model',
        title: 'Fertilization & Implantation',
        desc: 'Sperm meets egg in the fallopian tube; the resulting blastocyst attaches to the uterine wall.',
        icon: '🏗️'
      },
      {
        type: 'model',
        title: 'Pregnancy & Placenta',
        desc: 'The 9-month gestation where the placenta acts as the lifeline for the fetus.',
        icon: '🤰'
      },
      {
        type: 'model',
        title: 'Parturition (Birth)',
        desc: 'The process of delivery triggered by complex neuroendocrine mechanisms and Oxytocin.',
        icon: '👶'
      },
      {
        type: 'model',
        title: 'Lactation',
        desc: 'Production of milk in mammary glands, providing colostrum (antibodies) to the newborn.',
        icon: '🤱'
      },
      {
        type: 'model',
        title: 'Hormonal Control',
        desc: 'How the Pituitary and Gonads communicate to keep reproduction functioning correctly.',
        icon: '⛓️'
      }
    ],
    examples: [
      {
        scenario: 'The Placenta Connection',
        details: 'The temporary organ that allows for the transfer of nutrients and oxygen from mother to fetus while removing waste.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-phy-3',
    subject: 'Physics',
    chapterId: '12-phy-3',
    title: "Atoms",
    summary: "The quantum heart of matter. Master the Bohr model, energy levels, and the spectral series of hydrogen.",
    visuals: [
      {
        type: 'model',
        title: 'Bohr\'s Postulates',
        desc: 'Electrons orbit in quantized paths. Energy is only emitted when jumping between these stationary states.',
        icon: '⚛️'
      },
      {
        type: 'model',
        title: 'Alpha-Particle Scattering',
        desc: 'Rutherford\'s experiment showing most space in an atom is empty, with a tiny, dense, positive nucleus at the center.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Impact Parameter',
        desc: 'The perpendicular distance of the initial velocity vector of the alpha particle from the center of the nucleus.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Spectral Series',
        desc: 'Lyman, Balmer, Paschen, Brackett, and Pfund series. Wavelengths emitted when electrons fall to lower orbits.',
        icon: '🌈'
      },
      {
        type: 'model',
        title: 'Energy Levels',
        desc: 'Discrete values of energy (En = -13.6/n² eV) that an electron can have in a hydrogen atom.',
        icon: '🎚️'
      },
      {
        type: 'model',
        title: 'De Broglie\'s Explanation',
        desc: 'Treating orbiting electrons as standing waves to explain the quantization of angular momentum.',
        icon: '🌊'
      },
      {
        type: 'model',
        title: 'Excitation Potential',
        desc: 'The energy required to lift an electron from its ground state to an excited state.',
        icon: '🆙'
      },
      {
        type: 'model',
        title: 'Ionization Energy',
        desc: 'The minimum energy required to remove an electron completely from an atom.',
        icon: '💥'
      },
      {
        type: 'model',
        title: 'Ground State',
        desc: 'The lowest energy state of an atom (n=1), where most atoms reside under normal conditions.',
        icon: '🏁'
      },
      {
        type: 'model',
        title: 'Continuous vs Line Spectrum',
        desc: 'Solids produce continuous spectra; dilute gases producing line spectra reveal their unique atomic structure.',
        icon: '📊'
      }
    ],
    examples: [
      {
        scenario: 'Hydrogen Discovery',
        details: 'Predicting the exact wavelengths of light emitted by stars to identify their chemical compositions.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-phy-1',
    subject: 'Physics',
    chapterId: '11-phy-1',
    title: "Units and Measurements",
    summary: "The language of science. Master SI units, dimensional analysis, and the precision of measurement.",
    visuals: [
      {
        type: 'model',
        title: 'SI Base Units',
        desc: 'Length (m), Mass (kg), Time (s), Current (A), Temp (K), Amount (mol), Intensity (cd).',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Dimensional Analysis',
        desc: 'Checking equations using fundamental units [M], [L], [T]. Helps verify if a physics law is sensible.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Parallax Method',
        desc: 'Measuring enormous distances (like to stars) by observing displacement from two points.',
        icon: '🔭'
      },
      {
        type: 'model',
        title: 'Significant Figures',
        desc: 'Rules for precision in measurements. Only keeping digits that are known with certainty.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Error in Measurement',
        desc: 'Systematic (predictable) vs Random (unpredictable) errors. Absolute, Relative, and Percentage errors.',
        icon: '🚫'
      },
      {
        type: 'model',
        title: 'Radian & Steradian',
        desc: 'Supplementary units for plane and solid angles. Essential for circular and spherical geometry.',
        icon: '➰'
      },
      {
        type: 'model',
        title: 'Accuracy vs Precision',
        desc: 'Accuracy is closeness to true value; Precision is consistency of repeated measurements.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Vernier Calipers',
        desc: 'A device for measuring small lengths with high precision using a main and vernier scale.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Screw Gauge',
        desc: 'Measures diameter of thin wires or thickness of sheets with micrometer-level accuracy.',
        icon: '🔩'
      },
      {
        type: 'model',
        title: 'Combination of Errors',
        desc: 'How errors add or multiply when quantities are used in mathematical formulas.',
        icon: '➕'
      }
    ],
    examples: [
      {
        scenario: 'Parallax Method',
        details: 'Measuring the distance of nearby stars by observing their change in position relative to distant stars.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '11-phy-2',
    subject: 'Physics',
    chapterId: '11-phy-2',
    title: "Motion in a Straight Line",
    summary: "The basics of kinematics. Master displacement, velocity, acceleration, and the equations of motion.",
    visuals: [
      {
        type: 'model',
        title: 'Kinematic Equations',
        desc: 'v = u + at, s = ut + ½at², v² = u² + 2as. The foundation of classic mechanics.',
        icon: '🔛'
      },
      {
        type: 'model',
        title: 'Distance vs Displacement',
        desc: 'Distance is the total path length; Displacement is the shortest path between start and end (Vector).',
        icon: '📍'
      },
      {
        type: 'model',
        title: 'Velocity & Speed',
        desc: 'Speed is rate of distance; Velocity is rate of displacement (includes direction).',
        icon: '💨'
      },
      {
        type: 'model',
        title: 'Acceleration (a)',
        desc: 'The rate of change of velocity. Can be positive (speeding up) or negative (braking).',
        icon: '🏎️'
      },
      {
        type: 'model',
        title: 'Position-Time Graphs',
        desc: 'Slope represents velocity. A curve means the object is accelerating.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'Velocity-Time Graphs',
        desc: 'Slope represents acceleration. Area under the curve represents displacement.',
        icon: '📊'
      },
      {
        type: 'model',
        title: 'Relative Velocity',
        desc: 'The velocity of one object as seen from another moving object. essential for navigation.',
        icon: '🤝'
      },
      {
        type: 'model',
        title: 'Instantaneous Velocity',
        desc: 'The velocity at a specific moment in time. Defined as the derivative dx/dt.',
        icon: '⏱️'
      },
      {
        type: 'model',
        title: 'Reaction Time',
        desc: 'The time gap between seeing a stimulus and acting on it. Crucial for road safety.',
        icon: '🧠'
      },
      {
        type: 'model',
        title: 'Uniform vs Non-uniform',
        desc: 'Uniform motion has constant velocity; Non-uniform motion involves varying speeds or directions.',
        icon: '⚖️'
      }
    ],
    examples: [
      {
        scenario: 'Free Fall',
        details: 'Dropping a stone from a bridge and measuring the time it takes to hit the water to calculate the bridge\'s height.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-phy-4',
    subject: 'Physics',
    chapterId: '11-phy-4',
    title: "Work, Energy and Power",
    summary: "The currency of the universe. Master the work-energy theorem, potential vs kinetic energy, and collisions.",
    visuals: [
      {
        type: 'model',
        title: 'Work-Energy Theorem',
        desc: 'The work done by the net force on an object is equal to the change in its kinetic energy.',
        icon: '🔋'
      },
      {
        type: 'model',
        title: 'Work Done by Force',
        desc: 'W = Fs cosθ. Work is only done when a force causes displacement in its direction.',
        icon: '🏗️'
      },
      {
        type: 'model',
        title: 'Kinetic Energy (K)',
        desc: 'K = ½mv². The energy an object possesses due to its motion.',
        icon: '🏎️'
      },
      {
        type: 'model',
        title: 'Potential Energy (U)',
        desc: 'Stored energy due to position or configuration. Gravitational (mgh) or Elastic (½kx²).',
        icon: '🏹'
      },
      {
        type: 'model',
        title: 'Conservation of Energy',
        desc: 'Total mechanical energy remains constant if only conservative forces (like gravity) are acting.',
        icon: '♻️'
      },
      {
        type: 'model',
        title: 'Power (P)',
        desc: 'The rate of doing work. P = W/t = Fv. Measured in Watts (W) or Horsepower (hp).',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Elastic Collisions',
        desc: 'Collisions where both momentum and kinetic energy are conserved (e.g., atoms, billiard balls).',
        icon: '💥'
      },
      {
        type: 'model',
        title: 'Inelastic Collisions',
        desc: 'Momemtum is conserved, but kinetic energy is lost as heat or sound (e.g., car crash).',
        icon: '🩹'
      },
      {
        type: 'model',
        title: 'Conservative Forces',
        desc: 'Forces like gravity where work done is path-independent. Energy can be recovered.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Vertical Circular Motion',
        desc: 'The dynamics of a mass swinging in a vertical loop, governed by energy and tension.',
        icon: '🎡'
      }
    ],
    examples: [
      {
        scenario: 'Elastic Collisions',
        details: 'Billiard balls colliding on a table, where both momentum and kinetic energy are conserved.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-phy-4',
    subject: 'Physics',
    chapterId: '12-phy-4',
    title: "Nuclei",
    summary: "The power within the atom. Master radioactivity, binding energy, and the logic of fission and fusion.",
    visuals: [
      {
        type: 'model',
        title: 'Binding Energy',
        desc: 'The energy required to break a nucleus into its constituent protons and neutrons.',
        icon: '💥'
      },
      {
        type: 'model',
        title: 'Mass Defect (Δm)',
        desc: 'The difference between the sum of masses of nucleons and the actual mass of the nucleus. E = Δmc².',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Nuclear Force',
        desc: 'The strongest fundamental force. Short-ranged, charge-independent, and non-central. Holds the nucleus together.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Nuclear Fission',
        desc: 'Splitting a heavy nucleus into lighter ones, releasing massive amounts of energy (e.g., Uranium-235).',
        icon: '✂️'
      },
      {
        type: 'model',
        title: 'Nuclear Fusion',
        desc: 'Fusing light nuclei into a heavier one. Requires extreme temperature and pressure. The energy source of the Sun.',
        icon: '🔆'
      },
      {
        type: 'model',
        title: 'Radioactivity: α, β, γ',
        desc: 'Spontaneous decay of unstable nuclei. Alpha (He nucleus), Beta (Electron), and Gamma (High-energy Photons).',
        icon: '☢️'
      },
      {
        type: 'model',
        title: 'Half-Life (T1/2)',
        desc: 'The time taken for half of the radioactive nuclei in a sample to decay.',
        icon: '⏳'
      },
      {
        type: 'model',
        title: 'Binding Energy per Nucleon',
        desc: 'A measure of nuclear stability. Iron (Fe-56) is among the most stable nuclei in the universe.',
        icon: '🏔️'
      },
      {
        type: 'model',
        title: 'Nuclear Reactor: Control',
        desc: 'Using moderator (graphite) and control rods (cadmium) to manage a sustained chain reaction.',
        icon: '⚙️'
      },
      {
        type: 'model',
        title: 'Size of Nucleus',
        desc: 'R = R₀A^(1/3). Nuclear density is constant for all nuclei and is incredibly high (10^17 kg/m³).',
        icon: '📏'
      }
    ],
    examples: [
      {
        scenario: 'Nuclear Fusion in Stars',
        details: 'How the Sun produces energy by fusing Hydrogen nuclei into Helium under extreme pressure and temperature.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-chem-2',
    subject: 'Chemistry',
    chapterId: '11-chem-2',
    title: "Structure of Atom (Class 11)",
    summary: "The quantum model of chemistry. Master orbitals, electronic configurations, and the Aufbau principle.",
    visuals: [
      {
        type: 'model',
        title: 'Heisenberg Uncertainty',
        desc: 'It is impossible to determine both the position and momentum of an electron simultaneously.',
        icon: '🌫️'
      },
      {
        type: 'model',
        title: 'Bohr\'s Atomic Model',
        desc: 'Electrons revolve in fixed circular orbits with quantized angular momentum.',
        icon: '⚛️'
      },
      {
        type: 'model',
        title: 'Quantum Numbers: n, l, m, s',
        desc: 'The "Address" of an electron. Principal, Azimuthal, Magnetic, and Spin quantum numbers define its state.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Aufbau Principle',
        desc: 'Electrons fill the lowest energy orbitals first before moving to higher ones (1s, 2s, 2p...).',
        icon: '🪜'
      },
      {
        type: 'model',
        title: 'Pauli Exclusion Principle',
        desc: 'No two electrons in an atom can have the same set of four quantum numbers.',
        icon: '🚫'
      },
      {
        type: 'model',
        title: 'Hund\'s Rule',
        desc: 'Orbitals of the same energy are singly occupied before pairing begins, to maintain max spin.',
        icon: '🦴'
      },
      {
        type: 'model',
        title: 'Wave-Particle Duality',
        desc: 'Louis de Broglie proposed that matter, like light, exhibits both wave and particle properties.',
        icon: '🌊'
      },
      {
        type: 'model',
        title: 'Shapes of Orbitals: s, p, d',
        desc: 's is spherical, p is dumbbell-shaped, and d is double-dumbbell. These define molecular geometry.',
        icon: '🎈'
      },
      {
        type: 'model',
        title: 'Electronic Configuration',
        desc: 'The distribution of electrons into orbitals. Half-filled and fully-filled orbitals attract extra stability.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Photoelectric Effect',
        desc: 'Electrons are ejected from a metal surface when light of a threshold frequency hits it.',
        icon: '📸'
      }
    ],
    examples: [
      {
        scenario: 'The Chromium Exception',
        details: 'Why Chromium has a 4s¹ 3d⁵ configuration instead of 4s² 3d⁴ to achieve half-filled orbital stability.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-chem-3',
    subject: 'Chemistry',
    chapterId: '11-chem-3',
    title: "Periodic Classification",
    summary: "The map of elements. Master periodic trends in atomic radius, ionization enthalpy, and electronegativity.",
    visuals: [
      {
        type: 'model',
        title: 'Periodic Trends',
        desc: 'Atomic size decreases across a period and increases down a group.',
        icon: '📉'
      },
      {
        type: 'model',
        title: 'Ionization Enthalpy',
        desc: 'The energy required to remove an electron from an isolated gaseous atom. Increases across a period.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Electronegativity',
        desc: 'The ability of an atom to attract shared electrons towards itself in a bond. Fluorine is king!',
        icon: '🧲'
      },
      {
        type: 'model',
        title: 'Electron Gain Enthalpy',
        desc: 'The energy change when an electron is added to a neutral atom to form an anion.',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Metallic Character',
        desc: 'Decreases across a period as effective nuclear charge increases, making it harder to lose electrons.',
        icon: '🔨'
      },
      {
        type: 'model',
        title: 'Shielding (Screening) Effect',
        desc: 'Inner electrons shield outer electrons from the nuclear charge, increasing the effective radius.',
        icon: '🛡️'
      },
      {
        type: 'model',
        title: 'Effective Nuclear Charge (Zeff)',
        desc: 'The actual positive charge felt by an electron, accounting for the shielding by inner electrons.',
        icon: '☀️'
      },
      {
        type: 'model',
        title: 'Blocks: s, p, d, f',
        desc: 'Elements grouped by their valence orbital type. Defines chemical "Families" like Halogens or Alkali metals.',
        icon: '🩹'
      },
      {
        type: 'model',
        title: 'Valency & Oxidation States',
        desc: 'Tracking the number of electrons an atom can lose, gain, or share to reach octet stability.',
        icon: '🔢'
      },
      {
        type: 'model',
        title: 'Atomic vs Ionic Radius',
        desc: 'Cations are smaller than their parent atoms; Anions are larger due to increased electron repulsion.',
        icon: '📏'
      }
    ],
    examples: [
      {
        scenario: 'Noble Gas Stability',
        details: 'Why Helium, Neon, and Argon are inert due to their completely filled valence shells.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '11-phy-3',
    subject: 'Physics',
    chapterId: '11-phy-3',
    title: "Laws of Motion",
    summary: "The foundations of dynamics. Master Newton's three laws, friction, and circular motion.",
    visuals: [
      {
        type: 'model',
        title: 'Newton\'s First Law',
        desc: 'Inertia: An object remains at rest or in motion unless acted upon by an external force.',
        icon: '🛑'
      },
      {
        type: 'model',
        title: 'Newton\'s Second Law',
        desc: 'F = ma. Force is equal to the rate of change of momentum.',
        icon: '🏎️'
      },
      {
        type: 'model',
        title: 'Newton\'s Third Law',
        desc: 'For every action, there is an equal and opposite reaction.',
        icon: '🤼'
      },
      {
        type: 'model',
        title: 'Linear Momentum (p)',
        desc: 'The product of mass and velocity (p=mv). A measure of the "quantity of motion."',
        icon: '💨'
      },
      {
        type: 'model',
        title: 'Impulse (J)',
        desc: 'A large force acting for a very short time (J = FΔt), causing a change in momentum.',
        icon: '🔨'
      },
      {
        type: 'model',
        title: 'Static Friction',
        desc: 'The internal force that prevents two surfaces from starting to slide over each other.',
        icon: '🦵'
      },
      {
        type: 'model',
        title: 'Kinetic Friction',
        desc: 'The friction acting between moving surfaces. Usually less than limiting static friction.',
        icon: '⛸️'
      },
      {
        type: 'model',
        title: 'Centripetal Force',
        desc: 'The force directed towards the center that keeps an object in circular motion (mv²/r).',
        icon: '🎡'
      },
      {
        type: 'model',
        title: 'Banking of Roads',
        desc: 'Raising the outer edge of a road to provide necessary centripetal force for safe turning of vehicles.',
        icon: '🛣️'
      },
      {
        type: 'model',
        title: 'Free Body Diagrams (FBD)',
        desc: 'A visual method to show all forces acting on an object to solve motion problems.',
        icon: '📝'
      }
    ],
    examples: [
      {
        scenario: 'Pushing a Car',
        details: 'Initial struggle to move it due to high static friction; easier to keep moving once it starts due to lower kinetic friction.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '12-chem-3',
    subject: 'Chemistry',
    chapterId: '12-chem-3',
    title: "Biomolecules",
    summary: "The chemistry of life. Master carbohydrates, proteins, nucleic acids, and the logic of DNA.",
    visuals: [
      {
        type: 'model',
        title: 'Proteins: Amino Acid Chains',
        desc: 'Primary, secondary, tertiary, and quaternary structures that define biological function.',
        icon: '🥩'
      },
      {
        type: 'model',
        title: 'Carbohydrates: Energy Fuel',
        desc: 'Glucose (monosaccharide), Sucrose (disaccharide), and Cellulose (polysaccharide). The main source of metabolic energy.',
        icon: '🍞'
      },
      {
        type: 'model',
        title: 'Nucleic Acids: DNA & RNA',
        desc: 'Polymers of nucleotides (Sugar + Base + Phosphate). The blueprints of life and heredity.',
        icon: '🧬'
      },
      {
        type: 'model',
        title: 'Vitamins: Vital Micronutrients',
        desc: 'Fat-soluble (A, D, E, K) and Water-soluble (B, C). Essential for specific biochemical reactions.',
        icon: '💊'
      },
      {
        type: 'model',
        title: 'Lipids: Fat Storage',
        desc: 'Concentrated energy stores and major components of cell membranes (Phospholipids).',
        icon: '🧊'
      },
      {
        type: 'model',
        title: 'Denaturation of Proteins',
        desc: 'Loss of biological activity due to change in pH or temperature (e.g., boiling an egg).',
        icon: '🍳'
      },
      {
        type: 'model',
        title: 'Glycosidic Linkage',
        desc: 'The oxygen bridge that holds monosaccharide units together to form complex sugars.',
        icon: '🌉'
      },
      {
        type: 'model',
        title: 'Peptide Bond',
        desc: 'The covalent bond (CONH) that links amino acids together to form proteins.',
        icon: '🖇️'
      },
      {
        type: 'model',
        title: 'Enzymes: Nature\'s Catalyst',
        desc: 'Globular proteins that lower the activation energy of biological reactions with high specificity.',
        icon: '⚡'
      },
      {
        type: 'model',
        title: 'Hormones: Chemical Messengers',
        desc: 'Molecules like Insulin that travel in blood to coordinate functions across different organs.',
        icon: '✉️'
      }
    ],
    examples: [
      {
        scenario: 'Enzyme Action',
        details: 'Biocatalysts that speed up reactions in the body by millions of times using a lock-and-key mechanism.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '11-math-2',
    subject: 'Mathematics',
    chapterId: '11-math-2',
    title: "Relations and Functions (Class 11)",
    summary: "Defining connections. Master Cartesian products, domain, range, and types of functions.",
    visuals: [
      {
        type: 'model',
        title: 'Function mapping',
        desc: 'A relation where every element in domain has exactly one image in co-domain.',
        icon: '🗺️'
      },
      {
        type: 'model',
        title: 'Cartesian Product',
        desc: 'A × B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.',
        icon: '✖️'
      },
      {
        type: 'model',
        title: 'Domain and Range',
        desc: 'Domain is the set of all inputs; Range is the set of all actual outputs of a function.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Codomain',
        desc: 'The set that contains all possible outputs, though not all might be used in the range.',
        icon: '📦'
      },
      {
        type: 'model',
        title: 'Types: Into/Onto',
        desc: 'Onto (Surjective): Range equals Codomain. Into: Range is a subset of Codomain.',
        icon: '⤴️'
      },
      {
        type: 'model',
        title: 'Types: One-One/Many-One',
        desc: 'One-One (Injective): Every input has a unique output. Many-One: Two or more inputs share an output.',
        icon: '☝️'
      },
      {
        type: 'model',
        title: 'Constant Function',
        desc: 'A function that returns the same value for every input. Graph is a horizontal line.',
        icon: '➖'
      },
      {
        type: 'model',
        title: 'Identity Function',
        desc: 'f(x) = x. Every element maps to itself. The graph is a line passing through origin at 45 degrees.',
        icon: '🆔'
      },
      {
        type: 'model',
        title: 'Greatest Integer Function',
        desc: 'f(x) = [x]. Returns the largest integer less than or equal to x. Also called Step Function.',
        icon: '🪜'
      },
      {
        type: 'model',
        title: 'Modulus Function',
        desc: 'f(x) = |x|. Returns the absolute value of x. Graph is V-shaped.',
        icon: '✌️'
      }
    ],
    examples: [
      {
        scenario: 'Password Encryption',
        details: 'Mapping a password string to a unique hash value is a classic one-way function application.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '11-math-3',
    subject: 'Mathematics',
    chapterId: '11-math-3',
    title: "Trigonometric Functions (Class 11)",
    summary: "The unit circle and beyond. Master radian measure, general solutions, and trigonometric equations.",
    visuals: [
      {
        type: 'model',
        title: 'The Unit Circle',
        desc: 'Mapping trig values onto a circle with radius 1 to understand periodic behavior.',
        icon: '🔘'
      },
      {
        type: 'model',
        title: 'Radian Measure',
        desc: 'Measuring angles based on arc length. 2π radians = 360 degrees.',
        icon: '➰'
      },
      {
        type: 'model',
        title: 'Trig Function Signs (ASTC)',
        desc: 'Rules for which functions are positive in which quadrants (All, Sine, Tan, Cos).',
        icon: '🧭'
      },
      {
        type: 'model',
        title: 'Periodic Nature',
        desc: 'Sine and Cosine repeat every 2π; Tangent repeats every π.',
        icon: '🔁'
      },
      {
        type: 'model',
        title: 'Sum and Difference Formulas',
        desc: 'sin(A±B) and cos(A±B) relations that expanded the reach of trigonometry.',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Double Angle Formulas',
        desc: 'sin 2θ = 2 sin θ cos θ. Essential for calculus and wave physics.',
        icon: '✖️'
      },
      {
        type: 'model',
        title: 'Graphs of Trig Functions',
        desc: 'Visualizing the wave nature of sinx and cosx, and the asymptotic behavior of tanx.',
        icon: '📈'
      },
      {
        type: 'model',
        title: 'General Solutions',
        desc: 'Finding all values of θ that satisfy an equation like sin θ = 0 (θ = nπ).',
        icon: '♾️'
      },
      {
        type: 'model',
        title: 'Factorization Formulas',
        desc: 'Converting sums/differences of trig functions into products and vice versa.',
        icon: '🧬'
      },
      {
        type: 'model',
        title: 'Height of a Mountain',
        desc: 'Using the Law of Sines and Cosines to calculate enormous distances from two observation points.',
        icon: '🏔️'
      }
    ],
    examples: [
      {
        scenario: 'Sound Wave Analysis',
        details: 'Breaking down complex musical notes into simple sine and cosine waves using Fourier logic.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '12-math-1',
    subject: 'Mathematics',
    chapterId: '12-math-1',
    title: "Relations and Functions (Class 12)",
    summary: "Advanced Set Mapping. Master reflexive, symmetric, transitive relations and bijective functions.",
    visuals: [
      {
        type: 'model',
        title: 'Equivalence Relations',
        desc: 'Relations that are reflexive, symmetric, and transitive simultaneously.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Reflexive Property',
        desc: 'Every element is related to itself: (a, a) ∈ R for all a ∈ A.',
        icon: '🪞'
      },
      {
        type: 'model',
        title: 'Symmetric Property',
        desc: 'If (a, b) ∈ R, then (b, a) must also be in R.',
        icon: '☯️'
      },
      {
        type: 'model',
        title: 'Transitive Property',
        desc: 'If (a, b) ∈ R and (b, c) ∈ R, then (a, c) must also be in R.',
        icon: '⛓️'
      },
      {
        type: 'model',
        title: 'Composition of Functions',
        desc: 'Applying one function to the result of another: (g ∘ f)(x) = g(f(x)).',
        icon: '🔗'
      },
      {
        type: 'model',
        title: 'Invertible Functions',
        desc: 'A function that can be reversed. Requires the function to be bijective (One-One and Onto).',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Bijective Mapping',
        desc: 'When every element in codomain is coupled with exactly one distinct element in domain.',
        icon: '🎯'
      },
      {
        type: 'model',
        title: 'Identity Relation',
        desc: 'Smallest possible equivalence relation: I = {(a, a) : a ∈ A}.',
        icon: '🆔'
      },
      {
        type: 'model',
        title: 'Binary Operations',
        desc: 'A rule that combines two elements of a set to produce another element of the same set.',
        icon: '⚙️'
      },
      {
        type: 'model',
        title: 'Equivalence Classes',
        desc: 'Partitions of a set where all elements in one group are related to each other.',
        icon: '🧩'
      }
    ],
    examples: [
      {
        scenario: 'Digital Signatures',
        details: 'Bijective functions ensure that every decrypted message matches exactly one original encrypted message.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  },
  {
    id: '12-math-2',
    subject: 'Mathematics',
    chapterId: '12-math-2',
    title: "Inverse Trigonometric Functions",
    summary: "Reversing the triangles. Master domain restrictions and property identities of arcsin, arccos, and arctan.",
    visuals: [
      {
        type: 'model',
        title: 'Restricted Domains',
        desc: 'Trig functions are only invertible when their domains are restricted to ensure one-to-one mapping.',
        icon: '🔒'
      },
      {
        type: 'model',
        title: 'Principal Value Branch',
        desc: 'The standard range of values for inverse trig functions (e.g., [-π/2, π/2] for arcsin).',
        icon: '📍'
      },
      {
        type: 'model',
        title: 'Property: sin(sin⁻¹x) = x',
        desc: 'The fundamental property of inverse functions within their allowed domain.',
        icon: '✅'
      },
      {
        type: 'model',
        title: 'Conversion Formulas',
        desc: 'Expressing arcsin in terms of arccos or arctan using right-triangle geometry.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'tan⁻¹x + tan⁻¹y formula',
        desc: 'Combining two angles into one. Essential for complex trigonometric simplifications.',
        icon: '➕'
      },
      {
        type: 'model',
        title: 'Graphs of Inverse Functions',
        desc: 'Observing how they are reflections of the original functions across the line y = x.',
        icon: '🪞'
      },
      {
        type: 'model',
        title: 'Domain of arcsin vs sin',
        desc: 'Understanding that the output of sin becomes the input of arcsin ([-1, 1]).',
        icon: '↔️'
      },
      {
        type: 'model',
        title: '2 tan⁻¹x identities',
        desc: 'Expressing 2 tan⁻¹x as arcsin or arccos using double-angle logic.',
        icon: '✖️'
      },
      {
        type: 'model',
        title: 'Simplification Techniques',
        desc: 'Substituting trigonometric terms (like x = tanθ) to solve complex inverse expressions.',
        icon: '🧪'
      },
      {
        type: 'model',
        title: 'The Arctan Spiral',
        desc: 'Visualizing how arc-tangent behaves as values approach infinity.',
        icon: '🌀'
      }
    ],
    examples: [
      {
        scenario: 'Robotic Arm Angles',
        details: 'Calculating the exact joint angles needed to reach a specific (x,y) point using inverse tangent.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70831-536968034_tiny.mp4'
  },
  {
    id: '12-math-3',
    subject: 'Mathematics',
    chapterId: '12-math-3',
    title: "Matrices",
    summary: "The algebra of grids. Master matrix operations, transpose, and the power of linear transformations.",
    visuals: [
      {
        type: 'model',
        title: 'Matrix Multiplication',
        desc: 'The row-by-column operation that underpins all modern 3D graphics and AI engines.',
        icon: '🗳️'
      },
      {
        type: 'model',
        title: 'Order of a Matrix',
        desc: 'Defined as m × n, representing the number of rows and columns respectively.',
        icon: '📏'
      },
      {
        type: 'model',
        title: 'Identity Matrix (I)',
        desc: 'A square matrix with 1s on the diagonal and 0s elsewhere. Acting as "1" in matrix algebra.',
        icon: '🆔'
      },
      {
        type: 'model',
        title: 'Transpose of a Matrix',
        desc: 'Swapping rows with columns. Essential for solving linear systems.',
        icon: '🔄'
      },
      {
        type: 'model',
        title: 'Symmetric Matrix',
        desc: 'A matrix that is its own transpose (A = A\'). Symmetric across the main diagonal.',
        icon: '⚖️'
      },
      {
        type: 'model',
        title: 'Skew-Symmetric Matrix',
        desc: 'A matrix where A = -A\'. The diagonal elements are always zero.',
        icon: '📐'
      },
      {
        type: 'model',
        title: 'Elementary Operations',
        desc: 'Swapping rows, multiplying by scalars, or adding rows to others. Used in Gauss-Jordan elimination.',
        icon: '⚙️'
      },
      {
        type: 'model',
        title: 'Matrix Inversion',
        desc: 'Finding A⁻¹ such that A × A⁻¹ = I. Only possible for non-singular square matrices.',
        icon: '🔑'
      },
      {
        type: 'model',
        title: 'Linear Transformations',
        desc: 'How matrices rotate, scale, and shear objects in a coordinate space.',
        icon: '🎭'
      },
      {
        type: 'model',
        title: 'Zero Matrix (O)',
        desc: 'A matrix where all entries are zero. Acts as the additive identity.',
        icon: '0️⃣'
      }
    ],
    examples: [
      {
        scenario: 'Image Processing',
        details: 'Applying a matrix "filter" to an image (grid of pixels) to detect edges or blur the background.'
      }
    ],
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5431-184512403_tiny.mp4'
  }
];
