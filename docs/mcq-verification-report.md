# MCQ verification report

Generated 2026-08-10 — an INDEPENDENT re-answer of each question,
asked cold without showing the stored key. A disagreement is a shortlist item for a human,
not proof the bank is wrong.

- questions checked: **1347**
- model disagreed with the stored key: **64** (4.8%)
- unparseable batches (not checked): 0

## To review

### Mathematics — Triangles
**Q:** If the altitude from vertex A to side BC of triangle ABC is 6 cm and BC = 8 cm, the area is:
- A) 48 cm^2 ← *model says*
- B) 12 cm^2
- C) 36 cm^2
- D) 24 cm^2 ← **bank says**
> bank's reasoning: Area of triangle = (1/2) x base x height = (1/2) x 8 x 6 = 24 cm^2.

### Mathematics — Probability
**Q:** If P(A) = 0.2 and P(B) = 0.5, and P(A or B) = 0.6, then events A and B are:
- A) Independent ← **bank says**
- B) Dependent ← *model says*
- C) Mutually exclusive
- D) Cannot be determined
> bank's reasoning: Using P(A or B) = P(A) + P(B) - P(A and B): 0.6 = 0.2 + 0.5 - P(A and B), so P(A and B) = 0.1 = 0.2 x 0.5, confirming independence.

### Science — Motion
**Q:** Newton's second law can be expressed as:
- A) v = u + at
- B) s = ut + 1/2 at^2
- C) F = ma ← **bank says**
- D) a = F/m ← *model says*
> bank's reasoning: Newton's second law states that Force equals mass times acceleration: F = ma.

### Social Science — Physical Features of India
**Q:** The highest peak in India is:
- A) Nanda Devi
- B) Kangchenjunga ← **bank says**
- C) K2 ← *model says*
- D) Mount Everest
> bank's reasoning: Kangchenjunga (8,586 m) is the highest peak wholly in Indian territory, located in the Sikkim Himalaya.

### Social Science — Physical Features of India
**Q:** The Himalayas are primarily composed of:
- A) Igneous rock
- B) Sedimentary rock ← **bank says**
- C) Metamorphic rock
- D) All of the above ← *model says*
> bank's reasoning: The Himalayas are primarily made of sedimentary rocks and were formed by tectonic plate collision.

### Social Science — Physical Features of India
**Q:** The Thar Desert is located in:
- A) Rajasthan and Punjab ← *model says*
- B) Rajasthan ← **bank says**
- C) Haryana
- D) Gujarat
> bank's reasoning: The Thar (Great Indian) Desert is primarily located in Rajasthan, extending into Gujarat and Punjab.

### Mathematics — Arithmetic Progressions
**Q:** What is the 5th term of AP: 2, 5, 8, 11, ...?
- A) 17 ← *model says*
- B) 16
- C) 15
- D) 14 ← **bank says**
> bank's reasoning: d = 3, a5 = 2 + (5-1)*3 = 2 + 12 = 14.

### Social Science — Federalism
**Q:** How many Union Territories does India have?
- A) 15
- B) 8 ← *model says*
- C) 9 ← **bank says**
- D) 5
> bank's reasoning: As of recent reorganization, India has 8 Union Territories administered directly by the central government.

### Science — Light (Case Study)
**Q:** A lens maker's formula relates focal length to radii of curvature. If both surfaces of a symmetric convex lens have radius 10 cm and the refractive index is 1.5, what is the focal length?
- A) 20 cm
- B) 15 cm
- C) 10 cm ← *model says*
- D) 5 cm ← **bank says**
> bank's reasoning: 1/f = (n-1)(1/R1 - 1/R2) = (1.5-1)(1/10 - 1/(-10)) = 0.5 * 0.2 = 0.1, so f = 10 cm. Wait, let me recalculate: (1/10 + 1/10) = 0.2, so f = 5 cm.

### Science — Electricity (Case Study)
**Q:** A circuit has a 12 V battery, a switch, a 4-ohm resistor, and an ammeter. When the switch is closed, the ammeter reads 2.5 A. What is the internal resistance of the battery?
- A) 2.0 ohms
- B) 0.8 ohms ← **bank says**
- C) 0.4 ohms ← *model says*
- D) 1.6 ohms
> bank's reasoning: Using V = I(R + r): 12 = 2.5(4 + r), so 12 = 10 + 2.5r, giving 2.5r = 2, r = 0.8 ohms.

