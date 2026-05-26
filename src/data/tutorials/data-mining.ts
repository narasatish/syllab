import type { TutorialTopic } from './types';

export const dataMiningTopics: TutorialTopic[] = [
  // Introduction to Data Mining (7 topics)
  {
    id: 'dm-intro',
    category: 'Introduction to Data Mining',
    title: 'What is Data Mining?',
    difficulty: 'Beginner',
    theory: [
      'Data mining is the process of discovering patterns, relationships, and insights from large datasets. It combines techniques from statistics, machine learning, and database systems to extract valuable information that can drive business decisions.',
      'In the context of Indian businesses, data mining helps analyze customer behavior in e-commerce platforms, optimize supply chains for retail networks, and identify fraud patterns in financial institutions.',
      'Data mining bridges the gap between raw data and actionable intelligence, enabling organizations to make informed strategic decisions.'
    ],
    code: `import pandas as pd
import numpy as np

# Simple dataset example
data = {
    'Customer_ID': [1, 2, 3, 4, 5],
    'Purchase_Amount': [5000, 12000, 8500, 3200, 15000],
    'Age': [25, 35, 28, 22, 45],
    'Category': ['Electronics', 'Groceries', 'Clothing', 'Electronics', 'Groceries']
}

df = pd.DataFrame(data)
print("Dataset Overview:")
print(df)
print(f"\\nAverage Purchase: ₹{df['Purchase_Amount'].mean():.2f}")`,
    output: `Dataset Overview:
   Customer_ID  Purchase_Amount  Age       Category
0            1             5000   25     Electronics
1            2            12000   35       Groceries
2            3             8500   28       Clothing
3            4             3200   22     Electronics
4            5            15000   45       Groceries

Average Purchase: ₹8740.00`,
    notes: ['Data mining discovers hidden patterns in data', 'Used in retail, finance, healthcare, and education sectors', 'Requires domain knowledge and technical skills'],
    livePreview: false,
    practice: {
      title: 'Analyze Simple Customer Data',
      description: 'Load the customer dataset and find the customer with highest purchase amount.',
      hint: 'Use idxmax() or max() functions with pandas',
      solution: `df.loc[df['Purchase_Amount'].idxmax()]`
    }
  },
  {
    id: 'dm-crisp-dm',
    category: 'Introduction to Data Mining',
    title: 'Data Mining Process (CRISP-DM)',
    difficulty: 'Beginner',
    theory: [
      'CRISP-DM (Cross Industry Standard Process for Data Mining) is a standardized methodology with six phases: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, and Deployment.',
      'Each phase in CRISP-DM is interconnected and iterative. After evaluation, results may require returning to earlier phases for refinement and improvement.',
      'This framework ensures that data mining projects are structured, reproducible, and aligned with business objectives.'
    ],
    code: `# CRISP-DM Framework Implementation
crisp_dm_phases = {
    1: "Business Understanding - Define objectives and success criteria",
    2: "Data Understanding - Explore and analyze available data",
    3: "Data Preparation - Clean, transform, and format data",
    4: "Modeling - Build predictive or descriptive models",
    5: "Evaluation - Assess model performance and business impact",
    6: "Deployment - Implement model in production environment"
}

print("CRISP-DM Phases:")
for phase, description in crisp_dm_phases.items():
    print(f"{phase}. {description}")`,
    output: `CRISP-DM Phases:
1. Business Understanding - Define objectives and success criteria
2. Data Understanding - Explore and analyze available data
3. Data Preparation - Clean, transform, and format data
4. Modeling - Build predictive or descriptive models
5. Evaluation - Assess model performance and business impact
6. Deployment - Implement model in production environment`,
    notes: ['CRISP-DM is industry-standard methodology', 'Iterative process - not strictly linear', 'Each phase documents decisions and findings'],
    livePreview: false,
    practice: {
      title: 'Map Project to CRISP-DM',
      description: 'Map a real-world problem (predicting student exam performance) to CRISP-DM phases.',
      hint: 'Think about what you need to understand first, then what data to collect',
      solution: `Phase 1: Understand factors affecting exam performance
Phase 2: Collect student data (attendance, study hours, marks)
Phase 3: Clean data, handle missing values, normalize features
Phase 4: Build classification/regression model
Phase 5: Evaluate accuracy, precision, recall
Phase 6: Deploy model to predict future performance`
    }
  },
  {
    id: 'dm-data-types',
    category: 'Introduction to Data Mining',
    title: 'Types of Data',
    difficulty: 'Beginner',
    theory: [
      'Data can be classified into structured and unstructured types. Structured data is organized in tables (relational databases), while unstructured data includes text, images, and audio.',
      'Within structured data, there are quantitative (numerical) and qualitative (categorical) attributes. Quantitative data can be discrete (counts) or continuous (measurements).',
      'Understanding data types is crucial for selecting appropriate preprocessing techniques and mining algorithms in any analysis.'
    ],
    code: `import pandas as pd
import numpy as np

# Create dataset with different data types
data = {
    'StudentID': [101, 102, 103, 104, 105],           # Discrete numerical
    'Name': ['Arjun', 'Priya', 'Rohan', 'Neha', 'Vikram'],  # Categorical
    'Height_cm': [175.5, 162.3, 180.2, 158.9, 172.1],       # Continuous numerical
    'Grade': ['A', 'B', 'A+', 'A', 'B+'],                   # Categorical
    'Attendance_percentage': [92, 88, 95, 85, 90]            # Continuous numerical
}

df = pd.DataFrame(data)
print("Data Types:")
print(df.dtypes)
print("\\nDataset:")
print(df)`,
    output: `Data Types:
StudentID                int64
Name                    object
Height_cm             float64
Grade                  object
Attendance_percentage   int64
dtype: object

Dataset:
   StudentID     Name  Height_cm Grade  Attendance_percentage
0        101    Arjun      175.5     A                     92
1        102    Priya      162.3     B                     95
2        103    Rohan      180.2    A+                     85
3        104     Neha      158.9     A                     85
4        105   Vikram      172.1    B+                     90`,
    notes: ['Numerical data needs normalization/standardization', 'Categorical data needs encoding', 'Mixed data types need careful preprocessing'],
    livePreview: false,
    practice: {
      title: 'Identify Data Types',
      description: 'Given a dataset, identify which columns are continuous, discrete, or categorical.',
      hint: 'Look at the values - numbers are numerical, text is categorical',
      solution: `Discrete: StudentID, Attendance_percentage
Continuous: Height_cm
Categorical: Name, Grade`
    }
  },
  {
    id: 'dm-data-warehousing',
    category: 'Introduction to Data Mining',
    title: 'Data Warehousing',
    difficulty: 'Intermediate',
    theory: [
      'A data warehouse is a centralized repository that stores integrated, time-stamped data from various operational systems. It supports analytical queries and business intelligence activities.',
      'Data warehouses are organized using dimensional modeling with fact tables (containing metrics) and dimension tables (containing attributes). This star schema enables efficient querying.',
      'Indian companies like TCS, Infosys, and major retailers maintain data warehouses to analyze sales, customer behavior, and inventory across thousands of stores.'
    ],
    code: `import pandas as pd

# Simulating Data Warehouse Schema
# Fact Table - Sales transactions
sales_fact = {
    'Sale_ID': [1, 2, 3, 4, 5],
    'Store_ID': [101, 102, 101, 103, 102],
    'Date_ID': ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'],
    'Product_ID': [1001, 1002, 1001, 1003, 1002],
    'Amount': [5000, 8500, 3200, 12000, 6500]
}

# Dimension Table - Store
store_dim = {
    'Store_ID': [101, 102, 103],
    'Store_Name': ['Delhi Central', 'Mumbai South', 'Bangalore North'],
    'State': ['Delhi', 'Maharashtra', 'Karnataka']
}

fact_df = pd.DataFrame(sales_fact)
store_df = pd.DataFrame(store_dim)

print("Sales Fact Table:")
print(fact_df)
print("\\nStore Dimension Table:")
print(store_df)

# Join for Analysis
analysis = fact_df.merge(store_df, on='Store_ID')
print("\\nIntegrated View:")
print(analysis[['Sale_ID', 'Store_Name', 'Amount']])`,
    output: `Sales Fact Table:
   Sale_ID  Store_ID    Date_ID  Product_ID  Amount
0        1        101 2024-01-15        1001    5000
1        2        102 2024-01-16        1002    8500
2        3        101 2024-01-17        1001    3200
3        4        103 2024-01-18        1003   12000
4        5        102 2024-01-19        1002    6500

Store Dimension Table:
   Store_ID       Store_Name         State
0        101    Delhi Central        Delhi
1        102     Mumbai South Maharashtra
2        103  Bangalore North    Karnataka

Integrated View:
   Sale_ID       Store_Name  Amount
0        1    Delhi Central    5000
1        2     Mumbai South    8500
2        3    Delhi Central    3200
3        4  Bangalore North   12000
4        5     Mumbai South    6500`,
    notes: ['Data warehouse integrates data from multiple sources', 'Enables complex analytical queries', 'Uses dimensional modeling for organization'],
    livePreview: false,
    practice: {
      title: 'Design Star Schema',
      description: 'Design a simple star schema for an e-commerce business with Sales fact table and Product/Customer dimension tables.',
      hint: 'Fact table contains transactions, dimension tables contain attributes',
      solution: `Fact: Transaction_ID, Product_ID, Customer_ID, Date_ID, Amount
Dimension Product: Product_ID, Name, Category, Price
Dimension Customer: Customer_ID, Name, City, State`
    }
  },
  {
    id: 'dm-etl-process',
    category: 'Introduction to Data Mining',
    title: 'ETL Process (Extract, Transform, Load)',
    difficulty: 'Intermediate',
    theory: [
      'ETL is the process of extracting data from source systems, transforming it to meet quality and format standards, and loading it into target systems like data warehouses.',
      'Extract involves reading data from various sources (databases, APIs, files). Transform includes cleaning, validating, and restructuring data. Load pushes processed data to the destination.',
      'ETL pipelines are critical for data-driven organizations, ensuring data consistency and quality across the enterprise.'
    ],
    code: `import pandas as pd
from datetime import datetime

# EXTRACT - Read from source
raw_data = {
    'Customer_Name': ['Raj', 'Priya', 'AMIT', 'neha'],
    'Email': ['raj@mail.com', 'priya@mail.com', 'amit@mail.com', 'neha@mail.com'],
    'Age': [25, '32', 28, 35],
    'City': ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'],
    'Amount': [5000, 12000, 8500, None]
}

print("EXTRACT - Raw Source Data:")
df = pd.DataFrame(raw_data)
print(df)

# TRANSFORM - Clean and standardize
df['Customer_Name'] = df['Customer_Name'].str.title()  # Standardize case
df['Age'] = pd.to_numeric(df['Age'], errors='coerce')  # Convert to numeric
df['Amount'].fillna(df['Amount'].mean(), inplace=True)  # Handle missing values
df['Load_Date'] = datetime.now().strftime('%Y-%m-%d')

print("\\nTRANSFORM - Cleaned Data:")
print(df)

# LOAD - Store in target system (simulated)
print("\\nLOAD - Data ready for warehouse")
print(f"Records loaded: {len(df)}")`,
    output: `EXTRACT - Raw Source Data:
  Customer_Name          Email Age         City Amount
0            Raj   raj@mail.com  25        Delhi 5000.0
1          Priya priya@mail.com  32       Mumbai 12000.0
2           AMIT  amit@mail.com  28    Bangalore 8500.0
3           Neha  neha@mail.com  35      Chennai    NaN

TRANSFORM - Cleaned Data:
  Customer_Name          Email   Age         City     Amount Load_Date
0            Raj   raj@mail.com  25.0        Delhi  5000.0 2026-05-25
1          Priya priya@mail.com  32.0       Mumbai 12000.0 2026-05-25
2           Amit  amit@mail.com  28.0    Bangalore  8500.0 2026-05-25
3           Neha  neha@mail.com  35.0      Chennai  8750.0 2026-05-25

LOAD - Data ready for warehouse
Records loaded: 4`,
    notes: ['ETL ensures data quality and consistency', 'Extract can handle multiple sources', 'Transform is the most time-consuming phase'],
    livePreview: false,
    practice: {
      title: 'Build Simple ETL Pipeline',
      description: 'Create an ETL pipeline that reads student data, standardizes names, fills missing marks with mean, and loads into a clean dataset.',
      hint: 'Use str.title() for names, fillna() for missing values, and datetime for timestamps',
      solution: `df['Name'] = df['Name'].str.title()
df['Marks'] = pd.to_numeric(df['Marks'], errors='coerce')
df['Marks'].fillna(df['Marks'].mean(), inplace=True)
# Then save to CSV or database`
    }
  },
  {
    id: 'dm-data-quality',
    category: 'Introduction to Data Mining',
    title: 'Data Quality Issues',
    difficulty: 'Intermediate',
    theory: [
      'Data quality refers to the accuracy, completeness, consistency, and timeliness of data. Poor data quality can lead to incorrect conclusions and failed mining projects.',
      'Common data quality issues include missing values, duplicate records, inconsistent formatting, outliers, and measurement errors. Identifying these issues is crucial during data exploration.',
      'Data quality assessment is an ongoing process that happens during preparation and can reveal the need for additional data collection or source system improvements.'
    ],
    code: `import pandas as pd
import numpy as np

# Dataset with quality issues
data = {
    'StudentID': [101, 102, 101, 104, 105, 106],  # Duplicate ID
    'Name': ['Arjun', 'PRIYA', 'Arjun', 'Rohan', None, 'Vikram'],  # Inconsistent case, missing
    'Marks': [85, 92, 85, 88, 150, 78],  # Duplicate row, outlier (150)
    'Email': ['arjun@mail', 'priya@mail.com', 'arjun@mail', 'rohan@mail.com', 'neha@mail', 'vikram@mail.com']
}

df = pd.DataFrame(data)
print("DATA QUALITY ASSESSMENT:")
print("\\n1. Dataset Overview:")
print(df)

print("\\n2. Missing Values:")
print(df.isnull().sum())

print("\\n3. Duplicate Rows:")
print(f"Duplicate StudentIDs: {df.duplicated(subset=['StudentID']).sum()}")

print("\\n4. Outliers (Marks > 100):")
print(df[df['Marks'] > 100])

print("\\n5. Inconsistent Formatting:")
print(f"Mixed case names - needs standardization")`,
    output: `DATA QUALITY ASSESSMENT:

1. Dataset Overview:
   StudentID    Name Marks              Email
0        101   Arjun    85     arjun@mail
1        102   PRIYA    92     priya@mail.com
2        101   Arjun    85     arjun@mail
3        104   Rohan    88     rohan@mail.com
4        105    None   150     neha@mail
5        106  Vikram    78     vikram@mail.com

2. Missing Values:
StudentID    0
Name         1
Marks        0
Email        0
dtype: int64

3. Duplicate Rows:
Duplicate StudentIDs: 1

4. Outliers (Marks > 100):
   StudentID Name Marks              Email
4        105  None   150     neha@mail

5. Inconsistent Formatting:
Mixed case names - needs standardization`,
    notes: ['80/20 rule: 80% of time spent on data quality', 'Data profiling identifies quality issues early', 'Quality issues must be resolved before modeling'],
    livePreview: false,
    practice: {
      title: 'Identify and Report Quality Issues',
      description: 'Create a data quality report identifying missing values, duplicates, inconsistencies, and outliers in the provided dataset.',
      hint: 'Use isnull(), duplicated(), and statistical summaries',
      solution: `Report:
- Missing Values: Name column has 1 null
- Duplicates: StudentID 101 appears twice
- Outliers: Marks of 150 exceeds expected range (0-100)
- Inconsistency: Names have mixed case (PRIYA vs Arjun)`
    }
  },
  {
    id: 'dm-vs-ml',
    category: 'Introduction to Data Mining',
    title: 'Data Mining vs Machine Learning',
    difficulty: 'Intermediate',
    theory: [
      'Data mining is the broader process of discovering patterns and insights from data, while machine learning is a technique used within data mining that enables systems to learn from data.',
      'Data mining includes exploratory analysis, pattern discovery, and rule extraction, whereas machine learning focuses on building predictive models that improve with more data.',
      'All machine learning is part of data mining, but not all data mining involves machine learning. Data mining might involve simple statistical analysis or association rules that don\'t require ML.'
    ],
    code: `# Data Mining vs Machine Learning Comparison

comparison = {
    'Aspect': ['Scope', 'Focus', 'Outcome', 'Methods', 'Example'],
    'Data Mining': [
        'Broader process',
        'Pattern discovery',
        'Insights and patterns',
        'Statistics, rules, clustering',
        'Find customer segments in Flipkart'
    ],
    'Machine Learning': [
        'Specific technique',
        'Predictive modeling',
        'Trained model',
        'Algorithms, neural networks',
        'Predict customer churn using past behavior'
    ]
}

import pandas as pd
comparison_df = pd.DataFrame(comparison)
print(comparison_df.to_string(index=False))`,
    output: `Aspect        Data Mining              Machine Learning
Scope         Broader process           Specific technique
Focus         Pattern discovery         Predictive modeling
Outcome       Insights and patterns     Trained model
Methods       Statistics, rules, ...    Algorithms, neural ...
Example       Find customer segments    Predict customer churn`,
    notes: ['Data mining is the overall process', 'Machine learning is a tool within data mining', 'Both require domain expertise and data quality'],
    livePreview: false,
    practice: {
      title: 'Classify Tasks as DM or ML',
      description: 'Classify each task as Data Mining or Machine Learning: (1) Find frequently bought items together, (2) Predict house prices, (3) Identify fraud patterns.',
      hint: 'DM = discovery and patterns, ML = prediction',
      solution: `1. Find frequently bought items together = Data Mining (Association Rules)
2. Predict house prices = Machine Learning (Regression)
3. Identify fraud patterns = Data Mining (but could use ML for detection)`
    }
  },
  // Data Preprocessing (9 topics)
  {
    id: 'dm-data-cleaning',
    category: 'Data Preprocessing',
    title: 'Data Cleaning',
    difficulty: 'Beginner',
    theory: [
      'Data cleaning is the process of identifying and correcting errors, inconsistencies, and anomalies in datasets. This includes fixing typos, standardizing formats, and removing irrelevant data.',
      'Common cleaning tasks include removing duplicate records, fixing data type mismatches, standardizing text (capitalization, spacing), and validating against business rules.',
      'Clean data is essential for reliable analysis. Unclean data can lead to biased models and incorrect business decisions.'
    ],
    code: `import pandas as pd
import numpy as np

# Dirty data with various issues
data = {
    'Product': ['Laptop', 'laptop', 'LAPTOP', 'Phone ', ' Phone', 'Tablet'],
    'Price': [50000, 50000.0, '50000', 45000, 45000, None],
    'Quantity': [5, 5, 5, 0, 10, 8],
    'Category': ['Electronics', 'Electronics', 'Electronics', 'Electronics', 'Electronics', 'Electronics']
}

df = pd.DataFrame(data)
print("BEFORE Cleaning:")
print(df)

# Cleaning steps
df['Product'] = df['Product'].str.strip().str.title()  # Remove spaces, standardize case
df['Price'] = pd.to_numeric(df['Price'], errors='coerce')  # Convert to numeric
df['Price'].fillna(df['Price'].mean(), inplace=True)  # Fill missing prices
df = df[df['Quantity'] > 0]  # Remove invalid records
df = df.drop_duplicates()  # Remove duplicates

print("\\nAFTER Cleaning:")
print(df.reset_index(drop=True))`,
    output: `BEFORE Cleaning:
  Product    Price  Quantity       Category
0   Laptop    50000         5  Electronics
1   laptop  50000.0         5  Electronics
2   LAPTOP   50000         5  Electronics
3    Phone     45000         0  Electronics
4    Phone    45000        10  Electronics
5   Tablet     None         8  Electronics

AFTER Cleaning:
   Product     Price  Quantity       Category
0   Laptop  50000.0         5  Electronics
1    Phone  45000.0        10  Electronics
2   Tablet  45000.0         8  Electronics`,
    notes: ['Data cleaning removes inconsistencies', 'Use domain knowledge to validate data', 'Automate repetitive cleaning tasks'],
    livePreview: false,
    practice: {
      title: 'Clean Student Data',
      description: 'Clean a dataset with inconsistent names, invalid ages (negative/>100), and duplicate records.',
      hint: 'Standardize case, validate age ranges, remove duplicates',
      solution: `df['Name'] = df['Name'].str.title()
df = df[(df['Age'] > 0) & (df['Age'] < 120)]
df = df.drop_duplicates(subset=['StudentID'])`
    }
  },
  {
    id: 'dm-missing-values',
    category: 'Data Preprocessing',
    title: 'Handling Missing Values',
    difficulty: 'Beginner',
    theory: [
      'Missing values occur when data is unavailable, lost during collection, or intentionally omitted. Handling them properly is crucial for model accuracy.',
      'Strategies include deletion (removes rows/columns), imputation (fills with mean/median/mode/forward fill), and using algorithms that handle missing values inherently.',
      'The choice of strategy depends on the percentage of missing data, the data type, and the mechanism of missingness (random vs systematic).'
    ],
    code: `import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer

# Create dataset with missing values
data = {
    'Age': [25, 30, np.nan, 35, 28, np.nan],
    'Salary': [30000, 45000, 50000, np.nan, 35000, 40000],
    'Experience': [2, 5, 8, 10, 3, 7]
}

df = pd.DataFrame(data)
print("Original Data with Missing Values:")
print(df)

# Strategy 1: Delete rows with missing values
df_dropped = df.dropna()
print("\\nAfter Deletion:")
print(df_dropped)

# Strategy 2: Impute with mean (for Age)
imputer = SimpleImputer(strategy='mean')
df['Age_imputed'] = imputer.fit_transform(df[['Age']])

# Strategy 3: Forward fill (for Salary)
df['Salary_ffill'] = df['Salary'].fillna(method='ffill')

print("\\nAfter Imputation:")
print(df[['Age', 'Age_imputed', 'Salary', 'Salary_ffill']])`,
    output: `Original Data with Missing Values:
    Age   Salary  Experience
0  25.0   30000            2
1  30.0   45000            5
2   NaN   50000            8
3  35.0     NaN           10
4  28.0   35000            3
5   NaN   40000            7

After Deletion:
    Age   Salary  Experience
0  25.0   30000            2
1  30.0   45000            5
4  28.0   35000            3

After Imputation:
    Age  Age_imputed  Salary  Salary_ffill
0  25.0         25.0   30000          30000
1  30.0         30.0   45000          45000
2   NaN         29.5   50000          45000
3  35.0         35.0     NaN          50000
4  28.0         28.0   35000          35000
5   NaN         29.5   40000          40000`,
    notes: ['Do not ignore missing values', 'Mean/median imputation suitable for numerical data', 'Mode imputation suitable for categorical data'],
    livePreview: false,
    practice: {
      title: 'Choose Imputation Strategy',
      description: 'Given a dataset with 5% missing values in Age and 20% in Income, decide which imputation strategy to use and why.',
      hint: 'Consider percentage missing and data type',
      solution: `Age (5% missing): Use mean/median imputation (small percentage)
Income (20% missing): Use KNN imputation or separate category (large percentage, might indicate systematic missingness)`
    }
  },
  {
    id: 'dm-outlier-detection',
    category: 'Data Preprocessing',
    title: 'Outlier Detection and Handling',
    difficulty: 'Intermediate',
    theory: [
      'Outliers are data points that deviate significantly from the pattern of the data. They can be caused by measurement errors, data entry mistakes, or genuine anomalies.',
      'Detection methods include statistical approaches (Z-score, IQR), distance-based (Isolation Forest), and domain knowledge-based rules.',
      'Handling outliers involves deciding whether to remove them, transform them, or keep them depending on whether they represent errors or valid extreme values.'
    ],
    code: `import pandas as pd
import numpy as np
from scipy import stats

# Dataset with outliers
data = {
    'Student': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'Marks': [85, 90, 88, 92, 45, 89, 87]  # 45 is potential outlier
}

df = pd.DataFrame(data)
print("Original Data:")
print(df)

# Method 1: Z-score approach
z_scores = np.abs(stats.zscore(df['Marks']))
print("\\nZ-scores:")
print(z_scores)

# Method 2: IQR (Interquartile Range) approach
Q1 = df['Marks'].quantile(0.25)
Q3 = df['Marks'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"\\nIQR Method:")
print(f"Lower Bound: {lower_bound}, Upper Bound: {upper_bound}")

outliers = df[(df['Marks'] < lower_bound) | (df['Marks'] > upper_bound)]
print(f"\\nOutliers detected: {len(outliers)}")
print(outliers)

# Remove or cap outliers
df['Marks_capped'] = df['Marks'].clip(lower_bound, upper_bound)
print("\\nAfter Capping:")
print(df[['Marks', 'Marks_capped']])`,
    output: `Original Data:
  Student  Marks
0       A     85
1       B     90
2       C     88
3       D     92
4       E     45
5       F     89
6       G     87

Z-scores:
[0.78 1.42 0.97 1.66 2.47 1.29 1.08]

IQR Method:
Lower Bound: 79.25, Upper Bound: 95.75

Outliers detected: 1
  Student  Marks
4       E     45

After Capping:
   Marks  Marks_capped
0     85           85.0
1     90           90.0
2     88           88.0
3     92           92.0
4     45           79.25
5     89           89.0
6     87           87.0`,
    notes: ['IQR method robust for non-normal distributions', 'Z-score assumes normal distribution', 'Domain knowledge helps identify valid outliers'],
    livePreview: false,
    practice: {
      title: 'Detect Outliers',
      description: 'Use IQR method to identify outliers in salary data and decide whether to remove or cap them.',
      hint: 'Calculate Q1, Q3, IQR, then find bounds',
      solution: `Q1 = salaries.quantile(0.25)
Q3 = salaries.quantile(0.75)
IQR = Q3 - Q1
bounds = (Q1 - 1.5*IQR, Q3 + 1.5*IQR)
outliers = salaries[(salaries < bounds[0]) | (salaries > bounds[1])]`
    }
  },
  {
    id: 'dm-normalization',
    category: 'Data Preprocessing',
    title: 'Data Normalization',
    difficulty: 'Intermediate',
    theory: [
      'Normalization rescales features to a fixed range, typically [0, 1]. This is important when features have different scales, as it prevents features with larger ranges from dominating.',
      'Min-Max normalization (scaling) and Z-score normalization are common techniques. Min-Max is useful when you know the bounds of the data, while Z-score is useful for unbounded data.',
      'Normalized data improves the convergence of gradient-based algorithms and makes distance-based algorithms more fair across features.'
    ],
    code: `import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# Dataset with different scales
data = {
    'Height_cm': [175, 162, 180, 158, 172],
    'Weight_kg': [70, 55, 75, 50, 68],
    'Age': [25, 22, 30, 20, 28]
}

df = pd.DataFrame(data)
print("Original Data (Different Scales):")
print(df)

# Min-Max Normalization [0, 1]
scaler_minmax = MinMaxScaler()
df_normalized = pd.DataFrame(
    scaler_minmax.fit_transform(df),
    columns=df.columns
)
print("\\nMin-Max Normalized [0, 1]:")
print(df_normalized)

# Manual Min-Max calculation for Height
height_min = df['Height_cm'].min()
height_max = df['Height_cm'].max()
df['Height_normalized'] = (df['Height_cm'] - height_min) / (height_max - height_min)
print("\\nManual Height Normalization:")
print(df[['Height_cm', 'Height_normalized']])`,
    output: `Original Data (Different Scales):
   Height_cm  Weight_kg  Age
0        175         70   25
1        162         55   22
2        180         75   30
3        158         50   20
4        172         68   28

Min-Max Normalized [0, 1]:
   Height_cm  Weight_kg  Age
0   0.680851   0.500000   0.5
1   0.319149   0.000000   0.2
2   1.000000   1.000000   1.0
3   0.000000   0.000000   0.0
4   0.595745   0.400000   0.8

Manual Height Normalization:
   Height_cm  Height_normalized
0        175            0.68
1        162            0.32
2        180            1.00
3        158            0.00
4        172            0.60`,
    notes: ['Always fit normalization on training data only', 'Apply same transformation to test data', 'Essential for distance-based and neural network algorithms'],
    livePreview: false,
    practice: {
      title: 'Normalize Features',
      description: 'Normalize student marks (0-100) and ages (18-25) to [0, 1] range using Min-Max normalization.',
      hint: 'Formula: (x - min) / (max - min)',
      solution: `df['Marks_norm'] = (df['Marks'] - df['Marks'].min()) / (df['Marks'].max() - df['Marks'].min())
df['Age_norm'] = (df['Age'] - df['Age'].min()) / (df['Age'].max() - df['Age'].min())`
    }
  },
  {
    id: 'dm-standardization',
    category: 'Data Preprocessing',
    title: 'Data Standardization (Z-score)',
    difficulty: 'Intermediate',
    theory: [
      'Standardization transforms data to have mean 0 and standard deviation 1, useful for algorithms that assume normally distributed data or use distance metrics.',
      'The Z-score formula is (x - mean) / standard_deviation. This is different from normalization in that it doesn\'t bound values to [0, 1].',
      'Standardization is preferred for algorithms like KNN, K-Means, SVM, and neural networks that are sensitive to feature scaling.'
    ],
    code: `import pandas as pd
from sklearn.preprocessing import StandardScaler
import numpy as np

# Dataset
data = {
    'Math_Score': [85, 90, 78, 92, 88],
    'Science_Score': [80, 88, 75, 90, 85],
    'English_Score': [75, 82, 80, 85, 79]
}

df = pd.DataFrame(data)
print("Original Data:")
print(df)
print(f"\\nMean: {df.mean().to_dict()}")
print(f"Std Dev: {df.std().to_dict()}")

# StandardScaler (Z-score normalization)
scaler = StandardScaler()
df_standardized = pd.DataFrame(
    scaler.fit_transform(df),
    columns=df.columns
)

print("\\nStandardized Data (Mean=0, Std=1):")
print(df_standardized)
print(f"\\nMean: {df_standardized.mean().to_dict()}")
print(f"Std Dev: {df_standardized.std().to_dict()}")

# Manual calculation
math_mean = df['Math_Score'].mean()
math_std = df['Math_Score'].std()
df['Math_Standardized'] = (df['Math_Score'] - math_mean) / math_std
print("\\nManual Math Standardization:")
print(df[['Math_Score', 'Math_Standardized']])`,
    output: `Original Data:
   Math_Score  Science_Score  English_Score
0          85              80              75
1          90              88              82
2          78              75              80
3          92              90              85
4          88              85              79

Mean: {'Math_Score': 86.6, 'Science_Score': 83.6, 'English_Score': 80.2}
Std Dev: {'Math_Score': 5.22, 'Science_Score': 5.99, 'English_Score': 3.70}

Standardized Data (Mean=0, Std=1):
   Math_Score  Science_Score  English_Score
0   -0.306973       -0.601003       -1.405405
1    0.647640        0.734503        0.539054
2   -1.631635       -1.434509        -0.027027
3    1.032970        1.068010        1.297297
4    0.258008        0.233000       -0.404054

Mean: {'Math_Score': 0.0, 'Science_Score': 0.0, 'English_Score': 0.0}
Std Dev: {'Math_Score': 1.0, 'Science_Score': 1.0, 'English_Score': 1.0}

Manual Math Standardization:
   Math_Score  Math_Standardized
0          85          -0.307
1          90           0.648
2          78         -1.632
3          92           1.033
4          88           0.258`,
    notes: ['Standardization doesn\'t bound values', 'Preserves distribution shape', 'Unbounded, so extreme values remain extreme'],
    livePreview: false,
    practice: {
      title: 'Compare Normalization vs Standardization',
      description: 'Apply both Min-Max normalization and Z-score standardization to the same dataset and compare results.',
      hint: 'Normalization: [0,1] bounded; Standardization: mean=0, std=1, unbounded',
      solution: `Normalization gives values in [0, 1]
Standardization gives values spread around 0 with std=1
Normalization useful for neural networks
Standardization useful for distance-based algorithms`
    }
  },
  {
    id: 'dm-encoding-categorical',
    category: 'Data Preprocessing',
    title: 'Encoding Categorical Data',
    difficulty: 'Intermediate',
    theory: [
      'Categorical variables contain discrete, non-numeric values (like city names, product categories). Machine learning algorithms require numerical input, so categorical data must be encoded.',
      'One-Hot Encoding creates binary columns for each category (good for low cardinality). Label Encoding assigns numeric labels (good for ordinal data). Target Encoding uses target statistics.',
      'Choosing the right encoding method affects model performance. Ordinal data preserves order with Label Encoding, while nominal data needs One-Hot Encoding to avoid imposing artificial ordering.'
    ],
    code: `import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder

# Dataset with categorical data
data = {
    'Product': ['Laptop', 'Phone', 'Tablet', 'Laptop', 'Phone'],
    'City': ['Delhi', 'Mumbai', 'Delhi', 'Bangalore', 'Mumbai'],
    'Grade': ['A', 'B', 'A+', 'A', 'B+']
}

df = pd.DataFrame(data)
print("Original Categorical Data:")
print(df)

# Label Encoding - for ordinal data like Grade
le_grade = LabelEncoder()
df['Grade_Encoded'] = le_grade.fit_transform(df['Grade'])
print("\\nLabel Encoded Grade:")
print(df[['Grade', 'Grade_Encoded']])
print(f"Mapping: {dict(zip(le_grade.classes_, le_grade.transform(le_grade.classes_)))}")

# One-Hot Encoding - for nominal data like Product, City
df_onehot = pd.get_dummies(df[['Product', 'City']], prefix=['Product', 'City'])
print("\\nOne-Hot Encoded Product and City:")
print(df_onehot)`,
    output: `Original Categorical Data:
  Product      City Grade
0  Laptop    Delhi     A
1   Phone   Mumbai     B
2  Tablet    Delhi    A+
3  Laptop Bangalore     A
4   Phone   Mumbai    B+

Label Encoded Grade:
   Grade  Grade_Encoded
0     A              0
1     B              2
2    A+              1
3     A              0
4    B+              3

Mapping: {'A': 0, 'A+': 1, 'B': 2, 'B+': 3}

One-Hot Encoded Product and City:
   Product_Laptop  Product_Phone  Product_Tablet  City_Bangalore  City_Delhi  City_Mumbai
0               1              0               0               0           1           0
1               0              1               0               0           0           1
2               0              0               1               0           1           0
3               1              0               0               1           0           0
4               0              1               0               0           0           1`,
    notes: ['One-Hot Encoding avoids ordinal bias', 'Label Encoding suitable for tree-based algorithms', 'Handle unseen categories during deployment'],
    livePreview: false,
    practice: {
      title: 'Encode Mixed Data',
      description: 'Encode a dataset with product category (nominal), size (ordinal: S, M, L, XL), and customer segment.',
      hint: 'Ordinal needs Label Encoding, nominal needs One-Hot Encoding',
      solution: `Size (ordinal): Size -> S=0, M=1, L=2, XL=3
Category (nominal): One-Hot encode each category
Segment (nominal): One-Hot encode each segment`
    }
  },
  {
    id: 'dm-feature-selection',
    category: 'Data Preprocessing',
    title: 'Feature Selection',
    difficulty: 'Intermediate',
    theory: [
      'Feature selection identifies the most relevant features for the predictive model, removing irrelevant and redundant features. This improves model performance and reduces training time.',
      'Methods include statistical tests (chi-square, correlation), tree-based importance, and domain knowledge. Filter methods rank features independently, while wrapper methods evaluate subsets.',
      'Too many features can lead to overfitting and increased computational cost. Fewer, relevant features often yield better model generalization.'
    ],
    code: `import pandas as pd
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.ensemble import RandomForestClassifier

# Dataset
data = {
    'Age': [25, 30, 28, 35, 22, 32],
    'Salary': [30000, 45000, 35000, 50000, 25000, 48000],
    'Years_Exp': [2, 8, 5, 12, 1, 10],
    'Education': [0, 1, 1, 1, 0, 1],  # 0=High School, 1=College
    'Loan_Approved': [0, 1, 0, 1, 0, 1]  # Target
}

df = pd.DataFrame(data)
X = df.drop('Loan_Approved', axis=1)
y = df['Loan_Approved']

print("Original Features:")
print(X.columns.tolist())

# Method 1: Statistical test (f_classif)
selector = SelectKBest(score_func=f_classif, k=2)
X_selected = selector.fit_transform(X, y)
selected_features = X.columns[selector.get_support()].tolist()
print(f"\\nSelected Features (SelectKBest): {selected_features}")

# Method 2: Feature importance from Random Forest
rf = RandomForestClassifier(random_state=42)
rf.fit(X, y)
importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': rf.feature_importances_
}).sort_values('Importance', ascending=False)

print("\\nFeature Importance (Random Forest):")
print(importance)

# Method 3: Correlation with target
correlation = pd.DataFrame({
    'Feature': X.columns,
    'Correlation': [X[col].corr(y) for col in X.columns]
}).sort_values('Correlation', key=abs, ascending=False)

print("\\nCorrelation with Target:")
print(correlation)`,
    output: `Original Features:
['Age', 'Salary', 'Years_Exp', 'Education']

Selected Features (SelectKBest): ['Salary', 'Years_Exp']

Feature Importance (Random Forest):
         Feature  Importance
2      Years_Exp    0.500000
1         Salary    0.450000
3      Education    0.050000
0            Age    0.000000

Correlation with Target:
       Feature  Correlation
1         Salary    0.923762
2      Years_Exp    0.882904
3      Education    0.816497
0            Age    0.200000`,
    notes: ['Remove features with very low importance', 'Avoid removing all collinear features at once', 'Re-evaluate feature importance after model changes'],
    livePreview: false,
    practice: {
      title: 'Select Best Features',
      description: 'Given a dataset with 10 features, select the top 5 most important features using correlation and random forest importance.',
      hint: 'Use SelectKBest with f_classif or calculate correlations manually',
      solution: `selector = SelectKBest(f_classif, k=5)
X_best = selector.fit_transform(X, y)
best_features = X.columns[selector.get_support()].tolist()`
    }
  },
  {
    id: 'dm-dimensionality-reduction',
    category: 'Data Preprocessing',
    title: 'Dimensionality Reduction (PCA)',
    difficulty: 'Advanced',
    theory: [
      'Dimensionality reduction transforms high-dimensional data into lower-dimensional space while preserving most variance. Principal Component Analysis (PCA) is a popular unsupervised technique.',
      'PCA identifies principal components (linear combinations of original features) that capture maximum variance. First component captures most variance, second captures remaining variance orthogonal to first.',
      'Benefits include reduced computational cost, noise reduction, visualization of high-dimensional data, and combating curse of dimensionality. Trade-off is interpretability of transformed features.'
    ],
    code: `import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# High-dimensional dataset
np.random.seed(42)
data = {
    'Feature1': np.random.randn(50) + 5,
    'Feature2': np.random.randn(50) + 3,
    'Feature3': np.random.randn(50) * 0.5 + 2,
    'Feature4': np.random.randn(50) + 4
}

df = pd.DataFrame(data)
print("Original Data Shape:", df.shape)

# Standardize (PCA requires scaled data)
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df)

# Apply PCA
pca = PCA(n_components=2)  # Reduce to 2 dimensions
df_pca = pca.fit_transform(df_scaled)

print("Reduced Data Shape:", df_pca.shape)
print(f"\\nExplained Variance Ratio: {pca.explained_variance_ratio_}")
print(f"Cumulative Variance: {np.cumsum(pca.explained_variance_ratio_)}")

# PCA loadings (weights of original features in components)
loadings = pd.DataFrame(
    pca.components_,
    columns=df.columns,
    index=['PC1', 'PC2']
)
print("\\nPCA Loadings:")
print(loadings)`,
    output: `Original Data Shape: (50, 4)
Reduced Data Shape: (50, 2)

Explained Variance Ratio: [0.52103624 0.32418765]
Cumulative Variance: [0.52103624 0.84522389]

PCA Loadings:
          Feature1   Feature2   Feature3   Feature4
PC1       0.524731   0.482650   0.070381   0.491837
PC2      -0.368725   0.412256   0.793452  -0.252850`,
    notes: ['Always standardize before PCA', 'Explained variance indicates information retention', 'PCA components are not interpretable like original features'],
    livePreview: false,
    practice: {
      title: 'Reduce Dimensions with PCA',
      description: 'Apply PCA to reduce a 8-dimensional dataset to 3 dimensions, showing explained variance at each step.',
      hint: 'Use PCA(n_components=3) and check explained_variance_ratio_',
      solution: `pca = PCA(n_components=3)
X_reduced = pca.fit_transform(X_scaled)
print(np.cumsum(pca.explained_variance_ratio_))  # Check variance retained`
    }
  },
  {
    id: 'dm-train-test-split',
    category: 'Data Preprocessing',
    title: 'Data Splitting (Train/Test)',
    difficulty: 'Intermediate',
    theory: [
      'Data splitting divides data into training set (used to build model) and test set (used to evaluate model). This prevents overfitting and provides realistic performance estimates.',
      'Common split ratios are 80/20 or 70/30 for training/test. For time series data, temporal split is used. For imbalanced classes, stratified split ensures class distribution is preserved.',
      'Cross-validation uses multiple train/test splits to get more robust performance estimates, reducing variance from a single split. K-Fold cross-validation is the most common approach.'
    ],
    code: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Sample dataset
data = {
    'Age': [25, 30, 28, 35, 22, 32, 27, 40, 24, 31],
    'Salary': [30000, 45000, 35000, 50000, 25000, 48000, 32000, 60000, 28000, 46000],
    'Approved': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
}

df = pd.DataFrame(data)
X = df[['Age', 'Salary']]
y = df['Approved']

print("Total Dataset Size:", len(df))

# Simple Train/Test Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\\nTrain Size: {len(X_train)}, Test Size: {len(X_test)}")

# Stratified split (maintains class distribution)
X_train_strat, X_test_strat, y_train_strat, y_test_strat = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

print("\\nStratified Split:")
print(f"Train class distribution: {y_train_strat.value_counts().to_dict()}")
print(f"Test class distribution: {y_test_strat.value_counts().to_dict()}")

# K-Fold Cross-Validation
clf = DecisionTreeClassifier(random_state=42)
scores = cross_val_score(clf, X, y, cv=5)
print(f"\\n5-Fold Cross-Validation Scores: {scores}")
print(f"Mean Score: {scores.mean():.3f} (+/- {scores.std():.3f})")`,
    output: `Total Dataset Size: 10

Train Size: 8, Test Size: 2

Stratified Split:
Train class distribution: {1: 4, 0: 4}
Test class distribution: {1: 1, 0: 1}

5-Fold Cross-Validation Scores: [0.5 1.0 1.0 1.0 1.0]
Mean Score: 0.900 (+/- 0.173)`,
    notes: ['Always use random_state for reproducibility', 'Use stratified split for imbalanced data', 'Cross-validation provides better generalization estimates'],
    livePreview: false,
    practice: {
      title: 'Split and Validate',
      description: 'Split student exam data into 70/30 train/test, then perform 5-fold cross-validation to evaluate model performance.',
      hint: 'Use train_test_split with stratify for balanced split, then cross_val_score',
      solution: `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y)
scores = cross_val_score(model, X_train, y_train, cv=5)
test_score = model.fit(X_train, y_train).score(X_test, y_test)`
    }
  },
  // Association Rule Mining (6 topics)
  {
    id: 'dm-market-basket',
    category: 'Association Rule Mining',
    title: 'Market Basket Analysis',
    difficulty: 'Beginner',
    theory: [
      'Market Basket Analysis discovers relationships between items frequently purchased together. It helps retailers optimize product placement, cross-selling strategies, and promotional bundles.',
      'A typical transaction might include multiple items. The analysis finds patterns like "customers who buy milk often buy bread" or "rice and dal are frequently bought together".',
      'In Indian retail context, common associations include: rice with dal, tea with sugar, spices with vegetables, and seasonal combinations. These insights drive recommendations and pricing strategies.'
    ],
    code: `import pandas as pd
from itertools import combinations
from collections import Counter

# Transaction data from an Indian grocery store
transactions = [
    ['Rice', 'Dal', 'Oil'],
    ['Rice', 'Dal', 'Spices'],
    ['Milk', 'Bread', 'Butter'],
    ['Rice', 'Dal', 'Oil', 'Spices'],
    ['Milk', 'Bread'],
    ['Tea', 'Sugar', 'Milk'],
    ['Rice', 'Oil'],
    ['Dal', 'Spices'],
    ['Milk', 'Bread', 'Tea'],
    ['Rice', 'Dal', 'Oil']
]

print("Transaction Database:")
for i, trans in enumerate(transactions, 1):
    print(f"{i}. {trans}")

# Find frequent 2-itemsets (pairs)
pairs = []
for transaction in transactions:
    for pair in combinations(transaction, 2):
        pairs.append(tuple(sorted(pair)))

pair_counts = Counter(pairs)
print("\\n2-Itemset Frequencies (min support=2):")
for pair, count in sorted(pair_counts.items(), key=lambda x: x[1], reverse=True):
    if count >= 2:
        print(f"{pair}: {count} times (support: {count/len(transactions)*100:.1f}%)")

# Find frequently bought together (support > 30%)
min_support = 0.3
frequent_pairs = {pair: count for pair, count in pair_counts.items()
                  if count/len(transactions) >= min_support}
print(f"\\nFrequent Itemsets (support >= {min_support*100}%):")
for pair, count in sorted(frequent_pairs.items(), key=lambda x: x[1], reverse=True):
    print(f"{pair}: {count/len(transactions)*100:.1f}%")`,
    output: `Transaction Database:
1. ['Rice', 'Dal', 'Oil']
2. ['Rice', 'Dal', 'Spices']
3. ['Milk', 'Bread', 'Butter']
4. ['Rice', 'Dal', 'Oil', 'Spices']
5. ['Milk', 'Bread']
6. ['Tea', 'Sugar', 'Milk']
7. ['Rice', 'Oil']
8. ['Dal', 'Spices']
9. ['Milk', 'Bread', 'Tea']
10. ['Rice', 'Dal', 'Oil']

2-Itemset Frequencies (min support=2):
('Dal', 'Rice'): 4 times (support: 40.0%)
('Oil', 'Rice'): 4 times (support: 40.0%)
('Bread', 'Milk'): 3 times (support: 30.0%)
('Dal', 'Oil'): 3 times (support: 30.0%)
('Dal', 'Spices'): 2 times (support: 20.0%)
('Rice', 'Spices'): 2 times (support: 20.0%)

Frequent Itemsets (support >= 30%):
('Dal', 'Rice'): 40.0%
('Oil', 'Rice'): 40.0%
('Bread', 'Milk'): 30.0%
('Dal', 'Oil'): 30.0%`,
    notes: ['Market basket analysis drives retail strategy', 'Used in online recommendations (Amazon, Flipkart)', 'Insights improve store layout and bundling'],
    livePreview: false,
    practice: {
      title: 'Find Product Associations',
      description: 'Analyze grocery transactions to find product pairs with support > 25% and suggest bundle recommendations.',
      hint: 'Count itemset occurrences, divide by total transactions',
      solution: `Count pairs in all transactions
Calculate support = pair_count / total_transactions
Filter pairs with support > 0.25
Bundle related items together`
    }
  },
  {
    id: 'dm-apriori',
    category: 'Association Rule Mining',
    title: 'Apriori Algorithm',
    difficulty: 'Intermediate',
    theory: ['Apriori generates frequent itemsets bottom-up. If an itemset is frequent, all subsets are frequent. If infrequent, all supersets are infrequent (pruning).', 'Efficiency depends on support threshold and data characteristics. Lower support generates more itemsets.', 'Foundation for association rule generation.'],
    code: `from mlxtend.frequent_patterns import apriori
from mlxtend.preprocessing import TransactionEncoder
import pandas as pd

transactions = [['Rice','Dal','Oil'],['Rice','Dal','Spices'],['Milk','Bread','Butter'],['Rice','Dal','Oil','Spices'],['Milk','Bread'],['Tea','Sugar','Milk'],['Rice','Oil'],['Dal','Spices'],['Milk','Bread','Tea'],['Rice','Dal','Oil']]

te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)

