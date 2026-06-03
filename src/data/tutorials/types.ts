// Shared types for the tutorials system

export interface TutorialPractice {
  title: string;
  description: string;
  startCode?: string;
  hint?: string;
  expectedOutput?: string;
  solution?: string;
}

export interface TutorialTopic {
  id: string;
  category: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  theory: string[];        // paragraphs rendered sequentially
  syntax?: string;         // optional syntax template box
  code: string;            // runnable example code
  output?: string;         // expected output for non-live-preview languages
  notes?: string[];        // tips / important points
  livePreview?: boolean;   // true for HTML/CSS/JS (renders in iframe)
  xp?: number;             // optional XP reward for completing the topic
  practice: TutorialPractice;
}

export interface CareerGuide {
  roles: string[];        // e.g. ["Data Scientist", "ML Engineer"]
  avgSalary: string;      // e.g. "₹6–25 LPA"
  topCompanies: string[]; // e.g. ["Google", "Amazon", "Infosys"]
  nextSkills: string[];   // what to learn next
  tip: string;            // one career advice sentence
}

export interface ProjectIdea {
  title: string;
  description: string;
  steps: string[];
  difficulty: 'Beginner' | 'Intermediate';
  techStack: string;
}

export interface LanguageConfig {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  editorMode: 'live' | 'feedback'; // live = iframe preview, feedback = AI review
  description: string;
  careerGuide?: CareerGuide;
  projectIdea?: ProjectIdea;
}