### Mathematics — Trigonometry (Applications Case Study)
**Q:** An aeroplane at height 2000 meters observes the angle of depression to two buildings on opposite sides of a road at 30 degrees and 45 degrees respectively. If both angles are measured from the plane, what is the distance between the buildings?
- A) 2000 m
- B) 2000 sqrt(3) + 2000 m ← **bank says**
- C) 2000 + 2000 sqrt(3) m ← *model says*
- D) 4000 m
> bank's reasoning: Distance to 30-degree building: d1 = 2000/tan(30) = 2000*sqrt(3). Distance to 45-degree building: d2 = 2000/tan(45) = 2000. Total = 2000*sqrt(3) + 2000 m.

### Mathematics — Probability (Case Study)
**Q:** In a bag, there are 5 red balls, 3 blue balls, and 2 green balls. If two balls are drawn without replacement, what is the probability that both are red?
- A) 25/90 ← **bank says**
- B) 20/90 ← *model says*
- C) 5/45
- D) 10/90
> bank's reasoning: P(both red) = (5/10) * (4/9) = 20/90 = 2/9. Wait, that's 20/90, not 25/90. Let me recompute: 5 red out of 10 total. First ball red: 5/10. After removing one red, 4 red out of 9 remain. Second ball red: 4/9. P = 5/10 * 4/9 = 20/90. But the option says 25/90. Let me verify: 5*4 = 20, so 20/90. 20/90 = 2/9. None of the options match 20/90 exactly except when reduced. Actually 25/90 is wrong based on calculation. Assuming typo and correct answer is 20/90 which might be listed differently or there's an error. I'll mark option 0 as the closest intended answer.

### Social Science — Money and Credit (Case Study)
**Q:** A farmer borrows Rs 50,000 from a cooperative bank at 8% annual interest for 3 years. How much simple interest will he pay?
- A) Rs 14,000 ← *model says*
- B) Rs 12,000 ← **bank says**
- C) Rs 10,000
- D) Rs 15,000
> bank's reasoning: Simple Interest = (Principal * Rate * Time) / 100 = (50000 * 8 * 3) / 100 = 12000. Total amount = 50000 + 12000 = 62000.

### Social Science — Money and Credit (Case Study)
**Q:** A person deposits Rs 10,000 in a bank account with 5% annual compound interest. How much will be in the account after 2 years?
- A) Rs 12,025 ← *model says*
- B) Rs 12,000
- C) Rs 11,000
- D) Rs 11,025 ← **bank says**
> bank's reasoning: Amount = Principal * (1 + Rate/100)^Time = 10000 * (1.05)^2 = 10000 * 1.1025 = 11025.

### Social Science — Money and Credit (Case Study)
**Q:** Why do banks charge different interest rates for deposits and loans?
- A) Deposits are riskless and loans involve risk ← **bank says**
- B) Banks need profit margin ← *model says*
- C) To confuse customers
- D) Government mandates different rates
> bank's reasoning: Banks offer lower rates on deposits (safer, guaranteed return) and charge higher rates on loans (they bear the risk of non-repayment). The difference is their profit margin.

### Science — Motion Olympiad
**Q:** A ball is thrown vertically upward with initial velocity 30 m/s. Taking g = 10 m/s^2, what is the maximum height reached?
- A) 75 m ← *model says*
- B) 60 m
- C) 90 m
- D) 45 m ← **bank says**
> bank's reasoning: At the highest point v = 0, so h = u²/(2g) = 30²/(2 x 10) = 900/20 = 45 m.

### Mathematics — Maths Olympiad - Number System
**Q:** What is the largest prime number less than 100 that when divided by 7 leaves a remainder of 3?
- A) 97
- B) 73 ← **bank says**
- C) 79
- D) 83 ← *model says*
> bank's reasoning: Check: 73/7 = 10 R 3 (73 = 10*7 + 3). Is 73 prime? Yes. 79/7 = 11 R 2, not 3. 83/7 = 11 R 6, not 3. 97/7 = 13 R 6, not 3. So 73 is correct.

### Mathematics — Maths Olympiad - Number System
**Q:** What is the remainder when 2^100 is divided by 5?
- A) 2
- B) 4 ← *model says*
- C) 1 ← **bank says**
- D) 0
> bank's reasoning: Finding pattern: 2^1 mod 5 = 2, 2^2 mod 5 = 4, 2^3 mod 5 = 3, 2^4 mod 5 = 1, 2^5 mod 5 = 2. Pattern repeats with cycle 4. 100 mod 4 = 0, so 2^100 mod 5 = 2^4 mod 5 = 1.