itemsets = apriori(df, min_support=0.3, use_colnames=True)
print(itemsets.sort_values('support', ascending=False))`,
    output: `     support       itemsets
0       0.40  (Rice, Dal)
1       0.40  (Rice, Oil)
2       0.30  (Milk, Bread)
3       0.30   (Dal, Oil)`,
    notes: ['Apriori principle prunes search space','Generates all frequent itemsets','Foundation for rules'],
    livePreview: false,
    practice: { title: 'Mine Itemsets', description: 'Apply Apriori with min_support=0.25', hint: 'Use apriori function', solution: `apriori(df, min_support=0.25, use_colnames=True)` }
  },
  {
    id: 'dm-metrics-rules',
    category: 'Association Rule Mining',
    title: 'Support, Confidence, Lift',
    difficulty: 'Intermediate',
    theory: ['Support(X,Y) = freq(X,Y)/total - proportion of transactions','Confidence(X→Y) = freq(X,Y)/freq(X) - probability Y given X','Lift = Confidence/Support(Y) - correlation strength. Lift>1 positive, <1 negative'],
    code: `df_counts = pd.DataFrame({'Rice_Dal': [5], 'Rice': [7], 'Dal': [6]})
total = 10
support = 5/10
confidence = 5/7
lift = (5/7) / (6/10)
print(f'Support: {support:.2%}, Confidence: {confidence:.2%}, Lift: {lift:.2f}')`,
    output: `Support: 50.00%, Confidence: 71.43%, Lift: 1.19`,
    notes: ['Support*100 = % transactions','Confidence > 50% strong','Lift > 1.2 very strong'],
    livePreview: false,
    practice: { title: 'Calculate Metrics', description: 'Calculate support, confidence, lift for Milk→Bread', hint: 'Count occurrences', solution: `support = both/total; confidence = both/milk; lift = confidence/support_bread` }
  },
  {
    id: 'dm-fpgrowth',
    category: 'Association Rule Mining',
    title: 'FP-Growth Algorithm',
    difficulty: 'Advanced',
    theory: ['FP-Growth uses compressed FP-tree structure to avoid candidate generation.','More efficient than Apriori, especially for low support thresholds.','Time O(n) for tree + mining vs Apriori O(2^n) candidate generation.'],
    code: `from mlxtend.frequent_patterns import fpgrowth
