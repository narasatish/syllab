import { TutorialTopic } from './types';

export const aptitudeTopics: TutorialTopic[] = [
  // ── BASIC (Numbers & Arithmetic) ────────────────────────────────────────────
  {
    id: 'apt-number-system',
    category: 'Basic — Numbers',
    title: 'Number System',
    difficulty: 'Beginner',
    theory: [
      'Numbers are classified into Natural Numbers (1,2,3...), Whole Numbers (0,1,2...), Integers (...-2,-1,0,1,2...), Rational Numbers (p/q form), Irrational Numbers (√2, π), and Real Numbers.',
      'Even Numbers are divisible by 2 (2,4,6...). Odd Numbers are not (1,3,5...). Prime Numbers have exactly two factors: 1 and itself (2,3,5,7,11...). Composite Numbers have more than two factors.',
      'Divisibility Rules: A number is divisible by 2 if last digit is 0,2,4,6,8. By 3 if sum of digits is divisible by 3. By 4 if last two digits form a number divisible by 4. By 5 if last digit is 0 or 5. By 9 if digit sum is divisible by 9.',
      'HCF (Highest Common Factor) is the largest number that divides two or more numbers exactly. LCM (Least Common Multiple) is the smallest number exactly divisible by each of the given numbers. HCF × LCM = Product of two numbers.',
    ],
    code: `# Number System Examples

# Check prime
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0:
            return False
    return True

# HCF using Euclidean algorithm
def hcf(a, b):
    while b:
        a, b = b, a % b
    return a

# LCM
def lcm(a, b):
    return (a * b) // hcf(a, b)

print("Is 17 prime?", is_prime(17))
print("HCF of 36 and 48:", hcf(36, 48))
print("LCM of 12 and 18:", lcm(12, 18))`,
    output: `Is 17 prime? True
HCF of 36 and 48: 12
LCM of 12 and 18: 36`,
    notes: ['HCF × LCM = product of two numbers', 'Every prime number > 2 is odd', 'Sum of digits trick: 123 → 1+2+3=6, divisible by 3'],
    practice: {
      title: 'Find HCF and LCM',
      description: 'Find the HCF and LCM of 24 and 36. Verify that HCF × LCM = product of the numbers.',
      startCode: '# Find HCF and LCM of 24 and 36\n# Your code here\n',
      solution: 'def hcf(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\ndef lcm(a, b):\n    return (a*b)//hcf(a,b)\n\nprint(hcf(24,36))  # 12\nprint(lcm(24,36))  # 72\nprint(12*72 == 24*36)  # True',
      hint: 'Use the Euclidean algorithm for HCF. Then LCM = (a×b)/HCF.',
    },
  },

  {
    id: 'apt-percentages',
    category: 'Basic — Numbers',
    title: 'Percentages',
    difficulty: 'Beginner',
    theory: [
      'Percentage means "per hundred". x% = x/100. To find x% of y: (x/100) × y.',
      'Percentage increase = (Increase/Original) × 100. Percentage decrease = (Decrease/Original) × 100.',
      'If a value increases by x%, to find the original from new value: Original = New / (1 + x/100). If decreased by x%: Original = New / (1 - x/100).',
      'Successive discounts: A 20% discount followed by 10% discount is NOT 30%. Net discount = 100 - [(80/100) × (90/100) × 100] = 28%.',
      'Common shortcuts: 10% of any number = move decimal one place left. 5% = half of 10%. 1% = move decimal two places left.',
    ],
    code: `# Percentage calculations

def percentage_of(x, y):
    """Find x% of y"""
    return (x / 100) * y

def percent_change(original, new_val):
    """Percentage change from original to new"""
    return ((new_val - original) / original) * 100

def successive_discount(d1, d2):
    """Net discount for two successive discounts"""
    net = 100 - ((100-d1)/100 * (100-d2)/100 * 100)
    return round(net, 2)

print("15% of 200:", percentage_of(15, 200))
print("Change from 80 to 100:", percent_change(80, 100), "%")
print("Net discount (20%+10%):", successive_discount(20, 10), "%")`,
    output: `15% of 200: 30.0
Change from 80 to 100: 25.0 %
Net discount (20%+10%): 28.0 %`,
    notes: ['20% + 10% discount ≠ 30% discount', 'Increase by 20% then decrease by 20% → net loss of 4%', 'Multiplier for x% increase = (100+x)/100'],
    practice: {
      title: 'Percentage Problems',
      description: 'A shirt costs ₹500. It is given a 20% discount, then an additional 10% discount. What is the final price?',
      startCode: '# Calculate final price after successive discounts\nprice = 500\n# Your code here\n',
      solution: 'price = 500\nafter_first = price * 0.80\nafter_second = after_first * 0.90\nprint(f"Final price: ₹{after_second}")  # ₹360',
      hint: 'Apply each discount one after the other. 20% off means multiply by 0.80.',
    },
  },

  {
    id: 'apt-fractions-decimals',
    category: 'Basic — Numbers',
    title: 'Fractions & Decimals',
    difficulty: 'Beginner',
    theory: [
      'A fraction p/q has numerator p and denominator q. A proper fraction has p < q. An improper fraction has p ≥ q. A mixed fraction is like 2½.',
      'To compare fractions: make denominators equal (cross multiply). 3/4 vs 2/3: 3×3=9, 4×2=8, so 3/4 > 2/3.',
      'To convert decimal to fraction: 0.75 = 75/100 = 3/4. Recurring decimals: 0.333... = 1/3, 0.666... = 2/3.',
      'Operations: Addition/Subtraction → common denominator. Multiplication → multiply straight across. Division → multiply by reciprocal.',
    ],
    code: `from fractions import Fraction

# Fraction arithmetic
a = Fraction(3, 4)
b = Fraction(2, 3)

print("3/4 + 2/3 =", a + b)
print("3/4 - 2/3 =", a - b)
print("3/4 × 2/3 =", a * b)
print("3/4 ÷ 2/3 =", a / b)

# Decimal to fraction
print("0.75 as fraction:", Fraction(0.75).limit_denominator(100))

# Which is larger?
if a > b:
    print("3/4 is larger")`,
    output: `3/4 + 2/3 = 17/12
3/4 - 2/3 = 1/12
3/4 × 2/3 = 1/2
3/4 ÷ 2/3 = 9/8
0.75 as fraction: 3/4
3/4 is larger`,
    notes: ['To divide fractions, multiply by the reciprocal', '0.333... = 1/3 (recurring decimal)', 'Always simplify fractions to their lowest terms'],
    practice: {
      title: 'Fraction Operations',
      description: 'Add 2/5 and 3/7. Then convert the result to a decimal rounded to 2 decimal places.',
      startCode: '# Add 2/5 and 3/7\n# Your code here\n',
      solution: 'from fractions import Fraction\nresult = Fraction(2,5) + Fraction(3,7)\nprint(result)  # 29/35\nprint(round(float(result), 2))  # 0.83',
      hint: 'Use Fraction class or find LCM of denominators (5 and 7 = 35).',
    },
  },

  {
    id: 'apt-ratio-proportion',
    category: 'Basic — Numbers',
    title: 'Ratio & Proportion',
    difficulty: 'Beginner',
    theory: [
      'Ratio a:b = a/b. Ratios should always be in their simplest form. 12:18 = 2:3.',
      'Proportion: If a:b = c:d, then a×d = b×c (cross multiplication). This is called "Extremes = Means".',
      'If A:B = 2:3 and B:C = 3:4, then A:B:C = 2:3:4.',
      'Dividing a quantity in ratio a:b: first part = [a/(a+b)] × total, second part = [b/(a+b)] × total.',
      'Direct Proportion: y ∝ x → y = kx. As x increases, y increases. Inverse Proportion: y ∝ 1/x → as x increases, y decreases.',
    ],
    code: `# Ratio and Proportion

def ratio_simplify(a, b):
    from math import gcd
    g = gcd(a, b)
    return a//g, b//g

def divide_in_ratio(total, ratio_a, ratio_b):
    """Divide total in ratio a:b"""
    part_a = (ratio_a / (ratio_a + ratio_b)) * total
    part_b = (ratio_b / (ratio_a + ratio_b)) * total
    return part_a, part_b

def check_proportion(a, b, c, d):
    return a * d == b * c

print("12:18 simplified:", ratio_simplify(12, 18))
print("₹5000 in 2:3:", divide_in_ratio(5000, 2, 3))
print("2:3 :: 4:6?", check_proportion(2, 3, 4, 6))`,
    output: `12:18 simplified: (2, 3)
₹5000 in 2:3: (2000.0, 3000.0)
2:3 :: 4:6? True`,
    notes: ['a:b:c combined ratio: make B common', '4th proportional: if a:b = c:x → x = bc/a', 'Mean proportional of a and b = √(a×b)'],
    practice: {
      title: 'Divide in Ratio',
      description: 'Three friends A, B, and C invest in ratio 3:4:5. The total profit is ₹24,000. Find each person\'s share.',
      startCode: '# Divide ₹24000 in ratio 3:4:5\ntotal = 24000\n# Your code here\n',
      solution: 'total = 24000\nA = (3/12)*24000  # 6000\nB = (4/12)*24000  # 8000\nC = (5/12)*24000  # 10000\nprint(A, B, C)',
      hint: 'Total parts = 3+4+5 = 12. A gets 3/12 of total.',
    },
  },

  {
    id: 'apt-averages',
    category: 'Basic — Numbers',
    title: 'Averages',
    difficulty: 'Beginner',
    theory: [
      'Average = Sum of observations / Number of observations.',
      'Weighted Average = (w1×x1 + w2×x2 + ...) / (w1 + w2 + ...) — used when values have different importance/frequency.',
      'If average of n numbers is A, and one number x is replaced by y, new average = A + (y-x)/n.',
      'Average speed formula: When equal distances are covered at speeds u and v, average speed = 2uv/(u+v) (NOT (u+v)/2).',
    ],
    code: `# Averages

numbers = [65, 70, 75, 80, 60]
average = sum(numbers) / len(numbers)
print("Simple average:", average)

# Weighted average
scores = [80, 70, 90]
weights = [3, 2, 5]  # credit hours
weighted_avg = sum(s*w for s,w in zip(scores,weights)) / sum(weights)
print("Weighted average:", weighted_avg)

# Average speed
u, v = 60, 40  # km/h
avg_speed = 2*u*v / (u+v)
print(f"Average speed (60 and 40 km/h): {avg_speed} km/h")`,
    output: `Simple average: 70.0
Weighted average: 81.0
Average speed (60 and 40 km/h): 48.0 km/h`,
    notes: ['Average speed ≠ arithmetic mean of speeds', 'If new person joins group: new average = (old sum + new value)/(n+1)', 'Average of consecutive numbers = (first + last)/2'],
    practice: {
      title: 'Find the Missing Score',
      description: 'A student scored 72, 65, 80, and 78 in four tests. What must they score in the 5th test to achieve an average of 75?',
      startCode: '# Find required 5th score\nscores = [72, 65, 80, 78]\ntarget_avg = 75\n# Your code here\n',
      solution: 'scores = [72, 65, 80, 78]\ntarget_avg = 75\nrequired = target_avg * 5 - sum(scores)\nprint("Required 5th score:", required)  # 80',
      hint: 'Target sum = target_avg × 5. Required = Target sum - current sum.',
    },
  },

  {
    id: 'apt-simple-interest',
    category: 'Basic — Finance',
    title: 'Simple Interest',
    difficulty: 'Beginner',
    theory: [
      'Simple Interest (SI) = (Principal × Rate × Time) / 100. Where P = Principal (₹), R = Rate (% per annum), T = Time (years).',
      'Amount (A) = Principal + SI = P + PRT/100 = P(1 + RT/100).',
      'Finding Principal: P = (SI × 100) / (R × T).',
      'Finding Rate: R = (SI × 100) / (P × T).',
      'Finding Time: T = (SI × 100) / (P × R).',
    ],
    code: `# Simple Interest

def simple_interest(p, r, t):
    si = (p * r * t) / 100
    amount = p + si
    return si, amount

# Example: ₹5000 at 8% for 3 years
si, amount = simple_interest(5000, 8, 3)
print(f"SI: ₹{si}")
print(f"Amount: ₹{amount}")

# Find rate
def find_rate(p, si, t):
    return (si * 100) / (p * t)

rate = find_rate(4000, 960, 3)
print(f"Rate: {rate}% per annum")`,
    output: `SI: ₹1200.0
Amount: ₹6200.0
Rate: 8.0% per annum`,
    notes: ['Time must always be in years', 'SI formula: PRT/100', 'Amount = P + SI'],
    practice: {
      title: 'Simple Interest Problem',
      description: 'A sum of money becomes ₹6,300 in 2 years and ₹7,200 in 5 years at simple interest. Find the principal and rate of interest.',
      startCode: '# Find principal and rate\nA1, T1 = 6300, 2\nA2, T2 = 7200, 5\n# Hint: SI per year = (A2 - A1) / (T2 - T1)\n# Your code here\n',
      solution: 'A1, T1 = 6300, 2\nA2, T2 = 7200, 5\nsi_per_year = (A2-A1)/(T2-T1)  # 300\nsi_for_2_years = si_per_year * T1  # 600\nprincipal = A1 - si_for_2_years  # 5700\nrate = (si_per_year*100)/principal  # 5.26%\nprint(principal, round(rate,2))',
      hint: 'SI is constant each year. SI per year = difference in amounts / difference in years.',
    },
  },

  {
    id: 'apt-compound-interest',
    category: 'Basic — Finance',
    title: 'Compound Interest',
    difficulty: 'Beginner',
    theory: [
      'Compound Interest: Interest calculated on the initial principal AND the accumulated interest. A = P(1 + R/100)^T.',
      'CI = A - P = P[(1 + R/100)^T - 1].',
      'CI for 2 years = P × R/100 × (2 + R/100). For 3 years expand accordingly.',
      'Difference between CI and SI for 2 years = P(R/100)². For 3 years: P(R/100)²(3 + R/100).',
      'Half-yearly compounding: Rate becomes R/2, Time becomes 2T. Quarterly: Rate R/4, Time 4T.',
    ],
    code: `# Compound Interest

def compound_interest(p, r, t, n=1):
    """n = number of times compounded per year"""
    A = p * (1 + r/(100*n))**(n*t)
    ci = A - p
    return round(ci, 2), round(A, 2)

# Annual compounding
ci, A = compound_interest(10000, 10, 2)
print(f"CI (annual): ₹{ci}, Amount: ₹{A}")

# Half-yearly
ci, A = compound_interest(10000, 10, 2, n=2)
print(f"CI (half-yearly): ₹{ci}, Amount: ₹{A}")

# Compare with SI
si = (10000 * 10 * 2) / 100
print(f"SI: ₹{si}")
print(f"CI - SI = ₹{ci - si}")`,
    output: `CI (annual): ₹2100.0, Amount: ₹12100.0
CI (half-yearly): ₹2155.06, Amount: ₹12155.06
SI: ₹2000.0
CI - SI = ₹100.0`,
    notes: ['CI > SI always for same P, R, T', 'CI - SI for 2 years = P(R/100)²', 'Half-yearly: use R/2 and 2T in formula'],
    practice: {
      title: 'Compound Interest Calculation',
      description: 'Find compound interest on ₹8000 at 15% per annum for 2 years, compounded annually. Also find SI for the same values.',
      startCode: '# Calculate CI and SI\nP, R, T = 8000, 15, 2\n# Your code here\n',
      solution: 'P, R, T = 8000, 15, 2\nA = P*(1+R/100)**T\nCI = A - P\nSI = P*R*T/100\nprint(f"CI: {CI}")\nprint(f"SI: {SI}")\nprint(f"CI-SI: {CI-SI}")',
      hint: 'CI = P(1+R/100)^T - P. SI = PRT/100.',
    },
  },

  {
    id: 'apt-profit-loss',
    category: 'Basic — Finance',
    title: 'Profit & Loss',
    difficulty: 'Beginner',
    theory: [
      'Cost Price (CP) = price at which item is bought. Selling Price (SP) = price at which item is sold.',
      'Profit = SP - CP (when SP > CP). Loss = CP - SP (when CP > SP).',
      'Profit % = (Profit/CP) × 100. Loss % = (Loss/CP) × 100.',
      'SP = CP × (100+Profit%)/100. CP = SP × 100/(100+Profit%).',
      'If shopkeeper marks price MP and gives discount D%, SP = MP × (100-D)/100.',
      'Dishonest dealer sells at CP but uses false weight: Profit% = (True weight - False weight)/False weight × 100.',
    ],
    code: `# Profit and Loss

def profit_loss(cp, sp):
    if sp > cp:
        profit = sp - cp
        return f"Profit: ₹{profit}, Profit%: {(profit/cp)*100:.2f}%"
    else:
        loss = cp - sp
        return f"Loss: ₹{loss}, Loss%: {(loss/cp)*100:.2f}%"

def selling_price(cp, profit_pct):
    return cp * (100 + profit_pct) / 100

def cost_price_from_sp(sp, profit_pct):
    return sp * 100 / (100 + profit_pct)

print(profit_loss(200, 250))
print("SP at 20% profit on ₹500:", selling_price(500, 20))
print("CP when SP=₹480, Profit=20%:", cost_price_from_sp(480, 20))`,
    output: `Profit: ₹50, Profit%: 25.00%
SP at 20% profit on ₹500: 600.0
CP when SP=₹480, Profit=20%: 400.0`,
    notes: ['Always calculate % on CP, not SP', 'Marked Price × (1 - Discount%) = SP', 'Two successive profits x% and y%: Net = x+y+xy/100'],
    practice: {
      title: 'Profit and Loss Problem',
      description: 'A shopkeeper bought 10 pens for ₹100 and sold them at 3 pens for ₹40. Find his profit or loss percentage.',
      startCode: '# Calculate profit/loss %\ncp_per_pen = 100/10\nsp_per_pen = 40/3\n# Your code here\n',
      solution: 'cp = 100/10  # ₹10 per pen\nsp = 40/3  # ~₹13.33 per pen\nprofit_pct = ((sp-cp)/cp)*100\nprint(f"Profit%: {profit_pct:.2f}%")',
      hint: 'Find CP per pen and SP per pen, then calculate % change.',
    },
  },

  // ── INTERMEDIATE ────────────────────────────────────────────────────────────
  {
    id: 'apt-time-work',
    category: 'Intermediate — Work Problems',
    title: 'Time & Work',
    difficulty: 'Intermediate',
    theory: [
      'If A can do a work in n days, A\'s 1-day work = 1/n. If A and B together complete work in n days, their combined 1-day work = 1/n.',
      'If A can do work in a days and B in b days: Together they finish in ab/(a+b) days.',
      'Efficiency method: Assume total work = LCM of all given days. Each person\'s daily work in units.',
      'If A is twice as efficient as B, and B takes 12 days, then A takes 6 days.',
      'Pipes and Cisterns: Filling pipe is positive work (+1/n per hour). Emptying pipe (leak) is negative (-1/n per hour).',
    ],
    code: `# Time and Work

def days_together(a_days, b_days):
    """Days A and B take working together"""
    return (a_days * b_days) / (a_days + b_days)

def work_rate(days):
    """Fraction of work per day"""
    return 1 / days

# A does in 12 days, B does in 18 days
a, b = 12, 18
together = days_together(a, b)
print(f"Together: {together:.2f} days")

# Efficiency method: LCM = 36
work = 36
a_rate = work // a  # 3 units/day
b_rate = work // b  # 2 units/day
print(f"A's rate: {a_rate} units/day, B's rate: {b_rate} units/day")
print(f"Together: {work/(a_rate+b_rate):.2f} days")`,
    output: `Together: 7.20 days
A's rate: 3 units/day, B's rate: 2 units/day
Together: 7.20 days`,
    notes: ['LCM method is fastest for multi-person problems', 'A+B together then A leaves: calculate separately', 'Pipes: +fill, -drain; net rate = sum of all'],
    practice: {
      title: 'Time and Work',
      description: 'A can do a job in 10 days, B in 15 days. They work together for 4 days. Then A leaves. How many more days does B need to finish?',
      startCode: '# Time and Work problem\nA_days, B_days = 10, 15\ndays_together = 4\n# Your code here\n',
      solution: 'A, B = 10, 15\ntogether = 4\nwork_done = together*(1/A + 1/B)\nremaining = 1 - work_done\ndays_B = remaining * B\nprint(f"B needs {days_B:.0f} more days")',
      hint: 'Work done by both in 4 days = 4×(1/A + 1/B). Remaining work B completes alone.',
    },
  },

  {
    id: 'apt-speed-distance',
    category: 'Intermediate — Work Problems',
    title: 'Speed, Distance & Time',
    difficulty: 'Intermediate',
    theory: [
      'Speed = Distance / Time. Distance = Speed × Time. Time = Distance / Speed.',
      'Average Speed (different distances): Total distance / Total time. NOT average of speeds.',
      'Average Speed (same distances at speeds u and v) = 2uv/(u+v).',
      'Relative Speed: When two bodies move in the SAME direction: relative speed = |s1 - s2|. In OPPOSITE directions: relative speed = s1 + s2.',
      'Trains: Time to cross a pole/point = Length of train / Speed. Time to cross platform = (Length of train + Length of platform) / Speed.',
      'Convert km/h to m/s: multiply by 5/18. Convert m/s to km/h: multiply by 18/5.',
    ],
    code: `# Speed, Distance, Time

def time_to_meet(d, s1, s2, same_direction=False):
    """Time for two objects to meet"""
    if same_direction:
        rel_speed = abs(s1 - s2)
    else:
        rel_speed = s1 + s2
    return d / rel_speed if rel_speed else float('inf')

def train_crossing(train_len, platform_len, speed_kmh):
    """Time for train to cross a platform"""
    speed_ms = speed_kmh * 5/18  # convert to m/s
    total = train_len + platform_len
    return total / speed_ms

print("Train crossing platform:", round(train_crossing(200, 100, 72), 1), "seconds")

# Average speed for same distance
u, v = 40, 60  # km/h
avg = 2*u*v/(u+v)
print(f"Average speed for equal distances: {avg} km/h")`,
    output: `Train crossing platform: 15.0 seconds
Average speed for equal distances: 48.0 km/h`,
    notes: ['km/h × 5/18 = m/s', 'For equal distances: average speed = 2uv/(u+v)', 'Trains crossing each other: use sum of lengths'],
    practice: {
      title: 'Speed and Distance',
      description: 'Two trains of 150m and 100m run at 60km/h and 40km/h respectively. How long to cross each other when going in opposite directions?',
      startCode: '# Two trains crossing each other (opposite directions)\ntrain1, train2 = 150, 100\nspeed1, speed2 = 60, 40\n# Your code here\n',
      solution: 'total_length = 150+100\nrel_speed_ms = (60+40)*5/18\ntime = total_length/rel_speed_ms\nprint(f"{time:.1f} seconds")',
      hint: 'Opposite directions: relative speed = sum. Convert km/h to m/s using ×5/18.',
    },
  },

  {
    id: 'apt-time-distance-train',
    category: 'Intermediate — Work Problems',
    title: 'Trains & Boats',
    difficulty: 'Intermediate',
    theory: [
      'Boats and Streams: Downstream speed = Boat speed + Stream speed (u+v). Upstream speed = Boat speed - Stream speed (u-v).',
      'Boat speed = (Downstream + Upstream)/2. Stream speed = (Downstream - Upstream)/2.',
      'Time downstream = Distance/(u+v). Time upstream = Distance/(u-v).',
      'A person can row at u km/h in still water. Stream flows at v km/h. Going and returning: total time = 2d(u)/(u²-v²).',
    ],
    code: `# Boats and Streams

def boat_stream(d, boat_speed, stream_speed):
    ds = boat_speed + stream_speed  # downstream
    us = boat_speed - stream_speed  # upstream
    t_down = d / ds
    t_up = d / us
    return ds, us, t_down, t_up

boat, stream, dist = 15, 5, 60  # km/h, km/h, km

ds, us, td, tu = boat_stream(dist, boat, stream)
print(f"Downstream speed: {ds} km/h")
print(f"Upstream speed: {us} km/h")
print(f"Time downstream: {td} hrs")
print(f"Time upstream: {tu} hrs")
print(f"Total time (both ways): {td+tu:.2f} hrs")`,
    output: `Downstream speed: 20 km/h
Upstream speed: 10 km/h
Time downstream: 3.0 hrs
Time upstream: 6.0 hrs
Total time (both ways): 9.00 hrs`,
    notes: ['Boat speed = (DS + US)/2', 'Stream speed = (DS - US)/2', 'Downstream is always faster than upstream'],
    practice: {
      title: 'Boats and Streams',
      description: 'A boat travels 40 km downstream in 2 hours and returns upstream in 4 hours. Find the boat\'s speed in still water and the stream speed.',
      startCode: '# Find boat speed and stream speed\ndistance = 40\ntime_down, time_up = 2, 4\n# Your code here\n',
      solution: 'ds = 40/2  # 20 km/h\nus = 40/4  # 10 km/h\nboat = (ds+us)/2  # 15\nstream = (ds-us)/2  # 5\nprint(f"Boat: {boat} km/h, Stream: {stream} km/h")',
      hint: 'Downstream speed = 40/2. Upstream speed = 40/4. Then use formulas.',
    },
  },

  {
    id: 'apt-permutation-combination',
    category: 'Intermediate — Counting',
    title: 'Permutation & Combination',
    difficulty: 'Intermediate',
    theory: [
      'Permutation: Arrangement of items where ORDER MATTERS. P(n,r) = n!/(n-r)!. Example: 3 books in 3 positions = 3! = 6 ways.',
      'Combination: Selection of items where ORDER DOES NOT MATTER. C(n,r) = n!/(r!(n-r)!). Example: Choose 3 from 5 = C(5,3) = 10.',
      'Factorial: n! = n × (n-1) × (n-2) × ... × 1. 0! = 1.',
      'Key formulas: C(n,r) = C(n, n-r). P(n,r) = C(n,r) × r!.',
    ],
    code: `from math import factorial, comb, perm

# Permutation P(n,r) = n!/(n-r)!
def P(n, r):
    return factorial(n) // factorial(n-r)

# Combination C(n,r) = n!/(r!(n-r)!)
def C(n, r):
    return factorial(n) // (factorial(r) * factorial(n-r))

print("P(5,3):", P(5, 3))  # 60
print("C(5,3):", C(5, 3))  # 10

# Using Python built-ins
print("Using perm:", perm(5, 3))
print("Using comb:", comb(5, 3))

# Choosing 2 from 4 for a team
print("Ways to choose 2 from 4:", comb(4, 2))
# Arranging 4 people in 4 chairs
print("Ways to arrange 4 people:", factorial(4))`,
    output: `P(5,3): 60
C(5,3): 10
Using perm: 60
Using comb: 10
Ways to choose 2 from 4: 6
Ways to arrange 4 people: 24`,
    notes: ['Use P when order matters (like ranking)', 'Use C when order does NOT matter (like teams)', 'C(n,r) = C(n,n-r)'],
    practice: {
      title: 'Permutations and Combinations',
      description: 'From a group of 6 boys and 4 girls, a team of 5 is to be formed. In how many ways can the team have 3 boys and 2 girls?',
      startCode: '# Team of 5 with 3 boys and 2 girls\nfrom math import comb\nboys, girls = 6, 4\n# Your code here\n',
      solution: 'from math import comb\nways = comb(6,3) * comb(4,2)\nprint(f"Ways: {ways}")  # 120',
      hint: 'Choose 3 from 6 boys AND 2 from 4 girls. Multiply the combinations.',
    },
  },

  {
    id: 'apt-probability',
    category: 'Intermediate — Counting',
    title: 'Probability',
    difficulty: 'Intermediate',
    theory: [
      'Probability of event E: P(E) = Number of favourable outcomes / Total number of outcomes. P(E) is always between 0 and 1.',
      'P(not E) = 1 - P(E). P(A or B) = P(A) + P(B) - P(A and B). For mutually exclusive events: P(A or B) = P(A) + P(B).',
      'Independent events: P(A and B) = P(A) × P(B). P(B|A) = P(A and B)/P(A) for conditional probability.',
      'A coin: P(Head) = 1/2. A die: P(any number) = 1/6. A deck of 52 cards: 4 suits (13 each), face cards = 12.',
    ],
    code: `import random

# Theoretical probability
def prob(favourable, total):
    return favourable / total

# Dice probability
print("P(6 on die):", prob(1, 6))
print("P(even on die):", prob(3, 6))
print("P(>4 on die):", prob(2, 6))

# Card probability
print("P(Ace from deck):", prob(4, 52))
print("P(Red card):", prob(26, 52))
print("P(Face card):", prob(12, 52))

# Two events - coin tosses
p_head = 0.5
print("P(2 heads from 2 coins):", p_head ** 2)
print("P(at least 1 head):", 1 - (0.5**2))`,
    output: `P(6 on die): 0.1667
P(even on die): 0.5
P(>4 on die): 0.3333
P(Ace from deck): 0.0769
P(Red card): 0.5
P(Face card): 0.2308
P(2 heads from 2 coins): 0.25
P(at least 1 head): 0.75`,
    notes: ['P(E) + P(not E) = 1', 'Independent events: multiply probabilities', 'At least 1: use complement (1 - P(none))'],
    practice: {
      title: 'Probability Problem',
      description: 'A bag contains 5 red, 3 blue, and 2 green balls. What is the probability of drawing a red ball? What is the probability of NOT drawing a green ball?',
      startCode: '# Probability problems\ntotal = 5 + 3 + 2\n# Your code here\n',
      solution: 'total = 10\np_red = 5/total\np_not_green = 1 - 2/total\nprint(f"P(red): {p_red}")\nprint(f"P(not green): {p_not_green}")',
      hint: 'P(not green) = 1 - P(green) = 1 - 2/10.',
    },
  },

  {
    id: 'apt-algebra-basics',
    category: 'Intermediate — Algebra',
    title: 'Algebraic Expressions',
    difficulty: 'Intermediate',
    theory: [
      'Algebraic expression: combination of variables, constants, and operations. Example: 3x² + 2x - 5.',
      'Key identities: (a+b)² = a²+2ab+b². (a-b)² = a²-2ab+b². (a+b)(a-b) = a²-b². (a+b)³ = a³+3a²b+3ab²+b³.',
      'Factoring: x²+5x+6 = (x+2)(x+3). Take out common factor first. Group method for 4 terms.',
      'Linear equations: ax+b = c → x = (c-b)/a. Simultaneous equations solved by substitution or elimination.',
    ],
    code: `# Algebraic identities
a, b = 5, 3

print("(a+b)² =", (a+b)**2, "= a²+2ab+b² =", a**2 + 2*a*b + b**2)
print("(a-b)² =", (a-b)**2, "= a²-2ab+b² =", a**2 - 2*a*b + b**2)
print("(a+b)(a-b) =", (a+b)*(a-b), "= a²-b² =", a**2 - b**2)

# Solve simultaneous equations: 2x+3y=12, x-y=1
# x = 1+y, substitute: 2(1+y)+3y=12 → 5y=10 → y=2, x=3
from numpy import linalg
import numpy as np
A = np.array([[2,3],[1,-1]])
b_vec = np.array([12,1])
x, y = linalg.solve(A, b_vec)
print(f"Simultaneous: x={x:.0f}, y={y:.0f}")`,
    output: `(a+b)² = 64 = a²+2ab+b² = 64
(a-b)² = 4 = a²-2ab+b² = 4
(a+b)(a-b) = 16 = a²-b² = 16
Simultaneous: x=3, y=2`,
    notes: ['Memorize the 3 key identities', 'Always check answer by substituting back', '(a+b)² ≠ a² + b² (common mistake!)'],
    practice: {
      title: 'Algebra Problem',
      description: 'If x+y = 10 and xy = 21, find x² + y². Also find the values of x and y.',
      startCode: '# Given: x+y=10, xy=21\n# Find x^2 + y^2\nx_plus_y = 10\nxy = 21\n# Hint: (x+y)² = x² + 2xy + y²\n',
      solution: 'xpy = 10\nxy = 21\nx2_y2 = xpy**2 - 2*xy\nprint("x²+y² =", x2_y2)  # 58\n# Quadratic: t² - 10t + 21 = 0 → (t-3)(t-7)\nprint("x=3, y=7 or x=7, y=3")',
      hint: 'x² + y² = (x+y)² - 2xy. Then solve quadratic to find x and y.',
    },
  },

  // ── ADVANCED ────────────────────────────────────────────────────────────────
  {
    id: 'apt-data-interpretation',
    category: 'Advanced — Data',
    title: 'Data Interpretation — Tables',
    difficulty: 'Advanced',
    theory: [
      'Data Interpretation (DI) questions test your ability to read, analyze, and draw conclusions from data presented in tables, graphs, or charts.',
      'For table DI: Read column and row headers carefully. Identify what each cell represents. Calculate required values step by step.',
      'Common calculations in DI: % change, ratio comparison, average of a row/column, finding maximum/minimum.',
      'Time management tip: DI questions have multiple sub-questions from the same data set — read the table once, answer all.',
    ],
    code: `import pandas as pd

# Sample DI table: Sales data (in ₹ lakhs)
data = {
    'Q1': [120, 150, 100, 200],
    'Q2': [130, 160, 110, 220],
    'Q3': [140, 155, 90,  210],
    'Q4': [160, 180, 120, 250],
}
df = pd.DataFrame(data, index=['ProductA','ProductB','ProductC','ProductD'])
print(df)

# Total annual sales
print("\\nAnnual Sales:")
print(df.sum(axis=1))

# % change Q1 to Q4 for each product
pct_change = ((df['Q4'] - df['Q1']) / df['Q1']) * 100
print("\\n% Growth Q1 to Q4:")
print(pct_change.round(2))`,
    output: `         Q1   Q2   Q3   Q4
ProductA  120  130  140  160
ProductB  150  160  155  180
ProductC  100  110   90  120
ProductD  200  220  210  250

Annual Sales:
ProductA    550
ProductB    645
ProductC    420
ProductD    880

% Growth Q1 to Q4:
ProductA    33.33
ProductB    20.00
ProductC    20.00
ProductD    25.00`,
    notes: ['Read question carefully — some ask for ratio, others %, others absolute values', 'Estimate when options are far apart', 'Practice mental math for speed'],
    practice: {
      title: 'Data Interpretation',
      description: 'From a table: A store sold 240 units in Jan, 300 in Feb, 270 in Mar, 330 in Apr. Find the average monthly sales and the % increase from Jan to Apr.',
      startCode: '# Data interpretation\nsales = [240, 300, 270, 330]\n# Find average and % increase Jan to Apr\n',
      solution: 'sales = [240, 300, 270, 330]\navg = sum(sales)/len(sales)\npct = (sales[-1]-sales[0])/sales[0]*100\nprint(f"Average: {avg}")\nprint(f"% increase: {pct:.2f}%")',
      hint: 'Average = sum/4. % increase = (330-240)/240 × 100.',
    },
  },

  {
    id: 'apt-logical-reasoning',
    category: 'Advanced — Reasoning',
    title: 'Logical Reasoning — Syllogisms',
    difficulty: 'Advanced',
    theory: [
      'Syllogism: Drawing conclusions from given statements. Always treat statements as 100% true.',
      'Types of statements: All A are B (Universal Positive). No A is B (Universal Negative). Some A are B (Particular Positive). Some A are not B (Particular Negative).',
      'Venn Diagram approach: Draw circles for each group, overlap based on the statement.',
      'Conversion rules: "All A are B" → "Some B are A" is valid. "No A is B" → "No B is A" is valid. "Some A are B" → "Some B are A" is valid.',
      'If conclusion is definite it follows. If it is "possible" it follows when direct conclusion does not.',
    ],
    code: `# Syllogism logic checker (simplified)

def check_all_are(statements, conclusion):
    """
    Simplified syllogism checker using set logic
    All A are B = A is subset of B
    """
    print("Statements:", statements)
    print("Conclusion to check:", conclusion)
    print("---")
    print("Rules:")
    print("1. All A are B: A ⊆ B (A is subset of B)")
    print("2. No A is B: A ∩ B = empty")
    print("3. Some A are B: A ∩ B ≠ empty")
    print("4. Conclusion must follow DEFINITELY from statements")

# Example
print("Statement 1: All cats are animals")
print("Statement 2: All animals are living things")
print("Conclusion: All cats are living things")
print("\\nAnswer: TRUE (follows from chain All→All)")
print()
print("Statement 1: Some students are smart")
print("Statement 2: All smart people succeed")
print("Conclusion: All students succeed")
print("Answer: FALSE (Some ≠ All)")`,
    output: `Statement 1: All cats are animals
Statement 2: All animals are living things
Conclusion: All cats are living things

Answer: TRUE (follows from chain All→All)

Statement 1: Some students are smart
Statement 2: All smart people succeed
Conclusion: All students succeed
Answer: FALSE (Some ≠ All)`,
    notes: ['All → All = All conclusion valid', 'Some + All → Some conclusion valid', 'Treat statements as true even if unrealistic'],
    practice: {
      title: 'Syllogism Practice',
      description: 'Statements: 1) All pens are books. 2) All books are bags. Conclusions: I) All pens are bags. II) Some bags are pens. Which conclusions follow?',
      startCode: '# Analyze syllogism\n# Statement 1: All pens are books (pens ⊆ books)\n# Statement 2: All books are bags (books ⊆ bags)\n# Draw it out and check conclusions\n',
      solution: '# All pens are books → All books are bags\n# Therefore: All pens are bags (Conclusion I: TRUE)\n# If all pens are bags, then Some bags are pens (Conclusion II: TRUE)\nprint("Both conclusions I and II follow")',
      hint: 'If All A are B and All B are C, then All A are C. And the reverse partial also holds.',
    },
  },

  {
    id: 'apt-series-patterns',
    category: 'Advanced — Reasoning',
    title: 'Number Series & Patterns',
    difficulty: 'Advanced',
    theory: [
      'Arithmetic Series (AP): Common difference is constant. n-th term = a + (n-1)d. Sum = n/2 × (2a + (n-1)d).',
      'Geometric Series (GP): Common ratio is constant. n-th term = a × r^(n-1). Sum = a(r^n - 1)/(r-1).',
      'Difference series: Find differences between terms, then look for pattern in differences.',
      'Square/Cube series: 1,4,9,16... or 1,8,27,64... Check if terms are perfect squares/cubes.',
      'Mixed series: May combine addition with multiplication, or alternate two rules.',
    ],
    code: `# Number Series Analysis

def find_pattern(series):
    diffs = [series[i+1]-series[i] for i in range(len(series)-1)]
    print(f"Series: {series}")
    print(f"Differences: {diffs}")

    # Check AP
    if len(set(diffs)) == 1:
        d = diffs[0]
        next_val = series[-1] + d
        print(f"AP with d={d}. Next: {next_val}")
        return next_val

    # Check GP
    if all(series[i] != 0 for i in range(len(series))):
        ratios = [series[i+1]/series[i] for i in range(len(series)-1)]
        if len(set(round(r,2) for r in ratios)) == 1:
            r = ratios[0]
            next_val = series[-1] * r
            print(f"GP with r={r}. Next: {next_val}")
            return next_val

    print("Complex pattern — look at difference of differences")
    return None

find_pattern([2, 5, 8, 11, 14])    # AP
find_pattern([3, 6, 12, 24, 48])   # GP`,
    output: `Series: [2, 5, 8, 11, 14]
Differences: [3, 3, 3, 3]
AP with d=3. Next: 17

Series: [3, 6, 12, 24, 48]
Differences: [3, 6, 12, 24]
GP with r=2.0. Next: 96.0`,
    notes: ['Always find 1st, 2nd, 3rd differences', 'If 2nd differences are equal → quadratic series', 'Check squares/cubes first for visual series'],
    practice: {
      title: 'Find the Next Term',
      description: 'Find the next term in these series: 1) 1, 4, 9, 16, 25, ___ 2) 2, 6, 12, 20, 30, ___',
      startCode: '# Find next terms\nseries1 = [1, 4, 9, 16, 25]\nseries2 = [2, 6, 12, 20, 30]\n# Analyze and find next\n',
      solution: '# Series1: perfect squares → 6² = 36\n# Series2: n(n+1) → 5×6=30, 6×7=42\nprint("Series1 next:", 6**2)   # 36\nprint("Series2 next:", 6*7)    # 42',
      hint: 'Series1: 1²,2²,3²... Series2: 1×2, 2×3, 3×4, 4×5, 5×6...',
    },
  },

  {
    id: 'apt-coding-decoding',
    category: 'Advanced — Reasoning',
    title: 'Coding & Decoding',
    difficulty: 'Advanced',
    theory: [
      'Coding-Decoding tests your ability to find the pattern used to encode words or numbers.',
      'Letter Position: A=1, B=2, ..., Z=26. Or reverse: A=26, Z=1.',
      'Shift coding: Each letter shifted by n positions. APPLE→BQQMF (shifted +1). Caesar cipher.',
      'Mirror image coding: A↔Z, B↔Y, C↔X... (opposite letters).',
      'Number coding: Replace each letter with its position number. CAT = 3-1-20.',
    ],
    code: `# Coding and Decoding

def caesar_cipher(text, shift):
    result = ""
    for char in text.upper():
        if char.isalpha():
            code = ord(char) - ord('A')
            shifted = (code + shift) % 26
            result += chr(shifted + ord('A'))
        else:
            result += char
    return result

def letter_to_number(word):
    return '-'.join(str(ord(c)-ord('A')+1) for c in word.upper())

def mirror_code(word):
    mirror = {chr(ord('A')+i): chr(ord('Z')-i) for i in range(26)}
    return ''.join(mirror.get(c, c) for c in word.upper())

print("Caesar +3:", caesar_cipher("APPLE", 3))
print("Reverse:", caesar_cipher("DSSOH", -3))
print("Number code of CAT:", letter_to_number("CAT"))
print("Mirror of APPLE:", mirror_code("APPLE"))`,
    output: `Caesar +3: DSSOH
Reverse: APPLE
Number code of CAT: 3-1-20
Mirror of APPLE: ZKKOV`,
    notes: ['A=1 to Z=26 is most common', 'Always look for a pattern by testing with known examples', 'Reverse alphabet: A=26, B=25...Z=1'],
    practice: {
      title: 'Decode the Pattern',
      description: 'If APPLE = 1-16-16-12-5, what is the code for MANGO? (Each letter = its position A=1, B=2...)',
      startCode: '# Decode: letter position system\n# A=1, B=2, ... Z=26\ndef encode(word):\n    # Your code here\n    pass\n\nprint(encode("MANGO"))\n',
      solution: 'def encode(word):\n    return "-".join(str(ord(c)-ord("A")+1) for c in word.upper())\nprint(encode("MANGO"))  # 13-1-14-7-15',
      hint: 'ord("A") = 65. Position = ord(letter) - 64.',
    },
  },

  {
    id: 'apt-mixtures-alligation',
    category: 'Advanced — Math',
    title: 'Mixtures & Alligation',
    difficulty: 'Advanced',
    theory: [
      'Alligation Rule: Used to find the ratio in which two ingredients must be mixed to get a mixture at a desired price or concentration.',
      'Rule: (Dearer - Mean) : (Mean - Cheaper) = Quantity of Cheaper : Quantity of Dearer.',
      'Replacement formula: If from a vessel containing x litres of liquid, y litres are replaced with water repeatedly n times: Final concentration = x × (1 - y/x)^n.',
      'Mixing two solutions: If a% solution and b% solution are mixed in ratio m:n, resulting concentration = (am + bn)/(m+n).',
    ],
    code: `# Mixtures and Alligation

def alligation(cheaper, dearer, mean):
    """Find ratio in which to mix"""
    ratio_cheaper = dearer - mean
    ratio_dearer = mean - cheaper
    print(f"Mix cheaper({cheaper}) : dearer({dearer}) = {ratio_cheaper}:{ratio_dearer}")
    return ratio_cheaper, ratio_dearer

def replacement_formula(volume, replaced, times):
    """Concentration after replacing 'replaced' litres n times"""
    concentration = volume * (1 - replaced/volume)**times
    pct = (concentration/volume) * 100
    return round(pct, 2)

alligation(cheaper=40, dearer=60, mean=50)  # milk prices
alligation(cheaper=0, dearer=100, mean=40)  # mixing water and pure liquid

pct = replacement_formula(40, 10, 3)  # 40L vessel, replace 10L three times
print(f"Milk concentration after 3 replacements: {pct}%")`,
    output: `Mix cheaper(40) : dearer(60) = 10:10
Mix cheaper(0) : dearer(100) = 60:40
Milk concentration after 3 replacements: 42.19%`,
    notes: ['Alligation = find the ratio of mixing', 'Replacement formula uses (1 - y/x)^n', 'Mean must be between cheaper and dearer'],
    practice: {
      title: 'Mixture Problem',
      description: 'A vessel has 30 litres of milk. 6 litres are replaced with water, then again 6 litres of mixture are replaced with water. What % of milk remains?',
      startCode: '# Replacement formula\nvolume = 30\nreplaced = 6\ntimes = 2\n# Final milk percentage?\n',
      solution: 'volume, replaced, times = 30, 6, 2\nmilk = volume * (1 - replaced/volume)**times\npct = (milk/volume)*100\nprint(f"Milk: {pct:.2f}%")',
      hint: 'After each replacement: milk = milk × (1 - 6/30). Repeat twice.',
    },
  },

  {
    id: 'apt-clocks-calendars',
    category: 'Advanced — Reasoning',
    title: 'Clocks & Calendars',
    difficulty: 'Advanced',
    theory: [
      'Clock Problems: Minute hand moves 360° in 60 minutes = 6°/min. Hour hand moves 360° in 12 hours = 0.5°/min.',
      'Angle between hands at h hours m minutes: |30h - 11m/2|. If > 180°, take 360° - result.',
      'Hands coincide every 65.45 minutes (not 60). In 12 hours, hands overlap 11 times.',
      'Calendar: Odd days concept — January has 31 days = 3 odd days (31 mod 7 = 3). Days of week repeat every 7 days.',
      'Leap year: Divisible by 4. Century year: must be divisible by 400. 2000 is leap; 1900 is not.',
    ],
    code: `# Clocks and Calendars

def clock_angle(h, m):
    """Angle between clock hands at h:m"""
    hour_angle = 0.5 * (60*h + m)   # 0.5 degrees per minute
    minute_angle = 6 * m             # 6 degrees per minute
    angle = abs(hour_angle - minute_angle)
    if angle > 180:
        angle = 360 - angle
    return angle

def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

print("Angle at 3:00:", clock_angle(3, 0))    # 90°
print("Angle at 6:00:", clock_angle(6, 0))    # 180°
print("Angle at 3:30:", clock_angle(3, 30))   # 75°

print("Is 2024 leap?", is_leap_year(2024))    # True
print("Is 1900 leap?", is_leap_year(1900))    # False
print("Is 2000 leap?", is_leap_year(2000))    # True`,
    output: `Angle at 3:00: 90.0
Angle at 6:00: 180.0
Angle at 3:30: 75.0
Is 2024 leap? True
Is 1900 leap? False
Is 2000 leap? True`,
    notes: ['Hands meet every 720/11 ≈ 65.45 minutes', 'Century year leap: only if divisible by 400', 'Angle formula: |30H - 11M/2|'],
    practice: {
      title: 'Clock Angle',
      description: 'Find the angle between the hands of a clock at 4:40. Is it acute, right, obtuse, or reflex?',
      startCode: '# Find angle at 4:40\nh, m = 4, 40\n# angle = |30h - 11m/2|\n',
      solution: 'h, m = 4, 40\nangle = abs(30*h - 11*m/2)\nif angle > 180:\n    angle = 360 - angle\nprint(f"Angle: {angle}°")  # 100° (obtuse)',
      hint: 'Use |30h - 5.5m| formula. Answer is 100° which is obtuse.',
    },
  },

  {
    id: 'apt-age-problems',
    category: 'Basic — Numbers',
    title: 'Age Problems',
    difficulty: 'Beginner',
    theory: [
      'Age problems require setting up linear equations with variables for present age.',
      'Key phrases: "n years ago" means subtract n. "n years hence/later" means add n.',
      'If A\'s age is x, then 5 years ago it was x-5, and 5 years later it will be x+5.',
      'Ratio of ages: If A:B = 2:3 now, and after 5 years A:B = 3:4, set up equations and solve.',
    ],
    code: `# Age Problems

# Example: Father is 3 times as old as son.
# 5 years later, father will be 2.5 times as old.
# Find present ages.

# Let son's age = x, father's age = 3x
# After 5 years: 3x+5 = 2.5*(x+5)
# 3x+5 = 2.5x+12.5
# 0.5x = 7.5 → x = 15

from sympy import symbols, Eq, solve

x = symbols('x')
son = x
father = 3 * x

# After 5 years: father = 2.5 * son
eq = Eq(father + 5, 2.5 * (son + 5))
sol = solve(eq, x)
print(f"Son's age: {sol[0]} years")
print(f"Father's age: {3*sol[0]} years")

# Verify
s, f = sol[0], 3*sol[0]
print(f"After 5 yrs: father={f+5}, son={s+5}, ratio={float(f+5)/float(s+5)}")`,
    output: `Son's age: 15 years
Father's age: 45 years
After 5 yrs: father=50, son=20, ratio=2.5`,
    notes: ['Present age = x, past = x-n, future = x+n', 'Always set up 2 equations for 2 unknowns', 'Verify your answer by substituting back'],
    practice: {
      title: 'Age Problem',
      description: 'The ratio of ages of A and B is 4:5. After 10 years, the ratio becomes 6:7. Find their present ages.',
      startCode: '# Let A = 4x, B = 5x\n# After 10 years: (4x+10)/(5x+10) = 6/7\n# Solve for x\n',
      solution: 'from sympy import symbols, Eq, solve\nx = symbols("x")\neq = Eq((4*x+10)/(5*x+10), 6/7)\nprint(solve(eq))  # [20]\nprint("A=80, B=100")',
      hint: 'Cross multiply: 7(4x+10) = 6(5x+10). Solve for x.',
    },
  },

  {
    id: 'apt-mensuration-2d',
    category: 'Intermediate — Geometry',
    title: 'Mensuration — 2D Shapes',
    difficulty: 'Intermediate',
    theory: [
      'Rectangle: Area = l×b, Perimeter = 2(l+b), Diagonal = √(l²+b²).',
      'Square: Area = s², Perimeter = 4s, Diagonal = s√2.',
      'Circle: Area = πr², Circumference = 2πr. Semicircle area = πr²/2.',
      'Triangle: Area = ½×base×height. Heron\'s formula = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2.',
      'Trapezoid: Area = ½×(sum of parallel sides)×height. Rhombus: Area = ½×d1×d2.',
    ],
    code: `import math

def rect(l, b):
    return {"area": l*b, "perim": 2*(l+b), "diag": (l**2+b**2)**0.5}

def circle(r):
    return {"area": math.pi*r**2, "circumf": 2*math.pi*r}

def triangle_heron(a, b, c):
    s = (a+b+c)/2
    area = math.sqrt(s*(s-a)*(s-b)*(s-c))
    return area

print("Rectangle 6×4:", rect(6,4))
r = circle(7)
print(f"Circle r=7: area={r['area']:.2f}, circumference={r['circumf']:.2f}")
print(f"Triangle 5,6,7: area={triangle_heron(5,6,7):.2f}")`,
    output: `Rectangle 6×4: {'area': 24, 'perim': 20, 'diag': 7.211102550927978}
Circle r=7: area=153.94, circumference=43.98
Triangle 5,6,7: area=14.70`,
    notes: ['π ≈ 22/7 or 3.14159', 'Area always in square units', 'Diagonal of square = side × √2'],
    practice: {
      title: '2D Mensuration',
      description: 'A rectangular field is 80m long and 60m wide. Find its area, perimeter, and the length of the diagonal.',
      startCode: 'l, b = 80, 60\n# Find area, perimeter, diagonal\nimport math\n',
      solution: 'l, b = 80, 60\nprint("Area:", l*b)\nprint("Perimeter:", 2*(l+b))\nprint("Diagonal:", math.sqrt(l**2+b**2))',
      hint: 'Area = l×b, Perimeter = 2(l+b), Diagonal = √(l²+b²).',
    },
  },

  {
    id: 'apt-mensuration-3d',
    category: 'Intermediate — Geometry',
    title: 'Mensuration — 3D Shapes',
    difficulty: 'Intermediate',
    theory: [
      'Cube: Volume = a³, Surface Area = 6a², Diagonal = a√3.',
      'Cuboid: Volume = l×b×h, Surface Area = 2(lb+bh+hl), Diagonal = √(l²+b²+h²).',
      'Sphere: Volume = (4/3)πr³, Surface Area = 4πr².',
      'Cylinder: Volume = πr²h, Curved Surface Area = 2πrh, Total SA = 2πr(r+h).',
      'Cone: Volume = (1/3)πr²h, Slant height l = √(r²+h²), CSA = πrl, Total SA = πr(r+l).',
    ],
    code: `import math

pi = math.pi

def cylinder(r, h):
    vol = pi * r**2 * h
    csa = 2*pi*r*h
    tsa = 2*pi*r*(r+h)
    return {"volume": round(vol,2), "CSA": round(csa,2), "TSA": round(tsa,2)}

def cone(r, h):
    l = math.sqrt(r**2 + h**2)
    vol = (1/3)*pi*r**2*h
    csa = pi*r*l
    tsa = pi*r*(r+l)
    return {"volume": round(vol,2), "slant": round(l,2), "CSA": round(csa,2)}

def sphere(r):
    vol = (4/3)*pi*r**3
    sa = 4*pi*r**2
    return {"volume": round(vol,2), "SA": round(sa,2)}

print("Cylinder r=7, h=10:", cylinder(7, 10))
print("Cone r=3, h=4:", cone(3, 4))
print("Sphere r=6:", sphere(6))`,
    output: `Cylinder r=7, h=10: {'volume': 1539.38, 'CSA': 439.82, 'TSA': 747.7}
Cone r=3, h=4: {'volume': 37.7, 'slant': 5.0, 'CSA': 47.12}
Sphere r=6: {'volume': 904.78, 'SA': 452.39}`,
    notes: ['Slant height of cone: l = √(r²+h²)', '(1/3) for cone and pyramid volumes', 'Sphere SA = 4πr² (4 circles worth)'],
    practice: {
      title: '3D Mensuration',
      description: 'A cylindrical tank has radius 3.5m and height 10m. Find its volume and the cost to paint its curved surface at ₹5/m².',
      startCode: 'import math\nr, h = 3.5, 10\n# Find volume and cost to paint CSA\n',
      solution: 'import math\nr, h = 3.5, 10\nvol = math.pi*r**2*h\ncsa = 2*math.pi*r*h\ncost = csa*5\nprint(f"Volume: {vol:.2f} m³")\nprint(f"Cost: ₹{cost:.2f}")',
      hint: 'Volume = πr²h. CSA = 2πrh. Cost = CSA × rate.',
    },
  },

  {
    id: 'apt-trigonometry-basics',
    category: 'Intermediate — Geometry',
    title: 'Trigonometry Basics',
    difficulty: 'Intermediate',
    theory: [
      'For a right triangle: sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, tan θ = Opposite/Adjacent.',
      'SOHCAHTOA: Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj. Reciprocals: cosec=1/sin, sec=1/cos, cot=1/tan.',
      'Standard values: sin 0°=0, sin 30°=½, sin 45°=1/√2, sin 60°=√3/2, sin 90°=1.',
      'Identity: sin²θ + cos²θ = 1. 1 + tan²θ = sec²θ. 1 + cot²θ = cosec²θ.',
      'Height and Distance: angle of elevation (looking up) and angle of depression (looking down).',
    ],
    code: `import math

# Trig values
angles = [0, 30, 45, 60, 90]
print("Angle  sin      cos      tan")
for a in angles:
    r = math.radians(a)
    s = round(math.sin(r), 4)
    c = round(math.cos(r), 4)
    t = round(math.tan(r), 4) if a != 90 else "∞"
    print(f"  {a}°   {s}     {c}     {t}")

# Height and distance problem
# Tower height = 50m. Angle of elevation = 30°.
# Distance = height / tan(angle)
height = 50
angle_deg = 30
dist = height / math.tan(math.radians(angle_deg))
print(f"\\nDistance from tower: {dist:.2f}m")`,
    output: `Angle  sin      cos      tan
  0°   0.0     1.0     0.0
  30°   0.5     0.866     0.5774
  45°   0.7071     0.7071     1.0
  60°   0.866     0.5     1.7321
  90°   1.0     0.0     ∞

Distance from tower: 86.60m`,
    notes: ['sin 30 = 1/2, cos 60 = 1/2 (same!)', 'sin²+cos²=1 is the most used identity', 'Height of object = distance × tan(angle)'],
    practice: {
      title: 'Height & Distance',
      description: 'From a point 100m away from a building, the angle of elevation of its top is 45°. Find the height of the building.',
      startCode: 'import math\ndistance = 100\nangle = 45  # degrees\n# height = distance × tan(angle)\n',
      solution: 'import math\ndistance = 100\nangle = 45\nheight = distance * math.tan(math.radians(angle))\nprint(f"Height: {height:.0f}m")  # 100m (tan 45 = 1)',
      hint: 'tan(angle) = height/distance → height = distance × tan(angle). tan(45°) = 1.',
    },
  },

  {
    id: 'apt-sets-venn',
    category: 'Intermediate — Algebra',
    title: 'Sets & Venn Diagrams',
    difficulty: 'Intermediate',
    theory: [
      'Set: Collection of well-defined distinct objects. A ∪ B = union (all elements from A or B). A ∩ B = intersection (common elements).',
      'n(A ∪ B) = n(A) + n(B) - n(A ∩ B). For three sets: n(A∪B∪C) = n(A)+n(B)+n(C) - n(A∩B) - n(B∩C) - n(A∩C) + n(A∩B∩C).',
      'A - B = elements in A but not B. A\' (complement) = elements NOT in A.',
      'Venn diagram: Shows relationships between sets using overlapping circles. Use for word problems about surveys.',
    ],
    code: `# Sets and Venn Diagrams

A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

print("A =", A)
print("B =", B)
print("A ∪ B =", A | B)
print("A ∩ B =", A & B)
print("A - B =", A - B)
print("B - A =", B - A)

# Survey problem:
# 50 students: 30 like cricket, 25 like football, 10 like both
n_total = 50
n_cricket = 30
n_football = 25
n_both = 10

n_union = n_cricket + n_football - n_both
n_neither = n_total - n_union

print(f"\\nLike cricket or football: {n_union}")
print(f"Like neither: {n_neither}")
print(f"Only cricket: {n_cricket - n_both}")
print(f"Only football: {n_football - n_both}")`,
    output: `A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}
A ∪ B = {1, 2, 3, 4, 5, 6, 7, 8}
A ∩ B = {4, 5}
A - B = {1, 2, 3}
B - A = {6, 7, 8}

Like cricket or football: 45
Like neither: 5
Only cricket: 20
Only football: 15`,
    notes: ['n(A∪B) = n(A)+n(B)-n(A∩B)', 'Neither = Total - n(A∪B)', 'Only A = n(A) - n(A∩B)'],
    practice: {
      title: 'Sets Word Problem',
      description: 'In a class of 60 students, 35 study Maths, 30 study Science, 15 study both. How many study only Maths, only Science, both, and neither?',
      startCode: 'total = 60\nmath = 35\nscience = 30\nboth = 15\n# Find: only math, only science, neither\n',
      solution: 'total,math,science,both = 60,35,30,15\nonly_math = math-both\nonly_science = science-both\nunion = math+science-both\nneither = total-union\nprint(only_math, only_science, both, neither)',
      hint: 'Only Maths = 35-15=20. Only Science = 30-15=15. Neither = 60-(20+15+15).',
    },
  },

  {
    id: 'apt-sequence-ap-gp',
    category: 'Intermediate — Algebra',
    title: 'Arithmetic & Geometric Progressions',
    difficulty: 'Intermediate',
    theory: [
      'Arithmetic Progression (AP): a, a+d, a+2d, a+3d... n-th term: Tₙ = a+(n-1)d. Sum: Sₙ = n/2 × [2a+(n-1)d] = n/2 × (first+last).',
      'Geometric Progression (GP): a, ar, ar², ar³... n-th term: Tₙ = a×rⁿ⁻¹. Sum: Sₙ = a(rⁿ-1)/(r-1) for r≠1.',
      'For infinite GP with |r|<1: Sum = a/(1-r).',
      'AP mean: middle term = average of all terms. Insert n AMs between a and b: common difference d = (b-a)/(n+1).',
      'GP mean: Geometric mean between a and b = √(ab).',
    ],
    code: `# AP and GP

def ap_nth_term(a, d, n):
    return a + (n-1)*d

def ap_sum(a, d, n):
    return n/2 * (2*a + (n-1)*d)

def gp_nth_term(a, r, n):
    return a * r**(n-1)

def gp_sum(a, r, n):
    if r == 1: return a * n
    return a * (r**n - 1) / (r - 1)

# AP: 2, 5, 8, 11, 14...
a, d = 2, 3
print("AP 10th term:", ap_nth_term(a, d, 10))
print("AP Sum of 10 terms:", ap_sum(a, d, 10))

# GP: 3, 6, 12, 24...
a_g, r = 3, 2
print("GP 6th term:", gp_nth_term(a_g, r, 6))
print("GP Sum of 6 terms:", gp_sum(a_g, r, 6))

# Infinite GP: 1, 1/2, 1/4...
print("Infinite GP sum:", 1/(1-0.5))`,
    output: `AP 10th term: 29
AP Sum of 10 terms: 155.0
GP 6th term: 96
GP Sum of 6 terms: 189.0
Infinite GP sum: 2.0`,
    notes: ['AP: add d each time. GP: multiply r each time.', 'Sum formula: use n/2 × (first + last) for AP', 'Infinite GP: only valid when |r| < 1'],
    practice: {
      title: 'AP and GP Problems',
      description: 'The 3rd term of an AP is 7 and the 7th term is 19. Find the first term and common difference. Also find the sum of first 20 terms.',
      startCode: '# 3rd term = 7, 7th term = 19\n# Tₙ = a + (n-1)d\n# Solve for a and d\n',
      solution: '# T3: a+2d=7, T7: a+6d=19\n# Subtracting: 4d=12 → d=3, a=1\na, d = 1, 3\nn = 20\nS = n/2*(2*a+(n-1)*d)\nprint(f"a={a}, d={d}, S20={S}")',
      hint: 'Write 2 equations: a+2d=7 and a+6d=19. Subtract to find d.',
    },
  },

  {
    id: 'apt-quadratic-equations',
    category: 'Intermediate — Algebra',
    title: 'Quadratic Equations',
    difficulty: 'Intermediate',
    theory: [
      'Quadratic equation: ax²+bx+c=0. Roots: x = [-b ± √(b²-4ac)] / 2a.',
      'Discriminant (D) = b²-4ac: If D>0 → two distinct real roots. D=0 → two equal real roots. D<0 → no real roots.',
      'Sum of roots = -b/a. Product of roots = c/a.',
      'Factoring method: Find two numbers that multiply to ac and add to b. Then factor.',
    ],
    code: `import math

def quadratic_solve(a, b, c):
    D = b**2 - 4*a*c
    if D > 0:
        r1 = (-b + math.sqrt(D)) / (2*a)
        r2 = (-b - math.sqrt(D)) / (2*a)
        return r1, r2, "Two distinct roots"
    elif D == 0:
        r = -b / (2*a)
        return r, r, "Equal roots"
    else:
        return None, None, "No real roots"

# x² - 5x + 6 = 0
r1, r2, msg = quadratic_solve(1, -5, 6)
print(f"x²-5x+6=0: {msg}: x={r1}, x={r2}")

# Sum and product of roots
a, b, c = 1, -5, 6
print(f"Sum of roots = {-b/a}")
print(f"Product of roots = {c/a}")`,
    output: `x²-5x+6=0: Two distinct roots: x=3.0, x=2.0
Sum of roots = 5.0
Product of roots = 6.0`,
    notes: ['Sum = -b/a, Product = c/a', 'D>0: 2 roots, D=0: 1 root, D<0: no real roots', 'Factoring: find factors of c that add to b (when a=1)'],
    practice: {
      title: 'Quadratic Equation',
      description: 'Solve 2x² - 7x + 3 = 0. Also find the sum and product of roots without solving.',
      startCode: 'import math\na, b, c = 2, -7, 3\n# Solve and find sum/product\n',
      solution: 'import math\na,b,c = 2,-7,3\nD = b**2 - 4*a*c\nr1 = (-b+math.sqrt(D))/(2*a)\nr2 = (-b-math.sqrt(D))/(2*a)\nprint(f"Roots: {r1}, {r2}")\nprint(f"Sum: {-b/a}, Product: {c/a}")',
      hint: 'D = (-7)²-4×2×3 = 49-24 = 25. √25=5. Roots = (7±5)/4.',
    },
  },

  {
    id: 'apt-inequalities',
    category: 'Advanced — Algebra',
    title: 'Inequalities',
    difficulty: 'Advanced',
    theory: [
      'Linear inequality: ax + b > c → x > (c-b)/a (if a>0). Flip sign when dividing/multiplying by negative.',
      'Graphing: > or < use open circle on number line. ≥ or ≤ use closed circle.',
      'Quadratic inequality: ax²+bx+c > 0. Find roots first, then test intervals.',
      'System of inequalities: Find the intersection of solution sets.',
      'Absolute value: |x| < a → -a < x < a. |x| > a → x < -a or x > a.',
    ],
    code: `# Inequalities

# Linear: 3x - 7 > 5 → x > 4
def solve_linear_ineq(a, b, c, symbol='>'):
    # ax + b > c
    rhs = (c - b) / a
    if a < 0:  # flip sign
        if symbol == '>': symbol = '<'
        else: symbol = '>'
    return f"x {symbol} {rhs}"

print(solve_linear_ineq(3, -7, 5))   # 3x-7>5 → x>4
print(solve_linear_ineq(-2, 4, 10))  # -2x+4>10 → x<-3

# Quadratic: x² - 5x + 6 > 0
# Roots: x=2, x=3. For positive leading coeff:
# solution is x < 2 or x > 3
x_values = range(-2, 8)
solutions = [x for x in x_values if x**2 - 5*x + 6 > 0]
print(f"x²-5x+6>0: x = {solutions}")`,
    output: `x > 4.0
x < -3.0
x²-5x+6>0: x = [-2, -1, 0, 1, 4, 5, 6, 7]`,
    notes: ['Flip inequality sign when multiplying/dividing by negative', 'For |x|<a: -a<x<a', 'Always check boundary values'],
    practice: {
      title: 'Solve the Inequality',
      description: 'Solve: 5x - 3 ≥ 2x + 9. Represent the solution on a number line description.',
      startCode: '# Solve 5x - 3 ≥ 2x + 9\n# Rearrange to find x\n',
      solution: '# 5x - 2x ≥ 9 + 3\n# 3x ≥ 12\n# x ≥ 4\nprint("x ≥ 4")\nprint("On number line: closed circle at 4, extends to right (+infinity)")',
      hint: 'Move all x terms to left and constants to right. Divide by coefficient of x.',
    },
  },

  {
    id: 'apt-pipes-cisterns',
    category: 'Intermediate — Work Problems',
    title: 'Pipes & Cisterns',
    difficulty: 'Intermediate',
    theory: [
      'Filling pipe fills a tank in x hours → fills 1/x per hour (positive). Emptying pipe empties in y hours → empties 1/y per hour (negative).',
      'Net filling rate = sum of all rates (positive for fill, negative for empty).',
      'If pipe A fills in a hours and pipe B empties in b hours, net = 1/a - 1/b. Tank fills in ab/(b-a) hours.',
      'Leak problem: If a pipe fills in n hours and there\'s a leak, the effective time increases. Leak rate = (1/actual time) - (1/pipe time).',
    ],
    code: `# Pipes and Cisterns

def net_rate(fill_times, empty_times):
    """Calculate net fill rate"""
    rate = sum(1/t for t in fill_times) - sum(1/t for t in empty_times)
    if rate > 0:
        time = 1/rate
        return f"Tank fills in {time:.2f} hours"
    elif rate < 0:
        time = abs(1/rate)
        return f"Tank empties in {time:.2f} hours"
    else:
        return "No net change"

# Pipe A fills in 6 hours, pipe B fills in 12 hours
print(net_rate([6, 12], []))

# Pipe A fills in 6 hours, leak empties in 24 hours
print(net_rate([6], [24]))

# Three pipes: fill 4h, fill 6h, empty 12h
print(net_rate([4, 6], [12]))`,
    output: `Tank fills in 4.00 hours
Tank fills in 8.00 hours
Tank fills in 4.00 hours`,
    notes: ['Fill = positive rate (+1/n)', 'Empty/leak = negative rate (-1/n)', 'Net time = 1/net rate'],
    practice: {
      title: 'Pipes and Cistern',
      description: 'Pipe A can fill a tank in 8 hours, pipe B can fill in 12 hours. A leak can empty the full tank in 24 hours. How long to fill when both pipes are open but the leak is also present?',
      startCode: '# A fills in 8h, B fills in 12h, leak empties in 24h\nA_time = 8\nB_time = 12\nleak_time = 24\n',
      solution: 'rate = 1/8 + 1/12 - 1/24\ntime = 1/rate\nprint(f"Time to fill: {time:.0f} hours")',
      hint: 'Net rate = 1/8 + 1/12 - 1/24. Find LCM (24): 3/24 + 2/24 - 1/24 = 4/24.',
    },
  },

  {
    id: 'apt-partnership',
    category: 'Basic — Finance',
    title: 'Partnership',
    difficulty: 'Beginner',
    theory: [
      'In a business partnership, profit is shared in proportion to capital × time.',
      'Simple Partnership: All partners invest for same duration. Profit ratio = ratio of capital invested.',
      'Compound Partnership: Partners invest for different durations. Profit ratio = Capital1×Time1 : Capital2×Time2.',
      'Active (working) partner may get extra salary/commission before profit distribution.',
    ],
    code: `# Partnership

def simple_partnership(capitals, total_profit):
    """Distribute profit based on capital ratio"""
    total = sum(capitals)
    shares = [(c/total)*total_profit for c in capitals]
    return shares

def compound_partnership(investments, total_profit):
    """investments = [(capital, time), ...]"""
    products = [c*t for c,t in investments]
    total = sum(products)
    shares = [(p/total)*total_profit for p in products]
    return shares

# Simple: A puts ₹30000, B puts ₹20000, profit ₹25000
caps = [30000, 20000]
shares = simple_partnership(caps, 25000)
print(f"Simple: A=₹{shares[0]:.0f}, B=₹{shares[1]:.0f}")

# Compound: A puts ₹40000 for 8 months, B puts ₹60000 for 6 months
investments = [(40000,8), (60000,6)]
shares = compound_partnership(investments, 42000)
print(f"Compound: A=₹{shares[0]:.0f}, B=₹{shares[1]:.0f}")`,
    output: `Simple: A=₹15000, B=₹10000
Compound: A=₹21000, B=₹21000`,
    notes: ['Profit ratio = Capital × Time', 'Same ratio if they invest same amount for same time', 'Working partner gets commission first, then remaining profit is split'],
    practice: {
      title: 'Partnership Problem',
      description: 'A, B, and C invested ₹20,000, ₹30,000, and ₹50,000 respectively. After 1 year, profit is ₹36,000. Find each partner\'s share.',
      startCode: 'capitals = [20000, 30000, 50000]\ntotal_profit = 36000\n# Find shares\n',
      solution: 'caps = [20000, 30000, 50000]\ntotal = sum(caps)\nfor name, c in zip("ABC", caps):\n    print(f"{name}: ₹{(c/total)*36000:.0f}")',
      hint: 'Ratio = 20:30:50 = 2:3:5. Total parts = 10. Each part = ₹3600.',
    },
  },

  {
    id: 'apt-blood-relations',
    category: 'Advanced — Reasoning',
    title: 'Blood Relations',
    difficulty: 'Advanced',
    theory: [
      'Blood relations problems test your understanding of family relationships.',
      'Parents: Father (male), Mother (female). Siblings: Brother (male), Sister (female).',
      'Spouse: Husband, Wife. Children: Son, Daughter. Grandparents: Grandfather, Grandmother.',
      'Uncle = parent\'s brother. Aunt = parent\'s sister. Cousin = uncle/aunt\'s child.',
      'Mother-in-law = spouse\'s mother. Son-in-law = daughter\'s husband. Daughter-in-law = son\'s wife.',
      'Strategy: Draw a family tree. Use M for male, F for female.',
    ],
    code: `# Blood Relations - Family Tree Builder

class Person:
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
        self.parents = []
        self.children = []
        self.spouse = None

    def __repr__(self):
        return f"{self.name}({'M' if self.gender=='M' else 'F'})"

# Build a family
grandfather = Person("Ram", "M")
grandmother = Person("Sita", "F")
grandfather.spouse = grandmother

father = Person("Raj", "M")
uncle = Person("Ravi", "M")
father.parents = [grandfather, grandmother]
uncle.parents = [grandfather, grandmother]

mother = Person("Priya", "F")
father.spouse = mother

son = Person("Arjun", "M")
daughter = Person("Ananya", "F")
son.parents = [father, mother]
daughter.parents = [father, mother]

print(f"{grandfather.name} is {son.name}'s grandfather")
print(f"{uncle.name} is {son.name}'s uncle")
print(f"{daughter.name} is {son.name}'s sister")`,
    output: `Ram is Arjun's grandfather
Ravi is Arjun's uncle
Ananya is Arjun's sister`,
    notes: ['Always draw the family tree on paper', 'Mark gender clearly (M/F)', 'Work backwards from the question'],
    practice: {
      title: 'Blood Relations',
      description: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. How is A related to D?',
      startCode: '# Draw the family tree:\n# E (great-grandmother)\n# D (great-grandfather)\n# C (grandmother)\n# B (parent of A\'s sibling B)\n# A and B are siblings\n# How is A related to D?\n',
      solution: '# E is mother of D (great-grandmother)\n# D is father of C (great-grandfather)\n# C is mother of B (grandmother)\n# A is sister of B\n# So A is D\'s granddaughter\nprint("A is D\'s granddaughter")',
      hint: 'Go step by step: A→B sibling, B→C child, C→D child. So A is D\'s grandchild.',
    },
  },

  {
    id: 'apt-direction-distance',
    category: 'Advanced — Reasoning',
    title: 'Directions & Distance',
    difficulty: 'Advanced',
    theory: [
      'The four main directions: North (N), South (S), East (E), West (W). Intermediate: NE, NW, SE, SW.',
      'Right turn: N→E→S→W→N (clockwise). Left turn: N→W→S→E→N (counterclockwise).',
      'To find final position: track all movements as coordinates. North/East = positive, South/West = negative.',
      'Shortest distance between two points: Use Pythagorean theorem if movements form a right angle: d = √(x²+y²).',
    ],
    code: `import math

def track_movement(instructions):
    """
    instructions: list of (direction, distance)
    Returns final coordinates and distance from start
    """
    x, y = 0, 0
    direction_map = {
        'N': (0, 1), 'S': (0, -1),
        'E': (1, 0), 'W': (-1, 0)
    }

    for direction, dist in instructions:
        dx, dy = direction_map[direction]
        x += dx * dist
        y += dy * dist

    distance = math.sqrt(x**2 + y**2)
    return x, y, round(distance, 2)

# Example: Person goes N 5km, E 3km, S 2km, W 1km
moves = [('N', 5), ('E', 3), ('S', 2), ('W', 1)]
x, y, dist = track_movement(moves)
print(f"Final position: ({x}, {y})")
print(f"Straight-line distance from start: {dist} km")
if x > 0: print("Person is to the East")
if y > 0: print("Person is to the North")`,
    output: `Final position: (2, 3)
Straight-line distance from start: 3.61 km
Person is to the East
Person is to the North`,
    notes: ['Always draw the path on paper', 'Pythagoras for straight-line distance', 'Right turn = clockwise, Left turn = counterclockwise'],
    practice: {
      title: 'Direction Problem',
      description: 'Rohan starts from point A, walks 8km North, then 6km East. Find the straight-line distance from A to his final position and the direction from A.',
      startCode: 'import math\nnorth = 8\neast = 6\n# Find straight-line distance and direction\n',
      solution: 'import math\ndist = math.sqrt(8**2 + 6**2)\nprint(f"Distance: {dist} km")  # 10\nprint("Direction: North-East")',
      hint: 'Use Pythagoras: √(8²+6²) = √(64+36) = √100 = 10. Direction is NE.',
    },
  },

  {
    id: 'apt-seating-arrangement',
    category: 'Advanced — Reasoning',
    title: 'Seating Arrangements',
    difficulty: 'Advanced',
    theory: [
      'Linear arrangement: People seated in a row. Note: "to the right" and "immediate right" differ.',
      'Circular arrangement: People seated around a table. Fix one person as reference (n-1)! ways.',
      'For n people in a line: n! arrangements. Specific constraint reduces options.',
      'Strategy: Use given constraints to fix positions one by one. Use elimination.',
    ],
    code: `from itertools import permutations

def count_arrangements(n, constraints=None):
    """Count valid arrangements for n people"""
    people = list(range(1, n+1))  # 1-indexed
    all_perms = list(permutations(people))
    return len(all_perms)

# 5 people in a line
print(f"5 people in line: {count_arrangements(5)} ways")

# Example: A always sits at one end
# Fix A at position 0 or 4, arrange rest 4! each
n = 5
ways_A_at_end = 2 * 24  # 2 ends × 4! for remaining 4
print(f"A always at an end: {ways_A_at_end} ways")

# Circular arrangement of 6 people
import math
circular = math.factorial(6-1)
print(f"6 people in circle: {circular} ways")`,
    output: `5 people in line: 120 ways
A always at an end: 48 ways
6 people in circle: 120 ways`,
    notes: ['Linear: n! arrangements. Circular: (n-1)!', '"Beside" = can be on either side (×2)', 'Fix one constraint, then count remaining'],
    practice: {
      title: 'Seating Arrangement',
      description: 'In how many ways can 4 boys and 3 girls be seated in a row such that all girls are seated together?',
      startCode: 'import math\nboys = 4\ngirls = 3\n# Girls together = treat as 1 unit\n# Then arrange (boys + 1 unit) and girls within\n',
      solution: 'import math\n# Girls group = 1 unit → 5 entities → 5! arrangements\n# Girls within group → 3! arrangements\nways = math.factorial(5) * math.factorial(3)\nprint(f"Ways: {ways}")  # 720',
      hint: 'Treat all girls as 1 block. Then 4 boys + 1 block = 5 entities = 5! ways. Girls within block = 3! ways.',
    },
  },

  {
    id: 'apt-input-output',
    category: 'Advanced — Reasoning',
    title: 'Input-Output Problems',
    difficulty: 'Advanced',
    theory: [
      'Input-Output (machine) questions give an initial input and show how a machine processes it step by step.',
      'The machine applies some rule (sorting alphabetically, reversing, adding/subtracting) at each step.',
      'Find the pattern from given steps, then apply it to answer specific questions.',
      'Common patterns: Arranging words in alphabetical order, numbers in ascending/descending order, alternating operations.',
    ],
    code: `# Input-Output Machine Simulation

def step_sort_machine(input_data):
    """
    Machine rule: Each step, move the smallest number
    to the leftmost unsorted position
    """
    arr = list(input_data)
    steps = [arr[:]]

    for i in range(len(arr)):
        min_idx = arr.index(min(arr[i:]))
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        steps.append(arr[:])

    return steps

input_seq = [43, 17, 28, 9, 35, 62, 5]
print("Input:", input_seq)
steps = step_sort_machine(input_seq)
for i, step in enumerate(steps[1:], 1):
    print(f"Step {i}: {step}")`,
    output: `Input: [43, 17, 28, 9, 35, 62, 5]
Step 1: [5, 17, 28, 9, 35, 62, 43]
Step 2: [5, 9, 28, 17, 35, 62, 43]
Step 3: [5, 9, 17, 28, 35, 62, 43]
Step 4: [5, 9, 17, 28, 35, 62, 43]
Step 5: [5, 9, 17, 28, 35, 62, 43]
Step 6: [5, 9, 17, 28, 35, 43, 62]
Step 7: [5, 9, 17, 28, 35, 43, 62]`,
    notes: ['Look for the rule that changes each step', 'Words: usually alphabetical sorting', 'Numbers: usually ascending/descending sort'],
    practice: {
      title: 'Input-Output',
      description: 'Machine rule: even numbers halved, odd numbers +1. Apply to: [3, 8, 5, 12, 7]. Show after 2 steps.',
      startCode: 'def machine_step(arr):\n    # Even: halved, Odd: +1\n    pass\n\narr = [3, 8, 5, 12, 7]\n# Apply 2 steps\n',
      solution: 'def step(arr):\n    return [x//2 if x%2==0 else x+1 for x in arr]\n\narr = [3, 8, 5, 12, 7]\nfor i in range(2):\n    arr = step(arr)\n    print(f"Step {i+1}: {arr}")',
      hint: 'For each number: if even → halve it; if odd → add 1. Repeat for step 2.',
    },
  },

  {
    id: 'apt-statement-assumptions',
    category: 'Advanced — Reasoning',
    title: 'Statement & Assumptions',
    difficulty: 'Advanced',
    theory: [
      'An assumption is something that is taken for granted or implied in a statement without being stated explicitly.',
      'A statement makes an assumption valid if the assumption is necessary for the statement to make sense.',
      'Test: Ask "Is this assumption necessary for the statement to hold true?".',
      'Common types: Statements with implicit assumptions about cause-effect, general knowledge, or expected behavior.',
    ],
    code: `# Statement and Assumptions - Logical Framework

def analyze_statement(statement, assumptions):
    """
    Analyze which assumptions follow from the statement
    This is a template for logical reasoning
    """
    print(f"Statement: {statement}")
    print("\\nAnalysis:")
    for i, (assumption, follows) in enumerate(assumptions, 1):
        result = "✅ Follows" if follows else "❌ Does not follow"
        print(f"Assumption {i}: {assumption}")
        print(f"  → {result}")

# Example
statement = "Please do not use the lift while leaving the building during a fire."

assumptions = [
    ("People use lifts during normal times", True),
    ("Lifts are always dangerous", False),
    ("People may try to use lift during fire", True),
    ("Stairs can be used as an alternative", True),
]

analyze_statement(statement, assumptions)`,
    output: `Statement: Please do not use the lift while leaving the building during a fire.

Analysis:
Assumption 1: People use lifts during normal times
  → ✅ Follows
Assumption 2: Lifts are always dangerous
  → ❌ Does not follow
Assumption 3: People may try to use lift during fire
  → ✅ Follows
Assumption 4: Stairs can be used as an alternative
  → ✅ Follows`,
    notes: ['Assumption must be implicit (not stated)', 'Must be necessary for the statement to make sense', 'If stated directly in the statement, it\'s not an assumption'],
    practice: {
      title: 'Statement and Assumptions',
      description: 'Statement: "Banks should lend money to farmers at low interest rates." Assumption I: Farmers need money for agriculture. Assumption II: Low interest rates help farmers. Which assumptions follow?',
      startCode: '# Analyze which assumptions follow\n# Statement: Banks should lend at low rates to farmers\n# Test each assumption\n',
      solution: 'print("Assumption I: Follows — the statement implies farmers need funds")\nprint("Assumption II: Follows — the reason for low rates is to help farmers")\nprint("Both I and II follow")',
      hint: 'Ask: Is this assumption necessary for the statement to have meaning? If yes, it follows.',
    },
  },

  {
    id: 'apt-number-puzzles',
    category: 'Advanced — Reasoning',
    title: 'Number Puzzles & Magic Squares',
    difficulty: 'Advanced',
    theory: [
      'Number puzzles test logical thinking, pattern recognition, and arithmetic skills.',
      'Magic Square: A grid where rows, columns, and diagonals all sum to the same number (magic constant).',
      'For 3×3 magic square with numbers 1-9: magic constant = 15. Center = 5 always.',
      'Missing number in a pattern: Find the rule connecting given numbers, then apply it.',
    ],
    code: `import numpy as np

# Magic Square verification
magic_square = np.array([
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
])

print("Magic Square:")
print(magic_square)
print("Row sums:", magic_square.sum(axis=1))
print("Col sums:", magic_square.sum(axis=0))
print("Diagonal:", np.diag(magic_square).sum())
print("Anti-diagonal:", np.diag(np.fliplr(magic_square)).sum())

# Number puzzle: Find rule
# 4 → 9, 7 → 16, 10 → 25, 13 → ?
# Pattern: n → ((n+2)/3 + 1)² ? No...
# 4+1=5 (sq=25 no), 4→9=3²... 7→16=4²... 10→25=5²
# Pattern: input/3 + 2 gives the sqrt!
nums = [4, 7, 10, 13]
results = [((n+2)//3 + 1)**2 for n in nums]
print("\nPuzzle: rule is n → ((n+2)/3 + 1)²")
for n, r in zip(nums, results):
    print(f"  {n} → {r}")`,
    output: `Magic Square:
[[2 7 6]
 [9 5 1]
 [4 3 8]]
Row sums: [15 15 15]
Col sums: [15 15 15]
Diagonal: 15
Anti-diagonal: 15

Puzzle: rule is n → ((n+2)/3 + 1)²
  4 → 9
  7 → 16
  10 → 25
  13 → 36`,
    notes: ['3×3 magic square sum = 15, center = 5', 'Always test your discovered rule on all given values', 'Missing operator: try +, -, ×, ÷, ^ (power)'],
    practice: {
      title: 'Number Puzzle',
      description: 'Find the pattern: 2 → 8, 3 → 27, 4 → 64, 5 → ? What is the output for 6?',
      startCode: '# Find the pattern\n# 2→8, 3→27, 4→64, 5→?\n# What operation connects input to output?\n',
      solution: '# 2³=8, 3³=27, 4³=64, 5³=125, 6³=216\nfor n in range(2, 8):\n    print(f"{n} → {n**3}")',
      hint: '2→8=2³, 3→27=3³, 4→64=4³. Pattern: n → n³ (cubes).',
    },
  },

  {
    id: 'apt-verbal-analogies',
    category: 'Advanced — Verbal',
    title: 'Analogies',
    difficulty: 'Advanced',
    theory: [
      'Analogy tests find the relationship between two words and apply it to another pair.',
      'Common relationships: Part-Whole (finger:hand), Tool-Use (pen:write), Cause-Effect (rain:flood), Worker-Tool (carpenter:saw), Antonyms, Synonyms.',
      'Method: Identify the relationship between the given pair → apply it to find the missing word.',
      'Analogy format: A:B :: C:D (A is to B as C is to D).',
    ],
    code: `# Analogies - Relationship Finder

analogies = [
    # (word1, word2, relationship)
    ("doctor", "hospital", "person-workplace"),
    ("teacher", "school", "person-workplace"),
    ("chef", "kitchen", "person-workplace"),

    ("pen", "write", "tool-function"),
    ("knife", "cut", "tool-function"),
    ("telescope", "observe", "tool-function"),

    ("fire", "ash", "cause-effect"),
    ("rain", "flood", "cause-effect"),
    ("study", "success", "cause-effect"),
]

print("Common Analogy Relationships:")
print("=" * 40)

current_type = ""
for w1, w2, rel_type in analogies:
    if rel_type != current_type:
        print(f"\\n{rel_type.upper()}:")
        current_type = rel_type
    print(f"  {w1} : {w2}")

# Test analogy
def test_analogy(word1, word2, word3, options):
    print(f"\\n{word1}:{word2} :: {word3}:?")
    print("Options:", options)
    # Logic: word1 is to word2 as word3 is to answer
    print("Find option with same relationship as", word1, "to", word2)`,
    output: `Common Analogy Relationships:
========================================

PERSON-WORKPLACE:
  doctor : hospital
  teacher : school
  chef : kitchen

TOOL-FUNCTION:
  pen : write
  knife : cut
  telescope : observe

CAUSE-EFFECT:
  fire : ash
  rain : flood
  study : success`,
    notes: ['Identify relationship type first', 'Common: part-whole, cause-effect, tool-use, synonym, antonym', 'If A:B = specific:general, find specific for C'],
    practice: {
      title: 'Analogies Practice',
      description: 'Complete: Pen:Ink :: Car:___ (Fuel/Road/Driver/Engine). Explain the relationship.',
      startCode: '# Pen uses Ink to work\n# Car uses ___ to work\n# What does a car need to run?\n',
      solution: 'print("Car : Fuel")\nprint("Relationship: Object needs its fuel/energy source to function")\nprint("Pen needs Ink, Car needs Fuel")',
      hint: 'Pen needs ink to function. What does a car need to function? (Not road or driver)',
    },
  },

  // ── ADDITIONAL TOPICS ────────────────────────────────────────────────────────
  {
    id: 'apt-lcm-hcf-problems',
    category: 'Basic — Numbers',
    title: 'LCM & HCF — Problem Solving',
    difficulty: 'Beginner',
    theory: [
      'HCF (Highest Common Factor) = largest number that divides all given numbers exactly. Found using prime factorization or Euclidean algorithm.',
      'LCM (Least Common Multiple) = smallest number divisible by all given numbers. LCM = product of highest powers of all prime factors.',
      'Key relation: HCF × LCM = Product of two numbers (valid only for two numbers).',
      'Word problem clue: "largest tile/container/unit" → HCF. "smallest time to meet again/ring together" → LCM.',
      'For more than two numbers: HCF = common to all using successive method. LCM = build from prime factors.',
    ],
    syntax: `HCF(a,b) × LCM(a,b) = a × b
LCM: use highest powers of all primes
HCF: use lowest powers of common primes
Three numbers: HCF(a,b,c) = HCF(HCF(a,b), c)`,
    code: `from math import gcd

def hcf(*args):
    result = args[0]
    for n in args[1:]:
        result = gcd(result, n)
    return result

def lcm(*args):
    from math import lcm as _lcm
    result = args[0]
    for n in args[1:]:
        result = _lcm(result, n)
    return result

# Problem 1: Largest square tile for a 12m × 8m floor
length, width = 1200, 800  # in cm
tile_size = hcf(length, width)
print(f"Largest tile size: {tile_size} cm")

# Problem 2: Three bells ring at 6, 8, 10 minute intervals.
# When do they ring together again?
bells = [6, 8, 10]
together = lcm(*bells)
print(f"Bells ring together after: {together} minutes")

# Problem 3: Verify HCF × LCM = product (two numbers)
a, b = 36, 48
print(f"HCF(36,48) = {hcf(a,b)}, LCM(36,48) = {lcm(a,b)}")
print(f"HCF × LCM = {hcf(a,b) * lcm(a,b)}, a × b = {a*b}")`,
    output: `Largest tile size: 400 cm
Bells ring together after: 120 minutes
HCF(36,48) = 12, LCM(36,48) = 144
HCF × LCM = 1728, a × b = 1728`,
    notes: [
      '"Largest" size/group → HCF. "Smallest" time/amount → LCM',
      'HCF × LCM = a × b (only for exactly two numbers)',
      'For n numbers in LCM: combine successive pairs',
      'HCF of two co-prime numbers is always 1',
    ],
    practice: {
      title: 'LCM & HCF Word Problem',
      description: 'Find the smallest number that when divided by 12, 15, and 20 leaves a remainder of 5 in each case.',
      startCode: '',
      hint: 'Find LCM(12, 15, 20) first. The answer is LCM + 5.',
      solution: 'from math import lcm\nresult = lcm(12, lcm(15, 20))\nprint("LCM:", result)        # 60\nprint("Answer:", result + 5)  # 65',
    },
  },

  {
    id: 'apt-number-properties',
    category: 'Basic — Numbers',
    title: 'Number Properties',
    difficulty: 'Beginner',
    theory: [
      'Perfect Squares: Numbers whose square root is an integer. 1,4,9,16,25,36,49,64,81,100... Always end in 0,1,4,5,6,9.',
      'Perfect Cubes: 1,8,27,64,125,216,343,512,729,1000... n³ for n=1,2,3...',
      'Prime Factorization: Express a number as product of primes. 60 = 2²×3×5. Number of factors = (2+1)(1+1)(1+1) = 12.',
      'Counting divisors: If n = p1^a × p2^b × p3^c, total factors = (a+1)(b+1)(c+1).',
      'Sum of first n natural numbers = n(n+1)/2. Sum of squares = n(n+1)(2n+1)/6. Sum of cubes = [n(n+1)/2]².',
    ],
    syntax: `n = p1^a × p2^b × p3^c
Number of factors = (a+1)(b+1)(c+1)
Sum 1..n = n(n+1)/2
Sum of squares = n(n+1)(2n+1)/6`,
    code: `def prime_factorization(n):
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

def count_divisors(n):
    pf = prime_factorization(n)
    count = 1
    for exp in pf.values():
        count *= (exp + 1)
    return count

# Perfect squares and cubes
print("Perfect squares (1-100):", [n**2 for n in range(1, 11)])
print("Perfect cubes (1-10):", [n**3 for n in range(1, 11)])

# Prime factorization of 360
pf = prime_factorization(360)
print("360 =", pf)
print("Number of divisors:", count_divisors(360))

# Sum formulas
n = 10
print(f"Sum 1..{n} = {n*(n+1)//2}")
print(f"Sum of squares = {n*(n+1)*(2*n+1)//6}")`,
    output: `Perfect squares (1-100): [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Perfect cubes (1-10): [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]
360 = {2: 3, 3: 2, 5: 1}
Number of divisors: 24
Sum 1..10 = 55
Sum of squares = 385`,
    notes: [
      'Perfect squares end only in 0,1,4,5,6,9 — never 2,3,7,8',
      '360 = 2³×3²×5 → divisors = (3+1)(2+1)(1+1) = 24',
      'Sum of 1 to n: n(n+1)/2 is very commonly tested',
      'A perfect square has an odd number of total divisors',
    ],
    practice: {
      title: 'Number Properties',
      description: 'Find the number of divisors of 720. Also verify using prime factorization.',
      startCode: '',
      hint: '720 = 2⁴ × 3² × 5. Divisors = (4+1)(2+1)(1+1).',
      solution: 'def pf(n):\n    f={}\n    d=2\n    while d*d<=n:\n        while n%d==0: f[d]=f.get(d,0)+1; n//=d\n        d+=1\n    if n>1: f[n]=1\n    return f\n\nfactors = pf(720)\nprint("720 =", factors)  # {2:4, 3:2, 5:1}\ndivs = 1\nfor e in factors.values(): divs *= (e+1)\nprint("Divisors:", divs)  # 30',
    },
  },

  {
    id: 'apt-percentage-advanced',
    category: 'Basic — Numbers',
    title: 'Percentage Change & Reverse Percentage',
    difficulty: 'Intermediate',
    theory: [
      'Percentage Increase: New = Old × (1 + r/100). Percentage Decrease: New = Old × (1 - r/100).',
      'Reverse Percentage — find original: If price increased by 20% to ₹600, original = 600 / 1.20 = ₹500.',
      'Population/Price growth for multiple periods: Final = Initial × (1 + r₁/100) × (1 + r₂/100)...',
      'If A is x% more than B → B is x/(100+x) × 100 % less than A.',
      'Two successive changes of +x% and -x% always give a net loss of x²/100 %.',
    ],
    syntax: `Original = New / (1 ± r/100)
Net % change (x then y) = x + y + xy/100
A is x% more than B → B is less than A by: x/(100+x) × 100%`,
    code: `def reverse_percent(new_val, change_pct, increase=True):
    """Find original given the new value after % change"""
    if increase:
        return new_val / (1 + change_pct / 100)
    else:
        return new_val / (1 - change_pct / 100)

def net_successive_change(changes):
    """Net % change after successive % changes"""
    multiplier = 1
    for c in changes:
        multiplier *= (1 + c / 100)
    return (multiplier - 1) * 100

# Example 1: Price after 25% increase is ₹750. Find original.
original = reverse_percent(750, 25, increase=True)
print(f"Original price: ₹{original:.0f}")

# Example 2: Population 10000, grows 5% then 8%
final = 10000 * (1.05) * (1.08)
print(f"Final population: {final:.0f}")

# Example 3: +10% then -10%
net = net_successive_change([10, -10])
print(f"Net change (+10% then -10%): {net:.2f}%")

# Example 4: A is 25% more than B — B is what % less than A?
x = 25
b_less_than_a = x / (100 + x) * 100
print(f"B is {b_less_than_a:.2f}% less than A")`,
    output: `Original price: ₹600
Final population: 11340
Net change (+10% then -10%): -1.00%
B is 20.00% less than A`,
    notes: [
      'Reverse: always divide by the multiplier, not subtract %',
      '+x% then -x% gives net loss of x²/100 %',
      'A 20% rise means original = new / 1.20',
      '"A is 25% more than B" ≠ "B is 25% less than A"',
    ],
    practice: {
      title: 'Reverse Percentage',
      description: 'After a 15% price hike, a book costs ₹460. What was the original price? Also, if the price is then reduced by 10%, what is the final price?',
      startCode: '',
      hint: 'Original = 460 / 1.15. Then final = original × 1.15 × 0.90.',
      solution: 'original = 460 / 1.15\nprint(f"Original: ₹{original:.2f}")  # ₹400\nfinal = original * 1.15 * 0.90\nprint(f"Final after reduction: ₹{final:.2f}")  # ₹414',
    },
  },

  {
    id: 'apt-profit-loss-advanced',
    category: 'Basic — Finance',
    title: 'Profit & Loss — Marked Price & Discounts',
    difficulty: 'Intermediate',
    theory: [
      'Marked Price (MP) / List Price: The price tagged on the item. Selling Price = MP × (1 - Discount%/100).',
      'To earn x% profit after giving y% discount: MP = CP × (100+x)/(100-y).',
      'Successive discounts of d₁% and d₂%: Net discount = d₁ + d₂ - d₁d₂/100.',
      'Profit on CP but selling below MP: Profit% = (SP - CP)/CP × 100. Always calculate profit/loss on CP.',
      'Equivalent single discount for two discounts d₁ and d₂: 100 - [(100-d₁)(100-d₂)/100].',
    ],
    syntax: `SP = MP × (1 - d/100)
MP = CP × (100 + profit%) / (100 - discount%)
Net discount = d1 + d2 - d1×d2/100`,
    code: `def marked_price(cp, profit_pct, discount_pct):
    """Find marked price to achieve profit after discount"""
    return cp * (100 + profit_pct) / (100 - discount_pct)

def successive_discounts(mp, *discounts):
    """Apply successive discounts to marked price"""
    price = mp
    for d in discounts:
        price *= (1 - d / 100)
    return round(price, 2)

def net_discount(d1, d2):
    """Equivalent single discount for two successive discounts"""
    return d1 + d2 - (d1 * d2) / 100

# Example 1: CP=₹500, want 20% profit, giving 15% discount — what MP?
mp = marked_price(500, 20, 15)
print(f"Marked Price: ₹{mp:.2f}")

# Example 2: Item MP=₹1200, discounts 20% then 10%
sp = successive_discounts(1200, 20, 10)
print(f"SP after 20% then 10% discount: ₹{sp}")

# Example 3: Net single discount for 20% and 10%
nd = net_discount(20, 10)
print(f"Equivalent single discount: {nd}%")

# Verify: 1200 × (1 - 28/100) = 864
print(f"Verify: ₹{1200 * (1 - nd/100):.2f}")`,
    output: `Marked Price: ₹705.88
SP after 20% then 10% discount: ₹864.0
Equivalent single discount: 28.0%
Verify: ₹864.00`,
    notes: [
      'Always find SP first from MP and discount, then compare with CP for profit/loss',
      'Successive discounts: 20% + 10% ≠ 30%; actual = 28%',
      'Mark up above CP to absorb the discount and still earn profit',
      'SP = CP means neither profit nor loss',
    ],
    practice: {
      title: 'Marked Price Problem',
      description: 'A shopkeeper marks goods at 40% above CP and allows a 25% discount. Find the profit or loss percentage.',
      startCode: '',
      hint: 'Let CP = 100. MP = 140. SP = 140 × 0.75. Compare SP with CP.',
      solution: 'cp = 100\nmp = cp * 1.40  # 140\nsp = mp * 0.75  # 105\nprofit_pct = (sp - cp) / cp * 100\nprint(f"Profit: {profit_pct}%")  # 5%',
    },
  },

  {
    id: 'apt-ci-advanced',
    category: 'Basic — Finance',
    title: 'Compound Interest — Quarterly & Half-Yearly',
    difficulty: 'Intermediate',
    theory: [
      'When interest is compounded n times per year at annual rate R%: A = P(1 + R/(100n))^(nT).',
      'Half-yearly (n=2): A = P(1 + R/200)^(2T). Effective annual rate > nominal rate.',
      'Quarterly (n=4): A = P(1 + R/400)^(4T). More frequent compounding → higher returns.',
      'Effective Annual Rate (EAR) = (1 + R/100n)^n − 1. Compares different compounding frequencies.',
      'Population growth / depreciation uses the same compound formula. For depreciation: A = P(1 − R/100)^T.',
    ],
    syntax: `A = P(1 + R/100n)^(nT)
Half-yearly: A = P(1 + R/200)^(2T)
Quarterly: A = P(1 + R/400)^(4T)
Depreciation: A = P(1 - R/100)^T`,
    code: `def compound(p, r, t, n=1):
    """n=1 annual, n=2 half-yearly, n=4 quarterly, n=12 monthly"""
    A = p * (1 + r / (100 * n)) ** (n * t)
    return round(A, 2)

P = 10000
R = 20  # 20% per annum

print(f"Principal: ₹{P}, Rate: {R}%, Time: 2 years")
print(f"Annual:       ₹{compound(P, R, 2, 1)}")
print(f"Half-yearly:  ₹{compound(P, R, 2, 2)}")
print(f"Quarterly:    ₹{compound(P, R, 2, 4)}")
print(f"Monthly:      ₹{compound(P, R, 2, 12)}")

# Effective annual rate for 20% compounded quarterly
n = 4
ear = ((1 + R/(100*n))**n - 1) * 100
print(f"\\nEAR (quarterly): {ear:.3f}%")

# Depreciation: Car worth ₹500000, depreciates 10% per year, value after 3 yrs
car_value = 500000 * (1 - 10/100)**3
print(f"Car value after 3 years: ₹{car_value:.0f}")`,
    output: `Principal: ₹10000, Rate: 20%, Time: 2 years
Annual:       ₹14400.0
Half-yearly:  ₹14641.0
Quarterly:    ₹14774.55
Monthly:      ₹14859.47

EAR (quarterly): 21.551%
Car value after 3 years: ₹364500`,
    notes: [
      'More compounding periods → higher maturity amount',
      'Half-yearly: use R/2 and 2T. Quarterly: R/4 and 4T',
      'EAR is always higher than stated rate for n > 1',
      'Depreciation uses (1 - R/100)^T, same formula but subtracted',
    ],
    practice: {
      title: 'Half-Yearly Compounding',
      description: 'Find the compound interest on ₹16,000 at 20% per annum compounded half-yearly for 1 year. Compare with annual compounding.',
      startCode: '',
      hint: 'Half-yearly: P(1+10/100)² = P(1.1)². Annual: P(1+20/100).',
      solution: 'P = 16000\nA_half = P * (1 + 20/200)**2\nA_annual = P * (1 + 20/100)\nprint(f"Half-yearly CI: ₹{A_half - P:.0f}")   # ₹3360\nprint(f"Annual CI:      ₹{A_annual - P:.0f}")   # ₹3200',
    },
  },

  {
    id: 'apt-work-wages',
    category: 'Intermediate — Work Problems',
    title: 'Work & Wages',
    difficulty: 'Intermediate',
    theory: [
      'Wages are distributed in proportion to the work done (efficiency × time), not just time spent.',
      'If A does more work per day, A earns proportionally more wages from the total.',
      'Work done ∝ Efficiency × Days worked. Wage share = (Work done / Total work) × Total wages.',
      'Combined work efficiency: if A and B work at different rates, use the LCM method to find actual units each contributes.',
      'Alternate days: calculate work done on Day 1 by A, Day 2 by B, and so on until total work = 1.',
    ],
    syntax: `Wage_A / Wage_B = Work_A / Work_B
Work = Efficiency × Days
Total work (LCM method): assign total = LCM of all person-days`,
    code: `def wage_distribution(workers, total_wages):
    """
    workers: list of (name, days_worked, daily_rate)
    Wages proportional to work (rate × days)
    """
    works = [(name, days * rate) for name, days, rate in workers]
    total_work = sum(w for _, w in works)
    print(f"Total work units: {total_work}")
    for name, w in works:
        share = (w / total_work) * total_wages
        print(f"  {name}: ₹{share:.2f}")

# Example 1: A, B, C complete job, paid ₹4500
# A works 4 days, B works 6 days, C works 3 days (same daily rate)
wage_distribution([('A',4,1), ('B',6,1), ('C',3,1)], 4500)

print()
# Example 2: A can do in 6 days, B in 8 days — they work together
# Total wages ₹2800 — divide by efficiency
lcm_work = 24  # LCM(6,8)
a_rate = lcm_work // 6  # 4 units/day
b_rate = lcm_work // 8  # 3 units/day
print(f"A's daily work: {a_rate} units, B's: {b_rate} units")
total = a_rate + b_rate
for name, rate in [('A', a_rate), ('B', b_rate)]:
    print(f"  {name}: ₹{(rate/total)*2800:.2f}")`,
    output: `Total work units: 13
  A: ₹1384.62
  B: ₹2076.92
  C: ₹1038.46

A's daily work: 4 units, B's: 3 units
  A: ₹1600.00
  B: ₹1200.00`,
    notes: [
      'Wages split by work done, not by days spent',
      'Use LCM method for efficiency comparison',
      'If rate per day differs, multiply rate × days for work contribution',
      'Co-workers: more efficient worker earns higher share',
    ],
    practice: {
      title: 'Work & Wages',
      description: 'A can do a job in 10 days and B in 15 days. They work together and earn ₹3000. How much does each earn?',
      startCode: '',
      hint: 'LCM(10,15)=30. A does 3 units/day, B does 2 units/day. Split ₹3000 in ratio 3:2.',
      solution: 'lcm_work = 30\na_rate, b_rate = lcm_work//10, lcm_work//15  # 3, 2\ntotal = a_rate + b_rate  # 5\nA_wage = (a_rate/total)*3000\nB_wage = (b_rate/total)*3000\nprint(f"A: ₹{A_wage:.0f}, B: ₹{B_wage:.0f}")  # A:₹1800, B:₹1200',
    },
  },

  {
    id: 'apt-races-games',
    category: 'Intermediate — Work Problems',
    title: 'Races & Games',
    difficulty: 'Intermediate',
    theory: [
      'In a race of X metres, A beats B by n metres means when A finishes X metres, B has only covered X-n metres.',
      'A beats B by t seconds means A finishes the race t seconds before B.',
      'Start/Head start: If A gives B a start of 10m in a 100m race, A runs 100m while B runs 90m.',
      'A beats B by 10m and B beats C by 10m in a 100m race: A vs C — C runs 81m when A finishes 100m.',
      'Games: In a game of 100 points, A gives B 20 points means A scores 100 when B scores 80.',
    ],
    syntax: `Speed ratio A:B = Distances when A finishes
A beats B by n m → B covers (race_length - n) m
Compounding: A vs C from A vs B and B vs C`,
    code: `def race_ratio(race_len, a_beats_b_by_metres):
    """Speed ratio when A beats B by given metres"""
    b_distance = race_len - a_beats_b_by_metres
    print(f"Speed ratio A:B = {race_len}:{b_distance}")
    return race_len, b_distance

def compound_race(race_len, a_beats_b, b_beats_c):
    """Find by how much A beats C"""
    # When A runs race_len, B runs (race_len - a_beats_b)
    # When B runs race_len, C runs (race_len - b_beats_c)
    # When B runs (race_len - a_beats_b), C runs:
    c_distance = (race_len - a_beats_b) * (race_len - b_beats_c) / race_len
    a_beats_c = race_len - c_distance
    return round(a_beats_c, 2)

# 100m race: A beats B by 10m
ra, rb = race_ratio(100, 10)

# A beats B by 10m, B beats C by 10m — A vs C?
a_beats_c = compound_race(100, 10, 10)
print(f"A beats C by {a_beats_c}m in 100m race")

# Head start problem: 100m race, A gives B 10m start
# B starts from 10m mark (runs only 90m)
# If A's speed = 10 m/s, time A finishes = 10s
# B must cover 90m in 10s → B's speed = 9 m/s
a_speed = 10
a_time = 100 / a_speed
b_speed_needed = 90 / a_time
print(f"With 10m head start, B needs speed: {b_speed_needed} m/s")`,
    output: `Speed ratio A:B = 100:90
A beats C by 19.0m in 100m race
With 10m head start, B needs speed: 9.0 m/s`,
    notes: [
      '"A beats B by 10m" → speed ratio A:B = 100:90',
      'Compound two race results to find A vs C',
      'Head start of n metres means the lagging runner covers (race - n) metres',
      '"Gives a start of n seconds" means lagging runner has n second head start in time',
    ],
    practice: {
      title: 'Race Problem',
      description: 'In a 500m race, A beats B by 20m and A beats C by 50m. By how many metres does B beat C in a 500m race?',
      startCode: '',
      hint: 'When A runs 500m: B runs 480m, C runs 450m. When B runs 500m, C runs ?',
      solution: '# When A=500: B=480, C=450\n# Speed B:C = 480:450 = 32:30\n# When B runs 500m, C runs 500*(450/480)\nc = 500 * (450/480)\nprint(f"B beats C by: {500-c:.2f}m")  # 31.25m',
    },
  },

  {
    id: 'apt-surds-indices',
    category: 'Advanced — Math',
    title: 'Surds & Indices',
    difficulty: 'Advanced',
    theory: [
      'Indices (Exponents): aᵐ × aⁿ = aᵐ⁺ⁿ. aᵐ / aⁿ = aᵐ⁻ⁿ. (aᵐ)ⁿ = aᵐⁿ. a⁰ = 1. a⁻ⁿ = 1/aⁿ.',
      'Surds: Irrational roots that cannot be simplified. √2, √3, ∛5 are surds. √4 = 2 (not a surd).',
      'Rationalizing the denominator: Multiply by conjugate. 1/√2 = √2/2. 1/(√3+√2) = (√3−√2)/((√3)²−(√2)²) = √3−√2.',
      'Laws of radicals: √(a×b) = √a×√b. √(a/b) = √a/√b. (√a)² = a.',
      'Comparing surds: To compare √3 and ∛4, raise both to the power 6 (LCM of 2 and 3): 3³=27 vs 4²=16. So √3 > ∛4.',
    ],
    syntax: `aᵐ × aⁿ = aᵐ⁺ⁿ
aᵐ / aⁿ = aᵐ⁻ⁿ
(aᵐ)ⁿ = aᵐⁿ
Rationalize: 1/(a+√b) × (a-√b)/(a-√b)`,
    code: `import math

# Laws of indices
a, m, n = 2, 3, 4
print(f"2³ × 2⁴ = {2**3 * 2**4} = 2^{3+4} = {2**7}")
print(f"2⁴ / 2³ = {2**4 // 2**3} = 2^{4-3} = {2**1}")
print(f"(2³)² = {(2**3)**2} = 2^{3*2} = {2**6}")
print(f"2⁻³ = {2**-3} = 1/8")

# Surd operations
print(f"\nsqrt(2) = {math.sqrt(2):.4f}")
print(f"sqrt(8) = sqrt(4×2) = 2*sqrt(2) = {2*math.sqrt(2):.4f}")
print(f"1/sqrt(2) = sqrt(2)/2 = {math.sqrt(2)/2:.4f}")

# Rationalizing: 1/(sqrt(3)+sqrt(2)) = sqrt(3)-sqrt(2)
numerator = math.sqrt(3) - math.sqrt(2)
denominator = (math.sqrt(3))**2 - (math.sqrt(2))**2  # = 3-2 = 1
print(f"\n1/(√3+√2) = {numerator/denominator:.4f}")
print(f"(√3 - √2) = {numerator:.4f}")

# Compare sqrt(3) vs cbrt(4)
s3_power6 = 3**3  # (√3)^6 = 3^3
c4_power6 = 4**2  # (∛4)^6 = 4^2
print(f"\n3^3 = {s3_power6} vs 4^2 = {c4_power6}")
print(f"√3 {'>' if s3_power6 > c4_power6 else '<'} ∛4")`,
    output: `2³ × 2⁴ = 128 = 2^7 = 128
2⁴ / 2³ = 2 = 2^1 = 2
(2³)² = 64 = 2^6 = 64
2⁻³ = 0.125 = 1/8

sqrt(2) = 1.4142
sqrt(8) = sqrt(4×2) = 2*sqrt(2) = 2.8284
1/sqrt(2) = sqrt(2)/2 = 0.7071

1/(√3+√2) = 0.3178
(√3 - √2) = 0.3178

3^3 = 27 vs 4^2 = 16
√3 > ∛4`,
    notes: [
      'a⁰ = 1 for any non-zero a. 0⁰ is undefined.',
      'Rationalize by multiplying numerator and denominator by the conjugate',
      'To compare surds of different orders: raise to LCM of the orders',
      'aᵐ/ⁿ = ⁿ√(aᵐ) — fractional exponents become radicals',
    ],
    practice: {
      title: 'Surds & Indices',
      description: 'Simplify: (i) √75 + √48 − √27. (ii) Rationalize 5/(√7 − √2).',
      startCode: '',
      hint: 'Factor out perfect squares: √75=5√3, √48=4√3, √27=3√3. For rationalization multiply by (√7+√2).',
      solution: 'import math\n# Part i\nresult = math.sqrt(75) + math.sqrt(48) - math.sqrt(27)\nprint(f"√75+√48-√27 = {result:.4f} = {5+4-3}√3 = 6√3 = {6*math.sqrt(3):.4f}")\n# Part ii\nnum = 5 * (math.sqrt(7) + math.sqrt(2))\nden = 7 - 2  # (√7)²-(√2)² = 5\nprint(f"5/(√7-√2) = (5(√7+√2))/5 = √7+√2 = {num/den:.4f}")',
    },
  },

  {
    id: 'apt-logarithms',
    category: 'Advanced — Math',
    title: 'Logarithms',
    difficulty: 'Advanced',
    theory: [
      'Logarithm: If aˣ = N, then logₐN = x. Read as "log base a of N equals x". log₁₀ is common log; logₑ is natural log.',
      'Key laws: log(MN) = logM + logN. log(M/N) = logM − logN. log(Mⁿ) = n·logM.',
      'Special values: log 1 = 0 (any base). log a (base a) = 1. log 0 is undefined.',
      'Change of base: logₐb = log b / log a (convert to any convenient base).',
      'Anti-log: If log x = n, then x = 10ⁿ. log 2 ≈ 0.3010, log 3 ≈ 0.4771 are commonly tested values.',
    ],
    syntax: `logₐN = x  ↔  aˣ = N
log(MN) = logM + logN
log(M/N) = logM - logN
log(Mⁿ) = n·logM
logₐb = log(b)/log(a)`,
    code: `import math

# Basic log operations
print(f"log₁₀(100) = {math.log10(100)}")       # 2
print(f"log₁₀(1000) = {math.log10(1000)}")     # 3
print(f"log₁₀(1) = {math.log10(1)}")           # 0
print(f"ln(e) = {math.log(math.e):.0f}")        # 1

# Log laws
log2 = math.log10(2)  # ≈ 0.3010
log3 = math.log10(3)  # ≈ 0.4771
print(f"\nlog 2 ≈ {log2:.4f}")
print(f"log 3 ≈ {log3:.4f}")
print(f"log 6 = log(2×3) = log2+log3 = {log2+log3:.4f}")
print(f"log 8 = 3×log2 = {3*log2:.4f}")
print(f"log 5 = log(10/2) = 1-log2 = {1-log2:.4f}")

# Change of base
print(f"\nlog₂(32) = log(32)/log(2) = {math.log10(32)/math.log10(2):.0f}")

# Anti-log: if log x = 2.4771, find x
log_x = 2.4771
x = 10 ** log_x
print(f"antilog(2.4771) = {x:.1f}")  # ≈ 300`,
    output: `log₁₀(100) = 2.0
log₁₀(1000) = 3.0
log₁₀(1) = 0.0
ln(e) = 1

log 2 ≈ 0.3010
log 3 ≈ 0.4771
log 6 = log(2×3) = log2+log3 = 0.7781
log 8 = 3×log2 = 0.9030
log 5 = log(10/2) = 1-log2 = 0.6990

log₂(32) = log(32)/log(2) = 5.0
antilog(2.4771) = 300.1`,
    notes: [
      'log 1 = 0, log 10 = 1 (base 10)',
      'Memorize: log 2 ≈ 0.3010, log 3 ≈ 0.4771',
      'log 5 = 1 − log 2 = 0.6990 (since 2×5=10)',
      'Characteristic = integer part, Mantissa = decimal part of log',
    ],
    practice: {
      title: 'Logarithm Problems',
      description: 'If log 2 = 0.3010 and log 3 = 0.4771, find: (i) log 12, (ii) log 0.25.',
      startCode: '',
      hint: 'log 12 = log(4×3) = 2 log 2 + log 3. log 0.25 = log(1/4) = -2 log 2.',
      solution: 'log2 = 0.3010\nlog3 = 0.4771\nlog12 = 2*log2 + log3\nlog025 = -2*log2\nprint(f"log 12 = {log12:.4f}")   # 1.0791\nprint(f"log 0.25 = {log025:.4f}") # -0.6020',
    },
  },

  {
    id: 'apt-bodmas',
    category: 'Basic — Numbers',
    title: 'Mathematical Operations — BODMAS',
    difficulty: 'Beginner',
    theory: [
      'BODMAS order: Brackets → Orders (powers/roots) → Division → Multiplication → Addition → Subtraction.',
      'PEMDAS (US equivalent): Parentheses → Exponents → Multiplication/Division (left to right) → Addition/Subtraction (left to right).',
      'Division and Multiplication have equal priority — solve left to right. Same for Addition and Subtraction.',
      'Nested brackets: Solve innermost bracket first. Order: ( ) then { } then [ ] in India; always innermost to outermost.',
      'Fraction bar acts as a bracket — evaluate numerator and denominator completely before dividing.',
    ],
    syntax: `B → O → D → M → A → S
(Brackets → Orders → Divide → Multiply → Add → Subtract)
Left to right for equal priority operations`,
    code: `# BODMAS / PEMDAS examples

# Python follows correct operator precedence
expr1 = 2 + 3 * 4       # Multiply first → 2+12 = 14
expr2 = (2 + 3) * 4     # Bracket first → 5*4 = 20
expr3 = 16 / 4 * 2      # Left to right → 4*2 = 8
expr4 = 2 ** 3 + 1      # Power first → 8+1 = 9
expr5 = 100 - 4 * (2 + 3) ** 2  # Full BODMAS

print(f"2 + 3 × 4 = {expr1}")
print(f"(2 + 3) × 4 = {expr2}")
print(f"16 ÷ 4 × 2 = {expr3}")
print(f"2³ + 1 = {expr4}")
print(f"100 - 4 × (2+3)² = {expr5}")

# Step-by-step breakdown for: 100 - 4 × (2+3)²
print("\\nStep-by-step: 100 - 4 × (2+3)²")
step1 = 2 + 3          # Bracket: 5
step2 = step1 ** 2     # Order: 25
step3 = 4 * step2      # Multiply: 100
step4 = 100 - step3    # Subtract: 0
print(f"  Bracket: (2+3) = {step1}")
print(f"  Order: 5² = {step2}")
print(f"  Multiply: 4×25 = {step3}")
print(f"  Subtract: 100-100 = {step4}")`,
    output: `2 + 3 × 4 = 14
(2 + 3) × 4 = 20
16 ÷ 4 × 2 = 8
2³ + 1 = 9
100 - 4 × (2+3)² = 0

Step-by-step: 100 - 4 × (2+3)²
  Bracket: (2+3) = 5
  Order: 5² = 25
  Multiply: 4×25 = 100
  Subtract: 100-100 = 0`,
    notes: [
      'Never add before multiplying unless brackets say so',
      'D and M are equal priority — left to right',
      'A and S are equal priority — left to right',
      'Fraction bar = hidden brackets around numerator and denominator',
    ],
    practice: {
      title: 'BODMAS Expression',
      description: 'Evaluate: 18 ÷ 6 × (4 + 2) − 3² + 1. Show each step.',
      startCode: '',
      hint: 'Step1: bracket (4+2)=6. Step2: 3²=9. Step3: 18÷6=3. Step4: 3×6=18. Step5: 18-9+1.',
      solution: 'step1 = 4 + 2      # Bracket → 6\nstep2 = 3 ** 2     # Order → 9\nstep3 = 18 // 6    # Divide → 3\nstep4 = step3 * step1   # Multiply → 18\nresult = step4 - step2 + 1  # 18-9+1 = 10\nprint("Result:", result)  # 10',
    },
  },

  {
    id: 'apt-data-sufficiency',
    category: 'Advanced — Data',
    title: 'Data Sufficiency',
    difficulty: 'Advanced',
    theory: [
      'Data Sufficiency (DS) tests whether given statements provide ENOUGH information to answer a question — you do NOT need to solve it.',
      'Standard answer choices: (A) Statement 1 alone sufficient. (B) Statement 2 alone sufficient. (C) Both together sufficient. (D) Each alone sufficient. (E) Neither sufficient.',
      'Process: For each statement, try to get a UNIQUE answer. If you get one unique value → sufficient. If you get multiple or no answer → insufficient.',
      'Key insight: You are not solving the problem, just checking if a unique solution EXISTS.',
      'Watch out for: knowing a variable is positive/negative, integer constraints, and proportional unknowns (e.g., ratio problems).',
    ],
    code: `# Data Sufficiency — Logical Framework

def check_sufficiency(question, stmt1_info, stmt2_info):
    """
    Template for analyzing data sufficiency questions.
    Returns which combination is sufficient.
    """
    print(f"Question: {question}")
    print(f"Statement 1: {stmt1_info['text']}")
    print(f"  → Sufficient? {stmt1_info['sufficient']} | Reason: {stmt1_info['reason']}")
    print(f"Statement 2: {stmt2_info['text']}")
    print(f"  → Sufficient? {stmt2_info['sufficient']} | Reason: {stmt2_info['reason']}")

    s1, s2 = stmt1_info['sufficient'], stmt2_info['sufficient']
    if s1 and s2:
        print("Answer: D — Each statement alone is sufficient")
    elif s1:
        print("Answer: A — Statement 1 alone is sufficient")
    elif s2:
        print("Answer: B — Statement 2 alone is sufficient")

# Example: What is x?
# Statement 1: x² = 25   (x could be +5 or -5 → NOT sufficient)
# Statement 2: x > 0     (we know x is positive, but don't know the value → NOT sufficient)
# Together: x² = 25 AND x > 0 → x = 5 ONLY → SUFFICIENT

check_sufficiency(
    question="What is the value of x?",
    stmt1_info={"text": "x² = 25", "sufficient": False,
                "reason": "x = +5 or -5 (two values possible)"},
    stmt2_info={"text": "x > 0", "sufficient": False,
                "reason": "x could be 1, 2, 3... (infinite values)"}
)
print("Together: x²=25 AND x>0 → x=5 uniquely → Answer: C")`,
    output: `Question: What is the value of x?
Statement 1: x² = 25
  → Sufficient? False | Reason: x = +5 or -5 (two values possible)
Statement 2: x > 0
  → Sufficient? False | Reason: x could be 1, 2, 3... (infinite values)
Answer: None determined from statements alone
Together: x²=25 AND x>0 → x=5 uniquely → Answer: C`,
    notes: [
      'You need a UNIQUE answer — not just any answer',
      'Check each statement independently first, then together',
      'A definite "No" to the question still counts as sufficient',
      'Equations with 2 unknowns need 2 independent equations to be sufficient',
    ],
    practice: {
      title: 'Data Sufficiency Practice',
      description: 'Is integer n odd? Statement 1: n/2 is not an integer. Statement 2: n − 1 is even. Determine which statements are sufficient.',
      startCode: '',
      hint: 'Statement 1: n/2 not integer means n is odd. Statement 2: n-1 even means n is odd.',
      solution: '# Statement 1: n/2 not integer → n is NOT divisible by 2 → n is ODD → Sufficient\n# Statement 2: n-1 is even → n = even+1 = odd → Sufficient\n# Answer: D — Each statement alone is sufficient\nprint("Answer: D")\nprint("Both statements independently prove n is odd")',
    },
  },

  {
    id: 'apt-statement-conclusions',
    category: 'Advanced — Reasoning',
    title: 'Statement & Conclusions',
    difficulty: 'Advanced',
    theory: [
      'A conclusion is a logical deduction drawn from a given statement — it must follow DIRECTLY and DEFINITELY from the statement.',
      'Difference from assumptions: Assumptions are implied premises (what is taken for granted before the statement). Conclusions are derived outcomes.',
      'A conclusion is valid only if it necessarily follows — not just probably or possibly.',
      'Negative conclusions: Even a definite "No" can be a valid conclusion if it directly follows from the statement.',
      'Key test: Can the conclusion be false while the statement is true? If yes, the conclusion does NOT follow.',
    ],
    code: `# Statement and Conclusions Framework

def evaluate_conclusions(statement, conclusions):
    print(f"Statement: {statement}")
    print()
    for i, (conclusion, follows, reason) in enumerate(conclusions, 1):
        marker = "✅" if follows else "❌"
        print(f"Conclusion {i}: {conclusion}")
        print(f"  {marker} {'Follows' if follows else 'Does not follow'} — {reason}")
        print()

# Example 1
evaluate_conclusions(
    statement="Most employees in Company X prefer remote work.",
    conclusions=[
        ("Some employees in Company X prefer remote work.",
         True, "If MOST prefer it, then SOME definitely do (subset)"),
        ("All employees in Company X prefer remote work.",
         False, "MOST does not mean ALL — some may prefer office"),
        ("Company X allows remote work.",
         False, "Preference doesn't prove the company allows it — not directly stated"),
    ]
)`,
    output: `Statement: Most employees in Company X prefer remote work.

Conclusion 1: Some employees in Company X prefer remote work.
  ✅ Follows — If MOST prefer it, then SOME definitely do (subset)

Conclusion 2: All employees in Company X prefer remote work.
  ❌ Does not follow — MOST does not mean ALL — some may prefer office

Conclusion 3: Company X allows remote work.
  ❌ Does not follow — Preference doesn't prove the company allows it — not directly stated`,
    notes: [
      '"Most" → "Some" always follows. "Most" → "All" never follows',
      'Conclusion must be CERTAIN, not just likely',
      'Do not use outside knowledge — base only on the statement',
      'If two conclusions contradict each other, at most one can follow',
    ],
    practice: {
      title: 'Statement & Conclusions',
      description: 'Statement: "All birds can fly. Penguins are birds." Conclusions: I) Penguins can fly. II) Some birds cannot fly. Which conclusion(s) follow from the statement alone?',
      startCode: '',
      hint: 'Take statements as 100% true. "All birds can fly" means penguins fly (Conclusion I follows). Conclusion II contradicts the statement.',
      solution: '# Taking statements as absolute truth:\n# "All birds can fly" + "Penguins are birds" → Penguins can fly\nprint("Conclusion I: FOLLOWS (direct deduction from All + Penguin is a bird)")\nprint("Conclusion II: DOES NOT FOLLOW (contradicts the given universal statement)")\nprint("Answer: Only Conclusion I follows")',
    },
  },

  {
    id: 'apt-critical-reasoning',
    category: 'Advanced — Verbal',
    title: 'Critical Reasoning',
    difficulty: 'Advanced',
    theory: [
      'Critical reasoning tests evaluate arguments: statements of conclusion supported by premise(s).',
      'Strengthen/Weaken: Find the assumption, then find which option supports or attacks it.',
      'Assumption: Unstated premise necessary for the argument to hold.',
      'Conclusion: The main claim being made. Premise: Evidence/reasons supporting the conclusion.',
      'Common flaws: Hasty generalization, false cause, circular reasoning, ad hominem.',
    ],
    code: `# Critical Reasoning Framework

def analyze_argument(premise, conclusion, options):
    """Template for critical reasoning analysis"""
    print("PREMISE:", premise)
    print("CONCLUSION:", conclusion)
    print()

    for option_type, option in options.items():
        print(f"[{option_type}]", option)
        if option_type == "STRENGTHENS":
            print("  → Supports the assumption or provides more evidence")
        elif option_type == "WEAKENS":
            print("  → Attacks the assumption or provides counter-evidence")
        elif option_type == "ASSUMPTION":
            print("  → The unstated premise the argument depends on")
        print()

argument = {
    "premise": "All students who study regularly get good grades.",
    "conclusion": "Ravi got good grades; therefore, Ravi studied regularly.",
    "options": {
        "STRENGTHENS": "Multiple teachers confirm Ravi attended all study sessions.",
        "WEAKENS": "Ravi is naturally talented and never needs to study.",
        "ASSUMPTION": "Getting good grades requires regular study (no other path exists).",
        "FLAW": "Affirming the consequent — good grades don't ONLY come from regular study."
    }
}

analyze_argument(**argument)`,
    output: `PREMISE: All students who study regularly get good grades.
CONCLUSION: Ravi got good grades; therefore, Ravi studied regularly.

[STRENGTHENS] Multiple teachers confirm Ravi attended all study sessions.
  → Supports the assumption or provides more evidence

[WEAKENS] Ravi is naturally talented and never needs to study.
  → Attacks the assumption or provides counter-evidence

[ASSUMPTION] Getting good grades requires regular study (no other path exists).
  → The unstated premise the argument depends on

[FLAW] Affirming the consequent — good grades don't ONLY come from regular study.`,
    notes: ['Find the assumption first', 'Strengthen = support assumption or add evidence', 'Weaken = attack assumption or give alternative explanation'],
    practice: {
      title: 'Identify the Assumption',
      description: 'Argument: "This medicine reduces fever. So it will cure my cold." What is the unstated assumption? What weakens this argument?',
      startCode: '# Analyze the argument\n# Premise: Medicine reduces fever\n# Conclusion: Will cure my cold\n# What is assumed? What can weaken it?\n',
      solution: 'print("Assumption: Cold is caused by/linked to fever (false)")\nprint("Weakens: Cold is a viral infection; fever reduction ≠ curing cold")\nprint("Flaw: Treating a symptom (fever) doesn\'t cure the root cause (virus)")',
      hint: 'The argument assumes curing fever = curing cold. This is the unstated (wrong) assumption.',
    },
  },
];