### Mathematics — Maths Olympiad - Number System
**Q:** If 2^a * 3^b * 5^c = 360, what is a + b + c?
- A) 6 ← *model says*
- B) 5 ← **bank says**
- C) 3
- D) 4
> bank's reasoning: 360 = 2^3 * 3^2 * 5^1. So a=3, b=2, c=1. a+b+c = 6. Wait, let me verify: 8*9*5 = 360. Yes. So answer is 6, which is index 3.

### Mathematics — Maths Olympiad - Number System
**Q:** The LCM of two numbers is 60 and their GCD is 5. If one number is 20, what is the other number?
- A) 30 ← *model says*
- B) 25
- C) 12
- D) 15 ← **bank says**
> bank's reasoning: LCM x GCD = product of the numbers: 60 x 5 = 300. The other number is 300 / 20 = 15.

### Science — Gravitation Olympiad
**Q:** An object is dropped from the top of a building on Earth (g=10 m/s^2). After 2 seconds, how far has it fallen?
- A) 20 m ← **bank says**
- B) 10 m
- C) 40 m ← *model says*
- D) 30 m
> bank's reasoning: Starting from rest, s = ½gt² = ½ x 10 x 2² = 20 m.

### Science — Gravitation Olympiad
**Q:** The escape velocity from Earth is 11.2 km/s. What is the escape velocity from a planet with double Earth's mass and double its radius?
- A) 5.6 km/s
- B) 11.2 km/s ← **bank says**
- C) 7.9 km/s
- D) 22.4 km/s ← *model says*
> bank's reasoning: v_escape = sqrt(2*G*M/r). If M doubles and r doubles: v_escape_new = sqrt(2*G*2M/2r) = sqrt(2*G*M/r) = v_escape (unchanged).

### Science — Gravitation Olympiad
**Q:** A planet has density 2 times that of Earth and radius 1/2 times Earth's radius. How does its surface gravity compare to Earth's?
- A) 2g ← *model says*
- B) g/2
- C) g ← **bank says**
- D) g/4
> bank's reasoning: Surface gravity g = (4/3)πGρR, so g is proportional to ρR. Doubling density and halving radius gives 2 x ½ = 1, i.e. the same g.

### Science — Gravitation Olympiad
**Q:** Kepler's Third Law states that the square of the orbital period is proportional to the cube of the semi-major axis. For a satellite orbiting twice as far from Earth, how does its period change?
- A) 8 times larger ← *model says*
- B) Halved
- C) Same
- D) sqrt(8) times larger ← **bank says**
> bank's reasoning: T^2 is proportional to a^3. If a doubles: T_new^2 proportional to (2a)^3 = 8*a^3. So T_new^2 = 8*T^2, giving T_new = T*sqrt(8) = 2*sqrt(2)*T.

### Mathematics — Squares and Square Roots
**Q:** What is the value of √(100/25)?
- A) 4 ← *model says*
- B) 5
- C) 2 ← **bank says**
- D) 10
> bank's reasoning: √(100/25) = √100 / √25 = 10 / 5 = 2.

### Mathematics — Mensuration (Areas and Volumes)
**Q:** What is the area of a trapezium with parallel sides 5 cm and 9 cm, and height 4 cm?
- A) 36 sq.cm ← *model says*
- B) 56 sq.cm
- C) 28 sq.cm ← **bank says**
- D) 42 sq.cm
> bank's reasoning: Area of trapezium = (1/2) × (sum of parallel sides) × height = (1/2) × (5 + 9) × 4 = (1/2) × 14 × 4 = 28 sq.cm.

### Chemistry — Mole Concept
**Q:** Calculate the number of molecules in 4.4 g of CO₂. (C = 12, O = 16)
- A) 0.5 × 6.02 × 10²³ ← *model says*
- B) 2 × 6.02 × 10²³
- C) 0.1 × 6.02 × 10²³ ← **bank says**
- D) 6.02 × 10²³
> bank's reasoning: Molar mass of CO₂ = 12 + 32 = 44 g/mol. Moles = 4.4/44 = 0.1, so molecules = 0.1 x 6.02 x 10²³.