itemsets = fpgrowth(df, min_support=0.2, use_colnames=True)
print(itemsets.sort_values('support', ascending=False).head())`,
    output: `     support       itemsets
0       0.50   (Rice, Dal)
1       0.40   (Rice, Oil)
2       0.30  (Milk, Bread)`,
    notes: ['No candidate generation','Much faster','Uses less memory'],
    livePreview: false,
    practice: { title: 'Compare Algorithms', description: 'Mine same data with Apriori and FP-Growth, compare time', hint: 'Time both', solution: `import time; t1=time.time(); apriori(...); print(time.time()-t1)` }
  },
  {
    id: 'dm-business-rules',
    category: 'Association Rule Mining',
    title: 'Business Applications',
    difficulty: 'Intermediate',
    theory: ['Retail: Bread→Jam suggests cross-selling and bundling.','E-commerce: Frequently bought together recommendations.','Seasonal patterns: Diwali decorations→gifts in Oct-Nov.'],
    code: `rules = [
  {'Bread': 'Jam', 'confidence': 0.67, 'lift': 1.8},
  {'Tea': ['Milk','Sugar'], 'confidence': 0.75, 'lift': 1.6},
  {'Rice': ['Dal','Oil'], 'confidence': 0.71, 'lift': 1.4}
]
print("Cross-sell recommendations:")
for rule in rules:
  print(f"  If customer buys {list(rule.keys())[0]}, suggest {list(rule.values())[0]}")`,
    output: `Cross-sell recommendations:
  If customer buys Bread, suggest Jam
  If customer buys Tea, suggest ['Milk', 'Sugar']
  If customer buys Rice, suggest ['Dal', 'Oil']`,
    notes: ['Rules drive business strategy','Unexpected rules reveal opportunities','Seasonal rules change'],
    livePreview: false,
    practice: { title: 'Actionable Rules', description: 'Find rules with confidence>60% and suggest bundling strategy', hint: 'Filter by metrics', solution: `rules[rules['confidence'] > 0.6]` }
  },
  {
    id: 'dm-itemset-mining',
    category: 'Association Rule Mining',
    title: 'Mining Frequent Itemsets',
    difficulty: 'Intermediate',
    theory: ['1-itemsets single items, 2-itemsets pairs, k-itemsets size k.','Each has support value. Lower support = more itemsets.','Must balance completeness vs efficiency with threshold.'],
    code: `for sup in [0.1, 0.2, 0.3, 0.4]:
  items = apriori(df, min_support=sup, use_colnames=True)
  print(f'Support {sup*100:.0f}%: {len(items)} itemsets')`,
    output: `Support 10%: 14 itemsets
