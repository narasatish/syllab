/**
 * SkillsLab.tsx — /skills-lab
 * Interactive skills learning page: Python, SQL, AI Basics, Data Analytics,
 * Aptitude, Mini Projects. Uses AI coding feedback from the backend.
 */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Brain,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Lightbulb,
  Loader2,
  Play,
  Send,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { getCodingFeedback, CodingFeedback } from '../lib/api';

/* ─── Data ─── */

interface SkillTrack {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  description: string;
  lessons: SkillLesson[];
}

interface SkillLesson {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  theory: string;
  codeExample?: string;
  challenge?: string;
  language?: string;
}

const SKILL_TRACKS: SkillTrack[] = [
  {
    id: 'python',
    name: 'Python Basics',
    emoji: '🐍',
    color: '#3b82f6',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-100',
    description: 'Learn Python from scratch — variables, loops, functions, and real projects.',
    lessons: [
      {
        id: 'py-1',
        title: 'Variables & Data Types',
        level: 'Beginner',
        duration: '10 min',
        language: 'python',
        theory: `In Python, variables store data. You don't need to declare the type — Python figures it out automatically!

Types you'll use most:
• int — whole numbers (age = 16)
• float — decimal numbers (pi = 3.14)
• str — text ("Hello India!")
• bool — True or False
• list — ordered collection [1, 2, 3]`,
        codeExample: `# Variables in Python
name = "Arjun"
age = 16
marks = 95.5
is_topper = True

print("Name:", name)
print("Age:", age)
print("Marks:", marks)
print("Is topper?", is_topper)

# List example
subjects = ["Maths", "Science", "English"]
print("Subjects:", subjects)
print("First subject:", subjects[0])`,
        challenge: `Write a Python program that:
1. Stores your name, class (e.g., 10), and favourite subject
2. Creates a list of 3 subjects you study
3. Prints all this information neatly`,
      },
      {
        id: 'py-2',
        title: 'Loops & Conditions',
        level: 'Beginner',
        duration: '12 min',
        language: 'python',
        theory: `Loops repeat code. Conditions make decisions.

if/elif/else: Run different code based on conditions.
for loop: Repeat for each item in a list.
while loop: Repeat while a condition is True.

Think of it like: "If it rains, carry umbrella. Otherwise, don't."`,
        codeExample: `# Conditions
marks = 85
if marks >= 90:
    grade = "A+"
elif marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
else:
    grade = "C"
print("Grade:", grade)

# For loop
subjects = ["Maths", "Science", "English"]
for subject in subjects:
    print("Studying:", subject)

# While loop
count = 1
while count <= 5:
    print("Count:", count)
    count += 1`,
        challenge: `Write a Python program that:
1. Creates a list of 5 numbers
2. Uses a for loop to print each number
3. Uses if/else to print "Even" or "Odd" for each number`,
      },
      {
        id: 'py-3',
        title: 'Functions',
        level: 'Intermediate',
        duration: '15 min',
        language: 'python',
        theory: `Functions are reusable blocks of code. Think of them like a recipe — you write it once and use it many times!

def function_name(parameters):
    # code
    return result

Functions help:
✅ Avoid repeating code
✅ Organize your program
✅ Make code reusable`,
        codeExample: `# Simple function
def greet(name):
    return f"Hello, {name}! Welcome to Syllab!"

print(greet("Priya"))
print(greet("Rahul"))

# Function with calculation
def calculate_percentage(marks, total):
    return (marks / total) * 100

percentage = calculate_percentage(450, 500)
print(f"Percentage: {percentage}%")

# Function with default parameter
def study_time(hours=2):
    print(f"Study for {hours} hours today!")

study_time()       # Uses default: 2 hours
study_time(4)      # Override to 4 hours`,
        challenge: `Write a Python function called calculate_grade(marks) that:
1. Takes marks (out of 100) as input
2. Returns "A+" for 90+, "A" for 80+, "B" for 70+, "C" for 60+, "F" for below 60
3. Test it with at least 3 different mark values`,
      },
    ],
  },
  {
    id: 'sql',
    name: 'SQL & Databases',
    emoji: '🗄️',
    color: '#f59e0b',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-100',
    description: 'Learn SQL to store, retrieve and analyze data from databases.',
    lessons: [
      {
        id: 'sql-1',
        title: 'What is a Database?',
        level: 'Beginner',
        duration: '8 min',
        language: 'sql',
        theory: `A database is like a giant organized filing cabinet for data.

SQL (Structured Query Language) is the language used to talk to databases.

Key concepts:
• Table — like a spreadsheet with rows and columns
• Row — one record (e.g., one student)
• Column — one field (e.g., name, marks, class)
• Primary Key — unique ID for each row`,
        codeExample: `-- Create a students table
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    class INT,
    marks FLOAT,
    city VARCHAR(30)
);

-- Insert data
INSERT INTO students VALUES (1, 'Arjun', 10, 95.5, 'Delhi');
INSERT INTO students VALUES (2, 'Priya', 11, 88.0, 'Mumbai');
INSERT INTO students VALUES (3, 'Rahul', 10, 72.3, 'Chennai');

-- Get all students
SELECT * FROM students;

-- Get only name and marks
SELECT name, marks FROM students;`,
        challenge: `Write SQL to:
1. Create a table called "books" with columns: id, title, author, price
2. Insert 3 books into the table
3. Select all books`,
      },
      {
        id: 'sql-2',
        title: 'Filtering with WHERE',
        level: 'Beginner',
        duration: '10 min',
        language: 'sql',
        theory: `WHERE clause filters the rows you want. Like using CTRL+F but smarter!

Operators:
= equal, != not equal
> greater than, < less than
>= greater than or equal
BETWEEN x AND y
LIKE '%pattern%' (for text search)
AND, OR, NOT (combine conditions)`,
        codeExample: `-- Students in Class 10
SELECT * FROM students WHERE class = 10;

-- Students with marks above 80
SELECT name, marks FROM students WHERE marks > 80;

-- Students from Delhi OR Mumbai
SELECT * FROM students WHERE city = 'Delhi' OR city = 'Mumbai';

-- Students with marks between 70 and 90
SELECT * FROM students WHERE marks BETWEEN 70 AND 90;

-- Students whose name starts with 'A'
SELECT * FROM students WHERE name LIKE 'A%';

-- Order by marks (highest first)
SELECT name, marks FROM students ORDER BY marks DESC;`,
        challenge: `Using the students table, write SQL to:
1. Find all students with marks above 85
2. Find all students from Chennai OR Delhi
3. Order all students by their marks from lowest to highest`,
      },
    ],
  },
  {
    id: 'ai-basics',
    name: 'AI Basics',
    emoji: '🤖',
    color: '#8b5cf6',
    bgClass: 'bg-violet-50',
    textClass: 'text-violet-600',
    borderClass: 'border-violet-100',
    description: 'Understand how AI works — ML, neural networks, prompts, and real applications.',
    lessons: [
      {
        id: 'ai-1',
        title: 'What is Artificial Intelligence?',
        level: 'Beginner',
        duration: '8 min',
        theory: `AI (Artificial Intelligence) means making computers think and learn like humans.

Types of AI:
🔵 Narrow AI — Does ONE thing well (like Siri, Google Maps, Netflix recommendations)
🟡 General AI — Does ANYTHING a human can (not yet achieved!)
🔴 Super AI — Smarter than all humans (science fiction for now)

How does AI learn?
→ Machine Learning: Feed the computer millions of examples
→ It finds patterns and makes predictions
→ Like how you learned to recognize dogs by seeing thousands of dogs!`,
      },
      {
        id: 'ai-2',
        title: 'Machine Learning Basics',
        level: 'Beginner',
        duration: '12 min',
        theory: `Machine Learning (ML) = computers learning from data without being explicitly programmed.

3 Types of ML:
1. Supervised Learning — Learn from labeled examples
   Example: "This email is spam / not spam" → computer learns to filter spam

2. Unsupervised Learning — Find hidden patterns in unlabeled data
   Example: Group customers by buying habits

3. Reinforcement Learning — Learn by trial and error
   Example: AI learns to play chess by playing millions of games

Real examples in India:
🚗 Ola/Uber surge pricing (predicts demand)
🎵 Spotify recommendations
🏦 Bank fraud detection
📱 Face ID on your phone`,
      },
      {
        id: 'ai-3',
        title: 'Prompt Engineering',
        level: 'Intermediate',
        duration: '10 min',
        theory: `Prompt Engineering = the skill of talking to AI effectively!

A prompt is what you type to an AI (like ChatGPT, Gemini, Syllab AI).

Bad prompt: "tell me about maths"
Good prompt: "Explain the Pythagorean theorem for a Class 10 student with a real-world example"

Techniques:
✅ Be specific — include context, audience, format
✅ Give examples — "like this: ..."
✅ Set the role — "You are a teacher..."
✅ Ask for format — "Give 5 bullet points"
✅ Iterate — refine your prompt based on output

Practice: Try these prompts in Syllab AI Tutor!`,
      },
    ],
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    emoji: '📊',
    color: '#10b981',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-100',
    description: 'Analyze data, find insights, and visualize information like a data scientist.',
    lessons: [
      {
        id: 'da-1',
        title: 'Data Analytics Fundamentals',
        level: 'Beginner',
        duration: '10 min',
        theory: `Data Analytics = the science of examining raw data to find useful insights.

The Analytics Process:
1. Collect Data → (surveys, sensors, websites)
2. Clean Data → fix errors, missing values
3. Analyze Data → find patterns & trends
4. Visualize Data → charts, graphs
5. Communicate Insights → present findings

Types of Analytics:
📊 Descriptive — What happened? (last year's sales)
🔮 Predictive — What will happen? (next month's sales)
💡 Prescriptive — What should we do? (increase stock by 20%)

Tools used: Python, Excel, SQL, Tableau, Power BI`,
      },
      {
        id: 'da-2',
        title: 'Statistics for Data Science',
        level: 'Beginner',
        duration: '12 min',
        language: 'python',
        theory: `Key statistics every data analyst must know:

📐 Measures of Central Tendency:
• Mean (average): sum ÷ count
• Median: middle value when sorted
• Mode: most frequently occurring value

📏 Measures of Spread:
• Range: max − min
• Standard Deviation: how spread out values are
• Variance: (Standard Deviation)²

🎯 Why it matters:
• Mean marks of class = typical performance
• High std deviation = students have very different marks
• Mode = most common score`,
        codeExample: `# Statistics in Python (no library needed!)
marks = [45, 67, 89, 72, 56, 88, 91, 45, 78, 85]

# Mean
mean = sum(marks) / len(marks)
print(f"Mean: {mean:.2f}")

# Median
sorted_marks = sorted(marks)
n = len(sorted_marks)
if n % 2 == 0:
    median = (sorted_marks[n//2 - 1] + sorted_marks[n//2]) / 2
else:
    median = sorted_marks[n//2]
print(f"Median: {median}")

# Range
print(f"Range: {max(marks) - min(marks)}")

# Count students above average
above_avg = [m for m in marks if m > mean]
print(f"Students above average: {len(above_avg)}")`,
        challenge: `Write Python code to:
1. Create a list of 10 student marks
2. Calculate and print: mean, minimum, maximum
3. Count how many students scored above 70`,
      },
    ],
  },
  {
    id: 'aptitude',
    name: 'Aptitude & Logic',
    emoji: '🧩',
    color: '#ef4444',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    borderClass: 'border-red-100',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability for competitive exams.',
    lessons: [
      {
        id: 'apt-1',
        title: 'Number Systems',
        level: 'Beginner',
        duration: '10 min',
        theory: `Number systems form the foundation of quantitative aptitude.

Key Concepts:
• Natural Numbers: 1, 2, 3, ... (counting numbers)
• Whole Numbers: 0, 1, 2, 3, ...
• Integers: ..., -2, -1, 0, 1, 2, ...
• Rational Numbers: can be written as p/q
• Irrational Numbers: π, √2 (can't be written as p/q)

Divisibility Rules (must memorize!):
÷2: last digit is even
÷3: sum of digits divisible by 3
÷4: last 2 digits divisible by 4
÷5: ends in 0 or 5
÷9: sum of digits divisible by 9
÷11: alternating sum divisible by 11

LCM & HCF:
HCF = product of common prime factors (smallest power)
LCM = product of all prime factors (largest power)
HCF × LCM = Product of two numbers`,
      },
      {
        id: 'apt-2',
        title: 'Time, Speed & Distance',
        level: 'Intermediate',
        duration: '12 min',
        theory: `Formula: Distance = Speed × Time
(D = S × T, so S = D/T, T = D/S)

Important conversions:
km/h to m/s: multiply by 5/18
m/s to km/h: multiply by 18/5

Relative Speed:
• Same direction: subtract speeds (S₁ - S₂)
• Opposite directions: add speeds (S₁ + S₂)

Trains:
• Train crosses a pole: time = train length ÷ speed
• Train crosses a platform: time = (train + platform) ÷ speed
• Two trains crossing: time = sum of lengths ÷ relative speed

Average Speed (when equal distances):
Average Speed = 2S₁S₂ ÷ (S₁ + S₂)
(NOT simple average when distances are equal!)`,
      },
      {
        id: 'apt-3',
        title: 'Logical Reasoning',
        level: 'Beginner',
        duration: '10 min',
        theory: `Logical reasoning tests your ability to think clearly and solve problems.

Types:
1. Series Completion: Find the next number/letter
   Example: 2, 4, 8, 16, ? → Answer: 32 (multiply by 2)

2. Analogies: A is to B as C is to ?
   Example: Doctor : Hospital :: Teacher : ? → School

3. Odd One Out: Which doesn't belong?
   Example: Rose, Lily, Mango, Lotus → Mango (not a flower)

4. Blood Relations: Family tree problems
   Example: A's mother's brother's son = A's cousin (maternal)

5. Direction & Distance: N, S, E, W problems
   Tip: Draw the path on paper!

6. Coding-Decoding: A=1, B=2... or reverse/shift alphabets

Practice makes perfect — solve 10 questions daily!`,
      },
    ],
  },
  {
    id: 'mini-projects',
    name: 'Mini Projects',
    emoji: '🚀',
    color: '#06b6d4',
    bgClass: 'bg-cyan-50',
    textClass: 'text-cyan-600',
    borderClass: 'border-cyan-100',
    description: 'Build real projects: grade calculator, quiz app, simple chatbot, and more.',
    lessons: [
      {
        id: 'proj-1',
        title: 'Grade Calculator',
        level: 'Beginner',
        duration: '20 min',
        language: 'python',
        theory: `Your first real Python project — a grade calculator!

This project will use:
✅ Variables to store student data
✅ Lists to hold multiple marks
✅ Functions to calculate average and grade
✅ Input/output to interact with user

Real-world use: Teachers can use this to automatically grade students!`,
        codeExample: `# Grade Calculator Project
def calculate_average(marks_list):
    return sum(marks_list) / len(marks_list)

def get_grade(average):
    if average >= 90:
        return "A+ (Outstanding)"
    elif average >= 80:
        return "A (Excellent)"
    elif average >= 70:
        return "B (Good)"
    elif average >= 60:
        return "C (Average)"
    else:
        return "F (Needs Improvement)"

# Student data
student_name = "Priya Sharma"
subjects = {
    "Mathematics": 92,
    "Science": 88,
    "English": 76,
    "Social Studies": 84,
    "Hindi": 91
}

# Calculate results
marks_list = list(subjects.values())
average = calculate_average(marks_list)
grade = get_grade(average)

# Display report card
print("=" * 40)
print(f"REPORT CARD - {student_name}")
print("=" * 40)
for subject, marks in subjects.items():
    print(f"{subject:<20} : {marks}/100")
print("-" * 40)
print(f"Average          : {average:.2f}%")
print(f"Grade            : {grade}")
print("=" * 40)`,
        challenge: `Extend the Grade Calculator to:
1. Ask for the student's name using input()
2. Ask for marks in 5 subjects using input()
3. Convert them to numbers using int() or float()
4. Calculate and display the report card`,
      },
      {
        id: 'proj-2',
        title: 'Number Guessing Game',
        level: 'Beginner',
        duration: '15 min',
        language: 'python',
        theory: `Build a fun number guessing game! The computer picks a secret number, and the player tries to guess it.

Concepts practiced:
✅ random module
✅ while loops
✅ if/elif/else conditions
✅ User input and type conversion
✅ Game logic (win/lose conditions)

This is how ALL games work at a basic level!`,
        codeExample: `import random

def play_game():
    secret = random.randint(1, 100)
    attempts = 0
    max_attempts = 7

    print("🎮 Welcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts. Good luck!")
    print()

    while attempts < max_attempts:
        attempts_left = max_attempts - attempts
        print(f"Attempts left: {attempts_left}")

        try:
            guess = int(input("Your guess: "))
        except ValueError:
            print("Please enter a valid number!")
            continue

        attempts += 1

        if guess == secret:
            print(f"🎉 Correct! You guessed it in {attempts} attempts!")
            if attempts <= 3:
                print("⭐ Amazing! You're a mind reader!")
            elif attempts <= 5:
                print("👍 Great job!")
            else:
                print("😅 Just made it!")
            return
        elif guess < secret:
            print("📈 Too low! Go higher.")
        else:
            print("📉 Too high! Go lower.")

    print(f"😔 Game over! The number was {secret}.")
    print("Better luck next time!")

play_game()`,
        challenge: `Improve the Number Guessing Game:
1. After the game ends, ask "Play again? (yes/no)"
2. If yes, restart the game
3. Keep track of total games played and total wins
4. Display win percentage at the end`,
      },
    ],
  },
];