### Science — Atoms and Molecules
**Q:** The mass of 0.5 mole of oxygen (O2) is (O=16):
- A) 64 g
- B) 32 g ← *model says*
- C) 16 g ← **bank says**
- D) 8 g
> bank's reasoning: Mass = moles × molar mass = 0.5 × 32 = 16 g. (Molar mass of O2 = 16×2 = 32 g/mol)

### Science — Atoms and Molecules
**Q:** Number of molecules in 11.2 L of CO2 at STP is:
- A) 9.033 × 10^23 ← *model says*
- B) 6.022 × 10^23
- C) 1.505 × 10^23
- D) 3.011 × 10^23 ← **bank says**
> bank's reasoning: At STP one mole occupies 22.4 L, so 11.2 L is 0.5 mol. Molecules = 0.5 x 6.022 x 10²³ = 3.011 x 10²³.

### Science — Why Do We Fall Ill
**Q:** Which of the following helps our body fight infections?
- A) White blood cells ← *model says*
- B) Toxins
- C) Pathogens
- D) Antibodies ← **bank says**
> bank's reasoning: Antibodies are produced by the immune system to neutralize and destroy pathogens and their toxins.

### Mathematics — Polynomials
**Q:** The remainder when p(x) = x³ + 2x² - x + 1 is divided by (x - 1) is:
- A) 2 ← *model says*
- B) 1
- C) 0
- D) 3 ← **bank says**
> bank's reasoning: By the Remainder Theorem, the remainder = p(1) = 1 + 2 - 1 + 1 = 3.

### Mathematics — Triangles
**Q:** In a right-angled triangle, if the two legs are 3 and 4, the hypotenuse is:
- A) 6
- B) √25 ← *model says*
- C) 7
- D) 5 ← **bank says**
> bank's reasoning: By Pythagoras' theorem: c² = 3² + 4² = 9 + 16 = 25, so c = 5.

### Mathematics — Circles
**Q:** A tangent to a circle is perpendicular to the radius at the point of:
- A) Tangency ← *model says*
- B) Origin
- C) Intersection
- D) Contact ← **bank says**
> bank's reasoning: At the point of contact, a tangent is perpendicular to the radius of the circle.

### Mathematics — Number Systems
**Q:** The decimal representation of 1/6 is:
- A) 0.166
- B) 0.1̄6̄ ← *model says*
- C) 0.16
- D) 0.1666... ← **bank says**
> bank's reasoning: 1/6 = 0.1666... which is a non-terminating, repeating decimal (0.1̄6̄).

### Mathematics — Number Systems
**Q:** Which set of numbers is closed under subtraction?
- A) Rational numbers ← *model says*
- B) Integers ← **bank says**
- C) Whole numbers
- D) Natural numbers
> bank's reasoning: Integers are closed under subtraction; subtracting any two integers always gives an integer.

### Accountancy — Accounting for Partnership: Basic Concepts
**Q:** Ramesh and Suresh are partners. Ramesh advanced a loan of ₹1,00,000 to the firm. The partnership deed is silent on the rate of interest on loans. What is the minimum rate of interest Ramesh is entitled to receive from the firm as per the Partnership Act, 1932?
- A) 9% per annum
- B) 4% per annum ← *model says*
- C) 12% per annum
- D) 6% per annum ← **bank says**
> bank's reasoning: The Partnership Act, 1932, mandates that in the absence of a partnership deed specifying the rate of interest on loans, the lender partner is entitled to receive interest at a rate of 6% per annum.

### Accountancy — Reconstitution of a Partnership Firm - Change in Profit Sharing Ratio
**Q:** Unrecorded assets at the time of change in profit sharing ratio are:
- A) Debited to the Capital Accounts of partners in the new ratio
- B) Debited to the Revaluation Account ← *model says*
- C) Credited to the Capital Accounts of partners in the old ratio
- D) Credited to the Revaluation Account ← **bank says**
> bank's reasoning: Unrecorded assets discovered or brought into account are credited to the Revaluation Account as they represent a gain to the partners.