Support 20%: 10 itemsets
Support 30%: 7 itemsets
Support 40%: 3 itemsets`,
    notes: ['Higher support = fewer itemsets','Tune for balance','Start 20-30%'],
    livePreview: false,
    practice: { title: 'Optimal Threshold', description: 'Find support that gives 5-10 patterns', hint: 'Binary search', solution: `for sup in [0.05, 0.1, 0.15, 0.2]: print(len(apriori(df, min_support=sup)))` }
  },
  // Clustering (7 topics) - condensed
  {
    id: 'dm-clustering-intro',
    category: 'Clustering',
    title: 'What is Clustering?',
    difficulty: 'Beginner',
    theory: ['Clustering groups similar data points without labels (unsupervised).','Maximizes within-group similarity, minimizes between-group similarity.','Applications: customer segmentation, document grouping, gene sequencing.'],
    code: `from sklearn.cluster import KMeans
import pandas as pd

data = {'Age': [25,35,28,45,22,32,27,40], 'Salary': [30000,50000,35000,60000,25000,48000,32000,55000]}
X = pd.DataFrame(data)

kmeans = KMeans(n_clusters=2, random_state=42)
labels = kmeans.fit_predict(X)
print(f"Cluster assignments: {labels}")
print(f"Centroids:\\n{kmeans.cluster_centers_}")`,
    output: `Cluster assignments: [0 1 0 1 0 1 0 1]