/* ─── Code Editor ─── */
function CodeEditor({
  initialCode = '',
  language = 'python',
  challenge = '',
  onFeedbackReceived,
}: {
  initialCode?: string;
  language?: string;
  challenge?: string;
  onFeedbackReceived?: (fb: CodingFeedback) => void;
}) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<CodingFeedback | null>(null);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const fb = await getCodingFeedback({ language, code, task: challenge });
      setFeedback(fb);
      onFeedbackReceived?.(fb);
    } catch {
      setFeedback({
        score: 0,
        verdict: 'Error',
        summary: 'Could not get feedback. Check your connection.',
        strengths: [],
        improvements: ['Please try again.'],
        hint: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {challenge && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">Challenge</p>
          <p className="text-sm font-semibold text-slate-700 whitespace-pre-line">{challenge}</p>
        </div>
      )}

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 md:h-64 rounded-2xl border border-slate-200 bg-slate-900 text-green-400 font-mono text-sm p-5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 leading-relaxed"
          placeholder={`# Write your ${language} code here...`}
          spellCheck={false}
        />
        <span className="absolute top-3 right-4 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">
          {language}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
        {loading ? 'Getting AI Feedback...' : 'Submit for AI Feedback'}
      </button>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm"
          >
            {/* Score */}
            <div className="flex items-center gap-4">
              <div className={cn(
                'text-3xl font-black',
                feedback.score >= 80 ? 'text-emerald-500' :
                feedback.score >= 60 ? 'text-amber-500' : 'text-red-500'
              )}>
                {feedback.score}/100
              </div>
              <div>
                <div className={cn(
                  'text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full',
                  feedback.verdict === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
                  feedback.verdict === 'Good' ? 'bg-blue-100 text-blue-700' :
                  feedback.verdict === 'Needs Work' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                )}>
                  {feedback.verdict}
                </div>
                <p className="text-sm font-semibold text-slate-600 mt-1">{feedback.summary}</p>
              </div>
            </div>

            {/* Score bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feedback.score}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  feedback.score >= 80 ? 'bg-emerald-500' :
                  feedback.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                )}
              />
            </div>

            {/* Strengths */}
            {feedback.strengths.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">✅ Strengths</p>
                <ul className="space-y-1">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {feedback.improvements.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">💡 Improve</p>
                <ul className="space-y-1">
                  {feedback.improvements.map((imp, i) => (
                    <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hint */}
            {feedback.hint && (
              <div className="bg-violet-50 rounded-xl px-4 py-3">
                <p className="text-xs font-black uppercase tracking-widest text-violet-600 mb-1">🔮 Hint</p>
                <p className="text-sm text-slate-700 font-medium">{feedback.hint}</p>
              </div>
            )}

            {/* Corrected code */}
            {feedback.correctedCode && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Suggested Fix</p>
                <pre className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                  {feedback.correctedCode}
                </pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Lesson Card ─── */
function LessonCard({ lesson, track }: { lesson: SkillLesson; track: SkillTrack }) {
  const [expanded, setExpanded] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const levelColors = {
    Beginner: 'bg-emerald-100 text-emerald-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className={cn('rounded-2xl border bg-white shadow-sm overflow-hidden', track.borderClass)}>
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg', track.bgClass)}>
            {track.emoji}
          </div>
          <div className="min-w-0">
            <p className="font-black text-slate-900 text-sm truncate">{lesson.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn('text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full', levelColors[lesson.level])}>
                {lesson.level}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">⏱ {lesson.duration}</span>
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-slate-400 shrink-0 ml-3" />
        ) : (
          <ChevronDown size={18} className="text-slate-400 shrink-0 ml-3" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-slate-100 pt-5">
              {/* Theory */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Theory</p>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line">
                  {lesson.theory}
                </p>
              </div>

              {/* Code Example */}
              {lesson.codeExample && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Code Example</p>
                  <pre className="bg-slate-900 text-green-400 rounded-2xl p-5 text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed">
                    {lesson.codeExample}
                  </pre>
                </div>
              )}

              {/* Try It Button */}
              {lesson.challenge && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowEditor(v => !v)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all',
                      showEditor
                        ? 'bg-slate-100 text-slate-600'
                        : `${track.bgClass} ${track.textClass} hover:opacity-80`
                    )}
                  >
                    <Code2 size={14} />
                    {showEditor ? 'Hide Editor' : 'Try the Challenge'}
                  </button>

                  <AnimatePresence>
                    {showEditor && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <CodeEditor
                          initialCode={lesson.codeExample || ''}
                          language={lesson.language || 'python'}
                          challenge={lesson.challenge}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Theory-only: no code, just a mark complete */}
              {!lesson.challenge && (
                <div className={cn('rounded-xl px-4 py-3 text-xs font-semibold', track.bgClass, track.textClass)}>
                  📖 Read and understand the theory above. Take notes!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */

interface SkillsLabProps {
  setTab: (tab: string) => void;
}

export default function SkillsLab({ setTab }: SkillsLabProps) {
  const [activeTrack, setActiveTrack] = useState<string>('python');
  const track = SKILL_TRACKS.find(t => t.id === activeTrack) || SKILL_TRACKS[0];

  return (
    <div className="space-y-8 pb-12">
      <SEO
        title="Skills Lab — Python, SQL, AI, Data Analytics & Aptitude | Syllab.in"
        description="Learn Python, SQL, AI Basics, Data Analytics, Aptitude, and build Mini Projects with AI-powered feedback. Free skills lab for Class 5 to 12 students."
        url="https://syllab.in/skills-lab"
      />

      {/* Header */}
      <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl shrink-0">
            🧪
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Skills Lab</div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              21st Century Skills for Every Student
            </h1>
            <p className="text-white/70 font-semibold max-w-2xl leading-relaxed">
              Learn Python, SQL, AI, Data Analytics and Aptitude with hands-on coding challenges and instant AI feedback. Build real projects and future-proof your career!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { label: 'Skill Tracks', value: '6', emoji: '🎯' },
            { label: 'Lessons', value: `${SKILL_TRACKS.reduce((sum, t) => sum + t.lessons.length, 0)}+`, emoji: '📖' },
            { label: 'AI Feedback', value: 'Instant', emoji: '🤖' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="bg-white/10 rounded-2xl px-4 py-4 text-center">
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-lg font-black text-white">{value}</div>
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Track selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SKILL_TRACKS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTrack(t.id)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center',
              activeTrack === t.id
                ? `${t.bgClass} ${t.borderClass} shadow-sm`
                : 'bg-white border-slate-100 hover:border-slate-200'
            )}
          >
            <span className="text-2xl">{t.emoji}</span>
            <span className={cn(
              'text-[10px] font-black uppercase tracking-widest',
              activeTrack === t.id ? t.textClass : 'text-slate-500'
            )}>
              {t.name}
            </span>
          </button>
        ))}
      </div>

      {/* Active Track */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrack}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Track header */}
          <div className={cn('rounded-2xl p-6 border', track.bgClass, track.borderClass)}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{track.emoji}</span>
              <div>
                <h2 className={cn('text-xl font-black', track.textClass)}>{track.name}</h2>
                <p className="text-sm font-semibold text-slate-600 mt-1">{track.description}</p>
              </div>
              <div className="ml-auto text-right shrink-0">
                <div className={cn('text-2xl font-black', track.textClass)}>{track.lessons.length}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lessons</div>
              </div>
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-3">
            {track.lessons.map((lesson, idx) => (
              <LessonCard key={lesson.id} lesson={lesson} track={track} />
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-black text-slate-900 text-base">Want more advanced lessons?</p>
              <p className="text-sm text-slate-500 font-medium mt-1">Practice with our AI Tutor for personalised help on any topic.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setTab('syllabus')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-[11px] uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all"
              >
                <BookOpenIcon size={14} />
                Syllabus
              </button>
              <button
                onClick={() => setTab('tutor')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Brain size={14} />
                Ask AI Tutor
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Mini icon since lucide BookOpen is already imported elsewhere
function BookOpenIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
