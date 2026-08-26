# MCQ verification report

Generated 2026-08-26 — an INDEPENDENT re-answer of each question,
asked cold without showing the stored key. A disagreement is a shortlist item for a human,
not proof the bank is wrong.

- questions checked: **1560**
- model disagreed with the stored key: **48** (3.1%)
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

### Social Science — Physical Features of India
**Q:** The Himalayas are primarily composed of:
- A) Igneous rock
- B) Sedimentary rock ← **bank says**
- C) Metamorphic rock
- D) All of the above ← *model says*
> bank's reasoning: The Himalayas are primarily made of sedimentary rocks and were formed by tectonic plate collision.

### Mathematics — Arithmetic Progressions
**Q:** Is 0 part of the AP: -5, -3, -1, 1, 3, ...?
- A) No, 0 is not in this sequence ← *model says*
- B) Yes, it is the 4th term ← **bank says**
- C) Cannot be determined
- D) Yes, it is the 3rd term
> bank's reasoning: d = 2, checking: -5 + (n-1)*2 = 0, (n-1)*2 = 5, n-1 = 2.5. Since n is not integer, 0 is not a term. Wait let me check: -5, -3, -1, 1... d=2. -5+(n-1)2=0 gives n=3.5, not integer. So 0 is NOT part. But I said index 0 which is 'Yes'. Let me reconsider the sequence and indices more carefully. Looking at the options: index 0 is 'Yes its 4th term', index 1 is 'No'. If 0 is not in sequence, answer should be index 1.

### Social Science — Federalism
**Q:** How many Union Territories does India have?
- A) 5
- B) 15
- C) 9 ← *model says*
- D) 8 ← **bank says**
> bank's reasoning: India has 8 Union Territories. Dadra and Nagar Haveli merged with Daman and Diu in 2020, and Jammu & Kashmir and Ladakh became UTs in 2019.

### Science — Electricity (Case Study)
**Q:** Three resistors of 6 ohms, 6 ohms, and 12 ohms are connected in a circuit. Two 6-ohm resistors are in parallel, then this combination is in series with the 12-ohm resistor. What is the total resistance?
- A) 24 ohms
- B) 3 ohms
- C) 9 ohms ← *model says*
- D) 15 ohms ← **bank says**
> bank's reasoning: Two 6-ohm resistors in parallel: 1/Rp = 1/6 + 1/6 = 1/3, so Rp = 3 ohms. That 3 ohms is in series with 12 ohms, so the total is 3 + 12 = 15 ohms.

### Science — Electricity (Case Study)
**Q:** A light bulb rated 60 W, 120 V is used in a 240 V circuit with an appropriate series resistor for protection. What is the power consumed by the series resistor?
- A) 20 W
- B) 90 W ← *model says*
- C) 30 W
- D) 60 W ← **bank says**
> bank's reasoning: The bulb needs 120 V at I = 60/120 = 0.5 A. The series resistor takes the other 240 - 120 = 120 V at the same 0.5 A, so its power is P = V x I = 120 x 0.5 = 60 W.

### Mathematics — Probability (Case Study)
**Q:** In a bag, there are 5 red balls, 3 blue balls, and 2 green balls. If two balls are drawn without replacement, what is the probability that both are red?
- A) 10/90 ← *model says*
- B) 25/90
- C) 20/90 ← **bank says**
- D) 5/45
> bank's reasoning: Without replacement: P(first red) = 5/10 and P(second red) = 4/9. P(both red) = 5/10 x 4/9 = 20/90 = 2/9.

### Mathematics — Coordinate Geometry (Case Study)
**Q:** The midpoint of a line segment joining (2,4) and (6,8) is?
- A) (5,7) ← *model says*
- B) (4,6) ← **bank says**
- C) (3,5)
- D) (4,5)
> bank's reasoning: Midpoint = ((2+6)/2, (4+8)/2) = (4, 6).

### Science — Motion Olympiad
**Q:** Two trains 120 m and 80 m long move towards each other on parallel tracks at 20 m/s and 30 m/s. How long do they take to completely cross each other?
- A) 5 s ← *model says*
- B) 4 s ← **bank says**
- C) 2 s
- D) 10 s
> bank's reasoning: Moving towards each other, the relative speed is 20 + 30 = 50 m/s. To cross completely, the relative displacement needed is the SUM of the lengths, 120 + 80 = 200 m. Time = 200/50 = 4 s.