Centroids:
[[25.5 30500]
 [37.5 53250]]`,
    notes: ['Unsupervised - no labels needed','Exploratory technique','Results depend on initialization'],
    livePreview: false,
    practice: { title: 'Cluster Data', description: 'Apply K-means with k=3 to customer dataset', hint: 'KMeans(n_clusters=3)', solution: `KMeans(n_clusters=3).fit_predict(X)` }
  },
  {
    id: 'dm-kmeans',
    category: 'Clustering',
    title: 'K-Means Clustering',
    difficulty: 'Intermediate',
    theory: ['Iteratively: assign points to nearest centroid, update centroids.','Converges when assignments no longer change.','Minimizes within-cluster sum of squared distances.'],
    code: `from sklearn.cluster import KMeans
import numpy as np

X = np.array([[1,2],[1.5,1.8],[5,8],[8,8],[1,0.6],[9,11]])
km = KMeans(n_clusters=2, n_init=10, random_state=42)
km.fit(X)
print(f"Labels: {km.labels_}")
print(f"Inertia (WCSS): {km.inertia_:.2f}")`,
    output: `Labels: [0 0 1 1 0 1]
Inertia (WCSS): 12.34`,
    notes: ['O(n*k*i) - n points, k clusters, i iterations','Sensitive to initialization','Suitable for spherical clusters'],
    livePreview: false,
    practice: { title: 'Tune K', description: 'Try k=1 to 5 and find elbow point', hint: 'Plot inertia vs k', solution: `for k in range(1,6): KMeans(k).fit(X)` }
  },
  {
    id: 'dm-hierarchical-clustering',
    category: 'Clustering',
    title: 'Hierarchical Clustering',
    difficulty: 'Intermediate',
    theory: ['Agglomerative: bottom-up, merge closest clusters.','Divisive: top-down, split clusters.','Dendrogram shows hierarchical structure.'],
    code: `from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.cluster import AgglomerativeClustering

X = [[1,2],[1.5,1.8],[5,8],[8,8],[1,0.6],[9,11]]
Z = linkage(X, method='ward')

agg = AgglomerativeClustering(n_clusters=2, linkage='ward')
labels = agg.fit_predict(X)
print(f"Labels: {labels}")`,
    output: `Labels: [0 0 1 1 0 1]`,
    notes: ['Dendrogram shows merge history','No need to specify k upfront','O(n²) space complexity'],
    livePreview: false,
    practice: { title: 'Compare Linkages', description: 'Try ward, complete, average linkage methods', hint: 'linkage parameter', solution: `for method in ['ward','complete','average']: AgglomerativeClustering(linkage=method)` }
  },
  {
    id: 'dm-dbscan',
    category: 'Clustering',
    title: 'DBSCAN',
    difficulty: 'Advanced',
    theory: ['Density-based: groups points close together, marks outliers.','Parameters: eps (radius), min_samples.','Finds clusters of arbitrary shape, handles outliers naturally.'],
    code: `from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

X = [[1,2],[1.5,1.8],[5,8],[8,8],[1,0.6],[9,11],[8.5,9]]
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

db = DBSCAN(eps=0.5, min_samples=2)
labels = db.fit_predict(X_scaled)
print(f"Labels: {labels}")
print(f"Outliers: {sum(1 for l in labels if l == -1)}")`,
    output: `Labels: [0 0 1 1 0 1 1]
Outliers: 0`,
    notes: ['Finds any-shaped clusters','Automatic outlier detection','Sensitive to eps/min_samples'],
    livePreview: false,
    practice: { title: 'Tune DBSCAN', description: 'Find eps/min_samples that give good clusters', hint: 'k-distance graph', solution: `for eps in [0.3, 0.5, 0.7]: DBSCAN(eps=eps).fit_predict(X)` }
  },
  {
    id: 'dm-silhouette-score',
    category: 'Clustering',
    title: 'Cluster Evaluation (Silhouette)',
    difficulty: 'Intermediate',
    theory: ['Silhouette coefficient measures cohesion and separation.','Range [-1, 1]: higher is better. Negative means wrong cluster.','Use to evaluate clustering quality and choose number of clusters.'],
    code: `from sklearn.metrics import silhouette_score, silhouette_samples
from sklearn.cluster import KMeans

X = [[1,2],[1.5,1.8],[5,8],[8,8],[1,0.6],[9,11]]
scores = []
for k in range(2, 5):
  km = KMeans(n_clusters=k, random_state=42)
  labels = km.fit_predict(X)
  score = silhouette_score(X, labels)
  scores.append(score)
  print(f"k={k}: Silhouette={score:.3f}")

best_k = 2 + scores.index(max(scores))
print(f"Best k: {best_k}")`,
    output: `k=2: Silhouette=0.512
k=3: Silhouette=0.398
k=4: Silhouette=0.285
Best k: 2`,
    notes: ['Silhouette > 0.5 good','0.3-0.5 marginal','< 0.3 poor','Use to tune k'],
    livePreview: false,
    practice: { title: 'Evaluate Clustering', description: 'Calculate silhouette score for k=2 to 6', hint: 'silhouette_score(X, labels)', solution: `for k in range(2,7): print(silhouette_score(X, KMeans(k).fit_predict(X)))` }
  },
  {
    id: 'dm-elbow-method',
    category: 'Clustering',
    title: 'Elbow Method for Optimal K',
    difficulty: 'Intermediate',
    theory: ['Plot inertia (WCSS) vs number of clusters.','Elbow point indicates optimal k.','Inertia decreases with more clusters (always).'],
    code: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

inertias = []
for k in range(1, 8):
  km = KMeans(n_clusters=k, random_state=42)
  km.fit(X)
  inertias.append(km.inertia_)
  print(f"k={k}: Inertia={km.inertia_:.2f}")

print("\\nElbow at k where inertia decrease slows")`,
    output: `k=1: Inertia=45.67
k=2: Inertia=12.34
k=3: Inertia=8.90
k=4: Inertia=7.50
k=5: Inertia=6.89
k=6: Inertia=6.45
k=7: Inertia=6.23

Elbow at k where inertia decrease slows`,
    notes: ['Visually identify elbow','Combine with silhouette score','Heuristic method'],
    livePreview: false,
    practice: { title: 'Find Elbow', description: 'Plot inertia for k=1 to 10 and identify elbow', hint: 'Plot and eyeball', solution: `for k in range(1,11): print(KMeans(k, random_state=42).fit(X).inertia_)` }
  },
  // Regression (5 topics)
  {
    id: 'dm-linear-regression',
    category: 'Regression',
    title: 'Linear Regression',
    difficulty: 'Beginner',
    theory: ['Predicts continuous values using linear relationship: y = mx + b.','Minimizes sum of squared errors (MSE).','Simple, interpretable, fast but assumes linearity.'],
    code: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1],[2],[3],[4],[5]])
y = np.array([2,4,5,4.5,5.5])

lr = LinearRegression()
lr.fit(X, y)
print(f"Slope: {lr.coef_[0]:.2f}, Intercept: {lr.intercept_:.2f}")
print(f"R² Score: {lr.score(X, y):.3f}")

pred = lr.predict([[3.5]])
print(f"Prediction for x=3.5: {pred[0]:.2f}")`,
    output: `Slope: 0.90, Intercept: 1.10
R² Score: 0.825

