import { TutorialTopic } from './types';

/**
 * Excel & Google Sheets — one of the highest-ROI, most-requested job skills in
 * India across every field (finance, ops, marketing, data). Non-programming
 * course: the "code" blocks are real formulas, "output" is the cell result,
 * and practice asks the learner to write the correct formula. Feedback editor.
 */
export const excelTopics: TutorialTopic[] = [
  {
    id: 'excel-intro',
    category: 'Foundations',
    title: 'Spreadsheets, Cells & References',
    difficulty: 'Beginner',
    theory: [
      'A spreadsheet is a grid of cells organised into columns (letters A, B, C…) and rows (numbers 1, 2, 3…). Every cell has an address like B4 (column B, row 4). You type numbers, text or dates into cells, and — the real power — formulas that calculate from other cells. Everything here works the same in Microsoft Excel and Google Sheets.',
      'Every formula begins with an equals sign =. `=A1+A2` adds the two cells; change A1 and the result updates automatically. This "live recalculation" is what makes spreadsheets so useful for budgets, marks, and reports — you build the logic once and reuse it with new numbers.',
      'References come in two kinds. A relative reference (A1) shifts when you copy the formula down or across. An absolute reference ($A$1) stays locked. Mixing them ($A1 or A$1) locks only the column or only the row. Mastering $ is the single biggest step from beginner to confident spreadsheet user.',
    ],
    syntax: '=A1+A2        (relative)\n=$A$1*B1      ($A$1 stays fixed when copied)',
    code: `A1: 10
A2: 20
A3: =A1+A2          → shows 30

Copy =A1*2 from B1 down to B2:
B1: =A1*2           → 20
B2: =A2*2           → 40   (the A shifted automatically)`,
    output: 'A3 = 30, B1 = 20, B2 = 40',
    notes: [
      'Press F4 (Excel) while editing a reference to cycle A1 → $A$1 → A$1 → $A1.',
      'Text is left-aligned by default, numbers right-aligned — a quick way to spot a number stored as text.',
      'Start every formula with = or the cell just shows the text you typed.',
    ],
    xp: 10,
    practice: {
      title: 'Total of three cells',
      description: 'Cells A1, A2, A3 hold 15, 25, 60. Write a formula in A4 that shows their total (100).',
      startCode: `A1: 15\nA2: 25\nA3: 60\nA4: =`,
      hint: 'Add the three cells, or use =SUM(A1:A3).',
      solution: `A4: =SUM(A1:A3)     → 100`,
      expectedOutput: '100',
    },
  },
  {
    id: 'excel-basic-formulas',
    category: 'Formulas',
    title: 'SUM, AVERAGE, COUNT, MIN & MAX',
    difficulty: 'Beginner',
    theory: [
      'The most-used functions summarise a range of cells. SUM adds them, AVERAGE takes the mean, COUNT counts how many are numbers, COUNTA counts non-empty cells, MIN and MAX find the smallest and largest. A range is written with a colon: A2:A10 means "A2 through A10".',
      'These functions ignore empty cells and text automatically, which is usually what you want. AVERAGE of a range with a blank cell divides by the number of actual numbers, not the total rows — an important detail when marks are missing.',
      'You can combine them: `=MAX(A2:A10)-MIN(A2:A10)` gives the range (spread) of values, and `=SUM(A2:A10)/COUNT(A2:A10)` reproduces AVERAGE. Understanding that functions just take a range and return one value is the mental model for everything that follows.',
    ],
    syntax: '=SUM(B2:B8)\n=AVERAGE(B2:B8)\n=MAX(B2:B8)\n=COUNT(B2:B8)',
    code: `Marks in B2:B6 → 88, 76, 92, 65, 79

=SUM(B2:B6)       → 400
=AVERAGE(B2:B6)   → 80
=MAX(B2:B6)       → 92
=MIN(B2:B6)       → 65
=COUNT(B2:B6)     → 5`,
    output: 'Sum 400, Average 80, Max 92, Min 65, Count 5',
    notes: [
      'COUNT counts numbers only; use COUNTA to count any non-empty cell (including text).',
      'Select a range and Excel shows Sum/Average/Count live in the status bar — a quick sanity check.',
      'AVERAGE ignores blanks; if you want blanks treated as zero, that changes the result — be deliberate.',
    ],
    xp: 12,
    practice: {
      title: 'Class average',
      description: 'Scores are in C2:C11. Write one formula that returns the average score, rounded to whole numbers is not required.',
      startCode: `Scores: C2:C11\nAverage: =`,
      hint: 'Use the AVERAGE function over the whole range.',
      solution: `=AVERAGE(C2:C11)`,
      expectedOutput: '=AVERAGE(C2:C11)',
    },
  },
  {
    id: 'excel-if-logical',
    category: 'Formulas',
    title: 'IF & Logical Functions',
    difficulty: 'Beginner',
    theory: [
      'IF makes a decision: `=IF(condition, value_if_true, value_if_false)`. For example `=IF(B2>=40, "Pass", "Fail")` labels each student. The condition uses comparison operators (>, <, >=, <=, =, <>). IF is the workhorse of every real spreadsheet — automating decisions across thousands of rows.',
      'You can nest IFs for multiple bands: `=IF(B2>=90,"A",IF(B2>=75,"B",IF(B2>=40,"C","F")))`. Evaluation stops at the first true condition, so order your thresholds from highest to lowest. For many bands, IFS (newer Excel/Sheets) or a lookup table is cleaner than deep nesting.',
      'Combine conditions with AND and OR: `=IF(AND(B2>=40, C2>=40), "Pass", "Fail")` passes only if both subjects clear 40. `OR` passes if either does. These read exactly like the logic you would say out loud.',
    ],
    syntax: '=IF(B2>=40, "Pass", "Fail")\n=IF(AND(B2>=40, C2>=40), "Pass", "Fail")',
    code: `B2 = 82 (marks)

=IF(B2>=40, "Pass", "Fail")             → Pass
=IF(B2>=90,"A",IF(B2>=75,"B","C"))      → B

Two subjects: B2=82, C2=35
=IF(AND(B2>=40, C2>=40),"Pass","Fail")  → Fail  (C2 below 40)`,
    output: 'Pass, B, Fail',
    notes: [
      'Text results must be in "double quotes"; numbers are written plain.',
      'Nested IFs are checked left to right — put the strictest (highest) condition first.',
      '<> means "not equal to" in a spreadsheet formula.',
    ],
    xp: 15,
    practice: {
      title: 'Discount flag',
      description: 'A purchase amount is in D2. Write a formula that shows "Discount" if D2 is 1000 or more, otherwise "Full price".',
      startCode: `D2: 1500\nFormula: =`,
      hint: 'Use IF with the condition D2>=1000.',
      solution: `=IF(D2>=1000, "Discount", "Full price")   → Discount`,
      expectedOutput: 'Discount',
    },
  },
  {
    id: 'excel-lookup',
    category: 'Formulas',
    title: 'VLOOKUP, XLOOKUP & INDEX/MATCH',
    difficulty: 'Intermediate',
    theory: [
      'Lookups pull a value from a table by matching a key — e.g. find a price given a product code, or a name given a roll number. VLOOKUP is the classic: `=VLOOKUP(key, table_range, column_number, FALSE)`. The final FALSE demands an exact match (almost always what you want). VLOOKUP searches the FIRST column of the table and returns a value from a column to its right.',
      'VLOOKUP\'s weaknesses: it can only look to the right, and the column number breaks if you insert a column. The modern replacement is XLOOKUP: `=XLOOKUP(key, lookup_range, return_range)` — it can look left or right, and you point at the exact columns so inserting rows/columns doesn\'t break it. Use XLOOKUP if your Excel/Sheets supports it.',
      'INDEX/MATCH is the powerful older alternative that also looks in any direction: `=INDEX(return_range, MATCH(key, lookup_range, 0))`. MATCH finds the position of the key; INDEX returns the value at that position. Knowing at least one robust lookup is essential for any data or office job.',
    ],
    syntax: '=VLOOKUP("P02", A2:C5, 3, FALSE)\n=XLOOKUP("P02", A2:A5, C2:C5)',
    code: `Table (A2:C5):
A        B          C
P01      Notebook   45
P02      Pen        10
P03      Eraser     5

=VLOOKUP("P02", A2:C5, 3, FALSE)         → 10   (column 3 = price)
=XLOOKUP("P02", A2:A5, B2:B5)            → Pen
=INDEX(C2:C5, MATCH("P03", A2:A5, 0))    → 5`,
    output: '10, Pen, 5',
    notes: [
      'Always pass FALSE (exact match) to VLOOKUP unless your data is sorted and you truly want approximate.',
      'VLOOKUP counts columns starting at the table\'s leftmost column = 1, not the sheet\'s column A.',
      'If a lookup returns #N/A, the key was not found — wrap in IFERROR to show a friendly message.',
    ],
    xp: 20,
    practice: {
      title: 'Price lookup',
      description: 'Using the table A2:C5 above, write a VLOOKUP that returns the price (column 3) for product code "P01" (expected 45).',
      startCode: `=VLOOKUP( ... )`,
      hint: '=VLOOKUP("P01", A2:C5, 3, FALSE)',
      solution: `=VLOOKUP("P01", A2:C5, 3, FALSE)   → 45`,
      expectedOutput: '45',
    },
  },
  {
    id: 'excel-conditional-aggregates',
    category: 'Formulas',
    title: 'SUMIF, COUNTIF & AVERAGEIF',
    difficulty: 'Intermediate',
    theory: [
      'Often you want to summarise only the rows that meet a condition: total sales for one region, count of students who passed, average marks for one class. The …IF family does exactly this. COUNTIF(range, criteria) counts matching cells; SUMIF(range, criteria, sum_range) adds a matching column; AVERAGEIF works the same for the mean.',
      'Criteria can be a value ("Delhi"), a comparison in quotes (">=40"), or a wildcard ("A*" = starts with A). For multiple conditions use the plural versions: SUMIFS, COUNTIFS, AVERAGEIFS, where you list range/criteria pairs — e.g. sales in Delhi AND above ₹500.',
      'These functions replace hours of manual filtering and are the foundation of any dashboard. They are also far more transparent than a pivot table for a single number you want to show in a report cell.',
    ],
    syntax: '=COUNTIF(B2:B20, ">=40")\n=SUMIF(A2:A20, "Delhi", C2:C20)\n=SUMIFS(C2:C20, A2:A20, "Delhi", C2:C20, ">500")',
    code: `Region in A, Sales in C (rows 2..6):
Delhi 600 | Mumbai 400 | Delhi 900 | Chennai 300 | Delhi 200

=COUNTIF(A2:A6, "Delhi")              → 3
=SUMIF(A2:A6, "Delhi", C2:C6)         → 1700
=AVERAGEIF(A2:A6, "Delhi", C2:C6)     → 566.67
=SUMIFS(C2:C6, A2:A6, "Delhi", C2:C6, ">500")  → 1500`,
    output: '3, 1700, 566.67, 1500',
    notes: [
      'Put comparison criteria in quotes: ">=40", not >=40.',
      'In SUMIFS the sum_range comes FIRST, then the pairs; in SUMIF the sum_range comes last — a common mix-up.',
      'COUNTIF with a wildcard: COUNTIF(A2:A6, "D*") counts anything starting with D.',
    ],
    xp: 18,
    practice: {
      title: 'Count the passes',
      description: 'Marks are in B2:B30, pass mark is 40. Write one formula that counts how many students scored 40 or more.',
      startCode: `=COUNTIF( ... )`,
      hint: 'The criteria for "40 or more" is the text ">=40".',
      solution: `=COUNTIF(B2:B30, ">=40")`,
      expectedOutput: '=COUNTIF(B2:B30, ">=40")',
    },
  },
  {
    id: 'excel-text-date',
    category: 'Data Handling',
    title: 'Text & Date Functions',
    difficulty: 'Intermediate',
    theory: [
      'Real data is messy: names with extra spaces, codes you must split, dates in odd formats. Text functions clean it. TRIM removes extra spaces, UPPER/LOWER/PROPER fix case, LEFT/RIGHT/MID extract characters, LEN counts characters, and CONCAT or & joins text. `=A2&" "&B2` joins a first and last name with a space.',
      'Dates in a spreadsheet are actually numbers (days since a start date), which is why you can subtract them: `=B2-A2` gives the number of days between two dates. TODAY() returns the current date, and functions like YEAR(), MONTH(), DAY() and DATEDIF pull parts out or compute age/tenure.',
      'FIND/SEARCH locate a character\'s position (SEARCH is case-insensitive), often combined with LEFT/MID to split "Firstname Lastname" or extract a domain from an email. Data cleaning is 80% of real analytics work, so these functions matter more than beginners expect.',
    ],
    syntax: '=TRIM(A2)\n=PROPER(A2)\n=LEFT(A2, 3)\n=A2 & " " & B2\n=YEAR(TODAY())',
    code: `A2 = "  asha SHARMA  "

=TRIM(A2)                 → "asha SHARMA"
=PROPER(TRIM(A2))         → "Asha Sharma"
=LEN(TRIM(A2))            → 11

Dates: A2 = 01-Jan-2026, B2 = 12-Jul-2026
=B2 - A2                  → 192   (days between)
=YEAR(B2)                 → 2026`,
    output: '"asha SHARMA", "Asha Sharma", 11, 192, 2026',
    notes: [
      'PROPER capitalises the first letter of each word — great for cleaning name columns.',
      'If a date shows as a number like 46000, format the cell as Date — the value is correct, only the display is off.',
      '& is the quickest way to join text; CONCAT and TEXTJOIN do the same for many cells.',
    ],
    xp: 15,
    practice: {
      title: 'Full name',
      description: 'First name is in A2, last name in B2. Write a formula that joins them with a space between (e.g. "Asha Sharma").',
      startCode: `A2: Asha\nB2: Sharma\nFormula: =`,
      hint: 'Use & to join: A2 & " " & B2.',
      solution: `=A2 & " " & B2      → Asha Sharma`,
      expectedOutput: 'Asha Sharma',
    },
  },
  {
    id: 'excel-sort-filter',
    category: 'Data Handling',
    title: 'Sorting, Filtering & Data Cleaning',
    difficulty: 'Beginner',
    theory: [
      'Before analysis, you organise data. Sorting reorders rows by a column (marks high-to-low, names A-Z); you can sort by multiple levels (by class, then by marks within each class). Always sort the whole table, not one column, or you scramble the rows — select any cell in the table and use Data → Sort so Excel keeps rows intact.',
      'Filtering hides rows that don\'t match a criterion without deleting them — show only "Delhi", only marks above 75, only this month. Turn on Data → Filter and use the dropdown arrows. Filters are reversible and non-destructive, ideal for exploring data.',
      'Cleaning steps that prevent wrong results: Remove Duplicates (Data menge), Text to Columns to split "Delhi, 110001" into two columns, and Find & Replace to fix inconsistent spellings ("Dehli" → "Delhi"). Clean data first; every formula downstream depends on it.',
    ],
    syntax: 'Data → Sort (choose column + order)\nData → Filter (dropdown criteria)\nData → Remove Duplicates',
    code: `Steps (menu-driven, not a formula):

1. Click any cell inside your table.
2. Data → Sort → by "Marks", Largest to Smallest.
3. Data → Filter → Region dropdown → tick only "Delhi".
4. Data → Remove Duplicates → choose the key column(s).

Result: table reordered by marks, showing only Delhi rows,
with duplicate entries removed.`,
    output: 'Sorted, filtered, de-duplicated table',
    notes: [
      'Never sort a single column in isolation — select the table (or a cell in it) so all columns move together.',
      'Filtering only hides rows; to keep just the visible ones, copy them to a new sheet.',
      'Remove Duplicates is permanent — work on a copy if you might need the originals.',
    ],
    xp: 12,
    practice: {
      title: 'Plan the clean-up',
      description: 'You have a customer list with trailing spaces in names, some duplicate rows, and a "City, PIN" column. Name the three tools/steps you would use, in order.',
      startCode: `Step 1: ?\nStep 2: ?\nStep 3: ?`,
      hint: 'Think: fix spaces (TRIM), split the combined column (Text to Columns), drop repeats (Remove Duplicates).',
      solution: `Step 1: TRIM to remove trailing spaces\nStep 2: Text to Columns to split "City, PIN"\nStep 3: Remove Duplicates on the key column`,
      expectedOutput: 'TRIM → Text to Columns → Remove Duplicates',
    },
  },
  {
    id: 'excel-pivot',
    category: 'Analysis',
    title: 'Pivot Tables — Summarise Anything',
    difficulty: 'Advanced',
    theory: [
      'A pivot table is the fastest way to summarise a large table without writing a single formula. You drag fields into four zones — Rows, Columns, Values, Filters — and Excel instantly builds a cross-tab. Example: drag Region to Rows and Sales to Values (as Sum) to see total sales per region; add Month to Columns for a region-by-month grid.',
      'The Values zone lets you choose the calculation: Sum, Count, Average, Max, % of total, and more. You can group dates into months/quarters, sort the summary, and drill down by double-clicking a number to see the underlying rows. It turns thousands of rows into a one-screen answer in seconds.',
      'Pivot tables are the skill hiring managers most often mean by "good with Excel". The workflow: clean data in a proper table (each column a field, no blank rows) → Insert → PivotTable → drag fields → read the answer. Refresh the pivot when the source data changes.',
    ],
    syntax: 'Insert → PivotTable\nRows: Region | Columns: Month | Values: Sum of Sales',
    code: `Source data (one row per sale): Date, Region, Product, Sales

Pivot setup:
  Rows    → Region
  Values  → Sum of Sales

Result:
  Region     Total Sales
  Chennai    3,00,000
  Delhi      7,20,000
  Mumbai     5,10,000
  Grand Total 15,30,000`,
    output: 'Per-region sales totals in one click',
    notes: [
      'Source must be a clean table: a header row, no fully blank rows/columns, one fact per row.',
      'Change Sum to Average/Count in Value Field Settings — same fields, different question.',
      'Data changed? Right-click the pivot → Refresh; it does not update automatically.',
    ],
    xp: 20,
    practice: {
      title: 'Design a pivot',
      description: 'You have sales rows with columns Salesperson, Month, Amount. You want total amount per salesperson. Which field goes in Rows, and which in Values?',
      startCode: `Rows:   ?\nValues: ?`,
      hint: 'The thing you group BY goes in Rows; the number you total goes in Values.',
      solution: `Rows: Salesperson\nValues: Sum of Amount`,
      expectedOutput: 'Rows: Salesperson, Values: Sum of Amount',
    },
  },
  {
    id: 'excel-charts',
    category: 'Analysis',
    title: 'Charts & Conditional Formatting',
    difficulty: 'Intermediate',
    theory: [
      'A chart turns numbers into a picture people grasp instantly. Match the chart to the message: a column/bar chart compares categories, a line chart shows a trend over time, a pie chart shows parts of a whole (use sparingly, only a few slices). Select your data including headers → Insert → choose the chart type.',
      'Good charts are clean: a clear title, labelled axes, no 3-D effects or clutter, and sorted bars so the reader sees the ranking. The goal is that someone understands the point in three seconds without you explaining it.',
      'Conditional formatting colours cells by rule — highlight marks below 40 in red, top values in green, or add data bars/colour scales that turn a column into a mini heat-map. It makes exceptions jump out of a big table without a chart at all. Home → Conditional Formatting → pick a rule.',
    ],
    syntax: 'Select data → Insert → Chart (Column / Line / Pie)\nHome → Conditional Formatting → Highlight Cells Rules',
    code: `Chart:
  Select A1:B7 (Month, Sales) → Insert → Line chart
  → a trend line of sales across the months.

Conditional formatting:
  Select B2:B30 (marks) → Conditional Formatting
  → Highlight Cells → Less Than → 40 → Red fill
  → every failing mark is now red automatically.`,
    output: 'A sales trend line + failing marks in red',
    notes: [
      'Pick the chart by the question: comparison → bars, trend → line, composition → pie/stacked.',
      'Conditional formatting updates live as the data changes — great for dashboards.',
      'Fewer colours and no 3-D: clarity beats decoration in every report.',
    ],
    xp: 15,
    practice: {
      title: 'Choose the chart',
      description: 'You want to show how monthly website visitors changed over 12 months. Which chart type best shows this trend, and why in one line?',
      startCode: `Chart type: ?\nReason: ?`,
      hint: 'Change over time = a trend.',
      solution: `Chart type: Line chart\nReason: A line chart best shows a trend over a continuous time axis (12 months).`,
      expectedOutput: 'Line chart (best for a trend over time)',
    },
  },
  {
    id: 'excel-productivity',
    category: 'Analysis',
    title: 'Named Ranges, IFERROR & Data Validation',
    difficulty: 'Advanced',
    theory: [
      'Named ranges make formulas readable: name B2:B100 as "Sales" and write `=SUM(Sales)` instead of `=SUM(B2:B100)`. Names are absolute by default and self-document your workbook — a professional habit that makes big models maintainable.',
      'IFERROR wraps any formula to catch errors gracefully: `=IFERROR(VLOOKUP(...), "Not found")` shows a friendly message instead of an ugly #N/A when a lookup fails. This is essential the moment a spreadsheet is shared with others.',
      'Data Validation restricts what a cell accepts — a dropdown list of allowed values, numbers within a range, or dates only. It prevents the typos and bad entries that break formulas downstream, and combined with a dropdown it turns a sheet into a simple, error-resistant form. Data → Data Validation.',
    ],
    syntax: '=SUM(Sales)                       (named range)\n=IFERROR(VLOOKUP(...), "N/A")\nData → Data Validation → List',
    code: `Named range: select B2:B100, type "Sales" in the Name Box.
  =AVERAGE(Sales)          → clean, self-explaining formula

Error handling:
  =IFERROR(VLOOKUP("Z9", A2:C50, 3, FALSE), "Not found")
  → "Not found" instead of #N/A

Data validation:
  Cell E2 → Data Validation → List → "Delhi,Mumbai,Chennai"
  → E2 now shows a dropdown; typos are rejected.`,
    output: 'Readable formulas, friendly errors, dropdown input',
    notes: [
      'Name Box is the small box to the left of the formula bar — type a name there to create one.',
      'IFERROR catches ALL errors; if you only want to catch #N/A, use IFNA instead.',
      'A validation dropdown plus IFERROR lookups is the recipe for a clean, shareable template.',
    ],
    xp: 18,
    practice: {
      title: 'Safe lookup',
      description: 'Wrap this lookup so it shows "Not found" instead of an error when the code is missing: VLOOKUP(F2, A2:C50, 2, FALSE).',
      startCode: `=IFERROR( ... , ... )`,
      hint: 'Put the whole VLOOKUP as the first argument to IFERROR, and "Not found" as the second.',
      solution: `=IFERROR(VLOOKUP(F2, A2:C50, 2, FALSE), "Not found")`,
      expectedOutput: '=IFERROR(VLOOKUP(F2, A2:C50, 2, FALSE), "Not found")',
    },
  },
];