### Mathematics — Maths Olympiad - Number System
**Q:** What is the largest prime number less than 100 that when divided by 7 leaves a remainder of 3?
- A) 83 ← *model says*
- B) 79
- C) 73 ← **bank says**
- D) 97
> bank's reasoning: Check: 73/7 = 10 R 3 (73 = 10*7 + 3). Is 73 prime? Yes. 79/7 = 11 R 2, not 3. 83/7 = 11 R 6, not 3. 97/7 = 13 R 6, not 3. So 73 is correct.

### Mathematics — Maths Olympiad - Number System
**Q:** What is the remainder when 2^100 is divided by 5?
- A) 2
- B) 4 ← *model says*
- C) 0
- D) 1 ← **bank says**
> bank's reasoning: Finding pattern: 2^1 mod 5 = 2, 2^2 mod 5 = 4, 2^3 mod 5 = 3, 2^4 mod 5 = 1, 2^5 mod 5 = 2. Pattern repeats with cycle 4. 100 mod 4 = 0, so 2^100 mod 5 = 2^4 mod 5 = 1.

### Science — Gravitation Olympiad
**Q:** A planet has density 2 times that of Earth and radius 1/2 times Earth's radius. How does its surface gravity compare to Earth's?
- A) 2g ← *model says*
- B) g/2
- C) g/4
- D) g ← **bank says**
> bank's reasoning: Surface gravity g = (4/3)πGρR, so g is proportional to ρR. Doubling density and halving radius gives 2 x ½ = 1, i.e. the same g.

### Mathematics — Squares and Square Roots
**Q:** Simplify √16 + √9
- A) 5 ← *model says*
- B) 7 ← **bank says**
- C) 12
- D) 25
> bank's reasoning: √16 = 4 and √9 = 3. So √16 + √9 = 4 + 3 = 7.

### Mathematics — Squares and Square Roots
**Q:** What is the value of √(100/25)?
- A) 10
- B) 5
- C) 4 ← *model says*
- D) 2 ← **bank says**
> bank's reasoning: √(100/25) = √100 / √25 = 10 / 5 = 2.

### Mathematics — Squares and Square Roots
**Q:** Estimate √85 (without calculator)
- A) 9.2 ← **bank says**
- B) 10
- C) 8
- D) 9 ← *model says*
> bank's reasoning: 9² = 81 and 10² = 100. Since 85 is closer to 81, √85 is approximately 9.2.

### Mathematics — Mensuration (Areas and Volumes)
**Q:** What is the area of a trapezium with parallel sides 5 cm and 9 cm, and height 4 cm?
- A) 56 sq.cm
- B) 42 sq.cm ← *model says*
- C) 36 sq.cm
- D) 28 sq.cm ← **bank says**
> bank's reasoning: Area of trapezium = (1/2) × (sum of parallel sides) × height = (1/2) × (5 + 9) × 4 = (1/2) × 14 × 4 = 28 sq.cm.

### Chemistry — Mole Concept
**Q:** Calculate the number of molecules in 4.4 g of CO₂. (C = 12, O = 16)
- A) 2 × 6.02 × 10²³
- B) 0.5 × 6.02 × 10²³
- C) 6.02 × 10²³ ← *model says*
- D) 0.1 × 6.02 × 10²³ ← **bank says**
> bank's reasoning: Molar mass of CO₂ = 12 + 32 = 44 g/mol. Moles = 4.4/44 = 0.1, so molecules = 0.1 x 6.02 x 10²³.

### Science — Atoms and Molecules
**Q:** The mass of 0.5 mole of oxygen (O2) is (O=16):
- A) 8 g
- B) 64 g
- C) 32 g ← *model says*
- D) 16 g ← **bank says**
> bank's reasoning: Mass = moles × molar mass = 0.5 × 32 = 16 g. (Molar mass of O2 = 16×2 = 32 g/mol)

### Mathematics — Polynomials
**Q:** The remainder when p(x) = x³ + 2x² - x + 1 is divided by (x - 1) is:
- A) 2 ← *model says*
- B) 1
- C) 0
- D) 3 ← **bank says**
> bank's reasoning: By the Remainder Theorem, the remainder = p(1) = 1 + 2 - 1 + 1 = 3.

