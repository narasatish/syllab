import type { TutorialTopic } from './types';

export const pythonTopics: TutorialTopic[] = [
  {
    id: 'py-intro',
    category: 'Getting Started',
    title: 'Introduction to Python',
    difficulty: 'Beginner',
    theory: [
      `Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It is famous for its clean, readable syntax that uses plain English words and indentation instead of curly braces — making it one of the easiest languages to learn.`,
      `Python is used everywhere: web development (Django, Flask), data science (Pandas, NumPy), artificial intelligence (TensorFlow, PyTorch), automation, scripting, and much more. Companies like Google, Netflix, ISRO, and thousands of Indian startups use Python daily.`,
      `For CBSE Class 11–12 Computer Science students, Python is the primary language. It is also the #1 language asked in placements at product companies like Google, Amazon, Flipkart, and Microsoft.`,
    ],
    syntax: `# Single-line comment
print("text")         # Print to screen
variable = value      # Assign a variable (no type declaration needed!)`,
    code: `# Your first Python program
print("Hello, World!")
print("Jai Hind! 🇮🇳")

# Variables — Python figures out the type automatically
name = "Arjun Sharma"
age = 17
marks = 97.5
is_topper = True

print("Name:", name)
print("Age:", age)
print("Marks:", marks)
print("Is Topper:", is_topper)

# Check the type of any variable
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(marks))   # <class 'float'>`,
    output: `Hello, World!
Jai Hind! 🇮🇳
Name: Arjun Sharma
Age: 17
Marks: 97.5
Is Topper: True
<class 'str'>
<class 'int'>
<class 'float'>`,
    notes: [
      `Python is case-sensitive — "Name" and "name" are two different variables.`,
      `No semicolons (;) at line ends — Python uses newlines to separate statements.`,
      `Indentation (4 spaces or 1 tab) is mandatory for code blocks like loops and functions.`,
    ],
    practice: {
      title: 'Hello, Yourself!',
      description: `Create a Python program that stores your name, class (e.g. 11), favourite subject, and city — then prints all four neatly.`,
      startCode: `# Store your details
name = ""
my_class =
subject = ""
city = ""

# Print them with labels
print("Name:", name)
print("Class:", my_class)
print("Favourite Subject:", subject)
print("City:", city)`,
      hint: `Strings need quotes: name = "Priya". Numbers don't: my_class = 11`,
      expectedOutput: `Name: [Your Name]
Class: [Your Class]
Favourite Subject: [Your Subject]
City: [Your City]`,
    },
  },

  {
    id: 'py-variables',
    category: 'Getting Started',
    title: 'Variables & Data Types',
    difficulty: 'Beginner',
    theory: [
      `A variable is a named container that stores a value in memory. In Python, you create a variable simply by assigning a value to a name — no declaration like int x = 0 needed!`,
      `Python has 5 core data types: int (whole numbers), float (decimals), str (text), bool (True/False), and NoneType (no value). Python automatically detects which type you need.`,
      `You can check or convert types using built-in functions: type(), int(), float(), str(), bool(). Type conversion is useful when reading user input (which is always a string) and doing math.`,
    ],
    syntax: `x = 10           # int
y = 3.14         # float
name = "Priya"   # str
flag = True      # bool (capital T/F!)
nothing = None   # NoneType`,
    code: `# Integer — whole numbers
students = 45
year = 2026
temperature = -5

# Float — decimal numbers
pi = 3.14159
cgpa = 9.8
price = 199.99

# String — text (use single or double quotes)
school = "Delhi Public School"
greeting = 'Namaste!'

# Boolean — only True or False
is_raining = False
has_passed = True

# None — absence of value
result = None

# Type checking
print(type(students))   # <class 'int'>
print(type(pi))         # <class 'float'>
print(type(school))     # <class 'str'>
print(type(is_raining)) # <class 'bool'>

# Type conversion
age_str = "17"
age_int = int(age_str)      # string → int
print(age_int + 1)          # 18

score = 95
score_str = str(score)      # int → string
print("Score: " + score_str) # "Score: 95"

# Multiple assignment
x = y = z = 0
a, b, c = 10, 20, 30
print(a, b, c)  # 10 20 30`,
    output: `<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
18
Score: 95
10 20 30`,
    notes: [
      `Variable names must start with a letter or underscore, not a number. Use snake_case (my_score, not myScore).`,
      `Python is dynamically typed — a variable can hold a string, then later hold an integer.`,
      `bool is a subtype of int: True == 1 and False == 0 in Python.`,
    ],
    practice: {
      title: 'Student Profile Variables',
      description: `Create variables for: student_name (str), roll_number (int), percentage (float), is_present (bool). Then convert percentage to int and print all values along with their types.`,
      startCode: `student_name = ""
roll_number =
percentage =
is_present =

# Print each variable and its type
print(student_name, type(student_name))
print(roll_number, type(roll_number))
print(percentage, type(percentage))
print(is_present, type(is_present))

# Convert percentage to int and print
percentage_int = int(percentage)
print("Rounded percentage:", percentage_int)`,
      hint: `Use int(percentage) to convert 92.5 to 92`,
    },
  },

  {
    id: 'py-strings',
    category: 'Getting Started',
    title: 'Strings & String Methods',
    difficulty: 'Beginner',
    theory: [
      `A string is a sequence of characters enclosed in single ('...') or double ("...") quotes. For multi-line strings, use triple quotes ("""..."""). Strings are immutable — you cannot change a character in place, but you can create new strings.`,
      `Python provides powerful built-in methods for string manipulation: converting case, searching, replacing, splitting, and trimming. These are used constantly in real-world programs.`,
      `f-strings (f"text {variable}") are the modern, preferred way to embed variables inside strings. They are faster and more readable than older concatenation (+) or format() methods.`,
    ],
    syntax: `s = "Hello"
len(s)           # length → 5
s.upper()        # → "HELLO"
s.lower()        # → "hello"
s[0]             # first char → 'H'
s[1:4]           # slice → "ell"
f"Hi {name}"     # f-string`,
    code: `name = "Priya Sharma"
subject = "Computer Science"

# Basic operations
print(len(name))          # 12 (length)
print(name.upper())       # PRIYA SHARMA
print(name.lower())       # priya sharma
print(name.title())       # Priya Sharma

# Indexing (0-based)
print(name[0])            # P (first char)
print(name[-1])           # a (last char)

# Slicing [start:end:step]
print(name[0:5])          # Priya
print(name[6:])           # Sharma
print(name[::-1])         # amarahS ayirP (reversed!)

# Useful methods
sentence = "  hello world  "
print(sentence.strip())         # "hello world" (removes spaces)
print(sentence.strip().title()) # "Hello World"

words = "Python,Java,SQL,HTML"
print(words.split(","))         # ['Python', 'Java', 'SQL', 'HTML']

print("Science" in subject)     # True (contains check)
print(name.replace("Sharma", "Singh"))  # Priya Singh

# f-strings (best way!)
marks = 98
print(f"Name: {name}")
print(f"Marks: {marks}/100")
print(f"Percentage: {marks:.2f}%")   # 2 decimal places
print(f"Grade: {'A+' if marks >= 90 else 'A'}")`,
    output: `12
PRIYA SHARMA
priya sharma
Priya Sharma
P
a
Priya
Sharma
amarahS ayirP
hello world
Hello World
['Python', 'Java', 'SQL', 'HTML']
True
Priya Singh
Name: Priya Sharma
Marks: 98/100
Percentage: 98.00%
Grade: A+`,
    notes: [
      `String indices start at 0. Negative indices count from the end: s[-1] is the last character.`,
      `f-strings are faster than "Hello " + name. Use them for formatting output.`,
      `Strings are immutable — name[0] = "X" will raise a TypeError. Create a new string instead.`,
    ],
    practice: {
      title: 'School ID Card Generator',
      description: `Write a program that takes a full name like "rahul kumar" and generates a formatted ID: capitalize to "Rahul Kumar", get initials "R.K.", and create an email "rahul.kumar@school.in". Use string methods and f-strings.`,
      startCode: `full_name = "rahul kumar"
roll = 42
class_name = "11A"

# 1. Format name properly
proper_name = full_name.title()

# 2. Get initials (hint: split by space, take first letter of each)
parts = full_name.split(" ")
initials = parts[0][0].upper() + "." + parts[1][0].upper() + "."

# 3. Create email (first.last@school.in)
email = f"{parts[0]}.{parts[1]}@school.in"

# 4. Print ID card
print(f"--- STUDENT ID CARD ---")
print(f"Name    : {proper_name}")
print(f"Initials: {initials}")
print(f"Roll No : {roll}")
print(f"Class   : {class_name}")
print(f"Email   : {email}")`,
      hint: `split(" ") splits a string by spaces. "rahul".split(" ") → ["rahul", "kumar"]`,
    },
  },

  {
    id: 'py-lists',
    category: 'Data Structures',
    title: 'Lists',
    difficulty: 'Beginner',
    theory: [
      `A list is an ordered, mutable (changeable) collection of items. Lists can hold any data type — even a mix of types. They are defined using square brackets [ ] and are one of the most used data structures in Python.`,
      `Lists are zero-indexed (first item is at index 0). You can access, modify, add, or remove items. Negative indexing lets you count from the end (-1 is last item).`,
      `Python provides many list methods: append(), extend(), insert(), remove(), pop(), sort(), reverse(), and more. List comprehensions offer a concise way to create lists.`,
    ],
    syntax: `my_list = [1, 2, 3]
my_list[0]          # access first → 1
my_list.append(4)   # add to end
my_list.remove(2)   # remove value 2
len(my_list)        # length → 3`,
    code: `# Creating lists
fruits = ["mango", "banana", "apple", "guava"]
marks = [85, 92, 78, 95, 88]
mixed = [1, "hello", True, 3.14]

# Access by index
print(fruits[0])      # mango
print(fruits[-1])     # guava (last item)
print(fruits[1:3])    # ['banana', 'apple'] (slice)

# Modify
fruits[2] = "orange"
print(fruits)          # ['mango', 'banana', 'orange', 'guava']

# Add items
fruits.append("pineapple")   # add to end
fruits.insert(1, "strawberry")  # insert at index 1

# Remove items
fruits.remove("banana")  # remove by value
popped = fruits.pop()    # remove and return last
print(popped)            # pineapple

# Useful operations
print(len(marks))        # 5
print(sum(marks))        # 438
print(max(marks))        # 95
print(min(marks))        # 78
print(sorted(marks))     # [78, 85, 88, 92, 95]

# Check membership
print("mango" in fruits)   # True

# List comprehension — create new lists in one line
squares = [x**2 for x in range(1, 6)]
print(squares)             # [1, 4, 9, 16, 25]

# Filter with comprehension
high_marks = [m for m in marks if m >= 90]
print(high_marks)          # [92, 95]`,
    output: `mango
guava
['banana', 'apple']
['mango', 'banana', 'orange', 'guava']
pineapple
5
438
95
78
[78, 85, 88, 92, 95]
True
[1, 4, 9, 16, 25]
[92, 95]`,
    notes: [
      `Lists are mutable — you can change them in-place. Tuples (with parentheses) are immutable.`,
      `sort() modifies the list in-place. sorted() returns a new sorted list leaving the original unchanged.`,
      `List comprehension [expr for item in list if condition] is faster and more Pythonic than for-loop + append.`,
    ],
    practice: {
      title: 'Marks Analyzer',
      description: `Create a list of 6 student marks. Write code to find: average, highest, lowest, count of students who passed (≥60), and list all marks above average. Print results neatly.`,
      startCode: `marks = [72, 85, 45, 91, 63, 88]

# Calculate average
average = sum(marks) / len(marks)

# Find highest and lowest
highest = max(marks)
lowest = min(marks)

# Count students who passed (marks >= 60)
passed = len([m for m in marks if m >= 60])

# Marks above average
above_avg = [m for m in marks if m > average]

print(f"Average    : {average:.2f}")
print(f"Highest    : {highest}")
print(f"Lowest     : {lowest}")
print(f"Passed     : {passed} out of {len(marks)}")
print(f"Above avg  : {above_avg}")`,
      hint: `sum(marks) gives total, len(marks) gives count. Divide for average.`,
    },
  },

  {
    id: 'py-dicts',
    category: 'Data Structures',
    title: 'Dictionaries',
    difficulty: 'Beginner',
    theory: [
      `A dictionary stores data as key-value pairs, like a real dictionary where you look up a word (key) to find its meaning (value). Keys must be unique and immutable (strings, numbers, tuples). Values can be anything.`,
      `Dictionaries are defined with curly braces { }. You access values by key: d["key"]. They are unordered in Python < 3.7, but maintain insertion order in Python 3.7+.`,
      `Use .keys(), .values(), .items() to iterate. The .get() method is safer than [] as it returns None instead of raising a KeyError if the key doesn't exist.`,
    ],
    syntax: `d = {"key": "value", "age": 16}
d["key"]          # access → "value"
d["new"] = 99     # add/update
d.get("missing")  # → None (safe)
"key" in d        # → True`,
    code: `# Create a student dictionary
student = {
    "name": "Kavya",
    "age": 16,
    "class": "11",
    "marks": [92, 88, 95, 79, 91],
    "city": "Hyderabad",
    "is_present": True
}

# Access values
print(student["name"])       # Kavya
print(student["marks"][0])   # 92 (list inside dict!)

# Safe access with .get()
print(student.get("phone", "Not provided"))  # Not provided

# Modify
student["age"] = 17
student["stream"] = "Science"   # add new key

# Keys, values, items
print(student.keys())
print(student.values())

# Iterate over key-value pairs
for key, value in student.items():
    print(f"  {key}: {value}")

# Nested dictionary — real-world example
school = {
    "class_11A": {"strength": 40, "monitor": "Arjun"},
    "class_11B": {"strength": 38, "monitor": "Priya"},
}
print(school["class_11A"]["monitor"])  # Arjun

# Dictionary comprehension
squares = {x: x**2 for x in range(1, 6)}
print(squares)   # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Remove a key
del student["is_present"]
print(student.get("is_present"))  # None`,
    output: `Kavya
92
Not provided
dict_keys(['name', 'age', 'class', 'marks', 'city', 'is_present'])
dict_values([...])
  name: Kavya
  age: 17
  ...
Arjun
{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
None`,
    notes: [
      `Use d.get("key", default) instead of d["key"] to avoid KeyError when the key might not exist.`,
      `Dictionaries are very fast for lookups — O(1) time complexity. Perfect for counting, grouping, and caching.`,
      `JSON (used in APIs and web apps) is basically a dictionary — knowing dicts makes working with APIs easy.`,
    ],
    practice: {
      title: 'Contact Book',
      description: `Create a dictionary called contacts with 3 names as keys and their phone numbers as values. Then: add a new contact, update an existing one, print all contacts using a loop, and safely look up a contact that may not exist.`,
      startCode: `contacts = {
    "Arjun": "9876543210",
    "Priya": "8765432109",
    "Rahul": "7654321098"
}

# Add a new contact
contacts["Kavya"] = "9988776655"

# Update Arjun's number
contacts["Arjun"] = "9111111111"

# Print all contacts
print("--- Contact Book ---")
for name, phone in contacts.items():
    print(f"{name}: {phone}")

# Safe lookup
unknown = contacts.get("Vikram", "Contact not found")
print(f"\\nVikram: {unknown}")`,
      hint: `Use .items() to get (key, value) pairs in the for loop.`,
    },
  },

  {
    id: 'py-conditions',
    category: 'Control Flow',
    title: 'If / Elif / Else',
    difficulty: 'Beginner',
    theory: [
      `Conditional statements let your program make decisions. Python uses if, elif (else-if), and else. Only the first True condition block runs; the rest are skipped.`,
      `Comparison operators: == (equal), != (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal). Logical operators: and, or, not.`,
      `Python also has a one-line ternary expression: value_if_true if condition else value_if_false. Useful for simple assignments.`,
    ],
    syntax: `if condition:
    # runs if True
elif another_condition:
    # runs if second is True
else:
    # runs if none above is True`,
    code: `marks = 82

# Basic if-elif-else
if marks >= 90:
    grade = "A+"
elif marks >= 80:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 60:
    grade = "C"
else:
    grade = "F — Needs improvement"

print(f"Marks: {marks}, Grade: {grade}")

# Logical operators
age = 17
has_id = True

if age >= 18 and has_id:
    print("Can vote")
elif age >= 18 and not has_id:
    print("Bring ID card")
else:
    print(f"Too young — need {18-age} more year(s)")

# Check multiple values with 'in'
day = "Saturday"
if day in ["Saturday", "Sunday"]:
    print(f"{day} is a weekend 🎉")
else:
    print(f"{day} is a weekday 📚")

# Nested conditions
score = 75
attendance = 85
if score >= 60:
    if attendance >= 75:
        print("Eligible for exam")
    else:
        print("Score OK but attendance too low")
else:
    print("Score too low")

# Ternary (one-liner)
status = "Pass" if marks >= 60 else "Fail"
print(f"Status: {status}")`,
    output: `Marks: 82, Grade: A
Too young — need 1 more year(s)
Saturday is a weekend 🎉
Eligible for exam
Status: Pass`,
    notes: [
      `Use == to compare values (not =, which is assignment). A classic beginner mistake: if x = 5 is a SyntaxError.`,
      `Python truthy/falsy: 0, "", [], {}, None are all falsy. Everything else is truthy.`,
      `Indentation is critical! All code inside an if block must be indented consistently (4 spaces).`,
    ],
    practice: {
      title: 'Scholarship Checker',
      description: `A student gets a scholarship if: marks ≥ 85 AND attendance ≥ 80. They get a partial scholarship if: marks ≥ 75 AND attendance ≥ 75. Otherwise, no scholarship. Write a program to check and print the scholarship type.`,
      startCode: `marks = 87
attendance = 82

if marks >= 85 and attendance >= 80:
    scholarship = "Full Scholarship 🏆"
elif marks >= 75 and attendance >= 75:
    scholarship = "Partial Scholarship 🥈"
else:
    scholarship = "No Scholarship — Keep trying! 💪"

print(f"Marks: {marks}%")
print(f"Attendance: {attendance}%")
print(f"Result: {scholarship}")`,
      hint: `Use 'and' to check multiple conditions at once.`,
    },
  },

  {
    id: 'py-loops',
    category: 'Control Flow',
    title: 'For & While Loops',
    difficulty: 'Beginner',
    theory: [
      `Loops let you repeat code. Python has two types: for loops (iterate over a sequence) and while loops (repeat while a condition is True).`,
      `The range() function generates a sequence of numbers: range(5) → 0,1,2,3,4. range(1,6) → 1,2,3,4,5. range(1,10,2) → 1,3,5,7,9. Very commonly used with for loops.`,
      `break exits the loop immediately. continue skips to the next iteration. for/while loops can have an else block that runs only if the loop completed without a break.`,
    ],
    syntax: `for item in sequence:
    # repeats for each item

for i in range(n):
    # repeats n times (0 to n-1)

while condition:
    # repeats while True`,
    code: `# For loop over a list
subjects = ["Maths", "Physics", "Chemistry", "Biology"]
for subject in subjects:
    print(f"Studying: {subject}")

# For loop with range
print("\\nCounting to 5:")
for i in range(1, 6):
    print(i, end=" ")
print()  # newline

# range with step — multiplication table
n = 7
print(f"\\nTable of {n}:")
for i in range(1, 11):
    print(f"{n} x {i} = {n*i}")

# While loop
print("\\nCountdown:")
count = 5
while count > 0:
    print(count, end=" ")
    count -= 1
print("Go!")

# break — exit loop early
print("\\nFind first even:")
numbers = [3, 7, 8, 2, 5, 10]
for num in numbers:
    if num % 2 == 0:
        print(f"First even: {num}")
        break

# continue — skip iteration
print("\\nOdd numbers only:")
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")

# Nested loops — pattern
print("\\n\\nStar pattern:")
for row in range(1, 6):
    print("* " * row)`,
    output: `Studying: Maths
Studying: Physics
Studying: Chemistry
Studying: Biology

Counting to 5:
1 2 3 4 5

Table of 7:
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70

Countdown:
5 4 3 2 1 Go!

Find first even:
First even: 8

Odd numbers only:
1 3 5 7 9

Star pattern:
*
* *
* * *
* * * *
* * * * *`,
    notes: [
      `enumerate(list) gives both index and value: for i, val in enumerate(my_list).`,
      `zip(list1, list2) lets you iterate over two lists simultaneously.`,
      `Avoid infinite while loops — always make sure the condition will eventually become False.`,
    ],
    practice: {
      title: 'FizzBuzz (Classic Interview Question!)',
      description: `Print numbers 1 to 30. But: print "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for multiples of both. Then also print the sum of all numbers from 1 to 100 using a loop.`,
      startCode: `# FizzBuzz
for i in range(1, 31):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)

# Sum 1 to 100
total = 0
for i in range(1, 101):
    total += i
print(f"\\nSum of 1 to 100 = {total}")`,
      hint: `Check for FizzBuzz FIRST (before Fizz or Buzz) since it's the most specific condition.`,
      expectedOutput: `1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz...\n\nSum of 1 to 100 = 5050`,
    },
  },

  {
    id: 'py-functions',
    category: 'Functions',
    title: 'Functions',
    difficulty: 'Intermediate',
    theory: [
      `A function is a named, reusable block of code defined with the def keyword. Functions help you avoid repeating code (DRY — Don't Repeat Yourself), organize your program, and make it easy to test individual parts.`,
      `Functions can take parameters (inputs) and return values (output). Parameters can have default values. *args collects extra positional arguments as a tuple, **kwargs collects extra keyword arguments as a dict.`,
      `Lambda functions (lambda x: x*2) are small anonymous functions for simple operations, often used with map(), filter(), and sorted().`,
    ],
    syntax: `def function_name(param1, param2=default):
    # code
    return result

result = function_name(value1, value2)`,
    code: `# Basic function
def greet(name):
    return f"Namaste, {name}! 🙏"

print(greet("Priya"))
print(greet("Arjun"))

# Multiple parameters with default value
def calculate_grade(marks, total=100):
    percentage = (marks / total) * 100
    if percentage >= 90: return "A+"
    elif percentage >= 80: return "A"
    elif percentage >= 70: return "B"
    else: return "C"

print(calculate_grade(92))        # uses total=100
print(calculate_grade(46, 60))    # 46 out of 60

# Return multiple values
def stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

lo, hi, avg = stats([72, 88, 95, 61, 84])
print(f"Low: {lo}, High: {hi}, Avg: {avg:.1f}")

# *args — variable number of arguments
def add_all(*numbers):
    return sum(numbers)

print(add_all(1, 2, 3))       # 6
print(add_all(10, 20, 30, 40)) # 100

# **kwargs — keyword arguments
def build_profile(**info):
    for key, value in info.items():
        print(f"  {key}: {value}")

build_profile(name="Kavya", city="Chennai", grade="A+")

# Lambda functions
square = lambda x: x ** 2
print(square(5))   # 25

nums = [4, 1, 9, 3, 7]
print(sorted(nums, key=lambda x: -x))  # sort descending
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [4]`,
    output: `Namaste, Priya! 🙏
Namaste, Arjun! 🙏
A+
A+
Low: 61, High: 95, Avg: 80.0
6
100
  name: Kavya
  city: Chennai
  grade: A+
25
[9, 7, 4, 3, 1]
[4]`,
    notes: [
      `A function that doesn't have a return statement returns None by default.`,
      `Functions are first-class objects in Python — you can pass them as arguments to other functions.`,
      `Prefer descriptive function names: calculate_average() is better than calc() or ca().`,
    ],
    practice: {
      title: 'Report Card Generator',
      description: `Write a function generate_report(name, *subject_marks) that takes a student name and any number of marks. It should calculate percentage, assign a grade, and return a formatted report card string. Test it with at least 2 students.`,
      startCode: `def generate_report(name, *marks):
    if not marks:
        return f"{name}: No marks provided"

    total = sum(marks)
    count = len(marks)
    percentage = total / count

    if percentage >= 90:
        grade = "A+"
    elif percentage >= 80:
        grade = "A"
    elif percentage >= 70:
        grade = "B"
    else:
        grade = "C"

    report = f"""
--- REPORT CARD ---
Name       : {name}
Subjects   : {count}
Total Marks: {total}/{count*100}
Percentage : {percentage:.1f}%
Grade      : {grade}
-------------------"""
    return report

print(generate_report("Arjun", 92, 88, 79, 95, 84))
print(generate_report("Priya", 78, 82, 71, 69, 88))`,
      hint: `*marks collects all positional arguments after 'name' into a tuple.`,
    },
  },

  {
    id: 'py-oop',
    category: 'Object-Oriented Programming',
    title: 'Classes & Objects',
    difficulty: 'Intermediate',
    theory: [
      `Object-Oriented Programming (OOP) models real-world entities as objects. A class is a blueprint; an object is an instance of that class. For example, "Student" is a class; "Arjun" is an object.`,
      `The __init__ method (constructor) runs automatically when you create an object. self refers to the current object instance. Attributes (self.name) store data; methods (def study()) define behavior.`,
      `OOP pillars: Encapsulation (bundle data + methods), Inheritance (child class reuses parent class), Polymorphism (same method name, different behavior), Abstraction (hide complexity).`,
    ],
    syntax: `class ClassName:
    def __init__(self, param):
        self.attr = param       # attribute

    def method(self):
        return self.attr        # method

obj = ClassName(value)  # create object
obj.method()            # call method`,
    code: `class Student:
    school = "Delhi Public School"  # class variable (shared)

    def __init__(self, name, age, marks):
        # instance variables (unique to each object)
        self.name = name
        self.age = age
        self.marks = marks

    def grade(self):
        avg = sum(self.marks) / len(self.marks)
        if avg >= 90: return "A+"
        elif avg >= 80: return "A"
        else: return "B"

    def average(self):
        return sum(self.marks) / len(self.marks)

    def report(self):
        return f"{self.name} | Avg: {self.average():.1f} | Grade: {self.grade()}"

    def __str__(self):  # string representation
        return f"Student({self.name}, Age {self.age})"

# Create objects
s1 = Student("Arjun", 17, [92, 88, 95, 79])
s2 = Student("Priya", 16, [85, 91, 88, 94])

print(s1)               # calls __str__
print(s1.report())
print(s2.report())
print(Student.school)   # class variable

# Inheritance — TeacherStudent extends Student
class TeacherStudent(Student):
    def __init__(self, name, age, marks, teaches):
        super().__init__(name, age, marks)  # call parent __init__
        self.teaches = teaches

    def report(self):  # override parent method
        base = super().report()
        return f"{base} | Teaches: {self.teaches}"

ts = TeacherStudent("Ravi", 20, [95, 98, 92], "Python")
print(ts.report())
print(isinstance(ts, Student))   # True — is a Student
print(isinstance(ts, TeacherStudent))  # True`,
    output: `Student(Arjun, Age 17)
Arjun | Avg: 88.5 | Grade: A
Priya | Avg: 89.5 | Grade: A
Delhi Public School
Ravi | Avg: 95.0 | Grade: A+ | Teaches: Python
True
True`,
    notes: [
      `Always use self as the first parameter in methods — it refers to the current object instance.`,
      `super() calls the parent class method, useful in inheritance to extend (not replace) parent behavior.`,
      `Special (dunder) methods like __str__, __len__, __add__ let you customize how objects behave with Python operators.`,
    ],
    practice: {
      title: 'Bank Account',
      description: `Create a BankAccount class with: owner (str), balance (float) attributes. Methods: deposit(amount), withdraw(amount) (print error if insufficient funds), and show_balance(). Create 2 accounts, do some transactions, and print balances.`,
      startCode: `class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.balance = initial_balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited ₹{amount}. New balance: ₹{self.balance}")
        else:
            print("Invalid deposit amount")

    def withdraw(self, amount):
        if amount > self.balance:
            print(f"Insufficient funds! Balance: ₹{self.balance}")
        elif amount <= 0:
            print("Invalid withdrawal amount")
        else:
            self.balance -= amount
            print(f"Withdrawn ₹{amount}. New balance: ₹{self.balance}")

    def show_balance(self):
        print(f"{self.owner}'s Balance: ₹{self.balance}")

# Test it
acc1 = BankAccount("Arjun", 5000)
acc2 = BankAccount("Priya")

acc1.deposit(2000)
acc1.withdraw(1500)
acc1.withdraw(10000)  # should show error

acc2.deposit(3000)
acc2.show_balance()
acc1.show_balance()`,
      hint: `Check if amount > self.balance before withdrawing. self.balance -= amount deducts the money.`,
    },
  },

  {
    id: 'py-exceptions',
    category: 'Error Handling',
    title: 'Exception Handling',
    difficulty: 'Intermediate',
    theory: [
      `An exception is an error that occurs during program execution. Without handling, it crashes your program. Python's try/except block lets you catch errors and respond gracefully.`,
      `Common exceptions: ValueError (wrong type conversion), ZeroDivisionError, IndexError (list out of range), KeyError (dict key missing), FileNotFoundError, TypeError. You can also raise your own exceptions.`,
      `The finally block always runs, even if an exception occurred — perfect for cleanup (closing files, database connections). The else block runs only if no exception occurred.`,
    ],
    syntax: `try:
    # risky code
except ExceptionType as e:
    # handle error
else:
    # runs only if no error
finally:
    # always runs`,
    code: `# Basic try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catching multiple exceptions
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero"
    except TypeError:
        return "Error: Invalid types"

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # Error: Division by zero
print(safe_divide("a", 2))   # Error: Invalid types

# Getting exception details
try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError as e:
    print(f"Caught: {e}")    # list index out of range

# else and finally
def read_number(text):
    try:
        num = int(text)
    except ValueError as e:
        print(f"Invalid input: {e}")
        return None
    else:
        print(f"Converted successfully: {num}")
        return num
    finally:
        print("read_number() finished")

read_number("42")
read_number("hello")

# Raising your own exception
def check_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if age > 150:
        raise ValueError(f"Age seems too high: {age}")
    return f"Valid age: {age}"

try:
    print(check_age(25))
    print(check_age(-5))
except ValueError as e:
    print(f"Error: {e}")`,
    output: `Cannot divide by zero!
5.0
Error: Division by zero
Error: Invalid types
Caught: list index out of range
Converted successfully: 42
read_number() finished
Invalid input: invalid literal for int() with base 10: 'hello'
read_number() finished
Valid age: 25
Error: Age cannot be negative: -5`,
    notes: [
      `Use specific exception types (ValueError, not just Exception) to avoid hiding unexpected bugs.`,
      `raise re-raises the current exception: except Exception: ... raise (useful for logging before re-raising).`,
      `File operations, database connections, and API calls should always be wrapped in try/except.`,
    ],
    practice: {
      title: 'Safe Calculator',
      description: `Build a function safe_calculate(a, op, b) that handles these operations: +, -, *, /. It should raise a ValueError for unknown operators, handle division by zero gracefully, and handle non-numeric inputs with a clear error message.`,
      startCode: `def safe_calculate(a, op, b):
    try:
        a, b = float(a), float(b)
    except ValueError:
        return "Error: inputs must be numbers"

    if op == '+':
        return a + b
    elif op == '-':
        return a - b
    elif op == '*':
        return a * b
    elif op == '/':
        if b == 0:
            return "Error: cannot divide by zero"
        return a / b
    else:
        raise ValueError(f"Unknown operator: {op}")

# Test cases
print(safe_calculate(10, '+', 5))
print(safe_calculate(10, '/', 0))
print(safe_calculate("abc", '+', 5))

try:
    print(safe_calculate(10, '**', 2))
except ValueError as e:
    print(f"Caught: {e}")`,
      hint: `Convert a and b to float inside a try block to catch invalid inputs.`,
    },
  },

  // ─── Numbers & Type Casting ──────────────────────────────────────────────────
  {
    id: 'py-numbers',
    category: 'Core Python',
    title: 'Numbers & Type Casting',
    difficulty: 'Beginner',
    theory: [
      `Python has three numeric types: int (whole numbers like 5, -3, 1000), float (decimals like 3.14, -0.5, 2.0), and complex (for advanced maths like 3+4j — rarely needed at school level).`,
      `Type casting converts one type to another: int("42") converts string "42" to integer 42. float(7) converts integer 7 to float 7.0. str(100) converts integer 100 to string "100". This is essential when reading user input (always comes as string) and doing arithmetic.`,
      `Python arithmetic operators: + (add), - (subtract), * (multiply), / (true divide — always returns float), // (floor divide — drops decimal), % (modulo — remainder), ** (power/exponent).`,
    ],
    syntax: `int(x)     # convert to integer
float(x)   # convert to float
str(x)     # convert to string
round(x, n) # round to n decimal places`,
    code: `# Numbers in Python
a = 10
b = 3

print("Addition:      ", a + b)    # 13
print("Subtraction:   ", a - b)    # 7
print("Multiplication:", a * b)    # 30
print("True division: ", a / b)    # 3.3333...
print("Floor division:", a // b)   # 3  (drops decimal)
print("Modulo:        ", a % b)    # 1  (remainder of 10÷3)
print("Power:         ", a ** b)   # 1000

# Type casting
user_input = "97"             # from input() — always a string
marks = int(user_input)       # now we can do maths
print("Marks + 3 bonus:", marks + 3)

price = "49.99"
price_float = float(price)
print("Price * 2:", price_float * 2)

# Practical: BMI calculator
weight_kg = 60.0
height_m  = 1.72
bmi = weight_kg / (height_m ** 2)
print(f"\nBMI: {round(bmi, 2)}")
print("Category:", "Normal" if 18.5 <= bmi <= 24.9 else "Check BMI chart")`,
    output: `Addition:       13
Subtraction:    7
Multiplication: 30
True division:  3.3333333333333335
Floor division: 3
Modulo:         1
Power:          1000
Marks + 3 bonus: 100
Price * 2: 99.98

BMI: 20.28
Category: Normal`,
    notes: [
      `10 / 3 = 3.333... (float), 10 // 3 = 3 (int floor), 10 % 3 = 1 (remainder).`,
      `Modulo (%) is very useful: even/odd check (n % 2 == 0), checking divisibility, wrapping numbers in a range.`,
      `Never compare floats with ==. Use round() first or check abs(a - b) < 0.0001 because 0.1 + 0.2 = 0.30000000000000004 in Python!`,
    ],
    practice: {
      title: 'Percentage & Grade Calculator',
      description: `Ask the user for marks in 5 subjects (simulate with variables). Calculate total, percentage, and assign grade: ≥90=A+, ≥80=A, ≥70=B, ≥60=C, ≥40=D, else F.`,
      startCode: `# Simulate user input with variables
m1, m2, m3, m4, m5 = 85, 72, 91, 68, 77
max_marks = 500

# Calculate total and percentage
total = m1 + m2 + m3 + m4 + m5
percentage = (total / max_marks) * 100

# Assign grade
if percentage >= 90:
    grade = "A+"
# YOUR CODE: add elif for A, B, C, D, F

print(f"Total: {total}/500")
print(f"Percentage: {round(percentage, 2)}%")
print(f"Grade: {grade}")`,
      hint: `elif percentage >= 80: grade = "A" elif percentage >= 70: grade = "B" etc.`,
    },
  },

  // ─── String Methods ──────────────────────────────────────────────────────────
  {
    id: 'py-string-methods',
    category: 'Core Python',
    title: 'String Methods — Powerful Text Operations',
    difficulty: 'Beginner',
    theory: [
      `Python strings are objects with built-in methods (functions) you can call using dot notation: text.method(). These let you manipulate, search, and transform text without writing loops.`,
      `Most used string methods: upper() / lower() / title() (case changes), strip() / lstrip() / rstrip() (remove whitespace), split() (split into list), join() (join list into string), replace() (find and replace), find() / index() (find position), startswith() / endswith() (check start/end), count() (count occurrences), len() (length — not a method but a function).`,
      `String formatting: f-strings (f"Hello {name}") are the modern standard — readable, fast, and support expressions inside. format() and % are older styles you may see in legacy code.`,
    ],
    syntax: `text = "  Hello, India!  "
text.upper()        # "  HELLO, INDIA!  "
text.lower()        # "  hello, india!  "
text.strip()        # "Hello, India!"
text.replace("India", "World")  # "  Hello, World!  "
text.split(", ")    # ["  Hello", "India!  "]
", ".join(["a", "b", "c"])  # "a, b, c"
f"Value is {42 * 2}"   # "Value is 84"`,
    code: `# String methods practice

name = "  arjun kumar sharma  "
print("Original:  |" + name + "|")
print("strip():   |" + name.strip() + "|")
print("title():   |" + name.strip().title() + "|")
print("upper():   |" + name.strip().upper() + "|")

# Searching
sentence = "Python is great. Python is fun. I love Python!"
print(f"\nThe word 'Python' appears: {sentence.count('Python')} times")
print(f"Starts with 'Python': {sentence.startswith('Python')}")
print(f"Find 'great': position {sentence.find('great')}")

# Replace
clean = sentence.replace("Python", "programming")
print(f"\nAfter replace: {clean}")

# Split and join
csv_line = "Arjun,85,Delhi,Science"
fields = csv_line.split(",")
print(f"\nSplit: {fields}")
print(f"Name: {fields[0]}, Marks: {fields[1]}")

# Rejoin with separator
rejoined = " | ".join(fields)
print(f"Rejoined: {rejoined}")

# F-strings
student = "Priya"
marks = 92
print(f"\n{student} scored {marks}/100 → {'Pass' if marks >= 40 else 'Fail'}")
print(f"Percentage: {marks:.2f}% | Grade: {'A+' if marks >= 90 else 'A'}")`,
    output: `Original:  |  arjun kumar sharma  |
strip():   |arjun kumar sharma|
title():   |Arjun Kumar Sharma|
upper():   |ARJUN KUMAR SHARMA|

The word 'Python' appears: 3 times
Starts with 'Python': True
Find 'great': position 10

After replace: programming is great. programming is fun. I love programming!

Split: ['Arjun', '85', 'Delhi', 'Science']
Name: Arjun, Marks: 85

Rejoined: Arjun | 85 | Delhi | Science

Priya scored 92/100 → Pass
Percentage: 92.00% | Grade: A+`,
    notes: [
      `Strings are immutable — methods return a NEW string, they don't change the original.`,
      `strip() removes leading AND trailing whitespace. lstrip() only left, rstrip() only right. Useful for cleaning user input and CSV data.`,
      `f-strings support any Python expression: f"{2**10}" = "1024", f"{name.upper()}" = "ARJUN", f"{price:.2f}" = "49.99" (2 decimal places).`,
    ],
    practice: {
      title: 'Name Formatter',
      description: `Write a function format_name(raw_name) that: strips whitespace, converts to title case, removes double spaces, and returns the clean name. Test with: "  arJUN kumar   ", "PRIYA   SINGH  ", "rahul".`,
      startCode: `def format_name(raw_name):
    # Step 1: Strip leading/trailing whitespace
    name = raw_name.strip()

    # Step 2: Convert to title case
    # YOUR CODE

    # Step 3: Remove double spaces (loop until no double spaces)
    while "  " in name:
        name = name.replace("  ", " ")

    return name

tests = ["  arJUN kumar   ", "PRIYA   SINGH  ", "rahul", "  sneha  reddy  "]
for t in tests:
    print(f"'{t}' → '{format_name(t)}'")`,
      hint: `name = name.title() converts to Title Case.`,
    },
  },

  // ─── Tuples & Sets ────────────────────────────────────────────────────────────
  {
    id: 'py-tuples-sets',
    category: 'Core Python',
    title: 'Tuples and Sets',
    difficulty: 'Beginner',
    theory: [
      `Python has 4 main collection types: list (ordered, mutable), tuple (ordered, immutable), set (unordered, no duplicates), dict (key-value pairs). Choosing the right one matters for correctness and performance.`,
      `Tuple: Like a list but immutable (can't be changed after creation). Use tuples for data that shouldn't change: coordinates (x, y), RGB colours (255, 0, 0), database records. Tuples are faster than lists and can be used as dictionary keys.`,
      `Set: Unordered collection with NO duplicates. Automatically removes duplicates when you add elements. Excellent for: removing duplicates from a list, checking membership (in operator is O(1) — instant), set operations (union ∪, intersection ∩, difference −).`,
    ],
    syntax: `# Tuple — immutable
point = (10, 20)
colours = ("red", "green", "blue")

# Set — no duplicates, unordered
unique_marks = {85, 72, 85, 91, 72}  # becomes {72, 85, 91}

# Set operations:
set_a | set_b   # union
set_a & set_b   # intersection
set_a - set_b   # difference`,
    code: `# TUPLES
student_record = ("Arjun Sharma", 17, "Delhi", "Class 11")
name, age, city, cls = student_record  # tuple unpacking
print(f"Name: {name}, Age: {age}, City: {city}")

# Tuples in loops
coordinates = [(0,0), (3,4), (1,1), (5,2)]
for x, y in coordinates:
    dist = (x**2 + y**2) ** 0.5
    print(f"  ({x},{y}) → distance from origin: {dist:.2f}")

# SETS — removing duplicates
student_cities = ["Delhi", "Mumbai", "Delhi", "Chennai", "Mumbai", "Pune", "Delhi"]
unique_cities = set(student_cities)
print(f"\nCities (with duplicates): {student_cities}")
print(f"Unique cities: {unique_cities}")
print(f"Count: {len(student_cities)} → {len(unique_cities)}")

# Set operations — practical example
physics_students = {"Arjun", "Priya", "Rahul", "Sneha", "Vikram"}
maths_students   = {"Priya", "Sneha", "Anjali", "Deepa", "Vikram"}

both_subjects = physics_students & maths_students   # intersection
only_physics  = physics_students - maths_students   # difference
all_students  = physics_students | maths_students   # union

print(f"\nBoth Physics AND Maths: {both_subjects}")
print(f"Only Physics (not Maths): {only_physics}")
print(f"Total unique students: {len(all_students)}")

# Membership check — O(1) with set vs O(n) with list
students_set = {"Arjun", "Priya", "Rahul"}
print(f"\n'Priya' in set: {'Priya' in students_set}")  # instant!`,
    output: `Name: Arjun Sharma, Age: 17, City: Delhi
  (0,0) → distance from origin: 0.00
  (3,4) → distance from origin: 5.00
  (1,1) → distance from origin: 1.41
  (5,2) → distance from origin: 5.39

Cities (with duplicates): ['Delhi', 'Mumbai', 'Delhi', ...]
Unique cities: {'Pune', 'Delhi', 'Chennai', 'Mumbai'}
Count: 7 → 4

Both Physics AND Maths: {'Vikram', 'Priya', 'Sneha'}
Only Physics (not Maths): {'Arjun', 'Rahul'}
Total unique students: 7

'Priya' in set: True`,
    notes: [
      `Tuple vs List: If data shouldn't change, use tuple — it's faster and "documents intent". If you need append/remove, use list.`,
      `Set is perfect for "unique items" problems: find unique words in a text, unique visitors to a website, students who took multiple tests.`,
      `set() is the fastest way to remove duplicates from a list: unique_list = list(set(original_list)). Note: set doesn't preserve order.`,
    ],
    practice: {
      title: 'Common Students Finder',
      description: `You have attendance for 3 days. Find: (1) students who attended ALL 3 days (intersection of 3 sets), (2) students who attended at least 1 day (union), (3) students who attended day 1 but NOT day 3.`,
      startCode: `day1 = {"Arjun", "Priya", "Rahul", "Sneha", "Vikram"}
day2 = {"Priya", "Sneha", "Anjali", "Vikram", "Deepa"}
day3 = {"Arjun", "Priya", "Anjali", "Deepa", "Kiran"}

# All 3 days
all_3_days = day1 & day2 & day3
print("Attended ALL 3 days:", all_3_days)

# At least 1 day
at_least_1 = day1 | day2 | day3
print("At least 1 day:", len(at_least_1), "students")

# Day 1 but NOT day 3
# YOUR CODE
only_day1_not_day3 = None
print("Day 1 but not Day 3:", only_day1_not_day3)`,
      hint: `only_day1_not_day3 = day1 - day3`,
    },
  },

  // ─── Lambda ──────────────────────────────────────────────────────────────────
  {
    id: 'py-lambda',
    category: 'Functions',
    title: 'Lambda Functions — One-Line Functions',
    difficulty: 'Intermediate',
    theory: [
      `A lambda function is a small, anonymous (nameless) function defined in a single line. It's useful when you need a simple function for a short time — especially as an argument to other functions.`,
      `Syntax: lambda arguments: expression. A lambda can take multiple arguments but has only one expression (which is automatically returned). It cannot contain if/else blocks (unless as a ternary expression) or loops.`,
      `Lambda is most commonly used with: sorted() for custom sort keys, map() to apply a function to every item, filter() to select items meeting a condition. These are called "higher-order functions".`,
    ],
    syntax: `# Regular function vs lambda:
def square(x): return x**2
square_lambda = lambda x: x**2

# Multi-argument lambda:
add = lambda x, y: x + y

# Lambda as sort key:
sorted(students, key=lambda s: s['marks'])`,
    code: `# Lambda functions

# Basic lambdas
square  = lambda x: x**2
add     = lambda x, y: x + y
grade   = lambda m: "Pass" if m >= 40 else "Fail"

print(square(7))         # 49
print(add(3, 5))         # 8
print(grade(72))         # Pass
print(grade(35))         # Fail

# Lambda with sorted()
students = [
    {"name": "Arjun",  "marks": 85},
    {"name": "Priya",  "marks": 72},
    {"name": "Sneha",  "marks": 96},
    {"name": "Rahul",  "marks": 58},
]

# Sort by marks (ascending)
by_marks = sorted(students, key=lambda s: s["marks"])
print("\nSorted by marks:")
for s in by_marks:
    print(f"  {s['name']}: {s['marks']}")

# Sort by name (alphabetical)
by_name = sorted(students, key=lambda s: s["name"])
print("\nSorted by name:")
for s in by_name:
    print(f"  {s['name']}: {s['marks']}")

# map() — apply function to every item
marks_list = [85, 72, 58, 96, 45]
percentages = list(map(lambda m: f"{m}%", marks_list))
print("\nPercentages:", percentages)

# filter() — keep only items meeting condition
passed = list(filter(lambda m: m >= 40, marks_list))
print("Passed:", passed)`,
    output: `49
8
Pass
Fail

Sorted by marks:
  Rahul: 58
  Priya: 72
  Arjun: 85
  Sneha: 96

Sorted by name:
  Arjun: 85
  Priya: 72
  Rahul: 58
  Sneha: 96

Percentages: ['85%', '72%', '58%', '96%', '45%']
Passed: [85, 72, 96, 45]`,
    notes: [
      `Lambda is syntactic sugar — anything lambda does, a regular function can also do. Use lambda only when the function is short and used only once.`,
      `Lambda with sorted: sorted(data, key=lambda x: x['field'], reverse=True) sorts by any field, descending.`,
      `List comprehensions are often more readable than map/filter: [m for m in marks if m >= 40] is clearer than list(filter(lambda m: m >= 40, marks)).`,
    ],
    practice: {
      title: 'Sort by Multiple Keys',
      description: `Sort a list of students first by grade (descending: A+ first), then by name (ascending: A-Z) for students with the same grade. Use sorted() with a lambda that returns a tuple (for multi-key sorting).`,
      startCode: `students = [
    {"name": "Vikram",  "grade": "B"},
    {"name": "Arjun",   "grade": "A+"},
    {"name": "Priya",   "grade": "A"},
    {"name": "Sneha",   "grade": "A+"},
    {"name": "Rahul",   "grade": "B"},
    {"name": "Anjali",  "grade": "A"},
]

grade_order = {"A+": 1, "A": 2, "B": 3, "C": 4, "D": 5, "F": 6}

# Sort by grade order first, then by name
sorted_students = sorted(
    students,
    key=lambda s: (grade_order[s['grade']], s['name'])
    # This sorts by grade_order first, then name alphabetically for ties
)

print("Students sorted by grade then name:")
for s in sorted_students:
    print(f"  {s['grade']}: {s['name']}")`,
      hint: `The lambda returns a tuple (grade_order[s['grade']], s['name']). Python sorts tuples element by element — so grade comes first, then name for same grade.`,
    },
  },

  // ─── List Comprehensions ─────────────────────────────────────────────────────
  {
    id: 'py-list-comprehension',
    category: 'Core Python',
    title: 'List Comprehensions — Pythonic Data Processing',
    difficulty: 'Intermediate',
    theory: [
      `List comprehension is a concise way to create lists in Python. Instead of a for loop with append(), you write the whole thing in one line inside square brackets. It's faster, more readable (once you're used to it), and very "Pythonic".`,
      `Basic syntax: [expression for item in iterable]. Optional filter: [expression for item in iterable if condition]. You can also have nested comprehensions for working with 2D data.`,
      `Dict and set comprehensions follow the same pattern: {k: v for k, v in items} for dicts, {expr for item in iterable} for sets. Generator expressions use () instead of [] and are memory-efficient for large data.`,
    ],
    syntax: `# Basic list comprehension
squares = [x**2 for x in range(1, 6)]   # [1, 4, 9, 16, 25]

# With filter condition
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Transform data
names_upper = [name.upper() for name in names]

# Dict comprehension
marks_dict = {s['name']: s['marks'] for s in students}`,
    code: `# List comprehensions vs traditional loops

marks = [85, 72, 58, 96, 45, 88, 62, 37, 91, 74]

# Traditional loop → comprehension
# Old way:
doubled = []
for m in marks:
    doubled.append(m * 2)

# New way (list comprehension):
doubled_comp = [m * 2 for m in marks]
print("Doubled:", doubled_comp)

# Filter — only passing marks (≥40)
passing = [m for m in marks if m >= 40]
print("Passing:", passing)

# Transform + filter together
grade_report = [f"{m}:A+" if m>=90 else (f"{m}:A" if m>=80 else f"{m}:B+" if m>=70 else f"{m}:B" if m>=60 else f"{m}:C" if m>=40 else f"{m}:F")
                for m in marks]
print("Grades:", grade_report)

# Working with student dicts
students = [
    {"name": "Arjun",  "marks": 85, "city": "Delhi"},
    {"name": "Priya",  "marks": 72, "city": "Mumbai"},
    {"name": "Sneha",  "marks": 96, "city": "Delhi"},
    {"name": "Rahul",  "marks": 45, "city": "Chennai"},
]

# Extract names of Delhi students
delhi_students = [s["name"] for s in students if s["city"] == "Delhi"]
print(f"\nDelhi students: {delhi_students}")

# Dict comprehension: name → marks
marks_dict = {s["name"]: s["marks"] for s in students}
print("Marks dict:", marks_dict)

# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print("Flattened:", flat)`,
    output: `Doubled: [170, 144, 116, 192, 90, 176, 124, 74, 182, 148]
Passing: [85, 72, 96, 45, 88, 62, 91, 74]
Grades: ['85:A', '72:B+', '58:C', '96:A+', '45:C', '88:A', '62:C', '37:F', '91:A+', '74:B+']

Delhi students: ['Arjun', 'Sneha']
Marks dict: {'Arjun': 85, 'Priya': 72, 'Sneha': 96, 'Rahul': 45}
Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    notes: [
      `List comprehensions are 10-35% faster than equivalent for loops because they're optimised at the C level in CPython.`,
      `Don't overuse comprehensions — very complex ones become unreadable. If it needs more than one condition and one transformation, use a regular loop.`,
      `CBSE Class 12 Computer Science exams sometimes ask you to "rewrite using list comprehension" or "write the output of this comprehension".`,
    ],
    practice: {
      title: 'Data Pipeline with Comprehensions',
      description: `Using list comprehensions only (no for loops): (1) extract all student names from the list, (2) get marks of students from Delhi, (3) create a dict mapping name→grade, (4) get names of students who scored above the average.`,
      startCode: `students = [
    {"name": "Aisha",   "marks": 88, "city": "Delhi"},
    {"name": "Bunty",   "marks": 52, "city": "Mumbai"},
    {"name": "Chitra",  "marks": 94, "city": "Hyderabad"},
    {"name": "Dhawal",  "marks": 67, "city": "Delhi"},
    {"name": "Esha",    "marks": 83, "city": "Mumbai"},
    {"name": "Faisal",  "marks": 71, "city": "Chennai"},
]

# 1. All names
names = [s["name"] for s in students]
print("Names:", names)

# 2. Delhi marks
delhi_marks = [s["marks"] for s in students if s["city"] == "Delhi"]
print("Delhi marks:", delhi_marks)

# 3. Name → grade dict (A+ if ≥90, A if ≥80, B if ≥70, else C)
# YOUR CODE
grade_dict = {}
print("Grades:", grade_dict)

# 4. Names above average
avg = sum(s["marks"] for s in students) / len(students)
# YOUR CODE
above_avg_names = []
print(f"Above avg ({avg:.1f}):", above_avg_names)`,
      hint: `grade_dict = {s["name"]: ("A+" if s["marks"]>=90 else "A" if s["marks"]>=80 else "B" if s["marks"]>=70 else "C") for s in students}`,
    },
  },

  // ─── Modules & Packages ──────────────────────────────────────────────────────
  {
    id: 'py-modules',
    category: 'Core Python',
    title: 'Modules & Packages — Reusing Code',
    difficulty: 'Intermediate',
    theory: [
      `A module is a Python file (.py) containing functions, classes, and variables that you can reuse across multiple programs. Instead of rewriting common logic, you import it.`,
      `Python has a rich standard library of built-in modules (no installation needed): math (mathematical functions), random (random numbers), datetime (date and time), os (operating system), json (JSON parsing), csv (CSV files), sys (system), re (regular expressions).`,
      `Third-party packages (need pip install): numpy (arrays, maths), pandas (data), matplotlib (charts), requests (HTTP calls), Flask (web framework), sklearn (machine learning). Install with: pip install package-name.`,
    ],
    syntax: `import math            # import full module
from math import sqrt  # import specific function
import math as m       # import with alias

# Standard library modules:
import random, datetime, json, os, sys, re, csv`,
    code: `# Exploring Python's standard library modules

# math module
import math

print("=== math module ===")
print(f"π = {math.pi:.6f}")
print(f"e = {math.e:.6f}")
print(f"sqrt(144) = {math.sqrt(144)}")
print(f"ceil(4.2) = {math.ceil(4.2)}")   # round up
print(f"floor(4.9) = {math.floor(4.9)}") # round down
print(f"log(100, 10) = {math.log(100, 10)}")  # log base 10

# random module
import random

print("\n=== random module ===")
print(f"Random int 1-10: {random.randint(1, 10)}")
print(f"Random float 0-1: {random.random():.4f}")

students = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram"]
print(f"Random student: {random.choice(students)}")

random.shuffle(students)
print(f"Shuffled: {students}")

# datetime module
import datetime

print("\n=== datetime module ===")
today = datetime.date.today()
print(f"Today: {today}")
print(f"Year: {today.year}, Month: {today.month}, Day: {today.day}")

now = datetime.datetime.now()
print(f"Current time: {now.strftime('%H:%M:%S')}")

# Days until a future date
exam_date = datetime.date(2026, 3, 15)
days_left = (exam_date - today).days
print(f"Days until exam: {days_left}")`,
    output: `=== math module ===
π = 3.141593
e = 2.718282
sqrt(144) = 12.0
ceil(4.2) = 5
floor(4.9) = 4
log(100, 10) = 2.0

=== random module ===
Random int 1-10: 7
Random float 0-1: 0.3847
Random student: Sneha
Shuffled: ['Vikram', 'Arjun', 'Sneha', 'Rahul', 'Priya']

=== datetime module ===
Today: 2026-05-21
Year: 2026, Month: 5, Day: 21
Current time: 14:23:07
Days until exam: 298`,
    notes: [
      `from math import sqrt, pi imports only what you need — keeps code clean and namespace uncluttered.`,
      `import random as r means you write r.randint() instead of random.randint(). Useful for frequently-used long module names.`,
      `pip install pandas installs the pandas library. On Google Colab, major libraries are pre-installed — just import them directly.`,
    ],
    practice: {
      title: 'Exam Countdown & Study Scheduler',
      description: `Build an exam countdown tool. Given an exam date, calculate: days remaining, how many chapters to study per day (given total chapters), and suggest a study start time using datetime.`,
      startCode: `import datetime
import math

# Exam details
exam_date = datetime.date(2026, 6, 1)
total_chapters = 25
today = datetime.date.today()

# Calculate days remaining
days_left = (exam_date - today).days

# Chapters per day (ceiling to ensure all chapters are covered)
chapters_per_day = math.ceil(total_chapters / days_left) if days_left > 0 else total_chapters

print(f"Exam date: {exam_date}")
print(f"Today:     {today}")
print(f"Days left: {days_left}")
print(f"Chapters:  {total_chapters}")
print(f"Study pace: {chapters_per_day} chapter(s) per day")

# Suggest schedule
if days_left > 30:
    intensity = "Light — you have plenty of time!"
elif days_left > 14:
    intensity = "Moderate — stay consistent"
elif days_left > 7:
    intensity = "Intensive — focus and revise"
else:
    intensity = "Revision only — don't start new topics!"

print(f"\nStrategy: {intensity}")

# YOUR CODE: calculate what date to start revision
# (Revision = last 20% of time = last days_left//5 days before exam)
revision_start = exam_date - datetime.timedelta(days=days_left // 5)
print(f"Start revision by: {revision_start}")`,
      hint: `datetime.timedelta(days=n) creates a time difference of n days. exam_date - timedelta(days=5) gives the date 5 days before exam.`,
    },
  },

  // ─── File Handling ────────────────────────────────────────────────────────────
  {
    id: 'py-file-handling',
    category: 'Core Python',
    title: 'File Handling — Reading and Writing Files',
    difficulty: 'Intermediate',
    theory: [
      `File handling lets Python programs read data from files and write results back — crucial for any real application. Data stored in variables is lost when the program ends; files persist permanently.`,
      `File modes: 'r' (read — default), 'w' (write — creates new or overwrites), 'a' (append — adds to existing), 'r+' (read and write). Always use 'w' carefully — it deletes existing content!`,
      `The with statement (context manager) is the recommended way to open files — it automatically closes the file even if an error occurs. Never skip this — unclosed files can corrupt data or cause permission errors.`,
      `Text files store data as strings. For more complex data, use JSON (for structured data) or CSV (for tabular data) — Python has built-in modules for both.`,
    ],
    syntax: `# Reading a file
with open("filename.txt", "r", encoding="utf-8") as f:
    content = f.read()        # entire file as string
    lines = f.readlines()     # list of lines
    line = f.readline()       # one line at a time

# Writing a file
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello\n")
    f.writelines(["Line1\n", "Line2\n"])`,
    code: `import io  # Simulate files in memory for this demo

# WRITING a file (simulated)
output_lines = []

def simulate_write(filename, data):
    """Simulate writing to a file"""
    output_lines.clear()
    for line in data:
        output_lines.append(line)
    print(f"✅ Written {len(output_lines)} lines to '{filename}'")

# Simulated file content (what we'd read from disk)
file_content = """Arjun,85,Delhi
Priya,72,Mumbai
Rahul,58,Chennai
Sneha,96,Hyderabad
Vikram,63,Pune
"""

# READING — process line by line
print("=== Reading student data ===")
students = []
for line in file_content.strip().split('\n'):
    parts = line.split(',')
    if len(parts) == 3:
        name, marks, city = parts
        students.append({
            "name": name.strip(),
            "marks": int(marks.strip()),
            "city": city.strip()
        })
        print(f"  Read: {name} | {marks} | {city}")

# Process data
print(f"\n=== Analysis of {len(students)} students ===")
avg = sum(s['marks'] for s in students) / len(students)
top = max(students, key=lambda s: s['marks'])
print(f"Class average: {avg:.1f}")
print(f"Top student: {top['name']} ({top['marks']})")

# WRITING results
report_lines = [
    "STUDENT PERFORMANCE REPORT\n",
    "=" * 30 + "\n",
]
for s in sorted(students, key=lambda x: -x['marks']):
    grade = "A+" if s['marks']>=90 else "A" if s['marks']>=80 else "B" if s['marks']>=70 else "C" if s['marks']>=60 else "D" if s['marks']>=40 else "F"
    report_lines.append(f"{s['name']:<15} {s['marks']:3d}  Grade:{grade}\n")

simulate_write("report.txt", report_lines)
print("\nReport contents:")
print("".join(report_lines))`,
    output: `=== Reading student data ===
  Read: Arjun | 85 | Delhi
  Read: Priya | 72 | Mumbai
  Read: Rahul | 58 | Chennai
  Read: Sneha | 96 | Hyderabad
  Read: Vikram | 63 | Pune

=== Analysis of 5 students ===
Class average: 74.8
Top student: Sneha (96)

✅ Written 7 lines to 'report.txt'

Report contents:
STUDENT PERFORMANCE REPORT
==============================
Sneha           96  Grade:A+
Arjun           85  Grade:A
Priya           72  Grade:B
Vikram          63  Grade:C
Rahul           58  Grade:C`,
    notes: [
      `Always specify encoding="utf-8" when opening text files — this ensures Indian characters (Hindi, Telugu, etc.) are read/written correctly.`,
      `For reading large files, don't use read() (loads whole file into memory). Instead, iterate line by line: for line in f: (memory-efficient).`,
      `Real Python code: with open("students.txt", "r", encoding="utf-8") as f: — the with block closes the file automatically.`,
    ],
    practice: {
      title: 'Log File Analyser',
      description: `Process a simulated server log file. Each line is: "TIMESTAMP STATUS MESSAGE". Count: total requests, successful (200), failed (404 or 500), and find the most common error code.`,
      startCode: `# Simulated server log
log_data = """2026-01-01 08:00 200 Homepage loaded
2026-01-01 08:01 404 Page not found: /about
2026-01-01 08:02 200 Login successful
2026-01-01 08:03 500 Database error
2026-01-01 08:04 200 Profile loaded
2026-01-01 08:05 404 Page not found: /contact
2026-01-01 08:06 200 Search results
2026-01-01 08:07 500 Timeout error
2026-01-01 08:08 404 Page not found: /old-page"""

total = 0
success_200 = 0
error_codes = {}

for line in log_data.strip().split('\n'):
    parts = line.split()
    # parts[0]=date, parts[1]=time, parts[2]=status_code, parts[3+]=message
    status = int(parts[2])
    total += 1

    if status == 200:
        success_200 += 1
    else:
        # Count error codes
        # YOUR CODE

print(f"Total requests: {total}")
print(f"Successful (200): {success_200}")
print(f"Failed: {total - success_200}")
print(f"Error breakdown: {error_codes}")
print(f"Most common error: {max(error_codes, key=error_codes.get) if error_codes else 'None'}")`,
      hint: `error_codes[status] = error_codes.get(status, 0) + 1`,
    },
  },

  // ─── Sorting & Searching ─────────────────────────────────────────────────────
  {
    id: 'py-sorting-searching',
    category: 'Algorithms',
    title: 'Sorting & Searching Algorithms',
    difficulty: 'Intermediate',
    theory: [
      `Sorting and searching are the most fundamental algorithms in computer science. Every ranked list, search engine result, and database query uses them under the hood.`,
      `Bubble Sort: The simplest sorting algorithm. Compare adjacent elements, swap if in wrong order. Repeat until no swaps needed. Time: O(n²) — slow for large data but easy to understand and implement. Good for learning; rarely used in production.`,
      `Binary Search: The fastest way to search a SORTED list. Instead of checking every element (O(n)), binary search checks the middle, eliminates half the remaining elements, and repeats — achieving O(log n) speed. For 1 million items: linear = 1,000,000 checks; binary = 20 checks!`,
      `Python built-ins: sorted() and list.sort() use Timsort (O(n log n)) — much faster than Bubble Sort. In operator (in) does linear search. bisect module does binary search. For competitive programming and CBSE: understand Bubble Sort, Linear Search, Binary Search.`,
    ],
    syntax: `# Bubble Sort: O(n²)
# Compare neighbors, swap if needed, repeat

# Linear Search: O(n)
# Check each element one by one

# Binary Search: O(log n)
# Only works on sorted data
# Check middle → go left or right → repeat`,
    code: `# Sorting and Searching implementations

# 1. BUBBLE SORT
def bubble_sort(arr):
    n = len(arr)
    arr = arr.copy()  # don't modify original
    comparisons = 0

    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            comparisons += 1
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # already sorted!

    return arr, comparisons

# 2. LINEAR SEARCH
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i  # found at index i
    return -1  # not found

# 3. BINARY SEARCH (requires sorted array)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    steps = 0

    while left <= right:
        steps += 1
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid, steps
        elif arr[mid] < target:
            left = mid + 1    # search right half
        else:
            right = mid - 1   # search left half

    return -1, steps

# Demo
data = [64, 34, 25, 12, 22, 11, 90, 55, 78, 42]
print(f"Original: {data}")

sorted_data, comparisons = bubble_sort(data)
print(f"Sorted:   {sorted_data}")
print(f"Bubble sort needed {comparisons} comparisons\n")

# Search demonstrations
print("=== Searching ===")
target = 55
idx_linear = linear_search(sorted_data, target)
idx_binary, steps = binary_search(sorted_data, target)

print(f"Searching for {target} in {sorted_data}")
print(f"Linear search: found at index {idx_linear} (checked {idx_linear+1} elements)")
print(f"Binary search: found at index {idx_binary} (only {steps} comparisons!)")

# Show the power of binary search
import math
sizes = [100, 1000, 1000000]
for n in sizes:
    print(f"\nFor n={n:,}: Linear={n:,} checks, Binary={math.ceil(math.log2(n))} checks")`,
    output: `Original: [64, 34, 25, 12, 22, 11, 90, 55, 78, 42]
Sorted:   [11, 12, 22, 25, 34, 42, 55, 64, 78, 90]
Bubble sort needed 35 comparisons

=== Searching ===
Searching for 55 in [11, 12, 22, 25, 34, 42, 55, 64, 78, 90]
Linear search: found at index 6 (checked 7 elements)
Binary search: found at index 6 (only 3 comparisons!)

For n=100: Linear=100 checks, Binary=7 checks
For n=1,000: Linear=1,000 checks, Binary=10 checks
For n=1,000,000: Linear=1,000,000 checks, Binary=20 checks`,
    notes: [
      `CBSE Class 11/12 Computer Science exam frequently asks you to trace Bubble Sort (show array after each pass) and Binary Search (show left, right, mid at each step).`,
      `Python's built-in sorted() is almost always better than Bubble Sort in real code. But understanding Bubble Sort is essential for algorithms theory.`,
      `Binary search requires the array to be sorted first. If you need to search many times, sort once and binary search many times — much faster than linear searching every time.`,
    ],
    practice: {
      title: 'Trace Bubble Sort',
      description: `Implement bubble sort that prints the array after each pass (one complete inner loop = one pass). For array [5, 3, 8, 1, 9, 2], show: Pass 1, Pass 2, ... until sorted. Also count total swaps.`,
      startCode: `def traced_bubble_sort(arr):
    arr = arr.copy()
    n = len(arr)
    total_swaps = 0

    for i in range(n - 1):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                total_swaps += 1
                swapped = True

        print(f"Pass {i+1}: {arr}")

        if not swapped:
            print("  (Already sorted — stopping early)")
            break

    print(f"\nTotal swaps: {total_swaps}")
    return arr

data = [5, 3, 8, 1, 9, 2]
print(f"Start: {data}")
result = traced_bubble_sort(data)
print(f"Final: {result}")`,
      hint: `The outer loop is each pass. After the inner loop completes, print the array. If no swap happened in a full pass, break early.`,
    },
  },

  // ─── Recursion ────────────────────────────────────────────────────────────────
  {
    id: 'py-recursion',
    category: 'Algorithms',
    title: 'Recursion — Functions That Call Themselves',
    difficulty: 'Intermediate',
    theory: [
      `Recursion is a programming technique where a function solves a problem by calling itself with a smaller version of the same problem. The key insight: "if I can solve a small version, I can solve any size."`,
      `Every recursive function needs two parts: Base Case (when to stop — prevents infinite recursion), Recursive Case (the function calling itself with a simpler input, moving toward the base case).`,
      `Classic recursion examples: Factorial (n! = n × (n-1)!), Fibonacci sequence, Tower of Hanoi, binary search, tree traversal, directory listing. Recursion is elegant for problems that have natural self-similar structure.`,
      `Recursion vs Iteration: Recursion is often cleaner code but uses more memory (each call uses stack space). Python has a recursion limit (~1000 calls deep). For very deep recursion, convert to iteration. For simple cases, recursion is fine.`,
    ],
    syntax: `def factorial(n):
    if n == 0:        # BASE CASE
        return 1
    return n * factorial(n - 1)  # RECURSIVE CASE

# Call stack for factorial(4):
# factorial(4) → 4 * factorial(3)
# factorial(3) → 3 * factorial(2)
# factorial(2) → 2 * factorial(1)
# factorial(1) → 1 * factorial(0)
# factorial(0) → 1  ← BASE CASE`,
    code: `# Recursion examples with call tracing

# 1. FACTORIAL
def factorial(n, depth=0):
    indent = "  " * depth
    print(f"{indent}factorial({n}) called")

    if n == 0:  # base case
        print(f"{indent}→ returns 1 (base case)")
        return 1

    result = n * factorial(n - 1, depth + 1)
    print(f"{indent}→ returns {n} × {result//n} = {result}")
    return result

print("=== Factorial with call trace ===")
answer = factorial(4)
print(f"\n4! = {answer}")

# 2. FIBONACCI
def fibonacci(n):
    if n <= 1:    # base cases: fib(0)=0, fib(1)=1
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("\n=== Fibonacci sequence ===")
fib_seq = [fibonacci(i) for i in range(10)]
print(f"First 10 Fibonacci: {fib_seq}")

# 3. SUM OF LIST (recursive)
def recursive_sum(lst):
    if not lst:           # base case: empty list
        return 0
    return lst[0] + recursive_sum(lst[1:])  # first + sum of rest

print(f"\nRecursive sum of [1..5]: {recursive_sum([1,2,3,4,5])}")

# 4. COUNT DOWN
def countdown(n):
    if n <= 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

print("\n=== Countdown ===")
countdown(5)`,
    output: `=== Factorial with call trace ===
factorial(4) called
  factorial(3) called
    factorial(2) called
      factorial(1) called
        factorial(0) called
        → returns 1 (base case)
      → returns 1 × 1 = 1
    → returns 2 × 1 = 2
  → returns 3 × 2 = 6
→ returns 4 × 6 = 24

4! = 24

=== Fibonacci sequence ===
First 10 Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

Recursive sum of [1..5]: 15

=== Countdown ===
5, 4, 3, 2, 1, Go!`,
    notes: [
      `Always define the base case first — without it, recursion never stops and you get RecursionError: maximum recursion depth exceeded.`,
      `Python's default recursion limit is 1000. For deeper recursion: sys.setrecursionlimit(n) or better, convert to iteration.`,
      `Fibonacci is a great example of why naive recursion can be inefficient — fibonacci(40) makes ~300 million calls! Solutions: memoisation (caching results) or dynamic programming.`,
    ],
    practice: {
      title: 'Recursive Power Function',
      description: `Write a recursive function power(base, exp) that calculates base^exp without using ** or math.pow(). Base case: power(x, 0) = 1. Recursive case: power(x, n) = x * power(x, n-1). Test with power(2,10), power(3,4), power(5,0).`,
      startCode: `def power(base, exp):
    # Base case: anything^0 = 1
    if exp == 0:
        return 1

    # Recursive case
    # YOUR CODE HERE
    pass

# Test
print(f"2^10 = {power(2, 10)}")   # 1024
print(f"3^4  = {power(3, 4)}")    # 81
print(f"5^0  = {power(5, 0)}")    # 1
print(f"7^3  = {power(7, 3)}")    # 343

# Verify with ** operator
for b, e in [(2,10), (3,4), (5,0), (7,3)]:
    assert power(b, e) == b**e, f"Mismatch for {b}^{e}"
print("All assertions passed!")`,
      hint: `return base * power(base, exp - 1) — each call reduces exp by 1 until we hit the base case (exp == 0).`,
    },
  },

  // ─── Mini Project: Marks Calculator ─────────────────────────────────────────
  {
    id: 'py-project-marks',
    category: 'Mini Projects',
    title: 'Mini Project — Student Marks Calculator',
    difficulty: 'Beginner',
    theory: [
      `A marks calculator is a practical real-world project that uses variables, lists, dictionaries, functions, and string formatting all together. Building it consolidates everything from the first half of the Python course.`,
      `This project adds new student records, calculates averages, assigns grades, finds top performers, and generates a formatted class report — skills used in real educational software like BYJU's grading systems.`,
    ],
    syntax: `# Project uses: dict, list, functions, f-strings, sorted(), max()`,
    code: `# MINI PROJECT: Student Marks Calculator

def assign_grade(percentage):
    if percentage >= 90: return "A+ (Outstanding)"
    elif percentage >= 80: return "A (Excellent)"
    elif percentage >= 70: return "B (Very Good)"
    elif percentage >= 60: return "C (Good)"
    elif percentage >= 40: return "D (Pass)"
    else: return "F (Fail)"

def calculate_student_report(name, marks_dict):
    """Calculate full report for one student"""
    total = sum(marks_dict.values())
    max_total = len(marks_dict) * 100
    percentage = (total / max_total) * 100

    best_subject = max(marks_dict, key=marks_dict.get)
    weak_subject = min(marks_dict, key=marks_dict.get)

    return {
        "name": name,
        "marks": marks_dict,
        "total": total,
        "percentage": round(percentage, 2),
        "grade": assign_grade(percentage),
        "best": best_subject,
        "weakest": weak_subject,
    }

def class_report(class_data):
    """Generate full class analysis"""
    reports = []
    for name, marks in class_data.items():
        reports.append(calculate_student_report(name, marks))

    # Sort by percentage
    reports.sort(key=lambda r: -r["percentage"])

    print("╔" + "═" * 60 + "╗")
    print("║       STUDENT MARKS CALCULATOR — CLASS REPORT          ║")
    print("╠" + "═" * 60 + "╣")

    for rank, r in enumerate(reports, 1):
        print(f"\n  #{rank} {r['name']}")
        print(f"      Marks: {r['marks']}")
        print(f"      Total: {r['total']}/500 | {r['percentage']}%")
        print(f"      Grade: {r['grade']}")
        print(f"      Best: {r['best']} | Needs work: {r['weakest']}")

    # Class statistics
    all_pct = [r["percentage"] for r in reports]
    class_avg = sum(all_pct) / len(all_pct)
    pass_count = sum(1 for p in all_pct if p >= 40)

    print("\n" + "═" * 62)
    print(f"  CLASS STATS: Avg={class_avg:.1f}% | Pass: {pass_count}/{len(reports)}")
    print(f"  Topper: {reports[0]['name']} ({reports[0]['percentage']}%)")
    print("╚" + "═" * 60 + "╝")

# Class data
class_data = {
    "Arjun Sharma":  {"Maths": 88, "Science": 92, "English": 78, "Hindi": 85, "Social": 91},
    "Priya Singh":   {"Maths": 72, "Science": 68, "English": 80, "Hindi": 75, "Social": 70},
    "Rahul Kumar":   {"Maths": 55, "Science": 48, "English": 62, "Hindi": 58, "Social": 50},
    "Sneha Reddy":   {"Maths": 96, "Science": 98, "English": 94, "Hindi": 97, "Social": 95},
    "Vikram Patel":  {"Maths": 40, "Science": 35, "English": 45, "Hindi": 38, "Social": 42},
}

class_report(class_data)`,
    output: `╔════════════════════════════════════════════════════════════╗
║       STUDENT MARKS CALCULATOR — CLASS REPORT              ║
╠════════════════════════════════════════════════════════════╣

  #1 Sneha Reddy
      Total: 480/500 | 96.0% | Grade: A+ (Outstanding)
      Best: Science | Needs work: English

  #2 Arjun Sharma
      Total: 434/500 | 86.8% | Grade: A (Excellent)
      Best: Science | Needs work: English

  #3 Priya Singh
      Total: 365/500 | 73.0% | Grade: B (Very Good)

  #4 Rahul Kumar
      Total: 273/500 | 54.6% | Grade: D (Pass)

  #5 Vikram Patel
      Total: 200/500 | 40.0% | Grade: D (Pass)

════════════════════════════════════════════════════════════
  CLASS STATS: Avg=70.1% | Pass: 5/5
  Topper: Sneha Reddy (96.0%)`,
    notes: [
      `This project is a great addition to your Python portfolio. Extend it: add input() for live data entry, save results to a CSV file, or add a GUI with tkinter.`,
      `CBSE Computer Science practicals often ask for similar programs — marks calculators, grade systems, and student management are classic practicals.`,
      `Real school systems like Vidyalaya's grading portal use similar logic with a web interface and database backend.`,
    ],
    practice: {
      title: 'Extend: Add Attendance',
      description: `Extend the marks calculator to also track attendance percentage. Add an attendance field (0-100) to each student. Factor attendance into final grade: if attendance < 75%, reduce grade by one level regardless of marks. Display attendance status with each student report.`,
      startCode: `def assign_grade(percentage, attendance):
    base_grade = (
        "A+" if percentage >= 90 else
        "A"  if percentage >= 80 else
        "B"  if percentage >= 70 else
        "C"  if percentage >= 60 else
        "D"  if percentage >= 40 else "F"
    )

    # YOUR CODE: if attendance < 75, reduce grade by 1 level
    # Grade order: A+ → A → B → C → D → F
    grade_order = ["A+", "A", "B", "C", "D", "F"]

    if attendance < 75:
        # Find current index and move to next grade (worse)
        idx = grade_order.index(base_grade)
        adjusted = grade_order[min(idx + 1, len(grade_order) - 1)]
        return f"{adjusted} (reduced from {base_grade} — low attendance)"

    return base_grade

# Test
print(assign_grade(92, 85))  # A+ (full attendance)
print(assign_grade(92, 70))  # A (reduced from A+ — low attendance)
print(assign_grade(72, 60))  # C (reduced from B — low attendance)
print(assign_grade(45, 80))  # D (attendance fine)`,
      hint: `grade_order.index(base_grade) finds the position. min(idx+1, 5) moves to the next worse grade without going past "F".`,
    },
  },

  // ─── Common Python Errors ─────────────────────────────────────────────────────
  {
    id: 'py-common-errors',
    category: 'Best Practices',
    title: 'Common Python Errors & How to Fix Them',
    difficulty: 'Beginner',
    theory: [
      `Understanding error messages is a crucial skill. Python gives detailed error messages — learning to read them saves enormous debugging time. Every error tells you the type, the line number, and what went wrong.`,
      `Most common errors: SyntaxError (code is not valid Python — typo, missing colon, wrong indentation), IndentationError (wrong indentation in a code block), NameError (variable not defined before use), TypeError (wrong data type — like "abc" + 5), ValueError (right type but invalid value — int("hello")), IndexError (list index out of range), KeyError (dictionary key doesn't exist), ZeroDivisionError (division by zero), AttributeError (method/attribute doesn't exist on this type).`,
      `Debugging strategies: Print intermediate values to find where logic goes wrong. Use try/except to catch and handle expected errors. Read the traceback from bottom to top — the last line is the actual error, above it is the call stack.`,
    ],
    syntax: `# Reading a traceback:
# Traceback (most recent call last):
#   File "main.py", line 10, in calculate   ← where function was called
#     result = a / b                          ← the line that failed
# ZeroDivisionError: division by zero        ← the actual error`,
    code: `# Common Python errors — examples and fixes

# 1. TypeError: mixing types incorrectly
print("=== TypeError ===")
try:
    age = "17"
    result = age + 3  # Can't add string and int!
except TypeError as e:
    print(f"Error: {e}")
    # FIX:
    result = int(age) + 3
    print(f"Fixed: {result}")

# 2. IndexError
print("\n=== IndexError ===")
marks = [85, 72, 91]
try:
    print(marks[5])  # Only indices 0, 1, 2 exist!
except IndexError as e:
    print(f"Error: {e}")
    # FIX: check length first
    if len(marks) > 5:
        print(marks[5])
    else:
        print(f"Fixed: only {len(marks)} elements exist")

# 3. KeyError
print("\n=== KeyError ===")
student = {"name": "Arjun", "marks": 85}
try:
    print(student["city"])  # "city" key doesn't exist!
except KeyError as e:
    print(f"Error: Key {e} not found")
    # FIX: use .get() with default
    city = student.get("city", "Unknown")
    print(f"Fixed: {city}")

# 4. ZeroDivisionError
print("\n=== ZeroDivisionError ===")
def safe_divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # Safe message

# 5. NameError
print("\n=== NameError ===")
try:
    print(undefined_variable)
except NameError as e:
    print(f"Error: {e}")
    print("Fix: define the variable before using it!")

# 6. IndentationError — most common for beginners
print("\n=== Common IndentationError ===")
# This would cause IndentationError — DON'T run this:
# if True:
# print("Wrong!")  # Missing indentation!

# CORRECT:
if True:
    print("Correct indentation!")

print("\n✅ All errors caught and handled gracefully!")`,
    output: `=== TypeError ===
Error: can only concatenate str (not "int") to str
Fixed: 20

=== IndexError ===
Error: list index out of range
Fixed: only 3 elements exist

=== KeyError ===
Error: Key 'city' not found
Fixed: Unknown

=== ZeroDivisionError ===
5.0
Cannot divide by zero

=== NameError ===
Error: name 'undefined_variable' is not defined
Fix: define the variable before using it!

Correct indentation!

✅ All errors caught and handled gracefully!`,
    notes: [
      `Read error messages carefully! "line 42" tells you exactly where to look. "TypeError" tells you it's a type mismatch. The message after the colon explains what happened.`,
      `dict.get(key, default) is safer than dict[key] when the key might not exist — no KeyError, just returns the default.`,
      `Common CBSE exam error question: "What error will the following code produce?" — knowing error types helps you answer these quickly.`,
    ],
    practice: {
      title: 'Debug This Code',
      description: `The following code has 5 bugs. Find and fix each one. Each bug is a different type of error (TypeError, IndexError, KeyError, ZeroDivisionError, NameError).`,
      startCode: `# Buggy code — find and fix all 5 errors!

# Bug 1: TypeError
age = "16"
next_year_age = age + 1  # Fix: convert age to int

# Bug 2: IndexError
scores = [90, 85, 72]
print("Fourth score:", scores[3])  # Fix: valid index

# Bug 3: KeyError
info = {"name": "Priya", "class": 11}
print(info["city"])  # Fix: use .get() or add key

# Bug 4: ZeroDivisionError
total = 450
count = 0
average = total / count  # Fix: check for zero divisor

# Bug 5: NameError
print(student_name)  # Fix: define variable first

# After all fixes, this should print:
print("All bugs fixed!")`,
      hint: `Bug 1: int(age)+1. Bug 2: scores[2] or scores[-1]. Bug 3: info.get("city","Unknown"). Bug 4: if count != 0 else 0. Bug 5: student_name = "Priya"`,
    },
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'py-generators',
    category: 'Functional Python',
    title: 'Generators & Iterators',
    difficulty: 'Intermediate',
    theory: [
      'A generator is a function that returns values one at a time using the yield keyword, instead of returning all values at once. This saves memory when working with large data.',
      'Regular functions use return — they compute everything and hand it all back. Generators yield — they pause, give one value, and resume when you ask for the next.',
      'Python\'s for loop and next() function work naturally with generators. The iterator protocol requires __iter__() and __next__() methods.',
      'Common use: reading huge files line by line, generating infinite sequences, or building data pipelines without loading everything into memory.',
    ],
    syntax: `def my_generator():
    yield value1
    yield value2
    ...

# Using a generator
for item in my_generator():
    print(item)

# Generator expression (like list comprehension but lazy)
gen = (x**2 for x in range(10))`,
    code: `# Generate squares of numbers (memory efficient)
def square_gen(n):
    for i in range(1, n + 1):
        yield i * i

print("First 5 squares:")
for sq in square_gen(5):
    print(sq)

# Fibonacci generator (infinite!)
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print("\\nFirst 8 Fibonacci numbers:")
fib = fibonacci()
for _ in range(8):
    print(next(fib), end=" ")

# Generator expression
even_squares = (x**2 for x in range(1, 11) if x % 2 == 0)
print("\\n\\nEven squares (1-10):", list(even_squares))`,
    output: `First 5 squares:
1
4
9
16
25

First 8 Fibonacci numbers:
0 1 1 2 3 5 8 13

Even squares (1-10): [4, 16, 36, 64, 100]`,
    notes: [
      'Generators use yield instead of return',
      'They are memory-efficient — values generated on demand',
      'Once exhausted, a generator cannot be restarted',
      'Use list() to convert generator to a list (loads all into memory)',
    ],
    practice: {
      title: 'Prime Number Generator',
      description: `Write a generator prime_numbers(limit) that yields all prime numbers up to limit.
Use it to print all primes below 50.

Expected output:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47`,
      startCode: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def prime_numbers(limit):
    # Use yield to generate primes
    pass

# Print all primes below 50
for p in prime_numbers(50):
    print(p, end=" ")`,
      solution: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def prime_numbers(limit):
    for n in range(2, limit + 1):
        if is_prime(n):
            yield n

for p in prime_numbers(50):
    print(p, end=" ")`,
      hint: 'Use a for loop inside the generator and yield each number that passes is_prime()',
    },
  },

  {
    id: 'py-decorators',
    category: 'Functional Python',
    title: 'Decorators',
    difficulty: 'Intermediate',
    theory: [
      'A decorator is a function that wraps another function to add extra behaviour without modifying the original function code. It\'s Python\'s clean way to extend function behaviour.',
      'Decorators use the @ symbol before a function definition. Under the hood, @my_decorator is the same as my_function = my_decorator(my_function).',
      'Common uses: logging function calls, timing how long a function takes, checking authentication, repeating/retrying operations.',
      'The functools.wraps decorator should be used inside your decorator to preserve the original function\'s name and docstring.',
    ],
    syntax: `import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # code BEFORE calling func
        result = func(*args, **kwargs)
        # code AFTER calling func
        return result
    return wrapper

@my_decorator
def my_function():
    ...`,
    code: `import functools
import time

# Decorator 1: Timer — measures how long a function takes
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# Decorator 2: Logger — prints when function is called
def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@timer
def count_to_million():
    total = sum(range(1_000_000))
    return total

@logger
def add(a, b):
    return a + b

count_to_million()
print()
add(10, 25)`,
    output: `count_to_million took 0.0321 seconds

Calling add with args=(10, 25)
add returned 35`,
    notes: [
      'Use @functools.wraps(func) inside every decorator',
      'Decorators can be stacked: @dec1 @dec2 def func() applies dec2 first, then dec1',
      'Built-in decorators: @property, @staticmethod, @classmethod, @functools.lru_cache',
    ],
    practice: {
      title: 'Validation Decorator',
      description: `Write a decorator @validate_positive that checks all arguments to a function are positive numbers.
If any argument is <= 0, print "Error: all arguments must be positive" and return None.
Otherwise, call the function normally.

Test:
multiply(4, 5) → 20
multiply(-2, 5) → Error message`,
      startCode: `import functools

def validate_positive(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Check all args are > 0
        pass
    return wrapper

@validate_positive
def multiply(a, b):
    return a * b

print(multiply(4, 5))
print(multiply(-2, 5))`,
      solution: `import functools

def validate_positive(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if arg <= 0:
                print("Error: all arguments must be positive")
                return None
        return func(*args, **kwargs)
    return wrapper

@validate_positive
def multiply(a, b):
    return a * b

print(multiply(4, 5))
print(multiply(-2, 5))`,
      hint: 'Loop through args and check if any arg <= 0. If so, print error and return None.',
    },
  },

  {
    id: 'py-context-managers',
    category: 'Functional Python',
    title: 'Context Managers (with statement)',
    difficulty: 'Intermediate',
    theory: [
      'A context manager controls the setup and teardown of resources. The with statement automatically calls __enter__ when entering the block and __exit__ when leaving — even if an error occurs.',
      'The most common use is file handling: with open("file.txt") as f: automatically closes the file when done, even if an exception happens.',
      'You can create your own context managers using the contextlib.contextmanager decorator with a generator function, or by defining __enter__ and __exit__ methods in a class.',
      'Context managers ensure resources (files, database connections, locks) are always properly cleaned up — no leaks, no forgotten close() calls.',
    ],
    syntax: `# Using built-in context manager
with open("file.txt", "r") as f:
    content = f.read()

# Custom context manager with contextlib
from contextlib import contextmanager

@contextmanager
def my_context():
    # setup
    yield value
    # teardown`,
    code: `from contextlib import contextmanager
import time

# Custom context manager: Timer
@contextmanager
def timer(label=""):
    start = time.time()
    try:
        yield  # code inside 'with' runs here
    finally:
        elapsed = time.time() - start
        print(f"{label}: {elapsed:.4f}s")

# Custom context manager: Database simulation
@contextmanager
def fake_db(name):
    print(f"Opening DB: {name}")
    db = {"users": ["Alice", "Bob", "Charlie"]}
    try:
        yield db
    except Exception as e:
        print(f"DB Error: {e}")
    finally:
        print(f"Closing DB: {name}")

# Use the timer
with timer("List creation"):
    numbers = list(range(100_000))

print()

# Use the fake database
with fake_db("school.db") as db:
    print("Users:", db["users"])
    db["users"].append("Diana")
    print("After add:", db["users"])`,
    output: `List creation: 0.0053s

Opening DB: school.db
Users: ['Alice', 'Bob', 'Charlie']
After add: ['Alice', 'Bob', 'Charlie', 'Diana']
Closing DB: school.db`,
    notes: [
      'with guarantees cleanup — the finally block always runs',
      'File reading best practice: always use with open(...) as f:',
      'You can use multiple context managers: with open("a") as f1, open("b") as f2:',
    ],
    practice: {
      title: 'Logging Context Manager',
      description: `Create a context manager called log_section(title) that:
- Prints "=== START: {title} ===" when entering
- Prints "=== END: {title} ===" when exiting
- If an exception occurs, prints "=== ERROR in {title}: {error} ===" and suppresses it

Test:
with log_section("Math Homework"):
    result = 10 + 5
    print("Result:", result)`,
      startCode: `from contextlib import contextmanager

@contextmanager
def log_section(title):
    # Print START message
    pass
    # yield
    # Print END message or ERROR message

with log_section("Math Homework"):
    result = 10 + 5
    print("Result:", result)`,
      hint: 'Use try/except/finally inside the contextmanager. yield in the try block.',
      solution: `from contextlib import contextmanager

@contextmanager
def log_section(title):
    print(f"=== START: {title} ===")
    try:
        yield
        print(f"=== END: {title} ===")
    except Exception as e:
        print(f"=== ERROR in {title}: {e} ===")

with log_section("Math Homework"):
    result = 10 + 5
    print("Result:", result)`,
    },
  },

  {
    id: 'py-regex',
    category: 'Text Processing',
    title: 'Regular Expressions (re module)',
    difficulty: 'Intermediate',
    theory: [
      'Regular expressions (regex) are patterns for matching, searching, and extracting text. Python\'s re module provides full regex support.',
      'Common patterns: \\d matches any digit, \\w matches any word character (letter/digit/_), \\s matches whitespace. . matches any character. * means 0 or more, + means 1 or more, ? means 0 or 1.',
      'Key functions: re.search() finds pattern anywhere, re.match() checks at start, re.findall() finds all matches, re.sub() replaces matches.',
      'Regex is used for validating emails/phone numbers, extracting data from text, scraping web pages, and cleaning messy data.',
    ],
    syntax: `import re

# Search for a pattern
match = re.search(r'pattern', text)
if match:
    print(match.group())

# Find all matches
matches = re.findall(r'\\d+', text)

# Replace pattern
cleaned = re.sub(r'pattern', 'replacement', text)`,
    code: `import re

# Validate Indian phone numbers
def is_valid_phone(phone):
    pattern = r'^[6-9]\\d{9}$'
    return bool(re.match(pattern, phone))

print("Phone validation:")
print(is_valid_phone("9876543210"))  # True
print(is_valid_phone("1234567890"))  # False (starts with 1)
print(is_valid_phone("98765"))       # False (too short)

# Extract all numbers from text
text = "Class 10 has 35 students, Class 11 has 28 students, Class 12 has 42 students."
numbers = re.findall(r'\\d+', text)
print("\\nNumbers found:", numbers)

# Validate email address
def is_valid_email(email):
    pattern = r'^[\\w.-]+@[\\w.-]+\\.\\w{2,}$'
    return bool(re.match(pattern, email))

print("\\nEmail validation:")
print(is_valid_email("student@school.in"))  # True
print(is_valid_email("not-an-email"))        # False

# Clean phone number (remove spaces and dashes)
messy_phone = "98-765-432-10"
clean = re.sub(r'[\\s-]', '', messy_phone)
print("\\nCleaned phone:", clean)`,
    output: `Phone validation:
True
False
False

Numbers found: ['10', '35', '11', '28', '12', '42']

Email validation:
True
False

Cleaned phone: 9876543210`,
    notes: [
      'Always use raw strings r\'\' for regex patterns to avoid \\ conflicts',
      're.compile() pre-compiles a pattern for reuse (faster in loops)',
      '() creates a group — match.group(1) extracts it',
    ],
    practice: {
      title: 'Data Extractor',
      description: `Given the string below, use regex to extract:
1. All dates in format DD-MM-YYYY
2. All amounts in format ₹999 or ₹9,999

text = "Paid ₹1,500 on 15-03-2025 and ₹250 on 20-03-2025 and ₹10,000 on 01-04-2025"

Print the dates list and amounts list.`,
      startCode: `import re

text = "Paid ₹1,500 on 15-03-2025 and ₹250 on 20-03-2025 and ₹10,000 on 01-04-2025"

# Extract dates (DD-MM-YYYY format)
dates = re.findall(r'', text)  # Add your pattern

# Extract amounts (₹ followed by digits and commas)
amounts = re.findall(r'', text)  # Add your pattern

print("Dates:", dates)
print("Amounts:", amounts)`,
      hint: 'Date pattern: \\d{2}-\\d{2}-\\d{4}. Amount: use ₹[\\d,]+ but watch the currency symbol',
      solution: `import re

text = "Paid ₹1,500 on 15-03-2025 and ₹250 on 20-03-2025 and ₹10,000 on 01-04-2025"

dates = re.findall(r'\\d{2}-\\d{2}-\\d{4}', text)
amounts = re.findall(r'₹[\\d,]+', text)

print("Dates:", dates)
print("Amounts:", amounts)`,
    },
  },

  {
    id: 'py-comprehensions-advanced',
    category: 'Functional Python',
    title: 'Advanced Comprehensions',
    difficulty: 'Intermediate',
    theory: [
      'Python supports list, dict, set, and generator comprehensions — all providing a concise way to create collections from existing ones.',
      'Nested comprehensions can flatten 2D data or build matrix-style structures. They are equivalent to nested for loops but written in one line.',
      'Conditional comprehensions can filter (if at end) or use ternary logic (if...else in the middle) to transform values differently.',
      'Comprehensions are generally faster than equivalent for loops because Python optimises them internally. Use them when the logic is simple enough to read easily.',
    ],
    syntax: `# List comprehension with condition
[expr for item in iterable if condition]

# Ternary in comprehension
[a if condition else b for item in iterable]

# Dict comprehension
{key: value for item in iterable}

# Nested comprehension (flatten 2D list)
[x for row in matrix for x in row]`,
    code: `# 1. Dict comprehension: word → length
words = ["apple", "banana", "cherry", "date", "elderberry"]
word_lengths = {word: len(word) for word in words}
print("Word lengths:", word_lengths)

# 2. Filter + transform in one line
marks = [45, 82, 67, 91, 55, 78, 33, 95]
passed = [m for m in marks if m >= 60]
grades = ["A" if m >= 80 else "B" if m >= 60 else "C" for m in marks]
print("Passed:", passed)
print("Grades:", grades)

# 3. Nested comprehension: multiplication table
table = [[i * j for j in range(1, 6)] for i in range(1, 6)]
print("\\n5x5 Multiplication Table:")
for row in table:
    print([str(n).rjust(3) for n in row])

# 4. Flatten 2D matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print("\\nFlattened:", flat)

# 5. Set comprehension: unique first letters
names = ["Arjun", "Ananya", "Bharat", "Bina", "Chetan"]
first_letters = {name[0] for name in names}
print("First letters:", sorted(first_letters))`,
    output: `Word lengths: {'apple': 5, 'banana': 6, 'cherry': 6, 'date': 4, 'elderberry': 10}
Passed: [82, 67, 91, 78, 95]
Grades: ['C', 'A', 'B', 'A', 'C', 'B', 'C', 'A']

5x5 Multiplication Table:
['  1', '  2', '  3', '  4', '  5']
['  2', '  4', '  6', '  8', ' 10']
['  3', '  6', '  9', ' 12', ' 15']
['  4', '  8', ' 12', ' 16', ' 20']
['  5', ' 10', ' 15', ' 20', ' 25']

Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]
First letters: ['A', 'B', 'C']`,
    practice: {
      title: 'Student Report Dict',
      description: `Given a list of (name, marks) tuples, build a dict comprehension that maps:
name → {"marks": m, "grade": grade, "passed": True/False}

Grade rules: >=90 = "A+", >=80 = "A", >=70 = "B", >=60 = "C", else "F"
Pass mark: 60

students = [("Priya", 92), ("Rahul", 75), ("Sneha", 58), ("Arun", 85)]`,
      startCode: `students = [("Priya", 92), ("Rahul", 75), ("Sneha", 58), ("Arun", 85)]

def get_grade(m):
    if m >= 90: return "A+"
    elif m >= 80: return "A"
    elif m >= 70: return "B"
    elif m >= 60: return "C"
    else: return "F"

# Build the dict comprehension here
report = {}

for name, data in report.items():
    print(f"{name}: {data}")`,
      hint: 'Use {name: {"marks": m, "grade": get_grade(m), "passed": m >= 60} for name, m in students}',
    },
  },

  // ── ADVANCED ──────────────────────────────────────────────────────────────

  {
    id: 'py-dunder-methods',
    category: 'Object-Oriented Python',
    title: 'Dunder / Magic Methods',
    difficulty: 'Advanced',
    theory: [
      'Dunder methods (double underscore methods) let you define how your objects behave with Python operators and built-in functions. They are the heart of Python\'s data model.',
      '__str__ and __repr__: control how your object is printed. __str__ is human-friendly, __repr__ is developer-friendly (for debugging).',
      '__len__, __getitem__, __setitem__: make your object behave like a list or dict. __iter__ and __next__ make it iterable.',
      '__add__, __sub__, __mul__: define arithmetic. __eq__, __lt__, __gt__: define comparisons. This is called operator overloading.',
    ],
    syntax: `class MyClass:
    def __init__(self, value):
        self.value = value
    def __str__(self):      # print(obj) → human readable
        return f"MyClass({self.value})"
    def __repr__(self):     # repr(obj) → developer view
        return f"MyClass(value={self.value!r})"
    def __len__(self):      # len(obj)
        return self.value
    def __add__(self, other):  # obj1 + obj2
        return MyClass(self.value + other.value)
    def __eq__(self, other):   # obj1 == obj2
        return self.value == other.value`,
    code: `class Vector:
    """2D Vector with full operator support"""
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __abs__(self):
        return (self.x**2 + self.y**2) ** 0.5

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __bool__(self):
        return self.x != 0 or self.y != 0

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(f"v1 = {v1}")
print(f"v2 = {v2}")
print(f"v1 + v2 = {v1 + v2}")
print(f"v1 - v2 = {v1 - v2}")
print(f"v1 * 3 = {v1 * 3}")
print(f"|v1| = {abs(v1):.2f}")
print(f"v1 == v2: {v1 == v2}")
print(f"bool(v1): {bool(v1)}")`,
    output: `v1 = (3, 4)
v2 = (1, 2)
v1 + v2 = (4, 6)
v1 - v2 = (2, 2)
v1 * 3 = (9, 12)
|v1| = 5.00
v1 == v2: False
bool(v1): True`,
    notes: [
      '__str__ is called by print(), __repr__ by repr() and in the REPL',
      'If you define __eq__, define __hash__ too for use in sets/dicts',
      '__getitem__(self, key) lets you use obj[key] syntax',
    ],
    practice: {
      title: 'Fraction Class',
      description: `Build a Fraction class with __init__(numerator, denominator).
Implement:
- __str__: "3/4" format
- __add__: add two fractions (a/b + c/d = (a*d + b*c)/(b*d))
- __eq__: compare fractions (a/b == c/d ↔ a*d == b*c)
- Simplify using GCD in __init__

from math import gcd
f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f1 + f2)  → 5/6
print(f1 == Fraction(2, 4))  → True`,
      startCode: `from math import gcd

class Fraction:
    def __init__(self, num, den):
        g = gcd(abs(num), abs(den))
        self.num = num // g
        self.den = den // g

    def __str__(self):
        pass  # return "num/den"

    def __add__(self, other):
        pass  # cross multiply

    def __eq__(self, other):
        pass  # compare cross products

f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f1 + f2)
print(f1 == Fraction(2, 4))`,
      hint: 'add: Fraction(self.num*other.den + other.num*self.den, self.den*other.den). eq: self.num*other.den == other.num*self.den',
    },
  },

  {
    id: 'py-dataclasses',
    category: 'Object-Oriented Python',
    title: 'Dataclasses',
    difficulty: 'Advanced',
    theory: [
      '@dataclass is a Python 3.7+ decorator that automatically generates __init__, __repr__, and __eq__ for a class based on annotated fields. It removes boilerplate code.',
      'Fields with default values must come after fields without defaults. Use field() from dataclasses for complex defaults like mutable objects (lists/dicts).',
      'frozen=True creates immutable dataclasses (like tuples with names). order=True adds comparison methods (__lt__, __gt__) based on field order.',
      'Dataclasses are ideal for data containers: configuration objects, database records, API response models — anywhere you need a simple class to hold data.',
    ],
    syntax: `from dataclasses import dataclass, field

@dataclass
class Student:
    name: str
    marks: int
    grade: str = "N/A"         # default value
    subjects: list = field(default_factory=list)  # mutable default`,
    code: `from dataclasses import dataclass, field
from typing import List

@dataclass(order=True)  # enables < > comparison
class Student:
    name: str
    roll: int
    marks: float
    subjects: List[str] = field(default_factory=list)

    def grade(self) -> str:
        if self.marks >= 90: return "A+"
        elif self.marks >= 80: return "A"
        elif self.marks >= 70: return "B"
        elif self.marks >= 60: return "C"
        return "F"

    def add_subject(self, subject: str):
        self.subjects.append(subject)

# Create students — no manual __init__ needed!
s1 = Student("Priya", 1, 92.5)
s2 = Student("Rahul", 2, 78.0)
s3 = Student("Sneha", 3, 88.5)

# __repr__ auto-generated
print(s1)

# Add subjects
s1.add_subject("Maths")
s1.add_subject("Physics")
print(f"\\n{s1.name}'s subjects: {s1.subjects}")
print(f"Grade: {s1.grade()}")

# Sorting works because order=True (sorts by name first)
students = [s1, s2, s3]
students_by_marks = sorted(students, key=lambda s: s.marks, reverse=True)
print("\\nRanking by marks:")
for i, s in enumerate(students_by_marks, 1):
    print(f"  {i}. {s.name}: {s.marks} ({s.grade()})")`,
    output: `Student(name='Priya', roll=1, marks=92.5, subjects=[])

Priya's subjects: ['Maths', 'Physics']
Grade: A+

Ranking by marks:
  1. Priya: 92.5 (A+)
  2. Sneha: 88.5 (A)
  3. Rahul: 78.0 (B)`,
    notes: [
      'Use field(default_factory=list) for mutable defaults — NEVER field(default=[])',
      'frozen=True makes the object immutable and hashable',
      '@dataclass(slots=True) in Python 3.10+ makes instances more memory-efficient',
    ],
    practice: {
      title: 'Product Inventory',
      description: `Create a @dataclass called Product with:
- name: str
- price: float
- quantity: int = 0
- category: str = "General"

Add a method total_value() → price * quantity
Add a method is_in_stock() → True if quantity > 0

Create 3 products, print those in stock, sorted by total value descending.`,
      startCode: `from dataclasses import dataclass

@dataclass
class Product:
    pass  # Add fields and methods

# Test
laptop = Product("Laptop", 45000.0, 5, "Electronics")
pen = Product("Pen", 10.0, 500)
book = Product("Textbook", 350.0, 0, "Education")

in_stock = [p for p in [laptop, pen, book] if p.is_in_stock()]
sorted_products = sorted(in_stock, key=lambda p: p.total_value(), reverse=True)
for p in sorted_products:
    print(f"{p.name}: ₹{p.total_value():,.0f}")`,
      hint: 'Define fields with type annotations. total_value returns self.price * self.quantity.',
    },
  },

  {
    id: 'py-type-hints',
    category: 'Professional Python',
    title: 'Type Hints & Annotations',
    difficulty: 'Advanced',
    theory: [
      'Type hints tell Python (and your editor) what type of data a variable or function expects and returns. They don\'t enforce types at runtime — they are for documentation and static analysis tools.',
      'Basic hints: int, str, float, bool, list, dict. From typing module: List[int], Dict[str, int], Optional[str] (can be str or None), Union[int, str].',
      'Python 3.10+ allows str | None instead of Optional[str]. Python 3.9+ allows list[int] instead of List[int] (no typing import needed).',
      'Tools like mypy and pyright check type hints statically. IDEs like VS Code use them for autocomplete. Type hints make large codebases much easier to maintain.',
    ],
    syntax: `from typing import Optional, Union, List, Dict, Tuple

def greet(name: str) -> str:
    return f"Hello, {name}"

def process(data: List[int]) -> Dict[str, int]:
    ...

def find(name: str) -> Optional[str]:  # can return None
    ...`,
    code: `from typing import Optional, List, Dict, Tuple

# Type-annotated function
def calculate_average(marks: List[float]) -> float:
    if not marks:
        return 0.0
    return sum(marks) / len(marks)

# Function with Optional parameter
def greet_student(name: str, title: Optional[str] = None) -> str:
    if title:
        return f"Hello, {title} {name}!"
    return f"Hello, {name}!"

# Function returning a tuple
def get_min_max(numbers: List[int]) -> Tuple[int, int]:
    return min(numbers), max(numbers)

# Type-annotated class
class StudentDB:
    def __init__(self) -> None:
        self.students: Dict[int, str] = {}  # roll → name

    def add(self, roll: int, name: str) -> None:
        self.students[roll] = name

    def get(self, roll: int) -> Optional[str]:
        return self.students.get(roll)

    def all_names(self) -> List[str]:
        return list(self.students.values())

# Using everything
marks: List[float] = [92.5, 85.0, 78.5, 91.0]
avg: float = calculate_average(marks)
print(f"Average: {avg:.1f}")

print(greet_student("Priya"))
print(greet_student("Sharma", "Dr."))

lo, hi = get_min_max([45, 92, 67, 88, 55])
print(f"Min: {lo}, Max: {hi}")

db = StudentDB()
db.add(101, "Arjun")
db.add(102, "Bhavna")
print(db.get(101))
print(db.all_names())`,
    output: `Average: 86.8
Hello, Priya!
Hello, Dr. Sharma!
Min: 45, Max: 92
Arjun
['Arjun', 'Bhavna']`,
    notes: [
      'Type hints are completely optional — Python ignores them at runtime',
      'Run mypy your_file.py to check types statically',
      'For Python 3.10+: use X | Y instead of Union[X, Y] and X | None instead of Optional[X]',
    ],
    practice: {
      title: 'Typed Library System',
      description: `Add proper type hints to this library system:

class Book:
    def __init__(self, title, author, year):
        ...
    def __str__(self):
        ...

class Library:
    def add_book(self, book):
        ...
    def search_by_author(self, author):
        ...  # returns list of books
    def oldest_book(self):
        ...  # returns Optional[Book]`,
      startCode: `from typing import Optional, List

class Book:
    def __init__(self, title: str, author: str, year: int) -> None:
        self.title = title
        self.author = author
        self.year = year

    def __str__(self) -> str:
        return f"{self.title} by {self.author} ({self.year})"

class Library:
    def __init__(self) -> None:
        self.books: List[Book] = []

    def add_book(self, book: Book) -> None:
        pass

    def search_by_author(self, author: str) -> List[Book]:
        pass

    def oldest_book(self) -> Optional[Book]:
        pass

lib = Library()
lib.add_book(Book("Python Crash Course", "Eric Matthes", 2019))
lib.add_book(Book("Clean Code", "Robert Martin", 2008))
lib.add_book(Book("Automate the Boring Stuff", "Al Sweigart", 2015))

print("By Eric Matthes:")
for b in lib.search_by_author("Eric Matthes"):
    print(" ", b)

print("Oldest:", lib.oldest_book())`,
      hint: 'search_by_author: return [b for b in self.books if b.author == author]. oldest_book: return min(self.books, key=lambda b: b.year) if self.books else None',
    },
  },

  {
    id: 'py-multiprocessing',
    category: 'Professional Python',
    title: 'Multithreading & Multiprocessing',
    difficulty: 'Advanced',
    theory: [
      'Python\'s threading module allows concurrent execution for I/O-bound tasks (network, file, database operations). Multiple threads share memory but Python\'s GIL limits true parallelism for CPU-bound tasks.',
      'For CPU-heavy tasks (calculations, image processing), use multiprocessing — each process has its own Python interpreter and memory, bypassing the GIL.',
      'concurrent.futures provides a simpler API: ThreadPoolExecutor for I/O-bound, ProcessPoolExecutor for CPU-bound tasks.',
      'A common real-world pattern: use threads to download files concurrently, use processes to process/analyse the downloaded files in parallel.',
    ],
    syntax: `from concurrent.futures import ThreadPoolExecutor, as_completed

# Run tasks concurrently
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(task_function, arg) for arg in args]
    for future in as_completed(futures):
        result = future.result()`,
    code: `import threading
import time
from concurrent.futures import ThreadPoolExecutor

# Simulating I/O-bound tasks (API calls, DB queries)
def fetch_student_data(student_id):
    time.sleep(0.5)  # Simulate network delay
    return {"id": student_id, "name": f"Student_{student_id}", "marks": 70 + student_id}

# Sequential approach
print("Sequential approach:")
start = time.time()
results = []
for sid in range(1, 6):
    results.append(fetch_student_data(sid))
print(f"Time: {time.time() - start:.2f}s, Got {len(results)} records")

# Concurrent approach with ThreadPoolExecutor
print("\\nConcurrent approach (5 threads):")
start = time.time()
with ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(fetch_student_data, range(1, 6)))
print(f"Time: {time.time() - start:.2f}s, Got {len(results)} records")

# Thread-safe counter using Lock
counter = 0
lock = threading.Lock()

def increment(n):
    global counter
    for _ in range(n):
        with lock:  # Thread-safe!
            counter += 1

threads = [threading.Thread(target=increment, args=(1000,)) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()
print(f"\\nFinal counter: {counter} (expected: 5000)")`,
    output: `Sequential approach:
Time: 2.51s, Got 5 records

Concurrent approach (5 threads):
Time: 0.51s, Got 5 records

Final counter: 5000 (expected: 5000)`,
    notes: [
      'Use threading for I/O-bound work (network, disk), multiprocessing for CPU-bound work',
      'Always use Lock when multiple threads modify shared data',
      'asyncio is another option for I/O concurrency — uses a single thread with async/await',
    ],
    practice: {
      title: 'Parallel File Word Count',
      description: `Write a function parallel_word_count(texts) that uses ThreadPoolExecutor to count words in each text concurrently.

texts = [
  "Python is great for beginners",
  "Machine learning uses Python and data",
  "Threading makes programs faster for IO tasks",
  "Functions and classes are core Python concepts",
]

Print each text's word count and the total.`,
      startCode: `from concurrent.futures import ThreadPoolExecutor

def count_words(text):
    return len(text.split())

def parallel_word_count(texts):
    with ThreadPoolExecutor() as executor:
        counts = list(executor.map(count_words, texts))
    return counts

texts = [
    "Python is great for beginners",
    "Machine learning uses Python and data",
    "Threading makes programs faster for IO tasks",
    "Functions and classes are core Python concepts",
]

counts = parallel_word_count(texts)
for text, count in zip(texts, counts):
    print(f"{count} words: {text[:40]}...")
print(f"Total words: {sum(counts)}")`,
      hint: 'Use executor.map(count_words, texts) to map the function over all texts concurrently',
    },
  },

  {
    id: 'py-error-handling-advanced',
    category: 'Professional Python',
    title: 'Advanced Error Handling',
    difficulty: 'Advanced',
    theory: [
      'Beyond basic try/except, Python allows chaining exceptions with raise X from Y to show the original cause. This preserves the full error chain for debugging.',
      'Custom exception hierarchies help organise errors in large applications. Create a base exception class and subclass it for specific error types.',
      'The else clause in try/except runs only if NO exception occurred. This is cleaner than putting success code in the try block.',
      'contextlib.suppress(ExceptionType) silently ignores specific exceptions. logging.exception() logs the full traceback automatically.',
    ],
    syntax: `# Full try/except/else/finally
try:
    risky_operation()
except SpecificError as e:
    handle_error(e)
else:
    success_code()  # runs only if no exception
finally:
    cleanup()  # always runs

# Re-raise with context
try:
    ...
except LowLevelError as e:
    raise HighLevelError("What went wrong") from e`,
    code: `# Custom exception hierarchy
class AppError(Exception):
    """Base exception for our app"""
    pass

class ValidationError(AppError):
    def __init__(self, field, message):
        self.field = field
        super().__init__(f"Validation failed for '{field}': {message}")

class DatabaseError(AppError):
    pass

# Simulated database
STUDENTS = {"S001": "Priya", "S002": "Rahul"}

def get_student(student_id: str) -> str:
    try:
        # Simulate DB lookup
        if not isinstance(student_id, str):
            raise ValidationError("student_id", "must be a string")
        if not student_id.startswith("S"):
            raise ValidationError("student_id", "must start with 'S'")

        result = STUDENTS.get(student_id)
        if result is None:
            raise KeyError(student_id)
        return result
    except KeyError as e:
        raise DatabaseError(f"Student {e} not found in database") from e

# Test it
for sid in ["S001", "S003", "INVALID", 123]:
    try:
        name = get_student(sid)
        print(f"Found: {name}")
    except ValidationError as e:
        print(f"Validation: {e.field} → {e}")
    except DatabaseError as e:
        print(f"DB Error: {e}")
    except TypeError as e:
        print(f"Type Error: {e}")`,
    output: `Found: Priya
DB Error: Student 'S003' not found in database
Validation: student_id → Validation failed for 'student_id': must start with 'S'
Validation: student_id → Validation failed for 'student_id': must be a string`,
    notes: [
      'raise X from Y chains exceptions — the original cause (Y) is preserved',
      'except (TypeError, ValueError) catches multiple exception types',
      'Use logging.exception() inside except blocks to log full tracebacks',
    ],
    practice: {
      title: 'Bank Transaction Error System',
      description: `Create a mini banking error system:
1. BankError (base)
2. InsufficientFundsError(BankError) — stores amount_needed and balance
3. InvalidAccountError(BankError)

class Account:
  - __init__(id, owner, balance)
  - withdraw(amount) — raises InsufficientFundsError if insufficient
  - transfer(amount, target_account) — calls withdraw, raises InvalidAccountError if target is None

Test all error scenarios.`,
      startCode: `class BankError(Exception):
    pass

class InsufficientFundsError(BankError):
    def __init__(self, needed, balance):
        self.needed = needed
        self.balance = balance
        super().__init__(f"Need ₹{needed}, but only ₹{balance} available")

class InvalidAccountError(BankError):
    pass

class Account:
    def __init__(self, id, owner, balance):
        self.id = id
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        pass  # Raise InsufficientFundsError if needed

    def transfer(self, amount, target):
        pass  # Check target is not None, then withdraw

acc1 = Account("A001", "Priya", 5000)
acc2 = Account("A002", "Rahul", 1000)

# Test: successful transfer
# Test: insufficient funds
# Test: invalid account`,
      hint: 'In withdraw: if amount > self.balance: raise InsufficientFundsError(amount, self.balance). In transfer: if not target: raise InvalidAccountError()',
    },
  },

  // ── Iterators ─────────────────────────────────────────────────────────────────
  {
    id: 'py-iterators',
    category: 'Functional Python',
    title: 'Iterators & the Iterator Protocol',
    difficulty: 'Intermediate',
    theory: [
      'An iterator implements __iter__() and __next__() — the iterator protocol. Every for loop calls these behind the scenes. Iterators produce values lazily (one at a time), saving memory for large sequences.',
      'Custom iterators let you create objects that behave like lists or ranges but compute values on demand. This is the foundation of Python\'s memory efficiency with large data.',
      'iter() and next() are built-in functions that call __iter__ and __next__. Once exhausted, an iterator raises StopIteration — the for loop catches this to know when to stop.',
    ],
    syntax: `class MyIter:
    def __iter__(self): return self    # required
    def __next__(self):
        # return next value OR raise StopIteration
        raise StopIteration`,
    code: `# Custom iterator examples

class CountUp:
    """Iterator: counts from start to end by step"""
    def __init__(self, start, end, step=1):
        self.current = start
        self.end = end
        self.step = step

    def __iter__(self): return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration
        value = self.current
        self.current += self.step
        return value

print("Counting by 3s from 0 to 15:")
for num in CountUp(0, 15, 3):
    print(num, end=" ")

class Fibonacci:
    def __init__(self, max_count):
        self.a, self.b = 0, 1
        self.count = 0
        self.max_count = max_count

    def __iter__(self): return self

    def __next__(self):
        if self.count >= self.max_count:
            raise StopIteration
        value = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return value

print("\\nFirst 10 Fibonacci numbers:")
print(list(Fibonacci(10)))`,
    output: `Counting by 3s from 0 to 15:
0 3 6 9 12 15
First 10 Fibonacci numbers:
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    notes: [
      'Generators (using yield) are a simpler way to write iterators — Python automatically creates __iter__ and __next__ for you.',
      'itertools module: chain(), cycle(), islice(), product() — all return iterators for complex iteration patterns.',
      'Built-in iterators: range(), enumerate(), zip(), map(), filter() — all return iterators in Python 3.',
    ],
    practice: {
      title: 'Reverse Iterator',
      description: 'Create a Reverse class that takes a list and iterates it backwards without using reversed() or slicing.',
      startCode: `class Reverse:
    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self): return self

    def __next__(self):
        # YOUR CODE: decrement index, return element
        # raise StopIteration when done
        pass

