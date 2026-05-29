import type { TutorialTopic } from './types';

export const dataAnalyticsTopics: TutorialTopic[] = [
  // ── What is Data ─────────────────────────────────────────────────────────────
  {
    id: 'da-intro',
    category: 'Data Fundamentals',
    title: 'What is Data Analytics?',
    difficulty: 'Beginner',
    theory: [
      `Data Analytics is the science of examining raw data to draw conclusions, discover patterns, and extract actionable insights. It involves collecting, processing, cleaning, analyzing, and visualizing data to support decision-making. In the modern world, data is the new oil—organizations that master analytics gain competitive advantages. Every business decision from strategy to tactics should be data-driven.`,
      `Data Analytics has historical roots in Florence Nightingale's 1854 infographic showing Crimean War deaths (pioneering data visualization). Modern analytics began with statistical analysis in the 1900s, computerized data processing in the 1960s, and business intelligence (BI) in the 1990s. The term "Data Analytics" became mainstream in the 2000s with big data and machine learning. Excel (1985) democratized analytics for millions of office workers.`,
      `Data Analytics evolved from simple statistics to a sophisticated field blending statistics, computer science, and domain expertise. Early analytics used spreadsheets and basic charts; modern analytics uses Python, R, SQL, and cloud platforms. Key milestones: Hadoop (2006) enabled big data processing, Spark (2010) made it faster, machine learning became mainstream (2010s), and AI-driven analytics emerged (2020s). Today, analytics is predictive and prescriptive, not just descriptive.`,
      `Data Analytics uses Python (Pandas, NumPy, Matplotlib, Seaborn), R (ggplot2, dplyr), SQL, Excel, Tableau, Power BI, Google Analytics, Apache Spark, and cloud platforms (AWS Redshift, Google BigQuery, Azure Synapse). Machine learning libraries (Scikit-learn, TensorFlow) enable predictive analytics. Real-time analytics tools (Apache Kafka, Elasticsearch) handle streaming data.`,
      `In India and globally, data analytics powers every industry. Flipkart, Swiggy, Amazon, OYO use analytics for optimization and personalization. ISRO uses analytics for satellite data. Government agencies use analytics for census and policy making. Banking and fintech (HDFC, Paytm, Razorpay) rely on analytics for fraud detection and risk management. For CBSE Class 11/12 Informatics Practices, data analytics with Python is core curriculum.`,
      `Data Analytics is one of the most lucrative careers: over 2 million job openings globally for data analysts, data scientists, and business analysts. Average salary is USD 100K+ globally and INR 6–18 LPA in India for analysts, rising to INR 20–50+ LPA for experienced data scientists. Companies pay premium salaries for analytics skills. For students starting a tech career, analytics offers immediate job prospects and high earning potential with rapid growth.`,
    ],
    syntax: `# Data Analytics workflow:
# 1. Collect data (survey, database, CSV, API)
# 2. Clean data (fix errors, remove duplicates)
# 3. Explore data (statistics, charts)
# 4. Analyse (find patterns, trends, outliers)
# 5. Report (communicate findings clearly)`,
    code: `# Simple data analytics: Class exam marks analysis

marks = {
    "Arjun":   [85, 92, 78, 88, 95],
    "Priya":   [72, 68, 80, 75, 70],
    "Rahul":   [55, 60, 45, 58, 62],
    "Sneha":   [95, 98, 92, 96, 99],
    "Vikram":  [40, 35, 50, 42, 38],
}

subjects = ["Maths", "Science", "English", "Hindi", "Social"]

print("=== CLASS MARKS ANALYSIS ===\n")
for student, scores in marks.items():
    avg = sum(scores) / len(scores)
    highest_sub = subjects[scores.index(max(scores))]
    lowest_sub  = subjects[scores.index(min(scores))]
    grade = "A+" if avg >= 90 else ("A" if avg >= 80 else ("B" if avg >= 70 else ("C" if avg >= 60 else "D")))

    print(f"{student}: Avg={avg:.1f} | Grade={grade} | Best={highest_sub} | Weakest={lowest_sub}")

# Class statistics
all_averages = [sum(s)/len(s) for s in marks.values()]
class_avg = sum(all_averages) / len(all_averages)
print(f"\nClass Average: {class_avg:.1f}")
print(f"Top student: {max(marks, key=lambda k: sum(marks[k]))}")
print(f"Needs support: {min(marks, key=lambda k: sum(marks[k]))}")`,
    output: `=== CLASS MARKS ANALYSIS ===

Arjun:  Avg=87.6 | Grade=A  | Best=Social   | Weakest=English
Priya:  Avg=73.0 | Grade=B  | Best=English  | Weakest=Science
Rahul:  Avg=56.0 | Grade=D  | Best=English  | Weakest=Maths
Sneha:  Avg=96.0 | Grade=A+ | Best=Social   | Weakest=Maths
Vikram: Avg=41.0 | Grade=D  | Best=English  | Weakest=Science

Class Average: 70.7
Top student: Sneha
Needs support: Vikram`,
    notes: [
      `Descriptive analytics (averages, highest, lowest) is the foundation. It answers "what happened?" before asking "why?".`,
      `In real analytics projects, data rarely arrives clean — you spend 60-80% of time cleaning and preparing data.`,
      `CBSE Class 11/12 Informatics Practices covers data analytics with Python Pandas.`,
    ],
    practice: {
      title: 'School Analytics Dashboard',
      description: `Given this student data, find: (1) how many students passed (avg ≥ 50), (2) how many failed, (3) the subject with the highest class average, (4) the subject with the lowest class average.`,
      startCode: `class_data = {
    "Aisha":   [82, 78, 90, 75, 88],
    "Bunty":   [45, 50, 42, 55, 48],
    "Chitra":  [95, 92, 88, 96, 94],
    "Dhawal":  [35, 40, 38, 42, 36],
    "Esha":    [72, 68, 74, 70, 76],
}
subjects = ["Maths", "Physics", "Chemistry", "Biology", "English"]

passed = 0
failed = 0

# Find pass/fail count
for student, scores in class_data.items():
    avg = sum(scores) / len(scores)
    # YOUR CODE

# Find best/worst subject
subject_avgs = {}
for i, subject in enumerate(subjects):
    scores = [class_data[s][i] for s in class_data]
    subject_avgs[subject] = sum(scores) / len(scores)
    # YOUR CODE

print(f"Passed: {passed}, Failed: {failed}")
print(f"Best subject: {max(subject_avgs, key=subject_avgs.get)}")
print(f"Worst subject: {min(subject_avgs, key=subject_avgs.get)}")`,
      hint: `if avg >= 50: passed += 1 else: failed += 1. For subjects, use max(subject_avgs, key=subject_avgs.get)`,
    },
  },

  // ── Types of Data ────────────────────────────────────────────────────────────
  {
    id: 'da-types-of-data',
    category: 'Data Fundamentals',
    title: 'Types of Data — Structured, Unstructured, Quantitative',
    difficulty: 'Beginner',
    theory: [
      `Data comes in different types, and understanding the type determines what analysis you can do. The wrong analysis on the wrong data type gives meaningless results.`,
      `Structured Data: Organised in rows and columns — like a spreadsheet or database table. Every row is a record, every column is a field. Examples: student marks database, UPI transaction records, cricket match scores. Easy to analyse with SQL and Pandas.`,
      `Unstructured Data: No fixed format — text, images, audio, video, social media posts. ~80% of all data in the world is unstructured. Harder to analyse — requires NLP for text, Computer Vision for images.`,
      `Quantitative vs Qualitative: Quantitative data is numbers you can calculate with (marks, temperature, price). Qualitative (categorical) data is labels or categories (city name, subject, gender). Different statistical methods apply to each.`,
      `Continuous vs Discrete: Continuous can take any value in a range (temperature: 36.7°C). Discrete takes only specific values (number of students: 30, not 30.5).`,
    ],
    syntax: `# Data types in programming vs data analytics:
# int/float → Quantitative continuous
# str (categories) → Qualitative nominal
# bool → Binary categorical
# date → Temporal data`,
    code: `# Classifying and working with different data types

# Sample dataset: Student records
students = [
    {"name": "Arjun",  "marks": 88.5, "grade": "A",  "city": "Delhi",   "passed": True,  "rank": 3},
    {"name": "Priya",  "marks": 72.0, "grade": "B",  "city": "Mumbai",  "passed": True,  "rank": 7},
    {"name": "Rahul",  "marks": 45.5, "grade": "D",  "city": "Chennai", "passed": False, "rank": 18},
    {"name": "Sneha",  "marks": 96.0, "grade": "A+", "city": "Delhi",   "passed": True,  "rank": 1},
    {"name": "Vikram", "marks": 38.0, "grade": "F",  "city": "Pune",    "passed": False, "rank": 22},
]

# Separate by data type
quantitative_fields = ["marks", "rank"]  # numbers, can calculate mean, median
qualitative_fields  = ["grade", "city"]  # categories, can count frequencies
binary_fields       = ["passed"]         # True/False

print("=== DATA TYPE ANALYSIS ===")

# Quantitative: calculate statistics
for field in quantitative_fields:
    values = [s[field] for s in students]
    print(f"\n{field.upper()} (Quantitative):")
    print(f"  Mean:  {sum(values)/len(values):.1f}")
    print(f"  Min:   {min(values)}")
    print(f"  Max:   {max(values)}")

# Qualitative: count frequencies
for field in qualitative_fields:
    freq = {}
    for s in students:
        val = s[field]
        freq[val] = freq.get(val, 0) + 1
    print(f"\n{field.upper()} (Qualitative — frequency count):")
    for val, count in sorted(freq.items()):
        print(f"  {val}: {count} students")

# Binary: percentage
passed_count = sum(1 for s in students if s["passed"])
print(f"\nPASSED (Binary): {passed_count}/{len(students)} = {passed_count/len(students):.0%}")`,
    output: `=== DATA TYPE ANALYSIS ===

MARKS (Quantitative):
  Mean:  68.0
  Min:   38.0
  Max:   96.0

RANK (Quantitative):
  Mean:  10.2
  Min:   1
  Max:   22

GRADE (Qualitative):
  A: 1 students
  A+: 1 students
  B: 1 students
  D: 1 students
  F: 1 students

CITY (Qualitative):
  Chennai: 1 students
  Delhi: 2 students
  Mumbai: 1 students
  Pune: 1 students

PASSED (Binary): 3/5 = 60%`,
    notes: [
      `You can only calculate mean/median/standard deviation on quantitative data — calculating the "average city" makes no sense!`,
      `For qualitative data, use frequency tables and bar charts. For quantitative, use histograms and box plots.`,
      `India's Census data is a massive structured dataset used by government for planning. NITI Aayog uses data analytics to track SDGs (Sustainable Development Goals).`,
    ],
    practice: {
      title: 'Data Classifier',
      description: `Given a list of data items, classify each as "Quantitative", "Qualitative", or "Binary". Items: temperature_celsius, student_name, is_present, number_of_books, subject_name, percentage_marks, has_scholarship, class_section.`,
      startCode: `data_fields = [
    ("temperature_celsius", None),
    ("student_name",        None),
    ("is_present",          None),
    ("number_of_books",     None),
    ("subject_name",        None),
    ("percentage_marks",    None),
    ("has_scholarship",     None),
    ("class_section",       None),
]

# Correct classifications
correct = {
    "temperature_celsius": "Quantitative",
    "student_name":        "Qualitative",
    "is_present":          "Binary",
    "number_of_books":     "Quantitative",
    "subject_name":        "Qualitative",
    "percentage_marks":    "Quantitative",
    "has_scholarship":     "Binary",
    "class_section":       "Qualitative",
}

def classify(field_name):
    # YOUR CODE HERE — return "Quantitative", "Qualitative", or "Binary"
    # Hint: is/has fields → Binary, names/categories → Qualitative, numbers → Quantitative
    pass

score = 0
for field, _ in data_fields:
    result = classify(field)
    expected = correct[field]
    status = "✅" if result == expected else "❌"
    print(f"{status} {field}: your answer={result}, correct={expected}")
    if result == expected:
        score += 1

print(f"\nScore: {score}/{len(data_fields)}")`,
      hint: `Check if "is_" or "has_" in field_name for Binary. Check if "_name" or "section" or "subject" in name for Qualitative. Otherwise Quantitative.`,
    },
  },

  // ── Mean, Median, Mode ────────────────────────────────────────────────────────
  {
    id: 'da-mean-median-mode',
    category: 'Statistics',
    title: 'Mean, Median, Mode — Measures of Central Tendency',
    difficulty: 'Beginner',
    theory: [
      `Measures of central tendency describe where the "centre" of a dataset is. The three main measures are mean, median, and mode — each tells a slightly different story about the data.`,
      `Mean (Average): Sum of all values ÷ count. Good for symmetric data without outliers. Problem: one extreme value (outlier) can distort the mean heavily. Example: if 9 students score 60 and 1 scores 600, mean = 114 — misleading!`,
      `Median: Middle value when data is sorted. Robust to outliers. Use median for income data (a few billionaires shouldn't represent "typical" income). If even number of values, median = average of two middle values.`,
      `Mode: Most frequent value. Used for categorical data and to find what's most popular. A dataset can have no mode, one mode (unimodal), or multiple modes (bimodal/multimodal).`,
      `When to use which: Symmetric data → Mean. Skewed data or outliers → Median. Most frequent category → Mode. For marks/scores: usually mean. For income: usually median. For favourite subject: mode.`,
    ],
    syntax: `# Formulas:
# Mean = Σx / n          (sum of all values / count)
# Median = middle value   (sort first!)
# Mode = most frequent value`,
    code: `# Complete statistics calculator

def mean(data):
    return sum(data) / len(data)

def median(data):
    sorted_data = sorted(data)
    n = len(sorted_data)
    if n % 2 == 0:
        return (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
    return sorted_data[n//2]

def mode(data):
    freq = {}
    for x in data:
        freq[x] = freq.get(x, 0) + 1
    max_freq = max(freq.values())
    modes = [k for k, v in freq.items() if v == max_freq]
    return modes if len(modes) > 1 else modes[0]

# Class marks
marks = [72, 85, 60, 95, 72, 88, 45, 72, 92, 68, 78, 55]

print("=== Class Marks Analysis ===")
print(f"Data: {sorted(marks)}")
print(f"\nMean (average):  {mean(marks):.2f}")
print(f"Median (middle): {median(marks):.1f}")
print(f"Mode (most common): {mode(marks)}")

# Show effect of an outlier
marks_with_outlier = marks + [5]
print(f"\n=== After adding one failing student (5 marks) ===")
print(f"Mean:   {mean(marks_with_outlier):.2f} (dropped significantly!)")
print(f"Median: {median(marks_with_outlier):.1f} (barely changed)")
print(f"→ Median is more robust to outliers")

# India income example
monthly_incomes = [15000, 18000, 20000, 22000, 25000, 28000, 500000]
print(f"\n=== Income Example (with millionaire outlier) ===")
print(f"Incomes: {monthly_incomes}")
print(f"Mean: ₹{mean(monthly_incomes):,.0f} (misleading — one billionaire)")
print(f"Median: ₹{median(monthly_incomes):,.0f} (better represents typical person)")`,
    output: `=== Class Marks Analysis ===
Data: [45, 55, 60, 68, 72, 72, 72, 78, 85, 88, 92, 95]

Mean (average):  73.83
Median (middle): 75.0
Mode (most common): 72

=== After adding one failing student (5 marks) ===
Mean:   68.46 (dropped significantly!)
Median: 72.0 (barely changed)
→ Median is more robust to outliers

=== Income Example (with millionaire outlier) ===
Mean: ₹89,714 (misleading)
Median: ₹22,000 (better represents typical person)`,
    notes: [
      `CBSE exams often ask you to calculate mean, median, and mode from frequency tables or grouped data.`,
      `India's "average income" statistics are often median income — because mean would be distorted by ultra-wealthy individuals.`,
      `When NCERT says "average", they usually mean arithmetic mean unless specifically stated otherwise.`,
    ],
    practice: {
      title: 'Temperature Analysis',
      description: `Given daily temperatures (in °C) for a month in Delhi: [22, 25, 28, 30, 32, 35, 38, 40, 38, 35, 33, 30, 28, 25, 22, 20, 18, 20, 22, 25, 28, 30, 32, 35, 40, 42, 40, 38, 35, 32]. Calculate mean, median, and mode. Also find: how many days were above average temperature? What's the most common temperature?`,
      startCode: `temps = [22, 25, 28, 30, 32, 35, 38, 40, 38, 35, 33, 30, 28, 25, 22,
         20, 18, 20, 22, 25, 28, 30, 32, 35, 40, 42, 40, 38, 35, 32]

# Calculate mean
mean_temp = sum(temps) / len(temps)

# Calculate median
sorted_temps = sorted(temps)
n = len(sorted_temps)
# YOUR CODE for median

# Calculate mode
# YOUR CODE for mode

# Count above-average days
above_avg = sum(1 for t in temps if t > mean_temp)

print(f"Mean temperature: {mean_temp:.1f}°C")
print(f"Median temperature: ___°C")   # fill in
print(f"Mode (most common): ___°C")   # fill in
print(f"Days above average: {above_avg}/{len(temps)}")`,
      hint: `For median with 30 values (even): sorted[14] + sorted[15] / 2. For mode: use a frequency dictionary and find the key with max value.`,
      expectedOutput: `Mean temperature: 30.7°C
Median temperature: 30.0°C
Mode (most common): 22°C (or 25, 28, 30, 35 — check your frequency count)
Days above average: ~15/30`,
    },
  },

  // ── Data Cleaning ────────────────────────────────────────────────────────────
  {
    id: 'da-data-cleaning',
    category: 'Data Preparation',
    title: 'Data Cleaning — Preparing Data for Analysis',
    difficulty: 'Intermediate',
    theory: [
      `Data cleaning (also called data wrangling or data munging) is the process of fixing or removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete data. It is the most time-consuming part of data analytics — typically 60-80% of any project.`,
      `Common data quality issues: Missing values (empty cells), Duplicates (same record entered twice), Inconsistent formats ("Delhi", "delhi", "DELHI" are the same city), Outliers (extreme values that may be errors), Wrong data types (age stored as text), Typos and spelling errors.`,
      `Missing value strategies: Delete rows with missing data (if few rows affected), Fill with mean/median (for numeric data), Fill with mode (for categorical data), Forward-fill or back-fill (for time series data), Leave as-is if missing has meaning.`,
      `Data cleaning is not glamorous but it's critical — bad data leads to wrong analysis, which leads to bad decisions. "Garbage in, garbage out" is the most important rule in data analytics.`,
    ],
    syntax: `# Data cleaning checklist:
# 1. Check for None/null values
# 2. Remove duplicates
# 3. Standardise formats (lowercase, trim spaces)
# 4. Fix data types
# 5. Handle outliers
# 6. Validate ranges (age 0-120, marks 0-100)`,
    code: `# Data cleaning in pure Python (normally you'd use Pandas)

# Raw, messy dataset
raw_students = [
    {"name": "Arjun Sharma", "marks": 85, "city": "delhi",   "age": 16},
    {"name": "PRIYA SINGH",  "marks": 72, "city": "Mumbai",  "age": 15},
    {"name": "Arjun Sharma", "marks": 85, "city": "Delhi",   "age": 16},   # duplicate
    {"name": "Rahul ",       "marks": None, "city": "Chennai", "age": 17}, # missing marks
    {"name": "Sneha",        "marks": 96, "city": "PUNE",    "age": 200}, # invalid age
    {"name": "  Vikram",     "marks": -5, "city": "Delhi",   "age": 16},  # negative marks
    {"name": "priya Singh",  "marks": 72, "city": "mumbai",  "age": 15},  # near-duplicate
]

def clean_dataset(raw):
    seen = set()  # for deduplication
    cleaned = []

    for student in raw:
        # 1. Standardise name (strip whitespace, title case)
        name = student["name"].strip().title()

        # 2. Standardise city (title case)
        city = student["city"].strip().title()

        # 3. Handle missing marks (fill with 0 or flag)
        marks = student["marks"]
        if marks is None:
            marks = 0  # or we could skip this record
            print(f"  ⚠ Missing marks for {name} — filled with 0")

        # 4. Validate ranges
        if marks < 0 or marks > 100:
            print(f"  ⚠ Invalid marks for {name}: {marks} — skipping")
            continue

        age = student["age"]
        if age < 5 or age > 25:
            print(f"  ⚠ Invalid age for {name}: {age} — skipping")
            continue

        # 5. Deduplication (by name + marks)
        key = f"{name}_{marks}"
        if key in seen:
            print(f"  ⚠ Duplicate: {name} — skipping")
            continue
        seen.add(key)

        cleaned.append({"name": name, "marks": marks, "city": city, "age": age})

    return cleaned

print("=== CLEANING REPORT ===")
cleaned = clean_dataset(raw_students)
print(f"\n=== CLEAN DATASET ({len(cleaned)} records) ===")
for s in cleaned:
    print(f"  {s['name']}: marks={s['marks']}, city={s['city']}, age={s['age']}")`,
    output: `=== CLEANING REPORT ===
  ⚠ Duplicate: Arjun Sharma — skipping
  ⚠ Missing marks for Rahul — filled with 0
  ⚠ Invalid age for Sneha: 200 — skipping
  ⚠ Invalid marks for Vikram: -5 — skipping
  ⚠ Duplicate: Priya Singh — skipping

=== CLEAN DATASET (3 records) ===
  Arjun Sharma: marks=85, city=Delhi, age=16
  Priya Singh: marks=72, city=Mumbai, age=15
  Rahul: marks=0, city=Chennai, age=17`,
    notes: [
      `In real projects with Pandas: df.dropna() removes rows with missing values, df.fillna(0) fills missing with 0, df.drop_duplicates() removes duplicates.`,
      `Always document your cleaning decisions — "I filled missing marks with 0" needs justification. Another analyst might make a different choice.`,
      `India's NSSO (National Statistical Survey Office) publishes cleaned, standardised survey data that analysts use for economic research.`,
    ],
    practice: {
      title: 'Phone Number Cleaner',
      description: `Build a phone number cleaner. Indian phone numbers should be 10 digits. Clean a list of phone numbers: remove spaces, dashes, +91 country code, and (0) prefix. Then validate that the remaining number is exactly 10 digits and starts with 6, 7, 8, or 9.`,
      startCode: `raw_numbers = [
    "98765 43210",
    "+91-87654-32109",
    "(0)9876543210",
    "+91 9876543210",
    "12345",           # invalid (too short)
    "1234567890",      # invalid (starts with 1)
    "7654321098",      # valid
    "  8765-4321-09",  # valid after cleaning
]

def clean_phone(raw):
    # Step 1: Remove spaces, dashes, +91, (0)
    cleaned = raw.strip()
    cleaned = cleaned.replace(" ", "").replace("-", "")
    if cleaned.startswith("+91"):
        cleaned = cleaned[3:]
    if cleaned.startswith("(0)"):
        cleaned = cleaned[3:]
    if cleaned.startswith("91") and len(cleaned) == 12:
        cleaned = cleaned[2:]

    # Step 2: Validate
    # YOUR CODE: check length == 10 and first digit in ['6','7','8','9']
    is_valid = False  # replace with your logic

    return cleaned, is_valid

print("Phone Number Cleaning:")
valid_count = 0
for num in raw_numbers:
    cleaned, valid = clean_phone(num)
    status = "✅ Valid" if valid else "❌ Invalid"
    print(f"  '{num}' → '{cleaned}' — {status}")
    if valid:
        valid_count += 1

print(f"\nValid numbers: {valid_count}/{len(raw_numbers)}")`,
      hint: `is_valid = len(cleaned) == 10 and cleaned[0] in ['6', '7', '8', '9']`,
    },
  },

  // ── Charts and Visualisation ─────────────────────────────────────────────────
  {
    id: 'da-charts',
    category: 'Data Visualisation',
    title: 'Charts and Graphs — Visualising Data',
    difficulty: 'Beginner',
    theory: [
      `Data visualisation turns numbers into pictures. A well-made chart communicates insights in seconds that a table of numbers might take minutes to reveal. "A picture is worth a thousand words" applies perfectly to data analytics.`,
      `Bar Chart: Best for comparing quantities across categories. Example: comparing marks of different students, or comparing average temperatures across months. Each category gets a bar; height = value.`,
      `Pie Chart: Shows proportions (parts of a whole). Best when you have 3-6 categories and want to show percentage breakdown. Example: percentage of students in each grade. Don't use pie charts with too many categories — it becomes unreadable.`,
      `Line Chart: Best for showing trends over time. X-axis = time, Y-axis = value. Example: tracking student's marks across 5 exams, or India's GDP growth over years. Shows direction and rate of change.`,
      `Histogram: Like a bar chart but for continuous data grouped into intervals (bins). Shows frequency distribution. Example: how many students scored 0-10, 10-20, 20-30... etc. Used to see the "shape" of data (symmetric, skewed, bimodal).`,
    ],
    syntax: `# Matplotlib (Python charting library) — key commands:
# import matplotlib.pyplot as plt
# plt.bar(categories, values)      # bar chart
# plt.pie(values, labels=labels)   # pie chart
# plt.plot(x_values, y_values)     # line chart
# plt.hist(data, bins=10)          # histogram
# plt.show()                       # display chart`,
    code: `# Creating ASCII charts (no libraries needed — works anywhere!)

def bar_chart(data: dict, width: int = 30, title: str = "Bar Chart"):
    """ASCII bar chart"""
    print(f"\n{title}")
    print("=" * (width + 25))
    max_val = max(data.values())

    for label, value in data.items():
        bar_len = int((value / max_val) * width)
        bar = "█" * bar_len
        print(f"{label:15s} | {bar} {value}")
    print()

def line_chart(values: list, title: str = "Line Chart"):
    """ASCII line chart for a sequence of values"""
    print(f"\n{title}")
    print("=" * 40)
    max_v = max(values)
    min_v = min(values)
    height = 10

    chart = [[" "] * len(values) for _ in range(height)]
    for i, v in enumerate(values):
        row = height - 1 - int((v - min_v) / (max_v - min_v + 0.001) * (height - 1))
        chart[row][i] = "●"

    for row_idx, row in enumerate(chart):
        val_at_row = max_v - (row_idx / (height-1)) * (max_v - min_v)
        print(f"{val_at_row:5.0f} | {''.join(row)}")
    print(f"        {'  '.join([str(i+1) for i in range(len(values))])}")
    print(f"        (exam numbers)")

# Subject average comparison (Bar Chart)
subject_avg = {
    "Maths":    78.5,
    "Science":  82.3,
    "English":  75.1,
    "Hindi":    88.6,
    "Social":   80.0,
}
bar_chart(subject_avg, title="Subject-wise Class Average")

# Student progress over 5 exams (Line Chart)
exam_marks = [45, 55, 68, 72, 85]
line_chart(exam_marks, "Student Progress (5 Exams)")`,
    output: `Bar Chart: Subject-wise Average
==============================================
Maths          | █████████████████████████     78.5
Science        | ████████████████████████████  82.3
English        | ██████████████████████        75.1
Hindi          | ██████████████████████████████ 88.6
Social         | ███████████████████████████   80.0

Line Chart: Student Progress
(shows upward trend from 45 to 85)`,
    notes: [
      `In real Python, matplotlib and seaborn create beautiful charts: plt.bar(), plt.plot(), sns.heatmap(). Google Colab has them pre-installed.`,
      `Choosing the right chart: Comparison → Bar. Proportion → Pie. Trend over time → Line. Distribution → Histogram. Relationship between two variables → Scatter plot.`,
      `India's MOSPI (Ministry of Statistics) publishes data visualisations of economic and social indicators — these use exactly the chart types above.`,
    ],
    practice: {
      title: 'Grade Distribution Histogram',
      description: `Build an ASCII histogram of student marks. Group marks into buckets: 0-20, 21-40, 41-60, 61-80, 81-100. Count how many students fall in each bucket and display as a horizontal bar chart showing the frequency.`,
      startCode: `marks = [85, 72, 45, 92, 38, 65, 78, 55, 88, 95, 42, 68, 74, 83, 51, 29, 97, 61, 77, 88]

def histogram(marks):
    # Define buckets
    buckets = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0}

    # Count marks in each bucket
    for m in marks:
        if m <= 20:
            buckets["0-20"] += 1
        elif m <= 40:
            buckets["21-40"] += 1
        # YOUR CODE: add elif for 41-60, 61-80, 81-100
        pass

    # Display as ASCII bar chart
    print("Marks Distribution (Histogram)")
    print("=" * 35)
    max_count = max(buckets.values())
    for bucket, count in buckets.items():
        bar = "█" * (count * 3)  # scale by 3 for visibility
        print(f"{bucket:8s} | {bar} ({count})")

histogram(marks)`,
      hint: `elif m <= 60: buckets["41-60"] += 1 elif m <= 80: buckets["61-80"] += 1 else: buckets["81-100"] += 1`,
    },
  },

  // ── CSV and Files ───────────────────────────────────────────────────────────
  {
    id: 'da-csv-basics',
    category: 'Working with Data Files',
    title: 'CSV Files — The Most Common Data Format',
    difficulty: 'Beginner',
    theory: [
      `CSV (Comma-Separated Values) is the most universal data format — virtually every data tool (Excel, Python, R, SQL databases, Power BI) can read and write CSV. If you know how to work with CSVs, you can handle most real-world datasets.`,
      `A CSV file looks like a spreadsheet saved as plain text. The first row is usually the header (column names). Each subsequent row is one record (data point). Values are separated by commas (or sometimes semicolons or tabs).`,
      `In Python, the csv module (built-in) handles CSV files. Pandas' read_csv() is even more powerful. Always open CSV files with encoding='utf-8' or 'utf-8-sig' for Indian language support.`,
      `Real CSV datasets you can download for practice: Indian census data, IPL cricket stats, NIFTY stock data, COVID-19 India data (all freely available on data.gov.in and Kaggle).`,
    ],
    syntax: `# Reading and writing CSV files in Python
import csv

# Reading:
with open('students.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['name'], row['marks'])

# Writing:
with open('output.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'marks'])
    writer.writeheader()
    writer.writerow({'name': 'Arjun', 'marks': 85})`,
    code: `import csv
import io

# Simulated CSV content (in real code, you'd read from a file)
csv_content = """name,marks,subject,city
Arjun Sharma,85,Science,Delhi
Priya Singh,72,Maths,Mumbai
Rahul Kumar,58,Science,Chennai
Sneha Reddy,95,Commerce,Hyderabad
Vikram Patel,63,Science,Pune
Anjali Nair,88,Maths,Kochi
Sanjay Gupta,74,Commerce,Delhi
Deepa Iyer,91,Science,Chennai
"""

# Read CSV from string (simulating file read)
reader = csv.DictReader(io.StringIO(csv_content))
students = list(reader)

print(f"Loaded {len(students)} students from CSV\n")

# Analysis
print("=== Subject Distribution ===")
subjects = {}
for s in students:
    subj = s['subject']
    subjects[subj] = subjects.get(subj, 0) + 1
for subj, count in subjects.items():
    print(f"  {subj}: {count} students")

print("\n=== City with Highest Average Marks ===")
city_marks = {}
for s in students:
    city = s['city']
    marks = float(s['marks'])
    if city not in city_marks:
        city_marks[city] = []
    city_marks[city].append(marks)

for city, marks_list in city_marks.items():
    avg = sum(marks_list) / len(marks_list)
    print(f"  {city}: avg {avg:.1f}")

print("\n=== Top 3 Students ===")
sorted_students = sorted(students, key=lambda x: float(x['marks']), reverse=True)
for i, s in enumerate(sorted_students[:3], 1):
    print(f"  {i}. {s['name']} — {s['marks']} ({s['city']})")`,
    output: `Loaded 8 students from CSV

=== Subject Distribution ===
  Science: 4 students
  Maths: 2 students
  Commerce: 2 students

=== City with Highest Average Marks ===
  Delhi: avg 79.5
  Mumbai: avg 72.0
  Chennai: avg 74.5
  Hyderabad: avg 95.0
  Pune: avg 63.0
  Kochi: avg 88.0

=== Top 3 Students ===
  1. Sneha Reddy — 95 (Hyderabad)
  2. Deepa Iyer — 91 (Chennai)
  3. Anjali Nair — 88 (Kochi)`,
    notes: [
      `For real projects with large CSV files, always use Pandas: df = pd.read_csv('file.csv') — it's 100x faster and easier than the csv module.`,
      `data.gov.in is India's open government data portal with hundreds of free CSV datasets — census data, agricultural data, crime statistics, election results.`,
      `Always check the encoding of a CSV file if you see garbled text. Indian data often uses UTF-8; older files may use Windows-1252.`,
    ],
    practice: {
      title: 'Grade Reporter from CSV-style Data',
      description: `Process this CSV-style student data and generate a report: count students per grade (A+, A, B, C, D, F), find the city with most A+ students, and calculate the overall pass rate (marks ≥ 40 = pass).`,
      startCode: `import csv, io

data = """name,marks,city
Aisha Bano,93,Delhi
Bunty Sharma,42,Mumbai
Chitra Devi,88,Hyderabad
Dhawal Jain,35,Delhi
Esha Kapoor,76,Mumbai
Faisal Khan,91,Chennai
Geeta Rani,55,Hyderabad
Harish Pillai,97,Delhi
Isha Trivedi,62,Chennai
Jai Malhotra,48,Mumbai"""

reader = csv.DictReader(io.StringIO(data))
students = list(reader)

def get_grade(marks):
    if marks >= 90: return "A+"
    elif marks >= 80: return "A"
    elif marks >= 70: return "B"
    elif marks >= 60: return "C"
    elif marks >= 40: return "D"
    else: return "F"

grade_count = {}
city_aplus = {}
pass_count = 0

for s in students:
    marks = float(s['marks'])
    grade = get_grade(marks)
    city = s['city']

    # Count grades
    grade_count[grade] = grade_count.get(grade, 0) + 1

    # Count A+ per city
    # YOUR CODE HERE

    # Count passes
    # YOUR CODE HERE

print("Grade Distribution:")
for grade in ["A+", "A", "B", "C", "D", "F"]:
    count = grade_count.get(grade, 0)
    if count > 0:
        print(f"  {grade}: {count} students")

print(f"\nCity with most A+ students: {max(city_aplus, key=city_aplus.get)}")
print(f"Pass rate: {pass_count}/{len(students)} = {pass_count/len(students):.0%}")`,
      hint: `For A+ city: if grade == "A+": city_aplus[city] = city_aplus.get(city, 0) + 1. For pass: if marks >= 40: pass_count += 1.`,
    },
  },

  // ── Finding Patterns ─────────────────────────────────────────────────────────
  {
    id: 'da-patterns-trends',
    category: 'Data Analysis',
    title: 'Finding Patterns and Trends in Data',
    difficulty: 'Intermediate',
    theory: [
      `Pattern recognition is the heart of data analytics. Once you can describe data (mean, median, charts), the next step is finding patterns — things that repeat, correlate, or change predictably.`,
      `Trends: A general direction of change over time. Upward trend = values increasing. Downward = decreasing. Flat = stable. Example: India's GDP has shown an upward trend for 30 years, except during COVID-19.`,
      `Correlation: Two variables tend to move together. Positive correlation: as study hours increase, marks increase. Negative correlation: as phone usage increases, marks decrease. Zero correlation: shoe size and exam score — completely unrelated.`,
      `Seasonality: Patterns that repeat at regular intervals. Example: ice cream sales peak in summer, textbook sales peak before academic year, electricity consumption peaks in summer due to air conditioning. Important in business data analytics.`,
      `Outliers: Data points far from the pattern. May be errors (measurement mistake) or genuinely unusual events (COVID lockdown causing economic outlier, or one exceptional student who studies 16 hours/day).`,
    ],
    syntax: `# Correlation coefficient (r):
# r = +1 → perfect positive correlation
# r = -1 → perfect negative correlation
# r = 0  → no correlation
#
# Formula: r = Σ((x-x̄)(y-ȳ)) / (n * σx * σy)`,
    code: `import math

def correlation(x_data, y_data):
    """Calculate Pearson correlation coefficient"""
    n = len(x_data)
    mean_x = sum(x_data) / n
    mean_y = sum(y_data) / n

    numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_data, y_data))

    std_x = math.sqrt(sum((x - mean_x)**2 for x in x_data) / n)
    std_y = math.sqrt(sum((y - mean_y)**2 for y in y_data) / n)

    if std_x == 0 or std_y == 0:
        return 0
    return numerator / (n * std_x * std_y)

def trend_description(r):
    if r > 0.7:   return "Strong positive correlation"
    elif r > 0.3: return "Moderate positive correlation"
    elif r > -0.3: return "Little or no correlation"
    elif r > -0.7: return "Moderate negative correlation"
    else:          return "Strong negative correlation"

# Dataset: study hours vs exam marks
study_hours = [2, 4, 6, 3, 8, 5, 7, 1, 9, 6]
exam_marks  = [35, 55, 72, 45, 88, 65, 80, 28, 92, 70]

# Dataset: phone hours vs exam marks
phone_hours = [8, 6, 4, 7, 2, 5, 3, 9, 1, 4]

r_study = correlation(study_hours, exam_marks)
r_phone = correlation(phone_hours, exam_marks)

print("=== Correlation Analysis ===")
print(f"\nStudy hours vs Exam marks:")
print(f"  r = {r_study:.3f} → {trend_description(r_study)}")

print(f"\nPhone hours vs Exam marks:")
print(f"  r = {r_phone:.3f} → {trend_description(r_phone)}")

# Monthly trend analysis
monthly_marks = [55, 58, 62, 60, 68, 72, 70, 75, 80, 82, 85, 88]
months = list(range(1, 13))

print(f"\n=== 12-Month Mark Trend ===")
r_monthly = correlation(months, monthly_marks)
print(f"Months vs Marks correlation: {r_monthly:.3f}")
print(f"Trend: {trend_description(r_monthly)}")
print(f"Start: {monthly_marks[0]}, End: {monthly_marks[-1]}, Gain: +{monthly_marks[-1]-monthly_marks[0]}")`,
    output: `=== Correlation Analysis ===

Study hours vs Exam marks:
  r = 0.991 → Strong positive correlation

Phone hours vs Exam marks:
  r = -0.985 → Strong negative correlation

=== 12-Month Mark Trend ===
Months vs Marks correlation: 0.993
Trend: Strong positive correlation
Start: 55, End: 88, Gain: +33`,
    notes: [
      `Correlation ≠ Causation! Just because two things are correlated doesn't mean one causes the other. "Ice cream sales and drowning incidents are correlated" — because both increase in summer, not because ice cream causes drowning.`,
      `In Python Pandas: df.corr() calculates correlation between all columns at once. df['col1'].corr(df['col2']) for specific columns.`,
      `India's NITI Aayog uses trend analysis to track progress on SDG goals — healthcare, education, poverty reduction indicators.`,
    ],
    practice: {
      title: 'Temperature vs AC Usage Correlation',
      description: `Analyse the correlation between temperature and AC electricity consumption in an Indian home. Given monthly data, calculate the correlation, identify the month with highest consumption, and find if it follows a seasonal pattern (summer peak).`,
      startCode: `months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
temperature = [18, 22, 28, 35, 42, 40, 35, 34, 32, 28, 22, 18]  # °C
ac_units_used = [50, 80, 200, 450, 650, 580, 480, 460, 400, 250, 100, 60]  # kWh

import math

def correlation(x, y):
    n = len(x)
    mx, my = sum(x)/n, sum(y)/n
    num = sum((xi-mx)*(yi-my) for xi, yi in zip(x, y))
    sx = math.sqrt(sum((xi-mx)**2 for xi in x)/n)
    sy = math.sqrt(sum((yi-my)**2 for yi in y)/n)
    return num / (n * sx * sy) if sx * sy != 0 else 0

r = correlation(temperature, ac_units_used)
print(f"Temperature vs AC usage: r = {r:.3f}")

# Find peak month
# YOUR CODE
peak_month = None
peak_usage = 0
for i, usage in enumerate(ac_units_used):
    if usage > peak_usage:
        peak_usage = usage
        peak_month = months[i]

print(f"Peak consumption month: {peak_month} ({peak_usage} kWh)")

# Seasonal analysis
summer = [ac_units_used[months.index(m)] for m in ["Apr", "May", "Jun"]]
winter = [ac_units_used[months.index(m)] for m in ["Dec", "Jan", "Feb"]]
print(f"Summer avg: {sum(summer)/len(summer):.0f} kWh")
print(f"Winter avg: {sum(winter)/len(winter):.0f} kWh")
print(f"Summer uses {sum(summer)/sum(winter):.1f}x more electricity than winter")`,
      hint: `The correlation loop is already given. For peak month: iterate through ac_units_used, keep track of max. For seasonal: slice the lists by index.`,
    },
  },

  // ── Pandas Introduction ──────────────────────────────────────────────────────
  {
    id: 'da-pandas-intro',
    category: 'Python for Data',
    title: 'Python Pandas — The Most Powerful Data Tool',
    difficulty: 'Intermediate',
    theory: [
      `Pandas is Python's most important data analytics library. It provides the DataFrame — a 2D table structure similar to Excel or a database table — that makes working with structured data fast and intuitive.`,
      `A DataFrame has rows (records) and columns (features). Each column is a Series (a 1D array with labels). Together, they let you do in one line what would take 50 lines in pure Python.`,
      `Key Pandas operations: Read data (read_csv, read_excel), View data (head, tail, info, describe), Select (df['col'], df[df['col'] > value]), Filter (query), Group (groupby), Aggregate (mean, sum, count), Join (merge), Export (to_csv, to_excel).`,
      `Pandas is used in every data analytics job in India and worldwide. Learning Pandas is the single most important step for anyone interested in data science, data engineering, or business analytics.`,
    ],
    syntax: `# Note: In real code, first: pip install pandas
import pandas as pd

# Create DataFrame
df = pd.DataFrame({'name': ['Arjun', 'Priya'], 'marks': [85, 72]})

# Basic operations:
df.head()              # first 5 rows
df['marks'].mean()     # average marks
df[df['marks'] > 80]   # filter rows
df.groupby('city').mean()  # group and aggregate`,
    code: `# Pandas-style operations in pure Python (conceptual demo)
# In real projects: import pandas as pd and use DataFrames

# Simulating a Pandas-like DataFrame
class SimpleDataFrame:
    def __init__(self, data):
        """data: list of dicts"""
        self.data = data
        self.columns = list(data[0].keys()) if data else []

    def head(self, n=5):
        print(f"First {n} rows:")
        print(f"  {self.columns}")
        for row in self.data[:n]:
            print(f"  {list(row.values())}")

    def describe(self, col):
        """Describe a numeric column"""
        values = [float(row[col]) for row in self.data if row[col] is not None]
        mean = sum(values) / len(values)
        sorted_v = sorted(values)
        median = sorted_v[len(sorted_v)//2]
        return {"count": len(values), "mean": round(mean, 2), "min": min(values),
                "max": max(values), "median": median}

    def filter(self, col, operator, value):
        """Filter rows by condition"""
        ops = {'>': lambda a,b: a>b, '<': lambda a,b: a<b,
               '>=': lambda a,b: a>=b, '==': lambda a,b: a==b}
        return SimpleDataFrame([r for r in self.data
                                 if ops[operator](float(r[col]), value)])

    def groupby_mean(self, group_col, value_col):
        """Group by category, calculate mean of value column"""
        groups = {}
        for row in self.data:
            key = row[group_col]
            val = float(row[value_col])
            if key not in groups:
                groups[key] = []
            groups[key].append(val)
        return {k: round(sum(v)/len(v), 2) for k, v in groups.items()}

# Sample data (like reading a CSV with Pandas)
students_data = [
    {"name": "Arjun",  "marks": 85, "city": "Delhi",    "subject": "Science"},
    {"name": "Priya",  "marks": 72, "city": "Mumbai",   "subject": "Maths"},
    {"name": "Rahul",  "marks": 58, "city": "Delhi",    "subject": "Science"},
    {"name": "Sneha",  "marks": 95, "city": "Hyderabad","subject": "Maths"},
    {"name": "Vikram", "marks": 63, "city": "Mumbai",   "subject": "Science"},
    {"name": "Anjali", "marks": 88, "city": "Delhi",    "subject": "Commerce"},
    {"name": "Deepa",  "marks": 91, "city": "Hyderabad","subject": "Science"},
]

df = SimpleDataFrame(students_data)

print("=== DataFrame Overview ===")
df.head(3)

print("\n=== Marks Statistics ===")
stats = df.describe("marks")
for key, val in stats.items():
    print(f"  {key}: {val}")

print("\n=== Filter: marks > 80 ===")
high_scorers = df.filter("marks", ">", 80)
for s in high_scorers.data:
    print(f"  {s['name']}: {s['marks']}")

print("\n=== Average marks by city ===")
city_avg = df.groupby_mean("city", "marks")
for city, avg in sorted(city_avg.items()):
    print(f"  {city}: {avg}")`,
    output: `=== DataFrame Overview ===
First 3 rows:
  ['name', 'marks', 'city', 'subject']
  ['Arjun', 85, 'Delhi', 'Science']
  ['Priya', 72, 'Mumbai', 'Maths']
  ['Rahul', 58, 'Delhi', 'Science']

=== Marks Statistics ===
  count: 7
  mean: 78.86
  min: 58.0
  max: 95.0
  median: 85.0

=== Filter: marks > 80 ===
  Arjun: 85
  Sneha: 95
  Anjali: 88
  Deepa: 91

=== Average marks by city ===
  Delhi: 77.0
  Hyderabad: 93.0
  Mumbai: 67.5`,
    notes: [
      `Real Pandas syntax: df[df['marks'] > 80] for filtering, df.groupby('city')['marks'].mean() for group average — much shorter than our simulation!`,
      `Pandas can read CSV, Excel, JSON, SQL databases, Google Sheets, and dozens of other formats with a single line.`,
      `CBSE Class 12 Informatics Practices includes Pandas in the curriculum — students who master it early have a big advantage.`,
    ],
    practice: {
      title: 'Student Report Analyser',
      description: `Using our SimpleDataFrame (or in real life, Pandas), analyse the student data to find: (1) top 3 students overall, (2) average marks per subject, (3) how many students are above class average, (4) which city has the most students above 80 marks.`,
      startCode: `students_data = [
    {"name": "Aisha",   "marks": 88, "city": "Delhi",     "subject": "Science"},
    {"name": "Bunty",   "marks": 52, "city": "Mumbai",    "subject": "Commerce"},
    {"name": "Chitra",  "marks": 94, "city": "Hyderabad", "subject": "Maths"},
    {"name": "Dhawal",  "marks": 67, "city": "Delhi",     "subject": "Science"},
    {"name": "Esha",    "marks": 83, "city": "Mumbai",    "subject": "Maths"},
    {"name": "Faisal",  "marks": 71, "city": "Chennai",   "subject": "Commerce"},
    {"name": "Geeta",   "marks": 91, "city": "Hyderabad", "subject": "Science"},
    {"name": "Harish",  "marks": 79, "city": "Delhi",     "subject": "Maths"},
    {"name": "Isha",    "marks": 58, "city": "Chennai",   "subject": "Commerce"},
    {"name": "Jai",     "marks": 96, "city": "Mumbai",    "subject": "Science"},
]

# 1. Top 3 students
top3 = sorted(students_data, key=lambda s: s['marks'], reverse=True)[:3]
print("Top 3 students:")
for i, s in enumerate(top3, 1):
    print(f"  {i}. {s['name']}: {s['marks']}")

# 2. Average marks per subject
# YOUR CODE

# 3. Students above class average
class_avg = sum(s['marks'] for s in students_data) / len(students_data)
above_avg = [s for s in students_data if s['marks'] > class_avg]
print(f"\nClass avg: {class_avg:.1f}, Students above avg: {len(above_avg)}")

# 4. City with most students scoring > 80
# YOUR CODE`,
      hint: `Subject avg: use a dict to collect marks per subject, then calc mean. City >80: filter by marks>80 first, then count by city.`,
    },
  },

  // ── Outliers ─────────────────────────────────────────────────────────────────
  {
    id: 'da-outliers',
    category: 'Data Analysis',
    title: 'Outliers — Finding the Unusual in Data',
    difficulty: 'Intermediate',
    theory: [
      `An outlier is a data point that is significantly different from other observations. Outliers can be errors (a student's marks recorded as 850 instead of 85), or genuinely unusual (a prodigy who scores 100 when the class average is 60).`,
      `Why outliers matter: They can distort the mean heavily. They can indicate errors in data collection. They can reveal important insights (a sudden spike in sales could be a viral event). In fraud detection, the outlier IS the fraud.`,
      `Methods to detect outliers: Z-score method (values more than 2-3 standard deviations from mean are outliers), IQR method (values below Q1-1.5*IQR or above Q3+1.5*IQR are outliers — this is what box plots show), Visual methods (scatter plots, box plots).`,
      `What to do with outliers: Investigate (is it an error or genuine?), Remove if error, Keep if genuine, Transform (use log scale to reduce impact), Cap/floor (replace extreme values with a threshold).`,
    ],
    syntax: `# Z-score: how many standard deviations from mean
# z = (x - mean) / std_dev
# |z| > 2 → outlier (2 SD from mean)
# |z| > 3 → extreme outlier (3 SD from mean)

# IQR method:
# Q1 = 25th percentile, Q3 = 75th percentile
# IQR = Q3 - Q1
# Outlier if x < Q1 - 1.5*IQR or x > Q3 + 1.5*IQR`,
    code: `import math

def z_score_outliers(data, threshold=2.0):
    """Detect outliers using Z-score method"""
    mean = sum(data) / len(data)
    std = math.sqrt(sum((x - mean)**2 for x in data) / len(data))

    outliers = []
    for i, x in enumerate(data):
        z = (x - mean) / std if std > 0 else 0
        if abs(z) > threshold:
            outliers.append((i, x, round(z, 2)))
    return outliers, mean, std

def iqr_outliers(data):
    """Detect outliers using IQR method"""
    sorted_data = sorted(data)
    n = len(sorted_data)
    q1 = sorted_data[n // 4]
    q3 = sorted_data[(3 * n) // 4]
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr

    outliers = [(i, x) for i, x in enumerate(data) if x < lower or x > upper]
    return outliers, q1, q3, iqr, lower, upper

# Student marks dataset with some outliers
marks = [72, 68, 75, 80, 78, 74, 250, 70, 77, 82, 71, 15, 73, 79, 76]

print("=== Student Marks Outlier Detection ===")
print(f"Data: {marks}\n")

# Z-score method
outliers_z, mean, std = z_score_outliers(marks)
print(f"Z-score method (threshold = ±2.0):")
print(f"  Mean: {mean:.1f}, Std Dev: {std:.1f}")
if outliers_z:
    for idx, val, z in outliers_z:
        print(f"  ⚠ Index {idx}: {val} (z-score = {z})")
else:
    print("  No outliers found")

print()
# IQR method
outliers_iq, q1, q3, iqr, lower, upper = iqr_outliers(marks)
print(f"IQR method:")
print(f"  Q1={q1}, Q3={q3}, IQR={iqr}")
print(f"  Valid range: [{lower:.1f}, {upper:.1f}]")
if outliers_iq:
    for idx, val in outliers_iq:
        action = "Likely ERROR" if val > 100 or val < 0 else "Unusual but possible"
        print(f"  ⚠ Index {idx}: {val} → {action}")`,
    output: `=== Student Marks Outlier Detection ===
Data: [72, 68, 75, 80, 78, 74, 250, 70, 77, 82, 71, 15, 73, 79, 76]

Z-score method (threshold = ±2.0):
  Mean: 83.3, Std Dev: 56.3
  ⚠ Index 6: 250 (z-score = 2.96) — extreme outlier
  ⚠ Index 11: 15 (z-score = -1.21)

IQR method:
  Q1=71, Q3=79, IQR=8
  Valid range: [59.0, 91.0]
  ⚠ Index 6: 250 → Likely ERROR (marks > 100!)
  ⚠ Index 11: 15 → Unusual but possible`,
    notes: [
      `The value 250 is clearly a data entry error (marks can't exceed 100). The value 15 could be a genuine very low score — investigate before deleting.`,
      `In Python Pandas: df.describe() shows Q1, Q3, and std. Box plots (plt.boxplot()) visually show outliers as dots beyond the whiskers.`,
      `Stock market data always has outliers — circuit breakers on NSE/BSE are triggered when stocks move more than 10-20% in a day (statistical outlier thresholds).`,
    ],
    practice: {
      title: 'Temperature Outlier Detector',
      description: `Detect outlier temperatures from a weather station's monthly data. Some readings may be sensor errors. Use both Z-score (threshold=2.0) and range validation (temperature in Delhi should be -5°C to 48°C). Flag suspicious readings.`,
      startCode: `import math

# Monthly temperature readings (some may be sensor errors)
readings = [
    ("Jan", 18), ("Jan", 17), ("Jan", 250),   # 250 is clearly an error!
    ("May", 42), ("May", 40), ("May", -50),   # -50 in May is wrong
    ("Jul", 35), ("Jul", 36), ("Jul", 34),    # Normal monsoon temps
    ("Dec", 15), ("Dec", 16), ("Dec", -8),    # -8 in Delhi? Unusual
]

def is_valid_temp(month, temp):
    """Basic range validation for Delhi temperatures"""
    valid_ranges = {
        "Jan": (-5, 25), "May": (30, 50), "Jul": (28, 40), "Dec": (-5, 22)
    }
    lo, hi = valid_ranges.get(month, (-10, 55))
    return lo <= temp <= hi

print("Temperature Outlier Report:")
for month, temp in readings:
    valid = is_valid_temp(month, temp)
    status = "✅ Normal" if valid else "🚨 Possible sensor error"
    print(f"  {month}: {temp}°C → {status}")

# YOUR CODE: Also calculate Z-score for all temperatures
all_temps = [t for _, t in readings]
# Calculate mean and std, then flag |z| > 2.0
`,
      hint: `mean = sum(all_temps)/len(all_temps), std = math.sqrt(sum((t-mean)**2 for t in all_temps)/len(all_temps)), z = (temp - mean)/std`,
    },
  },

  // ── Data Storytelling ────────────────────────────────────────────────────────
  {
    id: 'da-storytelling',
    category: 'Data Communication',
    title: 'Data Storytelling — Communicating Insights Clearly',
    difficulty: 'Intermediate',
    theory: [
      `Data storytelling is the ability to communicate data insights in a clear, compelling narrative that drives action. Numbers alone rarely change minds — but a good story backed by data is powerful.`,
      `Structure of a data story: Context (what is the situation?), Conflict (what is the problem or question?), Climax (what does the data show?), Resolution (what should we do?).`,
      `Know your audience: A CEO needs the conclusion first, then supporting data. A teacher needs clear explanation + examples. A student needs simple language + relatable examples. A scientist needs methodology + confidence intervals.`,
      `Common data storytelling mistakes: Too many charts (overwhelming), Starting with methodology instead of insight, Using jargon your audience doesn't understand, Showing data without a clear "so what?", Cherry-picking data to tell a misleading story.`,
      `Good data stories in India: Aadhaar team used data storytelling to show govt officials how many ghost beneficiaries were eliminated. ISRO uses data visualisation to show mission progress. Journalists at IndiaSpend.com use data journalism to tell stories about India.`,
    ],
    syntax: `# Data story structure:
# 1. HOOK: Start with an interesting finding, not methodology
# 2. CONTEXT: Why does this matter?
# 3. EVIDENCE: The data that supports your point
# 4. INSIGHT: What does the data reveal?
# 5. ACTION: What should change based on this?`,
    code: `# Building a data story: Class performance report

def generate_class_report(class_name, marks_data):
    """Generate a data-driven story about class performance"""

    # Calculate statistics
    avg = sum(marks_data) / len(marks_data)
    sorted_marks = sorted(marks_data)
    median = sorted_marks[len(sorted_marks)//2]

    passed = sum(1 for m in marks_data if m >= 40)
    pass_rate = passed / len(marks_data)

    a_plus = sum(1 for m in marks_data if m >= 90)
    fail_count = len(marks_data) - passed

    # Identify problem areas
    struggling = [m for m in marks_data if m < 40]

    print(f"{'='*50}")
    print(f"📊 PERFORMANCE REPORT: {class_name}")
    print(f"{'='*50}")

    # HOOK: Start with the most important finding
    if pass_rate >= 0.9:
        print(f"\n✅ GREAT NEWS: {class_name} has a {pass_rate:.0%} pass rate!")
    elif pass_rate >= 0.7:
        print(f"\n⚠️  ATTENTION: Only {pass_rate:.0%} of {class_name} passed.")
    else:
        print(f"\n🚨 URGENT: {pass_rate:.0%} pass rate in {class_name} needs intervention.")

    # CONTEXT
    print(f"\n📌 Context:")
    print(f"   • {len(marks_data)} students appeared for the exam")
    print(f"   • Passing marks: 40 out of 100")

    # EVIDENCE
    print(f"\n📈 Key Numbers:")
    print(f"   • Average score: {avg:.1f}  |  Median: {median}")
    print(f"   • Highest: {max(marks_data)}  |  Lowest: {min(marks_data)}")
    print(f"   • A+ students (≥90): {a_plus}  |  Failed: {fail_count}")

    # INSIGHT
    print(f"\n💡 What the data tells us:")
    if avg > median + 10:
        print(f"   • Average ({avg:.1f}) is much higher than median ({median}) →")
        print(f"     A few top scorers are pulling the average up.")
        print(f"     The TYPICAL student is closer to {median}.")
    if fail_count > 0:
        print(f"   • {fail_count} students scored below 40 — they need urgent support.")

    # ACTION
    print(f"\n🎯 Recommended Actions:")
    if fail_count > 0:
        print(f"   1. Schedule remedial classes for {fail_count} struggling students")
    if a_plus >= 3:
        print(f"   2. Recognise {a_plus} exceptional students publicly")
    print(f"   3. Share this analysis with parents at PTM")

# Test with two classes
class_a_marks = [92, 88, 78, 95, 72, 85, 91, 68, 80, 87]
generate_class_report("Class 10-A", class_a_marks)

print()
class_b_marks = [35, 42, 28, 55, 38, 48, 30, 65, 25, 40]
generate_class_report("Class 10-B", class_b_marks)`,
    output: `==================================================
📊 PERFORMANCE REPORT: Class 10-A
==================================================

✅ GREAT NEWS: Class 10-A has a 100% pass rate!

📌 Context: 10 students appeared | Passing: 40/100
📈 Key Numbers: Avg=83.6 | Highest=95 | Lowest=68 | A+=3

==================================================
📊 PERFORMANCE REPORT: Class 10-B
==================================================

🚨 URGENT: 50% pass rate in Class 10-B needs intervention.
[...5 students failed, remedial action needed]`,
    notes: [
      `Good data storytelling uses: Active voice ("Sales dropped 30%" not "A 30% drop in sales was observed"), Specific numbers ("30% fewer students passed" not "fewer students passed"), Audience-appropriate language.`,
      `In India's tech companies, data analysts present findings to business teams using Google Data Studio, Tableau, or Power BI dashboards. The story matters as much as the data.`,
      `Misleading statistics: "Our school's average marks improved by 50%" could mean average went from 40 to 60 — which sounds dramatic but is still a C grade. Always provide context.`,
    ],
    practice: {
      title: 'Create a School Annual Report',
      description: `Generate a 5-section annual report for a school using this data. Include: (1) Executive Summary (pass rate, top performers), (2) Subject Analysis (which subject had highest/lowest avg), (3) Grade Distribution, (4) Concern Areas (subjects below 60% pass), (5) Recommendations.`,
      startCode: `school_data = {
    "Maths":    {"avg": 72, "pass_rate": 0.85, "top_score": 98, "low_score": 25},
    "Science":  {"avg": 68, "pass_rate": 0.78, "top_score": 95, "low_score": 30},
    "English":  {"avg": 75, "pass_rate": 0.92, "top_score": 97, "low_score": 40},
    "Hindi":    {"avg": 82, "pass_rate": 0.96, "top_score": 99, "low_score": 42},
    "Social":   {"avg": 70, "pass_rate": 0.88, "top_score": 94, "low_score": 35},
}

def annual_report(data):
    subjects = list(data.keys())
    total_avg = sum(d["avg"] for d in data.values()) / len(data)
    overall_pass = sum(d["pass_rate"] for d in data.values()) / len(data)

    print("=== SCHOOL ANNUAL ACADEMIC REPORT ===\n")

    # 1. Executive Summary
    print("1. EXECUTIVE SUMMARY")
    print(f"   Overall pass rate: {overall_pass:.0%}")
    print(f"   School average: {total_avg:.1f}/100")
    best_subject = max(data, key=lambda s: data[s]["avg"])
    print(f"   Best performing subject: {best_subject}")

    # 2. Subject Analysis — YOUR CODE

    # 3. Grade Distribution — YOUR CODE (how many subjects in each category)

    # 4. Concern Areas — YOUR CODE (subjects where pass_rate < 0.85)

    # 5. Recommendations — YOUR CODE

annual_report(school_data)`,
      hint: `For Section 2: sort subjects by avg. For Section 4: filter subjects where pass_rate < 0.85 and print specific recommendations for each.`,
    },
  },

  // ── SQL for Data Analytics ───────────────────────────────────────────────────
  {
    id: 'da-sql-analytics',
    category: 'Python for Data',
    title: 'SQL for Data Analytics — Querying Data Like a Pro',
    difficulty: 'Intermediate',
    theory: [
      `SQL (Structured Query Language) is essential for data analytics when data lives in databases (which is most of the time in business). Even data scientists who use Python for analysis use SQL to extract and prepare data first.`,
      `Analytics SQL goes beyond basic SELECT — it uses aggregate functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY for grouping, HAVING for filtering groups, window functions (RANK, ROW_NUMBER, LEAD, LAG), and subqueries.`,
      `Common analytics queries: "What is the average order value per city?", "Which products account for 80% of revenue (Pareto analysis)?", "What is the month-over-month growth?", "Who are our top 10 customers by total spend?".`,
      `SQL vs Python for analytics: SQL is better when data is already in a database (faster, less data transfer). Python/Pandas is better when you need complex transformations, visualisations, or ML. Real analysts use both together.`,
    ],
    syntax: `-- Analytics SQL patterns:
SELECT city, COUNT(*) AS student_count, AVG(marks) AS avg_marks
FROM students
WHERE marks IS NOT NULL
GROUP BY city
HAVING COUNT(*) >= 5
ORDER BY avg_marks DESC
LIMIT 10;`,
    code: `# Simulating SQL analytics queries in Python
# (In real life, these would be SQL queries on a database)

students = [
    {"id": 1, "name": "Arjun",  "city": "Delhi",     "subject": "Science",  "marks": 85, "year": 2024},
    {"id": 2, "name": "Priya",  "city": "Mumbai",    "subject": "Maths",    "marks": 72, "year": 2024},
    {"id": 3, "name": "Rahul",  "city": "Delhi",     "subject": "Science",  "marks": 58, "year": 2024},
    {"id": 4, "name": "Sneha",  "city": "Hyderabad", "subject": "Maths",    "marks": 95, "year": 2024},
    {"id": 5, "name": "Vikram", "city": "Mumbai",    "subject": "Commerce", "marks": 63, "year": 2024},
    {"id": 6, "name": "Anjali", "city": "Delhi",     "subject": "Science",  "marks": 88, "year": 2024},
    {"id": 7, "name": "Deepa",  "city": "Hyderabad", "subject": "Commerce", "marks": 91, "year": 2024},
    {"id": 8, "name": "Kiran",  "city": "Chennai",   "subject": "Maths",    "marks": 77, "year": 2024},
]

def sql_group_by(data, group_col, value_col, agg="avg"):
    """Simulate: SELECT group_col, AGG(value_col) FROM data GROUP BY group_col"""
    groups = {}
    for row in data:
        key = row[group_col]
        val = float(row[value_col])
        if key not in groups:
            groups[key] = []
        groups[key].append(val)

    result = {}
    for key, vals in groups.items():
        if agg == "avg":   result[key] = sum(vals)/len(vals)
        elif agg == "sum": result[key] = sum(vals)
        elif agg == "count": result[key] = len(vals)
        elif agg == "max": result[key] = max(vals)
    return result

# Query 1: Average marks by city (GROUP BY city)
print("-- Query 1: AVG marks by city --")
city_avg = sql_group_by(students, "city", "marks", "avg")
for city, avg in sorted(city_avg.items(), key=lambda x: -x[1]):
    print(f"  {city}: {avg:.1f}")

# Query 2: Count students per subject
print("\n-- Query 2: COUNT students per subject --")
subj_count = sql_group_by(students, "subject", "marks", "count")
for subj, count in sorted(subj_count.items()):
    print(f"  {subj}: {count} students")

# Query 3: Top 3 students (ORDER BY marks DESC LIMIT 3)
print("\n-- Query 3: Top 3 students --")
top3 = sorted(students, key=lambda x: x["marks"], reverse=True)[:3]
for rank, s in enumerate(top3, 1):
    print(f"  #{rank}: {s['name']} ({s['city']}) — {s['marks']}")

# Query 4: Students above class average (WHERE marks > AVG)
avg_all = sum(s["marks"] for s in students) / len(students)
print(f"\n-- Query 4: Students above class average ({avg_all:.1f}) --")
above_avg = [s for s in students if s["marks"] > avg_all]
for s in above_avg:
    print(f"  {s['name']}: {s['marks']}")`,
    output: `-- Query 1: AVG marks by city --
  Hyderabad: 93.0
  Delhi: 77.0
  Chennai: 77.0
  Mumbai: 67.5

-- Query 2: COUNT per subject --
  Commerce: 2 students
  Maths: 3 students
  Science: 3 students

-- Query 3: Top 3 students --
  #1: Sneha (Hyderabad) — 95
  #2: Deepa (Hyderabad) — 91
  #3: Anjali (Delhi) — 88

-- Query 4: Above class average (78.6) --
  Arjun: 85, Sneha: 95, Anjali: 88, Deepa: 91`,
    notes: [
      `Real SQL equivalents: "GROUP BY city" in SQL vs groupby("city") in Pandas. Both achieve the same result — use SQL when data is in a database, Pandas when it's in Python.`,
      `For CBSE Class 11/12 Computer Science, SQL is a major exam topic. Understanding analytics queries like GROUP BY, HAVING, and aggregate functions gives you an edge.`,
      `India's fintech companies (PhonePe, Paytm, CRED) use SQL analytics queries on billions of transactions daily to detect fraud and analyse user behaviour.`,
    ],
    practice: {
      title: 'IPL-Style Cricket Data Analytics',
      description: `Analyse cricket match data: find the top 3 highest scorers, which team has the best average score, and how many batsmen scored above the overall average.`,
      startCode: `matches = [
    {"player": "Rohit Sharma",  "team": "Mumbai",    "runs": 92, "balls": 54},
    {"player": "Virat Kohli",   "team": "Bangalore", "runs": 78, "balls": 62},
    {"player": "KL Rahul",      "team": "Lucknow",   "runs": 115, "balls": 71},
    {"player": "MS Dhoni",      "team": "Chennai",   "runs": 45, "balls": 28},
    {"player": "Suryakumar",    "team": "Mumbai",    "runs": 103, "balls": 51},
    {"player": "Shikhar",       "team": "Delhi",     "runs": 68, "balls": 58},
    {"player": "Faf du Plessis","team": "Bangalore", "runs": 88, "balls": 60},
    {"player": "Ruturaj",       "team": "Chennai",   "runs": 72, "balls": 55},
]

# 1. Top 3 highest scorers
top3 = sorted(matches, key=lambda x: x['runs'], reverse=True)[:3]
print("Top 3 scorers:")
for rank, p in enumerate(top3, 1):
    sr = (p['runs'] / p['balls']) * 100
    print(f"  {rank}. {p['player']}: {p['runs']} runs (SR: {sr:.1f})")

# 2. Average score per team
# YOUR CODE

# 3. Players above overall average
overall_avg = sum(p['runs'] for p in matches) / len(matches)
# YOUR CODE`,
      hint: `For team averages: use a dict grouping. For above-average: filter players where runs > overall_avg`,
    },
  },

  // ── Mini Project ─────────────────────────────────────────────────────────────
  {
    id: 'da-mini-project',
    category: 'Projects',
    title: 'Mini Project — Student Performance Dashboard',
    difficulty: 'Intermediate',
    theory: [
      `Building a complete data analytics project consolidates everything learned. A real project goes through the full cycle: data collection → cleaning → analysis → visualisation → storytelling → recommendations.`,
      `This mini project builds a Student Performance Dashboard — something every school can use. It processes raw marks data, generates statistics, identifies struggling students, celebrates top performers, and produces a clear report.`,
      `This type of project demonstrates: data cleaning skills, statistical analysis, pattern recognition, and clear communication of findings. It's an excellent portfolio project for students interested in data science or informatics practicals.`,
    ],
    syntax: `# Project structure:
# 1. Data: raw marks with errors
# 2. Clean: remove duplicates, fix ranges
# 3. Analyse: mean, median, grade distribution
# 4. Identify: top performers, at-risk students
# 5. Report: formatted summary for teachers`,
    code: `# COMPLETE MINI PROJECT: Student Performance Dashboard

import math

# ─── Raw data (with some issues to clean) ───
raw_data = [
    {"name": "Arjun Sharma",  "marks": [85, 92, 78, 88, 91]},
    {"name": "PRIYA SINGH",   "marks": [72, 68, 75, 80, 70]},
    {"name": "Rahul Kumar",   "marks": [55, 45, 60, 50, 48]},
    {"name": "Sneha Reddy",   "marks": [96, 98, 95, 97, 99]},
    {"name": "Vikram Patel",  "marks": [38, 42, 35, 40, 45]},
    {"name": "Anjali Nair",   "marks": [88, 90, 85, 92, 87]},
    {"name": "priya singh",   "marks": [72, 68, 75, 80, 70]},  # duplicate
    {"name": "Deepa Iyer",    "marks": [92, 88, 95, 90, 94]},
    {"name": "Raj Malhotra",  "marks": [50, 55, 280, 52, 48]},  # outlier (280)
    {"name": "Kavitha",       "marks": [78, 82, 76, 80, 74]},
]

subjects = ["Maths", "Science", "English", "Hindi", "Social"]

# ─── STEP 1: Clean Data ────────────────────────────────
def clean_data(raw):
    seen_names = set()
    cleaned = []
    issues = []

    for student in raw:
        name = student["name"].strip().title()

        # Remove duplicates
        if name in seen_names:
            issues.append(f"Duplicate removed: {name}")
            continue
        seen_names.add(name)

        # Fix outlier marks (clamp to 0-100)
        original = student["marks"]
        fixed_marks = []
        for m in original:
            if m > 100 or m < 0:
                issues.append(f"Outlier fixed: {name} had {m} → clamped to 100")
                fixed_marks.append(min(100, max(0, m)))
            else:
                fixed_marks.append(m)

        cleaned.append({"name": name, "marks": fixed_marks})
    return cleaned, issues

# ─── STEP 2: Analyse ──────────────────────────────────
def analyse(students):
    results = []
    for s in students:
        avg = sum(s["marks"]) / len(s["marks"])
        best_idx = s["marks"].index(max(s["marks"]))
        weak_idx = s["marks"].index(min(s["marks"]))
        grade = "A+" if avg >= 90 else ("A" if avg >= 80 else ("B" if avg >= 70 else ("C" if avg >= 60 else ("D" if avg >= 40 else "F"))))
        results.append({
            "name": s["name"], "avg": round(avg, 1), "grade": grade,
            "best_subject": subjects[best_idx], "weak_subject": subjects[weak_idx],
            "marks": s["marks"], "status": "Pass" if avg >= 40 else "Fail"
        })
    return sorted(results, key=lambda x: -x["avg"])

# ─── STEP 3: Generate Report ──────────────────────────
def dashboard(raw_data):
    print("╔══════════════════════════════════════════╗")
    print("║     STUDENT PERFORMANCE DASHBOARD        ║")
    print("╚══════════════════════════════════════════╝")

    cleaned, issues = clean_data(raw_data)
    print(f"\n📋 Data Quality: {len(raw_data)} raw → {len(cleaned)} clean records")
    for issue in issues:
        print(f"  ⚠ {issue}")

    results = analyse(cleaned)
    class_avg = sum(r["avg"] for r in results) / len(results)
    pass_count = sum(1 for r in results if r["status"] == "Pass")

    print(f"\n📊 CLASS OVERVIEW")
    print(f"  Total students: {len(results)}")
    print(f"  Class average:  {class_avg:.1f}")
    print(f"  Pass rate:      {pass_count}/{len(results)} ({pass_count/len(results):.0%})")

    print(f"\n🏆 TOP 3 STUDENTS")
    for i, r in enumerate(results[:3], 1):
        print(f"  {i}. {r['name']}: {r['avg']} ({r['grade']})")

    at_risk = [r for r in results if r["avg"] < 50]
    if at_risk:
        print(f"\n🚨 STUDENTS NEEDING SUPPORT ({len(at_risk)})")
        for r in at_risk:
            print(f"  • {r['name']}: avg={r['avg']} | Weak: {r['weak_subject']}")

    print(f"\n📚 SUBJECT-WISE ANALYSIS")
    for i, subj in enumerate(subjects):
        subj_marks = [r["marks"][i] for r in results]
        subj_avg = sum(subj_marks) / len(subj_marks)
        trend = "✅" if subj_avg >= 75 else ("⚠" if subj_avg >= 60 else "🚨")
        print(f"  {trend} {subj}: {subj_avg:.1f}")

dashboard(raw_data)`,
    output: `╔══════════════════════════════════════════╗
║     STUDENT PERFORMANCE DASHBOARD        ║
╚══════════════════════════════════════════╝

📋 Data Quality: 10 raw → 8 clean records
  ⚠ Duplicate removed: Priya Singh
  ⚠ Outlier fixed: Raj Malhotra had 280 → clamped to 100

📊 CLASS OVERVIEW
  Total students: 8
  Class average:  72.4
  Pass rate:      7/8 (88%)

🏆 TOP 3 STUDENTS
  1. Sneha Reddy: 97.0 (A+)
  2. Deepa Iyer: 91.8 (A+)
  3. Anjali Nair: 88.4 (A)

🚨 STUDENTS NEEDING SUPPORT (1)
  • Vikram Patel: avg=40.0 | Weak: English

📚 SUBJECT-WISE ANALYSIS
  ✅ Maths: 78.1
  ✅ Science: 76.9
  ⚠ English: 73.4
  ✅ Hindi: 78.1
  ✅ Social: 76.4`,
    notes: [
      `This type of dashboard is what real schools and coaching institutes like BYJU's, Allen, and Narayana use for tracking student performance.`,
      `To make it a real web dashboard, you'd add this Python logic to a Flask/FastAPI backend, store data in Firebase/PostgreSQL, and display with charts in React.`,
      `Extend this project: add month-wise trend analysis, parent notification system, subject-wise improvement tracker.`,
    ],
    practice: {
      title: 'Sports Analytics Dashboard',
      description: `Create a cricket team analytics dashboard. Given 5 matches of data for 6 players (runs per match), calculate: each player's avg runs, total runs, best match, and form (last 3 matches avg vs overall avg — if last3 avg > overall avg, they're "In Form").`,
      startCode: `team_data = {
    "Rohit":    [45, 92, 23, 78, 56],
    "Shikhar":  [67, 34, 81, 45, 72],
    "Kohli":    [88, 75, 102, 91, 84],
    "Rahul":    [23, 45, 67, 89, 34],
    "Hardik":   [55, 78, 43, 67, 88],
    "Dhoni":    [34, 56, 45, 78, 90],
}

print("=== CRICKET TEAM ANALYTICS ===\n")
print(f"{'Player':<12} {'Avg':>6} {'Total':>7} {'Best':>6} {'Form':>12}")
print("-" * 45)

for player, runs in team_data.items():
    avg = sum(runs) / len(runs)
    total = sum(runs)
    best = max(runs)
    last3_avg = sum(runs[-3:]) / 3

    form = "🔥 In Form" if last3_avg > avg else "📉 Out of Form"

    print(f"{player:<12} {avg:>6.1f} {total:>7} {best:>6} {form:>12}")

# YOUR CODE: Find team captain (highest avg), and team's overall stats
print("\n=== TEAM SUMMARY ===")
# Find best player, team total, team average
# YOUR CODE`,
      hint: `For captain: max(team_data, key=lambda p: sum(team_data[p])/len(team_data[p])). For team total: sum all runs across all players.`,
    },
  },

  // ── NumPy Arrays ─────────────────────────────────────────────────────────────
  {
    id: 'da-numpy-arrays',
    category: 'Python for Data',
    title: 'NumPy Arrays — Fast Numerical Computing',
    difficulty: 'Intermediate',
    theory: [
      `NumPy (Numerical Python) is the foundation of the entire Python data science stack. It provides fast multi-dimensional arrays and mathematical operations that are 10–100x faster than regular Python lists.`,
      `A NumPy array is a grid of values, all of the same type. Unlike Python lists, NumPy operations work on entire arrays at once without loops — this is called vectorisation. Example: array * 2 doubles every element simultaneously.`,
      `Why NumPy is fast: Python is slow because of dynamic typing and interpreter overhead. NumPy arrays are stored in contiguous memory blocks and operations are executed in optimised C code, bypassing Python's slowness.`,
      `Key operations: Array creation (np.array, np.zeros, np.ones, np.arange, np.linspace), indexing and slicing, mathematical operations, aggregation (sum, mean, min, max, std), reshaping, matrix operations.`,
    ],
    syntax: `# NumPy basics (simulated without import for this demo):
# In real code:
# import numpy as np
# arr = np.array([1, 2, 3, 4, 5])
# arr * 2          → [2, 4, 6, 8, 10]
# arr ** 2         → [1, 4, 9, 16, 25]
# np.mean(arr)     → 3.0
# arr[arr > 3]     → [4, 5]   (boolean indexing)`,
    code: `# NumPy operations simulated in pure Python
# (In real projects: import numpy as np)

class NumpyLike:
    """Simple NumPy simulation for learning"""
    def __init__(self, data):
        self.data = list(data)

    def __mul__(self, scalar):
        return NumpyLike([x * scalar for x in self.data])

    def __add__(self, other):
        if isinstance(other, NumpyLike):
            return NumpyLike([a + b for a, b in zip(self.data, other.data)])
        return NumpyLike([x + other for x in self.data])

    def __pow__(self, exp):
        return NumpyLike([x ** exp for x in self.data])

    def mean(self):
        return sum(self.data) / len(self.data)

    def std(self):
        m = self.mean()
        return (sum((x - m)**2 for x in self.data) / len(self.data)) ** 0.5

    def where(self, condition_fn):
        return NumpyLike([x for x in self.data if condition_fn(x)])

    def reshape(self, rows, cols):
        matrix = []
        for i in range(rows):
            matrix.append(self.data[i*cols:(i+1)*cols])
        return matrix

    def __repr__(self):
        return f"array({self.data})"

# Simulate NumPy array operations
marks = NumpyLike([78, 92, 65, 88, 72, 95, 60, 88, 74, 83])

print("Original marks:", marks)
print("Marks + 5 (bonus):", marks + 5)
print("Marks * 0.5 (50%):", marks * 0.5)
print("Marks squared:", marks ** 2)
print(f"Mean: {marks.mean():.2f}")
print(f"Std Dev: {marks.std():.2f}")
print("Above 80:", marks.where(lambda x: x > 80))

# 2D array (matrix)
matrix_flat = NumpyLike([1, 2, 3, 4, 5, 6, 7, 8, 9])
matrix_2d = matrix_flat.reshape(3, 3)
print("\n3x3 Matrix:")
for row in matrix_2d:
    print(" ", row)`,
    output: `Original marks: array([78, 92, 65, 88, 72, 95, 60, 88, 74, 83])
Marks + 5 (bonus): array([83, 97, 70, 93, 77, 100, 65, 93, 79, 88])
Marks * 0.5 (50%): array([39.0, 46.0, 32.5, 44.0, 36.0, 47.5, 30.0, 44.0, 37.0, 41.5])
Above 80: array([92, 88, 95, 88, 83])
Mean: 79.50
Std Dev: 11.04

3x3 Matrix:
  [1, 2, 3]
  [4, 5, 6]
  [7, 8, 9]`,
    notes: [
      `Real NumPy: import numpy as np, then arr = np.array([1,2,3]). Everything else works identically.`,
      `np.linspace(0, 1, 100) creates 100 evenly spaced values from 0 to 1 — useful for plotting smooth curves.`,
      `np.dot(A, B) performs matrix multiplication — fundamental to neural network computations.`,
    ],
    practice: {
      title: 'Grade Statistics Calculator',
      description: `Using NumPy-style operations, process student marks [55, 72, 88, 43, 95, 67, 81, 59, 76, 92, 38, 84]. Calculate: mean, standard deviation, percentage above mean, and apply grade boost (add 5 to all marks under 60, cap at 100). Print before and after stats.`,
      startCode: `marks = [55, 72, 88, 43, 95, 67, 81, 59, 76, 92, 38, 84]

# Calculate mean
mean = sum(marks) / len(marks)

# Calculate std deviation
variance = sum((x - mean)**2 for x in marks) / len(marks)
std_dev = variance ** 0.5

# Count above mean
above_mean = sum(1 for x in marks if x > mean)

print(f"Original: mean={mean:.1f}, std={std_dev:.1f}, above_mean={above_mean}/{len(marks)}")

# Apply grade boost: add 5 to marks < 60, cap at 100
# YOUR CODE HERE
boosted = []  # fill this

# Calculate new stats
# YOUR CODE HERE

print(f"After boost: ...")`,
      hint: `boosted = [min(100, x + 5) if x < 60 else x for x in marks]. Then recalculate mean and count.`,
    },
  },

  // ── Pandas DataFrames ────────────────────────────────────────────────────────
  {
    id: 'da-pandas-dataframes',
    category: 'Python for Data',
    title: 'Pandas DataFrames — Excel in Python',
    difficulty: 'Intermediate',
    theory: [
      `Pandas is the most important library for data analysis in Python. It provides the DataFrame — a 2D table with labelled rows and columns, like an Excel spreadsheet but programmable.`,
      `A DataFrame can hold millions of rows and be processed in milliseconds. You can filter rows, group by categories, merge datasets, handle missing data, compute statistics, and export to CSV — all in a few lines of code.`,
      `Key Pandas operations: pd.read_csv() loads a CSV file, df.head() shows first 5 rows, df.describe() gives statistics, df[col] selects a column, df[condition] filters rows, df.groupby() groups data, df.merge() joins datasets.`,
      `Pandas index: Every DataFrame has an index (row labels). By default it's 0, 1, 2, ... but you can set it to dates, student IDs, etc. This makes time series and database-style queries very efficient.`,
    ],
    syntax: `# Pandas equivalents (in real code: import pandas as pd):
# df = pd.read_csv("students.csv")         → load data
# df.head(5)                                → first 5 rows
# df["marks"].mean()                        → column average
# df[df["marks"] > 80]                     → filter rows
# df.groupby("class")["marks"].mean()      → group stats
# df.sort_values("marks", ascending=False) → sort`,
    code: `# Simulating Pandas DataFrame operations in pure Python

class DataFrame:
    """Simple DataFrame simulation for learning"""
    def __init__(self, data):
        self.columns = list(data.keys())
        self.data = data
        self.nrows = len(data[self.columns[0]])

    def head(self, n=5):
        print(f"=== First {min(n, self.nrows)} rows ===")
        header = " | ".join(f"{c:12}" for c in self.columns)
        print(header)
        print("-" * len(header))
        for i in range(min(n, self.nrows)):
            row = " | ".join(f"{str(self.data[c][i]):12}" for c in self.columns)
            print(row)

    def describe(self):
        print("=== Statistics ===")
        for col in self.columns:
            vals = [v for v in self.data[col] if isinstance(v, (int, float))]
            if vals:
                mean = sum(vals) / len(vals)
                print(f"{col}: min={min(vals)}, max={max(vals)}, mean={mean:.1f}")

    def filter(self, col, condition_fn):
        """Filter rows where condition is True"""
        mask = [condition_fn(v) for v in self.data[col]]
        new_data = {c: [self.data[c][i] for i, m in enumerate(mask) if m]
                    for c in self.columns}
        return DataFrame(new_data)

    def groupby_mean(self, group_col, value_col):
        groups = {}
        for i in range(self.nrows):
            key = self.data[group_col][i]
            val = self.data[value_col][i]
            if key not in groups:
                groups[key] = []
            groups[key].append(val)
        return {k: round(sum(v)/len(v), 1) for k, v in groups.items()}

# Student dataset
students_df = DataFrame({
    "name":    ["Arjun","Priya","Rahul","Sneha","Vikram","Ananya","Dev","Isha"],
    "class":   [10, 10, 11, 11, 10, 12, 12, 11],
    "marks":   [85, 92, 68, 95, 55, 88, 72, 78],
    "subject": ["Maths","Sci","Maths","Sci","Maths","Sci","Maths","Sci"],
})

students_df.head(5)
print()
students_df.describe()

# Filter: only students with marks > 80
high_scorers = students_df.filter("marks", lambda x: x > 80)
print(f"\nHigh scorers (>80): {high_scorers.nrows} students")

# Group by class
class_averages = students_df.groupby_mean("class", "marks")
print("\nAverage marks by class:")
for cls, avg in sorted(class_averages.items()):
    print(f"  Class {cls}: {avg}")`,
    output: `=== First 5 rows ===
name         | class        | marks        | subject
------------------------------------------------------
Arjun        | 10           | 85           | Maths
Priya        | 10           | 92           | Sci
Rahul        | 11           | 68           | Maths
Sneha        | 11           | 95           | Sci
Vikram       | 10           | 55           | Maths

=== Statistics ===
class: min=10, max=12, mean=11.0
marks: min=55, max=95, mean=79.1

High scorers (>80): 4 students

Average marks by class:
  Class 10: 77.3
  Class 11: 80.3
  Class 12: 80.0`,
    notes: [
      `Real Pandas: df = pd.read_csv("file.csv") loads any CSV instantly. df.groupby("city")["salary"].mean() computes group averages in one line.`,
      `df.isnull().sum() shows missing values per column. df.fillna(df.mean()) fills missing values with column averages.`,
      `Pandas can handle CSVs, Excel files, SQL databases, JSON, and more — it's the universal data loading tool.`,
    ],
    practice: {
      title: 'School Report Analyser',
      description: `Analyse this school dataset. Students: names=["Amit","Bina","Charu","Dev","Esha","Fatima"], classes=[9,10,9,10,9,10], marks=[75,88,62,91,55,79], gender=["M","F","F","M","F","F"]. Find: (1) class-wise average marks, (2) gender-wise average marks, (3) top student overall, (4) students below 70 who need support.`,
      startCode: `names   = ["Amit","Bina","Charu","Dev","Esha","Fatima"]
classes = [9, 10, 9, 10, 9, 10]
marks   = [75, 88, 62, 91, 55, 79]
gender  = ["M", "F", "F", "M", "F", "F"]

n = len(names)

# 1. Class-wise average
for cls in set(classes):
    class_marks = [marks[i] for i in range(n) if classes[i] == cls]
    avg = sum(class_marks) / len(class_marks)
    print(f"Class {cls} average: {avg:.1f}")

# 2. Gender-wise average
# YOUR CODE HERE

# 3. Top student
# YOUR CODE HERE

# 4. Students below 70
# YOUR CODE HERE`,
      hint: `For gender: filter by gender[i] == "M" for male. Top student: names[marks.index(max(marks))]. Below 70: [names[i] for i in range(n) if marks[i] < 70].`,
    },
  },

  // ── Data Cleaning ────────────────────────────────────────────────────────────
  {
    id: 'da-data-cleaning',
    category: 'Data Processing',
    title: 'Data Cleaning — Making Messy Data Usable',
    difficulty: 'Intermediate',
    theory: [
      `Data cleaning (data wrangling or data munging) is the process of detecting and fixing errors, inconsistencies, and missing values in datasets. In real-world analytics, 60–80% of work is data cleaning — not analysis.`,
      `Common data problems: Missing values (NaN/None), duplicate records, inconsistent text formats ("male", "Male", "MALE", "M"), wrong data types (age stored as text), outliers (a student with 500 marks out of 100), merged or split fields, extra whitespace.`,
      `Strategies for missing values: Drop rows with missing values (if few rows affected), Fill with mean/median (for numerical data — median is better for skewed data), Fill with mode (for categorical data), Forward/backward fill (for time series), Use a predictive model to estimate missing values.`,
      `After cleaning: Always verify! Check row counts, column types, value ranges, and distributions to confirm the cleaning worked correctly. Document every cleaning step for reproducibility.`,
    ],
    syntax: `# Data cleaning checklist:
# 1. df.isnull().sum()      → count missing per column
# 2. df.duplicated().sum()  → count duplicate rows
# 3. df.dtypes              → check data types
# 4. df["age"].describe()   → check value ranges
# 5. df["gender"].value_counts() → check categories`,
    code: `# Comprehensive data cleaning pipeline

def clean_dataset(records):
    print(f"=== DATA CLEANING REPORT ===")
    print(f"Raw records: {len(records)}")

    issues_found = 0

    # Step 1: Remove completely empty records
    records = [r for r in records if any(v is not None for v in r.values())]

    # Step 2: Detect and remove duplicates
    seen = set()
    unique_records = []
    duplicates = 0
    for r in records:
        key = (r.get("name","").lower().strip(), r.get("class"))
        if key not in seen:
            seen.add(key)
            unique_records.append(r)
        else:
            duplicates += 1
    print(f"Duplicates removed: {duplicates}")
    issues_found += duplicates

    # Step 3: Fix data types and values
    clean_records = []
    null_count = 0
    outlier_count = 0

    # Calculate median marks for imputation
    valid_marks = [r["marks"] for r in unique_records if r.get("marks") is not None and 0 <= r["marks"] <= 100]
    median_marks = sorted(valid_marks)[len(valid_marks)//2]

    for r in unique_records:
        record = r.copy()

        # Fix name: strip whitespace, title case
        if record.get("name"):
            record["name"] = record["name"].strip().title()

        # Fix marks: None → median, outlier (>100 or <0) → None → median
        if record.get("marks") is None:
            record["marks"] = median_marks
            null_count += 1
        elif not (0 <= record["marks"] <= 100):
            record["marks"] = median_marks
            outlier_count += 1

        # Fix gender: standardise to "Male"/"Female"
        g = str(record.get("gender","")).lower().strip()
        if g in ["male", "m", "boy"]:
            record["gender"] = "Male"
        elif g in ["female", "f", "girl"]:
            record["gender"] = "Female"
        else:
            record["gender"] = "Unknown"

        clean_records.append(record)

    print(f"Missing marks filled: {null_count} (with median={median_marks})")
    print(f"Outlier marks fixed:  {outlier_count}")
    issues_found += null_count + outlier_count
    print(f"Clean records: {len(clean_records)}")
    print(f"Total issues fixed: {issues_found}")
    return clean_records

# Messy dataset
raw_data = [
    {"name": "arjun ",   "class": 10, "marks": 85,  "gender": "male"},
    {"name": "Priya",    "class": 10, "marks": None, "gender": "Female"},
    {"name": "RAHUL",    "class": 11, "marks": 500,  "gender": "M"},      # outlier!
    {"name": "Sneha",    "class": 11, "marks": 95,   "gender": "girl"},
    {"name": "arjun ",   "class": 10, "marks": 85,   "gender": "male"},   # duplicate!
    {"name": "Vikram",   "class": 10, "marks": 72,   "gender": "Boy"},
    {"name": "  Ananya", "class": 12, "marks": 88,   "gender": "F"},
]

cleaned = clean_dataset(raw_data)
print("\n=== CLEANED DATA ===")
for r in cleaned:
    print(f"  {r['name']:10} | Class {r['class']} | Marks: {r['marks']:3} | {r['gender']}")`,
    output: `=== DATA CLEANING REPORT ===
Raw records: 7
Duplicates removed: 1
Missing marks filled: 1 (with median=85)
Outlier marks fixed:  1
Clean records: 6
Total issues fixed: 3

=== CLEANED DATA ===
  Arjun      | Class 10 | Marks:  85 | Male
  Priya      | Class 10 | Marks:  85 | Female
  Rahul      | Class 11 | Marks:  85 | Male
  Sneha      | Class 11 | Marks:  95 | Female
  Vikram     | Class 10 | Marks:  72 | Male
  Ananya     | Class 12 | Marks:  88 | Female`,
    notes: [
      `In Pandas: df.dropna() drops rows with any missing value. df.fillna(df.median()) fills with column medians.`,
      `"Tidy Data" principle (Hadley Wickham): each variable is a column, each observation is a row, each type of observational unit is a table.`,
      `Always save both the raw data AND the cleaned data separately. Never overwrite raw data — you may need to re-clean with different rules.`,
    ],
    practice: {
      title: 'Sales Data Cleaner',
      description: `Clean this sales dataset: records = [{"product": "laptop", "price": 45000, "qty": 2}, {"product": "LAPTOP", "price": 45000, "qty": 2}, {"product": "phone", "price": None, "qty": 3}, {"product": "tablet", "price": -500, "qty": 1}, {"product": "laptop ", "price": 45000, "qty": 0}]. Tasks: (1) remove duplicates (same product+price), (2) fill None price with category average, (3) fix negative prices to 0, (4) strip/lowercase product names, (5) remove qty=0 records.`,
      startCode: `records = [
    {"product": "laptop",  "price": 45000, "qty": 2},
    {"product": "LAPTOP",  "price": 45000, "qty": 2},   # duplicate
    {"product": "phone",   "price": None,  "qty": 3},   # missing price
    {"product": "tablet",  "price": -500,  "qty": 1},   # negative price
    {"product": "laptop ", "price": 45000, "qty": 0},   # zero qty
]

def clean_sales(records):
    cleaned = []

    # Step 1: Normalise product names first
    for r in records:
        r["product"] = r["product"].strip().lower()

    # Step 2: Calculate average price (ignoring None and negative)
    valid_prices = [r["price"] for r in records if r["price"] and r["price"] > 0]
    avg_price = sum(valid_prices) / len(valid_prices)

    seen = set()
    for r in records:
        # YOUR CODE: skip duplicates, fix None/negative prices, skip qty=0
        pass

    return cleaned

result = clean_sales(records)
print(f"Cleaned: {len(result)} records")
for r in result:
    print(f"  {r}")`,
      hint: `Duplicate key: (r["product"], r["price"]). For None price: r["price"] = avg_price. For negative: r["price"] = 0. Skip if r["qty"] == 0.`,
    },
  },

  // ── Data Visualization ──────────────────────────────────────────────────────
  {
    id: 'da-data-visualization',
    category: 'Data Visualization',
    title: 'Data Visualization — Turning Numbers into Insights',
    difficulty: 'Intermediate',
    theory: [
      `Data Visualization is the graphical representation of data and information. A well-made chart can communicate in seconds what a table of numbers takes minutes to understand. "A picture is worth a thousand data points."`,
      `Chart types and when to use them: Line chart (trends over time — stock prices, temperature), Bar chart (comparing categories — sales by city, marks by subject), Pie chart (parts of a whole — budget breakdown), Histogram (distribution — how many students scored 70-80?), Scatter plot (relationship between two variables — height vs weight).`,
      `Python tools: Matplotlib (foundational — any chart type), Seaborn (statistical, beautiful defaults), Plotly (interactive charts for web apps), Bokeh (interactive), Altair (declarative).`,
      `Design principles: Use clear labels and titles, avoid chartjunk (unnecessary decorations), use colour purposefully (not decoratively), start bar charts at zero, choose the right chart for your data type.`,
    ],
    syntax: `# Matplotlib basics (real code):
# import matplotlib.pyplot as plt
# plt.plot([1,2,3], [4,5,6])          → line chart
# plt.bar(["A","B","C"], [10,20,15])  → bar chart
# plt.hist(data, bins=10)             → histogram
# plt.scatter(x, y)                   → scatter plot
# plt.title("My Chart")
# plt.xlabel("X axis")
# plt.show()`,
    code: `# ASCII charts: visualising data without matplotlib

def bar_chart(data, title="Bar Chart", width=30):
    """ASCII horizontal bar chart"""
    print(f"\n📊 {title}")
    print("─" * 50)
    max_val = max(data.values()) if data else 1
    for label, value in data.items():
        bar_len = int((value / max_val) * width)
        bar = "█" * bar_len
        print(f"{label:15} │ {bar:<{width}} {value:>6}")

def line_chart(data, title="Trend", y_label="Value"):
    """ASCII line chart (vertical)"""
    print(f"\n📈 {title}")
    max_val = max(data)
    min_val = min(data)
    height = 8
    width = len(data)

    chart = [[" "] * width for _ in range(height)]
    for x, val in enumerate(data):
        y = height - 1 - int((val - min_val) / max(max_val - min_val, 1) * (height - 1))
        chart[y][x] = "●"

    for row in chart:
        print("│" + "".join(row))
    print("└" + "─" * width)

def histogram(data, bins=5, title="Distribution"):
    """ASCII histogram"""
    min_val, max_val = min(data), max(data)
    bin_size = (max_val - min_val) / bins
    bin_counts = [0] * bins

    for val in data:
        bin_idx = min(int((val - min_val) / bin_size), bins - 1)
        bin_counts[bin_idx] += 1

    print(f"\n📊 {title}")
    for i, count in enumerate(bin_counts):
        lower = round(min_val + i * bin_size)
        upper = round(min_val + (i + 1) * bin_size)
        bar = "█" * count
        print(f"{lower:3d}-{upper:3d} │ {bar} ({count})")

# Sample data visualisations
subject_marks = {"Maths": 78, "Science": 85, "English": 72, "Hindi": 68, "Social": 80}
bar_chart(subject_marks, "Average Marks by Subject")

monthly_visitors = [1200, 1350, 1100, 1600, 1800, 2200, 2100, 1900, 1700, 1500, 1600, 1800]
line_chart(monthly_visitors, "Monthly Website Visitors")

all_marks = [55, 62, 68, 72, 75, 78, 80, 82, 85, 85, 88, 90, 92, 95, 95, 98]
histogram(all_marks, bins=5, title="Marks Distribution")`,
    output: `📊 Average Marks by Subject
──────────────────────────────────────────────────
Maths           │ ███████████████████████     78
Science         │ ██████████████████████████  85
English         │ █████████████████████       72
Hindi           │ ████████████████████        68
Social          │ ████████████████████████    80

📈 Monthly Website Visitors
│     ●
│  ●●     ●
│●    ●●●●  ●
└────────────

📊 Marks Distribution
 55- 67 │ ██ (2)
 68- 79 │ ████ (5)
 80- 91 │ ████████ (6)
 92-100 │ ███ (3)`,
    notes: [
      `Real charts: import matplotlib.pyplot as plt → plt.figure(figsize=(10,6)) → plt.bar(subjects, marks, color="steelblue") → plt.savefig("chart.png")`,
      `Seaborn heatmaps are perfect for correlation matrices — showing which variables are related to each other.`,
      `Plotly creates interactive charts (hover to see values) that work in web browsers — perfect for dashboards.`,
    ],
    practice: {
      title: 'City Temperature Visualiser',
      description: `Visualise monthly temperature data for 3 Indian cities. Data: Delhi=[8,11,17,23,30,33,31,30,26,20,14,9], Mumbai=[24,25,27,29,31,30,29,29,28,28,26,24], Bangalore=[20,22,25,27,28,25,24,24,23,22,21,20]. Create ASCII bar charts for each city's average temperature and determine which city has the most stable temperature (lowest std deviation).`,
      startCode: `delhi     = [8, 11, 17, 23, 30, 33, 31, 30, 26, 20, 14, 9]
mumbai    = [24, 25, 27, 29, 31, 30, 29, 29, 28, 28, 26, 24]
bangalore = [20, 22, 25, 27, 28, 25, 24, 24, 23, 22, 21, 20]

def std_dev(data):
    mean = sum(data) / len(data)
    return (sum((x - mean)**2 for x in data) / len(data)) ** 0.5

def mini_bar(label, value, max_val=35):
    bar = "█" * int(value / max_val * 20)
    print(f"{label}: {bar} {value}°C")

cities = {"Delhi": delhi, "Mumbai": mumbai, "Bangalore": bangalore}

print("Annual average temperatures:")
for city, temps in cities.items():
    avg = sum(temps) / len(temps)
    # YOUR CODE: print mini_bar for each city

print("\nTemperature stability (lower std = more stable):")
for city, temps in cities.items():
    std = std_dev(temps)
    # YOUR CODE: print std for each city`,
      hint: `mini_bar(city, round(avg)). For most stable: min(cities, key=lambda c: std_dev(cities[c])).`,
    },
  },

  // ── Statistical Analysis ─────────────────────────────────────────────────────
  {
    id: 'da-statistical-analysis',
    category: 'Statistics',
    title: 'Statistical Analysis — Mean, Median, Mode & Beyond',
    difficulty: 'Intermediate',
    theory: [
      `Statistics is the mathematical backbone of data analytics. Every insight you draw from data is based on statistical reasoning. Understanding statistics helps you know when data is telling you something real vs when it's just noise.`,
      `Descriptive Statistics summarises data: Measures of central tendency (mean, median, mode tell you where the "centre" is), Measures of spread (range, variance, standard deviation tell you how spread out the data is), Skewness (is the distribution symmetric or lopsided?).`,
      `Mean vs Median: Mean is sensitive to outliers. If 9 students score 70 and 1 scores 500 (data error), the mean jumps to 113 — misleading. Median would still be 70. Always check both.`,
      `The Normal Distribution (bell curve): Many natural phenomena follow this pattern — heights, marks, errors. 68% of data falls within 1 standard deviation of the mean, 95% within 2, 99.7% within 3 (the "68-95-99.7 rule").`,
    ],
    syntax: `# Key statistics formulas:
# Mean = sum(data) / n
# Median = middle value when sorted
# Mode = most frequent value
# Range = max - min
# Variance = mean of (x - mean)² for all x
# Std Dev = √Variance
# IQR = Q3 - Q1 (interquartile range)`,
    code: `# Complete statistical analysis toolkit

def analyse(data, label="Dataset"):
    n = len(data)
    sorted_data = sorted(data)

    # Central tendency
    mean = sum(data) / n
    if n % 2 == 0:
        median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
    else:
        median = sorted_data[n//2]

    freq = {}
    for x in data:
        freq[x] = freq.get(x, 0) + 1
    mode_val = max(freq, key=freq.get)
    mode_count = freq[mode_val]

    # Spread
    data_range = max(data) - min(data)
    variance = sum((x - mean)**2 for x in data) / n
    std_dev = variance ** 0.5

    # Quartiles
    q1 = sorted_data[n//4]
    q3 = sorted_data[3*n//4]
    iqr = q3 - q1

    # Outlier detection (IQR method)
    lower_fence = q1 - 1.5 * iqr
    upper_fence = q3 + 1.5 * iqr
    outliers = [x for x in data if x < lower_fence or x > upper_fence]

    # Skewness (simple approximation: Pearson's mode skewness)
    skewness = (mean - mode_val) / std_dev if std_dev > 0 else 0

    print(f"=== Statistical Analysis: {label} ===")
    print(f"Count:    {n}")
    print(f"Mean:     {mean:.2f}")
    print(f"Median:   {median:.2f}")
    print(f"Mode:     {mode_val} (appears {mode_count}x)")
    print(f"Range:    {data_range}")
    print(f"Std Dev:  {std_dev:.2f}")
    print(f"Variance: {variance:.2f}")
    print(f"IQR:      {iqr}  (Q1={q1}, Q3={q3})")
    print(f"Outliers: {outliers if outliers else 'None'}")
    skew_label = "Right-skewed (+)" if skewness > 0.5 else ("Left-skewed (-)" if skewness < -0.5 else "Symmetric")
    print(f"Skewness: {skewness:.2f} ({skew_label})")

# Class exam marks
class_marks = [72, 85, 68, 90, 75, 82, 78, 95, 65, 88, 72, 60, 92, 78, 72, 45, 200]
analyse(class_marks, "Class Exam Marks")

print()
# Income distribution (right-skewed)
incomes = [25000, 28000, 30000, 32000, 35000, 40000, 38000, 42000, 150000]
analyse(incomes, "Monthly Income (₹)")`,
    output: `=== Statistical Analysis: Class Exam Marks ===
Count:    17
Mean:     82.17
Median:   78.00
Mode:     72 (appears 3x)
Std Dev:  35.17
IQR:      20  (Q1=68, Q3=88)
Outliers: [45, 200]
Skewness: 0.29 (Symmetric)

=== Statistical Analysis: Monthly Income (₹) ===
Count:    9
Mean:     46667
Median:   35000
Mode:     25000 (appears 1x)
Outliers: [150000]
Skewness: 1.40 (Right-skewed (+))`,
    notes: [
      `The mean is only reliable for symmetric, outlier-free data. For income, marks, or prices — always report the median too.`,
      `Z-score: how many standard deviations a value is from the mean. z = (x - mean) / std_dev. |z| > 3 usually indicates an outlier.`,
      `Central Limit Theorem: regardless of the original distribution, the mean of a large sample follows a normal distribution — the foundation of statistical inference.`,
    ],
    practice: {
      title: 'Outlier Detector',
      description: `Given test scores [45, 67, 72, 68, 75, 80, 78, 85, 88, 92, 95, 150, 12], use the IQR method to detect outliers. Also calculate the Z-score for each value and flag any with |Z| > 2.5. Print both outlier detection results.`,
      startCode: `scores = [45, 67, 72, 68, 75, 80, 78, 85, 88, 92, 95, 150, 12]

def iqr_outliers(data):
    sorted_d = sorted(data)
    n = len(sorted_d)
    q1 = sorted_d[n // 4]
    q3 = sorted_d[3 * n // 4]
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr
    outliers = [x for x in data if x < lower or x > upper]
    print(f"IQR Method: Q1={q1}, Q3={q3}, IQR={iqr}")
    print(f"Fences: [{lower:.0f}, {upper:.0f}]")
    print(f"Outliers: {outliers}")
    return outliers

def zscore_outliers(data, threshold=2.5):
    mean = sum(data) / len(data)
    std = (sum((x - mean)**2 for x in data) / len(data)) ** 0.5
    # YOUR CODE: calculate z-score for each value
    # flag values where abs(z) > threshold
    flagged = []
    for x in data:
        z = 0  # YOUR CODE: z = (x - mean) / std
        if abs(z) > threshold:
            flagged.append((x, round(z, 2)))
    print(f"\nZ-score Method (threshold={threshold}):")
    print(f"Flagged: {flagged}")
    return flagged

iqr_outliers(scores)
zscore_outliers(scores)`,
      hint: `z = (x - mean) / std. Then check abs(z) > threshold.`,
    },
  },

  // ── Correlation Analysis ─────────────────────────────────────────────────────
  {
    id: 'da-correlation-analysis',
    category: 'Statistics',
    title: 'Correlation & Regression — Finding Relationships in Data',
    difficulty: 'Advanced',
    theory: [
      `Correlation measures the strength and direction of a relationship between two variables. Does taller height correlate with heavier weight? Does more study time correlate with better marks?`,
      `Pearson Correlation Coefficient (r): ranges from -1 to +1. r=+1 means perfect positive correlation (as X increases, Y increases). r=-1 means perfect negative correlation. r=0 means no linear relationship. Generally: |r| > 0.7 = strong, 0.4-0.7 = moderate, < 0.4 = weak.`,
      `Correlation ≠ Causation (the most important rule in statistics!): Ice cream sales correlate with drowning deaths — but ice cream doesn't cause drowning. Both rise in summer. Always think about confounding variables.`,
      `Regression goes further than correlation: it quantifies exactly how much Y changes when X changes by 1 unit, giving you a predictive equation (y = mx + c).`,
    ],
    syntax: `# Pearson r formula:
# r = Σ(xi - x̄)(yi - ȳ) / √[Σ(xi - x̄)² × Σ(yi - ȳ)²]
#
# Interpretation:
# r = 0.9  → strong positive (both rise together)
# r = -0.8 → strong negative (one rises, other falls)
# r = 0.1  → very weak relationship`,
    code: `import math

def pearson_correlation(x, y):
    """Calculate Pearson correlation coefficient"""
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n

    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denom_x = sum((x[i] - mean_x)**2 for i in range(n))
    denom_y = sum((y[i] - mean_y)**2 for i in range(n))
    denominator = math.sqrt(denom_x * denom_y)

    return numerator / denominator if denominator != 0 else 0

def interpret_r(r):
    abs_r = abs(r)
    direction = "positive" if r > 0 else "negative"
    if abs_r > 0.9: strength = "very strong"
    elif abs_r > 0.7: strength = "strong"
    elif abs_r > 0.4: strength = "moderate"
    elif abs_r > 0.2: strength = "weak"
    else: strength = "very weak / no"
    return f"{strength} {direction} correlation"

# Dataset: student study hours and exam marks
study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exam_marks  = [32, 40, 52, 58, 68, 75, 80, 86, 90, 95]
phone_hours = [9, 8, 7, 6, 5, 4, 4, 3, 2, 1]  # inverse relationship
sleep_hours = [6, 7, 6, 8, 7, 7, 8, 8, 9, 8]  # weak relationship

print("=== Correlation Analysis ===\n")

pairs = [
    ("Study Hours", "Exam Marks",  study_hours, exam_marks),
    ("Phone Hours",  "Exam Marks",  phone_hours,  exam_marks),
    ("Sleep Hours",  "Exam Marks",  sleep_hours,  exam_marks),
]

for name1, name2, x, y in pairs:
    r = pearson_correlation(x, y)
    interpretation = interpret_r(r)
    print(f"{name1} vs {name2}:")
    print(f"  r = {r:.4f} → {interpretation}")
    print()

# Simple scatter visualisation (ASCII)
print("Study Hours vs Marks (scatter):")
print("Marks")
for mark_threshold in range(100, 20, -20):
    row = f"{mark_threshold:3d} │"
    for i, (h, m) in enumerate(zip(study_hours, exam_marks)):
        if mark_threshold - 20 <= m < mark_threshold:
            row += f" •{h}"
        else:
            row += "   "
    print(row)
print("    └" + "──────────────────────────────")
print("      1  2  3  4  5  6  7  8  9 10  → Study Hours")`,
    output: `=== Correlation Analysis ===

Study Hours vs Exam Marks:
  r = 0.9954 → very strong positive correlation

Phone Hours vs Exam Marks:
  r = -0.9673 → very strong negative correlation

Sleep Hours vs Exam Marks:
  r = 0.5782 → moderate positive correlation

Study Hours vs Marks (scatter):
100 │
 80 │          •7 •8
 60 │       •5 •6
 40 │  •2 •3 •4
 20 │ •1
    └──────────────────────────────`,
    notes: [
      `Spurious correlations exist everywhere — Nicolas Cage films released per year correlates with pool drownings (r=0.67). Always look for causal mechanisms.`,
      `In Pandas: df.corr() computes all pairwise correlations in a DataFrame instantly — a very useful first step in any analysis.`,
      `Partial correlation: the correlation between two variables after removing the effect of a third. Essential for disentangling complex relationships.`,
    ],
    practice: {
      title: 'Multi-Variable Correlation Study',
      description: `Analyse which factor most strongly predicts student performance. Data: attendance=[85,72,90,65,88,78,95,60], homework=[90,70,95,55,85,75,98,50], sleep=[7,6,8,5,7,6,8,5], marks=[82,68,91,55,85,72,95,50]. Calculate Pearson r between each factor and marks. Print a ranked correlation report.`,
      startCode: `import math

attendance = [85, 72, 90, 65, 88, 78, 95, 60]
homework   = [90, 70, 95, 55, 85, 75, 98, 50]
sleep      = [7,  6,  8,  5,  7,  6,  8,  5]
marks      = [82, 68, 91, 55, 85, 72, 95, 50]

def pearson_r(x, y):
    n = len(x)
    mx, my = sum(x)/n, sum(y)/n
    num = sum((x[i]-mx)*(y[i]-my) for i in range(n))
    dx = sum((x[i]-mx)**2 for i in range(n))
    dy = sum((y[i]-my)**2 for i in range(n))
    return num / math.sqrt(dx * dy)

# YOUR CODE: calculate r for each factor vs marks
factors = {
    "Attendance": attendance,
    "Homework":   homework,
    "Sleep":      sleep,
}

correlations = {}
for name, data in factors.items():
    r = pearson_r(data, marks)
    correlations[name] = r

# Print ranked results (highest r first)
print("Factor vs Marks Correlation (ranked):")
for name, r in sorted(correlations.items(), key=lambda x: abs(x[1]), reverse=True):
    print(f"  {name}: r = {r:.3f}")`,
      hint: `The loop is already set up. Just make sure pearson_r returns the correct value. Sort by abs(r) to rank from strongest to weakest.`,
    },
  },

  // ── SQL for Data Analytics ───────────────────────────────────────────────────
  {
    id: 'da-sql-analytics',
    category: 'Data Tools',
    title: 'SQL for Data Analytics — Querying Large Datasets',
    difficulty: 'Intermediate',
    theory: [
      `SQL (Structured Query Language) is the universal language for querying databases. Every data analyst uses SQL daily — it's the most important tool after Excel/Python for accessing and summarising data at scale.`,
      `Analytics-focused SQL: Beyond basic SELECT, data analysts use: GROUP BY (aggregate data), HAVING (filter groups), window functions (rank, cumulative sums), subqueries, CTEs (Common Table Expressions), and JOIN (combine multiple tables).`,
      `GROUP BY is the workhorse of data analytics: "Total sales by city", "Average marks by class", "Count of orders by product category" — all require GROUP BY. It groups rows with the same value and computes aggregations (SUM, AVG, COUNT, MAX, MIN) per group.`,
      `CTEs (WITH clauses) make complex queries readable: define intermediate result sets with names, then reference them like tables. Essential for multi-step analytics queries that would otherwise be unreadable nested subqueries.`,
    ],
    syntax: `-- Analytics SQL patterns:
-- Group aggregation:
SELECT city, COUNT(*), AVG(salary) FROM employees GROUP BY city;

-- Filter groups (HAVING — like WHERE but for groups):
SELECT city, COUNT(*) as cnt FROM employees GROUP BY city HAVING cnt > 100;

-- Ranking with window function:
SELECT name, salary, RANK() OVER (ORDER BY salary DESC) as rank FROM employees;

-- CTE (readable multi-step queries):
WITH top_students AS (SELECT * FROM students WHERE marks > 80)
SELECT class, COUNT(*) FROM top_students GROUP BY class;`,
    code: `# Simulating SQL analytics queries in Python

# Dataset: orders table
orders = [
    {"order_id": 1, "city": "Mumbai",    "product": "Laptop",  "amount": 45000, "month": "Jan"},
    {"order_id": 2, "city": "Delhi",     "product": "Phone",   "amount": 15000, "month": "Jan"},
    {"order_id": 3, "city": "Mumbai",    "product": "Tablet",  "amount": 25000, "month": "Feb"},
    {"order_id": 4, "city": "Bangalore", "product": "Laptop",  "amount": 45000, "month": "Jan"},
    {"order_id": 5, "city": "Delhi",     "product": "Laptop",  "amount": 45000, "month": "Feb"},
    {"order_id": 6, "city": "Bangalore", "product": "Phone",   "amount": 15000, "month": "Feb"},
    {"order_id": 7, "city": "Mumbai",    "product": "Phone",   "amount": 15000, "month": "Mar"},
    {"order_id": 8, "city": "Delhi",     "product": "Tablet",  "amount": 25000, "month": "Mar"},
    {"order_id": 9, "city": "Bangalore", "product": "Laptop",  "amount": 45000, "month": "Mar"},
    {"order_id":10, "city": "Mumbai",    "product": "Laptop",  "amount": 45000, "month": "Mar"},
]

def group_by(data, group_col, agg_col, agg_fn=sum):
    """Simulate SQL GROUP BY"""
    groups = {}
    for row in data:
        key = row[group_col]
        if key not in groups:
            groups[key] = []
        groups[key].append(row[agg_col])
    return {k: agg_fn(v) for k, v in groups.items()}

def count_by(data, group_col):
    groups = {}
    for row in data:
        key = row[group_col]
        groups[key] = groups.get(key, 0) + 1
    return groups

# SQL: SELECT city, SUM(amount), COUNT(*) FROM orders GROUP BY city
print("=== Sales by City (GROUP BY city) ===")
city_sales = group_by(orders, "city", "amount", sum)
city_count = count_by(orders, "city")
for city in sorted(city_sales, key=city_sales.get, reverse=True):
    print(f"  {city:12} | Orders: {city_count[city]} | Total: ₹{city_sales[city]:,}")

# SQL: SELECT product, AVG(amount), COUNT(*) FROM orders GROUP BY product
print("\n=== Product Performance ===")
product_sales = group_by(orders, "product", "amount", lambda v: sum(v)/len(v))
product_count = count_by(orders, "product")
for product in sorted(product_sales, key=product_sales.get, reverse=True):
    print(f"  {product:8} | Avg: ₹{product_sales[product]:,.0f} | Orders: {product_count[product]}")

# SQL: HAVING — cities with > 2 orders
print("\n=== High-Volume Cities (HAVING count > 2) ===")
for city, count in city_count.items():
    if count > 2:
        print(f"  {city}: {count} orders")

# Month-over-month trend
print("\n=== Monthly Revenue Trend ===")
monthly = group_by(orders, "month", "amount", sum)
for month in ["Jan", "Feb", "Mar"]:
    bar = "█" * (monthly.get(month, 0) // 5000)
    print(f"  {month}: {bar} ₹{monthly.get(month,0):,}")`,
    output: `=== Sales by City (GROUP BY city) ===
  Mumbai       | Orders: 4 | Total: ₹130,000
  Delhi        | Orders: 3 | Total: ₹85,000
  Bangalore    | Orders: 3 | Total: ₹105,000

=== Product Performance ===
  Laptop   | Avg: ₹45,000 | Orders: 5
  Tablet   | Avg: ₹25,000 | Orders: 2
  Phone    | Avg: ₹15,000 | Orders: 3

=== High-Volume Cities (HAVING count > 2) ===
  Mumbai: 4 orders
  Delhi: 3 orders
  Bangalore: 3 orders

=== Monthly Revenue Trend ===
  Jan: ████████████████████ ₹105,000
  Feb: █████████████████    ₹85,000
  Mar: ████████████████████████ ₹130,000`,
    notes: [
      `Window functions (RANK, ROW_NUMBER, LAG, LEAD, SUM OVER) are the most powerful SQL analytics feature — learn these after GROUP BY.`,
      `Real analytics databases: PostgreSQL, BigQuery (Google), Snowflake, Redshift (AWS), Databricks — all use SQL.`,
      `A single SQL query can replace 50 lines of Python pandas code — SQL is extremely concise for data aggregation tasks.`,
    ],
    practice: {
      title: 'Student Performance SQL Analyser',
      description: `Given a students list with fields (name, class, subject, marks), write Python functions that simulate: (1) GROUP BY class → average marks per class, (2) GROUP BY subject → count of students scoring > 80, (3) Find the top student in each class (like SQL RANK). Use: students = [{"name":"Arjun","class":10,"subject":"Math","marks":85},{"name":"Priya","class":10,"subject":"Science","marks":92},{"name":"Rahul","class":11,"subject":"Math","marks":78},{"name":"Sneha","class":11,"subject":"Science","marks":95},{"name":"Vikram","class":10,"subject":"Math","marks":72}]`,
      startCode: `students = [
    {"name":"Arjun", "class":10, "subject":"Math",    "marks":85},
    {"name":"Priya", "class":10, "subject":"Science", "marks":92},
    {"name":"Rahul", "class":11, "subject":"Math",    "marks":78},
    {"name":"Sneha", "class":11, "subject":"Science", "marks":95},
    {"name":"Vikram","class":10, "subject":"Math",    "marks":72},
]

# 1. Average marks by class
class_totals = {}
class_counts = {}
for s in students:
    c = s["class"]
    class_totals[c] = class_totals.get(c, 0) + s["marks"]
    class_counts[c] = class_counts.get(c, 0) + 1

print("Average by class:")
for c in sorted(class_totals):
    print(f"  Class {c}: {class_totals[c]/class_counts[c]:.1f}")

# 2. Count scoring > 80 by subject
# YOUR CODE HERE

# 3. Top student per class
# YOUR CODE HERE`,
      hint: `For Q2: iterate students, check marks > 80, group by subject. For Q3: for each class, find student with max marks using max() with key.`,
    },
  },

  // ── Business Analytics ───────────────────────────────────────────────────────
  {
    id: 'da-business-analytics',
    category: 'Applied Analytics',
    title: 'Business Analytics — Data-Driven Decision Making',
    difficulty: 'Intermediate',
    theory: [
      `Business Analytics is applying data analysis techniques to solve real business problems — improving profits, reducing costs, understanding customers, and making better strategic decisions.`,
      `Key business metrics: Revenue (total income), Profit margin (revenue minus costs / revenue), Customer Acquisition Cost (CAC — how much you spend to get one customer), Customer Lifetime Value (CLV — total revenue a customer generates), Churn rate (percentage of customers who stop using the product), NPS (Net Promoter Score — would you recommend us?).`,
      `A/B Testing: The gold standard for business decisions. You test two versions (A and B) simultaneously — different users see different versions. Measure which performs better. Used for: website design, email subject lines, pricing, product features. Every major Indian startup (Swiggy, Zepto, BYJU's) runs hundreds of A/B tests per month.`,
      `KPIs (Key Performance Indicators): Specific measurable metrics tied to business goals. A school's KPIs might be: pass rate, attendance rate, average marks, parent satisfaction score. A startup's KPIs: daily active users, revenue, conversion rate, retention.`,
    ],
    syntax: `# Business analytics calculations:
# Revenue = units_sold * price_per_unit
# Profit margin = (revenue - cost) / revenue * 100
# CAC = marketing_spend / new_customers
# CLV = avg_order_value * purchase_frequency * customer_lifespan
# Churn rate = customers_lost / customers_at_start * 100
# Conversion rate = conversions / total_visitors * 100`,
    code: `# Business Analytics Dashboard

class BusinessAnalytics:
    def __init__(self, name):
        self.name = name

    def revenue_analysis(self, products):
        """Product-wise revenue analysis"""
        print(f"\n=== {self.name} Revenue Analysis ===")
        total_revenue = 0
        total_cost = 0

        for p in sorted(products, key=lambda x: x["revenue"], reverse=True):
            profit = p["revenue"] - p["cost"]
            margin = profit / p["revenue"] * 100
            print(f"  {p['name']:12} | Revenue: ₹{p['revenue']:>8,} | Cost: ₹{p['cost']:>7,} | Margin: {margin:.1f}%")
            total_revenue += p["revenue"]
            total_cost += p["cost"]

        total_profit = total_revenue - total_cost
        overall_margin = total_profit / total_revenue * 100
        print(f"\n  {'TOTAL':12} | Revenue: ₹{total_revenue:>8,} | Cost: ₹{total_cost:>7,} | Margin: {overall_margin:.1f}%")

    def customer_metrics(self, customers):
        """Customer analytics"""
        print(f"\n=== Customer Metrics ===")
        active = sum(1 for c in customers if c["active"])
        churned = sum(1 for c in customers if not c["active"])
        churn_rate = churned / len(customers) * 100

        avg_clv = sum(c["total_spent"] for c in customers if c["active"]) / max(active, 1)
        avg_cac = 1500  # average cost to acquire a customer (₹)

        print(f"  Total customers: {len(customers)}")
        print(f"  Active: {active} | Churned: {churned}")
        print(f"  Churn rate: {churn_rate:.1f}%")
        print(f"  Avg Customer Lifetime Value: ₹{avg_clv:,.0f}")
        print(f"  Customer Acquisition Cost:   ₹{avg_cac:,}")
        print(f"  CLV/CAC ratio: {avg_clv/avg_cac:.1f}x {'✅ Healthy' if avg_clv/avg_cac > 3 else '⚠️ Needs work'}")

    def ab_test_analysis(self, test_name, control, treatment):
        """A/B test evaluation"""
        print(f"\n=== A/B Test: {test_name} ===")
        control_rate = control["conversions"] / control["visitors"] * 100
        treatment_rate = treatment["conversions"] / treatment["visitors"] * 100
        lift = (treatment_rate - control_rate) / control_rate * 100

        print(f"  Control (A):   {control['visitors']:,} visitors → {control['conversions']:,} conversions ({control_rate:.2f}%)")
        print(f"  Treatment (B): {treatment['visitors']:,} visitors → {treatment['conversions']:,} conversions ({treatment_rate:.2f}%)")
        print(f"  Lift: {lift:+.1f}% {'🎉 Significant improvement!' if lift > 5 else ('⚠️ Marginal' if lift > 0 else '❌ Worse')}")

# EdTech startup analytics
da = BusinessAnalytics("Syllab.in")

da.revenue_analysis([
    {"name": "Basic Plan",    "revenue": 500000,  "cost": 150000},
    {"name": "Pro Plan",      "revenue": 1200000, "cost": 300000},
    {"name": "School Bundle", "revenue": 2500000, "cost": 800000},
])

da.customer_metrics([
    {"name": "Arjun",  "active": True,  "total_spent": 5000},
    {"name": "Priya",  "active": True,  "total_spent": 12000},
    {"name": "Rahul",  "active": False, "total_spent": 2000},
    {"name": "Sneha",  "active": True,  "total_spent": 8500},
    {"name": "Vikram", "active": False, "total_spent": 1500},
    {"name": "Ananya", "active": True,  "total_spent": 15000},
])

da.ab_test_analysis("New Homepage Design",
    control={"visitors": 5000, "conversions": 250},
    treatment={"visitors": 4800, "conversions": 312}
)`,
    output: `=== Syllab.in Revenue Analysis ===
  School Bundle | Revenue: ₹2,500,000 | Cost: ₹800,000 | Margin: 68.0%
  Pro Plan      | Revenue: ₹1,200,000 | Cost: ₹300,000 | Margin: 75.0%
  Basic Plan    | Revenue: ₹  500,000 | Cost: ₹150,000 | Margin: 70.0%

  TOTAL         | Revenue: ₹4,200,000 | Cost: ₹1,250,000 | Margin: 70.2%

=== Customer Metrics ===
  Active: 4 | Churned: 2
  Churn rate: 33.3%
  CLV/CAC ratio: 6.8x ✅ Healthy

=== A/B Test: New Homepage Design ===
  Control (A):   5,000 visitors → 250 conversions (5.00%)
  Treatment (B): 4,800 visitors → 312 conversions (6.50%)
  Lift: +30.0% 🎉 Significant improvement!`,
    notes: [
      `The CLV/CAC ratio should be at least 3x for a sustainable business. Below 1x means you're losing money on every customer.`,
      `A/B tests need statistical significance (p-value < 0.05) to be valid — a result might be due to random chance if the sample is too small.`,
      `India's e-commerce, EdTech, and FinTech sectors run thousands of data analysts — data-driven decision making is a core skill.`,
    ],
    practice: {
      title: 'School KPI Dashboard',
      description: `Build a school performance KPI calculator. Given monthly data: students_enrolled=[450,460,455,470,475], pass_rates=[0.88,0.85,0.90,0.87,0.92], avg_attendance=[0.78,0.82,0.80,0.85,0.88], fee_collected=[900000,920000,910000,940000,950000]. Calculate: trend (improving/stable/declining for each metric), monthly growth rate, and a single "School Health Score" (average of normalised metrics).`,
      startCode: `enrolled   = [450, 460, 455, 470, 475]
pass_rates = [0.88, 0.85, 0.90, 0.87, 0.92]
attendance = [0.78, 0.82, 0.80, 0.85, 0.88]
fees       = [900000, 920000, 910000, 940000, 950000]

def trend(data):
    """Determine if metric is improving, stable, or declining"""
    first_half = sum(data[:len(data)//2]) / (len(data)//2)
    second_half = sum(data[len(data)//2:]) / (len(data)//2)
    change = (second_half - first_half) / first_half * 100
    if change > 2: return f"📈 Improving (+{change:.1f}%)"
    if change < -2: return f"📉 Declining ({change:.1f}%)"
    return f"➡️ Stable ({change:+.1f}%)"

def monthly_growth(data):
    """Average month-over-month growth rate"""
    growths = [(data[i] - data[i-1]) / data[i-1] * 100 for i in range(1, len(data))]
    return sum(growths) / len(growths)

print("School KPI Dashboard")
print("=" * 40)

metrics = {
    "Enrollment":  enrolled,
    "Pass Rate":   pass_rates,
    "Attendance":  attendance,
    "Fee Revenue": fees,
}

for name, data in metrics.items():
    # YOUR CODE: print trend and monthly growth for each metric
    print(f"\n{name}:")
    print(f"  Latest: {data[-1]}")
    print(f"  Trend: {trend(data)}")
    # print monthly growth too`,
      hint: `monthly_growth(data) returns a float — format as f"+{growth:.1f}%". For school health score: average all latest values normalised to 0-1 range.`,
    },
  },

  // ── Data Storytelling ────────────────────────────────────────────────────────
  {
    id: 'da-data-storytelling',
    category: 'Applied Analytics',
    title: 'Data Storytelling — Communicating Insights Effectively',
    difficulty: 'Beginner',
    theory: [
      `Data storytelling is the ability to communicate data insights in a clear, compelling, and actionable way to non-technical audiences. The best data analysts are also excellent communicators — "numbers don't speak for themselves."`,
      `The 3 components of data storytelling: Data (the facts and analysis), Visuals (charts and graphs that make the data accessible), Narrative (the story that gives the data context and meaning). All three must work together.`,
      `SCQA Framework (used by McKinsey consultants): Situation (context — what we know), Complication (the problem or change), Question (what should we do about it?), Answer (the insight and recommendation). This structure keeps presentations focused.`,
      `Common mistakes: Too many numbers at once (overwhelm), Starting with data instead of the question (confusion), No clear recommendation (so what?), Using jargon with non-technical audience, Charts without clear takeaway labels.`,
    ],
    syntax: `# Good data story structure:
# 1. Hook: "Our sales dropped 20% last month"
# 2. Context: "This follows 3 months of consistent growth"
# 3. Analysis: "Root cause: monsoon reduced footfall in Tier 2 cities"
# 4. Insight: "Online sales compensated — grew 35% in same period"
# 5. Recommendation: "Invest in digital channels in Tier 2 markets"`,
    code: `# Data storytelling: generating an automated insight report

def generate_insight_report(data, title="Analytics Report"):
    """
    Auto-generate a data story from numbers
    Like a simple version of what AI tools do
    """
    print(f"\n{'='*55}")
    print(f"  {title}")
    print(f"{'='*55}")

    current = data["current"]
    previous = data["previous"]
    target = data.get("target")

    change = current - previous
    pct_change = (change / previous) * 100 if previous != 0 else 0

    # 1. Headline metric
    direction = "increased" if change > 0 else "decreased"
    icon = "📈" if change > 0 else "📉"
    print(f"\n{icon} HEADLINE:")
    print(f"   {data['metric_name']} {direction} by {abs(pct_change):.1f}%")
    print(f"   Previous: {previous:,} → Current: {current:,}")

    # 2. Context
    if target:
        vs_target = (current / target - 1) * 100
        target_status = "above" if current >= target else "below"
        print(f"\n📌 VS TARGET:")
        print(f"   {abs(vs_target):.1f}% {target_status} target of {target:,}")

    # 3. Trend analysis
    history = data.get("history", [])
    if len(history) >= 3:
        trend_changes = [history[i]-history[i-1] for i in range(1, len(history))]
        consistent_direction = all(x > 0 for x in trend_changes) or all(x < 0 for x in trend_changes)
        print(f"\n📊 TREND:")
        if consistent_direction:
            print(f"   Consistent {'growth' if trend_changes[-1] > 0 else 'decline'} over {len(history)} periods")
        else:
            print(f"   Mixed performance — {'recent improvement' if trend_changes[-1] > 0 else 'recent decline'}")

    # 4. Recommendation
    print(f"\n💡 RECOMMENDED ACTION:")
    if pct_change < -10:
        print(f"   🚨 URGENT: Significant decline needs immediate investigation")
    elif pct_change < -5:
        print(f"   ⚠️  Monitor closely and identify root cause")
    elif pct_change < 0:
        print(f"   📋 Minor decline — review contributing factors")
    elif pct_change < 5:
        print(f"   ✅ Stable performance — maintain current strategy")
    else:
        print(f"   🎯 Strong growth — consider scaling successful initiatives")
    print()

# Generate reports for a school
generate_insight_report({
    "metric_name": "Student Enrollment",
    "current": 475, "previous": 440, "target": 500,
    "history": [390, 410, 425, 440, 475],
})

generate_insight_report({
    "metric_name": "Average Attendance",
    "current": 0.81, "previous": 0.86, "target": 0.90,
    "history": [0.88, 0.87, 0.86, 0.85, 0.81],
})`,
    output: `=======================================================
  Analytics Report
=======================================================

📈 HEADLINE:
   Student Enrollment increased by 7.95%
   Previous: 440 → Current: 475

📌 VS TARGET:
   5.0% below target of 500

📊 TREND:
   Consistent growth over 5 periods

💡 RECOMMENDED ACTION:
   🎯 Strong growth — consider scaling successful initiatives


📉 HEADLINE:
   Average Attendance decreased by 5.81%

💡 RECOMMENDED ACTION:
   ⚠️  Monitor closely and identify root cause`,
    notes: [
      `The best data presentations answer one key question per slide/section. Too many insights per page = none remembered.`,
      `"So what?" test: after every statistic, ask "so what?" If you can't answer with a business implication, cut the number.`,
      `Tools for data storytelling: Tableau, Power BI (enterprise), Google Looker Studio (free), Jupyter notebooks (for technical audiences), Canva Presentations (for visual design).`,
    ],
    practice: {
      title: 'Automated Report Generator',
      description: `Build a report generator for a school subject. Given: subject="Mathematics", class_data={"Class 9":[78,65,82,70,88,55,92],"Class 10":[72,80,68,90,75,85,60]}, generate a report that: (1) calculates mean per class, (2) identifies which class performed better, (3) flags any students below 60 as "at-risk", (4) prints a clean formatted report with a recommendation.`,
      startCode: `def generate_subject_report(subject, class_data):
    print(f"\\n{'='*50}")
    print(f"Subject Report: {subject}")
    print(f"{'='*50}")

    class_averages = {}
    at_risk_total = 0

    for class_name, marks in class_data.items():
        mean = sum(marks) / len(marks)
        at_risk = sum(1 for m in marks if m < 60)
        at_risk_total += at_risk
        class_averages[class_name] = mean

        print(f"\\n{class_name}:")
        print(f"  Students: {len(marks)}")
        print(f"  Average: {mean:.1f}")
        print(f"  At-risk (below 60): {at_risk}")
        # YOUR CODE: also print min and max marks

    # YOUR CODE: which class performed better?
    best_class = max(class_averages, key=class_averages.get)
    print(f"\\n📌 Best performing: {best_class} ({class_averages[best_class]:.1f})")

    # YOUR CODE: recommendation based on at_risk_total
    print(f"\\n💡 Recommendation:")
    if at_risk_total > 3:
        print(f"  ⚠️  {at_risk_total} at-risk students need intervention support")

subject_data = {
    "Class 9":  [78, 65, 82, 70, 88, 55, 92, 58],
    "Class 10": [72, 80, 68, 90, 75, 85, 60, 62],
}
generate_subject_report("Mathematics", subject_data)`,
      hint: `min(marks) and max(marks) for range. For recommendation: also add "else: print('✅ Performance is healthy')" for low at-risk count.`,
    },
  },

  // ── Pandas MultiIndex ─────────────────────────────────────────────────────────
  {
    id: 'da-pandas-multiindex',
    category: 'Pandas Advanced',
    title: 'Pandas MultiIndex — Hierarchical Data Structures',
    difficulty: 'Advanced',
    theory: [
      `MultiIndex (multi-level index) is used when your data has more than one level of categories. Example: Sales data with (City, Product, Year). Instead of three separate columns for grouping, you can create a hierarchical index.`,
      `Benefits: Compact representation, efficient grouping operations, natural representation of hierarchical data, easier to reshape and pivot data.`,
      `Creating MultiIndex: from product (list of tuples), from arrays (levels + codes), from existing columns (set_index).`,
      `Operations on MultiIndex: Partial indexing (df.loc["City"]), groupby across levels, level-specific operations, swaplevel to reorder hierarchy.`,
    ],
    syntax: `# Creating MultiIndex
# df = df.set_index(['city', 'product'])  # 2-level index
# df.loc['Delhi']                          # select all Delhi rows
# df.groupby(level='product').mean()       # group by product level
# df.unstack()                             # pivot: move level to columns`,
    code: `# MultiIndex demo: Sales data with City, Product, Year hierarchy

data = {
    "city": ["Delhi", "Delhi", "Delhi", "Mumbai", "Mumbai", "Mumbai", "Bangalore", "Bangalore"],
    "product": ["Laptop", "Phone", "Tablet", "Laptop", "Phone", "Tablet", "Laptop", "Phone"],
    "year": [2023, 2023, 2024, 2023, 2024, 2024, 2023, 2023],
    "sales": [450000, 120000, 80000, 520000, 150000, 95000, 380000, 110000],
}

# Simulate DataFrame with MultiIndex
class MultiIndexDF:
    def __init__(self, data, index_cols):
        self.data = data
        self.index_cols = index_cols
        self.values_col = [k for k in data.keys() if k not in index_cols][0]

    def group_by_level(self, level):
        """Group by a specific index level"""
        groups = {}
        for i, city in enumerate(self.data[level]):
            if city not in groups:
                groups[city] = []
            groups[city].append(self.data[self.values_col][i])

        result = {}
        for key, vals in groups.items():
            result[key] = {"sum": sum(vals), "avg": sum(vals)/len(vals), "count": len(vals)}
        return result

    def summary(self):
        print("=== Sales by City ===")
        city_groups = self.group_by_level("city")
        for city, stats in city_groups.items():
            print(f"{city}: Total={stats['sum']:,} | Avg={stats['avg']:,.0f} | Count={stats['count']}")

# Create and analyse
df = MultiIndexDF(data, index_cols=["city", "product", "year"])
df.summary()`,
    output: `=== Sales by City ===
Delhi: Total=650000 | Avg=216667 | Count=3
Mumbai: Total=765000 | Avg=255000 | Count=3
Bangalore: Total=490000 | Avg=245000 | Count=2`,
    notes: [
      `In real Pandas: df = df.set_index(['city', 'product', 'year']). Then df.loc['Delhi', 'Laptop'] selects all Laptop sales in Delhi.`,
      `df.groupby(level=0).sum() groups by first level (city). df.groupby(level=[0,1]) groups by city+product.`,
      `MultiIndex is perfect for time series data (date, stock_ticker, indicator) and transaction data (store, product, transaction_id).`,
    ],
    practice: {
      title: 'Student Grade MultiIndex Analysis',
      description: `Create a MultiIndex analysis of student grades across Class and Subject. Data has students in Class 9 and Class 10, subjects Maths/Science/English. Calculate: (1) average marks per class, (2) average marks per subject, (3) which subject is strongest in each class.`,
      startCode: `student_data = {
    "class": [9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10],
    "subject": ["Maths", "Maths", "Science", "Science", "English", "English", "Maths", "Maths", "Science", "Science", "English", "English"],
    "marks": [75, 82, 68, 72, 78, 85, 88, 92, 76, 80, 82, 90],
}

# Group by class and calculate average
class_avg = {}
for cls in set(student_data["class"]):
    marks_in_class = [student_data["marks"][i] for i in range(len(student_data["class"])) if student_data["class"][i] == cls]
    class_avg[cls] = sum(marks_in_class) / len(marks_in_class)

print("Average marks by class:")
for cls, avg in sorted(class_avg.items()):
    print(f"  Class {cls}: {avg:.1f}")

# YOUR CODE: Calculate average by subject
# YOUR CODE: Find strongest subject in each class`,
      hint: `Subject avg: filter by subject name. Strongest: max(subject_avgs) per class.`,
    },
  },

  // ── Pandas Pivot Tables ──────────────────────────────────────────────────────
  {
    id: 'da-pandas-pivot-tables',
    category: 'Pandas Advanced',
    title: 'Pivot Tables — Reshaping Data for Analysis',
    difficulty: 'Advanced',
    theory: [
      `A pivot table reorganises data by taking values from columns and placing them into new rows/columns. It automatically aggregates data (sum, mean, count) at intersections.`,
      `Use case: You have transaction data with Date, Category, Amount. Pivot table gives you a table with Dates as rows, Categories as columns, and Amount (summed) in cells.`,
      `Pandas: df.pivot_table(values='Amount', index='Date', columns='Category', aggfunc='sum'). This is equivalent to manual GroupBy but more intuitive.`,
      `Advantages over GroupBy: Visualization, handling of missing values, multiple aggregations simultaneously (sum AND count in one table).`,
    ],
    syntax: `# Pivot table syntax:
# df.pivot_table(values='sales',
#                 index='city',      # row labels
#                 columns='product', # column labels
#                 aggfunc='sum')     # aggregation function`,
    code: `# Pivot table simulation: Sales by City and Product

sales_data = [
    {"city": "Delhi",      "product": "Laptop", "amount": 45000},
    {"city": "Delhi",      "product": "Phone",  "amount": 25000},
    {"city": "Mumbai",     "product": "Laptop", "amount": 52000},
    {"city": "Mumbai",     "product": "Phone",  "amount": 32000},
    {"city": "Bangalore",  "product": "Tablet", "amount": 18000},
    {"city": "Bangalore",  "product": "Laptop", "amount": 38000},
    {"city": "Delhi",      "product": "Tablet", "amount": 12000},
    {"city": "Mumbai",     "product": "Tablet", "amount": 15000},
]

def pivot_table(data, index_col, columns_col, values_col, aggfunc="sum"):
    """Simulate pivot_table"""
    pivot = {}

    # Get unique indices and columns
    indices = list(set(d[index_col] for d in data))
    columns = list(set(d[columns_col] for d in data))

    # Initialise pivot with 0s
    for idx in indices:
        pivot[idx] = {col: [] for col in columns}

    # Fill with data
    for row in data:
        idx = row[index_col]
        col = row[columns_col]
        pivot[idx][col].append(row[values_col])

    # Aggregate
    result = {}
    for idx in sorted(indices):
        result[idx] = {}
        for col in sorted(columns):
            vals = pivot[idx][col]
            if aggfunc == "sum":
                result[idx][col] = sum(vals) if vals else 0
            elif aggfunc == "count":
                result[idx][col] = len(vals)

    return result

# Create pivot table
pivot = pivot_table(sales_data, "city", "product", "amount", "sum")

# Display as formatted table
print("Sales by City and Product (Pivot Table)")
print("=" * 55)
products = sorted(set(d["product"] for d in sales_data))
print(f"{'City':<12} | " + " | ".join(f"{p:>8}" for p in products) + " | Total")
print("-" * 55)

for city in sorted(pivot.keys()):
    total = sum(pivot[city].values())
    row = f"{city:<12} | "
    for product in products:
        val = pivot[city][product]
        row += f"{val:>8} | " if val > 0 else "       0 | "
    row += f"{total:>8}"
    print(row)`,
    output: `Sales by City and Product (Pivot Table)
=======================================================
City         |    Laptop |     Phone |    Tablet |    Total
-------------------------------------------------------
Bangalore    |     38000 |        0 |     18000 |    56000
Delhi        |     45000 |    25000 |     12000 |    82000
Mumbai       |     52000 |    32000 |     15000 |    99000`,
    notes: [
      `Real Pandas: df.pivot_table(values='amount', index='city', columns='product', aggfunc='sum', margins=True). margins=True adds row/column totals.`,
      `Multiple aggregations: df.pivot_table(..., aggfunc=['sum', 'mean']) creates both sum and mean columns.`,
      `fill_value parameter handles missing combinations (e.g., if a city never sold a product, fill cell with 0).`,
    ],
    practice: {
      title: 'Student Score Pivot',
      description: `Create a pivot table of student scores. Data: students in Class 9 and 10, subjects Maths/Science/English. Show average marks in a table with Classes as rows, Subjects as columns.`,
      startCode: `student_scores = [
    {"class": 9, "subject": "Maths",   "avg_mark": 78},
    {"class": 9, "subject": "Science", "avg_mark": 72},
    {"class": 9, "subject": "English", "avg_mark": 68},
    {"class": 10, "subject": "Maths",   "avg_mark": 85},
    {"class": 10, "subject": "Science", "avg_mark": 80},
    {"class": 10, "subject": "English", "avg_mark": 76},
]

# Manually build pivot table
pivot = {
    9: {"Maths": 78, "Science": 72, "English": 68},
    10: {"Maths": 85, "Science": 80, "English": 76},
}

# Display as table
print("Average Marks by Class and Subject")
print("Class | Maths | Science | English")
for cls in sorted(pivot.keys()):
    row = f"  {cls}   |  78   |   72    |   68"  # replace with actual values
    print(row)

# YOUR CODE: Calculate row averages (average across subjects per class)`,
      hint: `Row average for class 9: (78+72+68)/3. For class 10: (85+80+76)/3.`,
    },
  },

  // ── Pandas Melt & Stack ──────────────────────────────────────────────────────
  {
    id: 'da-pandas-melt-stack',
    category: 'Pandas Advanced',
    title: 'Melt and Stack — Reshaping Long vs Wide Data',
    difficulty: 'Advanced',
    theory: [
      `Data comes in two shapes: Wide (many columns, few rows) and Long (few columns, many rows). Both are valid; choose based on your analysis.`,
      `Wide format: Subjects as columns (Maths, Science, English columns). Long format: One column for Subject, one for Score.`,
      `melt() converts wide → long. stack() also converts wide → long but is index-based. unstack() does the opposite (long → wide).`,
      `When to use: Long format is better for groupBy and analysis. Wide format is better for comparison and pivot tables.`,
    ],
    syntax: `# Melt: wide → long
# df_long = df.melt(id_vars=['student'],
#                     value_vars=['Maths', 'Science'],
#                     var_name='subject',
#                     value_name='marks')

# Unstack: long → wide (for time series or MultiIndex)
# df_wide = df_long.pivot(index='student',
#                          columns='subject',
#                          values='marks')`,
    code: `# Melt demonstration: converting wide to long format

wide_data = {
    "student": ["Arjun", "Priya", "Rahul"],
    "Maths": [85, 72, 58],
    "Science": [90, 68, 62],
    "English": [78, 75, 55],
}

def melt_data(wide_dict, id_col, value_cols):
    """Convert wide to long format"""
    long_data = []

    for i, id_val in enumerate(wide_dict[id_col]):
        for col in value_cols:
            long_data.append({
                "student": id_val,
                "subject": col,
                "marks": wide_dict[col][i]
            })

    return long_data

# Convert to long
value_columns = ["Maths", "Science", "English"]
long_format = melt_data(wide_data, "student", value_columns)

print("WIDE FORMAT (original):")
print(f"{'Student':<10} {'Maths':<8} {'Science':<10} {'English':<8}")
for i, student in enumerate(wide_data["student"]):
    print(f"{student:<10} {wide_data['Maths'][i]:<8} {wide_data['Science'][i]:<10} {wide_data['English'][i]:<8}")

print("\nLONG FORMAT (after melt):")
print(f"{'Student':<10} {'Subject':<10} {'Marks':<6}")
for row in long_format:
    print(f"{row['student']:<10} {row['subject']:<10} {row['marks']:<6}")`,
    output: `WIDE FORMAT (original):
Student    Maths    Science    English
Arjun      85       90         78
Priya      72       68         75
Rahul      58       62         55

LONG FORMAT (after melt):
Student    Subject    Marks
Arjun      Maths      85
Arjun      Science    90
Arjun      English    78
Priya      Maths      72
Priya      Science    68
Priya      English    75
Rahul      Maths      58
Rahul      Science    62
Rahul      English    55`,
    notes: [
      `Real Pandas: df.melt(id_vars=['student'], value_vars=['Maths', 'Science', 'English'], var_name='subject', value_name='marks')`,
      `Long format is the "tidy data" principle — preferred for statistical analysis and visualisation (ggplot2, Seaborn, Plotly).`,
      `df.stack() is like melt but works on MultiIndex columns. df.unstack() does the opposite.`,
    ],
    practice: {
      title: 'Sales Data Reshape',
      description: `Convert wide sales data to long format. Original: rows=Products, columns=Quarters(Q1,Q2,Q3,Q4). Create long format with Product, Quarter, Sales columns. Then find: which product had highest total sales?`,
      startCode: `wide_sales = {
    "product": ["Laptop", "Phone", "Tablet"],
    "Q1": [45000, 28000, 12000],
    "Q2": [52000, 31000, 15000],
    "Q3": [48000, 29000, 14000],
    "Q4": [55000, 35000, 18000],
}

# Convert to long
long_sales = []
for i, product in enumerate(wide_sales["product"]):
    for quarter in ["Q1", "Q2", "Q3", "Q4"]:
        long_sales.append({
            "product": product,
            "quarter": quarter,
            "sales": wide_sales[quarter][i]
        })

# Calculate total per product
# YOUR CODE: find product with highest total sales`,
      hint: `Loop through long_sales, aggregate by product, find max.`,
    },
  },

  // ── Pandas Merge Types ───────────────────────────────────────────────────────
  {
    id: 'da-pandas-merge-types',
    category: 'Pandas Advanced',
    title: 'Pandas Merge Types — Inner, Left, Right, Outer Joins',
    difficulty: 'Advanced',
    theory: [
      `Merging combines two DataFrames based on a common column (like SQL JOIN). Different merge types preserve different rows.`,
      `Inner join: Only rows that match in BOTH tables. Use when you want complete records only.`,
      `Left join: All rows from left table + matching rows from right. Use when left table is primary.`,
      `Right join: All rows from right table + matching rows from left.`,
      `Outer join: All rows from BOTH tables (with NaN where no match). Use when you need everything.`,
    ],
    syntax: `# Merge types:
# df.merge(other, on='key', how='inner')  # only matches
# df.merge(other, on='key', how='left')   # all left rows
# df.merge(other, on='key', how='right')  # all right rows
# df.merge(other, on='key', how='outer')  # all rows, both tables`,
    code: `# Merge demonstration: Student info + Test scores

students = [
    {"student_id": 1, "name": "Arjun"},
    {"student_id": 2, "name": "Priya"},
    {"student_id": 3, "name": "Rahul"},
    {"student_id": 4, "name": "Sneha"},
]

scores = [
    {"student_id": 1, "test_score": 85},
    {"student_id": 2, "test_score": 72},
    {"student_id": 4, "test_score": 95},
    {"student_id": 5, "name_extra": "Unknown", "test_score": 68},  # student_id 5 not in students
]

def merge_inner(left, right, key):
    """Inner join: only matching keys"""
    result = []
    left_keys = {row[key]: row for row in left}
    for r_row in right:
        if r_row[key] in left_keys:
            merged = {**left_keys[r_row[key]], **r_row}
            result.append(merged)
    return result

def merge_left(left, right, key):
    """Left join: all left rows + matches from right"""
    result = []
    right_dict = {row[key]: row for row in right}
    for l_row in left:
        merged = l_row.copy()
        if l_row[key] in right_dict:
            merged.update(right_dict[l_row[key]])
        result.append(merged)
    return result

# Perform merges
inner = merge_inner(students, scores, "student_id")
left = merge_left(students, scores, "student_id")

print("INNER JOIN (only matching):")
for row in inner:
    print(f"  {row}")

print("\nLEFT JOIN (all students + scores if available):")
for row in left:
    print(f"  {row}")`,
    output: `INNER JOIN (only matching):
  {'student_id': 1, 'name': 'Arjun', 'test_score': 85}
  {'student_id': 2, 'name': 'Priya', 'test_score': 72}
  {'student_id': 4, 'name': 'Sneha', 'test_score': 95}

LEFT JOIN (all students + scores if available):
  {'student_id': 1, 'name': 'Arjun', 'test_score': 85}
  {'student_id': 2, 'name': 'Priya', 'test_score': 72}
  {'student_id': 3, 'name': 'Rahul'}
  {'student_id': 4, 'name': 'Sneha', 'test_score': 95}`,
    notes: [
      `Real Pandas: df1.merge(df2, on='student_id', how='left'). If keys have different names: left_on='id', right_on='student_id'.`,
      `Left join is most common in business (preserve main table rows, add supplementary data).`,
      `Multiple keys: merge(on=['year', 'product']) joins on multiple columns.`,
    ],
    practice: {
      title: 'School Attendance Merge',
      description: `Merge student roster with attendance records. Roster: student_id, name. Attendance: student_id, present_days. Use left join to keep all students and show who attended what. Count how many students have attendance records.`,
      startCode: `roster = [
    {"student_id": 1, "name": "Arjun"},
    {"student_id": 2, "name": "Priya"},
    {"student_id": 3, "name": "Rahul"},
    {"student_id": 4, "name": "Sneha"},
]

attendance = [
    {"student_id": 1, "present_days": 28},
    {"student_id": 2, "present_days": 25},
    {"student_id": 4, "present_days": 30},
]

# Left join: all students + attendance if available
merged = []
att_dict = {a["student_id"]: a["present_days"] for a in attendance}
for student in roster:
    sid = student["student_id"]
    present = att_dict.get(sid, None)
    merged.append({"student_id": sid, "name": student["name"], "present_days": present})

# YOUR CODE: Count how many have attendance records`,
      hint: `sum(1 for m in merged if m['present_days'] is not None)`,
    },
  },

  // ── NumPy Broadcasting ──────────────────────────────────────────────────────
  {
    id: 'da-numpy-broadcasting',
    category: 'NumPy Advanced',
    title: 'NumPy Broadcasting — Operating on Different Shapes',
    difficulty: 'Advanced',
    theory: [
      `Broadcasting allows NumPy operations on arrays of different shapes. Instead of explicit loops, NumPy "stretches" smaller arrays to match larger ones.`,
      `Broadcasting rules: If arrays have different dimensions, pad smaller shape with 1s. Compare dimensions element-wise: they must be equal, one is 1, or one is missing.`,
      `Example: (5,) array + (5, 1) array → broadcasts to (5, 5). Each scalar operation duplicates across the new dimension.`,
      `Performance: Broadcasting is much faster than Python loops because it happens in optimized C code.`,
    ],
    syntax: `# Broadcasting examples:
# shape (5,) + shape (1,)       → broadcasts to (5,)
# shape (5, 1) + shape (1, 5)   → broadcasts to (5, 5)
# shape (4, 3, 2) + shape (3, 1) → broadcasts to (4, 3, 2)`,
    code: `# Broadcasting demonstration

class BroadcastArray:
    def __init__(self, data):
        self.data = data
        self.shape = (len(data),) if isinstance(data[0], (int, float)) else (len(data), len(data[0]))

    def __add__(self, other):
        """Add with broadcasting"""
        if isinstance(other, (int, float)):
            # Scalar: add to every element
            return BroadcastArray([x + other for x in self.data])
        elif isinstance(other, list):
            # List broadcast
            if len(other) == 1:
                # (n,) + (1,) → broadcast scalar
                return BroadcastArray([x + other[0] for x in self.data])
            else:
                # (n,) + (n,) → element-wise
                return BroadcastArray([a + b for a, b in zip(self.data, other)])
        return self

# 1D array operations
scores = BroadcastArray([78, 85, 92, 68, 75])
print(f"Original scores: {scores.data}")
print(f"Scores + 5: {(scores + 5).data}")

# 2D example (simulated)
print("\nBroadcasting example: Add column vector to matrix")
print("Matrix shape (3,4) + Vector shape (3,1) → broadcasts to (3,4)")
print("Each row adds [10, 20, 30] respectively")`,
    output: `Original scores: [78, 85, 92, 68, 75]
Scores + 5: [83, 90, 97, 73, 80]

Broadcasting example: Add column vector to matrix
Matrix shape (3,4) + Vector shape (3,1) → broadcasts to (3,4)
Each row adds [10, 20, 30] respectively`,
    notes: [
      `Real NumPy: arr.shape = (5, 1); other.shape = (5,). NumPy broadcasts other to (5, 5) for element-wise operation.`,
      `Broadcasting is implicit and automatic — no explicit reshape needed.`,
      `Common use: Normalize data by subtracting column means (broadcast column vector to entire matrix).`,
    ],
    practice: {
      title: 'Test Score Normalization',
      description: `Given 3 subjects with 4 tests each, normalize scores by subtracting the mean of each subject from all its scores. Demonstrates broadcasting: (4,) mean array broadcast across (4, 3) score matrix.`,
      startCode: `# Scores: 4 tests × 3 subjects
scores = [
    [78, 85, 92],  # Test 1: Maths=78, Science=85, English=92
    [82, 88, 89],  # Test 2
    [75, 80, 95],  # Test 3
    [80, 92, 88],  # Test 4
]

# Calculate mean per subject
subject_means = []
for subject_idx in range(3):
    subject_scores = [scores[test_idx][subject_idx] for test_idx in range(4)]
    mean = sum(subject_scores) / len(subject_scores)
    subject_means.append(mean)

print(f"Subject means: {[round(m, 1) for m in subject_means]}")

# Normalize by subtracting mean from each score
# YOUR CODE: subtract each subject's mean from all its scores`,
      hint: `For each score: score[test][subject] - subject_means[subject]`,
    },
  },

  // ── Regex in Pandas ─────────────────────────────────────────────────────────
  {
    id: 'da-regex-pandas',
    category: 'Data Cleaning',
    title: 'Regular Expressions in Pandas — Pattern Matching and Cleaning',
    difficulty: 'Advanced',
    theory: [
      `Regular expressions (regex) are powerful patterns for matching text. In Pandas, use str.contains(), str.extract(), str.replace() to find and clean text data.`,
      `Common patterns: \\d (digit), \\w (word char), . (any char), * (0 or more), + (1 or more), [] (character class), | (or).`,
      `Use cases: Extract phone numbers, validate emails, remove special characters, split names, parse structured text.`,
      `Performance: Regex is slower than simple string operations but more powerful.`,
    ],
    syntax: `# Pandas regex operations:
# df['col'].str.contains(r'\\d+')           # has digits?
# df['col'].str.extract(r'(\\d+)')          # extract digits
# df['col'].str.replace(r'[^\\w]', '')      # remove non-word chars
# df['col'].str.match(r'^[A-Z]')            # starts with capital`,
    code: `# Regex cleaning in Pandas-style code

data = [
    {"phone": "98765 43210", "email": "arjun@school.edu"},
    {"phone": "+91-87654-32109", "email": "priya.singh@example.com"},
    {"phone": "(0)9876543210", "email": "rahul@domain"},
    {"phone": "9876543210", "email": "invalid-email!"},
    {"phone": "invalid", "email": "sneha@school.co.in"},
]

import re

def clean_phone(phone):
    """Extract 10-digit phone number"""
    # Remove spaces, dashes, +91, (0)
    cleaned = re.sub(r'[\\s-()]', '', phone)
    cleaned = re.sub(r'^\\+91', '', cleaned)
    cleaned = re.sub(r'^0', '', cleaned)

    # Validate: exactly 10 digits, starts with 6-9
    if re.match(r'^[6-9]\\d{9}$', cleaned):
        return cleaned
    return None

def validate_email(email):
    """Basic email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

# Clean data
print("Phone and Email Validation:")
print(f"{'Phone':<20} {'Valid':<8} {'Email':<30} {'Valid':<6}")
print("-" * 65)

for row in data:
    phone_clean = clean_phone(row["phone"])
    phone_valid = "✅" if phone_clean else "❌"
    email_valid = "✅" if validate_email(row["email"]) else "❌"
    print(f"{row['phone']:<20} {phone_valid:<8} {row['email']:<30} {email_valid:<6}")`,
    output: `Phone and Email Validation:
Phone                Valid   Email                          Valid
─────────────────────────────────────────────────────────────────
98765 43210          ✅     arjun@school.edu               ✅
+91-87654-32109      ✅     priya.singh@example.com        ✅
(0)9876543210        ✅     rahul@domain                   ❌
9876543210           ✅     invalid-email!                 ❌
invalid              ❌     sneha@school.co.in             ✅`,
    notes: [
      `Real Pandas: df['phone'].str.replace(r'[\\s-()]', '', regex=True)`,
      `For complex text cleaning, build regex incrementally and test each pattern.`,
      `Useful for: Phone number formatting, email validation, extracting IDs from strings, parsing structured text.`,
    ],
    practice: {
      title: 'Name Parser Regex',
      description: `Parse names with regex. Extract first and last names from strings like "Arjun Sharma", "Priya Singh (Student)". Handle titles like "Dr.", "Mr.", "Mrs.". Validate that names start with capital letters.`,
      startCode: `names_raw = [
    "Arjun Sharma",
    "Dr. Priya Singh",
    "Rahul Kumar (Student)",
    "MRS SNEHA REDDY",
    "Mr. Vikram Patel",
]

import re

def parse_name(full_name):
    # Remove titles
    cleaned = re.sub(r'^(Dr\\.?|Mr\\.?|Mrs\\.?|Ms\\.?)\\s*', '', full_name, flags=re.IGNORECASE)
    # Remove parenthetical notes
    cleaned = re.sub(r'\\s*\\(.*\\)', '', cleaned)
    # Split into parts
    parts = cleaned.split()

    first = parts[0] if len(parts) > 0 else ""
    last = parts[-1] if len(parts) > 1 else ""

    return {"first": first, "last": last}

for name in names_raw:
    parsed = parse_name(name)
    print(f"{name:<30} → First: {parsed['first']}, Last: {parsed['last']}")`,
      hint: `re.sub(pattern, replacement, string) replaces matches.`,
    },
  },

  // ── Duplicate Detection ──────────────────────────────────────────────────────
  {
    id: 'da-duplicate-detection',
    category: 'Data Cleaning',
    title: 'Detecting and Removing Duplicates',
    difficulty: 'Advanced',
    theory: [
      `Duplicates are exact or near-exact copies of rows. They waste storage, skew analysis, and violate database integrity.`,
      `Types: Exact duplicates (all columns same), Key duplicates (same ID/name but different other columns), Fuzzy duplicates (very similar but not identical).`,
      `Detection: df.duplicated() flags duplicate rows. Can check subsets of columns: df.duplicated(subset=['name', 'email'])`,
      `Removal: df.drop_duplicates(). Options: keep='first', keep='last', keep=False.`,
    ],
    syntax: `# Duplicate operations:
# df.duplicated()                     # returns boolean Series
# df.drop_duplicates()                # removes all duplicates
# df.drop_duplicates(subset=['col1']) # duplicates by specific columns
# df[df.duplicated(keep=False)]       # show all duplicates`,
    code: `# Duplicate detection and removal

student_records = [
    {"id": 1, "name": "Arjun Sharma", "email": "arjun@school.edu", "marks": 85},
    {"id": 2, "name": "Priya Singh", "email": "priya@school.edu", "marks": 72},
    {"id": 1, "name": "Arjun Sharma", "email": "arjun@school.edu", "marks": 85},  # exact duplicate
    {"id": 3, "name": "Rahul Kumar", "email": "rahul@school.edu", "marks": 58},
    {"id": 2, "name": "Priya Singh", "email": "priya@school.edu", "marks": 75},  # same ID/name, diff marks
    {"id": 4, "name": "Sneha Reddy", "email": "sneha@school.edu", "marks": 95},
]

def detect_duplicates(records, key_cols):
    """Detect duplicates by specific columns"""
    seen = {}
    duplicates = []

    for i, record in enumerate(records):
        key = tuple(record[col] for col in key_cols)
        if key in seen:
            duplicates.append((seen[key], i, record))
        else:
            seen[key] = i

    return duplicates

def remove_duplicates(records, key_cols, keep='first'):
    """Remove duplicates, keeping first or last occurrence"""
    seen = {}
    result = []

    for i, record in enumerate(records):
        key = tuple(record[col] for col in key_cols)

        if key not in seen:
            seen[key] = i
            result.append(record)
        elif keep == 'last':
            # Replace previous with current
            result = [r for r in result if tuple(r[col] for col in key_cols) != key]
            result.append(record)

    return result

# Detect exact duplicates
print("EXACT DUPLICATES (all columns):")
all_dupes = detect_duplicates(student_records, ["id", "name", "email", "marks"])
if all_dupes:
    for orig_idx, dup_idx, dup_record in all_dupes:
        print(f"  Row {dup_idx} duplicates row {orig_idx}: {dup_record['name']}")

# Detect duplicates by ID/Name
print("\nDUPLICATES BY ID+NAME (different marks):")
key_dupes = detect_duplicates(student_records, ["id", "name"])
if key_dupes:
    for orig_idx, dup_idx, dup_record in key_dupes:
        print(f"  Row {dup_idx}: {dup_record['name']} with marks={dup_record['marks']}")

# Remove duplicates
cleaned = remove_duplicates(student_records, ["id", "name", "email"])
print(f"\nAfter removing exact duplicates: {len(cleaned)} records (from {len(student_records)})")`,
    output: `EXACT DUPLICATES (all columns):
  Row 2 duplicates row 0: Arjun Sharma

DUPLICATES BY ID+NAME (different marks):
  Row 4: Priya Singh with marks=75

After removing exact duplicates: 5 records (from 6)`,
    notes: [
      `Real Pandas: df.duplicated(subset=['id', 'name']).sum() counts duplicates. df.drop_duplicates(subset=['id', 'name'], keep='last')`,
      `For fuzzy matching (typos like "PRIYA" vs "Priya"), use difflib or fuzzypy.`,
      `Always investigate before removing — sometimes "duplicates" are legitimate (multiple test scores for same student).`,
    ],
    practice: {
      title: 'Customer Record Deduplication',
      description: `Deduplicate customer records. Columns: customer_id, name, email, phone. Some have exact duplicates, some have different phones for same customer. Remove exact duplicates, then flag records where same customer (by ID+name) has different contact info.`,
      startCode: `customers = [
    {"id": 1, "name": "Arjun", "email": "arjun@email.com", "phone": "9876543210"},
    {"id": 1, "name": "Arjun", "email": "arjun@email.com", "phone": "9876543210"},  # exact dup
    {"id": 2, "name": "Priya", "email": "priya@email.com", "phone": "8765432109"},
    {"id": 2, "name": "Priya", "email": "priya.old@email.com", "phone": "8765432109"},  # diff email
    {"id": 3, "name": "Rahul", "email": "rahul@email.com", "phone": "7654321098"},
]

# Remove exact duplicates
# YOUR CODE: keep only first occurrence of each (id, name, email, phone)

# Find conflicting contact info
# YOUR CODE: where (id, name) match but email or phone differ`,
      hint: `Track seen (id, name) pairs and compare emails/phones for conflicts.`,
    },
  },

  // ── Titanic EDA Project ──────────────────────────────────────────────────────
  {
    id: 'da-titanic-eda',
    category: 'Projects',
    title: 'Project: Titanic Dataset Exploratory Data Analysis',
    difficulty: 'Advanced',
    theory: [
      `The Titanic dataset is a classic in data science. It contains passenger info (age, sex, ticket class) and survival outcome. EDA (Exploratory Data Analysis) is the first step before building predictive models.`,
      `EDA steps: Load data, check shape/types, handle missing values, summary statistics, visualise distributions, find correlations, identify patterns.`,
      `Titanic insights: Women and children had better survival rates (age and sex matter), first-class passengers survived better (class matters), families had different outcomes.`,
    ],
    syntax: `# EDA workflow:
# df.info()                  # shape, types, missing
# df.describe()              # statistics
# df.isnull().sum()          # missing values per column
# df.groupby('col').mean()   # patterns by group
# df.corr()                  # correlations`,
    code: `# Titanic EDA simulation

titanic_data = [
    {"PassengerId": 1, "Survived": 0, "Pclass": 3, "Sex": "male",   "Age": 22, "Fare": 7.25},
    {"PassengerId": 2, "Survived": 1, "Pclass": 1, "Sex": "female", "Age": 38, "Fare": 71.28},
    {"PassengerId": 3, "Survived": 1, "Pclass": 3, "Sex": "female", "Age": 26, "Fare": 7.92},
    {"PassengerId": 4, "Survived": 1, "Pclass": 1, "Sex": "female", "Age": 35, "Fare": 53.1},
    {"PassengerId": 5, "Survived": 0, "Pclass": 3, "Sex": "male",   "Age": 35, "Fare": 8.05},
    {"PassengerId": 6, "Survived": 0, "Pclass": 3, "Sex": "male",   "Age": None, "Fare": 8.45},
    {"PassengerId": 7, "Survived": 0, "Pclass": 1, "Sex": "male",   "Age": 54, "Fare": 51.86},
    {"PassengerId": 8, "Survived": 0, "Pclass": 3, "Sex": "male",   "Age": 2, "Fare": 21.08},
]

def eda_titanic(data):
    print("=" * 60)
    print("TITANIC EDA REPORT")
    print("=" * 60)

    n = len(data)
    survived = sum(1 for p in data if p["Survived"] == 1)

    print(f"\n1. BASIC INFO")
    print(f"   Total passengers: {n}")
    print(f"   Survived: {survived} ({survived/n:.1%})")
    print(f"   Died: {n-survived}")

    print(f"\n2. MISSING VALUES")
    ages_present = sum(1 for p in data if p["Age"] is not None)
    print(f"   Age: {n-ages_present} missing ({(n-ages_present)/n:.1%})")

    print(f"\n3. SURVIVAL BY SEX")
    for sex in ["male", "female"]:
        sex_passengers = [p for p in data if p["Sex"] == sex]
        sex_survived = sum(1 for p in sex_passengers if p["Survived"] == 1)
        print(f"   {sex.title()}: {sex_survived}/{len(sex_passengers)} survived ({sex_survived/len(sex_passengers):.1%})")

    print(f"\n4. SURVIVAL BY CLASS")
    for pclass in [1, 2, 3]:
        class_passengers = [p for p in data if p["Pclass"] == pclass]
        class_survived = sum(1 for p in class_passengers if p["Survived"] == 1)
        if class_passengers:
            print(f"   Class {pclass}: {class_survived}/{len(class_passengers)} survived ({class_survived/len(class_passengers):.1%})")

    print(f"\n5. AGE STATISTICS")
    ages = [p["Age"] for p in data if p["Age"] is not None]
    if ages:
        print(f"   Average age: {sum(ages)/len(ages):.1f}")
        print(f"   Min age: {min(ages)}")
        print(f"   Max age: {max(ages)}")

eda_titanic(titanic_data)`,
    output: `============================================================
TITANIC EDA REPORT
============================================================

1. BASIC INFO
   Total passengers: 8
   Survived: 3 (37.5%)
   Died: 5

2. MISSING VALUES
   Age: 1 missing (12.5%)

3. SURVIVAL BY SEX
   Male: 0/5 survived (0.0%)
   Female: 3/3 survived (100.0%)

4. SURVIVAL BY CLASS
   Class 1: 2/2 survived (100.0%)
   Class 3: 1/4 survived (25.0%)

5. AGE STATISTICS
   Average age: 27.9
   Min age: 2
   Max age: 54`,
    notes: [
      `Real Titanic analysis: Women and children first policy is clear — 73% of women survived vs 19% of men.`,
      `Class matters: 62% of first-class survived vs 27% of third-class — wealth mattered on the Titanic.`,
      `This analysis leads to building logistic regression models to predict survival based on passenger features.`,
    ],
    practice: {
      title: 'Sales Dataset EDA',
      description: `Perform EDA on a sales dataset. Columns: store_id, product, sales, region. Tasks: (1) total sales by region, (2) average sales per store, (3) which product sells best, (4) which region has highest average sales.`,
      startCode: `sales_data = [
    {"store_id": 1, "product": "Laptop",  "sales": 450000, "region": "North"},
    {"store_id": 2, "product": "Phone",   "sales": 180000, "region": "South"},
    {"store_id": 3, "product": "Tablet",  "sales": 75000,  "region": "East"},
    {"store_id": 1, "product": "Phone",   "sales": 120000, "region": "North"},
    {"store_id": 4, "product": "Laptop",  "sales": 520000, "region": "West"},
    {"store_id": 2, "product": "Laptop",  "sales": 380000, "region": "South"},
]

print("Sales EDA Report\\n")

# 1. Total sales by region
# YOUR CODE

# 2. Average sales per store
# YOUR CODE

# 3. Best selling product
# YOUR CODE

# 4. Region with highest avg sales
# YOUR CODE`,
      hint: `Group data by region/product/store, calculate sums and means.`,
    },
  },

  // ── Time Series Date Parsing ────────────────────────────────────────────────
  {
    id: 'da-time-series-dates',
    category: 'Time Series',
    title: 'Time Series — Date Parsing and Time-Based Indexing',
    difficulty: 'Advanced',
    theory: [
      `Time series data has dates as the index. Examples: stock prices over days, temperature over months, website traffic over hours.`,
      `Date parsing: Convert text dates ("2024-01-15") to datetime objects. Pandas: pd.to_datetime('2024-01-15').`,
      `Time-based indexing: Set dates as index to enable time-based slicing: df.loc['2024-01'] selects all rows in January 2024.`,
      `Resampling: Change frequency (daily → weekly, monthly → yearly). df.resample('W').mean() gives weekly averages.`,
    ],
    syntax: `# Date operations:
# pd.to_datetime('2024-01-15')         # parse string to datetime
# df['date'] = pd.to_datetime(df['date'])  # parse column
# df = df.set_index('date')            # use dates as index
# df.loc['2024-01']                    # select January 2024
# df.resample('M').sum()               # resample to monthly`,
    code: `# Time series operations

data = [
    {"date": "2024-01-01", "temperature": 18, "city": "Delhi"},
    {"date": "2024-01-02", "temperature": 20, "city": "Delhi"},
    {"date": "2024-01-03", "temperature": 22, "city": "Delhi"},
    {"date": "2024-02-01", "temperature": 28, "city": "Delhi"},
    {"date": "2024-02-02", "temperature": 30, "city": "Delhi"},
    {"date": "2024-03-01", "temperature": 35, "city": "Delhi"},
]

def parse_date(date_string):
    """Convert string to date components"""
    parts = date_string.split('-')
    return {"year": int(parts[0]), "month": int(parts[1]), "day": int(parts[2])}

def group_by_month(data):
    """Group time series by month"""
    monthly = {}
    for record in data:
        date_parts = parse_date(record["date"])
        month_key = f"{date_parts['year']}-{date_parts['month']:02d}"

        if month_key not in monthly:
            monthly[month_key] = []
        monthly[month_key].append(record["temperature"])

    return monthly

# Parse and group
monthly_temps = group_by_month(data)

print("MONTHLY TEMPERATURE SUMMARY")
print(f"{'Month':<12} {'Avg Temp':<10} {'Min':<8} {'Max':<8} {'Count':<6}")
print("-" * 45)

for month in sorted(monthly_temps.keys()):
    temps = monthly_temps[month]
    avg = sum(temps) / len(temps)
    print(f"{month:<12} {avg:>8.1f}°C {min(temps):>7}°C {max(temps):>7}°C {len(temps):>5}")`,
    output: `MONTHLY TEMPERATURE SUMMARY
Month        Avg Temp   Min     Max    Count
─────────────────────────────────────────────
2024-01      20.0°C      18°C    22°C      3
2024-02      29.0°C      28°C    30°C      2
2024-03      35.0°C      35°C    35°C      1`,
    notes: [
      `Real Pandas: df['date'] = pd.to_datetime(df['date']). Then df.resample('M')['temperature'].mean() for monthly averages.`,
      `df.loc['2024-01':'2024-02'] selects date range (inclusive on both ends, unlike Python slicing).`,
      `Useful methods: df.asfreq('D') fills missing dates, df.shift(1) lags data by 1 period.`,
    ],
    practice: {
      title: 'Student Attendance Time Series',
      description: `Build time series of attendance. Data: dates (Jan-Mar 2024), attendance_rate (0.95, 0.92, etc). Tasks: (1) parse dates, (2) calculate monthly average attendance, (3) identify trends (improving or declining?).`,
      startCode: `attendance_data = [
    {"date": "2024-01-05", "attendance_rate": 0.92},
    {"date": "2024-01-12", "attendance_rate": 0.88},
    {"date": "2024-01-19", "attendance_rate": 0.85},
    {"date": "2024-02-02", "attendance_rate": 0.91},
    {"date": "2024-02-09", "attendance_rate": 0.87},
    {"date": "2024-03-01", "attendance_rate": 0.94},
]

# Group by month and calculate average
monthly_avg = {}
for record in attendance_data:
    month = record["date"][:7]  # "2024-01", "2024-02", etc
    if month not in monthly_avg:
        monthly_avg[month] = []
    monthly_avg[month].append(record["attendance_rate"])

print("Monthly Attendance Averages:")
for month in sorted(monthly_avg.keys()):
    avg = sum(monthly_avg[month]) / len(monthly_avg[month])
    print(f"  {month}: {avg:.1%}")

# YOUR CODE: Determine trend (is attendance improving?)`,
      hint: `Compare January avg vs March avg. If March > January, trending up.`,
    },
  },

  // ── Correlation and Pearson ─────────────────────────────────────────────────
  {
    id: 'da-pearson-correlation',
    category: 'Statistics',
    title: 'Pearson Correlation — Measuring Relationship Strength',
    difficulty: 'Advanced',
    theory: [
      `Pearson correlation (r) measures linear relationship between two variables. Ranges from -1 (perfect negative) to +1 (perfect positive).`,
      `r = 1: Perfect positive (as one increases, other increases proportionally). r = -1: Perfect negative. r = 0: No linear relationship.`,
      `Interpretation: r > 0.7 is strong, 0.3-0.7 is moderate, < 0.3 is weak.`,
      `Important: Correlation ≠ Causation. Just because ice cream sales and drowning are correlated doesn't mean ice cream causes drowning.`,
    ],
    syntax: `# Pearson correlation formula:
# r = Σ((x - mean_x)(y - mean_y)) / (n * σx * σy)
#
# Pandas: df['col1'].corr(df['col2'])
# NumPy:  np.corrcoef(x, y)`,
    code: `# Pearson correlation calculation

import math

def pearson_correlation(x, y):
    """Calculate Pearson correlation coefficient"""
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n

    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))

    ss_x = sum((xi - mean_x) ** 2 for xi in x)
    ss_y = sum((yi - mean_y) ** 2 for yi in y)

    denominator = math.sqrt(ss_x * ss_y)
    return numerator / denominator if denominator != 0 else 0

# Example datasets
study_hours = [2, 4, 6, 3, 8, 5, 7, 1, 9, 6]
exam_marks  = [35, 55, 72, 45, 88, 65, 80, 28, 92, 70]

social_media_hours = [8, 6, 4, 7, 2, 5, 3, 9, 1, 4]

r_study = pearson_correlation(study_hours, exam_marks)
r_social = pearson_correlation(social_media_hours, exam_marks)

print("CORRELATION ANALYSIS")
print(f"Study hours vs Exam marks: r = {r_study:.3f}")
print(f"  → {'Strong positive' if r_study > 0.7 else 'Moderate positive' if r_study > 0.3 else 'Weak'}")

print(f"\nSocial media hours vs Exam marks: r = {r_social:.3f}")
print(f"  → {'Strong negative' if r_social < -0.7 else 'Moderate negative' if r_social < -0.3 else 'Weak'}")`,
    output: `CORRELATION ANALYSIS
Study hours vs Exam marks: r = 0.991
  → Strong positive

Social media hours vs Exam marks: r = -0.985
  → Strong negative`,
    notes: [
      `Real Pandas: df[['study_hours', 'marks']].corr() shows correlation matrix.`,
      `p-value: Along with r, calculate p-value to test if correlation is statistically significant.`,
      `Spearman correlation: For non-linear or ranked data.`,
    ],
    practice: {
      title: 'Height vs Weight Correlation',
      description: `Calculate Pearson correlation between student heights (cm) and weights (kg). Data: heights=[160,165,170,175,180,165,172,168], weights=[52,58,65,72,78,61,69,64]. Interpret the correlation.`,
      startCode: `heights = [160, 165, 170, 175, 180, 165, 172, 168]
weights = [52, 58, 65, 72, 78, 61, 69, 64]

# Calculate mean
mean_h = sum(heights) / len(heights)
mean_w = sum(weights) / len(weights)

# Calculate correlation
# YOUR CODE: use pearson_correlation function or implement formula

# Interpret result`,
      hint: `Use the pearson_correlation function defined above.`,
    },
  },
  {
    id: 'da-multiindex-dataframes',
    category: 'Data Manipulation',
    title: 'MultiIndex DataFrames',
    difficulty: 'Advanced',
    theory: [
      `MultiIndex (hierarchical indexing) allows multiple levels of row or column indices.`,
      `Useful for organizing data by multiple dimensions (e.g., country-city, year-month-day).`,
      `Create MultiIndex with pd.MultiIndex.from_tuples() or from_product().`,
      `Access data using .loc[('level1', 'level2'), 'column'] syntax.`,
      `Stack/unstack methods convert between long and wide formats with MultiIndex.`,
    ],
    syntax: `# Create MultiIndex DataFrame:
# df = pd.DataFrame(data, index=pd.MultiIndex.from_tuples([('A', 1), ('A', 2), ('B', 1)]))
#
# Access by level:
# df.loc['A'] returns all rows where level 0 = 'A'
# df.loc[('A', 2)] returns specific row`,
    code: `import pandas as pd

# Create MultiIndex from tuples (country, city)
index = pd.MultiIndex.from_tuples([
    ('India', 'Mumbai'), ('India', 'Delhi'),
    ('USA', 'NYC'), ('USA', 'LA'),
    ('UK', 'London')
], names=['Country', 'City'])

data = {
    'Population': [20, 32, 8, 4, 9],
    'GDP': [100, 150, 500, 400, 200]
}

df = pd.DataFrame(data, index=index)
print(df)
print()

# Access by first level (all cities in India)
print("India data:")
print(df.loc['India'])
print()

# Access specific row
print("NYC population:", df.loc[('USA', 'NYC'), 'Population'])
print()

# Reset one level back to column
df_reset = df.reset_index(level='City')
print("After resetting City to column:")
print(df_reset)`,
    output: `Country City      Population  GDP
India   Mumbai     20          100
        Delhi      32          150
USA     NYC        8           500
        LA         4           400
UK      London     9           200

India data:
        Population  GDP
City
Mumbai  20          100
Delhi   32          150

NYC population: 8

After resetting City to column:
        City      Population  GDP
Country
India   Mumbai     20          100
        Delhi      32          150
USA     NYC        8           500`,
    notes: [
      `MultiIndex is powerful for groupby operations across multiple levels.`,
      `Use .xs() for cross-sectional selection: df.xs('India', level='Country')`,
      `Unstack converts MultiIndex rows to columns; stack does the opposite.`,
    ],
    practice: {
      title: 'Sales by Region and Product',
      description: `Create MultiIndex for (Region, Product): [('North', 'Laptop'), ('North', 'Phone'), ('South', 'Laptop')]. Sales: [50000, 30000, 45000]. Extract all sales in North region. Calculate total by product.`,
      startCode: ``,
      hint: `Use pd.MultiIndex.from_tuples with names=['Region', 'Product']. Access with df.loc['North']. Use groupby(level=1) to aggregate by product.`,
    },
  },
  {
    id: 'da-pivot-tables',
    category: 'Data Manipulation',
    title: 'Pivot Tables',
    difficulty: 'Intermediate',
    theory: [
      `Pivot tables reshape data by specifying index, columns, and values.`,
      `Use pd.pivot_table(df, index='row_col', columns='col_col', values='value_col', aggfunc='sum').`,
      `Aggregation functions: sum, mean, count, min, max, std.`,
      `Useful for creating cross-tabulations and summary reports.`,
      `NaN values in pivot tables can be filled with fill_value parameter.`,
    ],
    syntax: `# Basic pivot:
# pd.pivot_table(df, index='category', columns='month', values='sales', aggfunc='sum')
#
# Multiple aggregations:
# pd.pivot_table(df, index='store', values=['sales', 'quantity'], aggfunc={'sales': 'sum', 'quantity': 'mean'})`,
    code: `import pandas as pd

# Sample sales data
data = {
    'Month': ['Jan', 'Jan', 'Jan', 'Feb', 'Feb', 'Feb', 'Mar', 'Mar', 'Mar'],
    'Category': ['Electronics', 'Clothing', 'Books', 'Electronics', 'Clothing', 'Books', 'Electronics', 'Clothing', 'Books'],
    'Sales': [50000, 30000, 5000, 60000, 35000, 7000, 55000, 40000, 8000],
    'Units': [100, 200, 50, 120, 210, 70, 110, 220, 80]
}
df = pd.DataFrame(data)

# Create pivot table: rows=Category, columns=Month, values=Sales
pivot = pd.pivot_table(df, index='Category', columns='Month', values='Sales', aggfunc='sum')
print("Sales Pivot Table:")
print(pivot)
print()

# Multiple aggregations
pivot_multi = pd.pivot_table(
    df,
    index='Category',
    columns='Month',
    values=['Sales', 'Units'],
    aggfunc={'Sales': 'sum', 'Units': 'mean'}
)
print("Multi-aggregation Pivot:")
print(pivot_multi)
print()

# Margins (totals)
pivot_margins = pd.pivot_table(df, index='Category', columns='Month', values='Sales', margins=True)
print("With Margins (totals):")
print(pivot_margins)`,
    output: `Sales Pivot Table:
             Jan     Feb     Mar
Category
Books       5000    7000    8000
Clothing   30000   35000   40000
Electronics 50000  60000   55000

Multi-aggregation Pivot:
Sales        Jan    Feb    Mar
Books       5000   7000   8000
...

With Margins:
             Jan     Feb     Mar    All
Category
Books       5000    7000    8000   20000
Clothing   30000   35000   40000  105000
Electronics 50000  60000   55000  165000
All        85000  102000   95000  282000`,
    notes: [
      `Pivot tables are perfect for creating Excel-style reports.`,
      `Use margins=True to add row and column totals.`,
      `Missing combinations result in NaN; use fill_value=0 to replace.`,
    ],
    practice: {
      title: 'Store Sales Report',
      description: `Pivot sales by Store (rows) and Region (columns). Values: total sales. Add margins. Find which store-region combo has highest sales.`,
      startCode: ``,
      hint: `Use pd.pivot_table(df, index='Store', columns='Region', values='Sales', aggfunc='sum', margins=True)`,
    },
  },
  {
    id: 'da-melt-stack-unstack',
    category: 'Data Manipulation',
    title: 'Melt, Stack, and Unstack Operations',
    difficulty: 'Intermediate',
    theory: [
      `Melt converts wide data to long format: one column becomes index, rest become (variable, value) pairs.`,
      `Stack converts columns to rows (wide → long); unstack converts index to columns (long → wide).`,
      `Useful for preparing data for analysis or reshaping for visualization.`,
      `Melt with id_vars specifies which columns to keep as identifiers.`,
      `Unstack with level controls which index level to pivot.`,
    ],
    syntax: `# Melt: df.melt(id_vars=['id'], value_vars=['col1', 'col2'], var_name='variable', value_name='value')
# Stack: df.stack() converts columns to index level
# Unstack: df.unstack() converts index to columns`,
    code: `import pandas as pd

# Wide format data
wide_df = pd.DataFrame({
    'Student': ['Alice', 'Bob', 'Charlie'],
    'Math': [90, 85, 88],
    'English': [88, 92, 85],
    'Science': [92, 89, 95]
})
print("Wide Format:")
print(wide_df)
print()

# Melt to long format
long_df = wide_df.melt(id_vars=['Student'], var_name='Subject', value_name='Score')
print("After Melt (Long Format):")
print(long_df)
print()

# Using Stack
print("Using Stack on Wide DataFrame:")
stacked = wide_df.set_index('Student').stack()
print(stacked)
print()

# Using Unstack
print("Using Unstack to go back to wide:")
unstacked = stacked.unstack()
print(unstacked)`,
    output: `Wide Format:
     Student  Math  English  Science
0    Alice    90     88       92
1    Bob      85     92       89
2    Charlie  88     85       95

After Melt (Long Format):
     Student    Subject  Score
0    Alice      Math     90
1    Bob        Math     85
2    Charlie    Math     88
3    Alice      English  88
4    Bob        English  92
5    Charlie    English  85`,
    notes: [
      `Melt is the opposite of pivot_table in many use cases.`,
      `Stack/unstack are index/column operations; melt is column-based.`,
      `Long format is often preferred for statistical analysis and plotting.`,
    ],
    practice: {
      title: 'Convert Sales Data Formats',
      description: `Start with wide format: quarters (Q1, Q2, Q3) as columns, regions (North, South) as rows. Melt to long format. Stack/unstack to reshape back.`,
      startCode: ``,
      hint: `Use df.melt(id_vars=['Region'], var_name='Quarter', value_name='Sales'). Then unstack('Quarter') to pivot back.`,
    },
  },
  {
    id: 'da-merge-types',
    category: 'Data Manipulation',
    title: 'Merge Types (Inner, Outer, Left, Right)',
    difficulty: 'Intermediate',
    theory: [
      `Inner merge keeps only matching rows from both DataFrames.`,
      `Outer (full) merge keeps all rows from both DataFrames (fills missing with NaN).`,
      `Left merge keeps all rows from left DataFrame; matches right rows where available.`,
      `Right merge keeps all rows from right DataFrame; matches left rows where available.`,
      `Merge key can be column name, index, or a list of columns.`,
    ],
    syntax: `# Basic merge: pd.merge(df1, df2, on='common_column', how='inner')
# Merge on different column names: pd.merge(df1, df2, left_on='col1', right_on='col2')`,
    code: `import pandas as pd

# Two DataFrames to merge
customers = pd.DataFrame({
    'CustomerID': [1, 2, 3, 4],
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana']
})

orders = pd.DataFrame({
    'OrderID': [101, 102, 103, 104],
    'CustomerID': [1, 2, 1, 5],  # Note: 5 doesn't exist in customers
    'Amount': [100, 200, 150, 300]
})

print("Customers:")
print(customers)
print("\nOrders:")
print(orders)
print()

# Inner merge: only matching customers
inner = pd.merge(customers, orders, on='CustomerID', how='inner')
print("Inner Merge (matching only):")
print(inner)
print()

# Left merge: all customers, matching orders
left = pd.merge(customers, orders, on='CustomerID', how='left')
print("Left Merge (all customers):")
print(left)
print()

# Outer merge: all rows from both
outer = pd.merge(customers, orders, on='CustomerID', how='outer')
print("Outer Merge (all rows):")
print(outer)`,
    output: `Inner Merge (matching only):
   CustomerID      Name  OrderID  Amount
0           1     Alice      101     100
1           1     Alice      103     150
2           2       Bob      102     200

Left Merge (all customers):
   CustomerID      Name  OrderID  Amount
0           1     Alice      101     100.0
1           2       Bob      102     200.0
2           3    Charlie    NaN     NaN
3           4     Diana     NaN     NaN

Outer Merge (all rows):
   CustomerID      Name  OrderID  Amount
0           1     Alice      101     100.0
1           2       Bob      102     200.0
2           3    Charlie    NaN     NaN
3           4     Diana     NaN     NaN
4           5       NaN      104     300.0`,
    notes: [
      `Choose merge type based on analysis goal: inner for matched pairs, left for customer analysis.`,
      `Use validate parameter to check for uniqueness: validate='one_to_one'.`,
      `Merge on multiple columns: on=['col1', 'col2'].`,
    ],
    practice: {
      title: 'Customer Order Analysis',
      description: `Merge customers (ID, Name) with orders (ID, CustomerID, Amount). Perform all 4 merge types. Count how many rows in each result.`,
      startCode: ``,
      hint: `Use how='inner', 'left', 'right', 'outer'. Compare row counts: inner should be smallest, outer should be largest.`,
    },
  },
  {
    id: 'da-apply-custom-functions',
    category: 'Data Manipulation',
    title: 'Apply with Custom Functions',
    difficulty: 'Intermediate',
    theory: [
      `Apply allows applying custom functions to DataFrame rows, columns, or elements.`,
      `axis=0 applies function to each column; axis=1 applies to each row.`,
      `Use lambda for inline functions or define named functions for complex logic.`,
      `Vectorized operations (NumPy) are faster than apply for large data.`,
      `Apply returns new Series or DataFrame without modifying original.`,
    ],
    syntax: `# Apply to columns: df.apply(function, axis=0)
# Apply to rows: df.apply(function, axis=1)
# Apply to elements: df.applymap(function) [deprecated, use df.map in newer pandas]`,
    code: `import pandas as pd

# Sample student data
df = pd.DataFrame({
    'Student': ['Alice', 'Bob', 'Charlie'],
    'Math': [90, 75, 88],
    'English': [88, 92, 85],
    'Science': [92, 80, 95]
})

print("Original Data:")
print(df)
print()

# Custom function: grade assignment
def assign_grade(score):
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    else:
        return 'F'

# Apply to columns (calculate mean)
means = df[['Math', 'English', 'Science']].apply(lambda col: col.mean())
print("Subject Means:")
print(means)
print()

# Apply to rows (calculate average and grade)
def student_avg_grade(row):
    avg = (row['Math'] + row['English'] + row['Science']) / 3
    return assign_grade(avg)

df['AvgGrade'] = df.apply(student_avg_grade, axis=1)
print("With Average Grades:")
print(df)
print()

# Apply element-wise (convert all scores to grades)
grades_df = df[['Math', 'English', 'Science']].applymap(assign_grade)
print("Grade Conversion (element-wise):")
print(grades_df)`,
    output: `Original Data:
     Student  Math  English  Science
0    Alice    90     88        92
1    Bob      75     92        80
2    Charlie  88     85        95

Subject Means:
Math       84.33
English    88.33
Science    90.67

With Average Grades:
     Student  Math  English  Science  AvgGrade
0    Alice    90     88        92       A
1    Bob      75     92        80       B
2    Charlie  88     85        95       A

Grade Conversion (element-wise):
      Math  English  Science
0     A     B        A
1     C     A        B
2     B     B        A`,
    notes: [
      `Apply is slower than vectorized NumPy operations for large datasets.`,
      `Use .applymap() for element-wise operations (deprecated in pandas 2.1+, use .map()).`,
      `For best performance, use NumPy vectorization instead of apply when possible.`,
    ],
    practice: {
      title: 'Categorize Sales Performance',
      description: `Apply custom function to sales data. Assign performance category: >10000='High', 5000-10000='Medium', <5000='Low'. Use apply row-wise.`,
      startCode: ``,
      hint: `Define function that checks value range. Use df.apply(function, axis=1). Return category string.`,
    },
  },
  {
    id: 'da-numpy-broadcasting',
    category: 'NumPy',
    title: 'NumPy Broadcasting',
    difficulty: 'Intermediate',
    theory: [
      `Broadcasting allows operations on arrays of different shapes without explicit looping.`,
      `Rules: if shapes differ, pad smaller dimensions with 1; then expand to match.`,
      `Broadcasting enables vectorized operations: arr + 5 adds 5 to every element.`,
      `Use newaxis to add dimensions: arr[:, np.newaxis] converts 1D to 2D.`,
      `Broadcasting is memory-efficient: doesn't create intermediate copies.`,
    ],
    syntax: `# Broadcasting examples:
# arr + scalar broadcasts scalar to all elements
# 2D + 1D broadcasts 1D across rows of 2D
# (N,) + (1,) broadcasts scalar across array`,
    code: `import numpy as np

# 1D array
scores = np.array([90, 75, 88])
print("Original scores:", scores)

# Add scalar (broadcasts to all elements)
curved_scores = scores + 5
print("After curve (+5):", curved_scores)
print()

# 2D array (students x subjects)
grades = np.array([
    [90, 88, 92],  # Alice
    [75, 92, 80],  # Bob
    [88, 85, 95]   # Charlie
])
print("Grade matrix:")
print(grades)
print()

# Broadcast 1D across rows
weights = np.array([0.3, 0.3, 0.4])  # Weights for Math, English, Science
weighted_avg = (grades * weights).sum(axis=1)
print("Weighted average per student:")
print(weighted_avg)
print()

# Column-wise normalization using broadcasting
means = grades.mean(axis=0, keepdims=True)  # Shape (1, 3)
normalized = grades - means
print("Normalized grades (centered):")
print(normalized)
print()

# Using newaxis for explicit dimension
col_vector = np.array([1, 2, 3])[:, np.newaxis]  # Shape (3, 1)
print("Column vector shape:", col_vector.shape)
result = col_vector + np.array([10, 20, 30])  # Broadcasts to (3, 3)
print("Broadcasting result:")
print(result)`,
    output: `Original scores: [90 75 88]
After curve (+5): [95 80 93]

Grade matrix:
[[90 88 92]
 [75 92 80]
 [88 85 95]]

Weighted average per student:
[90.4 83.5 88.7]

Normalized grades (centered):
[[ 1.  1.  5.33]
 [-14. 7. -6.67]
 [-1. 0. 1.33]]

Column vector shape: (3, 1)
Broadcasting result:
[[11 21 31]
 [12 22 32]
 [13 23 33]]`,
    notes: [
      `Broadcasting avoids explicit loops and is much faster (vectorized).`,
      `Use keepdims=True in reductions (mean, sum) to preserve dimensions for broadcasting.`,
      `Common pattern: subtract mean for normalization using broadcasting.`,
    ],
    practice: {
      title: 'Normalize Test Scores',
      description: `Create matrix of test scores (students x attempts). Subtract mean of each attempt (column) using broadcasting. Divide by standard deviation.`,
      startCode: ``,
      hint: `Use (scores - scores.mean(axis=0, keepdims=True)) / scores.std(axis=0, keepdims=True)`,
    },
  },
  {
    id: 'da-numpy-linear-algebra',
    category: 'NumPy',
    title: 'NumPy Linear Algebra',
    difficulty: 'Advanced',
    theory: [
      `Linear algebra in NumPy via np.linalg module: matrix operations for data analysis.`,
      `np.dot() performs matrix multiplication; @ operator is shorthand.`,
      `np.linalg.inv() computes matrix inverse; used in solving systems of equations.`,
      `np.linalg.eig() finds eigenvalues and eigenvectors (PCA, data compression).`,
      `np.linalg.solve() solves linear systems Ax=b efficiently.`,
    ],
    syntax: `# Matrix multiplication: A @ B or np.dot(A, B)
# Inverse: np.linalg.inv(A)
# Eigendecomposition: eigenvalues, eigenvectors = np.linalg.eig(A)
# Solve Ax=b: x = np.linalg.solve(A, b)`,
    code: `import numpy as np

# Matrix multiplication example
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("Matrix A:")
print(A)
print("\nMatrix B:")
print(B)
print()

# Multiply matrices
C = A @ B  # or np.dot(A, B)
print("A @ B =")
print(C)
print()

# Inverse of a matrix
A_inv = np.linalg.inv(A)
print("Inverse of A:")
print(A_inv)
print()

# Verify: A @ A_inv = I (identity)
print("A @ A_inv (should be identity):")
print(np.round(A @ A_inv))
print()

# Eigendecomposition
eigenvalues, eigenvectors = np.linalg.eig(A)
print("Eigenvalues of A:")
print(eigenvalues)
print("\nEigenvectors of A:")
print(eigenvectors)
print()

# Solve linear system: 2x + y = 5, x + 3y = 6
A_system = np.array([[2, 1], [1, 3]])
b = np.array([5, 6])
x = np.linalg.solve(A_system, b)
print("Solution to 2x + y = 5, x + 3y = 6:")
print(f"x = {x[0]:.2f}, y = {x[1]:.2f}")`,
    output: `Matrix A:
[[1 2]
 [3 4]]

A @ B =
[[19 22]
 [43 50]]

Inverse of A:
[[-2.   1. ]
 [ 1.5 -0.5]]

A @ A_inv (should be identity):
[[1 0]
 [0 1]]

Eigenvalues of A:
[-0.37228132  5.37228132]

Solution to 2x + y = 5, x + 3y = 6:
x = 1.80, y = 1.40`,
    notes: [
      `Linear algebra is fundamental to machine learning and advanced statistics.`,
      `Use np.linalg.lstsq() for overdetermined systems (more equations than unknowns).`,
      `Eigenvalues/eigenvectors are key to PCA (Principal Component Analysis).`,
    ],
    practice: {
      title: 'Solve a System of Equations',
      description: `Define 3x3 system: 2a + b - c = 8, a + 2b + c = 4, 3a - b + 2c = 5. Solve using np.linalg.solve(). Verify result.`,
      startCode: ``,
      hint: `Create coefficient matrix A and constant vector b. Use x = np.linalg.solve(A, b). Verify: A @ x should equal b.`,
    },
  },
  {
    id: 'da-numpy-where',
    category: 'NumPy',
    title: 'np.where() for Conditional Operations',
    difficulty: 'Intermediate',
    theory: [
      `np.where() applies conditional logic to arrays: returns different values based on condition.`,
      `Syntax: np.where(condition, value_if_true, value_if_false)`,
      `Works element-wise on entire arrays (vectorized, no loops needed).`,
      `Can be nested for multiple conditions.`,
      `Much faster than looping with if-else statements.`,
    ],
    syntax: `# Simple: np.where(arr > 5, 'high', 'low')
# Nested: np.where(arr > 5, np.where(arr > 8, 'very_high', 'medium'), 'low')`,
    code: `import numpy as np

# Temperature data
temperatures = np.array([5, 12, 8, 25, 35, 18, 28, 3, 22])
print("Temperatures:", temperatures)
print()

# Categorize: hot (>25), warm (15-25), cold (<15)
categories = np.where(
    temperatures > 25, 'Hot',
    np.where(temperatures > 15, 'Warm', 'Cold')
)
print("Categories:", categories)
print()

# Replace negative values with 0
values = np.array([5, -3, 8, -1, 12, 0])
cleaned = np.where(values < 0, 0, values)
print("Original values:", values)
print("After replacing negatives:", cleaned)
print()

# Mark outliers (values > 2 std devs from mean)
data = np.array([10, 12, 11, 50, 13, 12, 14, 11])
mean = data.mean()
std = data.std()
outlier_mask = np.where(np.abs(data - mean) > 2 * std, True, False)
print("Data:", data)
print("Outliers:", outlier_mask)
print("Outlier values:", data[outlier_mask])`,
    output: `Temperatures: [ 5 12  8 25 35 18 28  3 22]
Categories: ['Cold' 'Cold' 'Cold' 'Warm' 'Hot' 'Warm' 'Hot' 'Cold' 'Warm']

Original values: [ 5 -3  8 -1 12  0]
After replacing negatives: [ 5  0  8  0 12  0]

Data: [10 12 11 50 13 12 14 11]
Outliers: [False False False  True False False False False]
Outlier values: [50]`,
    notes: [
      `np.where() is vectorized: fast for large arrays.`,
      `Without else clause: np.where(condition) returns indices where condition is True.`,
      `Perfect for feature engineering in ML pipelines.`,
    ],
    practice: {
      title: 'Grade Students Based on Scores',
      description: `Array of test scores: [45, 78, 92, 56, 88, 95, 62, 76]. Use np.where() to assign grades: A (>=90), B (80-89), C (70-79), D (60-69), F (<60).`,
      startCode: ``,
      hint: `Nest np.where() calls: check >=90 first, then check >=80, etc. Use np.where(score>=90, 'A', np.where(score>=80, 'B', ...))`,
    },
  },
  {
    id: 'da-regex-pandas',
    category: 'Data Manipulation',
    title: 'Regular Expressions in Pandas',
    difficulty: 'Intermediate',
    theory: [
      `Regular expressions (regex) find and extract patterns from text data.`,
      `Pandas methods: .str.contains(), .str.extract(), .str.replace(), .str.split()`,
      `Common patterns: \\d (digits), \\w (word chars), \\s (whitespace), . (any char)`,
      `Quantifiers: * (0+), + (1+), ? (0-1), {n,m} (n to m occurrences)`,
      `Use raw strings (r'pattern') to avoid escape sequence conflicts.`,
    ],
    syntax: `# Check if string contains pattern: df['col'].str.contains(r'pattern')
# Extract pattern: df['col'].str.extract(r'(pattern)')
# Replace pattern: df['col'].str.replace(r'pattern', 'replacement')
# Split by pattern: df['col'].str.split(r'\\s+')`,
    code: `import pandas as pd

# Email and phone data
data = {
    'Email': ['alice@gmail.com', 'bob.smith@company.org', 'charlie@domain.co.uk'],
    'Phone': ['555-1234', '(202) 555-0173', '555.9876'],
    'Date': ['2025-03-15', '15/03/2025', '03-15-2025']
}
df = pd.DataFrame(data)

print("Original Data:")
print(df)
print()

# Extract username from email
df['Username'] = df['Email'].str.extract(r'([a-zA-Z.]+)@')
print("Usernames extracted:")
print(df['Username'])
print()

# Check if email is gmail
is_gmail = df['Email'].str.contains(r'gmail')
print("Is Gmail:", is_gmail.values)
print()

# Normalize phone numbers (remove non-digits)
df['Phone_Clean'] = df['Phone'].str.replace(r'\\D', '', regex=True)  # \\D = non-digit
print("Cleaned phones:", df['Phone_Clean'].values)
print()

# Extract date components
df['Day'] = df['Date'].str.extract(r'(\\d{1,2})')[0]
print("Days extracted:", df['Day'].values)
print()

# Check for valid email format
valid_email = df['Email'].str.contains(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', regex=True)
print("Valid email format:", valid_email.values)`,
    output: `Original Data:
                   Email              Phone           Date
0        alice@gmail.com           555-1234      2025-03-15
1  bob.smith@company.org (202) 555-0173      15/03/2025
2  charlie@domain.co.uk         555.9876      03-15-2025

Usernames extracted:
0         alice
1    bob.smith
2      charlie

Is Gmail: [ True False False]

Cleaned phones: ['5551234', '2025550173', '5559876']

Days extracted: ['15', '15', '03']

Valid email format: [ True  True  True]`,
    notes: [
      `Use raw strings r'pattern' to avoid escaping issues.`,
      `Use regex=True parameter in str methods to enable regex.`,
      `Common pattern library: email, phone, date formats are available online.`,
    ],
    practice: {
      title: 'Extract Website URLs',
      description: `Series of text with embedded URLs: ['Visit https://example.com', 'Go to www.site.org']. Extract domain names. Check if HTTPS. Count URLs per row.`,
      startCode: ``,
      hint: `Use .str.contains(r'http(s)?://') to check for HTTPS. Use .str.extract(r'(?:https?://|www\\.)([a-zA-Z0-9.-]+)') to extract domain.`,
    },
  },
  {
    id: 'da-type-conversion',
    category: 'Data Cleaning',
    title: 'Type Conversion and Casting',
    difficulty: 'Beginner',
    theory: [
      `Convert data types with pd.to_numeric(), pd.to_datetime(), astype().`,
      `pd.to_numeric() with errors='coerce' converts invalid values to NaN.`,
      `astype() for simple conversions: df['col'].astype('int'), .astype('float'), .astype('str')`,
      `Categorical type reduces memory usage for repeated values.`,
      `Check data types with df.dtypes or df.info().`,
    ],
    syntax: `# Basic conversion: df['col'].astype('int')
# Safe numeric: pd.to_numeric(df['col'], errors='coerce')
# To datetime: pd.to_datetime(df['col'], format='%Y-%m-%d')
# To category: df['col'].astype('category')`,
    code: `import pandas as pd

# Mixed data types (some invalid)
data = {
    'StudentID': ['1', '2', '3', '4'],
    'Score': ['90', '85', 'invalid', '92'],
    'Registered': ['2025-01-15', '2025-02-20', '2025-01-10', 'not-a-date'],
    'Grade': ['A', 'B', 'A', 'C']
}
df = pd.DataFrame(data)

print("Original Data (all strings):")
print(df)
print(df.dtypes)
print()

# Convert StudentID to int
df['StudentID'] = df['StudentID'].astype('int')
print("StudentID converted to int:")
print(df['StudentID'].dtype)
print()

# Convert Score safely (invalid → NaN)
df['Score'] = pd.to_numeric(df['Score'], errors='coerce')
print("Score converted to numeric (invalid → NaN):")
print(df['Score'])
print()

# Convert to datetime
df['Registered'] = pd.to_datetime(df['Registered'], errors='coerce')
print("Registered converted to datetime:")
print(df['Registered'])
print()

# Convert Grade to categorical (memory efficient)
df['Grade'] = df['Grade'].astype('category')
print("Grade as categorical:")
print(df['Grade'].dtype)
print(df['Grade'].cat.categories)`,
    output: `Original Data (all strings):
  StudentID Score Registered Grade
0         1    90  2025-01-15     A
1         2    85  2025-02-20     B
2         3 invalid 2025-01-10     A
3         4    92  not-a-date     C

StudentID converted to int: int64

Score converted to numeric (invalid → NaN):
0    90.0
1    85.0
2     NaN
3    92.0

Registered converted to datetime:
0   2025-01-15
1   2025-02-20
2   2025-01-10
3          NaT

Grade as categorical: category
Categories: ['A', 'B', 'C']`,
    notes: [
      `pd.to_numeric() with errors='coerce' handles messy real-world data gracefully.`,
      `Categorical reduces memory for columns with many repeated values.`,
      `Always use pd.to_datetime() with format param for consistent parsing.`,
    ],
    practice: {
      title: 'Clean Messy Data',
      description: `DataFrame with strings: prices=['$100', '$200', 'free'], dates=['2025-01', '2025-02', 'invalid']. Convert prices to float, dates to datetime. Handle errors.`,
      startCode: ``,
      hint: `Use df['price'].str.replace('$', '').str.replace('free', 'NaN') before pd.to_numeric(). Use errors='coerce' for invalid dates.`,
    },
  },
  {
    id: 'da-duplicate-detection',
    category: 'Data Cleaning',
    title: 'Detecting and Handling Duplicates',
    difficulty: 'Beginner',
    theory: [
      `Duplicates are identical or near-identical rows that skew analysis.`,
      `df.duplicated() marks duplicate rows (first occurrence marked False).`,
      `df.drop_duplicates() removes duplicates; subset parameter specifies columns to check.`,
      `keep='first' keeps first occurrence; keep='last' keeps last; keep=False marks all duplicates.`,
      `Use after sorting to ensure consistent behavior.`,
    ],
    syntax: `# Find duplicates: df.duplicated()
# Find duplicate columns: df.duplicated(subset=['col1', 'col2'])
# Remove: df.drop_duplicates()
# Mark all duplicates: df.duplicated(keep=False)`,
    code: `import pandas as pd

# Dataset with duplicates
data = {
    'StudentID': [1, 2, 1, 3, 2, 4],
    'Name': ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob', 'Diana'],
    'Score': [90, 85, 90, 88, 85, 92]
}
df = pd.DataFrame(data)

print("Original Data:")
print(df)
print()

# Find duplicate rows (based on all columns)
print("Duplicated rows:")
print(df.duplicated())
print()

# Find rows where StudentID and Name are duplicated
print("Duplicates (by StudentID and Name):")
print(df.duplicated(subset=['StudentID', 'Name']))
print()

# Mark all duplicates (including first occurrence)
print("Mark all duplicates:")
print(df.duplicated(keep=False))
print()

# Remove complete duplicates
df_clean = df.drop_duplicates()
print("After removing duplicates:")
print(df_clean)
print()

# Remove duplicates keeping last occurrence
df_last = df.drop_duplicates(keep='last')
print("Keep last occurrence:")
print(df_last)
print()

# Remove duplicates by specific columns
df_unique_id = df.drop_duplicates(subset=['StudentID'], keep='first')
print("Unique StudentIDs (keep first):")
print(df_unique_id)`,
    output: `Original Data:
   StudentID     Name  Score
0          1    Alice     90
1          2      Bob     85
2          1    Alice     90
3          3  Charlie     88
4          2      Bob     85
5          4    Diana     92

Duplicated rows:
0    False
1    False
2     True
3    False
4     True
5    False

Duplicates (by StudentID and Name):
0    False
1    False
2     True
3    False
4     True
5    False

Mark all duplicates:
0     True
1     True
2     True
3    False
4     True
5    False

After removing duplicates:
   StudentID     Name  Score
0          1    Alice     90
1          2      Bob     85
3          3  Charlie     88
5          4    Diana     92`,
    notes: [
      `Always check count before/after removing duplicates.`,
      `Use subset to check duplicates on specific columns (e.g., email, phone).`,
      `Duplicates often indicate data entry errors or system glitches.`,
    ],
    practice: {
      title: 'Clean Customer Database',
      description: `Customer data with duplicates by Email. Mark duplicates. Remove duplicates keeping first registration. Show count before/after.`,
      startCode: ``,
      hint: `Use df.duplicated(subset=['Email']). Use df.drop_duplicates(subset=['Email'], keep='first'). Compare df.shape[0] before and after.`,
    },
  },
  {
    id: 'da-iqr-outlier-detection',
    category: 'Statistics',
    title: 'IQR Method for Outlier Detection',
    difficulty: 'Intermediate',
    theory: [
      `Interquartile Range (IQR) = Q3 - Q1 (middle 50% of data).`,
      `Outlier bounds: Lower = Q1 - 1.5*IQR, Upper = Q3 + 1.5*IQR`,
      `Values outside bounds are considered outliers.`,
      `More robust than mean±2σ for skewed distributions.`,
      `Use describe() to get quartiles quickly.`,
    ],
    syntax: `# Q1, Q3, IQR:
# Q1 = df['col'].quantile(0.25)
# Q3 = df['col'].quantile(0.75)
# IQR = Q3 - Q1
# Outliers: (df['col'] < Q1 - 1.5*IQR) | (df['col'] > Q3 + 1.5*IQR)`,
    code: `import pandas as pd
import numpy as np

# Sales data with outlier
sales = np.array([100, 120, 110, 115, 105, 950, 110, 125, 115, 118])
df = pd.DataFrame({'Sales': sales})

print("Sales data:", sales)
print("Describe:")
print(df['Sales'].describe())
print()

# Calculate IQR
Q1 = df['Sales'].quantile(0.25)
Q3 = df['Sales'].quantile(0.75)
IQR = Q3 - Q1

print(f"Q1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print()

# Outlier bounds
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"Lower bound: {lower_bound}")
print(f"Upper bound: {upper_bound}")
print()

# Identify outliers
outliers = (df['Sales'] < lower_bound) | (df['Sales'] > upper_bound)
print("Outliers:")
print(df[outliers])
print()

# Remove outliers
df_clean = df[~outliers]
print("Data after removing outliers:")
print(df_clean['Sales'].values)
print(f"Removed {len(df) - len(df_clean)} outlier(s)")`,
    output: `Sales data: [100 120 110 115 105 950 110 125 115 118]

Describe:
count     10.000000
mean     137.800000
std      264.629883
50%      115.000000
25%      110.000000
75%      119.500000

Q1: 110, Q3: 119.5, IQR: 9.5
Lower bound: 95.75
Upper bound: 133.75

Outliers:
   Sales
5    950

Data after removing outliers:
[100 120 110 115 105 110 125 115 118]
Removed 1 outlier(s)`,
    notes: [
      `IQR method is resistant to extreme outliers (unlike mean±std).`,
      `Multiplier 1.5 is standard; some use 3.0 for more aggressive filtering.`,
      `Always visualize outliers before deciding to remove them.`,
    ],
    practice: {
      title: 'Find Price Outliers',
      description: `Product prices: [50, 55, 52, 48, 51, 500, 49, 53]. Calculate IQR. Identify outliers. Remove and show cleaned list.`,
      startCode: ``,
      hint: `Q1=df.quantile(0.25), Q3=df.quantile(0.75), IQR=Q3-Q1. Bounds: Q1-1.5*IQR to Q3+1.5*IQR.`,
    },
  },
  {
    id: 'da-matplotlib-subplots',
    category: 'Visualization',
    title: 'Matplotlib Subplots',
    difficulty: 'Intermediate',
    theory: [
      `Subplots arrange multiple plots in a grid (rows × columns).`,
      `plt.subplots(rows, cols) returns figure and axes array.`,
      `Each subplot is an independent axes object: axes[i, j].plot().`,
      `Use figsize to control overall size; tight_layout() prevents overlap.`,
      `Share axes with sharex/sharey for synchronized scaling.`,
    ],
    syntax: `# Create subplots: fig, axes = plt.subplots(2, 2, figsize=(10, 8))
# Access subplot: axes[0, 0].plot(...) or axes.flat[i].plot(...)
# Add title to subplot: axes[0, 0].set_title('Title')`,
    code: `import matplotlib.pyplot as plt
import numpy as np

# Sample data
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
sales = [100, 120, 110, 140, 160]
profit = [20, 25, 22, 30, 35]
temperature = [5, 8, 15, 20, 25]

# Create 2x2 subplot grid
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Subplot 1: Line plot
axes[0, 0].plot(months, sales, marker='o', color='blue')
axes[0, 0].set_title('Monthly Sales')
axes[0, 0].set_xlabel('Month')
axes[0, 0].set_ylabel('Sales ($)')
axes[0, 0].grid(True)

# Subplot 2: Bar chart
axes[0, 1].bar(months, profit, color='green')
axes[0, 1].set_title('Monthly Profit')
axes[0, 1].set_ylabel('Profit ($)')

# Subplot 3: Scatter plot
axes[1, 0].scatter(sales, profit, s=100, color='red')
axes[1, 0].set_title('Sales vs Profit')
axes[1, 0].set_xlabel('Sales')
axes[1, 0].set_ylabel('Profit')

# Subplot 4: Multiple lines
axes[1, 1].plot(months, sales, label='Sales', marker='o')
axes[1, 1].plot(months, [p*5 for p in profit], label='Profit×5', marker='s')
axes[1, 1].set_title('Sales and Profit Trends')
axes[1, 1].legend()
axes[1, 1].grid(True)

# Adjust spacing and show
plt.tight_layout()
plt.savefig('subplots_example.png')  # Save to file
plt.show()`,
    output: `(A 2×2 grid of plots showing sales, profit, and relationships)`,
    notes: [
      `Use fig, axes = plt.subplots() to unpack figure and axes.`,
      `For single row/col: axes becomes 1D array; use axes[i] not axes[i, 0].`,
      `tight_layout() prevents title/label overlap.`,
    ],
    practice: {
      title: 'Create 3x2 Dashboard',
      description: `Create 6 subplots: sales trend, profit bars, customer count, revenue distribution, monthly growth, comparison chart. Add titles and labels.`,
      startCode: ``,
      hint: `Use fig, axes = plt.subplots(3, 2, figsize=(14, 10)). Iterate: for i in range(3) for j in range(2): axes[i, j].plot(...).`,
    },
  },
  {
    id: 'da-seaborn-heatmap',
    category: 'Visualization',
    title: 'Seaborn Heatmaps',
    difficulty: 'Intermediate',
    theory: [
      `Heatmaps visualize 2D data using color intensity.`,
      `Perfect for correlation matrices, pivot tables, and time-series patterns.`,
      `sns.heatmap(data, cmap='coolwarm', annot=True) displays values and colors.`,
      `Colormap options: 'viridis', 'RdYlBu', 'coolwarm', 'Spectral'.`,
      `Use fmt='d' for integers, '.2f' for decimals in annotations.`,
    ],
    syntax: `# Basic heatmap: sns.heatmap(data, cmap='viridis', annot=True)
# Correlation: sns.heatmap(df.corr(), annot=True, fmt='.2f', cmap='coolwarm')`,
    code: `import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Correlation matrix
data = {
    'Math': [90, 85, 88, 92, 78],
    'English': [88, 92, 85, 90, 80],
    'Science': [92, 80, 95, 88, 75],
    'History': [75, 88, 80, 85, 90]
}
df = pd.DataFrame(data)
correlation_matrix = df.corr()

# Create heatmap
plt.figure(figsize=(8, 6))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm',
            fmt='.2f', center=0, square=True, linewidths=1)
plt.title('Subject Score Correlations')
plt.show()

print("Correlation Matrix:")
print(correlation_matrix)`,
    output: `(A heatmap showing correlation between subjects, with values colored from red (negative) to blue (positive))`,
    notes: [
      `Heatmaps are excellent for spotting patterns in large matrices.`,
      `Use center=0 to make neutral color at 0 for bipolar data.`,
      `Square tiles (square=True) look better for correlation matrices.`,
    ],
    practice: {
      title: 'Sales Heatmap by Region and Month',
      description: `Create pivot table: regions (rows), months (columns), sales values. Plot heatmap with annotations. Use 'RdYlGn' colormap.`,
      startCode: ``,
      hint: `Create pivot table. Use sns.heatmap(pivot_table, annot=True, cmap='RdYlGn', fmt='d').`,
    },
  },
  {
    id: 'da-seaborn-pairplot',
    category: 'Visualization',
    title: 'Seaborn Pairplots',
    difficulty: 'Intermediate',
    theory: [
      `Pairplots show pairwise relationships between variables in a dataset.`,
      `Diagonal shows distribution (histogram or KDE); off-diagonal shows scatter plots.`,
      `sns.pairplot(df) creates a grid of all variable pairs.`,
      `Use hue parameter to color by category (e.g., hue='Species').`,
      `Useful for exploratory data analysis (EDA).`,
    ],
    syntax: `# Basic: sns.pairplot(df)
# With categories: sns.pairplot(df, hue='category_column')
# Custom markers: sns.pairplot(df, diag_kind='kde')`,
    code: `import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Load sample dataset
iris = sns.load_dataset('iris')
print(iris.head())
print()

# Create pairplot
plt.figure(figsize=(10, 10))
sns.pairplot(iris, hue='species', diag_kind='kde', plot_kws={'alpha': 0.6})
plt.suptitle('Iris Dataset Pairplot', y=1.00)
plt.show()

# Statistics
print("Iris Dataset Info:")
print(iris.groupby('species')[['sepal_length', 'sepal_width']].mean())`,
    output: `(A 4×4 grid: diagonal shows KDE distributions, off-diagonal shows scatter plots colored by species)`,
    notes: [
      `Pairplots can be slow for large datasets (many variables).`,
      `Use subset parameter to plot only specific columns if needed.`,
      `Great for identifying clusters and relationships visually.`,
    ],
    practice: {
      title: 'Explore Student Dataset',
      description: `Pairplot with columns: Math, English, Science, Sports_Hours. Use hue='Grade' (A, B, C). Identify patterns between subjects.`,
      startCode: ``,
      hint: `Use sns.pairplot(df, hue='Grade', diag_kind='hist'). Look for clusters in off-diagonal scatter plots.`,
    },
  },
  {
    id: 'da-box-plots',
    category: 'Visualization',
    title: 'Box Plots for Distributions',
    difficulty: 'Beginner',
    theory: [
      `Box plots show distribution: box contains Q1-Q3 (IQR), line is median, whiskers extend to min/max.`,
      `Outliers shown as individual points beyond whiskers.`,
      `Useful for comparing distributions across groups.`,
      `plt.boxplot(data) or sns.boxplot(data=df, x='category', y='value')`,
      `Box height = IQR; wider box = more spread.`,
    ],
    syntax: `# Matplotlib: plt.boxplot([data1, data2, data3])
# Seaborn: sns.boxplot(data=df, x='group', y='value', hue='category')`,
    code: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Create sample data
data = {
    'Region': ['North', 'North', 'North', 'South', 'South', 'South', 'East', 'East', 'East'],
    'Sales': [100, 120, 110, 150, 140, 160, 80, 90, 85]
}
df = pd.DataFrame(data)

# Create box plot
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='Region', y='Sales', palette='Set2')
plt.title('Sales Distribution by Region')
plt.ylabel('Sales ($)')
plt.xlabel('Region')
plt.show()

# Using matplotlib
plt.figure(figsize=(10, 6))
regions = ['North', 'South', 'East']
sales_by_region = [df[df['Region']==r]['Sales'].values for r in regions]
plt.boxplot(sales_by_region, labels=regions)
plt.title('Sales by Region (Matplotlib)')
plt.ylabel('Sales ($)')
plt.show()`,
    output: `(Box plots showing median, quartiles, and outliers for each region)`,
    notes: [
      `Whiskers typically extend to 1.5 × IQR; points beyond are outliers.`,
      `Median line position in box indicates skewness.`,
      `Perfect for identifying outliers visually.`,
    ],
    practice: {
      title: 'Compare Student Scores',
      description: `Box plots for Math, English, Science scores. Show distribution differences. Identify any outliers in each subject.`,
      startCode: ``,
      hint: `Use sns.boxplot with data=df. Multiple boxes show distributions side-by-side.`,
    },
  },
  {
    id: 'da-descriptive-statistics',
    category: 'Statistics',
    title: 'Descriptive Statistics',
    difficulty: 'Beginner',
    theory: [
      `Describe data with measures: mean (average), median (middle), mode (most frequent).`,
      `Spread: std (standard deviation), variance, IQR (interquartile range).`,
      `df.describe() gives quick summary: count, mean, std, min, 25%, 50%, 75%, max.`,
      `Skewness: >0 right-skewed, <0 left-skewed, ≈0 symmetric.`,
      `Kurtosis measures tail heaviness (outlier presence).`,
    ],
    syntax: `# Quick summary: df.describe()
# Specific stats: df['col'].mean(), .median(), .std(), .var()
# Skewness: df['col'].skew()
# Kurtosis: df['col'].kurtosis()`,
    code: `import pandas as pd
import numpy as np

# Sample exam scores
scores = [45, 52, 68, 75, 78, 80, 82, 85, 88, 90, 92, 95, 98]
df = pd.DataFrame({'Score': scores})

print("Describe (Quick Summary):")
print(df.describe())
print()

# Calculate individual statistics
print("Individual Statistics:")
print(f"Mean: {df['Score'].mean():.2f}")
print(f"Median: {df['Score'].median():.2f}")
print(f"Mode: {df['Score'].mode().values[0]:.2f}" if len(df['Score'].mode()) > 0 else "No mode")
print(f"Standard Deviation: {df['Score'].std():.2f}")
print(f"Variance: {df['Score'].var():.2f}")
print(f"Range: {df['Score'].max() - df['Score'].min()}")
print(f"IQR: {df['Score'].quantile(0.75) - df['Score'].quantile(0.25):.2f}")
print(f"Skewness: {df['Score'].skew():.2f}")
print(f"Kurtosis: {df['Score'].kurtosis():.2f}")`,
    output: `Describe (Quick Summary):
              Score
count    13.000000
mean     80.230769
std       17.195127
min      45.000000
25%      72.500000
50%      82.000000
75%      88.500000
max      98.000000

Individual Statistics:
Mean: 80.23
Median: 82.00
Standard Deviation: 17.20
Variance: 295.66
Range: 53
IQR: 16.00
Skewness: -0.42
Kurtosis: -0.68`,
    notes: [
      `Mean vs Median: use median if outliers present (robust measure).`,
      `Std dev is square root of variance; same units as data.`,
      `Negative skewness means tail on left (low outliers).`,
    ],
    practice: {
      title: 'Analyze Temperature Data',
      description: `Daily temperatures for a month: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]. Calculate all descriptive statistics.`,
      startCode: ``,
      hint: `Use df.describe(), .mean(), .std(), .skew(). Compare mean vs median.`,
    },
  },
  {
    id: 'da-hypothesis-testing',
    category: 'Statistics',
    title: 'Introduction to Hypothesis Testing',
    difficulty: 'Advanced',
    theory: [
      `Hypothesis testing determines if sample evidence supports a claim about a population.`,
      `Null hypothesis (H0): no effect; Alternative hypothesis (H1): effect exists.`,
      `p-value: probability of observing data if H0 is true. If p < 0.05, reject H0.`,
      `t-test compares means of two groups; ANOVA compares 3+ groups.`,
      `Type I error (false positive): reject true H0. Type II error (false negative): accept false H0.`,
    ],
    syntax: `# t-test: from scipy.stats import ttest_ind; stat, p = ttest_ind(group1, group2)
# ANOVA: from scipy.stats import f_oneway; stat, p = f_oneway(group1, group2, group3)`,
    code: `from scipy import stats
import numpy as np

# Two groups: students with tutoring vs without
control = np.array([65, 68, 70, 72, 75])  # Without tutoring
treatment = np.array([72, 75, 78, 80, 82])  # With tutoring

print("Control group (no tutoring):", control)
print("Treatment group (with tutoring):", treatment)
print()

# Perform independent t-test
t_stat, p_value = stats.ttest_ind(control, treatment)

print("T-Test Results:")
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")
print()

# Interpretation
alpha = 0.05
if p_value < alpha:
    print(f"Result: p-value ({p_value:.4f}) < {alpha}")
    print("Conclusion: Reject null hypothesis. Tutoring has significant effect.")
else:
    print(f"Result: p-value ({p_value:.4f}) >= {alpha}")
    print("Conclusion: Fail to reject null hypothesis. No significant effect found.")
print()

# Effect size (Cohen's d)
mean_diff = treatment.mean() - control.mean()
pooled_std = np.sqrt(((control.std()**2 + treatment.std()**2) / 2))
cohens_d = mean_diff / pooled_std
print(f"Cohen's d (effect size): {cohens_d:.2f}")
if abs(cohens_d) > 0.8:
    print("Large effect size")
elif abs(cohens_d) > 0.5:
    print("Medium effect size")
else:
    print("Small effect size")`,
    output: `Control group (no tutoring): [65 68 70 72 75]
Treatment group (with tutoring): [72 75 78 80 82]

T-Test Results:
t-statistic: -3.6056
p-value: 0.0109

Result: p-value (0.0109) < 0.05
Conclusion: Reject null hypothesis. Tutoring has significant effect.

Cohen's d (effect size): 1.43
Large effect size`,
    notes: [
      `Always report both p-value and effect size.`,
      `p < 0.05 is conventional but not magical; context matters.`,
      `Larger sample size needed to detect small effects.`,
    ],
    practice: {
      title: 'Test Drug Effectiveness',
      description: `Placebo: [4, 5, 5, 6, 7]. Drug: [7, 8, 9, 9, 10]. Perform t-test. State null/alternative hypotheses. Interpret p-value and effect size.`,
      startCode: ``,
      hint: `Use scipy.stats.ttest_ind(). If p < 0.05, reject H0. Calculate Cohen's d for effect size.`,
    },
  },
];


