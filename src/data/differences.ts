/**
 * differences.ts — "Difference Between X and Y" SEO content cluster.
 *
 * Evergreen, high-search-volume comparison pages (the kind BYJU'S ranks #1 for
 * in India). Each entry renders a comparison table + key differences + FAQs at
 * /difference-between/{slug}, with Article + FAQ + Breadcrumb structured data.
 *
 * DIFFERENCES is auto-populated from a generated dataset; keep entries
 * accurate (educational content).
 */
export interface DiffRow { aspect: string; a: string; b: string; }
export interface DiffFaq { q: string; a: string; }
export interface DiffTopic {
  slug: string;
  title: string;          // "Difference Between Mitosis and Meiosis"
  termA: string;
  termB: string;
  category: string;       // Biology, Physics, ...
  classLevel: string;     // "Class 10"
  intro: string;
  table: DiffRow[];
  keyPoints: string[];
  faqs: DiffFaq[];
}

export const DIFFERENCES: DiffTopic[] = [
  {
    "slug": "mitosis-and-meiosis",
    "title": "Difference Between Mitosis and Meiosis",
    "termA": "Mitosis",
    "termB": "Meiosis",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Mitosis and meiosis are two types of cell division in living organisms, essential for growth and reproduction. Understanding their differences is crucial for CBSE Class 10 and 12 Biology exams.",
    "table": [
      {
        "aspect": "Number of divisions",
        "a": "One division",
        "b": "Two divisions"
      },
      {
        "aspect": "Daughter cells produced",
        "a": "Two identical cells",
        "b": "Four non-identical cells"
      },
      {
        "aspect": "Chromosome number",
        "a": "Diploid (2n) remains same",
        "b": "Haploid (n) - half the original"
      },
      {
        "aspect": "Where it occurs",
        "a": "Somatic cells (body cells)",
        "b": "Germ cells (sex cells)"
      },
      {
        "aspect": "Purpose",
        "a": "Growth and repair",
        "b": "Sexual reproduction"
      },
      {
        "aspect": "Genetic variation",
        "a": "No variation, identical copies",
        "b": "Genetic variation occurs"
      }
    ],
    "keyPoints": [
      "Mitosis produces two identical cells while meiosis produces four genetically different cells",
      "Mitosis is used for body growth and repair; meiosis creates sex cells for reproduction",
      "Meiosis involves crossing over and independent assortment, causing genetic variation",
      "Mitosis maintains chromosome number; meiosis reduces it by half"
    ],
    "faqs": [
      {
        "q": "Why is meiosis important for sexual reproduction?",
        "a": "Meiosis reduces chromosome number to half, allowing male and female gametes to combine and restore full chromosome complement in offspring, ensuring genetic diversity."
      },
      {
        "q": "Can mitosis occur in germ cells?",
        "a": "Yes, germ cells undergo mitosis initially for growth, but only meiosis produces functional gametes (sperm and eggs)."
      },
      {
        "q": "What is crossing over in meiosis?",
        "a": "Crossing over is exchange of genetic material between homologous chromosomes during prophase 1 of meiosis, creating genetic variation."
      }
    ]
  },
  {
    "slug": "speed-and-velocity",
    "title": "Difference Between Speed and Velocity",
    "termA": "Speed",
    "termB": "Velocity",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Speed and velocity are fundamental concepts in physics that describe motion, yet they are distinctly different. Mastering this difference is essential for CBSE Class 9 and 10 Physics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Distance covered per unit time",
        "b": "Displacement covered per unit time"
      },
      {
        "aspect": "Nature",
        "a": "Scalar quantity (only magnitude)",
        "b": "Vector quantity (magnitude and direction)"
      },
      {
        "aspect": "Formula",
        "a": "Speed = Distance / Time",
        "b": "Velocity = Displacement / Time"
      },
      {
        "aspect": "Can be zero",
        "a": "No, always positive",
        "b": "Yes, if object returns to starting point"
      },
      {
        "aspect": "Example",
        "a": "Car traveling at 60 km/h",
        "b": "Car traveling at 60 km/h North"
      }
    ],
    "keyPoints": [
      "Speed is scalar (only magnitude); velocity is vector (magnitude + direction)",
      "Speed uses total distance; velocity uses displacement (straight-line distance)",
      "An object can have high speed but zero velocity if it returns to its starting point",
      "Velocity can be negative or zero; speed is always positive or zero"
    ],
    "faqs": [
      {
        "q": "Can speed and velocity be equal?",
        "a": "Yes, when an object moves in a straight line without returning; distance equals displacement, making speed equal to velocity."
      },
      {
        "q": "Why is velocity important in physics?",
        "a": "Velocity includes direction, which is crucial for understanding forces, acceleration, and motion in different dimensions."
      },
      {
        "q": "If a runner completes a circular track, what is their velocity?",
        "a": "Zero, because displacement is zero (runner returns to starting point), even though speed is non-zero."
      }
    ]
  },
  {
    "slug": "mass-and-weight",
    "title": "Difference Between Mass and Weight",
    "termA": "Mass",
    "termB": "Weight",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Mass and weight are often confused in everyday language, but in physics they represent entirely different properties. This distinction is vital for CBSE Class 9 and 10 Physics exams.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Amount of matter in an object",
        "b": "Force exerted by gravity on mass"
      },
      {
        "aspect": "Nature",
        "a": "Scalar quantity",
        "b": "Vector quantity"
      },
      {
        "aspect": "SI Unit",
        "a": "Kilogram (kg)",
        "b": "Newton (N)"
      },
      {
        "aspect": "Dependence",
        "a": "Does not depend on location",
        "b": "Depends on gravity (g = 9.8 m/s²)"
      },
      {
        "aspect": "Measurement",
        "a": "Balance scale",
        "b": "Spring scale"
      }
    ],
    "keyPoints": [
      "Mass is intrinsic and constant; weight varies with gravitational field strength",
      "An astronaut has same mass on Earth and Moon, but different weight",
      "Weight = Mass × Gravitational acceleration (W = mg)",
      "Mass never changes; weight changes on different planets and altitudes"
    ],
    "faqs": [
      {
        "q": "What is the weight of a 10 kg object on Earth?",
        "a": "Weight = 10 kg × 9.8 m/s² = 98 N. On Moon, same mass weighs only about 16 N due to lower gravity."
      },
      {
        "q": "Why does an object weigh zero in space?",
        "a": "In space far from celestial bodies, gravitational acceleration approaches zero, making weight nearly zero even though mass remains constant."
      },
      {
        "q": "Can mass be zero?",
        "a": "No, every object with matter has mass. Only massless particles like photons have zero mass."
      }
    ]
  },
  {
    "slug": "acid-and-base",
    "title": "Difference Between Acid and Base",
    "termA": "Acid",
    "termB": "Base",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Acids and bases are essential chemical compounds with opposite properties, fundamental to CBSE Class 10 Chemistry. Understanding their differences helps explain everyday phenomena and chemical reactions.",
    "table": [
      {
        "aspect": "pH Range",
        "a": "Below 7 (0-7)",
        "b": "Above 7 (7-14)"
      },
      {
        "aspect": "Taste",
        "a": "Sour",
        "b": "Bitter"
      },
      {
        "aspect": "Feel",
        "a": "Corrosive to skin",
        "b": "Slippery to touch"
      },
      {
        "aspect": "Indicator color",
        "a": "Turns blue litmus paper red",
        "b": "Turns red litmus paper blue"
      },
      {
        "aspect": "Examples",
        "a": "Citric acid, hydrochloric acid, vinegar",
        "b": "Sodium hydroxide, ammonia, soap"
      }
    ],
    "keyPoints": [
      "Acids have pH less than 7; bases have pH greater than 7",
      "Acids donate H+ ions; bases accept H+ ions or donate OH- ions",
      "Neutralization reaction: acid + base → salt + water",
      "Strong acids completely ionize; weak acids partially ionize"
    ],
    "faqs": [
      {
        "q": "What happens when acid and base mix?",
        "a": "They neutralize each other in a neutralization reaction, producing salt and water (e.g., HCl + NaOH → NaCl + H2O)."
      },
      {
        "q": "Why should we not taste unknown substances?",
        "a": "Many acids and bases are corrosive and poisonous. Tasting can cause chemical burns or poisoning."
      },
      {
        "q": "Is water neutral?",
        "a": "Yes, pure water has pH = 7. It is neither acidic nor basic and has equal H+ and OH- concentrations."
      }
    ]
  },
  {
    "slug": "photosynthesis-and-respiration",
    "title": "Difference Between Photosynthesis and Respiration",
    "termA": "Photosynthesis",
    "termB": "Respiration",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Photosynthesis and respiration are complementary life processes in plants and organisms. Grasping their differences is essential for CBSE Class 10 Biology and understanding energy flow.",
    "table": [
      {
        "aspect": "Type of reaction",
        "a": "Endothermic (absorbs energy)",
        "b": "Exothermic (releases energy)"
      },
      {
        "aspect": "Raw materials",
        "a": "Carbon dioxide and water",
        "b": "Glucose and oxygen"
      },
      {
        "aspect": "Products",
        "a": "Glucose and oxygen",
        "b": "Carbon dioxide and water"
      },
      {
        "aspect": "Location",
        "a": "Occurs in chloroplasts",
        "b": "Occurs in mitochondria"
      },
      {
        "aspect": "When it occurs",
        "a": "During daylight",
        "b": "24/7 in all living cells"
      }
    ],
    "keyPoints": [
      "Photosynthesis builds glucose using solar energy; respiration breaks down glucose to release energy",
      "Plants photosynthesize and respire; animals only respire",
      "Equation: Photosynthesis reverses respiration equation",
      "Photosynthesis requires light and chlorophyll; respiration does not"
    ],
    "faqs": [
      {
        "q": "Can plants respire during the day?",
        "a": "Yes, plants respire continuously, even during photosynthesis. Photosynthesis rate is higher, so net oxygen is released."
      },
      {
        "q": "Why do plants need respiration if they photosynthesize?",
        "a": "Plants need ATP energy for growth, movement, and metabolic processes, which respiration provides."
      },
      {
        "q": "What is the fate of glucose produced in photosynthesis?",
        "a": "Glucose is used for energy (respiration), growth, storage as starch, and production of other compounds like proteins and fats."
      }
    ]
  },
  {
    "slug": "concave-and-convex-lens",
    "title": "Difference Between Concave and Convex Lens",
    "termA": "Concave Lens",
    "termB": "Convex Lens",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Concave and convex lenses are essential optical instruments used in microscopes, cameras, and eyeglasses. Understanding their properties is crucial for CBSE Class 10 Physics optics.",
    "table": [
      {
        "aspect": "Shape",
        "a": "Curved inward (thinner at center)",
        "b": "Curved outward (thicker at center)"
      },
      {
        "aspect": "Type of lens",
        "a": "Diverging lens",
        "b": "Converging lens"
      },
      {
        "aspect": "Image formed",
        "a": "Virtual, erect, diminished",
        "b": "Real or virtual (depends on object position)"
      },
      {
        "aspect": "Focal length",
        "a": "Negative",
        "b": "Positive"
      },
      {
        "aspect": "Uses",
        "a": "Magnifying glass for myopia (short-sightedness)",
        "b": "Magnifying glass for hyperopia (long-sightedness)"
      }
    ],
    "keyPoints": [
      "Concave lens diverges light rays; convex lens converges light rays",
      "Concave lens always forms virtual, erect, smaller images",
      "Convex lens can form both real and virtual images depending on object distance",
      "Convex lenses are used in cameras and microscopes; concave in corrective lenses"
    ],
    "faqs": [
      {
        "q": "Can a concave lens form a real image?",
        "a": "No, concave lenses always diverge light rays, so they only form virtual images."
      },
      {
        "q": "When does a convex lens form a virtual image?",
        "a": "When the object is placed between the lens and its focal point (distance < f), the lens forms a virtual, erect, magnified image."
      },
      {
        "q": "What is the power of a lens?",
        "a": "Power = 1/f (in meters). Convex lenses have positive power; concave lenses have negative power."
      }
    ]
  },
  {
    "slug": "ac-and-dc-current",
    "title": "Difference Between AC and DC Current",
    "termA": "AC Current",
    "termB": "DC Current",
    "category": "Physics",
    "classLevel": "Class 12",
    "intro": "Alternating current and direct current are the two main forms of electrical current used in homes and industries across India. Mastering their differences is essential for CBSE Class 12 Physics.",
    "table": [
      {
        "aspect": "Direction of flow",
        "a": "Changes direction periodically",
        "b": "Flows in one direction only"
      },
      {
        "aspect": "Source",
        "a": "Alternator, power stations",
        "b": "Battery, cell, solar panel"
      },
      {
        "aspect": "Frequency in India",
        "a": "50 Hz",
        "b": "0 Hz (constant)"
      },
      {
        "aspect": "Efficiency",
        "a": "Can be transmitted over long distances",
        "b": "Loses energy over long distances"
      },
      {
        "aspect": "Applications",
        "a": "Home appliances, factories, streets lights",
        "b": "Electronics, mobile phones, flashlights"
      }
    ],
    "keyPoints": [
      "AC current reverses direction periodically; DC current flows in one direction",
      "India uses 50 Hz AC current for domestic and industrial supply",
      "AC can be stepped up or down using transformers, making it efficient for transmission",
      "DC is preferred for electronic circuits but batteries discharge over time"
    ],
    "faqs": [
      {
        "q": "Why is AC used in Indian homes instead of DC?",
        "a": "AC can be easily transformed to different voltages using transformers, making it efficient for long-distance transmission. DC cannot be stepped up easily."
      },
      {
        "q": "Is DC safer than AC?",
        "a": "Both can be dangerous. AC is more dangerous at higher voltages; DC can cause muscle contractions. Both require safety precautions."
      },
      {
        "q": "Can DC appliances run on AC?",
        "a": "No, most DC appliances require stable constant voltage. Attempting to use AC may damage them. Conversion devices are needed."
      }
    ]
  },
  {
    "slug": "series-and-parallel-circuit",
    "title": "Difference Between Series and Parallel Circuit",
    "termA": "Series Circuit",
    "termB": "Parallel Circuit",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Series and parallel circuits are fundamental circuit configurations in electricity, essential knowledge for CBSE Class 10 Physics. Understanding their properties helps explain household electrical systems.",
    "table": [
      {
        "aspect": "Current path",
        "a": "Single path for current",
        "b": "Multiple paths for current"
      },
      {
        "aspect": "Current flow",
        "a": "Same current through all components",
        "b": "Current divides among branches"
      },
      {
        "aspect": "Total resistance",
        "a": "R total = R1 + R2 + R3...",
        "b": "1/R total = 1/R1 + 1/R2 + 1/R3..."
      },
      {
        "aspect": "Voltage division",
        "a": "Voltage divides across components",
        "b": "Same voltage across all components"
      },
      {
        "aspect": "If one component fails",
        "a": "Entire circuit stops working",
        "b": "Other components continue working"
      }
    ],
    "keyPoints": [
      "Series circuit has single path; parallel circuit has multiple paths for current",
      "Series total resistance increases; parallel total resistance decreases",
      "Home appliances use parallel circuits so each can be controlled independently",
      "Series circuits are used in decorative lights where failure of one affects all"
    ],
    "faqs": [
      {
        "q": "Why are household circuits parallel and not series?",
        "a": "Parallel circuits allow independent control of appliances. Series would mean failure of one appliance stops all others."
      },
      {
        "q": "Which circuit is more efficient?",
        "a": "Parallel circuits are more practical for homes. Series requires high voltage but wastes energy as heat in resistances."
      },
      {
        "q": "Can series and parallel be combined?",
        "a": "Yes, complex circuits use both configurations. This is called series-parallel or mixed circuit configuration."
      }
    ]
  },
  {
    "slug": "renewable-and-non-renewable-resources",
    "title": "Difference Between Renewable and Non-renewable Resources",
    "termA": "Renewable Resources",
    "termB": "Non-renewable Resources",
    "category": "Science",
    "classLevel": "Class 10",
    "intro": "Renewable and non-renewable resources are crucial concepts in environmental science and sustainable development for CBSE Class 10. Understanding their differences is vital for India's energy future.",
    "table": [
      {
        "aspect": "Replenishment",
        "a": "Can be replenished naturally in reasonable time",
        "b": "Cannot be replenished once depleted"
      },
      {
        "aspect": "Examples",
        "a": "Solar, wind, water, biomass",
        "b": "Coal, oil, natural gas, minerals"
      },
      {
        "aspect": "Availability",
        "a": "Continuous and infinite",
        "b": "Limited and finite"
      },
      {
        "aspect": "Environmental impact",
        "a": "Minimal pollution",
        "b": "High pollution and greenhouse gases"
      },
      {
        "aspect": "Cost",
        "a": "Initially high, long-term low",
        "b": "Initially low, depleting resources increase cost"
      }
    ],
    "keyPoints": [
      "Renewable resources regenerate naturally; non-renewable do not",
      "Solar and wind energy are clean; fossil fuels cause pollution",
      "India promotes renewable energy through solar and wind projects",
      "Non-renewable resources are finite and their extraction harms ecosystems"
    ],
    "faqs": [
      {
        "q": "Why does India need renewable energy?",
        "a": "India has limited fossil fuel reserves and faces pollution challenges. Renewable energy like solar and wind provides clean, sustainable power."
      },
      {
        "q": "Is biomass completely renewable?",
        "a": "Yes, if forests are sustainably managed with replanting. Overexploitation makes it non-renewable."
      },
      {
        "q": "Can non-renewable resources be recycled?",
        "a": "Some metals and minerals can be recycled, but fossil fuels (coal, oil) cannot be reused once burned."
      }
    ]
  },
  {
    "slug": "mixture-and-compound",
    "title": "Difference Between Mixture and Compound",
    "termA": "Mixture",
    "termB": "Compound",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Mixtures and compounds are two categories of matter that appear similar but have different properties, crucial concepts for CBSE Class 9 Chemistry. Distinguishing between them is fundamental to chemistry.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Two or more substances physically combined",
        "b": "Two or more elements chemically combined"
      },
      {
        "aspect": "Proportion",
        "a": "Variable proportions",
        "b": "Fixed, definite proportions"
      },
      {
        "aspect": "Properties",
        "a": "Retains properties of individual components",
        "b": "New properties, different from components"
      },
      {
        "aspect": "Separation",
        "a": "Can be separated by physical methods",
        "b": "Cannot be separated by physical methods"
      },
      {
        "aspect": "Chemical reaction",
        "a": "No chemical reaction occurs",
        "b": "Chemical reaction occurs during formation"
      }
    ],
    "keyPoints": [
      "Mixtures are physical combinations; compounds are chemical combinations",
      "Compound formation involves rearrangement of electrons and atoms",
      "Examples of mixture: salt water, sand and iron filings; compounds: salt (NaCl), sugar (C12H22O11)",
      "Homogeneous mixture looks uniform; heterogeneous shows different components"
    ],
    "faqs": [
      {
        "q": "Can a mixture become a compound?",
        "a": "Yes, if chemical reaction occurs. For example, hydrogen and oxygen mixture becomes water compound when ignited."
      },
      {
        "q": "Why is salt water a mixture and not a compound?",
        "a": "Salt water is physically mixed, salt and water retain their properties, and it can be separated by evaporation."
      },
      {
        "q": "How many compounds can form from two elements?",
        "a": "Multiple compounds can form in different proportions, each with fixed ratio. Hydrogen and oxygen form H2O and H2O2."
      }
    ]
  },
  {
    "slug": "element-and-compound",
    "title": "Difference Between Element and Compound",
    "termA": "Element",
    "termB": "Compound",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Elements and compounds are fundamental building blocks of matter in chemistry, essential for CBSE Class 9 and 10 students. Understanding their differences forms the foundation of chemical knowledge.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Pure substance made of only one type of atom",
        "b": "Pure substance made of two or more elements"
      },
      {
        "aspect": "Number of atoms",
        "a": "One type of atom",
        "b": "Two or more types of atoms"
      },
      {
        "aspect": "Can be broken down",
        "a": "Cannot be broken into simpler substances",
        "b": "Can be broken into elements by chemical reaction"
      },
      {
        "aspect": "Properties",
        "a": "Fixed, unique properties",
        "b": "Different properties than component elements"
      },
      {
        "aspect": "Examples",
        "a": "Oxygen (O), Hydrogen (H), Gold (Au)",
        "b": "Water (H2O), Salt (NaCl), Sugar (C12H22O11)"
      }
    ],
    "keyPoints": [
      "Elements are pure substances of one type; compounds contain two or more elements",
      "There are 118 known elements on the periodic table",
      "Compounds have fixed chemical formulas (e.g., H2O always has 2 hydrogen and 1 oxygen)",
      "Millions of compounds can be formed from 118 elements through different combinations"
    ],
    "faqs": [
      {
        "q": "Why is water a compound and not an element?",
        "a": "Water contains hydrogen and oxygen atoms chemically bonded in fixed ratio (H2O). It has different properties than pure hydrogen or oxygen."
      },
      {
        "q": "Can compounds contain only one element?",
        "a": "No, compounds must have at least two different elements. Diatomic oxygen (O2) is an element, not a compound."
      },
      {
        "q": "How many compounds can be formed from carbon and hydrogen?",
        "a": "Thousands! These form hydrocarbons like methane (CH4), ethane (C2H6), benzene (C6H6), etc."
      }
    ]
  },
  {
    "slug": "plant-cell-and-animal-cell",
    "title": "Difference Between Plant Cell and Animal Cell",
    "termA": "Plant Cell",
    "termB": "Animal Cell",
    "category": "Biology",
    "classLevel": "Class 9",
    "intro": "Plant and animal cells are eukaryotic cells with similar basic structures but important differences, crucial for CBSE Class 9 and 10 Biology. Understanding these differences reveals their specialized functions.",
    "table": [
      {
        "aspect": "Cell wall",
        "a": "Present (cellulose)",
        "b": "Absent, only cell membrane"
      },
      {
        "aspect": "Vacuole",
        "a": "One large central vacuole",
        "b": "Many small vacuoles"
      },
      {
        "aspect": "Chloroplast",
        "a": "Present (site of photosynthesis)",
        "b": "Absent"
      },
      {
        "aspect": "Shape",
        "a": "Fixed, rectangular/square",
        "b": "Irregular, round/spherical"
      },
      {
        "aspect": "Centrioles",
        "a": "Absent",
        "b": "Present (in animal cells)"
      }
    ],
    "keyPoints": [
      "Plant cells have cell wall and chloroplasts; animal cells do not",
      "Plant cells have large central vacuole for storage; animal cells have multiple small vacuoles",
      "Cell wall provides rigidity to plant cells",
      "Both have nucleus, mitochondria, endoplasmic reticulum, and Golgi apparatus"
    ],
    "faqs": [
      {
        "q": "Why do plant cells need chloroplasts?",
        "a": "Chloroplasts contain chlorophyll for photosynthesis, allowing plants to produce their own food using sunlight."
      },
      {
        "q": "What is the function of the large vacuole in plant cells?",
        "a": "It stores water, nutrients, and pigments. Turgor pressure from the vacuole keeps plants rigid and firm."
      },
      {
        "q": "Can animal cells perform photosynthesis?",
        "a": "No, animal cells lack chloroplasts. Some animals consume plants or algae to get nutrients instead."
      }
    ]
  },
  {
    "slug": "artery-and-vein",
    "title": "Difference Between Artery and Vein",
    "termA": "Artery",
    "termB": "Vein",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Arteries and veins are blood vessels with distinct structures and functions, essential for CBSE Class 10 Biology. Understanding their differences explains how blood circulates through the body.",
    "table": [
      {
        "aspect": "Function",
        "a": "Carry blood away from heart",
        "b": "Carry blood toward heart"
      },
      {
        "aspect": "Blood pressure",
        "a": "High pressure",
        "b": "Low pressure"
      },
      {
        "aspect": "Wall thickness",
        "a": "Thick, muscular wall",
        "b": "Thin wall"
      },
      {
        "aspect": "Valves",
        "a": "Absent",
        "b": "Present to prevent backflow"
      },
      {
        "aspect": "Blood color",
        "a": "Bright red (oxygenated)",
        "b": "Dark red (deoxygenated)"
      }
    ],
    "keyPoints": [
      "Arteries carry oxygen-rich blood from heart; veins return deoxygenated blood",
      "Thick muscular walls allow arteries to withstand high pressure",
      "Valves in veins prevent blood backflow against gravity",
      "Pulse can be felt in arteries; veins do not have pulse"
    ],
    "faqs": [
      {
        "q": "Why do arteries have thick walls?",
        "a": "Arteries carry blood at high pressure directly from the heart. Thick muscular walls can stretch and contract to handle this pressure."
      },
      {
        "q": "Are all arteries oxygenated and all veins deoxygenated?",
        "a": "No exception: pulmonary artery carries deoxygenated blood to lungs, and pulmonary vein carries oxygenated blood from lungs."
      },
      {
        "q": "Why do we feel pulse in arteries and not veins?",
        "a": "Arteries have elastic walls that expand with blood surge from heartbeat; veins have thin walls and low pressure."
      }
    ]
  },
  {
    "slug": "dna-and-rna",
    "title": "Difference Between DNA and RNA",
    "termA": "DNA",
    "termB": "RNA",
    "category": "Biology",
    "classLevel": "Class 12",
    "intro": "DNA and RNA are nucleic acids that store and transmit genetic information, fundamental to CBSE Class 12 Biology. Understanding their differences is crucial for molecular biology.",
    "table": [
      {
        "aspect": "Full form",
        "a": "Deoxyribonucleic acid",
        "b": "Ribonucleic acid"
      },
      {
        "aspect": "Sugar",
        "a": "Deoxyribose",
        "b": "Ribose"
      },
      {
        "aspect": "Structure",
        "a": "Double helix",
        "b": "Single strand (usually)"
      },
      {
        "aspect": "Bases",
        "a": "A, G, C, T",
        "b": "A, G, C, U (Uracil instead of Thymine)"
      },
      {
        "aspect": "Function",
        "a": "Store genetic information",
        "b": "Transmit genetic information, protein synthesis"
      }
    ],
    "keyPoints": [
      "DNA stores genetic information in double helix; RNA transmits it for protein synthesis",
      "DNA is stable and long-lasting; RNA is temporary and breaks down quickly",
      "Three types of RNA: mRNA (messenger), tRNA (transfer), rRNA (ribosomal)",
      "Mutations in DNA are permanent; RNA errors are temporary"
    ],
    "faqs": [
      {
        "q": "Why does RNA have uracil instead of thymine?",
        "a": "Ribose sugar in RNA has a hydroxyl group that makes thymine unstable. Uracil is more stable in RNA without affecting function."
      },
      {
        "q": "Can RNA store genetic information like DNA?",
        "a": "RNA can store genetic information but is less stable. Some viruses use RNA as genetic material, but eukaryotic cells use DNA."
      },
      {
        "q": "What is the role of mRNA in cells?",
        "a": "mRNA carries genetic instructions from DNA in nucleus to ribosomes in cytoplasm, directing the synthesis of specific proteins."
      }
    ]
  },
  {
    "slug": "prokaryotic-and-eukaryotic-cell",
    "title": "Difference Between Prokaryotic and Eukaryotic Cell",
    "termA": "Prokaryotic Cell",
    "termB": "Eukaryotic Cell",
    "category": "Biology",
    "classLevel": "Class 9",
    "intro": "Prokaryotic and eukaryotic cells represent two fundamental cell types, essential for CBSE Class 9 Biology. Understanding their differences explains the diversity of life on Earth.",
    "table": [
      {
        "aspect": "Nucleus",
        "a": "Absent, DNA in nucleoid",
        "b": "Present with nuclear membrane"
      },
      {
        "aspect": "Organisms",
        "a": "Bacteria and Archaea",
        "b": "Animals, plants, fungi, protists"
      },
      {
        "aspect": "Size",
        "a": "0.1 - 5.0 micrometers",
        "b": "5 - 100 micrometers"
      },
      {
        "aspect": "Organelles",
        "a": "Absent (no membrane-bound)",
        "b": "Present (mitochondria, chloroplast, etc.)"
      },
      {
        "aspect": "Cell division",
        "a": "Binary fission",
        "b": "Mitosis and meiosis"
      }
    ],
    "keyPoints": [
      "Prokaryotic cells lack nucleus; eukaryotic cells have nucleus",
      "Prokaryotes are bacteria; eukaryotes are plants, animals, fungi",
      "Eukaryotic cells are larger and more complex with organelles",
      "Prokaryotic ribosomes are 70S; eukaryotic are 80S"
    ],
    "faqs": [
      {
        "q": "Why are prokaryotic cells simpler than eukaryotic cells?",
        "a": "Prokaryotes evolved first with minimal compartmentalization. Eukaryotes developed membrane-bound organelles for specialized functions."
      },
      {
        "q": "Can prokaryotic cells contain DNA outside the nucleoid?",
        "a": "Yes, plasmids are small circular DNA molecules in prokaryotes, separate from chromosomal DNA."
      },
      {
        "q": "Which cells are found in Indian human body?",
        "a": "All human cells are eukaryotic with nucleus and organelles. Bacteria in our gut are prokaryotic."
      }
    ]
  },
  {
    "slug": "distance-and-displacement",
    "title": "Difference Between Distance and Displacement",
    "termA": "Distance",
    "termB": "Displacement",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Distance and displacement are kinematic concepts that describe motion differently, essential for CBSE Class 9 Physics. Understanding their differences is crucial for motion calculations.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Total path length covered",
        "b": "Shortest straight-line distance with direction"
      },
      {
        "aspect": "Nature",
        "a": "Scalar quantity",
        "b": "Vector quantity"
      },
      {
        "aspect": "Symbol",
        "a": "s",
        "b": "s or arrow notation"
      },
      {
        "aspect": "Can be zero",
        "a": "No, always positive",
        "b": "Yes, if object returns to starting point"
      },
      {
        "aspect": "Always greater or equal",
        "a": "Always greater than or equal to displacement",
        "b": "Always less than or equal to distance"
      }
    ],
    "keyPoints": [
      "Distance measures total path; displacement measures net straight-line change",
      "Walking around a square field: distance is perimeter, displacement is zero or diagonal",
      "Displacement = final position - initial position",
      "In circular motion, distance increases but displacement can be zero"
    ],
    "faqs": [
      {
        "q": "If a student walks 100m east then 100m west, what is displacement?",
        "a": "Zero meters. Displacement is final position minus initial position. The student returns to starting point."
      },
      {
        "q": "Can displacement be negative?",
        "a": "Yes, if reference direction is chosen. Moving west when east is positive gives negative displacement."
      },
      {
        "q": "In uniform circular motion, why is displacement zero per revolution?",
        "a": "The object returns to starting position after one complete revolution, so net displacement is zero despite traveling the circumference as distance."
      }
    ]
  },
  {
    "slug": "scalar-and-vector",
    "title": "Difference Between Scalar and Vector Quantity",
    "termA": "Scalar Quantity",
    "termB": "Vector Quantity",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Scalar and vector quantities are two types of physical quantities with distinct properties, fundamental to CBSE Class 9 Physics. Understanding them is essential for solving physics problems.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Has only magnitude",
        "b": "Has magnitude and direction"
      },
      {
        "aspect": "Representation",
        "a": "Simple number with unit",
        "b": "Arrow or boldface notation"
      },
      {
        "aspect": "Addition",
        "a": "Simple arithmetic addition",
        "b": "Vector addition (parallelogram law)"
      },
      {
        "aspect": "Examples",
        "a": "Speed, temperature, mass, time",
        "b": "Velocity, displacement, force, acceleration"
      },
      {
        "aspect": "Change with direction",
        "a": "No change",
        "b": "Changes with direction"
      }
    ],
    "keyPoints": [
      "Scalar quantities only need magnitude; vectors need magnitude and direction",
      "Scalar addition is simple arithmetic; vector addition uses graphical or mathematical methods",
      "Two vectors of equal magnitude may give zero resultant if opposite direction",
      "All fundamental quantities except time are vectors in nature"
    ],
    "faqs": [
      {
        "q": "Is speed a scalar and velocity a vector?",
        "a": "Yes, speed is scalar (magnitude only), while velocity includes direction (magnitude + direction)."
      },
      {
        "q": "Can two vectors of equal magnitude give zero resultant?",
        "a": "Yes, if they are equal in magnitude but opposite in direction, the resultant is zero."
      },
      {
        "q": "Why is time always scalar and never vector?",
        "a": "Time flows in only one direction (forward) universally. It has no directional component in space."
      }
    ]
  },
  {
    "slug": "reflection-and-refraction",
    "title": "Difference Between Reflection and Refraction",
    "termA": "Reflection",
    "termB": "Refraction",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Reflection and refraction are light phenomena explaining how light behaves at boundaries, essential for CBSE Class 10 Physics optics. Mastering them unlocks understanding of lenses and mirrors.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Light bounces back from surface",
        "b": "Light bends while passing through medium"
      },
      {
        "aspect": "Interface",
        "a": "Occurs at surface boundary",
        "b": "Occurs when light enters different medium"
      },
      {
        "aspect": "Direction",
        "a": "Light returns in original direction",
        "b": "Light changes direction"
      },
      {
        "aspect": "Medium",
        "a": "No change in medium",
        "b": "Light moves between different mediums"
      },
      {
        "aspect": "Laws",
        "a": "Angle of incidence = angle of reflection",
        "b": "Snell's law: n1 sin θ1 = n2 sin θ2"
      }
    ],
    "keyPoints": [
      "Reflection obeys law: angle of incidence equals angle of reflection",
      "Refraction occurs due to change in speed of light in different mediums",
      "Mirrors demonstrate reflection; lenses demonstrate refraction",
      "Water appears shallower than it actually is due to refraction"
    ],
    "faqs": [
      {
        "q": "Why does a stick appear bent in water?",
        "a": "Light from underwater refraction bends at water surface, changing direction. Our brain interprets straight light path, making stick appear bent."
      },
      {
        "q": "Can refraction occur without reflection?",
        "a": "Mostly yes, but at boundaries, some light always reflects while some refracts. The ratio depends on angle and mediums."
      },
      {
        "q": "Why does refraction happen?",
        "a": "Light travels at different speeds in different mediums. Slower speed bends light toward normal; faster speed bends away."
      }
    ]
  },
  {
    "slug": "metals-and-non-metals",
    "title": "Difference Between Metals and Non-metals",
    "termA": "Metals",
    "termB": "Non-metals",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Metals and non-metals are two major categories of elements with contrasting properties, fundamental for CBSE Class 10 Chemistry. Understanding their differences explains everyday materials and reactions.",
    "table": [
      {
        "aspect": "Lustre",
        "a": "Shiny and lustrous",
        "b": "Dull, not shiny"
      },
      {
        "aspect": "Conductivity",
        "a": "Conduct heat and electricity",
        "b": "Poor conductors (except graphite)"
      },
      {
        "aspect": "Malleability",
        "a": "Can be hammered into sheets",
        "b": "Brittle, break easily"
      },
      {
        "aspect": "Density",
        "a": "Generally high density",
        "b": "Generally low density"
      },
      {
        "aspect": "Oxides",
        "a": "Basic oxides",
        "b": "Acidic oxides"
      }
    ],
    "keyPoints": [
      "Metals are shiny, conductive, and malleable; non-metals are dull, non-conductive, and brittle",
      "Metals form positive ions by losing electrons; non-metals form negative ions by gaining electrons",
      "Graphite is an exception - non-metal that conducts electricity",
      "Most elements are metals; fewer are non-metals"
    ],
    "faqs": [
      {
        "q": "Why can metals conduct electricity?",
        "a": "Metals have free electrons that move easily through their structure, allowing electric current to flow."
      },
      {
        "q": "Is carbon a metal or non-metal?",
        "a": "Carbon is a non-metal, but graphite (form of carbon) conducts electricity due to delocalized electrons."
      },
      {
        "q": "Why do metals feel hot when heated?",
        "a": "Metals conduct heat quickly through free electrons, spreading heat rapidly throughout the material."
      }
    ]
  },
  {
    "slug": "physical-and-chemical-change",
    "title": "Difference Between Physical and Chemical Change",
    "termA": "Physical Change",
    "termB": "Chemical Change",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Physical and chemical changes are two types of changes matter undergoes, essential for CBSE Class 9 Chemistry. Distinguishing them is crucial for understanding chemical reactions.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Change in form without new substance",
        "b": "Formation of new substance with new properties"
      },
      {
        "aspect": "Reversibility",
        "a": "Usually reversible",
        "b": "Mostly irreversible"
      },
      {
        "aspect": "Chemical bonds",
        "a": "Bonds not broken",
        "b": "Bonds broken and formed"
      },
      {
        "aspect": "Energy change",
        "a": "Minimal energy change",
        "b": "Significant energy absorbed or released"
      },
      {
        "aspect": "Examples",
        "a": "Melting, freezing, cutting, dissolving",
        "b": "Burning, rusting, cooking, digestion"
      }
    ],
    "keyPoints": [
      "Physical change alters appearance but not substance; chemical change creates new substances",
      "Physical changes are reversible by physical means; chemical changes require chemical reactions",
      "Burning, rusting, cooking are chemical; melting, cutting, dissolving are physical",
      "Chemical changes have color change, gas formation, heat/light release, precipitate formation"
    ],
    "faqs": [
      {
        "q": "Is melting ice a physical or chemical change?",
        "a": "Physical change. Ice becomes water but both are H2O. No new substance forms and it can be reversed."
      },
      {
        "q": "Why is burning a chemical change?",
        "a": "Burning (combustion) breaks chemical bonds in fuel and combines with oxygen, forming new substances like CO2 and H2O."
      },
      {
        "q": "Can a physical change become chemical?",
        "a": "Yes, dissolving salt in water is physical, but dissolving reactive substances may lead to chemical reaction."
      }
    ]
  },
  {
    "slug": "rational-and-irrational-numbers",
    "title": "Difference Between Rational and Irrational Numbers",
    "termA": "Rational Numbers",
    "termB": "Irrational Numbers",
    "category": "Maths",
    "classLevel": "Class 9",
    "intro": "Rational and irrational numbers complete the real number system, essential for CBSE Class 9 Mathematics. Understanding their differences is fundamental to advanced math.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Can be expressed as p/q (p,q integers, q≠0)",
        "b": "Cannot be expressed as fraction of integers"
      },
      {
        "aspect": "Decimal form",
        "a": "Terminating or repeating decimal",
        "b": "Non-terminating, non-repeating decimal"
      },
      {
        "aspect": "Examples",
        "a": "1/2, 3/4, 0.5, 0.333...",
        "b": "√2, √3, π, e"
      },
      {
        "aspect": "Density on number line",
        "a": "Infinite but countable",
        "b": "Infinite and uncountable"
      },
      {
        "aspect": "Can be written as integer ratio",
        "a": "Yes",
        "b": "No"
      }
    ],
    "keyPoints": [
      "Rational = p/q where p and q are integers; irrational cannot be expressed as simple fraction",
      "Repeating decimals are rational (0.333... = 1/3); non-repeating are irrational (π = 3.14159...)",
      "√2 is irrational because it cannot be expressed as fraction of two integers",
      "Between any two rational numbers, infinite irrational numbers exist"
    ],
    "faqs": [
      {
        "q": "Is zero rational or irrational?",
        "a": "Zero is rational. 0 = 0/1, expressed as fraction of integers."
      },
      {
        "q": "Is √4 rational or irrational?",
        "a": "Rational. √4 = 2 = 2/1, expressed as integer ratio."
      },
      {
        "q": "Can irrational numbers be negative?",
        "a": "Yes. -π and -√2 are irrational negative numbers."
      }
    ]
  },
  {
    "slug": "prime-and-composite-numbers",
    "title": "Difference Between Prime and Composite Numbers",
    "termA": "Prime Numbers",
    "termB": "Composite Numbers",
    "category": "Maths",
    "classLevel": "Class 6",
    "intro": "Prime and composite numbers are fundamental classifications in mathematics, important for CBSE Class 6 onwards. Understanding them is essential for number theory and factorization.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Natural number with exactly 2 factors",
        "b": "Natural number with more than 2 factors"
      },
      {
        "aspect": "Factors",
        "a": "1 and the number itself",
        "b": "1, itself, and other numbers"
      },
      {
        "aspect": "Divisibility",
        "a": "Divisible only by 1 and itself",
        "b": "Divisible by multiple numbers"
      },
      {
        "aspect": "Examples",
        "a": "2, 3, 5, 7, 11, 13, 17, 19",
        "b": "4, 6, 8, 9, 10, 12, 14, 15"
      },
      {
        "aspect": "Is 1 included?",
        "a": "No, 1 is neither prime nor composite",
        "b": "No, 1 is neither prime nor composite"
      }
    ],
    "keyPoints": [
      "Prime numbers have exactly two factors: 1 and itself",
      "Composite numbers have at least three factors",
      "2 is the only even prime number",
      "Prime numbers are building blocks for all other numbers through factorization"
    ],
    "faqs": [
      {
        "q": "Why is 1 not considered prime?",
        "a": "Definition of prime requires exactly two distinct factors. 1 has only one factor (itself), so it is neither prime nor composite."
      },
      {
        "q": "Is 2 the smallest prime number?",
        "a": "Yes, 2 is the smallest and only even prime number."
      },
      {
        "q": "How many prime numbers are there?",
        "a": "Infinitely many prime numbers exist, proven by Euclid. New primes keep being discovered."
      }
    ]
  },
  {
    "slug": "area-and-perimeter",
    "title": "Difference Between Area and Perimeter",
    "termA": "Area",
    "termB": "Perimeter",
    "category": "Maths",
    "classLevel": "Class 6",
    "intro": "Area and perimeter are two important measurements of shapes, essential for CBSE Class 6 Mathematics and real-world applications. Understanding their differences helps solve geometry problems.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Space enclosed inside a shape",
        "b": "Distance around the boundary of a shape"
      },
      {
        "aspect": "Measurement",
        "a": "Two-dimensional (length × width)",
        "b": "One-dimensional (sum of sides)"
      },
      {
        "aspect": "Unit",
        "a": "Square units (cm², m², etc.)",
        "b": "Linear units (cm, m, etc.)"
      },
      {
        "aspect": "Formula for rectangle",
        "a": "A = length × breadth",
        "b": "P = 2(length + breadth)"
      },
      {
        "aspect": "Formula for circle",
        "a": "A = πr²",
        "b": "P = 2πr (circumference)"
      }
    ],
    "keyPoints": [
      "Area measures space inside; perimeter measures distance around",
      "Area has square units; perimeter has linear units",
      "Same perimeter can enclose different areas",
      "Circle's perimeter is called circumference"
    ],
    "faqs": [
      {
        "q": "Can two shapes have same area but different perimeter?",
        "a": "Yes. Rectangle 4×2 has area 8 and perimeter 12; square with side √8 has area 8 but different perimeter."
      },
      {
        "q": "Why is area in square units?",
        "a": "Area measures two dimensions (length × width), resulting in square units."
      },
      {
        "q": "What is the relationship between area and perimeter?",
        "a": "No fixed relationship. Different shapes with same perimeter can have different areas and vice versa."
      }
    ]
  },
  {
    "slug": "weather-and-climate",
    "title": "Difference Between Weather and Climate",
    "termA": "Weather",
    "termB": "Climate",
    "category": "Science",
    "classLevel": "Class 9",
    "intro": "Weather and climate are related but distinct atmospheric concepts, essential for CBSE Class 9 Science. Understanding their differences is crucial for environmental awareness in India.",
    "table": [
      {
        "aspect": "Time scale",
        "a": "Short-term (hours to days)",
        "b": "Long-term (years to decades)"
      },
      {
        "aspect": "Definition",
        "a": "Atmospheric condition at a specific place",
        "b": "Average weather pattern over long period"
      },
      {
        "aspect": "Changes",
        "a": "Changes frequently and rapidly",
        "b": "Changes slowly and gradually"
      },
      {
        "aspect": "Prediction",
        "a": "Can be predicted for few days",
        "b": "Cannot be precisely predicted"
      },
      {
        "aspect": "Example",
        "a": "Today's rainfall, temperature",
        "b": "Tropical climate of India, rainfall pattern"
      }
    ],
    "keyPoints": [
      "Weather is short-term and changing; climate is long-term and stable average",
      "Weather depends on many variables; climate depends on geographical location",
      "India experiences monsoon rains due to its climate; specific rain today is weather",
      "Climate change affects weather patterns globally"
    ],
    "faqs": [
      {
        "q": "Can weather and climate both change?",
        "a": "Yes. Weather changes daily. Climate changes over decades due to natural cycles and human activities."
      },
      {
        "q": "How does monsoon relate to weather and climate?",
        "a": "Monsoon is part of India's climate pattern. Specific rain today is weather within the monsoon climate."
      },
      {
        "q": "Is one cold day a sign of climate change?",
        "a": "No, one cold day is weather. Climate change requires analysis of long-term temperature trends."
      }
    ]
  },
  {
    "slug": "hardware-and-software",
    "title": "Difference Between Hardware and Software",
    "termA": "Hardware",
    "termB": "Software",
    "category": "Computer & GK",
    "classLevel": "Class 10",
    "intro": "Hardware and software are two essential components of computers, important for CBSE Class 10 Computer Science. Understanding their relationship is fundamental to computer literacy.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Physical components of computer",
        "b": "Programs and instructions for computer"
      },
      {
        "aspect": "Tangible",
        "a": "Can be touched and seen",
        "b": "Cannot be touched, only seen"
      },
      {
        "aspect": "Examples",
        "a": "CPU, RAM, keyboard, mouse, monitor",
        "b": "Windows, MS Office, Chrome, WhatsApp"
      },
      {
        "aspect": "Can be replaced",
        "a": "Yes, physically replaceable",
        "b": "Can be reinstalled or updated"
      },
      {
        "aspect": "Durability",
        "a": "Wears out mechanically over time",
        "b": "Does not wear out, can become outdated"
      }
    ],
    "keyPoints": [
      "Hardware is physical equipment; software is digital instructions",
      "Hardware needs software to function; software needs hardware to run",
      "Virus is software that damages hardware functioning",
      "Upgrading hardware requires buying new parts; upgrading software is often free"
    ],
    "faqs": [
      {
        "q": "Can software work without hardware?",
        "a": "No, software must run on physical hardware (CPU, RAM, storage) to execute instructions."
      },
      {
        "q": "What is firmware?",
        "a": "Firmware is software embedded in hardware (BIOS in motherboard). It bridges hardware and software."
      },
      {
        "q": "Why is software called software?",
        "a": "Compared to physical 'hard' ware, software is flexible and 'soft' - easily modified and updated."
      }
    ]
  },
  {
    "slug": "ram-and-rom",
    "title": "Difference Between RAM and ROM",
    "termA": "RAM",
    "termB": "ROM",
    "category": "Computer & GK",
    "classLevel": "Class 10",
    "intro": "RAM and ROM are two types of computer memory with different functions, important for CBSE Class 10 Computer Science. Understanding their differences is essential for computer operation.",
    "table": [
      {
        "aspect": "Full form",
        "a": "Random Access Memory",
        "b": "Read-Only Memory"
      },
      {
        "aspect": "Function",
        "a": "Temporary storage during operation",
        "b": "Permanent storage of firmware"
      },
      {
        "aspect": "Data retention",
        "a": "Loses data when powered off",
        "b": "Retains data permanently"
      },
      {
        "aspect": "Access speed",
        "a": "Very fast",
        "b": "Slower than RAM"
      },
      {
        "aspect": "Write capability",
        "a": "Can read and write",
        "b": "Can only read (in normal operation)"
      }
    ],
    "keyPoints": [
      "RAM is volatile memory; ROM is non-volatile memory",
      "RAM stores running programs and data; ROM stores firmware and BIOS",
      "More RAM improves computer performance",
      "ROM cannot be easily modified to protect system files"
    ],
    "faqs": [
      {
        "q": "Why do we need RAM if ROM exists?",
        "a": "ROM is too slow and limited for running programs. RAM provides fast temporary storage for active programs and data."
      },
      {
        "q": "Can ROM data be written to?",
        "a": "ROM normally cannot be written to. Flash ROM can be rewritten but requires special procedures."
      },
      {
        "q": "What happens when RAM is full?",
        "a": "Computer uses hard disk as virtual memory, which is slower. Performance decreases significantly."
      }
    ]
  },
  {
    "slug": "communism-and-capitalism",
    "title": "Difference Between Communism and Capitalism",
    "termA": "Communism",
    "termB": "Capitalism",
    "category": "Social Science",
    "classLevel": "Class 10",
    "intro": "Communism and capitalism are two major economic and political systems, essential for CBSE Class 10 Social Science. Understanding their differences helps analyze world history and economies.",
    "table": [
      {
        "aspect": "Ownership",
        "a": "State owns all property and resources",
        "b": "Individuals own property and resources"
      },
      {
        "aspect": "Economy type",
        "a": "Centrally planned economy",
        "b": "Market economy (supply and demand)"
      },
      {
        "aspect": "Wealth distribution",
        "a": "Equal distribution for all",
        "b": "Based on individual effort and investment"
      },
      {
        "aspect": "Individual freedom",
        "a": "Limited, state controls most decisions",
        "b": "Maximum individual freedom"
      },
      {
        "aspect": "Examples",
        "a": "Soviet Union (historically), China, North Korea",
        "b": "United States, India, United Kingdom"
      }
    ],
    "keyPoints": [
      "Communism advocates collective ownership; capitalism supports individual ownership",
      "Communist economy is planned by state; capitalist economy is market-driven",
      "Communism aims for equality; capitalism rewards individual achievement",
      "Pure forms of both are theoretical; most countries are mixed economies"
    ],
    "faqs": [
      {
        "q": "Is India capitalist or communist?",
        "a": "India is a mixed economy with capitalism at core but socialist policies (public education, healthcare) to ensure welfare."
      },
      {
        "q": "Why did Soviet communist system fail?",
        "a": "Centralized planning proved inefficient, individual incentives were low, and political rigidity prevented adaptation."
      },
      {
        "q": "Can communism and capitalism coexist?",
        "a": "Pure coexistence is difficult, but mixed economies combine capitalist markets with socialist welfare programs."
      }
    ]
  },
  {
    "slug": "democracy-and-dictatorship",
    "title": "Difference Between Democracy and Dictatorship",
    "termA": "Democracy",
    "termB": "Dictatorship",
    "category": "Social Science",
    "classLevel": "Class 9",
    "intro": "Democracy and dictatorship are two contrasting forms of government, fundamental for CBSE Class 9 Social Science. Understanding their differences is essential for civic awareness.",
    "table": [
      {
        "aspect": "Power source",
        "a": "People hold power through voting",
        "b": "Single ruler holds absolute power"
      },
      {
        "aspect": "Decision making",
        "a": "Made by elected representatives",
        "b": "Made by dictator unilaterally"
      },
      {
        "aspect": "Right to vote",
        "a": "Citizens have voting rights",
        "b": "No voting rights for citizens"
      },
      {
        "aspect": "Freedom of speech",
        "a": "Protected and encouraged",
        "b": "Suppressed and punished"
      },
      {
        "aspect": "Government change",
        "a": "Through elections peacefully",
        "b": "Through revolution or coup"
      }
    ],
    "keyPoints": [
      "Democracy is rule by people; dictatorship is rule by one person",
      "India is a democratic republic with universal adult suffrage",
      "Democratic governments are accountable to citizens; dictators are not",
      "Democratic institutions and laws protect individual rights"
    ],
    "faqs": [
      {
        "q": "Is India a true democracy?",
        "a": "India is the world's largest democracy with free elections, independent judiciary, and constitutional protections for citizens."
      },
      {
        "q": "Can dictatorship provide better economic growth?",
        "a": "Short-term growth is possible but unsustainable. Democratic institutions provide long-term stability and innovation."
      },
      {
        "q": "What are disadvantages of democracy?",
        "a": "Slower decision-making, potential for corruption, and majority tyranny. But protections exist through checks and balances."
      }
    ]
  },
  {
    "slug": "conductor-and-insulator",
    "title": "Difference Between Conductor and Insulator",
    "termA": "Conductor",
    "termB": "Insulator",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Conductors and insulators are materials with vastly different electrical properties, essential for CBSE Class 10 Physics. Understanding their differences is crucial for electrical safety.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Allows electric current to flow easily",
        "b": "Prevents electric current from flowing"
      },
      {
        "aspect": "Resistance",
        "a": "Very low resistance",
        "b": "Very high resistance"
      },
      {
        "aspect": "Free electrons",
        "a": "Many free electrons available",
        "b": "Few or no free electrons"
      },
      {
        "aspect": "Examples",
        "a": "Copper, aluminum, silver, iron",
        "b": "Rubber, plastic, glass, wood"
      },
      {
        "aspect": "Application",
        "a": "Electrical wiring, motors, generators",
        "b": "Wire insulation, safety equipment"
      }
    ],
    "keyPoints": [
      "Conductors have free electrons for current flow; insulators hold electrons tightly",
      "Metals are typically conductors; non-metals are typically insulators",
      "Conductors are chosen for transmitting electricity; insulators for safety",
      "Some materials (semiconductors) fall between conductors and insulators"
    ],
    "faqs": [
      {
        "q": "Why is copper used for electrical wiring?",
        "a": "Copper is excellent conductor with low resistance and cost-effective. It efficiently carries electricity with minimal energy loss."
      },
      {
        "q": "What is a semiconductor?",
        "a": "Semiconductors (silicon, germanium) have properties between conductors and insulators, controllable for use in electronics."
      },
      {
        "q": "Can insulators conduct electricity under extreme conditions?",
        "a": "Yes, at very high voltages or temperatures, insulators can break down and conduct electricity dangerously."
      }
    ]
  },
  {
    "slug": "potential-and-kinetic-energy",
    "title": "Difference Between Potential and Kinetic Energy",
    "termA": "Potential Energy",
    "termB": "Kinetic Energy",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Potential and kinetic energy are two forms of mechanical energy, fundamental for CBSE Class 9 Physics. Understanding their conversion is key to energy conservation.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Energy due to position or state",
        "b": "Energy due to motion"
      },
      {
        "aspect": "Depends on",
        "a": "Height, mass, and gravitational field",
        "b": "Mass and velocity"
      },
      {
        "aspect": "Formula",
        "a": "PE = mgh (gravitational)",
        "b": "KE = 1/2 mv²"
      },
      {
        "aspect": "Object at rest",
        "a": "Has PE if at height",
        "b": "Zero, object is not moving"
      },
      {
        "aspect": "Example",
        "a": "Water in a raised reservoir",
        "b": "Falling water from dam"
      }
    ],
    "keyPoints": [
      "PE depends on position; KE depends on motion",
      "At highest point, PE is maximum and KE is minimum",
      "At lowest point, PE is minimum and KE is maximum",
      "Total mechanical energy (PE + KE) remains constant in absence of friction"
    ],
    "faqs": [
      {
        "q": "Why does a ball slow down as it rolls uphill?",
        "a": "Kinetic energy converts to potential energy as the ball rises. Speed decreases while gravitational PE increases."
      },
      {
        "q": "Can an object have both PE and KE simultaneously?",
        "a": "Yes. A ball rolling on a hill has KE (motion) and PE (height) at the same time."
      },
      {
        "q": "What happens to PE and KE when a ball falls from a height?",
        "a": "As ball falls, PE decreases and KE increases. Total energy remains constant (ignoring air resistance)."
      }
    ]
  },
  {
    "slug": "solid-liquid-and-gas",
    "title": "Difference Between Solid and Liquid",
    "termA": "Solid",
    "termB": "Liquid",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Solids and liquids are two states of matter with distinct physical properties, essential for CBSE Class 9 Chemistry. Understanding their differences explains material behavior.",
    "table": [
      {
        "aspect": "Shape",
        "a": "Fixed and definite shape",
        "b": "No fixed shape, takes container shape"
      },
      {
        "aspect": "Volume",
        "a": "Fixed and definite volume",
        "b": "Fixed volume but changes shape"
      },
      {
        "aspect": "Particles",
        "a": "Tightly packed in fixed positions",
        "b": "Closely packed but can move"
      },
      {
        "aspect": "Compressibility",
        "a": "Nearly incompressible",
        "b": "Nearly incompressible"
      },
      {
        "aspect": "Fluidity",
        "a": "Non-fluent",
        "b": "Fluent, flows easily"
      }
    ],
    "keyPoints": [
      "Solids have fixed shape and volume; liquids have fixed volume but variable shape",
      "Particles in solids vibrate in place; in liquids can move freely",
      "Melting converts solid to liquid; freezing converts liquid to solid",
      "Both solids and liquids are nearly incompressible unlike gases"
    ],
    "faqs": [
      {
        "q": "What is amorphous solid?",
        "a": "Amorphous solids (glass, plastic) lack fixed crystal structure. They flow slowly like liquids but appear solid."
      },
      {
        "q": "Why do liquids have no fixed shape?",
        "a": "Particles in liquids have kinetic energy to move and rearrange, allowing liquid to conform to container shape."
      },
      {
        "q": "Can a solid become liquid without heating?",
        "a": "Yes, some solids can melt under pressure (ice to water under high pressure). But heat is the common method."
      }
    ]
  },
  {
    "slug": "conduction-and-convection",
    "title": "Difference Between Conduction and Convection",
    "termA": "Conduction",
    "termB": "Convection",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Conduction and convection are two modes of heat transfer, essential for CBSE Class 10 Physics. Understanding their mechanisms explains how heat spreads through materials.",
    "table": [
      {
        "aspect": "Mechanism",
        "a": "Heat transfer through direct contact",
        "b": "Heat transfer through fluid movement"
      },
      {
        "aspect": "Medium",
        "a": "Occurs in solids, liquids, gases",
        "b": "Occurs only in liquids and gases"
      },
      {
        "aspect": "Particle movement",
        "a": "Particles vibrate in place",
        "b": "Particles move and carry heat"
      },
      {
        "aspect": "Speed",
        "a": "Relatively slower",
        "b": "Relatively faster"
      },
      {
        "aspect": "Example",
        "a": "Spoon handle heating when placed in hot tea",
        "b": "Hot water rising in pot, cool water sinking"
      }
    ],
    "keyPoints": [
      "Conduction: heat spreads through material without particle movement",
      "Convection: heat spreads through movement of fluid particles",
      "Metals are good conductors; liquids convect easily",
      "Vacuum allows neither conduction nor convection (radiation only)"
    ],
    "faqs": [
      {
        "q": "Why is convection faster than conduction?",
        "a": "Convection involves mass movement of fluid carrying energy. Conduction depends on slow heat diffusion through vibrating particles."
      },
      {
        "q": "Does radiation involve conduction or convection?",
        "a": "Neither. Radiation is heat transfer through electromagnetic waves, no medium required."
      },
      {
        "q": "How does a thermos bottle prevent heat loss?",
        "a": "Vacuum prevents conduction and convection. Reflective surfaces minimize radiation loss."
      }
    ]
  },
  {
    "slug": "work-and-energy",
    "title": "Difference Between Work and Energy",
    "termA": "Work",
    "termB": "Energy",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Work and energy are related but distinct concepts in physics, fundamental for CBSE Class 9 Physics. Understanding their relationship clarifies the work-energy theorem.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Force applied through distance",
        "b": "Capacity to do work"
      },
      {
        "aspect": "Formula",
        "a": "W = F × d × cos θ",
        "b": "E = work done"
      },
      {
        "aspect": "Occurrence",
        "a": "Work is done by a force",
        "b": "Energy is possessed by object"
      },
      {
        "aspect": "Nature",
        "a": "Process or action",
        "b": "Property or state"
      },
      {
        "aspect": "Units",
        "a": "Joule (J)",
        "b": "Joule (J)"
      }
    ],
    "keyPoints": [
      "Work is transfer of energy; energy is capacity to do work",
      "Work = Force × Displacement when force and displacement are parallel",
      "When force is perpendicular to displacement, work done is zero",
      "Work-energy theorem: net work done equals change in kinetic energy"
    ],
    "faqs": [
      {
        "q": "Is holding a heavy box above ground doing work?",
        "a": "No, no work is done because there is no displacement. Work requires both force and movement in force direction."
      },
      {
        "q": "Can work be negative?",
        "a": "Yes, if force opposes motion (e.g., friction opposing movement). Negative work reduces kinetic energy."
      },
      {
        "q": "What is relationship between work and power?",
        "a": "Power = Work / Time. Power measures how fast work is done."
      }
    ]
  },
  {
    "slug": "frequency-and-wavelength",
    "title": "Difference Between Frequency and Wavelength",
    "termA": "Frequency",
    "termB": "Wavelength",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Frequency and wavelength are properties of waves, essential for CBSE Class 10 Physics. Understanding their inverse relationship is crucial for wave phenomena.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Number of waves per unit time",
        "b": "Distance between consecutive crests/troughs"
      },
      {
        "aspect": "Symbol",
        "a": "f or ν (nu)",
        "b": "λ (lambda)"
      },
      {
        "aspect": "Unit",
        "a": "Hertz (Hz) or cycles per second",
        "b": "Meter (m) or nanometer (nm)"
      },
      {
        "aspect": "Relationship",
        "a": "Inversely proportional to wavelength",
        "b": "Inversely proportional to frequency"
      },
      {
        "aspect": "Wave equation",
        "a": "v = f × λ",
        "b": "v = f × λ"
      }
    ],
    "keyPoints": [
      "Frequency measures how often waves occur; wavelength measures spatial distance",
      "Higher frequency means shorter wavelength (inverse relationship)",
      "Speed of wave = Frequency × Wavelength (v = f × λ)",
      "For light, higher frequency means shorter wavelength and higher energy"
    ],
    "faqs": [
      {
        "q": "Which has higher frequency: red light or blue light?",
        "a": "Blue light has higher frequency and shorter wavelength. Red light has lower frequency and longer wavelength."
      },
      {
        "q": "Why is the relationship between frequency and wavelength inverse?",
        "a": "Wave speed is constant. To maintain same speed, if wavelength increases, frequency must decrease."
      },
      {
        "q": "What is the frequency of visible light?",
        "a": "Visible light has frequency range 4×10^14 to 8×10^14 Hz, corresponding to wavelength 400-700 nm."
      }
    ]
  },
  {
    "slug": "concave-and-convex-mirror",
    "title": "Difference Between Concave and Convex Mirror",
    "termA": "Concave Mirror",
    "termB": "Convex Mirror",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Concave and convex mirrors are spherical mirrors with opposite curvatures, essential for CBSE Class 10 Physics optics. Understanding their properties is vital for image formation.",
    "table": [
      {
        "aspect": "Shape",
        "a": "Curved inward (converging)",
        "b": "Curved outward (diverging)"
      },
      {
        "aspect": "Focal length",
        "a": "Positive",
        "b": "Negative"
      },
      {
        "aspect": "Image type",
        "a": "Real or virtual (depends on object position)",
        "b": "Always virtual"
      },
      {
        "aspect": "Image nature",
        "a": "Inverted real; erect virtual magnified",
        "b": "Always erect and diminished"
      },
      {
        "aspect": "Uses",
        "a": "Shaving mirrors, telescopes, reflectors",
        "b": "Side mirrors, security mirrors"
      }
    ],
    "keyPoints": [
      "Concave mirror converges rays at focal point; convex mirror diverges rays",
      "Concave mirror can form real images; convex always forms virtual images",
      "Convex mirrors have wider field of view but smaller images",
      "Both follow law of reflection: angle of incidence equals angle of reflection"
    ],
    "faqs": [
      {
        "q": "Can a convex mirror form real image?",
        "a": "No, convex mirrors always diverge light, so they can only form virtual images."
      },
      {
        "q": "Why are car side mirrors convex?",
        "a": "Convex mirrors provide wider field of view with diminished image, allowing drivers to see more area safely."
      },
      {
        "q": "What is magnification in mirrors?",
        "a": "Magnification m = v/u (image distance/object distance). Negative magnification means inverted image."
      }
    ]
  },
  {
    "slug": "homogeneous-and-heterogeneous-mixture",
    "title": "Difference Between Homogeneous and Heterogeneous Mixture",
    "termA": "Homogeneous Mixture",
    "termB": "Heterogeneous Mixture",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Homogeneous and heterogeneous mixtures are classifications based on visual uniformity, essential for CBSE Class 9 Chemistry. Understanding their properties helps identify and separate mixtures.",
    "table": [
      {
        "aspect": "Appearance",
        "a": "Uniform, single phase",
        "b": "Non-uniform, multiple phases visible"
      },
      {
        "aspect": "Components",
        "a": "Components evenly distributed",
        "b": "Components unevenly distributed"
      },
      {
        "aspect": "Separation",
        "a": "Difficult to separate by simple methods",
        "b": "Easy to separate by simple methods"
      },
      {
        "aspect": "Examples",
        "a": "Salt water, sugar solution, air",
        "b": "Sand and iron filing, oil and water"
      },
      {
        "aspect": "Visibility",
        "a": "Component particles invisible",
        "b": "Component particles visible"
      }
    ],
    "keyPoints": [
      "Homogeneous mixture has uniform composition throughout",
      "Heterogeneous mixture has visible different components",
      "Homogeneous: single phase; heterogeneous: multiple phases",
      "Solutions are homogeneous; suspensions are heterogeneous"
    ],
    "faqs": [
      {
        "q": "Is milk homogeneous or heterogeneous?",
        "a": "Milk appears homogeneous but is colloidal (heterogeneous at microscopic level). For practical purposes, it is homogeneous."
      },
      {
        "q": "Can homogeneous mixture be separated into components?",
        "a": "Yes, but requires physical methods like distillation, crystallization. Evaporation separates salt from salt water."
      },
      {
        "q": "What is the difference between mixture and alloy?",
        "a": "Alloys are metallic mixtures (usually homogeneous) where metals combine. Most are homogeneous solid solutions."
      }
    ]
  },
  {
    "slug": "velocity-and-acceleration",
    "title": "Difference Between Velocity and Acceleration",
    "termA": "Velocity",
    "termB": "Acceleration",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Velocity and acceleration describe motion with different aspects, fundamental for CBSE Class 9 Physics. Understanding their distinction is crucial for kinematics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Rate of change of displacement",
        "b": "Rate of change of velocity"
      },
      {
        "aspect": "Formula",
        "a": "v = Δs/Δt",
        "b": "a = Δv/Δt"
      },
      {
        "aspect": "Nature",
        "a": "Vector quantity",
        "b": "Vector quantity"
      },
      {
        "aspect": "Units",
        "a": "m/s",
        "b": "m/s²"
      },
      {
        "aspect": "Zero value",
        "a": "Can be zero if stationary",
        "b": "Can be zero even if moving (constant velocity)"
      }
    ],
    "keyPoints": [
      "Velocity describes speed and direction of motion",
      "Acceleration describes change in velocity (speed or direction change)",
      "Constant velocity means zero acceleration",
      "Uniform acceleration: straight-line motion; non-uniform: curved path"
    ],
    "faqs": [
      {
        "q": "Can acceleration be negative?",
        "a": "Yes, negative acceleration is deceleration (velocity decreasing in reference direction)."
      },
      {
        "q": "Can an object have velocity but no acceleration?",
        "a": "Yes, moving at constant velocity in straight line. Acceleration is zero."
      },
      {
        "q": "What is centripetal acceleration?",
        "a": "Acceleration directed toward center in circular motion. Speed may be constant but direction changes, so acceleration exists."
      }
    ]
  },
  {
    "slug": "reflex-and-voluntary-action",
    "title": "Difference Between Reflex and Voluntary Action",
    "termA": "Reflex Action",
    "termB": "Voluntary Action",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Reflex and voluntary actions are two types of neural responses, essential for CBSE Class 10 Biology. Understanding their differences explains nervous system functioning.",
    "table": [
      {
        "aspect": "Control",
        "a": "Involuntary, automatic response",
        "b": "Controlled by conscious thought"
      },
      {
        "aspect": "Brain involvement",
        "a": "Does not involve brain (spinal reflex)",
        "b": "Involves brain (cerebrum)"
      },
      {
        "aspect": "Speed",
        "a": "Very fast, immediate",
        "b": "Slower, requires thinking"
      },
      {
        "aspect": "Pathway",
        "a": "Reflex arc: receptor-spinal cord-effector",
        "b": "Sense organ-brain-muscles"
      },
      {
        "aspect": "Examples",
        "a": "Blinking, knee jerk, hand withdrawal from hot object",
        "b": "Walking, writing, eating, speaking"
      }
    ],
    "keyPoints": [
      "Reflex acts don't require brain processing; voluntary acts do",
      "Reflex arc involves three neurons: sensory, connector, motor",
      "Reflex actions protect body from immediate danger",
      "Both types of actions are essential for body functioning"
    ],
    "faqs": [
      {
        "q": "Can we control reflex actions?",
        "a": "No, true reflex actions are involuntary. However, we can suppress some reflexes with training (e.g., eye blink)."
      },
      {
        "q": "What is the fastest reflex?",
        "a": "Patellar (knee-jerk) reflex is one of fastest human reflexes, responding in about 50 milliseconds."
      },
      {
        "q": "Why are reflex actions important?",
        "a": "Reflex actions provide immediate protection from danger without waiting for brain processing, critical for survival."
      }
    ]
  },
  {
    "slug": "pollination-and-fertilisation",
    "title": "Difference Between Pollination and Fertilisation",
    "termA": "Pollination",
    "termB": "Fertilisation",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Pollination and fertilisation are two sequential processes in plant reproduction, essential for CBSE Class 10 Biology. Understanding their differences is vital for studying plant life cycles.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Transfer of pollen from anther to stigma",
        "b": "Fusion of male and female gametes"
      },
      {
        "aspect": "What happens",
        "a": "Pollen grain lands on stigma",
        "b": "Pollen nucleus fuses with ovule nucleus"
      },
      {
        "aspect": "Agents",
        "a": "Wind, insects, water, animals",
        "b": "Internal process after pollination"
      },
      {
        "aspect": "Location",
        "a": "Occurs outside the flower",
        "b": "Occurs inside the ovary"
      },
      {
        "aspect": "Result",
        "a": "Pollen tube grows toward ovule",
        "b": "Zygote formation, seed development"
      }
    ],
    "keyPoints": [
      "Pollination is transfer of pollen; fertilisation is fusion of gametes",
      "Pollination must occur before fertilisation can happen",
      "Cross-pollination in self-pollinating plants increases genetic variation",
      "Double fertilisation in angiosperms produces both zygote and endosperm"
    ],
    "faqs": [
      {
        "q": "Can fertilisation occur without pollination?",
        "a": "No, pollen must reach stigma (pollination) for pollen tube to grow and enable fertilisation."
      },
      {
        "q": "What is self-pollination?",
        "a": "Self-pollination is pollen transfer from anther to stigma of same flower. It produces genetically identical offspring."
      },
      {
        "q": "Why is cross-pollination preferred?",
        "a": "Cross-pollination produces genetic diversity, creating stronger, disease-resistant plants with better adaptability."
      }
    ]
  },
  {
    "slug": "longitudinal-and-transverse-wave",
    "title": "Difference Between Longitudinal and Transverse Wave",
    "termA": "Longitudinal Wave",
    "termB": "Transverse Wave",
    "category": "Physics",
    "classLevel": "Class 11",
    "intro": "Longitudinal and transverse waves are two types of mechanical waves with different particle motion, essential for CBSE Class 11 Physics. Understanding their properties explains wave behavior.",
    "table": [
      {
        "aspect": "Particle motion",
        "a": "Parallel to wave direction",
        "b": "Perpendicular to wave direction"
      },
      {
        "aspect": "Compression and rarefaction",
        "a": "Occurs, forms crests and troughs of pressure",
        "b": "Does not occur"
      },
      {
        "aspect": "Medium",
        "a": "Can travel through all mediums",
        "b": "Cannot travel through liquids and gases"
      },
      {
        "aspect": "Examples",
        "a": "Sound waves, seismic P-waves",
        "b": "Light waves, seismic S-waves, water waves"
      },
      {
        "aspect": "Speed",
        "a": "Generally slower",
        "b": "Light travels at 3×10⁸ m/s"
      }
    ],
    "keyPoints": [
      "Longitudinal waves compress and stretch medium; transverse waves oscillate perpendicular",
      "Sound is longitudinal; light is transverse",
      "Transverse waves cannot propagate through gases",
      "Ocean waves are transverse with some longitudinal component"
    ],
    "faqs": [
      {
        "q": "Why can transverse waves not travel through gas?",
        "a": "Gases have no resistance to shear stress. Transverse motion requires medium to oppose perpendicular motion."
      },
      {
        "q": "Is earthquake energy transverse or longitudinal?",
        "a": "Earthquakes produce both: P-waves (longitudinal, fast, arrive first) and S-waves (transverse, slower)."
      },
      {
        "q": "What is polarization in transverse waves?",
        "a": "Polarization restricts oscillation to one plane. Unpolarized light oscillates in all perpendicular directions."
      }
    ]
  },
  {
    "slug": "saturated-and-unsaturated-solution",
    "title": "Difference Between Saturated and Unsaturated Solution",
    "termA": "Saturated Solution",
    "termB": "Unsaturated Solution",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Saturated and unsaturated solutions represent different concentrations of dissolved solute, essential for CBSE Class 10 Chemistry. Understanding their properties helps predict solution behavior.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Maximum solute dissolved at given temperature",
        "b": "Less solute than maximum capacity"
      },
      {
        "aspect": "Can dissolve more",
        "a": "No, cannot dissolve more solute",
        "b": "Yes, can dissolve more solute"
      },
      {
        "aspect": "Supersaturation",
        "a": "Cannot become supersaturated",
        "b": "Can become saturated then supersaturated"
      },
      {
        "aspect": "Crystallization",
        "a": "Does not occur spontaneously",
        "b": "Occurs if temperature decreases"
      },
      {
        "aspect": "Example",
        "a": "Salt water at 36.3 g per 100 mL at 20°C",
        "b": "Salt water with 20 g per 100 mL"
      }
    ],
    "keyPoints": [
      "Saturation depends on solute, solvent, and temperature",
      "Increasing temperature usually increases solubility",
      "Supersaturated solution is unstable and crystallizes easily",
      "Solubility curves show relationship between temperature and saturation"
    ],
    "faqs": [
      {
        "q": "What happens when you add solute to saturated solution?",
        "a": "Solute does not dissolve and settles as sediment. Solution remains saturated at same concentration."
      },
      {
        "q": "Can unsaturated solution become saturated?",
        "a": "Yes, by adding more solute or decreasing temperature to reach saturation point."
      },
      {
        "q": "What is supersaturated solution?",
        "a": "Solution with more solute dissolved than saturation point, unstable state. Small disturbance causes crystallization."
      }
    ]
  },
  {
    "slug": "atom-and-molecule",
    "title": "Difference Between Atom and Molecule",
    "termA": "Atom",
    "termB": "Molecule",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Atoms and molecules are fundamental units in chemistry with distinct properties, essential for CBSE Class 9 Chemistry. Understanding their relationship is foundational to chemical knowledge.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Smallest particle of element",
        "b": "Smallest particle of compound or element"
      },
      {
        "aspect": "Composition",
        "a": "Single type of atom",
        "b": "Two or more atoms bonded together"
      },
      {
        "aspect": "Bond",
        "a": "No chemical bond within",
        "b": "Chemical bond holds atoms together"
      },
      {
        "aspect": "Smallest unit",
        "a": "Indivisible by chemical methods",
        "b": "Can be broken into atoms by chemical reaction"
      },
      {
        "aspect": "Examples",
        "a": "Oxygen atom (O), Carbon atom (C)",
        "b": "Water (H2O), Oxygen gas (O2)"
      }
    ],
    "keyPoints": [
      "Atom is basic unit of element; molecule is unit of compound",
      "Atoms combine through chemical bonds to form molecules",
      "Diatomic molecules (O2, N2) contain two atoms of same element",
      "Molecules are the smallest independent unit retaining properties"
    ],
    "faqs": [
      {
        "q": "Is oxygen gas (O2) a molecule?",
        "a": "Yes, O2 is a diatomic molecule containing two oxygen atoms bonded together."
      },
      {
        "q": "Can all atoms exist independently?",
        "a": "Noble gases exist as single atoms. Most elements form molecules or compounds to achieve stability."
      },
      {
        "q": "What is the relationship between atoms and molecules?",
        "a": "Atoms are building blocks. Molecules form when atoms bond. Water molecule (H2O) contains 3 atoms."
      }
    ]
  },
  {
    "slug": "speed-and-acceleration-rate",
    "title": "Difference Between Speed and Acceleration",
    "termA": "Speed",
    "termB": "Acceleration",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Speed and acceleration are distinct kinematic quantities, essential for CBSE Class 9 Physics. Understanding their differences clarifies motion analysis and calculations.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Distance covered per unit time",
        "b": "Change in velocity per unit time"
      },
      {
        "aspect": "Nature",
        "a": "Scalar quantity",
        "b": "Vector quantity"
      },
      {
        "aspect": "Measurement",
        "a": "Only magnitude",
        "b": "Magnitude and direction"
      },
      {
        "aspect": "Unit",
        "a": "m/s",
        "b": "m/s²"
      },
      {
        "aspect": "Zero value",
        "a": "Zero when stationary",
        "b": "Zero at constant speed"
      }
    ],
    "keyPoints": [
      "Speed measures how fast; acceleration measures how fast speed changes",
      "Constant speed means zero acceleration",
      "Acceleration includes change in speed or direction or both",
      "Braking provides negative acceleration (deceleration)"
    ],
    "faqs": [
      {
        "q": "Can an object have constant speed but non-zero acceleration?",
        "a": "Yes, in circular motion. Speed is constant but direction changes continuously, causing acceleration."
      },
      {
        "q": "What is the acceleration due to gravity?",
        "a": "9.8 m/s² (approximately 10 m/s²). All objects fall with this acceleration ignoring air resistance."
      },
      {
        "q": "Is velocity same as acceleration?",
        "a": "No, velocity is rate of displacement change; acceleration is rate of velocity change."
      }
    ]
  },
  {
    "slug": "real-and-virtual-image",
    "title": "Difference Between Real and Virtual Image",
    "termA": "Real Image",
    "termB": "Virtual Image",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Real and virtual images are formed by optical instruments with different characteristics, essential for CBSE Class 10 Physics optics. Understanding their differences explains image formation.",
    "table": [
      {
        "aspect": "Formation",
        "a": "Formed by actual convergence of light rays",
        "b": "Formed by extension of diverging rays"
      },
      {
        "aspect": "Location",
        "a": "In front of mirror/lens",
        "b": "Behind mirror/lens"
      },
      {
        "aspect": "Can be projected",
        "a": "Yes, on screen",
        "b": "No, cannot be on screen"
      },
      {
        "aspect": "Nature",
        "a": "Inverted",
        "b": "Erect"
      },
      {
        "aspect": "Size",
        "a": "Can be magnified or diminished",
        "b": "Usually magnified"
      }
    ],
    "keyPoints": [
      "Real images form where light rays actually converge",
      "Virtual images form where extended rays appear to converge",
      "Mirrors and lenses can form both types depending on object position",
      "Mirrors form real inverted images; magnifying glass forms virtual magnified images"
    ],
    "faqs": [
      {
        "q": "Can convex mirror form real image?",
        "a": "No, convex mirrors always diverge light, forming only virtual images."
      },
      {
        "q": "Why can real images be projected on screen?",
        "a": "Real images are formed by actual convergence of light rays, so light actually reaches the screen."
      },
      {
        "q": "What is magnification for virtual image?",
        "a": "Virtual images typically have magnification greater than 1 (magnified). Real images can have magnification less than 1."
      }
    ]
  },
  {
    "slug": "exothermic-and-endothermic-reaction",
    "title": "Difference Between Exothermic and Endothermic Reaction",
    "termA": "Exothermic Reaction",
    "termB": "Endothermic Reaction",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Exothermic and endothermic reactions represent two energy dynamics in chemical processes, essential for CBSE Class 10 Chemistry. Understanding their differences explains energy release and absorption.",
    "table": [
      {
        "aspect": "Energy transfer",
        "a": "Releases heat to surroundings",
        "b": "Absorbs heat from surroundings"
      },
      {
        "aspect": "Temperature change",
        "a": "Surroundings become hotter",
        "b": "Surroundings become cooler"
      },
      {
        "aspect": "Activation energy",
        "a": "Less than energy released",
        "b": "Greater than energy released"
      },
      {
        "aspect": "Examples",
        "a": "Burning, neutralization, rusting",
        "b": "Melting ice, evaporation, photosynthesis"
      },
      {
        "aspect": "ΔH (enthalpy)",
        "a": "Negative (ΔH < 0)",
        "b": "Positive (ΔH > 0)"
      }
    ],
    "keyPoints": [
      "Exothermic releases energy (heat, light); endothermic absorbs energy",
      "Most combustion reactions are exothermic",
      "Ice melting is endothermic; steam condensing is exothermic",
      "Energy diagram shows activation energy and heat released or absorbed"
    ],
    "faqs": [
      {
        "q": "Why is burning an exothermic reaction?",
        "a": "Burning combines fuel with oxygen, breaking and forming bonds. Net energy released is released as heat and light."
      },
      {
        "q": "Is respiration exothermic or endothermic?",
        "a": "Respiration is exothermic. It breaks down glucose, releasing energy used by cells for work."
      },
      {
        "q": "Can endothermic reaction be spontaneous?",
        "a": "Yes, if entropy increase is significant enough. Temperature must be sufficiently high for ΔG to be negative."
      }
    ]
  },
  {
    "slug": "evaporation-and-boiling",
    "title": "Difference Between Evaporation and Boiling",
    "termA": "Evaporation",
    "termB": "Boiling",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Evaporation is the conversion of liquid to vapor at any temperature from the surface. Boiling is rapid evaporation throughout the liquid at a fixed temperature.",
    "table": [
      {
        "aspect": "Temperature",
        "a": "Occurs at any temperature",
        "b": "Occurs at specific boiling point"
      },
      {
        "aspect": "Location",
        "a": "Occurs only at the surface",
        "b": "Occurs throughout the liquid"
      },
      {
        "aspect": "Bubble Formation",
        "a": "No bubble formation",
        "b": "Bubbles form throughout liquid"
      },
      {
        "aspect": "Speed",
        "a": "Slow process",
        "b": "Fast process"
      },
      {
        "aspect": "Pressure Dependence",
        "a": "Independent of atmospheric pressure",
        "b": "Depends on atmospheric pressure"
      },
      {
        "aspect": "Example",
        "a": "Wet clothes drying, puddles disappearing",
        "b": "Water reaching 100°C and turning to steam"
      }
    ],
    "keyPoints": [
      "Evaporation is a slow, surface-level phenomenon",
      "Boiling is violent and occurs throughout the liquid",
      "Boiling point changes with atmospheric pressure",
      "Both processes require latent heat of vaporisation"
    ],
    "faqs": [
      {
        "q": "Why does wet laundry dry even in cold weather?",
        "a": "Evaporation occurs continuously from the surface at any temperature, removing moisture from clothes."
      },
      {
        "q": "What is the boiling point of water at high altitude?",
        "a": "At high altitude, atmospheric pressure is lower, so water boils at temperatures below 100°C."
      },
      {
        "q": "Is sweating an example of evaporation?",
        "a": "Yes, sweat evaporates from skin surface, carrying away body heat and cooling the body."
      }
    ]
  },
  {
    "slug": "square-and-rectangle",
    "title": "Difference Between Square and Rectangle",
    "termA": "Square",
    "termB": "Rectangle",
    "category": "Maths",
    "classLevel": "Class 8",
    "intro": "A square is a quadrilateral with all four sides equal and all angles 90 degrees. A rectangle is a quadrilateral with opposite sides equal and all angles 90 degrees.",
    "table": [
      {
        "aspect": "Sides",
        "a": "All four sides equal",
        "b": "Opposite sides equal"
      },
      {
        "aspect": "Angles",
        "a": "All 90 degrees",
        "b": "All 90 degrees"
      },
      {
        "aspect": "Diagonals",
        "a": "Equal and bisect at 90 degrees",
        "b": "Equal but bisect at other angles"
      },
      {
        "aspect": "Area Formula",
        "a": "a^2",
        "b": "l × b"
      },
      {
        "aspect": "Perimeter",
        "a": "4a",
        "b": "2(l + b)"
      },
      {
        "aspect": "Special Case",
        "a": "Square is a special rectangle",
        "b": "Rectangle cannot be a square unless equal sides"
      }
    ],
    "keyPoints": [
      "Every square is a rectangle but not vice versa",
      "Squares have all sides equal while rectangles do not",
      "Diagonals of square bisect at right angles",
      "Area of square is always greater than rectangle of smaller perimeter"
    ],
    "faqs": [
      {
        "q": "Is a square a type of rectangle?",
        "a": "Yes, because a square satisfies all properties of a rectangle: opposite sides equal and all angles 90 degrees."
      },
      {
        "q": "Can a rectangle have all sides equal?",
        "a": "Yes, and when all sides are equal, the rectangle becomes a square."
      },
      {
        "q": "How do diagonals differ in squares and rectangles?",
        "a": "In squares, diagonals bisect each other at 90 degrees. In rectangles, they bisect each other but not at 90 degrees."
      }
    ]
  },
  {
    "slug": "square-and-rhombus",
    "title": "Difference Between Square and Rhombus",
    "termA": "Square",
    "termB": "Rhombus",
    "category": "Maths",
    "classLevel": "Class 8",
    "intro": "A square has all sides equal and all angles 90 degrees. A rhombus has all sides equal but angles are not 90 degrees.",
    "table": [
      {
        "aspect": "Angles",
        "a": "All angles are 90 degrees",
        "b": "Opposite angles are equal, but not 90 degrees"
      },
      {
        "aspect": "Diagonals",
        "a": "Equal in length and bisect at 90 degrees",
        "b": "Unequal in length and bisect at 90 degrees"
      },
      {
        "aspect": "Sides",
        "a": "All four sides equal",
        "b": "All four sides equal"
      },
      {
        "aspect": "Area Formula",
        "a": "a^2",
        "b": "(d1 × d2) / 2 or base × height"
      },
      {
        "aspect": "Perimeter",
        "a": "4a",
        "b": "4a"
      },
      {
        "aspect": "Shape",
        "a": "Regular quadrilateral",
        "b": "Irregular quadrilateral"
      }
    ],
    "keyPoints": [
      "All squares are rhombuses but not all rhombuses are squares",
      "Rhombus looks like a tilted square",
      "Both have all sides equal",
      "Only square has all angles equal to 90 degrees"
    ],
    "faqs": [
      {
        "q": "Is every square a rhombus?",
        "a": "Yes, because a square has all sides equal, which is the defining property of a rhombus."
      },
      {
        "q": "Can a rhombus have 90 degree angles?",
        "a": "Yes, if all four angles are 90 degrees, the rhombus becomes a square."
      },
      {
        "q": "Why are diagonals of a rhombus unequal?",
        "a": "Because the angles are not 90 degrees, the diagonals must have different lengths to satisfy the properties."
      }
    ]
  },
  {
    "slug": "sexual-and-asexual-reproduction",
    "title": "Difference Between Sexual and Asexual Reproduction",
    "termA": "Sexual Reproduction",
    "termB": "Asexual Reproduction",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Sexual reproduction involves fusion of gametes from two parents. Asexual reproduction involves a single parent and produces genetically identical offspring.",
    "table": [
      {
        "aspect": "Number of Parents",
        "a": "Two parents required",
        "b": "One parent required"
      },
      {
        "aspect": "Gamete Fusion",
        "a": "Male and female gametes fuse",
        "b": "No gamete fusion"
      },
      {
        "aspect": "Genetic Variation",
        "a": "Offspring are genetically different",
        "b": "Offspring are genetically identical clones"
      },
      {
        "aspect": "Time",
        "a": "Slower process",
        "b": "Faster process"
      },
      {
        "aspect": "Mitosis/Meiosis",
        "a": "Involves meiosis and mitosis",
        "b": "Involves only mitosis"
      },
      {
        "aspect": "Example",
        "a": "Humans, animals, most plants",
        "b": "Bacteria, hydra, vegetative propagation"
      }
    ],
    "keyPoints": [
      "Sexual reproduction increases genetic diversity",
      "Asexual reproduction is more efficient for rapid population growth",
      "Meiosis in sexual reproduction creates variation through crossing over",
      "Asexual offspring are exact copies unless mutations occur"
    ],
    "faqs": [
      {
        "q": "Why is genetic variation important in sexual reproduction?",
        "a": "Variation helps populations adapt to environmental changes and ensures species survival."
      },
      {
        "q": "Can plants reproduce both sexually and asexually?",
        "a": "Yes, many plants like potatoes reproduce asexually through vegetative parts and sexually through seeds."
      },
      {
        "q": "What is an advantage of asexual reproduction?",
        "a": "Asexual reproduction is faster and more energy-efficient, allowing rapid population growth in stable environments."
      }
    ]
  },
  {
    "slug": "aerobic-and-anaerobic-respiration",
    "title": "Difference Between Aerobic and Anaerobic Respiration",
    "termA": "Aerobic Respiration",
    "termB": "Anaerobic Respiration",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Aerobic respiration occurs with oxygen and releases more energy from glucose. Anaerobic respiration occurs without oxygen and releases less energy.",
    "table": [
      {
        "aspect": "Oxygen Requirement",
        "a": "Requires oxygen",
        "b": "Does not require oxygen"
      },
      {
        "aspect": "Location",
        "a": "Mitochondria",
        "b": "Cytoplasm"
      },
      {
        "aspect": "ATP Production",
        "a": "38 ATP molecules per glucose",
        "b": "2 ATP molecules per glucose"
      },
      {
        "aspect": "End Products",
        "a": "Carbon dioxide and water",
        "b": "Ethanol/lactic acid and carbon dioxide"
      },
      {
        "aspect": "Energy Released",
        "a": "2830 kJ per glucose",
        "b": "120 kJ per glucose"
      },
      {
        "aspect": "Example",
        "a": "Normal breathing in animals",
        "b": "Muscle fatigue, yeast fermentation"
      }
    ],
    "keyPoints": [
      "Aerobic respiration is much more efficient than anaerobic",
      "Anaerobic respiration in muscles produces lactic acid causing fatigue",
      "Fermentation by yeast produces alcohol and CO2",
      "Most organisms prefer aerobic respiration when oxygen is available"
    ],
    "faqs": [
      {
        "q": "Why do muscles produce lactic acid during intense exercise?",
        "a": "During intense activity, oxygen supply is insufficient, so muscles switch to anaerobic respiration producing lactic acid."
      },
      {
        "q": "Can all organisms perform anaerobic respiration?",
        "a": "No, some organisms are obligate aerobes and cannot survive without oxygen."
      },
      {
        "q": "What causes muscle soreness after exercise?",
        "a": "Lactic acid buildup from anaerobic respiration causes muscle soreness and fatigue."
      }
    ]
  },
  {
    "slug": "xylem-and-phloem",
    "title": "Difference Between Xylem and Phloem",
    "termA": "Xylem",
    "termB": "Phloem",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Xylem transports water and minerals upward from roots to leaves. Phloem transports food prepared by leaves to all parts of the plant.",
    "table": [
      {
        "aspect": "Function",
        "a": "Transport water and minerals",
        "b": "Transport food and sugar"
      },
      {
        "aspect": "Direction",
        "a": "Upward from roots",
        "b": "Bidirectional from leaves"
      },
      {
        "aspect": "Cell Type",
        "a": "Vessel elements and tracheids",
        "b": "Sieve cells and companion cells"
      },
      {
        "aspect": "Living/Dead",
        "a": "Dead at maturity",
        "b": "Living cells"
      },
      {
        "aspect": "Cell Wall",
        "a": "Thick, lignified walls",
        "b": "Thin, cellulose walls"
      },
      {
        "aspect": "Movement Type",
        "a": "Passive transport via osmosis",
        "b": "Active transport requiring energy"
      }
    ],
    "keyPoints": [
      "Xylem is derived from ground and vascular tissue",
      "Phloem surrounds xylem in vascular bundles",
      "Xylem cells are hollow allowing water flow",
      "Phloem cells remain living to actively transport nutrients"
    ],
    "faqs": [
      {
        "q": "Why are xylem cells dead at maturity?",
        "a": "Dead cells do not interfere with water transport and their lignified walls provide structural support."
      },
      {
        "q": "Can water move downward in xylem?",
        "a": "No, water normally moves only upward in xylem due to capillary action and root pressure."
      },
      {
        "q": "What would happen if phloem was blocked?",
        "a": "Food produced in leaves cannot reach roots and other parts, eventually starving the plant."
      }
    ]
  },
  {
    "slug": "nerves-and-neurons",
    "title": "Difference Between Nerves and Neurons",
    "termA": "Nerve",
    "termB": "Neuron",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "A nerve is a bundle of many nerve fibers that transmit signals. A neuron is a single cell that conducts electrical and chemical signals.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Bundle of nerve fibers",
        "b": "Single nerve cell"
      },
      {
        "aspect": "Structure",
        "a": "Multiple axons bundled together",
        "b": "Single cell with dendrites and axon"
      },
      {
        "aspect": "Composition",
        "a": "Made of neurons and glial cells",
        "b": "Individual cell with nucleus"
      },
      {
        "aspect": "Visibility",
        "a": "Visible to naked eye",
        "b": "Visible only under microscope"
      },
      {
        "aspect": "Function",
        "a": "Transmit signals between organs and CNS",
        "b": "Conduct impulses within itself"
      },
      {
        "aspect": "Example",
        "a": "Optic nerve, spinal nerve",
        "b": "Sensory neuron, motor neuron"
      }
    ],
    "keyPoints": [
      "A nerve is composed of many neurons bundled together",
      "Neurons are basic units of nervous system",
      "Nerves connect brain to body organs",
      "Neurons have cell body, dendrites, and axon"
    ],
    "faqs": [
      {
        "q": "Can a nerve function without neurons?",
        "a": "No, nerves are made of neurons, so they cannot function without neurons."
      },
      {
        "q": "How many neurons make up a single nerve?",
        "a": "A nerve can contain thousands to millions of neurons depending on its size and function."
      },
      {
        "q": "What is the smallest functional unit of nervous system?",
        "a": "The neuron is the smallest functional unit of the nervous system."
      }
    ]
  },
  {
    "slug": "endocrine-and-exocrine-glands",
    "title": "Difference Between Endocrine and Exocrine Glands",
    "termA": "Endocrine Gland",
    "termB": "Exocrine Gland",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Endocrine glands secrete hormones directly into the bloodstream. Exocrine glands secrete substances through ducts to external surfaces or cavities.",
    "table": [
      {
        "aspect": "Duct",
        "a": "No duct, ductless",
        "b": "Has duct system"
      },
      {
        "aspect": "Secretion",
        "a": "Hormones into bloodstream",
        "b": "Enzymes and other substances through ducts"
      },
      {
        "aspect": "Target",
        "a": "Distant target organs",
        "b": "Nearby surfaces or cavities"
      },
      {
        "aspect": "Action",
        "a": "Slow, long-lasting effects",
        "b": "Quick, local effects"
      },
      {
        "aspect": "Example",
        "a": "Pituitary, thyroid, pancreas",
        "b": "Salivary glands, sweat glands, pancreas"
      },
      {
        "aspect": "Regulation",
        "a": "Hormonal feedback loops",
        "b": "Nerve and hormone signals"
      }
    ],
    "keyPoints": [
      "Endocrine glands control long-term body processes",
      "Exocrine glands provide immediate localized responses",
      "Pancreas functions as both endocrine and exocrine gland",
      "Endocrine secretions are hormones regulating metabolism"
    ],
    "faqs": [
      {
        "q": "Can a gland be both endocrine and exocrine?",
        "a": "Yes, pancreas is both: it secretes insulin into bloodstream (endocrine) and digestive enzymes through ducts (exocrine)."
      },
      {
        "q": "Why do endocrine glands lack ducts?",
        "a": "Hormones need to enter bloodstream directly for systemic circulation, so ducts would interfere with this function."
      },
      {
        "q": "What happens if endocrine glands malfunction?",
        "a": "Hormonal imbalances occur, affecting metabolism, growth, reproduction, and mood."
      }
    ]
  },
  {
    "slug": "weathering-and-erosion",
    "title": "Difference Between Weathering and Erosion",
    "termA": "Weathering",
    "termB": "Erosion",
    "category": "Science",
    "classLevel": "Class 9",
    "intro": "Weathering is the breakdown of rocks and minerals in place without movement. Erosion is the removal and transport of weathered material by agents like water and wind.",
    "table": [
      {
        "aspect": "Process",
        "a": "Breakdown of rocks",
        "b": "Transport of rock fragments"
      },
      {
        "aspect": "Movement",
        "a": "No movement of material",
        "b": "Material is moved to new locations"
      },
      {
        "aspect": "Agents",
        "a": "Water, wind, temperature, organisms",
        "b": "Water, wind, ice, gravity"
      },
      {
        "aspect": "Result",
        "a": "Rocks broken into smaller pieces",
        "b": "Formation of valleys, canyons, deltas"
      },
      {
        "aspect": "Location",
        "a": "Occurs in place",
        "b": "Occurs away from original location"
      },
      {
        "aspect": "Type",
        "a": "Physical, chemical, biological",
        "b": "Mechanical and chemical"
      }
    ],
    "keyPoints": [
      "Weathering prepares material for erosion",
      "Erosion requires a transport agent to move material",
      "Both processes work together in land formation",
      "Weathering is necessary but erosion actually removes material"
    ],
    "faqs": [
      {
        "q": "Can erosion occur without weathering?",
        "a": "It is unlikely. Weathering usually precedes erosion to break rock into movable fragments."
      },
      {
        "q": "What is the main difference between weathering and erosion?",
        "a": "Weathering breaks rocks in place, while erosion transports the broken pieces elsewhere."
      },
      {
        "q": "What is chemical weathering?",
        "a": "Chemical weathering is the breakdown of rocks through chemical reactions, like oxidation and dissolution."
      }
    ]
  },
  {
    "slug": "rural-and-urban",
    "title": "Difference Between Rural and Urban",
    "termA": "Rural",
    "termB": "Urban",
    "category": "Social Science",
    "classLevel": "Class 9",
    "intro": "Rural areas are sparsely populated regions with agriculture as primary occupation. Urban areas are densely populated with industries and services as main activities.",
    "table": [
      {
        "aspect": "Population",
        "a": "Low population density",
        "b": "High population density"
      },
      {
        "aspect": "Primary Activity",
        "a": "Agriculture and animal husbandry",
        "b": "Industry, trade, and services"
      },
      {
        "aspect": "Infrastructure",
        "a": "Basic infrastructure",
        "b": "Well-developed infrastructure"
      },
      {
        "aspect": "Lifestyle",
        "a": "Traditional and simple",
        "b": "Modern and fast-paced"
      },
      {
        "aspect": "Land Use",
        "a": "Agricultural and natural",
        "b": "Commercial and residential"
      },
      {
        "aspect": "Employment",
        "a": "Self-employment in farming",
        "b": "Wage-based jobs"
      }
    ],
    "keyPoints": [
      "Rural areas depend on natural resources",
      "Urban areas are centers of commerce and administration",
      "Migration from rural to urban areas is increasing in India",
      "Both rural and urban areas are interdependent"
    ],
    "faqs": [
      {
        "q": "Why do people migrate from rural to urban areas?",
        "a": "Better employment opportunities, education, healthcare, and infrastructure attract people to urban areas."
      },
      {
        "q": "What is the impact of urbanisation?",
        "a": "Positive: economic growth. Negative: pollution, overcrowding, loss of agricultural land."
      },
      {
        "q": "Can rural areas become urban?",
        "a": "Yes, rapid development and increasing population can transform rural areas into urban centers."
      }
    ]
  },
  {
    "slug": "import-and-export",
    "title": "Difference Between Import and Export",
    "termA": "Import",
    "termB": "Export",
    "category": "Social Science",
    "classLevel": "Class 10",
    "intro": "Imports are goods brought into a country from abroad. Exports are goods sent from a country to be sold abroad.",
    "table": [
      {
        "aspect": "Direction",
        "a": "Into the country",
        "b": "Out of the country"
      },
      {
        "aspect": "Purpose",
        "a": "To meet domestic demand",
        "b": "To earn foreign exchange"
      },
      {
        "aspect": "Trade Balance",
        "a": "Increases trade deficit",
        "b": "Increases trade surplus"
      },
      {
        "aspect": "Employment",
        "a": "May reduce domestic jobs",
        "b": "Creates employment"
      },
      {
        "aspect": "Customs Duty",
        "a": "Government collects customs duties",
        "b": "Government may provide subsidies"
      },
      {
        "aspect": "Example",
        "a": "Oil, electrical equipment imported in India",
        "b": "Textiles, software exported from India"
      }
    ],
    "keyPoints": [
      "Imports fulfill domestic needs not met by local production",
      "Exports utilize surplus production and generate revenue",
      "Trade balance is difference between imports and exports",
      "India exports software, textiles, and agricultural products"
    ],
    "faqs": [
      {
        "q": "How does import affect the domestic industry?",
        "a": "Imports can increase competition, forcing domestic industries to improve quality or reduce prices."
      },
      {
        "q": "Why do countries restrict imports?",
        "a": "To protect domestic industries, maintain employment, and reduce trade deficit."
      },
      {
        "q": "What are India major exports?",
        "a": "India exports software, textiles, pharmaceuticals, agricultural products, and engineering goods."
      }
    ]
  },
  {
    "slug": "microeconomics-and-macroeconomics",
    "title": "Difference Between Microeconomics and Macroeconomics",
    "termA": "Microeconomics",
    "termB": "Macroeconomics",
    "category": "Social Science",
    "classLevel": "Class 11",
    "intro": "Microeconomics studies individual markets, consumers, and firms. Macroeconomics studies the entire economy including inflation, unemployment, and GDP.",
    "table": [
      {
        "aspect": "Scope",
        "a": "Individual consumers and firms",
        "b": "Entire economy"
      },
      {
        "aspect": "Focus",
        "a": "Price and output of single product",
        "b": "Total output and price level"
      },
      {
        "aspect": "Analysis",
        "a": "Demand and supply in one market",
        "b": "National income and economic growth"
      },
      {
        "aspect": "Variables",
        "a": "Individual prices and quantities",
        "b": "Inflation, unemployment, GDP"
      },
      {
        "aspect": "Policy",
        "a": "Market regulation",
        "b": "Fiscal and monetary policy"
      },
      {
        "aspect": "Example",
        "a": "Price of rice, demand for cars",
        "b": "National GDP, inflation rate"
      }
    ],
    "keyPoints": [
      "Micro studies parts, macro studies the whole",
      "Microeconomics based on marginal analysis",
      "Macroeconomics uses aggregate analysis",
      "Both are interconnected and complement each other"
    ],
    "faqs": [
      {
        "q": "How are microeconomics and macroeconomics related?",
        "a": "Macro is built on micro foundations. Individual decisions aggregate to create macro outcomes."
      },
      {
        "q": "Can microeconomic decisions affect macroeconomy?",
        "a": "Yes, collective consumer and firm decisions impact overall inflation, employment, and growth."
      },
      {
        "q": "What does GDP measure?",
        "a": "GDP measures the total monetary value of goods and services produced in a country in a year."
      }
    ]
  },
  {
    "slug": "revenue-and-capital-expenditure",
    "title": "Difference Between Revenue and Capital Expenditure",
    "termA": "Revenue Expenditure",
    "termB": "Capital Expenditure",
    "category": "Social Science",
    "classLevel": "Class 11",
    "intro": "Revenue expenditure is spending on current consumption and running government. Capital expenditure is spending on creating productive assets and infrastructure.",
    "table": [
      {
        "aspect": "Nature",
        "a": "Current period spending",
        "b": "Long-term investment"
      },
      {
        "aspect": "Benefit Period",
        "a": "Consumed in same year",
        "b": "Benefits multiple years"
      },
      {
        "aspect": "Asset Creation",
        "a": "Does not create assets",
        "b": "Creates productive assets"
      },
      {
        "aspect": "Example",
        "a": "Salaries, supplies, utilities",
        "b": "Building roads, dams, schools"
      },
      {
        "aspect": "Impact",
        "a": "Reduces current budget surplus",
        "b": "Increases national wealth"
      },
      {
        "aspect": "Depreciation",
        "a": "Not applicable",
        "b": "Assets depreciate over time"
      }
    ],
    "keyPoints": [
      "Revenue expenditure is necessary for daily government operations",
      "Capital expenditure creates infrastructure for future growth",
      "Both are essential for balanced government budget",
      "Capital expenditure has long-term economic benefits"
    ],
    "faqs": [
      {
        "q": "Why is capital expenditure important?",
        "a": "It creates productive assets like infrastructure that boost long-term economic growth and generate future revenue."
      },
      {
        "q": "Is education expenditure revenue or capital?",
        "a": "Education is considered capital expenditure because it creates human capital benefits over many years."
      },
      {
        "q": "Can a government reduce revenue expenditure?",
        "a": "Difficult, as essential services require continuous spending, but efficiency can be improved."
      }
    ]
  },
  {
    "slug": "fundamental-rights-and-fundamental-duties",
    "title": "Difference Between Fundamental Rights and Fundamental Duties",
    "termA": "Fundamental Rights",
    "termB": "Fundamental Duties",
    "category": "Social Science",
    "classLevel": "Class 9",
    "intro": "Fundamental Rights are protected freedoms guaranteed by the Constitution. Fundamental Duties are moral and civic responsibilities all citizens must fulfill.",
    "table": [
      {
        "aspect": "Nature",
        "a": "Protective freedoms",
        "b": "Civic responsibilities"
      },
      {
        "aspect": "Enforceability",
        "a": "Legally enforceable",
        "b": "Moral obligations, not legally binding"
      },
      {
        "aspect": "Purpose",
        "a": "Protect individual liberty",
        "b": "Maintain social harmony"
      },
      {
        "aspect": "Article",
        "a": "Articles 12-35 in Indian Constitution",
        "b": "Article 51 A in Indian Constitution"
      },
      {
        "aspect": "Number",
        "a": "6 fundamental rights",
        "b": "11 fundamental duties"
      },
      {
        "aspect": "Example",
        "a": "Right to equality, freedom of speech",
        "b": "Respect Constitution, help in crisis"
      }
    ],
    "keyPoints": [
      "Rights ensure individual freedom while duties ensure social responsibility",
      "Rights are protected by law while duties are moral",
      "Both are essential for functioning democracy",
      "Rights without duties lead to chaos"
    ],
    "faqs": [
      {
        "q": "Can fundamental rights be suspended?",
        "a": "Yes, during emergency declared by President, certain rights can be suspended temporarily."
      },
      {
        "q": "What are the 6 fundamental rights in India?",
        "a": "Equality, freedom of expression, freedom from exploitation, religious freedom, cultural rights, and right to constitutional remedies."
      },
      {
        "q": "Why are fundamental duties not legally enforceable?",
        "a": "They are moral obligations meant to promote awareness of civic responsibility rather than legal punishment."
      }
    ]
  },
  {
    "slug": "lok-sabha-and-rajya-sabha",
    "title": "Difference Between Lok Sabha and Rajya Sabha",
    "termA": "Lok Sabha",
    "termB": "Rajya Sabha",
    "category": "Social Science",
    "classLevel": "Class 9",
    "intro": "Lok Sabha is the lower house of Indian Parliament with directly elected members. Rajya Sabha is the upper house with members elected by state legislatures.",
    "table": [
      {
        "aspect": "Members",
        "a": "535 elected members plus 2 nominated",
        "b": "250 members, 238 elected and 12 nominated"
      },
      {
        "aspect": "Selection",
        "a": "Direct election by people",
        "b": "Election by state legislatures"
      },
      {
        "aspect": "Term",
        "a": "5 years",
        "b": "6 years, 1/3 retire every 2 years"
      },
      {
        "aspect": "Qualification",
        "a": "Minimum 25 years old",
        "b": "Minimum 30 years old"
      },
      {
        "aspect": "Power",
        "a": "More powerful, can pass budget bills",
        "b": "Less powerful, can only delay bills"
      },
      {
        "aspect": "Dissolution",
        "a": "Dissolves every 5 years",
        "b": "Never dissolves, continuous"
      }
    ],
    "keyPoints": [
      "Lok Sabha represents the people directly",
      "Rajya Sabha represents states indirectly",
      "Both houses must pass bills for legislation",
      "Lok Sabha is more powerful in financial matters"
    ],
    "faqs": [
      {
        "q": "Why is Rajya Sabha called the upper house?",
        "a": "It has more experienced members and represents federal interests, making it constitutionally superior in certain matters."
      },
      {
        "q": "Can Rajya Sabha block a bill?",
        "a": "No, it can only delay money bills by 14 days. For other bills, if there is disagreement, joint sitting is held."
      },
      {
        "q": "How many states are represented in Rajya Sabha?",
        "a": "All 28 states and 8 union territories are represented in Rajya Sabha based on their population."
      }
    ]
  },
  {
    "slug": "gross-and-net",
    "title": "Difference Between Gross and Net",
    "termA": "Gross",
    "termB": "Net",
    "category": "Social Science",
    "classLevel": "Class 11",
    "intro": "Gross is the total amount before any deductions. Net is the amount after deductions like taxes and expenses.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Total amount before deductions",
        "b": "Amount after deductions"
      },
      {
        "aspect": "Calculation",
        "a": "Includes all gross revenues",
        "b": "Gross minus expenses and taxes"
      },
      {
        "aspect": "Example",
        "a": "Gross salary, gross profit",
        "b": "Net salary, net profit"
      },
      {
        "aspect": "Taxes",
        "a": "Not deducted",
        "b": "Already deducted"
      },
      {
        "aspect": "Amount",
        "a": "Always higher",
        "b": "Always lower"
      },
      {
        "aspect": "Use",
        "a": "Calculating deductions needed",
        "b": "Actual money received or profit"
      }
    ],
    "keyPoints": [
      "Gross is the starting number for calculations",
      "Net represents actual take-home amount",
      "Difference shows all deductions made",
      "Both are important for financial planning"
    ],
    "faqs": [
      {
        "q": "What is gross income?",
        "a": "Gross income is the total income from all sources before any taxes, insurance, or other deductions."
      },
      {
        "q": "How is net income calculated?",
        "a": "Net income = Gross income minus taxes, insurance, deductions, and other mandatory withholdings."
      },
      {
        "q": "Why is net income more important than gross?",
        "a": "Net income is what you actually receive and can spend, making it more relevant for budgeting."
      }
    ]
  },
  {
    "slug": "profit-and-loss",
    "title": "Difference Between Profit and Loss",
    "termA": "Profit",
    "termB": "Loss",
    "category": "Social Science",
    "classLevel": "Class 8",
    "intro": "Profit occurs when selling price exceeds cost price. Loss occurs when cost price exceeds selling price.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Selling price greater than cost",
        "b": "Cost price greater than selling price"
      },
      {
        "aspect": "Formula",
        "a": "SP - CP (positive)",
        "b": "CP - SP (positive)"
      },
      {
        "aspect": "Percentage",
        "a": "Profit % = (Profit/CP) x 100",
        "b": "Loss % = (Loss/CP) x 100"
      },
      {
        "aspect": "Business Impact",
        "a": "Business grows and expands",
        "b": "Business shrinks and fails"
      },
      {
        "aspect": "Example",
        "a": "Buy pen for Rs 5, sell for Rs 10",
        "b": "Buy pen for Rs 10, sell for Rs 5"
      },
      {
        "aspect": "Cash Flow",
        "a": "Positive, money increases",
        "b": "Negative, money decreases"
      }
    ],
    "keyPoints": [
      "Profit is the gain from a business transaction",
      "Loss is the reduction in value",
      "Both are calculated from cost and selling prices",
      "Profit margin shows efficiency of business"
    ],
    "faqs": [
      {
        "q": "What is break even point?",
        "a": "Break even point is when selling price equals cost price, resulting in neither profit nor loss."
      },
      {
        "q": "How to increase profit?",
        "a": "Increase selling price, reduce cost price, or increase sales volume."
      },
      {
        "q": "Can a business operate at loss?",
        "a": "Temporarily yes, but continuously operating at loss leads to business failure."
      }
    ]
  },
  {
    "slug": "assets-and-liabilities",
    "title": "Difference Between Assets and Liabilities",
    "termA": "Assets",
    "termB": "Liabilities",
    "category": "Social Science",
    "classLevel": "Class 11",
    "intro": "Assets are items of value owned by a person or business. Liabilities are debts or obligations owed to others.",
    "table": [
      {
        "aspect": "Ownership",
        "a": "Owned by the person or business",
        "b": "Owed to creditors or lenders"
      },
      {
        "aspect": "Value",
        "a": "Add value to net worth",
        "b": "Reduce net worth"
      },
      {
        "aspect": "Example",
        "a": "House, car, bank balance, stock",
        "b": "Loan, mortgage, credit card debt"
      },
      {
        "aspect": "Balance Sheet",
        "a": "Left side of balance sheet",
        "b": "Right side of balance sheet"
      },
      {
        "aspect": "Liquidity",
        "a": "Can be converted to cash",
        "b": "Must be paid from cash or assets"
      },
      {
        "aspect": "Accounting",
        "a": "Assets = Liabilities + Capital",
        "b": "Part of accounting equation"
      }
    ],
    "keyPoints": [
      "Assets are what you own, liabilities are what you owe",
      "Net worth equals assets minus liabilities",
      "Current assets are liquid, fixed assets are not",
      "Short-term liabilities due within one year"
    ],
    "faqs": [
      {
        "q": "What is the accounting equation?",
        "a": "Assets = Liabilities + Equity. This fundamental equation balances the balance sheet."
      },
      {
        "q": "Can liabilities be negative?",
        "a": "No, liabilities represent actual debts. Negative would mean money owed to you, which is an asset."
      },
      {
        "q": "What is net worth?",
        "a": "Net worth = Total assets minus total liabilities. It shows the true financial position."
      }
    ]
  },
  {
    "slug": "hardware-and-firmware",
    "title": "Difference Between Hardware and Firmware",
    "termA": "Hardware",
    "termB": "Firmware",
    "category": "Computer",
    "classLevel": "Class 11",
    "intro": "Hardware is the physical equipment and components of a computer. Firmware is permanent software embedded in hardware devices.",
    "table": [
      {
        "aspect": "Nature",
        "a": "Physical, tangible components",
        "b": "Software permanently stored in ROM"
      },
      {
        "aspect": "Examples",
        "a": "CPU, RAM, motherboard, hard drive",
        "b": "BIOS, microcode, device drivers"
      },
      {
        "aspect": "Purpose",
        "a": "Perform physical computation",
        "b": "Control and manage hardware"
      },
      {
        "aspect": "Modification",
        "a": "Cannot be changed without replacement",
        "b": "Can be updated or reflashed"
      },
      {
        "aspect": "Cost",
        "a": "Expensive to replace",
        "b": "Inexpensive to update"
      },
      {
        "aspect": "User Access",
        "a": "Difficult to modify or replace",
        "b": "Users can update firmware"
      }
    ],
    "keyPoints": [
      "Hardware is the machine, firmware is its basic software",
      "Firmware bridges hardware and software layers",
      "BIOS is the most common firmware",
      "Firmware updates can improve hardware performance"
    ],
    "faqs": [
      {
        "q": "What is BIOS?",
        "a": "BIOS is firmware that initializes hardware components before the operating system loads."
      },
      {
        "q": "Can firmware be deleted?",
        "a": "Difficult. Firmware is designed to persist. Accidental deletion can brick the device."
      },
      {
        "q": "Is updating firmware safe?",
        "a": "Usually safe if done correctly. Always backup before updating to prevent device failure."
      }
    ]
  },
  {
    "slug": "compiler-and-interpreter",
    "title": "Difference Between Compiler and Interpreter",
    "termA": "Compiler",
    "termB": "Interpreter",
    "category": "Computer",
    "classLevel": "Class 11",
    "intro": "A compiler translates entire source code to machine code before execution. An interpreter translates code line-by-line during execution.",
    "table": [
      {
        "aspect": "Translation",
        "a": "Entire code at once",
        "b": "Line by line"
      },
      {
        "aspect": "Execution",
        "a": "After complete translation",
        "b": "During translation"
      },
      {
        "aspect": "Speed",
        "a": "Faster execution",
        "b": "Slower execution"
      },
      {
        "aspect": "Memory",
        "a": "Requires separate executable file",
        "b": "No separate executable needed"
      },
      {
        "aspect": "Error Detection",
        "a": "All errors shown before execution",
        "b": "Errors shown during execution"
      },
      {
        "aspect": "Examples",
        "a": "C, C++, Java, C#",
        "b": "Python, JavaScript, Ruby"
      }
    ],
    "keyPoints": [
      "Compilers produce machine-independent code",
      "Interpreters need source code each time",
      "Compiled code runs faster but takes longer to prepare",
      "Interpreted code is slower but easier to debug"
    ],
    "faqs": [
      {
        "q": "Why is compiled code faster than interpreted?",
        "a": "Compiled code is already translated to machine code. Interpreted code needs translation during execution."
      },
      {
        "q": "Can Python code be compiled?",
        "a": "Python is interpreted, but bytecode compilation happens internally before interpretation."
      },
      {
        "q": "Which is better, compiler or interpreter?",
        "a": "Both have uses. Compilers for performance-critical apps, interpreters for flexibility and rapid development."
      }
    ]
  },
  {
    "slug": "analog-and-digital",
    "title": "Difference Between Analog and Digital",
    "termA": "Analog",
    "termB": "Digital",
    "category": "Computer",
    "classLevel": "Class 10",
    "intro": "Analog represents data as continuous values like waveforms. Digital represents data as discrete values using binary digits 0 and 1.",
    "table": [
      {
        "aspect": "Data",
        "a": "Continuous signals",
        "b": "Discrete values (0 and 1)"
      },
      {
        "aspect": "Representation",
        "a": "Waveforms, curves",
        "b": "Binary code"
      },
      {
        "aspect": "Accuracy",
        "a": "Subject to signal degradation",
        "b": "High accuracy, no degradation"
      },
      {
        "aspect": "Storage",
        "a": "Difficult to store",
        "b": "Easy to store and transmit"
      },
      {
        "aspect": "Examples",
        "a": "Analog clock, vinyl record, old phone",
        "b": "Digital clock, CD, smartphone"
      },
      {
        "aspect": "Bandwidth",
        "a": "Uses more bandwidth",
        "b": "Uses less bandwidth"
      }
    ],
    "keyPoints": [
      "Analog is continuous, digital is discrete",
      "Digital technology dominates modern electronics",
      "Analog-to-digital conversion bridges the two",
      "Most devices now use digital technology"
    ],
    "faqs": [
      {
        "q": "Why are digital devices preferred today?",
        "a": "Digital devices are more accurate, easier to store, transmit, and process. No signal degradation."
      },
      {
        "q": "What is an ADC converter?",
        "a": "Analog-to-Digital Converter translates continuous analog signals to discrete digital values."
      },
      {
        "q": "Can analog be converted to digital?",
        "a": "Yes, through sampling and quantization, but some information may be lost in the conversion process."
      }
    ]
  },
  {
    "slug": "mass-and-volume",
    "title": "Difference Between Mass and Volume",
    "termA": "Mass",
    "termB": "Volume",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Mass is the amount of matter in an object. Volume is the space an object occupies.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Quantity of matter",
        "b": "Space occupied"
      },
      {
        "aspect": "SI Unit",
        "a": "Kilogram (kg)",
        "b": "Cubic meter (m^3)"
      },
      {
        "aspect": "Measurement",
        "a": "Uses balance",
        "b": "Uses graduated cylinder"
      },
      {
        "aspect": "Constant",
        "a": "Same everywhere",
        "b": "Affected by shape and density"
      },
      {
        "aspect": "Type",
        "a": "Scalar quantity",
        "b": "Scalar quantity"
      },
      {
        "aspect": "Relationship",
        "a": "Density = Mass/Volume",
        "b": "Volume = Mass/Density"
      }
    ],
    "keyPoints": [
      "Mass determines inertia and gravitational force",
      "Volume determines space and container size",
      "Same mass can have different volumes",
      "Density relates mass and volume"
    ],
    "faqs": [
      {
        "q": "Can two objects have same mass but different volumes?",
        "a": "Yes, if they have different densities. Lead and feathers of same mass have very different volumes."
      },
      {
        "q": "Does mass change with location?",
        "a": "No, mass is constant everywhere. Weight changes with gravity, but mass does not."
      },
      {
        "q": "How is volume measured?",
        "a": "Volume can be measured using water displacement for irregular objects or formulas for regular shapes."
      }
    ]
  },
  {
    "slug": "heat-and-temperature",
    "title": "Difference Between Heat and Temperature",
    "termA": "Heat",
    "termB": "Temperature",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Heat is the thermal energy transferred between objects. Temperature is the measure of average kinetic energy of particles.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Energy transfer between objects",
        "b": "Measure of particle kinetic energy"
      },
      {
        "aspect": "SI Unit",
        "a": "Joule (J)",
        "b": "Kelvin (K) or Celsius"
      },
      {
        "aspect": "Type",
        "a": "Form of energy",
        "b": "Property of matter"
      },
      {
        "aspect": "Measurement",
        "a": "Uses calorimeter",
        "b": "Uses thermometer"
      },
      {
        "aspect": "Direction",
        "a": "Flows from hot to cold",
        "b": "Does not flow"
      },
      {
        "aspect": "Dependence",
        "a": "Depends on mass and temperature",
        "b": "Independent of mass"
      }
    ],
    "keyPoints": [
      "Heat is energy in transit between objects",
      "Temperature is the intensity of heat",
      "High temperature does not always mean high heat",
      "Heat flows to equalize temperatures"
    ],
    "faqs": [
      {
        "q": "Can temperature increase without heat transfer?",
        "a": "Yes, friction and compression can increase temperature without external heat transfer."
      },
      {
        "q": "What is the relationship between heat and temperature?",
        "a": "Temperature determines direction of heat flow. Heat flows from higher to lower temperature."
      },
      {
        "q": "Why does a small amount of boiling water burn more than warm bathtub?",
        "a": "Boiling water has higher temperature. Though bathtub has more total heat, temperature determines burn intensity."
      }
    ]
  },
  {
    "slug": "weight-and-force",
    "title": "Difference Between Weight and Force",
    "termA": "Weight",
    "termB": "Force",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Weight is the force exerted by gravity on an object. Force is any push or pull that changes motion or shape.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Gravitational force on object",
        "b": "Push or pull on object"
      },
      {
        "aspect": "Formula",
        "a": "W = mg",
        "b": "F = ma"
      },
      {
        "aspect": "SI Unit",
        "a": "Newton (N)",
        "b": "Newton (N)"
      },
      {
        "aspect": "Variation",
        "a": "Varies with gravity",
        "b": "Depends on cause"
      },
      {
        "aspect": "Direction",
        "a": "Always downward",
        "b": "Any direction"
      },
      {
        "aspect": "Relationship",
        "a": "Weight is a type of force",
        "b": "General concept including weight"
      }
    ],
    "keyPoints": [
      "Weight is specific force due to gravity",
      "Weight changes with location while mass does not",
      "All forces are interactions between objects",
      "Force causes acceleration according to Newton's laws"
    ],
    "faqs": [
      {
        "q": "Is weight same as mass?",
        "a": "No, mass is amount of matter while weight is gravitational force on that mass."
      },
      {
        "q": "What is your weight on the Moon?",
        "a": "1/6th of Earth weight since Moon's gravity is 1/6th of Earth's gravity."
      },
      {
        "q": "Can weight be zero?",
        "a": "Yes, in space or in free fall, there is no normal force and person feels weightless."
      }
    ]
  },
  {
    "slug": "reflection-and-total-internal-reflection",
    "title": "Difference Between Reflection and Total Internal Reflection",
    "termA": "Reflection",
    "termB": "Total Internal Reflection",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Reflection is bouncing of light from a surface. Total internal reflection is complete reflection when light hits a less dense medium at steep angle.",
    "table": [
      {
        "aspect": "Occurrence",
        "a": "Any surface reflecting light",
        "b": "Only at denser to less dense boundary"
      },
      {
        "aspect": "Refraction",
        "a": "Some light may refract",
        "b": "No refraction, all light reflects"
      },
      {
        "aspect": "Angle",
        "a": "Any angle of incidence",
        "b": "Must exceed critical angle"
      },
      {
        "aspect": "Critical Angle",
        "a": "Not applicable",
        "b": "sin C = 1/n"
      },
      {
        "aspect": "Example",
        "a": "Mirror reflection",
        "b": "Prism, diamond sparkle"
      },
      {
        "aspect": "Efficiency",
        "a": "Partial reflection",
        "b": "100% reflection"
      }
    ],
    "keyPoints": [
      "Reflection obeys law of reflection at any angle",
      "Total internal reflection requires specific conditions",
      "Critical angle determines total internal reflection",
      "Fiber optics use total internal reflection"
    ],
    "faqs": [
      {
        "q": "What is the critical angle?",
        "a": "Critical angle is the minimum angle of incidence for which total internal reflection occurs."
      },
      {
        "q": "How do diamonds sparkle?",
        "a": "Light entering diamond undergoes multiple total internal reflections before exiting, creating sparkle."
      },
      {
        "q": "What is the critical angle for glass to air?",
        "a": "For typical glass with refractive index 1.5, critical angle is approximately 42 degrees."
      }
    ]
  },
  {
    "slug": "acid-and-alkali",
    "title": "Difference Between Acid and Alkali",
    "termA": "Acid",
    "termB": "Alkali",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Acids are sour substances with pH less than 7. Alkalis are bitter bases with pH greater than 7.",
    "table": [
      {
        "aspect": "pH Value",
        "a": "Less than 7",
        "b": "Greater than 7"
      },
      {
        "aspect": "Taste",
        "a": "Sour",
        "b": "Bitter"
      },
      {
        "aspect": "Texture",
        "a": "No soapy feeling",
        "b": "Soapy, slippery"
      },
      {
        "aspect": "Examples",
        "a": "Lemon, vinegar, HCl",
        "b": "Baking soda, ammonia, NaOH"
      },
      {
        "aspect": "Indicator Color",
        "a": "Turns litmus red",
        "b": "Turns litmus blue"
      },
      {
        "aspect": "Reaction",
        "a": "Reacts with metals",
        "b": "Does not react with metals"
      }
    ],
    "keyPoints": [
      "Acids produce H+ ions, alkalis produce OH- ions",
      "Neutralisation happens when acid meets alkali",
      "pH scale measures acidity and alkalinity",
      "Both acids and alkalis can be corrosive"
    ],
    "faqs": [
      {
        "q": "What is neutralisation?",
        "a": "Neutralisation is reaction between acid and alkali producing salt and water."
      },
      {
        "q": "Can a substance be both acid and alkali?",
        "a": "No, but some substances like amphoteric substances can act as either depending on the reaction."
      },
      {
        "q": "What is pH 7?",
        "a": "pH 7 is neutral, neither acidic nor alkaline, like pure water."
      }
    ]
  },
  {
    "slug": "metal-and-metalloid",
    "title": "Difference Between Metal and Metalloid",
    "termA": "Metal",
    "termB": "Metalloid",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Metals are elements that conduct electricity and have metallic luster. Metalloids are elements with properties between metals and non-metals.",
    "table": [
      {
        "aspect": "Properties",
        "a": "Conductive, shiny, ductile",
        "b": "Semi-conductive, mix of properties"
      },
      {
        "aspect": "Conductivity",
        "a": "Excellent conductor",
        "b": "Semi-conductor"
      },
      {
        "aspect": "Examples",
        "a": "Iron, copper, gold, aluminum",
        "b": "Silicon, arsenic, boron, germanium"
      },
      {
        "aspect": "Electron Loss",
        "a": "Easily lose electrons",
        "b": "Do not easily lose electrons"
      },
      {
        "aspect": "Appearance",
        "a": "Lustrous and reflective",
        "b": "Often dull appearance"
      },
      {
        "aspect": "Uses",
        "a": "Wires, structures, tools",
        "b": "Semiconductors, electronics"
      }
    ],
    "keyPoints": [
      "Metals form positive ions by losing electrons",
      "Metalloids bridge metal and non-metal properties",
      "Silicon is the most common metalloid",
      "Metalloids are essential for semiconductor technology"
    ],
    "faqs": [
      {
        "q": "Why are metalloids important?",
        "a": "Metalloids like silicon are crucial for making semiconductors used in computers and electronics."
      },
      {
        "q": "Can metalloids conduct electricity?",
        "a": "Yes, but only under certain conditions, unlike metals which always conduct."
      },
      {
        "q": "What is the most important metalloid?",
        "a": "Silicon is the most important metalloid, forming the basis of all semiconductor technology."
      }
    ]
  },
  {
    "slug": "cation-and-anion",
    "title": "Difference Between Cation and Anion",
    "termA": "Cation",
    "termB": "Anion",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Cations are positively charged ions with fewer electrons than protons. Anions are negatively charged ions with more electrons than protons.",
    "table": [
      {
        "aspect": "Charge",
        "a": "Positive charge",
        "b": "Negative charge"
      },
      {
        "aspect": "Formation",
        "a": "Loss of electrons",
        "b": "Gain of electrons"
      },
      {
        "aspect": "Electron Count",
        "a": "Fewer electrons than protons",
        "b": "More electrons than protons"
      },
      {
        "aspect": "Mobility",
        "a": "Moves to cathode",
        "b": "Moves to anode"
      },
      {
        "aspect": "Examples",
        "a": "Na+, K+, Ca2+, H+",
        "b": "Cl-, O2-, SO4 2-, OH-"
      },
      {
        "aspect": "Size",
        "a": "Usually smaller than neutral atom",
        "b": "Usually larger than neutral atom"
      }
    ],
    "keyPoints": [
      "Ionic compounds form from cation-anion attraction",
      "Cations come from metals, anions from non-metals",
      "Charge must balance in ionic compounds",
      "Both are formed by electron transfer"
    ],
    "faqs": [
      {
        "q": "Can a non-metal form a cation?",
        "a": "Rarely, hydrogen sometimes forms cation H+. Most cations are metals."
      },
      {
        "q": "How is an ionic bond formed?",
        "a": "Ionic bond forms between cation and anion through electrostatic attraction."
      },
      {
        "q": "What is the charge of ion?",
        "a": "Ion charge equals protons minus electrons. Positive if fewer electrons, negative if more."
      }
    ]
  },
  {
    "slug": "mitochondria-and-chloroplast",
    "title": "Difference Between Mitochondria and Chloroplast",
    "termA": "Mitochondria",
    "termB": "Chloroplast",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Mitochondria are powerhouses that produce energy through respiration. Chloroplasts convert light energy into chemical energy through photosynthesis.",
    "table": [
      {
        "aspect": "Function",
        "a": "Aerobic respiration, ATP production",
        "b": "Photosynthesis, glucose production"
      },
      {
        "aspect": "Pigment",
        "a": "No pigment",
        "b": "Contains chlorophyll"
      },
      {
        "aspect": "Presence",
        "a": "All eukaryotic cells",
        "b": "Only plant cells"
      },
      {
        "aspect": "Process",
        "a": "Breaking down glucose",
        "b": "Building glucose from CO2"
      },
      {
        "aspect": "Color",
        "a": "No color",
        "b": "Green"
      },
      {
        "aspect": "Shape",
        "a": "Rod-shaped",
        "b": "Disc-shaped"
      }
    ],
    "keyPoints": [
      "Mitochondria release energy, chloroplast stores energy",
      "Both are semi-autonomous organelles",
      "Both have their own DNA and ribosomes",
      "Essential for energy flow in cells"
    ],
    "faqs": [
      {
        "q": "Do plants have mitochondria?",
        "a": "Yes, plant cells have both mitochondria and chloroplasts. Mitochondria for respiration, chloroplast for photosynthesis."
      },
      {
        "q": "Why do plant cells need both?",
        "a": "Chloroplasts produce glucose from sunlight, mitochondria break it down for energy needed 24/7."
      },
      {
        "q": "Can animal cells have chloroplasts?",
        "a": "No, normally animals lack chloroplasts. Some animals incorporated chloroplasts by symbiosis."
      }
    ]
  },
  {
    "slug": "transpiration-and-translocation",
    "title": "Difference Between Transpiration and Translocation",
    "termA": "Transpiration",
    "termB": "Translocation",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Transpiration is water loss from leaves into atmosphere. Translocation is movement of food through phloem to all plant parts.",
    "table": [
      {
        "aspect": "Substance",
        "a": "Water vapor",
        "b": "Sugar and nutrients"
      },
      {
        "aspect": "Vessel",
        "a": "Through leaves into air",
        "b": "Through phloem"
      },
      {
        "aspect": "Direction",
        "a": "Unidirectional, upward and out",
        "b": "Bidirectional, as needed"
      },
      {
        "aspect": "Requires Energy",
        "a": "No, passive process",
        "b": "Yes, active transport"
      },
      {
        "aspect": "Purpose",
        "a": "Cooling, water uptake",
        "b": "Distribution of food"
      },
      {
        "aspect": "Rate",
        "a": "Higher in hot, dry conditions",
        "b": "Constant throughout day"
      }
    ],
    "keyPoints": [
      "Transpiration pulls water up from roots",
      "Translocation distributes photosynthetic products",
      "Both are essential plant processes",
      "Transpiration creates water shortage in hot weather"
    ],
    "faqs": [
      {
        "q": "What is transpiration-pull theory?",
        "a": "Transpiration from leaves creates a pull that draws water up from roots through xylem vessels."
      },
      {
        "q": "Why is translocation necessary?",
        "a": "Roots, flowers, and fruits cannot photosynthesize, so they need food transported from leaves."
      },
      {
        "q": "What is guttation?",
        "a": "Guttation is water loss from leaf tips when transpiration is slow and root pressure is high."
      }
    ]
  },
  {
    "slug": "diffusion-and-osmosis",
    "title": "Difference Between Diffusion and Osmosis",
    "termA": "Diffusion",
    "termB": "Osmosis",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Diffusion is movement of particles from high to low concentration. Osmosis is movement of water across semi-permeable membrane.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Movement of solute particles",
        "b": "Movement of solvent molecules"
      },
      {
        "aspect": "Requires Membrane",
        "a": "No membrane needed",
        "b": "Requires semi-permeable membrane"
      },
      {
        "aspect": "Driving Force",
        "a": "Concentration gradient",
        "b": "Osmotic pressure"
      },
      {
        "aspect": "Substance Moved",
        "a": "Any substance",
        "b": "Only water molecules"
      },
      {
        "aspect": "Example",
        "a": "Perfume smell spreading",
        "b": "Water entering plant roots"
      },
      {
        "aspect": "Type",
        "a": "Passive and active",
        "b": "Only passive transport"
      }
    ],
    "keyPoints": [
      "Both are passive transport processes",
      "Diffusion moves solutes, osmosis moves solvents",
      "Osmosis is special case of diffusion",
      "Both depend on concentration differences"
    ],
    "faqs": [
      {
        "q": "Can diffusion occur across a membrane?",
        "a": "Yes, small molecules can diffuse through semi-permeable membrane, unlike water in osmosis."
      },
      {
        "q": "What is osmotic potential?",
        "a": "Osmotic potential is the tendency of water to move into a solution due to dissolved solutes."
      },
      {
        "q": "What happens to cells in hypertonic solution?",
        "a": "Cells lose water through osmosis and shrivel in hypertonic solution."
      }
    ]
  },
  {
    "slug": "galvanometer-and-ammeter",
    "title": "Difference Between Galvanometer and Ammeter",
    "termA": "Galvanometer",
    "termB": "Ammeter",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Galvanometer is a sensitive device detecting small currents. Ammeter measures large currents in electric circuits.",
    "table": [
      {
        "aspect": "Function",
        "a": "Detects small currents",
        "b": "Measures large currents"
      },
      {
        "aspect": "Sensitivity",
        "a": "Very sensitive",
        "b": "Less sensitive"
      },
      {
        "aspect": "Current Range",
        "a": "Micro to milliamps",
        "b": "Milliamps to amperes"
      },
      {
        "aspect": "Internal Resistance",
        "a": "Very high",
        "b": "Very low"
      },
      {
        "aspect": "Construction",
        "a": "Simple coil in magnetic field",
        "b": "Galvanometer with shunt"
      },
      {
        "aspect": "Connection",
        "a": "Can be connected carefully",
        "b": "Must be in series"
      }
    ],
    "keyPoints": [
      "Ammeter is essentially galvanometer with low-resistance shunt",
      "Galvanometer would burn out if too much current flows",
      "Ammeter has negligible internal resistance",
      "Both work on same principle of current-deflection"
    ],
    "faqs": [
      {
        "q": "Why is shunt added to galvanometer?",
        "a": "Shunt is low-resistance parallel connection that diverts excess current, protecting galvanometer."
      },
      {
        "q": "What is the shunt value for ammeter?",
        "a": "Shunt value = Rg * Ig / (I - Ig) where Rg is galvanometer resistance and Ig is its full scale current."
      },
      {
        "q": "Can galvanometer measure large currents?",
        "a": "No, galvanometer would be damaged. Ammeter or galvanometer with shunt must be used."
      }
    ]
  },
  {
    "slug": "resistance-and-resistivity",
    "title": "Difference Between Resistance and Resistivity",
    "termA": "Resistance",
    "termB": "Resistivity",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Resistance is opposition to current flow in a conductor. Resistivity is a material property independent of size.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Opposition to current in conductor",
        "b": "Material property measure"
      },
      {
        "aspect": "Symbol",
        "a": "R",
        "b": "ρ (rho)"
      },
      {
        "aspect": "SI Unit",
        "a": "Ohm (Ω)",
        "b": "Ohm-meter (Ω m)"
      },
      {
        "aspect": "Dependence",
        "a": "Depends on material, length, area",
        "b": "Independent of length and area"
      },
      {
        "aspect": "Formula",
        "a": "R = V/I (Ohm's law)",
        "b": "ρ = R × A / L"
      },
      {
        "aspect": "Measurement",
        "a": "Using ohmmeter",
        "b": "Calculated from resistance values"
      }
    ],
    "keyPoints": [
      "Resistance depends on resistivity and geometry",
      "Resistivity is intrinsic material property",
      "Doubling length doubles resistance",
      "Doubling area halves resistance"
    ],
    "faqs": [
      {
        "q": "How does temperature affect resistance and resistivity?",
        "a": "Both increase with temperature. Resistivity increases due to thermal motion of atoms."
      },
      {
        "q": "Why do longer wires have more resistance?",
        "a": "More length means more atoms for electrons to collide with, increasing resistance."
      },
      {
        "q": "What is the resistivity of copper?",
        "a": "Copper has resistivity approximately 1.68 × 10-8 Ω m at 20°C."
      }
    ]
  },
  {
    "slug": "mean-and-median",
    "title": "Difference Between Mean and Median",
    "termA": "Mean",
    "termB": "Median",
    "category": "Maths",
    "classLevel": "Class 10",
    "intro": "Mean is the average of all values in a dataset. Median is the middle value when data is arranged in order.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Sum divided by number of values",
        "b": "Middle value in ordered data"
      },
      {
        "aspect": "Formula",
        "a": "Mean = Sum / n",
        "b": "Position = (n+1)/2 for odd n"
      },
      {
        "aspect": "Effect of Outliers",
        "a": "Affected greatly by extreme values",
        "b": "Unaffected by extreme values"
      },
      {
        "aspect": "Calculation",
        "a": "Add all values, divide by count",
        "b": "Find middle value after sorting"
      },
      {
        "aspect": "Even/Odd Data",
        "a": "Same process",
        "b": "Average two middle values if even"
      },
      {
        "aspect": "Use",
        "a": "Best for normal distribution",
        "b": "Best for skewed data"
      }
    ],
    "keyPoints": [
      "Mean is affected by all values including outliers",
      "Median is more robust for skewed data",
      "Both are measures of central tendency",
      "Mode is third measure of central tendency"
    ],
    "faqs": [
      {
        "q": "When to use mean and when to use median?",
        "a": "Use mean for normal distribution. Use median for skewed data or when outliers exist."
      },
      {
        "q": "Can mean and median be equal?",
        "a": "Yes, in symmetric distributions, mean equals median."
      },
      {
        "q": "What is the effect of outlier on mean?",
        "a": "One outlier can greatly change mean value, pulling it toward the extreme value."
      }
    ]
  },
  {
    "slug": "speed-and-acceleration",
    "title": "Difference Between Speed and Acceleration",
    "termA": "Speed",
    "termB": "Acceleration",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Speed is the rate of change of distance. Acceleration is the rate of change of velocity.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Distance covered per unit time",
        "b": "Change in velocity per unit time"
      },
      {
        "aspect": "Type",
        "a": "Scalar quantity",
        "b": "Vector quantity"
      },
      {
        "aspect": "SI Unit",
        "a": "m/s",
        "b": "m/s²"
      },
      {
        "aspect": "Formula",
        "a": "Speed = Distance / Time",
        "b": "a = (v - u) / t"
      },
      {
        "aspect": "Can be zero",
        "a": "Only when object at rest",
        "b": "When velocity is constant"
      },
      {
        "aspect": "Example",
        "a": "Car traveling at 60 km/h",
        "b": "Car speeding up from rest"
      }
    ],
    "keyPoints": [
      "Speed tells how fast, acceleration tells how quickly velocity changes",
      "Constant speed does not mean zero acceleration if direction changes",
      "Negative acceleration is deceleration",
      "Both affect motion but in different ways"
    ],
    "faqs": [
      {
        "q": "Can an object have constant speed but non-zero acceleration?",
        "a": "Yes, in circular motion object maintains constant speed but accelerates toward center."
      },
      {
        "q": "What is the relationship between speed and acceleration?",
        "a": "Acceleration measures how fast speed changes, but high speed does not require high acceleration."
      },
      {
        "q": "Is acceleration always positive?",
        "a": "No, acceleration can be negative indicating slowing down or change in direction."
      }
    ]
  },
  {
    "slug": "analog-and-digital-signal",
    "title": "Difference Between Analog and Digital Signal",
    "termA": "Analog Signal",
    "termB": "Digital Signal",
    "category": "Physics",
    "classLevel": "11-12",
    "intro": "Analog signals are continuous and can take any value in a range, while digital signals are discrete with specific values like 0 and 1. Understanding these signals is important for telecommunications and electronics in CBSE physics.",
    "table": [
      {
        "aspect": "Nature of signal",
        "a": "Continuous wave that varies smoothly",
        "b": "Discrete steps with distinct values"
      },
      {
        "aspect": "Values",
        "a": "Can take any value in a range",
        "b": "Takes only specific values (usually 0 and 1)"
      },
      {
        "aspect": "Representation",
        "a": "Represented by sine waves",
        "b": "Represented by square waves"
      },
      {
        "aspect": "Noise susceptibility",
        "a": "Easily affected by noise",
        "b": "Noise resistant"
      },
      {
        "aspect": "Storage",
        "a": "Difficult to store with precision",
        "b": "Easily stored and reproduced"
      },
      {
        "aspect": "Examples",
        "a": "Human voice, radio waves, old telephone",
        "b": "Computer data, mobile signals, digital TV"
      },
      {
        "aspect": "Bandwidth",
        "a": "Requires wider bandwidth",
        "b": "Requires less bandwidth"
      }
    ],
    "keyPoints": [
      "Analog signals represent information through continuous variation; digital signals use discrete steps",
      "Digital signals are more reliable for long-distance transmission because they are noise-resistant",
      "Conversion between analog and digital requires analog-to-digital (ADC) and digital-to-analog (DAC) converters",
      "Modern technology increasingly uses digital signals because they are easier to process, store, and transmit"
    ],
    "faqs": [
      {
        "q": "Why do we convert analog signals to digital?",
        "a": "Digital signals are easier to process, store, transmit without loss, and are more immune to noise and interference"
      },
      {
        "q": "Can digital signals perfectly represent analog signals?",
        "a": "Not perfectly, but with high sampling rates and bit depth, the representation is very close to the original"
      },
      {
        "q": "Which is better, analog or digital?",
        "a": "Digital is better for most modern applications due to noise immunity and storage efficiency, but analog is still used in some audio and scientific applications"
      }
    ]
  },
  {
    "slug": "lan-and-wan",
    "title": "Difference Between LAN and WAN",
    "termA": "LAN (Local Area Network)",
    "termB": "WAN (Wide Area Network)",
    "category": "Computer & GK",
    "classLevel": "10-12",
    "intro": "LAN connects computers in a limited geographic area like a building, while WAN connects computers across large distances like cities or countries. These network types are fundamental to understanding computer networks in CBSE.",
    "table": [
      {
        "aspect": "Coverage area",
        "a": "Limited area, typically one building or campus",
        "b": "Large area, across cities or countries"
      },
      {
        "aspect": "Data transmission speed",
        "a": "High speed, up to 1 Gbps or more",
        "b": "Lower speed, varies with service provider"
      },
      {
        "aspect": "Setup cost",
        "a": "Low cost to set up",
        "b": "High cost to set up"
      },
      {
        "aspect": "Ownership",
        "a": "Owned and maintained by organization",
        "b": "Often uses public or leased lines"
      },
      {
        "aspect": "Error rate",
        "a": "Low error rate",
        "b": "Higher error rate"
      },
      {
        "aspect": "Examples",
        "a": "School/office network, home WiFi",
        "b": "Internet, banks, multinational companies"
      },
      {
        "aspect": "Delay",
        "a": "Minimal delay",
        "b": "Noticeable delay in transmission"
      }
    ],
    "keyPoints": [
      "LANs are fast and cost-effective for connecting computers in nearby locations",
      "WANs enable long-distance communication but at higher cost and lower speed than LANs",
      "The Internet is the largest WAN, connecting millions of networks worldwide",
      "Most organizations use LANs internally and WANs to connect different locations or access the Internet"
    ],
    "faqs": [
      {
        "q": "Is WiFi always a LAN?",
        "a": "WiFi is usually a LAN technology, but WiFi networks can connect to WANs like the Internet"
      },
      {
        "q": "Why is WAN slower than LAN?",
        "a": "WAN signals travel long distances through various network infrastructure, experiencing more delays and potential interference"
      },
      {
        "q": "Can a WAN exist without the Internet?",
        "a": "Yes, organizations can create private WANs using leased lines or VPN connections between locations"
      }
    ]
  },
  {
    "slug": "virus-and-bacteria",
    "title": "Difference Between Virus and Bacteria",
    "termA": "Virus",
    "termB": "Bacteria",
    "category": "Biology",
    "classLevel": "9-12",
    "intro": "Viruses are obligate intracellular parasites without cell structure, while bacteria are single-celled microorganisms with cell structure. Understanding these microorganisms is essential for microbiology in CBSE biology.",
    "table": [
      {
        "aspect": "Cell structure",
        "a": "Not cells, have no cell membrane or organelles",
        "b": "Prokaryotic cells with cell wall and membrane"
      },
      {
        "aspect": "Size",
        "a": "Very small, 20-300 nanometers",
        "b": "Larger, 0.5-5 micrometers"
      },
      {
        "aspect": "Genetic material",
        "a": "DNA or RNA, never both",
        "b": "Double-stranded DNA"
      },
      {
        "aspect": "Reproduction",
        "a": "Only inside host cells",
        "b": "Independent reproduction by binary fission"
      },
      {
        "aspect": "Metabolism",
        "a": "No metabolism of their own",
        "b": "Have their own metabolism"
      },
      {
        "aspect": "Affect on hosts",
        "a": "Always parasitic, always harmful",
        "b": "Can be harmful or beneficial to humans"
      },
      {
        "aspect": "Examples",
        "a": "COVID-19, flu, measles, polio",
        "b": "E. coli, Streptococcus, Lactobacillus"
      }
    ],
    "keyPoints": [
      "Viruses must use host cells for reproduction; bacteria can reproduce independently",
      "Bacteria have cell walls and organelles; viruses have no cellular structure",
      "Viral infections require antiviral drugs; bacterial infections treated with antibiotics",
      "Some bacteria are beneficial to humans; virtually all viruses are parasitic and harmful"
    ],
    "faqs": [
      {
        "q": "Why are viruses not considered living organisms?",
        "a": "Viruses cannot reproduce, metabolize, or maintain themselves outside a host cell, meeting the definition of non-living"
      },
      {
        "q": "Can antibiotics kill viruses?",
        "a": "No, antibiotics target bacterial cell structures which viruses lack; antivirals are needed for viral infections"
      },
      {
        "q": "Are all bacteria harmful to humans?",
        "a": "No, many bacteria are beneficial, such as gut bacteria that aid digestion or bacteria used in yogurt production"
      }
    ]
  },
  {
    "slug": "gdp-and-gnp",
    "title": "Difference Between GDP and GNP",
    "termA": "GDP (Gross Domestic Product)",
    "termB": "GNP (Gross National Product)",
    "category": "Social Science",
    "classLevel": "11-12",
    "intro": "GDP measures the value of goods and services produced within a country's borders, while GNP includes value produced by nationals regardless of location. These economic indicators are crucial for understanding economic growth in CBSE economics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Value of all goods/services in a country",
        "b": "Value produced by nationals worldwide"
      },
      {
        "aspect": "Geographic focus",
        "a": "Within national borders",
        "b": "Regardless of location"
      },
      {
        "aspect": "Includes",
        "a": "Foreign nationals working in country",
        "b": "Only citizens regardless of location"
      },
      {
        "aspect": "Excludes",
        "a": "Citizens working abroad",
        "b": "Foreign nationals in the country"
      },
      {
        "aspect": "Calculation",
        "a": "Production within territorial boundaries",
        "b": "Production by nationals abroad minus production by foreigners"
      },
      {
        "aspect": "Usage",
        "a": "More commonly used for economic comparison",
        "b": "Less commonly used now"
      },
      {
        "aspect": "Formula",
        "a": "GDP = GNP - NFIA",
        "b": "GNP = GDP + NFIA"
      }
    ],
    "keyPoints": [
      "GDP is territorial; GNP is national and includes diaspora income",
      "For countries with significant foreign workers, GDP is higher than GNP",
      "For countries whose citizens work abroad, GNP is higher than GDP",
      "GDP is now preferred by international organizations for economic comparison"
    ],
    "faqs": [
      {
        "q": "Why did India shift focus from GNP to GDP?",
        "a": "GDP better reflects economic productivity within a country's economy and its ability to support its population"
      },
      {
        "q": "Is India's GDP higher or lower than GNP?",
        "a": "India's GDP is generally slightly higher than GNP due to foreign investment and workers in India"
      },
      {
        "q": "Which is better for economic comparison?",
        "a": "GDP is better for comparing economies as it measures actual economic productivity within borders"
      }
    ]
  },
  {
    "slug": "latitude-and-longitude",
    "title": "Difference Between Latitude and Longitude",
    "termA": "Latitude",
    "termB": "Longitude",
    "category": "Geography",
    "classLevel": "9-11",
    "intro": "Latitude measures distance north or south of the equator, while longitude measures distance east or west of the prime meridian. These coordinate systems are essential for map reading and location identification in CBSE geography.",
    "table": [
      {
        "aspect": "Direction",
        "a": "Runs east-west, measures north-south distance",
        "b": "Runs north-south, measures east-west distance"
      },
      {
        "aspect": "Reference line",
        "a": "Equator (0 degrees)",
        "b": "Prime meridian (0 degrees)"
      },
      {
        "aspect": "Range",
        "a": "0 to 90 degrees North and South",
        "b": "0 to 180 degrees East and West"
      },
      {
        "aspect": "Lines appearance on globe",
        "a": "Parallel circles decreasing in size toward poles",
        "b": "Semi-circles from north to south pole"
      },
      {
        "aspect": "Climate influence",
        "a": "Directly affects climate and seasons",
        "b": "Does not directly affect climate"
      },
      {
        "aspect": "Length of lines",
        "a": "Longest at equator, shortest at poles",
        "b": "All meridians are equal length"
      },
      {
        "aspect": "Example location",
        "a": "India at 8 to 35 degrees N",
        "b": "India at 68 to 97 degrees E"
      }
    ],
    "keyPoints": [
      "Latitude determines climatic zones; equatorial regions are hot while poles are cold",
      "Longitude is arbitrary; prime meridian passes through Greenwich, London",
      "Both are measured in degrees, minutes, and seconds for precise location",
      "Every location on Earth has unique latitude-longitude coordinates"
    ],
    "faqs": [
      {
        "q": "Why is the prime meridian at Greenwich?",
        "a": "It was established by international agreement in 1884; Greenwich was chosen because of Britain's naval dominance"
      },
      {
        "q": "How many latitudes and longitudes are there?",
        "a": "Infinite, as they are continuous measurements; typically maps show major lines at regular intervals like 15 or 30 degrees"
      },
      {
        "q": "Does India lie on any important latitude or longitude?",
        "a": "The Tropic of Cancer (23.5 N) passes through India; longitude 82.5 E passes through central India"
      }
    ]
  },
  {
    "slug": "evaporation-and-condensation",
    "title": "Difference Between Evaporation and Condensation",
    "termA": "Evaporation",
    "termB": "Condensation",
    "category": "Science",
    "classLevel": "9-11",
    "intro": "Evaporation is the conversion of liquid water to water vapor, while condensation is the conversion of water vapor back to liquid. These processes are critical parts of the water cycle studied in CBSE science.",
    "table": [
      {
        "aspect": "Process",
        "a": "Liquid transforms to gas/vapor",
        "b": "Gas/vapor transforms to liquid"
      },
      {
        "aspect": "Temperature change",
        "a": "Requires heat energy input",
        "b": "Releases heat energy"
      },
      {
        "aspect": "Molecules",
        "a": "Gain energy and spread apart",
        "b": "Lose energy and come together"
      },
      {
        "aspect": "Examples",
        "a": "Wet clothes drying, puddles disappearing",
        "b": "Dew on grass, water droplets on mirrors"
      },
      {
        "aspect": "Water cycle role",
        "a": "Water leaves surface and enters atmosphere",
        "b": "Water leaves atmosphere and forms clouds"
      },
      {
        "aspect": "Rate factor",
        "a": "Increases with temperature and wind",
        "b": "Increases as temperature decreases"
      },
      {
        "aspect": "Energy",
        "a": "Endothermic (absorbs heat)",
        "b": "Exothermic (releases heat)"
      }
    ],
    "keyPoints": [
      "Evaporation and condensation are opposite processes in the water cycle",
      "Evaporation requires energy input; condensation releases energy",
      "Humidity affects evaporation rate; condensation occurs when air reaches dew point",
      "Together these processes are responsible for weather patterns and precipitation"
    ],
    "faqs": [
      {
        "q": "Can evaporation happen at any temperature?",
        "a": "Yes, even at low temperatures water can slowly evaporate; boiling is just rapid evaporation at high temperature"
      },
      {
        "q": "Why do we see water droplets on bathroom mirrors after a shower?",
        "a": "Hot water evaporates and condenses on the cooler mirror surface"
      },
      {
        "q": "What is the dew point?",
        "a": "The temperature at which air becomes saturated and water vapor condenses into liquid water"
      }
    ]
  },
  {
    "slug": "boiling-and-evaporation",
    "title": "Difference Between Boiling and Evaporation",
    "termA": "Boiling",
    "termB": "Evaporation",
    "category": "Science",
    "classLevel": "9-11",
    "intro": "Boiling is the rapid vaporization of liquid at its boiling point, while evaporation is the slow conversion of liquid to vapor at any temperature. Both are phase changes studied in CBSE science.",
    "table": [
      {
        "aspect": "Temperature",
        "a": "Occurs only at specific boiling point",
        "b": "Occurs at any temperature"
      },
      {
        "aspect": "Rate",
        "a": "Very rapid transformation",
        "b": "Slow and gradual process"
      },
      {
        "aspect": "Visible signs",
        "a": "Bubbles form throughout the liquid",
        "b": "No visible bubbles or signs"
      },
      {
        "aspect": "Location",
        "a": "Occurs throughout the liquid",
        "b": "Occurs only at the surface"
      },
      {
        "aspect": "External pressure effect",
        "a": "Boiling point changes with pressure",
        "b": "Evaporation not affected by pressure"
      },
      {
        "aspect": "Energy requirement",
        "a": "Requires continuous heat supply",
        "b": "Requires intermittent heat input"
      },
      {
        "aspect": "Examples",
        "a": "Heating water in a pot until steam rises",
        "b": "Clothes drying on a clothesline"
      }
    ],
    "keyPoints": [
      "Boiling occurs at a definite temperature for each liquid; evaporation occurs at all temperatures",
      "Boiling is a vigorous process with bubble formation; evaporation is quiet and occurs at the surface",
      "In high-altitude areas, water boils at lower temperatures due to lower atmospheric pressure",
      "Both processes involve conversion of liquid to gas but at different rates and under different conditions"
    ],
    "faqs": [
      {
        "q": "Can water evaporate below 100 degrees Celsius?",
        "a": "Yes, water constantly evaporates below boiling point; the wet ground dries even without rain"
      },
      {
        "q": "Why does water boil at lower temperature on mountains?",
        "a": "Lower atmospheric pressure means water molecules need less kinetic energy to escape the liquid"
      },
      {
        "q": "Which is faster, boiling or evaporation?",
        "a": "Boiling is much faster; the same mass of water boils away in seconds compared to hours for evaporation"
      }
    ]
  },
  {
    "slug": "mirror-and-lens",
    "title": "Difference Between Mirror and Lens",
    "termA": "Mirror",
    "termB": "Lens",
    "category": "Physics",
    "classLevel": "10-12",
    "intro": "Mirrors reflect light off a polished surface, while lenses refract light through transparent material. Both optical instruments form images but use different principles studied in CBSE physics optics.",
    "table": [
      {
        "aspect": "Principle",
        "a": "Uses reflection of light",
        "b": "Uses refraction of light"
      },
      {
        "aspect": "Material",
        "a": "Metal surface with reflective coating",
        "b": "Transparent material (glass, plastic)"
      },
      {
        "aspect": "Light passage",
        "a": "Light bounces off the surface",
        "b": "Light passes through the material"
      },
      {
        "aspect": "Image types",
        "a": "Real and virtual images possible",
        "b": "Real and virtual images possible"
      },
      {
        "aspect": "Focal length",
        "a": "Depends on radius of curvature",
        "b": "Depends on refractive index"
      },
      {
        "aspect": "Magnification range",
        "a": "Limited magnification possible",
        "b": "Greater magnification possible"
      },
      {
        "aspect": "Common uses",
        "a": "Telescopes, shaving mirrors, security mirrors",
        "b": "Cameras, microscopes, glasses, eye correction"
      }
    ],
    "keyPoints": [
      "Mirrors use reflection; lenses use refraction for image formation",
      "Both can form real or virtual images depending on type and object position",
      "Curved mirrors and lenses follow similar mathematics for focal length and magnification",
      "Mirrors are faster for image formation; lenses provide better magnification"
    ],
    "faqs": [
      {
        "q": "Which is better for telescopes, mirrors or lenses?",
        "a": "Large mirrors are better because lenses of large diameter are expensive and heavy to support"
      },
      {
        "q": "Can both mirrors and lenses correct vision?",
        "a": "No, only lenses can correct vision; mirrors are not used for this purpose"
      },
      {
        "q": "Why do some telescopes use mirrors instead of lenses?",
        "a": "Mirrors are cheaper to produce in large diameters and don't suffer from chromatic aberration"
      }
    ]
  },
  {
    "slug": "voltage-and-current",
    "title": "Difference Between Voltage and Current",
    "termA": "Voltage",
    "termB": "Current",
    "category": "Physics",
    "classLevel": "10-12",
    "intro": "Voltage is the electrical potential difference that drives current, while current is the flow of electrical charge. These fundamental electrical concepts are essential for understanding electricity in CBSE physics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Potential difference between two points",
        "b": "Flow of electrical charges"
      },
      {
        "aspect": "Cause and effect",
        "a": "Causes current to flow",
        "b": "Result of voltage applied"
      },
      {
        "aspect": "SI Unit",
        "a": "Volt (V)",
        "b": "Ampere (A)"
      },
      {
        "aspect": "Symbol",
        "a": "V",
        "b": "I or A"
      },
      {
        "aspect": "Measurement",
        "a": "Measured with voltmeter (parallel connection)",
        "b": "Measured with ammeter (series connection)"
      },
      {
        "aspect": "Analogy",
        "a": "Like water pressure in a pipe",
        "b": "Like flow of water through a pipe"
      },
      {
        "aspect": "Formula relationship",
        "a": "V = I x R (Ohm's law)",
        "b": "I = V / R (Ohm's law)"
      }
    ],
    "keyPoints": [
      "Voltage is the push that drives charge; current is the actual flow of charge",
      "Higher voltage causes higher current if resistance remains constant",
      "Current can flow only if there is voltage; voltage can exist without current flowing",
      "Ohm's law shows the relationship: V = IR"
    ],
    "faqs": [
      {
        "q": "Can there be voltage without current?",
        "a": "Yes, if the circuit is open (broken), there is voltage but no current flows"
      },
      {
        "q": "Why is a voltmeter connected in parallel?",
        "a": "To measure the full potential difference between two points without drawing significant current"
      },
      {
        "q": "What is the relationship between voltage and current?",
        "a": "They are directly proportional if resistance is constant; doubling voltage doubles current"
      }
    ]
  },
  {
    "slug": "permutation-and-combination",
    "title": "Difference Between Permutation and Combination",
    "termA": "Permutation",
    "termB": "Combination",
    "category": "Maths",
    "classLevel": "11-12",
    "intro": "Permutations count arrangements where order matters, while combinations count selections where order doesn't matter. These counting principles are crucial for probability and statistics in CBSE mathematics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Arrangements where order matters",
        "b": "Selections where order doesn't matter"
      },
      {
        "aspect": "Order importance",
        "a": "Changing order creates different permutation",
        "b": "Changing order doesn't create new combination"
      },
      {
        "aspect": "Formula",
        "a": "P(n,r) = n!/(n-r)!",
        "b": "C(n,r) = n!/(r!(n-r)!)"
      },
      {
        "aspect": "Example",
        "a": "ABC, BCA, CAB are different",
        "b": "ABC and BCA are the same"
      },
      {
        "aspect": "Count",
        "a": "Always larger number",
        "b": "Always smaller number"
      },
      {
        "aspect": "Use cases",
        "a": "Password, seating arrangements, rankings",
        "b": "Lottery, committee selection, choosing teams"
      },
      {
        "aspect": "Real example",
        "a": "Arranging 3 books in a row",
        "b": "Choosing 3 books from shelf"
      }
    ],
    "keyPoints": [
      "Permutations are for ordered arrangements; combinations are for unordered selections",
      "P(n,r) is always equal to or greater than C(n,r)",
      "P(n,r) = C(n,r) x r! because each combination can be arranged in r! ways",
      "Most real-world counting problems use combinations"
    ],
    "faqs": [
      {
        "q": "Why is permutation count always larger?",
        "a": "Because same items can be arranged in multiple ways, permutation counts all arrangements while combination counts only selections"
      },
      {
        "q": "When choosing a committee, why use combinations?",
        "a": "Order doesn't matter in a committee; selecting Alice, Bob, Charlie is same as selecting Charlie, Bob, Alice"
      },
      {
        "q": "How do you convert permutation to combination?",
        "a": "Divide permutation by r! (factorial of r) to account for multiple arrangements of same selection"
      }
    ]
  },
  {
    "slug": "square-and-cube",
    "title": "Difference Between Square and Cube",
    "termA": "Square",
    "termB": "Cube",
    "category": "Maths",
    "classLevel": "9-12",
    "intro": "A square is a two-dimensional shape with equal sides, while a cube is a three-dimensional shape with equal edges. These geometric concepts are fundamental to geometry in CBSE mathematics.",
    "table": [
      {
        "aspect": "Dimensions",
        "a": "Two-dimensional (2D)",
        "b": "Three-dimensional (3D)"
      },
      {
        "aspect": "Number of sides",
        "a": "4 sides of equal length",
        "b": "12 edges of equal length"
      },
      {
        "aspect": "Number of faces",
        "a": "1 flat surface",
        "b": "6 square faces"
      },
      {
        "aspect": "Vertices",
        "a": "4 corners",
        "b": "8 corners"
      },
      {
        "aspect": "Area/Volume",
        "a": "Area = side squared",
        "b": "Volume = side cubed"
      },
      {
        "aspect": "Perimeter/Surface area",
        "a": "Perimeter = 4 x side",
        "b": "Surface area = 6 x side squared"
      },
      {
        "aspect": "Diagonal",
        "a": "Side x square root of 2",
        "b": "Side x square root of 3"
      }
    ],
    "keyPoints": [
      "Square is 2D shape; cube is 3D shape made of squares",
      "Area measures space inside square; volume measures space inside cube",
      "A cube has 6 square faces; combining these faces creates the 3D shape",
      "Surface area of cube is sum of all 6 square faces"
    ],
    "faqs": [
      {
        "q": "Is a cube made of squares?",
        "a": "Yes, a cube is made up of 6 equal square faces joined together"
      },
      {
        "q": "How many edges does a cube have?",
        "a": "A cube has 12 edges, where each edge has the same length"
      },
      {
        "q": "What is the diagonal of a square and cube?",
        "a": "Square diagonal = side x square root of 2; cube diagonal = side x square root of 3"
      }
    ]
  },
  {
    "slug": "endothermic-and-exothermic-reaction",
    "title": "Difference Between Endothermic and Exothermic Reaction",
    "termA": "Endothermic Reaction",
    "termB": "Exothermic Reaction",
    "category": "Chemistry",
    "classLevel": "9-12",
    "intro": "Endothermic reactions absorb heat from surroundings and feel cold, while exothermic reactions release heat and feel hot. These chemical processes are fundamental to thermochemistry in CBSE.",
    "table": [
      {
        "aspect": "Heat flow",
        "a": "Absorbs heat from surroundings",
        "b": "Releases heat to surroundings"
      },
      {
        "aspect": "Temperature change",
        "a": "Surroundings get colder",
        "b": "Surroundings get hotter"
      },
      {
        "aspect": "Energy diagram",
        "a": "Products have higher energy than reactants",
        "b": "Products have lower energy than reactants"
      },
      {
        "aspect": "ΔH value",
        "a": "ΔH is positive (+)",
        "b": "ΔH is negative (-)"
      },
      {
        "aspect": "Examples",
        "a": "Melting ice, evaporation, photosynthesis",
        "b": "Burning fuel, combustion, respiration"
      },
      {
        "aspect": "Activation energy",
        "a": "Needs continuous heat input",
        "b": "May need initial ignition, then sustains"
      },
      {
        "aspect": "Spontaneity",
        "a": "Generally non-spontaneous",
        "b": "Generally spontaneous"
      }
    ],
    "keyPoints": [
      "Endothermic reactions feel cold; exothermic reactions feel hot",
      "Endothermic reactions have positive ΔH; exothermic reactions have negative ΔH",
      "Photosynthesis is endothermic; cellular respiration is exothermic (opposite process)",
      "All reactions follow energy conservation law"
    ],
    "faqs": [
      {
        "q": "Why do exothermic reactions release heat?",
        "a": "Products formed have lower energy than reactants; the difference is released as heat"
      },
      {
        "q": "Can an endothermic reaction be spontaneous?",
        "a": "Yes, if entropy increase is large enough to overcome the positive enthalpy"
      },
      {
        "q": "Which type requires more energy input?",
        "a": "Endothermic reactions require continuous energy input to proceed"
      }
    ]
  },
  {
    "slug": "element-and-mixture",
    "title": "Difference Between Element and Mixture",
    "termA": "Element",
    "termB": "Mixture",
    "category": "Chemistry",
    "classLevel": "9-12",
    "intro": "An element is a pure substance made of only one type of atom, while a mixture contains two or more substances. Understanding these classifications is fundamental to chemistry in CBSE.",
    "table": [
      {
        "aspect": "Composition",
        "a": "Single type of atom only",
        "b": "Two or more substances combined"
      },
      {
        "aspect": "Purity",
        "a": "Pure substance",
        "b": "Impure substance"
      },
      {
        "aspect": "Separation",
        "a": "Cannot be separated by physical methods",
        "b": "Can be separated by physical methods"
      },
      {
        "aspect": "Chemical formula",
        "a": "Has a symbol (H, O, C, etc.)",
        "b": "No single formula"
      },
      {
        "aspect": "Properties",
        "a": "Fixed, unique properties",
        "b": "Variable properties"
      },
      {
        "aspect": "Examples",
        "a": "Oxygen, Carbon, Iron, Gold",
        "b": "Air, salt water, sand and salt"
      },
      {
        "aspect": "Number of substances",
        "a": "One substance only",
        "b": "Two or more substances"
      }
    ],
    "keyPoints": [
      "Elements are the simplest pure substances; mixtures are combinations of elements or compounds",
      "Elements cannot be broken down further by chemical methods; mixtures can be separated physically",
      "All substances are made of elements, but not all are pure elements",
      "Mixtures can be homogeneous (uniform) or heterogeneous (non-uniform)"
    ],
    "faqs": [
      {
        "q": "Is water an element or mixture?",
        "a": "Water is a compound made of hydrogen and oxygen, not an element or mixture"
      },
      {
        "q": "How can you separate a mixture but not an element?",
        "a": "Mixtures contain separate substances that can be separated by filtering, evaporating, or distilling"
      },
      {
        "q": "Why are there only about 118 elements?",
        "a": "Elements are made of atoms; atom structure is determined by number of protons, and there are about 118 stable atom types"
      }
    ]
  },
  {
    "slug": "pure-substance-and-mixture",
    "title": "Difference Between Pure Substance and Mixture",
    "termA": "Pure Substance",
    "termB": "Mixture",
    "category": "Chemistry",
    "classLevel": "9-12",
    "intro": "Pure substances have a fixed composition and consistent properties, while mixtures have variable composition and properties. These classifications are fundamental to understanding matter in CBSE chemistry.",
    "table": [
      {
        "aspect": "Composition",
        "a": "Fixed, definite composition",
        "b": "Variable composition"
      },
      {
        "aspect": "Properties",
        "a": "Constant, unique properties",
        "b": "Varies depending on proportions"
      },
      {
        "aspect": "Separation",
        "a": "Cannot be separated by physical means",
        "b": "Can be separated by physical means"
      },
      {
        "aspect": "Melting/Boiling point",
        "a": "Sharp, definite melting and boiling points",
        "b": "Range of melting and boiling points"
      },
      {
        "aspect": "Types",
        "a": "Element or Compound",
        "b": "Homogeneous or Heterogeneous"
      },
      {
        "aspect": "Examples",
        "a": "Pure water (H2O), pure iron (Fe)",
        "b": "Salt water, air, concrete"
      },
      {
        "aspect": "Chemical reaction",
        "a": "New substance may form",
        "b": "No new substance formation"
      }
    ],
    "keyPoints": [
      "Pure substances have fixed composition; mixtures have variable composition",
      "Pure substances have sharp phase-change temperatures; mixtures have ranges",
      "Elements and compounds are pure substances; mixtures are combinations",
      "Pure substances contain only one type of particle; mixtures contain multiple types"
    ],
    "faqs": [
      {
        "q": "Is milk a pure substance or mixture?",
        "a": "Milk is a mixture; it contains water, proteins, fats, and other substances in varying amounts"
      },
      {
        "q": "How can you tell if something is pure?",
        "a": "Pure substances have sharp melting and boiling points; mixtures have ranges"
      },
      {
        "q": "Can a mixture become a pure substance?",
        "a": "Yes, by separating the components using filtration, distillation, or other methods"
      }
    ]
  },
  {
    "slug": "renewable-and-non-renewable-energy",
    "title": "Difference Between Renewable and Non-Renewable Energy",
    "termA": "Renewable Energy",
    "termB": "Non-Renewable Energy",
    "category": "Science",
    "classLevel": "9-12",
    "intro": "Renewable energy can be replenished naturally and sustainably, while non-renewable energy is finite and depletes with use. Understanding these energy types is crucial for environmental science in CBSE.",
    "table": [
      {
        "aspect": "Availability",
        "a": "Continuously replenished by nature",
        "b": "Limited, will eventually run out"
      },
      {
        "aspect": "Environmental impact",
        "a": "Minimal pollution and waste",
        "b": "High pollution and greenhouse gases"
      },
      {
        "aspect": "Cost",
        "a": "Higher initial cost, low operating cost",
        "b": "Lower initial cost, continuous fuel cost"
      },
      {
        "aspect": "Examples",
        "a": "Solar, wind, hydro, geothermal, biomass",
        "b": "Coal, petroleum, natural gas, uranium"
      },
      {
        "aspect": "Time to form",
        "a": "Naturally replenished quickly",
        "b": "Takes millions of years to form"
      },
      {
        "aspect": "Efficiency",
        "a": "Lower efficiency currently",
        "b": "Higher efficiency, proven technology"
      },
      {
        "aspect": "Sustainability",
        "a": "Sustainable for indefinite time",
        "b": "Not sustainable long-term"
      }
    ],
    "keyPoints": [
      "Renewable energy comes from natural sources that replenish; non-renewable comes from fossil fuels",
      "Renewable energy is cleaner but current technology is less efficient",
      "Non-renewable energy is more established but causes climate change",
      "Future energy needs will increasingly depend on renewable sources"
    ],
    "faqs": [
      {
        "q": "Why do we still use non-renewable energy?",
        "a": "Non-renewable energy is more efficient and established, but as technology improves, renewable energy will become dominant"
      },
      {
        "q": "Is nuclear energy renewable or non-renewable?",
        "a": "Nuclear is non-renewable because uranium reserves are finite, but it produces no greenhouse gases"
      },
      {
        "q": "Which renewable energy is most used in India?",
        "a": "Hydroelectric power is the most established; solar and wind are growing rapidly"
      }
    ]
  },
  {
    "slug": "weather-and-season",
    "title": "Difference Between Weather and Season",
    "termA": "Weather",
    "termB": "Season",
    "category": "Geography",
    "classLevel": "9-11",
    "intro": "Weather describes the short-term atmospheric conditions in a specific place, while season is a long-term pattern of weather over months. Understanding these concepts is fundamental to geography in CBSE.",
    "table": [
      {
        "aspect": "Duration",
        "a": "Short-term, hours to days",
        "b": "Long-term, months (typically 3)"
      },
      {
        "aspect": "Predictability",
        "a": "Difficult to predict beyond days",
        "b": "Predictable and repeats annually"
      },
      {
        "aspect": "Causes",
        "a": "Daily temperature and pressure changes",
        "b": "Earth's tilt and position in orbit"
      },
      {
        "aspect": "Examples",
        "a": "Today is sunny, rainy, cloudy, or windy",
        "b": "Summer, winter, spring, autumn"
      },
      {
        "aspect": "Changes",
        "a": "Changes rapidly and unpredictably",
        "b": "Changes slowly and predictably"
      },
      {
        "aspect": "Measurement",
        "a": "Temperature, humidity, wind speed",
        "b": "Average conditions over 3 months"
      },
      {
        "aspect": "Area affected",
        "a": "Local area (town, city)",
        "b": "Large regions or hemispheres"
      }
    ],
    "keyPoints": [
      "Weather changes daily; seasons change over months",
      "Weather is unpredictable; seasons are predictable and regular",
      "Seasons result from Earth's tilt causing different sun intensity",
      "Climate is long-term average of weather; season is one part of climate"
    ],
    "faqs": [
      {
        "q": "Can weather predict season?",
        "a": "No, weather is unpredictable day-to-day; seasons follow a regular annual pattern"
      },
      {
        "q": "How many seasons are there in India?",
        "a": "Traditionally four, but in meteorology often classified as summer, monsoon, post-monsoon, winter"
      },
      {
        "q": "Why are seasons opposite in northern and southern hemispheres?",
        "a": "Earth's tilt causes northern hemisphere to face sun during northern hemisphere summer, while southern faces away"
      }
    ]
  },
  {
    "slug": "revolution-and-rotation",
    "title": "Difference Between Revolution and Rotation",
    "termA": "Revolution",
    "termB": "Rotation",
    "category": "Geography",
    "classLevel": "9-11",
    "intro": "Revolution is the orbital movement of Earth around the sun, while rotation is the spinning of Earth on its axis. These astronomical movements are essential to geography in CBSE.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Movement around the sun in orbit",
        "b": "Spinning on its own axis"
      },
      {
        "aspect": "Time taken",
        "a": "365.25 days (1 year)",
        "b": "24 hours (1 day)"
      },
      {
        "aspect": "Axis of movement",
        "a": "Around the sun",
        "b": "Around Earth's own axis"
      },
      {
        "aspect": "Causes",
        "a": "Causes seasons and solar year",
        "b": "Causes day and night"
      },
      {
        "aspect": "Speed",
        "a": "About 30 km/second",
        "b": "About 1700 km/hour at equator"
      },
      {
        "aspect": "Tilt",
        "a": "Orbital plane is elliptical",
        "b": "Axis is tilted 23.5 degrees"
      },
      {
        "aspect": "Path",
        "a": "Elliptical orbit around sun",
        "b": "Circular motion about axis"
      }
    ],
    "keyPoints": [
      "Revolution determines the year length; rotation determines the day length",
      "Earth's axial tilt combined with revolution creates seasons",
      "Rotation causes the apparent motion of sun and stars in the sky",
      "Both motions are essential for life on Earth"
    ],
    "faqs": [
      {
        "q": "Why do we have seasons if there is rotation?",
        "a": "Rotation causes day and night; revolution combined with axial tilt causes seasons"
      },
      {
        "q": "What happens at the poles during rotation?",
        "a": "Poles rotate slowly; equator rotates fastest at about 1700 km/hour"
      },
      {
        "q": "Is Earth's orbit perfectly circular?",
        "a": "No, Earth's orbit is slightly elliptical; it is closest to sun in January and farthest in July"
      }
    ]
  },
  {
    "slug": "day-and-night",
    "title": "Difference Between Day and Night",
    "termA": "Day",
    "termB": "Night",
    "category": "Geography",
    "classLevel": "9-11",
    "intro": "Day occurs when a place faces the sun with sunlight and heat, while night occurs when a place faces away from the sun in darkness. These fundamental concepts are taught in CBSE geography.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Time when location faces the sun",
        "b": "Time when location faces away from sun"
      },
      {
        "aspect": "Sunlight",
        "a": "Direct sunlight present",
        "b": "No direct sunlight"
      },
      {
        "aspect": "Duration",
        "a": "About 12 hours at equator",
        "b": "About 12 hours at equator"
      },
      {
        "aspect": "Temperature",
        "a": "Warmer due to sun's heat",
        "b": "Cooler as heat radiates away"
      },
      {
        "aspect": "Cause",
        "a": "Due to Earth's rotation toward sun",
        "b": "Due to Earth's rotation away from sun"
      },
      {
        "aspect": "At poles",
        "a": "Polar day: 24 hours of daylight",
        "b": "Polar night: 24 hours of darkness"
      },
      {
        "aspect": "Visibility",
        "a": "Celestial bodies not visible",
        "b": "Stars and moon visible"
      }
    ],
    "keyPoints": [
      "Day and night are caused by Earth's rotation on its axis",
      "At the equator, day and night are always about 12 hours each",
      "Near poles, day length varies from 0 to 24 hours depending on season",
      "Earth rotates counterclockwise, making the sun appear to move east to west"
    ],
    "faqs": [
      {
        "q": "Why are days and nights not exactly 12 hours each?",
        "a": "Due to atmospheric refraction and the sun's angular size, twilight extends the day slightly"
      },
      {
        "q": "What happens at the North Pole?",
        "a": "It experiences polar day (24-hour daylight) for about 6 months and polar night (24-hour darkness) for 6 months"
      },
      {
        "q": "How fast does Earth rotate?",
        "a": "Earth completes one rotation in 24 hours, rotating about 360 degrees per day"
      }
    ]
  },
  {
    "slug": "solar-and-lunar-eclipse",
    "title": "Difference Between Solar and Lunar Eclipse",
    "termA": "Solar Eclipse",
    "termB": "Lunar Eclipse",
    "category": "Geography",
    "classLevel": "9-11",
    "intro": "A solar eclipse occurs when the moon blocks the sun's light, while a lunar eclipse occurs when Earth blocks the sun's light from reaching the moon. These astronomical events are fascinating topics in CBSE geography.",
    "table": [
      {
        "aspect": "Cause",
        "a": "Moon passes between sun and Earth",
        "b": "Earth passes between sun and moon"
      },
      {
        "aspect": "What is blocked",
        "a": "Sun's light is blocked by moon",
        "b": "Sun's light from reaching moon is blocked"
      },
      {
        "aspect": "When it occurs",
        "a": "During new moon (moon between sun and Earth)",
        "b": "During full moon (Earth between sun and moon)"
      },
      {
        "aspect": "What darkens",
        "a": "The sun appears dark during day",
        "b": "The moon appears dark red at night"
      },
      {
        "aspect": "Visibility",
        "a": "Visible from limited areas on Earth",
        "b": "Visible from entire night side of Earth"
      },
      {
        "aspect": "Shadow",
        "a": "Moon's shadow falls on Earth",
        "b": "Earth's shadow falls on moon"
      },
      {
        "aspect": "Duration",
        "a": "Few minutes at most",
        "b": "Can last up to 1 hour"
      }
    ],
    "keyPoints": [
      "Solar eclipse happens at new moon; lunar eclipse happens at full moon",
      "Solar eclipse is visible only from certain regions; lunar eclipse visible from entire night side",
      "Solar eclipse is dangerous to watch without special glasses; lunar eclipse is safe to watch",
      "Both types of eclipses follow regular cycles predictable by astronomy"
    ],
    "faqs": [
      {
        "q": "Why can we see the moon during a lunar eclipse?",
        "a": "Earth's atmosphere refracts some sun light onto the moon, making it appear reddish"
      },
      {
        "q": "Is it safe to watch a lunar eclipse?",
        "a": "Yes, lunar eclipse is completely safe to watch with naked eyes"
      },
      {
        "q": "Why don't eclipses happen every month?",
        "a": "Moon's orbit is tilted about 5 degrees relative to Earth's orbit, so alignments happen only a few times yearly"
      }
    ]
  },
  {
    "slug": "igneous-and-sedimentary-rocks",
    "title": "Difference Between Igneous and Sedimentary Rocks",
    "termA": "Igneous Rocks",
    "termB": "Sedimentary Rocks",
    "category": "Geography",
    "classLevel": "9-11",
    "intro": "Igneous rocks form from cooling magma, while sedimentary rocks form from consolidated sediments. Understanding rock types is fundamental to geology in CBSE geography.",
    "table": [
      {
        "aspect": "Formation",
        "a": "From cooling and solidification of magma",
        "b": "From compaction of sediments over time"
      },
      {
        "aspect": "Origin material",
        "a": "Molten rock from within Earth",
        "b": "Fragments of existing rocks and minerals"
      },
      {
        "aspect": "Crystal size",
        "a": "Large crystals if cooled slowly underground",
        "b": "No visible crystals usually"
      },
      {
        "aspect": "Examples",
        "a": "Granite, basalt, pumice",
        "b": "Sandstone, limestone, shale"
      },
      {
        "aspect": "Density",
        "a": "Denser rocks",
        "b": "Less dense rocks"
      },
      {
        "aspect": "Fossils",
        "a": "Rarely contains fossils",
        "b": "Often contains fossils"
      },
      {
        "aspect": "Cooling rate",
        "a": "Depends on cooling speed",
        "b": "Formed slowly through cementation"
      }
    ],
    "keyPoints": [
      "Igneous rocks form from magma; sedimentary rocks form from erosion products",
      "Granite (igneous) has large crystals; basalt (igneous) has small crystals",
      "Sedimentary rocks are more likely to contain fossils and are softer",
      "Both rock types are part of the rock cycle and can transform into each other"
    ],
    "faqs": [
      {
        "q": "How do igneous rocks with large crystals form?",
        "a": "When magma cools slowly underground, atoms have time to arrange into large crystals"
      },
      {
        "q": "Why are fossils found in sedimentary rocks?",
        "a": "Sedimentary rocks form from accumulation of sediments that can bury organisms before they decompose"
      },
      {
        "q": "Can igneous rocks become sedimentary?",
        "a": "Yes, through weathering and erosion, igneous rocks can be broken down into sediments"
      }
    ]
  },
  {
    "slug": "fauna-and-flora",
    "title": "Difference Between Fauna and Flora",
    "termA": "Fauna",
    "termB": "Flora",
    "category": "Science",
    "classLevel": "9-12",
    "intro": "Fauna refers to animals in an ecosystem or region, while flora refers to plants. Understanding biodiversity and ecosystems requires knowledge of both in CBSE science.",
    "table": [
      {
        "aspect": "Definition",
        "a": "All animals in a region or ecosystem",
        "b": "All plants in a region or ecosystem"
      },
      {
        "aspect": "Origin of term",
        "a": "From Roman goddess Fauna",
        "b": "From Roman goddess Flora"
      },
      {
        "aspect": "Mobility",
        "a": "Most animals can move",
        "b": "Plants are stationary"
      },
      {
        "aspect": "Food source",
        "a": "Consumers of energy",
        "b": "Producers of energy"
      },
      {
        "aspect": "Respiration type",
        "a": "Aerobic respiration",
        "b": "Photosynthesis plus respiration"
      },
      {
        "aspect": "Examples",
        "a": "Lions, deer, birds, insects, fish",
        "b": "Trees, grasses, flowers, algae"
      },
      {
        "aspect": "Diversity in rainforest",
        "a": "High diversity of species",
        "b": "High diversity of species"
      }
    ],
    "keyPoints": [
      "Flora are producers; fauna are consumers",
      "Flora uses photosynthesis; fauna uses respiration",
      "Ecosystems need both flora and fauna for energy flow and nutrient cycling",
      "Conservation of both is necessary for biodiversity"
    ],
    "faqs": [
      {
        "q": "Can an ecosystem exist with only flora?",
        "a": "Theoretically yes for basic photosynthesis, but decomposers are also needed for nutrient cycling"
      },
      {
        "q": "What happens if all fauna disappears?",
        "a": "Flora would accumulate as they would not be consumed; decomposers would still break them down"
      },
      {
        "q": "Are fungi considered flora?",
        "a": "Traditionally flora meant plants, but fungi are sometimes included in ecological discussions"
      }
    ]
  },
  {
    "slug": "herbivore-and-carnivore",
    "title": "Difference Between Herbivore and Carnivore",
    "termA": "Herbivore",
    "termB": "Carnivore",
    "category": "Biology",
    "classLevel": "9-12",
    "intro": "Herbivores eat plants exclusively, while carnivores eat meat exclusively. Understanding feeding patterns is essential for ecology and food chains in CBSE biology.",
    "table": [
      {
        "aspect": "Diet",
        "a": "Eats only plants and plant material",
        "b": "Eats only meat and animal flesh"
      },
      {
        "aspect": "Trophic level",
        "a": "Primary consumers",
        "b": "Secondary or tertiary consumers"
      },
      {
        "aspect": "Teeth structure",
        "a": "Flat molars for grinding",
        "b": "Sharp canines and incisors for tearing"
      },
      {
        "aspect": "Digestive system",
        "a": "Longer intestines to digest plant fiber",
        "b": "Shorter intestines for quick protein digestion"
      },
      {
        "aspect": "Saliva composition",
        "a": "Contains enzymes to break down plants",
        "b": "Less enzymatic saliva"
      },
      {
        "aspect": "Examples",
        "a": "Cow, horse, deer, rabbit, goat",
        "b": "Lion, tiger, eagle, shark"
      },
      {
        "aspect": "Energy efficiency",
        "a": "Less efficient, produce less energy",
        "b": "More efficient, get more energy per prey"
      }
    ],
    "keyPoints": [
      "Herbivores have adaptations for plant digestion; carnivores for meat digestion",
      "Herbivores are more numerous in food chains but less efficient at converting food",
      "Carnivores are fewer but require fewer individuals for same energy needs",
      "Omnivores eat both plants and meat with mixed adaptations"
    ],
    "faqs": [
      {
        "q": "Why are there more herbivores than carnivores?",
        "a": "Herbivores have direct access to plant energy; carnivores must hunt herbivores, requiring more territory per animal"
      },
      {
        "q": "Can herbivores survive on only one type of plant?",
        "a": "Most herbivores need variety of plants for balanced nutrition, though some specialize"
      },
      {
        "q": "What are omnivores?",
        "a": "Omnivores eat both plants and meat, with digestive systems adapted for both types of food"
      }
    ]
  },
  {
    "slug": "pollination-and-fertilization",
    "title": "Difference Between Pollination and Fertilization",
    "termA": "Pollination",
    "termB": "Fertilization",
    "category": "Biology",
    "classLevel": "10-12",
    "intro": "Pollination is the transfer of pollen from anther to stigma, while fertilization is the fusion of male and female gametes. These processes are crucial for plant reproduction in CBSE biology.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Transfer of pollen to stigma",
        "b": "Fusion of male and female gametes"
      },
      {
        "aspect": "What moves",
        "a": "Pollen grain from anther",
        "b": "Sperm nucleus to egg cell"
      },
      {
        "aspect": "Requirement",
        "a": "Requires pollinating agent (bee, wind)",
        "b": "Automatic once pollen reaches stigma"
      },
      {
        "aspect": "Location",
        "a": "Occurs on flower stigma",
        "b": "Occurs inside ovule"
      },
      {
        "aspect": "Time sequence",
        "a": "Happens first",
        "b": "Happens after pollination"
      },
      {
        "aspect": "Visible changes",
        "a": "No visible change to flower",
        "b": "Flower wilts, fruit develops"
      },
      {
        "aspect": "Result",
        "a": "Pollen tube grows down style",
        "b": "Seed and fruit formation"
      }
    ],
    "keyPoints": [
      "Pollination is transfer of pollen; fertilization is fusion of nuclei",
      "Pollination is mechanical process; fertilization is biological process",
      "Both are necessary for sexual reproduction in flowering plants",
      "Fertilization occurs inside the ovule after pollen tube penetrates it"
    ],
    "faqs": [
      {
        "q": "Can fertilization occur without pollination?",
        "a": "No, pollen must reach the stigma first for the pollen tube to reach and fertilize the egg"
      },
      {
        "q": "What are the types of pollination?",
        "a": "Self-pollination (within same flower) and cross-pollination (between different flowers)"
      },
      {
        "q": "What happens after fertilization?",
        "a": "Ovule develops into seed; ovary develops into fruit; flower falls away"
      }
    ]
  },
  {
    "slug": "artery-and-capillary",
    "title": "Difference Between Artery and Capillary",
    "termA": "Artery",
    "termB": "Capillary",
    "category": "Biology",
    "classLevel": "10-12",
    "intro": "Arteries carry blood away from heart under high pressure, while capillaries are tiny vessels where gas exchange occurs. Understanding blood vessels is essential for circulatory system in CBSE biology.",
    "table": [
      {
        "aspect": "Function",
        "a": "Carries blood away from heart",
        "b": "Allows exchange of materials with tissues"
      },
      {
        "aspect": "Wall thickness",
        "a": "Thick, muscular walls",
        "b": "Single layer of cells"
      },
      {
        "aspect": "Lumen size",
        "a": "Large diameter",
        "b": "Very small diameter"
      },
      {
        "aspect": "Blood pressure",
        "a": "High pressure",
        "b": "Low pressure"
      },
      {
        "aspect": "Valves",
        "a": "No valves",
        "b": "No valves"
      },
      {
        "aspect": "Elasticity",
        "a": "Elastic and muscular",
        "b": "Not elastic"
      },
      {
        "aspect": "Connection",
        "a": "Connect to arterioles then capillaries",
        "b": "Connect arterioles to venules"
      }
    ],
    "keyPoints": [
      "Arteries carry oxygenated blood from heart at high pressure",
      "Capillaries are site of nutrient and gas exchange",
      "Artery walls are thick to withstand pressure; capillary walls are thin for exchange",
      "Arteries pulse with heartbeat; capillaries have steady, slow flow"
    ],
    "faqs": [
      {
        "q": "Can you feel blood flowing in capillaries?",
        "a": "No, capillary blood flow is too slow and small to feel; you feel artery pulses"
      },
      {
        "q": "What happens if an artery bursts?",
        "a": "Heavy bleeding occurs due to high pressure; capillary damage causes minimal bleeding"
      },
      {
        "q": "Why are capillaries so small?",
        "a": "Small diameter allows close contact with tissues for efficient gas and nutrient exchange"
      }
    ]
  },
  {
    "slug": "rbc-and-wbc",
    "title": "Difference Between RBC and WBC",
    "termA": "RBC (Red Blood Cell)",
    "termB": "WBC (White Blood Cell)",
    "category": "Biology",
    "classLevel": "10-12",
    "intro": "RBCs carry oxygen throughout the body, while WBCs defend against infections. These blood components are vital to understanding human physiology in CBSE biology.",
    "table": [
      {
        "aspect": "Main function",
        "a": "Transport oxygen to tissues",
        "b": "Fight infections and disease"
      },
      {
        "aspect": "Contains",
        "a": "Hemoglobin for oxygen binding",
        "b": "Various enzymes and antibodies"
      },
      {
        "aspect": "Nucleus",
        "a": "No nucleus in mature RBC",
        "b": "Has nucleus"
      },
      {
        "aspect": "Shape",
        "a": "Disc-shaped with concave sides",
        "b": "Round or lobed"
      },
      {
        "aspect": "Lifespan",
        "a": "About 120 days",
        "b": "From few days to years"
      },
      {
        "aspect": "Count in blood",
        "a": "4.5-5.5 million per microliter",
        "b": "4,500-11,000 per microliter"
      },
      {
        "aspect": "Quantity ratio",
        "a": "About 600 times more RBC than WBC",
        "b": "Much fewer in number"
      }
    ],
    "keyPoints": [
      "RBCs outnumber WBCs by about 600 to 1",
      "RBCs lack nucleus; most WBCs have nuclei",
      "RBCs carry oxygen; WBCs protect from infections",
      "Both are essential for health; changes in counts indicate disease"
    ],
    "faqs": [
      {
        "q": "Why do RBCs lack a nucleus?",
        "a": "Nucleus is expelled to make room for more hemoglobin, increasing oxygen carrying capacity"
      },
      {
        "q": "What is anemia?",
        "a": "Low RBC count or hemoglobin, causing reduced oxygen delivery and fatigue"
      },
      {
        "q": "What happens when WBC count increases?",
        "a": "Usually indicates infection or immune response; very high counts may indicate leukemia"
      }
    ]
  },
  {
    "slug": "inhalation-and-exhalation",
    "title": "Difference Between Inhalation and Exhalation",
    "termA": "Inhalation",
    "termB": "Exhalation",
    "category": "Biology",
    "classLevel": "9-12",
    "intro": "Inhalation is breathing in oxygen-rich air, while exhalation is breathing out carbon dioxide-rich air. These respiratory processes are fundamental to the respiratory system in CBSE biology.",
    "table": [
      {
        "aspect": "Direction",
        "a": "Air flows into lungs",
        "b": "Air flows out of lungs"
      },
      {
        "aspect": "Diaphragm movement",
        "a": "Diaphragm contracts and moves down",
        "b": "Diaphragm relaxes and moves up"
      },
      {
        "aspect": "Chest cavity",
        "a": "Expands in size",
        "b": "Decreases in size"
      },
      {
        "aspect": "Lung volume",
        "a": "Increases",
        "b": "Decreases"
      },
      {
        "aspect": "Pressure change",
        "a": "Pressure decreases, air flows in",
        "b": "Pressure increases, air flows out"
      },
      {
        "aspect": "Process type",
        "a": "Active process (muscles contract)",
        "b": "Mostly passive (muscles relax)"
      },
      {
        "aspect": "Gas exchange",
        "a": "Oxygen enters blood",
        "b": "Carbon dioxide leaves blood"
      }
    ],
    "keyPoints": [
      "Inhalation brings oxygen in; exhalation removes carbon dioxide",
      "Inhalation is active; quiet exhalation is passive",
      "Diaphragm is the main muscle for both processes",
      "Normal breathing rate is 12-20 breaths per minute in adults"
    ],
    "faqs": [
      {
        "q": "Can you control your breathing?",
        "a": "Yes, you can consciously control breathing, but it also happens automatically"
      },
      {
        "q": "What is the ratio of oxygen to carbon dioxide in exhaled air?",
        "a": "Exhaled air has about 16% oxygen and 4% carbon dioxide compared to inhaled air"
      },
      {
        "q": "Why does the diaphragm relax during exhalation?",
        "a": "When diaphragm relaxes and moves up, chest cavity decreases, pushing air out passively"
      }
    ]
  },
  {
    "slug": "kinetic-and-static-friction",
    "title": "Difference Between Kinetic and Static Friction",
    "termA": "Kinetic Friction",
    "termB": "Static Friction",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Static friction prevents an object from moving while kinetic friction acts on moving objects. Both are crucial for understanding motion on surfaces in CBSE mechanics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Friction when object is moving",
        "b": "Friction when object is at rest"
      },
      {
        "aspect": "Magnitude",
        "a": "Lower and constant",
        "b": "Higher and variable"
      },
      {
        "aspect": "Coefficient",
        "a": "Coefficient of kinetic friction (μk)",
        "b": "Coefficient of static friction (μs)"
      },
      {
        "aspect": "When it acts",
        "a": "During motion",
        "b": "Before motion starts"
      },
      {
        "aspect": "Maximum value",
        "a": "Always less than static friction",
        "b": "Greater than kinetic friction"
      }
    ],
    "keyPoints": [
      "Static friction must be overcome to start motion",
      "Kinetic friction opposes ongoing motion",
      "Coefficient of static friction is always greater",
      "Both depend on nature of surfaces"
    ],
    "faqs": [
      {
        "q": "Why is static friction greater than kinetic?",
        "a": "Static requires breaking molecular bonds while kinetic slides over already broken surfaces"
      },
      {
        "q": "Can kinetic friction become static?",
        "a": "Yes, when the moving object stops, kinetic friction becomes static"
      },
      {
        "q": "Does mass affect friction differently?",
        "a": "Both friction types increase with mass, but coefficients remain constant"
      }
    ]
  },
  {
    "slug": "mass-and-inertia",
    "title": "Difference Between Mass and Inertia",
    "termA": "Mass",
    "termB": "Inertia",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Mass is the amount of matter in an object, while inertia is its resistance to acceleration. Both are related but measure different physical properties.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Amount of matter in an object",
        "b": "Resistance to change in motion"
      },
      {
        "aspect": "Measurement",
        "a": "In kilograms using a balance",
        "b": "Cannot be measured directly"
      },
      {
        "aspect": "Formula",
        "a": "F = ma (from Newton's law)",
        "b": "Related to mass"
      },
      {
        "aspect": "Type",
        "a": "Fundamental property",
        "b": "Inherent characteristic"
      },
      {
        "aspect": "Location",
        "a": "Same everywhere",
        "b": "Same everywhere"
      }
    ],
    "keyPoints": [
      "Greater mass means greater inertia",
      "Inertia is why seatbelts are needed in cars",
      "Mass is constant but inertia is its property",
      "Inertia explains why objects resist acceleration"
    ],
    "faqs": [
      {
        "q": "Is inertia the same as mass?",
        "a": "No, mass is the property, inertia is the resistance it creates to acceleration"
      },
      {
        "q": "Does inertia change with velocity?",
        "a": "No, inertia is constant for a given object"
      },
      {
        "q": "Why do heavy objects need more force to move?",
        "a": "Because they have more inertia due to greater mass"
      }
    ]
  },
  {
    "slug": "echo-and-reverberation",
    "title": "Difference Between Echo and Reverberation",
    "termA": "Echo",
    "termB": "Reverberation",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Echo is a distinct repetition of sound while reverberation is prolonged reflection of sound. Both demonstrate how sound behaves in enclosed spaces.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Distinct repetition of sound",
        "b": "Prolonged reflection of sound"
      },
      {
        "aspect": "Time delay",
        "a": "At least 0.1 seconds",
        "b": "Less than 0.1 seconds"
      },
      {
        "aspect": "Audibility",
        "a": "Separate from original sound",
        "b": "Blends with original sound"
      },
      {
        "aspect": "Cause",
        "a": "Single reflection from far surface",
        "b": "Multiple reflections from nearby surfaces"
      },
      {
        "aspect": "Location",
        "a": "Requires large open spaces",
        "b": "Occurs in closed rooms"
      }
    ],
    "keyPoints": [
      "Echo requires sufficient distance for time delay",
      "Reverberation improves acoustics in concert halls",
      "Both depend on sound speed and surface properties",
      "Echo is heard separately while reverberation blurs sounds"
    ],
    "faqs": [
      {
        "q": "Can you hear echo in a small room?",
        "a": "No, because walls are too close for the 0.1 second delay needed"
      },
      {
        "q": "Is reverberation always desirable?",
        "a": "Not always; excessive reverberation makes speech unclear"
      },
      {
        "q": "How is reverberation reduced?",
        "a": "Using sound-absorbing materials like carpets and curtains"
      }
    ]
  },
  {
    "slug": "concave-and-plane-mirror",
    "title": "Difference Between Concave and Plane Mirror",
    "termA": "Concave Mirror",
    "termB": "Plane Mirror",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Concave mirrors converge light rays while plane mirrors reflect parallel rays. These mirrors have different properties and applications in CBSE optics.",
    "table": [
      {
        "aspect": "Shape",
        "a": "Curved inward",
        "b": "Flat surface"
      },
      {
        "aspect": "Focal length",
        "a": "Has definite focal length",
        "b": "Focal length is infinite"
      },
      {
        "aspect": "Image type",
        "a": "Real or virtual depending on object",
        "b": "Always virtual"
      },
      {
        "aspect": "Magnification",
        "a": "Can be greater than 1",
        "b": "Always equals 1"
      },
      {
        "aspect": "Applications",
        "a": "Searchlights, makeup mirrors",
        "b": "Bathrooms, cars"
      }
    ],
    "keyPoints": [
      "Concave mirrors converge light to focal point",
      "Plane mirrors always produce upright images",
      "Concave mirrors can produce real images",
      "Magnification varies with object distance in concave mirrors"
    ],
    "faqs": [
      {
        "q": "Why do concave mirrors magnify when held close?",
        "a": "When object is within focal length, virtual magnified image forms"
      },
      {
        "q": "Can plane mirror produce real image?",
        "a": "No, plane mirrors always produce virtual images only"
      },
      {
        "q": "What happens if object is at focal point of concave mirror?",
        "a": "No image forms because rays emerge parallel"
      }
    ]
  },
  {
    "slug": "convex-and-plane-mirror",
    "title": "Difference Between Convex and Plane Mirror",
    "termA": "Convex Mirror",
    "termB": "Plane Mirror",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Convex mirrors diverge light rays while plane mirrors reflect parallel rays symmetrically. Convex mirrors provide wider field of view.",
    "table": [
      {
        "aspect": "Shape",
        "a": "Curved outward",
        "b": "Flat surface"
      },
      {
        "aspect": "Focal length",
        "a": "Has negative focal length",
        "b": "Focal length is infinite"
      },
      {
        "aspect": "Image type",
        "a": "Always virtual and diminished",
        "b": "Always virtual and same size"
      },
      {
        "aspect": "Field of view",
        "a": "Wider field of view",
        "b": "Limited field of view"
      },
      {
        "aspect": "Magnification",
        "a": "Always less than 1",
        "b": "Always equals 1"
      }
    ],
    "keyPoints": [
      "Convex mirrors diverge all incident rays",
      "Plane mirrors show real size of object",
      "Convex mirrors are used in cars and shops",
      "Convex mirrors provide safety with wider view"
    ],
    "faqs": [
      {
        "q": "Why are convex mirrors used in cars?",
        "a": "They provide a wider field of view with a diminished image, helping drivers see more area"
      },
      {
        "q": "Can convex mirror form real image?",
        "a": "No, convex mirrors always produce virtual images"
      },
      {
        "q": "Which mirror is safest for vehicles?",
        "a": "Convex mirror on driver side for better rear visibility"
      }
    ]
  },
  {
    "slug": "magnetism-and-electromagnetism",
    "title": "Difference Between Magnetism and Electromagnetism",
    "termA": "Magnetism",
    "termB": "Electromagnetism",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Magnetism is the property of matter to attract or repel, while electromagnetism is magnetism produced by electric current. Both are essential in CBSE electricity.",
    "table": [
      {
        "aspect": "Source",
        "a": "Permanent magnets or atomic properties",
        "b": "Moving electric charges or current"
      },
      {
        "aspect": "Permanence",
        "a": "Permanent",
        "b": "Exists only when current flows"
      },
      {
        "aspect": "Strength control",
        "a": "Fixed for permanent magnets",
        "b": "Can be controlled by varying current"
      },
      {
        "aspect": "Examples",
        "a": "Bar magnet, Earth's magnetism",
        "b": "Electromagnet, electric motor"
      },
      {
        "aspect": "Reversibility",
        "a": "Poles cannot be easily reversed",
        "b": "Poles can be reversed by reversing current"
      }
    ],
    "keyPoints": [
      "Electromagnetism is produced by electron movement",
      "Electromagnets are stronger and controllable",
      "Magnetism is always bipolar with two poles",
      "Electromagnetism is basis of electric motors"
    ],
    "faqs": [
      {
        "q": "Can electromagnetism be stronger than permanent magnetism?",
        "a": "Yes, electromagnets can be made extremely strong by increasing current"
      },
      {
        "q": "What happens when current stops in electromagnet?",
        "a": "The magnetic field disappears immediately"
      },
      {
        "q": "Are all magnets electromagnets?",
        "a": "No, permanent magnets have intrinsic magnetism; electromagnets require current"
      }
    ]
  },
  {
    "slug": "conductor-and-semiconductor",
    "title": "Difference Between Conductor and Semiconductor",
    "termA": "Conductor",
    "termB": "Semiconductor",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Conductors allow electricity to flow freely while semiconductors have limited conductivity. Semiconductors are crucial for modern electronics studied in CBSE.",
    "table": [
      {
        "aspect": "Conductivity",
        "a": "Very high",
        "b": "Moderate"
      },
      {
        "aspect": "Resistance",
        "a": "Very low",
        "b": "Medium"
      },
      {
        "aspect": "Free electrons",
        "a": "Many free electrons",
        "b": "Few free electrons"
      },
      {
        "aspect": "Temperature effect",
        "a": "Conductivity decreases with heat",
        "b": "Conductivity increases with heat"
      },
      {
        "aspect": "Examples",
        "a": "Copper, aluminum, silver",
        "b": "Silicon, germanium"
      }
    ],
    "keyPoints": [
      "Conductors are used for wiring electricity",
      "Semiconductors are used in transistors and diodes",
      "Purity affects semiconductor conductivity",
      "Semiconductors can be doped to change properties"
    ],
    "faqs": [
      {
        "q": "Why do semiconductors conduct better with heat?",
        "a": "Heat provides energy for electrons to break free from atoms"
      },
      {
        "q": "Can semiconductors be made to conduct like conductors?",
        "a": "Yes, by doping with impurities, we can control their conductivity"
      },
      {
        "q": "Why are semiconductors important?",
        "a": "They form the basis of all electronic devices like computers and phones"
      }
    ]
  },
  {
    "slug": "insulator-and-semiconductor",
    "title": "Difference Between Insulator and Semiconductor",
    "termA": "Insulator",
    "termB": "Semiconductor",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Insulators block electricity flow while semiconductors allow controlled electricity flow. Understanding this distinction is key for CBSE electronics.",
    "table": [
      {
        "aspect": "Conductivity",
        "a": "Very low or none",
        "b": "Moderate"
      },
      {
        "aspect": "Free electrons",
        "a": "Almost no free electrons",
        "b": "Few free electrons"
      },
      {
        "aspect": "Application",
        "a": "Protective coatings, cable insulation",
        "b": "Electronic devices, transistors"
      },
      {
        "aspect": "Doping effect",
        "a": "Doping has no effect",
        "b": "Doping increases conductivity"
      },
      {
        "aspect": "Temperature",
        "a": "Conductivity unaffected by heat",
        "b": "Conductivity increases with heat"
      }
    ],
    "keyPoints": [
      "Insulators protect from electrical hazards",
      "Semiconductors are controllable conductors",
      "Band gap is large in insulators, small in semiconductors",
      "Semiconductors enable modern technology"
    ],
    "faqs": [
      {
        "q": "Can insulators conduct electricity?",
        "a": "Only under extremely high voltage conditions"
      },
      {
        "q": "Why is silicon a semiconductor and not an insulator?",
        "a": "Silicon has intermediate band gap allowing electrons to jump with energy"
      },
      {
        "q": "Are all insulators the same?",
        "a": "No, different insulators have different breakdown voltages"
      }
    ]
  },
  {
    "slug": "element-and-atom",
    "title": "Difference Between Element and Atom",
    "termA": "Element",
    "termB": "Atom",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "An element is a pure substance made of identical atoms while an atom is the smallest unit of an element. These fundamental concepts are essential for CBSE chemistry.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Pure substance with one type of atom",
        "b": "Smallest particle of an element"
      },
      {
        "aspect": "Composition",
        "a": "Made of many atoms",
        "b": "Cannot be divided further"
      },
      {
        "aspect": "Properties",
        "a": "Has definite chemical properties",
        "b": "Has no chemical properties alone"
      },
      {
        "aspect": "Examples",
        "a": "Hydrogen, Oxygen, Carbon",
        "b": "Single H, O, C particle"
      },
      {
        "aspect": "Visibility",
        "a": "Visible to naked eye in bulk",
        "b": "Not visible without microscope"
      }
    ],
    "keyPoints": [
      "Atoms are the building blocks of elements",
      "Element is a macroscopic quantity while atom is microscopic",
      "All atoms of an element are identical",
      "Elements cannot be broken into simpler substances"
    ],
    "faqs": [
      {
        "q": "Is hydrogen gas the same as hydrogen atom?",
        "a": "No, hydrogen gas is H2, made of two atoms bonded together"
      },
      {
        "q": "Can an atom exist independently?",
        "a": "Yes, but atoms of most elements bond with others to form compounds"
      },
      {
        "q": "How many atoms are in one element particle?",
        "a": "One atom is one element particle; an element contains many atoms"
      }
    ]
  },
  {
    "slug": "compound-and-molecule",
    "title": "Difference Between Compound and Molecule",
    "termA": "Compound",
    "termB": "Molecule",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "A compound is a substance made of two or more elements chemically bonded while a molecule is a group of bonded atoms. Both are essential in CBSE chemistry.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Substance with two or more elements",
        "b": "Group of atoms bonded together"
      },
      {
        "aspect": "Elements",
        "a": "Must contain two or more",
        "b": "Can contain one or more"
      },
      {
        "aspect": "Examples",
        "a": "Water, salt, sugar",
        "b": "O2, H2O, N2"
      },
      {
        "aspect": "Bonding",
        "a": "Chemical bonds between elements",
        "b": "Can be covalent or ionic"
      },
      {
        "aspect": "Property",
        "a": "Different from component elements",
        "b": "Properties depend on composition"
      }
    ],
    "keyPoints": [
      "All compounds are molecules but not all molecules are compounds",
      "Molecules can be elements like O2 or compounds like H2O",
      "Compounds have fixed ratios of elements",
      "Molecules represent the smallest unit of a substance"
    ],
    "faqs": [
      {
        "q": "Is oxygen molecule a compound?",
        "a": "No, O2 is a molecule but not a compound because it has only one element"
      },
      {
        "q": "Can a molecule be broken into atoms?",
        "a": "Yes, chemical reactions break molecules into atoms or smaller molecules"
      },
      {
        "q": "Why is water a compound?",
        "a": "Because it contains two elements, hydrogen and oxygen, in fixed ratio"
      }
    ]
  },
  {
    "slug": "acid-and-salt",
    "title": "Difference Between Acid and Salt",
    "termA": "Acid",
    "termB": "Salt",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "Acids are substances that donate protons while salts are formed from neutralization of acids and bases. Both are important chemical compounds in CBSE.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Proton donor, pH less than 7",
        "b": "Product of acid-base reaction"
      },
      {
        "aspect": "Source",
        "a": "Contains ionizable hydrogen",
        "b": "Formed from neutralization"
      },
      {
        "aspect": "Taste",
        "a": "Sour taste",
        "b": "Usually bland taste"
      },
      {
        "aspect": "Conductivity",
        "a": "Conducts electricity",
        "b": "Conducts electricity"
      },
      {
        "aspect": "Examples",
        "a": "HCl, H2SO4, HNO3",
        "b": "NaCl, KNO3, CaSO4"
      }
    ],
    "keyPoints": [
      "Acids change litmus blue to red",
      "Salts are ionic compounds from acid-base reactions",
      "Acids have H+ ions while salts have metal and non-metal ions",
      "Neutral salts have pH 7"
    ],
    "faqs": [
      {
        "q": "Can salt be formed without using acid?",
        "a": "No, salt formation involves acid or acidic radical reacting with base or basic radical"
      },
      {
        "q": "Are all salts neutral?",
        "a": "No, salts can be acidic, basic, or neutral depending on constituent ions"
      },
      {
        "q": "What is the difference between weak acid and salt?",
        "a": "Weak acids ionize partially and are corrosive; salts don't ionize from H+"
      }
    ]
  },
  {
    "slug": "base-and-salt",
    "title": "Difference Between Base and Salt",
    "termA": "Base",
    "termB": "Salt",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "Bases are proton acceptors while salts are compounds formed from neutralization reactions. Both play important roles in CBSE chemistry.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Proton acceptor, pH greater than 7",
        "b": "Product of acid-base neutralization"
      },
      {
        "aspect": "Formation",
        "a": "Found naturally or synthesized",
        "b": "Formed from acid + base reaction"
      },
      {
        "aspect": "Taste",
        "a": "Bitter taste",
        "b": "Usually bland taste"
      },
      {
        "aspect": "Feel",
        "a": "Slippery feeling",
        "b": "No characteristic feel"
      },
      {
        "aspect": "Examples",
        "a": "NaOH, NH3, Ca(OH)2",
        "b": "NaCl, K2SO4, MgCl2"
      }
    ],
    "keyPoints": [
      "Bases accept protons from acids",
      "Salts result from neutralization reactions",
      "Bases have OH- ions in solutions",
      "Not all salts are neutral; some are acidic or basic"
    ],
    "faqs": [
      {
        "q": "Is every product of acid and base a salt?",
        "a": "Yes, when strong acid reacts with strong base, neutral salt forms"
      },
      {
        "q": "Can bases react without forming salt?",
        "a": "Yes, bases can react with non-acidic substances"
      },
      {
        "q": "Why are some salts bitter if bases are bitter?",
        "a": "Salt taste depends on specific ions, not on parent base properties"
      }
    ]
  },
  {
    "slug": "physical-and-chemical-properties",
    "title": "Difference Between Physical and Chemical Properties",
    "termA": "Physical Properties",
    "termB": "Chemical Properties",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Physical properties can be observed without changing composition while chemical properties involve chemical reactions. Both describe matter in CBSE chemistry.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Observable without chemical change",
        "b": "Observed during chemical reaction"
      },
      {
        "aspect": "Change in composition",
        "a": "No change in substance",
        "b": "Substance transforms into new matter"
      },
      {
        "aspect": "Reversibility",
        "a": "Usually reversible",
        "b": "Irreversible"
      },
      {
        "aspect": "Examples",
        "a": "Color, melting point, density",
        "b": "Combustibility, reactivity, corrosion"
      },
      {
        "aspect": "Measurement",
        "a": "Easy to measure",
        "b": "Requires reaction observation"
      }
    ],
    "keyPoints": [
      "Physical properties help identify substances",
      "Chemical properties determine how substances react",
      "Boiling is physical; burning is chemical",
      "Melting ice is physical; rusting is chemical"
    ],
    "faqs": [
      {
        "q": "Is burning a physical or chemical property?",
        "a": "Chemical, because it creates new substances through oxidation"
      },
      {
        "q": "Why is melting point a physical property?",
        "a": "Because the substance remains the same; only state changes"
      },
      {
        "q": "Can we determine chemical properties by observation alone?",
        "a": "No, we must perform reactions to observe chemical properties"
      }
    ]
  },
  {
    "slug": "endothermic-and-exothermic",
    "title": "Difference Between Endothermic and Exothermic Reactions",
    "termA": "Endothermic",
    "termB": "Exothermic",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "Endothermic reactions absorb heat while exothermic reactions release heat. Understanding both is crucial for CBSE chemistry and physics.",
    "table": [
      {
        "aspect": "Heat transfer",
        "a": "Absorbs heat from surroundings",
        "b": "Releases heat to surroundings"
      },
      {
        "aspect": "Temperature change",
        "a": "Surroundings get cooler",
        "b": "Surroundings get hotter"
      },
      {
        "aspect": "Delta H",
        "a": "Positive enthalpy change",
        "b": "Negative enthalpy change"
      },
      {
        "aspect": "Examples",
        "a": "Melting ice, photosynthesis",
        "b": "Burning, respiration"
      },
      {
        "aspect": "Products energy",
        "a": "Products have higher energy",
        "b": "Products have lower energy"
      }
    ],
    "keyPoints": [
      "Endothermic requires energy input to proceed",
      "Exothermic releases energy spontaneously",
      "Most combustion reactions are exothermic",
      "Melting ice is endothermic while freezing is exothermic"
    ],
    "faqs": [
      {
        "q": "Is cooking an egg endothermic or exothermic?",
        "a": "Endothermic, because it requires heat from the stove"
      },
      {
        "q": "Can all exothermic reactions happen spontaneously?",
        "a": "Not always; some require activation energy even though they release energy"
      },
      {
        "q": "Why do ice packs feel cold if they have chemical reactions?",
        "a": "Because the reaction is endothermic and absorbs body heat"
      }
    ]
  },
  {
    "slug": "evaporation-and-sublimation",
    "title": "Difference Between Evaporation and Sublimation",
    "termA": "Evaporation",
    "termB": "Sublimation",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Evaporation converts liquid to gas while sublimation converts solid directly to gas. Both are phase changes studied in CBSE chemistry.",
    "table": [
      {
        "aspect": "Initial state",
        "a": "Liquid",
        "b": "Solid"
      },
      {
        "aspect": "Final state",
        "a": "Gas",
        "b": "Gas"
      },
      {
        "aspect": "Intermediate state",
        "a": "No intermediate",
        "b": "No intermediate"
      },
      {
        "aspect": "Temperature",
        "a": "Below boiling point",
        "b": "Below melting point"
      },
      {
        "aspect": "Examples",
        "a": "Water drying from clothes",
        "b": "Dry ice, naphthalene"
      }
    ],
    "keyPoints": [
      "Evaporation occurs at surfaces of liquids",
      "Sublimation requires very low pressure",
      "Both are endothermic processes",
      "Sublimation is used in freeze-drying"
    ],
    "faqs": [
      {
        "q": "Can water sublime like dry ice?",
        "a": "Yes, but only at extremely low pressure and temperature"
      },
      {
        "q": "Why does wet laundry dry on clothesline?",
        "a": "Due to evaporation, liquid water turns to water vapor"
      },
      {
        "q": "What is the difference in energy required?",
        "a": "Sublimation requires more energy than evaporation"
      }
    ]
  },
  {
    "slug": "melting-and-boiling",
    "title": "Difference Between Melting and Boiling",
    "termA": "Melting",
    "termB": "Boiling",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Melting converts solid to liquid while boiling converts liquid to gas. Both are phase transitions essential for CBSE chemistry.",
    "table": [
      {
        "aspect": "Initial state",
        "a": "Solid",
        "b": "Liquid"
      },
      {
        "aspect": "Final state",
        "a": "Liquid",
        "b": "Gas"
      },
      {
        "aspect": "Temperature constant",
        "a": "Yes, melting point",
        "b": "Yes, boiling point"
      },
      {
        "aspect": "Occurrence",
        "a": "Throughout the solid",
        "b": "At surface and throughout"
      },
      {
        "aspect": "Examples",
        "a": "Ice to water at 0°C",
        "b": "Water to steam at 100°C"
      }
    ],
    "keyPoints": [
      "Melting point and boiling point are physical properties",
      "Both are endothermic processes",
      "Temperature remains constant during phase change",
      "Kinetic energy of particles increases during both"
    ],
    "faqs": [
      {
        "q": "Why does temperature remain constant during melting?",
        "a": "All heat energy is used to break solid structure bonds"
      },
      {
        "q": "Can boiling occur below boiling point?",
        "a": "No, boiling specifically occurs at boiling point temperature"
      },
      {
        "q": "Is rapid heating the same as boiling?",
        "a": "No, rapid heating heats liquid; boiling converts it to gas"
      }
    ]
  },
  {
    "slug": "suspension-and-colloid",
    "title": "Difference Between Suspension and Colloid",
    "termA": "Suspension",
    "termB": "Colloid",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Suspensions have visible particles that settle while colloids have particles that don't settle. Both are mixtures important in CBSE chemistry.",
    "table": [
      {
        "aspect": "Particle size",
        "a": "Greater than 1 micrometer",
        "b": "Between 1-1000 nanometers"
      },
      {
        "aspect": "Visibility",
        "a": "Visible to naked eye",
        "b": "Not visible without microscope"
      },
      {
        "aspect": "Settling",
        "a": "Particles settle quickly",
        "b": "Particles remain suspended"
      },
      {
        "aspect": "Transparency",
        "a": "Opaque or translucent",
        "b": "Can appear transparent"
      },
      {
        "aspect": "Examples",
        "a": "Muddy water, sand in water",
        "b": "Milk, fog, smoke"
      }
    ],
    "keyPoints": [
      "Suspensions are heterogeneous mixtures",
      "Colloids show Tyndall effect",
      "Suspensions can be separated by filtering",
      "Colloids are called sol, emulsion, or foam"
    ],
    "faqs": [
      {
        "q": "Can colloid particles ever settle?",
        "a": "Very slowly if at all, due to their small size and Brownian motion"
      },
      {
        "q": "What is the Tyndall effect?",
        "a": "Light path becomes visible in colloids due to particle scattering"
      },
      {
        "q": "Is milk a suspension or colloid?",
        "a": "Milk is a colloid because fat particles don't settle"
      }
    ]
  },
  {
    "slug": "solution-and-suspension",
    "title": "Difference Between Solution and Suspension",
    "termA": "Solution",
    "termB": "Suspension",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Solutions are homogeneous mixtures while suspensions are heterogeneous with visible particles. Both are studied in CBSE chemistry.",
    "table": [
      {
        "aspect": "Homogeneity",
        "a": "Homogeneous",
        "b": "Heterogeneous"
      },
      {
        "aspect": "Particle visibility",
        "a": "Not visible",
        "b": "Visible"
      },
      {
        "aspect": "Settling",
        "a": "No settling",
        "b": "Particles settle"
      },
      {
        "aspect": "Filtering",
        "a": "Cannot be filtered",
        "b": "Can be filtered"
      },
      {
        "aspect": "Examples",
        "a": "Salt water, sugar solution",
        "b": "Sand in water, chalk powder in water"
      }
    ],
    "keyPoints": [
      "Solutions are uniform throughout",
      "Suspensions separate on standing",
      "Solutions show no Tyndall effect",
      "Suspensions are easier to separate physically"
    ],
    "faqs": [
      {
        "q": "Is juice with pulp a solution or suspension?",
        "a": "Suspension, because pulp particles remain visible"
      },
      {
        "q": "Can suspended particles be dissolved to form solution?",
        "a": "No, suspended particles are insoluble by definition"
      },
      {
        "q": "How to distinguish solution from suspension?",
        "a": "Solutions are clear and don't settle; suspensions are cloudy and settle"
      }
    ]
  },
  {
    "slug": "true-solution-and-colloid",
    "title": "Difference Between True Solution and Colloid",
    "termA": "True Solution",
    "termB": "Colloid",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "True solutions have dissolved particles while colloids have suspended particles. Both are mixtures in CBSE chemistry.",
    "table": [
      {
        "aspect": "Particle size",
        "a": "Less than 1 nanometer",
        "b": "1-1000 nanometers"
      },
      {
        "aspect": "Tyndall effect",
        "a": "No Tyndall effect",
        "b": "Shows Tyndall effect"
      },
      {
        "aspect": "Settling",
        "a": "Never settles",
        "b": "Settles very slowly"
      },
      {
        "aspect": "Filtration",
        "a": "Cannot be filtered",
        "b": "Can be filtered with special filter"
      },
      {
        "aspect": "Examples",
        "a": "Salt solution, sugar solution",
        "b": "Milk, blood, paint"
      }
    ],
    "keyPoints": [
      "True solutions are completely homogeneous",
      "Colloids are intermediate between solutions and suspensions",
      "True solutions cannot be detected by microscope",
      "Colloids scatter light due to Tyndall effect"
    ],
    "faqs": [
      {
        "q": "Can a true solution become a colloid?",
        "a": "No, they differ fundamentally in particle size and properties"
      },
      {
        "q": "Why don't colloid particles settle like suspensions?",
        "a": "Particles are too light and Brownian motion keeps them moving"
      },
      {
        "q": "Is honey a true solution or colloid?",
        "a": "True solution, because sugar is completely dissolved"
      }
    ]
  },
  {
    "slug": "respiration-and-combustion",
    "title": "Difference Between Respiration and Combustion",
    "termA": "Respiration",
    "termB": "Combustion",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Respiration is biological oxidation in cells while combustion is rapid chemical oxidation. Both release energy but occur differently.",
    "table": [
      {
        "aspect": "Location",
        "a": "Inside living cells",
        "b": "Outside, any surface"
      },
      {
        "aspect": "Speed",
        "a": "Slow, controlled process",
        "b": "Rapid, uncontrolled"
      },
      {
        "aspect": "Temperature",
        "a": "Body temperature",
        "b": "Very high temperature"
      },
      {
        "aspect": "Enzymes",
        "a": "Enzyme-catalyzed",
        "b": "No enzyme involvement"
      },
      {
        "aspect": "Energy form",
        "a": "Stored as ATP",
        "b": "Released as light and heat"
      }
    ],
    "keyPoints": [
      "Respiration is essential for life processes",
      "Combustion produces flame and heat",
      "Both oxidation processes that release energy",
      "Respiration is 40% efficient; combustion is less efficient"
    ],
    "faqs": [
      {
        "q": "Why is respiration slower than combustion?",
        "a": "Enzymes control respiration to prevent damage; combustion is explosive"
      },
      {
        "q": "Can combustion happen inside living cells?",
        "a": "No, cells would be destroyed by the intense heat and flame"
      },
      {
        "q": "Is all respiration aerobic?",
        "a": "No, anaerobic respiration occurs without oxygen"
      }
    ]
  },
  {
    "slug": "breathing-and-respiration",
    "title": "Difference Between Breathing and Respiration",
    "termA": "Breathing",
    "termB": "Respiration",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Breathing is the physical intake of air while respiration is the chemical breakdown of glucose for energy. Both are essential for life.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Mechanical gas exchange",
        "b": "Chemical oxidation of glucose"
      },
      {
        "aspect": "Location",
        "a": "Lungs and respiratory system",
        "b": "All cells of the body"
      },
      {
        "aspect": "Oxygen use",
        "a": "Brings oxygen to body",
        "b": "Uses oxygen to release energy"
      },
      {
        "aspect": "Carbon dioxide",
        "a": "Removes CO2 from body",
        "b": "Produces CO2 as byproduct"
      },
      {
        "aspect": "Energy production",
        "a": "No direct energy production",
        "b": "Produces ATP energy"
      }
    ],
    "keyPoints": [
      "Breathing is involuntary and mechanical",
      "Respiration is metabolic and biochemical",
      "Without breathing, respiration cannot occur",
      "Respiration happens in mitochondria"
    ],
    "faqs": [
      {
        "q": "Can organisms respire without breathing?",
        "a": "Yes, anaerobic organisms respire without using oxygen"
      },
      {
        "q": "What happens if breathing stops?",
        "a": "Cells cannot get oxygen and respiration becomes anaerobic, leading to damage"
      },
      {
        "q": "Is rapid breathing the same as increased respiration?",
        "a": "No, rapid breathing increases oxygen intake but not necessarily cellular respiration rate"
      }
    ]
  },
  {
    "slug": "photosynthesis-and-chemosynthesis",
    "title": "Difference Between Photosynthesis and Chemosynthesis",
    "termA": "Photosynthesis",
    "termB": "Chemosynthesis",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Photosynthesis uses light energy to make food while chemosynthesis uses chemical energy. Both are ways organisms produce their own food.",
    "table": [
      {
        "aspect": "Energy source",
        "a": "Light energy from sun",
        "b": "Chemical energy from compounds"
      },
      {
        "aspect": "Organisms",
        "a": "Plants, algae, photosynthetic bacteria",
        "b": "Some bacteria"
      },
      {
        "aspect": "Location",
        "a": "Chloroplasts",
        "b": "Cytoplasm"
      },
      {
        "aspect": "Chlorophyll needed",
        "a": "Yes",
        "b": "No"
      },
      {
        "aspect": "Oxygen production",
        "a": "Yes, as byproduct",
        "b": "No oxygen production"
      }
    ],
    "keyPoints": [
      "Photosynthesis supports most life on Earth",
      "Chemosynthesis occurs in deep sea vents",
      "Both produce glucose from simple compounds",
      "Chemosynthesis is less common than photosynthesis"
    ],
    "faqs": [
      {
        "q": "Can chemosynthesis support life on other planets?",
        "a": "Yes, if chemical energy sources exist without needing sunlight"
      },
      {
        "q": "Why don't all organisms use chemosynthesis?",
        "a": "Because most don't have the biochemical pathways and chemical substrates aren't usually available"
      },
      {
        "q": "Is photosynthesis more efficient than chemosynthesis?",
        "a": "Generally yes, as sunlight is abundant and consistent"
      }
    ]
  },
  {
    "slug": "pollination-and-pollinator",
    "title": "Difference Between Pollination and Pollinator",
    "termA": "Pollination",
    "termB": "Pollinator",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Pollination is the process of transferring pollen while a pollinator is the agent that performs the transfer. Both are essential for plant reproduction.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Transfer of pollen to stigma",
        "b": "Agent that transfers pollen"
      },
      {
        "aspect": "Is it action or noun",
        "a": "Action or process",
        "b": "Noun, entity or organism"
      },
      {
        "aspect": "Necessity",
        "a": "Required for fertilization",
        "b": "Required for pollination"
      },
      {
        "aspect": "Examples",
        "a": "Wind pollination, insect pollination",
        "b": "Bee, butterfly, bird, wind"
      },
      {
        "aspect": "Type",
        "a": "Can be natural or artificial",
        "b": "Can be living or non-living"
      }
    ],
    "keyPoints": [
      "Pollinators include insects, birds, and wind",
      "Pollination leads to seed and fruit development",
      "Most flowering plants depend on pollinators",
      "Some plants are self-pollinating"
    ],
    "faqs": [
      {
        "q": "Can pollination happen without a pollinator?",
        "a": "Yes, wind and water can pollinate flowers"
      },
      {
        "q": "Are all pollinators insects?",
        "a": "No, birds, bats, and wind are also pollinators"
      },
      {
        "q": "What happens if pollination doesn't occur?",
        "a": "The flower cannot be fertilized and seeds won't develop"
      }
    ]
  },
  {
    "slug": "self-and-cross-pollination",
    "title": "Difference Between Self and Cross Pollination",
    "termA": "Self Pollination",
    "termB": "Cross Pollination",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Self pollination transfers pollen within the same flower while cross pollination transfers between different flowers. Both reproductive strategies occur in plants.",
    "table": [
      {
        "aspect": "Pollen source",
        "a": "Same flower or plant",
        "b": "Different flower or plant"
      },
      {
        "aspect": "Genetic variation",
        "a": "No variation, identical genes",
        "b": "Variation, mixed genes"
      },
      {
        "aspect": "Pollinator needed",
        "a": "Usually no pollinator needed",
        "b": "Pollinator or wind needed"
      },
      {
        "aspect": "Offspring strength",
        "a": "May be weak",
        "b": "Usually stronger and healthier"
      },
      {
        "aspect": "Examples",
        "a": "Wheat, pea plant",
        "b": "Corn, cucumber"
      }
    ],
    "keyPoints": [
      "Self pollination maintains traits in offspring",
      "Cross pollination increases genetic diversity",
      "Some plants have mechanisms to prevent self pollination",
      "Cross pollinated crops are often more productive"
    ],
    "faqs": [
      {
        "q": "Why do some plants prevent self pollination?",
        "a": "To maintain genetic diversity and avoid harmful recessive traits"
      },
      {
        "q": "Is cross pollination always better than self?",
        "a": "Usually yes, but some plants are adapted for self pollination"
      },
      {
        "q": "Can you force cross pollination in naturally self pollinating plants?",
        "a": "Yes, through artificial means in agriculture and horticulture"
      }
    ]
  },
  {
    "slug": "monocot-and-dicot",
    "title": "Difference Between Monocot and Dicot",
    "termA": "Monocot",
    "termB": "Dicot",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Monocots have one cotyledon while dicots have two. These are the two major groups of flowering plants in CBSE biology.",
    "table": [
      {
        "aspect": "Cotyledons",
        "a": "One cotyledon",
        "b": "Two cotyledons"
      },
      {
        "aspect": "Leaf veins",
        "a": "Parallel veins",
        "b": "Reticulate veins"
      },
      {
        "aspect": "Flower parts",
        "a": "In multiples of three",
        "b": "In multiples of four or five"
      },
      {
        "aspect": "Root system",
        "a": "Fibrous roots",
        "b": "Tap root"
      },
      {
        "aspect": "Examples",
        "a": "Rice, wheat, grass, corn",
        "b": "Bean, pea, mustard, tomato"
      }
    ],
    "keyPoints": [
      "Monocots are mostly herbaceous plants",
      "Dicots include most trees and shrubs",
      "Root structure differs significantly",
      "Seed structure determines classification"
    ],
    "faqs": [
      {
        "q": "Why are roots different between monocots and dicots?",
        "a": "Dicots invest energy in deep exploration; monocots use shallow spread"
      },
      {
        "q": "Can you change a plant from monocot to dicot?",
        "a": "No, it is a fundamental classification based on embryo structure"
      },
      {
        "q": "Which group is more important for human food?",
        "a": "Monocots, including rice, wheat, corn which feed most humans"
      }
    ]
  },
  {
    "slug": "vertebrate-and-invertebrate",
    "title": "Difference Between Vertebrate and Invertebrate",
    "termA": "Vertebrate",
    "termB": "Invertebrate",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Vertebrates have a backbone while invertebrates do not. These two groups account for all animals on Earth.",
    "table": [
      {
        "aspect": "Backbone",
        "a": "Has backbone and skeleton",
        "b": "No backbone"
      },
      {
        "aspect": "Spinal cord",
        "a": "Protected spinal cord",
        "b": "Nerve cord if present"
      },
      {
        "aspect": "Number of species",
        "a": "About 50,000 species",
        "b": "About 1.25 million species"
      },
      {
        "aspect": "Examples",
        "a": "Fish, birds, mammals, reptiles",
        "b": "Insects, worms, crustaceans"
      },
      {
        "aspect": "Body plan",
        "a": "Segmented and organized",
        "b": "Highly varied"
      }
    ],
    "keyPoints": [
      "Invertebrates make up 97% of animal species",
      "Vertebrates are generally larger and more complex",
      "Invertebrates show extreme diversity",
      "Both have important ecological roles"
    ],
    "faqs": [
      {
        "q": "Why are vertebrates fewer in number than invertebrates?",
        "a": "Vertebrate structure is complex to develop; invertebrates are simpler and adaptable"
      },
      {
        "q": "Can invertebrates be as intelligent as vertebrates?",
        "a": "Some like octopus are very intelligent, but most vertebrates have more complex brains"
      },
      {
        "q": "Are all invertebrates small?",
        "a": "No, giant squid and other invertebrates can be very large"
      }
    ]
  },
  {
    "slug": "warm-and-cold-blooded",
    "title": "Difference Between Warm and Cold Blooded Animals",
    "termA": "Warm Blooded",
    "termB": "Cold Blooded",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Warm blooded animals maintain constant body temperature while cold blooded animals vary with environment. Both strategies have advantages in CBSE biology.",
    "table": [
      {
        "aspect": "Body temperature",
        "a": "Constant and independent",
        "b": "Varies with environment"
      },
      {
        "aspect": "Metabolic rate",
        "a": "High and constant",
        "b": "Low and variable"
      },
      {
        "aspect": "Energy needed",
        "a": "Requires more food",
        "b": "Requires less food"
      },
      {
        "aspect": "Examples",
        "a": "Mammals, birds",
        "b": "Reptiles, amphibians, fish"
      },
      {
        "aspect": "Habitat range",
        "a": "Can live in cold regions",
        "b": "Limited to warm regions"
      }
    ],
    "keyPoints": [
      "Warm blooded animals use internal heat regulation",
      "Cold blooded animals use environmental heat",
      "Warm blooded animals are more active in cold",
      "Cold blooded animals need less energy overall"
    ],
    "faqs": [
      {
        "q": "Why are cold blooded animals slower in winter?",
        "a": "Cold slows their metabolism and muscle function"
      },
      {
        "q": "Can warm blooded animals become cold blooded?",
        "a": "No, it is a fundamental physiological feature"
      },
      {
        "q": "Which strategy is better?",
        "a": "Each has advantages; warm blooded is active but energy-intensive"
      }
    ]
  },
  {
    "slug": "producer-and-consumer",
    "title": "Difference Between Producer and Consumer",
    "termA": "Producer",
    "termB": "Consumer",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Producers make their own food through photosynthesis while consumers eat other organisms for energy. Both are essential in food chains.",
    "table": [
      {
        "aspect": "Energy source",
        "a": "Sun or chemicals",
        "b": "Other organisms"
      },
      {
        "aspect": "Food production",
        "a": "Makes own food",
        "b": "Cannot make own food"
      },
      {
        "aspect": "Examples",
        "a": "Plants, algae, cyanobacteria",
        "b": "Animals, fungi, most bacteria"
      },
      {
        "aspect": "Trophic level",
        "a": "First trophic level",
        "b": "Higher trophic levels"
      },
      {
        "aspect": "Function",
        "a": "Converts sun energy to chemical",
        "b": "Transfers energy between levels"
      }
    ],
    "keyPoints": [
      "Producers are the base of all food chains",
      "All consumers depend on producers",
      "Consumers are classified as herbivore, carnivore, omnivore",
      "Energy flows from producers to consumers"
    ],
    "faqs": [
      {
        "q": "Can humans be considered consumers?",
        "a": "Yes, we are omnivorous consumers eating both plants and animals"
      },
      {
        "q": "Are fungi producers or consumers?",
        "a": "Fungi are decomposers, a special type of consumer"
      },
      {
        "q": "What happens if producers disappear?",
        "a": "All consumers die because they have no food source"
      }
    ]
  },
  {
    "slug": "food-chain-and-food-web",
    "title": "Difference Between Food Chain and Food Web",
    "termA": "Food Chain",
    "termB": "Food Web",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Food chain is a linear sequence while food web is interconnected food chains. Both show energy flow in ecosystems.",
    "table": [
      {
        "aspect": "Structure",
        "a": "Linear sequence",
        "b": "Interconnected network"
      },
      {
        "aspect": "Complexity",
        "a": "Simple representation",
        "b": "Complex representation"
      },
      {
        "aspect": "Reality",
        "a": "Simplified model",
        "b": "More accurate model"
      },
      {
        "aspect": "Organism roles",
        "a": "Each has one role",
        "b": "Can have multiple roles"
      },
      {
        "aspect": "Examples",
        "a": "Plant -> Herbivore -> Carnivore",
        "b": "Multiple chains connected"
      }
    ],
    "keyPoints": [
      "Food chain shows direct feeding relationships",
      "Food web shows all feeding relationships",
      "Most organisms are part of multiple food chains",
      "Food webs are more stable than single chains"
    ],
    "faqs": [
      {
        "q": "Why is food web more realistic than food chain?",
        "a": "Because organisms don't eat just one food; they have varied diets"
      },
      {
        "q": "Can food chains exist without food webs?",
        "a": "No, food webs are just multiple interconnected food chains"
      },
      {
        "q": "How does energy flow in a food web?",
        "a": "Energy flows from producers through multiple paths to different consumers"
      }
    ]
  },
  {
    "slug": "habitat-and-niche",
    "title": "Difference Between Habitat and Niche",
    "termA": "Habitat",
    "termB": "Niche",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Habitat is the place where organism lives while niche is its role in that habitat. Both concepts are key to understanding ecology.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Physical place of organism",
        "b": "Role and function in ecosystem"
      },
      {
        "aspect": "Focus",
        "a": "Where it lives",
        "b": "What it does"
      },
      {
        "aspect": "Physical factors",
        "a": "Climate, soil, water",
        "b": "Food, competition, predators"
      },
      {
        "aspect": "Number per organism",
        "a": "One habitat only",
        "b": "One niche only"
      },
      {
        "aspect": "Examples",
        "a": "Forest, desert, ocean",
        "b": "Seed eater, pollinator, decomposer"
      }
    ],
    "keyPoints": [
      "Habitat is the address; niche is the job",
      "Two organisms can share habitat but not niche",
      "Niche includes food, space, and interaction needs",
      "Niche determines how organism exploits habitat"
    ],
    "faqs": [
      {
        "q": "Can two species have the same niche?",
        "a": "No, each species has its own unique niche to avoid competition"
      },
      {
        "q": "Is niche same as food preference?",
        "a": "No, niche includes all roles, food, and environmental needs"
      },
      {
        "q": "Can habitat exist without niche?",
        "a": "A habitat exists, but species won't survive without filling an available niche"
      }
    ]
  },
  {
    "slug": "renewable-and-recyclable",
    "title": "Difference Between Renewable and Recyclable",
    "termA": "Renewable",
    "termB": "Recyclable",
    "category": "Science",
    "classLevel": "9-10",
    "intro": "Renewable resources regenerate naturally while recyclable materials can be reused after processing. Both are important for sustainability.",
    "table": [
      {
        "aspect": "Source",
        "a": "Replenish from natural processes",
        "b": "Processed and remade from used materials"
      },
      {
        "aspect": "Time scale",
        "a": "Regenerate over years or decades",
        "b": "Can be recycled immediately after use"
      },
      {
        "aspect": "Depletion",
        "a": "Don't deplete if used sustainably",
        "b": "Reduces need for new resources"
      },
      {
        "aspect": "Examples",
        "a": "Solar, wind, water, timber",
        "b": "Plastic, metal, paper, glass"
      },
      {
        "aspect": "Infinite use",
        "a": "Can be used infinitely",
        "b": "Can be recycled multiple times"
      }
    ],
    "keyPoints": [
      "Renewable energy is clean and sustainable",
      "Recycling reduces landfill waste",
      "Many materials are both renewable and recyclable",
      "Both concepts promote environmental protection"
    ],
    "faqs": [
      {
        "q": "Is wood both renewable and recyclable?",
        "a": "Yes, forests regenerate and paper can be recycled"
      },
      {
        "q": "Can non-renewable resources be recycled?",
        "a": "Yes, metals and minerals can be recycled even if not naturally renewable"
      },
      {
        "q": "Why should we prefer renewable over recyclable?",
        "a": "Renewable avoids depletion; recycling still requires processing energy"
      }
    ]
  },
  {
    "slug": "biodegradable-and-non-biodegradable",
    "title": "Difference Between Biodegradable and Non-biodegradable",
    "termA": "Biodegradable",
    "termB": "Non-biodegradable",
    "category": "Science",
    "classLevel": "9",
    "intro": "Biodegradable materials break down naturally while non-biodegradable materials persist in environment. Understanding this is critical for waste management.",
    "table": [
      {
        "aspect": "Decomposition",
        "a": "Breaks down by bacteria and fungi",
        "b": "Does not break down naturally"
      },
      {
        "aspect": "Time",
        "a": "Weeks to years",
        "b": "Hundreds to thousands of years"
      },
      {
        "aspect": "Environmental impact",
        "a": "Minimal impact",
        "b": "Significant pollution"
      },
      {
        "aspect": "Examples",
        "a": "Paper, wood, food waste",
        "b": "Plastic, glass, metal"
      },
      {
        "aspect": "End product",
        "a": "Soil and nutrients",
        "b": "Persistent toxins"
      }
    ],
    "keyPoints": [
      "Biodegradable materials return to earth",
      "Non-biodegradable waste accumulates in landfills",
      "Plastic takes over 500 years to degrade",
      "Composting accelerates biodegradation"
    ],
    "faqs": [
      {
        "q": "Is all natural material biodegradable?",
        "a": "Most are, but some like certain plastics labeled eco-friendly degrade very slowly"
      },
      {
        "q": "Can non-biodegradable materials be made biodegradable?",
        "a": "Scientists are developing biodegradable plastics but traditional ones cannot change"
      },
      {
        "q": "Why not make everything biodegradable?",
        "a": "Non-biodegradable materials have useful properties for durability"
      }
    ]
  },
  {
    "slug": "weather-and-atmosphere",
    "title": "Difference Between Weather and Atmosphere",
    "termA": "Weather",
    "termB": "Atmosphere",
    "category": "Geography",
    "classLevel": "9",
    "intro": "Weather is day-to-day atmospheric conditions while atmosphere is the air layer surrounding Earth. Both are interconnected in CBSE geography.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Short-term atmospheric conditions",
        "b": "Layer of air around Earth"
      },
      {
        "aspect": "Time scale",
        "a": "Hours to days",
        "b": "Permanent feature"
      },
      {
        "aspect": "Change rate",
        "a": "Changes rapidly",
        "b": "Changes slowly over years"
      },
      {
        "aspect": "Composition",
        "a": "Varies with conditions",
        "b": "Fixed percentage of gases"
      },
      {
        "aspect": "Examples",
        "a": "Rain, wind, temperature",
        "b": "Oxygen, nitrogen, gases"
      }
    ],
    "keyPoints": [
      "Weather occurs within the atmosphere",
      "Atmosphere is the system; weather is the phenomenon",
      "Climate is average weather over years",
      "Atmosphere protects life from sun radiation"
    ],
    "faqs": [
      {
        "q": "Why does weather change but atmosphere remains?",
        "a": "Atmosphere is permanent; weather is temporary conditions within it"
      },
      {
        "q": "Can atmosphere affect weather?",
        "a": "Yes, atmosphere composition affects weather patterns and climate"
      },
      {
        "q": "Is climate same as weather?",
        "a": "No, climate is average weather over 30+ years; weather changes daily"
      }
    ]
  },
  {
    "slug": "rotation-and-revolution",
    "title": "Difference Between Rotation and Revolution",
    "termA": "Rotation",
    "termB": "Revolution",
    "category": "Geography",
    "classLevel": "9",
    "intro": "Rotation is Earth spinning on its axis while revolution is Earth orbiting the sun. Both create day-night and seasons.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Spinning on own axis",
        "b": "Orbiting around the sun"
      },
      {
        "aspect": "Time period",
        "a": "24 hours",
        "b": "365 days 6 hours"
      },
      {
        "aspect": "Creates",
        "a": "Day and night",
        "b": "Seasons and years"
      },
      {
        "aspect": "Direction",
        "a": "West to east",
        "b": "Counterclockwise"
      },
      {
        "aspect": "Distance",
        "a": "Axial spin",
        "b": "Orbital path 150 million km"
      }
    ],
    "keyPoints": [
      "Rotation causes diurnal cycle",
      "Revolution causes seasonal changes",
      "Both occur simultaneously",
      "Tilt affects revolution effect on seasons"
    ],
    "faqs": [
      {
        "q": "What if Earth rotated faster?",
        "a": "Days would be shorter and seasons might be less affected"
      },
      {
        "q": "Why does revolution take longer than rotation?",
        "a": "Revolution is 150 million km orbit; rotation is just spinning"
      },
      {
        "q": "Do both affect climate?",
        "a": "Yes, rotation affects temperature distribution; revolution causes seasons"
      }
    ]
  },
  {
    "slug": "solstice-and-equinox",
    "title": "Difference Between Solstice and Equinox",
    "termA": "Solstice",
    "termB": "Equinox",
    "category": "Geography",
    "classLevel": "9",
    "intro": "Solstice is when sun is farthest from equator while equinox is when day and night are equal. Both mark seasonal changes.",
    "table": [
      {
        "aspect": "Day and night",
        "a": "Unequal length",
        "b": "Equal length"
      },
      {
        "aspect": "Sun position",
        "a": "Farthest from equator",
        "b": "Directly over equator"
      },
      {
        "aspect": "Occurrence",
        "a": "June 21 and December 21",
        "b": "March 20 and September 22"
      },
      {
        "aspect": "Season change",
        "a": "Start of summer or winter",
        "b": "Start of spring or autumn"
      },
      {
        "aspect": "Extreme",
        "a": "Longest or shortest day",
        "b": "Equal 12-hour day and night"
      }
    ],
    "keyPoints": [
      "Summer solstice has longest day in northern hemisphere",
      "Winter solstice has shortest day",
      "Equinoxes mark equal day and night globally",
      "Four events occur annually marking seasons"
    ],
    "faqs": [
      {
        "q": "Why are days unequal at solstice?",
        "a": "Earth's tilt causes sun to be farthest north or south, changing daylight duration"
      },
      {
        "q": "On equinox, are days equal everywhere?",
        "a": "Yes, everywhere on Earth has 12 hours day and 12 hours night"
      },
      {
        "q": "Do solstices affect temperature?",
        "a": "Yes, summer solstice brings hottest weather and winter brings coldest"
      }
    ]
  },
  {
    "slug": "river-and-glacier",
    "title": "Difference Between River and Glacier",
    "termA": "River",
    "termB": "Glacier",
    "category": "Geography",
    "classLevel": "9",
    "intro": "Rivers flow downhill as water while glaciers flow downhill as ice. Both shape landscapes through erosion.",
    "table": [
      {
        "aspect": "Composition",
        "a": "Liquid water",
        "b": "Solid ice"
      },
      {
        "aspect": "Flow speed",
        "a": "Fast flow",
        "b": "Very slow flow"
      },
      {
        "aspect": "Location",
        "a": "Lower elevations and valleys",
        "b": "High mountains and polar regions"
      },
      {
        "aspect": "Erosion",
        "a": "Chemical and mechanical",
        "b": "Primarily mechanical"
      },
      {
        "aspect": "Features",
        "a": "Valleys, canyons",
        "b": "Cirques, moraines, U-shaped valleys"
      }
    ],
    "keyPoints": [
      "Glaciers are frozen rivers",
      "Both cause significant landscape erosion",
      "Glaciers move very slowly, meters per year",
      "Rivers shape valleys; glaciers carve U-shapes"
    ],
    "faqs": [
      {
        "q": "How fast do glaciers move?",
        "a": "Usually 1 meter per year, but some can move 30 meters per day"
      },
      {
        "q": "Do glaciers cause more erosion than rivers?",
        "a": "Glaciers cause more mechanical erosion due to rock-carrying capacity"
      },
      {
        "q": "Can a glacier become a river?",
        "a": "Yes, when glaciers melt, they form glacier-fed rivers"
      }
    ]
  },
  {
    "slug": "map-and-globe",
    "title": "Difference Between Map and Globe",
    "termA": "Map",
    "termB": "Globe",
    "category": "Geography",
    "classLevel": "9",
    "intro": "Maps are flat representations while globes are spherical models of Earth. Both serve different purposes in geography.",
    "table": [
      {
        "aspect": "Shape",
        "a": "Flat",
        "b": "Spherical"
      },
      {
        "aspect": "Distortion",
        "a": "Contains distortions",
        "b": "No distortion"
      },
      {
        "aspect": "Portability",
        "a": "Easy to carry and store",
        "b": "Difficult to carry"
      },
      {
        "aspect": "Detail level",
        "a": "Can show great detail",
        "b": "Shows less detail"
      },
      {
        "aspect": "Representation",
        "a": "2D representation",
        "b": "3D representation"
      }
    ],
    "keyPoints": [
      "Maps project 3D Earth onto 2D surface",
      "Globes are accurate but less practical",
      "Different map projections create different distortions",
      "Maps show more details for specific regions"
    ],
    "faqs": [
      {
        "q": "Why not use globes instead of maps?",
        "a": "Globes are expensive, fragile, and difficult to show detailed information"
      },
      {
        "q": "Do all maps have the same distortion?",
        "a": "No, different projections distort differently to preserve distance, area, or shape"
      },
      {
        "q": "Is the globe's representation accurate?",
        "a": "Yes, globe shows Earth's true shape and relative sizes without distortion"
      }
    ]
  },
  {
    "slug": "census-and-sample",
    "title": "Difference Between Census and Sample",
    "termA": "Census",
    "termB": "Sample",
    "category": "Social Science",
    "classLevel": "10",
    "intro": "Census counts the entire population while sample counts a portion. Both are used to gather demographic data in CBSE.",
    "table": [
      {
        "aspect": "Population",
        "a": "Entire population",
        "b": "Part of population"
      },
      {
        "aspect": "Accuracy",
        "a": "Complete accuracy",
        "b": "Estimated accuracy"
      },
      {
        "aspect": "Cost",
        "a": "Very expensive",
        "b": "Cheaper"
      },
      {
        "aspect": "Time",
        "a": "Takes years",
        "b": "Faster to conduct"
      },
      {
        "aspect": "Frequency",
        "a": "Every 10 years in India",
        "b": "Can be done anytime"
      }
    ],
    "keyPoints": [
      "Census provides official population data",
      "Samples are used for quick estimates",
      "Census is mandatory in India",
      "Sample accuracy depends on size and method"
    ],
    "faqs": [
      {
        "q": "Why do countries conduct census if sample is faster?",
        "a": "Census provides official accurate data for policy and planning"
      },
      {
        "q": "Can sample replace census entirely?",
        "a": "No, for official records, census is essential"
      },
      {
        "q": "How is sample size determined?",
        "a": "Based on population size and desired accuracy level"
      }
    ]
  },
  {
    "slug": "birth-rate-and-death-rate",
    "title": "Difference Between Birth Rate and Death Rate",
    "termA": "Birth Rate",
    "termB": "Death Rate",
    "category": "Social Science",
    "classLevel": "9-10",
    "intro": "Birth rate is number of births per 1000 people while death rate is number of deaths per 1000. Both determine population growth.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Births per 1000 population per year",
        "b": "Deaths per 1000 population per year"
      },
      {
        "aspect": "India's rate",
        "a": "About 19 per 1000",
        "b": "About 8 per 1000"
      },
      {
        "aspect": "Higher development",
        "a": "Lower in developed countries",
        "b": "Higher in developed countries"
      },
      {
        "aspect": "Effect",
        "a": "Increases population",
        "b": "Decreases population"
      },
      {
        "aspect": "Demographics",
        "a": "Shows reproductive health",
        "b": "Shows healthcare quality"
      }
    ],
    "keyPoints": [
      "Population growth = Birth rate - Death rate",
      "Developing countries have higher birth rates",
      "Developed countries have higher death rates due to aging",
      "Both affect future population projections"
    ],
    "faqs": [
      {
        "q": "Why is India's birth rate decreasing?",
        "a": "Education, female workforce participation, and awareness increase"
      },
      {
        "q": "Can death rate be negative?",
        "a": "No, death rate is always positive as long as people die"
      },
      {
        "q": "Which is more important, birth rate or death rate?",
        "a": "Both matter, but birth rate has more effect on growth in developing nations"
      }
    ]
  },
  {
    "slug": "gross-and-net-income",
    "title": "Difference Between Gross and Net Income",
    "termA": "Gross Income",
    "termB": "Net Income",
    "category": "Economics",
    "classLevel": "10",
    "intro": "Gross income is total earnings before deductions while net income is after deductions. Both are important for financial planning.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Total income before deductions",
        "b": "Income after all deductions"
      },
      {
        "aspect": "Deductions",
        "a": "No deductions",
        "b": "Taxes, insurance, loans deducted"
      },
      {
        "aspect": "Amount",
        "a": "Always higher",
        "b": "Always lower"
      },
      {
        "aspect": "Taxes",
        "a": "Before tax deduction",
        "b": "After tax deduction"
      },
      {
        "aspect": "Use",
        "a": "For comparison purposes",
        "b": "Actual money received"
      }
    ],
    "keyPoints": [
      "Gross income is salary before any deductions",
      "Net income is what employee actually receives",
      "Tax amount depends on gross income",
      "Understanding both is essential for financial planning"
    ],
    "faqs": [
      {
        "q": "Can net income be more than gross?",
        "a": "No, by definition net is always equal or less than gross"
      },
      {
        "q": "What are common deductions from gross?",
        "a": "Income tax, provident fund, insurance, loan repayments"
      },
      {
        "q": "Why do employers show both?",
        "a": "To show complete picture of compensation and tax obligations"
      }
    ]
  },
  {
    "slug": "direct-and-indirect-tax",
    "title": "Difference Between Direct and Indirect Tax",
    "termA": "Direct Tax",
    "termB": "Indirect Tax",
    "category": "Economics",
    "classLevel": "10",
    "intro": "Direct tax is paid directly to government while indirect tax is collected through goods and services. Both fund government operations in India.",
    "table": [
      {
        "aspect": "Payment method",
        "a": "Paid directly to government",
        "b": "Paid to government through middlemen"
      },
      {
        "aspect": "Examples",
        "a": "Income tax, property tax",
        "b": "GST, excise tax, customs duty"
      },
      {
        "aspect": "On whom",
        "a": "Individuals and organizations",
        "b": "Products and services"
      },
      {
        "aspect": "Avoidance",
        "a": "Cannot be avoided",
        "b": "Can be avoided by not buying"
      },
      {
        "aspect": "Impact",
        "a": "Based on income and wealth",
        "b": "Same for everyone on same product"
      }
    ],
    "keyPoints": [
      "Direct tax is progressive, based on ability to pay",
      "Indirect tax is regressive, affects poor more",
      "GST is major indirect tax in India",
      "Both are essential government revenue sources"
    ],
    "faqs": [
      {
        "q": "Why do some object to indirect taxes?",
        "a": "Because they affect poor disproportionately despite income level"
      },
      {
        "q": "Which type generates more revenue in India?",
        "a": "Both are significant; direct tax from corporations and individuals"
      },
      {
        "q": "Can indirect tax be reduced?",
        "a": "Government can reduce GST rates on essential items to help poor"
      }
    ]
  },
  {
    "slug": "cheque-and-demand-draft",
    "title": "Difference Between Cheque and Demand Draft",
    "termA": "Cheque",
    "termB": "Demand Draft",
    "category": "Economics",
    "classLevel": "10",
    "intro": "Cheque is issued by account holder while demand draft is issued by bank. Both are payment instruments used in India.",
    "table": [
      {
        "aspect": "Issuer",
        "a": "Account holder",
        "b": "Bank"
      },
      {
        "aspect": "Drawer",
        "a": "Can be anyone with account",
        "b": "Only bank"
      },
      {
        "aspect": "Risk",
        "a": "May bounce if insufficient funds",
        "b": "Guaranteed by bank"
      },
      {
        "aspect": "Cost",
        "a": "Free or minimal charge",
        "b": "Charges apply"
      },
      {
        "aspect": "Validity",
        "a": "6 months",
        "b": "Usually 10 years"
      }
    ],
    "keyPoints": [
      "Cheque is conditional on account balance",
      "Demand draft is secure payment method",
      "DD is preferred for large transactions",
      "Cheque can be crossed for safety"
    ],
    "faqs": [
      {
        "q": "Why use demand draft instead of cheque?",
        "a": "DD is safer as bank guarantees it won't bounce"
      },
      {
        "q": "Can demand draft be stopped like cheque?",
        "a": "No, once issued by bank, it cannot be stopped"
      },
      {
        "q": "Which is better for receiving large amount?",
        "a": "Demand draft is better because it's guaranteed"
      }
    ]
  },
  {
    "slug": "debit-and-credit-card",
    "title": "Difference Between Debit and Credit Card",
    "termA": "Debit Card",
    "termB": "Credit Card",
    "category": "Economics",
    "classLevel": "10",
    "intro": "Debit card uses own money while credit card borrows money. Both are essential payment instruments in modern banking.",
    "table": [
      {
        "aspect": "Source",
        "a": "Uses money from own account",
        "b": "Uses borrowed money from bank"
      },
      {
        "aspect": "Debt",
        "a": "No debt created",
        "b": "Creates debt to be repaid"
      },
      {
        "aspect": "Interest",
        "a": "No interest charged",
        "b": "Interest charged on unpaid balance"
      },
      {
        "aspect": "Credit building",
        "a": "Does not build credit",
        "b": "Builds credit history"
      },
      {
        "aspect": "Benefits",
        "a": "Minimal rewards",
        "b": "Cashback and rewards programs"
      }
    ],
    "keyPoints": [
      "Debit card is safe for controlled spending",
      "Credit card helps build credit score",
      "Credit card offers fraud protection",
      "Debit card cannot be overdrawn like credit card"
    ],
    "faqs": [
      {
        "q": "Which is safer, debit or credit card?",
        "a": "Credit card has better fraud protection; debit is safer for budgeting"
      },
      {
        "q": "Why use credit card if it creates debt?",
        "a": "For rewards, benefits, and building credit history for future loans"
      },
      {
        "q": "Can credit card be used like debit card?",
        "a": "Yes, but you must repay, unlike debit which uses your own money"
      }
    ]
  },
  {
    "slug": "saving-and-current-account",
    "title": "Difference Between Saving and Current Account",
    "termA": "Saving Account",
    "termB": "Current Account",
    "category": "Economics",
    "classLevel": "10",
    "intro": "Saving account earns interest while current account does not. Both serve different purposes in banking.",
    "table": [
      {
        "aspect": "Purpose",
        "a": "For savings and earning interest",
        "b": "For frequent business transactions"
      },
      {
        "aspect": "Interest",
        "a": "Yes, interest paid on balance",
        "b": "No interest on balance"
      },
      {
        "aspect": "Transactions",
        "a": "Limited withdrawal per month",
        "b": "Unlimited transactions"
      },
      {
        "aspect": "Minimum balance",
        "a": "Usually lower minimum",
        "b": "Usually higher minimum"
      },
      {
        "aspect": "Charges",
        "a": "Low charges",
        "b": "Higher charges for services"
      }
    ],
    "keyPoints": [
      "Saving account is for individuals",
      "Current account is for businesses",
      "Saving account promotes financial discipline",
      "Current account facilitates business operations"
    ],
    "faqs": [
      {
        "q": "Can individual open current account?",
        "a": "Yes, but it's not recommended as they pay more charges for no benefit"
      },
      {
        "q": "Why would business use current account?",
        "a": "Unlimited transactions needed for business operations"
      },
      {
        "q": "Is saving account interest always the same?",
        "a": "No, interest rates vary by bank and economic conditions"
      }
    ]
  },
  {
    "slug": "shares-and-debentures",
    "title": "Difference Between Shares and Debentures",
    "termA": "Shares",
    "termB": "Debentures",
    "category": "Economics",
    "classLevel": "10",
    "intro": "Shares represent ownership while debentures are debt instruments. Both are ways companies raise capital.",
    "table": [
      {
        "aspect": "Nature",
        "a": "Ownership stake in company",
        "b": "Loan certificate"
      },
      {
        "aspect": "Return",
        "a": "Dividends if profitable",
        "b": "Fixed interest rate"
      },
      {
        "aspect": "Risk",
        "a": "High risk, value fluctuates",
        "b": "Lower risk, fixed returns"
      },
      {
        "aspect": "Voting right",
        "a": "Shareholders have voting rights",
        "b": "Debenture holders have no voting rights"
      },
      {
        "aspect": "Priority in payment",
        "a": "Last priority if company fails",
        "b": "First priority among creditors"
      }
    ],
    "keyPoints": [
      "Shares offer ownership but high risk",
      "Debentures offer safety but fixed returns",
      "Share prices fluctuate with market",
      "Debenture interest is guaranteed"
    ],
    "faqs": [
      {
        "q": "Which is better for investment?",
        "a": "Shares for growth potential; debentures for stable income"
      },
      {
        "q": "Can share price become zero?",
        "a": "Yes, if company fails, shares become worthless"
      },
      {
        "q": "Is debenture interest always paid?",
        "a": "Yes, unless company defaults, which rarely happens"
      }
    ]
  },
  {
    "slug": "ram-and-cache",
    "title": "Difference Between RAM and Cache",
    "termA": "RAM",
    "termB": "Cache",
    "category": "Computer & GK",
    "classLevel": "10",
    "intro": "RAM is main memory while cache is faster temporary storage. Both are essential for computer speed.",
    "table": [
      {
        "aspect": "Speed",
        "a": "Fast",
        "b": "Extremely fast"
      },
      {
        "aspect": "Size",
        "a": "Larger capacity",
        "b": "Very small capacity"
      },
      {
        "aspect": "Location",
        "a": "Separate from CPU",
        "b": "Part of CPU or near CPU"
      },
      {
        "aspect": "Cost",
        "a": "Affordable",
        "b": "Expensive per unit"
      },
      {
        "aspect": "Data storage",
        "a": "Stores running programs",
        "b": "Stores frequently used data"
      }
    ],
    "keyPoints": [
      "Cache is L1, L2, L3 depending on proximity",
      "RAM holds active program data",
      "Cache memory speeds up CPU operations",
      "Both are volatile memory"
    ],
    "faqs": [
      {
        "q": "Why is cache faster than RAM?",
        "a": "Cache is built into CPU, reducing access time significantly"
      },
      {
        "q": "Do all computers have cache?",
        "a": "Yes, modern CPUs have multiple levels of cache"
      },
      {
        "q": "What happens when cache is full?",
        "a": "Old data is replaced, usually least recently used"
      }
    ]
  },
  {
    "slug": "primary-and-secondary-memory",
    "title": "Difference Between Primary and Secondary Memory",
    "termA": "Primary Memory",
    "termB": "Secondary Memory",
    "category": "Computer & GK",
    "classLevel": "9-10",
    "intro": "Primary memory is faster but temporary while secondary memory is slower but permanent. Both are essential for computing.",
    "table": [
      {
        "aspect": "Permanence",
        "a": "Volatile, data lost on shutdown",
        "b": "Non-volatile, data persists"
      },
      {
        "aspect": "Speed",
        "a": "Very fast access",
        "b": "Slower access"
      },
      {
        "aspect": "Capacity",
        "a": "Limited capacity",
        "b": "Large capacity"
      },
      {
        "aspect": "Cost",
        "a": "Expensive per GB",
        "b": "Cheap per GB"
      },
      {
        "aspect": "Examples",
        "a": "RAM, cache",
        "b": "HDD, SSD, pen drive"
      }
    ],
    "keyPoints": [
      "Primary memory directly accessed by CPU",
      "Secondary memory accessed via primary",
      "Primary holds running program data",
      "Secondary stores permanent data and programs"
    ],
    "faqs": [
      {
        "q": "What happens if secondary memory is full?",
        "a": "Computer slows down; cannot install new programs"
      },
      {
        "q": "Can secondary memory replace primary?",
        "a": "No, CPU must use primary memory for fast execution"
      },
      {
        "q": "Why do we need both types?",
        "a": "Primary is fast but limited; secondary is large but slow"
      }
    ]
  },
  {
    "slug": "input-and-output-device",
    "title": "Difference Between Input and Output Device",
    "termA": "Input Device",
    "termB": "Output Device",
    "category": "Computer & GK",
    "classLevel": "9",
    "intro": "Input devices send data to computer while output devices receive data from computer. Both enable computer-user interaction.",
    "table": [
      {
        "aspect": "Direction",
        "a": "Data goes into computer",
        "b": "Data comes from computer"
      },
      {
        "aspect": "Examples",
        "a": "Keyboard, mouse, scanner",
        "b": "Monitor, printer, speaker"
      },
      {
        "aspect": "Function",
        "a": "Provide commands and data",
        "b": "Display results and feedback"
      },
      {
        "aspect": "User action",
        "a": "User provides input",
        "b": "Computer provides output"
      },
      {
        "aspect": "Necessity",
        "a": "Required to use computer",
        "b": "Required to see results"
      }
    ],
    "keyPoints": [
      "Input devices allow user control",
      "Output devices show computer results",
      "Both are necessary for complete interaction",
      "Some devices can be both input and output"
    ],
    "faqs": [
      {
        "q": "Is touchscreen input or output?",
        "a": "Both; it receives touch input and displays output"
      },
      {
        "q": "Why do we need both types?",
        "a": "Input for control; output to see results"
      },
      {
        "q": "Can computer work with only input devices?",
        "a": "No, without output, user cannot see or hear results"
      }
    ]
  },
  {
    "slug": "system-and-application-software",
    "title": "Difference Between System and Application Software",
    "termA": "System Software",
    "termB": "Application Software",
    "category": "Computer & GK",
    "classLevel": "9-10",
    "intro": "System software manages hardware while application software performs specific tasks. Both are essential in computers.",
    "table": [
      {
        "aspect": "Purpose",
        "a": "Manage hardware and resources",
        "b": "Perform specific user tasks"
      },
      {
        "aspect": "Examples",
        "a": "Windows, Linux, macOS",
        "b": "Word, Chrome, Photoshop"
      },
      {
        "aspect": "Dependency",
        "a": "Needed for computer to run",
        "b": "Depends on system software"
      },
      {
        "aspect": "User interaction",
        "a": "Indirect user interaction",
        "b": "Direct user interaction"
      },
      {
        "aspect": "Installation",
        "a": "Pre-installed on system",
        "b": "Installed by user as needed"
      }
    ],
    "keyPoints": [
      "System software is the foundation",
      "Application software runs on system software",
      "Multiple apps can run on one system",
      "System software cannot be uninstalled"
    ],
    "faqs": [
      {
        "q": "Can application software run without system software?",
        "a": "No, system software is required to manage hardware for apps"
      },
      {
        "q": "Can system software exist without apps?",
        "a": "Yes, but computer is unusable without applications"
      },
      {
        "q": "What is the relationship between them?",
        "a": "System software is foundation; apps are built on it"
      }
    ]
  },
  {
    "slug": "bit-and-byte",
    "title": "Difference Between Bit and Byte",
    "termA": "Bit",
    "termB": "Byte",
    "category": "Computer & GK",
    "classLevel": "9",
    "intro": "Bit is the smallest unit of data while byte contains 8 bits. Understanding both is essential for computing basics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Smallest unit of data",
        "b": "Group of 8 bits"
      },
      {
        "aspect": "Values",
        "a": "0 or 1",
        "b": "0-255"
      },
      {
        "aspect": "Representation",
        "a": "Binary digit",
        "b": "Character or number"
      },
      {
        "aspect": "Size",
        "a": "1 bit",
        "b": "8 bits"
      },
      {
        "aspect": "Abbreviation",
        "a": "Bit or b",
        "b": "Byte or B"
      }
    ],
    "keyPoints": [
      "1 byte = 8 bits",
      "Bit is fundamental unit of data",
      "Byte is used to measure file size",
      "Data storage measured in bytes and multiples"
    ],
    "faqs": [
      {
        "q": "How much data is in a byte?",
        "a": "One byte represents 256 different values from 0 to 255"
      },
      {
        "q": "What is 1 kilobyte in bits?",
        "a": "1 KB = 1024 bytes = 8192 bits"
      },
      {
        "q": "Why is byte made of 8 bits?",
        "a": "Historical choice; 8 bits provides good balance of flexibility and efficiency"
      }
    ]
  },
  {
    "slug": "mass-and-density",
    "title": "Difference Between Mass and Density",
    "termA": "Mass",
    "termB": "Density",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Mass is the amount of matter in an object measured in kilograms, while density is the mass per unit volume of a substance. Mass remains constant everywhere, but density can vary with temperature and pressure.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Amount of matter in an object",
        "b": "Mass per unit volume of a substance"
      },
      {
        "aspect": "SI Unit",
        "a": "Kilogram (kg)",
        "b": "Kilogram per cubic meter (kg/m3)"
      },
      {
        "aspect": "Nature",
        "a": "Scalar quantity",
        "b": "Scalar quantity"
      },
      {
        "aspect": "Variation with Gravity",
        "a": "Remains constant everywhere in the universe",
        "b": "Remains constant for a pure substance at same temperature and pressure"
      },
      {
        "aspect": "Measurement",
        "a": "Measured using a balance",
        "b": "Calculated using formula: Density = Mass/Volume"
      },
      {
        "aspect": "Example",
        "a": "A 10 kg block has the same mass on Earth and Moon",
        "b": "Iron has density 7800 kg/m3 while water has density 1000 kg/m3"
      }
    ],
    "keyPoints": [
      "Mass is an intrinsic property while density is a derived property that depends on mass and volume",
      "Two objects can have the same mass but different densities if their volumes are different",
      "Density helps in identifying substances and understanding their floating or sinking behavior",
      "Mass is measured with a balance while density requires both mass and volume measurements"
    ],
    "faqs": [
      {
        "q": "Why does iron sink in water while cork floats?",
        "a": "Iron has a density greater than water so it sinks, while cork has a density less than water so it floats."
      },
      {
        "q": "Does density of a substance change when you cut it into smaller pieces?",
        "a": "No, density remains constant for a pure substance as both mass and volume reduce proportionally."
      },
      {
        "q": "How is density useful in identifying metals?",
        "a": "Each metal has a characteristic density at a given temperature, so density helps identify whether a sample is genuine or counterfeit."
      }
    ]
  },
  {
    "slug": "acceleration-and-retardation",
    "title": "Difference Between Acceleration and Retardation",
    "termA": "Acceleration",
    "termB": "Retardation",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Acceleration is the rate of change of velocity in the direction of motion, while retardation is the rate of change of velocity opposite to the direction of motion. Retardation is also called deceleration or negative acceleration.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Rate of increase of velocity",
        "b": "Rate of decrease of velocity"
      },
      {
        "aspect": "Direction",
        "a": "In the direction of motion",
        "b": "Opposite to the direction of motion"
      },
      {
        "aspect": "Sign",
        "a": "Positive acceleration",
        "b": "Negative acceleration"
      },
      {
        "aspect": "Effect on Speed",
        "a": "Speed increases with time",
        "b": "Speed decreases with time"
      },
      {
        "aspect": "Example",
        "a": "A car pressing the accelerator pedal increases speed",
        "b": "A car pressing the brake pedal decreases speed"
      },
      {
        "aspect": "SI Unit",
        "a": "Meter per second squared (m/s2)",
        "b": "Meter per second squared (m/s2) with negative value"
      }
    ],
    "keyPoints": [
      "Retardation is negative acceleration, occurring when velocity decreases with time",
      "Both acceleration and retardation are rates of change of velocity but in opposite directions",
      "Acceleration increases kinetic energy while retardation decreases kinetic energy",
      "In equations of motion, retardation is represented as -a where a is a positive value"
    ],
    "faqs": [
      {
        "q": "Can an object have acceleration even if its speed is constant?",
        "a": "Yes, if the direction of motion changes, there is acceleration even if speed remains constant."
      },
      {
        "q": "Why is retardation also called negative acceleration?",
        "a": "Because retardation causes velocity to decrease, which is represented as negative acceleration in calculations."
      },
      {
        "q": "What happens to kinetic energy during retardation?",
        "a": "Kinetic energy decreases during retardation as velocity decreases, following KE = 1/2 mv2."
      }
    ]
  },
  {
    "slug": "potential-energy-and-chemical-energy",
    "title": "Difference Between Potential Energy and Chemical Energy",
    "termA": "Potential Energy",
    "termB": "Chemical Energy",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Potential energy is the energy stored in an object due to its position or configuration, while chemical energy is the energy stored in chemical bonds between atoms and molecules. Chemical energy is a type of potential energy stored at the molecular level.",
    "table": [
      {
        "aspect": "Source",
        "a": "Due to position or configuration of object",
        "b": "Due to bonds between atoms and molecules"
      },
      {
        "aspect": "Type",
        "a": "General form of stored energy",
        "b": "Specific type of potential energy"
      },
      {
        "aspect": "Release Mechanism",
        "a": "Released when position or shape changes",
        "b": "Released during chemical reactions"
      },
      {
        "aspect": "Example",
        "a": "Water stored on a hill, stretched spring",
        "b": "Food, fuel, batteries"
      },
      {
        "aspect": "Measurement",
        "a": "Calculated using PE = mgh or PE = 1/2 kx2",
        "b": "Measured in joules by observing heat released"
      },
      {
        "aspect": "Reversibility",
        "a": "Can be converted back and forth with kinetic energy",
        "b": "Usually not reversible, products are different from reactants"
      }
    ],
    "keyPoints": [
      "Chemical energy is stored energy in molecules that is released when chemical bonds break",
      "Potential energy is a broader concept that includes gravitational, elastic, and chemical energy",
      "Chemical reactions transform chemical energy into other forms like heat, light, or kinetic energy",
      "Foods and fuels contain large amounts of chemical energy that our bodies use for activities"
    ],
    "faqs": [
      {
        "q": "Is all chemical energy also potential energy?",
        "a": "Yes, chemical energy is a type of potential energy stored in chemical bonds at the molecular level."
      },
      {
        "q": "Why does burning wood release energy?",
        "a": "Burning wood is a chemical reaction that breaks chemical bonds and releases the stored chemical energy as heat and light."
      },
      {
        "q": "How does a battery store and release energy?",
        "a": "A battery stores chemical energy in its chemical compounds, which is converted to electrical energy when connected to a circuit."
      }
    ]
  },
  {
    "slug": "ac-generator-and-dc-generator",
    "title": "Difference Between AC Generator and DC Generator",
    "termA": "AC Generator",
    "termB": "DC Generator",
    "category": "Physics",
    "classLevel": "10",
    "intro": "An AC generator produces alternating current that periodically reverses direction, while a DC generator produces direct current that flows in one direction. AC generators are more commonly used because they are more efficient and easier to transmit over long distances.",
    "table": [
      {
        "aspect": "Output",
        "a": "Produces alternating current",
        "b": "Produces direct current"
      },
      {
        "aspect": "Current Direction",
        "a": "Changes direction periodically",
        "b": "Flows in one direction only"
      },
      {
        "aspect": "Commutator",
        "a": "Uses slip rings",
        "b": "Uses split ring commutator"
      },
      {
        "aspect": "Efficiency",
        "a": "More efficient for power transmission",
        "b": "Less efficient for long distance transmission"
      },
      {
        "aspect": "Output Graph",
        "a": "Sinusoidal wave pattern",
        "b": "Straight line or pulsating curve"
      },
      {
        "aspect": "Use",
        "a": "Used in power stations and homes",
        "b": "Used in vehicles and portable devices"
      }
    ],
    "keyPoints": [
      "AC generators use slip rings while DC generators use split ring commutators to collect current",
      "AC current periodically reverses direction while DC current maintains constant direction",
      "AC generators are more efficient for transmitting electricity over long distances through transformers",
      "Both generators convert mechanical energy into electrical energy through electromagnetic induction"
    ],
    "faqs": [
      {
        "q": "Why is AC used in homes instead of DC?",
        "a": "AC is used because it can be easily transmitted over long distances using transformers and is more efficient than DC."
      },
      {
        "q": "How does the split ring commutator in a DC generator work?",
        "a": "The split ring commutator connects to the brushes alternately, ensuring current always flows in the same direction."
      },
      {
        "q": "What is the frequency of AC current used in Indian homes?",
        "a": "The frequency of AC current in Indian homes is 50 Hz, meaning the current completes 50 complete cycles per second."
      }
    ]
  },
  {
    "slug": "motor-and-generator",
    "title": "Difference Between Motor and Generator",
    "termA": "Motor",
    "termB": "Generator",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A motor is a device that converts electrical energy into mechanical energy, while a generator is a device that converts mechanical energy into electrical energy. Motors and generators operate on the same principles of electromagnetism but in opposite directions.",
    "table": [
      {
        "aspect": "Function",
        "a": "Converts electrical energy to mechanical energy",
        "b": "Converts mechanical energy to electrical energy"
      },
      {
        "aspect": "Input",
        "a": "Requires electrical power input",
        "b": "Requires mechanical power input"
      },
      {
        "aspect": "Output",
        "a": "Produces rotational motion",
        "b": "Produces electrical current"
      },
      {
        "aspect": "Principle",
        "a": "Based on magnetic force on current-carrying conductor",
        "b": "Based on electromagnetic induction"
      },
      {
        "aspect": "Example",
        "a": "Fan, refrigerator, drill machine",
        "b": "Dynamo, alternator, power plants"
      },
      {
        "aspect": "Back EMF",
        "a": "Opposes applied voltage",
        "b": "Is the produced voltage"
      }
    ],
    "keyPoints": [
      "Motors use electrical energy to create motion while generators use motion to create electricity",
      "Both motors and generators have the same basic structure: coil in magnetic field",
      "A motor produces back EMF which opposes the applied voltage and limits current",
      "Generators and motors are reversible: a motor can act as generator if driven mechanically"
    ],
    "faqs": [
      {
        "q": "Why does a motor get hot when running?",
        "a": "Heat is generated due to the resistance of the coil windings when current flows through them."
      },
      {
        "q": "What is back EMF and why is it important in motors?",
        "a": "Back EMF is the voltage generated by a running motor that opposes the applied voltage and controls current flow."
      },
      {
        "q": "Can a generator also work as a motor?",
        "a": "Yes, if mechanical motion is applied to a generator, it acts as a motor and converts electrical energy to mechanical energy."
      }
    ]
  },
  {
    "slug": "myopia-and-hypermetropia",
    "title": "Difference Between Myopia and Hypermetropia",
    "termA": "Myopia",
    "termB": "Hypermetropia",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Myopia is a refractive error where the eye focuses light in front of the retina, making distant objects appear blurry, while hypermetropia is when light focuses behind the retina, making near objects appear blurry. Both conditions affect the eye's ability to focus light properly on the retina.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Inability to see distant objects clearly",
        "b": "Inability to see near objects clearly"
      },
      {
        "aspect": "Also Known As",
        "a": "Short-sightedness or near-sightedness",
        "b": "Long-sightedness or far-sightedness"
      },
      {
        "aspect": "Cause",
        "a": "Eyeball too long or cornea too curved",
        "b": "Eyeball too short or cornea too flat"
      },
      {
        "aspect": "Image Focus",
        "a": "Light focuses in front of retina",
        "b": "Light focuses behind retina"
      },
      {
        "aspect": "Correction",
        "a": "Concave lens (negative power) required",
        "b": "Convex lens (positive power) required"
      },
      {
        "aspect": "Prevalence in Children",
        "a": "More common in children",
        "b": "More common in older people"
      }
    ],
    "keyPoints": [
      "Myopia occurs when the eyeball is elongated or the cornea is too curved, focusing light ahead of the retina",
      "Hypermetropia occurs when the eyeball is shortened or the cornea is too flat, focusing light behind the retina",
      "Both conditions can be corrected with appropriate lenses or refractive surgery",
      "The power of corrective lenses is measured in diopters (D) and depends on the degree of refractive error"
    ],
    "faqs": [
      {
        "q": "At what age does myopia usually develop?",
        "a": "Myopia often develops in childhood and can progress until the eye stops growing in the late teens or early twenties."
      },
      {
        "q": "Can myopia and hypermetropia occur in the same person?",
        "a": "Yes, a condition called astigmatism or a combination of errors can cause both myopia and hypermetropia in different parts of the eye."
      },
      {
        "q": "Why do older people develop hypermetropia?",
        "a": "The lens loses elasticity with age, making it difficult to adjust focus for near objects, causing presbyopia."
      }
    ]
  },
  {
    "slug": "mitosis-and-cytokinesis",
    "title": "Difference Between Mitosis and Cytokinesis",
    "termA": "Mitosis",
    "termB": "Cytokinesis",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Mitosis is the division of the nucleus to produce two identical daughter nuclei, while cytokinesis is the division of the cytoplasm to produce two separate daughter cells. Cytokinesis follows mitosis to complete cell division.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Division of the nucleus",
        "b": "Division of the cytoplasm"
      },
      {
        "aspect": "What Divides",
        "a": "Chromosomes and genetic material",
        "b": "Cytoplasm and organelles"
      },
      {
        "aspect": "Result",
        "a": "Two identical nuclei",
        "b": "Two separate daughter cells"
      },
      {
        "aspect": "Sequence",
        "a": "Occurs first",
        "b": "Occurs after mitosis"
      },
      {
        "aspect": "In Plant Cells",
        "a": "Spindle fibers pull chromosomes apart",
        "b": "Cell plate forms to divide cells"
      },
      {
        "aspect": "In Animal Cells",
        "a": "Spindle fibers pull chromosomes apart",
        "b": "Cleavage furrow forms to divide cells"
      }
    ],
    "keyPoints": [
      "Mitosis is nuclear division while cytokinesis is cytoplasmic division",
      "Cytokinesis does not occur until mitosis is complete",
      "In plant cells, cytokinesis forms a cell plate while in animal cells it forms a cleavage furrow",
      "Together, mitosis and cytokinesis produce two identical daughter cells for growth and repair"
    ],
    "faqs": [
      {
        "q": "Can mitosis occur without cytokinesis?",
        "a": "Yes, in some cases mitosis can occur without cytokinesis, resulting in multinucleated cells."
      },
      {
        "q": "Why do plant cells require a cell plate during cytokinesis?",
        "a": "Plant cells have rigid cell walls that prevent the formation of a cleavage furrow, so a cell plate forms to divide the cell."
      },
      {
        "q": "How long does cytokinesis take compared to mitosis?",
        "a": "Cytokinesis typically takes about the same time as mitosis, usually lasting 30 minutes to an hour in most cells."
      }
    ]
  },
  {
    "slug": "gene-and-allele",
    "title": "Difference Between Gene and Allele",
    "termA": "Gene",
    "termB": "Allele",
    "category": "Biology",
    "classLevel": "10",
    "intro": "A gene is a segment of DNA that codes for a specific protein or trait, while an allele is a variant form of a gene. Different alleles of the same gene can produce different versions of the same trait.",
    "table": [
      {
        "aspect": "Definition",
        "a": "DNA segment coding for a specific protein",
        "b": "Different form or variant of a gene"
      },
      {
        "aspect": "Number Per Trait",
        "a": "One gene codes for a trait",
        "b": "Multiple alleles can exist for one gene"
      },
      {
        "aspect": "Location",
        "a": "Fixed location on chromosome",
        "b": "Same location as the gene on chromosome"
      },
      {
        "aspect": "Function",
        "a": "Controls development of a trait",
        "b": "Controls different versions of the same trait"
      },
      {
        "aspect": "Example",
        "a": "Gene for eye color on chromosome 15",
        "b": "Alleles for brown, blue, green eye colors"
      },
      {
        "aspect": "Origin",
        "a": "Passed from parents to offspring",
        "b": "Different versions inherited from both parents"
      }
    ],
    "keyPoints": [
      "A gene is the unit of heredity while alleles are alternative forms of that gene",
      "Each organism inherits two alleles for each gene, one from each parent",
      "Dominant alleles mask recessive alleles in expression",
      "Variation in alleles creates genetic diversity in populations"
    ],
    "faqs": [
      {
        "q": "Can a gene have more than two alleles?",
        "a": "Yes, a gene can have multiple alleles in a population, though each individual inherits only two."
      },
      {
        "q": "How do alleles relate to dominant and recessive traits?",
        "a": "One allele may be dominant and express its phenotype while another is recessive and hidden in heterozygotes."
      },
      {
        "q": "Why do siblings look different if they inherit genes from the same parents?",
        "a": "Siblings inherit different combinations of alleles from their parents, creating variation in traits."
      }
    ]
  },
  {
    "slug": "genotype-and-phenotype",
    "title": "Difference Between Genotype and Phenotype",
    "termA": "Genotype",
    "termB": "Phenotype",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Genotype is the genetic makeup of an organism consisting of alleles inherited from parents, while phenotype is the observable physical characteristics or traits. The phenotype results from the interaction of genotype and environmental factors.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Genetic composition of an organism",
        "b": "Observable physical characteristics"
      },
      {
        "aspect": "Visibility",
        "a": "Not visible, must be determined by testing",
        "b": "Visible and observable directly"
      },
      {
        "aspect": "Inheritance",
        "a": "Inherited from parents",
        "b": "Result of genotype and environment"
      },
      {
        "aspect": "Changeability",
        "a": "Remains constant throughout life",
        "b": "Can change with environmental factors"
      },
      {
        "aspect": "Example",
        "a": "Aa for eye color (heterozygous)",
        "b": "Brown eyes (the actual eye color observed)"
      },
      {
        "aspect": "Representation",
        "a": "Represented by letters, e.g., Aa, BB",
        "b": "Described in words, e.g., tall, blue-eyed"
      }
    ],
    "keyPoints": [
      "Genotype is fixed at birth while phenotype can be influenced by environmental factors",
      "Two organisms with the same phenotype may have different genotypes",
      "Genotype determines the potential traits while phenotype shows the actual expression",
      "Both genotype and environmental factors contribute to the phenotype"
    ],
    "faqs": [
      {
        "q": "Can two plants with the same phenotype have different genotypes?",
        "a": "Yes, a plant with tall phenotype could be TT or Tt genotype, showing the same height but different genetic makeup."
      },
      {
        "q": "How does environment affect phenotype?",
        "a": "Environment affects phenotype through factors like nutrition, sunlight, temperature affecting growth and development."
      },
      {
        "q": "Why is genotype important in medicine?",
        "a": "Genotype helps predict disease risk and choose appropriate treatments based on genetic makeup."
      }
    ]
  },
  {
    "slug": "dominant-and-recessive",
    "title": "Difference Between Dominant and Recessive Traits",
    "termA": "Dominant Trait",
    "termB": "Recessive Trait",
    "category": "Biology",
    "classLevel": "10",
    "intro": "A dominant trait is expressed when at least one dominant allele is present and masks the recessive trait, while a recessive trait is expressed only when two recessive alleles are present. These concepts are fundamental to understanding inheritance patterns.",
    "table": [
      {
        "aspect": "Expression",
        "a": "Expressed in heterozygous condition",
        "b": "Expressed only in homozygous recessive"
      },
      {
        "aspect": "Allele Requirement",
        "a": "Needs only one dominant allele",
        "b": "Needs two recessive alleles"
      },
      {
        "aspect": "Representation",
        "a": "Capital letter, e.g., T",
        "b": "Small letter, e.g., t"
      },
      {
        "aspect": "Genotypes for Expression",
        "a": "TT and Tt both show dominant trait",
        "b": "Only tt shows recessive trait"
      },
      {
        "aspect": "Frequency",
        "a": "More common in a population",
        "b": "Less common in a population"
      },
      {
        "aspect": "Example",
        "a": "Tall plants in pea plants",
        "b": "Dwarf plants in pea plants"
      }
    ],
    "keyPoints": [
      "Dominant alleles mask recessive alleles in heterozygous organisms",
      "A recessive trait can skip generations if hidden in heterozygous carriers",
      "Recessive traits appear more frequently when parents are related or from a closed population",
      "Understanding dominance explains why children may have traits not visible in parents"
    ],
    "faqs": [
      {
        "q": "Why do some children have brown hair when both parents have blonde hair?",
        "a": "Brown hair might be dominant and both parents could carry a recessive blonde allele, passing it to the child."
      },
      {
        "q": "Can two parents with dominant traits have a child with recessive trait?",
        "a": "Yes, if both parents are heterozygous (Tt), they can pass both t alleles to a child (tt)."
      },
      {
        "q": "What percentage of children will show a recessive trait if both parents are heterozygous?",
        "a": "25 percent of children will show the recessive trait (tt) when both parents are heterozygous (Tt)."
      }
    ]
  },
  {
    "slug": "acquired-and-inherited-traits",
    "title": "Difference Between Acquired and Inherited Traits",
    "termA": "Acquired Trait",
    "termB": "Inherited Trait",
    "category": "Biology",
    "classLevel": "9",
    "intro": "An acquired trait is a characteristic developed during an organism's lifetime due to environmental factors or practice, while an inherited trait is passed down from parents through genes. Acquired traits cannot be passed to offspring while inherited traits are genetic.",
    "table": [
      {
        "aspect": "Origin",
        "a": "Developed during lifetime from environment",
        "b": "Inherited from parents through DNA"
      },
      {
        "aspect": "Inheritance",
        "a": "Cannot be passed to offspring",
        "b": "Passed to offspring through genes"
      },
      {
        "aspect": "Examples",
        "a": "Tan skin, muscle size, language spoken",
        "b": "Eye color, blood type, height potential"
      },
      {
        "aspect": "Development",
        "a": "Changes during lifetime",
        "b": "Present from birth or early development"
      },
      {
        "aspect": "Reversibility",
        "a": "Can be changed or reversed",
        "b": "Cannot be changed without genetic modification"
      },
      {
        "aspect": "Time of Appearance",
        "a": "Appears after birth with experience",
        "b": "Present at or soon after birth"
      }
    ],
    "keyPoints": [
      "Acquired traits result from interaction with environment while inherited traits come from genes",
      "The distinction between acquired and inherited traits is important in understanding evolution and inheritance",
      "Many traits in humans are influenced by both inherited and acquired factors",
      "Lamarck's theory that acquired traits can be inherited has been disproven by modern science"
    ],
    "faqs": [
      {
        "q": "If a father builds strong muscles through exercise, will his children inherit strong muscles?",
        "a": "No, strong muscles developed through exercise are acquired traits and cannot be inherited by offspring."
      },
      {
        "q": "Is height entirely inherited or can it be acquired?",
        "a": "Height is primarily inherited but also influenced by acquired factors like nutrition during development."
      },
      {
        "q": "Can a scar be inherited by children?",
        "a": "No, scars are acquired traits resulting from injury and cannot be inherited genetically."
      }
    ]
  },
  {
    "slug": "reversible-and-irreversible-reaction",
    "title": "Difference Between Reversible and Irreversible Reaction",
    "termA": "Reversible Reaction",
    "termB": "Irreversible Reaction",
    "category": "Chemistry",
    "classLevel": "10",
    "intro": "A reversible reaction is one where products can react with each other to reform reactants and the reaction can proceed in both directions. An irreversible reaction proceeds in one direction only and products cannot reform reactants under the same conditions.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Reaction that can proceed both directions",
        "b": "Reaction that proceeds in one direction only"
      },
      {
        "aspect": "Direction",
        "a": "Forward and backward reactions occur",
        "b": "Only forward reaction occurs"
      },
      {
        "aspect": "Equilibrium",
        "a": "Reaches chemical equilibrium",
        "b": "Goes to completion"
      },
      {
        "aspect": "Products",
        "a": "Products can form reactants again",
        "b": "Products cannot reform reactants"
      },
      {
        "aspect": "Example",
        "a": "A2 + B2 <=> 2AB",
        "b": "CH4 + 2O2 => CO2 + 2H2O"
      },
      {
        "aspect": "Representation",
        "a": "Shown with <=> symbol",
        "b": "Shown with => symbol"
      }
    ],
    "keyPoints": [
      "Reversible reactions reach equilibrium where forward and backward rates are equal",
      "Irreversible reactions go to completion with reactants fully converted to products",
      "Most chemical reactions are reversible but some conditions prevent reverse reaction",
      "Temperature, pressure, and concentration affect the equilibrium position of reversible reactions"
    ],
    "faqs": [
      {
        "q": "Is combustion a reversible or irreversible reaction?",
        "a": "Combustion is an irreversible reaction because the products cannot reform the reactants under normal conditions."
      },
      {
        "q": "What causes a reversible reaction to reach equilibrium?",
        "a": "In a reversible reaction, the rate of forward reaction equals the rate of backward reaction, establishing equilibrium."
      },
      {
        "q": "Can an irreversible reaction become reversible under different conditions?",
        "a": "Some seemingly irreversible reactions can become reversible under extreme conditions like high temperature or pressure."
      }
    ]
  },
  {
    "slug": "strong-and-weak-acid",
    "title": "Difference Between Strong and Weak Acid",
    "termA": "Strong Acid",
    "termB": "Weak Acid",
    "category": "Chemistry",
    "classLevel": "10",
    "intro": "A strong acid completely dissociates in water, releasing all hydrogen ions, while a weak acid partially dissociates and establishes an equilibrium with its ions. Strong acids are better conductors of electricity and have lower pH values.",
    "table": [
      {
        "aspect": "Dissociation",
        "a": "Completely dissociates in water",
        "b": "Partially dissociates in water"
      },
      {
        "aspect": "Equilibrium",
        "a": "No equilibrium, complete dissociation",
        "b": "Establishes equilibrium with undissociated molecules"
      },
      {
        "aspect": "pH Value",
        "a": "Very low pH (less than 2)",
        "b": "Higher pH (between 2 and 7)"
      },
      {
        "aspect": "Conductivity",
        "a": "Good conductor of electricity",
        "b": "Poor conductor of electricity"
      },
      {
        "aspect": "Examples",
        "a": "HCl, H2SO4, HNO3",
        "b": "CH3COOH, HCN, H2CO3"
      },
      {
        "aspect": "Concentration of Ions",
        "a": "High concentration of H+ ions",
        "b": "Low concentration of H+ ions"
      }
    ],
    "keyPoints": [
      "Strong acids like HCl completely ionize while weak acids like acetic acid partially ionize",
      "The strength of an acid is determined by its degree of dissociation not its concentration",
      "Weak acids are reversible and can establish equilibrium with their conjugate bases",
      "A dilute strong acid can have higher pH than a concentrated weak acid"
    ],
    "faqs": [
      {
        "q": "Why is sulfuric acid considered a strong acid?",
        "a": "Sulfuric acid is strong because it completely dissociates in water, releasing all hydrogen ions."
      },
      {
        "q": "Is a concentrated weak acid stronger than a dilute strong acid?",
        "a": "No, a dilute strong acid has more free H+ ions and is more acidic than a concentrated weak acid."
      },
      {
        "q": "What happens to a weak acid when a strong base is added?",
        "a": "The weak acid neutralizes with the strong base, forming a salt and water through a neutralization reaction."
      }
    ]
  },
  {
    "slug": "dilute-and-concentrated",
    "title": "Difference Between Dilute and Concentrated Solution",
    "termA": "Dilute Solution",
    "termB": "Concentrated Solution",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "A dilute solution contains a small amount of solute dissolved in a large amount of solvent, while a concentrated solution contains a large amount of solute in a smaller amount of solvent. Concentration indicates the relative proportions of solute and solvent.",
    "table": [
      {
        "aspect": "Solute Amount",
        "a": "Small amount of solute",
        "b": "Large amount of solute"
      },
      {
        "aspect": "Solvent Amount",
        "a": "Large amount of solvent",
        "b": "Small amount of solvent"
      },
      {
        "aspect": "Concentration",
        "a": "Low concentration value",
        "b": "High concentration value"
      },
      {
        "aspect": "Color Intensity",
        "a": "Pale or light color",
        "b": "Intense or dark color"
      },
      {
        "aspect": "Reactivity",
        "a": "Slower reactions",
        "b": "Faster reactions"
      },
      {
        "aspect": "pH Change with Dilution",
        "a": "Minimal pH change",
        "b": "Significant pH change when diluted"
      }
    ],
    "keyPoints": [
      "Dilution is the process of adding solvent to make a solution less concentrated",
      "The concentration of a solution can be expressed in molarity, molality, or percentage",
      "Concentrated solutions are more reactive and require more careful handling due to their potency",
      "Dilution follows the formula M1V1 = M2V2 to calculate final concentration"
    ],
    "faqs": [
      {
        "q": "How is a dilute sulfuric acid made from concentrated sulfuric acid?",
        "a": "Concentrated acid is carefully added to water, never water to acid, to gradually dilute it to desired concentration."
      },
      {
        "q": "Why is dilute acid less reactive than concentrated acid?",
        "a": "Dilute acid has fewer solute molecules per unit volume, reducing the collision frequency and reaction rate."
      },
      {
        "q": "What is the molarity of a solution if 10g of NaOH is dissolved in water to make 250 mL solution?",
        "a": "Molarity = moles/volume = (10/40)/0.25 = 1 M NaOH solution."
      }
    ]
  },
  {
    "slug": "metal-oxide-and-non-metal-oxide",
    "title": "Difference Between Metal Oxide and Non-metal Oxide",
    "termA": "Metal Oxide",
    "termB": "Non-metal Oxide",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "A metal oxide is formed when a metal combines with oxygen, while a non-metal oxide is formed when a non-metal combines with oxygen. Metal oxides are typically basic while non-metal oxides are typically acidic.",
    "table": [
      {
        "aspect": "Composition",
        "a": "Formed from metal and oxygen",
        "b": "Formed from non-metal and oxygen"
      },
      {
        "aspect": "Nature",
        "a": "Generally basic in nature",
        "b": "Generally acidic in nature"
      },
      {
        "aspect": "Reaction with Water",
        "a": "Forms basic solution, may not react",
        "b": "Forms acidic solution with water"
      },
      {
        "aspect": "Reaction with Acids",
        "a": "Reacts with acids to form salt",
        "b": "Does not react with acids"
      },
      {
        "aspect": "Reaction with Bases",
        "a": "Does not react with bases",
        "b": "Reacts with bases to form salt"
      },
      {
        "aspect": "Examples",
        "a": "CaO, MgO, Na2O, Fe2O3",
        "b": "CO2, SO2, P2O5, N2O5"
      }
    ],
    "keyPoints": [
      "Metal oxides are ionic compounds while non-metal oxides are covalent compounds",
      "Metal oxides show basic properties and non-metal oxides show acidic properties",
      "Most metal oxides are solids while non-metal oxides can be gases, liquids, or solids",
      "The pH of metal oxide solutions is basic while non-metal oxide solutions are acidic"
    ],
    "faqs": [
      {
        "q": "Why are metal oxides basic while non-metal oxides are acidic?",
        "a": "Metal oxides release hydroxide ions in water making it basic, while non-metal oxides form acids with water."
      },
      {
        "q": "What happens when calcium oxide reacts with water?",
        "a": "Calcium oxide reacts with water to form calcium hydroxide, a basic solution releasing heat."
      },
      {
        "q": "What happens when carbon dioxide reacts with water?",
        "a": "Carbon dioxide reacts with water to form carbonic acid, an acidic solution."
      }
    ]
  },
  {
    "slug": "ionic-and-covalent-bond",
    "title": "Difference Between Ionic and Covalent Bond",
    "termA": "Ionic Bond",
    "termB": "Covalent Bond",
    "category": "Chemistry",
    "classLevel": "10",
    "intro": "An ionic bond is formed by the complete transfer of electrons from one atom to another, creating charged ions that attract each other. A covalent bond is formed by the sharing of electrons between atoms.",
    "table": [
      {
        "aspect": "Electron Transfer",
        "a": "Complete transfer of electrons",
        "b": "Sharing of electrons"
      },
      {
        "aspect": "Atoms Involved",
        "a": "Between metal and non-metal",
        "b": "Between two non-metals"
      },
      {
        "aspect": "Charged Particles",
        "a": "Forms positively and negatively charged ions",
        "b": "No formation of charged particles"
      },
      {
        "aspect": "Melting Point",
        "a": "High melting point",
        "b": "Low melting point"
      },
      {
        "aspect": "Solubility in Water",
        "a": "Generally soluble in water",
        "b": "Generally insoluble in water"
      },
      {
        "aspect": "Electrical Conductivity",
        "a": "Conducts electricity when molten or dissolved",
        "b": "Does not conduct electricity"
      }
    ],
    "keyPoints": [
      "Ionic bonds form between atoms with large electronegativity difference",
      "Covalent bonds form between atoms with small electronegativity difference",
      "Ionic compounds form crystalline solids with high melting points",
      "Covalent compounds are often gases or liquids with low melting points"
    ],
    "faqs": [
      {
        "q": "Which type of bond is formed between sodium and chlorine?",
        "a": "Ionic bond is formed between sodium (metal) and chlorine (non-metal) forming NaCl."
      },
      {
        "q": "Why does NaCl conduct electricity when molten but not when solid?",
        "a": "In molten state, ions are mobile and can carry charge, but in solid they are fixed in crystal structure."
      },
      {
        "q": "What type of bond is in a water molecule?",
        "a": "Water contains covalent bonds between hydrogen and oxygen atoms formed by sharing electrons."
      }
    ]
  },
  {
    "slug": "distillation-and-filtration",
    "title": "Difference Between Distillation and Filtration",
    "termA": "Distillation",
    "termB": "Filtration",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Distillation is a separation method used to separate liquids from solutions by boiling and condensing, while filtration is used to separate solids from liquids using a filter medium. Both are physical separation techniques with different applications.",
    "table": [
      {
        "aspect": "Purpose",
        "a": "Separates liquids with different boiling points",
        "b": "Separates solids from liquids"
      },
      {
        "aspect": "Method",
        "a": "Heating and condensation",
        "b": "Using filter paper or mesh"
      },
      {
        "aspect": "Components Separated",
        "a": "Separates miscible liquids",
        "b": "Separates insoluble solids"
      },
      {
        "aspect": "Temperature",
        "a": "Requires heating to boiling point",
        "b": "Works at room temperature"
      },
      {
        "aspect": "Equipment",
        "a": "Distillation apparatus with condenser",
        "b": "Filter paper, funnel, beaker"
      },
      {
        "aspect": "Application",
        "a": "Purifies liquids, separates salt water",
        "b": "Removes impurities, clarifies solutions"
      }
    ],
    "keyPoints": [
      "Distillation works on the principle of different boiling points of liquids",
      "Filtration works based on the size difference between particles and pores",
      "Distillation gives pure liquid while filtration gives separated solid and liquid",
      "Distillation requires heat while filtration is a simple gravity-based process"
    ],
    "faqs": [
      {
        "q": "How is seawater separated into fresh water and salt using distillation?",
        "a": "Seawater is heated until it boils, water vapor is collected and condensed into fresh water, leaving salt behind."
      },
      {
        "q": "Why is filtration not suitable for separating salt from water?",
        "a": "Filtration separates insoluble solids, but salt is dissolved in water and passes through filter paper."
      },
      {
        "q": "What would you use to remove sand from a mixture of sand and water?",
        "a": "Filtration would be used as it separates insoluble solids like sand from liquids."
      }
    ]
  },
  {
    "slug": "evaporation-and-distillation",
    "title": "Difference Between Evaporation and Distillation",
    "termA": "Evaporation",
    "termB": "Distillation",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Evaporation is the slow conversion of liquid to vapor at any temperature below the boiling point, while distillation is the rapid boiling and condensation of liquid to separate components. Distillation is controlled and collects the vapor while evaporation simply removes the liquid.",
    "table": [
      {
        "aspect": "Temperature",
        "a": "Occurs below boiling point",
        "b": "Occurs at boiling point"
      },
      {
        "aspect": "Process",
        "a": "Slow spontaneous conversion",
        "b": "Controlled heating and condensation"
      },
      {
        "aspect": "Vapor Collection",
        "a": "Vapor escapes into atmosphere",
        "b": "Vapor is collected and condensed"
      },
      {
        "aspect": "Speed",
        "a": "Slower process",
        "b": "Faster process"
      },
      {
        "aspect": "Purpose",
        "a": "Removes solvent, concentrates solute",
        "b": "Separates liquids by boiling point"
      },
      {
        "aspect": "Example",
        "a": "Clothes drying on line, water from puddles",
        "b": "Distillation of alcohol, seawater desalination"
      }
    ],
    "keyPoints": [
      "Evaporation is a natural process while distillation is a controlled laboratory technique",
      "Evaporation leaves behind the non-volatile component while distillation collects the separated component",
      "Distillation is more efficient for separating miscible liquids",
      "Rate of evaporation depends on surface area, temperature, and humidity"
    ],
    "faqs": [
      {
        "q": "Why do clothes dry faster on a hot sunny day?",
        "a": "Higher temperature increases evaporation rate, and sunlight provides heat energy for water molecules."
      },
      {
        "q": "Can distillation separate two miscible liquids with the same boiling point?",
        "a": "No, distillation requires different boiling points; liquids with same boiling point cannot be separated."
      },
      {
        "q": "What is the difference in the final products of evaporation versus distillation?",
        "a": "Evaporation leaves the solute behind while distillation collects the separated liquid vapors."
      }
    ]
  },
  {
    "slug": "sublimation-and-deposition",
    "title": "Difference Between Sublimation and Deposition",
    "termA": "Sublimation",
    "termB": "Deposition",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "Sublimation is the conversion of solid directly to vapor without passing through the liquid state, while deposition is the conversion of vapor directly to solid. Both are phase changes that skip the intermediate liquid phase.",
    "table": [
      {
        "aspect": "Initial State",
        "a": "Starts as solid",
        "b": "Starts as vapor"
      },
      {
        "aspect": "Final State",
        "a": "Becomes vapor",
        "b": "Becomes solid"
      },
      {
        "aspect": "Intermediate Phase",
        "a": "Skips liquid phase",
        "b": "Skips liquid phase"
      },
      {
        "aspect": "Temperature Required",
        "a": "Below melting point but needs heat",
        "b": "Below freezing point and releases heat"
      },
      {
        "aspect": "Example",
        "a": "Dry ice, naphthalene balls, iodine",
        "b": "Frost formation, snow formation without melting"
      },
      {
        "aspect": "Reverse Process",
        "a": "Reverse of deposition",
        "b": "Reverse of sublimation"
      }
    ],
    "keyPoints": [
      "Sublimation and deposition are reverse processes of each other",
      "Dry ice sublimes at -78 degrees Celsius under atmospheric pressure",
      "Deposition occurs naturally during frost formation and snowfall",
      "Both processes occur due to pressure and temperature conditions"
    ],
    "faqs": [
      {
        "q": "How is dry ice used in cloud seeding?",
        "a": "Dry ice sublimes, absorbing heat and causing water vapor to deposition as ice crystals, forming clouds."
      },
      {
        "q": "What is frost and how does it form?",
        "a": "Frost forms when water vapor in air deposits directly onto cold surfaces without forming liquid water."
      },
      {
        "q": "Can ice sublime without melting to water?",
        "a": "Yes, under low pressure conditions, ice can sublime directly to water vapor, bypassing the liquid state."
      }
    ]
  },
  {
    "slug": "mass-number-and-atomic-number",
    "title": "Difference Between Mass Number and Atomic Number",
    "termA": "Mass Number",
    "termB": "Atomic Number",
    "category": "Chemistry",
    "classLevel": "9",
    "intro": "The atomic number is the number of protons in an atom's nucleus and defines the element, while the mass number is the total of protons and neutrons. Both numbers are essential for identifying and comparing atoms.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Total protons and neutrons in nucleus",
        "b": "Number of protons in nucleus"
      },
      {
        "aspect": "Symbol",
        "a": "Represented as A",
        "b": "Represented as Z"
      },
      {
        "aspect": "Determines",
        "a": "Mass of atom",
        "b": "Identity of element"
      },
      {
        "aspect": "Variation in Isotopes",
        "a": "Differs between isotopes",
        "b": "Same for all isotopes of an element"
      },
      {
        "aspect": "Calculation",
        "a": "A = Protons + Neutrons",
        "b": "Z = Number of Protons"
      },
      {
        "aspect": "Example",
        "a": "Carbon-12 has mass number 12",
        "b": "Carbon has atomic number 6"
      }
    ],
    "keyPoints": [
      "Atomic number uniquely identifies an element while mass number helps identify specific isotopes",
      "The number of neutrons equals mass number minus atomic number",
      "Atoms of the same element always have the same atomic number but can have different mass numbers",
      "Atomic number determines chemical properties while mass number affects physical properties"
    ],
    "faqs": [
      {
        "q": "If an atom has atomic number 8 and mass number 16, how many neutrons does it have?",
        "a": "Number of neutrons = Mass number - Atomic number = 16 - 8 = 8 neutrons."
      },
      {
        "q": "Why do isotopes of the same element have the same atomic number?",
        "a": "Isotopes have the same number of protons so they have the same atomic number and belong to the same element."
      },
      {
        "q": "Which number changes when an atom gains or loses electrons?",
        "a": "Neither atomic number nor mass number changes; the atomic number and mass always define the atom."
      }
    ]
  },
  {
    "slug": "isotopes-and-isobars",
    "title": "Difference Between Isotopes and Isobars",
    "termA": "Isotopes",
    "termB": "Isobars",
    "category": "Chemistry",
    "classLevel": "10",
    "intro": "Isotopes are atoms of the same element with different numbers of neutrons and different mass numbers, while isobars are atoms of different elements with the same mass number but different atomic numbers. Both are important in nuclear chemistry.",
    "table": [
      {
        "aspect": "Element",
        "a": "Same element, different isotopes",
        "b": "Different elements, different atomic numbers"
      },
      {
        "aspect": "Atomic Number",
        "a": "Same atomic number",
        "b": "Different atomic numbers"
      },
      {
        "aspect": "Mass Number",
        "a": "Different mass numbers",
        "b": "Same mass number"
      },
      {
        "aspect": "Neutrons",
        "a": "Different number of neutrons",
        "b": "Different number of neutrons"
      },
      {
        "aspect": "Chemical Properties",
        "a": "Same chemical properties",
        "b": "Different chemical properties"
      },
      {
        "aspect": "Example",
        "a": "Carbon-12 and Carbon-14",
        "b": "Argon-40 and Potassium-40"
      }
    ],
    "keyPoints": [
      "Isotopes of the same element have identical chemical properties but different nuclear properties",
      "Isobars are different elements that cannot be isotopes of each other",
      "Radioactivity is often associated with certain isotopes of elements",
      "Mass spectrometry can distinguish between isotopes and isobars"
    ],
    "faqs": [
      {
        "q": "Why do isotopes have different atomic masses if they are the same element?",
        "a": "Isotopes have different numbers of neutrons, which increases their mass number and atomic mass."
      },
      {
        "q": "Give an example of two isobars.",
        "a": "Calcium-40 and Potassium-40 are isobars as they have same mass number but different atomic numbers."
      },
      {
        "q": "Which is radioactive among Carbon-12 and Carbon-14?",
        "a": "Carbon-14 is radioactive and decays over time, while Carbon-12 is stable."
      }
    ]
  },
  {
    "slug": "orbit-and-orbital",
    "title": "Difference Between Orbit and Orbital",
    "termA": "Orbit",
    "termB": "Orbital",
    "category": "Chemistry",
    "classLevel": "11",
    "intro": "An orbit is a fixed circular or elliptical path in which an electron revolves around the nucleus according to Bohr's model, while an orbital is a three-dimensional region around the nucleus where there is a high probability of finding an electron. Orbitals replace the concept of orbits in quantum mechanics.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Fixed path around nucleus",
        "b": "Region of high electron probability"
      },
      {
        "aspect": "Model",
        "a": "Based on Bohr's atomic model",
        "b": "Based on quantum mechanical model"
      },
      {
        "aspect": "Shape",
        "a": "Circular or elliptical",
        "b": "Spherical, dumbbell, or cloverleaf shapes"
      },
      {
        "aspect": "Position",
        "a": "Definite, fixed position",
        "b": "Probability region, no fixed position"
      },
      {
        "aspect": "Electron Path",
        "a": "Electron follows specific path",
        "b": "Electron position is uncertain"
      },
      {
        "aspect": "Accuracy",
        "a": "Fails for complex atoms",
        "b": "Works for all atoms"
      }
    ],
    "keyPoints": [
      "Orbits are a simplification that work only for hydrogen-like atoms",
      "Orbitals follow the Heisenberg uncertainty principle and do not specify exact electron position",
      "Different orbitals (s, p, d, f) have different shapes and energy levels",
      "The probability of finding an electron in an orbital is highest at the orbital's center"
    ],
    "faqs": [
      {
        "q": "Why did Bohr's orbit model fail for atoms with more than one electron?",
        "a": "Bohr's model could not explain spectral lines of multi-electron atoms due to electron-electron repulsion."
      },
      {
        "q": "What does the shape of an s-orbital look like?",
        "a": "An s-orbital has a spherical shape with the nucleus at the center."
      },
      {
        "q": "How many electrons can occupy a single orbital?",
        "a": "A single orbital can hold a maximum of 2 electrons with opposite spins."
      }
    ]
  },
  {
    "slug": "speed-and-average-speed",
    "title": "Difference Between Speed and Average Speed",
    "termA": "Speed",
    "termB": "Average Speed",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Speed is the distance traveled per unit time at a specific instant, while average speed is the total distance traveled divided by the total time taken. Average speed does not indicate the actual variation of speed throughout the journey.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Distance per unit time at an instant",
        "b": "Total distance divided by total time"
      },
      {
        "aspect": "Calculation",
        "a": "Speed = distance/time for small intervals",
        "b": "Average speed = total distance/total time"
      },
      {
        "aspect": "Time Interval",
        "a": "Instantaneous value at a moment",
        "b": "Over the entire journey"
      },
      {
        "aspect": "Variation",
        "a": "Can change at each instant",
        "b": "Single value for entire trip"
      },
      {
        "aspect": "Speedometer",
        "a": "Shows speed at each moment",
        "b": "Cannot show average speed directly"
      },
      {
        "aspect": "Example",
        "a": "Car speedometer reads 60 km/h",
        "b": "Car traveled 120 km in 2 hours at average 60 km/h"
      }
    ],
    "keyPoints": [
      "Speed is an instantaneous quantity while average speed is a derived quantity over a time interval",
      "A vehicle can have varying speed but constant average speed for a trip",
      "Average speed does not provide information about the actual path taken",
      "For uniform motion, speed and average speed are equal"
    ],
    "faqs": [
      {
        "q": "If a car travels 100 km in 2 hours, what is its average speed?",
        "a": "Average speed = total distance/total time = 100 km/2 hours = 50 km/h."
      },
      {
        "q": "Can the speed of an object always equal its average speed?",
        "a": "Yes, if the object travels at constant speed throughout, the speed and average speed are equal."
      },
      {
        "q": "Why is average speed useful in real-world scenarios?",
        "a": "Average speed helps estimate travel time for journeys and compare overall efficiency."
      }
    ]
  },
  {
    "slug": "uniform-and-non-uniform-motion",
    "title": "Difference Between Uniform and Non-uniform Motion",
    "termA": "Uniform Motion",
    "termB": "Non-uniform Motion",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Uniform motion is when an object covers equal distances in equal time intervals with constant velocity, while non-uniform motion is when distances covered in equal time intervals are not equal. Acceleration indicates non-uniform motion.",
    "table": [
      {
        "aspect": "Velocity",
        "a": "Constant throughout motion",
        "b": "Changes with time"
      },
      {
        "aspect": "Acceleration",
        "a": "Zero acceleration",
        "b": "Non-zero acceleration"
      },
      {
        "aspect": "Distance in Equal Time",
        "a": "Equal distance in equal time",
        "b": "Unequal distance in equal time"
      },
      {
        "aspect": "Speed Graph",
        "a": "Horizontal straight line",
        "b": "Curved or inclined line"
      },
      {
        "aspect": "Real World Example",
        "a": "Object moving at constant speed",
        "b": "Object accelerating or decelerating"
      },
      {
        "aspect": "Force Required",
        "a": "No net force needed once in motion",
        "b": "Net force required to change velocity"
      }
    ],
    "keyPoints": [
      "Uniform motion requires constant velocity in a straight line",
      "Non-uniform motion includes any change in speed or direction",
      "The distance-time graph for uniform motion is a straight line",
      "The distance-time graph for non-uniform motion is curved"
    ],
    "faqs": [
      {
        "q": "Is motion in a circle at constant speed considered uniform?",
        "a": "No, because velocity includes direction, and direction changes in circular motion."
      },
      {
        "q": "What type of motion do freely falling objects exhibit?",
        "a": "Freely falling objects exhibit non-uniform motion with constant acceleration due to gravity."
      },
      {
        "q": "How can you identify uniform motion from a distance-time graph?",
        "a": "Uniform motion appears as a straight line on a distance-time graph."
      }
    ]
  },
  {
    "slug": "balanced-and-unbalanced-force",
    "title": "Difference Between Balanced and Unbalanced Force",
    "termA": "Balanced Force",
    "termB": "Unbalanced Force",
    "category": "Physics",
    "classLevel": "9",
    "intro": "Balanced forces are equal forces acting in opposite directions that cancel out and produce no change in motion, while unbalanced forces are unequal forces that result in a net force and change the object's motion. Balanced forces maintain equilibrium while unbalanced forces cause acceleration.",
    "table": [
      {
        "aspect": "Magnitude",
        "a": "Equal in magnitude",
        "b": "Not equal in magnitude"
      },
      {
        "aspect": "Direction",
        "a": "Opposite directions",
        "b": "Same or opposite directions"
      },
      {
        "aspect": "Net Force",
        "a": "Zero net force",
        "b": "Non-zero net force"
      },
      {
        "aspect": "Motion Change",
        "a": "No change in motion",
        "b": "Change in velocity or direction"
      },
      {
        "aspect": "Acceleration",
        "a": "Zero acceleration",
        "b": "Non-zero acceleration"
      },
      {
        "aspect": "Example",
        "a": "Tug-of-war with equal strength teams",
        "b": "Tug-of-war with unequal teams"
      }
    ],
    "keyPoints": [
      "Balanced forces keep objects at rest or moving at constant velocity",
      "Unbalanced forces cause changes in motion according to Newton's second law",
      "The net force determines the acceleration of an object",
      "For an object to be in equilibrium, all forces must be balanced"
    ],
    "faqs": [
      {
        "q": "Why does a book on a table not move even though Earth pulls it down?",
        "a": "The weight of the book is balanced by the normal force from the table, resulting in zero net force."
      },
      {
        "q": "What is the net force if 10 N and 15 N forces act in opposite directions?",
        "a": "The net force is 5 N in the direction of the larger force."
      },
      {
        "q": "Can balanced forces cause motion?",
        "a": "No, balanced forces cannot cause changes in motion but maintain existing motion."
      }
    ]
  },
  {
    "slug": "contact-and-non-contact-force",
    "title": "Difference Between Contact and Non-contact Force",
    "termA": "Contact Force",
    "termB": "Non-contact Force",
    "category": "Physics",
    "classLevel": "9",
    "intro": "A contact force is exerted when two objects physically touch each other, while a non-contact force is exerted between objects without physical contact. Both types of forces can cause changes in motion.",
    "table": [
      {
        "aspect": "Requirement",
        "a": "Requires physical contact between objects",
        "b": "Works without physical contact"
      },
      {
        "aspect": "Medium",
        "a": "Requires medium to transmit force",
        "b": "Works through space"
      },
      {
        "aspect": "Action",
        "a": "Force acts at point of contact",
        "b": "Force acts at a distance"
      },
      {
        "aspect": "Examples",
        "a": "Friction, tension, normal force, air resistance",
        "b": "Gravitational force, magnetic force, electrostatic force"
      },
      {
        "aspect": "Visibility",
        "a": "Effects directly visible",
        "b": "Effects observed through motion"
      },
      {
        "aspect": "Common Type",
        "a": "More common in daily life",
        "b": "Less commonly noticed but fundamental"
      }
    ],
    "keyPoints": [
      "Contact forces require physical interaction between surfaces",
      "Non-contact forces act through fields like gravitational, magnetic, or electric fields",
      "Friction is the most common contact force in daily life",
      "Gravity is the most obvious non-contact force affecting us"
    ],
    "faqs": [
      {
        "q": "Is the normal force a contact force or non-contact force?",
        "a": "Normal force is a contact force exerted perpendicular to the surface by objects touching each other."
      },
      {
        "q": "Why does a magnet attract iron without touching it?",
        "a": "Magnetic force is a non-contact force that acts through the magnetic field around the magnet."
      },
      {
        "q": "What causes air resistance on a falling object?",
        "a": "Air resistance is a contact force between the object and air particles during motion."
      }
    ]
  },
  {
    "slug": "vein-and-midrib",
    "title": "Difference Between Vein and Midrib",
    "termA": "Vein",
    "termB": "Midrib",
    "category": "Biology",
    "classLevel": "9",
    "intro": "Veins are the branching vascular tissues in a leaf that distribute water and nutrients, while the midrib is the prominent central vein that extends from the leaf base to the apex. The midrib is the largest and primary vein in a leaf.",
    "table": [
      {
        "aspect": "Position",
        "a": "Distributed throughout leaf blade",
        "b": "Extends from base to leaf apex"
      },
      {
        "aspect": "Size",
        "a": "Smaller and delicate",
        "b": "Largest and most prominent"
      },
      {
        "aspect": "Number",
        "a": "Multiple veins in a leaf",
        "b": "One main midrib per leaf"
      },
      {
        "aspect": "Function",
        "a": "Transport water and minerals throughout",
        "b": "Main transport and support structure"
      },
      {
        "aspect": "Pattern",
        "a": "Form branching networks",
        "b": "Forms the primary axis"
      },
      {
        "aspect": "Arrangement",
        "a": "Secondary and tertiary veins branch from midrib",
        "b": "Primary vein from which others branch"
      }
    ],
    "keyPoints": [
      "The midrib is the most important vein and provides the main structure and support",
      "Secondary veins branch from the midrib to form the vein network",
      "Veins and midrib together form the venation pattern of the leaf",
      "The venation pattern helps classify plants into different groups"
    ],
    "faqs": [
      {
        "q": "What is the difference between parallel venation and reticulate venation?",
        "a": "Parallel venation has veins running parallel to midrib in monocots; reticulate has branching network in dicots."
      },
      {
        "q": "Why is the midrib stronger and thicker than other veins?",
        "a": "Midrib needs to support the entire leaf structure and handle the main flow of water and minerals."
      },
      {
        "q": "What happens if the midrib is damaged on a leaf?",
        "a": "Damage to the midrib can reduce water transport and weaken the leaf structure, affecting its function."
      }
    ]
  },
  {
    "slug": "photosynthesis-and-transpiration",
    "title": "Difference Between Photosynthesis and Transpiration",
    "termA": "Photosynthesis",
    "termB": "Transpiration",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Photosynthesis is the process by which plants manufacture food using sunlight, water, and carbon dioxide, producing oxygen as a byproduct. Transpiration is the process by which water is lost from plant leaves as vapor through stomata, essential for cooling and nutrient transport.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Food production using light energy",
        "b": "Water loss through leaves as vapor"
      },
      {
        "aspect": "Raw Materials",
        "a": "Water, carbon dioxide, sunlight",
        "b": "Water from soil"
      },
      {
        "aspect": "Products",
        "a": "Glucose and oxygen",
        "b": "Water vapor and cooling effect"
      },
      {
        "aspect": "Organ Involved",
        "a": "Occurs in leaves",
        "b": "Occurs through stomata in leaves"
      },
      {
        "aspect": "Light Requirement",
        "a": "Requires light energy",
        "b": "Can occur during day and night"
      },
      {
        "aspect": "Purpose",
        "a": "Energy production for plant",
        "b": "Cooling and nutrient transport"
      }
    ],
    "keyPoints": [
      "Photosynthesis captures light energy to produce organic compounds while transpiration is a water loss process",
      "Photosynthesis occurs in chloroplasts while transpiration occurs through stomata",
      "Photosynthesis produces oxygen which is released to the atmosphere",
      "Transpiration is essential for plant cooling and helps transport water and minerals from roots"
    ],
    "faqs": [
      {
        "q": "Why is transpiration important for plants?",
        "a": "Transpiration creates a water transport pathway from roots to leaves and helps cool the plant."
      },
      {
        "q": "What would happen if a plant could not transpire?",
        "a": "Without transpiration, plants cannot cool properly and nutrient transport is affected."
      },
      {
        "q": "Is photosynthesis and chemosynthesis the same?",
        "a": "No, chemosynthesis uses chemical energy while photosynthesis uses light energy for food production."
      }
    ]
  },
  {
    "slug": "primary-and-secondary-data",
    "title": "Difference Between Primary and Secondary Data",
    "termA": "Primary Data",
    "termB": "Secondary Data",
    "category": "Social Science",
    "classLevel": "6-8",
    "intro": "Primary data is original information collected directly by the researcher through surveys, interviews, or observations. Secondary data is existing information gathered from published sources, reports, or previous research.",
    "table": [
      {
        "aspect": "Source",
        "a": "Collected directly by researcher",
        "b": "Already published or gathered by others"
      },
      {
        "aspect": "Time Required",
        "a": "More time-consuming to collect",
        "b": "Faster to obtain from existing sources"
      },
      {
        "aspect": "Cost",
        "a": "More expensive",
        "b": "Less expensive or free"
      },
      {
        "aspect": "Relevance",
        "a": "Highly relevant to specific research",
        "b": "May not perfectly match research needs"
      },
      {
        "aspect": "Examples",
        "a": "Surveys, interviews, experiments, observations",
        "b": "Books, journals, websites, government reports"
      }
    ],
    "keyPoints": [
      "Primary data is first-hand and original information",
      "Secondary data comes from existing sources and previous studies",
      "Primary data collection requires planning and resources but ensures accuracy for specific needs",
      "Secondary data saves time and money but must be evaluated for reliability"
    ],
    "faqs": [
      {
        "q": "Which type of data is more reliable?",
        "a": "Primary data is typically more reliable for specific research as it is collected under controlled conditions, though secondary data from reputable sources is also trustworthy."
      },
      {
        "q": "Can a researcher use only secondary data?",
        "a": "Yes, researchers can use only secondary data, especially for literature reviews or analyses that do not require new empirical collection."
      },
      {
        "q": "What is an example of primary data collection in schools?",
        "a": "A school survey asking students about their favorite subjects, conducted by teachers, is primary data collection."
      }
    ]
  },
  {
    "slug": "qualitative-and-quantitative-research",
    "title": "Difference Between Qualitative and Quantitative Research",
    "termA": "Qualitative Research",
    "termB": "Quantitative Research",
    "category": "Social Science",
    "classLevel": "8-10",
    "intro": "Qualitative research focuses on understanding qualities, characteristics, and meanings through descriptive analysis. Quantitative research focuses on measuring quantities and numerical data through statistical analysis.",
    "table": [
      {
        "aspect": "Focus",
        "a": "Understanding meanings and experiences",
        "b": "Measuring and counting numerical data"
      },
      {
        "aspect": "Data Type",
        "a": "Words, descriptions, themes",
        "b": "Numbers, statistics, measurements"
      },
      {
        "aspect": "Methods",
        "a": "Interviews, observations, case studies",
        "b": "Surveys, experiments, statistical tests"
      },
      {
        "aspect": "Analysis",
        "a": "Thematic analysis and interpretation",
        "b": "Statistical and mathematical analysis"
      },
      {
        "aspect": "Sample Size",
        "a": "Smaller, selected carefully for depth",
        "b": "Larger, random selection for representation"
      },
      {
        "aspect": "Results",
        "a": "Detailed descriptions and insights",
        "b": "Numerical results, graphs, and tables"
      }
    ],
    "keyPoints": [
      "Qualitative research explores the why and how through detailed descriptions",
      "Quantitative research measures the what and how much through numbers",
      "Qualitative data comes from words, observations, and interviews",
      "Quantitative data comes from measurements, counts, and statistical tests"
    ],
    "faqs": [
      {
        "q": "Can qualitative and quantitative research be used together?",
        "a": "Yes, mixed-methods research combines both approaches to provide comprehensive insights into a research question."
      },
      {
        "q": "Which is better: qualitative or quantitative?",
        "a": "Neither is better; the choice depends on the research question. Qualitative is ideal for understanding experiences, while quantitative is better for testing hypotheses."
      },
      {
        "q": "What is an example of qualitative research in schools?",
        "a": "A teacher conducting interviews with students to understand their learning challenges is a qualitative research method."
      }
    ]
  },
  {
    "slug": "mean-and-average",
    "title": "Difference Between Mean and Average",
    "termA": "Mean",
    "termB": "Average",
    "category": "Maths",
    "classLevel": "5-7",
    "intro": "In mathematics, mean is the sum of all values divided by the count of values, representing the arithmetic average. Average is a broader term that can refer to mean, median, or mode.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Sum of all values divided by number of values",
        "b": "General term for central tendency measures"
      },
      {
        "aspect": "Scope",
        "a": "Specific mathematical calculation",
        "b": "Can include mean, median, and mode"
      },
      {
        "aspect": "Calculation",
        "a": "Add all numbers and divide by count",
        "b": "Method depends on which average is used"
      },
      {
        "aspect": "Usage",
        "a": "Most commonly used in statistics",
        "b": "Broader everyday term"
      },
      {
        "aspect": "Example",
        "a": "Mean of 2, 4, 6 is 4 (12 divided by 3)",
        "b": "Average could be the median value 4 instead"
      }
    ],
    "keyPoints": [
      "Mean is a specific type of average calculated by summing and dividing",
      "Average is a general term that encompasses mean, median, and mode",
      "In common usage, average and mean are often used interchangeably",
      "Mean is sensitive to extreme values while median is not"
    ],
    "faqs": [
      {
        "q": "Are mean and average the same thing?",
        "a": "In everyday language, yes, but technically average is broader and includes mean, median, and mode."
      },
      {
        "q": "Why is mean sometimes misleading?",
        "a": "Mean can be skewed by extremely high or low values, making median or mode better choices in some cases."
      },
      {
        "q": "How do you find the mean?",
        "a": "Add all the numbers together and divide by how many numbers there are."
      }
    ]
  },
  {
    "slug": "fraction-and-decimal",
    "title": "Difference Between Fraction and Decimal",
    "termA": "Fraction",
    "termB": "Decimal",
    "category": "Maths",
    "classLevel": "4-6",
    "intro": "A fraction represents a part of a whole using a numerator and denominator separated by a line. A decimal represents a part of a whole using the base-10 number system with a decimal point.",
    "table": [
      {
        "aspect": "Representation",
        "a": "Numerator over denominator (e.g., 3/4)",
        "b": "Digits after decimal point (e.g., 0.75)"
      },
      {
        "aspect": "Number System",
        "a": "Ratio-based representation",
        "b": "Base-10 positional system"
      },
      {
        "aspect": "Written Form",
        "a": "Two numbers with a horizontal line",
        "b": "Single number with decimal point"
      },
      {
        "aspect": "Ease of Comparison",
        "a": "Requires common denominator to compare",
        "b": "Easier to compare directly"
      },
      {
        "aspect": "Conversion",
        "a": "1/2 equals 0.5 in decimal",
        "b": "0.5 equals 1/2 in fraction"
      }
    ],
    "keyPoints": [
      "Fractions use a numerator and denominator to show parts of a whole",
      "Decimals use place value based on powers of 10",
      "Both represent the same quantities in different forms",
      "Decimals are easier to use in most mathematical operations and comparisons"
    ],
    "faqs": [
      {
        "q": "How do you convert a fraction to a decimal?",
        "a": "Divide the numerator by the denominator. For example, 3/4 = 3 ÷ 4 = 0.75."
      },
      {
        "q": "How do you convert a decimal to a fraction?",
        "a": "Write the digits after the decimal point as the numerator and a power of 10 as the denominator. For 0.75, write 75/100 and simplify to 3/4."
      },
      {
        "q": "Which is more useful in daily life?",
        "a": "Decimals are more practical for currency, measurements, and calculations, while fractions are useful in cooking and music."
      }
    ]
  },
  {
    "slug": "factor-and-multiple",
    "title": "Difference Between Factor and Multiple",
    "termA": "Factor",
    "termB": "Multiple",
    "category": "Maths",
    "classLevel": "4-6",
    "intro": "A factor is a number that divides exactly into another number without remainder. A multiple is a number obtained by multiplying a given number by another whole number.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Divides into a number evenly",
        "b": "Result of multiplying by whole numbers"
      },
      {
        "aspect": "Relationship",
        "a": "Smaller than or equal to the number",
        "b": "Equal to or larger than the number"
      },
      {
        "aspect": "Example",
        "a": "Factors of 12: 1, 2, 3, 4, 6, 12",
        "b": "Multiples of 12: 12, 24, 36, 48, 60"
      },
      {
        "aspect": "Count",
        "a": "Limited and finite",
        "b": "Unlimited and infinite"
      },
      {
        "aspect": "Operation",
        "a": "Division operation",
        "b": "Multiplication operation"
      }
    ],
    "keyPoints": [
      "Factors are numbers that divide exactly into a given number",
      "Multiples are numbers obtained by multiplying a given number",
      "Every number is a factor of itself and has itself as a multiple",
      "Understanding factors and multiples is essential for finding LCM and HCF"
    ],
    "faqs": [
      {
        "q": "What are the factors of 20?",
        "a": "The factors of 20 are: 1, 2, 4, 5, 10, and 20 because all these numbers divide 20 evenly."
      },
      {
        "q": "What are the first five multiples of 5?",
        "a": "The first five multiples of 5 are: 5, 10, 15, 20, and 25."
      },
      {
        "q": "Is every multiple also a factor?",
        "a": "No, multiples are usually larger than the original number, while factors are smaller or equal. For example, 24 is a multiple of 6 but not a factor."
      }
    ]
  },
  {
    "slug": "lcm-and-hcf",
    "title": "Difference Between LCM and HCF",
    "termA": "LCM (Least Common Multiple)",
    "termB": "HCF (Highest Common Factor)",
    "category": "Maths",
    "classLevel": "5-7",
    "intro": "LCM is the smallest number that is a multiple of two or more numbers. HCF is the largest number that divides two or more numbers evenly.",
    "table": [
      {
        "aspect": "Full Form",
        "a": "Least Common Multiple",
        "b": "Highest Common Factor or GCD"
      },
      {
        "aspect": "Definition",
        "a": "Smallest common multiple",
        "b": "Largest common divisor"
      },
      {
        "aspect": "Magnitude",
        "a": "Larger than or equal to the numbers",
        "b": "Smaller than or equal to the numbers"
      },
      {
        "aspect": "Example",
        "a": "LCM of 4 and 6 is 12",
        "b": "HCF of 4 and 6 is 2"
      },
      {
        "aspect": "Used For",
        "a": "Adding and subtracting fractions",
        "b": "Simplifying fractions"
      }
    ],
    "keyPoints": [
      "LCM is the smallest number divisible by all given numbers",
      "HCF is the largest number that divides all given numbers",
      "LCM and HCF are inverse concepts in number theory",
      "For any two numbers, LCM x HCF = Product of the numbers"
    ],
    "faqs": [
      {
        "q": "How do you find the LCM of 12 and 18?",
        "a": "Multiples of 12: 12, 24, 36... Multiples of 18: 18, 36... LCM is 36."
      },
      {
        "q": "How do you find the HCF of 12 and 18?",
        "a": "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. HCF is 6."
      },
      {
        "q": "When do we use LCM in real life?",
        "a": "LCM is used in scheduling, adding fractions with different denominators, and synchronizing events."
      }
    ]
  },
  {
    "slug": "area-and-volume",
    "title": "Difference Between Area and Volume",
    "termA": "Area",
    "termB": "Volume",
    "category": "Maths",
    "classLevel": "6-8",
    "intro": "Area measures the space covered by a two-dimensional shape on a surface. Volume measures the space occupied by a three-dimensional object.",
    "table": [
      {
        "aspect": "Dimension",
        "a": "Two-dimensional measurement",
        "b": "Three-dimensional measurement"
      },
      {
        "aspect": "Shapes",
        "a": "Square, rectangle, triangle, circle",
        "b": "Cube, sphere, cylinder, cone"
      },
      {
        "aspect": "Unit",
        "a": "Square units (cm², m², etc.)",
        "b": "Cubic units (cm³, m³, etc.)"
      },
      {
        "aspect": "Formula Example",
        "a": "Area of rectangle = length x width",
        "b": "Volume of cube = side³"
      },
      {
        "aspect": "Everyday Use",
        "a": "Painting walls, carpeting floors",
        "b": "Filling containers, storage capacity"
      }
    ],
    "keyPoints": [
      "Area is the space inside a flat 2D shape",
      "Volume is the space inside a solid 3D object",
      "Area uses square units while volume uses cubic units",
      "Both are essential measurements in geometry and construction"
    ],
    "faqs": [
      {
        "q": "How do you find the area of a rectangle?",
        "a": "Multiply length by width. For example, a rectangle 5 cm long and 3 cm wide has area 15 cm²."
      },
      {
        "q": "How do you find the volume of a cube?",
        "a": "Multiply side x side x side (side³). A cube with side 4 cm has volume 64 cm³."
      },
      {
        "q": "What is the difference between surface area and volume?",
        "a": "Surface area is the total area of all faces of a 3D object, while volume is the space inside it."
      }
    ]
  },
  {
    "slug": "perimeter-and-circumference",
    "title": "Difference Between Perimeter and Circumference",
    "termA": "Perimeter",
    "termB": "Circumference",
    "category": "Maths",
    "classLevel": "5-7",
    "intro": "Perimeter is the total distance around the boundary of a polygon or closed figure. Circumference is the perimeter of a circle.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Distance around any closed polygon",
        "b": "Distance around a circle"
      },
      {
        "aspect": "Shapes",
        "a": "Squares, rectangles, triangles, polygons",
        "b": "Only circles"
      },
      {
        "aspect": "Calculation",
        "a": "Add all side lengths",
        "b": "2πr or πd"
      },
      {
        "aspect": "Symbol",
        "a": "P",
        "b": "C"
      },
      {
        "aspect": "Example",
        "a": "Perimeter of square with side 5 = 20",
        "b": "Circumference of circle with radius 5 = 10π"
      }
    ],
    "keyPoints": [
      "Perimeter is the total length of the boundary of any polygon",
      "Circumference is the special term used for the perimeter of a circle",
      "Perimeter requires adding individual side lengths",
      "Circumference uses the radius or diameter and pi for calculation"
    ],
    "faqs": [
      {
        "q": "How do you find the perimeter of a rectangle?",
        "a": "Add all four sides or use the formula: P = 2(length + width)."
      },
      {
        "q": "How do you find the circumference of a circle?",
        "a": "Use C = 2πr (where r is radius) or C = πd (where d is diameter)."
      },
      {
        "q": "Why is circumference called the perimeter of a circle?",
        "a": "Because both measure the distance around a closed figure. Circumference is just the specific term for circles."
      }
    ]
  },
  {
    "slug": "line-and-line-segment",
    "title": "Difference Between Line and Line Segment",
    "termA": "Line",
    "termB": "Line Segment",
    "category": "Maths",
    "classLevel": "6-8",
    "intro": "A line is a straight path extending infinitely in both directions. A line segment is a finite portion of a line with two fixed endpoints.",
    "table": [
      {
        "aspect": "Endpoints",
        "a": "No endpoints, extends infinitely",
        "b": "Two fixed endpoints"
      },
      {
        "aspect": "Length",
        "a": "Infinite",
        "b": "Finite and measurable"
      },
      {
        "aspect": "Representation",
        "a": "Usually shown with arrows at both ends",
        "b": "Shown with points at both ends"
      },
      {
        "aspect": "Notation",
        "a": "Written as line AB or with arrows",
        "b": "Written as segment AB or AB with a line above"
      },
      {
        "aspect": "Physical Example",
        "a": "A laser beam extended infinitely",
        "b": "A stick of wood with two ends"
      }
    ],
    "keyPoints": [
      "A line extends infinitely in both directions with no endpoints",
      "A line segment has two definite endpoints and finite length",
      "Multiple line segments can form a line",
      "Lines and line segments are fundamental concepts in geometry"
    ],
    "faqs": [
      {
        "q": "Can a line segment be part of a line?",
        "a": "Yes, a line segment is a portion of a line that is bounded by two endpoints."
      },
      {
        "q": "How is a line different from a line segment in diagrams?",
        "a": "Lines are drawn with arrows on both ends to show they extend infinitely, while line segments have dots at the endpoints."
      },
      {
        "q": "What other geometric terms are related to lines?",
        "a": "Ray is another related term. A ray has one endpoint and extends infinitely in one direction."
      }
    ]
  },
  {
    "slug": "ray-and-line",
    "title": "Difference Between Ray and Line",
    "termA": "Ray",
    "termB": "Line",
    "category": "Maths",
    "classLevel": "6-8",
    "intro": "A ray is a straight path that starts at a point and extends infinitely in one direction. A line extends infinitely in both directions with no starting or ending point.",
    "table": [
      {
        "aspect": "Starting Point",
        "a": "One fixed starting point",
        "b": "No starting or ending point"
      },
      {
        "aspect": "Direction",
        "a": "Extends infinitely in one direction",
        "b": "Extends infinitely in both directions"
      },
      {
        "aspect": "Endpoints",
        "a": "One endpoint (the origin)",
        "b": "No endpoints"
      },
      {
        "aspect": "Notation",
        "a": "Ray AB (arrow shows direction)",
        "b": "Line AB (arrows on both ends)"
      },
      {
        "aspect": "Real Life Example",
        "a": "A flashlight beam starting from the torch",
        "b": "An endless street in both directions"
      }
    ],
    "keyPoints": [
      "A ray has one endpoint and extends infinitely in one direction",
      "A line has no endpoints and extends infinitely in both directions",
      "A ray is like half of a line divided at a point",
      "Both rays and lines are fundamental geometric elements"
    ],
    "faqs": [
      {
        "q": "How do you denote a ray in geometry?",
        "a": "A ray is denoted with a point and an arrow in one direction, such as ray AB or →AB."
      },
      {
        "q": "Can a line be made from two rays?",
        "a": "Yes, if two rays with the same starting point extend in opposite directions, they form a line."
      },
      {
        "q": "What is the difference between a ray, a line, and a line segment?",
        "a": "A ray has one endpoint, a line has no endpoints, and a line segment has two endpoints."
      }
    ]
  },
  {
    "slug": "acute-and-obtuse-angle",
    "title": "Difference Between Acute and Obtuse Angle",
    "termA": "Acute Angle",
    "termB": "Obtuse Angle",
    "category": "Maths",
    "classLevel": "5-7",
    "intro": "An acute angle measures between 0 and 90 degrees. An obtuse angle measures between 90 and 180 degrees.",
    "table": [
      {
        "aspect": "Measurement Range",
        "a": "0° to 90°",
        "b": "90° to 180°"
      },
      {
        "aspect": "Comparison to Right Angle",
        "a": "Smaller than a right angle",
        "b": "Larger than a right angle"
      },
      {
        "aspect": "Appearance",
        "a": "Sharp and pointed",
        "b": "Wide and open"
      },
      {
        "aspect": "Examples",
        "a": "30°, 45°, 60°, 75°",
        "b": "120°, 135°, 150°"
      },
      {
        "aspect": "Clock Hand Example",
        "a": "1:00 position forms acute angle",
        "b": "4:00 position forms obtuse angle"
      }
    ],
    "keyPoints": [
      "Acute angles are less than 90 degrees",
      "Obtuse angles are more than 90 degrees but less than 180 degrees",
      "A right angle is exactly 90 degrees",
      "Acute and obtuse angles are common in geometry and everyday objects"
    ],
    "faqs": [
      {
        "q": "How do you identify an acute angle?",
        "a": "An acute angle appears sharp and narrow, measuring less than 90 degrees."
      },
      {
        "q": "What is an example of an obtuse angle?",
        "a": "A 120-degree angle or the angle between an open book where pages spread wide apart."
      },
      {
        "q": "Can an angle be both acute and obtuse?",
        "a": "No, an angle is either acute, right, or obtuse based on its measurement."
      }
    ]
  },
  {
    "slug": "complementary-and-supplementary-angles",
    "title": "Difference Between Complementary and Supplementary Angles",
    "termA": "Complementary Angles",
    "termB": "Supplementary Angles",
    "category": "Maths",
    "classLevel": "6-8",
    "intro": "Complementary angles are two angles whose sum equals 90 degrees. Supplementary angles are two angles whose sum equals 180 degrees.",
    "table": [
      {
        "aspect": "Sum of Angles",
        "a": "Total sum is 90°",
        "b": "Total sum is 180°"
      },
      {
        "aspect": "Individual Angles",
        "a": "Each angle is less than 90°",
        "b": "One or both can be 90° or more"
      },
      {
        "aspect": "Example",
        "a": "30° and 60° are complementary",
        "b": "100° and 80° are supplementary"
      },
      {
        "aspect": "Geometric Shape",
        "a": "Found in right triangles",
        "b": "Found on a straight line"
      },
      {
        "aspect": "Relationship",
        "a": "Complete a right angle",
        "b": "Complete a straight angle"
      }
    ],
    "keyPoints": [
      "Complementary angles always sum to 90 degrees",
      "Supplementary angles always sum to 180 degrees",
      "Both pairs help solve angle problems in geometry",
      "The sum value helps distinguish between the two types"
    ],
    "faqs": [
      {
        "q": "If one angle is 35°, what is its complementary angle?",
        "a": "The complementary angle is 90° - 35° = 55°."
      },
      {
        "q": "If one angle is 120°, what is its supplementary angle?",
        "a": "The supplementary angle is 180° - 120° = 60°."
      },
      {
        "q": "Can two acute angles be supplementary?",
        "a": "Yes, for example, 50° and 130° sum to 180°. One is acute and one is obtuse."
      }
    ]
  },
  {
    "slug": "rhombus-and-parallelogram",
    "title": "Difference Between Rhombus and Parallelogram",
    "termA": "Rhombus",
    "termB": "Parallelogram",
    "category": "Maths",
    "classLevel": "6-8",
    "intro": "A rhombus is a quadrilateral with all four sides equal and opposite angles equal. A parallelogram is a quadrilateral with opposite sides equal and parallel.",
    "table": [
      {
        "aspect": "Sides",
        "a": "All four sides equal",
        "b": "Opposite sides equal and parallel"
      },
      {
        "aspect": "Angles",
        "a": "Opposite angles equal",
        "b": "Opposite angles equal"
      },
      {
        "aspect": "Diagonals",
        "a": "Bisect each other at right angles",
        "b": "Bisect each other but not at right angles"
      },
      {
        "aspect": "Shape",
        "a": "Diamond-like appearance",
        "b": "Slanted rectangle appearance"
      },
      {
        "aspect": "Relationship",
        "a": "Special type of parallelogram",
        "b": "General quadrilateral"
      }
    ],
    "keyPoints": [
      "A rhombus has all sides equal while a parallelogram has opposite sides equal",
      "Both have opposite angles equal and opposite sides parallel",
      "A rhombus is a special type of parallelogram",
      "The key distinguishing feature is the equality of all sides in a rhombus"
    ],
    "faqs": [
      {
        "q": "Is every rhombus a parallelogram?",
        "a": "Yes, a rhombus is a special type of parallelogram with all sides equal."
      },
      {
        "q": "Is every parallelogram a rhombus?",
        "a": "No, a parallelogram only needs opposite sides to be equal, while a rhombus needs all four sides equal."
      },
      {
        "q": "How do the diagonals differ between them?",
        "a": "In a rhombus, diagonals bisect at right angles. In a parallelogram, diagonals bisect but not necessarily at right angles."
      }
    ]
  },
  {
    "slug": "prism-and-pyramid",
    "title": "Difference Between Prism and Pyramid",
    "termA": "Prism",
    "termB": "Pyramid",
    "category": "Maths",
    "classLevel": "7-9",
    "intro": "A prism is a 3D shape with two parallel, congruent polygonal bases and rectangular sides. A pyramid is a 3D shape with one polygonal base and triangular sides meeting at an apex.",
    "table": [
      {
        "aspect": "Bases",
        "a": "Two parallel, congruent polygonal bases",
        "b": "One polygonal base"
      },
      {
        "aspect": "Sides",
        "a": "Rectangular or parallelogram sides",
        "b": "Triangular sides"
      },
      {
        "aspect": "Apex",
        "a": "No apex, has parallel edges",
        "b": "Single apex where triangles meet"
      },
      {
        "aspect": "Vertices",
        "a": "More vertices due to two bases",
        "b": "Fewer vertices, one at apex"
      },
      {
        "aspect": "Examples",
        "a": "Cube, cuboid, triangular prism",
        "b": "Tetrahedron, square pyramid, cone"
      }
    ],
    "keyPoints": [
      "A prism has two parallel bases connected by rectangular faces",
      "A pyramid has one base with triangular faces meeting at an apex",
      "Prisms have uniform cross-sections while pyramids taper to a point",
      "Both are important 3D shapes in geometry and architecture"
    ],
    "faqs": [
      {
        "q": "What is an example of a prism in real life?",
        "a": "A cube, a triangular prism (like a toblerone box), or a cylinder are examples of prisms."
      },
      {
        "q": "What is an example of a pyramid in real life?",
        "a": "The Egyptian pyramids, a cone, or a square-based pyramid are examples."
      },
      {
        "q": "How do you find the volume of a prism?",
        "a": "Volume of prism = Base area x Height"
      }
    ]
  },
  {
    "slug": "sphere-and-hemisphere",
    "title": "Difference Between Sphere and Hemisphere",
    "termA": "Sphere",
    "termB": "Hemisphere",
    "category": "Maths",
    "classLevel": "7-9",
    "intro": "A sphere is a 3D shape where all points are equidistant from a center point. A hemisphere is half of a sphere cut by a plane through its center.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Complete round 3D ball shape",
        "b": "Half of a sphere"
      },
      {
        "aspect": "Surfaces",
        "a": "One curved surface",
        "b": "One curved and one flat circular surface"
      },
      {
        "aspect": "Volume",
        "a": "(4/3)πr³",
        "b": "(2/3)πr³"
      },
      {
        "aspect": "Surface Area",
        "a": "4πr²",
        "b": "3πr² (curved + flat base)"
      },
      {
        "aspect": "Examples",
        "a": "Earth, basketball, marble",
        "b": "Dome, bowl, half of Earth"
      }
    ],
    "keyPoints": [
      "A sphere is a complete round object with all points equidistant from center",
      "A hemisphere is exactly half of a sphere",
      "A hemisphere has one flat circular base and one curved surface",
      "Both are important 3D shapes used in architecture, geography, and engineering"
    ],
    "faqs": [
      {
        "q": "Is a bowl a hemisphere?",
        "a": "A bowl is shaped like a hemisphere, with a curved outer surface and a flat opening at the top."
      },
      {
        "q": "What is the volume of a hemisphere with radius 5 cm?",
        "a": "Volume = (2/3)π(5)³ = (2/3)π(125) ≈ 261.8 cm³"
      },
      {
        "q": "How are Earth's two hemispheres different from geometric hemispheres?",
        "a": "Geographic hemispheres are divided by planes through the center (equator or prime meridian), while a geometric hemisphere is cut once through the middle."
      }
    ]
  },
  {
    "slug": "simple-and-compound-interest",
    "title": "Difference Between Simple and Compound Interest",
    "termA": "Simple Interest",
    "termB": "Compound Interest",
    "category": "Maths",
    "classLevel": "6-8",
    "intro": "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus accumulated interest.",
    "table": [
      {
        "aspect": "Calculation",
        "a": "Interest on principal only",
        "b": "Interest on principal and accumulated interest"
      },
      {
        "aspect": "Formula",
        "a": "SI = (P x R x T) / 100",
        "b": "CI = P(1 + R/100)^T - P"
      },
      {
        "aspect": "Growth",
        "a": "Linear growth",
        "b": "Exponential growth"
      },
      {
        "aspect": "Amount After Interest",
        "a": "A = P + SI",
        "b": "A = P(1 + R/100)^T"
      },
      {
        "aspect": "Returns",
        "a": "Lower returns over time",
        "b": "Higher returns over time"
      }
    ],
    "keyPoints": [
      "Simple interest is calculated only on the original principal",
      "Compound interest is calculated on principal plus previously earned interest",
      "Simple interest results in linear growth while compound interest results in exponential growth",
      "Compound interest yields more returns over longer periods"
    ],
    "faqs": [
      {
        "q": "If Rs. 1000 is invested at 10% simple interest for 3 years, what is the interest?",
        "a": "SI = (1000 x 10 x 3) / 100 = Rs. 300"
      },
      {
        "q": "How is compound interest better than simple interest?",
        "a": "Compound interest earns interest on interest, leading to exponential growth, making it more profitable over time."
      },
      {
        "q": "When is simple interest used in real life?",
        "a": "Simple interest is often used for short-term loans, car loans, and some personal loans."
      }
    ]
  },
  {
    "slug": "cost-price-and-selling-price",
    "title": "Difference Between Cost Price and Selling Price",
    "termA": "Cost Price",
    "termB": "Selling Price",
    "category": "Maths",
    "classLevel": "5-7",
    "intro": "Cost price is the amount paid to acquire a product. Selling price is the amount for which the product is sold to customers.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Price at which goods are purchased",
        "b": "Price at which goods are sold"
      },
      {
        "aspect": "Profit Calculation",
        "a": "Profit = SP - CP",
        "b": "Part of profit equation"
      },
      {
        "aspect": "Loss Situation",
        "a": "No loss if CP is lower",
        "b": "Loss occurs if SP is lower"
      },
      {
        "aspect": "Example",
        "a": "Shopkeeper buys shirt for Rs. 300 (CP)",
        "b": "Shopkeeper sells shirt for Rs. 500 (SP)"
      },
      {
        "aspect": "Relationship",
        "a": "Lower means better purchase",
        "b": "Higher means more profit"
      }
    ],
    "keyPoints": [
      "Cost price is what the buyer or seller pays to acquire goods",
      "Selling price is what customers pay for the goods",
      "Profit is the difference between selling price and cost price",
      "If selling price is less than cost price, it results in a loss"
    ],
    "faqs": [
      {
        "q": "If cost price is Rs. 200 and selling price is Rs. 250, what is the profit?",
        "a": "Profit = SP - CP = 250 - 200 = Rs. 50"
      },
      {
        "q": "Can selling price be less than cost price?",
        "a": "Yes, when selling price is less than cost price, the seller incurs a loss."
      },
      {
        "q": "How do you calculate profit percentage?",
        "a": "Profit % = (Profit / CP) x 100"
      }
    ]
  },
  {
    "slug": "income-and-expenditure",
    "title": "Difference Between Income and Expenditure",
    "termA": "Income",
    "termB": "Expenditure",
    "category": "Economics",
    "classLevel": "6-8",
    "intro": "Income is the money earned or received by an individual or organization. Expenditure is the money spent or paid out by an individual or organization.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Money earned or received",
        "b": "Money spent or paid out"
      },
      {
        "aspect": "Direction",
        "a": "Coming into the account",
        "b": "Going out from the account"
      },
      {
        "aspect": "Effect on Balance",
        "a": "Increases bank balance",
        "b": "Decreases bank balance"
      },
      {
        "aspect": "Examples",
        "a": "Salary, business profit, interest",
        "b": "Rent, food, utilities, transportation"
      },
      {
        "aspect": "Savings",
        "a": "Savings = Income - Expenditure",
        "b": "Part of savings equation"
      }
    ],
    "keyPoints": [
      "Income is all money earned from work, business, or investments",
      "Expenditure is all money spent on goods, services, and obligations",
      "Savings equals income minus expenditure",
      "Proper budgeting requires monitoring both income and expenditure"
    ],
    "faqs": [
      {
        "q": "What are sources of income for a student?",
        "a": "Sources can include part-time jobs, pocket money from parents, scholarships, or freelance work."
      },
      {
        "q": "How do you calculate monthly savings?",
        "a": "Monthly savings = Monthly income - Monthly expenditure"
      },
      {
        "q": "Why is it important to track expenditure?",
        "a": "Tracking expenditure helps control spending, identify unnecessary expenses, and plan for future savings and investments."
      }
    ]
  },
  {
    "slug": "savings-and-investment",
    "title": "Difference Between Savings and Investment",
    "termA": "Savings",
    "termB": "Investment",
    "category": "Economics",
    "classLevel": "7-9",
    "intro": "Savings is money set aside for future use, typically kept in banks. Investment is money put into assets or projects with the goal of generating returns.",
    "table": [
      {
        "aspect": "Purpose",
        "a": "Preserve money for future needs",
        "b": "Grow money through returns"
      },
      {
        "aspect": "Risk",
        "a": "Low risk, guaranteed safety",
        "b": "Higher risk for potential gains"
      },
      {
        "aspect": "Returns",
        "a": "Fixed interest, modest returns",
        "b": "Variable returns based on market"
      },
      {
        "aspect": "Location",
        "a": "Banks, piggy banks, lockers",
        "b": "Stocks, bonds, real estate"
      },
      {
        "aspect": "Time Commitment",
        "a": "Money stays accessible",
        "b": "Often locked for specific period"
      }
    ],
    "keyPoints": [
      "Savings is money kept aside for security and future needs",
      "Investment is money put into assets to earn returns",
      "Savings has low risk while investments carry higher risk",
      "A balanced approach combines both savings and investments"
    ],
    "faqs": [
      {
        "q": "What is the main difference between savings and investment?",
        "a": "Savings preserves money with safety, while investment aims to grow money through returns."
      },
      {
        "q": "Can you invest your savings?",
        "a": "Yes, many people use their savings to invest in stocks, bonds, real estate, or mutual funds."
      },
      {
        "q": "Which is better for beginners: savings or investment?",
        "a": "Start with savings in a bank account, then as you learn, invest a portion in low-risk options like mutual funds."
      }
    ]
  },
  {
    "slug": "cash-and-cheque",
    "title": "Difference Between Cash and Cheque",
    "termA": "Cash",
    "termB": "Cheque",
    "category": "Economics",
    "classLevel": "6-8",
    "intro": "Cash is physical currency in the form of notes and coins used for immediate payment. A cheque is a written order to a bank to pay a specified amount to a recipient.",
    "table": [
      {
        "aspect": "Form",
        "a": "Physical notes and coins",
        "b": "Written document/paper"
      },
      {
        "aspect": "Acceptance",
        "a": "Accepted everywhere immediately",
        "b": "Accepted only with verification"
      },
      {
        "aspect": "Transaction Time",
        "a": "Instant payment",
        "b": "Takes time to clear"
      },
      {
        "aspect": "Security",
        "a": "Less secure if lost or stolen",
        "b": "More secure, can be stopped"
      },
      {
        "aspect": "Record",
        "a": "No written record",
        "b": "Maintains written record"
      }
    ],
    "keyPoints": [
      "Cash is physical currency for immediate payment",
      "A cheque is a written instruction to a bank to transfer money",
      "Cash transactions are instant while cheques take time to clear",
      "Cheques provide a record of transaction while cash does not"
    ],
    "faqs": [
      {
        "q": "What happens when you present a cheque to a bank?",
        "a": "The bank verifies the signature and account balance, then transfers the amount from the payer's account to the recipient's account."
      },
      {
        "q": "Is cash safer than cheques?",
        "a": "Cheques are safer because they can be stopped if lost or stolen, while cash once lost cannot be recovered."
      },
      {
        "q": "How long does a cheque take to clear?",
        "a": "Cheques typically take 3-7 working days to clear, depending on the banks involved."
      }
    ]
  },
  {
    "slug": "wholesaler-and-retailer",
    "title": "Difference Between Wholesaler and Retailer",
    "termA": "Wholesaler",
    "termB": "Retailer",
    "category": "Economics",
    "classLevel": "6-8",
    "intro": "A wholesaler buys goods in bulk from manufacturers and sells them in large quantities to retailers. A retailer buys goods from wholesalers and sells them in small quantities to consumers.",
    "table": [
      {
        "aspect": "Buying Quantity",
        "a": "Buys in very large quantities",
        "b": "Buys in smaller quantities"
      },
      {
        "aspect": "Selling to",
        "a": "Sells to retailers and businesses",
        "b": "Sells to individual consumers"
      },
      {
        "aspect": "Profit Margin",
        "a": "Lower profit per unit",
        "b": "Higher profit per unit"
      },
      {
        "aspect": "Selling Quantity",
        "a": "Sells in bulk lots",
        "b": "Sells in small quantities"
      },
      {
        "aspect": "Examples",
        "a": "Suppliers, distributors, warehouses",
        "b": "Shops, malls, grocery stores"
      }
    ],
    "keyPoints": [
      "Wholesalers buy in bulk and sell to retailers and businesses",
      "Retailers buy from wholesalers and sell to consumers",
      "Wholesalers have lower profit margins but higher volumes",
      "Retailers have higher profit margins on individual items"
    ],
    "faqs": [
      {
        "q": "Why do retailers buy from wholesalers instead of directly from manufacturers?",
        "a": "Because wholesalers provide convenient distribution, bulk quantities, and specialized handling, while retailers need smaller quantities for their shops."
      },
      {
        "q": "Can consumers buy from wholesalers?",
        "a": "Some wholesalers sell to consumers in bulk, but typically they focus on business-to-business sales."
      },
      {
        "q": "What is the advantage of buying wholesale?",
        "a": "Buying wholesale offers lower per-unit prices due to bulk quantities, though larger upfront investment is required."
      }
    ]
  },
  {
    "slug": "goods-and-services",
    "title": "Difference Between Goods and Services",
    "termA": "Goods",
    "termB": "Services",
    "category": "Economics",
    "classLevel": "6-8",
    "intro": "Goods are physical products that can be touched, stored, and transferred. Services are intangible activities provided to meet customer needs.",
    "table": [
      {
        "aspect": "Nature",
        "a": "Tangible and physical",
        "b": "Intangible and non-physical"
      },
      {
        "aspect": "Storage",
        "a": "Can be stored for later sale",
        "b": "Cannot be stored, consumed immediately"
      },
      {
        "aspect": "Ownership Transfer",
        "a": "Ownership transfers to buyer",
        "b": "Only use is transferred, not ownership"
      },
      {
        "aspect": "Examples",
        "a": "Clothes, food, furniture, books",
        "b": "Haircuts, teaching, medical care, repairs"
      },
      {
        "aspect": "Quality Check",
        "a": "Can be checked before purchase",
        "b": "Quality known only after service"
      }
    ],
    "keyPoints": [
      "Goods are physical products that can be bought and sold",
      "Services are intangible activities provided for a fee",
      "Goods can be stored and resold while services cannot",
      "Both goods and services are essential for a modern economy"
    ],
    "faqs": [
      {
        "q": "What are examples of goods?",
        "a": "Examples include food, clothing, books, furniture, electronics, and vehicles."
      },
      {
        "q": "What are examples of services?",
        "a": "Examples include education, healthcare, haircuts, transportation, repairs, and entertainment."
      },
      {
        "q": "Can something be both goods and services?",
        "a": "Yes, for example a restaurant provides both food (goods) and dining experience (service)."
      }
    ]
  },
  {
    "slug": "needs-and-wants",
    "title": "Difference Between Needs and Wants",
    "termA": "Needs",
    "termB": "Wants",
    "category": "Economics",
    "classLevel": "5-7",
    "intro": "Needs are basic requirements essential for survival and well-being. Wants are desires for goods and services beyond basic needs.",
    "table": [
      {
        "aspect": "Importance",
        "a": "Essential for survival",
        "b": "Desired but not essential"
      },
      {
        "aspect": "Examples",
        "a": "Food, water, shelter, clothing",
        "b": "Toys, luxury items, vacations"
      },
      {
        "aspect": "Priority",
        "a": "High priority spending",
        "b": "Lower priority, discretionary spending"
      },
      {
        "aspect": "Budget Allocation",
        "a": "Should be met first",
        "b": "Met after needs are satisfied"
      },
      {
        "aspect": "Satisfaction",
        "a": "Same regardless of product brand",
        "b": "Varies by preference and brand"
      }
    ],
    "keyPoints": [
      "Needs are essential requirements for basic survival and health",
      "Wants are desires for additional goods beyond necessities",
      "Needs should be prioritized in budget planning",
      "Understanding the difference helps in effective financial management"
    ],
    "faqs": [
      {
        "q": "What are basic human needs?",
        "a": "Basic needs include food, water, shelter, clothing, and healthcare."
      },
      {
        "q": "Is education a need or want?",
        "a": "Education is typically considered a need as it is essential for development and future opportunities."
      },
      {
        "q": "How do you distinguish between needs and wants in budgeting?",
        "a": "List all expenses and classify them as needs or wants. Allocate budget to needs first, then use remaining money for wants."
      }
    ]
  },
  {
    "slug": "public-and-private-sector",
    "title": "Difference Between Public and Private Sector",
    "termA": "Public Sector",
    "termB": "Private Sector",
    "category": "Economics",
    "classLevel": "8-10",
    "intro": "The public sector is owned and operated by the government to provide services to all citizens. The private sector is owned by individuals or private companies to generate profit.",
    "table": [
      {
        "aspect": "Ownership",
        "a": "Owned and run by government",
        "b": "Owned by private individuals/companies"
      },
      {
        "aspect": "Primary Goal",
        "a": "Provide public services and welfare",
        "b": "Generate profit"
      },
      {
        "aspect": "Services",
        "a": "Education, healthcare, police, roads",
        "b": "Retail, restaurants, manufacturing"
      },
      {
        "aspect": "Employment",
        "a": "Government employees",
        "b": "Private employees"
      },
      {
        "aspect": "Access",
        "a": "Available to all citizens",
        "b": "Selective based on ability to pay"
      }
    ],
    "keyPoints": [
      "Public sector is government-owned and provides essential services to society",
      "Private sector is privately-owned and operates for profit",
      "Public sector prioritizes public welfare while private sector prioritizes efficiency and profit",
      "Both sectors are necessary for a balanced economy"
    ],
    "faqs": [
      {
        "q": "What are examples of public sector services?",
        "a": "Examples include government schools, public hospitals, police, fire services, postal services, and public transportation."
      },
      {
        "q": "What are examples of private sector companies?",
        "a": "Examples include retail shops, restaurants, manufacturing companies, banks, and IT companies."
      },
      {
        "q": "Why do we need both public and private sectors?",
        "a": "Public sector ensures basic services reach everyone regardless of income, while private sector drives innovation and economic growth."
      }
    ]
  },
  {
    "slug": "developed-and-developing-country",
    "title": "Difference Between Developed and Developing Country",
    "termA": "Developed Country",
    "termB": "Developing Country",
    "category": "Social Science",
    "classLevel": "8-10",
    "intro": "A developed country has high income, advanced technology, and strong infrastructure. A developing country has lower income, emerging technology, and infrastructure being built.",
    "table": [
      {
        "aspect": "Income Level",
        "a": "High per capita income",
        "b": "Lower per capita income"
      },
      {
        "aspect": "Technology",
        "a": "Advanced and widespread",
        "b": "Emerging and limited access"
      },
      {
        "aspect": "Infrastructure",
        "a": "Well-developed and maintained",
        "b": "Under development"
      },
      {
        "aspect": "Examples",
        "a": "USA, Germany, Japan, Canada",
        "b": "India, Brazil, Indonesia, Egypt"
      },
      {
        "aspect": "Healthcare",
        "a": "Advanced medical facilities",
        "b": "Growing healthcare infrastructure"
      }
    ],
    "keyPoints": [
      "Developed countries have high income, advanced technology, and strong infrastructure",
      "Developing countries have lower income and are working to build infrastructure",
      "The difference is based on GDP, technology, education, and living standards",
      "Many countries are transitioning from developing to developed status"
    ],
    "faqs": [
      {
        "q": "What makes a country developed?",
        "a": "High per capita income, advanced technology, strong infrastructure, quality education, and healthcare are indicators of a developed country."
      },
      {
        "q": "Is India a developed or developing country?",
        "a": "India is classified as a developing country as it has lower per capita income, though it is rapidly advancing in technology and infrastructure."
      },
      {
        "q": "Can a developing country become developed?",
        "a": "Yes, countries like Singapore and South Korea transformed from developing to developed through education, technology investment, and economic growth."
      }
    ]
  },
  {
    "slug": "birth-rate-and-growth-rate",
    "title": "Difference Between Birth Rate and Growth Rate",
    "termA": "Birth Rate",
    "termB": "Growth Rate",
    "category": "Social Science",
    "classLevel": "8-10",
    "intro": "Birth rate is the number of births per 1000 people in a year. Growth rate is the overall change in population considering births, deaths, and migration.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Number of births per 1000 people yearly",
        "b": "Total population change per year"
      },
      {
        "aspect": "Calculation",
        "a": "Total births / Total population x 1000",
        "b": "(Births - Deaths + Migration) / Population"
      },
      {
        "aspect": "Factors",
        "a": "Only considers births",
        "b": "Considers births, deaths, and migration"
      },
      {
        "aspect": "Impact",
        "a": "Affects population increase",
        "b": "Determines actual population change"
      },
      {
        "aspect": "Example",
        "a": "35 births per 1000 people = Birth rate of 35",
        "b": "Population growth of 2% per year"
      }
    ],
    "keyPoints": [
      "Birth rate measures only the number of births per 1000 people",
      "Growth rate measures total population change including deaths and migration",
      "Birth rate is a component of growth rate",
      "Growth rate is a more complete measure of population change"
    ],
    "faqs": [
      {
        "q": "What is Indias current birth rate?",
        "a": "India's birth rate is approximately 17-18 births per 1000 people, which has declined significantly over decades."
      },
      {
        "q": "Can a country have high birth rate but low growth rate?",
        "a": "Yes, if the death rate is also high or if there is significant emigration, birth rate can be high while growth rate remains low."
      },
      {
        "q": "Why does birth rate affect population policies?",
        "a": "High birth rates lead to faster population growth, which governments address through education and healthcare policies."
      }
    ]
  },
  {
    "slug": "equator-and-prime-meridian",
    "title": "Difference Between Equator and Prime Meridian",
    "termA": "Equator",
    "termB": "Prime Meridian",
    "category": "Geography",
    "classLevel": "6-8",
    "intro": "The equator is an imaginary line that divides Earth horizontally into Northern and Southern hemispheres. The Prime Meridian divides Earth vertically into Eastern and Western hemispheres.",
    "table": [
      {
        "aspect": "Direction",
        "a": "Runs East-West around Earth",
        "b": "Runs North-South pole to pole"
      },
      {
        "aspect": "Hemispheres",
        "a": "Divides North and South hemispheres",
        "b": "Divides East and West hemispheres"
      },
      {
        "aspect": "Latitude/Longitude",
        "a": "At 0° latitude",
        "b": "At 0° longitude"
      },
      {
        "aspect": "Length",
        "a": "Longest parallel around Earth",
        "b": "One of 360 meridians"
      },
      {
        "aspect": "Location",
        "a": "Equidistant from both poles",
        "b": "Passes through Greenwich, London"
      }
    ],
    "keyPoints": [
      "The equator is a horizontal line dividing Earth into North and South",
      "The Prime Meridian is a vertical line dividing Earth into East and West",
      "Both are imaginary reference lines used for location mapping",
      "Together they form the basis of the geographic coordinate system"
    ],
    "faqs": [
      {
        "q": "What countries does the equator pass through?",
        "a": "The equator passes through Ecuador, Brazil, Democratic Republic of Congo, Kenya, and Indonesia among others."
      },
      {
        "q": "Why is the Prime Meridian at Greenwich?",
        "a": "Greenwich was chosen as the Prime Meridian at the 1884 International Meridian Conference as a neutral location for standardization."
      },
      {
        "q": "Is the equator visible from space?",
        "a": "No, the equator is an imaginary line, but its effects are visible such as differences in weather and vegetation."
      }
    ]
  },
  {
    "slug": "map-and-plan",
    "title": "Difference Between Map and Plan",
    "termA": "Map",
    "termB": "Plan",
    "category": "Geography",
    "classLevel": "7-9",
    "intro": "A map is a small-scale representation of a large area of Earth's surface. A plan is a large-scale representation of a small area like a building or city block.",
    "table": [
      {
        "aspect": "Scale",
        "a": "Small scale (1:50000 or smaller)",
        "b": "Large scale (1:500 or larger)"
      },
      {
        "aspect": "Area Covered",
        "a": "Large areas: countries, continents",
        "b": "Small areas: buildings, plots"
      },
      {
        "aspect": "Detail",
        "a": "Less detailed overview",
        "b": "More detailed and precise"
      },
      {
        "aspect": "Uses",
        "a": "Navigation, geography study",
        "b": "Architecture, construction, surveys"
      },
      {
        "aspect": "View",
        "a": "Bird's eye oblique view",
        "b": "Top-down view from directly above"
      }
    ],
    "keyPoints": [
      "Maps represent large areas at small scale",
      "Plans represent small areas at large scale with more detail",
      "Maps show geographic features while plans show architectural/construction details",
      "Both use scales to represent actual distances"
    ],
    "faqs": [
      {
        "q": "What is an example of a map?",
        "a": "Political map of India, world map, or road map showing countries and cities."
      },
      {
        "q": "What is an example of a plan?",
        "a": "Floor plan of a house, city plan showing streets and buildings, or site plan of a property."
      },
      {
        "q": "Why are plans more detailed than maps?",
        "a": "Plans use larger scales which allow showing small features precisely, while maps use smaller scales and show only major features."
      }
    ]
  },
  {
    "slug": "physical-and-political-map",
    "title": "Difference Between Physical and Political Map",
    "termA": "Physical Map",
    "termB": "Political Map",
    "category": "Geography",
    "classLevel": "6-8",
    "intro": "A physical map shows natural features like mountains, rivers, and forests. A political map shows countries, states, cities, and political boundaries.",
    "table": [
      {
        "aspect": "Features Shown",
        "a": "Natural features: mountains, rivers, plateaus",
        "b": "Political boundaries: countries, states, cities"
      },
      {
        "aspect": "Purpose",
        "a": "Understand terrain and geography",
        "b": "Understand political divisions"
      },
      {
        "aspect": "Colors",
        "a": "Browns, greens, blues for terrain",
        "b": "Different colors for different regions"
      },
      {
        "aspect": "Content",
        "a": "Elevation, landforms, water bodies",
        "b": "Capitals, borders, populated areas"
      },
      {
        "aspect": "Changes",
        "a": "Remain relatively unchanged",
        "b": "Change when political boundaries change"
      }
    ],
    "keyPoints": [
      "Physical maps display natural geographical features",
      "Political maps display human-made political divisions",
      "Physical features are relatively permanent while political boundaries change",
      "Both types are essential for complete geographic understanding"
    ],
    "faqs": [
      {
        "q": "What does a physical map of India show?",
        "a": "Mountains (Himalayas, Western Ghats), rivers (Ganges, Brahmaputra), plateaus, and coastal features."
      },
      {
        "q": "What does a political map of India show?",
        "a": "States and union territories, capitals, major cities, and political boundaries between regions."
      },
      {
        "q": "Why do we need both types of maps?",
        "a": "Physical maps help understand climate and resources while political maps help understand governance and administration."
      }
    ]
  },
  {
    "slug": "igneous-and-metamorphic-rock",
    "title": "Difference Between Igneous and Metamorphic Rock",
    "termA": "Igneous Rock",
    "termB": "Metamorphic Rock",
    "category": "Science",
    "classLevel": "7-9",
    "intro": "Igneous rock forms from cooling and solidification of magma or lava. Metamorphic rock forms when existing rock is changed by heat, pressure, and chemical processes.",
    "table": [
      {
        "aspect": "Formation",
        "a": "Cooling of magma or lava",
        "b": "Change of existing rock by heat and pressure"
      },
      {
        "aspect": "Temperature",
        "a": "Very high, molten origin",
        "b": "High pressure and temperature, below melting"
      },
      {
        "aspect": "Crystal Size",
        "a": "Depends on cooling rate: large or small",
        "b": "Interlocking crystals from recrystallization"
      },
      {
        "aspect": "Examples",
        "a": "Granite, basalt, obsidian",
        "b": "Marble, slate, schist"
      },
      {
        "aspect": "Parent Rock",
        "a": "None, forms from magma",
        "b": "Any existing rock can be metamorphosed"
      }
    ],
    "keyPoints": [
      "Igneous rocks form from cooling magma or lava",
      "Metamorphic rocks form from existing rocks changed by heat and pressure",
      "Igneous rocks cool from a molten state while metamorphic rocks form in solid state",
      "Both are important parts of the rock cycle"
    ],
    "faqs": [
      {
        "q": "What is the difference between intrusive and extrusive igneous rocks?",
        "a": "Intrusive igneous rocks cool slowly underground forming large crystals like granite, while extrusive rocks cool quickly on the surface forming small crystals like basalt."
      },
      {
        "q": "Can igneous rock become metamorphic rock?",
        "a": "Yes, igneous rocks can be buried deep and subjected to heat and pressure to become metamorphic rocks."
      },
      {
        "q": "What is marble made from?",
        "a": "Marble is metamorphic rock formed when limestone (sedimentary rock) is subjected to heat and pressure."
      }
    ]
  },
  {
    "slug": "metamorphic-and-sedimentary-rock",
    "title": "Difference Between Metamorphic and Sedimentary Rock",
    "termA": "Metamorphic Rock",
    "termB": "Sedimentary Rock",
    "category": "Science",
    "classLevel": "7-9",
    "intro": "Metamorphic rock forms when existing rock is changed by heat and pressure deep in the Earth. Sedimentary rock forms from the compaction and cementation of sediment particles.",
    "table": [
      {
        "aspect": "Formation Process",
        "a": "Heat, pressure, and chemical change",
        "b": "Compaction and cementation of sediments"
      },
      {
        "aspect": "Location of Formation",
        "a": "Deep within Earth's crust",
        "b": "At or near Earth's surface"
      },
      {
        "aspect": "Parent Material",
        "a": "Any existing rock type",
        "b": "Weathered rock fragments"
      },
      {
        "aspect": "Examples",
        "a": "Marble, slate, gneiss",
        "b": "Sandstone, limestone, shale"
      },
      {
        "aspect": "Mineral Arrangement",
        "a": "Interlocking crystals from recrystallization",
        "b": "Visible layers and grain patterns"
      }
    ],
    "keyPoints": [
      "Metamorphic rocks form from existing rocks under extreme heat and pressure",
      "Sedimentary rocks form from compaction and cementation of sediment",
      "Metamorphic rocks form deep underground while sedimentary rocks form near the surface",
      "Both are part of the continuous rock cycle"
    ],
    "faqs": [
      {
        "q": "Can sedimentary rock become metamorphic rock?",
        "a": "Yes, sedimentary rocks buried deep underground and subjected to heat and pressure become metamorphic rocks."
      },
      {
        "q": "Why do sedimentary rocks have visible layers?",
        "a": "Because they form from the compression of sediment layers over time, preserving the layered structure."
      },
      {
        "q": "What is slate used for?",
        "a": "Slate, a metamorphic rock, is used for roofing tiles and writing boards because it splits easily into thin sheets."
      }
    ]
  },
  {
    "slug": "lake-and-pond",
    "title": "Difference Between Lake and Pond",
    "termA": "Lake",
    "termB": "Pond",
    "category": "Geography",
    "classLevel": "6-8",
    "intro": "A lake is a large body of freshwater surrounded by land. A pond is a small body of freshwater, smaller than a lake.",
    "table": [
      {
        "aspect": "Size",
        "a": "Large water body",
        "b": "Small water body"
      },
      {
        "aspect": "Depth",
        "a": "Deeper, can reach several meters",
        "b": "Shallow, usually less than a few meters"
      },
      {
        "aspect": "Sunlight Penetration",
        "a": "Does not reach the bottom in all areas",
        "b": "Sunlight can penetrate to the bottom"
      },
      {
        "aspect": "Examples",
        "a": "Lake Baikal, Lake Superior, Dal Lake",
        "b": "Garden ponds, farm ponds"
      },
      {
        "aspect": "Marine Life",
        "a": "Supports diverse aquatic life",
        "b": "Supports limited aquatic life"
      }
    ],
    "keyPoints": [
      "A lake is a large body of freshwater surrounded by land",
      "A pond is a small body of freshwater",
      "Lakes are typically deeper while ponds are shallow",
      "Both are freshwater bodies but differ significantly in size and depth"
    ],
    "faqs": [
      {
        "q": "How deep is the average pond?",
        "a": "Most ponds are less than 3 meters deep, allowing sunlight to reach the bottom."
      },
      {
        "q": "Can a pond become a lake?",
        "a": "Yes, if a pond expands through water accumulation over time, it can eventually become a lake."
      },
      {
        "q": "What is the importance of ponds?",
        "a": "Ponds provide habitat for small aquatic and terrestrial animals, support biodiversity, and help with water drainage."
      }
    ]
  },
  {
    "slug": "sea-and-ocean",
    "title": "Difference Between Sea and Ocean",
    "termA": "Sea",
    "termB": "Ocean",
    "category": "Geography",
    "classLevel": "6-8",
    "intro": "A sea is a large body of saltwater connected to or surrounded by land. An ocean is the largest saltwater body covering vast areas of the planet.",
    "table": [
      {
        "aspect": "Size",
        "a": "Smaller saltwater body",
        "b": "Largest saltwater body"
      },
      {
        "aspect": "Area",
        "a": "Surrounded by or connected to land",
        "b": "Covers major portion of Earth"
      },
      {
        "aspect": "Examples",
        "a": "Mediterranean Sea, Arabian Sea, Red Sea",
        "b": "Pacific Ocean, Atlantic Ocean, Indian Ocean"
      },
      {
        "aspect": "Number",
        "a": "Many seas around the world",
        "b": "Five major oceans"
      },
      {
        "aspect": "Depth",
        "a": "Generally shallower than oceans",
        "b": "Deeper, average 4000 meters"
      }
    ],
    "keyPoints": [
      "Seas are smaller saltwater bodies connected to land",
      "Oceans are the largest saltwater bodies covering Earth",
      "Seas are usually partially enclosed while oceans are vast",
      "Both contain saltwater and support diverse marine life"
    ],
    "faqs": [
      {
        "q": "How many oceans are there?",
        "a": "There are five major oceans: Pacific, Atlantic, Indian, Arctic, and Southern (Antarctic)."
      },
      {
        "q": "What is the Arabian Sea?",
        "a": "The Arabian Sea is a sea located between India and the Arabian Peninsula, connected to the Indian Ocean."
      },
      {
        "q": "Why are oceans larger than seas?",
        "a": "Oceans formed from the primary saltwater bodies on Earth, while seas are extensions or portions connected to oceans."
      }
    ]
  },
  {
    "slug": "river-and-tributary",
    "title": "Difference Between River and Tributary",
    "termA": "River",
    "termB": "Tributary",
    "category": "Geography",
    "classLevel": "6-8",
    "intro": "A river is a large, natural flowing body of water that flows toward an ocean or lake. A tributary is a smaller river or stream that flows into a larger river.",
    "table": [
      {
        "aspect": "Size",
        "a": "Large flowing water body",
        "b": "Smaller stream flowing into a river"
      },
      {
        "aspect": "Role",
        "a": "Main water course",
        "b": "Feeds water into a larger river"
      },
      {
        "aspect": "Destination",
        "a": "Flows to ocean or lake",
        "b": "Flows into another river"
      },
      {
        "aspect": "Examples",
        "a": "Ganges, Brahmaputra, Indus",
        "b": "Yamuna (tributary of Ganges), Sutlej (tributary of Indus)"
      },
      {
        "aspect": "Independence",
        "a": "Independent water body",
        "b": "Dependent on the main river"
      }
    ],
    "keyPoints": [
      "A river is a major flowing water body with its own independent course",
      "A tributary is a smaller stream that joins a larger river",
      "Multiple tributaries combine to form a river system",
      "The Ganges and Brahmaputra are rivers with many tributaries in India"
    ],
    "faqs": [
      {
        "q": "Is the Yamuna a river or a tributary?",
        "a": "The Yamuna is both - it is a river in its own right but also a tributary of the Ganges River."
      },
      {
        "q": "How do tributaries help a river?",
        "a": "Tributaries add water to the main river, increasing its volume and flow, especially during monsoon season."
      },
      {
        "q": "What is a river system?",
        "a": "A river system is a main river along with all its tributaries combined together forming a network."
      }
    ]
  },
  {
    "slug": "dam-and-reservoir",
    "title": "Difference Between Dam and Reservoir",
    "termA": "Dam",
    "termB": "Reservoir",
    "category": "Geography",
    "classLevel": "7-9",
    "intro": "A dam is a barrier constructed across a river to hold back water. A reservoir is the artificial lake formed behind a dam where water is stored.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Structure that blocks water flow",
        "b": "Water body formed behind the dam"
      },
      {
        "aspect": "Purpose",
        "a": "Control water flow and storage",
        "b": "Store water for various uses"
      },
      {
        "aspect": "Formation",
        "a": "Built by humans across rivers",
        "b": "Forms naturally or artificially behind dam"
      },
      {
        "aspect": "Uses",
        "a": "Water storage, irrigation, power generation",
        "b": "Water supply, recreation, fishing"
      },
      {
        "aspect": "Examples",
        "a": "Bhakra Dam, Aswan Dam",
        "b": "Lake behind Bhakra Dam"
      }
    ],
    "keyPoints": [
      "A dam is the physical structure built to block water flow",
      "A reservoir is the water body created behind the dam",
      "Without a dam, a reservoir cannot form",
      "Dams provide water storage, irrigation, and hydroelectric power"
    ],
    "faqs": [
      {
        "q": "What is the biggest dam in India?",
        "a": "Hirakud Dam in Odisha is the largest dam in India in terms of reservoir area."
      },
      {
        "q": "Why are reservoirs important?",
        "a": "Reservoirs store water for irrigation, drinking water supply, hydroelectric power generation, and help manage floods."
      },
      {
        "q": "What happens to a dam during heavy rainfall?",
        "a": "During heavy rainfall, water flows into the reservoir. The dam controls the release to prevent flooding downstream."
      }
    ]
  },
  {
    "slug": "cyclone-and-anticyclone",
    "title": "Difference Between Cyclone and Anticyclone",
    "termA": "Cyclone",
    "termB": "Anticyclone",
    "category": "Science",
    "classLevel": "8-10",
    "intro": "A cyclone is a weather system with low atmospheric pressure causing winds to spiral inward. An anticyclone is a weather system with high atmospheric pressure causing winds to spiral outward.",
    "table": [
      {
        "aspect": "Pressure",
        "a": "Low atmospheric pressure at center",
        "b": "High atmospheric pressure at center"
      },
      {
        "aspect": "Wind Pattern",
        "a": "Wind spirals inward toward center",
        "b": "Wind spirals outward from center"
      },
      {
        "aspect": "Rotation Direction",
        "a": "Counterclockwise in Northern Hemisphere",
        "b": "Clockwise in Northern Hemisphere"
      },
      {
        "aspect": "Weather",
        "a": "Brings rain, storms, and disturbance",
        "b": "Brings clear weather and fair conditions"
      },
      {
        "aspect": "Intensity",
        "a": "Can be severe and dangerous",
        "b": "Generally mild and stable"
      }
    ],
    "keyPoints": [
      "A cyclone has low pressure causing inward spiraling winds",
      "An anticyclone has high pressure causing outward spiraling winds",
      "Cyclones bring stormy weather while anticyclones bring fair weather",
      "Both influence weather patterns across regions"
    ],
    "faqs": [
      {
        "q": "Is a cyclone the same as a hurricane?",
        "a": "Cyclones and hurricanes are tropical storms with strong winds. The term varies by region: cyclone in Indian Ocean, hurricane in Atlantic."
      },
      {
        "q": "Why does cyclone bring heavy rain?",
        "a": "Low pressure in a cyclone causes air to rise, cool, and condense, leading to cloud formation and heavy rainfall."
      },
      {
        "q": "How does an anticyclone bring clear weather?",
        "a": "High pressure in an anticyclone causes air to sink, which prevents cloud formation and brings clear, dry weather."
      }
    ]
  },
  {
    "slug": "manure-and-fertilizer",
    "title": "Difference Between Manure and Fertilizer",
    "termA": "Manure",
    "termB": "Fertilizer",
    "category": "Science",
    "classLevel": "6-8",
    "intro": "Manure is organic matter from animal waste used to improve soil fertility. Fertilizer is a chemical or organic substance containing nutrients for plant growth.",
    "table": [
      {
        "aspect": "Origin",
        "a": "Animal waste: cow dung, poultry waste",
        "b": "Chemical compounds or processed materials"
      },
      {
        "aspect": "Type",
        "a": "Organic material",
        "b": "Can be organic or inorganic"
      },
      {
        "aspect": "Nutrient Content",
        "a": "Lower nutrient concentration",
        "b": "Higher nutrient concentration"
      },
      {
        "aspect": "Soil Improvement",
        "a": "Improves soil structure and texture",
        "b": "Directly provides plant nutrients"
      },
      {
        "aspect": "Cost",
        "a": "Cheaper and readily available",
        "b": "More expensive"
      }
    ],
    "keyPoints": [
      "Manure is organic material from animal waste",
      "Fertilizer is a concentrated nutrient product for plants",
      "Manure improves soil structure while fertilizer provides nutrients",
      "Both are essential for modern agriculture"
    ],
    "faqs": [
      {
        "q": "Why is manure beneficial for soil?",
        "a": "Manure adds organic matter that improves soil structure, increases water retention, and promotes microbial activity."
      },
      {
        "q": "What are the main nutrients in fertilizers?",
        "a": "The main nutrients are nitrogen (N), phosphorus (P), and potassium (K), represented as NPK ratio."
      },
      {
        "q": "Can fertilizer replace manure?",
        "a": "No, fertilizers provide nutrients while manure provides both nutrients and soil improvement. Using both together is ideal."
      }
    ]
  },
  {
    "slug": "kharif-and-rabi-crops",
    "title": "Difference Between Kharif and Rabi Crops",
    "termA": "Kharif Crops",
    "termB": "Rabi Crops",
    "category": "Social Science",
    "classLevel": "6-8",
    "intro": "Kharif crops are monsoon crops planted in June-July and harvested in September-October. Rabi crops are winter crops planted in October-November and harvested in March-April.",
    "table": [
      {
        "aspect": "Season",
        "a": "Monsoon season (June-July)",
        "b": "Winter season (October-November)"
      },
      {
        "aspect": "Water Requirement",
        "a": "High rainfall, needs less irrigation",
        "b": "Low rainfall, needs irrigation"
      },
      {
        "aspect": "Harvest Time",
        "a": "September-October",
        "b": "March-April"
      },
      {
        "aspect": "Examples",
        "a": "Rice, cotton, maize, sugarcane",
        "b": "Wheat, barley, gram, mustard"
      },
      {
        "aspect": "Growing Period",
        "a": "3-4 months",
        "b": "5-6 months"
      }
    ],
    "keyPoints": [
      "Kharif crops are monsoon crops planted in rainy season",
      "Rabi crops are winter crops planted in cool season",
      "Kharif crops rely on rainfall while rabi crops need irrigation",
      "India grows both for food security and farmer income"
    ],
    "faqs": [
      {
        "q": "What is the main kharif crop in India?",
        "a": "Rice is the main kharif crop, followed by cotton and maize, covering most of India's agricultural land."
      },
      {
        "q": "What is the main rabi crop in India?",
        "a": "Wheat is the main rabi crop, produced extensively in northern India, particularly in Punjab and Haryana."
      },
      {
        "q": "Why does rabi need more irrigation than kharif?",
        "a": "Rabi crops are grown in winter when rainfall is low, so they depend on irrigation from groundwater and canals."
      }
    ]
  },
  {
    "slug": "arteries-and-veins",
    "title": "Difference Between Arteries and Veins",
    "termA": "Arteries",
    "termB": "Veins",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Arteries and veins are blood vessels that transport blood throughout the body but differ in structure and function. Arteries carry blood away from the heart under high pressure, while veins carry blood back to the heart under low pressure.",
    "table": [
      {
        "aspect": "Direction of Flow",
        "a": "Away from heart",
        "b": "Toward heart"
      },
      {
        "aspect": "Blood Pressure",
        "a": "High pressure",
        "b": "Low pressure"
      },
      {
        "aspect": "Walls",
        "a": "Thick and elastic muscular walls",
        "b": "Thin and less elastic walls"
      },
      {
        "aspect": "Blood Oxygen",
        "a": "Oxygen-rich (except pulmonary artery)",
        "b": "Oxygen-poor (except pulmonary vein)"
      },
      {
        "aspect": "Valves",
        "a": "No valves present",
        "b": "Valves present to prevent backflow"
      },
      {
        "aspect": "Color",
        "a": "Bright red (usually)",
        "b": "Dark red or dark blue"
      },
      {
        "aspect": "Pulse",
        "a": "Pulse is felt",
        "b": "No pulse felt"
      }
    ],
    "keyPoints": [
      "Arteries have thicker walls to withstand high pressure from heart contractions",
      "Veins have valves to prevent backflow of blood since pressure is low",
      "Arteries are deeper in body; veins are closer to skin surface",
      "Pulmonary artery carries deoxygenated blood while pulmonary vein carries oxygenated blood"
    ],
    "faqs": [
      {
        "q": "Why do arteries have thicker walls than veins?",
        "a": "Arteries receive blood directly from the heart at high pressure, so they need strong elastic walls to withstand this pressure and maintain circulation."
      },
      {
        "q": "Why do veins have valves but arteries do not?",
        "a": "The high pressure in arteries keeps blood moving forward, but veins have low pressure so valves prevent blood from flowing backward."
      },
      {
        "q": "Why is arterial blood red and venous blood blue?",
        "a": "Arterial blood appears bright red due to oxygen, while venous blood appears darker because it has less oxygen. Veins appear blue due to light absorption through skin."
      }
    ]
  },
  {
    "slug": "red-blood-cells-and-white-blood-cells",
    "title": "Difference Between Red Blood Cells and White Blood Cells",
    "termA": "Red Blood Cells",
    "termB": "White Blood Cells",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Red and white blood cells are two major types of cells in blood with distinct functions. Red blood cells transport oxygen throughout the body, while white blood cells defend the body against infections and pathogens.",
    "table": [
      {
        "aspect": "Main Function",
        "a": "Carry oxygen to tissues",
        "b": "Defend against infections"
      },
      {
        "aspect": "Nucleus",
        "a": "No nucleus (in mammals)",
        "b": "Contains nucleus"
      },
      {
        "aspect": "Lifespan",
        "a": "About 120 days",
        "b": "From few days to years"
      },
      {
        "aspect": "Number",
        "a": "Most abundant (4.5-5.5 million per microliter)",
        "b": "Less abundant (4000-11000 per microliter)"
      },
      {
        "aspect": "Color",
        "a": "Red due to hemoglobin",
        "b": "Colorless or white"
      },
      {
        "aspect": "Movement",
        "a": "Passive movement with blood flow",
        "b": "Can move independently (amoeboid)"
      },
      {
        "aspect": "Size",
        "a": "Smaller (7-8 micrometers)",
        "b": "Larger (10-20 micrometers)"
      }
    ],
    "keyPoints": [
      "RBCs contain hemoglobin which binds oxygen; WBCs contain enzymes to fight bacteria",
      "RBCs lack nucleus so more space for oxygen; WBCs have nucleus for cell division",
      "RBCs are produced in bone marrow continuously; WBCs increase during infections",
      "RBCs have fixed shape (biconcave disc); WBCs have irregular shape and move freely"
    ],
    "faqs": [
      {
        "q": "Why do red blood cells not have a nucleus?",
        "a": "The absence of nucleus allows more space in RBCs for hemoglobin molecules to carry more oxygen for body tissues."
      },
      {
        "q": "How do white blood cells fight infections?",
        "a": "WBCs can engulf and destroy bacteria and pathogens through phagocytosis, and produce antibodies to fight infections."
      },
      {
        "q": "What causes a low count of white blood cells?",
        "a": "Low WBC count can result from bone marrow disorders, certain medications, infections, or diseases like HIV that affect immune system."
      }
    ]
  },
  {
    "slug": "pollen-and-ovule",
    "title": "Difference Between Pollen and Ovule",
    "termA": "Pollen",
    "termB": "Ovule",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Pollen and ovules are the male and female reproductive structures in flowers. Pollen grains contain the male gametes (sperm cells), while ovules contain the female gamete (egg cell) and develop into seeds after fertilization.",
    "table": [
      {
        "aspect": "Reproductive Role",
        "a": "Male reproductive structure",
        "b": "Female reproductive structure"
      },
      {
        "aspect": "Location",
        "a": "Produced in anther",
        "b": "Found in ovary"
      },
      {
        "aspect": "Number",
        "a": "Produced in very large quantities",
        "b": "Limited number per flower"
      },
      {
        "aspect": "Gamete Type",
        "a": "Contains male gamete (sperm)",
        "b": "Contains female gamete (egg)"
      },
      {
        "aspect": "Develops Into",
        "a": "Does not develop; transfers genes",
        "b": "Develops into seed"
      },
      {
        "aspect": "Structure",
        "a": "Small grain with protective wall",
        "b": "Complex structure with integuments"
      },
      {
        "aspect": "Dispersal",
        "a": "Dispersed by wind, insects, etc.",
        "b": "Remains in ovary until fertilization"
      }
    ],
    "keyPoints": [
      "Pollen is the male gametophyte; ovule is the female gametophyte",
      "One pollen grain can pollinate one ovule but plants produce millions of pollen",
      "Ovule wall becomes seed coat; ovule contents develop into embryo and endosperm",
      "Without pollen reaching the ovule, no seed development can occur"
    ],
    "faqs": [
      {
        "q": "Why are there more pollen grains than ovules in a flower?",
        "a": "Producing excess pollen ensures that despite losses during pollination, enough pollen reaches ovules for successful fertilization."
      },
      {
        "q": "What happens to the ovule after fertilization?",
        "a": "After fertilization, the ovule develops into a seed with an embryo and food reserves, while the ovary becomes a fruit."
      },
      {
        "q": "How many male and female gametes combine during fertilization?",
        "a": "One pollen grain releases two male gametes; one fuses with egg cell to form embryo, the other fuses with polar nuclei to form endosperm."
      }
    ]
  },
  {
    "slug": "bryophytes-and-pteridophytes",
    "title": "Difference Between Bryophytes and Pteridophytes",
    "termA": "Bryophytes",
    "termB": "Pteridophytes",
    "category": "Biology",
    "classLevel": "Class 11",
    "intro": "Bryophytes and pteridophytes are two groups of non-flowering plants that differ in structure and reproduction. Bryophytes lack true roots and vascular tissues, while pteridophytes have roots and vascular tissues for nutrient transport.",
    "table": [
      {
        "aspect": "Vascular Tissue",
        "a": "Absent",
        "b": "Present (xylem and phloem)"
      },
      {
        "aspect": "True Roots",
        "a": "Absent (have rhizoids)",
        "b": "Present"
      },
      {
        "aspect": "True Leaves",
        "a": "Simple leaf-like structures",
        "b": "Complex true leaves"
      },
      {
        "aspect": "True Stem",
        "a": "Absent or very simple",
        "b": "Present with conducting tissues"
      },
      {
        "aspect": "Dominant Generation",
        "a": "Gametophyte (haploid)",
        "b": "Sporophyte (diploid)"
      },
      {
        "aspect": "Spore Dispersal",
        "a": "Through water",
        "b": "Through wind in sori"
      },
      {
        "aspect": "Examples",
        "a": "Moss, liverwort",
        "b": "Fern, horsetail"
      }
    ],
    "keyPoints": [
      "Bryophytes are transitional plants between algae and vascular plants",
      "Pteridophytes have true roots, stem, and leaves for better adaptation to land",
      "Bryophytes require water for reproduction; pteridophytes are partially independent",
      "Pteridophytes dominated land before gymnosperms and angiosperms evolved"
    ],
    "faqs": [
      {
        "q": "Why are bryophytes limited to moist environments?",
        "a": "Without vascular tissues and true roots, bryophytes cannot transport water internally and must absorb moisture directly from environment."
      },
      {
        "q": "What are rhizoids and how do they differ from roots?",
        "a": "Rhizoids are hair-like structures for attachment and absorption but lack vascular tissue, while roots have vascular tissues for water and mineral transport."
      },
      {
        "q": "Why is the sporophyte dominant in pteridophytes but not bryophytes?",
        "a": "Pteridophytes evolved better mechanisms to support larger sporophytes with vascular tissues, making them more efficient in exploiting land habitat."
      }
    ]
  },
  {
    "slug": "gymnosperms-and-angiosperms",
    "title": "Difference Between Gymnosperms and Angiosperms",
    "termA": "Gymnosperms",
    "termB": "Angiosperms",
    "category": "Biology",
    "classLevel": "Class 11",
    "intro": "Gymnosperms and angiosperms are two groups of seed-bearing plants that differ in their reproductive structures. Gymnosperms have naked seeds not enclosed in fruit, while angiosperms have seeds enclosed within a fruit.",
    "table": [
      {
        "aspect": "Seed Protection",
        "a": "Naked seeds (no fruit coat)",
        "b": "Seeds enclosed in fruit"
      },
      {
        "aspect": "Flowers",
        "a": "No true flowers",
        "b": "True flowers present"
      },
      {
        "aspect": "Reproduction",
        "a": "Wind pollinated",
        "b": "Pollinated by insects, wind, water"
      },
      {
        "aspect": "Cotyledons",
        "a": "Usually two or more",
        "b": "One (monocot) or two (dicot)"
      },
      {
        "aspect": "Xylem Type",
        "a": "Has no vessel elements",
        "b": "Has vessel elements"
      },
      {
        "aspect": "Gametophyte",
        "a": "Large and independent",
        "b": "Small and dependent on sporophyte"
      },
      {
        "aspect": "Examples",
        "a": "Pine, spruce, cycad",
        "b": "Rose, wheat, mango, bean"
      }
    ],
    "keyPoints": [
      "Gymnosperm means naked seed; angiosperm means enclosed seed",
      "Angiosperms have flowers and fruits which gymnosperms lack",
      "Angiosperms have vessels in xylem for better water transport than gymnosperms",
      "Angiosperms are more diverse and successful than gymnosperms in modern world"
    ],
    "faqs": [
      {
        "q": "Why do angiosperms have more species than gymnosperms?",
        "a": "Angiosperms have diverse pollination methods, fruits for seed dispersal, and vessels for efficient water transport making them more adaptable."
      },
      {
        "q": "How are gymnosperm seeds protected if they have no fruit?",
        "a": "Gymnosperm seeds are protected by a thick seed coat and often remain in cones that provide some protection."
      },
      {
        "q": "Do all gymnosperms use wind for pollination?",
        "a": "Yes, all gymnosperms are wind pollinated because they lack the colorful flowers and nectar that attract insects and animals."
      }
    ]
  },
  {
    "slug": "atom-and-ion",
    "title": "Difference Between Atom and Ion",
    "termA": "Atom",
    "termB": "Ion",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Atoms and ions are fundamental units of matter with different electrical properties. An atom is electrically neutral with equal protons and electrons, while an ion is charged due to unequal protons and electrons.",
    "table": [
      {
        "aspect": "Electrical Charge",
        "a": "Neutral (no charge)",
        "b": "Charged (positive or negative)"
      },
      {
        "aspect": "Electrons",
        "a": "Equal to protons",
        "b": "More or fewer than protons"
      },
      {
        "aspect": "Formation",
        "a": "Natural state of element",
        "b": "Formed by gaining or losing electrons"
      },
      {
        "aspect": "Stability",
        "a": "Variable stability",
        "b": "Generally more stable than parent atom"
      },
      {
        "aspect": "Chemical Reactivity",
        "a": "Varies with element",
        "b": "More reactive due to charge"
      },
      {
        "aspect": "Bonding",
        "a": "Forms covalent bonds",
        "b": "Forms ionic bonds"
      },
      {
        "aspect": "Examples",
        "a": "Sodium (Na), chlorine (Cl)",
        "b": "Sodium cation (Na+), chloride anion (Cl-)"
      }
    ],
    "keyPoints": [
      "Ions form when atoms gain or lose electrons trying to achieve stable electron configuration",
      "Positive ions (cations) form by losing electrons; negative ions (anions) form by gaining electrons",
      "Ions are key to ionic bond formation and ionic compound stability",
      "Many biological processes involve ion transport and ionic interactions"
    ],
    "faqs": [
      {
        "q": "How does an atom become an ion?",
        "a": "An atom becomes an ion when it gains or loses electrons, creating a net electrical charge that makes it no longer neutral."
      },
      {
        "q": "Why do ions form?",
        "a": "Ions form because atoms strive to achieve stable electron configurations by filling their outermost electron shells according to octet rule."
      },
      {
        "q": "Are ions more stable than atoms?",
        "a": "Yes, ions are generally more stable because they have achieved stable electron configurations by gaining or losing electrons."
      }
    ]
  },
  {
    "slug": "oxidation-and-reduction",
    "title": "Difference Between Oxidation and Reduction",
    "termA": "Oxidation",
    "termB": "Reduction",
    "category": "Chemistry",
    "classLevel": "Class 11",
    "intro": "Oxidation and reduction are complementary processes in redox reactions that involve electron transfer. Oxidation is the loss of electrons or increase in oxidation state, while reduction is the gain of electrons or decrease in oxidation state.",
    "table": [
      {
        "aspect": "Electron Change",
        "a": "Loss of electrons",
        "b": "Gain of electrons"
      },
      {
        "aspect": "Oxidation State",
        "a": "Increases",
        "b": "Decreases"
      },
      {
        "aspect": "Oxygen Presence",
        "a": "Originally meant combining with oxygen",
        "b": "Originally meant removing oxygen"
      },
      {
        "aspect": "Product",
        "a": "Species becomes oxidized",
        "b": "Species becomes reduced"
      },
      {
        "aspect": "Agent",
        "a": "Oxidizing agent causes oxidation",
        "b": "Reducing agent causes reduction"
      },
      {
        "aspect": "Examples",
        "a": "Fe2+ to Fe3+ (loses electron)",
        "b": "Fe3+ to Fe2+ (gains electron)"
      }
    ],
    "keyPoints": [
      "Oxidation and reduction always occur together in redox reactions",
      "Substance that is oxidized acts as reducing agent; substance that is reduced acts as oxidizing agent",
      "Oxidation involves electron loss making species more positive; reduction involves electron gain making species more negative",
      "Understanding redox is crucial for batteries, fuel cells, and many biochemical processes"
    ],
    "faqs": [
      {
        "q": "Why are oxidation and reduction always simultaneous?",
        "a": "In redox reactions, electrons lost by one species must be gained by another, so oxidation of one substance always accompanies reduction of another."
      },
      {
        "q": "How do oxidation states help identify redox reactions?",
        "a": "By comparing oxidation states before and after reaction, we can identify which element was oxidized (increased state) and which was reduced (decreased state)."
      },
      {
        "q": "What is the difference between oxidizing and reducing agent?",
        "a": "Oxidizing agent gains electrons (gets reduced) causing oxidation of other species; reducing agent loses electrons (gets oxidized) causing reduction of other species."
      }
    ]
  },
  {
    "slug": "ductile-and-malleable",
    "title": "Difference Between Ductile and Malleable",
    "termA": "Ductile",
    "termB": "Malleable",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "intro": "Ductile and malleable are physical properties of materials that describe their ability to deform without breaking. Ductile materials can be drawn into thin wires, while malleable materials can be hammered or pressed into thin sheets.",
    "table": [
      {
        "aspect": "Type of Force Applied",
        "a": "Tensile force (pulling)",
        "b": "Compressive force (hammering)"
      },
      {
        "aspect": "Form Created",
        "a": "Thin wires or fibers",
        "b": "Thin sheets or foils"
      },
      {
        "aspect": "Mechanism",
        "a": "Metal atoms slide past each other in layers",
        "b": "Metal atoms rearrange under compression"
      },
      {
        "aspect": "Examples",
        "a": "Gold, silver, copper",
        "b": "Gold, silver, aluminum"
      },
      {
        "aspect": "Recovery",
        "a": "Generally does not recover original shape",
        "b": "Generally does not recover original shape"
      },
      {
        "aspect": "Related to",
        "a": "Strength and flexibility",
        "b": "Plasticity and hardness"
      }
    ],
    "keyPoints": [
      "Ductile materials deform under tension without breaking (drawing into wire)",
      "Malleable materials deform under compression without breaking (beating into sheets)",
      "Most metals are both ductile and malleable due to metallic bonding",
      "Gold is the most ductile and malleable of all metals"
    ],
    "faqs": [
      {
        "q": "Why are metals both ductile and malleable?",
        "a": "Metals have delocalized electrons that allow atoms to move and rearrange without breaking bonds, enabling both tensile and compressive deformation."
      },
      {
        "q": "Which property is more useful in industry?",
        "a": "Both are important; ductility is important for wires and cables while malleability is important for sheets, foils, and molded products."
      },
      {
        "q": "Can non-metals be ductile or malleable?",
        "a": "Most non-metals are brittle, breaking under stress rather than deforming, though some like sulfur show limited malleability under heat."
      }
    ]
  },
  {
    "slug": "emf-and-potential-difference",
    "title": "Difference Between EMF and Potential Difference",
    "termA": "EMF (Electromotive Force)",
    "termB": "Potential Difference",
    "category": "Physics",
    "classLevel": "Class 12",
    "intro": "EMF and potential difference are both measures of electrical energy but differ in their source and application. EMF is the total energy per unit charge provided by a source, while potential difference is the energy per unit charge between two points in a circuit.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Total energy given by source per unit charge",
        "b": "Energy change between two specific points"
      },
      {
        "aspect": "Source",
        "a": "Provided by energy source like battery",
        "b": "Exists between any two points in circuit"
      },
      {
        "aspect": "Internal Resistance",
        "a": "Includes effect of internal resistance",
        "b": "Measured across external resistance"
      },
      {
        "aspect": "Symbol",
        "a": "E (or sometimes denoted as ε)",
        "b": "V (voltage)"
      },
      {
        "aspect": "Magnitude",
        "a": "Always greater than terminal voltage",
        "b": "Equals terminal voltage when no internal resistance"
      },
      {
        "aspect": "Measurement",
        "a": "Cannot be directly measured with voltmeter",
        "b": "Can be measured with voltmeter"
      },
      {
        "aspect": "Formula Relation",
        "a": "E = V + I × r",
        "b": "V = E - I × r"
      }
    ],
    "keyPoints": [
      "EMF is property of energy source; potential difference is property of circuit",
      "EMF always remains same; potential difference changes with current and load",
      "Terminal voltage equals EMF only when internal resistance is zero or no current flows",
      "Larger internal resistance means greater difference between EMF and terminal voltage"
    ],
    "faqs": [
      {
        "q": "Why is EMF always greater than terminal voltage in a real battery?",
        "a": "Because internal resistance of battery causes voltage drop, so terminal voltage (V) equals EMF (E) minus the voltage drop across internal resistance."
      },
      {
        "q": "Can EMF and potential difference be equal?",
        "a": "Yes, when battery has zero internal resistance (ideal case) or when circuit is open and no current flows, EMF equals the potential difference."
      },
      {
        "q": "How does increasing load resistance affect EMF and terminal voltage?",
        "a": "EMF remains constant as it is property of source, but terminal voltage increases as current decreases with increased resistance."
      }
    ]
  },
  {
    "slug": "fuse-and-circuit-breaker",
    "title": "Difference Between Fuse and Circuit Breaker",
    "termA": "Fuse",
    "termB": "Circuit Breaker",
    "category": "Physics",
    "classLevel": "Class 10",
    "intro": "Fuses and circuit breakers are safety devices that protect electrical circuits from overcurrent damage. A fuse works by melting when excess current flows, while a circuit breaker automatically switches off when overcurrent is detected.",
    "table": [
      {
        "aspect": "Operating Principle",
        "a": "Melts due to heat from overcurrent",
        "b": "Bimetallic strip bends due to heat or electromagnetic mechanism"
      },
      {
        "aspect": "Reusability",
        "a": "Must be replaced after each operation",
        "b": "Can be reset and reused multiple times"
      },
      {
        "aspect": "Response Time",
        "a": "Slower response to overcurrent",
        "b": "Faster automatic response"
      },
      {
        "aspect": "Cost",
        "a": "Cheaper per unit",
        "b": "More expensive initially"
      },
      {
        "aspect": "Maintenance",
        "a": "Requires frequent replacement",
        "b": "Requires occasional resetting"
      },
      {
        "aspect": "Safety",
        "a": "Visible when blown (easy to identify)",
        "b": "Needs testing to verify operation"
      },
      {
        "aspect": "Modern Usage",
        "a": "Older installations, still used in some places",
        "b": "Standard in modern buildings"
      }
    ],
    "keyPoints": [
      "Fuse melts and breaks circuit; circuit breaker switches off automatically",
      "Fuse must be replaced; circuit breaker can be reset",
      "Circuit breaker is faster and more convenient but costlier",
      "Both provide protection against fire and electrical damage from overcurrent"
    ],
    "faqs": [
      {
        "q": "Why must fuses be replaced but circuit breakers can be reset?",
        "a": "Fuses melt and break (destroying the conductor), so they must be replaced; circuit breakers only switch off and can be reset for reuse."
      },
      {
        "q": "Which provides better protection against electrical shocks?",
        "a": "Modern circuit breakers with ground fault detection provide better shock protection, while fuses mainly protect against overcurrent fires."
      },
      {
        "q": "Can a higher rated fuse be used if circuit keeps tripping?",
        "a": "No, using higher rated fuse is dangerous as it provides no protection; the circuit needs troubleshooting for the actual cause of overcurrent."
      }
    ]
  },
  {
    "slug": "balanced-and-unbalanced-forces",
    "title": "Difference Between Balanced and Unbalanced Forces",
    "termA": "Balanced Forces",
    "termB": "Unbalanced Forces",
    "category": "Physics",
    "classLevel": "Class 9",
    "intro": "Balanced and unbalanced forces describe the net effect of multiple forces acting on an object. Balanced forces cancel each other out producing no acceleration, while unbalanced forces result in net force causing acceleration.",
    "table": [
      {
        "aspect": "Net Force",
        "a": "Net force is zero",
        "b": "Net force is not zero"
      },
      {
        "aspect": "Acceleration",
        "a": "No acceleration (a = 0)",
        "b": "Object accelerates"
      },
      {
        "aspect": "Motion Change",
        "a": "No change in motion state",
        "b": "Motion state changes"
      },
      {
        "aspect": "Magnitude",
        "a": "Forces are equal in magnitude",
        "b": "Forces are unequal in magnitude"
      },
      {
        "aspect": "Direction",
        "a": "Forces are opposite in direction",
        "b": "Forces may be in same or opposite direction"
      },
      {
        "aspect": "Example",
        "a": "Book resting on table",
        "b": "Book being pushed across table"
      },
      {
        "aspect": "Newton First Law",
        "a": "Demonstrates Newton first law",
        "b": "Causes motion according to Newton second law"
      }
    ],
    "keyPoints": [
      "Balanced forces cancel each other producing zero net force",
      "Unbalanced forces create net force that causes acceleration",
      "Balanced forces keep object at rest or in uniform motion",
      "Most motion changes require unbalanced forces"
    ],
    "faqs": [
      {
        "q": "Can balanced forces cause motion?",
        "a": "No, balanced forces cannot cause motion; they can only maintain rest or uniform motion. Motion changes require unbalanced forces."
      },
      {
        "q": "When are forces balanced in daily life?",
        "a": "Forces are balanced when book rests on table (normal and weight), when person stands still (gravity and normal force), or when swimming without acceleration."
      },
      {
        "q": "How do unbalanced forces relate to Newtons second law?",
        "a": "Newtons second law (F = ma) shows unbalanced forces cause acceleration; the greater the unbalanced force, the greater the acceleration."
      }
    ]
  },
  {
    "slug": "voluntary-and-involuntary-muscles",
    "title": "Difference Between Voluntary and Involuntary Muscles",
    "termA": "Voluntary Muscles",
    "termB": "Involuntary Muscles",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Voluntary and involuntary muscles are two types of muscles that differ in control and function. Voluntary muscles are under conscious control and are striated, while involuntary muscles contract without conscious control and are generally smooth.",
    "table": [
      {
        "aspect": "Conscious Control",
        "a": "Under conscious control",
        "b": "Automatic, not conscious"
      },
      {
        "aspect": "Structure",
        "a": "Striated (striped appearance)",
        "b": "Non-striated (smooth)"
      },
      {
        "aspect": "Shape",
        "a": "Cylindrical with many nuclei",
        "b": "Spindle-shaped with single nucleus"
      },
      {
        "aspect": "Location",
        "a": "Skeletal muscles",
        "b": "Internal organs, blood vessels"
      },
      {
        "aspect": "Contraction Speed",
        "a": "Faster contraction",
        "b": "Slower contraction"
      },
      {
        "aspect": "Fatigue",
        "a": "Gets fatigued easily",
        "b": "Does not fatigue easily"
      },
      {
        "aspect": "Examples",
        "a": "Arm, leg, facial muscles",
        "b": "Stomach, intestines, bladder, heart"
      }
    ],
    "keyPoints": [
      "Voluntary muscles controlled by conscious will; involuntary are automatic",
      "Voluntary muscles are striated; involuntary are smooth (mostly)",
      "Voluntary muscles skeletal; involuntary in organs and vessels",
      "Heart muscle is special striated involuntary muscle (cardiac muscle)"
    ],
    "faqs": [
      {
        "q": "Why can we control voluntary muscles but not involuntary?",
        "a": "Voluntary muscles have motor neurons directly controlled by brain through conscious effort, while involuntary muscles respond to autonomic nervous system."
      },
      {
        "q": "Is the heart muscle voluntary or involuntary?",
        "a": "Heart muscle is involuntary striated muscle (cardiac muscle) that contracts automatically, though some control is possible through meditation."
      },
      {
        "q": "Why do voluntary muscles fatigue but involuntary do not?",
        "a": "Voluntary muscles are made for occasional intense activity so they fatigue, while involuntary muscles sustain continuous work and are fatigue-resistant."
      }
    ]
  },
  {
    "slug": "cns-and-pns",
    "title": "Difference Between CNS and PNS",
    "termA": "CNS (Central Nervous System)",
    "termB": "PNS (Peripheral Nervous System)",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "The CNS and PNS are the two main divisions of the nervous system with distinct structures and functions. The CNS includes the brain and spinal cord and controls all body functions, while the PNS includes nerves and ganglia that connect CNS to the rest of the body.",
    "table": [
      {
        "aspect": "Components",
        "a": "Brain and spinal cord",
        "b": "Nerves and ganglia"
      },
      {
        "aspect": "Location",
        "a": "Inside vertebral column and skull",
        "b": "Throughout the body"
      },
      {
        "aspect": "Function",
        "a": "Integration and processing",
        "b": "Transmission of signals"
      },
      {
        "aspect": "Nerve Cell Types",
        "a": "Neuron cell bodies",
        "b": "Neuron extensions (axons and dendrites)"
      },
      {
        "aspect": "Protection",
        "a": "Protected by bone and meninges",
        "b": "Partially protected by nerve sheaths"
      },
      {
        "aspect": "Regeneration",
        "a": "Nerve tissue regenerates slowly",
        "b": "Nerves regenerate faster"
      },
      {
        "aspect": "Subdivision",
        "a": "No major subdivision",
        "b": "Somatic and autonomic divisions"
      }
    ],
    "keyPoints": [
      "CNS is command center processing information; PNS carries signals to and from CNS",
      "CNS includes brain controlling thoughts and spinal cord controlling reflexes",
      "PNS has somatic division for voluntary movement and autonomic for organs",
      "CNS damage often permanent; PNS nerves can often regenerate"
    ],
    "faqs": [
      {
        "q": "What is the role of spinal cord in CNS?",
        "a": "Spinal cord transmits signals between brain and body, and also controls reflex actions without requiring brain involvement."
      },
      {
        "q": "How many nerves make up the PNS?",
        "a": "The PNS consists of 31 pairs of spinal nerves and 12 pairs of cranial nerves connecting to all body parts."
      },
      {
        "q": "Can CNS and PNS function independently?",
        "a": "No, CNS and PNS must work together; CNS processes information and PNS carries signals, so damage to either affects nervous system function."
      }
    ]
  },
  {
    "slug": "sympathetic-and-parasympathetic",
    "title": "Difference Between Sympathetic and Parasympathetic Nervous System",
    "termA": "Sympathetic Nervous System",
    "termB": "Parasympathetic Nervous System",
    "category": "Biology",
    "classLevel": "Class 11",
    "intro": "The sympathetic and parasympathetic nervous systems are two divisions of the autonomic nervous system that have opposite effects. The sympathetic system prepares the body for fight-or-flight response, while the parasympathetic system promotes rest-and-digest functions.",
    "table": [
      {
        "aspect": "Response Type",
        "a": "Fight or flight response",
        "b": "Rest and digest response"
      },
      {
        "aspect": "Heart Rate",
        "a": "Increases",
        "b": "Decreases"
      },
      {
        "aspect": "Digestion",
        "a": "Slows or stops",
        "b": "Increases"
      },
      {
        "aspect": "Pupil Size",
        "a": "Dilates (enlarges)",
        "b": "Constricts (shrinks)"
      },
      {
        "aspect": "Neurotransmitter",
        "a": "Norepinephrine and epinephrine",
        "b": "Acetylcholine"
      },
      {
        "aspect": "Nerve Fiber Length",
        "a": "Long preganglionic, short postganglionic",
        "b": "Short preganglionic, long postganglionic"
      },
      {
        "aspect": "Effect on Bladder",
        "a": "Relaxes bladder",
        "b": "Contracts bladder for urination"
      }
    ],
    "keyPoints": [
      "Sympathetic prepares body for action; parasympathetic for rest and recovery",
      "Sympathetic increases heart rate and blood pressure; parasympathetic decreases them",
      "Both systems work together maintaining balance in body functions",
      "Stress activates sympathetic; relaxation activates parasympathetic"
    ],
    "faqs": [
      {
        "q": "Why do pupils dilate during sympathetic activation?",
        "a": "Dilated pupils allow more light to enter eye improving vision during fight-or-flight response for better awareness of danger."
      },
      {
        "q": "How does parasympathetic system help digestion?",
        "a": "Parasympathetic activation increases digestive secretions and intestinal movement, allowing body to absorb nutrients when it is safe to rest."
      },
      {
        "q": "What happens when both systems are equally active?",
        "a": "When both are balanced, the body maintains homeostasis with normal heart rate, digestion, and other functions in equilibrium."
      }
    ]
  },
  {
    "slug": "smooth-and-rough-er",
    "title": "Difference Between Smooth and Rough Endoplasmic Reticulum",
    "termA": "Smooth ER",
    "termB": "Rough ER",
    "category": "Biology",
    "classLevel": "Class 9",
    "intro": "Smooth and rough endoplasmic reticulum are two types of ER that differ in their appearance and functions. Smooth ER lacks ribosomes and synthesizes lipids and detoxifies substances, while rough ER has ribosomes and synthesizes proteins.",
    "table": [
      {
        "aspect": "Ribosome Presence",
        "a": "No ribosomes",
        "b": "Has ribosomes"
      },
      {
        "aspect": "Appearance",
        "a": "Smooth surface",
        "b": "Bumpy or granular surface"
      },
      {
        "aspect": "Primary Function",
        "a": "Lipid synthesis and detoxification",
        "b": "Protein synthesis"
      },
      {
        "aspect": "Connected To",
        "a": "Not connected to nuclear envelope",
        "b": "Connected to nuclear envelope"
      },
      {
        "aspect": "Location",
        "a": "Scattered throughout cytoplasm",
        "b": "Near nuclear envelope"
      },
      {
        "aspect": "Product Movement",
        "a": "Lipids stored or used in membrane",
        "b": "Proteins move to Golgi apparatus"
      },
      {
        "aspect": "Abundance in Cells",
        "a": "High in liver and muscle cells",
        "b": "High in protein-secreting cells"
      }
    ],
    "keyPoints": [
      "Smooth ER makes lipids; rough ER makes proteins",
      "Rough ER appearance bumpy due to ribosomes; smooth ER is smooth",
      "Rough ER protein products go to Golgi; smooth ER products stay in cell or membrane",
      "Both connected in cellular network allowing transport between organelles"
    ],
    "faqs": [
      {
        "q": "Why does rough ER have ribosomes attached?",
        "a": "Ribosomes attach to rough ER because the ER signal sequence directs ribosomes there, allowing newly synthesized proteins to enter ER for processing."
      },
      {
        "q": "What proteins does rough ER synthesize?",
        "a": "Rough ER synthesizes secretory proteins (digestive enzymes, hormones, antibodies) and membrane proteins that will be exported or inserted into membranes."
      },
      {
        "q": "Why is smooth ER abundant in liver cells?",
        "a": "Liver cells have abundant smooth ER for detoxification of drugs and wastes, and synthesis of lipids and glycogen for energy storage."
      }
    ]
  },
  {
    "slug": "active-and-passive-transport",
    "title": "Difference Between Active and Passive Transport",
    "termA": "Active Transport",
    "termB": "Passive Transport",
    "category": "Biology",
    "classLevel": "Class 9",
    "intro": "Active and passive transport are two mechanisms by which substances move across cell membranes. Active transport requires energy (ATP) to move substances against concentration gradient, while passive transport requires no energy and moves along concentration gradient.",
    "table": [
      {
        "aspect": "Energy Requirement",
        "a": "Requires ATP energy",
        "b": "No ATP energy needed"
      },
      {
        "aspect": "Movement Direction",
        "a": "Against concentration gradient",
        "b": "Along concentration gradient"
      },
      {
        "aspect": "Carrier Protein",
        "a": "Requires carrier protein",
        "b": "May or may not require carrier"
      },
      {
        "aspect": "Rate",
        "a": "Slower process",
        "b": "Generally faster process"
      },
      {
        "aspect": "Effect of Concentration",
        "a": "Can move low to high concentration",
        "b": "Moves high to low concentration only"
      },
      {
        "aspect": "Examples",
        "a": "Sodium-potassium pump, glucose uptake",
        "b": "Diffusion, osmosis, facilitated diffusion"
      },
      {
        "aspect": "Saturation",
        "a": "Can become saturated",
        "b": "Depends on type of passive transport"
      }
    ],
    "keyPoints": [
      "Active transport uses ATP energy moving against gradient; passive transport uses concentration gradient",
      "Active transport concentrates substances; passive dilutes them",
      "Active transport is selective; passive transport less selective",
      "Cells use both processes for different transport needs"
    ],
    "faqs": [
      {
        "q": "Why would cell use active transport if passive is available?",
        "a": "Cells use active transport to accumulate important substances at high concentrations against gradient, concentrating them where needed."
      },
      {
        "q": "What happens when ATP is depleted?",
        "a": "If ATP is depleted, active transport stops and substances cannot be moved against their concentration gradient."
      },
      {
        "q": "Is facilitated diffusion active or passive?",
        "a": "Facilitated diffusion is passive transport because it does not require ATP, though it requires carrier proteins and moves along concentration gradient."
      }
    ]
  },
  {
    "slug": "transpiration-and-evaporation",
    "title": "Difference Between Transpiration and Evaporation",
    "termA": "Transpiration",
    "termB": "Evaporation",
    "category": "Biology",
    "classLevel": "Class 10",
    "intro": "Transpiration and evaporation are two related processes involving water movement but occur in different contexts. Transpiration is water loss from plants through leaves, while evaporation is water loss from soil and water bodies into atmosphere.",
    "table": [
      {
        "aspect": "Source of Water",
        "a": "From plant leaves and stems",
        "b": "From soil and water bodies"
      },
      {
        "aspect": "Process Type",
        "a": "Biological process through stomata",
        "b": "Physical process from surfaces"
      },
      {
        "aspect": "Pathway",
        "a": "Through plant tissues and stomata",
        "b": "Directly from surface to atmosphere"
      },
      {
        "aspect": "Control",
        "a": "Controlled by plant opening closing stomata",
        "b": "Controlled by temperature and humidity"
      },
      {
        "aspect": "Temperature Sensitivity",
        "a": "Less sensitive to temperature changes",
        "b": "Highly sensitive to temperature"
      },
      {
        "aspect": "Humidity Effect",
        "a": "Stomata close in high humidity",
        "b": "Increases with lower humidity"
      },
      {
        "aspect": "Daytime Activity",
        "a": "Active mainly during day",
        "b": "Occurs day and night"
      }
    ],
    "keyPoints": [
      "Transpiration from plants; evaporation from soil and water",
      "Transpiration controlled by plant; evaporation by environmental factors",
      "Transpiration and evaporation together called evapotranspiration",
      "Both essential for water cycle moving water to atmosphere"
    ],
    "faqs": [
      {
        "q": "Why is transpiration important for plants?",
        "a": "Transpiration cools plants, transports minerals from roots, and creates tension for water uptake against gravity."
      },
      {
        "q": "How do stomata control transpiration?",
        "a": "Stomata open during day for photosynthesis but this allows water loss; plants close stomata at night to reduce transpiration."
      },
      {
        "q": "What happens to evaporation in humid climate?",
        "a": "Evaporation decreases in humid climate because air is already saturated with water vapor reducing evaporation rate."
      }
    ]
  },
  {
    "slug": "phototropism-and-gravitropism",
    "title": "Difference Between Phototropism and Gravitropism",
    "termA": "Phototropism",
    "termB": "Gravitropism",
    "category": "Biology",
    "classLevel": "Class 11",
    "intro": "Phototropism and gravitropism are two types of plant tropisms that describe growth responses to different stimuli. Phototropism is growth response to light, while gravitropism is growth response to gravity.",
    "table": [
      {
        "aspect": "Stimulus",
        "a": "Light direction",
        "b": "Gravitational force"
      },
      {
        "aspect": "Response",
        "a": "Growth toward or away from light",
        "b": "Growth toward or away from gravity"
      },
      {
        "aspect": "Hormone Involved",
        "a": "Auxin distribution by light",
        "b": "Auxin distribution by gravity"
      },
      {
        "aspect": "Positive Response",
        "a": "Growth toward light (stems)",
        "b": "Growth toward ground (roots)"
      },
      {
        "aspect": "Negative Response",
        "a": "Growth away from light (roots)",
        "b": "Growth away from gravity (shoots)"
      },
      {
        "aspect": "Example",
        "a": "Plant bending toward window light",
        "b": "Roots growing downward, stems upward"
      },
      {
        "aspect": "Time for Response",
        "a": "Minutes to hours",
        "b": "Minutes to hours"
      }
    ],
    "keyPoints": [
      "Phototropism response to light direction; gravitropism to gravity",
      "Both involve auxin hormone causing differential cell growth",
      "Positive phototropism in stems; negative in roots",
      "Gravitropism keeps roots down and shoots up against gravity"
    ],
    "faqs": [
      {
        "q": "How does light cause phototropic response?",
        "a": "Light affects auxin distribution in stem tip, concentrating more auxin on shaded side causing cells to elongate more on that side."
      },
      {
        "q": "Why do roots show negative phototropism?",
        "a": "Roots have more sensitivity to auxin causing opposite response; high auxin concentration inhibits growth rather than promoting it."
      },
      {
        "q": "Can plants detect gravity?",
        "a": "Yes, plants detect gravity through starch grains (statoliths) in root cap cells that sink downward, signaling direction to the root."
      }
    ]
  },
  {
    "slug": "prokaryote-and-eukaryote",
    "title": "Difference Between Prokaryote and Eukaryote",
    "termA": "Prokaryote",
    "termB": "Eukaryote",
    "category": "Biology",
    "classLevel": "Class 9",
    "intro": "Prokaryotes and eukaryotes are two types of cells that differ fundamentally in structure and complexity. Prokaryotes lack a membrane-bound nucleus and organelles, while eukaryotes have a true nucleus and membrane-bound organelles.",
    "table": [
      {
        "aspect": "Nucleus",
        "a": "No true nucleus",
        "b": "True nucleus with nuclear membrane"
      },
      {
        "aspect": "Organelles",
        "a": "No membrane-bound organelles",
        "b": "Membrane-bound organelles"
      },
      {
        "aspect": "Cell Size",
        "a": "Smaller (typically 1-5 micrometers)",
        "b": "Larger (typically 10-100 micrometers)"
      },
      {
        "aspect": "Examples",
        "a": "Bacteria and archaea",
        "b": "Plants, animals, fungi, protists"
      },
      {
        "aspect": "DNA Organization",
        "a": "Circular DNA in nucleoid region",
        "b": "Linear DNA in chromosomes"
      },
      {
        "aspect": "Cell Complexity",
        "a": "Simple, single-celled",
        "b": "Complex, often multicellular"
      },
      {
        "aspect": "Ribosomes",
        "a": "Smaller (70S ribosomes)",
        "b": "Larger (80S ribosomes)"
      }
    ],
    "keyPoints": [
      "Prokaryotes lack nucleus and organelles; eukaryotes have both",
      "Prokaryotes are bacteria and archaea; eukaryotes include all other organisms",
      "Eukaryote nucleus controls genetic activity; prokaryote DNA floats in nucleoid",
      "Eukaryotes more complex due to organelle specialization"
    ],
    "faqs": [
      {
        "q": "How did eukaryotes evolve from prokaryotes?",
        "a": "Endosymbiotic theory suggests prokaryotes engulfed other prokaryotes which became mitochondria and chloroplasts in early eukaryotes."
      },
      {
        "q": "Can prokaryotes perform all functions eukaryotes do?",
        "a": "Prokaryotes perform basic functions but lack specialization; eukaryotes with organelles can perform complex functions more efficiently."
      },
      {
        "q": "Why are eukaryotes larger than prokaryotes?",
        "a": "Eukaryotes can be larger because organelles allow compartmentalization of functions and more efficient nutrient transport."
      }
    ]
  },
  {
    "slug": "compound-and-mixture",
    "title": "Difference Between Compound and Mixture",
    "termA": "Compound",
    "termB": "Mixture",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "intro": "Compounds and mixtures are two ways matter can be combined but differ in their chemical nature. A compound is a pure substance made of chemically bonded elements in fixed ratio, while a mixture combines two or more substances physically without chemical bonding.",
    "table": [
      {
        "aspect": "Bonding",
        "a": "Chemical bonding between elements",
        "b": "Physical combination only"
      },
      {
        "aspect": "Ratio",
        "a": "Fixed, definite ratio of elements",
        "b": "Variable ratio of components"
      },
      {
        "aspect": "Properties",
        "a": "Different from component elements",
        "b": "Retains properties of components"
      },
      {
        "aspect": "Separation",
        "a": "Requires chemical reaction to separate",
        "b": "Can be separated by physical methods"
      },
      {
        "aspect": "Purity",
        "a": "Pure substance",
        "b": "Not a pure substance"
      },
      {
        "aspect": "Examples",
        "a": "Water (H2O), salt (NaCl), sugar",
        "b": "Saltwater, air, soil, milk"
      },
      {
        "aspect": "Melting Point",
        "a": "Fixed melting point",
        "b": "Range of melting points"
      }
    ],
    "keyPoints": [
      "Compound: chemically bonded, fixed ratio; mixture: physical combination, variable ratio",
      "Compound has new properties; mixture keeps component properties",
      "Compound requires chemical reaction to separate; mixture uses physical methods",
      "Most matter around us is mixtures but many pure compounds exist"
    ],
    "faqs": [
      {
        "q": "How can we tell if something is compound or mixture?",
        "a": "If components retain their properties and can be separated physically, it is mixture; if it has uniform properties and needs chemical reaction, it is compound."
      },
      {
        "q": "Can a mixture become a compound?",
        "a": "Yes, if components in mixture undergo chemical reaction forming new substance with new properties, mixture becomes compound."
      },
      {
        "q": "Why does water have fixed melting point but saltwater does not?",
        "a": "Water is pure compound so melting point is fixed; saltwater is mixture so salt affects melting point creating range depending on concentration."
      }
    ]
  },
  {
    "slug": "weathering-vs-erosion",
    "title": "Difference Between Weathering and Erosion",
    "termA": "Weathering",
    "termB": "Erosion",
    "category": "Geography",
    "classLevel": "9-10",
    "intro": "Weathering is the breakdown of rocks and minerals in place due to exposure to weather elements like wind, rain, and temperature changes. Erosion is the movement and transport of weathered rock material from one location to another by water, wind, or ice.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Breaking down of rocks without movement",
        "b": "Wearing away and transport of material"
      },
      {
        "aspect": "Process",
        "a": "Mechanical or chemical decomposition",
        "b": "Physical removal and relocation"
      },
      {
        "aspect": "Location",
        "a": "Occurs in place where rocks exist",
        "b": "Material moves to a new location"
      },
      {
        "aspect": "Agent",
        "a": "Atmospheric elements and organisms",
        "b": "Water, wind, glaciers, or gravity"
      },
      {
        "aspect": "Example",
        "a": "Rock breakdown on a hillside",
        "b": "River carrying soil particles downstream"
      },
      {
        "aspect": "Visibility",
        "a": "Gradual changes visible over time",
        "b": "Visible valleys, gorges, and canyons formed"
      }
    ],
    "keyPoints": [
      "Weathering precedes erosion; rocks must break down first",
      "Weathering does not involve transportation of materials",
      "Erosion requires a transporting agent like flowing water",
      "Both processes together shape Earth's surface over time"
    ],
    "faqs": [
      {
        "q": "Can weathering happen without erosion?",
        "a": "Yes, weathering can occur independently through chemical and mechanical breakdown without any transport of material."
      },
      {
        "q": "Is erosion always visible?",
        "a": "Erosion can be gradual and not immediately visible, but over long periods, valleys and gorges clearly show its effects."
      },
      {
        "q": "Which process is faster?",
        "a": "Erosion typically shows visible results faster than weathering, especially with strong water or wind action."
      }
    ]
  },
  {
    "slug": "evaporation-vs-boiling",
    "title": "Difference Between Evaporation and Boiling",
    "termA": "Evaporation",
    "termB": "Boiling",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Evaporation is the slow process of liquid molecules escaping from the surface and turning into vapor at any temperature. Boiling is the rapid process where the entire liquid turns to vapor when heat reaches its boiling point.",
    "table": [
      {
        "aspect": "Temperature",
        "a": "Occurs at any temperature below boiling point",
        "b": "Occurs only at the boiling point of the liquid"
      },
      {
        "aspect": "Speed",
        "a": "Slow process occurring gradually",
        "b": "Rapid and vigorous process"
      },
      {
        "aspect": "Location",
        "a": "Happens at the surface of the liquid",
        "b": "Occurs throughout the entire liquid volume"
      },
      {
        "aspect": "Bubbles",
        "a": "No bubbles are formed",
        "b": "Bubbles form throughout the liquid"
      },
      {
        "aspect": "Energy Required",
        "a": "Requires some heat energy from surroundings",
        "b": "Requires continuous supply of heat energy"
      },
      {
        "aspect": "Example",
        "a": "Wet clothes drying in sun or air",
        "b": "Water reaching 100 degrees Celsius in a kettle"
      }
    ],
    "keyPoints": [
      "Evaporation is a surface phenomenon while boiling involves the entire volume",
      "Boiling only occurs at a specific temperature for each liquid",
      "Evaporation is endothermic and absorbs heat energy",
      "Both processes convert liquid to vapor but at different rates"
    ],
    "faqs": [
      {
        "q": "Why do wet clothes dry faster in sun than in shade?",
        "a": "Heat from the sun increases the kinetic energy of water molecules, accelerating evaporation at the surface."
      },
      {
        "q": "Can boiling occur at temperatures other than 100 degrees Celsius?",
        "a": "Yes, the boiling point changes with pressure. At high altitudes where pressure is low, water boils at lower temperatures."
      },
      {
        "q": "Is energy required for both processes?",
        "a": "Yes, both require latent heat of vaporization, but boiling requires continuous heat supply while evaporation can use ambient heat."
      }
    ]
  },
  {
    "slug": "evaporation-vs-condensation",
    "title": "Difference Between Evaporation and Condensation",
    "termA": "Evaporation",
    "termB": "Condensation",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Evaporation is the process of liquid turning into vapor when heat energy is supplied. Condensation is the reverse process where vapor converts back into liquid when cooled or pressure is increased.",
    "table": [
      {
        "aspect": "Direction of Change",
        "a": "Liquid to gas transformation",
        "b": "Gas to liquid transformation"
      },
      {
        "aspect": "Heat Exchange",
        "a": "Endothermic; absorbs heat energy",
        "b": "Exothermic; releases heat energy"
      },
      {
        "aspect": "Molecular Activity",
        "a": "Molecules gain energy and move apart",
        "b": "Molecules lose energy and move closer"
      },
      {
        "aspect": "Temperature Effect",
        "a": "Increased temperature speeds up the process",
        "b": "Decreased temperature speeds up the process"
      },
      {
        "aspect": "Real-Life Example",
        "a": "Water evaporating from a puddle on hot days",
        "b": "Dew formation on grass during cool mornings"
      },
      {
        "aspect": "Reverse Process",
        "a": "Condensation is its reverse process",
        "b": "Evaporation is its reverse process"
      }
    ],
    "keyPoints": [
      "Evaporation and condensation are complementary processes",
      "Both involve latent heat; evaporation absorbs it while condensation releases it",
      "They are key processes in the water cycle",
      "Together they maintain Earth's water distribution and weather patterns"
    ],
    "faqs": [
      {
        "q": "Why do we see water droplets on cold glass in summer?",
        "a": "Water vapor in warm air condenses into liquid droplets when it comes in contact with the cold glass surface."
      },
      {
        "q": "Which process requires more energy?",
        "a": "Both require equal latent heat, but evaporation absorbs it from surroundings while condensation releases it to surroundings."
      },
      {
        "q": "How do these processes relate to the water cycle?",
        "a": "Evaporation lifts water from Earth's surface while condensation forms clouds; together they recycle water in the atmosphere."
      }
    ]
  },
  {
    "slug": "melting-vs-freezing",
    "title": "Difference Between Melting and Freezing",
    "termA": "Melting",
    "termB": "Freezing",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Melting is the process of converting solid into liquid by supplying heat energy at the melting point. Freezing is the reverse process where liquid converts into solid when heat energy is removed at the freezing point.",
    "table": [
      {
        "aspect": "Process Direction",
        "a": "Solid changes to liquid state",
        "b": "Liquid changes to solid state"
      },
      {
        "aspect": "Temperature Requirement",
        "a": "Occurs at the melting point with heat addition",
        "b": "Occurs at the freezing point with heat removal"
      },
      {
        "aspect": "Heat Exchange",
        "a": "Endothermic; absorbs latent heat of fusion",
        "b": "Exothermic; releases latent heat of fusion"
      },
      {
        "aspect": "Density Change",
        "a": "Most solids decrease in density when melting",
        "b": "Most liquids increase in density when freezing"
      },
      {
        "aspect": "Molecular Arrangement",
        "a": "Fixed arrangement becomes random",
        "b": "Random arrangement becomes fixed"
      },
      {
        "aspect": "Example",
        "a": "Ice turning to water at 0 degrees Celsius",
        "b": "Water turning to ice at 0 degrees Celsius"
      }
    ],
    "keyPoints": [
      "Melting and freezing are reverse processes occurring at the same temperature",
      "Latent heat of fusion is the energy required for both processes",
      "Both are physical changes, not chemical changes",
      "These processes are essential for maintaining Earth's water distribution"
    ],
    "faqs": [
      {
        "q": "Why does ice melt at the same temperature water freezes?",
        "a": "They occur at the same temperature (0 degrees Celsius for water) but in opposite directions; the equilibrium temperature depends on pressure."
      },
      {
        "q": "Can melting and freezing occur simultaneously?",
        "a": "Yes, when ice and water coexist at 0 degrees Celsius, both processes occur simultaneously in equilibrium."
      },
      {
        "q": "Does the melting point always equal the freezing point?",
        "a": "Generally yes, but pressure can affect these points. For example, increased pressure can lower ice's melting point."
      }
    ]
  },
  {
    "slug": "heat-vs-temperature",
    "title": "Difference Between Heat and Temperature",
    "termA": "Heat",
    "termB": "Temperature",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Heat is the transfer of thermal energy from a hotter body to a cooler body due to temperature difference. Temperature is the measure of the average kinetic energy of particles in a substance.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Energy transferred between bodies due to temperature difference",
        "b": "Measure of average kinetic energy of molecules"
      },
      {
        "aspect": "Nature",
        "a": "Energy in motion or transfer",
        "b": "Measure of thermal state"
      },
      {
        "aspect": "Measurement",
        "a": "Measured in joules or calories",
        "b": "Measured in degrees Celsius, Fahrenheit, or Kelvin"
      },
      {
        "aspect": "Direction",
        "a": "Always flows from hot to cold",
        "b": "No direction; it is a state variable"
      },
      {
        "aspect": "Instrument",
        "a": "Not directly measured by single instrument",
        "b": "Measured using a thermometer"
      },
      {
        "aspect": "Example",
        "a": "Energy flowing from hot coffee to a cold cup",
        "b": "The reading on a thermometer showing 60 degrees Celsius"
      }
    ],
    "keyPoints": [
      "Temperature is a property of matter; heat is a process of energy transfer",
      "Two bodies at the same temperature have no heat flow between them",
      "Heat depends on mass, specific heat capacity, and temperature change",
      "Temperature is independent of the amount of substance"
    ],
    "faqs": [
      {
        "q": "Why does ice melting not show temperature change?",
        "a": "During phase change, heat supplied is used to overcome intermolecular forces (latent heat), not to increase temperature."
      },
      {
        "q": "Can heat flow from cold to hot?",
        "a": "No, heat spontaneously flows from hot to cold. Energy can be made to flow the other way only by doing work (refrigeration)."
      },
      {
        "q": "Why is a large cup of water and a small cup of water at the same temperature called different amounts of heat?",
        "a": "The large cup contains more molecules with the same average kinetic energy, so it contains more total thermal energy that can be transferred."
      }
    ]
  },
  {
    "slug": "conduction-vs-convection",
    "title": "Difference Between Conduction and Convection",
    "termA": "Conduction",
    "termB": "Convection",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Conduction is the transfer of heat through a substance without the movement of the substance itself via direct contact. Convection is the transfer of heat through the movement of fluids (liquids or gases) in the form of currents.",
    "table": [
      {
        "aspect": "Mechanism",
        "a": "Heat transfer through molecular collisions",
        "b": "Heat transfer through bulk movement of fluid"
      },
      {
        "aspect": "Medium Required",
        "a": "Occurs in solids, liquids, and gases",
        "b": "Occurs only in liquids and gases"
      },
      {
        "aspect": "Particle Movement",
        "a": "Particles vibrate in place but do not move with heat",
        "b": "Particles move with the fluid carrying heat"
      },
      {
        "aspect": "Speed",
        "a": "Relatively slow process",
        "b": "Faster process than conduction"
      },
      {
        "aspect": "Example",
        "a": "Heat traveling from burner to handle of a metal spoon",
        "b": "Hot air rising from a burning candle creating air currents"
      },
      {
        "aspect": "Efficiency",
        "a": "Less efficient in gases and liquids",
        "b": "More efficient in gases and liquids"
      }
    ],
    "keyPoints": [
      "Conduction requires direct contact between materials",
      "Convection involves bulk movement of fluid particles",
      "Metals are excellent conductors; gases are poor conductors",
      "Convection currents drive weather systems and ocean circulation"
    ],
    "faqs": [
      {
        "q": "Why is a metal spoon too hot to hold when stirring hot water?",
        "a": "Heat is conducted through the metal from the hot water to your hand via direct molecular collisions in the spoon."
      },
      {
        "q": "How does hot air rise?",
        "a": "Hot air expands, becomes less dense, and rises due to buoyancy while cooler, denser air sinks, creating convection currents."
      },
      {
        "q": "Can convection occur in solids?",
        "a": "No, convection requires fluid movement which solids cannot undergo due to their fixed structure."
      }
    ]
  },
  {
    "slug": "convection-vs-radiation",
    "title": "Difference Between Convection and Radiation",
    "termA": "Convection",
    "termB": "Radiation",
    "category": "Physics",
    "classLevel": "9-10",
    "intro": "Convection is heat transfer through the bulk movement of fluids in the form of currents. Radiation is the transfer of heat through electromagnetic waves without requiring any medium.",
    "table": [
      {
        "aspect": "Medium Requirement",
        "a": "Requires a medium (liquid or gas)",
        "b": "Does not require any medium; travels through vacuum"
      },
      {
        "aspect": "Mechanism",
        "a": "Heat carried by moving fluid particles",
        "b": "Heat transferred by electromagnetic waves"
      },
      {
        "aspect": "Speed",
        "a": "Slower speed of transfer",
        "b": "Travels at the speed of light"
      },
      {
        "aspect": "Visibility",
        "a": "Current movement can be observed",
        "b": "Electromagnetic waves are invisible"
      },
      {
        "aspect": "Example",
        "a": "Warm air rising from a heater in a room",
        "b": "Heat from the sun reaching Earth through space"
      },
      {
        "aspect": "Obstructions",
        "a": "Can be blocked by walls in fluid paths",
        "b": "Can pass through some materials like glass"
      }
    ],
    "keyPoints": [
      "Radiation is the only heat transfer method that works through vacuum",
      "The sun's heat reaches Earth primarily through radiation",
      "Convection dominates in Earth's atmosphere and oceans",
      "All three heat transfer methods work together in most real scenarios"
    ],
    "faqs": [
      {
        "q": "Why can we feel the sun's heat even though space is empty?",
        "a": "The sun's heat travels through space as electromagnetic radiation, which does not require a medium to propagate."
      },
      {
        "q": "Does radiation occur only from the sun?",
        "a": "No, all objects emit thermal radiation depending on their temperature. Hotter objects radiate more energy than cooler ones."
      },
      {
        "q": "Why is radiation important at night when the sun is not visible?",
        "a": "Earth radiates heat back into space at night. Greenhouse gases trap some of this radiation, causing the greenhouse effect."
      }
    ]
  },
  {
    "slug": "crystalline-vs-amorphous",
    "title": "Difference Between Crystalline and Amorphous Solids",
    "termA": "Crystalline Solid",
    "termB": "Amorphous Solid",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "Crystalline solids have atoms or molecules arranged in a regular, repeating pattern with a definite geometric shape. Amorphous solids have atoms or molecules arranged randomly without any definite pattern or geometric shape.",
    "table": [
      {
        "aspect": "Atomic Arrangement",
        "a": "Regular, repeating 3D pattern",
        "b": "Random and disorderly arrangement"
      },
      {
        "aspect": "Melting Point",
        "a": "Sharp, definite melting point",
        "b": "Gradual softening over a temperature range"
      },
      {
        "aspect": "Cleavage",
        "a": "Clean, flat surfaces when broken",
        "b": "Uneven fracture without definite planes"
      },
      {
        "aspect": "Optical Properties",
        "a": "Often transparent or have luster",
        "b": "Often opaque or dull appearance"
      },
      {
        "aspect": "Example",
        "a": "Diamond, table salt, ice, sugar",
        "b": "Glass, rubber, wax, pitch"
      },
      {
        "aspect": "Refractive Index",
        "a": "Varies with direction (anisotropic)",
        "b": "Same in all directions (isotropic)"
      }
    ],
    "keyPoints": [
      "Crystal structure determines many properties of crystalline solids",
      "Amorphous solids are sometimes called supercooled liquids",
      "X-ray diffraction can identify crystalline structures",
      "Most ionic compounds are crystalline; most polymers are amorphous"
    ],
    "faqs": [
      {
        "q": "Why does glass flow over very long periods of time?",
        "a": "Glass is an amorphous solid that lacks a definite melting point and exhibits liquid-like behavior at very slow rates over centuries."
      },
      {
        "q": "How can we tell if a solid is crystalline?",
        "a": "Crystalline solids have a sharp melting point, cleave along definite planes, and show X-ray diffraction patterns with distinct peaks."
      },
      {
        "q": "Can amorphous solids become crystalline?",
        "a": "Yes, some amorphous solids can crystallize over time with heating or cooling, converting to a crystalline structure."
      }
    ]
  },
  {
    "slug": "saturated-vs-unsaturated-solution",
    "title": "Difference Between Saturated and Unsaturated Solution",
    "termA": "Saturated Solution",
    "termB": "Unsaturated Solution",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "A saturated solution is one in which the maximum amount of solute that can dissolve at a given temperature is dissolved. An unsaturated solution contains less solute than the maximum amount that could be dissolved at that temperature.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Contains maximum dissolved solute at given temperature",
        "b": "Contains less solute than saturation point"
      },
      {
        "aspect": "Solute Addition",
        "a": "No more solute can dissolve; excess remains undissolved",
        "b": "More solute can dissolve when added"
      },
      {
        "aspect": "Equilibrium",
        "a": "In dynamic equilibrium with undissolved solute",
        "b": "Not in equilibrium with undissolved solute"
      },
      {
        "aspect": "Crystal Formation",
        "a": "Crystals form when cooled or evaporated",
        "b": "No crystal formation upon cooling"
      },
      {
        "aspect": "Concentration",
        "a": "Maximum concentration for given conditions",
        "b": "Lower concentration than saturated solution"
      },
      {
        "aspect": "Example",
        "a": "Water containing 36 g salt per 100 g water at 20 degrees C",
        "b": "Water containing 20 g salt per 100 g water at 20 degrees C"
      }
    ],
    "keyPoints": [
      "Saturation depends on temperature and pressure of the system",
      "Increasing temperature increases saturation point for most solids",
      "A saturated solution appears clear but contains maximum solute",
      "Supersaturated solutions exist in unstable conditions"
    ],
    "faqs": [
      {
        "q": "How can we make a supersaturated solution?",
        "a": "A saturated solution can become supersaturated by carefully cooling it without disturbance, creating an unstable but temporary state."
      },
      {
        "q": "Why does salt have different saturation points at different temperatures?",
        "a": "Solubility depends on temperature because it affects the kinetic energy of molecules and the dissolution equilibrium."
      },
      {
        "q": "How do we know if a solution is saturated?",
        "a": "A solution is saturated when additional solute remains undissolved at the bottom, indicating the maximum dissolved amount is reached."
      }
    ]
  },
  {
    "slug": "suspension-vs-colloid",
    "title": "Difference Between Suspension and Colloid",
    "termA": "Suspension",
    "termB": "Colloid",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "A suspension is a heterogeneous mixture where solid particles are dispersed in a liquid or gas and can be seen with the naked eye. A colloid is a heterogeneous mixture where particles are so small that they cannot be seen with a microscope but scatter light.",
    "table": [
      {
        "aspect": "Particle Size",
        "a": "Larger particles (1 micrometer or more)",
        "b": "Smaller particles (1-1000 nanometers)"
      },
      {
        "aspect": "Visibility",
        "a": "Visible to naked eye",
        "b": "Not visible under naked eye or microscope"
      },
      {
        "aspect": "Light Scattering",
        "a": "Does not scatter light noticeably",
        "b": "Scatters light (Tyndall effect)"
      },
      {
        "aspect": "Settling",
        "a": "Particles settle at the bottom over time",
        "b": "Particles do not settle due to Brownian motion"
      },
      {
        "aspect": "Filtering",
        "a": "Can be separated by filtration",
        "b": "Cannot be separated by ordinary filtration"
      },
      {
        "aspect": "Example",
        "a": "Sand in water, milk of magnesia, muddy water",
        "b": "Milk, blood, fog, smoke, gelatin"
      }
    ],
    "keyPoints": [
      "Both suspensions and colloids are heterogeneous mixtures",
      "Colloidal particles experience Brownian motion",
      "Tyndall effect helps identify colloids in laboratories",
      "Colloids are important in biology, medicine, and industry"
    ],
    "faqs": [
      {
        "q": "Why does milk appear opaque while salt solution appears transparent?",
        "a": "Milk is a colloid with particles small enough to scatter light, while salt solution is a true solution where particles are dissolved."
      },
      {
        "q": "Can a suspension be converted to a colloid?",
        "a": "Yes, by reducing particle size through grinding or mechanical treatment, a suspension can be converted to a colloid."
      },
      {
        "q": "Why do colloidal particles not settle?",
        "a": "Colloidal particles are constantly bombarded by solvent molecules in random directions (Brownian motion), preventing settling."
      }
    ]
  },
  {
    "slug": "solution-vs-suspension",
    "title": "Difference Between Solution and Suspension",
    "termA": "Solution",
    "termB": "Suspension",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "A solution is a homogeneous mixture where solute dissolves completely in the solvent at the molecular level, forming a single phase. A suspension is a heterogeneous mixture where solid particles are dispersed but remain undissolved and visible.",
    "table": [
      {
        "aspect": "Homogeneity",
        "a": "Homogeneous mixture throughout",
        "b": "Heterogeneous mixture with visible particles"
      },
      {
        "aspect": "Transparency",
        "a": "Transparent or translucent",
        "b": "Opaque appearance"
      },
      {
        "aspect": "Particle Size",
        "a": "Molecular or ionic level (smaller than 1 nm)",
        "b": "Larger particles visible to naked eye"
      },
      {
        "aspect": "Settling",
        "a": "Does not settle over time",
        "b": "Particles settle at the bottom"
      },
      {
        "aspect": "Filtering",
        "a": "Cannot be separated by filtration",
        "b": "Can be separated by filtration"
      },
      {
        "aspect": "Example",
        "a": "Salt water, sugar solution, salt in vinegar",
        "b": "Muddy water, chalk in water, milk of magnesia"
      }
    ],
    "keyPoints": [
      "Solutions are formed when solute dissolves at molecular level",
      "Suspensions involve physical dispersion without chemical dissolution",
      "Solute in a solution cannot be recovered by simple filtration",
      "Suspended particles in a suspension can be recovered by filtration"
    ],
    "faqs": [
      {
        "q": "Why is salt water a solution while muddy water is a suspension?",
        "a": "Salt dissolves completely into water at the molecular level creating a solution, while mud particles remain suspended without dissolving."
      },
      {
        "q": "Can a solution become a suspension?",
        "a": "Not directly, but if solvent evaporates and solute crystallizes, it may appear as a suspension of crystals in remaining liquid."
      },
      {
        "q": "How do we distinguish between solution and suspension visually?",
        "a": "Solutions are transparent with no visible particles, while suspensions are opaque with visible particles that settle over time."
      }
    ]
  },
  {
    "slug": "homogeneous-vs-heterogeneous-mixture",
    "title": "Difference Between Homogeneous and Heterogeneous Mixture",
    "termA": "Homogeneous Mixture",
    "termB": "Heterogeneous Mixture",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "A homogeneous mixture has uniform composition throughout with the same properties in all parts. A heterogeneous mixture has non-uniform composition with different properties in different parts.",
    "table": [
      {
        "aspect": "Composition",
        "a": "Uniform throughout the entire mixture",
        "b": "Non-uniform composition in different parts"
      },
      {
        "aspect": "Appearance",
        "a": "Single phase visible",
        "b": "Multiple distinct phases visible"
      },
      {
        "aspect": "Properties",
        "a": "Same properties throughout",
        "b": "Different properties in different regions"
      },
      {
        "aspect": "Separation",
        "a": "Difficult to separate components",
        "b": "Easy to separate components"
      },
      {
        "aspect": "Example",
        "a": "Air, salt water, sugar solution, alloys",
        "b": "Sand and sugar mixture, oil and water, pizza"
      },
      {
        "aspect": "Component Visibility",
        "a": "Individual components not visible",
        "b": "Individual components remain visible"
      }
    ],
    "keyPoints": [
      "Homogeneous mixtures appear as single substances even though they contain multiple components",
      "Heterogeneous mixtures clearly show their individual components",
      "Solutions are homogeneous; suspensions and colloidal dispersions are typically heterogeneous",
      "The distinction depends on the scale of observation"
    ],
    "faqs": [
      {
        "q": "Is air a homogeneous or heterogeneous mixture?",
        "a": "Air is a homogeneous mixture of nitrogen, oxygen, and other gases uniformly distributed throughout."
      },
      {
        "q": "Can a heterogeneous mixture be made homogeneous?",
        "a": "Yes, by dissolving components (like salt in water) or thoroughly mixing and grinding (like flour and sugar)."
      },
      {
        "q": "Why is spaghetti in sauce a heterogeneous mixture?",
        "a": "Because the sauce and pasta remain as distinct, visible phases with different properties even when mixed together."
      }
    ]
  },
  {
    "slug": "pure-substance-vs-mixture",
    "title": "Difference Between Pure Substance and Mixture",
    "termA": "Pure Substance",
    "termB": "Mixture",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "A pure substance has a fixed composition and definite properties, consisting of only one type of particle. A mixture contains two or more pure substances combined together with variable composition.",
    "table": [
      {
        "aspect": "Composition",
        "a": "Fixed, definite composition",
        "b": "Variable composition possible"
      },
      {
        "aspect": "Number of Components",
        "a": "Single type of particle or element/compound",
        "b": "Two or more substances combined"
      },
      {
        "aspect": "Properties",
        "a": "Fixed, definite properties",
        "b": "Properties vary based on composition ratio"
      },
      {
        "aspect": "Melting Point",
        "a": "Sharp, definite melting point",
        "b": "Range of melting points"
      },
      {
        "aspect": "Separation",
        "a": "Cannot be separated by physical methods",
        "b": "Can be separated by physical methods"
      },
      {
        "aspect": "Example",
        "a": "Pure water, pure gold, oxygen gas, salt",
        "b": "Salt water, sand and gravel, air, brass"
      }
    ],
    "keyPoints": [
      "Pure substances can be elements or compounds",
      "Mixtures retain individual properties of their components",
      "Pure substances have constant physical and chemical properties",
      "Chemical analysis is needed to identify pure substance components"
    ],
    "faqs": [
      {
        "q": "Is seawater a pure substance or mixture?",
        "a": "Seawater is a mixture because it contains water with dissolved salts, minerals, and gases in variable proportions."
      },
      {
        "q": "Can a mixture become a pure substance?",
        "a": "No, but components of a mixture can be separated to obtain pure substances."
      },
      {
        "q": "How do we verify that a substance is pure?",
        "a": "A pure substance has a sharp melting point, constant boiling point, and consistent properties under all conditions."
      }
    ]
  },
  {
    "slug": "exothermic-vs-endothermic-reaction",
    "title": "Difference Between Exothermic and Endothermic Reaction",
    "termA": "Exothermic Reaction",
    "termB": "Endothermic Reaction",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "An exothermic reaction releases heat energy to the surroundings, increasing the temperature of the environment. An endothermic reaction absorbs heat energy from the surroundings, decreasing the temperature of the environment.",
    "table": [
      {
        "aspect": "Heat Transfer",
        "a": "Heat released to surroundings",
        "b": "Heat absorbed from surroundings"
      },
      {
        "aspect": "Temperature Change",
        "a": "Temperature of surroundings increases",
        "b": "Temperature of surroundings decreases"
      },
      {
        "aspect": "Activation Energy",
        "a": "Once started, usually continues without external heat",
        "b": "Requires continuous supply of external heat"
      },
      {
        "aspect": "Enthalpy Change",
        "a": "Negative (delta H is negative)",
        "b": "Positive (delta H is positive)"
      },
      {
        "aspect": "Example",
        "a": "Combustion, neutralization, respiration, rusting",
        "b": "Melting ice, evaporation, photosynthesis, dissolving salt"
      },
      {
        "aspect": "Reverse Process",
        "a": "Endothermic is reverse process",
        "b": "Exothermic is reverse process"
      }
    ],
    "keyPoints": [
      "Most combustion reactions are exothermic",
      "Phase changes like melting and evaporation are endothermic",
      "Photosynthesis is a major endothermic process in nature",
      "The reverse of any reaction changes the heat absorption direction"
    ],
    "faqs": [
      {
        "q": "Why do hand warmers feel hot if they are exothermic?",
        "a": "Hand warmers contain chemicals that undergo exothermic reactions, releasing heat energy that warms the surroundings."
      },
      {
        "q": "Is melting ice endothermic or exothermic?",
        "a": "Melting ice is endothermic because it requires heat energy input to break the bonds in the solid ice crystal structure."
      },
      {
        "q": "Can a reaction be both exothermic and endothermic?",
        "a": "Not simultaneously, but a reaction's direction determines its nature. Forward reaction may be exothermic while reverse is endothermic."
      }
    ]
  },
  {
    "slug": "reversible-vs-irreversible-change",
    "title": "Difference Between Reversible and Irreversible Change",
    "termA": "Reversible Change",
    "termB": "Irreversible Change",
    "category": "Chemistry",
    "classLevel": "9-10",
    "intro": "A reversible change can be undone to restore the original state without forming new substances. An irreversible change cannot be undone, resulting in new substances with different properties.",
    "table": [
      {
        "aspect": "Nature",
        "a": "Physical change that can be reversed",
        "b": "Permanent change that cannot be reversed"
      },
      {
        "aspect": "New Substances",
        "a": "No new substances formed",
        "b": "New substances with different properties formed"
      },
      {
        "aspect": "Original State",
        "a": "Can return to original state",
        "b": "Original substance is lost permanently"
      },
      {
        "aspect": "Method to Reverse",
        "a": "Simple physical method can reverse it",
        "b": "Complex or impossible to reverse"
      },
      {
        "aspect": "Example",
        "a": "Melting ice, dissolving sugar, stretching rubber",
        "b": "Burning wood, cooking an egg, rusting iron"
      },
      {
        "aspect": "Chemical Changes",
        "a": "No chemical change occurs",
        "b": "Chemical change occurs with new compounds"
      }
    ],
    "keyPoints": [
      "Reversible changes are physical changes by nature",
      "Irreversible changes are typically chemical changes",
      "Burning is a common irreversible change",
      "Freezing water is reversible; burning paper is irreversible"
    ],
    "faqs": [
      {
        "q": "Is cooking an egg reversible or irreversible?",
        "a": "Cooking an egg is irreversible because the heat causes chemical changes creating new substances with new properties."
      },
      {
        "q": "Can all physical changes be reversed?",
        "a": "Most physical changes are reversible, but some like permanent deformation may be difficult to reverse completely."
      },
      {
        "q": "Why is burning wood irreversible?",
        "a": "Burning wood is irreversible because it is a chemical reaction producing ash, carbon dioxide, and water - new substances cannot be easily recombined."
      }
    ]
  },
  {
    "slug": "acidic-vs-basic-oxides",
    "title": "Difference Between Acidic and Basic Oxides",
    "termA": "Acidic Oxide",
    "termB": "Basic Oxide",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "Acidic oxides are oxides of non-metals that react with water to form acids or react with bases to form salts. Basic oxides are oxides of metals that react with water to form bases or react with acids to form salts.",
    "table": [
      {
        "aspect": "Element Type",
        "a": "Oxides of non-metals",
        "b": "Oxides of metals"
      },
      {
        "aspect": "Reaction with Water",
        "a": "Produce acids when dissolved in water",
        "b": "Produce bases when dissolved in water"
      },
      {
        "aspect": "Reaction with Bases",
        "a": "React with bases to form salts and water",
        "b": "React with acids to form salts and water"
      },
      {
        "aspect": "pH Nature",
        "a": "Acidic in nature (pH less than 7)",
        "b": "Basic in nature (pH greater than 7)"
      },
      {
        "aspect": "Example",
        "a": "Carbon dioxide, sulfur dioxide, phosphorus pentoxide",
        "b": "Calcium oxide, sodium oxide, magnesium oxide"
      },
      {
        "aspect": "Solubility",
        "a": "Usually soluble in water",
        "b": "May be soluble or insoluble in water"
      }
    ],
    "keyPoints": [
      "Acidic oxides are also called acidic anhydrides",
      "Basic oxides are also called basic anhydrides",
      "Both types react to form salts, but with opposite reactants",
      "Amphoteric oxides can react as both acidic and basic"
    ],
    "faqs": [
      {
        "q": "What does carbon dioxide become when dissolved in water?",
        "a": "Carbon dioxide forms carbonic acid when dissolved in water, making it an acidic oxide."
      },
      {
        "q": "What is the product when calcium oxide reacts with water?",
        "a": "Calcium oxide reacts with water to form calcium hydroxide, a base, confirming its basic nature."
      },
      {
        "q": "Are all oxides either acidic or basic?",
        "a": "Most oxides are acidic or basic, but some are amphoteric, showing both acidic and basic properties."
      }
    ]
  },
  {
    "slug": "strong-vs-weak-acid",
    "title": "Difference Between Strong and Weak Acid",
    "termA": "Strong Acid",
    "termB": "Weak Acid",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "A strong acid completely dissociates into ions when dissolved in water, releasing all hydrogen ions. A weak acid partially dissociates into ions, establishing an equilibrium with the undissociated molecules.",
    "table": [
      {
        "aspect": "Ionization",
        "a": "Completely ionizes in water",
        "b": "Partially ionizes in water"
      },
      {
        "aspect": "Concentration of H+ Ions",
        "a": "High concentration of H+ ions",
        "b": "Low concentration of H+ ions"
      },
      {
        "aspect": "Equilibrium",
        "a": "No equilibrium; complete dissociation",
        "b": "Establishes equilibrium with molecules"
      },
      {
        "aspect": "pH Value",
        "a": "Low pH (strong acidic)",
        "b": "Higher pH (less acidic)"
      },
      {
        "aspect": "Conductivity",
        "a": "High electrical conductivity",
        "b": "Lower electrical conductivity"
      },
      {
        "aspect": "Example",
        "a": "Hydrochloric acid, sulfuric acid, nitric acid",
        "b": "Acetic acid, citric acid, carbonic acid"
      }
    ],
    "keyPoints": [
      "Strong acids are completely dissociated; weak acids are partially dissociated",
      "Strong acids conduct electricity better than weak acids",
      "Weak acids require equilibrium constants (Ka) to describe their behavior",
      "Vinegar contains weak acetic acid while battery acid contains strong sulfuric acid"
    ],
    "faqs": [
      {
        "q": "Why is concentrated acetic acid still a weak acid?",
        "a": "Acetic acid is weak because even in concentrated form, it only partially ionizes in water, maintaining an equilibrium."
      },
      {
        "q": "Can a dilute strong acid have lower pH than concentrated weak acid?",
        "a": "No, strong acids always ionize completely, so even dilute strong acids maintain lower pH than concentrated weak acids."
      },
      {
        "q": "Why do weak acids establish equilibrium?",
        "a": "Weak acids establish equilibrium because their ionization is reversible; dissociated ions recombine with molecules continuously."
      }
    ]
  },
  {
    "slug": "dilute-vs-concentrated-acid",
    "title": "Difference Between Dilute and Concentrated Acid",
    "termA": "Dilute Acid",
    "termB": "Concentrated Acid",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "A dilute acid has a low concentration of acid solute dissolved in a larger amount of solvent, usually water. A concentrated acid has a high concentration of acid solute with minimal amount of solvent.",
    "table": [
      {
        "aspect": "Solute Concentration",
        "a": "Low concentration of acid molecules",
        "b": "High concentration of acid molecules"
      },
      {
        "aspect": "Solvent Amount",
        "a": "More solvent (water) present",
        "b": "Less solvent (water) present"
      },
      {
        "aspect": "Reactivity",
        "a": "Less reactive due to lower concentration",
        "b": "More reactive due to higher concentration"
      },
      {
        "aspect": "Heat Release",
        "a": "Releases less heat during reaction",
        "b": "Releases more heat during reaction"
      },
      {
        "aspect": "pH",
        "a": "Higher pH (less acidic)",
        "b": "Lower pH (more acidic)"
      },
      {
        "aspect": "Example",
        "a": "2N hydrochloric acid, vinegar",
        "b": "18N hydrochloric acid, concentrated sulfuric acid"
      }
    ],
    "keyPoints": [
      "Dilution decreases the concentration but does not change acid strength",
      "Concentrated strong acids are more dangerous due to higher reactivity",
      "Mixing concentrated acid with water must be done carefully",
      "pH depends on concentration; strong acids have low pH even when dilute"
    ],
    "faqs": [
      {
        "q": "Is a concentrated weak acid more reactive than a dilute strong acid?",
        "a": "No, a dilute strong acid is more reactive because it completely ionizes, releasing more H+ ions despite lower concentration."
      },
      {
        "q": "Why is concentrated acid more dangerous than dilute acid?",
        "a": "Concentrated acid is more dangerous because it reacts more vigorously and releases more heat, potentially causing severe burns."
      },
      {
        "q": "Can we convert concentrated acid to dilute acid?",
        "a": "Yes, by adding more solvent (water) to increase the volume while reducing the concentration of the acid."
      }
    ]
  },
  {
    "slug": "soap-vs-detergent",
    "title": "Difference Between Soap and Detergent",
    "termA": "Soap",
    "termB": "Detergent",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "Soap is made from natural fats and oils by saponification and works best in soft water, being biodegradable. Detergents are synthetic compounds made from petrochemicals that work well in hard water and all conditions.",
    "table": [
      {
        "aspect": "Origin",
        "a": "Made from natural fats and oils",
        "b": "Made from synthetic chemicals"
      },
      {
        "aspect": "Effectiveness in Hard Water",
        "a": "Forms precipitate, reduces effectiveness",
        "b": "Works efficiently in hard water"
      },
      {
        "aspect": "Biodegradability",
        "a": "Completely biodegradable",
        "b": "Some are non-biodegradable"
      },
      {
        "aspect": "Skin Effect",
        "a": "Milder on skin and clothes",
        "b": "Harsher on skin but powerful cleaning"
      },
      {
        "aspect": "Cost",
        "a": "More expensive",
        "b": "Less expensive"
      },
      {
        "aspect": "Example",
        "a": "Bar soaps, body wash from olive oil",
        "b": "Laundry detergent, dish wash liquid"
      }
    ],
    "keyPoints": [
      "Soaps are salts of fatty acids while detergents are synthetic compounds",
      "Hard water contains minerals that interfere with soap effectiveness",
      "Detergents have been developed to overcome soap limitations",
      "Most modern cleaning products use detergents instead of soap"
    ],
    "faqs": [
      {
        "q": "Why does soap not work well in hard water?",
        "a": "Hard water contains calcium and magnesium ions that react with soap molecules, forming insoluble precipitates."
      },
      {
        "q": "Are detergents better than soap?",
        "a": "Detergents are more versatile and effective in all water types, but soaps are more environmentally friendly and gentler."
      },
      {
        "q": "Can we soften water to use soap effectively?",
        "a": "Yes, water softening removes calcium and magnesium ions, allowing soap to work effectively."
      }
    ]
  },
  {
    "slug": "hard-vs-soft-water",
    "title": "Difference Between Hard and Soft Water",
    "termA": "Hard Water",
    "termB": "Soft Water",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "Hard water contains dissolved minerals like calcium and magnesium salts that interfere with soap. Soft water has few dissolved minerals and allows soap to lather easily.",
    "table": [
      {
        "aspect": "Mineral Content",
        "a": "Contains calcium and magnesium salts",
        "b": "Contains few or no dissolved minerals"
      },
      {
        "aspect": "Soap Lathering",
        "a": "Does not lather easily with soap",
        "b": "Lathers easily and forms rich foam"
      },
      {
        "aspect": "Source",
        "a": "From underground sources with mineral deposits",
        "b": "From rainwater or treated surface water"
      },
      {
        "aspect": "Scale Formation",
        "a": "Deposits scale in pipes and kettles",
        "b": "No scale deposits"
      },
      {
        "aspect": "Laundry Results",
        "a": "Clothes feel stiff and dull",
        "b": "Clothes feel soft and clean"
      },
      {
        "aspect": "Health Effect",
        "a": "Generally safe; may have health benefits",
        "b": "Less mineral content but still potable"
      }
    ],
    "keyPoints": [
      "Hard water reduces soap effectiveness but is not harmful to health",
      "Soft water is preferred for washing clothes and dishes",
      "Hard water can cause scaling in pipes and heating systems",
      "Water softening involves removing calcium and magnesium ions"
    ],
    "faqs": [
      {
        "q": "Can we identify hard water?",
        "a": "Yes, hard water does not form lather easily with soap and leaves scale deposits in kettles and pipes."
      },
      {
        "q": "Is hard water safe to drink?",
        "a": "Yes, hard water is generally safe to drink and may provide beneficial minerals like calcium and magnesium."
      },
      {
        "q": "How can we convert hard water to soft water?",
        "a": "Hard water can be softened by boiling to remove temporary hardness, or by adding soda ash to remove permanent hardness."
      }
    ]
  },
  {
    "slug": "temporary-vs-permanent-hardness",
    "title": "Difference Between Temporary and Permanent Hardness",
    "termA": "Temporary Hardness",
    "termB": "Permanent Hardness",
    "category": "Chemistry",
    "classLevel": "10-11",
    "intro": "Temporary hardness is caused by dissolved bicarbonates of calcium and magnesium and can be removed by boiling. Permanent hardness is caused by sulfates and chlorides and cannot be removed by boiling alone.",
    "table": [
      {
        "aspect": "Cause",
        "a": "Calcium and magnesium bicarbonates",
        "b": "Calcium and magnesium sulfates and chlorides"
      },
      {
        "aspect": "Removal by Boiling",
        "a": "Removed by boiling water",
        "b": "Cannot be removed by boiling"
      },
      {
        "aspect": "Chemical Reaction",
        "a": "Bicarbonates decompose when heated",
        "b": "Sulfates and chlorides remain unchanged"
      },
      {
        "aspect": "Removal Method",
        "a": "Boiling or adding lime water",
        "b": "Adding soda ash or ion exchange resins"
      },
      {
        "aspect": "Scale in Kettles",
        "a": "Forms scales during boiling",
        "b": "Remains dissolved; no obvious scaling"
      },
      {
        "aspect": "Example",
        "a": "Ca(HCO3)2 and Mg(HCO3)2 in water",
        "b": "CaSO4 and MgCl2 in water"
      }
    ],
    "keyPoints": [
      "Temporary hardness is easier and cheaper to remove than permanent hardness",
      "Hard water often contains both types of hardness",
      "Lime water addition converts temporary hardness to insoluble carbonates",
      "Ion exchange resins are commonly used to remove both types of hardness"
    ],
    "faqs": [
      {
        "q": "Why does scale form in kettles when boiling temporary hard water?",
        "a": "Heating decomposes bicarbonates into carbonates which are insoluble, precipitating as scale deposits."
      },
      {
        "q": "Can permanent hardness be removed at home?",
        "a": "Yes, by adding soda ash which converts soluble sulfates and chlorides to insoluble carbonates."
      },
      {
        "q": "Is water with only permanent hardness still hard?",
        "a": "Yes, permanent hardness still prevents soap from lathering even though it does not form kettle scale."
      }
    ]
  },
  {
    "slug": "open-vs-closed-circuit",
    "title": "Difference Between Open and Closed Circuit",
    "termA": "Open Circuit",
    "termB": "Closed Circuit",
    "category": "Physics",
    "classLevel": "10",
    "intro": "An open circuit is a broken or incomplete electrical pathway where current cannot flow and the circuit is inactive. A closed circuit is a complete electrical pathway where current flows freely from the battery through the load back to the battery.",
    "table": [
      {
        "aspect": "Current Flow",
        "a": "No current flows",
        "b": "Current flows continuously"
      },
      {
        "aspect": "Pathway Completeness",
        "a": "Broken or incomplete pathway",
        "b": "Complete continuous pathway"
      },
      {
        "aspect": "Device Operation",
        "a": "Connected devices do not work",
        "b": "Connected devices operate normally"
      },
      {
        "aspect": "Cause",
        "a": "Switch off, broken wire, or disconnected component",
        "b": "Switch on and all components properly connected"
      },
      {
        "aspect": "Voltage Measurement",
        "a": "Voltage appears across the break",
        "b": "Voltage drops across loads"
      },
      {
        "aspect": "Example",
        "a": "Light switch off; bulb does not glow",
        "b": "Light switch on; bulb glows brightly"
      }
    ],
    "keyPoints": [
      "An open circuit is essentially a switch in the off position",
      "A closed circuit is a switch in the on position",
      "Current cannot flow through an open circuit",
      "Safety devices like fuses protect circuits from overcurrent"
    ],
    "faqs": [
      {
        "q": "Why do devices not work when the circuit is open?",
        "a": "In an open circuit, the broken pathway prevents current from flowing through the device, so no power is delivered."
      },
      {
        "q": "Can an open circuit be dangerous?",
        "a": "An open circuit itself is safe because no current flows. However, an open circuit can cause voltage buildup in some systems."
      },
      {
        "q": "What is the difference between an open circuit and a short circuit?",
        "a": "Open circuit has broken connection with no current flow; short circuit has unintended path bypassing loads with excessive current."
      }
    ]
  },
  {
    "slug": "primary-vs-secondary-cell",
    "title": "Difference Between Primary and Secondary Cell",
    "termA": "Primary Cell",
    "termB": "Secondary Cell",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A primary cell is a non-rechargeable battery that provides electrical energy through irreversible chemical reactions. A secondary cell is a rechargeable battery that can be restored to original state by passing current through it.",
    "table": [
      {
        "aspect": "Rechargeability",
        "a": "Cannot be recharged",
        "b": "Can be recharged multiple times"
      },
      {
        "aspect": "Chemical Reaction",
        "a": "Irreversible chemical reaction",
        "b": "Reversible chemical reaction"
      },
      {
        "aspect": "Cost",
        "a": "Cheaper initially",
        "b": "More expensive initially"
      },
      {
        "aspect": "Lifespan",
        "a": "Limited; single use",
        "b": "Long lifespan with multiple cycles"
      },
      {
        "aspect": "Long-term Economical",
        "a": "Expensive for frequent use",
        "b": "Economical for repeated use"
      },
      {
        "aspect": "Example",
        "a": "Dry cells, alkaline batteries, zinc-carbon cells",
        "b": "Lead-acid battery, lithium-ion battery, nickel-cadmium cell"
      }
    ],
    "keyPoints": [
      "Primary cells are designed for single-use applications",
      "Secondary cells power portable devices requiring long-term use",
      "Attempting to recharge primary cells can be dangerous",
      "Modern devices use rechargeable secondary cells"
    ],
    "faqs": [
      {
        "q": "Can primary cells be recharged?",
        "a": "Some primary cells can be partially recharged, but this is not recommended as it may damage them or cause leakage."
      },
      {
        "q": "Why are secondary cells preferred for portable devices?",
        "a": "Secondary cells can be recharged repeatedly, reducing long-term costs and environmental waste from frequent battery replacement."
      },
      {
        "q": "What determines the number of charge cycles a secondary cell can undergo?",
        "a": "The number of cycles depends on the cell chemistry, operating conditions, and charging/discharging rates."
      }
    ]
  },
  {
    "slug": "cell-vs-battery",
    "title": "Difference Between Cell and Battery",
    "termA": "Cell",
    "termB": "Battery",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A cell is a single electrochemical unit that produces electrical energy through chemical reactions between two terminals. A battery is a combination of two or more cells connected in series or parallel to provide higher voltage or current.",
    "table": [
      {
        "aspect": "Number of Units",
        "a": "Single electrochemical unit",
        "b": "Two or more cells combined"
      },
      {
        "aspect": "Voltage Output",
        "a": "Single cell voltage (typically 1.5V or less)",
        "b": "Sum of individual cell voltages"
      },
      {
        "aspect": "Terminals",
        "a": "One positive and one negative terminal",
        "b": "Single positive and negative terminal pair"
      },
      {
        "aspect": "Common Usage",
        "a": "Used in small devices or learning",
        "b": "Used in all commercial devices"
      },
      {
        "aspect": "Connection Method",
        "a": "Individual electrochemical unit",
        "b": "Cells arranged in series or parallel"
      },
      {
        "aspect": "Example",
        "a": "Single zinc-carbon cell producing 1.5V",
        "b": "Four AA cells creating 6V battery"
      }
    ],
    "keyPoints": [
      "Commercially, even single cells are often marketed as batteries",
      "Series connection increases voltage",
      "Parallel connection increases current capacity",
      "Battery capacity depends on cell chemistry and arrangement"
    ],
    "faqs": [
      {
        "q": "Why do we sometimes use four cells in a battery instead of one?",
        "a": "Multiple cells are arranged in series to increase total voltage or in parallel to increase current capacity for high-power devices."
      },
      {
        "q": "Can cells of different types be mixed in a battery?",
        "a": "It is not recommended to mix different cell types as they have different voltages and discharge rates, affecting battery performance."
      },
      {
        "q": "What happens when cells are connected in parallel?",
        "a": "When cells are connected in parallel, the voltage remains the same as a single cell but current capacity increases."
      }
    ]
  },
  {
    "slug": "galvanometer-vs-ammeter",
    "title": "Difference Between Galvanometer and Ammeter",
    "termA": "Galvanometer",
    "termB": "Ammeter",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A galvanometer is a sensitive instrument that detects small currents using a moving coil in a magnetic field. An ammeter is a modified galvanometer that measures electrical current by using a shunt resistance in parallel.",
    "table": [
      {
        "aspect": "Sensitivity",
        "a": "Extremely sensitive to small currents",
        "b": "Less sensitive; measures larger currents"
      },
      {
        "aspect": "Current Range",
        "a": "Measures microamperes",
        "b": "Measures amperes or milliamperes"
      },
      {
        "aspect": "Internal Resistance",
        "a": "High internal resistance",
        "b": "Very low internal resistance"
      },
      {
        "aspect": "Modification Method",
        "a": "No modification from basic design",
        "b": "Shunt resistance added in parallel"
      },
      {
        "aspect": "Connection",
        "a": "Not typically used directly in circuits",
        "b": "Connected in series in circuits"
      },
      {
        "aspect": "Accuracy",
        "a": "Highly accurate for small currents",
        "b": "Accurate for larger current measurements"
      }
    ],
    "keyPoints": [
      "A galvanometer can be converted into an ammeter by adding a shunt",
      "An ammeter should have very low resistance to not affect circuit current",
      "A galvanometer has high resistance and is not suitable for direct current measurement",
      "The shunt carries most of the current while galvanometer carries a small fraction"
    ],
    "faqs": [
      {
        "q": "Why is shunt resistance added to convert galvanometer to ammeter?",
        "a": "Shunt resistance in parallel diverts most current away from the sensitive galvanometer, allowing it to measure larger currents safely."
      },
      {
        "q": "What happens if we connect a galvanometer directly in a circuit?",
        "a": "Connecting a galvanometer directly can damage it due to its low current capacity and high sensitivity to current fluctuations."
      },
      {
        "q": "Why should an ammeter have low resistance?",
        "a": "Low resistance in an ammeter ensures it does not significantly reduce current in the circuit or change the circuit behavior."
      }
    ]
  },
  {
    "slug": "ammeter-vs-voltmeter",
    "title": "Difference Between Ammeter and Voltmeter",
    "termA": "Ammeter",
    "termB": "Voltmeter",
    "category": "Physics",
    "classLevel": "10",
    "intro": "An ammeter measures electric current flowing through a circuit and is connected in series. A voltmeter measures electric potential difference across two points and is connected in parallel.",
    "table": [
      {
        "aspect": "Measures",
        "a": "Electric current (in amperes)",
        "b": "Electric potential difference (in volts)"
      },
      {
        "aspect": "Connection",
        "a": "Connected in series with circuit",
        "b": "Connected in parallel across component"
      },
      {
        "aspect": "Internal Resistance",
        "a": "Very low internal resistance",
        "b": "Very high internal resistance"
      },
      {
        "aspect": "Effect on Circuit",
        "a": "Minimal effect on circuit behavior",
        "b": "Draws minimal current from circuit"
      },
      {
        "aspect": "Purpose",
        "a": "Measures current flowing through component",
        "b": "Measures voltage across component"
      },
      {
        "aspect": "Example",
        "a": "Measures 2.5 A flowing through a resistor",
        "b": "Measures 5 V potential difference across battery"
      }
    ],
    "keyPoints": [
      "Ammeter and voltmeter are modified galvanometers for different measurements",
      "Reversing ammeter and voltmeter connections damages both instruments",
      "Ammeter cannot measure voltage; voltmeter cannot measure current",
      "Both instruments are essential for circuit analysis"
    ],
    "faqs": [
      {
        "q": "What happens if we connect an ammeter in parallel?",
        "a": "Connecting an ammeter in parallel short-circuits that component and can damage the ammeter due to excessive current flow."
      },
      {
        "q": "What happens if we connect a voltmeter in series?",
        "a": "Connecting a voltmeter in series breaks the circuit because its high resistance blocks current flow."
      },
      {
        "q": "Can we measure both current and voltage with one instrument?",
        "a": "Some multimeters can measure both current and voltage with appropriate connection changes and setting adjustments."
      }
    ]
  },
  {
    "slug": "step-up-vs-step-down-transformer",
    "title": "Difference Between Step-up and Step-down Transformer",
    "termA": "Step-up Transformer",
    "termB": "Step-down Transformer",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A step-up transformer increases voltage while decreasing current in the secondary coil. A step-down transformer decreases voltage while increasing current in the secondary coil.",
    "table": [
      {
        "aspect": "Primary to Secondary Turns",
        "a": "Secondary has more turns than primary",
        "b": "Secondary has fewer turns than primary"
      },
      {
        "aspect": "Voltage Change",
        "a": "Increases voltage in secondary",
        "b": "Decreases voltage in secondary"
      },
      {
        "aspect": "Current Change",
        "a": "Decreases current in secondary",
        "b": "Increases current in secondary"
      },
      {
        "aspect": "Power",
        "a": "Power remains same (ignoring losses)",
        "b": "Power remains same (ignoring losses)"
      },
      {
        "aspect": "Use",
        "a": "For long-distance power transmission",
        "b": "For household appliances and devices"
      },
      {
        "aspect": "Example",
        "a": "Power transmission lines increase voltage to 400 kV",
        "b": "Home transformer reduces 230 V to 12 V for devices"
      }
    ],
    "keyPoints": [
      "Transformer equation: Vs/Vp = Ns/Np",
      "Step-up and step-down are complementary transformations",
      "Step-up transformers reduce losses during long-distance transmission",
      "Step-down transformers make power safe for household use"
    ],
    "faqs": [
      {
        "q": "Why use step-up transformers for long-distance transmission?",
        "a": "Step-up transformers increase voltage and decrease current, reducing power losses (P = I²R) during transmission."
      },
      {
        "q": "Can a step-up transformer increase power?",
        "a": "No, a step-up transformer increases voltage but decreases current proportionally, keeping power constant (ignoring losses)."
      },
      {
        "q": "What is the ratio of turns if voltage increases from 220 V to 660 V?",
        "a": "The turns ratio is 1:3 because the voltage increases by a factor of three, so secondary has three times more turns."
      }
    ]
  },
  {
    "slug": "motor-vs-generator",
    "title": "Difference Between Motor and Generator",
    "termA": "Motor",
    "termB": "Generator",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A motor converts electrical energy into mechanical energy using electromagnetic forces. A generator converts mechanical energy into electrical energy using electromagnetic induction.",
    "table": [
      {
        "aspect": "Energy Conversion",
        "a": "Electrical to mechanical",
        "b": "Mechanical to electrical"
      },
      {
        "aspect": "Input",
        "a": "Receives electrical current",
        "b": "Receives mechanical rotation"
      },
      {
        "aspect": "Output",
        "a": "Produces mechanical motion",
        "b": "Produces electrical current"
      },
      {
        "aspect": "Principle",
        "a": "Uses magnetic force on current-carrying conductor",
        "b": "Uses electromagnetic induction (Faraday's law)"
      },
      {
        "aspect": "Direction of Motion",
        "a": "Rotates continuously when supplied current",
        "b": "Must be rotated externally to generate current"
      },
      {
        "aspect": "Example",
        "a": "Fan motor, vehicle starter motor",
        "b": "Power plant generator, bicycle dynamo"
      }
    ],
    "keyPoints": [
      "Motors and generators are essentially the same device used differently",
      "A motor can act as a generator if mechanically driven",
      "Fleming's left-hand rule applies to motors",
      "Fleming's right-hand rule applies to generators"
    ],
    "faqs": [
      {
        "q": "Can a motor be used as a generator?",
        "a": "Yes, if you mechanically rotate a motor shaft, it generates electrical current acting as a generator."
      },
      {
        "q": "Why do we need both motors and generators?",
        "a": "Motors power many devices by converting electrical energy. Generators produce electrical power for distribution and use."
      },
      {
        "q": "What determines the direction of rotation in a motor?",
        "a": "The direction of rotation in a motor is determined by the direction of current flow through the coil and magnetic field orientation."
      }
    ]
  },
  {
    "slug": "real-vs-apparent-depth",
    "title": "Difference Between Real and Apparent Depth",
    "termA": "Real Depth",
    "termB": "Apparent Depth",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Real depth is the actual distance from the surface to an object measured in the medium. Apparent depth is the distance from the surface to where the object appears to be due to refraction of light.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Actual distance of object from surface",
        "b": "Distance object appears to be from surface"
      },
      {
        "aspect": "Measurement Method",
        "a": "Measured directly with a scale",
        "b": "Perceived from observation due to refraction"
      },
      {
        "aspect": "Value",
        "a": "Always greater than apparent depth in denser medium",
        "b": "Always less than real depth in denser medium"
      },
      {
        "aspect": "Cause of Difference",
        "a": "No refraction involved",
        "b": "Light refraction at interface causes it"
      },
      {
        "aspect": "Refractive Index Role",
        "a": "Not directly affected by refractive index",
        "b": "Depends on refractive index of medium"
      },
      {
        "aspect": "Example",
        "a": "A fish at 30 cm below water surface",
        "b": "The fish appears at about 22 cm depth due to refraction"
      }
    ],
    "keyPoints": [
      "Refraction at air-water interface causes apparent depth difference",
      "Relationship: apparent depth = real depth / refractive index",
      "The denser the medium, the greater the difference between real and apparent depth",
      "Apparent depth helps explain why objects appear closer when viewed through water"
    ],
    "faqs": [
      {
        "q": "Why do objects in water appear closer to the surface than they really are?",
        "a": "Light rays from underwater objects bend away from normal when exiting water, making them appear shallower than actual position."
      },
      {
        "q": "Does the viewing angle affect apparent depth?",
        "a": "Yes, the angle at which you view affects perceived apparent depth, but the formula applies for normal observation."
      },
      {
        "q": "How can we calculate apparent depth?",
        "a": "Apparent depth can be calculated using: apparent depth = real depth divided by refractive index of the medium."
      }
    ]
  },
  {
    "slug": "myopia-vs-hypermetropia",
    "title": "Difference Between Myopia and Hypermetropia",
    "termA": "Myopia",
    "termB": "Hypermetropia",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Myopia is nearsightedness where close objects are seen clearly but distant objects appear blurred. Hypermetropia is farsightedness where distant objects are seen clearly but close objects appear blurred.",
    "table": [
      {
        "aspect": "Vision Clarity",
        "a": "Close objects clear, distant objects blurred",
        "b": "Distant objects clear, close objects blurred"
      },
      {
        "aspect": "Image Formation",
        "a": "Image forms in front of retina",
        "b": "Image forms behind retina"
      },
      {
        "aspect": "Cause",
        "a": "Cornea too curved or eyeball too long",
        "b": "Cornea too flat or eyeball too short"
      },
      {
        "aspect": "Correction Lens",
        "a": "Concave lens (negative power)",
        "b": "Convex lens (positive power)"
      },
      {
        "aspect": "Near Point",
        "a": "Closer than normal (less than 25 cm)",
        "b": "Farther than normal (more than 25 cm)"
      },
      {
        "aspect": "Far Point",
        "a": "Closer than infinity",
        "b": "At infinity or appears normal"
      }
    ],
    "keyPoints": [
      "Myopia and hypermetropia are refractive errors of the eye",
      "Myopia is corrected with concave (minus) lenses",
      "Hypermetropia is corrected with convex (plus) lenses",
      "Both conditions affect the focusing of light on the retina"
    ],
    "faqs": [
      {
        "q": "Why is myopia called nearsightedness?",
        "a": "Myopia is called nearsightedness because people with myopia can see nearby objects clearly but cannot see distant objects."
      },
      {
        "q": "Can a person have both myopia and hypermetropia?",
        "a": "No, a person has either myopia or hypermetropia at any given time, though they may develop presbyopia with age."
      },
      {
        "q": "Is myopia or hypermetropia more common?",
        "a": "Myopia is more common, especially in younger populations, though both conditions are prevalent worldwide."
      }
    ]
  },
  {
    "slug": "mirror-vs-lens",
    "title": "Difference Between Mirror and Lens",
    "termA": "Mirror",
    "termB": "Lens",
    "category": "Physics",
    "classLevel": "10",
    "intro": "A mirror is a reflective surface that reflects light and uses the law of reflection. A lens is a refracting surface that bends light through the law of refraction.",
    "table": [
      {
        "aspect": "Principle",
        "a": "Uses law of reflection",
        "b": "Uses law of refraction"
      },
      {
        "aspect": "Light Behavior",
        "a": "Reflects light off the surface",
        "b": "Refracts light through the material"
      },
      {
        "aspect": "Image Type",
        "a": "Can form real or virtual images",
        "b": "Can form real or virtual images"
      },
      {
        "aspect": "Material",
        "a": "Usually metal-coated glass or polished metal",
        "b": "Transparent material like glass or plastic"
      },
      {
        "aspect": "Focal Point",
        "a": "In front of the mirror surface",
        "b": "Inside or beyond the lens material"
      },
      {
        "aspect": "Example",
        "a": "Bathroom mirror, concave mirror, convex mirror",
        "b": "Magnifying glass, eyeglass lenses, camera lens"
      }
    ],
    "keyPoints": [
      "Mirrors use reflection while lenses use refraction",
      "Both mirrors and lenses can form magnified images",
      "Mirrors work in all light wavelengths equally",
      "Lenses are wavelength-dependent, causing chromatic aberration"
    ],
    "faqs": [
      {
        "q": "Which is more suitable for a telescope - mirror or lens?",
        "a": "Large telescopes typically use mirrors because they can be made larger without the optical distortions that large lenses suffer."
      },
      {
        "q": "Can a mirror and lens create the same magnification?",
        "a": "Yes, both can create similar magnifications, but they use different optical principles to achieve the magnification."
      },
      {
        "q": "Why do lenses suffer from chromatic aberration but mirrors do not?",
        "a": "Lenses refract different wavelengths at different angles, causing color separation. Mirrors reflect all wavelengths equally."
      }
    ]
  },
  {
    "slug": "reflection-vs-dispersion",
    "title": "Difference Between Reflection and Dispersion",
    "termA": "Reflection",
    "termB": "Dispersion",
    "category": "Physics",
    "classLevel": "10",
    "intro": "Reflection is the bouncing back of light from a smooth surface without change in wavelength. Dispersion is the splitting of white light into its component colors due to different wavelengths traveling at different speeds.",
    "table": [
      {
        "aspect": "Definition",
        "a": "Light bounces back from surface",
        "b": "Light splits into component colors"
      },
      {
        "aspect": "Wavelength",
        "a": "Wavelength remains unchanged",
        "b": "Different wavelengths separate"
      },
      {
        "aspect": "Surface Type",
        "a": "Occurs on smooth surfaces",
        "b": "Occurs in prisms or water droplets"
      },
      {
        "aspect": "Direction",
        "a": "Light returns at specific angle",
        "b": "Light separates into different directions"
      },
      {
        "aspect": "Causes",
        "a": "Smooth surface bounces light back",
        "b": "Refractive index variation with wavelength"
      },
      {
        "aspect": "Result",
        "a": "Mirror image or reflected light",
        "b": "Rainbow or spectrum of colors"
      }
    ],
    "keyPoints": [
      "Reflection follows the law of reflection",
      "Dispersion depends on the material's refractive index for different wavelengths",
      "Both can occur together when light hits a prism",
      "Rainbows are formed by both reflection and dispersion in water droplets"
    ],
    "faqs": [
      {
        "q": "Why does a prism create a rainbow while a mirror does not?",
        "a": "A prism disperses white light into colors by refracting different wavelengths differently, while a mirror simply reflects all wavelengths equally."
      },
      {
        "q": "Is reflection the same as refraction?",
        "a": "No, reflection bounces light back while refraction bends light as it passes through different media."
      },
      {
        "q": "Can dispersion occur without refraction?",
        "a": "No, dispersion requires different refraction angles for different wavelengths, so it is essentially part of the refraction process."
      }
    ]
  },
  {
    "slug": "day-vs-night",
    "title": "Difference Between Day and Night",
    "termA": "Day",
    "termB": "Night",
    "category": "Geography",
    "classLevel": "9",
    "intro": "Day is the period when a location on Earth faces the sun and receives direct sunlight. Night is the period when a location on Earth faces away from the sun and receives no direct sunlight.",
    "table": [
      {
        "aspect": "Sun Position",
        "a": "Sun is above the horizon",
        "b": "Sun is below the horizon"
      },
      {
        "aspect": "Light Availability",
        "a": "Direct sunlight illuminates the location",
        "b": "No direct sunlight; complete darkness"
      },
      {
        "aspect": "Temperature",
        "a": "Warmer due to solar radiation",
        "b": "Cooler as Earth radiates heat"
      },
      {
        "aspect": "Duration",
        "a": "Approximately 12 hours at equator",
        "b": "Approximately 12 hours at equator"
      },
      {
        "aspect": "Cause",
        "a": "Due to Earth's rotation facing sun",
        "b": "Due to Earth's rotation facing away from sun"
      },
      {
        "aspect": "Activity",
        "a": "Most human and animal activities occur",
        "b": "Rest and nocturnal activities occur"
      }
    ],
    "keyPoints": [
      "Day and night are caused by Earth's rotation",
      "Day and night length varies with latitude and season",
      "Equinox has equal day and night length",
      "Poles experience extreme variations in day-night cycles"
    ],
    "faqs": [
      {
        "q": "Why are days longer in summer?",
        "a": "During summer, the hemisphere is tilted toward the sun, causing the location to spend more time facing the sun."
      },
      {
        "q": "Why is night necessary?",
        "a": "Night provides rest period for organisms, regulates circadian rhythms, and allows for heat radiation from Earth."
      },
      {
        "q": "Does day last exactly 12 hours everywhere?",
        "a": "No, day length varies with latitude and season. Only at the equator on equinoxes do day and night last approximately 12 hours."
      }
    ]
  },
  {
    "slug": "tropical-vs-temperate",
    "title": "Difference Between Tropical and Temperate Climate",
    "termA": "Tropical Climate",
    "termB": "Temperate Climate",
    "category": "Geography",
    "classLevel": "9-10",
    "intro": "Tropical climate is hot and humid throughout the year with minimal temperature variation. Temperate climate has moderate temperatures with distinct seasons and greater temperature variation.",
    "table": [
      {
        "aspect": "Location",
        "a": "Near equator between 23.5 N and 23.5 S",
        "b": "Between 23.5 and 66.5 degrees latitude"
      },
      {
        "aspect": "Temperature",
        "a": "Hot year-round, 20-25 degrees C minimum",
        "b": "Varies by season from cold to warm"
      },
      {
        "aspect": "Seasons",
        "a": "Wet and dry seasons; no winter",
        "b": "Spring, summer, fall, and winter"
      },
      {
        "aspect": "Rainfall",
        "a": "High rainfall, often over 2000 mm annually",
        "b": "Moderate rainfall, 500-1500 mm annually"
      },
      {
        "aspect": "Vegetation",
        "a": "Dense rainforests and thick vegetation",
        "b": "Deciduous forests and grasslands"
      },
      {
        "aspect": "Example",
        "a": "Amazon rainforest, tropical islands",
        "b": "Most of Europe, North America, Australia"
      }
    ],
    "keyPoints": [
      "Tropical regions receive more direct solar radiation",
      "Temperate regions experience seasonal variation in solar radiation",
      "Tropical regions support dense biodiversity",
      "Temperate regions show seasonal changes in flora and fauna"
    ],
    "faqs": [
      {
        "q": "Why is tropical climate hot throughout the year?",
        "a": "Tropical regions are near the equator where the sun's rays hit nearly vertically year-round, providing consistent heating."
      },
      {
        "q": "Can temperate regions have no winter?",
        "a": "Maritime temperate regions with ocean influence may have mild winters, but continental temperate regions experience cold winters."
      },
      {
        "q": "Is temperate climate always moderate?",
        "a": "Yes, temperate climates are defined by moderate temperatures compared to tropical and polar extremes."
      }
    ]
  },
  {
    "slug": "flora-vs-fauna",
    "title": "Difference Between Flora and Fauna",
    "termA": "Flora",
    "termB": "Fauna",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Flora refers to all plant life in a particular region or ecosystem. Fauna refers to all animal life in a particular region or ecosystem.",
    "table": [
      {
        "aspect": "Definition",
        "a": "All plants and vegetation",
        "b": "All animals and wildlife"
      },
      {
        "aspect": "Nutrition Method",
        "a": "Autotrophic; make own food via photosynthesis",
        "b": "Heterotrophic; consume other organisms"
      },
      {
        "aspect": "Movement",
        "a": "Fixed in one location",
        "b": "Most can move to different locations"
      },
      {
        "aspect": "Reproduction",
        "a": "Sexual via seeds or spores",
        "b": "Mostly sexual via eggs or live birth"
      },
      {
        "aspect": "Growth",
        "a": "Indeterminate growth throughout life",
        "b": "Determinate growth to adult size"
      },
      {
        "aspect": "Example",
        "a": "Trees, grasses, flowers, ferns",
        "b": "Mammals, birds, insects, fish"
      }
    ],
    "keyPoints": [
      "Flora and fauna together form an ecosystem",
      "Flora produces oxygen and food; fauna pollinate and disperse seeds",
      "Both depend on each other for survival",
      "Biodiversity includes both diverse flora and fauna"
    ],
    "faqs": [
      {
        "q": "Can flora survive without fauna?",
        "a": "Some flora can survive without fauna for reproduction, but loss of fauna reduces pollination and seed dispersal efficiency."
      },
      {
        "q": "What is the relationship between flora and fauna?",
        "a": "Flora provides food and oxygen for fauna while fauna helps in pollination, seed dispersal, and nutrient cycling."
      },
      {
        "q": "Are fungi classified as flora or fauna?",
        "a": "Fungi are neither flora nor fauna; they are a separate kingdom with characteristics of both plants and animals."
      }
    ]
  },
  {
    "slug": "herbivore-vs-carnivore",
    "title": "Difference Between Herbivore and Carnivore",
    "termA": "Herbivore",
    "termB": "Carnivore",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Herbivores are animals that feed exclusively on plants and plant materials. Carnivores are animals that feed exclusively on meat from other animals.",
    "table": [
      {
        "aspect": "Diet",
        "a": "Only plants, seeds, fruits, and leaves",
        "b": "Only meat from other animals"
      },
      {
        "aspect": "Teeth Structure",
        "a": "Flat molars for grinding plants",
        "b": "Sharp canines and incisors for tearing meat"
      },
      {
        "aspect": "Digestive System",
        "a": "Long digestive tract with complex stomach",
        "b": "Short digestive tract and simple stomach"
      },
      {
        "aspect": "Jaw Movement",
        "a": "Side-to-side for grinding motion",
        "b": "Up-and-down for tearing motion"
      },
      {
        "aspect": "Example",
        "a": "Cow, horse, elephant, deer, rabbit",
        "b": "Lion, tiger, wolf, eagle, shark"
      },
      {
        "aspect": "Trophic Level",
        "a": "Primary consumers",
        "b": "Secondary or tertiary consumers"
      }
    ],
    "keyPoints": [
      "Herbivores are primary consumers in food chains",
      "Carnivores are predators at higher trophic levels",
      "Both are essential for ecosystem balance",
      "Teeth and digestive adaptations reflect their diets"
    ],
    "faqs": [
      {
        "q": "Are herbivores aggressive?",
        "a": "Herbivores can be aggressive when defending themselves or their young, but they do not hunt for food like carnivores."
      },
      {
        "q": "Can herbivores eat meat accidentally?",
        "a": "Some herbivores may occasionally consume insects or meat, but their digestive system is optimized for plants."
      },
      {
        "q": "Which is more important in ecosystem - herbivore or carnivore?",
        "a": "Both are important; herbivores control plant growth while carnivores control herbivore populations."
      }
    ]
  },
  {
    "slug": "carnivore-vs-omnivore",
    "title": "Difference Between Carnivore and Omnivore",
    "termA": "Carnivore",
    "termB": "Omnivore",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Carnivores eat only meat from other animals. Omnivores eat both plants and meat.",
    "table": [
      {
        "aspect": "Diet",
        "a": "Only meat from animals",
        "b": "Both plants and meat"
      },
      {
        "aspect": "Teeth Type",
        "a": "Sharp canines for tearing meat",
        "b": "Mixed teeth for tearing and grinding"
      },
      {
        "aspect": "Digestive Flexibility",
        "a": "Specialized for meat digestion",
        "b": "Flexible digestive system for mixed diet"
      },
      {
        "aspect": "Hunting Behavior",
        "a": "Active hunters or scavengers",
        "b": "Hunt, gather, or both"
      },
      {
        "aspect": "Example",
        "a": "Lion, tiger, owl, snake",
        "b": "Bear, human, crow, pig"
      },
      {
        "aspect": "Trophic Level",
        "a": "Secondary or tertiary consumers",
        "b": "Can be at multiple trophic levels"
      }
    ],
    "keyPoints": [
      "Omnivores have greater dietary flexibility than carnivores",
      "Omnivores can adapt to available food sources",
      "Carnivores have specialized digestive systems for meat",
      "Omnivores often have better survival prospects in changing environments"
    ],
    "faqs": [
      {
        "q": "Why do humans eat both plants and meat?",
        "a": "Humans are omnivores with digestive systems adapted for both plant and animal matter, providing complete nutrition."
      },
      {
        "q": "Can an omnivore survive on only plants or only meat?",
        "a": "Most omnivores can survive on either diet, though they thrive best with a mixed diet for complete nutrition."
      },
      {
        "q": "Are omnivores stronger than carnivores?",
        "a": "Strength depends on the individual species, not diet type. Some omnivores are strong, and some carnivores are weak."
      }
    ]
  },
  {
    "slug": "predator-vs-prey",
    "title": "Difference Between Predator and Prey",
    "termA": "Predator",
    "termB": "Prey",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "A predator is an animal that hunts and kills other animals for food. Prey is an animal that is hunted by predators for food.",
    "table": [
      {
        "aspect": "Role",
        "a": "Hunter that captures food",
        "b": "Hunted animal that serves as food"
      },
      {
        "aspect": "Speed",
        "a": "Fast enough to catch prey",
        "b": "Fast to escape predators"
      },
      {
        "aspect": "Defense",
        "a": "Offensive weapons; teeth, claws",
        "b": "Defensive features; camouflage, speed"
      },
      {
        "aspect": "Senses",
        "a": "Sharp vision or smell for hunting",
        "b": "Sharp senses to detect predators"
      },
      {
        "aspect": "Population",
        "a": "Lower population than prey",
        "b": "Higher population than predators"
      },
      {
        "aspect": "Example",
        "a": "Hawk hunting sparrows",
        "b": "Sparrows hunted by hawks"
      }
    ],
    "keyPoints": [
      "Predator-prey relationships control population balance",
      "Predators depend on prey for survival",
      "Prey populations increase when predators decrease",
      "Both play vital roles in maintaining ecosystem health"
    ],
    "faqs": [
      {
        "q": "What happens if all predators are removed?",
        "a": "Prey population explodes, leading to overgrazing or overeating of resources, causing starvation and disease."
      },
      {
        "q": "Can prey become predators?",
        "a": "Yes, an animal can be prey for some predators while being predator for smaller animals."
      },
      {
        "q": "How do predators and prey populations affect each other?",
        "a": "High predator numbers decrease prey populations. Lower prey forces predators to migrate or starve, reducing predator numbers."
      }
    ]
  },
  {
    "slug": "producer-vs-consumer",
    "title": "Difference Between Producer and Consumer",
    "termA": "Producer",
    "termB": "Consumer",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Producers are organisms that manufacture their own food using sunlight through photosynthesis. Consumers are organisms that feed on other organisms to obtain energy and nutrients.",
    "table": [
      {
        "aspect": "Food Source",
        "a": "Make own food from sunlight",
        "b": "Consume other organisms for food"
      },
      {
        "aspect": "Energy Origin",
        "a": "Convert solar energy to chemical energy",
        "b": "Obtain chemical energy from food"
      },
      {
        "aspect": "Nutrition Type",
        "a": "Autotrophic organisms",
        "b": "Heterotrophic organisms"
      },
      {
        "aspect": "Trophic Level",
        "a": "First trophic level",
        "b": "Second trophic level or higher"
      },
      {
        "aspect": "Example",
        "a": "Plants, algae, cyanobacteria",
        "b": "Animals, fungi, most microorganisms"
      },
      {
        "aspect": "Role in Food Chain",
        "a": "Base of all food chains",
        "b": "Dependent on producers"
      }
    ],
    "keyPoints": [
      "All energy in an ecosystem originates from producers",
      "Consumers cannot exist without producers",
      "Energy transfers from producers through consumers",
      "Both are essential for ecosystem functionality"
    ],
    "faqs": [
      {
        "q": "Can consumers survive without producers?",
        "a": "No, consumers depend directly or indirectly on producers for all energy and nutrients in the ecosystem."
      },
      {
        "q": "Are decomposers producers or consumers?",
        "a": "Decomposers are separate organisms that break down dead matter; they are neither producers nor typical consumers."
      },
      {
        "q": "Why are producers important?",
        "a": "Producers are vital because they convert solar energy into usable chemical energy that sustains all life in ecosystems."
      }
    ]
  },
  {
    "slug": "autotroph-vs-heterotroph",
    "title": "Difference Between Autotroph and Heterotroph",
    "termA": "Autotroph",
    "termB": "Heterotroph",
    "category": "Biology",
    "classLevel": "9-10",
    "intro": "Autotrophs are organisms that produce their own food from inorganic substances using energy from sunlight or chemicals. Heterotrophs are organisms that obtain food by consuming other organisms or organic matter.",
    "table": [
      {
        "aspect": "Food Synthesis",
        "a": "Synthesize own food from inorganic materials",
        "b": "Cannot synthesize food; consume others"
      },
      {
        "aspect": "Energy Source",
        "a": "Use sunlight or chemical energy",
        "b": "Use energy stored in other organisms"
      },
      {
        "aspect": "Process",
        "a": "Photoautotrophs use photosynthesis",
        "b": "Obtain food through ingestion"
      },
      {
        "aspect": "Examples",
        "a": "Green plants, algae, photosynthetic bacteria",
        "b": "Animals, fungi, most bacteria"
      },
      {
        "aspect": "Dependency",
        "a": "Independent; need sunlight and minerals",
        "b": "Dependent on autotrophs for energy"
      },
      {
        "aspect": "Ecosystem Role",
        "a": "Producers forming food chain base",
        "b": "Consumers at various trophic levels"
      }
    ],
    "keyPoints": [
      "Autotrophs are self-feeders; heterotrophs are dependent feeders",
      "All heterotrophs ultimately depend on autotrophs for energy",
      "Photosynthetic autotrophs produce oxygen as byproduct",
      "Classification into autotrophs and heterotrophs is fundamental to ecology"
    ],
    "faqs": [
      {
        "q": "Can heterotrophs become autotrophs?",
        "a": "No, heterotrophs lack the biochemical machinery for photosynthesis or chemosynthesis required for autotrophy."
      },
      {
        "q": "Are all plants autotrophs?",
        "a": "Most plants are autotrophs, but some parasitic plants obtain nutrients from other plants using heterotrophic methods."
      },
      {
        "q": "What would happen if all autotrophs disappeared?",
        "a": "All heterotrophs would eventually die because autotrophs are the ultimate source of energy and oxygen for the entire ecosystem."
      }
    ]
  },
  {
    "slug": "endothermic-vs-ectothermic-animals",
    "title": "Difference Between Endothermic and Ectothermic Animals",
    "termA": "Endothermic Animal",
    "termB": "Ectothermic Animal",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Endothermic animals maintain constant body temperature through internal metabolic heat production. Ectothermic animals have body temperature that varies with the environment.",
    "table": [
      {
        "aspect": "Temperature Regulation",
        "a": "Generate heat internally via metabolism",
        "b": "Temperature depends on surroundings"
      },
      {
        "aspect": "Body Temperature",
        "a": "Constant and warm (birds and mammals)",
        "b": "Variable and cold-blooded"
      },
      {
        "aspect": "Metabolism",
        "a": "High metabolic rate for heat production",
        "b": "Low metabolic rate"
      },
      {
        "aspect": "Energy Requirement",
        "a": "Require more food and oxygen",
        "b": "Require less food and oxygen"
      },
      {
        "aspect": "Activity in Cold",
        "a": "Active and functional in cold",
        "b": "Sluggish and slow in cold"
      },
      {
        "aspect": "Example",
        "a": "Mammals, birds, some fish",
        "b": "Reptiles, amphibians, insects, fish"
      }
    ],
    "keyPoints": [
      "Endothermy allows survival in diverse temperature environments",
      "Ectothermy is energy-efficient in stable warm environments",
      "Endothermic animals have adaptations like fur and feathers",
      "Ectothermic animals bask in sun to increase activity"
    ],
    "faqs": [
      {
        "q": "Why do snakes move slowly in winter?",
        "a": "Snakes are ectothermic; their body temperature drops with environmental temperature, reducing metabolic rate and movement."
      },
      {
        "q": "Do endothermic animals always maintain the same temperature?",
        "a": "Most endothermic animals maintain relatively constant temperature, though some can lower it during hibernation or torpor."
      },
      {
        "q": "Which is more successful - endothermic or ectothermic animals?",
        "a": "Both are successful; endothermic animals dominate in cold regions while ectothermic animals thrive in warm environments."
      }
    ]
  },
  {
    "slug": "cold-blooded-vs-warm-blooded",
    "title": "Difference Between Cold-blooded and Warm-blooded Animals",
    "termA": "Cold-blooded Animal",
    "termB": "Warm-blooded Animal",
    "category": "Biology",
    "classLevel": "10",
    "intro": "Cold-blooded animals have body temperature that changes with environmental temperature and cannot regulate it internally. Warm-blooded animals maintain constant body temperature through internal heat production.",
    "table": [
      {
        "aspect": "Temperature Control",
        "a": "Cannot regulate body temperature internally",
        "b": "Regulate temperature through metabolism"
      },
      {
        "aspect": "Body Temperature",
        "a": "Variable; same as surrounding environment",
        "b": "Constant around 37 degrees C or stable"
      },
      {
        "aspect": "Thermoregulation",
        "a": "Behavioral thermoregulation (basking, shade-seeking)",
        "b": "Physiological thermoregulation (sweating, shivering)"
      },
      {
        "aspect": "Energy Efficiency",
        "a": "Energy-efficient; low food requirements",
        "b": "Energy-expensive; high food requirements"
      },
      {
        "aspect": "Geographical Distribution",
        "a": "Limited to warm regions",
        "b": "Can inhabit all climates and regions"
      },
      {
        "aspect": "Example",
        "a": "Reptiles, amphibians, fish, insects",
        "b": "Mammals, birds"
      }
    ],
    "keyPoints": [
      "Cold-blooded is a common term for ectothermic animals",
      "Warm-blooded is a common term for endothermic animals",
      "Cold-blooded animals cannot survive in very cold environments",
      "Warm-blooded animals can survive in diverse temperature zones"
    ],
    "faqs": [
      {
        "q": "Why do lizards sit in the sun?",
        "a": "Lizards are cold-blooded and must bask in sun to raise their body temperature for activity and metabolism."
      },
      {
        "q": "Can cold-blooded animals be active in winter?",
        "a": "Cold-blooded animals become inactive in winter as their body temperature drops, reducing metabolic activity."
      },
      {
        "q": "Is being warm-blooded always better?",
        "a": "Warm-blooded animals have advantages in cold environments but require more food. Cold-blooded animals are more energy-efficient in warm regions."
      }
    ]
  }
];

export const DIFF_CATEGORIES = (): string[] => [...new Set(DIFFERENCES.map((d) => d.category))];

export function getDifference(slug: string): DiffTopic | undefined {
  return DIFFERENCES.find((d) => d.slug === slug);
}

export const DIFF_SLUGS = (): string[] => DIFFERENCES.map((d) => d.slug);
