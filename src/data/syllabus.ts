import { Chapter, ClassLevel, Subject } from "../types";
import { JUNIOR_SYLLABUS } from "./cbseJuniorSyllabus";

type SeniorSeed = {
  id: string;
  classLevel: ClassLevel;
  subject: Subject;
  title: string;
  topics?: string[];
  difficulty?: Chapter["difficulty"];
};

const SENIOR_TOPIC_STOP_WORDS = new Set(["and", "the", "with", "from", "into", "that", "this", "your", "their"]);

const buildTopics = (title: string, subject: Subject, provided?: string[]) => {
  if (provided?.length) {
    return provided;
  }

  const keywords = title
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !SENIOR_TOPIC_STOP_WORDS.has(word.toLowerCase()))
    .slice(0, 5);

  return Array.from(new Set([title, ...keywords, subject])).slice(0, 8);
};

const subjectSummary: Record<Subject, string> = {
  Physics: "Physics concepts become easier when students connect formulas to motion, light, electricity, energy, and measurable real-world systems.",
  Chemistry: "Chemistry chapters connect matter, reactions, structures, and properties through NCERT theory, examples, and balanced practice.",
  Biology: "Biology chapters focus on living systems, diagrams, processes, vocabulary, and cause-effect reasoning.",
  Mathematics: "Mathematics chapters build problem-solving fluency through NCERT examples, proofs, patterns, and mixed practice.",
  Science: "Science chapters build observation, evidence, and activity-led reasoning.",
  English: "English chapters build reading, vocabulary, expression, grammar-in-context, and interpretation.",
  "The World Around Us": "This subject connects students to environment, society, health, places, materials, and inquiry.",
};

const senior = (seed: SeniorSeed): Chapter => ({
  id: seed.id,
  title: seed.title,
  subject: seed.subject,
  classLevel: seed.classLevel,
  topics: buildTopics(seed.title, seed.subject, seed.topics),
  explanation: subjectSummary[seed.subject],
  realWorldExample:
    "Students can connect this chapter to observations, experiments, class discussions, and daily-life examples before attempting practice.",
  examInsight:
    Number(seed.classLevel) >= 10
      ? "Revise NCERT definitions, examples, diagrams, and formula steps before moving into timed MCQs."
      : "Use chapter activities and examples as the base for practice.",
  difficulty: seed.difficulty ?? "Medium",
  concepts: [],
});