words = ["Python", "is", "awesome", "and", "fun"]
for word in Reverse(words):
    print(word, end=" ")`,
      hint: 'self.index -= 1; if self.index < 0: raise StopIteration; return self.data[self.index]',
    },
  },

  // ── Closures ──────────────────────────────────────────────────────────────────
  {
    id: 'py-closures',
    category: 'Functional Python',
    title: 'Closures — Functions that Remember',
    difficulty: 'Intermediate',
    theory: [
      'A closure is a function that captures variables from its enclosing scope. The inner function "remembers" those variables even after the outer function has returned.',
      'Three conditions: nested function, inner function uses outer variable, outer function returns inner function. Closures are the mechanism behind decorators, factory functions, and callbacks.',
      'Use nonlocal keyword to reassign (not just mutate) a variable from the enclosing scope inside a closure.',
    ],
    syntax: `def outer(x):           # x is captured
    def inner(y):       # inner is the closure
        return x + y    # x from outer scope
    return inner

add5 = outer(5)
print(add5(3))  # → 8`,
    code: `# Counter factory using closures
def make_counter(start=0, step=1):
    count = [start]    # list makes it mutable in closure

    def counter():
        value = count[0]
        count[0] += step
        return value

    return counter

counter1 = make_counter(start=1, step=2)
counter2 = make_counter(start=100, step=5)

print("Odd numbers:  ", [counter1() for _ in range(5)])
print("Step-5 nums:  ", [counter2() for _ in range(4)])

# Discount factory
def make_discount(percent):
    def apply(price):
        saved = price * percent / 100
        return price - saved, saved
    return apply

student_deal  = make_discount(20)
festival_deal = make_discount(50)

price = 2000
final, saved = student_deal(price)
print(f"\\nStudent deal: ₹{price} → ₹{final:.0f} (saved ₹{saved:.0f})")
final, saved = festival_deal(price)
print(f"Festival deal: ₹{price} → ₹{final:.0f} (saved ₹{saved:.0f})")`,
    output: `Odd numbers:   [1, 3, 5, 7, 9]
Step-5 nums:   [100, 105, 110, 115]

Student deal: ₹2000 → ₹1600 (saved ₹400)
Festival deal: ₹2000 → ₹1000 (saved ₹1000)`,
    notes: [
      'functools.partial is similar to closures but for partially applying arguments: add5 = partial(add, 5).',
      'Closures are used in Flask for route decorators, Django for middleware, and React (JS) for hooks — the pattern is universal.',
      'Avoid mutable default arguments in closures — use a list or dict as a container to allow mutation inside the inner function.',
    ],
    practice: {
      title: 'Grade Boundary Checker',
      description: 'Create make_grade_checker(pass_mark, distinction_mark) that returns a closure taking a score and returning "Distinction", "Pass", or "Fail".',
      startCode: `def make_grade_checker(pass_mark, distinction_mark):
    def check_grade(score):
        # YOUR CODE using pass_mark and distinction_mark
        pass
    return check_grade

cbse = make_grade_checker(pass_mark=33, distinction_mark=75)
scores = [25, 40, 60, 78, 95]
for score in scores:
    print(f"Score {score}: {cbse(score)}")`,
      hint: 'if score >= distinction_mark: return "Distinction" elif score >= pass_mark: return "Pass" else: return "Fail"',
    },
  },

  // ── Functional Programming ────────────────────────────────────────────────────
  {
    id: 'py-functional',
    category: 'Functional Python',
    title: 'map, filter, reduce & zip — Functional Programming',
    difficulty: 'Intermediate',
    theory: [
      'Python supports functional programming through map(), filter(), reduce(), and zip(). These eliminate explicit for loops for common transformation and aggregation patterns.',
      'map(fn, iterable) transforms every element. filter(fn, iterable) keeps elements where fn returns True. Both return lazy iterators.',
      'functools.reduce(fn, iterable) accumulates: applies fn to first two elements, then to the result and next element, and so on. zip() pairs elements from multiple iterables together.',
    ],
    syntax: `import functools
squares = list(map(lambda x: x**2, [1,2,3,4]))      # [1,4,9,16]
evens   = list(filter(lambda x: x%2==0, range(10))) # [0,2,4,6,8]
total   = functools.reduce(lambda a,b: a+b, [1..10]) # 55
pairs   = list(zip([1,2,3], ['a','b','c']))           # [(1,'a'),...]`,
    code: `import functools

marks = [78, 92, 65, 88, 72, 95, 60]

# MAP: transform every element
grades = list(map(lambda m: "A+" if m>=90 else ("A" if m>=80 else ("B" if m>=70 else "C")), marks))
print("Marks:", marks)
print("Grades:", grades)

# Convert Celsius to Fahrenheit
celsius = [0, 20, 37, 100]
fahrenheit = list(map(lambda c: c * 9/5 + 32, celsius))
print(f"\\n°C → °F: {list(zip(celsius, fahrenheit))}")

# FILTER: keep matching elements
numbers = list(range(1, 21))
primes = list(filter(
    lambda n: n > 1 and all(n % i != 0 for i in range(2, int(n**0.5)+1)),
    numbers
))
print(f"\\nPrimes 1-20: {primes}")

# REDUCE: accumulate
total   = functools.reduce(lambda a, b: a + b, marks)
maximum = functools.reduce(lambda a, b: a if a > b else b, marks)
print(f"\\nSum: {total}, Max: {maximum}")

# ZIP: combine iterables
subjects = ["Maths", "Science", "English"]
scores_a = [85, 92, 78]
scores_b = [72, 88, 85]
print("\\nA vs B:")
for sub, a, b in zip(subjects, scores_a, scores_b):
    print(f"  {sub}: {a} vs {b} → {'A wins' if a>b else 'B wins'}")

# PIPELINE: map + filter + reduce
even_square_sum = functools.reduce(
    lambda a, b: a + b,
    map(lambda x: x**2, filter(lambda x: x % 2 == 0, range(1, 11)))
)
print(f"\\nSum of squares of evens 1-10: {even_square_sum}")`,
    output: `Marks: [78, 92, 65, 88, 72, 95, 60]
Grades: ['B', 'A+', 'C', 'A', 'B', 'A+', 'C']

°C → °F: [(0, 32.0), (20, 68.0), (37, 98.6), (100, 212.0)]

Primes 1-20: [2, 3, 5, 7, 11, 13, 17, 19]

Sum: 550, Max: 95

A vs B:
  Maths: 85 vs 72 → A wins
  Science: 92 vs 88 → A wins
  English: 78 vs 85 → B wins

Sum of squares of evens 1-10: 220`,
    notes: [
      'List comprehensions are often more readable than map/filter: [x**2 for x in nums if x%2==0].',
      'operator module: operator.add, operator.mul — use instead of lambda for clarity with reduce.',
      'In Python 3, map() and filter() return lazy iterators — wrap in list() to get all values at once.',
    ],
    practice: {
      title: 'Salary Pipeline',
      description: 'Using map, filter, reduce: filter employees with dept="IT", apply 10% raise to their salaries, then find the total raised salary bill.',
      startCode: `import functools

employees = [
    {"name": "Ravi",  "salary": 45000, "dept": "IT"},
    {"name": "Priya", "salary": 72000, "dept": "HR"},
    {"name": "Amit",  "salary": 55000, "dept": "IT"},
    {"name": "Sneha", "salary": 80000, "dept": "IT"},
]

# YOUR CODE using filter(), map(), reduce()
it_employees = list(filter(lambda e: e["dept"] == "IT", employees))
raised = list(map(lambda e: e["salary"] * 1.1, it_employees))
total  = functools.reduce(lambda a, b: a + b, raised)

print("IT employees after 10% raise:", raised)
print(f"Total salary bill: ₹{total:,.0f}")`,
      hint: 'The solution is already shown — try modifying it to also filter for salary > 50000 before applying the raise.',
    },
  },

  // ── Collections ──────────────────────────────────────────────────────────────
  {
    id: 'py-collections',
    category: 'Professional Python',
    title: 'Collections Module — Counter, defaultdict, deque',
    difficulty: 'Intermediate',
    theory: [
      'The collections module has specialised containers more efficient than plain dict/list for common patterns.',
      'Counter: auto-counts elements. Perfect for word frequency, vote counting, histogram creation. counter.most_common(n) returns top n.',
      'defaultdict(list) creates a dict of lists — no KeyError on first access. deque (double-ended queue) is O(1) for append/pop from both ends, unlike lists (O(n) for left-side operations).',
    ],
    syntax: `from collections import Counter, defaultdict, deque
c = Counter("banana")          # Counter({'a':3,'n':2,'b':1})
dd = defaultdict(list)
dd["fruits"].append("apple")   # no KeyError!
dq = deque([1,2,3], maxlen=3)  # sliding window`,
    code: `from collections import Counter, defaultdict, deque

# ─── Counter ────────────────────────────────────────────────
votes = ["BJP","INC","BJP","AAP","BJP","INC","AAP","BJP","INC","BJP"]
vc = Counter(votes)
print("Election Results:")
for party, count in vc.most_common():
    bar = "█" * count
    print(f"  {party:<6}: {bar} ({count})")

text = "to be or not to be that is the question"
top3 = Counter(text.split()).most_common(3)
print(f"\\nTop words: {top3}")

# ─── defaultdict ─────────────────────────────────────────────
students = [("Class 10","Arjun"),("Class 11","Priya"),("Class 10","Rahul"),("Class 12","Sneha")]
roster = defaultdict(list)
for cls, name in students:
    roster[cls].append(name)

for cls, members in sorted(roster.items()):
    print(f"  {cls}: {', '.join(members)}")

# ─── deque (sliding window) ──────────────────────────────────
temps = [32, 35, 38, 40, 41, 39, 36, 33]
window = deque(maxlen=3)
print("\\n3-day moving average:")
for i, t in enumerate(temps):
    window.append(t)
    print(f"  Day {i+1}: {t}°C  avg={sum(window)/len(window):.1f}°C")`,
    output: `Election Results:
  BJP   : █████ (5)
  INC   : ███ (3)
  AAP   : ██ (2)

Top words: [('to', 2), ('be', 2), ('or', 1)]

  Class 10: Arjun, Rahul
  Class 11: Priya
  Class 12: Sneha

3-day moving average:
  Day 1: 32°C  avg=32.0°C
  Day 2: 35°C  avg=33.5°C
  Day 3: 38°C  avg=35.0°C`,
    notes: [
      'Counter arithmetic: c1 + c2 (combine), c1 - c2 (subtract), c1 & c2 (intersection = min counts).',
      'namedtuple creates lightweight immutable objects: Point = namedtuple("Point", ["x","y"]); p = Point(3,4); p.x → 3.',
      'OrderedDict.move_to_end(key) is useful for LRU cache implementations.',
    ],
    practice: {
      title: 'Word Frequency Analyser',
      description: 'Using Counter and defaultdict: count word frequencies in "the quick brown fox jumps over the lazy dog the fox was very quick". Group unique words by first letter. Find which starting letter has the most words.',
      startCode: `from collections import Counter, defaultdict

text = "the quick brown fox jumps over the lazy dog the fox was very quick"
words = text.split()

# Word frequency
freq = Counter(words)
print("Top 3:", freq.most_common(3))

# Group by first letter
by_letter = defaultdict(list)
for word in set(words):
    by_letter[word[0]].append(word)

for letter in sorted(by_letter):
    print(f"  '{letter}': {sorted(by_letter[letter])}")

busiest = max(by_letter, key=lambda l: len(by_letter[l]))
print(f"Most words starting with: '{busiest}' ({len(by_letter[busiest])} words)")`,
      hint: 'The code is mostly complete — try extending by finding words that appear only once (hapax legomena): [w for w, c in freq.items() if c == 1].',
    },
  },

  // ── File Handling ────────────────────────────────────────────────────────────
  {
    id: 'py-file-handling',
    category: 'Professional Python',
    title: 'File Handling — Read, Write, CSV & JSON',
    difficulty: 'Intermediate',
    theory: [
      'Python file handling uses open() with a with statement (context manager) to ensure files close properly. Modes: "r" (read), "w" (write/overwrite), "a" (append), "rb"/"wb" (binary).',
      'csv module: csv.reader() and csv.DictReader() parse CSV files. csv.writer() and csv.DictWriter() write CSV files. Always specify newline="" in open() for CSV files on Windows.',
      'json module: json.dumps() serialises Python objects to JSON string. json.loads() parses JSON string. json.dump()/json.load() work directly with file objects.',
    ],
    syntax: `# File I/O patterns:
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()      # entire file
    # lines = f.readlines() # list of lines
    # for line in f: ...    # line by line

import csv, json
with open("data.csv", newline="") as f:
    reader = csv.DictReader(f)`,
    code: `import csv, json
from io import StringIO

# ─── CSV reading/writing ─────────────────────────────────────
csv_data = """Name,Class,Maths,Science,English
Arjun,10,92,88,75
Priya,11,85,95,88
Rahul,10,72,68,80"""

reader = csv.DictReader(StringIO(csv_data))
students = []
for row in reader:
    row["Total"] = int(row["Maths"]) + int(row["Science"]) + int(row["English"])
    students.append(row)

print("=== CSV Data ===")
for s in students:
    print(f"  {s['Name']:<8} Class {s['Class']}: {s['Total']}/300")

# ─── JSON serialisation ──────────────────────────────────────
school = {
    "name": "Delhi Public School",
    "classes": [10, 11, 12],
    "students": students[:2],
    "facilities": {"library": True, "lab": True}
}

json_str = json.dumps(school, indent=2)
print("\\n=== JSON Output (first 150 chars) ===")
print(json_str[:150] + "...")

# Deserialise
loaded = json.loads(json_str)
print(f"\\nLoaded: {loaded['name']}")
print(f"Top student: {max(loaded['students'], key=lambda s: s['Total'])['Name']}")`,
    output: `=== CSV Data ===
  Arjun    Class 10: 255/300
  Priya    Class 11: 268/300
  Rahul    Class 10: 220/300

=== JSON Output (first 150 chars) ===
{
  "name": "Delhi Public School",
  "classes": [10, 11, 12],
  "students": [{"Name": "Arjun"...}]...

Loaded: Delhi Public School
Top student: Priya`,
    notes: [
      'Always use encoding="utf-8" to handle Hindi, Telugu, Tamil text correctly in files.',
      'pathlib.Path: modern cross-platform path handling. Path("data") / "file.csv" works on Windows and Linux.',
      'For large CSVs: pandas pd.read_csv() reads millions of rows efficiently. Use chunksize parameter for very large files.',
    ],
    practice: {
      title: 'Log File Analyser',
      description: 'Parse this log string. Format: "TIMESTAMP | LEVEL | MESSAGE". Count INFO/WARNING/ERROR lines and find the most common error message.',
      startCode: `from io import StringIO
from collections import Counter

log = """2025-01-15 10:23 | INFO | Server started
2025-01-15 10:25 | WARNING | High memory: 82%
2025-01-15 10:26 | ERROR | Connection timeout
2025-01-15 10:27 | INFO | Retry successful
2025-01-15 10:28 | ERROR | Connection timeout
2025-01-15 10:29 | WARNING | Disk space low
2025-01-15 10:30 | ERROR | Database query failed"""

counts = Counter()
errors = []

for line in StringIO(log):
    parts = [p.strip() for p in line.split("|")]
    if len(parts) == 3:
        _, level, message = parts
        counts[level] += 1
        if level == "ERROR":
            errors.append(message)

for level, count in counts.most_common():
    print(f"  {level}: {count}")

if errors:
    most_common_error = Counter(errors).most_common(1)[0]
    print(f"Most common error: '{most_common_error[0]}' ({most_common_error[1]}x)")`,
      hint: 'The solution is shown — extend by also printing the timestamp of the first error occurrence.',
    },
  },

  // ── Abstract Classes ─────────────────────────────────────────────────────────
  {
    id: 'py-abstract-classes',
    category: 'Object-Oriented Python',
    title: 'Abstract Classes & Interfaces',
    difficulty: 'Advanced',
    theory: [
      'An abstract class defines a blueprint that subclasses must implement. Python\'s abc module provides @abstractmethod decorator — any class with abstract methods cannot be instantiated.',
      'Subclasses that don\'t implement all abstract methods also become abstract. This enforces a contract: every Shape MUST have area() and perimeter().',
      'Abstract classes can also contain concrete methods (shared logic). Python doesn\'t have a separate "interface" keyword — abstract classes with only abstract methods serve as interfaces.',
    ],
    syntax: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: pass    # must override

    def describe(self):              # concrete — shared
        return f"Area = {self.area():.2f}"`,
    code: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    def __init__(self, color="black"):
        self.color = color

    @abstractmethod
    def area(self) -> float: pass

    @abstractmethod
    def perimeter(self) -> float: pass

    def describe(self):
        return (f"{self.__class__.__name__} [{self.color}]: "
                f"area={self.area():.2f}, perimeter={self.perimeter():.2f}")

class Circle(Shape):
    def __init__(self, radius, color="red"):
        super().__init__(color)
        self.radius = radius
    def area(self): return math.pi * self.radius ** 2
    def perimeter(self): return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, w, h, color="blue"):
        super().__init__(color)
        self.w, self.h = w, h
    def area(self): return self.w * self.h
    def perimeter(self): return 2 * (self.w + self.h)

class Triangle(Shape):
    def __init__(self, a, b, c, color="green"):
        super().__init__(color)
        self.a, self.b, self.c = a, b, c
    def area(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s*(s-self.a)*(s-self.b)*(s-self.c))
    def perimeter(self): return self.a + self.b + self.c

shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 4, 5)]
for s in shapes:
    print(s.describe())

try:
    s = Shape()
except TypeError as e:
    print(f"\\nCan't instantiate: {e}")

largest = max(shapes, key=lambda s: s.area())
print(f"Largest: {largest.__class__.__name__} (area={largest.area():.2f})")`,
    output: `Circle [black]: area=78.54, perimeter=31.42
Rectangle [blue]: area=24.00, perimeter=20.00
Triangle [green]: area=6.00, perimeter=12.00

Can't instantiate: Can't instantiate abstract class Shape with abstract methods area, perimeter
Largest: Circle (area=78.54)`,
    notes: [
      'isinstance(obj, Shape) returns True for any Shape subclass — useful for type-safe polymorphic code.',
      'Abstract class methods: @classmethod + @abstractmethod. Abstract properties: @property + @abstractmethod.',
      'Python\'s built-in ABCs: collections.abc.Iterable, Mapping, Sequence — your classes can inherit these to declare protocol conformance.',
    ],
    practice: {
      title: 'Vehicle Interface',
      description: 'Create abstract Vehicle class with abstract methods: start_engine() → str, stop_engine() → str, get_fuel_type() → str. Add concrete info() using all three. Implement Car (petrol), ElectricBike (electric), Autorickshaw (CNG).',
      startCode: `from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    @abstractmethod
    def start_engine(self) -> str: pass

    @abstractmethod
    def get_fuel_type(self) -> str: pass

    def info(self):
        return f"{self.brand} {self.model} | {self.get_fuel_type()} | {self.start_engine()}"

class Car(Vehicle):
    def start_engine(self): return "Vroom! Petrol engine started"
    def get_fuel_type(self): return "Petrol"

# YOUR CODE: ElectricBike and Autorickshaw

vehicles = [Car("Maruti", "Swift")]
for v in vehicles:
    print(v.info())`,
      hint: 'ElectricBike: start_engine returns "Silently powering on...", get_fuel_type returns "Electric". Autorickshaw: get_fuel_type returns "CNG".',
    },
  },

  // ── Unit Testing ─────────────────────────────────────────────────────────────
  {
    id: 'py-testing',
    category: 'Professional Python',
    title: 'Unit Testing — Automated Tests with unittest',
    difficulty: 'Advanced',
    theory: [
      'Unit testing verifies individual functions work correctly. Professional code is always tested — code without tests is rarely accepted in the industry.',
      'Python\'s unittest module is built-in. pytest is the industry standard (simpler syntax, auto-discovery). Both use the assert-based pattern.',
      'Test-Driven Development (TDD): write the test FIRST, then write code to make it pass. Forces clarity about what a function should do before writing it.',
    ],
    syntax: `import unittest

class TestMyFunction(unittest.TestCase):
    def setUp(self): ...        # runs before each test
    def test_basic(self):
        self.assertEqual(add(2,3), 5)
        self.assertRaises(ValueError, fn, bad_input)
    def tearDown(self): ...     # runs after each test`,
    code: `import unittest

def calculate_grade(marks):
    if not (0 <= marks <= 100):
        raise ValueError(f"Marks must be 0-100, got {marks}")
    if marks >= 90: return "A+"
    if marks >= 80: return "A"
    if marks >= 70: return "B"
    if marks >= 60: return "C"
    if marks >= 40: return "D"
    return "F"

def is_palindrome(text):
    cleaned = "".join(c.lower() for c in text if c.isalnum())
    return cleaned == cleaned[::-1]

class TestGradeCalculator(unittest.TestCase):
    def test_grade_A_plus(self):
        self.assertEqual(calculate_grade(95), "A+")
        self.assertEqual(calculate_grade(90), "A+")

    def test_grade_boundaries(self):
        self.assertEqual(calculate_grade(100), "A+")
        self.assertEqual(calculate_grade(0),   "F")
        self.assertEqual(calculate_grade(80),  "A")

    def test_invalid_raises_error(self):
        with self.assertRaises(ValueError):
            calculate_grade(101)
        with self.assertRaises(ValueError):
            calculate_grade(-1)

class TestPalindrome(unittest.TestCase):
    def test_simple(self):
        self.assertTrue(is_palindrome("racecar"))
        self.assertFalse(is_palindrome("hello"))

    def test_with_spaces(self):
        self.assertTrue(is_palindrome("A man a plan a canal Panama"))

if __name__ == "__main__":
    unittest.main(argv=[""], exit=False, verbosity=2)`,
    output: `test_grade_A_plus ... ok
test_grade_boundaries ... ok
test_invalid_raises_error ... ok
test_simple ... ok
test_with_spaces ... ok

Ran 5 tests in 0.001s
OK`,
    notes: [
      'pytest auto-discovers test files named test_*.py or *_test.py. Run: pytest test_myfile.py -v',
      'Code coverage: pytest --cov=module shows which lines are NOT tested. Aim for >80% coverage.',
      'Mock objects (unittest.mock) replace real dependencies (databases, APIs) in tests so tests run fast and in isolation.',
    ],
    practice: {
      title: 'Test BankAccount',
      description: 'Write 8+ test cases for BankAccount with: __init__(owner, balance=0), deposit(amount) — raises ValueError if amount<=0, withdraw(amount) — raises ValueError if amount>balance or amount<=0.',
      startCode: `import unittest

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0: raise ValueError("Must be positive")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount <= 0: raise ValueError("Must be positive")
        if amount > self.balance: raise ValueError("Insufficient funds")
        self.balance -= amount
        return self.balance

class TestBankAccount(unittest.TestCase):
    def setUp(self):
        self.acc = BankAccount("Arjun", balance=1000)

    def test_initial_balance(self):
        self.assertEqual(self.acc.balance, 1000)

    def test_deposit_increases_balance(self):
        self.acc.deposit(500)
        self.assertEqual(self.acc.balance, 1500)

    # YOUR CODE: 6 more test methods
    # test_withdraw_decreases_balance
    # test_insufficient_funds_raises_error
    # test_deposit_zero_raises_error
    # test_withdraw_negative_raises_error
    # test_withdraw_exact_balance_allowed
    # test_multiple_transactions

unittest.main(argv=[""], exit=False, verbosity=2)`,
      hint: 'with self.assertRaises(ValueError): self.acc.withdraw(5000). For exact withdrawal: after withdraw(1000), balance should be 0, not raise error.',
    },
  },

  // ─── Walrus Operator ─────────────────────────────────────────────────────────
  {
    id: 'py-walrus-operator',
    category: 'Python Features',
    title: 'Walrus Operator (:=)',
    difficulty: 'Intermediate',
    theory: [
      `The walrus operator (:=), introduced in Python 3.8, is the "assignment expression" operator. It assigns a value to a variable AND returns that value — all inside an expression. The name comes from the := shape resembling a walrus face.`,
      `Its biggest use is eliminating redundant calls. Without it you might call an expensive function twice: once to check a condition and once to use the result. With :=, you assign and check in one step.`,
      `Classic patterns: while loops that read data until exhausted, list comprehensions that filter and reuse a computed value, and if-elif chains that avoid repeated function calls.`,
      `Walrus operator has lower precedence than most operators, so you usually need parentheses when using it inside an expression: while (line := f.readline()): ...`,
    ],
    syntax: `# Without walrus operator
data = compute()
if data:
    use(data)

# With walrus operator — one line!
if data := compute():
    use(data)

# In while loop
while chunk := file.read(1024):
    process(chunk)`,
    code: `import re

# ─── Example 1: while loop — process until empty ──────────────
def get_next_score(scores, index=[0]):
    """Simulates reading scores one at a time"""
    if index[0] < len(scores):
        val = scores[index[0]]
        index[0] += 1
        return val
    return None

scores = [88, 72, 95, 61, 84, 53, 90]
total, count = 0, 0

# Without walrus:
#   score = get_next_score(scores)
#   while score is not None:
#       total += score; count += 1
#       score = get_next_score(scores)  # repeated call!

# With walrus:
while (score := get_next_score(scores)) is not None:
    total += score
    count += 1

print(f"Processed {count} scores, average = {total/count:.1f}")

# ─── Example 2: list comprehension — filter + reuse ───────────
words = ["python", "is", "a", "great", "language", "hi", "walrus"]

# Without walrus: computes len(w) twice
long_words = [(w, len(w)) for w in words if len(w) > 4]

# With walrus: compute once, reuse
long_words_walrus = [(w, n) for w in words if (n := len(w)) > 4]

print("Long words:", long_words_walrus)

# ─── Example 3: avoid repeated regex match ─────────────────────
emails = ["alice@example.com", "not-an-email", "bob@test.org", "broken"]
pattern = r'(\w+)@(\w+)\.(\w+)'

for email in emails:
    if m := re.match(pattern, email):
        user, domain, ext = m.groups()
        print(f"  Valid: user={user}, domain={domain}.{ext}")
    else:
        print(f"  Invalid: {email!r}")

# ─── Example 4: if/elif without repeated calls ─────────────────
def classify(n):
    if (sq := n ** 2) > 10000:
        return f"{n}² = {sq} — very large"
    elif sq > 100:
        return f"{n}² = {sq} — medium"
    else:
        return f"{n}² = {sq} — small"

for n in [5, 20, 150]:
    print(classify(n))`,
    output: `Processed 7 scores, average = 77.6
Long words: [('python', 6), ('great', 5), ('language', 8), ('walrus', 6)]
  Valid: user=alice, domain=example.com
  Invalid: 'not-an-email'
  Valid: user=bob, domain=test.org
  Invalid: 'broken'
5² = 25 — small
20² = 400 — medium
150² = 22500 — very large`,
    notes: [
      `Walrus operator requires Python 3.8+. Use python --version to check.`,
      `Don't overuse it — if it makes code harder to read, a regular assignment is better. It shines when the alternative means duplicating a call.`,
      `You cannot use := at the top level of an expression statement — you need it inside a condition, comprehension, or similar context.`,
    ],
    practice: {
      title: 'Walrus-Powered Input Loop',
      description: `Write a program that reads student marks from a list one at a time using the walrus operator in a while loop. Stop when you hit -1 (sentinel). Collect all valid marks (0–100) and compute the average. Also use a walrus operator in a list comprehension to find marks above 80 along with their letter grade.`,
      startCode: ``,
      hint: `while (mark := get_mark()) != -1: and [( m, "A" if m>=90 else "B") for m in marks_list if (m:=m) > 80]`,
      solution: `marks_data = [85, 92, 67, 101, 78, -1]  # -1 is sentinel
index = [0]

def get_mark():
    val = marks_data[index[0]]
    index[0] += 1
    return val

valid_marks = []
while (mark := get_mark()) != -1:
    if 0 <= mark <= 100:
        valid_marks.append(mark)
    else:
        print(f"Skipping invalid mark: {mark}")

print(f"Valid marks: {valid_marks}")
print(f"Average: {sum(valid_marks)/len(valid_marks):.1f}")

above_80 = [(m, "A+" if m >= 90 else "A") for m in valid_marks if (n := m) > 80]
print(f"Above 80: {above_80}")`,
    },
  },

  // ─── Dataclasses (advanced features — frozen, order, post_init) ─────────────
  {
    id: 'py-dataclasses-advanced',
    category: 'Object-Oriented Python',
    title: 'Dataclasses — Advanced Features',
    difficulty: 'Intermediate',
    theory: [
      `A dataclass (Python 3.7+, @dataclass decorator) auto-generates boilerplate dunder methods — __init__, __repr__, __eq__ — from field annotations. You get a clean, self-documenting class with almost no repetitive code.`,
      `Fields are declared as class-level annotations: name: str, age: int = 0. Default values work for optional fields. For mutable defaults (lists, dicts) use field(default_factory=list) — never use a mutable object as a default directly.`,
      `Key parameters on @dataclass: frozen=True makes instances immutable (hashable — usable as dict keys), order=True auto-generates __lt__ / __gt__ for sorting, eq=True (default) generates __eq__.`,
      `Post-init processing: __post_init__ runs after __init__ for validation or derived fields. Combine with field(init=False) for computed attributes that are not constructor arguments.`,
    ],
    syntax: `from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float = 0.0           # optional with default

@dataclass(frozen=True)      # immutable
class Color:
    r: int; g: int; b: int

@dataclass(order=True)       # enables sorting
class Student:
    name: str
    marks: float`,
    code: `from dataclasses import dataclass, field
from typing import List
import math

# ─── Basic dataclass ──────────────────────────────────────────
@dataclass
class Point:
    x: float
    y: float = 0.0

    def distance_to(self, other: "Point") -> float:
        return math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)

p1 = Point(3, 4)
p2 = Point(0, 0)
print(p1)                          # Point(x=3, y=4)  ← __repr__ free!
print(p1 == Point(3, 4))           # True             ← __eq__ free!
print(f"Distance: {p1.distance_to(p2):.1f}")

# ─── Frozen (immutable) dataclass ─────────────────────────────
@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int

    def to_hex(self) -> str:
        return f"#{self.r:02X}{self.g:02X}{self.b:02X}"

red = Color(255, 0, 0)
print(red.to_hex())               # #FF0000
print({red: "primary"})           # usable as dict key (hashable)

# ─── Sortable + list field + __post_init__ ─────────────────────
@dataclass(order=True)
class Student:
    sort_index: float = field(init=False, repr=False)  # computed, hidden
    name: str
    marks: float
    subjects: List[str] = field(default_factory=list)

    def __post_init__(self):
        # derived field: use marks as sort key
        self.sort_index = self.marks

    @property
    def grade(self) -> str:
        if self.marks >= 90: return "A+"
        if self.marks >= 80: return "A"
        if self.marks >= 70: return "B"
        return "C"

students = [
    Student("Priya", 92.5, ["Maths", "Physics"]),
    Student("Arjun", 78.0, ["Chemistry"]),
    Student("Sneha", 88.0, ["Biology", "Maths"]),
]

students.sort(reverse=True)       # sorts by marks (sort_index)
print("\nRanking:")
for rank, s in enumerate(students, 1):
    print(f"  {rank}. {s.name:<8} {s.marks:5.1f}  [{s.grade}]  Subjects: {s.subjects}")`,
    output: `Point(x=3, y=4)
True
Distance: 5.0
#FF0000
{Color(r=255, g=0, b=0): 'primary'}

Ranking:
  1. Priya     92.5  [A+]  Subjects: ['Maths', 'Physics']
  2. Sneha     88.0  [A]   Subjects: ['Biology', 'Maths']
  3. Arjun     78.0  [B]   Subjects: ['Chemistry']`,
    notes: [
      `Never write @dataclass(eq=True, order=True) — order=True already implies eq=True.`,
      `fields(default_factory=list) is essential: using subjects: List[str] = [] would share the SAME list across all instances — a classic Python gotcha.`,
      `For large data pipelines, dataclasses with __slots__ (Python 3.10+) use less memory than plain dataclasses.`,
    ],
    practice: {
      title: 'Inventory Item Dataclass',
      description: `Create a frozen dataclass Product(name: str, price: float, category: str) with a discount(pct: float) method returning the discounted price. Create an Inventory dataclass with a list of Products, an add(product) method, and a cheapest_in(category: str) method returning the lowest-priced Product in that category.`,
      startCode: ``,
      hint: `Use @dataclass(frozen=True) for Product. For Inventory use field(default_factory=list) for the products list. cheapest_in can use min() with a key.`,
      solution: `from dataclasses import dataclass, field
from typing import List, Optional

@dataclass(frozen=True)
class Product:
    name: str
    price: float
    category: str

    def discount(self, pct: float) -> float:
        return self.price * (1 - pct / 100)

@dataclass
class Inventory:
    products: List[Product] = field(default_factory=list)

    def add(self, product: Product):
        self.products.append(product)

    def cheapest_in(self, category: str) -> Optional[Product]:
        items = [p for p in self.products if p.category == category]
        return min(items, key=lambda p: p.price) if items else None

inv = Inventory()
inv.add(Product("Notebook", 45.0, "Stationery"))
inv.add(Product("Pen", 10.0, "Stationery"))
inv.add(Product("Laptop", 55000.0, "Electronics"))

cheapest = inv.cheapest_in("Stationery")
print(cheapest)
print(f"After 10% discount: {cheapest.discount(10):.2f}")`,
    },
  },

  // ─── Context Managers — custom class-based & generator-based ────────────────
  {
    id: 'py-context-managers-custom',
    category: 'Python Features',
    title: 'Context Managers — Custom with Statement',
    difficulty: 'Intermediate',
    theory: [
      `A context manager controls resource acquisition and release using the with statement. Python calls __enter__ when entering the block and __exit__ when leaving — even if an exception occurs. This guarantees cleanup.`,
      `The most common example is open(): it acquires a file handle on __enter__ and closes it on __exit__. Without with, forgetting f.close() causes file descriptor leaks.`,
      `You can write custom context managers two ways: (1) a class with __enter__ / __exit__ methods, or (2) a generator function decorated with @contextlib.contextmanager — the yield separates setup from teardown.`,
      `Practical uses: database transactions (commit/rollback), timing code blocks, temporary directory creation, mocking in tests, suppressing specific exceptions with contextlib.suppress().`,
    ],
    syntax: `# Class-based context manager
class CM:
    def __enter__(self):
        # setup
        return resource
    def __exit__(self, exc_type, exc_val, exc_tb):
        # teardown — return True to suppress exceptions

# Generator-based (simpler)
from contextlib import contextmanager
@contextmanager
def cm():
    # setup
    yield resource
    # teardown`,
    code: `import time
from contextlib import contextmanager, suppress

# ─── 1. Class-based: Timer context manager ────────────────────
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self                    # available as 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"  Elapsed: {self.elapsed*1000:.2f} ms")
        return False                   # don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))
print(f"Sum = {total}")

# ─── 2. Generator-based: temporary config override ────────────
_config = {"debug": False, "log_level": "INFO"}

@contextmanager
def override_config(**kwargs):
    old = {k: _config[k] for k in kwargs if k in _config}
    _config.update(kwargs)
    try:
        yield _config
    finally:
        _config.update(old)           # always restored

print("\nBefore:", _config)
with override_config(debug=True, log_level="DEBUG") as cfg:
    print("Inside:", cfg)
print("After: ", _config)

# ─── 3. Suppress specific exceptions ──────────────────────────
data = {"name": "Arjun", "marks": 88}

with suppress(KeyError):
    print("\nCity:", data["city"])   # KeyError — silently ignored
print("Continued after suppress")

# ─── 4. Multiple context managers ─────────────────────────────
@contextmanager
def managed_list(name):
    items = []
    print(f"[{name}] opened")
    try:
        yield items
    finally:
        print(f"[{name}] closed with {len(items)} items")

with managed_list("A") as a, managed_list("B") as b:
    a.extend([1, 2, 3])
    b.extend([10, 20])
    print(f"  A={a}, B={b}")`,
    output: `  Elapsed: 18.43 ms
Sum = 499999500000

Before: {'debug': False, 'log_level': 'INFO'}
Inside: {'debug': True, 'log_level': 'DEBUG'}
After:  {'debug': False, 'log_level': 'INFO'}

Continued after suppress
[A] opened
[B] opened
  A=[1, 2, 3], B=[10, 20]
[B] closed with 2 items
[A] closed with 3 items`,
    notes: [
      `__exit__ receives exception info (exc_type, exc_val, exc_tb). Return True to suppress the exception; return False (or None) to let it propagate.`,
      `contextlib.suppress(ExceptionType) is cleaner than try/except/pass for ignoring specific errors.`,
      `Multiple context managers in one with: with open("a") as f, open("b") as g: — equivalent to nested with statements.`,
    ],
    practice: {
      title: 'Database Transaction Context Manager',
      description: `Create a context manager called transaction(db) that prints "BEGIN" on enter, "COMMIT" on clean exit, and "ROLLBACK" on exception. Use a dict as a fake database. Demonstrate both a successful transaction (insert a record) and a failing one (raise an error mid-way).`,
      startCode: ``,
      hint: `In __exit__ check if exc_type is not None to detect an exception. Return False so exceptions still propagate after rollback.`,
      solution: `from contextlib import contextmanager

fake_db = {}

@contextmanager
def transaction(db):
    snapshot = dict(db)   # save state for rollback
    print("BEGIN")
    try:
        yield db
        print("COMMIT")
    except Exception as e:
        db.clear()
        db.update(snapshot)
        print(f"ROLLBACK — reason: {e}")
        raise

# Successful transaction
with transaction(fake_db) as db:
    db["user_1"] = {"name": "Arjun", "balance": 5000}
    db["user_2"] = {"name": "Priya", "balance": 3000}
print("After success:", list(fake_db.keys()))

# Failing transaction
try:
    with transaction(fake_db) as db:
        db["user_3"] = {"name": "Rahul", "balance": 1000}
        raise ValueError("Insufficient funds")
except ValueError:
    pass
print("After rollback:", list(fake_db.keys()))  # user_3 gone`,
    },
  },

  // ─── Type Hints (py-typing-hints — distinct ID from py-type-hints) ────────────
  {
    id: 'py-typing-hints',
    category: 'Python Features',
    title: 'Type Hints & Annotations',
    difficulty: 'Intermediate',
    theory: [
      `Type hints (PEP 484, Python 3.5+) let you annotate variables and functions with expected types. Python does NOT enforce them at runtime — they exist for editors, linters (mypy, pyright), and human readers.`,
      `Basic syntax: variable: Type = value and def fn(param: Type) -> ReturnType:. For built-in generics Python 3.9+ allows list[int], dict[str, int] directly. For older Python import from the typing module.`,
      `Special types: Optional[T] means T | None (can be missing). Union[A, B] means A or B. Any disables checking. Callable[[int, str], bool] annotates functions. TypeVar creates generic functions.`,
      `Gradual typing: you can add hints one file or one function at a time. Start with function signatures — they give the most value. Run mypy . to see all type errors across a project.`,
    ],
    syntax: `# Variables
count: int = 0
names: list[str] = []

# Functions
def add(a: int, b: int) -> int:
    return a + b

# Optional / Union (Python 3.10+)
def find(name: str) -> str | None: ...

# from typing (Python 3.8)
from typing import Optional, List, Dict
def greet(name: str, title: Optional[str] = None) -> str: ...`,
    code: `from typing import Optional, Union, Callable, TypeVar
from dataclasses import dataclass

# ─── Basic annotations ────────────────────────────────────────
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    return weight_kg / (height_m ** 2)

bmi: float = calculate_bmi(70, 1.75)
print(f"BMI: {bmi:.1f}")

# ─── Optional parameters ──────────────────────────────────────
def format_name(first: str, last: str, title: Optional[str] = None) -> str:
    if title:
        return f"{title} {first} {last}"
    return f"{first} {last}"

print(format_name("Arjun", "Sharma"))
print(format_name("Priya", "Kapoor", title="Dr."))

# ─── Union types (Python 3.10+ uses str | int) ────────────────
def stringify(value: Union[int, float, str]) -> str:
    return str(value)

print(stringify(42), stringify(3.14), stringify("hello"))

# ─── Callable type hint ───────────────────────────────────────
def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))

print(apply_twice(lambda x: x * 2, 3))   # 12

# ─── TypeVar — generic function ───────────────────────────────
T = TypeVar("T")

def first_or_default(items: list[T], default: T) -> T:
    return items[0] if items else default

print(first_or_default([10, 20, 30], 0))  # 10
print(first_or_default([], "N/A"))        # N/A

# ─── Annotated dataclass ──────────────────────────────────────
@dataclass
class Student:
    name: str
    marks: list[float]
    roll: int

    def average(self) -> float:
        return sum(self.marks) / len(self.marks) if self.marks else 0.0

    def is_pass(self, threshold: float = 35.0) -> bool:
        return all(m >= threshold for m in self.marks)

s = Student("Neha", [88.0, 92.5, 76.0], roll=7)
print(f"\n{s.name}: avg={s.average():.1f}, pass={s.is_pass()}")`,
    output: `BMI: 22.9
Arjun Sharma
Dr. Priya Kapoor
42 3.14 hello
12
10
N/A

Neha: avg=85.5, pass=True`,
    notes: [
      `Run mypy yourfile.py to catch type errors before runtime. Install with: pip install mypy`,
      `Python 3.10+ can write int | None instead of Optional[int] — much cleaner. Python 3.9+ allows list[int] instead of List[int].`,
      `Type hints don't slow down your program — they're ignored at runtime. They're purely for developer tooling.`,
      `Use # type: ignore at end of a line to suppress a specific mypy error when you know better than the type checker.`,
    ],
    practice: {
      title: 'Fully-Typed Library System',
      description: `Create a typed Book dataclass (title: str, author: str, pages: int, available: bool = True). Write a typed function search_books(books: list[Book], query: str) -> list[Book] that returns books whose title or author contains the query (case-insensitive). Write another function longest_book(books: list[Book]) -> Book | None that returns the book with most pages, or None if the list is empty.`,
      startCode: ``,
      hint: `Use list[Book] as the parameter type. For longest_book return type use Optional[Book] or Book | None. Use max(books, key=lambda b: b.pages) inside a guard.`,
      solution: `from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Book:
    title: str
    author: str
    pages: int
    available: bool = True

def search_books(books: list[Book], query: str) -> list[Book]:
    q = query.lower()
    return [b for b in books if q in b.title.lower() or q in b.author.lower()]

def longest_book(books: list[Book]) -> Optional[Book]:
    return max(books, key=lambda b: b.pages) if books else None

library: list[Book] = [
    Book("Python Crash Course", "Eric Matthes", 544),
    Book("Automate the Boring Stuff", "Al Sweigart", 504),
    Book("Fluent Python", "Luciano Ramalho", 792),
]

results = search_books(library, "python")
for b in results:
    print(b.title)

print(longest_book(library))`,
    },
  },

  // ─── itertools ───────────────────────────────────────────────────────────────
  {
    id: 'py-itertools',
    category: 'Python Standard Library',
    title: 'itertools Module',
    difficulty: 'Advanced',
    theory: [
      `itertools is a standard-library module of fast, memory-efficient iterator building blocks. All itertools return iterators (lazy evaluation) — they produce values on demand rather than building a full list, making them ideal for large data.`,
      `Infinite iterators: count(start, step) counts forever; cycle(iterable) loops forever; repeat(val, n) repeats n times. Always pair these with islice() or a break condition.`,
      `Combinatoric iterators: product() (Cartesian product), permutations(), combinations(), combinations_with_replacement(). Essential for brute-force search, combinatorics problems, and test data generation.`,
      `Terminating iterators: chain() links multiple iterables; groupby() groups consecutive equal keys; islice() slices any iterator; starmap() applies a function to each tuple; takewhile() / dropwhile() filter by predicate.`,
    ],
    syntax: `import itertools as it

it.count(1, 2)          # 1, 3, 5, 7, …  (infinite)
it.cycle("AB")          # A, B, A, B, …  (infinite)
it.chain([1,2],[3,4])   # 1, 2, 3, 4
it.islice(it.count(), 5)# 0, 1, 2, 3, 4
it.product("AB", repeat=2)     # AA AB BA BB
it.permutations([1,2,3], 2)    # (1,2)(1,3)(2,1)…
it.combinations([1,2,3], 2)    # (1,2)(1,3)(2,3)
it.groupby(data, key=fn)       # groups by key`,
    code: `import itertools as it

# ─── 1. chain — flatten nested iterables ──────────────────────
semester1 = ["Maths", "Physics"]
semester2 = ["Chemistry", "CS"]
semester3 = ["English", "PE"]

all_subjects = list(it.chain(semester1, semester2, semester3))
print("All subjects:", all_subjects)

# chain.from_iterable — useful when you have a list of lists
nested = [["a", "b"], ["c"], ["d", "e", "f"]]
print("Flattened:", list(it.chain.from_iterable(nested)))

# ─── 2. islice — safely slice any iterator ────────────────────
import math
primes_gen = (n for n in it.count(2)
              if all(n % i != 0 for i in range(2, int(math.sqrt(n))+1)))
first_10_primes = list(it.islice(primes_gen, 10))
print("\nFirst 10 primes:", first_10_primes)

# ─── 3. groupby — group sorted data ──────────────────────────
students = [
    {"name": "Arjun",  "grade": "A"},
    {"name": "Priya",  "grade": "A"},
    {"name": "Rahul",  "grade": "B"},
    {"name": "Sneha",  "grade": "A"},
    {"name": "Vikram", "grade": "B"},
    {"name": "Meera",  "grade": "C"},
]
students.sort(key=lambda s: s["grade"])  # MUST sort first!

print("\nStudents by grade:")
for grade, group in it.groupby(students, key=lambda s: s["grade"]):
    names = [s["name"] for s in group]
    print(f"  {grade}: {names}")

# ─── 4. product — Cartesian product ──────────────────────────
sizes  = ["S", "M", "L"]
colors = ["Red", "Blue"]
variants = list(it.product(sizes, colors))
print(f"\nProduct variants ({len(variants)} total): {variants}")

# ─── 5. combinations vs permutations ─────────────────────────
team = ["Alice", "Bob", "Carol", "Dave"]
pairs = list(it.combinations(team, 2))
print(f"\nPossible pairs ({len(pairs)}): {pairs}")

arrangements = list(it.permutations(team, 2))
print(f"Ordered pairs  ({len(arrangements)}): first 4 = {arrangements[:4]}")

# ─── 6. accumulate — running totals ──────────────────────────
monthly_sales = [12000, 15000, 9000, 18000, 21000, 14000]
running_total = list(it.accumulate(monthly_sales))
print(f"\nMonthly sales:  {monthly_sales}")
print(f"Running totals: {running_total}")`,
    output: `All subjects: ['Maths', 'Physics', 'Chemistry', 'CS', 'English', 'PE']
Flattened: ['a', 'b', 'c', 'd', 'e', 'f']

First 10 primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

Students by grade:
  A: ['Arjun', 'Priya', 'Sneha']
  B: ['Rahul', 'Vikram']
  C: ['Meera']

Product variants (6 total): [('S', 'Red'), ('S', 'Blue'), ('M', 'Red'), ('M', 'Blue'), ('L', 'Red'), ('L', 'Blue')]

Possible pairs (6): [('Alice', 'Bob'), ('Alice', 'Carol'), ('Alice', 'Dave'), ('Bob', 'Carol'), ('Bob', 'Dave'), ('Carol', 'Dave')]
Ordered pairs  (12): first 4 = [('Alice', 'Bob'), ('Alice', 'Carol'), ('Alice', 'Dave'), ('Bob', 'Alice')]

Monthly sales:  [12000, 15000, 9000, 18000, 21000, 14000]
Running totals: [12000, 27000, 36000, 54000, 75000, 89000]`,
    notes: [
      `groupby only groups consecutive elements with the same key — always sort by the same key first, or you'll get multiple groups for the same value.`,
      `All itertools functions return iterators, not lists. Wrap in list() to materialise, but only if you need random access or multiple passes.`,
      `Combinations count: C(n,r) = n!/(r!(n-r)!). Permutations: P(n,r) = n!/(n-r)!. Python's len() on the returned iterator doesn't work — compute the count mathematically.`,
    ],
    practice: {
      title: 'Schedule Generator with itertools',
      description: `Use itertools to: (1) generate all possible exam schedules (permutations) for 4 subjects choosing 3 slots — print how many exist and list the first 5; (2) group a list of marks (integers 0–100) into bands (0-49 Fail, 50-74 Pass, 75-100 Distinction) using groupby after sorting; (3) use accumulate to find after which exam the total marks first exceed 250.`,
      startCode: ``,
      hint: `permutations(subjects, 3) for schedules. For groupby, define a band function and sort by it. For accumulate, use next(i for i, total in enumerate(accumulate(marks)) if total > 250).`,
      solution: `import itertools as it

subjects = ["Maths", "Physics", "Chemistry", "CS"]
schedules = list(it.permutations(subjects, 3))
print(f"Total schedules: {len(schedules)}")
print("First 5:", schedules[:5])

marks = [45, 82, 67, 91, 38, 75, 55, 88]
def band(m):
    if m < 50: return "Fail"
    if m < 75: return "Pass"
    return "Distinction"

marks.sort(key=band)
print("\nGrouped:")
for b, grp in it.groupby(marks, key=band):
    print(f"  {b}: {list(grp)}")

marks2 = [60, 72, 85, 44, 91, 55]
for i, total in enumerate(it.accumulate(marks2)):
    if total > 250:
        print(f"\nTotal exceeded 250 after exam {i+1} (running total={total})")
        break`,
    },
  },

  // ─── collections module (py-collections-module — distinct ID) ────────────────
  {
    id: 'py-collections-module',
    category: 'Python Standard Library',
    title: 'collections Module (Counter, defaultdict, deque)',
    difficulty: 'Intermediate',
    theory: [
      `The collections module provides specialised container types that extend Python's built-in dict, list, and tuple for common patterns — more efficient and expressive than implementing them yourself.`,
      `Counter(iterable) counts hashable elements and stores them as {element: count}. It supports arithmetic (+, -, &, |) and most_common(n) returns the n highest-count elements.`,
      `defaultdict(default_factory) is a dict that never raises KeyError — it calls default_factory() to create a missing value on first access. Common factories: list, set, int (for counting without Counter).`,
      `deque (double-ended queue) supports O(1) append/pop from BOTH ends, unlike list which is O(n) for left-side operations. Use maxlen for a sliding window or fixed-size history buffer.`,
      `Other highlights: OrderedDict (remembers insertion order — mostly superseded by dict in Python 3.7+), namedtuple (lightweight class-like tuple with field names), ChainMap (logical merge of multiple dicts).`,
    ],
    syntax: `from collections import Counter, defaultdict, deque, namedtuple

Counter("banana")            # Counter({'a':3,'n':2,'b':1})
Counter.most_common(2)       # [('a',3),('n',2)]

dd = defaultdict(list)
dd["key"].append(1)          # no KeyError

dq = deque([1,2,3], maxlen=3)
dq.appendleft(0)             # O(1)! deque → [0,1,2]

Point = namedtuple("Point", ["x","y"])`,
    code: `from collections import Counter, defaultdict, deque, namedtuple, ChainMap

# ─── Counter ──────────────────────────────────────────────────
paragraph = """
Python is great. Python is easy. Python is powerful.
Data science with Python is very popular in India.
"""
words = paragraph.lower().split()
wc = Counter(words)

print("=== Word Frequency ===")
for word, count in wc.most_common(5):
    print(f"  {word:<12}: {'|' * count} ({count})")

# Counter arithmetic
c1 = Counter(a=3, b=2, c=1)
c2 = Counter(a=1, b=4, d=2)
print(f"\nc1 + c2  = {c1 + c2}")
print(f"c1 - c2  = {c1 - c2}")  # removes zero/negative counts
print(f"c1 & c2  = {c1 & c2}")  # intersection (min)
print(f"c1 | c2  = {c1 | c2}")  # union (max)

# ─── defaultdict ──────────────────────────────────────────────
print("\n=== Inverted Index ===")
documents = {
    "doc1": "python data science machine learning",
    "doc2": "python web flask django",
    "doc3": "data analysis pandas numpy",
}
index: defaultdict = defaultdict(list)
for doc, text in documents.items():
    for word in text.split():
        index[word].append(doc)

for word in ["python", "data", "flask", "numpy"]:
    print(f"  '{word}' found in: {index[word]}")

# ─── deque as sliding window ──────────────────────────────────
print("\n=== Last 3 Errors (sliding window) ===")
error_log = deque(maxlen=3)

events = ["OK", "ERROR_404", "OK", "ERROR_500", "OK", "ERROR_403", "ERROR_401"]
for event in events:
    if event.startswith("ERROR"):
        error_log.append(event)
    print(f"  After '{event}': buffer = {list(error_log)}")

# ─── namedtuple ───────────────────────────────────────────────
print("\n=== Named Tuple ===")
Student = namedtuple("Student", ["name", "roll", "marks"])
s1 = Student("Priya", 42, 91.5)
s2 = Student("Arjun", 17, 85.0)

roster = [s1, s2]
roster.sort(key=lambda s: s.marks, reverse=True)
for s in roster:
    print(f"  Roll {s.roll}: {s.name} — {s.marks}")`,
    output: `=== Word Frequency ===
  python      : |||||||| (8)
  is          : |||||| (6)
  data        : || (2)
  great.      : | (1)
  easy.       : | (1)

c1 + c2  = Counter({'b': 6, 'a': 4, 'd': 2, 'c': 1})
c1 - c2  = Counter({'a': 2, 'c': 1})
c1 & c2  = Counter({'a': 1, 'b': 2})
c1 | c2  = Counter({'b': 4, 'a': 3, 'd': 2, 'c': 1})

=== Inverted Index ===
  'python' found in: ['doc1', 'doc2']
  'data' found in: ['doc1', 'doc3']
  'flask' found in: ['doc2']
  'numpy' found in: ['doc3']

=== Last 3 Errors (sliding window) ===
  After 'OK': buffer = []
  After 'ERROR_404': buffer = ['ERROR_404']
  After 'OK': buffer = ['ERROR_404']
  After 'ERROR_500': buffer = ['ERROR_404', 'ERROR_500']
  After 'OK': buffer = ['ERROR_404', 'ERROR_500']
  After 'ERROR_403': buffer = ['ERROR_404', 'ERROR_500', 'ERROR_403']
  After 'ERROR_401': buffer = ['ERROR_500', 'ERROR_403', 'ERROR_401']

=== Named Tuple ===
  Roll 42: Priya — 91.5
  Roll 17: Arjun — 85.0`,
    notes: [
      `namedtuple instances are immutable like regular tuples but far more readable — access fields by name (s.marks) not index (s[2]).`,
      `defaultdict(int) is perfect for frequency counting: dd[key] += 1 without checking if the key exists first.`,
      `deque.appendleft() and popleft() are O(1). list.insert(0, x) and list.pop(0) are O(n) — use deque when you need a queue.`,
    ],
    practice: {
      title: 'Log Analyser',
      description: `Given a list of log strings in the format "LEVEL: message" (e.g. "ERROR: disk full"), use Counter to count occurrences of each level (INFO, WARNING, ERROR). Use defaultdict(list) to group messages by level. Use a deque(maxlen=5) to track the 5 most recent ERROR messages. Print a summary report.`,
      startCode: ``,
      hint: `log.split(": ", 1) splits into [level, message]. Counter(levels_list) counts them. defaultdict(list) for grouping. Filter errors before adding to deque.`,
      solution: `from collections import Counter, defaultdict, deque

logs = [
    "INFO: server started",
    "INFO: user login",
    "ERROR: disk full",
    "WARNING: high memory",
    "ERROR: connection refused",
    "INFO: backup complete",
    "ERROR: timeout",
    "WARNING: slow query",
    "ERROR: null pointer",
    "ERROR: out of memory",
    "INFO: cache cleared",
]

levels = []
by_level = defaultdict(list)
recent_errors = deque(maxlen=5)

for log in logs:
    level, msg = log.split(": ", 1)
    levels.append(level)
    by_level[level].append(msg)
    if level == "ERROR":
        recent_errors.append(msg)

counts = Counter(levels)
print("=== Summary ===")
for level, count in counts.most_common():
    print(f"  {level}: {count}")

print("\n=== Recent Errors ===")
for e in recent_errors:
    print(f"  - {e}")`,
    },
  },

  // ─── pathlib ─────────────────────────────────────────────────────────────────
  {
    id: 'py-pathlib',
    category: 'Python Standard Library',
    title: 'pathlib — Modern File Paths',
    difficulty: 'Intermediate',
    theory: [
      `pathlib (Python 3.4+) provides Path objects for working with file system paths — an object-oriented alternative to string-based os.path manipulation. Paths are represented as objects with methods and properties, not raw strings.`,
      `Cross-platform: Path automatically uses / on Unix and \\ on Windows so the same code works everywhere. Use forward slash / as the join operator: base / "subdir" / "file.txt".`,
      `Key properties: path.name (filename), path.stem (filename without extension), path.suffix (extension like ".py"), path.parent (directory), path.parts (tuple of components).`,
      `Key methods: path.exists(), path.is_file(), path.is_dir(), path.mkdir(parents=True), path.read_text(), path.write_text(), path.glob("*.py"), path.rglob("*.py") (recursive).`,
    ],
    syntax: `from pathlib import Path

p = Path("/home/user/docs/report.pdf")
p.name        # "report.pdf"
p.stem        # "report"
p.suffix      # ".pdf"
p.parent      # Path("/home/user/docs")
p.exists()    # True/False

# Join paths with /
new = p.parent / "archive" / "report_v2.pdf"

# Read/write
p.read_text(encoding="utf-8")
p.write_text("content", encoding="utf-8")`,
    code: `from pathlib import Path
import tempfile, os

# Use a temp directory so this demo is self-contained
tmp = Path(tempfile.mkdtemp())
print(f"Working in: {tmp}\n")

# ─── Create directory structure ───────────────────────────────
(tmp / "src").mkdir()
(tmp / "src" / "utils").mkdir()
(tmp / "tests").mkdir()
(tmp / "data").mkdir()

# ─── Write some files ─────────────────────────────────────────
(tmp / "README.md").write_text("# My Project\nA demo.\n", encoding="utf-8")
(tmp / "src" / "main.py").write_text('print("Hello")\n', encoding="utf-8")
(tmp / "src" / "utils" / "helper.py").write_text("def add(a,b): return a+b\n", encoding="utf-8")
(tmp / "tests" / "test_main.py").write_text("import unittest\n", encoding="utf-8")
(tmp / "data" / "students.csv").write_text("name,marks\nArjun,88\nPriya,92\n", encoding="utf-8")

# ─── Path properties ──────────────────────────────────────────
readme = tmp / "README.md"
print("=== Path Properties ===")
print(f"  name   : {readme.name}")
print(f"  stem   : {readme.stem}")
print(f"  suffix : {readme.suffix}")
print(f"  parent : {readme.parent.name}")
print(f"  exists : {readme.exists()}")
print(f"  is_file: {readme.is_file()}")
print(f"  is_dir : {readme.parent.is_dir()}")

# ─── Read and modify ──────────────────────────────────────────
content = readme.read_text(encoding="utf-8")
print(f"\n=== README content ===\n{content}")

# ─── glob — find files by pattern ────────────────────────────
print("=== All Python files (rglob) ===")
for py_file in sorted(tmp.rglob("*.py")):
    rel = py_file.relative_to(tmp)
    size = py_file.stat().st_size
    print(f"  {rel}  ({size} bytes)")

# ─── Walk directories ─────────────────────────────────────────
print("\n=== Directory tree ===")
for item in sorted(tmp.rglob("*")):
    depth = len(item.relative_to(tmp).parts) - 1
    icon = "F" if item.is_file() else "D"
    print(f"  {'  ' * depth}[{icon}] {item.name}")

# cleanup
import shutil; shutil.rmtree(tmp)`,
    output: `Working in: /tmp/tmpXXXXXX

=== Path Properties ===
  name   : README.md
  stem   : README
  suffix : .md
  parent : tmpXXXXXX
  exists : True
  is_file: True
  is_dir : True

=== README content ===
# My Project
A demo.

=== All Python files (rglob) ===
  src/main.py  (16 bytes)
  src/utils/helper.py  (26 bytes)
  tests/test_main.py  (19 bytes)

=== Directory tree ===
  [D] data
    [F] students.csv
  [F] README.md
  [D] src
    [F] main.py
    [D] utils
      [F] helper.py
  [D] tests
    [F] test_main.py`,
    notes: [
      `Path("/some/path") vs Path(r"C:\\some\\path") — on Windows you can also use Path("C:/some/path") with forward slashes; Python handles the conversion.`,
      `path.mkdir(parents=True, exist_ok=True) creates the full directory tree and doesn't error if it already exists — the safest way to ensure a directory exists.`,
      `path.read_text() / path.write_text() handle open/close automatically — prefer them over open() for simple file reads/writes.`,
    ],
    practice: {
      title: 'Project File Scanner',
      description: `Given a directory path, write a function scan_project(root: Path) that returns a dict with keys: "py_files" (list of .py file paths relative to root), "total_lines" (sum of line counts across all .py files), "largest_file" (name of .py file with most lines). Use pathlib throughout — no os.path allowed.`,
      startCode: ``,
      hint: `Use root.rglob("*.py") to find all Python files. path.read_text().splitlines() gives a list of lines. Use max(files, key=lambda f: line_count(f)) for largest.`,
      solution: `from pathlib import Path
import tempfile, shutil

def scan_project(root: Path) -> dict:
    py_files = list(root.rglob("*.py"))
    line_counts = {f: len(f.read_text(encoding="utf-8").splitlines()) for f in py_files}
    total = sum(line_counts.values())
    largest = max(line_counts, key=line_counts.get) if py_files else None
    return {
        "py_files": [str(f.relative_to(root)) for f in py_files],
        "total_lines": total,
        "largest_file": largest.name if largest else None,
    }

# Demo
tmp = Path(tempfile.mkdtemp())
(tmp / "app.py").write_text("x = 1\ny = 2\nz = 3\n")
(tmp / "utils.py").write_text("def add(a,b):\n    return a+b\n")
(tmp / "sub").mkdir()
(tmp / "sub" / "helper.py").write_text("# helper\nimport os\nos.getcwd()\n")

result = scan_project(tmp)
print("Python files:", result["py_files"])
print("Total lines:", result["total_lines"])
print("Largest:", result["largest_file"])
shutil.rmtree(tmp)`,
    },
  },

  // ─── Regular Expressions — validation, extraction, substitution ─────────────
  {
    id: 'py-regex-practical',
    category: 'Python Standard Library',
    title: 'Regular Expressions — Practical Patterns',
    difficulty: 'Intermediate',
    theory: [
      `Regular expressions (regex) are patterns that describe text — they let you search, validate, extract, and replace complex string patterns with a single expressive rule.`,
      `Core pattern syntax: . (any char), \\d (digit), \\w (word char), \\s (whitespace), ^ (start), $ (end), * (0+), + (1+), ? (0 or 1), {n,m} (n to m times). Square brackets [abc] match any of a, b, c.`,
      `Capturing groups (...) extract matched sub-patterns. Named groups (?P<name>...) make extractions self-documenting. Non-capturing groups (?:...) group without capturing.`,
      `Key functions: re.search() finds first match anywhere; re.match() matches at start only; re.findall() returns all matches as a list; re.sub() replaces matches; re.compile() pre-compiles a pattern for reuse.`,
    ],
    syntax: `import re

re.search(r'\\d+', text)       # first match → Match object
re.findall(r'\\d+', text)      # all matches → list
re.sub(r'\\s+', ' ', text)     # replace
re.split(r'[,;]', text)        # split on , or ;

m = re.search(r'(\\w+)@(\\w+)', text)
m.group(0)   # full match
m.group(1)   # first group`,
    code: `import re

# ─── 1. Validate formats ──────────────────────────────────────
patterns = {
    "Email":   r'^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}$',
    "Phone":   r'^(\\+91|0)?[6-9]\\d{9}$',
    "PIN":     r'^\\d{6}$',
    "Aadhaar": r'^\\d{4}\\s?\\d{4}\\s?\\d{4}$',
}

test_data = {
    "Email":   ["arjun@gmail.com", "bad-email", "priya@iit.ac.in"],
    "Phone":   ["+919876543210", "9876543210", "12345"],
    "PIN":     ["110001", "11000", "abcdef"],
    "Aadhaar": ["1234 5678 9012", "123456789012", "1234-5678-9012"],
}

for fmt, pattern in patterns.items():
    print(f"\\n{fmt}:")
    for value in test_data[fmt]:
        ok = "✓" if re.match(pattern, value, re.IGNORECASE) else "✗"
        print(f"  {ok} {value!r}")

# ─── 2. Extract information ───────────────────────────────────
log_line = "2026-01-15 14:32:07 ERROR  user_id=42 action=login ip=192.168.1.100"

date_m = re.search(r'(\\d{4})-(\\d{2})-(\\d{2})', log_line)
if date_m:
    y, mo, d = date_m.groups()
    print(f"\\nDate extracted: {d}/{mo}/{y}")

# Named groups
kv_pattern = r'(?P<key>\\w+)=(?P<value>[\\w.]+)'
for m in re.finditer(kv_pattern, log_line):
    print(f"  {m.group('key'):10} = {m.group('value')}")

# ─── 3. Clean and transform text ─────────────────────────────
messy = "  Hello,   World!   This  has   extra   spaces.  "
clean = re.sub(r'\\s+', ' ', messy).strip()
print(f"\\nCleaned: {clean!r}")

phone_raw = "Call us: (022) 4567-8901 or 022-4567-8902"
normalized = re.sub(r'[()\\s-]', '', phone_raw)
print(f"Normalized: {normalized}")

# ─── 4. Split on multiple delimiters ─────────────────────────
csv_like = "Arjun;Priya,Sneha|Rahul Vikram"
names = re.split(r'[;,|\\s]+', csv_like)
print(f"\\nNames: {names}")`,
    output: `Email:
  ✓ 'arjun@gmail.com'
  ✗ 'bad-email'
  ✓ 'priya@iit.ac.in'

Phone:
  ✓ '+919876543210'
  ✓ '9876543210'
  ✗ '12345'

PIN:
  ✓ '110001'
  ✗ '11000'
  ✗ 'abcdef'

Aadhaar:
  ✓ '1234 5678 9012'
  ✓ '123456789012'
  ✗ '1234-5678-9012'

Date extracted: 15/01/2026
  user_id    = 42
  action     = login
  ip         = 192.168.1.100

Cleaned: 'Hello, World! This has extra spaces.'
Normalized: Call us: 02245678901 or 02245678902

Names: ['Arjun', 'Priya', 'Sneha', 'Rahul', 'Vikram']`,
    notes: [
      `Always use raw strings r'...' for regex patterns to avoid Python interpreting backslashes before the regex engine sees them.`,
      `re.compile(pattern) pre-compiles a pattern — use this when the same pattern is used in a loop for better performance.`,
      `re.IGNORECASE (or re.I) makes patterns case-insensitive. re.MULTILINE makes ^ and $ match start/end of each line, not just the whole string.`,
    ],
    practice: {
      title: 'Resume Parser',
      description: `Write a function parse_resume(text: str) -> dict that extracts from a resume text: all email addresses, all Indian phone numbers (10 digits optionally starting with +91 or 0), and all years mentioned (4-digit numbers between 1980 and 2030). Return a dict with keys "emails", "phones", "years".`,
      startCode: ``,
      hint: `Use re.findall() for each pattern. Phone: r'(\\+91|0)?[6-9]\\d{9}'. Years: r'\\b(19[89]\\d|20[0-2]\\d|2030)\\b'. Deduplicate with list(set(...)).`,
      solution: `import re

def parse_resume(text: str) -> dict:
    emails = re.findall(r'[\\w.+-]+@[\\w-]+\\.[a-z]{2,}', text, re.I)
    phones = re.findall(r'(?:\\+91|0)?[6-9]\\d{9}', text)
    years  = re.findall(r'\\b(19[89]\\d|20[0-2]\\d|2030)\\b', text)
    return {
        "emails": list(set(emails)),
        "phones": list(set(phones)),
        "years":  sorted(set(int(y) for y in years)),
    }

resume = """
Arjun Sharma | arjun.sharma@gmail.com | +919876543210
Education: B.Tech CS, IIT Delhi (2020-2024)
Work: Software Engineer at TechCorp (2024-present)
Internship: DataCo (2022)
Contact: backup@outlook.com or 9123456789
"""

result = parse_resume(resume)
print("Emails:", result["emails"])
print("Phones:", result["phones"])
print("Years: ", result["years"])`,
    },
  },

  // ─── JSON ─────────────────────────────────────────────────────────────────────
  {
    id: 'py-json',
    category: 'Python Standard Library',
    title: 'JSON — Reading & Writing JSON Data',
    difficulty: 'Beginner',
    theory: [
      `JSON (JavaScript Object Notation) is the universal data exchange format for web APIs, configuration files, and data storage. Python's json module makes it trivial to convert between JSON strings and Python dicts/lists.`,
      `Two directions: serialisation (Python → JSON string) uses json.dumps(obj) or json.dump(obj, file); deserialisation (JSON string → Python) uses json.loads(string) or json.load(file).`,
      `Type mapping: Python dict ↔ JSON object, list ↔ array, str ↔ string, int/float ↔ number, True/False ↔ true/false, None ↔ null. Anything else (datetime, custom class) needs a custom encoder.`,
      `Formatting options: indent=4 for pretty-printing, sort_keys=True for consistent output, ensure_ascii=False to preserve Unicode characters like Indian scripts.`,
    ],
    syntax: `import json

# Python dict → JSON string
text = json.dumps(data, indent=4)

# JSON string → Python dict
data = json.loads(text)

# Write to file
with open("data.json", "w") as f:
    json.dump(data, f, indent=4)

# Read from file
with open("data.json") as f:
    data = json.load(f)`,
    code: `import json

# ─── 1. dumps / loads (strings) ──────────────────────────────
student = {
    "name": "Priya Kapoor",
    "roll": 42,
    "marks": {"Maths": 95, "Physics": 88, "CS": 97},
    "passed": True,
    "address": None,
    "hobbies": ["chess", "coding", "reading"],
}

# Serialise to JSON string
json_str = json.dumps(student, indent=2, ensure_ascii=False)
print("=== JSON string ===")
print(json_str)

# Deserialise back
data = json.loads(json_str)
print(f"\nName : {data['name']}")
print(f"CS   : {data['marks']['CS']}")
print(f"Hobbies: {data['hobbies']}")
print(f"Type check — marks is: {type(data['marks'])}")

# ─── 2. Working with a JSON API response (simulated) ─────────
api_response = """
{
  "status": "success",
  "students": [
    {"id": 1, "name": "Arjun", "score": 88},
    {"id": 2, "name": "Sneha", "score": 94},
    {"id": 3, "name": "Rahul", "score": 72}
  ],
  "meta": {"total": 3, "page": 1}
}
"""
parsed = json.loads(api_response)
students = parsed["students"]
print("\n=== API Data ===")
print(f"Total students: {parsed['meta']['total']}")
top = max(students, key=lambda s: s["score"])
print(f"Top scorer: {top['name']} with {top['score']}")

# ─── 3. Compact vs pretty ────────────────────────────────────
config = {"debug": False, "port": 8080, "host": "localhost"}
compact = json.dumps(config, separators=(',', ':'))
pretty  = json.dumps(config, indent=4, sort_keys=True)
print(f"\nCompact: {compact}")
print(f"Pretty:\n{pretty}")

# ─── 4. Custom encoder for non-serialisable types ─────────────
import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)

event = {"title": "Python Exam", "date": datetime.date(2026, 6, 15)}
print("\nCustom encode:", json.dumps(event, cls=DateTimeEncoder))`,
    output: `=== JSON string ===
{
  "name": "Priya Kapoor",
  "roll": 42,
  "marks": {
    "Maths": 95,
    "Physics": 88,
    "CS": 97
  },
  "passed": true,
  "address": null,
  "hobbies": [
    "chess",
    "coding",
    "reading"
  ]
}

Name : Priya Kapoor
CS   : 97
Hobbies: ['chess', 'coding', 'reading']
Type check — marks is: <class 'dict'>

=== API Data ===
Total students: 3
Top scorer: Sneha with 94

Compact: {"debug":false,"port":8080,"host":"localhost"}
Pretty:
{
    "debug": false,
    "host": "localhost",
    "port": 8080
}

Custom encode: {"title": "Python Exam", "date": "2026-06-15"}`,
    notes: [
      `json.loads() vs json.load(): loads() takes a STRING, load() takes a FILE OBJECT. A very common beginner mistake is mixing them up.`,
      `json.dumps() returns a STRING. To write JSON to a file use json.dump() (without the 's'), not json.dumps().`,
      `All JSON keys are strings. After parsing, data["42"] and data[42] are different keys — always use strings.`,
    ],
    practice: {
      title: 'Student Grade Book (JSON)',
      description: `Build a grade book: (1) Create a list of 5 student dicts (name, roll, subjects: {subject: marks}). (2) Serialise to a pretty-printed JSON string and print it. (3) Parse it back and compute each student's average. (4) Add an "average" key to each student dict and serialise again. (5) Find the overall topper.`,
      startCode: ``,
      hint: `json.dumps(data, indent=2) then json.loads(json_str). For average: sum(s["subjects"].values()) / len(s["subjects"]). Topper: max(students, key=lambda s: s["average"]).`,
      solution: `import json

students = [
    {"name": "Arjun",  "roll": 1, "subjects": {"Maths": 88, "Physics": 82, "CS": 95}},
    {"name": "Priya",  "roll": 2, "subjects": {"Maths": 95, "Physics": 91, "CS": 97}},
    {"name": "Rahul",  "roll": 3, "subjects": {"Maths": 72, "Physics": 68, "CS": 80}},
    {"name": "Sneha",  "roll": 4, "subjects": {"Maths": 90, "Physics": 85, "CS": 93}},
    {"name": "Vikram", "roll": 5, "subjects": {"Maths": 60, "Physics": 74, "CS": 70}},
]

json_str = json.dumps(students, indent=2)
print("=== JSON ===")
print(json_str[:200], "...")

parsed = json.loads(json_str)
for s in parsed:
    marks = s["subjects"].values()
    s["average"] = round(sum(marks) / len(marks), 2)

updated_json = json.dumps(parsed, indent=2)
print("\n=== With Averages ===")
for s in parsed:
    print(f"  {s['name']}: {s['average']}")

topper = max(parsed, key=lambda s: s["average"])
print(f"\nTopper: {topper['name']} ({topper['average']})")`,
    },
  },

  // ─── Design Patterns ─────────────────────────────────────────────────────────
  {
    id: 'py-design-patterns',
    category: 'Object-Oriented Python',
    title: 'Design Patterns in Python',
    difficulty: 'Advanced',
    theory: [
      `Design patterns are proven, reusable solutions to commonly recurring software design problems. They are not copy-paste code — they are blueprints you adapt to your context.`,
      `Creational patterns control object creation: Singleton (only one instance ever), Factory (create objects without specifying exact class), Builder (construct complex objects step by step).`,
      `Structural patterns organize code: Decorator (add behaviour dynamically — Python has native @decorator syntax for this), Adapter (make incompatible interfaces work together), Facade (simple interface over a complex subsystem).`,
      `Behavioural patterns define communication: Observer/Event (notify subscribers when state changes), Strategy (swap algorithms at runtime), Command (encapsulate actions as objects for undo/redo queues).`,
    ],
    syntax: `# Singleton
class DB:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Observer
class EventBus:
    def __init__(self): self._subs = {}
    def subscribe(self, event, fn): ...
    def publish(self, event, data): ...`,
    code: `# ─── 1. SINGLETON — one database connection ──────────────────
class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.connected = False
            cls._instance.queries = 0
        return cls._instance

    def connect(self, host):
        self.connected = True
        self.host = host
        print(f"Connected to {host}")

    def query(self, sql):
        self.queries += 1
        return f"Result of: {sql}"

db1 = DatabaseConnection()
db2 = DatabaseConnection()
db1.connect("localhost:5432")
print(f"Same instance? {db1 is db2}")    # True!
db2.query("SELECT * FROM students")
print(f"Total queries (via db1): {db1.queries}")  # 1 — shared state!

# ─── 2. FACTORY — create shapes without knowing class ─────────
class Circle:
    def __init__(self, r): self.r = r
    def area(self): return 3.14159 * self.r ** 2
    def __repr__(self): return f"Circle(r={self.r})"

class Rectangle:
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self): return self.w * self.h
    def __repr__(self): return f"Rectangle({self.w}x{self.h})"

class Triangle:
    def __init__(self, b, h): self.b, self.h = b, h
    def area(self): return 0.5 * self.b * self.h
    def __repr__(self): return f"Triangle(b={self.b},h={self.h})"

def shape_factory(kind, **kwargs):
    registry = {"circle": Circle, "rectangle": Rectangle, "triangle": Triangle}
    cls = registry.get(kind.lower())
    if cls is None:
        raise ValueError(f"Unknown shape: {kind}")
    return cls(**kwargs)

print("\n=== Factory ===")
shapes = [
    shape_factory("circle", r=5),
    shape_factory("rectangle", w=4, h=6),
    shape_factory("triangle", b=3, h=8),
]
for s in shapes:
    print(f"  {s}  area={s.area():.2f}")

# ─── 3. OBSERVER — event notification system ──────────────────
class EventBus:
    def __init__(self):
        self._subscribers: dict = {}

    def subscribe(self, event: str, callback):
        self._subscribers.setdefault(event, []).append(callback)

    def publish(self, event: str, **data):
        for cb in self._subscribers.get(event, []):
            cb(**data)

bus = EventBus()

def on_login(username, ip):
    print(f"  [SecurityLog] Login: {username} from {ip}")

def on_login_welcome(username, **_):
    print(f"  [Welcome] Hello, {username}!")

def on_purchase(item, price, **_):
    print(f"  [Inventory] Reserved: {item} (₹{price})")

bus.subscribe("user.login", on_login)
bus.subscribe("user.login", on_login_welcome)
bus.subscribe("purchase", on_purchase)

print("\n=== Observer ===")
bus.publish("user.login", username="arjun42", ip="10.0.0.1")
bus.publish("purchase", item="Python Book", price=499)

# ─── 4. STRATEGY — swap sort algorithm at runtime ─────────────
from typing import Callable, List

def bubble(data: List[int]) -> List[int]:
    a = data[:]
    for i in range(len(a)):
        for j in range(len(a)-i-1):
            if a[j] > a[j+1]: a[j], a[j+1] = a[j+1], a[j]
    return a

class Sorter:
    def __init__(self, strategy: Callable[[List[int]], List[int]]):
        self.strategy = strategy

    def sort(self, data): return self.strategy(data)

data = [5, 2, 8, 1, 9]
print("\n=== Strategy ===")
s1 = Sorter(bubble)
s2 = Sorter(sorted)          # swap to Python built-in
print("Bubble:", s1.sort(data))
print("Builtin:", s2.sort(data))`,
    output: `Connected to localhost:5432
Same instance? True
Total queries (via db1): 1

=== Factory ===
  Circle(r=5)  area=78.54
  Rectangle(4x6)  area=24.00
  Triangle(b=3,h=8)  area=12.00

=== Observer ===
  [SecurityLog] Login: arjun42 from 10.0.0.1
  [Welcome] Hello, arjun42!
  [Inventory] Reserved: Python Book (₹499)

=== Strategy ===
Bubble: [1, 2, 5, 8, 9]
Builtin: [1, 2, 5, 8, 9]`,
    notes: [
      `Python's @decorator syntax is a native implementation of the Decorator pattern. functools.wraps preserves the original function's metadata.`,
      `Singleton can cause problems in testing — every test shares the same instance. Use dependency injection instead where testability matters.`,
      `Don't force patterns where they don't fit — over-engineering is a real cost. Apply a pattern only when it genuinely solves a recurring problem.`,
    ],
    practice: {
      title: 'Plugin System with Factory + Observer',
      description: `Build a small plugin system: (1) A PluginRegistry (Singleton) that stores plugin classes by name. (2) A plugin_factory(name) function that creates instances. (3) An EventBus where plugins can subscribe to "data.received". Create two plugins: LoggerPlugin (prints received data) and ValidatorPlugin (checks data is non-empty). Register both, publish a "data.received" event, and show both respond.`,
      startCode: ``,
      hint: `PluginRegistry uses __new__ pattern. plugin_factory looks up the class by name. EventBus.subscribe takes event name + callback. Each plugin's __init__ subscribes itself to the bus.`,
      solution: `class PluginRegistry:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._plugins = {}
        return cls._instance

    def register(self, name, cls): self._plugins[name] = cls
    def create(self, name, *args, **kw): return self._plugins[name](*args, **kw)

registry = PluginRegistry()

class EventBus:
    def __init__(self): self._subs = {}
    def subscribe(self, ev, fn): self._subs.setdefault(ev, []).append(fn)
    def publish(self, ev, **data):
        for fn in self._subs.get(ev, []): fn(**data)

bus = EventBus()

class LoggerPlugin:
    def __init__(self): bus.subscribe("data.received", self.on_data)
    def on_data(self, payload, **_): print(f"[Logger] Received: {payload!r}")

class ValidatorPlugin:
    def __init__(self): bus.subscribe("data.received", self.on_data)
    def on_data(self, payload, **_):
        ok = bool(payload)
        print(f"[Validator] {'Valid' if ok else 'INVALID — empty payload'}")

registry.register("logger", LoggerPlugin)
registry.register("validator", ValidatorPlugin)

registry.create("logger")
registry.create("validator")

bus.publish("data.received", payload="Hello World")
bus.publish("data.received", payload="")`,
    },
  },

  // ─── Mini Project: Text Analyzer ──────────────────────────────────────────────
  {
    id: 'py-project-text-analyzer',
    category: 'Mini Projects',
    title: 'Mini Project: Text Analyzer',
    difficulty: 'Intermediate',
    theory: [
      `This mini project builds a complete text analysis tool that processes any piece of text and produces meaningful statistics — combining strings, collections, regex, and sorting in one practical program.`,
      `You will compute: word count, unique word count, character count, sentence count, average word length, most common words, reading time estimate, and a character frequency analysis.`,
      `Real-world relevance: text analysis is the foundation of NLP (Natural Language Processing). Companies like Google, Amazon, and every search engine use versions of exactly this logic at massive scale.`,
    ],
    code: `import re
from collections import Counter
import string

def analyze_text(text: str) -> dict:
    """Comprehensive text analysis."""

    # ── Basic counts ────────────────────────────────────────────
    chars_total     = len(text)
    chars_no_spaces = len(text.replace(" ", ""))

    # ── Words ───────────────────────────────────────────────────
    words_raw = re.findall(r"[a-zA-Z']+", text.lower())
    words_clean = [w.strip("'") for w in words_raw if w.strip("'")]
    word_count   = len(words_clean)
    unique_words = set(words_clean)
    unique_count = len(unique_words)
    avg_len      = sum(len(w) for w in words_clean) / word_count if word_count else 0

    # ── Sentences ───────────────────────────────────────────────
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    sentence_count = len(sentences)
    avg_words_per_sentence = word_count / sentence_count if sentence_count else 0

    # ── Frequency ───────────────────────────────────────────────
    stopwords = {"the","a","an","is","it","in","of","and","to","for",
                 "on","with","at","by","from","that","this","was","are"}
    meaningful = [w for w in words_clean if w not in stopwords and len(w) > 2]
    top_words  = Counter(meaningful).most_common(8)

    # ── Reading time (avg 200 wpm) ───────────────────────────────
    read_secs = (word_count / 200) * 60
    read_time = f"{int(read_secs // 60)}m {int(read_secs % 60)}s"

    # ── Letter frequency ─────────────────────────────────────────
    letters = [c.lower() for c in text if c.isalpha()]
    letter_freq = Counter(letters).most_common(5)

    return {
        "chars_total":          chars_total,
        "chars_no_spaces":      chars_no_spaces,
        "word_count":           word_count,
        "unique_count":         unique_count,
        "sentence_count":       sentence_count,
        "avg_word_length":      round(avg_len, 2),
        "avg_words_per_sentence": round(avg_words_per_sentence, 1),
        "top_words":            top_words,
        "reading_time":         read_time,
        "top_letters":          letter_freq,
    }

def print_report(title: str, text: str):
    stats = analyze_text(text)
    print(f"\\n{'='*50}")
    print(f"  ANALYSIS: {title}")
    print(f"{'='*50}")
    print(f"  Characters   : {stats['chars_total']:,} total / {stats['chars_no_spaces']:,} without spaces")
    print(f"  Words        : {stats['word_count']:,} total / {stats['unique_count']:,} unique")
    print(f"  Sentences    : {stats['sentence_count']}")
    print(f"  Avg word len : {stats['avg_word_length']} chars")
    print(f"  Words/sentence: {stats['avg_words_per_sentence']}")
    print(f"  Reading time : {stats['reading_time']}")
    print(f"  Top letters  : {', '.join(f'{l}={c}' for l, c in stats['top_letters'])}")
    print(f"\\n  Top words:")
    for word, count in stats["top_words"]:
        bar = "█" * count
        print(f"    {word:<15} {bar} ({count})")


# ── Demo ────────────────────────────────────────────────────────
sample = """
Python is a versatile programming language that is widely used in
data science, web development, automation, and artificial intelligence.
Python's simple syntax makes it easy to learn for beginners. At the same
time, Python is powerful enough for professional developers. Python code
is readable and clean. Many top companies use Python for their most
critical systems. Python will continue to grow in popularity.
"""

print_report("Python Description", sample)`,
    output: `==================================================
  ANALYSIS: Python Description
==================================================
  Characters   : 418 total / 343 without spaces
  Words        : 70 total / 52 unique
  Sentences    : 6
  Avg word len : 6.47 chars
  Words/sentence: 11.7
  Reading time : 0m 21s
  Top letters  : t=42, o=29, n=28, e=26, i=23

  Top words:
    python          ███████ (7)
    simple          █ (1)
    versatile       █ (1)
    programming     █ (1)
    language        ██ (2)
    widely          █ (1)
    data            █ (1)
    science         █ (1)`,
    notes: [
      `Re.findall(r"[a-zA-Z']+", text) is more reliable than text.split() because it handles punctuation attached to words like "don't" or "Python."`,
      `Removing stopwords before counting frequencies gives far more meaningful results — otherwise "the" and "is" dominate every text.`,
      `This project can be extended with sentiment analysis (positive/negative word lists), Flesch readability score, or n-gram extraction.`,
    ],
    practice: {
      title: 'Extend with Paragraph & Lexical Diversity',
      description: `Extend the analyze_text function to also return: "paragraph_count" (count blocks separated by blank lines), "lexical_diversity" (unique_words / total_words as a 0–1 ratio rounded to 3 dp — a measure of vocabulary richness), and "longest_word" (the longest word in the text). Test it on the sample text and print the three new stats.`,
      startCode: ``,
      hint: `Paragraphs: len([p for p in text.split("\\n\\n") if p.strip()]). Lexical diversity: unique_count / word_count. Longest word: max(words_clean, key=len).`,
      solution: `import re
from collections import Counter

def analyze_text_v2(text: str) -> dict:
    words_raw = re.findall(r"[a-zA-Z']+", text.lower())
    words = [w.strip("'") for w in words_raw if w.strip("'")]
    unique = set(words)
    paragraphs = [p for p in text.split("\\n\\n") if p.strip()]
    return {
        "word_count":       len(words),
        "unique_count":     len(unique),
        "paragraph_count":  len(paragraphs),
        "lexical_diversity": round(len(unique)/len(words), 3) if words else 0,
        "longest_word":     max(words, key=len) if words else "",
    }

sample = """
Python is a versatile programming language.

Python is used in data science and web development.
Many top companies use Python daily.
"""
stats = analyze_text_v2(sample)
print(f"Paragraphs      : {stats['paragraph_count']}")
print(f"Lexical diversity: {stats['lexical_diversity']}")
print(f"Longest word    : {stats['longest_word']}")`,
    },
  },

  // ─── Mini Project: CLI Todo App ───────────────────────────────────────────────
  {
    id: 'py-project-todo-cli',
    category: 'Mini Projects',
    title: 'Mini Project: CLI Todo App',
    difficulty: 'Intermediate',
    theory: [
      `This project builds a full command-line Todo application that persists tasks to a JSON file — pulling together functions, JSON, pathlib, dataclasses, and user interaction patterns.`,
      `Features: add a task, list all tasks, mark a task complete, delete a task, save/load from disk. The data model uses a dataclass for clean, self-documenting task objects.`,
      `This pattern — a simple CLI tool that reads/writes structured JSON data — is the foundation of countless real tools: task runners, configuration managers, and developer utilities.`,
    ],
    code: `import json
import datetime
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import List, Optional

# ─── Data model ───────────────────────────────────────────────
@dataclass
class Task:
    id:        int
    title:     str
    done:      bool = False
    priority:  str  = "medium"   # low / medium / high
    created:   str  = field(default_factory=lambda: datetime.date.today().isoformat())

# ─── Persistence ──────────────────────────────────────────────
DATA_FILE = Path("todos.json")

def load_tasks() -> List[Task]:
    if not DATA_FILE.exists():
        return []
    raw = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    return [Task(**t) for t in raw]

def save_tasks(tasks: List[Task]):
    DATA_FILE.write_text(
        json.dumps([asdict(t) for t in tasks], indent=2),
        encoding="utf-8"
    )

# ─── Operations ───────────────────────────────────────────────
def add_task(title: str, priority: str = "medium") -> Task:
    tasks = load_tasks()
    next_id = max((t.id for t in tasks), default=0) + 1
    task = Task(id=next_id, title=title, priority=priority)
    tasks.append(task)
    save_tasks(tasks)
    return task

def list_tasks(filter_done: Optional[bool] = None) -> List[Task]:
    tasks = load_tasks()
    if filter_done is not None:
        tasks = [t for t in tasks if t.done == filter_done]
    priority_order = {"high": 0, "medium": 1, "low": 2}
    return sorted(tasks, key=lambda t: (t.done, priority_order.get(t.priority, 1)))

def complete_task(task_id: int) -> bool:
    tasks = load_tasks()
    for t in tasks:
        if t.id == task_id:
            t.done = True
            save_tasks(tasks)
            return True
    return False

def delete_task(task_id: int) -> bool:
    tasks = load_tasks()
    new_tasks = [t for t in tasks if t.id != task_id]
    if len(new_tasks) == len(tasks):
        return False
    save_tasks(new_tasks)
    return True

def print_tasks(tasks: List[Task]):
    if not tasks:
        print("  (no tasks)")
        return
    priority_icons = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    for t in tasks:
        status = "✅" if t.done else "⬜"
        icon   = priority_icons.get(t.priority, "⚪")
        strike = "~~" if t.done else ""
        print(f"  [{t.id:3}] {status} {icon}  {strike}{t.title}{strike}  ({t.created})")

# ─── Demo run ─────────────────────────────────────────────────
print("=== Todo App Demo ===\n")

# Add tasks
add_task("Finish Python assignment", priority="high")
add_task("Read Chapter 5 of NCERT",  priority="high")
add_task("Practice 10 coding problems", priority="medium")
add_task("Email teacher for doubt",  priority="low")
add_task("Revise OOP concepts",      priority="medium")

print("All tasks after adding:")
print_tasks(list_tasks())

# Complete and delete
complete_task(2)
complete_task(4)
delete_task(3)

print("\nAfter completing #2, #4 and deleting #3:")
print_tasks(list_tasks())

print("\nPending tasks only:")
print_tasks(list_tasks(filter_done=False))

print("\nCompleted tasks only:")
print_tasks(list_tasks(filter_done=True))

# Show saved JSON
if DATA_FILE.exists():
    print(f"\nSaved to {DATA_FILE}:")
    print(DATA_FILE.read_text(encoding="utf-8")[:300], "...")
    DATA_FILE.unlink()  # cleanup`,
    output: `=== Todo App Demo ===

All tasks after adding:
  [  1] ⬜ 🔴  Finish Python assignment  (2026-05-22)
  [  2] ⬜ 🔴  Read Chapter 5 of NCERT  (2026-05-22)
  [  3] ⬜ 🟡  Practice 10 coding problems  (2026-05-22)
  [  5] ⬜ 🟡  Revise OOP concepts  (2026-05-22)
  [  4] ⬜ 🟢  Email teacher for doubt  (2026-05-22)

After completing #2, #4 and deleting #3:
  [  1] ⬜ 🔴  Finish Python assignment  (2026-05-22)
  [  5] ⬜ 🟡  Revise OOP concepts  (2026-05-22)
  [  2] ✅ 🔴  ~~Read Chapter 5 of NCERT~~  (2026-05-22)
  [  4] ✅ 🟢  ~~Email teacher for doubt~~  (2026-05-22)

Pending tasks only:
  [  1] ⬜ 🔴  Finish Python assignment  (2026-05-22)
  [  5] ⬜ 🟡  Revise OOP concepts  (2026-05-22)

Completed tasks only:
  [  2] ✅ 🔴  ~~Read Chapter 5 of NCERT~~  (2026-05-22)
  [  4] ✅ 🟢  ~~Email teacher for doubt~~  (2026-05-22)

Saved to todos.json:
[
  {
    "id": 1,
    "title": "Finish Python assignment",
    "done": false,
    "priority": "high",
    "created": "2026-05-22"
  }, ...`,
    notes: [
      `dataclasses.asdict() converts a dataclass to a plain dict — essential for JSON serialisation. The reverse is Task(**dict) to reconstruct from a dict.`,
      `Path.exists() before read prevents FileNotFoundError on first run. write_text() atomically creates-or-overwrites the file.`,
      `This project can be extended with: argparse for a real CLI (python todo.py add "Task title"), due dates, tags, and a TUI with the rich library.`,
    ],
    practice: {
      title: 'Add Due Dates & Overdue Detection',
      description: `Extend the Task dataclass with an optional due_date: str field (ISO format "YYYY-MM-DD", default None). Add a function overdue_tasks() that returns all incomplete tasks whose due date is before today. Add a task with a past due date, a future due date, and no due date — then print which ones are overdue.`,
      startCode: ``,
      hint: `due_date: Optional[str] = None in the dataclass. In overdue_tasks: filter where t.due_date is not None and not t.done and datetime.date.fromisoformat(t.due_date) < datetime.date.today().`,
      solution: `import json, datetime
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import List, Optional

@dataclass
class Task:
    id:       int
    title:    str
    done:     bool = False
    priority: str  = "medium"
    created:  str  = field(default_factory=lambda: datetime.date.today().isoformat())
    due_date: Optional[str] = None

DATA_FILE = Path("todos_v2.json")

def save_tasks(tasks):
    DATA_FILE.write_text(json.dumps([asdict(t) for t in tasks], indent=2))

def load_tasks():
    if not DATA_FILE.exists(): return []
    return [Task(**t) for t in json.loads(DATA_FILE.read_text())]

def add_task(title, priority="medium", due_date=None):
    tasks = load_tasks()
    nid = max((t.id for t in tasks), default=0) + 1
    task = Task(id=nid, title=title, priority=priority, due_date=due_date)
    tasks.append(task); save_tasks(tasks); return task

def overdue_tasks():
    today = datetime.date.today()
    return [t for t in load_tasks()
            if t.due_date and not t.done
            and datetime.date.fromisoformat(t.due_date) < today]

add_task("Past assignment", due_date="2025-01-01")
add_task("Future exam",     due_date="2026-12-31")
add_task("No deadline")

print("Overdue tasks:")
for t in overdue_tasks():
    print(f"  [{t.id}] {t.title} (due {t.due_date})")

DATA_FILE.unlink()`,
    },
  },
];
