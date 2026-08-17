/**
 * samplePapers.ts — original Syllab model "Sample Papers" SEO cluster.
 * CBSE-pattern practice papers (NOT copied from CBSE) at /sample-papers/{slug}.
 * Data is generated; answers must be accurate.
 */
export interface SpQuestion { q: string; marks: number; answer: string; }
export interface SpSection {
  name: string;
  marks: number;
  instructions: string;
  /**
   * The unseen passage/extract a comprehension section is based on. REQUIRED
   * whenever the instructions tell the student to "read the passage" — without
   * it the questions are literally unanswerable, which is what shipped for
   * months on 10 English/Hindi papers (Section A said "read the passage" and no
   * passage existed). Guarded by samplePapers.test.ts.
   */
  passage?: string;
  questions: SpQuestion[];
}
export interface SpFaq { q: string; a: string; }
export interface SamplePaper {
  slug: string;
  classLevel: string;
  subject: string;
  board: string;
  title: string;
  intro: string;
  duration: string;
  totalMarks: number;
  sections: SpSection[];
  faqs: SpFaq[];
}

export const SAMPLE_PAPERS: SamplePaper[] = [
  {
    "slug": "class-10-maths",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 10 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper follows the latest CBSE Class 10 Maths exam pattern, with questions spread across four sections. Practice it to revise every chapter and build board-exam confidence. This is a shortened practice set: 16 questions worth 35 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 35,
    "sections": [
      {
        "name": "Section A - MCQs",
        "marks": 5,
        "instructions": "Answer all 20 multiple choice questions.",
        "questions": [
          {
            "q": "If the sum of the roots of the quadratic equation 2x^2 - (k+1)x + (k-2) = 0 is 5/2, then the value of k is",
            "marks": 1,
            "answer": "k = 6"
          },
          {
            "q": "The 15th term of an AP with first term 5 and common difference 3 is",
            "marks": 1,
            "answer": "47"
          },
          {
            "q": "If sin A = 3/5, then cos A is equal to",
            "marks": 1,
            "answer": "4/5"
          },
          {
            "q": "The radius of the circle with equation x^2 + y^2 - 6x - 8y + 9 = 0 is",
            "marks": 1,
            "answer": "4"
          },
          {
            "q": "Two similar triangles have areas in the ratio 4:9. Their corresponding sides are in the ratio",
            "marks": 1,
            "answer": "2:3"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Find the HCF of 210 and 55 using Euclidean algorithm.",
            "marks": 2,
            "answer": "HCF = 5"
          },
          {
            "q": "If a and b are zeroes of x^2 + 5x + k, and a - b = 1, find k.",
            "marks": 2,
            "answer": "k = 6"
          },
          {
            "q": "Find the sum of the first 20 terms of AP: 1, 4, 7, 10...",
            "marks": 2,
            "answer": "S20 = 590"
          },
          {
            "q": "If cos 9A = sin A and 0 < A < 90 degrees, find the value of A.",
            "marks": 2,
            "answer": "A = 10 degrees"
          },
          {
            "q": "A point P is at distance 13 cm from the center of a circle of radius 5 cm. Find the length of the tangent from P to the circle.",
            "marks": 2,
            "answer": "12 cm"
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Solve the system: 2x + 3y = 8 and 3x + 2y = 7",
            "marks": 3,
            "answer": "x = 2, y = 4/3"
          },
          {
            "q": "Find the area of a triangle with vertices A(2, 3), B(5, 7), C(-1, 6).",
            "marks": 3,
            "answer": "Area = 6 square units"
          },
          {
            "q": "A ladder 10 m long leans against a wall. The foot of the ladder is 6 m away from the base of the wall. At what height does the ladder touch the wall?",
            "marks": 3,
            "answer": "8 m"
          },
          {
            "q": "Prove that the sum of the angles in a triangle is 180 degrees.",
            "marks": 3,
            "answer": "Use parallel line property with alternate interior angles"
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "A cone has height 12 cm and base radius 5 cm. Find its curved surface area and total surface area.",
            "marks": 4,
            "answer": "CSA = 204.2 sq cm, TSA = 285.7 sq cm approximately"
          },
          {
            "q": "Two concentric circles have radii 5 cm and 3 cm. A chord of the larger circle is tangent to the smaller circle. Find the length of the chord.",
            "marks": 4,
            "answer": "8 cm"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total duration of the Class 10 Maths board exam?",
        "a": "3 hours is the standard duration for the CBSE Class 10 Maths board exam."
      },
      {
        "q": "How many marks is the board exam out of?",
        "a": "The board exam is out of 80 marks, with internal assessment contributing 20 marks."
      },
      {
        "q": "Are there optional questions in the exam?",
        "a": "Yes, there are internal choices within some questions, but all sections must be attempted."
      }
    ]
  },
  {
    "slug": "class-10-science",
    "classLevel": "Class 10",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Science Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive science sample paper covers Physics, Chemistry, and Biology with questions from all major chapters. Use this to assess your preparation and familiarize yourself with the exam pattern. This is a shortened practice set: 17 questions worth 40 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 40,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 4,
        "instructions": "Answer all 16 multiple choice questions.",
        "questions": [
          {
            "q": "The speed of light in a medium is 1.5 x 10^8 m/s. The refractive index of the medium is",
            "marks": 1,
            "answer": "2"
          },
          {
            "q": "Which hormone controls blood glucose levels?",
            "marks": 1,
            "answer": "Insulin"
          },
          {
            "q": "The atomic number of an element is 17. Its electronic configuration is",
            "marks": 1,
            "answer": "2, 8, 7"
          },
          {
            "q": "The pH of a neutral solution is",
            "marks": 1,
            "answer": "7"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 14,
        "instructions": "Answer all 7 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "What is myopia? How can it be corrected?",
            "marks": 2,
            "answer": "Myopia is nearsightedness. It is corrected using a concave lens."
          },
          {
            "q": "Define refraction of light. Give one example.",
            "marks": 2,
            "answer": "Refraction is the bending of light when it enters a different medium. Example: A pencil appears bent in water."
          },
          {
            "q": "What is the difference between mitosis and meiosis?",
            "marks": 2,
            "answer": "Mitosis produces 2 identical cells; meiosis produces 4 non-identical haploid cells."
          },
          {
            "q": "How does a catalyst increase the rate of a chemical reaction?",
            "marks": 2,
            "answer": "A catalyst lowers the activation energy required for the reaction."
          },
          {
            "q": "Distinguish between renewable and non-renewable resources.",
            "marks": 2,
            "answer": "Renewable resources can be replenished naturally; non-renewable resources cannot and are exhausted."
          },
          {
            "q": "What is the function of stomata in plants?",
            "marks": 2,
            "answer": "Stomata allow gas exchange and water vapor loss in plants through transpiration."
          },
          {
            "q": "Define the term alloy. Give two examples.",
            "marks": 2,
            "answer": "An alloy is a mixture of two or more elements where at least one is a metal. Examples: Brass, Steel."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain the process of photosynthesis with a chemical equation.",
            "marks": 3,
            "answer": "Plants use sunlight, water, and CO2 to produce glucose and oxygen. 6CO2 + 6H2O + light = C6H12O6 + 6O2"
          },
          {
            "q": "How does a thermal power plant generate electricity?",
            "marks": 3,
            "answer": "Fossil fuels heat water to steam, which drives turbines connected to generators to produce electricity."
          },
          {
            "q": "Explain the process of digestion in the human body.",
            "marks": 3,
            "answer": "Food is broken down mechanically and chemically in the mouth, stomach, and small intestine; nutrients are absorbed."
          },
          {
            "q": "What is the principle behind a simple electric motor?",
            "marks": 3,
            "answer": "A current-carrying coil in a magnetic field experiences a force, causing it to rotate continuously."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 10,
        "instructions": "Answer all 2 questions, with internal choice; each carrying 5 marks.",
        "questions": [
          {
            "q": "Describe the structure and function of a neuron. OR Explain the process of fertilization in plants.",
            "marks": 5,
            "answer": "A neuron has a cell body, dendrites, and axon for nerve impulse transmission. OR Pollen fertilizes the ovule; fusion of gametes occurs."
          },
          {
            "q": "How does a convex lens form images at different distances? Draw ray diagrams.",
            "marks": 5,
            "answer": "At 2f: real, inverted, same size; beyond 2f: real, inverted, diminished; between f and lens: virtual, erect, magnified."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is the Class 10 Science exam practical-based?",
        "a": "Yes, 20 marks are for practical assessment, and the remaining 80 marks are for theory."
      },
      {
        "q": "Which topics are most important for the board exam?",
        "a": "Electricity, heredity, photosynthesis, and chemical reactions are frequently asked topics."
      },
      {
        "q": "Can I use a calculator in the exam?",
        "a": "Calculators are generally not allowed; you should be able to perform calculations mentally."
      }
    ]
  },
  {
    "slug": "class-10-social-science",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Social Science Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper integrates History, Geography, Political Science, and Economics covering key topics from the syllabus. Attempt this to gauge your understanding and improve answers on contemporary issues. This is a shortened practice set: 17 questions worth 40 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 40,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 4,
        "instructions": "Answer all 16 multiple choice questions.",
        "questions": [
          {
            "q": "In which year did India adopt the Constitution?",
            "marks": 1,
            "answer": "1950"
          },
          {
            "q": "Which river is the longest in India?",
            "marks": 1,
            "answer": "Ganga"
          },
          {
            "q": "The National Flag of India was adopted on",
            "marks": 1,
            "answer": "July 22, 1947"
          },
          {
            "q": "Who was the first President of independent India?",
            "marks": 1,
            "answer": "Dr. Rajendra Prasad"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 14,
        "instructions": "Answer all 7 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "What is democracy? Name any two features of democracy.",
            "marks": 2,
            "answer": "Democracy is government by the people. Features: equal rights, freedom of speech, regular elections."
          },
          {
            "q": "Define inflation. How does it affect consumers?",
            "marks": 2,
            "answer": "Inflation is sustained increase in price levels. It reduces purchasing power of consumers."
          },
          {
            "q": "What is the Indian monsoon? When does it occur?",
            "marks": 2,
            "answer": "Monsoon is seasonal wind system bringing heavy rainfall. It occurs from June to September in India."
          },
          {
            "q": "Who led the Quit India Movement? When was it launched?",
            "marks": 2,
            "answer": "Mahatma Gandhi led it in 1942 demanding immediate British withdrawal."
          },
          {
            "q": "What is sustainable development?",
            "marks": 2,
            "answer": "Development that meets current needs without harming future generations."
          },
          {
            "q": "Name any two major cities in the Indo-Gangetic Plain.",
            "marks": 2,
            "answer": "Delhi, Kanpur, Lucknow, Varanasi are major cities."
          },
          {
            "q": "What is the role of the Prime Minister in the Indian government?",
            "marks": 2,
            "answer": "PM is the executive head of government and leader of the ruling party in Parliament."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Describe the main features of the Indian Constitution.",
            "marks": 3,
            "answer": "It is the world's largest, provides fundamental rights, establishes a secular democratic republic."
          },
          {
            "q": "What is poverty? Explain the causes of poverty in India.",
            "marks": 3,
            "answer": "Poverty is inability to meet basic needs. Causes: lack of education, unemployment, poor healthcare."
          },
          {
            "q": "Explain the three-tier system of government in India.",
            "marks": 3,
            "answer": "Central (Union), State, and Local (Panchayat/Municipal Corporation) governments share powers."
          },
          {
            "q": "What were the causes of the Indian Rebellion of 1857?",
            "marks": 3,
            "answer": "Economic exploitation, religious policies, greased cartridges issue, resentment against British rule."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 10,
        "instructions": "Answer all 2 questions with internal choice; each carrying 5 marks.",
        "questions": [
          {
            "q": "Explain the concept of national integration. What are its challenges in India? OR How is India addressing gender inequality in education and employment?",
            "marks": 5,
            "answer": "Integration means unity of diverse groups. Challenges: communalism, regional disparities. OR Government schemes like Mid Day Meal, Beti Bachao promote equality."
          },
          {
            "q": "Describe the Cold War and its impact on international relations.",
            "marks": 5,
            "answer": "Ideological conflict between USA and USSR; led to space race, arms race, proxy wars, and nuclear tension."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 10 Social Science?",
        "a": "History, Geography, Political Science (Civics), and Economics are all integrated in the syllabus."
      },
      {
        "q": "How should I prepare for the map-based questions?",
        "a": "Practice drawing maps of India showing states, capitals, important cities, and geographical features regularly."
      },
      {
        "q": "Are there questions on current affairs?",
        "a": "Yes, questions based on recent national and international events are often included in the exam."
      }
    ]
  },
  {
    "slug": "class-10-english",
    "classLevel": "Class 10",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 10 English Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers Reading Comprehension, Writing, Grammar, and Literature based on the latest CBSE syllabus. Practice this to improve language skills and scoring in the board exam. This is a shortened practice set: 12 questions worth 36 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 36,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 6,
        "instructions": "Read the given passages and answer the questions based on them.",
        "questions": [
          {
            "q": "Why is reading important for students? (Based on a passage about the benefits of reading)",
            "marks": 2,
            "answer": "Reading expands vocabulary, improves imagination, and increases knowledge."
          },
          {
            "q": "What is the main idea of the passage? Explain in 2-3 sentences.",
            "marks": 3,
            "answer": "The passage highlights how literature shapes our understanding of society and human nature."
          },
          {
            "q": "Find a word from the passage that means 'extremely poor or needy'.",
            "marks": 1,
            "answer": "Destitute or impoverished"
          }
        ],
        "passage": "A boy who reads is never entirely alone. Every book he opens hands him a vocabulary he did not have that morning, an imagination stretched a little wider than the room he sits in, and a stock of knowledge he will draw on for years without remembering where it came from. This is why reading matters so much to students: it expands vocabulary, improves imagination and increases knowledge, all at once and almost without effort.\n\nBut literature does something larger than instruct. A novel set in a village he has never visited teaches him how a stranger thinks. A poem about loss prepares him, quietly, for a grief that has not arrived yet. Literature shapes our understanding of society and of human nature — it lets a reader live, briefly, inside a life not his own, and return more capable of imagining other people.\n\nConsider the beggar in Premchand's stories, destitute and yet unwilling to surrender his dignity. A reader who has met such a character on the page recognises him differently on the street. That recognition is not sentimentality; it is the beginning of judgement. The habit of reading, begun early and kept up, is among the few habits that improve every other subject a student studies."
      },
      {
        "name": "Section B - Writing",
        "marks": 10,
        "instructions": "Complete the writing tasks as instructed.",
        "questions": [
          {
            "q": "Write a letter to your Principal requesting permission to organize a science fair in school. (Word limit: 100-120)",
            "marks": 5,
            "answer": "Letter should include sender's address, date, proper salutation, clear purpose, reasons, and closing."
          },
          {
            "q": "Write a notice for the school notice board announcing a sports day event.",
            "marks": 5,
            "answer": "Notice should include title, date, event details, venue, time, eligibility, and registration deadline."
          }
        ]
      },
      {
        "name": "Section C - Grammar",
        "marks": 7,
        "instructions": "Attempt all grammar questions.",
        "questions": [
          {
            "q": "Fill in the blanks with appropriate articles: ___ apple a day keeps ___ doctor away.",
            "marks": 1,
            "answer": "An, the"
          },
          {
            "q": "Identify the tense: She has been living in Delhi for five years.",
            "marks": 2,
            "answer": "Present Perfect Continuous Tense"
          },
          {
            "q": "Correct the sentence: If you will study hard, you will pass the exam.",
            "marks": 2,
            "answer": "If you study hard, you will pass the exam. (Remove 'will' after if)"
          },
          {
            "q": "Change the voice: The teacher teaches us English. (Active to Passive)",
            "marks": 2,
            "answer": "English is taught to us by the teacher."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 13,
        "instructions": "Answer questions based on prescribed texts and poems. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "What is the theme of the novel/story studied? Explain with examples.",
            "marks": 4,
            "answer": "The theme involves struggle against adversity, showcasing human resilience and hope."
          },
          {
            "q": "Analyze the character of the protagonist. How does he/she change throughout the story?",
            "marks": 5,
            "answer": "Character undergoes transformation through challenges, learning valuable life lessons."
          },
          {
            "q": "What is the message conveyed by a poem you have studied? Explain with reference to the text.",
            "marks": 4,
            "answer": "The poem conveys that nature teaches patience and perseverance through its cycles."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the weightage of different sections in the English exam?",
        "a": "Reading (20), Writing (20), Grammar (15), and Literature (25) are the main sections."
      },
      {
        "q": "Are there internal choices in the English exam?",
        "a": "Yes, students can choose to answer either writing or literary texts as per preference in some sections."
      },
      {
        "q": "How can I improve my writing skills?",
        "a": "Regular reading, practicing letter writing, and analyzing model answers helps improve writing skills."
      }
    ]
  },
  {
    "slug": "class-9-maths",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 9 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers all chapters of Class 9 Maths with questions on number systems, polynomials, geometry, and statistics. Solve this to strengthen your foundation for Class 10. This is a shortened practice set: 16 questions worth 35 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 35,
    "sections": [
      {
        "name": "Section A - MCQs",
        "marks": 5,
        "instructions": "Answer all 20 multiple choice questions.",
        "questions": [
          {
            "q": "Which of the following is a rational number? a) pi b) root 2 c) 3/4 d) e",
            "marks": 1,
            "answer": "c) 3/4"
          },
          {
            "q": "The degree of polynomial 3x^2 + 2x + 5 is",
            "marks": 1,
            "answer": "2"
          },
          {
            "q": "If x = 2, then the value of x^3 + 3x^2 - x - 3 is",
            "marks": 1,
            "answer": "15"
          },
          {
            "q": "The angle in a semicircle is",
            "marks": 1,
            "answer": "90 degrees"
          },
          {
            "q": "The volume of a sphere with radius r is",
            "marks": 1,
            "answer": "4/3 * pi * r^3"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Simplify: (2^3 * 3^2) / (2^2 * 3)",
            "marks": 2,
            "answer": "6"
          },
          {
            "q": "Factorize: x^2 + 5x + 6",
            "marks": 2,
            "answer": "(x + 2)(x + 3)"
          },
          {
            "q": "Find the area of a circle with radius 7 cm.",
            "marks": 2,
            "answer": "154 sq cm"
          },
          {
            "q": "Find the median of 5, 7, 3, 9, 1",
            "marks": 2,
            "answer": "5"
          },
          {
            "q": "If angle A = 60 degrees, what is angle B in a right triangle if the third angle is 30 degrees?",
            "marks": 2,
            "answer": "90 degrees"
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Express 0.37 as a fraction.",
            "marks": 3,
            "answer": "37/100"
          },
          {
            "q": "Prove that root 3 is irrational.",
            "marks": 3,
            "answer": "Assume root 3 is rational; derive a contradiction from even/odd division properties."
          },
          {
            "q": "Find the surface area of a cylinder with radius 5 cm and height 10 cm.",
            "marks": 3,
            "answer": "471.4 sq cm (or 150 pi sq cm)"
          },
          {
            "q": "A line passes through points (1, 2) and (3, 6). Find its equation.",
            "marks": 3,
            "answer": "y = 2x, or 2x - y = 0"
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Construct an angle of 75 degrees using compass and ruler.",
            "marks": 4,
            "answer": "Construct 60 degrees, then bisect the 30 degree angle; combine to get 75 degrees."
          },
          {
            "q": "Find the volume and surface area of a cube with side 5 cm.",
            "marks": 4,
            "answer": "Volume = 125 cu cm, Surface Area = 150 sq cm"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the main chapters in Class 9 Maths?",
        "a": "Number systems, polynomials, coordinate geometry, linear equations, triangles, circles, statistics, and probability."
      },
      {
        "q": "Is it necessary to memorize formulas for the exam?",
        "a": "Yes, formulas for area, volume, and algebraic identities must be memorized for quick problem-solving."
      },
      {
        "q": "How can I improve my geometry skills?",
        "a": "Practice construction problems regularly and understand the underlying theorems before solving numerical problems."
      }
    ]
  },
  {
    "slug": "class-9-science",
    "classLevel": "Class 9",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Science Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive sample paper covers Physics, Chemistry, and Biology chapters for Class 9. Practice to understand concepts thoroughly and prepare effectively for your board exams. This is a shortened practice set: 16 questions worth 35 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 35,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 5,
        "instructions": "Answer all 20 multiple choice questions.",
        "questions": [
          {
            "q": "The SI unit of force is",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Pure water has a pH of",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "The process by which plants make their own food is",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "The basic unit of life is",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "Which element is essential for plant growth?",
            "marks": 1,
            "answer": "Nitrogen"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Define velocity and speed. How do they differ?",
            "marks": 2,
            "answer": "Speed is scalar (magnitude only); velocity is vector (magnitude and direction)."
          },
          {
            "q": "What is an atom? Name its subatomic particles.",
            "marks": 2,
            "answer": "Atom is the basic unit of matter; contains protons, neutrons, and electrons."
          },
          {
            "q": "What is the function of chloroplast?",
            "marks": 2,
            "answer": "Photosynthesis occurs in chloroplast, converting light energy to chemical energy."
          },
          {
            "q": "Define acceleration. Give one example.",
            "marks": 2,
            "answer": "Acceleration is rate of change of velocity. Example: A car increasing its speed."
          },
          {
            "q": "What is the difference between mixture and compound?",
            "marks": 2,
            "answer": "Mixture can be separated physically; compound requires chemical methods to separate."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain Newton's first law of motion with an example.",
            "marks": 3,
            "answer": "Objects at rest stay at rest unless acted upon by force. Example: Sudden braking jerks passengers forward."
          },
          {
            "q": "What is mass number? How is it related to protons and neutrons?",
            "marks": 3,
            "answer": "Mass number is total protons plus neutrons in a nucleus."
          },
          {
            "q": "Describe the structure of a plant cell with functions of its organelles.",
            "marks": 3,
            "answer": "Plant cell has cell wall, chloroplasts, vacuoles; nucleus controls functions."
          },
          {
            "q": "What is respiration? Distinguish between aerobic and anaerobic respiration.",
            "marks": 3,
            "answer": "Respiration releases energy from food. Aerobic uses oxygen; anaerobic does not."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Explain the water cycle. How is it important for life on Earth?",
            "marks": 4,
            "answer": "Evaporation, condensation, precipitation cycle; distributes water and regulates climate."
          },
          {
            "q": "Describe the process of digestion in the human body starting from the mouth.",
            "marks": 4,
            "answer": "Mouth breaks food mechanically and chemically; stomach and small intestine continue breakdown."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the marks distribution in Class 9 Science?",
        "a": "Physics (30), Chemistry (30), Biology (20) marks; 20 marks for practical assessment."
      },
      {
        "q": "Which topics are most important for the board exam?",
        "a": "Force, motion, atoms, cells, photosynthesis, and respiration are high-weightage topics."
      },
      {
        "q": "Are practicals compulsory in Class 9 Science?",
        "a": "Yes, students must conduct prescribed practicals and maintain a proper lab notebook."
      }
    ]
  },
  {
    "slug": "class-9-english",
    "classLevel": "Class 9",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 9 English Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper integrates reading, writing, grammar, and literature covering all prescribed texts. Practice this paper to develop language proficiency and score well in the exam. This is a shortened practice set: 11 questions worth 42 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 42,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 11,
        "instructions": "Read the passages and answer questions based on comprehension.",
        "questions": [
          {
            "q": "What is the central theme of the passage? Explain in 3-4 sentences.",
            "marks": 4,
            "answer": "The passage explores themes of friendship, loyalty, and personal growth through relationships."
          },
          {
            "q": "Find synonyms from the passage for the following words: difficult, important, honest.",
            "marks": 3,
            "answer": "Challenging, crucial, truthful"
          },
          {
            "q": "Why did the character make this decision? Provide textual evidence.",
            "marks": 4,
            "answer": "Character made the decision because of concern for family welfare, as evidenced by specific passage reference."
          }
        ],
        "passage": "Meera had been Kabir's closest friend since Class 3, and in eleven years she had never once broken a promise to him. So when the letter from the engineering college in Pune arrived — the seat he had worked towards for two years — she was the first person he told, and the only one who noticed that his voice did not lift.\n\nThe truth was that his father's small printing press had been struggling for months. Leaving for Pune would mean no one to manage the shop, and the family's only income would stop. Kabir had already decided. He would defer the seat by a year, work at the press, and reapply when things were steadier. \"They fed me for eighteen years,\" he said quietly. \"One year is not a sacrifice. It's arithmetic.\"\n\nMeera did not try to argue him out of it, which was itself a kind of loyalty. She knew that some decisions are challenging not because the right path is unclear, but because the right path costs something. What she did instead was crucial: she spent that year helping him keep his mathematics sharp, sitting with him in the back room of the press between customers.\n\nKabir has always said that the year taught him more than the degree eventually did. He learned to be truthful with customers about what the press could and could not deliver, and he learned that growing up is mostly the business of discovering what you are willing to give up for the people you love. A friendship that survives that discovery, he says, is the only kind worth keeping."
      },
      {
        "name": "Section B - Writing",
        "marks": 10,
        "instructions": "Attempt the writing tasks as instructed.",
        "questions": [
          {
            "q": "Write a paragraph of 100-120 words on the topic: My Favorite Hobby",
            "marks": 5,
            "answer": "Paragraph should describe hobby, explain interest, and discuss its benefits or impact on life."
          },
          {
            "q": "Write a formal letter to the principal requesting exemption from school assembly.",
            "marks": 5,
            "answer": "Letter should include proper format, valid reason, and respectful tone."
          }
        ]
      },
      {
        "name": "Section C - Grammar",
        "marks": 7,
        "instructions": "Complete all grammar exercises.",
        "questions": [
          {
            "q": "Identify and correct the error: She dont like to play cricket.",
            "marks": 2,
            "answer": "She does not like to play cricket. (dont should be does not or doesn't)"
          },
          {
            "q": "Fill in with correct preposition: He is afraid ___ dogs.",
            "marks": 2,
            "answer": "of"
          },
          {
            "q": "Convert to indirect speech: She said, I am feeling tired.",
            "marks": 3,
            "answer": "She said that she was feeling tired."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 14,
        "instructions": "Answer questions based on prescribed poems and stories. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "What is the message of the poem? Explain with reference to the text.",
            "marks": 5,
            "answer": "The poem conveys importance of courage and perseverance in facing life's challenges."
          },
          {
            "q": "Analyze the character of the protagonist in the novel/story studied.",
            "marks": 5,
            "answer": "Protagonist demonstrates growth through overcoming internal conflicts and external obstacles."
          },
          {
            "q": "Explain the significance of the title of the work studied.",
            "marks": 4,
            "answer": "The title symbolically represents the central theme of transformation and self-discovery."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 9 English?",
        "a": "Class 9 English is out of 80 marks; 20 marks are for internal assessment."
      },
      {
        "q": "Which texts are prescribed for Class 9 English?",
        "a": "Beehive and Moments are the main textbooks; questions are based on poems and stories from these."
      },
      {
        "q": "How can I improve my comprehension skills?",
        "a": "Read diverse materials regularly, practice skimming and scanning, and answer comprehension questions daily."
      }
    ]
  },
  {
    "slug": "class-9-social-science",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Social Science Sample Paper 2026 (with Solutions)",
    "intro": "This integrated sample paper covers History, Geography, Political Science, and Economics for Class 9. Solve this to master concepts and prepare for your annual examination. This is a shortened practice set: 16 questions worth 35 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 35,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 5,
        "instructions": "Answer all 20 multiple choice questions.",
        "questions": [
          {
            "q": "The French Revolution took place in",
            "marks": 1,
            "answer": "1789"
          },
          {
            "q": "The Prime Meridian passes through",
            "marks": 1,
            "answer": "Greenwich, London"
          },
          {
            "q": "India's first President was",
            "marks": 1,
            "answer": "Dr. Rajendra Prasad"
          },
          {
            "q": "The Indian Constitution came into effect on",
            "marks": 1,
            "answer": "January 26, 1950"
          },
          {
            "q": "Which of the following is a fundamental right in India?",
            "marks": 1,
            "answer": "Right to Equality"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "What is socialism? Name any two socialist leaders.",
            "marks": 2,
            "answer": "Socialism advocates equal distribution of wealth. Leaders: Lenin, Stalin."
          },
          {
            "q": "What are the layers of Earth? Name them.",
            "marks": 2,
            "answer": "Crust, Mantle, Core (outer and inner)"
          },
          {
            "q": "What is the significance of the Preamble to the Indian Constitution?",
            "marks": 2,
            "answer": "It outlines the vision and values of the Constitution: justice, liberty, equality, fraternity."
          },
          {
            "q": "Define economic development. Give one example from India.",
            "marks": 2,
            "answer": "Economic development is improvement in living standards; Green Revolution in India is an example."
          },
          {
            "q": "What is the difference between latitude and longitude?",
            "marks": 2,
            "answer": "Latitude measures distance north-south; longitude measures distance east-west on Earth."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain the causes of the French Revolution.",
            "marks": 3,
            "answer": "Financial crisis, food scarcity, enlightenment ideas, and feudal oppression led to revolution."
          },
          {
            "q": "Describe the climate zones of India.",
            "marks": 3,
            "answer": "Tropical, subtropical, temperate zones exist; monsoon heavily influences Indian climate."
          },
          {
            "q": "What are fundamental duties? List any three from the Indian Constitution.",
            "marks": 3,
            "answer": "Constitutional obligations: respect Constitution, uphold sovereignty, defend nation, promote harmony."
          },
          {
            "q": "Explain the concept of poverty. How can it be reduced?",
            "marks": 3,
            "answer": "Poverty is deprivation of basic needs; reduced through education, employment, and social programs."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Describe the impact of Industrial Revolution on society and economy.",
            "marks": 4,
            "answer": "Industrialization changed manufacturing, urbanization, working conditions, and created modern capitalist economy."
          },
          {
            "q": "Explain the formation of soil. What are the factors affecting soil formation?",
            "marks": 4,
            "answer": "Soil forms from rock weathering; factors: climate, organisms, time, topography, parent rock material."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 9 Social Science?",
        "a": "History: French Revolution, Russian Revolution; Geography: Earth, climate; Civics: Constitution; Economics: poverty, sectors."
      },
      {
        "q": "Are map-based questions asked in the exam?",
        "a": "Yes, questions on physical features, countries, and capitals are common; practice map drawing regularly."
      },
      {
        "q": "How should I approach essay-type questions?",
        "a": "Plan your answer, write key points with examples, support with evidence, and organize logically."
      }
    ]
  },
  {
    "slug": "class-12-maths",
    "classLevel": "Class 12",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 12 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This advanced sample paper covers calculus, algebra, and statistics with focus on board exam patterns. Practice this comprehensive paper to secure high marks in the final exam. This is a shortened practice set: 15 questions worth 39 marks, following the 100-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 39,
    "sections": [
      {
        "name": "Section A - MCQs",
        "marks": 5,
        "instructions": "Answer all 20 multiple choice questions.",
        "questions": [
          {
            "q": "The derivative of e^x with respect to x is",
            "marks": 1,
            "answer": "e^x"
          },
          {
            "q": "The order of matrix AB where A is 3x2 and B is 2x4 is",
            "marks": 1,
            "answer": "3x4"
          },
          {
            "q": "The area under the curve y = x from x=0 to x=2 is",
            "marks": 1,
            "answer": "2"
          },
          {
            "q": "If A is a 2x2 matrix with det(A) = 5, then det(A^T) is",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "The integral of cos(x) is",
            "marks": 1,
            "answer": "sin(x) + c"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Find the derivative of log(x) + x^3 with respect to x.",
            "marks": 2,
            "answer": "1/x + 3x^2"
          },
          {
            "q": "Solve the differential equation dy/dx = 2x",
            "marks": 2,
            "answer": "y = x^2 + c"
          },
          {
            "q": "Find the inverse of matrix [[1, 2], [3, 4]]",
            "marks": 2,
            "answer": "[[-2, 1], [3/2, -1/2]]"
          },
          {
            "q": "Evaluate the integral from 0 to 1 of x dx",
            "marks": 2,
            "answer": "1/2"
          },
          {
            "q": "Find the critical points of f(x) = x^3 - 3x + 2",
            "marks": 2,
            "answer": "x = 1, x = -1"
          }
        ]
      },
      {
        "name": "Section C - Long Answer (4 marks)",
        "marks": 12,
        "instructions": "Answer all 3 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Solve the system of linear equations using matrices: 2x + y = 5, x + 2y = 4",
            "marks": 4,
            "answer": "x = 2, y = 1"
          },
          {
            "q": "Find the area bounded by the curve y = x^2, the x-axis, x = 1, and x = 2.",
            "marks": 4,
            "answer": "Area = 7/3 square units"
          },
          {
            "q": "Prove that the function f(x) = x^3 is strictly increasing on all real numbers.",
            "marks": 4,
            "answer": "f'(x) = 3x^2 >= 0, and equals zero only at isolated point x=0."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (6 marks)",
        "marks": 12,
        "instructions": "Answer all 2 questions with internal choices; each carrying 6 marks.",
        "questions": [
          {
            "q": "Solve the differential equation: dy/dx - 2y = e^(3x). OR Find the second derivative of sin(x^2) with respect to x.",
            "marks": 6,
            "answer": "Solution involves integrating factor method OR Chain rule applied twice."
          },
          {
            "q": "Find the maximum and minimum values of f(x) = x^3 - 3x^2 + 1 on the interval [0, 3].",
            "marks": 6,
            "answer": "Maximum = 1 at x = 0, Minimum = -3 at x = 2"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Maths board exam?",
        "a": "100 marks total: 80 marks for theory and 20 marks for internal assessment."
      },
      {
        "q": "Which chapters have highest weightage?",
        "a": "Calculus (integration and differentiation), linear algebra, and probability have significant weightage."
      },
      {
        "q": "Is a calculator allowed in the exam?",
        "a": "Non-programmable scientific calculators are allowed only for certain questions."
      }
    ]
  },
  {
    "slug": "class-12-physics",
    "classLevel": "Class 12",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 12 Physics Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive physics sample paper covers electromagnetism, optics, modern physics, and mechanics. Prepare thoroughly using this paper to excel in the board examination. This is a shortened practice set: 15 questions worth 34 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 34,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 4,
        "instructions": "Answer all 16 multiple choice questions.",
        "questions": [
          {
            "q": "The SI unit of electric field is",
            "marks": 1,
            "answer": "N/C or V/m"
          },
          {
            "q": "The refractive index of diamond is approximately",
            "marks": 1,
            "answer": "2.42"
          },
          {
            "q": "According to Einstein's photoelectric equation, the maximum kinetic energy of photoelectrons is",
            "marks": 1,
            "answer": "hf - phi, where phi is work function"
          },
          {
            "q": "The angle of minimum deviation for an equilateral prism is",
            "marks": 1,
            "answer": "60 degrees"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Define electric dipole moment. What is its SI unit?",
            "marks": 2,
            "answer": "Product of charge and separation: p = qd; SI unit is Coulomb-meter (C.m)"
          },
          {
            "q": "What is the focal length of a plane mirror? Explain.",
            "marks": 2,
            "answer": "Focal length of plane mirror is infinite because parallel rays do not converge."
          },
          {
            "q": "State Lenz's law. Give one example.",
            "marks": 2,
            "answer": "Induced current opposes the change causing it. Example: Magnetic field from induced current opposes change in flux."
          },
          {
            "q": "What is the threshold frequency in the photoelectric effect?",
            "marks": 2,
            "answer": "Minimum frequency of light needed to cause photoemission; f0 = phi/h"
          },
          {
            "q": "Define half-life. What is the half-life of U-238?",
            "marks": 2,
            "answer": "Time for half of nuclei to decay. Half-life of U-238 is approximately 4.5 billion years."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Derive the expression for electric field due to an infinite uniformly charged sheet.",
            "marks": 3,
            "answer": "E = sigma / (2 * epsilon0), independent of distance from sheet."
          },
          {
            "q": "Explain the phenomenon of total internal reflection. When does it occur?",
            "marks": 3,
            "answer": "Occurs when light travels from denser to rarer medium at angle greater than critical angle."
          },
          {
            "q": "Describe the working of a transformer. Write the transformer equation.",
            "marks": 3,
            "answer": "Step-up or step-down device; Vs/Vp = Ns/Np; uses electromagnetic induction."
          },
          {
            "q": "Explain photoelectric effect and its Einstein's explanation.",
            "marks": 3,
            "answer": "Light energy knocked out electrons; hf = phi + KE; explains why stopping potential is independent of intensity."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Derive Coulomb's law using Gauss's law.",
            "marks": 4,
            "answer": "For point charge, Gauss law gives E = q/(4*pi*epsilon0*r^2); force F = qE = kq1q2/r^2"
          },
          {
            "q": "Explain the principle and working of an AC generator.",
            "marks": 4,
            "answer": "Rotating coil in magnetic field; induced EMF = nBAlSinwt; converts mechanical to electrical energy."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Physics board exam?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which topics have the highest weightage?",
        "a": "Electrostatics, magnetism, electromagnetic induction, and optics carry significant weightage."
      },
      {
        "q": "Are derivations important for the exam?",
        "a": "Yes, derivations of important laws and formulas are frequently asked and carry 3-4 marks."
      }
    ]
  },
  {
    "slug": "class-12-chemistry",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "board": "CBSE",
    "title": "CBSE Class 12 Chemistry Sample Paper 2026 (with Solutions)",
    "intro": "This integrated chemistry sample paper covers organic, inorganic, and physical chemistry aligned with the board syllabus. Solve this to strengthen your chemistry concepts and exam readiness. This is a shortened practice set: 15 questions worth 34 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 34,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 4,
        "instructions": "Answer all 16 multiple choice questions.",
        "questions": [
          {
            "q": "The conjugate acid of HSO4- is",
            "marks": 1,
            "answer": "H2SO4"
          },
          {
            "q": "Which transition element has the highest melting point?",
            "marks": 1,
            "answer": "Tungsten (W)"
          },
          {
            "q": "The IUPAC name of CH3-CH(OH)-CH3 is",
            "marks": 1,
            "answer": "Propan-2-ol"
          },
          {
            "q": "Which of the following is a primary amine?",
            "marks": 1,
            "answer": "CH3NH2 (Methylamine)"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "What is the oxidation state of nitrogen in HNO3 and NO2?",
            "marks": 2,
            "answer": "In HNO3: +5; In NO2: +4"
          },
          {
            "q": "Define hydrolysis. Give an example of a salt that undergoes hydrolysis.",
            "marks": 2,
            "answer": "Hydrolysis is reaction with water affecting pH. Example: Na2CO3 salt hydrolyzes to produce basic solution."
          },
          {
            "q": "What is Le Chatelier's principle? State it.",
            "marks": 2,
            "answer": "When equilibrium is disturbed, system shifts to counteract the disturbance."
          },
          {
            "q": "Name two methods for the preparation of alcohols.",
            "marks": 2,
            "answer": "Hydration of alkenes, reduction of carbonyl compounds."
          },
          {
            "q": "What is the difference between esterification and saponification?",
            "marks": 2,
            "answer": "Esterification: alcohol + acid = ester; Saponification: ester + base = soap + alcohol."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain the structure of benzene and why it is stable.",
            "marks": 3,
            "answer": "Hexagonal structure with delocalized electrons; resonance provides stability; aromatic character."
          },
          {
            "q": "How are polymers classified? Name examples of each type.",
            "marks": 3,
            "answer": "Natural: starch, cellulose; Synthetic: polyethylene, PVC; Semi-synthetic: cellulose acetate."
          },
          {
            "q": "Explain the chromatic properties of transition metal complexes.",
            "marks": 3,
            "answer": "Color due to d-d transitions of electrons; wavelength of absorbed light determines color."
          },
          {
            "q": "What is the principle behind chromatography? Name the types.",
            "marks": 3,
            "answer": "Separation based on differential adsorption. Types: thin-layer, paper, gas, liquid chromatography."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Explain the mechanism of SN2 reaction with an example.",
            "marks": 4,
            "answer": "One-step bimolecular process; nucleophile attacks carbon from opposite side; inversion of configuration."
          },
          {
            "q": "Describe the reactivity of carbonyl compounds. How do they undergo nucleophilic addition?",
            "marks": 4,
            "answer": "Carbonyl carbon is electron-deficient; nucleophile attacks forming tetrahedral intermediate; elimination of water."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Chemistry board exam?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which chapters have highest weightage?",
        "a": "Organic chemistry reactions, chemical kinetics, and coordination chemistry are high-weightage topics."
      },
      {
        "q": "Are chemical equations required in answers?",
        "a": "Yes, balanced chemical equations are essential for mechanism and reaction-based questions."
      }
    ]
  },
  {
    "slug": "class-12-biology",
    "classLevel": "Class 12",
    "subject": "Biology",
    "board": "CBSE",
    "title": "CBSE Class 12 Biology Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive biology sample paper covers genetics, evolution, ecology, and human physiology aligned with the latest curriculum. Practice this to master all concepts for the board exam. This is a shortened practice set: 15 questions worth 34 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 34,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 4,
        "instructions": "Answer all 16 multiple choice questions.",
        "questions": [
          {
            "q": "The process by which organisms adapt to environment over generations is called",
            "marks": 1,
            "answer": "Evolution"
          },
          {
            "q": "Mendel's law of segregation applies to",
            "marks": 1,
            "answer": "Alleles of a gene during meiosis"
          },
          {
            "q": "The enzyme that unwinds DNA double helix during replication is",
            "marks": 1,
            "answer": "Helicase"
          },
          {
            "q": "Which of the following is a vector for plant genetic engineering?",
            "marks": 1,
            "answer": "Ti plasmid from Agrobacterium tumefaciens"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Define biodiversity. Why is it important?",
            "marks": 2,
            "answer": "Biodiversity is variety of organisms and genes; important for ecosystem stability and human survival."
          },
          {
            "q": "What is a genotype? How does it differ from phenotype?",
            "marks": 2,
            "answer": "Genotype is genetic makeup; phenotype is observable characteristics determined by genotype and environment."
          },
          {
            "q": "Explain the process of transcription. Where does it occur?",
            "marks": 2,
            "answer": "DNA converted to RNA by RNA polymerase; occurs in nucleus in eukaryotes."
          },
          {
            "q": "What is DNA replication? State the semi-conservative replication mechanism.",
            "marks": 2,
            "answer": "Each DNA strand serves as template for new strand; results in two identical DNA molecules."
          },
          {
            "q": "Define mutation. Give an example.",
            "marks": 2,
            "answer": "Mutation is change in DNA sequence. Example: Point mutation causing sickle cell anemia."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain the process of photosynthesis and its two main stages.",
            "marks": 3,
            "answer": "Light reactions occur in thylakoids producing ATP and NADPH; dark reactions in stroma fix CO2 into glucose."
          },
          {
            "q": "Describe the pathway of food through the digestive system.",
            "marks": 3,
            "answer": "Mouth -> esophagus -> stomach -> small intestine -> large intestine -> rectum -> anus."
          },
          {
            "q": "What is the immune response? Explain innate and adaptive immunity.",
            "marks": 3,
            "answer": "Body's defense against pathogens. Innate: non-specific, immediate; Adaptive: specific, develops over time."
          },
          {
            "q": "Explain the process of reproduction and importance of meiosis.",
            "marks": 3,
            "answer": "Meiosis produces haploid gametes; maintains chromosome number across generations; promotes genetic diversity."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Explain the genetic code and the process of translation.",
            "marks": 4,
            "answer": "Three nucleotides code for one amino acid; tRNA brings amino acids; ribosome assembles protein chains."
          },
          {
            "q": "Describe the process of respiration and ATP synthesis in mitochondria.",
            "marks": 4,
            "answer": "Glycolysis, Krebs cycle, electron transport chain; total ATP production approximately 30-32 per glucose."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 12 Biology board exam?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which topics have highest weightage?",
        "a": "Genetics, molecular biology, evolution, and ecology carry significant weightage in the exam."
      },
      {
        "q": "Are diagrams essential for biology answers?",
        "a": "Yes, labeled diagrams are required for processes like photosynthesis, respiration, and cell division."
      }
    ]
  },
  {
    "slug": "class-11-maths",
    "classLevel": "Class 11",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 11 Maths Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers complex numbers, sequences, trigonometry, and basic calculus concepts for Class 11. Practice this to build a strong foundation for advanced mathematics. This is a shortened practice set: 16 questions worth 43 marks, following the 100-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 43,
    "sections": [
      {
        "name": "Section A - MCQs",
        "marks": 5,
        "instructions": "Answer all 20 multiple choice questions.",
        "questions": [
          {
            "q": "The value of i^4 + i^8 + i^12 + i^16 is",
            "marks": 1,
            "answer": "4"
          },
          {
            "q": "If the nth term of an AP is 5n - 2, then the 10th term is",
            "marks": 1,
            "answer": "48"
          },
          {
            "q": "The value of tan(15 degrees) is",
            "marks": 1,
            "answer": "2 - root 3"
          },
          {
            "q": "The combination C(n, 0) + C(n, 1) + ... + C(n, n) equals",
            "marks": 1,
            "answer": "2^n"
          },
          {
            "q": "If A = {1, 2, 3} and B = {3, 4, 5}, then A intersect B is",
            "marks": 1,
            "answer": "{3}"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Find the modulus and argument of the complex number 1 + i.",
            "marks": 2,
            "answer": "Modulus = root 2, Argument = pi/4"
          },
          {
            "q": "Find the sum of the first 15 terms of AP: 3, 6, 9, ...",
            "marks": 2,
            "answer": "S15 = 360"
          },
          {
            "q": "Prove that sin(A + B) = sinA cosB + cosA sinB.",
            "marks": 2,
            "answer": "Use geometric or algebraic derivation with unit circle."
          },
          {
            "q": "Find the number of ways to arrange 5 books on a shelf.",
            "marks": 2,
            "answer": "5! = 120"
          },
          {
            "q": "If f(x) = 2x + 3, find f(f(2)).",
            "marks": 2,
            "answer": "f(f(2)) = 17"
          }
        ]
      },
      {
        "name": "Section C - Long Answer (4 marks)",
        "marks": 16,
        "instructions": "Answer all 4 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Solve: (2 + i)^2 and express in the form a + ib.",
            "marks": 4,
            "answer": "3 + 4i"
          },
          {
            "q": "Find the equation of a circle with center (2, 3) and radius 5.",
            "marks": 4,
            "answer": "(x - 2)^2 + (y - 3)^2 = 25"
          },
          {
            "q": "Prove that cos(3A) = 4cos^3(A) - 3cos(A).",
            "marks": 4,
            "answer": "Use multiple angle formula or expand cos(A + 2A)."
          },
          {
            "q": "Find the general solution of sin(x) = 1/2.",
            "marks": 4,
            "answer": "x = pi/6 + 2npi or x = 5pi/6 + 2npi, where n is an integer."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (6 marks)",
        "marks": 12,
        "instructions": "Answer all 2 questions with internal choices; each carrying 6 marks.",
        "questions": [
          {
            "q": "Derive the formula for the sum of n terms of a GP. OR Solve the inequality |x - 1| < 3 and represent on number line.",
            "marks": 6,
            "answer": "Sn = a(1-r^n)/(1-r) for r != 1. OR -2 < x < 4."
          },
          {
            "q": "Find the equation of the parabola with vertex (0, 0) and focus (2, 0).",
            "marks": 6,
            "answer": "y^2 = 8x"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 11 Maths?",
        "a": "100 marks total: 80 for theory and 20 for internal assessment."
      },
      {
        "q": "Which chapters are most important?",
        "a": "Complex numbers, sequences and series, trigonometry, and conic sections have significant weightage."
      },
      {
        "q": "Are proofs necessary for trigonometric identities?",
        "a": "Yes, formal proofs of important identities are often asked and carry 3-4 marks."
      }
    ]
  },
  {
    "slug": "class-11-physics",
    "classLevel": "Class 11",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 11 Physics Sample Paper 2026 (with Solutions)",
    "intro": "This foundational physics sample paper covers mechanics, thermodynamics, and waves for Class 11. Practice this to master core concepts essential for Class 12 and competitive exams. This is a shortened practice set: 15 questions worth 34 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 34,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 4,
        "instructions": "Answer all 16 multiple choice questions.",
        "questions": [
          {
            "q": "A vector cannot have",
            "marks": 1,
            "answer": "A component greater than its magnitude"
          },
          {
            "q": "The SI unit of acceleration is",
            "marks": 1,
            "answer": "m/s^2"
          },
          {
            "q": "Which of the following is a scalar quantity?",
            "marks": 1,
            "answer": "Temperature or speed or mass"
          },
          {
            "q": "In a projectile motion, at the highest point, the velocity is",
            "marks": 1,
            "answer": "Horizontal (in the direction of horizontal component)"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 10,
        "instructions": "Answer all 5 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Define relative velocity. Give one example.",
            "marks": 2,
            "answer": "Velocity of one object with respect to another. Example: Boat velocity relative to water."
          },
          {
            "q": "State the three laws of motion given by Newton.",
            "marks": 2,
            "answer": "Inertia, Force and acceleration (F=ma), Action-reaction."
          },
          {
            "q": "What is elastic collision? Give one example.",
            "marks": 2,
            "answer": "Collision where kinetic energy is conserved. Example: Collision between billiard balls."
          },
          {
            "q": "Define simple harmonic motion. Name one example.",
            "marks": 2,
            "answer": "Periodic motion where acceleration is proportional to displacement. Example: Simple pendulum."
          },
          {
            "q": "What is an ideal gas? State the ideal gas law.",
            "marks": 2,
            "answer": "Gas with negligible molecular size and intermolecular forces. PV = nRT."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Derive the equation of motion: v = u + at",
            "marks": 3,
            "answer": "Using definition of acceleration a = (v-u)/t, rearranging gives v = u + at."
          },
          {
            "q": "Explain the law of conservation of energy with an example.",
            "marks": 3,
            "answer": "Total mechanical energy is conserved. Example: Falling ball converts potential to kinetic energy."
          },
          {
            "q": "Describe the process of heat conduction and explain it microscopically.",
            "marks": 3,
            "answer": "Heat transfer through vibration of atoms; faster atoms transfer energy to slower ones."
          },
          {
            "q": "What is Doppler effect? Give real-life examples.",
            "marks": 3,
            "answer": "Change in frequency due to relative motion. Examples: Ambulance siren, radar speed detection."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (4 marks)",
        "marks": 8,
        "instructions": "Answer all 2 questions, each carrying 4 marks.",
        "questions": [
          {
            "q": "Derive the centripetal force equation for circular motion.",
            "marks": 4,
            "answer": "F = m*a_c = m*v^2/r = m*omega^2*r for uniform circular motion."
          },
          {
            "q": "Explain the first law of thermodynamics and derive its mathematical form.",
            "marks": 4,
            "answer": "dQ = dU + dW; relates heat absorbed, internal energy change, and work done."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks for Class 11 Physics?",
        "a": "70 marks for theory and 30 marks for practicals; total 100 marks."
      },
      {
        "q": "Which topics are most important?",
        "a": "Laws of motion, energy conservation, thermodynamics, and waves carry high weightage."
      },
      {
        "q": "Are derivations important in physics?",
        "a": "Yes, derivations of major equations are essential and often asked as part of long-answer questions."
      }
    ]
  },
  {
    "slug": "class-10-maths-set-2",
    "classLevel": "10",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 10 Mathematics Sample Paper 2026 Set 2 (with Solutions)",
    "intro": "This sample paper follows the latest CBSE curriculum with a mix of arithmetic, algebra, geometry, and statistics. Solve all sections carefully to master key concepts for your board exam.",
    "duration": "3 hours",
    "totalMarks": 110,
    "sections": [
      {
        "name": "Section A: Very Short Answer (1 mark each)",
        "marks": 20,
        "instructions": "Answer all 20 questions in 1-2 sentences.",
        "questions": [
          {
            "q": "Find the HCF of 36 and 48.",
            "marks": 1,
            "answer": "HCF(36, 48) = 12"
          },
          {
            "q": "If tan(A) = 3/4, find sin(A).",
            "marks": 1,
            "answer": "sin(A) = 3/5"
          },
          {
            "q": "Write the formula for the sum of first n natural numbers.",
            "marks": 1,
            "answer": "Sum = n(n+1)/2"
          },
          {
            "q": "A quadratic polynomial has roots 2 and -3. Write the polynomial.",
            "marks": 1,
            "answer": "x^2 + x - 6"
          },
          {
            "q": "Find the distance between points (0, 0) and (3, 4).",
            "marks": 1,
            "answer": "Distance = 5"
          },
          {
            "q": "If sin(theta) = 1/2, find cos(theta) where theta is acute.",
            "marks": 1,
            "answer": "cos(theta) = sqrt(3)/2"
          },
          {
            "q": "Write the general term of AP: 5, 8, 11, 14, ...",
            "marks": 1,
            "answer": "a_n = 3n + 2"
          },
          {
            "q": "Find the LCM of 12 and 18.",
            "marks": 1,
            "answer": "LCM = 36"
          },
          {
            "q": "If a circle has radius 7 cm, find its circumference.",
            "marks": 1,
            "answer": "Circumference = 14π cm or 44 cm"
          },
          {
            "q": "Solve: 2x + 3 = 11",
            "marks": 1,
            "answer": "x = 4"
          },
          {
            "q": "Find the median of 2, 5, 8, 9, 12.",
            "marks": 1,
            "answer": "Median = 8"
          },
          {
            "q": "What is the probability of getting a head when a coin is tossed?",
            "marks": 1,
            "answer": "Probability = 1/2"
          },
          {
            "q": "If base = 10 cm and height = 5 cm, find the area of a triangle.",
            "marks": 1,
            "answer": "Area = 25 cm^2"
          },
          {
            "q": "Find the 10th term of GP: 2, 6, 18, 54, ...",
            "marks": 1,
            "answer": "a_10 = 39366"
          },
          {
            "q": "Write the equation of line passing through (1, 2) with slope 3.",
            "marks": 1,
            "answer": "y = 3x - 1"
          },
          {
            "q": "If cos(A) = 4/5, find tan(A).",
            "marks": 1,
            "answer": "tan(A) = 3/4"
          },
          {
            "q": "Find the volume of a cube with side 5 cm.",
            "marks": 1,
            "answer": "Volume = 125 cm^3"
          },
          {
            "q": "Express 0.25 as a fraction.",
            "marks": 1,
            "answer": "1/4"
          },
          {
            "q": "If angle in a semicircle is 90 degrees, what is the angle subtended at the center for a quarter circle?",
            "marks": 1,
            "answer": "90 degrees"
          },
          {
            "q": "Find the range of 15, 20, 25, 10, 30.",
            "marks": 1,
            "answer": "Range = 20"
          }
        ]
      },
      {
        "name": "Section B: Short Answer (2 marks each)",
        "marks": 30,
        "instructions": "Answer any 10 questions from the 15 given, showing working.",
        "questions": [
          {
            "q": "Prove that sqrt(2) is irrational.",
            "marks": 2,
            "answer": "Assume sqrt(2) = p/q where gcd(p,q)=1. Then 2q^2 = p^2, so p is even, p=2k. Then 2q^2=4k^2, so q is even. This contradicts gcd(p,q)=1. Therefore sqrt(2) is irrational."
          },
          {
            "q": "Solve the pair of equations: x + y = 7 and x - y = 3.",
            "marks": 2,
            "answer": "Adding: 2x = 10, so x = 5. Subtracting: 2y = 4, so y = 2. Solution: x=5, y=2"
          },
          {
            "q": "Find the sum of first 20 terms of AP: 3, 7, 11, 15, ...",
            "marks": 2,
            "answer": "a=3, d=4, n=20. S_20 = 20/2(2*3 + 19*4) = 10(6+76) = 820"
          },
          {
            "q": "Two circles have radii 5 cm and 3 cm. Find the distance between centers if they touch externally.",
            "marks": 2,
            "answer": "When circles touch externally, distance between centers = r1 + r2 = 5 + 3 = 8 cm"
          },
          {
            "q": "If sin(A) = 12/13, find cos(A) and tan(A) where A is acute.",
            "marks": 2,
            "answer": "cos(A) = 5/13, tan(A) = 12/5"
          },
          {
            "q": "Find the coordinates of the midpoint of the line segment joining (2, 3) and (6, 7).",
            "marks": 2,
            "answer": "Midpoint = ((2+6)/2, (3+7)/2) = (4, 5)"
          },
          {
            "q": "A number is 5 more than another. Their product is 84. Find the numbers.",
            "marks": 2,
            "answer": "Let numbers be x and x+5. x(x+5)=84. x^2+5x-84=0. (x+12)(x-7)=0. x=7 or x=-12. Numbers are 7 and 12 or -12 and -7."
          },
          {
            "q": "Find the area of a circle with radius 7 cm.",
            "marks": 2,
            "answer": "Area = πr^2 = 49π cm^2 or approximately 154 cm^2"
          },
          {
            "q": "In a triangle ABC, if angle A = 60 degrees and angle B = 75 degrees, find angle C.",
            "marks": 2,
            "answer": "Sum of angles in a triangle = 180 degrees. angle C = 180 - 60 - 75 = 45 degrees"
          },
          {
            "q": "Find the mode of the data: 2, 3, 3, 5, 5, 5, 7, 9.",
            "marks": 2,
            "answer": "Mode = 5 (appears 3 times)"
          },
          {
            "q": "If a number is divisible by 2 and 3, is it divisible by 6? Why?",
            "marks": 2,
            "answer": "Yes, because 2 and 3 are coprime (gcd=1). By the property of divisibility, if a number is divisible by two coprime numbers, it is divisible by their product."
          },
          {
            "q": "Construct a triangle with sides 4 cm, 5 cm, and 6 cm.",
            "marks": 2,
            "answer": "Using compass and ruler: Draw base 5 cm. From one end mark arc of 4 cm. From other end mark arc of 6 cm. Join intersection point to both ends."
          },
          {
            "q": "Find the sum of angles in a polygon with 8 sides.",
            "marks": 2,
            "answer": "Sum = (n-2)*180 = (8-2)*180 = 6*180 = 1080 degrees"
          },
          {
            "q": "If 3 is a root of x^2 + kx - 12 = 0, find k.",
            "marks": 2,
            "answer": "Substitute x=3: 9 + 3k - 12 = 0. 3k = 3. k = 1"
          },
          {
            "q": "A train travels 300 km in 5 hours. Find its average speed.",
            "marks": 2,
            "answer": "Average speed = distance/time = 300/5 = 60 km/h"
          }
        ]
      },
      {
        "name": "Section C: Long Answer (4 marks each)",
        "marks": 60,
        "instructions": "Answer any 10 questions from the 15 given. Show full working and reasoning.",
        "questions": [
          {
            "q": "An arithmetic progression has first term a and common difference d. Find the sum of first n terms and derive it.",
            "marks": 4,
            "answer": "Let S_n = sum of first n terms. S_n = a + (a+d) + (a+2d) + ... + (a+(n-1)d). Writing in reverse: S_n = (a+(n-1)d) + ... + (a+d) + a. Adding: 2S_n = n(2a+(n-1)d). S_n = n/2(2a+(n-1)d) or n/2(first_term + last_term)."
          },
          {
            "q": "Two circles with centers O1 and O2 and radii r1=5 cm and r2=3 cm are such that the distance between centers is 4 cm. Prove that they intersect.",
            "marks": 4,
            "answer": "For two circles to intersect, distance d must satisfy |r1-r2| < d < r1+r2. Here |5-3| = 2 and 5+3 = 8. Since 2 < 4 < 8, the circles intersect at two points."
          },
          {
            "q": "Prove that angles in the same segment of a circle are equal.",
            "marks": 4,
            "answer": "Let circle have center O and points A, B, C, D on the circle in the same segment. Angles ACB and ADB both subtend the same arc AB. By the inscribed angle theorem, both angles equal half the central angle AOB. Therefore angle ACB = angle ADB."
          },
          {
            "q": "A shopkeeper bought items at Rs 50 per unit and sold at Rs 75 per unit. After selling 100 units, what is the profit percentage?",
            "marks": 4,
            "answer": "Cost price = 50*100 = 5000. Selling price = 75*100 = 7500. Profit = 7500 - 5000 = 2500. Profit % = (2500/5000)*100 = 50%"
          },
          {
            "q": "A quadrilateral ABCD has vertices A(1,2), B(4,2), C(4,5), D(1,5). Prove it is a rectangle and find its area.",
            "marks": 4,
            "answer": "Distance AB = 3, BC = 3, CD = 3, DA = 3. All sides equal. Diagonals AC and BD both = sqrt(18) = 3sqrt(2). Equal diagonals and equal sides mean it's a square. Area = 3*3 = 9 square units."
          },
          {
            "q": "If tan(A) + cot(A) = 2, find tan(A) and cot(A).",
            "marks": 4,
            "answer": "Let tan(A) = x. Then cot(A) = 1/x. x + 1/x = 2. x^2 - 2x + 1 = 0. (x-1)^2 = 0. x = 1. Therefore tan(A) = 1 and cot(A) = 1. So A = 45 degrees."
          },
          {
            "q": "Find the area of a triangle with vertices at A(0,0), B(4,0), and C(2,3).",
            "marks": 4,
            "answer": "Area = (1/2)|x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| = (1/2)|0(0-3) + 4(3-0) + 2(0-0)| = (1/2)|0 + 12 + 0| = 6 square units"
          },
          {
            "q": "Solve the quadratic equation 2x^2 - 5x + 2 = 0 using the quadratic formula.",
            "marks": 4,
            "answer": "x = (5 ± sqrt(25-16))/4 = (5 ± sqrt(9))/4 = (5 ± 3)/4. x = 8/4 = 2 or x = 2/4 = 1/2. Solutions: x = 2 or x = 1/2"
          },
          {
            "q": "A cone has height 12 cm and base radius 5 cm. Find its curved surface area and volume.",
            "marks": 4,
            "answer": "Slant height l = sqrt(h^2 + r^2) = sqrt(144 + 25) = sqrt(169) = 13 cm. Curved surface area = πrl = 65π cm^2. Volume = (1/3)πr^2h = (1/3)π*25*12 = 100π cm^3"
          },
          {
            "q": "In a data set of 10 numbers, the mean is 25. If one number 15 is replaced by 35, find the new mean.",
            "marks": 4,
            "answer": "Original sum = 25*10 = 250. New sum = 250 - 15 + 35 = 270. New mean = 270/10 = 27"
          },
          {
            "q": "Prove that the sum of opposite angles in a cyclic quadrilateral is 180 degrees.",
            "marks": 4,
            "answer": "In cyclic quadrilateral ABCD inscribed in a circle, angle A is inscribed in arc BCD and angle C is inscribed in arc BAD. These arcs together form the complete circle (360 degrees). By inscribed angle theorem, angle A = (arc BCD)/2 and angle C = (arc BAD)/2. angle A + angle C = ((arc BCD) + (arc BAD))/2 = 360/2 = 180 degrees."
          },
          {
            "q": "A ladder of length 13 meters leans against a wall. The foot of the ladder is 5 meters away from the wall. How high does the ladder reach on the wall?",
            "marks": 4,
            "answer": "Using Pythagoras theorem: h^2 + 5^2 = 13^2. h^2 + 25 = 169. h^2 = 144. h = 12 meters"
          },
          {
            "q": "Find the standard deviation of the data: 2, 4, 6, 8, 10.",
            "marks": 4,
            "answer": "Mean = 6. Variance = ((2-6)^2 + (4-6)^2 + (6-6)^2 + (8-6)^2 + (10-6)^2)/5 = (16+4+0+4+16)/5 = 40/5 = 8. Standard deviation = sqrt(8) = 2sqrt(2)"
          },
          {
            "q": "Two variables x and y have a linear relationship y = 3x + 2. If x increases by 5, how much does y increase?",
            "marks": 4,
            "answer": "The rate of change of y with respect to x is 3 (the slope). When x increases by 5, y increases by 3*5 = 15."
          },
          {
            "q": "Construct an angle of 60 degrees using compass and ruler. Then bisect it to get 30 degrees.",
            "marks": 4,
            "answer": "First construct 60 degrees: Draw a line, mark a point, draw an arc of any radius to intersect the line at two points, then from intersection points draw arcs of same radius to find a point forming 60 degrees. To bisect, place compass on the vertex, draw an arc, from the intersection points on the sides of 60 degrees arc, draw two arcs intersecting at a point. The line through this point and vertex bisects the angle to create 30 degrees."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the best way to prepare for CBSE Class 10 Maths exam?",
        "a": "Practice sample papers regularly, focus on understanding concepts rather than rote learning, solve previous years papers, and identify weak areas for targeted revision."
      },
      {
        "q": "How much time should I allocate for each section during the exam?",
        "a": "Allocate about 45 minutes for Section A (20 questions), 60 minutes for Section B (10 questions), and 75 minutes for Section C (10 questions), leaving 30 minutes for review."
      },
      {
        "q": "Are calculators allowed in CBSE Class 10 Maths?",
        "a": "No, calculators are not allowed. You must perform all calculations by hand using mathematical methods and formulas."
      }
    ]
  },
  {
    "slug": "class-10-science-set-2",
    "classLevel": "10",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Science Sample Paper 2026 Set 2 (with Solutions)",
    "intro": "This sample paper covers Physics, Chemistry, and Biology topics from the CBSE curriculum. Test your understanding of fundamental concepts and their real-world applications.",
    "duration": "3 hours",
    "totalMarks": 110,
    "sections": [
      {
        "name": "Section A: Multiple Choice (1 mark each)",
        "marks": 20,
        "instructions": "Choose the correct answer for each question.",
        "questions": [
          {
            "q": "Which of the following is a non-renewable resource? (a) Solar energy (b) Coal (c) Wind energy (d) Hydroelectric power",
            "marks": 1,
            "answer": "(b) Coal"
          },
          {
            "q": "The pH value of a neutral solution is: (a) 0 (b) 7 (c) 14 (d) >7",
            "marks": 1,
            "answer": "(b) 7"
          },
          {
            "q": "Which metal is most reactive? (a) Iron (b) Sodium (c) Copper (d) Gold",
            "marks": 1,
            "answer": "(b) Sodium"
          },
          {
            "q": "The speed of light in vacuum is approximately: (a) 3x10^8 m/s (b) 3x10^6 m/s (c) 3x10^4 m/s (d) 3x10^2 m/s",
            "marks": 1,
            "answer": "(a) 3x10^8 m/s"
          },
          {
            "q": "Which organelle is responsible for photosynthesis? (a) Mitochondria (b) Ribosome (c) Chloroplast (d) Golgi apparatus",
            "marks": 1,
            "answer": "(c) Chloroplast"
          },
          {
            "q": "The chemical formula of table salt is: (a) KCl (b) NaCl (c) CaCl2 (d) MgCl2",
            "marks": 1,
            "answer": "(b) NaCl"
          },
          {
            "q": "Which is a vector quantity? (a) Speed (b) Temperature (c) Velocity (d) Mass",
            "marks": 1,
            "answer": "(c) Velocity"
          },
          {
            "q": "The process by which plants make their own food is called: (a) Respiration (b) Photosynthesis (c) Transpiration (d) Fermentation",
            "marks": 1,
            "answer": "(b) Photosynthesis"
          },
          {
            "q": "What is the SI unit of electric current? (a) Volt (b) Ohm (c) Ampere (d) Watt",
            "marks": 1,
            "answer": "(c) Ampere"
          },
          {
            "q": "Which of these is a compound? (a) Oxygen (b) Nitrogen (c) Water (d) Argon",
            "marks": 1,
            "answer": "(c) Water"
          },
          {
            "q": "The force of attraction between the earth and an object is: (a) Normal force (b) Gravity (c) Friction (d) Magnetic force",
            "marks": 1,
            "answer": "(b) Gravity"
          },
          {
            "q": "Which blood cells fight infections? (a) Red blood cells (b) White blood cells (c) Platelets (d) Plasma",
            "marks": 1,
            "answer": "(b) White blood cells"
          },
          {
            "q": "The number of chambers in a human heart is: (a) 2 (b) 3 (c) 4 (d) 5",
            "marks": 1,
            "answer": "(c) 4"
          },
          {
            "q": "What type of reaction is combustion? (a) Decomposition (b) Combination (c) Oxidation (d) Reduction",
            "marks": 1,
            "answer": "(c) Oxidation"
          },
          {
            "q": "The wavelength of visible light is approximately: (a) 400-700 nm (b) 100-200 nm (c) 800-900 nm (d) 1000-1100 nm",
            "marks": 1,
            "answer": "(a) 400-700 nm"
          },
          {
            "q": "Which metal does not react with dilute hydrochloric acid? (a) Iron (b) Zinc (c) Copper (d) Calcium",
            "marks": 1,
            "answer": "(c) Copper"
          },
          {
            "q": "The process of conversion of glucose into ethanol is: (a) Respiration (b) Fermentation (c) Photosynthesis (d) Decomposition",
            "marks": 1,
            "answer": "(b) Fermentation"
          },
          {
            "q": "Ohm's law states that: (a) V=IR (b) P=VI (c) R=V/I (d) All of the above",
            "marks": 1,
            "answer": "(d) All of the above"
          },
          {
            "q": "Which hormone controls blood glucose levels? (a) Insulin (b) Adrenaline (c) Thyroxine (d) Cortisol",
            "marks": 1,
            "answer": "(a) Insulin"
          },
          {
            "q": "The principle behind electrolysis is based on: (a) Faraday's law (b) Newton's law (c) Boyle's law (d) Charles's law",
            "marks": 1,
            "answer": "(a) Faraday's law"
          }
        ]
      },
      {
        "name": "Section B: Short Answer (2 marks each)",
        "marks": 30,
        "instructions": "Answer any 10 questions briefly.",
        "questions": [
          {
            "q": "What is the difference between exothermic and endothermic reactions? Give one example of each.",
            "marks": 2,
            "answer": "Exothermic reactions release heat (burning wood). Endothermic reactions absorb heat (melting ice)."
          },
          {
            "q": "Explain the greenhouse effect and its impact on climate.",
            "marks": 2,
            "answer": "Greenhouse gases trap heat in the atmosphere, preventing it from escaping to space. This causes global warming and climate change."
          },
          {
            "q": "What are the three states of matter? Describe the arrangement of particles in each.",
            "marks": 2,
            "answer": "Solid: particles closely packed in fixed positions. Liquid: particles close but can move freely. Gas: particles far apart and move randomly."
          },
          {
            "q": "How does the human circulatory system work? Name its main components.",
            "marks": 2,
            "answer": "Heart pumps blood through arteries to body tissues and veins return it. Components: heart, arteries, veins, capillaries, blood."
          },
          {
            "q": "What is the difference between mitosis and meiosis?",
            "marks": 2,
            "answer": "Mitosis produces two identical daughter cells (2n). Meiosis produces four haploid cells (n) for reproduction."
          },
          {
            "q": "Define refraction. How does it occur when light enters a denser medium?",
            "marks": 2,
            "answer": "Refraction is bending of light at an interface. Light slows in denser medium, causing the ray to bend toward the normal."
          },
          {
            "q": "What is the role of enzymes in digestion?",
            "marks": 2,
            "answer": "Enzymes act as biological catalysts, speeding up the breakdown of food into smaller molecules that can be absorbed."
          },
          {
            "q": "Distinguish between acids and bases using pH values.",
            "marks": 2,
            "answer": "Acids have pH < 7 (sour taste, turn blue litmus red). Bases have pH > 7 (bitter taste, turn red litmus blue)."
          },
          {
            "q": "What is osmosis? Why is it important for cells?",
            "marks": 2,
            "answer": "Osmosis is movement of water across a semipermeable membrane from dilute to concentrated solution. It maintains cell turgor and prevents dehydration."
          },
          {
            "q": "Explain the role of chlorophyll in photosynthesis.",
            "marks": 2,
            "answer": "Chlorophyll absorbs light energy (especially red and blue wavelengths) and converts it to chemical energy in the form of ATP and NADPH."
          },
          {
            "q": "What is the difference between renewable and non-renewable resources? Give examples.",
            "marks": 2,
            "answer": "Renewable resources can be replenished (solar, wind, water). Non-renewable resources are finite (coal, oil, natural gas)."
          },
          {
            "q": "How does temperature affect the rate of a chemical reaction?",
            "marks": 2,
            "answer": "Higher temperature increases molecular collisions, increasing reaction rate. Lower temperature decreases collisions and slows the reaction."
          },
          {
            "q": "What is the function of stomata in leaves?",
            "marks": 2,
            "answer": "Stomata allow gas exchange (CO2 enters, O2 exits) and water vapor loss. They regulate water and gas movement."
          },
          {
            "q": "Define focal length and explain its relationship with power of a lens.",
            "marks": 2,
            "answer": "Focal length is distance from lens to focal point. Power = 1/f (in meters). Thicker lenses have shorter focal length and higher power."
          },
          {
            "q": "What are the symptoms of deficiency of Vitamin C in the human body?",
            "marks": 2,
            "answer": "Weakness, bleeding gums, poor wound healing, anemia. The disease is called Scurvy."
          }
        ]
      },
      {
        "name": "Section C: Long Answer (4 marks each)",
        "marks": 60,
        "instructions": "Answer any 10 questions with detailed explanations.",
        "questions": [
          {
            "q": "Describe the process of photosynthesis. Write the chemical equation and explain the roles of light and dark reactions.",
            "marks": 4,
            "answer": "Photosynthesis: 6CO2 + 6H2O + light energy = C6H12O6 + 6O2. Light reaction occurs in thylakoids, producing ATP and NADPH. Dark reaction (Calvin cycle) in stroma uses ATP and NADPH to fix CO2 into glucose."
          },
          {
            "q": "Explain the structure and function of mitochondria. Why is it called the powerhouse of the cell?",
            "marks": 4,
            "answer": "Mitochondria has double membrane with cristae. Inner membrane has electron transport chain. It performs aerobic respiration, producing ATP (energy). Called powerhouse because it generates most cellular energy through oxidation of nutrients."
          },
          {
            "q": "Describe the process of refraction through a prism. How do different colors separate?",
            "marks": 4,
            "answer": "Light enters prism and refracts toward normal. Different wavelengths refract differently (shorter wavelengths bend more). Red (longer wavelength) bends less, violet (shorter) bends more. This creates dispersion into spectrum."
          },
          {
            "q": "Explain the process of rusting of iron. What conditions are necessary? How can it be prevented?",
            "marks": 4,
            "answer": "Rusting is oxidation of iron to form iron oxide. Requires iron, oxygen, and water. Prevention: painting, galvanizing, oiling, alloying with chromium (stainless steel)."
          },
          {
            "q": "Describe the human nervous system. Distinguish between the central and peripheral nervous systems and their functions.",
            "marks": 4,
            "answer": "Nervous system processes information and coordinates responses. CNS (brain and spinal cord) processes signals. PNS (nerves) carries signals between CNS and body. Somatic PNS controls voluntary muscles, autonomic controls involuntary functions."
          },
          {
            "q": "Explain the concept of evolution and natural selection as proposed by Darwin.",
            "marks": 4,
            "answer": "Evolution is gradual change in organisms over time. Natural selection: organisms with advantageous traits survive and reproduce more. Over generations, beneficial traits become common. Species adapt to environments, sometimes leading to new species."
          },
          {
            "q": "Describe the process of digestion in the human body. Name the enzymes involved and their substrates.",
            "marks": 4,
            "answer": "Digestion breaks food mechanically and chemically. In mouth: salivary amylase breaks starch. Stomach: pepsin breaks proteins. Small intestine: trypsin (protein), lipase (fat), amylase (carbs). Nutrients absorbed through intestinal lining."
          },
          {
            "q": "Explain the law of conservation of mass in chemical reactions with an example.",
            "marks": 4,
            "answer": "Matter cannot be created or destroyed. In a reaction, total mass of reactants equals total mass of products. Example: 2H2 + O2 = 2H2O. Mass of hydrogen and oxygen in reactants equals mass of water in product."
          },
          {
            "q": "Describe the structure of DNA. Explain how DNA replicates during cell division.",
            "marks": 4,
            "answer": "DNA: double helix of two strands of nucleotides (A, T, G, C). A pairs with T, G with C. Replication: helicase unwinds strands, DNA polymerase adds complementary nucleotides, resulting in two identical copies."
          },
          {
            "q": "Explain how a simple electric circuit works. Describe the flow of electrons and the role of voltage.",
            "marks": 4,
            "answer": "Circuit: closed path for current flow. Voltage (EMF) from battery drives electrons through circuit. Electrons flow from negative to positive terminal (actual direction opposite to conventional current direction). Resistance opposes flow, power = V*I."
          },
          {
            "q": "Describe the process of reproduction in plants. Explain the difference between sexual and asexual reproduction.",
            "marks": 4,
            "answer": "Sexual reproduction: pollen fertilizes ovule, producing seeds with genetic variation. Asexual: vegetative growth produces identical offspring (runners, bulbs). Sexual provides genetic diversity, asexual is faster."
          },
          {
            "q": "Explain the concept of pH and buffer solutions. How do buffers maintain constant pH?",
            "marks": 4,
            "answer": "pH measures H+ ion concentration (log scale 0-14). Buffer: weak acid and its salt (or weak base and its salt). When acid added, anion neutralizes it. When base added, weak acid neutralizes it. Maintains relatively constant pH."
          },
          {
            "q": "Describe the water cycle. Explain the processes involved and their importance to ecosystems.",
            "marks": 4,
            "answer": "Water cycle: evaporation (sun heats water), condensation (forms clouds), precipitation (rain/snow), runoff, infiltration. Cycles water between atmosphere, land, and ocean. Essential for all life, regulates climate."
          },
          {
            "q": "Explain the concept of reflection and refraction of light. How are they different?",
            "marks": 4,
            "answer": "Reflection: light bounces off surface, angle of incidence equals angle of reflection. Refraction: light bends at interface between media due to change in speed. Reflection changes direction without changing medium, refraction occurs at boundaries."
          },
          {
            "q": "Describe the structure and function of the human respiratory system. Explain gas exchange in alveoli.",
            "marks": 4,
            "answer": "System: nose, trachea, bronchi, lungs. Air enters through nose, travels down to alveoli (air sacs). In alveoli: CO2 diffuses from blood into alveolus, O2 diffuses from alveolus into blood. Diffusion driven by concentration gradient."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the importance of practicing CBSE Science sample papers?",
        "a": "Sample papers help you understand the exam pattern, practice time management, identify weak topics, and build confidence for the actual exam."
      },
      {
        "q": "Should I study all topics equally for CBSE Class 10 Science?",
        "a": "While all topics are important, focus more on chapters with higher weightage. However, do not completely neglect any topic as even small chapters can contribute marks."
      },
      {
        "q": "How can I improve my understanding of complex Science concepts?",
        "a": "Use diagrams, create mind maps, perform experiments, watch educational videos, and discuss concepts with peers or teachers to gain deeper understanding."
      }
    ]
  },
  {
    "slug": "class-10-hindi",
    "classLevel": "10",
    "subject": "Hindi",
    "board": "CBSE",
    "title": "CBSE Class 10 Hindi Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper tests your Hindi language skills including reading comprehension, grammar, writing, and literature. Master both prose and poetry from the CBSE curriculum. This is a shortened practice set: 14 questions worth 75 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 75,
    "sections": [
      {
        "name": "Section A: Reading Comprehension (15 marks)",
        "marks": 15,
        "instructions": "Read the passage and answer all questions.",
        "questions": [
          {
            "q": "ईश्वर को कहाँ खोजा जा सकता है?",
            "marks": 3,
            "answer": "ईश्वर को प्रकृति में, पेड़ों में, पक्षियों में, नदियों में और सभी जीवों में खोजा जा सकता है। उसे सर्वव्यापी माना जाता है।"
          },
          {
            "q": "प्रकृति से जुड़ने से क्या लाभ होता है?",
            "marks": 3,
            "answer": "प्रकृति से जुड़ने से हमें आत्मिक शांति मिलती है।"
          },
          {
            "q": "पाठ के अनुसार, ईश्वर के किन स्थानों पर दर्शन किए जा सकते हैं?",
            "marks": 3,
            "answer": "पेड़ों में, पक्षियों में, नदियों में और अन्य सभी जीवों में।"
          },
          {
            "q": "इस पाठ का मुख्य विचार क्या है?",
            "marks": 3,
            "answer": "प्रकृति में ईश्वर का दर्शन करना और प्रकृति से जुड़कर आत्मिक शांति प्राप्त करना।"
          },
          {
            "q": "ईश्वर को समझना क्यों कठिन है?",
            "marks": 3,
            "answer": "क्योंकि वह सर्वव्यापी है और सभी जीवों में व्याप्त है, जिसे सीधे समझना मनुष्य के लिए कठिन है।"
          }
        ],
        "passage": "ईश्वर के वास्तविक रूप को समझना मनुष्य के लिए कठिन है। वह सर्वव्यापी है और सभी जीवों में निवास करता है। आँखों से न दिखाई देने वाली इस शक्ति को केवल बुद्धि से नहीं, अनुभव से जाना जाता है।\n\nहमें अपने आसपास की प्रकृति में उसके दर्शन करने चाहिए। पेड़ों में, पक्षियों में, नदियों में उसी महान शक्ति का अस्तित्व है। जो व्यक्ति सुबह उगते सूर्य को, बहती नदी को और खिलते फूल को ध्यान से देखता है, वह धीरे-धीरे इस सत्य के निकट पहुँचता है।\n\nजब हम प्रकृति से जुड़ते हैं, तो हमें आत्मिक शांति मिलती है। मन का शोर कम होता है और भीतर एक स्थिरता आती है। यही कारण है कि हमारे ऋषि-मुनि वनों में निवास करते थे। वे जानते थे कि प्रकृति की गोद ही सच्चा मंदिर है, जहाँ बिना किसी आडंबर के ईश्वर के दर्शन किए जा सकते हैं।"
      },
      {
        "name": "Section B: Grammar and Writing (35 marks)",
        "marks": 30,
        "instructions": "Complete all grammar and writing exercises.",
        "questions": [
          {
            "q": "निम्नलिखित वाक्य को शुद्ध करो: वह कहा कि मैं घर जाओ। (5 marks)",
            "marks": 5,
            "answer": "शुद्ध वाक्य: वह कहा कि मैं घर जाऊँ। अथवा वह कहता है कि मैं घर जाऊँ।"
          },
          {
            "q": "निम्नलिखित शब्दों का समानार्थक शब्द लिखो: (i) ज्ञान (ii) गति (iii) शांति (iv) सौंदर्य (v) साहस (5 marks)",
            "marks": 5,
            "answer": "(i) विद्या (ii) चाल (iii) शांति/मौन (iv) सुंदरता (v) वीरता"
          },
          {
            "q": "विलोम शब्द लिखो: (i) गर्म (ii) अंधकार (iii) सुख (iv) आने (v) बड़ा (5 marks)",
            "marks": 5,
            "answer": "(i) ठंडा (ii) प्रकाश (iii) दुख (iv) जाना (v) छोटा"
          },
          {
            "q": "निम्नलिखित मुहावरों का अर्थ बताओ और वाक्य में प्रयोग करो: (i) अंगूठा दिखाना (ii) नाक में दम करना (5 marks)",
            "marks": 5,
            "answer": "(i) अस्वीकार करना/इंकार करना। वाक्य: जब मैंने उससे काम मांगा तो उसने अंगूठा दिखा दिया। (ii) परेशान करना। वाक्य: इस बीमारी ने हमें नाक में दम कर दिया।"
          },
          {
            "q": "दिए गए विषय पर 100 शब्दों में निबंध लिखो: आधुनिक शिक्षा का महत्व (10 marks)",
            "marks": 10,
            "answer": "आधुनिक शिक्षा का महत्व: आज का समय तकनीकी और ज्ञान के विकास का समय है। आधुनिक शिक्षा छात्रों को वास्तविक जीवन के लिए तैयार करती है। यह केवल पुस्तकों तक सीमित नहीं है, बल्कि व्यावहारिक ज्ञान भी देती है। कंप्यूटर, इंटरनेट और अन्य तकनीकें आधुनिक शिक्षा का मुख्य अंग हैं। आधुनिक शिक्षा से छात्र आत्मनिर्भर बनते हैं और समाज में अपना योगदान दे सकते हैं। विश्व प्रतिस्पर्धा में भारत को आगे बढ़ाने के लिए गुणवत्तापूर्ण आधुनिक शिक्षा आवश्यक है।"
          }
        ]
      },
      {
        "name": "Section C: Literature (30 marks)",
        "marks": 30,
        "instructions": "Answer questions based on prescribed texts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "किसी एक कविता का सारांश 50 शब्दों में लिखो और उसका केंद्रीय संदेश बताओ। (8 marks)",
            "marks": 8,
            "answer": "छात्र अपनी पाठ्यक्रम की कविता का सारांश लिख सकते हैं। उदाहरण: यदि 'सखी वह कहत नटत मुस्कुराय' कविता है तो: राधा कृष्ण के प्रेम को दर्शाती है। कृष्ण की मुस्कुराहट और नटखटपन को दर्शाया गया है। केंद्रीय संदेश: दिव्य प्रेम और भक्ति भावना।"
          },
          {
            "q": "किसी पाठ के मुख्य पात्र का चरित्र चित्रण करो (100 शब्द)। (8 marks)",
            "marks": 8,
            "answer": "छात्र अपने पाठ्यक्रम के किसी पात्र का विस्तृत चरित्र विश्लेषण कर सकते हैं। उदाहरण यदि 'आत्मकथ्य' पाठ है तो अज्ञेय का चरित्र: कवि स्वयं को कालजयी बताते हैं। वे स्वतंत्रता की भावना रखते हैं। साहस और निडरता उनके प्रमुख गुण हैं। समाज की परिपाटियों को चुनौती देने का साहस।"
          },
          {
            "q": "एक प्रश्न का उत्तर 80 शब्दों में दो: पाठ का प्रमुख विषय क्या है? (7 marks)",
            "marks": 7,
            "answer": "छात्र अपने पाठ्यक्रम के किसी पाठ का विषय समझाएं। उदाहरण: यदि 'बड़े भाई साहब' पाठ है तो: इस पाठ का मुख्य विषय बड़े और छोटे भाई के बीच का संबंध है। बड़े भाई की जिम्मेदारी और छोटे भाई की मासूमियत को दर्शाया गया है। शिक्षा और जीवन दर्शन की भी चर्चा है। पारिवारिक मूल्यों का महत्व प्रतिपादित है।"
          },
          {
            "q": "काव्य में आए किसी अलंकार का उदाहरण देकर समझाओ। (7 marks)",
            "marks": 7,
            "answer": "उदाहरण: 'मुखचंद्र' में उपमा अलंकार है। चेहरा चाँद के समान सुंदर है। यहाँ मुख की तुलना चंद्र से की गई है। अलंकार से काव्य की सुंदरता बढ़ती है और भाव व्यक्ति होता है। अन्य अलंकार: रूपक, यमक, श्लेष आदि।"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "CBSE Class 10 Hindi परीक्षा में कितने अंक निर्धारित हैं?",
        "a": "कुल 80 अंक हैं। Reading (15 अंक), Grammar & Writing (35 अंक), और Literature (30 अंक) में विभाजित।"
      },
      {
        "q": "निबंध लेखन के लिए कितना समय आवंटित करना चाहिए?",
        "a": "निबंध लेखन के लिए लगभग 20-25 मिनट का समय देना चाहिए ताकि आप सुव्यवस्थित और सुंदर लेखन कर सकें।"
      },
      {
        "q": "साहित्य प्रश्नों का उत्तर देते समय क्या सावधानी रखनी चाहिए?",
        "a": "पाठ्यक्रम के निर्धारित पाठों से ही उदाहरण दें, प्रश्नों का प्रत्यक्ष उत्तर दें, और सुंदर हिंदी में लिखें।"
      }
    ]
  },
  {
    "slug": "class-9-maths-set-2",
    "classLevel": "9",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 9 Mathematics Sample Paper 2026 Set 2 (with Solutions)",
    "intro": "This comprehensive sample paper tests your knowledge of Class 9 Maths including number systems, geometry, and statistics. Practice regularly to strengthen your foundation for higher classes.",
    "duration": "3 hours",
    "totalMarks": 110,
    "sections": [
      {
        "name": "Section A: Multiple Choice",
        "marks": 20,
        "instructions": "Choose the correct option for each of the 20 questions.",
        "questions": [
          {
            "q": "sqrt(144) = ? (a) 12 (b) 14 (c) 11 (d) 13",
            "marks": 1,
            "answer": "(a) 12"
          },
          {
            "q": "The value of pi to two decimal places is: (a) 3.12 (b) 3.14 (c) 3.16 (d) 3.18",
            "marks": 1,
            "answer": "(b) 3.14"
          },
          {
            "q": "A quadrilateral with all sides equal and all angles 90 is: (a) Rectangle (b) Square (c) Rhombus (d) Trapezoid",
            "marks": 1,
            "answer": "(b) Square"
          },
          {
            "q": "The sum of interior angles of a triangle is: (a) 90 (b) 180 (c) 270 (d) 360",
            "marks": 1,
            "answer": "(b) 180"
          },
          {
            "q": "Area of a rectangle with length 5 cm and width 3 cm is: (a) 8 (b) 15 (c) 16 (d) 10",
            "marks": 1,
            "answer": "(b) 15"
          },
          {
            "q": "Which is a perfect cube? (a) 8 (b) 12 (c) 18 (d) 20",
            "marks": 1,
            "answer": "(a) 8"
          },
          {
            "q": "The average of 10, 20, 30 is: (a) 15 (b) 20 (c) 25 (d) 30",
            "marks": 1,
            "answer": "(b) 20"
          },
          {
            "q": "If x + 5 = 12, then x = ? (a) 5 (b) 6 (c) 7 (d) 8",
            "marks": 1,
            "answer": "(c) 7"
          },
          {
            "q": "Circumference of a circle with radius 7 cm: (a) 22 cm (b) 44 cm (c) 154 cm (d) 77 cm",
            "marks": 1,
            "answer": "(b) 44 cm"
          },
          {
            "q": "Probability of getting heads in a coin toss: (a) 0 (b) 0.5 (c) 1 (d) 2",
            "marks": 1,
            "answer": "(b) 0.5"
          },
          {
            "q": "3^3 = ? (a) 9 (b) 18 (c) 27 (d) 81",
            "marks": 1,
            "answer": "(c) 27"
          },
          {
            "q": "HCF of 12 and 18 is: (a) 2 (b) 3 (c) 6 (d) 12",
            "marks": 1,
            "answer": "(c) 6"
          },
          {
            "q": "Area of a circle with radius 5 cm: (a) 78.5 (b) 31.4 (c) 25 (d) 50",
            "marks": 1,
            "answer": "(a) 78.5"
          },
          {
            "q": "Perimeter of a square with side 6 cm: (a) 12 (b) 18 (c) 24 (d) 36",
            "marks": 1,
            "answer": "(c) 24"
          },
          {
            "q": "LCM of 4 and 6 is: (a) 2 (b) 12 (c) 24 (d) 6",
            "marks": 1,
            "answer": "(b) 12"
          },
          {
            "q": "2.5 + 3.7 = ? (a) 5.2 (b) 6.2 (c) 6.1 (d) 6.3",
            "marks": 1,
            "answer": "(b) 6.2"
          },
          {
            "q": "The number of sides in a hexagon: (a) 4 (b) 5 (c) 6 (d) 7",
            "marks": 1,
            "answer": "(c) 6"
          },
          {
            "q": "If 2x = 10, then x = ? (a) 4 (b) 5 (c) 6 (d) 7",
            "marks": 1,
            "answer": "(b) 5"
          },
          {
            "q": "Median of 5, 8, 12, 15, 20: (a) 8 (b) 12 (c) 15 (d) 20",
            "marks": 1,
            "answer": "(b) 12"
          },
          {
            "q": "Volume of a cube with side 3 cm: (a) 9 (b) 18 (c) 27 (d) 81",
            "marks": 1,
            "answer": "(c) 27"
          }
        ]
      },
      {
        "name": "Section B: Short Answer",
        "marks": 30,
        "instructions": "Answer any 10 questions briefly with working.",
        "questions": [
          {
            "q": "Find the value of 2^5 + 3^2.",
            "marks": 2,
            "answer": "2^5 = 32, 3^2 = 9. Sum = 32 + 9 = 41"
          },
          {
            "q": "Solve: 3x - 7 = 14",
            "marks": 2,
            "answer": "3x = 21. x = 7"
          },
          {
            "q": "Find the area of a triangle with base 10 cm and height 6 cm.",
            "marks": 2,
            "answer": "Area = (1/2) * base * height = (1/2) * 10 * 6 = 30 cm^2"
          },
          {
            "q": "Express 0.75 as a fraction in simplest form.",
            "marks": 2,
            "answer": "0.75 = 75/100 = 3/4"
          },
          {
            "q": "Find the distance between (0, 0) and (5, 12) using distance formula.",
            "marks": 2,
            "answer": "Distance = sqrt(5^2 + 12^2) = sqrt(25 + 144) = sqrt(169) = 13"
          },
          {
            "q": "If a + b = 10 and a - b = 2, find a and b.",
            "marks": 2,
            "answer": "Adding: 2a = 12, a = 6. From first: b = 4. Answer: a = 6, b = 4"
          },
          {
            "q": "Find the perimeter of a rectangle with length 8 cm and width 5 cm.",
            "marks": 2,
            "answer": "Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26 cm"
          },
          {
            "q": "Calculate 15% of 200.",
            "marks": 2,
            "answer": "(15/100) * 200 = 0.15 * 200 = 30"
          },
          {
            "q": "Find two consecutive integers whose sum is 25.",
            "marks": 2,
            "answer": "Let integers be x and x+1. x + (x+1) = 25. 2x + 1 = 25. x = 12. Integers are 12 and 13"
          },
          {
            "q": "Find the mode of 2, 3, 3, 5, 5, 5, 7.",
            "marks": 2,
            "answer": "Mode = 5 (appears 3 times)"
          },
          {
            "q": "Expand (a + b)(a - b).",
            "marks": 2,
            "answer": "(a + b)(a - b) = a^2 - b^2"
          },
          {
            "q": "Find the sum of first 5 natural numbers.",
            "marks": 2,
            "answer": "1 + 2 + 3 + 4 + 5 = 15 or (5*6)/2 = 15"
          },
          {
            "q": "If a rectangle has area 48 cm^2 and length 8 cm, find width.",
            "marks": 2,
            "answer": "Area = length * width. 48 = 8 * width. width = 6 cm"
          },
          {
            "q": "Convert 2/5 to decimal.",
            "marks": 2,
            "answer": "2/5 = 0.4"
          },
          {
            "q": "Find the LCM and HCF of 12 and 15.",
            "marks": 2,
            "answer": "HCF(12, 15) = 3. LCM(12, 15) = 60"
          }
        ]
      },
      {
        "name": "Section C: Long Answer",
        "marks": 60,
        "instructions": "Answer any 10 questions with detailed working.",
        "questions": [
          {
            "q": "A quadrilateral ABCD has angles A = 80, B = 100, C = 85. Find angle D. Explain your method.",
            "marks": 4,
            "answer": "Sum of angles in quadrilateral = 360 degrees. A + B + C + D = 360. 80 + 100 + 85 + D = 360. D = 360 - 265 = 95 degrees"
          },
          {
            "q": "Prove that (a + b)^2 = a^2 + 2ab + b^2 algebraically.",
            "marks": 4,
            "answer": "(a + b)^2 = (a + b)(a + b) = a(a + b) + b(a + b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2"
          },
          {
            "q": "A store offers 25% discount on items. If original price is 800, find selling price.",
            "marks": 4,
            "answer": "Discount = 25% of 800 = (25/100) * 800 = 200. Selling price = 800 - 200 = 600"
          },
          {
            "q": "Construct a triangle with sides 5 cm, 6 cm, and 7 cm.",
            "marks": 4,
            "answer": "Using compass: Draw base 6 cm. From one end, arc of radius 5 cm. From other end, arc of radius 7 cm. Join intersection point to both ends."
          },
          {
            "q": "A number is 5 more than another. Their product is 66. Find the numbers.",
            "marks": 4,
            "answer": "Let numbers be x and x+5. x(x+5) = 66. x^2 + 5x - 66 = 0. (x + 11)(x - 6) = 0. x = 6 or x = -11. Numbers are 6 and 11 or -11 and -6"
          },
          {
            "q": "Find the area and perimeter of a circle with radius 7 cm.",
            "marks": 4,
            "answer": "Area = πr^2 = π(7)^2 = 49π = 153.86 cm^2 (approx). Perimeter = 2πr = 2π(7) = 14π = 43.96 cm (approx)"
          },
          {
            "q": "Explain the difference between rational and irrational numbers with examples.",
            "marks": 4,
            "answer": "Rational: can be expressed as p/q (p, q integers, q not 0). Examples: 1/2, 3, -5/4. Irrational: cannot be expressed as p/q, non-terminating non-repeating decimals. Examples: sqrt(2), pi, e"
          },
          {
            "q": "A triangle has angles in ratio 1:2:3. Find all three angles.",
            "marks": 4,
            "answer": "Let angles be x, 2x, 3x. Sum = 180. x + 2x + 3x = 180. 6x = 180. x = 30. Angles are 30, 60, 90 degrees"
          },
          {
            "q": "Solve the pair of equations: 2x + y = 7 and x - y = 2. Find x and y.",
            "marks": 4,
            "answer": "Adding equations: 3x = 9, x = 3. From second: 3 - y = 2, y = 1. Solution: x = 3, y = 1"
          },
          {
            "q": "A trapezoid has parallel sides 8 cm and 12 cm, height 5 cm. Find area.",
            "marks": 4,
            "answer": "Area = (1/2)(sum of parallel sides)(height) = (1/2)(8 + 12)(5) = (1/2)(20)(5) = 50 cm^2"
          },
          {
            "q": "Find the sum of all even numbers from 1 to 50.",
            "marks": 4,
            "answer": "Even numbers: 2, 4, 6, ..., 50 form an AP with a=2, d=2, l=50. n = (50-2)/2 + 1 = 25. Sum = (25/2)(2+50) = (25/2)(52) = 650"
          },
          {
            "q": "Explain how to construct perpendicular bisector of a line segment.",
            "marks": 4,
            "answer": "Using compass: Place compass on one end, open more than half length, draw arcs above and below line. From other end, draw arcs same radius intersecting first arcs. Line through intersection points is perpendicular bisector."
          },
          {
            "q": "A cylinder has radius 5 cm and height 10 cm. Find its volume.",
            "marks": 4,
            "answer": "Volume = πr^2h = π(5)^2(10) = 250π = 785.4 cm^3 (approx)"
          },
          {
            "q": "Simplify: (3a^2 + 2a - 5) / (a - 1)",
            "marks": 4,
            "answer": "Factor numerator: 3a^2 + 2a - 5 = (3a + 5)(a - 1). Simplify: (3a + 5)(a - 1)/(a - 1) = 3a + 5"
          },
          {
            "q": "Find three consecutive odd numbers whose sum is 51.",
            "marks": 4,
            "answer": "Let numbers be x, x+2, x+4. Sum = 51. x + x+2 + x+4 = 51. 3x + 6 = 51. x = 15. Numbers are 15, 17, 19"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are most important for CBSE Class 9 Maths?",
        "a": "Number systems, polynomials, linear equations, geometry (triangles, circles), statistics and probability are key topics with high weightage."
      },
      {
        "q": "How can I improve my speed in solving Maths problems?",
        "a": "Practice regularly with sample papers, memorize formulas, identify patterns, and attempt to solve mentally for simple calculations."
      },
      {
        "q": "Is calculator allowed in Class 9 Maths exam?",
        "a": "No, calculators are not allowed. All calculations must be done by hand using mathematical methods and formulas."
      }
    ]
  },
  {
    "slug": "class-8-maths",
    "classLevel": "8",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 8 Mathematics Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers the fundamental concepts of Class 8 Maths including algebra, geometry, and data handling. Master the basics to build a strong foundation.",
    "duration": "3 hours",
    "totalMarks": 100,
    "sections": [
      {
        "name": "Section A: Short Questions",
        "marks": 40,
        "instructions": "Answer all questions briefly.",
        "questions": [
          {
            "q": "Simplify: 3(a + 2b) - 2(a - b)",
            "marks": 2,
            "answer": "3a + 6b - 2a + 2b = a + 8b"
          },
          {
            "q": "Find the value of x if 2x + 5 = 21",
            "marks": 2,
            "answer": "2x = 16. x = 8"
          },
          {
            "q": "What is the area of a square with side 9 cm?",
            "marks": 2,
            "answer": "Area = 9^2 = 81 cm^2"
          },
          {
            "q": "Solve: x/3 = 5",
            "marks": 2,
            "answer": "x = 5 * 3 = 15"
          },
          {
            "q": "Find the perimeter of a rectangle with length 8 cm and width 5 cm.",
            "marks": 2,
            "answer": "Perimeter = 2(8 + 5) = 26 cm"
          },
          {
            "q": "What is 20% of 150?",
            "marks": 2,
            "answer": "(20/100) * 150 = 30"
          },
          {
            "q": "Simplify: 2x + 3x - x",
            "marks": 2,
            "answer": "4x"
          },
          {
            "q": "Find the circumference of a circle with radius 5 cm.",
            "marks": 2,
            "answer": "Circumference = 2πr = 2π(5) = 10π = 31.4 cm (approx)"
          },
          {
            "q": "Solve: 3x - 7 = 11",
            "marks": 2,
            "answer": "3x = 18. x = 6"
          },
          {
            "q": "What is the mean of 5, 10, 15, 20?",
            "marks": 2,
            "answer": "Mean = (5 + 10 + 15 + 20)/4 = 50/4 = 12.5"
          },
          {
            "q": "Express 3/4 as a percentage.",
            "marks": 2,
            "answer": "(3/4) * 100 = 75%"
          },
          {
            "q": "Solve: 5x = 45",
            "marks": 2,
            "answer": "x = 9"
          },
          {
            "q": "Find the area of a triangle with base 8 cm and height 6 cm.",
            "marks": 2,
            "answer": "Area = (1/2) * 8 * 6 = 24 cm^2"
          },
          {
            "q": "What is the volume of a cube with side 4 cm?",
            "marks": 2,
            "answer": "Volume = 4^3 = 64 cm^3"
          },
          {
            "q": "Simplify: (2x + 3) + (3x - 1)",
            "marks": 2,
            "answer": "5x + 2"
          },
          {
            "q": "Find 15% of 200.",
            "marks": 2,
            "answer": "(15/100) * 200 = 30"
          },
          {
            "q": "Solve: x - 8 = 12",
            "marks": 2,
            "answer": "x = 20"
          },
          {
            "q": "What is the mode of 2, 3, 3, 5, 7, 3?",
            "marks": 2,
            "answer": "Mode = 3"
          },
          {
            "q": "Find the median of 1, 3, 5, 7, 9.",
            "marks": 2,
            "answer": "Median = 5"
          },
          {
            "q": "Simplify: 4a^2 - 2a^2 + a^2",
            "marks": 2,
            "answer": "3a^2"
          }
        ]
      },
      {
        "name": "Section B: Long Answer Questions",
        "marks": 60,
        "instructions": "Answer any 10 questions with detailed working.",
        "questions": [
          {
            "q": "Solve: 2(x + 3) = 16 and verify your answer.",
            "marks": 4,
            "answer": "2x + 6 = 16. 2x = 10. x = 5. Verify: 2(5 + 3) = 2(8) = 16. Correct."
          },
          {
            "q": "A rectangle has length twice its width. If perimeter is 30 cm, find length and width.",
            "marks": 4,
            "answer": "Let width = w, length = 2w. Perimeter = 2(2w + w) = 30. 6w = 30. w = 5 cm, length = 10 cm"
          },
          {
            "q": "Find the area of a circle with diameter 14 cm.",
            "marks": 4,
            "answer": "Radius = 7 cm. Area = πr^2 = π(7)^2 = 49π = 153.86 cm^2"
          },
          {
            "q": "Simplify: 3(2x - 1) + 2(x + 3) - 5",
            "marks": 4,
            "answer": "6x - 3 + 2x + 6 - 5 = 8x - 2"
          },
          {
            "q": "A number increased by 15 is 40. Find the number.",
            "marks": 4,
            "answer": "Let number = x. x + 15 = 40. x = 25"
          },
          {
            "q": "Find the area and perimeter of a square with side 7 cm.",
            "marks": 4,
            "answer": "Area = 7^2 = 49 cm^2. Perimeter = 4 * 7 = 28 cm"
          },
          {
            "q": "Solve: 4x + 3 = 2x + 11",
            "marks": 4,
            "answer": "4x - 2x = 11 - 3. 2x = 8. x = 4"
          },
          {
            "q": "What is the selling price of an item with cost 500 and profit 20%?",
            "marks": 4,
            "answer": "Profit = 20% of 500 = 100. Selling price = 500 + 100 = 600"
          },
          {
            "q": "A cylinder has radius 3 cm and height 10 cm. Find volume.",
            "marks": 4,
            "answer": "Volume = πr^2h = π(3)^2(10) = 90π = 282.6 cm^3"
          },
          {
            "q": "Express 45% as a fraction in simplest form.",
            "marks": 4,
            "answer": "45% = 45/100 = 9/20"
          },
          {
            "q": "Solve the pair: x + y = 8 and x - y = 2.",
            "marks": 4,
            "answer": "Adding: 2x = 10, x = 5. From first: y = 3. Solution: x = 5, y = 3"
          },
          {
            "q": "A store offers 30% discount. Original price is 1000. Find selling price.",
            "marks": 4,
            "answer": "Discount = 30% of 1000 = 300. Selling price = 1000 - 300 = 700"
          },
          {
            "q": "Find the sum of angles in a hexagon.",
            "marks": 4,
            "answer": "Sum = (n - 2) * 180 = (6 - 2) * 180 = 4 * 180 = 720 degrees"
          },
          {
            "q": "Construct a triangle with angles 60, 60, 60. What type of triangle is it?",
            "marks": 4,
            "answer": "All angles equal 60 degrees. This is an equilateral triangle. All sides are equal."
          },
          {
            "q": "A tank is filled 3/4. How much more is needed to fill completely?",
            "marks": 4,
            "answer": "Remaining = 1 - 3/4 = 1/4. Therefore, 1/4 of the tank is needed to fill it completely."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the main topics in CBSE Class 8 Mathematics?",
        "a": "Rational numbers, algebra, geometry, mensuration, data handling, and exponents are key topics."
      },
      {
        "q": "How should I approach word problems in Class 8 Maths?",
        "a": "Read carefully, identify what is given and what to find, set up equations, solve step-by-step, and verify your answer."
      },
      {
        "q": "Is it necessary to memorize all formulas?",
        "a": "Yes, formulas are important. Write them down regularly and practice their application to remember them better."
      }
    ]
  },
  {
    "slug": "class-12-english",
    "classLevel": "12",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 12 English Sample Paper 2026 (with Solutions)",
    "intro": "This advanced sample paper covers critical reading, analytical writing, and literary appreciation for Class 12 CBSE. Develop sophisticated language and interpretation skills.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "marks": 20,
        "instructions": "Read the passage and answer all questions.",
        "questions": [
          {
            "q": "This passage discusses: (a) Only benefits of AI (b) AI and its broader implications (c) Only job losses (d) Technology history",
            "marks": 4,
            "answer": "(b) AI and its broader implications"
          },
          {
            "q": "What dual nature of AI is presented in the passage?",
            "marks": 4,
            "answer": "The passage presents both positive aspects (reshaping industries, enabling insights) and negative concerns (job displacement, ethical issues)."
          },
          {
            "q": "Explain the phrase unprecedented insights in context.",
            "marks": 4,
            "answer": "Unprecedented insights means never-before-seen understandings or discoveries made possible by AI analyzing large amounts of data at speeds impossible for humans."
          },
          {
            "q": "Discuss the relevance of ethical implications in AI development.",
            "marks": 4,
            "answer": "Ethical implications are important because AI decisions affect human lives. Bias in algorithms, privacy concerns, and accountability require careful consideration."
          },
          {
            "q": "How does the author present a balanced view of AI?",
            "marks": 4,
            "answer": "By acknowledging both transformative benefits and legitimate concerns, avoiding a one-sided perspective."
          }
        ],
        "passage": "Artificial intelligence is reshaping industries from healthcare to finance. In hospitals, diagnostic models now flag patterns in scans that a tired human eye may miss on a long shift; in banking, fraud is intercepted in the seconds between a card being swiped and a transaction clearing. Machine learning algorithms analyse vast datasets, enabling unprecedented insights — conclusions no researcher could have reached by hand, drawn from volumes of data no team could read in a lifetime.\n\nYet concerns about job displacement and ethical implications persist, and they deserve to be taken seriously rather than dismissed as pessimism. Roles built on routine analysis are already thinning, and the workers affected are rarely the ones best placed to retrain. The ethical questions cut deeper still. An algorithm trained on biased historical data will reproduce that bias and lend it the false authority of mathematics. Systems that predict behaviour require personal information, placing privacy under steady pressure. And when an automated decision causes harm — a loan refused, a diagnosis missed — accountability becomes genuinely difficult to assign.\n\nNeither enthusiasm nor alarm is an adequate response on its own. The honest position holds both at once: that these tools are transforming what is possible, and that the transformation carries real costs which thoughtful regulation and design must address. Technology of this reach is neither a saviour nor a threat. It is an instrument, and what it becomes depends on the care with which it is built."
      },
      {
        "name": "Section B: Writing Skills",
        "marks": 30,
        "instructions": "Complete all writing tasks with sophistication and clarity.",
        "questions": [
          {
            "q": "Write a formal proposal to your school regarding implementation of digital learning resources. (10 marks)",
            "marks": 10,
            "answer": "Sample: Proposal: Digital Learning Initiative. Objective: Integrate technology in classroom. Rationale: Enhances engagement, enables personalized learning, prepares students for digital world. Implementation: Provide devices, train teachers, develop digital curriculum. Benefits: Improved outcomes, student motivation. Budget: [specify]. Timeline: [specify]. This proposal would modernize our educational approach."
          },
          {
            "q": "Write a critical review of a film or novel you have studied. (10 marks)",
            "marks": 10,
            "answer": "Sample: Title: A Thoughtful Examination. The work presents complex themes through layered narrative. Strengths: character development, thematic depth, literary style. Weaknesses: pacing issues, predictable ending. Overall impact: significant, though with limitations. The author/director effectively explores [theme] while engaging the audience. Rating: 4/5 stars."
          },
          {
            "q": "Write a formal speech on a contemporary issue for a public forum. (10 marks)",
            "marks": 10,
            "answer": "Sample speech on climate action: Honorable guests, today we address climate change. Rising temperatures threaten our future. We must transition to renewable energy, reduce emissions, and protect ecosystems. Individual responsibility combined with policy changes can reverse damage. Our generation must act now for future generations. Together, we can create sustainable change."
          }
        ]
      },
      {
        "name": "Section C: Literature and Appreciation",
        "marks": 30,
        "instructions": "Answer with critical depth and textual support. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Analyse the narrative structure of a drama or novel you have studied. How does it contribute to meaning?",
            "marks": 10,
            "answer": "Students should analyze: chronological/non-linear structure, flashbacks, parallel narratives, their purpose, how structure reveals themes, how it affects reader/audience understanding, textual examples."
          },
          {
            "q": "Discuss the protagonist's moral journey or ethical dilemma in a text you have studied. (10 marks)",
            "marks": 10,
            "answer": "Students should: identify dilemma, trace protagonist's struggle, analyze choices made, consequences, growth or lack thereof, author's commentary on morality, relevance to contemporary readers."
          },
          {
            "q": "Compare thematic concerns across two texts you have studied. How does each author address similar/different issues? (10 marks)",
            "marks": 10,
            "answer": "Students compare: identify theme in both texts, analyze how each author explores it, different perspectives/conclusions, textual evidence, significance of differences, what this reveals about the authors."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What strategies should I use for Class 12 reading comprehension?",
        "a": "Understand main idea, analyze tone/intention, support answers with textual evidence, read questions multiple times, manage time efficiently."
      },
      {
        "q": "How do I write a strong analytical essay for literature?",
        "a": "Develop clear thesis, use topic sentences, provide textual evidence, analyze quotes, discuss implications, maintain critical tone throughout."
      },
      {
        "q": "What is expected in Class 12 creative writing pieces?",
        "a": "Sophisticated vocabulary, complex sentence structures, originality in ideas, proper form (letter/speech/story), and depth of thought beyond basic narratives."
      }
    ]
  },
  {
    "slug": "class-10-maths-set-3",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 10 Mathematics Sample Paper Set 3",
    "intro": "This sample paper follows the latest CBSE Class 10 Mathematics curriculum with a balanced mix of algebra, geometry, trigonometry, and statistics. Practice real exam-pattern questions covering all chapters with detailed solutions. This is a shortened practice set: 41 questions worth 75 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 75,
    "sections": [
      {
        "name": "Section A - Very Short Answer",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "Find the HCF of 24 and 36.",
            "marks": 1,
            "answer": "12"
          },
          {
            "q": "If the pair of linear equations has unique solution, then the lines are called?",
            "marks": 1,
            "answer": "Intersecting lines"
          },
          {
            "q": "What is the discriminant of quadratic equation x^2 + 2x + 1 = 0?",
            "marks": 1,
            "answer": "0"
          },
          {
            "q": "Find the sum of first 10 natural numbers.",
            "marks": 1,
            "answer": "55"
          },
          {
            "q": "In a circle, if angle at center is 60 degrees, what is the angle at circumference subtended by same arc?",
            "marks": 1,
            "answer": "30 degrees"
          },
          {
            "q": "Find the value of sin 45 degrees.",
            "marks": 1,
            "answer": "1/sqrt(2) or sqrt(2)/2"
          },
          {
            "q": "What is the formula for volume of sphere?",
            "marks": 1,
            "answer": "4/3 * pi * r^3"
          },
          {
            "q": "If P(A) = 0.5 and P(B) = 0.3, find P(not A)?",
            "marks": 1,
            "answer": "0.5"
          },
          {
            "q": "Find the mode of data: 2, 3, 3, 4, 5, 5, 5, 6.",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "Write the distance formula between two points (x1, y1) and (x2, y2).",
            "marks": 1,
            "answer": "sqrt((x2-x1)^2 + (y2-y1)^2)"
          },
          {
            "q": "A quadratic polynomial having zeros 2 and 3 is?",
            "marks": 1,
            "answer": "x^2 - 5x + 6"
          },
          {
            "q": "Find the common difference of AP: 5, 10, 15, 20.",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "If tan A = 3/4, find sin A.",
            "marks": 1,
            "answer": "3/5"
          },
          {
            "q": "What is the surface area of cube with side a?",
            "marks": 1,
            "answer": "6a^2"
          },
          {
            "q": "Find the mean of 10, 20, 30, 40, 50.",
            "marks": 1,
            "answer": "30"
          },
          {
            "q": "Two lines are parallel if their slopes are?",
            "marks": 1,
            "answer": "Equal"
          },
          {
            "q": "Find the LCM of 12 and 18.",
            "marks": 1,
            "answer": "36"
          },
          {
            "q": "A tangent to a circle is perpendicular to the radius at the point of?",
            "marks": 1,
            "answer": "Contact"
          },
          {
            "q": "If a = 2, b = 3, then (a + b)^2 equals?",
            "marks": 1,
            "answer": "25"
          },
          {
            "q": "The probability of an impossible event is?",
            "marks": 1,
            "answer": "0"
          }
        ]
      },
      {
        "name": "Section B - Short Answer",
        "marks": 24,
        "instructions": "Attempt all questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "Solve 2x + 3y = 5 and 3x - 2y = 4 using substitution method.",
            "marks": 2,
            "answer": "x = 2, y = 1/3"
          },
          {
            "q": "Find the roots of quadratic equation 2x^2 - 7x + 3 = 0 using factorization.",
            "marks": 2,
            "answer": "x = 3/2 or x = 1"
          },
          {
            "q": "If an AP has first term 5 and common difference 2, find the 10th term.",
            "marks": 2,
            "answer": "23"
          },
          {
            "q": "Prove that sqrt(2) is irrational.",
            "marks": 2,
            "answer": "Assume sqrt(2) = p/q, then 2q^2 = p^2, showing 2 divides both p and q, contradicting coprimality"
          },
          {
            "q": "In triangle ABC, angle A = 60 degrees, angle B = 80 degrees, find angle C.",
            "marks": 2,
            "answer": "40 degrees"
          },
          {
            "q": "If two chords are equal, prove they are equidistant from the center.",
            "marks": 2,
            "answer": "Using perpendicular from center bisects equal chords equally"
          },
          {
            "q": "Find the area of a sector with radius 7 cm and central angle 60 degrees.",
            "marks": 2,
            "answer": "49pi/6 cm^2 or approximately 25.67 cm^2"
          },
          {
            "q": "Two dice are thrown together. Find probability of getting sum 7.",
            "marks": 2,
            "answer": "6/36 = 1/6"
          },
          {
            "q": "Find the median of 12, 15, 18, 22, 25.",
            "marks": 2,
            "answer": "18"
          },
          {
            "q": "If cos A = 5/13, find all trigonometric ratios of A.",
            "marks": 2,
            "answer": "sin A = 12/13, tan A = 12/5, cot A = 5/12, sec A = 13/5, cosec A = 13/12"
          },
          {
            "q": "Find the distance between parallel lines 3x + 4y + 5 = 0 and 3x + 4y - 10 = 0.",
            "marks": 2,
            "answer": "3 units"
          },
          {
            "q": "A circle passes through (0,0), (4,0), (0,3). Find its center and radius.",
            "marks": 2,
            "answer": "Center: (2, 1.5), Radius: 2.5"
          }
        ]
      },
      {
        "name": "Section C - Long Answer",
        "marks": 31,
        "instructions": "Attempt all questions. Each question carries 3 or 4 marks.",
        "questions": [
          {
            "q": "Two pillars of equal height are 100 m apart. From a point between them on the ground, the angles of elevation to the tops are 30 and 60 degrees. Find height of pillars.",
            "marks": 4,
            "answer": "Height = 25*sqrt(3) meters or approximately 43.3 meters"
          },
          {
            "q": "A bag contains 5 red and 3 blue balls. Two balls are drawn without replacement. Find probability of getting one red and one blue ball.",
            "marks": 3,
            "answer": "15/56"
          },
          {
            "q": "If the sum of n terms of an AP is 3n^2 + 5n, find the 12th term and common difference.",
            "marks": 3,
            "answer": "12th term = 77, common difference = 6"
          },
          {
            "q": "Construct a triangle ABC with sides 5 cm, 6 cm, 7 cm and then construct a triangle similar to it with scale factor 2/3.",
            "marks": 4,
            "answer": "Construction steps: Draw triangle ABC, then construct similar triangle AB'C' with sides in ratio 2/3"
          },
          {
            "q": "A cone has base radius 7 cm and height 24 cm. Find total surface area and volume.",
            "marks": 4,
            "answer": "Volume = 1232 cm^3, Total surface area = 704 cm^2"
          },
          {
            "q": "Solve the pair of equations graphically: x + y = 6 and x - y = 2.",
            "marks": 3,
            "answer": "x = 4, y = 2 (intersection point)"
          },
          {
            "q": "Find the sum of first 20 terms of AP with first term 3 and last term 61.",
            "marks": 3,
            "answer": "640"
          },
          {
            "q": "Prove that the tangent at any point of a circle is perpendicular to the radius through that point.",
            "marks": 3,
            "answer": "By contradiction using definition of tangent and properties of circles"
          },
          {
            "q": "Two towers stand 100 m apart. From a point on the ground between them, angles of elevation are 45 and 30 degrees. Find heights if both are equal.",
            "marks": 4,
            "answer": "Height = 50*(sqrt(3)-1) meters"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for CBSE Class 10 Mathematics?",
        "a": "The exam is of 80 marks with 3 hours duration. It includes MCQ (20 marks), short answer (24 marks), and long answer (36 marks) questions covering all chapters."
      },
      {
        "q": "How many chapters are in Class 10 Mathematics syllabus?",
        "a": "There are 15 chapters including Number Systems, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Circles, Areas Related to Circles, Surface Areas and Volumes, Statistics, and Probability."
      },
      {
        "q": "What is the best way to prepare for Class 10 Mathematics?",
        "a": "Practice previous year papers and sample papers regularly, understand concepts thoroughly, solve all textbook exercises, and focus on problem-solving techniques and formula applications."
      }
    ]
  },
  {
    "slug": "class-10-science-set-3",
    "classLevel": "Class 10",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 10 Science Sample Paper Set 3",
    "intro": "This comprehensive sample paper covers Physics, Chemistry, and Biology chapters with a balanced mix of theoretical and practical questions. Master all concepts with original CBSE-pattern problems and detailed answers. This is a shortened practice set: 38 questions worth 74 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 74,
    "sections": [
      {
        "name": "Section A - Multiple Choice and Very Short Answer",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "What is the SI unit of force?",
            "marks": 1,
            "answer": "Newton (N)"
          },
          {
            "q": "The process by which green plants make their own food is called?",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "What is the atomic number of Oxygen?",
            "marks": 1,
            "answer": "8"
          },
          {
            "q": "The speed of light in vacuum is approximately?",
            "marks": 1,
            "answer": "3 x 10^8 m/s or 300000 km/s"
          },
          {
            "q": "What is the pH of pure water at 25 degrees Celsius?",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "Which hormone is responsible for fight or flight response?",
            "marks": 1,
            "answer": "Adrenaline or Epinephrine"
          },
          {
            "q": "What is the principal focus of a concave mirror?",
            "marks": 1,
            "answer": "The point where light rays converge after reflection"
          },
          {
            "q": "The process of conversion of chemical energy into electrical energy is?",
            "marks": 1,
            "answer": "Electrochemistry or cell reaction"
          },
          {
            "q": "What is the function of stomata in plants?",
            "marks": 1,
            "answer": "Gas exchange and transpiration"
          },
          {
            "q": "Which metal is liquid at room temperature?",
            "marks": 1,
            "answer": "Mercury"
          },
          {
            "q": "The SI unit of electric current is?",
            "marks": 1,
            "answer": "Ampere (A)"
          },
          {
            "q": "What is the process of reproduction in Hydra called?",
            "marks": 1,
            "answer": "Budding"
          },
          {
            "q": "The number of valence electrons in Chlorine is?",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "What is the focal length of a plane mirror?",
            "marks": 1,
            "answer": "Infinity"
          },
          {
            "q": "The transfer of heat by movement of fluids is called?",
            "marks": 1,
            "answer": "Convection"
          },
          {
            "q": "Which vitamin is produced in our body when exposed to sunlight?",
            "marks": 1,
            "answer": "Vitamin D"
          },
          {
            "q": "The SI unit of power is?",
            "marks": 1,
            "answer": "Watt (W)"
          },
          {
            "q": "What is the chromosomal number in human cells?",
            "marks": 1,
            "answer": "46 or 23 pairs"
          },
          {
            "q": "The process of removing ions from a solution is called?",
            "marks": 1,
            "answer": "Deionization or ion exchange"
          },
          {
            "q": "What is the refractive index of glass approximately?",
            "marks": 1,
            "answer": "1.5"
          }
        ]
      },
      {
        "name": "Section B - Short Answer",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Draw a ray diagram for image formation in a convex lens when object is at 2F.",
            "marks": 2,
            "answer": "Real, inverted, equal-sized image formed at 2F on opposite side"
          },
          {
            "q": "What is the difference between exothermic and endothermic reactions? Give one example each.",
            "marks": 3,
            "answer": "Exothermic releases heat (combustion), Endothermic absorbs heat (melting ice)"
          },
          {
            "q": "Explain the process of photosynthesis with a balanced equation.",
            "marks": 3,
            "answer": "6CO2 + 6H2O + light energy -> C6H12O6 + 6O2"
          },
          {
            "q": "State Ohms Law and write its mathematical formula.",
            "marks": 2,
            "answer": "V = IR where V is voltage, I is current, R is resistance"
          },
          {
            "q": "How do plants and animals differ in reproduction methods?",
            "marks": 2,
            "answer": "Plants reproduce by seeds and vegetative means, animals mostly by sexual reproduction"
          },
          {
            "q": "What is electromagnetic induction? Explain with example.",
            "marks": 3,
            "answer": "Change in magnetic flux induces electric current, example: electric generator"
          },
          {
            "q": "Write the properties of acids and bases.",
            "marks": 2,
            "answer": "Acids are sour, corrosive, turn litmus red; Bases are bitter, soapy, turn litmus blue"
          },
          {
            "q": "Explain the structure of mitochondria and its function.",
            "marks": 2,
            "answer": "Double membrane organelle with inner cristae, site of ATP production and energy release"
          },
          {
            "q": "Calculate the resistance of a wire with resistivity 1.7 x 10^-8, length 2m, area 1mm^2.",
            "marks": 2,
            "answer": "R = (1.7 x 10^-8 x 2) / (10^-6) = 0.034 ohm"
          },
          {
            "q": "What are the three states of matter? How do they differ?",
            "marks": 3,
            "answer": "Solid (fixed shape), Liquid (fixed volume), Gas (no fixed shape or volume)"
          },
          {
            "q": "Explain the mechanism of refraction of light.",
            "marks": 2,
            "answer": "Light bends when entering denser medium due to change in speed"
          },
          {
            "q": "What is a food web and how does it differ from food chain?",
            "marks": 2,
            "answer": "Food web is interconnected food chains showing multiple feeding relationships"
          }
        ]
      },
      {
        "name": "Section C - Long Answer",
        "marks": 26,
        "instructions": "Attempt all questions. Each question carries 3 or 5 marks.",
        "questions": [
          {
            "q": "Explain the process of refraction of light with Snells law. Draw a ray diagram.",
            "marks": 5,
            "answer": "sin(i)/sin(r) = n2/n1, where i is incident angle, r is refraction angle, n is refractive index"
          },
          {
            "q": "Describe the structure and function of the human digestive system.",
            "marks": 5,
            "answer": "Mouth (ingestion), Esophagus, Stomach (churning), Small intestine (absorption), Large intestine (water absorption)"
          },
          {
            "q": "Explain the process of binary fission in bacteria with diagram.",
            "marks": 3,
            "answer": "DNA replication followed by division into two identical daughter cells"
          },
          {
            "q": "How is electricity generated in thermal power plants? Explain the complete process.",
            "marks": 5,
            "answer": "Burning of fuel heats water, steam turns turbine, turbine rotates generator, producing electricity"
          },
          {
            "q": "Describe the nitrogen cycle and its importance in ecosystem.",
            "marks": 5,
            "answer": "Nitrogen fixation by bacteria, conversion to nitrates, uptake by plants, return to atmosphere through decomposition"
          },
          {
            "q": "Explain the principle and working of an electric motor.",
            "marks": 3,
            "answer": "Current-carrying coil rotates in magnetic field due to force on opposite sides, producing motion"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the total marks and duration of Class 10 Science exam?",
        "a": "The exam is for 80 marks with 3 hours duration, covering Physics, Chemistry, and Biology sections."
      },
      {
        "q": "How many chapters are in Class 10 Science syllabus?",
        "a": "There are 16 chapters in total: 5 in Chemistry, 5 in Physics, and 6 in Biology."
      },
      {
        "q": "What topics should I focus on most for scoring well?",
        "a": "Focus on concepts like photosynthesis, respiration, heredity, chemical reactions, electricity, light and optics, which frequently appear in exams."
      }
    ]
  },
  {
    "slug": "class-9-science-set-2",
    "classLevel": "Class 9",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Science Sample Paper Set 2",
    "intro": "This sample paper covers all key topics in Class 9 Science including motion, forces, matter, atoms, and life processes. Practice comprehensive questions designed to build conceptual understanding and exam readiness. This is a shortened practice set: 38 questions worth 73 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 73,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "What is the SI unit of velocity?",
            "marks": 1,
            "answer": "m/s"
          },
          {
            "q": "Newtons first law of motion is also called?",
            "marks": 1,
            "answer": "Law of Inertia"
          },
          {
            "q": "What is the SI unit of mass?",
            "marks": 1,
            "answer": "Kilogram (kg)"
          },
          {
            "q": "The smallest particle of an element is?",
            "marks": 1,
            "answer": "Atom"
          },
          {
            "q": "What is the main constituent of air?",
            "marks": 1,
            "answer": "Nitrogen (78%)"
          },
          {
            "q": "The process by which plants absorb water is called?",
            "marks": 1,
            "answer": "Osmosis"
          },
          {
            "q": "What is the SI unit of acceleration?",
            "marks": 1,
            "answer": "m/s^2"
          },
          {
            "q": "Which scientist proposed the atomic theory?",
            "marks": 1,
            "answer": "John Dalton"
          },
          {
            "q": "The basic unit of life is?",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "What is the valency of Carbon?",
            "marks": 1,
            "answer": "4"
          },
          {
            "q": "The element with atomic number 8 is?",
            "marks": 1,
            "answer": "Oxygen"
          },
          {
            "q": "What are the three states of matter?",
            "marks": 1,
            "answer": "Solid, Liquid, Gas"
          },
          {
            "q": "The SI unit of force is?",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Which organelle is called the powerhouse of the cell?",
            "marks": 1,
            "answer": "Mitochondria"
          },
          {
            "q": "What is the density of water at 4 degrees Celsius?",
            "marks": 1,
            "answer": "1 g/cm^3 or 1000 kg/m^3"
          },
          {
            "q": "The process of breaking down of food into simpler substances is?",
            "marks": 1,
            "answer": "Digestion"
          },
          {
            "q": "What is the molecular weight of CO2?",
            "marks": 1,
            "answer": "44 amu"
          },
          {
            "q": "The tissue responsible for transport of water in plants is?",
            "marks": 1,
            "answer": "Xylem"
          },
          {
            "q": "Distance covered per unit time is?",
            "marks": 1,
            "answer": "Speed"
          },
          {
            "q": "The phenomenon of change in velocity is?",
            "marks": 1,
            "answer": "Acceleration"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "State and explain Newtons second law of motion with mathematical form.",
            "marks": 2,
            "answer": "F = ma where Force equals mass times acceleration"
          },
          {
            "q": "What is the difference between average speed and average velocity?",
            "marks": 2,
            "answer": "Speed is distance/time, Velocity is displacement/time (vector quantity)"
          },
          {
            "q": "Define relative atomic mass and write its importance.",
            "marks": 3,
            "answer": "Mass of atom compared to 1/12th of Carbon-12, used for comparing atomic masses"
          },
          {
            "q": "What is the structure of an atom? Draw a diagram.",
            "marks": 3,
            "answer": "Nucleus with protons and neutrons at center, electrons orbiting in shells"
          },
          {
            "q": "Explain the process of osmosis with example.",
            "marks": 2,
            "answer": "Movement of solvent through semipermeable membrane from low to high solute concentration, example: plant root absorbing water"
          },
          {
            "q": "What are the types of tissues in plants? Name them.",
            "marks": 2,
            "answer": "Meristematic and Permanent tissues"
          },
          {
            "q": "Calculate the acceleration of a car if it travels 50m in 5s starting from rest.",
            "marks": 2,
            "answer": "a = 4 m/s^2"
          },
          {
            "q": "What are isotopes? Give one example.",
            "marks": 2,
            "answer": "Atoms of same element with different mass numbers, example: Carbon-12 and Carbon-14"
          },
          {
            "q": "Describe the structure of a plant cell with functions of all organelles.",
            "marks": 3,
            "answer": "Cell wall (protection), Chloroplasts (photosynthesis), Vacuole (storage), Nucleus (control)"
          },
          {
            "q": "What is a balanced chemical equation? Give one example.",
            "marks": 2,
            "answer": "Equal number of atoms on both sides, example: 2H2 + O2 -> 2H2O"
          },
          {
            "q": "Explain the difference between pure substances and mixtures.",
            "marks": 2,
            "answer": "Pure substances have fixed composition, mixtures have variable composition"
          },
          {
            "q": "What is the function of the circulatory system in humans?",
            "marks": 2,
            "answer": "Transport of oxygen, nutrients, and hormones throughout the body"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 26,
        "instructions": "Attempt all questions. Each question carries 3 or 5 marks.",
        "questions": [
          {
            "q": "Draw a diagram of human circulatory system and explain the path of blood circulation.",
            "marks": 5,
            "answer": "Right atrium -> Right ventricle -> Lungs -> Left atrium -> Left ventricle -> Body -> Back to Right atrium"
          },
          {
            "q": "Explain the structure of a plant cell and compare it with animal cell.",
            "marks": 5,
            "answer": "Plant cell has cell wall, chloroplasts, large vacuole; Animal cell lacks these and has centrosomes"
          },
          {
            "q": "Describe the process of photosynthesis with equation.",
            "marks": 5,
            "answer": "6CO2 + 6H2O + Light -> C6H12O6 + 6O2, occurs in chloroplasts"
          },
          {
            "q": "Explain the laws of motion with real-life examples.",
            "marks": 5,
            "answer": "First law: inertia (seatbelts in cars), Second law: F=ma (accelerating car), Third law: action-reaction (rocket propulsion)"
          },
          {
            "q": "What is the atomic structure of Sodium? Write the electron configuration.",
            "marks": 3,
            "answer": "11 electrons, configuration: 2,8,1"
          },
          {
            "q": "Explain the water cycle and its importance for life on Earth.",
            "marks": 3,
            "answer": "Evaporation, Condensation, Precipitation, Collection - distributes water and regulates climate"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 9 Science?",
        "a": "The exam is 80 marks with 3 hours duration, covering sections on physics, chemistry, biology with objective, short answer, and long answer questions."
      },
      {
        "q": "How many chapters are there in Class 9 Science?",
        "a": "There are 15 chapters covering topics like motion, forces, matter, atoms, cell structure, tissues, and life processes."
      },
      {
        "q": "What are the important topics to focus on?",
        "a": "Focus on motion and forces, structure of atom, cell biology, photosynthesis and respiration, and human body systems."
      }
    ]
  },
  {
    "slug": "class-9-social-science-set-2",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 9 Social Science Sample Paper Set 2",
    "intro": "Comprehensive sample paper covering History, Geography, Economics, and Civics for Class 9 students. Practice questions on Indian independence, natural resources, democracy, and global citizenship with complete solutions. This is a shortened practice set: 38 questions worth 73 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 73,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "In which year did the French Revolution start?",
            "marks": 1,
            "answer": "1789"
          },
          {
            "q": "Who was the first President of independent India?",
            "marks": 1,
            "answer": "Dr. Rajendra Prasad"
          },
          {
            "q": "Which is the largest continent by area?",
            "marks": 1,
            "answer": "Asia"
          },
          {
            "q": "The Constitution of India was adopted on?",
            "marks": 1,
            "answer": "January 26, 1950"
          },
          {
            "q": "What is the total number of states in India?",
            "marks": 1,
            "answer": "28"
          },
          {
            "q": "Who was the primary architect of the Indian Constitution?",
            "marks": 1,
            "answer": "Dr. B.R. Ambedkar"
          },
          {
            "q": "The tropic of cancer passes through which latitude?",
            "marks": 1,
            "answer": "23.5 degrees North"
          },
          {
            "q": "Which ancient Indian empire built the Taj Mahal?",
            "marks": 1,
            "answer": "Mughal Empire"
          },
          {
            "q": "The fundamental rights are guaranteed in which part of the Constitution?",
            "marks": 1,
            "answer": "Part III"
          },
          {
            "q": "Which continent is the coldest?",
            "marks": 1,
            "answer": "Antarctica"
          },
          {
            "q": "What is the capital of India?",
            "marks": 1,
            "answer": "New Delhi"
          },
          {
            "q": "The Indian National Congress was founded in?",
            "marks": 1,
            "answer": "1885"
          },
          {
            "q": "Which river is the longest in India?",
            "marks": 1,
            "answer": "Ganges River"
          },
          {
            "q": "The Directive Principles are mentioned in which part of Constitution?",
            "marks": 1,
            "answer": "Part IV"
          },
          {
            "q": "What is the time difference between IST and UTC?",
            "marks": 1,
            "answer": "Plus 5.5 hours"
          },
          {
            "q": "Who organized the Swadeshi Movement?",
            "marks": 1,
            "answer": "Sri Aurobindo and Keshab Chandra Sen"
          },
          {
            "q": "The Western Ghats is a mountain range in which part of India?",
            "marks": 1,
            "answer": "Western coast"
          },
          {
            "q": "In which year did India become a sovereign democratic republic?",
            "marks": 1,
            "answer": "1950"
          },
          {
            "q": "Which resource is renewable?",
            "marks": 1,
            "answer": "Solar energy, Water, Wind"
          },
          {
            "q": "What is the primary function of the Lok Sabha?",
            "marks": 1,
            "answer": "To pass laws and represent the people"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Explain the three pillars of democracy in India.",
            "marks": 2,
            "answer": "Legislative (Parliament), Executive (President and PM), Judicial (Supreme Court)"
          },
          {
            "q": "What are the main causes of the French Revolution?",
            "marks": 3,
            "answer": "Economic crisis, Social inequality, Enlightenment ideas, Bad harvests"
          },
          {
            "q": "Describe the monsoon winds and their effect on Indian climate.",
            "marks": 3,
            "answer": "Seasonal winds bringing rain, Critical for agriculture, Affects weather patterns"
          },
          {
            "q": "What are fundamental rights? Name any four.",
            "marks": 2,
            "answer": "Constitutional guarantees: Right to Equality, Right to Freedom, Right to Life, Right to Education"
          },
          {
            "q": "Explain the role of Mahatma Gandhi in Indian independence struggle.",
            "marks": 2,
            "answer": "Led non-violent resistance, Championed Swadeshi, United the nation against British rule"
          },
          {
            "q": "What is sustainable development? Write its importance.",
            "marks": 2,
            "answer": "Development meeting present needs without harming future generations"
          },
          {
            "q": "Describe the characteristics of the tundra biome.",
            "marks": 2,
            "answer": "Extremely cold, Low precipitation, Permafrost, Sparse vegetation"
          },
          {
            "q": "What is the difference between weather and climate?",
            "marks": 2,
            "answer": "Weather is daily conditions, Climate is long-term atmospheric patterns"
          },
          {
            "q": "Explain the cause and effect of soil erosion.",
            "marks": 3,
            "answer": "Causes: Deforestation, Overgrazing; Effects: Loss of fertile land, Floods, Desertification"
          },
          {
            "q": "What are the duties of a citizen as mentioned in the Constitution?",
            "marks": 2,
            "answer": "Follow constitution, Respect national symbols, Protect public property, Defend nation"
          },
          {
            "q": "Describe the impact of Napoleon on European history.",
            "marks": 2,
            "answer": "Reformed legal system, Spread nationalism, Changed warfare tactics"
          },
          {
            "q": "What is the greenhouse effect and its consequences?",
            "marks": 2,
            "answer": "Trapping of heat by gases, Leading to global warming and climate change"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 26,
        "instructions": "Attempt all questions. Each question carries 3 or 5 marks.",
        "questions": [
          {
            "q": "Explain the journey of India from ancient times through medieval period to independence.",
            "marks": 5,
            "answer": "Ancient: Vedic, Mauryan, Gupta empires; Medieval: Delhi Sultanate, Mughal rule; Modern: British colonization and independence struggle"
          },
          {
            "q": "Describe the geographical features of India and how they influence its climate and culture.",
            "marks": 5,
            "answer": "Himalayas (climate), Deserts, Plains, Coast affect agriculture, settlement, and cultural diversity"
          },
          {
            "q": "Explain the structure and functions of different organs of the Indian government.",
            "marks": 5,
            "answer": "Parliament (legislature), President/PM (executive), Courts (judiciary), each with specific powers and responsibilities"
          },
          {
            "q": "What were the social and political consequences of the Industrial Revolution?",
            "marks": 5,
            "answer": "Rise of working class, Urbanization, Labor movements, Socialism, Changed production methods"
          },
          {
            "q": "Discuss the concept of secularism as mentioned in the Indian Constitution.",
            "marks": 3,
            "answer": "State treats all religions equally, No state religion, Freedom to practice and propagate religion"
          },
          {
            "q": "Explain the water cycle and its importance for human survival.",
            "marks": 3,
            "answer": "Evaporation -> Condensation -> Precipitation -> Collection, Provides fresh water, regulates temperature"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 9 Social Science?",
        "a": "History (French Revolution, Indian history), Geography (climate, natural resources, biomes), Civics (constitution, democracy), Economics (basic concepts)."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 3 hours duration, covering History, Geography, Civics, and Economics with objective and descriptive questions."
      },
      {
        "q": "Which historical periods are most important?",
        "a": "French Revolution, Indian medieval period, British colonial period, and independence struggle are key topics."
      }
    ]
  },
  {
    "slug": "class-12-physics-set-2",
    "classLevel": "Class 12",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 12 Physics Sample Paper Set 2",
    "intro": "Advanced physics sample paper covering electromagnetism, optics, modern physics, and nuclear physics. Solve comprehensive numerical and theoretical problems with detailed explanations. This is a shortened practice set: 27 questions worth 68 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Multiple Choice Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The SI unit of magnetic flux density is?",
            "marks": 1,
            "answer": "Tesla (T)"
          },
          {
            "q": "Which material is used as dielectric in capacitors?",
            "marks": 1,
            "answer": "Glass, Mica, Paper, Ceramic"
          },
          {
            "q": "The photoelectric effect was explained by?",
            "marks": 1,
            "answer": "Albert Einstein"
          },
          {
            "q": "What is the wavelength range of visible light?",
            "marks": 1,
            "answer": "400-700 nm"
          },
          {
            "q": "The nucleus was discovered by?",
            "marks": 1,
            "answer": "Ernest Rutherford"
          },
          {
            "q": "Which of the following is a vector quantity?",
            "marks": 1,
            "answer": "Force"
          },
          {
            "q": "The SI unit of capacitance is?",
            "marks": 1,
            "answer": "Farad (F)"
          },
          {
            "q": "What is the rest mass of electron?",
            "marks": 1,
            "answer": "9.1 x 10^-31 kg"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Define magnetic field and write its SI unit.",
            "marks": 2,
            "answer": "Region around magnet where magnetic force acts, SI unit is Tesla (T)"
          },
          {
            "q": "State Faradays law of electromagnetic induction.",
            "marks": 2,
            "answer": "EMF = -N(d-flux/dt), Induced EMF equals negative rate of change of magnetic flux"
          },
          {
            "q": "Explain the working principle of a transformer.",
            "marks": 3,
            "answer": "Two coils on common core, Changing current in primary creates changing magnetic field, Induces EMF in secondary"
          },
          {
            "q": "Write the equation for electromagnetic wave and identify its components.",
            "marks": 2,
            "answer": "E = E0 sin(kx - omega*t), Components: Electric field and Magnetic field perpendicular to each other"
          },
          {
            "q": "What is the photoelectric effect? Explain why frequency has threshold value.",
            "marks": 3,
            "answer": "Electrons ejected from metal by light, Threshold frequency required to provide work function energy"
          },
          {
            "q": "Define critical angle and total internal reflection.",
            "marks": 2,
            "answer": "Critical angle: incident angle for which refracted angle = 90 degrees, Total internal reflection occurs beyond this angle"
          },
          {
            "q": "Explain single slit diffraction pattern.",
            "marks": 2,
            "answer": "Single slit acts as source of secondary wavelets, Creating central maximum and side bands with decreasing intensity"
          },
          {
            "q": "What is the de Broglie wavelength? Write its expression.",
            "marks": 2,
            "answer": "wavelength = h/p where h is Planck's constant, p is momentum"
          },
          {
            "q": "Define binding energy and write its expression using Einstein's mass-energy relation.",
            "marks": 3,
            "answer": "BE = (mass defect) * c^2, Energy required to separate nucleus into constituent nucleons"
          },
          {
            "q": "Explain the process of nuclear fission with example.",
            "marks": 2,
            "answer": "Heavy nucleus splits into lighter fragments releasing energy, Example: U-235 splitting"
          },
          {
            "q": "What is half-life of a radioactive substance?",
            "marks": 2,
            "answer": "Time required for half of original atoms to decay"
          },
          {
            "q": "Draw ray diagram for image formation by convex lens with object at focal point.",
            "marks": 2,
            "answer": "Image at infinity, Real, Inverted"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Derive Ohms law from Drifts of electrons. Explain conductivity and resistivity.",
            "marks": 5,
            "answer": "Drift velocity of electrons under electric field, V = IR where I = neAv, Resistivity measures material property"
          },
          {
            "q": "Explain construction and working of moving coil galvanometer. How can it be converted to ammeter?",
            "marks": 5,
            "answer": "Coil rotates in magnetic field, Deflection proportional to current, Add shunt resistance in parallel for ammeter"
          },
          {
            "q": "Derive lens maker's formula and explain refraction at two surfaces.",
            "marks": 5,
            "answer": "1/f = (n-1)(1/R1 - 1/R2), Light refracts at both curved surfaces, Combined effect determines focal length"
          },
          {
            "q": "Explain double slit interference pattern. Derive expression for fringe width.",
            "marks": 5,
            "answer": "Two coherent sources create interference, Fringe width beta = lambda*D/d, Bright fringes at path difference n*lambda"
          },
          {
            "q": "State and derive Bohr's postulates for hydrogen atom. Calculate radius of first orbit.",
            "marks": 5,
            "answer": "Quantization of angular momentum, Energy levels, Ground state radius = 0.53 Angstrom"
          },
          {
            "q": "Explain radioactive decay process with decay equation. Discuss alpha and beta decay.",
            "marks": 4,
            "answer": "N = N0 * e^(-lambda*t), Alpha: Helium nucleus emitted, Beta: Electron or positron emitted"
          },
          {
            "q": "Derive Einstein's mass-energy relation E = mc^2 and explain its significance.",
            "marks": 4,
            "answer": "Energy-mass equivalence, Shows mass can be converted to energy, Basis of nuclear reactions"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 12 Physics?",
        "a": "70 marks with 3 hours duration, covering MCQ, short answer, and long answer questions on both theoretical and numerical problems."
      },
      {
        "q": "Which topics are most important?",
        "a": "Electromagnetism, Optics, Modern Physics, Nuclear Physics are crucial for board exams and competitive exams."
      },
      {
        "q": "How to solve numerical problems efficiently?",
        "a": "Understand underlying concepts, Identify relevant formulas, Substitute values carefully, Check units and significant figures."
      }
    ]
  },
  {
    "slug": "class-12-chemistry-set-2",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "board": "CBSE",
    "title": "CBSE Class 12 Chemistry Sample Paper Set 2",
    "intro": "Comprehensive chemistry sample paper covering organic, inorganic, and physical chemistry topics. Master reactions, mechanisms, and calculations with detailed solutions for Class 12 board exams. This is a shortened practice set: 27 questions worth 69 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 69,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The value of Avogadro's number is?",
            "marks": 1,
            "answer": "6.022 x 10^23"
          },
          {
            "q": "Which element has highest electronegativity?",
            "marks": 1,
            "answer": "Fluorine"
          },
          {
            "q": "The SI unit of pressure is?",
            "marks": 1,
            "answer": "Pascal (Pa)"
          },
          {
            "q": "What is the oxidation state of sulfur in H2SO4?",
            "marks": 1,
            "answer": "+6"
          },
          {
            "q": "The pH of neutral solution is?",
            "marks": 1,
            "answer": "7"
          },
          {
            "q": "Which gas is used in making ammonia by Haber process?",
            "marks": 1,
            "answer": "Nitrogen and Hydrogen"
          },
          {
            "q": "What is the general formula for alkanes?",
            "marks": 1,
            "answer": "CnH2n+2"
          },
          {
            "q": "The catalyst used in contact process is?",
            "marks": 1,
            "answer": "Vanadium pentoxide (V2O5)"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "What is Mohs scale? Give its uses.",
            "marks": 2,
            "answer": "Measures hardness of minerals from 1 (softest) to 10 (hardest), Used to identify minerals"
          },
          {
            "q": "Explain Le Chatliers principle with example.",
            "marks": 3,
            "answer": "System shifts to counteract change, Example: N2 + 3H2 <-> 2NH3, Increase pressure shifts right"
          },
          {
            "q": "What is buffer solution? How does it resist pH change?",
            "marks": 2,
            "answer": "Weak acid + its salt or weak base + its salt, Neutralizes added acid or base, Maintains constant pH"
          },
          {
            "q": "Write the electronic configuration of transition metals and explain d-block elements.",
            "marks": 3,
            "answer": "Configuration: (n-1)d^1-10 ns^1-2, Partially filled d orbitals, Show variable oxidation states"
          },
          {
            "q": "Explain the concept of hybridization with example.",
            "marks": 2,
            "answer": "Mixing of atomic orbitals, Example: Carbon in CH4 is sp^3 hybridized"
          },
          {
            "q": "What is isomerism? Explain structural and stereoisomerism.",
            "marks": 3,
            "answer": "Same molecular formula different structure, Structural: chain, position, functional group isomers, Stereoisomerism: geometric and optical"
          },
          {
            "q": "Describe the mechanism of SN1 reaction with example.",
            "marks": 2,
            "answer": "Unimolecular nucleophilic substitution, Two-step: carbocation formation then nucleophile attack"
          },
          {
            "q": "What is Friedel-Crafts alkylation? Write its conditions.",
            "marks": 2,
            "answer": "Introduction of alkyl group in benzene, Requires AlCl3 catalyst and alkyl halide"
          },
          {
            "q": "Explain polymer formation and classification of polymers.",
            "marks": 3,
            "answer": "Long chain of repeating units, Natural: protein, cellulose; Synthetic: polyethylene, polyester"
          },
          {
            "q": "What is saponification? Write equation for soap formation.",
            "marks": 2,
            "answer": "Hydrolysis of fat by NaOH, Fat + NaOH -> Glycerol + Fatty acid salt (soap)"
          },
          {
            "q": "Define Gibbs free energy and write its expression.",
            "marks": 2,
            "answer": "G = H - TS, Determines spontaneity of reaction, Delta-G < 0 for spontaneous process"
          },
          {
            "q": "Explain primary, secondary, and tertiary amines with examples.",
            "marks": 2,
            "answer": "Primary: RNH2, Secondary: R2NH, Tertiary: R3N, Differ by number of alkyl groups"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain the preparation of ammonia by Haber process with conditions and industrial importance.",
            "marks": 5,
            "answer": "N2 + 3H2 <-> 2NH3, Conditions: 400-500C, 150-200 atm pressure, Iron catalyst, Used for fertilizers and explosives"
          },
          {
            "q": "Derive thermodynamic expression for electrode potential. Explain Nernst equation.",
            "marks": 5,
            "answer": "E = E0 - (RT/nF)ln(Q), Relates cell potential to concentrations and temperature"
          },
          {
            "q": "Explain the preparation and properties of benzene. Discuss its aromaticity.",
            "marks": 5,
            "answer": "Prepared by decarboxylation of benzoic acid or reduction of phenol, Resonance stabilization, Exceptional stability, Prefers substitution over addition"
          },
          {
            "q": "Describe the mechanism of free radical substitution in alkanes with example.",
            "marks": 5,
            "answer": "Initiation: generation of free radicals, Propagation: radical chain reactions, Termination: combination of radicals, Example: Chlorination of methane"
          },
          {
            "q": "Explain qualitative analysis scheme for cations. Discuss Group I, II, III, IV, V precipitations.",
            "marks": 5,
            "answer": "Group I: Pb2+, Ag+, Hg2+ with HCl, Group II: Hg2+, Pb2+, Bi3+ with H2S, Systematic identification based on solubility"
          },
          {
            "q": "Write a detailed note on carbohydrates. Classify and explain monosaccharides and polysaccharides.",
            "marks": 4,
            "answer": "Polyhydroxy aldehydes or ketones, Monosaccharides: glucose, fructose; Disaccharides: sucrose, maltose; Polysaccharides: starch, glycogen"
          },
          {
            "q": "Discuss factors affecting rate of reaction with Arrhenius equation explanation.",
            "marks": 4,
            "answer": "Temperature, Concentration, Pressure, Catalyst, Surface area, k = A*e^(-Ea/RT), Lower activation energy increases rate"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 12 Chemistry?",
        "a": "70 marks with 3 hours duration, covering sections on physical, inorganic, and organic chemistry with MCQ, short answer, and long answer questions."
      },
      {
        "q": "Which topics are most frequently asked?",
        "a": "Chemical reactions, Thermodynamics, Electrochemistry, Organic mechanisms, Polymers, and Qualitative analysis are important topics."
      },
      {
        "q": "How to prepare for reactions and mechanisms?",
        "a": "Practice writing equations, understand reaction mechanisms step by step, learn reaction conditions, and practice various problem types regularly."
      }
    ]
  },
  {
    "slug": "class-12-biology-set-2",
    "classLevel": "Class 12",
    "subject": "Biology",
    "board": "CBSE",
    "title": "CBSE Class 12 Biology Sample Paper Set 2",
    "intro": "Complete biology sample paper covering genetics, evolution, ecology, plant and animal physiology. Master concepts related to reproduction, biotechnology, and human welfare. This is a shortened practice set: 26 questions worth 68 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 7,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The basic unit of life is?",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "DNA stands for?",
            "marks": 1,
            "answer": "Deoxyribonucleic Acid"
          },
          {
            "q": "The process of formation of new blood cells is called?",
            "marks": 1,
            "answer": "Hematopoiesis"
          },
          {
            "q": "Immunity conferred by antibodies is?",
            "marks": 1,
            "answer": "Humoral immunity"
          },
          {
            "q": "The structural and functional unit of kidney is?",
            "marks": 1,
            "answer": "Nephron"
          },
          {
            "q": "Photosynthetically active region of spectrum is?",
            "marks": 1,
            "answer": "400-700 nm"
          },
          {
            "q": "The first hormone isolated was?",
            "marks": 1,
            "answer": "Insulin"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "What is transcription? Explain its types in prokaryotes and eukaryotes.",
            "marks": 2,
            "answer": "Synthesis of RNA from DNA, Prokaryotes: single RNA polymerase, Eukaryotes: three RNA polymerases"
          },
          {
            "q": "Explain the process of translation and its three stages.",
            "marks": 3,
            "answer": "Protein synthesis from mRNA, Initiation: ribosome assembly, Elongation: amino acid addition, Termination: release of protein"
          },
          {
            "q": "What is genetic code? Write its features.",
            "marks": 2,
            "answer": "Triplet codon carries amino acid information, Universal, Non-overlapping, Degenerate"
          },
          {
            "q": "Explain law of segregation with a monohybrid cross example.",
            "marks": 3,
            "answer": "Alleles separate during gamete formation, Example: Aa x Aa produces 3:1 ratio in F2"
          },
          {
            "q": "What is linkage? Explain crossing over and recombination.",
            "marks": 2,
            "answer": "Genes on same chromosome inherited together, Crossing over exchanges genetic material creating new combinations"
          },
          {
            "q": "Describe the structure of DNA. Write Watson-Crick model features.",
            "marks": 3,
            "answer": "Double helix, Sugar-phosphate backbone, Nitrogenous bases paired (A-T, G-C), Antiparallel strands"
          },
          {
            "q": "What is gene expression? Explain central dogma of molecular biology.",
            "marks": 2,
            "answer": "Conversion of genotype to phenotype, DNA -> RNA -> Protein (central dogma)"
          },
          {
            "q": "Explain the process of photosynthesis with equation.",
            "marks": 2,
            "answer": "6CO2 + 6H2O + light -> C6H12O6 + 6O2, Occurs in chloroplasts"
          },
          {
            "q": "What is respiration? Explain aerobic and anaerobic respiration.",
            "marks": 3,
            "answer": "Release of energy from food, Aerobic: requires O2, produces 38 ATP, Anaerobic: without O2, produces 2 ATP"
          },
          {
            "q": "Describe the structure and function of mitochondria.",
            "marks": 2,
            "answer": "Double membrane organelle, Inner folds = cristae, Site of ATP production, Oxidative phosphorylation"
          },
          {
            "q": "What is evolution? Explain Darwins theory of natural selection.",
            "marks": 2,
            "answer": "Change in organisms over time, Natural selection: survival of fittest, Environmental pressure selects favorable traits"
          },
          {
            "q": "Explain the different types of natural selection.",
            "marks": 2,
            "answer": "Stabilizing: favors intermediate phenotypes, Directional: favors one extreme, Disruptive: favors both extremes"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain spermatogenesis and oogenesis. Compare both processes.",
            "marks": 5,
            "answer": "Spermatogenesis: continuous in males, produces 4 functional sperms, Oogenesis: cyclic in females, produces 1 ovum and 3 polar bodies"
          },
          {
            "q": "Describe the menstrual cycle and hormonal regulation in females.",
            "marks": 5,
            "answer": "28-day cycle, FSH and LH from pituitary regulate follicular and luteal phases, Estrogen and progesterone maintain cycle"
          },
          {
            "q": "Explain the process of photosynthesis with details of light and dark reactions.",
            "marks": 5,
            "answer": "Light reactions: electron transport, photolysis, ATP and NADPH formation in thylakoids, Dark reactions: Calvin cycle, CO2 fixation in stroma"
          },
          {
            "q": "Describe the structure of nephron and process of urine formation.",
            "marks": 5,
            "answer": "Glomerulus, Bowmans capsule, PT, LOH, DCT, Processes: ultrafiltration, selective reabsorption, secretion"
          },
          {
            "q": "Explain immune response. Describe humoral and cell-mediated immunity.",
            "marks": 5,
            "answer": "Defense against pathogens, Humoral: B cells produce antibodies, Cell-mediated: T cells destroy infected cells"
          },
          {
            "q": "Describe the process of dihybrid cross and proof of law of independent assortment.",
            "marks": 4,
            "answer": "Cross with two traits, F2 ratio 9:3:3:1, Proves genes on different chromosomes assort independently"
          },
          {
            "q": "Explain genetic engineering and its applications in agriculture and medicine.",
            "marks": 4,
            "answer": "Manipulation of DNA, Applications: GMO crops, production of insulin and vaccines, disease resistance"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics should be focused for Class 12 Biology board exam?",
        "a": "Reproduction, Genetics, Molecular Biology, Plant and animal physiology, Evolution, Ecology, and Biotechnology are key topics."
      },
      {
        "q": "What is the exam pattern for Class 12 Biology?",
        "a": "70 marks with 3 hours duration, covering objective, short answer, and long answer questions on all Biology topics."
      },
      {
        "q": "How to prepare diagrams effectively?",
        "a": "Practice drawing structures like cell, mitochondria, nephron, flower. Label all parts clearly. Understand the process each diagram represents."
      }
    ]
  },
  {
    "slug": "class-11-physics-set-2",
    "classLevel": "Class 11",
    "subject": "Physics",
    "board": "CBSE",
    "title": "CBSE Class 11 Physics Sample Paper Set 2",
    "intro": "Comprehensive physics sample paper covering mechanics, thermodynamics, waves, and gravitation. Practice conceptual questions and numerical problems with complete solutions. This is a shortened practice set: 27 questions worth 68 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The SI unit of work is?",
            "marks": 1,
            "answer": "Joule (J)"
          },
          {
            "q": "What is the SI unit of moment of inertia?",
            "marks": 1,
            "answer": "kg*m^2"
          },
          {
            "q": "The gravitational constant G equals approximately?",
            "marks": 1,
            "answer": "6.67 x 10^-11 N*m^2/kg^2"
          },
          {
            "q": "Simple harmonic motion can be represented by?",
            "marks": 1,
            "answer": "y = A sin(omega*t + phi)"
          },
          {
            "q": "The SI unit of angular momentum is?",
            "marks": 1,
            "answer": "kg*m^2/s"
          },
          {
            "q": "Youngs modulus is ratio of?",
            "marks": 1,
            "answer": "Stress to Strain"
          },
          {
            "q": "The speed of sound in air at 0C is approximately?",
            "marks": 1,
            "answer": "330 m/s"
          },
          {
            "q": "Which of the following is not a type of simple harmonic motion?",
            "marks": 1,
            "answer": "Uniformly accelerated motion"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "State law of conservation of momentum and derive it from Newtons laws.",
            "marks": 2,
            "answer": "Total momentum of isolated system remains constant, F = dp/dt = 0, so p = constant"
          },
          {
            "q": "Explain the concept of angular displacement and angular velocity.",
            "marks": 2,
            "answer": "Angular displacement: angle swept, Angular velocity: rate of change of angular displacement"
          },
          {
            "q": "What is torque? Write its expression and explain its physical meaning.",
            "marks": 3,
            "answer": "Tau = r x F, Tendency to produce rotation, Vector product of position and force"
          },
          {
            "q": "Explain the difference between elastic and inelastic collisions.",
            "marks": 2,
            "answer": "Elastic: KE conserved, Inelastic: KE not conserved, In both momentum is conserved"
          },
          {
            "q": "What is escape velocity? Derive its expression.",
            "marks": 3,
            "answer": "Minimum velocity to escape gravitational field, v_escape = sqrt(2GM/R)"
          },
          {
            "q": "Explain simple harmonic motion and write its characteristics.",
            "marks": 2,
            "answer": "Oscillatory motion about equilibrium, Acceleration proportional to displacement and opposite direction"
          },
          {
            "q": "Derive expression for time period of simple pendulum.",
            "marks": 2,
            "answer": "T = 2pi*sqrt(L/g) where L is length, g is gravitational acceleration"
          },
          {
            "q": "What is Hookes law? Write its mathematical form.",
            "marks": 2,
            "answer": "F = -kx where k is spring constant, x is displacement"
          },
          {
            "q": "Explain the process of wave formation and types of waves.",
            "marks": 3,
            "answer": "Disturbance propagates through medium, Transverse: perpendicular to motion, Longitudinal: parallel to motion"
          },
          {
            "q": "What is Doppler effect? Write its expression for moving observer.",
            "marks": 2,
            "answer": "Apparent frequency changes due to relative motion, f' = f(v + v_observer)/(v + v_source)"
          },
          {
            "q": "Explain the concept of thermal equilibrium and temperature.",
            "marks": 2,
            "answer": "Thermal equilibrium: no heat flow between bodies, Temperature: measure of average kinetic energy"
          },
          {
            "q": "State first law of thermodynamics and write its expression.",
            "marks": 2,
            "answer": "dQ = dU + dW, Heat absorbed equals change in internal energy plus work done"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain the concept of work-energy theorem. Derive and prove it.",
            "marks": 5,
            "answer": "Work done by net force equals change in kinetic energy, W_net = delta-KE, Derived from F = ma and kinematics"
          },
          {
            "q": "Explain rotational motion and derive equation for rotational kinetic energy.",
            "marks": 5,
            "answer": "Motion about axis, I = mr^2, KE_rot = (1/2)*I*omega^2, Analogous to linear motion"
          },
          {
            "q": "Describe the motion of charged particle in uniform electric and magnetic fields.",
            "marks": 5,
            "answer": "In E field: F = qE, Linear motion, In B field: Lorentz force, Circular motion with radius r = mv/(qB)"
          },
          {
            "q": "Explain Keplers laws of planetary motion with physical interpretation.",
            "marks": 5,
            "answer": "First: elliptical orbit, Second: equal areas in equal time, Third: T^2 proportional to a^3"
          },
          {
            "q": "Describe the phenomenon of resonance. Explain its conditions and applications.",
            "marks": 5,
            "answer": "Amplitude maximum when driving frequency equals natural frequency, Conditions: damping is low, Resonance frequency = omega_0"
          },
          {
            "q": "Explain the concept of entropy and second law of thermodynamics.",
            "marks": 4,
            "answer": "Entropy: measure of disorder, Second law: entropy of isolated system always increases"
          },
          {
            "q": "Describe the variation of g with altitude and depth. Derive expressions.",
            "marks": 4,
            "answer": "g_h = g(1 - 2h/R) at height h, g_d = g(1 - d/R) at depth d"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the important chapters in Class 11 Physics?",
        "a": "Motion, Forces, Energy, Gravitation, Oscillations, Waves, and Thermodynamics are fundamental chapters."
      },
      {
        "q": "What is the exam pattern?",
        "a": "70 marks with 3 hours duration, covering MCQ, short answer questions, and long answer problems."
      },
      {
        "q": "How to solve numerical problems effectively?",
        "a": "Read carefully, identify given values, choose relevant formula, substitute correctly, check units, and verify answer."
      }
    ]
  },
  {
    "slug": "class-11-chemistry-set-2",
    "classLevel": "Class 11",
    "subject": "Chemistry",
    "board": "CBSE",
    "title": "CBSE Class 11 Chemistry Sample Paper Set 2",
    "intro": "Complete chemistry sample paper covering atomic structure, chemical bonding, states of matter, and thermodynamics. Master calculations and conceptual questions with step-by-step solutions. This is a shortened practice set: 27 questions worth 69 marks, following the 70-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 69,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 8,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The number of electrons in one mole of electrons is?",
            "marks": 1,
            "answer": "6.022 x 10^23"
          },
          {
            "q": "Planck's constant h equals approximately?",
            "marks": 1,
            "answer": "6.626 x 10^-34 J*s"
          },
          {
            "q": "Bohr radius of hydrogen atom is?",
            "marks": 1,
            "answer": "0.53 Angstrom"
          },
          {
            "q": "The shape of s orbital is?",
            "marks": 1,
            "answer": "Spherical"
          },
          {
            "q": "Bond angle in methane (CH4) is?",
            "marks": 1,
            "answer": "109.5 degrees"
          },
          {
            "q": "The SI unit of molarity is?",
            "marks": 1,
            "answer": "mol/L"
          },
          {
            "q": "Which gas has least density at same temperature and pressure?",
            "marks": 1,
            "answer": "Hydrogen"
          },
          {
            "q": "The process of dissolving of solute in solvent is?",
            "marks": 1,
            "answer": "Solvation or Dissolution"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Explain atomic radius and write factors affecting it.",
            "marks": 2,
            "answer": "Distance of outer electron from nucleus, Increases down group, Decreases across period"
          },
          {
            "q": "What is ionization enthalpy? Explain its trend in periodic table.",
            "marks": 3,
            "answer": "Energy required to remove electron, Increases across period, Decreases down group, Half-filled and filled subshells have high values"
          },
          {
            "q": "Explain the concept of electronegativity with Pauling scale.",
            "marks": 2,
            "answer": "Tendency to attract shared electron, Pauling scale: 0-4, Fluorine has highest value of 4"
          },
          {
            "q": "Write Lewis structure of CO2 and explain bonding.",
            "marks": 2,
            "answer": "O=C=O with double bonds, Linear structure, Non-polar molecule"
          },
          {
            "q": "Explain the concept of hybridization with sp, sp2, sp3 examples.",
            "marks": 3,
            "answer": "Mixing of atomic orbitals, sp: linear, sp2: trigonal planar, sp3: tetrahedral"
          },
          {
            "q": "What is VSEPR theory? Explain its application.",
            "marks": 2,
            "answer": "Electron pairs repel each other, Determines molecular geometry, Predicts 3D shape of molecules"
          },
          {
            "q": "Explain intermolecular forces and write types with examples.",
            "marks": 3,
            "answer": "London forces: weakest, Dipole-dipole: medium, Hydrogen bonding: strongest"
          },
          {
            "q": "What is molarity? Calculate molarity of 2 moles solute in 500 mL solution.",
            "marks": 2,
            "answer": "Moles of solute per liter of solution, M = 2/0.5 = 4 M"
          },
          {
            "q": "Explain the concept of isotopes and give example.",
            "marks": 2,
            "answer": "Same atomic number different mass number, Example: Carbon-12 and Carbon-14"
          },
          {
            "q": "Write gas law and derive ideal gas equation.",
            "marks": 3,
            "answer": "PV = nRT, Combining Boyles, Charles, and Avogadro laws"
          },
          {
            "q": "What is Daltons law of partial pressures?",
            "marks": 2,
            "answer": "Total pressure = sum of partial pressures of gases, P_total = P1 + P2 + P3..."
          },
          {
            "q": "Explain the first law of thermodynamics with example.",
            "marks": 2,
            "answer": "dQ = dU + dW, Heat absorbed equals change in internal energy plus work done"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 33,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Explain Bohr model of hydrogen atom with postulates and derive Bohr radius formula.",
            "marks": 5,
            "answer": "Quantization of angular momentum, Energy levels, Bohr radius = 0.53 Angstrom derived from force balance and Coulombs law"
          },
          {
            "q": "Describe the shapes of p and d orbitals. Explain orbital concept.",
            "marks": 5,
            "answer": "p orbital: dumbbell-shaped, d orbital: cloverleaf-shaped, Orbital: 3D region with high probability of finding electron"
          },
          {
            "q": "Explain the concept of electronegativity and ionic versus covalent bonding.",
            "marks": 5,
            "answer": "Electronegativity difference > 1.7: ionic, < 0.4: covalent, 0.4-1.7: polar covalent"
          },
          {
            "q": "Describe the properties of gases and explain deviation from ideal behavior.",
            "marks": 5,
            "answer": "Ideal gases: no intermolecular forces, negligible volume, Real gases deviate due to intermolecular attractions and molecular volume"
          },
          {
            "q": "Explain thermodynamic terms and define internal energy with examples.",
            "marks": 5,
            "answer": "Internal energy: total energy of system, U = sum of kinetic + potential energy, State function, Independent of path"
          },
          {
            "q": "Describe the structure of benzene and explain resonance in aromatic compounds.",
            "marks": 4,
            "answer": "Planar hexagonal structure, Resonance: multiple Lewis structures possible, Conjugated pi bonds provide stability"
          },
          {
            "q": "Write solutions of different types and explain colligative properties.",
            "marks": 4,
            "answer": "Unsaturated, saturated, supersaturated solutions, Colligative properties: vapor pressure, boiling point, freezing point depression, osmotic pressure"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the key chapters in Class 11 Chemistry?",
        "a": "Some systems, Atomic structure, Periodic table, Chemical bonding, States of matter, and Thermodynamics are fundamental."
      },
      {
        "q": "What is the exam pattern?",
        "a": "70 marks with 3 hours duration, covering MCQ, short answer questions, and long answer problems."
      },
      {
        "q": "How to prepare for problem-solving?",
        "a": "Understand concept, learn formula, practice variations, check significant figures, master unit conversions."
      }
    ]
  },
  {
    "slug": "class-10-english-set-2",
    "classLevel": "Class 10",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 10 English Sample Paper Set 2",
    "intro": "Comprehensive English sample paper covering reading, writing, grammar, and literature. Develop communication skills and language proficiency with diverse question types and complete solutions. This is a shortened practice set: 30 questions worth 75 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 75,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 18,
        "instructions": "Read the passage carefully and answer all questions.",
        "questions": [
          {
            "q": "What is the main idea of the first passage about environmental conservation?",
            "marks": 2,
            "answer": "The importance of protecting natural resources and preventing environmental degradation for future generations"
          },
          {
            "q": "According to the passage, what are the effects of deforestation?",
            "marks": 2,
            "answer": "Loss of habitat, soil erosion, climate change, reduced biodiversity, increased greenhouse gases"
          },
          {
            "q": "Which statement is true according to the passage?",
            "marks": 1,
            "answer": "Environmental protection requires collective effort from government, industries, and individuals"
          },
          {
            "q": "What word in the passage means loss of trees from forest areas?",
            "marks": 1,
            "answer": "Deforestation"
          },
          {
            "q": "Write a title for the second passage about renewable energy.",
            "marks": 2,
            "answer": "Renewable Energy: Path to Sustainable Future or The Importance of Clean Energy Sources"
          },
          {
            "q": "Why are renewable energy sources important according to the passage?",
            "marks": 2,
            "answer": "They are sustainable, do not produce emissions, reduce dependence on fossil fuels, and help combat climate change"
          },
          {
            "q": "What can be inferred from the passage about solar energy?",
            "marks": 2,
            "answer": "It is an abundant, clean, and increasingly cost-effective source of power that can be harnessed in various ways"
          },
          {
            "q": "Find a word from the passage that means natural or organic resources.",
            "marks": 1,
            "answer": "Renewable"
          },
          {
            "q": "According to the passage, how does wind energy contribute to sustainability?",
            "marks": 2,
            "answer": "Wind energy produces electricity without emissions, is renewable, and reduces dependence on fossil fuels"
          },
          {
            "q": "What is the authors tone in discussing renewable energy?",
            "marks": 3,
            "answer": "Optimistic and encouraging, emphasizing the potential and importance of renewable energy transition"
          }
        ],
        "passage": "PASSAGE 1\n\nThe forests, rivers and soil of a country are not an inheritance to be spent but a loan to be repaid. Protecting these natural resources, and preventing the degradation of the environment, is the only way to ensure that future generations inherit a land as liveable as the one we received.\n\nThe clearest warning is deforestation — the loss of trees from forest areas. Its effects compound one another: animals lose their habitat, unprotected topsoil is carried away as soil erosion, biodiversity is reduced as species vanish, and the greenhouse gases that trees once absorbed accumulate instead, driving climate change.\n\nNo single actor can reverse this. Environmental protection requires collective effort from government, industries and individuals together — laws that are enforced, industries that treat waste as their own responsibility, and citizens who change what they consume.\n\nPASSAGE 2\n\nIf the first problem is what we are losing, the second is what we could gain. Renewable energy comes from natural sources that replenish themselves, and it matters for four connected reasons: it is sustainable, it produces no emissions in use, it reduces our dependence on fossil fuels, and it helps combat climate change.\n\nSolar energy is the most abundant of these. The sunlight falling on the earth in a single hour carries more energy than humanity uses in a year, it is clean at the point of use, and it has become steadily more cost-effective as panel prices have fallen. It can be harnessed in many ways — vast solar farms, rooftop panels, water heaters, even lamps and pumps in villages far from any grid.\n\nWind energy contributes in much the same way. A turbine produces electricity without emissions, the wind that drives it is renewable, and every unit it generates further reduces dependence on fossil fuels.\n\nThe transition will not be effortless. But the direction is set, the technology improves each year, and there is real reason to believe the change can be made in time."
      },
      {
        "name": "Section B - Writing Skills",
        "marks": 30,
        "instructions": "Attempt all questions with clear and concise writing.",
        "questions": [
          {
            "q": "Write a formal letter to your school Principal requesting to organize an environmental awareness program.",
            "marks": 5,
            "answer": "Address, date, salutation, subject, body with purpose and benefits, closing with polite request"
          },
          {
            "q": "Write a short story on the theme Honesty is the Best Policy in 150-200 words.",
            "marks": 5,
            "answer": "Narrative with beginning, conflict, resolution, characters, dialogue, emphasizing honest behavior and its positive consequences"
          },
          {
            "q": "Write a notice for your school notice board about a health awareness camp.",
            "marks": 5,
            "answer": "Heading, date, subject, details about event, date, time, venue, who should attend, organized by, contact person"
          },
          {
            "q": "Describe your favorite book in 100-150 words, including plot, characters, and message.",
            "marks": 5,
            "answer": "Title and author, main plot summary, important characters, central message or theme, personal opinion"
          },
          {
            "q": "Write an email to your friend inviting them to your birthday party.",
            "marks": 5,
            "answer": "Subject line, greeting, invitation details, date, time, venue, what to bring, closing with warm regards"
          },
          {
            "q": "Write a paragraph of 100-150 words on the importance of sports in student life.",
            "marks": 5,
            "answer": "Topic sentence, physical benefits, mental health benefits, character development, discipline, teamwork, concluding sentence"
          }
        ]
      },
      {
        "name": "Section C - Grammar and Language",
        "marks": 17,
        "instructions": "Attempt all grammar and vocabulary questions.",
        "questions": [
          {
            "q": "Fill in the blank: She ____ (go) to the market yesterday.",
            "marks": 1,
            "answer": "went"
          },
          {
            "q": "Choose correct option: I _____ my homework before dinner.",
            "marks": 1,
            "answer": "have completed or had completed"
          },
          {
            "q": "Change to passive voice: The teacher taught us English.",
            "marks": 1,
            "answer": "English was taught to us by the teacher."
          },
          {
            "q": "Identify the part of speech: Quickly in the sentence He runs quickly.",
            "marks": 1,
            "answer": "Adverb"
          },
          {
            "q": "Correct the error: Despite of the heavy rain, we went out.",
            "marks": 1,
            "answer": "Despite the heavy rain, we went out."
          },
          {
            "q": "Use these words in a sentence: persevere, determination, success.",
            "marks": 3,
            "answer": "Through determination and perseverance, she achieved great success."
          },
          {
            "q": "Identify and correct the tense error: She have been studying since morning.",
            "marks": 2,
            "answer": "She has been studying since morning. (has instead of have)"
          },
          {
            "q": "Write synonyms for three of these words: bright, sad, quick.",
            "marks": 3,
            "answer": "bright: intelligent, luminous; sad: unhappy, sorrowful; quick: fast, swift"
          },
          {
            "q": "Change direct speech to indirect: He said, I am going to Delhi tomorrow.",
            "marks": 2,
            "answer": "He said that he was going to Delhi the next day."
          },
          {
            "q": "Correct the sentence: Neither the students nor the teacher are present.",
            "marks": 2,
            "answer": "Neither the students nor the teacher is present."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 10,
        "instructions": "Answer questions based on the prescribed texts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Who is the protagonist of the story?",
            "marks": 2,
            "answer": "Character name and brief description of their role and importance in the narrative"
          },
          {
            "q": "What is the central theme of the text?",
            "marks": 2,
            "answer": "Main message or moral of the story conveyed by the author"
          },
          {
            "q": "Describe a significant moment in the text that shows character development.",
            "marks": 3,
            "answer": "Scene with analysis of how character grows, changes perspective, or learns important lesson"
          },
          {
            "q": "How does the author use literary devices like metaphor or symbolism?",
            "marks": 3,
            "answer": "Examples of devices with explanation of their purpose and effect in the narrative"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 10 English?",
        "a": "80 marks with 3 hours duration covering reading, writing, grammar, vocabulary, and literature with diverse question types."
      },
      {
        "q": "How many marks are allocated to each section?",
        "a": "Reading Comprehension: 20 marks, Writing: 30 marks, Grammar: 20 marks, Literature: 10 marks."
      },
      {
        "q": "What are the writing tasks to practice?",
        "a": "Letters, notices, stories, paragraphs, emails, and descriptive pieces on various topics."
      }
    ]
  },
  {
    "slug": "class-9-maths-set-3",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 9 Mathematics Sample Paper Set 3",
    "intro": "Comprehensive mathematics sample paper covering number systems, algebra, geometry, and statistics. Strengthen problem-solving skills with diverse question types and detailed solutions. This is a shortened practice set: 39 questions worth 68 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 68,
    "sections": [
      {
        "name": "Section A - Very Short Answer Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "What is the decimal form of 1/8?",
            "marks": 1,
            "answer": "0.125"
          },
          {
            "q": "Is 2 a rational or irrational number?",
            "marks": 1,
            "answer": "Irrational"
          },
          {
            "q": "Find the value of (2^3)^2.",
            "marks": 1,
            "answer": "64"
          },
          {
            "q": "Simplify: (x + 2)(x - 2).",
            "marks": 1,
            "answer": "x^2 - 4"
          },
          {
            "q": "What is the value of a^0 for any non-zero a?",
            "marks": 1,
            "answer": "1"
          },
          {
            "q": "Find the remainder when x^2 + 2x + 1 is divided by x + 1.",
            "marks": 1,
            "answer": "0"
          },
          {
            "q": "What is the sum of angles in a quadrilateral?",
            "marks": 1,
            "answer": "360 degrees"
          },
          {
            "q": "Define a median in a triangle.",
            "marks": 1,
            "answer": "Line segment from vertex to midpoint of opposite side"
          },
          {
            "q": "How many lines of symmetry does a square have?",
            "marks": 1,
            "answer": "4"
          },
          {
            "q": "What is the area of a circle with radius r?",
            "marks": 1,
            "answer": "pi*r^2"
          },
          {
            "q": "Find the value of sin 30 degrees.",
            "marks": 1,
            "answer": "1/2"
          },
          {
            "q": "What is the distance formula for two points?",
            "marks": 1,
            "answer": "sqrt((x2-x1)^2 + (y2-y1)^2)"
          },
          {
            "q": "Find mode of data: 5, 3, 5, 2, 5, 4.",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "What is the probability of getting a head when tossing a coin?",
            "marks": 1,
            "answer": "1/2"
          },
          {
            "q": "Simplify: sqrt(50).",
            "marks": 1,
            "answer": "5*sqrt(2)"
          },
          {
            "q": "Write the standard form of 0.00045.",
            "marks": 1,
            "answer": "4.5 x 10^-4"
          },
          {
            "q": "Find the value of x in 2x + 5 = 11.",
            "marks": 1,
            "answer": "3"
          },
          {
            "q": "What is the formula for volume of a cylinder?",
            "marks": 1,
            "answer": "pi*r^2*h"
          },
          {
            "q": "If a pair of linear equations has no solution, lines are?",
            "marks": 1,
            "answer": "Parallel"
          },
          {
            "q": "What is the HCF of 18 and 24?",
            "marks": 1,
            "answer": "6"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 25,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Prove that sqrt(3) is irrational.",
            "marks": 2,
            "answer": "Assume sqrt(3) = p/q in lowest terms, then 3 = p^2/q^2, so 3q^2 = p^2, leading to contradiction"
          },
          {
            "q": "Find the product using algebraic identity: (a + b)(a - b).",
            "marks": 2,
            "answer": "a^2 - b^2"
          },
          {
            "q": "Factorize: x^2 + 5x + 6.",
            "marks": 2,
            "answer": "(x + 2)(x + 3)"
          },
          {
            "q": "Solve the linear equation: 3x - 2 = 10.",
            "marks": 2,
            "answer": "x = 4"
          },
          {
            "q": "Plot points A(2, 3) and B(4, 1) on a graph. Find AB.",
            "marks": 2,
            "answer": "AB = sqrt(8) = 2*sqrt(2)"
          },
          {
            "q": "In triangle ABC, AB = AC and angle A = 60 degrees. Find angles B and C.",
            "marks": 2,
            "answer": "B = C = 60 degrees (equilateral triangle)"
          },
          {
            "q": "Find the area of a triangle with sides 3, 4, 5.",
            "marks": 2,
            "answer": "6 square units"
          },
          {
            "q": "Construct an angle of 75 degrees using compass and ruler.",
            "marks": 3,
            "answer": "Construct 45 + 30 degrees or bisect 150 degrees angle"
          },
          {
            "q": "Find the median of data: 2, 4, 6, 8, 10.",
            "marks": 2,
            "answer": "6"
          },
          {
            "q": "From a pack of 52 cards, find probability of drawing a red card.",
            "marks": 2,
            "answer": "26/52 = 1/2"
          },
          {
            "q": "Two adjacent angles on a straight line sum to?",
            "marks": 2,
            "answer": "180 degrees"
          },
          {
            "q": "Find the length of tangent from external point to circle with radius 5 and distance 13 from center.",
            "marks": 2,
            "answer": "12 units"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 23,
        "instructions": "Attempt all questions. Each question carries 3 or 4 marks.",
        "questions": [
          {
            "q": "Solve the pair of linear equations 2x + 3y = 8 and x - 2y = 1 using elimination method.",
            "marks": 3,
            "answer": "x = 19/7, y = 2/7"
          },
          {
            "q": "Find the roots of quadratic equation x^2 - 5x + 6 = 0 using factorization.",
            "marks": 3,
            "answer": "x = 2 or x = 3"
          },
          {
            "q": "In circle with center O and radius 10 cm, if chord AB = 16 cm, find distance from center to chord.",
            "marks": 3,
            "answer": "6 cm"
          },
          {
            "q": "Prove that angle in semicircle is a right angle.",
            "marks": 4,
            "answer": "Using inscribed angle theorem, angle subtended by diameter is 90 degrees"
          },
          {
            "q": "A cone has base radius 7 cm and height 24 cm. Find slant height, volume, and curved surface area.",
            "marks": 4,
            "answer": "Slant height = 25 cm, Volume = 1232 cm^3, Curved surface area = 550 cm^2"
          },
          {
            "q": "Three numbers are in ratio 2:3:5. If their sum is 100, find the numbers.",
            "marks": 3,
            "answer": "20, 30, 50"
          },
          {
            "q": "Draw graph of y = 2x - 1 and find intercepts.",
            "marks": 3,
            "answer": "y-intercept = -1, x-intercept = 0.5, straight line passing through these points"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 9 Mathematics?",
        "a": "Number systems, Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Circles, and Statistics."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 3 hours duration, covering very short answer (20 marks), short answer (30 marks), and long answer (30 marks) questions."
      },
      {
        "q": "Which chapters should I focus on for scoring well?",
        "a": "Focus on Linear Equations, Triangles, Circles, Areas, and Trigonometry basics as they carry significant marks."
      }
    ]
  },
  {
    "slug": "class-8-maths-set-2",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "CBSE Class 8 Mathematics Sample Paper Set 2",
    "intro": "Engaging mathematics sample paper covering rational numbers, algebraic expressions, geometry, and data handling. Build strong fundamentals with practice problems and clear solutions. This is a shortened practice set: 42 questions worth 77 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 77,
    "sections": [
      {
        "name": "Section A - Objective Type Questions",
        "marks": 20,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "The multiplicative inverse of 3/4 is?",
            "marks": 1,
            "answer": "4/3"
          },
          {
            "q": "What is the additive inverse of -5?",
            "marks": 1,
            "answer": "5"
          },
          {
            "q": "Simplify: (2^3) x (2^2).",
            "marks": 1,
            "answer": "32"
          },
          {
            "q": "Expand: (a + b)^2.",
            "marks": 1,
            "answer": "a^2 + 2ab + b^2"
          },
          {
            "q": "What is 25% of 80?",
            "marks": 1,
            "answer": "20"
          },
          {
            "q": "Find the value of x in x + 7 = 15.",
            "marks": 1,
            "answer": "8"
          },
          {
            "q": "What is the perimeter of a square with side 5 cm?",
            "marks": 1,
            "answer": "20 cm"
          },
          {
            "q": "How many sides does an octagon have?",
            "marks": 1,
            "answer": "8"
          },
          {
            "q": "What is the area of a rectangle with length 8 cm and width 5 cm?",
            "marks": 1,
            "answer": "40 cm^2"
          },
          {
            "q": "What is the circumference of circle with radius 7 cm?",
            "marks": 1,
            "answer": "44 cm or 2*pi*7"
          },
          {
            "q": "How many faces does a cube have?",
            "marks": 1,
            "answer": "6"
          },
          {
            "q": "The sum of interior angles of a triangle is?",
            "marks": 1,
            "answer": "180 degrees"
          },
          {
            "q": "What is the complement of 60 degrees angle?",
            "marks": 1,
            "answer": "30 degrees"
          },
          {
            "q": "Find the average of 10, 20, 30.",
            "marks": 1,
            "answer": "20"
          },
          {
            "q": "What is the probability of getting an even number when rolling a dice?",
            "marks": 1,
            "answer": "1/2 or 3/6"
          },
          {
            "q": "Express 0.5 as a fraction.",
            "marks": 1,
            "answer": "1/2"
          },
          {
            "q": "What is 15% of 200?",
            "marks": 1,
            "answer": "30"
          },
          {
            "q": "Simplify: 3x + 5x.",
            "marks": 1,
            "answer": "8x"
          },
          {
            "q": "What is the square root of 144?",
            "marks": 1,
            "answer": "12"
          },
          {
            "q": "How many millimeters are in 1 centimeter?",
            "marks": 1,
            "answer": "10"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 25,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Add the rational numbers: 1/2 + 3/4.",
            "marks": 2,
            "answer": "5/4"
          },
          {
            "q": "Subtract: 5/6 - 1/3.",
            "marks": 2,
            "answer": "1/2"
          },
          {
            "q": "Solve the equation: 2x + 3 = 11.",
            "marks": 2,
            "answer": "x = 4"
          },
          {
            "q": "Evaluate: (-3) + (-5) + 8.",
            "marks": 2,
            "answer": "0"
          },
          {
            "q": "If length of rectangle is 12 cm and area is 60 cm^2, find width.",
            "marks": 2,
            "answer": "5 cm"
          },
          {
            "q": "Find the volume of a cube with side 3 cm.",
            "marks": 2,
            "answer": "27 cm^3"
          },
          {
            "q": "Convert 2 km to meters.",
            "marks": 2,
            "answer": "2000 meters"
          },
          {
            "q": "If an item costs 500 rupees and 20% discount is given, find the selling price.",
            "marks": 2,
            "answer": "400 rupees"
          },
          {
            "q": "Find the mean of numbers: 5, 10, 15, 20.",
            "marks": 2,
            "answer": "12.5"
          },
          {
            "q": "Construct an angle of 90 degrees using compass and ruler.",
            "marks": 3,
            "answer": "Draw perpendicular bisector or construct using compass arc"
          },
          {
            "q": "What is the mode of data: 2, 3, 3, 5, 3, 7?",
            "marks": 2,
            "answer": "3"
          },
          {
            "q": "If 5 pencils cost 25 rupees, what is the cost of 8 pencils?",
            "marks": 2,
            "answer": "40 rupees"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 32,
        "instructions": "Attempt all questions. Each question carries 3 or 4 marks.",
        "questions": [
          {
            "q": "Draw a line segment of 8 cm and divide it into 4 equal parts.",
            "marks": 3,
            "answer": "Using compass and ruler, construct perpendicular bisectors"
          },
          {
            "q": "Factorize: 2x^2 + 5x + 3.",
            "marks": 3,
            "answer": "(2x + 3)(x + 1)"
          },
          {
            "q": "A cylindrical tank has radius 2 m and height 5 m. Find its volume and curved surface area.",
            "marks": 4,
            "answer": "Volume = 20*pi m^3, Curved surface area = 20*pi m^2"
          },
          {
            "q": "The cost price of an item is 800 rupees and it is sold at 20% profit. Find selling price.",
            "marks": 3,
            "answer": "960 rupees"
          },
          {
            "q": "Represent the data using a bar graph: Class A: 30 students, Class B: 25 students, Class C: 35 students.",
            "marks": 3,
            "answer": "Bar graph with classes on x-axis and number of students on y-axis"
          },
          {
            "q": "Solve the linear equation: 3(x - 2) + 5 = 14.",
            "marks": 3,
            "answer": "x = 5"
          },
          {
            "q": "The area of a square is 100 cm^2. Find its perimeter.",
            "marks": 3,
            "answer": "40 cm"
          },
          {
            "q": "In a class of 40 students, 24 passed in Mathematics. Find the percentage of students who passed.",
            "marks": 3,
            "answer": "60%"
          },
          {
            "q": "Draw a parallelogram ABCD with AB = 5 cm, BC = 4 cm, and angle ABC = 60 degrees.",
            "marks": 4,
            "answer": "Use ruler and protractor to construct the parallelogram with given measurements"
          },
          {
            "q": "Find the simple interest on 5000 rupees at 5% per annum for 2 years.",
            "marks": 3,
            "answer": "500 rupees"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What are the main topics in Class 8 Mathematics?",
        "a": "Rational numbers, Exponents, Algebraic expressions and identities, Equations, Geometry, Mensuration, Data handling, and Probability."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 3 hours duration covering objective, short answer, and long answer questions."
      },
      {
        "q": "How to solve word problems effectively?",
        "a": "Read carefully, identify what is given and to find, form equations, solve step by step, and verify the answer."
      }
    ]
  },
  {
    "slug": "class-7-science-set-2",
    "classLevel": "Class 7",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 7 Science Sample Paper Set 2",
    "intro": "Interactive science sample paper covering nutrition, digestion, respiration, transportation, and life processes. Explore concepts about plants and animals with diagrams and clear explanations. This is a shortened practice set: 33 questions worth 70 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "2.5 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A - Multiple Choice Questions",
        "marks": 15,
        "instructions": "Attempt all questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "Which nutrient is required for the growth of our body?",
            "marks": 1,
            "answer": "Protein"
          },
          {
            "q": "The process by which plants prepare their own food is?",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "The SI unit of speed is?",
            "marks": 1,
            "answer": "m/s"
          },
          {
            "q": "Which organ carries oxygen-rich blood from lungs to the body?",
            "marks": 1,
            "answer": "Artery"
          },
          {
            "q": "The basic unit of life is?",
            "marks": 1,
            "answer": "Cell"
          },
          {
            "q": "Which part of plant absorbs water from soil?",
            "marks": 1,
            "answer": "Root"
          },
          {
            "q": "The breathing organ in fish is?",
            "marks": 1,
            "answer": "Gill"
          },
          {
            "q": "What is the SI unit of force?",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Which is a non-renewable resource?",
            "marks": 1,
            "answer": "Coal"
          },
          {
            "q": "The process of breakdown of food into simpler substances is?",
            "marks": 1,
            "answer": "Digestion"
          },
          {
            "q": "Which type of lens is used in a microscope?",
            "marks": 1,
            "answer": "Convex lens"
          },
          {
            "q": "Temperature of human body is approximately?",
            "marks": 1,
            "answer": "37 degrees Celsius"
          },
          {
            "q": "The xylem in plants transports?",
            "marks": 1,
            "answer": "Water and minerals"
          },
          {
            "q": "Which food group provides energy to our body?",
            "marks": 1,
            "answer": "Carbohydrates"
          },
          {
            "q": "Friction acts in which direction?",
            "marks": 1,
            "answer": "Opposite to direction of motion"
          }
        ]
      },
      {
        "name": "Section B - Short Answer Questions",
        "marks": 27,
        "instructions": "Attempt all questions. Each question carries 2 or 3 marks.",
        "questions": [
          {
            "q": "Explain the process of photosynthesis.",
            "marks": 2,
            "answer": "Plants use sunlight to convert CO2 and water into glucose and oxygen"
          },
          {
            "q": "What are the different types of teeth in humans? Write their functions.",
            "marks": 3,
            "answer": "Incisors: cutting, Canines: tearing, Molars: grinding food"
          },
          {
            "q": "Describe the process of digestion in the human body.",
            "marks": 3,
            "answer": "Breakdown of food in mouth, stomach, and small intestine, absorption in small intestine"
          },
          {
            "q": "What is the role of white blood cells in our body?",
            "marks": 2,
            "answer": "Fight infections and protect body from diseases"
          },
          {
            "q": "Explain the process of respiration.",
            "marks": 2,
            "answer": "Breakdown of glucose to release energy in the form of ATP"
          },
          {
            "q": "How do plants reproduce? Write two methods.",
            "marks": 2,
            "answer": "Sexual reproduction: by seeds, Asexual: by vegetative propagation"
          },
          {
            "q": "What is the difference between speed and velocity?",
            "marks": 2,
            "answer": "Speed is distance per unit time, Velocity is displacement per unit time"
          },
          {
            "q": "Name different types of friction.",
            "marks": 2,
            "answer": "Static, sliding, rolling friction"
          },
          {
            "q": "What is a simple machine? Give examples.",
            "marks": 3,
            "answer": "Device that makes work easier, Examples: lever, pulley, inclined plane"
          },
          {
            "q": "Explain the water cycle.",
            "marks": 2,
            "answer": "Evaporation, condensation, precipitation, collection - continuous cycle"
          },
          {
            "q": "What are the constituents of soil?",
            "marks": 2,
            "answer": "Organic matter, minerals, water, air, living organisms"
          },
          {
            "q": "How do animals adapt to their habitat?",
            "marks": 2,
            "answer": "Physical adaptations and behavioral adaptations help survival"
          }
        ]
      },
      {
        "name": "Section C - Long Answer Questions",
        "marks": 28,
        "instructions": "Attempt all questions. Each question carries 4 or 5 marks.",
        "questions": [
          {
            "q": "Describe the structure of human heart with a diagram and explain blood circulation.",
            "marks": 5,
            "answer": "Four chambers, blood flow path: right atrium, right ventricle, lungs, left atrium, left ventricle, body"
          },
          {
            "q": "Explain the life cycle of insects with example of butterfly.",
            "marks": 5,
            "answer": "Egg, Larva, Pupa, Adult - complete metamorphosis in butterflies"
          },
          {
            "q": "Describe the structure and function of plant cell with labeled diagram.",
            "marks": 5,
            "answer": "Cell wall, Cell membrane, Nucleus, Mitochondria, Chloroplasts, Vacuole and their functions"
          },
          {
            "q": "Explain Newtons laws of motion with everyday examples.",
            "marks": 5,
            "answer": "First law: inertia (seatbelts), Second law: F=ma (acceleration), Third law: action-reaction"
          },
          {
            "q": "What are natural resources? How should they be used sustainably?",
            "marks": 4,
            "answer": "Natural resources are gifts of nature, use wisely to avoid depletion and environmental damage"
          },
          {
            "q": "Describe the process of excretion in humans.",
            "marks": 4,
            "answer": "Kidneys filter waste from blood, urine formation, storage in bladder, removal from body"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 7 Science?",
        "a": "Nutrition, Digestion, Respiration, Blood circulation, Transport, Reproduction, Motion, Forces, Friction, Electricity, and Natural resources."
      },
      {
        "q": "What is the exam pattern?",
        "a": "80 marks with 2.5 hours duration covering MCQ, short answer, and long answer questions."
      },
      {
        "q": "How to draw scientific diagrams properly?",
        "a": "Use pencil, draw neat lines, label all parts clearly, use arrows to show direction of processes."
      }
    ]
  },
  {
    "slug": "class-8-english",
    "classLevel": "8",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 8 English Sample Paper Set 1",
    "intro": "This sample paper is designed to help students practice and evaluate their understanding of Class 8 English curriculum. It covers reading comprehension, grammar, writing skills and literature as per CBSE guidelines.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "marks": 20,
        "instructions": "Read the given passage and answer the questions that follow.",
        "questions": [
          {
            "q": "What does the passage primarily discuss about environmental conservation?",
            "marks": 5,
            "answer": "The passage discusses the importance of environmental conservation through individual and collective efforts, highlighting how small actions can lead to significant environmental changes."
          },
          {
            "q": "Explain the role of communities in waste management based on the passage.",
            "marks": 5,
            "answer": "Communities play a crucial role by organizing recycling programs, participating in clean-up drives, and educating people about reducing waste at the source."
          },
          {
            "q": "What is the main idea of the second paragraph?",
            "marks": 5,
            "answer": "The main idea is that technological advances have provided us with tools to monitor and reduce pollution, making environmental protection more achievable than ever before."
          },
          {
            "q": "How does the author support the claim that individuals can make a difference?",
            "marks": 5,
            "answer": "The author provides examples of successful individual initiatives, community projects, and statistics showing measurable environmental improvements from grassroots efforts."
          }
        ],
        "passage": "Environmental conservation is often described as a task for governments, but it begins far closer to home. It depends on individual and collective effort together — the household that separates its waste, the street that plants and waters trees, the school that stops buying plastic bottles. No law can do this work alone; laws set the direction, and people supply the effort.\n\nTechnological advances have provided us with tools to monitor and reduce pollution, making the problem far easier to act on than it was a generation ago. Cheap air-quality sensors now report readings street by street, so a city can see exactly where its worst air sits. Apps map collection routes for recyclers. Sewage treatment that once demanded vast plants can now be done at the scale of a single housing colony.\n\nCommunities matter most in waste management. A resident welfare association that organises a recycling programme, runs monthly clean-up drives and educates households about segregation achieves in a year what a municipal notice cannot achieve in ten.\n\nIt is fair to ask whether one person changes anything. The evidence says yes. A schoolgirl in Bengaluru whose petition ended single-use plastic in her school district; a colony in Pune that cut landfill waste by sixty per cent through composting; a fisherman in Kerala who has pulled tonnes of plastic from the sea in his nets. Individual initiatives grow into community projects, and community projects are what the statistics eventually record."
      },
      {
        "name": "Section B: Grammar and Vocabulary",
        "marks": 20,
        "instructions": "Complete the following grammar and vocabulary exercises.",
        "questions": [
          {
            "q": "Fill in the blanks with appropriate articles: The ___ Taj Mahal is one of ___ most famous monuments in India.",
            "marks": 5,
            "answer": "The; the"
          },
          {
            "q": "Identify and correct the error: She dont like playing cricket.",
            "marks": 5,
            "answer": "She doesnt like playing cricket. (dont should be doesnt with the third person singular)"
          },
          {
            "q": "Use the word immense in a sentence that shows its meaning clearly.",
            "marks": 5,
            "answer": "The immense size of the ocean filled the young explorer with wonder and awe."
          },
          {
            "q": "Change the voice: The teacher explained the concept to the students.",
            "marks": 5,
            "answer": "The concept was explained to the students by the teacher."
          }
        ]
      },
      {
        "name": "Section C: Writing Skills",
        "marks": 20,
        "instructions": "Write either an essay or a letter as instructed.",
        "questions": [
          {
            "q": "Write a letter to the Principal requesting a library extension during examination season (in about 120 words).",
            "marks": 10,
            "answer": "Dear Principal Sir/Madam, I am writing to request an extension of library timings during the examination season. Currently, many students face difficulty accessing study materials after school hours. An extended closing time would greatly benefit students preparing for their exams. I kindly request the library to remain open until 7 PM on weekdays. This would help many students utilize resources for better preparation. Thank you for considering this request. Yours respectfully, [Name]"
          },
          {
            "q": "Write an essay on Digital Literacy in the Modern World (150-200 words).",
            "marks": 10,
            "answer": "Digital Literacy in the Modern World has become as essential as traditional literacy. In todays technology-driven society, understanding digital tools is crucial for academic and professional success. Digital literacy enables individuals to access information, communicate effectively, and participate in online learning. Students must learn to navigate digital platforms, evaluate online sources, and practice digital safety. Schools are incorporating coding, digital art, and online research into their curriculum. However, digital literacy also demands awareness about cybersecurity and responsible internet use. Parents and educators must guide students in developing healthy digital habits. The ability to adapt to technological changes is now fundamental to thriving in the 21st century. Therefore, comprehensive digital literacy programs should be implemented across all educational institutions."
          }
        ]
      },
      {
        "name": "Section D: Literature",
        "marks": 20,
        "instructions": "Answer questions based on the prescribed texts and literary concepts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Discuss the character of the protagonist and his/her journey of transformation.",
            "marks": 5,
            "answer": "The protagonist undergoes significant character development from a timid and uncertain individual to a confident and determined person through various challenges and learning experiences throughout the narrative."
          },
          {
            "q": "Explain the significance of the title of a novel you have studied.",
            "marks": 5,
            "answer": "The title symbolizes the central theme of the story, representing the protagonists quest for self-discovery and the breaking down of societal barriers that limit personal growth."
          },
          {
            "q": "Identify and explain the use of symbolism in a key scene.",
            "marks": 5,
            "answer": "The use of light and darkness serves as powerful symbolism representing hope and despair, with key scenes using these elements to emphasize the emotional and moral journey of characters."
          },
          {
            "q": "How does the author use dialogue to reveal character traits?",
            "marks": 5,
            "answer": "The author employs distinct speech patterns, vocabulary choices, and conversational styles for each character, allowing readers to understand their personalities, backgrounds, and emotional states without explicit descriptions."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the time limit for this exam?",
        "a": "The time limit for this Class 8 English Sample Paper is 3 hours."
      },
      {
        "q": "How many marks is this paper out of?",
        "a": "This sample paper is out of 80 marks, divided equally among four sections."
      },
      {
        "q": "Are calculators allowed in this exam?",
        "a": "Since this is an English paper, calculators are not required. All answers are based on language skills, comprehension, and writing abilities."
      }
    ]
  },
  {
    "slug": "class-8-social-science",
    "classLevel": "8",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "Class 8 Social Science Sample Paper Set 1",
    "intro": "This comprehensive sample paper covers History, Geography, and Civics as per CBSE Class 8 curriculum. It tests students understanding of Indian history, physical and human geography, and democratic processes.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: History",
        "marks": 25,
        "instructions": "Answer the following questions based on Indian history.",
        "questions": [
          {
            "q": "What were the main reasons for the decline of the Mughal Empire?",
            "marks": 5,
            "answer": "The main reasons included weak leadership after Aurangzeb, economic decline, religious conflicts, rise of regional powers, and ultimately the challenge posed by European colonial powers."
          },
          {
            "q": "Describe the impact of the British Industrial Revolution on Indian economy.",
            "marks": 5,
            "answer": "The Industrial Revolution led to increased demand for raw materials from India, decline of traditional industries, introduction of railways, and integration of India into the colonial economy, ultimately leading to economic exploitation."
          },
          {
            "q": "What was the significance of the Battle of Plassey?",
            "marks": 5,
            "answer": "The Battle of Plassey in 1757 marked the beginning of British dominance in India. Robert Clive defeated Bengal Nawab Siraj-ud-Daulah, establishing East India Company rule and paving the way for British territorial expansion."
          },
          {
            "q": "Explain the social reforms initiated by Raja Ram Mohan Roy.",
            "marks": 5,
            "answer": "Raja Ram Mohan Roy founded the Brahmo Samaj and worked for social reforms including abolition of sati, promotion of education for women, and reform of Hindu practices to align with rational thinking."
          },
          {
            "q": "What role did the printing press play in spreading nationalist ideas?",
            "marks": 5,
            "answer": "The printing press enabled mass production of newspapers, pamphlets, and books that spread nationalist and reformist ideas, creating awareness among educated classes and fostering a sense of national identity."
          }
        ]
      },
      {
        "name": "Section B: Geography",
        "marks": 25,
        "instructions": "Answer questions related to Indian and world geography.",
        "questions": [
          {
            "q": "Describe the geographical features that make the Western Ghats a biodiversity hotspot.",
            "marks": 5,
            "answer": "The Western Ghats have high altitude, abundant rainfall, dense forests, and varied terrain creating diverse ecological zones. These features support numerous endemic species of plants and animals, making it a biodiversity hotspot."
          },
          {
            "q": "What is the significance of the monsoon pattern in agriculture?",
            "marks": 5,
            "answer": "Monsoons bring essential rainfall for crops, determine agricultural seasons, influence crop selection, and affect food security. The timing and intensity of monsoons directly impact agricultural output across India."
          },
          {
            "q": "Explain the formation of the Himalayas and its relevance to India.",
            "marks": 5,
            "answer": "The Himalayas were formed by the collision of the Indian and Eurasian tectonic plates. They protect India from cold winds, influence climate, are a source of major rivers, and are crucial for Indias water security."
          },
          {
            "q": "How do ocean currents affect climate in coastal regions?",
            "marks": 5,
            "answer": "Ocean currents regulate temperature by transporting warm or cold water, influence precipitation patterns, affect wind direction, and moderate the climate of coastal areas, making them warmer or cooler than inland regions."
          },
          {
            "q": "What are the major soil types in India and their agricultural importance?",
            "marks": 5,
            "answer": "Major soil types include alluvial, black, laterite, and red soils. Alluvial soils are very fertile and support major crops. Black soils are ideal for cotton. Laterite soils support plantation crops. Each type determines the crops grown."
          }
        ]
      },
      {
        "name": "Section C: Civics",
        "marks": 30,
        "instructions": "Answer questions on Indian Constitution and democratic processes.",
        "questions": [
          {
            "q": "What are the fundamental rights guaranteed by the Indian Constitution?",
            "marks": 5,
            "answer": "Fundamental rights include right to equality, freedom of religion, right to freedom (speech, expression, association), right to constitutional remedies, and protection from exploitation and discrimination."
          },
          {
            "q": "Explain the principle of separation of powers in Indian government.",
            "marks": 5,
            "answer": "The separation of powers divides government into executive (implements laws), legislative (makes laws), and judicial (interprets laws) branches. This prevents concentration of power and ensures checks and balances."
          },
          {
            "q": "What is the role of an independent judiciary in a democracy?",
            "marks": 5,
            "answer": "An independent judiciary protects citizens rights, ensures fair justice, interprets laws impartially, acts as custodian of the Constitution, and serves as a check on executive and legislative powers."
          },
          {
            "q": "How are local governments important for citizen participation?",
            "marks": 5,
            "answer": "Local governments bring governance closer to citizens, enable direct participation in decision-making, address community-specific issues, promote transparency, and develop civic consciousness among residents."
          },
          {
            "q": "What are the functions of the Election Commission of India?",
            "marks": 5,
            "answer": "The Election Commission conducts free and fair elections, ensures voter participation, prevents electoral malpractices, maintains electoral code of conduct, and safeguards democratic principles during elections."
          },
          {
            "q": "Explain the role of civil society organizations in democracy.",
            "marks": 5,
            "answer": "Civil society organizations monitor government accountability, advocate for citizens rights, mobilize public opinion, provide social services, raise awareness on issues, and strengthen democratic participation beyond elections."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this sample paper based on the latest CBSE curriculum?",
        "a": "Yes, this sample paper is designed according to the latest CBSE Class 8 Social Science curriculum guidelines."
      },
      {
        "q": "How many sections are there in this paper?",
        "a": "There are three sections: History (25 marks), Geography (25 marks), and Civics (30 marks), totaling 80 marks."
      },
      {
        "q": "Should I prepare all topics equally?",
        "a": "Yes, you should prepare all topics equally as the sample paper covers important concepts from History, Geography, and Civics proportionally."
      }
    ]
  },
  {
    "slug": "class-7-maths-set-2",
    "classLevel": "7",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "Class 7 Mathematics Sample Paper Set 2",
    "intro": "This mathematics sample paper tests competency in numbers, algebra, geometry, and data handling. It follows CBSE Class 7 curriculum and includes problems of varying difficulty levels.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Arithmetic and Algebra",
        "marks": 25,
        "instructions": "Solve the following problems. Show all working.",
        "questions": [
          {
            "q": "Simplify: 3/4 + 5/6 - 1/2",
            "marks": 5,
            "answer": "3/4 + 5/6 - 1/2 = 9/12 + 10/12 - 6/12 = 13/12 = 1 1/12"
          },
          {
            "q": "Solve for x: 2x + 7 = 19",
            "marks": 5,
            "answer": "2x = 19 - 7 = 12, x = 6"
          },
          {
            "q": "Find the value of 5^3 - 3^2 + 2^4",
            "marks": 5,
            "answer": "5^3 = 125, 3^2 = 9, 2^4 = 16. Therefore, 125 - 9 + 16 = 132"
          },
          {
            "q": "What is 15% of 200?",
            "marks": 5,
            "answer": "15% of 200 = (15/100) × 200 = 30"
          },
          {
            "q": "Solve: 3x - 5 = x + 7",
            "marks": 5,
            "answer": "3x - x = 7 + 5, 2x = 12, x = 6"
          }
        ]
      },
      {
        "name": "Section B: Geometry",
        "marks": 25,
        "instructions": "Answer geometry questions with proper reasoning.",
        "questions": [
          {
            "q": "Find the area of a rectangle with length 12 cm and breadth 8 cm.",
            "marks": 5,
            "answer": "Area = length × breadth = 12 × 8 = 96 square cm"
          },
          {
            "q": "What is the sum of interior angles of a triangle?",
            "marks": 5,
            "answer": "The sum of interior angles of a triangle is 180 degrees."
          },
          {
            "q": "Find the perimeter of a square with side 10 cm.",
            "marks": 5,
            "answer": "Perimeter = 4 × side = 4 × 10 = 40 cm"
          },
          {
            "q": "Calculate the area of a circle with radius 7 cm (use π = 22/7).",
            "marks": 5,
            "answer": "Area = πr^2 = (22/7) × 7 × 7 = 22 × 7 = 154 square cm"
          },
          {
            "q": "If two angles of a triangle are 50 degrees and 60 degrees, find the third angle.",
            "marks": 5,
            "answer": "Third angle = 180 - 50 - 60 = 70 degrees"
          }
        ]
      },
      {
        "name": "Section C: Data Handling and Mensuration",
        "marks": 30,
        "instructions": "Interpret data and solve problems related to measurement.",
        "questions": [
          {
            "q": "The heights of 5 students are 150, 155, 160, 152, 158 cm. Find the mean height.",
            "marks": 5,
            "answer": "Mean = (150 + 155 + 160 + 152 + 158) / 5 = 775 / 5 = 155 cm"
          },
          {
            "q": "Find the median of the dataset: 10, 20, 15, 25, 30",
            "marks": 5,
            "answer": "Arranging in order: 10, 15, 20, 25, 30. Median = 20 (middle value)"
          },
          {
            "q": "What is the volume of a cuboid with length 5 cm, breadth 4 cm, and height 3 cm?",
            "marks": 5,
            "answer": "Volume = length × breadth × height = 5 × 4 × 3 = 60 cubic cm"
          },
          {
            "q": "If a cylinder has radius 5 cm and height 10 cm, find its surface area (use π = 3.14).",
            "marks": 5,
            "answer": "Curved surface area = 2πrh = 2 × 3.14 × 5 × 10 = 314 square cm. Total surface area = 314 + 2π(5^2) = 314 + 157 = 471 square cm"
          },
          {
            "q": "The range of a dataset is 50. If the smallest value is 10, what is the largest value?",
            "marks": 5,
            "answer": "Range = Largest value - Smallest value. 50 = Largest - 10. Largest value = 60"
          },
          {
            "q": "Find the probability of rolling a 5 on a standard six-sided die.",
            "marks": 5,
            "answer": "Probability = Number of favorable outcomes / Total outcomes = 1/6"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Can I use a calculator for this exam?",
        "a": "A calculator may be used for complex calculations, but basic arithmetic should be done manually as per your schools guidelines."
      },
      {
        "q": "Is all of Class 7 mathematics covered in this paper?",
        "a": "Yes, the sample paper covers major topics from the entire Class 7 mathematics curriculum."
      },
      {
        "q": "How much time should I spend on each section?",
        "a": "Allocate approximately 50 minutes for each section of 25 marks and 60 minutes for the final section of 30 marks."
      }
    ]
  },
  {
    "slug": "class-6-maths",
    "classLevel": "6",
    "subject": "Mathematics",
    "board": "CBSE",
    "title": "Class 6 Mathematics Sample Paper",
    "intro": "This sample paper introduces fundamental mathematical concepts including numbers, fractions, geometry basics, and data interpretation. It is designed to assess foundational skills in Class 6 mathematics.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Numbers and Operations",
        "marks": 20,
        "instructions": "Solve the following number problems.",
        "questions": [
          {
            "q": "Write the place value of 7 in 27,543.",
            "marks": 5,
            "answer": "The place value of 7 in 27,543 is 7,000 (thousands place)."
          },
          {
            "q": "Add: 234 + 567 + 123",
            "marks": 5,
            "answer": "234 + 567 + 123 = 924"
          },
          {
            "q": "Multiply: 15 × 12",
            "marks": 5,
            "answer": "15 × 12 = 180"
          },
          {
            "q": "Divide: 144 ÷ 12",
            "marks": 5,
            "answer": "144 ÷ 12 = 12"
          }
        ]
      },
      {
        "name": "Section B: Fractions and Decimals",
        "marks": 20,
        "instructions": "Work with fractions and decimal numbers.",
        "questions": [
          {
            "q": "Simplify: 8/12",
            "marks": 5,
            "answer": "8/12 = 2/3"
          },
          {
            "q": "Add: 1/4 + 1/2",
            "marks": 5,
            "answer": "1/4 + 1/2 = 1/4 + 2/4 = 3/4"
          },
          {
            "q": "Convert 0.5 to a fraction.",
            "marks": 5,
            "answer": "0.5 = 5/10 = 1/2"
          },
          {
            "q": "Which is greater: 3/5 or 1/2?",
            "marks": 5,
            "answer": "3/5 = 6/10, 1/2 = 5/10. Therefore, 3/5 > 1/2"
          }
        ]
      },
      {
        "name": "Section C: Geometry and Measurement",
        "marks": 20,
        "instructions": "Solve geometry and measurement problems.",
        "questions": [
          {
            "q": "Find the perimeter of a square with side 8 cm.",
            "marks": 5,
            "answer": "Perimeter = 4 × side = 4 × 8 = 32 cm"
          },
          {
            "q": "What is the area of a rectangle with length 10 cm and width 5 cm?",
            "marks": 5,
            "answer": "Area = length × width = 10 × 5 = 50 square cm"
          },
          {
            "q": "How many sides does a pentagon have?",
            "marks": 5,
            "answer": "A pentagon has 5 sides."
          },
          {
            "q": "Convert 500 grams to kilograms.",
            "marks": 5,
            "answer": "500 grams = 500/1000 = 0.5 kilograms"
          }
        ]
      },
      {
        "name": "Section D: Data and Probability",
        "marks": 20,
        "instructions": "Interpret and analyze data.",
        "questions": [
          {
            "q": "Find the mean of: 5, 10, 15, 20, 25",
            "marks": 5,
            "answer": "Mean = (5 + 10 + 15 + 20 + 25) / 5 = 75 / 5 = 15"
          },
          {
            "q": "What is the mode in this dataset: 2, 3, 3, 4, 5, 5, 5?",
            "marks": 5,
            "answer": "Mode = 5 (appears most frequently)"
          },
          {
            "q": "If a bag has 3 red balls and 5 blue balls, what is the probability of drawing a red ball?",
            "marks": 5,
            "answer": "Probability = 3 / (3 + 5) = 3/8"
          },
          {
            "q": "Find the range of the dataset: 10, 20, 25, 35, 40",
            "marks": 5,
            "answer": "Range = 40 - 10 = 30"
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this paper suitable for self-assessment?",
        "a": "Yes, this sample paper is ideal for self-assessment and identifying areas that need more practice."
      },
      {
        "q": "How difficult is this paper compared to the actual exam?",
        "a": "This sample paper covers a similar difficulty level as the actual CBSE Class 6 examination."
      },
      {
        "q": "Can parents use this to help their child prepare?",
        "a": "Absolutely, this paper provides a good practice resource for parents to support their childs learning."
      }
    ]
  },
  {
    "slug": "class-6-science",
    "classLevel": "6",
    "subject": "Science",
    "board": "CBSE",
    "title": "Class 6 Science Sample Paper",
    "intro": "This science sample paper covers physical science, life science, and earth science topics from the Class 6 curriculum. It emphasizes conceptual understanding and observation skills.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Life Science",
        "marks": 25,
        "instructions": "Answer questions about living organisms and life processes.",
        "questions": [
          {
            "q": "Name the five kingdoms of classification.",
            "marks": 5,
            "answer": "The five kingdoms are: Monera, Protista, Fungi, Plantae, and Animalia."
          },
          {
            "q": "What is photosynthesis? Write the equation.",
            "marks": 5,
            "answer": "Photosynthesis is the process by which plants use sunlight, water, and CO2 to make food. Equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2"
          },
          {
            "q": "Describe the structure of a plant cell.",
            "marks": 5,
            "answer": "A plant cell contains a cell wall, cell membrane, nucleus, cytoplasm, mitochondria, chloroplasts, and vacuoles. The cell wall provides rigidity and protection."
          },
          {
            "q": "What are the four types of teeth and their functions?",
            "marks": 5,
            "answer": "Incisors cut food, canines tear food, premolars crush food, and molars grind food. This helps in the first stage of digestion called mechanical digestion."
          },
          {
            "q": "Explain the water cycle in brief.",
            "marks": 5,
            "answer": "Water evaporates from water bodies, condenses into clouds, and falls as precipitation (rain/snow). This cycle repeats continuously and is essential for life on Earth."
          }
        ]
      },
      {
        "name": "Section B: Physical Science",
        "marks": 25,
        "instructions": "Answer questions on matter, energy, and forces.",
        "questions": [
          {
            "q": "Define force and give three examples.",
            "marks": 5,
            "answer": "Force is a push or pull that causes an object to move or change direction. Examples: gravity pulling objects down, friction between surfaces, and a person pushing a door."
          },
          {
            "q": "What is the difference between speed and velocity?",
            "marks": 5,
            "answer": "Speed is the distance covered per unit time without direction, while velocity is the displacement per unit time with direction. Velocity is a vector quantity."
          },
          {
            "q": "Explain the three states of matter with examples.",
            "marks": 5,
            "answer": "Solid has fixed shape and volume (ice). Liquid has fixed volume but takes the shape of container (water). Gas has no fixed shape or volume (steam)."
          },
          {
            "q": "What is friction? How is it useful in daily life?",
            "marks": 5,
            "answer": "Friction is the resistance between surfaces in contact. It is useful for walking, writing with a pen, car braking, and grip. However, it can also cause energy loss."
          },
          {
            "q": "Describe the properties of magnetic materials.",
            "marks": 5,
            "answer": "Magnetic materials are attracted to magnets, contain iron or similar elements, have magnetic poles (North and South), and can be permanent or temporary magnets."
          }
        ]
      },
      {
        "name": "Section C: Earth Science and Environment",
        "marks": 30,
        "instructions": "Answer questions about the Earth and its systems.",
        "questions": [
          {
            "q": "What is the atmosphere? What are its main layers?",
            "marks": 5,
            "answer": "The atmosphere is the layer of air surrounding Earth. Main layers from bottom to top are: Troposphere, Stratosphere, Mesosphere, Thermosphere, and Exosphere."
          },
          {
            "q": "Explain weather and climate. What is the difference?",
            "marks": 5,
            "answer": "Weather is short-term atmospheric conditions, while climate is long-term weather patterns of a region over years. Weather changes daily; climate is relatively stable."
          },
          {
            "q": "What causes earthquakes and volcanoes?",
            "marks": 5,
            "answer": "Both are caused by plate tectonics. Earthquakes occur when tectonic plates slide past each other. Volcanoes form where magma erupts through the Earths crust."
          },
          {
            "q": "Describe the rock cycle.",
            "marks": 5,
            "answer": "Igneous rocks form from magma. Weathering breaks them into sediment. Sediment compacts to form sedimentary rocks. Heat and pressure transform these into metamorphic rocks. Melting completes the cycle."
          },
          {
            "q": "What are renewable and non-renewable resources? Give examples.",
            "marks": 5,
            "answer": "Renewable resources can be replenished (solar, wind, water). Non-renewable resources cannot be easily replaced (coal, oil, natural gas, minerals)."
          },
          {
            "q": "How does soil formation occur? Why is soil important?",
            "marks": 5,
            "answer": "Soil forms through weathering of rocks and decomposition of organic matter over time. It is important for plant growth, water filtration, habitat for organisms, and agriculture."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does this paper follow the NCERT textbook?",
        "a": "Yes, this sample paper is aligned with the NCERT Class 6 Science curriculum."
      },
      {
        "q": "Are diagrams required in this exam?",
        "a": "Yes, diagrams with proper labels are often required for answers in science to demonstrate understanding."
      },
      {
        "q": "What topics should I focus on most?",
        "a": "Give equal emphasis to Life Science, Physical Science, and Earth Science as all three are important and carry equal marks."
      }
    ]
  },
  {
    "slug": "class-11-biology",
    "classLevel": "11",
    "subject": "Biology",
    "board": "CBSE",
    "title": "Class 11 Biology Sample Paper",
    "intro": "This advanced biology sample paper covers cellular biology, genetics, ecology, and human physiology. It is designed for students preparing for competitive exams and CBSE board examinations.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Cell Biology and Genetics",
        "marks": 25,
        "instructions": "Answer detailed questions on cell structure and genetic principles.",
        "questions": [
          {
            "q": "Explain the fluid mosaic model of cell membrane and discuss its significance.",
            "marks": 5,
            "answer": "The fluid mosaic model proposes that the cell membrane is a flexible structure with phospholipids forming a bilayer and proteins embedded throughout. It explains membrane fluidity, selective permeability, and dynamic nature of biological membranes."
          },
          {
            "q": "Compare mitosis and meiosis with respect to chromosome number and genetic variation.",
            "marks": 5,
            "answer": "Mitosis produces two identical diploid cells with no genetic variation. Meiosis produces four haploid cells with genetic variation through crossing over and independent assortment."
          },
          {
            "q": "What is the central dogma of molecular biology? Explain transcription and translation.",
            "marks": 5,
            "answer": "The central dogma states DNA → RNA → Protein. Transcription converts DNA to mRNA in the nucleus. Translation converts mRNA to proteins at ribosomes."
          },
          {
            "q": "Describe the structure and function of mitochondria.",
            "marks": 5,
            "answer": "Mitochondria have double membranes with cristae. The matrix contains enzymes for Krebs cycle. It is the powerhouse of the cell, producing ATP through aerobic respiration."
          },
          {
            "q": "Explain Mendelian genetics and the law of segregation with an example.",
            "marks": 5,
            "answer": "Mendel discovered that traits are inherited through genes. Law of segregation: allele pairs separate during gamete formation. Example: TT and tt parents produce Tt offspring with dominant phenotype."
          }
        ]
      },
      {
        "name": "Section B: Plant and Animal Physiology",
        "marks": 25,
        "instructions": "Answer questions on body systems and physiological processes.",
        "questions": [
          {
            "q": "Describe the path of blood circulation through the heart and explain the significance of the valves.",
            "marks": 5,
            "answer": "Blood from body enters right atrium, flows to right ventricle, then to lungs. From lungs, oxygenated blood returns to left atrium, then left ventricle, and pumps to body. Valves prevent backflow."
          },
          {
            "q": "Explain the process of photosynthesis including light-dependent and light-independent reactions.",
            "marks": 5,
            "answer": "Light reactions occur in thylakoids producing ATP and NADPH using light energy. Dark reactions (Calvin cycle) occur in stroma, using ATP and NADPH to fix CO2 and produce glucose."
          },
          {
            "q": "Describe the human nervous system and the reflex arc.",
            "marks": 5,
            "answer": "Nervous system has CNS and PNS. Reflex arc is automatic response: stimulus → sensory neuron → spinal cord → motor neuron → muscle response, bypassing the brain."
          },
          {
            "q": "What is homeostasis? Give three examples of homeostatic mechanisms.",
            "marks": 5,
            "answer": "Homeostasis is maintaining stable internal environment. Examples: thermoregulation maintaining body temperature, osmoregulation balancing water and salts, and pH regulation in blood."
          },
          {
            "q": "Explain the process of respiration and the role of oxygen.",
            "marks": 5,
            "answer": "Respiration includes glycolysis, Krebs cycle, and electron transport chain. Oxygen is the final electron acceptor, enabling complete ATP production. Without oxygen, only anaerobic respiration occurs."
          }
        ]
      },
      {
        "name": "Section C: Ecology and Evolution",
        "marks": 30,
        "instructions": "Answer comprehensive questions on ecosystems and evolution.",
        "questions": [
          {
            "q": "Define population and community. Explain population growth patterns.",
            "marks": 5,
            "answer": "Population is all organisms of one species in an area. Community is all populations in an area. Growth follows exponential (J-curve) or logistic (S-curve) pattern depending on resource availability."
          },
          {
            "q": "Describe the nitrogen cycle and its importance.",
            "marks": 5,
            "answer": "Nitrogen cycle includes: nitrogen fixation (atmosphere to soil), nitrification, assimilation, and denitrification (back to atmosphere). It maintains nitrogen availability for proteins and nucleic acids."
          },
          {
            "q": "What is biodiversity? Why is biodiversity conservation important?",
            "marks": 5,
            "answer": "Biodiversity is the variety of organisms at all levels. Conservation is important for ecosystem stability, genetic resources, medicinal value, and ecosystem services."
          },
          {
            "q": "Explain natural selection and provide an example of adaptive radiation.",
            "marks": 5,
            "answer": "Natural selection favors organisms best adapted to environment. Adaptive radiation: Darwin finches in Galapagos evolved different beak shapes from one ancestor, adapting to different food sources."
          },
          {
            "q": "What is succession? Explain primary and secondary succession.",
            "marks": 5,
            "answer": "Succession is gradual change in community composition. Primary succession starts from bare rock, secondary succession on disturbed land. Both lead to climax community."
          },
          {
            "q": "Describe parasitism, mutualism, and commensalism with examples.",
            "marks": 5,
            "answer": "Parasitism: parasite benefits, host harmed (tapeworm-human). Mutualism: both benefit (bee-flower). Commensalism: one benefits, other unaffected (remora-shark)."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Are diagrams essential for scoring full marks?",
        "a": "Yes, labeled diagrams of cells, systems, and processes are essential for demonstrating understanding and often carry significant marks."
      },
      {
        "q": "What are the most important chapters for the board exam?",
        "a": "Cell biology, genetics, photosynthesis, respiration, nervous system, and reproduction are high-weightage chapters in CBSE Class 11 Biology."
      },
      {
        "q": "How can I prepare for the practical exam?",
        "a": "Practice microscopy, specimen identification, and experiment-based questions. Understanding the rationale behind experiments is more important than memorization."
      }
    ]
  },
  {
    "slug": "class-11-english",
    "classLevel": "11",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 11 English Sample Paper",
    "intro": "This English sample paper tests reading comprehension, grammar, critical thinking, and creative writing skills. It follows CBSE Class 11 curriculum with both prescribed texts and extended reading.",
    "duration": "3 hours",
    "totalMarks": 100,
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "marks": 30,
        "instructions": "Read the given passages and answer the questions comprehensively.",
        "questions": [
          {
            "q": "Analyze the authors perspective on environmental conservation and provide evidence from the passage.",
            "marks": 10,
            "answer": "The author emphasizes that individual and collective responsibility are equally important in environmental conservation. Evidence: the passage cites successful grassroots movements and personal choices like sustainable consumption as equally impactful as policy changes."
          },
          {
            "q": "What rhetorical devices does the author use to strengthen the argument?",
            "marks": 10,
            "answer": "The author uses metaphors comparing nature to living organisms, statistics providing concrete evidence, and personal anecdotes to appeal to both logic and emotion, making the argument compelling."
          },
          {
            "q": "How does the passage relate to contemporary global challenges?",
            "marks": 10,
            "answer": "The passage connects to climate change and resource depletion through its emphasis on sustainable practices and the finite nature of resources, showing relevance to current environmental crises."
          }
        ],
        "passage": "The earth does not belong to us in the way a house belongs to its owner. It is better understood as a living organism whose health we share — when its rivers are poisoned, something in us is poisoned too. That metaphor is not decoration. It is the most accurate description we have of a relationship in which the damage we do returns to us.\n\nThe figures are not in dispute. India loses roughly 1.6 million hectares of tree cover a decade. Groundwater in more than half of the country's districts is falling faster than it is replenished. Twenty-one of the world's thirty most polluted cities lie within our borders. Statistics of this kind provide concrete evidence for what would otherwise remain an argument about feelings.\n\nAnd yet the response is usually framed as a choice: either governments must act, or individuals must. This is a false division. Individual and collective responsibility are equally important — regulation without public will is unenforceable, and public will without regulation is merely well-intentioned. Ask yourself which of the two you have been waiting for, and whether the waiting has produced anything.\n\nThese are not distant concerns. Climate change and resource depletion are the same problem viewed over different timescales, and sustainable practice is the only response that addresses both. The generation now in school will spend its working life inside the consequences of decisions being taken, or avoided, this decade."
      },
      {
        "name": "Section B: Writing Skills",
        "marks": 30,
        "instructions": "Write coherent essays or letters as instructed with proper structure.",
        "questions": [
          {
            "q": "Write an argumentative essay on Digital Privacy vs National Security (400-450 words).",
            "marks": 15,
            "answer": "This topic requires presenting both sides with a clear thesis. A strong essay would argue that while national security is important, individual digital privacy is a fundamental right that must be protected through oversight mechanisms and transparent policies rather than unlimited surveillance."
          },
          {
            "q": "Write a formal letter to your local municipal corporation demanding better waste management (150-200 words).",
            "marks": 15,
            "answer": "Dear Municipal Commissioner, I write to request urgent action on waste management in our locality. Despite repeated complaints, waste accumulation remains a serious issue affecting public health and environment. I request implementation of regular waste collection schedules, segregation facilities, and awareness programs. Immediate intervention is essential. Yours sincerely, [Name]"
          }
        ]
      },
      {
        "name": "Section C: Grammar and Vocabulary",
        "marks": 20,
        "instructions": "Test grammar usage and vocabulary understanding.",
        "questions": [
          {
            "q": "Identify and correct the errors in this passage: The committee have decided to postpone their meeting tomorrow.",
            "marks": 5,
            "answer": "Error: have should be has (committee is singular). Corrected: The committee has decided to postpone its meeting tomorrow."
          },
          {
            "q": "Use the following idioms correctly in sentences: raining cats and dogs, break the ice.",
            "marks": 5,
            "answer": "It was raining cats and dogs when we started the journey. She used humor to break the ice at the formal dinner."
          },
          {
            "q": "Change the narration: He said, I love reading novels in my spare time.",
            "marks": 5,
            "answer": "He said that he loved reading novels in his spare time."
          },
          {
            "q": "Fill in the blanks with appropriate prepositions: He is keen ___ learning new languages and is interested ___ exploring different cultures.",
            "marks": 5,
            "answer": "He is keen on learning new languages and is interested in exploring different cultures."
          }
        ]
      },
      {
        "name": "Section D: Literature and Critical Reading",
        "marks": 20,
        "instructions": "Answer questions on prescribed texts and literary analysis. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Analyse the character development of the protagonist in a novel you have studied.",
            "marks": 10,
            "answer": "The protagonist evolves from an introverted, self-doubting individual to a confident leader through experiences of adversity and moral learning. Key turning points include confronting personal fears and choosing integrity over convenience."
          },
          {
            "q": "Compare and contrast two poems from the anthology focusing on their themes and poetic devices.",
            "marks": 10,
            "answer": "Poem A explores themes of loss through melancholic imagery and metaphor, while Poem B celebrates resilience using vivid sensory language and repetition. Both use nature symbolism but to opposite effects."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is the prescribed textbook sufficient for this exam?",
        "a": "The textbook is essential but supplementary reading of other works helps develop critical thinking and improves writing quality significantly."
      },
      {
        "q": "How important is grammar in scoring well?",
        "a": "Grammar is crucial in English exams. Poor grammar can cost marks even if content is good. Practice consistently and revise common errors."
      },
      {
        "q": "What should I focus on for literature questions?",
        "a": "Understand themes, character motivation, literary devices, and social context. Provide textual evidence for your interpretations and write analytically, not descriptively."
      }
    ]
  },
  {
    "slug": "class-12-english-set-2",
    "classLevel": "12",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 12 English Sample Paper Set 2",
    "intro": "This advanced English paper for Class 12 encompasses higher-order thinking skills, sophisticated literary analysis, and professional communication. It prepares students for university-level English studies.",
    "duration": "3 hours",
    "totalMarks": 100,
    "sections": [
      {
        "name": "Section A: Advanced Reading Comprehension",
        "marks": 25,
        "instructions": "Read and analyze complex passages with critical evaluation.",
        "questions": [
          {
            "q": "Critically evaluate the authors stance on artificial intelligence and its societal implications.",
            "marks": 10,
            "answer": "The author presents AI as a transformative tool requiring ethical guardrails. The evaluation should recognize the authors balanced view acknowledging both benefits and risks, while assessing the strength of arguments presented and identifying potential counter-arguments."
          },
          {
            "q": "How does the structure of the passage reinforce its argument?",
            "marks": 10,
            "answer": "The passage begins with concrete examples, moves to theoretical frameworks, and concludes with practical recommendations. This structure builds credibility through specificity before broadening to generalizations."
          },
          {
            "q": "Analyze the tone and its effectiveness in communicating the message.",
            "marks": 5,
            "answer": "The author adopts an academic yet accessible tone that builds trust. The conversational style makes complex ideas understandable without compromising rigor."
          }
        ],
        "passage": "Begin with what is already happening. A radiologist in Chennai reviews scans alongside a model that flags anomalies she might overlook at the end of a long shift. A bank intercepts a fraudulent transaction in the moment between a card being swiped and the payment clearing. A farmer receives a sowing date calculated from satellite imagery and thirty years of local rainfall. None of this is speculative; all of it is in use today.\n\nFrom these examples a general principle emerges. Artificial intelligence is best understood not as an intelligence at all but as an instrument of pattern recognition operating at a scale no human institution can match. Its power and its danger have the same source. A system that finds patterns in historical data will faithfully reproduce the injustices recorded in that data, and will present them with the unearned authority of arithmetic. Where a human prejudice can be argued with, an algorithmic one is frequently invisible.\n\nWhat follows is practical rather than alarmed. AI is a transformative tool that requires ethical guardrails, and those guardrails are specific and buildable: auditable training data, a named human accountable for every automated decision affecting a person's livelihood, and a legal right to an explanation. Societies that build these now will keep the benefits. Those that wait will find the systems already load-bearing and far harder to correct."
      },
      {
        "name": "Section B: Advanced Writing Skills",
        "marks": 30,
        "instructions": "Demonstrate sophisticated writing in various formats.",
        "questions": [
          {
            "q": "Write a comprehensive essay: The Role of Technology in Bridging or Widening Social Inequalities (500-600 words).",
            "marks": 15,
            "answer": "A strong response would present technology as a dual-edged tool: it enables access to information and opportunities but requires equitable distribution and digital literacy. The essay should discuss internet access gaps, algorithmic bias, and the digital divide while proposing solutions."
          },
          {
            "q": "Draft a professional resignation letter expressing your intention to pursue further studies (150-200 words).",
            "marks": 15,
            "answer": "Dear [Manager], I hereby resign from my position as [designation] effective [date]. I have decided to pursue further studies in [field] to advance my career. Thank you for the opportunities and learning provided. I am willing to ensure a smooth transition. Yours sincerely, [Name]"
          }
        ]
      },
      {
        "name": "Section C: Advanced Grammar and Lexicon",
        "marks": 20,
        "instructions": "Demonstrate mastery of grammar and sophisticated vocabulary usage.",
        "questions": [
          {
            "q": "Identify syntactic complexity issues and rewrite for clarity: Despite the government implementing policies to address climate change over the years and considering the substantial investments made, concerns regarding their effectiveness persist.",
            "marks": 5,
            "answer": "Although the government has implemented climate policies and invested substantially, their effectiveness remains questionable. Or: Despite substantial government investments in climate policies, their effectiveness is disputed."
          },
          {
            "q": "Use advanced vocabulary in context: Write sentences using propitious, obfuscate, and ameliorate correctly.",
            "marks": 5,
            "answer": "The propitious economic conditions enabled business expansion. The documentation attempted to obfuscate the financial irregularities. Environmental reforms aim to ameliorate pollution levels."
          },
          {
            "q": "Convert the following into indirect speech with appropriate tense adjustments: She asked, Have you completed the report, or will you finish it by tomorrow?",
            "marks": 5,
            "answer": "She asked whether I had completed the report or would finish it by the following day."
          },
          {
            "q": "Analyze the use of parallelism in this sentence and explain its effect: To analyze effectively, to synthesize thoughtfully, and to evaluate critically are essential skills.",
            "marks": 5,
            "answer": "The parallel structure uses three infinitive phrases in succession, creating rhythm and emphasizing equal importance of all three skills. This device enhances readability and persuasiveness."
          }
        ]
      },
      {
        "name": "Section D: Literary Critique and Analysis",
        "marks": 25,
        "instructions": "Demonstrate deep literary understanding and critical analysis.",
        "questions": [
          {
            "q": "Compare the narrative techniques of two novels you have studied, discussing how they serve thematic purposes.",
            "marks": 10,
            "answer": "Novel A uses first-person narrative creating intimate access to the protagonists psychology, reinforcing themes of self-discovery. Novel B employs third-person omniscient narration allowing broader perspective on societal impact, supporting its theme of individual versus society."
          },
          {
            "q": "Analyse the use of symbolism in a poem you have studied to discuss its deeper meanings.",
            "marks": 10,
            "answer": "Symbols such as light represent hope, darkness represents despair or ignorance, and journeys represent life paths. These recurring symbols create thematic cohesion and invite multiple interpretations."
          },
          {
            "q": "Evaluate how contemporary adaptations of classic texts maintain or transform their original themes.",
            "marks": 5,
            "answer": "Modern adaptations often contextualize classic themes in contemporary settings, making them relevant to current audiences while preserving core moral questions and character conflicts that remain universally applicable."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What level of literary analysis is expected in Class 12?",
        "a": "Class 12 expects sophisticated analysis including thematic interpretation, critical evaluation of authorial choices, and connections to broader social and cultural contexts."
      },
      {
        "q": "How should I approach unseen passages?",
        "a": "Read the passage multiple times, identify the main idea, tone, and purpose, then answer analytical questions supported by textual evidence rather than general knowledge."
      },
      {
        "q": "Are personal interpretations acceptable in literature questions?",
        "a": "Yes, but they must be supported by textual evidence and demonstrate understanding of literary devices and context. Vague opinions without textual support are not valued."
      }
    ]
  },
  {
    "slug": "class-10-hindi-set-2",
    "classLevel": "10",
    "subject": "Hindi",
    "board": "CBSE",
    "title": "Class 10 Hindi Sample Paper Set 2",
    "intro": "This Hindi sample paper tests reading comprehension, grammar, writing, and literature comprehension. It follows CBSE Class 10 curriculum emphasizing practical communication skills and literary appreciation.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Padhna evam Samjhna (Reading Comprehension)",
        "marks": 20,
        "instructions": "Diye gaye gadyaansh ko padhkar prashon ke uttar dijiye.",
        "questions": [
          {
            "q": "Lekhak ke anusar samaj mein shiksha ka kya mahatva hai?",
            "marks": 5,
            "answer": "Lekhak ke anusar shiksha samuday ke vikas ke liye anivary hai. Yah manushya ko sathaak soch vidhi sikhati hai aur unhe samasya samadhan mein saham dene ke layak banati hai."
          },
          {
            "q": "Paryavarani suraksha mein vyaktigat dayan kya hona chahiye? Gadyaansh se saposhan lijiye.",
            "marks": 5,
            "answer": "Prayavarani suraksha mein har vyakti ko apna yogdan dena chahiye. Gadyaansh se lagta hai ki alag-alag karya jaise ped lagana, pradushan kam karna, aur jala sanrakshan vyaktigat daayitva hain."
          },
          {
            "q": "Gadyaansh ke main uddeshya kya hain?",
            "marks": 5,
            "answer": "Main uddeshya log ko samajdari se sochne aur apni dayitva samjhne ke liye pravrit karna hai. Lekhak chahta hai ki logo mein soshik soch samvigyan sampdaye."
          },
          {
            "q": "Lekhak ne kaunsa udaharan diya hai?",
            "marks": 5,
            "answer": "Lekhak ne chote karyon jaise kapde dusre layak bananaa, khana noi samagri mein badlana, aur pani bacana ka udaharan diya hai."
          }
        ]
      },
      {
        "name": "Section B: Vyakaran aur Bhasha Kaushal",
        "marks": 20,
        "instructions": "Vyakaran ke niyamon ko prayog karke sadhya kariye.",
        "questions": [
          {
            "q": "Khaali sthanon ko uchit sandarbhon se bhrijiye: Ravi ___ khel raha tha. (ho, hai, tha)",
            "marks": 5,
            "answer": "Ravi khel raha tha."
          },
          {
            "q": "Vakya mein shuddhi kijiye: Usne ghar mein ek chitrakari banaya.",
            "marks": 5,
            "answer": "Usne ghar mein ek chitrakari banani hai. Ya: Usne ghar mein chitrakari ki."
          },
          {
            "q": "Vilom shabd likijiye: Sukh, Drishya, Satya",
            "marks": 5,
            "answer": "Sukh - Dukh, Drishya - Adrishya, Satya - Asatya"
          },
          {
            "q": "Samanarthi shabd likijiye: Ped, Nadi, Akaash",
            "marks": 5,
            "answer": "Ped - Vriksh, Chhya Nadi - Jal Prasav, Akaash - Akash, Aasman"
          }
        ]
      },
      {
        "name": "Section C: Lekhan Kaushal",
        "marks": 20,
        "instructions": "Diye gaye vishay par sunder aur satik lekhan kijiye.",
        "questions": [
          {
            "q": "Apne vidyalay ke Mukhyadhyapak ko patra likhiye jisme vidyalay ke sadhan sudharn hetu anurodh kijiye (150-200 shabd).",
            "marks": 10,
            "answer": "Sammannit Mukhyadhyapak Mahodaya, Vinamrata poorvak prarthna karta hoon ki vidyalay ke adhyayan kendri ko sudhar diya jaye. Pustakon ki sangkhya kam hai aur padhai sadhan apayapt hain. Yadi sadhan barhaye jaye to vidyarthi behtar sikshn pa sakte hain. Aapki kripa paathrin rahegi. Saadar, [Naam]"
          },
          {
            "q": "Vishay: Sansthan Diwas pe ek anuchchhed likhiye (150-200 shabd).",
            "marks": 10,
            "answer": "Sansthan Divas sampoorn desh mein manate hain. Yah din hindustan ke svatantrata ke liye ladne wale mahapurushon ki yaad mein manaya jata hai. Is din log tiranga sjaate hain aur rashtragan gete hain. School aur karyalayon mein sammonlan aayojit hote hain. Yah divas humhe rashtra prem aur ek-dusre ke prati samman sikhata hai. Har vandevi ko chanhiye ki vah apne rashtra ke vikas mein saham de."
          }
        ]
      },
      {
        "name": "Section D: Sahitya Bodh",
        "marks": 20,
        "instructions": "Nidhaarit kaavy aur gadya par prashon ke uttar dijiye.",
        "questions": [
          {
            "q": "Nirdharit kavya ka mukhya bhav kya hai? Kavyak mein iska kaise upyog huwa hai?",
            "marks": 10,
            "answer": "Kavya ka mukhya bhav ishvar ke prati bhakti aur samuday ke prati prem hai. Kavy mein iska prayog ankayn ke maadyam se, prrtikon ke maadyam se, aur chhandi bhasha ke maadyam se huwa hai."
          },
          {
            "q": "Gadya ke khandiyon mein se kaunsa khand sabse prabhavanshali hai aur kyon?",
            "marks": 10,
            "answer": "Patra likhan ka section sabse prabhavanshali hai kyuki ismein pratyek par alag-alag manno ki samajh, samvedanshilta, aur bhasha ke niymon ka prayog dikha. Ishmein manav samvednashilta samj padi hai."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Kya Grammar question mein Hindi likhna anivary hai?",
        "a": "Haan, Hindi prashnapatri mein kam se kam 90% Hindi mein likha jana chahiye aur shuddh Hindi ka prayog zaroori hai."
      },
      {
        "q": "Sahitya ke prashan ke uttar kaun sa likhun?",
        "a": "Sahitya ke prashno mein tatva vishleshan hona chahiye. Sirf gadya sunana kaafi nahi; patra se saakshy de kar uttar dijiye."
      },
      {
        "q": "Lekhan mein kitne shabd hone chahiye?",
        "a": "Patra mein 150-200 shabd, Anuchchhed mein 150-200 shabd, Nibandh mein 200-250 shabd hone chahiye."
      }
    ]
  },
  {
    "slug": "class-9-english-set-2",
    "classLevel": "9",
    "subject": "English",
    "board": "CBSE",
    "title": "Class 9 English Sample Paper Set 2",
    "intro": "This Class 9 English sample paper bridges foundational and advanced skills, emphasizing comprehension, expression, grammar mastery, and appreciation of literature through diverse texts.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Reading Skills",
        "marks": 20,
        "instructions": "Read the passage carefully and answer the questions.",
        "questions": [
          {
            "q": "What does the author suggest about the relationship between technology and human creativity?",
            "marks": 5,
            "answer": "The author suggests that technology enhances rather than replaces human creativity. Technology provides tools that enable humans to express creative ideas more effectively and reach wider audiences."
          },
          {
            "q": "Identify and explain the main idea of the second paragraph.",
            "marks": 5,
            "answer": "The main idea is that successful innovations require both technological capability and human imagination. The paragraph emphasizes that technology alone cannot create meaningful products without creative input."
          },
          {
            "q": "What evidence does the author provide to support the claim?",
            "marks": 5,
            "answer": "The author provides examples of successful tech companies and creative professionals, showing how collaboration between technology and creativity has produced transformative products."
          },
          {
            "q": "How would you describe the authors tone throughout the passage?",
            "marks": 5,
            "answer": "The tone is optimistic and encouraging, suggesting that technology and creativity are complementary forces that together can solve problems and improve human life."
          }
        ],
        "passage": "There is an old fear that machines will one day make human imagination unnecessary. Watch a designer work with modern software, however, and the opposite seems true. The tools have not replaced her judgement; they have removed the drudgery that used to consume her afternoons, leaving her free to spend that time on the part only she can do — deciding what is worth making in the first place. Technology, in other words, enhances human creativity rather than replacing it.\n\nThis is why the innovations that succeed are almost never purely technical achievements. A breakthrough needs two things at once: the technological capability to build it, and the human imagination to see why anyone would want it. Capability without imagination produces clever products nobody uses. Imagination without capability produces beautiful ideas that never leave the notebook. Real innovation lives where the two meet.\n\nThe evidence is easy to find. The technology companies that endure are the ones that pair engineering strength with designers, writers and researchers who ask what people actually need. Equally, the creative professionals whose work reaches the widest audiences — film-makers, musicians, illustrators — are usually the ones who learned the new tools early and bent them to their own purposes rather than waiting to be told what the tools were for.\n\nThere is every reason to be optimistic. Technology and creativity are not rivals competing for the same ground; they are complementary forces, and the problems worth solving in the coming decades will need both of them working together."
      },
      {
        "name": "Section B: Writing Abilities",
        "marks": 20,
        "instructions": "Write clear, well-structured essays and letters.",
        "questions": [
          {
            "q": "Write a letter to your friend describing your recent school trip (150-200 words).",
            "marks": 10,
            "answer": "Dear [Friend], I had an amazing time on our recent school trip to [place]. We visited historical monuments and learned so much about our heritage. The guide was knowledgeable and made the experience interesting. I took many photographs and enjoyed group activities. The food was good and the accommodation comfortable. I wish you had been with us. Lets plan another trip soon. Your friend, [Name]"
          },
          {
            "q": "Write an essay on Environmental Conservation is Everyones Responsibility (200-250 words).",
            "marks": 10,
            "answer": "Environmental conservation is not the responsibility of governments alone but of every individual. We use natural resources daily and should ensure sustainable use. Simple actions like reducing plastic, planting trees, conserving water, and segregating waste contribute significantly. Schools and families must teach younger generations about environmental care. Industries must adopt eco-friendly practices. Together, collective efforts can address climate change and preserve biodiversity. Environmental conservation ensures a healthy future for our children."
          }
        ]
      },
      {
        "name": "Section C: Grammar and Vocabulary",
        "marks": 20,
        "instructions": "Test grammar rules and word knowledge.",
        "questions": [
          {
            "q": "Fill in the blanks with correct articles: ___ United Nations is ___ international organization working for peace.",
            "marks": 5,
            "answer": "The; an"
          },
          {
            "q": "Rewrite in passive voice: The teacher gave the students an assignment.",
            "marks": 5,
            "answer": "The students were given an assignment by the teacher."
          },
          {
            "q": "Use these words in sentences: persist, facilitate, resilience",
            "marks": 5,
            "answer": "Despite challenges, she continued to persist. Technology helps to facilitate communication. Resilience helped him overcome difficulties."
          },
          {
            "q": "Identify and correct the error: Neither of the students are here today.",
            "marks": 5,
            "answer": "Neither of the students is here today. (Neither takes singular verb)"
          }
        ]
      },
      {
        "name": "Section D: Literature and Comprehension",
        "marks": 20,
        "instructions": "Answer questions on prescribed texts. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Discuss the character of the protagonist and explain his/her motivations.",
            "marks": 10,
            "answer": "The protagonist is driven by personal ambition initially but undergoes transformation through experiences and relationships. Key motivations include desire for success, family loyalty, and eventually, personal integrity."
          },
          {
            "q": "Analyse the theme of a novel you have studied and show how it is developed.",
            "marks": 10,
            "answer": "The theme of resilience is developed through the protagonists journey facing repeated setbacks yet continuing to strive. The author uses conflicts, character interactions, and symbolic events to reinforce this central theme throughout the narrative."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the passing score for this paper?",
        "a": "Typically students need to score around 33-40% to pass the CBSE Class 9 English examination, though striving for higher marks is always encouraged."
      },
      {
        "q": "How should I manage time during the exam?",
        "a": "Allocate roughly 50 minutes to reading comprehension and writing, 40 minutes to grammar and vocabulary, and 30 minutes to literature. Keep 10 minutes for review."
      },
      {
        "q": "What are the most important sections to prepare?",
        "a": "Reading comprehension and writing carry the most marks, so practice these extensively. However, strong grammar and literature knowledge are essential for scoring well across all sections."
      }
    ]
  },
  {
    "slug": "class-12-computer-science-set-2",
    "classLevel": "12",
    "subject": "Computer Science",
    "board": "CBSE",
    "title": "Class 12 Computer Science Sample Paper Set 2",
    "intro": "This advanced computer science paper covers programming, data structures, database management, and networking. It evaluates practical coding skills and conceptual understanding required for IT careers.",
    "duration": "3 hours",
    "totalMarks": 70,
    "sections": [
      {
        "name": "Section A: Programming and Data Structures",
        "marks": 25,
        "instructions": "Answer programming questions with code snippets and explanations.",
        "questions": [
          {
            "q": "Write a Python function to check if a number is prime and test it with at least two examples.",
            "marks": 5,
            "answer": "def is_prime(n): if n < 2: return False; for i in range(2, int(n**0.5) + 1): if n % i == 0: return False; return True. Test: is_prime(17) returns True, is_prime(10) returns False."
          },
          {
            "q": "Explain stack and queue data structures. Give real-world applications of each.",
            "marks": 5,
            "answer": "Stack: LIFO (Last In First Out). Applications: undo operations in text editors, function call stack. Queue: FIFO (First In First Out). Applications: printer queue, customer service lines, breadth-first search."
          },
          {
            "q": "What is recursion? Write a recursive function to calculate factorial.",
            "marks": 5,
            "answer": "Recursion is when a function calls itself. def factorial(n): if n <= 1: return 1; return n * factorial(n-1). Example: factorial(5) = 120."
          },
          {
            "q": "Explain the difference between arrays and linked lists with advantages and disadvantages.",
            "marks": 5,
            "answer": "Arrays: contiguous memory, fast access O(1), slow insertion/deletion. Linked lists: non-contiguous memory, slow access O(n), fast insertion/deletion. Choice depends on use case."
          },
          {
            "q": "What is sorting? Name two sorting algorithms and compare their time complexities.",
            "marks": 5,
            "answer": "Sorting arranges data in order. Bubble sort: O(n^2) simple, inefficient for large data. Quick sort: O(n log n) average case, very efficient. Merge sort: O(n log n) guaranteed, requires extra space."
          }
        ]
      },
      {
        "name": "Section B: Database Management and SQL",
        "marks": 20,
        "instructions": "Write SQL queries and explain database concepts.",
        "questions": [
          {
            "q": "Create a table for Students with fields: RollNo (primary key), Name, Class, Percentage.",
            "marks": 5,
            "answer": "CREATE TABLE Students (RollNo INT PRIMARY KEY, Name VARCHAR(50), Class VARCHAR(5), Percentage FLOAT);"
          },
          {
            "q": "Write a query to find students with percentage greater than 75, sorted by percentage descending.",
            "marks": 5,
            "answer": "SELECT * FROM Students WHERE Percentage > 75 ORDER BY Percentage DESC;"
          },
          {
            "q": "Explain normalization and why it is important in database design.",
            "marks": 5,
            "answer": "Normalization removes redundancy and organizes data into related tables following normal forms (1NF, 2NF, 3NF). It improves data integrity, reduces storage, and makes updates efficient."
          },
          {
            "q": "What are constraints in SQL? Explain PRIMARY KEY, UNIQUE, and FOREIGN KEY.",
            "marks": 5,
            "answer": "Constraints enforce data integrity. PRIMARY KEY uniquely identifies records and cannot be null. UNIQUE ensures no duplicate values. FOREIGN KEY creates relationships between tables by referencing another tables primary key."
          }
        ]
      },
      {
        "name": "Section C: Networking and Cybersecurity",
        "marks": 15,
        "instructions": "Answer questions on computer networks and security.",
        "questions": [
          {
            "q": "What is the OSI model? List all seven layers.",
            "marks": 5,
            "answer": "OSI is a framework for network communication. Layers: 1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application."
          },
          {
            "q": "Explain TCP/IP and how it differs from OSI model.",
            "marks": 5,
            "answer": "TCP/IP is a practical model with 4 layers: Link, Internet, Transport, Application. It is simpler than OSI, combines some layers, and is the actual model used on the internet."
          },
          {
            "q": "What are common cybersecurity threats and how can they be prevented?",
            "marks": 5,
            "answer": "Threats: malware, phishing, ransomware. Prevention: use firewalls, antivirus software, strong passwords, regular updates, two-factor authentication, and awareness training."
          }
        ]
      },
      {
        "name": "Section D: Emerging Technologies and Ethics",
        "marks": 10,
        "instructions": "Discuss modern technologies and ethical implications.",
        "questions": [
          {
            "q": "What is artificial intelligence? List three applications and discuss one ethical concern.",
            "marks": 5,
            "answer": "AI simulates human intelligence. Applications: face recognition, recommendation systems, autonomous vehicles. Ethical concern: bias in algorithms leading to discrimination against minorities."
          },
          {
            "q": "Discuss the role of cloud computing in modern IT infrastructure.",
            "marks": 5,
            "answer": "Cloud computing provides on-demand computing resources over internet. Benefits: scalability, cost-efficiency, accessibility. Concerns: data security, vendor lock-in, privacy issues."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is practical coding experience necessary for this exam?",
        "a": "Yes, strong practical coding skills are essential. Practice writing and debugging code regularly using Python or C++."
      },
      {
        "q": "How much weight is given to theory vs practical?",
        "a": "Approximately 60-70% is practical (coding, SQL queries) and 30-40% is theory (concepts, algorithms, security)."
      },
      {
        "q": "Should I prepare all programming languages mentioned in curriculum?",
        "a": "Focus deeply on one language (Python recommended) and understand fundamental concepts. Knowledge of SQL for databases is mandatory."
      }
    ]
  },
  {
    "slug": "class-11-economics-set-2",
    "classLevel": "11",
    "subject": "Economics",
    "board": "CBSE",
    "title": "Class 11 Economics Sample Paper Set 2",
    "intro": "This economics sample paper covers microeconomics, macroeconomics, and Indian economy topics. It tests understanding of economic principles and their real-world applications.",
    "duration": "3 hours",
    "totalMarks": 80,
    "sections": [
      {
        "name": "Section A: Microeconomics",
        "marks": 25,
        "instructions": "Answer questions on individual economic units and market behavior.",
        "questions": [
          {
            "q": "Explain the law of demand and explain its exceptions.",
            "marks": 5,
            "answer": "Law of demand: inverse relationship between price and quantity demanded. Exceptions: Giffen goods (inferior goods where price increase increases demand), Veblen goods (prestige goods), and goods with speculative demand."
          },
          {
            "q": "What is elasticity of demand? Calculate price elasticity if price increases by 10% and quantity demanded falls by 20%.",
            "marks": 5,
            "answer": "Elasticity measures responsiveness of quantity to price changes. Price elasticity = % change in quantity / % change in price = -20% / 10% = -2. Demand is elastic."
          },
          {
            "q": "Explain perfect competition and list its characteristics.",
            "marks": 5,
            "answer": "Perfect competition has many buyers and sellers, homogeneous products, free entry/exit, perfect information, and no barriers. Firms are price takers, producing where P = MR = MC."
          },
          {
            "q": "What is monopoly? Explain how it differs from perfect competition.",
            "marks": 5,
            "answer": "Monopoly has one seller with significant market power. Unlike perfect competition, monopolists face downward-sloping demand, set prices, have barriers to entry, and earn economic profits."
          },
          {
            "q": "Define and calculate break-even point in production.",
            "marks": 5,
            "answer": "Break-even is where Total Revenue = Total Cost, profit = 0. Formula: BEP = Fixed Costs / (Price - Variable Cost per unit). Produces minimum output to avoid losses."
          }
        ]
      },
      {
        "name": "Section B: Macroeconomics",
        "marks": 25,
        "instructions": "Answer questions on economy-wide issues and policies.",
        "questions": [
          {
            "q": "What is GDP and how is it calculated? Explain nominal vs real GDP.",
            "marks": 5,
            "answer": "GDP is total value of goods and services produced. Calculated by expenditure method: C + I + G + (X-M). Nominal GDP uses current prices; real GDP adjusts for inflation, showing actual growth."
          },
          {
            "q": "Explain inflation and its causes. What are the effects of inflation?",
            "marks": 5,
            "answer": "Inflation is sustained increase in price levels. Causes: demand-pull inflation, cost-push inflation. Effects: reduced purchasing power, uncertainty in investment, eroded savings."
          },
          {
            "q": "What is unemployment? Explain types of unemployment.",
            "marks": 5,
            "answer": "Unemployment is when people are willing and able to work but lack jobs. Types: frictional (job transitions), structural (skills mismatch), cyclical (recession-related), seasonal."
          },
          {
            "q": "Describe monetary policy and tools used by central banks.",
            "marks": 5,
            "answer": "Monetary policy manages money supply to achieve price stability and growth. Tools: open market operations, reserve requirement changes, discount rate adjustments. RBI is Indias central bank."
          },
          {
            "q": "What is fiscal policy and how does it differ from monetary policy?",
            "marks": 5,
            "answer": "Fiscal policy uses government spending and taxes. Monetary policy controls money supply. Fiscal is discretionary but slow; monetary is flexible. Both aim for macroeconomic stability."
          }
        ]
      },
      {
        "name": "Section C: Indian Economy",
        "marks": 30,
        "instructions": "Answer questions on Indian economic structure and development.",
        "questions": [
          {
            "q": "Describe the structure of Indian economy by sectors. What is the distribution of workforce?",
            "marks": 5,
            "answer": "Primary sector (agriculture) contributes ~15% GDP but employs 40% workforce. Secondary (manufacturing) ~25% GDP, ~25% workforce. Tertiary (services) ~60% GDP, ~35% workforce."
          },
          {
            "q": "What is economic liberalization? How has it affected India since 1991?",
            "marks": 5,
            "answer": "Liberalization reduced government control, opened economy to foreign investment, and removed trade barriers. Results: increased FDI, rapid growth averaging ~7%, increased global integration, but also rising inequality."
          },
          {
            "q": "Explain the role of agriculture in Indian economy and challenges it faces.",
            "marks": 5,
            "answer": "Agriculture employs 40% population, contributes 15% GDP, provides raw materials. Challenges: land fragmentation, poor irrigation, dependence on monsoons, low productivity, farmer debt."
          },
          {
            "q": "What is the Make in India initiative? What are its objectives?",
            "marks": 5,
            "answer": "Make in India promotes manufacturing and attracts foreign investment. Objectives: create jobs, increase manufacturing sector contribution, develop infrastructure, boost exports, technology transfer."
          },
          {
            "q": "Discuss Indias fiscal policy in recent years. What is the debt-to-GDP ratio concern?",
            "marks": 5,
            "answer": "India maintains moderate fiscal deficit. Government spending on infrastructure and welfare increases debt. High debt-to-GDP ratio limits future spending, raises interest payments, affects macroeconomic stability."
          },
          {
            "q": "What are external sector issues facing India? Explain current account deficit.",
            "marks": 5,
            "answer": "Current account deficit occurs when imports exceed exports. Causes: oil price spikes, demand for foreign goods. Problems: foreign reserves depletion, currency depreciation, balance of payments crisis. Solutions: export promotion, import substitution."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How important is mathematical calculation in economics?",
        "a": "Approximately 40% of questions involve calculations like elasticity, GDP, break-even analysis. Practice numerical problems regularly."
      },
      {
        "q": "Should I memorize formulas?",
        "a": "Understand derivations rather than memorizing. If you understand concepts, deriving formulas is easier and shows deeper knowledge."
      },
      {
        "q": "How much focus on Indian economy is needed?",
        "a": "About 30-40% of the paper focuses on Indian economy. Study current economic issues, government policies, and structural changes."
      }
    ]
  },
  {
    "slug": "class-7-science",
    "classLevel": "Class 7",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 7 Science Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers all major topics in Class 7 Science including nutrition, respiration, transportation, and physical phenomena. Practice this paper to strengthen your understanding of foundational science concepts. This is a shortened practice set: 23 questions worth 45 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 45,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 10,
        "instructions": "Answer all 20 multiple choice questions. Each question carries 1 mark.",
        "questions": [
          {
            "q": "Photosynthesis occurs in which part of the plant cell?",
            "marks": 1,
            "answer": "Chloroplast"
          },
          {
            "q": "The process by which plants release oxygen is",
            "marks": 1,
            "answer": "Photosynthesis"
          },
          {
            "q": "Which gas is released during respiration?",
            "marks": 1,
            "answer": "Carbon dioxide"
          },
          {
            "q": "The main component of blood that fights infections is",
            "marks": 1,
            "answer": "White blood cells"
          },
          {
            "q": "Which organ pumps blood throughout the body?",
            "marks": 1,
            "answer": "Heart"
          },
          {
            "q": "The speed of sound in air is approximately",
            "marks": 1,
            "answer": "340 m/s"
          },
          {
            "q": "Which of the following is a scalar quantity?",
            "marks": 1,
            "answer": "Speed"
          },
          {
            "q": "Simple machines include all except",
            "marks": 1,
            "answer": "Computer"
          },
          {
            "q": "The SI unit of force is",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Which metal is liquid at room temperature?",
            "marks": 1,
            "answer": "Mercury"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 16,
        "instructions": "Answer all 8 questions, each carrying 2 marks.",
        "questions": [
          {
            "q": "Define nutrition. Name two types of nutrition.",
            "marks": 2,
            "answer": "Nutrition is the intake and utilization of nutrients. Types: Autotrophic (plants) and Heterotrophic (animals)."
          },
          {
            "q": "What is the difference between aerobic and anaerobic respiration?",
            "marks": 2,
            "answer": "Aerobic respiration uses oxygen; anaerobic respiration occurs without oxygen."
          },
          {
            "q": "Describe the pathway of blood circulation in the body.",
            "marks": 2,
            "answer": "Heart -> Arteries -> Capillaries -> Veins -> Heart. Arteries carry oxygenated blood; veins carry deoxygenated blood."
          },
          {
            "q": "What are the functions of the skeleton?",
            "marks": 2,
            "answer": "Support, protection of organs, movement, and mineral storage."
          },
          {
            "q": "How do sound waves travel through different media?",
            "marks": 2,
            "answer": "Sound travels as longitudinal waves through solids, liquids, and gases. Speed varies in different media."
          },
          {
            "q": "Define velocity and give an example with direction.",
            "marks": 2,
            "answer": "Velocity is speed in a given direction. Example: 60 km/h towards north."
          },
          {
            "q": "What is friction? How does it affect motion?",
            "marks": 2,
            "answer": "Friction is a force opposing motion. It slows down moving objects and prevents motion."
          },
          {
            "q": "Define work and give its SI unit.",
            "marks": 2,
            "answer": "Work is force multiplied by displacement. SI unit: Joule (J)."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 9,
        "instructions": "Answer all 3 questions, each carrying 3 marks.",
        "questions": [
          {
            "q": "Explain the process of photosynthesis with a chemical equation.",
            "marks": 3,
            "answer": "Photosynthesis uses sunlight, water, and carbon dioxide to produce glucose and oxygen. 6CO2 + 6H2O + light -> C6H12O6 + 6O2"
          },
          {
            "q": "Describe the human digestive system and the role of different organs.",
            "marks": 3,
            "answer": "Mouth breaks down food mechanically; stomach chemically; small intestine absorbs nutrients; large intestine absorbs water."
          },
          {
            "q": "What are renewable and non-renewable resources? Give examples of each.",
            "marks": 3,
            "answer": "Renewable: can be regenerated (solar, wind, water). Non-renewable: limited supply (coal, oil, natural gas)."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 10,
        "instructions": "Answer all questions; each carrying 5 marks. Answer 2 out of 3 questions.",
        "questions": [
          {
            "q": "Draw and label a diagram of plant and animal cells. Explain the differences.",
            "marks": 5,
            "answer": "Plant cells have cell wall, large vacuole, chloroplasts. Animal cells lack these. Both have nucleus, mitochondria, ribosomes."
          },
          {
            "q": "Explain Newton's laws of motion with practical examples.",
            "marks": 5,
            "answer": "1st: Objects remain at rest unless acted upon. 2nd: F=ma. 3rd: Action-reaction pairs. Example: Pushing a book accelerates it."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "How is Class 7 Science different from Class 6 Science?",
        "a": "Class 7 introduces more complex topics like photosynthesis, respiration, the circulatory system, and basic physics concepts."
      },
      {
        "q": "What is the total marks for Class 7 Science exam?",
        "a": "The total marks is 80, with 20 marks for internal assessment based on practicals and projects."
      },
      {
        "q": "Are diagrams important in the Class 7 Science exam?",
        "a": "Yes, diagrams are very important. Label them clearly with proper terminology to score full marks."
      }
    ]
  },
  {
    "slug": "class-7-english",
    "classLevel": "Class 7",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 7 English Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive English sample paper includes reading comprehension, grammar, writing, and literature sections. Master this paper to excel in all aspects of English language and literature. This is a shortened practice set: 17 questions worth 58 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 58,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 10,
        "instructions": "Read the passage and Answer all 5 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "What is the main idea of the passage about sustainable living?",
            "marks": 2,
            "answer": "The passage discusses how individuals can reduce their carbon footprint through simple daily habits like using renewable energy and reducing waste."
          },
          {
            "q": "Why did the author mention solar panels in the passage?",
            "marks": 2,
            "answer": "Solar panels are mentioned as an example of renewable energy that reduces dependence on fossil fuels."
          },
          {
            "q": "What does 'sustainable' mean in this context?",
            "marks": 2,
            "answer": "Sustainable means living in a way that doesn't deplete natural resources and can continue indefinitely."
          },
          {
            "q": "How can individuals contribute to environmental protection?",
            "marks": 2,
            "answer": "By recycling, using renewable energy, conserving water, and reducing consumption of single-use plastics."
          },
          {
            "q": "What is the tone of the passage?",
            "marks": 2,
            "answer": "The tone is informative and encouraging, motivating readers to adopt sustainable practices."
          }
        ],
        "passage": "Every choice we make at home leaves a mark on the planet. Scientists call the total effect of those choices our carbon footprint — the amount of greenhouse gas released because of the way we travel, eat, shop and use electricity. The encouraging news is that this footprint is not fixed. It shrinks the moment we begin living sustainably.\n\nTo live sustainably means to live in a way that does not use up natural resources faster than the earth can replace them — a way of living that could continue indefinitely without harming future generations. It does not demand dramatic sacrifice. It asks for steady, ordinary habits.\n\nConsider the rooftops of many Indian homes today. Solar panels installed there turn free sunlight into electricity, and every unit generated is a unit that did not have to be burned from coal or diesel. Solar power is a clear example of renewable energy — energy drawn from a source that refills itself — and the more we use it, the less we depend on fossil fuels.\n\nThere is a great deal an individual can do. Segregate waste and recycle paper, glass and metal. Switch to renewable energy where you can. Close the tap while brushing and repair leaking pipes to conserve water. Refuse single-use plastic bags, bottles and straws, and carry a cloth bag instead. None of these acts is difficult, and none of them is too small to matter.\n\nIf a hundred people in a colony make these changes, the saving is no longer small. That is the quiet power of sustainable living: it begins with one household and spreads."
      },
      {
        "name": "Section B - Grammar and Vocabulary",
        "marks": 12,
        "instructions": "Answer all 6 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "Fill in the blank: She ___ her homework yesterday. (did/does/will do)",
            "marks": 2,
            "answer": "did"
          },
          {
            "q": "Correct the sentence: He have gone to the market.",
            "marks": 2,
            "answer": "He has gone to the market."
          },
          {
            "q": "Choose the synonym of 'bright': (intelligent, dull, dark)",
            "marks": 2,
            "answer": "intelligent"
          },
          {
            "q": "Identify the part of speech of 'quickly' in: He ran quickly.",
            "marks": 2,
            "answer": "Adverb"
          },
          {
            "q": "Convert to passive voice: The gardener planted trees.",
            "marks": 2,
            "answer": "Trees were planted by the gardener."
          },
          {
            "q": "Identify the tense: They are playing cricket.",
            "marks": 2,
            "answer": "Present Continuous Tense"
          }
        ]
      },
      {
        "name": "Section C - Writing Skills",
        "marks": 18,
        "instructions": "Answer all 3 questions. Each question carries 6 marks.",
        "questions": [
          {
            "q": "Write a paragraph (100-120 words) on the importance of education.",
            "marks": 6,
            "answer": "Education is fundamental for personal growth and societal development. It provides knowledge, skills, and values necessary for success in life. Education empowers individuals to make informed decisions and contribute meaningfully to society. It opens doors to career opportunities and improves quality of life. Moreover, education fosters critical thinking and creativity. Investment in education is an investment in the future of individuals and nations alike."
          },
          {
            "q": "Write a letter to your principal requesting permission for a educational field trip.",
            "marks": 6,
            "answer": "Dear Principal Sir/Madam, I am writing to request permission for a class field trip to the Science Museum scheduled for next month. This visit will enhance our understanding of practical scientific concepts covered in our curriculum. The trip has been planned for educational benefit and will include activities supervised by our teachers. We request your approval and support for this valuable learning experience. Thanking you, [Student Name]"
          },
          {
            "q": "Describe your favorite book in 100 words.",
            "marks": 6,
            "answer": "My favorite book is 'Harry Potter and the Philosopher's Stone'. It is an engaging fantasy novel that transports readers into a magical world. The protagonist, Harry Potter, discovers his true identity as a wizard and embarks on adventures at Hogwarts School. The story combines mystery, friendship, and courage. J.K. Rowling's vivid imagination and character development make it compelling. The book teaches valuable lessons about bravery, loyalty, and good triumphing over evil. It has captivated millions of readers worldwide."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 18,
        "instructions": "Answer all 3 questions based on the prescribed texts. Each question carries 6 marks. Answer with reference to ANY ONE text you have studied in your NCERT textbook this year. There is no single correct answer — the model answer below shows the structure and depth an examiner looks for, not the only acceptable content.",
        "questions": [
          {
            "q": "Describe the character of the protagonist in a story you have studied. What are his/her key qualities?",
            "marks": 6,
            "answer": "The protagonist is courageous, kind, and determined. He demonstrates resilience in facing challenges and shows compassion towards others. His loyalty to friends and moral values guide his actions throughout the narrative."
          },
          {
            "q": "What is the central theme of a poem you have studied? Explain with examples from the text.",
            "marks": 6,
            "answer": "The central theme is the power of nature and human connection. The poem illustrates how nature inspires wonder and brings people together, emphasizing harmony between humans and the environment."
          },
          {
            "q": "How does the setting influence the events in the story?",
            "marks": 6,
            "answer": "The rural setting creates an atmosphere of simplicity and authenticity. It allows the characters to develop deep connections with nature and community, which shapes their values and decisions."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the pattern of the Class 7 English exam?",
        "a": "The exam has 80 marks total, divided into reading comprehension, grammar, writing, and literature sections."
      },
      {
        "q": "How much time should I spend on each section?",
        "a": "Allocate 45 minutes for reading and grammar, 60 minutes for writing, and 75 minutes for literature analysis."
      },
      {
        "q": "Are there internal choices in the exam?",
        "a": "Yes, there are internal choices in writing and literature sections, allowing you to choose questions that suit your preparation."
      }
    ]
  },
  {
    "slug": "class-6-english",
    "classLevel": "Class 6",
    "subject": "English",
    "board": "CBSE",
    "title": "CBSE Class 6 English Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper introduces fundamental English language skills including reading, writing, grammar, and vocabulary at the junior secondary level. Practice this to build a strong foundation in English. This is a shortened practice set: 19 questions worth 62 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 62,
    "sections": [
      {
        "name": "Section A - Reading Comprehension",
        "marks": 10,
        "instructions": "Read the passage and Answer all 5 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "What is the main topic of the passage?",
            "marks": 2,
            "answer": "The passage is about the importance of friendship and how friends support each other through challenges."
          },
          {
            "q": "Why are friends important in our life?",
            "marks": 2,
            "answer": "Friends provide emotional support, share our happiness and sorrows, and help us grow as individuals."
          },
          {
            "q": "What does the passage say about trust in friendship?",
            "marks": 2,
            "answer": "Trust is the foundation of true friendship; without trust, friendship cannot be meaningful or lasting."
          },
          {
            "q": "How should we treat our friends?",
            "marks": 2,
            "answer": "We should treat friends with honesty, respect, and kindness; we should be loyal and supportive."
          },
          {
            "q": "What is the central message of the passage?",
            "marks": 2,
            "answer": "Good friends are valuable treasures in life, and we should nurture our friendships with care and sincerity."
          }
        ],
        "passage": "Ravi had just moved to a new town and the first day at his new school felt very long. He sat alone at lunch, staring at his tiffin box, until a boy named Arjun slid onto the bench beside him and offered him half a guava. They talked about cricket until the bell rang.\n\nFriends matter because they carry a part of what we feel. When something wonderful happens, a friend doubles the joy by celebrating with us; when something goes wrong, a friend halves the sorrow simply by listening. Good friends also change us for the better — they correct us gently when we are wrong and encourage us when we doubt ourselves.\n\nAt the centre of every real friendship is trust. Trust is the foundation on which a friendship stands; without it, no friendship can be meaningful or last very long. A friend who keeps our secrets and tells us the truth, even when the truth is uncomfortable, is worth far more than a hundred cheerful companions who disappear the moment we need help.\n\nHow, then, should we treat our friends? With honesty, respect and kindness. We should be loyal and supportive, remember what matters to them, and forgive small mistakes. Good friends are valuable treasures in life, and like all treasures they must be looked after — nurtured with care and sincerity, year after year."
      },
      {
        "name": "Section B - Grammar and Vocabulary",
        "marks": 16,
        "instructions": "Answer all 8 questions. Each question carries 2 marks.",
        "questions": [
          {
            "q": "Complete the sentence: I ___ to school every day. (go/goes/went)",
            "marks": 2,
            "answer": "go"
          },
          {
            "q": "Choose the correct plural: child - (childs/children)",
            "marks": 2,
            "answer": "children"
          },
          {
            "q": "Fill in: She is ___ intelligent girl. (a/an/the)",
            "marks": 2,
            "answer": "an"
          },
          {
            "q": "Identify the verb in: The cat sleeps on the bed.",
            "marks": 2,
            "answer": "sleeps"
          },
          {
            "q": "Choose the antonym of 'happy': (sad, funny, nice)",
            "marks": 2,
            "answer": "sad"
          },
          {
            "q": "Complete: They ___ playing in the park. (is/are/am)",
            "marks": 2,
            "answer": "are"
          },
          {
            "q": "Identify the noun: The red car is fast.",
            "marks": 2,
            "answer": "car"
          },
          {
            "q": "Choose the synonym of 'big': (small, large, tiny)",
            "marks": 2,
            "answer": "large"
          }
        ]
      },
      {
        "name": "Section C - Writing Skills",
        "marks": 18,
        "instructions": "Answer all 3 questions. Each carries 6 marks.",
        "questions": [
          {
            "q": "Write a paragraph (80-100 words) about your favorite hobby.",
            "marks": 6,
            "answer": "My favorite hobby is reading books. I love to read stories about adventure and mystery. Reading helps me relax and improves my vocabulary. It takes me to different worlds and introduces me to interesting characters. I spend at least one hour reading every day. My favorite books are from the Fantasy genre. Reading has become an essential part of my daily routine and brings me joy."
          },
          {
            "q": "Write a short letter (40-60 words) thanking your teacher for helping you.",
            "marks": 6,
            "answer": "Dear Teacher, I want to thank you for your excellent guidance and support. You have helped me understand difficult concepts clearly. Your patience and dedication inspire me to work harder. I am grateful for everything you do for us. Thank you again. Sincerely, [Student Name]"
          },
          {
            "q": "Describe a festival you celebrate with 80-100 words.",
            "marks": 6,
            "answer": "Diwali is my favorite festival. It is the festival of lights celebrated across India. During Diwali, we light lamps, burst firecrackers, and exchange sweets. Houses are decorated with colorful decorations. Families come together to celebrate and share joy. The festival symbolizes the victory of light over darkness and good over evil. I enjoy buying new clothes and gifts for family members. Diwali brings happiness and strengthens family bonds."
          }
        ]
      },
      {
        "name": "Section D - Literature",
        "marks": 18,
        "instructions": "Answer 2 out of 3 questions. Each question carries 6 marks.",
        "questions": [
          {
            "q": "Describe the setting of the story. How does it help the narrative?",
            "marks": 6,
            "answer": "The story is set in a peaceful village near a river. The serene setting creates an atmosphere of calm and allows the characters to develop a deep connection with nature and community."
          },
          {
            "q": "What lesson does the story teach us?",
            "marks": 6,
            "answer": "The story teaches that honesty and kindness are virtues that lead to happiness and social acceptance. It emphasizes the importance of moral values."
          },
          {
            "q": "Who is your favorite character and why?",
            "marks": 6,
            "answer": "My favorite character is the wise old man because he is knowledgeable, kind, and always helps others. His wisdom and compassion make him a role model for everyone."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What topics are covered in Class 6 English?",
        "a": "Class 6 English covers basic grammar, comprehension, writing skills, vocabulary, and introduction to literature with age-appropriate texts."
      },
      {
        "q": "How should I prepare for the English exam?",
        "a": "Read regularly, practice grammar exercises, write short essays, learn new vocabulary, and read the prescribed texts thoroughly."
      },
      {
        "q": "Are there optional questions in the exam?",
        "a": "Yes, there are internal choices in the writing and literature sections, giving you flexibility in choosing questions."
      }
    ]
  },
  {
    "slug": "class-6-social-science",
    "classLevel": "Class 6",
    "subject": "Social Science",
    "board": "CBSE",
    "title": "CBSE Class 6 Social Science Sample Paper 2026 (with Solutions)",
    "intro": "This sample paper covers geography, history, and civics topics for Class 6 students. Practice this paper to understand early human societies, earth's features, and fundamental concepts of citizenship. This is a shortened practice set: 25 questions worth 53 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 53,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 10,
        "instructions": "Answer all 20 multiple choice questions. Each carries 1 mark.",
        "questions": [
          {
            "q": "The shape of the Earth is",
            "marks": 1,
            "answer": "Spherical"
          },
          {
            "q": "Which is the largest continent?",
            "marks": 1,
            "answer": "Asia"
          },
          {
            "q": "The Prime Meridian passes through",
            "marks": 1,
            "answer": "Greenwich"
          },
          {
            "q": "Early humans were primarily",
            "marks": 1,
            "answer": "Hunter-gatherers"
          },
          {
            "q": "Which of these is a fossil fuel?",
            "marks": 1,
            "answer": "Coal"
          },
          {
            "q": "The Indus Valley Civilization flourished around",
            "marks": 1,
            "answer": "2300 BCE"
          },
          {
            "q": "Which is the highest mountain in India?",
            "marks": 1,
            "answer": "Kangchenjunga"
          },
          {
            "q": "Democracy means",
            "marks": 1,
            "answer": "Government by the people"
          },
          {
            "q": "The Constitution of India was adopted on",
            "marks": 1,
            "answer": "26 January 1950"
          },
          {
            "q": "Which of these is a right of citizens?",
            "marks": 1,
            "answer": "Right to freedom"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 16,
        "instructions": "Answer all 8 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "What are the three types of rocks?",
            "marks": 2,
            "answer": "Igneous (formed from magma), Sedimentary (formed from compressed sediments), and Metamorphic (formed under heat and pressure)."
          },
          {
            "q": "Define weathering. How does it differ from erosion?",
            "marks": 2,
            "answer": "Weathering is the breakdown of rocks by weather and temperature. Erosion is the movement and transportation of weathered material."
          },
          {
            "q": "What are the main reasons for human migration in early times?",
            "marks": 2,
            "answer": "Search for food, water, and shelter; escape from predators; and pursuit of better living conditions."
          },
          {
            "q": "List three features of the Indus Valley Civilization.",
            "marks": 2,
            "answer": "Well-planned cities, advanced drainage system, and standardized weights and measures."
          },
          {
            "q": "What is sustainable development?",
            "marks": 2,
            "answer": "Development that meets the needs of the present without compromising the ability of future generations to meet their needs."
          },
          {
            "q": "Define Fundamental Rights. Name two of them.",
            "marks": 2,
            "answer": "Fundamental Rights are basic human rights granted to all citizens. Examples: Right to Equality, Right to Freedom."
          },
          {
            "q": "What is the role of the government in a democracy?",
            "marks": 2,
            "answer": "The government implements laws, provides services, protects citizens' rights, and works for the welfare of the people."
          },
          {
            "q": "What are natural resources? Give two examples.",
            "marks": 2,
            "answer": "Natural resources are materials provided by nature that are useful to humans. Examples: Water, Forests, Minerals."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 15,
        "instructions": "Answer all 5 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Describe the water cycle and its importance.",
            "marks": 3,
            "answer": "The water cycle involves evaporation, condensation, and precipitation. Water evaporates from surface water bodies, forms clouds, and returns as rain. It is essential for sustaining all life on Earth."
          },
          {
            "q": "Explain the daily and seasonal changes in the atmosphere.",
            "marks": 3,
            "answer": "Daily changes include temperature fluctuations and wind patterns due to solar radiation. Seasonal changes result from the Earth's tilt and revolution around the sun."
          },
          {
            "q": "How did the development of agriculture impact human societies?",
            "marks": 3,
            "answer": "Agriculture allowed humans to settle permanently, leading to the development of civilizations, surplus food production, and social stratification."
          },
          {
            "q": "What are the main sectors of the Indian economy?",
            "marks": 3,
            "answer": "Primary (agriculture, mining), Secondary (manufacturing, construction), and Tertiary (services, trade, tourism)."
          },
          {
            "q": "How can individuals contribute to environmental conservation?",
            "marks": 3,
            "answer": "By reducing waste, using renewable energy, conserving water, planting trees, and recycling materials."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 12,
        "instructions": "Answer 2 out of 3 questions. Each carries 6 marks.",
        "questions": [
          {
            "q": "Describe the geographical features of India.",
            "marks": 6,
            "answer": "India has diverse geographical features including the Himalayan mountains in the north, the Indo-Gangetic plains, the Deccan plateau, and coastal plains. Major rivers include the Ganges, Brahmaputra, and Indus. The country has varied climate zones from tropical to temperate."
          },
          {
            "q": "What are the rights and responsibilities of citizens?",
            "marks": 6,
            "answer": "Rights include freedom of speech, right to vote, and right to education. Responsibilities include following laws, paying taxes, voting responsibly, and serving the community."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the scope of Class 6 Social Science?",
        "a": "Class 6 Social Science includes Geography (Earth, weather, maps), History (early civilizations), and Civics (government, rights, responsibilities)."
      },
      {
        "q": "How should I study for the Social Science exam?",
        "a": "Read the textbook carefully, make notes, draw maps and diagrams, answer previous year papers, and practice map-marking skills."
      },
      {
        "q": "Are maps important in the exam?",
        "a": "Yes, map-marking is an important component. Practice marking rivers, mountains, cities, and other geographical features accurately."
      }
    ]
  },
  {
    "slug": "class-8-science",
    "classLevel": "Class 8",
    "subject": "Science",
    "board": "CBSE",
    "title": "CBSE Class 8 Science Sample Paper 2026 (with Solutions)",
    "intro": "This comprehensive Class 8 Science paper covers biology, chemistry, and physics topics including reproduction, materials, and motion. Strengthen your understanding of scientific concepts through this practice paper. This is a shortened practice set: 22 questions worth 50 marks, following the 80-mark CBSE paper pattern. Use it for timed practice, not as a full-length mock.",
    "duration": "3 hours",
    "totalMarks": 50,
    "sections": [
      {
        "name": "Section A - Multiple Choice",
        "marks": 8,
        "instructions": "Answer all 16 multiple choice questions. Each carries 1 mark.",
        "questions": [
          {
            "q": "Reproduction in humans is a process involving",
            "marks": 1,
            "answer": "Fertilization and development"
          },
          {
            "q": "Which of these is a conductor of electricity?",
            "marks": 1,
            "answer": "Copper"
          },
          {
            "q": "The SI unit of force is",
            "marks": 1,
            "answer": "Newton"
          },
          {
            "q": "Adolescence is the period between",
            "marks": 1,
            "answer": "11 and 19 years"
          },
          {
            "q": "Which state of matter has definite shape and volume?",
            "marks": 1,
            "answer": "Solid"
          },
          {
            "q": "The process of conversion of vapor to liquid is called",
            "marks": 1,
            "answer": "Condensation"
          },
          {
            "q": "Sound travels fastest in",
            "marks": 1,
            "answer": "Solids"
          },
          {
            "q": "Which is a renewable source of energy?",
            "marks": 1,
            "answer": "Solar energy"
          }
        ]
      },
      {
        "name": "Section B - Short Answer (2 marks)",
        "marks": 14,
        "instructions": "Answer all 7 questions. Each carries 2 marks.",
        "questions": [
          {
            "q": "Define puberty and list two changes during puberty.",
            "marks": 2,
            "answer": "Puberty is the process of becoming mature. Changes: growth spurt, development of secondary sexual characteristics."
          },
          {
            "q": "What is the difference between metallic and non-metallic elements?",
            "marks": 2,
            "answer": "Metals are good conductors and form positive ions. Non-metals are poor conductors and form negative ions."
          },
          {
            "q": "Explain the concept of friction with an example.",
            "marks": 2,
            "answer": "Friction is the force opposing motion between surfaces. Example: Walking on the ground is possible due to friction."
          },
          {
            "q": "What is pressure? Give its SI unit.",
            "marks": 2,
            "answer": "Pressure is force per unit area. SI unit: Pascal (Pa)"
          },
          {
            "q": "Distinguish between speed and velocity.",
            "marks": 2,
            "answer": "Speed is distance/time; velocity is displacement/time with direction."
          },
          {
            "q": "What is the role of microorganisms in sewage treatment?",
            "marks": 2,
            "answer": "Microorganisms decompose organic matter in sewage, making it safe for disposal."
          },
          {
            "q": "Define biodegradable waste with examples.",
            "marks": 2,
            "answer": "Biodegradable waste can be broken down by microorganisms. Examples: food scraps, leaves, paper."
          }
        ]
      },
      {
        "name": "Section C - Long Answer (3 marks)",
        "marks": 12,
        "instructions": "Answer all 4 questions. Each carries 3 marks.",
        "questions": [
          {
            "q": "Describe the reproductive system in humans and the process of fertilization.",
            "marks": 3,
            "answer": "Male and female reproductive organs produce gametes. Sperm fertilizes ovum, forming a zygote that develops into an embryo and fetus."
          },
          {
            "q": "Explain the three states of matter and their properties.",
            "marks": 3,
            "answer": "Solids have fixed shape and volume. Liquids have fixed volume but take container shape. Gases have neither fixed shape nor volume."
          },
          {
            "q": "What is the importance of good health and hygiene?",
            "marks": 3,
            "answer": "Good health enables physical and mental well-being. Hygiene prevents disease transmission and maintains cleanliness."
          },
          {
            "q": "Explain Newton's second law of motion with an example.",
            "marks": 3,
            "answer": "F = ma. Heavier objects require more force to accelerate. A loaded truck needs more force than an empty car to move."
          }
        ]
      },
      {
        "name": "Section D - Long Answer (5 marks)",
        "marks": 16,
        "instructions": "Answer all 3 questions. Each carries 5 or 6 marks.",
        "questions": [
          {
            "q": "Describe the life cycle of a plant from seed germination to reproduction.",
            "marks": 5,
            "answer": "Seed absorbs water and germinates. Root and shoot develop. Plant grows, produces leaves, flowers, and fruits containing seeds that complete the cycle."
          },
          {
            "q": "How do simple machines reduce effort? Explain with examples.",
            "marks": 5,
            "answer": "Simple machines like levers, pulleys, and inclined planes reduce effort by increasing distance or changing direction of force."
          },
          {
            "q": "Explain the water cycle and its importance in the ecosystem.",
            "marks": 6,
            "answer": "Water cycle: evaporation, condensation, precipitation, collection. Essential for life; distributes water, regulates temperature, supports ecosystems."
          }
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is the exam pattern for Class 8 Science?",
        "a": "Class 8 Science has 80 marks theory, with sections on multiple choice, short answer, and long answer questions based on prescribed chapters."
      },
      {
        "q": "How to score well in Class 8 Science?",
        "a": "Understand concepts, learn diagrams, practice numerical problems, do practicals/experiments, and revise regularly."
      },
      {
        "q": "Are diagrams necessary in Science answers?",
        "a": "Yes, labeled diagrams enhance answers and help explain biological and physical processes clearly."
      }
    ]
  }
];

export const SP_GROUPS = (): string[] => [...new Set(SAMPLE_PAPERS.map((p) => p.classLevel))];
export function getSamplePaper(slug: string): SamplePaper | undefined {
  return SAMPLE_PAPERS.find((p) => p.slug === slug);
}