const SENIOR_SYLLABUS: Chapter[] = [
  // Class 10 Physics
  senior({
    id: "10-phy-1",
    classLevel: "10",
    subject: "Physics",
    title: "Light - Reflection and Refraction",
    topics: ["Spherical Mirrors", "Lens Formula", "Refractive Index", "Image Formation"],
  }),
  senior({
    id: "10-phy-2",
    classLevel: "10",
    subject: "Physics",
    title: "The Human Eye and the Colourful World",
    topics: ["Eye Anatomy", "Defects of Vision", "Dispersion", "Atmospheric Refraction"],
    difficulty: "Easy",
  }),
  senior({
    id: "10-phy-3",
    classLevel: "10",
    subject: "Physics",
    title: "Electricity",
    topics: ["Electric Current", "Ohm's Law", "Resistance", "Heating Effect"],
  }),
  senior({
    id: "10-phy-4",
    classLevel: "10",
    subject: "Physics",
    title: "Magnetic Effects of Electric Current",
    topics: ["Magnetic Fields", "Electric Motor", "Electromagnetic Induction", "Domestic Circuits"],
    difficulty: "Hard",
  }),

  // Class 10 Chemistry
  senior({
    id: "10-chem-1",
    classLevel: "10",
    subject: "Chemistry",
    title: "Chemical Reactions and Equations",
    topics: ["Balancing Equations", "Types of Reactions", "Oxidation", "Reduction"],
    difficulty: "Easy",
  }),
  senior({
    id: "10-chem-2",
    classLevel: "10",
    subject: "Chemistry",
    title: "Acids, Bases and Salts",
    topics: ["pH Scale", "Indicators", "Neutralisation", "Common Salts"],
  }),
  senior({
    id: "10-chem-3",
    classLevel: "10",
    subject: "Chemistry",
    title: "Metals and Non-metals",
    topics: ["Reactivity Series", "Ionic Compounds", "Metallurgy", "Alloys"],
  }),
  senior({
    id: "10-chem-4",
    classLevel: "10",
    subject: "Chemistry",
    title: "Carbon and its Compounds",
    topics: ["Covalent Bonding", "Catenation", "Functional Groups", "Soaps and Detergents"],
    difficulty: "Hard",
  }),

  // Class 10 Biology
  senior({
    id: "10-bio-1",
    classLevel: "10",
    subject: "Biology",
    title: "Life Processes",
    topics: ["Nutrition", "Respiration", "Transportation", "Excretion"],
  }),
  senior({
    id: "10-bio-2",
    classLevel: "10",
    subject: "Biology",
    title: "Control and Coordination",
    topics: ["Nervous System", "Reflex Action", "Hormones", "Plant Movements"],
  }),
  senior({
    id: "10-bio-3",
    classLevel: "10",
    subject: "Biology",
    title: "How do Organisms Reproduce?",
    topics: ["Asexual Reproduction", "Sexual Reproduction", "Flower Reproduction", "Reproductive Health"],
    difficulty: "Easy",
  }),
  senior({
    id: "10-bio-4",
    classLevel: "10",
    subject: "Biology",
    title: "Heredity",
    topics: ["Mendel's Experiments", "Inheritance", "Sex Determination", "Variation"],
  }),
  senior({
    id: "10-bio-5",
    classLevel: "10",
    subject: "Biology",
    title: "Our Environment",
    topics: ["Ecosystem", "Food Chains", "Food Webs", "Ozone Depletion"],
    difficulty: "Easy",
  }),
  senior({
    id: "10-bio-6",
    classLevel: "10",
    subject: "Biology",
    title: "Sustainable Management of Natural Resources",
    topics: ["The 5 Rs", "Forests", "Water Harvesting", "Coal and Petroleum"],
    difficulty: "Easy",
  }),

  // Class 10 Mathematics
  ...[
    ["10-math-1", "Real Numbers"],
    ["10-math-2", "Polynomials"],
    ["10-math-3", "Pair of Linear Equations in Two Variables"],
    ["10-math-4", "Quadratic Equations"],
    ["10-math-5", "Arithmetic Progressions"],
    ["10-math-6", "Triangles"],
    ["10-math-7", "Coordinate Geometry"],
    ["10-math-8", "Introduction to Trigonometry"],
    ["10-math-9", "Some Applications of Trigonometry"],
    ["10-math-10", "Circles"],
    ["10-math-11", "Areas Related to Circles"],
    ["10-math-12", "Surface Areas and Volumes"],
    ["10-math-13", "Statistics"],
    ["10-math-14", "Probability"],
  ].map(([id, title]) =>
    senior({
      id,
      classLevel: "10",
      subject: "Mathematics",
      title,
      difficulty: id === "10-math-6" || id === "10-math-12" ? "Hard" : "Medium",
    }),
  ),

  // Class 11 Physics
  ...[
    ["11-phy-1", "Units and Measurements"],
    ["11-phy-2", "Motion in a Straight Line"],
    ["11-phy-3", "Motion in a Plane"],
    ["11-phy-4", "Laws of Motion"],
    ["11-phy-5", "Work, Energy and Power"],
    ["11-phy-6", "System of Particles and Rotational Motion"],
    ["11-phy-7", "Gravitation"],
    ["11-phy-8", "Mechanical Properties of Solids"],
    ["11-phy-9", "Mechanical Properties of Fluids"],
    ["11-phy-10", "Thermal Properties of Matter"],
    ["11-phy-11", "Thermodynamics"],
    ["11-phy-12", "Kinetic Theory"],
    ["11-phy-13", "Oscillations"],
    ["11-phy-14", "Waves"],
  ].map(([id, title]) => senior({ id, classLevel: "11", subject: "Physics", title, difficulty: "Hard" })),

  // Class 11 Chemistry
  ...[
    ["11-chem-1", "Some Basic Concepts of Chemistry"],
    ["11-chem-2", "Structure of Atom"],
    ["11-chem-3", "Classification of Elements and Periodicity in Properties"],
    ["11-chem-4", "Chemical Bonding and Molecular Structure"],
    ["11-chem-5", "Thermodynamics"],
    ["11-chem-6", "Equilibrium"],
    ["11-chem-7", "Redox Reactions"],
    ["11-chem-8", "Organic Chemistry - Some Basic Principles and Techniques"],
    ["11-chem-9", "Hydrocarbons"],
  ].map(([id, title]) => senior({ id, classLevel: "11", subject: "Chemistry", title, difficulty: "Hard" })),

  // Class 11 Biology
  ...[
    ["11-bio-1", "Animal Kingdom"],
    ["11-bio-2", "Plant Kingdom"],
    ["11-bio-3", "Morphology of Flowering Plants"],
    ["11-bio-4", "Anatomy of Flowering Plants"],
    ["11-bio-5", "Cell: The Unit of Life"],
    ["11-bio-6", "Biomolecules"],
    ["11-bio-7", "Cell Cycle and Cell Division"],
    ["11-bio-8", "Photosynthesis in Higher Plants"],
    ["11-bio-9", "Respiration in Plants"],
    ["11-bio-10", "Breathing and Exchange of Gases"],
    ["11-bio-11", "Body Fluids and Circulation"],
    ["11-bio-12", "Excretory Products and their Elimination"],
    ["11-bio-13", "Neural Control and Coordination"],
    ["11-bio-14", "Chemical Coordination and Integration"],
  ].map(([id, title]) => senior({ id, classLevel: "11", subject: "Biology", title, difficulty: "Hard" })),

  // Class 11 Mathematics
  ...[
    ["11-math-1", "Sets"],
    ["11-math-2", "Relations and Functions"],
    ["11-math-3", "Trigonometric Functions"],
    ["11-math-4", "Complex Numbers and Quadratic Equations"],
    ["11-math-5", "Linear Inequalities"],
    ["11-math-6", "Permutations and Combinations"],
    ["11-math-7", "Binomial Theorem"],
    ["11-math-8", "Sequences and Series"],
    ["11-math-9", "Straight Lines"],
    ["11-math-10", "Conic Sections"],
    ["11-math-11", "Introduction to Three Dimensional Geometry"],
    ["11-math-12", "Limits and Derivatives"],
    ["11-math-13", "Statistics"],
    ["11-math-14", "Probability"],
  ].map(([id, title]) => senior({ id, classLevel: "11", subject: "Mathematics", title, difficulty: "Hard" })),

  // Class 12 Physics
  ...[
    ["12-phy-1", "Electric Charges and Fields"],
    ["12-phy-2", "Electrostatic Potential and Capacitance"],
    ["12-phy-3", "Current Electricity"],
    ["12-phy-4", "Moving Charges and Magnetism"],
    ["12-phy-5", "Magnetism and Matter"],
    ["12-phy-6", "Electromagnetic Induction"],
    ["12-phy-7", "Alternating Current"],
    ["12-phy-8", "Electromagnetic Waves"],
    ["12-phy-9", "Ray Optics and Optical Instruments"],
    ["12-phy-10", "Wave Optics"],
    ["12-phy-11", "Dual Nature of Radiation and Matter"],
    ["12-phy-12", "Atoms"],
    ["12-phy-13", "Nuclei"],
    ["12-phy-14", "Semiconductor Electronics"],
  ].map(([id, title]) => senior({ id, classLevel: "12", subject: "Physics", title, difficulty: "Hard" })),

  // Class 12 Chemistry
  ...[
    ["12-chem-1", "Solutions"],
    ["12-chem-2", "Electrochemistry"],
    ["12-chem-3", "Chemical Kinetics"],
    ["12-chem-4", "The d- and f- Block Elements"],
    ["12-chem-5", "Coordination Compounds"],
    ["12-chem-6", "Haloalkanes and Haloarenes"],
    ["12-chem-7", "Alcohols, Phenols and Ethers"],
    ["12-chem-8", "Aldehydes, Ketones and Carboxylic Acids"],
    ["12-chem-9", "Amines"],
    ["12-chem-10", "Biomolecules"],
  ].map(([id, title]) => senior({ id, classLevel: "12", subject: "Chemistry", title, difficulty: "Hard" })),

  // Class 12 Biology
  ...[
    ["12-bio-1", "Sexual Reproduction in Flowering Plants"],
    ["12-bio-2", "Human Reproduction"],
    ["12-bio-3", "Reproductive Health"],
    ["12-bio-4", "Principles of Inheritance and Variation"],
    ["12-bio-5", "Molecular Basis of Inheritance"],
    ["12-bio-6", "Evolution"],
    ["12-bio-7", "Human Health and Disease"],
    ["12-bio-8", "Microbes in Human Welfare"],
    ["12-bio-9", "Biotechnology - Principles and Processes"],
    ["12-bio-10", "Biotechnology and its Applications"],
    ["12-bio-11", "Organisms and Populations"],
    ["12-bio-12", "Ecosystem"],
    ["12-bio-13", "Biodiversity and Conservation"],
  ].map(([id, title]) => senior({ id, classLevel: "12", subject: "Biology", title, difficulty: "Hard" })),

  // Class 12 Mathematics
  ...[
    ["12-math-1", "Relations and Functions"],
    ["12-math-2", "Inverse Trigonometric Functions"],
    ["12-math-3", "Matrices"],
    ["12-math-4", "Determinants"],
    ["12-math-5", "Continuity and Differentiability"],
    ["12-math-6", "Application of Derivatives"],
    ["12-math-7", "Integrals"],
    ["12-math-8", "Application of Integrals"],
    ["12-math-9", "Differential Equations"],
    ["12-math-10", "Vector Algebra"],
    ["12-math-11", "Three Dimensional Geometry"],
    ["12-math-12", "Linear Programming"],
    ["12-math-13", "Probability"],
  ].map(([id, title]) => senior({ id, classLevel: "12", subject: "Mathematics", title, difficulty: "Hard" })),
];

export const SYLLABUS: Chapter[] = [...JUNIOR_SYLLABUS, ...SENIOR_SYLLABUS];