### Accountancy — Reconstitution of a Partnership Firm - Admission of a Partner
**Q:** If an unrecorded asset is discovered at the time of admission, it will be:
- A) Debited to the Revaluation Account and credited to the New Partner's Capital Account.
- B) Debited to the Revaluation Account and credited to the Old Partners' Capital Accounts in their old P.S.R. ← **bank says**
- C) Debited to the Revaluation Account and credited to the General Reserve.
- D) Debited to the Revaluation Account and credited to the concerned Asset Account. ← *model says*
> bank's reasoning: An unrecorded asset represents a gain. This gain is credited to the Revaluation Account. The ultimate benefit of this gain goes to the partners at the time of admission, so it is distributed among the old partners in their old profit-sharing ratio.

### Accountancy — Reconstitution of a Partnership Firm - Retirement and Death of a Partner
**Q:** The gain or loss on revaluation of assets and liabilities at the time of retirement of a partner is shared by:
- A) All partners in their old profit-sharing ratio ← **bank says**
- B) The retiring partner only
- C) All partners in their new profit-sharing ratio
- D) The remaining partners in their new profit-sharing ratio ← *model says*
> bank's reasoning: The revaluation of assets and liabilities represents profits or losses arising from the change in value of assets and liabilities up to the point of retirement. These should be shared by all partners who were part of the firm during that period, i.e., in their old profit-sharing ratio.

### Accountancy — Reconstitution of a Partnership Firm - Retirement and Death of a Partner
**Q:** If the retiring partner's share of profit is guaranteed by the remaining partners, and the firm incurs a loss after retirement, this loss will be borne by:
- A) The retiring partner
- B) The firm
- C) The remaining partners in the ratio of their guarantees ← **bank says**
- D) The remaining partners in their profit-sharing ratio ← *model says*
> bank's reasoning: When a profit is guaranteed by remaining partners, any shortfall in the guaranteed amount (or loss in this case) is to be borne by the guaranteeing partners in the ratio of their guarantees, which is usually their new profit-sharing ratio unless stated otherwise.

### Accountancy — Dissolution of Partnership Firm
**Q:** Which account is debited when goodwill of Rs. 30,000 appears in the balance sheet at the time of dissolution?
- A) Goodwill Account
- B) Realization Account ← *model says*
- C) Partner's Capital Accounts ← **bank says**
- D) Profit and Loss Account
> bank's reasoning: Goodwill appearing in the balance sheet is an unvalued asset and is written off by debiting the Partner's Capital Accounts in their profit-sharing ratio.

### Accountancy — Issue and Redemption of Debentures
**Q:** A company issued 500, 8% debentures of ₹1,000 each at a discount of 4%. The debentures are redeemable at a premium of 6%. The total loss on issue of debentures will be:
- A) ₹60,000 ← *model says*
- B) ₹20,000
- C) ₹50,000 ← **bank says**
- D) ₹30,000
> bank's reasoning: Discount on issue = 4% of ₹5,00,000 = ₹20,000. Premium on redemption = 6% of ₹5,00,000 = ₹30,000. Total loss = ₹20,000 + ₹30,000 = ₹50,000.

### Accountancy — Issue and Redemption of Debentures
**Q:** Securities Premium Reserve can be used for writing off discount on issue of debentures, provided that:
- A) The debentures are redeemable at a discount
- B) The debentures are redeemable within 12 months
- C) The debentures are redeemable at a premium ← *model says*
- D) The debentures are redeemable at par ← **bank says**
> bank's reasoning: Securities Premium can be used to write off the discount on issue of debentures. This is allowed when debentures are redeemable at par or at a premium.

### Business Studies — Principles of Management
**Q:** Taylor's principle of 'Cooperation between the principle and men' emphasizes:
- A) Joint development of work methods
- B) Eliminating conflict between management and workers ← **bank says**
- C) Sharing profits with employees
- D) Promoting teamwork and harmony ← *model says*
> bank's reasoning: This principle advocates for a cooperative attitude between management and workers, working together to achieve common goals and minimizing conflict.

### Business Studies — Business Environment
**Q:** The Indian government's policy on Foreign Direct Investment (FDI) is a part of its:
- A) Legal Environment
- B) Economic Environment ← *model says*
- C) Political Environment ← **bank says**
- D) Social Environment
> bank's reasoning: Government policies, regulations, and political stability are key components of the political environment, influencing business decisions and operations, including FDI.

### Economics — The Theory of the Firm under Perfect Competition
**Q:** The law of diminishing marginal returns implies that as a firm increases its variable input, holding fixed inputs constant:
- A) Total product will eventually decrease
- B) Marginal product will eventually decrease ← **bank says**
- C) Average product will eventually decrease
- D) All of the above ← *model says*
> bank's reasoning: The law of diminishing marginal returns specifically states that the additional output from each additional unit of the variable input will eventually fall.

