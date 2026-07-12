import { TutorialTopic } from './types';

export const powerBiTopics: TutorialTopic[] = [
  {
    id: 'pbi-what-is-powerbi',
    category: 'Fundamentals',
    title: 'What is Power BI & Business Intelligence',
    difficulty: 'Beginner',
    theory: [
      'Power BI is a business analytics and data visualization tool by Microsoft that transforms raw data into actionable insights. It enables users to connect to hundreds of data sources, clean and model data, create interactive visualizations, and share reports and dashboards across organizations. Business Intelligence (BI) is the process of converting data into strategic insights that drive business decisions, improve efficiency, and identify growth opportunities.',
      'The Power BI ecosystem consists of four main components: Power Query (data extraction and transformation), Power Pivot (data modeling and relationships), Power View (interactive visualizations), and Power BI Service (cloud-based publishing and collaboration). Together, these tools allow analysts to move from data collection to actionable dashboards in minutes, enabling faster decision-making.',
      'For Indian businesses—from retail chains tracking sales across 50 stores to educational institutions analyzing student performance—Power BI democratizes data analytics by making professional-grade insights accessible to non-technical stakeholders without expensive data science teams.',
    ],
    code: 'Power BI Workflow: Data Source → Power Query (clean/transform) → Power Pivot (model relationships) → Visualizations (charts, KPIs, maps) → Dashboard → Publish to Power BI Service → Share & Collaborate',
    notes: ['Power BI Desktop is free; Power BI Premium per user costs ~$10 USD/month', 'Over 500M data points can be queried in a single report', 'Real-time data refresh every 15 minutes in cloud (Power BI Service)'],
    xp: 15,
    practice: {
      title: 'Understand BI Use Cases for Your Industry',
      description: 'Identify one business problem in your industry (e.g., inventory management, student enrollment trends, sales performance) and explain how Power BI could solve it using the four components (collect, clean, model, visualize).',
      hint: 'Think of a metric your organization tracks manually. How would Power BI automate and visualize it?',
      solution: 'Example: School administration tracks attendance manually. Power BI connects to student records, cleans missing data in Power Query, models relationships between classes and students in Power Pivot, and displays attendance by class/month in interactive charts. This saves 10 hours/month and reveals attendance trends.',
      expectedOutput: '1 use case with all 4 components mentioned',
    },
  },
  {
    id: 'pbi-power-query-basics',
    category: 'Data Preparation',
    title: 'Connecting & Loading Data (Power Query Basics)',
    difficulty: 'Beginner',
    theory: [
      'Power Query is the data transformation engine in Power BI that connects to diverse sources (Excel, SQL Server, APIs, web, cloud services) and cleans messy data. Every real-world dataset has issues: duplicate rows, missing values, inconsistent formatting, and irrelevant columns. Power Query solves this with a visual interface—no code required—by applying transformations step-by-step.',
      'Common transformations include removing duplicates, filtering rows, renaming columns, splitting text (e.g., "John Doe" → "John" and "Doe"), changing data types (text to date), and merging tables. Each step is applied in sequence and can be undone, making experimentation safe. Power Query remembers all steps in the "Applied Steps" pane, so you can revisit and refine your cleaning logic.',
      'Best practice: always apply transformations in Power Query rather than manually editing raw data. This ensures repeatability—when your data source updates daily, the same cleaning steps run automatically, eliminating manual work and errors.',
    ],
    code: `Power Query Transformation Steps:
1. Get Data → Choose source (Excel, SQL, web, API)
2. Load data into Power Query Editor
3. Remove duplicates: Home tab → Remove Rows → Remove Duplicates
4. Filter: Click column header → Uncheck unwanted values
5. Rename: Right-click column → Rename
6. Split column: Column Tools → Split Column → By Delimiter (e.g., split "John Doe" by space)
7. Change data type: Click type icon (ABC → 123 for numbers, 1899 for dates)
8. Merge tables: Home → Merge Queries → Select join column
9. Load: Close & Apply → Data loads into Power Pivot for modeling`,
    notes: ['Power Query formulas use M language; visual interface hides complexity', 'Always check "Remove Duplicates" on IDs or join keys to avoid reporting errors', 'For large datasets (>1M rows), filter early in Power Query to improve performance'],
    xp: 15,
    practice: {
      title: 'Clean a Messy Sales Dataset',
      description: 'Given a CSV with duplicate transactions, missing salesman names, and dates in "DD-MMM-YYYY" format, write the sequence of Power Query steps to clean it.',
      startCode: `Raw data (example):
Transaction_ID | Salesman | Amount | Date
101 | John Doe | 5000 | 15-Jan-2025
102 | john doe | 5000 | 15-Jan-2025 (duplicate, different case)
103 | (blank) | 3000 | 16-Jan-2025
104 | Sarah | 2500 | invalid-date`,
      hint: 'Steps: Remove duplicates by Transaction_ID → Filter out blanks in Salesman → Change Date format → Check data types.',
      solution: `1. Home tab → Remove Rows → Remove Duplicates (select Transaction_ID)
2. Filter Salesman column → Uncheck blanks
3. Select Date column → Data Type → Date (detects DD-MMM-YYYY automatically)
4. Rename columns for clarity: Transaction_ID → ID, Amount → Sales_Amount
5. Close & Apply → Data is clean`,
      expectedOutput: 'Transformation steps listed in correct order with no blank rows',
    },
  },
  {
    id: 'pbi-data-modeling',
    category: 'Data Modeling',
    title: 'Data Modeling & Relationships (Star Schema)',
    difficulty: 'Intermediate',
    theory: [
      'Data modeling is organizing tables and defining relationships so Power BI calculates metrics accurately. A poorly designed model leads to double-counting, incorrect aggregations, and slow reports. The most common and effective model is the Star Schema: a central fact table (transactional data: sales, clicks, enrollments) surrounded by dimension tables (lookup tables: date, product, region, customer) connected by primary/foreign keys.',
      'In a retail Power BI model: Fact_Sales (transaction-level detail: order date, product ID, store ID, quantity, amount) connects to Dim_Product (product name, category, price), Dim_Store (store name, city, region), and Dim_Date (calendar dates, month, year, holiday flag). This structure enables aggregations like "Total Sales by Region and Month" without double-counting or errors.',
      'Key principle: never create a many-to-many relationship without a bridge table. Always create one-way or two-way relationships explicitly and test them. In Power BI Desktop, use the Model view to drag connections, confirm cardinality (one-to-many), and check "Assume Referential Integrity" for performance. A clean model runs 10x faster than a messy one.',
    ],
    code: `Star Schema for an E-commerce Dashboard:
┌─────────────┐
│  Fact_Order │ (Primary key: OrderID)
├─────────────┤
│ OrderID (PK)
│ DateID (FK → Dim_Date)
│ CustomerID (FK → Dim_Customer)
│ ProductID (FK → Dim_Product)
│ Quantity
│ Amount
└─────────────┘
        ↓ ↓ ↓
    ┌───┴─┴─┴───┐
    ↓   ↓   ↓   ↓
 Dim_Date Dim_Customer Dim_Product Dim_Region

Relationships (one-to-many):
- Dim_Date.DateID → Fact_Order.DateID
- Dim_Customer.CustomerID → Fact_Order.CustomerID
- Dim_Product.ProductID → Fact_Order.ProductID`,
    notes: ['Never load raw transaction tables without relationships; it creates silent errors', 'Use Dim_Date instead of relying on YEAR/MONTH functions for performance', 'Bridge tables solve many-to-many (student → courses; a student enrolls in multiple courses)'],
    xp: 18,
    practice: {
      title: 'Design a Star Schema for Student Learning Data',
      description: 'A college tracks: student enrollments, course completion dates, scores, and instructor feedback. Design the fact and dimension tables, list primary/foreign keys, and draw the relationship diagram.',
      hint: 'Fact table: enrollment-level details (StudentID, CourseID, Date, Score, Feedback). Dimensions: students, courses, dates, instructors.',
      solution: `Fact_Enrollment (Primary Key: EnrollmentID)
├─ EnrollmentID (PK)
├─ StudentID (FK → Dim_Student)
├─ CourseID (FK → Dim_Course)
├─ DateID (FK → Dim_Date)
├─ InstructorID (FK → Dim_Instructor)
├─ Score
└─ CompletionStatus

Relationships:
- Dim_Student.StudentID → Fact_Enrollment.StudentID (1:many)
- Dim_Course.CourseID → Fact_Enrollment.CourseID (1:many)
- Dim_Date.DateID → Fact_Enrollment.DateID (1:many)
- Dim_Instructor.InstructorID → Fact_Enrollment.InstructorID (1:many)`,
      expectedOutput: 'Fact table with ≥5 measures, ≥3 dimension tables, all relationships defined',
    },
  },
  {
    id: 'pbi-visualization-principles',
    category: 'Design',
    title: 'Data Visualization Principles (Choosing the Right Chart)',
    difficulty: 'Beginner',
    theory: [
      'A chart is only effective if it reveals the story in data quickly. Choosing the wrong chart buries insights. Visualization principles guide this choice: (1) Matching the chart type to your data type and question, (2) Using color strategically (highlight key values, not all), (3) Minimizing ink (remove gridlines, legends, unnecessary labels), (4) Sorting data (smallest to largest, alphabetical, or by time). A bar chart is faster to read than a pie chart; a line shows trends better than points.',
      'Common chart types and their purposes: Bar/Column (compare values across categories), Line (show trends over time), Pie (show parts of a whole ONLY if <4 slices), Scatter (correlation between two continuous variables), Map (geographic patterns), Table (detailed lookup), KPI Card (single key number). For Indian dashboards tracking student performance by state: use a map; for daily revenue trends: use a line chart; for product-wise sales: use a sorted bar chart.',
      'Color psychology: use 1 color for neutral data, 2 colors for comparisons (better/worse), and limit palettes to 5 colors max. Red = warning/loss, green = success/gain, blue = neutral, gray = inactive. Avoid rainbow charts (hard to see patterns) and rely on contrast and position (top-left is seen first).',
    ],
    code: `Chart Selection Guide:
Question: "How much?" → Bar, Column, KPI Card
Question: "Which is largest?" → Sorted Bar
Question: "How does it change over time?" → Line
Question: "Is there a relationship?" → Scatter
Question: "Where is it?" → Map, Filled Map
Question: "What are the parts?" → Stacked Bar (not Pie if >3 slices)
Question: "What are the details?" → Table

Example:
Task: Show sales by region and trend over months.
Wrong: Pie chart (hard to compare regions) + Table (no visual pattern)
Right: Map (see regions at a glance) + Line chart (trend visible instantly)`,
    notes: ['People read top-to-bottom and left-to-right; place KPIs top-left', 'Avoid 3D charts; they distort perception', 'Mobile users see charts without color (design for B&W contrast first)'],
    xp: 12,
    practice: {
      title: 'Choose the Best Chart for Three Scenarios',
      description: 'For each question, recommend the best chart type and explain why.',
      startCode: `Scenario 1: Sales by city (5 cities) for Jan 2025
Scenario 2: Daily active users over 30 days
Scenario 3: Budget allocated vs. budget spent across 10 departments`,
      hint: 'Think about comparisons (bar), trends (line), and performance vs. goal (combo).',
      solution: `Scenario 1: Horizontal Bar chart sorted descending
Why: Compares 5 categories clearly; readable city names
Scenario 2: Line chart with date on X-axis
Why: Shows trend direction and daily pattern instantly
Scenario 3: Combo chart (Column for Budget Spent, Line for Budget Allocated)
Why: Compares two measures; easy to see over/under-budget`,
      expectedOutput: '3 chart types chosen with 1 sentence reasoning each',
    },
  },
  {
    id: 'pbi-building-visuals',
    category: 'Dashboard Building',
    title: 'Building Visuals & Dashboards',
    difficulty: 'Intermediate',
    theory: [
      'A visual in Power BI is built by dragging fields from your data model to the Values, Axis, Legend, and Filters areas. A dashboard is a collection of related visuals on one page, telling a cohesive story. Best practices: use a single color scheme, align visuals to a grid, limit to 5–10 key metrics per page (too many = cognitive overload), and arrange by importance (KPIs top-left, supporting details below).',
      'When building a Sales Dashboard, start with KPIs (Total Revenue, Units Sold, Avg Order Value) at the top. Below: Sales by Region (map or bar), Sales Trend (line), Top Products (horizontal bar). Use a date slicer so executives can drill into specific months. Tooltips enhance interactivity—hovering shows detailed information without cluttering the main visual.',
      'Performance optimization: filter data early (don\'t load all 10 years; use a year slicer), use aggregated tables for large datasets (>1M rows), and avoid calculated columns when a measure suffices. A 5-second dashboard load loses users; aim for <2 seconds.',
    ],
    code: `Steps to Build a Sales Dashboard:
1. Open Power BI Desktop → Model view → Verify relationships
2. Report view → Insert → KPI Card → Drag "Total Sales" field
3. Repeat for "Units Sold" and "Avg Order Value" KPIs
4. Insert → Column Chart → X-axis: Region, Y-axis: Sales
5. Insert → Line Chart → X-axis: Month, Y-axis: Sales (shows trend)
6. Insert → Bar Chart → Y-axis: Product, X-axis: Sales (top products)
7. Insert → Slicer → Field: Date (allows filtering by month/year)
8. Insert → Tooltip → Add Product Category (hover over charts for detail)
9. Format → Use consistent colors (blue for primary, gray for secondary)
10. Arrange visuals: KPIs top row, charts below, slicer on left
11. File → Save → Publish to Power BI Service`,
    notes: ['Slicers are filters visible to end-users; Filters pane is for developers', 'Drill-down: right-click a bar → "Drill Down" to see granular data', 'Use Themes to apply company branding to all visuals at once'],
    xp: 18,
    practice: {
      title: 'Build a Student Performance Dashboard Layout',
      description: 'Design the layout and list visuals for a dashboard showing school performance: overall pass rate, top 5 students, pass rate by subject, and trend over semesters.',
      startCode: 'Dashboard must include: 1 KPI, 1 sorted bar, 1 line, 1 visual for filtering',
      hint: 'Top row: Overall Pass Rate (KPI), Pass Rate Trend (Line). Bottom row: Pass Rate by Subject (Bar), Top Students (Table). Add Semester slicer on the left.',
      solution: `Row 1 (KPIs):
├─ Pass Rate Card (80.5%)
├─ Avg Score Card (72/100)
└─ Students Passed Card (405/500)

Row 2 (Analysis):
├─ Pass Rate by Subject (Horizontal Bar, sorted descending)
├─ Pass Rate Trend (Line chart, X: Semester, Y: Pass %)
└─ Top 10 Students (Table: Name, Score, Rank)

Left Sidebar:
└─ Semester Slicer (2024-S1, 2024-S2, 2025-S1)`,
      expectedOutput: 'Dashboard layout with ≥3 visuals and 1 slicer, all labeled',
    },
  },
  {
    id: 'pbi-dax-basics',
    category: 'DAX Formulas',
    title: 'DAX Basics — Calculated Columns vs Measures',
    difficulty: 'Intermediate',
    theory: [
      'DAX (Data Analysis Expressions) is Power BI\'s formula language for creating calculated fields. Two types exist: Calculated Columns (computed row-by-row, stored in memory, slow for large tables) and Measures (computed on-the-fly during aggregation, fast, appropriate for dashboards). Understanding when to use each is critical for performance and correctness.',
      'Calculated Columns are created in Power Query or Model view and evaluate once per row. Use for derived fields that don\'t aggregate: "FullName = CONCATENATE(FirstName, LastName)" or "AgeGroup = IF(Age < 18, "Child", "Adult")". These columns are stored in the data model (increasing size) and filter/sort by their values directly.',
      'Measures are dynamic formulas evaluated every time a dashboard chart requests aggregated data. Use for KPIs and metrics: "Total Sales = SUM(Sales[Amount])" or "Avg Order Value = DIVIDE(SUM(Sales[Amount]), DISTINCTCOUNT(Sales[OrderID]))". Measures respond instantly to filters (region, date) and scale to billions of rows because they don\'t pre-compute.',
    ],
    code: `Calculated Column vs Measure Examples:

CALCULATED COLUMN (row-by-row, stored):
FullName = FirstName & " " & LastName
AgeGroup = IF(Age < 18, "Child", IF(Age < 60, "Adult", "Senior"))
SalesTax = Amount * 0.18 (India 18% GST)
→ Used in: Row labels, Filters, Drill-downs

MEASURE (aggregated, dynamic):
Total Sales = SUM(Sales[Amount])
Avg Price = AVERAGE(Products[Price])
Customer Count = DISTINCTCOUNT(Sales[CustomerID])
→ Used in: KPIs, Chart values, Visual aggregations

Key difference: Filters apply to Columns instantly; Measures recalculate in real-time.`,
    notes: ['Avoid calculated columns on large tables (>1M rows); use measures instead', 'Measures inside FILTER() or SUMPRODUCT() create complex DAX; simplify with bridge tables', 'Always use DIVIDE() instead of "/" to avoid errors when denominator is 0'],
    xp: 16,
    practice: {
      title: 'Create Calculated Columns and Measures for Sales Data',
      description: 'Given a Sales table with OrderDate, Amount, and Quantity, create (1) a calculated column for quarter, (2) a measure for total sales, (3) a measure for average order value.',
      startCode: `Sales table:
OrderID | OrderDate | ProductID | Amount | Quantity
1001 | 2025-01-15 | P1 | 5000 | 2
1002 | 2025-02-20 | P2 | 3000 | 1`,
      hint: 'Column: Use QUARTER() or IF for logic. Measures: SUM() and DIVIDE().',
      solution: `Calculated Column:
Quarter = "Q" & QUARTER(Sales[OrderDate])
(Result: Q1, Q1, Q2, etc.)

Measures:
Total Sales = SUM(Sales[Amount])
Avg Order Value = DIVIDE(SUM(Sales[Amount]), DISTINCTCOUNT(Sales[OrderID]), 0)
Qty Sold = SUM(Sales[Quantity])`,
      expectedOutput: '1 calculated column + 2 measures with correct syntax',
    },
  },
  {
    id: 'pbi-dax-functions',
    category: 'DAX Formulas',
    title: 'DAX Common Functions (SUM, CALCULATE, FILTER, SUMX)',
    difficulty: 'Advanced',
    theory: [
      'SUM() aggregates a column: SUM(Sales[Amount]) = total of all amounts. CALCULATE() applies filters to a measure: CALCULATE(SUM(Sales[Amount]), Region = "North") = sum only for North region, overriding dashboard filters. FILTER() creates a dynamic table filtered by condition: FILTER(ALL(Region), Region[Sales] > 100000) = regions with >100k sales. SUMX() iterates rows and sums a custom expression: SUMX(Orders, Orders[Qty] * Orders[Price]) = revenue item-by-item (useful when Price varies per order).',
      'Real-world DAX: High-value customers defined as those with total orders > 50,000. High Value Sales = CALCULATE(SUM(Sales[Amount]), FILTER(ALL(Sales), CALCULATE(SUM(Sales[Amount]), SALES[CustomerID]) > 50000)). This counts sales only for high-value customer IDs. Another example: Month-over-month growth = DIVIDE(Current Month Sales - Previous Month Sales, Previous Month Sales). These require nested CALCULATE() with date filters.',
      'Performance: SUMX iterates and is slower than SUM on pre-aggregated measures; use only when necessary. FILTER on large tables (millions of rows) can timeout; pre-aggregate in Power Query instead. CALCULATE context ("which filters apply?") is crucial—filters FROM visuals override formula filters unless you use ALL() to clear them first.',
    ],
    code: `Common DAX Patterns:

1. SUM — Basic aggregation:
Total Sales = SUM(Sales[Amount])

2. CALCULATE — Apply conditions:
North Sales = CALCULATE(SUM(Sales[Amount]), Sales[Region] = "North")
High Value = CALCULATE(SUM(Sales[Amount]), Sales[Amount] > 1000)

3. FILTER — Dynamic conditions:
Top Customers = FILTER(ALL(Customers), CALCULATE(SUM(Sales[Amount])) > 100000)

4. SUMX — Row-by-row iteration:
Revenue = SUMX(Orders, Orders[Qty] * Orders[Price])
Margin = SUMX(Sales, (Sales[Price] - Sales[Cost]) * Sales[Qty])

5. ALL — Ignore filters:
Total = CALCULATE(SUM(Sales[Amount]), ALL(Sales[Region])) (sums all regions, ignoring slicer)

6. MONTH-OVER-MONTH GROWTH:
Current Month Sales = CALCULATE(SUM(Sales[Amount]), MONTH(TODAY()) = MONTH(Sales[Date]))
Prev Month Sales = CALCULATE(SUM(Sales[Amount]), MONTH(Sales[Date]) = MONTH(TODAY()) - 1)
Growth % = DIVIDE(Current - Previous, Previous, 0) * 100`,
    notes: ['CALCULATE context: filters from visuals + formula filters combine (OR logic unless ALL is used)', 'SUMX is powerful but slow on millions of rows; pre-compute in Power Query if possible', 'Test DAX in Measure editor; errors appear immediately'],
    xp: 20,
    practice: {
      title: 'Write DAX for Complex Business Rules',
      description: 'Write DAX measures for: (1) Sales for West region only, (2) Orders where quantity > 5, (3) Average order value excluding discount amounts.',
      startCode: `Sales table columns: Amount, Region, OrderID, Qty, Discount, Price
Requirement: Measures must filter by business logic, not chart filters`,
      hint: 'Use CALCULATE for region filter, FILTER + SUMX for quantity, DIVIDE for average.',
      solution: `1. West Region Sales = CALCULATE(SUM(Sales[Amount]), Sales[Region] = "West")

2. High Qty Orders = SUMX(FILTER(ALL(Sales), Sales[Qty] > 5), Sales[Amount])

3. Avg Order Value = DIVIDE(
     SUMX(Sales, Sales[Amount] - Sales[Discount]),
     DISTINCTCOUNT(Sales[OrderID]),
     0
   )`,
      expectedOutput: '3 DAX measures with CALCULATE/FILTER/SUMX used appropriately',
    },
  },
  {
    id: 'pbi-interactivity',
    category: 'Dashboards',
    title: 'Interactivity — Slicers, Filters, Drill-Through',
    difficulty: 'Intermediate',
    theory: [
      'Interactivity turns static reports into exploration tools. Slicers (visual filters for users), drill-down (click to see detail), and drill-through (navigate to a detail report) enable executives to ask "why?" without waiting for analysts. A Slicer on Region allows one click to filter 10 charts; without it, users are stuck viewing all regions at once.',
      'Drill-down (built-in): click a bar for "North Region" and see cities within North. Power BI auto-expands if your data has hierarchies (Region → City → Store). Drill-through (manual setup): right-click a bar → "Drill Through" → opens a detail page pre-filtered to that region\'s transactions. This requires configuring a separate page with drill-through fields.',
      'Best practices: Limit slicers to 3–5 per page (too many = confusion). Use buttons/bookmarks to toggle between summary and detail views. Make slicers prominent (top-left) and show current selection clearly. Test with end-users: Can a regional manager find "Top 10 stores in my region" in 5 clicks? If not, redesign.',
    ],
    code: `Setting Up Interactivity:

1. SLICER (filter all charts by one field):
   Insert → Slicer → Field: Region
   → User clicks "North" → All charts update to North data only
   → Place at top or left of page

2. DRILL-DOWN (expand hierarchy):
   Insert → Clustered Column Chart → X-axis: Region (drag as level 1)
   → Drag City field to same X-axis (level 2)
   → Right-click chart → "Drill Down" icon enabled
   → Click bar to expand Region → City

3. DRILL-THROUGH (navigate to detail page):
   Page 1: Summary chart (Sales by Region)
   Page 2: Detail page (Regional Transactions)
   → Right-click page 2 name → Mark as detail page
   → Add drill-through fields: Region
   → Users right-click region bar → Drill Through → See all transactions for that region

4. SYNC SLICERS (one slicer affects multiple pages):
   Insert → Slicer on Page 1
   → View → Sync Slicers → Check pages to sync
   → Slicer value carries across pages

5. BUTTONS & BOOKMARKS (navigation):
   Insert → Button → Click to navigate to another page
   → Use for "Back", "Show Details", "Reset Filters"`,
    notes: ['Drill-down requires hierarchies in your data (Region contains Cities)', 'Drill-through is more powerful: navigate to a different page with filters applied', 'Turn off "Require selection" in Slicer settings if you want a default "all" option'],
    xp: 17,
    practice: {
      title: 'Design an Interactive Sales Dashboard with Drill-Through',
      description: 'Describe the setup for a dashboard where users can: (1) Filter by Region using a slicer, (2) Drill down from Region to City to see sales, (3) Right-click a city and drill through to see individual transactions.',
      hint: 'Page 1: Summary (slicer + regional chart). Page 2: City detail (region chart with Cities as level 2). Page 3: Transactions (drill-through target).',
      solution: `Page 1 - Summary:
├─ Region Slicer (top-left): allows filtering
├─ Sales by Region (Column chart, sortable)
└─ KPIs: Total Sales, Avg Order Value

Page 2 - City Detail:
└─ Sales by City (Clustered Column: X-axis with Region & City hierarchy)
   → Drill-down enabled (click to expand Region → City)

Page 3 - Transactions (Drill-Through target):
├─ Mark as detail page: Right-click page → "Drill through to this page"
├─ Add drill-through field: City
├─ Table: TransactionID, Date, Amount, Customer, Product
└─ Filters automatically applied (e.g., if clicked "Delhi", show only Delhi transactions)

User Flow:
1. Page 1 → Select "North" in slicer → All charts filter to North
2. Page 1 → Click "Delhi" bar → Drill down to cities in North (reveals "Delhi", "Bangalore", etc.)
3. Page 1 → Right-click "Delhi" → Drill Through → Page 3 opens with Delhi transactions only`,
      expectedOutput: 'Setup description with 3 pages, slicer, drill-down, and drill-through paths',
    },
  },
  {
    id: 'pbi-publishing-sharing',
    category: 'Deployment',
    title: 'Publishing, Sharing & Refresh + Dashboard Project',
    difficulty: 'Beginner',
    theory: [
      'Publishing moves a report from your desktop to Power BI Service (cloud), where users access it via browser or mobile app without installing Power BI Desktop. Sharing controls who sees it: grant "Viewer" (read-only), "Editor" (can modify), or "Admin" (manage access) permissions per person or group. Refresh ensures dashboards show current data—scheduled refreshes run nightly (cloud data sources) or on-demand.',
      'Workflow: Build & test in Desktop → Publish to Service → Create a workspace → Share with stakeholders → Configure refresh. If your data is in Excel on OneDrive: Power BI Service refreshes every 8 hours (free tier). If data is in SQL Server: refresh every 15 minutes (Premium). Always notify users of refresh schedule so they know when data is fresh.',
      'Row-Level Security (RLS): In a multi-region company, hide each region manager\'s data from others. Use RLS rules in Power BI Service to enforce "Sales data WHERE Region = USERNAME\'s Region" automatically. This avoids creating separate reports for each user.',
    ],
    code: `Publishing & Sharing Workflow:

1. PUBLISH TO CLOUD:
   File → Publish → Select workspace (create if needed)
   → Report now live at https://app.powerbi.com

2. SHARE WITH USERS:
   In Power BI Service → Share button (top-right)
   → Enter email addresses
   → Grant permission: Viewer (read), Editor (modify), Admin (manage)
   → Notify users

3. CONFIGURE REFRESH:
   Power BI Service → Settings (gear icon) → Dataset settings
   → Schedule refresh: Daily 6 AM
   → If data source requires credentials: Enter username/password
   → Test refresh: "Refresh now" button

4. SET UP ROW-LEVEL SECURITY (RLS):
   Power BI Desktop → Model → Create role:
   Role name: "Sales Manager East"
   DAX filter: [Region] = "East"
   → Publish → Service: assign users to roles
   → Each user sees only their region

5. CREATE ALERTS:
   In report: right-click KPI → Set alert
   → Alert: "Notify if Total Sales falls below 100k"
   → Get email when threshold hit`,
    notes: ['Power BI Service free tier: 8-hour refresh schedule; Premium: 48 daily refreshes', 'Always backup Desktop file before publishing major changes', 'Refresh fails silently if data source credentials expire; check logs in Service'],
    xp: 14,
    practice: {
      title: 'Mini Project: Build and Deploy a School Dashboard',
      description: 'End-to-end project: (1) Design a star schema for student performance (Students, Courses, Enrollments, Dates). (2) Create measures: Avg Score, Pass Rate, Top 10 Students. (3) Build a dashboard with KPIs, a trend chart, and a slicer by Semester. (4) Write a summary explaining the dashboard purpose and refresh strategy.',
      startCode: `Data: Student enrollments with scores, completion status, course info, and dates.
Deliverable: 1-page dashboard + 1 written plan.`,
      hint: 'Fact: Enrollments (scores). Dimensions: Students, Courses, Dates. Measures: SUM(Score)/COUNT for average, COUNT(Passed)/COUNT for rate. Dashboard: Top-left KPIs, middle trend, bottom table.',
      solution: `STAR SCHEMA:
Fact_Enrollment (StudentID, CourseID, DateID, Score, Status)
Dim_Student (StudentID, Name, Class, GPA)
Dim_Course (CourseID, CourseName, Subject, Instructor)
Dim_Date (DateID, Date, Semester, Month, Year)

MEASURES:
Average Score = AVERAGE(Enrollments[Score])
Pass Rate % = DIVIDE(COUNTIF(Enrollments[Status], "Passed"), COUNTA(Enrollments[StudentID]), 0) * 100
Enrollments Count = COUNTA(Enrollments[StudentID])

DASHBOARD LAYOUT:
Row 1: Avg Score (80.5) | Pass Rate (85%) | Total Enrolled (500)
Row 2: Pass Rate Trend (Line, by Month) | Top 10 Students (Table)
Row 3: Slicer: Semester (S1, S2)

REFRESH PLAN:
Frequency: Daily 7 AM (before school day)
Data source: Google Sheets (enrollment data) + Excel (scores)
User access: Viewer role for teachers, Admin for principal
Alerts: Notify principal if pass rate drops below 75%`,
      expectedOutput: 'Dashboard design (visual layout + measure list) + refresh strategy (1 paragraph)',
    },
  },
];
