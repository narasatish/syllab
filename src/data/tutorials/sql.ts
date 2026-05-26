import type { TutorialTopic } from './types';

export const sqlTopics: TutorialTopic[] = [
  {
    id: 'sql-intro',
    category: 'Getting Started',
    title: 'Introduction to SQL',
    difficulty: 'Beginner',
    theory: [
      `SQL (Structured Query Language) is the standard language for managing relational databases. It lets you create tables, insert data, query records, update values, and delete data. Every major company — banks, hospitals, e-commerce platforms — uses SQL.`,
      `A relational database stores data in tables (like spreadsheets) with rows and columns. A primary key uniquely identifies each row. Tables can be linked using foreign keys (relationships).`,
      `Major databases using SQL: MySQL (most popular, free), PostgreSQL (advanced, free), SQLite (embedded, used in Android/iOS), Microsoft SQL Server, Oracle. The SQL syntax is similar across all.`,
    ],
    syntax: `-- Comments in SQL use --
SELECT column FROM table;   -- read data
INSERT INTO table VALUES;   -- add data
UPDATE table SET col=val;   -- modify
DELETE FROM table;          -- remove`,
    code: `-- Creating a students table
CREATE TABLE students (
    id         INTEGER PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    class      INTEGER,
    marks      DECIMAL(5, 2),
    city       VARCHAR(30),
    stream     VARCHAR(20)
);

-- Inserting data
INSERT INTO students VALUES (1, 'Arjun Sharma', 11, 92.5, 'Delhi', 'Science');
INSERT INTO students VALUES (2, 'Priya Reddy', 12, 97.0, 'Hyderabad', 'Science');
INSERT INTO students VALUES (3, 'Rahul Kumar', 11, 78.3, 'Mumbai', 'Commerce');
INSERT INTO students VALUES (4, 'Kavya Singh', 12, 85.0, 'Chennai', 'Science');
INSERT INTO students VALUES (5, 'Amit Patel', 10, 91.5, 'Ahmedabad', 'NA');

-- Basic SELECT — get all columns, all rows
SELECT * FROM students;

-- Select specific columns
SELECT name, marks, city FROM students;

-- Rename columns with aliases
SELECT name AS "Student Name",
       marks AS "Percentage"
FROM students;`,
    output: `id | name          | class | marks | city
---+---------------+-------+-------+-----------
 1 | Arjun Sharma  |    11 | 92.50 | Delhi
 2 | Priya Reddy   |    12 | 97.00 | Hyderabad
 3 | Rahul Kumar   |    11 | 78.30 | Mumbai
 4 | Kavya Singh   |    12 | 85.00 | Chennai
 5 | Amit Patel    |    10 | 91.50 | Ahmedabad`,
    notes: [
      `SQL keywords are typically written in UPPERCASE (SELECT, FROM) by convention, though SQL is case-insensitive.`,
      `NOT NULL means the column must always have a value — you can't leave it empty.`,
      `PRIMARY KEY uniquely identifies each row. It auto-increments in most databases (no manual ID needed in real apps).`,
    ],
    practice: {
      title: 'Create a Books Table',
      description: `Write SQL to: (1) Create a table "books" with columns: id (int, primary key), title (varchar 100), author (varchar 50), price (decimal), genre (varchar 30). (2) Insert 4 books. (3) Select all books. (4) Select only title and author.`,
      startCode: `-- 1. Create the books table
CREATE TABLE books (
    id      INTEGER PRIMARY KEY,
    title   VARCHAR(100) NOT NULL,
    author  VARCHAR(50),
    price   DECIMAL(6,2),
    genre   VARCHAR(30)
);

-- 2. Insert 4 books
INSERT INTO books VALUES (1, 'The Alchemist', 'Paulo Coelho', 299.00, 'Fiction');
INSERT INTO books VALUES (2, 'Wings of Fire', 'APJ Abdul Kalam', 199.00, 'Biography');
-- Add 2 more books here...

-- 3. Select all books
SELECT * FROM books;

-- 4. Select only title and author
SELECT title, author FROM books;`,
      hint: `Use VARCHAR for text columns and DECIMAL(6,2) for prices (up to 9999.99).`,
    },
  },

  {
    id: 'sql-where',
    category: 'Querying Data',
    title: 'WHERE, AND, OR, NOT',
    difficulty: 'Beginner',
    theory: [
      `The WHERE clause filters rows that match a condition. Only matching rows are returned. Without WHERE, SELECT returns ALL rows.`,
      `Comparison operators: = (equal), != or <> (not equal), > (greater than), < (less than), >= (greater or equal), <= (less or equal). Combine conditions with AND, OR, NOT.`,
      `Special operators: IN (matches any value in a list), BETWEEN x AND y (range), LIKE '%pattern%' (text search, % = any characters, _ = one character), IS NULL / IS NOT NULL.`,
    ],
    syntax: `SELECT * FROM table
WHERE condition;

WHERE marks > 80
WHERE marks BETWEEN 70 AND 90
WHERE city IN ('Delhi', 'Mumbai')
WHERE name LIKE 'A%'   -- starts with A
WHERE name LIKE '%ar%' -- contains 'ar'`,
    code: `-- Assume students table from previous lesson

-- Filter by single condition
SELECT * FROM students WHERE class = 11;

-- Greater than
SELECT name, marks FROM students WHERE marks > 90;

-- BETWEEN (inclusive)
SELECT * FROM students WHERE marks BETWEEN 80 AND 95;

-- IN — match multiple values
SELECT * FROM students WHERE city IN ('Delhi', 'Mumbai', 'Chennai');

-- LIKE — text pattern matching
SELECT * FROM students WHERE name LIKE 'A%';    -- starts with A
SELECT * FROM students WHERE name LIKE '%ar%';  -- contains 'ar'
SELECT * FROM students WHERE city LIKE '_ Mumbai'; -- 1 char + 'umbai'... doesn't match

-- AND — both conditions must be true
SELECT * FROM students
WHERE class = 11 AND marks >= 85;

-- OR — either condition
SELECT * FROM students
WHERE city = 'Delhi' OR city = 'Hyderabad';

-- NOT — negate a condition
SELECT * FROM students
WHERE NOT stream = 'Commerce';

-- Combining multiple
SELECT name, marks, city FROM students
WHERE class = 12
  AND marks >= 80
  AND city NOT IN ('Mumbai', 'Kolkata')
ORDER BY marks DESC;`,
    output: `-- class = 11 results:
Arjun Sharma | 92.5 | Delhi
Rahul Kumar  | 78.3 | Mumbai

-- marks > 90:
Priya Reddy  | 97.0
Arjun Sharma | 92.5
Amit Patel   | 91.5

-- BETWEEN 80 AND 95:
Arjun Sharma | 92.5
Kavya Singh  | 85.0
Amit Patel   | 91.5`,
    notes: [
      `LIKE is case-insensitive in MySQL but case-sensitive in PostgreSQL. Use ILIKE in PostgreSQL for case-insensitive.`,
      `IS NULL and IS NOT NULL must be used to check for null values — you can't use = NULL.`,
      `AND has higher precedence than OR. Use parentheses: (a OR b) AND c to control order.`,
    ],
    practice: {
      title: 'Scholarship Eligibility Queries',
      description: `Write SQL queries to: (1) Find all students with marks above 90, (2) Find Class 11 students in Delhi or Hyderabad, (3) Find students with marks between 80-95 in the Science stream, (4) Find students whose names start with 'P'.`,
      startCode: `-- 1. All students with marks > 90
SELECT name, marks FROM students
WHERE marks > 90;

-- 2. Class 11 in Delhi or Hyderabad
SELECT * FROM students
WHERE class = 11
  AND city IN ('Delhi', 'Hyderabad');

-- 3. Marks 80-95 in Science stream
SELECT name, marks, stream FROM students
WHERE marks BETWEEN 80 AND 95
  AND stream = 'Science';

-- 4. Names starting with 'P'
SELECT * FROM students
WHERE name LIKE 'P%';`,
      hint: `BETWEEN x AND y is inclusive (includes x and y). IN ('A', 'B') matches either value.`,
    },
  },

  {
    id: 'sql-order-limit',
    category: 'Querying Data',
    title: 'ORDER BY, LIMIT & OFFSET',
    difficulty: 'Beginner',
    theory: [
      `ORDER BY sorts the result set by one or more columns. ASC (ascending, default: A→Z, 0→9) or DESC (descending: Z→A, 9→0). You can sort by multiple columns: first by one, then by another as a tie-breaker.`,
      `LIMIT restricts how many rows are returned — essential for performance when tables have millions of rows. OFFSET skips a number of rows — used for pagination (page 1, page 2, etc.).`,
      `These clauses go at the end of the query: SELECT → FROM → WHERE → ORDER BY → LIMIT → OFFSET.`,
    ],
    syntax: `SELECT * FROM table
ORDER BY column ASC;          -- sort ascending
ORDER BY column DESC;         -- sort descending
ORDER BY col1 ASC, col2 DESC; -- multi-column sort

LIMIT 10;         -- return at most 10 rows
LIMIT 10 OFFSET 20; -- skip 20, then get 10 (page 3)`,
    code: `-- Top 3 students by marks
SELECT name, marks
FROM students
ORDER BY marks DESC
LIMIT 3;

-- Bottom 3 (lowest marks first)
SELECT name, marks
FROM students
ORDER BY marks ASC
LIMIT 3;

-- Sort alphabetically by name
SELECT name, city
FROM students
ORDER BY name ASC;

-- Multiple column sort: sort by class, then by marks within class
SELECT class, name, marks
FROM students
ORDER BY class ASC, marks DESC;

-- Pagination example
-- Page 1: rows 1-5
SELECT * FROM students LIMIT 5 OFFSET 0;
-- Page 2: rows 6-10
SELECT * FROM students LIMIT 5 OFFSET 5;
-- Page 3: rows 11-15
SELECT * FROM students LIMIT 5 OFFSET 10;

-- Rank + Top N pattern
SELECT
    ROW_NUMBER() OVER (ORDER BY marks DESC) AS rank,
    name,
    marks
FROM students
ORDER BY marks DESC;`,
    output: `-- Top 3:
1. Priya Reddy  | 97.00
2. Arjun Sharma | 92.50
3. Amit Patel   | 91.50

-- Alphabetical:
Amit Patel
Arjun Sharma
Kavya Singh
Priya Reddy
Rahul Kumar`,
    notes: [
      `NULL values appear last in ASC order and first in DESC order in most databases.`,
      `LIMIT is MySQL/SQLite syntax. In SQL Server use TOP 3. In Oracle use ROWNUM < 4. In PostgreSQL LIMIT works too.`,
      `For web apps, always use LIMIT for performance — never SELECT * FROM large_table without a LIMIT.`,
    ],
    practice: {
      title: 'Leaderboard Query',
      description: `Write SQL to: (1) Show top 5 students by marks. (2) Show students sorted by class, then by marks within each class. (3) Implement pagination: show rows 6-10 (page 2, 5 per page).`,
      startCode: `-- 1. Top 5 students
SELECT name, class, marks
FROM students
ORDER BY marks DESC
LIMIT 5;

-- 2. By class, then by marks
SELECT class, name, marks
FROM students
ORDER BY class ASC, marks DESC;

-- 3. Page 2 (rows 6-10)
SELECT *
FROM students
ORDER BY id
LIMIT 5 OFFSET 5;`,
      hint: `OFFSET = (page_number - 1) * page_size. For page 2 with 5 per page: OFFSET = (2-1)*5 = 5`,
    },
  },

  {
    id: 'sql-aggregates',
    category: 'Querying Data',
    title: 'Aggregate Functions & GROUP BY',
    difficulty: 'Intermediate',
    theory: [
      `Aggregate functions perform calculations on a set of rows and return a single value. Key functions: COUNT() (count rows), SUM() (total), AVG() (average), MAX() (highest), MIN() (lowest).`,
      `GROUP BY divides rows into groups based on column values, then applies the aggregate function to each group. For example: average marks per class, count of students per city.`,
      `HAVING filters groups (like WHERE filters rows). Use HAVING to filter on aggregate results: HAVING AVG(marks) > 85.`,
    ],
    syntax: `SELECT COUNT(*) FROM students;
SELECT AVG(marks) FROM students;
SELECT MAX(marks), MIN(marks) FROM students;

SELECT class, AVG(marks)
FROM students
GROUP BY class
HAVING AVG(marks) > 80;`,
    code: `-- Basic aggregates
SELECT COUNT(*) AS total_students FROM students;
SELECT SUM(marks) AS total_marks FROM students;
SELECT AVG(marks) AS class_average FROM students;
SELECT MAX(marks) AS highest FROM students;
SELECT MIN(marks) AS lowest FROM students;

-- ROUND for cleaner output
SELECT ROUND(AVG(marks), 2) AS avg_marks FROM students;

-- COUNT with condition (count specific rows)
SELECT COUNT(*) AS topper_count
FROM students
WHERE marks >= 90;

-- GROUP BY — statistics per class
SELECT
    class,
    COUNT(*) AS student_count,
    ROUND(AVG(marks), 1) AS avg_marks,
    MAX(marks) AS highest,
    MIN(marks) AS lowest
FROM students
GROUP BY class
ORDER BY class;

-- GROUP BY city
SELECT
    city,
    COUNT(*) AS students,
    ROUND(AVG(marks), 1) AS avg
FROM students
GROUP BY city
ORDER BY avg DESC;

-- HAVING — filter groups (not individual rows!)
SELECT class, ROUND(AVG(marks), 1) AS avg_marks
FROM students
GROUP BY class
HAVING AVG(marks) > 85;

-- COUNT(DISTINCT ...) — count unique values
SELECT COUNT(DISTINCT city) AS unique_cities FROM students;`,
    output: `-- Basic:
total_students: 5
class_average: 88.86

-- GROUP BY class:
class | count | avg   | highest | lowest
   10 |     1 | 91.5  |   91.5  |  91.5
   11 |     2 | 85.4  |   92.5  |  78.3
   12 |     2 | 91.0  |   97.0  |  85.0`,
    notes: [
      `Every column in SELECT that is not an aggregate function must appear in GROUP BY.`,
      `WHERE filters before grouping. HAVING filters after grouping. This is why you can't use WHERE AVG(marks) > 80.`,
      `COUNT(*) counts all rows including NULLs. COUNT(column) skips NULLs in that column.`,
    ],
    practice: {
      title: 'Class Report Analysis',
      description: `Write SQL queries to: (1) Find total and average marks for each city. (2) Find the number of students in each stream. (3) Find classes where average marks is above 88. (4) Find the city with the highest average marks.`,
      startCode: `-- 1. Per city stats
SELECT city,
       COUNT(*) AS students,
       ROUND(AVG(marks), 1) AS avg_marks
FROM students
GROUP BY city
ORDER BY avg_marks DESC;

-- 2. Students per stream
SELECT stream, COUNT(*) AS count
FROM students
GROUP BY stream;

-- 3. Classes with avg > 88
SELECT class, ROUND(AVG(marks), 1) AS avg
FROM students
GROUP BY class
HAVING AVG(marks) > 88;

-- 4. City with highest average
SELECT city, ROUND(AVG(marks), 1) AS avg
FROM students
GROUP BY city
ORDER BY avg DESC
LIMIT 1;`,
      hint: `Use HAVING (not WHERE) to filter on aggregate results like AVG(marks).`,
    },
  },

  {
    id: 'sql-joins',
    category: 'Multi-Table Queries',
    title: 'JOINs',
    difficulty: 'Intermediate',
    theory: [
      `JOINs combine data from two or more tables based on a related column. This is the heart of relational databases. Instead of storing all info in one table, we split data into related tables (normalization) and JOIN when needed.`,
      `INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table + matched rows from right (NULL if no match). RIGHT JOIN is the opposite. FULL OUTER JOIN returns all rows from both tables.`,
      `The ON clause specifies which columns to join on — usually the primary key of one table matching the foreign key of another.`,
    ],
    syntax: `-- INNER JOIN (only matching rows)
SELECT a.col, b.col
FROM table_a a
INNER JOIN table_b b ON a.id = b.a_id;

-- LEFT JOIN (all from left, match from right)
SELECT a.col, b.col
FROM table_a a
LEFT JOIN table_b b ON a.id = b.a_id;`,
    code: `-- Setup: two related tables
CREATE TABLE teachers (
    id   INTEGER PRIMARY KEY,
    name VARCHAR(50),
    subject VARCHAR(30)
);

CREATE TABLE classes (
    id         INTEGER PRIMARY KEY,
    class_name VARCHAR(10),
    teacher_id INTEGER  -- foreign key → teachers.id
);

INSERT INTO teachers VALUES (1, 'Mrs. Sharma', 'Maths');
INSERT INTO teachers VALUES (2, 'Mr. Reddy', 'Physics');
INSERT INTO teachers VALUES (3, 'Ms. Pillai', 'Chemistry');
INSERT INTO teachers VALUES (4, 'Dr. Khan', 'Biology');

INSERT INTO classes VALUES (1, '11-A', 1);
INSERT INTO classes VALUES (2, '11-B', 2);
INSERT INTO classes VALUES (3, '12-A', 1);
INSERT INTO classes VALUES (4, '12-B', 3);
-- Note: No class assigned to Dr. Khan (id=4)

-- INNER JOIN — only classes that have a teacher
SELECT
    c.class_name,
    t.name AS teacher,
    t.subject
FROM classes c
INNER JOIN teachers t ON c.teacher_id = t.id;

-- LEFT JOIN — all classes (+ NULL if no teacher)
SELECT
    c.class_name,
    t.name AS teacher
FROM classes c
LEFT JOIN teachers t ON c.teacher_id = t.id;

-- Show all teachers even if unassigned (RIGHT JOIN)
SELECT
    t.name AS teacher,
    t.subject,
    c.class_name
FROM classes c
RIGHT JOIN teachers t ON c.teacher_id = t.id;

-- JOIN with WHERE and ORDER BY
SELECT
    c.class_name,
    t.name AS teacher,
    t.subject
FROM classes c
INNER JOIN teachers t ON c.teacher_id = t.id
WHERE t.subject IN ('Maths', 'Physics')
ORDER BY c.class_name;`,
    output: `-- INNER JOIN result:
class_name | teacher      | subject
-----------+--------------+---------
11-A       | Mrs. Sharma  | Maths
11-B       | Mr. Reddy    | Physics
12-A       | Mrs. Sharma  | Maths
12-B       | Ms. Pillai   | Chemistry

-- RIGHT JOIN (includes unassigned Dr. Khan):
teacher     | subject   | class_name
------------+-----------+-----------
Mrs. Sharma | Maths     | 11-A
Mr. Reddy   | Physics   | 11-B
Mrs. Sharma | Maths     | 12-A
Ms. Pillai  | Chemistry | 12-B
Dr. Khan    | Biology   | NULL      ← no class assigned`,
    notes: [
      `Use table aliases (c, t) to shorten queries: classes c means "call the classes table 'c'".`,
      `INNER JOIN is most common. Use LEFT JOIN when you want all records from the main table even if there's no match.`,
      `JOINs can chain: FROM a JOIN b ON ... JOIN c ON ... to combine 3 or more tables.`,
    ],
    practice: {
      title: 'Orders & Products Join',
      description: `Create two tables: products (id, name, price) and orders (id, product_id, quantity, customer). Insert sample data. Write INNER JOIN to show each order with product name and total cost (price × quantity). Use LEFT JOIN to show all products even unordered ones.`,
      startCode: `CREATE TABLE products (
    id    INTEGER PRIMARY KEY,
    name  VARCHAR(50),
    price DECIMAL(8,2)
);

CREATE TABLE orders (
    id         INTEGER PRIMARY KEY,
    product_id INTEGER,
    quantity   INTEGER,
    customer   VARCHAR(50)
);

INSERT INTO products VALUES (1, 'Python Book', 499.00);
INSERT INTO products VALUES (2, 'Scientific Calculator', 350.00);
INSERT INTO products VALUES (3, 'Graph Paper Set', 45.00);
INSERT INTO products VALUES (4, 'Drawing Kit', 299.00);

INSERT INTO orders VALUES (1, 1, 2, 'Arjun');
INSERT INTO orders VALUES (2, 2, 1, 'Priya');
INSERT INTO orders VALUES (3, 1, 1, 'Rahul');
INSERT INTO orders VALUES (4, 3, 5, 'Kavya');
-- product 4 (Drawing Kit) has no orders

-- Show each order with product name and total cost
SELECT
    o.id AS order_id,
    o.customer,
    p.name AS product,
    o.quantity,
    p.price,
    (p.price * o.quantity) AS total_cost
FROM orders o
INNER JOIN products p ON o.product_id = p.id;

-- All products including unordered
SELECT
    p.name AS product,
    p.price,
    COALESCE(o.customer, 'No orders yet') AS customer
FROM products p
LEFT JOIN orders o ON p.id = o.product_id;`,
      hint: `COALESCE(value, 'default') returns 'default' when value is NULL — useful for LEFT JOIN results.`,
    },
  },

  {
    id: 'sql-modify',
    category: 'Modifying Data',
    title: 'INSERT, UPDATE & DELETE',
    difficulty: 'Beginner',
    theory: [
      `INSERT INTO adds new rows to a table. You can insert a single row or multiple rows at once. Always list the column names explicitly to avoid issues if the table structure changes.`,
      `UPDATE modifies existing rows. The WHERE clause specifies which rows to update. WARNING: UPDATE without WHERE updates ALL rows — always check your WHERE clause first!`,
      `DELETE removes rows. Like UPDATE, always include WHERE or you'll delete everything. In production, it's good practice to do a SELECT first with the same WHERE to verify what would be deleted.`,
    ],
    syntax: `-- INSERT
INSERT INTO table (col1, col2) VALUES (val1, val2);

-- UPDATE (ALWAYS add WHERE!)
UPDATE table SET col = value WHERE condition;

-- DELETE (ALWAYS add WHERE!)
DELETE FROM table WHERE condition;`,
    code: `-- INSERT: explicit column names (best practice)
INSERT INTO students (id, name, class, marks, city, stream)
VALUES (6, 'Deepa Nair', 12, 88.5, 'Kochi', 'Science');

-- INSERT multiple rows at once
INSERT INTO students (id, name, class, marks, city, stream) VALUES
    (7, 'Vikram Joshi', 11, 76.0, 'Pune', 'Commerce'),
    (8, 'Sana Khan', 10, 93.5, 'Lucknow', 'NA'),
    (9, 'Aditya Rao', 12, 79.0, 'Bangalore', 'Science');

-- Verify insert
SELECT * FROM students WHERE id >= 6;

-- UPDATE: change one value
UPDATE students
SET marks = 90.0
WHERE id = 7;

-- UPDATE: change multiple columns
UPDATE students
SET class = 12, stream = 'Science'
WHERE id = 8;

-- UPDATE with calculation
UPDATE students
SET marks = marks + 2.0   -- add 2 grace marks to all
WHERE class = 11;

-- Safe UPDATE pattern: SELECT first!
SELECT * FROM students WHERE city = 'Kochi';  -- check first
UPDATE students SET city = 'Thiruvananthapuram' WHERE city = 'Kochi';

-- DELETE specific rows
DELETE FROM students WHERE id = 9;

-- DELETE with condition
DELETE FROM students WHERE marks < 75 AND class = 11;

-- DELETE all rows (BE CAREFUL! Table structure remains)
-- DELETE FROM students;   -- DO NOT run accidentally!

-- DROP TABLE (removes the table itself)
-- DROP TABLE students;    -- even more permanent!

-- Final state
SELECT * FROM students ORDER BY id;`,
    output: `-- After all operations:
id | name          | class | marks | city
 1 | Arjun Sharma  |    11 | 94.5  | Delhi        ← +2 grace marks
 2 | Priya Reddy   |    12 | 97.00 | Hyderabad
 3 | Rahul Kumar   |    11 | 80.3  | Mumbai       ← +2 grace marks
 4 | Kavya Singh   |    12 | 85.00 | Chennai
 5 | Amit Patel    |    10 | 91.50 | Ahmedabad
 6 | Deepa Nair    |    12 | 88.50 | Thiruvananthapuram  ← city updated
 7 | Vikram Joshi  |    11 | 90.00 | Pune         ← marks updated, +2
 8 | Sana Khan     |    12 | 93.50 | Lucknow      ← class+stream updated`,
    notes: [
      `NEVER run UPDATE or DELETE in production without a WHERE clause. Add a database transaction rollback safeguard.`,
      `TRUNCATE TABLE removes all rows faster than DELETE (no row-by-row logging) but can't be rolled back in most DBs.`,
      `Use soft deletes in real apps: add a is_deleted BOOLEAN column and UPDATE it instead of actually deleting.`,
    ],
    practice: {
      title: 'Inventory Management',
      description: `Create a products table (id, name, stock, price). Insert 5 products. Then: update the price of one product, add 50 to stock of products where stock < 10, delete a product that's discontinued. Show table at each step.`,
      startCode: `CREATE TABLE products (
    id    INTEGER PRIMARY KEY,
    name  VARCHAR(50) NOT NULL,
    stock INTEGER DEFAULT 0,
    price DECIMAL(8,2)
);

INSERT INTO products VALUES
    (1, 'NCERT Maths Book', 25, 199.00),
    (2, 'Science Kit', 8, 450.00),
    (3, 'Calculator', 3, 350.00),
    (4, 'Compass Set', 15, 75.00),
    (5, 'Old Textbook', 0, 50.00);

SELECT * FROM products;

-- Update price of Calculator
UPDATE products SET price = 320.00 WHERE id = 3;

-- Restock items with low stock (< 10)
UPDATE products SET stock = stock + 50 WHERE stock < 10;

-- Delete the old textbook (discontinued)
DELETE FROM products WHERE id = 5;

SELECT * FROM products ORDER BY id;`,
      hint: `UPDATE products SET stock = stock + 50 adds 50 to the current stock value. The WHERE filters which products to update.`,
    },
  },

  // ─── GROUP BY ────────────────────────────────────────────────────────────────
  {
    id: 'sql-groupby',
    category: 'Aggregation',
    title: 'GROUP BY — Grouping Data for Analysis',
    difficulty: 'Intermediate',
    theory: [
      `GROUP BY groups rows that have the same value in one or more columns, then applies aggregate functions (COUNT, SUM, AVG, MAX, MIN) to each group separately. This is the foundation of data analysis in SQL.`,
      `Example: Instead of the average marks of ALL students, GROUP BY city gives the average marks of students FROM EACH CITY. Instead of total sales, GROUP BY product gives total sales PER PRODUCT.`,
      `Rule: Any column in the SELECT that is NOT an aggregate function MUST appear in the GROUP BY clause. This is one of the most common SQL mistakes beginners make.`,
    ],
    syntax: `SELECT column, AGG_FUNCTION(column)
FROM table
GROUP BY column;

-- Example:
SELECT city, COUNT(*) AS student_count, AVG(marks) AS avg_marks
FROM students
GROUP BY city;`,
    code: `-- GROUP BY examples

-- Setup
CREATE TABLE students (
  id INT, name VARCHAR(50), city VARCHAR(50),
  subject VARCHAR(50), marks INT
);

INSERT INTO students VALUES
  (1, 'Arjun', 'Delhi', 'Science', 85),
  (2, 'Priya', 'Mumbai', 'Maths', 72),
  (3, 'Rahul', 'Delhi', 'Science', 58),
  (4, 'Sneha', 'Hyderabad', 'Maths', 95),
  (5, 'Vikram', 'Mumbai', 'Science', 63),
  (6, 'Anjali', 'Delhi', 'Commerce', 88),
  (7, 'Deepa', 'Hyderabad', 'Science', 91);

-- Count students per city
SELECT city, COUNT(*) AS student_count
FROM students
GROUP BY city
ORDER BY student_count DESC;

-- Average marks per subject
SELECT subject,
       COUNT(*) AS students,
       AVG(marks) AS avg_marks,
       MAX(marks) AS highest,
       MIN(marks) AS lowest
FROM students
GROUP BY subject
ORDER BY avg_marks DESC;`,
    output: `-- Count per city:
city        | student_count
------------|---------------
Delhi       | 3
Hyderabad   | 2
Mumbai      | 2

-- Per subject:
subject   | students | avg_marks | highest | lowest
----------|----------|-----------|---------|-------
Maths     | 2        | 83.5      | 95      | 72
Science   | 4        | 74.25     | 91      | 58
Commerce  | 1        | 88.0      | 88      | 88`,
    notes: [
      `SELECT city, name, COUNT(*) FROM students GROUP BY city — THIS IS WRONG. "name" is not an aggregate and not in GROUP BY.`,
      `GROUP BY is the SQL equivalent of Pandas groupby() — both produce the same analytical result.`,
      `CBSE Class 12 database chapter includes GROUP BY — understanding it conceptually and being able to write correct queries is key to exam success.`,
    ],
    practice: {
      title: 'IPL Team Analysis',
      description: `Write SQL to analyse IPL match data. Find: (1) total runs scored by each team, (2) average runs per match by team, (3) number of matches played by each team, (4) which team has the highest average.`,
      startCode: `-- IPL matches data
CREATE TABLE ipl_matches (
  id INT, team VARCHAR(30), opponent VARCHAR(30), runs_scored INT
);

INSERT INTO ipl_matches VALUES
  (1, 'Mumbai', 'Chennai', 185),
  (2, 'Chennai', 'Mumbai', 162),
  (3, 'Delhi', 'Bangalore', 178),
  (4, 'Bangalore', 'Delhi', 192),
  (5, 'Mumbai', 'Hyderabad', 201),
  (6, 'Hyderabad', 'Mumbai', 168),
  (7, 'Chennai', 'Delhi', 175),
  (8, 'Mumbai', 'Bangalore', 190);

-- 1. Total runs by team
SELECT team, SUM(runs_scored) AS total_runs
FROM ipl_matches
GROUP BY team
ORDER BY total_runs DESC;

-- 2. Average runs and match count
-- YOUR SQL HERE
SELECT team,
       COUNT(*) AS matches,
       ROUND(AVG(runs_scored), 1) AS avg_runs,
       MAX(runs_scored) AS highest_score
FROM ipl_matches
GROUP BY team
ORDER BY avg_runs DESC;`,
      hint: `COUNT(*) gives number of rows per group. ROUND(AVG(runs_scored), 1) rounds to 1 decimal. Use ORDER BY avg_runs DESC to find the best team.`,
    },
  },

  // ─── HAVING ──────────────────────────────────────────────────────────────────
  {
    id: 'sql-having',
    category: 'Aggregation',
    title: 'HAVING — Filtering Grouped Results',
    difficulty: 'Intermediate',
    theory: [
      `HAVING filters the results of GROUP BY. The key difference: WHERE filters individual rows BEFORE grouping, HAVING filters GROUPS AFTER aggregation.`,
      `Analogy: WHERE = "only include students with marks > 60". HAVING = "only show cities where the AVERAGE marks > 70". You can't use WHERE for the second condition because you need the group's average to already be calculated.`,
      `Rule: WHERE cannot use aggregate functions (AVG, COUNT, SUM). HAVING can. If you want to filter on an aggregate, you MUST use HAVING.`,
    ],
    syntax: `-- WHERE vs HAVING:

-- WHERE: filter rows BEFORE grouping
SELECT city, AVG(marks) FROM students
WHERE marks > 40       -- filters individual students first
GROUP BY city;

-- HAVING: filter GROUPS after aggregation
SELECT city, AVG(marks) FROM students
GROUP BY city
HAVING AVG(marks) > 70;  -- filters cities by their average`,
    code: `-- HAVING examples

CREATE TABLE sales (
  id INT, city VARCHAR(30), product VARCHAR(30),
  amount DECIMAL(10,2), month INT
);

INSERT INTO sales VALUES
  (1, 'Delhi', 'Laptop', 85000, 1),
  (2, 'Mumbai', 'Phone', 25000, 1),
  (3, 'Delhi', 'Phone', 22000, 1),
  (4, 'Bangalore', 'Laptop', 92000, 1),
  (5, 'Mumbai', 'Laptop', 78000, 2),
  (6, 'Delhi', 'Laptop', 90000, 2),
  (7, 'Hyderabad', 'Phone', 18000, 2),
  (8, 'Bangalore', 'Phone', 28000, 2);

-- Cities with more than 2 sales (HAVING with COUNT)
SELECT city, COUNT(*) AS sale_count, SUM(amount) AS total
FROM sales
GROUP BY city
HAVING COUNT(*) > 2
ORDER BY total DESC;

-- Cities with average sale > 50000 (HAVING with AVG)
SELECT city, COUNT(*) AS sales, AVG(amount) AS avg_sale
FROM sales
GROUP BY city
HAVING AVG(amount) > 50000
ORDER BY avg_sale DESC;

-- Products sold more than once AND total > 100000
SELECT product, COUNT(*) AS times_sold, SUM(amount) AS total_revenue
FROM sales
GROUP BY product
HAVING COUNT(*) > 1 AND SUM(amount) > 100000;`,
    output: `-- Cities with > 2 sales:
city        | sale_count | total
------------|------------|--------
Delhi       | 3          | 197000
Bangalore   | 2          | 120000

-- Cities with avg sale > 50000:
city        | sales | avg_sale
------------|-------|----------
Bangalore   | 2     | 60000
Delhi       | 3     | 65667
Mumbai      | 2     | 51500`,
    notes: [
      `Remember: WHERE → rows (before GROUP BY), HAVING → groups (after GROUP BY). Both can appear in the same query.`,
      `Order of clauses in a SELECT: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. Always in this order!`,
      `CBSE exam often asks you to add a HAVING clause to an existing GROUP BY query — make sure you know exactly when to use HAVING vs WHERE.`,
    ],
    practice: {
      title: 'School Department Report',
      description: `From a teacher_salary table, find: (1) departments with more than 2 teachers, (2) departments where average salary > 60000, (3) departments where total salary bill > 200000 AND teacher count > 3.`,
      startCode: `CREATE TABLE teacher_salary (
  id INT, name VARCHAR(50), department VARCHAR(30), salary INT
);
INSERT INTO teacher_salary VALUES
  (1, 'Sharma', 'Maths', 65000),
  (2, 'Rao', 'Science', 72000),
  (3, 'Patel', 'Maths', 58000),
  (4, 'Iyer', 'Science', 68000),
  (5, 'Singh', 'English', 55000),
  (6, 'Kumar', 'Maths', 62000),
  (7, 'Reddy', 'Science', 75000),
  (8, 'Nair', 'English', 60000),
  (9, 'Gupta', 'Maths', 70000);

-- 1. Departments with more than 2 teachers
SELECT department, COUNT(*) AS teacher_count
FROM teacher_salary
GROUP BY department
HAVING COUNT(*) > 2
ORDER BY teacher_count DESC;

-- 2. Average salary > 60000
-- YOUR SQL HERE

-- 3. Total salary > 200000 AND count > 3
-- YOUR SQL HERE`,
      hint: `For (2): HAVING AVG(salary) > 60000. For (3): HAVING SUM(salary) > 200000 AND COUNT(*) > 3`,
    },
  },

  // ─── Subqueries ──────────────────────────────────────────────────────────────
  {
    id: 'sql-subqueries',
    category: 'Advanced SQL',
    title: 'Subqueries — Queries Inside Queries',
    difficulty: 'Advanced',
    theory: [
      `A subquery (also called a nested query or inner query) is a SQL query written inside another query. The inner query runs first, and its result is used by the outer query.`,
      `Subqueries can appear in: WHERE (most common — "find students who scored above the class average"), FROM (treat a query result as a table), SELECT (calculate a value for each row).`,
      `Correlated subquery: The inner query references a column from the outer query — it runs once for each row of the outer query. These can be slow but are very powerful.`,
    ],
    syntax: `-- Subquery in WHERE (most common):
SELECT name, marks FROM students
WHERE marks > (SELECT AVG(marks) FROM students);

-- Subquery in FROM (derived table):
SELECT * FROM (
  SELECT city, AVG(marks) AS avg_marks FROM students GROUP BY city
) AS city_stats
WHERE avg_marks > 70;`,
    code: `-- Subquery examples

CREATE TABLE students (
  id INT, name VARCHAR(50), city VARCHAR(30), marks INT, class_num INT
);

INSERT INTO students VALUES
  (1, 'Arjun', 'Delhi', 85, 10),
  (2, 'Priya', 'Mumbai', 72, 10),
  (3, 'Rahul', 'Delhi', 58, 11),
  (4, 'Sneha', 'Hyderabad', 95, 10),
  (5, 'Vikram', 'Mumbai', 63, 11),
  (6, 'Anjali', 'Delhi', 88, 11),
  (7, 'Deepa', 'Hyderabad', 91, 10),
  (8, 'Kiran', 'Chennai', 77, 11);

-- 1. Students scoring above class average
SELECT name, marks
FROM students
WHERE marks > (SELECT AVG(marks) FROM students)
ORDER BY marks DESC;

-- 2. Students from the highest-average city
SELECT name, city, marks
FROM students
WHERE city = (
  SELECT city FROM students
  GROUP BY city
  ORDER BY AVG(marks) DESC
  LIMIT 1
);

-- 3. Rank within each class (correlated subquery)
SELECT s1.name, s1.class_num, s1.marks,
  (SELECT COUNT(*) FROM students s2
   WHERE s2.class_num = s1.class_num AND s2.marks >= s1.marks) AS class_rank
FROM students s1
ORDER BY s1.class_num, class_rank;`,
    output: `-- Above class average (avg=78.6):
name   | marks
-------|-------
Sneha  | 95
Deepa  | 91
Anjali | 88
Arjun  | 85

-- Students from best city (Hyderabad avg=93):
name  | city      | marks
------|-----------|-------
Sneha | Hyderabad | 95
Deepa | Hyderabad | 91

-- Class ranks:
name   | class_num | marks | class_rank
-------|-----------|-------|----------
Sneha  | 10        | 95    | 1
Deepa  | 10        | 91    | 2
Arjun  | 10        | 85    | 3
Priya  | 10        | 72    | 4
Anjali | 11        | 88    | 1
...`,
    notes: [
      `Subqueries that return a single value (scalar subquery) can be used with =, >, <, >=, <=. Subqueries returning multiple values use IN or EXISTS.`,
      `Where possible, use JOINs instead of subqueries — JOINs are usually faster. But subqueries are often more readable.`,
      `Correlated subqueries (where inner query references outer query) run once per row — can be slow on large tables. Modern databases optimise them, but be careful.`,
    ],
    practice: {
      title: 'Second Highest Marks',
      description: `Using a subquery, find the student with the second-highest marks. Also write a query to find all students who scored the same as the top scorer (handles ties for first place).`,
      startCode: `CREATE TABLE class_marks (
  id INT, name VARCHAR(50), marks INT
);
INSERT INTO class_marks VALUES
  (1, 'Arjun', 85), (2, 'Priya', 92), (3, 'Rahul', 78),
  (4, 'Sneha', 92), (5, 'Vikram', 65), (6, 'Anjali', 88);

-- Find second highest marks (using subquery)
SELECT name, marks FROM class_marks
WHERE marks = (
  SELECT MAX(marks) FROM class_marks
  WHERE marks < (SELECT MAX(marks) FROM class_marks)
);

-- Find all students tied for first place
SELECT name, marks FROM class_marks
WHERE marks = (SELECT MAX(marks) FROM class_marks)
ORDER BY name;

-- YOUR CHALLENGE: Find all students NOT from the top city
-- (Hint: use a subquery to find the top city first, then NOT IN or != )`,
      hint: `For second highest: the inner WHERE marks < (SELECT MAX...) excludes the highest. The outer MAX then finds the next highest.`,
    },
  },

  // ─── CREATE TABLE & Constraints ──────────────────────────────────────────────
  {
    id: 'sql-ddl',
    category: 'Database Design',
    title: 'CREATE TABLE, Primary Key & Constraints',
    difficulty: 'Intermediate',
    theory: [
      `DDL (Data Definition Language) is the SQL commands that define the structure of a database: CREATE TABLE, ALTER TABLE, DROP TABLE. Understanding DDL is essential for designing databases from scratch.`,
      `Constraints: Rules that enforce data integrity. PRIMARY KEY: uniquely identifies each row, cannot be NULL or duplicate. NOT NULL: column must always have a value. UNIQUE: no duplicates allowed (but can be NULL). DEFAULT: value used if none is specified. CHECK: value must meet a condition. FOREIGN KEY: links to another table's primary key.`,
      `Good database design uses constraints to prevent bad data from entering the database — better to reject bad input at the database level than to deal with corrupted data later.`,
    ],
    syntax: `CREATE TABLE table_name (
  column1 datatype CONSTRAINT,
  column2 datatype CONSTRAINT,
  PRIMARY KEY (column1),
  FOREIGN KEY (column2) REFERENCES other_table(pk)
);

-- Data types: INT, VARCHAR(n), DECIMAL(p,s),
-- DATE, BOOLEAN, TEXT`,
    code: `-- Creating a well-designed school database

-- 1. Classes table
CREATE TABLE classes (
  class_id INT PRIMARY KEY,
  class_name VARCHAR(10) NOT NULL UNIQUE,   -- "Class 10A"
  teacher_name VARCHAR(100) NOT NULL,
  max_students INT DEFAULT 40 CHECK (max_students > 0)
);

-- 2. Students table (with foreign key to classes)
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  email VARCHAR(100) UNIQUE,
  class_id INT NOT NULL,
  marks INT DEFAULT 0 CHECK (marks >= 0 AND marks <= 100),
  FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

-- Insert data
INSERT INTO classes VALUES
  (1, 'Class 10A', 'Mrs. Sharma', 40),
  (2, 'Class 11B', 'Mr. Rao', 35),
  (3, 'Class 12C', 'Ms. Iyer', 30);

INSERT INTO students VALUES
  (101, 'Arjun Kumar', '2009-05-15', 'arjun@school.in', 1, 85),
  (102, 'Priya Singh', '2008-11-20', 'priya@school.in', 2, 72),
  (103, 'Sneha Reddy', '2007-03-08', 'sneha@school.in', 3, 96);

-- View with JOIN
SELECT s.name, s.marks, c.class_name, c.teacher_name
FROM students s
JOIN classes c ON s.class_id = c.class_id
ORDER BY s.marks DESC;

-- What happens if we try to violate constraints?
-- INSERT INTO students VALUES (104, 'Test', NULL, 'arjun@school.in', 1, 85);
-- ERROR: Duplicate email! UNIQUE constraint violated
-- INSERT INTO students VALUES (105, 'Test2', NULL, NULL, 99, 85);
-- ERROR: class_id=99 doesn't exist! FOREIGN KEY violated`,
    output: `-- After INSERT:
name        | marks | class_name | teacher_name
------------|-------|------------|-------------
Sneha Reddy | 96    | Class 12C  | Ms. Iyer
Arjun Kumar | 85    | Class 10A  | Mrs. Sharma
Priya Singh | 72    | Class 11B  | Mr. Rao

-- Constraints prevent:
-- Duplicate student IDs (PRIMARY KEY)
-- Negative marks (CHECK marks >= 0)
-- Marks > 100 (CHECK marks <= 100)
-- Orphaned records (FOREIGN KEY)`,
    notes: [
      `CBSE Class 12 database design questions often ask you to: identify primary keys, identify foreign keys, write CREATE TABLE with constraints, and explain why each constraint is needed.`,
      `Referential integrity: FOREIGN KEY ensures you can't have a student in a class that doesn't exist. The database enforces this automatically.`,
      `Naming conventions: Primary keys often end in _id (student_id, class_id). Foreign keys reference the primary key they link to.`,
    ],
    practice: {
      title: 'Design a Library Database',
      description: `Design a library management database with 3 tables: books (book_id, title, author, isbn, year, copies_available), members (member_id, name, email, phone, join_date), and borrowings (borrow_id, book_id, member_id, borrow_date, return_date). Add appropriate constraints to each table.`,
      startCode: `-- Design the library database with proper constraints

CREATE TABLE books (
  book_id INT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(13) UNIQUE,           -- International Standard Book Number
  year INT CHECK (year >= 1800 AND year <= 2030),
  copies_available INT DEFAULT 1 CHECK (copies_available >= 0)
);

CREATE TABLE members (
  member_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  -- YOUR CODE: add phone (VARCHAR 15), join_date (DATE with DEFAULT CURRENT_DATE)
  phone VARCHAR(15),
  join_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE borrowings (
  borrow_id INT PRIMARY KEY,
  -- YOUR CODE: add book_id and member_id as FOREIGN KEYS
  -- add borrow_date (DATE, NOT NULL)
  -- add return_date (DATE, can be NULL — null means not returned yet)
  book_id INT NOT NULL,
  member_id INT NOT NULL,
  borrow_date DATE NOT NULL,
  return_date DATE,
  FOREIGN KEY (book_id) REFERENCES books(book_id),
  FOREIGN KEY (member_id) REFERENCES members(member_id)
);

-- Insert test data
INSERT INTO books VALUES (1, 'Wings of Fire', 'APJ Abdul Kalam', '9788173711466', 1999, 5);
INSERT INTO members VALUES (1, 'Arjun', 'arjun@email.com', '9876543210', '2026-01-15');
INSERT INTO borrowings VALUES (1, 1, 1, '2026-05-01', NULL);  -- NULL = still borrowed

-- Show all current borrowings
SELECT b.title, m.name, bw.borrow_date, bw.return_date
FROM borrowings bw
JOIN books b ON bw.book_id = b.book_id
JOIN members m ON bw.member_id = m.member_id
WHERE bw.return_date IS NULL;  -- Currently borrowed`,
      hint: `FOREIGN KEY (book_id) REFERENCES books(book_id) creates a foreign key link. NULL return_date means the book hasn't been returned yet — use IS NULL to find these.`,
    },
  },

  // ─── CASE Expression ─────────────────────────────────────────────────────────
  {
    id: 'sql-case',
    category: 'Advanced SQL',
    title: 'CASE Expression — Conditional Logic in SQL',
    difficulty: 'Intermediate',
    theory: [
      `The CASE expression adds if/else logic to SQL queries. It lets you transform or categorise data on the fly without needing to create a separate column or table.`,
      `CASE WHEN condition THEN result ELSE default END is the general form. You can have multiple WHEN clauses. The ELSE is optional (returns NULL if no WHEN matches and ELSE is absent).`,
      `Use CASE for: Grade assignment (85+ = A, 70+ = B, etc.), Categorising products by price range, Converting codes to labels (1='Male', 2='Female'), Custom sorting orders, Computing different values based on conditions.`,
    ],
    syntax: `-- Simple CASE (like switch):
CASE column
  WHEN value1 THEN result1
  WHEN value2 THEN result2
  ELSE default_result
END

-- Searched CASE (like if/elif/else):
CASE
  WHEN marks >= 90 THEN 'A+'
  WHEN marks >= 80 THEN 'A'
  WHEN marks >= 40 THEN 'Pass'
  ELSE 'Fail'
END`,
    code: `-- CASE expression examples

CREATE TABLE exam_results (
  id INT, student VARCHAR(50), marks INT, subject VARCHAR(30)
);
INSERT INTO exam_results VALUES
  (1,'Arjun', 92, 'Maths'), (2,'Priya', 74, 'Maths'),
  (3,'Rahul', 45, 'Science'), (4,'Sneha', 98, 'Science'),
  (5,'Vikram', 38, 'Maths'), (6,'Anjali', 85, 'Science');

-- 1. Assign grades using CASE
SELECT student, marks, subject,
  CASE
    WHEN marks >= 90 THEN 'A+ (Outstanding)'
    WHEN marks >= 80 THEN 'A (Excellent)'
    WHEN marks >= 70 THEN 'B (Very Good)'
    WHEN marks >= 60 THEN 'C (Good)'
    WHEN marks >= 40 THEN 'D (Pass)'
    ELSE 'F (Fail)'
  END AS grade,
  CASE WHEN marks >= 40 THEN 'PASS' ELSE 'FAIL' END AS status
FROM exam_results
ORDER BY marks DESC;

-- 2. Count students by grade category
SELECT
  SUM(CASE WHEN marks >= 90 THEN 1 ELSE 0 END) AS grade_A_plus,
  SUM(CASE WHEN marks >= 80 AND marks < 90 THEN 1 ELSE 0 END) AS grade_A,
  SUM(CASE WHEN marks >= 40 AND marks < 80 THEN 1 ELSE 0 END) AS grade_B_to_D,
  SUM(CASE WHEN marks < 40 THEN 1 ELSE 0 END) AS grade_F
FROM exam_results;`,
    output: `-- Query 1:
student | marks | subject | grade              | status
--------|-------|---------|--------------------|---------
Sneha   | 98    | Science | A+ (Outstanding)   | PASS
Arjun   | 92    | Maths   | A+ (Outstanding)   | PASS
Anjali  | 85    | Science | A (Excellent)      | PASS
Priya   | 74    | Maths   | B (Very Good)      | PASS
Rahul   | 45    | Science | D (Pass)           | PASS
Vikram  | 38    | Maths   | F (Fail)           | FAIL

-- Query 2:
grade_A_plus | grade_A | grade_B_to_D | grade_F
-------------|---------|--------------|--------
2            | 1       | 2            | 1`,
    notes: [
      `CASE can be used in SELECT, ORDER BY, GROUP BY, and HAVING — making it one of the most versatile SQL tools.`,
      `Conditional aggregation (using CASE inside SUM/COUNT) is extremely powerful for creating pivot-style reports.`,
      `CBSE DB questions sometimes ask for conditional queries — CASE is perfect for: "Display grade based on marks" type questions.`,
    ],
    practice: {
      title: 'Product Pricing Tiers',
      description: `Add a "pricing_tier" column to the results using CASE: "Budget" (price < 500), "Mid-range" (500-2000), "Premium" (2001-10000), "Luxury" (> 10000). Also count how many products fall in each tier.`,
      startCode: `CREATE TABLE products (
  id INT, name VARCHAR(50), category VARCHAR(30), price DECIMAL(10,2)
);
INSERT INTO products VALUES
  (1, 'Pencil', 'Stationery', 10),
  (2, 'Calculator', 'Stationery', 450),
  (3, 'Textbook', 'Books', 350),
  (4, 'Tablet', 'Electronics', 15000),
  (5, 'Phone', 'Electronics', 8000),
  (6, 'Laptop', 'Electronics', 45000),
  (7, 'Headphones', 'Electronics', 1800),
  (8, 'Notebook Pack', 'Stationery', 120);

-- Show products with pricing tier
SELECT name, price,
  CASE
    WHEN price < 500 THEN 'Budget'
    WHEN price <= 2000 THEN 'Mid-range'
    WHEN price <= 10000 THEN 'Premium'
    ELSE 'Luxury'
  END AS pricing_tier
FROM products
ORDER BY price;

-- Count per tier
-- YOUR SQL: Use conditional aggregation with SUM(CASE WHEN... THEN 1 ELSE 0 END)
SELECT
  SUM(CASE WHEN price < 500 THEN 1 ELSE 0 END) AS budget_count,
  -- Add Mid-range, Premium, Luxury counts
  SUM(CASE WHEN price > 10000 THEN 1 ELSE 0 END) AS luxury_count
FROM products;`,
      hint: `SUM(CASE WHEN price BETWEEN 500 AND 2000 THEN 1 ELSE 0 END) AS midrange_count`,
    },
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'sql-views',
    category: 'Database Design',
    title: 'Views',
    difficulty: 'Intermediate',
    theory: [
      'A VIEW is a saved SQL query that behaves like a virtual table. You can SELECT from a view just like a real table, but the data is not stored — it is re-computed from the underlying tables each time.',
      'Views simplify complex queries: instead of repeating a long JOIN every time, create a view once and query the view with a simple SELECT.',
      'Views also improve security: expose only certain columns to users without giving them access to the full table.',
      'CREATE VIEW view_name AS SELECT ...; Use DROP VIEW view_name; to remove it. CREATE OR REPLACE VIEW updates an existing view.',
    ],
    syntax: `-- Create a view
CREATE VIEW view_name AS
  SELECT col1, col2, ...
  FROM table
  WHERE condition;

-- Use the view like a table
SELECT * FROM view_name WHERE ...;

-- Drop a view
DROP VIEW view_name;`,
    code: `-- Create a students table
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  class INT,
  marks INT,
  subject VARCHAR(30)
);

INSERT INTO students VALUES
(1,'Priya',10,92,'Maths'),(2,'Rahul',10,78,'Maths'),
(3,'Sneha',11,85,'Science'),(4,'Arun',10,55,'Maths'),
(5,'Bhavna',11,91,'Science'),(6,'Chetan',11,67,'Science');

-- View: Only passing students (marks >= 60)
CREATE VIEW passing_students AS
  SELECT name, class, marks, subject
  FROM students
  WHERE marks >= 60;

-- View: Class-wise average (using aggregation)
CREATE VIEW class_averages AS
  SELECT class, subject, AVG(marks) AS avg_marks, COUNT(*) AS student_count
  FROM students
  GROUP BY class, subject;

-- Use the views
SELECT * FROM passing_students ORDER BY marks DESC;

SELECT * FROM class_averages;

-- Query a view with additional filters
SELECT name, marks FROM passing_students WHERE marks >= 85;`,
    output: `-- passing_students:
Priya | 10 | 92 | Maths
Bhavna | 11 | 91 | Science
Sneha | 11 | 85 | Science
Rahul | 10 | 78 | Maths
Chetan | 11 | 67 | Science

-- class_averages:
10 | Maths   | 75.0 | 3
11 | Science | 81.0 | 3`,
    notes: [
      'Views do not store data — they re-run the query each time',
      'Updatable views (simple views without GROUP BY, DISTINCT) allow INSERT/UPDATE through the view',
      'Indexed/materialized views (in PostgreSQL/SQL Server) cache the result for performance',
    ],
    practice: {
      title: 'Employee Views',
      description: `Given an employees table:
CREATE TABLE employees (id, name, department, salary, years_exp);

Create these views:
1. senior_employees — employees with years_exp >= 5
2. dept_summary — department, avg_salary, max_salary, employee_count
3. high_earners — name, department, salary for salary > 50000

Then query: all senior employees in Engineering, ordered by salary desc.`,
      startCode: `CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  department VARCHAR(30),
  salary DECIMAL(10,2),
  years_exp INT
);
INSERT INTO employees VALUES
(1,'Alice','Engineering',75000,7),(2,'Bob','Marketing',45000,3),
(3,'Carol','Engineering',85000,10),(4,'Dave','HR',40000,2),
(5,'Eve','Engineering',92000,12),(6,'Frank','Marketing',52000,6);

-- Create your 3 views here

-- Then query senior employees in Engineering`,
      hint: `CREATE VIEW senior_employees AS SELECT * FROM employees WHERE years_exp >= 5;`,
    },
  },

  {
    id: 'sql-indexes',
    category: 'Database Design',
    title: 'Indexes & Performance',
    difficulty: 'Intermediate',
    theory: [
      'An index is a data structure that speeds up SELECT queries at the cost of slightly slower INSERT/UPDATE/DELETE and extra storage. Think of it like the index at the back of a textbook — you find the page without reading every page.',
      'CREATE INDEX creates a non-unique index. CREATE UNIQUE INDEX ensures no duplicate values. The PRIMARY KEY automatically creates a unique index.',
      'B-tree indexes (default) work for =, <, >, BETWEEN, LIKE "abc%" queries. They don\'t help for LIKE "%abc" (leading wildcard).',
      'Use EXPLAIN (MySQL) or EXPLAIN ANALYZE (PostgreSQL) to see if your query is using an index or doing a full table scan.',
    ],
    syntax: `-- Create index on one column
CREATE INDEX idx_name ON table(column);

-- Composite index (multiple columns)
CREATE INDEX idx_name ON table(col1, col2);

-- Unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Drop index
DROP INDEX idx_name ON table;  -- MySQL
DROP INDEX idx_name;           -- PostgreSQL

-- Check query plan
EXPLAIN SELECT * FROM table WHERE column = value;`,
    code: `-- Without index: full table scan (slow on large tables)
-- With index: direct lookup (fast)

CREATE TABLE orders (
  id INT PRIMARY KEY,         -- auto-indexed (PK)
  customer_id INT,
  product VARCHAR(50),
  amount DECIMAL(10,2),
  order_date DATE,
  status VARCHAR(20)
);

-- Add sample data
INSERT INTO orders VALUES
(1,101,'Laptop',45000,'2025-01-15','delivered'),
(2,102,'Phone',25000,'2025-01-20','pending'),
(3,101,'Tablet',15000,'2025-02-01','delivered'),
(4,103,'Laptop',45000,'2025-02-10','shipped'),
(5,102,'Book',350,'2025-02-15','delivered');

-- Index for frequent customer lookups
CREATE INDEX idx_customer ON orders(customer_id);

-- Composite index for status + date queries
CREATE INDEX idx_status_date ON orders(status, order_date);

-- Unique index for business rule
-- CREATE UNIQUE INDEX idx_daily_customer ON orders(customer_id, order_date);

-- These queries now use indexes:
SELECT * FROM orders WHERE customer_id = 101;
SELECT * FROM orders WHERE status = 'delivered' ORDER BY order_date;

-- Check how MySQL plans a query:
EXPLAIN SELECT * FROM orders WHERE customer_id = 101;`,
    output: `-- customer_id=101 orders:
1 | 101 | Laptop | 45000 | 2025-01-15 | delivered
3 | 101 | Tablet | 15000 | 2025-02-01 | delivered

-- EXPLAIN output shows:
-- key: idx_customer (index is being used!)
-- rows: 2 (only scanned 2 rows, not all 5)`,
    notes: [
      'Index columns you frequently use in WHERE, JOIN ON, ORDER BY',
      'Too many indexes slow down write operations — index strategically',
      'Composite index (a,b) helps WHERE a=? and WHERE a=? AND b=? but NOT WHERE b=? alone',
    ],
    practice: {
      title: 'Product Search Optimisation',
      description: `Given a products table with 1 million rows (simulated):
CREATE TABLE products (id, name, category, price, brand, rating);

1. Create an index to speed up: WHERE category = 'Electronics'
2. Create a composite index for: WHERE category = 'Electronics' AND price < 10000
3. Create a unique index on: name, brand (no duplicate product names per brand)
4. Write the EXPLAIN for: SELECT * FROM products WHERE category='Electronics' AND price < 5000 ORDER BY rating DESC

Explain in comments which queries each index helps with.`,
      startCode: `CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price DECIMAL(10,2),
  brand VARCHAR(50),
  rating DECIMAL(3,1)
);

-- Create your indexes here with comments explaining each one

-- Index 1: Single column for category lookups

-- Index 2: Composite for category + price range

-- Index 3: Unique constraint on name + brand

-- EXPLAIN the optimised query:`,
      hint: `CREATE INDEX idx_category ON products(category); CREATE INDEX idx_cat_price ON products(category, price);`,
    },
  },

  {
    id: 'sql-transactions',
    category: 'Database Design',
    title: 'Transactions & ACID',
    difficulty: 'Intermediate',
    theory: [
      'A transaction is a sequence of SQL operations that must ALL succeed or ALL fail together. If any step fails, the entire transaction is rolled back — the database returns to its previous state.',
      'ACID properties: Atomicity (all or nothing), Consistency (data remains valid), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes).',
      'Transaction commands: BEGIN (start), COMMIT (save all changes), ROLLBACK (undo all changes since BEGIN). SAVEPOINT creates a checkpoint within a transaction.',
      'Real-world example: bank transfer — debit account A and credit account B must BOTH succeed. If the credit fails after the debit, we ROLLBACK to prevent money disappearing.',
    ],
    syntax: `BEGIN;  -- or START TRANSACTION

  UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
  UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

COMMIT;   -- save both changes

-- If error occurs:
ROLLBACK;  -- undo everything since BEGIN

-- Savepoint
SAVEPOINT my_save;
ROLLBACK TO my_save;`,
    code: `-- Bank transfer simulation

CREATE TABLE accounts (
  id INT PRIMARY KEY,
  owner VARCHAR(50),
  balance DECIMAL(10,2)
);

INSERT INTO accounts VALUES (1,'Priya',10000), (2,'Rahul',5000);

-- Show initial balances
SELECT id, owner, balance FROM accounts;

-- SUCCESSFUL transfer: ₹2000 from Priya to Rahul
BEGIN;
  UPDATE accounts SET balance = balance - 2000 WHERE id = 1;
  UPDATE accounts SET balance = balance + 2000 WHERE id = 2;
COMMIT;

SELECT id, owner, balance FROM accounts;

-- FAILED transfer: try to overdraft (simulated rollback)
BEGIN;
  UPDATE accounts SET balance = balance - 50000 WHERE id = 2;
  -- Check: if balance went negative, roll back!
  -- In application code: if balance < 0 then ROLLBACK
ROLLBACK;  -- Simulating rollback

-- Balances unchanged after rollback:
SELECT id, owner, balance FROM accounts;`,
    output: `-- Initial:
1 | Priya | 10000.00
2 | Rahul |  5000.00

-- After successful transfer:
1 | Priya |  8000.00
2 | Rahul |  7000.00

-- After rollback (unchanged):
1 | Priya |  8000.00
2 | Rahul |  7000.00`,
    notes: [
      'Without transactions, a crash between two related UPDATEs would corrupt your data',
      'InnoDB (MySQL default engine) supports full ACID transactions. MyISAM does not.',
      'Nested transactions use SAVEPOINT for partial rollbacks',
    ],
    practice: {
      title: 'Order Processing Transaction',
      description: `Write a transaction that processes an order:
1. Decrease product stock by order quantity
2. Insert a new order record
3. Update customer's total_orders count

If stock < order_quantity, ROLLBACK (don't place the order).

Tables: products(id, name, stock), orders(id, customer_id, product_id, qty), customers(id, name, total_orders)`,
      startCode: `CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(50), stock INT);
CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, product_id INT, qty INT);
CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(50), total_orders INT DEFAULT 0);

INSERT INTO products VALUES (1,'Laptop',3);
INSERT INTO customers VALUES (1,'Priya',0);

-- Write your transaction here
-- Order: customer 1 wants 2 laptops (product 1)
BEGIN;
  -- Step 1: Check and decrease stock

  -- Step 2: Insert the order

  -- Step 3: Update customer total_orders
COMMIT;

-- Show final state
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM customers;`,
      hint: `UPDATE products SET stock = stock - 2 WHERE id = 1 AND stock >= 2; Check row count after — if 0 rows affected, ROLLBACK.`,
    },
  },

  {
    id: 'sql-string-functions',
    category: 'SQL Functions',
    title: 'String Functions',
    difficulty: 'Intermediate',
    theory: [
      'SQL provides built-in functions to manipulate text: UPPER(), LOWER(), LENGTH(), TRIM(), SUBSTRING(), REPLACE(), CONCAT(), LIKE with wildcards.',
      'CONCAT(str1, str2) joins strings. CONCAT_WS(sep, str1, str2) joins with a separator. In some databases, || is the concatenation operator.',
      'SUBSTRING(str, start, length) extracts a portion. CHAR_LENGTH() counts characters. POSITION() or INSTR() finds the position of a substring.',
      'LIKE uses wildcards: % means any sequence of characters, _ means exactly one character. ILIKE (PostgreSQL) is case-insensitive LIKE.',
    ],
    syntax: `SELECT UPPER('hello')             -- 'HELLO'
SELECT LOWER('WORLD')             -- 'world'
SELECT LENGTH('Syllab')           -- 6
SELECT TRIM('  hello  ')          -- 'hello'
SELECT SUBSTRING('Hello',1,3)     -- 'Hel'
SELECT REPLACE('Hi World','World','India')  -- 'Hi India'
SELECT CONCAT('Hello',' ','World')  -- 'Hello World'
SELECT name LIKE '%kumar%'        -- matches 'raj kumar', 'kumarbabu'`,
    code: `CREATE TABLE students (
  id INT, name VARCHAR(100), email VARCHAR(100), city VARCHAR(50)
);
INSERT INTO students VALUES
(1,'Priya Sharma','priya.sharma@gmail.com','Mumbai'),
(2,'rahul kumar','rahul.k@yahoo.com','delhi'),
(3,'SNEHA PATEL','sneha@outlook.com','Ahmedabad'),
(4,'Arun Singh','arun.singh@school.in','Jaipur'),
(5,'Bhavna Rao','bhavna@gmail.com','Hyderabad');

-- 1. Standardise name capitalisation
SELECT id,
  CONCAT(
    UPPER(SUBSTRING(name, 1, 1)),
    LOWER(SUBSTRING(name, 2))
  ) AS formatted_name
FROM students;

-- 2. Extract username from email
SELECT name,
  SUBSTRING(email, 1, POSITION('@' IN email) - 1) AS username
FROM students;

-- 3. Search names containing 'kumar' or 'rao' (case-insensitive)
SELECT name, city
FROM students
WHERE LOWER(name) LIKE '%kumar%' OR LOWER(name) LIKE '%rao%';

-- 4. Format full display string
SELECT CONCAT(UPPER(name), ' (', city, ') → ', email) AS display
FROM students;

-- 5. Find names with exactly 10 characters
SELECT name, CHAR_LENGTH(name) AS len
FROM students
WHERE CHAR_LENGTH(name) = 10;`,
    output: `-- Formatted names:
Priya sharma | Rahul kumar | Sneha patel | Arun singh | Bhavna rao

-- Usernames:
priya.sharma | rahul.k | sneha | arun.singh | bhavna

-- kumar or rao matches:
rahul kumar | delhi
Bhavna Rao  | Hyderabad`,
    notes: [
      'Always use LOWER() when doing case-insensitive searches: WHERE LOWER(name) LIKE ...',
      'MySQL: SUBSTRING(str, pos, len). PostgreSQL: SUBSTR or SUBSTRING(str FROM pos FOR len)',
      'TRIM removes spaces by default. LTRIM/RTRIM for left/right only.',
    ],
    practice: {
      title: 'Data Cleaning with String Functions',
      description: `You have a messy contacts table. Clean and format the data:
1. Standardise phone numbers: remove spaces, dashes, +91 prefix → 10 digits
2. Capitalise first letter of each word in name
3. Extract domain from email (part after @)
4. Find all contacts from gmail.com

contacts: id, name, phone, email
Data: ('  priya sharma  ', '+91 98765-43210', 'PRIYA@GMAIL.COM')`,
      startCode: `CREATE TABLE contacts (id INT, name VARCHAR(100), phone VARCHAR(30), email VARCHAR(100));
INSERT INTO contacts VALUES
(1,'  priya sharma  ','+91 98765-43210','PRIYA@GMAIL.COM'),
(2,'RAHUL KUMAR','98-765-43211','rahul@yahoo.com'),
(3,' sneha patel','9876543212','SNEHA@GMAIL.COM');

-- 1. Clean phone: remove +91, spaces, dashes
SELECT id,
  REPLACE(REPLACE(REPLACE(REPLACE(phone,' ',''),'-',''),'+91',''),'91','') AS clean_phone
FROM contacts;

-- 2. Lowercase email
SELECT id, LOWER(email) AS clean_email FROM contacts;

-- 3. Extract domain (part after @)
SELECT id, SUBSTRING(LOWER(email), POSITION('@' IN email) + 1) AS domain
FROM contacts;

-- 4. Find gmail users
SELECT id, TRIM(name) AS name FROM contacts
WHERE LOWER(email) LIKE '%@gmail.com';`,
      hint: `Use REPLACE() to remove unwanted characters. POSITION('@' IN email) gives the position of @. TRIM() removes leading/trailing spaces.`,
    },
  },

  {
    id: 'sql-date-functions',
    category: 'SQL Functions',
    title: 'Date & Time Functions',
    difficulty: 'Intermediate',
    theory: [
      'SQL has rich date/time functions: NOW() returns current timestamp, CURDATE() returns today\'s date, YEAR/MONTH/DAY() extract parts, DATEDIFF() computes difference in days.',
      'DATE_ADD(date, INTERVAL n unit) adds time: DATE_ADD(NOW(), INTERVAL 7 DAY) = one week from now. DATE_SUB subtracts.',
      'DATE_FORMAT(date, format) formats dates: DATE_FORMAT(order_date, "%d %M %Y") → "15 January 2025".',
      'Filtering by date: WHERE order_date >= "2025-01-01" AND order_date < "2026-01-01" selects all 2025 orders. Use BETWEEN for inclusive ranges.',
    ],
    syntax: `SELECT NOW()                        -- current timestamp
SELECT CURDATE()                    -- today's date
SELECT YEAR(date_col)               -- extract year
SELECT DATEDIFF(end_date, start_date)  -- days between
SELECT DATE_ADD(date, INTERVAL 30 DAY)
SELECT DATE_FORMAT(date, '%d %M %Y')  -- "15 January 2025"
SELECT TIMESTAMPDIFF(YEAR, dob, NOW()) AS age`,
    code: `CREATE TABLE students (
  id INT, name VARCHAR(50), dob DATE, enrolled_date DATE
);
INSERT INTO students VALUES
(1,'Priya','2009-03-15','2024-06-01'),
(2,'Rahul','2008-11-22','2023-04-15'),
(3,'Sneha','2010-07-08','2024-06-01'),
(4,'Arun','2009-01-30','2022-07-20');

-- 1. Calculate current age
SELECT name,
  dob,
  TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age
FROM students;

-- 2. Days since enrollment
SELECT name,
  enrolled_date,
  DATEDIFF(CURDATE(), enrolled_date) AS days_enrolled
FROM students
ORDER BY days_enrolled DESC;

-- 3. Format date nicely
SELECT name,
  DATE_FORMAT(dob, '%d %M %Y') AS birthday,
  DATE_FORMAT(enrolled_date, '%b %Y') AS joined
FROM students;

-- 4. Students who enrolled this year
SELECT name, enrolled_date
FROM students
WHERE YEAR(enrolled_date) = YEAR(CURDATE());

-- 5. Upcoming birthday this month
SELECT name, DAY(dob) AS birthday_day
FROM students
WHERE MONTH(dob) = MONTH(CURDATE())
ORDER BY DAY(dob);`,
    output: `-- Ages (as of 2025):
Priya  | 2009-03-15 | 16
Rahul  | 2008-11-22 | 16
Sneha  | 2010-07-08 | 15
Arun   | 2009-01-30 | 16

-- Days enrolled (approximate):
Arun   | 2022-07-20 | 1000+ days
Rahul  | 2023-04-15 | 600+ days
Priya  | 2024-06-01 | 300+ days`,
    notes: [
      'Store dates as DATE, DATETIME, or TIMESTAMP — never as VARCHAR',
      'TIMESTAMPDIFF(YEAR, dob, CURDATE()) is the correct way to calculate age',
      'All date comparisons work with "YYYY-MM-DD" string format in SQL',
    ],
    practice: {
      title: 'Order Analytics by Date',
      description: `Write queries on an orders table:
CREATE TABLE orders (id, customer_name, amount, order_date DATETIME, delivery_date DATE);

1. Find all orders placed in the last 30 days
2. Calculate average delivery time in days for each customer
3. Find orders where delivery took more than 7 days
4. Show monthly total revenue for 2025 (GROUP BY month)
5. Format: "Order #5 placed on 15 Jan 2025"`,
      startCode: `CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_name VARCHAR(50),
  amount DECIMAL(10,2),
  order_date DATETIME,
  delivery_date DATE
);
INSERT INTO orders VALUES
(1,'Priya',1500,'2025-01-10 10:30:00','2025-01-13'),
(2,'Rahul',3200,'2025-01-20 14:00:00','2025-01-25'),
(3,'Sneha',850,'2025-02-05 09:15:00','2025-02-07'),
(4,'Priya',5600,'2025-02-18 16:45:00','2025-02-28'),
(5,'Arun',2100,'2025-03-01 11:00:00','2025-03-05');

-- 1. Last 30 days orders (use CURDATE())

-- 2. Avg delivery time per customer

-- 3. Orders with delivery > 7 days

-- 4. Monthly revenue for 2025

-- 5. Formatted order string`,
      hint: `WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY). DATEDIFF(delivery_date, DATE(order_date)) for delivery days. GROUP BY MONTH(order_date).`,
    },
  },

  {
    id: 'sql-window-functions',
    category: 'SQL Advanced',
    title: 'Window Functions',
    difficulty: 'Advanced',
    theory: [
      'Window functions perform calculations across a set of rows related to the current row, without collapsing rows like GROUP BY does. They use the OVER() clause.',
      'ROW_NUMBER() assigns sequential numbers. RANK() gives the same rank to ties (with gaps). DENSE_RANK() no gaps. NTILE(n) divides rows into n buckets.',
      'PARTITION BY divides the data into groups (like GROUP BY but rows are preserved). ORDER BY inside OVER() defines the ordering within each partition.',
      'LAG() and LEAD() access the previous/next row\'s value — perfect for calculating month-over-month changes, running differences, and trends.',
    ],
    syntax: `-- ROW_NUMBER, RANK, DENSE_RANK
SELECT name, marks,
  ROW_NUMBER() OVER (ORDER BY marks DESC) AS row_num,
  RANK()       OVER (ORDER BY marks DESC) AS rank_pos,
  DENSE_RANK() OVER (ORDER BY marks DESC) AS dense_rank
FROM students;

-- PARTITION BY (rank within each class)
RANK() OVER (PARTITION BY class ORDER BY marks DESC)

-- Running total
SUM(amount) OVER (ORDER BY date)

-- Compare to previous row
LAG(amount, 1) OVER (ORDER BY date) AS prev_amount`,
    code: `CREATE TABLE sales (
  id INT, salesperson VARCHAR(50), region VARCHAR(30),
  amount DECIMAL(10,2), sale_date DATE
);
INSERT INTO sales VALUES
(1,'Priya','North',45000,'2025-01-01'),
(2,'Rahul','South',32000,'2025-01-01'),
(3,'Sneha','North',58000,'2025-02-01'),
(4,'Priya','North',41000,'2025-02-01'),
(5,'Arun','South',67000,'2025-02-01'),
(6,'Rahul','South',29000,'2025-03-01'),
(7,'Sneha','North',73000,'2025-03-01'),
(8,'Priya','North',52000,'2025-03-01');

-- 1. Overall rank by amount
SELECT salesperson, amount,
  RANK() OVER (ORDER BY amount DESC) AS overall_rank
FROM sales ORDER BY overall_rank;

-- 2. Rank within each region
SELECT salesperson, region, amount,
  RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS region_rank
FROM sales;

-- 3. Running total per salesperson
SELECT salesperson, sale_date, amount,
  SUM(amount) OVER (PARTITION BY salesperson ORDER BY sale_date) AS running_total
FROM sales;

-- 4. Month-over-month growth per salesperson
SELECT salesperson, sale_date, amount,
  LAG(amount) OVER (PARTITION BY salesperson ORDER BY sale_date) AS prev_month,
  amount - LAG(amount) OVER (PARTITION BY salesperson ORDER BY sale_date) AS growth
FROM sales;`,
    output: `-- Overall rank:
Sneha | 73000 | 1
Arun  | 67000 | 2
Sneha | 58000 | 3
...

-- Region rank (North):
Sneha | North | 73000 | 1
Priya | North | 58000 | 2
...

-- Running total (Priya):
Priya | 2025-01-01 | 45000 | 45000
Priya | 2025-02-01 | 41000 | 86000
Priya | 2025-03-01 | 52000 | 138000`,
    notes: [
      'Window functions do NOT reduce the number of rows (unlike GROUP BY)',
      'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW — standard running total frame',
      'Window functions run AFTER WHERE and GROUP BY but BEFORE ORDER BY in the query',
    ],
    practice: {
      title: 'Student Exam Ranking',
      description: `Given exam results, write window function queries:

CREATE TABLE exam_results (student, subject, marks, exam_date);

1. Overall rank per subject by marks (DENSE_RANK)
2. Top 3 students per subject (use DENSE_RANK <= 3)
3. Running average per student across exams (ordered by date)
4. Each student's marks vs class average per subject (marks - AVG(marks) OVER subject)`,
      startCode: `CREATE TABLE exam_results (
  id INT PRIMARY KEY,
  student VARCHAR(50),
  subject VARCHAR(30),
  marks INT,
  exam_date DATE
);
INSERT INTO exam_results VALUES
(1,'Priya','Maths',92,'2025-01-10'),
(2,'Rahul','Maths',78,'2025-01-10'),
(3,'Sneha','Maths',85,'2025-01-10'),
(4,'Priya','Science',88,'2025-01-15'),
(5,'Rahul','Science',91,'2025-01-15'),
(6,'Sneha','Science',76,'2025-01-15'),
(7,'Priya','English',95,'2025-01-20'),
(8,'Rahul','English',82,'2025-01-20'),
(9,'Sneha','English',89,'2025-01-20');

-- 1. Rank per subject

-- 2. Top 3 per subject

-- 3. Running average per student

-- 4. Marks vs class average per subject`,
      hint: `DENSE_RANK() OVER (PARTITION BY subject ORDER BY marks DESC). Filter with a subquery: SELECT * FROM (... rank_col) t WHERE t.rank <= 3. AVG(marks) OVER (PARTITION BY student ORDER BY exam_date) for running avg.`,
    },
  },

  {
    id: 'sql-normalization',
    category: 'Database Design',
    title: 'Normalisation (1NF, 2NF, 3NF)',
    difficulty: 'Advanced',
    theory: [
      'Normalisation is the process of organising a database to reduce data redundancy and improve data integrity. The rules are called Normal Forms (NF).',
      '1NF: Each column must have atomic (indivisible) values. No repeating groups. Each row must be unique. No multi-value columns like "Maths,Science,English" in one cell.',
      '2NF: Must be in 1NF + every non-key column must depend on the ENTIRE primary key (no partial dependencies). This applies when you have a composite primary key.',
      '3NF: Must be in 2NF + no transitive dependencies — non-key columns must not depend on other non-key columns. E.g., if you have student_id → dept_id → dept_name, move dept_name to a departments table.',
    ],
    syntax: `-- BAD: violates 1NF (multiple values in subjects)
-- student_id | name  | subjects
-- 1          | Priya | Maths,Science,English

-- GOOD: 1NF (separate rows or table)
-- student_id | name  | subject
-- 1          | Priya | Maths
-- 1          | Priya | Science

-- GOOD: 3NF (separate departments table)
-- students: id, name, dept_id
-- departments: dept_id, dept_name, dept_head`,
    code: `-- ===== NORMALISATION DEMO =====

-- UNNORMALISED (UNF) — violates 1NF
-- All data crammed into one table:
-- order_id | customer_name | customer_city | products (comma-separated) | amounts

-- STEP 1: Apply 1NF — atomic values, no repeating groups
CREATE TABLE orders_1nf (
  order_id INT,
  customer_name VARCHAR(50),
  customer_city VARCHAR(50),  -- redundant (repeated per customer)
  product_name VARCHAR(50),
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, product_name)
);

-- STEP 2: Apply 2NF — remove partial dependencies
-- customer_name and customer_city only depend on customer, not on product
-- Split into separate tables:
CREATE TABLE customers_2nf (
  customer_id INT PRIMARY KEY,
  customer_name VARCHAR(50),
  customer_city VARCHAR(50)
);
CREATE TABLE orders_2nf (
  order_id INT,
  customer_id INT,
  product_name VARCHAR(50),
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, product_name),
  FOREIGN KEY (customer_id) REFERENCES customers_2nf(customer_id)
);

-- STEP 3: Apply 3NF — remove transitive dependencies
-- product_price should be in a products table, not repeated in every order
CREATE TABLE products_3nf (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(50),
  unit_price DECIMAL(10,2)
);
CREATE TABLE customers_3nf (
  customer_id INT PRIMARY KEY,
  customer_name VARCHAR(50),
  city_id INT  -- city moves to a cities table
);
CREATE TABLE orders_3nf (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE
);
CREATE TABLE order_items_3nf (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);

-- Show the relationship
SELECT o.order_id, c.customer_name, p.product_name,
       oi.quantity, p.unit_price,
       oi.quantity * p.unit_price AS line_total
FROM orders_3nf o
JOIN customers_3nf c ON o.customer_id = c.customer_id
JOIN order_items_3nf oi ON o.order_id = oi.order_id
JOIN products_3nf p ON oi.product_id = p.product_id;`,
    output: `-- 3NF design has 4 separate tables:
-- orders_3nf, order_items_3nf, customers_3nf, products_3nf
-- No data redundancy — each fact stored exactly once
-- To get full order view, JOIN the tables`,
    notes: [
      '1NF: atomic values. 2NF: no partial deps. 3NF: no transitive deps.',
      'Denormalisation: deliberately breaking normal form for read performance (e.g., analytics tables)',
      'BCNF (Boyce-Codd NF) is a stricter version of 3NF',
    ],
    practice: {
      title: 'Normalise a School Database',
      description: `The school has this badly designed table (UNF):
student_id | student_name | teacher_name | subject | teacher_phone | marks | class_name | class_room

Problems: teacher info repeats, class info repeats, no separation of concerns.

Task:
1. Identify which Normal Form is violated and why
2. Design 3NF schema: students, teachers, subjects, classes tables
3. Write CREATE TABLE statements for the 3NF design
4. Add appropriate foreign keys`,
      startCode: `-- Identify violations:
-- 1NF violation: ?
-- 2NF violation: ?
-- 3NF violation: ?

-- Your 3NF tables:
CREATE TABLE classes (
  class_id INT PRIMARY KEY,
  class_name VARCHAR(20),
  room_number VARCHAR(10)
);

CREATE TABLE teachers (
  -- Add fields
);

CREATE TABLE subjects (
  -- Add fields, link to teacher
);

CREATE TABLE students (
  -- Add fields, link to class
);

CREATE TABLE student_marks (
  -- Link students to subjects with marks
);`,
      hint: `teachers(teacher_id, name, phone). subjects(subject_id, name, teacher_id FK). students(student_id, name, class_id FK). student_marks(student_id FK, subject_id FK, marks).`,
    },
  },

  // ── CTEs ──────────────────────────────────────────────────────────────────────
  {
    id: 'sql-cte',
    category: 'SQL Advanced',
    title: 'CTEs — Common Table Expressions (WITH Clause)',
    difficulty: 'Advanced',
    theory: [
      'A CTE (Common Table Expression) is a named temporary result set defined with the WITH clause. It makes complex queries readable by breaking them into named, reusable steps — like variables in SQL.',
      'Without CTEs, complex queries use deeply nested subqueries that are hard to read and debug. CTEs let you define each logical step separately with a meaningful name, then reference it like a table.',
      'Multiple CTEs: You can chain several CTEs separated by commas, where each can reference previous ones. This creates a readable step-by-step analytics pipeline.',
      'Recursive CTEs reference themselves, enabling traversal of hierarchical data like org charts, category trees, and bill of materials.',
    ],
    syntax: `WITH cte_name AS (
    SELECT ...       -- CTE definition
),
another_cte AS (
    SELECT ... FROM cte_name  -- can reference earlier CTEs
)
SELECT * FROM another_cte;   -- main query

-- Recursive CTE:
WITH RECURSIVE hierarchy AS (
    SELECT id, name, parent_id FROM org WHERE parent_id IS NULL  -- anchor
    UNION ALL
    SELECT e.id, e.name, e.parent_id FROM org e
    JOIN hierarchy h ON e.parent_id = h.id   -- recursive part
)
SELECT * FROM hierarchy;`,
    code: `-- CTE Example 1: Student ranking with multi-step analytics
WITH student_avgs AS (
    -- Step 1: each student's average across subjects
    SELECT student_id, name, class_id,
           AVG(marks) AS avg_marks
    FROM students
    GROUP BY student_id, name, class_id
),
class_stats AS (
    -- Step 2: class-level statistics
    SELECT class_id,
           AVG(avg_marks) AS class_mean,
           MAX(avg_marks) AS class_max,
           COUNT(*) AS student_count
    FROM student_avgs
    GROUP BY class_id
),
final_report AS (
    -- Step 3: combine for final output
    SELECT
        sa.name,
        sa.class_id,
        ROUND(sa.avg_marks, 1) AS avg_marks,
        ROUND(cs.class_mean, 1) AS class_avg,
        RANK() OVER (PARTITION BY sa.class_id ORDER BY sa.avg_marks DESC) AS rank_in_class,
        CASE WHEN sa.avg_marks >= cs.class_mean THEN 'Above Avg' ELSE 'Below Avg' END AS standing
    FROM student_avgs sa
    JOIN class_stats cs ON sa.class_id = cs.class_id
)
SELECT * FROM final_report
WHERE rank_in_class <= 3
ORDER BY class_id, rank_in_class;

-- CTE Example 2: Sales pipeline
WITH monthly AS (
    SELECT MONTH(order_date) AS month, SUM(amount) AS total
    FROM orders WHERE YEAR(order_date) = 2025
    GROUP BY MONTH(order_date)
),
with_growth AS (
    SELECT month, total,
           LAG(total) OVER (ORDER BY month) AS prev_month
    FROM monthly
)
SELECT month, total,
       ROUND((total - prev_month) / prev_month * 100, 1) AS growth_pct
FROM with_growth;`,
    output: `-- final_report output (top 3 per class):
name    | class | avg_marks | class_avg | rank | standing
--------|-------|-----------|-----------|------|----------
Sneha   |  10   |   91.5    |   76.2    |  1   | Above Avg
Arjun   |  10   |   84.0    |   76.2    |  2   | Above Avg
Priya   |  10   |   78.5    |   76.2    |  3   | Above Avg`,
    notes: [
      'CTEs only exist for the duration of the single query — they are not stored like views.',
      'MySQL supports CTEs from version 8.0+. PostgreSQL has supported them since version 8.4.',
      'CTEs vs subqueries: both work similarly, but CTEs are reusable within the same query and significantly more readable.',
    ],
    practice: {
      title: 'Product Sales CTE Pipeline',
      description: `Using 3 CTEs: (1) monthly_sales: total sales per product per month. (2) product_ranks: rank products by total sales. (3) final: show only top 5 products with their month-over-month growth. Tables: orders(order_id, product_id, amount, order_date), products(product_id, name).`,
      startCode: `-- YOUR CODE:
WITH monthly_sales AS (
    -- Step 1: sales per product per month
    SELECT product_id,
           MONTH(order_date) AS month,
           SUM(amount) AS monthly_total
    FROM orders
    GROUP BY product_id, MONTH(order_date)
),
product_totals AS (
    -- Step 2: total across all months + rank
    SELECT product_id,
           SUM(monthly_total) AS grand_total,
           RANK() OVER (ORDER BY SUM(monthly_total) DESC) AS sales_rank
    FROM monthly_sales
    GROUP BY product_id
),
top_products AS (
    -- Step 3: filter top 5
    SELECT * FROM product_totals WHERE sales_rank <= 5
)
SELECT p.name, tp.grand_total, tp.sales_rank
FROM top_products tp
JOIN products p ON tp.product_id = p.product_id
ORDER BY tp.sales_rank;`,
      hint: 'The structure is provided. Extend by adding month-over-month growth: in monthly_sales, add LAG(monthly_total) OVER (PARTITION BY product_id ORDER BY month) as prev_month.',
    },
  },

  // ── CASE WHEN ────────────────────────────────────────────────────────────────
  {
    id: 'sql-case-when',
    category: 'SQL Fundamentals',
    title: 'CASE WHEN — Conditional Logic in SQL',
    difficulty: 'Beginner',
    theory: [
      'CASE WHEN is SQL\'s if-then-else. It allows conditional logic directly inside SELECT queries to categorise data, create computed columns, and transform values.',
      'Searched CASE evaluates multiple independent conditions. Simple CASE compares one expression to multiple values (like a switch statement). Both return the first matching WHEN value.',
      'Conditional aggregation with CASE: SUM(CASE WHEN condition THEN 1 ELSE 0 END) counts rows matching a condition — enables pivot-style reports in standard SQL.',
    ],
    syntax: `-- Searched CASE (most common):
CASE
    WHEN marks >= 90 THEN 'A+'
    WHEN marks >= 80 THEN 'A'
    ELSE 'C'
END AS grade

-- Conditional aggregation (pivot):
SUM(CASE WHEN marks >= 90 THEN 1 ELSE 0 END) AS a_plus_count`,
    code: `-- Grading with CASE WHEN
SELECT
    name,
    marks,
    CASE
        WHEN marks >= 90 THEN 'A+'
        WHEN marks >= 80 THEN 'A'
        WHEN marks >= 70 THEN 'B'
        WHEN marks >= 60 THEN 'C'
        WHEN marks >= 40 THEN 'D'
        ELSE 'F'
    END AS grade,
    CASE WHEN marks >= 40 THEN 'Pass' ELSE 'Fail' END AS result
FROM students
ORDER BY marks DESC;

-- Conditional aggregation — grade distribution per class
SELECT
    class_id,
    COUNT(*) AS total,
    SUM(CASE WHEN marks >= 90 THEN 1 ELSE 0 END) AS a_plus,
    SUM(CASE WHEN marks >= 80 AND marks < 90 THEN 1 ELSE 0 END) AS a_grade,
    SUM(CASE WHEN marks < 40 THEN 1 ELSE 0 END) AS failed,
    ROUND(AVG(CASE WHEN marks >= 40 THEN 1.0 ELSE 0 END) * 100, 1) AS pass_rate
FROM students
GROUP BY class_id;

-- CASE in ORDER BY: fails first, then highest marks
SELECT name, marks FROM students
ORDER BY
    CASE WHEN marks < 40 THEN 0 ELSE 1 END ASC,
    marks DESC;`,
    output: `-- Grading output:
name    | marks | grade | result
--------|-------|-------|-------
Sneha   |  95   | A+    | Pass
Arjun   |  88   | A     | Pass
Rahul   |  55   | D     | Pass
Vikram  |  32   | F     | Fail

-- Grade distribution:
class_id | total | a_plus | a_grade | failed | pass_rate
---------|-------|--------|---------|--------|-----------
10       |  25   |   5    |    8    |    2   |  92.0%`,
    notes: [
      'COALESCE(expr1, expr2, expr3) returns the first non-NULL value — a common alternative to CASE for null handling.',
      'IIF() in SQL Server and IF() in MySQL are two-way shortcuts, but CASE WHEN is universal across all SQL databases.',
      'CASE can be nested but this hurts readability. Prefer CTEs or views for complex conditional logic.',
    ],
    practice: {
      title: 'Scholarship Allocator',
      description: `Write a query assigning scholarships: marks≥90 AND income<200000 → ₹50000; marks≥80 AND income<300000 → ₹25000; marks≥70 AND income<400000 → ₹10000; else → ₹0. Add a column: "Priority" if scholarship>0 AND income<250000, else "Standard".`,
      startCode: `-- students(name, marks, family_income)
SELECT
    name, marks, family_income,
    CASE
        WHEN marks >= 90 AND family_income < 200000 THEN 50000
        -- YOUR CODE: more WHEN clauses
        ELSE 0
    END AS scholarship,
    CASE
        -- YOUR CODE: priority flag
        -- Can't reference alias "scholarship" here — repeat the conditions
        ELSE 'Standard'
    END AS priority_status
FROM students
ORDER BY scholarship DESC, marks DESC;`,
      hint: 'For priority: WHEN marks >= 90 AND family_income < 200000 AND family_income < 250000 THEN "Priority". Repeat top scholarship conditions inside the second CASE.',
    },
  },

  // ── Subqueries ────────────────────────────────────────────────────────────────
  {
    id: 'sql-subqueries',
    category: 'SQL Advanced',
    title: 'Subqueries — Queries Inside Queries',
    difficulty: 'Intermediate',
    theory: [
      'A subquery is a SELECT embedded inside another SQL statement. The inner query runs first; its result is used by the outer query. Subqueries can appear in SELECT, FROM, WHERE, and HAVING clauses.',
      'Scalar subquery returns one value; used in WHERE for comparison or in SELECT as a computed column. Multi-row subquery returns multiple rows; used with IN, NOT IN, ANY, ALL, EXISTS.',
      'Correlated subquery references the outer query\'s columns and executes once per outer row — potentially slow. Prefer JOINs for large tables. EXISTS is faster than IN when subquery returns many rows.',
    ],
    syntax: `-- Scalar (one value):
SELECT name FROM students
WHERE marks > (SELECT AVG(marks) FROM students);

-- Multi-row (IN):
WHERE class_id IN (SELECT class_id FROM classes WHERE section='A');

-- Exists:
WHERE EXISTS (SELECT 1 FROM awards WHERE student_id = s.student_id);

-- Derived table (subquery in FROM):
SELECT * FROM (SELECT class_id, AVG(marks) avg FROM students GROUP BY class_id) t
WHERE t.avg >= 75;`,
    code: `-- Scalar subquery: above class average
SELECT name, class_id, marks
FROM students s
WHERE marks > (
    SELECT AVG(marks) FROM students WHERE class_id = s.class_id
)
ORDER BY marks DESC;

-- IN subquery: students in top classes
SELECT name, class_id, marks
FROM students
WHERE class_id IN (
    SELECT class_id FROM students
    GROUP BY class_id
    HAVING AVG(marks) >= 75
);

-- NOT IN: students with no awards
SELECT name, marks FROM students s
WHERE s.student_id NOT IN (
    SELECT student_id FROM awards WHERE student_id IS NOT NULL
);

-- EXISTS: students who have won awards
SELECT s.name, s.marks FROM students s
WHERE EXISTS (
    SELECT 1 FROM awards a WHERE a.student_id = s.student_id
);

-- Derived table: class summary ranked
SELECT class_id, student_count, ROUND(avg_marks, 1) AS avg_marks,
       RANK() OVER (ORDER BY avg_marks DESC) AS rank
FROM (
    SELECT class_id, COUNT(*) AS student_count, AVG(marks) AS avg_marks
    FROM students GROUP BY class_id
) AS class_summary
ORDER BY rank;`,
    output: `-- Above class average:
name    | class | marks
--------|-------|------
Sneha   |  10   |  95
Arjun   |  10   |  88

-- Derived table (class ranking):
class_id | students | avg_marks | rank
---------|----------|-----------|-----
11       |    28    |   80.4    |  1
10       |    25    |   76.2    |  2`,
    notes: [
      'EXISTS stops at the first match — much faster than IN when the subquery result is large.',
      'NOT IN with NULLs is dangerous: if the subquery returns any NULL, NOT IN returns no rows. Use NOT EXISTS instead.',
      'Subqueries in FROM are called "derived tables". CTEs (WITH clause) are the modern, more readable alternative.',
    ],
    practice: {
      title: 'Student Analytics with Subqueries',
      description: `Write: (1) Find students 10+ marks above their class average. (2) Find classes where no student failed (marks < 40). (3) Find students who appear in BOTH top_scorers (marks > 85) AND award_winners tables.`,
      startCode: `-- Q1: 10+ above class average (correlated subquery)
SELECT name, class_id, marks
FROM students s
WHERE marks > (
    SELECT AVG(marks) FROM students WHERE class_id = s.class_id
) + 10;

-- Q2: No failures in the class
SELECT DISTINCT class_id FROM students
WHERE class_id NOT IN (
    -- YOUR CODE: classes that have failures
);

-- Q3: Top scorers who also won awards (using EXISTS)
SELECT name, marks FROM students s
WHERE marks > 85
AND EXISTS (
    -- YOUR CODE
);`,
      hint: 'Q2: (SELECT class_id FROM students WHERE marks < 40). Q3: EXISTS (SELECT 1 FROM awards a WHERE a.student_id = s.student_id).',
    },
  },

  // ── SQL Aggregates Deep Dive ──────────────────────────────────────────────────
  {
    id: 'sql-aggregates-advanced',
    category: 'SQL Advanced',
    title: 'Advanced Aggregation — ROLLUP, CUBE & Conditional Aggregates',
    difficulty: 'Advanced',
    theory: [
      'Beyond basic GROUP BY, SQL offers ROLLUP and CUBE for multi-dimensional aggregation — generating subtotals and grand totals automatically. Essential for report generation.',
      'ROLLUP generates hierarchical subtotals: GROUP BY class_id, subject WITH ROLLUP gives totals per class_id+subject, then per class_id only, then grand total. Column values for rolled-up levels appear as NULL.',
      'CUBE generates all possible subtotal combinations. For GROUP BY a, b, c WITH CUBE, you get subtotals for all 8 combinations: (a,b,c), (a,b), (a,c), (b,c), (a), (b), (c), ().',
      'Conditional aggregation: SUM(CASE WHEN ...) or COUNT(CASE WHEN ...) lets you aggregate different subsets in a single pass — much faster than multiple queries or subqueries.',
    ],
    syntax: `-- ROLLUP (hierarchical subtotals):
SELECT class_id, subject, SUM(marks)
FROM student_marks
GROUP BY class_id, subject WITH ROLLUP;

-- GROUPING() identifies which rows are subtotals:
SELECT
    GROUPING(class_id) AS is_class_subtotal,
    class_id,
    SUM(marks)
FROM student_marks
GROUP BY class_id WITH ROLLUP;`,
    code: `-- Sample: school exam results
-- student_marks(student_id, class_id, subject, marks)

-- ─── ROLLUP: class → subject subtotals ───────────────────────
SELECT
    COALESCE(class_id, 'ALL CLASSES') AS class_id,
    COALESCE(subject, 'ALL SUBJECTS') AS subject,
    COUNT(*) AS students,
    ROUND(AVG(marks), 1) AS avg_marks,
    SUM(marks) AS total_marks
FROM student_marks
GROUP BY class_id, subject WITH ROLLUP;

-- ─── Conditional aggregation: subject analysis in one pass ───
SELECT
    class_id,
    COUNT(*) AS total_students,
    -- Maths stats
    ROUND(AVG(CASE WHEN subject='Maths' THEN marks END), 1) AS maths_avg,
    -- Science stats
    ROUND(AVG(CASE WHEN subject='Science' THEN marks END), 1) AS sci_avg,
    -- English stats
    ROUND(AVG(CASE WHEN subject='English' THEN marks END), 1) AS eng_avg,
    -- Overall pass rate
    ROUND(SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pass_rate,
    -- Count in each grade band
    SUM(CASE WHEN marks >= 90 THEN 1 ELSE 0 END) AS distinctions
FROM student_marks
GROUP BY class_id
ORDER BY class_id;

-- ─── TOP-N per group (without window functions) ───────────────
SELECT class_id, subject, MAX(marks) AS top_mark,
       MIN(marks) AS lowest_mark,
       MAX(marks) - MIN(marks) AS spread
FROM student_marks
GROUP BY class_id, subject
HAVING COUNT(*) >= 5  -- only groups with 5+ students
ORDER BY class_id, top_mark DESC;`,
    output: `-- ROLLUP output:
class_id     | subject      | students | avg_marks | total
-------------|--------------|----------|-----------|-------
10           | Maths        |   25     |   76.4    | 1910
10           | Science      |   25     |   79.2    | 1980
10           | ALL SUBJECTS |   75     |   77.5    | 5810  ← class subtotal
11           | Maths        |   28     |   80.1    | 2243
ALL CLASSES  | ALL SUBJECTS |  150     |   78.6    | 11790 ← grand total

-- Conditional aggregation:
class | total | maths_avg | sci_avg | eng_avg | pass_rate | distinctions
------|-------|-----------|---------|---------|-----------|-------------
10    |  75   |   76.4    |  79.2   |  77.1   |   94.7%   |    12`,
    notes: [
      'GROUPING(col) returns 1 for rows added by ROLLUP/CUBE (subtotal rows), 0 for regular group rows. Use to label subtotal rows.',
      'PIVOT in SQL Server: SELECT ... FROM table PIVOT (SUM(marks) FOR subject IN ([Maths],[Science],[English])) — a built-in way to rotate rows to columns.',
      'For large fact tables, materialise aggregations in summary tables updated nightly — much faster than computing on-the-fly for millions of rows.',
    ],
    practice: {
      title: 'Sales Dashboard with ROLLUP',
      description: `Given orders(order_id, city, product_category, amount, order_date), write a query using ROLLUP that shows total sales by city and product_category, with subtotals per city and a grand total. Also add a column using conditional aggregation showing online_sales (amount where source='online') vs store_sales.`,
      startCode: `-- orders(order_id, city, category, amount, source)
SELECT
    COALESCE(city, 'ALL CITIES') AS city,
    COALESCE(category, 'ALL CATEGORIES') AS category,
    COUNT(*) AS order_count,
    SUM(amount) AS total_sales,
    -- YOUR CODE: conditional aggregation for online vs store
    SUM(CASE WHEN source = 'online' THEN amount ELSE 0 END) AS online_sales,
    SUM(CASE WHEN source = 'store'  THEN amount ELSE 0 END) AS store_sales
FROM orders
GROUP BY city, category WITH ROLLUP
ORDER BY city, category;`,
      hint: 'The conditional aggregation columns are already shown. COALESCE handles the NULL values from ROLLUP to show meaningful labels. Try adding HAVING SUM(amount) > 10000 to exclude small groups.',
    },
  },

  {
    id: 'sql-data-types',
    category: 'SQL Fundamentals',
    title: 'SQL Data Types',
    difficulty: 'Beginner',
    theory: [
      'SQL data types define what kind of data a column can store: numbers, text, dates, booleans. Choosing the right type ensures data integrity and optimises storage.',
      'Numeric types: TINYINT (1 byte, 0-255), INT (4 bytes, -2B to +2B), BIGINT (8 bytes), DECIMAL(p,s) (exact decimal for money), FLOAT/DOUBLE (approximate floating-point).',
      'Text types: CHAR(n) (fixed-length string, pads with spaces), VARCHAR(n) (variable-length, up to n chars), TEXT (unlimited). Use VARCHAR for flexibility.',
      'Date/Time: DATE (YYYY-MM-DD), DATETIME (YYYY-MM-DD HH:MM:SS), TIME, TIMESTAMP. Use DATE for pure dates, DATETIME for date+time.',
    ],
    syntax: `INT, BIGINT, TINYINT
DECIMAL(10,2) -- 10 total digits, 2 after decimal
VARCHAR(100) -- up to 100 chars
DATE, DATETIME, TIMESTAMP
BOOLEAN (or TINYINT(1) in MySQL)`,
    code: `CREATE TABLE product_catalog (
  product_id INT PRIMARY KEY,
  sku CHAR(8),                    -- fixed length (ABC12345)
  product_name VARCHAR(200),      -- variable text
  price DECIMAL(10,2),            -- money: 99999999.99
  stock_qty INT,                  -- whole numbers
  rating FLOAT,                   -- 4.5 stars (approximate)
  is_available BOOLEAN,           -- true/false
  created_at DATETIME,            -- timestamp
  last_updated DATE               -- date only
);

INSERT INTO product_catalog VALUES
  (1, 'BOOK0001', 'Python Programming Guide', 599.99, 45, 4.8, true, '2024-06-10 14:30:00', '2025-03-15'),
  (2, 'CALC0002', 'Scientific Calculator', 1299.50, 12, 4.2, true, '2024-07-05 10:15:00', '2025-02-20'),
  (3, 'NOTE0003', 'Premium Notebook Pack', 149.99, 0, 4.9, false, '2024-08-20 16:45:00', '2025-01-10'),
  (4, 'PENS0004', 'Ballpoint Pen Set', 299.75, 89, 3.6, true, '2024-05-12 09:30:00', '2025-03-01'),
  (5, 'TECH0005', 'USB Hub 7-Port', 1899.00, 3, 4.7, true, '2024-09-01 13:20:00', '2025-03-14');

SELECT product_id, product_name, price, stock_qty, rating, is_available, created_at
FROM product_catalog
WHERE price >= 500 AND stock_qty > 0
ORDER BY rating DESC;`,
    output: `product_id | product_name              | price   | stock_qty | rating | is_available | created_at
-----------|---------------------------|---------|-----------|--------|--------------|-------------------
1          | Python Programming Guide  | 599.99  |    45     |   4.8  | 1            | 2024-06-10 14:30:00
2          | Scientific Calculator     | 1299.50 |    12     |   4.2  | 1            | 2024-07-05 10:15:00
5          | USB Hub 7-Port            | 1899.00 |     3     |   4.7  | 1            | 2024-09-01 13:20:00`,
    notes: [
      'DECIMAL(10,2) is best for money; never use FLOAT/DOUBLE for currency due to rounding errors.',
      'VARCHAR is more flexible and storage-efficient than CHAR for varying-length data.',
      'Always use DATETIME or TIMESTAMP for tracking events; DATE alone loses the time component.',
    ],
    practice: {
      title: 'Design a User Registration Table',
      description: 'Create a users table with: user_id (int PK), username (varchar 50), email (varchar 100), age (tinyint), balance (decimal 10,2), verified (boolean), signup_date (datetime). Insert 5 sample users and query those aged 18+.',
      startCode: '',
      hint: 'Use TINYINT for age (0-255 covers typical ranges), DECIMAL(10,2) for monetary balance, DATETIME for signup tracking.',
    },
  },

  {
    id: 'sql-create-drop-table',
    category: 'Database Design',
    title: 'CREATE TABLE & DROP TABLE',
    difficulty: 'Beginner',
    theory: [
      'CREATE TABLE defines a new table with columns and constraints. DROP TABLE removes it permanently. These are DDL (Data Definition Language) commands.',
      'Column definition: column_name datatype [constraints]. Constraints: NOT NULL, UNIQUE, PRIMARY KEY, DEFAULT, CHECK, FOREIGN KEY.',
      'IF NOT EXISTS (CREATE TABLE IF NOT EXISTS) prevents errors if table already exists. CASCADE/RESTRICT options on DROP control behaviour with foreign keys.',
    ],
    syntax: `CREATE TABLE table_name (
  column_name datatype constraint,
  column_name datatype constraint,
  PRIMARY KEY (column_name)
);

DROP TABLE table_name;
DROP TABLE IF EXISTS table_name;  -- no error if doesn't exist`,
    code: `-- Create a courses table
CREATE TABLE courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(100) NOT NULL,
  instructor VARCHAR(100) NOT NULL,
  duration_hours INT CHECK (duration_hours > 0),
  price DECIMAL(10,2) DEFAULT 999.99,
  active BOOLEAN DEFAULT true,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (course_name, instructor, duration_hours, price) VALUES
  ('Python Fundamentals', 'Alice Johnson', 40, 5999.00),
  ('Web Development', 'Bob Smith', 60, 7999.00),
  ('Data Science Bootcamp', 'Carol Davis', 100, 12999.00),
  ('Database Design', 'Dave Wilson', 30, 4999.00),
  ('Cloud Computing Basics', 'Eva Martinez', 25, 3999.00);

SELECT course_id, course_name, instructor, duration_hours, price
FROM courses
WHERE active = true AND price < 10000
ORDER BY price DESC;

-- Later: drop the old table
DROP TABLE IF EXISTS courses;`,
    output: `course_id | course_name           | instructor      | duration_hours | price
-----------|----------------------|-----------------|----------------|---------
2          | Web Development       | Bob Smith       |      60        | 7999.00
1          | Python Fundamentals   | Alice Johnson   |      40        | 5999.00
4          | Database Design       | Dave Wilson     |      30        | 4999.00`,
    notes: [
      'AUTO_INCREMENT generates unique IDs automatically (MySQL). PostgreSQL uses SERIAL.',
      'DROP TABLE is permanent and unrecoverable — always test on a backup first.',
      'DEFAULT CURRENT_TIMESTAMP auto-fills creation time on every new row.',
    ],
    practice: {
      title: 'Create an Employees Table',
      description: 'Create an employees table with: emp_id (int PK auto-increment), name (varchar 100 NOT NULL), department (varchar 50), salary (decimal 10,2), hire_date (date), is_active (boolean). Insert 6 employees and show all non-active employees.',
      startCode: '',
      hint: 'Use AUTO_INCREMENT for emp_id, DATE for hire_date, BOOLEAN/TINYINT(1) for is_active status.',
    },
  },

  {
    id: 'sql-alter-table',
    category: 'Database Design',
    title: 'ALTER TABLE — Modifying Table Structure',
    difficulty: 'Intermediate',
    theory: [
      'ALTER TABLE modifies an existing table: add columns, drop columns, rename columns, change data types, add/drop constraints.',
      'ADD COLUMN inserts a new column. DROP COLUMN removes a column (all its data is lost). MODIFY COLUMN changes datatype (may require data conversion).',
      'Altering large production tables can lock them. In real apps, plan schema changes carefully to minimise downtime.',
    ],
    syntax: `ALTER TABLE table_name
ADD COLUMN column_name datatype;

ALTER TABLE table_name
DROP COLUMN column_name;

ALTER TABLE table_name
MODIFY COLUMN column_name new_datatype;

ALTER TABLE table_name
RENAME COLUMN old_name TO new_name;`,
    code: `-- Start with a simple table
CREATE TABLE students_v1 (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  class INT
);

INSERT INTO students_v1 VALUES (1, 'Arjun', 10), (2, 'Priya', 11), (3, 'Rahul', 10);

-- Add email column
ALTER TABLE students_v1 ADD COLUMN email VARCHAR(100);

-- Add marks column with DEFAULT
ALTER TABLE students_v1 ADD COLUMN marks INT DEFAULT 0;

-- Show structure after ALTER
SELECT id, name, class, email, marks FROM students_v1;

-- Rename the class column to class_num
ALTER TABLE students_v1 RENAME COLUMN class TO class_num;

-- Change email to be UNIQUE
ALTER TABLE students_v1 MODIFY COLUMN email VARCHAR(100) UNIQUE;

-- Drop the marks column (if we don't need it)
ALTER TABLE students_v1 DROP COLUMN marks;

-- Final schema
SELECT * FROM students_v1;`,
    output: `-- After first ALTER (ADD email):
id | name   | class | email | marks
---|--------|-------|-------|-------
1  | Arjun  |  10   | NULL  | 0
2  | Priya  |  11   | NULL  | 0
3  | Rahul  |  10   | NULL  | 0

-- After DROP COLUMN marks:
id | name   | class_num | email
---|--------|-----------|-------
1  | Arjun  |    10     | NULL
2  | Priya  |    11     | NULL
3  | Rahul  |    10     | NULL`,
    notes: [
      'DROP COLUMN is permanent — no undo. Always backup before running on production.',
      'Adding NOT NULL to an existing column fails if NULL values already exist.',
      'Online schema changes (without locking) are a PostgreSQL/MySQL 8+ feature.',
    ],
    practice: {
      title: 'Evolve a Products Table',
      description: 'Start with products(id, name, price). Then: add category varchar(50), add stock_qty int default 0, rename price to unit_price, modify category to be NOT NULL, drop stock_qty. Show final schema.',
      startCode: '',
      hint: 'Use ALTER TABLE ... ADD COLUMN, ALTER TABLE ... RENAME COLUMN, ALTER TABLE ... DROP COLUMN in sequence.',
    },
  },

  {
    id: 'sql-constraints-pk-fk',
    category: 'Database Design',
    title: 'Constraints — PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK',
    difficulty: 'Intermediate',
    theory: [
      'Constraints enforce rules at the database level. PRIMARY KEY uniquely identifies rows. FOREIGN KEY maintains referential integrity — prevents orphaned records. UNIQUE prevents duplicates. CHECK validates values.',
      'PRIMARY KEY is also a NOT NULL UNIQUE constraint. FOREIGN KEY references another table\'s primary key to ensure child rows reference existing parents.',
      'Constraints prevent bad data from entering the database — catching errors early is much better than fixing corrupt data later.',
    ],
    syntax: `PRIMARY KEY — unique identifier
UNIQUE — no duplicate values (but can be NULL)
NOT NULL — must have a value
DEFAULT value — use if none provided
CHECK (condition) — value must meet condition
FOREIGN KEY (col) REFERENCES other_table(pk)`,
    code: `-- E-commerce database with constraints
CREATE TABLE product_categories (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  price DECIMAL(10,2) CHECK (price > 0),
  stock INT DEFAULT 0 CHECK (stock >= 0),
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (category_id) REFERENCES product_categories(category_id)
);

INSERT INTO product_categories VALUES (1, 'Electronics', 'Tech products'), (2, 'Books', 'Reading materials');

INSERT INTO products VALUES
  (101, 'Laptop', 1, 45000.00, 5, true),
  (102, 'Python Book', 2, 599.00, 20, true),
  (103, 'Monitor', 1, 12000.00, 3, true),
  (104, 'SQL Guide', 2, 799.00, 15, true),
  (105, 'USB Cable', 1, 199.00, 50, true);

SELECT p.product_id, p.product_name, pc.category_name, p.price, p.stock
FROM products p
JOIN product_categories pc ON p.category_id = pc.category_id
WHERE p.is_available = true
ORDER BY p.price DESC;

-- Try to violate constraints:
-- INSERT INTO products VALUES (106, 'Test', 99, 100, 5, true);
-- ERROR: category_id=99 doesn't exist (FOREIGN KEY violated)
-- INSERT INTO products VALUES (107, 'Test2', 1, -100, 0, true);
-- ERROR: price = -100 fails CHECK constraint`,
    output: `product_id | product_name | category_name | price    | stock
-----------|--------------|---------------|---------| ------
101        | Laptop       | Electronics   | 45000.00| 5
103        | Monitor      | Electronics   | 12000.00| 3
104        | SQL Guide    | Books         | 799.00  | 15
102        | Python Book  | Books         | 599.00  | 20
105        | USB Cable    | Electronics   | 199.00  | 50`,
    notes: [
      'Composite PRIMARY KEY: PRIMARY KEY (col1, col2) uniquely identifies by both columns.',
      'CASCADE on FOREIGN KEY: CASCADE DELETE removes child rows when parent is deleted.',
      'UNIQUE constraint allows one NULL; PRIMARY KEY does not.',
    ],
    practice: {
      title: 'Design a Library Loans Table',
      description: 'Create: books(book_id int PK, title varchar not null, isbn varchar unique), members(member_id int PK, name varchar not null), loans(loan_id int PK, book_id FK, member_id FK, loan_date date not null, return_date date). Add constraints: prevent negative IDs, ensure valid dates.',
      startCode: '',
      hint: 'Use CHECK to validate loan_date < return_date or return_date IS NULL (not yet returned).',
    },
  },

  {
    id: 'sql-insert-multiple-rows',
    category: 'Modifying Data',
    title: 'INSERT Multiple Rows',
    difficulty: 'Beginner',
    theory: [
      'INSERT INTO ... VALUES can insert a single row or multiple rows at once. Multiple-row INSERT is much faster than running INSERT separately for each row.',
      'Syntax: INSERT INTO table (col1, col2) VALUES (val1, val2), (val3, val4), (val5, val6);',
      'This is the most efficient way to bulk-load data. In real apps, use LOAD DATA INFILE (MySQL) or COPY (PostgreSQL) for very large datasets.',
    ],
    syntax: `-- Single row
INSERT INTO table (col1, col2) VALUES (val1, val2);

-- Multiple rows
INSERT INTO table (col1, col2) VALUES
  (val1, val2),
  (val3, val4),
  (val5, val6);`,
    code: `CREATE TABLE employees (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(50),
  salary DECIMAL(10,2),
  joining_date DATE
);

-- Insert 8 employees at once
INSERT INTO employees (emp_id, name, department, salary, joining_date) VALUES
  (1, 'Arjun Singh', 'Engineering', 85000.00, '2023-01-15'),
  (2, 'Priya Sharma', 'Engineering', 92000.00, '2022-06-20'),
  (3, 'Rahul Verma', 'Sales', 65000.00, '2023-03-10'),
  (4, 'Sneha Reddy', 'Marketing', 70000.00, '2022-11-05'),
  (5, 'Vikram Patel', 'Engineering', 88000.00, '2023-05-12'),
  (6, 'Anjali Nair', 'HR', 62000.00, '2023-02-28'),
  (7, 'Deepak Kumar', 'Sales', 68000.00, '2022-09-18'),
  (8, 'Kavya Iyer', 'Marketing', 75000.00, '2023-04-07');

SELECT emp_id, name, department, salary
FROM employees
WHERE department IN ('Engineering', 'Sales')
ORDER BY salary DESC;`,
    output: `emp_id | name            | department   | salary
-------|-----------------|-------------|----------
2      | Priya Sharma    | Engineering | 92000.00
1      | Arjun Singh     | Engineering | 85000.00
5      | Vikram Patel    | Engineering | 88000.00
7      | Deepak Kumar    | Sales       | 68000.00
3      | Rahul Verma     | Sales       | 65000.00`,
    notes: [
      'Multi-row INSERT executes as a single transaction — all rows succeed or all fail.',
      'For 10,000+ rows, consider LOAD DATA INFILE for 10-100x performance improvement.',
      'Always list column names explicitly to avoid issues if table structure changes.',
    ],
    practice: {
      title: 'Populate a Class Roster',
      description: 'Insert 15 students into a students table (id, name, class, section) with multiple INSERT rows. Then display: all Class 10 students grouped by section.',
      startCode: '',
      hint: 'Use one INSERT statement with 15 VALUE tuples. GROUP BY section to show section-wise count.',
    },
  },

  {
    id: 'sql-update-delete-where',
    category: 'Modifying Data',
    title: 'UPDATE & DELETE with WHERE Clauses',
    difficulty: 'Beginner',
    theory: [
      'UPDATE modifies existing rows. WHERE specifies which rows. DELETE removes rows. Both MUST have WHERE to avoid affecting all rows.',
      'Safe pattern: (1) write SELECT with the same WHERE to verify affected rows, (2) run UPDATE/DELETE, (3) verify changes.',
      'In production, wrap dangerous operations in transactions: BEGIN, run the command, then COMMIT or ROLLBACK.',
    ],
    syntax: `-- Safe UPDATE pattern:
SELECT * FROM table WHERE condition;  -- verify first
UPDATE table SET col = value WHERE condition;

-- Safe DELETE:
SELECT * FROM table WHERE condition;  -- verify first
DELETE FROM table WHERE condition;`,
    code: `CREATE TABLE inventory (
  item_id INT PRIMARY KEY,
  item_name VARCHAR(100),
  category VARCHAR(50),
  quantity INT,
  price DECIMAL(8,2),
  last_restocked DATE
);

INSERT INTO inventory VALUES
  (1, 'Notebook', 'Stationery', 45, 50.00, '2025-02-15'),
  (2, 'Pen', 'Stationery', 150, 15.00, '2025-01-20'),
  (3, 'Textbook', 'Books', 20, 299.00, '2024-12-10'),
  (4, 'Calculator', 'Electronics', 8, 450.00, '2025-03-01'),
  (5, 'Pencil Set', 'Stationery', 2, 99.00, '2024-11-30'),
  (6, 'Ruler', 'Stationery', 30, 25.00, '2025-02-01');

-- STEP 1: Verify what we'll update (low stock items)
SELECT * FROM inventory WHERE quantity < 10;

-- STEP 2: Update low-stock items (restocking)
UPDATE inventory SET quantity = quantity + 50 WHERE quantity < 10;

-- Verify the update
SELECT item_id, item_name, quantity FROM inventory WHERE item_id IN (3, 5);

-- STEP 3: Verify items to delete (discontinued old items)
SELECT * FROM inventory WHERE category = 'Books' AND last_restocked < '2025-01-01';

-- STEP 4: Delete discontinued items
DELETE FROM inventory WHERE category = 'Books' AND last_restocked < '2025-01-01';

-- Show final inventory
SELECT item_id, item_name, category, quantity, price
FROM inventory
ORDER BY category, quantity DESC;`,
    output: `-- After UPDATE (low stock restocked):
item_id | item_name   | quantity
--------|-------------|----------
3       | Textbook    | 70
5       | Pencil Set  | 52

-- After DELETE (books removed):
item_id | item_name     | category     | quantity | price
--------|---------------|------------|----------|----------
2       | Pen           | Stationery |   150    | 15.00
1       | Notebook      | Stationery |   45     | 50.00
6       | Ruler         | Stationery |   30     | 25.00
4       | Calculator    | Electronics|   58     | 450.00`,
    notes: [
      'Always run SELECT first with the same WHERE to confirm you\'re targeting the right rows.',
      'Use transactions for safety: BEGIN; UPDATE ...; [check]; COMMIT; or ROLLBACK;',
      'Never run UPDATE or DELETE without WHERE in production.',
    ],
    practice: {
      title: 'Inventory Management Operations',
      description: 'Given a products table: (1) SELECT and UPDATE all items with price < 100 to increase price by 10%. (2) SELECT and DELETE all items with quantity = 0. Show before/after counts.',
      startCode: '',
      hint: 'For price increase: UPDATE products SET price = price * 1.1 WHERE price < 100. For delete: DELETE FROM products WHERE quantity = 0.',
    },
  },

  {
    id: 'sql-like-wildcards',
    category: 'Querying Data',
    title: 'LIKE Operator — Text Pattern Matching',
    difficulty: 'Beginner',
    theory: [
      'LIKE matches text patterns. % matches any sequence (0 or more chars), _ matches exactly one char. Use LIKE with WHERE to find rows containing a substring.',
      'Case sensitivity: LIKE is case-insensitive in MySQL, case-sensitive in PostgreSQL (use ILIKE for case-insensitive). Always use LOWER() for reliable case-insensitive searches.',
      'Performance: LIKE %value% (leading wildcard) cannot use indexes. LIKE value% (trailing wildcard) can use an index for faster searches.',
    ],
    syntax: `WHERE name LIKE 'A%'        -- starts with A
WHERE name LIKE '%ar%'      -- contains 'ar' anywhere
WHERE name LIKE '_mail'     -- 5 chars, ends in 'mail'
WHERE name LIKE 'J%n'       -- starts with J, ends with n
WHERE email LIKE '%@gmail%' -- Gmail emails`,
    code: `CREATE TABLE customers (
  cust_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  city VARCHAR(50)
);

INSERT INTO customers VALUES
  (1, 'Arjun Kumar', 'arjun.k@gmail.com', '9876543210', 'Mumbai'),
  (2, 'Priya Sharma', 'priya@yahoo.com', '9123456789', 'Delhi'),
  (3, 'Rajesh Patel', 'raj.patel@gmail.com', '9988776655', 'Ahmedabad'),
  (4, 'Anjali Singh', 'anjali.singh@outlook.com', '9001122334', 'Chennai'),
  (5, 'Ramesh Kumar', 'ram@yahoo.co.in', '9555666777', 'Bangalore'),
  (6, 'Neha Reddy', 'neha.reddy@gmail.com', '9444333222', 'Hyderabad');

-- Names starting with 'A'
SELECT name FROM customers WHERE name LIKE 'A%';

-- Names containing 'ar' or 'ar'
SELECT name FROM customers WHERE LOWER(name) LIKE '%ar%';

-- Gmail users only
SELECT cust_id, name, email FROM customers WHERE email LIKE '%@gmail.com';

-- Names with pattern R_j (R, any char, j)
SELECT name FROM customers WHERE name LIKE 'R_j%';

-- Phone numbers starting with 99
SELECT name, phone FROM customers WHERE phone LIKE '99%';`,
    output: `-- Names starting with A:
Arjun Kumar
Anjali Singh

-- Names containing 'ar' (case-insensitive):
Arjun Kumar
Rajesh Patel
Ramesh Kumar

-- Gmail users:
1 | Arjun Kumar  | arjun.k@gmail.com
3 | Rajesh Patel | raj.patel@gmail.com
6 | Neha Reddy   | neha.reddy@gmail.com`,
    notes: [
      'LIKE is slower than exact match (=). Use = when possible, LIKE only for partial matches.',
      'Always use LOWER(column) LIKE pattern for case-insensitive search to ensure consistency.',
      'NOT LIKE: WHERE name NOT LIKE \'%test%\' excludes matches.',
    ],
    practice: {
      title: 'Customer Search Queries',
      description: 'Write LIKE queries to find: (1) all names starting with vowels A-E. (2) emails from specific domain (outlook.com). (3) phone numbers with pattern 9___22____ (9, 3 digits, 22, 4 digits). (4) names with exactly 5-character first word.',
      startCode: '',
      hint: 'Use LOWER(name) LIKE \'[ae]%\' for vowels, or separate with OR. For phone: WHERE phone LIKE \'9___22____\'.',
    },
  },

  {
    id: 'sql-between-in-notin',
    category: 'Querying Data',
    title: 'BETWEEN, IN, NOT IN Operators',
    difficulty: 'Beginner',
    theory: [
      'BETWEEN x AND y is shorthand for >= x AND <= y (inclusive on both ends). Works with numbers, dates, text.',
      'IN (val1, val2, val3) matches if column equals any value in the list. Faster than multiple ORs.',
      'NOT IN (list) excludes rows where column matches any value. Beware: if list contains NULL, NOT IN returns no rows. Use NOT EXISTS instead.',
    ],
    syntax: `WHERE marks BETWEEN 70 AND 90
WHERE city IN ('Delhi', 'Mumbai', 'Bangalore')
WHERE status NOT IN ('inactive', 'deleted')
WHERE date BETWEEN '2025-01-01' AND '2025-12-31'`,
    code: `CREATE TABLE sales_records (
  sale_id INT PRIMARY KEY,
  salesperson VARCHAR(50),
  region VARCHAR(30),
  amount DECIMAL(10,2),
  sale_date DATE,
  status VARCHAR(20)
);

INSERT INTO sales_records VALUES
  (1, 'Priya', 'North', 45000.00, '2025-01-15', 'completed'),
  (2, 'Rahul', 'South', 32000.00, '2025-01-20', 'pending'),
  (3, 'Sneha', 'East', 58000.00, '2025-02-10', 'completed'),
  (4, 'Arun', 'West', 41000.00, '2025-02-15', 'completed'),
  (5, 'Priya', 'North', 67000.00, '2025-03-05', 'completed'),
  (6, 'Vikram', 'Central', 29000.00, '2025-03-10', 'cancelled'),
  (7, 'Sneha', 'East', 73000.00, '2025-03-12', 'completed');

-- Sales in North/South/East regions
SELECT salesperson, region, amount FROM sales_records
WHERE region IN ('North', 'South', 'East')
ORDER BY amount DESC;

-- Sales between 40k and 70k
SELECT salesperson, amount FROM sales_records
WHERE amount BETWEEN 40000 AND 70000
ORDER BY amount;

-- Q1 2025 (Jan-Mar)
SELECT salesperson, sale_date, amount FROM sales_records
WHERE sale_date BETWEEN '2025-01-01' AND '2025-03-31'
ORDER BY sale_date;

-- Completed or pending (exclude cancelled)
SELECT sale_id, salesperson, amount, status FROM sales_records
WHERE status NOT IN ('cancelled')
ORDER BY amount DESC;`,
    output: `-- Regions (North/South/East):
Priya   | North | 45000.00
Sneha   | East  | 58000.00
Sneha   | East  | 73000.00
Rahul   | South | 32000.00

-- Amount BETWEEN 40k-70k:
Priya   | 45000.00
Arun    | 41000.00
Sneha   | 58000.00
Priya   | 67000.00

-- Q1 2025:
Priya   | 2025-01-15 | 45000.00
Rahul   | 2025-01-20 | 32000.00
...
Sneha   | 2025-03-12 | 73000.00`,
    notes: [
      'BETWEEN is inclusive on both ends — BETWEEN 1 AND 100 includes 1 and 100.',
      'IN with a subquery: WHERE id IN (SELECT id FROM table WHERE...) — watch for NULLs in subquery.',
      'NOT IN with NULLs is dangerous; use NOT EXISTS or a LEFT JOIN instead.',
    ],
    practice: {
      title: 'Sales Filter Queries',
      description: '(1) Find sales amounts between 30k-60k. (2) Sales in Q1 (Jan-Mar). (3) Salespersons in [Priya, Sneha, Arun]. (4) Exclude cancelled/pending sales. (5) Amounts NOT IN [1000, 5000, 10000].',
      startCode: '',
      hint: 'Use BETWEEN for ranges, IN for lists, NOT IN to exclude. For dates: BETWEEN \'2025-01-01\' AND \'2025-03-31\'.',
    },
  },

  {
    id: 'sql-null-coalesce',
    category: 'Querying Data',
    title: 'NULL Handling & COALESCE Function',
    difficulty: 'Intermediate',
    theory: [
      'NULL represents missing or unknown data — it\'s not zero, not empty string, not false. IS NULL and IS NOT NULL are the only ways to check for NULL.',
      'COALESCE(expr1, expr2, expr3, ...) returns the first non-NULL value. Useful for providing defaults, handling missing data in JOINs.',
      'IFNULL (MySQL) and NVLEVEL (Oracle) are single-argument alternatives. Arithmetic with NULL always returns NULL.',
    ],
    syntax: `WHERE column IS NULL
WHERE column IS NOT NULL
COALESCE(col1, col2, col3, 'default')
IFNULL(col, 'default')  -- MySQL only`,
    code: `CREATE TABLE employees (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(15),
  emergency_contact VARCHAR(100),
  salary DECIMAL(10,2),
  bonus DECIMAL(10,2)
);

INSERT INTO employees VALUES
  (1, 'Arjun', '9876543210', 'Priya Sharma', 80000.00, 5000.00),
  (2, 'Priya', NULL, NULL, 92000.00, NULL),
  (3, 'Rahul', '9988776655', 'Anjali Singh', 75000.00, 3000.00),
  (4, 'Sneha', '9123456789', NULL, 88000.00, NULL),
  (5, 'Vikram', NULL, 'Deepa Nair', 70000.00, 2000.00);

-- Show employees missing contact info
SELECT emp_id, name, phone, emergency_contact
FROM employees
WHERE phone IS NULL OR emergency_contact IS NULL;

-- Show employee contacts with defaults
SELECT emp_id, name,
  COALESCE(phone, 'No phone') AS phone_display,
  COALESCE(emergency_contact, 'No emergency contact') AS contact_display
FROM employees;

-- Total compensation (salary + bonus, handle NULL bonus)
SELECT emp_id, name, salary,
  COALESCE(bonus, 0) AS bonus,
  salary + COALESCE(bonus, 0) AS total_comp
FROM employees
ORDER BY total_comp DESC;

-- Count non-NULL bonus entries
SELECT COUNT(*) AS total_employees,
  COUNT(bonus) AS employees_with_bonus,
  SUM(COALESCE(bonus, 0)) AS total_bonus_paid
FROM employees;`,
    output: `-- Employees missing contact info:
emp_id | name  | phone | emergency_contact
-------|-------|-------|-------------------
2      | Priya | NULL  | NULL
4      | Sneha | 9...  | NULL
5      | Vikram| NULL  | Deepa Nair

-- With COALESCE:
emp_id | name   | phone_display | contact_display
-------|--------|---------------|-------------------
1      | Arjun  | 9876543210    | Priya Sharma
2      | Priya  | No phone      | No emergency contact

-- Total compensation:
emp_id | name   | salary  | bonus | total_comp
-------|--------|---------|-------|----------
2      | Priya  | 92000   | 0     | 92000
4      | Sneha  | 88000   | 0     | 88000
1      | Arjun  | 80000   | 5000  | 85000`,
    notes: [
      'COUNT(*) counts all rows including NULLs. COUNT(column) counts non-NULL values only.',
      'NULL + any_value = NULL. Always use COALESCE when doing arithmetic with possibly-NULL columns.',
      'INNER JOIN excludes NULL foreign keys; LEFT JOIN preserves them (shows NULL in right table columns).',
    ],
    practice: {
      title: 'Data Quality Report',
      description: 'Find: (1) all rows with NULL values. (2) Use COALESCE to show "Unknown" for NULL email. (3) Count non-NULL values per column. (4) Calculate total_value handling NULLs.',
      startCode: '',
      hint: 'IS NULL finds NULLs. COUNT(column) vs COUNT(*) shows difference. COALESCE(col, \'Unknown\') provides default.',
    },
  },

  {
    id: 'sql-distinct-limit',
    category: 'Querying Data',
    title: 'DISTINCT & LIMIT — Unique Records & Result Limiting',
    difficulty: 'Beginner',
    theory: [
      'DISTINCT removes duplicate rows from results — shows each unique combination once. Useful for finding unique values or counts.',
      'LIMIT restricts how many rows are returned. OFFSET skips rows (for pagination). Essential for performance on large datasets.',
      'DISTINCT is applied before ORDER BY and LIMIT, so it\'s an expensive operation on large tables.',
    ],
    syntax: `SELECT DISTINCT column FROM table;
SELECT DISTINCT col1, col2 FROM table;  -- unique pairs

SELECT * FROM table LIMIT 10;
SELECT * FROM table LIMIT 10 OFFSET 20;  -- rows 21-30

SELECT COUNT(DISTINCT column) FROM table;`,
    code: `CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  customer_name VARCHAR(50),
  city VARCHAR(30),
  product VARCHAR(50),
  amount DECIMAL(10,2),
  order_date DATE
);

INSERT INTO orders VALUES
  (1, 101, 'Arjun', 'Mumbai', 'Laptop', 45000, '2025-01-10'),
  (2, 102, 'Priya', 'Delhi', 'Phone', 25000, '2025-01-15'),
  (3, 101, 'Arjun', 'Mumbai', 'Tablet', 15000, '2025-02-01'),
  (4, 103, 'Rahul', 'Bangalore', 'Laptop', 45000, '2025-02-05'),
  (5, 102, 'Priya', 'Delhi', 'Phone', 28000, '2025-02-10'),
  (6, 104, 'Sneha', 'Hyderabad', 'Tablet', 16000, '2025-02-15'),
  (7, 101, 'Arjun', 'Mumbai', 'Watch', 5000, '2025-03-01');

-- Unique customers
SELECT DISTINCT customer_name, city FROM orders;

-- Unique cities
SELECT DISTINCT city FROM orders ORDER BY city;

-- Count unique customers
SELECT COUNT(DISTINCT customer_id) AS unique_customers FROM orders;

-- Top 3 orders by amount
SELECT order_id, customer_name, product, amount
FROM orders
ORDER BY amount DESC
LIMIT 3;

-- Page 2: rows 6-10
SELECT order_id, customer_name, product, amount
FROM orders
ORDER BY order_id
LIMIT 5 OFFSET 5;

-- Unique products ordered
SELECT DISTINCT product FROM orders;`,
    output: `-- Unique customers:
Arjun  | Mumbai
Priya  | Delhi
Rahul  | Bangalore
Sneha  | Hyderabad

-- Unique cities:
Bangalore
Delhi
Hyderabad
Mumbai

-- Top 3 orders:
order_id | customer | product | amount
---------|----------|---------|----------
1        | Arjun    | Laptop  | 45000
4        | Rahul    | Laptop  | 45000
5        | Priya    | Phone   | 28000

-- Unique products:
Laptop
Phone
Tablet
Watch`,
    notes: [
      'DISTINCT on multiple columns finds unique combinations: SELECT DISTINCT col1, col2 finds unique (col1, col2) pairs.',
      'LIMIT without ORDER BY returns arbitrary order — always use ORDER BY when you care about which rows you get.',
      'For pagination: page N with page_size P uses LIMIT P OFFSET (N-1)*P.',
    ],
    practice: {
      title: 'Analytics Queries',
      description: '(1) Find distinct product categories. (2) Show top 5 highest-priced items. (3) Count unique customers. (4) Implement pagination: 3 orders per page, show page 2.',
      startCode: '',
      hint: 'SELECT DISTINCT for unique values. LIMIT N OFFSET (page-1)*N for pagination.',
    },
  },

  {
    id: 'sql-self-join',
    category: 'Multi-Table Queries',
    title: 'Self-Join — Joining a Table to Itself',
    difficulty: 'Intermediate',
    theory: [
      'A self-join joins a table to a copy of itself, useful for finding relationships within the same table: employee-manager hierarchy, product comparisons, duplicate detection.',
      'Use table aliases (a, b) to distinguish the two copies: FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.emp_id.',
      'Common uses: "find all employees and their managers", "find products in the same category with price differences", "find pairs of employees in the same department".',
    ],
    syntax: `-- Employee and manager (both from employees table)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;

-- Find pairs of friends in the same city
SELECT f1.name, f2.name, f1.city
FROM friends f1
JOIN friends f2 ON f1.city = f2.city AND f1.id < f2.id;`,
    code: `CREATE TABLE employees (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100),
  manager_id INT,
  department VARCHAR(50)
);

INSERT INTO employees VALUES
  (1, 'CEO', NULL, 'Executive'),
  (2, 'Engineering Manager', 1, 'Engineering'),
  (3, 'Sales Manager', 1, 'Sales'),
  (4, 'Arjun Dev', 2, 'Engineering'),
  (5, 'Priya Dev', 2, 'Engineering'),
  (6, 'Rahul Sales', 3, 'Sales'),
  (7, 'Sneha Sales', 3, 'Sales'),
  (8, 'HR Manager', 1, 'HR');

-- Each employee with their manager
SELECT
  e.name AS employee,
  e.department,
  m.name AS manager,
  m.department AS mgr_dept
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id
ORDER BY e.manager_id, e.name;

-- Find all pairs of employees in the same department
SELECT
  e1.name AS employee_1,
  e2.name AS employee_2,
  e1.department
FROM employees e1
JOIN employees e2 ON e1.department = e2.department AND e1.emp_id < e2.emp_id
WHERE e1.department != 'Executive'
ORDER BY e1.department, e1.name;

-- Org hierarchy depth
SELECT
  e.name AS subordinate,
  m.name AS direct_manager,
  COALESCE(gm.name, 'None') AS grand_manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id
LEFT JOIN employees gm ON m.manager_id = gm.emp_id
ORDER BY e.emp_id;`,
    output: `-- Employee with Manager:
employee          | department    | manager             | mgr_dept
------------------|---------------|---------------------|----------
CEO                | Executive     | NULL                | NULL
Engineering Mgr    | Engineering   | CEO                 | Executive
Sales Manager      | Sales         | CEO                 | Executive
Arjun Dev          | Engineering   | Engineering Mgr     | Engineering
Priya Dev          | Engineering   | Engineering Mgr     | Engineering
Rahul Sales        | Sales         | Sales Manager       | Sales
Sneha Sales        | Sales         | Sales Manager       | Sales
HR Manager         | HR            | CEO                 | Executive

-- Pairs in same department:
Arjun Dev   | Priya Dev   | Engineering
Rahul Sales | Sneha Sales | Sales`,
    notes: [
      'Always use aliases (e, m, e1, e2) to avoid ambiguity in self-joins.',
      'LEFT JOIN preserves top-level managers (those with NULL manager_id).',
      'Self-join can chain: e.manager_id = m.emp_id AND m.manager_id = gm.emp_id for multi-level hierarchy.',
    ],
    practice: {
      title: 'Company Hierarchy Report',
      description: 'Using employees table: (1) Show each employee and their manager. (2) Find all employees reporting to "CEO" (direct). (3) Find pairs of employees in the same department. (4) Count team size per manager.',
      startCode: '',
      hint: 'LEFT JOIN for hierarchy to include root nodes. Self-join with AND condition for pairs: e1.id < e2.id avoids duplicates.',
    },
  },

  {
    id: 'sql-union-intersect-except',
    category: 'Multi-Table Queries',
    title: 'Set Operations — UNION, INTERSECT, EXCEPT',
    difficulty: 'Intermediate',
    theory: [
      'UNION combines results from two or more queries into a single result, removing duplicates. UNION ALL keeps duplicates.',
      'INTERSECT returns only rows that appear in both queries. EXCEPT returns rows from the first query that don\'t appear in the second.',
      'All queries must have the same number of columns with compatible types. Column names come from the first query.',
    ],
    syntax: `SELECT col FROM table1
UNION
SELECT col FROM table2;

SELECT col FROM table1
INTERSECT
SELECT col FROM table2;

SELECT col FROM table1
EXCEPT
SELECT col FROM table2;`,
    code: `CREATE TABLE current_members (
  member_id INT,
  name VARCHAR(50),
  city VARCHAR(30)
);

CREATE TABLE alumni (
  member_id INT,
  name VARCHAR(50),
  city VARCHAR(30)
);

INSERT INTO current_members VALUES
  (1, 'Arjun', 'Mumbai'),
  (2, 'Priya', 'Delhi'),
  (3, 'Rahul', 'Bangalore'),
  (4, 'Sneha', 'Hyderabad');

INSERT INTO alumni VALUES
  (1, 'Arjun', 'Mumbai'),
  (5, 'Vikram', 'Pune'),
  (6, 'Anjali', 'Chennai'),
  (3, 'Rahul', 'Bangalore');

-- All people (current or alumni) — UNION
SELECT name, city, 'Current' AS status
FROM current_members
UNION
SELECT name, city, 'Alumni' AS status
FROM alumni
ORDER BY name;

-- People who are both current and alumni (INTERSECT)
SELECT name, city
FROM current_members
INTERSECT
SELECT name, city
FROM alumni;

-- Current members not in alumni list (EXCEPT)
SELECT name, city
FROM current_members
EXCEPT
SELECT name, city
FROM alumni;

-- Alumni not current (reverse EXCEPT)
SELECT name, city
FROM alumni
EXCEPT
SELECT name, city
FROM current_members;`,
    output: `-- UNION (all unique people):
name   | city       | status
-------|------------|--------
Anjali | Chennai    | Alumni
Arjun  | Mumbai     | Current
Priya  | Delhi      | Current
Rahul  | Bangalore  | Current
Sneha  | Hyderabad  | Current
Vikram | Pune       | Alumni

-- INTERSECT (both current and alumni):
name  | city
-------|----------
Arjun  | Mumbai
Rahul  | Bangalore

-- EXCEPT (current only, not alumni):
name  | city
-------|----------
Priya | Delhi
Sneha | Hyderabad

-- Alumni not current:
name   | city
-------|--------
Vikram | Pune
Anjali | Chennai`,
    notes: [
      'UNION removes duplicates; UNION ALL keeps them. UNION ALL is faster if duplicates are okay.',
      'Column order and type must match — SELECT 1, \'a\' UNION SELECT \'b\', 2 will likely fail.',
      'INTERSECT and EXCEPT may not be available in all databases (MySQL lacks them; use JOIN instead).',
    ],
    practice: {
      title: 'Student Overlap Analysis',
      description: 'Given tables: science_students(id, name) and commerce_students(id, name). Find: (1) all students (union). (2) students in both streams (intersect). (3) science-only students (except). (4) commerce-only students.',
      startCode: '',
      hint: 'UNION for all, INTERSECT for both, EXCEPT for only-in-first. Each query selects same columns.',
    },
  },

  {
    id: 'sql-correlated-subquery',
    category: 'SQL Advanced',
    title: 'Correlated Subqueries — Advanced Filtering',
    difficulty: 'Advanced',
    theory: [
      'A correlated subquery references outer query columns — it runs once per outer row, making it slower than JOINs but more readable for some problems.',
      'Use case: "find students scoring above their class average", "find orders with above-average amount", "find employees with more-than-average salary for their department".',
      'Prefer JOINs for performance. Use correlated subqueries when readability is more important or the logic is complex.',
    ],
    syntax: `SELECT name, marks FROM students s
WHERE marks > (
    SELECT AVG(marks) FROM students WHERE class_id = s.class_id
);

SELECT customer, amount FROM orders o
WHERE amount > (
    SELECT AVG(amount) FROM orders WHERE customer_id = o.customer_id
);`,
    code: `CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(50),
  class_id INT,
  marks INT
);

INSERT INTO students VALUES
  (1, 'Arjun', 10, 85),
  (2, 'Priya', 10, 92),
  (3, 'Rahul', 10, 78),
  (4, 'Sneha', 11, 88),
  (5, 'Vikram', 11, 76),
  (6, 'Anjali', 11, 91);

-- Students scoring above their class average
SELECT
  s1.name,
  s1.class_id,
  s1.marks,
  (SELECT ROUND(AVG(marks), 1) FROM students s2 WHERE s2.class_id = s1.class_id) AS class_avg,
  s1.marks - (SELECT AVG(marks) FROM students s2 WHERE s2.class_id = s1.class_id) AS above_avg
FROM students s1
WHERE s1.marks > (
    SELECT AVG(marks) FROM students s2 WHERE s2.class_id = s1.class_id
)
ORDER BY s1.class_id, s1.marks DESC;

-- Exists version: students who scored max in their class
SELECT name, class_id, marks
FROM students s1
WHERE EXISTS (
    SELECT 1 FROM students s2
    WHERE s2.class_id = s1.class_id
    AND s2.marks = (SELECT MAX(marks) FROM students s3 WHERE s3.class_id = s1.class_id)
    AND s1.student_id = s2.student_id
);

-- With count: find class rank
SELECT
  s1.name,
  s1.class_id,
  s1.marks,
  (SELECT COUNT(*) FROM students s2
   WHERE s2.class_id = s1.class_id AND s2.marks > s1.marks) + 1 AS rank_in_class
FROM students s1
ORDER BY s1.class_id, rank_in_class;`,
    output: `-- Above class average:
name   | class | marks | class_avg | above_avg
-------|-------|-------|-----------|----------
Priya  | 10    | 92    | 85.0      | 7.0
Arjun  | 10    | 85    | 85.0      | 0.0
Anjali | 11    | 91    | 85.0      | 6.0
Sneha  | 11    | 88    | 85.0      | 3.0

-- Class rank:
name   | class | marks | rank
-------|-------|-------|-----
Priya  | 10    | 92    | 1
Arjun  | 10    | 85    | 2
Rahul  | 10    | 78    | 3
Anjali | 11    | 91    | 1
Sneha  | 11    | 88    | 2
Vikram | 11    | 76    | 3`,
    notes: [
      'Correlated subqueries run once per outer row — O(n²) complexity. Large tables become slow quickly.',
      'EXISTS is faster than IN when the inner query returns many rows.',
      'Window functions (RANK, ROW_NUMBER) are modern replacements for correlated subqueries — prefer them for ranking.',
    ],
    practice: {
      title: 'Advanced Student Analysis',
      description: '(1) Find students above their class average. (2) Rank students within each class. (3) Find students with highest marks in their class. (4) Show each student\'s percentile rank within their class.',
      startCode: '',
      hint: 'Correlated subquery for class avg: (SELECT AVG(marks) FROM students s2 WHERE s2.class_id = s1.class_id). Rank: COUNT(*) WHERE marks > current_marks)',
    },
  },

  {
    id: 'sql-stored-procedures',
    category: 'Database Design',
    title: 'Stored Procedures',
    difficulty: 'Advanced',
    theory: [
      'A stored procedure is a set of SQL statements stored in the database that can be executed repeatedly. Think of it as a SQL function or subroutine.',
      'Benefits: reusable code, better security (restrict direct table access), performance (pre-compiled), data validation in one place.',
      'Stored procedures can have input/output parameters, loops, conditionals, and error handling. They run on the server, reducing network traffic.',
    ],
    syntax: `-- Create stored procedure
CREATE PROCEDURE proc_name (IN param1 INT, OUT result VARCHAR(100))
BEGIN
  -- SQL statements
  SELECT ... INTO result FROM ...;
END;

-- Call it
CALL proc_name(5, @result);
SELECT @result;`,
    code: `-- Stored procedure: calculate student grade
CREATE PROCEDURE GetStudentGrade (IN p_student_id INT, OUT p_grade VARCHAR(5))
BEGIN
  DECLARE v_marks INT;

  SELECT marks INTO v_marks FROM students WHERE student_id = p_student_id;

  IF v_marks IS NULL THEN
    SET p_grade = 'N/A';
  ELSEIF v_marks >= 90 THEN
    SET p_grade = 'A+';
  ELSEIF v_marks >= 80 THEN
    SET p_grade = 'A';
  ELSEIF v_marks >= 70 THEN
    SET p_grade = 'B';
  ELSEIF v_marks >= 40 THEN
    SET p_grade = 'D';
  ELSE
    SET p_grade = 'F';
  END IF;
END;

-- Call the procedure
CALL GetStudentGrade(1, @grade);
SELECT @grade AS student_grade;

-- Stored procedure: enroll student in course
CREATE PROCEDURE EnrollStudent (
  IN p_student_id INT,
  IN p_course_id INT,
  OUT p_message VARCHAR(200)
)
BEGIN
  DECLARE v_count INT;

  -- Check if already enrolled
  SELECT COUNT(*) INTO v_count FROM enrollments
  WHERE student_id = p_student_id AND course_id = p_course_id;

  IF v_count > 0 THEN
    SET p_message = 'Student already enrolled';
  ELSE
    INSERT INTO enrollments (student_id, course_id, enrollment_date)
    VALUES (p_student_id, p_course_id, CURDATE());
    SET p_message = 'Enrollment successful';
  END IF;
END;

-- Call enrollment procedure
CALL EnrollStudent(5, 101, @msg);
SELECT @msg;`,
    output: `-- After calling GetStudentGrade:
student_grade: A+

-- After calling EnrollStudent:
@msg: Enrollment successful
(or: Student already enrolled if already enrolled)`,
    notes: [
      'Stored procedures are database-specific (MySQL, PostgreSQL, SQL Server have different syntax).',
      'Use procedures for complex business logic; keep simple queries as plain SQL.',
      'Procedures can improve security by restricting direct table access — users call procedures instead.',
    ],
    practice: {
      title: 'Create Utility Procedures',
      description: 'Write: (1) GetClassAverage(IN p_class_id, OUT p_avg) to calculate class average. (2) AddStudent(IN name, phone, email) that inserts and returns the new student_id. (3) GetTopStudents(IN p_class_id, IN p_limit) returning top N students by marks.',
      startCode: '',
      hint: 'Use SELECT ... INTO for capturing values. Use INSERT ... RETURNING (PostgreSQL) or LAST_INSERT_ID() (MySQL) to get new IDs.',
    },
  },

  {
    id: 'sql-triggers',
    category: 'Database Design',
    title: 'Triggers — Automatic Actions',
    difficulty: 'Advanced',
    theory: [
      'A trigger is a special stored procedure that automatically executes (triggers) in response to specific events: INSERT, UPDATE, DELETE on a table.',
      'Common uses: maintaining audit trails, enforcing complex constraints, updating summary tables, cascading updates/deletes.',
      'Timing: BEFORE (validation, prevent action) or AFTER (logging, side effects). Triggers run on server automatically — application code doesn\'t need to remember.',
    ],
    syntax: `CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE ON table_name
FOR EACH ROW
BEGIN
  -- trigger body (MySQL syntax)
END;

-- PostgreSQL syntax:
CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE ON table_name
FOR EACH ROW EXECUTE FUNCTION func_name();`,
    code: `-- Setup: products table with stock
CREATE TABLE products (
  product_id INT PRIMARY KEY,
  name VARCHAR(100),
  stock INT
);

CREATE TABLE stock_history (
  history_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  old_stock INT,
  new_stock INT,
  changed_at DATETIME,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO products VALUES (1, 'Laptop', 10), (2, 'Mouse', 50);

-- Trigger: log stock changes to audit table
CREATE TRIGGER log_stock_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  IF OLD.stock <> NEW.stock THEN
    INSERT INTO stock_history (product_id, old_stock, new_stock, changed_at)
    VALUES (NEW.product_id, OLD.stock, NEW.stock, NOW());
  END IF;
END;

-- Trigger: prevent negative stock
CREATE TRIGGER prevent_negative_stock
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
  IF NEW.stock < 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Stock cannot be negative';
  END IF;
END;

-- Test: update stock
UPDATE products SET stock = stock - 5 WHERE product_id = 1;  -- triggers fire

-- Check history
SELECT * FROM stock_history;

-- Try to make negative (should fail)
-- UPDATE products SET stock = -1 WHERE product_id = 1;`,
    output: `-- stock_history after update:
history_id | product_id | old_stock | new_stock | changed_at
-----------|------------|-----------|-----------|-------------------
1          | 1          | 10        | 5         | 2025-03-15 14:30:00

-- Triggers work silently in the background.`,
    notes: [
      'Triggers can slow down INSERT/UPDATE/DELETE — use them only when necessary.',
      'Complex triggers become hard to debug — keep them simple.',
      'Cascading triggers (trigger fires another trigger) can cause infinite loops.',
    ],
    practice: {
      title: 'Audit Log Trigger',
      description: 'Create: (1) audit_log table (id, table_name, action, old_value, new_value, changed_by, timestamp). (2) Trigger on employees table to log all updates to audit_log. (3) Trigger to prevent deletion of active employees.',
      startCode: '',
      hint: 'AFTER UPDATE trigger inserts into audit table. BEFORE DELETE trigger uses SIGNAL to reject if status=active.',
    },
  },

  {
    id: 'sql-window-functions',
    category: 'SQL Advanced',
    title: 'Window Functions — Advanced Ranking & Running Totals',
    difficulty: 'Advanced',
    theory: [
      'Window functions compute values over a "window" of rows without reducing the result set (unlike GROUP BY). ROW_NUMBER, RANK, DENSE_RANK for ranking. SUM/AVG OVER for running totals.',
      'PARTITION BY divides data into groups; ORDER BY defines the window order. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW defines a running window.',
      'Powerful for: top-N per group, running totals, month-over-month comparisons, percentiles, gap detection.',
    ],
    syntax: `ROW_NUMBER() OVER (ORDER BY col DESC)
RANK() OVER (PARTITION BY dept ORDER BY salary DESC)
SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
LAG(col) OVER (PARTITION BY category ORDER BY date)
PERCENT_RANK() OVER (ORDER BY marks)`,
    code: `CREATE TABLE quarterly_sales (
  sales_id INT PRIMARY KEY,
  salesperson VARCHAR(50),
  region VARCHAR(30),
  quarter INT,
  amount DECIMAL(10,2)
);

INSERT INTO quarterly_sales VALUES
  (1, 'Priya', 'North', 1, 50000),
  (2, 'Rahul', 'South', 1, 32000),
  (3, 'Sneha', 'North', 2, 58000),
  (4, 'Priya', 'North', 2, 41000),
  (5, 'Arun', 'South', 2, 67000),
  (6, 'Rahul', 'South', 3, 29000),
  (7, 'Sneha', 'North', 3, 73000),
  (8, 'Priya', 'North', 3, 52000);

-- Top salesperson per region per quarter
SELECT
  salesperson, region, quarter, amount,
  ROW_NUMBER() OVER (PARTITION BY region, quarter ORDER BY amount DESC) AS rank
FROM quarterly_sales;

-- Running total per salesperson across quarters
SELECT
  salesperson, quarter, amount,
  SUM(amount) OVER (PARTITION BY salesperson ORDER BY quarter) AS running_total
FROM quarterly_sales;

-- Rank within each region
SELECT
  salesperson, region, amount,
  RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS region_rank,
  PERCENT_RANK() OVER (PARTITION BY region ORDER BY amount) AS percentile
FROM quarterly_sales;

-- Quarter-over-quarter growth
SELECT
  salesperson, quarter, amount,
  LAG(amount) OVER (PARTITION BY salesperson ORDER BY quarter) AS prev_quarter,
  amount - LAG(amount) OVER (PARTITION BY salesperson ORDER BY quarter) AS growth
FROM quarterly_sales;`,
    output: `-- Top per region/quarter:
salesperson | region | quarter | amount | rank
------------|--------|---------|--------|-----
Priya       | North  | 1       | 50000  | 1
Sneha       | North  | 2       | 58000  | 1
Sneha       | North  | 3       | 73000  | 1

-- Running total (Priya):
salesperson | quarter | amount | running_total
------------|---------|--------|---------------
Priya       | 1       | 50000  | 50000
Priya       | 2       | 41000  | 91000
Priya       | 3       | 52000  | 143000`,
    notes: [
      'Window functions only in PostgreSQL, SQL Server, MySQL 8+. Not in SQLite or older MySQL.',
      'Window functions don\'t reduce rows — useful for adding rankings to full result set.',
      'Prefer window functions over correlated subqueries — much faster.',
    ],
    practice: {
      title: 'Sales Performance Dashboard',
      description: '(1) Rank salespeople by total sales within each region. (2) Calculate running total per salesperson. (3) Find QoQ growth. (4) Assign percentile to each sale amount.',
      startCode: '',
      hint: 'ROW_NUMBER/RANK for ranking, SUM(...) OVER (...ORDER BY...) for running totals, LAG/LEAD for comparisons, PERCENT_RANK for percentiles.',
    },
  },

  {
    id: 'sql-case-when',
    category: 'SQL Fundamentals',
    title: 'CASE WHEN Expression — Conditional Transformation',
    difficulty: 'Intermediate',
    theory: [
      'CASE WHEN evaluates conditions and returns values conditionally — like if/else in SQL. Used in SELECT, WHERE, ORDER BY, aggregate functions.',
      'Searched CASE: CASE WHEN condition THEN result ... ELSE default END. Simple CASE: CASE expr WHEN val THEN result ... END.',
      'Conditional aggregation: SUM(CASE WHEN condition THEN 1 ELSE 0 END) counts rows matching a condition — enables pivot-table reports.',
    ],
    syntax: `CASE
  WHEN condition THEN value
  WHEN condition THEN value
  ELSE default_value
END AS alias

-- Conditional count
SUM(CASE WHEN status='active' THEN 1 ELSE 0 END) AS active_count`,
    code: `CREATE TABLE transaction_log (
  transaction_id INT PRIMARY KEY,
  customer_id INT,
  amount DECIMAL(10,2),
  transaction_type VARCHAR(20),  -- 'debit', 'credit'
  status VARCHAR(20),             -- 'pending', 'completed', 'failed'
  transaction_date DATE
);

INSERT INTO transaction_log VALUES
  (1, 101, 5000, 'debit', 'completed', '2025-01-10'),
  (2, 102, 3000, 'credit', 'completed', '2025-01-15'),
  (3, 101, 2000, 'credit', 'pending', '2025-01-20'),
  (4, 103, 7500, 'debit', 'failed', '2025-02-01'),
  (5, 102, 4000, 'debit', 'completed', '2025-02-05'),
  (6, 101, 1500, 'credit', 'completed', '2025-02-10');

-- Categorise transactions and show P&L
SELECT
  transaction_id,
  customer_id,
  amount,
  CASE
    WHEN transaction_type = 'debit' THEN -amount
    WHEN transaction_type = 'credit' THEN amount
    ELSE 0
  END AS impact,
  CASE
    WHEN status = 'completed' THEN 'Settled'
    WHEN status = 'pending' THEN 'Awaiting'
    WHEN status = 'failed' THEN 'Error'
    ELSE 'Unknown'
  END AS settlement_status
FROM transaction_log;

-- Count transactions by status
SELECT
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_count,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failed_count,
  COUNT(*) AS total_transactions
FROM transaction_log;

-- Customer balance calculation
SELECT
  customer_id,
  SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE 0 END) AS total_credits,
  SUM(CASE WHEN transaction_type = 'debit' THEN amount ELSE 0 END) AS total_debits,
  SUM(CASE
    WHEN transaction_type = 'credit' THEN amount
    WHEN transaction_type = 'debit' THEN -amount
    ELSE 0
  END) AS net_balance
FROM transaction_log
WHERE status = 'completed'
GROUP BY customer_id;`,
    output: `-- Transactions with impact:
transaction_id | customer_id | amount | impact | settlement_status
----------------|-------------|--------|--------|------------------
1               | 101         | 5000   | -5000  | Settled
2               | 102         | 3000   | 3000   | Settled
3               | 101         | 2000   | 2000   | Awaiting
4               | 103         | 7500   | -7500  | Error
5               | 102         | 4000   | -4000  | Settled

-- Status counts:
completed_count | pending_count | failed_count | total_transactions
1               | 2             | 1            | 4`,
    notes: [
      'CASE can be nested but becomes hard to read — consider breaking into multiple columns.',
      'COALESCE is a simpler alternative for NULL handling: COALESCE(col, \'default\').',
      'Conditional aggregation with CASE is faster than running separate queries.',
    ],
    practice: {
      title: 'Financial Report with CASE',
      description: 'Generate a report showing: (1) categorise transactions (small <1000, medium 1000-5000, large >5000). (2) count by category and status. (3) calculate total value for each category.',
      startCode: '',
      hint: 'CASE WHEN amount < 1000 THEN \'Small\' WHEN amount <= 5000 THEN \'Medium\' ELSE \'Large\' END. Use conditional SUM for totals per category.',
    },
  },

  {
    id: 'sql-project-school-db',
    category: 'Projects',
    title: 'Project: Complete School Management System',
    difficulty: 'Intermediate',
    theory: [
      'A real-world school database: students, classes, teachers, subjects, marks, attendance. Demonstrates normalisation, foreign keys, complex queries, reporting.',
      'Includes: multi-table design, JOINs, GROUP BY aggregations, reports (topper lists, attendance reports, subject-wise performance).',
      'Practical skills: designing schema, populating data, writing complex analytical queries.',
    ],
    syntax: `-- Part of a complete school system`,
    code: `-- SCHOOL DATABASE PROJECT

-- 1. Create core tables
CREATE TABLE classes (
  class_id INT PRIMARY KEY,
  class_name VARCHAR(10) NOT NULL UNIQUE,
  section VARCHAR(5),
  class_teacher_id INT
);

CREATE TABLE students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  class_id INT NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(100),
  FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE teachers (
  teacher_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  specialisation VARCHAR(50),
  phone VARCHAR(15),
  salary DECIMAL(10,2)
);

CREATE TABLE subjects (
  subject_id INT PRIMARY KEY AUTO_INCREMENT,
  subject_name VARCHAR(50) NOT NULL,
  teacher_id INT,
  credit_hours INT DEFAULT 40,
  FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE exam_marks (
  mark_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  exam_type VARCHAR(20),  -- 'mid-term', 'final'
  marks INT CHECK (marks >= 0 AND marks <= 100),
  exam_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

CREATE TABLE attendance (
  attendance_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  attendance_date DATE,
  status VARCHAR(10),  -- 'present', 'absent', 'leave'
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- 2. Populate data
INSERT INTO classes VALUES (10, 'Class X-A', 'A', 1), (10, 'Class X-B', 'B', 2);
INSERT INTO teachers VALUES (1, 'Mrs. Sharma', 'Maths', '9876543210', 65000);
INSERT INTO subjects VALUES (1, 'Maths', 1, 40), (2, 'Science', 2, 40);
INSERT INTO students VALUES (1, 'Arjun', '2009-05-15', 10, '9111111111', 'arjun@school.in');
INSERT INTO exam_marks VALUES (1, 1, 1, 'final', 92, '2025-03-01');
INSERT INTO attendance VALUES (1, 1, '2025-03-15', 'present');

-- 3. Complex queries

-- Student report card
SELECT
  s.name, s.class_id,
  sb.subject_name,
  em.marks,
  CASE
    WHEN em.marks >= 90 THEN 'A+'
    WHEN em.marks >= 80 THEN 'A'
    WHEN em.marks >= 40 THEN 'D'
    ELSE 'F'
  END AS grade
FROM students s
JOIN exam_marks em ON s.student_id = em.student_id
JOIN subjects sb ON em.subject_id = sb.subject_id
ORDER BY s.name, sb.subject_name;

-- Class average by subject
SELECT
  sb.subject_name,
  COUNT(*) AS students,
  ROUND(AVG(em.marks), 1) AS avg_marks,
  MAX(em.marks) AS highest,
  MIN(em.marks) AS lowest
FROM subjects sb
LEFT JOIN exam_marks em ON sb.subject_id = em.subject_id
GROUP BY sb.subject_name
ORDER BY avg_marks DESC;

-- Attendance percentage
SELECT
  s.name,
  COUNT(*) AS total_days,
  SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS days_present,
  ROUND(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS attendance_pct
FROM students s
LEFT JOIN attendance a ON s.student_id = a.student_id
GROUP BY s.name
HAVING attendance_pct >= 75;`,
    output: `-- Student report card:
name   | class | subject | marks | grade
-------|-------|---------|-------|-------
Arjun  | 10    | Maths   | 92    | A+

-- Class averages:
subject | students | avg_marks | highest | lowest
--------|----------|-----------|---------|--------
Maths   | 1        | 92.0      | 92      | 92
Science | 0        | NULL      | NULL    | NULL

-- Attendance (75%+ only):
name   | total_days | days_present | attendance_pct
-------|------------|--------------|---------------
Arjun  | 1          | 1            | 100.0`,
    notes: [
      'School database is a capstone project — combines all SQL concepts.',
      'Real systems add: fee tracking, library management, bus routing, parent communication.',
      'Use views for frequently-run reports (e.g., "student report cards").',
    ],
    practice: {
      title: 'Extend the School DB',
      description: '(1) Add a fees table (student_id, amount_due, paid_date). (2) Query: top 3 students by average marks. (3) Query: teachers by highest average student marks in their subject. (4) Report: students with attendance < 75%.',
      startCode: '',
      hint: 'CREATE TABLE fees(...). JOIN students-marks-subjects for topper list. Use window functions or GROUP BY for teacher rankings.',
    },
  },

  {
    id: 'sql-project-ecommerce-db',
    category: 'Projects',
    title: 'Project: E-Commerce Database System',
    difficulty: 'Advanced',
    theory: [
      'Real e-commerce system: customers, products, categories, cart, orders, payments, reviews. Demonstrates full relational design.',
      'Includes: inventory management, order processing, customer analytics, sales reports.',
      'Advanced skills: transactions (order atomicity), stored procedures (checkout), triggers (stock management), complex analytics.',
    ],
    syntax: `-- Part of a complete e-commerce system`,
    code: `-- E-COMMERCE DATABASE PROJECT

CREATE TABLE categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  category_id INT NOT NULL,
  price DECIMAL(10,2) CHECK (price > 0),
  stock_qty INT DEFAULT 0 CHECK (stock_qty >= 0),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(15),
  address TEXT,
  signup_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(12,2),
  status VARCHAR(20) DEFAULT 'pending',  -- pending, shipped, delivered, cancelled
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT CHECK (quantity > 0),
  unit_price DECIMAL(10,2),
  line_total DECIMAL(12,2),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  customer_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Sample data
INSERT INTO categories VALUES (1, 'Electronics', 'Tech devices');
INSERT INTO products VALUES (1, 'Laptop', 1, 45000, 10, NOW());
INSERT INTO customers VALUES (1, 'user@email.com', 'Arjun', '9876543210', 'Mumbai', NOW());
INSERT INTO orders VALUES (1, 1, NOW(), 45000, 'delivered');
INSERT INTO order_items VALUES (1, 1, 1, 1, 45000, 45000);

-- ANALYTICS QUERIES

-- Best-selling products
SELECT
  p.product_id,
  p.name,
  c.category_name,
  SUM(oi.quantity) AS units_sold,
  SUM(oi.line_total) AS total_revenue,
  ROUND(AVG(r.rating), 1) AS avg_rating
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN reviews r ON p.product_id = r.product_id
LEFT JOIN categories c ON p.category_id = c.category_id
GROUP BY p.product_id, p.name, c.category_name
ORDER BY total_revenue DESC
LIMIT 10;

-- Customer lifetime value
SELECT
  c.customer_id,
  c.name,
  c.email,
  COUNT(o.order_id) AS total_orders,
  SUM(o.total_amount) AS lifetime_value,
  MAX(o.order_date) AS last_order_date,
  ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, c.email
HAVING COUNT(o.order_id) > 0
ORDER BY lifetime_value DESC;

-- Monthly revenue trend
SELECT
  DATE_FORMAT(o.order_date, '%Y-%m') AS month,
  COUNT(DISTINCT o.customer_id) AS unique_customers,
  COUNT(o.order_id) AS orders,
  SUM(o.total_amount) AS monthly_revenue,
  ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM orders o
WHERE o.status = 'delivered'
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY month DESC;

-- Out-of-stock alerts
SELECT
  product_id,
  name,
  stock_qty,
  CASE
    WHEN stock_qty = 0 THEN 'Out of Stock'
    WHEN stock_qty < 5 THEN 'Low Stock'
    WHEN stock_qty < 20 THEN 'Reorder Soon'
    ELSE 'Adequate'
  END AS stock_status
FROM products
WHERE stock_qty < 20
ORDER BY stock_qty ASC;`,
    output: `-- Best-selling (sample):
product_id | name   | category    | units | revenue | rating
-----------|--------|------------|-------|---------|-------
1          | Laptop | Electronics| 15    | 675000  | 4.5

-- Customer LTV (sample):
customer_id | name  | email         | orders | lifetime_value | last_order    | avg_order
------------|-------|---------------|--------|----------------|---------------|-----------
1           | Arjun | user@email.com| 3      | 135000.00      | 2025-03-10    | 45000.00

-- Monthly revenue (sample):
month     | customers | orders | revenue   | avg_order
-----------|-----------|--------|-----------|----------
2025-03    | 2         | 2      | 90000.00  | 45000.00`,
    notes: [
      'E-commerce DB requires careful transaction handling for order atomicity.',
      'Inventory depletion triggers must prevent overselling.',
      'Analytics queries drive business decisions — performance is critical.',
    ],
    practice: {
      title: 'Complete E-Commerce Analysis',
      description: '(1) Find top 5 customers by spending. (2) Calculate inventory turnover per product. (3) Revenue per category. (4) Identify inactive customers (no orders in 90 days). (5) Monthly growth rate.',
      startCode: '',
      hint: 'Use window functions for growth rates. JOINs for multi-table analysis. DATE arithmetic for 90-day cutoff. GROUP BY for rollups.',
    },
  },
  {
    id: 'sql-json-functions',
    category: 'Intermediate',
    title: 'JSON Functions in SQL',
    difficulty: 'Intermediate',
    theory: [
      'SQL databases now support JSON data types and functions for semi-structured data.',
      'JSON_EXTRACT() retrieves values from JSON documents using path notation.',
      'JSON_OBJECT() and JSON_ARRAY() construct JSON from scalar values.',
      'JSON_CONTAINS() checks if a JSON document contains a specific value or structure.',
      'JSON_LENGTH() returns the length of a JSON document or array.',
    ],
    code: `-- Create table with JSON column
CREATE TABLE api_responses (
  id INT PRIMARY KEY,
  endpoint VARCHAR(255),
  response JSON
);

-- Insert JSON data
INSERT INTO api_responses VALUES
(1, '/users/1', JSON_OBJECT('id', 1, 'name', 'Alice', 'email', 'alice@example.com')),
(2, '/users/2', JSON_OBJECT('id', 2, 'name', 'Bob', 'roles', JSON_ARRAY('admin', 'user')));

-- Extract JSON values
SELECT
  id,
  JSON_EXTRACT(response, '$.name') AS name,
  JSON_EXTRACT(response, '$.email') AS email
FROM api_responses;

-- Check if JSON contains value
SELECT id FROM api_responses
WHERE JSON_CONTAINS(response, '"admin"', '$.roles');

-- Get JSON length
SELECT id, JSON_LENGTH(response, '$.roles') AS role_count
FROM api_responses;`,
    output: `id | name      | email
---|-----------|--------------------
1  | "Alice"   | "alice@example.com"
2  | "Bob"     | NULL

id | role_count
---|----------
2  | 2`,
    notes: [
      'JSON functions enable storing nested data without normalization.',
      'Use JSON_EXTRACT() to query deep nested structures.',
      'JSON path notation uses $ as root, dot (.) for object keys, [n] for arrays.',
    ],
    practice: {
      title: 'Query JSON API Responses',
      description: 'Store API response JSON. Extract user names and emails. Find all users with "admin" role. Count roles per user.',
      startCode: '',
      hint: 'Use JSON_EXTRACT with path notation like $.fieldname. Use JSON_CONTAINS to search for specific values in arrays.',
    },
  },
  {
    id: 'sql-recursive-cte',
    category: 'Advanced',
    title: 'Recursive CTEs',
    difficulty: 'Advanced',
    theory: [
      'Recursive CTEs use a WITH clause that references itself to traverse hierarchical data.',
      'Structure: anchor query (base case) UNION ALL recursive query (inductive case).',
      'Useful for org charts, category hierarchies, and path finding in graphs.',
      'Recursion depth can be limited with MAX_RECURSION_DEPTH hint.',
      'Performance improves with indexed foreign keys between recursive levels.',
    ],
    code: `-- Org chart: find all subordinates of a manager
WITH RECURSIVE employee_hierarchy AS (
  -- Anchor: start with manager ID 1
  SELECT employee_id, name, manager_id, 0 AS depth
  FROM employees
  WHERE employee_id = 1

  UNION ALL

  -- Recursive: find subordinates
  SELECT e.employee_id, e.name, e.manager_id, eh.depth + 1
  FROM employees e
  INNER JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
  WHERE eh.depth < 10  -- Prevent infinite loops
)
SELECT * FROM employee_hierarchy
ORDER BY depth, name;

-- Category hierarchy: drill-down from parent to leaf
WITH RECURSIVE category_tree AS (
  SELECT category_id, parent_id, name, 0 AS level
  FROM categories
  WHERE parent_id IS NULL  -- Top-level categories

  UNION ALL

  SELECT c.category_id, c.parent_id, c.name, ct.level + 1
  FROM categories c
  INNER JOIN category_tree ct ON c.parent_id = ct.category_id
)
SELECT CONCAT(REPEAT('  ', level), name) AS category_path
FROM category_tree
ORDER BY category_id;`,
    output: `employee_id | name      | manager_id | depth
------------|-----------|------------|------
1           | Alice     | NULL       | 0
2           | Bob       | 1          | 1
3           | Charlie   | 1          | 1
4           | Diana     | 2          | 2

category_path
-----------
Electronics
  Phones
    Android
    iOS
  Laptops`,
    notes: [
      'Always include a termination condition in the recursive part to prevent infinite loops.',
      'Anchor query sets the starting point; recursive part traverses the hierarchy.',
      'Depth tracking helps limit recursion and understand hierarchical levels.',
    ],
    practice: {
      title: 'Build Org Chart',
      description: 'Create employees table with manager_id. Write recursive CTE to find all reports under each manager. Calculate depth/level.',
      startCode: '',
      hint: 'Start with WHERE manager_id IS NULL for top-level managers. Recursively JOIN employees to themselves on manager_id.',
    },
  },
  {
    id: 'sql-date-arithmetic',
    category: 'Intermediate',
    title: 'Date Functions and Arithmetic',
    difficulty: 'Intermediate',
    theory: [
      'DATE_ADD() and DATE_SUB() add or subtract intervals from dates.',
      'DATEDIFF() calculates the number of days between two dates.',
      'EXTRACT() retrieves specific components (YEAR, MONTH, DAY, HOUR, etc.) from dates.',
      'DATE_FORMAT() converts dates to custom string formats.',
      'LAST_DAY() returns the last day of the month for a given date.',
    ],
    code: `-- Basic date arithmetic
SELECT
  order_date,
  DATE_ADD(order_date, INTERVAL 30 DAY) AS delivery_due,
  DATE_SUB(order_date, INTERVAL 1 MONTH) AS last_month,
  DATEDIFF('2025-12-31', order_date) AS days_until_year_end
FROM orders;

-- Extract date components
SELECT
  EXTRACT(YEAR FROM created_at) AS year,
  EXTRACT(MONTH FROM created_at) AS month,
  EXTRACT(DAY FROM created_at) AS day,
  EXTRACT(HOUR FROM created_at) AS hour,
  COUNT(*) AS event_count
FROM events
GROUP BY EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at), EXTRACT(DAY FROM created_at);

-- Find employees with birthdays this month
SELECT name, date_of_birth
FROM employees
WHERE MONTH(date_of_birth) = MONTH(CURDATE())
  AND DAY(date_of_birth) <= DAY(LAST_DAY(CURDATE()));

-- Format dates for reports
SELECT
  order_id,
  DATE_FORMAT(order_date, '%Y-%m-%d %H:%i:%s') AS full_datetime,
  DATE_FORMAT(order_date, '%B %d, %Y') AS readable_date
FROM orders;`,
    output: `order_date | delivery_due | last_month | days_until_year_end
-----------|--------------|------------|--------------------
2025-03-01 | 2025-03-31   | 2025-02-01 | 305

year | month | day | hour | event_count
-----|-------|-----|------|------------
2025 | 3     | 1   | 14   | 5
2025 | 3     | 1   | 15   | 8

name        | date_of_birth
------------|---------------
Alice Chen  | 1990-03-15
Bob Smith   | 1988-03-28

order_id | full_datetime           | readable_date
---------|-------------------------|-------------------
1        | 2025-03-01 14:30:00    | March 01, 2025`,
    notes: [
      'INTERVAL syntax: INTERVAL n DAY/MONTH/YEAR/HOUR/MINUTE/SECOND.',
      'DATEDIFF works in both directions; always returns absolute days.',
      'Use DATE_FORMAT with %Y-%m-%d for ISO 8601 format.',
    ],
    practice: {
      title: 'Sales Analysis with Date Math',
      description: 'Find orders placed in the last 30 days. Calculate days pending for orders not yet delivered. Extract quarter from order date.',
      startCode: '',
      hint: 'Use DATE_SUB(CURDATE(), INTERVAL 30 DAY) for recent orders. DATEDIFF for pending calculation. QUARTER() for quarter extraction.',
    },
  },
  {
    id: 'sql-string-manipulation',
    category: 'Intermediate',
    title: 'String Functions (CONCAT, SUBSTR, REPLACE)',
    difficulty: 'Intermediate',
    theory: [
      'CONCAT() joins multiple strings together with no separator.',
      'CONCAT_WS() joins strings with a specified separator (useful for CSV).',
      'SUBSTR() or SUBSTRING() extracts a portion of a string.',
      'REPLACE() substitutes all occurrences of a substring.',
      'LENGTH(), UPPER(), LOWER() manipulate string properties.',
    ],
    code: `-- Concatenate columns
SELECT
  CONCAT(first_name, ' ', last_name) AS full_name,
  CONCAT_WS(' | ', email, phone) AS contact_info,
  CONCAT('Hello, ', first_name, '!') AS greeting
FROM users;

-- Extract substrings
SELECT
  email,
  SUBSTRING(email, 1, POSITION('@' IN email) - 1) AS username,
  SUBSTRING(email, POSITION('@' IN email) + 1) AS domain
FROM users;

-- Replace and format
SELECT
  phone_number,
  REPLACE(phone_number, '-', '') AS normalized_phone,
  CONCAT(
    SUBSTRING(phone_number, 1, 3), '-',
    SUBSTRING(phone_number, 5, 3), '-',
    SUBSTRING(phone_number, 9)
  ) AS formatted_phone
FROM contacts;

-- String case and length
SELECT
  product_name,
  LENGTH(product_name) AS name_length,
  UPPER(product_name) AS uppercase,
  LOWER(product_name) AS lowercase
FROM products
WHERE LENGTH(product_name) > 20;`,
    output: `full_name      | contact_info
-----------|--------------------------
John Smith | john@example.com | 555-1234

email             | username | domain
-----------------|----------|----------
alice@example.com | alice    | example.com

phone_number | normalized_phone | formatted_phone
-------------|------------------|---------------
555-1234-567 | 5551234567      | 555-123-4567

product_name      | name_length | uppercase         | lowercase
------------------|-------------|-------------------|------------------
Premium Headphones | 18          | PREMIUM HEADPHONES| premium headphones`,
    notes: [
      'POSITION() finds the index of a substring (1-indexed).',
      'SUBSTR() is more portable; SUBSTRING() is SQL standard.',
      'CONCAT_WS() is perfect for generating CSV-like output.',
    ],
    practice: {
      title: 'Parse Email and Phone',
      description: 'Extract username and domain from email. Normalize phone numbers by removing hyphens. Format phone as (XXX) XXX-XXXX.',
      startCode: '',
      hint: 'Use POSITION() to find @ in email. SUBSTRING to extract parts. REPLACE to remove hyphens, then CONCAT to reformat.',
    },
  },
  {
    id: 'sql-upsert',
    category: 'Advanced',
    title: 'UPSERT (INSERT ... ON CONFLICT/DUPLICATE)',
    difficulty: 'Advanced',
    theory: [
      'UPSERT combines INSERT and UPDATE in a single operation.',
      'MySQL uses INSERT ... ON DUPLICATE KEY UPDATE syntax.',
      'PostgreSQL uses INSERT ... ON CONFLICT ... DO UPDATE syntax.',
      'Prevents duplicate key errors while updating existing records.',
      'More efficient than checking existence with separate SELECT + INSERT/UPDATE.',
    ],
    code: `-- MySQL: INSERT ... ON DUPLICATE KEY UPDATE
INSERT INTO user_stats (user_id, total_logins, last_login)
VALUES (101, 1, NOW())
ON DUPLICATE KEY UPDATE
  total_logins = total_logins + 1,
  last_login = NOW();

-- Upsert multiple rows at once
INSERT INTO product_prices (product_id, price, updated_at)
VALUES
  (1, 299.99, NOW()),
  (2, 149.99, NOW()),
  (3, 799.99, NOW())
ON DUPLICATE KEY UPDATE
  price = VALUES(price),
  updated_at = VALUES(updated_at);

-- PostgreSQL equivalent (different syntax)
INSERT INTO user_stats (user_id, total_logins, last_login)
VALUES (101, 1, NOW())
ON CONFLICT (user_id)
DO UPDATE SET
  total_logins = user_stats.total_logins + 1,
  last_login = NOW();

-- Upsert with conditional logic
INSERT INTO cache_data (cache_key, cache_value, ttl, updated_at)
VALUES ('user:123:profile', JSON_OBJECT('name', 'Alice'), 3600, NOW())
ON DUPLICATE KEY UPDATE
  cache_value = VALUES(cache_value),
  ttl = 3600,
  updated_at = NOW();`,
    output: `-- After first run:
user_id | total_logins | last_login
--------|--------------|-------------------
101     | 1            | 2025-03-15 10:30:00

-- After second run (UPSERT):
user_id | total_logins | last_login
--------|--------------|-------------------
101     | 2            | 2025-03-15 10:35:00`,
    notes: [
      'ON DUPLICATE KEY UPDATE requires a UNIQUE constraint or PRIMARY KEY.',
      'Use VALUES(column_name) to reference the attempted INSERT value.',
      'UPSERT is atomic: either INSERT or UPDATE happens, never both.',
    ],
    practice: {
      title: 'Track User Login Stats',
      description: 'Use UPSERT to increment login count. Update last_login timestamp. Handle first login and subsequent logins in one statement.',
      startCode: '',
      hint: 'Use INSERT ... ON DUPLICATE KEY UPDATE. Increment total_logins with total_logins + 1. Update last_login to NOW().',
    },
  },
  {
    id: 'sql-performance-tips',
    category: 'Intermediate',
    title: 'SQL Performance Tips',
    difficulty: 'Intermediate',
    theory: [
      'Index foreign key columns for faster JOINs and lookups.',
      'EXPLAIN shows the query execution plan and identifies bottlenecks.',
      'Avoid SELECT * to reduce data transfer; select only needed columns.',
      'Use indexes wisely: too many indexes slow down INSERT/UPDATE.',
      'Denormalize sparingly for read-heavy workloads; normalize for write-heavy.',
    ],
    code: `-- Check query execution plan
EXPLAIN SELECT * FROM orders
WHERE customer_id = 10 AND status = 'delivered';

-- Optimize with proper indexes
CREATE INDEX idx_orders_customer_status
ON orders(customer_id, status);

-- Bad: SELECT * transfers unnecessary columns
SELECT * FROM users WHERE id = 5;

-- Good: Select only needed columns
SELECT id, name, email FROM users WHERE id = 5;

-- Bad: Subquery in SELECT (runs for every row)
SELECT
  order_id,
  (SELECT COUNT(*) FROM order_items WHERE order_id = orders.order_id) AS item_count
FROM orders;

-- Good: Use JOIN with GROUP BY
SELECT
  o.order_id,
  COUNT(oi.order_item_id) AS item_count
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- Check index usage
ANALYZE TABLE products;
SHOW INDEX FROM products;`,
    output: `id | select_type | table | type  | rows | key
---|------------|-------|-------|------|----------
1  | SIMPLE     | orders| range | 50   | idx_customer_status

Table | Non_unique | Key_name
------|------------|--------------------
products | 1 | idx_product_category
products | 1 | idx_product_status`,
    notes: [
      'EXPLAIN shows whether queries use indexes or full table scans.',
      'Composite indexes (col1, col2) help queries filtering on both columns.',
      'Monitor slow query log to find candidates for optimization.',
    ],
    practice: {
      title: 'Optimize a Slow Query',
      description: 'Analyze a large orders table. Use EXPLAIN to check for full table scans. Create appropriate indexes. Verify improvement.',
      startCode: '',
      hint: 'Use EXPLAIN to identify missing indexes. Create composite indexes on foreign keys and filter columns. Re-run EXPLAIN to compare.',
    },
  },
  {
    id: 'sql-database-normalization',
    category: 'Intermediate',
    title: 'Database Normalization (1NF to 3NF)',
    difficulty: 'Intermediate',
    theory: [
      '1NF (First Normal Form): Each column contains atomic (indivisible) values; no repeating groups.',
      '2NF (Second Normal Form): In 1NF + all non-key columns depend on the entire primary key (eliminate partial dependencies).',
      '3NF (Third Normal Form): In 2NF + non-key columns depend only on the primary key (eliminate transitive dependencies).',
      'Over-normalization can reduce performance; denormalization trades consistency for speed in read-heavy systems.',
      'Normalize for write-heavy workloads; denormalize for read-heavy analytics.',
    ],
    code: `-- Unnormalized (violates 1NF): repeating groups
CREATE TABLE student_courses_bad (
  student_id INT,
  student_name VARCHAR(100),
  courses VARCHAR(500)  -- Stores "Math, Physics, Chemistry" as one string
);

-- Normalized (1NF): atomic values only
CREATE TABLE student_courses (
  student_id INT,
  student_name VARCHAR(100)
);
CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(100)
);
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  grade CHAR(1),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES student_courses(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Violates 2NF: partial dependency (course_id depends on dept, not student)
CREATE TABLE bad_enrollments (
  student_id INT,
  course_id INT,
  department_id INT,
  dept_name VARCHAR(100),  -- Depends on department_id, not on the key
  PRIMARY KEY (student_id, course_id)
);

-- Fixed (2NF): move dept_name to departments table
CREATE TABLE departments (
  department_id INT PRIMARY KEY,
  dept_name VARCHAR(100)
);
CREATE TABLE good_enrollments (
  student_id INT,
  course_id INT,
  department_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);`,
    output: `-- Normalized query result (joining multiple tables):
student_id | student_name | course_name | grade
-----------|--------------|------------|------
1          | Alice        | Math       | A
1          | Alice        | Physics    | B
1          | Alice        | Chemistry  | A
2          | Bob          | Math       | C`,
    notes: [
      'Normalization eliminates data redundancy and maintains consistency.',
      'Each normal form builds on the previous: 3NF is most normalized.',
      'Balance normalization with query performance requirements.',
    ],
    practice: {
      title: 'Normalize an E-Commerce Schema',
      description: 'Given a denormalized orders table with customer and product info embedded. Break into normalized tables. Verify 3NF compliance.',
      startCode: '',
      hint: 'Separate customer info, product info, and order data. Create junction tables for many-to-many relationships. Ensure each column depends on the entire primary key.',
    },
  },
  {
    id: 'sql-er-diagrams',
    category: 'Beginner',
    title: 'Entity-Relationship (ER) Diagrams',
    difficulty: 'Beginner',
    theory: [
      'ER diagrams visually represent database structure using entities, attributes, and relationships.',
      'Entities are tables; attributes are columns; relationships show how tables connect.',
      'Cardinality notation: 1:1 (one-to-one), 1:N (one-to-many), M:N (many-to-many).',
      'Primary keys (PK) uniquely identify rows; foreign keys (FK) reference other tables.',
      "Crow's foot notation uses symbols to show cardinality: | (one), O (zero), > (many).",
    ],
    code: `-- Example: E-Commerce ER relationships

-- One Customer has Many Orders (1:N)
-- One Order has Many Order_Items (1:N)
-- One Product has Many Order_Items (1:N)

CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
  -- Relationship: customers --< orders
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
  -- Relationship: orders >-- customers (FK)
  -- Relationship: orders --< order_items
);

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2)
  -- Relationship: products --< order_items
);

CREATE TABLE order_items (
  order_item_id INT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
  -- Relationships: order_items >-- orders (FK)
  -- Relationships: order_items >-- products (FK)
);

-- Many-to-Many: Students and Courses (M:N)
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(100)
);
CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  title VARCHAR(100)
);
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  grade CHAR(1),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
  -- Junction table for M:N relationship
);`,
    output: `ER Diagram (Text representation):
CUSTOMERS (1) --< (N) ORDERS
                        |
                        |--< (N) ORDER_ITEMS
                                    |
                                    >-- (N) PRODUCTS

STUDENTS (M) --<---> (N) COURSES
            (via ENROLLMENTS table)`,
    notes: [
      'ER diagrams are created before building the database schema.',
      'Tools like Lucidchart, Draw.io, and MySQL Workbench generate ER diagrams.',
      'Foreign key constraints enforce referential integrity in the ER design.',
    ],
    practice: {
      title: 'Design School Management DB',
      description: 'Create ER diagram for: Students, Teachers, Courses, Classes, Assignments. Show all relationships (1:1, 1:N, M:N). Write CREATE TABLE statements.',
      startCode: '',
      hint: 'Identify entities: Students, Teachers, Courses, Classes. Map relationships: Students enroll in Courses (M:N). Teachers teach Classes (1:N). Use junction table for M:N.',
    },
  },
];