### Economics — National Income Accounting
**Q:** The sum of compensation of employees, operating surplus, and mixed income of self-employed is known as:
- A) Gross National Product at Factor Cost
- B) Gross Domestic Product at Market Price
- C) National Income ← *model says*
- D) Net Domestic Product at Factor Cost ← **bank says**
> bank's reasoning: This sum represents the Net Domestic Product at Factor Cost (NDPFC). Operating surplus includes profits, interest, and rent. Compensation of employees is wages and salaries. Mixed income accounts for income of self-employed. These are the primary components of factor incomes earned domestically.

### Economics — Open Economy Macroeconomics
**Q:** Which of the following is NOT a component of the Balance of Payments?
- A) Invisible Trade Account ← **bank says**
- B) Capital Account
- C) Financial Account ← *model says*
- D) Current Account
> bank's reasoning: The Balance of Payments is broadly divided into the Current Account and the Capital Account (which includes the Financial Account). Invisible Trade is a component of the Current Account, not a separate major account.

### Accountancy — Introduction to Accounting
**Q:** Which of the following is NOT a qualitative characteristic of accounting information?
- A) Relevance
- B) Objectivity ← **bank says**
- C) Reliability ← *model says*
- D) Comparability
> bank's reasoning: Objectivity is a fundamental qualitative characteristic. Relevance, reliability, and comparability are also key qualitative characteristics.

### Accountancy — Recording of Transactions - II
**Q:** Which entry is passed to rectify an error of omission where a transaction was not recorded in any book of original entry?
- A) Rectifying Entry ← *model says*
- B) Suspense Account Entry
- C) Compensating Entry
- D) Journal Proper Entry ← **bank says**
> bank's reasoning: An error of omission means the transaction was not recorded at all. This is corrected by passing an entry in the Journal Proper to record the transaction as it should have been originally.

### Accountancy — Bank Reconciliation Statement
**Q:** When preparing a BRS, if a direct deposit by a customer of ₹700 is credited in the Pass Book but not recorded in the Cash Book, and the Cash Book balance is ₹5,000 (favorable), what will be the adjusted Cash Book balance if we start from the Pass Book balance of ₹4,300 (favorable)?
- A) ₹5,000 ← **bank says**
- B) ₹4,300
- C) ₹3,600
- D) ₹5,700 ← *model says*
> bank's reasoning: Starting from Pass Book balance of ₹4,300. A direct deposit by a customer increases the Pass Book balance. To reconcile, we add this ₹700 to the Pass Book balance: ₹4,300 + ₹700 = ₹5,000, which is the adjusted Cash Book balance.

### Accountancy — Bank Reconciliation Statement
**Q:** Which of the following errors, if made in the Cash Book, would require an addition to the Cash Book balance when reconciling from the Cash Book balance to the Pass Book balance?
- A) Cheque of ₹200 deposited but recorded as ₹20 ← *model says*
- B) Bank charges of ₹100 not recorded
- C) Interest received of ₹400 not recorded ← **bank says**
- D) Cheque of ₹300 issued but recorded as ₹30
> bank's reasoning: Interest received of ₹400 would have increased the Pass Book balance. If it's not recorded in the Cash Book, we need to add it to the Cash Book balance to match the Pass Book.

### Accountancy — Bank Reconciliation Statement
**Q:** A dishonoured cheque of ₹500 was returned by the bank. It was initially deposited and credited in the Cash Book, but the bank debited it in the Pass Book. When reconciling starting from the Pass Book balance, what adjustment is needed?
- A) Add ₹500 to the Cash Book balance
- B) Subtract ₹500 from the Cash Book balance
- C) Add ₹500 to the Pass Book balance ← *model says*
- D) Subtract ₹500 from the Pass Book balance ← **bank says**
> bank's reasoning: A dishonoured cheque reduces the Pass Book balance. If the Cash Book has already accounted for the credit, we need to reduce the Pass Book balance by the same amount to reconcile.

### Accountancy — Trial Balance and Rectification of Errors
**Q:** Salaries paid to an employee ₹2,000 were wrongly debited to his personal account. This is an example of:
- A) Error of commission ← *model says*
- B) Error of principle ← **bank says**
- C) Error of duplication
- D) Error of omission
> bank's reasoning: Debiting a personal account instead of an expense account (Salaries A/c) is an error of principle, as it violates the rules of accounting.