### Mathematics — Polynomials
**Q:** When p(x) = x^3 - 2x^2 + x - 1 is divided by (x - 1), the remainder is:
- A) 0 ← *model says*
- B) -1 ← **bank says**
- C) -2
- D) -3
> bank's reasoning: By the Remainder Theorem the remainder is p(1) = 1 - 2 + 1 - 1 = -1.

### Mathematics — Circles
**Q:** A tangent to a circle is perpendicular to the radius at the point of:
- A) Intersection
- B) Tangency ← *model says*
- C) Contact ← **bank says**
- D) Origin
> bank's reasoning: At the point of contact, a tangent is perpendicular to the radius of the circle.

### Mathematics — Number Systems
**Q:** The decimal representation of 1/6 is:
- A) 0.1̄6̄ ← *model says*
- B) 0.166
- C) 0.1666... ← **bank says**
- D) 0.16
> bank's reasoning: 1/6 = 0.1666... which is a non-terminating, repeating decimal (0.1̄6̄).

### Mathematics — Linear Equations in Two Variables
**Q:** The solution of a linear equation in two variables is:
- A) Only integer pairs
- B) Ordered pair(s) that satisfy the equation ← **bank says**
- C) A single point
- D) A straight line ← *model says*
> bank's reasoning: The solution is any ordered pair (x, y) that satisfies the equation; graphically, these form a straight line.

### Accountancy — Accounting for Partnership: Basic Concepts
**Q:** Ramesh and Suresh are partners. Ramesh advanced a loan of ₹1,00,000 to the firm. The partnership deed is silent on the rate of interest on loans. What is the minimum rate of interest Ramesh is entitled to receive from the firm as per the Partnership Act, 1932?
- A) 4% per annum ← *model says*
- B) 12% per annum
- C) 6% per annum ← **bank says**
- D) 9% per annum
> bank's reasoning: The Partnership Act, 1932, mandates that in the absence of a partnership deed specifying the rate of interest on loans, the lender partner is entitled to receive interest at a rate of 6% per annum.

### Accountancy — Reconstitution of a Partnership Firm - Retirement and Death of a Partner
**Q:** If the retiring partner's share of profit is guaranteed by the remaining partners, and the firm incurs a loss after retirement, this loss will be borne by:
- A) The firm
- B) The remaining partners in the ratio of their guarantees ← **bank says**
- C) The retiring partner
- D) The remaining partners in their profit-sharing ratio ← *model says*
> bank's reasoning: When a profit is guaranteed by remaining partners, any shortfall in the guaranteed amount (or loss in this case) is to be borne by the guaranteeing partners in the ratio of their guarantees, which is usually their new profit-sharing ratio unless stated otherwise.

### Accountancy — Dissolution of Partnership Firm
**Q:** Which account is debited when goodwill of Rs. 30,000 appears in the balance sheet at the time of dissolution?
- A) Profit and Loss Account
- B) Partner's Capital Accounts ← **bank says**
- C) Goodwill Account
- D) Realization Account ← *model says*
> bank's reasoning: Goodwill appearing in the balance sheet is an unvalued asset and is written off by debiting the Partner's Capital Accounts in their profit-sharing ratio.

### Accountancy — Dissolution of Partnership Firm
**Q:** In case of dissolution, expenses on realization paid by a partner is debited to:
- A) Cash Account
- B) Profit and Loss Account
- C) Partner's Capital Account ← *model says*
- D) Realization Account ← **bank says**
> bank's reasoning: When a partner agrees to bear realization expenses, his capital account is credited with the amount paid to him. The actual payment of expenses by the firm is debited to the Realization Account. If the partner bears the expense, it means the firm saves that expense, hence credited to partner's capital. However, the question asks what is debited to Realization Account for the expense paid by the firm.

### Accountancy — Issue and Redemption of Debentures
**Q:** A company issued 500, 8% debentures of ₹1,000 each at a discount of 4%. The debentures are redeemable at a premium of 6%. The total loss on issue of debentures will be:
- A) ₹60,000 ← *model says*
- B) ₹50,000 ← **bank says**
- C) ₹30,000
- D) ₹20,000
> bank's reasoning: Discount on issue = 4% of ₹5,00,000 = ₹20,000. Premium on redemption = 6% of ₹5,00,000 = ₹30,000. Total loss = ₹20,000 + ₹30,000 = ₹50,000.

