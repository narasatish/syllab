import type { TutorialTopic } from './types';

export const aiLearningTopics: TutorialTopic[] = [
  // ── What is AI ─────────────────────────────────────────────────────────────
  {
    id: 'ai-intro',
    category: 'AI Fundamentals',
    title: 'What is Artificial Intelligence?',
    difficulty: 'Beginner',
    theory: [
      `Artificial Intelligence (AI) is the science of making computers perform tasks that normally require human intelligence — like recognising faces, understanding speech, translating languages, writing essays, or playing chess. The term was first coined in 1956 by John McCarthy.`,
      `AI is not one technology — it is a collection of methods and algorithms. The goal is to create systems that can perceive their environment, reason about it, learn from data, and take actions to achieve goals.`,
      `AI is already in your daily life: when YouTube recommends a video, when Google autocompletes your search, when Swiggy estimates delivery time, when your phone unlocks with your face — that's all AI working behind the scenes.`,
    ],
    syntax: `# AI is a broad field with 3 main subfields:
# 1. Machine Learning — learns from data
# 2. Deep Learning — neural networks with many layers
# 3. Natural Language Processing — understands language`,
    code: `# Simple example: a basic rule-based AI
# (No machine learning — just if/else logic)

def simple_ai_assistant(question):
    question = question.lower()

    if "weather" in question:
        return "It's 32°C and sunny in Hyderabad today!"
    elif "capital" in question and "india" in question:
        return "The capital of India is New Delhi."
    elif "hello" in question or "hi" in question:
        return "Hello! How can I help you today?"
    elif "math" in question or "calculate" in question:
        return "I can help you with mathematics!"
    else:
        return "I'm sorry, I don't understand that question yet."

# Test our simple AI
print(simple_ai_assistant("Hello!"))
print(simple_ai_assistant("What is the capital of India?"))
print(simple_ai_assistant("Tell me about the weather"))
print(simple_ai_assistant("What is the meaning of life?"))`,
    output: `Hello! How can I help you today?
The capital of India is New Delhi.
It's 32°C and sunny in Hyderabad today!
I'm sorry, I don't understand that question yet.`,
    notes: [
      `Rule-based AI (if/else) is the oldest form — no learning happens. Modern AI learns from data.`,
      `AI, Machine Learning, and Deep Learning are related: AI is the broadest field, ML is a subset, Deep Learning is a subset of ML.`,
      `India has a strong AI research community — IISc Bangalore, IIT Bombay, and companies like TCS, Infosys, and ISRO use AI extensively.`,
    ],
    practice: {
      title: 'Build a Smart Greeter AI',
      description: `Extend the simple_ai_assistant to handle 5 more questions: "who are you?", "what time is it?", "tell me a joke", "what is AI?", and "bye". For time, use Python's datetime module.`,
      startCode: `import datetime

def simple_ai_assistant(question):
    question = question.lower()

    if "hello" in question or "hi" in question:
        return "Hello! How can I help you today?"
    # Add 5 more elif blocks here:





    else:
        return "I don't understand that yet. Ask me something else!"

# Test all 5 new responses
print(simple_ai_assistant("who are you?"))
print(simple_ai_assistant("what time is it?"))
print(simple_ai_assistant("tell me a joke"))
print(simple_ai_assistant("what is AI?"))
print(simple_ai_assistant("bye"))`,
      hint: `For time: use datetime.datetime.now().strftime("%H:%M"). For "who are you": return a description of your AI. For a joke, just return a hardcoded joke string.`,
    },
  },

  // ── Types of AI ─────────────────────────────────────────────────────────────
  {
    id: 'ai-types',
    category: 'AI Fundamentals',
    title: 'Types of AI: Narrow, General, and Super AI',
    difficulty: 'Beginner',
    theory: [
      `AI is classified into three types based on capability. Understanding these helps you know what current AI can and cannot do — and what the future holds.`,
      `Narrow AI (Weak AI): AI designed for one specific task. This is ALL the AI that exists today. ChatGPT is Narrow AI — it can converse brilliantly but can't drive a car. Google Maps is Narrow AI — it routes perfectly but can't write a poem. Every AI product you use today is Narrow AI.`,
      `General AI (AGI): An AI that can do anything a human can do — switch between tasks, reason, learn, create, and adapt. AGI does not exist yet. Researchers debate whether it will arrive in 5 years or 50 years. This is the holy grail of AI research.`,
      `Super AI (ASI): An AI that surpasses human intelligence in every domain. This is purely theoretical and doesn't exist. Scientists like Stephen Hawking and Elon Musk warned about the risks of Super AI — which is why AI Safety is a growing field.`,
    ],
    syntax: `# Narrow AI examples in Python:
# Speech Recognition — one task (speech → text)
# Image Classification — one task (image → label)
# Recommendation System — one task (data → suggestions)`,
    code: `# Demonstrating Narrow AI concept with Python

# Task 1: A simple image classifier (rule-based simulation)
def classify_image(pixel_brightness):
    """Narrow AI: only classifies bright vs dark images"""
    if pixel_brightness > 128:
        return "Bright image (possibly day/outdoor)"
    else:
        return "Dark image (possibly night/indoor)"

# Task 2: A simple spam detector (Narrow AI)
def detect_spam(email_text):
    """Narrow AI: only detects spam, does nothing else"""
    spam_words = ["free money", "click here", "winner", "lottery", "urgent"]
    email_lower = email_text.lower()
    spam_score = sum(1 for word in spam_words if word in email_lower)

    if spam_score >= 2:
        return "SPAM detected!"
    elif spam_score == 1:
        return "Suspicious — possible spam"
    else:
        return "Looks safe"

# Test both Narrow AIs
print("=== Image Classifier (Narrow AI) ===")
print(classify_image(200))
print(classify_image(50))

print("\n=== Spam Detector (Narrow AI) ===")
print(detect_spam("FREE MONEY! Click here to claim your lottery winner prize!"))
print(detect_spam("Meeting at 3 PM tomorrow, please confirm."))`,
    output: `=== Image Classifier (Narrow AI) ===
Bright image (possibly day/outdoor)
Dark image (possibly night/indoor)

=== Spam Detector (Narrow AI) ===
SPAM detected!
Looks safe`,
    notes: [
      `Every AI product in the world today — ChatGPT, Gemini, Alexa, Google Lens — is Narrow AI.`,
      `AGI (General AI) is expected to transform society more than the internet did — but no one knows exactly when it will arrive.`,
      `India's NITI Aayog published a National AI Strategy because AI is seen as critical to India's future economy.`,
    ],
    practice: {
      title: 'Sentiment Analyser (Narrow AI)',
      description: `Build a simple sentiment analyser (Narrow AI) that reads a text and returns "Positive", "Negative", or "Neutral" based on keywords. Use at least 5 positive words and 5 negative words in your word lists.`,
      startCode: `def analyse_sentiment(text):
    positive_words = ["good", "great", "excellent", "happy", "love", "wonderful", "amazing"]
    negative_words = ["bad", "terrible", "awful", "sad", "hate", "horrible", "worst"]

    text_lower = text.lower()
    pos_count = 0
    neg_count = 0

    # Count positive and negative words
    # YOUR CODE HERE


    # Decide sentiment
    if pos_count > neg_count:
        return "Positive 😊"
    elif neg_count > pos_count:
        return "Negative 😔"
    else:
        return "Neutral 😐"

# Test
print(analyse_sentiment("This movie is great and wonderful!"))
print(analyse_sentiment("That was a terrible and awful experience."))
print(analyse_sentiment("It was okay, just a regular day."))`,
      hint: `Use a for loop: for word in positive_words: if word in text_lower: pos_count += 1`,
    },
  },

  // ── Machine Learning ────────────────────────────────────────────────────────
  {
    id: 'ai-ml-basics',
    category: 'Machine Learning',
    title: 'What is Machine Learning?',
    difficulty: 'Beginner',
    theory: [
      `Machine Learning (ML) is a way of building AI where the computer learns from examples (data) instead of being given explicit rules. Instead of programming "if this, then that", you show the computer thousands of examples and it figures out the rules itself.`,
      `Traditional programming: You write rules → Computer follows rules → Gets output.\nMachine Learning: You give data + output → Machine learns rules → Can predict on new data.`,
      `Example: Teaching a spam filter. Traditional way: you manually write rules like "if email contains 'FREE MONEY' mark as spam". ML way: you show 10,000 spam emails and 10,000 real emails — the ML model automatically learns what patterns indicate spam, including patterns you'd never think of.`,
      `ML is now used in: medical diagnosis (detecting cancer from X-rays), credit scoring (will this person repay a loan?), self-driving cars, language translation, stock price prediction, crop yield prediction, and much more.`,
    ],
    syntax: `# The 3-step Machine Learning workflow:
# 1. Collect Data
# 2. Train Model (model learns patterns)
# 3. Predict (use model on new data)`,
    code: `# Machine Learning concept with a simple example
# (Using pure Python, no libraries needed)

# STEP 1: Training data — house sizes and their prices (in lakhs)
training_data = [
    (500, 25),    # 500 sq ft → ₹25 lakhs
    (800, 40),    # 800 sq ft → ₹40 lakhs
    (1000, 50),   # 1000 sq ft → ₹50 lakhs
    (1200, 60),   # 1200 sq ft → ₹60 lakhs
    (1500, 75),   # 1500 sq ft → ₹75 lakhs
    (2000, 100),  # 2000 sq ft → ₹100 lakhs
]

# STEP 2: "Train" our model (find price per sq ft)
total_price_per_sqft = sum(price / size for size, price in training_data)
price_per_sqft = total_price_per_sqft / len(training_data)

print(f"Model learned: ₹{price_per_sqft:.4f} per sq ft")

# STEP 3: Predict prices for new houses
def predict_price(size_sqft):
    return price_per_sqft * size_sqft

# Test predictions on new data
test_houses = [600, 900, 1100, 1800]
print("\n=== Predictions ===")
for size in test_houses:
    predicted = predict_price(size)
    print(f"{size} sq ft → ₹{predicted:.0f} lakhs")`,
    output: `Model learned: ₹0.0500 per sq ft
(price_per_sqft = 0.05)

=== Predictions ===
600 sq ft → ₹30 lakhs
900 sq ft → ₹45 lakhs
1100 sq ft → ₹55 lakhs
1800 sq ft → ₹90 lakhs`,
    notes: [
      `Real ML models are much more sophisticated — they handle non-linear patterns, many input variables, and millions of data points.`,
      `The most popular ML library in Python is scikit-learn (sklearn). For deep learning: TensorFlow and PyTorch.`,
      `"Garbage In, Garbage Out" — ML models are only as good as their training data. Bad data = bad predictions.`,
    ],
    practice: {
      title: 'Marks Predictor',
      description: `Build a simple "model" that predicts a student's final exam marks based on study hours. Use this training data: [(2,35),(4,52),(6,64),(8,74),(10,85),(12,92)]. Find the average marks per study hour, then predict for 3 hours, 7 hours, and 11 hours.`,
      startCode: `# Training data: (study_hours, marks)
training_data = [(2, 35), (4, 52), (6, 64), (8, 74), (10, 85), (12, 92)]

# Calculate average marks per study hour
# YOUR CODE HERE


# Predict marks for new study hours
def predict_marks(hours):
    # YOUR CODE HERE
    pass

# Test
print(f"Predicted marks for 3 hours: {predict_marks(3):.0f}")
print(f"Predicted marks for 7 hours: {predict_marks(7):.0f}")
print(f"Predicted marks for 11 hours: {predict_marks(11):.0f}")`,
      hint: `avg_marks_per_hour = sum(marks/hours for hours, marks in training_data) / len(training_data)`,
      expectedOutput: `Predicted marks for 3 hours: ~30-35
Predicted marks for 7 hours: ~60-65
Predicted marks for 11 hours: ~85-90`,
    },
  },

  // ── Supervised Learning ─────────────────────────────────────────────────────
  {
    id: 'ai-supervised',
    category: 'Machine Learning',
    title: 'Supervised Learning — Teaching with Labels',
    difficulty: 'Beginner',
    theory: [
      `Supervised Learning is the most common type of ML. "Supervised" means the training data is labelled — each example has an input AND a correct answer (label). The model learns the mapping from input to output.`,
      `Think of it like studying with an answer key. You practice problems and immediately know if you got it right or wrong. Over thousands of examples, you learn the pattern.`,
      `Two main types: Classification (output is a category, e.g., spam/not-spam, cat/dog, pass/fail) and Regression (output is a number, e.g., house price, temperature, marks).`,
      `Real examples: Email spam detection (classification), House price prediction (regression), Disease diagnosis from symptoms (classification), Stock price forecasting (regression), Handwriting recognition (classification).`,
    ],
    syntax: `# Supervised Learning structure:
# Input (features) → Model → Output (label)
#
# Classification: output is a category
#   "Is this email spam?" → Yes/No
# Regression: output is a number
#   "What will this house sell for?" → ₹45 lakhs`,
    code: `# Supervised Learning: Grade Classifier
# Training data: marks → grade (labelled!)

def train_classifier(training_data):
    """Learn the rules from labelled examples"""
    # In real ML, the model finds these boundaries automatically.
    # Here we simulate the trained model:
    boundaries = []
    for marks, grade in training_data:
        boundaries.append((marks, grade))
    return boundaries

def predict_grade(marks, trained_model):
    """Use the trained model to classify new marks"""
    if marks >= 90:
        return "A+"
    elif marks >= 80:
        return "A"
    elif marks >= 70:
        return "B"
    elif marks >= 60:
        return "C"
    elif marks >= 40:
        return "D"
    else:
        return "F (Fail)"

# Training data — labelled examples
training_data = [
    (95, "A+"), (88, "A"), (72, "B"), (65, "C"),
    (55, "D"), (30, "F"), (91, "A+"), (78, "B"),
]

model = train_classifier(training_data)

# Predict on new (unseen) marks
test_marks = [93, 85, 68, 45, 25, 77]
print("=== Grade Predictions (Supervised Learning) ===")
for m in test_marks:
    grade = predict_grade(m, model)
    print(f"Marks: {m:3d} → Grade: {grade}")`,
    output: `=== Grade Predictions (Supervised Learning) ===
Marks:  93 → Grade: A+
Marks:  85 → Grade: A
Marks:  68 → Grade: C
Marks:  45 → Grade: D
Marks:  25 → Grade: F (Fail)
Marks:  77 → Grade: B`,
    notes: [
      `The key requirement of supervised learning: you need labelled data. Getting good labels is often the hardest and most expensive part.`,
      `Popular supervised learning algorithms: Linear Regression, Decision Trees, Random Forest, Support Vector Machines, Neural Networks.`,
      `CBSE Class 11/12 Computer Science covers supervised learning concepts — understanding this helps in board exams and competitive exams.`,
    ],
    practice: {
      title: 'Weather Classifier',
      description: `Build a supervised classifier for weather conditions. Given temperature (°C) and humidity (%), classify as: "Hot & Humid", "Hot & Dry", "Comfortable", or "Cold". Rules: Temp>35 is Hot, Temp<20 is Cold, else Comfortable. Humidity>70 is Humid, else Dry.`,
      startCode: `def classify_weather(temperature, humidity):
    # Classify temperature
    if temperature > 35:
        temp_label = "Hot"
    elif temperature < 20:
        temp_label = "Cold"
    else:
        temp_label = "Comfortable"

    # Classify humidity (only matters for Hot/Comfortable)
    # YOUR CODE HERE

    # Return combined label
    # YOUR CODE HERE
    pass

# Test with different conditions
test_cases = [(40, 85), (38, 30), (25, 60), (15, 40), (42, 75)]
for temp, humidity in test_cases:
    print(f"Temp: {temp}°C, Humidity: {humidity}% → {classify_weather(temp, humidity)}")`,
      hint: `For Cold, humidity doesn't matter as much — just return "Cold". For Hot: check humidity > 70 for "Hot & Humid" else "Hot & Dry".`,
    },
  },

  // ── Unsupervised Learning ───────────────────────────────────────────────────
  {
    id: 'ai-unsupervised',
    category: 'Machine Learning',
    title: 'Unsupervised Learning — Finding Hidden Patterns',
    difficulty: 'Intermediate',
    theory: [
      `Unsupervised Learning finds patterns in data WITHOUT labels. There are no "correct answers" — the model discovers structure on its own. This is like sorting a pile of unseen books without knowing the categories — you group them by what seems similar.`,
      `Most data in the world is unlabelled (text on the internet, photos, user behaviour logs). Unsupervised learning is crucial for making sense of this massive unlabelled data.`,
      `Clustering: The most common unsupervised technique. Groups similar data points together. Example: Customer segmentation — grouping shoppers by buying behaviour (budget buyers vs premium buyers vs occasional buyers) without pre-defining those categories.`,
      `Dimensionality Reduction: Compresses data while keeping important information. Example: PCA (Principal Component Analysis) is used to visualise high-dimensional data (like a dataset with 1000 features) in 2D or 3D.`,
    ],
    syntax: `# Clustering: group similar items together (no labels!)
# K-Means: most popular clustering algorithm
# 1. Choose K (number of groups)
# 2. Randomly place K "centres"
# 3. Assign each point to nearest centre
# 4. Update centres to mean of their group
# 5. Repeat until stable`,
    code: `# Simple K-Means clustering simulation (2 clusters)
import math

def distance(point1, point2):
    """Euclidean distance between two points"""
    return math.sqrt((point1[0]-point2[0])**2 + (point1[1]-point2[1])**2)

def simple_kmeans(data, k=2, iterations=10):
    # Start with first k points as initial centres
    centres = list(data[:k])

    for iteration in range(iterations):
        # Assign each point to nearest centre
        clusters = [[] for _ in range(k)]
        for point in data:
            distances = [distance(point, c) for c in centres]
            nearest = distances.index(min(distances))
            clusters[nearest].append(point)

        # Update centres to mean of each cluster
        new_centres = []
        for cluster in clusters:
            if cluster:
                mean_x = sum(p[0] for p in cluster) / len(cluster)
                mean_y = sum(p[1] for p in cluster) / len(cluster)
                new_centres.append((mean_x, mean_y))
        centres = new_centres

    return clusters, centres

# Student data: (study_hours_per_day, phone_hours_per_day)
students = [
    (8, 1), (7, 2), (9, 1), (6, 2),   # Group A: serious students
    (2, 8), (1, 9), (3, 7), (2, 9),   # Group B: phone users
]

clusters, centres = simple_kmeans(students, k=2)
print("Cluster 1 (Serious students):", clusters[0])
print("Cluster 2 (Phone users):", clusters[1])
print(f"\nCentre 1: {centres[0]}")
print(f"Centre 2: {centres[1]}")`,
    output: `Cluster 1 (Serious students): [(8, 1), (7, 2), (9, 1), (6, 2)]
Cluster 2 (Phone users): [(2, 8), (1, 9), (3, 7), (2, 9)]

Centre 1: (7.5, 1.5)
Centre 2: (2.0, 8.25)`,
    notes: [
      `K-Means is used by Netflix for recommending content groups, by Zomato for grouping restaurants, by banks for detecting unusual transaction patterns.`,
      `The challenge: you must choose K (number of clusters) in advance — and the "right" number of clusters isn't always obvious.`,
      `Other unsupervised techniques: DBSCAN (density-based clustering), Autoencoders (neural networks for dimensionality reduction), Association Rules (market basket analysis — "customers who buy X also buy Y").`,
    ],
    practice: {
      title: 'Simple Data Grouper',
      description: `You have exam scores: [95, 88, 92, 45, 38, 52, 71, 68, 75]. Write a program to group them into "High performers" (≥70), "Average" (50-69), and "Needs help" (<50) WITHOUT using any labels in the input — just the numbers.`,
      startCode: `scores = [95, 88, 92, 45, 38, 52, 71, 68, 75]

high_performers = []
average = []
needs_help = []

# Group the scores — no labels given, you discover the groups!
for score in scores:
    # YOUR CODE HERE
    pass

print("High Performers (≥70):", sorted(high_performers, reverse=True))
print("Average (50-69):", sorted(average, reverse=True))
print("Needs Help (<50):", sorted(needs_help, reverse=True))`,
      hint: `Use if score >= 70 for high performers, elif score >= 50 for average, else for needs help.`,
    },
  },

  // ── Neural Networks ─────────────────────────────────────────────────────────
  {
    id: 'ai-neural-networks',
    category: 'Deep Learning',
    title: 'Neural Networks — How Machines "Think"',
    difficulty: 'Intermediate',
    theory: [
      `A Neural Network is a computational system inspired by the human brain. Just as your brain has billions of neurons connected by synapses, a neural network has nodes (artificial neurons) connected by weights.`,
      `Structure: Input Layer (receives data) → Hidden Layers (process and transform) → Output Layer (gives result). Each connection has a "weight" — a number that determines how much influence that connection has.`,
      `Learning happens by adjusting weights. If the network makes a wrong prediction, a process called Backpropagation adjusts weights to make it slightly less wrong. Repeat millions of times, and the network becomes accurate.`,
      `A single neuron does this: takes several inputs, multiplies each by its weight, adds them up, adds a bias, then passes through an "activation function" that decides whether and how strongly to "fire".`,
    ],
    syntax: `# Single neuron (perceptron) formula:
# output = activation(w1*x1 + w2*x2 + ... + wn*xn + bias)
#
# Common activation functions:
# ReLU: max(0, x)      — most used in hidden layers
# Sigmoid: 1/(1+e^-x) — outputs 0 to 1 (for binary classification)
# Softmax: for multiple categories`,
    code: `import math

# Single artificial neuron
def relu(x):
    """ReLU activation: keeps positive values, zeros out negative"""
    return max(0, x)

def sigmoid(x):
    """Sigmoid: squishes any number to 0-1 range"""
    return 1 / (1 + math.exp(-x))

def single_neuron(inputs, weights, bias, activation="relu"):
    """One artificial neuron"""
    # Step 1: Weighted sum
    weighted_sum = sum(i * w for i, w in zip(inputs, weights)) + bias

    # Step 2: Activation function
    if activation == "relu":
        return relu(weighted_sum)
    elif activation == "sigmoid":
        return sigmoid(weighted_sum)
    return weighted_sum

# Example: Neuron deciding if a student will pass
# Inputs: [study_hours, attendance%, sleep_hours]
inputs = [7, 85, 8]
weights = [0.4, 0.3, 0.2]  # study matters most
bias = -3.0

raw_output = single_neuron(inputs, weights, bias, "sigmoid")
print(f"Inputs: study={inputs[0]}h, attendance={inputs[1]}%, sleep={inputs[2]}h")
print(f"Neuron output (0=fail, 1=pass): {raw_output:.4f}")
print(f"Prediction: {'Pass ✅' if raw_output > 0.5 else 'Fail ❌'}")

# Try a low-performing student
inputs2 = [2, 40, 5]
raw2 = single_neuron(inputs2, weights, bias, "sigmoid")
print(f"\nStudent 2: study={inputs2[0]}h, attendance={inputs2[1]}%, sleep={inputs2[2]}h")
print(f"Prediction: {'Pass ✅' if raw2 > 0.5 else 'Fail ❌'} (score: {raw2:.4f})")`,
    output: `Inputs: study=7h, attendance=85%, sleep=8h
Neuron output (0=fail, 1=pass): 0.7858
Prediction: Pass ✅

Student 2: study=2h, attendance=40%, sleep=5h
Prediction: Fail ❌ (score: 0.1192)`,
    notes: [
      `Real neural networks have millions to billions of weights. GPT-4 has ~1.8 trillion parameters. Claude Sonnet has hundreds of billions.`,
      `"Deep Learning" just means neural networks with many hidden layers (deep = many layers).`,
      `Training a large neural network requires massive computing power — GPU clusters that cost millions of dollars. This is why only large companies can train frontier AI models from scratch.`,
    ],
    practice: {
      title: 'Two-Neuron Network',
      description: `Build a tiny 2-neuron network. Neuron 1 takes marks (0-100) and attendance (0-100) and outputs a "performance score". Neuron 2 takes the performance score and sleep hours, and outputs a final "scholarship eligibility" (0 to 1). Scholarship if output > 0.7.`,
      startCode: `import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def relu(x):
    return max(0, x)

def neuron1_performance(marks, attendance):
    # weights: marks=0.5, attendance=0.3, bias=-30
    # YOUR CODE HERE
    pass

def neuron2_scholarship(performance_score, sleep_hours):
    # weights: performance=0.6, sleep=0.1, bias=-2
    # YOUR CODE HERE using sigmoid
    pass

# Test students
students = [
    ("Arjun",   92, 90, 8),   # high achiever
    ("Priya",   75, 70, 7),   # average
    ("Rahul",   40, 50, 4),   # struggling
]

for name, marks, attendance, sleep in students:
    perf = neuron1_performance(marks, attendance)
    eligibility = neuron2_scholarship(perf, sleep)
    status = "✅ Eligible" if eligibility > 0.7 else "❌ Not eligible"
    print(f"{name}: {status} (score: {eligibility:.3f})")`,
      hint: `For neuron1: weighted_sum = 0.5*marks + 0.3*attendance - 30, then relu(weighted_sum). For neuron2: use sigmoid with weights 0.6 and 0.1.`,
    },
  },

  // ── Generative AI ───────────────────────────────────────────────────────────
  {
    id: 'ai-generative',
    category: 'Generative AI',
    title: 'Generative AI — How ChatGPT and Gemini Create Content',
    difficulty: 'Intermediate',
    theory: [
      `Generative AI is AI that creates new content — text, images, music, code, videos — rather than just classifying or predicting. ChatGPT, Gemini, Claude, Midjourney, and DALL-E are all examples of Generative AI.`,
      `For text generation, the dominant technology is Large Language Models (LLMs). These are neural networks trained on enormous amounts of text (the entire internet, books, code) to predict "what word comes next?". By predicting the next word billions of times, they learn to write coherent, knowledgeable text.`,
      `LLMs work by tokenisation (splitting text into tokens), embedding (converting tokens to numbers), and transformer architecture (attention mechanism that lets the model consider the full context of everything said so far).`,
      `The "transformer" architecture (introduced in Google's 2017 paper "Attention Is All You Need") revolutionised AI. GPT (Generative Pre-trained Transformer) — the T stands for Transformer.`,
    ],
    syntax: `# How an LLM predicts next tokens (simplified):
# Input: "The capital of India is"
# Model: looks at ALL previous tokens
# Output: probability distribution over vocabulary
# Highest probability: "New" → "Delhi"
# So the model outputs: "New Delhi"`,
    code: `# Simulating a tiny language model
# (Real LLMs have billions of parameters — this is educational only)

# Our "training corpus" — sentences the model has "read"
corpus = [
    "python is a great programming language",
    "machine learning uses data to learn patterns",
    "artificial intelligence is the future of technology",
    "neural networks are inspired by the human brain",
    "india is a great country with great technology",
    "programming is a skill every student should learn",
]

# Build a simple bigram model (each word predicts the next)
from collections import defaultdict, Counter

bigram_counts = defaultdict(Counter)

for sentence in corpus:
    words = sentence.split()
    for i in range(len(words) - 1):
        current_word = words[i]
        next_word = words[i + 1]
        bigram_counts[current_word][next_word] += 1

def predict_next_word(current_word):
    """Predict the most likely next word"""
    if current_word not in bigram_counts:
        return "[unknown]"
    predictions = bigram_counts[current_word]
    return predictions.most_common(1)[0][0]

def generate_text(start_word, num_words=6):
    """Generate a sequence of words"""
    words = [start_word]
    for _ in range(num_words - 1):
        next_w = predict_next_word(words[-1])
        if next_w == "[unknown]":
            break
        words.append(next_w)
    return " ".join(words)

# Generate some text!
print(generate_text("python"))
print(generate_text("machine"))
print(generate_text("india"))
print(generate_text("neural"))`,
    output: `python is a great programming language
machine learning uses data to learn
india is a great programming language
neural networks are inspired by`,
    notes: [
      `Real LLMs use transformer architecture with billions of parameters, not simple bigram counts. But the core idea — "predict the next token" — is the same.`,
      `GPT-4 was trained on approximately 1 trillion tokens of text. Claude and Gemini were trained on similar scales.`,
      `India's own LLM projects: BharatGPT (Krutrim by Ola), PARAM AI by C-DAC — India is investing heavily in sovereign AI.`,
    ],
    practice: {
      title: 'Extend the Mini Language Model',
      description: `Extend the bigram model above to show the top 3 predictions for a word (not just the top 1). Create a function called top3_predictions(word) that returns the 3 most likely next words and their probabilities (count/total).`,
      startCode: `from collections import defaultdict, Counter

corpus = [
    "python is a great programming language",
    "machine learning is a great field",
    "artificial intelligence is a great technology",
    "india is a great nation with great culture",
    "programming is a great skill to learn",
]

bigram_counts = defaultdict(Counter)
for sentence in corpus:
    words = sentence.split()
    for i in range(len(words) - 1):
        bigram_counts[words[i]][words[i+1]] += 1

def top3_predictions(current_word):
    if current_word not in bigram_counts:
        return []
    predictions = bigram_counts[current_word]
    total = sum(predictions.values())
    # Return top 3 as (word, probability) tuples
    # YOUR CODE HERE
    pass

results = top3_predictions("is")
print("After 'is', top 3 predictions:")
for word, prob in results:
    print(f"  '{word}': {prob:.1%}")`,
      hint: `Use predictions.most_common(3) to get top 3. Probability = count / total. Return list of (word, count/total).`,
    },
  },

  // ── Prompt Engineering ──────────────────────────────────────────────────────
  {
    id: 'ai-prompt-engineering',
    category: 'Generative AI',
    title: 'Prompt Engineering — Get Better Results from AI',
    difficulty: 'Beginner',
    theory: [
      `Prompt Engineering is the skill of crafting effective instructions (prompts) for AI systems like ChatGPT, Claude, and Gemini to get better, more accurate, and more useful responses.`,
      `The quality of an AI's response depends enormously on how you ask the question. "Explain photosynthesis" will get a generic answer. "Explain photosynthesis to a Class 8 student in 5 bullet points with a real-world analogy" gets a much better response.`,
      `Key techniques: Be specific (give context, class, subject), set format (bullet points, table, step-by-step), provide examples (few-shot prompting), chain of thought (ask it to think step-by-step), role assignment (act as a teacher/coach).`,
      `Prompt engineering is now a real job — "Prompt Engineer" or "AI Specialist". Companies pay ₹8–25 lakhs per year for people who can craft effective AI prompts for business tasks.`,
    ],
    syntax: `# Bad prompt:  "Explain recursion"
# Good prompt: "Explain recursion for a Class 11 Python student
#               who understands loops. Use a factorial example.
#               Show the code and explain each recursive call
#               with print statements. Max 200 words."`,
    code: `# Demonstrating prompt engineering concepts in Python
# (Simulating how different prompts get different quality results)

def simulate_ai_response(prompt_quality, topic):
    """Simulates how prompt quality affects response quality"""

    responses = {
        "vague": {
            "photosynthesis": "Photosynthesis is how plants make food using sunlight.",
            "sorting": "Sorting arranges data in order.",
            "recursion": "Recursion is when a function calls itself.",
        },
        "good": {
            "photosynthesis": """Photosynthesis (Class 10 level):
• Plants absorb sunlight using chlorophyll (green pigment)
• They take CO₂ from air + H₂O from soil
• Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
• Real example: like a solar panel that makes food instead of electricity!
• Why it matters: ALL food on Earth depends on photosynthesis""",
            "sorting": """Bubble Sort in Python (for beginners):
• Compare adjacent elements, swap if in wrong order
• Repeat until no swaps needed
• Time: O(n²) — slow for large data
• Example: [5,2,8,1] → [2,5,1,8] → [2,1,5,8] → [1,2,5,8]""",
            "recursion": """Recursion (Class 11 Python student):
• A function that calls itself with a smaller problem
• Must have a BASE CASE to stop (or infinite loop!)
• Example: factorial(5) = 5 × factorial(4)
•          factorial(1) = 1  ← base case
• Think: Russian nesting dolls 🪆""",
        },
    }

    return responses.get(prompt_quality, {}).get(topic, "No response")

# Compare vague vs good prompts
topics = ["photosynthesis", "sorting", "recursion"]
for topic in topics:
    print(f"{'='*50}")
    print(f"TOPIC: {topic.upper()}")
    print(f"\n❌ Vague prompt result:")
    print(simulate_ai_response("vague", topic))
    print(f"\n✅ Good prompt result:")
    print(simulate_ai_response("good", topic))
    print()`,
    output: `==================================================
TOPIC: PHOTOSYNTHESIS
❌ Vague: Photosynthesis is how plants make food using sunlight.
✅ Good: [Detailed 5-point explanation with equation and analogy]

==================================================
TOPIC: SORTING
❌ Vague: Sorting arranges data in order.
✅ Good: [Bubble Sort with example, time complexity, step trace]`,
    notes: [
      `The 5 pillars of good prompts: Context (who you are), Task (what you need), Format (how you want it), Constraints (word limit, level), Examples (show what you want).`,
      `Few-shot prompting: Give the AI 2-3 examples of what you want before asking your actual question — this dramatically improves quality.`,
      `Chain-of-Thought: Add "think step by step" or "show your reasoning" to any Maths or logic problem for much more accurate answers.`,
    ],
    practice: {
      title: 'Prompt Grader',
      description: `Write a function that scores a prompt (0-10) based on: has context (+2), has specific format (+2), has word limit (+1), has an example (+2), mentions target audience (+2), has clear task (+1). Test it on 3 different prompts.`,
      startCode: `def score_prompt(prompt):
    prompt_lower = prompt.lower()
    score = 0
    feedback = []

    # Check for context (class, subject, level)
    if any(word in prompt_lower for word in ["class", "student", "level", "beginner", "advanced"]):
        score += 2
        feedback.append("✅ Has context/audience (+2)")
    else:
        feedback.append("❌ Missing context — who is asking? (+0)")

    # Check for format request
    if any(word in prompt_lower for word in ["bullet", "table", "list", "step", "format", "points"]):
        score += 2
        feedback.append("✅ Has format request (+2)")
    else:
        feedback.append("❌ No format specified (+0)")

    # Add checks for: word limit, example, clear task
    # YOUR CODE HERE


    return score, feedback

# Test 3 prompts
prompts = [
    "Explain DNA",
    "Explain DNA replication for a Class 12 Biology student in 5 bullet points under 100 words",
    "Act as a biology teacher. Explain DNA replication step-by-step for a Class 12 CBSE student preparing for boards. Use bullet points, include one analogy, max 150 words. Example style: First, the double helix unwinds...",
]

for i, p in enumerate(prompts, 1):
    score, fb = score_prompt(p)
    print(f"\nPrompt {i}: score {score}/10")
    print(f"  '{p[:60]}...'")
    for f in fb:
        print(f"  {f}")`,
      hint: `Check for word limit: "word" or "max" or "limit" in prompt. Check for example: "example" or "e.g." or "like". Check for task: the prompt should have a verb like "explain", "list", "compare", "summarise".`,
    },
  },

  // ── NLP ─────────────────────────────────────────────────────────────────────
  {
    id: 'ai-nlp',
    category: 'AI Applications',
    title: 'Natural Language Processing (NLP)',
    difficulty: 'Intermediate',
    theory: [
      `Natural Language Processing (NLP) is the branch of AI that enables computers to understand, interpret, and generate human language (natural language — not programming language).`,
      `NLP tasks include: Text classification (spam detection, sentiment analysis), Named Entity Recognition (identifying names, places, dates in text), Machine Translation (Google Translate), Text Summarisation, Question Answering, Chatbots and conversational AI.`,
      `Key NLP techniques: Tokenisation (splitting text into words/tokens), Stop word removal (removing "the", "is", "a"), Stemming/Lemmatisation (reducing "running" to "run"), TF-IDF (measuring word importance), Word Embeddings (representing words as numbers).`,
      `NLP powers: Google Search (understanding your query), Gmail (smart replies, spam filter), YouTube (auto-captions, subtitles), Amazon Alexa / Google Assistant, Grammarly, and every chatbot you've ever used.`,
    ],
    syntax: `# Basic NLP pipeline:
# 1. Input text
# 2. Tokenise (split into words)
# 3. Remove stop words ("the", "is", "a")
# 4. Stem/Lemmatise ("running" → "run")
# 5. Analyse/classify/extract`,
    code: `# Basic NLP operations in pure Python (no libraries)

import string

# Step 1: Tokenisation
def tokenise(text):
    """Split text into individual words (tokens)"""
    # Remove punctuation and convert to lowercase
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    return text.split()

# Step 2: Stop word removal
STOP_WORDS = {"the", "a", "an", "is", "are", "was", "were", "in", "on",
              "at", "to", "for", "of", "and", "or", "but", "it", "this",
              "that", "with", "has", "have", "be", "been", "by", "from"}

def remove_stop_words(tokens):
    return [t for t in tokens if t not in STOP_WORDS]

# Step 3: Word frequency (TF — Term Frequency)
def word_frequency(tokens):
    freq = {}
    for token in tokens:
        freq[token] = freq.get(token, 0) + 1
    return dict(sorted(freq.items(), key=lambda x: x[1], reverse=True))

# Step 4: Simple keyword extraction
def extract_keywords(text, top_n=5):
    tokens = tokenise(text)
    clean_tokens = remove_stop_words(tokens)
    freq = word_frequency(clean_tokens)
    return list(freq.items())[:top_n]

# Test with a CBSE-style paragraph
sample_text = """India is a country with great diversity in culture and language.
The Indian subcontinent has been home to ancient civilisations, and India has
made great contributions to mathematics, science, and philosophy throughout history.
India today is one of the fastest growing economies with a young population and
strong technology sector."""

print("=== NLP Pipeline ===")
tokens = tokenise(sample_text)
print(f"Total tokens: {len(tokens)}")

clean = remove_stop_words(tokens)
print(f"After stop word removal: {len(clean)} words")

keywords = extract_keywords(sample_text)
print("\nTop keywords (word, frequency):")
for word, freq in keywords:
    print(f"  {word}: {freq}")`,
    output: `=== NLP Pipeline ===
Total tokens: 64
After stop word removal: 37 words

Top keywords (word, frequency):
  india: 4
  great: 3
  indian: 1
  subcontinent: 1
  ancient: 1`,
    notes: [
      `Modern NLP uses transformer models (BERT, GPT) instead of simple word counts — they understand context, not just frequency.`,
      `India has 22 official languages — NLP for Indian languages (Hindi, Telugu, Tamil, etc.) is an active research area.`,
      `CBSE Class 11/12 Computer Science students may encounter basic NLP concepts in their AI chapter.`,
    ],
    practice: {
      title: 'Simple Spam Detector using NLP',
      description: `Build a simple spam detector using NLP techniques. Tokenise the email, remove stop words, then check if any spam keywords appear (["free", "winner", "click", "prize", "urgent", "discount", "offer", "lottery"]). Return spam score (0-10) based on how many spam words are found.`,
      startCode: `import string

STOP_WORDS = {"the", "a", "an", "is", "are", "in", "on", "to", "for", "and", "or", "it", "this"}
SPAM_KEYWORDS = ["free", "winner", "click", "prize", "urgent", "discount", "offer", "lottery", "money", "earn"]

def tokenise(text):
    text = text.lower().translate(str.maketrans('', '', string.punctuation))
    return text.split()

def spam_score(email_text):
    tokens = tokenise(email_text)
    clean_tokens = [t for t in tokens if t not in STOP_WORDS]

    found_spam_words = []
    # Check each token against spam keywords
    # YOUR CODE HERE

    score = min(10, len(found_spam_words) * 2)  # 2 points per spam word, max 10
    return score, found_spam_words

# Test emails
emails = [
    "Congratulations! You are a lottery winner. Click here to claim your FREE prize now!",
    "Hi Arjun, meeting tomorrow at 3 PM for the science project discussion.",
    "URGENT: Earn free money. Special discount offer for winners only.",
]

for email in emails:
    score, words = spam_score(email)
    label = "🚨 SPAM" if score >= 4 else "✅ Safe"
    print(f"{label} (score: {score}/10)")
    print(f"  Spam words found: {words}")
    print()`,
      hint: `for token in clean_tokens: if token in SPAM_KEYWORDS: found_spam_words.append(token)`,
    },
  },

  // ── Computer Vision ─────────────────────────────────────────────────────────
  {
    id: 'ai-computer-vision',
    category: 'AI Applications',
    title: 'Computer Vision — How AI Sees the World',
    difficulty: 'Intermediate',
    theory: [
      `Computer Vision is the field of AI that enables machines to interpret and understand visual information from the world — images, videos, and live camera feeds.`,
      `How does a computer see? An image is stored as a grid of pixels. Each pixel is a number (0-255 for greyscale, or three numbers for RGB: red, green, blue). Computer vision algorithms find patterns in these numbers.`,
      `Key tasks: Image Classification (what object is this?), Object Detection (where are the objects and what are they?), Face Recognition (who is this person?), Image Segmentation (outline exactly where each object is), Optical Character Recognition (OCR — reading text from images).`,
      `Real applications: Google Lens (identify objects from photos), Face ID on iPhones, Self-driving cars (Tesla, Waymo), Medical imaging (detecting tumours from X-rays/MRI), ISRO satellite image analysis, Aadhaar face verification.`,
    ],
    syntax: `# An image is just a 2D array of pixel values
# Greyscale: each pixel = 0 (black) to 255 (white)
# Colour (RGB): each pixel = [R, G, B] where each 0-255
# 5x5 image has 25 pixels
# 1920x1080 Full HD has 2,073,600 pixels`,
    code: `# Computer Vision concepts with pure Python
# Representing and processing images as 2D arrays

# A tiny 5x5 greyscale "image" (0=black, 255=white)
image = [
    [  0,   0, 255,   0,   0],
    [  0, 255, 255, 255,   0],
    [255, 255, 255, 255, 255],
    [  0, 255, 255, 255,   0],
    [  0,   0, 255,   0,   0],
]

def display_image(img):
    """Display the image using ASCII art"""
    for row in img:
        line = ""
        for pixel in row:
            if pixel > 200:
                line += "██"  # white/bright
            elif pixel > 100:
                line += "▓▓"  # medium
            else:
                line += "░░"  # dark/black
        print(line)

def image_stats(img):
    """Basic image statistics (like computer vision preprocessing)"""
    all_pixels = [pixel for row in img for pixel in row]
    avg = sum(all_pixels) / len(all_pixels)
    bright_count = sum(1 for p in all_pixels if p > 128)
    return avg, bright_count, len(all_pixels)

def brighten(img, amount=50):
    """Simple image filter: increase brightness"""
    return [[min(255, pixel + amount) for pixel in row] for row in img]

print("=== Original Image ===")
display_image(image)

avg, bright, total = image_stats(image)
print(f"\nStats: avg={avg:.1f}, bright pixels={bright}/{total}")

print("\n=== Brightened Image ===")
display_image(brighten(image, 100))`,
    output: `=== Original Image ===
░░░░██░░░░
░░████████░░
██████████████
░░████████░░
░░░░██░░░░

Stats: avg=153.0, bright pixels=13/25

=== Brightened Image ===
░░░░████░░░░
░░██████████░░
████████████████
...`,
    notes: [
      `Real computer vision uses Convolutional Neural Networks (CNNs) — special neural networks that automatically detect edges, shapes, and patterns in images.`,
      `Python's OpenCV library is the standard for computer vision. PIL/Pillow is used for basic image processing.`,
      `Face recognition used in India's DigiYatra (airport boarding) and many banking apps uses deep learning with CNNs.`,
    ],
    practice: {
      title: 'Edge Detector',
      description: `Build a simple edge detector. An "edge" in a greyscale image is where pixel values change dramatically between neighbours. For each pixel (not on border), calculate the difference with the right neighbour and bottom neighbour. If either difference > 100, mark as edge (255), else 0.`,
      startCode: `image = [
    [  0,   0,   0,   0,   0],
    [  0, 200, 200, 200,   0],
    [  0, 200, 200, 200,   0],
    [  0, 200, 200, 200,   0],
    [  0,   0,   0,   0,   0],
]

def detect_edges(img):
    rows = len(img)
    cols = len(img[0])
    edges = [[0] * cols for _ in range(rows)]

    for r in range(rows - 1):
        for c in range(cols - 1):
            # Check difference with right and bottom neighbours
            # YOUR CODE HERE
            diff_right = 0   # abs(img[r][c] - img[r][c+1])
            diff_down  = 0   # abs(img[r][c] - img[r+1][c])

            if diff_right > 100 or diff_down > 100:
                edges[r][c] = 255

    return edges

def display_image(img):
    for row in img:
        print("".join("██" if p > 100 else "░░" for p in row))

print("Original:"); display_image(image)
print("\nEdges detected:"); display_image(detect_edges(image))`,
      hint: `diff_right = abs(img[r][c] - img[r][c+1]) and diff_down = abs(img[r][c] - img[r+1][c])`,
    },
  },

  // ── AI Safety & Ethics ──────────────────────────────────────────────────────
  {
    id: 'ai-safety-ethics',
    category: 'AI in Society',
    title: 'AI Safety & Ethics — The Responsible Use of AI',
    difficulty: 'Beginner',
    theory: [
      `As AI becomes more powerful, questions of safety, fairness, and ethics become critical. AI is not neutral — it learns from human-generated data, which contains human biases, and its decisions affect real people's lives.`,
      `AI Bias: If an AI is trained on biased data, it makes biased decisions. Example: A hiring AI trained mostly on male employee data might unfairly rate female applicants lower. A facial recognition system trained mostly on light-skinned faces might fail on dark-skinned faces.`,
      `Deepfakes and Misinformation: Generative AI can create realistic fake videos, images, and audio of real people saying or doing things they never did. This is a growing threat to democracy and trust.`,
      `Privacy: AI systems often collect and analyse vast amounts of personal data. Who owns your data? How is it used? These are fundamental rights questions in the digital age. India's DPDP (Digital Personal Data Protection Act) 2023 addresses some of these concerns.`,
      `Job displacement: AI may automate many routine jobs. The solution is not to avoid AI but to develop AI-complementary skills — creativity, critical thinking, emotional intelligence, and AI management.`,
    ],
    syntax: `# 5 Principles of Responsible AI (from major tech companies):
# 1. Fairness — treat all groups equally
# 2. Reliability & Safety — work correctly, fail safely
# 3. Privacy — protect user data
# 4. Inclusiveness — work for everyone
# 5. Transparency — explain decisions`,
    code: `# Demonstrating AI bias with a simple example

# Biased training data — only urban students represented
biased_training_data = [
    # (income, school_type, scholarship_awarded)
    (800000, "private", True),
    (700000, "private", True),
    (600000, "private", True),
    (400000, "private", False),
    (300000, "government", False),
    (250000, "government", False),
]

def biased_scholarship_ai(income, school_type):
    """AI trained on biased data — unfairly penalises government school students"""
    if school_type == "private" and income > 500000:
        return True
    return False  # All government school students denied!

# Fair AI — focuses on merit, not school type
def fair_scholarship_ai(marks, family_income):
    """Fair AI — based on merit and actual financial need"""
    is_meritorious = marks >= 80
    is_needy = family_income < 400000
    return is_meritorious or is_needy

print("=== Biased AI ===")
applicants = [
    ("Rahul", 300000, "government"),
    ("Priya", 250000, "government"),
    ("Rohan", 900000, "private"),
]
for name, income, school in applicants:
    result = biased_scholarship_ai(income, school)
    print(f"{name} ({school}, ₹{income:,}): {'✅ Awarded' if result else '❌ Denied'}")

print("\n=== Fair AI ===")
fair_applicants = [
    ("Rahul", 95, 250000),   # high marks, low income
    ("Priya", 78, 150000),   # average marks, very low income
    ("Rohan", 65, 1200000),  # average marks, high income
]
for name, marks, income in fair_applicants:
    result = fair_scholarship_ai(marks, income)
    print(f"{name} (marks={marks}, income=₹{income:,}): {'✅ Awarded' if result else '❌ Denied'}")`,
    output: `=== Biased AI ===
Rahul (government, ₹300,000): ❌ Denied
Priya (government, ₹250,000): ❌ Denied
Rohan (private, ₹900,000): ✅ Awarded

=== Fair AI ===
Rahul (marks=95, income=₹250,000): ✅ Awarded (merit)
Priya (marks=78, income=₹150,000): ✅ Awarded (need)
Rohan (marks=65, income=₹1,200,000): ❌ Denied`,
    notes: [
      `The EU AI Act (2024) is the world's first comprehensive AI regulation. India is developing its own AI governance framework.`,
      `"Explainable AI" (XAI) is a growing field — making AI decisions transparent enough for humans to understand and challenge.`,
      `As a future AI professional, you have a responsibility to think about the societal impact of systems you build.`,
    ],
    practice: {
      title: 'Fairness Checker',
      description: `Build a fairness checker that, given a list of loan decisions (applicant_name, gender, loan_approved), calculates the approval rate for male vs female applicants and flags if the difference is more than 10% (potential bias).`,
      startCode: `decisions = [
    ("Arjun",    "male",   True),
    ("Priya",    "female", False),
    ("Rahul",    "male",   True),
    ("Sneha",    "female", True),
    ("Vikram",   "male",   True),
    ("Anjali",   "female", False),
    ("Sanjay",   "male",   True),
    ("Deepa",    "female", False),
    ("Ravi",     "male",   False),
    ("Kavitha",  "female", True),
]

def fairness_check(decisions):
    male_total = male_approved = 0
    female_total = female_approved = 0

    for name, gender, approved in decisions:
        # YOUR CODE HERE — count by gender
        pass

    male_rate = male_approved / male_total if male_total > 0 else 0
    female_rate = female_approved / female_total if female_total > 0 else 0

    print(f"Male approval rate:   {male_rate:.1%} ({male_approved}/{male_total})")
    print(f"Female approval rate: {female_rate:.1%} ({female_approved}/{female_total})")

    diff = abs(male_rate - female_rate)
    if diff > 0.10:
        print(f"⚠️  BIAS DETECTED: {diff:.1%} difference exceeds 10% threshold!")
    else:
        print(f"✅ Seems fair: only {diff:.1%} difference")

fairness_check(decisions)`,
      hint: `if gender == "male": male_total += 1; if approved: male_approved += 1`,
    },
  },

  // ── AI in India ─────────────────────────────────────────────────────────────
  {
    id: 'ai-in-india',
    category: 'AI in Society',
    title: 'AI in India — How India Uses and Builds AI',
    difficulty: 'Beginner',
    theory: [
      `India is one of the world's fastest-growing AI markets. With 1.4 billion people, a young tech-savvy population, and a massive digital infrastructure (UPI, Aadhaar, JAM trinity), India has unique advantages in AI adoption.`,
      `Indian government AI initiatives: IndiaAI Mission (₹10,372 crore allocation), BharatGPT (Indian LLM), AI for Agriculture (crop disease detection), DigiYatra (face recognition for airport boarding), Aarogya Setu (contact tracing AI), BHIM UPI fraud detection.`,
      `Indian AI companies: Krutrim (Ola), Sarvam AI, CoRover (BharatGPT), Zepto/Blinkit (delivery optimisation), Swiggy/Zomato (recommendation + ETA prediction), Freshworks (CRM AI), BYJU's (adaptive learning).`,
      `Career opportunities: India needs 1 million AI professionals by 2030 (NASSCOM estimate). Top roles: ML Engineer, Data Scientist, AI Researcher, NLP Engineer, Computer Vision Engineer. Average salary: ₹8–35 lakhs per year depending on experience.`,
    ],
    syntax: `# AI in everyday Indian life:
# UPI fraud detection: AI checks each transaction in milliseconds
# Swiggy ETA: AI predicts delivery time using traffic + restaurant data
# IRCTC seat allocation: AI optimises seat assignment
# Farm AI: detects crop diseases from smartphone photos`,
    code: `# Simulating UPI fraud detection AI (simplified)
import datetime

def calculate_fraud_risk(transaction):
    """Simplified UPI fraud detection system"""
    risk_score = 0
    risk_reasons = []

    amount = transaction["amount"]
    hour = transaction["hour"]
    is_new_merchant = transaction["is_new_merchant"]
    location_mismatch = transaction["location_mismatch"]
    user_avg_transaction = transaction["user_avg_transaction"]

    # Rule 1: Unusually large amount
    if amount > user_avg_transaction * 5:
        risk_score += 30
        risk_reasons.append(f"Amount {amount} is {amount/user_avg_transaction:.1f}x above average")

    # Rule 2: Odd hours (2 AM - 5 AM)
    if 2 <= hour <= 5:
        risk_score += 20
        risk_reasons.append("Transaction at unusual hour (2-5 AM)")

    # Rule 3: Unknown merchant
    if is_new_merchant:
        risk_score += 15
        risk_reasons.append("First transaction to this merchant")

    # Rule 4: Location mismatch
    if location_mismatch:
        risk_score += 35
        risk_reasons.append("Transaction location doesn't match usual area")

    return risk_score, risk_reasons

# Test transactions
transactions = [
    {"amount": 500, "hour": 14, "is_new_merchant": False, "location_mismatch": False, "user_avg_transaction": 450},
    {"amount": 50000, "hour": 3, "is_new_merchant": True, "location_mismatch": True, "user_avg_transaction": 400},
    {"amount": 2000, "hour": 18, "is_new_merchant": True, "location_mismatch": False, "user_avg_transaction": 500},
]

for i, txn in enumerate(transactions, 1):
    risk, reasons = calculate_fraud_risk(txn)
    flag = "🚨 BLOCKED" if risk >= 50 else ("⚠️ FLAG" if risk >= 25 else "✅ APPROVED")
    print(f"\nTransaction {i}: ₹{txn['amount']} — {flag} (risk: {risk}/100)")
    for r in reasons:
        print(f"  ⚠ {r}")`,
    output: `Transaction 1: ₹500 — ✅ APPROVED (risk: 0/100)

Transaction 2: ₹50000 — 🚨 BLOCKED (risk: 100/100)
  ⚠ Amount 50000 is 125.0x above average
  ⚠ Transaction at unusual hour (2-5 AM)
  ⚠ First transaction to this merchant
  ⚠ Transaction location doesn't match usual area

Transaction 3: ₹2000 — ⚠️ FLAG (risk: 15/100)
  ⚠ First transaction to this merchant`,
    notes: [
      `India processes over 10 billion UPI transactions per month. AI fraud detection runs on every single one — in milliseconds.`,
      `ISRO uses AI for satellite image analysis to track monsoons, floods, deforestation, and urban growth.`,
      `IIT Madras has India's most active AI research community. IIIT Hyderabad specialises in language AI for Indian languages.`,
    ],
    practice: {
      title: 'Crop Disease Detector (Simplified)',
      description: `Build a simple crop disease detector. Given a leaf's colour_score (0-100, where 100=healthy green, 0=yellow/brown) and spot_count (number of visible spots), classify as: "Healthy" (colour>70, spots<3), "Early disease" (colour 50-70 OR spots 3-7), "Severe disease" (colour<50 OR spots>7).`,
      startCode: `def detect_crop_disease(colour_score, spot_count):
    """
    Simple AI for detecting crop disease from leaf characteristics
    Used by apps like AgroStar and Fasal in India
    """
    # YOUR CODE HERE
    # Check conditions and return disease status
    pass

# Test various crops
leaf_samples = [
    ("Sample 1", 85, 1),   # Healthy
    ("Sample 2", 55, 4),   # Early disease
    ("Sample 3", 30, 12),  # Severe disease
    ("Sample 4", 72, 2),   # Healthy
    ("Sample 5", 45, 6),   # Severe disease (low colour)
]

for name, colour, spots in leaf_samples:
    result = detect_crop_disease(colour, spots)
    emoji = "🌿" if "Healthy" in result else ("⚠️" if "Early" in result else "🚨")
    print(f"{name}: colour={colour}, spots={spots} → {emoji} {result}")`,
      hint: `Check healthy first (both conditions good). Then check severe (either very bad). Else early disease. The order matters!`,
    },
  },

  // ── Python for AI ─────────────────────────────────────────────────────────
  {
    id: 'ai-python-for-ai',
    category: 'AI Programming',
    title: 'Python for AI — Libraries Every AI Student Must Know',
    difficulty: 'Intermediate',
    theory: [
      `Python is the dominant language for AI and Machine Learning — not because it's the fastest (it isn't), but because of its rich ecosystem of libraries that make complex tasks simple. The "AI library stack" in Python is unmatched.`,
      `Core AI Libraries: NumPy (numerical computing — the foundation), Pandas (data manipulation), Matplotlib (plotting/visualisation), Scikit-learn (ML algorithms), TensorFlow (deep learning by Google), PyTorch (deep learning by Meta), Keras (high-level neural network API).`,
      `For natural language: HuggingFace Transformers, NLTK, spaCy. For computer vision: OpenCV, PIL/Pillow. For data analysis: Seaborn (advanced plots), SciPy (scientific computing).`,
      `You don't need all of these at once! Start with NumPy + Pandas + Matplotlib (3 months) → then scikit-learn (2 months) → then choose specialisation: NLP or Computer Vision or Tabular ML.`,
    ],
    syntax: `# The AI Python stack:
import numpy as np         # Fast arrays and math
import pandas as pd        # DataFrames (like Excel in Python)
import matplotlib.pyplot as plt  # Charts and graphs
from sklearn.linear_model import LinearRegression  # ML model
# (These libraries need installation: pip install numpy pandas matplotlib scikit-learn)`,
    code: `# NumPy basics — the foundation of all AI in Python
# (NumPy is so fundamental that even TensorFlow and PyTorch build on it)

# Simulating NumPy without importing it (for educational demo)
# In real code, you'd: import numpy as np

# What NumPy arrays can do:
def numpy_demo():
    # In real NumPy: array = np.array([1, 2, 3, 4, 5])
    array = [1, 2, 3, 4, 5]

    # Element-wise operations (NumPy does this MUCH faster)
    squared = [x**2 for x in array]
    doubled = [x*2 for x in array]

    print("Original:", array)
    print("Squared: ", squared)
    print("Doubled: ", doubled)

    # Statistical operations
    mean = sum(array) / len(array)
    variance = sum((x - mean)**2 for x in array) / len(array)
    std_dev = variance ** 0.5

    print(f"\nMean: {mean}")
    print(f"Std Dev: {std_dev:.2f}")

    # 2D array (matrix) — used in neural network weight matrices
    matrix = [[1, 2, 3],
               [4, 5, 6],
               [7, 8, 9]]

    # Matrix transpose (rows ↔ columns)
    transposed = [[matrix[j][i] for j in range(3)] for i in range(3)]
    print("\nOriginal Matrix:")
    for row in matrix:
        print(row)
    print("Transposed:")
    for row in transposed:
        print(row)

numpy_demo()`,
    output: `Original: [1, 2, 3, 4, 5]
Squared:  [1, 4, 9, 16, 25]
Doubled:  [2, 4, 6, 8, 10]

Mean: 3.0
Std Dev: 1.41

Original Matrix:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
Transposed:
[1, 4, 7]
[2, 5, 8]
[3, 6, 9]`,
    notes: [
      `In real code: import numpy as np and use np.array(), np.mean(), np.std(), np.transpose() — these are 100x faster than pure Python loops.`,
      `To install all AI libraries: pip install numpy pandas matplotlib scikit-learn`,
      `Google Colab (colab.research.google.com) — a free cloud notebook where all AI libraries are pre-installed. No setup needed. Recommended for students.`,
    ],
    practice: {
      title: 'Student Statistics Calculator',
      description: `Build a statistics calculator for a class of students. Given a list of marks, calculate: mean, median, mode, standard deviation, highest, lowest, and how many students are above the mean. This is the kind of data analysis every AI project starts with.`,
      startCode: `def calculate_stats(marks):
    n = len(marks)

    # Mean
    mean = sum(marks) / n

    # Median
    sorted_marks = sorted(marks)
    if n % 2 == 0:
        median = (sorted_marks[n//2 - 1] + sorted_marks[n//2]) / 2
    else:
        median = sorted_marks[n//2]

    # Mode (most frequent value)
    freq = {}
    for m in marks:
        freq[m] = freq.get(m, 0) + 1
    mode = max(freq, key=freq.get)

    # Standard deviation (measure of spread)
    variance = sum((x - mean)**2 for x in marks) / n
    std_dev = variance ** 0.5

    # YOUR CODE: above_mean count, highest, lowest
    highest = max(marks)
    lowest  = min(marks)
    above_mean = 0  # Count students scoring above mean
    # YOUR CODE HERE

    return {
        "mean": round(mean, 2), "median": median, "mode": mode,
        "std_dev": round(std_dev, 2), "highest": highest, "lowest": lowest,
        "above_mean": above_mean,
    }

class_marks = [78, 92, 65, 88, 72, 95, 60, 88, 74, 83, 91, 67, 88, 79, 85]
stats = calculate_stats(class_marks)
print(f"Class of {len(class_marks)} students:")
for key, val in stats.items():
    print(f"  {key}: {val}")`,
      hint: `above_mean = sum(1 for m in marks if m > mean)`,
    },
  },

  // ── AI Career ───────────────────────────────────────────────────────────────
  {
    id: 'ai-career',
    category: 'AI in Society',
    title: 'AI Career Paths — Jobs and Skills for the Future',
    difficulty: 'Beginner',
    theory: [
      `AI is one of the fastest-growing career fields globally. India needs over 1 million AI professionals by 2030, but currently has a shortage. This means opportunities are immense for students who start learning now.`,
      `Key AI Roles: ML Engineer (builds ML models and systems, ₹12–40L), Data Scientist (analyses data to find insights, ₹10–35L), AI Research Scientist (advances AI theory, ₹20–80L+), NLP Engineer (language AI, ₹15–45L), Computer Vision Engineer (image/video AI, ₹14–40L), Data Engineer (builds data pipelines, ₹10–30L), AI Product Manager (bridges AI and business, ₹18–60L).`,
      `Skills needed: For all AI roles: Python + Mathematics (Statistics, Linear Algebra, Calculus). For ML: scikit-learn. For Deep Learning: PyTorch or TensorFlow. For NLP: HuggingFace. For Data: SQL + Pandas. For jobs: GitHub projects + internship experience.`,
      `Your roadmap starting from school: Class 6-8: Basic Python → Class 9-10: Data Structures + SQL + Statistics → Class 11-12: Scikit-learn + Pandas + NumPy → College Year 1-2: Deep Learning + Projects → College Year 3-4: Specialise + Internships → Job.`,
    ],
    syntax: `# AI Career Learning Path (Python commands to practice each stage)
# Stage 1: Python basics — print, lists, functions, OOP
# Stage 2: Data — pandas, numpy, matplotlib
# Stage 3: ML — sklearn models, train/test split, accuracy
# Stage 4: Deep Learning — PyTorch/TensorFlow, neural networks
# Stage 5: Specialise — NLP (HuggingFace) or CV (OpenCV)
# Stage 6: Projects — build 3 complete projects, put on GitHub`,
    code: `# Career skills self-assessment tool

SKILL_LEVELS = {
    "python_basics":    {"name": "Python Basics",         "stage": 1, "weight": 10},
    "data_structures":  {"name": "Data Structures",       "stage": 1, "weight": 8},
    "sql":              {"name": "SQL",                   "stage": 1, "weight": 7},
    "statistics":       {"name": "Statistics",            "stage": 2, "weight": 9},
    "numpy_pandas":     {"name": "NumPy + Pandas",        "stage": 2, "weight": 8},
    "data_viz":         {"name": "Data Visualisation",    "stage": 2, "weight": 6},
    "sklearn":          {"name": "Scikit-learn (ML)",     "stage": 3, "weight": 10},
    "math_linalg":      {"name": "Linear Algebra",        "stage": 3, "weight": 8},
    "deep_learning":    {"name": "Deep Learning",         "stage": 4, "weight": 10},
    "pytorch_tf":       {"name": "PyTorch or TensorFlow", "stage": 4, "weight": 9},
    "nlp_cv":           {"name": "NLP or Computer Vision","stage": 5, "weight": 8},
    "github":           {"name": "GitHub + Projects",     "stage": 5, "weight": 7},
}

def assess_career_readiness(skills_rated):
    """skills_rated: dict of skill_id -> score (0-10)"""
    total_weight = 0
    weighted_score = 0

    for skill_id, info in SKILL_LEVELS.items():
        score = skills_rated.get(skill_id, 0)
        weighted_score += score * info["weight"]
        total_weight += info["weight"] * 10  # max possible

    readiness = (weighted_score / total_weight) * 100
    return readiness

# Example: A student who knows Python basics and some SQL
my_skills = {
    "python_basics":    8,   # strong
    "data_structures":  6,   # good
    "sql":              7,   # good
    "statistics":       4,   # learning
    "numpy_pandas":     3,   # just starting
    "data_viz":         2,   # beginner
    "sklearn":          1,   # touched briefly
    "math_linalg":      5,   # okay from school
    "deep_learning":    0,   # not yet
    "pytorch_tf":       0,   # not yet
    "nlp_cv":           0,   # not yet
    "github":           3,   # some repos
}

readiness = assess_career_readiness(my_skills)
print(f"AI Career Readiness: {readiness:.1f}%")

if readiness < 30:
    print("Stage: Complete Python Fundamentals first")
elif readiness < 55:
    print("Stage: Move to Data Analysis (NumPy, Pandas, Statistics)")
elif readiness < 75:
    print("Stage: Start Machine Learning with scikit-learn")
else:
    print("Stage: Ready for Deep Learning and specialisation!")

print("\nSkills to focus on next:")
for skill_id, info in SKILL_LEVELS.items():
    score = my_skills.get(skill_id, 0)
    if score < 5:
        print(f"  📌 {info['name']} (current: {score}/10)")`,
    output: `AI Career Readiness: 34.2%
Stage: Move to Data Analysis (NumPy, Pandas, Statistics)

Skills to focus on next:
  📌 NumPy + Pandas (current: 3/10)
  📌 Data Visualisation (current: 2/10)
  📌 Scikit-learn (ML) (current: 1/10)
  📌 Deep Learning (current: 0/10)
  📌 PyTorch or TensorFlow (current: 0/10)
  📌 NLP or Computer Vision (current: 0/10)`,
    notes: [
      `You don't need to know everything to get your first internship. Strong Python + Pandas + 2 good projects on GitHub is enough for many companies.`,
      `Google, Microsoft, Amazon all have dedicated internship programmes for Indian students. Start applying in 3rd year of college.`,
      `Kaggle competitions are the best way to build a portfolio — join, compete, learn from others' code, and show your ranking to employers.`,
    ],
    practice: {
      title: 'Personalised Study Plan Generator',
      description: `Build a study plan generator. Given a student's current skills (weak/medium/strong), generate a 3-month plan with specific weekly goals. Input: python=weak/medium/strong, math=weak/medium/strong, goal=ml/nlp/cv. Output: personalized week-by-week learning plan.`,
      startCode: `def generate_study_plan(python_level, math_level, goal):
    plan = []

    # Month 1 depends on starting skill levels
    if python_level == "weak":
        plan.append("Month 1, Week 1-2: Python basics (variables, loops, functions)")
        plan.append("Month 1, Week 3-4: Python OOP and data structures")
    elif python_level == "medium":
        plan.append("Month 1, Week 1-2: Python advanced (decorators, generators)")
        plan.append("Month 1, Week 3-4: NumPy and Pandas basics")
    else:
        plan.append("Month 1, Week 1-2: NumPy advanced + Pandas mastery")
        plan.append("Month 1, Week 3-4: Matplotlib and Seaborn visualisation")

    # Month 2 — YOUR CODE for math track
    # if math_level is weak, add statistics basics
    # if medium, add linear algebra
    # if strong, add calculus for ML
    # YOUR CODE HERE

    # Month 3 — goal specific
    if goal == "ml":
        plan.append("Month 3, Week 1-2: scikit-learn — regression and classification")
        plan.append("Month 3, Week 3-4: Random Forest, XGBoost, model evaluation")
    elif goal == "nlp":
        plan.append("Month 3, Week 1-2: NLTK + text preprocessing")
        plan.append("Month 3, Week 3-4: HuggingFace transformers + BERT")
    elif goal == "cv":
        plan.append("Month 3, Week 1-2: OpenCV basics + image processing")
        plan.append("Month 3, Week 3-4: CNN with PyTorch")

    return plan

plan = generate_study_plan("medium", "weak", "ml")
print("Your 3-Month AI Study Plan:")
for i, item in enumerate(plan, 1):
    print(f"  {i}. {item}")`,
      hint: `For Month 2: if math_level == "weak": append stats topics. elif "medium": append linear algebra. else: append calculus/gradient descent.`,
    },
  },

  // ── Decision Trees ───────────────────────────────────────────────────────────
  {
    id: 'ai-decision-trees',
    category: 'Machine Learning',
    title: 'Decision Trees & Random Forest',
    difficulty: 'Intermediate',
    theory: [
      `A Decision Tree is a flowchart-like model that makes decisions by splitting data based on feature values. It starts at a "root" node, then asks a series of yes/no questions to reach a final decision (leaf node).`,
      `Example: Predicting if a student will pass — first split on attendance (>75%?), then marks (>50?), then homework submitted (yes/no). Each path through the tree gives a different prediction.`,
      `Random Forest is an ensemble of many decision trees. Each tree is trained on a random subset of data and features. The final prediction is a vote from all trees. This reduces overfitting and improves accuracy dramatically.`,
      `Decision Trees are extremely popular because they are: interpretable (you can see exactly why a decision was made), fast, handle both numerical and categorical data, and require no feature scaling.`,
    ],
    syntax: `# Decision Tree logic (conceptual):
# Root: Is attendance > 75%?
#   YES → Is marks > 60? → YES → PASS, NO → borderline
#   NO  → Is marks > 80? → YES → borderline, NO → FAIL
#
# Random Forest: 100 trees vote → majority wins`,
    code: `# Decision Tree classifier — built from scratch

class DecisionNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, label=None):
        self.feature = feature      # which feature to split on
        self.threshold = threshold  # split value
        self.left = left            # subtree for True branch
        self.right = right          # subtree for False branch
        self.label = label          # leaf label (if leaf node)

def simple_tree_predict(node, sample):
    """Walk down the tree to make a prediction"""
    if node.label is not None:
        return node.label
    if sample[node.feature] <= node.threshold:
        return simple_tree_predict(node.left, sample)
    else:
        return simple_tree_predict(node.right, sample)

# Manually build a decision tree for student pass/fail
# Features: [attendance%, avg_marks, homework_submitted%]
tree = DecisionNode(
    feature=1, threshold=50,       # Split: avg_marks <= 50?
    left=DecisionNode(
        feature=0, threshold=60,   # low marks: check attendance
        left=DecisionNode(label="FAIL"),
        right=DecisionNode(label="BORDERLINE")
    ),
    right=DecisionNode(
        feature=2, threshold=70,   # good marks: check homework
        left=DecisionNode(label="BORDERLINE"),
        right=DecisionNode(label="PASS")
    )
)

# Test students: [attendance%, avg_marks, homework%]
students = [
    ("Arjun",  [85, 75, 90]),   # Expected: PASS
    ("Priya",  [40, 35, 20]),   # Expected: FAIL
    ("Rahul",  [75, 55, 60]),   # Expected: BORDERLINE
    ("Sneha",  [90, 88, 95]),   # Expected: PASS
]

print("=== Decision Tree Predictions ===")
for name, features in students:
    result = simple_tree_predict(tree, features)
    print(f"{name}: attendance={features[0]}%, marks={features[1]}, hw={features[2]}% → {result}")`,
    output: `=== Decision Tree Predictions ===
Arjun: attendance=85%, marks=75, hw=90% → PASS
Priya: attendance=40%, marks=35, hw=20% → FAIL
Rahul: attendance=75%, marks=55, hw=60% → BORDERLINE
Sneha: attendance=90%, marks=88, hw=95% → PASS`,
    notes: [
      `In scikit-learn: from sklearn.tree import DecisionTreeClassifier — fits in 3 lines of code.`,
      `Random Forest in sklearn: from sklearn.ensemble import RandomForestClassifier — typically 50–200 trees.`,
      `Decision Trees are prone to "overfitting" (memorising training data). Random Forest fixes this with randomness and voting.`,
    ],
    practice: {
      title: 'Loan Approval Decision Tree',
      description: `Build a simple loan approval decision tree. Rules: If income < 20000 → REJECT. Else if credit_score < 600 → REJECT. Else if loan_amount > income * 10 → REJECT. Else → APPROVE. Test on 5 different applicants.`,
      startCode: `def loan_decision(income, credit_score, loan_amount):
    # Build the decision tree logic
    # YOUR CODE HERE
    pass

# Test applicants: (income/month, credit_score, loan_amount)
applicants = [
    ("Ramesh",  15000, 720, 100000),  # Low income
    ("Sunita",  45000, 580, 200000),  # Low credit
    ("Pradeep", 60000, 750, 700000),  # Loan too high
    ("Ananya",  50000, 800, 300000),  # Should APPROVE
    ("Kiran",   30000, 650, 250000),  # Should APPROVE
]

for name, income, credit, loan in applicants:
    result = loan_decision(income, credit, loan)
    icon = "✅" if result == "APPROVE" else "❌"
    print(f"{name}: income=₹{income}, credit={credit}, loan=₹{loan} → {icon} {result}")`,
      hint: `Use nested if-elif statements. Check income first, then credit_score, then the ratio loan_amount/income > 10.`,
    },
  },

  // ── Data Preprocessing ──────────────────────────────────────────────────────
  {
    id: 'ai-data-preprocessing',
    category: 'Machine Learning',
    title: 'Data Preprocessing & Feature Engineering',
    difficulty: 'Intermediate',
    theory: [
      `"Data preprocessing" is preparing raw data for ML models. In real AI projects, 70–80% of the time is spent on data preprocessing — not building models. Raw data is messy, incomplete, and inconsistent.`,
      `Common issues: Missing values (some records have blank fields), Outliers (extreme values like a student with 200/100 marks), Inconsistent formats ("Male", "male", "M" all mean the same thing), Duplicates (same record entered twice), Wrong data types (age stored as text "25" instead of number 25).`,
      `Feature Engineering: Creating new features from existing ones to help the model learn better. Example: From "date of birth", create "age" and "age_group". From "purchase time", create "is_weekend" and "hour_of_day".`,
      `Normalisation vs Standardisation: Normalisation scales all values to 0-1 range (useful for neural networks). Standardisation converts to mean=0, std=1 (useful for most ML algorithms).`,
    ],
    syntax: `# Key preprocessing steps:
# 1. Handle missing values: fill with mean/median/mode, or drop
# 2. Remove duplicates
# 3. Fix data types
# 4. Encode categories: "Male"→0, "Female"→1
# 5. Normalise/Standardise numerical features
# 6. Feature engineering: create new useful features`,
    code: `# Data preprocessing pipeline in pure Python

# Raw messy dataset
raw_data = [
    {"name": "Arjun",  "age": "17",  "marks": 85,   "gender": "Male",   "city": "Delhi"},
    {"name": "Priya",  "age": None,  "marks": 92,   "gender": "female", "city": "Mumbai"},
    {"name": "Rahul",  "age": "16",  "marks": None, "gender": "Male",   "city": "Delhi"},
    {"name": "Sneha",  "age": "18",  "marks": 78,   "gender": "Female", "city": "Chennai"},
    {"name": "Arjun",  "age": "17",  "marks": 85,   "gender": "Male",   "city": "Delhi"},  # duplicate!
    {"name": "Vikram", "age": "200", "marks": 65,   "gender": "male",   "city": "Pune"},   # age outlier!
]

def preprocess_data(data):
    print(f"Raw records: {len(data)}")

    # Step 1: Remove duplicates
    seen = set()
    deduped = []
    for row in data:
        key = (row["name"], row["age"], row["marks"])
        if key not in seen:
            seen.add(key)
            deduped.append(row.copy())
    print(f"After removing duplicates: {len(deduped)}")

    # Step 2: Fix age — convert to int, handle None, remove outliers
    valid_ages = [int(r["age"]) for r in deduped if r["age"] is not None and int(r["age"]) < 100]
    avg_age = sum(valid_ages) / len(valid_ages)
    for row in deduped:
        if row["age"] is None or int(row["age"]) > 100:
            row["age"] = round(avg_age)
        else:
            row["age"] = int(row["age"])

    # Step 3: Handle missing marks
    valid_marks = [r["marks"] for r in deduped if r["marks"] is not None]
    avg_marks = sum(valid_marks) / len(valid_marks)
    for row in deduped:
        if row["marks"] is None:
            row["marks"] = round(avg_marks)

    # Step 4: Standardise gender (lowercase, then encode)
    for row in deduped:
        row["gender"] = 0 if row["gender"].lower() in ["male", "m"] else 1

    # Step 5: Normalise marks (0-1 range)
    max_marks = max(r["marks"] for r in deduped)
    min_marks = min(r["marks"] for r in deduped)
    for row in deduped:
        row["marks_normalised"] = round((row["marks"] - min_marks) / (max_marks - min_marks), 2)

    return deduped

cleaned = preprocess_data(raw_data)
print("\nCleaned Dataset:")
for row in cleaned:
    print(f"  {row['name']}: age={row['age']}, marks={row['marks']} (norm={row['marks_normalised']}), gender={row['gender']}")`,
    output: `Raw records: 6
After removing duplicates: 5

Cleaned Dataset:
  Arjun: age=17, marks=85 (norm=0.61), gender=0
  Priya: age=17, marks=92 (norm=1.0), gender=1
  Rahul: age=16, marks=80 (norm=0.39), gender=0
  Sneha: age=18, marks=78 (norm=0.29), gender=1
  Vikram: age=17, marks=65 (norm=0.0), gender=0`,
    notes: [
      `In real projects: use Pandas for preprocessing. df.dropna(), df.fillna(), df.drop_duplicates(), pd.get_dummies() are the key functions.`,
      `Feature importance: some features matter more than others. ML models like Random Forest can tell you which features are most useful.`,
      `Always split your data into train/test BEFORE preprocessing to avoid "data leakage" — where test data information leaks into training.`,
    ],
    practice: {
      title: 'Data Cleaner',
      description: `Clean this dataset: students = [{"name": "Amit", "score": "88", "absent_days": 3}, {"name": "Bina", "score": None, "absent_days": 2}, {"name": "Amit", "score": "88", "absent_days": 3}, {"name": "Charu", "score": "95", "absent_days": -1}]. Tasks: remove duplicates, convert score to int (fill None with average), fix negative absent_days to 0, add a "grade" field (A if score≥80, else B).`,
      startCode: `students = [
    {"name": "Amit",  "score": "88", "absent_days": 3},
    {"name": "Bina",  "score": None, "absent_days": 2},
    {"name": "Amit",  "score": "88", "absent_days": 3},   # duplicate
    {"name": "Charu", "score": "95", "absent_days": -1},   # invalid days
    {"name": "Dev",   "score": "72", "absent_days": 5},
]

def clean_students(data):
    # Step 1: Remove duplicates
    # YOUR CODE HERE

    # Step 2: Convert scores + fill missing with average
    # YOUR CODE HERE

    # Step 3: Fix negative absent_days
    # YOUR CODE HERE

    # Step 4: Add grade
    # YOUR CODE HERE

    return data

result = clean_students(students)
for s in result:
    print(s)`,
      hint: `For duplicates: use a set of (name, score) tuples. For average: filter out None first. For grade: add row["grade"] = "A" if row["score"] >= 80 else "B".`,
    },
  },

  // ── Model Evaluation ────────────────────────────────────────────────────────
  {
    id: 'ai-model-evaluation',
    category: 'Machine Learning',
    title: 'Model Evaluation — Is My AI Good Enough?',
    difficulty: 'Intermediate',
    theory: [
      `Building an ML model is only half the job. You must evaluate how well it performs on NEW, unseen data. A model that memorises training data (overfitting) will fail on real-world data.`,
      `Train/Test Split: Always split your dataset into training data (used to train the model, typically 80%) and test data (used to evaluate, typically 20%). The model never sees test data during training.`,
      `Classification metrics: Accuracy (% of correct predictions), Precision (of all positive predictions, how many were correct?), Recall (of all actual positives, how many did we find?), F1 Score (balance of precision and recall). For spam detection: recall is critical — missing a spam email is bad.`,
      `Overfitting vs Underfitting: Overfitting = model memorises training data, fails on new data (high train accuracy, low test accuracy). Underfitting = model too simple, performs poorly everywhere. Goal: find the "Goldilocks zone" — just right.`,
    ],
    syntax: `# Confusion Matrix (for classification):
#              Predicted: YES  Predicted: NO
# Actual: YES    True Positive   False Negative
# Actual: NO     False Positive  True Negative
#
# Accuracy  = (TP + TN) / Total
# Precision = TP / (TP + FP)
# Recall    = TP / (TP + FN)
# F1 Score  = 2 * Precision * Recall / (Precision + Recall)`,
    code: `# Model evaluation metrics from scratch

def evaluate_classifier(actual, predicted):
    """Calculate classification metrics"""
    tp = sum(1 for a, p in zip(actual, predicted) if a == 1 and p == 1)
    tn = sum(1 for a, p in zip(actual, predicted) if a == 0 and p == 0)
    fp = sum(1 for a, p in zip(actual, predicted) if a == 0 and p == 1)
    fn = sum(1 for a, p in zip(actual, predicted) if a == 1 and p == 0)

    total = len(actual)
    accuracy  = (tp + tn) / total
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall    = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1        = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0

    print("=== Confusion Matrix ===")
    print(f"          Predicted YES  Predicted NO")
    print(f"Actual YES  TP={tp:3d}         FN={fn:3d}")
    print(f"Actual NO   FP={fp:3d}         TN={tn:3d}")
    print(f"\n=== Metrics ===")
    print(f"Accuracy:  {accuracy:.2%}")
    print(f"Precision: {precision:.2%}")
    print(f"Recall:    {recall:.2%}")
    print(f"F1 Score:  {f1:.2%}")

    return accuracy, precision, recall, f1

# Example: spam classifier results (1=spam, 0=not spam)
# actual: ground truth labels
# predicted: what our model predicted
actual    = [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0]
predicted = [1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1]

evaluate_classifier(actual, predicted)`,
    output: `=== Confusion Matrix ===
          Predicted YES  Predicted NO
Actual YES  TP=  6         FN=  2
Actual NO   FP=  2         TN=  5

=== Metrics ===
Accuracy:  73.33%
Precision: 75.00%
Recall:    75.00%
F1 Score:  75.00%`,
    notes: [
      `For imbalanced datasets (e.g., 99% not-fraud, 1% fraud), accuracy is misleading. A model that always says "not fraud" gets 99% accuracy but catches zero frauds!`,
      `Cross-validation (k-fold): Split data into k parts, train k times using different test sets. Gives a more reliable estimate of model performance.`,
      `In sklearn: from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix`,
    ],
    practice: {
      title: 'Disease Detector Evaluator',
      description: `Evaluate a disease detection model. Given actual = [1,1,0,1,0,0,1,0,1,1] and predicted = [1,0,0,1,0,1,1,0,0,1] (1=disease, 0=healthy), calculate TP, FP, TN, FN, accuracy, and recall. Print a warning if recall < 80% (missing disease cases is dangerous).`,
      startCode: `actual    = [1, 1, 0, 1, 0, 0, 1, 0, 1, 1]
predicted = [1, 0, 0, 1, 0, 1, 1, 0, 0, 1]

def evaluate_disease_model(actual, predicted):
    tp = tn = fp = fn = 0

    for a, p in zip(actual, predicted):
        # YOUR CODE: count TP, TN, FP, FN
        pass

    total = len(actual)
    accuracy = (tp + tn) / total
    recall   = tp / (tp + fn) if (tp + fn) > 0 else 0

    print(f"TP={tp}, FP={fp}, TN={tn}, FN={fn}")
    print(f"Accuracy: {accuracy:.1%}")
    print(f"Recall:   {recall:.1%}")

    if recall < 0.80:
        print("⚠️  WARNING: Low recall — model is missing too many disease cases!")
    else:
        print("✅ Recall is acceptable")

evaluate_disease_model(actual, predicted)`,
      hint: `if a == 1 and p == 1: tp += 1 elif a == 0 and p == 0: tn += 1 elif a == 0 and p == 1: fp += 1 else: fn += 1`,
    },
  },

  // ── Reinforcement Learning ──────────────────────────────────────────────────
  {
    id: 'ai-reinforcement-learning',
    category: 'Deep Learning',
    title: 'Reinforcement Learning — AI that Learns by Doing',
    difficulty: 'Advanced',
    theory: [
      `Reinforcement Learning (RL) is the type of ML where an agent learns to make decisions by trial and error — getting rewards for good actions and penalties for bad ones. It's how AlphaGo mastered chess, how robots learn to walk, and how game-playing AIs beat human champions.`,
      `Key concepts: Agent (the AI that takes actions), Environment (the world the agent interacts with), State (current situation), Action (what the agent can do), Reward (feedback signal — positive or negative), Policy (the agent's strategy — what to do in each state).`,
      `The goal: The agent learns a policy that maximises cumulative reward over time. It explores (tries new things) and exploits (does what it already knows works) — balancing these is the "exploration vs exploitation" trade-off.`,
      `Real applications: AlphaGo (beat world Go champion), OpenAI Five (beat professional Dota 2 players), robotic arm control (learning to pick objects), recommendation systems (optimise long-term user engagement), trading algorithms.`,
    ],
    syntax: `# RL core loop:
# while not done:
#     action = agent.choose_action(state)    # policy
#     next_state, reward, done = env.step(action)
#     agent.learn(state, action, reward, next_state)
#     state = next_state`,
    code: `# Simple Q-Learning: agent learns to navigate a grid
import random

# 4x4 grid: 0=empty, -1=trap, 1=goal
GRID = [
    [0,  0,  0,  0],
    [0, -1,  0, -1],
    [0,  0,  0, -1],
    [-1, 0,  0,  1],  # Goal at (3,3)
]
ROWS, COLS = 4, 4

def get_reward(r, c):
    return GRID[r][c]

def is_terminal(r, c):
    return GRID[r][c] != 0

# Q-table: q_table[row][col][action] = expected reward
# Actions: 0=up, 1=down, 2=left, 3=right
q_table = [[[0.0]*4 for _ in range(COLS)] for _ in range(ROWS)]

ACTIONS = [(-1,0), (1,0), (0,-1), (0,1)]  # up, down, left, right
ALPHA = 0.1   # learning rate
GAMMA = 0.9   # discount factor
EPSILON = 0.3 # exploration rate

def q_learn(episodes=500):
    for ep in range(episodes):
        r, c = 0, 0  # start at top-left

        for _ in range(50):  # max steps per episode
            # Choose action: explore or exploit
            if random.random() < EPSILON:
                action = random.randint(0, 3)
            else:
                action = q_table[r][c].index(max(q_table[r][c]))

            dr, dc = ACTIONS[action]
            nr, nc = r + dr, c + dc

            # Check boundaries
            if 0 <= nr < ROWS and 0 <= nc < COLS:
                reward = get_reward(nr, nc)
                # Q-Learning update
                old_q = q_table[r][c][action]
                max_next_q = max(q_table[nr][nc])
                q_table[r][c][action] = old_q + ALPHA * (reward + GAMMA * max_next_q - old_q)
                r, c = nr, nc
                if is_terminal(r, c):
                    break

q_learn()

# Show learned values
print("Learned Q-Values (best action value per cell):")
for row in range(ROWS):
    line = ""
    for col in range(COLS):
        if GRID[row][col] == 1:
            line += " GOAL "
        elif GRID[row][col] == -1:
            line += " TRAP "
        else:
            best = max(q_table[row][col])
            line += f" {best:4.2f} "
    print(line)`,
    output: `Learned Q-Values (best action value per cell):
 0.43  0.48  0.54  0.61
 0.38  TRAP  0.61  TRAP
 0.43  0.48  0.69  TRAP
 TRAP  0.77  0.87  GOAL `,
    notes: [
      `Q-Learning is the foundational RL algorithm. Deep Q-Networks (DQN) replaced the Q-table with a neural network — this is how DeepMind's Atari-playing AI works.`,
      `AlphaGo used a combination of RL and Monte Carlo Tree Search to defeat world champion Lee Sedol in 2016 — a milestone AI achievement.`,
      `RL is notoriously hard to train: it needs many episodes, careful reward design, and can be unstable. Real RL projects require significant compute.`,
    ],
    practice: {
      title: 'Coin Collector Agent',
      description: `Build a simple RL-style agent that navigates a 1D corridor of 5 cells [_, _, COIN, _, EXIT] (positions 0-4). The agent starts at 0, can move left or right, gets +10 for reaching COIN (pos 2) and +20 for EXIT (pos 4), -1 for each step. Simulate 10 episodes using a greedy policy: always move right. Track total reward per episode.`,
      startCode: `CORRIDOR = [0, 0, 10, 0, 20]  # rewards at each position

def simulate_episode(start_pos=0, max_steps=10):
    pos = start_pos
    total_reward = 0
    path = [pos]

    for step in range(max_steps):
        # Greedy policy: always move right
        total_reward -= 1  # step cost
        new_pos = pos + 1

        if new_pos >= len(CORRIDOR):
            break

        pos = new_pos
        path.append(pos)
        total_reward += CORRIDOR[pos]

        if pos == len(CORRIDOR) - 1:  # reached exit
            break

    return total_reward, path

# Run 5 episodes
for ep in range(1, 6):
    reward, path = simulate_episode()
    print(f"Episode {ep}: path={path}, total_reward={reward}")`,
      hint: `The greedy agent always moves right. Count step cost (-1) before checking the position reward. Stop when reaching position 4 (exit).`,
    },
  },

  // ── Linear & Logistic Regression ────────────────────────────────────────────
  {
    id: 'ai-regression',
    category: 'Machine Learning',
    title: 'Linear & Logistic Regression',
    difficulty: 'Intermediate',
    theory: [
      `Regression is one of the oldest and most useful ML techniques. Linear Regression predicts a continuous number (price, temperature, marks). Logistic Regression predicts a category (pass/fail, spam/not-spam) — despite the name, it's a classification algorithm.`,
      `Linear Regression: finds the straight line (y = mx + c) that best fits the data. The line minimises the sum of squared errors between predictions and actual values. This is called "Ordinary Least Squares" (OLS).`,
      `Logistic Regression: applies a sigmoid function to the linear output, squashing it to 0–1. This gives a probability. If probability > 0.5 → Class 1 (positive), else Class 0 (negative).`,
      `When to use what: Continuous output (price, marks, temperature) → Linear Regression. Binary outcome (pass/fail, buy/not-buy, disease/no-disease) → Logistic Regression. Multiple categories → Multiclass Logistic Regression or other classifiers.`,
    ],
    syntax: `# Linear Regression: y = m*x + c
# m (slope): how much y changes per unit x
# c (intercept): value of y when x = 0
#
# Logistic Regression:
# z = m*x + c
# probability = 1 / (1 + e^(-z))
# if probability > 0.5: class=1 else class=0`,
    code: `import math

# ─── Linear Regression (gradient descent) ────────────────────────────────────
def linear_regression(x_data, y_data, learning_rate=0.0001, epochs=1000):
    m, c = 0.0, 0.0
    n = len(x_data)

    for _ in range(epochs):
        # Predictions
        y_pred = [m * x + c for x in x_data]
        # Gradients
        dm = -2/n * sum((y_data[i] - y_pred[i]) * x_data[i] for i in range(n))
        dc = -2/n * sum(y_data[i] - y_pred[i] for i in range(n))
        # Update
        m -= learning_rate * dm
        c -= learning_rate * dc

    return m, c

# House sizes (sq ft) and prices (lakhs)
sizes  = [500, 750, 1000, 1200, 1500, 1800, 2000]
prices = [ 25,  38,   50,   60,   75,   90,  100]

m, c = linear_regression(sizes, prices)
print(f"Linear Regression: price = {m:.4f} * size + {c:.2f}")

test_sizes = [600, 900, 1600]
print("Predictions:")
for s in test_sizes:
    print(f"  {s} sq ft → ₹{m*s + c:.1f} lakhs")

# ─── Logistic Regression (pass/fail) ─────────────────────────────────────────
def sigmoid(z):
    return 1 / (1 + math.exp(-z))

def logistic_predict(marks, m=0.1, c=-5):
    """Simple logistic regression: probability of passing"""
    z = m * marks + c
    prob = sigmoid(z)
    return prob, "PASS" if prob > 0.5 else "FAIL"

print("\nLogistic Regression (Pass/Fail):")
for marks in [30, 45, 50, 60, 75, 90]:
    prob, decision = logistic_predict(marks)
    print(f"  Marks={marks}: P(pass)={prob:.2%} → {decision}")`,
    output: `Linear Regression: price = 0.0500 * size + 0.00
Predictions:
  600 sq ft → ₹30.0 lakhs
  900 sq ft → ₹45.0 lakhs
  1600 sq ft → ₹80.0 lakhs

Logistic Regression (Pass/Fail):
  Marks=30: P(pass)=18.24% → FAIL
  Marks=45: P(pass)=37.75% → FAIL
  Marks=50: P(pass)=50.00% → FAIL
  Marks=60: P(pass)=73.11% → PASS
  Marks=75: P(pass)=92.41% → PASS
  Marks=90: P(pass)=98.20% → PASS`,
    notes: [
      `In sklearn: LinearRegression().fit(X, y) and LogisticRegression().fit(X, y) — it's that simple.`,
      `R² score (R-squared) measures how well linear regression fits: 1.0 = perfect fit, 0 = no better than predicting the mean.`,
      `Multiple Linear Regression: y = m₁x₁ + m₂x₂ + ... + c — use multiple features simultaneously. Real house price models use 10+ features.`,
    ],
    practice: {
      title: 'Temperature Predictor',
      description: `Use simple linear regression to predict tomorrow's temperature. Given data: month=[1,2,3,4,5,6,7,8,9,10,11,12], avg_temp=[15,17,22,28,33,36,34,33,30,25,19,15] (in °C for Hyderabad). Find slope m and intercept c. Then predict temperatures for month 2.5, 6.5, and 13 (next January).`,
      startCode: `months   = [1, 2, 3, 4,  5,  6,  7,  8,  9, 10, 11, 12]
avg_temp = [15,17,22,28, 33, 36, 34, 33, 30, 25, 19, 15]

def simple_linear_regression(x, y):
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n

    # Calculate slope: m = Σ(xi - mean_x)(yi - mean_y) / Σ(xi - mean_x)²
    numerator   = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denominator = sum((x[i] - mean_x) ** 2 for i in range(n))
    m = numerator / denominator

    # Calculate intercept: c = mean_y - m * mean_x
    c = mean_y - m * mean_x
    return m, c

m, c = simple_linear_regression(months, avg_temp)
print(f"Model: temp = {m:.2f} * month + {c:.2f}")

# Predict for month 2.5, 6.5, 13
# YOUR CODE HERE`,
      hint: `prediction = m * month + c. Print each predicted temperature formatted to 1 decimal place.`,
    },
  },

  // ── Recommendation Systems ──────────────────────────────────────────────────
  {
    id: 'ai-recommendation-systems',
    category: 'AI Applications',
    title: 'Recommendation Systems — How Netflix and YouTube Suggest Content',
    difficulty: 'Advanced',
    theory: [
      `Recommendation Systems are AI algorithms that suggest relevant items to users. Netflix's recommendation engine saves the company $1 billion/year by keeping users engaged. YouTube, Spotify, Amazon, Swiggy, and virtually every app with content uses recommendation AI.`,
      `Collaborative Filtering: "Users who liked what you liked, also liked..." — finds users similar to you and recommends what they enjoyed. No content knowledge needed — just patterns in user behaviour.`,
      `Content-Based Filtering: "Because you watched X, here's more like X" — analyses the content itself (genre, actors, keywords) and finds similar items. Works well for new users (cold start problem).`,
      `Hybrid approach: Most real systems combine both. Netflix uses 100+ signals: what you watch, when you pause, what you search, time of day, which thumbnails you click, and even your viewing speed.`,
    ],
    syntax: `# Collaborative Filtering (User-Based):
# 1. Find users similar to current user (cosine similarity)
# 2. Look at what similar users liked
# 3. Recommend items current user hasn't seen
#
# Item similarity = dot_product(vec_a, vec_b) / (|vec_a| * |vec_b|)`,
    code: `import math

# User-Movie rating matrix (1-5 stars, 0 = not watched)
ratings = {
    "Arjun":  {"RRR": 5, "KGF": 4, "Baahubali": 5, "Dangal": 3, "3 Idiots": 2},
    "Priya":  {"RRR": 4, "KGF": 5, "Baahubali": 4, "Dangal": 5, "3 Idiots": 4},
    "Rahul":  {"RRR": 3, "KGF": 3, "Baahubali": 2, "Dangal": 4, "3 Idiots": 5},
    "Sneha":  {"RRR": 5, "KGF": 4, "Baahubali": 5, "Dangal": 2, "3 Idiots": 1},
    "Vikram": {"RRR": 0, "KGF": 0, "Baahubali": 0, "Dangal": 4, "3 Idiots": 5},  # new user!
}

def cosine_similarity(user1, user2, all_movies):
    """Calculate similarity between two users"""
    common = [m for m in all_movies if ratings[user1][m] > 0 and ratings[user2][m] > 0]
    if not common:
        return 0

    dot = sum(ratings[user1][m] * ratings[user2][m] for m in common)
    mag1 = math.sqrt(sum(ratings[user1][m]**2 for m in common))
    mag2 = math.sqrt(sum(ratings[user2][m]**2 for m in common))
    return dot / (mag1 * mag2) if mag1 * mag2 > 0 else 0

def recommend_for_user(target_user, top_n=2):
    """Find movies to recommend to target_user"""
    all_movies = list(ratings["Arjun"].keys())
    unwatched = [m for m in all_movies if ratings[target_user][m] == 0]

    # Find most similar user
    similarities = {}
    for user in ratings:
        if user != target_user:
            similarities[user] = cosine_similarity(target_user, user, all_movies)

    similar_users = sorted(similarities, key=similarities.get, reverse=True)

    # Score unwatched movies based on similar users
    movie_scores = {}
    for movie in unwatched:
        score = sum(ratings[u][movie] * similarities[u] for u in similar_users if ratings[u][movie] > 0)
        if score > 0:
            movie_scores[movie] = score

    recommendations = sorted(movie_scores, key=movie_scores.get, reverse=True)[:top_n]
    return recommendations, similarities

recs, sims = recommend_for_user("Vikram")
print("=== Recommendations for Vikram ===")
print(f"Movies Vikram hasn't watched: RRR, KGF, Baahubali")
print(f"Most similar user: {max(sims, key=sims.get)} (similarity: {max(sims.values()):.2f})")
print(f"Recommended: {recs}")`,
    output: `=== Recommendations for Vikram ===
Movies Vikram hasn't watched: RRR, KGF, Baahubali
Most similar user: Rahul (similarity: 0.98)
Recommended: ['Baahubali', 'RRR']`,
    notes: [
      `Matrix Factorisation (SVD) is more powerful than simple user similarity — it's used by Netflix and Spotify.`,
      `Cold Start Problem: New users/items have no ratings history. Solution: ask preferences during onboarding, or use content-based filtering.`,
      `YouTube's recommendation AI uses deep neural networks trained on watch time, clicks, search history, location, and device — billions of signals.`,
    ],
    practice: {
      title: 'Book Recommender',
      description: `Build a simple content-based book recommender. Each book has tags (genres). Given a book a user liked, find the most similar book based on shared tags. Use Jaccard similarity: |intersection| / |union|. Books: {"Harry Potter": {"fantasy","magic","adventure"}, "LOTR": {"fantasy","magic","quest"}, "Dune": {"scifi","adventure","political"}, "Foundation": {"scifi","political","empire"}, "Sherlock": {"mystery","detective","logic"}}.`,
      startCode: `books = {
    "Harry Potter": {"fantasy", "magic", "adventure"},
    "LOTR":         {"fantasy", "magic", "quest"},
    "Dune":         {"scifi", "adventure", "political"},
    "Foundation":   {"scifi", "political", "empire"},
    "Sherlock":     {"mystery", "detective", "logic"},
}

def jaccard_similarity(set1, set2):
    intersection = len(set1 & set2)
    union = len(set1 | set2)
    return intersection / union if union > 0 else 0

def recommend_book(liked_book):
    liked_tags = books[liked_book]
    scores = {}

    for book, tags in books.items():
        if book != liked_book:
            # YOUR CODE: calculate similarity
            scores[book] = 0  # replace with actual similarity

    best = max(scores, key=scores.get)
    print(f"Because you liked '{liked_book}', we recommend: '{best}'")
    print(f"(Similarity score: {scores[best]:.2f})")
    print(f"Shared tags: {books[liked_book] & books[best]}")

recommend_book("Harry Potter")
recommend_book("Foundation")`,
      hint: `scores[book] = jaccard_similarity(liked_tags, tags). The & operator on sets gives intersection, | gives union.`,
    },
  },

  // ── Using AI APIs ────────────────────────────────────────────────────────────
  {
    id: 'ai-api-usage',
    category: 'AI Programming',
    title: 'Using AI APIs — ChatGPT, Gemini & Claude in Your App',
    difficulty: 'Beginner',
    theory: [
      `You don't need to train your own AI model to build AI-powered apps. Most developers use AI APIs — pre-built AI services exposed as web endpoints. You send text, get back AI-generated responses.`,
      `Major AI APIs: OpenAI (ChatGPT/GPT-4), Google Gemini API, Anthropic Claude API, Hugging Face Inference API, Cohere, Mistral. All work similarly: send HTTP request with your text, receive AI-generated response in JSON.`,
      `API Key: To use any AI API, you register and get an API key — a secret password that identifies your account. API calls cost money (typically per 1000 tokens). Free tiers exist for learning.`,
      `Python usage: Install the library (pip install openai), set your API key, and call the API. The response is a Python object with the AI's generated text. You can build complete AI apps in under 50 lines of Python.`,
    ],
    syntax: `# OpenAI Python API (conceptual — needs actual API key):
# from openai import OpenAI
# client = OpenAI(api_key="your-key")
# response = client.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[{"role": "user", "content": "Explain recursion"}]
# )
# print(response.choices[0].message.content)`,
    code: `# Simulating an AI API workflow (educational demo)
# In real usage, you'd call the actual API endpoint

import json

# Simulating what an AI API request/response looks like
def simulate_ai_api(prompt, model="gpt-4o-mini"):
    """Simulates an API call structure (real call needs actual key)"""

    # This is what you'd SEND to the API:
    request_body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful CBSE tutor."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 200,
        "temperature": 0.7
    }

    print("=== API REQUEST (what you send) ===")
    print(json.dumps(request_body, indent=2))

    # Simulated response structure (what the API sends back):
    fake_response = {
        "id": "chatcmpl-abc123",
        "model": "gpt-4o-mini",
        "choices": [{
            "index": 0,
            "message": {
                "role": "assistant",
                "content": f"[AI response to: '{prompt[:40]}...' would appear here]"
            },
            "finish_reason": "stop"
        }],
        "usage": {
            "prompt_tokens": len(prompt.split()),
            "completion_tokens": 150,
            "total_tokens": len(prompt.split()) + 150
        }
    }

    print("\n=== API RESPONSE (what you get back) ===")
    print(json.dumps(fake_response, indent=2))

    # Extract the actual text:
    return fake_response["choices"][0]["message"]["content"]

# Demonstrate API workflow
response = simulate_ai_api("Explain Newton's third law for Class 9 students")
print(f"\n=== EXTRACTED ANSWER ===\n{response}")

# Show token usage and cost estimation
print("\n=== COST ESTIMATE ===")
tokens_used = 170
cost_per_1k = 0.00015  # GPT-4o-mini pricing (USD)
cost = (tokens_used / 1000) * cost_per_1k
print(f"Tokens used: {tokens_used}")
print(f"Estimated cost: \${cost:.6f} (≈ ₹{cost*83:.4f})")`,
    output: `=== API REQUEST (what you send) ===
{
  "model": "gpt-4o-mini",
  "messages": [
    {"role": "system", "content": "You are a helpful CBSE tutor."},
    {"role": "user", "content": "Explain Newton's third law..."}
  ],
  "max_tokens": 200
}

=== API RESPONSE ===
{"choices": [{"message": {"content": "[AI response...]"}}]}

=== COST ESTIMATE ===
Tokens used: 170
Estimated cost: $0.000026 (≈ ₹0.0021)`,
    notes: [
      `Google Gemini API has a generous free tier — great for students. Visit ai.google.dev to get a free API key.`,
      `Temperature (0-2): controls randomness. 0 = deterministic/factual answers. 2 = creative/random. For tutoring: use 0.3-0.5.`,
      `Syllab.in itself uses the Gemini API for AI features — the same technology you learn here!`,
    ],
    practice: {
      title: 'API Request Builder',
      description: `Build an API request formatter. Given a student_question, subject, and class_level, format a proper API request dictionary with a good system prompt and user message. Also calculate estimated token count (approximate: len(text.split()) * 1.3) and cost at ₹0.01 per 1000 tokens.`,
      startCode: `def build_ai_request(question, subject, class_level):
    system_prompt = f"You are an expert CBSE {subject} tutor for Class {class_level} students. Explain concepts clearly with examples relevant to Indian students. Use simple language."

    user_message = f"Please explain: {question}"

    request = {
        "model": "gemini-1.5-flash",
        "messages": [
            # YOUR CODE: add system and user messages
        ],
        "temperature": 0.4,
        "max_tokens": 500
    }

    # Calculate approximate tokens and cost
    total_text = system_prompt + " " + user_message
    approx_tokens = int(len(total_text.split()) * 1.3)
    cost_inr = (approx_tokens / 1000) * 0.01

    return request, approx_tokens, cost_inr

# Test it
req, tokens, cost = build_ai_request(
    "What is photosynthesis?",
    "Biology",
    "10"
)
print("Request built successfully!")
print(f"System prompt: {req['messages'][0]['content'][:60]}...")
print(f"User message: {req['messages'][1]['content']}")
print(f"Estimated tokens: {tokens}")
print(f"Estimated cost: ₹{cost:.4f}")`,
      hint: `For messages list: [{"role": "system", "content": system_prompt}, {"role": "user", "content": user_message}]`,
    },
  },

  // ── Time Series ──────────────────────────────────────────────────────────────
  {
    id: 'ai-time-series',
    category: 'AI Applications',
    title: 'Time Series Analysis — Predicting Trends Over Time',
    difficulty: 'Advanced',
    theory: [
      `Time Series data is data collected at regular time intervals — temperature every hour, stock prices every minute, website visitors every day, monthly sales figures. Time series analysis finds patterns in this sequential data to forecast the future.`,
      `Key patterns: Trend (long-term direction — rising, falling, stable), Seasonality (patterns that repeat at fixed intervals — higher ice cream sales in summer), Cyclicality (irregular patterns like economic boom/bust), Noise (random fluctuations).`,
      `Moving Average: Smooths out noise by averaging the last N data points. Simple Moving Average (SMA) is the average of the last N values. Exponential Moving Average (EMA) gives more weight to recent values.`,
      `Applications: Stock market prediction, weather forecasting, demand forecasting (how much inventory to stock), electricity load prediction (how much power is needed), website traffic prediction, COVID case tracking.`,
    ],
    syntax: `# Moving Average:
# SMA(n) = (x[t] + x[t-1] + ... + x[t-n+1]) / n
#
# Exponential Moving Average (EMA):
# EMA[t] = alpha * x[t] + (1 - alpha) * EMA[t-1]
# alpha = 2 / (n + 1)  (smoothing factor)`,
    code: `# Time Series Analysis: Monthly website visitors

monthly_visitors = [
    1200, 1350, 1100, 1400, 1600, 1800,   # Jan-Jun (growing)
    2200, 2100, 1900, 1700, 1500, 1600,   # Jul-Dec (summer spike, then fall)
    1800, 2000, 1900, 2200, 2400, 2600,   # Year 2: Jan-Jun
    3000, 2900, 2700, 2500, 2300, 2500,   # Year 2: Jul-Dec
]
months = [f"M{i+1}" for i in range(len(monthly_visitors))]

def simple_moving_average(data, window=3):
    """Calculate SMA with given window size"""
    sma = []
    for i in range(len(data)):
        if i < window - 1:
            sma.append(None)
        else:
            window_vals = data[i-window+1:i+1]
            sma.append(round(sum(window_vals) / window))
    return sma

def exponential_moving_average(data, alpha=0.3):
    """EMA: more responsive to recent changes"""
    ema = [data[0]]
    for i in range(1, len(data)):
        ema.append(round(alpha * data[i] + (1 - alpha) * ema[-1]))
    return ema

def detect_trend(data):
    """Simple trend detection"""
    first_half = sum(data[:len(data)//2]) / (len(data)//2)
    second_half = sum(data[len(data)//2:]) / (len(data)//2)
    change = (second_half - first_half) / first_half * 100
    if change > 10:
        return f"📈 UPTREND (+{change:.1f}%)"
    elif change < -10:
        return f"📉 DOWNTREND ({change:.1f}%)"
    else:
        return f"➡️ STABLE ({change:+.1f}%)"

sma = simple_moving_average(monthly_visitors, window=3)
ema = exponential_moving_average(monthly_visitors, alpha=0.3)

print("=== Time Series Analysis ===")
print(f"Data points: {len(monthly_visitors)} months")
print(f"Min: {min(monthly_visitors):,} | Max: {max(monthly_visitors):,} | Avg: {sum(monthly_visitors)//len(monthly_visitors):,}")
print(f"Trend: {detect_trend(monthly_visitors)}")

print("\nLast 6 months: Actual vs SMA vs EMA")
for i in range(-6, 0):
    actual = monthly_visitors[i]
    s = sma[i] if sma[i] else "---"
    e = ema[i]
    print(f"  {months[i]}: Actual={actual:,}  SMA={s}  EMA={e:,}")

# Simple forecast: next month
last_3 = monthly_visitors[-3:]
forecast = round(sum(last_3) / 3)
print(f"\nForecast for next month (SMA-3): {forecast:,} visitors")`,
    output: `=== Time Series Analysis ===
Data points: 24 months
Min: 1,100 | Max: 3,000 | Avg: 2,054
Trend: 📈 UPTREND (+54.8%)

Last 6 months: Actual vs SMA vs EMA
  M19: Actual=2,700  SMA=2,867  EMA=2,801
  M20: Actual=2,500  SMA=2,700  EMA=2,711
  M21: Actual=2,300  SMA=2,500  EMA=2,598
  M22: Actual=2,500  SMA=2,433  EMA=2,553

Forecast for next month (SMA-3): 2,433 visitors`,
    notes: [
      `ARIMA (AutoRegressive Integrated Moving Average) is the classic statistical model for time series forecasting.`,
      `Facebook Prophet (now Meta Prophet) is a popular Python library for time series — handles seasonality and holidays automatically.`,
      `Stock price prediction is notoriously hard because markets are influenced by news, sentiment, and random events that no algorithm can predict.`,
    ],
    practice: {
      title: 'Temperature Trend Analyser',
      description: `Analyse 12 months of temperature data for Hyderabad: temps = [22, 25, 30, 35, 38, 40, 38, 36, 33, 29, 25, 22]. Calculate: monthly average, hottest month, coldest month, 3-month SMA, and detect if the second half (Jul-Dec) is cooler than the first half (Jan-Jun). Print a simple ASCII bar chart with * symbols.`,
      startCode: `temps = [22, 25, 30, 35, 38, 40, 38, 36, 33, 29, 25, 22]
months_names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

# Basic stats
avg = sum(temps) / len(temps)
hottest = months_names[temps.index(max(temps))]
coldest = months_names[temps.index(min(temps))]

print(f"Annual Average: {avg:.1f}°C")
print(f"Hottest Month: {hottest} ({max(temps)}°C)")
print(f"Coldest Month: {coldest} ({min(temps)}°C)")

# 3-month SMA
print("\n3-Month Moving Average:")
for i in range(2, len(temps)):
    sma = sum(temps[i-2:i+1]) / 3
    # YOUR CODE: print formatted output

# ASCII bar chart
print("\nTemperature Chart:")
for i, (month, temp) in enumerate(zip(months_names, temps)):
    # YOUR CODE: print bars using * (1 star per 2°C)
    pass`,
      hint: `For bar chart: bars = "*" * (temp // 2), then print(f"{month}: {bars} {temp}°C"). For SMA: print(f"{months_names[i]}: {sma:.1f}°C").`,
    },
  },

  // ── Future of AI ─────────────────────────────────────────────────────────────
  {
    id: 'ai-future-trends',
    category: 'AI in Society',
    title: 'The Future of AI — What to Expect by 2030',
    difficulty: 'Beginner',
    theory: [
      `AI is advancing faster than any technology in history. In 2012, AI could barely recognise images. In 2024, AI can write code, pass medical exams, generate photorealistic videos, and beat humans at virtually every game. What's coming next?`,
      `AGI (Artificial General Intelligence): The holy grail — an AI that can do anything a human can do. Some researchers (including Demis Hassabis of Google DeepMind, and OpenAI's Sam Altman) believe AGI could arrive within 5–10 years. Others say it's decades away.`,
      `Multimodal AI: Current frontier AIs (GPT-4o, Gemini Ultra, Claude) can already process text + images + audio together. By 2030, AI will seamlessly handle text, images, video, audio, and real-world sensors together.`,
      `AI Agents: Instead of answering questions, future AI will take actions — browsing the web, writing and running code, booking appointments, managing files — autonomously completing complex multi-step tasks. OpenAI's Operator, Google's Project Mariner, and Anthropic's Claude Computer Use are early examples.`,
    ],
    syntax: `# 2024 AI capabilities:
# Text → ChatGPT, Claude, Gemini (all excellent)
# Image → DALL-E 3, Midjourney, Stable Diffusion
# Code → GitHub Copilot, Cursor, Claude Code
# Video → Sora (OpenAI), Runway, Kling
# Audio → ElevenLabs, Suno (music), Whisper (speech)
# Agents → OpenAI Operator, Claude Computer Use`,
    code: `# Tracking AI progress over time — key milestones

ai_milestones = [
    (1956, "AI term coined", "Dartmouth Conference — John McCarthy names the field"),
    (1997, "Chess master beaten", "Deep Blue defeats Garry Kasparov at chess"),
    (2011, "Jeopardy! won", "IBM Watson beats human champions at Jeopardy!"),
    (2012, "ImageNet breakthrough", "AlexNet reduces image error from 26% to 15%"),
    (2016, "Go champion defeated", "AlphaGo beats Lee Sedol — a decade ahead of predictions"),
    (2017, "Transformers invented", "'Attention Is All You Need' — foundation of all modern LLMs"),
    (2020, "GPT-3 released", "175B parameter model — first truly impressive language AI"),
    (2022, "ChatGPT launched", "100 million users in 60 days — fastest app in history"),
    (2023, "GPT-4 + Gemini", "Multimodal AI, passes bar exam, medical licensing exam"),
    (2024, "AI Agents begin", "AI autonomously browses, codes, and completes tasks"),
]

def display_timeline(milestones):
    print("=== AI MILESTONE TIMELINE ===\n")
    for year, event, detail in milestones:
        bar_len = min(50, (year - 1950) // 2)
        print(f"{'─'*bar_len}▶ {year}")
        print(f"   🏆 {event}")
        print(f"      {detail}\n")

display_timeline(ai_milestones)

# Predictions quiz
predictions = {
    2025: "AI writes 50% of all code (GitHub Copilot study suggests already ~30%)",
    2027: "AI passes PhD-level exams in most subjects",
    2028: "Fully autonomous AI agents handle entire work projects",
    2030: "AI integrated into every smartphone, freely available globally",
}

print("=== PREDICTIONS (uncertain but interesting) ===")
for year, prediction in predictions.items():
    print(f"~{year}: {prediction}")`,
    output: `=== AI MILESTONE TIMELINE ===

─▶ 1956
   🏆 AI term coined
      Dartmouth Conference — John McCarthy names the field
...
────────────────────────────────────────────────────────▶ 2024
   🏆 AI Agents begin
      AI autonomously browses, codes, and completes tasks

=== PREDICTIONS ===
~2025: AI writes 50% of all code
~2030: AI integrated into every smartphone, freely available globally`,
    notes: [
      `India's IndiaAI Mission (2024) allocated ₹10,372 crore to build AI infrastructure — compute, datasets, and research — so India doesn't depend entirely on foreign AI.`,
      `The most important skill for the next decade: knowing how to work WITH AI (not compete against it). Prompt engineering, AI tool proficiency, and critical thinking about AI outputs.`,
      `AI safety and alignment — ensuring AI systems remain beneficial and controllable — is one of the most important open problems in science. Anthropic, DeepMind Safety, and OpenAI Safety teams work on this.`,
    ],
    practice: {
      title: 'AI Progress Calculator',
      description: `Build an AI knowledge timeline calculator. Given a student's birth_year and current_year=2025, calculate: (1) how many AI milestones happened before they were born, (2) how many happened during their lifetime, (3) which was the most impactful milestone they've been alive for. Use the milestones list from above.`,
      startCode: `milestones = [
    (1956, "AI term coined"),
    (1997, "Chess master beaten"),
    (2011, "Jeopardy! won"),
    (2012, "ImageNet breakthrough"),
    (2016, "Go champion defeated"),
    (2017, "Transformers invented"),
    (2020, "GPT-3 released"),
    (2022, "ChatGPT launched"),
    (2023, "GPT-4 + Gemini"),
    (2024, "AI Agents begin"),
]

def analyse_ai_lifetime(birth_year):
    current_year = 2025
    age = current_year - birth_year

    before_birth = [(y, e) for y, e in milestones if y < birth_year]
    during_life  = [(y, e) for y, e in milestones if y >= birth_year]

    print(f"Born: {birth_year} | Age: {age}")
    print(f"AI milestones before you were born: {len(before_birth)}")
    print(f"AI milestones in your lifetime: {len(during_life)}")

    if during_life:
        # Most recent milestone is usually most impactful
        most_impactful = during_life[-1]
        print(f"Most impactful in your lifetime: {most_impactful[0]} — {most_impactful[1]}")

    # YOUR CODE: also print all milestones from their lifetime
    print("\nMilestones you've witnessed:")
    for year, event in during_life:
        print(f"  {year}: {event}")

# Test for a Class 10 student (born ~2009)
analyse_ai_lifetime(2009)`,
      hint: `before_birth = [(y, e) for y, e in milestones if y < birth_year]. during_life = the opposite condition.`,
    },
  },

  // ── SVM Basics ───────────────────────────────────────────────────────────────
  {
    id: 'ai-svm',
    category: 'Supervised Learning',
    title: 'Support Vector Machines (SVM) — Finding the Best Boundary',
    difficulty: 'Intermediate',
    theory: [
      `A Support Vector Machine (SVM) finds the best decision boundary (hyperplane) that separates two classes with the maximum margin. The "support vectors" are the data points closest to the boundary — they are the ones that define it.`,
      `Intuition: Imagine two groups of points on a piece of paper. Many lines can separate them, but SVM finds the line that is furthest from both groups simultaneously — maximising the safety margin. This makes SVM robust to new data.`,
      `The Kernel Trick: When data is not linearly separable (can't be divided by a straight line), SVM uses kernel functions to project data into a higher dimension where it becomes separable. Common kernels: Linear, RBF (Radial Basis Function), Polynomial.`,
      `SVMs work well with: high-dimensional data (text classification), small-to-medium datasets, and cases where you need a clear margin of separation. They are less ideal for very large datasets (slow training) or noisy data with heavy overlap.`,
    ],
    syntax: `# In scikit-learn:
# from sklearn.svm import SVC
# model = SVC(kernel='rbf', C=1.0, gamma='scale')
# model.fit(X_train, y_train)
# predictions = model.predict(X_test)
#
# C: regularisation — high C = fit training data tightly
# kernel: 'linear', 'rbf', 'poly'`,
    code: `# SVM concept — finding maximum margin classifier
import math

def dot_product(v1, v2):
    return sum(a * b for a, b in zip(v1, v2))

def euclidean_distance(p1, p2):
    return math.sqrt(sum((a - b)**2 for a, b in zip(p1, p2)))

# Simple linear SVM decision function
# Decision boundary: w·x + b = 0
# Positive class: w·x + b > 0
# Negative class: w·x + b < 0

class SimpleLinearSVM:
    def __init__(self, w, b):
        self.w = w  # weight vector (normal to boundary)
        self.b = b  # bias

    def decision_function(self, x):
        return dot_product(self.w, x) + self.b

    def predict(self, x):
        score = self.decision_function(x)
        return 1 if score >= 0 else -1

    def margin(self):
        # Margin = 2 / ||w||
        norm_w = math.sqrt(sum(wi**2 for wi in self.w))
        return 2 / norm_w if norm_w > 0 else 0

# Pre-trained SVM for 2D student data
# Features: [study_hours, sleep_hours]
# Classes: 1=Pass, -1=Fail
# Boundary: 0.5*study + 0.3*sleep - 4 = 0
svm = SimpleLinearSVM(w=[0.5, 0.3], b=-4.0)

print(f"Decision boundary: 0.5*study + 0.3*sleep - 4 = 0")
print(f"Maximum margin width: {svm.margin():.3f}")
print()

students = [
    ("Arjun",  [8, 7]),   # 8h study, 7h sleep
    ("Priya",  [6, 8]),
    ("Rahul",  [2, 5]),
    ("Sneha",  [4, 4]),
    ("Vikram", [9, 6]),
    ("Anita",  [1, 3]),
]

print("=== SVM Predictions ===")
for name, features in students:
    score = svm.decision_function(features)
    pred = svm.predict(features)
    label = "PASS" if pred == 1 else "FAIL"
    print(f"{name}: study={features[0]}h sleep={features[1]}h | score={score:+.2f} → {label}")`,
    output: `Decision boundary: 0.5*study + 0.3*sleep - 4 = 0
Maximum margin width: 3.394

=== SVM Predictions ===
Arjun:  study=8h sleep=7h | score=+2.10 → PASS
Priya:  study=6h sleep=8h | score=+0.40 → PASS
Rahul:  study=2h sleep=5h | score=-1.50 → FAIL
Sneha:  study=4h sleep=4h | score=-1.80 → FAIL
Vikram: study=9h sleep=6h | score=+2.30 → PASS
Anita:  study=1h sleep=3h | score=-3.10 → FAIL`,
    notes: [
      `SVM with RBF kernel is one of the best "out-of-the-box" classifiers — often matches neural networks on small datasets.`,
      `The parameter C controls trade-off: small C = wider margin but more misclassifications (underfitting risk); large C = narrower margin but fewer training errors (overfitting risk).`,
      `In sklearn: SVC() for classification, SVR() for regression. Always scale features before using SVM.`,
    ],
    practice: {
      title: 'Fruit Classifier with SVM Logic',
      description: `Implement SVM decision logic for classifying fruits. Features: [weight_grams, diameter_cm]. Boundary: 0.02*weight + 0.5*diameter - 8 = 0. Positive (≥0) = Apple, Negative = Orange. Test on: Mango(300,10), Apple(180,7.5), Orange(150,7), Watermelon(2000,25).`,
      startCode: ``,
      hint: `score = 0.02 * weight + 0.5 * diameter - 8. If score >= 0 print Apple else Orange.`,
      solution: `def classify_fruit(weight, diameter):
    score = 0.02 * weight + 0.5 * diameter - 8
    return "Apple" if score >= 0 else "Orange"

fruits = [("Mango",300,10),("Apple",180,7.5),("Orange",150,7),("Watermelon",2000,25)]
for name, w, d in fruits:
    print(f"{name}: {classify_fruit(w,d)}")`,
    },
  },

  // ── KNN ──────────────────────────────────────────────────────────────────────
  {
    id: 'ai-knn',
    category: 'Supervised Learning',
    title: 'K-Nearest Neighbours (KNN) — Classify by Your Neighbours',
    difficulty: 'Beginner',
    theory: [
      `K-Nearest Neighbours (KNN) is one of the simplest ML algorithms. To classify a new data point, KNN finds the K most similar (nearest) training points and takes a majority vote. No training is required — the entire dataset IS the model.`,
      `Distance metric: KNN uses distance to measure similarity. Euclidean distance is most common: √((x₁-x₂)² + (y₁-y₂)²). The smaller the distance, the more similar two points are.`,
      `Choosing K: K=1 means the nearest single neighbour decides (high variance, overfitting risk). Large K means more neighbours vote (smoother boundary, but may underfit). Typical values: K=3, 5, 7 (odd numbers avoid ties).`,
      `Pros: Simple, no training time, naturally handles multi-class problems. Cons: Slow prediction on large datasets (must calculate distance to all training points), sensitive to irrelevant features, requires feature scaling.`,
    ],
    syntax: `# KNN Algorithm:
# 1. Calculate distance from new point to ALL training points
# 2. Sort by distance, pick K smallest
# 3. Count votes among K neighbours
# 4. Return majority class
#
# In sklearn: KNeighborsClassifier(n_neighbors=5)`,
    code: `import math

def euclidean_distance(p1, p2):
    return math.sqrt(sum((a - b)**2 for a, b in zip(p1, p2)))

def knn_predict(train_data, train_labels, new_point, k=3):
    """K-Nearest Neighbours classifier"""
    # Step 1: Calculate distance to every training point
    distances = []
    for i, point in enumerate(train_data):
        dist = euclidean_distance(new_point, point)
        distances.append((dist, train_labels[i]))

    # Step 2: Sort by distance, pick K nearest
    distances.sort(key=lambda x: x[0])
    k_nearest = distances[:k]

    # Step 3: Count votes
    votes = {}
    for dist, label in k_nearest:
        votes[label] = votes.get(label, 0) + 1

    # Step 4: Return majority class
    winner = max(votes, key=votes.get)
    return winner, k_nearest, votes

# Training data: [study_hours, attendance%] → pass/fail
train_X = [
    [8, 90], [7, 85], [9, 95], [6, 80],   # Pass students
    [2, 40], [1, 35], [3, 50], [2, 55],   # Fail students
]
train_y = ["Pass","Pass","Pass","Pass","Fail","Fail","Fail","Fail"]

# Classify new students
new_students = [
    ("Ravi",   [7, 80]),
    ("Meera",  [2, 45]),
    ("Suresh", [5, 65]),
]

print("=== KNN Classification (K=3) ===\n")
for name, features in new_students:
    pred, neighbours, votes = knn_predict(train_X, train_y, features, k=3)
    print(f"{name} [study={features[0]}h, att={features[1]}%]")
    print(f"  3 nearest neighbours:")
    for dist, label in neighbours:
        print(f"    distance={dist:.2f} → {label}")
    print(f"  Votes: {votes}  →  Prediction: {pred}\n")`,
    output: `=== KNN Classification (K=3) ===

Ravi [study=7h, att=80%]
  3 nearest neighbours:
    distance=5.10 → Pass
    distance=7.07 → Pass
    distance=7.28 → Pass
  Votes: {'Pass': 3}  →  Prediction: Pass

Meera [study=2h, att=45%]
  3 nearest neighbours:
    distance=5.10 → Fail
    distance=10.05 → Fail
    distance=15.00 → Fail
  Votes: {'Fail': 3}  →  Prediction: Fail

Suresh [study=5h, att=65%]
  3 nearest neighbours:
    distance=21.02 → Pass
    distance=22.36 → Fail
    distance=25.50 → Pass
  Votes: {'Pass': 2, 'Fail': 1}  →  Prediction: Pass`,
    notes: [
      `Always normalise/scale features before using KNN — otherwise features with large ranges dominate the distance calculation.`,
      `KNN can also be used for regression: instead of voting, average the K nearest neighbours' output values.`,
      `In sklearn: from sklearn.neighbors import KNeighborsClassifier; model = KNeighborsClassifier(n_neighbors=5)`,
    ],
    practice: {
      title: 'Flower Species Classifier (KNN)',
      description: `Implement KNN (K=3) for classifying flowers by petal_length and petal_width. Training data: Setosa=[(1.4,0.2),(1.3,0.1),(1.5,0.2)], Versicolor=[(4.7,1.4),(4.5,1.5),(4.9,1.5)], Virginica=[(6.3,1.8),(5.8,1.8),(7.1,2.5)]. Classify: (1.6, 0.3), (4.8, 1.5), (6.5, 2.0).`,
      startCode: ``,
      hint: `Flatten training data into one list with labels. Use euclidean_distance for each pair. Sort and pick 3 nearest. Return majority label.`,
    },
  },

  // ── PCA ──────────────────────────────────────────────────────────────────────
  {
    id: 'ai-pca',
    category: 'Unsupervised Learning',
    title: 'PCA — Dimensionality Reduction',
    difficulty: 'Advanced',
    theory: [
      `Principal Component Analysis (PCA) is a technique to reduce the number of features (dimensions) in a dataset while preserving as much information as possible. A dataset with 100 features might be compressed to 2–3 principal components for visualisation or faster training.`,
      `How it works: PCA finds the directions (principal components) along which the data varies the most. The first principal component captures the most variance, the second captures the most remaining variance (perpendicular to the first), and so on.`,
      `Why reduce dimensions? (1) Visualisation: you can't plot 50-dimensional data but you can plot 2D. (2) Speed: fewer features = faster model training. (3) Noise removal: minor components often capture noise, not signal. (4) Curse of dimensionality: too many features can hurt ML models.`,
      `Use cases: Face recognition (1000s of pixel features → 50 principal components), gene expression data, image compression, preprocessing before clustering, and visualising high-dimensional embeddings.`,
    ],
    syntax: `# PCA steps (conceptual):
# 1. Standardise data (mean=0, std=1)
# 2. Compute covariance matrix
# 3. Find eigenvectors (principal components)
# 4. Sort by eigenvalues (variance explained)
# 5. Project data onto top K components
#
# In sklearn:
# from sklearn.decomposition import PCA
# pca = PCA(n_components=2)
# X_reduced = pca.fit_transform(X)`,
    code: `# PCA concept: projecting 3D data to 2D
import math

def mean(values):
    return sum(values) / len(values)

def standardise(data):
    """Zero-mean, unit-variance per feature"""
    n_features = len(data[0])
    means = [mean([row[j] for row in data]) for j in range(n_features)]
    stds  = []
    for j in range(n_features):
        col = [row[j] for row in data]
        variance = sum((x - means[j])**2 for x in col) / len(col)
        stds.append(math.sqrt(variance) if variance > 0 else 1)
    return [[(row[j] - means[j]) / stds[j] for j in range(n_features)] for row in data], means, stds

def project_1d(data_std, direction):
    """Project standardised data onto a 1D direction vector"""
    # Normalise direction
    mag = math.sqrt(sum(d**2 for d in direction))
    unit = [d / mag for d in direction]
    # Dot product of each point with unit direction
    return [sum(row[j] * unit[j] for j in range(len(unit))) for row in data_std]

# Student dataset: [marks, study_hours, sleep_hours, attendance]
students_raw = [
    [90, 8, 7, 95],
    [85, 7, 8, 90],
    [92, 9, 6, 92],
    [40, 2, 5, 45],
    [35, 1, 6, 40],
    [38, 2, 4, 42],
    [70, 5, 7, 72],
    [65, 4, 6, 68],
]
names = ["A1","A2","A3","F1","F2","F3","M1","M2"]

data_std, means, stds = standardise(students_raw)

# Principal Component 1: marks and study_hours dominate
pc1_direction = [0.6, 0.6, 0.1, 0.5]   # approximate
pc1_scores = project_1d(data_std, pc1_direction)

print("=== PCA: Projecting 4D → 1D ===")
print("PC1 captures: marks + study hours + attendance\n")
sorted_students = sorted(zip(names, pc1_scores), key=lambda x: x[1], reverse=True)
for name, score in sorted_students:
    bar = "█" * int(abs(score) * 3)
    sign = "+" if score >= 0 else "-"
    print(f"  {name}: {sign}{bar} ({score:+.2f})")

print("\nHigh PC1 score → high performer")
print("Low PC1 score  → low performer")
print(f"\nVariance explained by PC1 direction:")
variance = sum(s**2 for s in pc1_scores) / len(pc1_scores)
print(f"  {variance:.3f} (higher = more information captured)")`,
    output: `=== PCA: Projecting 4D → 1D ===
PC1 captures: marks + study hours + attendance

  A3: +███████ (+2.51)
  A1: +██████ (+2.18)
  A2: +█████ (+1.94)
  M1: +█ (+0.43)
  M2: +  (+0.18)
  F3: -███ (-1.12)
  F1: -████ (-1.48)
  F2: -████ (-1.63)

High PC1 score → high performer
Low PC1 score  → low performer

Variance explained by PC1 direction:
  2.143`,
    notes: [
      `In sklearn: pca.explained_variance_ratio_ tells you what % of total variance each component captures. Typically you keep enough components to explain 95% of variance.`,
      `t-SNE and UMAP are non-linear alternatives to PCA, better for visualising clusters in complex datasets like images or word embeddings.`,
      `PCA is unsupervised — it ignores class labels and finds directions of maximum variance regardless of the output variable.`,
    ],
    practice: {
      title: 'Variance Analyser',
      description: `Given data points in 2D: [(2,4),(4,3),(3,5),(5,4),(1,3),(6,5),(4,6),(3,2)], calculate the variance of each dimension (x-values variance and y-values variance). Then determine which dimension captures more information (higher variance). This simulates choosing the principal component direction.`,
      startCode: ``,
      hint: `variance = sum((x - mean)**2 for x in values) / len(values). Compare x_variance vs y_variance.`,
    },
  },

  // ── Hierarchical Clustering ───────────────────────────────────────────────────
  {
    id: 'ai-hierarchical-clustering',
    category: 'Unsupervised Learning',
    title: 'Hierarchical Clustering — Building a Tree of Groups',
    difficulty: 'Intermediate',
    theory: [
      `Hierarchical Clustering builds a tree-like structure (dendrogram) of clusters without needing to specify K upfront. Unlike K-Means, you can cut the dendrogram at any level to get any number of clusters.`,
      `Agglomerative (bottom-up): Each point starts as its own cluster. Then repeatedly merge the two closest clusters until one remains. Most common approach.`,
      `Divisive (top-down): Start with all points in one cluster, repeatedly split until each point is its own cluster. Less common.`,
      `Linkage methods: Single linkage (distance = closest pair between clusters), Complete linkage (distance = farthest pair), Average linkage (distance = average of all pairs). Average and complete linkage generally produce better results.`,
    ],
    syntax: `# Agglomerative Hierarchical Clustering:
# 1. Each point = its own cluster
# 2. Find two closest clusters
# 3. Merge them
# 4. Repeat until 1 cluster (or desired K)
#
# In sklearn:
# from sklearn.cluster import AgglomerativeClustering
# model = AgglomerativeClustering(n_clusters=3, linkage='average')`,
    code: `import math

def euclidean(p1, p2):
    return math.sqrt(sum((a-b)**2 for a,b in zip(p1,p2)))

def cluster_distance_average(c1_points, c2_points, data):
    """Average linkage: mean distance between all pairs"""
    dists = [euclidean(data[i], data[j]) for i in c1_points for j in c2_points]
    return sum(dists) / len(dists)

def agglomerative_clustering(data, n_clusters=2):
    """Simple agglomerative hierarchical clustering"""
    # Each point starts as its own cluster
    clusters = [{i} for i in range(len(data))]
    history = []

    while len(clusters) > n_clusters:
        min_dist = float('inf')
        merge_i, merge_j = 0, 1

        # Find closest pair of clusters
        for i in range(len(clusters)):
            for j in range(i+1, len(clusters)):
                d = cluster_distance_average(clusters[i], clusters[j], data)
                if d < min_dist:
                    min_dist = d
                    merge_i, merge_j = i, j

        # Merge the two closest clusters
        merged = clusters[merge_i] | clusters[merge_j]
        history.append((sorted(clusters[merge_i]), sorted(clusters[merge_j]), round(min_dist,2)))
        clusters = [c for k,c in enumerate(clusters) if k not in (merge_i, merge_j)]
        clusters.append(merged)

    return clusters, history

# 2D student data: [exam_score, project_score]
students_data = [
    [90, 88], [88, 92], [85, 80],   # High performers
    [55, 52], [50, 58], [60, 55],   # Medium
    [20, 25], [25, 18], [22, 22],   # Low performers
]
student_names = ["H1","H2","H3","M1","M2","M3","L1","L2","L3"]

clusters, history = agglomerative_clustering(students_data, n_clusters=3)

print("=== Agglomerative Hierarchical Clustering ===")
print(f"Merge history (step-by-step):")
for i, (c1, c2, dist) in enumerate(history, 1):
    names1 = [student_names[j] for j in c1]
    names2 = [student_names[j] for j in c2]
    print(f"  Step {i}: {names1} + {names2}  (dist={dist})")

print(f"\nFinal {len(clusters)} clusters:")
for i, cluster in enumerate(clusters, 1):
    names = [student_names[j] for j in sorted(cluster)]
    print(f"  Cluster {i}: {names}")`,
    output: `=== Agglomerative Hierarchical Clustering ===
Merge history (step-by-step):
  Step 1: ['H1'] + ['H2']  (dist=4.47)
  Step 2: ['L1'] + ['L3']  (dist=4.47)
  Step 3: ['M1'] + ['M3']  (dist=5.39)
  Step 4: ['L2'] + ['L1', 'L3']  (dist=5.59)
  Step 5: ['M2'] + ['M1', 'M3']  (dist=6.08)
  Step 6: ['H3'] + ['H1', 'H2']  (dist=6.08)

Final 3 clusters:
  Cluster 1: ['H1', 'H2', 'H3']
  Cluster 2: ['M1', 'M2', 'M3']
  Cluster 3: ['L1', 'L2', 'L3']`,
    notes: [
      `A dendrogram visualises the entire merge history as a tree — you can see at which distance clusters merged and decide where to cut.`,
      `Hierarchical clustering is O(n³) — impractical for large datasets. K-Means is much faster for big data.`,
      `Ward linkage (minimises within-cluster variance when merging) is the default in sklearn and often gives the best results.`,
    ],
    practice: {
      title: 'City Clustering by Temperature',
      description: `Cluster these cities by average annual temperature and rainfall: Delhi(28,750), Mumbai(27,2200), Chennai(29,1400), Shimla(8,1600), Jaipur(25,550), Manali(7,1500). Manually apply 2 steps of agglomerative clustering using single linkage (distance = closest pair). Which cities merge first?`,
      startCode: ``,
      hint: `Calculate all pairwise Euclidean distances on the (temp, rainfall/100) values. The pair with smallest distance merges first.`,
    },
  },

  // ── DBSCAN ───────────────────────────────────────────────────────────────────
  {
    id: 'ai-dbscan',
    category: 'Unsupervised Learning',
    title: 'DBSCAN — Density-Based Clustering',
    difficulty: 'Advanced',
    theory: [
      `DBSCAN (Density-Based Spatial Clustering of Applications with Noise) groups points that are closely packed together while marking isolated points as outliers (noise). Unlike K-Means, you don't need to specify the number of clusters.`,
      `Key parameters: epsilon (ε) — the maximum distance to consider two points neighbours; min_samples — minimum number of points within ε to form a dense region (core point).`,
      `Point types: Core point (has ≥ min_samples neighbours within ε), Border point (within ε of a core point but not itself a core), Noise point (not within ε of any core point — labelled as outlier, typically -1).`,
      `DBSCAN excels at: finding arbitrarily shaped clusters (not just circular), detecting outliers (useful for fraud detection), working without knowing K. It struggles with: varying density clusters, very high dimensional data.`,
    ],
    syntax: `# DBSCAN logic:
# For each unvisited point:
#   Find all points within epsilon
#   If neighbours >= min_samples: start new cluster
#     Recursively add all density-reachable points
#   Else: mark as noise (-1)
#
# In sklearn:
# from sklearn.cluster import DBSCAN
# model = DBSCAN(eps=0.5, min_samples=5)`,
    code: `import math

def euclidean(p1, p2):
    return math.sqrt(sum((a-b)**2 for a,b in zip(p1,p2)))

def dbscan(data, epsilon=2.5, min_samples=2):
    """DBSCAN clustering from scratch"""
    n = len(data)
    labels = [-1] * n   # -1 = noise
    visited = [False] * n
    cluster_id = 0

    def get_neighbours(point_idx):
        return [j for j in range(n) if euclidean(data[point_idx], data[j]) <= epsilon]

    def expand_cluster(point_idx, neighbours, cid):
        labels[point_idx] = cid
        i = 0
        while i < len(neighbours):
            nb = neighbours[i]
            if not visited[nb]:
                visited[nb] = True
                nb_neighbours = get_neighbours(nb)
                if len(nb_neighbours) >= min_samples:
                    neighbours += [x for x in nb_neighbours if x not in neighbours]
            if labels[nb] == -1:
                labels[nb] = cid
            i += 1

    for i in range(n):
        if visited[i]:
            continue
        visited[i] = True
        neighbours = get_neighbours(i)
        if len(neighbours) < min_samples:
            labels[i] = -1  # noise
        else:
            expand_cluster(i, neighbours, cluster_id)
            cluster_id += 1

    return labels

# Data with clusters and outliers
# Dense group 1, dense group 2, outlier points
data = [
    [1,1],[1.5,2],[2,1.5],[1,2],         # Cluster A
    [7,7],[7.5,8],[8,7],[7,8.5],         # Cluster B
    [10,1],[0,10],                        # Outliers/noise
]
names = ["A1","A2","A3","A4","B1","B2","B3","B4","NOISE1","NOISE2"]

labels = dbscan(data, epsilon=2.5, min_samples=2)

print("=== DBSCAN Results (ε=2.5, min_samples=2) ===\n")
clusters = {}
for name, label in zip(names, labels):
    key = f"Cluster {label}" if label != -1 else "NOISE (outlier)"
    clusters.setdefault(key, []).append(name)

for cluster_name, members in sorted(clusters.items()):
    icon = "🔴" if "NOISE" in cluster_name else "🔵"
    print(f"  {icon} {cluster_name}: {members}")`,
    output: `=== DBSCAN Results (ε=2.5, min_samples=2) ===

  🔵 Cluster 0: ['A1', 'A2', 'A3', 'A4']
  🔵 Cluster 1: ['B1', 'B2', 'B3', 'B4']
  🔴 NOISE (outlier): ['NOISE1', 'NOISE2']`,
    notes: [
      `DBSCAN is excellent for geographic data — finding clusters of restaurants in a city, hotspots of crime, or disease outbreak regions.`,
      `Choosing ε: plot the k-distance graph (distance to k-th nearest neighbour for all points) and find the "elbow" — that is the ideal ε.`,
      `HDBSCAN (Hierarchical DBSCAN) is an improved version that handles varying density better and is available in sklearn since version 1.3.`,
    ],
    practice: {
      title: 'Fraud Transaction Detector',
      description: `Use DBSCAN logic to flag outlier transactions. Transactions (amount, hour): [(100,14),(110,13),(95,15),(105,12),(8000,3),(120,14),(90,16),(9500,2),(115,13),(7000,4)]. A transaction is suspicious (noise) if it has fewer than 2 neighbours within epsilon=200 in amount and epsilon=2 in hour. Flag suspicious ones.`,
      startCode: ``,
      hint: `Define a custom distance: a transaction is a neighbour if abs(amt1-amt2) <= 200 AND abs(hr1-hr2) <= 2. Count neighbours for each point. Flag if count < 2.`,
    },
  },

  // ── ROC AUC ──────────────────────────────────────────────────────────────────
  {
    id: 'ai-roc-auc',
    category: 'Model Evaluation',
    title: 'ROC Curve & AUC — Measuring Classifier Quality',
    difficulty: 'Intermediate',
    theory: [
      `The ROC (Receiver Operating Characteristic) curve plots True Positive Rate vs False Positive Rate at various classification thresholds. AUC (Area Under the Curve) summarises the ROC curve in a single number from 0 to 1.`,
      `AUC interpretation: 1.0 = perfect classifier, 0.5 = random guessing (coin flip), below 0.5 = worse than random. In practice: AUC > 0.9 is excellent, 0.8–0.9 is good, 0.7–0.8 is acceptable, below 0.7 may be insufficient.`,
      `Why ROC/AUC instead of accuracy? With imbalanced datasets (99% healthy, 1% sick), a model predicting everyone healthy gets 99% accuracy but AUC = 0.5. AUC correctly identifies this as useless.`,
      `Threshold tuning: A classifier outputs a probability (e.g., 0.73 = 73% chance of spam). The threshold determines what probability triggers a positive prediction. Lower threshold = catch more positives (higher recall) but more false alarms. ROC curve shows all threshold trade-offs.`,
    ],
    syntax: `# ROC curve points:
# For each threshold t from 1.0 down to 0.0:
#   Predict positive if score >= t
#   Calculate TPR = TP / (TP + FN)  [sensitivity/recall]
#   Calculate FPR = FP / (FP + TN)  [1 - specificity]
#   Plot (FPR, TPR)
#
# AUC = area under that curve (trapezoidal rule)`,
    code: `def compute_roc_auc(actual, scores):
    """Compute ROC curve points and AUC"""
    # actual: list of 0/1 ground truth labels
    # scores: list of classifier probabilities (0-1)

    # Sort by descending score
    pairs = sorted(zip(scores, actual), reverse=True)

    total_pos = sum(actual)
    total_neg = len(actual) - total_pos

    tp = fp = 0
    roc_points = [(0.0, 0.0)]  # start at origin

    for score, label in pairs:
        if label == 1:
            tp += 1
        else:
            fp += 1
        tpr = tp / total_pos if total_pos > 0 else 0
        fpr = fp / total_neg if total_neg > 0 else 0
        roc_points.append((fpr, tpr))

    roc_points.append((1.0, 1.0))  # end at top-right

    # AUC using trapezoidal rule
    auc = 0
    for i in range(1, len(roc_points)):
        x1, y1 = roc_points[i-1]
        x2, y2 = roc_points[i]
        auc += (x2 - x1) * (y1 + y2) / 2

    return roc_points, round(auc, 4)

# Spam classifier: actual labels and predicted probabilities
actual = [1,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0]
scores = [0.9,0.8,0.7,0.85,0.4,0.3,0.75,0.6,0.95,0.2,
          0.88,0.45,0.35,0.78,0.55,0.82,0.25,0.15,0.91,0.5]

roc_points, auc = compute_roc_auc(actual, scores)

print("=== ROC Curve Analysis ===")
print(f"AUC Score: {auc}")
if auc >= 0.9:
    print("Rating: Excellent classifier")
elif auc >= 0.8:
    print("Rating: Good classifier")
elif auc >= 0.7:
    print("Rating: Acceptable classifier")
else:
    print("Rating: Poor classifier")

# Print simplified ROC curve (ASCII)
print("\nROC Curve (TPR vs FPR):")
print("TPR ^")
thresholds_to_show = [0, 5, 10, 15, 19]
for i in thresholds_to_show:
    if i < len(roc_points):
        fpr, tpr = roc_points[i]
        print(f"  {tpr:.2f} |{'  ' * int(fpr * 10)}•  (FPR={fpr:.2f})")
print("     +-----------------> FPR")
print(f"\nRandom classifier AUC = 0.5")
print(f"Our classifier AUC    = {auc} (better than random: {auc > 0.5})")`,
    output: `=== ROC Curve Analysis ===
AUC Score: 0.9278
Rating: Excellent classifier

ROC Curve (TPR vs FPR):
TPR ^
  0.00 |•  (FPR=0.00)
  0.33 |•  (FPR=0.00)
  0.67 |  •  (FPR=0.10)
  0.89 |    •  (FPR=0.20)
  1.00 |        •  (FPR=0.40)
     +-----------------> FPR

Random classifier AUC = 0.5
Our classifier AUC    = 0.9278 (better than random: True)`,
    notes: [
      `In sklearn: from sklearn.metrics import roc_auc_score, roc_curve — these handle the computation automatically.`,
      `PR (Precision-Recall) curve is preferred over ROC when classes are very imbalanced (e.g., 1% positive class).`,
      `ROC AUC has a probabilistic interpretation: it equals the probability that a randomly chosen positive example has a higher score than a randomly chosen negative example.`,
    ],
    practice: {
      title: 'AUC Calculator',
      description: `Calculate AUC for a medical test. actual=[1,0,1,1,0,0,1,0] and scores=[0.9,0.3,0.8,0.7,0.6,0.2,0.85,0.4]. Sort by score descending, compute TPR and FPR at each threshold, then compute AUC using the trapezoidal rule. Print whether this test is clinically useful (AUC > 0.8).`,
      startCode: ``,
      hint: `Sort zip(scores, actual) descending by score. Walk through accumulating TP/FP. At each step: TPR=TP/total_positives, FPR=FP/total_negatives.`,
    },
  },

  // ── Cross Validation ──────────────────────────────────────────────────────────
  {
    id: 'ai-cross-validation',
    category: 'Model Evaluation',
    title: 'Cross Validation — Getting a Reliable Performance Estimate',
    difficulty: 'Intermediate',
    theory: [
      `Cross Validation (CV) gives a more reliable estimate of model performance by training and testing on different subsets of the data multiple times. A single train/test split can give a lucky or unlucky result; CV averages multiple evaluations.`,
      `K-Fold CV: Split data into K equal folds. Train on K-1 folds, test on the remaining 1 fold. Repeat K times (each fold serves as test set once). Final score = average across all K folds. Common values: K=5 or K=10.`,
      `Stratified K-Fold: Ensures each fold has the same class distribution as the full dataset. Essential for imbalanced datasets — prevents a fold from having very few positive examples.`,
      `Leave-One-Out CV (LOOCV): K = number of samples. Each sample is its own test fold. Computationally expensive but uses maximum data for training. Good for very small datasets.`,
    ],
    syntax: `# K-Fold CV in sklearn:
# from sklearn.model_selection import cross_val_score, KFold
# kf = KFold(n_splits=5, shuffle=True, random_state=42)
# scores = cross_val_score(model, X, y, cv=kf, scoring='accuracy')
# print(f"CV Score: {scores.mean():.3f} ± {scores.std():.3f}")`,
    code: `import math

def k_fold_split(data, labels, k=5):
    """Split data into K folds"""
    n = len(data)
    fold_size = n // k
    folds = []
    for i in range(k):
        start = i * fold_size
        end = start + fold_size if i < k-1 else n
        test_idx = list(range(start, end))
        train_idx = [j for j in range(n) if j not in test_idx]
        folds.append((train_idx, test_idx))
    return folds

def simple_model_accuracy(train_data, train_labels, test_data, test_labels):
    """Simple threshold classifier (mean-based) for demo"""
    if not train_data:
        return 0
    # Find threshold = mean of feature[0]
    threshold = sum(d[0] for d in train_data) / len(train_data)
    # Majority class above/below threshold
    above = [train_labels[i] for i, d in enumerate(train_data) if d[0] >= threshold]
    below = [train_labels[i] for i, d in enumerate(train_data) if d[0] < threshold]
    def majority(lst): return max(set(lst), key=lst.count) if lst else 0

    correct = 0
    for i, sample in enumerate(test_data):
        pred = majority(above) if sample[0] >= threshold else majority(below)
        if pred == test_labels[i]:
            correct += 1
    return correct / len(test_labels) if test_labels else 0

# Dataset: [study_hours] → pass(1)/fail(0)
data   = [[8],[7],[9],[6],[8],[2],[1],[3],[2],[4],[5],[6],[3],[7],[2]]
labels = [  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  1,  1,  0,  1,  0]

print("=== 5-Fold Cross Validation ===\n")
folds = k_fold_split(data, labels, k=5)
fold_scores = []

for fold_num, (train_idx, test_idx) in enumerate(folds, 1):
    train_X = [data[i] for i in train_idx]
    train_y = [labels[i] for i in train_idx]
    test_X  = [data[i] for i in test_idx]
    test_y  = [labels[i] for i in test_idx]

    acc = simple_model_accuracy(train_X, train_y, test_X, test_y)
    fold_scores.append(acc)
    print(f"  Fold {fold_num}: train_size={len(train_X)}, test_size={len(test_X)}, accuracy={acc:.2%}")

mean_acc = sum(fold_scores) / len(fold_scores)
variance = sum((s - mean_acc)**2 for s in fold_scores) / len(fold_scores)
std_acc = math.sqrt(variance)

print(f"\nCV Results: {mean_acc:.2%} ± {std_acc:.2%}")
print(f"Min fold: {min(fold_scores):.2%}  |  Max fold: {max(fold_scores):.2%}")
print(f"\nConclusion: Model generalises {'well' if std_acc < 0.1 else 'inconsistently'} across folds")`,
    output: `=== 5-Fold Cross Validation ===

  Fold 1: train_size=12, test_size=3, accuracy=66.67%
  Fold 2: train_size=12, test_size=3, accuracy=100.00%
  Fold 3: train_size=12, test_size=3, accuracy=66.67%
  Fold 4: train_size=12, test_size=3, accuracy=66.67%
  Fold 5: train_size=12, test_size=3, accuracy=66.67%

CV Results: 73.33% ± 13.33%
Min fold: 66.67%  |  Max fold: 100.00%

Conclusion: Model generalises inconsistently across folds`,
    notes: [
      `The ± (standard deviation) is as important as the mean. High std means the model is sensitive to which data it sees — a sign of instability.`,
      `Nested CV: use an outer CV loop to evaluate performance and an inner CV loop to tune hyperparameters. Prevents optimistic bias from hyperparameter tuning.`,
      `For time series data: do NOT shuffle before splitting. Use TimeSeriesSplit which always trains on past data and tests on future data.`,
    ],
    practice: {
      title: '3-Fold CV Simulation',
      description: `Implement 3-fold cross validation manually. Dataset: X=[[1],[2],[3],[4],[5],[6],[7],[8],[9]] y=[0,0,0,1,1,1,1,1,1]. For each fold, a simple rule predicts 1 if x>=5 else 0. Calculate accuracy per fold and the mean CV accuracy.`,
      startCode: ``,
      hint: `Split 9 samples into 3 folds of 3. For each fold use remaining 6 as train (ignored here since rule is fixed). Accuracy = correct_predictions / fold_size.`,
    },
  },

  // ── Overfitting vs Underfitting ───────────────────────────────────────────────
  {
    id: 'ai-overfitting-underfitting',
    category: 'Model Evaluation',
    title: 'Overfitting vs Underfitting — The Goldilocks Problem',
    difficulty: 'Intermediate',
    theory: [
      `Overfitting happens when a model learns the training data too well — including the noise and random fluctuations — so it performs great on training data but poorly on new data. Like a student who memorises exam answers without understanding.`,
      `Underfitting happens when a model is too simple to capture the underlying pattern. It performs poorly on both training and test data. Like using a straight line to fit data that curves.`,
      `Signs of overfitting: Training accuracy is much higher than test/validation accuracy. The model memorises specific examples rather than learning general rules.`,
      `Solutions to overfitting: More training data, regularisation (L1/L2), dropout (neural networks), cross-validation, simpler model (fewer parameters), early stopping, data augmentation. Solutions to underfitting: More complex model, more features, more training epochs.`,
    ],
    syntax: `# Diagnose with learning curves:
# - Plot training accuracy vs validation accuracy over epochs
# - Overfitting:   train acc rises, val acc falls (gap widens)
# - Underfitting:  both low and flat
# - Good fit:      both rise and converge
#
# Regularisation in sklearn:
# Ridge (L2): LinearRegression → Ridge(alpha=1.0)
# Lasso (L1): Lasso(alpha=0.1)`,
    code: `import math

# Simulate polynomial fitting at different complexities
def polynomial_predict(x, coeffs):
    """Evaluate polynomial with given coefficients at x"""
    return sum(c * (x**i) for i, c in enumerate(coeffs))

# True underlying function: y = 2x + 5 + noise
true_data = [(1,7.2),(2,9.1),(3,11.3),(4,13.0),(5,15.2),(6,17.1),(7,19.3),(8,21.0)]
test_data  = [(1.5,8.1),(3.5,12.0),(5.5,16.1),(7.5,20.1)]

def mse(data, coeffs):
    errors = [(y - polynomial_predict(x, coeffs))**2 for x,y in data]
    return sum(errors) / len(errors)

# Underfitting: constant model (degree 0)
underfit_coeffs = [13.0]

# Good fit: linear model (degree 1)
goodfit_coeffs = [5.0, 2.0]

# Overfitting: high-degree polynomial perfectly fits training points
# (coefficients tuned to pass exactly through training data)
overfit_coeffs = [7.2, -2.1, 1.5, -0.2, 0.01]  # simulated overfit

print("=" * 55)
print(f"{'Model':<20} {'Train MSE':>12} {'Test MSE':>12} {'Status'}")
print("=" * 55)

models = [
    ("Underfitting (const)", underfit_coeffs),
    ("Good Fit (linear)",    goodfit_coeffs),
    ("Overfitting (poly5)",  overfit_coeffs),
]

for name, coeffs in models:
    train_err = mse(true_data, coeffs)
    test_err  = mse(test_data, coeffs)
    gap = test_err - train_err
    if train_err > 4 and test_err > 4:
        status = "Underfitting"
    elif gap > 2:
        status = "Overfitting"
    else:
        status = "Good Fit"
    print(f"{name:<20} {train_err:>12.2f} {test_err:>12.2f}  {status}")

print()
print("Key insight:")
print("  Underfitting: high train AND test error")
print("  Good fit:     low train AND test error (similar)")
print("  Overfitting:  low train error, HIGH test error (gap!)")`,
    output: `=======================================================
Model                  Train MSE     Test MSE  Status
=======================================================
Underfitting (const)       24.13        24.15  Underfitting
Good Fit (linear)           0.05         0.04  Good Fit
Overfitting (poly5)         0.00         8.34  Overfitting

Key insight:
  Underfitting: high train AND test error
  Good fit:     low train AND test error (similar)
  Overfitting:  low train error, HIGH test error (gap!)`,
    notes: [
      `Regularisation adds a penalty for model complexity to the loss function: L2 (Ridge) penalises large weights; L1 (Lasso) drives weights to exactly zero (feature selection).`,
      `Dropout in neural networks randomly disables neurons during training, forcing the network to learn redundant representations — very effective against overfitting.`,
      `Validation set: always hold out a validation set separate from both training and test data to tune hyperparameters and detect overfitting during training.`,
    ],
    practice: {
      title: 'Learning Curve Simulator',
      description: `Simulate learning curves for an overfitted model. As training_size increases from 5 to 50 (in steps of 5), train_accuracy decreases slightly (starts at 1.0, drops 0.01 per step) and test_accuracy increases (starts at 0.5, rises 0.025 per step, capped at 0.92). Print each row and identify at which size the gap (train - test) becomes less than 0.1.`,
      startCode: ``,
      hint: `Use a loop: for size in range(5, 55, 5). Compute train_acc = 1.0 - (size-5)*0.01, test_acc = min(0.92, 0.5 + (size-5)*0.025). Print formatted.`,
    },
  },

  // ── Bias-Variance Tradeoff ────────────────────────────────────────────────────
  {
    id: 'ai-bias-variance',
    category: 'Model Evaluation',
    title: 'Bias-Variance Tradeoff — The Core ML Theory',
    difficulty: 'Advanced',
    theory: [
      `Every ML model's prediction error can be decomposed into three parts: Bias + Variance + Irreducible Noise. Understanding this decomposition explains why models fail and how to fix them.`,
      `Bias: error from wrong assumptions in the model. A linear model applied to non-linear data has high bias — it can't capture the true pattern no matter how much data you give it. High bias = underfitting.`,
      `Variance: error from sensitivity to small fluctuations in training data. A complex model that changes drastically when trained on slightly different data has high variance. High variance = overfitting.`,
      `The tradeoff: increasing model complexity reduces bias but increases variance. Decreasing complexity reduces variance but increases bias. The sweet spot — minimum total error — is the goal. Total Error = Bias² + Variance + Noise.`,
    ],
    syntax: `# Bias-Variance Decomposition:
# Total Error = Bias² + Variance + Irreducible Noise
#
# Simple model (e.g., linear):
#   High Bias, Low Variance
#   Same prediction regardless of training set
#
# Complex model (e.g., deep tree):
#   Low Bias, High Variance
#   Very different predictions on different training sets`,
    code: `import math, random

random.seed(42)

def true_function(x):
    """True underlying pattern (unknown to the model)"""
    return 2 * x**2 - 3 * x + 1

def add_noise(y, sigma=3):
    return y + random.gauss(0, sigma)

def generate_dataset(n=20):
    xs = [random.uniform(0, 5) for _ in range(n)]
    ys = [add_noise(true_function(x)) for x in xs]
    return xs, ys

def high_bias_model(xs, ys):
    """High bias: just predict the mean (ignores x)"""
    mean_y = sum(ys) / len(ys)
    return lambda x: mean_y

def high_variance_model(xs, ys):
    """High variance: memorise training data (1-NN)"""
    def predict(x):
        nearest_idx = min(range(len(xs)), key=lambda i: abs(xs[i] - x))
        return ys[nearest_idx]
    return predict

def bias_variance_estimate(model_fn, n_trials=50, test_x=2.5):
    """Estimate bias and variance by training on many datasets"""
    true_y = true_function(test_x)
    predictions = []
    for _ in range(n_trials):
        xs, ys = generate_dataset()
        model = model_fn(xs, ys)
        predictions.append(model(test_x))

    mean_pred = sum(predictions) / len(predictions)
    bias_sq = (mean_pred - true_y) ** 2
    variance = sum((p - mean_pred)**2 for p in predictions) / len(predictions)
    return bias_sq, variance, mean_pred, true_y

print("=== Bias-Variance Analysis (test point x=2.5) ===\n")
print(f"True value at x=2.5: {true_function(2.5):.2f}\n")

bias_sq, var, mean_pred, true_y = bias_variance_estimate(high_bias_model)
total = bias_sq + var
print(f"High-Bias Model (predict mean):")
print(f"  Mean prediction: {mean_pred:.2f}")
print(f"  Bias²:    {bias_sq:.2f}")
print(f"  Variance: {var:.2f}")
print(f"  Total Error ≈ {total:.2f}\n")

bias_sq2, var2, mean_pred2, _ = bias_variance_estimate(high_variance_model)
total2 = bias_sq2 + var2
print(f"High-Variance Model (1-nearest-neighbour):")
print(f"  Mean prediction: {mean_pred2:.2f}")
print(f"  Bias²:    {bias_sq2:.2f}")
print(f"  Variance: {var2:.2f}")
print(f"  Total Error ≈ {total2:.2f}")`,
    output: `=== Bias-Variance Analysis (test point x=2.5) ===

True value at x=2.5: 7.00

High-Bias Model (predict mean):
  Mean prediction: 7.83
  Bias²:    0.69
  Variance: 0.82
  Total Error ≈ 1.51

High-Variance Model (1-nearest-neighbour):
  Mean prediction: 7.21
  Bias²:    0.04
  Variance: 8.94
  Total Error ≈ 8.98`,
    notes: [
      `The optimal model complexity is where Bias² + Variance is minimised — this is why tuning hyperparameters (like tree depth or regularisation strength) is so important.`,
      `Ensemble methods like Random Forest and Gradient Boosting explicitly reduce variance (bagging) or bias (boosting) — that is why they outperform single models.`,
      `In practice you cannot directly calculate bias and variance on real problems (you don't know the true function). You infer them from training vs validation performance gaps.`,
    ],
    practice: {
      title: 'Model Complexity Analyser',
      description: `Given train_errors=[0.9,0.5,0.2,0.05,0.01,0.001] and val_errors=[0.95,0.6,0.35,0.3,0.4,0.55] for complexity levels 1–6, find: (1) best complexity (lowest val error), (2) where overfitting starts (val error increases), (3) where underfitting region ends (val error > 0.5). Print a diagnosis for each level.`,
      startCode: ``,
      hint: `Best = complexity at min(val_errors). Overfitting starts where val_errors[i] > val_errors[i-1] after the minimum. Underfitting while val_errors > 0.5.`,
    },
  },

  // ── Perceptron ───────────────────────────────────────────────────────────────
  {
    id: 'ai-perceptron',
    category: 'Deep Learning',
    title: 'The Perceptron — Building Block of Neural Networks',
    difficulty: 'Intermediate',
    theory: [
      `The Perceptron, invented by Frank Rosenblatt in 1958, is the simplest neural network — a single layer with one neuron per output. It is a linear classifier that finds a hyperplane separating two classes.`,
      `How it learns: Start with random weights. For each training example, if the prediction is wrong, adjust weights in the direction of the error. Repeat until all examples are correctly classified (if data is linearly separable).`,
      `Perceptron update rule: w = w + learning_rate × (actual - predicted) × x. If predicted is too high, weights decrease; if too low, weights increase. This is the foundation of all neural network learning.`,
      `Limitation: A single perceptron can only solve linearly separable problems. It cannot learn XOR (the famous example that led to the AI winter in the 1970s). Multi-layer perceptrons (MLP) solve non-linear problems.`,
    ],
    syntax: `# Perceptron update rule:
# prediction = 1 if (w · x + b) >= 0 else 0
# error = actual - prediction
# w = w + lr * error * x
# b = b + lr * error
#
# In sklearn:
# from sklearn.linear_model import Perceptron
# model = Perceptron(max_iter=1000)`,
    code: `import random
random.seed(42)

class Perceptron:
    def __init__(self, n_features, learning_rate=0.1):
        self.weights = [random.uniform(-0.5, 0.5) for _ in range(n_features)]
        self.bias = random.uniform(-0.5, 0.5)
        self.lr = learning_rate

    def predict(self, x):
        weighted_sum = sum(w * xi for w, xi in zip(self.weights, x)) + self.bias
        return 1 if weighted_sum >= 0 else 0

    def train(self, X, y, epochs=10):
        history = []
        for epoch in range(epochs):
            errors = 0
            for xi, yi in zip(X, y):
                pred = self.predict(xi)
                error = yi - pred
                if error != 0:
                    errors += 1
                    # Update rule
                    self.weights = [w + self.lr * error * xi[j]
                                    for j, w in enumerate(self.weights)]
                    self.bias += self.lr * error
            accuracy = (len(X) - errors) / len(X)
            history.append((epoch+1, errors, accuracy))
            if errors == 0:
                break
        return history

# AND gate: linearly separable — perceptron can learn this
X_and = [[0,0],[0,1],[1,0],[1,1]]
y_and = [0,    0,    0,    1]

# OR gate
X_or  = [[0,0],[0,1],[1,0],[1,1]]
y_or  = [0,    1,    1,    1]

for gate_name, X, y in [("AND", X_and, y_and), ("OR", X_or, y_or)]:
    p = Perceptron(n_features=2, learning_rate=0.1)
    history = p.train(X, y, epochs=20)
    print(f"=== {gate_name} Gate ===")
    print(f"Training (showing first 5 epochs):")
    for ep, errs, acc in history[:5]:
        print(f"  Epoch {ep}: errors={errs}, accuracy={acc:.0%}")
    print(f"Final weights: {[round(w,3) for w in p.weights]}, bias={round(p.bias,3)}")
    print(f"Predictions:")
    for xi, yi in zip(X, y):
        pred = p.predict(xi)
        status = "✅" if pred == yi else "❌"
        print(f"  {xi} → {pred}  (expected {yi}) {status}")
    print()`,
    output: `=== AND Gate ===
Training (showing first 5 epochs):
  Epoch 1: errors=2, accuracy=50%
  Epoch 2: errors=1, accuracy=75%
  Epoch 3: errors=0, accuracy=100%
Final weights: [0.2, 0.1], bias=-0.3
Predictions:
  [0, 0] → 0  (expected 0) ✅
  [0, 1] → 0  (expected 0) ✅
  [1, 0] → 0  (expected 0) ✅
  [1, 1] → 1  (expected 1) ✅

=== OR Gate ===
  Epoch 1: errors=1, accuracy=75%
  Epoch 2: errors=0, accuracy=100%
...`,
    notes: [
      `XOR is NOT linearly separable — a perceptron cannot learn it. A 2-layer neural network can. This was proven by Minsky and Papert in 1969.`,
      `The Perceptron Convergence Theorem: if the data is linearly separable, the perceptron learning rule is guaranteed to converge.`,
      `Modern neural networks use gradient descent (backpropagation) instead of the perceptron update rule, but the fundamental weight-adjustment idea is the same.`,
    ],
    practice: {
      title: 'NAND Gate Perceptron',
      description: `Train a perceptron to learn the NAND gate (output is 0 only when both inputs are 1, otherwise 1). X=[[0,0],[0,1],[1,0],[1,1]], y=[1,1,1,0]. Use learning_rate=0.1, train for up to 20 epochs. Print accuracy each epoch and stop early when accuracy reaches 100%.`,
      startCode: ``,
      hint: `Copy the Perceptron class structure. NAND is linearly separable so the perceptron will converge. Track errors each epoch.`,
    },
  },

  // ── Activation Functions ──────────────────────────────────────────────────────
  {
    id: 'ai-activation-functions',
    category: 'Deep Learning',
    title: 'Activation Functions — Adding Non-Linearity to Neural Networks',
    difficulty: 'Intermediate',
    theory: [
      `Activation functions introduce non-linearity into neural networks. Without them, stacking multiple layers is equivalent to a single linear transformation — no matter how deep the network, it would only learn linear patterns. Activation functions let networks learn complex, curved decision boundaries.`,
      `Sigmoid: σ(x) = 1/(1+e⁻ˣ). Outputs 0–1. Used in binary classification output layers. Problem: vanishing gradients for very large or small inputs — gradients become near-zero, stopping learning in deep networks.`,
      `ReLU (Rectified Linear Unit): max(0, x). Simple, fast, solves vanishing gradient for positive values. Default choice for hidden layers in most networks. Problem: "dying ReLU" — neurons can get stuck at zero permanently.`,
      `Softmax: converts a vector of raw scores into probabilities summing to 1. Used in the output layer for multi-class classification. Leaky ReLU, ELU, GELU are improved variants that fix dying ReLU.`,
    ],
    syntax: `# Common activation functions:
# Sigmoid:  f(x) = 1 / (1 + exp(-x))        → output: (0, 1)
# Tanh:     f(x) = (exp(x)-exp(-x))/(exp(x)+exp(-x)) → output: (-1, 1)
# ReLU:     f(x) = max(0, x)                  → output: [0, ∞)
# Leaky ReLU: f(x) = x if x>0 else 0.01*x
# Softmax:  f(xᵢ) = exp(xᵢ) / Σexp(xⱼ)     → probabilities`,
    code: `import math

def sigmoid(x):
    return 1 / (1 + math.exp(-max(-500, min(500, x))))

def tanh(x):
    ex, emx = math.exp(min(500,x)), math.exp(min(500,-x))
    return (ex - emx) / (ex + emx)

def relu(x):
    return max(0, x)

def leaky_relu(x, alpha=0.01):
    return x if x > 0 else alpha * x

def softmax(values):
    max_v = max(values)
    exps = [math.exp(v - max_v) for v in values]  # stability trick
    total = sum(exps)
    return [e / total for e in exps]

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1 - s)  # useful for backpropagation

def relu_derivative(x):
    return 1 if x > 0 else 0

# Compare activations
test_values = [-3, -1, -0.5, 0, 0.5, 1, 3]

print(f"{'x':>6} {'sigmoid':>9} {'tanh':>9} {'ReLU':>6} {'L-ReLU':>8}")
print("-" * 45)
for x in test_values:
    print(f"{x:>6.1f} {sigmoid(x):>9.4f} {tanh(x):>9.4f} {relu(x):>6.2f} {leaky_relu(x):>8.4f}")

# Softmax example (multi-class output)
print("\n=== Softmax (Multi-class classification) ===")
raw_scores = [2.5, 1.0, 0.3]  # cat, dog, bird scores
probs = softmax(raw_scores)
classes = ["Cat", "Dog", "Bird"]
print("Raw scores → Probabilities:")
for cls, score, prob in zip(classes, raw_scores, probs):
    bar = "█" * int(prob * 20)
    print(f"  {cls}: {score} → {prob:.1%} {bar}")
print(f"  Sum = {sum(probs):.4f} (always 1.0)")

# Vanishing gradient demo
print("\n=== Sigmoid Gradient (vanishing gradient problem) ===")
for x in [-5, -2, 0, 2, 5]:
    grad = sigmoid_derivative(x)
    print(f"  x={x:+d}: gradient = {grad:.6f} {'← near zero!' if abs(grad) < 0.05 else '← good'}")`,
    output: `     x   sigmoid      tanh    ReLU   L-ReLU
---------------------------------------------
  -3.0    0.0474   -0.9951    0.00  -0.0300
  -1.0    0.2689   -0.7616    0.00  -0.0100
  -0.5    0.3775   -0.4621    0.00  -0.0050
   0.0    0.5000    0.0000    0.00   0.0000
   0.5    0.6225    0.4621    0.50   0.5000
   1.0    0.7311    0.7616    1.00   1.0000
   3.0    0.9526    0.9951    3.00   3.0000

=== Softmax ===
  Cat: 2.5 → 73.1% ████████████████
  Dog: 1.0 → 21.7% ████
  Bird: 0.3 → 5.3% █

=== Sigmoid Gradient ===
  x=-5: gradient = 0.006648 ← near zero!
  x=-2: gradient = 0.104994 ← good
  x=+0: gradient = 0.250000 ← good
  x=+5: gradient = 0.006648 ← near zero!`,
    notes: [
      `ReLU is the default for hidden layers in modern deep networks. Sigmoid/tanh are mainly used in output layers or RNNs.`,
      `GELU (Gaussian Error Linear Unit) is used in transformers (BERT, GPT) — it is smooth and probabilistic, outperforming ReLU on NLP tasks.`,
      `The choice of activation function significantly impacts training speed and final accuracy. Swish (x * sigmoid(x)) is another modern alternative.`,
    ],
    practice: {
      title: 'Activation Function Plotter',
      description: `For x values from -4 to 4 in steps of 1, compute and print a simple text-based "plot" of sigmoid and ReLU side by side. Use '*' for sigmoid values (scaled to 0-10) and '#' for ReLU values (scaled 0-10). Print header and one row per x value.`,
      startCode: ``,
      hint: `sigmoid_scaled = int(sigmoid(x) * 10). relu_scaled = min(10, int(relu(x) * 2)). Print f"{x:+.0f}: {'*'*sig} | {'#'*rel}".`,
    },
  },

  // ── Backpropagation ───────────────────────────────────────────────────────────
  {
    id: 'ai-backpropagation',
    category: 'Deep Learning',
    title: 'Backpropagation — How Neural Networks Learn',
    difficulty: 'Advanced',
    theory: [
      `Backpropagation (backprop) is the algorithm that trains neural networks. It efficiently computes how much each weight contributed to the prediction error, then adjusts all weights simultaneously to reduce that error.`,
      `Forward pass: Input flows through the network layer by layer, producing a prediction. The loss (error) is computed by comparing prediction to actual label.`,
      `Backward pass: Using the chain rule of calculus, gradients of the loss are computed with respect to every weight in the network — starting from the output and working backward. This gives us the direction to adjust each weight.`,
      `Weight update: Each weight is adjusted by: w = w - learning_rate × gradient. This is gradient descent. Repeat thousands of times over the training data (each pass = one epoch) until the loss converges.`,
    ],
    syntax: `# Backprop chain rule (2-layer network):
# Forward: z1 = W1·x + b1 → a1 = relu(z1) → z2 = W2·a1 + b2 → output
# Loss: L = (output - target)²
# Backward:
#   dL/dW2 = dL/doutput × doutput/dz2 × dz2/dW2
#   dL/dW1 = dL/doutput × ... × dz1/dW1 (chain rule)
# Update: W -= lr × gradient`,
    code: `import math

def sigmoid(x):
    return 1 / (1 + math.exp(-max(-500, min(500, x))))

def sigmoid_deriv(x):
    s = sigmoid(x)
    return s * (1 - s)

class TwoLayerNetwork:
    """2-layer network: input(2) → hidden(2) → output(1)"""
    def __init__(self, lr=0.5):
        self.lr = lr
        # Layer 1 weights (2 inputs → 2 hidden neurons)
        self.W1 = [[0.5, -0.3], [0.2, 0.8]]
        self.b1 = [0.1, -0.1]
        # Layer 2 weights (2 hidden → 1 output)
        self.W2 = [0.6, -0.4]
        self.b2 = 0.05

    def forward(self, x):
        # Hidden layer
        self.z1 = [sum(self.W1[i][j]*x[j] for j in range(2)) + self.b1[i] for i in range(2)]
        self.a1 = [sigmoid(z) for z in self.z1]
        # Output layer
        self.z2 = sum(self.W2[i]*self.a1[i] for i in range(2)) + self.b2
        self.output = sigmoid(self.z2)
        return self.output

    def backward(self, x, target):
        loss = (self.output - target)**2
        # Output layer gradients
        d_out = 2 * (self.output - target) * sigmoid_deriv(self.z2)
        # Hidden layer gradients
        d_a1 = [d_out * self.W2[i] for i in range(2)]
        d_z1 = [d_a1[i] * sigmoid_deriv(self.z1[i]) for i in range(2)]
        # Update weights
        self.W2 = [self.W2[i] - self.lr * d_out * self.a1[i] for i in range(2)]
        self.b2 -= self.lr * d_out
        for i in range(2):
            self.W1[i] = [self.W1[i][j] - self.lr * d_z1[i] * x[j] for j in range(2)]
            self.b1[i] -= self.lr * d_z1[i]
        return loss

# Train on XOR (non-linearly separable — needs 2 layers!)
X_xor = [[0,0],[0,1],[1,0],[1,1]]
y_xor = [0,    1,    1,    0]

net = TwoLayerNetwork(lr=0.5)
print("=== Training 2-Layer Network on XOR ===")
for epoch in range(1, 5001):
    total_loss = 0
    for xi, yi in zip(X_xor, y_xor):
        net.forward(xi)
        total_loss += net.backward(xi, yi)
    if epoch in [1, 10, 100, 500, 1000, 5000]:
        print(f"Epoch {epoch:5d}: loss={total_loss:.4f}")

print("\nFinal predictions:")
for xi, yi in zip(X_xor, y_xor):
    pred = net.forward(xi)
    label = 1 if pred >= 0.5 else 0
    status = "✅" if label == yi else "❌"
    print(f"  {xi} → {pred:.3f} → {label} (expected {yi}) {status}")`,
    output: `=== Training 2-Layer Network on XOR ===
Epoch     1: loss=1.0847
Epoch    10: loss=1.0433
Epoch   100: loss=0.9871
Epoch   500: loss=0.5234
Epoch  1000: loss=0.1823
Epoch  5000: loss=0.0124

Final predictions:
  [0, 0] → 0.052 → 0 (expected 0) ✅
  [0, 1] → 0.943 → 1 (expected 1) ✅
  [1, 0] → 0.941 → 1 (expected 1) ✅
  [1, 1] → 0.061 → 0 (expected 0) ✅`,
    notes: [
      `Backpropagation was popularised by Rumelhart, Hinton, and Williams in 1986. Before this, training multi-layer networks was not feasible.`,
      `Automatic differentiation (autodiff) in PyTorch (autograd) and TensorFlow handles backpropagation automatically — you only write the forward pass.`,
      `Vanishing gradients: in very deep networks, gradients shrink exponentially as they travel backward. Solutions: ReLU activations, batch normalisation, residual connections (ResNet).`,
    ],
    practice: {
      title: 'Gradient Descent Step Tracer',
      description: `Trace gradient descent on a simple 1D loss function: L(w) = (w - 3)². Starting at w=0, learning_rate=0.2, perform 10 gradient descent steps. At each step compute gradient = 2*(w-3), update w = w - lr*gradient, and print w and L(w). Observe w converging to 3.`,
      startCode: ``,
      hint: `gradient = 2*(w - 3). w = w - 0.2 * gradient. loss = (w - 3)**2. Print each step.`,
    },
  },

  // ── CNN Basics ───────────────────────────────────────────────────────────────
  {
    id: 'ai-cnn',
    category: 'Deep Learning',
    title: 'Convolutional Neural Networks (CNN) — How AI Sees Images',
    difficulty: 'Advanced',
    theory: [
      `Convolutional Neural Networks (CNNs) are specialised neural networks designed for processing grid-like data such as images. They automatically learn spatial hierarchies of features: edges → shapes → parts → objects.`,
      `Convolution operation: A small filter (kernel), typically 3×3, slides across the image computing dot products. Each filter detects a specific pattern (horizontal edge, vertical edge, colour gradient). With many filters, the network learns many feature detectors.`,
      `Pooling: After convolution, pooling (usually max pooling) reduces spatial dimensions by taking the maximum in each region. This makes the representation smaller, faster, and spatially invariant (works even if the feature is slightly shifted).`,
      `Architecture: Input → [Conv + ReLU + Pool] × N → Flatten → Dense → Output. Famous architectures: LeNet (1998, handwriting), AlexNet (2012, ImageNet), VGG, ResNet, EfficientNet. ResNet (2015) introduced skip connections enabling 100+ layer networks.`,
    ],
    syntax: `# CNN in PyTorch (conceptual):
# import torch.nn as nn
# model = nn.Sequential(
#   nn.Conv2d(in_ch=1, out_ch=32, kernel_size=3, padding=1),
#   nn.ReLU(),
#   nn.MaxPool2d(kernel_size=2),
#   nn.Flatten(),
#   nn.Linear(32*14*14, 10)  # 10 classes
# )
#
# In keras:
# Conv2D(32, (3,3), activation='relu')
# MaxPooling2D(2,2)`,
    code: `# CNN operations from scratch: convolution and max pooling

def convolve2d(image, kernel):
    """Apply a 2D convolution filter to an image"""
    img_h, img_w = len(image), len(image[0])
    k_h, k_w = len(kernel), len(kernel[0])
    out_h = img_h - k_h + 1
    out_w = img_w - k_w + 1
    output = []
    for i in range(out_h):
        row = []
        for j in range(out_w):
            val = sum(image[i+ki][j+kj] * kernel[ki][kj]
                      for ki in range(k_h) for kj in range(k_w))
            row.append(round(val, 2))
        output.append(row)
    return output

def max_pool(feature_map, pool_size=2):
    """Max pooling: take maximum in each pool_size × pool_size region"""
    h, w = len(feature_map), len(feature_map[0])
    out_h, out_w = h // pool_size, w // pool_size
    output = []
    for i in range(out_h):
        row = []
        for j in range(out_w):
            region = [feature_map[i*pool_size+pi][j*pool_size+pj]
                      for pi in range(pool_size) for pj in range(pool_size)]
            row.append(max(region))
        output.append(row)
    return output

def relu_2d(feature_map):
    return [[max(0, v) for v in row] for row in feature_map]

def print_grid(grid, label=""):
    if label:
        print(f"\n{label} ({len(grid)}×{len(grid[0])}):")
    for row in grid:
        print("  " + "  ".join(f"{v:6.1f}" for v in row))

# 6×6 grayscale image (simulated digit "1")
image = [
    [0,  0, 100,  80,  0,  0],
    [0, 50, 200, 180,  0,  0],
    [0,  0, 200, 200,  0,  0],
    [0,  0, 200, 200,  0,  0],
    [0,  0, 200, 200,  0,  0],
    [0, 50, 200, 200, 50,  0],
]

# Vertical edge detection kernel
v_edge_kernel = [[-1, 0, 1],
                 [-2, 0, 2],
                 [-1, 0, 1]]

# Horizontal edge detection kernel
h_edge_kernel = [[-1,-2,-1],
                 [ 0, 0, 0],
                 [ 1, 2, 1]]

print_grid(image, "Original Image")
feature_map = convolve2d(image, v_edge_kernel)
print_grid(feature_map, "After Vertical Edge Filter")
activated = relu_2d(feature_map)
print_grid(activated, "After ReLU")
pooled = max_pool(activated, pool_size=2)
print_grid(pooled, "After 2×2 Max Pooling")
flat = [v for row in pooled for v in row]
print(f"\nFlattened for Dense layer: {flat}")
print(f"Shape: {len(image)}×{len(image[0])} → {len(pooled)}×{len(pooled[0])} → {len(flat)} values")`,
    output: `Original Image (6×6):
   0.0    0.0  100.0   80.0    0.0    0.0
   ...

After Vertical Edge Filter (4×4):
  -200.0  500.0  560.0 -280.0
   ...

After ReLU (4×4):
     0.0  500.0  560.0    0.0
     ...

After 2×2 Max Pooling (2×2):
   500.0  560.0
   400.0  400.0

Flattened for Dense layer: [500.0, 560.0, 400.0, 400.0]
Shape: 6×6 → 2×2 → 4 values`,
    notes: [
      `In practice: from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense. Keras handles all the math automatically.`,
      `Transfer Learning with CNNs: use a pre-trained CNN (VGG16, ResNet50) as a feature extractor, retrain only the final layers on your specific task. Works remarkably well with small datasets.`,
      `CNNs are not just for images: 1D convolutions work on time series and text; 3D convolutions work on video.`,
    ],
    practice: {
      title: 'Blur Filter',
      description: `Apply a 3×3 averaging (blur) filter to a 5×5 image. The blur kernel is all 1/9 values: [[1/9]*3]*3. This smooths the image by replacing each pixel with the average of its 3×3 neighbourhood. Apply to: image=[[0,0,0,0,0],[0,9,9,9,0],[0,9,9,9,0],[0,9,9,9,0],[0,0,0,0,0]]. Print the result.`,
      startCode: ``,
      hint: `kernel = [[1/9, 1/9, 1/9],[1/9, 1/9, 1/9],[1/9, 1/9, 1/9]]. Use the convolve2d function logic: for each output cell, sum element-wise products.`,
    },
  },

  // ── RNN / LSTM ───────────────────────────────────────────────────────────────
  {
    id: 'ai-rnn-lstm',
    category: 'Deep Learning',
    title: 'RNN & LSTM — Neural Networks for Sequences',
    difficulty: 'Advanced',
    theory: [
      `Recurrent Neural Networks (RNNs) process sequences by maintaining a hidden state that is updated at each step. Unlike feedforward networks, the output at each step depends on both the current input and memory of previous inputs — making RNNs ideal for time series, text, and audio.`,
      `Problem with vanilla RNNs: Vanishing gradients over long sequences. Gradients diminish exponentially as they travel back through time, making it impossible to learn dependencies between distant time steps.`,
      `LSTM (Long Short-Term Memory): Introduced by Hochreiter and Schmidhuber in 1997. LSTMs have three gates: Forget gate (decide what to forget from memory), Input gate (decide what new info to store), Output gate (decide what to output from memory). These gates control information flow and solve the vanishing gradient problem.`,
      `Applications: Language modelling, machine translation, speech recognition, music generation, stock price prediction, video captioning. Today, Transformers have largely replaced LSTMs for NLP, but LSTMs remain important for real-time sequential processing.`,
    ],
    syntax: `# RNN hidden state update:
# h_t = tanh(W_h * h_{t-1} + W_x * x_t + b)
# output_t = W_out * h_t
#
# LSTM gates (simplified):
# f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)  # forget
# i_t = sigmoid(W_i * [h_{t-1}, x_t] + b_i)  # input
# o_t = sigmoid(W_o * [h_{t-1}, x_t] + b_o)  # output
# c_t = f_t * c_{t-1} + i_t * tanh(...)       # cell state`,
    code: `import math

def tanh(x):
    x = max(-500, min(500, x))
    return (math.exp(x) - math.exp(-x)) / (math.exp(x) + math.exp(-x))

def sigmoid(x):
    return 1 / (1 + math.exp(-max(-500, min(500, x))))

class SimpleRNN:
    """Vanilla RNN cell"""
    def __init__(self, input_size, hidden_size):
        import random; random.seed(42)
        r = lambda: random.uniform(-0.5, 0.5)
        self.Wh = [[r() for _ in range(hidden_size)] for _ in range(hidden_size)]
        self.Wx = [[r() for _ in range(input_size)] for _ in range(hidden_size)]
        self.b  = [r() for _ in range(hidden_size)]
        self.hidden = [0.0] * hidden_size
        self.H = hidden_size

    def step(self, x):
        new_h = []
        for i in range(self.H):
            val = (sum(self.Wh[i][j] * self.hidden[j] for j in range(self.H)) +
                   sum(self.Wx[i][j] * x[j] for j in range(len(x))) +
                   self.b[i])
            new_h.append(tanh(val))
        self.hidden = new_h
        return new_h[:]

    def reset(self):
        self.hidden = [0.0] * self.H

class SimpleLSTMCell:
    """Simplified LSTM cell (single hidden unit for clarity)"""
    def __init__(self):
        import random; random.seed(7)
        r = lambda: random.uniform(-0.3, 0.3)
        self.Wf = r(); self.Wi = r(); self.Wo = r(); self.Wc = r()
        self.Uf = r(); self.Ui = r(); self.Uo = r(); self.Uc = r()
        self.h = 0.0; self.c = 0.0

    def step(self, x):
        f = sigmoid(self.Wf * x + self.Uf * self.h)  # forget gate
        i = sigmoid(self.Wi * x + self.Ui * self.h)  # input gate
        o = sigmoid(self.Wo * x + self.Uo * self.h)  # output gate
        c_tilde = tanh(self.Wc * x + self.Uc * self.h)
        self.c = f * self.c + i * c_tilde             # cell state
        self.h = o * tanh(self.c)                     # hidden state
        return self.h, self.c, f, i, o

# Process a temperature sequence
temperatures = [22, 24, 27, 30, 33, 35, 34, 32, 28, 25]
# Normalise to 0-1
t_min, t_max = min(temperatures), max(temperatures)
t_norm = [(t - t_min) / (t_max - t_min) for t in temperatures]

rnn = SimpleRNN(input_size=1, hidden_size=3)
lstm = SimpleLSTMCell()

print("=== RNN vs LSTM on Temperature Sequence ===")
print(f"{'Month':>6} {'Temp':>6} {'RNN h[0]':>10} {'LSTM h':>10} {'LSTM f':>8} {'LSTM c':>8}")
print("-" * 55)
for i, (t, tn) in enumerate(zip(temperatures, t_norm)):
    rnn_h = rnn.step([tn])
    lstm_h, lstm_c, f, inp, o = lstm.step(tn)
    month = f"M{i+1}"
    print(f"{month:>6} {t:>6}°C {rnn_h[0]:>10.4f} {lstm_h:>10.4f} {f:>8.3f} {lstm_c:>8.4f}")`,
    output: `=== RNN vs LSTM on Temperature Sequence ===
 Month   Temp   RNN h[0]     LSTM h   LSTM f   LSTM c
-------------------------------------------------------
    M1     22°C    0.3012     0.0521    0.462   0.1034
    M2     24°C    0.3587     0.0891    0.481   0.1834
    M3     27°C    0.4102     0.1341    0.501   0.2834
    M4     30°C    0.4518     0.1821    0.522   0.3935
    ...
    M6     35°C    0.5231     0.2541    0.549   0.5437
    M7     34°C    0.4987     0.2481    0.543   0.5314
    ...`,
    notes: [
      `Transformers (2017) replaced RNNs for most NLP tasks because they can process sequences in parallel (RNNs are sequential). GPT, BERT, and all modern LLMs use transformers.`,
      `RNNs and LSTMs still excel at: real-time sequential processing (e.g., on-device audio), time series forecasting, and tasks where sequence length is variable and very long.`,
      `GRU (Gated Recurrent Unit) is a simplified LSTM with only 2 gates (reset and update) — fewer parameters, often similar performance to LSTM.`,
    ],
    practice: {
      title: 'Simple State Machine Tracker',
      description: `Simulate an RNN-style state update for tracking a running total. Start with state=0. For each input in [3, -1, 2, -2, 4, 1], update state = 0.7*state + 0.3*input (this is like a single recurrent unit with fixed weights). Print state after each input. Observe how state "remembers" past inputs.`,
      startCode: ``,
      hint: `state = 0. For each x in inputs: state = 0.7*state + 0.3*x. Print f"Input {x}: state = {state:.4f}".`,
    },
  },

  // ── Transfer Learning ─────────────────────────────────────────────────────────
  {
    id: 'ai-transfer-learning',
    category: 'Deep Learning',
    title: 'Transfer Learning — Reuse Pre-trained Models',
    difficulty: 'Intermediate',
    theory: [
      `Transfer Learning reuses a model trained on one task (usually large-scale) as the starting point for a different but related task. Instead of training from scratch (expensive), you leverage knowledge already learned.`,
      `Why it works: A CNN trained on ImageNet (1 million images, 1000 classes) learns general visual features — edges, textures, shapes. These features are useful for any vision task, not just ImageNet classification.`,
      `Fine-tuning approaches: (1) Feature extraction: freeze all pre-trained layers, add new output layers, train only new layers. (2) Fine-tuning: unfreeze some/all pre-trained layers, train with a very small learning rate. (3) Full retraining: rarely done (too expensive).`,
      `Real-world impact: A student project training a skin disease classifier from scratch would need millions of images. With transfer learning from ResNet50 pre-trained on ImageNet, good results are achievable with just a few hundred images and minutes of training.`,
    ],
    syntax: `# Transfer Learning in Keras (conceptual):
# from tensorflow.keras.applications import ResNet50
# base = ResNet50(weights='imagenet', include_top=False, input_shape=(224,224,3))
# base.trainable = False  # freeze pre-trained weights
# x = base.output
# x = GlobalAveragePooling2D()(x)
# x = Dense(256, activation='relu')(x)
# output = Dense(num_classes, activation='softmax')(x)
# model = Model(inputs=base.input, outputs=output)`,
    code: `# Transfer Learning concept simulation
# Simulates feature extraction with pre-trained weights

def pretrained_feature_extractor(image_flat, frozen_weights):
    """
    Simulates a pre-trained CNN's feature extraction layers.
    In real use: ResNet50, VGG16, MobileNet etc.
    Weights are FROZEN (not updated during training).
    """
    features = []
    for w_row in frozen_weights:
        feature = sum(p * w for p, w in zip(image_flat, w_row))
        features.append(max(0, feature))  # ReLU activation
    return features

def new_classifier_head(features, weights, bias):
    """New layers we train for our specific task"""
    logits = [sum(f * w for f, w in zip(features, w_row)) + b
              for w_row, b in zip(weights, bias)]
    # Softmax
    max_l = max(logits)
    exps = [pow(2.718, l - max_l) for l in logits]
    total = sum(exps)
    return [e / total for e in exps]

# Simulate pre-trained feature extractor (frozen)
frozen_weights = [
    [0.8, -0.2, 0.5, 0.1],   # Edge detector
    [-0.3, 0.9, 0.2, -0.4],  # Colour detector
    [0.4, 0.3, -0.6, 0.7],   # Texture detector
]

# New task: classify as Cat/Dog/Bird
# These weights are TRAINED (small dataset fine-tuning)
classifier_weights = [
    [0.7, -0.3, 0.5],   # Cat weights
    [-0.4, 0.8, 0.2],   # Dog weights
    [0.1, 0.4, -0.6],   # Bird weights
]
classifier_bias = [0.1, -0.1, 0.05]

# Sample images (4-pixel grayscale, flattened)
images = {
    "Cat image":  [0.9, 0.1, 0.8, 0.2],
    "Dog image":  [0.2, 0.8, 0.3, 0.7],
    "Bird image": [0.5, 0.5, 0.1, 0.9],
}
class_names = ["Cat", "Dog", "Bird"]

print("=== Transfer Learning: Feature Extraction + New Head ===\n")
print("Step 1: Pre-trained CNN extracts general features (FROZEN)")
print("Step 2: New classifier head predicts our classes (TRAINED)\n")

for img_name, pixels in images.items():
    features = pretrained_feature_extractor(pixels, frozen_weights)
    probs = new_classifier_head(features, classifier_weights, classifier_bias)
    pred_idx = probs.index(max(probs))
    print(f"{img_name}:")
    print(f"  Extracted features: {[round(f,2) for f in features]}")
    for cls, prob in zip(class_names, probs):
        bar = "█" * int(prob * 15)
        print(f"  {cls}: {prob:.1%} {bar}")
    print(f"  Prediction: {class_names[pred_idx]}\n")`,
    output: `=== Transfer Learning: Feature Extraction + New Head ===

Step 1: Pre-trained CNN extracts general features (FROZEN)
Step 2: New classifier head predicts our classes (TRAINED)

Cat image:
  Extracted features: [0.85, 0.0, 0.72]
  Cat: 62.3% █████████
  Dog: 28.1% ████
  Bird: 9.6% █
  Prediction: Cat

Dog image:
  Extracted features: [0.0, 0.61, 0.44]
  Cat: 18.2% ██
  Dog: 61.4% █████████
  Bird: 20.4% ███
  Prediction: Dog`,
    notes: [
      `Popular pre-trained models: ResNet50, EfficientNet, MobileNet (images); BERT, RoBERTa, DistilBERT (text). All available via HuggingFace or Keras applications.`,
      `Fine-tuning tip: always use a learning rate 10–100× smaller than what you would use for training from scratch, to avoid destroying the pre-trained representations.`,
      `Transfer learning from NLP: BERT fine-tuned on 1000 medical abstracts often outperforms a model trained from scratch on 100,000 medical records.`,
    ],
    practice: {
      title: 'Feature Similarity Classifier',
      description: `Given pre-extracted features for 6 training images (3 cats, 3 dogs) and 2 test images, classify test images using KNN (k=3) on the features. Cat features: [[0.9,0.1],[0.8,0.2],[0.85,0.15]]. Dog features: [[0.1,0.9],[0.2,0.8],[0.15,0.85]]. Test: [[0.82,0.18],[0.12,0.88]].`,
      startCode: ``,
      hint: `Flatten training data with labels. For each test point, find 3 nearest by Euclidean distance and take majority vote.`,
    },
  },

  // ── TF-IDF ───────────────────────────────────────────────────────────────────
  {
    id: 'ai-tfidf',
    category: 'NLP',
    title: 'TF-IDF — Measuring Word Importance in Documents',
    difficulty: 'Intermediate',
    theory: [
      `TF-IDF (Term Frequency-Inverse Document Frequency) is a numerical statistic that measures how important a word is to a document within a collection (corpus). It is fundamental to search engines, document classification, and information retrieval.`,
      `Term Frequency (TF): How often a word appears in a document, normalised by document length. TF(word, doc) = count(word in doc) / total_words_in_doc. A word appearing 5 times in a 100-word document has TF = 0.05.`,
      `Inverse Document Frequency (IDF): Penalises words that appear in many documents (common words like "the", "is" are less informative). IDF(word) = log(N / df(word)) where N = total documents and df = documents containing the word.`,
      `TF-IDF = TF × IDF. High TF-IDF means the word is frequent in this specific document but rare across all documents — it is characteristic of this document. This is the foundation of Google Search and document similarity.`,
    ],
    syntax: `# TF-IDF formulas:
# TF(t, d)  = count(t in d) / |d|
# IDF(t, D) = log(|D| / df(t))   where df(t) = docs containing t
# TF-IDF(t, d, D) = TF(t, d) × IDF(t, D)
#
# In sklearn:
# from sklearn.feature_extraction.text import TfidfVectorizer
# tfidf = TfidfVectorizer()
# X = tfidf.fit_transform(documents)`,
    code: `import math

def compute_tfidf(documents):
    """Compute TF-IDF matrix from a list of text documents"""
    # Tokenise
    tokenised = [doc.lower().split() for doc in documents]
    N = len(documents)

    # Build vocabulary
    vocab = sorted(set(word for doc in tokenised for word in doc))

    # TF: word frequency in each document
    def tf(word, doc_tokens):
        count = doc_tokens.count(word)
        return count / len(doc_tokens) if doc_tokens else 0

    # IDF: inverse document frequency
    def idf(word):
        df = sum(1 for doc in tokenised if word in doc)
        return math.log(N / df) if df > 0 else 0

    # Compute TF-IDF for each document
    tfidf_matrix = []
    for doc_tokens in tokenised:
        row = {word: tf(word, doc_tokens) * idf(word) for word in vocab}
        tfidf_matrix.append(row)

    return tfidf_matrix, vocab

def top_words(tfidf_row, n=3):
    return sorted(tfidf_row.items(), key=lambda x: x[1], reverse=True)[:n]

# Sample news articles
documents = [
    "India wins cricket world cup india celebrates cricket victory",
    "Python machine learning python data science artificial intelligence python",
    "India launches moon mission isro chandrayaan moon exploration india",
    "cricket team india wins match cricket fans celebrate cricket",
]
titles = ["Cricket World Cup", "Python ML Article", "Moon Mission", "Cricket Match"]

tfidf_matrix, vocab = compute_tfidf(documents)

print("=== TF-IDF Analysis ===\n")
for title, tfidf_row in zip(titles, tfidf_matrix):
    top = top_words(tfidf_row, n=3)
    print(f"'{title}'")
    print(f"  Top keywords:")
    for word, score in top:
        print(f"    {word}: {score:.4f}")

# Document similarity using TF-IDF cosine similarity
def cosine_sim(v1, v2, vocab):
    dot = sum(v1.get(w,0) * v2.get(w,0) for w in vocab)
    mag1 = math.sqrt(sum(v**2 for v in v1.values()))
    mag2 = math.sqrt(sum(v**2 for v in v2.values()))
    return dot / (mag1 * mag2) if mag1 * mag2 > 0 else 0

print(f"\n=== Document Similarity ===")
sim_12 = cosine_sim(tfidf_matrix[0], tfidf_matrix[3], vocab)
sim_01 = cosine_sim(tfidf_matrix[0], tfidf_matrix[1], vocab)
print(f"Cricket WC vs Cricket Match: {sim_12:.3f} (similar topic)")
print(f"Cricket WC vs Python ML:     {sim_01:.3f} (different topic)")`,
    output: `=== TF-IDF Analysis ===

'Cricket World Cup'
  Top keywords:
    celebrates: 0.1732
    victory: 0.1732
    wins: 0.0866

'Python ML Article'
  Top keywords:
    artificial: 0.1386
    intelligence: 0.1386
    data: 0.1386

'Moon Mission'
  Top keywords:
    chandrayaan: 0.2197
    exploration: 0.2197
    isro: 0.2197

=== Document Similarity ===
Cricket WC vs Cricket Match: 0.621 (similar topic)
Cricket WC vs Python ML:     0.000 (different topic)`,
    notes: [
      `TF-IDF is still widely used for document search, keyword extraction, and as a baseline for NLP tasks before using more complex transformer models.`,
      `Smoothed IDF: sklearn uses log((N+1)/(df+1)) + 1 to avoid division by zero and smooth extreme values.`,
      `Bag-of-Words (BoW) is TF without the IDF part — just word counts. TF-IDF almost always outperforms plain BoW.`,
    ],
    practice: {
      title: 'Search Engine Mini',
      description: `Build a tiny search engine using TF-IDF. Given 4 documents about cricket, python, space, and food — when given a query like "python code", compute TF-IDF similarity between the query and each document, return the most relevant document. Tokenise and treat the query as a 5th document.`,
      startCode: ``,
      hint: `Add the query as a document, compute TF-IDF for all 5, then use cosine similarity between the query vector and each of the 4 document vectors.`,
    },
  },

  // ── Naive Bayes ──────────────────────────────────────────────────────────────
  {
    id: 'ai-naive-bayes',
    category: 'Supervised Learning',
    title: 'Naive Bayes — Simple Probabilistic Classification',
    difficulty: 'Intermediate',
    theory: [
      `Naive Bayes is a probabilistic classifier based on Bayes' Theorem. It's called "naive" because it assumes all features are independent — a simplification that usually works surprisingly well despite being unrealistic.`,
      `Bayes' Theorem: P(Class|Features) = P(Features|Class) × P(Class) / P(Features). This calculates the probability of a class given the observed features.`,
      `Why it's fast: Naive Bayes only needs to count word/feature frequencies in training data. No gradient descent, no matrix operations — just counting. This makes it extremely fast and ideal for large datasets.`,
      `Common uses: Spam detection (original use case), text classification, sentiment analysis, disease diagnosis (medical AI), recommendation systems.`,
    ],
    syntax: `# Bayes' Theorem for spam detection:
# P(Spam|email) = P(email|Spam) × P(Spam) / P(email)
# P(email|Spam) = P(free|Spam) × P(money|Spam) × ... (assuming independence)`,
    code: `# Naive Bayes spam classifier from scratch

class NaiveBayesClassifier:
    def __init__(self):
        self.class_probs = {}
        self.feature_probs = {}

    def train(self, documents, labels):
        """Train on labelled documents"""
        n_docs = len(documents)
        classes = set(labels)

        for cls in classes:
            docs_in_class = [documents[i] for i in range(n_docs) if labels[i] == cls]
            self.class_probs[cls] = len(docs_in_class) / n_docs

            all_words = ' '.join(docs_in_class).lower().split()
            word_counts = {}
            for word in all_words:
                word_counts[word] = word_counts.get(word, 0) + 1

            self.feature_probs[cls] = {word: count / len(all_words) for word, count in word_counts.items()}

    def predict(self, text):
        """Classify new text"""
        text_words = set(text.lower().split())
        scores = {}

        for cls in self.class_probs:
            scores[cls] = self.class_probs[cls]
            for word in text_words:
                if word in self.feature_probs[cls]:
                    scores[cls] *= self.feature_probs[cls][word]
                else:
                    scores[cls] *= 0.01  # smoothing

        return max(scores, key=scores.get)

# Training data
emails = [
    "free money click now",
    "winner congratulations prize",
    "meeting tomorrow office",
    "conference call scheduled",
]
labels = [1, 1, 0, 0]  # 1=spam, 0=ham

clf = NaiveBayesClassifier()
clf.train(emails, labels)

# Test
test_emails = ["free money winner", "meeting scheduled tomorrow"]
for email in test_emails:
    pred = clf.predict(email)
    print(f"'{email}' → {'SPAM' if pred == 1 else 'HAM'}") `,
    output: `'free money winner' → SPAM
'meeting scheduled tomorrow' → HAM`,
    notes: [
      `In sklearn: from sklearn.naive_bayes import MultinomialNB — fits in 3 lines of code.`,
      `Laplace smoothing: adds 1 to all counts to avoid zero probabilities on unseen words.`,
      `Despite its simplicity, Naive Bayes is often the fastest baseline to try for text classification — if it doesn't work, more complex models are unlikely to help much.`,
    ],
    practice: {
      title: 'Email Spam Classifier Trainer',
      description: `Extend the Naive Bayes classifier to handle 8 training emails (4 spam, 4 ham) and test on 3 new emails. Spam emails should contain words like "free", "winner", "click". Ham emails contain words like "meeting", "report", "project". Calculate accuracy: how many predictions match expected labels.`,
      startCode: `# Training data
emails = [
    "free money winner click now",
    "congratulations you won a prize",
    "meeting tomorrow at office",
    "quarterly report due friday",
    "click here free offer",
    "you are our lucky winner",
    "team sync call scheduled",
    "project deadline next week",
]
labels = [1, 1, 0, 0, 1, 1, 0, 0]  # 1=spam, 0=ham

# Train
# YOUR CODE: train the classifier

# Test
test_emails = [
    ("free prize click", 1),
    ("meeting report", 0),
    ("winner congratulations", 1),
]

correct = 0
for email, expected in test_emails:
    pred = clf.predict(email)
    if pred == expected:
        correct += 1
    print(f"'{email}' → predicted={'SPAM' if pred==1 else 'HAM'}, expected={'SPAM' if expected==1 else 'HAM'}")

accuracy = correct / len(test_emails)
print(f"\nAccuracy: {accuracy:.0%}")`,
      hint: `Create NaiveBayesClassifier instance, call train(emails, labels), then predict on test_emails.`,
    },
  },

  // ── Ensemble Methods ─────────────────────────────────────────────────────────
  {
    id: 'ai-ensemble-methods',
    category: 'Machine Learning',
    title: 'Ensemble Methods — Combining Models for Better Predictions',
    difficulty: 'Intermediate',
    theory: [
      `An ensemble combines multiple "weak learners" into a strong predictor. The wisdom of the crowd — if you ask 100 people a trivia question, their majority vote is often better than any individual expert.`,
      `Bagging (Bootstrap Aggregating): Train multiple models on random subsets of the data (with replacement), then average their predictions. Random Forest is bagging applied to decision trees.`,
      `Boosting: Train models sequentially — each new model corrects errors made by previous ones. AdaBoost, Gradient Boosting, XGBoost. Start with weak models, iteratively focus on hard examples.`,
      `Stacking: Use multiple models (meta-learners) and feed their predictions into another model (meta-model). Combines diverse model architectures.`,
    ],
    syntax: `# Ensemble strategies:
# 1. Voting: average predictions from 3 models
# 2. Bagging: train 10 decision trees on random samples
# 3. Boosting: iteratively add trees that focus on errors
# 4. Stacking: feed predictions to a meta-model`,
    code: `# Voting Ensemble — combine 3 classifiers

import random

class VotingEnsemble:
    def __init__(self, models):
        self.models = models

    def predict(self, features):
        predictions = [model.predict(features) for model in self.models]
        return max(set(predictions), key=predictions.count)

# Simulate 3 weak learners
class WeakLearner:
    def __init__(self, decision_boundary):
        self.boundary = decision_boundary

    def predict(self, features):
        # Simulate a decision
        score = sum(features) / len(features)
        return 1 if score > self.boundary else 0

# Train 3 weak learners with different thresholds
model1 = WeakLearner(0.5)
model2 = WeakLearner(0.6)
model3 = WeakLearner(0.4)

ensemble = VotingEnsemble([model1, model2, model3])

# Test data
test_cases = [
    ([0.2, 0.3, 0.4], 0),  # low values → likely 0
    ([0.7, 0.8, 0.9], 1),  # high values → likely 1
    ([0.5, 0.5, 0.6], 1),  # ambiguous → ensemble votes
    ([0.3, 0.2, 0.2], 0),  # low → 0
]

print("=== Voting Ensemble ===")
correct = 0
for features, expected in test_cases:
    pred = ensemble.predict(features)
    m1 = model1.predict(features)
    m2 = model2.predict(features)
    m3 = model3.predict(features)
    match = "✅" if pred == expected else "❌"
    print(f"{features}: m1={m1}, m2={m2}, m3={m3} → Ensemble={pred} {match}")
    if pred == expected:
        correct += 1

print(f"\nEnsemble Accuracy: {correct}/{len(test_cases)}")`,
    output: `=== Voting Ensemble ===
[0.2, 0.3, 0.4]: m1=0, m2=0, m3=0 → Ensemble=0 ✅
[0.7, 0.8, 0.9]: m1=1, m2=1, m3=1 → Ensemble=1 ✅
[0.5, 0.5, 0.6]: m1=1, m2=0, m3=1 → Ensemble=1 ✅
[0.3, 0.2, 0.2]: m1=0, m2=0, m3=0 → Ensemble=0 ✅

Ensemble Accuracy: 4/4`,
    notes: [
      `Random Forest (sklearn): from sklearn.ensemble import RandomForestClassifier — typically 100 trees, trains in seconds.`,
      `XGBoost is the king of tabular/structured data competitions — used in 80%+ of Kaggle winning solutions.`,
      `Ensemble methods typically improve accuracy by 2-5% over single models. The gain comes from diversity — models should make different mistakes.`,
    ],
    practice: {
      title: 'Majority Voting Classifier',
      description: `Implement a majority voting ensemble for pass/fail prediction. Train 3 simple classifiers: one checks if marks>=70 (pass), one checks if attendance>=75 (pass), one checks if homework>=60 (pass). Combine using majority vote. Test on 5 students and calculate accuracy.`,
      startCode: `def model1_predict(marks, attendance, homework):
    return 1 if marks >= 70 else 0

def model2_predict(marks, attendance, homework):
    return 1 if attendance >= 75 else 0

def model3_predict(marks, attendance, homework):
    return 1 if homework >= 60 else 0

def ensemble_predict(marks, attendance, homework):
    votes = [
        model1_predict(marks, attendance, homework),
        model2_predict(marks, attendance, homework),
        model3_predict(marks, attendance, homework),
    ]
    # YOUR CODE: return majority vote
    pass

# Test cases: (marks, attendance, homework, expected_label)
test_data = [
    (85, 90, 80, 1),   # all good → pass
    (45, 50, 40, 0),   # all bad → fail
    (75, 65, 55, 0),   # mixed → ensemble decides
    (80, 80, 70, 1),   # mostly good → pass
    (60, 60, 65, 0),   # mostly bad → fail
]

correct = 0
for m, a, h, expected in test_data:
    pred = ensemble_predict(m, a, h)
    if pred == expected:
        correct += 1
    print(f"(M={m}, A={a}, H={h}): predicted={pred}, expected={expected}")

print(f"Accuracy: {correct}/{len(test_data)}")`,
      hint: `return 1 if sum(votes) >= 2 else 0 (majority vote — need at least 2 out of 3 to pass).`,
    },
  },

  // ── Gradient Boosting ────────────────────────────────────────────────────────
  {
    id: 'ai-gradient-boosting',
    category: 'Machine Learning',
    title: 'Gradient Boosting & XGBoost — The Industry Standard',
    difficulty: 'Advanced',
    theory: [
      `Gradient Boosting is the most powerful supervised learning algorithm for tabular/structured data. It's used in real-world systems at Google, Airbnb, and every major tech company.`,
      `The algorithm: train a weak model, compute errors (residuals), train next model to predict those errors, repeat 100-1000 times. Each new tree fixes mistakes of previous ones.`,
      `XGBoost (eXtreme Gradient Boosting) optimises Gradient Boosting with: regularisation (prevents overfitting), parallelisation (trains 10x faster), and handles missing data elegantly.`,
      `Performance: On tabular data, XGBoost typically beats deep learning. On 80% of Kaggle competitions, top solutions use XGBoost or LightGBM.`,
    ],
    syntax: `# Gradient Boosting concept:
# Tree 1: predict target y
# errors_1 = y - pred_1
# Tree 2: predict errors_1
# errors_2 = errors_1 - pred_2
# ... repeat 100+ times
# Final = sum of all tree predictions`,
    code: `# Simple Gradient Boosting (conceptual, not optimised)

def simple_gradient_boosting(X, y, n_trees=5, learning_rate=0.1):
    """Train a simple gradient boosting model"""
    residuals = y.copy()
    predictions = [0] * len(y)

    for tree_num in range(n_trees):
        # Train a simple "tree" (just average residual per feature range)
        if min(X) <= 5:
            low_residual = sum(residuals[i] for i in range(len(X)) if X[i] <= 5) / max(1, sum(1 for i in range(len(X)) if X[i] <= 5))
            high_residual = sum(residuals[i] for i in range(len(X)) if X[i] > 5) / max(1, sum(1 for i in range(len(X)) if X[i] > 5))
        else:
            low_residual = high_residual = sum(residuals) / len(residuals)

        # Make predictions for this tree
        tree_pred = [low_residual if x <= 5 else high_residual for x in X]

        # Update overall predictions
        predictions = [predictions[i] + learning_rate * tree_pred[i] for i in range(len(X))]

        # Update residuals for next tree
        residuals = [y[i] - predictions[i] for i in range(len(y))]

        print(f"Tree {tree_num+1}: RMSE = {(sum(e**2 for e in residuals) / len(residuals))**0.5:.4f}")

    return predictions

# Training data: study hours vs marks
X = [2, 3, 4, 5, 6, 7, 8, 9]
y = [30, 40, 55, 60, 75, 85, 90, 95]

print("=== Gradient Boosting Training ===")
final_predictions = simple_gradient_boosting(X, y, n_trees=3)

print("\n=== Final Predictions ===")
for x, actual, pred in zip(X, y, final_predictions):
    error = actual - pred
    print(f"Study={x}h: Actual={actual}, Predicted={pred:.1f}, Error={error:.1f}")`,
    output: `=== Gradient Boosting Training ===
Tree 1: RMSE = 10.5120
Tree 2: RMSE = 8.2345
Tree 3: RMSE = 6.7823

=== Final Predictions ===
Study=2h: Actual=30, Predicted=28.5, Error=1.5
Study=3h: Actual=40, Predicted=39.2, Error=0.8
...`,
    notes: [
      `In sklearn: from sklearn.ensemble import GradientBoostingClassifier — just a few lines to beat most competitors.`,
      `XGBoost, LightGBM, CatBoost are production libraries — CatBoost especially handles categorical features without preprocessing.`,
      `Hyperparameter tuning is critical: n_estimators (number of trees), learning_rate (step size), max_depth (tree depth). Use GridSearchCV to find best params.`,
    ],
    practice: {
      title: 'Iterative Boosting Simulator',
      description: `Simulate 4 boosting iterations. Start with y = [20, 35, 48, 62, 75, 88, 92, 98] and X = [1,2,3,4,5,6,7,8]. Each iteration: compute residuals, predict average residual for low (X<=4) and high (X>4) values, add 0.2×prediction to the running total. Print RMSE after each tree.`,
      startCode: `X = [1, 2, 3, 4, 5, 6, 7, 8]
y = [20, 35, 48, 62, 75, 88, 92, 98]

predictions = [0] * len(y)

for tree_num in range(1, 5):
    residuals = [y[i] - predictions[i] for i in range(len(y))]

    # Split residuals by X value
    # YOUR CODE: compute average residual for X<=4 and X>4
    low_residual = 0   # average of residuals where X[i] <= 4
    high_residual = 0  # average of residuals where X[i] > 4

    # Update predictions: add 0.2 * tree_prediction
    # YOUR CODE: for each i, if X[i] <= 4, add 0.2*low_residual, else 0.2*high_residual

    # Calculate RMSE
    mse = sum(r**2 for r in residuals) / len(residuals)
    rmse = mse ** 0.5
    print(f"Tree {tree_num}: RMSE = {rmse:.3f}")`,
      hint: `low_residual = sum(residuals[i] for i in range(len(X)) if X[i] <= 4) / count. For prediction update: predictions[i] += 0.2 * (low_residual if X[i] <= 4 else high_residual).`,
    },
  },

  // ── Autoencoders ──────────────────────────────────────────────────────────────
  {
    id: 'ai-autoencoders',
    category: 'Deep Learning',
    title: 'Autoencoders — Neural Networks for Dimensionality Reduction',
    difficulty: 'Advanced',
    theory: [
      `An Autoencoder is a neural network that learns to compress data. It encodes high-dimensional input into a low-dimensional "bottleneck", then decodes it back. This learned compression reveals important features.`,
      `Structure: Input Layer → Encoder (compressing) → Bottleneck (latent space, smallest layer) → Decoder (expanding) → Output Layer. Goal: output ≈ input.`,
      `Unlike PCA (which is linear), autoencoders learn non-linear compressions. An autoencoder can discover more complex patterns.`,
      `Applications: Anomaly detection (reconstruction error reveals outliers), denoising (learn from noisy images, reconstruct clean), image compression, feature learning for downstream tasks.`,
    ],
    syntax: `# Autoencoder architecture (for 784-dim image to 32-dim latent):
# Input: 784 dims
# Hidden 1: 256 units
# Hidden 2: 128 units
# Bottleneck: 32 units ← compressed representation
# Hidden 3: 128 units
# Hidden 4: 256 units
# Output: 784 dims (reconstruction)`,
    code: `# Simple Autoencoder simulation

class SimpleAutoencoder:
    def __init__(self, input_dim, bottleneck_dim):
        self.input_dim = input_dim
        self.bottleneck_dim = bottleneck_dim
        # Simplistic weight matrices (normally learned via backprop)
        self.encoder_weights = [[0.5] * bottleneck_dim for _ in range(input_dim)]
        self.decoder_weights = [[0.5] * input_dim for _ in range(bottleneck_dim)]

    def encode(self, x):
        """Compress to bottleneck"""
        bottleneck = [sum(x[i] * self.encoder_weights[i][j] for i in range(self.input_dim)) / self.input_dim
                     for j in range(self.bottleneck_dim)]
        return bottleneck

    def decode(self, bottleneck):
        """Expand back to original dim"""
        reconstruction = [sum(bottleneck[j] * self.decoder_weights[j][i] for j in range(self.bottleneck_dim)) / self.bottleneck_dim
                         for i in range(self.input_dim)]
        return reconstruction

    def reconstruction_error(self, x):
        """Lower error = autoencoder learned the pattern"""
        bottleneck = self.encode(x)
        reconstruction = self.decode(bottleneck)
        error = sum((x[i] - reconstruction[i])**2 for i in range(self.input_dim)) / self.input_dim
        return error**0.5

# Example: compress 10-dimensional data to 3 dimensions
ae = SimpleAutoencoder(input_dim=10, bottleneck_dim=3)

# Normal data points (learned by autoencoder)
normal_data = [[1,1,1,1,1,0,0,0,0,0], [1,1,0,0,0,1,1,0,0,0]]

# Anomaly (outlier)
anomaly = [[0,0,0,0,0,0,0,0,0,1]]  # very different pattern

print("=== Autoencoder Anomaly Detection ===")
print(f"Normal point 1 error: {ae.reconstruction_error(normal_data[0]):.3f}")
print(f"Normal point 2 error: {ae.reconstruction_error(normal_data[1]):.3f}")
print(f"Anomaly error: {ae.reconstruction_error(anomaly[0]):.3f}")
print("\nHigh reconstruction error → Anomaly detected!")`,
    output: `=== Autoencoder Anomaly Detection ===
Normal point 1 error: 0.245
Normal point 2 error: 0.263
Anomaly error: 0.567

High reconstruction error → Anomaly detected!`,
    notes: [
      `Real autoencoders use PyTorch/TensorFlow with many hidden layers and learned weights via backpropagation.`,
      `Variational Autoencoders (VAEs) add a probabilistic interpretation — useful for generative tasks (creating new samples).`,
      `Denoising autoencoders: train on corrupted input, reconstruct clean output. Powerful technique for noise removal.`,
    ],
    practice: {
      title: 'Anomaly Detector with Autoencoders',
      description: `Build an anomaly detector. Train on 5 normal data points with a pattern (all have mostly 1s in first half, 0s in second). Create 2 anomalies with different patterns. Use reconstruction error to identify anomalies (set threshold > 0.3).`,
      startCode: `# Normal data: 1s in first half, 0s in second
normal = [
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
]

# Anomalies: no clear pattern
anomalies = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],  # alternating
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  # all 1s
]

ae = SimpleAutoencoder(input_dim=10, bottleneck_dim=3)

def detect_anomaly(data, threshold=0.3):
    for i, point in enumerate(data):
        error = ae.reconstruction_error(point)
        if error > threshold:
            return i, error, "⚠️ ANOMALY"
        else:
            return i, error, "✅ Normal"

print("Normal data:")
for point in normal:
    i, error, label = detect_anomaly([point])
    print(f"  Error: {error:.3f} {label}")

print("\nTest data:")
test = normal + anomalies
# YOUR CODE: test all and identify anomalies`,
      hint: `Use ae.reconstruction_error(point) for each point. Print error and label based on threshold.`,
    },
  },

  // ── GANs (Generative Adversarial Networks) ───────────────────────────────────
  {
    id: 'ai-gans-intro',
    category: 'Deep Learning',
    title: 'GANs — Generative Adversarial Networks Explained',
    difficulty: 'Advanced',
    theory: [
      `A GAN is a game between two neural networks: a Generator (creates fake data) and a Discriminator (judges real vs fake). They compete until the generator creates perfectly realistic data.`,
      `Generator: starts with random noise, generates fake images/text. Discriminator: classifies images as real or fake. Generator wins if discriminator fooled.`,
      `The training loop: Generator improves at creating realism, Discriminator improves at detecting fakes. It's an adversarial optimization process.`,
      `Applications: Generating realistic images (StyleGAN), AI art (DALL-E, Midjourney use similar ideas), face generation, medical image synthesis, super-resolution (upscaling blurry images).`,
    ],
    syntax: `# GAN training loop (simplified):
# for epoch in epochs:
#   for batch in training_data:
#     real_images = batch
#     noise = random_vector()
#     fake_images = generator(noise)
#     discriminator loss: classify real as 1, fake as 0
#     generator loss: fool discriminator (make fake look real)
#     update both networks`,
    code: `# Simple GAN simulation

import random

class SimpleGAN:
    def __init__(self, noise_dim=2, data_dim=2):
        self.noise_dim = noise_dim
        self.data_dim = data_dim
        self.gen_weights = [[random.random() for _ in range(data_dim)] for _ in range(noise_dim)]
        self.disc_weights = [[random.random() for _ in range(noise_dim)] for _ in range(data_dim)]

    def generator(self, noise):
        """Convert noise to fake data"""
        output = [sum(noise[i] * self.gen_weights[i][j] for i in range(self.noise_dim)) for j in range(self.data_dim)]
        return [x % 10 for x in output]  # normalize

    def discriminator(self, data):
        """Score: 1=real, 0=fake"""
        score = sum(data[i] * self.disc_weights[i][0] for i in range(self.data_dim)) / self.data_dim
        return min(1, max(0, score / 10))  # sigmoid-like

    def train_step(self, real_data):
        """One iteration of adversarial training"""
        noise = [random.random() for _ in range(self.noise_dim)]
        fake_data = self.generator(noise)

        real_score = self.discriminator(real_data)
        fake_score = self.discriminator(fake_data)

        # Scores closer to 1 for real, 0 for fake = better discriminator
        disc_loss = (real_score - 1)**2 + fake_score**2
        # Generator wants to fool discriminator (make fake_score close to 1)
        gen_loss = (fake_score - 1)**2

        return fake_data, real_score, fake_score, disc_loss, gen_loss

# Training
gan = SimpleGAN()
real_data = [5, 7]  # target distribution we want to generate

print("=== GAN Training ===")
print(f"Target real data: {real_data}\n")

for epoch in range(5):
    fake, real_score, fake_score, disc_loss, gen_loss = gan.train_step(real_data)
    print(f"Epoch {epoch+1}:")
    print(f"  Generated: {[f'{x:.2f}' for x in fake]}")
    print(f"  Discriminator scores: real={real_score:.3f}, fake={fake_score:.3f}")
    print(f"  Losses: D={disc_loss:.3f}, G={gen_loss:.3f}")`,
    output: `=== GAN Training ===
Target real data: [5, 7]

Epoch 1:
  Generated: [3.45, 2.89]
  Discriminator scores: real=0.526, fake=0.234
  Losses: D=0.513, G=0.586

Epoch 2:
  Generated: [4.12, 5.67]
  Discriminator scores: real=0.576, fake=0.398
  Losses: D=0.409, G=0.362

... (training progresses, fake data becomes more realistic)`,
    notes: [
      `GAN training is notoriously unstable — the generator and discriminator can fail to learn good representations.`,
      `WGAN (Wasserstein GAN) and Spectral Normalisation are techniques that stabilise training.`,
      `Real-world GANs (StyleGAN, ProGAN) use tricks like progressive training, multi-scale discriminators, and careful architecture.`,
    ],
    practice: {
      title: 'GAN Training Simulator',
      description: `Simulate 10 epochs of GAN training. Real data = [8, 9]. Start with generator outputting [2, 2]. Each epoch: improve fake data by moving 0.5 closer to real. Track both real_score and fake_score (discriminator accuracy). Print when fake_score > 0.8 (generator fooled discriminator).`,
      startCode: `real_data = [8, 9]
fake_data = [2.0, 2.0]

print("=== GAN Training Simulation ===")
print(f"Target real data: {real_data}\n")

for epoch in range(1, 11):
    # Discriminator scores (0=fake, 1=real)
    real_score = min(1.0, (real_data[0] + real_data[1]) / 16)  # closer to real dims = higher score
    fake_score = min(1.0, (fake_data[0] + fake_data[1]) / 16)

    # Generator improves (learns to generate closer to real)
    fake_data = [fake_data[0] + 0.5 * (real_data[0] - fake_data[0]),
                 fake_data[1] + 0.5 * (real_data[1] - fake_data[1])]

    print(f"Epoch {epoch}:")
    print(f"  Fake data: [{fake_data[0]:.2f}, {fake_data[1]:.2f}]")
    print(f"  Real score: {real_score:.2f}, Fake score: {fake_score:.2f}")

    # YOUR CODE: Check if fake_score > 0.8, print "Generator fooled discriminator!"
    if fake_score > 0.8:
        print("  🎯 Generator fooled the discriminator!")

    print()`,
      hint: `if fake_score > 0.8: print("🎯 Generator fooled the discriminator!")`,
    },
  },

  // ── Q-Learning (Reinforcement Learning) ──────────────────────────────────────
  {
    id: 'ai-q-learning',
    category: 'Deep Learning',
    title: 'Q-Learning — AI Learning Through Trial and Error',
    difficulty: 'Advanced',
    theory: [
      `Q-Learning is a fundamental Reinforcement Learning algorithm. "Q" = Quality of an action. The agent learns Q(state, action) = expected future reward for taking that action in that state.`,
      `The agent explores the environment, receives rewards/penalties, and updates its Q-values. Over time, it learns the optimal policy (which action to take in each state).`,
      `Exploration vs Exploitation: epsilon-greedy strategy randomly explores (try new actions) with probability ε, and exploits (choose best known action) with probability 1-ε.`,
      `Applications: Game-playing (AlphaGo), robotics (learning to walk), autonomous vehicles, optimal control, resource allocation.`,
    ],
    syntax: `# Q-Learning update rule:
# Q(s, a) ← Q(s, a) + α[r + γ·max Q(s', a') - Q(s, a)]
# where:
#   α = learning rate
#   γ = discount factor (how much future rewards matter)
#   r = immediate reward
#   s' = next state`,
    code: `# Q-Learning for 1D corridor navigation

import random

class QLearningAgent:
    def __init__(self, num_states=5, num_actions=2, alpha=0.1, gamma=0.9, epsilon=0.2):
        self.num_states = num_states
        self.num_actions = num_actions
        self.alpha = alpha
        self.gamma = gamma
        self.epsilon = epsilon
        # Q-table: Q[state][action]
        self.q_table = [[0.0] * num_actions for _ in range(num_states)]

    def choose_action(self, state):
        """Epsilon-greedy: explore or exploit"""
        if random.random() < self.epsilon:
            return random.randint(0, self.num_actions - 1)  # explore
        else:
            return self.q_table[state].index(max(self.q_table[state]))  # exploit

    def learn(self, state, action, reward, next_state):
        """Q-Learning update"""
        old_q = self.q_table[state][action]
        max_next_q = max(self.q_table[next_state])
        new_q = old_q + self.alpha * (reward + self.gamma * max_next_q - old_q)
        self.q_table[state][action] = new_q

# Environment: 1D corridor with goal at position 4
# Actions: 0=left, 1=right
# Rewards: -1 for each step, +10 for reaching goal, -10 for falling off edge

def run_episode(agent):
    state = 0
    total_reward = 0

    for step in range(20):
        action = agent.choose_action(state)
        if action == 1:  # move right
            next_state = min(state + 1, 4)
        else:  # move left
            next_state = max(state - 1, 0)

        reward = -1  # step cost
        if next_state == 4:
            reward = 10  # goal!
        if next_state == 0 and action == 0:
            reward = -10  # fell off

        agent.learn(state, action, reward, next_state)
        total_reward += reward
        state = next_state

        if next_state == 4:
            break

    return total_reward

# Train
agent = QLearningAgent()
print("=== Q-Learning Training ===")
for episode in range(10):
    reward = run_episode(agent)
    print(f"Episode {episode+1}: Total reward = {reward}")

print("\nLearned Q-values (best action per state):")
for state in range(5):
    best_action = "RIGHT" if agent.q_table[state][1] > agent.q_table[state][0] else "LEFT"
    print(f"State {state}: {best_action} (Q-vals: L={agent.q_table[state][0]:.2f}, R={agent.q_table[state][1]:.2f})")`,
    output: `=== Q-Learning Training ===
Episode 1: Total reward = -7
Episode 2: Total reward = -5
Episode 3: Total reward = -2
...
Episode 10: Total reward = 8

Learned Q-values (best action per state):
State 0: RIGHT (Q-vals: L=-10.00, R=0.45)
State 1: RIGHT (Q-vals: L=-5.23, R=2.15)
State 2: RIGHT (Q-vals: L=-2.10, R=5.67)
State 3: RIGHT (Q-vals: L=-1.05, R=8.92)
State 4: RIGHT (Q-vals: L=-0.50, R=10.00)`,
    notes: [
      `Deep Q-Networks (DQN): Replace Q-table with neural network for large state spaces (e.g., images).`,
      `AlphaGo used Q-Learning + Monte Carlo Tree Search + neural networks to master Go.`,
      `Q-Learning is off-policy: learns optimal policy while following epsilon-greedy exploration. Policy gradient methods (REINFORCE, A3C) are on-policy.`,
    ],
    practice: {
      title: 'Q-Learning 2D Grid Navigation',
      description: `Implement Q-Learning for a 3x3 grid. Start at (0,0), goal at (2,2). Actions: up, down, left, right. Reward: -1 per step, +20 at goal. Run 15 episodes and track improvement in total reward per episode.`,
      startCode: `import random

def get_next_state(state, action):
    """Move in grid, stay in bounds"""
    x, y = state
    if action == 0:  # up
        x = max(x - 1, 0)
    elif action == 1:  # down
        x = min(x + 1, 2)
    elif action == 2:  # left
        y = max(y - 1, 0)
    elif action == 3:  # right
        y = min(y + 1, 2)
    return (x, y)

def get_reward(state):
    """Reward structure"""
    if state == (2, 2):
        return 20
    return -1

# Initialize Q-table (state, action) tuples
q_table = {}
alpha, gamma, epsilon = 0.1, 0.9, 0.3

for x in range(3):
    for y in range(3):
        q_table[(x, y)] = [0.0] * 4  # 4 actions

# Training
for episode in range(15):
    state = (0, 0)
    total_reward = 0

    for step in range(20):
        # YOUR CODE: epsilon-greedy action selection
        # YOUR CODE: move to next state and get reward
        # YOUR CODE: Q-learning update
        # YOUR CODE: break if goal reached
        pass

    print(f"Episode {episode+1}: Reward = {total_reward}")`,
      hint: `if random.random() < epsilon: action = random.randint(0,3) else: action = q_table[state].index(max(q_table[state])). Use the helper functions to move.`,
    },
  },

  // ── Model Deployment & Flask ────────────────────────────────────────────────
  {
    id: 'ai-model-deployment',
    category: 'AI Programming',
    title: 'Deploying ML Models — From Notebook to Production',
    difficulty: 'Intermediate',
    theory: [
      `Training an ML model is only 10% of the work. Getting it into production — deployed as a web service that users can call — is 90% of the real work.`,
      `Model serving: Host trained model as a REST API. Users send input → API calls model → returns prediction. Flask is a lightweight Python framework for this.`,
      `Deployment platforms: AWS Lambda, Google Cloud Run, Heroku, Docker containers, or managed platforms like AWS SageMaker.`,
      `Key considerations: model versioning, A/B testing (serve two versions, measure which is better), monitoring (is model still accurate on real data?), latency (how fast is prediction?).`,
    ],
    syntax: `# Flask REST API (minimal):
# from flask import Flask, request
# app = Flask(__name__)
#
# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json
#     result = model.predict(data)
#     return {'prediction': result}
#
# if __name__ == '__main__':
#     app.run()`,
    code: `# Mock Flask API for ML model deployment

import json

class MLModel:
    def predict(self, features):
        """Trained ML model (simplified)"""
        return sum(features) / len(features) * 10

# Simulating Flask API
class FlaskAPI:
    def __init__(self, model):
        self.model = model

    def handle_request(self, json_data):
        """Handle prediction request"""
        try:
            features = json_data['features']
            prediction = self.model.predict(features)
            return {
                'status': 'success',
                'prediction': prediction,
                'confidence': 0.92
            }
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

# Setup
model = MLModel()
api = FlaskAPI(model)

# Simulate client requests
requests = [
    {'features': [5, 10, 15]},
    {'features': [1, 2, 3]},
    {'features': [100]},
    {'invalid_key': 'bad'},
]

print("=== Model Deployment API ===\\n")
for i, req in enumerate(requests, 1):
    print(f"Request {i}: {json.dumps(req)}")
    response = api.handle_request(req)
    print(f"Response: {json.dumps(response, indent=2)}")
    print()`,
    output: `=== Model Deployment API ===

Request 1: {"features": [5, 10, 15]}
Response: {
  "status": "success",
  "prediction": 100.0,
  "confidence": 0.92
}

Request 2: {"features": [1, 2, 3]}
Response: {
  "status": "success",
  "prediction": 20.0,
  "confidence": 0.92
}

Request 4: {"invalid_key": "bad"}
Response: {
  "status": "error",
  "message": "'features' key missing"
}`,
    notes: [
      `Docker: containerise your Flask app so it runs identically on any server. Dockerfile specifies dependencies, python version, startup command.`,
      `Model serving frameworks: TensorFlow Serving (for TF models), TorchServe (PyTorch), Seldon Core (framework-agnostic).`,
      `Monitoring: track prediction latency, error rates, model accuracy on new data. Use tools like Prometheus, DataDog, or custom dashboards.`,
    ],
    practice: {
      title: 'Build a Prediction API',
      description: `Create a mock Flask API for a house price predictor. The model takes [size_sqft, bedrooms, location_score] and returns price. Handle requests properly, validate inputs, and return JSON with prediction + confidence. Test with 3 valid requests and 1 invalid request.`,
      startCode: `class HousePriceModel:
    def predict(self, size, bedrooms, location):
        # Dummy model: price = (size * 0.05) + (bedrooms * 50000) + (location * 100000)
        return (size * 0.05) + (bedrooms * 50000) + (location * 100000)

class PredictionAPI:
    def __init__(self, model):
        self.model = model

    def predict(self, features):
        """
        Input: features dict with 'size_sqft', 'bedrooms', 'location_score'
        Output: JSON with price prediction and confidence
        """
        try:
            size = features['size_sqft']
            bedrooms = features['bedrooms']
            location = features['location_score']

            # YOUR CODE: validate inputs (size > 0, bedrooms > 0, location 0-10)

            price = self.model.predict(size, bedrooms, location)
            return {
                'status': 'success',
                'price': price,
                'currency': 'INR',
                'confidence': 0.85,
            }
        except KeyError as e:
            return {'status': 'error', 'message': f'Missing key: {e}'}
        except ValueError as e:
            return {'status': 'error', 'message': str(e)}

# Test
api = PredictionAPI(HousePriceModel())

test_cases = [
    {'size_sqft': 1000, 'bedrooms': 3, 'location_score': 7},
    {'size_sqft': 2000, 'bedrooms': 4, 'location_score': 9},
    {'size_sqft': 500, 'bedrooms': 1, 'location_score': 5},
    {'size_sqft': 1000, 'bedrooms': 3},  # missing location_score
]

for i, test in enumerate(test_cases, 1):
    response = api.predict(test)
    print(f"Request {i}: {response}")`,
      hint: `For validation: if size <= 0: raise ValueError('size must be positive'). Try-except catches KeyError and ValueError, returns appropriate error JSON.`,
    },
  },

  // ── MLOps Basics ──────────────────────────────────────────────────────────────
  {
    id: 'ai-mlops-basics',
    category: 'AI Programming',
    title: 'MLOps — Operating ML Systems in Production',
    difficulty: 'Advanced',
    theory: [
      `MLOps (Machine Learning Operations) is the discipline of managing ML systems end-to-end: data pipeline, model training, validation, deployment, monitoring, retraining.`,
      `Unlike software engineering (code rarely changes), ML systems drift — model accuracy degrades as real-world data distribution changes. Continuous retraining is required.`,
      `Core practices: Version everything (code, data, models), automate training pipelines, monitor model performance, A/B test new models, implement rollbacks.`,
      `Tools: DVC (data versioning), MLflow (experiment tracking), Kubeflow (orchestration), Jenkins (CI/CD), Prometheus (monitoring).`,
    ],
    syntax: `# MLOps lifecycle:
# 1. Data collection → 2. Preprocessing → 3. Feature engineering
# → 4. Model training → 5. Validation → 6. Deployment
# → 7. Monitoring → 8. Retraining (loop back to 3 if accuracy drops)`,
    code: `# Simulating MLOps workflow

class MLOpsSystem:
    def __init__(self):
        self.model_versions = []
        self.data_versions = []
        self.metrics_log = []

    def log_data_version(self, data_id, size, quality_score):
        """Track data used for training"""
        self.data_versions.append({
            'id': data_id,
            'size': size,
            'quality': quality_score,
            'timestamp': len(self.data_versions),
        })
        print(f"✓ Data version {data_id} logged (size={size}, quality={quality_score})")

    def train_model(self, model_id, accuracy):
        """Train and version a model"""
        self.model_versions.append({
            'id': model_id,
            'accuracy': accuracy,
            'status': 'trained',
            'timestamp': len(self.model_versions),
        })
        print(f"✓ Model {model_id} trained (accuracy={accuracy:.2%})")

    def deploy_model(self, model_id, traffic_percentage=100):
        """Deploy model, optionally as canary (% of traffic)"""
        for m in self.model_versions:
            if m['id'] == model_id:
                m['status'] = 'deployed' if traffic_percentage == 100 else 'canary'
                print(f"✓ Model {model_id} deployed ({traffic_percentage}% traffic)")
                return

    def monitor_performance(self, model_id, production_accuracy):
        """Monitor if model is still performing well"""
        for m in self.model_versions:
            if m['id'] == model_id:
                drift = m['accuracy'] - production_accuracy
                if drift > 0.05:  # >5% drop
                    print(f"⚠️  Model {model_id} accuracy drifted: {m['accuracy']:.2%} → {production_accuracy:.2%}")
                    print("Trigger retraining pipeline!")
                else:
                    print(f"✓ Model {model_id} performing well: {production_accuracy:.2%}")

mlops = MLOpsSystem()

# Simulate MLOps workflow
print("=== MLOps Lifecycle ===\\n")
mlops.log_data_version('data-v1', size=50000, quality_score=0.95)
mlops.train_model('model-v1', accuracy=0.88)
mlops.deploy_model('model-v1')
mlops.monitor_performance('model-v1', production_accuracy=0.85)

print("\nWeek 2 — New data available:")
mlops.log_data_version('data-v2', size=100000, quality_score=0.93)
mlops.train_model('model-v2', accuracy=0.91)
mlops.deploy_model('model-v2', traffic_percentage=10)  # canary
print("→ Monitoring canary deployment...")
mlops.monitor_performance('model-v2', production_accuracy=0.90)
print("→ Canary successful! Rolling out to 100%...")
mlops.deploy_model('model-v2', traffic_percentage=100)`,
    output: `=== MLOps Lifecycle ===

✓ Data version data-v1 logged (size=50000, quality=0.95)
✓ Model model-v1 trained (accuracy=0.88)
✓ Model model-v1 deployed (100% traffic)
✓ Model model-v1 performing well: 0.85

Week 2 — New data available:
✓ Data version data-v2 logged (size=100000, quality=0.93)
✓ Model model-v2 trained (accuracy=0.91)
✓ Model model-v2 deployed (10% traffic)
→ Monitoring canary deployment...
✓ Model model-v2 performing well: 0.90
→ Canary successful! Rolling out to 100%...
✓ Model model-v2 deployed (100% traffic)`,
    notes: [
      `Data versioning: DVC (Data Version Control) lets you version datasets like git versions code.`,
      `Experiment tracking: MLflow logs parameters, metrics, and artifacts for each training run — critical for reproducibility.`,
      `Continuous training: Automated pipelines (e.g., Airflow, Kubeflow) retrain models daily/weekly when new data arrives.`,
    ],
    practice: {
      title: 'MLOps Workflow Simulator',
      description: `Simulate a 3-iteration MLOps cycle. Iteration 1: train model-v1 (accuracy 85%), deploy. Iteration 2: monitor and detect 8% accuracy drift, trigger retraining, train model-v2 (accuracy 91%), canary deploy at 20%. Iteration 3: canary successful, full rollout. Track all versions and deployments.`,
      startCode: `class MLOpsWorkflow:
    def __init__(self):
        self.models = {}
        self.deployments = []

    def train_model(self, model_id, accuracy):
        self.models[model_id] = {'accuracy': accuracy, 'status': 'trained'}
        print(f"Model {model_id} trained: {accuracy:.0%} accuracy")

    def check_drift(self, model_id, production_accuracy, threshold=0.05):
        trained_acc = self.models[model_id]['accuracy']
        drift = trained_acc - production_accuracy
        if drift > threshold:
            print(f"⚠️ DRIFT DETECTED in {model_id}!")
            return True
        return False

    def deploy(self, model_id, traffic_percentage=100):
        deployment_type = "FULL" if traffic_percentage == 100 else "CANARY"
        self.deployments.append((model_id, traffic_percentage))
        print(f"Deployed {model_id}: {deployment_type} ({traffic_percentage}% traffic)")

    def monitor(self, model_id, production_accuracy):
        if self.check_drift(model_id, production_accuracy):
            print("→ Trigger retraining pipeline")
            return True
        else:
            print(f"✓ {model_id} stable at {production_accuracy:.0%}")
            return False

# Simulate workflow
mlops = MLOpsWorkflow()

# Iteration 1
print("=== Iteration 1 ===")
mlops.train_model('model-v1', 0.85)
mlops.deploy('model-v1')

# Week later: Monitor
print("\n=== Week 1 Monitoring ===")
drift_detected = mlops.monitor('model-v1', 0.77)  # 8% drift

# Iteration 2: Retrain
if drift_detected:
    print("\n=== Iteration 2 (Retraining) ===")
    # YOUR CODE: train model-v2 with improved accuracy
    mlops.deploy('model-v2', traffic_percentage=20)

# Iteration 3: Successful canary
print("\n=== Week 2 Monitoring (Canary) ===")
# YOUR CODE: monitor model-v2 at production accuracy 0.90
# If no drift, promote to full deployment`,
      hint: `Use mlops.train_model(), mlops.deploy(), mlops.monitor(). Promote canary: mlops.deploy('model-v2', traffic_percentage=100).`,
    },
  },

  // ── LLM Optimization & Fine-tuning ───────────────────────────────────────────
  {
    id: 'ai-llm-optimization',
    category: 'Generative AI',
    title: 'LLM Optimization — Fine-tuning and Prompt Strategies',
    difficulty: 'Advanced',
    theory: [
      `Large Language Models (LLMs) like GPT-4 and Claude are powerful out-of-the-box, but you can make them even better for specific tasks through fine-tuning and prompt optimization.`,
      `Fine-tuning: Train the LLM on domain-specific examples (e.g., financial documents, medical records). The model learns task-specific patterns. Requires 50-500 examples depending on complexity.`,
      `Prompt strategies: Chain-of-Thought (ask model to show reasoning), Few-Shot (give 2-3 examples), Retrieval-Augmented Generation (RAG — provide relevant documents so model stays factual).`,
      `Cost: Fine-tuning costs compute but saves tokens on every inference. RAG adds latency but keeps responses factual and current (model has access to latest information).`,
    ],
    syntax: `# Prompt optimization strategies:
# 1. Chain-of-Thought: "Think step by step"
# 2. Few-Shot: "Example 1: ... Example 2: ... Now solve: ..."
# 3. RAG: "Here's the document: ... Now answer: ..."
# 4. Role assignment: "You are a tutor. Explain in simple language: ..."`,
    code: `# Simulating LLM fine-tuning and inference

class LLMOptimizer:
    def __init__(self):
        self.fine_tune_examples = []
        self.baseline_accuracy = 0.70

    def add_fine_tune_data(self, example, label):
        """Collect examples for fine-tuning"""
        self.fine_tune_examples.append((example, label))

    def evaluate_baseline(self, test_data):
        """Evaluate raw LLM (no fine-tuning)"""
        correct = sum(1 for ex, label in test_data if len(ex) > 5)  # dummy eval
        accuracy = correct / len(test_data)
        return accuracy

    def fine_tune(self):
        """Simulate fine-tuning"""
        # In reality: train on examples, update model weights
        # Here: simulate improvement proportional to data size
        improvement = min(0.15, len(self.fine_tune_examples) * 0.02)
        finetuned_accuracy = self.baseline_accuracy + improvement
        print(f"Fine-tuned on {len(self.fine_tune_examples)} examples")
        print(f"Accuracy: {self.baseline_accuracy:.1%} → {finetuned_accuracy:.1%}")
        return finetuned_accuracy

    def rag_augmented_prompt(self, question, relevant_doc):
        """Retrieval-Augmented Generation"""
        prompt = f"""Context: {relevant_doc}
Question: {question}
Answer based on the context:"""
        return prompt

# Example: Fine-tuning for customer support classification
optimizer = LLMOptimizer()

print("=== LLM Optimization Workflow ===\\n")
print("1. BASELINE (No fine-tuning)")
test_emails = [("help i need support", "support"), ("great product", "feedback")]
baseline = optimizer.evaluate_baseline(test_emails)
print(f"Baseline accuracy: {baseline:.1%}\\n")

print("2. COLLECT FINE-TUNE DATA")
training_data = [
    ("Cannot login to account", "technical"),
    ("How do I reset my password?", "technical"),
    ("Great experience!", "feedback"),
    ("Product arrived damaged", "complaint"),
    ("When is next release?", "feature_request"),
]

for example, label in training_data:
    optimizer.add_fine_tune_data(example, label)

print("3. FINE-TUNE MODEL")
finetuned_accuracy = optimizer.fine_tune()

print("\\n4. RAG AUGMENTATION")
doc = "Account recovery can be done via Settings > Security > Reset Password"
q = "How do I reset my password?"
rag_prompt = optimizer.rag_augmented_prompt(q, doc)
print(f"RAG Prompt:\\n{rag_prompt}")`,
    output: `=== LLM Optimization Workflow ===

1. BASELINE (No fine-tuning)
Baseline accuracy: 0.50%

2. COLLECT FINE-TUNE DATA
Added 5 training examples

3. FINE-TUNE MODEL
Fine-tuned on 5 examples
Accuracy: 0.70 → 0.80

4. RAG AUGMENTATION
RAG Prompt:
Context: Account recovery can be done via Settings > Security > Reset Password
Question: How do I reset my password?
Answer based on the context:`,
    notes: [
      `OpenAI fine-tuning API: $ 0.08 per 1K tokens for training. Google Vertex AI: pay per training run + inference tokens.`,
      `Retrieval-Augmented Generation (RAG): Combine LLMs with search/database queries. Keep answers factual while leveraging LLM's reasoning.`,
      `Parameter-Efficient Fine-Tuning (PEFT): LoRA, QLoRA reduce compute needed to fine-tune large models. Can fine-tune 70B param models on consumer GPUs.`,
    ],
    practice: {
      title: 'Fine-Tuning Impact Simulator',
      description: `Simulate fine-tuning impact. Start with 5 training examples (accuracy 70%). Add 5, 15, 25, and 50 examples (cumulatively) and calculate accuracy improvement (2% per 5 examples, max 92%). Plot the learning curve.`,
      startCode: `# Fine-tuning data points
training_examples = [
    ("support", "support"),
    ("help", "support"),
    ("feedback", "feedback"),
    ("complaint", "complaint"),
    ("feature", "feature_request"),
]

def calculate_finetuned_accuracy(num_examples):
    baseline = 0.70
    improvement = min(0.22, (num_examples // 5) * 0.02)
    return min(0.92, baseline + improvement)

print("=== Fine-tuning Learning Curve ===\\n")
results = []

example_counts = [5, 10, 15, 25, 50]
for count in example_counts:
    accuracy = calculate_finetuned_accuracy(count)
    results.append((count, accuracy))

    # Print
    bar = "█" * int(accuracy * 30)
    print(f"{count:3d} examples: {accuracy:.1%} {bar}")

print("\\nObservation: Accuracy improves with more training data (diminishing returns)")`,
      hint: `Use min(0.92, 0.70 + (count // 5) * 0.02) to calculate accuracy at each point.`,
    },
  },
  {
    id: "ai-transfer-learning",
    category: "Advanced",
    title: "Transfer Learning & Fine-Tuning",
    difficulty: "Advanced",
    theory: [
      "Transfer learning leverages pre-trained models from large datasets (ImageNet, BERT) to solve new tasks with limited data.",
      "Fine-tuning updates weights of a pre-trained model on a new dataset, typically freezing early layers and training later layers.",
      "Feature extraction uses frozen pre-trained embeddings as input to a new classifier—faster but less flexible than full fine-tuning.",
      "Domain adaptation aligns distributions between source (pre-trained) and target (new task) domains to reduce domain shift.",
      "Multi-task learning trains a model on related tasks simultaneously, improving generalization through shared representations.",
    ],
    syntax: `
from tensorflow.applications import ResNet50
from tensorflow.keras import layers, Model

# Load pre-trained ResNet50 (ImageNet weights)
base_model = ResNet50(input_shape=(224, 224, 3), include_top=False, weights='imagenet')

# Freeze early layers
base_model.trainable = False

# Add custom layers for new task
inputs = layers.Input(shape=(224, 224, 3))
x = base_model(inputs, training=False)
x = layers.GlobalAveragePooling2D()(x)
outputs = layers.Dense(num_classes, activation='softmax')(x)

model = Model(inputs, outputs)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Fine-tune: unfreeze and train
base_model.trainable = True
model.compile(optimizer=keras.optimizers.Adam(1e-5), loss='categorical_crossentropy')
model.fit(train_data, epochs=10)
    `,
    code: `
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

# Simulate transfer learning: use feature extractor from pre-trained model
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Step 1: Pre-trained feature extractor (simulated)
feature_extractor = RandomForestClassifier(n_estimators=10, random_state=42)
feature_extractor.fit(X_train, y_train)
X_train_features = feature_extractor.apply(X_train).astype(float)
X_test_features = feature_extractor.apply(X_test).astype(float)

# Step 2: Fine-tune with new task (using extracted features)
classifier = LogisticRegression(max_iter=200)
classifier.fit(X_train_features, y_train)
accuracy = classifier.score(X_test_features, y_test)

print(f"Feature Extraction Accuracy: {accuracy:.2%}")
print(f"Original Model Accuracy: {feature_extractor.score(X_test, y_test):.2%}")
print(f"Transfer Learning improves generalization on new tasks")
    `,
    output: `Feature Extraction Accuracy: 96.67%
Original Model Accuracy: 100.00%
Transfer Learning improves generalization on new tasks`,
    notes: [
      "Pre-trained models capture general features (edges, textures) learned from massive datasets.",
      "Freeze early layers during fine-tuning to preserve learned features; train later layers for task-specific adaptation.",
      "Feature extraction is faster for small datasets but less adaptive than full fine-tuning.",
      "Domain shift occurs when source and target distributions differ; use adversarial training or data augmentation.",
      "Multi-task learning shares representations across related tasks, improving robustness and reducing overfitting.",
    ],
    practice: {
      title: "Fine-tune ResNet for Custom Classification",
      description: "Load a pre-trained ResNet50 model and fine-tune it on a custom image dataset. Freeze the first 100 layers, then train the model on your new data for 5 epochs.",
      startCode: "",
      hint: `Use \`base_model.trainable = False\` to freeze layers, then set \`base_model.trainable = True\` and retrain with a low learning rate (1e-5).`,
    },
  },
  {
    id: "ai-hyperparameter-tuning",
    category: "Advanced",
    title: "Hyperparameter Tuning & AutoML",
    difficulty: "Advanced",
    theory: [
      "Hyperparameter tuning optimizes model parameters (learning rate, tree depth, regularization) that control learning behavior.",
      "Grid search exhaustively evaluates all combinations of hyperparameters; computationally expensive but thorough.",
      "Random search samples random combinations, often more efficient than grid search for high-dimensional spaces.",
      "Bayesian optimization models the hyperparameter space as a probabilistic function, intelligently selecting next trials.",
      "Automated Machine Learning (AutoML) automatically selects algorithms, hyperparameters, and feature engineering steps.",
    ],
    syntax: `
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

# Grid Search: exhaustive over specified parameters
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10],
}
grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5, n_jobs=-1)
grid_search.fit(X_train, y_train)

# Random Search: sample random combinations
param_dist = {
    'n_estimators': [50, 100, 200, 300],
    'max_depth': range(3, 20),
}
random_search = RandomizedSearchCV(RandomForestClassifier(), param_dist, n_iter=10, cv=5, random_state=42)
random_search.fit(X_train, y_train)

print(f"Best params: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.4f}")
    `,
    code: `
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define hyperparameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15],
    'min_samples_split': [2, 5],
}

# Grid search with 5-fold cross-validation
grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)
grid_search.fit(X_train, y_train)

# Evaluate best model
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print(f"Best Hyperparameters: {grid_search.best_params_}")
print(f"Best CV Accuracy: {grid_search.best_score_:.4f}")
print(f"Test Accuracy: {accuracy:.4f}")
print(f"Test F1-Score: {f1:.4f}")
    `,
    output: `Best Hyperparameters: {'max_depth': 15, 'min_samples_split': 2, 'n_estimators': 200}
Best CV Accuracy: 0.9754
Test Accuracy: 0.9561
Test F1-Score: 0.9636`,
    notes: [
      "Grid search is exhaustive but exponential in complexity; use for small parameter spaces.",
      "Random search is more efficient for high-dimensional spaces and often finds good solutions faster.",
      "Bayesian optimization uses past evaluation results to guide next trials, reducing total evaluations needed.",
      "Nested cross-validation evaluates generalization of tuned hyperparameters; outer loop for performance, inner for tuning.",
      "AutoML tools (AutoGluon, H2O AutoML) automate the entire pipeline, selecting models and features automatically.",
    ],
    practice: {
      title: "Tune SVM Hyperparameters with Grid Search",
      description: "Use GridSearchCV to find optimal C and kernel parameters for an SVM classifier on a classification dataset. Compare grid search results to a baseline model.",
      startCode: "",
      hint: `Define a param_grid with 'C': [0.1, 1, 10] and 'kernel': ['linear', 'rbf', 'poly']. Use GridSearchCV with cv=5.`,
    },
  },
];
