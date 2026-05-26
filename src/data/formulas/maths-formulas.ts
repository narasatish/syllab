/**
 * Mathematics Formulas — Classes 6–12
 * NCERT curriculum aligned
 */

import type { FormulaSubject } from '../formulaBank';

export const mathsFormulaData: FormulaSubject = {
  id: 'maths',
  label: 'Mathematics',
  icon: '📐',
  gradient: 'from-blue-500 to-indigo-600',
  textColor: 'text-blue-700',
  sections: [
    {
      classLabel: 'Class 6–8',
      topics: [
        {
          topic: 'Basic Arithmetic',
          items: [
            { name: 'Percentage', formula: 'Percentage = (Part ÷ Whole) × 100', variables: 'Part = portion, Whole = total value', example: '40 out of 200 = (40÷200)×100 = 20%' },
            { name: 'Profit %', formula: 'Profit % = (Profit ÷ CP) × 100', variables: 'CP = Cost Price, Profit = SP − CP', example: 'CP=100, SP=120 → Profit%=20%' },
            { name: 'Loss %', formula: 'Loss % = (Loss ÷ CP) × 100', variables: 'CP = Cost Price, Loss = CP − SP' },
            { name: 'Simple Interest', formula: 'SI = (P × R × T) ÷ 100', variables: 'P = Principal, R = Rate %, T = Time (years)', example: 'P=1000, R=5%, T=2 → SI=100' },
            { name: 'Amount', formula: 'A = P + SI', variables: 'A = Total Amount, P = Principal, SI = Simple Interest' },
          ],
        },
        {
          topic: 'Fractions & Ratios',
          items: [
            { name: 'Ratio Proportion', formula: 'a:b = c:d → a×d = b×c', variables: 'Cross multiplication rule', example: '2:3 = 4:6 → 2×6 = 3×4 = 12' },
            { name: 'Unitary Method', formula: 'Value for 1 unit = Total ÷ Count', variables: 'Then multiply for required count' },
          ],
        },
        {
          topic: 'Integers & Divisibility',
          items: [
            { name: 'HCF Rule', formula: 'HCF × LCM = a × b', variables: 'For two numbers a and b', example: 'HCF(12,18)=6, LCM(12,18)=36, 6×36=12×18=216' },
            { name: 'Divisibility by 3', formula: 'Sum of digits divisible by 3', variables: '', example: '342: 3+4+2=9, divisible by 3 ✓' },
            { name: 'Divisibility by 9', formula: 'Sum of digits divisible by 9', variables: '', example: '729: 7+2+9=18, divisible by 9 ✓' },
            { name: 'LCM (Least Common)', formula: 'LCM = Product / HCF', variables: 'Product = a × b, HCF = highest common factor' },
          ],
        },
        {
          topic: 'Lines & Angles',
          items: [
            { name: 'Supplementary Angles', formula: '∠A + ∠B = 180°', variables: 'Angles on a straight line' },
            { name: 'Complementary Angles', formula: '∠A + ∠B = 90°', variables: 'Angles at a right angle' },
            { name: 'Vertically Opposite Angles', formula: '∠1 = ∠3, ∠2 = ∠4', variables: 'When two lines intersect, opposite angles are equal' },
          ],
        },
        {
          topic: 'Triangles',
          items: [
            { name: 'Angle Sum Property', formula: '∠A + ∠B + ∠C = 180°', variables: 'Sum of angles in any triangle' },
            { name: 'Exterior Angle', formula: 'Exterior angle = Sum of remote interior angles', variables: '∠ext = ∠A + ∠B (when ∠C is exterior)' },
            { name: 'Triangle Types', formula: 'Equilateral: all sides equal; Isosceles: 2 sides; Scalene: all different', variables: '' },
          ],
        },
        {
          topic: 'Geometry — Area & Perimeter',
          items: [
            { name: 'Rectangle Area', formula: 'A = l × b', variables: 'l = length, b = breadth' },
            { name: 'Rectangle Perimeter', formula: 'P = 2(l + b)', variables: 'l = length, b = breadth' },
            { name: 'Square Area', formula: 'A = a²', variables: 'a = side length' },
            { name: 'Square Perimeter', formula: 'P = 4a', variables: 'a = side length' },
            { name: 'Triangle Area', formula: 'A = ½ × base × height', variables: 'base and height must be perpendicular' },
            { name: 'Rhombus Area', formula: 'A = ½ × d₁ × d₂', variables: 'd₁, d₂ = diagonals' },
            { name: 'Trapezium Area', formula: 'A = ½ × (a + b) × h', variables: 'a, b = parallel sides, h = perpendicular distance' },
            { name: 'Circle Area', formula: 'A = πr²', variables: 'r = radius, π ≈ 3.14159' },
            { name: 'Circle Circumference', formula: 'C = 2πr', variables: 'r = radius' },
            { name: 'Parallelogram Area', formula: 'A = base × height', variables: 'height is perpendicular distance between parallel sides' },
          ],
        },
        {
          topic: 'Quadrilaterals',
          items: [
            { name: 'Angle Sum in Quadrilateral', formula: '∠A + ∠B + ∠C + ∠D = 360°', variables: 'Sum of all angles' },
            { name: 'Rectangle Properties', formula: 'Diagonals are equal and bisect each other', variables: '' },
            { name: 'Rhombus Properties', formula: 'Diagonals bisect each other at 90°', variables: '' },
          ],
        },
        {
          topic: 'Data Handling',
          items: [
            { name: 'Range', formula: 'Range = Maximum − Minimum', variables: 'Spread of data' },
            { name: 'Median (raw data)', formula: 'Middle value after arranging in order', variables: 'For n terms: position = (n+1)/2 if odd' },
            { name: 'Mode', formula: 'Most frequently occurring value', variables: 'Can have multiple modes' },
            { name: 'Mean', formula: 'Mean = Σx / n', variables: 'Σx = sum of all values, n = count' },
          ],
        },
        {
          topic: 'Algebra Basics',
          items: [
            { name: 'Linear Equation', formula: 'ax + b = 0 → x = −b/a', variables: 'a ≠ 0, b = constant' },
            { name: 'Exponent Rule (Product)', formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ', variables: 'Same base, add exponents' },
            { name: 'Exponent Rule (Power)', formula: '(aᵐ)ⁿ = aᵐⁿ', variables: 'Multiply exponents' },
            { name: 'Exponent (Zero)', formula: 'a⁰ = 1', variables: 'Any non-zero base raised to 0 = 1' },
          ],
        },
      ],
    },
    {
      classLabel: 'Class 9–10',
      topics: [
        {
          topic: 'Polynomials',
          items: [
            { name: 'Factor Theorem', formula: '(x−a) is a factor ⟺ f(a) = 0', variables: 'If f(a)=0, then (x−a) divides f(x)' },
            { name: 'Remainder Theorem', formula: 'Remainder = f(a) when f(x) is divided by (x−a)', variables: '' },
            { name: 'Polynomial Degree', formula: 'Degree = highest power of x', variables: 'e.g., x³+2x+1 has degree 3' },
          ],
        },
        {
          topic: 'Linear Equations (2 Variables)',
          items: [
            { name: 'Cross Multiplication', formula: 'a₁x + b₁y + c₁ = 0 AND a₂x + b₂y + c₂ = 0', variables: 'Solution: x/(b₁c₂−b₂c₁) = y/(c₁a₂−c₂a₁) = 1/(a₁b₂−a₂b₁)' },
            { name: 'Consistency (unique)', formula: 'a₁/a₂ ≠ b₁/b₂', variables: 'Lines intersect at one point' },
            { name: 'Consistency (infinite)', formula: 'a₁/a₂ = b₁/b₂ = c₁/c₂', variables: 'Lines are identical' },
            { name: 'Inconsistency', formula: 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂', variables: 'Lines are parallel, no solution' },
          ],
        },
        {
          topic: 'Quadratic Equations',
          items: [
            { name: 'Quadratic Formula', formula: 'x = [−b ± √(b²−4ac)] ÷ 2a', variables: 'ax² + bx + c = 0, Discriminant D = b²−4ac', example: 'x²−5x+6=0 → x=2 or x=3' },
            { name: 'Sum of Roots', formula: 'α + β = −b/a', variables: 'α and β are roots of ax²+bx+c=0' },
            { name: 'Product of Roots', formula: 'αβ = c/a', variables: 'α and β are roots of ax²+bx+c=0' },
            { name: 'Nature of Roots', formula: 'D>0: real & distinct; D=0: equal; D<0: imaginary', variables: 'D = discriminant = b²−4ac' },
          ],
        },
        {
          topic: 'Trigonometry',
          items: [
            { name: 'sin θ', formula: 'sin θ = Opposite / Hypotenuse', variables: 'In a right-angled triangle' },
            { name: 'cos θ', formula: 'cos θ = Adjacent / Hypotenuse', variables: 'In a right-angled triangle' },
            { name: 'tan θ', formula: 'tan θ = Opposite / Adjacent = sin θ / cos θ', variables: '' },
            { name: 'Pythagorean Identity', formula: 'sin²θ + cos²θ = 1', variables: 'Always true for any angle θ' },
            { name: 'Other Identities', formula: '1 + tan²θ = sec²θ | 1 + cot²θ = cosec²θ', variables: '' },
            { name: 'Standard Values', formula: 'sin30°=½  sin45°=1/√2  sin60°=√3/2  sin90°=1', variables: 'cos values reverse order: cos30°=√3/2 etc.' },
          ],
        },
        {
          topic: 'Triangle Theorems',
          items: [
            { name: 'Pythagoras Theorem', formula: 'a² + b² = c²', variables: 'c = hypotenuse, a,b = other sides' },
            { name: 'Similar Triangles Ratio', formula: 'If triangles are similar: corresponding sides are proportional', variables: 'Area ratio = (side ratio)²' },
            { name: 'BPT (Basic Proportionality)', formula: 'If DE || BC: AD/DB = AE/EC', variables: 'Thales theorem' },
          ],
        },
        {
          topic: 'Heights & Distances',
          items: [
            { name: 'Height from Angle', formula: 'height = distance × tan(angle)', variables: 'angle of elevation or depression' },
            { name: 'Distance from Height', formula: 'distance = height / tan(angle)', variables: '' },
          ],
        },
        {
          topic: 'Circles',
          items: [
            { name: 'Tangent Length', formula: 'PT = √(d² − r²)', variables: 'P = external point, T = tangent point, d = distance OP, r = radius' },
            { name: 'Arc Length', formula: 'l = (θ/360°) × 2πr', variables: 'θ = central angle in degrees' },
            { name: 'Sector Area', formula: 'A = (θ/360°) × πr²', variables: 'θ = central angle' },
          ],
        },
        {
          topic: 'Surface Area & Volume',
          items: [
            { name: 'Cube Volume', formula: 'V = a³', variables: 'a = edge length' },
            { name: 'Cube Surface Area', formula: 'SA = 6a²', variables: 'a = edge length' },
            { name: 'Cuboid Volume', formula: 'V = l × b × h', variables: 'l = length, b = breadth, h = height' },
            { name: 'Cylinder Volume', formula: 'V = πr²h', variables: 'r = radius, h = height' },
            { name: 'Cylinder CSA', formula: 'CSA = 2πrh', variables: 'Curved Surface Area' },
            { name: 'Cone Volume', formula: 'V = ⅓πr²h', variables: 'r = base radius, h = height' },
            { name: 'Cone Slant Height', formula: 'l = √(r² + h²)', variables: 'r = radius, h = height' },
            { name: 'Sphere Volume', formula: 'V = (4/3)πr³', variables: 'r = radius' },
            { name: 'Sphere Surface Area', formula: 'SA = 4πr²', variables: 'r = radius' },
          ],
        },
        {
          topic: 'Statistics',
          items: [
            { name: 'Mean', formula: 'Mean = Σx / n', variables: 'Σx = sum of all values, n = count of values' },
            { name: 'Median (odd n)', formula: 'Median = middle value after sorting', variables: 'Position = (n+1)/2' },
            { name: 'Median (even n)', formula: 'Median = (n/2 + (n+2)/2) / 2', variables: 'Average of two middle values' },
            { name: 'Mode', formula: 'Mode = most frequently occurring value', variables: '' },
          ],
        },
        {
          topic: 'Probability',
          items: [
            { name: 'Basic Probability', formula: 'P(E) = n(E) / n(S)', variables: 'n(E) = favourable outcomes, n(S) = total sample space' },
            { name: 'Complementary Event', formula: 'P(E′) = 1 − P(E)', variables: 'E′ = complement of E' },
          ],
        },
        {
          topic: 'Arithmetic Progression',
          items: [
            { name: 'nth Term', formula: 'aₙ = a + (n−1)d', variables: 'a = first term, d = common difference, n = term number' },
            { name: 'Sum of n terms', formula: 'Sₙ = n/2 × [2a + (n−1)d]', variables: 'or Sₙ = n/2 × (a + l), l = last term' },
          ],
        },
      ],
    },
    {
      classLabel: 'Class 11–12',
      topics: [
        {
          topic: 'Complex Numbers',
          items: [
            { name: 'Complex Number Form', formula: 'z = a + bi', variables: 'a = real part, b = imaginary part, i² = −1' },
            { name: 'Modulus', formula: '|z| = √(a² + b²)', variables: 'Distance from origin' },
            { name: 'Conjugate', formula: 'z* = a − bi', variables: 'If z = a + bi, then z* = a − bi' },
            { name: 'De Moivre Theorem', formula: 'z = r(cos θ + i sin θ) → zⁿ = rⁿ(cos nθ + i sin nθ)', variables: 'r = modulus, θ = argument' },
          ],
        },
        {
          topic: 'Sequences & Series',
          items: [
            { name: 'GP nth Term', formula: 'aₙ = a × rⁿ⁻¹', variables: 'a = first term, r = common ratio' },
            { name: 'GP Sum (finite)', formula: 'Sₙ = a(1−rⁿ)/(1−r)', variables: 'when r ≠ 1' },
            { name: 'GP Sum (infinite)', formula: 'S = a/(1−r)', variables: 'when |r| < 1' },
          ],
        },
        {
          topic: 'Binomial Theorem',
          items: [
            { name: 'Binomial Expansion', formula: '(a+b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ', variables: 'r = 0 to n' },
            { name: 'General Term', formula: 'Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ', variables: 'r = 0, 1, 2, ..., n' },
            { name: 'Middle Term', formula: 'If n is even: T₍ₙ₊₂₎/₂; If n is odd: T₍ₙ₊₁₎/₂ and T₍ₙ₊₃₎/₂', variables: '' },
          ],
        },
        {
          topic: 'Coordinate Geometry',
          items: [
            { name: 'Distance Formula', formula: 'd = √[(x₂−x₁)² + (y₂−y₁)²]', variables: '(x₁,y₁) and (x₂,y₂) are two points' },
            { name: 'Midpoint Formula', formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', variables: '' },
            { name: 'Slope of Line', formula: 'm = (y₂−y₁)/(x₂−x₁) = tan θ', variables: 'θ = angle with positive x-axis' },
            { name: 'Line Equation', formula: 'y − y₁ = m(x − x₁)', variables: 'Point-slope form' },
          ],
        },
        {
          topic: 'Vectors',
          items: [
            { name: 'Magnitude', formula: '|a| = √(x² + y² + z²)', variables: 'For 3D vector a = (x, y, z)' },
            { name: 'Dot Product', formula: 'a · b = |a||b|cos θ = a₁b₁ + a₂b₂ + a₃b₃', variables: 'θ = angle between vectors' },
            { name: 'Cross Product Magnitude', formula: '|a × b| = |a||b|sin θ', variables: 'Perpendicular to both a and b' },
            { name: 'Unit Vector', formula: 'û = u / |u|', variables: 'Vector of magnitude 1' },
          ],
        },
        {
          topic: '3D Geometry',
          items: [
            { name: 'Direction Cosines', formula: 'cos α, cos β, cos γ; where cos²α + cos²β + cos²γ = 1', variables: '' },
            { name: 'Distance Between Planes', formula: 'd = |c₁ − c₂| / √(a² + b² + c²)', variables: 'For parallel planes ax+by+cz=c₁ and ax+by+cz=c₂' },
            { name: 'Distance from Point to Plane', formula: 'd = |ax₀ + by₀ + cz₀ + d| / √(a²+b²+c²)', variables: 'Point (x₀,y₀,z₀) to plane ax+by+cz+d=0' },
          ],
        },
        {
          topic: 'Calculus — Differentiation',
          items: [
            { name: 'Power Rule', formula: 'd/dx(xⁿ) = nxⁿ⁻¹', variables: 'n = any real number', example: 'd/dx(x³) = 3x²' },
            { name: 'Product Rule', formula: 'd/dx(uv) = u·v′ + v·u′', variables: 'u, v are differentiable functions' },
            { name: 'Chain Rule', formula: 'd/dx[f(g(x))] = f′(g(x)) · g′(x)', variables: '' },
            { name: 'sin & cos', formula: 'd/dx(sin x) = cos x | d/dx(cos x) = −sin x', variables: '' },
            { name: 'eˣ & ln x', formula: 'd/dx(eˣ) = eˣ | d/dx(ln x) = 1/x', variables: '' },
          ],
        },
        {
          topic: 'Calculus — Integration',
          items: [
            { name: 'Power Rule', formula: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C', variables: 'n ≠ −1, C = constant of integration' },
            { name: 'sin & cos', formula: '∫sin x dx = −cos x + C | ∫cos x dx = sin x + C', variables: '' },
            { name: 'eˣ Integration', formula: '∫eˣ dx = eˣ + C', variables: '' },
            { name: 'Definite Integral', formula: '∫ₐᵇ f(x)dx = F(b) − F(a)', variables: 'F is antiderivative of f' },
          ],
        },
        {
          topic: 'Matrices',
          items: [
            { name: 'Order', formula: 'Matrix A of order m×n has m rows, n columns', variables: 'Total elements = m × n' },
            { name: 'Determinant (2×2)', formula: '|A| = ad − bc for [[a,b],[c,d]]', variables: '' },
            { name: 'Inverse (2×2)', formula: 'A⁻¹ = (1/|A|) × [[d,−b],[−c,a]]', variables: '|A| ≠ 0' },
            { name: 'Matrix Multiplication Rule', formula: '(m×n) × (n×p) = (m×p)', variables: 'Column of first = Row of second' },
          ],
        },
        {
          topic: 'Linear Programming',
          items: [
            { name: 'Objective Function', formula: 'Maximize/Minimize: Z = ax + by', variables: 'Subject to constraints' },
            { name: 'Feasible Region', formula: 'Intersection of all constraint inequalities', variables: 'Optimal solution at vertices' },
          ],
        },
        {
          topic: 'Probability (Advanced)',
          items: [
            { name: 'Conditional Probability', formula: 'P(A|B) = P(A∩B) / P(B)', variables: 'P(B) ≠ 0' },
            { name: "Baye's Theorem", formula: "P(A|B) = P(B|A)·P(A) / P(B)", variables: '' },
            { name: 'Binomial Distribution', formula: 'P(X=r) = ⁿCᵣ · pʳ · (1−p)ⁿ⁻ʳ', variables: 'n = trials, r = successes, p = probability of success' },
          ],
        },
      ],
    },
  ],
};