### Accountancy — Issue and Redemption of Debentures
**Q:** When debentures are redeemed out of capital, the corresponding credit entry is usually made to:
- A) Statement of Profit and Loss
- B) General Reserve ← *model says*
- C) Debenture Redemption Reserve Account ← **bank says**
- D) Debenture Holders Account
> bank's reasoning: When debentures are redeemed out of capital, the Debenture Redemption Reserve (DRR) or any other reserve created for this purpose is utilized. The debenture holders are paid, and their account is debited.

### Accountancy — Issue and Redemption of Debentures
**Q:** Securities Premium Reserve can be used for writing off discount on issue of debentures, provided that:
- A) The debentures are redeemable at a premium
- B) The debentures are redeemable at a discount
- C) The debentures are redeemable at par ← **bank says**
- D) The debentures are redeemable within 12 months ← *model says*
> bank's reasoning: Securities Premium can be used to write off the discount on issue of debentures. This is allowed when debentures are redeemable at par or at a premium.

### Accountancy — Accounting Ratios
**Q:** If the Current Ratio is 2:1 and the Quick Ratio is 1.5:1, what can be inferred about the company's inventory?
- A) Inventory is not a significant asset.
- B) Inventory levels are optimal.
- C) Inventory has decreased significantly. ← **bank says**
- D) Inventory has increased significantly. ← *model says*
> bank's reasoning: A higher current ratio than quick ratio indicates the presence of inventory. A significant difference between the two suggests inventory is a substantial component. A quick ratio lower than the current ratio means that inventory is significant. If quick ratio is close to current ratio it means inventory is not significant. If quick ratio is higher than current ratio it means inventory is not significant and is having negative value which is not possible.

### Business Studies — Principles of Management
**Q:** Taylor's principle of 'Cooperation between the principle and men' emphasizes:
- A) Eliminating conflict between management and workers ← **bank says**
- B) Promoting teamwork and harmony
- C) Sharing profits with employees
- D) Joint development of work methods ← *model says*
> bank's reasoning: This principle advocates for a cooperative attitude between management and workers, working together to achieve common goals and minimizing conflict.

### Business Studies — Business Environment
**Q:** The Indian government's policy on Foreign Direct Investment (FDI) is a part of its:
- A) Social Environment
- B) Political Environment ← **bank says**
- C) Legal Environment
- D) Economic Environment ← *model says*
> bank's reasoning: Government policies, regulations, and political stability are key components of the political environment, influencing business decisions and operations, including FDI.

### Business Studies — Consumer Protection
**Q:** A consumer can file a complaint in the District Consumer Disputes Redressal Forum if the value of goods or services paid as consideration does not exceed:
- A) ₹5 Crores
- B) ₹50 Lakhs ← **bank says**
- C) ₹10 Lakhs
- D) ₹1 Crore ← *model says*
> bank's reasoning: As per the Consumer Protection Act, 2019, the pecuniary jurisdiction of the District Consumer Disputes Redressal Forum is up to ₹50 Lakhs. Previously it was ₹20 Lakhs.

### Accountancy — Recording of Transactions - II
**Q:** Goods taken by the proprietor for personal use are recorded in:
- A) Purchases Journal
- B) Drawings Account ← *model says*
- C) Sales Journal
- D) Journal Proper ← **bank says**
> bank's reasoning: When goods are taken for personal use, it's a form of withdrawal. This transaction is typically recorded in the Journal Proper by debiting the Drawings Account and crediting the Purchases Account.

### Accountancy — Bank Reconciliation Statement
**Q:** If the Cash Book shows an overdraft of ₹2,000 and the Pass Book shows an overdraft of ₹1,800, and the difference is due to unrecorded bank charges of ₹200, starting from the Cash Book balance, what is the correct adjustment?
- A) Subtract ₹200 from the Pass Book overdraft
- B) Add ₹200 to the Pass Book overdraft
- C) Add ₹200 to the Cash Book overdraft ← *model says*
- D) Subtract ₹200 from the Cash Book overdraft ← **bank says**
> bank's reasoning: Starting from the Cash Book overdraft of ₹2,000. Unrecorded bank charges mean the Pass Book is lower than it should be (more negative). To reconcile, we need to reduce the Cash Book overdraft (make it less negative) by ₹200: ₹2,000 - ₹200 = ₹1,800.