### Accountancy — Trial Balance and Rectification of Errors
**Q:** When a purchase of goods for ₹5,000 was wrongly recorded as ₹500 in the purchase book, the trial balance will show:
- A) Credit side is excess by ₹4,500 ← *model says*
- B) Debit side is excess by ₹4,500 ← **bank says**
- C) Debit side is excess by ₹500
- D) Credit side is excess by ₹500
> bank's reasoning: Purchases are debited. A lower debit of ₹500 instead of ₹5,000 will make the debit side short by ₹4,500.

### Accountancy — Bills of Exchange
**Q:** When a bill is discounted with a bank, the bank charges:
- A) Discount and commission ← **bank says**
- B) Interest only
- C) Discount only ← *model says*
- D) Interest and commission
> bank's reasoning: When a bill is discounted, the bank deducts the interest for the unexpired period of the bill and may also charge a commission for its services.

### Accountancy — Financial Statements - I
**Q:** Closing inventory is shown in the financial statements as:
- A) A credit on the Profit and Loss Account and an asset on the Balance Sheet ← *model says*
- B) A debit on the Trading Account and an asset on the Balance Sheet
- C) A debit on the Profit and Loss Account and an asset on the Balance Sheet
- D) A credit on the Trading Account and an asset on the Balance Sheet ← **bank says**
> bank's reasoning: Closing inventory is credited to the Trading Account to reduce the cost of goods sold and is shown as an asset on the Balance Sheet as it represents goods available for sale in the next period.

### Accountancy — Financial Statements - I
**Q:** An item that appears on both the debit side of the Trading Account and the credit side of the Profit and Loss Account is:
- A) Purchases Returns ← **bank says**
- B) Salaries
- C) Wages
- D) Rent Received ← *model says*
> bank's reasoning: Purchases Returns (or Return outwards) are deducted from purchases on the debit side of the Trading Account, effectively reducing the cost of goods sold. In the context of the P&L, it is a reduction of expenses, and thus has a credit effect on the net profit.

### Accountancy — Financial Statements - II
**Q:** Depreciation is shown as a deduction from the original cost of an asset in the Balance Sheet. This method is known as:
- A) Straight Line Method ← *model says*
- B) Written Down Value Method
- C) Provision for Depreciation Account ← **bank says**
- D) None of the above
> bank's reasoning: When a Provision for Depreciation Account is maintained, accumulated depreciation is credited to this separate account and the asset continues to be shown at its original cost. Depreciation is then charged to the Profit and Loss Account.

### Mathematics — Numbers from 1 to 9
**Q:** How many apples are there in the basket?
- A) A basket with 3 apples ← *model says*
- B) A basket with 9 apples
- C) A basket with 5 apples ← **bank says**
- D) A basket with 7 apples
> bank's reasoning: The image shows a basket containing 5 apples.

### Mathematics — Money
**Q:** Which of these is a note, not a coin?
- A) 10 Rupees ← *model says*
- B) 5 Rupees
- C) 2 Rupees
- D) All of the above ← **bank says**
> bank's reasoning: 10 Rupees, 5 Rupees, and 2 Rupees are all available as currency notes in India. The question is slightly tricky as all options listed are available as both coins and notes. However, in common usage, 10, 5 and 2 are also very common notes.

### Mathematics — Money
**Q:** What is the total value of two 2 Rupees coins and one 1 Rupee coin?
- A) 6 Rupees ← *model says*
- B) 4 Rupees
- C) 3 Rupees
- D) 5 Rupees ← **bank says**
> bank's reasoning: Two 2 Rupees coins have a value of 2 + 2 = 4 Rupees. Adding one 1 Rupee coin makes the total 4 + 1 = 5 Rupees.

### Mathematics — Time
**Q:** Which is the longest period of time among these?
- A) One hour
- B) One day ← *model says*
- C) One week ← **bank says**
- D) One minute
> bank's reasoning: A week has 7 days, which is longer than a day, an hour, or a minute.

### Mathematics — Time
**Q:** What is the time shown on the clock?
- A) 5 o'clock ← *model says*
- B) 4 o'clock
- C) 3 o'clock ← **bank says**
- D) 6 o'clock
> bank's reasoning: The hour hand is pointing at 3, and the minute hand is pointing at 12, which means it is 3 o'clock.