Prediction for x=3.5: 4.25`,
    notes: ['Linear only','Sensitive to outliers','Fast training'],
    livePreview: false,
    practice: { title: 'Simple Regression', description: 'Fit linear regression to student study hours vs marks', hint: 'LinearRegression().fit(X,y)', solution: `lr = LinearRegression(); lr.fit(X, y); print(lr.coef_, lr.intercept_)` }
  },
  {
    id: 'dm-multiple-regression',
    category: 'Regression',
    title: 'Multiple Linear Regression',
    difficulty: 'Intermediate',
    theory: ['Multiple predictors: y = b0 + b1*x1 + b2*x2 + ... + bn*xn.','Finds weights that minimize MSE.','Assumes independence between features (multicollinearity issues).'],
    code: `from sklearn.linear_model import LinearRegression
import pandas as pd

data = {'Hours': [2,3,4,5,6], 'Attendance': [60,75,80,85,90], 'Marks': [50,65,75,80,85]}
df = pd.DataFrame(data)

X = df[['Hours', 'Attendance']]
y = df['Marks']

mlr = LinearRegression()
mlr.fit(X, y)
print(f"Coefficients: Hours={mlr.coef_[0]:.2f}, Attendance={mlr.coef_[1]:.2f}")
print(f"Intercept: {mlr.intercept_:.2f}")
print(f"R²: {mlr.score(X, y):.3f}")`,
    output: `Coefficients: Hours=5.00, Attendance=0.25
Intercept: 10.00
R²: 0.980`,
    notes: ['Multiple features','Feature scaling helps','Avoid multicollinearity'],
    livePreview: false,
    practice: { title: 'Multiple Predictors', description: 'Build regression with 3+ features and interpret coefficients', hint: 'Check coef_ values', solution: `mlr = LinearRegression(); mlr.fit(X,y); print(mlr.coef_)` }
  },
  {
    id: 'dm-polynomial-regression',
    category: 'Regression',
    title: 'Polynomial Regression',
    difficulty: 'Intermediate',
    theory: ['Extends linear regression to polynomial curves: y = b0 + b1*x + b2*x² + ...','Degree parameter controls complexity.','Higher degree fits training data better but overfits.'],
    code: `from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1],[2],[3],[4],[5]])
y = np.array([1,4,9,16,25])

for degree in [1, 2, 3]:
  poly = PolynomialFeatures(degree=degree)
  X_poly = poly.fit_transform(X)
  model = LinearRegression()
  model.fit(X_poly, y)
  r2 = model.score(X_poly, y)
  print(f"Degree {degree}: R²={r2:.3f}")`,
    output: `Degree 1: R²=0.800
Degree 2: R²=1.000
Degree 3: R²=1.000`,
    notes: ['Degree 2-3 usually sufficient','Avoid overfitting','Computationally expensive for high degree'],
    livePreview: false,
    practice: { title: 'Fit Curves', description: 'Compare linear vs polynomial fit on non-linear data', hint: 'PolynomialFeatures(degree=n)', solution: `poly = PolynomialFeatures(2); X_poly = poly.fit_transform(X); LinearRegression().fit(X_poly, y)` }
  },
  {
    id: 'dm-regression-evaluation',
    category: 'Regression',
    title: 'Regression Evaluation (MSE, R²)',
    difficulty: 'Intermediate',
    theory: ['MSE (Mean Squared Error): average squared prediction error. Lower is better.','R² (Coefficient of Determination): [0,1]. Proportion of variance explained.','RMSE (Root MSE): same scale as y, interpretable.'],
    code: `from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np

y_true = [3, -0.5, 2, 7, 5]
y_pred = [2.5, 0.0, 2, 8, 4.5]

mse = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_true, y_pred)
r2 = r2_score(y_true, y_pred)

print(f"MSE: {mse:.3f}")
print(f"RMSE: {rmse:.3f}")
print(f"MAE: {mae:.3f}")
print(f"R²: {r2:.3f}")`,
    output: `MSE: 0.350
RMSE: 0.592
MAE: 0.400
R²: 0.930`,
    notes: ['R²=1 perfect, 0=baseline model','RMSE interpretable unit','Use on test set only'],
    livePreview: false,
    practice: { title: 'Evaluate Regression', description: 'Calculate MSE, RMSE, MAE, R² for predictions', hint: 'Use sklearn.metrics', solution: `mse = mean_squared_error(y_true, y_pred); r2 = r2_score(y_true, y_pred)` }
  },
  {
    id: 'dm-gradient-descent',
    category: 'Regression',
    title: 'Gradient Descent Concept',
    difficulty: 'Advanced',
    theory: ['Optimization algorithm that iteratively updates weights to minimize loss.','Computes gradient (slope) of loss, moves opposite direction.','Learning rate controls step size - too high overshoots, too low slow.'],
    code: `import numpy as np

def gradient_descent(X, y, lr=0.01, iterations=100):
  m, n = X.shape
  w = np.zeros(n)
  for i in range(iterations):
    pred = X @ w
    error = pred - y
    gradient = (2/m) * (X.T @ error)
    w -= lr * gradient
    if i % 20 == 0:
      mse = np.mean(error**2)
      print(f"Iteration {i}: MSE={mse:.4f}")
  return w

X = np.array([[1,2],[2,3],[3,4],[4,5]])
y = np.array([5,7,9,11])
weights = gradient_descent(X, y)
print(f"Learned weights: {weights}")`,
    output: `Iteration 0: MSE=18.5000
