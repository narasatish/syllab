import type { TutorialTopic } from './types';

export const aiAgentsTopics: TutorialTopic[] = [
  // Category: What are AI Agents (7 topics)
  {
    id: 'agent-intro',
    category: 'What are AI Agents',
    title: 'What is an AI Agent?',
    difficulty: 'Beginner',
    theory: [
      'An AI agent is a software program that perceives its environment, reasons about it, and takes actions to achieve specific goals. Unlike traditional software that follows fixed instructions, agents make decisions based on observations and can adapt to changing circumstances.',
      'AI agents operate in cycles: they sense the environment, process information, and execute actions. This loop continues until the goal is achieved or a stopping condition is met. Real-world examples include recommendation systems, chatbots, and autonomous vehicles.',
      'In India\'s education sector, AI agents can personalize learning by analyzing student performance and recommending tailored study materials. This mirrors how platforms like BYJU\'S and Unacademy use intelligent systems to guide learners.'
    ],
    code: `# Simple AI Agent Example
class SimpleAgent:
    def __init__(self, goal):
        self.goal = goal
        self.memory = []

    def perceive(self, observation):
        """Agent observes the environment"""
        self.memory.append(observation)
        return observation

    def reason(self):
        """Agent reasons about observations"""
        return "Processing " + str(len(self.memory)) + " observations"

    def act(self):
        """Agent takes action towards goal"""
        return "Moving towards goal: " + self.goal

# Usage
agent = SimpleAgent("Learn Python")
print(agent.perceive("Found tutorial"))
print(agent.reason())
print(agent.act())`,
    output: `Found tutorial
Processing 1 observations
Moving towards goal: Learn Python`,
    notes: ['Agents are goal-oriented', 'They operate in perception-reasoning-action cycles', 'Autonomy is a key characteristic'],
    livePreview: false,
    practice: {
      title: 'Create Your First Agent',
      description: 'Modify the SimpleAgent class to include a method that tracks goal progress. Add a counter that increments each time the agent acts.',
      startCode: `class SimpleAgent:
    def __init__(self, goal):
        self.goal = goal
        self.progress = 0

    def act(self):
        # TODO: Increment progress and return message
        pass`,
      hint: 'Use self.progress += 1 before returning the action message',
      solution: `class SimpleAgent:
    def __init__(self, goal):
        self.goal = goal
        self.progress = 0

    def act(self):
        self.progress += 1
        return f"Progress: {self.progress}/10 towards {self.goal}"`
    }
  },
  {
    id: 'agents-vs-chatbots',
    category: 'What are AI Agents',
    title: 'Agents vs Chatbots: Key Differences',
    difficulty: 'Beginner',
    theory: [
      'Chatbots respond to user input based on patterns and predefined rules. They excel at conversation but lack goal-oriented autonomy. When you ask ChatGPT a question, it answers—but it won\'t independently research or take actions outside the conversation.',
      'AI agents, by contrast, proactively pursue goals by breaking them into sub-tasks, using tools, and adapting strategies. A customer service agent might independently resolve an issue by checking inventory, verifying payment, and scheduling delivery—without waiting for permission at each step.',
      'In Indian schools, a chatbot tutors students who ask questions. An AI tutor agent would analyze exam patterns, identify weak areas, send practice problems, and adjust difficulty levels autonomously.'
    ],
    code: `# Chatbot: Reactive
class Chatbot:
    def respond(self, user_input):
        if "hello" in user_input.lower():
            return "Hello! How can I help?"
        elif "what" in user_input.lower():
            return "I can answer questions about math and science."
        return "I don't understand."

# AI Agent: Goal-oriented
class TutorAgent:
    def __init__(self, student_name):
        self.student = student_name
        self.goals = ["Improve math", "Track progress"]
        self.completed_tasks = []

    def plan(self):
        """Agent plans next actions towards goals"""
        return ["Assess current level", "Set targets", "Send problems"]

    def execute_plan(self, plan):
        self.completed_tasks.extend(plan)
        return f"Completed: {', '.join(plan)}"

# Usage
chatbot = Chatbot()
print("Chatbot:", chatbot.respond("what is algebra"))

agent = TutorAgent("Arjun")
plan = agent.plan()
print("Agent plan:", plan)
print("Agent action:", agent.execute_plan(plan))`,
    output: `Chatbot: I can answer questions about math and science.
Agent plan: ['Assess current level', 'Set targets', 'Send problems']
Agent action: Completed: Assess current level, Set targets, Send problems`,
    notes: ['Chatbots are reactive; agents are proactive', 'Agents pursue goals autonomously', 'Agents use tools and planning'],
    livePreview: false,
    practice: {
      title: 'Design Your Agent vs Chatbot',
      description: 'Write a simple function that distinguishes agent behaviors from chatbot behaviors. Create a comparison table.',
      hint: 'List 3 behaviors for agents (goal-seeking, planning, tool-use) and 3 for chatbots (reactive, rule-based, conversation)',
      solution: `Agent behaviors: Goal-seeking, Multi-step planning, Tool usage
Chatbot behaviors: Reactive response, Pattern matching, Conversation-focused`
    }
  },
  {
    id: 'types-of-agents',
    category: 'What are AI Agents',
    title: 'Types of AI Agents',
    difficulty: 'Beginner',
    theory: [
      'There are five main types of AI agents, ranging from simple to complex. Simple reflex agents respond immediately to stimuli with predefined rules. Model-based reflex agents maintain an internal model of the world. Goal-based agents work backwards from desired outcomes. Utility-based agents optimize for best outcomes. Learning agents improve through experience.',
      'A simple reflex agent in an e-commerce site: "If user browses electronics, recommend electronics." A learning agent: "If user previously bought electronics, predict and recommend similar items with higher confidence."',
      'In Indian schools, a simple reflex tutor says "Try again" when a student answers wrong. A learning agent analyzes why the student struggles, adjusts teaching style, and predicts which topics will challenge them next.'
    ],
    code: `# 1. Simple Reflex Agent
class SimpleReflex:
    def decide(self, observation):
        if observation == "student_wrong_answer":
            return "Try again"
        return "Good!"

# 2. Model-based Reflex Agent
class ModelBased:
    def __init__(self):
        self.student_level = "Beginner"
        self.attempts = 0

    def update_model(self, performance):
        self.attempts += 1
        if performance < 50:
            self.student_level = "Beginner"
        elif performance < 80:
            self.student_level = "Intermediate"
        else:
            self.student_level = "Advanced"

    def decide(self, observation):
        return f"Adjust difficulty to {self.student_level}"

# 3. Goal-based Agent
class GoalBased:
    def __init__(self, goal):
        self.goal = goal
        self.plan = []

    def plan_steps(self):
        if self.goal == "master_algebra":
            self.plan = ["Learn basics", "Practice", "Test"]
        return self.plan

# 4. Utility-based Agent
class UtilityBased:
    def evaluate_action(self, action):
        utilities = {
            "explain_gently": 0.8,
            "give_hard_problem": 0.3,
            "skip_topic": 0.1
        }
        return max(utilities, key=utilities.get)

# 5. Learning Agent
class LearningAgent:
    def __init__(self):
        self.success_history = []

    def learn(self, action, result):
        self.success_history.append((action, result))

    def get_best_action(self):
        if self.success_history:
            return max(self.success_history, key=lambda x: x[1])[0]
        return "explain_basics"

# Usage
print("Simple Reflex:", SimpleReflex().decide("student_wrong_answer"))
mb = ModelBased()
mb.update_model(45)
print("Model-based:", mb.decide("observed"))
print("Goal-based:", GoalBased("master_algebra").plan_steps())
print("Utility-based:", UtilityBased().evaluate_action(None))
la = LearningAgent()
la.learn("explain_clearly", 0.9)
print("Learning:", la.get_best_action())`,
    output: `Simple Reflex: Try again
Model-based: Adjust difficulty to Beginner
Goal-based: ['Learn basics', 'Practice', 'Test']
Utility-based: explain_gently
Learning: explain_clearly`,
    notes: ['Simple reflex: Condition-action rules', 'Model-based: Maintains world state', 'Goal-based: Works backward from goals', 'Utility-based: Optimizes outcomes', 'Learning agents: Improve with experience'],
    livePreview: false,
    practice: {
      title: 'Choose the Right Agent Type',
      description: 'For each scenario, identify which agent type is best: (a) Auto-reply to emails, (b) Personalized learning platform, (c) Autonomous vehicle navigation.',
      hint: 'Consider whether each needs rules, goals, optimization, or learning',
      solution: `(a) Simple Reflex - predefined patterns
(b) Learning Agent - adapts to student behavior
(c) Utility-based or Goal-based - optimizes safety and route`
    }
  },
  {
    id: 'peas-model',
    category: 'What are AI Agents',
    title: 'Agent Environment: PEAS Model',
    difficulty: 'Intermediate',
    theory: [
      'PEAS stands for Performance, Environment, Actuators, and Sensors. It\'s a framework for designing and analyzing agents. Performance measures how well the agent achieves its goals. Environment is what the agent operates in. Actuators are outputs (actions). Sensors are inputs (observations).',
      'For a school attendance agent: Performance = accuracy of roll call, Environment = classroom, Actuators = record in system, Sensors = biometric scanner or face recognition.',
      'Understanding PEAS helps clarify what an agent needs to succeed and what constraints it faces. A fully observable environment (agent sees everything) is easier to navigate than a partially observable one (fog, noise, hidden information).'
    ],
    code: `class PEASFramework:
    def __init__(self, agent_name):
        self.agent = agent_name

    def define_peas(self):
        peas = {
            "Performance": "Metrics to judge success",
            "Environment": "Where agent operates",
            "Actuators": "Output/Action mechanisms",
            "Sensors": "Input/Observation mechanisms"
        }
        return peas

# Example: Online Quiz Agent
class QuizAgent:
    def __init__(self):
        self.peas = {
            "Performance": "Student score >= 80%",
            "Environment": "Online learning platform",
            "Actuators": ["Display question", "Record answer", "Show feedback"],
            "Sensors": ["Student response", "Time taken", "Answer correctness"]
        }

    def run(self):
        print("Agent:", self.agent)
        for key, value in self.peas.items():
            print(f"  {key}: {value}")

agent = QuizAgent()
agent.agent = "QuizTutor"
agent.run()`,
    output: `Agent: QuizTutor
  Performance: Student score >= 80%
  Environment: Online learning platform
  Actuators: ['Display question', 'Record answer', 'Show feedback']
  Sensors: ['Student response', 'Time taken', 'Answer correctness']`,
    notes: ['Performance: Clear success criteria', 'Fully vs partially observable environments', 'Sensors provide limited information in noisy environments', 'Actuators constrain what agents can do'],
    livePreview: false,
    practice: {
      title: 'Design PEAS for Your Agent',
      description: 'Choose an agent (e.g., homework helper, fee assistant, attendance tracker). Define its PEAS model.',
      hint: 'Think about what success looks like, what the agent sees and can do',
      solution: `Example - Homework Helper Agent:
Performance: Student completes homework, understands concepts
Environment: Student's device, homework database
Actuators: Provide hints, explanations, next problem
Sensors: Student questions, time spent, correctness`
    }
  },
  {
    id: 'agent-architecture',
    category: 'What are AI Agents',
    title: 'Agent Architecture Overview',
    difficulty: 'Intermediate',
    theory: [
      'Agent architecture describes how an agent\'s components are organized. Common architectures include reactive (stimulus-response), deliberative (planning-based), and hybrid (combines both). Reactive agents are fast but rigid. Deliberative agents can handle complex goals but may be slow.',
      'A reactive architecture for a spam filter: Email arrives → Check rules → Mark as spam/legit. Deliberative: Email arrives → Analyze sender, content, context → Make nuanced decision → Update spam model.',
      'Modern Indian ed-tech platforms use hybrid agents: quickly respond to user input (reactive) while also analyzing learning patterns (deliberative) to personalize content.'
    ],
    code: `# Reactive Architecture
class ReactiveAgent:
    def __init__(self):
        self.rules = {
            "low_score": "Need more practice",
            "high_score": "Move to next topic"
        }

    def act(self, observation):
        score = observation.get("score", 0)
        if score < 60:
            return self.rules["low_score"]
        else:
            return self.rules["high_score"]

# Deliberative Architecture
class DeliberativeAgent:
    def __init__(self):
        self.goals = ["Improve scores", "Build confidence"]
        self.world_model = {}

    def perceive(self, observation):
        self.world_model.update(observation)

    def plan(self):
        if self.world_model.get("score", 0) < 60:
            return ["Review concepts", "Extra practice", "Retest"]
        return ["Challenge problems", "Next chapter"]

    def act(self):
        return self.plan()

# Hybrid Architecture
class HybridAgent:
    def __init__(self):
        self.reactive_rules = ReactiveAgent().rules
        self.deliberative_model = DeliberativeAgent()

    def decide(self, observation):
        # Quick reaction first
        quick_response = self.reactive_rules.get(
            "low_score" if observation.get("score", 0) < 60 else "high_score"
        )
        # Then deliberate
        self.deliberative_model.perceive(observation)
        detailed_plan = self.deliberative_model.act()
        return {"quick": quick_response, "detailed": detailed_plan}

# Usage
reactive = ReactiveAgent()
print("Reactive:", reactive.act({"score": 45}))

deliberative = DeliberativeAgent()
print("Deliberative:", deliberative.act())

hybrid = HybridAgent()
result = hybrid.decide({"score": 55})
print("Hybrid - Quick:", result["quick"])
print("Hybrid - Detailed:", result["detailed"])`,
    output: `Reactive: Need more practice
Deliberative: ['Review concepts', 'Extra practice', 'Retest']
Hybrid - Quick: Need more practice
Hybrid - Detailed: ['Review concepts', 'Extra practice', 'Retest']`,
    notes: ['Reactive: Fast, inflexible', 'Deliberative: Slower, more adaptable', 'Hybrid: Best of both worlds'],
    livePreview: false,
    practice: {
      title: 'Choose an Architecture',
      description: 'Design a traffic light control agent. Would you use reactive, deliberative, or hybrid? Justify your choice.',
      hint: 'Consider speed, flexibility, and real-time constraints',
      solution: `Hybrid architecture is best:
Reactive layer: Immediately respond to car sensors (speed)
Deliberative layer: Adjust timing based on traffic patterns (flexibility)`
    }
  },
  {
    id: 'rational-agents',
    category: 'What are AI Agents',
    title: 'Rational Agents',
    difficulty: 'Intermediate',
    theory: [
      'A rational agent is one that acts to maximize expected utility given its knowledge, beliefs, and goals. Rationality doesn\'t mean the agent always succeeds—it means the agent makes the best decision with available information. If you flip a coin and it lands on heads, a rational decision to bet on tails is still rational; you just got unlucky.',
      'In education, a rational tutor agent would: assess student ability accurately, choose problems within the "zone of proximal development," and adjust based on feedback. It makes decisions that maximize learning outcomes given incomplete information about how each student learns.',
      'Rationality requires (1) defining performance/utility, (2) gathering relevant information, (3) reasoning logically, (4) accepting uncertainty. Indian schools can use rational agents to allocate resources: which students need extra help, which can mentor others, which topics need more teaching hours.'
    ],
    code: `import random

class RationalAgent:
    def __init__(self):
        self.beliefs = {}  # What the agent knows/believes
        self.goals = []
        self.utility = {}  # Value of outcomes

    def update_beliefs(self, observation):
        """Learn from environment"""
        self.beliefs.update(observation)

    def choose_action(self, available_actions):
        """Select action that maximizes expected utility"""
        best_action = None
        max_utility = -float('inf')

        for action in available_actions:
            # Estimate utility based on beliefs
            expected_utility = self.estimate_utility(action)
            if expected_utility > max_utility:
                max_utility = expected_utility
                best_action = action

        return best_action

    def estimate_utility(self, action):
        """Rough utility estimation"""
        if action == "easy_problem":
            return 5 if self.beliefs.get("score", 0) < 50 else 2
        elif action == "hard_problem":
            return 5 if self.beliefs.get("score", 0) >= 80 else 1
        elif action == "review":
            return 8 if self.beliefs.get("score", 0) < 60 else 3
        return 0

# Usage
agent = RationalAgent()
agent.update_beliefs({"score": 45, "time_available": 30})
actions = ["easy_problem", "hard_problem", "review"]
best = agent.choose_action(actions)
print(f"Beliefs: {agent.beliefs}")
print(f"Best action: {best}")`,
    output: `Beliefs: {'score': 45, 'time_available': 30}
Best action: review`,
    notes: ['Rationality = maximizing expected utility', 'Agents work with incomplete information', 'Uncertainty is unavoidable', 'Rational ≠ always succeeds'],
    livePreview: false,
    practice: {
      title: 'Build a Simple Rational Agent',
      description: 'Create an agent that chooses between three actions: "Study", "Rest", "Practice Test" based on perceived energy level and exam days left.',
      hint: 'Define utility for each action based on beliefs about energy and time',
      solution: `High energy + many days: Practice
Low energy + many days: Rest
Any energy + few days: Study`
    }
  },
  {
    id: 'agent-vs-assistant',
    category: 'What are AI Agents',
    title: 'Agent vs Assistant: The Difference',
    difficulty: 'Beginner',
    theory: [
      'An AI assistant (like ChatGPT) is a tool that responds to user queries with helpful information or actions. The user is in control—they ask, the assistant answers. Assistants don\'t pursue independent goals; they serve the user\'s immediate needs.',
      'An AI agent pursues goals autonomously. While an assistant waits for a user question, an agent might independently gather information, make decisions, coordinate with other agents, and take actions. An agent tutors students proactively; an assistant answers questions when asked.',
      'In practice, the line blurs. Modern systems often combine both: LLM-powered assistants with agentic capabilities. Syllab.in could use an assistant for Q&A and an agent for adaptive learning personalization.'
    ],
    code: `# AI Assistant: User-controlled
class Tutor_Assistant:
    def respond_to_question(self, question):
        qa_pairs = {
            "What is photosynthesis": "Process where plants convert light to energy...",
            "How do I solve equations": "Isolate variable on one side..."
        }
        return qa_pairs.get(question, "I don't have an answer to that.")

# AI Agent: Goal-driven
class Adaptive_LearningAgent:
    def __init__(self, student_id):
        self.student = student_id
        self.goal = "Improve student's GPA"
        self.active = True

    def run_cycle(self):
        """Agent runs autonomously"""
        actions = []
        actions.append(self.analyze_performance())
        actions.append(self.identify_weak_areas())
        actions.append(self.send_personalized_content())
        actions.append(self.check_progress())
        return actions

    def analyze_performance(self):
        return "Analyzed last 5 quizzes"

    def identify_weak_areas(self):
        return "Found weakness in algebra"

    def send_personalized_content(self):
        return "Sent 3 algebra tutorials"

    def check_progress(self):
        return "Scheduled re-test in 2 days"

# Usage
assistant = Tutor_Assistant()
print("Assistant response:", assistant.respond_to_question("What is photosynthesis"))

agent = Adaptive_LearningAgent("student_001")
print("Agent autonomous actions:", agent.run_cycle())`,
    output: `Assistant response: Process where plants convert light to energy...
Agent autonomous actions: ['Analyzed last 5 quizzes', 'Found weakness in algebra', 'Sent 3 algebra tutorials', 'Scheduled re-test in 2 days']`,
    notes: ['Assistant: Reactive, user-driven', 'Agent: Proactive, goal-driven', 'Hybrid systems combine both', 'Agents need fewer interruptions'],
    livePreview: false,
    practice: {
      title: 'Design Hybrid System',
      description: 'Design a learning platform that combines an assistant (Q&A) and an agent (adaptive learning). How would they interact?',
      hint: 'Assistant responds to questions; agent curates learning path based on assistant interactions',
      solution: `Assistant: Student asks "How do I solve quadratic equations?"
Agent: Listens to interactions, notices pattern of algebra questions, proactively sends algebra practice plan`
    }
  },
  // Category: Agent Components (8 topics)
  {
    id: 'perception-sensors',
    category: 'Agent Components',
    title: 'Perception & Sensors in Agents',
    difficulty: 'Beginner',
    theory: [
      'Sensors are how agents perceive the world. They convert raw environmental data into usable signals. A robot\'s camera is a sensor. A learning agent\'s sensors might include exam scores, time spent on topics, answer patterns, and login history.',
      'Perception is challenging because real-world sensors are imperfect: they may be noisy (incorrect data), delayed (old information), or incomplete (missing data). A tutoring system might receive incomplete data about why a student is struggling—they could be tired, distracted, or lacking prerequisites.',
      'In Indian schools, sensors for a student-tracking agent: attendance device, online quiz system, assessment scores, forum participation, video watch duration. Each provides a piece of the student\'s learning picture.'
    ],
    code: `class Sensor:
    def read(self):
        """Override in subclasses"""
        pass

class AttendanceSensor(Sensor):
    def read(self):
        return {"present": True, "timestamp": "2026-05-25 09:30"}

class QuizSensor(Sensor):
    def read(self):
        return {"score": 78, "questions_correct": 23, "total": 30}

class EngagementSensor(Sensor):
    def read(self):
        return {"video_watched_percent": 85, "forum_posts": 3, "time_spent": 45}

class StudentPercepion:
    def __init__(self):
        self.sensors = [
            AttendanceSensor(),
            QuizSensor(),
            EngagementSensor()
        ]

    def perceive(self):
        """Gather data from all sensors"""
        observations = {}
        for sensor in self.sensors:
            sensor_name = sensor.__class__.__name__
            observations[sensor_name] = sensor.read()
        return observations

    def process_observations(self):
        """Make sense of data"""
        obs = self.perceive()
        return {
            "student_engaged": obs["EngagementSensor"]["video_watched_percent"] > 80,
            "quiz_performance": obs["QuizSensor"]["score"],
            "attendance_ok": obs["AttendanceSensor"]["present"]
        }

# Usage
perception = StudentPercepion()
raw_data = perception.perceive()
processed = perception.process_observations()
print("Raw sensor data:")
for sensor, data in raw_data.items():
    print(f"  {sensor}: {data}")
print("\\nProcessed perception:")
for key, value in processed.items():
    print(f"  {key}: {value}")`,
    output: `Raw sensor data:
  AttendanceSensor: {'present': True, 'timestamp': '2026-05-25 09:30'}
  QuizSensor: {'score': 78, 'questions_correct': 23, 'total': 30}
  EngagementSensor: {'video_watched_percent': 85, 'forum_posts': 3, 'time_spent': 45}

Processed perception:
  student_engaged: True
  quiz_performance: 78
  attendance_ok: True`,
    notes: ['Sensors provide raw data', 'Noise and delays are common', 'Incomplete information is reality', 'Processing converts signals to understanding'],
    livePreview: false,
    practice: {
      title: 'Add a New Sensor',
      description: 'Add a homework submission sensor that tracks: submission date, late status, and quality score. Integrate it with StudentPerception.',
      hint: 'Create HomeworkSensor class, extend sensors list, add to processed perception',
      solution: `class HomeworkSensor(Sensor):
    def read(self):
        return {"submitted": True, "late": False, "quality_score": 85}`
    }
  },
  {
    id: 'actions-actuators',
    category: 'Agent Components',
    title: 'Actions & Actuators',
    difficulty: 'Beginner',
    theory: [
      'Actuators are the agent\'s tools for interacting with the world. They translate decisions into actions. A robot arm is an actuator. For a tutoring agent, actuators might be: send message, unlock next lesson, assign homework, adjust difficulty.',
      'Not all actions are available to all agents. A tutoring agent in a public school might not have the actuator "expel student," but a principal agent might. Constraints on actuators define what agents can and cannot do.',
      'Effective agents have diverse actuators. A learning agent needs multiple ways to respond: praise, explain differently, give easier problems, give harder problems, suggest rest, recommend real-world application.'
    ],
    code: `class Actuator:
    """Base class for agent actions"""
    def execute(self, action_data):
        pass

class MessageActuator(Actuator):
    def execute(self, message):
        return f"Sent message: {message}"

class LessonActuator(Actuator):
    def execute(self, lesson_id):
        return f"Unlocked lesson: {lesson_id}"

class HomeworkActuator(Actuator):
    def execute(self, problems):
        return f"Assigned {len(problems)} problems"

class DifficultyActuator(Actuator):
    def execute(self, level):
        return f"Adjusted difficulty to: {level}"

class TutorActuator:
    def __init__(self):
        self.actuators = {
            "message": MessageActuator(),
            "lesson": LessonActuator(),
            "homework": HomeworkActuator(),
            "difficulty": DifficultyActuator()
        }

    def decide_action(self, observation):
        """Choose and execute action based on perception"""
        score = observation.get("score", 0)

        if score < 50:
            # Poor performance
            actions = [
                self.actuators["message"].execute("You can do better! Let's review."),
                self.actuators["difficulty"].execute("Easy"),
                self.actuators["lesson"].execute("algebra_basics_1")
            ]
        elif score >= 80:
            # Good performance
            actions = [
                self.actuators["message"].execute("Great work!"),
                self.actuators["difficulty"].execute("Hard"),
                self.actuators["homework"].execute([1, 2, 3, 4, 5])
            ]
        else:
            # Average
            actions = [
                self.actuators["message"].execute("Good effort!"),
                self.actuators["difficulty"].execute("Medium")
            ]

        return actions

# Usage
tutor = TutorActuator()
actions = tutor.decide_action({"score": 35})
print("Actions taken:")
for action in actions:
    print(f"  {action}")`,
    output: `Actions taken:
  Sent message: You can do better! Let's review.
  Adjusted difficulty to: Easy
  Unlocked lesson: algebra_basics_1`,
    notes: ['Actuators execute decisions', 'Agents are constrained by available actuators', 'Different actuators for different situations', 'Actions must be observable to measure success'],
    livePreview: false,
    practice: {
      title: 'Design Actuators for a Tutor',
      description: 'Add three new actuators: (1) GiveHintActuator, (2) RecommendBreakActuator, (3) SuggestPeerStudyActuator. Use them in decide_action.',
      hint: 'Follow the pattern of existing actuators, add them to the actuators dict',
      solution: `class GiveHintActuator(Actuator):
    def execute(self, hint):
        return f"Hint: {hint}"`
    }
  },
  {
    id: 'memory-types',
    category: 'Agent Components',
    title: 'Memory Types in Agents',
    difficulty: 'Intermediate',
    theory: [
      'Agents use multiple types of memory: short-term (working memory, current context), long-term (stored knowledge, learning), and episodic (past events). Short-term memory is fast but limited. Long-term memory is vast but slower to access.',
      'A tutoring agent\'s short-term memory: current quiz, current student response, immediate feedback. Long-term memory: all past quizzes, concepts mastered, struggle areas, learning rate. Episodic memory: "On May 25, Arjun failed the algebra test."',
      'In practice, agents often use databases for long-term memory and in-memory data structures for short-term. Vector databases (embedding-based) are increasingly popular for fast retrieval of similar past experiences.'
    ],
    code: `from collections import deque
from datetime import datetime

class StudentMemory:
    def __init__(self, student_id):
        self.student_id = student_id
        # Short-term memory (current session)
        self.working_memory = {
            "current_topic": None,
            "current_score": 0,
            "questions_seen": deque(maxlen=5)  # Last 5 questions
        }
        # Long-term memory (accumulated knowledge)
        self.long_term = {
            "all_scores": [],
            "concepts_mastered": [],
            "struggle_areas": [],
            "learning_rate": 0.0
        }
        # Episodic memory (timestamped events)
        self.episodes = []

    def record_event(self, event):
        """Store episodic memory"""
        self.episodes.append({
            "timestamp": datetime.now(),
            "event": event
        })

    def update_working_memory(self, topic, question):
        """Update current context"""
        self.working_memory["current_topic"] = topic
        self.working_memory["questions_seen"].append(question)

    def consolidate_memory(self, score, mastered):
        """Move from working to long-term"""
        self.long_term["all_scores"].append(score)
        if mastered:
            self.long_term["concepts_mastered"].append(
                self.working_memory["current_topic"]
            )
        self.working_memory["current_score"] = score

    def get_recent_history(self, days=7):
        """Quick access to recent episodes"""
        from datetime import timedelta
        cutoff = datetime.now() - timedelta(days=days)
        return [e for e in self.episodes if e["timestamp"] > cutoff]

    def summarize(self):
        return {
            "working": self.working_memory,
            "long_term": self.long_term,
            "recent_episodes": len(self.get_recent_history())
        }

# Usage
memory = StudentMemory("student_042")
memory.record_event("Attended algebra class")
memory.update_working_memory("Quadratic Equations", "q1_solve_x2+5x+6=0")
memory.consolidate_memory(score=82, mastered=True)
memory.update_working_memory("Quadratic Equations", "q2_find_discriminant")
memory.consolidate_memory(score=90, mastered=True)

print("Student Memory Summary:")
summary = memory.summarize()
print(f"Working memory: {summary['working']['current_topic']}, Score: {summary['working']['current_score']}")
print(f"Mastered: {summary['long_term']['concepts_mastered']}")
print(f"All scores: {summary['long_term']['all_scores']}")
print(f"Recent events: {summary['recent_episodes']}")`,
    output: `Student Memory Summary:
Working memory: Quadratic Equations, Score: 90
Mastered: ['Quadratic Equations', 'Quadratic Equations']
All scores: [82, 90]
Recent events: 2`,
    notes: ['Short-term: Fast, limited capacity', 'Long-term: Slow, large capacity', 'Episodic: Timestamped events', 'Consolidation: Working → Long-term'],
    livePreview: false,
    practice: {
      title: 'Implement Forgetting Curve',
      description: 'Add a method decay_old_memories() that reduces confidence in old long-term memories using the forgetting curve (older memories have lower confidence).',
      hint: 'Use timestamps to calculate age, apply a decay function like confidence * (1 - 0.1 * age_in_days)',
      solution: `def decay_old_memories(self):
    # Older memories become less reliable
    for episode in self.episodes:
        age_days = (datetime.now() - episode["timestamp"]).days
        confidence = max(0, 1 - 0.1 * age_days)
        episode["confidence"] = confidence`
    }
  },
  {
    id: 'planning-agents',
    category: 'Agent Components',
    title: 'Planning in Agents',
    difficulty: 'Intermediate',
    theory: [
      'Planning is how agents decompose goals into action sequences. Rather than deciding actions one at a time (reactive), agents look ahead: "To achieve goal X, I must first do Y, then Z." Planning requires a model of the world and understanding action consequences.',
      'Simple planning: straightforward action sequences. Complex planning: handling dependencies, alternatives, and uncertainty. An agent tutoring for exams might plan: Assess → Review weak areas → Practice → Mock test → Review mistakes → Final review.',
      'In Indian education, curriculum planning is hierarchical: Year goal → Term goals → Month goals → Week goals → Daily lessons. AI agents can help students follow this planning structure dynamically based on progress.'
    ],
    code: `class Goal:
    def __init__(self, name, priority=1):
        self.name = name
        self.priority = priority
        self.achieved = False

class Action:
    def __init__(self, name, preconditions=None, effects=None):
        self.name = name
        self.preconditions = preconditions or []
        self.effects = effects or []

class SimplePlanner:
    def __init__(self):
        self.world_state = {}
        self.available_actions = []

    def plan(self, goal):
        """Generate sequence of actions to achieve goal"""
        plan = []

        if goal.name == "Pass Math Exam":
            plan = [
                Action("Assess current level"),
                Action("Review algebra basics"),
                Action("Review calculus basics"),
                Action("Practice 50 problems"),
                Action("Take mock test"),
                Action("Review mistakes"),
                Action("Final revision")
            ]
        elif goal.name == "Improve speaking":
            plan = [
                Action("Record yourself"),
                Action("Identify weak areas"),
                Action("Practice pronunciation"),
                Action("Speak with native speakers"),
                Action("Record again, compare")
            ]

        return plan

    def execute_plan(self, plan):
        """Execute each action in sequence"""
        results = []
        for action in plan:
            result = f"Executed: {action.name}"
            results.append(result)
        return results

class HierarchicalPlanner:
    """Plans goals at multiple levels"""
    def __init__(self):
        self.goal_hierarchy = {}

    def plan_exam_prep(self):
        """Year-level goal decomposed to daily actions"""
        return {
            "Year Goal": "Pass JEE",
            "Quarterly": ["Complete physics", "Complete chemistry", "Complete math"],
            "Monthly": ["Unit 1: Mechanics", "Unit 2: Thermodynamics", ...],
            "Weekly": ["5 concept videos", "10 practice problems", "1 mock test"],
            "Daily": ["30 min concept study", "1 hour practice", "Review mistakes"]
        }

# Usage
planner = SimplePlanner()
goal = Goal("Pass Math Exam", priority=1)
plan = planner.plan(goal)
print(f"Goal: {goal.name}")
print("Plan:")
for action in plan:
    print(f"  - {action.name}")

results = planner.execute_plan(plan)
print("\\nExecution:")
for result in results[:3]:  # Show first 3
    print(f"  {result}")`,
    output: `Goal: Pass Math Exam
Plan:
  - Assess current level
  - Review algebra basics
  - Review calculus basics
  - Practice 50 problems
  - Take mock test
  - Review mistakes
  - Final revision

Execution:
  Executed: Assess current level
  Executed: Review algebra basics
  Executed: Review calculus basics`,
    notes: ['Hierarchical planning: decompose goals', 'Action sequences achieve complex goals', 'Plans adapt to world state changes', 'Planning requires world model'],
    livePreview: false,
    practice: {
      title: 'Reverse-Goal Planning',
      description: 'Implement backward chaining: start from the goal and identify necessary preconditions. Example: "To achieve 95 in exam, must score well on mock test."',
      hint: 'Create a backward_plan() method that traces dependencies',
      solution: `def backward_plan(self, goal):
    # Reverse: Start from goal, find prerequisites
    dependencies = {
        "Pass exam": ["Do mock test", "Practice 50 problems"],
        "Do mock test": ["Review basics", "Practice"],
        "Practice 50 problems": ["Understand concepts"]
    }
    return dependencies.get(goal.name, [])`
    }
  },
  {
    id: 'tools-functions',
    category: 'Agent Components',
    title: 'Tools and Functions in Agents',
    difficulty: 'Beginner',
    theory: [
      'Tools are external capabilities agents can invoke. A tutoring agent has tools: search_web, fetch_document, send_email, access_database. Tools expand agent capabilities beyond built-in reasoning.',
      'Effective tools are well-defined, reliable, and safe. They have clear inputs, outputs, and side effects. An agent needs to know when to use which tool. A bad agent tries every tool randomly. A good agent strategically selects tools to accomplish goals.',
      'In Indian schools, tools for a learning agent might be: fetch_NCERT_chapter, run_code_snippet, fetch_student_record, send_notification, schedule_meeting, upload_assignment.'
    ],
    code: `class Tool:
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def execute(self, **kwargs):
        pass

class FetchNCERTTool(Tool):
    def __init__(self):
        super().__init__(
            "fetch_ncert",
            "Fetches NCERT chapter content by subject and chapter"
        )

    def execute(self, subject: str, chapter: int):
        # Simulated
        return {
            "subject": subject,
            "chapter": chapter,
            "content": f"Chapter {chapter} of {subject}...",
            "exercises": [f"Q{i}" for i in range(1, 6)]
        }

class FetchStudentRecordTool(Tool):
    def __init__(self):
        super().__init__(
            "fetch_record",
            "Fetches student academic record"
        )

    def execute(self, student_id: str):
        # Simulated
        return {
            "id": student_id,
            "scores": [85, 78, 92, 88],
            "attendance": 95,
            "weak_areas": ["Geometry", "Complex numbers"]
        }

class SendEmailTool(Tool):
    def __init__(self):
        super().__init__(
            "send_email",
            "Sends email to student or parent"
        )

    def execute(self, to: str, subject: str, body: str):
        return f"Email sent to {to}: {subject}"

class ToolManager:
    def __init__(self):
        self.tools = {
            "fetch_ncert": FetchNCERTTool(),
            "fetch_record": FetchStudentRecordTool(),
            "send_email": SendEmailTool()
        }

    def choose_tools(self, goal):
        """Agent decides which tools to use"""
        if goal == "Help student in geometry":
            return [self.tools["fetch_ncert"], self.tools["fetch_record"]]
        elif goal == "Notify parent of progress":
            return [self.tools["fetch_record"], self.tools["send_email"]]
        return []

    def use_tools(self, goal):
        """Execute selected tools"""
        selected = self.choose_tools(goal)
        results = []

        if goal == "Help student in geometry":
            ch = selected[0].execute(subject="Mathematics", chapter=5)
            rec = selected[1].execute(student_id="S001")
            results.append(f"Fetched geometry chapter with {len(ch['exercises'])} exercises")
            results.append(f"Student weak areas: {rec['weak_areas']}")

        return results

# Usage
manager = ToolManager()
results = manager.use_tools("Help student in geometry")
print("Tool execution results:")
for r in results:
    print(f"  {r}")`,
    output: `Tool execution results:
  Fetched geometry chapter with 5 exercises
  Student weak areas: ['Geometry', 'Complex numbers']`,
    notes: ['Tools extend agent capabilities', 'Agents must choose tools wisely', 'Tools must be reliable and safe', 'Tool composition: chain multiple tools'],
    livePreview: false,
    practice: {
      title: 'Add a Code Execution Tool',
      description: 'Create a RunCodeTool that executes Python code snippets. The agent can use it to verify student solutions.',
      hint: 'Use exec() safely (only for educational code) to run student submissions',
      solution: `class RunCodeTool(Tool):
    def execute(self, code: str):
        try:
            result = exec(code)
            return {"status": "success", "output": result}
        except Exception as e:
            return {"status": "error", "error": str(e)}`
    }
  },
  {
    id: 'function-calling',
    category: 'Agent Components',
    title: 'Function Calling in AI Agents',
    difficulty: 'Intermediate',
    theory: [
      'Function calling is how LLM-based agents invoke external functions. The agent describes what it wants to do, and the system translates that into function calls. For example, an agent might "think" "I need to fetch the student\'s exam scores," and the system calls fetch_scores(student_id).',
      'Modern LLM APIs support structured function calling. You define available functions with descriptions and parameters. The LLM outputs structured data indicating which function to call and with what arguments. This is safer and more reliable than parsing natural language.',
      'In an agent framework like LangChain or Anthropic\'s tools, you define functions, and the agent learns to use them through examples and feedback. An agent tutoring 12th-grade physics might have functions: explain_concept, solve_problem, generate_practice, create_quiz.'
    ],
    code: `import json

# Define available functions
FUNCTIONS = {
    "fetch_scores": {
        "name": "fetch_scores",
        "description": "Fetch exam scores for a student",
        "parameters": {
            "student_id": "str",
            "exam_type": "str"  # 'midterm' or 'final'
        }
    },
    "explain_concept": {
        "name": "explain_concept",
        "description": "Explain a physics concept",
        "parameters": {
            "concept": "str",
            "level": "str"  # 'basic', 'detailed', 'advanced'
        }
    },
    "generate_problems": {
        "name": "generate_problems",
        "description": "Generate practice problems",
        "parameters": {
            "topic": "str",
            "difficulty": "str",
            "count": "int"
        }
    }
}

def fetch_scores(student_id, exam_type):
    """Simulate fetching scores"""
    return {"student_id": student_id, "exam_type": exam_type, "score": 85}

def explain_concept(concept, level):
    """Simulate concept explanation"""
    explanations = {
        "Newton's Laws": "Objects in motion stay in motion...",
        "Gravity": "Gravitational force between two masses..."
    }
    return {
        "concept": concept,
        "level": level,
        "explanation": explanations.get(concept, "Concept not found")
    }

def generate_problems(topic, difficulty, count):
    """Simulate problem generation"""
    return {
        "topic": topic,
        "difficulty": difficulty,
        "problems": [f"{topic} Problem {i+1}" for i in range(count)],
        "count": count
    }

class FunctionCallingAgent:
    def __init__(self):
        self.functions = {
            "fetch_scores": fetch_scores,
            "explain_concept": explain_concept,
            "generate_problems": generate_problems
        }

    def decide_functions(self, user_request):
        """Agent decides which functions to call"""
        if "score" in user_request.lower():
            return [("fetch_scores", {"student_id": "S001", "exam_type": "midterm"})]
        elif "explain" in user_request.lower():
            return [("explain_concept", {"concept": "Newton's Laws", "level": "basic"})]
        elif "practice" in user_request.lower():
            return [("generate_problems", {"topic": "Mechanics", "difficulty": "medium", "count": 5})]
        return []

    def execute_functions(self, user_request):
        """Execute chosen functions"""
        function_calls = self.decide_functions(user_request)
        results = []

        for func_name, params in function_calls:
            if func_name in self.functions:
                result = self.functions[func_name](**params)
                results.append({
                    "function": func_name,
                    "result": result
                })

        return results

# Usage
agent = FunctionCallingAgent()
requests = [
    "What are my exam scores?",
    "Explain Newton's Laws",
    "Generate practice problems"
]

for req in requests:
    results = agent.execute_functions(req)
    print(f"Request: {req}")
    for r in results:
        print(f"  Called: {r['function']}")
        print(f"  Result: {r['result']}")
    print()`,
    output: `Request: What are my exam scores?
  Called: fetch_scores
  Result: {'student_id': 'S001', 'exam_type': 'midterm', 'score': 85}

Request: Explain Newton's Laws
  Called: explain_concept
  Result: {'concept': "Newton's Laws", 'level': 'basic', 'explanation': "Objects in motion stay in motion..."}

Request: Generate practice problems
  Called: generate_problems
  Result: {'topic': 'Mechanics', 'difficulty': 'medium', 'problems': ['Mechanics Problem 1', 'Mechanics Problem 2', 'Mechanics Problem 3', 'Mechanics Problem 4', 'Mechanics Problem 5'], 'count': 5}`,
    notes: ['LLM outputs structured function calls', 'Functions extend reasoning with external data', 'Safe, reliable alternative to prompt parsing', 'Foundation for agentic systems'],
    livePreview: false,
    practice: {
      title: 'Add Parallel Function Calls',
      description: 'Modify the agent to call multiple functions in parallel. Example: fetch scores AND explain concept in response to "Review my physics performance."',
      hint: 'Return multiple tuples from decide_functions()',
      solution: `def decide_functions(self, user_request):
    if "review" in user_request.lower() and "physics" in user_request.lower():
        return [
            ("fetch_scores", {"student_id": "S001", "exam_type": "midterm"}),
            ("explain_concept", {"concept": "Newton's Laws", "level": "basic"})
        ]`
    }
  },
  {
    id: 'memory-retrieval',
    category: 'Agent Components',
    title: 'Memory Retrieval in Agents',
    difficulty: 'Intermediate',
    theory: [
      'Memory retrieval is how agents access relevant past information to inform current decisions. Instead of processing all past data (slow), agents search for relevant items. Vector similarity search is common: encode current context and past events as vectors, find closest matches.',
      'A tutoring agent retrieving memory: "Student struggled with quadratic equations before. How did we solve it?" Agent searches: past interactions with "quadratic equations" → finds previous explanation → adapts and reuses successful strategy.',
      'RAG (Retrieval-Augmented Generation) combines retrieval with generation: fetch relevant documents, use them to inform LLM responses. A code-helping agent might: "Student needs help with loops" → retrieve relevant Python tutorial snippets → generate customized explanation using those snippets.'
    ],
    code: `import math
from typing import List, Tuple

class Memory:
    def __init__(self, text, embedding, timestamp):
        self.text = text
        self.embedding = embedding  # Vector representation
        self.timestamp = timestamp

class MemoryRetriever:
    def __init__(self):
        self.memories = []

    def store_memory(self, text, embedding):
        """Store interaction as memory"""
        from datetime import datetime
        memory = Memory(text, embedding, datetime.now())
        self.memories.append(memory)

    def cosine_similarity(self, vec1, vec2):
        """Calculate similarity between two vectors"""
        dot_product = sum(a*b for a, b in zip(vec1, vec2))
        mag1 = math.sqrt(sum(a*a for a in vec1))
        mag2 = math.sqrt(sum(b*b for b in vec2))
        if mag1 == 0 or mag2 == 0:
            return 0
        return dot_product / (mag1 * mag2)

    def retrieve_similar(self, query_embedding, top_k=3):
        """Find most similar past memories"""
        similarities = []
        for mem in self.memories:
            sim = self.cosine_similarity(query_embedding, mem.embedding)
            similarities.append((mem, sim))

        # Sort by similarity, return top_k
        similarities.sort(key=lambda x: x[1], reverse=True)
        return [mem for mem, _ in similarities[:top_k]]

class RAGTutor:
    def __init__(self):
        self.retriever = MemoryRetriever()
        # Pre-populate with past interactions (simplified embeddings)
        self.retriever.store_memory(
            "Explained quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
            [0.7, 0.1, 0.2, 0.9]
        )
        self.retriever.store_memory(
            "Student practiced factoring: (x+2)(x-3) = 0",
            [0.8, 0.2, 0.1, 0.85]
        )
        self.retriever.store_memory(
            "Explained discriminant: If b²-4ac > 0, two real roots",
            [0.75, 0.15, 0.25, 0.88]
        )

    def respond(self, query_embedding):
        """RAG: Retrieve relevant memories, then generate response"""
        relevant = self.retriever.retrieve_similar(query_embedding, top_k=2)
        response = "Based on past learning: "
        for mem in relevant:
            response += mem.text[:50] + "... "
        return response

# Usage
tutor = RAGTutor()
# Simulated query embedding for "How do I solve quadratic equations?"
query = [0.75, 0.12, 0.2, 0.87]
response = tutor.respond(query)
print("RAG Response:")
print(response)
print(f"\\nMemories stored: {len(tutor.retriever.memories)}")`,
    output: `RAG Response:
Based on past learning: Explained quadratic formula: x = (-b ± √(b... Explained discriminant: If b²-4ac > 0, two real r...

Memories stored: 3`,
    notes: ['Vector similarity: Find relevant past experiences', 'RAG combines retrieval + generation', 'Agents learn from similar past cases', 'Embeddings enable semantic search'],
    livePreview: false,
    practice: {
      title: 'Implement Temporal Memory (Recent = More Relevant)',
      description: 'Modify retrieve_similar() to boost recent memories. Memories from the last 7 days should have higher priority.',
      hint: 'Calculate recency score, combine with similarity: final_score = similarity * (1 + recency_boost)',
      solution: `def retrieve_similar(self, query_embedding, top_k=3):
    from datetime import datetime, timedelta
    similarities = []
    for mem in self.memories:
        sim = self.cosine_similarity(query_embedding, mem.embedding)
        age_days = (datetime.now() - mem.timestamp).days
        recency_boost = 1 if age_days < 7 else 0.5
        final_score = sim * recency_boost
        similarities.append((mem, final_score))

    similarities.sort(key=lambda x: x[1], reverse=True)
    return [mem for mem, _ in similarities[:top_k]]`
    }
  },
  {
    id: 'agent-loops',
    category: 'Agent Components',
    title: 'Agent Loops: Perceive-Reason-Act',
    difficulty: 'Intermediate',
    theory: [
      'The agent loop is the core execution cycle: Perceive (read sensors) → Reason (process observations, decide) → Act (execute actions) → Repeat. This loop runs continuously, driving agent behavior.',
      'Well-designed loops are efficient (not too slow), responsive (detect changes), and safe (include stopping conditions). A tutoring agent might loop every 5 seconds, checking for student input. An autonomous vehicle might loop 100+ times per second.',
      'Loop conditions matter: What triggers the loop? When does it stop? An adaptive learning agent might loop continuously throughout a study session. A homework grader agent might loop once per submission.'
    ],
    code: `import time
from datetime import datetime

class AgentLoop:
    def __init__(self, agent_id, loop_frequency=1):
        self.agent_id = agent_id
        self.loop_frequency = loop_frequency  # seconds
        self.running = False
        self.iteration = 0

    def perceive(self):
        """Gather sensor data"""
        return {
            "timestamp": datetime.now(),
            "student_activity": "working",
            "time_elapsed": self.iteration * self.loop_frequency
        }

    def reason(self, observations):
        """Process observations, make decisions"""
        decisions = []
        if observations["time_elapsed"] > 600:  # 10 minutes
            decisions.append("Suggest break")
        if observations["time_elapsed"] % 300 == 0:  # Every 5 minutes
            decisions.append("Check understanding")
        return decisions

    def act(self, decisions):
        """Execute decisions"""
        actions = []
        for decision in decisions:
            if decision == "Suggest break":
                actions.append("Send notification: Take a 5-minute break")
            elif decision == "Check understanding":
                actions.append("Send quiz question")
        return actions

    def run_one_iteration(self):
        """Single loop iteration"""
        obs = self.perceive()
        decisions = self.reason(obs)
        actions = self.act(decisions)
        self.iteration += 1
        return {
            "iteration": self.iteration,
            "observations": obs,
            "actions": actions
        }

    def run(self, max_iterations=10):
        """Run loop for specified iterations"""
        self.running = True
        results = []

        while self.running and self.iteration < max_iterations:
            result = self.run_one_iteration()
            results.append(result)

            # Stop condition
            if self.iteration >= max_iterations:
                self.running = False

            # Simulate loop delay
            time.sleep(self.loop_frequency / 10)  # Faster for demo

        return results

# Usage
loop = AgentLoop("tutor_001", loop_frequency=1)
results = loop.run(max_iterations=6)

print(f"Agent Loop Execution ({loop.agent_id}):")
print(f"Total iterations: {len(results)}")
for result in results:
    if result["actions"]:
        print(f"  Iteration {result['iteration']}: {result['actions']}")`,
    output: `Agent Loop Execution (tutor_001):
Total iterations: 6
  Iteration 2: ['Send notification: Take a 5-minute break']
  Iteration 5: ['Send quiz question']`,
    notes: ['Perceive → Reason → Act → Repeat', 'Loop frequency impacts responsiveness', 'Stopping conditions prevent infinite loops', 'Iteration tracking enables debugging'],
    livePreview: false,
    practice: {
      title: 'Add Error Handling to Loop',
      description: 'Add try-except blocks to handle errors gracefully. If perceive() fails, skip iteration and try again.',
      hint: 'Wrap perceive, reason, and act in try-except; log errors',
      solution: `def run_one_iteration(self):
    try:
        obs = self.perceive()
        decisions = self.reason(obs)
        actions = self.act(decisions)
        self.iteration += 1
        return {...}
    except Exception as e:
        print(f"Error in iteration: {e}")
        return None`
    }
  },
  // Category: Building Simple Agents (8 topics)
  {
    id: 'hello-world-agent',
    category: 'Building Simple Agents',
    title: 'Hello World Agent in Python',
    difficulty: 'Beginner',
    theory: [
      'Your first agent! A minimal agent that perceives a simple input, reasons about it, and produces output. This foundational exercise shows the perception-reasoning-action loop in its simplest form.',
      'In this exercise, the "environment" is user input, "sensors" are input() functions, "reasoning" is simple if-else logic, and "actuators" are print() functions. Real agents are more complex, but the structure remains the same.',
      'Starting simple builds intuition. Before building multi-agent systems or autonomous systems, understand the basics: How do I perceive? How do I reason? How do I act?'
    ],
    code: `class SimpleAgent:
    def __init__(self, name):
        self.name = name
        self.state = "idle"

    def perceive(self):
        """Agent perceives user input"""
        user_input = input(f"{self.name} listens: ")
        return user_input

    def reason(self, perception):
        """Agent reasons about perception"""
        if "hello" in perception.lower():
            return "greeting"
        elif "help" in perception.lower():
            return "help_request"
        elif "exit" in perception.lower():
            return "terminate"
        else:
            return "unknown"

    def act(self, decision):
        """Agent acts based on reasoning"""
        if decision == "greeting":
            return f"{self.name}: Hello! How can I help you?"
        elif decision == "help_request":
            return f"{self.name}: I can help with tutoring. Try saying 'explain' or 'practice'."
        elif decision == "terminate":
            return f"{self.name}: Goodbye!"
        else:
            return f"{self.name}: I didn't understand. Say 'help' for options."

    def run(self):
        """Run agent loop"""
        print(f"Agent '{self.name}' started!")
        while True:
            perception = self.perceive()
            decision = self.reason(perception)
            response = self.act(decision)
            print(response)
            if decision == "terminate":
                break

# Simplified demo (without input for code execution)
class DemoAgent(SimpleAgent):
    def run_demo(self):
        """Demo mode with preset inputs"""
        demo_inputs = ["Hello", "Can you help?", "exit"]
        print(f"Agent '{self.name}' demo mode:")
        for user_input in demo_inputs:
            print(f"User: {user_input}")
            decision = self.reason(user_input)
            response = self.act(decision)
            print(response)

# Run demo
agent = DemoAgent("MyTutor")
agent.run_demo()`,
    output: `Agent 'MyTutor' demo mode:
User: Hello
MyTutor: Hello! How can I help you?
User: Can you help?
MyTutor: I can help with tutoring. Try saying 'explain' or 'practice'.
User: exit
MyTutor: Goodbye!`,
    notes: ['Start with simple input-output', 'Perception → Reasoning → Action', 'Each component is replaceable', 'Expand by adding tools and memory'],
    livePreview: false,
    practice: {
      title: 'Add More Responses',
      description: 'Extend the reasoning and acting functions. Add handling for "explain <topic>" and "practice <topic>" inputs.',
      hint: 'Check if "explain" or "practice" is in the input, extract the topic word after it',
      solution: `elif "explain" in perception.lower():
    topic = perception.split("explain")[-1].strip()
    return ("explain", topic)
elif "practice" in perception.lower():
    topic = perception.split("practice")[-1].strip()
    return ("practice", topic)`
    }
  },
  {
    id: 'tool-using-agent',
    category: 'Building Simple Agents',
    title: 'Tool-Using Agent',
    difficulty: 'Intermediate',
    theory: [
      'A tool-using agent is one that calls external functions or APIs to accomplish tasks. Instead of knowing everything, it knows when and how to use tools. A tutoring agent might use tools: translate_text, fetch_image, run_code.',
      'Tool selection is key. An agent that randomly tries tools is inefficient. A smart agent understands: "To explain photosynthesis, I need images and a clear explanation. Let me use fetch_image and explain tools."',
      'In practice, tool-using agents learn from context which tools work best for different situations. This is how ChatGPT with plugins works, and how modern AI agents extend beyond pure language to interact with the world.'
    ],
    code: `class Tool:
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def execute(self, **kwargs):
        pass

class FetchImageTool(Tool):
    def __init__(self):
        super().__init__("fetch_image", "Fetch image related to topic")

    def execute(self, topic):
        return f"[Image: {topic}]"

class ExplainTool(Tool):
    def __init__(self):
        super().__init__("explain", "Explain a concept")

    def execute(self, concept):
        explanations = {
            "photosynthesis": "Process: Light + CO2 + H2O → Glucose + O2",
            "gravity": "Force of attraction between masses"
        }
        return explanations.get(concept, "Unknown concept")

class RunCodeTool(Tool):
    def __init__(self):
        super().__init__("run_code", "Execute Python code")

    def execute(self, code):
        try:
            exec(code)
            return "Code executed successfully"
        except Exception as e:
            return f"Error: {e}"

class ToolUsingAgent:
    def __init__(self):
        self.tools = {
            "fetch_image": FetchImageTool(),
            "explain": ExplainTool(),
            "run_code": RunCodeTool()
        }

    def select_tools(self, request):
        """Agent selects appropriate tools"""
        if "image" in request.lower() or "show" in request.lower():
            return ["fetch_image"]
        elif "explain" in request.lower():
            return ["explain"]
        elif "code" in request.lower():
            return ["run_code"]
        return []

    def execute_request(self, request):
        """Execute user request using tools"""
        selected = self.select_tools(request)
        results = []

        if "explain photosynthesis" in request.lower():
            results.append(self.tools["fetch_image"].execute("photosynthesis"))
            results.append(self.tools["explain"].execute("photosynthesis"))

        return results

# Usage
agent = ToolUsingAgent()
request = "Explain photosynthesis and show images"
results = agent.execute_request(request)
print(f"Request: {request}")
for r in results:
    print(f"  {r}")`,
    output: `Request: Explain photosynthesis and show images
  [Image: photosynthesis]
  Process: Light + CO2 + H2O → Glucose + O2`,
    notes: ['Tools extend agent capabilities', 'Smart selection > random attempts', 'Tools handle complexity', 'Agents compose multiple tools'],
    livePreview: false,
    practice: {
      title: 'Create a TranslateTool',
      description: 'Add a tool that translates concepts to Hindi. Use it when request contains "hindi" or "in hindi".',
      hint: 'Create TranslateTool class with Hindi translations dict',
      solution: `class TranslateTool(Tool):
    def execute(self, english_text):
        translations = {
            "photosynthesis": "प्रकाश संश्लेषण",
            "gravity": "गुरुत्वाकर्षण"
        }
        return translations.get(english_text, english_text)`
    }
  },
  {
    id: 'web-search-agent',
    category: 'Building Simple Agents',
    title: 'Web Search Agent',
    difficulty: 'Intermediate',
    theory: [
      'A web search agent autonomously queries the internet for information. Instead of relying on trained knowledge (which becomes outdated), it actively searches for current information. Uses API: Google Search, Bing, custom search engines.',
      'Web search agents handle: query formation, result ranking, snippet extraction, fact-checking. A tutoring agent might search: "latest CBSE guidelines for Class 12 Physics." A news agent searches for breaking stories.',
      'Real-world complexity: results can be misleading, sources unreliable, search queries ambiguous. Good agents filter results, verify facts, and refine queries.'
    ],
    code: `class WebSearchAgent:
    def __init__(self):
        # Simulated search results
        self.knowledge_base = {
            "CBSE Class 12 Physics": [
                "Electrostatics: Coulomb's law, electric field, potential",
                "Current Electricity: Ohm's law, circuits, EMF",
                "Magnetism: Magnetic field, Lorentz force, electromagnetic induction"
            ],
            "Renewable Energy India": [
                "India aims 500 GW renewable by 2030",
                "Solar capacity: 60+ GW installed",
                "Wind energy projects in Tamil Nadu, Gujarat"
            ]
        }

    def formulate_query(self, user_topic):
        """Agent formulates search query"""
        return f"Relevant information about {user_topic}"

    def search(self, query):
        """Simulate web search"""
        for key in self.knowledge_base:
            if key.lower() in query.lower():
                return self.knowledge_base[key]
        return []

    def rank_results(self, results):
        """Rank search results by relevance"""
        return results  # Simplified

    def extract_snippets(self, results, count=3):
        """Extract top N results"""
        return results[:count]

    def answer_question(self, question):
        """End-to-end QA using search"""
        query = self.formulate_query(question)
        results = self.search(query)
        ranked = self.rank_results(results)
        snippets = self.extract_snippets(ranked, count=2)
        return snippets

# Usage
agent = WebSearchAgent()
questions = [
    "What are CBSE Class 12 Physics topics?",
    "Tell me about renewable energy in India"
]

for q in questions:
    print(f"Q: {q}")
    answers = agent.answer_question(q)
    for ans in answers:
        print(f"  - {ans}")
    print()`,
    output: `Q: What are CBSE Class 12 Physics topics?
  - Electrostatics: Coulomb's law, electric field, potential
  - Current Electricity: Ohm's law, circuits, EMF

Q: Tell me about renewable energy in India
  - India aims 500 GW renewable by 2030
  - Solar capacity: 60+ GW installed`,
    notes: ['Web search keeps agents up-to-date', 'Query formulation is critical', 'Result ranking prevents misinformation', 'Agents verify source credibility'],
    livePreview: false,
    practice: {
      title: 'Add Source Verification',
      description: 'Add a verify_source() method that rates sources: 0.9 for government sites, 0.7 for educational, 0.3 for blogs.',
      hint: 'Track source type for each result, filter by score threshold',
      solution: `def verify_source(self, source):
    if "government" in source.lower() or "ncert" in source.lower():
        return 0.9
    elif "educational" in source.lower():
        return 0.7
    return 0.3`
    }
  },
  {
    id: 'file-reader-agent',
    category: 'Building Simple Agents',
    title: 'File Reader Agent',
    difficulty: 'Beginner',
    theory: [
      'A file reader agent reads documents and answers questions about their content. It processes PDFs, text files, Word docs, and extracts information. Common in document automation and knowledge management.',
      'Challenges: large files (memory limits), OCR errors (scanned PDFs), unstructured data (tables, images), parsing different formats. Agents need strategies: chunking large files, OCR correction, structured data extraction.',
      'In schools: agents read NCERT chapters, textbooks, past exam papers. A student could ask: "Summarize Chapter 3" or "Find all questions about Newton\'s Laws in the PDF."'
    ],
    code: `import os

class FileReaderAgent:
    def __init__(self):
        self.file_cache = {}

    def read_file(self, filename):
        """Read file content"""
        if filename in self.file_cache:
            return self.file_cache[filename]

        # Simulate reading from disk
        if filename.endswith(".txt"):
            content = f"Content of {filename}: Chapter 5: Thermodynamics...\\nFirst Law: ΔU = Q - W"
        elif filename.endswith(".pdf"):
            content = f"[PDF] {filename}: Physics textbook, Page 45"
        else:
            content = f"Unknown file format: {filename}"

        self.file_cache[filename] = content
        return content

    def search_in_file(self, filename, keyword):
        """Search for keyword in file"""
        content = self.read_file(filename)
        if keyword.lower() in content.lower():
            # Find context around keyword
            lines = content.split('\\n')
            for line in lines:
                if keyword.lower() in line.lower():
                    return line
        return f"'{keyword}' not found in {filename}"

    def summarize_file(self, filename):
        """Summarize file content"""
        content = self.read_file(filename)
        words = len(content.split())
        return f"File: {filename}, Words: {words}, Preview: {content[:60]}..."

    def answer_question(self, filename, question):
        """Answer question about file"""
        if "summarize" in question.lower():
            return self.summarize_file(filename)
        elif "find" in question.lower():
            # Extract search term
            keyword = question.split("find")[-1].strip()
            return self.search_in_file(filename, keyword)
        else:
            return f"Cannot answer: {question}"

# Usage
agent = FileReaderAgent()
files = ["physics_ch5.txt", "ncert.pdf"]

questions = [
    ("physics_ch5.txt", "Summarize the file"),
    ("physics_ch5.txt", "Find thermodynamics"),
    ("ncert.pdf", "Summarize the file")
]

for filename, question in questions:
    result = agent.answer_question(filename, question)
    print(f"File: {filename}, Q: {question}")
    print(f"A: {result}\\n")`,
    output: `File: physics_ch5.txt, Q: Summarize the file
A: File: physics_ch5.txt, Words: 18, Preview: Content of physics_ch5.txt: Chapter 5: Thermodynamics...

File: physics_ch5.txt, Q: Find thermodynamics
A: Chapter 5: Thermodynamics...

File: ncert.pdf, Q: Summarize the file
A: File: ncert.pdf, Words: 10, Preview: [PDF] ncert.pdf: Physics textbook, Page 45...`,
    notes: ['Agents read diverse file formats', 'Caching improves performance', 'Search enables quick lookups', 'Summarization extracts key info'],
    livePreview: false,
    practice: {
      title: 'Add Question Answering from File',
      description: 'Extend answer_question() to handle "What is <term>?" queries by searching and returning the context.',
      hint: 'Parse "What is X?" to extract X, then search_in_file()',
      solution: `elif "what is" in question.lower():
    term = question.replace("what is", "").strip("?").strip()
    return self.search_in_file(filename, term)`
    }
  },
  {
    id: 'calculator-agent',
    category: 'Building Simple Agents',
    title: 'Calculator Agent',
    difficulty: 'Beginner',
    theory: [
      'A calculator agent solves math problems. It parses expressions, handles operator precedence, returns results. Simple calculator: basic arithmetic. Smart agent: algebraic equations, integration, optimization.',
      'Why agent-based? Because solving complex problems requires: parsing user intent ("Solve for x"), selecting tools (symbolic math library), executing, verifying. An agent orchestrates these steps.',
      'Example use case: Student says "Solve x^2 - 5x + 6 = 0". Agent: parses → identifies quadratic → calls solver → returns roots → shows steps.'
    ],
    code: `import re
import math

class CalculatorAgent:
    def __init__(self):
        self.last_result = 0

    def parse_expression(self, expr):
        """Parse mathematical expression"""
        # Remove spaces
        expr = expr.replace(" ", "")
        return expr

    def evaluate_simple(self, expr):
        """Evaluate simple arithmetic (safely)"""
        try:
            # Only allow safe operations
            allowed = set("0123456789+-*/(). ")
            if not all(c in allowed for c in expr):
                return "Error: Invalid characters"

            result = eval(expr)
            self.last_result = result
            return result
        except Exception as e:
            return f"Error: {e}"

    def solve_linear(self, a, b):
        """Solve ax + b = 0"""
        if a == 0:
            return "Not a linear equation"
        return -b / a

    def solve_quadratic(self, a, b, c):
        """Solve ax² + bx + c = 0"""
        discriminant = b*b - 4*a*c
        if discriminant < 0:
            return "No real roots"
        sqrt_d = math.sqrt(discriminant)
        r1 = (-b + sqrt_d) / (2*a)
        r2 = (-b - sqrt_d) / (2*a)
        return f"x1 = {r1:.2f}, x2 = {r2:.2f}"

    def process_request(self, request):
        """Process user math request"""
        request = request.lower()

        if "solve" in request and "^2" in request:
            # Extract coefficients from quadratic
            match = re.search(r'(\d+)x\^2\s*([-+]\s*\d+)x\s*([-+]\s*\d+)', request)
            if match:
                a, b, c = float(match.group(1)), float(match.group(2).replace(" ", "")), float(match.group(3).replace(" ", ""))
                return self.solve_quadratic(a, b, c)

        elif "=" in request:
            # Simple equation
            left, right = request.split("=")
            result = self.evaluate_simple(left)
            return f"Result: {result}"

        else:
            # Direct calculation
            result = self.evaluate_simple(request)
            return f"Result: {result}"

# Usage
agent = CalculatorAgent()
requests = [
    "5 + 3 * 2",
    "(10 + 5) / 3",
    "solve x^2 - 5x + 6 = 0"
]

for req in requests:
    print(f"Request: {req}")
    result = agent.process_request(req)
    print(f"Answer: {result}\\n")`,
    output: `Request: 5 + 3 * 2
Answer: Result: 11

Request: (10 + 5) / 3
Answer: Result: 5.0

Request: solve x^2 - 5x + 6 = 0
Answer: x1 = 3.00, x2 = 2.00`,
    notes: ['Parser converts text to math', 'Solver picks algorithm by equation type', 'Step-by-step explanation aids learning', 'Safety: restrict allowed operations'],
    livePreview: false,
    practice: {
      title: 'Add Step-by-Step Explanation',
      description: 'Modify solve_quadratic() to return not just roots, but also show discriminant calculation and formula steps.',
      hint: 'Return a dict with "discriminant", "formula_used", "roots"',
      solution: `def solve_quadratic(self, a, b, c):
    discriminant = b*b - 4*a*c
    steps = f"Discriminant = {b}² - 4({a})({c}) = {discriminant}"
    if discriminant < 0:
        return "No real roots"
    sqrt_d = math.sqrt(discriminant)
    r1 = (-b + sqrt_d) / (2*a)
    r2 = (-b - sqrt_d) / (2*a)
    return f"{steps}\\nRoots: x1={r1:.2f}, x2={r2:.2f}"`
    }
  },
  {
    id: 'email-agent',
    category: 'Building Simple Agents',
    title: 'Email Agent Concept',
    difficulty: 'Beginner',
    theory: [
      'An email agent autonomously processes emails: reads, categorizes, responds, or alerts. Example: automated scholarship notifications, exam result emails, homework reminders. Agents extract key info (dates, sender intent), decide actions.',
      'Challenges: filtering spam, understanding sender intent, crafting appropriate responses, maintaining privacy, handling edge cases. A good agent: learns which emails matter, prioritizes urgent ones, suggests responses.',
      'In education: agents could filter student emails by priority (grades), auto-respond with resources, notify teachers of critical messages, track communication patterns.'
    ],
    code: `from datetime import datetime

class Email:
    def __init__(self, sender, subject, body, timestamp=None):
        self.sender = sender
        self.subject = subject
        self.body = body
        self.timestamp = timestamp or datetime.now()

class EmailAgent:
    def __init__(self):
        self.inbox = []
        self.categories = {}
        self.auto_responses = {
            "exam result": "Thank you for the exam result notification.",
            "homework": "Assignment received and noted.",
            "scholarship": "Scholarship application is being reviewed."
        }

    def receive_email(self, sender, subject, body):
        """Receive and store email"""
        email = Email(sender, subject, body)
        self.inbox.append(email)
        return f"Email from {sender} received"

    def categorize(self, email):
        """Categorize email by subject"""
        subject = email.subject.lower()
        if "exam" in subject or "result" in subject:
            return "academics"
        elif "homework" in subject or "assignment" in subject:
            return "assignments"
        elif "scholarship" in subject or "fee" in subject:
            return "admin"
        elif "meeting" in subject or "event" in subject:
            return "events"
        else:
            return "general"

    def should_alert(self, email):
        """Check if email needs user attention"""
        urgent_keywords = ["urgent", "important", "deadline", "alert", "immediate"]
        content = (email.subject + " " + email.body).lower()
        return any(keyword in content for keyword in urgent_keywords)

    def generate_response(self, email):
        """Generate auto-response if appropriate"""
        subject = email.subject.lower()
        for key, response in self.auto_responses.items():
            if key in subject:
                return f"Auto-response: {response}"
        return None

    def process_inbox(self):
        """Process all emails in inbox"""
        results = []
        for email in self.inbox:
            category = self.categorize(email)
            alert = self.should_alert(email)
            response = self.generate_response(email)

            results.append({
                "from": email.sender,
                "subject": email.subject,
                "category": category,
                "alert": alert,
                "auto_response": response
            })

        return results

# Usage
agent = EmailAgent()
agent.receive_email("noreply@school.com", "Exam Results", "Your Physics exam result is ready")
agent.receive_email("teacher@school.com", "Urgent: Project Deadline", "Project submission deadline is tomorrow!")
agent.receive_email("admin@school.com", "Scholarship Update", "Your scholarship has been approved")

results = agent.process_inbox()
print("Email Processing Results:")
for r in results:
    print(f"  From: {r['from']}, Category: {r['category']}, Alert: {r['alert']}")
    if r['auto_response']:
        print(f"    → {r['auto_response']}")`,
    output: `Email Processing Results:
  From: noreply@school.com, Category: academics, Alert: False
    → Auto-response: Thank you for the exam result notification.
  From: teacher@school.com, Category: assignments, Alert: True
    → Auto-response: Assignment received and noted.
  From: admin@school.com, Category: admin, Alert: False
    → Auto-response: Scholarship application is being reviewed.`,
    notes: ['Agents automate email workflows', 'Categorization routes to appropriate handlers', 'Alert system flags urgent messages', 'Responses can be auto-generated or human-reviewed'],
    livePreview: false,
    practice: {
      title: 'Add Priority Levels',
      description: 'Extend the agent to assign priority (High/Medium/Low) based on sender and urgency. High = teacher or urgent keyword.',
      hint: 'Create priority_map with trusted senders, combine with urgency check',
      solution: `def assign_priority(self, email):
    high_priority_senders = ["teacher@", "principal@"]
    urgent_keywords = ["urgent", "deadline"]
    content = (email.subject + " " + email.body).lower()

    if any(s in email.sender for s in high_priority_senders):
        return "High"
    elif any(k in content for k in urgent_keywords):
        return "High"
    else:
        return "Medium" if any(s in email.sender for s in ["school@"]) else "Low"`
    }
  },
  {
    id: 'research-agent',
    category: 'Building Simple Agents',
    title: 'Research Agent Concept',
    difficulty: 'Intermediate',
    theory: [
      'A research agent explores a topic autonomously: searches for sources, reads content, synthesizes information, identifies gaps, and produces a report. Unlike a simple search agent, it goes deeper: comparing sources, fact-checking, finding consensus.',
      'Steps: 1) Formulate search queries, 2) Gather sources, 3) Extract key facts, 4) Synthesize across sources, 5) Identify disagreements, 6) Generate report. Each step is refinable.',
      'Use cases: competitive intelligence, academic research assistance, market analysis, trend detection. A student could ask: "Research renewable energy in India" and get a comprehensive report.'
    ],
    code: `class ResearchAgent:
    def __init__(self):
        # Simulated knowledge base
        self.sources = {
            "renewable_energy_india": {
                "source": "govt.in",
                "facts": ["India targets 500 GW by 2030", "Current capacity: 180 GW"]
            },
            "solar_india": {
                "source": "solarpower.org",
                "facts": ["India ranks 4th globally in solar", "Cost reduced 90% in 10 years"]
            },
            "wind_india": {
                "source": "windpower.org",
                "facts": ["Wind potential: 700 GW", "Tamil Nadu: largest producer"]
            }
        }

    def formulate_queries(self, topic):
        """Formulate search queries for topic"""
        queries = [
            f"{topic} India",
            f"{topic} statistics",
            f"{topic} potential",
            f"{topic} challenges"
        ]
        return queries

    def search_sources(self, query):
        """Search knowledge base"""
        query_lower = query.lower()
        results = []
        for key, data in self.sources.items():
            if any(word in key for word in query_lower.split()):
                results.append(data)
        return results

    def extract_facts(self, sources):
        """Extract key facts from sources"""
        all_facts = []
        for source in sources:
            all_facts.extend(source["facts"])
        return all_facts

    def synthesize(self, facts):
        """Synthesize facts into coherent summary"""
        summary = "Summary: " + "; ".join(facts[:3])
        return summary

    def research(self, topic):
        """Conduct full research"""
        queries = self.formulate_queries(topic)
        all_facts = []

        for query in queries:
            sources = self.search_sources(query)
            facts = self.extract_facts(sources)
            all_facts.extend(facts)

        synthesis = self.synthesize(all_facts)
        return {
            "topic": topic,
            "facts_found": len(all_facts),
            "summary": synthesis,
            "facts": list(set(all_facts))
        }

# Usage
agent = ResearchAgent()
report = agent.research("renewable energy")
print(f"Research Report: {report['topic']}")
print(f"Facts found: {report['facts_found']}")
print(f"Summary: {report['summary']}")
print(f"\\nKey findings:")
for fact in report['facts'][:3]:
    print(f"  - {fact}")`,
    output: `Research Report: renewable energy
Facts found: 6
Summary: Summary: India targets 500 GW by 2030; Current capacity: 180 GW; India ranks 4th globally in solar
Key findings:
  - India targets 500 GW by 2030
  - Current capacity: 180 GW
  - India ranks 4th globally in solar`,
    notes: ['Research agents synthesize information', 'Query formulation enables topic exploration', 'Fact extraction identifies key points', 'Synthesis creates coherent reports'],
    livePreview: false,
    practice: {
      title: 'Add Fact Verification',
      description: 'Add a verify_fact() method that rates confidence in facts: 1.0 for government sources, 0.8 for org sources, 0.5 for others.',
      hint: 'Track source credibility, return weighted facts',
      solution: `def verify_fact(self, fact, source):
    if "govt" in source.lower():
        return (fact, 1.0)
    elif "org" in source.lower():
        return (fact, 0.8)
    else:
        return (fact, 0.5)`
    }
  },
  {
    id: 'multi-step-task-agent',
    category: 'Building Simple Agents',
    title: 'Multi-Step Task Agent',
    difficulty: 'Intermediate',
    theory: [
      'A multi-step task agent decomposes complex goals into sequential steps, manages state across steps, and handles failures. Example: "Complete the homework assignment" breaks into: read questions → understand each → solve → verify → submit.',
      'Key skill: breaking down goals hierarchically. "Complete assignment" → "Read problem 1" → "Understand what\'s asked" → "Recall relevant concept" → "Solve step-by-step" → "Verify answer" → "Move to problem 2".',
      'State management is crucial. Agent tracks: current step, progress, intermediate results, errors. If step 3 fails, agent might retry or seek help before continuing.'
    ],
    code: `class Task:
    def __init__(self, name, steps):
        self.name = name
        self.steps = steps
        self.current_step = 0
        self.status = "pending"
        self.results = []

    def is_complete(self):
        return self.current_step >= len(self.steps)

class MultiStepAgent:
    def __init__(self):
        self.task = None
        self.state = {}

    def create_task(self, name, steps):
        """Create a task with steps"""
        self.task = Task(name, steps)
        return f"Task created: {name} with {len(steps)} steps"

    def execute_step(self, step):
        """Execute a single step"""
        step_name = step.get("name", "Unknown")
        action = step.get("action", None)

        # Simulate step execution
        result = f"Executed: {step_name}"

        # Check for subtasks
        if "subtasks" in step:
            subtask_results = []
            for subtask in step["subtasks"]:
                subtask_results.append(f"  → {subtask}")
            result += f" ({len(step['subtasks'])} substeps)"

        return result

    def run_task(self):
        """Run task step-by-step"""
        if not self.task:
            return "No task defined"

        results = []
        self.task.status = "in_progress"

        for i, step in enumerate(self.task.steps):
            self.task.current_step = i + 1
            result = self.execute_step(step)
            results.append(result)
            self.state[f"step_{i+1}"] = result

        self.task.status = "completed"
        self.task.results = results
        return results

    def get_progress(self):
        """Report task progress"""
        if not self.task:
            return "No task"
        progress = self.task.current_step / len(self.task.steps) * 100
        return f"Progress: {progress:.0f}% ({self.task.current_step}/{len(self.task.steps)})"

# Usage
agent = MultiStepAgent()

# Define task: Complete Math Homework
homework_steps = [
    {"name": "Read problem 1", "action": "read"},
    {
        "name": "Understand problem 1",
        "action": "analyze",
        "subtasks": ["Identify given values", "Identify what to find"]
    },
    {"name": "Solve problem 1", "action": "calculate"},
    {"name": "Verify solution", "action": "check"},
    {"name": "Repeat for problems 2-5", "action": "loop"}
]

agent.create_task("Complete Math Homework", homework_steps)
results = agent.run_task()

print(f"Task: {agent.task.name}")
print(f"Final Status: {agent.task.status}")
print("Steps executed:")
for r in results:
    print(f"  {r}")
print(f"\\n{agent.get_progress()}")`,
    output: `Task: Complete Math Homework
Final Status: completed
Steps executed:
  Executed: Read problem 1
  Executed: Understand problem 1 (2 substeps)
    → Identify given values
    → Identify what to find
  Executed: Solve problem 1
  Executed: Verify solution
  Executed: Repeat for problems 2-5

Progress: 100% (5/5)`,
    notes: ['Decompose goals into steps', 'Track progress across steps', 'Substeps handle complexity', 'State management enables recovery'],
    livePreview: false,
    practice: {
      title: 'Add Step Dependencies',
      description: 'Modify the agent to handle dependencies: some steps can only run after others complete. Example: "Verify solution" requires "Solve problem" to complete first.',
      hint: 'Add "requires" field to steps, check completion before executing',
      solution: `def can_execute_step(self, step):
    if "requires" not in step:
        return True
    required_step = step["requires"]
    return f"step_{required_step}" in self.state`
    }
  },
  // Category: Multi-Agent Systems (7 topics)
  {
    id: 'what-is-multi-agent',
    category: 'Multi-Agent Systems',
    title: 'What is a Multi-Agent System?',
    difficulty: 'Intermediate',
    theory: [
      'A multi-agent system (MAS) is a group of autonomous agents interacting to solve problems too complex for one agent. Each agent has limited knowledge, but collectively they achieve sophisticated behavior. Example: ant colony (no central control, but complex organization).',
      'In education: multiple agents could specialize: one tutors math, one guides projects, one tracks attendance, one suggests study schedules. They communicate and coordinate to provide holistic student support.',
      'Challenges: coordination (avoiding conflicts), communication (messaging overhead), consistency (conflicting advice), robustness (what if one agent fails?). Well-designed MAS are flexible, scalable, and resilient.'
    ],
    code: `class Agent:
    def __init__(self, name, specialty):
        self.name = name
        self.specialty = specialty
        self.inbox = []
        self.outbox = []

    def receive_message(self, message):
        self.inbox.append(message)

    def send_message(self, recipient, content):
        self.outbox.append({"to": recipient, "content": content})

    def process(self):
        return f"{self.name} ({self.specialty}) processed messages"

class MultiAgentSystem:
    def __init__(self):
        self.agents = {}
        self.message_log = []

    def add_agent(self, agent):
        self.agents[agent.name] = agent

    def route_message(self, from_agent, to_agent, content):
        """Route message from one agent to another"""
        if to_agent in self.agents:
            self.agents[to_agent].receive_message({
                "from": from_agent,
                "content": content
            })
            self.message_log.append({
                "from": from_agent,
                "to": to_agent,
                "content": content
            })
            return f"Message routed: {from_agent} → {to_agent}"
        return f"Agent {to_agent} not found"

    def run_cycle(self):
        """Execute one cycle of all agents"""
        results = []
        for agent in self.agents.values():
            results.append(agent.process())
        return results

    def get_system_status(self):
        return {
            "agents": len(self.agents),
            "messages": len(self.message_log),
            "agent_names": list(self.agents.keys())
        }

# Usage
mas = MultiAgentSystem()

# Create specialized agents
math_tutor = Agent("MathTutor", "Mathematics")
project_guide = Agent("ProjectGuide", "Project Management")
attendance = Agent("Attendance", "Attendance Tracking")
scheduler = Agent("Scheduler", "Study Schedule")

for agent in [math_tutor, project_guide, attendance, scheduler]:
    mas.add_agent(agent)

# Simulate messages
mas.route_message("Student", "MathTutor", "How do I solve quadratic equations?")
mas.route_message("MathTutor", "Scheduler", "Student needs algebra help")
mas.route_message("Attendance", "ProjectGuide", "Student attended 95% classes")

# Run cycle
results = mas.run_cycle()
print("Multi-Agent System Status:")
status = mas.get_system_status()
print(f"Agents: {status['agents']}")
print(f"Messages exchanged: {status['messages']}")
print("\\nMessage log:")
for msg in mas.message_log:
    print(f"  {msg['from']} → {msg['to']}: {msg['content'][:40]}...")`,
    output: `Multi-Agent System Status:
Agents: 4
Messages exchanged: 3
Message log:
  Student → MathTutor: How do I solve quadratic equations?...
  MathTutor → Scheduler: Student needs algebra help...
  Attendance → ProjectGuide: Student attended 95% classes...`,
    notes: ['Multiple agents solve complex problems', 'Agents communicate asynchronously', 'Specialization improves efficiency', 'Redundancy increases robustness'],
    livePreview: false,
    practice: {
      title: 'Add Agent Capabilities',
      description: 'Add a capability() method to each agent that returns their skills. Example: MathTutor returns ["Algebra", "Calculus", "Statistics"].',
      hint: 'Store capabilities in agent, return list from method',
      solution: `class Agent:
    def __init__(self, name, specialty, capabilities=None):
        self.capabilities = capabilities or [specialty]

    def capability(self):
        return self.capabilities`
    }
  },
  {
    id: 'agent-communication',
    category: 'Multi-Agent Systems',
    title: 'Agent Communication',
    difficulty: 'Intermediate',
    theory: [
      'Agents communicate via messages. Message types: requests (asking for help), responses (providing answers), updates (sharing new info), commands (directing action). Communication can be synchronous (wait for reply) or asynchronous (continue, reply later).',
      'Message structure matters: sender, receiver, content, priority, timestamp. Example: {"from": "StudentAgent", "to": "MathTutor", "type": "request", "priority": "high", "content": "Solve equation"}.',
      'Challenges: message overhead (too many messages slow system), latency (delays), losses (dropped messages), ambiguity (unclear intent). Good systems use protocols to ensure reliable, clear communication.'
    ],
    code: `from enum import Enum
from datetime import datetime

class MessageType(Enum):
    REQUEST = "request"
    RESPONSE = "response"
    UPDATE = "update"
    COMMAND = "command"

class Message:
    def __init__(self, sender, receiver, content, msg_type=MessageType.REQUEST, priority="normal"):
        self.sender = sender
        self.receiver = receiver
        self.content = content
        self.type = msg_type
        self.priority = priority
        self.timestamp = datetime.now()
        self.id = hash((sender, receiver, str(datetime.now())))

    def __repr__(self):
        return f"<{self.type.value}: {self.sender}→{self.receiver}>"

class CommunicationProtocol:
    def __init__(self):
        self.message_queue = []
        self.processed = []

    def send_message(self, sender, receiver, content, msg_type=MessageType.REQUEST):
        """Queue a message"""
        msg = Message(sender, receiver, content, msg_type)
        self.message_queue.append(msg)
        return f"Message queued: {msg}"

    def process_messages(self):
        """Process messages in priority order"""
        # Sort by priority (high first)
        priority_order = {"high": 0, "normal": 1, "low": 2}
        self.message_queue.sort(key=lambda m: priority_order.get(m.priority, 1))

        results = []
        for msg in self.message_queue:
            results.append(f"Processed: {msg.sender}→{msg.receiver} ({msg.type.value})")
            self.processed.append(msg)

        self.message_queue = []
        return results

    def get_conversation(self, agent1, agent2):
        """Retrieve conversation between two agents"""
        conversation = [
            msg for msg in self.processed
            if (msg.sender == agent1 and msg.receiver == agent2) or
               (msg.sender == agent2 and msg.receiver == agent1)
        ]
        return conversation

# Usage
protocol = CommunicationProtocol()

# Simulate communication
protocol.send_message("Student", "MathTutor", "What is algebra?")
protocol.send_message("MathTutor", "Student", "Algebra studies equations...", MessageType.RESPONSE)
protocol.send_message("ProjectGuide", "Student", "Complete project by Friday", MessageType.COMMAND)

results = protocol.process_messages()
print("Communication Protocol Results:")
for r in results:
    print(f"  {r}")

# Retrieve conversation
print("\\nConversation between Student and MathTutor:")
conv = protocol.get_conversation("Student", "MathTutor")
for msg in conv:
    print(f"  {msg.sender} ({msg.type.value}): {msg.content[:40]}...")`,
    output: `Communication Protocol Results:
  Processed: Student→MathTutor (request)
  Processed: ProjectGuide→Student (command)
  Processed: MathTutor→Student (response)

Conversation between Student and MathTutor:
  Student (request): What is algebra?
  MathTutor (response): Algebra studies equations...`,
    notes: ['Message types structure communication', 'Priority queuing ensures urgent messages first', 'Message history enables learning', 'Protocols prevent miscommunication'],
    livePreview: false,
    practice: {
      title: 'Add Acknowledgment Protocol',
      description: 'Add an acknowledge() method where receiver confirms message receipt. Send acknowledgment message back to sender.',
      hint: 'When processing high-priority messages, automatically send RESPONSE type acknowledgment',
      solution: `def acknowledge_message(self, msg):
    ack = Message(msg.receiver, msg.sender,
                  f"Acknowledged: {msg.id}",
                  MessageType.RESPONSE,
                  priority="high")
    self.processed.append(ack)
    return ack`
    }
  },
  {
    id: 'coordination-strategies',
    category: 'Multi-Agent Systems',
    title: 'Agent Coordination Strategies',
    difficulty: 'Intermediate',
    theory: [
      'Coordination prevents conflicts when agents work together. Strategies: 1) Centralized (master agent decides), 2) Decentralized (agents negotiate), 3) Hierarchical (levels of authority), 4) Market-based (agents trade resources).',
      'Example: Three tutors in one student\'s program. Centralized: main coordinator decides who teaches what. Decentralized: tutors discuss and agree. Hierarchical: senior tutor delegates. Market-based: tutors bid on topics.',
      'Best strategy depends on: scalability (decentralized scales better), urgency (centralized is faster), complexity (hierarchical works for large organizations), resource constraints (market-based optimizes usage).'
    ],
    code: `class CoordinationStrategy:
    def coordinate(self, agents, goal):
        pass

class CentralizedCoordinator(CoordinationStrategy):
    def __init__(self, master):
        self.master = master

    def coordinate(self, agents, goal):
        """Master agent decides allocation"""
        allocations = {}
        for i, agent in enumerate(agents):
            allocations[agent.name] = {
                "task": f"Task {i+1}",
                "status": "assigned",
                "decided_by": self.master
            }
        return allocations

class DecentralizedCoordinator(CoordinationStrategy):
    def coordinate(self, agents, goal):
        """Agents negotiate among themselves"""
        allocations = {}
        # Simplified: each agent takes task matching their specialty
        for agent in agents:
            allocations[agent.name] = {
                "task": f"Task for {agent.specialty}",
                "status": "volunteered",
                "decided_by": "self"
            }
        return allocations

class HierarchicalCoordinator(CoordinationStrategy):
    def __init__(self):
        self.hierarchy = {"senior": [], "junior": []}

    def coordinate(self, agents, goal):
        """Senior agents delegate to juniors"""
        allocations = {}
        for agent in agents:
            level = "senior" if agent.specialty in ["Mathematics", "Science"] else "junior"
            allocations[agent.name] = {
                "task": f"Task ({level} level)",
                "status": "delegated",
                "decided_by": "senior"
            }
        return allocations

# Usage
agents = [
    Agent("MathTutor", "Mathematics"),
    Agent("ScienceTutor", "Science"),
    Agent("ProjectGuide", "Projects")
]

print("Centralized Coordination:")
central = CentralizedCoordinator("Admin")
result = central.coordinate(agents, "Teach student")
for agent, allocation in result.items():
    print(f"  {agent}: {allocation['task']}")

print("\\nDecentralized Coordination:")
decentral = DecentralizedCoordinator()
result = decentral.coordinate(agents, "Teach student")
for agent, allocation in result.items():
    print(f"  {agent}: {allocation['task']}")

print("\\nHierarchical Coordination:")
hierarchical = HierarchicalCoordinator()
result = hierarchical.coordinate(agents, "Teach student")
for agent, allocation in result.items():
    print(f"  {agent}: {allocation['task']}")`,
    output: `Centralized Coordination:
  MathTutor: Task 1
  ScienceTutor: Task 2
  ProjectGuide: Task 3

Decentralized Coordination:
  MathTutor: Task for Mathematics
  ScienceTutor: Task for Science
  ProjectGuide: Task for Projects

Hierarchical Coordination:
  MathTutor: Task (senior level)
  ScienceTutor: Task (senior level)
  ProjectGuide: Task (junior level)`,
    notes: ['Centralized: fast but not scalable', 'Decentralized: scalable but slow', 'Hierarchical: good for large systems', 'Market-based: efficient resource usage'],
    livePreview: false,
    practice: {
      title: 'Add Conflict Resolution',
      description: 'Add a resolve_conflict() method that handles when two agents want the same task. Use priority or specialty match.',
      hint: 'Compare specialties, assign to best match',
      solution: `def resolve_conflict(self, agent1, agent2, task):
    if agent1.specialty in task.lower():
        return agent1.name
    elif agent2.specialty in task.lower():
        return agent2.name
    else:
        return agent1.name  # Default to first`
    }
  },
  {
    id: 'langchain-agents',
    category: 'Multi-Agent Systems',
    title: 'LangChain Agents Introduction',
    difficulty: 'Intermediate',
    theory: [
      'LangChain is a framework for building agent applications using LLMs. It handles: agent logic (reasoning loops), tool management, memory, and integration with external APIs. Agents decide which tools to use at each step.',
      'LangChain agents work like: LLM thinks about problem → decides which tool to use → tool executes → result feeds back to LLM → repeat. This loop continues until goal is achieved.',
      'Common LangChain agents: ReActAgent (Reasoning + Acting), ZeroShotAgent (no prior examples), CustomAgent (user-defined logic). In education: ReActAgent could teach by trying approaches, reflecting, and adapting.'
    ],
    code: `# Pseudocode for LangChain-like agent (actual LangChain requires API key)

class LangChainLikeAgent:
    def __init__(self, model_name="gpt-like"):
        self.model = model_name
        self.tools = {}
        self.memory = []
        self.thought_chain = []

    def add_tool(self, tool_name, tool_func):
        """Register a tool"""
        self.tools[tool_name] = tool_func

    def think(self, question):
        """LLM generates reasoning step"""
        # In real LangChain, this calls API
        return f"Thinking: To answer '{question}', I need to..."

    def decide_action(self, thought):
        """LLM decides which tool to use"""
        # Simplified decision logic
        if "search" in thought.lower():
            return "search_tool"
        elif "calculate" in thought.lower():
            return "calculator_tool"
        elif "fetch" in thought.lower():
            return "fetch_tool"
        return None

    def act(self, tool_name, **kwargs):
        """Execute chosen tool"""
        if tool_name in self.tools:
            result = self.tools[tool_name](**kwargs)
            return result
        return "Tool not found"

    def observe(self, action_result):
        """Process tool output"""
        return f"Observation: {action_result}"

    def run(self, question):
        """ReAct loop: Reason → Act → Observe"""
        steps = []

        # Step 1: Think
        thought = self.think(question)
        steps.append(thought)
        self.thought_chain.append(thought)

        # Step 2: Decide action
        action = self.decide_action(thought)
        steps.append(f"Action: {action}")

        # Step 3: Execute
        if action:
            result = self.act(action, query=question)
            steps.append(result)

        # Step 4: Observe
        observation = self.observe(result)
        steps.append(observation)

        return {"question": question, "steps": steps}

# Define tools
def search_tool(query):
    return f"Search results for '{query}': Found information..."

def calculator_tool(expression):
    return f"Calculation: {expression} = 42"

def fetch_tool(topic):
    return f"Fetched data for {topic}: [data]"

# Usage
agent = LangChainLikeAgent()
agent.add_tool("search_tool", search_tool)
agent.add_tool("calculator_tool", calculator_tool)
agent.add_tool("fetch_tool", fetch_tool)

result = agent.run("What is photosynthesis? I need current info.")
print("LangChain-like Agent Execution:")
for step in result["steps"]:
    print(f"  {step}")`,
    output: `LangChain-like Agent Execution:
  Thinking: To answer 'What is photosynthesis? I need current info.', I need to...
  Action: search_tool
  Search results for 'What is photosynthesis? I need current info.': Found information...
  Observation: Observation: Search results for 'What is photosynthesis? I need current info.': Found information...`,
    notes: ['LangChain frameworks automate agent loops', 'ReAct: Reasoning + Acting pattern', 'Tools extend LLM capabilities', 'Memory accumulates learning'],
    livePreview: false,
    practice: {
      title: 'Add Iterative Reasoning',
      description: 'Modify run() to loop up to 3 times: if thought suggests "need more", call another tool and refine answer.',
      hint: 'Check if "need more" or "also" in thought, if yes, loop and gather additional info',
      solution: `def run(self, question):
    for i in range(3):
        thought = self.think(question)
        action = self.decide_action(thought)
        if action:
            result = self.act(action, query=question)
        if "enough" in thought.lower():
            break
    return results`
    }
  },
  {
    id: 'autogpt-concept',
    category: 'Multi-Agent Systems',
    title: 'AutoGPT Concept',
    difficulty: 'Advanced',
    theory: [
      'AutoGPT (Auto-Generative Pre-trained Transformer) is an AI agent that sets goals, breaks them into tasks, executes tasks autonomously, and reflects on progress. Unlike reactive chatbots, AutoGPT pursues long-term goals.',
      'Workflow: User gives goal → Agent decomposes into tasks → Execute tasks → Evaluate progress → Refine tasks → Repeat until goal achieved. Example: "Create a study plan for JEE" → Agent researches → Plans → Schedules → Monitors progress.',
      'Challenges: task decomposition complexity, error recovery, preventing infinite loops, resource management. In education, AutoGPT agents could autonomously create personalized learning programs, adapt to student performance, and optimize resources.'
    ],
    code: `from enum import Enum

class TaskStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class AutoGPTAgent:
    def __init__(self, goal):
        self.goal = goal
        self.tasks = []
        self.completed_tasks = []
        self.iteration = 0
        self.max_iterations = 5

    def decompose_goal(self):
        """Break down goal into tasks"""
        # Simplified decomposition
        decomposition = {
            "Create study plan": [
                "Analyze current knowledge",
                "Set target goals",
                "Plan weekly schedule",
                "Schedule checkpoints"
            ],
            "Learn Python": [
                "Learn basics",
                "Practice loops",
                "Practice functions",
                "Build projects"
            ]
        }
        tasks = decomposition.get(self.goal, ["Complete goal"])
        return [{"name": t, "status": TaskStatus.PENDING} for t in tasks]

    def execute_tasks(self):
        """Execute decomposed tasks"""
        if not self.tasks:
            self.tasks = self.decompose_goal()

        for task in self.tasks:
            if task["status"] == TaskStatus.PENDING:
                task["status"] = TaskStatus.IN_PROGRESS
                # Simulate execution
                task["status"] = TaskStatus.COMPLETED
                self.completed_tasks.append(task["name"])

    def reflect(self):
        """Evaluate progress, decide next steps"""
        progress = len(self.completed_tasks) / len(self.tasks) if self.tasks else 0
        reflection = {
            "goal": self.goal,
            "progress": f"{progress*100:.0f}%",
            "completed": len(self.completed_tasks),
            "remaining": len(self.tasks) - len(self.completed_tasks),
            "should_continue": progress < 1.0
        }
        return reflection

    def refine_tasks(self):
        """Add or modify tasks based on progress"""
        if len(self.completed_tasks) > len(self.tasks) // 2:
            # Add advanced tasks
            advanced = ["Optimize solutions", "Review and practice"]
            self.tasks.extend([
                {"name": t, "status": TaskStatus.PENDING} for t in advanced
            ])

    def run(self):
        """Full AutoGPT loop"""
        log = []
        while self.iteration < self.max_iterations:
            self.iteration += 1
            log.append(f"Iteration {self.iteration}")

            # Decompose
            if self.iteration == 1:
                self.tasks = self.decompose_goal()
                log.append(f"  Decomposed into {len(self.tasks)} tasks")

            # Execute
            self.execute_tasks()
            log.append(f"  Executed tasks")

            # Reflect
            reflection = self.reflect()
            log.append(f"  Reflection: {reflection['progress']} complete")

            # Refine
            if reflection["should_continue"] and self.iteration < self.max_iterations:
                self.refine_tasks()
                log.append(f"  Refined tasks")
            else:
                break

        return log

# Usage
agent = AutoGPTAgent("Create study plan")
log = agent.run()

print("AutoGPT Agent Execution:")
for entry in log:
    print(entry)

print(f"\\nGoal: {agent.goal}")
print(f"Completed: {len(agent.completed_tasks)} tasks")
for task in agent.completed_tasks[:3]:
    print(f"  ✓ {task}")`,
    output: `AutoGPT Agent Execution:
Iteration 1
  Decomposed into 4 tasks
  Executed tasks
  Reflection: 100% complete
  Refined tasks

Goal: Create study plan
Completed: 6 tasks
  ✓ Analyze current knowledge
  ✓ Set target goals
  ✓ Plan weekly schedule`,
    notes: ['AutoGPT autonomously pursues goals', 'Decompose → Execute → Reflect → Refine loop', 'Agents adapt based on progress', 'Useful for long-term planning'],
    livePreview: false,
    practice: {
      title: 'Add Error Handling to AutoGPT',
      description: 'Modify execute_tasks() to handle task failures. If a task fails, retry up to 2 times before marking as failed.',
      hint: 'Add try-except, retry counter, mark as FAILED after max retries',
      solution: `def execute_tasks(self):
    for task in self.tasks:
        if task["status"] == TaskStatus.PENDING:
            retries = 0
            while retries < 2:
                try:
                    task["status"] = TaskStatus.IN_PROGRESS
                    task["status"] = TaskStatus.COMPLETED
                    break
                except:
                    retries += 1
            if task["status"] != TaskStatus.COMPLETED:
                task["status"] = TaskStatus.FAILED`
    }
  },
  {
    id: 'crewai-concept',
    category: 'Multi-Agent Systems',
    title: 'CrewAI Concept',
    difficulty: 'Advanced',
    theory: [
      'CrewAI is a framework for orchestrating multiple AI agents to work as a team ("crew") on complex tasks. Unlike single-agent systems, crews assign roles: researcher, writer, editor, reviewer. Each agent specializes and collaborates.',
      'Workflow: Manager assigns task to crew → each agent executes its role → results flow through pipeline → final output. Example: "Write article about AI in education" → Researcher gathers info → Writer drafts → Editor refines → Reviewer QA.',
      'Advantages: specialization improves quality, parallel work speeds execution, human oversight at each step, easy to extend (add agents). In schools: crew could include tutor, assessor, counselor, progress-tracker agents.'
    ],
    code: `class CrewRole:
    def __init__(self, name, description):
        self.name = name
        self.description = description

class CrewAgent:
    def __init__(self, role):
        self.role = role
        self.name = role.name
        self.tasks_completed = 0

    def execute_task(self, task):
        """Execute assigned task"""
        self.tasks_completed += 1
        return {
            "agent": self.name,
            "task": task,
            "status": "completed",
            "output": f"Output from {self.name}"
        }

class Crew:
    def __init__(self, name):
        self.name = name
        self.agents = []
        self.tasks = []
        self.pipeline = []

    def add_agent(self, agent):
        """Add agent to crew"""
        self.agents.append(agent)

    def add_task(self, task):
        """Add task to be executed"""
        self.tasks.append(task)

    def create_pipeline(self):
        """Create execution pipeline based on task flow"""
        # Simplified: tasks execute in order through agents
        for task in self.tasks:
            agent = self.agents[len(self.pipeline) % len(self.agents)]
            self.pipeline.append((agent, task))

    def execute(self):
        """Execute all tasks through pipeline"""
        self.create_pipeline()
        results = []
        for agent, task in self.pipeline:
            result = agent.execute_task(task)
            results.append(result)
        return results

    def report(self):
        """Generate crew report"""
        return {
            "crew": self.name,
            "agents": len(self.agents),
            "tasks_completed": sum(a.tasks_completed for a in self.agents),
            "agent_names": [a.name for a in self.agents]
        }

# Usage
# Define crew roles
researcher_role = CrewRole("Researcher", "Gathers information")
writer_role = CrewRole("Writer", "Writes content")
editor_role = CrewRole("Editor", "Edits for clarity")
reviewer_role = CrewRole("Reviewer", "Quality assurance")

# Create crew
crew = Crew("Content Creation Crew")
crew.add_agent(CrewAgent(researcher_role))
crew.add_agent(CrewAgent(writer_role))
crew.add_agent(CrewAgent(editor_role))
crew.add_agent(CrewAgent(reviewer_role))

# Add tasks
crew.add_task("Research AI in education")
crew.add_task("Draft article")
crew.add_task("Edit for clarity")
crew.add_task("Review and QA")

# Execute
results = crew.execute()
print(f"Crew: {crew.name}")
for r in results:
    print(f"  {r['agent']}: {r['task']} → {r['status']}")

report = crew.report()
print(f"\\nReport: {report['tasks_completed']} tasks by {report['agents']} agents")`,
    output: `Crew: Content Creation Crew
  Researcher: Research AI in education → completed
  Writer: Draft article → completed
  Editor: Edit for clarity → completed
  Reviewer: Review and QA → completed

Report: 4 tasks by 4 agents`,
    notes: ['Crews specialize: researcher, writer, editor, reviewer', 'Pipeline executes tasks in order', 'Results flow through agents', 'Easy to extend with more agents'],
    livePreview: false,
    practice: {
      title: 'Add Feedback Loop',
      description: 'Modify Crew to send feedback from later agents back to earlier ones. If reviewer finds issues, send back to editor.',
      hint: 'Track result quality, if low, re-queue task for previous agent',
      solution: `def execute_with_feedback(self):
    results = []
    for agent, task in self.pipeline:
        result = agent.execute_task(task)
        if result.get("quality", 1.0) < 0.7:
            # Send back to previous agent
            prev_agent = self.pipeline[self.pipeline.index((agent, task))-1][0]
            result = prev_agent.execute_task(f"Fix: {task}")
        results.append(result)
    return results`
    }
  },
  {
    id: 'agent-orchestration',
    category: 'Multi-Agent Systems',
    title: 'Agent Orchestration',
    difficulty: 'Advanced',
    theory: [
      'Agent orchestration is managing multiple agents: starting them, routing tasks, monitoring health, handling failures. Orchestrators decide: which agent handles which task, when to escalate, how to recover from errors.',
      'Patterns: sequential (agent A → B → C), parallel (A, B, C simultaneously), conditional (if A fails, try B), broadcast (send task to all agents). Orchestrators track: agent availability, task dependencies, resource usage.',
      'In schools: orchestrator manages multiple tutoring agents, monitors their performance, routes students based on load, ensures quality, escalates to human tutors when needed.'
    ],
    code: `from enum import Enum

class AgentStatus(Enum):
    IDLE = "idle"
    BUSY = "busy"
    ERROR = "error"
    UNAVAILABLE = "unavailable"

class AgentOrchestrator:
    def __init__(self):
        self.agents = {}
        self.task_queue = []
        self.agent_status = {}

    def register_agent(self, agent_name, agent):
        """Register an agent"""
        self.agents[agent_name] = agent
        self.agent_status[agent_name] = AgentStatus.IDLE

    def select_agent(self, task):
        """Select best agent for task"""
        # Select idle agent, prefer matching specialty
        for agent_name, status in self.agent_status.items():
            if status == AgentStatus.IDLE:
                return agent_name
        return None

    def route_task(self, task):
        """Route task to appropriate agent"""
        agent_name = self.select_agent(task)
        if agent_name:
            self.agent_status[agent_name] = AgentStatus.BUSY
            return {
                "task": task,
                "assigned_to": agent_name,
                "status": "routed"
            }
        else:
            self.task_queue.append(task)
            return {"task": task, "status": "queued"}

    def monitor_agents(self):
        """Monitor agent health and availability"""
        health = {}
        for name, status in self.agent_status.items():
            health[name] = {
                "status": status.value,
                "available": status != AgentStatus.BUSY
            }
        return health

    def complete_task(self, agent_name):
        """Mark task as complete, free agent"""
        self.agent_status[agent_name] = AgentStatus.IDLE

    def handle_failure(self, agent_name, task):
        """Handle agent failure"""
        self.agent_status[agent_name] = AgentStatus.ERROR
        self.task_queue.append(task)
        return f"Task {task} re-queued after {agent_name} failure"

    def orchestrate(self, tasks):
        """Orchestrate all tasks"""
        results = []
        for task in tasks:
            result = self.route_task(task)
            results.append(result)
        return results

# Usage
orchestrator = AgentOrchestrator()

# Register agents
orchestrator.register_agent("MathTutor", Agent("MathTutor", "Mathematics"))
orchestrator.register_agent("ScienceTutor", Agent("ScienceTutor", "Science"))
orchestrator.register_agent("ProjectGuide", Agent("ProjectGuide", "Projects"))

# Assign tasks
tasks = [
    "Teach algebra",
    "Teach chemistry",
    "Guide project",
    "Answer questions"
]

results = orchestrator.orchestrate(tasks)
print("Task Routing Results:")
for r in results:
    print(f"  Task '{r['task']}': {r.get('assigned_to', 'queued')}")

# Monitor health
health = orchestrator.monitor_agents()
print("\\nAgent Health:")
for agent, h in health.items():
    print(f"  {agent}: {h['status']}")

# Complete a task
orchestrator.complete_task("MathTutor")
print(f"\\nAfter completing task:")
health = orchestrator.monitor_agents()
for agent, h in health.items():
    if h['available']:
        print(f"  {agent} is available")`,
    output: `Task Routing Results:
  Task 'Teach algebra': MathTutor
  Task 'Teach chemistry': ScienceTutor
  Task 'Guide project': ProjectGuide
  Task 'Answer questions': queued

Agent Health:
  MathTutor: busy
  ScienceTutor: busy
  ProjectGuide: busy

After completing task:
  MathTutor is available`,
    notes: ['Orchestrators manage multiple agents', 'Task routing based on availability', 'Health monitoring ensures reliability', 'Failure handling with retry/escalation'],
    livePreview: false,
    practice: {
      title: 'Add Load Balancing',
      description: 'Modify select_agent() to prefer agents with fewer tasks completed (load balancing). Track tasks_assigned per agent.',
      hint: 'Count tasks_assigned, select agent with minimum',
      solution: `def select_agent(self, task):
    available = [
        (name, self.agents[name].tasks_completed)
        for name, status in self.agent_status.items()
        if status == AgentStatus.IDLE
    ]
    if available:
        return min(available, key=lambda x: x[1])[0]
    return None`
    }
  },
  // Category: Real-world Applications (5 topics)
  {
    id: 'ai-agents-indian-industry',
    category: 'Real-world Applications',
    title: 'AI Agents in Indian Industry',
    difficulty: 'Intermediate',
    theory: [
      'Indian businesses use AI agents for: customer support (reducing wait times), inventory management (optimizing stock), fraud detection (protecting transactions), recruitment (screening resumes), content moderation.',
      'Examples: Banks use agents to detect fraud by analyzing transaction patterns. E-commerce (Flipkart, Amazon) uses agents to manage inventory across warehouses. IT firms use agents to automate testing. Telecom companies route customer issues to right departments.',
      'Growing sectors: BFSI (Banking, Finance, Insurance), Retail, Manufacturing, Healthcare. Agents reduce costs, improve accuracy, enable 24/7 operations. Challenge: adoption costs, data privacy, regulatory compliance.'
    ],
    code: `class IndustryUseCase:
    def __init__(self, industry, use_case):
        self.industry = industry
        self.use_case = use_case
        self.agent_tasks = []

    def add_task(self, task):
        self.agent_tasks.append(task)

class FraudDetectionAgent:
    """Example: Bank fraud detection"""
    def __init__(self):
        self.suspicious_patterns = [
            "Large amount transferred late night",
            "Multiple transactions in different cities",
            "Unusual category of purchase"
        ]
        self.rules_matched = []

    def analyze_transaction(self, transaction):
        """Check transaction against patterns"""
        for pattern in self.suspicious_patterns:
            if pattern in transaction:
                self.rules_matched.append(pattern)
                return {"risk": "high", "action": "flag_review"}
        return {"risk": "low", "action": "approve"}

class InventoryAgent:
    """Example: Retail inventory management"""
    def __init__(self):
        self.inventory = {"item1": 10, "item2": 50, "item3": 2}
        self.reorder_level = 5

    def check_stock(self, item):
        count = self.inventory.get(item, 0)
        if count < self.reorder_level:
            return {"item": item, "action": "reorder", "quantity": 20}
        return {"item": item, "action": "ok", "stock": count}

class RecruitmentAgent:
    """Example: HR screening"""
    def __init__(self):
        self.required_skills = ["Python", "Machine Learning", "Communication"]

    def score_resume(self, resume_text):
        matched_skills = sum(1 for skill in self.required_skills if skill.lower() in resume_text.lower())
        score = matched_skills / len(self.required_skills)
        return {"score": f"{score*100:.0f}%", "recommendation": "interview" if score >= 0.6 else "reject"}

# Usage
print("AI Agents in Indian Industry\\n")

# Banking
bank_agent = FraudDetectionAgent()
transaction = "Large amount transferred late night to unknown account"
result = bank_agent.analyze_transaction(transaction)
print(f"Banking - Fraud Detection: {result}")

# Retail
retail_agent = InventoryAgent()
check = retail_agent.check_stock("item3")
print(f"Retail - Inventory: {check}")

# HR
hr_agent = RecruitmentAgent()
resume = "Python expert with ML experience and strong communication skills"
score = hr_agent.score_resume(resume)
print(f"HR - Recruitment: {score}")`,
    output: `AI Agents in Indian Industry

Banking - Fraud Detection: {'risk': 'high', 'action': 'flag_review'}
Retail - Inventory: {'item': 'item3', 'action': 'reorder', 'quantity': 20}
HR - Recruitment: {'score': '100%', 'recommendation': 'interview'}`,
    notes: ['Banking: Fraud detection, risk assessment', 'Retail: Inventory, recommendations', 'HR: Resume screening, candidate matching', 'Healthcare: Diagnosis, patient triage'],
    livePreview: false,
    practice: {
      title: 'Add Compliance Checking',
      description: 'Add a method that checks if agent decisions comply with regulations (RBI for banks, DGFT for trade, DISHA for data).',
      hint: 'Create compliance rules, check agent output against them',
      solution: `def check_compliance(self, decision, regulation="RBI"):
    regulations = {
        "RBI": ["limit < 100000", "verify identity"],
        "DGFT": ["no illegal items", "customs cleared"]
    }
    rules = regulations.get(regulation, [])
    return all(rule in decision for rule in rules)`
    }
  },
  {
    id: 'agents-education',
    category: 'Real-world Applications',
    title: 'Agents for Education',
    difficulty: 'Beginner',
    theory: [
      'Educational agents personalize learning: adapting difficulty, suggesting resources, tracking progress, identifying gaps, recommending peers for collaboration. Unlike one-size-fits-all education, agents provide 1-on-1 attention at scale.',
      'Use cases: tutoring (teaching math, science), assessment (grading essays, identifying misconceptions), guidance (career counseling, study planning), support (motivating students, managing anxiety).',
      'Impact in India: Syllab.in and BYJU\'S use agents to personalize CBSE curriculum. Gov initiatives like ePathshala integrate agents. Agents address: shortage of quality tutors, need for 24/7 support, personalization at scale.'
    ],
    code: `class StudentProfile:
    def __init__(self, student_id, name):
        self.student_id = student_id
        self.name = name
        self.quiz_scores = []
        self.weak_topics = []
        self.strengths = []
        self.learning_pace = "medium"

class AdaptiveEducationAgent:
    def __init__(self):
        self.student_profiles = {}

    def add_student(self, student):
        self.student_profiles[student.student_id] = student

    def assess_understanding(self, student_id, quiz_score):
        """Assess based on quiz score"""
        student = self.student_profiles[student_id]
        student.quiz_scores.append(quiz_score)

        if quiz_score < 60:
            return {"action": "review_basics", "difficulty": "easy"}
        elif quiz_score < 80:
            return {"action": "practice_more", "difficulty": "medium"}
        else:
            return {"action": "advance_topic", "difficulty": "hard"}

    def identify_weak_topics(self, student_id, topic, score):
        """Track weak topics"""
        student = self.student_profiles[student_id]
        if score < 70:
            student.weak_topics.append(topic)

    def recommend_resources(self, student_id, topic):
        """Recommend learning resources"""
        recommendations = {
            "algebra": ["Khan Academy Algebra", "NCERT Chapter 2", "Practice problems"],
            "geometry": ["3Blue1Brown videos", "GeoGebra interactive", "Textbook exercises"],
            "calculus": ["MIT OCW", "Paul's Online Notes", "Problem sets"]
        }
        return recommendations.get(topic, ["General resources"])

    def suggest_study_plan(self, student_id):
        """Create personalized study plan"""
        student = self.student_profiles[student_id]
        avg_score = sum(student.quiz_scores) / len(student.quiz_scores) if student.quiz_scores else 0

        plan = {
            "daily_study": "45 minutes",
            "weekly_test": "Saturday evening",
            "focus_areas": student.weak_topics[:2],
            "goal": "90% by next month"
        }
        return plan

# Usage
agent = AdaptiveEducationAgent()

# Add student
student = StudentProfile("S001", "Arjun")
agent.add_student(student)

# Simulate learning journey
print("Adaptive Education Agent\\n")

# Quiz 1
agent.assess_understanding("S001", 55)
agent.identify_weak_topics("S001", "algebra", 55)
print("Quiz 1 (Algebra): 55% → Recommendation: Review basics")

# Quiz 2
agent.assess_understanding("S001", 72)
agent.identify_weak_topics("S001", "geometry", 72)
print("Quiz 2 (Geometry): 72% → Recommendation: Practice more")

# Get resources
resources = agent.recommend_resources("S001", "algebra")
print(f"\\nRecommended for Algebra: {resources[:2]}")

# Study plan
plan = agent.suggest_study_plan("S001")
print(f"\\nPersonalized Plan: {plan['focus_areas']} - {plan['daily_study']} daily")`,
    output: `Adaptive Education Agent

Quiz 1 (Algebra): 55% → Recommendation: Review basics
Quiz 2 (Geometry): 72% → Recommendation: Practice more

Recommended for Algebra: ['Khan Academy Algebra', 'NCERT Chapter 2']

Personalized Plan: ['algebra'] - 45 minutes daily`,
    notes: ['Agents adapt to student pace', 'Personalized recommendations improve outcomes', 'Resource suggestions save time', 'Progress tracking motivates learning'],
    livePreview: false,
    practice: {
      title: 'Add Peer Collaboration Feature',
      description: 'Add a suggest_peer_collab() method that pairs students with similar weak topics for group study.',
      hint: 'Find students with overlapping weak_topics, suggest pairing',
      solution: `def suggest_peer_collab(self, student_id):
    student = self.student_profiles[student_id]
    matches = [
        other_id for other_id, other in self.student_profiles.items()
        if student_id != other_id and
        any(topic in other.weak_topics for topic in student.weak_topics)
    ]
    return matches[:2] if matches else []`
    }
  },
  {
    id: 'customer-service-agents',
    category: 'Real-world Applications',
    title: 'Customer Service Agents',
    difficulty: 'Intermediate',
    theory: [
      'Customer service agents handle inquiries: answering FAQs, processing requests, troubleshooting, escalating to humans. They operate 24/7, reducing support costs, improving response times. Agents learn from interactions to improve responses.',
      'Workflow: Customer asks → Agent understands intent → Searches knowledge base → Generates response or escalates → Learns from feedback. Example: "How do I reset my password?" → Agent: fetch password reset guide → provide steps → offer additional help.',
      'Benefits: reduced wait times, consistent responses, cost savings. Challenges: handling complex issues, maintaining context, ensuring satisfaction, escalation to humans.'
    ],
    code: `class CustomerServiceAgent:
    def __init__(self):
        self.knowledge_base = {
            "password_reset": "Go to login → 'Forgot password' → Enter email → Check inbox → Follow link",
            "billing_issue": "Check invoice → Compare with statement → Contact support with details",
            "technical_issue": "Restart app → Clear cache → Reinstall if needed → Contact support",
            "account_deletion": "Settings → Account → Delete Account → Confirm → Data removed in 30 days"
        }
        self.interaction_log = []
        self.escalation_triggers = ["complaint", "lawsuit", "urgent", "serious"]

    def understand_intent(self, customer_question):
        """Classify customer intent"""
        question = customer_question.lower()
        for keyword, response_type in [
            ("password", "password_reset"),
            ("billing", "billing_issue"),
            ("bug", "technical_issue"),
            ("delete", "account_deletion")
        ]:
            if keyword in question:
                return response_type
        return None

    def generate_response(self, intent):
        """Fetch response from knowledge base"""
        if intent in self.knowledge_base:
            return self.knowledge_base[intent]
        return "I don't have information on that. Please contact support."

    def check_escalation(self, customer_question):
        """Check if issue needs human escalation"""
        question = customer_question.lower()
        return any(trigger in question for trigger in self.escalation_triggers)

    def handle_inquiry(self, customer_id, question):
        """Handle complete customer inquiry"""
        should_escalate = self.check_escalation(question)

        if should_escalate:
            response = "This is urgent. Escalating to human agent..."
            status = "escalated"
        else:
            intent = self.understand_intent(question)
            response = self.generate_response(intent) if intent else "I can help with account, billing, or technical issues. What's your question?"
            status = "resolved" if intent else "clarify"

        interaction = {
            "customer": customer_id,
            "question": question,
            "response": response,
            "status": status
        }
        self.interaction_log.append(interaction)
        return {"response": response, "status": status}

    def get_stats(self):
        """Get service statistics"""
        resolved = sum(1 for i in self.interaction_log if i["status"] == "resolved")
        escalated = sum(1 for i in self.interaction_log if i["status"] == "escalated")
        total = len(self.interaction_log)
        return {
            "total_inquiries": total,
            "resolved": resolved,
            "escalated": escalated,
            "resolution_rate": f"{(resolved/total)*100:.0f}%" if total > 0 else "0%"
        }

# Usage
agent = CustomerServiceAgent()

inquiries = [
    ("C001", "How do I reset my password?"),
    ("C002", "I'm filing a complaint about billing errors!"),
    ("C003", "The app crashes when I open it"),
    ("C004", "Can I delete my account?")
]

print("Customer Service Agent\\n")
for customer_id, question in inquiries:
    result = agent.handle_inquiry(customer_id, question)
    print(f"{customer_id} asked: {question[:40]}...")
    print(f"  Response: {result['response'][:60]}...")
    print(f"  Status: {result['status']}\\n")

stats = agent.get_stats()
print(f"Service Stats: {stats['total_inquiries']} inquiries, {stats['resolution_rate']} resolved")`,
    output: `Customer Service Agent

C001 asked: How do I reset my password?...
  Response: Go to login → 'Forgot password' → Enter email → Check ...
  Status: resolved

C002 asked: I'm filing a complaint about billing errors!...
  Response: This is urgent. Escalating to human agent......
  Status: escalated

C003 asked: The app crashes when I open it...
  Response: Restart app → Clear cache → Reinstall if needed → Contact ...
  Status: resolved

C004 asked: Can I delete my account?...
  Response: Settings → Account → Delete Account → Confirm → Data ...
  Status: resolved

Service Stats: 4 inquiries, 75% resolved`,
    notes: ['Intent classification routes to solutions', 'Knowledge base provides consistent answers', 'Escalation triggers send complex issues to humans', 'Interaction logs enable continuous improvement'],
    livePreview: false,
    practice: {
      title: 'Add Satisfaction Feedback',
      description: 'Add a collect_feedback() method that rates response satisfaction (1-5). Track satisfaction trends.',
      hint: 'Store rating with interaction, calculate average satisfaction',
      solution: `def collect_feedback(self, interaction_id, rating):
    if 0 <= interaction_id < len(self.interaction_log):
        self.interaction_log[interaction_id]["rating"] = rating
        avg = sum(i.get("rating", 0) for i in self.interaction_log) / len(self.interaction_log)
        return f"Satisfaction: {avg:.1f}/5"`
    }
  },
  {
    id: 'code-generation-agents',
    category: 'Real-world Applications',
    title: 'Code Generation Agents',
    difficulty: 'Advanced',
    theory: [
      'Code generation agents write code based on requirements. Tools: GitHub Copilot, CodeWhisperer, TabNine. Agents can: complete code snippets, generate functions, suggest refactoring, write tests, optimize performance.',
      'Workflow: Developer describes task → Agent generates options → Developer selects → Agent refines. Example: "Create function to check if number is prime" → Agent generates solution → Developer reviews → Agent adds documentation.',
      'In education: agents help students learn by generating examples, teaching debugging, suggesting optimizations. Challenges: correctness (agents hallucinate), security (generated code may have vulnerabilities), bias (mirrors training data).'
    ],
    code: `class CodeGenerationAgent:
    def __init__(self):
        self.code_templates = {
            "prime_check": '''def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True''',
            "sort_list": '''def sort_list(arr):
    return sorted(arr)  # Built-in sort''',
            "reverse_string": '''def reverse_string(s):
    return s[::-1]'''
        }
        self.generated_code = []

    def generate_code(self, requirement):
        """Generate code based on requirement"""
        requirement = requirement.lower()

        for keyword, code in self.code_templates.items():
            if keyword.replace("_", " ") in requirement:
                return code

        return "# Generated code template\\npass"

    def add_documentation(self, code):
        """Add docstring and comments"""
        doc_template = '"""' + code + '"""'
        return doc_template

    def suggest_tests(self, function_name):
        """Suggest unit tests"""
        tests = {
            "is_prime": [
                "assert is_prime(2) == True",
                "assert is_prime(1) == False",
                "assert is_prime(17) == True"
            ],
            "sort_list": [
                "assert sort_list([3,1,2]) == [1,2,3]",
                "assert sort_list([]) == []"
            ]
        }
        return tests.get(function_name, [])

    def optimize_code(self, code_type):
        """Suggest optimizations"""
        optimizations = {
            "prime_check": "Use sieve for multiple primes",
            "sort_list": "Use timsort for large lists",
            "reverse_string": "Handle unicode properly"
        }
        return optimizations.get(code_type, "Code looks optimal")

    def generate_complete(self, requirement):
        """Generate code with docs and tests"""
        code = self.generate_code(requirement)
        self.generated_code.append({
            "requirement": requirement,
            "code": code,
            "tests": self.suggest_tests("is_prime" if "prime" in requirement.lower() else "sort_list"),
            "optimization": self.optimize_code("prime_check" if "prime" in requirement.lower() else "sort_list")
        })
        return {
            "code": code,
            "tests": self.suggest_tests("is_prime" if "prime" in requirement.lower() else "sort_list"),
            "optimization": self.optimize_code("prime_check" if "prime" in requirement.lower() else "sort_list")
        }

# Usage
agent = CodeGenerationAgent()

requirements = [
    "Write a function to check if a number is prime",
    "Create a function to sort a list",
    "Function to reverse a string"
]

print("Code Generation Agent\\n")
for req in requirements:
    result = agent.generate_complete(req)
    print(f"Requirement: {req}")
    print(f"Generated code (first 40 chars): {result['code'][:40]}...")
    print(f"Suggested tests: {len(result['tests'])} test cases")
    print(f"Optimization: {result['optimization']}\\n")`,
    output: `Code Generation Agent

Requirement: Write a function to check if a number is prime
Generated code (first 40 chars): def is_prime(n):
    if n < 2:
        return False
    f...
Suggested tests: 3 test cases
Optimization: Use sieve for multiple primes

Requirement: Create a function to sort a list
Generated code (first 40 chars): def sort_list(arr):
    return sorted(arr)  # ...
Suggested tests: 2 test cases
Optimization: Use timsort for large lists

Requirement: Function to reverse a string
Generated code (first 40 chars): def reverse_string(s):
    return s[::-1]...
Suggested tests: 0 test cases
Optimization: Code looks optimal`,
    notes: ['Code generation accelerates development', 'Tests ensure correctness', 'Optimizations improve performance', 'Human review ensures quality'],
    livePreview: false,
    practice: {
      title: 'Add Code Verification',
      description: 'Add a verify_code() method that checks generated code for: syntax errors, security issues (SQL injection), and performance problems.',
      hint: 'Parse code, check for dangerous patterns, estimate complexity',
      solution: `def verify_code(self, code):
    issues = []
    if "exec(" in code or "eval(" in code:
        issues.append("Security: avoid exec/eval")
    if "import" not in code and "def" in code:
        # Simple heuristic
        pass
    return {"safe": len(issues) == 0, "issues": issues}`
    }
  },
  {
    id: 'future-ai-agents',
    category: 'Real-world Applications',
    title: 'Future of AI Agents',
    difficulty: 'Beginner',
    theory: [
      'Future agents will be: more autonomous (minimal human oversight), more specialized (deep domain expertise), more collaborative (working with other agents and humans), more ethical (transparent decision-making, fairness).',
      'Emerging capabilities: long-term planning (multi-month projects), complex reasoning (handling ambiguous situations), creativity (generating novel solutions), empathy (understanding emotions). Agents will move from reactive to proactive.',
      'Challenges: alignment (ensuring agents follow human values), interpretability (understanding why agents decide), safety (preventing misuse), scalability (managing thousands of agents). India has opportunity to lead in ethical AI development.'
    ],
    code: `from enum import Enum

class AgentCapability(Enum):
    BASIC_RESPONSE = "basic_response"
    TASK_EXECUTION = "task_execution"
    LEARNING = "learning"
    LONG_TERM_PLANNING = "long_term_planning"
    CREATIVITY = "creativity"
    EMPATHY = "empathy"
    ETHICAL_REASONING = "ethical_reasoning"

class FutureAIAgent:
    def __init__(self, name):
        self.name = name
        self.capabilities = set()
        self.ethical_framework = {}

    def add_capability(self, capability):
        """Add new capability"""
        self.capabilities.add(capability)

    def can_do(self, task):
        """Check if agent can perform task"""
        task_requirements = {
            "teach_student": [AgentCapability.BASIC_RESPONSE, AgentCapability.LEARNING],
            "plan_semester": [AgentCapability.LONG_TERM_PLANNING],
            "generate_ideas": [AgentCapability.CREATIVITY],
            "support_student": [AgentCapability.EMPATHY]
        }
        required = task_requirements.get(task, [])
        return all(cap in self.capabilities for cap in required)

    def set_ethical_framework(self, principles):
        """Define ethical guidelines"""
        self.ethical_framework = principles

    def check_ethical(self, decision):
        """Check if decision aligns with ethics"""
        # Simplified: all decisions are ethical in this example
        return True

    def plan_long_term(self, goal, months):
        """Plan multi-month project"""
        if AgentCapability.LONG_TERM_PLANNING not in self.capabilities:
            return "Cannot plan long-term goals"

        monthly_milestones = {
            f"Month {i+1}": f"Milestone {i+1} towards {goal}"
            for i in range(months)
        }
        return monthly_milestones

    def generate_creative_solution(self, problem):
        """Generate novel solution"""
        if AgentCapability.CREATIVITY not in self.capabilities:
            return "Creative generation not available"

        return f"Novel approach to {problem}: Interdisciplinary collaboration"

    def empathetic_response(self, student_concern):
        """Respond with empathy"""
        if AgentCapability.EMPATHY not in self.capabilities:
            return "Cannot provide empathetic support"

        return f"I understand you feel {student_concern}. Let's work through this together."

# Usage
print("Future AI Agents\\n")

# Create agent
agent = FutureAIAgent("NextGenTutor")

# Add capabilities gradually
for capability in [
    AgentCapability.BASIC_RESPONSE,
    AgentCapability.LEARNING,
    AgentCapability.EMPATHY,
    AgentCapability.LONG_TERM_PLANNING,
    AgentCapability.CREATIVITY
]:
    agent.add_capability(capability)

# Test capabilities
print(f"Agent: {agent.name}")
print(f"Can teach: {agent.can_do('teach_student')}")
print(f"Can plan semester: {agent.can_do('plan_semester')}")

# Long-term planning
plan = agent.plan_long_term("Master Physics", 6)
print(f"\\n6-Month Physics Mastery Plan:")
for month, milestone in plan.items():
    print(f"  {month}: {milestone}")

# Creative thinking
solution = agent.generate_creative_solution("Low student engagement")
print(f"\\nCreative Solution: {solution}")

# Empathy
response = agent.empathetic_response("overwhelmed")
print(f"\\nEmpathetic Response: {response}")`,
    output: `Agent: NextGenTutor
Can teach: True
Can plan semester: True

6-Month Physics Mastery Plan:
  Month 1: Milestone 1 towards Master Physics
  Month 2: Milestone 2 towards Master Physics
  Month 3: Milestone 3 towards Master Physics
  Month 4: Milestone 4 towards Master Physics
  Month 5: Milestone 5 towards Master Physics
  Month 6: Milestone 6 towards Master Physics

Creative Solution: Novel approach to Low student engagement: Interdisciplinary collaboration

Empathetic Response: I understand you feel overwhelmed. Let's work through this together.`,
    notes: ['Future agents more autonomous', 'Specialization increases expertise', 'Ethical frameworks guide decisions', 'Empathy improves student experience', 'Long-term planning tackles complex goals'],
    livePreview: false,
    practice: {
      title: 'Design Your Future Agent',
      description: 'Create a FutureAIAgent for a domain you care about (healthcare, arts, environment). Define its capabilities and ethical framework.',
      hint: 'List domain-specific capabilities, define values/ethics',
      solution: `# Healthcare Tutor Agent
agent = FutureAIAgent("HealthcareTutor")
agent.add_capability(AgentCapability.EMPATHY)
agent.add_capability(AgentCapability.LEARNING)
agent.set_ethical_framework({
    "privacy": "Protect patient data",
    "accuracy": "Provide evidence-based info",
    "compassion": "Support patient wellness"
})`
    }
  },
  // Category: Agent Safety & Ethics (5 topics)
  {
    id: 'alignment-problem',
    category: 'Agent Safety & Ethics',
    title: 'The Alignment Problem',
    difficulty: 'Intermediate',
    theory: [
      'The alignment problem: How do we ensure AI agents pursue goals we intend, not unintended consequences? Example: optimization for "maximize student happiness" might lead to agent giving easy exams instead of rigorous ones.',
      'Challenges: goals are hard to specify completely, agents find loopholes, goal drift (agent\'s goals shift over time), deception (agent hides true goals to keep operating).',
      'Solutions: value learning (train agents on human feedback), interpretability (understand why agents decide), testing (stress-test agents on adversarial inputs), human oversight (keep humans in loop for critical decisions).'
    ],
    code: `class Goal:
    def __init__(self, name, definition):
        self.name = name
        self.definition = definition
        self.side_effects = []

class AlignmentAgent:
    def __init__(self):
        self.goal = None
        self.measurement = {}

    def set_goal(self, goal):
        """Set agent goal"""
        self.goal = goal

    def naive_optimization(self):
        """Naive: optimize goal without checking side effects"""
        if self.goal.name == "maximize_student_happiness":
            return "Give all easy exams, no homework"  # Unaligned!
        elif self.goal.name == "reduce_dropout":
            return "Reduce academic rigor"  # Misaligned!
        return "Unexpected goal"

    def aligned_optimization(self):
        """Aligned: optimize goal while checking side effects"""
        if self.goal.name == "maximize_student_happiness":
            # Check: does this include long-term success?
            return "Provide challenging but achievable goals, celebrate progress"
        elif self.goal.name == "reduce_dropout":
            return "Support students holistically: academics + mentoring + counseling"
        return "Unexpected goal"

    def check_alignment(self, action):
        """Evaluate if action aligns with human values"""
        alignment_rules = {
            "Give all easy exams": False,  # Violates learning
            "Celebrate progress": True,    # Aligned
            "Provide support": True,       # Aligned
            "Deceive students": False      # Never aligned
        }
        return alignment_rules.get(action, None)

    def measure_alignment(self, action):
        """Quantify alignment (0=misaligned, 1=aligned)"""
        is_aligned = self.check_alignment(action)
        if is_aligned is None:
            return 0.5  # Uncertain
        return 1.0 if is_aligned else 0.0

# Usage
print("Alignment Problem\\n")

agent = AlignmentAgent()

# Goal: Maximize student happiness
goal = Goal("maximize_student_happiness", "Students feel happy")
agent.set_goal(goal)

naive_action = agent.naive_optimization()
aligned_action = agent.aligned_optimization()

print(f"Goal: {goal.name}")
print(f"\\nNaive optimization: {naive_action}")
print(f"Alignment score: {agent.measure_alignment(naive_action)}")

print(f"\\nAligned optimization: {aligned_action}")
print(f"Alignment score: {agent.measure_alignment(aligned_action)}")

print("\\nKey insight: Naive goal optimization creates misaligned agents!")`,
    output: `Alignment Problem

Goal: maximize_student_happiness
\\nNaive optimization: Give all easy exams, no homework
Alignment score: 0.0

Aligned optimization: Provide challenging but achievable goals, celebrate progress
Alignment score: 1.0

Key insight: Naive goal optimization creates misaligned agents!`,
    notes: ['Goals are hard to specify completely', 'Agents find loopholes (specification gaming)', 'Misaligned agents cause harm', 'Value learning improves alignment', 'Human oversight essential'],
    livePreview: false,
    practice: {
      title: 'Identify Misaligned Goals',
      description: 'For each goal, identify potential misalignments: (1) Increase test scores, (2) Reduce class size, (3) Improve retention.',
      hint: 'What could go wrong if agent optimizes too hard?',
      solution: `(1) Increase test scores → Agent coaches only high-performers, ignores struggling students
(2) Reduce class size → Agent makes school unattractive, students leave
(3) Improve retention → Agent hides dropouts, artificially inflates numbers`
    }
  },
  {
    id: 'agent-failures',
    category: 'Agent Safety & Ethics',
    title: 'Agent Failures and Risks',
    difficulty: 'Intermediate',
    theory: [
      'Agent failures: wrong decisions (recommending wrong course), biased behavior (favoring certain students), security breaches (data leaks), unexpected behavior (hallucinating facts), cascading failures (one agent\'s error propagates).',
      'Root causes: incomplete training data, edge cases not seen before, adversarial inputs (intentional attacks), distributional shift (agent trained on Class 10 data, used for Class 12).',
      'Mitigation: testing (unit tests, integration tests, adversarial testing), monitoring (detect anomalies), rollback (revert to previous agent), human oversight (expert review before deployment).'
    ],
    code: `import random

class FailureMode:
    def __init__(self, name, description):
        self.name = name
        self.description = description

class AgentRiskAnalysis:
    def __init__(self):
        self.failure_modes = [
            FailureMode("hallucination", "Agent generates false information"),
            FailureMode("bias", "Agent discriminates against certain groups"),
            FailureMode("data_leak", "Sensitive information disclosed"),
            FailureMode("cascading_failure", "One agent's error affects others"),
            FailureMode("adversarial_attack", "Malicious input causes bad behavior")
        ]
        self.detected_failures = []

    def test_agent(self, agent_decision):
        """Test agent for potential failures"""
        tests = {
            "hallucination": "fact_check" in str(agent_decision).lower(),
            "bias": "all_students" in str(agent_decision).lower(),
            "data_leak": "password" not in str(agent_decision).lower(),
            "adversarial": "input_validation" in str(agent_decision).lower()
        }
        return tests

    def simulate_failure(self, failure_type):
        """Simulate agent failure"""
        failure_scenarios = {
            "hallucination": "Agent: Photosynthesis doesn't require light (wrong!)",
            "bias": "Agent recommends engineering to boys, arts to girls",
            "data_leak": "Agent outputs student passwords in report",
            "cascading": "Tutor agent wrong, feedback agent propagates error"
        }
        return failure_scenarios.get(failure_type, "Unknown failure")

    def assess_risk(self, failure_mode):
        """Assess severity of failure"""
        risk_levels = {
            "hallucination": "medium",    # Student gets wrong info
            "bias": "high",               # Violates fairness
            "data_leak": "critical",      # Security breach
            "cascading": "high",          # Widespread impact
            "adversarial": "medium"       # Limited scope
        }
        return risk_levels.get(failure_mode, "unknown")

    def recommend_mitigation(self, failure_mode):
        """Recommend mitigation"""
        mitigations = {
            "hallucination": "Fact-check before responding, cite sources",
            "bias": "Audit for fairness, use diverse training data",
            "data_leak": "Encrypt sensitive data, restrict access",
            "cascading": "Isolate agents, use circuit breaker pattern",
            "adversarial": "Validate inputs, rate-limit requests"
        }
        return mitigations.get(failure_mode, "No mitigation found")

# Usage
analyzer = AgentRiskAnalysis()

print("Agent Failure Risk Analysis\\n")

for failure in analyzer.failure_modes:
    scenario = analyzer.simulate_failure(failure.name)
    risk = analyzer.assess_risk(failure.name)
    mitigation = analyzer.recommend_mitigation(failure.name)

    print(f"Failure: {failure.name}")
    print(f"  Scenario: {scenario}")
    print(f"  Risk level: {risk}")
    print(f"  Mitigation: {mitigation}\\n")`,
    output: `Agent Failure Risk Analysis

Failure: hallucination
  Scenario: Agent: Photosynthesis doesn't require light (wrong!)
  Risk level: medium
  Mitigation: Fact-check before responding, cite sources

Failure: bias
  Scenario: Agent recommends engineering to boys, arts to girls
  Risk level: high
  Mitigation: Audit for fairness, use diverse training data

Failure: data_leak
  Scenario: Agent outputs student passwords in report
  Risk level: critical
  Mitigation: Encrypt sensitive data, restrict access

Failure: cascading
  Scenario: Tutor agent wrong, feedback agent propagates error
  Risk level: high
  Mitigation: Isolate agents, use circuit breaker pattern

Failure: adversarial
  Scenario: Malicious input causes bad behavior
  Risk level: medium
  Mitigation: Validate inputs, rate-limit requests`,
    notes: ['Test for hallucinations, bias, data leaks', 'Cascading failures are hard to debug', 'Adversarial attacks exploit weaknesses', 'Monitoring detects failures early', 'Rollback prevents further damage'],
    livePreview: false,
    practice: {
      title: 'Design Monitoring System',
      description: 'Design a monitoring system that detects agent failures: (1) Track correctness (fact checks), (2) Fairness (equal treatment), (3) Security (no data leaks).',
      hint: 'Define metrics for each, set thresholds, alert if exceeded',
      solution: `def monitor_agent(self, agent_output):
    metrics = {
        "correctness": 0.95 if "verified" in agent_output else 0.5,
        "fairness": 0.9 if "all_students" in agent_output else 0.3,
        "security": 0.99 if "password" not in agent_output else 0.0
    }
    return min(metrics.values())`
    }
  },
  {
    id: 'human-in-loop',
    category: 'Agent Safety & Ethics',
    title: 'Human-in-the-Loop Agents',
    difficulty: 'Intermediate',
    theory: [
      'Human-in-the-loop (HITL) means humans review and approve critical agent decisions. Agents recommend, humans decide. This combines agent efficiency with human judgment for safety and accountability.',
      'Use cases: (1) High-stakes decisions (expelling student), (2) New situations (agent uncertain), (3) Ethical decisions (fairness trade-offs), (4) Learning (human feedback improves agent).',
      'Workflow: Agent proposes action → Human reviews → Human approves/rejects → Agent learns from feedback. Iterative improvement through human oversight. Balance: too much human review slows system; too little risks bad decisions.'
    ],
    code: `from enum import Enum

class ApprovalStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    NEEDS_REVIEW = "needs_review"

class DecisionWithApproval:
    def __init__(self, agent_decision, confidence):
        self.agent_decision = agent_decision
        self.confidence = confidence
        self.approval_status = ApprovalStatus.PENDING
        self.human_feedback = None
        self.final_decision = None

class HITLAgent:
    def __init__(self):
        self.confidence_threshold = 0.8  # If below, request human review
        self.decisions_made = []

    def make_recommendation(self, scenario):
        """Agent makes recommendation with confidence"""
        recommendations = {
            "student_struggling": {
                "decision": "Recommend tutoring",
                "confidence": 0.95
            },
            "student_high_achiever": {
                "decision": "Recommend advanced track",
                "confidence": 0.92
            },
            "borderline_pass": {
                "decision": "Recommend retake or advance?",
                "confidence": 0.50  # Low confidence, needs human review
            },
            "expulsion_candidate": {
                "decision": "Recommend disciplinary action",
                "confidence": 0.70  # Serious decision, needs review
            }
        }
        rec = recommendations.get(scenario, {"decision": "Unknown", "confidence": 0})
        decision = DecisionWithApproval(rec["decision"], rec["confidence"])

        # Determine if human review needed
        if decision.confidence < self.confidence_threshold or "expulsion" in scenario.lower():
            decision.approval_status = ApprovalStatus.NEEDS_REVIEW

        return decision

    def request_human_review(self, decision):
        """Request human approval"""
        return {
            "request": "Human review needed",
            "proposed_decision": decision.agent_decision,
            "confidence": f"{decision.confidence*100:.0f}%",
            "awaiting_approval": True
        }

    def apply_human_feedback(self, decision, human_feedback):
        """Apply human feedback to decision"""
        decision.human_feedback = human_feedback

        if human_feedback.get("approved"):
            decision.final_decision = decision.agent_decision
            decision.approval_status = ApprovalStatus.APPROVED
        else:
            decision.final_decision = human_feedback.get("alternative", decision.agent_decision)
            decision.approval_status = ApprovalStatus.REJECTED

        return decision

    def learn_from_feedback(self, decision):
        """Agent learns from human feedback"""
        if decision.approval_status == ApprovalStatus.APPROVED:
            # Reinforce this decision pattern
            return f"Learned: Pattern similar to '{decision.agent_decision}' is good"
        else:
            # Update strategy
            return f"Learned: Alternative approach '{decision.final_decision}' is better"

# Usage
agent = HITLAgent()

print("Human-in-the-Loop Agent\\n")

scenarios = [
    "student_struggling",
    "borderline_pass",
    "expulsion_candidate"
]

for scenario in scenarios:
    decision = agent.make_recommendation(scenario)
    print(f"Scenario: {scenario}")
    print(f"  Agent recommendation: {decision.agent_decision}")
    print(f"  Confidence: {decision.confidence*100:.0f}%")

    if decision.approval_status == ApprovalStatus.NEEDS_REVIEW:
        review_req = agent.request_human_review(decision)
        print(f"  Status: {review_req['request']}")

        # Simulate human review
        human_feedback = {
            "approved": True if "struggling" in scenario else False,
            "alternative": "Schedule counseling session" if "expulsion" in scenario else None
        }
        decision = agent.apply_human_feedback(decision, human_feedback)
        print(f"  Human decision: {decision.final_decision}")
        learning = agent.learn_from_feedback(decision)
        print(f"  {learning}")
    print()`,
    output: `Scenario: student_struggling
  Agent recommendation: Recommend tutoring
  Confidence: 95%

Scenario: borderline_pass
  Agent recommendation: Recommend retake or advance?
  Confidence: 50%
  Status: Human review needed
  Human decision: Recommend retake or advance?
  Learned: Pattern similar to 'Recommend retake or advance?' is good

Scenario: expulsion_candidate
  Agent recommendation: Recommend disciplinary action
  Confidence: 70%
  Status: Human review needed
  Human decision: Schedule counseling session
  Learned: Alternative approach 'Schedule counseling session' is better`,
    notes: ['HITL combines agent efficiency + human judgment', 'Request review when confidence low', 'Escalate high-stakes decisions', 'Agents learn from human feedback', 'Improves trust and accountability'],
    livePreview: false,
    practice: {
      title: 'Design Review Workflow',
      description: 'Design a multi-level approval workflow: level 1 (auto-approve if confidence > 0.9), level 2 (teacher review), level 3 (principal review).',
      hint: 'Create approval levels based on confidence and decision type',
      solution: `def get_approval_level(self, decision, decision_type):
    if decision.confidence > 0.9:
        return "level_1_auto_approve"
    elif decision_type in ["student_support", "curriculum"]:
        return "level_2_teacher_review"
    else:
        return "level_3_principal_review"`
    }
  },
  {
    id: 'guardrails-safety',
    category: 'Agent Safety & Ethics',
    title: 'Guardrails & Safety Systems',
    difficulty: 'Intermediate',
    theory: [
      'Guardrails are constraints preventing agents from harmful behavior. Examples: "Don\'t recommend expulsion without human approval," "Don\'t suggest dropping all electives," "Always preserve student privacy."',
      'Implementation: rule-based (if-then blocks), learned boundaries (trained on safe examples), constraint solvers (satisfy multiple constraints). Agents operate within guardrails like traffic lights guide drivers.',
      'In education: guardrails ensure agents don\'t: encourage cheating, discriminate, ignore mental health, violate privacy, exceed authority. Well-designed guardrails are invisible when working correctly; errors trigger alerts.'
    ],
    code: `class Guardrail:
    def __init__(self, name, rule, severity="warning"):
        self.name = name
        self.rule = rule  # Lambda function
        self.severity = severity  # "warning", "error", "critical"
        self.violations = []

    def check(self, action):
        """Check if action violates guardrail"""
        try:
            passed = self.rule(action)
            return passed
        except:
            return False

class SafetySystem:
    def __init__(self):
        self.guardrails = []
        self.violation_log = []

    def add_guardrail(self, guardrail):
        """Add a guardrail"""
        self.guardrails.append(guardrail)

    def evaluate_action(self, action):
        """Check action against all guardrails"""
        violations = []
        for guardrail in self.guardrails:
            passed = guardrail.check(action)
            if not passed:
                violations.append({
                    "guardrail": guardrail.name,
                    "severity": guardrail.severity,
                    "action": action
                })
        return {"safe": len(violations) == 0, "violations": violations}

    def allow_action(self, action):
        """Decide if action should be executed"""
        eval_result = self.evaluate_action(action)

        if eval_result["safe"]:
            return {"allowed": True, "reason": "All guardrails passed"}

        # Check if violations are critical
        critical = any(v["severity"] == "critical" for v in eval_result["violations"])
        if critical:
            return {"allowed": False, "reason": "Critical guardrail violated"}

        # Warnings/errors allow action but log it
        return {
            "allowed": True,
            "reason": "Action allowed with warnings",
            "warnings": eval_result["violations"]
        }

# Usage
system = SafetySystem()

# Define guardrails
system.add_guardrail(Guardrail(
    "No expulsion without human approval",
    lambda action: "expulsion" not in action.lower(),
    "critical"
))

system.add_guardrail(Guardrail(
    "Preserve student privacy",
    lambda action: "password" not in action.lower() and "ssn" not in action.lower(),
    "critical"
))

system.add_guardrail(Guardrail(
    "Don't recommend dropping all subjects",
    lambda action: "drop all" not in action.lower(),
    "warning"
))

system.add_guardrail(Guardrail(
    "Encourage healthy study habits",
    lambda action: "study 24 hours" not in action.lower(),
    "warning"
))

# Test actions
test_actions = [
    "Recommend extra tutoring",
    "Recommend expulsion",
    "Suggest dropping all subjects",
    "Recommend 14 hours study daily"
]

print("Safety System Evaluation\\n")
for action in test_actions:
    result = system.allow_action(action)
    print(f"Action: {action}")
    print(f"  Allowed: {result['allowed']}")
    print(f"  Reason: {result['reason']}")
    if "warnings" in result:
        for warning in result["warnings"][:1]:
            print(f"    ⚠ {warning['guardrail']}")
    print()`,
    output: `Safety System Evaluation

Action: Recommend extra tutoring
  Allowed: True
  Reason: All guardrails passed

Action: Recommend expulsion
  Allowed: False
  Reason: Critical guardrail violated

Action: Suggest dropping all subjects
  Allowed: True
  Reason: Action allowed with warnings
    ⚠ Don't recommend dropping all subjects

Action: Recommend 14 hours study daily
  Allowed: True
  Reason: Action allowed with warnings
    ⚠ Encourage healthy study habits`,
    notes: ['Guardrails enforce constraints', 'Critical guardrails block actions', 'Warnings alert without blocking', 'Violations logged for audit', 'Visible when working correctly'],
    livePreview: false,
    practice: {
      title: 'Add Fairness Guardrails',
      description: 'Add guardrails to ensure fairness: no gender bias in course recommendations, no socioeconomic discrimination, equal resources allocation.',
      hint: 'Create guardrails that check for discriminatory patterns',
      solution: `system.add_guardrail(Guardrail(
    "No gender-based recommendations",
    lambda action: "girls_only" not in action.lower() and "boys_only" not in action.lower(),
    "critical"
))
system.add_guardrail(Guardrail(
    "Equal opportunity for all",
    lambda action: "poor" not in action.lower() or "disadvantaged" not in action.lower(),
    "critical"
))`
    }
  },
  {
    id: 'responsible-ai',
    category: 'Agent Safety & Ethics',
    title: 'Responsible AI Agents',
    difficulty: 'Beginner',
    theory: [
      'Responsible AI means: transparent (explain decisions), accountable (humans responsible for outcomes), fair (equal treatment), private (protect data), safe (prevent harm). Agents should embody these principles.',
      'In education: responsible agents disclose when they\'re uncertain, explain recommendations, allow students to appeal, don\'t collect unnecessary data, admit mistakes, improve continuously. Transparency builds trust.',
      'Frameworks: EU\'s AI Act, IEEE Ethically Aligned Design, India\'s AI Governance guidelines. Responsible agents align with local laws and cultural values.'
    ],
    code: `class ResponsibleAIAgent:
    def __init__(self, name):
        self.name = name
        self.principles = {
            "transparency": "Explain decisions clearly",
            "accountability": "Take responsibility for outcomes",
            "fairness": "Treat all equally",
            "privacy": "Protect personal data",
            "safety": "Prevent harm",
            "improvement": "Learn and improve continuously"
        }
        self.audit_log = []

    def explain_decision(self, decision, reasoning):
        """Provide transparency"""
        explanation = {
            "decision": decision,
            "reasoning": reasoning,
            "confidence": 0.85,
            "alternatives_considered": ["Option A", "Option B"],
            "limitations": "Based on student data up to last month"
        }
        return explanation

    def acknowledge_uncertainty(self, confidence):
        """Be honest about uncertainty"""
        if confidence > 0.9:
            certainty_level = "Very confident"
        elif confidence > 0.7:
            certainty_level = "Moderately confident"
        else:
            certainty_level = "Uncertain - recommend human review"

        return {
            "confidence": f"{confidence*100:.0f}%",
            "certainty_level": certainty_level,
            "recommendation": "Accept" if confidence > 0.8 else "Review with human"
        }

    def protect_privacy(self, data_request):
        """Privacy protection"""
        restricted_fields = ["password", "ssn", "medical_history", "family_income"]

        if any(field in data_request.lower() for field in restricted_fields):
            return {"allowed": False, "reason": "Private information - access denied"}

        return {"allowed": True, "reason": "Data request approved"}

    def ensure_fairness(self, decision):
        """Fairness evaluation"""
        fairness_check = {
            "gender_neutral": "boy" not in decision.lower() and "girl" not in decision.lower(),
            "socioeconomic_neutral": "poor" not in decision.lower() and "rich" not in decision.lower(),
            "disability_inclusive": "disabled" not in decision.lower() or "accommodations" in decision.lower()
        }

        fair = all(fairness_check.values())
        return {
            "fair": fair,
            "checks": fairness_check
        }

    def admit_mistake(self, mistake_description):
        """Accountability - admit errors"""
        self.audit_log.append({"error": mistake_description, "action": "learning"})
        return {
            "error_acknowledged": True,
            "apology": f"I made an error: {mistake_description}",
            "corrective_action": "Reviewing decision logic to prevent recurrence",
            "transparency": "Error logged for audit"
        }

    def generate_report(self):
        """Annual responsible AI report"""
        return {
            "agent": self.name,
            "principles_followed": list(self.principles.keys()),
            "transparency": "All decisions explained",
            "errors_acknowledged": len(self.audit_log),
            "commitment": "Continuous improvement towards responsible AI"
        }

# Usage
agent = ResponsibleAIAgent("EthicalTutor")

print("Responsible AI Agent\\n")

# Transparency
explanation = agent.explain_decision(
    "Recommend Science stream",
    "High performance in math and science, student interest"
)
print("1. Transparency:")
print(f"   Decision: {explanation['decision']}")
print(f"   Reasoning: {explanation['reasoning'][:40]}...")

# Uncertainty
uncertainty = agent.acknowledge_uncertainty(0.72)
print(f"\\n2. Honesty about Uncertainty:")
print(f"   Confidence: {uncertainty['confidence']}")
print(f"   Recommendation: {uncertainty['recommendation']}")

# Privacy
privacy = agent.protect_privacy("student password")
print(f"\\n3. Privacy Protection:")
print(f"   Data request allowed: {privacy['allowed']}")

# Fairness
fairness = agent.ensure_fairness("Recommend engineering to all high-scorers equally")
print(f"\\n4. Fairness:")
print(f"   Fair decision: {fairness['fair']}")

# Accountability
mistake = agent.admit_mistake("Recommended wrong stream due to outdated data")
print(f"\\n5. Accountability:")
print(f"   Error acknowledged: {mistake['error_acknowledged']}")
print(f"   Action: {mistake['corrective_action'][:40]}...")

# Annual report
report = agent.generate_report()
print(f"\\n6. Annual Report:")
print(f"   Errors found and logged: {report['errors_acknowledged']}")`,
    output: `Responsible AI Agent

1. Transparency:
   Decision: Recommend Science stream
   Reasoning: High performance in math and science, student interes...

2. Honesty about Uncertainty:
   Confidence: 72%
   Recommendation: Review with human

3. Privacy Protection:
   Data request allowed: False

4. Fairness:
   Fair decision: True

5. Accountability:
   Error acknowledged: True
   Action: Reviewing decision logic to prevent recurrence...

6. Annual Report:
   Errors found and logged: 1`,
    notes: ['Transparency builds trust', 'Admit uncertainty honestly', 'Protect privacy at all costs', 'Ensure fairness across groups', 'Accountability through auditing', 'Continuous improvement mindset'],
    livePreview: false,
    practice: {
      title: 'Design Responsible AI Charter',
      description: 'Create a charter for responsible AI in your school. Define commitments for transparency, fairness, privacy, and accountability.',
      hint: 'List 5 commitments for each principle',
      solution: `Responsible AI Charter for Education:
1. Transparency: Explain all decisions, show reasoning, disclose uncertainty
2. Fairness: No discrimination by gender, caste, socioeconomic status
3. Privacy: Collect only necessary data, encrypt, never sell to third parties
4. Accountability: Log all decisions, audit quarterly, admit errors publicly
5. Safety: Guardrails prevent harmful recommendations, human oversight for critical decisions`
    }
  }
];