### Accountancy — Bank Reconciliation Statement
**Q:** When preparing a BRS, if a direct deposit by a customer of ₹700 is credited in the Pass Book but not recorded in the Cash Book, and the Cash Book balance is ₹5,000 (favorable), what will be the adjusted Cash Book balance if we start from the Pass Book balance of ₹4,300 (favorable)?
- A) ₹4,300
- B) ₹3,600
- C) ₹5,000 ← **bank says**
- D) ₹5,700 ← *model says*
> bank's reasoning: Starting from Pass Book balance of ₹4,300. A direct deposit by a customer increases the Pass Book balance. To reconcile, we add this ₹700 to the Pass Book balance: ₹4,300 + ₹700 = ₹5,000, which is the adjusted Cash Book balance.

### Accountancy — Trial Balance and Rectification of Errors
**Q:** Salaries paid to an employee ₹2,000 were wrongly debited to his personal account. This is an example of:
- A) Error of duplication
- B) Error of omission
- C) Error of commission ← *model says*
- D) Error of principle ← **bank says**
> bank's reasoning: Debiting a personal account instead of an expense account (Salaries A/c) is an error of principle, as it violates the rules of accounting.

### Accountancy — Trial Balance and Rectification of Errors
**Q:** Rectification of an error of principle involves:
- A) Transferring an amount from one account to another ← **bank says**
- B) Crediting or debiting an account which was not touched
- C) Passing an additional journal entry ← *model says*
- D) Correcting the amount of a transaction
> bank's reasoning: Errors of principle involve placing a transaction to the wrong category of account (e.g., debiting an asset account for revenue expenditure). Rectification involves transferring the amount to the correct account.

### Accountancy — Depreciation, Provisions and Reserves
**Q:** Which of the following is NOT a revenue reserve?
- A) Dividend Equity Reserve ← *model says*
- B) Retained Earnings
- C) General Reserve
- D) Profit on Sale of Investments ← **bank says**
> bank's reasoning: Profit on Sale of Investments arises from the sale of a capital asset and is generally considered a capital profit, leading to a capital reserve. The other options are typically considered revenue reserves, created from the profits of ordinary business operations.

### Accountancy — Depreciation, Provisions and Reserves
**Q:** Which of the following is a capital reserve?
- A) Profit on sale of Fixed Assets ← **bank says**
- B) Workmen Compensation Reserve
- C) Debenture Redemption Reserve ← *model says*
- D) General Reserve
> bank's reasoning: Capital reserves arise from capital profits, such as profits on the sale of fixed assets or investments, or profits from revaluation of assets. The other options are revenue reserves.

### Accountancy — Bills of Exchange
**Q:** When a bill is discounted with a bank, the bank charges:
- A) Discount only ← *model says*
- B) Interest only
- C) Discount and commission ← **bank says**
- D) Interest and commission
> bank's reasoning: When a bill is discounted, the bank deducts the interest for the unexpired period of the bill and may also charge a commission for its services.

### Accountancy — Financial Statements - I
**Q:** An item that appears on both the debit side of the Trading Account and the credit side of the Profit and Loss Account is:
- A) Salaries
- B) Wages
- C) Purchases Returns ← **bank says**
- D) Rent Received ← *model says*
> bank's reasoning: Purchases Returns (or Return outwards) are deducted from purchases on the debit side of the Trading Account, effectively reducing the cost of goods sold. In the context of the P&L, it is a reduction of expenses, and thus has a credit effect on the net profit.

### Mathematics — Shapes Around Us
**Q:** What shape is a stop sign?
- A) Rectangle
- B) Square ← *model says*
- C) Triangle ← **bank says**
- D) Circle
> bank's reasoning: Stop signs are typically octagons, but in the context of basic shapes taught at this level, they are often simplified to a triangle with a point facing upwards or represented by its prominent triangular shape.

### English — Alphabet A to M
**Q:** Look at these letters: J, K, L. Which letter comes after 'K'?
- A) M ← *model says*
- B) I
- C) J
- D) L ← **bank says**
> bank's reasoning: In the sequence J, K, L, the letter 'L' comes after 'K'.

### English — Alphabet A to M
**Q:** What is the letter that looks like a bird's nest?
- A) N ← **bank says**
- B) M ← *model says*
- C) X
- D) Z
> bank's reasoning: 'N' can sometimes be visualized as having a shape similar to a nest with twigs.

### The World Around Us — My Family
**Q:** Who takes care of you when you are sick?
- A) Grandparents ← *model says*
- B) Friends
- C) Siblings
- D) All of the above ← **bank says**
> bank's reasoning: Family members, including grandparents and siblings, often take care of us when we are unwell.