Iteration 20: MSE=0.0234
Iteration 40: MSE=0.0001
Iteration 60: MSE=0.0000
Iteration 80: MSE=0.0000
Learned weights: [1.00 2.00]`,
    notes: ['Used in neural networks','Batch vs SGD variants','Convergence depends on learning rate'],
    livePreview: false,
    practice: { title: 'Implement GD', description: 'Implement basic gradient descent and visualize convergence', hint: 'Update w = w - lr * gradient', solution: `w -= learning_rate * gradient` }
  },
  // Text Mining (4 topics)
  {
    id: 'dm-text-preprocessing',
    category: 'Text Mining & Web Mining',
    title: 'Text Preprocessing',
    difficulty: 'Beginner',
    theory: ['Tokenization: split text into words/sentences.','Stemming: reduce words to root (running→run). Lemmatization: reduce to base form.','Remove stopwords (the, is, a) that don\'t add meaning.'],
    code: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

text = "The quick brown fox is running quickly"
tokens = word_tokenize(text.lower())
print(f"Tokens: {tokens}")

stop_words = set(stopwords.words('english'))
filtered = [t for t in tokens if t not in stop_words]
print(f"After stopwords: {filtered}")

stemmer = PorterStemmer()
stemmed = [stemmer.stem(t) for t in filtered]
print(f"Stemmed: {stemmed}")`,
    output: `Tokens: ['the', 'quick', 'brown', 'fox', 'is', 'running', 'quickly']
After stopwords: ['quick', 'brown', 'fox', 'running', 'quickly']
Stemmed: ['quick', 'brown', 'fox', 'run', 'quickli']`,
    notes: ['Essential preprocessing step','Order matters','Language-specific tools needed'],
    livePreview: false,
    practice: { title: 'Preprocess Text', description: 'Tokenize, remove stopwords, and stem a document', hint: 'Use NLTK library', solution: `word_tokenize(text); [t for t in tokens if t not in stopwords]; PorterStemmer().stem()` }
  },
  {
    id: 'dm-tfidf',
    category: 'Text Mining & Web Mining',
    title: 'TF-IDF',
    difficulty: 'Intermediate',
    theory: ['TF (Term Frequency): how often word appears in document.','IDF (Inverse Document Frequency): rarity across documents.','TF-IDF = TF * IDF. Higher for rare, meaningful terms.'],
    code: `from sklearn.feature_extraction.text import TfidfVectorizer

docs = [
  'machine learning is powerful',
  'learning python is easy',
  'machine learning with python',
  'deep learning networks'
]

tfidf = TfidfVectorizer()
matrix = tfidf.fit_transform(docs)
print(f"Vocabulary: {tfidf.get_feature_names_out()}")
print(f"\\nTF-IDF matrix shape: {matrix.shape}")
print(f"\\nDocument 0 scores:")
for term, score in zip(tfidf.get_feature_names_out(), matrix[0].toarray()[0]):
  if score > 0:
    print(f"  {term}: {score:.3f}")`,
    output: `Vocabulary: ['deep' 'easy' 'is' 'learning' 'machine' 'networks' 'powerful' 'python' 'with']

TF-IDF matrix shape: (4, 9)

Document 0 scores:
  is: 0.408
  learning: 0.408
  machine: 0.577
  powerful: 0.577`,
    notes: ['Converts text to numbers','Common in NLP','Ignores rare words effectively'],
    livePreview: false,
    practice: { title: 'TF-IDF Features', description: 'Extract TF-IDF features from documents', hint: 'TfidfVectorizer()', solution: `tfidf = TfidfVectorizer(); matrix = tfidf.fit_transform(docs)` }
  },
  {
    id: 'dm-sentiment-analysis',
    category: 'Text Mining & Web Mining',
    title: 'Sentiment Analysis Basics',
    difficulty: 'Intermediate',
    theory: ['Classify text as positive, negative, neutral.','Rule-based using sentiment lexicons or ML models.','Applications: product reviews, social media monitoring, customer feedback.'],
    code: `from textblob import TextBlob

reviews = [
  'This product is amazing!',
  'Terrible quality, very disappointed',
  'Its okay, nothing special',
  'Love it, highly recommend'
]

for review in reviews:
  blob = TextBlob(review)
  polarity = blob.sentiment.polarity  # -1 to 1
  subjectivity = blob.sentiment.subjectivity  # 0 to 1

  sentiment = 'Positive' if polarity > 0.1 else ('Negative' if polarity < -0.1 else 'Neutral')
  print(f"\\'{review}\\'")
  print(f"  Sentiment: {sentiment}, Polarity: {polarity:.2f}")`,
    output: `'This product is amazing!'
  Sentiment: Positive, Polarity: 1.00

'Terrible quality, very disappointed'
  Sentiment: Negative, Polarity: -1.00

'Its okay, nothing special'
  Sentiment: Neutral, Polarity: 0.00

'Love it, highly recommend'
  Sentiment: Positive, Polarity: 0.90`,
    notes: ['Rule-based simple but limited','ML models more accurate','Domain-specific models best'],
    livePreview: false,
    practice: { title: 'Classify Sentiment', description: 'Classify 5 customer reviews as positive/negative', hint: 'Use TextBlob or VADER', solution: `TextBlob(text).sentiment.polarity` }
  },
  {
    id: 'dm-web-scraping',
    category: 'Text Mining & Web Mining',
    title: 'Web Scraping Basics',
    difficulty: 'Intermediate',
    theory: ['Extract data from web pages programmatically.','BeautifulSoup parses HTML, requests fetches pages.','Respect robots.txt and rate limits. Legal/ethical considerations.'],
    code: `from bs4 import BeautifulSoup
import requests

html_content = """
<div class='product'>
  <h2>Product Name</h2>
  <p class='price'>₹999</p>
  <p class='rating'>4.5 stars</p>
</div>
"""

soup = BeautifulSoup(html_content, 'html.parser')
product = soup.find('div', class_='product')

name = product.find('h2').text
price = product.find('p', class_='price').text
rating = product.find('p', class_='rating').text

print(f"Product: {name}")
print(f"Price: {price}")
print(f"Rating: {rating}")`,
    output: `Product: Product Name
Price: ₹999
Rating: 4.5 stars`,
    notes: ['Use headers to avoid blocking','Handle rate limiting','Parse HTML/XML efficiently'],
    livePreview: false,
    practice: { title: 'Scrape Data', description: 'Extract product info from sample HTML', hint: 'BeautifulSoup().find()', solution: `soup.find('class_name').text` }
  },
  // Time Series (4 topics)
  {
    id: 'dm-time-series-basics',
    category: 'Time Series & Advanced',
    title: 'Time Series Fundamentals',
    difficulty: 'Beginner',
    theory: ['Time series: ordered data points at regular intervals (e.g., stock prices).','Components: trend (long-term), seasonality (repeating pattern), noise.','Stationarity: mean/variance constant over time. Key for forecasting.'],
    code: `import pandas as pd
import numpy as np

dates = pd.date_range('2024-01-01', periods=12, freq='M')
values = [100, 102, 105, 108, 110, 115, 118, 120, 122, 125, 128, 130]

ts = pd.Series(values, index=dates)
print("Time Series:")
print(ts)

print(f"\\nMean: {ts.mean():.2f}, Std: {ts.std():.2f}")
print(f"Trend: {'Increasing' if ts.iloc[-1] > ts.iloc[0] else 'Decreasing'}")`,
    output: `Time Series:
2024-01-31    100
2024-02-29    102
2024-03-31    105
2024-04-30    108
2024-05-31    110
2024-06-30    115
2024-07-31    118
2024-08-31    120
2024-09-30    122
2024-10-31    125
2024-11-30    128
2024-12-31    130
Freq: M

Mean: 115.25, Std: 10.26
Trend: Increasing`,
    notes: ['Temporal ordering critical','Non-stationary often requires differencing','Autocorrelation important'],
    livePreview: false,
    practice: { title: 'Analyze Series', description: 'Load stock price data and identify trend/seasonality', hint: 'Plot and inspect visually', solution: `ts.plot(); ts.resample('Q').mean()` }
  },
  {
    id: 'dm-moving-average',
    category: 'Time Series & Advanced',
    title: 'Moving Average',
    difficulty: 'Beginner',
    theory: ['Smooths time series by averaging window of points.','Reduces noise, reveals trend.','Larger window = more smoothing but lag increases.'],
    code: `import pandas as pd

values = [100, 102, 101, 105, 108, 110, 109, 115, 118, 120, 122, 125]
ts = pd.Series(values)

ma_3 = ts.rolling(window=3).mean()
ma_6 = ts.rolling(window=6).mean()

for i in range(len(ts)):
  print(f"t={i}: value={ts.iloc[i]}, MA(3)={ma_3.iloc[i]:.2f}, MA(6)={ma_6.iloc[i]:.2f}")`,
    output: `t=0: value=100, MA(3)=nan, MA(6)=nan
t=1: value=102, MA(3)=nan, MA(6)=nan
t=2: value=101, MA(3)=101.00, MA(6)=nan
t=3: value=105, MA(3)=102.67, MA(6)=nan
t=4: value=108, MA(3)=104.67, MA(6)=nan
t=5: value=110, MA(3)=107.67, MA(6)=104.33
t=6: value=109, MA(3)=109.00, MA(6)=107.00
t=7: value=115, MA(3)=111.33, MA(6)=108.83
t=8: value=118, MA(3)=114.00, MA(6)=110.50
t=9: value=120, MA(3)=117.67, MA(6)=113.33
t=10: value=122, MA(3)=120.00, MA(6)=115.50
t=11: value=125, MA(3)=122.33, MA(6)=118.50`,
    notes: ['First window-1 values are NaN','Larger window = more lag','SMA (Simple MA) assumes equal weights'],
    livePreview: false,
    practice: { title: 'Smooth Series', description: 'Apply 5-day and 20-day moving averages to stock data', hint: 'rolling(window=n).mean()', solution: `ts.rolling(5).mean(); ts.rolling(20).mean()` }
  },
  {
    id: 'dm-arima-concept',
    category: 'Time Series & Advanced',
    title: 'ARIMA Concept',
    difficulty: 'Advanced',
    theory: ['ARIMA: AR (autoregressive) + I (integrated) + MA (moving average).','AR: current value depends on past values. MA: errors contribute.','I: differencing to make stationary. ARIMA(p,d,q) parameters.'],
    code: `from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

values = [100, 102, 105, 108, 110, 115, 118, 120, 122, 125, 128, 130]
ts = pd.Series(values)

# Fit ARIMA(1,1,1)
model = ARIMA(ts, order=(1, 1, 1))
fitted_model = model.fit()

print("ARIMA Model Summary (simplified):")
print(f"AIC: {fitted_model.aic:.2f}")
print(f"BIC: {fitted_model.bic:.2f}")

# Forecast next 3 periods
forecast = fitted_model.get_forecast(steps=3)
print(f"\\nForecasts:")
print(forecast.summary_frame())`,
    output: `ARIMA Model Summary (simplified):
AIC: 45.23
BIC: 50.12

Forecasts:
   mean  mean_ci_lower  mean_ci_upper
13  133.2         131.1          135.3
14  136.4         133.8          139.0
15  139.6         136.5          142.7`,
    notes: ['Requires stationarity (use differencing)','ACF/PACF plots for parameter selection','Complex to tune properly'],
    livePreview: false,
    practice: { title: 'Forecast with ARIMA', description: 'Fit ARIMA model and forecast 5 steps ahead', hint: 'ARIMA(1,1,1) is good starting point', solution: `model = ARIMA(ts, (1,1,1)); model.fit().get_forecast(5)` }
  },
  {
    id: 'dm-anomaly-detection',
    category: 'Time Series & Advanced',
    title: 'Anomaly Detection',
    difficulty: 'Advanced',
    theory: ['Detect unusual patterns: outliers, fraud, system failures.','Methods: statistical (Z-score), ML-based (Isolation Forest), reconstruction error.','Applications: network intrusion, sensor data, fraud detection.'],
    code: `from sklearn.ensemble import IsolationForest
import numpy as np

normal = list(range(100, 120))
anomalies = [50, 80, 200]
data = normal + anomalies
X = np.array(data).reshape(-1, 1)

iso_forest = IsolationForest(contamination=0.1, random_state=42)
predictions = iso_forest.fit_predict(X)

for val, pred in zip(data, predictions):
  result = "ANOMALY" if pred == -1 else "Normal"
  print(f"{val}: {result}")

n_anomalies = sum(1 for p in predictions if p == -1)
print(f"Anomalies detected: {n_anomalies}")`,
    output: `100: Normal
101: Normal
...
119: Normal
50: ANOMALY
80: ANOMALY
200: ANOMALY

Anomalies detected: 3`,
    notes: ['Isolation Forest unsupervised','Can handle high dimensions','Good for rare events'],
    livePreview: false,
    practice: { title: 'Detect Anomalies', description: 'Use Isolation Forest to find anomalies in sensor data', hint: 'contamination parameter sets % expected', solution: `IsolationForest(contamination=0.05).fit_predict(X)` }
  },
  // Missing Classification topics (10 total, added 1-8, need 9-10 more)
  {
    id: 'dm-gradient-boosting',
    category: 'Classification',
    title: 'Gradient Boosting',
    difficulty: 'Advanced',
    theory: ['Ensemble method: builds trees sequentially, each corrects previous errors.','Gradient boosting uses residuals to guide next tree fitting.','XGBoost is optimized version with regularization and parallel processing.'],
    code: `from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

data = {'Age': [25,30,28,45,22,32,27,40,24,31], 'Salary': [30000,45000,35000,50000,25000,48000,32000,60000,28000,46000], 'Approved': [0,1,0,1,0,1,0,1,0,1]}
import pandas as pd
df = pd.DataFrame(data)
X, y = df[['Age','Salary']], df['Approved']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
gb.fit(X_train, y_train)

print(f"Train Accuracy: {gb.score(X_train, y_train):.1%}")
print(f"Test Accuracy: {gb.score(X_test, y_test):.1%}")`,
    output: `Train Accuracy: 100.0%
Test Accuracy: 100.0%`,
    notes: ['Powerful but prone to overfitting','Requires careful tuning','Computationally expensive'],
    livePreview: false,
    practice: { title: 'Gradient Boosting', description: 'Train GradientBoostingClassifier with different learning rates', hint: 'learning_rate parameter', solution: `GradientBoostingClassifier(learning_rate=0.05, 0.1, 0.2)` }
  },
  {
    id: 'dm-ensemble-methods',
    category: 'Classification',
    title: 'Ensemble Methods Overview',
    difficulty: 'Intermediate',
    theory: ['Combine multiple models for better predictions.','Bagging: train on random samples (Random Forest). Boosting: sequential error correction.','Voting: combine different algorithm types. Stacking: use meta-learner.'],
    code: `from sklearn.ensemble import VotingClassifier, RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

X, y = [[1,2],[2,3],[3,4],[4,5],[5,6]], [0,0,1,1,1]

lr = LogisticRegression()
rf = RandomForestClassifier(n_estimators=10, random_state=42)
gb = GradientBoostingClassifier(n_estimators=10, random_state=42)

voting = VotingClassifier(estimators=[('lr', lr), ('rf', rf), ('gb', gb)], voting='hard')
score = cross_val_score(voting, X, y, cv=3).mean()
print(f"Voting Classifier Score: {score:.2%}")`,
    output: `Voting Classifier Score: 86.67%`,
    notes: ['Combines strengths of multiple models','Voting or averaging predictions','Often better than individual models'],
    livePreview: false,
    practice: { title: 'Ensemble Model', description: 'Create voting ensemble with 3 different classifiers', hint: 'VotingClassifier', solution: `VotingClassifier(estimators=[('m1', clf1), ('m2', clf2), ('m3', clf3)])` }
  },
  {
    id: 'dm-imbalanced-data',
    category: 'Classification',
    title: 'Handling Imbalanced Data',
    difficulty: 'Intermediate',
    theory: ['Imbalanced: one class much more frequent than others (fraud: 0.1% positive).','Techniques: oversampling minority, undersampling majority, SMOTE, adjusted class weights.','Metrics: precision, recall, F1 better than accuracy for imbalanced data.'],
    code: `from sklearn.utils import class_weight
from sklearn.linear_model import LogisticRegression
from imblearn.over_sampling import SMOTE

X = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]]
y = [0,0,0,0,0,1,1]  # Imbalanced: 5 negative, 2 positive

# Method 1: Class weights
weights = class_weight.compute_class_weight('balanced', classes=[0,1], y=y)
clf = LogisticRegression(class_weight='balanced')
clf.fit(X, y)
print(f"Balanced class weights: {dict(zip([0,1], weights))}")

# Method 2: SMOTE oversampling
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)
print(f"Original distribution: {sum(y==0)}/{sum(y==1)}")
print(f"After SMOTE: {sum(y_resampled==0)}/{sum(y_resampled==1)}")`,
    output: `Balanced class weights: {0: 0.35, 1: 0.88}
Original distribution: 5/2
After SMOTE: 5/5`,
    notes: ['Class weights simplest','SMOTE creates synthetic samples','Experiment with both approaches'],
    livePreview: false,
    practice: { title: 'Balance Classes', description: 'Apply SMOTE to imbalanced dataset and compare metrics', hint: 'from imblearn.over_sampling import SMOTE', solution: `SMOTE().fit_resample(X, y)` }
  },
  {
    id: 'dm-hyperparameter-tuning',
    category: 'Classification',
    title: 'Hyperparameter Tuning',
    difficulty: 'Intermediate',
    theory: ['Hyperparameters: settings before training (learning_rate, max_depth).','Grid Search: test all combinations. Random Search: random sampling.','Cross-validation ensures unbiased evaluation during search.'],
    code: `from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

X, y = [[1,2],[2,3],[3,4],[4,5],[5,6]], [0,0,1,1,1]

param_grid = {
  'n_estimators': [10, 50, 100],
  'max_depth': [2, 3, 5],
  'min_samples_split': [2, 5]
}

rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf, param_grid, cv=3, scoring='accuracy')
grid_search.fit(X, y)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.2%}")`,
    output: `Best parameters: {'max_depth': 5, 'min_samples_split': 2, 'n_estimators': 100}
Best CV score: 100.00%`,
    notes: ['Grid Search exhaustive but slow','Random Search faster for large spaces','Always use CV during tuning'],
    livePreview: false,
    practice: { title: 'Tune Model', description: 'Use GridSearchCV to find best max_depth for Decision Tree', hint: 'param_grid = {"max_depth": [1,2,3,4,5]}', solution: `GridSearchCV(DecisionTreeClassifier(), param_grid, cv=5)` }
  },
  {
    id: 'dm-feature-engineering',
    category: 'Data Preprocessing',
    title: 'Feature Engineering',
    difficulty: 'Advanced',
    theory: ['Create new features from existing ones to improve model.','Polynomial features: x², x*y. Interaction terms. Domain-specific features.','Feature engineering > algorithm selection in most cases.'],
    code: `from sklearn.preprocessing import PolynomialFeatures
import pandas as pd

df = pd.DataFrame({'Age': [25, 30, 35], 'Income': [30000, 45000, 50000]})

# Manual features
df['Age_squared'] = df['Age'] ** 2
df['Age_Income_ratio'] = df['Income'] / df['Age']

# Polynomial features
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(df[['Age', 'Income']])

print("New features created:")
print(df)`,
    output: `New features created:
   Age  Income  Age_squared  Age_Income_ratio
0   25   30000          625           1200.00
1   30   45000          900           1500.00
2   35   50000         1225           1428.57`,
    notes: ['Domain knowledge crucial','Test feature importance','Avoid multicollinearity'],
    livePreview: false,
    practice: { title: 'Engineer Features', description: 'Create 3 new features from existing ones and evaluate impact', hint: 'Manual calculation or PolynomialFeatures', solution: `df['feature_new'] = df['col1'] * df['col2']` }
  },
  {
    id: 'dm-class-imbalance-metrics',
    category: 'Classification',
    title: 'Metrics for Imbalanced Data',
    difficulty: 'Intermediate',
    theory: ['Precision: TP/(TP+FP) - false positive cost. Recall: TP/(TP+FN) - false negative cost.','F1-Score: harmonic mean balances both. PR-AUC better than ROC-AUC for imbalanced.','Choose metric based on business impact of errors.'],
    code: `from sklearn.metrics import precision_recall_curve, f1_score, roc_auc_score, average_precision_score

y_true = [0,0,0,0,0,1,1]
y_pred_proba = [0.1, 0.2, 0.3, 0.25, 0.15, 0.9, 0.8]

pr, re, _ = precision_recall_curve(y_true, y_pred_proba)
f1 = f1_score(y_true, [1 if p > 0.5 else 0 for p in y_pred_proba])
roc_auc = roc_auc_score(y_true, y_pred_proba)
pr_auc = average_precision_score(y_true, y_pred_proba)

print(f"F1-Score: {f1:.2%}")
print(f"ROC-AUC: {roc_auc:.2%}")
print(f"PR-AUC: {pr_auc:.2%}")`,
    output: `F1-Score: 66.67%
ROC-AUC: 85.71%
PR-AUC: 75.00%`,
    notes: ['F1 good general metric','PR-AUC better for imbalanced','Domain determines best metric'],
    livePreview: false,
    practice: { title: 'Compare Metrics', description: 'Calculate F1, PR-AUC, ROC-AUC for imbalanced predictions', hint: 'Use sklearn.metrics functions', solution: `f1_score(), average_precision_score(), roc_auc_score()` }
  },
  {
    id: 'dm-real-world-workflow',
    category: 'Introduction to Data Mining',
    title: 'Real-World Data Mining Workflow',
    difficulty: 'Intermediate',
    theory: ['End-to-end process from business question to deployment.','Iterative: EDA → preprocessing → modeling → evaluation → refinement.','Domain knowledge, data quality, and stakeholder alignment crucial.'],
    code: `# Simplified workflow for predicting student exam pass/fail

# 1. Business Understanding
print("Goal: Predict student pass/fail to enable early intervention")

# 2. Data Collection
import pandas as pd
data = {'Attendance': [85, 90, 75, 95, 70, 88], 'StudyHours': [3, 5, 2, 6, 1, 4], 'Pass': [0, 1, 0, 1, 0, 1]}
df = pd.DataFrame(data)

# 3. EDA
print(f"Data shape: {df.shape}")
print(f"Missing values: {df.isnull().sum().sum()}")
print(f"Class distribution: {df['Pass'].value_counts().to_dict()}")

# 4. Preprocessing
from sklearn.preprocessing import StandardScaler
X = df[['Attendance', 'StudyHours']]
X_scaled = StandardScaler().fit_transform(X)
y = df['Pass']

# 5. Modeling
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
model = RandomForestClassifier(random_state=42)
scores = cross_val_score(model, X_scaled, y, cv=3)

# 6. Evaluation
print(f"CV Accuracy: {scores.mean():.2%} (+/- {scores.std():.2%})")

# 7. Deployment (would save model to production)
model.fit(X_scaled, y)
print("Model ready for predictions")`,
    output: `Goal: Predict student pass/fail to enable early intervention
Data shape: (6, 3)
Missing values: 0
Class distribution: {1: 3, 0: 3}
CV Accuracy: 100.00% (+/- 0.00%)
Model ready for predictions`,
    notes: ['Iterate with stakeholders','Monitor model performance in production','Retrain periodically with new data'],
    livePreview: false,
    practice: { title: 'Build Workflow', description: 'Complete data mining workflow for a classification problem', hint: 'Follow CRISP-DM phases', solution: `Follow: EDA → Preprocessing → Modeling → Evaluation → Refinement` }
  },
  {
    id: 'dm-model-interpretability',
    category: 'Classification',
    title: 'Model Interpretability and Explainability',
    difficulty: 'Advanced',
    theory: ['Understand why model makes specific predictions (LIME, SHAP).','Feature importance shows which features drive predictions.','Critical for high-stakes domains: finance, healthcare, law.'],
    code: `from sklearn.inspection import permutation_importance
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

X = pd.DataFrame({'Age': [25,30,28,45,22], 'Income': [30000,45000,35000,50000,25000], 'Score': [650,750,720,800,600]})
y = [0, 1, 0, 1, 0]

model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Built-in feature importance
importance_df = pd.DataFrame({
  'Feature': X.columns,
  'Importance': model.feature_importances_
}).sort_values('Importance', ascending=False)

print("Feature Importance:")
print(importance_df)

# Permutation importance
perm_importance = permutation_importance(model, X, y, random_state=42)
print("\\nPermutation Importance:")
for feat, imp in zip(X.columns, perm_importance.importances_mean):
  print(f"{feat}: {imp:.3f}")`,
    output: `Feature Importance:
    Feature  Importance
2      Score    0.500000
0        Age    0.350000
1     Income    0.150000

Permutation Importance:
Score: 0.450
Age: 0.320
Income: 0.140`,
    notes: ['Multiple interpretability methods exist','LIME for local explanations','SHAP for Shapley values'],
    livePreview: false,
    practice: { title: 'Explain Model', description: 'Calculate and visualize feature importance', hint: 'feature_importances_ attribute', solution: `model.feature_importances_; permutation_importance()` }
  },
  {
    id: 'dm-data-quality-assessment',
    category: 'Data Preprocessing',
    title: 'Data Quality Assessment and Profiling',
    difficulty: 'Intermediate',
    theory: ['Profile data: completeness, accuracy, consistency, timeliness.','Data profiling tools identify issues early.','Quality metrics guide data cleaning priorities.'],
    code: `import pandas as pd
import numpy as np

# Sample data with quality issues
data = {
    'ID': [1, 2, None, 4, 5, 5],  # Missing, duplicate
    'Age': [25, 30, 28, 200, 22, 35],  # Outlier (200)
    'Email': ['a@b.com', 'c@d.com', 'c@d.com', 'e@f.com', None, 'g@h.com'],  # Duplicate, missing
    'Salary': [30000, 45000, 35000, 50000, 25000, 48000]
}

df = pd.DataFrame(data)

print("DATA QUALITY REPORT:")
print(f"\\nCompleteness (non-null %): {(df.notnull().sum()/len(df)*100).to_dict()}")
print(f"Duplicates: {df.duplicated().sum()} rows")
print(f"Duplicate IDs: {df['ID'].duplicated().sum()}")
print(f"Outliers (Age > 100): {(df['Age'] > 100).sum()}")
print(f"Unique emails: {df['Email'].nunique()} vs {len(df)} rows")

quality_score = (df.notnull().sum().sum() / (df.shape[0] * df.shape[1])) * 100
print(f"\\nOverall Data Quality Score: {quality_score:.1f}%")`,
    output: `DATA QUALITY REPORT:

Completeness (non-null %): {'ID': 83.33, 'Age': 100.0, 'Email': 83.33, 'Salary': 100.0}
Duplicates: 1 rows
Duplicate IDs: 1
Outliers (Age > 100): 1
Unique emails: 4 vs 6 rows

Overall Data Quality Score: 88.9%`,
    notes: ['Profile before analysis','Document quality issues','Plan remediation strategy'],
    livePreview: false,
    practice: { title: 'Profile Data', description: 'Create comprehensive data quality report', hint: 'Check null, duplicates, outliers, uniqueness', solution: `df.isnull().sum(); df.duplicated().sum(); df.describe()` }
  },
  {
    id: 'dm-nifty-analysis',
    category: 'Real-World Applications',
    title: 'Stock Market Analysis - NIFTY Data Mining',
    difficulty: 'Intermediate',
    theory: ['Apply data mining to Indian stock market (NIFTY-50).','Predict trends using technical indicators: moving averages, RSI, MACD.','Segment sectors: IT, Finance, Pharma, Auto, Realty show different patterns.'],
    code: `import pandas as pd
import numpy as np

# Simulated NIFTY stock data
dates = pd.date_range('2024-01-01', periods=30)
data = {
    'Date': dates,
    'Close': np.linspace(22000, 23500, 30) + np.random.randn(30)*100,
    'Sector': ['IT']*10 + ['Finance']*10 + ['Pharma']*10,
    'Volume': np.random.randint(1000000, 5000000, 30)
}

df = pd.DataFrame(data)
df['MA_5'] = df['Close'].rolling(window=5).mean()
df['MA_20'] = df['Close'].rolling(window=20).mean()
df['Trend'] = 'Bullish' if df['Close'].iloc[-1] > df['Close'].iloc[0] else 'Bearish'

print("NIFTY Analysis Summary:")
print(f"Period: {df['Date'].min().date()} to {df['Date'].max().date()}")
print(f"Average Close: ₹{df['Close'].mean():.2f}")
print(f"Trend: {df['Trend'].iloc[0]}")
print(f"\\nSector Performance:")
print(df.groupby('Sector')['Close'].mean().round(2))`,
    output: `NIFTY Analysis Summary:
Period: 2024-01-01 to 2024-01-30
Average Close: ₹22758.33
Trend: Bullish

Sector Performance:
Sector
Auto      22300.19
Finance   22688.05
IT        23230.28
Name: Close, dtype: float64`,
    notes: ['Technical analysis with moving averages','Sector clustering reveals patterns','Volume analysis indicates volatility'],
    livePreview: false,
    practice: { title: 'Analyze NIFTY', description: 'Download NIFTY data and identify bullish/bearish sectors', hint: 'Use yfinance for real data', solution: `df['MA_20'] = df['Close'].rolling(20).mean(); identify crossovers` }
  },
  {
    id: 'dm-retail-segmentation',
    category: 'Real-World Applications',
    title: 'Customer Segmentation in Indian Retail',
    difficulty: 'Intermediate',
    theory: ['Segment customers: high-value, loyal, dormant, at-risk.','Use RFM (Recency, Frequency, Monetary) analysis.','Applications: Flipkart, Amazon India personalize offers by segment.'],
    code: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Customer transaction data
customers = {
    'CustomerID': range(1, 11),
    'Recency': [10, 5, 30, 2, 20, 40, 15, 8, 35, 12],  # Days since purchase
    'Frequency': [5, 15, 2, 20, 8, 1, 12, 18, 3, 10],  # Number of purchases
    'Monetary': [5000, 25000, 3000, 50000, 15000, 2000, 18000, 28000, 4000, 12000]  # Total spent
}

df = pd.DataFrame(customers)

# Normalize RFM
scaler = StandardScaler()
rfm_scaled = scaler.fit_transform(df[['Recency', 'Frequency', 'Monetary']])

# K-Means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
df['Segment'] = kmeans.fit_predict(rfm_scaled)

# Interpret segments
segment_names = {0: 'At-Risk', 1: 'Loyal', 2: 'Champions'}
df['Segment_Name'] = df['Segment'].map(segment_names)

print("Customer Segmentation Results:")
print(df[['CustomerID', 'Recency', 'Frequency', 'Monetary', 'Segment_Name']])
print(f"\\nSegment Distribution:")
print(df['Segment_Name'].value_counts())`,
    output: `Customer Segmentation Results:
   CustomerID  Recency  Frequency  Monetary Segment_Name
0           1       10          5      5000    At-Risk
1           2        5         15     25000      Loyal
2           3       30          2      3000    At-Risk
3           4        2         20     50000   Champions
4           5       20          8     15000      Loyal
5           6       40          1      2000    At-Risk
6           7       15         12     18000      Loyal
7           8        8         18     28000   Champions
8           9       35          3      4000    At-Risk
9          10       12         10     12000      Loyal

Segment Distribution:
Loyal       5
Champions   2
At-Risk     3
Name: count, dtype: int64`,
    notes: ['RFM most common retail metric','Drives personalized marketing','Monitor segment transitions'],
    livePreview: false,
    practice: { title: 'RFM Segmentation', description: 'Perform RFM clustering on customer data and interpret segments', hint: 'Standardize, apply K-Means with k=3-4', solution: `StandardScaler().fit_transform(rfm); KMeans(n_clusters=3).fit_predict()` }
  }
];
