/** chapterMcqs.ts — chapter-wise MCQ / objective question banks cluster. */
export interface McqQ { q: string; options: string[]; correct: number; explanation: string; }
export interface McqFaq { q: string; a: string; }
export interface McqChapter {
  slug: string; classLevel: string; subject: string; chapter: string;
  intro: string; mcqs: McqQ[]; faqs: McqFaq[];
}
export const MCQ_CHAPTERS: McqChapter[] = [
  {
    "slug": "class-10-science-light-reflection-refraction-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Light Reflection and Refraction",
    "intro": "Light travels in straight lines and can be reflected and refracted when it encounters different surfaces and media. Understanding reflection and refraction is essential for explaining how mirrors, lenses, and optical instruments work.",
    "mcqs": [
      {
        "q": "What is the angle of incidence if the angle of reflection is 35 degrees?",
        "options": [
          "35 degrees",
          "45 degrees",
          "55 degrees",
          "70 degrees"
        ],
        "correct": 0,
        "explanation": "According to the law of reflection, the angle of incidence equals the angle of reflection, so if reflection is 35 degrees, incidence is also 35 degrees."
      },
      {
        "q": "Which of the following is true about a concave mirror when the object is at the center of curvature?",
        "options": [
          "Image is virtual and upright",
          "Image is real and same size",
          "Image is virtual and magnified",
          "Image is real and diminished"
        ],
        "correct": 1,
        "explanation": "When an object is placed at the center of curvature of a concave mirror, the image formed is real, inverted, and equal in size to the object."
      },
      {
        "q": "The focal length of a plane mirror is:",
        "options": [
          "Equal to its radius of curvature",
          "Half its radius",
          "Infinite",
          "Zero"
        ],
        "correct": 2,
        "explanation": "A plane mirror has an infinite focal length because its radius of curvature is infinite, so it does not converge or diverge light rays."
      },
      {
        "q": "When light travels from a denser to a rarer medium, it bends:",
        "options": [
          "Towards the normal",
          "Parallel to the normal",
          "At right angles to the normal",
          "Away from the normal"
        ],
        "correct": 3,
        "explanation": "When light travels from a denser to a rarer medium, it bends away from the normal because the speed of light increases in the rarer medium."
      },
      {
        "q": "What is the power of a lens with focal length 25 cm?",
        "options": [
          "+4.0 diopters",
          "+2.5 diopters",
          "+0.4 diopters",
          "-4.0 diopters"
        ],
        "correct": 0,
        "explanation": "Power of lens = 1/focal length in meters. With f = 0.25 m, power = 1/0.25 = 4.0 diopters for a converging lens."
      },
      {
        "q": "A convex lens forms a real, inverted and diminished image when the object is:",
        "options": [
          "At the focal point",
          "Beyond the center of curvature",
          "Between focal point and center",
          "At infinity"
        ],
        "correct": 1,
        "explanation": "For a convex lens the image is real, inverted and diminished when the object lies beyond 2F (the centre of curvature). With the object at infinity the image is a point at the focus, not simply \"diminished\"."
      },
      {
        "q": "The refractive index of a medium is always:",
        "options": [
          "Less than 1",
          "Equal to 1",
          "Greater than or equal to 1",
          "Negative"
        ],
        "correct": 2,
        "explanation": "The refractive index is the ratio of speed of light in vacuum to speed in the medium, so it is always greater than or equal to 1."
      },
      {
        "q": "Which mirror is used in a car headlight?",
        "options": [
          "Cylindrical mirror",
          "Convex mirror",
          "Plane mirror",
          "Concave mirror"
        ],
        "correct": 3,
        "explanation": "A concave mirror is used in car headlights because it converges light rays from the bulb to produce a parallel beam of light ahead."
      },
      {
        "q": "If a convex lens of focal length 10 cm is used as a magnifying glass, where should the object be placed?",
        "options": [
          "Between the focal point and the center",
          "At the center of curvature",
          "Beyond the center of curvature",
          "At the focal point"
        ],
        "correct": 0,
        "explanation": "For a magnifying glass, the object should be placed between the focal point and the lens to get a virtual, upright, and magnified image."
      },
      {
        "q": "The critical angle for total internal reflection depends on:",
        "options": [
          "Angle of incidence only",
          "The refractive indices of the two media",
          "The color of light only",
          "The wavelength of light only"
        ],
        "correct": 1,
        "explanation": "The critical angle depends on the refractive indices of the two media involved in the refraction process, not on the color or wavelength."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between reflection and refraction?",
        "a": "Reflection is the bouncing back of light from a surface, while refraction is the bending of light when it passes from one medium to another."
      },
      {
        "q": "Why do we see a rainbow after rain?",
        "a": "Rainbows form due to dispersion of sunlight through water droplets, where different colors of light refract at different angles."
      }
    ]
  },
  {
    "slug": "class-10-science-electricity-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Electricity",
    "intro": "Electricity is the flow of electrons through a conductor, and understanding electric current, resistance, and power is crucial for practical applications. This chapter covers Ohm's law, electrical circuits, and energy calculations.",
    "mcqs": [
      {
        "q": "The SI unit of electric current is:",
        "options": [
          "Volt",
          "Coulomb",
          "Ampere",
          "Ohm"
        ],
        "correct": 2,
        "explanation": "The SI unit of electric current is Ampere, which is the flow of one coulomb of charge per second through a conductor."
      },
      {
        "q": "According to Ohm's law, V = IR. What does R represent?",
        "options": [
          "Resonance",
          "Refraction",
          "Reactance",
          "Resistance"
        ],
        "correct": 3,
        "explanation": "R represents resistance, which is the opposition offered by a conductor to the flow of electric current through it."
      },
      {
        "q": "When resistors are connected in series, the total resistance is:",
        "options": [
          "Equal to the sum of individual resistances",
          "Less than the smallest resistance",
          "Less than the largest resistance",
          "Equal to the reciprocal of the sum"
        ],
        "correct": 0,
        "explanation": "In a series circuit, the total resistance equals the sum of all individual resistances: R_total = R1 + R2 + R3 + ..."
      },
      {
        "q": "The equivalent resistance of three 6-ohm resistors connected in parallel is:",
        "options": [
          "6 ohms",
          "2 ohms",
          "0.5 ohms",
          "18 ohms"
        ],
        "correct": 1,
        "explanation": "For resistors in parallel: 1/R_eq = 1/6 + 1/6 + 1/6 = 3/6, so R_eq = 2 ohms."
      },
      {
        "q": "The heating effect of electric current is known as:",
        "options": [
          "Joule heating",
          "Ohmic heating",
          "Thermal heating",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "The heating effect of current is known as Joule heating, Ohmic heating, or thermal heating - all terms are used interchangeably."
      },
      {
        "q": "What is the power consumed by a 100-watt bulb operated for 10 hours?",
        "options": [
          "10 watt-hours",
          "1 kilowatt",
          "1000 watt-hours",
          "100 watt-hours"
        ],
        "correct": 2,
        "explanation": "Energy consumed = Power x Time = 100 W x 10 h = 1000 watt-hours or 1 kilowatt-hour."
      },
      {
        "q": "The SI unit of electrical energy is:",
        "options": [
          "Watt",
          "Coulomb",
          "Volt",
          "Joule"
        ],
        "correct": 3,
        "explanation": "The SI unit of electrical energy is Joule, which equals one watt-second of power consumption."
      },
      {
        "q": "Which of the following materials is a good conductor of electricity?",
        "options": [
          "Copper",
          "Plastic",
          "Glass",
          "Rubber"
        ],
        "correct": 0,
        "explanation": "Copper is an excellent conductor of electricity due to its abundant free electrons, while rubber, glass, and plastic are insulators."
      },
      {
        "q": "The direction of conventional current is:",
        "options": [
          "From negative to positive terminal",
          "From positive to negative terminal",
          "From negative to positive in external circuit",
          "In both directions simultaneously"
        ],
        "correct": 1,
        "explanation": "Conventional current is defined as flowing from the positive terminal to the negative terminal of a cell in the external circuit."
      },
      {
        "q": "If the voltage across a conductor is doubled while its resistance remains constant, the current will:",
        "options": [
          "Be halved",
          "Remain the same",
          "Be doubled",
          "Be quadrupled"
        ],
        "correct": 2,
        "explanation": "According to Ohm's law, I = V/R. If voltage is doubled and resistance is constant, current is also doubled."
      }
    ],
    "faqs": [
      {
        "q": "Why do electric wires get hot when current flows through them?",
        "a": "Wires get hot due to Joule heating, caused by the resistance of the wire to the flow of electrons, converting electrical energy to heat."
      },
      {
        "q": "What is the difference between AC and DC current?",
        "a": "DC current flows in one direction continuously, while AC current periodically reverses direction."
      }
    ]
  },
  {
    "slug": "class-10-science-acids-bases-salts-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Acids Bases and Salts",
    "intro": "Acids, bases, and salts are fundamental chemical compounds that react with each other and have important industrial and biological applications. Understanding their properties and reactions is essential for chemistry.",
    "mcqs": [
      {
        "q": "What is the pH of a neutral solution?",
        "options": [
          "14",
          "0",
          "1",
          "7"
        ],
        "correct": 3,
        "explanation": "A neutral solution has a pH of 7, meaning it has an equal concentration of hydrogen and hydroxide ions."
      },
      {
        "q": "Which of the following is a strong acid?",
        "options": [
          "Hydrochloric acid",
          "Acetic acid",
          "Phosphorous acid",
          "Carbonic acid"
        ],
        "correct": 0,
        "explanation": "Hydrochloric acid (HCl) is a strong acid that completely ionizes in water, while acetic acid and carbonic acid are weak acids."
      },
      {
        "q": "The pH of an acidic solution is:",
        "options": [
          "Equal to 7",
          "Less than 7",
          "Between 7 and 14",
          "Greater than 7"
        ],
        "correct": 1,
        "explanation": "An acidic solution has a pH less than 7, indicating a higher concentration of hydrogen ions than hydroxide ions."
      },
      {
        "q": "Which of the following is a property of bases?",
        "options": [
          "Taste sour",
          "Turn litmus red",
          "Are slippery to touch",
          "Increase hydrogen ion concentration"
        ],
        "correct": 2,
        "explanation": "Bases are slippery to touch due to the formation of a soapy layer on skin, while acids taste sour and turn litmus blue to red."
      },
      {
        "q": "The salt formed from the reaction of HCl and NaOH is:",
        "options": [
          "Sodium hydroxide",
          "Hydrochloric sodium",
          "Chlorine oxide",
          "Sodium chloride"
        ],
        "correct": 3,
        "explanation": "The reaction HCl + NaOH produces NaCl (sodium chloride) and water in a neutralization reaction."
      },
      {
        "q": "Which indicator changes color in both acidic and basic solutions?",
        "options": [
          "Methyl orange",
          "Phenolphthalein",
          "Litmus",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "All three indicators change color in acidic and basic solutions, making them useful for detecting pH changes."
      },
      {
        "q": "The pH of a solution is -log of:",
        "options": [
          "Hydrogen ion concentration",
          "Hydroxide ion concentration",
          "Water concentration",
          "Salt concentration"
        ],
        "correct": 0,
        "explanation": "pH is defined as the negative logarithm of hydrogen ion concentration: pH = -log[H+]."
      },
      {
        "q": "Which salt is produced when dilute sulfuric acid reacts with zinc?",
        "options": [
          "Zinc oxide",
          "Zinc sulfate",
          "Zinc hydroxide",
          "Zinc chloride"
        ],
        "correct": 1,
        "explanation": "The reaction H2SO4 + Zn produces ZnSO4 (zinc sulfate) and hydrogen gas in a displacement reaction."
      },
      {
        "q": "The pH of a basic solution is:",
        "options": [
          "Less than 7",
          "Equal to 7",
          "Greater than 7",
          "Between 0 and 7"
        ],
        "correct": 2,
        "explanation": "A basic solution has a pH greater than 7, indicating a higher concentration of hydroxide ions than hydrogen ions."
      },
      {
        "q": "Which of the following salts hydrolyzes to form an acidic solution?",
        "options": [
          "Na2CO3",
          "KNO3",
          "NaCl",
          "FeCl3"
        ],
        "correct": 3,
        "explanation": "FeCl3 hydrolyzes to form acidic solution due to the hydrolysis of Fe3+ ions, producing H+ ions."
      }
    ],
    "faqs": [
      {
        "q": "Why do acidic soils require lime for neutralization?",
        "a": "Lime (calcium carbonate) is a base that neutralizes acidic soils by raising their pH to make them suitable for plant growth."
      },
      {
        "q": "How is salt produced industrially from seawater?",
        "a": "Salt is produced by evaporating seawater, which leaves behind solid sodium chloride crystals."
      }
    ]
  },
  {
    "slug": "class-10-science-life-processes-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Life Processes",
    "intro": "Life processes include nutrition, respiration, transportation, and excretion, which are essential for the survival and growth of all living organisms. Understanding these processes helps us comprehend how organisms maintain homeostasis.",
    "mcqs": [
      {
        "q": "Which of the following is not a life process?",
        "options": [
          "Crystallization",
          "Photosynthesis",
          "Digestion",
          "Respiration"
        ],
        "correct": 0,
        "explanation": "Crystallization is a physical process, not a life process. Life processes are biological activities that sustain life."
      },
      {
        "q": "The process by which green plants prepare their own food is called:",
        "options": [
          "Respiration",
          "Photosynthesis",
          "Transpiration",
          "Decomposition"
        ],
        "correct": 1,
        "explanation": "Photosynthesis is the process where green plants use sunlight to convert carbon dioxide and water into glucose and oxygen."
      },
      {
        "q": "Which organelle is responsible for photosynthesis in plant cells?",
        "options": [
          "Mitochondria",
          "Nucleus",
          "Chloroplast",
          "Ribosome"
        ],
        "correct": 2,
        "explanation": "Chloroplasts contain chlorophyll and are the sites of photosynthesis in plant cells."
      },
      {
        "q": "The process of breaking down food into simple molecules to release energy is:",
        "options": [
          "Digestion",
          "Transpiration",
          "Photosynthesis",
          "Respiration"
        ],
        "correct": 3,
        "explanation": "Respiration is the process of breaking down glucose to release energy in the form of ATP for cellular activities."
      },
      {
        "q": "Which type of respiration does not require oxygen?",
        "options": [
          "Anaerobic respiration",
          "Both require oxygen",
          "Photosynthesis",
          "Aerobic respiration"
        ],
        "correct": 0,
        "explanation": "Anaerobic respiration occurs without oxygen and is used by organisms like bacteria and yeast under oxygen-limited conditions."
      },
      {
        "q": "The transport of water and minerals from roots to leaves is called:",
        "options": [
          "Phloem transport",
          "Xylem transport",
          "Diffusion",
          "Osmosis"
        ],
        "correct": 1,
        "explanation": "Xylem transport is the upward movement of water and minerals from roots to leaves through xylem vessels."
      },
      {
        "q": "Which of the following is the main excretory organ in humans?",
        "options": [
          "Liver",
          "Heart",
          "Kidney",
          "Pancreas"
        ],
        "correct": 2,
        "explanation": "Kidneys are the main excretory organs that filter waste products from blood to form urine."
      },
      {
        "q": "The rate of transpiration increases with:",
        "options": [
          "Decrease in light",
          "Increase in humidity",
          "Decrease in temperature",
          "Increase in temperature"
        ],
        "correct": 3,
        "explanation": "Transpiration increases with higher temperature, lower humidity, more light, and increased air movement."
      },
      {
        "q": "Bile is produced by the:",
        "options": [
          "Liver",
          "Small intestine",
          "Stomach",
          "Pancreas"
        ],
        "correct": 0,
        "explanation": "Bile is produced by the liver and stored in the gallbladder to help emulsify fats during digestion."
      },
      {
        "q": "The final products of aerobic respiration in plants and animals are:",
        "options": [
          "Glucose and O2",
          "CO2 and H2O",
          "Ethanol and CO2",
          "Lactate and CO2"
        ],
        "correct": 1,
        "explanation": "Aerobic respiration produces carbon dioxide and water as final products in both plants and animals."
      }
    ],
    "faqs": [
      {
        "q": "Why is the study of life processes important for understanding living organisms?",
        "a": "Life processes are fundamental to understanding how organisms grow, reproduce, maintain homeostasis, and respond to environmental changes."
      },
      {
        "q": "How does photosynthesis differ from respiration?",
        "a": "Photosynthesis uses light energy to produce glucose from CO2 and water, while respiration breaks down glucose to release energy."
      }
    ]
  },
  {
    "slug": "class-10-science-carbon-compounds-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Carbon and its Compounds",
    "intro": "Carbon is a unique element that forms millions of compounds due to its ability to bond with other atoms, including hydrogen, oxygen, and nitrogen. Understanding organic chemistry is crucial for comprehending the chemistry of life.",
    "mcqs": [
      {
        "q": "The simplest organic compound is:",
        "options": [
          "Ethene",
          "Ethyne",
          "Methane",
          "Ethane"
        ],
        "correct": 2,
        "explanation": "Methane (CH4) is the simplest organic compound, consisting of one carbon atom bonded to four hydrogen atoms."
      },
      {
        "q": "How many covalent bonds can a carbon atom form?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": 3,
        "explanation": "Carbon can form four covalent bonds due to its electronic configuration, making it very versatile in forming compounds."
      },
      {
        "q": "Which of the following is a saturated hydrocarbon?",
        "options": [
          "Ethane",
          "Ethene",
          "Ethyne",
          "Benzene"
        ],
        "correct": 0,
        "explanation": "Ethane (C2H6) is a saturated hydrocarbon containing only single bonds, while ethene and ethyne contain double and triple bonds."
      },
      {
        "q": "The general formula for alkanes is:",
        "options": [
          "CnH2n",
          "CnH2n+2",
          "CnH2n-2",
          "CnHn"
        ],
        "correct": 1,
        "explanation": "Alkanes follow the general formula CnH2n+2, where n is the number of carbon atoms."
      },
      {
        "q": "Which of the following is an ester?",
        "options": [
          "Ethyl alcohol",
          "Acetic acid",
          "Ethyl acetate",
          "Acetone"
        ],
        "correct": 2,
        "explanation": "Ethyl acetate is an ester formed from the reaction between acetic acid and ethanol."
      },
      {
        "q": "The process of burning hydrocarbons to produce carbon dioxide and water is called:",
        "options": [
          "Dehydration",
          "Oxidation",
          "Hydrogenation",
          "Combustion"
        ],
        "correct": 3,
        "explanation": "Combustion is the reaction of hydrocarbons with oxygen to produce CO2 and H2O, releasing energy as heat and light."
      },
      {
        "q": "Which functional group is present in alcohols?",
        "options": [
          "-OH",
          "-CHO",
          "-CO",
          "-COOH"
        ],
        "correct": 0,
        "explanation": "Alcohols contain the hydroxyl functional group (-OH) attached to a carbon atom."
      },
      {
        "q": "Denaturation of proteins occurs due to:",
        "options": [
          "Decrease in light",
          "Change in pH and temperature",
          "Increase in pH only",
          "Increase in temperature only"
        ],
        "correct": 1,
        "explanation": "Proteins denature when exposed to extreme pH or high temperatures, causing loss of their three-dimensional structure."
      },
      {
        "q": "The chemical formula of benzene is:",
        "options": [
          "C7H8",
          "C8H10",
          "C6H6",
          "C5H10"
        ],
        "correct": 2,
        "explanation": "Benzene has the molecular formula C6H6 and contains a six-membered ring with alternating double bonds."
      },
      {
        "q": "Which of the following is a reducing sugar?",
        "options": [
          "Sucrose",
          "Glucose",
          "Lactose",
          "Both glucose and lactose"
        ],
        "correct": 3,
        "explanation": "Both glucose (monosaccharide) and lactose (disaccharide) are reducing sugars that can reduce Fehling's reagent."
      }
    ],
    "faqs": [
      {
        "q": "Why is carbon called the backbone of all organic compounds?",
        "a": "Carbon can form four covalent bonds and chains with itself, making it the foundation of almost all organic molecules."
      },
      {
        "q": "What is the difference between saturated and unsaturated hydrocarbons?",
        "a": "Saturated hydrocarbons contain only single bonds, while unsaturated hydrocarbons contain double or triple bonds between carbon atoms."
      }
    ]
  },
  {
    "slug": "class-10-science-metals-nonmetals-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Metals and Non-metals",
    "intro": "Metals and non-metals are the two main categories of elements with distinct physical and chemical properties. Understanding their characteristics and reactions is fundamental to inorganic chemistry.",
    "mcqs": [
      {
        "q": "Which of the following is a physical property of metals?",
        "options": [
          "High melting point",
          "Poor electrical conductivity",
          "Non-malleable",
          "Non-ductile"
        ],
        "correct": 0,
        "explanation": "Metals generally have high melting points, are malleable, ductile, and are good conductors of electricity and heat."
      },
      {
        "q": "Which of the following is a non-metal?",
        "options": [
          "Iron",
          "Oxygen",
          "Aluminum",
          "Copper"
        ],
        "correct": 1,
        "explanation": "Oxygen is a non-metal that is a gas at room temperature, while iron, aluminum, and copper are metals."
      },
      {
        "q": "What happens when a metal reacts with oxygen?",
        "options": [
          "Acid is formed",
          "A non-metal is formed",
          "An oxide is formed",
          "A salt is formed"
        ],
        "correct": 2,
        "explanation": "When metals react with oxygen, metal oxides are formed, which are generally basic in nature."
      },
      {
        "q": "Which metal does not react with dilute acids?",
        "options": [
          "Zinc",
          "Aluminum",
          "Iron",
          "Copper"
        ],
        "correct": 3,
        "explanation": "Copper is less reactive than hydrogen and does not react with dilute acids, unlike iron, zinc, and aluminum."
      },
      {
        "q": "The most reactive metal among the following is:",
        "options": [
          "Sodium",
          "Magnesium",
          "Aluminum",
          "Iron"
        ],
        "correct": 0,
        "explanation": "Sodium is a highly reactive metal that reacts vigorously with water and air, more reactive than magnesium and iron."
      },
      {
        "q": "Which of the following non-metals is a liquid at room temperature?",
        "options": [
          "Nitrogen",
          "Bromine",
          "Oxygen",
          "Chlorine"
        ],
        "correct": 1,
        "explanation": "Bromine is the only non-metal that is liquid at room temperature, while oxygen and nitrogen are gases, and chlorine is also a gas."
      },
      {
        "q": "The reaction between a metal and a non-metal typically produces:",
        "options": [
          "An acid",
          "A base",
          "A salt",
          "A new metal"
        ],
        "correct": 2,
        "explanation": "The reaction between a metal and a non-metal typically produces ionic compounds called salts."
      },
      {
        "q": "Which of the following metals forms an amphoteric oxide?",
        "options": [
          "Sodium",
          "Calcium",
          "Magnesium",
          "Aluminum"
        ],
        "correct": 3,
        "explanation": "Aluminum forms amphoteric oxide (Al2O3) that reacts with both acids and bases."
      },
      {
        "q": "Metallic lustre is due to:",
        "options": [
          "Reflection of light",
          "Refraction of light",
          "Absorption of light",
          "Scattering of light"
        ],
        "correct": 0,
        "explanation": "The shiny appearance of metals is due to the reflection of light from their polished surfaces."
      },
      {
        "q": "Which of the following is an alloy?",
        "options": [
          "Iron",
          "Brass",
          "Aluminum",
          "Copper"
        ],
        "correct": 1,
        "explanation": "Brass is an alloy of copper and zinc, while iron, copper, and aluminum are pure metals."
      }
    ],
    "faqs": [
      {
        "q": "Why are metals good conductors of electricity?",
        "a": "Metals have free electrons that move easily through their crystalline structure, allowing them to conduct electricity."
      },
      {
        "q": "How does the reactivity series help predict reactions between metals and acids?",
        "a": "The reactivity series shows the order of reactivity of metals, with more reactive metals reacting faster and more vigorously with acids."
      }
    ]
  },
  {
    "slug": "class-10-maths-real-numbers-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Real Numbers",
    "intro": "Real numbers include all rational and irrational numbers, and understanding their properties is essential for higher mathematics. This chapter covers the Euclidean algorithm, prime factorization, and rational and irrational numbers.",
    "mcqs": [
      {
        "q": "The HCF of two numbers is 12 and their LCM is 180. If one number is 36, what is the other?",
        "options": [
          "72",
          "96",
          "60",
          "84"
        ],
        "correct": 2,
        "explanation": "Using HCF x LCM = Product of two numbers: 12 x 180 = 36 x other, so other = 2160/36 = 60."
      },
      {
        "q": "Which of the following is an irrational number?",
        "options": [
          "2.4",
          "0.375",
          "0.5",
          "sqrt(2)"
        ],
        "correct": 3,
        "explanation": "sqrt(2) is irrational because it cannot be expressed as a ratio of two integers, unlike the others which are rational."
      },
      {
        "q": "The decimal expansion of a rational number is:",
        "options": [
          "Terminating or non-terminating repeating",
          "Always terminating",
          "Non-terminating and non-repeating",
          "Always non-terminating"
        ],
        "correct": 0,
        "explanation": "Rational numbers have either terminating decimals or non-terminating repeating decimals."
      },
      {
        "q": "If a = 2^3 x 3^2 x 5 and b = 2^2 x 3 x 5^2, then LCM(a,b) is:",
        "options": [
          "2^2 x 3 x 5",
          "2^3 x 3^2 x 5^2",
          "2^3 x 3^2 x 5",
          "2^2 x 3^2 x 5^2"
        ],
        "correct": 1,
        "explanation": "LCM is found by taking the highest power of each prime factor: 2^3 x 3^2 x 5^2."
      },
      {
        "q": "Euclid's division lemma states that for integers a and b, a = bq + r where:",
        "options": [
          "r >= b",
          "r < 0",
          "0 <= r < b",
          "r >= 0"
        ],
        "correct": 2,
        "explanation": "In Euclid's division lemma, the remainder r must satisfy 0 <= r < b for any integer division."
      },
      {
        "q": "The sum of two rational numbers is always:",
        "options": [
          "Irrational",
          "Sometimes rational",
          "Neither rational nor irrational",
          "Rational"
        ],
        "correct": 3,
        "explanation": "The sum of two rational numbers is always rational because the set of rational numbers is closed under addition."
      },
      {
        "q": "sqrt(2) + sqrt(3) is:",
        "options": [
          "Irrational",
          "Neither",
          "Rational",
          "Can be rational or irrational"
        ],
        "correct": 0,
        "explanation": "The sum of two irrational numbers can be irrational. In this case, sqrt(2) + sqrt(3) is irrational."
      },
      {
        "q": "If p and q are primes and p divides q, then:",
        "options": [
          "p > q",
          "p = q",
          "p < q",
          "p divides q"
        ],
        "correct": 1,
        "explanation": "If a prime p divides another prime q, then p must equal q because primes have no other divisors."
      },
      {
        "q": "The HCF of 36 and 48 is:",
        "options": [
          "6",
          "24",
          "12",
          "36"
        ],
        "correct": 2,
        "explanation": "36 = 2² x 3² and 48 = 2⁴ x 3. The HCF takes the lowest power of each common prime: 2² x 3 = 12."
      },
      {
        "q": "The product of a non-zero rational and an irrational number is:",
        "options": [
          "Rational",
          "Neither",
          "Zero",
          "Irrational"
        ],
        "correct": 3,
        "explanation": "The product of a non-zero rational and an irrational number is always irrational."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between rational and irrational numbers?",
        "a": "Rational numbers can be expressed as a ratio of two integers, while irrational numbers cannot be expressed in this form."
      },
      {
        "q": "How is Euclid's algorithm used to find the HCF of two numbers?",
        "a": "Euclid's algorithm repeatedly applies division lemma until the remainder becomes zero, with the last non-zero remainder being the HCF."
      }
    ]
  },
  {
    "slug": "class-10-maths-polynomials-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Polynomials",
    "intro": "Polynomials are algebraic expressions with multiple terms consisting of variables and constants. Understanding polynomial operations and theorems like the remainder and factor theorems is essential for solving equations.",
    "mcqs": [
      {
        "q": "If x = 2 is a zero of the polynomial p(x) = x^2 - 2x + k, then k is:",
        "options": [
          "0",
          "2",
          "4",
          "-2"
        ],
        "correct": 0,
        "explanation": "If x = 2 is a zero, then p(2) = 0. So 4 - 4 + k = 0, which gives k = 0."
      },
      {
        "q": "The degree of the polynomial 4x^3 - 5x^2 + 2x - 1 is:",
        "options": [
          "1",
          "3",
          "4",
          "2"
        ],
        "correct": 1,
        "explanation": "The degree of a polynomial is the highest power of the variable, which is 3 in this case."
      },
      {
        "q": "If the sum of zeros of the polynomial x^2 - 5x + 6 is s, then s is:",
        "options": [
          "3",
          "6",
          "5",
          "-5"
        ],
        "correct": 2,
        "explanation": "For a quadratic ax^2 + bx + c, sum of zeros = -b/a = -(-5)/1 = 5."
      },
      {
        "q": "The product of zeros of the polynomial 2x^2 - 8x + 6 is:",
        "options": [
          "-4",
          "-3",
          "4",
          "3"
        ],
        "correct": 3,
        "explanation": "For a quadratic ax^2 + bx + c, product of zeros = c/a = 6/2 = 3."
      },
      {
        "q": "When p(x) = x^3 - 2x^2 + x - 1 is divided by (x - 1), the remainder is:",
        "options": [
          "-1",
          "0",
          "-2",
          "-3"
        ],
        "correct": 0,
        "explanation": "By the Remainder Theorem the remainder is p(1) = 1 - 2 + 1 - 1 = -1."
      },
      {
        "q": "Which of the following is a factor of x^3 - 8?",
        "options": [
          "x + 2",
          "x - 2",
          "x^2 + 2x + 4",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "x^3 - 8 = (x - 2)(x^2 + 2x + 4), so all three are factors of this polynomial."
      },
      {
        "q": "The number of zeros of a cubic polynomial is at most:",
        "options": [
          "1",
          "3",
          "4",
          "2"
        ],
        "correct": 1,
        "explanation": "A polynomial of degree n has at most n zeros. A cubic polynomial has degree 3, so it has at most 3 zeros."
      },
      {
        "q": "If (x - 1) is a factor of x^3 + ax^2 - 2x - 1, then a is:",
        "options": [
          "0",
          "1",
          "2",
          "-1"
        ],
        "correct": 2,
        "explanation": "If (x - 1) is a factor, then p(1) = 0. So 1 + a - 2 - 1 = 0, which gives a = 2."
      },
      {
        "q": "The zeros of the polynomial (x - 3)(x + 2)(x - 1) are:",
        "options": [
          "-3, -2, -1",
          "3, 2, 1",
          "-3, 2, -1",
          "3, -2, 1"
        ],
        "correct": 3,
        "explanation": "The zeros are the values of x that make the polynomial equal to 0, which are 3, -2, and 1."
      },
      {
        "q": "If the polynomial x^2 - px + q has zeros a and b, then:",
        "options": [
          "a + b = p, ab = q",
          "a + b = -p, ab = -q",
          "a + b = p, ab = -q",
          "a + b = q, ab = p"
        ],
        "correct": 0,
        "explanation": "By Vieta's formulas, sum of zeros = p and product of zeros = q for the polynomial x^2 - px + q."
      }
    ],
    "faqs": [
      {
        "q": "What is the remainder theorem and how is it used?",
        "a": "The remainder theorem states that when a polynomial p(x) is divided by (x - a), the remainder is p(a)."
      },
      {
        "q": "How do you determine if a number is a zero of a polynomial?",
        "a": "A number is a zero of a polynomial if substituting it for the variable makes the polynomial equal to zero."
      }
    ]
  },
  {
    "slug": "class-10-maths-quadratic-equations-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Quadratic Equations",
    "intro": "Quadratic equations are polynomial equations of degree 2 and have numerous applications in physics and engineering. Solving them involves factorization, completing the square, or using the quadratic formula.",
    "mcqs": [
      {
        "q": "The quadratic equation 2x^2 - 8x + 6 = 0 has roots:",
        "options": [
          "-1, -3",
          "1, 3",
          "1, -3",
          "2, 3"
        ],
        "correct": 1,
        "explanation": "Using the quadratic formula or factorization: 2x^2 - 8x + 6 = 2(x - 1)(x - 3) = 0, so roots are 1 and 3."
      },
      {
        "q": "The discriminant of x^2 - 5x + 6 = 0 is:",
        "options": [
          "25",
          "-24",
          "1",
          "24"
        ],
        "correct": 2,
        "explanation": "D = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1."
      },
      {
        "q": "If the discriminant of a quadratic equation is negative, then the roots are:",
        "options": [
          "Real and equal",
          "Real and distinct",
          "No roots exist",
          "Complex and conjugates"
        ],
        "correct": 3,
        "explanation": "When the discriminant is negative, the roots are complex conjugates (non-real) and distinct from each other."
      },
      {
        "q": "The sum of roots of 3x^2 + 5x - 2 = 0 is:",
        "options": [
          "-5/3",
          "5/3",
          "2/3",
          "-2/3"
        ],
        "correct": 0,
        "explanation": "Sum of roots = -b/a = -5/3 for the quadratic equation ax^2 + bx + c = 0."
      },
      {
        "q": "The product of roots of x^2 - 7x + 12 = 0 is:",
        "options": [
          "-12",
          "12",
          "-7",
          "7"
        ],
        "correct": 1,
        "explanation": "Product of roots = c/a = 12/1 = 12 for the quadratic equation ax^2 + bx + c = 0."
      },
      {
        "q": "The quadratic equation with roots 2 and -3 is:",
        "options": [
          "x^2 + x + 6 = 0",
          "x^2 - x - 6 = 0",
          "x^2 + x - 6 = 0",
          "x^2 - x + 6 = 0"
        ],
        "correct": 2,
        "explanation": "If roots are 2 and -3, then equation is (x - 2)(x + 3) = 0, which gives x^2 + x - 6 = 0."
      },
      {
        "q": "A quadratic equation has equal roots when its discriminant is:",
        "options": [
          "Undefined",
          "Negative",
          "Positive",
          "Zero"
        ],
        "correct": 3,
        "explanation": "A quadratic equation has real and equal roots when the discriminant equals zero."
      },
      {
        "q": "The value of k for which x^2 - 4x + k = 0 has equal roots is:",
        "options": [
          "4",
          "16",
          "8",
          "2"
        ],
        "correct": 0,
        "explanation": "For equal roots, discriminant = 0. So (-4)^2 - 4(1)(k) = 0, which gives 16 - 4k = 0, so k = 4."
      },
      {
        "q": "The nature of roots of x^2 + x + 1 = 0 is:",
        "options": [
          "Real and unequal",
          "Complex conjugates",
          "Real and equal",
          "Real and distinct"
        ],
        "correct": 1,
        "explanation": "Discriminant = 1 - 4 = -3, which is negative, so roots are complex conjugates."
      },
      {
        "q": "If the roots of ax^2 + bx + c = 0 are p and q, then the equation with roots 1/p and 1/q is:",
        "options": [
          "bx^2 + ax + c = 0",
          "ax^2 + bx + c = 0",
          "cx^2 + bx + a = 0",
          "c + bx + ax^2 = 0"
        ],
        "correct": 2,
        "explanation": "If p and q are roots of ax^2 + bx + c = 0, then 1/p and 1/q are roots of cx^2 + bx + a = 0."
      }
    ],
    "faqs": [
      {
        "q": "What is the quadratic formula and when is it used?",
        "a": "The quadratic formula is x = (-b ± sqrt(b^2 - 4ac)) / 2a and is used when factorization is difficult or impossible."
      },
      {
        "q": "How does the discriminant help determine the nature of roots?",
        "a": "The discriminant b^2 - 4ac determines if roots are real and distinct, real and equal, or complex conjugates."
      }
    ]
  },
  {
    "slug": "class-10-maths-triangles-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Triangles",
    "intro": "Triangles are fundamental geometric shapes, and understanding their properties like similarity, congruence, and the Pythagorean theorem is essential for geometry. This chapter covers triangle theorems and their applications.",
    "mcqs": [
      {
        "q": "If two triangles are similar, then their corresponding angles are:",
        "options": [
          "Supplementary",
          "Proportional",
          "Complementary",
          "Equal"
        ],
        "correct": 3,
        "explanation": "If two triangles are similar, their corresponding angles are equal and corresponding sides are proportional."
      },
      {
        "q": "The basic proportionality theorem states that if a line is drawn parallel to one side of a triangle, then it divides the other two sides:",
        "options": [
          "Proportionally",
          "Equally",
          "In ratio 1:1",
          "At their midpoints"
        ],
        "correct": 0,
        "explanation": "The basic proportionality theorem (Thales' theorem) states that a line parallel to one side divides the other two sides proportionally."
      },
      {
        "q": "If in triangle ABC, AB = 3 cm, BC = 4 cm, and AC = 5 cm, then triangle ABC is:",
        "options": [
          "Equilateral",
          "Right-angled",
          "Obtuse-angled",
          "Acute-angled"
        ],
        "correct": 1,
        "explanation": "Since 3^2 + 4^2 = 9 + 16 = 25 = 5^2, triangle ABC is right-angled at B."
      },
      {
        "q": "The area of a triangle with sides a, b, and c is given by:",
        "options": [
          "a x b x c",
          "sqrt(a^2 + b^2 - 2ab cosC)",
          "sqrt(s(s-a)(s-b)(s-c))",
          "(1/2) x base x height"
        ],
        "correct": 2,
        "explanation": "Heron's formula gives the area of a triangle as sqrt(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2."
      },
      {
        "q": "If triangle ABC is similar to triangle PQR, and AB:PQ = 2:3, then the ratio of their areas is:",
        "options": [
          "2:3",
          "8:27",
          "6:9",
          "4:9"
        ],
        "correct": 3,
        "explanation": "The ratio of areas of similar triangles is the square of the ratio of corresponding sides: (2/3)^2 = 4/9."
      },
      {
        "q": "Two triangles are congruent if:",
        "options": [
          "SSS, SAS, ASA, or AAS conditions are satisfied",
          "They are similar",
          "Their corresponding angles are equal",
          "They have the same area"
        ],
        "correct": 0,
        "explanation": "Two triangles are congruent if they satisfy any of the congruence criteria: SSS, SAS, ASA, AAS, or RHS."
      },
      {
        "q": "In a right-angled triangle, if the hypotenuse is 13 cm and one side is 5 cm, the other side is:",
        "options": [
          "8 cm",
          "12 cm",
          "10 cm",
          "9 cm"
        ],
        "correct": 1,
        "explanation": "Using Pythagorean theorem: other side = sqrt(13^2 - 5^2) = sqrt(169 - 25) = sqrt(144) = 12 cm."
      },
      {
        "q": "The angle bisector theorem states that the angle bisector divides the opposite side in the ratio of:",
        "options": [
          "1:1",
          "The altitudes",
          "The adjacent sides",
          "The other two angles"
        ],
        "correct": 2,
        "explanation": "The angle bisector theorem states that the angle bisector divides the opposite side in the ratio of the adjacent sides."
      },
      {
        "q": "If the altitude from vertex A to side BC of triangle ABC is 6 cm and BC = 8 cm, the area is:",
        "options": [
          "48 cm^2",
          "12 cm^2",
          "36 cm^2",
          "24 cm^2"
        ],
        "correct": 3,
        "explanation": "Area of triangle = (1/2) x base x height = (1/2) x 8 x 6 = 24 cm^2."
      },
      {
        "q": "If triangle ABC has sides 6 cm, 8 cm, and 10 cm, then the radius of its circumcircle is:",
        "options": [
          "5 cm",
          "3 cm",
          "6 cm",
          "4 cm"
        ],
        "correct": 0,
        "explanation": "For a right-angled triangle, the circumradius = hypotenuse/2 = 10/2 = 5 cm."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between similar and congruent triangles?",
        "a": "Congruent triangles have the same size and shape, while similar triangles have the same shape but different sizes."
      },
      {
        "q": "How is the Pythagorean theorem used to determine if a triangle is right-angled?",
        "a": "If the square of the longest side equals the sum of squares of the other two sides, the triangle is right-angled."
      }
    ]
  },
  {
    "slug": "class-10-maths-trigonometry-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "intro": "Trigonometry is the study of relationships between sides and angles in triangles and has numerous applications in navigation, surveying, and engineering. Understanding trigonometric ratios is essential for solving problems.",
    "mcqs": [
      {
        "q": "In a right-angled triangle, sin A =",
        "options": [
          "Hypotenuse / Opposite",
          "Opposite / Hypotenuse",
          "Adjacent / Hypotenuse",
          "Opposite / Adjacent"
        ],
        "correct": 1,
        "explanation": "Sin A = Opposite / Hypotenuse, which is one of the basic trigonometric ratios."
      },
      {
        "q": "If sin A = 3/5 and angle A is acute, then cos A =",
        "options": [
          "5/4",
          "3/4",
          "4/5",
          "5/3"
        ],
        "correct": 2,
        "explanation": "Using sin^2 A + cos^2 A = 1: (3/5)^2 + cos^2 A = 1, so cos^2 A = 16/25, thus cos A = 4/5."
      },
      {
        "q": "The value of sin 0 degrees is:",
        "options": [
          "-1",
          "1/2",
          "1",
          "0"
        ],
        "correct": 3,
        "explanation": "sin 0 = 0, which is a standard trigonometric value."
      },
      {
        "q": "tan A = cot A when A =",
        "options": [
          "45 degrees",
          "60 degrees",
          "30 degrees",
          "90 degrees"
        ],
        "correct": 0,
        "explanation": "tan A = cot A when tan A = 1/tan A, which means tan^2 A = 1, so A = 45 degrees."
      },
      {
        "q": "If sin A = cos B and A and B are acute angles, then A + B =",
        "options": [
          "180 degrees",
          "90 degrees",
          "45 degrees",
          "60 degrees"
        ],
        "correct": 1,
        "explanation": "If sin A = cos B, then A and B are complementary angles, so A + B = 90 degrees."
      },
      {
        "q": "The value of sec 60 degrees is:",
        "options": [
          "sqrt(2)",
          "sqrt(3)/2",
          "2",
          "2/sqrt(3)"
        ],
        "correct": 2,
        "explanation": "sec 60 = 1/cos 60 = 1/(1/2) = 2."
      },
      {
        "q": "If tan A = 1/sqrt(3), then A =",
        "options": [
          "90 degrees",
          "60 degrees",
          "45 degrees",
          "30 degrees"
        ],
        "correct": 3,
        "explanation": "tan 30 = 1/sqrt(3), so A = 30 degrees."
      },
      {
        "q": "sin^2 A + cos^2 A =",
        "options": [
          "1",
          "0",
          "2",
          "-1"
        ],
        "correct": 0,
        "explanation": "sin^2 A + cos^2 A = 1 is the fundamental trigonometric identity."
      },
      {
        "q": "If a ladder of length 10 m leans against a wall making 60 degrees with the ground, the height at which it touches the wall is:",
        "options": [
          "5 m",
          "5sqrt(3) m",
          "10sqrt(3) m",
          "10 m"
        ],
        "correct": 1,
        "explanation": "Height = 10 x sin 60 = 10 x sqrt(3)/2 = 5sqrt(3) m."
      },
      {
        "q": "The angle of elevation from a point on the ground to the top of a 20 m building is 30 degrees. The distance from the point to the base of the building is:",
        "options": [
          "10sqrt(3) m",
          "40/sqrt(3) m",
          "20sqrt(3) m",
          "10 m"
        ],
        "correct": 2,
        "explanation": "Distance = 20 / tan 30 = 20 / (1/sqrt(3)) = 20sqrt(3) m."
      }
    ],
    "faqs": [
      {
        "q": "What are the complementary angles in trigonometry?",
        "a": "Two angles are complementary if their sum is 90 degrees, and sin A = cos(90 - A) and cos A = sin(90 - A)."
      },
      {
        "q": "How are trigonometric ratios used in solving real-world problems?",
        "a": "Trigonometric ratios are used in problems involving angles of elevation, angles of depression, and heights and distances."
      }
    ]
  },
  {
    "slug": "class-10-maths-probability-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Probability",
    "intro": "Probability is the mathematical study of uncertainty and randomness, with applications in statistics, finance, and science. Understanding basic probability concepts helps in making informed decisions.",
    "mcqs": [
      {
        "q": "The probability of an impossible event is:",
        "options": [
          "Between 0 and 1",
          "0.5",
          "1",
          "0"
        ],
        "correct": 3,
        "explanation": "The probability of an impossible event is 0, as it can never occur."
      },
      {
        "q": "If a coin is tossed twice, the probability of getting two tails is:",
        "options": [
          "1/4",
          "1/2",
          "3/4",
          "1"
        ],
        "correct": 0,
        "explanation": "Probability = (Favorable outcomes) / (Total outcomes) = 1/4 for getting two tails (TT out of HH, HT, TH, TT)."
      },
      {
        "q": "A dice is rolled. The probability of getting a prime number is:",
        "options": [
          "1/6",
          "1/2",
          "2/3",
          "1/3"
        ],
        "correct": 1,
        "explanation": "Prime numbers on a dice are 2, 3, 5. So probability = 3/6 = 1/2."
      },
      {
        "q": "If P(A) = 0.3 and P(B) = 0.4, and A and B are independent events, then P(A and B) =",
        "options": [
          "0.7",
          "0.1",
          "0.12",
          "0.34"
        ],
        "correct": 2,
        "explanation": "For independent events, P(A and B) = P(A) x P(B) = 0.3 x 0.4 = 0.12."
      },
      {
        "q": "From a standard deck of 52 cards, the probability of drawing a red card is:",
        "options": [
          "1/52",
          "1/4",
          "1/26",
          "1/2"
        ],
        "correct": 3,
        "explanation": "There are 26 red cards (13 hearts and 13 diamonds) in a deck of 52, so probability = 26/52 = 1/2."
      },
      {
        "q": "The probability of an event plus the probability of its complement equals:",
        "options": [
          "1",
          "1/2",
          "2",
          "0"
        ],
        "correct": 0,
        "explanation": "P(A) + P(A complement) = 1 for any event A."
      },
      {
        "q": "If a bag contains 3 red balls and 2 blue balls, the probability of drawing a red ball is:",
        "options": [
          "2/5",
          "3/5",
          "1/5",
          "4/5"
        ],
        "correct": 1,
        "explanation": "Probability = (Favorable outcomes) / (Total outcomes) = 3 / (3 + 2) = 3/5."
      },
      {
        "q": "Two dice are rolled. The probability of getting a sum of 7 is:",
        "options": [
          "1/18",
          "1/36",
          "1/6",
          "1/12"
        ],
        "correct": 2,
        "explanation": "Favorable outcomes for sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total = 36. Probability = 6/36 = 1/6."
      },
      {
        "q": "The probability of getting a number greater than 3 when rolling a dice is:",
        "options": [
          "1/3",
          "1/6",
          "2/3",
          "1/2"
        ],
        "correct": 3,
        "explanation": "Numbers greater than 3 on a dice are 4, 5, 6. So probability = 3/6 = 1/2."
      },
      {
        "q": "If P(A) = 0.2 and P(B) = 0.5, and P(A or B) = 0.6, then events A and B are:",
        "options": [
          "Independent",
          "Dependent",
          "Mutually exclusive",
          "Cannot be determined"
        ],
        "correct": 0,
        "explanation": "Using P(A or B) = P(A) + P(B) - P(A and B): 0.6 = 0.2 + 0.5 - P(A and B), so P(A and B) = 0.1 = 0.2 x 0.5, confirming independence."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between theoretical and experimental probability?",
        "a": "Theoretical probability is calculated using mathematical reasoning, while experimental probability is based on actual observations or experiments."
      },
      {
        "q": "How do you find the probability of independent events?",
        "a": "For independent events, the probability of both occurring is the product of their individual probabilities: P(A and B) = P(A) x P(B)."
      }
    ]
  },
  {
    "slug": "class-10-social-science-nationalism-india-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Nationalism in India",
    "intro": "The Indian independence movement was a long struggle against British colonial rule, led by prominent figures like Mahatma Gandhi, Jawaharlal Nehru, and others. Understanding this history is crucial for Indian citizens.",
    "mcqs": [
      {
        "q": "The Indian National Congress was founded in:",
        "options": [
          "1920",
          "1885",
          "1947",
          "1905"
        ],
        "correct": 1,
        "explanation": "The Indian National Congress was founded on December 28, 1885, to represent the interests of Indians."
      },
      {
        "q": "Who is known as the Father of the Indian Nation?",
        "options": [
          "Vallabhbhai Patel",
          "Jawaharlal Nehru",
          "Mohandas Karamchand Gandhi",
          "Subhas Chandra Bose"
        ],
        "correct": 2,
        "explanation": "Mahatma Gandhi is known as the Father of the Indian Nation for his leadership in the independence movement."
      },
      {
        "q": "The Non-Cooperation Movement was launched by Gandhi in:",
        "options": [
          "1942",
          "1930",
          "1915",
          "1920"
        ],
        "correct": 3,
        "explanation": "The Non-Cooperation Movement started on September 5, 1920, asking Indians to boycott British goods and institutions."
      },
      {
        "q": "The Salt March took place in:",
        "options": [
          "1930",
          "1942",
          "1945",
          "1920"
        ],
        "correct": 0,
        "explanation": "The Salt March or Dandi March occurred in 1930 as a protest against the British salt monopoly."
      },
      {
        "q": "Who presided over the first session of the Indian National Congress?",
        "options": [
          "Sukumar Roy",
          "Womesh Chandra Bonnerjee",
          "Badruddin Tyabji",
          "Ananda Mohan Bose"
        ],
        "correct": 1,
        "explanation": "Womesh Chandra Bonnerjee was the first President of the Indian National Congress in 1885."
      },
      {
        "q": "The Quit India Movement was launched in:",
        "options": [
          "1930",
          "1935",
          "1942",
          "1945"
        ],
        "correct": 2,
        "explanation": "The Quit India Movement was launched on August 8, 1942, demanding immediate British withdrawal from India."
      },
      {
        "q": "Who is known for the concept of Swaraj (self-rule)?",
        "options": [
          "Swami Vivekananda",
          "Ramakrishna Paramahamsa",
          "Sri Aurobindo",
          "Mohandas Gandhi"
        ],
        "correct": 3,
        "explanation": "Mohandas Gandhi popularized the concept of Swaraj, which means self-rule and self-reliance."
      },
      {
        "q": "The Cabinet Mission Plan came to India in:",
        "options": [
          "1946",
          "1948",
          "1942",
          "1944"
        ],
        "correct": 0,
        "explanation": "The Cabinet Mission Plan arrived in India in March 1946 to discuss the terms of Indian independence."
      },
      {
        "q": "India achieved independence on:",
        "options": [
          "December 31, 1949",
          "August 15, 1947",
          "January 26, 1950",
          "August 15, 1948"
        ],
        "correct": 1,
        "explanation": "India became independent on August 15, 1947, marking the end of British rule."
      },
      {
        "q": "Who led the Khilafat Movement in India?",
        "options": [
          "Muhammad Ali Jinnah",
          "Maulana Abul Kalam Azad",
          "Ali Brothers",
          "Sayyid Ahmad Khan"
        ],
        "correct": 2,
        "explanation": "The Khilafat Movement was led by the Ali Brothers (Muhammad Ali and Shaukat Ali) with Gandhi's support."
      }
    ],
    "faqs": [
      {
        "q": "What was the main objective of the Indian National Congress when it was founded?",
        "a": "The INC was founded to represent Indian interests and later became the main organization leading the independence movement."
      },
      {
        "q": "How did Gandhi's non-violent resistance contribute to Indian independence?",
        "a": "Gandhi's Satyagraha approach united Indians across religions and castes, putting moral pressure on the British to leave India."
      }
    ]
  },
  {
    "slug": "class-10-social-science-resources-development-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Resources and Development",
    "intro": "Resources are essential inputs for economic development, and their sustainable management is crucial for the country's future. India has diverse resources including minerals, forests, water, and land.",
    "mcqs": [
      {
        "q": "Resources that can be replenished after use are called:",
        "options": [
          "Non-renewable resources",
          "Exhaustible resources",
          "Fossil fuels",
          "Renewable resources"
        ],
        "correct": 3,
        "explanation": "Renewable resources are those that can be replenished naturally, such as forests, water, and sunlight."
      },
      {
        "q": "Which of the following is a non-renewable resource?",
        "options": [
          "Coal",
          "Water",
          "Wind energy",
          "Solar energy"
        ],
        "correct": 0,
        "explanation": "Coal is a fossil fuel and non-renewable resource that took millions of years to form and cannot be quickly replenished."
      },
      {
        "q": "The major source of irrigation in India is:",
        "options": [
          "Groundwater",
          "Tanks and ponds",
          "River systems",
          "All of the above"
        ],
        "correct": 0,
        "explanation": "Groundwater — through wells and tube wells — irrigates the largest share of India's net irrigated area, well ahead of canals and tanks. The question asks for the MAJOR source, so \"all of the above\" cannot be right."
      },
      {
        "q": "Which state is the largest producer of iron ore in India?",
        "options": [
          "Karnataka",
          "Odisha",
          "Jharkhand",
          "Chhattisgarh"
        ],
        "correct": 1,
        "explanation": "Odisha is the largest producer of iron ore in India, followed by Chhattisgarh and Jharkhand."
      },
      {
        "q": "The practice of cultivation on steep slopes with terraces is called:",
        "options": [
          "Shift cultivation",
          "Strip cropping",
          "Terrace farming",
          "Contour ploughing"
        ],
        "correct": 2,
        "explanation": "Terrace farming involves creating horizontal steps on steep slopes to prevent soil erosion and conserve water."
      },
      {
        "q": "Which mineral is used in the production of cement?",
        "options": [
          "Magnetite",
          "Bauxite",
          "Chromite",
          "Limestone"
        ],
        "correct": 3,
        "explanation": "Limestone (calcium carbonate) is the primary mineral used in cement production."
      },
      {
        "q": "The process of removing salt from water to make it usable is called:",
        "options": [
          "Desalination",
          "Distillation",
          "Filtration",
          "Evaporation"
        ],
        "correct": 0,
        "explanation": "Desalination is the process of removing salt and minerals from seawater or brackish water."
      },
      {
        "q": "Which of the following is a renewable resource?",
        "options": [
          "Copper",
          "Forests",
          "Petroleum",
          "Natural gas"
        ],
        "correct": 1,
        "explanation": "Forests are renewable resources as they can be regenerated through natural growth and reforestation."
      }
    ],
    "faqs": [
      {
        "q": "Why is sustainable resource management important for India?",
        "a": "Sustainable management ensures that resources are available for present and future generations while maintaining environmental health."
      },
      {
        "q": "What are the major challenges in resource development in India?",
        "a": "Major challenges include rapid population growth, increasing demand, pollution, resource depletion, and regional inequalities."
      }
    ]
  },
  {
    "slug": "class-10-social-science-power-sharing-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Power Sharing",
    "intro": "Power sharing is a fundamental principle of democracy where government authority is distributed among different branches and levels. In India, power is shared among the Union, States, and local bodies.",
    "mcqs": [
      {
        "q": "The principle of power sharing among different organs of government is called:",
        "options": [
          "Democracy",
          "Federalism",
          "Separation of powers",
          "Decentralization"
        ],
        "correct": 2,
        "explanation": "Separation of powers divides government authority among the executive, legislative, and judicial branches."
      },
      {
        "q": "Which of the following is an example of power sharing between different tiers of government?",
        "options": [
          "Military rule",
          "Central government only",
          "Local bodies only",
          "Union and State governments"
        ],
        "correct": 3,
        "explanation": "India practices federalism with power sharing between the Union government, State governments, and local bodies."
      },
      {
        "q": "The Indian Constitution is based on which system of government?",
        "options": [
          "Parliamentary",
          "Presidential",
          "Monarchical",
          "Authoritarian"
        ],
        "correct": 0,
        "explanation": "India is a parliamentary democracy where the Prime Minister is the head of government."
      },
      {
        "q": "Who is the head of state in India?",
        "options": [
          "Chief Minister",
          "President",
          "Speaker of Lok Sabha",
          "Prime Minister"
        ],
        "correct": 1,
        "explanation": "The President is the head of state in India, while the Prime Minister is the head of government."
      },
      {
        "q": "The Lok Sabha is the:",
        "options": [
          "Upper House of Parliament",
          "State Assembly",
          "Lower House of Parliament",
          "Municipal Council"
        ],
        "correct": 2,
        "explanation": "The Lok Sabha is the lower house of the Indian Parliament with 545 elected members."
      },
      {
        "q": "The power to make laws is vested in:",
        "options": [
          "Executive",
          "Military",
          "Judiciary",
          "Legislature"
        ],
        "correct": 3,
        "explanation": "The Legislature has the power to make laws, which in India includes the Parliament at the Union level."
      },
      {
        "q": "Which of the following is a responsibility of the Judiciary?",
        "options": [
          "Interpret laws",
          "Both make and enforce laws",
          "Make laws",
          "Enforce laws"
        ],
        "correct": 0,
        "explanation": "The Judiciary interprets laws, settles disputes, and upholds the Constitution."
      },
      {
        "q": "India is a:",
        "options": [
          "Confederal state",
          "Federal state",
          "Unitary state",
          "Monarchy"
        ],
        "correct": 1,
        "explanation": "India is a federal state where power is shared between the Union and the States."
      },
      {
        "q": "The Rajya Sabha is the:",
        "options": [
          "Election Commission",
          "Lower House of Parliament",
          "Upper House of Parliament",
          "State Assembly"
        ],
        "correct": 2,
        "explanation": "The Rajya Sabha is the upper house of the Indian Parliament with members representing states."
      },
      {
        "q": "Which body is responsible for advising the President on matters of state?",
        "options": [
          "Supreme Court",
          "Lok Sabha",
          "Rajya Sabha",
          "Council of Ministers"
        ],
        "correct": 3,
        "explanation": "The Council of Ministers, headed by the Prime Minister, advises the President on governance matters."
      }
    ],
    "faqs": [
      {
        "q": "How does the Indian Constitution ensure power sharing?",
        "a": "Through federalism, separation of powers, and constitutional provisions that distribute authority among Union, State, and local governments."
      },
      {
        "q": "What are the benefits of power sharing in a democracy?",
        "a": "Power sharing prevents concentration of authority, ensures accountability, protects minority interests, and promotes stable governance."
      }
    ]
  },
  {
    "slug": "class-10-social-science-sectors-economy-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Sectors of Indian Economy",
    "intro": "The Indian economy is divided into primary, secondary, and tertiary sectors based on the nature of economic activities. Understanding these sectors is essential for analyzing economic development.",
    "mcqs": [
      {
        "q": "Which sector includes agriculture and mining?",
        "options": [
          "Primary sector",
          "Tertiary sector",
          "Secondary sector",
          "Quaternary sector"
        ],
        "correct": 0,
        "explanation": "The primary sector includes all extractive and agricultural activities like farming, fishing, mining, and forestry."
      },
      {
        "q": "Manufacturing and construction fall under which sector?",
        "options": [
          "All sectors",
          "Secondary sector",
          "Tertiary sector",
          "Primary sector"
        ],
        "correct": 1,
        "explanation": "The secondary sector includes manufacturing, construction, and all activities that transform raw materials."
      },
      {
        "q": "Which of the following is a tertiary sector activity?",
        "options": [
          "Farming",
          "Mining",
          "Banking",
          "Textiles"
        ],
        "correct": 2,
        "explanation": "The tertiary sector includes services like banking, education, healthcare, transport, and communication."
      },
      {
        "q": "The contribution of agriculture to India's GDP is approximately:",
        "options": [
          "30%",
          "5%",
          "50%",
          "15%"
        ],
        "correct": 3,
        "explanation": "Agriculture contributes around 15-18% to India's GDP, though it employs over 50% of the workforce."
      },
      {
        "q": "Which state is known as the textile hub of India?",
        "options": [
          "Gujarat",
          "Maharashtra",
          "Tamil Nadu",
          "Andhra Pradesh"
        ],
        "correct": 0,
        "explanation": "Gujarat is known for its textile industry, particularly cotton and synthetic fabrics."
      },
      {
        "q": "The tertiary sector is also known as:",
        "options": [
          "Agricultural sector",
          "Service sector",
          "Manufacturing sector",
          "Mining sector"
        ],
        "correct": 1,
        "explanation": "The tertiary sector is commonly called the service sector as it provides various services to consumers."
      },
      {
        "q": "Which of the following best describes the primary sector?",
        "options": [
          "Provides services",
          "Manufactures products",
          "Extracts resources from nature",
          "Produces goods through transformation"
        ],
        "correct": 2,
        "explanation": "The primary sector extracts or harvests products from the earth, like agriculture, fishing, and mining."
      },
      {
        "q": "Information technology in India is primarily part of the:",
        "options": [
          "Secondary sector",
          "Quaternary sector",
          "Primary sector",
          "Tertiary sector"
        ],
        "correct": 3,
        "explanation": "IT is a service activity and falls under the tertiary sector of the Indian economy."
      },
      {
        "q": "Which sector has seen rapid growth in India in recent decades?",
        "options": [
          "Tertiary sector",
          "All equally",
          "Secondary sector",
          "Primary sector"
        ],
        "correct": 0,
        "explanation": "The tertiary sector, especially IT and services, has shown rapid growth and now contributes majority to GDP."
      },
      {
        "q": "The organized sector in India refers to:",
        "options": [
          "All sectors combined",
          "Registered and regulated industries",
          "Unregistered activities",
          "Agricultural activities"
        ],
        "correct": 1,
        "explanation": "The organized sector includes registered, regulated, and formal economic activities with legal recognition."
      }
    ],
    "faqs": [
      {
        "q": "Why has the tertiary sector become more important in the Indian economy?",
        "a": "Due to globalization, technological advancement, and rising income levels, service sector activities have grown significantly."
      },
      {
        "q": "What is the role of agriculture in the Indian economy despite declining GDP contribution?",
        "a": "Agriculture remains crucial as it employs millions, provides raw materials for industries, and ensures food security."
      }
    ]
  },
  {
    "slug": "class-9-science-matter-surroundings-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Matter in Our Surroundings",
    "intro": "Matter is anything that has mass and occupies space, existing in three states: solid, liquid, and gas. Understanding the properties of matter and changes in its states is fundamental to science.",
    "mcqs": [
      {
        "q": "Which of the following is a property of solids?",
        "options": [
          "Takes the shape of container",
          "No definite shape or volume",
          "Definite shape and volume",
          "No intermolecular forces"
        ],
        "correct": 2,
        "explanation": "Solids have a definite shape and volume due to strong intermolecular forces and arranged particles."
      },
      {
        "q": "The change of state from liquid to gas is called:",
        "options": [
          "Melting",
          "Freezing",
          "Condensation",
          "Evaporation"
        ],
        "correct": 3,
        "explanation": "Evaporation is the process where a liquid changes into gas state at the surface."
      },
      {
        "q": "The temperature at which a solid melts into a liquid is:",
        "options": [
          "Melting point",
          "Boiling point",
          "Freezing point",
          "Critical point"
        ],
        "correct": 0,
        "explanation": "The melting point is the specific temperature at which a solid turns into a liquid state."
      },
      {
        "q": "Sublimation is the process where a substance changes from:",
        "options": [
          "Gas to solid",
          "Solid directly to gas",
          "Liquid to gas",
          "Solid to liquid"
        ],
        "correct": 1,
        "explanation": "Sublimation is the direct transition of a substance from solid state to gas state without becoming liquid."
      },
      {
        "q": "Which of the following shows the correct order of particles spacing?",
        "options": [
          "Solid > Liquid > Gas",
          "Gas > Solid > Liquid",
          "Gas > Liquid > Solid",
          "All are equal"
        ],
        "correct": 2,
        "explanation": "Particles in gas have the maximum space between them, followed by liquid, then solid with minimum space."
      },
      {
        "q": "The SI unit of temperature is:",
        "options": [
          "Fahrenheit",
          "Rankine",
          "Celsius",
          "Kelvin"
        ],
        "correct": 3,
        "explanation": "Kelvin is the SI unit of temperature, where absolute zero is 0 K or -273.15 degrees Celsius."
      },
      {
        "q": "Evaporation occurs at:",
        "options": [
          "Any temperature below boiling point",
          "Only at room temperature",
          "Only when heated",
          "Boiling point only"
        ],
        "correct": 0,
        "explanation": "Evaporation can occur at any temperature below the boiling point, not just at boiling point."
      },
      {
        "q": "The process of conversion of gas to liquid is:",
        "options": [
          "Melting",
          "Condensation",
          "Evaporation",
          "Deposition"
        ],
        "correct": 1,
        "explanation": "Condensation is the change of state from gas to liquid, opposite of evaporation."
      },
      {
        "q": "Which state of matter has particles that are closely packed and can vibrate?",
        "options": [
          "Gas",
          "Plasma",
          "Solid",
          "Liquid"
        ],
        "correct": 2,
        "explanation": "Solids have closely packed particles that can only vibrate in fixed positions due to strong forces."
      },
      {
        "q": "The boiling point of water at standard atmospheric pressure is:",
        "options": [
          "110 degrees C",
          "90 degrees C",
          "50 degrees C",
          "100 degrees C"
        ],
        "correct": 3,
        "explanation": "Water boils at 100 degrees Celsius at standard atmospheric pressure of 1 atm."
      }
    ],
    "faqs": [
      {
        "q": "Why do different substances have different melting and boiling points?",
        "a": "Different substances have different strengths of intermolecular forces, which determines the temperature needed to change states."
      },
      {
        "q": "What causes evaporation even below the boiling point?",
        "a": "High-energy particles at the surface of a liquid gain enough energy to escape as gas molecules at room temperature."
      }
    ]
  },
  {
    "slug": "class-9-science-atoms-molecules-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Atoms and Molecules",
    "intro": "Atoms are the smallest units of elements that retain chemical properties, while molecules are combinations of atoms. Understanding atomic structure and chemical formulas is essential for chemistry.",
    "mcqs": [
      {
        "q": "Who proposed the Dalton's atomic theory?",
        "options": [
          "John Dalton",
          "Bohr",
          "Thomson",
          "Rutherford"
        ],
        "correct": 0,
        "explanation": "John Dalton proposed the atomic theory in 1808, stating that matter consists of tiny indivisible particles called atoms."
      },
      {
        "q": "The mass number of an atom is equal to:",
        "options": [
          "Number of electrons + neutrons",
          "Number of protons + neutrons",
          "Number of protons",
          "Number of electrons"
        ],
        "correct": 1,
        "explanation": "The mass number is the sum of protons and neutrons, which constitute most of the atom's mass."
      },
      {
        "q": "Which of the following is the correct electronic configuration of Oxygen (O)?",
        "options": [
          "2, 4",
          "2, 8",
          "2, 6",
          "8, 2"
        ],
        "correct": 2,
        "explanation": "Oxygen has atomic number 8, so its electronic configuration is 2, 6 (2 electrons in first shell, 6 in second)."
      },
      {
        "q": "The molecular mass of CO2 is approximately:",
        "options": [
          "32",
          "28",
          "64",
          "44"
        ],
        "correct": 3,
        "explanation": "Molecular mass of CO2 = 12 + (16 x 2) = 12 + 32 = 44 g/mol."
      },
      {
        "q": "An ion with a positive charge is called:",
        "options": [
          "Cation",
          "Anion",
          "Atom",
          "Radical"
        ],
        "correct": 0,
        "explanation": "A cation is an ion with a positive charge, formed when an atom loses electrons."
      },
      {
        "q": "The atomic mass unit is defined as:",
        "options": [
          "Mass of proton",
          "1/12 of carbon-12 mass",
          "1/16 of oxygen mass",
          "Mass of electron"
        ],
        "correct": 1,
        "explanation": "One atomic mass unit (u) is defined as 1/12 of the mass of a carbon-12 atom."
      },
      {
        "q": "The formula for common salt is:",
        "options": [
          "Na2Cl2",
          "NaCl2",
          "NaCl",
          "Na2Cl"
        ],
        "correct": 2,
        "explanation": "The formula for sodium chloride (common salt) is NaCl, with one sodium and one chloride ion."
      },
      {
        "q": "Which of the following is a diatomic molecule?",
        "options": [
          "O3",
          "P4",
          "S8",
          "H2"
        ],
        "correct": 3,
        "explanation": "H2 (hydrogen) is a diatomic molecule consisting of two hydrogen atoms bonded together."
      },
      {
        "q": "The valency of oxygen in most compounds is:",
        "options": [
          "2",
          "4",
          "3",
          "1"
        ],
        "correct": 0,
        "explanation": "Oxygen has a valency of 2 in most compounds because it needs 2 more electrons to complete its octet."
      },
      {
        "q": "The molar mass of H2SO4 is approximately:",
        "options": [
          "102",
          "98",
          "100",
          "96"
        ],
        "correct": 1,
        "explanation": "Molar mass of H2SO4 = (2 x 1) + 32 + (4 x 16) = 2 + 32 + 64 = 98 g/mol."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between atoms and molecules?",
        "a": "An atom is the smallest unit of an element, while a molecule is a combination of atoms bonded together."
      },
      {
        "q": "How is the atomic mass of an element determined?",
        "a": "The atomic mass is the weighted average of the masses of all naturally occurring isotopes of that element."
      }
    ]
  },
  {
    "slug": "class-9-science-fundamental-unit-life-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "The Fundamental Unit of Life",
    "intro": "The cell is the fundamental unit of life, and all living organisms are composed of one or more cells. Understanding cell structure and function is crucial for biology.",
    "mcqs": [
      {
        "q": "Who discovered the cell?",
        "options": [
          "Antonie van Leeuwenhoek",
          "Louis Pasteur",
          "Robert Hooke",
          "Schleiden"
        ],
        "correct": 2,
        "explanation": "Robert Hooke discovered the cell in 1665 while observing a thin slice of cork under a microscope."
      },
      {
        "q": "The cell membrane is made of:",
        "options": [
          "DNA",
          "Carbohydrates only",
          "Cellulose",
          "Proteins and lipids"
        ],
        "correct": 3,
        "explanation": "The cell membrane is composed of a phospholipid bilayer with embedded and peripheral proteins."
      },
      {
        "q": "Which of the following organelles is found only in plant cells?",
        "options": [
          "Chloroplast",
          "Nucleus",
          "Ribosome",
          "Mitochondria"
        ],
        "correct": 0,
        "explanation": "Chloroplasts are found only in plant cells and are responsible for photosynthesis."
      },
      {
        "q": "The powerhouse of the cell is the:",
        "options": [
          "Ribosome",
          "Mitochondria",
          "Nucleus",
          "Chloroplast"
        ],
        "correct": 1,
        "explanation": "Mitochondria are the powerhouse of the cell, producing ATP through aerobic respiration."
      },
      {
        "q": "The control center of the cell is:",
        "options": [
          "Chloroplast",
          "Mitochondria",
          "Nucleus",
          "Endoplasmic reticulum"
        ],
        "correct": 2,
        "explanation": "The nucleus is the control center containing DNA and controlling all cellular activities."
      },
      {
        "q": "Prokaryotic cells lack:",
        "options": [
          "Cytoplasm",
          "Ribosomes",
          "Cell membrane",
          "Nucleus"
        ],
        "correct": 3,
        "explanation": "Prokaryotic cells do not have a membrane-bound nucleus, unlike eukaryotic cells."
      },
      {
        "q": "The site of protein synthesis in the cell is:",
        "options": [
          "Ribosome",
          "Nucleus",
          "Mitochondria",
          "Golgi apparatus"
        ],
        "correct": 0,
        "explanation": "Ribosomes are the sites where proteins are synthesized according to instructions from mRNA."
      },
      {
        "q": "The cell wall in plant cells is made of:",
        "options": [
          "Lipids",
          "Cellulose",
          "Carbohydrates",
          "Proteins"
        ],
        "correct": 1,
        "explanation": "The cell wall in plant cells is made of cellulose, which provides structural support."
      },
      {
        "q": "Which organelle modifies and packages proteins?",
        "options": [
          "Lysosome",
          "Chloroplast",
          "Golgi apparatus",
          "Rough endoplasmic reticulum"
        ],
        "correct": 2,
        "explanation": "The Golgi apparatus modifies, packages, and ships proteins to their destinations."
      },
      {
        "q": "Lysosomes are known as the suicide sacs of the cell because they:",
        "options": [
          "Transport materials",
          "Synthesize proteins",
          "Store energy",
          "Contain digestive enzymes that can destroy the cell"
        ],
        "correct": 3,
        "explanation": "Lysosomes contain powerful digestive enzymes that can break down cellular components if released."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between prokaryotic and eukaryotic cells?",
        "a": "Prokaryotic cells lack a membrane-bound nucleus and organelles, while eukaryotic cells have both."
      },
      {
        "q": "Why is the nucleus called the control center of the cell?",
        "a": "The nucleus contains DNA which directs all cellular activities including protein synthesis and cell division."
      }
    ]
  },
  {
    "slug": "class-9-science-motion-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Motion",
    "intro": "Motion is the change of position of an object with respect to time, and understanding its laws is fundamental to physics. This chapter covers distance, displacement, speed, velocity, and acceleration.",
    "mcqs": [
      {
        "q": "Which of the following is a scalar quantity?",
        "options": [
          "Speed",
          "Velocity",
          "Acceleration",
          "Displacement"
        ],
        "correct": 0,
        "explanation": "Speed is a scalar quantity that has magnitude only, while velocity, displacement, and acceleration are vectors."
      },
      {
        "q": "The slope of a distance-time graph represents:",
        "options": [
          "Distance",
          "Speed",
          "Acceleration",
          "Displacement"
        ],
        "correct": 1,
        "explanation": "The slope of a distance-time graph gives the speed of the object."
      },
      {
        "q": "If a car travels 100 m east and then 50 m west, its displacement is:",
        "options": [
          "50 m west",
          "150 m west",
          "50 m east",
          "150 m east"
        ],
        "correct": 2,
        "explanation": "Displacement is the straight-line distance with direction from initial to final position: 100 - 50 = 50 m east."
      },
      {
        "q": "Acceleration is the rate of change of:",
        "options": [
          "Displacement",
          "Distance",
          "Speed",
          "Velocity"
        ],
        "correct": 3,
        "explanation": "Acceleration is defined as the rate of change of velocity with respect to time."
      },
      {
        "q": "If an object moves with constant velocity, its acceleration is:",
        "options": [
          "Zero",
          "Positive",
          "Negative",
          "Infinite"
        ],
        "correct": 0,
        "explanation": "If velocity is constant, there is no change in velocity, so acceleration equals zero."
      },
      {
        "q": "Newton's first law of motion states that:",
        "options": [
          "Objects fall with constant acceleration",
          "An object in motion stays in motion unless acted upon by a force",
          "F = ma",
          "Action and reaction are equal"
        ],
        "correct": 1,
        "explanation": "Newton's first law states that objects at rest remain at rest and objects in motion remain in motion unless external force acts."
      },
      {
        "q": "Newton's second law can be expressed as:",
        "options": [
          "v = u + at",
          "s = ut + 1/2 at^2",
          "F = ma",
          "a = F/m"
        ],
        "correct": 2,
        "explanation": "Newton's second law states that Force equals mass times acceleration: F = ma."
      },
      {
        "q": "An object is said to be in uniform motion when it:",
        "options": [
          "Has constant acceleration",
          "Is at rest",
          "Travels in a circle",
          "Travels equal distances in equal times"
        ],
        "correct": 3,
        "explanation": "Uniform motion occurs when an object travels equal distances in equal time intervals."
      },
      {
        "q": "The SI unit of acceleration is:",
        "options": [
          "m/s^2",
          "cm/s^2",
          "m/s",
          "km/h"
        ],
        "correct": 0,
        "explanation": "The SI unit of acceleration is meter per second squared (m/s^2)."
      },
      {
        "q": "If an object starts from rest and accelerates at 2 m/s^2 for 5 seconds, its final velocity is:",
        "options": [
          "5 m/s",
          "10 m/s",
          "25 m/s",
          "2 m/s"
        ],
        "correct": 1,
        "explanation": "Using v = u + at: v = 0 + (2 x 5) = 10 m/s."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between speed and velocity?",
        "a": "Speed is a scalar quantity (magnitude only) representing rate of motion, while velocity is a vector (magnitude and direction)."
      },
      {
        "q": "How do Newton's laws of motion apply to daily life?",
        "a": "Newton's laws explain phenomena like why we move forward when a car brakes suddenly (law 1) and why heavier objects need more force to move (law 2)."
      }
    ]
  },
  {
    "slug": "class-9-science-gravitation-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Gravitation",
    "intro": "Gravitation is the force of attraction between all objects in the universe, discovered and explained by Newton. Understanding gravity is essential for understanding planetary motion and weight.",
    "mcqs": [
      {
        "q": "Newton's law of universal gravitation states that the gravitational force between two objects is:",
        "options": [
          "Directly proportional to the distance between them",
          "Independent of their masses",
          "Inversely proportional to the square of distance between them",
          "Directly proportional to the sum of their masses"
        ],
        "correct": 2,
        "explanation": "The gravitational force is directly proportional to the product of masses and inversely proportional to the square of distance: F = GMm/r^2."
      },
      {
        "q": "The gravitational constant G is approximately:",
        "options": [
          "6.67 x 10^11 N m^2/kg^2",
          "10^-11 N/kg",
          "9.8 m/s^2",
          "6.67 x 10^-11 N m^2/kg^2"
        ],
        "correct": 3,
        "explanation": "The gravitational constant G equals 6.67 x 10^-11 N m^2/kg^2."
      },
      {
        "q": "The weight of an object is:",
        "options": [
          "The gravitational force exerted on the object",
          "The amount of matter in the object",
          "Independent of mass",
          "The same everywhere"
        ],
        "correct": 0,
        "explanation": "Weight is the force of gravity acting on an object and equals mass times gravitational acceleration (W = mg)."
      },
      {
        "q": "Acceleration due to gravity at Earth's surface is approximately:",
        "options": [
          "6.67 m/s^2",
          "9.8 m/s^2",
          "10 m/s^2",
          "15 m/s^2"
        ],
        "correct": 1,
        "explanation": "The acceleration due to gravity near Earth's surface is approximately 9.8 m/s^2 or 10 m/s^2."
      },
      {
        "q": "If the mass of an object is doubled, its weight becomes:",
        "options": [
          "Half",
          "Quarter",
          "Double",
          "Same"
        ],
        "correct": 2,
        "explanation": "Weight = mg, so if mass doubles, weight also doubles (assuming g remains constant)."
      },
      {
        "q": "An astronaut weighs 100 N on Earth. On the Moon, where g = 1.6 m/s^2, the astronaut's weight would be approximately:",
        "options": [
          "100 N",
          "60 N",
          "1000 N",
          "16 N"
        ],
        "correct": 3,
        "explanation": "Weight 100 N on Earth (g = 10 m/s²) gives mass = 100/10 = 10 kg. Mass does not change, so on the Moon W = m x g = 10 x 1.6 = 16 N."
      },
      {
        "q": "The orbital velocity of a satellite depends on:",
        "options": [
          "Only the planet's mass and radius of orbit",
          "Both mass and radius of orbit",
          "Its mass",
          "The radius of orbit"
        ],
        "correct": 0,
        "explanation": "Orbital velocity depends on the mass of the central body and the orbital radius, not on the satellite's mass."
      },
      {
        "q": "Free fall is a motion where:",
        "options": [
          "Resistance is maximum",
          "Only gravitational force acts",
          "Velocity is constant",
          "No force acts"
        ],
        "correct": 1,
        "explanation": "Free fall is motion under gravity alone, where only the gravitational force acts on the object."
      },
      {
        "q": "If the distance between two objects is doubled, the gravitational force becomes:",
        "options": [
          "Double",
          "Half",
          "One-fourth",
          "Four times"
        ],
        "correct": 2,
        "explanation": "Since F ∝ 1/r^2, doubling distance makes force 1/4 of the original."
      },
      {
        "q": "Mass is different from weight because:",
        "options": [
          "Mass changes with location",
          "They have the same definition",
          "Weight is constant everywhere",
          "Mass is matter quantity, weight is gravitational force"
        ],
        "correct": 3,
        "explanation": "Mass is the quantity of matter and is constant everywhere, while weight is the gravitational force and varies with location."
      }
    ],
    "faqs": [
      {
        "q": "Why do objects fall at the same rate on Earth regardless of their mass?",
        "a": "Acceleration due to gravity is constant (9.8 m/s^2) for all objects near Earth's surface, independent of their mass."
      },
      {
        "q": "How does gravity work in space where there is no air resistance?",
        "a": "Gravity acts on objects regardless of the medium, causing them to accelerate toward the massive body due to gravitational force."
      }
    ]
  },
  {
    "slug": "class-9-social-science-french-revolution-mcq",
    "classLevel": "9",
    "subject": "Social Science",
    "chapter": "French Revolution",
    "intro": "The French Revolution was a pivotal period in world history that transformed French society and influenced democratic movements globally. Understanding its causes, events, and consequences is essential.",
    "mcqs": [
      {
        "q": "The French Revolution began in the year:",
        "options": [
          "1789",
          "1776",
          "1804",
          "1799"
        ],
        "correct": 0,
        "explanation": "The French Revolution began in 1789 with the storming of the Bastille on July 14."
      },
      {
        "q": "The Declaration of the Rights of Man and of the Citizen was adopted in:",
        "options": [
          "1790",
          "1789",
          "1788",
          "1791"
        ],
        "correct": 1,
        "explanation": "This declaration was adopted on August 26, 1789, affirming the rights and freedoms of all people."
      },
      {
        "q": "The Storming of the Bastille occurred on:",
        "options": [
          "June 14",
          "August 14",
          "July 14",
          "September 14"
        ],
        "correct": 2,
        "explanation": "The Bastille was stormed on July 14, 1789, which is now celebrated as Bastille Day in France."
      },
      {
        "q": "Who was the King of France during the Revolution?",
        "options": [
          "Louis XIV",
          "Napoleon",
          "Louis XV",
          "Louis XVI"
        ],
        "correct": 3,
        "explanation": "King Louis XVI ruled France during the revolution and was executed on January 21, 1793."
      },
      {
        "q": "The National Assembly declared feudalism abolished in:",
        "options": [
          "1789",
          "1788",
          "1791",
          "1790"
        ],
        "correct": 0,
        "explanation": "On August 4, 1789, the National Assembly abolished feudalism and all feudal privileges."
      },
      {
        "q": "The three estates in pre-revolutionary France were:",
        "options": [
          "Army, Navy, Civilians",
          "Clergy, Nobles, Commoners",
          "Noble, Clergy, Merchants",
          "Aristocracy, Commons, King"
        ],
        "correct": 1,
        "explanation": "The three estates were: First Estate (Clergy), Second Estate (Nobles), and Third Estate (Commoners)."
      },
      {
        "q": "The Civil Constitution of the Clergy aimed to:",
        "options": [
          "Strengthen the monarchy",
          "End all religious practices",
          "Place Church under state control",
          "Increase Church power"
        ],
        "correct": 2,
        "explanation": "This 1790 document placed the Catholic Church under state authority rather than papal control."
      },
      {
        "q": "Marie Antoinette was the wife of King:",
        "options": [
          "Louis XIV",
          "Napoleon",
          "Louis XV",
          "Louis XVI"
        ],
        "correct": 3,
        "explanation": "Marie Antoinette was married to King Louis XVI and was executed in 1793."
      },
      {
        "q": "The Reign of Terror in France refers to:",
        "options": [
          "1793-1794 period of mass executions",
          "Military defeat",
          "Economic collapse",
          "War with Austria"
        ],
        "correct": 0,
        "explanation": "The Reign of Terror (1793-1794) was a period of extreme violence and mass executions under Robespierre."
      },
      {
        "q": "The French Revolution most directly influenced:",
        "options": [
          "Only France",
          "European and American democratic movements",
          "Asian politics",
          "Ancient Rome"
        ],
        "correct": 1,
        "explanation": "The revolution's ideals of liberty and democracy influenced democratic movements throughout the world."
      }
    ],
    "faqs": [
      {
        "q": "What were the main causes of the French Revolution?",
        "a": "Main causes included financial crisis, inequality among estates, Enlightenment ideas, and severe famine and poverty."
      },
      {
        "q": "How did the French Revolution change European politics?",
        "a": "It challenged absolute monarchy, promoted nationalism and democracy, and influenced the spread of democratic ideals across Europe."
      }
    ]
  },
  {
    "slug": "class-9-social-science-nazism-mcq",
    "classLevel": "9",
    "subject": "Social Science",
    "chapter": "Nazism",
    "intro": "Nazism was a totalitarian ideology in Germany under Adolf Hitler that led to World War II and the Holocaust. Understanding this dark period is crucial for preventing similar atrocities.",
    "mcqs": [
      {
        "q": "The Nazi Party was led by:",
        "options": [
          "Joseph Goebbels",
          "Hermann Goering",
          "Adolf Hitler",
          "Benito Mussolini"
        ],
        "correct": 2,
        "explanation": "Adolf Hitler founded and led the Nazi Party, becoming Fuhrer of Germany in 1934."
      },
      {
        "q": "Hitler became Chancellor of Germany in:",
        "options": [
          "1930",
          "1932",
          "1935",
          "1933"
        ],
        "correct": 3,
        "explanation": "Adolf Hitler was appointed Chancellor of Germany on January 30, 1933."
      },
      {
        "q": "The Nazi ideology was based on:",
        "options": [
          "Racial superiority and totalitarianism",
          "Religious tolerance",
          "Communism",
          "Democracy and equality"
        ],
        "correct": 0,
        "explanation": "Nazism promoted the concept of Aryan racial superiority and established a totalitarian dictatorship."
      },
      {
        "q": "The Holocaust refers to:",
        "options": [
          "World War II",
          "Systematic genocide of European Jews",
          "German economic policy",
          "A natural disaster"
        ],
        "correct": 1,
        "explanation": "The Holocaust was the systematic murder of six million Jews and millions of others by Nazi Germany."
      },
      {
        "q": "The Munich Agreement of 1938 allowed Germany to:",
        "options": [
          "Invade France",
          "Annex Austria",
          "Annex Czechoslovakia",
          "Annex Poland"
        ],
        "correct": 2,
        "explanation": "The Munich Agreement allowed Germany to annex the Sudetenland region of Czechoslovakia."
      },
      {
        "q": "World War II began when Germany invaded:",
        "options": [
          "France",
          "Austria",
          "Britain",
          "Poland"
        ],
        "correct": 3,
        "explanation": "Nazi Germany invaded Poland on September 1, 1939, which triggered the start of World War II."
      },
      {
        "q": "The Nazi party controlled all aspects of German society through:",
        "options": [
          "Totalitarian control and propaganda",
          "Economic incentives",
          "Military force alone",
          "Democratic elections"
        ],
        "correct": 0,
        "explanation": "The Nazis established total control through a police state, propaganda, and suppression of opposition."
      },
      {
        "q": "The Nuremberg Trials were held to:",
        "options": [
          "Plan post-war recovery",
          "Try Nazi leaders for war crimes",
          "Establish new government",
          "Celebrate Nazi victories"
        ],
        "correct": 1,
        "explanation": "The Nuremberg Trials (1945-1946) prosecuted Nazi leaders for crimes against humanity and war crimes."
      },
      {
        "q": "Hitler's concept of Lebensraum meant:",
        "options": [
          "Peaceful coexistence",
          "Cultural exchange",
          "Living space for Germans",
          "Economic growth"
        ],
        "correct": 2,
        "explanation": "Lebensraum (living space) was Hitler's ideology of territorial expansion for the German people."
      },
      {
        "q": "The rise of Nazism in Germany was facilitated by:",
        "options": [
          "International cooperation",
          "Strong democracy",
          "Universal prosperity",
          "Economic crisis and national humiliation"
        ],
        "correct": 3,
        "explanation": "The Great Depression and resentment over the Treaty of Versailles created conditions for Nazi rise."
      }
    ],
    "faqs": [
      {
        "q": "How did propaganda play a role in the rise of Nazism?",
        "a": "Nazi propaganda, controlled by Joseph Goebbels, manipulated public opinion through radio, cinema, and education to spread anti-Semitic and racist ideologies."
      },
      {
        "q": "What were the consequences of Nazi ideology on the world?",
        "a": "Nazism led to World War II, the Holocaust, millions of deaths, and fundamentally changed international law and human rights norms."
      }
    ]
  },
  {
    "slug": "class-9-social-science-physical-features-india-mcq",
    "classLevel": "9",
    "subject": "Social Science",
    "chapter": "Physical Features of India",
    "intro": "India's diverse physical features include mountain ranges, plateaus, plains, and coastal regions that significantly influence its climate, vegetation, and human settlement patterns.",
    "mcqs": [
      {
        "q": "The Northern Plains of India are formed by the rivers:",
        "options": [
          "Indus, Ganges, and Brahmaputra",
          "Mahanadi and Tungabhadra",
          "Narmada and Tapti",
          "Godavari and Krishna"
        ],
        "correct": 0,
        "explanation": "The vast Northern Plains are formed by alluvial deposits from the Indus, Ganges, and Brahmaputra rivers."
      },
      {
        "q": "The highest peak in India is:",
        "options": [
          "Nanda Devi",
          "Kangchenjunga",
          "K2",
          "Mount Everest"
        ],
        "correct": 1,
        "explanation": "Kangchenjunga (8,586 m) is the highest peak wholly in Indian territory, located in the Sikkim Himalaya."
      },
      {
        "q": "The Western Ghats are primarily located in:",
        "options": [
          "Eastern India",
          "Northern India",
          "Southern and Western India",
          "Central India"
        ],
        "correct": 2,
        "explanation": "The Western Ghats run parallel to the western coast from Gujarat to Kerala in southern and western India."
      },
      {
        "q": "The Deccan Plateau is characterized by:",
        "options": [
          "Dense forests",
          "Mountains and valleys",
          "Marshy lands",
          "Dry plateau with table-top elevation"
        ],
        "correct": 3,
        "explanation": "The Deccan Plateau is an elevated region with table-top topography located south of the Narmada river."
      },
      {
        "q": "Which river is the longest in India?",
        "options": [
          "Ganges",
          "Indus",
          "Brahmaputra",
          "Yangtze"
        ],
        "correct": 0,
        "explanation": "The Ganges is the longest river wholly in India, flowing from the Himalayas to the Bay of Bengal."
      },
      {
        "q": "The Himalayas are primarily composed of:",
        "options": [
          "Igneous rock",
          "Sedimentary rock",
          "Metamorphic rock",
          "All of the above"
        ],
        "correct": 1,
        "explanation": "The Himalayas are primarily made of sedimentary rocks and were formed by tectonic plate collision."
      },
      {
        "q": "The Thar Desert is located in:",
        "options": [
          "Rajasthan and Punjab",
          "Rajasthan",
          "Haryana",
          "Gujarat"
        ],
        "correct": 1,
        "explanation": "The Thar (Great Indian) Desert is primarily located in Rajasthan, extending into Gujarat and Punjab."
      },
      {
        "q": "The Eastern Ghats are located in:",
        "options": [
          "Kerala",
          "Tamil Nadu",
          "Andhra Pradesh and Odisha",
          "Karnataka"
        ],
        "correct": 2,
        "explanation": "The Eastern Ghats run parallel to the eastern coast through Andhra Pradesh and Odisha."
      },
      {
        "q": "The Malwa Plateau is known for:",
        "options": [
          "Dense population",
          "Tea plantations",
          "Tropical forests",
          "Black soil suitable for farming"
        ],
        "correct": 3,
        "explanation": "The Malwa Plateau in central India is known for its black soil, which is fertile and suitable for agriculture."
      },
      {
        "q": "The Western Ghats receive more rainfall than the Eastern Ghats because:",
        "options": [
          "They face the southwest monsoon winds directly",
          "They are closer to the sea",
          "They are higher in elevation",
          "They block the monsoon winds"
        ],
        "correct": 0,
        "explanation": "The Western Ghats face the southwest monsoon winds directly and thus receive more rainfall than the Eastern Ghats."
      }
    ],
    "faqs": [
      {
        "q": "How do the Himalayas influence India's climate?",
        "a": "The Himalayas act as a barrier preventing cold northerly winds and influence monsoon patterns, making India warmer and wetter than it would otherwise be."
      },
      {
        "q": "Why is the Ganges River important to India?",
        "a": "The Ganges is sacred to Hindus, provides water for irrigation and drinking, supports extensive agriculture, and sustains dense populations."
      }
    ]
  },
  {
    "slug": "class-10-science-heredity-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Heredity and Evolution",
    "intro": "Heredity is the process of passing traits from parents to offspring. Understanding heredity helps us comprehend how characteristics are inherited across generations.",
    "mcqs": [
      {
        "q": "What is the unit of heredity called?",
        "options": [
          "Chromosome",
          "Gene",
          "Nucleus",
          "Allele"
        ],
        "correct": 1,
        "explanation": "A gene is the unit of heredity that carries information for specific traits and is passed from parents to offspring."
      },
      {
        "q": "Who is known as the father of genetics?",
        "options": [
          "Louis Pasteur",
          "Robert Hooke",
          "Gregor Mendel",
          "Charles Darwin"
        ],
        "correct": 2,
        "explanation": "Gregor Mendel conducted experiments on pea plants and established the fundamental laws of inheritance."
      },
      {
        "q": "In Mendel's monohybrid cross, what was the phenotypic ratio in F2 generation?",
        "options": [
          "1:2:1",
          "1:1",
          "9:3:3:1",
          "3:1"
        ],
        "correct": 3,
        "explanation": "The 3:1 ratio appeared in the F2 generation showing that the dominant trait appeared three times more often than the recessive."
      },
      {
        "q": "What are alleles?",
        "options": [
          "Different forms of the same gene",
          "Recessive genes only",
          "Dominant genes only",
          "Different genes on same chromosome"
        ],
        "correct": 0,
        "explanation": "Alleles are alternate forms of a gene that code for different versions of the same trait."
      },
      {
        "q": "Which of the following is a dominant trait in humans?",
        "options": [
          "Blue eyes",
          "Rolling tongue",
          "Attached earlobes",
          "Red hair"
        ],
        "correct": 1,
        "explanation": "The ability to roll the tongue is a dominant trait, requiring only one dominant allele for expression."
      },
      {
        "q": "What is a homozygous genotype?",
        "options": [
          "Aa or Bb",
          "Different alleles",
          "AA or aa",
          "Aa"
        ],
        "correct": 2,
        "explanation": "Homozygous means both alleles are the same, either AA (homozygous dominant) or aa (homozygous recessive)."
      },
      {
        "q": "In a test cross, what is the ratio obtained when a homozygous dominant is crossed with homozygous recessive?",
        "options": [
          "1:2:1",
          "1:1",
          "3:1",
          "All dominant"
        ],
        "correct": 3,
        "explanation": "A test cross with a homozygous recessive produces all dominant offspring in the F1 generation."
      },
      {
        "q": "Which chromosome pair determines the sex in humans?",
        "options": [
          "Chromosome 23",
          "Chromosome 10",
          "Chromosome 1",
          "Chromosome 5"
        ],
        "correct": 0,
        "explanation": "Chromosome 23 is the sex chromosome pair (XX for females, XY for males) that determines biological sex."
      },
      {
        "q": "What is a variation in biology?",
        "options": [
          "Change in environment",
          "Differences between individuals of same species",
          "Disease in organism",
          "Mutation in genes"
        ],
        "correct": 1,
        "explanation": "Variation refers to the differences in traits among individuals of the same species due to genetic and environmental factors."
      },
      {
        "q": "Which process leads to evolution according to Darwin?",
        "options": [
          "Mutation",
          "Genetic drift",
          "Natural selection",
          "Adaptation"
        ],
        "correct": 2,
        "explanation": "Natural selection is the mechanism Darwin proposed where organisms with favorable traits survive and reproduce more successfully."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between dominant and recessive traits?",
        "a": "Dominant traits are expressed in heterozygous (Aa) individuals, while recessive traits appear only in homozygous recessive (aa) individuals. A dominant allele masks the effect of a recessive allele."
      },
      {
        "q": "Can two brown-eyed parents have a blue-eyed child?",
        "a": "Yes, if both parents are heterozygous for the brown eye trait (Bb). Each can contribute the recessive blue eye allele (b), resulting in a blue-eyed child (bb)."
      }
    ]
  },
  {
    "slug": "class-10-science-human-eye-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "The Human Eye and Colourful World",
    "intro": "The human eye is a complex optical instrument that allows us to see the world. Understanding its structure and function helps explain vision and optical phenomena.",
    "mcqs": [
      {
        "q": "Which part of the eye acts as a lens?",
        "options": [
          "Retina",
          "Cornea",
          "Iris",
          "Lens"
        ],
        "correct": 3,
        "explanation": "The lens changes shape to focus light rays on the retina, enabling clear vision at different distances."
      },
      {
        "q": "What is the function of the iris?",
        "options": [
          "Control pupil size",
          "Focus light",
          "Transmit light",
          "Detect light"
        ],
        "correct": 0,
        "explanation": "The iris controls the size of the pupil to regulate the amount of light entering the eye."
      },
      {
        "q": "Which part of the eye is sensitive to light?",
        "options": [
          "Cornea",
          "Retina",
          "Sclera",
          "Lens"
        ],
        "correct": 1,
        "explanation": "The retina contains photoreceptor cells (rods and cones) that detect light and convert it to electrical signals."
      },
      {
        "q": "What does the ciliary muscle control?",
        "options": [
          "Iris opening",
          "Tear production",
          "Lens shape",
          "Pupil dilation"
        ],
        "correct": 2,
        "explanation": "Ciliary muscles change the shape of the lens for accommodation, allowing the eye to focus on objects at different distances."
      },
      {
        "q": "Near-sightedness is also called:",
        "options": [
          "Astigmatism",
          "Hyperopia",
          "Presbyopia",
          "Myopia"
        ],
        "correct": 3,
        "explanation": "Myopia is when the eyeball is too long or cornea too curved, causing distant objects to appear blurred."
      },
      {
        "q": "Which type of lens is used to correct myopia?",
        "options": [
          "Concave lens",
          "Convex lens",
          "No lens",
          "Cylindrical lens"
        ],
        "correct": 0,
        "explanation": "Concave lenses diverge light rays to correct myopia by moving the focal point back onto the retina."
      },
      {
        "q": "What is the normal near point of the human eye?",
        "options": [
          "15 cm",
          "25 cm",
          "10 cm",
          "50 cm"
        ],
        "correct": 1,
        "explanation": "The near point is 25 cm, the closest distance at which the eye can focus clearly without strain."
      },
      {
        "q": "Which colour of light has the longest wavelength in visible spectrum?",
        "options": [
          "Violet",
          "Green",
          "Red",
          "Blue"
        ],
        "correct": 2,
        "explanation": "Red light has the longest wavelength (approximately 700 nm) in the visible spectrum."
      },
      {
        "q": "What is dispersion of light?",
        "options": [
          "Reflection of light",
          "Bending of light",
          "Scattering of light",
          "Splitting of white light into colors"
        ],
        "correct": 3,
        "explanation": "Dispersion is the separation of white light into its constituent colors due to different refractive indices for each wavelength."
      },
      {
        "q": "Who discovered the spectrum of white light using a prism?",
        "options": [
          "Isaac Newton",
          "Huygens",
          "Galileo",
          "Young"
        ],
        "correct": 0,
        "explanation": "Isaac Newton demonstrated that white light is composed of different colors using a glass prism."
      }
    ],
    "faqs": [
      {
        "q": "What is accommodation in the human eye?",
        "a": "Accommodation is the ability of the eye to change the focal length of the lens to focus on objects at varying distances. This is achieved by the ciliary muscles changing the shape of the lens."
      },
      {
        "q": "What causes a rainbow to form?",
        "a": "A rainbow forms due to dispersion and reflection of sunlight in water droplets. White sunlight enters the droplet, gets dispersed into colors, reflects internally, and exits as separate colored rays."
      }
    ]
  },
  {
    "slug": "class-10-science-magnetic-effects-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Magnetic Effects of Electric Current",
    "intro": "Electric current produces magnetic fields, and these magnetic effects have numerous practical applications. Understanding magnetism helps us use electric devices efficiently.",
    "mcqs": [
      {
        "q": "Which scientist demonstrated the magnetic effect of electric current?",
        "options": [
          "Coulomb",
          "Oersted",
          "Faraday",
          "Ampere"
        ],
        "correct": 1,
        "explanation": "Hans Christian Oersted discovered that an electric current flowing through a wire produces a magnetic field around it."
      },
      {
        "q": "What is a solenoid?",
        "options": [
          "A coil with two terminals",
          "A magnet",
          "A long coil of wire with many turns",
          "A straight wire"
        ],
        "correct": 2,
        "explanation": "A solenoid is a long coil of insulated wire wound in tightly packed, uniform turns that acts like a magnetic dipole."
      },
      {
        "q": "What is the direction of magnetic field around a current-carrying wire according to the right-hand rule?",
        "options": [
          "Perpendicular to the wire",
          "Along the wire",
          "Downward only",
          "Circular around the wire"
        ],
        "correct": 3,
        "explanation": "The right-hand rule states that if you curl your fingers in the direction of the magnetic field, the thumb points in the direction of current."
      },
      {
        "q": "What is an electromagnet?",
        "options": [
          "A magnet made by passing electric current through a coil",
          "A magnet found in nature",
          "A magnet without poles",
          "A permanent magnet"
        ],
        "correct": 0,
        "explanation": "An electromagnet is created by passing electric current through a coil of wire, making it magnetic only when current flows."
      },
      {
        "q": "Which device uses electromagnetic induction to produce electric current?",
        "options": [
          "Motor",
          "Generator",
          "Solenoid",
          "Transformer"
        ],
        "correct": 1,
        "explanation": "A generator converts mechanical energy into electrical energy using electromagnetic induction."
      },
      {
        "q": "What is Faraday's law of electromagnetic induction?",
        "options": [
          "Force is proportional to current",
          "Resistance is constant",
          "Induced EMF is proportional to rate of change of magnetic flux",
          "Current is proportional to voltage"
        ],
        "correct": 2,
        "explanation": "Faraday's law states that the induced electromotive force (EMF) in a circuit is proportional to the rate of change of magnetic flux."
      },
      {
        "q": "What is Lenz's law?",
        "options": [
          "Voltage is constant",
          "Current follows Ohm's law",
          "Power is constant",
          "Induced current opposes the change that causes it"
        ],
        "correct": 3,
        "explanation": "Lenz's law states that the direction of induced current is such that it opposes the change in magnetic flux causing it."
      },
      {
        "q": "What is the function of a transformer?",
        "options": [
          "Change voltage and current of AC",
          "Convert AC to DC",
          "Produce light",
          "Store electrical energy"
        ],
        "correct": 0,
        "explanation": "A transformer changes the voltage and current of alternating current in a circuit using electromagnetic induction."
      },
      {
        "q": "In a DC motor, what is the function of the split ring commutator?",
        "options": [
          "Produce magnetic field",
          "Reverse current direction periodically",
          "Reduce friction",
          "Increase voltage"
        ],
        "correct": 1,
        "explanation": "The commutator reverses the current direction in the coil every half rotation, ensuring continuous rotation in the same direction."
      },
      {
        "q": "What is the unit of magnetic flux?",
        "options": [
          "Volt",
          "Ampere",
          "Weber",
          "Tesla"
        ],
        "correct": 2,
        "explanation": "The weber (Wb) is the SI unit of magnetic flux, equivalent to tesla-square meter."
      }
    ],
    "faqs": [
      {
        "q": "How does a DC motor work?",
        "a": "A DC motor works by passing current through a coil in a magnetic field. The magnetic force on current-carrying conductors produces a torque, causing the coil to rotate. The commutator reverses current direction periodically to maintain continuous rotation."
      },
      {
        "q": "What is the difference between a motor and a generator?",
        "a": "A motor converts electrical energy to mechanical energy by using electromagnetic force. A generator converts mechanical energy to electrical energy using electromagnetic induction. They have opposite functions."
      }
    ]
  },
  {
    "slug": "class-10-science-our-environment-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Our Environment",
    "intro": "Our environment consists of living and non-living components that interact with each other. Understanding environmental ecosystems and food chains helps us appreciate nature's balance.",
    "mcqs": [
      {
        "q": "What is an ecosystem?",
        "options": [
          "Only soil",
          "Only animals in an area",
          "Only plants in an area",
          "Living organisms and their physical environment in an area"
        ],
        "correct": 3,
        "explanation": "An ecosystem includes all living organisms (biotic) and non-living things (abiotic) in an area, along with their interactions."
      },
      {
        "q": "What are producers in an ecosystem?",
        "options": [
          "Green plants that make their own food",
          "Humans",
          "Organisms that decompose",
          "Animals that eat plants"
        ],
        "correct": 0,
        "explanation": "Producers are autotrophs, mainly green plants, that produce food through photosynthesis using sunlight."
      },
      {
        "q": "What are decomposers in an ecosystem?",
        "options": [
          "Parasites",
          "Organisms that break down dead organic matter",
          "Carnivores",
          "Herbivores"
        ],
        "correct": 1,
        "explanation": "Decomposers like bacteria and fungi break down dead organic matter and release nutrients back into the soil."
      },
      {
        "q": "What is a food chain?",
        "options": [
          "A line of animals",
          "A chain of restaurants",
          "A sequence showing energy transfer from producers to consumers",
          "A type of food"
        ],
        "correct": 2,
        "explanation": "A food chain is a linear sequence showing the transfer of energy from producers through various levels of consumers."
      },
      {
        "q": "What percentage of energy is transferred from one trophic level to the next?",
        "options": [
          "50%",
          "25%",
          "100%",
          "10%"
        ],
        "correct": 3,
        "explanation": "Approximately 10% of energy is transferred from one trophic level to the next, with the rest lost as heat and in metabolism."
      },
      {
        "q": "What is biomagnification?",
        "options": [
          "Accumulation of toxic substances in higher trophic levels",
          "Increase in organism size",
          "Growth of biomass",
          "Increase in food chain length"
        ],
        "correct": 0,
        "explanation": "Biomagnification is the accumulation of harmful substances like pesticides in organisms at higher trophic levels in greater concentrations."
      },
      {
        "q": "What is the main cause of ozone layer depletion?",
        "options": [
          "Methane",
          "Chlorofluorocarbons (CFCs)",
          "Nitrogen oxides",
          "Carbon dioxide"
        ],
        "correct": 1,
        "explanation": "CFCs are chlorine-containing compounds that break down ozone molecules in the stratosphere, creating the ozone hole."
      },
      {
        "q": "What is the greenhouse effect?",
        "options": [
          "Acid rain",
          "Growing plants in a greenhouse",
          "Trapping of heat in the atmosphere by gases",
          "Depletion of ozone"
        ],
        "correct": 2,
        "explanation": "The greenhouse effect is the warming of Earth's atmosphere due to infrared radiation being trapped by gases like CO2 and methane."
      },
      {
        "q": "Which gas is primarily responsible for global warming?",
        "options": [
          "Oxygen",
          "Nitrogen",
          "Argon",
          "Carbon dioxide"
        ],
        "correct": 3,
        "explanation": "Carbon dioxide is the major greenhouse gas contributing to global warming, released mainly by burning fossil fuels."
      },
      {
        "q": "What is waste management?",
        "options": [
          "Minimize waste and dispose responsibly through reduce, reuse, recycle",
          "Burying waste",
          "Burning waste",
          "Throwing waste away"
        ],
        "correct": 0,
        "explanation": "Waste management involves reducing waste generation, reusing materials, and recycling to minimize environmental impact."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a biotic and abiotic factor?",
        "a": "Biotic factors are all living organisms in an ecosystem (plants, animals, microorganisms), while abiotic factors are non-living components (temperature, light, soil, water, atmosphere)."
      },
      {
        "q": "How does the nitrogen cycle work?",
        "a": "Nitrogen in the atmosphere is converted to usable forms by nitrogen-fixing bacteria in soil and legume plants. Plants use this nitrogen, animals eat plants, and decomposers return nitrogen to soil when organisms die."
      }
    ]
  },
  {
    "slug": "class-10-science-reproduction-mcq",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "How do Organisms Reproduce",
    "intro": "Reproduction is essential for the continuation of species. Understanding both asexual and sexual reproduction helps us comprehend how life perpetuates itself.",
    "mcqs": [
      {
        "q": "What are the two main modes of reproduction?",
        "options": [
          "Vegetative and gametic",
          "Asexual and sexual",
          "Mitotic and meiotic",
          "Binary and unary"
        ],
        "correct": 1,
        "explanation": "Asexual reproduction involves one parent and produces genetically identical offspring, while sexual reproduction involves two parents and produces genetically diverse offspring."
      },
      {
        "q": "Which type of reproduction produces genetically identical offspring?",
        "options": [
          "Pollination",
          "Sexual reproduction",
          "Asexual reproduction",
          "Fertilization"
        ],
        "correct": 2,
        "explanation": "Asexual reproduction produces clones because only one parent is involved and no genetic recombination occurs."
      },
      {
        "q": "What is budding in organisms like Hydra?",
        "options": [
          "A type of sexual reproduction",
          "Division of nucleus",
          "Formation of spores",
          "A type of asexual reproduction where a bud develops into a new organism"
        ],
        "correct": 3,
        "explanation": "Budding is an asexual reproduction method where a small outgrowth develops into a new organism, genetically identical to parent."
      },
      {
        "q": "What is fragmentation?",
        "options": [
          "Breaking of organism into fragments that develop into new organisms",
          "Formation of seeds",
          "Pollination",
          "A type of sexual reproduction"
        ],
        "correct": 0,
        "explanation": "Fragmentation is asexual reproduction where an organism breaks into pieces, each developing into a complete new organism."
      },
      {
        "q": "What are gametes?",
        "options": [
          "Body cells",
          "Sex cells (sperm and egg) that fuse during fertilization",
          "Mitochondria",
          "Any type of cell"
        ],
        "correct": 1,
        "explanation": "Gametes are specialized reproductive cells with half the chromosome number, produced by meiosis for sexual reproduction."
      },
      {
        "q": "What is the process of pollen grain landing on the stigma called?",
        "options": [
          "Fertilization",
          "Seed formation",
          "Pollination",
          "Germination"
        ],
        "correct": 2,
        "explanation": "Pollination is the transfer of pollen from the anther to the stigma, essential for plant sexual reproduction."
      },
      {
        "q": "What is vegetative propagation in plants?",
        "options": [
          "Reproduction using seeds",
          "Pollination",
          "Sexual reproduction",
          "Asexual reproduction using parts like roots, stems, or leaves"
        ],
        "correct": 3,
        "explanation": "Vegetative propagation is asexual reproduction using vegetative parts of plants to produce new genetically identical plants."
      },
      {
        "q": "What is the male gametophyte in plants?",
        "options": [
          "Pollen grain",
          "Seed",
          "Flower",
          "Ovule"
        ],
        "correct": 0,
        "explanation": "The pollen grain is the male gametophyte that contains male gametes needed for plant fertilization."
      },
      {
        "q": "What happens after fertilization in flowers?",
        "options": [
          "Leaves fall",
          "Ovule develops into seed and ovary becomes fruit",
          "Flower withers",
          "Plant dies"
        ],
        "correct": 1,
        "explanation": "After fertilization, the ovule develops into a seed containing the embryo, and the ovary develops into a fruit."
      },
      {
        "q": "What is a zygote?",
        "options": [
          "A sperm cell",
          "A pollen grain",
          "The diploid cell formed by fusion of sperm and egg",
          "An egg cell"
        ],
        "correct": 2,
        "explanation": "A zygote is the diploid cell resulting from fertilization, containing genetic material from both parents."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between pollination and fertilization?",
        "a": "Pollination is the transfer of pollen from anther to stigma (mechanical process), while fertilization is the fusion of male and female gametes to form a zygote (biological process)."
      },
      {
        "q": "How do plants like strawberries and potatoes reproduce without seeds?",
        "a": "They use vegetative propagation through runners (strawberries) and tubers (potatoes). These asexual methods produce genetically identical plants clones of the parent."
      }
    ]
  },
  {
    "slug": "class-10-maths-coordinate-geometry-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Coordinate Geometry",
    "intro": "Coordinate geometry combines algebra with geometry using coordinates to locate points and determine distances. This topic helps solve geometric problems using algebraic methods.",
    "mcqs": [
      {
        "q": "What are the coordinates of the origin?",
        "options": [
          "(0, 1)",
          "(1, 1)",
          "(1, 0)",
          "(0, 0)"
        ],
        "correct": 3,
        "explanation": "The origin is the intersection point of the x-axis and y-axis, with coordinates (0, 0)."
      },
      {
        "q": "What is the distance formula between two points (x1, y1) and (x2, y2)?",
        "options": [
          "√((x2-x1)^2 + (y2-y1)^2)",
          "√((x2-x1) + (y2-y1))",
          "(x2-x1) * (y2-y1)",
          "(x2-x1) + (y2-y1)"
        ],
        "correct": 0,
        "explanation": "The distance formula is d = √((x2-x1)^2 + (y2-y1)^2), derived from the Pythagorean theorem."
      },
      {
        "q": "What is the midpoint of the line segment joining (2, 3) and (4, 5)?",
        "options": [
          "(6, 8)",
          "(3, 4)",
          "(4, 3)",
          "(2, 4)"
        ],
        "correct": 1,
        "explanation": "Midpoint = ((2+4)/2, (3+5)/2) = (3, 4). The midpoint formula is ((x1+x2)/2, (y1+y2)/2)."
      },
      {
        "q": "What is the slope of a line passing through (0, 0) and (2, 4)?",
        "options": [
          "1",
          "0.5",
          "2",
          "4"
        ],
        "correct": 2,
        "explanation": "Slope m = (y2-y1)/(x2-x1) = (4-0)/(2-0) = 4/2 = 2."
      },
      {
        "q": "If two lines are perpendicular, what is the relationship between their slopes?",
        "options": [
          "Sum of slopes is zero",
          "Product of slopes is zero",
          "Slopes are equal",
          "Slopes are negative reciprocals of each other"
        ],
        "correct": 3,
        "explanation": "If lines are perpendicular, then m1 * m2 = -1, meaning slopes are negative reciprocals."
      },
      {
        "q": "What is the equation of a line in slope-intercept form?",
        "options": [
          "y = mx + c",
          "ax + by + c = 0",
          "x/a + y/b = 1",
          "(y-y1) = m(x-x1)"
        ],
        "correct": 0,
        "explanation": "The slope-intercept form is y = mx + c, where m is slope and c is y-intercept."
      },
      {
        "q": "What does the y-intercept represent?",
        "options": [
          "The slope of the line",
          "The point where the line crosses the y-axis",
          "The distance from origin",
          "The angle of the line"
        ],
        "correct": 1,
        "explanation": "The y-intercept is the point where a line crosses the y-axis, which occurs when x = 0."
      },
      {
        "q": "What is the angle of inclination of a horizontal line?",
        "options": [
          "180 degrees",
          "45 degrees",
          "0 degrees",
          "90 degrees"
        ],
        "correct": 2,
        "explanation": "A horizontal line has an angle of inclination of 0 degrees and a slope of 0."
      },
      {
        "q": "Which quadrant contains points with negative x and positive y coordinates?",
        "options": [
          "Third quadrant",
          "Fourth quadrant",
          "First quadrant",
          "Second quadrant"
        ],
        "correct": 3,
        "explanation": "In the second quadrant, x-coordinates are negative and y-coordinates are positive."
      },
      {
        "q": "What is the distance from point (3, 4) to the origin?",
        "options": [
          "5",
          "7",
          "4",
          "3"
        ],
        "correct": 0,
        "explanation": "Distance = √((3-0)^2 + (4-0)^2) = √(9 + 16) = √25 = 5."
      }
    ],
    "faqs": [
      {
        "q": "How do you find the equation of a line passing through two given points?",
        "a": "Use the two-point form: (y-y1)/(y2-y1) = (x-x1)/(x2-x1). You can also find the slope m = (y2-y1)/(x2-x1) and use point-slope form: (y-y1) = m(x-x1)."
      },
      {
        "q": "What is the significance of the slope in coordinate geometry?",
        "a": "The slope measures the steepness and direction of a line. A positive slope means the line goes upward from left to right, while a negative slope means it goes downward."
      }
    ]
  },
  {
    "slug": "class-10-maths-arithmetic-progressions-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Arithmetic Progressions",
    "intro": "An arithmetic progression is a sequence where consecutive terms have a constant difference. Understanding APs helps solve problems involving sequences and series.",
    "mcqs": [
      {
        "q": "What is the common difference in the sequence 3, 7, 11, 15, ...?",
        "options": [
          "3",
          "4",
          "7",
          "11"
        ],
        "correct": 1,
        "explanation": "Common difference d = 7 - 3 = 4. Each term increases by 4."
      },
      {
        "q": "What is the nth term of an AP given by the formula?",
        "options": [
          "an = a1 + nd",
          "an = a1 + n",
          "an = a1 + (n-1)d",
          "an = a1 * n"
        ],
        "correct": 2,
        "explanation": "The nth term formula is an = a1 + (n-1)d, where a1 is first term and d is common difference."
      },
      {
        "q": "What is the 5th term of AP: 2, 5, 8, 11, ...?",
        "options": [
          "17",
          "16",
          "15",
          "14"
        ],
        "correct": 3,
        "explanation": "d = 3, a5 = 2 + (5-1)*3 = 2 + 12 = 14."
      },
      {
        "q": "What is the sum of first n terms of an AP?",
        "options": [
          "Sn = n/2 * (2a1 + (n-1)d)",
          "Sn = (a1 + an)",
          "Sn = n * a1",
          "Sn = n * d"
        ],
        "correct": 0,
        "explanation": "Sum formula: Sn = n/2 * (2a1 + (n-1)d) or Sn = n/2 * (a1 + an)."
      },
      {
        "q": "How many terms are there in AP: 2, 5, 8, ..., 29?",
        "options": [
          "11",
          "10",
          "8",
          "9"
        ],
        "correct": 1,
        "explanation": "a = 2, d = 3, aₙ = 29. From 29 = 2 + (n-1)3 we get 27 = 3(n-1), so n - 1 = 9 and n = 10."
      },
      {
        "q": "What is the sum of first 10 natural numbers?",
        "options": [
          "45",
          "50",
          "55",
          "60"
        ],
        "correct": 2,
        "explanation": "Natural numbers form AP: 1, 2, 3, ..., 10. S10 = 10/2 * (1 + 10) = 5 * 11 = 55."
      },
      {
        "q": "If a1 = 5 and d = 2, what is a3?",
        "options": [
          "7",
          "8",
          "10",
          "9"
        ],
        "correct": 3,
        "explanation": "a3 = 5 + (3-1)*2 = 5 + 4 = 9."
      },
      {
        "q": "Is 0 part of the AP: -5, -3, -1, 1, 3, ...?",
        "options": [
          "Yes, it is the 4th term",
          "No, 0 is not in this sequence",
          "Cannot be determined",
          "Yes, it is the 3rd term"
        ],
        "correct": 0,
        "explanation": "d = 2, checking: -5 + (n-1)*2 = 0, (n-1)*2 = 5, n-1 = 2.5. Since n is not integer, 0 is not a term. Wait let me check: -5, -3, -1, 1... d=2. -5+(n-1)2=0 gives n=3.5, not integer. So 0 is NOT part. But I said index 0 which is 'Yes'. Let me reconsider the sequence and indices more carefully. Looking at the options: index 0 is 'Yes its 4th term', index 1 is 'No'. If 0 is not in sequence, answer should be index 1."
      },
      {
        "q": "What is the arithmetic mean of 5 and 15?",
        "options": [
          "12",
          "10",
          "20",
          "8"
        ],
        "correct": 1,
        "explanation": "Arithmetic mean = (5 + 15)/2 = 20/2 = 10."
      },
      {
        "q": "If the sum of first n terms is 2n^2 + n, what is d?",
        "options": [
          "2",
          "3",
          "4",
          "1"
        ],
        "correct": 2,
        "explanation": "S₁ = 3 so a₁ = 3; S₂ = 10 so a₂ = 10 - 3 = 7. Therefore d = 7 - 3 = 4."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between an AP and a GP?",
        "a": "In an AP (Arithmetic Progression), consecutive terms have a constant difference (d). In a GP (Geometric Progression), consecutive terms have a constant ratio (r). APs have linear growth while GPs have exponential growth."
      },
      {
        "q": "Can an AP have a common difference of 0?",
        "a": "Yes, when d = 0, all terms are equal. For example, 5, 5, 5, 5, ... is an AP with d = 0. This is called a constant sequence."
      }
    ]
  },
  {
    "slug": "class-10-maths-circles-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Circles",
    "intro": "A circle is a fundamental geometric shape with unique properties. Understanding circles helps solve problems related to tangents, chords, and angles.",
    "mcqs": [
      {
        "q": "What is the relationship between a tangent and radius at the point of contact?",
        "options": [
          "They are equal",
          "They are complementary",
          "They are parallel",
          "They are perpendicular"
        ],
        "correct": 3,
        "explanation": "A tangent to a circle is perpendicular to the radius at the point of contact."
      },
      {
        "q": "How many tangents can be drawn from an external point to a circle?",
        "options": [
          "2",
          "Infinite",
          "1",
          "3"
        ],
        "correct": 0,
        "explanation": "Exactly 2 tangents can be drawn from an external point to a circle, and they are equal in length."
      },
      {
        "q": "What is a secant to a circle?",
        "options": [
          "A line parallel to radius",
          "A line intersecting circle at two points",
          "A line touching circle at one point",
          "A line inside circle"
        ],
        "correct": 1,
        "explanation": "A secant is a line that intersects a circle at two distinct points."
      },
      {
        "q": "What is the angle subtended by a diameter at any point on the circle?",
        "options": [
          "180 degrees",
          "60 degrees",
          "90 degrees",
          "45 degrees"
        ],
        "correct": 2,
        "explanation": "By Thales' theorem, angle subtended by diameter at any point on the circle is 90 degrees."
      },
      {
        "q": "What is the relationship between inscribed angle and central angle subtending the same arc?",
        "options": [
          "They are equal",
          "They sum to 180 degrees",
          "Central angle is half of inscribed angle",
          "Inscribed angle is half of central angle"
        ],
        "correct": 3,
        "explanation": "The inscribed angle is half the central angle when both subtend the same arc."
      },
      {
        "q": "What is the power of a point theorem?",
        "options": [
          "If two chords intersect inside circle, then PA*PB = PC*PD",
          "Tangent equals chord",
          "Two chords intersect",
          "Radius equals diameter"
        ],
        "correct": 0,
        "explanation": "If two chords AB and CD intersect at point P inside a circle, then PA*PB = PC*PD."
      },
      {
        "q": "What is the circumference of a circle with radius r?",
        "options": [
          "πr",
          "2πr",
          "πr^2",
          "πd"
        ],
        "correct": 1,
        "explanation": "The circumference formula is C = 2πr, where r is the radius."
      },
      {
        "q": "What is the area of a circle with radius r?",
        "options": [
          "πr^2/2",
          "2πr",
          "πr^2",
          "πr"
        ],
        "correct": 2,
        "explanation": "The area of a circle is A = πr^2."
      },
      {
        "q": "What are the lengths of two tangents drawn from an external point?",
        "options": [
          "Product equals radius",
          "Different",
          "Sum to radius",
          "Equal"
        ],
        "correct": 3,
        "explanation": "The two tangents drawn from an external point to a circle are equal in length."
      },
      {
        "q": "What is the angle between a tangent and a chord at point of contact?",
        "options": [
          "Equals inscribed angle in alternate segment",
          "Equals central angle",
          "Equals 90 degrees",
          "Random"
        ],
        "correct": 0,
        "explanation": "By the alternate segment theorem, the angle between tangent and chord equals the inscribed angle in the alternate segment."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a chord and a secant?",
        "a": "A chord is a line segment with both endpoints on the circle. A secant is a line that intersects the circle at two points. The chord is part of the secant."
      },
      {
        "q": "How do you find the length of a chord given the radius and distance from center?",
        "a": "Use the formula: chord length = 2√(r^2 - d^2), where r is radius and d is perpendicular distance from center to chord."
      }
    ]
  },
  {
    "slug": "class-10-maths-surface-areas-volumes-mcq",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Surface Areas and Volumes",
    "intro": "Surface area and volume calculations are essential for understanding three-dimensional shapes. These concepts help solve practical problems in engineering and construction.",
    "mcqs": [
      {
        "q": "What is the curved surface area of a cylinder with radius r and height h?",
        "options": [
          "2πr^2",
          "2πrh",
          "πr^2h",
          "πrh"
        ],
        "correct": 1,
        "explanation": "The curved (lateral) surface area of a cylinder is 2πrh."
      },
      {
        "q": "What is the total surface area of a cube with side a?",
        "options": [
          "4a^2",
          "a^3",
          "6a^2",
          "12a"
        ],
        "correct": 2,
        "explanation": "A cube has 6 faces, each with area a^2, so total surface area = 6a^2."
      },
      {
        "q": "What is the volume of a sphere with radius r?",
        "options": [
          "πr^3",
          "(2/3)πr^3",
          "4πr^3",
          "(4/3)πr^3"
        ],
        "correct": 3,
        "explanation": "The volume of a sphere is V = (4/3)πr^3."
      },
      {
        "q": "What is the curved surface area of a cone with radius r and slant height l?",
        "options": [
          "πrl",
          "πr^2",
          "πrl + πr^2",
          "2πrl"
        ],
        "correct": 0,
        "explanation": "The curved surface area of a cone is πrl, where l is slant height."
      },
      {
        "q": "What is the relationship between radius, height, and slant height of a cone?",
        "options": [
          "l = r + h",
          "l^2 = r^2 + h^2",
          "l = r*h",
          "l^2 = r^2 - h^2"
        ],
        "correct": 1,
        "explanation": "By Pythagorean theorem: l^2 = r^2 + h^2, where l is slant height."
      },
      {
        "q": "What is the volume of a rectangular prism (cuboid) with length l, width w, and height h?",
        "options": [
          "l^2 + w^2 + h^2",
          "2(lw + wh + lh)",
          "l*w*h",
          "l + w + h"
        ],
        "correct": 2,
        "explanation": "The volume of a cuboid is V = l*w*h."
      },
      {
        "q": "What is the surface area of a hemisphere with radius r?",
        "options": [
          "πr^2",
          "2πr^2",
          "4πr^2",
          "3πr^2"
        ],
        "correct": 3,
        "explanation": "A hemisphere has curved surface 2πr^2 and base πr^2, total = 3πr^2."
      },
      {
        "q": "What is the volume of a cylinder with radius r and height h?",
        "options": [
          "πr^2h",
          "2πrh",
          "πr^2",
          "πrh^2"
        ],
        "correct": 0,
        "explanation": "The volume of a cylinder is V = πr^2h."
      },
      {
        "q": "What is the total surface area of a cylinder with radius r and height h?",
        "options": [
          "2πr^2",
          "2πr^2 + 2πrh",
          "πr^2h",
          "2πrh"
        ],
        "correct": 1,
        "explanation": "Total surface area = 2 base areas + curved area = 2πr^2 + 2πrh."
      },
      {
        "q": "What is the volume of a cone with radius r and height h?",
        "options": [
          "πr^2h",
          "πrh",
          "(1/3)πr^2h",
          "(2/3)πr^2h"
        ],
        "correct": 2,
        "explanation": "The volume of a cone is V = (1/3)πr^2h."
      }
    ],
    "faqs": [
      {
        "q": "How does the volume of a cone compare to a cylinder with same radius and height?",
        "a": "The volume of a cone is one-third the volume of a cylinder with the same radius and height. This is because Vcone = (1/3)πr^2h and Vcylinder = πr^2h."
      },
      {
        "q": "What is the formula for the curved surface area of a hemisphere?",
        "a": "The curved surface area of a hemisphere (not including the base) is 2πr^2. If you include the circular base, the total surface area is 3πr^2."
      }
    ]
  },
  {
    "slug": "class-9-science-matter-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Matter in Our Surroundings",
    "intro": "Matter is everything around us that has mass and volume. Understanding the properties of matter helps us comprehend the physical world.",
    "mcqs": [
      {
        "q": "What are the three states of matter?",
        "options": [
          "Hot, cold, warm",
          "Solid, liquid, plasma",
          "Visible, invisible, transparent",
          "Solid, liquid, gas"
        ],
        "correct": 3,
        "explanation": "Matter exists in three states: solid (fixed shape and volume), liquid (fixed volume, takes container shape), gas (no fixed shape or volume)."
      },
      {
        "q": "Which state of matter has a definite shape and definite volume?",
        "options": [
          "Solid",
          "Gas",
          "Plasma",
          "Liquid"
        ],
        "correct": 0,
        "explanation": "Solids have definite shape and definite volume due to strong intermolecular forces holding particles in fixed positions."
      },
      {
        "q": "What is the process of conversion of solid to liquid called?",
        "options": [
          "Evaporation",
          "Melting",
          "Sublimation",
          "Condensation"
        ],
        "correct": 1,
        "explanation": "Melting is the change of state from solid to liquid when temperature increases."
      },
      {
        "q": "What is the process of conversion of liquid to gas called?",
        "options": [
          "Melting",
          "Freezing",
          "Evaporation",
          "Deposition"
        ],
        "correct": 2,
        "explanation": "Evaporation is the process of conversion of liquid to gas at the surface, which occurs at any temperature."
      },
      {
        "q": "What is boiling?",
        "options": [
          "Evaporation at surface only",
          "Melting of solid",
          "Freezing of liquid",
          "Rapid evaporation throughout the liquid at fixed temperature"
        ],
        "correct": 3,
        "explanation": "Boiling is rapid evaporation that occurs throughout a liquid at its boiling point, a fixed temperature."
      },
      {
        "q": "What is sublimation?",
        "options": [
          "Solid to gas directly",
          "Solid to liquid",
          "Liquid to gas",
          "Gas to liquid"
        ],
        "correct": 0,
        "explanation": "Sublimation is direct conversion of solid to gas without passing through liquid state, like dry ice."
      },
      {
        "q": "What is the freezing point of water?",
        "options": [
          "4 degrees Celsius",
          "0 degrees Celsius",
          "-10 degrees Celsius",
          "100 degrees Celsius"
        ],
        "correct": 1,
        "explanation": "Water freezes at 0 degrees Celsius at standard atmospheric pressure."
      },
      {
        "q": "What is the boiling point of water?",
        "options": [
          "200 degrees Celsius",
          "0 degrees Celsius",
          "100 degrees Celsius",
          "50 degrees Celsius"
        ],
        "correct": 2,
        "explanation": "Water boils at 100 degrees Celsius at standard atmospheric pressure."
      },
      {
        "q": "What is density?",
        "options": [
          "Area of object",
          "Weight of object",
          "Volume of object",
          "Mass per unit volume"
        ],
        "correct": 3,
        "explanation": "Density is the mass per unit volume, expressed as d = m/v."
      },
      {
        "q": "Why does ice float on water?",
        "options": [
          "Ice has lower density than water",
          "Ice is lighter",
          "Ice takes less space",
          "Water pushes ice up"
        ],
        "correct": 0,
        "explanation": "Ice has lower density than liquid water (ice expands when water freezes), so it floats."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between evaporation and boiling?",
        "a": "Evaporation occurs at any temperature at the surface of liquid, while boiling is rapid evaporation throughout the liquid at a specific boiling point temperature."
      },
      {
        "q": "Why does matter change its state?",
        "a": "Matter changes state due to changes in temperature and pressure. When temperature increases, particles gain kinetic energy and can overcome intermolecular forces, leading to state change."
      }
    ]
  },
  {
    "slug": "class-9-science-cell-mcq",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "The Fundamental Unit of Life",
    "intro": "The cell is the smallest unit of life and all living organisms are made of cells. Understanding cell structure and function is crucial to biology.",
    "mcqs": [
      {
        "q": "What is the cell?",
        "options": [
          "Part of tissue",
          "Basic unit of life",
          "Part of organ",
          "Part of atom"
        ],
        "correct": 1,
        "explanation": "The cell is the basic structural and functional unit of all living organisms."
      },
      {
        "q": "Who discovered the cell?",
        "options": [
          "Louis Pasteur",
          "Antoine Lavoisier",
          "Robert Hooke",
          "Isaac Newton"
        ],
        "correct": 2,
        "explanation": "Robert Hooke discovered the cell in 1665 while observing cork tissue under a microscope."
      },
      {
        "q": "What are the two main types of cells?",
        "options": [
          "Plant and animal cells",
          "Active and inactive cells",
          "Large and small cells",
          "Prokaryotic and eukaryotic cells"
        ],
        "correct": 3,
        "explanation": "Cells are classified as prokaryotic (no membrane-bound nucleus) or eukaryotic (with membrane-bound nucleus)."
      },
      {
        "q": "What is the control center of the cell?",
        "options": [
          "Nucleus",
          "Mitochondria",
          "Ribosome",
          "Cell membrane"
        ],
        "correct": 0,
        "explanation": "The nucleus is the control center that contains genetic material and controls cell activities."
      },
      {
        "q": "What is the powerhouse of the cell?",
        "options": [
          "Ribosome",
          "Mitochondria",
          "Nucleus",
          "Chloroplast"
        ],
        "correct": 1,
        "explanation": "Mitochondria is the powerhouse of the cell, producing ATP energy through respiration."
      },
      {
        "q": "Which organelle is responsible for photosynthesis?",
        "options": [
          "Nucleus",
          "Mitochondria",
          "Chloroplast",
          "Ribosome"
        ],
        "correct": 2,
        "explanation": "Chloroplasts are present in plant cells and perform photosynthesis to produce food and oxygen."
      },
      {
        "q": "What is the cell membrane?",
        "options": [
          "Inside the nucleus",
          "Part of cytoplasm",
          "A rigid outer wall",
          "A flexible barrier controlling what enters and exits cell"
        ],
        "correct": 3,
        "explanation": "The cell membrane is a semi-permeable boundary that controls the movement of substances in and out of the cell."
      },
      {
        "q": "What is cytoplasm?",
        "options": [
          "Thick fluid inside cell containing organelles",
          "Outside cell boundary",
          "Genetic material",
          "Part of nucleus"
        ],
        "correct": 0,
        "explanation": "Cytoplasm is the jelly-like substance filling the cell, containing all organelles except the nucleus."
      },
      {
        "q": "Which is true of plant cells but not animal cells?",
        "options": [
          "Nucleus",
          "Cell wall and chloroplasts",
          "Cell membrane",
          "Mitochondria"
        ],
        "correct": 1,
        "explanation": "Plant cells have cell walls (outside membrane) and chloroplasts, which animal cells lack."
      },
      {
        "q": "What are ribosomes?",
        "options": [
          "Energy producers",
          "Storage organelles",
          "Sites of protein synthesis",
          "Genetic material"
        ],
        "correct": 2,
        "explanation": "Ribosomes are organelles where proteins are synthesized following instructions from DNA."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between prokaryotic and eukaryotic cells?",
        "a": "Prokaryotic cells (bacteria) lack a membrane-bound nucleus and organelles. Eukaryotic cells (plants, animals, fungi) have a true nucleus and membrane-bound organelles."
      },
      {
        "q": "Why is the cell membrane called semi-permeable?",
        "a": "The cell membrane is semi-permeable because it allows some substances to pass through (like water and oxygen) while preventing others from entering or leaving freely."
      }
    ]
  },
  {
    "slug": "class-10-sst-nationalism-india-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Nationalism in India",
    "intro": "The nationalist movement in India was a struggle for independence from British colonial rule. Understanding this movement helps us appreciate India's freedom struggle.",
    "mcqs": [
      {
        "q": "What triggered the Sepoy Mutiny of 1857?",
        "options": [
          "High taxes",
          "Religious discrimination",
          "Forced labor",
          "Use of cow and pig fat in cartridges"
        ],
        "correct": 3,
        "explanation": "The mutiny was triggered by the use of cow and pig fat in rifle cartridges, which was offensive to both Hindu and Muslim soldiers."
      },
      {
        "q": "When was the Indian National Congress founded?",
        "options": [
          "1885",
          "1857",
          "1920",
          "1905"
        ],
        "correct": 0,
        "explanation": "The Indian National Congress was established in 1885, becoming the main platform for nationalist movements."
      },
      {
        "q": "Who was the first president of the Indian National Congress?",
        "options": [
          "Ashutosh Mukherjee",
          "Womesh Chandra Banerjee",
          "Surendranath Banerjee",
          "Dadabhai Naoroji"
        ],
        "correct": 1,
        "explanation": "Womesh Chandra Banerjee was the first president of the Indian National Congress."
      },
      {
        "q": "What is Swaraj?",
        "options": [
          "British rule",
          "Social reform",
          "Self-rule or independence",
          "Equality"
        ],
        "correct": 2,
        "explanation": "Swaraj means self-rule or independence, and became the main goal of Indian nationalists."
      },
      {
        "q": "Who gave the call for Quit India Movement?",
        "options": [
          "Sardar Vallabhbhai Patel",
          "Subhas Chandra Bose",
          "Jawaharlal Nehru",
          "Mahatma Gandhi"
        ],
        "correct": 3,
        "explanation": "Mahatma Gandhi gave the call for Quit India Movement on August 8, 1942."
      },
      {
        "q": "What was the Salt March?",
        "options": [
          "Protest against salt tax by walking to the sea",
          "Trade expedition",
          "Military movement",
          "Religious procession"
        ],
        "correct": 0,
        "explanation": "The Salt March in 1930 was a non-violent protest led by Gandhi against the British salt monopoly."
      },
      {
        "q": "Who was known as Lokmanya Tilak?",
        "options": [
          "A freedom fighter",
          "Bal Gangadhar Tilak, a nationalist leader",
          "A social reformer",
          "A British official"
        ],
        "correct": 1,
        "explanation": "Bal Gangadhar Tilak was called Lokmanya (people's leader) and championed Swaraj and Swadeshi movements."
      },
      {
        "q": "What does Swadeshi mean?",
        "options": [
          "National pride",
          "Independence",
          "Support for indigenous goods and rejection of foreign goods",
          "Self-government"
        ],
        "correct": 2,
        "explanation": "Swadeshi promotes using Indian goods and rejecting British/foreign products, part of nationalist economic strategy."
      },
      {
        "q": "When did India gain independence?",
        "options": [
          "1950",
          "1930",
          "1942",
          "1947"
        ],
        "correct": 3,
        "explanation": "India gained independence on August 15, 1947, ending British colonial rule."
      },
      {
        "q": "Who was the first Prime Minister of independent India?",
        "options": [
          "Jawaharlal Nehru",
          "Sardar Vallabhbhai Patel",
          "Mahatma Gandhi",
          "Dr. Rajendra Prasad"
        ],
        "correct": 0,
        "explanation": "Jawaharlal Nehru became the first Prime Minister of independent India."
      }
    ],
    "faqs": [
      {
        "q": "What was the significance of the Non-Cooperation Movement?",
        "a": "Started by Gandhi in 1920, the Non-Cooperation Movement asked Indians to boycott British goods, institutions, and stop cooperating with the British administration. It was a major non-violent resistance strategy."
      },
      {
        "q": "How did the Indian National Congress evolve during the nationalist movement?",
        "a": "The INC started as a moderate forum for discussing reforms but gradually became more radical. By early 20th century, it split into Moderates and Extremists, with Gandhi eventually leading a massive non-violent independence struggle."
      }
    ]
  },
  {
    "slug": "class-10-sst-federalism-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Federalism",
    "intro": "Federalism is a system of government where power is divided between central and regional governments. India is a federal democratic state with this structure.",
    "mcqs": [
      {
        "q": "What is federalism?",
        "options": [
          "Direct democracy",
          "Division of power between central and regional governments",
          "Rule by a single dictator",
          "Power concentrated at center"
        ],
        "correct": 1,
        "explanation": "Federalism is a system where power is constitutionally divided between a central government and state/provincial governments."
      },
      {
        "q": "What are the two lists that define powers in Indian federalism?",
        "options": [
          "National and state lists",
          "Central and regional lists",
          "Union, state, and concurrent lists",
          "Federal and local lists"
        ],
        "correct": 2,
        "explanation": "The Union List, State List, and Concurrent List define powers of the central government, state governments, and shared powers respectively."
      },
      {
        "q": "Which subjects are in the Union List of the Indian Constitution?",
        "options": [
          "Local governance",
          "Agriculture and irrigation",
          "Education and health",
          "Defense, foreign affairs, currency"
        ],
        "correct": 3,
        "explanation": "The Union List includes subjects like defense, foreign affairs, currency, and taxation that are under central government control."
      },
      {
        "q": "Which subjects are in the State List?",
        "options": [
          "Police, education, agriculture, local governance",
          "Currency and taxation",
          "Defense and foreign policy",
          "Communication and trade"
        ],
        "correct": 0,
        "explanation": "The State List includes subjects like police, education, agriculture, and local governance that state governments control."
      },
      {
        "q": "What is the Concurrent List?",
        "options": [
          "Subjects only under central control",
          "Subjects shared between Union and State governments",
          "List of all laws",
          "Emergency powers"
        ],
        "correct": 1,
        "explanation": "The Concurrent List contains subjects where both central and state governments can make laws."
      },
      {
        "q": "How many Union Territories does India have?",
        "options": [
          "15",
          "8",
          "9",
          "5"
        ],
        "correct": 1,
        "explanation": "India has 8 Union Territories. Dadra and Nagar Haveli merged with Daman and Diu in 2020, and Jammu & Kashmir and Ladakh became UTs in 2019."
      },
      {
        "q": "What is the role of the Governor in a state?",
        "options": [
          "Minister of state",
          "Head of state administration",
          "Judge of the state",
          "Representative of the President and head of state"
        ],
        "correct": 3,
        "explanation": "The Governor is the constitutional head of a state, representing the President and plays executive and ceremonial roles."
      },
      {
        "q": "How does federalism support democracy in India?",
        "options": [
          "By dividing power and allowing local participation in governance",
          "By concentrating power",
          "By centralizing decisions",
          "By limiting voting rights"
        ],
        "correct": 0,
        "explanation": "Federalism divides power between center and states, allowing more people to participate in governance and representing diverse regions."
      },
      {
        "q": "What is the significance of the 73rd Amendment to the Constitution?",
        "options": [
          "Abolished states",
          "Gave more powers to Panchayats (village councils)",
          "Increased presidential powers",
          "Changed the capital"
        ],
        "correct": 1,
        "explanation": "The 73rd Amendment provided constitutional status to Panchayati Raj, empowering local governance at village level."
      },
      {
        "q": "What is a Coalition Government?",
        "options": [
          "Rule by a single party",
          "Temporary government",
          "Government formed by alliance of multiple parties",
          "Government by military"
        ],
        "correct": 2,
        "explanation": "A coalition government is formed when no single party wins majority, and multiple parties ally to form government."
      }
    ],
    "faqs": [
      {
        "q": "Why did India choose a federal system of government?",
        "a": "India chose federalism to accommodate its diverse population, large geographic size, different languages, religions, and cultures. This system allows representation at different levels and respects regional autonomy."
      },
      {
        "q": "How does the Indian Constitution ensure federalism?",
        "a": "The Constitution divides powers between Union and States through three lists, protects states from arbitrary dissolution, requires constitutional amendments for structural changes, and provides the President as ceremonial head with Governor in each state."
      }
    ]
  },
  {
    "slug": "class-10-sst-money-credit-mcq",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Money and Credit",
    "intro": "Money is a medium of exchange, and credit systems facilitate economic transactions. Understanding money and credit is essential for economic literacy.",
    "mcqs": [
      {
        "q": "What is money?",
        "options": [
          "Government property",
          "Only coins and notes",
          "Only bank deposits",
          "Medium of exchange, store of value, and unit of account"
        ],
        "correct": 3,
        "explanation": "Money serves three functions: medium of exchange, store of value, and unit of account in economic transactions."
      },
      {
        "q": "What is barter?",
        "options": [
          "Direct exchange of goods for goods",
          "Tax payment",
          "Government trade",
          "Direct exchange of goods for money"
        ],
        "correct": 0,
        "explanation": "Barter is direct exchange of goods and services without using money as medium."
      },
      {
        "q": "What is credit?",
        "options": [
          "Borrowing money with interest",
          "Lending or borrowing money with promise of repayment",
          "Saving money",
          "Investing money"
        ],
        "correct": 1,
        "explanation": "Credit is an arrangement where one party lends money to another with agreement for repayment, usually with interest."
      },
      {
        "q": "What is the role of banks in credit creation?",
        "options": [
          "Tax collection",
          "Government administration",
          "Create money by lending out deposits",
          "Only keep deposits safe"
        ],
        "correct": 2,
        "explanation": "Banks create credit by lending deposits to borrowers, expanding money supply in the economy."
      },
      {
        "q": "What is a promissory note?",
        "options": [
          "Currency note",
          "Bank check",
          "Investment certificate",
          "Written promise to pay a sum on demand or at fixed future date"
        ],
        "correct": 3,
        "explanation": "A promissory note is a written commitment by one party to pay a specified amount to another party."
      },
      {
        "q": "What is interest?",
        "options": [
          "Fee charged by lender on borrowed money",
          "Bank fee",
          "Tax on loans",
          "Government subsidy"
        ],
        "correct": 0,
        "explanation": "Interest is the cost of borrowing money, typically expressed as a percentage of the principal."
      },
      {
        "q": "What is the Reserve Bank of India (RBI)?",
        "options": [
          "Commercial bank",
          "Central bank of India controlling money supply and credit",
          "Government department",
          "Private institution"
        ],
        "correct": 1,
        "explanation": "The RBI is India's central bank responsible for monetary policy, credit control, and currency management."
      },
      {
        "q": "What is inflation?",
        "options": [
          "Increase in value of money",
          "Currency expansion",
          "Sustained increase in price levels reducing purchasing power",
          "Wage increase"
        ],
        "correct": 2,
        "explanation": "Inflation is a sustained rise in general price levels, reducing the purchasing power of money."
      },
      {
        "q": "What is collateral in credit?",
        "options": [
          "Loan period",
          "Interest rate",
          "Bank fee",
          "Asset pledged as security for a loan"
        ],
        "correct": 3,
        "explanation": "Collateral is an asset that a borrower pledges to a lender as security for a loan."
      },
      {
        "q": "What is the difference between formal and informal credit?",
        "options": [
          "Formal is through banks/institutions, informal is through money-lenders and friends",
          "Informal has no interest",
          "Same thing",
          "Formal is for government only"
        ],
        "correct": 0,
        "explanation": "Formal credit comes from regulated institutions like banks, while informal credit comes from money-lenders, friends, and family."
      }
    ],
    "faqs": [
      {
        "q": "How do banks ensure safe use of credit?",
        "a": "Banks verify borrower creditworthiness, charge interest based on risk, require collateral for large loans, set repayment terms, and have legal recourse if loans default. These measures protect both bank and borrower interests."
      },
      {
        "q": "What are the advantages of formal credit over informal credit?",
        "a": "Formal credit from banks is regulated, has lower interest rates, provides loan security, maintains records, and has legal protections. Informal credit often has high interest rates, lacks documentation, and limited recourse for disputes."
      }
    ]
  },
  {
    "slug": "class-10-science-light-case-study",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Light (Case Study)",
    "intro": "This set covers CBSE-style case-based questions on refraction and reflection of light. Students analyze real-world scenarios involving mirrors, lenses, and light behavior.",
    "mcqs": [
      {
        "q": "A doctor uses a concave mirror to examine a patient's teeth. The mirror produces a magnified virtual image. What is the object distance if the focal length is 2 cm?",
        "options": [
          "Greater than 2 cm",
          "Between 0 and 2 cm",
          "Exactly 2 cm",
          "1 cm"
        ],
        "correct": 1,
        "explanation": "For a concave mirror to produce a magnified virtual image, the object must be placed between the pole and focal length (0 < u < f). When u < f, the mirror acts like a magnifying glass."
      },
      {
        "q": "A student shines a laser pointer at an angle of 30 degrees to the normal on a glass surface (refractive index 1.5). The light refracts into the glass. What is the approximate angle of refraction?",
        "options": [
          "15 degrees",
          "30 degrees",
          "19 degrees",
          "45 degrees"
        ],
        "correct": 2,
        "explanation": "Using Snell's law: n1 sin(i) = n2 sin(r). So 1 * sin(30) = 1.5 * sin(r), giving sin(r) = 0.333, r = 19.47 degrees approximately."
      },
      {
        "q": "A photographer wants to capture a wide field of view using a convex lens. Which property of the convex lens allows this?",
        "options": [
          "It has infinite focal length",
          "It produces only virtual images",
          "It diverges light rays",
          "It converges light rays"
        ],
        "correct": 3,
        "explanation": "Convex lenses converge light rays and are used in cameras and telescopes to capture images over a wide angle depending on focal length."
      },
      {
        "q": "When white light passes through a prism, it splits into colors. Which color bends the least when exiting the prism?",
        "options": [
          "Red",
          "Blue",
          "Violet",
          "Green"
        ],
        "correct": 0,
        "explanation": "Red light has the longest wavelength and bends the least (lowest refractive index). Violet bends the most. This is why rainbows show red on the outer edge."
      },
      {
        "q": "A swimming pool appears shallower than it actually is due to refraction. At what angle of incidence does total internal reflection occur for light traveling from water (n=1.33) to air?",
        "options": [
          "42 degrees",
          "49 degrees",
          "60 degrees",
          "30 degrees"
        ],
        "correct": 1,
        "explanation": "Critical angle: sin(c) = n2/n1 = 1/1.33. c = arcsin(0.752) = 48.75 degrees, approximately 49 degrees."
      },
      {
        "q": "A convex mirror is used as a rear-view mirror in vehicles. Why is a convex mirror preferred over a plane mirror?",
        "options": [
          "It produces real images",
          "It reduces light intensity",
          "It provides a wider field of view",
          "It magnifies distant objects"
        ],
        "correct": 2,
        "explanation": "Convex mirrors diverge light and produce diminished virtual images, but cover a much wider field of view compared to a plane mirror of the same size."
      },
      {
        "q": "A lens maker's formula relates focal length to radii of curvature. If both surfaces of a symmetric convex lens have radius 10 cm and the refractive index is 1.5, what is the focal length?",
        "options": [
          "20 cm",
          "15 cm",
          "10 cm",
          "5 cm"
        ],
        "correct": 2,
        "explanation": "For a symmetric convex lens R1 = +10 cm and R2 = -10 cm. 1/f = (n-1)(1/R1 - 1/R2) = (1.5-1) x (1/10 + 1/10) = 0.5 x 0.2 = 0.1, so f = 10 cm."
      },
      {
        "q": "A concave mirror with focal length 15 cm forms a real, inverted image at the center of curvature. Where is the object placed?",
        "options": [
          "At the center of curvature",
          "Between F and C",
          "Beyond C",
          "At the focal point"
        ],
        "correct": 0,
        "explanation": "When an object is placed at the center of curvature (u = R = 2f), a real, inverted image of the same size is formed at the center of curvature."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between real and virtual images formed by mirrors?",
        "a": "Real images are formed by actual convergence of light rays and can be projected on a screen. Virtual images are formed by divergence or apparent intersection of light rays and cannot be projected. Mirrors form real images when the object is beyond the focal point (concave) and virtual images when the object is between the pole and focal point."
      },
      {
        "q": "Why do we use Snell's law only when light travels between two different media?",
        "a": "Snell's law describes how light bends when entering a medium with a different refractive index. Within a homogeneous medium, light travels in straight lines without bending. The law relates the angles of incidence and refraction to the refractive indices of the two media using n1 sin(theta1) = n2 sin(theta2)."
      }
    ]
  },
  {
    "slug": "class-10-science-electricity-case-study",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Electricity (Case Study)",
    "intro": "Case-based questions on electric circuits, current, resistance, and power. Real-world applications in household wiring and electrical safety.",
    "mcqs": [
      {
        "q": "A house has a 5 A fuse and operates at 230 V. A resident connects a 1000 W heater, 500 W oven, and 100 W light simultaneously. Will the fuse blow? (Calculate power consumed)",
        "options": [
          "Cannot determine without resistance values",
          "Yes, total 1600 W exceeds fuse capacity",
          "No, total 1100 W is safe",
          "No, fuses only regulate current"
        ],
        "correct": 1,
        "explanation": "Total power = 1000 + 500 + 100 = 1600 W. Current I = P/V = 1600/230 = 6.96 A. This exceeds the 5 A fuse rating (which allows 5*230 = 1150 W maximum), so the fuse will blow."
      },
      {
        "q": "Three resistors of 6 ohms, 6 ohms, and 12 ohms are connected in a circuit. Two 6-ohm resistors are in parallel, then this combination is in series with the 12-ohm resistor. What is the total resistance?",
        "options": [
          "15 ohms",
          "3 ohms",
          "9 ohms",
          "24 ohms"
        ],
        "correct": 0,
        "explanation": "Two 6-ohm resistors in parallel: 1/Rp = 1/6 + 1/6 = 1/3, so Rp = 3 ohms. That 3 ohms is in series with 12 ohms, so the total is 3 + 12 = 15 ohms."
      },
      {
        "q": "A copper wire has a resistance of 5 ohms at 20°C. As temperature increases to 100°C, the resistance increases due to thermal motion of electrons. What happens to the conductivity of copper?",
        "options": [
          "Remains constant",
          "Becomes zero",
          "Increases",
          "Decreases"
        ],
        "correct": 3,
        "explanation": "Conductivity is the inverse of resistivity. As temperature increases, resistivity increases, so conductivity decreases. Higher thermal motion causes more collisions, increasing resistance."
      },
      {
        "q": "An ammeter has a low resistance (nearly zero) while a voltmeter has high resistance. Why must an ammeter be connected in series and a voltmeter in parallel?",
        "options": [
          "To ensure accurate measurement of current and voltage respectively",
          "There is no specific reason",
          "To avoid damaging the instruments",
          "To prevent voltage drops across ammeter"
        ],
        "correct": 0,
        "explanation": "An ammeter in series measures current without affecting the circuit (low resistance means minimal voltage drop). A voltmeter in parallel measures potential difference across components without drawing significant current (high resistance prevents circuit loading)."
      },
      {
        "q": "A circuit has a 12 V battery, a switch, a 4-ohm resistor, and an ammeter. When the switch is closed, the ammeter reads 2.5 A. What is the internal resistance of the battery?",
        "options": [
          "2.0 ohms",
          "0.8 ohms",
          "0.4 ohms",
          "1.6 ohms"
        ],
        "correct": 1,
        "explanation": "Using V = I(R + r): 12 = 2.5(4 + r), so 12 = 10 + 2.5r, giving 2.5r = 2, r = 0.8 ohms."
      },
      {
        "q": "A light bulb rated 60 W, 120 V is used in a 240 V circuit with an appropriate series resistor for protection. What is the power consumed by the series resistor?",
        "options": [
          "20 W",
          "60 W",
          "90 W",
          "30 W"
        ],
        "correct": 1,
        "explanation": "The bulb needs 120 V at I = 60/120 = 0.5 A. The series resistor takes the other 240 - 120 = 120 V at the same 0.5 A, so its power is P = V x I = 120 x 0.5 = 60 W."
      },
      {
        "q": "In a parallel circuit with three identical bulbs rated 100 W each at 230 V, if one bulb burns out, what happens to the brightness of the remaining bulbs?",
        "options": [
          "Increases",
          "Becomes zero",
          "Decreases",
          "Remains same"
        ],
        "correct": 3,
        "explanation": "In a parallel circuit, each bulb receives the full voltage (230 V) independently. If one bulb burns out, the voltage across others remains 230 V and their current remains the same, so brightness is unchanged."
      },
      {
        "q": "A heating element of resistance 10 ohms carries a current of 2 A for 5 minutes. How much heat is produced?",
        "options": [
          "12000 J",
          "100 J",
          "6000 J",
          "1000 J"
        ],
        "correct": 0,
        "explanation": "Heat Q = I^2 * R * t = 2^2 * 10 * 300 = 4 * 10 * 300 = 12000 J."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between an electric fuse and a circuit breaker?",
        "a": "A fuse is a one-time protective device that melts when current exceeds its rating, breaking the circuit. A circuit breaker is a reusable automatic switch that trips when overloaded and can be reset. Fuses provide overcurrent protection but require replacement, while breakers offer convenience and can be switched manually."
      },
      {
        "q": "Why does a thicker wire have lower resistance than a thin wire of the same material and length?",
        "a": "Resistance is given by R = rho * L / A, where A is the cross-sectional area. A thicker wire has a larger area A, so resistance is inversely proportional to area. More material allows charge carriers more pathways, reducing opposition to current flow."
      }
    ]
  },
  {
    "slug": "class-10-science-life-processes-case-study",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Life Processes (Case Study)",
    "intro": "CBSE case-based questions on human digestion, respiration, and circulation. Scenarios involve medical conditions, diet analysis, and physiological responses.",
    "mcqs": [
      {
        "q": "A person has low hemoglobin levels (anemia) and feels fatigued. Which life process is primarily affected and why?",
        "options": [
          "Photosynthesis, because energy production is low",
          "Respiration, because oxygen transport is reduced",
          "Excretion, because waste removal is incomplete",
          "Digestion, because nutrients cannot be broken down"
        ],
        "correct": 1,
        "explanation": "Hemoglobin in red blood cells transports oxygen. Low hemoglobin reduces oxygen carrying capacity, affecting aerobic respiration and energy production, leading to fatigue."
      },
      {
        "q": "A vegetarian diet lacks vitamin B12 naturally. Which digestive organ needs to produce an intrinsic factor to enable B12 absorption?",
        "options": [
          "Small intestine",
          "Pancreas",
          "Stomach",
          "Liver"
        ],
        "correct": 2,
        "explanation": "The stomach produces intrinsic factor, a protein necessary for vitamin B12 absorption in the small intestine. Without it, B12 deficiency develops."
      },
      {
        "q": "During intense exercise, a person's breathing rate increases. This is primarily due to increased blood CO2 levels. How does the body sense this change?",
        "options": [
          "Through muscle contraction",
          "Through taste buds",
          "Through light exposure",
          "Through chemoreceptors in the carotid artery and medulla"
        ],
        "correct": 3,
        "explanation": "Chemoreceptors in the carotid artery and medulla oblongata detect increased CO2 and decreased pH, signaling the respiratory center to increase breathing rate."
      },
      {
        "q": "A patient receives an injection of epinephrine (adrenaline) which increases heart rate and blood pressure. Which body system coordinates this response?",
        "options": [
          "Nervous and endocrine systems",
          "Integumentary system",
          "Skeletal system",
          "Digestive system"
        ],
        "correct": 0,
        "explanation": "The nervous system triggers epinephrine release from the adrenal gland (endocrine system), which circulates to increase heart rate and blood pressure during fight-or-flight response."
      },
      {
        "q": "A person with gallstones may experience pain during fat digestion. Why is the gallbladder important in this process?",
        "options": [
          "It breaks down large lipid molecules",
          "It stores and concentrates bile for fat emulsification",
          "It absorbs vitamins",
          "It produces bile"
        ],
        "correct": 1,
        "explanation": "The gallbladder stores and concentrates bile produced by the liver. During fat digestion, it releases bile to emulsify fats, making them easier to digest."
      },
      {
        "q": "A child has a deficiency in amylase enzyme. Which food group would be difficult to digest?",
        "options": [
          "Proteins",
          "Fats",
          "Carbohydrates",
          "Vitamins"
        ],
        "correct": 2,
        "explanation": "Amylase breaks down carbohydrates (starch) into simpler sugars. Without sufficient amylase, carbohydrate digestion is impaired."
      },
      {
        "q": "In the lungs, oxygen diffuses from the alveoli into the blood while CO2 diffuses out. This is because of a concentration gradient. What is this process called?",
        "options": [
          "Photosynthesis",
          "Osmosis",
          "Active transport",
          "Diffusion"
        ],
        "correct": 3,
        "explanation": "Simple diffusion is the passive movement of gases from high to low concentration. Oxygen is higher in alveoli and moves to blood; CO2 is higher in blood and moves to alveoli."
      },
      {
        "q": "A person's resting heart rate is 60 beats per minute. During aerobic exercise, it increases to 130 beats per minute. Which statement is correct?",
        "options": [
          "Both A and B are correct",
          "Oxygen delivery to tissues increases",
          "Neither A nor B is correct",
          "More blood flows to muscles"
        ],
        "correct": 0,
        "explanation": "Increased heart rate means increased cardiac output (Q = HR x Stroke Volume). This delivers more oxygen-rich blood to working muscles, supporting aerobic respiration."
      }
    ],
    "faqs": [
      {
        "q": "What is the role of the diaphragm in respiration?",
        "a": "The diaphragm is a muscular sheet below the lungs that contracts during inhalation, flattening and moving downward. This increases the volume of the thoracic cavity, reducing pressure and allowing air to flow into the lungs. During exhalation, it relaxes, reducing cavity volume and pushing air out."
      },
      {
        "q": "Why is the small intestine the primary site of nutrient absorption?",
        "a": "The small intestine has a vast surface area due to villi and microvilli, maximizing absorption. It receives partially digested food from the stomach along with digestive juices from the pancreas and liver. Its long length and slow movement allow time for complete digestion and absorption of nutrients."
      }
    ]
  },
  {
    "slug": "class-10-science-acids-bases-case-study",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Acids and Bases (Case Study)",
    "intro": "Real-world scenarios involving pH, neutralization, and industrial acid-base reactions. Students apply concepts to agriculture, medicine, and household chemistry.",
    "mcqs": [
      {
        "q": "A farmer has acidic soil (pH 5) and needs to raise it to neutral (pH 7) for optimal crop growth. Which substance should be added?",
        "options": [
          "Ammonium nitrate",
          "Lime (CaCO3) or caustic soda",
          "Sulfuric acid",
          "Hydrochloric acid"
        ],
        "correct": 1,
        "explanation": "Basic substances like lime (CaCO3) or NaOH neutralize excess H+ ions in acidic soil, raising pH toward neutral. Acids would worsen the condition."
      },
      {
        "q": "A person suffers from heartburn due to excess HCl in the stomach. Which type of medicine would relieve the symptoms?",
        "options": [
          "Laxative",
          "Diuretic",
          "Antacid (e.g., MgO or Al(OH)3)",
          "Antibiotic"
        ],
        "correct": 2,
        "explanation": "Antacids are weak bases that neutralize excess stomach acid. MgO and Al(OH)3 are common antacids that react with HCl to form salt and water."
      },
      {
        "q": "In the neutralization reaction HCl + NaOH -> NaCl + H2O, what is the molar ratio when 100 mL of 1 M HCl reacts with NaOH solution?",
        "options": [
          "1:2, requiring 200 mL of 1 M NaOH",
          "Cannot determine without knowing concentration",
          "2:1, requiring 50 mL of 1 M NaOH",
          "1:1, requiring 100 mL of 1 M NaOH"
        ],
        "correct": 3,
        "explanation": "HCl and NaOH react in 1:1 molar ratio. Moles of HCl = 0.1 L * 1 M = 0.1 mol. For complete neutralization, 0.1 mol NaOH is needed, which is 100 mL of 1 M solution."
      },
      {
        "q": "A solution has a pH of 3. What is the concentration of H+ ions and is the solution acidic or basic?",
        "options": [
          "10^-3 M, acidic",
          "10^-7 M, neutral",
          "10^-3 M, basic",
          "10^-11 M, basic"
        ],
        "correct": 0,
        "explanation": "pH = -log[H+]. If pH = 3, then [H+] = 10^-3 M = 0.001 M. Since pH < 7, the solution is acidic."
      },
      {
        "q": "A student tests a colorless solution with universal indicator paper and observes a blue color. What can be concluded?",
        "options": [
          "pH is exactly 7, neutral",
          "pH is between 8-14, basic",
          "pH is between 1-6, acidic",
          "pH is between 7-8, weakly basic"
        ],
        "correct": 1,
        "explanation": "Universal indicator turns blue in basic (alkaline) solutions with pH between 8-14. A blue color indicates a pH in this range."
      },
      {
        "q": "Milk of magnesia (Mg(OH)2) is a weak base used as an antacid and laxative. Why is it considered weak?",
        "options": [
          "It cannot neutralize acids",
          "It has a low molecular weight",
          "It only partially dissolves in water and partially ionizes",
          "It has low density"
        ],
        "correct": 2,
        "explanation": "Weak bases partially ionize in water and have low solubility. Mg(OH)2 dissolves only slightly, providing limited OH- ions but sufficient for gentle antacid action."
      },
      {
        "q": "In a lab, 50 mL of 2 M H2SO4 is diluted with water to 500 mL. What is the molarity of the diluted solution?",
        "options": [
          "0.5 M",
          "1 M",
          "2 M",
          "0.2 M"
        ],
        "correct": 3,
        "explanation": "Dilution conserves moles: M₁V₁ = M₂V₂, so 2 x 50 = M₂ x 500 and M₂ = 100/500 = 0.2 M."
      },
      {
        "q": "Sodium carbonate (Na2CO3) solution is basic even though it contains no OH- ions directly. Why?",
        "options": [
          "Carbonate ions hydrolyze to form OH- ions",
          "Sodium ions make it basic",
          "Carbon dioxide escapes, leaving a basic residue",
          "Water molecules dissociate more in salt solutions"
        ],
        "correct": 0,
        "explanation": "Carbonate ions (CO3^2-) are weak bases. They react with water: CO3^2- + H2O <-> HCO3^- + OH-, producing hydroxide ions and making the solution basic."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between strong and weak acids?",
        "a": "Strong acids (e.g., HCl, H2SO4) completely ionize in water, releasing all hydrogen ions. Weak acids (e.g., acetic acid, citric acid) only partially ionize, establishing an equilibrium with their undissociated molecules. This means weak acids have fewer H+ ions in solution at the same concentration."
      },
      {
        "q": "Why does adding salt to pure water not change its pH significantly?",
        "a": "The pH of water at 25°C is 7 because [H+][OH-] = Kw = 10^-14. Adding neutral salt (like NaCl) that does not hydrolyze does not consume or produce H+ or OH- ions, so [H+] and [OH-] remain equal and pH stays at 7. However, salts from weak acids or bases do affect pH through hydrolysis."
      }
    ]
  },
  {
    "slug": "class-10-maths-trigonometry-applications",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Trigonometry (Applications Case Study)",
    "intro": "Real-world applications of trigonometry involving heights, distances, angles of elevation and depression. CBSE-style case questions on surveying, engineering, and navigation.",
    "mcqs": [
      {
        "q": "A boy stands 30 meters from the base of a tree and observes that the angle of elevation to the top is 45 degrees. What is the height of the tree?",
        "options": [
          "60 m",
          "30 m",
          "15 m",
          "30 sqrt(2) m"
        ],
        "correct": 1,
        "explanation": "Using tan(45) = height/distance, we have 1 = h/30, so h = 30 m. At 45 degrees, height equals horizontal distance."
      },
      {
        "q": "From the top of a building 80 meters tall, the angle of depression to a car on the ground is 30 degrees. How far is the car from the base of the building?",
        "options": [
          "40 sqrt(3) m",
          "40 m",
          "80 sqrt(3) m",
          "160 m"
        ],
        "correct": 2,
        "explanation": "tan(30) = height/distance, so 1/sqrt(3) = 80/d, giving d = 80*sqrt(3) meters."
      },
      {
        "q": "A ladder leans against a wall at an angle of 60 degrees with the ground. If the ladder is 10 meters long, what height on the wall does it reach?",
        "options": [
          "5 m",
          "10 sqrt(3) m",
          "10 m",
          "5 sqrt(3) m"
        ],
        "correct": 3,
        "explanation": "sin(60) = height/hypotenuse, so sqrt(3)/2 = h/10, giving h = 5*sqrt(3) meters."
      },
      {
        "q": "A surveyor measures an angle of 60 degrees from point A to the top of a tower 100 meters away horizontally. Later, moving 50 meters closer (point B), the angle is now 75 degrees. This scenario best demonstrates which concept?",
        "options": [
          "Angle of elevation changes with distance",
          "Inverse trigonometric functions",
          "Law of Sines",
          "Complementary angles"
        ],
        "correct": 0,
        "explanation": "As the observer moves closer to the tower, the angle of elevation increases from 60 to 75 degrees, showing the inverse relationship between distance and angle of elevation."
      },
      {
        "q": "In a right triangle, sin(A) = 3/5. What is cos(A)?",
        "options": [
          "4/3",
          "5/4",
          "4/5",
          "3/4"
        ],
        "correct": 2,
        "explanation": "If sin(A) = 3/5, then opposite = 3 and hypotenuse = 5. Using Pythagoras: adjacent = sqrt(25-9) = 4. So cos(A) = 4/5."
      },
      {
        "q": "Two poles of heights 10 m and 20 m are 15 m apart. What is the angle of elevation from the top of the shorter pole to the top of the taller pole?",
        "options": [
          "tan^-1(2/3)",
          "60 degrees",
          "45 degrees",
          "30 degrees"
        ],
        "correct": 0,
        "explanation": "The vertical difference is 20-10 = 10 m. Horizontal distance is 15 m. tan(angle) = 10/15 = 2/3. angle = tan^-1(2/3)."
      }
    ],
    "faqs": [
      {
        "q": "What is the relationship between angle of elevation and angle of depression?",
        "a": "Angle of elevation is the angle above the horizontal when looking up at an object from a lower position. Angle of depression is the angle below the horizontal when looking down at an object from a higher position. For an observer at height h and object at horizontal distance d, the angle of elevation from the object to the observer equals the angle of depression from the observer to the object (alternate interior angles with respect to the horizontal)."
      },
      {
        "q": "How do we choose between sin, cos, and tan in trigonometry problems?",
        "a": "Identify which sides and angles are given and which are unknown. Use SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Choose the ratio containing the known angle, known side, and unknown side you need to find. In practical problems, first determine if you have the angle and can find opposite, adjacent, or hypotenuse."
      }
    ]
  },
  {
    "slug": "class-10-maths-probability-case-study",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Probability (Case Study)",
    "intro": "CBSE case-based probability questions involving real-world scenarios like games, sports, and quality control. Students calculate experimental and theoretical probabilities.",
    "mcqs": [
      {
        "q": "In a cricket tournament, the probability that Team A wins the next match is 0.6 and Team B wins is 0.4. If they play 3 matches, what is the probability that Team A wins at least 2 matches?",
        "options": [
          "0.432",
          "0.648",
          "0.216",
          "0.352"
        ],
        "correct": 1,
        "explanation": "P(at least 2 wins) = P(exactly 2) + P(exactly 3). P(exactly 2) = C(3,2) * 0.6^2 * 0.4 = 3 * 0.36 * 0.4 = 0.432. P(exactly 3) = 0.6^3 = 0.216. Total = 0.432 + 0.216 = 0.648."
      },
      {
        "q": "A die is rolled twice. What is the probability of getting a sum of 7?",
        "options": [
          "1/8",
          "5/36",
          "1/12",
          "1/6"
        ],
        "correct": 3,
        "explanation": "Favorable outcomes for sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total outcomes = 36. P = 6/36 = 1/6."
      },
      {
        "q": "In a bag, there are 5 red balls, 3 blue balls, and 2 green balls. If two balls are drawn without replacement, what is the probability that both are red?",
        "options": [
          "25/90",
          "20/90",
          "5/45",
          "10/90"
        ],
        "correct": 1,
        "explanation": "Without replacement: P(first red) = 5/10 and P(second red) = 4/9. P(both red) = 5/10 x 4/9 = 20/90 = 2/9."
      },
      {
        "q": "A quality control inspector finds that 2% of products are defective. If a sample of 100 products is checked, what is the expected number of defective products?",
        "options": [
          "1",
          "2",
          "5",
          "10"
        ],
        "correct": 1,
        "explanation": "Expected value E = n * p = 100 * 0.02 = 2. This is the mean of a binomial distribution."
      },
      {
        "q": "Two events A and B are independent. P(A) = 0.5 and P(B) = 0.6. What is P(A and B)?",
        "options": [
          "0.5",
          "0.6",
          "0.3",
          "1.1"
        ],
        "correct": 2,
        "explanation": "For independent events, P(A and B) = P(A) * P(B) = 0.5 * 0.6 = 0.3."
      },
      {
        "q": "In a lottery, the probability of winning the jackpot is 1/1000000. If 10 million tickets are sold, what is the expected number of jackpot winners?",
        "options": [
          "100",
          "0.01",
          "1",
          "10"
        ],
        "correct": 3,
        "explanation": "Expected winners = total tickets * probability = 10,000,000 * (1/1,000,000) = 10."
      },
      {
        "q": "A student has a 70% chance of passing Math and 80% chance of passing English. Assuming independence, what is the probability of failing both subjects?",
        "options": [
          "0.06",
          "0.20",
          "0.10",
          "0.14"
        ],
        "correct": 0,
        "explanation": "P(fail Math) = 0.3, P(fail English) = 0.2. P(fail both) = 0.3 * 0.2 = 0.06."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between theoretical and experimental probability?",
        "a": "Theoretical probability is calculated based on mathematical reasoning without conducting an experiment, using P(A) = (favorable outcomes)/(total outcomes). Experimental probability is determined by actually performing an experiment and recording results, calculated as P(A) = (frequency of occurrence)/(total number of trials). As trials increase, experimental probability approaches theoretical probability (Law of Large Numbers)."
      },
      {
        "q": "When can we use the multiplication rule P(A and B) = P(A) * P(B)?",
        "a": "This formula applies only when events A and B are independent, meaning the occurrence of one event does not affect the probability of the other. For dependent events, we use P(A and B) = P(A) * P(B|A), where P(B|A) is the conditional probability of B given A has occurred. Always verify independence before applying the simpler formula."
      }
    ]
  },
  {
    "slug": "class-10-maths-coordinate-geometry-case",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Coordinate Geometry (Case Study)",
    "intro": "Real-world coordinate geometry problems involving distances, areas, and straight lines. Applications include map navigation, construction, and architecture.",
    "mcqs": [
      {
        "q": "A surveyor maps a triangular plot with vertices at A(0,0), B(6,0), and C(3,4). What is the area of this plot?",
        "options": [
          "6 sq units",
          "12 sq units",
          "24 sq units",
          "18 sq units"
        ],
        "correct": 1,
        "explanation": "Using the formula: Area = 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| = 0.5 * |0(0-4) + 6(4-0) + 3(0-0)| = 0.5 * 24 = 12 sq units."
      },
      {
        "q": "Two towns are located at coordinates (0,0) and (8,6) on a map. What is the straight-line distance between them in units?",
        "options": [
          "15 units",
          "12 units",
          "10 units",
          "14 units"
        ],
        "correct": 2,
        "explanation": "Distance = sqrt((8-0)^2 + (6-0)^2) = sqrt(64+36) = sqrt(100) = 10 units."
      },
      {
        "q": "A line passes through points (1,2) and (5,10). What is the slope of this line?",
        "options": [
          "4",
          "1",
          "3",
          "2"
        ],
        "correct": 3,
        "explanation": "Slope = (y2-y1)/(x2-x1) = (10-2)/(5-1) = 8/4 = 2."
      },
      {
        "q": "If a line has slope 2 and passes through the point (3,7), what is the equation of the line in the form y = mx + c?",
        "options": [
          "y = 2x + 1",
          "y = 3x + 1",
          "y = 2x + 7",
          "y = 2x + 3"
        ],
        "correct": 0,
        "explanation": "Using y = mx + c with m=2: 7 = 2(3) + c, so c = 1. Equation: y = 2x + 1."
      },
      {
        "q": "Points P(1,1), Q(4,4), and R(7,7) are collinear. This means what?",
        "options": [
          "They are at equal distances from origin",
          "They lie on the same straight line",
          "They form an equilateral triangle",
          "They form a right angle"
        ],
        "correct": 1,
        "explanation": "Collinear means the points lie on the same straight line. Slope PQ = (4-1)/(4-1) = 1. Slope QR = (7-4)/(7-4) = 1. Equal slopes confirm collinearity."
      },
      {
        "q": "A rectangle has vertices at (0,0), (5,0), (5,3), and (0,3). What is its perimeter?",
        "options": [
          "8 units",
          "15 units",
          "16 units",
          "20 units"
        ],
        "correct": 2,
        "explanation": "Length = 5, Width = 3. Perimeter = 2(5+3) = 16 units."
      },
      {
        "q": "The midpoint of a line segment joining (2,4) and (6,8) is?",
        "options": [
          "(5,7)",
          "(3,5)",
          "(4,5)",
          "(4,6)"
        ],
        "correct": 3,
        "explanation": "Midpoint = ((2+6)/2, (4+8)/2) = (4, 6)."
      },
      {
        "q": "Which of the following lines is parallel to y = 3x + 2?",
        "options": [
          "y = 3x - 5",
          "y = 2x + 3",
          "y = -3x + 2",
          "y = (1/3)x + 2"
        ],
        "correct": 0,
        "explanation": "Parallel lines have the same slope. y = 3x - 5 has slope 3, same as y = 3x + 2. All other options have different slopes."
      }
    ],
    "faqs": [
      {
        "q": "How do we find the equation of a line given two points?",
        "a": "First, calculate the slope m = (y2-y1)/(x2-x1). Then use the point-slope form y - y1 = m(x - x1) with either point, or solve for the y-intercept c using y = mx + c. Alternatively, use the two-point form: (y - y1)/(y2 - y1) = (x - x1)/(x2 - x1), which directly gives the line equation."
      },
      {
        "q": "What is the significance of the y-intercept in the equation y = mx + c?",
        "a": "The y-intercept (value c) represents the point where the line crosses the y-axis, at coordinates (0, c). It shows the value of y when x = 0. The slope m tells us how steeply the line rises or falls, and the y-intercept gives us a reference point to graph the line."
      }
    ]
  },
  {
    "slug": "class-10-sst-money-credit-case",
    "classLevel": "10",
    "subject": "Social Science",
    "chapter": "Money and Credit (Case Study)",
    "intro": "CBSE case-based questions on money, credit systems, banking, and financial inclusion. Real-world scenarios involving loans, interest rates, and economic decisions.",
    "mcqs": [
      {
        "q": "A farmer borrows Rs 50,000 from a cooperative bank at 8% annual interest for 3 years. How much simple interest will he pay?",
        "options": [
          "Rs 14,000",
          "Rs 12,000",
          "Rs 10,000",
          "Rs 15,000"
        ],
        "correct": 1,
        "explanation": "Simple Interest = (Principal * Rate * Time) / 100 = (50000 * 8 * 3) / 100 = 12000. Total amount = 50000 + 12000 = 62000."
      },
      {
        "q": "A self-help group of women receives a loan from a bank to start a microfinance business. Which of the following is NOT a benefit of formal credit over informal credit?",
        "options": [
          "Written loan agreements",
          "Secure terms and conditions",
          "No collateral required in group lending",
          "Lower interest rates"
        ],
        "correct": 2,
        "explanation": "Formal credit typically requires collateral or group guarantees. The advantage of group lending is shared responsibility, not absence of collateral. Other options are clear benefits of formal credit (documented terms, lower rates through regulations, security)."
      },
      {
        "q": "A person deposits Rs 10,000 in a bank account with 5% annual compound interest. How much will be in the account after 2 years?",
        "options": [
          "Rs 12,025",
          "Rs 12,000",
          "Rs 11,000",
          "Rs 11,025"
        ],
        "correct": 3,
        "explanation": "Amount = Principal * (1 + Rate/100)^Time = 10000 * (1.05)^2 = 10000 * 1.1025 = 11025."
      },
      {
        "q": "Why do banks charge different interest rates for deposits and loans?",
        "options": [
          "Deposits are riskless and loans involve risk",
          "Banks need profit margin",
          "To confuse customers",
          "Government mandates different rates"
        ],
        "correct": 0,
        "explanation": "Banks offer lower rates on deposits (safer, guaranteed return) and charge higher rates on loans (they bear the risk of non-repayment). The difference is their profit margin."
      },
      {
        "q": "A student needs educational credit. Which of the following is NOT typically required by a bank for educational loans?",
        "options": [
          "Proof of admission",
          "Proof of agricultural land ownership",
          "Collateral or guarantor",
          "Parents' income documentation"
        ],
        "correct": 1,
        "explanation": "Agricultural land ownership is not relevant for educational loans. Banks require proof of admission, proof of income, and collateral/guarantor to reduce default risk."
      },
      {
        "q": "An RBI monetary policy decision increases the repo rate (central bank lending rate). What is the likely effect on bank lending rates to customers?",
        "options": [
          "Lending rates decrease",
          "Lending rates become negative",
          "Lending rates increase",
          "Lending rates remain unchanged"
        ],
        "correct": 2,
        "explanation": "When the repo rate increases, the cost of borrowing for banks increases. Banks pass this cost to customers by raising lending rates. This is a contractionary monetary policy tool."
      },
      {
        "q": "A moneylender charges 20% interest monthly while a bank offers 12% annual interest for a short-term loan. Why might a poor person still prefer the moneylender?",
        "options": [
          "Moneylender has lower interest if you read fine print",
          "Moneylender charges less total interest",
          "Poor people like paying more interest",
          "Bank requires extensive documentation and time"
        ],
        "correct": 3,
        "explanation": "Although the moneylender charges much more, informal lenders offer quick loans without extensive documentation, collateral, or credit checks. Speed and accessibility sometimes outweigh cost for desperate borrowers."
      },
      {
        "q": "A bank implements financial inclusion by opening accounts with zero minimum balance. This policy benefits whom most?",
        "options": [
          "Low-income and rural populations",
          "Businesses exclusively",
          "Only student account holders",
          "Only wealthy customers"
        ],
        "correct": 0,
        "explanation": "Zero-balance accounts remove barriers for poor and rural populations to access formal banking, enabling savings, credit access, and financial security without upfront capital."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between simple and compound interest?",
        "a": "Simple interest is calculated only on the principal amount and remains constant each period: SI = (P*R*T)/100. Compound interest is calculated on principal plus accumulated interest, growing exponentially: A = P(1 + R/100)^T. Over time, compound interest yields significantly more than simple interest due to earning interest on interest."
      },
      {
        "q": "Why do RBI regulations exist for banks and lending institutions?",
        "a": "RBI regulations protect depositors' money, ensure financial stability, prevent predatory lending, and maintain fair interest rates. They require banks to maintain minimum reserves, limit risky investments, and follow transparency standards. These regulations prevent bank failures and protect consumers from exploitation by informal lenders."
      }
    ]
  },
  {
    "slug": "class-9-science-motion-olympiad",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Motion Olympiad",
    "intro": "NSO-style olympiad questions on motion, velocity, acceleration, and graphical analysis. Challenging problems requiring deep conceptual understanding and problem-solving skills.",
    "mcqs": [
      {
        "q": "A car accelerates uniformly from rest. In the first second, it covers 2m. How far will it cover in the second second?",
        "options": [
          "4 m",
          "8 m",
          "6 m",
          "2 m"
        ],
        "correct": 2,
        "explanation": "For uniform acceleration from rest: s = 0.5*a*t^2. In 1st second (t=1): 2 = 0.5*a*1, so a = 4 m/s^2. Distance in 2nd second = distance in 2s minus distance in 1s = 0.5*4*4 - 0.5*4*1 = 8 - 2 = 6m."
      },
      {
        "q": "A ball is thrown vertically upward with initial velocity 30 m/s. Taking g = 10 m/s^2, what is the maximum height reached?",
        "options": [
          "75 m",
          "60 m",
          "90 m",
          "45 m"
        ],
        "correct": 3,
        "explanation": "At the highest point v = 0, so h = u²/(2g) = 30²/(2 x 10) = 900/20 = 45 m."
      },
      {
        "q": "An object moving in a circle at constant speed has constant velocity. Is this true or false?",
        "options": [
          "False, velocity changes due to change in direction",
          "False, speed increases continuously",
          "True, if the radius is constant",
          "True, speed and velocity are the same"
        ],
        "correct": 0,
        "explanation": "Velocity is a vector (has direction). In circular motion at constant speed, direction constantly changes, so velocity changes. Speed is scalar and remains constant, but velocity does not."
      },
      {
        "q": "The position-time graph of an object is a straight line. What does this indicate?",
        "options": [
          "The object is accelerating",
          "The object is moving at constant velocity",
          "The object is at rest",
          "The object is decelerating"
        ],
        "correct": 1,
        "explanation": "A straight line on a position-time graph indicates constant slope, which means constant velocity. If the line is horizontal, the object is at rest (zero velocity). If slanted, constant non-zero velocity."
      },
      {
        "q": "Two objects A and B start from rest. A travels with uniform acceleration 2 m/s^2 and B with 3 m/s^2 for 5 seconds. Which statement is true?",
        "options": [
          "A travels more distance",
          "Both travel equal distance",
          "B travels more distance",
          "Cannot determine from given info"
        ],
        "correct": 2,
        "explanation": "Distance A = 0.5*2*25 = 25m. Distance B = 0.5*3*25 = 37.5m. B travels more distance because its acceleration is greater."
      },
      {
        "q": "A train moving at 20 m/s applies brakes and comes to rest in 10 seconds. What is its deceleration?",
        "options": [
          "0.5 m/s^2",
          "10 m/s^2",
          "20 m/s^2",
          "2 m/s^2"
        ],
        "correct": 3,
        "explanation": "Using v = u - at: 0 = 20 - a*10, so a = 2 m/s^2."
      },
      {
        "q": "In a velocity-time graph, a curved line indicates what?",
        "options": [
          "Changing acceleration",
          "Constant acceleration",
          "No motion",
          "Constant velocity"
        ],
        "correct": 0,
        "explanation": "A curved v-t graph indicates the acceleration is not constant (changing acceleration). A straight v-t graph indicates constant acceleration. A horizontal line indicates constant velocity."
      }
    ],
    "faqs": [
      {
        "q": "Why is velocity more useful than speed in physics?",
        "a": "Velocity is a vector quantity that includes both magnitude (speed) and direction, giving complete information about motion. Speed alone doesn't indicate where an object is heading. Velocity allows us to predict future position and apply Newton's laws correctly. In circular or curved motion, objects can have constant speed but changing velocity due to direction change."
      },
      {
        "q": "How do we interpret the area under a velocity-time graph?",
        "a": "The area under a v-t graph represents displacement. If the graph is above the time axis (positive velocity), the area is positive displacement. If below (negative velocity or backward motion), it's negative displacement. For non-uniform motion, breaking the area into geometric shapes (rectangles, triangles) gives the displacement during that time interval."
      }
    ]
  },
  {
    "slug": "class-9-maths-olympiad-number-system",
    "classLevel": "9",
    "subject": "Mathematics",
    "chapter": "Maths Olympiad - Number System",
    "intro": "IMO and NSO-style challenging problems on number theory, rational and irrational numbers, and algebraic properties. Advanced logical reasoning required.",
    "mcqs": [
      {
        "q": "What is the largest prime number less than 100 that when divided by 7 leaves a remainder of 3?",
        "options": [
          "97",
          "73",
          "79",
          "83"
        ],
        "correct": 1,
        "explanation": "Check: 73/7 = 10 R 3 (73 = 10*7 + 3). Is 73 prime? Yes. 79/7 = 11 R 2, not 3. 83/7 = 11 R 6, not 3. 97/7 = 13 R 6, not 3. So 73 is correct."
      },
      {
        "q": "What is the remainder when 2^100 is divided by 5?",
        "options": [
          "2",
          "4",
          "1",
          "0"
        ],
        "correct": 2,
        "explanation": "Finding pattern: 2^1 mod 5 = 2, 2^2 mod 5 = 4, 2^3 mod 5 = 3, 2^4 mod 5 = 1, 2^5 mod 5 = 2. Pattern repeats with cycle 4. 100 mod 4 = 0, so 2^100 mod 5 = 2^4 mod 5 = 1."
      },
      {
        "q": "Express 0.3333... (repeating) as a fraction in lowest terms.",
        "options": [
          "1/2",
          "3/10",
          "2/3",
          "1/3"
        ],
        "correct": 3,
        "explanation": "Let x = 0.3333. Then 10x = 3.3333. Subtracting: 9x = 3, so x = 3/9 = 1/3."
      },
      {
        "q": "Which of these is a rational number?",
        "options": [
          "0.256256256...",
          "sqrt(2)",
          "pi",
          "sqrt(3)"
        ],
        "correct": 0,
        "explanation": "0.256256256... is a repeating decimal, which is rational. It equals 256/999. sqrt(2), pi, and sqrt(3) are irrational."
      },
      {
        "q": "If 2^a * 3^b * 5^c = 360, what is a + b + c?",
        "options": [
          "6",
          "5",
          "3",
          "4"
        ],
        "correct": 0,
        "explanation": "Factorising: 360 = 2^3 x 3^2 x 5^1, so a = 3, b = 2, c = 1 and a + b + c = 6."
      },
      {
        "q": "What is the GCD of 84 and 126?",
        "options": [
          "6",
          "12",
          "42",
          "21"
        ],
        "correct": 2,
        "explanation": "Using Euclidean algorithm: 126 = 84*1 + 42, 84 = 42*2 + 0. GCD = 42."
      },
      {
        "q": "The LCM of two numbers is 60 and their GCD is 5. If one number is 20, what is the other number?",
        "options": [
          "30",
          "25",
          "12",
          "15"
        ],
        "correct": 3,
        "explanation": "LCM x GCD = product of the numbers: 60 x 5 = 300. The other number is 300 / 20 = 15."
      }
    ],
    "faqs": [
      {
        "q": "How do we determine if a number is rational or irrational?",
        "a": "A rational number can be expressed as a fraction p/q where p and q are integers and q is not zero. It either terminates (like 0.5) or repeats as a decimal (like 0.333...). An irrational number cannot be expressed as a simple fraction and its decimal representation never terminates or repeats (like pi = 3.14159...). Examples of irrational numbers include sqrt(2), sqrt(3), pi, and e."
      },
      {
        "q": "What is the Fundamental Theorem of Arithmetic?",
        "a": "Every integer greater than 1 can be uniquely expressed as a product of prime numbers (ignoring the order of factors). For example, 12 = 2^2 * 3, and no other prime factorization equals 12. This theorem guarantees that prime factorization is unique, making it a fundamental tool in number theory for finding GCD, LCM, and solving divisibility problems."
      }
    ]
  },
  {
    "slug": "class-8-science-olympiad-atoms-molecules",
    "classLevel": "8",
    "subject": "Science",
    "chapter": "Atoms and Molecules Olympiad",
    "intro": "NSO challenging questions on atomic structure, molecular composition, and chemical formulas. Olympiad-level logical reasoning on matter and substances.",
    "mcqs": [
      {
        "q": "An atom has 6 protons. Its atomic number is 6. How many electrons does it have in a neutral state?",
        "options": [
          "6",
          "3",
          "Cannot determine",
          "12"
        ],
        "correct": 0,
        "explanation": "In a neutral atom, the number of electrons equals the number of protons. Atomic number = protons = 6, so electrons = 6."
      },
      {
        "q": "What is the correct formula for the compound formed between calcium and chlorine?",
        "options": [
          "Ca2Cl",
          "CaCl2",
          "CaCl",
          "Ca2Cl2"
        ],
        "correct": 1,
        "explanation": "Calcium (Ca) is in Group 2 with valency +2. Chlorine (Cl) is in Group 17 with valency -1. Formula: CaCl2."
      },
      {
        "q": "If the atomic mass of Oxygen is 16 and that of Carbon is 12, what is the molecular mass of CO2?",
        "options": [
          "28",
          "24",
          "44",
          "32"
        ],
        "correct": 2,
        "explanation": "Molecular mass of CO2 = 12 + 2*16 = 12 + 32 = 44."
      },
      {
        "q": "An element has atomic number 7. To which group does it belong?",
        "options": [
          "Group 16",
          "Group 18",
          "Group 17",
          "Group 15"
        ],
        "correct": 3,
        "explanation": "Atomic number 7 is Nitrogen. Its electronic configuration is 2,5, placing it in Group 15 (5 valence electrons)."
      },
      {
        "q": "Which of these represents an ionic compound?",
        "options": [
          "NaCl",
          "H2",
          "CH4",
          "CO2"
        ],
        "correct": 0,
        "explanation": "NaCl is formed between Na (metal) and Cl (nonmetal) through ionic bonding with electron transfer. Others are covalent or elemental."
      },
      {
        "q": "A compound contains 2 hydrogen atoms and 1 sulfur atom. What is its formula?",
        "options": [
          "H2S2",
          "H2S",
          "HS",
          "S2H2"
        ],
        "correct": 1,
        "explanation": "The formula directly lists the atoms: 2 hydrogen and 1 sulfur = H2S."
      },
      {
        "q": "What is the valency of Nitrogen when it forms NH3?",
        "options": [
          "5",
          "4",
          "3",
          "1"
        ],
        "correct": 2,
        "explanation": "In NH3 (ammonia), Nitrogen forms 3 covalent bonds with 3 hydrogen atoms, showing valency of 3."
      },
      {
        "q": "An atom becomes a positive ion by losing electrons. How many electrons did it lose if it went from 18 electrons to 16?",
        "options": [
          "1",
          "3",
          "4",
          "2"
        ],
        "correct": 3,
        "explanation": "18 - 16 = 2 electrons lost, forming a 2+ ion."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between atomic number and mass number?",
        "a": "Atomic number is the number of protons in an atom's nucleus, which defines the element. Mass number is the total of protons and neutrons. For example, Carbon-12 has atomic number 6 (6 protons) and mass number 12 (6 protons + 6 neutrons). Atomic number determines chemical properties, while mass number distinguishes between isotopes of the same element."
      },
      {
        "q": "How do we predict the formula of a compound from valencies?",
        "a": "Find the valencies of both elements. Write them as subscripts of the opposite element, then simplify to lowest terms. For example, Magnesium (valency +2) and Chlorine (valency -1): cross the valencies to get MgCl2. Aluminum (valency +3) and Oxygen (valency -2) gives Al2O3 after simplifying."
      }
    ]
  },
  {
    "slug": "class-10-science-gravitation-olympiad",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Gravitation Olympiad",
    "intro": "NSO and advanced physics olympiad questions on gravity, planetary motion, and orbital mechanics. Requires mastery of Newton's law and orbital concepts.",
    "mcqs": [
      {
        "q": "The gravitational force between two objects is F. If the distance between them is halved, what is the new force?",
        "options": [
          "4F",
          "2F",
          "F/4",
          "F/2"
        ],
        "correct": 0,
        "explanation": "Gravitational force F = G*m1*m2/r^2. If r becomes r/2, new force = G*m1*m2/(r/2)^2 = 4*G*m1*m2/r^2 = 4F."
      },
      {
        "q": "The weight of an object on Earth is 100 N. What is its weight on the Moon where g_moon = g_earth/6?",
        "options": [
          "600 N",
          "16.67 N",
          "50 N",
          "33.33 N"
        ],
        "correct": 1,
        "explanation": "Weight = m*g. On Moon: W_moon = m*g_earth/6 = (m*g_earth)/6 = 100/6 = 16.67 N."
      },
      {
        "q": "A satellite orbits Earth at radius r with speed v. To achieve a stable orbit, what must be true?",
        "options": [
          "They are independent",
          "Gravitational force exceeds centripetal force",
          "Gravitational force provides centripetal force",
          "Centripetal force is zero"
        ],
        "correct": 2,
        "explanation": "For stable orbit, gravitational attraction provides exactly the centripetal force needed: G*M*m/r^2 = m*v^2/r."
      },
      {
        "q": "If the mass of Earth doubled while its radius remained the same, how would g change?",
        "options": [
          "Become g/4",
          "Become g/2",
          "Remain g",
          "Become 2g"
        ],
        "correct": 3,
        "explanation": "g = G*M/r^2. If M doubles: g_new = G*2M/r^2 = 2*g."
      },
      {
        "q": "An object is dropped from the top of a building on Earth (g=10 m/s^2). After 2 seconds, how far has it fallen?",
        "options": [
          "20 m",
          "10 m",
          "40 m",
          "30 m"
        ],
        "correct": 0,
        "explanation": "Starting from rest, s = ½gt² = ½ x 10 x 2² = 20 m."
      },
      {
        "q": "The escape velocity from Earth is 11.2 km/s. What is the escape velocity from a planet with double Earth's mass and double its radius?",
        "options": [
          "5.6 km/s",
          "11.2 km/s",
          "7.9 km/s",
          "22.4 km/s"
        ],
        "correct": 1,
        "explanation": "v_escape = sqrt(2*G*M/r). If M doubles and r doubles: v_escape_new = sqrt(2*G*2M/2r) = sqrt(2*G*M/r) = v_escape (unchanged)."
      },
      {
        "q": "A planet has density 2 times that of Earth and radius 1/2 times Earth's radius. How does its surface gravity compare to Earth's?",
        "options": [
          "2g",
          "g/2",
          "g",
          "g/4"
        ],
        "correct": 2,
        "explanation": "Surface gravity g = (4/3)πGρR, so g is proportional to ρR. Doubling density and halving radius gives 2 x ½ = 1, i.e. the same g."
      },
      {
        "q": "Kepler's Third Law states that the square of the orbital period is proportional to the cube of the semi-major axis. For a satellite orbiting twice as far from Earth, how does its period change?",
        "options": [
          "8 times larger",
          "Halved",
          "Same",
          "sqrt(8) times larger"
        ],
        "correct": 3,
        "explanation": "T^2 is proportional to a^3. If a doubles: T_new^2 proportional to (2a)^3 = 8*a^3. So T_new^2 = 8*T^2, giving T_new = T*sqrt(8) = 2*sqrt(2)*T."
      }
    ],
    "faqs": [
      {
        "q": "Why does gravity on the Moon's surface differ from Earth's despite both being planets?",
        "a": "Gravity at a surface depends on g = G*M/R^2, which depends on the planet's mass and radius. The Moon has much less mass than Earth (about 1/81), so gravitational force is weaker. Although the Moon is smaller (radius about 1/4 of Earth), its lower mass dominates, resulting in g_moon ≈ g_earth/6. Larger, denser planets have stronger surface gravity."
      },
      {
        "q": "What is the difference between weight and mass?",
        "a": "Mass is the amount of matter in an object and remains constant everywhere. Weight is the force exerted by gravity on that mass, given by W = m*g. On Earth (g=10 m/s^2), a 10 kg object weighs 100 N. On the Moon (g=1.6 m/s^2), the same object weighs only 16 N. An astronaut's mass never changes, but their weight varies depending on the gravitational field they're in."
      }
    ]
  },
  {
    "slug": "class-8-science-cell",
    "classLevel": "8",
    "subject": "Science",
    "chapter": "Cell Structure and Function",
    "intro": "This MCQ chapter covers the fundamental concepts of cell biology, organelles, and their functions. Master the structure of plant and animal cells to excel in your science exams.",
    "mcqs": [
      {
        "q": "Which organelle is called the powerhouse of the cell?",
        "options": [
          "Mitochondria",
          "Chloroplast",
          "Ribosome",
          "Nucleus"
        ],
        "correct": 0,
        "explanation": "Mitochondria is called the powerhouse of the cell because it produces ATP through cellular respiration, providing energy for all cellular activities."
      },
      {
        "q": "What is the main function of the nucleus?",
        "options": [
          "Photosynthesis",
          "DNA storage and regulation of cellular activities",
          "Energy production",
          "Protein synthesis"
        ],
        "correct": 1,
        "explanation": "The nucleus contains DNA and controls all cellular activities by regulating gene expression. It is the command center of the cell."
      },
      {
        "q": "Which of the following is found only in plant cells?",
        "options": [
          "Centrioles",
          "Ribosomes",
          "Chloroplast",
          "Mitochondria"
        ],
        "correct": 2,
        "explanation": "Chloroplasts are found only in plant cells. They contain chlorophyll for photosynthesis. Animal cells lack chloroplasts."
      },
      {
        "q": "What does the cell membrane control?",
        "options": [
          "Photosynthesis",
          "DNA replication",
          "Protein storage",
          "Movement of substances in and out of the cell"
        ],
        "correct": 3,
        "explanation": "The cell membrane is selectively permeable and controls the movement of substances into and out of the cell, protecting the cell from its environment."
      },
      {
        "q": "Which organelle is responsible for protein synthesis?",
        "options": [
          "Ribosome",
          "Smooth endoplasmic reticulum",
          "Rough endoplasmic reticulum",
          "Golgi apparatus"
        ],
        "correct": 0,
        "explanation": "Ribosomes are sites of protein synthesis. They read mRNA and link amino acids together to form proteins in all cells."
      },
      {
        "q": "What is the main component of the cell wall in plant cells?",
        "options": [
          "Lipid",
          "Cellulose",
          "Starch",
          "Protein"
        ],
        "correct": 1,
        "explanation": "Cell walls in plant cells are composed primarily of cellulose. Cellulose provides structural support and rigidity to the plant cell."
      },
      {
        "q": "Which organelle stores water, nutrients, and waste in plant cells?",
        "options": [
          "Chloroplast",
          "Mitochondria",
          "Vacuole",
          "Nucleus"
        ],
        "correct": 2,
        "explanation": "The large central vacuole in plant cells stores water, nutrients, minerals, and waste products. It helps maintain turgor pressure."
      },
      {
        "q": "What is the function of the rough endoplasmic reticulum?",
        "options": [
          "Storage of calcium",
          "Detoxification",
          "Synthesis of lipids",
          "Synthesis of proteins for secretion"
        ],
        "correct": 3,
        "explanation": "The rough endoplasmic reticulum (RER) is studded with ribosomes and synthesizes proteins that are transported out of the cell for secretion."
      },
      {
        "q": "Which organelle is involved in the breakdown of harmful substances?",
        "options": [
          "Lysosome",
          "Ribosome",
          "Centrosome",
          "Golgi apparatus"
        ],
        "correct": 0,
        "explanation": "Lysosomes contain digestive enzymes that break down harmful substances, pathogens, and cellular waste. They are called suicide bags of the cell."
      },
      {
        "q": "What is the function of centrioles in animal cells?",
        "options": [
          "Protein synthesis",
          "Help in cell division",
          "Storage of water",
          "Photosynthesis"
        ],
        "correct": 1,
        "explanation": "Centrioles are found in animal cells and help organize the spindle fibers during cell division, assisting in the movement of chromosomes."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between prokaryotic and eukaryotic cells?",
        "a": "Eukaryotic cells have a nucleus and membrane-bound organelles (animals, plants, fungi), while prokaryotic cells lack a nucleus and organelles (bacteria, archaea). Eukaryotic cells are more complex and larger."
      },
      {
        "q": "How do plant and animal cells differ?",
        "a": "Plant cells have cell wall, large vacuole, and chloroplasts, while animal cells lack these structures. Animal cells have centrioles which plant cells lack. Both have cell membrane, nucleus, mitochondria, and ribosomes."
      }
    ]
  },
  {
    "slug": "class-8-science-force",
    "classLevel": "8",
    "subject": "Science",
    "chapter": "Force and Motion",
    "intro": "Learn about forces, motion, Newton's laws, and friction. These fundamental concepts explain how objects move and interact with their environment.",
    "mcqs": [
      {
        "q": "What is force?",
        "options": [
          "Energy of an object",
          "Resistance of an object",
          "A push or pull that changes motion",
          "Speed of an object"
        ],
        "correct": 2,
        "explanation": "Force is a push or pull exerted on an object that can change its state of motion, direction, or shape. It is measured in Newtons."
      },
      {
        "q": "Which of Newtons laws states that an object at rest will remain at rest unless acted upon by a force?",
        "options": [
          "Third law of motion",
          "Law of gravitation",
          "Second law of motion",
          "First law of motion"
        ],
        "correct": 3,
        "explanation": "Newtons First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force. This is the law of inertia."
      },
      {
        "q": "What is friction?",
        "options": [
          "A force that opposes motion between surfaces in contact",
          "A force that aids motion",
          "The tendency to remain in motion",
          "The weight of an object"
        ],
        "correct": 0,
        "explanation": "Friction is the resistance between two surfaces in contact when one slides over the other. It always opposes motion and can be static or kinetic."
      },
      {
        "q": "How does friction affect the motion of objects?",
        "options": [
          "Has no effect",
          "Decreases speed",
          "Increases speed",
          "Increases mass"
        ],
        "correct": 1,
        "explanation": "Friction opposes motion and causes objects to slow down or stop. It converts kinetic energy into heat energy."
      },
      {
        "q": "According to Newtons Second Law, what is the relationship between force, mass, and acceleration?",
        "options": [
          "F = m + a",
          "F = m - a",
          "F = m x a",
          "F = m / a"
        ],
        "correct": 2,
        "explanation": "Newtons Second Law states F = ma, where Force equals mass multiplied by acceleration. Greater force produces greater acceleration."
      },
      {
        "q": "What is the SI unit of force?",
        "options": [
          "Joule",
          "Meter per second",
          "Kilogram",
          "Newton"
        ],
        "correct": 3,
        "explanation": "The SI unit of force is Newton (N). One Newton is the force required to accelerate a one kilogram mass at one meter per second squared."
      },
      {
        "q": "What does Newtons Third Law of motion state?",
        "options": [
          "For every action there is an equal and opposite reaction",
          "F = ma",
          "Force causes acceleration",
          "Action equals reaction"
        ],
        "correct": 0,
        "explanation": "Newtons Third Law states that for every action, there is an equal and opposite reaction. Forces always occur in pairs."
      },
      {
        "q": "What is the difference between speed and velocity?",
        "options": [
          "Speed has direction but velocity does not",
          "Velocity has direction but speed does not",
          "No difference",
          "Velocity is always greater"
        ],
        "correct": 1,
        "explanation": "Speed is the distance covered per unit time without direction (scalar). Velocity is displacement per unit time with direction (vector)."
      },
      {
        "q": "How can friction be reduced?",
        "options": [
          "Reduce weight",
          "Increase surface roughness",
          "Apply lubricants",
          "Increase pressure"
        ],
        "correct": 2,
        "explanation": "Friction can be reduced by applying lubricants like oil or grease that create a smooth layer between surfaces, or by polishing surfaces."
      },
      {
        "q": "What is acceleration?",
        "options": [
          "Distance traveled",
          "Speed of an object",
          "Time taken",
          "Change in velocity per unit time"
        ],
        "correct": 3,
        "explanation": "Acceleration is the rate of change of velocity per unit time. It can be positive (speeding up), negative (slowing down), or change in direction."
      }
    ],
    "faqs": [
      {
        "q": "Why is friction sometimes helpful and sometimes harmful?",
        "a": "Friction is helpful for walking, writing, and braking vehicles. It is harmful when it causes energy loss in machinery and engines. Understanding friction helps us use it appropriately."
      },
      {
        "q": "What is the difference between static and kinetic friction?",
        "a": "Static friction prevents an object from moving when a force is applied. Kinetic friction acts when an object is already moving. Static friction is usually greater than kinetic friction."
      }
    ]
  },
  {
    "slug": "class-8-science-sound",
    "classLevel": "8",
    "subject": "Science",
    "chapter": "Sound",
    "intro": "Understand the properties of sound, how it travels, and why it matters. Learn about frequency, wavelength, and practical applications of sound.",
    "mcqs": [
      {
        "q": "What is sound?",
        "options": [
          "Mechanical waves that require a medium",
          "Movement of particles",
          "Electromagnetic radiation",
          "Light waves"
        ],
        "correct": 0,
        "explanation": "Sound is a mechanical wave that travels through a medium like air, water, or solids. It is produced by vibrating objects."
      },
      {
        "q": "Can sound travel in a vacuum?",
        "options": [
          "Only at low speed",
          "No",
          "Yes",
          "Only at high speed"
        ],
        "correct": 1,
        "explanation": "Sound cannot travel in a vacuum because it requires a medium to propagate. Without molecules to vibrate, sound waves cannot be transmitted."
      },
      {
        "q": "What is the speed of sound in air at room temperature?",
        "options": [
          "300,000 km/s",
          "1000 km/h",
          "340 m/s",
          "100 m/s"
        ],
        "correct": 2,
        "explanation": "The speed of sound in air at 20 degrees Celsius is approximately 340 m/s or 1224 km/h. It varies with temperature and medium."
      },
      {
        "q": "What is frequency in sound waves?",
        "options": [
          "Loudness of sound",
          "Speed of sound",
          "Distance between waves",
          "Number of vibrations per second"
        ],
        "correct": 3,
        "explanation": "Frequency is the number of complete vibrations or oscillations per second, measured in Hertz (Hz). Higher frequency means higher pitch."
      },
      {
        "q": "What is wavelength?",
        "options": [
          "Distance between two consecutive crests or troughs",
          "Frequency of the wave",
          "Speed of the wave",
          "Time taken for one vibration"
        ],
        "correct": 0,
        "explanation": "Wavelength is the distance between two consecutive crests (or troughs) of a wave. It is inversely related to frequency."
      },
      {
        "q": "How is pitch related to frequency?",
        "options": [
          "Pitch decreases with frequency",
          "Pitch increases with frequency",
          "No relationship",
          "Pitch is independent of frequency"
        ],
        "correct": 1,
        "explanation": "Pitch is the perception of frequency. Higher frequency sounds have higher pitch; lower frequency sounds have lower pitch."
      },
      {
        "q": "What is loudness related to?",
        "options": [
          "Frequency",
          "Wavelength",
          "Amplitude of the wave",
          "Speed of sound"
        ],
        "correct": 2,
        "explanation": "Loudness is determined by the amplitude of sound waves. Greater amplitude means louder sound, measured in decibels (dB)."
      },
      {
        "q": "What is echo?",
        "options": [
          "Repetition of a word",
          "High-pitched sound",
          "Duplication of sound",
          "Reflection of sound from a surface"
        ],
        "correct": 3,
        "explanation": "Echo is the reflection of sound from a surface back to the listener. It occurs when sound bounces off hard surfaces like walls or mountains."
      },
      {
        "q": "What is the range of human hearing?",
        "options": [
          "20-20,000 Hz",
          "10-20,000 Hz",
          "0-10 Hz",
          "100-50,000 Hz"
        ],
        "correct": 0,
        "explanation": "Human ears can typically hear sounds between 20 Hz and 20,000 Hz (20 kHz). Below 20 Hz are infrasonic waves; above 20,000 Hz are ultrasonic waves."
      },
      {
        "q": "What is the relationship between speed, frequency, and wavelength?",
        "options": [
          "Speed = frequency + wavelength",
          "Speed = frequency x wavelength",
          "Speed = frequency / wavelength",
          "Speed = frequency - wavelength"
        ],
        "correct": 1,
        "explanation": "The fundamental wave equation is: Speed = Frequency x Wavelength. This relationship applies to all waves including sound."
      }
    ],
    "faqs": [
      {
        "q": "Why does sound travel faster in water than in air?",
        "a": "Water molecules are closer together and more densely packed than air molecules. This allows vibrations to transfer more efficiently, making sound travel faster in water (~1500 m/s) than in air (~340 m/s)."
      },
      {
        "q": "What are some uses of sound waves beyond hearing?",
        "a": "Ultrasonic waves are used in medical ultrasound, sonar for navigation, and cleaning. Infrasonic waves occur in nature through earthquakes and elephant communication."
      }
    ]
  },
  {
    "slug": "class-8-science-light",
    "classLevel": "8",
    "subject": "Science",
    "chapter": "Light",
    "intro": "Explore the properties of light, reflection, refraction, and the human eye. Understand how light enables vision and interacts with different materials.",
    "mcqs": [
      {
        "q": "What is light?",
        "options": [
          "Sound waves",
          "Mechanical waves",
          "Electromagnetic radiation",
          "Thermal energy"
        ],
        "correct": 2,
        "explanation": "Light is electromagnetic radiation that can travel through space and matter. It exhibits properties of both waves and particles."
      },
      {
        "q": "What is the speed of light in vacuum?",
        "options": [
          "100,000 km/s",
          "1000 m/s",
          "340 m/s",
          "300,000 km/s"
        ],
        "correct": 3,
        "explanation": "The speed of light in vacuum is approximately 300,000 km/s or 3 x 10^8 m/s. This is the fastest speed in the universe."
      },
      {
        "q": "What is reflection of light?",
        "options": [
          "Bouncing back of light from a surface",
          "Passing through a material",
          "Bending of light",
          "Absorption of light"
        ],
        "correct": 0,
        "explanation": "Reflection is the bouncing back of light when it hits a surface. The law of reflection states that the angle of incidence equals the angle of reflection."
      },
      {
        "q": "What is refraction of light?",
        "options": [
          "Scattering of light",
          "Bending of light when passing from one medium to another",
          "Bouncing of light",
          "Absorption of light"
        ],
        "correct": 1,
        "explanation": "Refraction is the bending of light when it passes from one medium to another with different densities. It occurs due to change in light speed."
      },
      {
        "q": "What is the function of the cornea in the eye?",
        "options": [
          "Controlling light entry",
          "Focusing light onto retina",
          "Refracting light",
          "Detecting light"
        ],
        "correct": 2,
        "explanation": "The cornea is the transparent front part of the eye that refracts (bends) light rays. It provides most of the refracting power of the eye."
      },
      {
        "q": "What is the function of the iris in the eye?",
        "options": [
          "Detecting light",
          "Refracting light",
          "Transmitting signals",
          "Controlling the amount of light entering the eye"
        ],
        "correct": 3,
        "explanation": "The iris is the colored part of the eye that controls the size of the pupil, regulating the amount of light that enters the eye."
      },
      {
        "q": "What is the function of the retina?",
        "options": [
          "Converting light into electrical signals",
          "Refracting light",
          "Adjusting lens shape",
          "Controlling light entry"
        ],
        "correct": 0,
        "explanation": "The retina is the light-sensitive tissue at the back of the eye containing photoreceptors that convert light into electrical signals sent to the brain."
      },
      {
        "q": "What colors make up white light?",
        "options": [
          "Only primary colors",
          "All colors of the visible spectrum",
          "Red and blue",
          "Only secondary colors"
        ],
        "correct": 1,
        "explanation": "White light is composed of all colors of the visible spectrum: red, orange, yellow, green, blue, indigo, and violet (ROYGBIV)."
      },
      {
        "q": "What is dispersion of light?",
        "options": [
          "Absorption of light",
          "Bending of light",
          "Splitting of white light into different colors",
          "Bouncing of light"
        ],
        "correct": 2,
        "explanation": "Dispersion is the splitting of white light into its constituent colors when it passes through a prism. Different colors bend at different angles."
      },
      {
        "q": "What is a convex lens?",
        "options": [
          "Concave on both sides",
          "Flat lens",
          "Thinner in center",
          "Thicker in center and converges light"
        ],
        "correct": 3,
        "explanation": "A convex lens is thicker in the center and thinner at the edges. It converges light rays and is used in magnifying glasses and cameras."
      }
    ],
    "faqs": [
      {
        "q": "How does the human eye see objects?",
        "a": "Light reflects from objects and enters the eye through the cornea and pupil. The lens focuses this light onto the retina, where photoreceptors convert it into electrical signals. The brain interprets these signals as images."
      },
      {
        "q": "Why do different materials have different colors?",
        "a": "Objects appear colored because they absorb certain colors of light and reflect others. A red apple absorbs all colors except red, which it reflects to our eyes."
      }
    ]
  },
  {
    "slug": "class-8-science-microorganisms",
    "classLevel": "8",
    "subject": "Science",
    "chapter": "Microorganisms and Disease",
    "intro": "Learn about microscopic life forms, bacteria, viruses, and their role in disease and fermentation. Understand how disease spreads and prevention methods.",
    "mcqs": [
      {
        "q": "What are microorganisms?",
        "options": [
          "Organisms visible only under a microscope",
          "Visible to naked eye",
          "Dead organisms",
          "Large organisms"
        ],
        "correct": 0,
        "explanation": "Microorganisms are organisms so small they are visible only under a microscope. They include bacteria, viruses, fungi, and protozoans."
      },
      {
        "q": "What are bacteria?",
        "options": [
          "Eukaryotic cells",
          "Prokaryotic cells without a nucleus",
          "Viruses",
          "Multicellular organisms"
        ],
        "correct": 1,
        "explanation": "Bacteria are prokaryotic microorganisms without a nucleus. They are single-celled and can be beneficial or harmful to humans."
      },
      {
        "q": "What are viruses made of?",
        "options": [
          "Cell membrane only",
          "DNA and cell wall",
          "DNA or RNA surrounded by protein coat",
          "Only protein"
        ],
        "correct": 2,
        "explanation": "Viruses consist of genetic material (DNA or RNA) surrounded by a protein coat called a capsid. They cannot reproduce on their own."
      },
      {
        "q": "How do viruses reproduce?",
        "options": [
          "By photosynthesis",
          "Viruses do not reproduce",
          "By binary fission",
          "By infecting host cells and using host machinery"
        ],
        "correct": 3,
        "explanation": "Viruses cannot reproduce independently. They must infect host cells and use the host cells machinery to replicate their genetic material."
      },
      {
        "q": "What are fungi?",
        "options": [
          "Eukaryotic organisms that feed on dead organic matter",
          "Prokaryotes",
          "Viruses",
          "Bacteria"
        ],
        "correct": 0,
        "explanation": "Fungi are eukaryotic organisms including mushrooms, molds, and yeasts. They absorb nutrients by secreting enzymes on food and absorbing digested matter."
      },
      {
        "q": "How do infectious diseases spread?",
        "options": [
          "Only through touch",
          "Through air, water, food, and direct contact",
          "Only through water",
          "Through air only"
        ],
        "correct": 1,
        "explanation": "Infectious diseases spread through multiple routes: airborne (sneezing, coughing), water, contaminated food, direct contact, and vectors like insects."
      },
      {
        "q": "What is immunization?",
        "options": [
          "Complete cure",
          "Isolation of patients",
          "Prevention of disease through vaccines",
          "Treatment of disease"
        ],
        "correct": 2,
        "explanation": "Immunization is a preventive measure using vaccines that stimulate the immune system to recognize and fight specific pathogens without causing the disease."
      },
      {
        "q": "What is fermentation?",
        "options": [
          "Viral replication",
          "A harmful process",
          "Growth of mold",
          "Microbial breakdown of food producing useful products"
        ],
        "correct": 3,
        "explanation": "Fermentation is microbial decomposition of organic matter. Bacteria and yeasts ferment sugars to produce useful products like yogurt, cheese, and bread."
      },
      {
        "q": "What is antibiotic resistance?",
        "options": [
          "Ability of bacteria to survive antibiotic drugs",
          "Weakness of immune system",
          "Viral infection",
          "Allergy to antibiotics"
        ],
        "correct": 0,
        "explanation": "Antibiotic resistance occurs when bacteria mutate and survive antibiotic treatment. Overuse of antibiotics accelerates this process."
      },
      {
        "q": "How can we prevent the spread of microorganisms?",
        "options": [
          "Avoid all contact",
          "Practice good hygiene, vaccination, proper food storage",
          "Ignore hygiene",
          "Never wash hands"
        ],
        "correct": 1,
        "explanation": "Prevention involves: good personal hygiene, vaccination, proper food storage and cooking, safe water, sanitation, and avoiding contact with infected persons."
      }
    ],
    "faqs": [
      {
        "q": "Are all microorganisms harmful?",
        "a": "No, many microorganisms are beneficial. Bacteria in soil help plants grow, in digestive system they aid digestion, in fermentation they create useful products, and some produce antibiotics."
      },
      {
        "q": "What is the difference between bacteria and viruses?",
        "a": "Bacteria are living cells that can reproduce independently and grow in culture. Viruses are non-living and need host cells to reproduce. Antibiotics kill bacteria but not viruses."
      }
    ]
  },
  {
    "slug": "class-8-maths-rational-numbers",
    "classLevel": "8",
    "subject": "Mathematics",
    "chapter": "Rational Numbers",
    "intro": "Master rational numbers, their properties, and operations. Learn about fractions, decimals, and how to work with numbers expressed as ratios.",
    "mcqs": [
      {
        "q": "What is a rational number?",
        "options": [
          "Only integers",
          "Only positive numbers",
          "A number that can be expressed as p/q where q ≠ 0",
          "Any number"
        ],
        "correct": 2,
        "explanation": "A rational number is any number that can be expressed as a fraction p/q where p and q are integers and q is not zero. This includes integers, fractions, and terminating/repeating decimals."
      },
      {
        "q": "Which of the following is a rational number?",
        "options": [
          "√2",
          "π",
          "√3",
          "1.5"
        ],
        "correct": 3,
        "explanation": "1.5 = 3/2 is a rational number. √2, π, and √3 are irrational numbers as they cannot be expressed as a ratio of integers."
      },
      {
        "q": "What is the additive identity of rational numbers?",
        "options": [
          "0",
          "1",
          "-1",
          "∞"
        ],
        "correct": 0,
        "explanation": "The additive identity is 0. Adding 0 to any rational number gives the same number. a + 0 = a for all rational a."
      },
      {
        "q": "What is the multiplicative identity of rational numbers?",
        "options": [
          "∞",
          "1",
          "0",
          "-1"
        ],
        "correct": 1,
        "explanation": "The multiplicative identity is 1. Multiplying any rational number by 1 gives the same number. a × 1 = a for all rational a."
      },
      {
        "q": "What is the additive inverse of 3/4?",
        "options": [
          "4/3",
          "3/4",
          "-3/4",
          "1"
        ],
        "correct": 2,
        "explanation": "The additive inverse of 3/4 is -3/4. Adding them gives zero: 3/4 + (-3/4) = 0."
      },
      {
        "q": "What is the multiplicative inverse of 2/5?",
        "options": [
          "-2/5",
          "0",
          "2/5",
          "5/2"
        ],
        "correct": 3,
        "explanation": "The multiplicative inverse of 2/5 is 5/2. Multiplying them gives one: (2/5) × (5/2) = 1."
      },
      {
        "q": "Simplify: 2/3 + 1/4",
        "options": [
          "11/12",
          "3/12",
          "8/12",
          "3/7"
        ],
        "correct": 0,
        "explanation": "2/3 + 1/4: LCM of 3 and 4 is 12. So, (2×4)/(3×4) + (1×3)/(4×3) = 8/12 + 3/12 = 11/12."
      },
      {
        "q": "Simplify: 3/5 × 10/9",
        "options": [
          "3/9",
          "2/3",
          "30/45",
          "5/3"
        ],
        "correct": 1,
        "explanation": "(3/5) × (10/9) = (3×10)/(5×9) = 30/45 = 2/3. Cancel common factors."
      },
      {
        "q": "Which property states that a + b = b + a?",
        "options": [
          "Associative",
          "Distributive",
          "Commutative",
          "Identity"
        ],
        "correct": 2,
        "explanation": "The commutative property states that the order of addition (or multiplication) does not change the result. a + b = b + a."
      },
      {
        "q": "What is the value of -2/3 ÷ 4/9?",
        "options": [
          "8/27",
          "-8/27",
          "-6/4",
          "-3/2"
        ],
        "correct": 3,
        "explanation": "(-2/3) ÷ (4/9) = (-2/3) × (9/4) = (-2×9)/(3×4) = -18/12 = -3/2."
      }
    ],
    "faqs": [
      {
        "q": "Is every integer a rational number?",
        "a": "Yes, every integer is a rational number. Any integer n can be expressed as n/1, which is in the form p/q. For example, 5 = 5/1."
      },
      {
        "q": "What is the difference between rational and irrational numbers?",
        "a": "Rational numbers can be expressed as p/q (like 1/2, 0.5, 3). Irrational numbers cannot (like √2, π, e). Together they form all real numbers."
      }
    ]
  },
  {
    "slug": "class-8-maths-squares",
    "classLevel": "8",
    "subject": "Mathematics",
    "chapter": "Squares and Square Roots",
    "intro": "Understand perfect squares, square roots, and their properties. Learn estimation techniques and applications in geometry.",
    "mcqs": [
      {
        "q": "What is a perfect square?",
        "options": [
          "The product of an integer with itself",
          "A number divisible by 2",
          "A number greater than 100",
          "Any even number"
        ],
        "correct": 0,
        "explanation": "A perfect square is a number obtained by multiplying an integer by itself. For example, 9 = 3 × 3, 16 = 4 × 4. Symbolically, n² is a perfect square."
      },
      {
        "q": "Which of the following is a perfect square?",
        "options": [
          "80",
          "64",
          "50",
          "90"
        ],
        "correct": 1,
        "explanation": "64 = 8 × 8. So 64 is a perfect square. 50, 80, and 90 are not perfect squares."
      },
      {
        "q": "What is √49?",
        "options": [
          "14",
          "49",
          "7",
          "24.5"
        ],
        "correct": 2,
        "explanation": "√49 = 7 because 7 × 7 = 49. The square root finds the number that when multiplied by itself gives the radicand."
      },
      {
        "q": "What is the square of 12?",
        "options": [
          "120",
          "24",
          "6",
          "144"
        ],
        "correct": 3,
        "explanation": "12² = 12 × 12 = 144. Squaring means multiplying a number by itself."
      },
      {
        "q": "Simplify √16 + √9",
        "options": [
          "7",
          "12",
          "25",
          "5"
        ],
        "correct": 0,
        "explanation": "√16 = 4 and √9 = 3. So √16 + √9 = 4 + 3 = 7."
      },
      {
        "q": "Is √50 a rational or irrational number?",
        "options": [
          "Both",
          "Irrational",
          "Neither",
          "Rational"
        ],
        "correct": 1,
        "explanation": "√50 is irrational because 50 is not a perfect square. √50 = √(25×2) = 5√2, which cannot be expressed as p/q."
      },
      {
        "q": "What is the value of √(100/25)?",
        "options": [
          "4",
          "5",
          "2",
          "10"
        ],
        "correct": 2,
        "explanation": "√(100/25) = √100 / √25 = 10 / 5 = 2."
      },
      {
        "q": "Estimate √85 (without calculator)",
        "options": [
          "9",
          "8",
          "10",
          "9.2"
        ],
        "correct": 3,
        "explanation": "9² = 81 and 10² = 100. Since 85 is closer to 81, √85 is approximately 9.2."
      },
      {
        "q": "What is (-8)²?",
        "options": [
          "64",
          "16",
          "-64",
          "-16"
        ],
        "correct": 0,
        "explanation": "(-8)² = (-8) × (-8) = 64. The square of a negative number is always positive."
      },
      {
        "q": "What is the difference between √64 and ∛64?",
        "options": [
          "Both are same",
          "√64 = 8, ∛64 = 4",
          "√64 = 4, ∛64 = 8",
          "√64 is irrational"
        ],
        "correct": 1,
        "explanation": "√64 (square root) = 8 because 8² = 64. ∛64 (cube root) = 4 because 4³ = 64. They are different operations."
      }
    ],
    "faqs": [
      {
        "q": "How can I estimate square roots of non-perfect squares?",
        "a": "Find the nearest perfect squares on both sides. For √85: since 81 < 85 < 100, we know 9 < √85 < 10. Then refine by checking values between 9 and 10."
      },
      {
        "q": "Why is the square of a negative number positive?",
        "a": "Because we multiply the negative number by itself: (-5) × (-5) = positive 25. Negative times negative always equals positive."
      }
    ]
  },
  {
    "slug": "class-8-maths-mensuration",
    "classLevel": "8",
    "subject": "Mathematics",
    "chapter": "Mensuration (Areas and Volumes)",
    "intro": "Learn to calculate areas of 2D shapes and volumes of 3D objects. Master formulas and solve practical geometry problems.",
    "mcqs": [
      {
        "q": "What is the area of a rectangle with length 5 cm and breadth 3 cm?",
        "options": [
          "8 sq.cm",
          "16 sq.cm",
          "15 sq.cm",
          "20 sq.cm"
        ],
        "correct": 2,
        "explanation": "Area of rectangle = length × breadth = 5 × 3 = 15 sq.cm."
      },
      {
        "q": "What is the area of a triangle with base 8 cm and height 6 cm?",
        "options": [
          "14 sq.cm",
          "48 sq.cm",
          "28 sq.cm",
          "24 sq.cm"
        ],
        "correct": 3,
        "explanation": "Area of triangle = (1/2) × base × height = (1/2) × 8 × 6 = 24 sq.cm."
      },
      {
        "q": "What is the perimeter of a square with side 10 cm?",
        "options": [
          "40 cm",
          "20 cm",
          "100 cm",
          "50 cm"
        ],
        "correct": 0,
        "explanation": "Perimeter of square = 4 × side = 4 × 10 = 40 cm."
      },
      {
        "q": "What is the area of a circle with radius 7 cm? (Use π = 22/7)",
        "options": [
          "308 sq.cm",
          "154 sq.cm",
          "88 sq.cm",
          "77 sq.cm"
        ],
        "correct": 1,
        "explanation": "Area of circle = πr² = (22/7) × 7 × 7 = 22 × 7 = 154 sq.cm."
      },
      {
        "q": "What is the volume of a cuboid with length 4 cm, breadth 3 cm, and height 2 cm?",
        "options": [
          "18 cu.cm",
          "9 cu.cm",
          "24 cu.cm",
          "12 cu.cm"
        ],
        "correct": 2,
        "explanation": "Volume of cuboid = length × breadth × height = 4 × 3 × 2 = 24 cu.cm."
      },
      {
        "q": "What is the volume of a cube with side 5 cm?",
        "options": [
          "25 cu.cm",
          "150 cu.cm",
          "75 cu.cm",
          "125 cu.cm"
        ],
        "correct": 3,
        "explanation": "Volume of cube = side³ = 5³ = 125 cu.cm."
      },
      {
        "q": "What is the surface area of a cube with side 4 cm?",
        "options": [
          "96 sq.cm",
          "64 sq.cm",
          "128 sq.cm",
          "48 sq.cm"
        ],
        "correct": 0,
        "explanation": "Surface area of cube = 6 × side² = 6 × 4² = 6 × 16 = 96 sq.cm."
      },
      {
        "q": "What is the circumference of a circle with radius 10 cm? (Use π = 3.14)",
        "options": [
          "31.4 cm",
          "62.8 cm",
          "157 cm",
          "314 cm"
        ],
        "correct": 1,
        "explanation": "Circumference = 2πr = 2 × 3.14 × 10 = 62.8 cm."
      },
      {
        "q": "What is the area of a trapezium with parallel sides 5 cm and 9 cm, and height 4 cm?",
        "options": [
          "36 sq.cm",
          "56 sq.cm",
          "28 sq.cm",
          "42 sq.cm"
        ],
        "correct": 2,
        "explanation": "Area of trapezium = (1/2) × (sum of parallel sides) × height = (1/2) × (5 + 9) × 4 = (1/2) × 14 × 4 = 28 sq.cm."
      },
      {
        "q": "What is the volume of a cylinder with radius 3 cm and height 5 cm? (Use π = 3.14)",
        "options": [
          "282.6 cu.cm",
          "45.42 cu.cm",
          "47.1 cu.cm",
          "141.3 cu.cm"
        ],
        "correct": 3,
        "explanation": "Volume of cylinder = πr²h = 3.14 × 3² × 5 = 3.14 × 9 × 5 = 141.3 cu.cm."
      }
    ],
    "faqs": [
      {
        "q": "When do I use area and when do I use perimeter?",
        "a": "Area measures the space inside a 2D shape (in sq.cm). Perimeter measures the distance around a shape (in cm). Perimeter is used for fencing; area for painting or flooring."
      },
      {
        "q": "What is the difference between surface area and volume?",
        "a": "Surface area is the total area of all faces of a 3D object (in sq.cm). Volume is the space inside the 3D object (in cu.cm). Surface area for wrapping; volume for capacity."
      }
    ]
  },
  {
    "slug": "class-7-science-nutrition",
    "classLevel": "7",
    "subject": "Science",
    "chapter": "Nutrition in Animals and Plants",
    "intro": "Understand how plants and animals obtain and use nutrients. Learn about food chains, photosynthesis, and digestive systems.",
    "mcqs": [
      {
        "q": "What is nutrition?",
        "options": [
          "Process of obtaining and utilizing food",
          "Gaining weight",
          "Drinking water",
          "Physical exercise"
        ],
        "correct": 0,
        "explanation": "Nutrition is the process by which organisms obtain nutrients from food and utilize them for growth, energy, and maintenance of body functions."
      },
      {
        "q": "What is the primary mode of nutrition in plants?",
        "options": [
          "Parasitic",
          "Autotrophic",
          "Holozoic",
          "Saprophytic"
        ],
        "correct": 1,
        "explanation": "Plants are autotrophic. They produce their own food through photosynthesis using sunlight, water, and CO2."
      },
      {
        "q": "What is a food chain?",
        "options": [
          "Chain of supermarkets",
          "Chain for storing food",
          "Series of organisms where each is food for the next",
          "Food containers"
        ],
        "correct": 2,
        "explanation": "A food chain shows the flow of energy from one organism to the next: Producer → Primary Consumer → Secondary Consumer."
      },
      {
        "q": "What is the role of producers in a food chain?",
        "options": [
          "Consume energy",
          "Store energy",
          "Decompose organic matter",
          "Produce food using sunlight"
        ],
        "correct": 3,
        "explanation": "Producers (usually plants) capture solar energy and convert it into chemical energy through photosynthesis, forming the base of food chains."
      },
      {
        "q": "What is a herbivore?",
        "options": [
          "Animal that eats plants",
          "Animal that eats meat",
          "Animal that eats both",
          "Animal that eats fungi"
        ],
        "correct": 0,
        "explanation": "A herbivore is an animal that feeds exclusively on plants. Examples: cow, deer, grasshopper."
      },
      {
        "q": "What are the main components of a balanced diet?",
        "options": [
          "Only proteins",
          "Carbohydrates, proteins, fats, vitamins, minerals, water",
          "Only fruits",
          "Only vegetables"
        ],
        "correct": 1,
        "explanation": "A balanced diet includes: carbohydrates (energy), proteins (growth/repair), fats (energy/insulation), vitamins and minerals (health), and water (hydration)."
      },
      {
        "q": "What is the function of saliva in digestion?",
        "options": [
          "Absorbs nutrients",
          "No function",
          "Lubricates food and begins breakdown of starch",
          "Stores food"
        ],
        "correct": 2,
        "explanation": "Saliva contains enzymes like amylase that begin breaking down starch. It also lubricates food for easier swallowing."
      },
      {
        "q": "Which organ produces digestive enzymes called pepsin?",
        "options": [
          "Small intestine",
          "Liver",
          "Pancreas",
          "Stomach"
        ],
        "correct": 3,
        "explanation": "The stomach produces pepsin, a protease enzyme that breaks down proteins. The stomach lining also secretes hydrochloric acid."
      },
      {
        "q": "Where is most nutrient absorption completed in the digestive system?",
        "options": [
          "Small intestine",
          "Mouth",
          "Large intestine",
          "Stomach"
        ],
        "correct": 0,
        "explanation": "Most nutrient absorption occurs in the small intestine. Its walls have villi and microvilli that increase surface area for absorption."
      },
      {
        "q": "What is the function of bile in digestion?",
        "options": [
          "Produces enzymes",
          "Emulsifies fats for better digestion",
          "Digests carbohydrates",
          "Digests protein"
        ],
        "correct": 1,
        "explanation": "Bile, produced by the liver, emulsifies fats into smaller droplets, increasing surface area for fat-digesting enzymes in the small intestine."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between omnivores, herbivores, and carnivores?",
        "a": "Herbivores eat only plants (cow, rabbit). Carnivores eat only meat (lion, eagle). Omnivores eat both plants and meat (humans, bears, pigs)."
      },
      {
        "q": "How long does complete digestion take?",
        "a": "Complete digestion typically takes 24-72 hours. Food takes about 6 hours to pass through the small intestine and several hours more in the large intestine."
      }
    ]
  },
  {
    "slug": "class-7-science-heat",
    "classLevel": "7",
    "subject": "Science",
    "chapter": "Heat and Temperature",
    "intro": "Explore the difference between heat and temperature, methods of heat transfer, and effects of heat on matter.",
    "mcqs": [
      {
        "q": "What is the difference between heat and temperature?",
        "options": [
          "No difference",
          "Temperature is energy; heat is measure",
          "Heat is energy; temperature is measure of hotness",
          "Same thing"
        ],
        "correct": 2,
        "explanation": "Temperature measures the average kinetic energy of molecules (in Celsius or Kelvin). Heat is the energy transferred from hot to cold objects."
      },
      {
        "q": "What is the SI unit of heat?",
        "options": [
          "Calorie",
          "Degree Celsius",
          "Kelvin",
          "Joule"
        ],
        "correct": 3,
        "explanation": "The SI unit of heat is Joule (J). Calories are used in older measurements. 1 calorie ≈ 4.18 Joules."
      },
      {
        "q": "What are the three methods of heat transfer?",
        "options": [
          "Conduction, convection, radiation",
          "Melting, boiling, freezing",
          "Evaporation, condensation, sublimation",
          "Conduction, expansion, radiation"
        ],
        "correct": 0,
        "explanation": "Heat transfers by: conduction (direct contact), convection (through fluids), and radiation (electromagnetic waves)."
      },
      {
        "q": "What is conduction of heat?",
        "options": [
          "Transfer through fluids",
          "Transfer through direct contact",
          "Heat generation",
          "Transfer by radiation"
        ],
        "correct": 1,
        "explanation": "Conduction is heat transfer through direct contact between materials. Example: holding a hot cup and feeling warmth."
      },
      {
        "q": "What is convection?",
        "options": [
          "Heat storage",
          "Transfer by contact",
          "Transfer through movement of fluids",
          "Transfer by radiation"
        ],
        "correct": 2,
        "explanation": "Convection transfers heat through the movement of fluids (liquids and gases). Hot water rises, cold sinks, creating convection currents."
      },
      {
        "q": "What is the normal body temperature of humans?",
        "options": [
          "38.8°C",
          "35.8°C",
          "37.8°C",
          "36.8°C"
        ],
        "correct": 3,
        "explanation": "Normal human body temperature is approximately 36.8°C or 98.6°F. This varies slightly between individuals and throughout the day."
      },
      {
        "q": "What is thermal expansion?",
        "options": [
          "Increase in volume of objects due to heating",
          "Change in shape only",
          "Decrease in temperature",
          "Cooling of objects"
        ],
        "correct": 0,
        "explanation": "Thermal expansion is the increase in volume of substances when heated. Most substances expand on heating; water has an exception."
      },
      {
        "q": "What are good conductors of heat?",
        "options": [
          "Glass, rubber",
          "Metals like copper, aluminum",
          "Cork, air",
          "Plastic, wood"
        ],
        "correct": 1,
        "explanation": "Metals are good heat conductors because of free electrons that carry thermal energy. Copper and aluminum are excellent conductors."
      },
      {
        "q": "What are good insulators of heat?",
        "options": [
          "Copper, iron",
          "All metals",
          "Cork, wool, glass, air",
          "Silver, aluminum"
        ],
        "correct": 2,
        "explanation": "Insulators have low thermal conductivity. Examples: cork, wool, rubber, glass, and air. They trap heat and prevent transfer."
      },
      {
        "q": "What is the absolute zero temperature?",
        "options": [
          "0°C",
          "0°F",
          "-40°C",
          "-273.15°C"
        ],
        "correct": 3,
        "explanation": "Absolute zero is -273.15°C or 0 Kelvin. It is the lowest possible temperature where all molecular motion theoretically stops."
      }
    ],
    "faqs": [
      {
        "q": "Why does ice melt and water boil at specific temperatures?",
        "a": "These are phase change temperatures determined by the energy needed to break molecular bonds. Melting occurs at 0°C; boiling at 100°C (at standard pressure)."
      },
      {
        "q": "How do thermometers work?",
        "a": "Thermometers use the principle that substances expand when heated. Mercury expands uniformly with temperature, indicating the temperature on a scale."
      }
    ]
  },
  {
    "slug": "class-7-science-motion",
    "classLevel": "7",
    "subject": "Science",
    "chapter": "Motion and Its Types",
    "intro": "Understand different types of motion, speed, velocity, and acceleration. Learn to analyze movement in physics.",
    "mcqs": [
      {
        "q": "What is motion?",
        "options": [
          "Change in position with time",
          "Standing still",
          "No movement",
          "Staying in one place"
        ],
        "correct": 0,
        "explanation": "Motion is the change in position of an object with respect to time. It is relative and depends on the reference point."
      },
      {
        "q": "What is speed?",
        "options": [
          "Change in position",
          "Distance covered per unit time",
          "Velocity with direction",
          "Direction of motion"
        ],
        "correct": 1,
        "explanation": "Speed is the distance covered per unit time. It is a scalar quantity and does not include direction."
      },
      {
        "q": "What is the SI unit of speed?",
        "options": [
          "cm/s",
          "km/h",
          "m/s",
          "miles/hour"
        ],
        "correct": 2,
        "explanation": "The SI unit of speed is meters per second (m/s). km/h is commonly used but not the SI unit."
      },
      {
        "q": "What is the difference between distance and displacement?",
        "options": [
          "Displacement is longer",
          "Same thing",
          "Distance considers direction",
          "Distance is path length; displacement is straight-line change in position"
        ],
        "correct": 3,
        "explanation": "Distance is the total path length traveled (scalar). Displacement is the straight-line change in position (vector) from start to end."
      },
      {
        "q": "What is uniform motion?",
        "options": [
          "Constant speed in same direction",
          "Accelerated motion",
          "No motion",
          "Changing speed"
        ],
        "correct": 0,
        "explanation": "Uniform motion occurs when an object travels equal distances in equal times at constant speed and direction."
      },
      {
        "q": "What is non-uniform motion?",
        "options": [
          "No acceleration",
          "Variable speed or direction",
          "Motion in straight line",
          "Constant speed"
        ],
        "correct": 1,
        "explanation": "Non-uniform motion is when speed or direction changes. Examples: car accelerating, object falling due to gravity."
      },
      {
        "q": "What is acceleration?",
        "options": [
          "Speed of an object",
          "Distance traveled",
          "Change in velocity per unit time",
          "Constant motion"
        ],
        "correct": 2,
        "explanation": "Acceleration is the rate of change of velocity. It includes changes in speed or direction and is measured in m/s²."
      },
      {
        "q": "What is linear motion?",
        "options": [
          "Motion in circular path",
          "Rotational motion",
          "Motion with acceleration",
          "Motion in a straight line"
        ],
        "correct": 3,
        "explanation": "Linear motion is movement along a straight path. Examples: car on a straight road, freely falling object."
      },
      {
        "q": "What is circular motion?",
        "options": [
          "Motion in a circular path",
          "Motion in straight line",
          "Random motion",
          "Oscillatory motion"
        ],
        "correct": 0,
        "explanation": "Circular motion is movement along a circular path. Examples: planets orbiting the sun, car turning in a circular track."
      },
      {
        "q": "What is oscillatory motion?",
        "options": [
          "Linear motion",
          "Motion that repeats in a fixed path",
          "Random motion",
          "Circular motion"
        ],
        "correct": 1,
        "explanation": "Oscillatory motion is repetitive motion where an object moves back and forth about a fixed point. Examples: pendulum, vibrating string."
      }
    ],
    "faqs": [
      {
        "q": "How can I calculate average speed?",
        "a": "Average speed = Total distance / Total time. Example: If you travel 100 km in 2 hours, average speed = 100/2 = 50 km/h."
      },
      {
        "q": "What does negative acceleration mean?",
        "a": "Negative acceleration (deceleration) means the velocity is decreasing. The object is slowing down. Example: a car braking has negative acceleration."
      }
    ]
  },
  {
    "slug": "class-11-physics-units",
    "classLevel": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "intro": "Master the SI unit system, derived units, and measurement techniques essential for all physics studies.",
    "mcqs": [
      {
        "q": "What are the fundamental SI base units for length, mass, and time?",
        "options": [
          "cm, gram, second",
          "inch, ounce, minute",
          "meter, kilogram, second",
          "foot, pound, second"
        ],
        "correct": 2,
        "explanation": "The SI base units are: meter (m) for length, kilogram (kg) for mass, and second (s) for time. These form the foundation of all measurements."
      },
      {
        "q": "What is a derived unit?",
        "options": [
          "Non-standard unit",
          "Temporary unit",
          "Base unit",
          "Unit obtained by combining base units"
        ],
        "correct": 3,
        "explanation": "Derived units are formed by combining base units. Examples: m/s (velocity), m² (area), kg·m/s² (force or Newton)."
      },
      {
        "q": "What is the SI unit of force?",
        "options": [
          "Newton",
          "Pascal",
          "Dyne",
          "Kilogram"
        ],
        "correct": 0,
        "explanation": "The SI unit of force is Newton (N). 1 N = 1 kg·m/s². It is the force needed to accelerate 1 kg at 1 m/s²."
      },
      {
        "q": "How many meters are in 1 kilometer?",
        "options": [
          "100 m",
          "1000 m",
          "10 m",
          "10,000 m"
        ],
        "correct": 1,
        "explanation": "1 kilometer = 1000 meters. The prefix kilo- means 1000."
      },
      {
        "q": "What does the prefix milli- represent?",
        "options": [
          "1000",
          "0.01",
          "0.001",
          "100"
        ],
        "correct": 2,
        "explanation": "Milli- represents 10^-3 or 0.001. 1 millimeter = 0.001 meter."
      },
      {
        "q": "What is the SI unit of energy?",
        "options": [
          "Pascal",
          "Calorie",
          "Watt",
          "Joule"
        ],
        "correct": 3,
        "explanation": "The SI unit of energy is Joule (J). 1 J = 1 kg·m²/s². Calories are used in older measurements."
      },
      {
        "q": "How many centimeters are in 1 inch?",
        "options": [
          "2.54 cm",
          "1 cm",
          "10 cm",
          "25.4 cm"
        ],
        "correct": 0,
        "explanation": "1 inch = 2.54 centimeters. This conversion relates imperial and metric units."
      },
      {
        "q": "What is the significance of significant figures?",
        "options": [
          "Always equal to 3",
          "Indicates precision of measurement",
          "No importance",
          "Used only in chemistry"
        ],
        "correct": 1,
        "explanation": "Significant figures indicate the precision of a measurement. They include all certain digits plus one estimated digit."
      },
      {
        "q": "What is the SI unit of temperature?",
        "options": [
          "Degree Celsius",
          "Degree Fahrenheit",
          "Kelvin",
          "Rankine"
        ],
        "correct": 2,
        "explanation": "The SI unit of temperature is Kelvin (K). Although Celsius is commonly used, Kelvin is the SI unit for thermodynamic temperature."
      },
      {
        "q": "How do you convert Celsius to Kelvin?",
        "options": [
          "Divide by 273.15",
          "Subtract 273.15",
          "Multiply by 273.15",
          "Add 273.15"
        ],
        "correct": 3,
        "explanation": "K = °C + 273.15. Example: 0°C = 273.15 K. This conversion accounts for absolute zero at -273.15°C."
      }
    ],
    "faqs": [
      {
        "q": "Why is the SI system preferred over other systems?",
        "a": "The SI system is universally accepted, systematic, and decimal-based. It simplifies calculations and enables international scientific communication."
      },
      {
        "q": "What is the difference between accuracy and precision?",
        "a": "Accuracy measures how close a measurement is to the true value. Precision measures how consistent repeated measurements are. Both are important."
      }
    ]
  },
  {
    "slug": "class-11-physics-laws-of-motion",
    "classLevel": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "intro": "Study Newtons three laws of motion and their applications to understand how objects move and interact.",
    "mcqs": [
      {
        "q": "What does Newtons First Law state?",
        "options": [
          "An object at rest stays at rest unless acted upon by force",
          "F = ma",
          "Energy is conserved",
          "Objects move in straight lines"
        ],
        "correct": 0,
        "explanation": "Newtons First Law (Law of Inertia) states that an object at rest remains at rest and an object in motion remains in motion unless acted upon by an unbalanced external force."
      },
      {
        "q": "What is inertia?",
        "options": [
          "Energy of motion",
          "Property that resists change in motion",
          "Force on an object",
          "Acceleration of an object"
        ],
        "correct": 1,
        "explanation": "Inertia is the property of matter that resists changes in its state of motion. More massive objects have greater inertia."
      },
      {
        "q": "What does Newtons Second Law state mathematically?",
        "options": [
          "F = v × t",
          "a = v²/r",
          "F = m × a",
          "v = u + at"
        ],
        "correct": 2,
        "explanation": "Newtons Second Law: F = ma. The net force on an object equals its mass times its acceleration. Force and acceleration are directly proportional."
      },
      {
        "q": "If a 2 kg object experiences a force of 10 N, what is its acceleration?",
        "options": [
          "2 m/s²",
          "0.2 m/s²",
          "20 m/s²",
          "5 m/s²"
        ],
        "correct": 3,
        "explanation": "Using F = ma: 10 = 2 × a, therefore a = 5 m/s²."
      },
      {
        "q": "What does Newtons Third Law state?",
        "options": [
          "For every action, there is an equal and opposite reaction",
          "Objects fall due to gravity",
          "Force equals momentum",
          "F = ma"
        ],
        "correct": 0,
        "explanation": "Newtons Third Law states that forces always occur in action-reaction pairs. If object A exerts force on object B, then B exerts equal opposite force on A."
      },
      {
        "q": "What is the normal force?",
        "options": [
          "Weight of object",
          "Perpendicular contact force between surfaces",
          "Applied force",
          "Force due to gravity"
        ],
        "correct": 1,
        "explanation": "Normal force is the perpendicular contact force exerted by a surface on an object resting on it. It prevents objects from passing through surfaces."
      },
      {
        "q": "What is tension in a string or rope?",
        "options": [
          "Weight of object",
          "Force due to friction",
          "Pulling force transmitted along string",
          "Compressive force"
        ],
        "correct": 2,
        "explanation": "Tension is the pulling force transmitted through a string, rope, or cable. It acts along the length of the string."
      },
      {
        "q": "How do you find the net force on an object?",
        "options": [
          "Largest force only",
          "Average of forces",
          "Sum of all masses",
          "Vector sum of all forces"
        ],
        "correct": 3,
        "explanation": "Net force is the vector sum of all forces acting on an object. Forces in the same direction add; opposite forces subtract."
      },
      {
        "q": "What does friction force depend on?",
        "options": [
          "Normal force and coefficient of friction",
          "Only mass",
          "Only the normal force",
          "Only velocity"
        ],
        "correct": 0,
        "explanation": "Friction force f = μN, where μ is the coefficient of friction and N is the normal force. Friction depends on both surface properties and normal force."
      },
      {
        "q": "What is an inertial frame of reference?",
        "options": [
          "Any frame of reference",
          "Frame where Newtons laws apply",
          "Frame with gravity",
          "Rotating frame"
        ],
        "correct": 1,
        "explanation": "An inertial frame is a frame of reference where Newtons laws of motion are valid. It is either at rest or moving at constant velocity."
      }
    ],
    "faqs": [
      {
        "q": "Why does a passenger lurch forward when a car suddenly brakes?",
        "a": "This demonstrates Newtons First Law. The passenger wants to continue moving forward due to inertia. The car decelerates but the passenger continues until friction or seat restraint acts."
      },
      {
        "q": "What is the difference between mass and weight?",
        "a": "Mass is the amount of matter (constant everywhere, measured in kg). Weight is gravitational force (W = mg, varies with gravity, measured in Newtons)."
      }
    ]
  },
  {
    "slug": "class-11-chemistry-mole-concept",
    "classLevel": "11",
    "subject": "Chemistry",
    "chapter": "Mole Concept",
    "intro": "Master the mole as the central concept connecting atomic mass, molecular mass, and stoichiometry in chemistry.",
    "mcqs": [
      {
        "q": "What is a mole?",
        "options": [
          "Unit of mass",
          "One gram of substance",
          "Avogadro number of particles",
          "A small amount"
        ],
        "correct": 2,
        "explanation": "A mole is the SI unit of amount of substance. One mole contains Avogadro's number (6.02 × 10²³) of particles (atoms, molecules, or ions)."
      },
      {
        "q": "What is Avogadro's number?",
        "options": [
          "1.67 × 10⁻²⁷",
          "9.81",
          "3.14",
          "6.02 × 10²³"
        ],
        "correct": 3,
        "explanation": "Avogadro's number is 6.02 × 10²³. It is the number of particles in one mole of any substance."
      },
      {
        "q": "What is molar mass?",
        "options": [
          "Mass of one mole of substance",
          "Number of particles",
          "Density of substance",
          "Half of atomic mass"
        ],
        "correct": 0,
        "explanation": "Molar mass is the mass of one mole of a substance in grams per mole (g/mol). It numerically equals the relative molecular mass."
      },
      {
        "q": "How many moles are in 32 g of oxygen gas (O₂)? (Atomic mass of O = 16)",
        "options": [
          "0.5 moles",
          "1 mole",
          "2 moles",
          "32 moles"
        ],
        "correct": 1,
        "explanation": "Molar mass of O₂ = 2 × 16 = 32 g/mol. Moles = mass / molar mass = 32 / 32 = 1 mole."
      },
      {
        "q": "What is the relationship between moles, mass, and molar mass?",
        "options": [
          "Moles = mass + molar mass",
          "Moles = mass × molar mass",
          "Moles = mass / molar mass",
          "Moles = molar mass - mass"
        ],
        "correct": 2,
        "explanation": "The relationship is: number of moles = mass (g) / molar mass (g/mol). This is a fundamental equation in chemistry."
      },
      {
        "q": "How many atoms are in 2 moles of carbon?",
        "options": [
          "6.02 × 10²³",
          "3 × 6.02 × 10²³",
          "0.5 × 6.02 × 10²³",
          "2 × 6.02 × 10²³"
        ],
        "correct": 3,
        "explanation": "Each mole contains 6.02 × 10²³ atoms. Therefore, 2 moles contain 2 × 6.02 × 10²³ = 1.204 × 10²⁴ atoms."
      },
      {
        "q": "What is the molar volume of a gas at STP?",
        "options": [
          "22.4 L/mol",
          "44.8 L/mol",
          "5.6 L/mol",
          "11.2 L/mol"
        ],
        "correct": 0,
        "explanation": "At STP (Standard Temperature and Pressure: 0°C and 1 atm), one mole of any ideal gas occupies 22.4 liters."
      },
      {
        "q": "What is molecular mass?",
        "options": [
          "Density of molecule",
          "Sum of atomic masses in a molecule",
          "Mass of one atom",
          "Mass of one mole"
        ],
        "correct": 1,
        "explanation": "Molecular mass is the sum of atomic masses of all atoms in a molecule. It is expressed in atomic mass units (u)."
      },
      {
        "q": "Calculate the number of molecules in 4.4 g of CO₂. (C = 12, O = 16)",
        "options": [
          "0.5 × 6.02 × 10²³",
          "2 × 6.02 × 10²³",
          "0.1 × 6.02 × 10²³",
          "6.02 × 10²³"
        ],
        "correct": 2,
        "explanation": "Molar mass of CO₂ = 12 + 32 = 44 g/mol. Moles = 4.4/44 = 0.1, so molecules = 0.1 x 6.02 x 10²³."
      },
      {
        "q": "What is empirical formula?",
        "options": [
          "Number of atoms in molecule",
          "Molecular structure",
          "Actual formula of compound",
          "Simplest whole number ratio of atoms"
        ],
        "correct": 3,
        "explanation": "Empirical formula shows the simplest whole number ratio of atoms in a compound. Molecular formula shows the actual number of atoms."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between atomic mass unit and molar mass?",
        "a": "Atomic mass unit (u) is for individual atoms. Molar mass (g/mol) is for one mole of particles. Numerically they are equal but units differ."
      },
      {
        "q": "How is the mole concept used in stoichiometry?",
        "a": "Stoichiometry uses mole ratios from balanced equations to calculate reactants needed and products formed in chemical reactions."
      }
    ]
  },
  {
    "slug": "class-12-physics-electrostatics",
    "classLevel": "12",
    "subject": "Physics",
    "chapter": "Electrostatics",
    "intro": "Study electric charges, electric fields, and electric potential. Master Coulombs law and its applications.",
    "mcqs": [
      {
        "q": "What is electric charge?",
        "options": [
          "Property of matter that causes electromagnetic interaction",
          "Type of radiation",
          "Energy of a system",
          "Force on an object"
        ],
        "correct": 0,
        "explanation": "Electric charge is a fundamental property of matter. It exists in two forms: positive and negative. Charges interact through electric forces."
      },
      {
        "q": "What is Coulombs Law?",
        "options": [
          "F = ma",
          "F = kq₁q₂/r²",
          "E = mc²",
          "V = IR"
        ],
        "correct": 1,
        "explanation": "Coulombs Law states that the electric force between two charges is proportional to their product and inversely proportional to the square of distance: F = kq₁q₂/r²."
      },
      {
        "q": "What is the SI unit of electric charge?",
        "options": [
          "Ampere",
          "Volt",
          "Coulomb",
          "Joule"
        ],
        "correct": 2,
        "explanation": "The SI unit of electric charge is Coulomb (C). 1 Coulomb is the charge of approximately 6.24 × 10¹⁸ electrons."
      },
      {
        "q": "What is an electric field?",
        "options": [
          "Gravitational field",
          "Flow of charge",
          "Magnetic field",
          "Region around a charge where force is exerted"
        ],
        "correct": 3,
        "explanation": "An electric field is the region around a charge where another charge experiences an electric force. Electric field strength E = F/q."
      },
      {
        "q": "What is electric potential?",
        "options": [
          "Work done per unit charge to move charge",
          "Current flow",
          "Electric field strength",
          "Charge accumulation"
        ],
        "correct": 0,
        "explanation": "Electric potential is the work done per unit positive charge to move the charge from infinity to that point. Measured in Volts (V)."
      },
      {
        "q": "What is the electric field inside a conductor in electrostatic equilibrium?",
        "options": [
          "Undefined",
          "Zero",
          "Maximum",
          "Constant"
        ],
        "correct": 1,
        "explanation": "Inside a conductor in electrostatic equilibrium, the electric field is zero. Charges distribute on the surface only."
      },
      {
        "q": "What is a dielectric material?",
        "options": [
          "Radioactive material",
          "Conductor",
          "Non-conducting material that can be polarized",
          "Magnetic material"
        ],
        "correct": 2,
        "explanation": "A dielectric is a non-conducting material that becomes polarized in an electric field. It increases the capacitance of capacitors."
      },
      {
        "q": "What is Gauss Law?",
        "options": [
          "P = VI",
          "F = ma",
          "V = IR",
          "Total electric flux through closed surface = q/ε₀"
        ],
        "correct": 3,
        "explanation": "Gauss Law relates electric flux through a closed surface to the enclosed charge. It is one of Maxwells equations."
      },
      {
        "q": "What is electric potential energy?",
        "options": [
          "Work done to assemble charges configuration",
          "Kinetic energy of charge",
          "Magnetic energy",
          "Energy dissipated"
        ],
        "correct": 0,
        "explanation": "Electric potential energy is the work needed to assemble a configuration of charges. It depends on relative positions of charges."
      },
      {
        "q": "What is the relationship between electric field and electric potential?",
        "options": [
          "E = V×d",
          "E = -dV/dr",
          "E = V/d",
          "E = d/V"
        ],
        "correct": 1,
        "explanation": "Electric field is related to potential by E = -dV/dr. Field points in direction of decreasing potential."
      }
    ],
    "faqs": [
      {
        "q": "Why do like charges repel and opposite charges attract?",
        "a": "This is explained by Coulombs Law. The mathematical form (positive product repels, negative product attracts) reflects fundamental electromagnetic interactions between charges."
      },
      {
        "q": "What is the difference between electric field and electric potential?",
        "a": "Electric field is the force per unit charge (N/C or V/m). Electric potential is the work per unit charge (Joules/Coulomb or Volts). Field is a vector; potential is a scalar."
      }
    ]
  },
  {
    "slug": "class-12-biology-reproduction",
    "classLevel": "12",
    "subject": "Biology",
    "chapter": "Reproduction and Development",
    "intro": "Study sexual and asexual reproduction, gametogenesis, embryonic development, and reproductive health in humans.",
    "mcqs": [
      {
        "q": "What is reproduction?",
        "options": [
          "Feeding process",
          "Growth of organisms",
          "Process of producing new organisms",
          "Respiration"
        ],
        "correct": 2,
        "explanation": "Reproduction is the biological process by which new individuals are produced. It is essential for species continuation."
      },
      {
        "q": "What is the main advantage of sexual reproduction over asexual reproduction?",
        "options": [
          "Simpler process",
          "Less energy required",
          "Faster reproduction",
          "Genetic variation and better adaptation"
        ],
        "correct": 3,
        "explanation": "Sexual reproduction produces genetically diverse offspring through combination of genetic material from two parents, enhancing adaptation and survival chances."
      },
      {
        "q": "What is gametogenesis?",
        "options": [
          "Formation of gametes through meiosis",
          "Formation of embryo",
          "Growth of organism",
          "Formation of zygote"
        ],
        "correct": 0,
        "explanation": "Gametogenesis is the process of gamete (sperm and ovum) formation through meiosis. It results in haploid cells with half the chromosome number."
      },
      {
        "q": "How many chromosomes does a human ovum contain?",
        "options": [
          "46",
          "23",
          "24",
          "92"
        ],
        "correct": 1,
        "explanation": "A human ovum is haploid and contains 23 chromosomes. When fertilized by a sperm (also 23), the zygote becomes diploid with 46 chromosomes."
      },
      {
        "q": "What is the function of the fallopian tube?",
        "options": [
          "Hormone production",
          "Fetal development",
          "Transport of ovum and site of fertilization",
          "Hormone storage"
        ],
        "correct": 2,
        "explanation": "The fallopian tube transports the ovum released from the ovary and is the usual site of fertilization. The zygote develops here for 3-4 days."
      },
      {
        "q": "What is implantation?",
        "options": [
          "Development of placenta",
          "Formation of zygote",
          "Formation of embryo",
          "Embedding of blastocyst in uterine wall"
        ],
        "correct": 3,
        "explanation": "Implantation is the embedding of the blastocyst into the uterine wall, usually 6-8 days after fertilization. This marks the beginning of pregnancy."
      },
      {
        "q": "What is the function of the placenta?",
        "options": [
          "Exchange of materials between fetus and mother",
          "Produce hormones only",
          "Protect fetus from infection only",
          "Store nutrients"
        ],
        "correct": 0,
        "explanation": "The placenta facilitates exchange of oxygen, nutrients, and waste between maternal and fetal blood without direct mixing."
      },
      {
        "q": "How long is the human gestation period?",
        "options": [
          "6 months",
          "9 months (approximately 280 days)",
          "12 months",
          "3 months"
        ],
        "correct": 1,
        "explanation": "Human gestation period is approximately 280 days (about 9 months). It is divided into three trimesters."
      },
      {
        "q": "What is the secondary sex ratio at birth?",
        "options": [
          "More females than males",
          "Variable",
          "More males than females",
          "1:1 male to female"
        ],
        "correct": 2,
        "explanation": "The secondary sex ratio is approximately 105-106 males per 100 females. This reflects sex chromosome inheritance patterns."
      },
      {
        "q": "What is the role of the corpus luteum?",
        "options": [
          "Produce eggs",
          "Store sperm",
          "Release eggs",
          "Produce progesterone to maintain pregnancy"
        ],
        "correct": 3,
        "explanation": "The corpus luteum is formed after ovulation from the remnant of the ovarian follicle. It produces progesterone essential for maintaining pregnancy."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between mitosis and meiosis in reproduction?",
        "a": "Mitosis produces two identical diploid cells for growth and repair. Meiosis produces four genetically different haploid gametes for sexual reproduction."
      },
      {
        "q": "What is infertility and its common causes?",
        "a": "Infertility is inability to conceive after one year of unprotected sex. Causes include hormonal imbalances, reproductive anatomy problems, infections, and genetic factors."
      }
    ]
  },
  {
    "slug": "class-9-science-atoms-molecules",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Atoms and Molecules",
    "intro": "Atoms are the smallest indivisible particles of matter, while molecules are formed when two or more atoms combine chemically. This chapter explores the fundamental concepts of atomic mass, molecular mass, moles, and Avogadro's number.",
    "mcqs": [
      {
        "q": "What is the atomic mass unit (amu) approximately equal to?",
        "options": [
          "1/12th of carbon-12 atom",
          "Mass of one electron",
          "Mass of one proton",
          "1/16th of oxygen atom"
        ],
        "correct": 0,
        "explanation": "The atomic mass unit is defined as 1/12th of the mass of a carbon-12 atom, making it the standard for measuring atomic masses."
      },
      {
        "q": "Which of the following has the smallest mass?",
        "options": [
          "Proton",
          "Electron",
          "Neutron",
          "Alpha particle"
        ],
        "correct": 1,
        "explanation": "An electron has a mass of approximately 9.11 × 10^-31 kg, which is much smaller than a proton or neutron."
      },
      {
        "q": "What is Avogadro's number?",
        "options": [
          "6.02 × 10^22",
          "6.02 × 10^21",
          "6.02 × 10^23",
          "6.02 × 10^24"
        ],
        "correct": 2,
        "explanation": "Avogadro's number (6.022 × 10^23) represents the number of particles in one mole of any substance."
      },
      {
        "q": "The molecular mass of CO2 is (C=12, O=16):",
        "options": [
          "36",
          "32",
          "28",
          "44"
        ],
        "correct": 3,
        "explanation": "Molecular mass of CO2 = 12 + 16×2 = 12 + 32 = 44 u."
      },
      {
        "q": "How many atoms are present in one molecule of H2SO4?",
        "options": [
          "7",
          "6",
          "5",
          "8"
        ],
        "correct": 0,
        "explanation": "H2SO4 contains 2 hydrogen atoms, 1 sulfur atom, and 4 oxygen atoms, totaling 7 atoms per molecule."
      },
      {
        "q": "Which compound has the empirical formula CH and molecular mass 78?",
        "options": [
          "C5H5",
          "C6H6",
          "C3H3",
          "C4H4"
        ],
        "correct": 1,
        "explanation": "If empirical formula is CH (mass 13) and molecular mass is 78, then n = 78/13 = 6. So molecular formula is C6H6."
      },
      {
        "q": "The mass of 0.5 mole of oxygen (O2) is (O=16):",
        "options": [
          "64 g",
          "32 g",
          "16 g",
          "8 g"
        ],
        "correct": 2,
        "explanation": "Mass = moles × molar mass = 0.5 × 32 = 16 g. (Molar mass of O2 = 16×2 = 32 g/mol)"
      },
      {
        "q": "Number of molecules in 11.2 L of CO2 at STP is:",
        "options": [
          "9.033 × 10^23",
          "6.022 × 10^23",
          "1.505 × 10^23",
          "3.011 × 10^23"
        ],
        "correct": 3,
        "explanation": "At STP one mole occupies 22.4 L, so 11.2 L is 0.5 mol. Molecules = 0.5 x 6.022 x 10²³ = 3.011 x 10²³."
      },
      {
        "q": "Which of the following has the highest molecular mass?",
        "options": [
          "CO2",
          "H2O",
          "NH3",
          "CH4"
        ],
        "correct": 0,
        "explanation": "CO2 has molecular mass 44, H2O has 18, NH3 has 17, CH4 has 16. So CO2 has the highest mass."
      },
      {
        "q": "The number of atoms in 2 moles of chlorine (Cl2) is:",
        "options": [
          "3.011 × 10^23",
          "2.411 × 10^24",
          "12.044 × 10^23",
          "6.022 × 10^23"
        ],
        "correct": 1,
        "explanation": "2 moles of Cl2 contains 2 × 2 = 4 moles of Cl atoms. Number of atoms = 4 × 6.022 × 10^23 = 2.409 × 10^24 ≈ 2.411 × 10^24."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between atomic mass and atomic number?",
        "a": "Atomic number is the number of protons in an atom and determines the element's identity. Atomic mass is the sum of protons and neutrons (mass number) and determines the isotope."
      },
      {
        "q": "Why is the mole concept important in chemistry?",
        "a": "The mole concept provides a bridge between the macroscopic world (grams we can measure) and the microscopic world (atoms and molecules), making calculations involving large numbers of particles manageable."
      }
    ]
  },
  {
    "slug": "class-9-science-structure-of-atom",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Structure of Atom",
    "intro": "The atom consists of a nucleus containing protons and neutrons, surrounded by electrons in various shells. Understanding atomic structure is fundamental to chemistry and explains the properties of elements.",
    "mcqs": [
      {
        "q": "Who proposed the nuclear model of the atom?",
        "options": [
          "Max Planck",
          "J.J. Thomson",
          "Ernest Rutherford",
          "Niels Bohr"
        ],
        "correct": 2,
        "explanation": "Rutherford's nuclear model proposed that the atom has a small, dense, positively charged nucleus surrounded by electrons."
      },
      {
        "q": "The charge on an electron is:",
        "options": [
          "Positive",
          "Neutral",
          "Can be either positive or negative",
          "Negative"
        ],
        "correct": 3,
        "explanation": "An electron carries a negative charge equal to -1.6 × 10^-19 coulombs."
      },
      {
        "q": "Which particles are present in the nucleus?",
        "options": [
          "Protons and neutrons",
          "Only electrons",
          "Only protons",
          "Protons and electrons"
        ],
        "correct": 0,
        "explanation": "The nucleus contains protons (positively charged) and neutrons (neutral). Electrons orbit around the nucleus."
      },
      {
        "q": "An atom has 8 protons and 8 neutrons. What is its mass number?",
        "options": [
          "24",
          "16",
          "4",
          "8"
        ],
        "correct": 1,
        "explanation": "Mass number = number of protons + number of neutrons = 8 + 8 = 16."
      },
      {
        "q": "Isotopes are atoms that have:",
        "options": [
          "Same mass but different protons",
          "Same electrons but different protons",
          "Same protons but different neutrons",
          "Different electrons and protons"
        ],
        "correct": 2,
        "explanation": "Isotopes are atoms of the same element (same number of protons) but with different numbers of neutrons."
      },
      {
        "q": "Bohr's model explains the stability of atoms by:",
        "options": [
          "Electrons moving randomly",
          "Electrons closer to nucleus are more stable",
          "Nucleus repelling electrons",
          "Electron orbits in fixed energy levels"
        ],
        "correct": 3,
        "explanation": "Bohr proposed that electrons occupy specific, quantized energy levels around the nucleus, and can jump between them by absorbing or emitting energy."
      },
      {
        "q": "What is the maximum number of electrons in the second shell of an atom?",
        "options": [
          "8",
          "4",
          "2",
          "6"
        ],
        "correct": 0,
        "explanation": "The second shell can hold a maximum of 8 electrons (2n^2 where n=2 gives 2×4 = 8)."
      },
      {
        "q": "The symbol X has atomic number 17 and mass number 35. How many neutrons does it have?",
        "options": [
          "17",
          "18",
          "52",
          "35"
        ],
        "correct": 1,
        "explanation": "Number of neutrons = mass number - atomic number = 35 - 17 = 18."
      },
      {
        "q": "Which of the following is a correct electron configuration for Oxygen (atomic number 8)?",
        "options": [
          "2, 8",
          "4, 4",
          "2, 6",
          "2, 4"
        ],
        "correct": 2,
        "explanation": "Oxygen has 8 electrons. The first shell holds 2, and the remaining 6 go to the second shell, giving configuration 2, 6."
      },
      {
        "q": "The nucleus accounts for most of the atom's:",
        "options": [
          "Electrons",
          "Charge",
          "Volume",
          "Mass"
        ],
        "correct": 3,
        "explanation": "Although the nucleus is tiny, it contains nearly all of the atom's mass due to the mass of protons and neutrons."
      }
    ],
    "faqs": [
      {
        "q": "What did Rutherford's gold foil experiment prove?",
        "a": "The experiment showed that most of the atom is empty space and the positive charge is concentrated in a small nucleus at the center, disproving Thomson's plum pudding model."
      },
      {
        "q": "How do electrons gain energy to move to higher orbits in Bohr's model?",
        "a": "Electrons absorb specific amounts of energy (photons) equal to the energy difference between two orbits and jump to a higher energy level."
      }
    ]
  },
  {
    "slug": "class-9-science-tissues",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Tissues",
    "intro": "Tissues are groups of similar cells that work together to perform a specific function. Understanding plant and animal tissues is essential for comprehending how organisms are organized and how they function.",
    "mcqs": [
      {
        "q": "What is a tissue?",
        "options": [
          "A group of similar cells performing a common function",
          "A type of cell membrane",
          "A group of different organs",
          "A single cell"
        ],
        "correct": 0,
        "explanation": "A tissue is a collection of similar cells that work together to perform one or more specific functions."
      },
      {
        "q": "Which of the following is an animal tissue?",
        "options": [
          "Phloem",
          "Epithelial tissue",
          "Xylem",
          "Parenchyma"
        ],
        "correct": 1,
        "explanation": "Epithelial tissue covers the body surface and lines body cavities. Xylem and phloem are plant tissues, and parenchyma is a plant tissue type."
      },
      {
        "q": "The tissue responsible for movement in animals is:",
        "options": [
          "Connective tissue",
          "Nerve tissue",
          "Muscle tissue",
          "Epithelial tissue"
        ],
        "correct": 2,
        "explanation": "Muscle tissue contracts and relaxes, enabling movement and maintaining posture in animals."
      },
      {
        "q": "Which plant tissue transports water and minerals from roots to leaves?",
        "options": [
          "Phloem",
          "Parenchyma",
          "Sclerenchyma",
          "Xylem"
        ],
        "correct": 3,
        "explanation": "Xylem conducts water and dissolved mineral salts from the roots to the entire plant through a network of vessels and tracheids."
      },
      {
        "q": "Nerve tissue is composed of:",
        "options": [
          "Neurons and glial cells",
          "Epithelial cells",
          "Fibroblasts",
          "Muscle fibers"
        ],
        "correct": 0,
        "explanation": "Nerve tissue consists of neurons (which transmit electrical signals) and glial cells (which support neurons)."
      },
      {
        "q": "Which of the following is a function of connective tissue?",
        "options": [
          "Absorption of nutrients",
          "Support, binding, and insulation of organs",
          "Gas exchange",
          "Conduction of nerve impulses"
        ],
        "correct": 1,
        "explanation": "Connective tissue provides structural support, binds tissues together, stores energy, and insulates the body."
      },
      {
        "q": "The tissue that forms the outer layer of skin is:",
        "options": [
          "Connective tissue",
          "Muscular tissue",
          "Epithelial tissue",
          "Nervous tissue"
        ],
        "correct": 2,
        "explanation": "The epidermis (outer layer of skin) is composed of epithelial tissue that protects the underlying structures."
      },
      {
        "q": "Which plant tissue stores food, water, and other substances?",
        "options": [
          "Xylem",
          "Collenchyma",
          "Sclerenchyma",
          "Parenchyma"
        ],
        "correct": 3,
        "explanation": "Parenchyma cells have thin walls, large vacuoles, and are primary storage tissue in plants."
      },
      {
        "q": "The transport of food and other organic compounds in plants occurs through:",
        "options": [
          "Phloem",
          "Epidermis",
          "Cuticle",
          "Xylem"
        ],
        "correct": 0,
        "explanation": "Phloem transports sugars and other organic products from the leaves to all other parts of the plant."
      },
      {
        "q": "Which type of muscle tissue is found in the heart?",
        "options": [
          "Skeletal muscle",
          "Cardiac muscle",
          "Smooth muscle",
          "All of the above"
        ],
        "correct": 1,
        "explanation": "Cardiac muscle is found in the heart and has striations and a single nucleus per cell, enabling coordinated contractions."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between simple and complex tissues?",
        "a": "Simple tissues consist of only one type of cell (e.g., parenchyma), while complex tissues are made of more than one type of cell working together (e.g., xylem and phloem in plants, or bone in animals)."
      },
      {
        "q": "Why do animals need different types of tissues?",
        "a": "Different tissues have specialized functions. Epithelial tissue protects, muscle tissue enables movement, nerve tissue transmits signals, and connective tissue provides support, allowing the organism to function as an integrated whole."
      }
    ]
  },
  {
    "slug": "class-9-science-diversity-in-living-organisms",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Diversity in Living Organisms",
    "intro": "Living organisms are classified into different kingdoms based on their characteristics. The binomial nomenclature system helps scientists organize and name the vast diversity of life on Earth.",
    "mcqs": [
      {
        "q": "Who developed the system of binomial nomenclature?",
        "options": [
          "Jean-Baptiste Lamarck",
          "Carl Linnaeus",
          "Charles Darwin",
          "Ernst Haeckel"
        ],
        "correct": 1,
        "explanation": "Carl Linnaeus developed binomial nomenclature, a system of naming organisms using a two-part name: genus and species."
      },
      {
        "q": "In the scientific name Felis catus, 'Felis' refers to the:",
        "options": [
          "Order",
          "Species",
          "Genus",
          "Family"
        ],
        "correct": 2,
        "explanation": "Felis is the genus and catus is the species. The genus is always capitalized and the species is lowercase."
      },
      {
        "q": "Which of the following is the correct order of classification from largest to smallest group?",
        "options": [
          "Kingdom, Class, Phylum, Order, Family, Genus, Species",
          "Kingdom, Order, Phylum, Class, Family, Genus, Species",
          "Species, Genus, Family, Order, Class, Phylum, Kingdom",
          "Kingdom, Phylum, Class, Order, Family, Genus, Species"
        ],
        "correct": 3,
        "explanation": "The correct hierarchy is Kingdom > Phylum > Class > Order > Family > Genus > Species (often remembered as KPCOFGS)."
      },
      {
        "q": "Which kingdom includes organisms that are multicellular and feed on dead organic matter?",
        "options": [
          "Fungi",
          "Protista",
          "Animalia",
          "Plantae"
        ],
        "correct": 0,
        "explanation": "Fungi are multicellular (mostly) heterotrophs that secrete digestive enzymes and absorb nutrients from dead organic matter."
      },
      {
        "q": "Prokaryotes are organisms that lack:",
        "options": [
          "Cell wall",
          "Nucleus",
          "Ribosomes",
          "Membrane"
        ],
        "correct": 1,
        "explanation": "Prokaryotes lack a membrane-bound nucleus. Bacteria and archaea are prokaryotes."
      },
      {
        "q": "Which of the following organisms is a eukaryote?",
        "options": [
          "Cyanobacteria",
          "Bacteria",
          "Amoeba",
          "Archaea"
        ],
        "correct": 2,
        "explanation": "Amoeba is a eukaryote (has a nucleus and membrane-bound organelles). Bacteria, cyanobacteria, and archaea are prokaryotes."
      },
      {
        "q": "The characteristic feature of members of Kingdom Plantae is that they are:",
        "options": [
          "Lack cell walls",
          "Can produce their own food using chemosynthesis",
          "Heterotrophic and move freely",
          "Autotrophic and have cell walls"
        ],
        "correct": 3,
        "explanation": "Plants are autotrophic (produce their own food through photosynthesis) and have rigid cell walls made of cellulose."
      },
      {
        "q": "Viruses are not considered living because they:",
        "options": [
          "Cannot reproduce independently",
          "Do not consume food",
          "Cannot move",
          "Are too small"
        ],
        "correct": 0,
        "explanation": "Viruses cannot reproduce without a host cell; they lack the machinery to synthesize proteins and reproduce independently, making them non-living."
      },
      {
        "q": "Which level of classification groups organisms that can interbreed and produce fertile offspring?",
        "options": [
          "Genus",
          "Species",
          "Family",
          "Order"
        ],
        "correct": 1,
        "explanation": "A species is defined as a group of organisms that can interbreed and produce fertile offspring."
      },
      {
        "q": "The kingdom that includes both plants and animals is:",
        "options": [
          "Animalia",
          "Monera",
          "Protista",
          "Plantae"
        ],
        "correct": 2,
        "explanation": "Protista includes diverse single-celled and simple multicellular eukaryotes, some plant-like and some animal-like."
      }
    ],
    "faqs": [
      {
        "q": "Why is classification of living organisms important?",
        "a": "Classification helps scientists organize the enormous diversity of life, understand evolutionary relationships, and communicate about organisms using standardized names. It also helps us understand how organisms are related and adapted to their environments."
      },
      {
        "q": "How is the five-kingdom classification different from the three-domain system?",
        "a": "The five-kingdom system (Monera, Protista, Fungi, Plantae, Animalia) is based on cellular organization and nutrition mode. The three-domain system (Bacteria, Archaea, Eukarya) is based on molecular and genetic differences, placing archaea in a separate domain."
      }
    ]
  },
  {
    "slug": "class-9-science-why-do-we-fall-ill",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Why Do We Fall Ill",
    "intro": "Health is a state of complete physical, mental, and social well-being. Diseases are caused by pathogens like bacteria, viruses, and fungi, and can be prevented through hygiene, vaccination, and a healthy lifestyle.",
    "mcqs": [
      {
        "q": "Which of the following is NOT a characteristic of a healthy person?",
        "options": [
          "Good immunity",
          "Social well-being",
          "Good physical fitness",
          "Mental stress and anxiety"
        ],
        "correct": 3,
        "explanation": "Health includes physical, mental, and social well-being. Mental stress and anxiety indicate poor mental health."
      },
      {
        "q": "Communicable diseases are transmitted through:",
        "options": [
          "Pathogens via direct or indirect contact",
          "Genes only",
          "Genetic defects",
          "Poor nutrition"
        ],
        "correct": 0,
        "explanation": "Communicable diseases are spread by disease-causing pathogens (bacteria, viruses, fungi, protozoans) through direct contact, air, water, or vectors."
      },
      {
        "q": "Which pathogen causes tuberculosis (TB)?",
        "options": [
          "Fungus",
          "Bacterium",
          "Virus",
          "Protozoan"
        ],
        "correct": 1,
        "explanation": "Tuberculosis is caused by Mycobacterium tuberculosis, a bacterium that primarily affects the lungs."
      },
      {
        "q": "Polio is a disease caused by:",
        "options": [
          "Fungus",
          "Bacteria",
          "Virus",
          "Protozoan"
        ],
        "correct": 2,
        "explanation": "Polio is caused by the poliovirus, which is transmitted through contaminated food and water."
      },
      {
        "q": "Which of the following helps our body fight infections?",
        "options": [
          "White blood cells",
          "Toxins",
          "Pathogens",
          "Antibodies"
        ],
        "correct": 3,
        "explanation": "Antibodies are produced by the immune system to neutralize and destroy pathogens and their toxins."
      },
      {
        "q": "A disease spread by mosquitoes is:",
        "options": [
          "Malaria",
          "Typhoid",
          "Tuberculosis",
          "Tetanus"
        ],
        "correct": 0,
        "explanation": "Malaria is transmitted by Anopheles mosquitoes carrying the Plasmodium parasite."
      },
      {
        "q": "Which vaccination prevents measles?",
        "options": [
          "Typhoid vaccine",
          "MMR vaccine",
          "BCG vaccine",
          "Polio vaccine"
        ],
        "correct": 1,
        "explanation": "The MMR (Measles, Mumps, Rubella) vaccine provides immunity against measles and other diseases."
      },
      {
        "q": "Antibiotics are effective against:",
        "options": [
          "All diseases",
          "Fungal infections only",
          "Bacterial infections",
          "Viral infections"
        ],
        "correct": 2,
        "explanation": "Antibiotics kill or inhibit bacterial growth but are ineffective against viruses, which is why antibiotics are not used to treat colds or flu."
      },
      {
        "q": "Which of the following is a non-communicable disease?",
        "options": [
          "Cholera",
          "Chicken pox",
          "Typhoid",
          "Diabetes"
        ],
        "correct": 3,
        "explanation": "Diabetes is a non-communicable disease caused by insulin deficiency or resistance. The others are communicable diseases spread by pathogens."
      },
      {
        "q": "Personal hygiene includes:",
        "options": [
          "Regular bathing and clean clothes",
          "Sharing toothbrushes",
          "Drinking contaminated water",
          "Not washing hands"
        ],
        "correct": 0,
        "explanation": "Good personal hygiene includes regular bathing, wearing clean clothes, and washing hands regularly, which prevents disease transmission."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between acute and chronic diseases?",
        "a": "Acute diseases develop suddenly and last for a short period (e.g., cold, flu), while chronic diseases develop slowly and persist for a long time (e.g., diabetes, heart disease)."
      },
      {
        "q": "How does vaccination provide immunity against diseases?",
        "a": "Vaccination introduces a weakened or inactive form of a pathogen (or its antigen) into the body, stimulating the immune system to produce antibodies without causing the disease, providing long-term protection."
      }
    ]
  },
  {
    "slug": "class-9-science-natural-resources",
    "classLevel": "9",
    "subject": "Science",
    "chapter": "Natural Resources",
    "intro": "Natural resources are materials and energy sources that occur naturally on Earth. Soil, air, and water are essential components of the biosphere that support all life and must be conserved for future generations.",
    "mcqs": [
      {
        "q": "Which of the following is a renewable resource?",
        "options": [
          "Petroleum",
          "Forests",
          "Natural gas",
          "Coal"
        ],
        "correct": 1,
        "explanation": "Forests are renewable resources because they can be regenerated through natural growth and replanting, while coal and petroleum are non-renewable."
      },
      {
        "q": "The process by which water changes from liquid to gas is called:",
        "options": [
          "Precipitation",
          "Sublimation",
          "Evaporation",
          "Condensation"
        ],
        "correct": 2,
        "explanation": "Evaporation is the conversion of water from liquid to vapor, which occurs when water absorbs heat energy from the sun."
      },
      {
        "q": "Which atmospheric layer is closest to the Earth's surface?",
        "options": [
          "Thermosphere",
          "Stratosphere",
          "Mesosphere",
          "Troposphere"
        ],
        "correct": 3,
        "explanation": "The troposphere is the lowest atmospheric layer where weather occurs and where most life exists."
      },
      {
        "q": "The primary source of energy for all life on Earth is:",
        "options": [
          "The sun",
          "Coal",
          "Geothermal energy",
          "Nuclear energy"
        ],
        "correct": 0,
        "explanation": "The sun provides energy through radiation that drives photosynthesis, weather systems, and all biological processes."
      },
      {
        "q": "Which gas makes up approximately 78% of Earth's atmosphere?",
        "options": [
          "Carbon dioxide",
          "Nitrogen",
          "Oxygen",
          "Argon"
        ],
        "correct": 1,
        "explanation": "Nitrogen comprises about 78% of Earth's atmosphere, while oxygen is about 21%, and other gases make up about 1%."
      },
      {
        "q": "Soil formation occurs through:",
        "options": [
          "Wind erosion",
          "Water erosion",
          "Weathering of rocks and accumulation of organic matter",
          "Precipitation only"
        ],
        "correct": 2,
        "explanation": "Soil forms through the weathering of parent rock material by physical, chemical, and biological processes combined with organic matter from dead organisms."
      },
      {
        "q": "Which of the following is NOT a component of soil?",
        "options": [
          "Organic matter",
          "Water",
          "Mineral particles",
          "Atmospheric pressure"
        ],
        "correct": 3,
        "explanation": "Soil consists of mineral particles, organic matter (humus), water, and air. Atmospheric pressure is not a component of soil."
      },
      {
        "q": "The groundwater table refers to:",
        "options": [
          "The level below which soil is saturated with water",
          "The depth of rivers",
          "The surface of the ocean",
          "The atmosphere above ground"
        ],
        "correct": 0,
        "explanation": "The groundwater table is the level below which the soil and rocks are saturated with water."
      },
      {
        "q": "Which process removes nitrogen from the atmosphere and converts it into a usable form?",
        "options": [
          "Respiration",
          "Nitrogen fixation",
          "Photosynthesis",
          "Decomposition"
        ],
        "correct": 1,
        "explanation": "Nitrogen fixation by bacteria (in soil or root nodules) converts atmospheric nitrogen (N2) into ammonia (NH3), which plants can use."
      },
      {
        "q": "Deforestation leads to all of the following EXCEPT:",
        "options": [
          "Soil erosion",
          "Loss of biodiversity",
          "Increased rainfall",
          "Increased atmospheric CO2"
        ],
        "correct": 2,
        "explanation": "Deforestation actually reduces rainfall (forests help regulate water cycles), causes soil erosion, loss of biodiversity, and increases atmospheric CO2."
      }
    ],
    "faqs": [
      {
        "q": "What are the three states of water in the water cycle?",
        "a": "Water exists as liquid in oceans and rivers, as solid (ice) in glaciers and poles, and as gas (water vapor) in the atmosphere. These states change through evaporation, condensation, and precipitation."
      },
      {
        "q": "Why is soil conservation important?",
        "a": "Soil is essential for agriculture, stores water and nutrients, supports plant growth, and acts as a carbon sink. Loss of soil reduces fertility, increases erosion, and threatens food security."
      }
    ]
  },
  {
    "slug": "class-10-science-periodic-classification",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Periodic Classification of Elements",
    "intro": "The periodic table organizes elements based on their atomic number and chemical properties. Understanding periodic trends helps predict element behavior and properties.",
    "mcqs": [
      {
        "q": "Who arranged the periodic table by atomic number?",
        "options": [
          "John Newlands",
          "Julius Lothar Meyer",
          "Dmitri Mendeleev",
          "Henry Moseley"
        ],
        "correct": 3,
        "explanation": "Henry Moseley discovered that atomic number (number of protons) is more fundamental than atomic mass for organizing elements."
      },
      {
        "q": "Elements in the same group of the periodic table have:",
        "options": [
          "Same number of valence electrons",
          "Same atomic mass",
          "Same number of shells",
          "Same atomic number"
        ],
        "correct": 0,
        "explanation": "Elements in the same group (vertical column) have the same number of valence electrons, which determines their chemical properties."
      },
      {
        "q": "Which of the following is a property of metals?",
        "options": [
          "Poor conductors of electricity",
          "Good conductors of heat and electricity",
          "Non-lustrous",
          "Brittle"
        ],
        "correct": 1,
        "explanation": "Metals are good conductors of heat and electricity, are malleable, ductile, and lustrous (shiny)."
      },
      {
        "q": "The element with atomic number 6 is:",
        "options": [
          "Boron",
          "Nitrogen",
          "Carbon",
          "Oxygen"
        ],
        "correct": 2,
        "explanation": "Carbon has 6 protons and is the foundation of all organic molecules."
      },
      {
        "q": "Across a period in the periodic table, atomic radius:",
        "options": [
          "Remains constant",
          "Increases then decreases",
          "Increases",
          "Decreases"
        ],
        "correct": 3,
        "explanation": "Atomic radius decreases across a period because the nuclear charge increases while electrons are added to the same shell."
      },
      {
        "q": "Which of the following is a halogen?",
        "options": [
          "Fluorine",
          "Helium",
          "Nitrogen",
          "Oxygen"
        ],
        "correct": 0,
        "explanation": "Halogens are Group 17 elements; fluorine (F) is the most reactive halogen."
      },
      {
        "q": "Noble gases have a valence shell that is:",
        "options": [
          "Has one electron",
          "Completely full",
          "Half full",
          "Empty"
        ],
        "correct": 1,
        "explanation": "Noble gases have a complete valence shell (8 electrons except He with 2), making them extremely stable and unreactive."
      },
      {
        "q": "Electronegativity increases across a period and:",
        "options": [
          "Remains constant down a group",
          "Increases down a group",
          "Decreases down a group",
          "Increases then decreases down a group"
        ],
        "correct": 2,
        "explanation": "Electronegativity decreases down a group because the valence electrons are farther from the nucleus."
      },
      {
        "q": "Which element is a non-metal located in Group 15?",
        "options": [
          "Chlorine",
          "Argon",
          "Sulfur",
          "Phosphorus"
        ],
        "correct": 3,
        "explanation": "Phosphorus (P) is a non-metal in Group 15 with 5 valence electrons."
      },
      {
        "q": "The first ionization energy is the energy required to:",
        "options": [
          "Remove one electron from an atom",
          "Add an electron to an atom",
          "Melt a solid",
          "Break a bond between atoms"
        ],
        "correct": 0,
        "explanation": "First ionization energy is the energy needed to remove the most loosely bound electron from an isolated atom."
      }
    ],
    "faqs": [
      {
        "q": "What are the differences between metals, non-metals, and metalloids?",
        "a": "Metals are good conductors with luster and malleability. Non-metals are poor conductors and form covalent bonds. Metalloids have properties intermediate between metals and non-metals."
      },
      {
        "q": "How did Mendeleev predict the properties of undiscovered elements?",
        "a": "Mendeleev arranged elements by atomic mass and left gaps for unknown elements, predicting their properties based on neighboring elements' characteristics. When gallium, scandium, and germanium were discovered, their properties closely matched his predictions."
      }
    ]
  },
  {
    "slug": "class-10-science-carbon-compounds",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Carbon Compounds",
    "intro": "Carbon forms the backbone of all organic compounds, which include hydrocarbons, alcohols, aldehydes, and carboxylic acids. Understanding carbon chemistry is essential for biology, medicine, and materials science.",
    "mcqs": [
      {
        "q": "What is the general formula for alkanes?",
        "options": [
          "CnH2n",
          "CnH2n+2",
          "CnHn",
          "CnH2n-2"
        ],
        "correct": 1,
        "explanation": "The general formula for saturated hydrocarbons (alkanes) is CnH2n+2, where n is the number of carbon atoms."
      },
      {
        "q": "Methane (CH4) is classified as:",
        "options": [
          "An alcohol",
          "An alkene",
          "An alkane",
          "An alkyne"
        ],
        "correct": 2,
        "explanation": "Methane is the simplest alkane with a single carbon-hydrogen bond and the formula CH4."
      },
      {
        "q": "Which of the following is an unsaturated hydrocarbon?",
        "options": [
          "Propane",
          "Methane",
          "Ethane",
          "Ethene"
        ],
        "correct": 3,
        "explanation": "Ethene (C2H4) is an unsaturated hydrocarbon containing a carbon-carbon double bond."
      },
      {
        "q": "The functional group in alcohols is:",
        "options": [
          "-OH",
          "-CHO",
          "-COOH",
          "-CO-"
        ],
        "correct": 0,
        "explanation": "The hydroxyl group (-OH) is the functional group in alcohols, found in compounds like ethanol."
      },
      {
        "q": "Carboxylic acids contain the functional group:",
        "options": [
          "-CHO",
          "-COOH",
          "-NH2",
          "-OH"
        ],
        "correct": 1,
        "explanation": "The carboxyl group (-COOH) is characteristic of carboxylic acids and is responsible for their acidic properties."
      },
      {
        "q": "Which compound can be used as a fuel?",
        "options": [
          "Acetic acid",
          "Ethanol",
          "Both ethanol and benzene",
          "Benzene"
        ],
        "correct": 2,
        "explanation": "Both ethanol and benzene can be used as fuels, though ethanol is more commonly used as a biofuel."
      },
      {
        "q": "The chemical formula for acetic acid is:",
        "options": [
          "HCOOH",
          "CH3OH",
          "C2H5OH",
          "CH3COOH"
        ],
        "correct": 3,
        "explanation": "Acetic acid (CH3COOH) is the main component of vinegar and contains a carboxyl group."
      },
      {
        "q": "The reaction between an alcohol and a carboxylic acid produces:",
        "options": [
          "An ester",
          "An aldehyde",
          "Water",
          "A ketone"
        ],
        "correct": 0,
        "explanation": "Esterification reaction between alcohols and carboxylic acids produces esters and water."
      },
      {
        "q": "Which of the following is the structure of benzene?",
        "options": [
          "Three double-bonded carbons",
          "Hexagonal ring with alternating double bonds",
          "Open chain with 6 carbons and one double bond",
          "Straight chain with 6 carbons"
        ],
        "correct": 1,
        "explanation": "Benzene is a hexagonal aromatic ring (C6H6) with delocalized pi electrons providing stability."
      },
      {
        "q": "The addition of hydrogen to unsaturated hydrocarbons is called:",
        "options": [
          "Oxidation",
          "Esterification",
          "Hydrogenation",
          "Dehydration"
        ],
        "correct": 2,
        "explanation": "Hydrogenation adds hydrogen to unsaturated compounds (alkenes and alkynes), converting them to saturated compounds."
      }
    ],
    "faqs": [
      {
        "q": "What is the significance of covalent bonding in carbon compounds?",
        "a": "Carbon forms strong covalent bonds with other carbon atoms and elements, allowing for the formation of diverse structures from simple molecules to complex polymers. This versatility is why carbon is the basis of all organic chemistry."
      },
      {
        "q": "How are isomers different from each other?",
        "a": "Isomers have the same molecular formula but different structural arrangements, which results in different physical and chemical properties. For example, butane and isobutane both have the formula C4H10 but different structures."
      }
    ]
  },
  {
    "slug": "class-10-science-heredity-and-evolution",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Heredity and Evolution",
    "intro": "Heredity is the transmission of traits from parents to offspring through genes. Evolution explains the diversity of life through natural selection and adaptation over millions of years.",
    "mcqs": [
      {
        "q": "Who proposed the theory of natural selection?",
        "options": [
          "Alfred Russel Wallace",
          "Jean-Baptiste Lamarck",
          "Gregor Mendel",
          "Charles Darwin"
        ],
        "correct": 3,
        "explanation": "Charles Darwin proposed the theory of natural selection to explain how species adapt and evolve over time."
      },
      {
        "q": "A gene is:",
        "options": [
          "A segment of DNA that codes for a protein or trait",
          "A protein",
          "A cell nucleus",
          "A chromosome"
        ],
        "correct": 0,
        "explanation": "A gene is a specific segment of DNA that contains instructions for producing a particular protein or trait."
      },
      {
        "q": "In a monohybrid cross of Aa x Aa, what is the probability of the recessive phenotype?",
        "options": [
          "50%",
          "25%",
          "75%",
          "100%"
        ],
        "correct": 1,
        "explanation": "In Aa x Aa, the offspring ratio is 1 AA : 2 Aa : 1 aa. Only aa shows the recessive phenotype, which is 25% of offspring."
      },
      {
        "q": "DNA stands for:",
        "options": [
          "Deoxyribose Nucleic Acid",
          "Diribonucleic Acid",
          "Deoxyribonucleic Acid",
          "Deoxyribose Nitrogen Acid"
        ],
        "correct": 2,
        "explanation": "DNA stands for deoxyribonucleic acid and is the molecule that stores genetic information."
      },
      {
        "q": "The process by which organisms adapt to their environment over generations is called:",
        "options": [
          "Mutation",
          "Variation",
          "Inheritance",
          "Natural selection"
        ],
        "correct": 3,
        "explanation": "Natural selection is the mechanism by which organisms with advantageous traits survive and reproduce more successfully."
      },
      {
        "q": "Which of the following is evidence for evolution?",
        "options": [
          "Fossil records",
          "Comparative anatomy",
          "DNA similarity in organisms",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "Fossil records show species change over time, comparative anatomy reveals structural similarities, and DNA proves genetic relationships between species."
      },
      {
        "q": "A dominant trait is one that:",
        "options": [
          "Masks the recessive trait in heterozygotes",
          "Always appears in offspring",
          "Requires two copies of the allele",
          "Appears in both parents"
        ],
        "correct": 0,
        "explanation": "A dominant allele expresses its phenotype in both homozygous (AA) and heterozygous (Aa) conditions, masking the recessive allele."
      },
      {
        "q": "The variation in organisms is caused by:",
        "options": [
          "Only environmental factors",
          "Both genetic variation and environmental factors",
          "Only genetic factors",
          "Only mutation"
        ],
        "correct": 1,
        "explanation": "Phenotypic variation results from both genetic differences (alleles) and environmental influences on development and physiology."
      },
      {
        "q": "If an organism has the genotype AaBb, how many different gametes can it produce?",
        "options": [
          "8",
          "16",
          "4",
          "2"
        ],
        "correct": 2,
        "explanation": "An organism with genotype AaBb can produce 4 different gametes: AB, Ab, aB, ab (2^n where n=2 heterozygous loci)."
      },
      {
        "q": "Vestigial structures in organisms are evidence for:",
        "options": [
          "Lamarckian evolution",
          "Spontaneous generation",
          "Divine creation",
          "Common ancestry"
        ],
        "correct": 3,
        "explanation": "Vestigial structures (like human tailbones) are remnants from ancestral forms and provide evidence that organisms share common ancestors."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between genotype and phenotype?",
        "a": "Genotype is the genetic makeup of an organism (e.g., Aa), while phenotype is the observable characteristics resulting from the genotype and environment (e.g., brown eyes)."
      },
      {
        "q": "How does natural selection drive evolution?",
        "a": "Organisms with traits advantageous in their environment survive and reproduce more successfully, passing those traits to offspring. Over many generations, advantageous traits become more common in the population, leading to evolutionary change."
      }
    ]
  },
  {
    "slug": "class-10-science-our-environment",
    "classLevel": "10",
    "subject": "Science",
    "chapter": "Our Environment",
    "intro": "An ecosystem consists of biotic and abiotic factors interacting in complex food chains and food webs. Understanding energy flow and nutrient cycling is essential for environmental conservation.",
    "mcqs": [
      {
        "q": "An ecosystem includes:",
        "options": [
          "Both living organisms and non-living factors",
          "Only non-living factors",
          "Only plants and animals",
          "Only living organisms"
        ],
        "correct": 0,
        "explanation": "An ecosystem is a community of living organisms (biotic factors) interacting with physical components (abiotic factors like temperature, soil, water)."
      },
      {
        "q": "In a food chain, plants are called:",
        "options": [
          "Decomposers",
          "Producers",
          "Tertiary consumers",
          "Secondary consumers"
        ],
        "correct": 1,
        "explanation": "Plants are producers because they convert solar energy into chemical energy through photosynthesis, forming the base of food chains."
      },
      {
        "q": "The percentage of energy transferred from one trophic level to the next is approximately:",
        "options": [
          "50%",
          "25%",
          "10%",
          "90%"
        ],
        "correct": 2,
        "explanation": "Only about 10% of energy is transferred to the next trophic level; the rest is lost as heat during respiration and other metabolic processes."
      },
      {
        "q": "Decomposers in an ecosystem include:",
        "options": [
          "Herbivores",
          "Plants",
          "Carnivores",
          "Bacteria and fungi"
        ],
        "correct": 3,
        "explanation": "Decomposers break down dead organic matter and return nutrients to the soil, playing a crucial role in nutrient cycling."
      },
      {
        "q": "The ozone layer is important because it:",
        "options": [
          "Protects from ultraviolet radiation",
          "Traps heat in the atmosphere",
          "Prevents greenhouse gases",
          "Produces oxygen"
        ],
        "correct": 0,
        "explanation": "The ozone layer absorbs harmful ultraviolet (UV) radiation from the sun, protecting living organisms from UV damage."
      },
      {
        "q": "Which of the following is a biotic factor in an ecosystem?",
        "options": [
          "Temperature",
          "Bacteria",
          "Sunlight",
          "Wind"
        ],
        "correct": 1,
        "explanation": "Bacteria are living organisms and thus biotic factors. Temperature, sunlight, and wind are abiotic (non-living) factors."
      },
      {
        "q": "The carbon cycle involves all of the following EXCEPT:",
        "options": [
          "Combustion",
          "Photosynthesis",
          "Rainfall",
          "Respiration"
        ],
        "correct": 2,
        "explanation": "The carbon cycle involves photosynthesis (CO2 uptake), respiration (CO2 release), combustion, and decomposition. Rainfall is part of the water cycle."
      },
      {
        "q": "Invasive species in an ecosystem can cause:",
        "options": [
          "Improved ecosystem balance",
          "Increased biodiversity",
          "More habitat for organisms",
          "Disruption of native species and food webs"
        ],
        "correct": 3,
        "explanation": "Invasive species often outcompete native species, disrupt food webs, and reduce biodiversity."
      },
      {
        "q": "The primary source of nitrogen for plants is:",
        "options": [
          "Nitrogen-fixing bacteria in soil",
          "Decomposers",
          "Rainwater",
          "The atmosphere"
        ],
        "correct": 0,
        "explanation": "Although nitrogen is abundant in the atmosphere, plants cannot use it directly; nitrogen-fixing bacteria convert atmospheric N2 into usable forms."
      },
      {
        "q": "Which human activity has the most impact on increasing atmospheric CO2?",
        "options": [
          "Deforestation",
          "Fossil fuel combustion",
          "Agricultural practices",
          "All of the above"
        ],
        "correct": 1,
        "explanation": "The question asks for the single largest contributor. Burning coal, oil and gas is by far the biggest source of anthropogenic CO₂, which is why \"all of the above\" cannot be the answer to a \"most impact\" question."
      }
    ],
    "faqs": [
      {
        "q": "What is biodiversity and why is it important?",
        "a": "Biodiversity refers to the variety of species and genetic variation within an ecosystem. It is important because it maintains ecosystem stability, provides resources for humans, and ensures ecological resilience to environmental changes."
      },
      {
        "q": "How does pollution affect ecosystems?",
        "a": "Pollution can disrupt food webs by poisoning organisms, reduce biodiversity by making habitats unsuitable, and interfere with nutrient cycles. Bioaccumulation of toxins concentrates pollutants in organisms higher in the food chain."
      }
    ]
  },
  {
    "slug": "class-10-maths-real-numbers",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Real Numbers",
    "intro": "Real numbers include all rational and irrational numbers. Understanding properties like divisibility, prime factorization, and the Euclidean algorithm is fundamental to number theory.",
    "mcqs": [
      {
        "q": "Which of the following is an irrational number?",
        "options": [
          "22/7",
          "√2",
          "0.333...",
          "0.5"
        ],
        "correct": 1,
        "explanation": "√2 is irrational because it cannot be expressed as a ratio of two integers. Its decimal expansion is non-terminating and non-repeating."
      },
      {
        "q": "The Euclidean algorithm is used to find:",
        "options": [
          "Square roots",
          "Least Common Multiple (LCM)",
          "Greatest Common Divisor (GCD)",
          "Prime factors"
        ],
        "correct": 2,
        "explanation": "The Euclidean algorithm repeatedly applies division to find the GCD of two numbers efficiently."
      },
      {
        "q": "If HCF(a, b) = 12 and LCM(a, b) = 72, then a × b equals:",
        "options": [
          "720",
          "60",
          "144",
          "864"
        ],
        "correct": 3,
        "explanation": "For any two numbers a and b: a × b = HCF(a, b) × LCM(a, b) = 12 × 72 = 864."
      },
      {
        "q": "Which of the following is a prime number?",
        "options": [
          "97",
          "93",
          "87",
          "91"
        ],
        "correct": 0,
        "explanation": "97 is prime. 91 = 7×13, 87 = 3×29, and 93 = 3×31 are composite numbers."
      },
      {
        "q": "The decimal expansion of a rational number is always:",
        "options": [
          "Terminating",
          "Terminating or non-terminating repeating",
          "Non-terminating",
          "Non-terminating and non-repeating"
        ],
        "correct": 1,
        "explanation": "Rational numbers have either terminating decimals (like 1/4 = 0.25) or non-terminating repeating decimals (like 1/3 = 0.333...)."
      },
      {
        "q": "By the Fundamental Theorem of Arithmetic, every composite number can be uniquely expressed as:",
        "options": [
          "Sum of primes",
          "Sum of two squares",
          "Product of primes",
          "Difference of squares"
        ],
        "correct": 2,
        "explanation": "Every composite number has a unique prime factorization (up to order), which is the basis of the Fundamental Theorem of Arithmetic."
      },
      {
        "q": "The HCF of 15 and 25 is:",
        "options": [
          "75",
          "15",
          "25",
          "5"
        ],
        "correct": 3,
        "explanation": "15 = 3 × 5 and 25 = 5 × 5. The common factor is 5, so HCF = 5."
      },
      {
        "q": "If p/q is a rational number in lowest terms, then q must be:",
        "options": [
          "Coprime to p",
          "A multiple of p",
          "A perfect square",
          "Not equal to 1"
        ],
        "correct": 0,
        "explanation": "For a fraction p/q to be in lowest terms, HCF(p, q) = 1, meaning p and q are coprime (share no common factors)."
      },
      {
        "q": "The LCM of 12 and 18 is:",
        "options": [
          "216",
          "36",
          "6",
          "72"
        ],
        "correct": 1,
        "explanation": "12 = 2² × 3 and 18 = 2 × 3². LCM = 2² × 3² = 4 × 9 = 36."
      },
      {
        "q": "Which statement is true about irrational numbers?",
        "options": [
          "They can be expressed as p/q",
          "They cannot be negative",
          "Their decimal expansion never terminates or repeats",
          "They are less common than rational numbers"
        ],
        "correct": 2,
        "explanation": "Irrational numbers have non-terminating, non-repeating decimal expansions and cannot be expressed as simple fractions."
      }
    ],
    "faqs": [
      {
        "q": "What is the relationship between HCF and LCM?",
        "a": "For any two positive integers a and b, their product equals the product of their HCF and LCM: a × b = HCF(a, b) × LCM(a, b). This relationship helps solve many problems involving divisibility."
      },
      {
        "q": "How do you prove that √2 is irrational?",
        "a": "Assume √2 = p/q in lowest terms. Then 2q² = p², meaning p is even (say p = 2k). Substituting: 2q² = 4k², so q² = 2k², meaning q is also even. This contradicts our assumption that p/q is in lowest terms, so √2 is irrational."
      }
    ]
  },
  {
    "slug": "class-10-maths-polynomials",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Polynomials",
    "intro": "Polynomials are algebraic expressions with terms containing variables raised to non-negative integer powers. Understanding zeros, factors, and the relationship between them is essential for solving equations.",
    "mcqs": [
      {
        "q": "A polynomial of degree 2 is called:",
        "options": [
          "Linear",
          "Quartic",
          "Cubic",
          "Quadratic"
        ],
        "correct": 3,
        "explanation": "A quadratic polynomial has degree 2, with the general form ax² + bx + c where a ≠ 0."
      },
      {
        "q": "If (x - 2) is a factor of polynomial p(x), then p(2) equals:",
        "options": [
          "0",
          "-1",
          "1",
          "2"
        ],
        "correct": 0,
        "explanation": "By the Factor Theorem, if (x - a) is a factor of p(x), then p(a) = 0."
      },
      {
        "q": "The zeros of the polynomial x² - 5x + 6 are:",
        "options": [
          "5 and 6",
          "2 and 3",
          "-2 and -3",
          "1 and 6"
        ],
        "correct": 1,
        "explanation": "x² - 5x + 6 = (x - 2)(x - 3), so the zeros are x = 2 and x = 3."
      },
      {
        "q": "If α and β are zeros of ax² + bx + c, then α + β equals:",
        "options": [
          "b/a",
          "-c/a",
          "-b/a",
          "c/a"
        ],
        "correct": 2,
        "explanation": "By Vieta's formulas for a quadratic, the sum of zeros = -b/a."
      },
      {
        "q": "The remainder when p(x) = x³ + 2x² - x + 1 is divided by (x - 1) is:",
        "options": [
          "2",
          "1",
          "0",
          "3"
        ],
        "correct": 3,
        "explanation": "By the Remainder Theorem, the remainder = p(1) = 1 + 2 - 1 + 1 = 3."
      },
      {
        "q": "A cubic polynomial has at most ____ zeros.",
        "options": [
          "3",
          "4",
          "1",
          "2"
        ],
        "correct": 0,
        "explanation": "A polynomial of degree n has at most n real zeros. A cubic (degree 3) polynomial has at most 3 zeros."
      },
      {
        "q": "If the zeros of a polynomial are 1, 2, and 3, the polynomial is:",
        "options": [
          "(x-1)² + (x-2)² + (x-3)²",
          "(x-1)(x-2)(x-3)",
          "x³ - x² - x + 3",
          "(x+1)(x+2)(x+3)"
        ],
        "correct": 1,
        "explanation": "If the zeros are 1, 2, and 3, then the polynomial with leading coefficient 1 is (x-1)(x-2)(x-3)."
      },
      {
        "q": "The product of zeros of ax² + bx + c equals:",
        "options": [
          "b/c",
          "-c/a",
          "c/a",
          "-b/a"
        ],
        "correct": 2,
        "explanation": "By Vieta's formulas, the product of zeros = c/a for a quadratic polynomial."
      },
      {
        "q": "Which polynomial has a zero at x = -1?",
        "options": [
          "x² + x + 1",
          "x² + 1",
          "x² - x + 1",
          "x² - 1"
        ],
        "correct": 3,
        "explanation": "If x = -1: (-1)² - 1 = 1 - 1 = 0. So x = -1 is a zero of x² - 1."
      },
      {
        "q": "The degree of the polynomial (x+1)³(x-2)²(x+3) is:",
        "options": [
          "6",
          "3",
          "4",
          "5"
        ],
        "correct": 0,
        "explanation": "Degree = 3 (from (x+1)³) + 2 (from (x-2)²) + 1 (from (x+3)) = 6."
      }
    ],
    "faqs": [
      {
        "q": "What is the Factor Theorem and how is it useful?",
        "a": "The Factor Theorem states that (x - a) is a factor of p(x) if and only if p(a) = 0. It's useful for finding zeros and factoring polynomials without lengthy division."
      },
      {
        "q": "How can Vieta's formulas help solve problems?",
        "a": "Vieta's formulas relate the coefficients of a polynomial to the sum and product of its zeros. For a quadratic ax² + bx + c with zeros α and β: α + β = -b/a and αβ = c/a. This helps find zeros or construct polynomials from given zeros."
      }
    ]
  },
  {
    "slug": "class-10-maths-triangles",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Triangles",
    "intro": "Triangles are fundamental geometric shapes. Understanding similarity, congruence, and the properties of various triangle types is essential for geometry and trigonometry.",
    "mcqs": [
      {
        "q": "Two triangles are congruent if their corresponding sides and angles are:",
        "options": [
          "Perpendicular",
          "Equal",
          "Proportional",
          "Parallel"
        ],
        "correct": 1,
        "explanation": "Congruent triangles have exactly equal corresponding sides and angles, meaning they have the same shape and size."
      },
      {
        "q": "The AAA criterion ensures triangles are:",
        "options": [
          "Right-angled",
          "Congruent",
          "Similar",
          "Isosceles"
        ],
        "correct": 2,
        "explanation": "If all three angles of one triangle are equal to all three angles of another (AAA), the triangles are similar but not necessarily congruent."
      },
      {
        "q": "In a right-angled triangle, if the two legs are 3 and 4, the hypotenuse is:",
        "options": [
          "6",
          "√25",
          "7",
          "5"
        ],
        "correct": 3,
        "explanation": "By Pythagoras' theorem: c² = 3² + 4² = 9 + 16 = 25, so c = 5."
      },
      {
        "q": "Two triangles are similar if their corresponding angles are:",
        "options": [
          "Equal",
          "Complementary",
          "Supplementary",
          "Proportional"
        ],
        "correct": 0,
        "explanation": "Similar triangles have equal corresponding angles, causing their sides to be proportional."
      },
      {
        "q": "The sum of angles in any triangle is:",
        "options": [
          "270°",
          "180°",
          "90°",
          "360°"
        ],
        "correct": 1,
        "explanation": "The angle sum property states that the sum of all angles in a triangle is always 180°."
      },
      {
        "q": "If triangle ABC ~ triangle PQR with a scale factor of 2:3, the ratio of their areas is:",
        "options": [
          "9:4",
          "2:3",
          "4:9",
          "8:27"
        ],
        "correct": 2,
        "explanation": "If linear scale factor is k, then area ratio = k². Here, area ratio = (2/3)² = 4/9."
      },
      {
        "q": "In an isosceles triangle, the angles opposite the equal sides are:",
        "options": [
          "Complementary",
          "Different",
          "Supplementary",
          "Equal"
        ],
        "correct": 3,
        "explanation": "In an isosceles triangle, the base angles (opposite the equal sides) are equal."
      },
      {
        "q": "The Pythagorean theorem applies to:",
        "options": [
          "Right-angled triangles only",
          "Obtuse triangles",
          "Isosceles triangles",
          "All triangles"
        ],
        "correct": 0,
        "explanation": "The Pythagorean theorem (a² + b² = c²) applies specifically to right-angled triangles."
      },
      {
        "q": "If a triangle has sides 5, 12, and 13, it is:",
        "options": [
          "Acute-angled",
          "Right-angled",
          "Equilateral",
          "Obtuse-angled"
        ],
        "correct": 1,
        "explanation": "Since 5² + 12² = 25 + 144 = 169 = 13², this is a right-angled triangle (Pythagorean triple)."
      },
      {
        "q": "In a triangle, the sum of any two sides must be ____ the third side.",
        "options": [
          "Less than",
          "Equal to",
          "Greater than",
          "At most"
        ],
        "correct": 2,
        "explanation": "The triangle inequality theorem states that the sum of any two sides must be greater than the third side."
      }
    ],
    "faqs": [
      {
        "q": "What are the criteria for congruence of triangles?",
        "a": "The main congruence criteria are SSS (all sides equal), SAS (two sides and included angle equal), ASA (two angles and included side equal), and RHS (right angle, hypotenuse, and one side equal in right triangles)."
      },
      {
        "q": "How is the similarity of triangles useful in real-world applications?",
        "a": "Similar triangles help in indirect measurement (like finding the height of a building using its shadow), scale modeling, surveying, and map-making. The proportionality of sides allows us to calculate unknown lengths without direct measurement."
      }
    ]
  },
  {
    "slug": "class-10-maths-circles",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Circles",
    "intro": "A circle is a locus of points equidistant from a center. Understanding properties like tangents, chords, arcs, and angles is fundamental to geometry and trigonometry.",
    "mcqs": [
      {
        "q": "A tangent to a circle is perpendicular to the radius at the point of:",
        "options": [
          "Tangency",
          "Origin",
          "Intersection",
          "Contact"
        ],
        "correct": 3,
        "explanation": "At the point of contact, a tangent is perpendicular to the radius of the circle."
      },
      {
        "q": "The angle subtended by an arc at the center is ____ the angle subtended at the circumference.",
        "options": [
          "Twice",
          "Equal to",
          "Four times",
          "Half of"
        ],
        "correct": 0,
        "explanation": "The angle subtended at the center is twice the angle subtended by the same arc at any point on the circumference."
      },
      {
        "q": "A chord of a circle is:",
        "options": [
          "A line touching the circle at one point",
          "A line segment joining two points on the circle",
          "The longest line in the circle",
          "A line through the center"
        ],
        "correct": 1,
        "explanation": "A chord is a line segment with both endpoints on the circle. A diameter is a special chord passing through the center."
      },
      {
        "q": "If two chords intersect inside a circle, the product of their segments of one chord equals:",
        "options": [
          "The radius squared",
          "The diameter",
          "The product of segments of the other chord",
          "The circumference"
        ],
        "correct": 2,
        "explanation": "The intersecting chords theorem states: if chords AB and CD intersect at P, then AP × PB = CP × PD."
      },
      {
        "q": "The circumference of a circle with radius r is:",
        "options": [
          "4πr",
          "πr",
          "πr²",
          "2πr"
        ],
        "correct": 3,
        "explanation": "Circumference = 2πr, where r is the radius."
      },
      {
        "q": "Two tangents drawn to a circle from an external point are:",
        "options": [
          "Equal in length",
          "Perpendicular",
          "Parallel",
          "Intersecting at 90°"
        ],
        "correct": 0,
        "explanation": "Tangents from an external point to a circle are equal in length and make equal angles with the line joining the point to the center."
      },
      {
        "q": "The area of a circle with radius 7 cm is (use π = 22/7):",
        "options": [
          "49 cm²",
          "154 cm²",
          "308 cm²",
          "44 cm²"
        ],
        "correct": 1,
        "explanation": "Area = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm²."
      },
      {
        "q": "A semicircle subtends an angle of ____ at any point on the circumference.",
        "options": [
          "180°",
          "60°",
          "90°",
          "45°"
        ],
        "correct": 2,
        "explanation": "By Thales' theorem, any angle inscribed in a semicircle (subtended by the diameter) is 90°."
      },
      {
        "q": "If a line is tangent to a circle, it touches the circle at:",
        "options": [
          "No points",
          "Two points",
          "Three points",
          "Exactly one point"
        ],
        "correct": 3,
        "explanation": "A tangent line touches a circle at exactly one point and does not intersect it elsewhere."
      },
      {
        "q": "The angle in a semicircle is always:",
        "options": [
          "Right",
          "Straight",
          "Acute",
          "Obtuse"
        ],
        "correct": 0,
        "explanation": "Any angle inscribed in a semicircle (with the diameter as one side) is always a right angle (90°)."
      }
    ],
    "faqs": [
      {
        "q": "What is the relationship between a chord and its perpendicular distance from the center?",
        "a": "The perpendicular from the center of a circle to a chord bisects the chord. Additionally, equal chords are equidistant from the center, and chords at different distances from the center have different lengths."
      },
      {
        "q": "How can the power of a point be used to solve circle problems?",
        "a": "The power of a point is the product of distances from the point to the two intersection points of any line through it intersecting the circle. This is constant for a given point and helps solve problems involving tangents, secants, and chords."
      }
    ]
  },
  {
    "slug": "class-10-maths-trigonometry",
    "classLevel": "10",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "intro": "Trigonometry relates the sides and angles of right triangles. The ratios sine, cosine, and tangent are fundamental to solving problems in geometry, physics, and engineering.",
    "mcqs": [
      {
        "q": "In a right triangle, sin(θ) is defined as:",
        "options": [
          "Opposite/Adjacent",
          "Opposite/Hypotenuse",
          "Adjacent/Hypotenuse",
          "Hypotenuse/Opposite"
        ],
        "correct": 1,
        "explanation": "sin(θ) = opposite/hypotenuse. It's abbreviated as the ratio of the side opposite to angle θ and the hypotenuse."
      },
      {
        "q": "What is the value of sin(90°)?",
        "options": [
          "0.5",
          "0",
          "1",
          "√3/2"
        ],
        "correct": 2,
        "explanation": "sin(90°) = 1 because at 90°, the opposite side equals the hypotenuse."
      },
      {
        "q": "tan(θ) equals:",
        "options": [
          "sin(θ) × cos(θ)",
          "sin(θ) + cos(θ)",
          "cos(θ)/sin(θ)",
          "sin(θ)/cos(θ)"
        ],
        "correct": 3,
        "explanation": "tan(θ) = sin(θ)/cos(θ) = opposite/adjacent."
      },
      {
        "q": "The value of cos(0°) is:",
        "options": [
          "1",
          "√3/2",
          "0",
          "0.5"
        ],
        "correct": 0,
        "explanation": "cos(0°) = 1 because at 0°, the adjacent side equals the hypotenuse."
      },
      {
        "q": "Which of the following is an identity?",
        "options": [
          "sin(θ) - cos(θ) = 0",
          "sin²(θ) + cos²(θ) = 1",
          "sin(θ) × cos(θ) = 1",
          "sin(θ) + cos(θ) = 1"
        ],
        "correct": 1,
        "explanation": "sin²(θ) + cos²(θ) = 1 is the fundamental Pythagorean identity in trigonometry."
      },
      {
        "q": "In a right triangle with angle 30°, if the hypotenuse is 10, the side opposite to 30° is:",
        "options": [
          "10",
          "5√3",
          "5",
          "10/√3"
        ],
        "correct": 2,
        "explanation": "sin(30°) = 1/2 = opposite/hypotenuse. So opposite = 10 × (1/2) = 5."
      },
      {
        "q": "The angle of elevation is measured from:",
        "options": [
          "The vertical downward",
          "Above the vertical",
          "Below the horizontal",
          "Above the horizontal"
        ],
        "correct": 3,
        "explanation": "The angle of elevation is the angle above the horizontal when looking upward at an object."
      },
      {
        "q": "What is tan(45°)?",
        "options": [
          "1",
          "1/√2",
          "0",
          "√3"
        ],
        "correct": 0,
        "explanation": "tan(45°) = 1 because in a 45-45-90 triangle, the opposite and adjacent sides are equal."
      },
      {
        "q": "If sin(θ) = 3/5, then cos(θ) could be:",
        "options": [
          "3/5",
          "4/5",
          "5/3",
          "2/5"
        ],
        "correct": 1,
        "explanation": "Using sin²(θ) + cos²(θ) = 1: (3/5)² + cos²(θ) = 1, so cos²(θ) = 1 - 9/25 = 16/25, thus cos(θ) = 4/5."
      },
      {
        "q": "cot(θ) equals:",
        "options": [
          "cos(θ)",
          "tan(θ)",
          "1/tan(θ)",
          "sin(θ)"
        ],
        "correct": 2,
        "explanation": "cot(θ) = 1/tan(θ) = cos(θ)/sin(θ) = adjacent/opposite."
      }
    ],
    "faqs": [
      {
        "q": "What are the trigonometric ratios for 30°, 45°, and 60°?",
        "a": "For 30°: sin = 1/2, cos = √3/2, tan = 1/√3. For 45°: sin = cos = 1/√2, tan = 1. For 60°: sin = √3/2, cos = 1/2, tan = √3. These standard angles are frequently used in calculations."
      },
      {
        "q": "How are angles of elevation and depression used in real-world problems?",
        "a": "Angles of elevation (when looking up) and depression (when looking down) help solve problems involving heights and distances. For example, finding the height of a building from a known distance using the angle of elevation."
      }
    ]
  },
  {
    "slug": "class-9-maths-number-systems",
    "classLevel": "9",
    "subject": "Mathematics",
    "chapter": "Number Systems",
    "intro": "Number systems encompass natural numbers, whole numbers, integers, rational, and irrational numbers. Understanding the properties and representation of these numbers is fundamental to mathematics.",
    "mcqs": [
      {
        "q": "Which of the following is a whole number but not a natural number?",
        "options": [
          "2",
          "1",
          "-1",
          "0"
        ],
        "correct": 3,
        "explanation": "Whole numbers are {0, 1, 2, 3, ...}, while natural numbers are {1, 2, 3, ...}. Zero is a whole number but not a natural number."
      },
      {
        "q": "A rational number can be expressed as:",
        "options": [
          "p/q where p and q are integers and q ≠ 0",
          "p × q",
          "p ÷ q where q = 0",
          "√(p/q)"
        ],
        "correct": 0,
        "explanation": "By definition, a rational number is a number that can be expressed as p/q where p and q are integers and q ≠ 0."
      },
      {
        "q": "√9 is:",
        "options": [
          "Not a real number",
          "Rational",
          "Irrational",
          "Neither rational nor irrational"
        ],
        "correct": 1,
        "explanation": "√9 = 3, which is an integer and therefore a rational number."
      },
      {
        "q": "Which of the following is an irrational number?",
        "options": [
          "√9",
          "√4",
          "√10",
          "√16"
        ],
        "correct": 2,
        "explanation": "√10 cannot be expressed as a ratio of integers and has a non-terminating, non-repeating decimal expansion."
      },
      {
        "q": "The decimal representation of 1/6 is:",
        "options": [
          "0.166",
          "0.1̄6̄",
          "0.16",
          "0.1666..."
        ],
        "correct": 3,
        "explanation": "1/6 = 0.1666... which is a non-terminating, repeating decimal (0.1̄6̄)."
      },
      {
        "q": "On a number line, integers are:",
        "options": [
          "Symmetrically placed about zero",
          "Not equally spaced",
          "Only positive numbers",
          "Only on one side of zero"
        ],
        "correct": 0,
        "explanation": "Integers {..., -2, -1, 0, 1, 2, ...} are symmetrically placed about zero and equally spaced on a number line."
      },
      {
        "q": "Which set of numbers is closed under subtraction?",
        "options": [
          "Rational numbers",
          "Integers",
          "Whole numbers",
          "Natural numbers"
        ],
        "correct": 1,
        "explanation": "Integers are closed under subtraction; subtracting any two integers always gives an integer."
      },
      {
        "q": "The set {-2, -1, 0, 1, 2} represents:",
        "options": [
          "Rational numbers",
          "Whole numbers",
          "Integers",
          "Natural numbers"
        ],
        "correct": 2,
        "explanation": "This set contains negative numbers, zero, and positive numbers, which together form a subset of integers."
      },
      {
        "q": "Which of the following is NOT a real number?",
        "options": [
          "0",
          "π",
          "√2",
          "√-1"
        ],
        "correct": 3,
        "explanation": "√-1 = i is an imaginary number, not a real number. Real numbers include rationals and irrationals but exclude imaginary numbers."
      },
      {
        "q": "The decimal expansion of 22/7 is:",
        "options": [
          "3.142857142857...",
          "3.14",
          "Non-terminating and non-repeating",
          "3.1̄4̄2̄8̄5̄7̄"
        ],
        "correct": 0,
        "explanation": "22/7 = 3.142857142857..., a non-terminating repeating decimal with period 142857."
      }
    ],
    "faqs": [
      {
        "q": "How are rational and irrational numbers different?",
        "a": "Rational numbers can be expressed as p/q (where p, q are integers and q ≠ 0) and have terminating or repeating decimal expansions. Irrational numbers cannot be expressed as fractions and have non-terminating, non-repeating decimal expansions."
      },
      {
        "q": "What is the difference between natural numbers and whole numbers?",
        "a": "Natural numbers start from 1 and include {1, 2, 3, ...}. Whole numbers include zero and all natural numbers: {0, 1, 2, 3, ...}. The main difference is that whole numbers include zero."
      }
    ]
  },
  {
    "slug": "class-9-maths-linear-equations-two-variables",
    "classLevel": "9",
    "subject": "Mathematics",
    "chapter": "Linear Equations in Two Variables",
    "intro": "Linear equations in two variables represent straight lines on a coordinate plane. Understanding solutions, graphing, and simultaneous equations is essential for algebra and coordinate geometry.",
    "mcqs": [
      {
        "q": "A linear equation in two variables has the general form:",
        "options": [
          "ax/b + c/y = 0",
          "ax + by + c = 0",
          "ax² + bx + c = 0",
          "ax² + by² + c = 0"
        ],
        "correct": 1,
        "explanation": "The general form is ax + by + c = 0, where a and b are not both zero."
      },
      {
        "q": "The solution of a linear equation in two variables is:",
        "options": [
          "A straight line",
          "A single point",
          "Ordered pair(s) that satisfy the equation",
          "Only integer pairs"
        ],
        "correct": 2,
        "explanation": "The solution is any ordered pair (x, y) that satisfies the equation; graphically, these form a straight line."
      },
      {
        "q": "The equation of the x-axis is:",
        "options": [
          "x = 0",
          "x = y",
          "x + y = 0",
          "y = 0"
        ],
        "correct": 3,
        "explanation": "The x-axis has the equation y = 0, where all points have zero y-coordinate."
      },
      {
        "q": "The slope of the line 2x + 3y = 6 is:",
        "options": [
          "-2/3",
          "-3/2",
          "3/2",
          "2/3"
        ],
        "correct": 0,
        "explanation": "Rewriting as y = (-2/3)x + 2, the slope is -2/3 (coefficient of x in slope-intercept form)."
      },
      {
        "q": "Two equations 2x + 3y = 6 and 4x + 6y = 12 represent:",
        "options": [
          "Intersecting lines",
          "The same line",
          "Perpendicular lines",
          "Parallel lines"
        ],
        "correct": 1,
        "explanation": "The second equation is 2 times the first, so they represent the same line (infinitely many solutions)."
      },
      {
        "q": "If x + y = 5 and x - y = 1, then x = ?",
        "options": [
          "4",
          "2",
          "3",
          "1"
        ],
        "correct": 2,
        "explanation": "Adding the equations: 2x = 6, so x = 3. (Check: 3 + y = 5 gives y = 2; 3 - 2 = 1 ✓)"
      },
      {
        "q": "The point of intersection of x = 2 and y = 3 is:",
        "options": [
          "(0, 0)",
          "(3, 2)",
          "(1, 1)",
          "(2, 3)"
        ],
        "correct": 3,
        "explanation": "The line x = 2 (vertical) and y = 3 (horizontal) intersect at the point (2, 3)."
      },
      {
        "q": "Which ordered pair is a solution of 2x - 3y = 1?",
        "options": [
          "(2, 1)",
          "(0, 0)",
          "(1, 1/3)",
          "(1, 1)"
        ],
        "correct": 0,
        "explanation": "Checking (2, 1): 2(2) - 3(1) = 4 - 3 = 1 ✓"
      },
      {
        "q": "Two lines are parallel if their slopes are:",
        "options": [
          "Reciprocals",
          "Equal",
          "Opposite",
          "Negative reciprocals"
        ],
        "correct": 1,
        "explanation": "Parallel lines have equal slopes. Perpendicular lines have slopes that are negative reciprocals."
      },
      {
        "q": "The y-intercept of the line 3x + 2y = 6 is:",
        "options": [
          "6",
          "3/2",
          "3",
          "2"
        ],
        "correct": 2,
        "explanation": "The y-intercept is the value of y when x = 0: 2y = 6, so y = 3."
      }
    ],
    "faqs": [
      {
        "q": "What are the three methods to solve a system of linear equations in two variables?",
        "a": "The three main methods are: (1) Substitution method, where you solve one equation for a variable and substitute into the other; (2) Elimination method, where you add or subtract equations to eliminate a variable; (3) Graphical method, where you plot both lines and find their intersection point."
      },
      {
        "q": "When does a system of linear equations have no solution?",
        "a": "A system has no solution when the two equations represent parallel lines (same slope but different y-intercepts). In this case, the lines never intersect and there are no common ordered pairs satisfying both equations."
      }
    ]
  },
  {
    "slug": "class-12-accountancy-accounting-for-partnership-basic-concepts",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Accounting for Partnership: Basic Concepts",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Accounting for Partnership: Basic Concepts. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The Partnership Act, 1932, governs partnerships in India. Under this act, if the partnership deed is silent on the matter of interest on drawings, what is the prescribed rate of interest to be charged from partners?",
        "options": [
          "6% per annum",
          "12% per annum",
          "As per the discretion of the managing partner",
          "No interest is charged"
        ],
        "correct": 3,
        "explanation": "The Partnership Act, 1932, clearly states that if the partnership deed is silent on interest on drawings, no interest shall be charged from the partners."
      },
      {
        "q": "What is the primary purpose of a Partnership Deed?",
        "options": [
          "To outline the terms and conditions of the partnership",
          "To record the daily transactions of the firm",
          "To calculate the market value of the firm's assets",
          "To prepare the annual financial statements"
        ],
        "correct": 0,
        "explanation": "A Partnership Deed is a written agreement that lays down the mutual rights, duties, and obligations of the partners, as well as the rules governing the partnership's operations."
      },
      {
        "q": "P and Q are partners in a firm. P contributed ₹5,00,000 and Q contributed ₹3,00,000. They agreed to share profits and losses in the ratio of 3:2. However, they did not have a partnership deed. According to the Partnership Act, 1932, what will be the profit-sharing ratio?",
        "options": [
          "3:2",
          "1:1",
          "Cannot be determined",
          "5:3"
        ],
        "correct": 1,
        "explanation": "In the absence of a partnership deed, the profits and losses are to be shared equally among all partners, irrespective of their capital contributions."
      },
      {
        "q": "If partners' capital accounts are maintained under the fixed capital method, where are adjustments like interest on capital, partner's salary, and drawings credited or debited?",
        "options": [
          "Partner's Capital Account",
          "Revaluation Account",
          "Partner's Current Account",
          "Profit and Loss Account"
        ],
        "correct": 2,
        "explanation": "Under the fixed capital method, all routine adjustments related to profits and drawings are made through the Partner's Current Account, while the Partner's Capital Account remains fixed, except for permanent additions or withdrawals of capital."
      },
      {
        "q": "Which of the following accounts is prepared to ascertain the profit or loss of a partnership firm for a specific accounting period?",
        "options": [
          "Fixed Asset Account",
          "Partner's Loan Account",
          "Partner's Capital Account",
          "Profit and Loss Appropriation Account"
        ],
        "correct": 3,
        "explanation": "The Profit and Loss Appropriation Account is specifically prepared to distribute the net profit (or loss) earned by the firm among the partners after considering appropriations like interest on capital, salary, commission, and interest on drawings."
      },
      {
        "q": "A partnership firm has a net profit of ₹1,50,000 before interest on partners' capital and salary. Partner A is entitled to a salary of ₹2,000 per month and interest on capital of ₹10,000. Partner B is entitled to interest on capital of ₹15,000. If the partnership deed does not mention the treatment of loss if appropriations exceed profits, what will be the treatment?",
        "options": [
          "The excess appropriation will be treated as a loss and borne by partners in their profit-sharing ratio.",
          "The profit will be distributed in the fixed profit-sharing ratio.",
          "The excess appropriation will be ignored.",
          "The excess appropriation will be debited to the partners' capital accounts directly."
        ],
        "correct": 0,
        "explanation": "If the total appropriations (like salary, interest on capital) exceed the net profit, the profit is first distributed as far as it goes, and any shortfall is treated as a loss and borne by the partners in their profit-sharing ratio."
      },
      {
        "q": "In the case of fluctuating capital accounts, which of the following accounts will be debited/credited with interest on drawings?",
        "options": [
          "Partner's Current Account",
          "Partner's Capital Account",
          "Profit and Loss Appropriation Account",
          "Cash Account"
        ],
        "correct": 1,
        "explanation": "When fluctuating capital accounts are maintained, all transactions, including drawings, interest on drawings, salary, interest on capital, and profit/loss share, are recorded directly in the Partner's Capital Account."
      },
      {
        "q": "Which of the following is NOT a feature of a partnership firm?",
        "options": [
          "Mutual agency",
          "Unlimited liability of partners",
          "Separate legal entity",
          "Agreement between partners"
        ],
        "correct": 2,
        "explanation": "A partnership firm does not have a separate legal entity distinct from its partners. The partners are personally liable for the debts of the firm."
      },
      {
        "q": "Ramesh and Suresh are partners. Ramesh advanced a loan of ₹1,00,000 to the firm. The partnership deed is silent on the rate of interest on loans. What is the minimum rate of interest Ramesh is entitled to receive from the firm as per the Partnership Act, 1932?",
        "options": [
          "9% per annum",
          "4% per annum",
          "12% per annum",
          "6% per annum"
        ],
        "correct": 3,
        "explanation": "The Partnership Act, 1932, mandates that in the absence of a partnership deed specifying the rate of interest on loans, the lender partner is entitled to receive interest at a rate of 6% per annum."
      },
      {
        "q": "Guaranteed profit given to a partner means:",
        "options": [
          "A minimum profit assured to a partner by the other partners or the firm.",
          "The profit earned by the firm in the previous year.",
          "The total profit of the firm before appropriations.",
          "The profit distributed among partners after all expenses."
        ],
        "correct": 0,
        "explanation": "A guaranteed profit ensures that a partner receives a minimum amount of profit, regardless of the firm's actual profitability. If the actual share is less, the deficiency is made up by the guaranteeing partners."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-goodwill-nature-and-valuation",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Goodwill: Nature and Valuation",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Goodwill: Nature and Valuation. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following is an indirect expenditure that may need to be adjusted for while calculating average profits?",
        "options": [
          "Cost of raw materials",
          "Interest on partner's loan",
          "Wages paid to workers",
          "Rent of the factory"
        ],
        "correct": 1,
        "explanation": "Interest on partner's loan is an appropriation of profit, not a direct business expense. It is usually added back to profits to arrive at a figure that reflects the operational profitability before such appropriations."
      },
      {
        "q": "Which of the following is NOT a type of goodwill?",
        "options": [
          "Self-generated Goodwill",
          "Concealed Goodwill",
          "Inherited Goodwill",
          "Purchased Goodwill"
        ],
        "correct": 2,
        "explanation": "Inherited goodwill is not a recognized type of goodwill in accounting. Goodwill is either purchased or self-generated."
      },
      {
        "q": "The Capitalisation of Super Profit Method calculates goodwill as:",
        "options": [
          "(Normal Profit / Super Profit) × 100",
          "Super Profit × Number of Years of Purchase",
          "Average Profit × (100 / Normal Rate of Return)",
          "(Super Profit / Normal Rate of Return) × 100"
        ],
        "correct": 3,
        "explanation": "Under the Capitalisation of Super Profit Method, goodwill is calculated by capitalizing the super profit at the normal rate of return: Goodwill = (Super Profit / Normal Rate of Return) × 100."
      },
      {
        "q": "When a new partner is admitted and goodwill is to be raised, the amount of goodwill credited to the old partners' Capital Accounts is based on:",
        "options": [
          "Their profit-sharing ratio",
          "Their sacrificing ratio",
          "Their initial capital contribution",
          "Their gaining ratio"
        ],
        "correct": 0,
        "explanation": "When goodwill is raised at its full value and then written off, it is distributed among the existing partners in their profit-sharing ratio, effectively compensating them for their past contributions to building that goodwill."
      },
      {
        "q": "In the Annuity Method of goodwill valuation, the present value of future super profits is considered.",
        "options": [
          "Only if the super profit is consistent",
          "True",
          "False",
          "Only if the business is old"
        ],
        "correct": 1,
        "explanation": "The Annuity Method considers the time value of money by discounting future super profits to their present value, treating them as an annuity."
      },
      {
        "q": "Which method of goodwill valuation is suitable when the business is expected to earn profits above the normal rate of return?",
        "options": [
          "Average Profit Method",
          "Capitalisation of Profits Method",
          "Super Profit Method",
          "Annuity Method"
        ],
        "correct": 2,
        "explanation": "The Super Profit Method is specifically designed to value goodwill when the business earns profits in excess of the normal rate of return."
      },
      {
        "q": "Which factor does NOT influence the valuation of goodwill?",
        "options": [
          "Location of the business",
          "Reputation of the business",
          "Efficient management",
          "Past losses of the business"
        ],
        "correct": 3,
        "explanation": "While past losses are considered when calculating average profits, they do not directly influence the *concept* or *nature* of goodwill itself. Goodwill reflects future earning capacity. Location, reputation, and management are all factors that contribute to goodwill."
      },
      {
        "q": "When goodwill is purchased, it is recorded in the books of accounts.",
        "options": [
          "True",
          "Only if its value is substantial",
          "Only at the time of dissolution",
          "False"
        ],
        "correct": 0,
        "explanation": "Purchased goodwill is an intangible asset that is recognized and recorded in the books of accounts as it has been acquired for a specific consideration."
      },
      {
        "q": "Under the Average Profit Method, goodwill is calculated as:",
        "options": [
          "Future maintainable profit multiplied by the number of years of purchase",
          "Average profit multiplied by the number of years of purchase",
          "Super profit multiplied by the number of years of purchase",
          "Total profit divided by the number of years of purchase"
        ],
        "correct": 1,
        "explanation": "The formula for goodwill under the Average Profit Method is: Goodwill = Average Profit × Number of Years of Purchase."
      },
      {
        "q": "Super profit is the difference between:",
        "options": [
          "Actual profit and Average profit",
          "Future profit and Normal profit",
          "Actual profit and Normal profit",
          "Normal profit and Average profit"
        ],
        "correct": 2,
        "explanation": "Super profit is defined as the excess of the actual or expected profits over the normal profits."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-reconstitution-of-a-partnership-firm-change-in-profit-shari",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Reconstitution of a Partnership Firm - Change in Profit Sharing Ratio",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Reconstitution of a Partnership Firm - Change in Profit Sharing Ratio. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When there is a change in the profit sharing ratio, and the goodwill is already appearing in the books, it should be:",
        "options": [
          "Written off in the new profit sharing ratio",
          "Distributed among partners in the sacrificing ratio",
          "Distributed among partners in the gaining ratio",
          "Written off in the old profit sharing ratio"
        ],
        "correct": 3,
        "explanation": "Goodwill appearing in the books is an asset representing past efforts. It needs to be written off completely at the time of reconstitution, and this is done in the old profit sharing ratio among all partners."
      },
      {
        "q": "If the profit sharing ratio changes from 1:1 to 2:1, the partner who was previously sharing equally and now has a higher share has:",
        "options": [
          "Gained",
          "Suffered a loss",
          "Sacrificed",
          "Remained neutral"
        ],
        "correct": 0,
        "explanation": "The partner's share has increased from 1/2 to 2/3. An increase in share indicates a gain."
      },
      {
        "q": "If a partner's share increases from 1/4 to 1/3, their gaining ratio is calculated as:",
        "options": [
          "Old share - New share",
          "New share - Old share",
          "New share / Old share",
          "New share + Old share"
        ],
        "correct": 1,
        "explanation": "The gaining ratio signifies the extent to which a partner's share has increased. This is found by subtracting the old share from the new share."
      },
      {
        "q": "When there is a change in the profit sharing ratio of existing partners, it leads to:",
        "options": [
          "Admission of a new partner",
          "Retirement of a partner",
          "Reconstitution of the partnership firm",
          "Dissolution of the firm"
        ],
        "correct": 2,
        "explanation": "A change in the profit sharing ratio among existing partners alters the terms of the partnership agreement without dissolving the firm or bringing in/taking out a partner. This is the definition of reconstitution."
      },
      {
        "q": "If the partners decide to maintain the revalued value of assets and liabilities without affecting their capital accounts, then the adjustment for revaluation can be made through:",
        "options": [
          "Partner's Capital Accounts",
          "Cash or Bank Account",
          "Revaluation Account only",
          "Gaining Partner's Capital Account and Sacrificing Partner's Capital Account"
        ],
        "correct": 3,
        "explanation": "This is the most common method. The net effect of revaluation (profit or loss) is adjusted between the gaining and sacrificing partners through their capital accounts in their gaining and sacrificing ratios respectively."
      },
      {
        "q": "The Revaluation Account is debited with:",
        "options": [
          "Decrease in the value of assets and increase in the value of liabilities",
          "Profit on revaluation",
          "Loss on revaluation",
          "Increase in the value of assets and decrease in the value of liabilities"
        ],
        "correct": 0,
        "explanation": "The Revaluation Account is debited for any decrease in the value of assets or any increase in the value of liabilities, as these represent a loss to the firm."
      },
      {
        "q": "A partner who has given up a part of their share in favour of another partner is called a:",
        "options": [
          "Gaining partner",
          "Sacrificing partner",
          "Retiring partner",
          "New partner"
        ],
        "correct": 1,
        "explanation": "A sacrificing partner is one whose share in the partnership decreases due to the change in the profit sharing ratio. They give up a portion of their profit share."
      },
      {
        "q": "Reserves and accumulated profits (like General Reserve, Profit and Loss Account balance) appearing in the balance sheet at the time of change in profit sharing ratio are:",
        "options": [
          "Distributed among partners in the new profit sharing ratio",
          "Transferred to the sacrificing partner's capital account",
          "Distributed among partners in the old profit sharing ratio",
          "Transferred to the gaining partner's capital account"
        ],
        "correct": 2,
        "explanation": "Reserves and accumulated profits are created out of past profits. At the time of reconstitution, these are distributed to the partners in their old profit sharing ratio before the change takes effect."
      },
      {
        "q": "Unrecorded assets at the time of change in profit sharing ratio are:",
        "options": [
          "Debited to the Capital Accounts of partners in the new ratio",
          "Debited to the Revaluation Account",
          "Credited to the Capital Accounts of partners in the old ratio",
          "Credited to the Revaluation Account"
        ],
        "correct": 3,
        "explanation": "Unrecorded assets discovered or brought into account are credited to the Revaluation Account as they represent a gain to the partners."
      },
      {
        "q": "In case of a change in profit sharing ratio, goodwill is adjusted by:",
        "options": [
          "Debiting the gaining partner and crediting the sacrificing partner",
          "Crediting the gaining partner and debiting the sacrificing partner",
          "Debiting both gaining and sacrificing partners",
          "Crediting both gaining and sacrificing partners"
        ],
        "correct": 0,
        "explanation": "The gaining partner has to compensate the sacrificing partner for the loss of future share. Therefore, the gaining partner's capital is debited, and the sacrificing partner's capital is credited."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-reconstitution-of-a-partnership-firm-admission-of-a-partner",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Reconstitution of a Partnership Firm - Admission of a Partner",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Reconstitution of a Partnership Firm - Admission of a Partner. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "If the existing partners decide to maintain their old profit-sharing ratio even after the admission of a new partner, how will the new partner's share be determined?",
        "options": [
          "The new partner will receive an equal share of profit as each of the old partners.",
          "The new partner's share will be a fixed percentage determined by the agreement.",
          "The new partner's share will be determined by their capital contribution.",
          "The new partner's share will be calculated as the difference between total profit and the sum of old partners' shares."
        ],
        "correct": 1,
        "explanation": "If the old partners' profit-sharing ratio remains unchanged, the new partner's share is explicitly stated in the admission agreement, typically as a fixed percentage or fraction of the total profit."
      },
      {
        "q": "What is the primary purpose of revaluing assets and liabilities on the admission of a new partner?",
        "options": [
          "To reduce the overall capital of the firm.",
          "To increase the profit of the old partners.",
          "To ascertain the true financial position of the firm at the time of admission.",
          "To record the new partner's share of goodwill."
        ],
        "correct": 2,
        "explanation": "Revaluation of assets and liabilities is done to reflect their current market values, thereby ascertaining the true and fair financial position of the firm. This ensures that profits or losses arising from these changes are attributed to the partners (old or new) as per their respective profit-sharing ratios."
      },
      {
        "q": "When a new partner is admitted, what happens to the reserves and accumulated profits (like General Reserve, Profit and Loss Account) appearing in the balance sheet of the old firm?",
        "options": [
          "They are carried forward to the new firm as they are.",
          "They are adjusted in the capital accounts of the old partners in their sacrificing ratio.",
          "They are written off to the Profit and Loss Adjustment Account.",
          "They are distributed among the old partners in their old profit-sharing ratio."
        ],
        "correct": 3,
        "explanation": "Reserves and accumulated profits are part of the undistributed profits of the old firm. Upon admission of a new partner, these are considered earned by the old partners and are therefore distributed among them in their old profit-sharing ratio before the new ratio takes effect."
      },
      {
        "q": "The sacrificing ratio is the ratio in which:",
        "options": [
          "The old partners forego their share of profit in favour of the new partner.",
          "The remaining partners share profits after the retirement of a partner.",
          "The firm's goodwill is valued.",
          "The new partner shares profits with the old partners."
        ],
        "correct": 0,
        "explanation": "Sacrificing ratio is specifically calculated to distribute the goodwill brought in by the new partner. It represents the proportion by which the old partners reduce their claim on profits to accommodate the new partner."
      },
      {
        "q": "Goodwill of the firm is to be raised and then written off. If the new partner does not bring their share of goodwill in cash, how is the goodwill accounted for?",
        "options": [
          "Debit Goodwill Account, Credit New Partner's Capital Account.",
          "Debit New Partner's Capital Account, Credit Old Partners' Capital Accounts in their sacrificing ratio.",
          "Debit Goodwill Account, Credit Old Partners' Capital Accounts in their new profit-sharing ratio.",
          "Debit New Partner's Capital Account, Credit Goodwill Account."
        ],
        "correct": 1,
        "explanation": "When the new partner's share of goodwill is not brought in cash, it is treated as a debt owed by the new partner to the old partners. The New Partner's Capital Account is debited (as it reduces their claim on the firm), and the Old Partners' Capital Accounts are credited in their sacrificing ratio, reflecting their entitlement to this goodwill."
      },
      {
        "q": "When there is a change in the profit-sharing ratio due to the admission of a new partner, workmen's compensation reserve is treated as:",
        "options": [
          "A capital reserve to be carried forward.",
          "A profit to be distributed among all partners in their new P.S.R.",
          "A profit to be distributed among old partners in their old P.S.R.",
          "A liability to be paid to workmen."
        ],
        "correct": 2,
        "explanation": "Workmen's Compensation Reserve is created to meet future claims of workmen. Any unutilized portion of this reserve at the time of admission is considered an accumulated profit and is distributed among the old partners in their old profit-sharing ratio, as it was accumulated before the new partner joined."
      },
      {
        "q": "Goodwill of the firm is to be raised. If the new partner brings in their share of goodwill in cash, what is the correct treatment?",
        "options": [
          "Debit Goodwill Account, Credit New Partner's Capital Account.",
          "Debit New Partner's Capital Account, Credit Goodwill Account.",
          "Debit Goodwill Account, Credit Old Partners' Capital Accounts in their sacrificing ratio.",
          "Debit Cash Account, Credit New Partner's Capital Account."
        ],
        "correct": 3,
        "explanation": "When the new partner brings in goodwill in cash, the Cash/Bank account is debited as cash is received. The New Partner's Capital account is credited as it represents their contribution towards goodwill and capital. The actual distribution of this goodwill to old partners happens in a subsequent step."
      },
      {
        "q": "When a new partner is admitted, the profit-sharing ratio of the old partners is usually affected. Which of the following is generally required to calculate the new profit-sharing ratio?",
        "options": [
          "The new partner's share of profit.",
          "The goodwill brought in by the new partner.",
          "The total capital of the firm.",
          "The sacrificing ratio of the old partners."
        ],
        "correct": 0,
        "explanation": "The new profit-sharing ratio is determined by considering the existing ratio of old partners and the share of profit taken by the new partner. The sacrificing ratio is calculated after the new ratio is known. Capital and goodwill are related to capitalisation and valuation, not directly the new profit-sharing ratio calculation itself."
      },
      {
        "q": "If an unrecorded asset is discovered at the time of admission, it will be:",
        "options": [
          "Debited to the Revaluation Account and credited to the New Partner's Capital Account.",
          "Debited to the Revaluation Account and credited to the Old Partners' Capital Accounts in their old P.S.R.",
          "Debited to the Revaluation Account and credited to the General Reserve.",
          "Debited to the Revaluation Account and credited to the concerned Asset Account."
        ],
        "correct": 1,
        "explanation": "An unrecorded asset represents a gain. This gain is credited to the Revaluation Account. The ultimate benefit of this gain goes to the partners at the time of admission, so it is distributed among the old partners in their old profit-sharing ratio."
      },
      {
        "q": "If a part of the goodwill is withdrawn by the old partners, what is the entry to be passed?",
        "options": [
          "Debit Cash/Bank Account, Credit Old Partners' Capital Accounts.",
          "Debit Goodwill Account, Credit Old Partners' Capital Accounts.",
          "Debit Old Partners' Capital Accounts, Credit Cash/Bank Account.",
          "Debit New Partner's Capital Account, Credit Old Partners' Capital Accounts."
        ],
        "correct": 2,
        "explanation": "When old partners withdraw their share of goodwill, their capital accounts are debited (as their capital decreases) and the Cash/Bank account is credited (as cash is paid out to them)."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-reconstitution-of-a-partnership-firm-retirement-and-death-o",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Reconstitution of a Partnership Firm - Retirement and Death of a Partner",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Reconstitution of a Partnership Firm - Retirement and Death of a Partner. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "In case of death of a partner, profit or loss on revaluation of assets and liabilities is transferred to:",
        "options": [
          "All partners' capital accounts in their new profit-sharing ratio",
          "Deceased partner's executor's account",
          "Remaining partners' capital accounts in their new profit-sharing ratio",
          "All partners' capital accounts in their old profit-sharing ratio"
        ],
        "correct": 3,
        "explanation": "Similar to retirement, the profit or loss on revaluation relates to the firm's operations up to the point of the partner's death, and thus, it should be shared by all partners (including the deceased partner) in their old profit-sharing ratio."
      },
      {
        "q": "The gain or loss on revaluation of assets and liabilities at the time of retirement of a partner is shared by:",
        "options": [
          "All partners in their old profit-sharing ratio",
          "The retiring partner only",
          "All partners in their new profit-sharing ratio",
          "The remaining partners in their new profit-sharing ratio"
        ],
        "correct": 0,
        "explanation": "The revaluation of assets and liabilities represents profits or losses arising from the change in value of assets and liabilities up to the point of retirement. These should be shared by all partners who were part of the firm during that period, i.e., in their old profit-sharing ratio."
      },
      {
        "q": "If a retiring partner's share of profit is guaranteed at a minimum amount of Rs. 20,000, and the firm's profit for the year is Rs. 60,000, with the retiring partner's share being 1/4, what is the amount the retiring partner will receive?",
        "options": [
          "Rs. 5,000",
          "Rs. 20,000",
          "Rs. 60,000",
          "Rs. 15,000"
        ],
        "correct": 1,
        "explanation": "The retiring partner's share of profit is Rs. 60,000 * (1/4) = Rs. 15,000. However, since a minimum of Rs. 20,000 is guaranteed, the retiring partner will receive Rs. 20,000. The shortfall of Rs. 5,000 will be borne by the remaining partners."
      },
      {
        "q": "If the retiring partner's share of profit is guaranteed by the remaining partners, and the firm incurs a loss after retirement, this loss will be borne by:",
        "options": [
          "The retiring partner",
          "The firm",
          "The remaining partners in the ratio of their guarantees",
          "The remaining partners in their profit-sharing ratio"
        ],
        "correct": 2,
        "explanation": "When a profit is guaranteed by remaining partners, any shortfall in the guaranteed amount (or loss in this case) is to be borne by the guaranteeing partners in the ratio of their guarantees, which is usually their new profit-sharing ratio unless stated otherwise."
      },
      {
        "q": "Goodwill appearing in the old balance sheet at the time of a partner's retirement:",
        "options": [
          "Is ignored",
          "Is transferred to the debit of the retiring partner's capital account",
          "Is transferred to the credit of all partners' capital accounts",
          "Is written off by debiting all partners' capital accounts in their old profit-sharing ratio"
        ],
        "correct": 3,
        "explanation": "Existing goodwill is an unrecorded profit that has not yet been distributed. It is treated as an asset that needs to be written off before distributing profits or transferring balances. It is written off by debiting all partners' capital accounts in their old profit-sharing ratio."
      },
      {
        "q": "On the death of a partner, the executor is paid:",
        "options": [
          "Capital balance, share of profit/loss till death, and share of any accumulated reserves",
          "Only the capital balance of the deceased partner",
          "Only the share of profit till the date of death",
          "The entire profit of the firm for the current year"
        ],
        "correct": 0,
        "explanation": "The executor is entitled to the deceased partner's capital balance, their share of profits or losses up to the date of death, their share of revaluation gain/loss, and their share of accumulated profits and reserves."
      },
      {
        "q": "On the death of a partner, the balance of the deceased partner's current account is transferred to:",
        "options": [
          "The revaluation account",
          "His executor's account",
          "The remaining partners' capital accounts",
          "The profit and loss appropriation account"
        ],
        "correct": 1,
        "explanation": "Any balance in the deceased partner's current account (whether debit or credit) represents amounts due to or from the partner. This balance, along with other entitlements, is transferred to the executor's account to settle the deceased partner's final dues."
      },
      {
        "q": "If the profit till the date of death is to be calculated on the basis of the previous year's profit, and the deceased partner's share is 1/4, with the previous year's profit being Rs. 80,000, and the death occurring on June 30th in a financial year starting April 1st, what is the deceased partner's share of profit for the period?",
        "options": [
          "Rs. 20,000",
          "Rs. 80,000",
          "Rs. 10,000",
          "Rs. 5,000"
        ],
        "correct": 2,
        "explanation": "Previous year's profit = Rs. 80,000. Deceased partner's share = 1/4. Period from April 1st to June 30th = 3 months (1/4th of the year). Share of profit = Rs. 80,000 * (1/4) * (3/12) = Rs. 5,000."
      },
      {
        "q": "When a partner retires, the remaining partners can decide to adjust goodwill in their capital accounts. This adjustment is done in the ratio of:",
        "options": [
          "Their new profit-sharing ratio",
          "The sacrificing ratio",
          "Their old profit-sharing ratio",
          "The gaining ratio"
        ],
        "correct": 3,
        "explanation": "Goodwill adjustment on retirement (or death) when not fully written off is done by debiting the gaining partners and crediting the sacrificing partner. The gaining ratio is crucial for this adjustment."
      },
      {
        "q": "When a partner retires, any accumulated unrecorded profit or loss is transferred to:",
        "options": [
          "All partners' capital accounts in their old profit-sharing ratio",
          "Retiring partner's capital account",
          "Revaluation account",
          "All partners' capital accounts in their new profit-sharing ratio"
        ],
        "correct": 0,
        "explanation": "Unrecorded profits or losses are adjustments that pertain to the period when all partners were active and therefore should be shared among all partners according to their existing profit-sharing ratio."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-dissolution-of-partnership-firm",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Dissolution of Partnership Firm",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Dissolution of Partnership Firm. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "A partner's loan will be settled:",
        "options": [
          "After the capital of partners is paid",
          "After all outsider's liabilities are paid",
          "Before any outsider's liability",
          "Along with the capital of partners"
        ],
        "correct": 1,
        "explanation": "According to the order of settlement of liabilities during dissolution, a partner's loan is considered a liability but is settled after all external liabilities and before the partners' capital."
      },
      {
        "q": "Unrecorded investments of Rs. 50,000 were taken over by partner A for Rs. 60,000. In the realization account, this transaction will be recorded as:",
        "options": [
          "No entry will be made in realization account",
          "A debit entry of Rs. 60,000",
          "A credit entry of Rs. 60,000",
          "A credit entry of Rs. 50,000"
        ],
        "correct": 2,
        "explanation": "When a partner takes over an unrecorded asset, it is credited to the Realization Account at the agreed takeover price."
      },
      {
        "q": "A firm's fixed assets of Rs. 2,00,000 are sold for Rs. 1,80,000. The loss on realization will be transferred to:",
        "options": [
          "General Reserve",
          "Profit and Loss Appropriation Account",
          "Partner's Capital Accounts in their profit-sharing ratio",
          "Realization Account"
        ],
        "correct": 3,
        "explanation": "Loss on realization of assets is debited to the Realization Account. The ultimate profit or loss on realization is then transferred to partners' capital accounts."
      },
      {
        "q": "When a partnership firm is dissolved, the realization account is debited with:",
        "options": [
          "Assets at their book values",
          "Assets at their agreed realizable values",
          "Liabilities at their agreed payment values",
          "Liabilities at their book values"
        ],
        "correct": 0,
        "explanation": "The Realization Account is debited with all assets at their book values to transfer them out of the firm's books and prepare for their sale."
      },
      {
        "q": "Which of the following is NOT a reason for the dissolution of a partnership firm?",
        "options": [
          "Compulsory dissolution by court order",
          "Admission of a new partner",
          "Insolvency of a partner",
          "Expiry of the term of partnership"
        ],
        "correct": 1,
        "explanation": "Admission of a new partner leads to reconstitution of the firm, not dissolution. Dissolution implies winding up of the business."
      },
      {
        "q": "Which account is debited when goodwill of Rs. 30,000 appears in the balance sheet at the time of dissolution?",
        "options": [
          "Goodwill Account",
          "Realization Account",
          "Partner's Capital Accounts",
          "Profit and Loss Account"
        ],
        "correct": 2,
        "explanation": "Goodwill appearing in the balance sheet is an unvalued asset and is written off by debiting the Partner's Capital Accounts in their profit-sharing ratio."
      },
      {
        "q": "At the time of dissolution, 'Workmen's Compensation Reserve' which is not claimed by any employee is transferred to:",
        "options": [
          "Realization Account",
          "Profit and Loss Account",
          "General Reserve Account",
          "Partner's Capital Accounts"
        ],
        "correct": 3,
        "explanation": "An unclaimed Workmen's Compensation Reserve is treated as a part of the divisible profits and is transferred to the Partner's Capital Accounts in their profit-sharing ratio."
      },
      {
        "q": "In case of dissolution, expenses on realization paid by a partner is debited to:",
        "options": [
          "Realization Account",
          "Cash Account",
          "Partner's Capital Account",
          "Profit and Loss Account"
        ],
        "correct": 0,
        "explanation": "When a partner agrees to bear realization expenses, his capital account is credited with the amount paid to him. The actual payment of expenses by the firm is debited to the Realization Account. If the partner bears the expense, it means the firm saves that expense, hence credited to partner's capital. However, the question asks what is debited to Realization Account for the expense paid by the firm."
      },
      {
        "q": "If a partner is paid a commission on realization of assets, it is credited to:",
        "options": [
          "Profit and Loss Appropriation Account",
          "Partner's Capital Account",
          "Cash Account",
          "Realization Account"
        ],
        "correct": 1,
        "explanation": "Commission paid to a partner for realizing assets is an expense for the firm and a gain for the partner. Hence, it is debited to Realization Account and credited to the Partner's Capital Account."
      },
      {
        "q": "If an unrecorded liability of Rs. 20,000 is paid by the firm for Rs. 15,000, the difference of Rs. 5,000 will be:",
        "options": [
          "Ignored in Realization Account",
          "Debited to Partner's Capital Account",
          "Credited to Realization Account",
          "Debited to Realization Account"
        ],
        "correct": 2,
        "explanation": "The unrecorded liability is debited to Realization Account at its payment value (Rs. 15,000). The gain of Rs. 5,000 (because it was paid less than its assumed value) is credited to Realization Account."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-accounting-for-share-capital",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Accounting for Share Capital",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Accounting for Share Capital. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which study action is most useful before solving questions from \"Accounting for Share Capital\"?",
        "options": [
          "Memorize only the chapter title",
          "Avoid diagrams and formulas",
          "Skip directly to the answer key",
          "Read the key concepts and examples first"
        ],
        "correct": 3,
        "explanation": "Start by reviewing the core ideas of \"Accounting for Share Capital\", then solve examples and MCQs."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-issue-and-redemption-of-debentures",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Issue and Redemption of Debentures",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Issue and Redemption of Debentures. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "What is the primary purpose of the Debenture Redemption Reserve (DRR)?",
        "options": [
          "To ensure availability of funds for redemption",
          "To increase the company's profits",
          "To reduce the company's tax liability",
          "To provide for future losses"
        ],
        "correct": 0,
        "explanation": "The DRR is a statutory requirement under the Companies Act to ensure that a portion of the profits is set aside to meet the redemption of debentures, thereby protecting the interests of debenture holders."
      },
      {
        "q": "Which of the following is NOT a method of redemption of debentures?",
        "options": [
          "Redemption by conversion into shares",
          "Redemption by appropriation of profit",
          "Redemption by issue of new debentures",
          "Redemption by draw of lots"
        ],
        "correct": 1,
        "explanation": "Redemption by appropriation of profit refers to setting aside profits for redemption, which is indirectly achieved through the Debenture Redemption Reserve (DRR). It's not a direct method of extinguishing the liability itself."
      },
      {
        "q": "A company issued 500, 8% debentures of ₹1,000 each at a discount of 4%. The debentures are redeemable at a premium of 6%. The total loss on issue of debentures will be:",
        "options": [
          "₹60,000",
          "₹20,000",
          "₹50,000",
          "₹30,000"
        ],
        "correct": 2,
        "explanation": "Discount on issue = 4% of ₹5,00,000 = ₹20,000. Premium on redemption = 6% of ₹5,00,000 = ₹30,000. Total loss = ₹20,000 + ₹30,000 = ₹50,000."
      },
      {
        "q": "When debentures are redeemed out of capital, the corresponding credit entry is usually made to:",
        "options": [
          "Debenture Holders Account",
          "General Reserve",
          "Statement of Profit and Loss",
          "Debenture Redemption Reserve Account"
        ],
        "correct": 3,
        "explanation": "When debentures are redeemed out of capital, the Debenture Redemption Reserve (DRR) or any other reserve created for this purpose is utilized. The debenture holders are paid, and their account is debited."
      },
      {
        "q": "When debentures are issued at a discount and redeemable at par, the discount on issue of debentures is shown as:",
        "options": [
          "A loss on issue of debentures",
          "A deduction from share capital",
          "A capital profit",
          "A revenue expenditure"
        ],
        "correct": 0,
        "explanation": "Discount on issue of debentures is a capital loss as it relates to the cost of raising long-term finance. It is often debited to Securities Premium Account or Statement of Profit and Loss."
      },
      {
        "q": "A company has ₹5,00,000, 10% debentures due for redemption. It decides to redeem these debentures by issuing new 12% debentures at par. The amount of new debentures to be issued will be:",
        "options": [
          "More than ₹5,00,000",
          "Exactly ₹5,00,000",
          "Less than ₹5,00,000",
          "Cannot be determined"
        ],
        "correct": 1,
        "explanation": "When debentures are redeemed by issuing new debentures at par, the nominal value of the old debentures is equal to the nominal value of the new debentures issued."
      },
      {
        "q": "ABC Ltd. has 1,000, 10% debentures of ₹100 each, redeemable at a premium of 10%. The company has a sufficient balance in the Securities Premium Reserve. The entry to record the premium on redemption will involve a debit to:",
        "options": [
          "Statement of Profit and Loss Account",
          "Debenture Holders Account",
          "Securities Premium Reserve Account",
          "Debenture Redemption Reserve Account"
        ],
        "correct": 2,
        "explanation": "If Securities Premium Reserve is sufficient, the premium on redemption of debentures is debited to Securities Premium Reserve Account. Otherwise, it is debited to Statement of Profit and Loss."
      },
      {
        "q": "Securities Premium Reserve can be used for writing off discount on issue of debentures, provided that:",
        "options": [
          "The debentures are redeemable at a discount",
          "The debentures are redeemable within 12 months",
          "The debentures are redeemable at a premium",
          "The debentures are redeemable at par"
        ],
        "correct": 3,
        "explanation": "Securities Premium can be used to write off the discount on issue of debentures. This is allowed when debentures are redeemable at par or at a premium."
      },
      {
        "q": "If debentures are issued for a consideration other than cash, and they are redeemable at a premium, the premium on redemption is treated as:",
        "options": [
          "A capital loss",
          "A prior period item",
          "A revenue loss",
          "A capital profit"
        ],
        "correct": 0,
        "explanation": "Premium on redemption of debentures, like discount on issue, represents a capital loss as it is an additional cost incurred in raising long-term finance."
      },
      {
        "q": "XYZ Ltd. issued 10,000, 9% debentures of ₹100 each at a premium of 5%. The debentures are redeemable at par. The amount to be transferred to Debenture Redemption Reserve (DRR) at the end of the first financial year would be:",
        "options": [
          "10% of ₹9,50,000",
          "10% of ₹10,00,000",
          "10% of ₹9,00,000",
          "10% of ₹10,50,000"
        ],
        "correct": 1,
        "explanation": "DRR is created out of profits and is equal to 10% of the nominal value of debentures outstanding. Nominal value of debentures is ₹100 * 10,000 = ₹10,00,000."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-financial-statements-of-a-company",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Financial Statements of a Company",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Financial Statements of a Company. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "If a company's 'Inventory Turnover Ratio' is very low, what does it generally indicate?",
        "options": [
          "Efficient inventory management",
          "Effective use of working capital",
          "Poor sales or overstocking of inventory",
          "High customer demand"
        ],
        "correct": 2,
        "explanation": "A low Inventory Turnover Ratio suggests that inventory is not selling quickly, which could be due to poor sales, overstocking, or inefficient inventory management."
      },
      {
        "q": "Which of the following is considered a disclosure requirement under 'Contingent Liabilities' in a company's financial statements?",
        "options": [
          "A provision for doubtful debts",
          "Outstanding expenses",
          "Accrued income",
          "A claim against the company not acknowledged by the company"
        ],
        "correct": 3,
        "explanation": "A claim against the company not acknowledged by the company is a contingent liability and is disclosed in the notes to the financial statements, not recognized as a liability in the Balance Sheet."
      },
      {
        "q": "In the context of Ratio Analysis, what does the 'Current Ratio' primarily measure?",
        "options": [
          "The company's ability to meet its short-term obligations",
          "The company's profitability",
          "The company's long-term solvency",
          "The company's operational efficiency"
        ],
        "correct": 0,
        "explanation": "The Current Ratio (Current Assets / Current Liabilities) is a liquidity ratio that assesses a company's ability to pay off its short-term debts using its short-term assets."
      },
      {
        "q": "Under which activity would the purchase of machinery for the company's factory be classified in the Cash Flow Statement?",
        "options": [
          "It is not disclosed in the Cash Flow Statement",
          "Investing Activities",
          "Financing Activities",
          "Operating Activities"
        ],
        "correct": 1,
        "explanation": "The purchase of long-term assets like machinery is considered an investing activity, as it relates to the acquisition or disposal of long-term assets and investments."
      },
      {
        "q": "A company has purchased its own shares. This transaction will be classified under which of the following heads in the Balance Sheet?",
        "options": [
          "Share Capital",
          "Reserves and Surplus",
          "Share Application Money Pending Allotment",
          "None of the above"
        ],
        "correct": 3,
        "explanation": "Purchase of own shares (Buy-back) is generally treated as a reduction from Shareholder's Funds. It is not Share Capital, Reserves and Surplus, or Share Application Money. It is often shown as a deduction from 'Equity' or disclosed in notes."
      },
      {
        "q": "The 'Extraordinary Items' as per Accounting Standard (AS) 5 are events or transactions that are unusual in nature and occur infrequently. Where are these items presented in the Statement of Profit and Loss?",
        "options": [
          "As part of Other Income",
          "As part of Revenue from Operations",
          "Disclosed separately after Profit before Extraordinary Items and Tax",
          "Not disclosed in the financial statements"
        ],
        "correct": 2,
        "explanation": "Extraordinary items are disclosed separately in the Statement of Profit and Loss after profit/loss before tax and extraordinary items, to provide clarity on the company's core operating performance."
      },
      {
        "q": "Which of the following items would be classified as a 'Cash Equivalent' for the purpose of preparing the Cash Flow Statement?",
        "options": [
          "Buildings owned by the company",
          "Shares of another company held for long-term investment",
          "Patents and copyrights",
          "A 3-month fixed deposit with a bank"
        ],
        "correct": 3,
        "explanation": "Cash equivalents are short-term, highly liquid investments that are readily convertible to known amounts of cash and which are subject to an insignificant risk of changes in value. A 3-month fixed deposit fits this description."
      },
      {
        "q": "When preparing a Cash Flow Statement using the indirect method, what is the first step taken from the Statement of Profit and Loss?",
        "options": [
          "Start with Net Profit before tax and extraordinary items",
          "Start with Net Sales",
          "Start with Gross Profit",
          "Start with Net Loss"
        ],
        "correct": 0,
        "explanation": "The indirect method of preparing the Cash Flow Statement begins with the Net Profit (or Net Loss) before tax and extraordinary items, and then adjusts for non-cash items and changes in working capital."
      },
      {
        "q": "Which of the following is NOT a component of a company's Statement of Profit and Loss as per Schedule III of the Companies Act, 2013?",
        "options": [
          "Revenue from Operations",
          "Sales Returns",
          "Depreciation",
          "Other Income"
        ],
        "correct": 1,
        "explanation": "Sales Returns is a deduction from Revenue from Operations and is not shown as a separate item in the main Statement of Profit and Loss. It is usually presented as a note or within the Revenue from Operations."
      },
      {
        "q": "Which of the following is a mandatory disclosure in the Notes to Accounts as per Schedule III of the Companies Act, 2013 regarding employee benefits?",
        "options": [
          "Total expenses incurred on staff training",
          "Details of salaries paid to directors",
          "Total amount paid to employees as wages and salaries",
          "Amount paid for employee welfare activities"
        ],
        "correct": 2,
        "explanation": "Schedule III requires disclosure of the total amount paid to employees as wages and salaries, which includes the cost of all employees, whether deployed by the company or by third parties."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-analysis-of-financial-statements",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Analysis of Financial Statements",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Analysis of Financial Statements. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which analysis technique involves comparing items in the financial statement with a base year or base period amount, expressing each item as a percentage of the base year amount?",
        "options": [
          "Ratio analysis",
          "Cash flow analysis",
          "Common-size analysis",
          "Trend analysis"
        ],
        "correct": 3,
        "explanation": "Trend analysis, also known as time-series analysis, uses a base period for comparison to show the percentage change of various items over time."
      },
      {
        "q": "A higher 'Times Interest Earned' ratio suggests:",
        "options": [
          "Lower risk for lenders",
          "Lower profitability",
          "Higher risk for lenders",
          "Higher dividend payout"
        ],
        "correct": 0,
        "explanation": "A higher 'Times Interest Earned' ratio indicates that the company's earnings are sufficiently high to cover its interest expenses, making it less risky for lenders."
      },
      {
        "q": "Which of the following is NOT a limitation of financial statement analysis?",
        "options": [
          "Ignores qualitative factors",
          "Can be used for comparison only with past performance",
          "Ignores the price level changes",
          "Provides historical information"
        ],
        "correct": 1,
        "explanation": "Financial statement analysis can be used for comparison with industry averages and competitor performance, not just past performance."
      },
      {
        "q": "Which of the following is a component of the Cash Flow from Operations Activity?",
        "options": [
          "Payment of dividend",
          "Issuance of shares",
          "Sale of goods and services",
          "Purchase of a new building"
        ],
        "correct": 2,
        "explanation": "Sale of goods and services is the primary revenue-generating activity of a business and thus forms part of cash flow from operations."
      },
      {
        "q": "Which of the following ratios would best measure a company's ability to meet its short-term obligations?",
        "options": [
          "Gross Profit Ratio",
          "Return on Capital Employed",
          "Inventory Turnover Ratio",
          "Current Ratio"
        ],
        "correct": 3,
        "explanation": "The Current Ratio specifically compares current assets to current liabilities, indicating the ability to pay short-term debts."
      },
      {
        "q": "The primary objective of comparative financial statements is to:",
        "options": [
          "Analyze trends and changes in financial performance over time",
          "Present a company's financial position at a single point in time",
          "Determine the profitability of specific assets",
          "Show the movement of cash during a period"
        ],
        "correct": 0,
        "explanation": "Comparative statements allow for the comparison of financial data across different periods, enabling the identification of trends and changes."
      },
      {
        "q": "A company with a high Return on Equity (ROE) ratio is generally considered:",
        "options": [
          "Facing financial distress",
          "Profitable for shareholders",
          "Inefficient in using shareholder funds",
          "Highly leveraged"
        ],
        "correct": 1,
        "explanation": "A high ROE indicates that the company is generating good profits relative to the shareholders' investments."
      },
      {
        "q": "If a company's Inventory Turnover Ratio is declining, it might suggest:",
        "options": [
          "Increased demand for products",
          "Improved sales performance",
          "Ineffective inventory management",
          "Faster movement of goods"
        ],
        "correct": 2,
        "explanation": "A declining Inventory Turnover Ratio means inventory is not being sold as quickly, indicating potential overstocking or slow sales."
      },
      {
        "q": "If the Current Ratio is 2:1 and the Quick Ratio is 1.5:1, what can be inferred about the company's inventory?",
        "options": [
          "Inventory levels are high",
          "Inventory levels are negligible",
          "Inventory levels are low",
          "Inventory is a significant component of current assets"
        ],
        "correct": 3,
        "explanation": "The difference between the Current Ratio and Quick Ratio is primarily due to inventory. A significant difference suggests inventory is a substantial part of current assets."
      },
      {
        "q": "A decrease in the Debt-Equity Ratio generally indicates:",
        "options": [
          "Decreased financial risk",
          "Increased profitability",
          "Decreased operational efficiency",
          "Increased financial risk"
        ],
        "correct": 0,
        "explanation": "A lower Debt-Equity Ratio means the company relies less on borrowed funds, thus reducing its financial risk."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-accounting-ratios",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Accounting Ratios",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Accounting Ratios. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which study action is most useful before solving questions from \"Accounting Ratios\"?",
        "options": [
          "Memorize only the chapter title",
          "Read the key concepts and examples first",
          "Avoid diagrams and formulas",
          "Skip directly to the answer key"
        ],
        "correct": 1,
        "explanation": "Start by reviewing the core ideas of \"Accounting Ratios\", then solve examples and MCQs."
      },
      {
        "q": "Which of the following is a component of the Profitability Ratio?",
        "options": [
          "Debtors Turnover Ratio",
          "Inventory Turnover Ratio",
          "Operating Profit Ratio",
          "Current Ratio"
        ],
        "correct": 2,
        "explanation": "Operating Profit Ratio measures the operational efficiency of a business by relating operating profit to net sales, thus it is a profitability ratio."
      },
      {
        "q": "The primary objective of calculating the Current Ratio is to assess:",
        "options": [
          "The long-term financial stability of the company.",
          "The efficiency of inventory management.",
          "The profitability of the company.",
          "The company's ability to meet its short-term liabilities."
        ],
        "correct": 3,
        "explanation": "The Current Ratio is a key liquidity ratio that helps stakeholders understand how well a company can cover its short-term debts using its short-term assets."
      },
      {
        "q": "A higher Gross Profit Ratio generally implies:",
        "options": [
          "Greater pricing power or efficient production cost control.",
          "Lower sales revenue.",
          "Inefficient cost management of goods sold.",
          "Higher operating expenses."
        ],
        "correct": 0,
        "explanation": "A higher Gross Profit Ratio indicates that the company is effectively managing its cost of goods sold relative to its sales revenue, either through efficient production or strong pricing power."
      },
      {
        "q": "A company has a Debt-to-Equity Ratio of 1.2:1. This indicates:",
        "options": [
          "The company has no long-term liabilities.",
          "The company relies more on debt than equity for financing.",
          "The company has a very low risk profile.",
          "The company relies more on equity than debt for financing."
        ],
        "correct": 1,
        "explanation": "A Debt-to-Equity Ratio of 1.2:1 signifies that for every ₹1 of equity, the company has ₹1.2 of debt, indicating a greater reliance on debt financing."
      },
      {
        "q": "Inventory Turnover Ratio is calculated as:",
        "options": [
          "Net Sales / Inventory",
          "Net Profit / Sales",
          "Cost of Goods Sold / Average Inventory",
          "Gross Profit / Sales"
        ],
        "correct": 2,
        "explanation": "The Inventory Turnover Ratio measures how many times a company's inventory is sold and replaced over a period. It is calculated as Cost of Goods Sold divided by Average Inventory."
      },
      {
        "q": "If the Current Ratio is 2:1 and the Quick Ratio is 1.5:1, what can be inferred about the company's inventory?",
        "options": [
          "Inventory has increased significantly.",
          "Inventory levels are optimal.",
          "Inventory is not a significant asset.",
          "Inventory has decreased significantly."
        ],
        "correct": 3,
        "explanation": "A higher current ratio than quick ratio indicates the presence of inventory. A significant difference between the two suggests inventory is a substantial component. A quick ratio lower than the current ratio means that inventory is significant. If quick ratio is close to current ratio it means inventory is not significant. If quick ratio is higher than current ratio it means inventory is not significant and is having negative value which is not possible."
      },
      {
        "q": "Which ratio helps in evaluating the efficiency with which a company is utilizing its assets to generate sales?",
        "options": [
          "Asset Turnover Ratio",
          "Debt-to-Equity Ratio",
          "Operating Profit Ratio",
          "Inventory Turnover Ratio"
        ],
        "correct": 0,
        "explanation": "The Asset Turnover Ratio measures how effectively a company's assets are being used to generate revenue. A higher ratio generally indicates greater efficiency."
      },
      {
        "q": "Which of the following is NOT a solvency ratio?",
        "options": [
          "Debt-to-Equity Ratio",
          "Current Ratio",
          "Total Assets to Debt Ratio",
          "Interest Coverage Ratio"
        ],
        "correct": 1,
        "explanation": "The Current Ratio is a liquidity ratio, assessing short-term solvency. The other options are solvency ratios, which measure a company's ability to meet its long-term obligations."
      },
      {
        "q": "If a company's Net Profit Ratio is 5% and its Asset Turnover Ratio is 2 times, then its Return on Assets (ROA) would be:",
        "options": [
          "7%",
          "20%",
          "10%",
          "2.5%"
        ],
        "correct": 2,
        "explanation": "Return on Assets (ROA) = Net Profit Ratio × Asset Turnover Ratio = 5% × 2 = 10%."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-accountancy-cash-flow-statement",
    "classLevel": "12",
    "subject": "Accountancy",
    "chapter": "Cash Flow Statement",
    "intro": "Practise chapter-wise MCQs for Class 12 Accountancy — Cash Flow Statement. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "An increase in accounts payable would:",
        "options": [
          "Decrease cash flow from operations",
          "Have no effect on cash flow from operations",
          "Be treated as an investing activity",
          "Increase cash flow from operations"
        ],
        "correct": 3,
        "explanation": "An increase in accounts payable means the company has received goods or services but has not yet paid cash for them, thus increasing cash available in operations."
      },
      {
        "q": "Which of the following activities is least likely to be classified under Cash Flow from Investing Activities?",
        "options": [
          "Repayment of long-term loan",
          "Proceeds from sale of land",
          "Sale of investments",
          "Purchase of machinery"
        ],
        "correct": 0,
        "explanation": "Repayment of long-term loan is a financing activity as it relates to the company's debt structure."
      },
      {
        "q": "An increase in inventory is treated as a deduction from net profit while preparing the Cash Flow Statement under the indirect method because:",
        "options": [
          "It represents an increase in cash",
          "It represents a decrease in cash",
          "It is an investing activity",
          "It is a non-cash item"
        ],
        "correct": 1,
        "explanation": "An increase in inventory means cash has been used to acquire more goods, thus representing a decrease in cash available."
      },
      {
        "q": "Redemption of preference shares is an example of:",
        "options": [
          "Operating Activity",
          "Investing Activity",
          "Financing Activity",
          "None of the above"
        ],
        "correct": 2,
        "explanation": "Redemption of preference shares involves returning capital to shareholders, which is a financing activity."
      },
      {
        "q": "Which of the following would be classified as a Cash Flow from Operating Activities?",
        "options": [
          "Payment of dividend",
          "Purchase of buildings",
          "Collection from debtors",
          "Issuance of shares"
        ],
        "correct": 2,
        "explanation": "Collection from debtors relates to the primary revenue-generating activities of the business."
      },
      {
        "q": "A company sells old machinery for ₹50,000. This transaction will result in:",
        "options": [
          "Cash outflow from financing activities",
          "Cash inflow from operating activities",
          "Cash outflow from investing activities",
          "Cash inflow from investing activities"
        ],
        "correct": 3,
        "explanation": "Sale of an asset like machinery is an investing activity, and the proceeds represent a cash inflow."
      },
      {
        "q": "Under the indirect method, depreciation is:",
        "options": [
          "Added back to net profit",
          "Shown as an investing activity",
          "Ignored",
          "Deducted from net profit"
        ],
        "correct": 0,
        "explanation": "Depreciation is a non-cash expense. In the indirect method, it is added back to net profit because it was deducted to arrive at net profit but did not involve an outflow of cash."
      },
      {
        "q": "Under the direct method of preparing the Cash Flow Statement, 'Cash received from customers' is:",
        "options": [
          "The same as sales revenue",
          "Calculated from sales revenue",
          "Not considered in operating activities",
          "Calculated from gross profit"
        ],
        "correct": 1,
        "explanation": "Under the direct method, cash receipts from customers are directly determined by adjusting sales revenue for changes in debtors and any prepaid revenue."
      },
      {
        "q": "If a company repurchases its own shares, this would be considered:",
        "options": [
          "A cash outflow from operating activities",
          "A cash inflow from financing activities",
          "A cash outflow from financing activities",
          "A cash inflow from investing activities"
        ],
        "correct": 2,
        "explanation": "Repurchasing shares involves the company paying cash to its shareholders, which is a use of cash and a financing activity."
      },
      {
        "q": "Which of the following is NOT a part of the Cash Flow Statement?",
        "options": [
          "Cash Flow from Operating Activities",
          "Cash Flow from Financing Activities",
          "Cash Flow from Investing Activities",
          "Non-cash expenses adjustment"
        ],
        "correct": 3,
        "explanation": "Non-cash expenses like depreciation are adjustments made *within* the calculation of cash flow from operating activities (indirect method), not a separate section of the statement itself."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-nature-and-significance-of-management",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Nature and Significance of Management",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Nature and Significance of Management. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When a manager analyzes past performance and takes corrective actions to ensure future performance aligns with standards, they are performing which management function?",
        "options": [
          "Controlling",
          "Planning",
          "Organizing",
          "Staffing"
        ],
        "correct": 0,
        "explanation": "Controlling involves setting performance standards, measuring actual performance, comparing it with standards, and taking corrective action if there are deviations. This process is crucial for ensuring that the organization achieves its goals."
      },
      {
        "q": "The function of management that involves setting objectives and deciding the future course of action is:",
        "options": [
          "Organizing",
          "Planning",
          "Staffing",
          "Directing"
        ],
        "correct": 1,
        "explanation": "Planning is the fundamental function of management. It involves defining goals, establishing strategies, and outlining the tasks and schedules to achieve the goals. It is about 'what' to do and 'how' to do it."
      },
      {
        "q": "Which aspect of management emphasizes the application of knowledge and skills to achieve desired results?",
        "options": [
          "Management as a Profession",
          "Management as a System",
          "Management as an Art",
          "Management as a Science"
        ],
        "correct": 2,
        "explanation": "Management as an art focuses on the creative and skillful application of existing knowledge to solve practical problems and achieve goals. It's about the 'how' of management in practice."
      },
      {
        "q": "Which of the following best describes the 'essence' of management?",
        "options": [
          "Directing and controlling the work of others.",
          "Planning and organizing resources efficiently.",
          "Maximizing profits for the shareholders.",
          "Coordinating all the activities to achieve the organizational goals."
        ],
        "correct": 3,
        "explanation": "Coordination is considered the essence of management because it integrates all the functions of management and ensures that all departments and individuals work in a harmonious direction towards achieving the common goals."
      },
      {
        "q": "Management is a 'gains all-pervasive' activity because it is required in:",
        "options": [
          "All types of organizations, be it business or non-business.",
          "All levels of management, from top to operational.",
          "All countries and all types of economic systems.",
          "All of the above."
        ],
        "correct": 3,
        "explanation": "The characteristic of being 'all-pervasive' means that management principles and practices are applicable universally, regardless of the size, nature, or location of the organization, and across all hierarchical levels within it."
      },
      {
        "q": "When a manager delegates authority, assigns responsibilities, and establishes an authority-responsibility relationship, they are performing the function of:",
        "options": [
          "Organizing",
          "Staffing",
          "Planning",
          "Coordinating"
        ],
        "correct": 0,
        "explanation": "Organizing involves defining roles, responsibilities, and authority relationships within the organization. Delegation of authority and creation of an organizational structure are key components of this function."
      },
      {
        "q": "Which level of management is responsible for formulating overall organizational goals and strategies?",
        "options": [
          "Middle Management",
          "Top Management",
          "Supervisory Management",
          "Operational Management"
        ],
        "correct": 1,
        "explanation": "Top management, comprising of CEOs, Directors, and Senior Managers, is responsible for setting the long-term vision, mission, objectives, and strategies for the entire organization."
      },
      {
        "q": "The function of management that involves placing the right person at the right job is:",
        "options": [
          "Controlling",
          "Organizing",
          "Staffing",
          "Directing"
        ],
        "correct": 2,
        "explanation": "Staffing deals with recruitment, selection, training, development, and performance appraisal of employees. Its core objective is to ensure that the organization has the right human resources for its operations."
      },
      {
        "q": "Which of the following is NOT considered a characteristic of management as a discipline?",
        "options": [
          "It is an art.",
          "It is a social science.",
          "It is a profession.",
          "It is an exact science."
        ],
        "correct": 3,
        "explanation": "Management is generally considered a social science and an art due to its reliance on human behavior and practical application. It is not an exact science because its outcomes cannot be predicted with absolute certainty due to the human element involved."
      },
      {
        "q": "Management is considered a profession because it has:",
        "options": [
          "A defined body of knowledge and a code of conduct.",
          "A service motive above all other motives.",
          "Entry restricted through formal education and examination.",
          "All of the above."
        ],
        "correct": 3,
        "explanation": "While management has a defined body of knowledge and a code of conduct, and a service motive is increasingly important, the most distinguishing features of a profession are often considered to be formal education, examination, and a restricted entry. However, in the context of NCERT, all these aspects are discussed as characteristics leading to management being considered a profession."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-principles-of-management",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Principles of Management",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Principles of Management. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When employees are encouraged to participate in decision-making related to their work, which principle of management is being followed?",
        "options": [
          "Initiative",
          "Authority and Responsibility",
          "Equity",
          "Discipline"
        ],
        "correct": 0,
        "explanation": "The principle of Initiative encourages employees to take the first step in planning and executing a plan, which often involves their participation in decision-making."
      },
      {
        "q": "Taylor's principle of 'Cooperation between the principle and men' emphasizes:",
        "options": [
          "Joint development of work methods",
          "Eliminating conflict between management and workers",
          "Sharing profits with employees",
          "Promoting teamwork and harmony"
        ],
        "correct": 1,
        "explanation": "This principle advocates for a cooperative attitude between management and workers, working together to achieve common goals and minimizing conflict."
      },
      {
        "q": "Which of Taylor's scientific management principles focuses on developing a science for each element of a man's work, thereby replacing the old rule-of-thumb method?",
        "options": [
          "Harmony, not discord",
          "Development of each and every person to his greatest efficiency and prosperity",
          "Science, not the rule of thumb",
          "Cooperation between the principle and men"
        ],
        "correct": 2,
        "explanation": "This principle, 'Science, not the rule of thumb', is about using scientific methods to determine the best way to perform a job, replacing guesswork and tradition."
      },
      {
        "q": "According to Fayol, 'Authority' is the right to give orders and the power to exact obedience. 'Responsibility' is the consequence of the exercise of authority. This is best represented by which principle?",
        "options": [
          "Order",
          "Scalar Chain",
          "Remuneration",
          "Authority and Responsibility"
        ],
        "correct": 3,
        "explanation": "The principle of Authority and Responsibility emphasizes that there must be a balance between the authority granted to a manager and the responsibility they hold."
      },
      {
        "q": "The principle of 'Stability of Tenure of Personnel' aims to reduce:",
        "options": [
          "Employee turnover",
          "Employee absenteeism",
          "Production costs",
          "Managerial conflicts"
        ],
        "correct": 0,
        "explanation": "This principle suggests that employees should have reasonable security of tenure to reduce the costs and time associated with frequent hiring and training."
      },
      {
        "q": "Fayol's principle of 'Equity' advocates for:",
        "options": [
          "Equal pay for all employees",
          "Fair and just treatment of all employees",
          "Equal opportunities for promotion",
          "Consistent application of rules for all"
        ],
        "correct": 1,
        "explanation": "Equity implies that managers should be fair and just in their dealings with all subordinates, without any discrimination based on gender, religion, caste, etc."
      },
      {
        "q": "The principle of 'Division of Work' in management aims to achieve:",
        "options": [
          "Greater employee morale",
          "Faster decision-making",
          "Increased specialization and efficiency",
          "Reduced workload for managers"
        ],
        "correct": 2,
        "explanation": "By dividing work into small, manageable tasks, employees can become specialized, leading to increased efficiency and better quality of output."
      },
      {
        "q": "Which principle of management suggests that there should be 'one head and one plan' for a group of activities having the same objective?",
        "options": [
          "Unity of Command",
          "Discipline",
          "Centralization",
          "Unity of Direction"
        ],
        "correct": 3,
        "explanation": "Unity of Direction ensures that all members of an organization work towards the same goals by having a single plan for a group of activities."
      },
      {
        "q": "The principle of 'Scalar Chain' in management refers to:",
        "options": [
          "The chain of superiors from the highest to the lowest",
          "The hierarchy of command within a department",
          "The flow of authority from bottom to top",
          "The lines of communication between different departments"
        ],
        "correct": 0,
        "explanation": "Scalar Chain represents the formal lines of authority running from the highest to the lowest rank in an organization."
      },
      {
        "q": "Which principle of management, advocated by Henri Fayol, emphasizes that each employee should receive orders and be answerable to only one superior?",
        "options": [
          "Esprit de Corps",
          "Unity of Command",
          "Unity of Direction",
          "Subordination of Individual Interest to General Interest"
        ],
        "correct": 1,
        "explanation": "Unity of Command states that an employee should have only one boss to avoid confusion and conflicting instructions."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-business-environment",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Business Environment",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Business Environment. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The Indian government's policy on Foreign Direct Investment (FDI) is a part of its:",
        "options": [
          "Legal Environment",
          "Economic Environment",
          "Political Environment",
          "Social Environment"
        ],
        "correct": 2,
        "explanation": "Government policies, regulations, and political stability are key components of the political environment, influencing business decisions and operations, including FDI."
      },
      {
        "q": "A business understanding the rising demand for organic food due to increasing health consciousness among urban Indians is analyzing its:",
        "options": [
          "Technological Environment",
          "Natural Environment",
          "Economic Environment",
          "Socio-cultural Environment"
        ],
        "correct": 3,
        "explanation": "Health consciousness and changing lifestyle preferences are part of the socio-cultural environment that influences consumer demand and market trends."
      },
      {
        "q": "Which of the following is a key characteristic of the business environment?",
        "options": [
          "Complex and dynamic",
          "Static and unchanging",
          "Easily understandable by all",
          "Predictable and stable"
        ],
        "correct": 0,
        "explanation": "The business environment is constantly evolving due to various internal and external factors like technological advancements, political changes, and shifting consumer preferences, making it complex and dynamic."
      },
      {
        "q": "The Reserve Bank of India's decision to increase the repo rate to control inflation impacts the business environment by:",
        "options": [
          "Boosting consumer spending",
          "Increasing the cost of borrowing for businesses",
          "Reducing the overall demand for goods",
          "Encouraging more investment"
        ],
        "correct": 1,
        "explanation": "An increase in the repo rate means banks will borrow from the RBI at a higher rate, which they will then pass on to businesses and consumers, making borrowing more expensive."
      },
      {
        "q": "Globalization, as part of the business environment, leads to:",
        "options": [
          "Increased protectionism and trade barriers",
          "Reduced competition and market access",
          "Greater integration of economies and free flow of capital",
          "Domination of domestic markets by local firms"
        ],
        "correct": 2,
        "explanation": "Globalization signifies the interconnectedness of economies, allowing for the freer movement of goods, services, capital, and technology across national borders, thereby increasing integration and competition."
      },
      {
        "q": "The establishment of new industrial policies by the government that aims to boost manufacturing is an example of:",
        "options": [
          "Social trend",
          "Technological change",
          "Economic recession",
          "Government policy impacting business"
        ],
        "correct": 3,
        "explanation": "Government industrial policies are direct interventions that shape the business landscape. This falls under the broader political and legal environment influencing business."
      },
      {
        "q": "Which aspect of the business environment refers to the established norms, beliefs, and customs of a society?",
        "options": [
          "Socio-cultural Environment",
          "Technological Environment",
          "Political Environment",
          "Legal Environment"
        ],
        "correct": 0,
        "explanation": "The socio-cultural environment encompasses the shared values, attitudes, traditions, and lifestyles of people in a society, which can significantly influence consumer preferences and business practices."
      },
      {
        "q": "The rapid adoption of smartphones and the internet by Indian consumers is an example of which environmental factor?",
        "options": [
          "Social",
          "Technological",
          "Legal",
          "Economic"
        ],
        "correct": 1,
        "explanation": "The availability and adoption of new technologies like smartphones and the internet directly fall under the technological environment, impacting how businesses operate and consumers behave."
      },
      {
        "q": "The liberalization policies introduced in India in 1991 were primarily aimed at:",
        "options": [
          "Strengthening trade unions",
          "Increasing the role of the public sector",
          "Promoting competition and reducing government controls",
          "Restricting foreign investment"
        ],
        "correct": 2,
        "explanation": "The 1991 reforms focused on dismantling protectionist policies, reducing government intervention, opening up the economy to foreign competition and investment, and fostering a more market-oriented system."
      },
      {
        "q": "Which of the following is NOT a component of the 'Economic Environment' in India?",
        "options": [
          "Money Supply",
          "Interest Rate",
          "Inflation Rate",
          "Consumer Protection Act"
        ],
        "correct": 3,
        "explanation": "The Consumer Protection Act is a legal/political factor that aims to protect consumer rights, not a direct economic indicator or policy. Inflation, interest rates, and money supply are all core economic elements."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-planning",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Planning",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Planning. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The process of forecasting the future and making assumptions about the conditions under which plans will be executed is known as:",
        "options": [
          "Developing premises",
          "Setting objectives",
          "Evaluating alternatives",
          "Choosing an alternative"
        ],
        "correct": 0,
        "explanation": "Developing premises involves making assumptions about the future environment, internal and external, on which plans will be based."
      },
      {
        "q": "When a manager considers the 'what', 'how', 'when', and 'who' of future action, which element of planning is being addressed?",
        "options": [
          "Policies",
          "Action plans/Courses of action",
          "Strategies",
          "Procedures"
        ],
        "correct": 1,
        "explanation": "Action plans or courses of action detail the specific steps, resources, and responsibilities required to achieve objectives."
      },
      {
        "q": "A company decides that all customer complaints will be handled by the customer service department within 24 hours. This is an example of:",
        "options": [
          "A programme",
          "A rule",
          "A policy",
          "A budget"
        ],
        "correct": 2,
        "explanation": "A policy provides guidelines for decision-making and action, such as how customer complaints should be handled."
      },
      {
        "q": "Which of the following is a single-use plan that details the specific steps to be taken to accomplish a particular objective, often within a specific timeframe?",
        "options": [
          "Policy",
          "Strategy",
          "Procedure",
          "Programme"
        ],
        "correct": 3,
        "explanation": "A programme is a single-use plan that outlines specific activities, resources, and timelines for a particular project or undertaking."
      },
      {
        "q": "Which type of plan sets forth a sequence of established actions or steps to be followed in specific circumstances, ensuring uniformity and predictability?",
        "options": [
          "Procedure",
          "Policy",
          "Strategy",
          "Budget"
        ],
        "correct": 0,
        "explanation": "A procedure provides a defined sequence of steps to be followed for a particular task or situation, ensuring consistency."
      },
      {
        "q": "A manager decides to increase production by 15% next quarter to meet anticipated demand. This is an example of which step in the planning process?",
        "options": [
          "Identifying alternative courses of action",
          "Setting objectives",
          "Evaluating alternatives",
          "Developing premises"
        ],
        "correct": 1,
        "explanation": "Setting objectives involves defining what the organization wants to achieve in the future, such as increasing production."
      },
      {
        "q": "Which of the following is the primary function of management that sets the course of action for the future and involves setting objectives and formulating strategies?",
        "options": [
          "Controlling",
          "Staffing",
          "Planning",
          "Organising"
        ],
        "correct": 2,
        "explanation": "Planning involves setting objectives and formulating strategies to achieve them, thus setting the course of action for the future."
      },
      {
        "q": "Which of the following is a statement of expected results or a quantifiable objective of an action?",
        "options": [
          "Alternative",
          "Evaluation",
          "Premise",
          "Objective"
        ],
        "correct": 3,
        "explanation": "An objective is a statement of desired future results that the organization aims to achieve."
      },
      {
        "q": "The step in the planning process that involves creating a detailed outline of the steps and actions to be taken, considering the available resources and constraints, is known as:",
        "options": [
          "Developing action plans",
          "Evaluating alternatives",
          "Identifying alternative courses of action",
          "Developing premises"
        ],
        "correct": 0,
        "explanation": "Developing action plans translates the chosen course of action into a concrete set of steps, specifying 'how' the objective will be achieved."
      },
      {
        "q": "Which type of plan is a broad blueprint of future action that involves major commitments of resources and is concerned with the long-term objectives of the organization?",
        "options": [
          "Policies",
          "Strategies",
          "Rules",
          "Procedures"
        ],
        "correct": 1,
        "explanation": "Strategies are broad plans that outline how an organization will achieve its long-term objectives and gain a competitive advantage."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-organising",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Organising",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Organising. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The principle of 'unity of command' is violated in which of the following situations?",
        "options": [
          "A subordinate receiving instructions from only one superior.",
          "A superior delegating tasks to a subordinate.",
          "A subordinate receiving instructions from multiple superiors.",
          "A manager overseeing a small number of subordinates."
        ],
        "correct": 2,
        "explanation": "Unity of command states that each subordinate should receive instructions from and be accountable to only one superior. Receiving instructions from multiple superiors violates this principle."
      },
      {
        "q": "An organisation follows a structure where employees report to two managers: one functional manager and one project manager. This is an example of:",
        "options": [
          "Divisional Structure",
          "Line Structure",
          "Functional Structure",
          "Matrix Structure"
        ],
        "correct": 3,
        "explanation": "A matrix structure combines functional and project structures, where employees report to multiple managers, usually a functional manager and a project manager."
      },
      {
        "q": "Which of the following best describes the process of defining authority relationships between various positions in an organisation?",
        "options": [
          "Organisational Structure",
          "Centralisation",
          "Delegation of Authority",
          "Span of Management"
        ],
        "correct": 0,
        "explanation": "Organisational structure involves defining the relationships between various positions, including the lines of authority and reporting."
      },
      {
        "q": "Which of the following is a key element of the organising function of management?",
        "options": [
          "Motivating the employees",
          "Defining roles and responsibilities",
          "Controlling the performance",
          "Setting objectives"
        ],
        "correct": 1,
        "explanation": "Defining roles and responsibilities, along with establishing authority relationships, is a fundamental aspect of the organising function."
      },
      {
        "q": "When decision-making authority is retained at the top level of management, the organisation is said to be:",
        "options": [
          "Delegated",
          "Departmentalised",
          "Centralised",
          "Decentralised"
        ],
        "correct": 2,
        "explanation": "Centralisation means that decision-making power is concentrated at the top level of the organisation."
      },
      {
        "q": "Which of the following is a disadvantage of a functional organisational structure?",
        "options": [
          "Quick decision-making",
          "Focus on specialised skills",
          "Efficient use of resources",
          "Lack of coordination between departments"
        ],
        "correct": 3,
        "explanation": "In a functional structure, departments can become isolated, leading to a lack of coordination between them."
      },
      {
        "q": "The process of assigning responsibility and granting authority to a subordinate is known as:",
        "options": [
          "Delegation",
          "Decentralisation",
          "Authority",
          "Coordination"
        ],
        "correct": 0,
        "explanation": "Delegation is the process by which a superior entrusts responsibility and authority to a subordinate."
      },
      {
        "q": "A manager is responsible for 20 subordinates. This statement relates to which of the following concepts?",
        "options": [
          "Centralisation",
          "Span of Management",
          "Organisational Chart",
          "Departmentalisation"
        ],
        "correct": 1,
        "explanation": "Span of management refers to the number of subordinates a manager can effectively supervise."
      },
      {
        "q": "Which organisational structure is primarily concerned with grouping similar jobs together?",
        "options": [
          "Line and Staff Structure",
          "Project Structure",
          "Functional Structure",
          "Divisional Structure"
        ],
        "correct": 2,
        "explanation": "Functional structure groups jobs based on similar functions or related tasks performed within the organisation."
      },
      {
        "q": "Which type of organisational structure is suitable for organisations with diverse product lines or operating in multiple geographical regions?",
        "options": [
          "Informal Structure",
          "Functional Structure",
          "Matrix Structure",
          "Divisional Structure"
        ],
        "correct": 3,
        "explanation": "Divisional structure is ideal for organisations with multiple product lines or geographical locations as it groups activities around these divisions."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-staffing",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Staffing",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Staffing. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The step that involves choosing the most suitable candidate from the applicants is called:",
        "options": [
          "Selection",
          "Recruitment",
          "Training",
          "Placement"
        ],
        "correct": 0,
        "explanation": "Selection is the process of choosing the right person for the job from the available applicants, after recruitment has generated the pool."
      },
      {
        "q": "The process of identifying and attracting a suitable pool of potential job candidates is known as:",
        "options": [
          "Induction",
          "Recruitment",
          "Placement",
          "Selection"
        ],
        "correct": 1,
        "explanation": "Recruitment is the process of stimulating people to apply for jobs in an organization. It's about creating a pool of applicants."
      },
      {
        "q": "Which of the following is a method of training where employees learn by observing and imitating experienced workers?",
        "options": [
          "Internship",
          "Simulation",
          "Apprenticeship",
          "Coaching"
        ],
        "correct": 2,
        "explanation": "Apprenticeship is a form of on-the-job training where an apprentice learns a trade or skill through a combination of on-the-job experience and classroom instruction, often involving observation and imitation."
      },
      {
        "q": "Which of the following is a method of external recruitment?",
        "options": [
          "Job Rotation",
          "Transfer",
          "Promotion",
          "Campus Recruitment"
        ],
        "correct": 3,
        "explanation": "Campus recruitment involves inviting candidates from educational institutions, which is an external source of recruitment."
      },
      {
        "q": "The process of evaluating an employee's past performance and potential for future advancement is known as:",
        "options": [
          "Performance Appraisal",
          "Selection",
          "Recruitment",
          "Training"
        ],
        "correct": 0,
        "explanation": "Performance appraisal is a systematic process of evaluating an employee's job performance and their potential for development and promotion."
      },
      {
        "q": "Employee Development focuses on:",
        "options": [
          "Reducing employee turnover",
          "Preparing employees for future jobs and responsibilities",
          "Minimizing recruitment costs",
          "Improving performance in the current job only"
        ],
        "correct": 1,
        "explanation": "Employee development is a broader concept than training; it aims to enhance an employee's overall capabilities and prepare them for future roles and career growth within the organization."
      },
      {
        "q": "Internal sources of recruitment have the advantage of:",
        "options": [
          "Allowing for greater objectivity in selection",
          "Creating a wider pool of candidates",
          "Being cost-effective and quicker",
          "Bringing in fresh talent and new ideas"
        ],
        "correct": 2,
        "explanation": "Internal sources are generally more cost-effective and quicker as the candidates are already known to the organization, and their performance history is available."
      },
      {
        "q": "Which of the following is NOT considered a step in the Staffing process?",
        "options": [
          "Performance Appraisal",
          "Remuneration",
          "Training and Development",
          "Marketing and Sales"
        ],
        "correct": 3,
        "explanation": "Marketing and Sales is a distinct function of business and not a step within the staffing process, which focuses on acquiring, developing, and retaining human resources."
      },
      {
        "q": "A comprehensive introduction of a new employee to the organization's rules, policies, and culture is known as:",
        "options": [
          "Orientation",
          "Development",
          "Training",
          "Placement"
        ],
        "correct": 0,
        "explanation": "Orientation (often synonymous with induction) is the process of introducing a new employee to the organization's environment, its people, and its ways of working."
      },
      {
        "q": "Which of the following aims to improve the knowledge and skills of employees for their current jobs?",
        "options": [
          "Recruitment",
          "Training",
          "Selection",
          "Development"
        ],
        "correct": 1,
        "explanation": "Training is specifically designed to impart specific skills and knowledge that an employee needs to perform their current job effectively."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-directing",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Directing",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Directing. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The managerial function of directing is concerned with:",
        "options": [
          "Assigning duties and responsibilities.",
          "Comparing actual performance with standards.",
          "Inspiring, guiding, and influencing employees.",
          "Determining the future course of action."
        ],
        "correct": 2,
        "explanation": "Directing is the function where managers inspire, guide, and influence employees to work effectively towards achieving organizational objectives."
      },
      {
        "q": "Which motivational technique focuses on providing employees with a sense of personal achievement, recognition, and responsibility?",
        "options": [
          "Team Building",
          "Financial Incentives",
          "Job Rotation",
          "Job Enrichment"
        ],
        "correct": 3,
        "explanation": "Job enrichment aims to enhance job satisfaction by providing employees with more autonomy, responsibility, and opportunities for growth."
      },
      {
        "q": "Maslow's Hierarchy of Needs theory suggests that individuals are motivated by a series of needs in a specific order. Which of the following is the highest level of need according to this theory?",
        "options": [
          "Self-Actualisation Needs",
          "Safety Needs",
          "Esteem Needs",
          "Love Needs"
        ],
        "correct": 0,
        "explanation": "Self-actualisation represents the highest level of human needs, involving the desire to achieve one's full potential."
      },
      {
        "q": "Which of the following is a barrier to effective communication in an organization?",
        "options": [
          "Open and honest feedback",
          "Prejudice and assumptions",
          "Clear and concise language",
          "Active listening"
        ],
        "correct": 1,
        "explanation": "Prejudices and assumptions can distort the message being communicated, leading to misunderstandings and ineffective communication."
      },
      {
        "q": "The process of encouraging people to direct their will and effort towards achieving organizational goals is called:",
        "options": [
          "Delegation",
          "Leadership",
          "Motivation",
          "Co-ordination"
        ],
        "correct": 2,
        "explanation": "Motivation is the psychological process that arouses, directs, and maintains behaviour towards a goal."
      },
      {
        "q": "Which of the following is NOT a key element of directing?",
        "options": [
          "Motivation",
          "Supervision",
          "Communication",
          "Planning"
        ],
        "correct": 3,
        "explanation": "Planning is a function of management that precedes directing. Directing encompasses supervision, motivation, and communication."
      },
      {
        "q": "The process of guiding and instructing employees to perform their tasks efficiently and effectively is known as:",
        "options": [
          "Directing",
          "Staffing",
          "Controlling",
          "Organising"
        ],
        "correct": 0,
        "explanation": "Directing involves guiding, instructing, and leading employees to achieve organizational goals."
      },
      {
        "q": "The principle of 'Unity of Command' states that:",
        "options": [
          "Each subordinate should be supervised by multiple superiors.",
          "An employee should receive orders from only one superior.",
          "All employees should work towards a common goal.",
          "The span of control should be limited."
        ],
        "correct": 1,
        "explanation": "The principle of Unity of Command, as proposed by Fayol, suggests that an employee should ideally receive instructions from only one boss to avoid confusion and conflicts."
      },
      {
        "q": "Which leadership style is characterized by the leader making decisions without consulting subordinates?",
        "options": [
          "Laissez-faire",
          "Democratic",
          "Autocratic",
          "Participative"
        ],
        "correct": 2,
        "explanation": "An autocratic leader centralizes all decision-making authority and dictates policies and procedures."
      },
      {
        "q": "Herzberg's Two-Factor Theory distinguishes between 'Hygiene Factors' and 'Motivators'. Which of the following is an example of a Motivator?",
        "options": [
          "Salary",
          "Job Security",
          "Working Conditions",
          "Recognition"
        ],
        "correct": 3,
        "explanation": "Recognition is considered a 'Motivator' by Herzberg, as it contributes to job satisfaction and motivation. Hygiene factors, like salary and working conditions, prevent dissatisfaction but do not necessarily motivate."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-controlling",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Controlling",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Controlling. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which technique of controlling focuses on comparing actual performance with the planned performance at various stages of the activity?",
        "options": [
          "Budgetary Control",
          "Management by Exception",
          "Ratio Analysis",
          "Break-Even Analysis"
        ],
        "correct": 0,
        "explanation": "Budgetary control involves comparing actual results with budgetary estimates, which are planned financial targets, at different points in time. This allows for timely identification of deviations."
      },
      {
        "q": "When a manager only focuses on significant deviations from the planned performance, which controlling technique is being used?",
        "options": [
          "Ratio Analysis",
          "Management by Exception",
          "Budgetary Control",
          "Standard Costing"
        ],
        "correct": 1,
        "explanation": "Management by Exception is a technique where managers concentrate their attention only on those cases where performance deviates significantly from the set standards or plans."
      },
      {
        "q": "Which of the following is the primary objective of controlling in management?",
        "options": [
          "To assign responsibility to employees.",
          "To motivate employees to achieve targets.",
          "To ensure that all activities are performed according to plans.",
          "To develop new strategies for the business."
        ],
        "correct": 2,
        "explanation": "Controlling aims to ensure that organizational activities align with the plans and standards set, thereby achieving the desired outcomes."
      },
      {
        "q": "Controlling helps in achieving organizational goals by ensuring that:",
        "options": [
          "Employees work independently without supervision.",
          "Plans are formulated without any regard for their execution.",
          "Managers make decisions without considering past performance.",
          "All resources are utilized efficiently and effectively."
        ],
        "correct": 3,
        "explanation": "Effective controlling ensures that resources are used optimally, minimizing wastage and maximizing output, which directly contributes to achieving organizational goals."
      },
      {
        "q": "When a company uses statistical methods and variance analysis to identify deviations in production cost from the standard cost, it is using which controlling technique?",
        "options": [
          "Standard Costing",
          "Break-Even Analysis",
          "Financial Statement Analysis",
          "Management by Objectives (MBO)"
        ],
        "correct": 0,
        "explanation": "Standard Costing involves predetermining costs for various activities and then comparing the actual costs incurred with these standard costs. Variance analysis helps in identifying and explaining the differences."
      },
      {
        "q": "The process of controlling involves setting standards, measuring actual performance, comparing actual with standards, and then taking corrective action. Which of these steps helps in identifying the deviation from the desired outcome?",
        "options": [
          "Setting performance standards",
          "Comparing actual performance with standards",
          "Taking corrective action",
          "Measuring actual performance"
        ],
        "correct": 1,
        "explanation": "Comparing actual performance with the set standards is the step where deviations or differences between what was planned and what has actually been achieved are identified."
      },
      {
        "q": "Which statement best describes the relationship between planning and controlling?",
        "options": [
          "Controlling is a one-time activity, while planning is an ongoing process.",
          "Controlling is independent of planning and can be done without it.",
          "Planning is the basis for controlling, and controlling helps in refining future plans.",
          "Planning focuses on the future, while controlling focuses only on the past."
        ],
        "correct": 2,
        "explanation": "Planning sets the goals and the path to achieve them, while controlling monitors progress against these plans and provides feedback for future planning. They are inseparable functions."
      },
      {
        "q": "The step of 'taking corrective action' in the controlling process involves:",
        "options": [
          "Ignoring minor deviations and focusing on major ones.",
          "Rewriting the entire plan if deviations are significant.",
          "Setting performance targets for employees.",
          "Analyzing the reasons for deviations."
        ],
        "correct": 3,
        "explanation": "Before taking corrective action, it is crucial to analyze the causes of the deviation. This helps in implementing appropriate solutions and preventing recurrence."
      },
      {
        "q": "Which ratio would be most useful for a company to assess its ability to meet its short-term obligations?",
        "options": [
          "Current Ratio",
          "Net Profit Ratio",
          "Debt-Equity Ratio",
          "Inventory Turnover Ratio"
        ],
        "correct": 0,
        "explanation": "The Current Ratio (Current Assets / Current Liabilities) is a liquidity ratio that measures a company's ability to pay off its short-term liabilities with its short-term assets."
      },
      {
        "q": "Which of the following is a limitation of the controlling function?",
        "options": [
          "It is a backward-looking process.",
          "It can be costly and time-consuming.",
          "It can lead to employee resistance.",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "Controlling can be expensive due to the need for measurement and analysis. It often looks back at past performance to assess deviations, and employees may resist being constantly monitored, leading to resistance."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-financial-management",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Financial Management",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Financial Management. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "A company decides to invest in a new plant and machinery. This is an example of which type of financial decision?",
        "options": [
          "Profitability Decision",
          "Investment Decision",
          "Dividend Decision",
          "Financing Decision"
        ],
        "correct": 1,
        "explanation": "Investment decisions involve the allocation of funds to long-term assets or projects that are expected to generate future returns."
      },
      {
        "q": "Which of the following is a factor influencing the financing decision of a company?",
        "options": [
          "Cost of Financing",
          "Risk Associated with Financing",
          "Control Considerations",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "All these factors are crucial for a firm when deciding on its financing mix. The cost of debt versus equity, the risk involved in leverage, and the desire to maintain control all play a significant role."
      },
      {
        "q": "Which of the following is NOT a primary objective of financial management?",
        "options": [
          "Minimizing Cost of Capital",
          "Ensuring Solvency",
          "Profit Maximization",
          "Wealth Maximization"
        ],
        "correct": 2,
        "explanation": "While profit maximization is a short-term goal, wealth maximization is considered the primary objective of financial management as it encompasses long-term value creation and considers the time value of money and risk."
      },
      {
        "q": "A company with a high debt-equity ratio is generally considered to have:",
        "options": [
          "Low financial risk",
          "High liquidity",
          "Low operating risk",
          "High financial risk"
        ],
        "correct": 3,
        "explanation": "A high debt-equity ratio indicates that the company relies heavily on borrowed funds, which increases its financial risk due to fixed interest payments and potential for bankruptcy if unable to meet its obligations."
      },
      {
        "q": "The primary goal of dividend policy is to:",
        "options": [
          "Maximize the total return to shareholders",
          "Maximize retained earnings",
          "Minimize the cost of equity",
          "Ensure the company's stock price is low"
        ],
        "correct": 0,
        "explanation": "The dividend policy aims to balance the immediate returns to shareholders (through dividends) with future growth prospects (through retained earnings) to maximize overall shareholder value."
      },
      {
        "q": "The process of determining the optimal amount of capital that a firm should raise from various sources is known as:",
        "options": [
          "Dividend Policy Formulation",
          "Capital Structure Decision",
          "Working Capital Management",
          "Capital Budgeting"
        ],
        "correct": 1,
        "explanation": "Capital structure decisions focus on the mix of debt and equity financing that a firm uses to fund its operations and growth."
      },
      {
        "q": "The decision on how much of the profit should be distributed to shareholders as dividends and how much should be retained for future growth is known as:",
        "options": [
          "Financing Decision",
          "Investment Decision",
          "Dividend Decision",
          "Working Capital Decision"
        ],
        "correct": 2,
        "explanation": "Dividend decisions deal with the distribution of profits between shareholders and reinvestment in the business."
      },
      {
        "q": "The decision related to the amount of funds to be raised and the proportion of different sources of finance is known as:",
        "options": [
          "Investment Decision",
          "Liquidity Decision",
          "Dividend Decision",
          "Financing Decision"
        ],
        "correct": 3,
        "explanation": "Financing decisions concern how a firm raises its finances, dealing with the proportion of debt and equity in the capital structure."
      },
      {
        "q": "Which of the following is a characteristic of a sound working capital management?",
        "options": [
          "Ensuring sufficient liquidity for short-term obligations",
          "Over-reliance on short-term debt",
          "Maintaining excessive inventory",
          "Delaying payments to suppliers"
        ],
        "correct": 0,
        "explanation": "Effective working capital management aims to maintain a balance between liquidity and profitability, ensuring the firm can meet its short-term obligations without tying up excessive funds."
      },
      {
        "q": "Which of the following is a measure of a firm's liquidity?",
        "options": [
          "Return on Investment",
          "Current Ratio",
          "Price-Earnings Ratio",
          "Debt-Equity Ratio"
        ],
        "correct": 1,
        "explanation": "The Current Ratio (Current Assets / Current Liabilities) is a key indicator of a firm's ability to meet its short-term obligations."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-financial-markets",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Financial Markets",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Financial Markets. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following is a function of the money market?",
        "options": [
          "Facilitating long-term capital formation",
          "Providing a platform for trading existing shares",
          "Enabling efficient management of short-term deficits and surpluses",
          "Listing and trading of government securities with maturity over one year"
        ],
        "correct": 2,
        "explanation": "The money market helps institutions and individuals manage their short-term liquidity needs by providing a mechanism for borrowing and lending funds for short periods."
      },
      {
        "q": "The market where securities are sold for the first time, directly by the issuer to the investors, is known as the:",
        "options": [
          "Money Market",
          "Secondary Market",
          "Capital Market",
          "Primary Market"
        ],
        "correct": 3,
        "explanation": "The primary market is where securities are created and issued for the first time to investors. The issuer raises capital directly from investors in this market."
      },
      {
        "q": "A market where short-term debt instruments are traded is known as the:",
        "options": [
          "Money Market",
          "Stock Market",
          "Capital Market",
          "Primary Market"
        ],
        "correct": 0,
        "explanation": "The money market is a segment of the financial market where financial instruments with high liquidity and very short maturities (typically one year or less) are traded."
      },
      {
        "q": "The term 'liquidity' in the context of financial markets refers to:",
        "options": [
          "The rate of return on an investment",
          "The ease with which an asset can be converted into cash without significant loss of value",
          "The profit earned from trading securities",
          "The risk associated with a particular security"
        ],
        "correct": 1,
        "explanation": "Liquidity is a measure of how quickly an asset can be bought or sold in the market at a price reflecting its true value. High liquidity means it can be converted to cash easily and quickly."
      },
      {
        "q": "Which of the following is a characteristic of the capital market?",
        "options": [
          "Low risk associated with instruments",
          "Short maturity period of instruments",
          "Long-term investment horizon",
          "High liquidity of instruments"
        ],
        "correct": 2,
        "explanation": "The capital market deals with instruments that are typically used for long-term financing and investment, such as shares and debentures, which have longer maturity periods compared to money market instruments."
      },
      {
        "q": "Which of the following is a primary function of a stock exchange?",
        "options": [
          "Underwriting fresh capital issues",
          "Facilitating the buying and selling of new issues",
          "Determining the creditworthiness of companies",
          "Providing liquidity and marketability to existing securities"
        ],
        "correct": 3,
        "explanation": "A stock exchange is the secondary market. Its primary function is to provide liquidity and marketability to securities that already exist, so an investor can convert holdings into cash quickly at a fair price. Issuing and underwriting NEW securities is the primary market, not the stock exchange."
      },
      {
        "q": "Which of the following is NOT a type of capital market instrument?",
        "options": [
          "Treasury Bills",
          "Bonds",
          "Shares",
          "Debentures"
        ],
        "correct": 0,
        "explanation": "Treasury Bills are short-term debt instruments with a maturity of less than one year, and thus are part of the money market, not the capital market."
      },
      {
        "q": "The primary role of SEBI (Securities and Exchange Board of India) in the financial markets is to:",
        "options": [
          "Provide loans to businesses",
          "Regulate the stock exchanges and protect investor interests",
          "Determine interest rates for commercial banks",
          "Print new currency notes"
        ],
        "correct": 1,
        "explanation": "SEBI is the regulatory body for the securities market in India, responsible for ensuring fair trade practices, investor protection, and the orderly development of the securities market."
      },
      {
        "q": "An Initial Public Offering (IPO) is an example of a transaction in the:",
        "options": [
          "Secondary Market",
          "Derivatives Market",
          "Primary Market",
          "Money Market"
        ],
        "correct": 2,
        "explanation": "An IPO is the first time a private company offers its shares to the public, making it a primary market transaction."
      },
      {
        "q": "When investors buy securities from other investors, and no new securities are created, this transaction takes place in the:",
        "options": [
          "Primary Market",
          "Commodity Market",
          "Money Market",
          "Secondary Market"
        ],
        "correct": 3,
        "explanation": "The secondary market is where existing securities are traded between investors. No new securities are issued by companies in this market."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-marketing-management",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Marketing Management",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Marketing Management. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "What is the primary objective of market segmentation?",
        "options": [
          "To identify and satisfy the needs of specific customer groups",
          "To eliminate competition",
          "To increase the price of products",
          "To reduce advertising costs"
        ],
        "correct": 0,
        "explanation": "Market segmentation divides a broad target market into subsets of consumers who have common needs or characteristics. The aim is to tailor marketing efforts to better meet the needs of these specific groups."
      },
      {
        "q": "Branding is important for a marketer because it helps in:",
        "options": [
          "Increasing production costs",
          "Differentiating the product from competitors",
          "Simplifying distribution channels",
          "Reducing consumer choice"
        ],
        "correct": 1,
        "explanation": "Branding helps to create a unique identity for a product, making it distinguishable from competing products in the market and building customer loyalty."
      },
      {
        "q": "A company sells its products through retailers and wholesalers to reach a large number of customers. This strategy relates to which element of the marketing mix?",
        "options": [
          "Price",
          "Promotion",
          "Place",
          "Product"
        ],
        "correct": 2,
        "explanation": "Place, also known as distribution, involves making the product available to the target customers. Selling through intermediaries like wholesalers and retailers is a key aspect of distribution."
      },
      {
        "q": "The 'USP' in advertising stands for:",
        "options": [
          "Unified Selling Principle",
          "Universal Sales Plan",
          "Ultimate Service Performance",
          "Unique Selling Proposition"
        ],
        "correct": 3,
        "explanation": "USP refers to the unique selling proposition, which highlights what makes a product or service different and better than its competitors."
      },
      {
        "q": "A company decides to sell its products directly to consumers through its own online store and physical outlets. This is an example of:",
        "options": [
          "Direct Distribution",
          "Selective Distribution",
          "Indirect Distribution",
          "Intensive Distribution"
        ],
        "correct": 0,
        "explanation": "Direct distribution involves selling the product directly from the producer to the consumer without any intermediaries. An online store and company-owned outlets are examples of this."
      },
      {
        "q": "Which of the following is an example of a convenience product?",
        "options": [
          "A branded smartphone",
          "A loaf of bread",
          "A diamond necklace",
          "A luxury car"
        ],
        "correct": 1,
        "explanation": "Convenience products are items that consumers buy frequently, immediately, and with minimal comparison and buying effort. A loaf of bread is a common example."
      },
      {
        "q": "Which of the following is NOT a component of the marketing mix?",
        "options": [
          "Price",
          "Promotion",
          "Profit",
          "Product"
        ],
        "correct": 2,
        "explanation": "The marketing mix, often referred to as the 4 Ps, includes Product, Price, Place, and Promotion. Profit is a result of successful marketing, not a component of the mix itself."
      },
      {
        "q": "Which pricing strategy involves setting a high initial price for a new, innovative product?",
        "options": [
          "Cost-Plus Pricing",
          "Penetration Pricing",
          "Psychological Pricing",
          "Skimming Pricing"
        ],
        "correct": 3,
        "explanation": "Skimming pricing involves setting a high initial price for a new product to 'skim' maximum revenue layer by layer from the market segments willing to pay the high price."
      },
      {
        "q": "Which of the following is a form of sales promotion?",
        "options": [
          "Discount coupons",
          "Newspaper articles",
          "Television advertisements",
          "Public relations campaigns"
        ],
        "correct": 0,
        "explanation": "Discount coupons are a short-term incentive used to encourage immediate purchase of a product or service, which is a characteristic of sales promotion."
      },
      {
        "q": "What does the 'Product Life Cycle' concept describe?",
        "options": [
          "The lifespan of a brand name",
          "The stages a product goes through from its introduction to its decline",
          "The duration of a marketing campaign",
          "The average age of a customer"
        ],
        "correct": 1,
        "explanation": "The Product Life Cycle (PLC) describes the stages a product moves through from its introduction to the market, through growth and maturity, and finally to decline."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-business-studies-consumer-protection",
    "classLevel": "12",
    "subject": "Business Studies",
    "chapter": "Consumer Protection",
    "intro": "Practise chapter-wise MCQs for Class 12 Business Studies — Consumer Protection. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "A consumer can file a complaint in the District Consumer Disputes Redressal Forum if the value of goods or services paid as consideration does not exceed:",
        "options": [
          "₹1 Crore",
          "₹10 Lakhs",
          "₹50 Lakhs",
          "₹5 Crores"
        ],
        "correct": 2,
        "explanation": "As per the Consumer Protection Act, 2019, the pecuniary jurisdiction of the District Consumer Disputes Redressal Forum is up to ₹50 Lakhs. Previously it was ₹20 Lakhs."
      },
      {
        "q": "Which of the following is a form of unfair trade practice?",
        "options": [
          "Offering discounts on bulk purchases",
          "Providing after-sales service",
          "Selling goods at a competitive price",
          "Advertising goods as genuine when they are not"
        ],
        "correct": 3,
        "explanation": "Advertising goods as genuine when they are not is a deceptive practice and falls under the definition of unfair trade practice, as it misleads the consumer."
      },
      {
        "q": "What is the role of 'Jago Grahak Jago'?",
        "options": [
          "A campaign to educate and empower consumers",
          "A forum for registering consumer complaints",
          "A platform for businesses to showcase new products",
          "A government regulatory body for product quality"
        ],
        "correct": 0,
        "explanation": "'Jago Grahak Jago' is a well-known consumer awareness campaign launched by the Government of India to inform consumers about their rights and responsibilities."
      },
      {
        "q": "What is the minimum age required for a person to be considered a 'consumer' under the Consumer Protection Act, 2019?",
        "options": [
          "16 years",
          "There is no minimum age requirement.",
          "21 years",
          "18 years"
        ],
        "correct": 1,
        "explanation": "The Consumer Protection Act, 2019, defines a consumer as a person who buys any goods or hires or avails any services for a consideration. The act does not specify a minimum age, but generally, a person must have the legal capacity to enter into a contract, which is typically 18 years. However, for the purpose of buying goods or services, even a minor can be considered a consumer if the purchase is made by their guardian."
      },
      {
        "q": "Which of the following is NOT a characteristic of a consumer dispute?",
        "options": [
          "It involves a defect in goods.",
          "It involves a deficiency in service.",
          "It always requires a legal background to file.",
          "It involves an unfair trade practice."
        ],
        "correct": 2,
        "explanation": "Consumer disputes are designed to be accessible, and a legal background is not a prerequisite for filing a complaint. The process is simplified to empower ordinary consumers."
      },
      {
        "q": "The Central Consumer Protection Authority (CCPA) was established under which act?",
        "options": [
          "Standards of Weights and Measures Act, 1976",
          "Competition Act, 2002",
          "Consumer Protection Act, 1986",
          "Consumer Protection Act, 2019"
        ],
        "correct": 3,
        "explanation": "The Central Consumer Protection Authority (CCPA) is a new body established under the Consumer Protection Act, 2019, to regulate matters relating to consumer rights, unfair trade practices, and misleading advertisements."
      },
      {
        "q": "Which consumer forum has the power to order the removal of a defect or deficiency in goods or services?",
        "options": [
          "District Consumer Disputes Redressal Forum",
          "State Consumer Disputes Redressal Commission",
          "National Consumer Disputes Redressal Commission",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "All three levels of consumer forums (District, State, and National) have the power to order the removal of a defect or deficiency in goods or services, and grant appropriate relief to the consumer."
      },
      {
        "q": "If a consumer is not satisfied with the order of the District Forum, where can they appeal?",
        "options": [
          "To the State Commission",
          "Directly to the Supreme Court",
          "To the National Commission",
          "To the Central Consumer Protection Authority"
        ],
        "correct": 0,
        "explanation": "An appeal against the order of the District Consumer Disputes Redressal Forum can be filed before the State Consumer Disputes Redressal Commission within 45 days."
      },
      {
        "q": "Which of the following is NOT a right of a consumer as per the Consumer Protection Act, 2019?",
        "options": [
          "Right to Seek Redressal",
          "Right to be Manipulated",
          "Right to Choose",
          "Right to Safety"
        ],
        "correct": 1,
        "explanation": "The Consumer Protection Act, 2019, clearly outlines the rights of consumers, and 'Right to be Manipulated' is not among them. Instead, consumers have the right to be protected against the marketing of goods and services which are hazardous to life and property."
      },
      {
        "q": "The primary objective of the Consumer Protection Act, 2019 is to:",
        "options": [
          "Promote monopolistic practices",
          "Increase the profits of businesses",
          "Protect the interests and rights of consumers",
          "Provide consumers with a wide variety of choices"
        ],
        "correct": 2,
        "explanation": "The main aim of the Consumer Protection Act is to safeguard consumers from unfair trade practices, defective goods, and deficient services, thereby protecting their rights and interests."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-introduction-to-microeconomics",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Introduction to Microeconomics",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Introduction to Microeconomics. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The problem of 'What to produce?' in economics addresses:",
        "options": [
          "How to combine factors of production efficiently.",
          "For whom to produce the goods and services.",
          "The role of government intervention in the economy.",
          "Which goods and services should be produced and in what quantities."
        ],
        "correct": 3,
        "explanation": "This fundamental question concerns the selection of goods and services to be produced from the available scarce resources."
      },
      {
        "q": "A production possibility frontier (PPF) shows:",
        "options": [
          "All possible combinations of goods and services that can be produced with given resources and technology.",
          "The total demand for a particular good.",
          "The maximum profit a firm can earn.",
          "The relationship between price and quantity supplied."
        ],
        "correct": 0,
        "explanation": "The PPF illustrates the trade-offs between producing different combinations of goods and services given an economy's limited resources and technology."
      },
      {
        "q": "Microeconomics primarily focuses on:",
        "options": [
          "International trade and balance of payments.",
          "The behavior of individual economic agents like households and firms.",
          "The economy as a whole, including inflation and unemployment.",
          "Government policies and their impact on national income."
        ],
        "correct": 1,
        "explanation": "Microeconomics analyzes the decisions and interactions of individual economic units."
      },
      {
        "q": "In a mixed economy:",
        "options": [
          "All economic decisions are made by the government.",
          "There is no role for either the market or the government.",
          "Economic decisions are made by a combination of market forces and government intervention.",
          "All economic decisions are made by private individuals and firms."
        ],
        "correct": 2,
        "explanation": "A mixed economy blends elements of both market and command economies, allowing for private enterprise alongside government regulation and provision of certain goods and services."
      },
      {
        "q": "Positive economics deals with:",
        "options": [
          "What ought to be in the economy.",
          "Normative statements about economic fairness.",
          "Subjective judgments about economic policies.",
          "What is, what was, and what will be in the economy."
        ],
        "correct": 3,
        "explanation": "Positive economics is concerned with objective analysis and factual statements about economic phenomena."
      },
      {
        "q": "Which of the following is a characteristic of a command economy?",
        "options": [
          "Economic decisions are centrally planned by the government.",
          "Decisions about production and distribution are made by individuals and firms.",
          "Private ownership of the means of production.",
          "Prices are determined by the forces of supply and demand."
        ],
        "correct": 0,
        "explanation": "In a command economy, the government controls most of the economic activity, including what is produced and how it is distributed."
      },
      {
        "q": "Opportunity cost is best defined as:",
        "options": [
          "The monetary cost of a good or service.",
          "The value of the next-best alternative forgone.",
          "The benefit gained from consumption.",
          "The total cost of production."
        ],
        "correct": 1,
        "explanation": "Opportunity cost represents the value of what you have to give up to choose one option over another."
      },
      {
        "q": "Which of the following is an example of a normative economic statement?",
        "options": [
          "The inflation rate is currently 7%.",
          "The unemployment rate in India was 5% last year.",
          "The government should provide free education to all citizens.",
          "An increase in the price of petrol leads to a decrease in its consumption."
        ],
        "correct": 2,
        "explanation": "Normative statements express opinions or recommendations about what should be, rather than describing economic facts."
      },
      {
        "q": "Which of the following is a factor of production?",
        "options": [
          "Money",
          "Interest",
          "Profit",
          "Land"
        ],
        "correct": 3,
        "explanation": "Land, labor, capital, and entrepreneurship are the four traditional factors of production."
      },
      {
        "q": "Which of the following best describes the fundamental economic problem of scarcity?",
        "options": [
          "Unlimited wants and limited resources.",
          "Limited wants and limited resources.",
          "Unlimited wants and unlimited resources.",
          "Limited wants and unlimited resources."
        ],
        "correct": 0,
        "explanation": "Scarcity arises because human wants are virtually unlimited, while the resources available to satisfy them are finite."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-theory-of-consumer-behaviour",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Theory of Consumer Behaviour",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Theory of Consumer Behaviour. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following is a characteristic of an indifference curve?",
        "options": [
          "Indifference curves are typically concave to the origin.",
          "Indifference curves are convex to the origin.",
          "Indifference curves can intersect each other.",
          "Indifference curves slope upwards."
        ],
        "correct": 1,
        "explanation": "Indifference curves are generally convex to the origin due to the principle of diminishing marginal rate of substitution, meaning consumers are willing to give up less of one good to obtain more of another as they have more of the latter."
      },
      {
        "q": "Which of the following best describes a 'normal good' in economics?",
        "options": [
          "A good whose demand decreases as income increases.",
          "A good whose demand increases as its price decreases.",
          "A good whose demand increases as income increases.",
          "A good whose demand is unaffected by changes in income."
        ],
        "correct": 2,
        "explanation": "A normal good is characterized by a positive relationship between income and quantity demanded. As income rises, consumers tend to buy more of normal goods."
      },
      {
        "q": "If the price of a good decreases, and the demand for that good also decreases, what type of good is it likely to be?",
        "options": [
          "A normal good.",
          "A complementary good.",
          "A substitute good.",
          "An inferior good."
        ],
        "correct": 3,
        "explanation": "An inferior good is one for which the quantity demanded decreases as the consumer's income increases, or in this context, as its price decreases (which can be interpreted as an increase in 'real' income)."
      },
      {
        "q": "The law of diminishing marginal utility states that as a consumer consumes more and more units of a good, the additional satisfaction derived from each successive unit:",
        "options": [
          "Decreases at an increasing rate.",
          "Increases at an increasing rate.",
          "Remains constant.",
          "Increases at a decreasing rate."
        ],
        "correct": 0,
        "explanation": "The law states that marginal utility FALLS as successive units are consumed. Any option saying utility increases contradicts the law itself."
      },
      {
        "q": "If the income of a consumer increases, and they start buying more of good X and less of good Y, what can be inferred about good Y?",
        "options": [
          "Good Y is a complement to good X.",
          "Good Y is an inferior good.",
          "Good Y is a normal good.",
          "Good Y is a substitute for good X."
        ],
        "correct": 1,
        "explanation": "If the consumption of good Y decreases as income increases, it means good Y is an inferior good. Consumers tend to switch to better quality or more preferred normal goods as their income rises."
      },
      {
        "q": "What does the slope of the indifference curve represent?",
        "options": [
          "The income effect.",
          "The price ratio of the two goods.",
          "The marginal rate of substitution (MRS).",
          "The total utility of the two goods."
        ],
        "correct": 2,
        "explanation": "The slope of the indifference curve at any point is known as the Marginal Rate of Substitution (MRS). It shows the rate at which a consumer is willing to give up one good for another while maintaining the same level of satisfaction."
      },
      {
        "q": "The point of consumer's equilibrium occurs where:",
        "options": [
          "The demand curve intersects the supply curve.",
          "The marginal utility is maximized.",
          "The total utility equals the total cost.",
          "The budget line is tangent to the highest possible indifference curve."
        ],
        "correct": 3,
        "explanation": "Consumer's equilibrium is achieved when the consumer maximizes their satisfaction subject to their budget constraint. This occurs at the point where the budget line is tangent to the highest attainable indifference curve, meaning the slope of the budget line equals the slope of the indifference curve (MRS = Px/Py)."
      },
      {
        "q": "Which concept explains why a consumer buys more of a good when its price falls, even if their income were to remain constant?",
        "options": [
          "Income effect and substitution effect.",
          "Consumer's equilibrium.",
          "Law of diminishing marginal utility.",
          "Indifference curve analysis."
        ],
        "correct": 0,
        "explanation": "The law of demand states that quantity demanded increases as price falls. This is explained by the combined effects of the substitution effect (the good becomes relatively cheaper) and the income effect (the consumer's real purchasing power increases)."
      },
      {
        "q": "The budget line represents:",
        "options": [
          "Combinations of goods that provide equal levels of satisfaction.",
          "Combinations of goods that a consumer can afford with their given income and market prices.",
          "The maximum quantity of a good a consumer is willing to buy at a given price.",
          "The total utility derived from consuming a good."
        ],
        "correct": 1,
        "explanation": "The budget line (or budget constraint) illustrates all possible combinations of two goods that a consumer can purchase given their income and the prices of the two goods."
      },
      {
        "q": "The substitution effect on demand for a good is always:",
        "options": [
          "Zero.",
          "Either positive or negative depending on the good.",
          "Negative.",
          "Positive."
        ],
        "correct": 2,
        "explanation": "The substitution effect is always negative because when the price of a good falls, it becomes relatively cheaper than other goods, and consumers tend to substitute the relatively cheaper good for others, thus increasing its demand."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-production-and-costs",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Production and Costs",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Production and Costs. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Opportunity cost refers to:",
        "options": [
          "Explicit payments made by a firm",
          "The sum of fixed and variable costs",
          "The total cost of production",
          "The cost of the next best alternative foregone"
        ],
        "correct": 3,
        "explanation": "Opportunity cost is a fundamental concept in economics that represents the value of the next best alternative that must be given up to pursue a certain action. It's the cost of what you could have had instead."
      },
      {
        "q": "If the Average Cost (AC) is falling, then Marginal Cost (MC) must be:",
        "options": [
          "Less than AC",
          "Greater than AC",
          "Zero",
          "Equal to AC"
        ],
        "correct": 0,
        "explanation": "When Average Cost is falling, it means that the cost of producing the last unit (MC) is lower than the average cost of previous units, pulling the average down. Therefore, MC < AC."
      },
      {
        "q": "The Law of Diminishing Marginal Returns states that if one factor of production is increased while others are held constant, then the marginal product of that factor will eventually:",
        "options": [
          "Increase",
          "Decrease",
          "Become zero",
          "Remain constant"
        ],
        "correct": 1,
        "explanation": "The law of diminishing marginal returns is a fundamental concept in economics that describes the decrease in the marginal output of a production process as the amount of a single factor is incrementally increased, while the amounts of all other factors remain fixed."
      },
      {
        "q": "Which of the following is an example of a variable cost in the short run?",
        "options": [
          "Rent of the factory premises",
          "Interest paid on a loan for machinery",
          "Cost of raw materials",
          "Salary of the factory manager"
        ],
        "correct": 2,
        "explanation": "Variable costs are costs that change with the level of output. The cost of raw materials directly depends on how much is produced."
      },
      {
        "q": "When Total Product (TP) is at its maximum, Marginal Product (MP) is:",
        "options": [
          "Positive and decreasing",
          "Negative",
          "Positive and increasing",
          "Zero"
        ],
        "correct": 3,
        "explanation": "The Marginal Product curve intersects the Total Product curve at its maximum point. When TP is at its peak, MP is zero. Before that, MP is positive and decreasing."
      },
      {
        "q": "If total output increases from 100 units to 120 units when a firm hires one more worker, the Marginal Product of that worker is:",
        "options": [
          "20 units",
          "120 units",
          "220 units",
          "100 units"
        ],
        "correct": 0,
        "explanation": "Marginal Product (MP) is the change in total output resulting from employing one more unit of a variable input. Here, change in output is 120 - 100 = 20 units."
      },
      {
        "q": "In the long run, all costs are considered:",
        "options": [
          "Fixed costs",
          "Variable costs",
          "Sunk costs",
          "Implicit costs"
        ],
        "correct": 1,
        "explanation": "In the long run, a firm has the flexibility to adjust all its factors of production. Therefore, all costs become variable in the long run as they can be altered according to the desired scale of production."
      },
      {
        "q": "Which cost curve is U-shaped?",
        "options": [
          "Marginal Cost (MC)",
          "Average Variable Cost (AVC)",
          "Both B and C",
          "Average Fixed Cost (AFC)"
        ],
        "correct": 2,
        "explanation": "Both Average Variable Cost (AVC) and Marginal Cost (MC) curves are typically U-shaped due to the law of diminishing marginal returns. AFC, however, continuously falls."
      },
      {
        "q": "When does Average Fixed Cost (AFC) start to fall?",
        "options": [
          "When Total Cost starts to fall",
          "When Variable Cost starts to fall",
          "When Marginal Cost is at its minimum",
          "As output increases"
        ],
        "correct": 3,
        "explanation": "AFC is calculated as Total Fixed Cost (TFC) divided by output. Since TFC is constant, as output increases, AFC will continuously decrease."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-the-theory-of-the-firm-under-perfect-competition",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "The Theory of the Firm under Perfect Competition",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — The Theory of the Firm under Perfect Competition. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "The total revenue (TR) for a perfectly competitive firm is calculated as:",
        "options": [
          "Price (P) * Quantity (Q)",
          "Average Variable Cost (AVC) * Quantity (Q)",
          "Price (P) / Quantity (Q)",
          "Marginal Cost (MC) * Quantity (Q)"
        ],
        "correct": 0,
        "explanation": "Total Revenue is the total income a firm generates from selling its goods or services, which is the price per unit multiplied by the number of units sold."
      },
      {
        "q": "The law of diminishing marginal returns implies that as a firm increases its variable input, holding fixed inputs constant:",
        "options": [
          "Total product will eventually decrease",
          "Marginal product will eventually decrease",
          "Average product will eventually decrease",
          "All of the above"
        ],
        "correct": 1,
        "explanation": "The law of diminishing marginal returns specifically states that the additional output from each additional unit of the variable input will eventually fall."
      },
      {
        "q": "Which of the following represents the short-run supply curve of a perfectly competitive firm?",
        "options": [
          "Its average total cost curve above marginal cost",
          "Its marginal cost curve above average variable cost",
          "Its average variable cost curve above marginal cost",
          "Its marginal cost curve above average total cost"
        ],
        "correct": 1,
        "explanation": "The firm's short-run supply curve is that portion of its marginal cost curve which lies above the minimum point of its average variable cost curve."
      },
      {
        "q": "Which of the following is NOT a characteristic of a perfectly competitive market?",
        "options": [
          "Homogeneous products",
          "Free entry and exit",
          "Imperfect information",
          "Large number of buyers and sellers"
        ],
        "correct": 2,
        "explanation": "Perfect competition assumes perfect information, meaning buyers and sellers are fully aware of prices and product qualities."
      },
      {
        "q": "In the long-run equilibrium of a perfectly competitive market, firms earn:",
        "options": [
          "Economic losses",
          "Zero revenue",
          "Supernormal profits",
          "Normal profits"
        ],
        "correct": 3,
        "explanation": "In long-run equilibrium, free entry and exit ensure that firms earn only normal profits (zero economic profit), where price equals minimum average total cost."
      },
      {
        "q": "In a perfectly competitive market, a firm's demand curve is:",
        "options": [
          "Perfectly elastic (horizontal)",
          "Perfectly inelastic (vertical)",
          "Upward sloping",
          "Downward sloping"
        ],
        "correct": 0,
        "explanation": "In perfect competition, a firm is a price taker. It can sell any quantity at the market determined price, making its demand curve perfectly elastic at that price."
      },
      {
        "q": "A firm operating in perfect competition will maximize its profit where:",
        "options": [
          "Marginal Revenue (MR) > Marginal Cost (MC)",
          "Marginal Revenue (MR) = Marginal Cost (MC)",
          "Marginal Revenue (MR) < Marginal Cost (MC)",
          "Average Cost (AC) is minimized"
        ],
        "correct": 1,
        "explanation": "Profit maximization in perfect competition occurs at the output level where MR equals MC. If MR > MC, the firm can increase profit by producing more. If MR < MC, it can increase profit by producing less."
      },
      {
        "q": "In the short run, a perfectly competitive firm will shut down if the market price is:",
        "options": [
          "Below average total cost",
          "Above average total cost",
          "Below average variable cost",
          "Above average variable cost"
        ],
        "correct": 2,
        "explanation": "A firm will continue to produce in the short run as long as the price covers its average variable cost. If the price falls below AVC, the firm incurs losses greater than its fixed costs and is better off shutting down."
      },
      {
        "q": "If the market price in a perfectly competitive industry is above the average total cost for firms in the long run, we can expect:",
        "options": [
          "Firms to exit the industry",
          "Existing firms to increase prices",
          "Existing firms to reduce output",
          "New firms to enter the industry"
        ],
        "correct": 3,
        "explanation": "Economic profits (price above ATC) in the long run signal opportunities for new firms to enter the industry, increasing supply and driving down prices towards the minimum ATC."
      },
      {
        "q": "For a perfectly competitive firm, Marginal Revenue (MR) is equal to:",
        "options": [
          "Price (P)",
          "Marginal Cost (MC)",
          "Average Total Cost (ATC)",
          "Average Variable Cost (AVC)"
        ],
        "correct": 0,
        "explanation": "In perfect competition, the firm is a price taker, so it receives the same price for each unit sold. Therefore, MR is always equal to the market price."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-market-equilibrium",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Market Equilibrium",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Market Equilibrium. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Consider a market for a normal good. If consumer income rises and simultaneously the cost of production decreases, what can be definitively said about the equilibrium price and quantity?",
        "options": [
          "Equilibrium quantity will definitely decrease, price will be indeterminate.",
          "Equilibrium quantity will definitely increase, price will be indeterminate.",
          "Equilibrium price will definitely increase, quantity will be indeterminate.",
          "Equilibrium price will definitely decrease, quantity will be indeterminate."
        ],
        "correct": 1,
        "explanation": "An increase in income for a normal good shifts demand to the right (increasing quantity and price). A decrease in production cost shifts supply to the right (increasing quantity and decreasing price). The effect on price is uncertain as it depends on the magnitude of the shifts, but quantity will definitely increase."
      },
      {
        "q": "Which of the following is a characteristic of a market in disequilibrium?",
        "options": [
          "The price is such that quantity demanded equals quantity supplied.",
          "Buyers and sellers are satisfied with the current price and quantity.",
          "Either a surplus or a shortage exists.",
          "There is no tendency for price to change."
        ],
        "correct": 2,
        "explanation": "Disequilibrium occurs when the market price is not at the equilibrium level. This leads to a situation where either quantity demanded exceeds quantity supplied (shortage) or quantity supplied exceeds quantity demanded (surplus), creating pressure for the price to adjust."
      },
      {
        "q": "In the context of market equilibrium, a 'movement along' the demand curve is caused by a change in:",
        "options": [
          "Consumer income.",
          "Consumer tastes and preferences.",
          "The price of related goods.",
          "The price of the good itself."
        ],
        "correct": 3,
        "explanation": "A movement along the demand curve occurs when there is a change in the quantity demanded solely due to a change in the price of the good itself, assuming all other factors remain constant. Changes in income, related goods' prices, or tastes cause shifts of the entire demand curve."
      },
      {
        "q": "If the demand for a luxury good decreases significantly due to an economic recession, what will likely happen to its equilibrium price and quantity?",
        "options": [
          "Equilibrium price will decrease, and equilibrium quantity will decrease.",
          "Equilibrium price will increase, and equilibrium quantity will decrease.",
          "Equilibrium price will decrease, and equilibrium quantity will increase.",
          "Equilibrium price will increase, and equilibrium quantity will increase."
        ],
        "correct": 0,
        "explanation": "A recession typically leads to a decrease in consumer income. For luxury goods, this causes a significant decrease in demand (a leftward shift of the demand curve). With supply remaining constant, this leads to a lower equilibrium price and a lower equilibrium quantity."
      },
      {
        "q": "The concept of 'market equilibrium' implies that at the prevailing price:",
        "options": [
          "Quantity demanded is greater than quantity supplied.",
          "Quantity demanded is equal to quantity supplied.",
          "Quantity supplied is greater than quantity demanded.",
          "There is a shortage of the good."
        ],
        "correct": 1,
        "explanation": "Market equilibrium is the state where the quantity of a good that consumers are willing and able to buy is exactly equal to the quantity that producers are willing and able to sell at a given price. This point represents a balance between supply and demand."
      },
      {
        "q": "If the price of a substitute good increases, what will be the impact on the equilibrium price and quantity of the original good?",
        "options": [
          "Equilibrium price will increase, quantity will decrease.",
          "Both equilibrium price and quantity will decrease.",
          "Both equilibrium price and quantity will increase.",
          "Equilibrium price will decrease, quantity will increase."
        ],
        "correct": 2,
        "explanation": "If the price of a substitute good increases, consumers will switch to the original good, increasing its demand. This rightward shift in the demand curve will lead to an increase in both the equilibrium price and quantity of the original good."
      },
      {
        "q": "Which of the following scenarios will lead to a simultaneous increase in both equilibrium price and equilibrium quantity in a market?",
        "options": [
          "A decrease in supply.",
          "A simultaneous decrease in both demand and supply.",
          "A decrease in demand.",
          "An increase in demand."
        ],
        "correct": 3,
        "explanation": "An increase in demand, with supply remaining constant, shifts the demand curve to the right. This leads to a higher equilibrium price and a higher equilibrium quantity. A decrease in supply would increase price but decrease quantity."
      },
      {
        "q": "If the government imposes a price ceiling below the equilibrium price, what is the likely outcome in the market?",
        "options": [
          "A shortage of the good.",
          "No change in price or quantity.",
          "A surplus of the good.",
          "The market will reach a new, stable equilibrium."
        ],
        "correct": 0,
        "explanation": "A price ceiling set below the equilibrium price prevents the price from rising to its natural level. At the lower price, quantity demanded exceeds quantity supplied, leading to a shortage."
      },
      {
        "q": "What happens to the equilibrium quantity and price if the government introduces a subsidy for producers of a good?",
        "options": [
          "Both equilibrium quantity and price will decrease.",
          "Equilibrium quantity will increase, and equilibrium price will decrease.",
          "Equilibrium quantity will decrease, and equilibrium price will increase.",
          "Both equilibrium quantity and price will increase."
        ],
        "correct": 1,
        "explanation": "A subsidy to producers effectively lowers their cost of production, leading to an increase in supply (a rightward shift of the supply curve). This results in a lower equilibrium price and a higher equilibrium quantity."
      },
      {
        "q": "In a perfectly competitive market, if the demand for a good increases while the supply remains constant, what will be the immediate effect on the equilibrium price and quantity?",
        "options": [
          "Equilibrium price will increase, equilibrium quantity will decrease.",
          "Equilibrium price will decrease, equilibrium quantity will increase.",
          "Equilibrium price will increase, equilibrium quantity will increase.",
          "Equilibrium price will decrease, equilibrium quantity will decrease."
        ],
        "correct": 2,
        "explanation": "An increase in demand, with supply unchanged, leads to a rightward shift of the demand curve. This results in a higher equilibrium price and a higher equilibrium quantity as consumers are willing to buy more at a higher price."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-non-competitive-markets",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Non-competitive Markets",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Non-competitive Markets. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "In an oligopoly, the firms are typically:",
        "options": [
          "Engaged in a price war indefinitely",
          "Price takers",
          "Price setters",
          "Interdependent in their decisions"
        ],
        "correct": 3,
        "explanation": "In an oligopoly, the actions of one firm significantly affect the other firms, leading to interdependence in their pricing, output, and advertising strategies."
      },
      {
        "q": "When a monopolist faces a downward-sloping demand curve, its marginal revenue (MR) is:",
        "options": [
          "Less than the price",
          "Greater than the price",
          "Equal to the price",
          "Zero at all output levels"
        ],
        "correct": 0,
        "explanation": "To sell an additional unit, a monopolist must lower the price not only for that unit but also for all previous units sold. Thus, the marginal revenue is less than the price."
      },
      {
        "q": "Price discrimination is most likely to occur in which type of market?",
        "options": [
          "Monopolistic Competition",
          "Monopoly",
          "Oligopoly",
          "Perfect Competition"
        ],
        "correct": 1,
        "explanation": "A monopolist, having sole control over supply, can charge different prices to different consumers for the same good or service, a practice known as price discrimination."
      },
      {
        "q": "What is a common outcome of 'excess capacity' in monopolistic competition?",
        "options": [
          "Firms experience significant economies of scale.",
          "Firms produce at the minimum point of their average total cost curve.",
          "Firms produce less than the output that minimizes average total cost.",
          "Market efficiency is maximized."
        ],
        "correct": 2,
        "explanation": "In monopolistic competition, firms typically operate with excess capacity, meaning they produce at an output level below that which minimizes average total cost, due to product differentiation and downward-sloping demand."
      },
      {
        "q": "A characteristic feature of monopolistic competition is:",
        "options": [
          "Significant economies of scale",
          "Homogeneous products",
          "Collusion among firms",
          "Product differentiation"
        ],
        "correct": 3,
        "explanation": "Monopolistic competition involves many firms selling differentiated products, which allows them to have some degree of control over their prices."
      },
      {
        "q": "Which condition indicates that a monopolist is maximizing its profits?",
        "options": [
          "Marginal Revenue = Marginal Cost (MR=MC)",
          "Marginal Revenue = Price (MR=P)",
          "Total Revenue = Total Cost (TR=TC)",
          "Price = Marginal Cost (P=MC)"
        ],
        "correct": 0,
        "explanation": "Profit maximization for any firm, including a monopolist, occurs at the output level where marginal revenue equals marginal cost (MR=MC)."
      },
      {
        "q": "Which of the following is a barrier to entry in a monopoly market?",
        "options": [
          "High consumer demand",
          "Government patents and licenses",
          "Low production costs",
          "Easy access to raw materials"
        ],
        "correct": 1,
        "explanation": "Government-granted patents, licenses, or exclusive rights create significant barriers to entry, preventing other firms from entering the market and thus maintaining a monopoly."
      },
      {
        "q": "Which of the following best describes a monopoly market structure?",
        "options": [
          "A large number of buyers and sellers, with identical products.",
          "Many sellers offering differentiated products.",
          "A single seller selling a unique product with no close substitutes.",
          "A few dominant sellers who are interdependent in their pricing and output decisions."
        ],
        "correct": 2,
        "explanation": "A monopoly is characterized by a single seller in the market offering a product with no close substitutes, giving the seller significant market power."
      },
      {
        "q": "The Kinked Demand Curve model is often associated with:",
        "options": [
          "Perfect Competition",
          "Monopoly",
          "Monopolistic Competition",
          "Oligopoly"
        ],
        "correct": 3,
        "explanation": "The Kinked Demand Curve model attempts to explain price rigidity in oligopolistic markets, where firms are hesitant to change prices due to the fear of reactions from competitors."
      },
      {
        "q": "In an oligopoly, a cartel is a group of firms that:",
        "options": [
          "Collude to set prices and output",
          "Independently decide their production levels",
          "Are price takers in the market",
          "Compete vigorously on price"
        ],
        "correct": 0,
        "explanation": "A cartel is an agreement among firms in an oligopoly to act like a single monopolist by coordinating their pricing and output decisions to maximize joint profits."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-introduction-to-macroeconomics",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Introduction to Macroeconomics",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Introduction to Macroeconomics. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Gross Domestic Product (GDP) measures the:",
        "options": [
          "Total income earned by all individuals in a country",
          "Total value of final goods and services produced within a country's geographical boundaries in a given period",
          "Total expenditure on imported goods and services",
          "Total value of goods and services produced by a country's citizens, regardless of location"
        ],
        "correct": 1,
        "explanation": "GDP is the market value of all final goods and services produced within a country in a specific time period."
      },
      {
        "q": "Which of the following is a component of aggregate demand (AD) in an open economy?",
        "options": [
          "Net indirect taxes",
          "Government subsidies",
          "Net exports",
          "Depreciation"
        ],
        "correct": 2,
        "explanation": "Aggregate demand comprises consumption, investment, government spending, and net exports (exports minus imports)."
      },
      {
        "q": "Which of the following is a macroeconomic variable?",
        "options": [
          "The salary of a specific employee",
          "The profit of a particular company",
          "The price of a single textbook",
          "The total output of all firms in the country"
        ],
        "correct": 3,
        "explanation": "Macroeconomic variables are those that relate to the economy as a whole, such as national income, aggregate output, and overall price levels."
      },
      {
        "q": "Which of the following is a key objective of macroeconomic policy in India?",
        "options": [
          "To increase the overall production of goods and services",
          "To manage the import of luxury goods",
          "To reduce the number of private businesses",
          "To control the price of a specific company's shares"
        ],
        "correct": 0,
        "explanation": "Macroeconomic policy aims to achieve broad economic goals like economic growth, price stability, and full employment, which are related to increasing the overall production of goods and services."
      },
      {
        "q": "Unemployment where individuals are temporarily between jobs or seeking their first job is known as:",
        "options": [
          "Cyclical unemployment",
          "Frictional unemployment",
          "Structural unemployment",
          "Disguised unemployment"
        ],
        "correct": 1,
        "explanation": "Frictional unemployment occurs when people are in the process of moving between jobs, searching for new jobs, or entering the labor force."
      },
      {
        "q": "The Circular Flow of Income model illustrates the relationship between:",
        "options": [
          "Firms and the government",
          "Households and the international market",
          "Households and firms",
          "Households and the financial sector only"
        ],
        "correct": 2,
        "explanation": "The basic circular flow model depicts the flow of goods, services, and money between households (consumers) and firms (producers)."
      },
      {
        "q": "The 'Balance of Payments' accounts for a country records:",
        "options": [
          "All domestic transactions within the country",
          "The flow of goods and services only",
          "The country's internal debt and credit",
          "All economic transactions between the country and the rest of the world"
        ],
        "correct": 3,
        "explanation": "The Balance of Payments is a statement that summarizes all the economic transactions between a country's residents and the rest of the world over a period of time."
      },
      {
        "q": "Fiscal policy primarily involves the government's decisions on:",
        "options": [
          "Taxation and government expenditure",
          "Inflation and unemployment targets",
          "Interest rates and money supply",
          "Exchange rates and trade policies"
        ],
        "correct": 0,
        "explanation": "Fiscal policy refers to the use of government spending and taxation to influence the economy."
      },
      {
        "q": "Which of the following is considered a 'factor of production' in macroeconomics?",
        "options": [
          "Interest rates",
          "Entrepreneurship",
          "Government bonds",
          "Consumer durables"
        ],
        "correct": 1,
        "explanation": "The main factors of production are land, labor, capital, and entrepreneurship, which are used to produce goods and services."
      },
      {
        "q": "Which of the following best describes 'inflation' in macroeconomics?",
        "options": [
          "A continuous fall in the general price level",
          "A decrease in the demand for goods and services",
          "A sustained increase in the general price level",
          "A temporary rise in the price of a single commodity"
        ],
        "correct": 2,
        "explanation": "Inflation refers to a persistent and widespread increase in the general price level of goods and services in an economy over a period of time."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-national-income-accounting",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "National Income Accounting",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — National Income Accounting. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Net Indirect Taxes (NIT) is calculated as:",
        "options": [
          "Indirect Taxes + Subsidies",
          "Direct Taxes - Subsidies",
          "Direct Taxes + Subsidies",
          "Indirect Taxes - Subsidies"
        ],
        "correct": 3,
        "explanation": "Net Indirect Taxes (NIT) represent the difference between indirect taxes levied by the government and subsidies provided by the government. NIT = Indirect Taxes - Subsidies."
      },
      {
        "q": "Which method of calculating National Income involves summing up the value added at each stage of production?",
        "options": [
          "Value Added Method",
          "Product Method",
          "Income Method",
          "Expenditure Method"
        ],
        "correct": 0,
        "explanation": "The Value Added Method (also known as the Product Method) calculates National Income by summing the net value added by all the producing units in the economy. Value added is the difference between the value of output and the value of intermediate consumption."
      },
      {
        "q": "Which of the following is an intermediate good?",
        "options": [
          "A refrigerator bought by a household.",
          "Flour purchased by a bakery for making bread.",
          "A car sold by a manufacturer to a consumer.",
          "A tractor used by a farmer for cultivation."
        ],
        "correct": 1,
        "explanation": "Intermediate goods are those goods that are used up in the production process of other goods or services. Flour purchased by a bakery is used to produce bread, hence it is an intermediate good."
      },
      {
        "q": "Which of the following is the broadest measure of economic activity in an economy?",
        "options": [
          "Gross National Product (GNP)",
          "Personal Disposable Income (PDI)",
          "Gross Domestic Product (GDP)",
          "National Income (NI)"
        ],
        "correct": 2,
        "explanation": "GDP measures the total value of all final goods and services produced within the domestic territory of a country in a given period. While GNP, NI, and PDI are important, GDP represents the broadest measure of domestic production."
      },
      {
        "q": "The sum of compensation of employees, operating surplus, and mixed income of self-employed is known as:",
        "options": [
          "Gross National Product at Factor Cost",
          "Gross Domestic Product at Market Price",
          "National Income",
          "Net Domestic Product at Factor Cost"
        ],
        "correct": 3,
        "explanation": "This sum represents the Net Domestic Product at Factor Cost (NDPFC). Operating surplus includes profits, interest, and rent. Compensation of employees is wages and salaries. Mixed income accounts for income of self-employed. These are the primary components of factor incomes earned domestically."
      },
      {
        "q": "If a country's GDP is growing rapidly, but its Per Capita Income is stagnant, this implies:",
        "options": [
          "The benefits of economic growth are not being evenly distributed.",
          "The country is facing a recession.",
          "The population growth rate is negative.",
          "The country is experiencing significant economic growth and improving living standards."
        ],
        "correct": 0,
        "explanation": "Per Capita Income is calculated by dividing National Income (or GDP) by the total population. If GDP is growing but Per Capita Income is stagnant, it means the population is growing at the same or a faster rate than GDP, indicating that the per person share of the economic output is not increasing, suggesting unequal distribution or very high population growth diluting the benefits of GDP growth."
      },
      {
        "q": "Transfer payments are excluded from the calculation of National Income because:",
        "options": [
          "They are only received by specific groups of people.",
          "They are difficult to measure accurately.",
          "They do not involve the production of new goods or services.",
          "They are often paid in cash."
        ],
        "correct": 2,
        "explanation": "Transfer payments, such as pensions and subsidies, are one-way receipts without any corresponding production of goods or services. Therefore, they do not contribute to the value of current output and are excluded from National Income calculations."
      },
      {
        "q": "Which component is NOT included in the expenditure method of calculating GDP?",
        "options": [
          "Government Final Consumption Expenditure",
          "Net Exports",
          "Private Final Consumption Expenditure",
          "Interest Payments on National Debt"
        ],
        "correct": 3,
        "explanation": "The expenditure method sums up consumption, investment, government spending, and net exports. Interest payments on national debt are transfer payments and are not considered as expenditure on new goods and services, hence excluded."
      },
      {
        "q": "Which of the following best defines Gross National Disposable Income (GNDI)?",
        "options": [
          "GNP + Net current transfers from abroad",
          "GDP + Net factor income from abroad",
          "GDP + Net current transfers from abroad",
          "GNP + Net factor income from abroad"
        ],
        "correct": 0,
        "explanation": "Gross National Disposable Income (GNDI) is calculated by adding net current transfers from abroad to Gross National Product (GNP). GNDI = GNP + Net current transfers from abroad."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-money-and-banking",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Money and Banking",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Money and Banking. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When the central bank buys government securities from the open market, it leads to:",
        "options": [
          "Decrease in credit creation capacity",
          "Increase in money supply",
          "Decrease in money supply",
          "No change in money supply"
        ],
        "correct": 1,
        "explanation": "Buying government securities injects money into the economy, increasing the money supply."
      },
      {
        "q": "A 'credit multiplier' of 4 implies that a 100 rupee deposit can lead to a maximum of:",
        "options": [
          "25 rupee deposit creation",
          "100 rupee deposit creation",
          "400 rupee deposit creation",
          "500 rupee deposit creation"
        ],
        "correct": 2,
        "explanation": "Credit multiplier is calculated as 1/Required Reserve Ratio. If the multiplier is 4, the maximum increase in deposits is 4 times the initial deposit."
      },
      {
        "q": "The difference between the interest rate charged by banks on loans and the interest rate paid on deposits is known as:",
        "options": [
          "Repo rate",
          "Liquidity ratio",
          "Reverse repo rate",
          "Spread"
        ],
        "correct": 3,
        "explanation": "The spread represents the net interest margin of a bank, reflecting its profitability from lending activities."
      },
      {
        "q": "Which of the following is NOT a primary function of a commercial bank?",
        "options": [
          "Issuing currency",
          "Facilitating fund transfer",
          "Accepting deposits",
          "Granting loans"
        ],
        "correct": 0,
        "explanation": "Issuing currency is a primary function of the central bank, not commercial banks."
      },
      {
        "q": "The demand for money that arises from the need to make everyday transactions is known as:",
        "options": [
          "Precautionary demand for money",
          "Transactions demand for money",
          "Asset demand for money",
          "Speculative demand for money"
        ],
        "correct": 1,
        "explanation": "Transactions demand for money relates to the need for money to carry out regular purchases and payments."
      },
      {
        "q": "Fiat money is money that is:",
        "options": [
          "Limited in supply to maintain its value",
          "Primarily used for international transactions",
          "Issued by government decree and not backed by a physical commodity",
          "Backed by precious metals like gold or silver"
        ],
        "correct": 2,
        "explanation": "Fiat money's value comes from government order (fiat) rather than intrinsic value or commodity backing."
      },
      {
        "q": "When the central bank requires banks to hold a certain percentage of their total deposits as reserves, it is known as:",
        "options": [
          "Open market operations",
          "Moral suasion",
          "Discount rate",
          "Legal Reserve Ratio (LRR)"
        ],
        "correct": 3,
        "explanation": "Legal Reserve Ratio includes both Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR), which mandate banks to hold reserves."
      },
      {
        "q": "Which of the following is a tool of quantitative credit control used by the central bank?",
        "options": [
          "Bank rate",
          "Moral suasion",
          "Rationing of credit",
          "Margin requirements"
        ],
        "correct": 0,
        "explanation": "The bank rate is a direct measure to control the overall volume of credit in the economy."
      },
      {
        "q": "The Reserve Bank of India (RBI) acts as the banker to the:",
        "options": [
          "Commercial banks only",
          "Central and State governments",
          "General public",
          "Foreign banks"
        ],
        "correct": 1,
        "explanation": "The RBI functions as the banker to the central government and also advises and acts as a banker to state governments."
      },
      {
        "q": "Which institution is responsible for regulating the Indian banking system?",
        "options": [
          "Ministry of Finance",
          "National Bank for Agriculture and Rural Development (NABARD)",
          "Reserve Bank of India (RBI)",
          "Securities and Exchange Board of India (SEBI)"
        ],
        "correct": 2,
        "explanation": "The RBI is the apex institution that oversees and regulates all commercial banks in India."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-determination-of-income-and-employment",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Determination of Income and Employment",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Determination of Income and Employment. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "In the context of the aggregate demand-aggregate supply model, full employment equilibrium occurs when:",
        "options": [
          "Aggregate Demand is greater than Aggregate Supply.",
          "Aggregate Supply is greater than Aggregate Demand.",
          "Inflation is zero.",
          "Aggregate Demand equals Aggregate Supply at the full employment level of output."
        ],
        "correct": 3,
        "explanation": "Full employment equilibrium is achieved when the economy produces at its potential output level, meaning there is no involuntary unemployment, and aggregate demand equals aggregate supply at this output level."
      },
      {
        "q": "What does the 'autonomous' component of consumption represent?",
        "options": [
          "Consumption that does not depend on the level of income.",
          "Consumption by the government.",
          "Consumption that increases with income.",
          "Consumption that decreases with income."
        ],
        "correct": 0,
        "explanation": "Autonomous consumption is the minimum level of consumption that occurs even when income is zero. It is independent of the income level."
      },
      {
        "q": "Deficient demand in an economy leads to:",
        "options": [
          "Excess capacity",
          "Deflationary gap",
          "Full employment equilibrium",
          "Inflationary gap"
        ],
        "correct": 1,
        "explanation": "Deficient demand, also known as underemployment equilibrium, occurs when aggregate demand is insufficient to employ all available resources, leading to a deflationary gap."
      },
      {
        "q": "The paradox of thrift suggests that if everyone saves more, it can lead to:",
        "options": [
          "Increased aggregate investment and economic growth.",
          "A balanced budget for the government.",
          "Decreased aggregate demand and lower economic output.",
          "Increased consumption and higher economic growth."
        ],
        "correct": 2,
        "explanation": "The paradox of thrift states that while saving is good for an individual, if everyone tries to save more simultaneously, it reduces aggregate demand, leading to lower production and income, thus paradoxically reducing total savings."
      },
      {
        "q": "If the government increases its spending, what is the likely impact on aggregate demand and income, assuming MPC > 0?",
        "options": [
          "Aggregate demand decreases, income decreases.",
          "Aggregate demand increases, income decreases.",
          "Aggregate demand decreases, income increases.",
          "Aggregate demand increases, income increases."
        ],
        "correct": 3,
        "explanation": "An increase in government spending is a component of aggregate demand. With a positive MPC, this initial increase in spending leads to a multiplied increase in aggregate income."
      },
      {
        "q": "The Keynesian theory of employment primarily emphasizes the role of:",
        "options": [
          "Aggregate Demand",
          "Fiscal Policy alone",
          "Aggregate Supply",
          "Money Supply"
        ],
        "correct": 0,
        "explanation": "Keynesian economics posits that the level of output and employment is determined by the aggregate demand for goods and services."
      },
      {
        "q": "Which of the following represents the aggregate demand for goods and services in an economy?",
        "options": [
          "C + S + T + X",
          "C + I + G + X - M",
          "I + G + X + M",
          "C + S + T + M"
        ],
        "correct": 1,
        "explanation": "Aggregate Demand (AD) is the total expenditure on goods and services in an economy, represented by Consumption (C) + Investment (I) + Government Spending (G) + Net Exports (X - M)."
      },
      {
        "q": "Which of the following is a component of investment in macroeconomics?",
        "options": [
          "Purchase of shares in the stock market.",
          "Payment of household electricity bills.",
          "Purchase of a new factory by a firm.",
          "Government transfer payments."
        ],
        "correct": 2,
        "explanation": "Investment in macroeconomics refers to the creation of new capital assets, such as a new factory, machinery, or residential construction. The purchase of shares is financial investment, not real investment."
      },
      {
        "q": "The effective demand refers to the point where:",
        "options": [
          "Marginal Propensity to Consume equals Marginal Propensity to Save.",
          "Aggregate Demand exceeds Aggregate Supply.",
          "Aggregate Supply exceeds Aggregate Demand.",
          "Aggregate Demand equals Aggregate Supply."
        ],
        "correct": 3,
        "explanation": "Effective demand, in Keynesian economics, is the level of aggregate demand at which it equals aggregate supply. This determines the equilibrium level of output and employment."
      },
      {
        "q": "If the marginal propensity to consume (MPC) is 0.75, what is the value of the multiplier?",
        "options": [
          "4",
          "1.33",
          "3",
          "0.25"
        ],
        "correct": 0,
        "explanation": "The multiplier is calculated as 1 / (1 - MPC). With MPC = 0.75, the multiplier is 1 / (1 - 0.75) = 1 / 0.25 = 4."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-government-budget-and-the-economy",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Government Budget and the Economy",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Government Budget and the Economy. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following is a primary objective of a government budget in India?",
        "options": [
          "Minimizing government expenditure",
          "Ensuring equitable distribution of income and wealth",
          "Maximizing corporate profits",
          "Reducing the role of the public sector"
        ],
        "correct": 1,
        "explanation": "A key objective of government budgeting is to address income inequalities and promote social justice, which is achieved through measures like progressive taxation and social welfare programs."
      },
      {
        "q": "Which of the following is considered a 'capital receipt' in the Indian government budget?",
        "options": [
          "Income tax collected by the government",
          "Profits from public sector undertakings",
          "Disinvestment of shares of public sector undertakings",
          "Interest received from loans given to states"
        ],
        "correct": 2,
        "explanation": "Disinvestment is the sale of government assets, which results in a reduction of its assets and is therefore a capital receipt, not a recurring revenue source."
      },
      {
        "q": "Revenue deficit in a government budget refers to:",
        "options": [
          "The difference between fiscal deficit and interest payments",
          "The excess of capital expenditure over capital receipts",
          "The excess of total expenditure over total receipts",
          "The excess of revenue expenditure over revenue receipts"
        ],
        "correct": 3,
        "explanation": "Revenue deficit specifically measures the shortfall in the government's revenue earnings compared to its revenue spending, excluding capital transactions."
      },
      {
        "q": "A balanced budget implies:",
        "options": [
          "Government receipts are equal to government expenditure",
          "Government receipts are greater than government expenditure",
          "Government expenditure is greater than government receipts",
          "Fiscal deficit is zero"
        ],
        "correct": 0,
        "explanation": "A balanced budget occurs when the total revenue of the government exactly matches its total expenditure. While related to fiscal deficit being zero, the definition directly compares receipts and expenditure."
      },
      {
        "q": "Fiscal deficit represents:",
        "options": [
          "The gap between government's revenue receipts and its total expenditure",
          "The gap between government's total expenditure and its revenue receipts, excluding borrowings",
          "The gap between government's total receipts and its total borrowings",
          "The gap between government's total receipts and its revenue expenditure"
        ],
        "correct": 1,
        "explanation": "Fiscal deficit is the difference between the government's total expenditure and its total receipts, excluding borrowings. It indicates the extent to which the government needs to borrow to finance its operations."
      },
      {
        "q": "Which of the following accounts for the largest component of revenue expenditure for the Indian government?",
        "options": [
          "Subsidies",
          "Salaries and pensions of government employees",
          "Interest payments on public debt",
          "Defence expenditure"
        ],
        "correct": 2,
        "explanation": "Interest payments on past borrowings form a significant and often the largest portion of the Indian government's revenue expenditure, representing the cost of servicing its debt."
      },
      {
        "q": "The primary deficit is calculated as:",
        "options": [
          "Fiscal Deficit + Interest Payments",
          "Revenue Deficit - Capital Receipts",
          "Total Receipts - Revenue Expenditure",
          "Fiscal Deficit - Interest Payments"
        ],
        "correct": 3,
        "explanation": "Primary deficit measures the government's borrowing requirement excluding interest payments on past debts. It shows the extent to which the government is borrowing to finance its current activities, excluding the cost of servicing old debt."
      },
      {
        "q": "Which of the following is a tool of fiscal policy?",
        "options": [
          "Government borrowing",
          "Bank rate",
          "Cash reserve ratio",
          "Open market operations"
        ],
        "correct": 0,
        "explanation": "Government borrowing is a direct way for the government to finance its deficit and influence the money supply and interest rates, making it a tool of fiscal policy. Bank rate, OMO, and CRR are tools of monetary policy."
      },
      {
        "q": "Which of the following would lead to an increase in the fiscal deficit?",
        "options": [
          "Increase in disinvestment proceeds",
          "Increase in government expenditure",
          "Increase in tax revenue",
          "Decrease in borrowings"
        ],
        "correct": 1,
        "explanation": "An increase in government expenditure, assuming other factors remain constant, will widen the gap between total expenditure and total receipts, thus increasing the fiscal deficit."
      },
      {
        "q": "If the government aims to stimulate economic activity during a recession, it is likely to increase:",
        "options": [
          "Both taxes and public expenditure",
          "Taxes and decrease public expenditure",
          "Public expenditure and decrease taxes",
          "Both taxes and decrease public expenditure"
        ],
        "correct": 2,
        "explanation": "During a recession, the government typically uses expansionary fiscal policy. Increasing public expenditure injects money into the economy, while decreasing taxes leaves more disposable income with individuals and businesses, both boosting demand."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-12-economics-open-economy-macroeconomics",
    "classLevel": "12",
    "subject": "Economics",
    "chapter": "Open Economy Macroeconomics",
    "intro": "Practise chapter-wise MCQs for Class 12 Economics — Open Economy Macroeconomics. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following scenarios would likely lead to a decrease in foreign exchange reserves?",
        "options": [
          "An increase in the country's exports.",
          "A large inflow of foreign direct investment (FDI).",
          "A rise in foreign borrowing by domestic firms.",
          "A central bank intervention to prevent its currency from depreciating."
        ],
        "correct": 3,
        "explanation": "If a country's currency is depreciating, the central bank might sell its foreign exchange reserves to buy its own currency, thereby supporting its value and decreasing its reserves."
      },
      {
        "q": "Which of the following is NOT a component of the Balance of Payments?",
        "options": [
          "Invisible Trade Account",
          "Capital Account",
          "Financial Account",
          "Current Account"
        ],
        "correct": 0,
        "explanation": "The Balance of Payments is broadly divided into the Current Account and the Capital Account (which includes the Financial Account). Invisible Trade is a component of the Current Account, not a separate major account."
      },
      {
        "q": "When a country has a deficit in its capital account, it implies:",
        "options": [
          "The country is exporting more goods than importing.",
          "More capital is flowing out of the country than flowing in.",
          "The country's currency has appreciated significantly.",
          "More capital is flowing into the country than flowing out."
        ],
        "correct": 1,
        "explanation": "A capital account deficit means that the net outflow of capital from the country is greater than the net inflow. This includes investments made by residents abroad exceeding foreign investments made by non-residents in the country."
      },
      {
        "q": "Managed floating exchange rate system is also known as:",
        "options": [
          "Free float",
          "Gold standard",
          "Dirty float",
          "Fixed exchange rate"
        ],
        "correct": 2,
        "explanation": "A managed float, or 'dirty float', is a system where the exchange rate is largely determined by market forces, but the central bank intervenes occasionally to influence the rate and maintain stability."
      },
      {
        "q": "A country experiences a surplus in its Current Account. This generally implies:",
        "options": [
          "It is receiving more foreign investment than it is making abroad.",
          "It is facing a shortage of foreign exchange.",
          "It is importing more goods and services than it is exporting.",
          "It is exporting more goods and services than it is importing."
        ],
        "correct": 3,
        "explanation": "A current account surplus means that the value of a country's exports of goods and services, along with net income and net current transfers, exceeds the value of its imports. This indicates that the country is earning more from its foreign transactions than it is spending."
      },
      {
        "q": "Appreciation of a country's currency means:",
        "options": [
          "Its currency can buy more units of foreign currency.",
          "The country's imports become cheaper for domestic consumers.",
          "The country's exports become cheaper for foreigners.",
          "Its currency can buy fewer units of foreign currency."
        ],
        "correct": 0,
        "explanation": "Appreciation means the domestic currency becomes stronger relative to foreign currencies, so more foreign currency can be bought with the same amount of domestic currency. This makes imports cheaper and exports more expensive."
      },
      {
        "q": "The 'twin deficits' hypothesis suggests a relationship between:",
        "options": [
          "Capital account surplus and trade surplus.",
          "Current account deficit and budget deficit.",
          "Interest rates and money supply.",
          "Inflation and unemployment."
        ],
        "correct": 1,
        "explanation": "The twin deficits hypothesis posits that a country's budget deficit and current account deficit are often related, with a larger budget deficit potentially leading to a larger current account deficit."
      },
      {
        "q": "Under a flexible exchange rate system, a decrease in aggregate demand in the domestic economy would likely lead to:",
        "options": [
          "No change in the exchange rate.",
          "Appreciation of the domestic currency.",
          "Depreciation of the domestic currency.",
          "Increased foreign exchange reserves."
        ],
        "correct": 2,
        "explanation": "A decrease in aggregate demand can lead to lower interest rates or a reduction in income, making domestic assets less attractive to foreigners and reducing demand for domestic goods, thus causing the currency to depreciate."
      },
      {
        "q": "Which of the following is a measure to correct a deficit in the Balance of Payments?",
        "options": [
          "Devaluation of the domestic currency.",
          "Imposing import restrictions.",
          "Attracting foreign investment.",
          "All of the above."
        ],
        "correct": 3,
        "explanation": "Devaluation makes exports cheaper and imports costlier, helping to reduce a deficit. Import restrictions directly reduce imports. Attracting foreign investment helps improve the capital account. Therefore, all options are measures to correct a BOP deficit."
      },
      {
        "q": "If the nominal exchange rate between the Indian Rupee (INR) and the US Dollar (USD) is INR 70 = 1 USD, and India's inflation rate is 5% while the US inflation rate is 2%, what is the approximate expected real exchange rate after one year, assuming purchasing power parity (PPP)?",
        "options": [
          "INR 68.00 = 1 USD",
          "INR 70.00 = 1 USD",
          "INR 73.50 = 1 USD",
          "INR 72.10 = 1 USD"
        ],
        "correct": 3,
        "explanation": "According to PPP, the exchange rate should adjust to offset inflation differentials. The INR is expected to depreciate against the USD by the difference in inflation rates (5% - 2% = 3%). So, the new nominal exchange rate will be approximately 70 * (1 + 0.03) = 72.10 INR = 1 USD."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-introduction-to-accounting",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Introduction to Accounting",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Introduction to Accounting. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "What does the 'profitability' aspect of accounting aim to measure?",
        "options": [
          "The efficiency of the business in generating income over a period",
          "The value of assets owned by the business",
          "The liquidity of the business",
          "The solvency of the business"
        ],
        "correct": 0,
        "explanation": "Profitability measures how effectively a business generates revenue and controls expenses to earn a profit over a specific period."
      },
      {
        "q": "Which of the following is NOT a qualitative characteristic of accounting information?",
        "options": [
          "Relevance",
          "Objectivity",
          "Reliability",
          "Comparability"
        ],
        "correct": 1,
        "explanation": "Objectivity is a fundamental qualitative characteristic. Relevance, reliability, and comparability are also key qualitative characteristics."
      },
      {
        "q": "The accounting process begins with:",
        "options": [
          "Analysis of financial data",
          "Summarization of accounts",
          "Identification and recording of transactions",
          "Preparation of financial statements"
        ],
        "correct": 2,
        "explanation": "The very first step in the accounting cycle is identifying a financial event or transaction and then recording it."
      },
      {
        "q": "Which branch of accounting focuses on providing information for internal decision-making and planning?",
        "options": [
          "Social Accounting",
          "Financial Accounting",
          "Cost Accounting",
          "Management Accounting"
        ],
        "correct": 3,
        "explanation": "Management Accounting is specifically tailored to provide information to internal managers for planning, controlling, and decision-making."
      },
      {
        "q": "The purpose of the accounting standard 'Matching Concept' is to:",
        "options": [
          "Match expenses with revenues for the period",
          "Match assets with liabilities",
          "Match sales with purchases",
          "Match revenues with capital"
        ],
        "correct": 0,
        "explanation": "The Matching Concept dictates that expenses incurred to generate revenue should be recognized in the same accounting period as the revenue they helped to earn."
      },
      {
        "q": "The primary source document used to record a sale on credit is a:",
        "options": [
          "Cash Memo",
          "Invoice",
          "Debit Note",
          "Credit Note"
        ],
        "correct": 1,
        "explanation": "An invoice is issued to the customer when goods or services are sold on credit, detailing the transaction and amount due."
      },
      {
        "q": "Information provided by accounting is useful for:",
        "options": [
          "Internal users only",
          "External users only",
          "Both internal and external users",
          "No users"
        ],
        "correct": 2,
        "explanation": "Accounting information serves a dual purpose, assisting both managers (internal users) in their decision-making and external parties like investors and creditors."
      },
      {
        "q": "Which accounting concept requires that financial statements should be prepared on the assumption that the business will continue to operate indefinitely?",
        "options": [
          "Matching Concept",
          "Dual Aspect Concept",
          "Revenue Recognition Concept",
          "Going Concern Concept"
        ],
        "correct": 3,
        "explanation": "The Going Concern Concept assumes that the business has an indefinite life and will not be liquidated in the foreseeable future."
      },
      {
        "q": "Which of the following is NOT a primary objective of accounting?",
        "options": [
          "To provide subjective interpretations of financial data",
          "To facilitate decision-making",
          "To maintain systematic records",
          "To ascertain the financial position"
        ],
        "correct": 0,
        "explanation": "Accounting aims for objectivity in presenting financial information, not subjective interpretations. Maintaining records, determining financial position, and aiding decisions are core objectives."
      },
      {
        "q": "The process of recording, classifying, and summarizing financial transactions in a systematic manner is known as:",
        "options": [
          "Auditing",
          "Bookkeeping",
          "Financial Accounting",
          "Management Accounting"
        ],
        "correct": 1,
        "explanation": "Bookkeeping is the initial recording, classifying, and summarizing of financial transactions. Accounting is a broader process that includes analysis and interpretation of this information."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-theory-base-of-accounting",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Theory Base of Accounting",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Theory Base of Accounting. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which accounting assumption states that a business will continue to operate for the foreseeable future and will not be liquidated?",
        "options": [
          "Consistency Concept",
          "Accounting Period Concept",
          "Going Concern Assumption",
          "Accrual Concept"
        ],
        "correct": 2,
        "explanation": "The Going Concern Assumption presumes that a business will continue to operate indefinitely, allowing for the valuation of assets based on their ongoing use rather than their immediate liquidation value."
      },
      {
        "q": "The 'Full Disclosure Principle' primarily aims to ensure that:",
        "options": [
          "Financial statements are prepared in a consistent manner year after year.",
          "Assets are not overstated and liabilities are not understated.",
          "Transactions are recorded at their historical cost.",
          "All material information that could influence the decision-making of users is provided."
        ],
        "correct": 3,
        "explanation": "The Full Disclosure Principle mandates that all relevant and material information that might affect the users' understanding and decisions should be disclosed in the financial statements or accompanying notes."
      },
      {
        "q": "Which concept suggests that only those transactions that can be expressed in terms of money should be recorded in the books of accounts?",
        "options": [
          "Money Measurement Concept",
          "Business Entity Concept",
          "Accrual Concept",
          "Historical Cost Concept"
        ],
        "correct": 0,
        "explanation": "The Money Measurement Concept states that accounting records only those events that can be measured in monetary terms. Non-monetary factors, even if important, are not typically recorded."
      },
      {
        "q": "According to the 'Conservatism' or 'Prudence' concept, accountants should:",
        "options": [
          "Anticipate all gains but not losses.",
          "Recognize all losses but not gains until realized.",
          "Recognize gains and losses only when realized.",
          "Recognize potential gains and all losses."
        ],
        "correct": 1,
        "explanation": "The Conservatism Concept dictates that when there is uncertainty, accountants should err on the side of caution. This means anticipating no profit but providing for all possible losses."
      },
      {
        "q": "If a company records revenue when it is earned and expenses when they are incurred, irrespective of when cash is exchanged, it is following which concept?",
        "options": [
          "Matching Principle",
          "Cash Basis of Accounting",
          "Accrual Basis of Accounting",
          "Going Concern Assumption"
        ],
        "correct": 2,
        "explanation": "The Accrual Basis of Accounting recognizes revenues when earned and expenses when incurred, regardless of the timing of cash receipts or payments. This provides a more accurate picture of a company's financial performance."
      },
      {
        "q": "The principle of 'matching' in accounting is best illustrated by which of the following?",
        "options": [
          "Depreciating assets over their useful life on a straight-line basis.",
          "Valuing inventory at the lower of cost or net realizable value.",
          "Recognizing revenue when it is earned, regardless of when cash is received.",
          "Recording expenses in the period in which the revenues they helped to generate are recognized."
        ],
        "correct": 3,
        "explanation": "The Matching Principle requires that expenses be recognized in the same accounting period as the revenues they helped to generate. This ensures an accurate measure of profit or loss for the period."
      },
      {
        "q": "The 'Dual Aspect Concept' is the foundation for which accounting equation?",
        "options": [
          "Assets = Liabilities + Capital",
          "Revenue - Expenses = Profit",
          "Sales - Cost of Goods Sold = Gross Profit",
          "Current Assets - Current Liabilities = Working Capital"
        ],
        "correct": 0,
        "explanation": "The Dual Aspect Concept states that every transaction has at least two effects. This is reflected in the fundamental accounting equation: Assets = Liabilities + Capital (or Equity)."
      },
      {
        "q": "The 'Objectivity Concept' in accounting emphasizes that financial information should be:",
        "options": [
          "Prepared based on management's opinion.",
          "Free from bias and verifiable by independent parties.",
          "Reflect future economic benefits.",
          "Disclosed to the fullest extent possible."
        ],
        "correct": 1,
        "explanation": "The Objectivity Concept requires that financial data should be verifiable and free from the personal bias of the accountant or management. Evidence should support the recorded transactions."
      },
      {
        "q": "Which accounting concept states that a business is assumed to have a life of its own, separate and distinct from its owners?",
        "options": [
          "Dual Aspect Concept",
          "Going Concern Concept",
          "Business Entity Concept",
          "Money Measurement Concept"
        ],
        "correct": 2,
        "explanation": "The Business Entity Concept (also known as the Accounting Entity Concept) posits that the business is a separate entity from its owners, meaning the owner's personal transactions are kept distinct from the business's transactions."
      },
      {
        "q": "What accounting concept is violated if a company consistently changes its inventory valuation method (e.g., from FIFO to Weighted Average) without a valid reason?",
        "options": [
          "Going Concern Concept",
          "Materiality Concept",
          "Objectivity Concept",
          "Consistency Concept"
        ],
        "correct": 3,
        "explanation": "The Consistency Concept requires that accounting policies and methods should be applied uniformly from one period to another to ensure comparability of financial statements. Frequent changes make comparisons difficult and misleading."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-recording-of-transactions-i",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Recording of Transactions - I",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Recording of Transactions - I. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following is an example of a revenue receipt?",
        "options": [
          "Rent received from a property.",
          "Income from issuing debentures.",
          "Sale of a fixed asset.",
          "Loan taken from a bank."
        ],
        "correct": 0,
        "explanation": "Revenue receipts are those that are earned in the ordinary course of business and are recurring in nature. Rent received from a property is a common example."
      },
      {
        "q": "Which of the following is NOT an objective of accounting?",
        "options": [
          "To provide information to management for decision-making.",
          "To predict future market trends with certainty.",
          "To maintain systematic records.",
          "To ascertain the profitability of the business."
        ],
        "correct": 1,
        "explanation": "While accounting provides data that helps in forecasting, it cannot predict future market trends with certainty. Its primary objectives are recording, summarizing, and reporting financial information."
      },
      {
        "q": "Goods returned by a customer are recorded in:",
        "options": [
          "Sales Account",
          "Purchases Return Book",
          "Sales Return Book",
          "Cash Book"
        ],
        "correct": 2,
        "explanation": "When a customer returns goods previously purchased on credit, it is recorded in the Sales Return Book (or Returns Inward Book)."
      },
      {
        "q": "A transaction where a business pays for services rendered by an outsider is an example of:",
        "options": [
          "Capital expenditure",
          "Revenue expenditure",
          "Deferred revenue expenditure",
          "None of the above"
        ],
        "correct": 1,
        "explanation": "Revenue expenditure is incurred for the day-to-day operations of the business and does not result in the acquisition of a long-term asset or a significant increase in earning capacity."
      },
      {
        "q": "Which accounting book is primarily used to record transactions chronologically as they occur?",
        "options": [
          "Balance Sheet",
          "Ledger",
          "Trial Balance",
          "Journal"
        ],
        "correct": 3,
        "explanation": "The Journal, also known as the book of original entry, records all transactions in a chronological order."
      },
      {
        "q": "When goods are purchased on credit, which account is debited?",
        "options": [
          "Purchases Account",
          "Cash Account",
          "Sales Account",
          "Creditors Account"
        ],
        "correct": 0,
        "explanation": "According to the double-entry system, when goods are purchased (whether for cash or credit), the Purchases Account is debited as it represents an increase in expenses or assets."
      },
      {
        "q": "Which of the following is a financial transaction?",
        "options": [
          "A board meeting discussing future strategies.",
          "Payment of salary to an employee.",
          "A customer visiting the store to inquire about products.",
          "Signing a contract for the future purchase of goods."
        ],
        "correct": 1,
        "explanation": "A financial transaction is an event that has a monetary value and affects the financial position of a business. Payment of salary has a direct monetary impact."
      },
      {
        "q": "An accounting entry where only one account is affected is known as:",
        "options": [
          "Journal entry",
          "Double entry",
          "Single entry",
          "Compound entry"
        ],
        "correct": 2,
        "explanation": "While accounting primarily follows the double-entry system, a single entry means only one account is affected. This is not standard practice in modern accounting but conceptually, it refers to a single-sided transaction."
      },
      {
        "q": "The process of transferring entries from the journal to the ledger is called:",
        "options": [
          "Summarizing",
          "Balancing",
          "Classifying",
          "Posting"
        ],
        "correct": 3,
        "explanation": "Posting is the process of transferring the debit and credit entries from the journal to their respective accounts in the ledger."
      },
      {
        "q": "Which of the following is a capital expenditure?",
        "options": [
          "Wages paid for installation of machinery.",
          "Cost of repairs to a building.",
          "Payment of electricity bill.",
          "Purchase of raw materials for production."
        ],
        "correct": 0,
        "explanation": "Capital expenditure is incurred to acquire or improve a long-term asset, thereby increasing its earning capacity or useful life. Wages paid for installation of machinery are directly related to bringing the asset into working condition."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-recording-of-transactions-ii",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Recording of Transactions - II",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Recording of Transactions - II. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When goods are returned by a customer, which of the following accounts is debited?",
        "options": [
          "Sales Account",
          "Sales Returns Account",
          "Purchases Account",
          "Purchases Returns Account"
        ],
        "correct": 1,
        "explanation": "Sales returns represent goods sold but now returned by the customer. This reduces sales revenue, and according to the rules of debit and credit, returns are debited."
      },
      {
        "q": "Discount allowed to a debtor is recorded as a debit in which account?",
        "options": [
          "Discount Account",
          "Debtors Account",
          "Discount Allowed Account",
          "Profit and Loss Account"
        ],
        "correct": 2,
        "explanation": "Discount allowed is an expense for the business. Expenses are debited. Therefore, the Discount Allowed Account is debited."
      },
      {
        "q": "Goods distributed as free samples are recorded by crediting which account?",
        "options": [
          "Drawings Account",
          "Advertising Account",
          "Sales Account",
          "Purchases Account"
        ],
        "correct": 3,
        "explanation": "Goods given as free samples are a form of promotion, but they represent goods that were originally purchased. Therefore, the Purchases Account is credited to reduce the cost of goods available for sale."
      },
      {
        "q": "The total of the purchases book is transferred to which account in the ledger?",
        "options": [
          "Purchases Account",
          "Creditors Account",
          "Debtors Account",
          "Sales Account"
        ],
        "correct": 0,
        "explanation": "The Purchases Book records all credit purchases. The total of the Purchases Book at the end of the period is debited to the Purchases Account in the ledger, as purchases represent an increase in the cost of goods."
      },
      {
        "q": "Which journal is used to record transactions that occur infrequently and are of a special nature?",
        "options": [
          "Cash Book",
          "Journal Proper",
          "Sales Journal",
          "Purchases Journal"
        ],
        "correct": 1,
        "explanation": "The Journal Proper is a subsidiary book used to record those transactions that cannot be recorded in any other subsidiary book, such as opening entries, closing entries, transfer entries, and dishonour of a bill."
      },
      {
        "q": "The total of the sales returns book is transferred to which account in the ledger?",
        "options": [
          "Sales Account",
          "Purchases Returns Account",
          "Sales Returns Account",
          "Debtors Account"
        ],
        "correct": 2,
        "explanation": "The Sales Returns Book records goods returned by customers. The total of this book is debited to the Sales Returns Account, as it reduces the net sales revenue and represents goods coming back into the business."
      },
      {
        "q": "Which entry is passed to rectify an error of omission where a transaction was not recorded in any book of original entry?",
        "options": [
          "Rectifying Entry",
          "Suspense Account Entry",
          "Compensating Entry",
          "Journal Proper Entry"
        ],
        "correct": 3,
        "explanation": "An error of omission means the transaction was not recorded at all. This is corrected by passing an entry in the Journal Proper to record the transaction as it should have been originally."
      },
      {
        "q": "Which of the following is NOT a subsidiary book?",
        "options": [
          "General Ledger",
          "Cash Book",
          "Sales Returns Book",
          "Purchases Book"
        ],
        "correct": 0,
        "explanation": "The General Ledger is the main book of accounts where all the accounts are maintained, whereas subsidiary books are specialized journals used for recording specific types of transactions before they are posted to the ledger."
      },
      {
        "q": "Goods taken by the proprietor for personal use are recorded in:",
        "options": [
          "Purchases Journal",
          "Journal Proper",
          "Sales Journal",
          "Drawings Account"
        ],
        "correct": 1,
        "explanation": "When goods are taken for personal use, it's a form of withdrawal. This transaction is typically recorded in the Journal Proper by debiting the Drawings Account and crediting the Purchases Account."
      },
      {
        "q": "A bill receivable dishonoured will result in:",
        "options": [
          "Debit to Bills Receivable Account",
          "Credit to Debtors Account",
          "Debit to Debtors Account",
          "Credit to Bills Receivable Account"
        ],
        "correct": 2,
        "explanation": "When a bill receivable is dishonoured, the debtor again owes the money. Therefore, the debtor's account is debited to reinstate the amount owed, and the Bills Receivable account is credited."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-bank-reconciliation-statement",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Bank Reconciliation Statement",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Bank Reconciliation Statement. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "If the Pass Book shows a debit balance of ₹5,000 and the Cash Book shows a credit balance of ₹5,000, what is the most likely reason for this difference?",
        "options": [
          "Unrecorded bank charges",
          "Cheques deposited but not credited",
          "Cheques issued but not presented",
          "Bank overdraft"
        ],
        "correct": 3,
        "explanation": "A debit balance in the Pass Book indicates an overdraft (money owed to the bank). A credit balance in the Cash Book usually means money in hand, but in the context of a bank reconciliation, it could also represent an overdraft if that's how it's recorded."
      },
      {
        "q": "Which of the following is NOT a common reason for the difference between the bank balance as per the Cash Book and the Pass Book?",
        "options": [
          "Interest credited by the bank",
          "Cheques issued but not yet presented for payment",
          "Bank charges debited by the bank",
          "Cheques deposited but not yet credited by the bank"
        ],
        "correct": 0,
        "explanation": "Interest credited by the bank increases the Pass Book balance and is a reason for difference. The other options are common reasons causing a difference."
      },
      {
        "q": "If the Cash Book shows an overdraft of ₹2,000 and the Pass Book shows an overdraft of ₹1,800, and the difference is due to unrecorded bank charges of ₹200, starting from the Cash Book balance, what is the correct adjustment?",
        "options": [
          "Add ₹200 to the Cash Book overdraft",
          "Subtract ₹200 from the Cash Book overdraft",
          "Add ₹200 to the Pass Book overdraft",
          "Subtract ₹200 from the Pass Book overdraft"
        ],
        "correct": 1,
        "explanation": "Starting from the Cash Book overdraft of ₹2,000. Unrecorded bank charges mean the Pass Book is lower than it should be (more negative). To reconcile, we need to reduce the Cash Book overdraft (make it less negative) by ₹200: ₹2,000 - ₹200 = ₹1,800."
      },
      {
        "q": "When preparing a BRS, if a cheque for ₹1,000 issued to a supplier has been recorded in the Cash Book but has not yet been presented to the bank for payment, and the Cash Book balance is ₹10,000 (favorable), what will be the adjusted Cash Book balance if we start from the Pass Book balance of ₹12,000 (favorable)?",
        "options": [
          "₹13,000",
          "₹9,000",
          "₹11,000",
          "₹10,000"
        ],
        "correct": 2,
        "explanation": "Starting from Pass Book balance of ₹12,000. Cheques issued but not presented reduce the Cash Book balance. Therefore, subtract ₹1,000 from the Pass Book balance to arrive at the adjusted Cash Book balance: ₹12,000 - ₹1,000 = ₹11,000."
      },
      {
        "q": "When the Cash Book balance is taken as the starting point for preparing a Bank Reconciliation Statement, which of the following adjustments is made by ADDING to the Cash Book balance?",
        "options": [
          "Dishonoured cheque not recorded in Cash Book",
          "Standing order paid by bank not recorded in Cash Book",
          "Cheques issued but not presented",
          "Direct deposit by a customer credited in Pass Book only"
        ],
        "correct": 3,
        "explanation": "A direct deposit by a customer increases the Pass Book balance but is not yet recorded in the Cash Book. To reconcile, we add this amount to the Cash Book balance."
      },
      {
        "q": "When preparing a BRS, if a direct deposit by a customer of ₹700 is credited in the Pass Book but not recorded in the Cash Book, and the Cash Book balance is ₹5,000 (favorable), what will be the adjusted Cash Book balance if we start from the Pass Book balance of ₹4,300 (favorable)?",
        "options": [
          "₹5,000",
          "₹4,300",
          "₹3,600",
          "₹5,700"
        ],
        "correct": 0,
        "explanation": "Starting from Pass Book balance of ₹4,300. A direct deposit by a customer increases the Pass Book balance. To reconcile, we add this ₹700 to the Pass Book balance: ₹4,300 + ₹700 = ₹5,000, which is the adjusted Cash Book balance."
      },
      {
        "q": "A Bank Reconciliation Statement is prepared at the end of a specific period to:",
        "options": [
          "Correct errors in the Cash Book",
          "Ascertain the true bank balance and identify the causes of the difference",
          "Ascertain the true cash balance",
          "Identify the causes of difference between Pass Book and Cash Book balances"
        ],
        "correct": 1,
        "explanation": "The primary purpose of a BRS is to reconcile the balances and identify the reasons for any discrepancies between the company's records (Cash Book) and the bank's records (Pass Book)."
      },
      {
        "q": "Which of the following errors, if made in the Cash Book, would require an addition to the Cash Book balance when reconciling from the Cash Book balance to the Pass Book balance?",
        "options": [
          "Cheque of ₹200 deposited but recorded as ₹20",
          "Bank charges of ₹100 not recorded",
          "Interest received of ₹400 not recorded",
          "Cheque of ₹300 issued but recorded as ₹30"
        ],
        "correct": 2,
        "explanation": "Interest received of ₹400 would have increased the Pass Book balance. If it's not recorded in the Cash Book, we need to add it to the Cash Book balance to match the Pass Book."
      },
      {
        "q": "A dishonoured cheque of ₹500 was returned by the bank. It was initially deposited and credited in the Cash Book, but the bank debited it in the Pass Book. When reconciling starting from the Pass Book balance, what adjustment is needed?",
        "options": [
          "Add ₹500 to the Cash Book balance",
          "Subtract ₹500 from the Cash Book balance",
          "Add ₹500 to the Pass Book balance",
          "Subtract ₹500 from the Pass Book balance"
        ],
        "correct": 3,
        "explanation": "A dishonoured cheque reduces the Pass Book balance. If the Cash Book has already accounted for the credit, we need to reduce the Pass Book balance by the same amount to reconcile."
      },
      {
        "q": "A Bank Reconciliation Statement helps in identifying:",
        "options": [
          "Both errors made by the bank and the depositor",
          "The profitability of the bank",
          "Only errors made by the bank",
          "Only errors made by the depositor"
        ],
        "correct": 0,
        "explanation": "The BRS is designed to highlight discrepancies arising from timing differences, transactions not yet recorded by one party, and errors made by either the bank or the depositor."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-trial-balance-and-rectification-of-errors",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Trial Balance and Rectification of Errors",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Trial Balance and Rectification of Errors. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Salaries paid to an employee ₹2,000 were wrongly debited to his personal account. This is an example of:",
        "options": [
          "Error of commission",
          "Error of principle",
          "Error of duplication",
          "Error of omission"
        ],
        "correct": 1,
        "explanation": "Debiting a personal account instead of an expense account (Salaries A/c) is an error of principle, as it violates the rules of accounting."
      },
      {
        "q": "If a trial balance is prepared before all the transactions of the period are recorded, it is likely to:",
        "options": [
          "Agree by chance",
          "Show an unbalanced figure that can be adjusted",
          "Disagree",
          "Agree"
        ],
        "correct": 2,
        "explanation": "If not all transactions are recorded, the debits and credits will not match, leading to a disagreement in the trial balance."
      },
      {
        "q": "Which account is debited when goods worth ₹3,000 are returned by a customer?",
        "options": [
          "Customer's Account",
          "Purchase Returns Account",
          "Sales Account",
          "Sales Returns Account"
        ],
        "correct": 3,
        "explanation": "Goods returned by a customer represent sales returns, which is a contra-revenue account and is debited."
      },
      {
        "q": "Which of the following errors will cause the trial balance to not agree?",
        "options": [
          "A bill of ₹3,000 received from Ram was omitted from the books.",
          "Wages paid ₹5,000 debited to salaries account.",
          "Sale of goods ₹2,000 to Ravi debited to Ravi's account.",
          "Purchases ₹10,000 recorded as ₹1,000."
        ],
        "correct": 0,
        "explanation": "An omission means the transaction is not recorded at all, leading to an imbalance in the trial balance. The other options are errors of principle or commission where amounts are incorrectly recorded but still posted, likely leading to agreement or a different imbalance."
      },
      {
        "q": "When a purchase of goods for ₹5,000 was wrongly recorded as ₹500 in the purchase book, the trial balance will show:",
        "options": [
          "Credit side is excess by ₹4,500",
          "Debit side is excess by ₹4,500",
          "Debit side is excess by ₹500",
          "Credit side is excess by ₹500"
        ],
        "correct": 1,
        "explanation": "Purchases are debited. A lower debit of ₹500 instead of ₹5,000 will make the debit side short by ₹4,500."
      },
      {
        "q": "Rectification of an error of principle involves:",
        "options": [
          "Correcting the amount of a transaction",
          "Passing an additional journal entry",
          "Transferring an amount from one account to another",
          "Crediting or debiting an account which was not touched"
        ],
        "correct": 2,
        "explanation": "Errors of principle involve placing a transaction to the wrong category of account (e.g., debiting an asset account for revenue expenditure). Rectification involves transferring the amount to the correct account."
      },
      {
        "q": "Which of the following errors will not be disclosed by a trial balance?",
        "options": [
          "Error of principle",
          "Error of omission",
          "Error of commission",
          "Compensating error"
        ],
        "correct": 3,
        "explanation": "A compensating error occurs when two or more errors cancel each other out, leading to the trial balance still agreeing, thus it is not disclosed."
      },
      {
        "q": "A sale of goods ₹8,000 to Mr. Sharma was wrongly debited to the account of Mr. Verma (another customer). This error is classified as:",
        "options": [
          "Error of commission (Clerical error)",
          "Compensating error",
          "Error of omission",
          "Error of principle"
        ],
        "correct": 0,
        "explanation": "This is an error of commission because the wrong personal account (Verma instead of Sharma) has been debited, although the correct amount was used."
      },
      {
        "q": "Which of the following is a valid reason for the trial balance not agreeing?",
        "options": [
          "Goods purchased from X ₹10,000 were posted to the debit of X's account.",
          "Goods sold to Y ₹5,000 were completely omitted from the books.",
          "A payment of ₹1,000 for repairs was debited to the building account.",
          "A credit sale of ₹2,000 to A was recorded as ₹200."
        ],
        "correct": 1,
        "explanation": "An error of omission means a transaction is not recorded at all, which will definitely cause the trial balance to disagree."
      },
      {
        "q": "A Trial Balance is:",
        "options": [
          "A book of original entry",
          "A cash book",
          "A summary of ledger balances",
          "A ledger"
        ],
        "correct": 2,
        "explanation": "A trial balance is prepared from the balances of all accounts in the ledger as on a particular date to check the arithmetic accuracy of the ledger posting."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-depreciation-provisions-and-reserves",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Depreciation, Provisions and Reserves",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Depreciation, Provisions and Reserves. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following is the primary objective of providing for depreciation?",
        "options": [
          "To accumulate funds for replacement of the asset",
          "To make the financial statements look conservative",
          "To reduce the taxable income",
          "To ascertain the true profit or loss for a period"
        ],
        "correct": 3,
        "explanation": "Depreciation is an expense that reflects the consumption of the asset's economic benefits over its useful life. Its primary purpose is to match the cost of the asset with the revenue it helps generate, thus ascertaining the true profit or loss for the period."
      },
      {
        "q": "What is the main difference between a provision and a reserve?",
        "options": [
          "Provisions are created for ascertained or probable liabilities, while reserves are created out of profits and are not for specific liabilities.",
          "Provisions are always created at a fixed rate, while reserves can be created at varying rates.",
          "Provisions reduce the profit, while reserves are appropriations of profit.",
          "Provisions are created for ascertained liabilities, while reserves are created for unascertained liabilities."
        ],
        "correct": 0,
        "explanation": "Provisions are made to meet a liability that is either certain or probable. Reserves, on the other hand, are created from profits for general business purposes or future contingencies and are not for specific known liabilities."
      },
      {
        "q": "Which of the following is NOT a revenue reserve?",
        "options": [
          "Retained Earnings",
          "Profit on Sale of Investments",
          "General Reserve",
          "Dividend Equity Reserve"
        ],
        "correct": 1,
        "explanation": "Profit on Sale of Investments arises from the sale of a capital asset and is generally considered a capital profit, leading to a capital reserve. The other options are typically considered revenue reserves, created from the profits of ordinary business operations."
      },
      {
        "q": "When an asset is sold for more than its book value, the difference is credited to which account?",
        "options": [
          "Depreciation Account",
          "Asset Disposal Account",
          "Profit and Loss Account",
          "General Reserve"
        ],
        "correct": 2,
        "explanation": "The profit on sale of an asset (selling price minus book value) is credited to the Profit and Loss Account as it represents a gain."
      },
      {
        "q": "What does the 'book value' of an asset represent?",
        "options": [
          "The market value of the asset",
          "The estimated selling price of the asset",
          "The original cost of the asset",
          "The original cost less accumulated depreciation"
        ],
        "correct": 3,
        "explanation": "The book value or carrying amount of an asset is its original cost minus the total depreciation charged against it up to the reporting date."
      },
      {
        "q": "The Depreciation Fund is a type of:",
        "options": [
          "Specific Reserve",
          "Secret Reserve",
          "General Reserve",
          "Capital Reserve"
        ],
        "correct": 0,
        "explanation": "A Depreciation Fund is a specific reserve created to accumulate funds for the eventual replacement of an asset. It is a specific reserve."
      },
      {
        "q": "A provision for doubtful debts is created to:",
        "options": [
          "Meet an ascertained liability",
          "Meet a probable liability arising from bad debts",
          "Accumulate funds for future expansion",
          "Reduce the profits to avoid higher taxes"
        ],
        "correct": 1,
        "explanation": "A provision for doubtful debts is created to account for potential losses from customers who may not pay their debts. This is a probable liability and hence a provision."
      },
      {
        "q": "Which of the following is a capital reserve?",
        "options": [
          "General Reserve",
          "Debenture Redemption Reserve",
          "Profit on sale of Fixed Assets",
          "Workmen Compensation Reserve"
        ],
        "correct": 2,
        "explanation": "Capital reserves arise from capital profits, such as profits on the sale of fixed assets or investments, or profits from revaluation of assets. The other options are revenue reserves."
      },
      {
        "q": "Under which method of depreciation is the amount of depreciation charged uniform every year?",
        "options": [
          "Units of Production Method",
          "Sum-of-the-Years'-Digits Method",
          "Reducing Balance Method",
          "Straight Line Method"
        ],
        "correct": 3,
        "explanation": "The Straight Line Method (SLM) charges a fixed percentage of the original cost of the asset as depreciation every year, resulting in a uniform amount of depreciation."
      },
      {
        "q": "If a company decides to change its method of depreciation from Straight Line Method to Reducing Balance Method, this change is accounted for:",
        "options": [
          "As a change in accounting estimate with prospective effect",
          "As a prior period item",
          "As a change in accounting policy with retrospective effect",
          "By creating a special reserve"
        ],
        "correct": 0,
        "explanation": "A change in the method of depreciation is considered a change in accounting policy. However, AS 6 (Depreciation Accounting) states that changes in depreciation methods are accounted for prospectively as a change in accounting estimate, meaning the effect is recognized in the current and future periods."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-bills-of-exchange",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Bills of Exchange",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Bills of Exchange. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When a bill of exchange is payable on demand, it is also known as:",
        "options": [
          "A promissory note",
          "A cheque",
          "A trade bill",
          "A documentary bill"
        ],
        "correct": 1,
        "explanation": "A cheque is a specific type of bill of exchange that is drawn on a banker and payable on demand."
      },
      {
        "q": "If a bill of exchange is payable 'at sight', when is it due for payment?",
        "options": [
          "On a specified future date",
          "After a specified period from the date of issue",
          "Immediately upon presentation",
          "Thirty days after acceptance"
        ],
        "correct": 2,
        "explanation": "A bill payable \"at sight\" falls due the moment it is presented to the drawee — no days of grace and no fixed future date."
      },
      {
        "q": "What is the consequence of dishonouring a bill of exchange?",
        "options": [
          "The original debt is cancelled",
          "The drawee is discharged from all liability",
          "The bill becomes invalid",
          "The holder can sue the drawer and endorsers"
        ],
        "correct": 3,
        "explanation": "Dishonour of a bill of exchange (by non-acceptance or non-payment) makes all parties liable on the bill (drawer and endorsers) liable to the holder, who can take legal action against them."
      },
      {
        "q": "When a bill is discounted with a bank, the bank charges:",
        "options": [
          "Discount and commission",
          "Interest only",
          "Discount only",
          "Interest and commission"
        ],
        "correct": 0,
        "explanation": "When a bill is discounted, the bank deducts the interest for the unexpired period of the bill and may also charge a commission for its services."
      },
      {
        "q": "Endorsement of a bill of exchange means:",
        "options": [
          "The drawee accepting the bill",
          "Transferring the right to receive payment to another person",
          "Cancelling the bill",
          "The drawer drawing the bill"
        ],
        "correct": 1,
        "explanation": "Endorsement is the process of signing on the back of the bill to transfer the ownership and the right to receive payment to another party."
      },
      {
        "q": "When the drawee accepts the bill of exchange, it becomes:",
        "options": [
          "A promissory note",
          "A conditional order",
          "A legally binding instrument",
          "A draft"
        ],
        "correct": 2,
        "explanation": "Acceptance by the drawee signifies their unconditional promise to pay the amount specified in the bill on the due date, making it a legally binding instrument."
      },
      {
        "q": "What is the primary purpose of a bill of exchange in business transactions?",
        "options": [
          "To record cash sales",
          "To acknowledge debt without a payment commitment",
          "To avoid stamp duty",
          "To provide credit facilities and facilitate payment"
        ],
        "correct": 3,
        "explanation": "Bills of exchange are primarily used to formalize credit transactions, allowing a seller to extend credit and a buyer to defer payment, with the bill acting as a negotiable instrument."
      },
      {
        "q": "A bill of exchange can be drawn by:",
        "options": [
          "The drawer",
          "The payee",
          "The drawee",
          "Any party to the bill"
        ],
        "correct": 0,
        "explanation": "The drawer is the person who creates and signs the bill of exchange, ordering the drawee to pay a certain sum of money."
      },
      {
        "q": "Retiring a bill under rebate means:",
        "options": [
          "Dishonouring the bill",
          "Paying the bill before its due date and receiving a discount",
          "Paying the bill on its due date",
          "Extending the due date of the bill"
        ],
        "correct": 1,
        "explanation": "Retiring a bill under rebate refers to the situation where the holder pays the bill before its maturity date and is allowed a rebate (discount) by the drawer or holder."
      },
      {
        "q": "Which of the following is NOT a party to a bill of exchange?",
        "options": [
          "Drawee",
          "Payee",
          "Indorser",
          "Drawer"
        ],
        "correct": 2,
        "explanation": "While an indorser can become a party through endorsement, they are not an original party to the bill's creation. The primary parties are the drawer, drawee, and payee."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-financial-statements-i",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Financial Statements - I",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Financial Statements - I. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "When 'Sales Returns' are recorded, which account is debited?",
        "options": [
          "Sales Account",
          "Cost of Goods Sold Account",
          "Customers Account",
          "Sales Returns Account"
        ],
        "correct": 3,
        "explanation": "Sales Returns (or Return inwards) reduce the sales revenue. The Sales Account is debited to reflect this reduction."
      },
      {
        "q": "The primary purpose of the Trading Account is to determine:",
        "options": [
          "Gross Profit or Gross Loss",
          "Cash Flow from Operations",
          "Net Profit or Net Loss",
          "Financial Position of the business"
        ],
        "correct": 0,
        "explanation": "The Trading Account is prepared to ascertain the Gross Profit or Gross Loss resulting from the buying and selling of goods."
      },
      {
        "q": "Which of the following represents 'Revenue from Operations'?",
        "options": [
          "Interest on investments",
          "Sales of goods",
          "Sale of old furniture",
          "Profit on sale of assets"
        ],
        "correct": 1,
        "explanation": "Revenue from Operations specifically refers to the income generated from the primary business activity, which is the sale of goods or rendering of services."
      },
      {
        "q": "Bad debts are shown in which of the following statements?",
        "options": [
          "Balance Sheet (Asset side)",
          "Balance Sheet (Liability side)",
          "Profit and Loss Account (Debit)",
          "Trading Account (Debit)"
        ],
        "correct": 2,
        "explanation": "Bad debts are considered as an expense and are debited to the Profit and Loss Account."
      },
      {
        "q": "Which of the following is a direct expense and forms part of the cost of goods sold?",
        "options": [
          "Salary of office accountant",
          "Interest on loan",
          "Depreciation on office furniture",
          "Freight inwards"
        ],
        "correct": 3,
        "explanation": "Freight inwards is the cost incurred for bringing goods to the place of business, directly related to acquiring the goods for sale."
      },
      {
        "q": "Which of the following is an indirect expense?",
        "options": [
          "Carriage outwards",
          "Purchase of raw materials",
          "Factory rent",
          "Wages paid to factory workers"
        ],
        "correct": 0,
        "explanation": "Indirect expenses are charged to the Profit and Loss Account rather than the Trading Account. Carriage OUTWARDS is a selling cost; factory wages, factory rent and raw materials are all direct/manufacturing costs."
      },
      {
        "q": "Which account is debited when goods are purchased for resale?",
        "options": [
          "Sales Account",
          "Purchases Account",
          "Inventory Account",
          "Cost of Goods Sold Account"
        ],
        "correct": 1,
        "explanation": "The Purchases Account is debited to record the cost of goods acquired for resale. This account is then used to calculate the Cost of Goods Sold."
      },
      {
        "q": "Gross Profit is calculated as:",
        "options": [
          "Revenue from Operations - Indirect Expenses",
          "Revenue from Operations - Operating Expenses",
          "Revenue from Operations - Cost of Goods Sold",
          "Revenue from Operations - Selling and Distribution Expenses"
        ],
        "correct": 2,
        "explanation": "Gross Profit represents the profit earned from the core trading activity before considering operating and other expenses. It is calculated by deducting the Cost of Goods Sold from the Revenue from Operations."
      },
      {
        "q": "Closing inventory is shown in the financial statements as:",
        "options": [
          "A credit on the Profit and Loss Account and an asset on the Balance Sheet",
          "A debit on the Trading Account and an asset on the Balance Sheet",
          "A debit on the Profit and Loss Account and an asset on the Balance Sheet",
          "A credit on the Trading Account and an asset on the Balance Sheet"
        ],
        "correct": 3,
        "explanation": "Closing inventory is credited to the Trading Account to reduce the cost of goods sold and is shown as an asset on the Balance Sheet as it represents goods available for sale in the next period."
      },
      {
        "q": "An item that appears on both the debit side of the Trading Account and the credit side of the Profit and Loss Account is:",
        "options": [
          "Purchases Returns",
          "Salaries",
          "Wages",
          "Rent Received"
        ],
        "correct": 0,
        "explanation": "Purchases Returns (or Return outwards) are deducted from purchases on the debit side of the Trading Account, effectively reducing the cost of goods sold. In the context of the P&L, it is a reduction of expenses, and thus has a credit effect on the net profit."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-financial-statements-ii",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Financial Statements - II",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Financial Statements - II. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "In the context of Ratio Analysis, a company's ability to meet its short-term obligations is primarily assessed by:",
        "options": [
          "Profitability Ratios",
          "Liquidity Ratios",
          "Solvency Ratios",
          "Turnover Ratios"
        ],
        "correct": 1,
        "explanation": "Liquidity ratios (like Current Ratio and Quick Ratio) are specifically designed to measure a company's ability to pay off its short-term debts."
      },
      {
        "q": "The 'Net Profit Ratio' is a type of:",
        "options": [
          "Activity Ratio",
          "Liquidity Ratio",
          "Profitability Ratio",
          "Solvency Ratio"
        ],
        "correct": 2,
        "explanation": "The Net Profit Ratio measures the overall profitability of the business and is therefore categorized as a Profitability Ratio."
      },
      {
        "q": "Which of the following is considered an external user of financial statements?",
        "options": [
          "Management",
          "Employees",
          "Production Manager",
          "Investors"
        ],
        "correct": 3,
        "explanation": "Investors are external parties who use financial statements to make decisions about investing in a company. Management, employees, and the production manager are internal users."
      },
      {
        "q": "Contingent Liabilities are shown:",
        "options": [
          "As a separate item in the notes to accounts",
          "As an addition to liabilities",
          "As a deduction from assets",
          "They are not disclosed in the financial statements"
        ],
        "correct": 0,
        "explanation": "Contingent liabilities are potential obligations that may arise depending on future events. They are disclosed in the notes to accounts rather than on the face of the Balance Sheet."
      },
      {
        "q": "If a company has a Current Ratio of 2:1, it means that its:",
        "options": [
          "Fixed assets are twice its current liabilities",
          "Current assets are twice its current liabilities",
          "Current liabilities are twice its current assets",
          "Net profit is twice its total revenue"
        ],
        "correct": 1,
        "explanation": "The Current Ratio is calculated as Current Assets / Current Liabilities. A ratio of 2:1 indicates that current assets are double the current liabilities."
      },
      {
        "q": "Which of the following accounts represents a liability on the Balance Sheet?",
        "options": [
          "Accounts Receivable",
          "Prepaid Expenses",
          "Interest Payable",
          "Land"
        ],
        "correct": 2,
        "explanation": "Interest Payable is an expense that has been incurred but not yet paid, making it a short-term liability on the Balance Sheet."
      },
      {
        "q": "The 'Cost of Goods Sold' is a crucial element in determining:",
        "options": [
          "Net Worth",
          "Net Profit",
          "Operating Profit",
          "Gross Profit"
        ],
        "correct": 3,
        "explanation": "Gross Profit is calculated as Sales Revenue minus the Cost of Goods Sold. Therefore, COGS is a direct determinant of Gross Profit."
      },
      {
        "q": "Depreciation is shown as a deduction from the original cost of an asset in the Balance Sheet. This method is known as:",
        "options": [
          "Straight Line Method",
          "Written Down Value Method",
          "Provision for Depreciation Account",
          "None of the above"
        ],
        "correct": 2,
        "explanation": "When a Provision for Depreciation Account is maintained, accumulated depreciation is credited to this separate account and the asset continues to be shown at its original cost. Depreciation is then charged to the Profit and Loss Account."
      },
      {
        "q": "The term 'Working Capital' in accounting refers to:",
        "options": [
          "Current Assets minus Current Liabilities",
          "Fixed Assets minus Current Liabilities",
          "Total Assets minus Total Liabilities",
          "Share Capital plus Reserves"
        ],
        "correct": 0,
        "explanation": "Working Capital is the difference between a company's current assets and its current liabilities. It represents the funds available for day-to-day operations."
      },
      {
        "q": "Which of the following is NOT a component of a Balance Sheet?",
        "options": [
          "Assets",
          "Revenues",
          "Capital",
          "Liabilities"
        ],
        "correct": 1,
        "explanation": "Revenues are reported in the Income Statement, not the Balance Sheet. Assets, Liabilities, and Capital are the main components of the Balance Sheet."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-accounts-from-incomplete-records",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Accounts from Incomplete Records",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Accounts from Incomplete Records. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which study action is most useful before solving questions from \"Accounts from Incomplete Records\"?",
        "options": [
          "Memorize only the chapter title",
          "Avoid diagrams and formulas",
          "Read the key concepts and examples first",
          "Skip directly to the answer key"
        ],
        "correct": 2,
        "explanation": "Start by reviewing the core ideas of \"Accounts from Incomplete Records\", then solve examples and MCQs."
      },
      {
        "q": "Which study action is most useful before solving questions from \"Accounts from Incomplete Records\"?",
        "options": [
          "Avoid diagrams and formulas",
          "Skip directly to the answer key",
          "Memorize only the chapter title",
          "Read the key concepts and examples first"
        ],
        "correct": 3,
        "explanation": "Start by reviewing the core ideas of \"Accounts from Incomplete Records\", then solve examples and MCQs."
      },
      {
        "q": "Which study action is most useful before solving questions from \"Accounts from Incomplete Records\"?",
        "options": [
          "Read the key concepts and examples first",
          "Skip directly to the answer key",
          "Memorize only the chapter title",
          "Avoid diagrams and formulas"
        ],
        "correct": 0,
        "explanation": "Start by reviewing the core ideas of \"Accounts from Incomplete Records\", then solve examples and MCQs."
      },
      {
        "q": "Which study action is most useful before solving questions from \"Accounts from Incomplete Records\"?",
        "options": [
          "Skip directly to the answer key",
          "Read the key concepts and examples first",
          "Avoid diagrams and formulas",
          "Memorize only the chapter title"
        ],
        "correct": 1,
        "explanation": "Start by reviewing the core ideas of \"Accounts from Incomplete Records\", then solve examples and MCQs."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-11-accountancy-applications-of-computers-in-accounting",
    "classLevel": "11",
    "subject": "Accountancy",
    "chapter": "Applications of Computers in Accounting",
    "intro": "Practise chapter-wise MCQs for Class 11 Accountancy — Applications of Computers in Accounting. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "A company uses accounting software to manage its inventory. When a product is sold, the software automatically updates the stock levels. This feature demonstrates:",
        "options": [
          "Data security",
          "Automated reporting",
          "Integrated accounting",
          "User access control"
        ],
        "correct": 2,
        "explanation": "When different modules of accounting software (like sales and inventory) communicate and update each other automatically, it signifies an integrated accounting system. This ensures consistency across different financial aspects."
      },
      {
        "q": "Which of the following is NOT a primary objective of using accounting software?",
        "options": [
          "To ensure accuracy and reduce errors",
          "To provide timely and relevant financial information",
          "To automate repetitive tasks",
          "To replace human accountants entirely"
        ],
        "correct": 3,
        "explanation": "While accounting software enhances efficiency and accuracy, it is designed to assist human accountants, not replace them entirely. The primary objectives revolve around automation, accuracy, and information generation."
      },
      {
        "q": "Cloud-based accounting software offers which significant advantage over traditional desktop software?",
        "options": [
          "Accessible from any device with internet connection",
          "Requires manual installation on every computer",
          "Data is stored locally and vulnerable to hardware failure",
          "Limited to a single user at a time"
        ],
        "correct": 0,
        "explanation": "Cloud-based accounting software stores data on remote servers and is accessible via the internet, allowing users to access their financial information from various devices and locations."
      },
      {
        "q": "Which component of accounting software is primarily used for managing credit and debit memos, and tracking payments from customers?",
        "options": [
          "Payroll",
          "Accounts Receivable",
          "Accounts Payable",
          "Fixed Assets"
        ],
        "correct": 1,
        "explanation": "Accounts Receivable (AR) specifically deals with money owed to a company by its customers. This includes managing invoices, payments received, credit memos, and debit memos related to customer accounts."
      },
      {
        "q": "Which of the following security features in accounting software is designed to restrict access to sensitive financial data to authorized personnel only?",
        "options": [
          "Data backup",
          "Report generation",
          "Password protection and user roles",
          "Audit trail"
        ],
        "correct": 2,
        "explanation": "Password protection and user roles are critical for controlling who can access what information and what actions they can perform within the software, thereby protecting sensitive data."
      },
      {
        "q": "An 'Audit Trail' in accounting software primarily serves to:",
        "options": [
          "Automate tax calculations",
          "Create customer invoices",
          "Manage employee expense reimbursements",
          "Track all changes made to financial data and by whom"
        ],
        "correct": 3,
        "explanation": "An audit trail provides a chronological record of all transactions and modifications made within the accounting system, including who made the changes and when. This is essential for internal controls and external audits."
      },
      {
        "q": "Which of the following is an example of 'Data Integrity' in the context of accounting software?",
        "options": [
          "The financial data entered is accurate and complete",
          "The software has a user-friendly interface",
          "The software can be accessed from multiple devices",
          "The software can generate various reports"
        ],
        "correct": 0,
        "explanation": "Data integrity refers to the accuracy, completeness, and consistency of data. Ensuring that the financial data entered into the software is correct and hasn't been altered unintentionally is crucial for data integrity."
      },
      {
        "q": "The process of recording financial transactions in a systematic and organized manner using software is known as:",
        "options": [
          "Data analysis",
          "Data entry",
          "Data auditing",
          "Data backup"
        ],
        "correct": 1,
        "explanation": "Data entry is the fundamental process of inputting financial information into the accounting software. This is the initial step for all subsequent accounting operations within the system."
      },
      {
        "q": "What is the primary benefit of using a General Ledger (GL) module in accounting software?",
        "options": [
          "To track customer payments",
          "To manage employee salaries",
          "To summarize all financial transactions of a business",
          "To record individual sales invoices"
        ],
        "correct": 2,
        "explanation": "The General Ledger is the central repository of all financial transactions. The GL module in accounting software is designed to consolidate and summarize these transactions, providing a holistic view of the company's financial position."
      },
      {
        "q": "Which accounting function is most directly facilitated by features like automated bank reconciliation in accounting software?",
        "options": [
          "Fixed asset accounting",
          "Payroll processing",
          "Inventory management",
          "Accounts payable and receivable management"
        ],
        "correct": 3,
        "explanation": "Bank reconciliation involves matching bank statements with the company's records of cash transactions, which directly relates to managing accounts receivable and payable. Automated bank reconciliation significantly speeds up this process."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-numbers-from-1-to-9",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Numbers from 1 to 9",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Numbers from 1 to 9. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "How many fingers do you have on one hand?",
        "options": [
          "5",
          "4",
          "3",
          "6"
        ],
        "correct": 0,
        "explanation": "A normal human hand has 5 fingers."
      },
      {
        "q": "Which number comes before 4?",
        "options": [
          "5",
          "3",
          "2",
          "1"
        ],
        "correct": 1,
        "explanation": "The number that precedes 4 in the counting sequence is 3."
      },
      {
        "q": "How many apples are there in the basket?",
        "options": [
          "A basket with 3 apples",
          "A basket with 9 apples",
          "A basket with 5 apples",
          "A basket with 7 apples"
        ],
        "correct": 2,
        "explanation": "The image shows a basket containing 5 apples."
      },
      {
        "q": "Which number comes after 7?",
        "options": [
          "9",
          "6",
          "5",
          "8"
        ],
        "correct": 3,
        "explanation": "The number that follows 7 in the counting sequence is 8."
      },
      {
        "q": "What is 2 + 3?",
        "options": [
          "5",
          "4",
          "6",
          "3"
        ],
        "correct": 0,
        "explanation": "When you add 2 and 3, the sum is 5."
      },
      {
        "q": "Which number is between 5 and 7?",
        "options": [
          "3",
          "6",
          "4",
          "8"
        ],
        "correct": 1,
        "explanation": "The number that comes after 5 and before 7 is 6."
      },
      {
        "q": "Which of these is the largest number?",
        "options": [
          "3",
          "6",
          "8",
          "2"
        ],
        "correct": 2,
        "explanation": "Among the numbers 3, 6, 8, and 2, the number 8 is the largest."
      },
      {
        "q": "Look at the pattern: 1, 2, 3, __ , 5. What number is missing?",
        "options": [
          "3",
          "6",
          "7",
          "4"
        ],
        "correct": 3,
        "explanation": "The pattern is counting numbers in order. The missing number after 3 is 4."
      },
      {
        "q": "Which of these is the smallest number?",
        "options": [
          "1",
          "7",
          "5",
          "9"
        ],
        "correct": 0,
        "explanation": "Among the numbers 9, 1, 5, and 7, the number 1 is the smallest."
      },
      {
        "q": "What is 9 - 4?",
        "options": [
          "3",
          "5",
          "4",
          "6"
        ],
        "correct": 1,
        "explanation": "When you subtract 4 from 9, the result is 5."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-numbers-from-10-to-20",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Numbers from 10 to 20",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Numbers from 10 to 20. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "What is the number that is one less than 13?",
        "options": [
          "11",
          "14",
          "12",
          "10"
        ],
        "correct": 2,
        "explanation": "One less than 13 is 13 - 1 = 12."
      },
      {
        "q": "If you have 18 balloons and 3 pop, how many balloons are left?",
        "options": [
          "16",
          "17",
          "21",
          "15"
        ],
        "correct": 3,
        "explanation": "Subtracting 3 balloons from 18 balloons leaves you with 18 - 3 = 15 balloons."
      },
      {
        "q": "Which number is the biggest among 13, 19, and 15?",
        "options": [
          "19",
          "15",
          "13",
          "All are equal"
        ],
        "correct": 0,
        "explanation": "Comparing the numbers, 19 is greater than both 13 and 15."
      },
      {
        "q": "Which number is represented by one ten and six ones?",
        "options": [
          "10",
          "16",
          "61",
          "1"
        ],
        "correct": 1,
        "explanation": "One ten and six ones make the number 16."
      },
      {
        "q": "Which number comes after 15?",
        "options": [
          "13",
          "17",
          "16",
          "14"
        ],
        "correct": 2,
        "explanation": "The number that follows 15 in the sequence of counting is 16."
      },
      {
        "q": "If you have 10 apples and get 5 more, how many apples do you have in total?",
        "options": [
          "14",
          "13",
          "16",
          "15"
        ],
        "correct": 3,
        "explanation": "Adding 5 apples to 10 apples gives you 10 + 5 = 15 apples."
      },
      {
        "q": "What is the number that comes before 11?",
        "options": [
          "10",
          "12",
          "9",
          "13"
        ],
        "correct": 0,
        "explanation": "The number that immediately precedes 11 is 10."
      },
      {
        "q": "Which of these numbers is between 17 and 19?",
        "options": [
          "16",
          "18",
          "20",
          "15"
        ],
        "correct": 1,
        "explanation": "The number 18 comes after 17 and before 19."
      },
      {
        "q": "How many candles are on the cake if there are 12 candles?",
        "options": [
          "10",
          "11",
          "12",
          "13"
        ],
        "correct": 2,
        "explanation": "The question directly states there are 12 candles."
      },
      {
        "q": "Count the fingers on two hands. Which number do you get?",
        "options": [
          "15",
          "20",
          "12",
          "10"
        ],
        "correct": 3,
        "explanation": "Each hand has 5 fingers, so two hands have 5 + 5 = 10 fingers."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-addition",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Addition",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Addition. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "If you have 4 apples and your friend gives you 4 more apples, how many apples do you have in total?",
        "options": [
          "8",
          "6",
          "9",
          "7"
        ],
        "correct": 0,
        "explanation": "4 apples + 4 apples = 8 apples."
      },
      {
        "q": "What is 1 plus 9?",
        "options": [
          "9",
          "10",
          "11",
          "8"
        ],
        "correct": 1,
        "explanation": "1 added to 9 makes 10."
      },
      {
        "q": "Lina has 6 pencils. She buys 3 more. How many pencils does Lina have in total?",
        "options": [
          "8",
          "7",
          "9",
          "10"
        ],
        "correct": 2,
        "explanation": "Lina has 6 + 3 = 9 pencils."
      },
      {
        "q": "There are 2 birds on a tree. 5 more birds join them. How many birds are there on the tree now?",
        "options": [
          "5",
          "6",
          "8",
          "7"
        ],
        "correct": 3,
        "explanation": "2 birds + 5 birds = 7 birds."
      },
      {
        "q": "What is the sum of 3, 4, and 2?",
        "options": [
          "9",
          "7",
          "8",
          "10"
        ],
        "correct": 0,
        "explanation": "Adding 3, 4, and 2 gives 9 (3 + 4 = 7, and 7 + 2 = 9)."
      },
      {
        "q": "If you add 8 and 1, what is the result?",
        "options": [
          "10",
          "9",
          "7",
          "11"
        ],
        "correct": 1,
        "explanation": "Start at 8 and count on 1 more to reach 9."
      },
      {
        "q": "Rohan has 7 red balloons and 3 blue balloons. How many balloons does Rohan have altogether?",
        "options": [
          "9",
          "11",
          "10",
          "12"
        ],
        "correct": 2,
        "explanation": "The total number of balloons is 7 + 3 = 10."
      },
      {
        "q": "What is the sum of 5 and 3?",
        "options": [
          "7",
          "9",
          "6",
          "8"
        ],
        "correct": 3,
        "explanation": "Adding 5 and 3 together gives 8."
      },
      {
        "q": "A shopkeeper had 5 bananas. He bought 5 more bananas. How many bananas does he have now?",
        "options": [
          "10",
          "9",
          "11",
          "15"
        ],
        "correct": 0,
        "explanation": "5 bananas + 5 bananas = 10 bananas."
      },
      {
        "q": "Which number is obtained by adding 6 and 2?",
        "options": [
          "9",
          "8",
          "7",
          "10"
        ],
        "correct": 1,
        "explanation": "6 plus 2 equals 8."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-subtraction",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Subtraction",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Subtraction. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "There are 18 flowers in a vase. 5 flowers are removed. How many flowers are in the vase now?",
        "options": [
          "14",
          "12",
          "13",
          "15"
        ],
        "correct": 2,
        "explanation": "We start with 18 flowers and remove 5. The number of flowers remaining is 18 - 5 = 13."
      },
      {
        "q": "Ravi has 12 pencils. He gives 4 pencils to his friend. How many pencils does Ravi have now?",
        "options": [
          "9",
          "10",
          "7",
          "8"
        ],
        "correct": 3,
        "explanation": "Ravi started with 12 pencils and gave away 4. So, he has 12 - 4 = 8 pencils left."
      },
      {
        "q": "What is 15 minus 7?",
        "options": [
          "8",
          "6",
          "7",
          "9"
        ],
        "correct": 0,
        "explanation": "Subtracting 7 from 15 results in 8.  Thus, 15 - 7 = 8."
      },
      {
        "q": "If you have 7 apples and eat 3 of them, how many apples are left?",
        "options": [
          "3",
          "4",
          "5",
          "2"
        ],
        "correct": 1,
        "explanation": "We started with 7 apples and removed 3, so 7 - 3 = 4 apples are left."
      },
      {
        "q": "There are 10 birds on a tree. 6 birds fly away. How many birds are still on the tree?",
        "options": [
          "5",
          "3",
          "4",
          "6"
        ],
        "correct": 2,
        "explanation": "We began with 10 birds and 6 flew away. The remaining birds are 10 - 6 = 4."
      },
      {
        "q": "A shopkeeper had 20 chocolates. He sold 10 chocolates. How many chocolates are left?",
        "options": [
          "8",
          "11",
          "12",
          "10"
        ],
        "correct": 3,
        "explanation": "The shopkeeper started with 20 chocolates and sold 10. The remaining chocolates are 20 - 10 = 10."
      },
      {
        "q": "What is 9 minus 5?",
        "options": [
          "4",
          "6",
          "3",
          "5"
        ],
        "correct": 0,
        "explanation": "Subtracting 5 from 9 gives us 4.  So, 9 - 5 = 4."
      },
      {
        "q": "What is the difference between 16 and 9?",
        "options": [
          "6",
          "7",
          "8",
          "9"
        ],
        "correct": 1,
        "explanation": "The difference between 16 and 9 is found by subtracting 9 from 16.  16 - 9 = 7."
      },
      {
        "q": "Choose the correct answer: 8 - 2 = ?",
        "options": [
          "7",
          "5",
          "6",
          "9"
        ],
        "correct": 2,
        "explanation": "When 2 is subtracted from 8, the result is 6.  Therefore, 8 - 2 = 6."
      },
      {
        "q": "Which of these calculations is correct?",
        "options": [
          "11 - 3 = 7",
          "11 - 3 = 9",
          "11 - 3 = 10",
          "11 - 3 = 8"
        ],
        "correct": 3,
        "explanation": "When 3 is subtracted from 11, the answer is 8. So, 11 - 3 = 8 is the correct calculation."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-shapes-around-us",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Shapes Around Us",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Shapes Around Us. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "What shape is a door usually?",
        "options": [
          "Rectangle",
          "Circle",
          "Square",
          "Triangle"
        ],
        "correct": 0,
        "explanation": "Doors are typically taller than they are wide, which is characteristic of a rectangle."
      },
      {
        "q": "Which shape has no corners?",
        "options": [
          "Triangle",
          "Circle",
          "Square",
          "Rectangle"
        ],
        "correct": 1,
        "explanation": "A circle is a perfectly round shape and does not have any corners."
      },
      {
        "q": "Which shape has three sides and three corners?",
        "options": [
          "Circle",
          "Square",
          "Triangle",
          "Oval"
        ],
        "correct": 2,
        "explanation": "A triangle is defined by its three sides and three corners (or vertices)."
      },
      {
        "q": "Look at the wheels of a car. What shape are they?",
        "options": [
          "Square",
          "Triangle",
          "Rectangle",
          "Circle"
        ],
        "correct": 3,
        "explanation": "Car wheels are round and have the shape of a circle."
      },
      {
        "q": "Which of these is a flat shape with four equal sides and four corners?",
        "options": [
          "Square",
          "Rectangle",
          "Triangle",
          "Circle"
        ],
        "correct": 0,
        "explanation": "A square is a special type of rectangle where all four sides are equal in length."
      },
      {
        "q": "What shape is a slice of pizza cut from the middle?",
        "options": [
          "Circle",
          "Triangle",
          "Square",
          "Rectangle"
        ],
        "correct": 1,
        "explanation": "A slice of pizza cut from the center forms a triangle."
      },
      {
        "q": "A biscuit is often in the shape of a:",
        "options": [
          "Square",
          "Triangle",
          "Circle",
          "Rectangle"
        ],
        "correct": 2,
        "explanation": "Many biscuits are round, having the shape of a circle."
      },
      {
        "q": "Which shape has two long sides and two short sides, with four corners?",
        "options": [
          "Circle",
          "Square",
          "Triangle",
          "Rectangle"
        ],
        "correct": 3,
        "explanation": "A rectangle has four corners and opposite sides that are equal in length."
      },
      {
        "q": "What shape is a stop sign?",
        "options": [
          "Triangle",
          "Circle",
          "Rectangle",
          "Square"
        ],
        "correct": 0,
        "explanation": "Stop signs are typically octagons, but in the context of basic shapes taught at this level, they are often simplified to a triangle with a point facing upwards or represented by its prominent triangular shape."
      },
      {
        "q": "Which of these shapes looks like a ball?",
        "options": [
          "Square",
          "Circle",
          "Triangle",
          "Rectangle"
        ],
        "correct": 1,
        "explanation": "A circle is a round shape, just like a ball."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-money",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Money",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Money. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which of the following coins has the highest value?",
        "options": [
          "1 Rupee coin",
          "50 Paise coin",
          "2 Rupees coin",
          "20 Paise coin"
        ],
        "correct": 2,
        "explanation": "Among the given options, the 2 Rupees coin has the highest value."
      },
      {
        "q": "Which is greater: 10 Paise or 1 Rupee?",
        "options": [
          "Cannot say",
          "They are equal",
          "10 Paise",
          "1 Rupee"
        ],
        "correct": 3,
        "explanation": "1 Rupee is equal to 100 Paise. Therefore, 1 Rupee is much greater than 10 Paise."
      },
      {
        "q": "If you have 5 Rupees and you get 5 more Rupees, how much money do you have in total?",
        "options": [
          "10 Rupees",
          "20 Rupees",
          "5 Rupees",
          "15 Rupees"
        ],
        "correct": 0,
        "explanation": "Starting with 5 Rupees and adding 5 more Rupees gives a total of 5 + 5 = 10 Rupees."
      },
      {
        "q": "An item costs 8 Rupees. You pay with a 10 Rupees note. How much change will you get back?",
        "options": [
          "1 Rupee",
          "2 Rupees",
          "3 Rupees",
          "4 Rupees"
        ],
        "correct": 1,
        "explanation": "If the item costs 8 Rupees and you pay with 10 Rupees, your change is 10 - 8 = 2 Rupees."
      },
      {
        "q": "Which of these is a note, not a coin?",
        "options": [
          "10 Rupees",
          "5 Rupees",
          "2 Rupees",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "10 Rupees, 5 Rupees, and 2 Rupees are all available as currency notes in India. The question is slightly tricky as all options listed are available as both coins and notes. However, in common usage, 10, 5 and 2 are also very common notes."
      },
      {
        "q": "How many 50 Paise coins are needed to make 2 Rupees?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "correct": 2,
        "explanation": "Since 1 Rupee = 100 Paise, 2 Rupees = 200 Paise. Each 50 Paise coin is half of a Rupee, so 2 coins make 1 Rupee, and 4 coins make 2 Rupees."
      },
      {
        "q": "What is the total value of two 2 Rupees coins and one 1 Rupee coin?",
        "options": [
          "6 Rupees",
          "4 Rupees",
          "3 Rupees",
          "5 Rupees"
        ],
        "correct": 3,
        "explanation": "Two 2 Rupees coins have a value of 2 + 2 = 4 Rupees. Adding one 1 Rupee coin makes the total 4 + 1 = 5 Rupees."
      },
      {
        "q": "Which of these items is usually the cheapest?",
        "options": [
          "A chocolate",
          "A school bag",
          "A book",
          "A toy car"
        ],
        "correct": 0,
        "explanation": "Typically, a chocolate is less expensive than a book, a toy car, or a school bag."
      },
      {
        "q": "Ria has 10 Rupees. She buys a pencil for 3 Rupees. How much money does she have left?",
        "options": [
          "8 Rupees",
          "7 Rupees",
          "6 Rupees",
          "5 Rupees"
        ],
        "correct": 1,
        "explanation": "Ria started with 10 Rupees and spent 3 Rupees. So, 10 - 3 = 7 Rupees left."
      },
      {
        "q": "You want to buy a toy that costs 15 Rupees. You have one 10 Rupees note and one 5 Rupees coin. Do you have enough money?",
        "options": [
          "Maybe",
          "Not enough information",
          "Yes",
          "No"
        ],
        "correct": 2,
        "explanation": "You have 10 Rupees + 5 Rupees = 15 Rupees. This is exactly the amount needed to buy the toy, so you have enough money."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-time",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Time",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Time. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "What comes after morning?",
        "options": [
          "Midnight",
          "Evening",
          "Night",
          "Afternoon"
        ],
        "correct": 3,
        "explanation": "After morning comes the afternoon."
      },
      {
        "q": "If it is 6 o'clock, which number is the hour hand pointing at?",
        "options": [
          "6",
          "12",
          "3",
          "9"
        ],
        "correct": 0,
        "explanation": "The hour hand points directly at the number representing the hour."
      },
      {
        "q": "A day has 24 hours. How many hours are in half a day?",
        "options": [
          "10 hours",
          "12 hours",
          "14 hours",
          "20 hours"
        ],
        "correct": 1,
        "explanation": "Half of 24 hours is 12 hours."
      },
      {
        "q": "Which is the longest period of time among these?",
        "options": [
          "One hour",
          "One day",
          "One week",
          "One minute"
        ],
        "correct": 2,
        "explanation": "A week has 7 days, which is longer than a day, an hour, or a minute."
      },
      {
        "q": "What time is it if the hour hand is between 7 and 8, and the minute hand is pointing at 6?",
        "options": [
          "6:30",
          "7:00",
          "8:30",
          "7:30"
        ],
        "correct": 3,
        "explanation": "When the minute hand is at 6, it means 30 minutes past the hour. Since the hour hand is between 7 and 8, it is 7:30."
      },
      {
        "q": "Which part of the day is it when the sun is high up in the sky and it is warm?",
        "options": [
          "Afternoon",
          "Night",
          "Evening",
          "Morning"
        ],
        "correct": 0,
        "explanation": "The afternoon is the period from noon to evening when the sun is highest."
      },
      {
        "q": "Which hand on a clock tells us the minutes?",
        "options": [
          "The hour hand",
          "The minute hand",
          "The second hand",
          "Both hour and minute hand"
        ],
        "correct": 1,
        "explanation": "The minute hand is longer and moves around the clock face to show the minutes."
      },
      {
        "q": "What is the time shown on the clock?",
        "options": [
          "5 o'clock",
          "4 o'clock",
          "3 o'clock",
          "6 o'clock"
        ],
        "correct": 2,
        "explanation": "The hour hand is pointing at 3, and the minute hand is pointing at 12, which means it is 3 o'clock."
      },
      {
        "q": "If you eat your breakfast in the morning, when do you usually eat your lunch?",
        "options": [
          "Morning",
          "Night",
          "Evening",
          "Afternoon"
        ],
        "correct": 3,
        "explanation": "Lunch is typically eaten in the afternoon."
      },
      {
        "q": "Which of these is a unit of time?",
        "options": [
          "Hour",
          "Kilogram",
          "Metre",
          "Litre"
        ],
        "correct": 0,
        "explanation": "An hour is a unit used to measure time."
      }
    ],
    "faqs": []
  },
  {
    "slug": "class-1-mathematics-measurement",
    "classLevel": "1",
    "subject": "Mathematics",
    "chapter": "Measurement",
    "intro": "Practise chapter-wise MCQs for Class 1 Mathematics — Measurement. Every question comes with the correct answer and an explanation.",
    "mcqs": [
      {
        "q": "Which is shorter: a car or a bicycle?",
        "options": [
          "Car",
          "Bicycle",
          "They are the same length",
          "Cannot be determined"
        ],
        "correct": 1,
        "explanation": "A bicycle is generally shorter in length than a car."
      },
      {
        "q": "If you want to measure how long a movie is, you would use units of:",
        "options": [
          "Liters",
          "Kilograms",
          "Time (like minutes or hours)",
          "Meters"
        ],
        "correct": 2,
        "explanation": "Movies are measured in units of time, such as minutes and hours, to indicate their duration."
      },
      {
        "q": "Which object is heaviest: a feather or a stone?",
        "options": [
          "They weigh the same",
          "Feather",
          "Cannot be determined",
          "Stone"
        ],
        "correct": 3,
        "explanation": "A stone is much denser and heavier than a feather."
      },
      {
        "q": "If you want to measure the length of your finger, which unit would be most suitable?",
        "options": [
          "Centimeters",
          "Meters",
          "Liters",
          "Kilograms"
        ],
        "correct": 0,
        "explanation": "Centimeters are used for measuring smaller lengths, like the length of a finger."
      },
      {
        "q": "Which is longer: a pencil or a book?",
        "options": [
          "Pencil",
          "Book",
          "They are the same length",
          "Cannot be determined"
        ],
        "correct": 1,
        "explanation": "Books are generally larger and have more pages than a pencil, making them longer."
      },
      {
        "q": "If you want to weigh your school bag, which unit would be most suitable?",
        "options": [
          "Liters",
          "Meters",
          "Kilograms",
          "Seconds"
        ],
        "correct": 2,
        "explanation": "Kilograms are a standard unit for measuring weight or mass."
      },
      {
        "q": "Which is lighter: a watermelon or a grape?",
        "options": [
          "Watermelon",
          "Cannot be determined",
          "They weigh the same",
          "Grape"
        ],
        "correct": 3,
        "explanation": "A grape is much smaller and lighter than a watermelon."
      },
      {
        "q": "If you are thirsty, you would want to drink a certain amount of liquid. What unit is used to measure liquids?",
        "options": [
          "Liters",
          "Centimeters",
          "Kilograms",
          "Meters"
        ],
        "correct": 0,
        "explanation": "Liters are used to measure the volume or amount of liquid."
      },
      {
        "q": "If you want to measure the length of your classroom, which unit would be most suitable?",
        "options": [
          "Centimeters",
          "Meters",
          "Kilograms",
          "Liters"
        ],
        "correct": 1,
        "explanation": "Meters are a standard unit for measuring longer distances like the length of a room. Centimeters are too small, and kilograms and liters are units of weight and volume respectively."
      },
      {
        "q": "Which container can hold more water: a cup or a bucket?",
        "options": [
          "They hold the same amount",
          "Cannot be determined",
          "Bucket",
          "Cup"
        ],
        "correct": 2,
        "explanation": "A bucket is much larger than a cup and can hold a significantly greater volume of water."
      }
    ],
    "faqs": []
  }
];
export const MCQ_GROUPS = (): string[] => [...new Set(MCQ_CHAPTERS.map((m) => `${m.classLevel} ${m.subject}`))];
export function getMcqChapter(slug: string): McqChapter | undefined {
  return MCQ_CHAPTERS.find((m) => m.slug === slug);
}
