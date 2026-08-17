/**
 * Formula Sheets — free, comprehensive CBSE/NCERT formula & key-concept sheets.
 * Programmatic SEO + linkable revision assets (PDF-downloadable). One page per sheet
 * at /formula-sheets/{slug}. Generated content; plain-text unicode (no LaTeX).
 */
export interface FormulaItem { name: string; formula: string; note?: string; }
export interface FormulaSection { heading: string; formulas: FormulaItem[]; }
export interface FormulaSheet { slug: string; title: string; classLevel: string; subject: string; emoji: string; intro: string; sections: FormulaSection[]; faqs: { q: string; a: string }[]; }

export const FORMULA_SHEETS: FormulaSheet[] = [
  {
    "title": "Class 10 Maths Formulas",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "emoji": "📐",
    "intro": "Essential formulas for CBSE Class 10 Maths covering Real Numbers, Polynomials, Linear/Quadratic Equations, AP, Triangles, Coordinate Geometry, Trigonometry, Circles, and Statistics. Master these formulas for board exams and competitive entrance tests.",
    "sections": [
      {
        "heading": "Real Numbers & Polynomials",
        "formulas": [
          {
            "name": "Euclid's Division Algorithm",
            "formula": "a = bq + r, where 0 ≤ r < b",
            "note": "For finding HCF of two numbers"
          },
          {
            "name": "Fundamental Theorem of Arithmetic",
            "formula": "Every positive integer > 1 is a product of primes, unique up to order",
            "note": "Used for HCF and LCM"
          },
          {
            "name": "Quadratic Formula",
            "formula": "x = (-b ± √(b² - 4ac)) / 2a",
            "note": "For ax² + bx + c = 0, discriminant D = b² - 4ac"
          },
          {
            "name": "Sum of roots",
            "formula": "α + β = -b/a",
            "note": "For quadratic ax² + bx + c = 0"
          },
          {
            "name": "Product of roots",
            "formula": "αβ = c/a",
            "note": "For quadratic ax² + bx + c = 0"
          },
          {
            "name": "Polynomial division identity",
            "formula": "p(x) = g(x) × q(x) + r(x)",
            "note": "where deg(r) < deg(g)"
          }
        ]
      },
      {
        "heading": "Linear Equations",
        "formulas": [
          {
            "name": "Linear equation in two variables",
            "formula": "ax + by + c = 0",
            "note": "General form; a ≠ 0 or b ≠ 0"
          },
          {
            "name": "Slope-intercept form",
            "formula": "y = mx + c",
            "note": "m = slope, c = y-intercept"
          },
          {
            "name": "Consistency condition",
            "formula": "For a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0: a₁/a₂ ≠ b₁/b₂ (unique solution)",
            "note": "If ratios equal, lines are parallel or identical"
          },
          {
            "name": "Determinant method (Cramer's rule)",
            "formula": "x = D₁/D, y = D₂/D where D = a₁b₂ - a₂b₁",
            "note": "For system of two linear equations"
          }
        ]
      },
      {
        "heading": "Arithmetic Progression",
        "formulas": [
          {
            "name": "nth term",
            "formula": "aₙ = a + (n - 1)d",
            "note": "a = first term, d = common difference"
          },
          {
            "name": "Sum of n terms",
            "formula": "Sₙ = n/2 [2a + (n - 1)d] or Sₙ = n/2 (a + l)",
            "note": "l = last term = a + (n - 1)d"
          },
          {
            "name": "Common difference",
            "formula": "d = aₙ₊₁ - aₙ",
            "note": "Difference between consecutive terms"
          },
          {
            "name": "Arithmetic mean",
            "formula": "A = (a + b)/2",
            "note": "Mean of two numbers a and b"
          }
        ]
      },
      {
        "heading": "Trigonometry",
        "formulas": [
          {
            "name": "Basic trigonometric ratios",
            "formula": "sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent",
            "note": "cot θ = 1/tan θ, sec θ = 1/cos θ, cosec θ = 1/sin θ"
          },
          {
            "name": "Pythagorean identity",
            "formula": "sin² θ + cos² θ = 1",
            "note": "Fundamental trigonometric identity"
          },
          {
            "name": "Reciprocal identity",
            "formula": "tan θ = sin θ/cos θ, cot θ = cos θ/sin θ",
            "note": "Relations between trigonometric ratios"
          },
          {
            "name": "Pythagorean variants",
            "formula": "1 + tan² θ = sec² θ, 1 + cot² θ = cosec² θ",
            "note": "Derived from sin² θ + cos² θ = 1"
          },
          {
            "name": "Trigonometric values of standard angles",
            "formula": "sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3; sin 45° = 1/√2, cos 45° = 1/√2, tan 45° = 1",
            "note": "Also sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3"
          },
          {
            "name": "Complementary angle relations",
            "formula": "sin(90° - θ) = cos θ, cos(90° - θ) = sin θ, tan(90° - θ) = cot θ",
            "note": "For complementary angles"
          },
          {
            "name": "Height and distance formula",
            "formula": "tan θ = height/distance",
            "note": "Used in angle of elevation and depression problems"
          }
        ]
      },
      {
        "heading": "Coordinate Geometry",
        "formulas": [
          {
            "name": "Distance formula",
            "formula": "d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
            "note": "Distance between points (x₁, y₁) and (x₂, y₂)"
          },
          {
            "name": "Section formula",
            "formula": "P = ((m × x₂ + n × x₁)/(m + n), (m × y₂ + n × y₁)/(m + n))",
            "note": "Point P divides line segment in ratio m:n internally"
          },
          {
            "name": "Midpoint formula",
            "formula": "M = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
            "note": "Midpoint of line segment joining (x₁, y₁) and (x₂, y₂)"
          },
          {
            "name": "Area of triangle",
            "formula": "Area = 1/2 |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|",
            "note": "Coordinates of vertices: (x₁, y₁), (x₂, y₂), (x₃, y₃)"
          },
          {
            "name": "Slope of line",
            "formula": "m = (y₂ - y₁)/(x₂ - x₁)",
            "note": "Slope between points (x₁, y₁) and (x₂, y₂)"
          }
        ]
      },
      {
        "heading": "Circles & Similarity",
        "formulas": [
          {
            "name": "Circumference of circle",
            "formula": "C = 2πr",
            "note": "r = radius"
          },
          {
            "name": "Area of circle",
            "formula": "A = πr²",
            "note": "r = radius"
          },
          {
            "name": "Arc length",
            "formula": "l = (θ/360°) × 2πr = (θ/180°) × πr (in radians: l = rθ)",
            "note": "θ in degrees; r = radius"
          },
          {
            "name": "Sector area",
            "formula": "A = (θ/360°) × πr²",
            "note": "θ in degrees"
          },
          {
            "name": "Segment area",
            "formula": "A = r²/2 (θ - sin θ) where θ is in radians",
            "note": "Area between chord and arc"
          },
          {
            "name": "Similar triangles ratio",
            "formula": "If △ABC ~ △DEF, then a/d = b/e = c/f = k (linear ratio), and Area(△ABC)/Area(△DEF) = k²",
            "note": "k = scale factor; areas in square of linear ratio"
          }
        ]
      },
      {
        "heading": "Surface Areas & Volumes",
        "formulas": [
          {
            "name": "Cube",
            "formula": "Surface Area = 6a², Volume = a³",
            "note": "a = side length"
          },
          {
            "name": "Cuboid",
            "formula": "Surface Area = 2(lb + bh + hl), Volume = l × b × h",
            "note": "l = length, b = breadth, h = height"
          },
          {
            "name": "Cylinder",
            "formula": "Curved Surface Area = 2πrh, Total Surface Area = 2πr(r + h), Volume = πr²h",
            "note": "r = radius, h = height"
          },
          {
            "name": "Cone",
            "formula": "Curved Surface Area = πrl, Total Surface Area = πr(r + l), Volume = 1/3 πr²h",
            "note": "r = radius, h = height, l = slant height = √(r² + h²)"
          },
          {
            "name": "Sphere",
            "formula": "Surface Area = 4πr², Volume = 4/3 πr³",
            "note": "r = radius"
          },
          {
            "name": "Hemisphere",
            "formula": "Curved Surface Area = 2πr², Total Surface Area = 3πr², Volume = 2/3 πr³",
            "note": "r = radius"
          }
        ]
      },
      {
        "heading": "Statistics & Probability",
        "formulas": [
          {
            "name": "Mean (Arithmetic average)",
            "formula": "Mean = (Σx)/n or Mean = (ΣfᵢXᵢ)/(Σfᵢ)",
            "note": "Σx = sum of all observations, n = number of observations, fᵢ = frequency"
          },
          {
            "name": "Mode",
            "formula": "Mode = most frequently occurring value",
            "note": "For grouped data: Mode = l + (f₁ - f₀)/((2f₁ - f₀ - f₂)) × h"
          },
          {
            "name": "Median",
            "formula": "For ungrouped: arrange in order, median is middle value. For grouped: Median = l + ((n/2 - cf)/f) × h",
            "note": "l = lower boundary of median class, cf = cumulative frequency, f = frequency of median class, h = class width"
          },
          {
            "name": "Variance",
            "formula": "σ² = (Σ(xᵢ - mean)²)/n",
            "note": "Measure of dispersion"
          },
          {
            "name": "Standard deviation",
            "formula": "σ = √[(Σ(xᵢ - mean)²)/n]",
            "note": "Square root of variance"
          },
          {
            "name": "Probability",
            "formula": "P(E) = (Number of favourable outcomes)/(Total number of outcomes)",
            "note": "0 ≤ P(E) ≤ 1; P(E) + P(not E) = 1"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the discriminant and why is it important?",
        "a": "The discriminant D = b² - 4ac determines the nature of roots in a quadratic equation ax² + bx + c = 0. If D > 0: two distinct real roots; D = 0: one repeated real root; D < 0: no real roots (two complex conjugate roots)."
      },
      {
        "q": "How do I solve a pair of linear equations?",
        "a": "Methods: (1) Substitution—express one variable in terms of other and substitute; (2) Elimination—multiply equations to eliminate one variable; (3) Graphical—plot lines and find intersection; (4) Determinant (Cramer's rule)—use determinants. Choose based on the form of equations."
      },
      {
        "q": "What's the difference between sin, cos, and tan?",
        "a": "sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. In a right-angled triangle, these ratios relate sides to the angle θ. Remember: SOH-CAH-TOA (Sine=Opposite/Hypotenuse, Cosine=Adjacent/Hypotenuse, Tangent=Opposite/Adjacent)."
      },
      {
        "q": "How do I find the area of a triangle given three vertices?",
        "a": "Use the coordinate geometry formula: Area = 1/2 |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|, where vertices are (x₁, y₁), (x₂, y₂), (x₃, y₃). The absolute value ensures the area is positive."
      },
      {
        "q": "What's the formula for the sum of an arithmetic progression?",
        "a": "Sₙ = n/2 [2a + (n - 1)d] where n = number of terms, a = first term, d = common difference. Alternatively, Sₙ = n/2 (a + l) where l is the last term."
      }
    ],
    "slug": "class-10-maths"
  },
  {
    "title": "Class 11 Maths Formulas",
    "classLevel": "Class 11",
    "subject": "Mathematics",
    "emoji": "📊",
    "intro": "Master Class 11 Maths formulas covering Trigonometry, Complex Numbers, Permutations & Combinations, Binomial Theorem, Sequences & Series, Straight Lines, Conic Sections, 3D Geometry, and Limits. Essential for JEE preparation and board exams.",
    "sections": [
      {
        "heading": "Trigonometric Identities & Functions",
        "formulas": [
          {
            "name": "Addition formulas",
            "formula": "sin(A + B) = sin A cos B + cos A sin B; sin(A - B) = sin A cos B - cos A sin B",
            "note": "Similarly for cos and tan"
          },
          {
            "name": "Cosine addition",
            "formula": "cos(A + B) = cos A cos B - sin A sin B; cos(A - B) = cos A cos B + sin A sin B",
            "note": ""
          },
          {
            "name": "Tangent addition",
            "formula": "tan(A + B) = (tan A + tan B)/(1 - tan A tan B); tan(A - B) = (tan A - tan B)/(1 + tan A tan B)",
            "note": ""
          },
          {
            "name": "Double angle formulas",
            "formula": "sin 2A = 2 sin A cos A; cos 2A = cos² A - sin² A = 2cos² A - 1 = 1 - 2sin² A; tan 2A = 2tan A/(1 - tan² A)",
            "note": ""
          },
          {
            "name": "Triple angle formulas",
            "formula": "sin 3A = 3 sin A - 4 sin³ A; cos 3A = 4 cos³ A - 3 cos A; tan 3A = (3tan A - tan³ A)/(1 - 3tan² A)",
            "note": ""
          },
          {
            "name": "Sum to product",
            "formula": "sin C + sin D = 2 sin((C + D)/2) cos((C - D)/2); cos C + cos D = 2 cos((C + D)/2) cos((C - D)/2)",
            "note": "Useful for simplifying trigonometric expressions"
          },
          {
            "name": "Product to sum",
            "formula": "2 sin A cos B = sin(A + B) + sin(A - B); 2 cos A cos B = cos(A + B) + cos(A - B)",
            "note": ""
          }
        ]
      },
      {
        "heading": "Complex Numbers",
        "formulas": [
          {
            "name": "Complex number definition",
            "formula": "z = a + ib, where i² = -1",
            "note": "a = real part, b = imaginary part"
          },
          {
            "name": "Modulus (absolute value)",
            "formula": "|z| = √(a² + b²)",
            "note": "For z = a + ib"
          },
          {
            "name": "Conjugate",
            "formula": "z* = a - ib",
            "note": "For z = a + ib; z × z* = |z|²"
          },
          {
            "name": "Argument (angle)",
            "formula": "arg(z) = tan⁻¹(b/a)",
            "note": "Angle made with positive real axis; consider quadrant"
          },
          {
            "name": "Polar form",
            "formula": "z = r(cos θ + i sin θ) = r e^(iθ)",
            "note": "where r = |z|, θ = arg(z)"
          },
          {
            "name": "De Moivre's Theorem",
            "formula": "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ",
            "note": "For integer n; also applies to zⁿ = rⁿ(cos nθ + i sin nθ)"
          },
          {
            "name": "nth roots of unity",
            "formula": "1^(1/n) = e^(2πik/n), k = 0, 1, 2, ..., n-1",
            "note": "Sum of nth roots of unity = 0"
          }
        ]
      },
      {
        "heading": "Permutations & Combinations",
        "formulas": [
          {
            "name": "Factorial",
            "formula": "n! = n × (n - 1) × (n - 2) × ... × 2 × 1; 0! = 1",
            "note": "Product of all positive integers up to n"
          },
          {
            "name": "Permutation (nPr)",
            "formula": "ⁿPᵣ = n!/(n - r)!",
            "note": "Number of ways to arrange r objects from n distinct objects"
          },
          {
            "name": "Combination (nCr)",
            "formula": "ⁿCᵣ = n!/(r!(n - r)!) = ⁿPᵣ/r!",
            "note": "Number of ways to choose r objects from n distinct objects; order doesn't matter"
          },
          {
            "name": "Properties of combinations",
            "formula": "ⁿC₀ = 1, ⁿCₙ = 1, ⁿCᵣ = ⁿCₙ₋ᵣ, ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ",
            "note": "Pascal's identity: ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ"
          },
          {
            "name": "Circular permutations",
            "formula": "(n - 1)!",
            "note": "Arrangements of n distinct objects in a circle"
          },
          {
            "name": "Permutations with repetition",
            "formula": "nʳ",
            "note": "r selections from n objects with replacement"
          }
        ]
      },
      {
        "heading": "Binomial Theorem",
        "formulas": [
          {
            "name": "Binomial expansion",
            "formula": "(x + y)ⁿ = Σ ⁿCᵣ xⁿ⁻ʳ yʳ (r = 0 to n)",
            "note": "Expansion of (x + y)ⁿ using binomial coefficients"
          },
          {
            "name": "General term",
            "formula": "Tᵣ₊₁ = ⁿCᵣ xⁿ⁻ʳ yʳ",
            "note": "(r + 1)th term in binomial expansion"
          },
          {
            "name": "Middle term",
            "formula": "If n is even: T₍ₙ/₂₎₊₁; If n is odd: T₍ₙ₊₁₎/₂ and T₍ₙ₊₃₎/₂",
            "note": "There are two middle terms if n is odd"
          },
          {
            "name": "Sum of binomial coefficients",
            "formula": "ⁿC₀ + ⁿC₁ + ⁿC₂ + ... + ⁿCₙ = 2ⁿ",
            "note": "Sum of all binomial coefficients"
          },
          {
            "name": "Binomial series",
            "formula": "(1 + x)ⁿ = 1 + nx + n(n-1)/2! x² + n(n-1)(n-2)/3! x³ + ...",
            "note": "For |x| < 1; used for fractional and negative exponents"
          }
        ]
      },
      {
        "heading": "Sequences & Series (AP & GP)",
        "formulas": [
          {
            "name": "Arithmetic Progression (AP)",
            "formula": "aₙ = a + (n - 1)d; Sₙ = n/2[2a + (n - 1)d]",
            "note": "a = first term, d = common difference"
          },
          {
            "name": "Geometric Progression (GP)",
            "formula": "aₙ = ar^(n-1); Sₙ = a(1 - rⁿ)/(1 - r) if r ≠ 1",
            "note": "a = first term, r = common ratio"
          },
          {
            "name": "Sum of infinite GP",
            "formula": "S∞ = a/(1 - r) if |r| < 1",
            "note": "Only converges if |r| < 1"
          },
          {
            "name": "Arithmetic Mean (AM)",
            "formula": "A = (a + b)/2",
            "note": "Mean of two numbers"
          },
          {
            "name": "Geometric Mean (GM)",
            "formula": "G = √(ab)",
            "note": "For two positive numbers a and b"
          },
          {
            "name": "Harmonic Mean (HM)",
            "formula": "H = 2ab/(a + b)",
            "note": "Reciprocal of AM of reciprocals"
          },
          {
            "name": "AM-GM-HM inequality",
            "formula": "A ≥ G ≥ H, with equality iff a = b",
            "note": "Useful inequality for two positive numbers"
          }
        ]
      },
      {
        "heading": "Straight Lines",
        "formulas": [
          {
            "name": "Slope of line",
            "formula": "m = tan θ = (y₂ - y₁)/(x₂ - x₁)",
            "note": "θ = angle with positive x-axis"
          },
          {
            "name": "Point-slope form",
            "formula": "y - y₁ = m(x - x₁)",
            "note": "Line passing through (x₁, y₁) with slope m"
          },
          {
            "name": "Slope-intercept form",
            "formula": "y = mx + c",
            "note": "m = slope, c = y-intercept"
          },
          {
            "name": "Two-point form",
            "formula": "(y - y₁)/(y₂ - y₁) = (x - x₁)/(x₂ - x₁)",
            "note": "Line through points (x₁, y₁) and (x₂, y₂)"
          },
          {
            "name": "Intercept form",
            "formula": "x/a + y/b = 1",
            "note": "a = x-intercept, b = y-intercept"
          },
          {
            "name": "Distance from point to line",
            "formula": "d = |ax₀ + by₀ + c|/√(a² + b²)",
            "note": "Distance from (x₀, y₀) to line ax + by + c = 0"
          },
          {
            "name": "Angle between two lines",
            "formula": "tan θ = |m₁ - m₂|/(1 + m₁m₂)",
            "note": "Slopes m₁ and m₂; parallel if m₁ = m₂, perpendicular if m₁m₂ = -1"
          }
        ]
      },
      {
        "heading": "Conic Sections",
        "formulas": [
          {
            "name": "Circle",
            "formula": "Standard: (x - h)² + (y - k)² = r²; General: x² + y² + 2gx + 2fy + c = 0",
            "note": "Center: (h, k) or (-g, -f), Radius: r or √(g² + f² - c)"
          },
          {
            "name": "Parabola",
            "formula": "Standard: y² = 4ax (focus at (a, 0)), x² = 4ay (focus at (0, a))",
            "note": "Vertex at origin; directrix x = -a or y = -a"
          },
          {
            "name": "Ellipse",
            "formula": "Standard: x²/a² + y²/b² = 1 (a > b); eccentricity e = √(1 - b²/a²)",
            "note": "Foci at (±c, 0) where c² = a² - b²"
          },
          {
            "name": "Hyperbola",
            "formula": "Standard: x²/a² - y²/b² = 1; eccentricity e = √(1 + b²/a²)",
            "note": "Foci at (±c, 0) where c² = a² + b²; asymptotes: y = ±(b/a)x"
          }
        ]
      },
      {
        "heading": "3D Geometry",
        "formulas": [
          {
            "name": "Distance formula in 3D",
            "formula": "d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]",
            "note": "Distance between points P₁(x₁, y₁, z₁) and P₂(x₂, y₂, z₂)"
          },
          {
            "name": "Section formula in 3D",
            "formula": "P = ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n), (mz₂ + nz₁)/(m + n))",
            "note": "Point dividing line segment in ratio m:n"
          },
          {
            "name": "Direction cosines",
            "formula": "If line makes angles α, β, γ with x, y, z axes, then l = cos α, m = cos β, n = cos γ; l² + m² + n² = 1",
            "note": "Direction cosines satisfy l² + m² + n² = 1"
          },
          {
            "name": "Equation of plane",
            "formula": "Ax + By + Cz + D = 0",
            "note": "General form; normal vector: (A, B, C)"
          },
          {
            "name": "Distance from point to plane",
            "formula": "d = |Ax₀ + By₀ + Cz₀ + D|/√(A² + B² + C²)",
            "note": "Distance from point (x₀, y₀, z₀) to plane"
          }
        ]
      },
      {
        "heading": "Limits & Continuity",
        "formulas": [
          {
            "name": "Limit definition",
            "formula": "lim(x→a) f(x) = L means for every ε > 0, ∃ δ > 0 such that |f(x) - L| < ε whenever |x - a| < δ",
            "note": "Formal definition of limit"
          },
          {
            "name": "Limit laws",
            "formula": "lim[f(x) + g(x)] = lim f(x) + lim g(x); lim[f(x) × g(x)] = lim f(x) × lim g(x); lim[f(x)/g(x)] = lim f(x)/lim g(x) if lim g(x) ≠ 0",
            "note": "Assuming individual limits exist"
          },
          {
            "name": "Standard limits",
            "formula": "lim(x→0) sin x/x = 1; lim(x→0) (1 - cos x)/x² = 1/2; lim(x→∞) (1 + 1/x)ˣ = e",
            "note": "Important limits to memorize"
          },
          {
            "name": "L'Hôpital's Rule",
            "formula": "lim(x→a) f(x)/g(x) = lim(x→a) f'(x)/g'(x)",
            "note": "If 0/0 or ∞/∞ form"
          },
          {
            "name": "Continuity at a point",
            "formula": "f is continuous at x = a if lim(x→a) f(x) = f(a)",
            "note": "Left limit = Right limit = Function value"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What's the difference between permutation and combination?",
        "a": "Permutation (ⁿPᵣ) counts arrangements where order matters. Combination (ⁿCᵣ) counts selections where order doesn't matter. For example, ABC and BAC are different permutations but the same combination. Formula: ⁿPᵣ = n!/(n-r)!, ⁿCᵣ = n!/(r!(n-r)!)"
      },
      {
        "q": "How do I use the binomial theorem?",
        "a": "The binomial theorem states (x + y)ⁿ = Σ ⁿCᵣ xⁿ⁻ʳ yʳ. Each term is ⁿCᵣ xⁿ⁻ʳ yʳ. To find a specific term, use Tᵣ₊₁ = ⁿCᵣ xⁿ⁻ʳ yʳ. The sum of all coefficients is 2ⁿ. This is useful for expanding (a+b)ⁿ and finding specific terms."
      },
      {
        "q": "What are the trigonometric addition formulas and when do I use them?",
        "a": "sin(A±B) = sin A cos B ± cos A sin B and cos(A±B) = cos A cos B ∓ sin A sin B. Use them to find sin/cos of angles not in standard tables, to simplify expressions, or to prove identities. Double angle formulas (A = B) are: sin 2A = 2sin A cos A, cos 2A = cos²A - sin²A."
      },
      {
        "q": "How do I find the distance from a point to a line?",
        "a": "For point (x₀, y₀) and line ax + by + c = 0, use: d = |ax₀ + by₀ + c|/√(a² + b²). The formula gives the perpendicular distance. Make sure the line equation is in the form ax + by + c = 0 before applying it."
      },
      {
        "q": "What's the relationship between AM, GM, and HM?",
        "a": "For two positive numbers a and b: AM = (a+b)/2, GM = √(ab), HM = 2ab/(a+b). They satisfy AM ≥ GM ≥ HM, with equality only when a = b. This inequality is useful in optimization problems and proofs."
      }
    ],
    "slug": "class-11-maths"
  },
  {
    "title": "Class 12 Maths Formulas",
    "classLevel": "Class 12",
    "subject": "Mathematics",
    "emoji": "∫",
    "intro": "Comprehensive Class 12 Maths formulas covering Inverse Trigonometry, Matrices & Determinants, Continuity & Differentiability, Derivatives, Integration, Differential Equations, Vectors, 3D Geometry, and Probability. Essential for board exams and competitive entrance tests.",
    "sections": [
      {
        "heading": "Inverse Trigonometric Functions",
        "formulas": [
          {
            "name": "Domain and range of inverse trig functions",
            "formula": "sin⁻¹: [-1, 1] → [-π/2, π/2]; cos⁻¹: [-1, 1] → [0, π]; tan⁻¹: ℝ → (-π/2, π/2)",
            "note": "cot⁻¹: ℝ → (0, π); sec⁻¹: ℝ∖(-1,1) → [0,π]∖{π/2}; cosec⁻¹: ℝ∖(-1,1) → [-π/2,π/2]∖{0}"
          },
          {
            "name": "Complementary inverse trig relations",
            "formula": "sin⁻¹ x + cos⁻¹ x = π/2; tan⁻¹ x + cot⁻¹ x = π/2; sec⁻¹ x + cosec⁻¹ x = π/2",
            "note": "For x in appropriate domains"
          },
          {
            "name": "Inverse trig sum formulas",
            "formula": "tan⁻¹ x + tan⁻¹ y = tan⁻¹((x + y)/(1 - xy)) if xy < 1; = π + tan⁻¹((x + y)/(1 - xy)) if xy > 1, x > 0",
            "note": ""
          },
          {
            "name": "sin⁻¹ x + sin⁻¹ y formula",
            "formula": "sin⁻¹ x + sin⁻¹ y = sin⁻¹(x√(1-y²) + y√(1-x²)) if x² + y² ≤ 1",
            "note": ""
          },
          {
            "name": "Derivatives of inverse trig functions",
            "formula": "d/dx(sin⁻¹ x) = 1/√(1-x²); d/dx(cos⁻¹ x) = -1/√(1-x²); d/dx(tan⁻¹ x) = 1/(1+x²)",
            "note": "d/dx(cot⁻¹ x) = -1/(1+x²); d/dx(sec⁻¹ x) = 1/(|x|√(x²-1)); d/dx(cosec⁻¹ x) = -1/(|x|√(x²-1))"
          }
        ]
      },
      {
        "heading": "Matrices & Determinants",
        "formulas": [
          {
            "name": "Matrix addition and scalar multiplication",
            "formula": "(A + B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ; (kA)ᵢⱼ = kAᵢⱼ",
            "note": "Commutative: A + B = B + A; Associative: (A + B) + C = A + (B + C)"
          },
          {
            "name": "Matrix multiplication",
            "formula": "(AB)ᵢⱼ = Σₖ Aᵢₖ Bₖⱼ",
            "note": "Not commutative: AB ≠ BA in general; Associative: (AB)C = A(BC)"
          },
          {
            "name": "Transpose of a matrix",
            "formula": "(Aᵀ)ᵢⱼ = Aⱼᵢ",
            "note": "(AB)ᵀ = BᵀAᵀ; (A + B)ᵀ = Aᵀ + Bᵀ"
          },
          {
            "name": "Symmetric and skew-symmetric matrices",
            "formula": "Symmetric: Aᵀ = A; Skew-symmetric: Aᵀ = -A",
            "note": "Any matrix A = (A + Aᵀ)/2 + (A - Aᵀ)/2 (sum of symmetric and skew-symmetric)"
          },
          {
            "name": "Determinant of 2×2 matrix",
            "formula": "det([a b; c d]) = ad - bc",
            "note": ""
          },
          {
            "name": "Determinant of 3×3 matrix (expansion)",
            "formula": "det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)",
            "note": "Expansion along first row of [a b c; d e f; g h i]"
          },
          {
            "name": "Adjugate and inverse",
            "formula": "Inverse: A⁻¹ = adj(A)/det(A); Cofactor Cᵢⱼ = (-1)^(i+j) × minor Mᵢⱼ; adj(A) = (Cofactor matrix)ᵀ",
            "note": "A exists only if det(A) ≠ 0"
          },
          {
            "name": "Determinant properties",
            "formula": "det(AB) = det(A) × det(B); det(Aᵀ) = det(A); det(kA) = kⁿ det(A) for n×n matrix",
            "note": "Swapping rows changes sign; Same rows/columns → det = 0"
          }
        ]
      },
      {
        "heading": "Continuity & Differentiability",
        "formulas": [
          {
            "name": "Continuity at a point",
            "formula": "f is continuous at x = a if lim(x→a) f(x) = f(a)",
            "note": "Three conditions: (1) f(a) defined, (2) limit exists, (3) they're equal"
          },
          {
            "name": "Differentiability at a point",
            "formula": "f'(a) = lim(h→0) [f(a+h) - f(a)]/h (right derivative = left derivative)",
            "note": "If differentiable at a, then continuous at a. Converse is not always true."
          },
          {
            "name": "Algebra of derivatives",
            "formula": "(u + v)' = u' + v'; (uv)' = u'v + uv'; (u/v)' = (u'v - uv')/v²",
            "note": "Product rule and quotient rule"
          },
          {
            "name": "Chain rule",
            "formula": "dy/dx = (dy/du) × (du/dx)",
            "note": "For composite functions; if y = f(u) and u = g(x)"
          },
          {
            "name": "Parametric differentiation",
            "formula": "dy/dx = (dy/dt)/(dx/dt)",
            "note": "When x = f(t) and y = g(t)"
          },
          {
            "name": "Implicit differentiation",
            "formula": "Differentiate both sides w.r.t. x and solve for dy/dx",
            "note": "When y is not explicitly given as function of x"
          },
          {
            "name": "Logarithmic differentiation",
            "formula": "For y = u^v, take ln: ln y = v ln u, then differentiate",
            "note": "Useful for functions like y = x^x or y = (sin x)^x"
          }
        ]
      },
      {
        "heading": "Derivatives of Standard Functions",
        "formulas": [
          {
            "name": "Power rule",
            "formula": "d/dx(xⁿ) = nxⁿ⁻¹",
            "note": ""
          },
          {
            "name": "Exponential and logarithmic",
            "formula": "d/dx(eˣ) = eˣ; d/dx(aˣ) = aˣ ln a; d/dx(ln x) = 1/x; d/dx(log_a x) = 1/(x ln a)",
            "note": ""
          },
          {
            "name": "Trigonometric",
            "formula": "d/dx(sin x) = cos x; d/dx(cos x) = -sin x; d/dx(tan x) = sec² x",
            "note": "d/dx(cot x) = -cosec² x; d/dx(sec x) = sec x tan x; d/dx(cosec x) = -cosec x cot x"
          },
          {
            "name": "Inverse trigonometric",
            "formula": "d/dx(sin⁻¹ x) = 1/√(1-x²); d/dx(tan⁻¹ x) = 1/(1+x²); d/dx(sec⁻¹ x) = 1/(|x|√(x²-1))",
            "note": ""
          },
          {
            "name": "Hyperbolic functions",
            "formula": "d/dx(sinh x) = cosh x; d/dx(cosh x) = sinh x; d/dx(tanh x) = sech² x",
            "note": "sinh x = (eˣ - e⁻ˣ)/2, cosh x = (eˣ + e⁻ˣ)/2"
          }
        ]
      },
      {
        "heading": "Applications of Derivatives",
        "formulas": [
          {
            "name": "Tangent and normal",
            "formula": "Tangent: y - y₁ = f'(x₁)(x - x₁); Normal: y - y₁ = -(1/f'(x₁))(x - x₁)",
            "note": "At point (x₁, y₁) on curve y = f(x)"
          },
          {
            "name": "Rate of change",
            "formula": "dy/dt = (dy/dx) × (dx/dt)",
            "note": "Related rates problems"
          },
          {
            "name": "Increasing and decreasing functions",
            "formula": "f'(x) > 0 ⟹ f increasing; f'(x) < 0 ⟹ f decreasing",
            "note": "First derivative test"
          },
          {
            "name": "Local maxima and minima",
            "formula": "Critical points: f'(x) = 0. Second derivative test: f''(x) > 0 (minimum), f''(x) < 0 (maximum)",
            "note": "If f''(x) = 0, test further"
          },
          {
            "name": "Approximation (linear)",
            "formula": "f(x + Δx) ≈ f(x) + f'(x) × Δx",
            "note": "dy = f'(x) dx"
          },
          {
            "name": "Mean Value Theorem",
            "formula": "If f continuous on [a, b] and differentiable on (a, b), then ∃ c ∈ (a, b): f'(c) = [f(b) - f(a)]/(b - a)",
            "note": ""
          }
        ]
      },
      {
        "heading": "Integration",
        "formulas": [
          {
            "name": "Indefinite integral definition",
            "formula": "∫ f(x) dx = F(x) + C if F'(x) = f(x)",
            "note": "F(x) is antiderivative, C is constant of integration"
          },
          {
            "name": "Integration of standard functions",
            "formula": "∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1); ∫ (1/x) dx = ln|x| + C; ∫ eˣ dx = eˣ + C",
            "note": "∫ aˣ dx = aˣ/ln a + C"
          },
          {
            "name": "Trigonometric integrals",
            "formula": "∫ sin x dx = -cos x + C; ∫ cos x dx = sin x + C; ∫ sec² x dx = tan x + C; ∫ cosec² x dx = -cot x + C",
            "note": "∫ sec x tan x dx = sec x + C; ∫ cosec x cot x dx = -cosec x + C"
          },
          {
            "name": "Inverse trigonometric integrals",
            "formula": "∫ 1/√(1-x²) dx = sin⁻¹ x + C; ∫ 1/(1+x²) dx = tan⁻¹ x + C; ∫ 1/(x√(x²-1)) dx = sec⁻¹|x| + C",
            "note": ""
          },
          {
            "name": "Integration by substitution",
            "formula": "∫ f(g(x)) g'(x) dx = ∫ f(u) du where u = g(x)",
            "note": "Change of variable"
          },
          {
            "name": "Integration by parts",
            "formula": "∫ u dv = uv - ∫ v du",
            "note": "Use ILATE rule: Inverse, Logarithm, Algebraic, Trigonometric, Exponential"
          },
          {
            "name": "Partial fractions",
            "formula": "Decompose rational function into partial fractions before integrating",
            "note": "For P(x)/Q(x) where deg(P) < deg(Q)"
          },
          {
            "name": "Definite integral",
            "formula": "∫ₐᵇ f(x) dx = F(b) - F(a) where F is antiderivative",
            "note": "Fundamental theorem of calculus"
          },
          {
            "name": "Properties of definite integrals",
            "formula": "∫ₐᵇ f(x) dx = -∫ᵇₐ f(x) dx; ∫ₐᵃ f(x) dx = 0; ∫ₐᵇ [f(x) + g(x)] dx = ∫ₐᵇ f(x) dx + ∫ₐᵇ g(x) dx",
            "note": "Linearity and additivity properties"
          }
        ]
      },
      {
        "heading": "Differential Equations",
        "formulas": [
          {
            "name": "Order and degree",
            "formula": "Order = highest derivative present; Degree = power of highest derivative",
            "note": "For (d³y/dx³)² + (d²y/dx²) - 3dy/dx + y = 0: order 3, degree 2"
          },
          {
            "name": "Separable differential equation",
            "formula": "dy/dx = f(x)/g(y) ⟹ g(y) dy = f(x) dx ⟹ integrate both sides",
            "note": "Variables can be separated"
          },
          {
            "name": "Linear differential equation (first order)",
            "formula": "dy/dx + Py = Q where P, Q are functions of x; solution: y = e^(-∫P dx) [∫Q e^(∫P dx) dx + C]",
            "note": "Using integrating factor IF = e^(∫P dx)"
          },
          {
            "name": "Homogeneous differential equation",
            "formula": "dy/dx = f(y/x); substitute v = y/x ⟹ y = vx ⟹ dy = v dx + x dv",
            "note": "Reduces to separable form"
          }
        ]
      },
      {
        "heading": "Vectors",
        "formulas": [
          {
            "name": "Vector magnitude and unit vector",
            "formula": "|a| = √(a₁² + a₂² + a₃²); unit vector = a/|a|",
            "note": "For vector a = (a₁, a₂, a₃)"
          },
          {
            "name": "Dot product (scalar product)",
            "formula": "a · b = |a||b| cos θ = a₁b₁ + a₂b₂ + a₃b₃",
            "note": "Angle between vectors: cos θ = (a·b)/(|a||b|)"
          },
          {
            "name": "Cross product (vector product)",
            "formula": "a × b = |a||b| sin θ n̂ = |i  j  k | = (a₂b₃ - a₃b₂)i - (a₁b₃ - a₃b₁)j + (a₁b₂ - a₂b₁)k",
            "note": "|a × b| = area of parallelogram; direction by right-hand rule"
          },
          {
            "name": "Scalar triple product",
            "formula": "a · (b × c) = (a × b) · c = |a₁ a₂ a₃| = volume of parallelepiped",
            "note": "|b₁ b₂ b₃|"
          },
          {
            "name": "Projection of a on b",
            "formula": "proj_b a = (a · b)/|b| = |a| cos θ",
            "note": "Scalar projection; vector projection = (a·b/|b|²) × b"
          },
          {
            "name": "Perpendicularity and parallelism",
            "formula": "a ⊥ b ⟺ a · b = 0; a ∥ b ⟺ a × b = 0",
            "note": ""
          }
        ]
      },
      {
        "heading": "3D Geometry",
        "formulas": [
          {
            "name": "Equation of line (parametric)",
            "formula": "(x, y, z) = (x₀, y₀, z₀) + t(a, b, c) or x-x₀/a = y-y₀/b = z-z₀/c",
            "note": "(x₀, y₀, z₀) is point on line; (a, b, c) is direction vector"
          },
          {
            "name": "Angle between two lines",
            "formula": "cos θ = |a₁a₂ + b₁b₂ + c₁c₂| / (√(a₁² + b₁² + c₁²) × √(a₂² + b₂² + c₂²))",
            "note": "For direction vectors (a₁, b₁, c₁) and (a₂, b₂, c₂)"
          },
          {
            "name": "Equation of plane",
            "formula": "A(x - x₀) + B(y - y₀) + C(z - z₀) = 0 or Ax + By + Cz + D = 0",
            "note": "(A, B, C) is normal vector"
          },
          {
            "name": "Angle between two planes",
            "formula": "cos θ = |A₁A₂ + B₁B₂ + C₁C₂| / (√(A₁² + B₁² + C₁²) × √(A₂² + B₂² + C₂²))",
            "note": "Normal vectors: (A₁, B₁, C₁) and (A₂, B₂, C₂)"
          },
          {
            "name": "Distance from point to plane",
            "formula": "d = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)",
            "note": "Point (x₀, y₀, z₀) to plane Ax + By + Cz + D = 0"
          }
        ]
      },
      {
        "heading": "Probability & Statistics",
        "formulas": [
          {
            "name": "Conditional probability",
            "formula": "P(A|B) = P(A ∩ B) / P(B)",
            "note": "Probability of A given B has occurred"
          },
          {
            "name": "Multiplication rule",
            "formula": "P(A ∩ B) = P(A) × P(B|A) = P(B) × P(A|B)",
            "note": ""
          },
          {
            "name": "Total probability theorem",
            "formula": "P(A) = P(A|B₁)P(B₁) + P(A|B₂)P(B₂) + ... + P(A|Bₙ)P(Bₙ)",
            "note": "If B₁, B₂, ..., Bₙ partition sample space"
          },
          {
            "name": "Bayes' theorem",
            "formula": "P(Bᵢ|A) = P(A|Bᵢ)P(Bᵢ) / Σ P(A|Bⱼ)P(Bⱼ)",
            "note": "Posterior probability; used for updating beliefs"
          },
          {
            "name": "Independence",
            "formula": "A and B independent ⟺ P(A ∩ B) = P(A) × P(B) ⟺ P(A|B) = P(A)",
            "note": ""
          },
          {
            "name": "Binomial probability",
            "formula": "P(X = k) = ⁿCₖ pᵏ (1-p)ⁿ⁻ᵏ",
            "note": "X ~ B(n, p); n trials, p = success probability"
          },
          {
            "name": "Expected value (mean)",
            "formula": "E(X) = Σ xᵢ P(xᵢ)",
            "note": "For binomial: E(X) = np"
          },
          {
            "name": "Variance and standard deviation",
            "formula": "Var(X) = E(X²) - [E(X)]² = Σ (xᵢ - μ)² P(xᵢ); σ = √Var(X)",
            "note": "For binomial: Var(X) = np(1-p)"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What's the difference between definite and indefinite integrals?",
        "a": "Indefinite integral ∫f(x)dx = F(x) + C gives a family of antiderivatives with arbitrary constant C. Definite integral ∫ₐᵇf(x)dx = F(b) - F(a) gives a specific number (area under curve from a to b). Use the Fundamental Theorem of Calculus to connect them."
      },
      {
        "q": "When should I use integration by parts vs substitution?",
        "a": "Use substitution when you can identify a function and its derivative in the integrand. Use integration by parts when you have a product of functions (especially polynomial × exponential/trig). Remember ILATE: Inverse trig, Logarithm, Algebraic, Trigonometric, Exponential—choose the first function by this priority."
      },
      {
        "q": "What's the difference between order and degree of a differential equation?",
        "a": "Order is the highest derivative present (e.g., d²y/dx² = order 2). Degree is the power/exponent of the highest derivative (e.g., (d²y/dx²)³ = degree 3). For example, (d²y/dx²)² + dy/dx = 0 has order 2, degree 2."
      },
      {
        "q": "How do I find the angle between two vectors?",
        "a": "Use the dot product formula: cos θ = (a·b)/(|a||b|). First calculate a·b = a₁b₁ + a₂b₂ + a₃b₃, then |a| = √(a₁² + a₂² + a₃²), |b| = √(b₁² + b₂² + b₃²). Then θ = arccos of the result."
      },
      {
        "q": "What's Bayes' theorem and when do I use it?",
        "a": "Bayes' theorem: P(Bᵢ|A) = P(A|Bᵢ)P(Bᵢ)/[ΣP(A|Bⱼ)P(Bⱼ)]. It updates the probability of an event based on new evidence. Use it when you know the probability of observing evidence given different causes, and want to find the probability of a cause given the observed evidence (e.g., disease diagnosis given test result)."
      }
    ],
    "slug": "class-12-maths"
  },
  {
    "title": "Class 10 Physics & Numerics Formula Sheet",
    "classLevel": "Class 10",
    "subject": "Science",
    "emoji": "🔬",
    "intro": "Essential physics formulas for CBSE Class 10 Science. Covers optics, electricity, magnetism, and human eye. All SI units.",
    "sections": [
      {
        "heading": "Light & Mirrors",
        "formulas": [
          {
            "name": "Mirror Formula",
            "formula": "1/f = 1/u + 1/v",
            "note": "f = focal length, u = object distance, v = image distance. Sign convention: real (+), virtual (-)"
          },
          {
            "name": "Magnification (Mirror)",
            "formula": "m = -v/u = h'/h",
            "note": "h = object height, h' = image height. m negative = inverted image"
          },
          {
            "name": "Focal Length",
            "formula": "f = R/2",
            "note": "R = radius of curvature. Concave mirror f > 0, convex f < 0"
          }
        ]
      },
      {
        "heading": "Lenses",
        "formulas": [
          {
            "name": "Lens Formula",
            "formula": "1/f = 1/u + 1/v",
            "note": "Same as mirrors. Convex lens f > 0, concave f < 0"
          },
          {
            "name": "Magnification (Lens)",
            "formula": "m = v/u = h'/h",
            "note": "For lenses, m positive = erect, m negative = inverted"
          },
          {
            "name": "Power of Lens",
            "formula": "P = 1/f (in metres)",
            "note": "P in diopters (D). 1 D = 1 m⁻¹"
          },
          {
            "name": "Lens Maker's Formula",
            "formula": "1/f = (n-1)[1/R₁ - 1/R₂]",
            "note": "n = refractive index, R₁ & R₂ = radii of curvature"
          }
        ]
      },
      {
        "heading": "Electricity & Ohm's Law",
        "formulas": [
          {
            "name": "Ohm's Law",
            "formula": "V = IR",
            "note": "V = potential difference (V), I = current (A), R = resistance (Ω)"
          },
          {
            "name": "Resistivity",
            "formula": "R = ρL/A",
            "note": "ρ = resistivity (Ω⋅m), L = length (m), A = cross-section (m²)"
          },
          {
            "name": "Resistances in Series",
            "formula": "Rₜₒₜₐₗ = R₁ + R₂ + R₃",
            "note": "Same current through all, voltages add"
          },
          {
            "name": "Resistances in Parallel",
            "formula": "1/Rₜₒₜₐₗ = 1/R₁ + 1/R₂ + 1/R₃",
            "note": "Same voltage across all, currents add"
          },
          {
            "name": "Electric Power",
            "formula": "P = VI = I²R = V²/R",
            "note": "P in watts (W). Thermal energy = Pt = VIt"
          },
          {
            "name": "Joule's Law",
            "formula": "H = I²Rt",
            "note": "H = heat energy (J), t = time (s)"
          }
        ]
      },
      {
        "heading": "Magnetic Effects of Current",
        "formulas": [
          {
            "name": "Magnetic Field (Straight Wire)",
            "formula": "B = μ₀I/(2πr)",
            "note": "B in tesla (T), r = distance from wire, μ₀ = 4π×10⁻⁷ T⋅m/A"
          },
          {
            "name": "Magnetic Field (Circular Coil)",
            "formula": "B = μ₀nI/2",
            "note": "n = number of turns per unit length, I = current"
          },
          {
            "name": "Force on Current-Carrying Wire",
            "formula": "F = BIL sin θ",
            "note": "B = magnetic field (T), L = length of wire (m), θ = angle with B"
          },
          {
            "name": "Fleming's Left-Hand Rule",
            "formula": "F = BIL (perpendicular to both B and I)",
            "note": "Thumb = force, Index = field (→), Middle = current (I)"
          }
        ]
      },
      {
        "heading": "Human Eye & Vision",
        "formulas": [
          {
            "name": "Power of Accommodation",
            "formula": "P = Pf - Pn",
            "note": "Power change when eye shifts from far to near point. Pf = far, Pn = near"
          },
          {
            "name": "Near Point & Far Point",
            "formula": "Near point ≈ 25 cm (for normal eye)",
            "note": "Far point ≈ ∞. Both shift with age (presbyopia)"
          },
          {
            "name": "Lens for Defects",
            "formula": "P_correction = P_eye_defect (opposite sign)",
            "note": "Myopia → concave, hyperopia → convex, presbyopia → bifocals"
          }
        ]
      },
      {
        "heading": "Refraction & Critical Angle",
        "formulas": [
          {
            "name": "Snell's Law",
            "formula": "n₁ sin θ₁ = n₂ sin θ₂",
            "note": "n = refractive index, θ = angle of incidence/refraction"
          },
          {
            "name": "Critical Angle",
            "formula": "sin θc = n₂/n₁ (when n₁ > n₂)",
            "note": "θc = critical angle. Total internal reflection occurs at θ > θc"
          },
          {
            "name": "Refractive Index",
            "formula": "n = c/v",
            "note": "c = speed of light in vacuum (3×10⁸ m/s), v = speed in medium"
          }
        ]
      },
      {
        "heading": "Kinematics (Motion) Basics",
        "formulas": [
          {
            "name": "Speed & Velocity",
            "formula": "v = s/t (average), v = ds/dt (instantaneous)",
            "note": "s = distance (m), t = time (s)"
          },
          {
            "name": "Acceleration",
            "formula": "a = (v - u)/t",
            "note": "u = initial velocity, v = final velocity"
          },
          {
            "name": "Equation of Motion 1",
            "formula": "v = u + at",
            "note": "Linear motion with constant acceleration"
          },
          {
            "name": "Equation of Motion 2",
            "formula": "s = ut + ½at²",
            "note": "Displacement, u = initial velocity"
          }
        ]
      },
      {
        "heading": "Forces & Work",
        "formulas": [
          {
            "name": "Newton's Second Law",
            "formula": "F = ma",
            "note": "F = force (N), m = mass (kg), a = acceleration (m/s²)"
          },
          {
            "name": "Work Done",
            "formula": "W = Fs cos θ",
            "note": "F = force, s = displacement, θ = angle between F and s"
          },
          {
            "name": "Kinetic Energy",
            "formula": "Ek = ½mv²",
            "note": "m = mass, v = velocity"
          },
          {
            "name": "Potential Energy (Gravity)",
            "formula": "Ep = mgh",
            "note": "m = mass, g = 10 m/s² (or 9.8), h = height"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "When to use mirror formula vs lens formula?",
        "a": "Both use 1/f = 1/u + 1/v, but sign conventions differ. Mirrors: real (+), virtual (-). Lenses: always use the same rule. Check focal length sign: concave/convex mirror, convex/concave lens."
      },
      {
        "q": "What's the difference between magnification signs in mirrors vs lenses?",
        "a": "Mirrors: m = -v/u (negative = inverted). Lenses: m = v/u (positive = erect). Negative m means real, inverted image in both cases."
      },
      {
        "q": "How do I remember Ohm's law relationships?",
        "a": "V = IR is the main law. Power = VI = I²R = V²/R. Heat (Joule) = I²Rt. Keep a triangle: V at top, I and R at bottom."
      }
    ],
    "slug": "class-10-science"
  },
  {
    "title": "Class 11 Physics Formula Sheet",
    "classLevel": "Class 11",
    "subject": "Physics",
    "emoji": "⚛️",
    "intro": "Complete formula sheet for CBSE Class 11 Physics. Covers mechanics, thermodynamics, waves, and properties of matter. SI units throughout.",
    "sections": [
      {
        "heading": "Units & Measurement",
        "formulas": [
          {
            "name": "Dimensional Analysis",
            "formula": "[M^a L^b T^c I^d K^e]",
            "note": "M = mass, L = length, T = time, I = current, K = temperature, N = amount of substance"
          },
          {
            "name": "Standard Units",
            "formula": "Length (m), Mass (kg), Time (s), Current (A), Temperature (K)",
            "note": "SI base units. Derived units combine these: velocity (m/s), force (N=kg⋅m/s²)"
          },
          {
            "name": "Uncertainty & Errors",
            "formula": "Δx/x = ±(Δa/a + Δb/b) for products/quotients",
            "note": "Percentage error = (Δx/x)×100%. Random errors reduce with multiple measurements."
          }
        ]
      },
      {
        "heading": "Kinematics",
        "formulas": [
          {
            "name": "Position & Displacement",
            "formula": "s = x₂ - x₁ (vector), distance = |s| (scalar)",
            "note": "Displacement can be negative (change in position)"
          },
          {
            "name": "Velocity & Acceleration",
            "formula": "v = ds/dt, a = dv/dt = d²s/dt²",
            "note": "Average: v_avg = Δs/Δt, a_avg = Δv/Δt"
          },
          {
            "name": "Equation of Motion 1",
            "formula": "v = u + at",
            "note": "Linear motion, constant acceleration"
          },
          {
            "name": "Equation of Motion 2",
            "formula": "s = ut + ½at²",
            "note": "Displacement formula"
          },
          {
            "name": "Equation of Motion 3",
            "formula": "v² = u² + 2as",
            "note": "Connects velocity, acceleration, displacement"
          },
          {
            "name": "Projectile Motion",
            "formula": "x = v₀ₓt, y = v₀ᵧt - ½gt², tan θ = v₀ᵧ/v₀ₓ",
            "note": "x-axis: uniform, y-axis: uniformly accelerated (g = 10 m/s²)"
          },
          {
            "name": "Range & Max Height",
            "formula": "R = v₀² sin 2θ / g, H = v₀² sin² θ / (2g)",
            "note": "R maximum at θ = 45°. H for vertical component only."
          }
        ]
      },
      {
        "heading": "Laws of Motion",
        "formulas": [
          {
            "name": "Newton's First Law",
            "formula": "F_net = 0 → a = 0 (equilibrium)",
            "note": "Object at rest/uniform motion stays so unless net force acts"
          },
          {
            "name": "Newton's Second Law",
            "formula": "F_net = ma → a = F_net/m",
            "note": "F in newtons (N), m in kg, a in m/s²"
          },
          {
            "name": "Newton's Third Law",
            "formula": "F_AB = -F_BA",
            "note": "Action-reaction forces are equal, opposite, on different objects"
          },
          {
            "name": "Friction",
            "formula": "f_s ≤ μ_s N, f_k = μ_k N",
            "note": "μ_s = static friction coefficient, μ_k = kinetic, N = normal force"
          },
          {
            "name": "Weight & Normal Force",
            "formula": "W = mg, N = mg cos θ (on incline)",
            "note": "Weight always downward, normal force perpendicular to surface"
          },
          {
            "name": "Tension in String",
            "formula": "T = ma + mg (for acceleration upward)",
            "note": "Free body diagram essential. For pulley systems, use F_net on each mass."
          }
        ]
      },
      {
        "heading": "Work, Energy & Power",
        "formulas": [
          {
            "name": "Work Done",
            "formula": "W = F⃗ · s⃗ = Fs cos θ",
            "note": "W in joules (J). Positive: force in direction of motion, Negative: against motion"
          },
          {
            "name": "Kinetic Energy",
            "formula": "Ek = ½mv²",
            "note": "Energy due to motion. KE always ≥ 0"
          },
          {
            "name": "Potential Energy (Gravity)",
            "formula": "Ep = mgh",
            "note": "Relative to reference level. Change in PE = mg(h₂ - h₁)"
          },
          {
            "name": "Work-Energy Theorem",
            "formula": "W_net = ΔEk = ½m(v₂² - v₁²)",
            "note": "Net work equals change in kinetic energy"
          },
          {
            "name": "Conservation of Energy",
            "formula": "E_total = Ek + Ep = constant (no friction)",
            "note": "Mechanical energy conserved in isolated systems"
          },
          {
            "name": "Power",
            "formula": "P = W/t = Fv cos θ",
            "note": "P in watts (W). Average vs instantaneous power"
          },
          {
            "name": "Elastic Potential Energy",
            "formula": "Ep = ½kx²",
            "note": "k = spring constant (N/m), x = extension (m)"
          }
        ]
      },
      {
        "heading": "Rotational Motion",
        "formulas": [
          {
            "name": "Angular Displacement",
            "formula": "θ = s/r (in radians)",
            "note": "s = arc length, r = radius. 1 radian = 57.3°, 2π rad = 360°"
          },
          {
            "name": "Angular Velocity",
            "formula": "ω = dθ/dt, v = rω",
            "note": "ω in rad/s. Linear velocity v at circumference"
          },
          {
            "name": "Angular Acceleration",
            "formula": "α = dω/dt, a_t = rα",
            "note": "α in rad/s². a_t = tangential acceleration"
          },
          {
            "name": "Centripetal Acceleration",
            "formula": "a_c = v²/r = ω²r",
            "note": "Directed toward center. Always perpendicular to velocity"
          },
          {
            "name": "Moment of Inertia",
            "formula": "I = Σmᵢrᵢ² = ∫r²dm",
            "note": "Rotational mass. Depends on axis of rotation"
          },
          {
            "name": "Torque",
            "formula": "τ = r⃗ × F⃗ = rF sin θ",
            "note": "τ in N⋅m. Perpendicular distance × force"
          },
          {
            "name": "Rotational Equation of Motion",
            "formula": "τ_net = Iα",
            "note": "Torque analogous to force, I to mass, α to acceleration"
          },
          {
            "name": "Rotational Kinetic Energy",
            "formula": "Ek,rot = ½Iω²",
            "note": "Analogous to ½mv² for translation"
          },
          {
            "name": "Angular Momentum",
            "formula": "L = Iω, τ_net = dL/dt",
            "note": "Conservation: L = constant if τ_net = 0"
          }
        ]
      },
      {
        "heading": "Gravitation",
        "formulas": [
          {
            "name": "Newton's Law of Gravitation",
            "formula": "F = GMm/r²",
            "note": "G = 6.67×10⁻¹¹ N⋅m²/kg². F attractive, always"
          },
          {
            "name": "Gravitational Field",
            "formula": "g = F/m = GM/r²",
            "note": "g at Earth's surface ≈ 9.8 m/s² or 10 m/s²"
          },
          {
            "name": "Gravitational Potential",
            "formula": "V = -GM/r",
            "note": "V in J/kg. Potential energy Ep = mV = -GMm/r"
          },
          {
            "name": "Escape Velocity",
            "formula": "v_esc = √(2GM/R) = √(2gR)",
            "note": "R = planet radius. For Earth ≈ 11.2 km/s"
          },
          {
            "name": "Orbital Velocity",
            "formula": "v_orb = √(GM/r) = √(gR²/r)",
            "note": "For circular orbit, v_esc = √2 × v_orb"
          },
          {
            "name": "Kepler's Third Law",
            "formula": "T² ∝ r³ or T² = (4π²/GM)r³",
            "note": "T = orbital period. Constant for all planets orbiting same star"
          }
        ]
      },
      {
        "heading": "Thermodynamics & Kinetic Theory",
        "formulas": [
          {
            "name": "Internal Energy",
            "formula": "U = nCvT (ideal gas)",
            "note": "Cv = molar heat capacity at constant volume. U depends only on T"
          },
          {
            "name": "First Law of Thermodynamics",
            "formula": "ΔU = Q - W",
            "note": "Q = heat added, W = work done by gas. ΔU = change in internal energy"
          },
          {
            "name": "Work Done by Gas",
            "formula": "W = PΔV (constant pressure), W = nRT ln(Vf/Vi) (isothermal)",
            "note": "W positive if gas expands, negative if compressed"
          },
          {
            "name": "Heat Capacity",
            "formula": "Q = nCvΔT (const V), Q = nCpΔT (const P)",
            "note": "Cp = Cv + R. For monatomic Cv = (3/2)R, diatomic Cv = (5/2)R"
          },
          {
            "name": "Ideal Gas Law",
            "formula": "PV = nRT = NkT",
            "note": "R = 8.314 J/(mol⋅K), k = 1.38×10⁻²³ J/K (Boltzmann), N = number of particles"
          },
          {
            "name": "Mean Kinetic Energy",
            "formula": "⟨Ek⟩ = (3/2)kT (monatomic)",
            "note": "Average KE of gas molecules. Temperature measure of molecular motion"
          },
          {
            "name": "RMS Velocity",
            "formula": "v_rms = √(3kT/m) = √(3RT/M)",
            "note": "m = molecular mass, M = molar mass (kg/mol)"
          },
          {
            "name": "Entropy Change",
            "formula": "ΔS = Q/T (reversible), ΔS = nR ln(Vf/Vi) (isothermal)",
            "note": "S = disorder measure. Second law: ΔS_universe ≥ 0"
          }
        ]
      },
      {
        "heading": "Oscillations & SHM",
        "formulas": [
          {
            "name": "Simple Harmonic Motion",
            "formula": "x = A sin(ωt + φ)",
            "note": "A = amplitude, ω = angular frequency, φ = phase. Acceleration a = -ω²x"
          },
          {
            "name": "Period & Frequency",
            "formula": "T = 2π/ω, f = ω/(2π) = 1/T",
            "note": "T in seconds, f in hertz (Hz)"
          },
          {
            "name": "Velocity in SHM",
            "formula": "v = ±ω√(A² - x²), v_max = ωA",
            "note": "Velocity maximum at equilibrium, zero at amplitude"
          },
          {
            "name": "Energy in SHM",
            "formula": "E = ½kA² = ½mω²A²",
            "note": "Total energy constant. E = Ek + Ep at any instant"
          },
          {
            "name": "Simple Pendulum",
            "formula": "T = 2π√(L/g)",
            "note": "L = length, g = 9.8 m/s². Independent of mass"
          },
          {
            "name": "Spring-Mass System",
            "formula": "T = 2π√(m/k), ω = √(k/m)",
            "note": "k = spring constant. Period independent of amplitude"
          },
          {
            "name": "Damped Oscillations",
            "formula": "x = A₀ e^(-t/τ) sin(ωt + φ)",
            "note": "Amplitude decreases exponentially. τ = damping time constant"
          }
        ]
      },
      {
        "heading": "Waves",
        "formulas": [
          {
            "name": "Wave Equation",
            "formula": "y = A sin(kx - ωt + φ)",
            "note": "k = 2π/λ (wave number), ω = 2πf (angular frequency)"
          },
          {
            "name": "Wave Velocity",
            "formula": "v = λf = ω/k",
            "note": "λ = wavelength, f = frequency. v = λ × f always"
          },
          {
            "name": "Intensity of Wave",
            "formula": "I = (1/2)ρvω²A²",
            "note": "I = power per unit area. I ∝ A² (intensity proportional to amplitude squared)"
          },
          {
            "name": "Doppler Effect",
            "formula": "f' = f(v + v_obs)/(v - v_source)",
            "note": "v = wave velocity. +v when source/observer move closer, -v moving apart"
          },
          {
            "name": "Interference Condition",
            "formula": "Constructive: Δx = nλ, Destructive: Δx = (n + ½)λ",
            "note": "Δx = path difference, n = 0, 1, 2, ... Two coherent sources required"
          },
          {
            "name": "Young's Double Slit",
            "formula": "λ = ax/D",
            "note": "a = slit separation, x = fringe width, D = distance to screen"
          },
          {
            "name": "Diffraction Minima",
            "formula": "b sin θ = nλ (single slit)",
            "note": "b = slit width, θ = diffraction angle, n = 1, 2, 3, ..."
          }
        ]
      },
      {
        "heading": "Properties of Matter",
        "formulas": [
          {
            "name": "Density & Relative Density",
            "formula": "ρ = m/V, R.D. = ρ_substance / ρ_water",
            "note": "ρ in kg/m³. R.D. dimensionless"
          },
          {
            "name": "Stress",
            "formula": "Stress = F/A",
            "note": "F = force, A = cross-sectional area. Tensile, compressive, shear stress"
          },
          {
            "name": "Strain",
            "formula": "Strain = ΔL/L (linear), Strain = ΔV/V (volumetric)",
            "note": "Dimensionless. Change relative to original length/volume"
          },
          {
            "name": "Young's Modulus",
            "formula": "Y = (F/A)/(ΔL/L) = (stress)/(strain)",
            "note": "Y in Pa (N/m²). Elasticity measure for tension/compression"
          },
          {
            "name": "Bulk Modulus",
            "formula": "B = -V(ΔP/ΔV)",
            "note": "Resistance to volume change. B in Pa"
          },
          {
            "name": "Shear Modulus",
            "formula": "η = (F/A)/(Δx/L) = (shear stress)/(shear strain)",
            "note": "η in Pa. Resistance to shape change"
          },
          {
            "name": "Surface Tension",
            "formula": "T = F/L",
            "note": "F = force, L = length. T in N/m (dyn/cm). Creates surface energy"
          },
          {
            "name": "Viscosity",
            "formula": "F = ηA(dv/dz)",
            "note": "η = coefficient of viscosity (Pa⋅s). Resistance to flow"
          },
          {
            "name": "Stokes' Law",
            "formula": "F = 6πηrv",
            "note": "Drag on sphere, radius r, velocity v in viscous medium"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What's the difference between average and instantaneous velocity?",
        "a": "Average velocity = total displacement / total time. Instantaneous velocity = velocity at a specific moment (dv/dt). For constant acceleration, average velocity = (initial + final)/2."
      },
      {
        "q": "How do I solve pulley and incline problems?",
        "a": "Draw free body diagram for each mass separately. Apply Newton's 2nd law (F = ma) to each. For pulleys: if rope doesn't slip, both masses have same acceleration magnitude. For inclines: resolve weight into parallel (mg sin θ) and perpendicular (mg cos θ) components."
      },
      {
        "q": "When should I use conservation of energy vs work-energy theorem?",
        "a": "Use conservation when no friction/non-conservative forces (Ek₁ + Ep₁ = Ek₂ + Ep₂). Use work-energy when forces act (W_net = ΔEk). For friction problems, W_friction = -μmg×distance, then use work-energy."
      }
    ],
    "slug": "class-11-physics"
  },
  {
    "title": "Class 12 Physics Formula Sheet",
    "classLevel": "Class 12",
    "subject": "Physics",
    "emoji": "⚛️",
    "intro": "Comprehensive formula sheet for CBSE Class 12 Physics. Covers electrostatics, magnetism, optics, modern physics, and semiconductors. All SI units.",
    "sections": [
      {
        "heading": "Electrostatics",
        "formulas": [
          {
            "name": "Coulomb's Law",
            "formula": "F = kq₁q₂/r² = (1/(4πε₀))(q₁q₂/r²)",
            "note": "k ≈ 9×10⁹ N⋅m²/C², ε₀ = 8.85×10⁻¹² F/m"
          },
          {
            "name": "Electric Field",
            "formula": "E = F/q = kQ/r² (point charge)",
            "note": "E in N/C. Direction: away from +ve, toward -ve charge"
          },
          {
            "name": "Electric Potential",
            "formula": "V = kQ/r, V = W/q (work per unit charge)",
            "note": "V in volts (J/C). Potential energy U = qV = kQq/r"
          },
          {
            "name": "Electric Dipole Moment",
            "formula": "p = qd (magnitude)",
            "note": "q = charge magnitude, d = separation. Direction from -ve to +ve charge"
          },
          {
            "name": "Dipole Potential",
            "formula": "V = (kp cos θ)/r² = (1/(4πε₀))(p⃗·r̂)/r²",
            "note": "θ = angle from dipole axis. V depends on angle and distance"
          },
          {
            "name": "Dipole Torque in Field",
            "formula": "τ = pE sin θ = p⃗ × E⃗",
            "note": "τ rotates dipole to align with field"
          },
          {
            "name": "Dipole in Uniform Field",
            "formula": "U = -pE cos θ = -p⃗·E⃗",
            "note": "Minimum (stable) when aligned with field"
          }
        ]
      },
      {
        "heading": "Capacitance & Dielectrics",
        "formulas": [
          {
            "name": "Capacitance Definition",
            "formula": "C = Q/V",
            "note": "C in farads (F). Charge stored per volt applied"
          },
          {
            "name": "Parallel Plate Capacitor",
            "formula": "C = ε₀εᵣA/d",
            "note": "A = plate area, d = separation, εᵣ = dielectric constant (≥1)"
          },
          {
            "name": "Cylindrical Capacitor",
            "formula": "C = (2πε₀l)/(ln(b/a))",
            "note": "l = length, a = inner radius, b = outer radius"
          },
          {
            "name": "Spherical Capacitor",
            "formula": "C = 4πε₀ab/(b-a) (isolated sphere: C = 4πε₀a)",
            "note": "a = inner radius, b = outer radius"
          },
          {
            "name": "Energy Stored in Capacitor",
            "formula": "U = (1/2)QV = (1/2)CV² = Q²/(2C)",
            "note": "U in joules. Energy stored in electric field"
          },
          {
            "name": "Capacitors in Series",
            "formula": "1/C_total = 1/C₁ + 1/C₂ + ..., Q = same on all",
            "note": "V divides: smallest V on largest C"
          },
          {
            "name": "Capacitors in Parallel",
            "formula": "C_total = C₁ + C₂ + ..., V = same on all",
            "note": "Charge divides: most charge on largest C"
          },
          {
            "name": "Dielectric Constant",
            "formula": "K = C/C₀ = E₀/E",
            "note": "C₀ = capacitance without dielectric, E₀ = field without"
          },
          {
            "name": "Polarization",
            "formula": "P = ε₀(K-1)E = ε₀χE",
            "note": "P = polarization, χ = electric susceptibility"
          }
        ]
      },
      {
        "heading": "Current Electricity",
        "formulas": [
          {
            "name": "Electric Current",
            "formula": "I = dQ/dt = nAeVd",
            "note": "I in amperes (A). Vd = drift velocity"
          },
          {
            "name": "Ohm's Law (Microscopic)",
            "formula": "J = σE",
            "note": "J = current density (A/m²), σ = conductivity (Ω⁻¹m⁻¹)"
          },
          {
            "name": "Resistance",
            "formula": "R = ρL/A = L/(σA)",
            "note": "ρ = resistivity (Ω⋅m), L = length, A = cross-section"
          },
          {
            "name": "Temperature Coefficient",
            "formula": "R(T) = R₀[1 + α(T - T₀)]",
            "note": "α = temperature coefficient (K⁻¹). R changes with temperature"
          },
          {
            "name": "EMF & Internal Resistance",
            "formula": "I = ε/(R + r), V = ε - Ir",
            "note": "ε = EMF (V), r = internal resistance, R = external load"
          },
          {
            "name": "Power & Energy",
            "formula": "P = VI = I²R = V²/R, E = Pt",
            "note": "P in watts, E in joules. Heat dissipated = I²Rt"
          },
          {
            "name": "Resistivity vs Conductivity",
            "formula": "σ = 1/ρ, R = ρL/A, G = σA/L",
            "note": "G = conductance (siemens, S). σ in (Ω⋅m)⁻¹"
          },
          {
            "name": "Drift Velocity",
            "formula": "Vd = (eE/m)τ = (I/(nAe))",
            "note": "τ = relaxation time. Very slow (~mm/s) but current fast"
          }
        ]
      },
      {
        "heading": "Moving Charges & Magnetism",
        "formulas": [
          {
            "name": "Lorentz Force",
            "formula": "F = q(E + v × B)",
            "note": "F on charge q moving with velocity v in fields E and B"
          },
          {
            "name": "Magnetic Force on Current",
            "formula": "F = IL × B = BIL sin θ",
            "note": "L = length vector, θ = angle. F perpendicular to both L and B"
          },
          {
            "name": "Magnetic Field (Straight Wire)",
            "formula": "B = (μ₀I)/(2πr)",
            "note": "μ₀ = 4π×10⁻⁷ T⋅m/A. Field circular around wire"
          },
          {
            "name": "Magnetic Field (Circular Loop)",
            "formula": "B = (μ₀I)/(2R) (at center)",
            "note": "R = radius. Field along axis: B = (μ₀IR²)/(2(R²+x²)^(3/2))"
          },
          {
            "name": "Magnetic Dipole Moment",
            "formula": "m = IA (magnitude)",
            "note": "I = current, A = area of loop. Direction: right-hand rule"
          },
          {
            "name": "Torque on Magnetic Dipole",
            "formula": "τ = m × B = mB sin θ",
            "note": "θ = angle between m and B. Torque aligns dipole with field"
          },
          {
            "name": "Ampere's Law",
            "formula": "∮B⃗·dl⃗ = μ₀I_enclosed",
            "note": "Line integral of B around closed loop = μ₀ times enclosed current"
          },
          {
            "name": "Radius of Circular Motion (Charged Particle)",
            "formula": "r = mv/(qB) = (m/(qB))√(2KE)",
            "note": "Particle moves in circle perpendicular to B"
          },
          {
            "name": "Hall Effect",
            "formula": "V_H = (BI)/(ned)",
            "note": "Hall voltage V_H across conductor. n = charge carrier density"
          }
        ]
      },
      {
        "heading": "Electromagnetic Induction",
        "formulas": [
          {
            "name": "Faraday's Law",
            "formula": "ε = -dΦ/dt",
            "note": "ε = induced EMF, Φ = magnetic flux (Wb). Negative sign = Lenz's law"
          },
          {
            "name": "Magnetic Flux",
            "formula": "Φ = B⃗·A⃗ = BA cos θ",
            "note": "Φ in weber (Wb). θ = angle between B and normal to area"
          },
          {
            "name": "Motional EMF",
            "formula": "ε = BLv",
            "note": "L = length of conductor, v = velocity perpendicular to B"
          },
          {
            "name": "Induced EMF in Rotating Coil",
            "formula": "ε = NABω sin(ωt + φ)",
            "note": "N = turns, A = area, ω = angular velocity. AC generator equation"
          },
          {
            "name": "Self-Inductance",
            "formula": "L = Φ/I = μ₀N²A/l",
            "note": "L in henry (H). Flux per unit current through coil"
          },
          {
            "name": "Mutual Inductance",
            "formula": "M = k√(L₁L₂)",
            "note": "k = coupling coefficient (0 ≤ k ≤ 1). Flux in one affects the other"
          },
          {
            "name": "Energy in Inductor",
            "formula": "U = (1/2)LI²",
            "note": "Energy stored in magnetic field. Analogous to (1/2)CV² for capacitor"
          },
          {
            "name": "LR Circuit (Growing Current)",
            "formula": "I = (ε/R)(1 - e^(-Rt/L))",
            "note": "I grows exponentially with time constant τ = L/R"
          },
          {
            "name": "LC Circuit Oscillation",
            "formula": "I = I₀ sin(ωt + φ), ω = 1/√(LC)",
            "note": "Energy oscillates between inductor and capacitor"
          }
        ]
      },
      {
        "heading": "Alternating Current (AC)",
        "formulas": [
          {
            "name": "AC Voltage & Current",
            "formula": "V = V₀ sin(ωt + φ), I = I₀ sin(ωt)",
            "note": "V₀, I₀ = peak values. RMS values: V_rms = V₀/√2, I_rms = I₀/√2"
          },
          {
            "name": "Impedance",
            "formula": "Z = √(R² + (X_L - X_C)²)",
            "note": "Z in ohms. X_L = inductive, X_C = capacitive reactance"
          },
          {
            "name": "Inductive Reactance",
            "formula": "X_L = ωL = 2πfL",
            "note": "X_L in ohms. Increases with frequency"
          },
          {
            "name": "Capacitive Reactance",
            "formula": "X_C = 1/(ωC) = 1/(2πfC)",
            "note": "X_C in ohms. Decreases with frequency"
          },
          {
            "name": "Power in AC Circuit",
            "formula": "P = VI cos φ = I²_rms × R",
            "note": "cos φ = power factor. Only resistor dissipates power"
          },
          {
            "name": "Resonance Frequency",
            "formula": "f₀ = 1/(2π√(LC))",
            "note": "At resonance X_L = X_C, Z = R (minimum)"
          },
          {
            "name": "Quality Factor",
            "formula": "Q = (ωL)/R = 1/(R√(C/L))",
            "note": "Q = sharpness of resonance. Higher Q = narrower peak"
          },
          {
            "name": "Transformer Equation",
            "formula": "V_p/V_s = N_p/N_s = I_s/I_p",
            "note": "Ideal transformer: V_p×I_p = V_s×I_s (power conserved)"
          }
        ]
      },
      {
        "heading": "Electromagnetic Waves & Ray Optics",
        "formulas": [
          {
            "name": "EM Wave Speed",
            "formula": "c = 1/√(μ₀ε₀) = 3×10⁸ m/s",
            "note": "c = speed of light in vacuum. Same for all EM waves"
          },
          {
            "name": "EM Wave Relation",
            "formula": "E₀/B₀ = c, E = cB",
            "note": "Electric and magnetic fields perpendicular, in phase"
          },
          {
            "name": "Energy Density",
            "formula": "u = (ε₀E²)/2 = B²/(2μ₀)",
            "note": "Energy per unit volume in EM field"
          },
          {
            "name": "Poynting Vector",
            "formula": "S = (1/μ₀)E⃗ × B⃗, I = ⟨S⟩ = (E₀B₀)/(2μ₀)",
            "note": "S = energy flux (W/m²). ⟨S⟩ = time-averaged intensity"
          },
          {
            "name": "Radiation Pressure",
            "formula": "P = I/c",
            "note": "Pressure exerted by EM radiation on absorbing surface"
          },
          {
            "name": "Snell's Law",
            "formula": "n₁ sin θ₁ = n₂ sin θ₂",
            "note": "n = refractive index. Different for different media"
          },
          {
            "name": "Critical Angle & Total Internal Reflection",
            "formula": "sin θc = n₂/n₁ (when n₁ > n₂)",
            "note": "Total reflection occurs when θ > θc"
          },
          {
            "name": "Lens Maker's Formula",
            "formula": "1/f = (n-1)[1/R₁ - 1/R₂]",
            "note": "n = refractive index, R = radius of curvature"
          },
          {
            "name": "Magnification",
            "formula": "m = -v/u (mirror), m = v/u (lens)",
            "note": "Negative = inverted, positive = erect"
          }
        ]
      },
      {
        "heading": "Wave Optics",
        "formulas": [
          {
            "name": "Young's Double Slit",
            "formula": "λ = (ax)/D",
            "note": "a = slit separation, x = fringe width, D = screen distance"
          },
          {
            "name": "Interference Condition",
            "formula": "Bright: Δx = nλ, Dark: Δx = (n+½)λ",
            "note": "Δx = path difference. n = 0, 1, 2, ..."
          },
          {
            "name": "Diffraction (Single Slit)",
            "formula": "Minima: b sin θ = nλ",
            "note": "b = slit width. n = 1, 2, 3, ... (n ≠ 0)"
          },
          {
            "name": "Diffraction Grating",
            "formula": "d sin θ = nλ",
            "note": "d = grating spacing. Bright fringes when condition satisfied"
          },
          {
            "name": "Resolving Power",
            "formula": "R = λ/Δλ = nN (for grating)",
            "note": "n = order, N = total number of slits. Ability to separate close wavelengths"
          },
          {
            "name": "Rayleigh Criterion",
            "formula": "θ = 1.22(λ/D)",
            "note": "D = aperture diameter. Minimum resolvable angle"
          },
          {
            "name": "Fraunhofer vs Fresnel",
            "formula": "Fraunhofer: θ ≈ λ/a, Fresnel: complex",
            "note": "Fraunhofer = far field (∞ or lens), Fresnel = near field"
          },
          {
            "name": "Polarization by Malus Law",
            "formula": "I = I₀ cos² θ",
            "note": "θ = angle between polarizers. Intensity decreases"
          }
        ]
      },
      {
        "heading": "Dual Nature & Photoelectric Effect",
        "formulas": [
          {
            "name": "Photon Energy",
            "formula": "E = hf = hc/λ",
            "note": "h = 6.63×10⁻³⁴ J⋅s. Energy of single photon"
          },
          {
            "name": "Photoelectric Effect",
            "formula": "hf = φ + KE_max = φ + eVs",
            "note": "φ = work function, Vs = stopping potential"
          },
          {
            "name": "Threshold Frequency",
            "formula": "f₀ = φ/h, λ₀ = hc/φ",
            "note": "Minimum frequency/maximum wavelength to emit electrons"
          },
          {
            "name": "de Broglie Wavelength",
            "formula": "λ = h/p = h/(mv)",
            "note": "All particles have wave nature. p = momentum"
          },
          {
            "name": "Bohr Model (Hydrogen)",
            "formula": "r_n = (0.53×10⁻¹⁰ m)n²/Z = n²a₀/Z",
            "note": "a₀ = Bohr radius. r_n ∝ n². E_n = -13.6 eV/n² (hydrogen)"
          },
          {
            "name": "Energy Levels",
            "formula": "ΔE = E_n - E_m = 13.6(1/n² - 1/m²) eV",
            "note": "Negative = energy released (emission), positive = absorbed"
          },
          {
            "name": "Ionization Energy",
            "formula": "IE = 13.6 eV (hydrogen from n=1)",
            "note": "Energy to remove electron from ground state"
          },
          {
            "name": "Compton Scattering",
            "formula": "λ' - λ = (h/(m_e c))(1 - cos θ)",
            "note": "λc = h/(m_e c) = 2.43×10⁻¹² m (Compton wavelength)"
          }
        ]
      },
      {
        "heading": "Atoms & Nuclei",
        "formulas": [
          {
            "name": "Nuclear Mass Defect",
            "formula": "Δm = (Zmp + Nmn) - m_nucleus",
            "note": "Mass lost converted to binding energy (Einstein: E = Δmc²)"
          },
          {
            "name": "Binding Energy",
            "formula": "BE = Δmc² = [Zmp + Nmn - m_nucleus]c²",
            "note": "Energy holding nucleus together. BE/A = binding energy per nucleon"
          },
          {
            "name": "Radioactive Decay",
            "formula": "N(t) = N₀ e^(-λt), λ = ln(2)/T₁/₂",
            "note": "λ = decay constant, T₁/₂ = half-life. Exponential decay"
          },
          {
            "name": "Activity",
            "formula": "A = λN = dN/dt",
            "note": "A in decays/second (Bq). A₀ = λN₀ initially"
          },
          {
            "name": "Alpha Decay",
            "formula": "^A_Z X → ^(A-4)_(Z-2) Y + ^4_2 He",
            "note": "Emits ⁴He nucleus. Z decreases by 2, A by 4"
          },
          {
            "name": "Beta Decay",
            "formula": "^A_Z X → ^A_(Z+1) Y + e⁻ + ν̄_e",
            "note": "β⁻ decay: electron + antineutrino. Increases Z by 1"
          },
          {
            "name": "Gamma Decay",
            "formula": "^A_Z X* → ^A_Z X + γ",
            "note": "High-energy photon. A and Z unchanged"
          },
          {
            "name": "Mass-Energy Equivalence",
            "formula": "E = mc²",
            "note": "m = 1 u = 1.66×10⁻²⁷ kg = 931.5 MeV/c²"
          },
          {
            "name": "Q-value of Decay",
            "formula": "Q = (m_initial - m_final)c²",
            "note": "Q > 0 = exothermic (spontaneous), Q < 0 = endothermic"
          }
        ]
      },
      {
        "heading": "Semiconductors & Electronics",
        "formulas": [
          {
            "name": "Bandgap Energy",
            "formula": "Eg = hf = hc/λ",
            "note": "Energy difference between conduction and valence bands"
          },
          {
            "name": "Intrinsic Semiconductor",
            "formula": "ni = √(Nc Nv) exp(-Eg/(2kT))",
            "note": "ni = intrinsic carrier concentration. Doubles ~every 5°C"
          },
          {
            "name": "Conductivity",
            "formula": "σ = (q/kT)(ne μe + nh μh)",
            "note": "ne, nh = electron/hole concentrations, μ = mobility"
          },
          {
            "name": "Drift Velocity in Semiconductor",
            "formula": "vd = μ_n E (electrons), vd = μ_p E (holes)",
            "note": "μ = mobility (cm²/V⋅s). Typical: ~1000 for e⁻, ~400 for h⁺"
          },
          {
            "name": "PN Junction (Forward Bias)",
            "formula": "I = I₀[exp(qV/kT) - 1]",
            "note": "I₀ = reverse saturation current. Exponential rise with V"
          },
          {
            "name": "Depletion Width",
            "formula": "w = √((2ε₀εᵣ(V_bi - V))/(q)(N_A + N_D)/(N_A N_D))",
            "note": "V_bi = built-in voltage. w decreases with forward bias"
          },
          {
            "name": "Zener Breakdown",
            "formula": "V_z = breakdown voltage (typical 5-10 V)",
            "note": "Sharp increase in reverse current. Used in voltage regulation"
          },
          {
            "name": "Transistor (BJT) Beta",
            "formula": "β = I_C/I_B",
            "note": "Current gain. Typical β = 100-300. I_C = β×I_B"
          },
          {
            "name": "MOSFET Drain Current",
            "formula": "I_D = (μ_n C_ox / 2)(W/L)(V_GS - V_T)²",
            "note": "Saturation region. W/L = aspect ratio, V_T = threshold voltage"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What's the key difference between series and parallel capacitors?",
        "a": "Series: 1/C_total = 1/C₁ + 1/C₂ (charge Q same on all). Parallel: C_total = C₁ + C₂ (voltage V same on all). Series capacitors act like smaller C total; parallel act like larger."
      },
      {
        "q": "How do I solve AC circuit problems with impedance?",
        "a": "Calculate X_L = ωL and X_C = 1/(ωC). Find Z = √(R² + (X_L - X_C)²). Current I = V/Z. Power P = VI cos φ where cos φ = R/Z. At resonance X_L = X_C, so Z = R (minimum)."
      },
      {
        "q": "When solving optics problems, how do I choose between geometric and wave models?",
        "a": "Use geometric optics (ray model) for mirrors, lenses, refraction when object/image size >> wavelength. Use wave optics (diffraction, interference) when dealing with slits, gratings, or when wavelength is comparable to aperture. Dual nature: all light has both, choose convenient model."
      }
    ],
    "slug": "class-12-physics"
  },
  {
    "title": "Class 11 Chemistry: Essential Formulas & Concepts",
    "classLevel": "Class 11",
    "subject": "Chemistry",
    "emoji": "⚗️",
    "intro": "Master the foundational concepts of chemistry: atomic structure, mole theory, gas laws, thermodynamics, equilibrium, and redox reactions. All formulas in one reference sheet for quick problem-solving.",
    "sections": [
      {
        "heading": "Mole Concept & Stoichiometry",
        "formulas": [
          {
            "name": "Number of moles from mass",
            "formula": "n = given mass (g) / molar mass (g/mol)",
            "note": "n is always in moles; divide grams by atomic/molecular weight"
          },
          {
            "name": "Number of moles from particles",
            "formula": "n = N / Nₐ",
            "note": "N = number of particles, Nₐ = Avogadro's number = 6.022 × 10²³"
          },
          {
            "name": "Molar mass from density",
            "formula": "M = dRT / P",
            "note": "d = density (g/L), R = 0.0821 L·atm/(mol·K), T in Kelvin, P in atm"
          },
          {
            "name": "Percentage composition",
            "formula": "% element = (atomic mass × no. of atoms / molar mass) × 100",
            "note": "Sum of all percentages = 100%"
          },
          {
            "name": "Empirical formula mass",
            "formula": "n = molar mass / empirical formula mass",
            "note": "Molecular formula = (empirical formula)ₙ"
          },
          {
            "name": "Stoichiometric ratio",
            "formula": "mol A / mol B = coefficient A / coefficient B",
            "note": "From balanced chemical equation"
          },
          {
            "name": "Limiting reagent",
            "formula": "Compare moles of reactant / stoichiometric coefficient",
            "note": "Smallest ratio is limiting; controls theoretical yield"
          },
          {
            "name": "Percent yield",
            "formula": "% yield = (actual yield / theoretical yield) × 100",
            "note": "Actual from experiment; theoretical from stoichiometry"
          }
        ]
      },
      {
        "heading": "Concentration Terms",
        "formulas": [
          {
            "name": "Molarity",
            "formula": "M = n / V(L) = moles of solute / litres of solution",
            "note": "Temperature-dependent; liters of final solution, not solvent"
          },
          {
            "name": "Molality",
            "formula": "m = n / W(kg) = moles of solute / kg of solvent",
            "note": "Temperature-independent; uses mass of solvent only"
          },
          {
            "name": "Normality",
            "formula": "N = n × equivalents / V(L)",
            "note": "Equivalents = n × valency for acids/bases/salts"
          },
          {
            "name": "Mole fraction",
            "formula": "χₐ = nₐ / (nₐ + nᵦ + ...)",
            "note": "Sum of all mole fractions = 1; dimensionless"
          },
          {
            "name": "Mass percent (w/w)",
            "formula": "w/w % = (mass of solute / mass of solution) × 100",
            "note": "Solution = solute + solvent"
          },
          {
            "name": "Volume percent (v/v)",
            "formula": "v/v % = (volume of solute / volume of solution) × 100",
            "note": "For liquids; may not be additive"
          },
          {
            "name": "Relation: Molarity & Molality",
            "formula": "m = M / (1 - M × M / 1000)",
            "note": "M = molar mass of solute; holds for dilute solutions"
          },
          {
            "name": "Dilution formula",
            "formula": "M₁V₁ = M₂V₂",
            "note": "Moles solute conserved; works for any molarity scale"
          }
        ]
      },
      {
        "heading": "Gas Laws & Ideal Gas Equation",
        "formulas": [
          {
            "name": "Ideal gas equation",
            "formula": "PV = nRT",
            "note": "P (Pa or atm), V (m³ or L), n (mol), R = 8.314 J/(mol·K) or 0.0821 L·atm/(mol·K), T (K)"
          },
          {
            "name": "Boyle's Law",
            "formula": "P₁V₁ = P₂V₂",
            "note": "At constant T and n; inverse relationship"
          },
          {
            "name": "Charles' Law",
            "formula": "V₁/T₁ = V₂/T₂",
            "note": "At constant P and n; direct relationship"
          },
          {
            "name": "Gay-Lussac's Law",
            "formula": "P₁/T₁ = P₂/T₂",
            "note": "At constant V and n; direct relationship"
          },
          {
            "name": "Combined gas law",
            "formula": "P₁V₁/T₁ = P₂V₂/T₂",
            "note": "No mole change needed; compare two states"
          },
          {
            "name": "Dalton's law of partial pressures",
            "formula": "Pₜₒₜₐₗ = P₁ + P₂ + P₃ + ...",
            "note": "Each gas contributes its own pressure independently"
          },
          {
            "name": "Henry's Law",
            "formula": "Pgas = Kₕ × χsolute (in solution)",
            "note": "Kₕ = Henry's law constant; Pgas = partial pressure"
          },
          {
            "name": "Graham's law of diffusion",
            "formula": "r₁/r₂ = √(M₂/M₁)",
            "note": "r = rate of diffusion; M = molar mass; lighter gas diffuses faster"
          },
          {
            "name": "Density of gas at STP",
            "formula": "d = PM / RT",
            "note": "d (g/L); relates density to molar mass"
          }
        ]
      },
      {
        "heading": "Atomic Structure",
        "formulas": [
          {
            "name": "Wavelength-frequency relation",
            "formula": "c = λν",
            "note": "c = 3 × 10⁸ m/s, λ = wavelength (m), ν = frequency (Hz)"
          },
          {
            "name": "Photon energy",
            "formula": "E = hν = hc/λ",
            "note": "h = 6.626 × 10⁻³⁴ J·s; higher frequency = higher energy"
          },
          {
            "name": "Rydberg equation (hydrogen)",
            "formula": "1/λ = R∞(1/n₁² − 1/n₂²)",
            "note": "R∞ = 1.097 × 10⁷ m⁻¹; n₁ < n₂ for emission; n₁ = 1 is Lyman, 2 is Balmer"
          },
          {
            "name": "Energy levels (Bohr model)",
            "formula": "Eₙ = −13.6/n² eV",
            "note": "n = 1, 2, 3...; negative energy means bound state"
          },
          {
            "name": "de Broglie wavelength",
            "formula": "λ = h / p = h / mv",
            "note": "All particles have wavelike behavior; h = Planck constant"
          },
          {
            "name": "Uncertainty principle (Heisenberg)",
            "formula": "Δx × Δp ≥ h / 4π",
            "note": "Cannot know position and momentum simultaneously with certainty"
          },
          {
            "name": "Ionization energy (hydrogen-like)",
            "formula": "IE = 13.6 × Z² / n² eV",
            "note": "Z = atomic number, n = principal quantum number"
          },
          {
            "name": "Electron in orbital probability",
            "formula": "ψ² = probability density at a point in space",
            "note": "ψ = wave function; ψ² gives electron density"
          }
        ]
      },
      {
        "heading": "Thermodynamics",
        "formulas": [
          {
            "name": "Heat absorbed/released",
            "formula": "q = mcΔT",
            "note": "m = mass (g), c = specific heat capacity (J/g·°C), ΔT = temperature change (K or °C)"
          },
          {
            "name": "Enthalpy change",
            "formula": "ΔH = q_p (at constant pressure)",
            "note": "ΔH > 0 endothermic, ΔH < 0 exothermic"
          },
          {
            "name": "Hess's Law",
            "formula": "ΔH_reaction = Σ ΔH_products − Σ ΔH_reactants",
            "note": "Enthalpy is a state function; independent of reaction path"
          },
          {
            "name": "Standard enthalpy of formation",
            "formula": "ΔH°f = enthalpy change for 1 mol pure compound from elements",
            "note": "ΔH°f(element) = 0; sum of ΔH°f gives ΔH°rxn"
          },
          {
            "name": "Entropy change",
            "formula": "ΔS = q_rev / T",
            "note": "S > 0 disorder increases; state function"
          },
          {
            "name": "Gibbs free energy",
            "formula": "ΔG = ΔH − TΔS",
            "note": "ΔG < 0 spontaneous, ΔG > 0 non-spontaneous at that T"
          },
          {
            "name": "Gibbs energy and equilibrium",
            "formula": "ΔG° = −RT ln Kₑq",
            "note": "R = 8.314 J/(mol·K); Kₑq = equilibrium constant"
          },
          {
            "name": "Calorimetry (coffee cup)",
            "formula": "q_solution + q_calorimeter + q_reaction = 0",
            "note": "Heat lost = heat gained (closed system)"
          }
        ]
      },
      {
        "heading": "Chemical Equilibrium",
        "formulas": [
          {
            "name": "Equilibrium constant (Kc)",
            "formula": "Kc = [C]^c[D]^d / [A]^a[B]^b",
            "note": "For aA + bB ⇌ cC + dD; square brackets = molar concentration at equilibrium"
          },
          {
            "name": "Equilibrium constant (Kp)",
            "formula": "Kp = P_C^c × P_D^d / P_A^a × P_B^b",
            "note": "P = partial pressure (atm or Pa)"
          },
          {
            "name": "Relation between Kp and Kc",
            "formula": "Kp = Kc(RT)^Δn",
            "note": "Δn = (c + d) − (a + b) = change in moles of gas"
          },
          {
            "name": "Ion product of water",
            "formula": "Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C",
            "note": "Always 10⁻¹⁴ at 25°C regardless of acid/base"
          },
          {
            "name": "pH definition",
            "formula": "pH = −log[H⁺]; pOH = −log[OH⁻]",
            "note": "pH + pOH = 14 at 25°C; pH < 7 acidic, pH > 7 basic"
          },
          {
            "name": "Acid dissociation constant",
            "formula": "Ka = [H⁺][A⁻] / [HA]",
            "note": "Larger Ka = stronger acid; pKa = −log Ka"
          },
          {
            "name": "Base dissociation constant",
            "formula": "Kb = [BH⁺][OH⁻] / [B]",
            "note": "Ka × Kb = Kw for conjugate acid-base pair"
          },
          {
            "name": "Henderson-Hasselbalch equation",
            "formula": "pH = pKa + log([A⁻]/[HA])",
            "note": "For buffer solutions; [A⁻] = conjugate base, [HA] = weak acid"
          },
          {
            "name": "Buffer capacity",
            "formula": "Buffer resists pH change when small amounts of acid/base are added",
            "note": "Best when pH ≈ pKa; ratio [A⁻]/[HA] ≈ 1"
          },
          {
            "name": "Common ion effect",
            "formula": "Adding common ion shifts equilibrium left, decreases solubility",
            "note": "E.g. adding NaCl to NaCl(aq) ⇌ Na⁺ + Cl⁻"
          }
        ]
      },
      {
        "heading": "Redox Reactions & Electrochemistry",
        "formulas": [
          {
            "name": "Oxidation number rules",
            "formula": "Element = 0; monatomic ion = charge; O usually −2; H usually +1; F always −1",
            "note": "Sum of oxidation numbers = 0 (neutral) or charge (ion)"
          },
          {
            "name": "Oxidation and reduction",
            "formula": "Oxidation = loss of e⁻ (O.N. increases); Reduction = gain of e⁻ (O.N. decreases)",
            "note": "OIL RIG; redox pair involved in every redox reaction"
          },
          {
            "name": "Balancing redox (half-reaction method)",
            "formula": "Balance atoms except O & H → balance O with H₂O → balance H with H⁺ or OH⁻ → balance charge with e⁻",
            "note": "Multiply half-reactions to equalize electrons lost/gained"
          },
          {
            "name": "Equivalent mass",
            "formula": "Eq.M = molar mass / valency change per atom",
            "note": "For redox, valency change = no. of e⁻ transferred per formula unit"
          },
          {
            "name": "Normality for redox",
            "formula": "N = n / (Eq.M × V) × 1000; n_e⁻ = N × V",
            "note": "Electrons gained = electrons lost in balanced equation"
          },
          {
            "name": "Electrochemical cell notation",
            "formula": "Anode (−) | salt bridge | Cathode (+); read −→ + for conventional current",
            "note": "Oxidation at anode (left), reduction at cathode (right)"
          },
          {
            "name": "Standard cell potential",
            "formula": "E°cell = E°cathode − E°anode",
            "note": "E° > 0 spontaneous, E° < 0 non-spontaneous; look up in tables"
          },
          {
            "name": "Gibbs energy and cell potential",
            "formula": "ΔG° = −nFE°cell",
            "note": "n = moles of e⁻, F = Faraday constant = 96,500 C/mol"
          }
        ]
      },
      {
        "heading": "Quick Key Concepts Review",
        "formulas": [
          {
            "name": "Avogadro's number",
            "formula": "Nₐ = 6.022 × 10²³ particles/mol",
            "note": "Defines the mole; used to count atoms, molecules, ions"
          },
          {
            "name": "Molar volume at STP",
            "formula": "Vm = 22.4 L/mol (at 0°C, 1 atm)",
            "note": "Useful for gas stoichiometry; nearly 24 L/mol at ~25°C, 1 atm"
          },
          {
            "name": "Gas constant R",
            "formula": "R = 8.314 J/(mol·K) = 0.0821 L·atm/(mol·K) = 2 cal/(mol·K)",
            "note": "Use first form for SI; second for gas law calculations"
          },
          {
            "name": "Faraday's constant",
            "formula": "F = 96,500 C/mol e⁻",
            "note": "Charge of 1 mole of electrons; coulomb = amp × second"
          },
          {
            "name": "Atomic mass unit",
            "formula": "1 u = 1.66 × 10⁻²⁷ kg",
            "note": "Mass of one nucleon (proton or neutron); ¹²C standard = 12.000 u"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How do I find the empirical formula from percentage composition?",
        "a": "Assume 100 g sample. Convert % to grams, divide by atomic masses to get moles, divide by smallest to get ratio, multiply by a whole number if needed. Example: C 80%, H 20% → 100 g sample → 80/12 = 6.67 mol C, 20/1 = 20 mol H → divide by 6.67 → 1:3 ratio → empirical formula CH₃."
      },
      {
        "q": "When should I use Kc vs Kp?",
        "a": "Use Kc when concentrations (mol/L) are given; Kp when partial pressures (atm/Pa) are given. For gases, they relate by Kp = Kc(RT)^Δn where Δn is the change in moles of gas. Both describe the same equilibrium."
      },
      {
        "q": "What is the difference between an exothermic and endothermic reaction?",
        "a": "Exothermic releases heat (ΔH < 0, q > 0); reactants have more energy than products. Endothermic absorbs heat (ΔH > 0, q < 0); products have more energy than reactants. Combustion is always exothermic; melting ice is endothermic."
      }
    ],
    "slug": "class-11-chemistry"
  },
  {
    "title": "Class 12 Chemistry: Solutions, Kinetics & Electrochemistry",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "emoji": "⚗️",
    "intro": "Advanced chemistry: colligative properties, Raoult's law, electrochemistry, kinetics, and organic conversions. Essential for JEE/NEET and board exams.",
    "sections": [
      {
        "heading": "Solutions & Colligative Properties",
        "formulas": [
          {
            "name": "Raoult's Law for ideal solutions",
            "formula": "P_A = χ_A × P°_A",
            "note": "P_A = partial pressure of A, χ_A = mole fraction, P°_A = vapour pressure of pure A"
          },
          {
            "name": "Relative lowering of vapour pressure",
            "formula": "ΔP/P° = χ_solute = n_solute / (n_solute + n_solvent)",
            "note": "Independent of identity of solute (colligative); for non-volatile solutes"
          },
          {
            "name": "Boiling point elevation",
            "formula": "ΔTb = Kb × m",
            "note": "Kb = molal boiling point elevation constant (°C·kg/mol), m = molality"
          },
          {
            "name": "Freezing point depression",
            "formula": "ΔTf = Kf × m",
            "note": "Kf = molal freezing point depression constant (°C·kg/mol), m = molality"
          },
          {
            "name": "Osmotic pressure",
            "formula": "π = CRT = (n/V)RT",
            "note": "C = molarity, R = 0.0821 L·atm/(mol·K), T in Kelvin; most direct colligative property"
          },
          {
            "name": "van't Hoff factor",
            "formula": "i = observed colligative effect / expected effect for 1 mol solute",
            "note": "i ≈ 1 for nonelectrolytes, i > 1 for electrolytes (ions); ΔTb = i·Kb·m"
          },
          {
            "name": "Degree of dissociation (electrolytes)",
            "formula": "α = (initial moles − final moles) / initial moles",
            "note": "i = 1 + (n−1)α where n = number of ions per formula unit"
          },
          {
            "name": "Henry's Law for gas solubility",
            "formula": "c = Kₕ × P_gas",
            "note": "c = concentration (mol/L), Kₕ = Henry's law constant, P in atm"
          },
          {
            "name": "Solubility and common ion effect",
            "formula": "s = √(Ksp) (pure water); Ksp = [A⁺]^a × [B⁻]^b for AB",
            "note": "Adding common ion decreases solubility; Ksp independent of concentration"
          }
        ]
      },
      {
        "heading": "Electrochemistry & Nernst Equation",
        "formulas": [
          {
            "name": "Nernst equation",
            "formula": "E_cell = E°_cell − (0.059/n) × log Q (at 25°C)",
            "note": "Q = reaction quotient, n = moles of e⁻ transferred, all E in volts"
          },
          {
            "name": "Nernst equation (alternative form)",
            "formula": "E_cell = E°_cell − (RT/nF) × ln Q",
            "note": "R = 8.314 J/(mol·K), T in Kelvin, F = 96,500 C/mol, E in volts"
          },
          {
            "name": "At equilibrium (Nernst)",
            "formula": "0 = E°_cell − (0.059/n) × log Kₑq → Kₑq = 10^(n×E°/0.059)",
            "note": "When E_cell = 0, system is at equilibrium"
          },
          {
            "name": "Electrochemical cell potential",
            "formula": "E°_cell = E°_cathode − E°_anode",
            "note": "Both E° from standard reduction potential tables"
          },
          {
            "name": "Faraday's laws of electrolysis",
            "formula": "W = (M/nF) × Q = (M × I × t) / (nF)",
            "note": "W = mass deposited (g), Q = charge (coulombs), I = current (A), t = time (s)"
          },
          {
            "name": "Molar conductivity",
            "formula": "Λm = κ / c",
            "note": "κ = conductivity (S/cm), c = concentration (mol/L), Λm in S·cm²/mol"
          },
          {
            "name": "Conductivity of solution",
            "formula": "κ = (l/A) × G",
            "note": "l = length between electrodes, A = cross-sectional area, G = conductance"
          },
          {
            "name": "Weak electrolyte molar conductivity",
            "formula": "Λm = Λ°m − K√c",
            "note": "Λ°m = limiting molar conductivity, K = Kohlrausch constant"
          },
          {
            "name": "Mobility of ions",
            "formula": "Λm = F(u⁺ + u⁻)",
            "note": "u = mobility (cm²/(V·s)), sum of cation and anion mobility"
          }
        ]
      },
      {
        "heading": "Chemical Kinetics",
        "formulas": [
          {
            "name": "Rate of reaction",
            "formula": "Rate = −d[A]/dt = +d[C]/dt (for aA → cC)",
            "note": "Negative for reactants (consumed), positive for products (formed)"
          },
          {
            "name": "Rate law (empirical)",
            "formula": "Rate = k[A]^m[B]^n",
            "note": "k = rate constant, m & n = order (determined from experiment); overall order = m + n"
          },
          {
            "name": "Zero-order integrated rate law",
            "formula": "[A] = [A]₀ − kt; t₁/₂ = [A]₀/(2k)",
            "note": "Half-life depends on initial concentration; straight line on [A] vs t"
          },
          {
            "name": "First-order integrated rate law",
            "formula": "ln[A] = ln[A]₀ − kt; t₁/₂ = 0.693/k",
            "note": "Half-life constant; ln[A] vs t is linear; k in s⁻¹ typically"
          },
          {
            "name": "Second-order integrated rate law",
            "formula": "1/[A] = 1/[A]₀ + kt; t₁/₂ = 1/(k[A]₀)",
            "note": "Half-life depends on initial concentration; 1/[A] vs t is linear"
          },
          {
            "name": "Arrhenius equation",
            "formula": "k = A·e^(−Ea/RT); ln(k₂/k₁) = (Ea/R)(T₂−T₁)/(T₁T₂)",
            "note": "A = frequency factor, Ea = activation energy (J/mol), R = 8.314 J/(mol·K)"
          },
          {
            "name": "Temperature dependence rule of thumb",
            "formula": "Rate doubles for every ~10°C rise (rough estimate)",
            "note": "Exact value from Arrhenius; depends on Ea"
          },
          {
            "name": "Reaction mechanism and rate",
            "formula": "Rate-determining step controls overall rate law",
            "note": "Elementary steps must sum to give overall equation"
          },
          {
            "name": "Collision theory",
            "formula": "Rate = Z·p·e^(−Ea/RT)",
            "note": "Z = collision frequency, p = steric factor (orientation), Ea = activation energy"
          }
        ]
      },
      {
        "heading": "Organic Chemistry: Key Conversions & Reactions",
        "formulas": [
          {
            "name": "Esterification (Fischer)",
            "formula": "RCOOH + R'OH → RCOOR' + H₂O (acid catalyst H₂SO₄, heat)",
            "note": "Reversible; equilibrium favors products if water removed"
          },
          {
            "name": "Saponification",
            "formula": "RCOOR' + NaOH → RCOONa + R'OH (ester + strong base)",
            "note": "Irreversible soap formation; R can be long chain alkyl"
          },
          {
            "name": "Aldol condensation",
            "formula": "2 CH₃CHO → CH₃CH(OH)CH₂CHO (base catalyst) → CH₃CH=CHCHO + H₂O (heat)",
            "note": "Enolate attacks carbonyl; forms C−C bond"
          },
          {
            "name": "Grignard reaction",
            "formula": "RMgX + R'CHO → R−CH(OH)−R' (SN2-like); followed by acid workup",
            "note": "Highly nucleophilic; reacts with any C=O or C≡N"
          },
          {
            "name": "Williamson ether synthesis",
            "formula": "R−O⁻ + R'−X → R−O−R' + X⁻ (SN2, X = Br, I, Cl)",
            "note": "R−O⁻ from alcohol + base (KOH); X on primary/secondary alkyl best"
          },
          {
            "name": "Elimination (E2 mechanism)",
            "formula": "R₃C−H + Base → C=C + alkene (1° substrate poor, 3° excellent)",
            "note": "Zaitsev's rule: major product is more substituted (more stable) alkene"
          },
          {
            "name": "Nucleophilic aromatic substitution",
            "formula": "Ar−NO₂ + Nu⁻ → Ar−Nu + NO₂⁻ (activated by NO₂, CN, F at ortho/para)",
            "note": "Requires electron-withdrawing group; rare for Ar−H"
          },
          {
            "name": "Oxidation (Jones, permanganate, chromic)",
            "formula": "RCH₂OH → RCHO (primary alcohol to aldehyde); RCHO → RCOOH (aldehyde to carboxylic acid)",
            "note": "KMnO₄ strong; Jones quick; final product depends on conditions"
          },
          {
            "name": "Reduction (LiAlH₄, NaBH₄)",
            "formula": "RCOOH → RCH₂OH (carboxylic acid to 1° alcohol); RCOR' → RCHOHC'H₃ (ketone to 2° alcohol)",
            "note": "LiAlH₄ powerful (all carbonyls); NaBH₄ mild (aldehydes, ketones only)"
          },
          {
            "name": "Friedel-Crafts acylation",
            "formula": "Ar−H + R−CO−Cl → Ar−CO−R (AlCl₃ catalyst)",
            "note": "Creates aryl ketone; Lewis acid required; para isomer major"
          }
        ]
      },
      {
        "heading": "Polymer Chemistry & Condensation",
        "formulas": [
          {
            "name": "Addition polymerization",
            "formula": "n CH₂=CH₂ → (−CH₂−CH₂−)n (ethylene → polyethylene)",
            "note": "Alkene monomers; chain grows by repeated addition"
          },
          {
            "name": "Condensation polymerization",
            "formula": "n HOOC−R−COOH + n HO−R'−OH → polyester + 2n H₂O",
            "note": "Bifunctional monomers; water or small molecule eliminated per link"
          },
          {
            "name": "Nylon 6,6 synthesis",
            "formula": "n H₂N−(CH₂)₆−NH₂ + n HOOC−(CH₂)₄−COOH → nylon + 2n H₂O",
            "note": "Adipic acid + hexamethylenediamine; amide linkage"
          },
          {
            "name": "Degree of polymerization",
            "formula": "Degree of polymerization = number of monomer units in chain",
            "note": "n in (−C−C−)n formula; typically 100s to 1000s"
          },
          {
            "name": "Molar mass of polymer",
            "formula": "M_polymer = (degree of polymerization) × (molar mass of monomer unit)",
            "note": "Approximate for long chains; end groups negligible"
          }
        ]
      },
      {
        "heading": "Surface Chemistry & Adsorption",
        "formulas": [
          {
            "name": "Adsorption isotherm (Freundlich)",
            "formula": "x/m = k·P^(1/n) (at constant T)",
            "note": "x = mass adsorbed, m = mass adsorbent, P = pressure, k & n constants"
          },
          {
            "name": "Adsorption isotherm (Langmuir)",
            "formula": "x/m = (abP) / (1 + bP)",
            "note": "a = monolayer capacity, b = affinity constant; more realistic than Freundlich"
          },
          {
            "name": "Colloidal stability (zeta potential)",
            "formula": "High |ζ| > stability (similar charges repel); low |ζ| → coagulation",
            "note": "ζ = zeta potential; electrostatic stabilization; salt can cause coagulation"
          },
          {
            "name": "Hardy-Schulze rule",
            "formula": "Coagulating power of ions ∝ charge; +3 > +2 > +1",
            "note": "Higher charge density = faster coagulation of opposite colloid"
          }
        ]
      },
      {
        "heading": "Coordination Chemistry & Crystal Field Theory",
        "formulas": [
          {
            "name": "Coordination number",
            "formula": "Number of ligands bonded to central metal ion",
            "note": "Typically 4 (square planar, tetrahedral) or 6 (octahedral)"
          },
          {
            "name": "IUPAC naming (coordination compounds)",
            "formula": "Ligands named first (alphabetical) + central metal + oxidation state in ()",
            "note": "e.g. [Co(NH₃)₆]³⁺ = hexaamminecobalt(III)"
          },
          {
            "name": "Crystal field splitting (octahedral)",
            "formula": "d_xy, d_xz, d_yz (lower) | Δ | d_x²−y², d_z² (higher)",
            "note": "Δ = Δ₀ (crystal field splitting energy); weak field vs strong field determines spin"
          },
          {
            "name": "High spin vs low spin",
            "formula": "High spin: Δ small → electrons occupy all d orbitals singly first (Hund's rule)",
            "note": "Low spin: Δ large → electrons pair in lower orbitals (strong field ligands like CN⁻)"
          },
          {
            "name": "Magnetic moment (spin only)",
            "formula": "μ = √[n(n+2)] B.M. (Bohr magnetons)",
            "note": "n = number of unpaired electrons; stronger field → more pairing → lower μ"
          }
        ]
      },
      {
        "heading": "Quantitative Practice Reminders",
        "formulas": [
          {
            "name": "Percentage by mass",
            "formula": "% by mass = (mass of element/total mass) × 100",
            "note": "Use molar masses and stoichiometry; sum should = 100%"
          },
          {
            "name": "Simplest mole ratio",
            "formula": "Divide all moles by smallest; multiply by whole number if fraction",
            "note": "This gives the empirical formula subscripts"
          },
          {
            "name": "Limiting reagent identification",
            "formula": "Divide each reactant moles by its stoichiometric coefficient; smallest = limiting",
            "note": "Controls theoretical yield; others are in excess"
          },
          {
            "name": "Normality arithmetic",
            "formula": "N₁V₁ = N₂V₂ (for titrations); relates to concentration for redox",
            "note": "N = equivalents/L; for polyprotic acid, N = M × (number of H⁺/OH⁻)"
          },
          {
            "name": "Energy per mole",
            "formula": "ΔH_rxn = ΔH_reaction per balanced equation (not per mole of single reactant)",
            "note": "Always specify 'per mole' or clarify reaction stoichiometry"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between Kc and Kp, and when should I use the Nernst equation?",
        "a": "Kc uses concentrations (mol/L); Kp uses partial pressures. Use Nernst (E_cell = E°_cell − 0.059/n × log Q) to find cell potential at non-standard conditions (any concentration/pressure, any temperature). At equilibrium, E_cell = 0 and Q = Kₑq. Always ensure n matches the moles of electrons in the balanced equation."
      },
      {
        "q": "How do colligative properties like boiling point elevation depend on solute?",
        "a": "They don't depend on the identity of the solute, only on the number of solute particles. ΔTb = Kb × m and osmotic pressure π = CRT are colligative, so they work for any non-volatile solute. For electrolytes that dissociate (like NaCl), multiply by van't Hoff factor i to get the observed effect."
      },
      {
        "q": "For reaction kinetics, how do I determine reaction order from experimental data?",
        "a": "Plot [A] vs t (zero-order = straight line), ln[A] vs t (first-order = straight line), and 1/[A] vs t (second-order = straight line). The one that gives a linear plot reveals the order. Then calculate k from the slope. For complex rate laws, use the method of initial rates (vary one reactant concentration, keep others constant, measure how rate changes)."
      }
    ],
    "slug": "class-12-chemistry"
  }
];

export function getFormulaSheet(slug: string): FormulaSheet | undefined {
  return FORMULA_SHEETS.find((s) => s.slug === slug);
}
export const FORMULA_SLUGS = FORMULA_SHEETS.map((s) => s.slug);
