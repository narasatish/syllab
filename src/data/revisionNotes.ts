/**
 * revisionNotes.ts — "Revision Notes" SEO cluster (concise per-chapter notes for
 * fast CBSE exam revision). Pages at /revision-notes/{slug}.
 * Data is generated; keep notes accurate (exam content).
 */
export interface RnSection { heading: string; points: string[]; }
export interface RnTerm { term: string; meaning: string; }
export interface RnFaq { q: string; a: string; }
export interface RevisionNote {
  slug: string;
  classLevel: string;
  subject: string;
  chapter: string;
  intro: string;
  sections: RnSection[];
  keyTerms: RnTerm[];
  faqs: RnFaq[];
}

export const REVISION_NOTES: RevisionNote[] = [
  {
    "slug": "class-10-science-chemical-reactions-and-equations",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Chemical Reactions and Equations",
    "intro": "This chapter covers the representation of chemical reactions through equations and classification of different types of reactions based on their characteristics. Students learn to balance equations and understand physical and chemical changes that occur during reactions.",
    "sections": [
      {
        "heading": "Chemical Equation and Balancing",
        "points": [
          "A chemical equation represents a chemical reaction using symbols and formulas",
          "Balanced equation has equal number of atoms of each element on both sides",
          "Unbalanced equation is called skeletal equation",
          "Law of conservation of mass: matter is neither created nor destroyed"
        ]
      },
      {
        "heading": "Types of Chemical Reactions",
        "points": [
          "Combination reaction: A + B = AB (e.g., C + O2 = CO2)",
          "Decomposition reaction: AB = A + B (e.g., 2H2O = 2H2 + O2)",
          "Displacement reaction: A + BC = AC + B (more reactive element displaces less reactive)",
          "Double displacement reaction: AB + CD = AD + CB"
        ]
      },
      {
        "heading": "Oxidation and Reduction",
        "points": [
          "Oxidation is loss of electrons or gain of oxygen",
          "Reduction is gain of electrons or loss of oxygen",
          "Redox reaction involves both oxidation and reduction simultaneously",
          "Oxidizing agent causes oxidation, reducing agent causes reduction"
        ]
      },
      {
        "heading": "Effects of Oxidation Reactions",
        "points": [
          "Corrosion: deterioration of metals like rusting of iron",
          "Rancidity: oxidation of fats and oils causing unpleasant smell and taste",
          "Prevention through painting, oiling, coating with grease"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Chemical Equation",
        "meaning": "Symbolic representation of a chemical reaction showing reactants and products"
      },
      {
        "term": "Catalyst",
        "meaning": "A substance that speeds up a reaction without being consumed"
      },
      {
        "term": "Precipitate",
        "meaning": "An insoluble solid formed when two solutions react"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between physical and chemical change?",
        "a": "Physical change is reversible and involves change in state or appearance without forming new substances. Chemical change is irreversible, forms new substances with different properties."
      },
      {
        "q": "How do you balance a chemical equation?",
        "a": "Count atoms of each element on both sides. Use coefficients to make atoms equal on both sides. Never change subscripts in chemical formulas."
      }
    ]
  },
  {
    "slug": "class-10-science-acids-bases-and-salts",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Acids Bases and Salts",
    "intro": "This chapter explores the properties and reactions of acids, bases, and salts, which are fundamental substances in chemistry. Students learn about pH scale, indicators, and the neutralization process that forms salts.",
    "sections": [
      {
        "heading": "Acids and Bases",
        "points": [
          "Acids taste sour, turn blue litmus red, have pH less than 7",
          "Bases taste bitter, turn red litmus blue, have pH greater than 7",
          "pH scale ranges from 0 to 14; pH 7 is neutral",
          "Strong acids: HCl, H2SO4, HNO3; Strong bases: NaOH, KOH, Ca(OH)2"
        ]
      },
      {
        "heading": "Indicators and pH",
        "points": [
          "Indicators are natural or synthetic substances showing color change at different pH",
          "Litmus: red in acid, blue in base",
          "Methyl orange: red in acid, yellow in base",
          "Phenolphthalein: colorless in acid, pink in base"
        ]
      },
      {
        "heading": "Neutralization Reaction",
        "points": [
          "Acid + Base = Salt + Water",
          "HCl + NaOH = NaCl + H2O",
          "Neutralization is an exothermic reaction releasing heat",
          "pH of salt solution depends on strength of acid and base used"
        ]
      },
      {
        "heading": "Salts and their Properties",
        "points": [
          "Salts are ionic compounds formed from neutralization",
          "Sodium chloride (NaCl) is table salt used for food",
          "Calcium carbonate (CaCO3) is limestone used in construction",
          "Ammonium nitrate (NH4NO3) is used as fertilizer"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "pH",
        "meaning": "Measure of acidity or basicity on a scale of 0 to 14"
      },
      {
        "term": "Neutralization",
        "meaning": "Reaction between acid and base producing salt and water"
      },
      {
        "term": "Buffer Solution",
        "meaning": "Solution that resists change in pH when acid or base is added"
      }
    ],
    "faqs": [
      {
        "q": "How do you identify if a substance is acidic or basic?",
        "a": "Use litmus paper or pH scale. Acidic substances turn blue litmus red (pH < 7), basic substances turn red litmus blue (pH > 7)."
      },
      {
        "q": "What happens when an acid reacts with a base?",
        "a": "Neutralization occurs producing salt and water. Heat is released. The resulting solution has a pH closer to 7 depending on acid-base strength."
      }
    ]
  },
  {
    "slug": "class-10-science-metals-and-non-metals",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Metals and Non-metals",
    "intro": "This chapter distinguishes between metals and non-metals based on their physical and chemical properties. Students explore how metals and non-metals react with oxygen, water, and acids, and learn about their practical applications.",
    "sections": [
      {
        "heading": "Physical Properties",
        "points": [
          "Metals: lustrous, malleable, ductile, good conductors of heat and electricity",
          "Non-metals: dull, brittle, poor conductors except graphite",
          "Metals generally have high melting and boiling points",
          "Non-metals have low melting and boiling points (except carbon)"
        ]
      },
      {
        "heading": "Chemical Properties and Reactivity",
        "points": [
          "Metals react with oxygen to form metal oxides",
          "Non-metals react with oxygen to form non-metal oxides",
          "Reactivity series: K > Na > Ca > Mg > Al > C > Zn > Fe > Cu > Hg > Au",
          "More reactive metals displace less reactive metals from their salts"
        ]
      },
      {
        "heading": "Reactions with Water and Acids",
        "points": [
          "Active metals react with water: 2Na + 2H2O = 2NaOH + H2",
          "Metals react with dilute acids: Zn + H2SO4 = ZnSO4 + H2",
          "Non-metals do not react with water or dilute acids",
          "Copper and gold do not react with dilute acids"
        ]
      },
      {
        "heading": "Extraction and Applications",
        "points": [
          "Metals are extracted from ores through reduction processes",
          "Iron is extracted from iron oxide using coke and limestone",
          "Alloys are mixtures of metals: steel, bronze, brass",
          "Non-metals used for: fertilizers, fuels, disinfectants, medicines"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Malleable",
        "meaning": "Ability to be hammered into thin sheets"
      },
      {
        "term": "Ductile",
        "meaning": "Ability to be drawn into thin wires"
      },
      {
        "term": "Reactivity Series",
        "meaning": "Arrangement of metals in order of decreasing reactivity"
      }
    ],
    "faqs": [
      {
        "q": "Why are metals good conductors of electricity?",
        "a": "Metals have free electrons that can move easily through their structure, allowing electric current to flow."
      },
      {
        "q": "What is the difference between metals and non-metals?",
        "a": "Metals are lustrous, malleable, ductile, and conduct electricity. Non-metals are dull, brittle, and poor conductors except graphite."
      }
    ]
  },
  {
    "slug": "class-10-science-carbon-and-its-compounds",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Carbon and its Compounds",
    "intro": "This chapter focuses on carbon, its unique properties, and the vast variety of compounds it forms. Students learn about covalent bonding, carbon chains, and the classification of organic compounds based on functional groups.",
    "sections": [
      {
        "heading": "Bonding in Carbon",
        "points": [
          "Carbon has 4 valence electrons and forms 4 covalent bonds",
          "Covalent bonds are formed by sharing of electrons",
          "Carbon can form single, double, and triple bonds",
          "Tetravalency and catenation allow formation of diverse compounds"
        ]
      },
      {
        "heading": "Hydrocarbons",
        "points": [
          "Hydrocarbons contain only carbon and hydrogen atoms",
          "Saturated hydrocarbons have single bonds: alkanes (CnH2n+2)",
          "Unsaturated hydrocarbons have double or triple bonds: alkenes (CnH2n), alkynes (CnH2n-2)",
          "Methane (CH4), ethane (C2H6), ethene (C2H4), ethyne (C2H2)"
        ]
      },
      {
        "heading": "Functional Groups",
        "points": [
          "Hydroxyl group (-OH) in alcohols and phenols",
          "Carboxyl group (-COOH) in carboxylic acids",
          "Aldehyde group (-CHO) in aldehydes",
          "Ketone group (C=O) in ketones"
        ]
      },
      {
        "heading": "Reactions and Properties",
        "points": [
          "Combustion: CnH2n + 3n/2 O2 = n CO2 + n H2O",
          "Addition reactions: unsaturated compounds add atoms across double/triple bonds",
          "Esterification: alcohol + carboxylic acid = ester + water",
          "Saponification: ester + base = alcohol + salt"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Catenation",
        "meaning": "Ability of carbon to bond with itself forming long chains"
      },
      {
        "term": "Functional Group",
        "meaning": "Atom or group of atoms that determines properties of organic compounds"
      },
      {
        "term": "Isomer",
        "meaning": "Compounds with same molecular formula but different structural arrangements"
      }
    ],
    "faqs": [
      {
        "q": "Why does carbon form so many compounds?",
        "a": "Carbon has 4 valence electrons, can form 4 covalent bonds, exhibits catenation, and can form single, double, and triple bonds with other atoms."
      },
      {
        "q": "What is the difference between saturated and unsaturated hydrocarbons?",
        "a": "Saturated hydrocarbons have only single bonds (alkanes), while unsaturated hydrocarbons have double or triple bonds (alkenes and alkynes)."
      }
    ]
  },
  {
    "slug": "class-10-science-life-processes",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Life Processes",
    "intro": "This chapter covers the fundamental processes that maintain life in organisms including nutrition, respiration, and circulation. Students learn how organisms obtain and utilize energy for growth, maintenance, and reproduction.",
    "sections": [
      {
        "heading": "Nutrition",
        "points": [
          "Autotrophic nutrition: organisms synthesize own food (plants use photosynthesis)",
          "Heterotrophic nutrition: organisms consume other organisms for food",
          "Photosynthesis: 6CO2 + 6H2O + light = C6H12O6 + 6O2",
          "Chlorophyll in chloroplasts absorbs light energy in leaves"
        ]
      },
      {
        "heading": "Respiration",
        "points": [
          "Aerobic respiration: C6H12O6 + 6O2 = 6CO2 + 6H2O + energy (38 ATP)",
          "Occurs in mitochondria releasing large amounts of energy",
          "Anaerobic respiration: occurs without oxygen in muscles during exercise",
          "Lactic acid fermentation produces lactate causing muscle fatigue"
        ]
      },
      {
        "heading": "Circulation",
        "points": [
          "Heart pumps blood through arteries to body and veins back to heart",
          "Pulmonary circulation: heart to lungs and back",
          "Systemic circulation: heart to body and back",
          "Blood pressure varies: systolic during heart contraction, diastolic during relaxation"
        ]
      },
      {
        "heading": "Excretion",
        "points": [
          "Kidneys filter blood to remove nitrogenous wastes forming urine",
          "Urine stored in bladder and eliminated through urethra",
          "Lungs excrete carbon dioxide during respiration",
          "Skin excretes sweat containing water and salts"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Photosynthesis",
        "meaning": "Process where plants convert light energy into chemical energy in glucose"
      },
      {
        "term": "ATP",
        "meaning": "Adenosine triphosphate - energy currency of cells"
      },
      {
        "term": "Mitochondria",
        "meaning": "Powerhouse of cell where aerobic respiration occurs"
      }
    ],
    "faqs": [
      {
        "q": "Why do we need respiration?",
        "a": "Respiration breaks down glucose to release energy in the form of ATP which is used for all life processes including movement, growth, and maintenance."
      },
      {
        "q": "What is the difference between photosynthesis and respiration?",
        "a": "Photosynthesis uses light energy to make glucose, while respiration breaks down glucose to release energy. Photosynthesis occurs in chloroplasts, respiration in mitochondria."
      }
    ]
  },
  {
    "slug": "class-10-science-control-and-coordination",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Control and Coordination",
    "intro": "This chapter explores how organisms sense their environment and coordinate responses through the nervous and endocrine systems. Students learn about nerve impulses, hormones, and reflex arcs in maintaining homeostasis.",
    "sections": [
      {
        "heading": "Nervous System",
        "points": [
          "Central nervous system: brain and spinal cord",
          "Peripheral nervous system: nerves connecting CNS to body",
          "Somatic system: controls voluntary movements",
          "Autonomic system: controls involuntary functions like heartbeat and digestion"
        ]
      },
      {
        "heading": "Neurons and Nerve Impulses",
        "points": [
          "Neuron consists of cell body, dendrites, and axon",
          "Dendrites receive signals, axon transmits signals",
          "Synapse is gap between neurons where neurotransmitters transmit signals",
          "Nerve impulse travels as electrical and chemical signals"
        ]
      },
      {
        "heading": "Reflex Arc",
        "points": [
          "Reflex is involuntary response to stimulus without conscious thought",
          "Pathway: receptor -> sensory neuron -> spinal cord -> motor neuron -> effector",
          "Reflex arc allows quick response protecting body from harm",
          "Example: touching hot surface causes withdrawal before brain perceives pain"
        ]
      },
      {
        "heading": "Hormones and Endocrine System",
        "points": [
          "Hormones are chemical messengers secreted by endocrine glands",
          "Insulin regulates blood glucose levels",
          "Thyroid hormone controls metabolism",
          "Adrenaline prepares body for fight or flight response"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Neurotransmitter",
        "meaning": "Chemical messenger that transmits signals across synapse"
      },
      {
        "term": "Hormone",
        "meaning": "Chemical substance produced by endocrine glands regulating body functions"
      },
      {
        "term": "Reflex",
        "meaning": "Involuntary response to stimulus without conscious involvement"
      }
    ],
    "faqs": [
      {
        "q": "How does the nervous system control body functions?",
        "a": "Receptors sense stimuli and send signals via sensory neurons to brain/spinal cord. These process information and send signals via motor neurons to muscles causing response."
      },
      {
        "q": "What is the difference between nervous and endocrine control?",
        "a": "Nervous system provides quick responses via electrical signals, endocrine system provides slower sustained responses via hormones in bloodstream."
      }
    ]
  },
  {
    "slug": "class-10-science-how-do-organisms-reproduce",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "How do Organisms Reproduce",
    "intro": "This chapter covers both sexual and asexual reproduction methods in plants and animals. Students learn about flower structure, fertilization, and various reproductive strategies organisms use for continuation of species.",
    "sections": [
      {
        "heading": "Asexual Reproduction",
        "points": [
          "Single parent produces offspring genetically identical to parent",
          "Binary fission: bacteria divide into two identical cells",
          "Budding: yeast and hydra produce buds that separate",
          "Vegetative reproduction: runners in strawberry, tubers in potato, bulbs in onion"
        ]
      },
      {
        "heading": "Sexual Reproduction in Plants",
        "points": [
          "Flower contains male parts (stamen) and female parts (pistil)",
          "Pollen from anther pollinates stigma",
          "Double fertilization: nucleus fuses with egg, polar nuclei fuse with sperm",
          "Ovule develops into seed, ovary develops into fruit"
        ]
      },
      {
        "heading": "Sexual Reproduction in Animals",
        "points": [
          "Sperm from male fertilizes egg from female",
          "Fertilized egg develops into zygote then embryo",
          "Gestation period: time from fertilization to birth",
          "Viviparity: live birth with placental connection (mammals)"
        ]
      },
      {
        "heading": "Menstrual Cycle and Contraception",
        "points": [
          "Menstrual cycle lasts 28 days with phases: menstruation, follicular, ovulation, luteal",
          "Ovulation releases egg around day 14",
          "Contraceptive methods: condoms, oral contraceptives, IUD",
          "Sexually transmitted infections can affect reproductive health"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Pollination",
        "meaning": "Transfer of pollen from anther to stigma of flower"
      },
      {
        "term": "Fertilization",
        "meaning": "Fusion of male and female gametes forming zygote"
      },
      {
        "term": "Gamete",
        "meaning": "Sex cell with haploid number of chromosomes (sperm or egg)"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between sexual and asexual reproduction?",
        "a": "Asexual reproduction involves one parent producing identical offspring without gamete fusion. Sexual reproduction involves two parents with gamete fusion creating genetic variation."
      },
      {
        "q": "Why is sexual reproduction advantageous despite being slower?",
        "a": "Sexual reproduction produces genetic variation in offspring increasing chance of survival in changing environments and adaptation to new conditions."
      }
    ]
  },
  {
    "slug": "class-10-science-heredity-and-evolution",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Heredity and Evolution",
    "intro": "This chapter explores how traits are inherited from parents to offspring through genes and DNA. Students learn about dominant and recessive traits, the work of Mendel, and evidence supporting evolution.",
    "sections": [
      {
        "heading": "Genes and Inheritance",
        "points": [
          "Gene is unit of heredity controlling a particular trait",
          "Dominant allele expresses trait when present with recessive allele",
          "Recessive allele expresses trait only when present with another recessive",
          "Homozygous: two identical alleles, Heterozygous: two different alleles"
        ]
      },
      {
        "heading": "Mendels Laws",
        "points": [
          "Law of Segregation: alleles separate during gamete formation",
          "Law of Independent Assortment: different traits assort independently",
          "Test cross: heterozygous crossed with homozygous recessive",
          "Monohybrid cross: Aa x Aa produces 3:1 phenotypic ratio"
        ]
      },
      {
        "heading": "Sex Determination",
        "points": [
          "Humans have 23 pairs of chromosomes including one pair of sex chromosomes",
          "Males: XY (Y from father), Females: XX",
          "Sex-linked traits: color blindness, hemophilia linked to X chromosome",
          "Sex determination occurs at fertilization"
        ]
      },
      {
        "heading": "Evolution and Natural Selection",
        "points": [
          "Evolution: gradual change in species over long periods",
          "Natural selection: organisms better adapted survive and reproduce",
          "Evidence: fossil records, homologous structures, DNA similarities",
          "Speciation: formation of new species through divergent evolution"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Allele",
        "meaning": "Different form of a gene for a particular trait"
      },
      {
        "term": "Phenotype",
        "meaning": "Observable characteristics of an organism"
      },
      {
        "term": "Genotype",
        "meaning": "Genetic makeup of an organism"
      }
    ],
    "faqs": [
      {
        "q": "How did Mendel explain inheritance?",
        "a": "Mendel proposed that traits are controlled by pairs of factors (genes/alleles). During reproduction, alleles separate and recombine in offspring following predictable ratios."
      },
      {
        "q": "What is natural selection?",
        "a": "Natural selection is the process where organisms with traits better suited to environment survive and reproduce, passing beneficial traits to offspring over generations."
      }
    ]
  },
  {
    "slug": "class-10-science-light-reflection-and-refraction",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Light Reflection and Refraction",
    "intro": "This chapter examines how light behaves when it encounters surfaces and different media. Students learn about mirrors, lenses, and the laws governing reflection and refraction essential for understanding optical instruments.",
    "sections": [
      {
        "heading": "Reflection of Light",
        "points": [
          "Law of Reflection: angle of incidence equals angle of reflection",
          "Normal is perpendicular line at point of incidence",
          "Plane mirror produces virtual, erect, same-size image",
          "Curved mirrors: concave (converging) and convex (diverging)"
        ]
      },
      {
        "heading": "Curved Mirrors",
        "points": [
          "Focal length f = R/2 where R is radius of curvature",
          "Mirror formula: 1/f = 1/v + 1/u",
          "Magnification m = -v/u = h'/h",
          "Concave mirror used in torches, telescopes; convex in vehicle mirrors"
        ]
      },
      {
        "heading": "Refraction of Light",
        "points": [
          "Refraction: bending of light when entering different medium",
          "Snells Law: n1 sin θ1 = n2 sin θ2",
          "Refractive index n = c/v where c is light in vacuum, v in medium",
          "Critical angle: angle beyond which total internal reflection occurs"
        ]
      },
      {
        "heading": "Lenses",
        "points": [
          "Convex lens converges light rays to focal point",
          "Concave lens diverges light rays appearing to come from focal point",
          "Lens formula: 1/f = 1/v + 1/u (same as mirrors)",
          "Power of lens P = 1/f in diopters (D)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Focal Length",
        "meaning": "Distance from lens/mirror to focal point where light rays converge"
      },
      {
        "term": "Real Image",
        "meaning": "Image formed where light rays actually converge, inverted and magnified"
      },
      {
        "term": "Virtual Image",
        "meaning": "Image formed where light rays appear to come from, erect and diminished"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between reflection and refraction?",
        "a": "Reflection is bouncing of light from surface following law of reflection. Refraction is bending of light entering different medium following Snells law."
      },
      {
        "q": "How do concave and convex lenses differ?",
        "a": "Concave lens diverges light rays and forms virtual images. Convex lens converges light rays and can form real or virtual images depending on object position."
      }
    ]
  },
  {
    "slug": "class-10-science-the-human-eye-and-colourful-world",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "The Human Eye and Colourful World",
    "intro": "This chapter explores the anatomy of the human eye and how it functions to form images. Students learn about common defects and corrections, and the physics of color and light in our world.",
    "sections": [
      {
        "heading": "Structure of Human Eye",
        "points": [
          "Cornea and lens focus light onto retina",
          "Iris controls pupil size regulating light entering eye",
          "Retina contains rod cells (black-white vision) and cone cells (color vision)",
          "Optic nerve transmits signals from retina to brain"
        ]
      },
      {
        "heading": "Accommodation and Defects",
        "points": [
          "Accommodation: lens changes shape to focus objects at different distances",
          "Myopia (short-sight): image forms before retina, corrected by concave lens",
          "Hyperopia (long-sight): image forms behind retina, corrected by convex lens",
          "Presbyopia: age-related loss of accommodation, corrected by bifocals"
        ]
      },
      {
        "heading": "Dispersion of Light",
        "points": [
          "Dispersion: separation of white light into colors (VIBGYOR)",
          "Different colors have different refractive indices and wavelengths",
          "Violet has shortest wavelength and highest frequency",
          "Red has longest wavelength and lowest frequency"
        ]
      },
      {
        "heading": "Phenomena Related to Light",
        "points": [
          "Scattering: deflection of light by particles in atmosphere",
          "Rayleigh scattering: intensity inversely proportional to fourth power of wavelength",
          "Sky appears blue due to scattering of blue light",
          "Sunset appears red due to scattering of blue light away from line of sight"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Accommodation",
        "meaning": "Ability of eye lens to change shape for focusing objects at different distances"
      },
      {
        "term": "Myopia",
        "meaning": "Defect where distant objects appear blurred due to image forming before retina"
      },
      {
        "term": "Dispersion",
        "meaning": "Separation of white light into colors due to different refractive indices"
      }
    ],
    "faqs": [
      {
        "q": "Why does the sky appear blue during day and red during sunset?",
        "a": "Blue light has short wavelength and scatters more (Rayleigh scattering). During day, scattered blue dominates. At sunset, blue scatters away and red light reaches us."
      },
      {
        "q": "How does accommodation help us see objects clearly?",
        "a": "Ciliary muscles change lens shape making it thicker for near objects and thinner for distant objects. This changes focal length to form sharp image on retina."
      }
    ]
  },
  {
    "slug": "class-10-science-electricity",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Electricity",
    "intro": "This chapter covers electric current, circuits, and fundamental laws governing electricity. Students learn about Ohms law, power, and energy consumption in household and industrial applications.",
    "sections": [
      {
        "heading": "Electric Current and Potential Difference",
        "points": [
          "Electric current I = Q/t where Q is charge in coulombs, t is time",
          "Potential difference V = W/Q where W is work done in joules",
          "1 ampere = flow of 1 coulomb per second",
          "EMF (electromotive force) is energy provided per unit charge"
        ]
      },
      {
        "heading": "Ohms Law and Resistance",
        "points": [
          "Ohms Law: V = IR where V is voltage, I is current, R is resistance",
          "Resistance R = rho * L/A where rho is resistivity, L is length, A is area",
          "Resistivity depends on material and temperature",
          "Conductors have low resistivity, insulators have high resistivity"
        ]
      },
      {
        "heading": "Circuit Analysis",
        "points": [
          "Series connection: same current through all components, voltages add",
          "Parallel connection: same voltage across all components, currents add",
          "Total resistance in series: R = R1 + R2 + R3",
          "Total resistance in parallel: 1/R = 1/R1 + 1/R2 + 1/R3"
        ]
      },
      {
        "heading": "Power and Energy",
        "points": [
          "Power P = VI = I2R = V2/R in watts",
          "Electrical energy E = Pt = VIt in joules",
          "Unit of energy: kilowatt-hour (kWh) = 3.6 x 10^6 joules",
          "Heat produced in resistor: H = I2Rt (Joules law)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Electric Current",
        "meaning": "Flow of electric charge through a conductor measured in amperes"
      },
      {
        "term": "Resistance",
        "meaning": "Opposition offered by conductor to flow of electric current"
      },
      {
        "term": "EMF",
        "meaning": "Electromotive force - energy provided by source per unit charge"
      }
    ],
    "faqs": [
      {
        "q": "How is Ohms law useful in circuit analysis?",
        "a": "Ohms law (V = IR) relates voltage, current, and resistance allowing calculation of any unknown if other two are known. Essential for designing and analyzing circuits."
      },
      {
        "q": "What is the difference between series and parallel circuits?",
        "a": "In series circuit, current flows through one path and same current through all components. In parallel circuit, current splits among multiple paths with same voltage across each."
      }
    ]
  },
  {
    "slug": "class-10-science-magnetic-effects-of-electric-current",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Magnetic Effects of Electric Current",
    "intro": "This chapter explores the relationship between electric current and magnetism, showing how moving charges create magnetic fields. Students learn about electromagnets, electric motors, and electromagnetic induction.",
    "sections": [
      {
        "heading": "Magnetic Field and Oersteds Law",
        "points": [
          "Electric current produces magnetic field around conductor",
          "Direction determined by right-hand rule: thumb in current direction, fingers show field direction",
          "Magnetic field stronger closer to conductor",
          "Straight conductor produces circular field around it"
        ]
      },
      {
        "heading": "Electromagnets",
        "points": [
          "Coil of wire carrying current acts as magnet",
          "Stronger field with more turns and higher current",
          "Iron core inside coil increases magnetic strength significantly",
          "Used in: electric bells, relays, cranes for lifting iron"
        ]
      },
      {
        "heading": "Electric Motors",
        "points": [
          "Motor effect: force on current-carrying conductor in magnetic field",
          "Force F = BIL where B is magnetic field, I is current, L is length",
          "Fleming's left-hand rule: thumb force, index field, middle current",
          "Commutator reverses current direction for continuous rotation"
        ]
      },
      {
        "heading": "Electromagnetic Induction",
        "points": [
          "Changing magnetic field induces EMF in conductor",
          "Faradays law: EMF induced proportional to rate of change of flux",
          "Lenzs law: induced current opposes change causing it",
          "Generators convert mechanical energy to electrical energy"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Magnetic Field",
        "meaning": "Region around magnet or current where magnetic force is experienced"
      },
      {
        "term": "Electromagnet",
        "meaning": "Magnet produced by electric current in coil of wire"
      },
      {
        "term": "Electromagnetic Induction",
        "meaning": "Production of EMF in conductor due to changing magnetic field"
      }
    ],
    "faqs": [
      {
        "q": "How does an electric motor work?",
        "a": "Current through coil in magnetic field experiences force (Fleming's left-hand rule). Commutator reverses current as coil rotates, maintaining force in same direction causing continuous rotation."
      },
      {
        "q": "What is the difference between motor and generator?",
        "a": "Motor converts electrical energy to mechanical energy using magnetic force on current. Generator converts mechanical energy to electrical energy through electromagnetic induction."
      }
    ]
  },
  {
    "slug": "class-10-science-our-environment",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Our Environment",
    "intro": "This chapter examines the components of the environment and relationships between organisms and their surroundings. Students learn about ecosystems, food chains, biodiversity, and human impact on the environment.",
    "sections": [
      {
        "heading": "Ecosystem",
        "points": [
          "Ecosystem is community of organisms and their physical environment",
          "Biotic components: plants, animals, microorganisms",
          "Abiotic components: soil, water, air, light, temperature",
          "Biosphere is all ecosystems combined on Earth"
        ]
      },
      {
        "heading": "Food Chains and Food Webs",
        "points": [
          "Food chain: linear sequence of organisms transferring energy (producer -> consumer -> decomposer)",
          "Producers are plants synthesizing food from sunlight",
          "Consumers: herbivores (primary), carnivores (secondary), omnivores",
          "Food web: interconnected food chains in an ecosystem"
        ]
      },
      {
        "heading": "Energy Flow",
        "points": [
          "Only 10% of energy transferred from one level to next (90% lost as heat)",
          "Pyramids of energy show decreasing energy at higher trophic levels",
          "Biomagnification: toxic substances concentrated in higher trophic levels",
          "Waste products accumulate in organisms and bioaccumulate in food chain"
        ]
      },
      {
        "heading": "Biodiversity and Conservation",
        "points": [
          "Biodiversity: variety of species in ecosystem",
          "Threats: habitat loss, pollution, overexploitation, invasive species",
          "Conservation strategies: protected areas, breeding programs, legal protection",
          "Sustainable development: meeting present needs without harming future generations"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Ecosystem",
        "meaning": "Community of organisms and their physical environment functioning as a unit"
      },
      {
        "term": "Biodiversity",
        "meaning": "Variety of different species, genes, and ecosystems in a region"
      },
      {
        "term": "Decomposer",
        "meaning": "Organism that breaks down dead matter returning nutrients to soil"
      }
    ],
    "faqs": [
      {
        "q": "Why is there loss of energy in food chain?",
        "a": "Only 10% of energy is used for growth and body functions, rest 90% is lost as heat during metabolic processes. This is why food chains have limited length."
      },
      {
        "q": "How do humans impact the environment?",
        "a": "Through pollution, deforestation, habitat destruction, overexploitation of resources, and introduction of invasive species causing biodiversity loss and ecosystem degradation."
      }
    ]
  },
  {
    "slug": "class-10-maths-real-numbers",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Real Numbers",
    "intro": "This chapter explores the properties of real numbers including rational and irrational numbers, Euclids algorithm, and the Fundamental Theorem of Arithmetic. Students learn about prime factorization and HCF-LCM relationships.",
    "sections": [
      {
        "heading": "Rational and Irrational Numbers",
        "points": [
          "Rational numbers can be expressed as p/q where p and q are integers and q is not zero",
          "Irrational numbers cannot be expressed as p/q (e.g., sqrt(2), pi, e)",
          "Decimal expansion of rational is terminating or non-terminating repeating",
          "Decimal expansion of irrational is non-terminating non-repeating"
        ]
      },
      {
        "heading": "Euclids Division Algorithm",
        "points": [
          "For positive integers a and b: a = bq + r where 0 <= r < b",
          "Used to find HCF (Highest Common Factor) of two numbers",
          "Also called division algorithm",
          "Example: HCF(4052, 12576) can be found by successive division"
        ]
      },
      {
        "heading": "Fundamental Theorem of Arithmetic",
        "points": [
          "Every integer greater than 1 is either prime or product of primes",
          "Prime factorization of a number is unique",
          "Example: 60 = 2 x 2 x 3 x 5",
          "Used to find HCF and LCM of numbers"
        ]
      },
      {
        "heading": "HCF and LCM Relations",
        "points": [
          "HCF (a, b) x LCM (a, b) = a x b",
          "HCF obtained from lowest powers of common prime factors",
          "LCM obtained from highest powers of all prime factors",
          "Example: 12 = 2^2 x 3, 18 = 2 x 3^2, HCF = 6, LCM = 36"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Prime Number",
        "meaning": "Natural number greater than 1 having exactly two factors: 1 and itself"
      },
      {
        "term": "HCF",
        "meaning": "Highest Common Factor - greatest number dividing given numbers"
      },
      {
        "term": "LCM",
        "meaning": "Least Common Multiple - smallest number divisible by given numbers"
      }
    ],
    "faqs": [
      {
        "q": "How do you find HCF using Euclids algorithm?",
        "a": "Apply division algorithm repeatedly: a = bq + r, then b = rq1 + r1, and so on until remainder is 0. The last non-zero remainder is the HCF."
      },
      {
        "q": "Why is sqrt(2) irrational?",
        "a": "Assume sqrt(2) = p/q in lowest terms. Then 2q^2 = p^2, so p^2 is even, p is even. Let p = 2k, then q^2 = 2k^2, so q is also even. Contradiction, so sqrt(2) is irrational."
      }
    ]
  },
  {
    "slug": "class-10-maths-polynomials",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Polynomials",
    "intro": "This chapter covers polynomial expressions, their degrees, roots, and factorization methods. Students learn about zeros of polynomials, factor theorem, and division algorithm for polynomials.",
    "sections": [
      {
        "heading": "Polynomial Basics",
        "points": [
          "Polynomial is expression of form a0 + a1x + a2x^2 + ... + anxn where an is not zero",
          "Degree of polynomial is highest power of variable",
          "Linear polynomial: degree 1, Quadratic: degree 2, Cubic: degree 3",
          "Coefficient is numerical factor of each term"
        ]
      },
      {
        "heading": "Zeros and Factor Theorem",
        "points": [
          "Zero of polynomial is value of variable making polynomial equal to zero",
          "Factor theorem: (x - a) is factor of p(x) if p(a) = 0",
          "Remainder theorem: when p(x) divided by (x - a), remainder is p(a)",
          "Quadratic p(x) = ax^2 + bx + c has two zeros (real or complex)"
        ]
      },
      {
        "heading": "Factorization Methods",
        "points": [
          "Splitting middle term: for ax^2 + bx + c, find two numbers whose product is ac and sum is b",
          "Completing square: x^2 + bx + c = (x + b/2)^2 - b^2/4 + c",
          "Using identities: (a+b)^2, (a-b)^2, a^2-b^2, a^3+b^3, a^3-b^3",
          "Polynomial division: divide higher degree by lower degree polynomial"
        ]
      },
      {
        "heading": "Relationship Between Zeros and Coefficients",
        "points": [
          "For quadratic ax^2 + bx + c with zeros r and s: r + s = -b/a, rs = c/a",
          "For cubic ax^3 + bx^2 + cx + d with zeros r, s, t: r+s+t = -b/a, rs+st+tr = c/a, rst = -d/a",
          "Sum of zeros = -b/a, Product of zeros = c/a for quadratic",
          "Can form polynomial if zeros are known"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Polynomial",
        "meaning": "Expression of form a0 + a1x + a2x^2 + ... with variables and coefficients"
      },
      {
        "term": "Degree",
        "meaning": "Highest power of variable in polynomial"
      },
      {
        "term": "Zero",
        "meaning": "Value of variable making polynomial equal to zero"
      }
    ],
    "faqs": [
      {
        "q": "What is the relationship between zeros and coefficients?",
        "a": "For quadratic ax^2 + bx + c with zeros r and s: sum = -b/a and product = c/a. This helps find polynomial if zeros are known."
      },
      {
        "q": "How do you factorize x^2 + 5x + 6?",
        "a": "Find two numbers whose product is 6 and sum is 5. These are 2 and 3. So x^2 + 5x + 6 = (x + 2)(x + 3)."
      }
    ]
  },
  {
    "slug": "class-10-maths-pair-of-linear-equations-in-two-variables",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Pair of Linear Equations in Two Variables",
    "intro": "This chapter focuses on systems of two linear equations with two variables. Students learn graphical and algebraic methods to solve them and understand consistency of systems.",
    "sections": [
      {
        "heading": "Linear Equation Form",
        "points": [
          "General form: ax + by + c = 0 where a, b, c are real and a, b not both zero",
          "Pair of linear equations: a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0",
          "Graph of linear equation is a straight line",
          "Solution is ordered pair (x, y) satisfying both equations"
        ]
      },
      {
        "heading": "Graphical Method",
        "points": [
          "Plot both lines on coordinate plane",
          "If lines intersect at one point: unique solution (consistent)",
          "If lines coincide: infinite solutions (dependent consistent)",
          "If lines parallel: no solution (inconsistent)"
        ]
      },
      {
        "heading": "Algebraic Methods",
        "points": [
          "Substitution method: solve one equation for variable, substitute in other",
          "Elimination method: multiply equations to make coefficient equal, then subtract",
          "Cross-multiplication method: for a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0",
          "x = (b1c2 - b2c1)/(a1b2 - a2b1), y = (c1a2 - c2a1)/(a1b2 - a2b1)"
        ]
      },
      {
        "heading": "Consistency and Ratios",
        "points": [
          "Consistent system has at least one solution",
          "Inconsistent system has no solution",
          "For a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0:",
          "If a1/a2 = b1/b2 = c1/c2: infinite solutions",
          "If a1/a2 = b1/b2 ≠ c1/c2: no solution",
          "If a1/a2 ≠ b1/b2: unique solution"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Linear Equation",
        "meaning": "Equation of form ax + by + c = 0 representing a straight line"
      },
      {
        "term": "Consistent System",
        "meaning": "System of equations having at least one solution"
      },
      {
        "term": "Inconsistent System",
        "meaning": "System of equations having no solution"
      }
    ],
    "faqs": [
      {
        "q": "How do you check if a pair of linear equations has unique solution?",
        "a": "Calculate the ratio a1/a2. If a1/a2 ≠ b1/b2, then the system has unique solution. Alternatively, find determinant: if a1b2 - a2b1 ≠ 0, unique solution exists."
      },
      {
        "q": "What does it mean if lines are parallel?",
        "a": "If two lines are parallel, they never meet. So the system has no solution and is inconsistent. This occurs when a1/a2 = b1/b2 but ≠ c1/c2."
      }
    ]
  },
  {
    "slug": "class-10-maths-quadratic-equations",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Quadratic Equations",
    "intro": "This chapter explores quadratic equations of the form ax^2 + bx + c = 0. Students learn solution methods including factorization and quadratic formula, and applications involving word problems.",
    "sections": [
      {
        "heading": "Quadratic Equation Basics",
        "points": [
          "Standard form: ax^2 + bx + c = 0 where a ≠ 0",
          "Degree is 2, having at most 2 real roots",
          "If b = 0: ax^2 + c = 0 called pure quadratic",
          "If c = 0: ax^2 + bx = 0 called incomplete quadratic"
        ]
      },
      {
        "heading": "Solution by Factorization",
        "points": [
          "Factorize ax^2 + bx + c into product of linear factors",
          "Set each factor equal to zero and solve",
          "Works when roots are rational and can be easily found",
          "Example: x^2 - 5x + 6 = 0 becomes (x-2)(x-3) = 0, so x = 2 or 3"
        ]
      },
      {
        "heading": "Quadratic Formula",
        "points": [
          "For ax^2 + bx + c = 0: x = (-b ± sqrt(b^2 - 4ac)) / 2a",
          "Discriminant D = b^2 - 4ac determines nature of roots",
          "D > 0: two distinct real roots",
          "D = 0: two equal real roots",
          "D < 0: no real roots (two complex roots)"
        ]
      },
      {
        "heading": "Applications",
        "points": [
          "Speed and distance problems: set up quadratic from given conditions",
          "Geometry problems: area, perimeter conditions lead to quadratic",
          "Ages and work problems converted to quadratic equations",
          "Check that roots are valid for given problem context"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Quadratic Equation",
        "meaning": "Polynomial equation of degree 2 in the form ax^2 + bx + c = 0"
      },
      {
        "term": "Discriminant",
        "meaning": "Value b^2 - 4ac determining nature of roots of quadratic"
      },
      {
        "term": "Roots",
        "meaning": "Values of variable satisfying the quadratic equation"
      }
    ],
    "faqs": [
      {
        "q": "When do quadratic equations have no real roots?",
        "a": "When discriminant D = b^2 - 4ac < 0. In this case, roots are complex (involve imaginary unit i)."
      },
      {
        "q": "How do you solve x^2 - 4x + 3 = 0?",
        "a": "By factorization: (x-1)(x-3) = 0, so x = 1 or 3. Or using formula: x = (4 ± sqrt(16-12))/2 = (4 ± 2)/2, giving x = 3 or 1."
      }
    ]
  },
  {
    "slug": "class-10-maths-arithmetic-progressions",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Arithmetic Progressions",
    "intro": "This chapter covers arithmetic progressions where consecutive terms have constant difference. Students learn formulas for nth term, sum of n terms, and applications in various problems.",
    "sections": [
      {
        "heading": "AP Basics",
        "points": [
          "Arithmetic Progression is sequence where difference between consecutive terms is constant",
          "Common difference d = a2 - a1 = a3 - a2 = ... = constant",
          "General form: a, a+d, a+2d, a+3d, ... where a is first term",
          "nth term denoted as an or Tn"
        ]
      },
      {
        "heading": "nth Term Formula",
        "points": [
          "an = a + (n-1)d where a is first term, d is common difference, n is term number",
          "Used to find any term if a and d are known",
          "Also used to find n if an and d are known",
          "Can be rearranged: d = (an - a)/(n-1)"
        ]
      },
      {
        "heading": "Sum of n Terms",
        "points": [
          "Sn = n/2 [2a + (n-1)d]",
          "Alternative formula: Sn = n/2 [a + l] where l = an is last term",
          "Useful for finding sum of arithmetic sequences",
          "Example: sum of first 10 natural numbers = 10/2 [1 + 10] = 55"
        ]
      },
      {
        "heading": "Applications",
        "points": [
          "Finding arithmetic mean between two numbers: a, A, b are in AP, then A = (a+b)/2",
          "Inserting n arithmetic means between two numbers",
          "Real-life problems: savings increasing by fixed amount, distances covered, etc.",
          "Identifying if sequence is AP: check if differences are equal"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Arithmetic Progression",
        "meaning": "Sequence where difference between consecutive terms is constant"
      },
      {
        "term": "Common Difference",
        "meaning": "Constant difference d between consecutive terms in AP"
      },
      {
        "term": "nth Term",
        "meaning": "General term an = a + (n-1)d representing any term in progression"
      }
    ],
    "faqs": [
      {
        "q": "How do you find the sum of an AP?",
        "a": "Use formula Sn = n/2 [2a + (n-1)d] where n is number of terms, a is first term, d is common difference. Alternatively, Sn = n/2 [first term + last term]."
      },
      {
        "q": "What is the 10th term of AP 2, 7, 12, 17, ...?",
        "a": "Here a = 2, d = 5. Using an = a + (n-1)d: a10 = 2 + 9(5) = 2 + 45 = 47."
      }
    ]
  },
  {
    "slug": "class-10-maths-triangles",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Triangles",
    "intro": "This chapter focuses on properties of triangles including congruence, similarity, and the Pythagoras theorem. Students learn criteria for triangle congruence and similarity with applications.",
    "sections": [
      {
        "heading": "Triangle Congruence",
        "points": [
          "Two triangles are congruent if they have same shape and size",
          "SSS criterion: all sides equal",
          "SAS criterion: two sides and included angle equal",
          "ASA criterion: two angles and included side equal",
          "AAS criterion: two angles and non-included side equal"
        ]
      },
      {
        "heading": "Triangle Similarity",
        "points": [
          "Two triangles are similar if corresponding angles are equal and sides are proportional",
          "AA criterion: two angles equal (implies third equal)",
          "SSS criterion: all sides proportional",
          "SAS criterion: two sides proportional and included angle equal",
          "Similar triangles have same shape but different sizes"
        ]
      },
      {
        "heading": "Pythagoras Theorem",
        "points": [
          "In right triangle: a^2 + b^2 = c^2 where c is hypotenuse",
          "Converse: if a^2 + b^2 = c^2, then triangle is right-angled",
          "Used to find missing side in right triangle",
          "Common Pythagorean triples: (3,4,5), (5,12,13), (8,15,17)"
        ]
      },
      {
        "heading": "Basic Proportionality Theorem",
        "points": [
          "If line parallel to one side of triangle intersects other two sides, it divides them proportionally",
          "If AB/AD = AC/AE, then DE is parallel to BC",
          "Angle bisector theorem: angle bisector divides opposite side in ratio of adjacent sides",
          "These theorems used in geometric proofs and constructions"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Congruent Triangles",
        "meaning": "Triangles having same shape and size with all corresponding parts equal"
      },
      {
        "term": "Similar Triangles",
        "meaning": "Triangles having same shape with corresponding angles equal and sides proportional"
      },
      {
        "term": "Hypotenuse",
        "meaning": "Longest side of right triangle opposite the right angle"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between congruence and similarity?",
        "a": "Congruent triangles have same shape and size (all sides and angles equal). Similar triangles have same shape but different sizes (angles equal, sides proportional)."
      },
      {
        "q": "How do you prove two triangles are congruent?",
        "a": "Use one of the criteria: SSS (all sides equal), SAS (two sides and included angle), ASA (two angles and included side), or AAS (two angles and non-included side)."
      }
    ]
  },
  {
    "slug": "class-10-maths-coordinate-geometry",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Coordinate Geometry",
    "intro": "This chapter applies algebra to geometry using coordinate axes. Students learn distance formula, section formula, and area calculation using coordinates.",
    "sections": [
      {
        "heading": "Distance Formula",
        "points": [
          "Distance between points P(x1, y1) and Q(x2, y2): d = sqrt((x2-x1)^2 + (y2-y1)^2)",
          "Distance of point (x, y) from origin: d = sqrt(x^2 + y^2)",
          "Used to find length of line segment",
          "Can verify if triangle is right-angled using distances"
        ]
      },
      {
        "heading": "Section Formula",
        "points": [
          "Point dividing line in ratio m:n has coordinates: ((mx2+nx1)/(m+n), (my2+ny1)/(m+n))",
          "Midpoint formula: ((x1+x2)/2, (y1+y2)/2) when m = n = 1",
          "Used to find coordinates of point on line segment",
          "Internal division when point lies between endpoints"
        ]
      },
      {
        "heading": "Slope and Angle",
        "points": [
          "Slope m = (y2 - y1)/(x2 - x1) = tan(θ) where θ is angle with x-axis",
          "Parallel lines have equal slopes",
          "Perpendicular lines have slopes m1 and m2 such that m1 x m2 = -1",
          "Slope is undefined (vertical line) or zero (horizontal line)"
        ]
      },
      {
        "heading": "Area Using Coordinates",
        "points": [
          "Area of triangle with vertices (x1,y1), (x2,y2), (x3,y3): |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|/2",
          "If area = 0, points are collinear (lie on same line)",
          "Area of quadrilateral can be found by dividing into two triangles",
          "Formula extends to polygon with more vertices"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Distance Formula",
        "meaning": "Formula d = sqrt((x2-x1)^2 + (y2-y1)^2) to find distance between two points"
      },
      {
        "term": "Slope",
        "meaning": "Measure of steepness of line = (y2-y1)/(x2-x1)"
      },
      {
        "term": "Section Formula",
        "meaning": "Formula to find coordinates of point dividing line segment in given ratio"
      }
    ],
    "faqs": [
      {
        "q": "How do you find the area of triangle given coordinates of vertices?",
        "a": "Use formula: Area = |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|/2 where (x1,y1), (x2,y2), (x3,y3) are vertices."
      },
      {
        "q": "What does it mean if product of slopes is -1?",
        "a": "If m1 x m2 = -1, then the two lines are perpendicular (meet at right angle)."
      }
    ]
  },
  {
    "slug": "class-10-maths-trigonometry",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "intro": "This chapter covers trigonometric ratios in right triangles and their applications. Students learn six main ratios, values at special angles, and trigonometric identities.",
    "sections": [
      {
        "heading": "Trigonometric Ratios",
        "points": [
          "In right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent",
          "cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ",
          "Ratios depend on angle, not size of triangle",
          "ASTC rule: All positive in first quadrant, Sin in second, Tan in third, Cos in fourth"
        ]
      },
      {
        "heading": "Trigonometric Values",
        "points": [
          "0°: sin 0, cos 1, tan 0",
          "30°: sin 1/2, cos sqrt(3)/2, tan 1/sqrt(3)",
          "45°: sin 1/sqrt(2), cos 1/sqrt(2), tan 1",
          "60°: sin sqrt(3)/2, cos 1/2, tan sqrt(3)",
          "90°: sin 1, cos 0, tan undefined"
        ]
      },
      {
        "heading": "Trigonometric Identities",
        "points": [
          "sin^2 θ + cos^2 θ = 1",
          "1 + tan^2 θ = sec^2 θ",
          "1 + cot^2 θ = cosec^2 θ",
          "sin θ / cos θ = tan θ",
          "sin(90 - θ) = cos θ, cos(90 - θ) = sin θ (complementary angles)"
        ]
      },
      {
        "heading": "Applications",
        "points": [
          "Height and distance problems: angles of elevation and depression",
          "Angle of elevation: angle above horizontal when looking up",
          "Angle of depression: angle below horizontal when looking down",
          "Use trigonometric ratios to find unknown heights or distances"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Trigonometric Ratio",
        "meaning": "Ratio of sides in right triangle with respect to an angle"
      },
      {
        "term": "Angle of Elevation",
        "meaning": "Angle above horizontal from observer to object above"
      },
      {
        "term": "Angle of Depression",
        "meaning": "Angle below horizontal from observer to object below"
      }
    ],
    "faqs": [
      {
        "q": "How do you find height of a building using trigonometry?",
        "a": "If angle of elevation is θ and distance from base is d, then height h = d tan(θ)."
      },
      {
        "q": "Why is sin^2 θ + cos^2 θ = 1?",
        "a": "From Pythagoras theorem in right triangle: (opposite)^2 + (adjacent)^2 = (hypotenuse)^2. Dividing by hypotenuse^2 gives sin^2 θ + cos^2 θ = 1."
      }
    ]
  },
  {
    "slug": "class-10-maths-circles",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Circles",
    "intro": "This chapter explores properties of circles including tangents, chords, and angles subtended by arcs. Students learn about circle theorems and tangent-chord relationships.",
    "sections": [
      {
        "heading": "Circle Basics",
        "points": [
          "Circle is locus of points equidistant from center",
          "Radius is distance from center to circumference",
          "Diameter is longest chord passing through center, d = 2r",
          "Circumference = 2πr, Area = πr^2"
        ]
      },
      {
        "heading": "Tangent and Chord",
        "points": [
          "Tangent is line touching circle at exactly one point",
          "Tangent is perpendicular to radius at point of contact",
          "Chord is line segment joining two points on circle",
          "Perpendicular from center bisects chord"
        ]
      },
      {
        "heading": "Angles and Arcs",
        "points": [
          "Angle subtended at center is twice angle subtended at circumference",
          "Angles in same segment are equal",
          "Angle in semicircle is right angle (90°)",
          "Opposite angles in cyclic quadrilateral sum to 180°"
        ]
      },
      {
        "heading": "Tangent-Secant Properties",
        "points": [
          "From external point, tangent and secant can be drawn to circle",
          "Two tangents from external point are equal in length",
          "Angle between tangent and chord equals angle in alternate segment",
          "If tangent and secant drawn from point: (tangent)^2 = (external part of secant) x (whole secant)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Tangent",
        "meaning": "Line touching circle at exactly one point and perpendicular to radius"
      },
      {
        "term": "Chord",
        "meaning": "Line segment joining two points on circle"
      },
      {
        "term": "Cyclic Quadrilateral",
        "meaning": "Quadrilateral whose all vertices lie on a circle"
      }
    ],
    "faqs": [
      {
        "q": "What is angle in a semicircle?",
        "a": "Angle subtended by diameter at any point on circle is 90 degrees (right angle)."
      },
      {
        "q": "Why are two tangents from external point equal?",
        "a": "Both tangents from external point to center form right triangles. Since radius is same and hypotenuse (from external point to center) is same, tangent lengths are equal."
      }
    ]
  },
  {
    "slug": "class-10-maths-surface-areas-and-volumes",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Surface Areas and Volumes",
    "intro": "This chapter covers surface area and volume formulas for 3D shapes like cubes, cylinders, cones, and spheres. Students learn applications in real-world problems and combinations of shapes.",
    "sections": [
      {
        "heading": "Surface Area Formulas",
        "points": [
          "Cube: SA = 6a^2 where a is side length",
          "Cylinder: SA = 2πrh + 2πr^2 (lateral + two circular bases)",
          "Cone: SA = πrl + πr^2 where l is slant height",
          "Sphere: SA = 4πr^2"
        ]
      },
      {
        "heading": "Volume Formulas",
        "points": [
          "Cube: V = a^3",
          "Cylinder: V = πr^2h",
          "Cone: V = 1/3 πr^2h",
          "Sphere: V = 4/3 πr^3"
        ]
      },
      {
        "heading": "Combined Shapes",
        "points": [
          "Hemisphere: SA = 2πr^2 (curved) + πr^2 (base), V = 2/3 πr^3",
          "Composite shapes: find volume by adding/subtracting individual parts",
          "Example: cone on hemisphere = V cone + V hemisphere",
          "Surface area of composite: sum of exposed surfaces only"
        ]
      },
      {
        "heading": "Applications",
        "points": [
          "Finding how many units of one shape fit into another",
          "Volume conservation: water from one shape poured into another",
          "Cost problems: finding cost of material for given surface area",
          "Capacity problems: maximum volume container can hold"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Surface Area",
        "meaning": "Total area of all surfaces of 3D shape"
      },
      {
        "term": "Volume",
        "meaning": "Amount of space occupied by 3D shape"
      },
      {
        "term": "Slant Height",
        "meaning": "Distance from apex to edge of base along surface of cone"
      }
    ],
    "faqs": [
      {
        "q": "What is the formula for curved surface area of cylinder?",
        "a": "Curved surface area = 2πrh where r is radius and h is height. This is lateral surface area excluding the two circular bases."
      },
      {
        "q": "How do you find volume of composite shape?",
        "a": "Identify the constituent 3D shapes. Calculate volume of each shape. Add volumes if shape is combination, subtract if one shape is removed from another."
      }
    ]
  },
  {
    "slug": "class-10-maths-statistics",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "intro": "This chapter covers methods to collect, organize, and analyze data using statistical measures. Students learn mean, median, mode, and graphical representations of data.",
    "sections": [
      {
        "heading": "Measures of Central Tendency",
        "points": [
          "Mean: sum of all values divided by number of values",
          "Median: middle value when data arranged in order",
          "Mode: value occurring most frequently",
          "For grouped data: use class marks and frequencies"
        ]
      },
      {
        "heading": "Mean of Grouped Data",
        "points": [
          "Mean = sum(f x x) / sum(f) where f is frequency, x is class mark",
          "Class mark = (lower limit + upper limit) / 2",
          "Assumed mean method: choose assumed mean, find deviations, calculate mean",
          "Step deviation method: use h/d where h is class width"
        ]
      },
      {
        "heading": "Median and Mode of Grouped Data",
        "points": [
          "Median = l + (n/2 - cf) / f x h where l is lower class, cf is cumulative frequency, f is frequency, h is class width",
          "Modal class: class with highest frequency",
          "Mode = l + (f1 - f0) / (2f1 - f0 - f2) x h where f1 is modal frequency"
        ]
      },
      {
        "heading": "Data Representation",
        "points": [
          "Histogram: bars for grouped data with frequencies as heights",
          "Frequency polygon: line connecting class marks at frequencies",
          "Pie chart: circle divided into sectors representing frequencies",
          "Cumulative frequency curve (ogive): smooth curve through cumulative frequencies"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Mean",
        "meaning": "Average of all values in dataset"
      },
      {
        "term": "Median",
        "meaning": "Middle value in ordered dataset"
      },
      {
        "term": "Mode",
        "meaning": "Value appearing most frequently in dataset"
      }
    ],
    "faqs": [
      {
        "q": "How do you find median of grouped data?",
        "a": "Find n/2 where n is total frequency. Locate class where cumulative frequency first exceeds n/2. Apply formula: median = l + (n/2 - cf)/f x h."
      },
      {
        "q": "When is mean not a good measure of central tendency?",
        "a": "When data has outliers (very large or very small values), mean gets skewed. In such cases, median is better measure of central tendency."
      }
    ]
  },
  {
    "slug": "class-10-maths-probability",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Probability",
    "intro": "This chapter introduces probability theory and calculating chances of events. Students learn about sample space, outcomes, and theoretical vs experimental probability.",
    "sections": [
      {
        "heading": "Basic Probability Concepts",
        "points": [
          "Probability P(E) = number of favorable outcomes / total number of possible outcomes",
          "Probability ranges from 0 to 1",
          "P(E) = 0 means event is impossible, P(E) = 1 means event is certain",
          "Sample space is set of all possible outcomes"
        ]
      },
      {
        "heading": "Favorable Outcomes",
        "points": [
          "For coin: heads or tails, each has probability 1/2",
          "For dice: outcomes 1 to 6, each has probability 1/6",
          "For two dice: total 36 outcomes",
          "Playing cards: 52 cards, 4 suits, 13 cards per suit"
        ]
      },
      {
        "heading": "Complementary and Compound Events",
        "points": [
          "P(E) + P(not E) = 1, so P(not E) = 1 - P(E)",
          "Two events: P(A or B) = P(A) + P(B) - P(A and B)",
          "Independent events: P(A and B) = P(A) x P(B)",
          "Dependent events: probability changes after first event"
        ]
      },
      {
        "heading": "Theoretical vs Experimental",
        "points": [
          "Theoretical probability: calculated based on possibilities",
          "Experimental probability: calculated from actual experiments",
          "As number of trials increase, experimental approaches theoretical",
          "Law of large numbers: more trials, more accurate probability"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Probability",
        "meaning": "Measure of likelihood of event occurring between 0 and 1"
      },
      {
        "term": "Sample Space",
        "meaning": "Set of all possible outcomes of an experiment"
      },
      {
        "term": "Independent Events",
        "meaning": "Events where occurrence of one does not affect probability of other"
      }
    ],
    "faqs": [
      {
        "q": "What is probability of getting sum of 7 when rolling two dice?",
        "a": "Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total outcomes = 36. Probability = 6/36 = 1/6."
      },
      {
        "q": "How do you find P(A or B)?",
        "a": "Use formula P(A or B) = P(A) + P(B) - P(A and B). If A and B are mutually exclusive (cannot happen together), then P(A and B) = 0, so P(A or B) = P(A) + P(B)."
      }
    ]
  },
  {
    "slug": "class-9-science-matter-in-our-surroundings",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Matter in Our Surroundings",
    "intro": "This chapter introduces matter and its states: solid, liquid, and gas. Students learn about physical properties, state changes, and the particle model of matter.",
    "sections": [
      {
        "heading": "States of Matter",
        "points": [
          "Solid: definite shape, definite volume, particles tightly packed, no flow",
          "Liquid: no definite shape, definite volume, particles loosely packed, can flow",
          "Gas: no definite shape, no definite volume, particles far apart, high mobility",
          "Plasma: fourth state with ionized particles (beyond Class 9 scope)"
        ]
      },
      {
        "heading": "Properties of Matter",
        "points": [
          "Mass: amount of matter in substance",
          "Volume: space occupied by matter",
          "Density: mass per unit volume (d = m/v)",
          "Density of water = 1 g/cm^3 or 1000 kg/m^3"
        ]
      },
      {
        "heading": "Change of State",
        "points": [
          "Melting: solid to liquid (requires heat)",
          "Freezing: liquid to solid (releases heat)",
          "Evaporation: liquid to gas (requires heat)",
          "Condensation: gas to liquid (releases heat)",
          "Sublimation: solid directly to gas (e.g., dry ice)"
        ]
      },
      {
        "heading": "Particle Model",
        "points": [
          "All matter made of tiny particles",
          "Particles have spaces between them",
          "Particles are in continuous motion",
          "Particles attract each other",
          "Temperature increases particle motion"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Matter",
        "meaning": "Anything that has mass and occupies space"
      },
      {
        "term": "Density",
        "meaning": "Mass per unit volume of substance"
      },
      {
        "term": "Evaporation",
        "meaning": "Process of liquid changing to gas at any temperature"
      }
    ],
    "faqs": [
      {
        "q": "Why does matter have different states?",
        "a": "Difference in particle motion and spacing. Solids have tightly packed particles with low motion. Liquids have loosely packed particles. Gases have far-apart particles with high motion."
      },
      {
        "q": "What is difference between evaporation and boiling?",
        "a": "Evaporation occurs at any temperature at surface of liquid. Boiling occurs throughout liquid at fixed temperature (boiling point) with bubbles forming."
      }
    ]
  },
  {
    "slug": "class-9-science-is-matter-around-us-pure",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Is Matter Around Us Pure",
    "intro": "This chapter distinguishes between pure substances and mixtures, and methods to separate mixtures. Students learn about elements, compounds, and identification of pure vs impure substances.",
    "sections": [
      {
        "heading": "Pure Substances",
        "points": [
          "Pure substance has constant composition and properties",
          "Element: pure substance made of one type of atom (e.g., oxygen, nitrogen)",
          "Compound: pure substance made of two or more elements chemically bonded",
          "Physical properties fixed for pure substances (melting point, boiling point)"
        ]
      },
      {
        "heading": "Mixtures",
        "points": [
          "Mixture has variable composition",
          "Homogeneous mixture: uniform composition throughout (salt solution)",
          "Heterogeneous mixture: non-uniform composition (sand and sugar mix)",
          "Components retain individual properties in mixture"
        ]
      },
      {
        "heading": "Separation Techniques",
        "points": [
          "Filtration: separate insoluble solid from liquid (filter paper)",
          "Evaporation: separate soluble solid from solution by heating",
          "Crystallization: obtain pure crystals of solid from solution",
          "Distillation: separate liquids based on boiling points",
          "Fractional distillation: separate multiple components with different boiling points"
        ]
      },
      {
        "heading": "Chromatography",
        "points": [
          "Paper chromatography: separate colored dyes in solution",
          "Components move different distances based on solubility",
          "Used for food additives, ink analysis",
          "Rf value = distance traveled by component / distance traveled by solvent"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Element",
        "meaning": "Pure substance made of only one type of atom"
      },
      {
        "term": "Compound",
        "meaning": "Pure substance made of two or more elements bonded together"
      },
      {
        "term": "Mixture",
        "meaning": "Combination of two or more substances that retain individual properties"
      }
    ],
    "faqs": [
      {
        "q": "How do you distinguish pure substance from mixture?",
        "a": "Pure substance has constant melting and boiling points. Mixture has range of melting and boiling points. Pure substance has fixed composition, mixture has variable composition."
      },
      {
        "q": "Why is air a mixture and not a compound?",
        "a": "Air components (N2, O2, Ar, CO2) are not chemically bonded. They retain individual properties and can be separated physically. Therefore, air is a homogeneous mixture."
      }
    ]
  },
  {
    "slug": "class-9-science-atoms-and-molecules",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Atoms and Molecules",
    "intro": "This chapter covers atomic structure, molecular composition, and chemical formulas. Students learn about atomic mass unit, molar mass, and relationship between atoms and molecules.",
    "sections": [
      {
        "heading": "Atoms and Elements",
        "points": [
          "Atom is smallest unit of element retaining chemical properties",
          "Atoms cannot be created or destroyed in chemical reaction",
          "Atomic mass unit (amu) is 1/12 mass of carbon-12 atom",
          "Atoms of same element are identical in properties"
        ]
      },
      {
        "heading": "Molecules",
        "points": [
          "Molecule is smallest unit of compound",
          "Molecules formed by atoms bonded together",
          "Diatomic molecule: two atoms (O2, H2, N2, Cl2)",
          "Polyatomic molecule: more than two atoms (H2O, CO2, NH3)"
        ]
      },
      {
        "heading": "Chemical Formula",
        "points": [
          "Chemical formula shows symbols and number of atoms in molecule",
          "H2O: 2 hydrogen atoms and 1 oxygen atom",
          "Subscript indicates number of atoms (no subscript means 1 atom)",
          "Molecular formula gives actual number of atoms"
        ]
      },
      {
        "heading": "Mole Concept",
        "points": [
          "Mole is unit for amount of substance",
          "1 mole of substance = 6.022 x 10^23 particles (Avogadros number)",
          "Molar mass = sum of atomic masses in grams per mole",
          "Number of moles = mass / molar mass"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Atom",
        "meaning": "Smallest unit of element retaining chemical properties of element"
      },
      {
        "term": "Molecule",
        "meaning": "Smallest unit of compound formed by atoms bonded together"
      },
      {
        "term": "Mole",
        "meaning": "Unit of amount of substance equal to 6.022 x 10^23 particles"
      }
    ],
    "faqs": [
      {
        "q": "What is Avogadros number?",
        "a": "Avogadros number is 6.022 x 10^23. It represents number of particles (atoms, molecules, ions) in one mole of any substance."
      },
      {
        "q": "How do you find number of atoms in a molecule?",
        "a": "Count the number of atoms of each element from chemical formula. For example, H2SO4 has 2 hydrogen, 1 sulfur, and 4 oxygen atoms, total 7 atoms."
      }
    ]
  },
  {
    "slug": "class-9-science-structure-of-the-atom",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Structure of the Atom",
    "intro": "This chapter explores atomic structure including nucleus and electron shells. Students learn about Rutherfords model, Bohrs model, and the arrangement of electrons in atoms.",
    "sections": [
      {
        "heading": "Subatomic Particles",
        "points": [
          "Proton: positively charged, in nucleus, relative mass 1",
          "Neutron: no charge, in nucleus, relative mass 1",
          "Electron: negatively charged, in orbits, relative mass 1/1836",
          "Atom is neutral when number of protons equals electrons"
        ]
      },
      {
        "heading": "Rutherfords Model",
        "points": [
          "Nucleus is dense, positively charged center of atom",
          "Electrons revolve around nucleus in orbits",
          "Most of atom is empty space",
          "Explains scattering of alpha particles in gold foil experiment"
        ]
      },
      {
        "heading": "Bohrs Model",
        "points": [
          "Electrons exist in fixed energy shells around nucleus",
          "Electrons cannot exist between shells",
          "Electron jumping absorbs or releases specific energy (photon)",
          "Explains line spectrum of hydrogen"
        ]
      },
      {
        "heading": "Electron Distribution",
        "points": [
          "K shell: maximum 2 electrons",
          "L shell: maximum 8 electrons",
          "M shell: maximum 18 electrons",
          "Electrons fill inner shells first",
          "Valence electrons: electrons in outermost shell determine chemical properties"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Nucleus",
        "meaning": "Dense central region of atom containing protons and neutrons"
      },
      {
        "term": "Valence Electrons",
        "meaning": "Electrons in outermost shell determining chemical properties"
      },
      {
        "term": "Atomic Number",
        "meaning": "Number of protons in nucleus (defines element identity)"
      }
    ],
    "faqs": [
      {
        "q": "How many protons are in nitrogen atom?",
        "a": "Nitrogen has atomic number 7, so it has 7 protons. A neutral nitrogen atom also has 7 electrons."
      },
      {
        "q": "What is mass number of atom?",
        "a": "Mass number = number of protons + number of neutrons. It represents total number of subatomic particles in nucleus."
      }
    ]
  },
  {
    "slug": "class-9-science-the-fundamental-unit-of-life",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "The Fundamental Unit of Life",
    "intro": "This chapter introduces cells as basic unit of life. Students learn about cell structure, differences between plant and animal cells, and cell organelles.",
    "sections": [
      {
        "heading": "Cell Basics",
        "points": [
          "Cell is smallest unit of life",
          "All living organisms made of one or more cells",
          "Robert Hooke discovered cells in cork tissue",
          "Schleiden and Schwann proposed cell theory"
        ]
      },
      {
        "heading": "Cell Membrane",
        "points": [
          "Cell membrane is selectively permeable boundary of cell",
          "Regulates what enters and exits cell",
          "Made of phospholipid bilayer with embedded proteins",
          "Controls osmosis and transport of substances"
        ]
      },
      {
        "heading": "Prokaryotic vs Eukaryotic Cells",
        "points": [
          "Prokaryotic: no membrane-bound nucleus (bacteria, archaea)",
          "Eukaryotic: membrane-bound nucleus and organelles (plants, animals, fungi)",
          "Prokaryotic simpler, smaller than eukaryotic",
          "Nucleoid region in prokaryotes contains genetic material"
        ]
      },
      {
        "heading": "Cell Organelles",
        "points": [
          "Nucleus: contains DNA, controls cell functions",
          "Mitochondria: site of aerobic respiration (powerhouse of cell)",
          "Chloroplasts: photosynthesis in plant cells",
          "Endoplasmic reticulum: protein and lipid synthesis",
          "Golgi apparatus: packaging and transport of molecules",
          "Vacuole: storage in plant cells (large), animal cells (small)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Cell",
        "meaning": "Basic structural and functional unit of all living organisms"
      },
      {
        "term": "Organelle",
        "meaning": "Membrane-bound structure inside cell performing specific functions"
      },
      {
        "term": "Nucleus",
        "meaning": "Membrane-bound organelle containing genetic material"
      }
    ],
    "faqs": [
      {
        "q": "What is cell theory?",
        "a": "Cell theory states: (1) All living organisms are made of cells, (2) Cell is basic unit of life, (3) All cells come from pre-existing cells."
      },
      {
        "q": "Why is mitochondria called powerhouse of cell?",
        "a": "Mitochondria is site of aerobic respiration where glucose is broken down to release energy in the form of ATP molecules."
      }
    ]
  },
  {
    "slug": "class-9-science-tissues",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Tissues",
    "intro": "This chapter covers different types of tissues in plants and animals. Students learn about tissue organization and functions of various tissue types.",
    "sections": [
      {
        "heading": "Plant Tissues",
        "points": [
          "Meristematic tissue: undifferentiated, located at tips of roots and shoots",
          "Permanent tissue: differentiated for specific functions",
          "Simple tissue: made of one type of cell (parenchyma, collenchyma, sclerenchyma)",
          "Complex tissue: made of multiple types (xylem, phloem)"
        ]
      },
      {
        "heading": "Xylem and Phloem",
        "points": [
          "Xylem: transports water and minerals from roots to shoots (dead cells)",
          "Phloem: transports sugars and organic compounds from leaves (living cells)",
          "Xylem has vessels and tracheids",
          "Phloem has sieve tubes and companion cells"
        ]
      },
      {
        "heading": "Animal Tissues",
        "points": [
          "Epithelial tissue: covers body surface and lines organs",
          "Connective tissue: supports and binds other tissues (bone, cartilage, blood)",
          "Muscle tissue: enables movement (skeletal, cardiac, smooth)",
          "Nervous tissue: transmits electrical signals (neurons)"
        ]
      },
      {
        "heading": "Animal Cell Tissues",
        "points": [
          "Bone: rigid connective tissue providing structure and support",
          "Cartilage: flexible connective tissue in joints and ears",
          "Blood: fluid connective tissue transporting nutrients and gases",
          "Muscle: can contract and relax causing movement"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Tissue",
        "meaning": "Group of similar cells performing same function"
      },
      {
        "term": "Meristem",
        "meaning": "Plant tissue with undifferentiated cells capable of division"
      },
      {
        "term": "Xylem",
        "meaning": "Plant tissue transporting water and minerals from roots"
      }
    ],
    "faqs": [
      {
        "q": "What is difference between xylem and phloem?",
        "a": "Xylem transports water and minerals from roots upward (made of dead cells). Phloem transports sugars and organic compounds from leaves (made of living cells)."
      },
      {
        "q": "Why is blood classified as tissue?",
        "a": "Blood is connective tissue made of plasma (liquid matrix) and blood cells (RBC, WBC, platelets) that work together for transport and protection."
      }
    ]
  },
  {
    "slug": "class-9-science-motion",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Motion",
    "intro": "This chapter covers motion in one dimension including distance, displacement, speed, and velocity. Students learn about graphs of motion and equations of motion.",
    "sections": [
      {
        "heading": "Distance and Displacement",
        "points": [
          "Distance is total path length traveled (scalar quantity)",
          "Displacement is shortest path from start to finish (vector quantity)",
          "Distance always positive, displacement can be positive or negative",
          "Distance >= displacement for any motion"
        ]
      },
      {
        "heading": "Speed and Velocity",
        "points": [
          "Speed = distance / time (scalar quantity)",
          "Velocity = displacement / time (vector quantity)",
          "Average speed = total distance / total time",
          "Average velocity = total displacement / total time",
          "Uniform velocity: velocity constant over time"
        ]
      },
      {
        "heading": "Acceleration",
        "points": [
          "Acceleration = change in velocity / time = (v - u) / t",
          "Positive acceleration: velocity increasing",
          "Negative acceleration (deceleration): velocity decreasing",
          "Uniform acceleration: constant change in velocity"
        ]
      },
      {
        "heading": "Equations of Motion",
        "points": [
          "v = u + at",
          "s = ut + 1/2 at^2",
          "v^2 = u^2 + 2as",
          "Valid only for uniform acceleration"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Velocity",
        "meaning": "Rate of change of displacement (vector quantity with direction)"
      },
      {
        "term": "Acceleration",
        "meaning": "Rate of change of velocity"
      },
      {
        "term": "Displacement",
        "meaning": "Shortest distance from initial to final position in specific direction"
      }
    ],
    "faqs": [
      {
        "q": "Why is velocity called vector while speed is scalar?",
        "a": "Speed only has magnitude (how fast). Velocity has both magnitude and direction (how fast and which direction). Vectors require direction."
      },
      {
        "q": "What does negative acceleration mean?",
        "a": "Negative acceleration (deceleration) means velocity is decreasing. Object is slowing down in the positive direction or speeding up in negative direction."
      }
    ]
  },
  {
    "slug": "class-9-science-force-and-laws-of-motion",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Force and Laws of Motion",
    "intro": "This chapter introduces forces and Newtons three laws of motion. Students learn about different types of forces and applications in real-world situations.",
    "sections": [
      {
        "heading": "Newtons First Law",
        "points": [
          "Object at rest stays at rest unless external force applied",
          "Object in motion stays in motion unless external force applied",
          "Describes inertia: property resisting change in motion",
          "Inertia increases with mass"
        ]
      },
      {
        "heading": "Newtons Second Law",
        "points": [
          "F = ma where F is force, m is mass, a is acceleration",
          "Force causes acceleration proportional to force and inversely proportional to mass",
          "Unit of force is newton (N): 1 N = 1 kg m/s^2",
          "Force is vector quantity"
        ]
      },
      {
        "heading": "Newtons Third Law",
        "points": [
          "For every action, there is equal and opposite reaction",
          "Forces always occur in pairs",
          "Action and reaction act on different objects",
          "Cannot cancel each other out"
        ]
      },
      {
        "heading": "Types of Forces",
        "points": [
          "Gravitational force: attraction between all objects",
          "Friction: resistance to motion between surfaces",
          "Normal force: perpendicular force from surface",
          "Applied force: force directly applied to object",
          "Tension: force through rope or string"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Force",
        "meaning": "Push or pull that causes change in motion or shape"
      },
      {
        "term": "Inertia",
        "meaning": "Property of object to resist change in its motion"
      },
      {
        "term": "Momentum",
        "meaning": "Product of mass and velocity: p = mv"
      }
    ],
    "faqs": [
      {
        "q": "How does Newtons second law relate force and acceleration?",
        "a": "F = ma shows force is directly proportional to acceleration. Double the force doubles the acceleration. Double the mass halves the acceleration for same force."
      },
      {
        "q": "Give an example of Newtons third law.",
        "a": "When you jump, you push down on ground (action), ground pushes you up (reaction). When ball hits wall, ball exerts force on wall, wall exerts equal opposite force on ball."
      }
    ]
  },
  {
    "slug": "class-9-science-gravitation",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Gravitation",
    "intro": "This chapter covers gravitational force and Newtons law of universal gravitation. Students learn about weight, mass, and orbital motion.",
    "sections": [
      {
        "heading": "Newtons Law of Universal Gravitation",
        "points": [
          "Every object attracts every other object with force proportional to product of masses and inversely proportional to square of distance",
          "F = G m1 m2 / r^2 where G is gravitational constant (6.67 x 10^-11 N m^2 / kg^2)",
          "Force is mutual and equal on both objects",
          "Gravitational force is weakest of all forces"
        ]
      },
      {
        "heading": "Weight and Mass",
        "points": [
          "Mass: amount of matter in object (constant)",
          "Weight: force of gravity on object (W = mg)",
          "g = 9.8 m/s^2 on Earth surface",
          "Weight varies with location, mass does not"
        ]
      },
      {
        "heading": "Free Fall and g",
        "points": [
          "Free fall: motion under gravity alone",
          "Acceleration due to gravity is same for all objects (ignoring air resistance)",
          "g = 9.8 m/s^2 at Earths surface",
          "g decreases with altitude and increases with depth"
        ]
      },
      {
        "heading": "Orbital Motion",
        "points": [
          "Gravitational force provides centripetal force for orbital motion",
          "Satellites orbit because gravitational pull balances outward motion",
          "Orbital speed: v = sqrt(GM/r) where M is central mass, r is orbital radius",
          "Geostationary satellites have orbital period of 24 hours"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Gravity",
        "meaning": "Force of attraction between all objects due to their masses"
      },
      {
        "term": "Weight",
        "meaning": "Force exerted on object by gravity (W = mg)"
      },
      {
        "term": "Gravitational Constant",
        "meaning": "G = 6.67 x 10^-11 N m^2 / kg^2"
      }
    ],
    "faqs": [
      {
        "q": "Why do all objects fall with same acceleration?",
        "a": "Gravitational force F = mg is proportional to mass. From F = ma, acceleration a = F/m = mg/m = g, which is independent of mass."
      },
      {
        "q": "What is difference between mass and weight?",
        "a": "Mass is amount of matter (constant everywhere). Weight is gravitational force on mass (W = mg, varies with location). On Moon, weight is 1/6 of Earth value but mass remains same."
      }
    ]
  },
  {
    "slug": "class-9-science-work-and-energy",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Work and Energy",
    "intro": "This chapter covers work, energy, and power. Students learn about kinetic and potential energy, conservation of energy, and practical applications.",
    "sections": [
      {
        "heading": "Work",
        "points": [
          "Work = Force x Displacement x cos(θ) where θ is angle between force and displacement",
          "Work = Fs (when force is along direction of motion)",
          "Unit of work is joule (J): 1 J = 1 N x 1 m",
          "Work is zero when force perpendicular to displacement"
        ]
      },
      {
        "heading": "Energy Types",
        "points": [
          "Kinetic energy: energy due to motion (KE = 1/2 mv^2)",
          "Potential energy: energy due to position (PE = mgh)",
          "Mechanical energy: sum of kinetic and potential energy",
          "Other forms: thermal, electrical, chemical, nuclear"
        ]
      },
      {
        "heading": "Work-Energy Theorem",
        "points": [
          "Work done equals change in kinetic energy: W = KE_final - KE_initial",
          "W = 1/2 m (v_f^2 - v_i^2)",
          "Net work causes change in kinetic energy",
          "Allows calculation of final velocity from work done"
        ]
      },
      {
        "heading": "Power",
        "points": [
          "Power = Work / Time = Energy / Time",
          "Unit of power is watt (W): 1 W = 1 J / 1 s",
          "1 horsepower = 746 watts",
          "Power indicates rate at which work is done"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Work",
        "meaning": "Product of force and displacement in direction of force (F x s x cos θ)"
      },
      {
        "term": "Energy",
        "meaning": "Capacity to do work"
      },
      {
        "term": "Power",
        "meaning": "Rate at which work is done (P = W/t)"
      }
    ],
    "faqs": [
      {
        "q": "Is work done when carrying book horizontally?",
        "a": "No, work is zero. Weight acts downward, displacement is horizontal. Angle θ = 90°, cos 90° = 0, so W = F x s x 0 = 0."
      },
      {
        "q": "What is conservation of mechanical energy?",
        "a": "In absence of friction, total mechanical energy (KE + PE) remains constant. KE + PE = constant. As object falls, PE decreases and KE increases equally."
      }
    ]
  },
  {
    "slug": "class-9-science-sound",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Sound",
    "intro": "This chapter explores properties and propagation of sound waves. Students learn about frequency, wavelength, speed of sound, and practical applications.",
    "sections": [
      {
        "heading": "Sound Waves",
        "points": [
          "Sound is mechanical wave requiring medium for propagation",
          "Sound cannot travel in vacuum",
          "Sound waves are longitudinal waves with compressions and rarefactions",
          "Requires vibrating source to produce sound"
        ]
      },
      {
        "heading": "Properties of Sound",
        "points": [
          "Frequency: number of vibrations per second (unit: hertz, Hz)",
          "Wavelength: distance between consecutive compressions or rarefactions",
          "Wave speed: v = f x λ where f is frequency, λ is wavelength",
          "Amplitude: maximum displacement from mean position"
        ]
      },
      {
        "heading": "Speed of Sound",
        "points": [
          "Speed in air at 0°C: 331 m/s",
          "Speed in water: 1450 m/s (faster than air)",
          "Speed in solid: 5000 m/s (faster than water)",
          "Speed increases with temperature"
        ]
      },
      {
        "heading": "Doppler Effect",
        "points": [
          "Apparent frequency changes when source or observer is moving",
          "Frequency increases when source approaches observer",
          "Frequency decreases when source moves away",
          "Observed frequency: f = f0 (v ± vo) / (v ± vs) where v is sound speed"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Frequency",
        "meaning": "Number of vibrations per second (measured in hertz)"
      },
      {
        "term": "Wavelength",
        "meaning": "Distance between consecutive compressions or rarefactions"
      },
      {
        "term": "Doppler Effect",
        "meaning": "Change in apparent frequency due to relative motion of source and observer"
      }
    ],
    "faqs": [
      {
        "q": "Why cannot sound travel in vacuum?",
        "a": "Sound is mechanical wave requiring medium (particles) to propagate. In vacuum, there are no particles to vibrate and transmit sound waves."
      },
      {
        "q": "What is relationship between frequency and wavelength?",
        "a": "v = f x λ. For constant wave speed, frequency and wavelength are inversely proportional. Higher frequency means shorter wavelength."
      }
    ]
  },
  {
    "slug": "class-9-maths-number-systems",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "chapter": "Number Systems",
    "intro": "This chapter covers rational and irrational numbers, their properties, and operations. Students learn about number line and decimal representation of numbers.",
    "sections": [
      {
        "heading": "Rational Numbers",
        "points": [
          "Rational number is number that can be expressed as p/q where p and q are integers and q ≠ 0",
          "All integers are rational (n = n/1)",
          "Decimal form is terminating or non-terminating repeating",
          "Rational numbers are dense on number line"
        ]
      },
      {
        "heading": "Irrational Numbers",
        "points": [
          "Irrational number cannot be expressed as p/q",
          "Decimal form is non-terminating non-repeating",
          "Examples: sqrt(2), sqrt(3), π, e",
          "Sum/difference of rational and irrational is irrational"
        ]
      },
      {
        "heading": "Real Numbers",
        "points": [
          "Real numbers include all rational and irrational numbers",
          "Real numbers form continuous number line",
          "Every real number corresponds to unique point on number line",
          "Operations on real numbers follow closure, commutative, associative properties"
        ]
      },
      {
        "heading": "Surds",
        "points": [
          "Surd is irrational root of rational number",
          "sqrt(2), sqrt(3), ∛2 are surds",
          "Like surds: surds with same radicand (sqrt(2) and 3sqrt(2))",
          "Simplification: sqrt(ab) = sqrt(a) x sqrt(b) (for positive a, b)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Rational Number",
        "meaning": "Number expressible as p/q where p and q are integers"
      },
      {
        "term": "Irrational Number",
        "meaning": "Number that cannot be expressed as p/q"
      },
      {
        "term": "Surd",
        "meaning": "Irrational root of a rational number"
      }
    ],
    "faqs": [
      {
        "q": "Prove that sqrt(2) is irrational.",
        "a": "Assume sqrt(2) = p/q (lowest terms). Then 2q^2 = p^2, so p^2 is even, p is even. Let p = 2k, then q^2 = 2k^2, so q is even. Both are even, contradicting assumption."
      },
      {
        "q": "How do you rationalize denominator?",
        "a": "Multiply numerator and denominator by conjugate. For 1/(sqrt(2)+1), multiply by (sqrt(2)-1)/(sqrt(2)-1) to get (sqrt(2)-1)/(2-1) = sqrt(2)-1."
      }
    ]
  },
  {
    "slug": "class-9-maths-polynomials",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "chapter": "Polynomials",
    "intro": "This chapter covers polynomial expressions, their classification, and factorization. Students learn about zeros, factor theorem, and algebraic identities.",
    "sections": [
      {
        "heading": "Polynomial Basics",
        "points": [
          "Polynomial is algebraic expression with variables and coefficients",
          "Degree is highest power of variable",
          "Monomial: single term, Binomial: two terms, Trinomial: three terms",
          "Leading coefficient is coefficient of highest degree term"
        ]
      },
      {
        "heading": "Zeros and Factor Theorem",
        "points": [
          "Zero of polynomial: value of variable making polynomial zero",
          "Factor theorem: (x - a) is factor if p(a) = 0",
          "Remainder theorem: remainder when p(x) divided by (x - a) is p(a)",
          "Polynomial of degree n has at most n zeros"
        ]
      },
      {
        "heading": "Factorization",
        "points": [
          "Express polynomial as product of its factors",
          "Splitting middle term: for ax^2 + bx + c",
          "Using identities: (a+b)^2, (a-b)^2, a^2-b^2, a^3±b^3",
          "Grouping method: group terms with common factors"
        ]
      },
      {
        "heading": "Algebraic Identities",
        "points": [
          "(a+b)^2 = a^2 + 2ab + b^2",
          "(a-b)^2 = a^2 - 2ab + b^2",
          "a^2 - b^2 = (a+b)(a-b)",
          "(a+b)^3 = a^3 + b^3 + 3ab(a+b)",
          "a^3 + b^3 = (a+b)(a^2 - ab + b^2)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Polynomial",
        "meaning": "Expression with variables and coefficients combined using addition, subtraction, multiplication"
      },
      {
        "term": "Degree",
        "meaning": "Highest power of variable in polynomial"
      },
      {
        "term": "Zero",
        "meaning": "Value of variable making polynomial equal to zero"
      }
    ],
    "faqs": [
      {
        "q": "How do you factorize x^2 + 7x + 12?",
        "a": "Find two numbers with product 12 and sum 7: these are 3 and 4. So x^2 + 7x + 12 = (x+3)(x+4)."
      },
      {
        "q": "What is factor theorem?",
        "a": "If p(a) = 0, then (x-a) is factor of p(x). Conversely, if (x-a) is factor, then p(a) = 0."
      }
    ]
  },
  {
    "slug": "class-9-maths-linear-equations-in-two-variables",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "chapter": "Linear Equations in Two Variables",
    "intro": "This chapter covers linear equations with two variables and their graphical representations. Students learn to plot graphs and find solutions.",
    "sections": [
      {
        "heading": "Linear Equation Form",
        "points": [
          "Standard form: ax + by + c = 0 where a, b, c are constants",
          "Graph is straight line on coordinate plane",
          "Slope-intercept form: y = mx + b where m is slope, b is y-intercept",
          "Point-slope form: y - y1 = m(x - x1)"
        ]
      },
      {
        "heading": "Graphing Linear Equations",
        "points": [
          "Find two points satisfying equation",
          "Plot points on coordinate plane",
          "Draw straight line through points",
          "x-intercept: point where line meets x-axis (y = 0)",
          "y-intercept: point where line meets y-axis (x = 0)"
        ]
      },
      {
        "heading": "Slope",
        "points": [
          "Slope m = (y2 - y1) / (x2 - x1) = rise / run",
          "Positive slope: line goes upward left to right",
          "Negative slope: line goes downward left to right",
          "Zero slope: horizontal line, Undefined slope: vertical line"
        ]
      },
      {
        "heading": "Solutions",
        "points": [
          "Solution: ordered pair (x, y) satisfying the equation",
          "Equation has infinite solutions",
          "Solution set is set of all ordered pairs satisfying equation",
          "Graph represents solution set"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Linear Equation",
        "meaning": "Equation of form ax + by + c = 0 with degree 1"
      },
      {
        "term": "Slope",
        "meaning": "Measure of steepness of line (rise/run)"
      },
      {
        "term": "Intercept",
        "meaning": "Point where line meets coordinate axis"
      }
    ],
    "faqs": [
      {
        "q": "How do you find x-intercept and y-intercept?",
        "a": "For x-intercept, set y = 0 and solve for x. For y-intercept, set x = 0 and solve for y."
      },
      {
        "q": "What is slope of line through (2,3) and (5,9)?",
        "a": "m = (9-3)/(5-2) = 6/3 = 2. Line has slope 2, meaning it rises 2 units for every 1 unit run."
      }
    ]
  },
  {
    "slug": "class-9-maths-lines-and-angles",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "chapter": "Lines and Angles",
    "intro": "This chapter covers basic geometry of lines and angles including angle types, parallel lines, and angle relationships. Students learn about angle properties and geometric proofs.",
    "sections": [
      {
        "heading": "Angle Classification",
        "points": [
          "Acute angle: less than 90°",
          "Right angle: exactly 90°",
          "Obtuse angle: between 90° and 180°",
          "Straight angle: exactly 180°",
          "Reflex angle: between 180° and 360°"
        ]
      },
      {
        "heading": "Angle Relationships",
        "points": [
          "Complementary angles: sum to 90°",
          "Supplementary angles: sum to 180°",
          "Adjacent angles: share common vertex and side",
          "Vertically opposite angles: equal in measure",
          "Linear pair: adjacent supplementary angles"
        ]
      },
      {
        "heading": "Parallel Lines",
        "points": [
          "Parallel lines: lines that never meet",
          "Transversal: line intersecting two parallel lines",
          "Corresponding angles: equal when lines are parallel",
          "Alternate interior angles: equal when lines are parallel",
          "Co-interior angles: supplementary when lines are parallel"
        ]
      },
      {
        "heading": "Triangle Angle Properties",
        "points": [
          "Sum of angles in triangle = 180°",
          "Exterior angle equals sum of non-adjacent interior angles",
          "Each exterior angle + adjacent interior angle = 180°",
          "Angle bisector: divides angle into two equal angles"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Angle",
        "meaning": "Figure formed by two rays sharing common endpoint"
      },
      {
        "term": "Complementary Angles",
        "meaning": "Two angles whose sum is 90°"
      },
      {
        "term": "Supplementary Angles",
        "meaning": "Two angles whose sum is 180°"
      }
    ],
    "faqs": [
      {
        "q": "What is relationship between corresponding angles when lines are parallel?",
        "a": "Corresponding angles are equal when lines are parallel. Conversely, if corresponding angles are equal, lines are parallel."
      },
      {
        "q": "How are exterior angle and interior angles of triangle related?",
        "a": "Exterior angle of triangle equals sum of two non-adjacent interior angles. This is exterior angle theorem."
      }
    ]
  },
  {
    "slug": "class-9-maths-triangles",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "chapter": "Triangles",
    "intro": "This chapter covers triangle properties, congruence criteria, and angle bisectors. Students learn to prove triangle congruence and understand angle-side relationships.",
    "sections": [
      {
        "heading": "Triangle Classification",
        "points": [
          "Equilateral triangle: all sides equal, all angles 60°",
          "Isosceles triangle: two sides equal, base angles equal",
          "Scalene triangle: all sides different, all angles different",
          "Acute: all angles < 90°, Right: one angle = 90°, Obtuse: one angle > 90°"
        ]
      },
      {
        "heading": "Triangle Congruence",
        "points": [
          "SSS criterion: all three sides equal",
          "SAS criterion: two sides and included angle equal",
          "ASA criterion: two angles and included side equal",
          "RHS criterion: right angle, hypotenuse, side equal (right triangles)"
        ]
      },
      {
        "heading": "Isosceles Triangle Properties",
        "points": [
          "Angles opposite equal sides are equal",
          "If two angles are equal, opposite sides are equal",
          "Median from vertex angle bisects base at right angles",
          "All medians, altitudes, angle bisectors from vertex angle coincide"
        ]
      },
      {
        "heading": "Triangle Angle-Side Relation",
        "points": [
          "Angle opposite longer side is larger",
          "Side opposite larger angle is longer",
          "Triangle inequality: sum of any two sides > third side",
          "Pythagoras theorem: in right triangle, a^2 + b^2 = c^2"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Congruent Triangles",
        "meaning": "Triangles with same shape and size, all corresponding parts equal"
      },
      {
        "term": "Isosceles Triangle",
        "meaning": "Triangle with two equal sides"
      },
      {
        "term": "Median",
        "meaning": "Line from vertex to midpoint of opposite side"
      }
    ],
    "faqs": [
      {
        "q": "How do you prove two triangles are congruent?",
        "a": "Use one of the criteria: SSS (all sides), SAS (two sides and included angle), ASA (two angles and included side), or RHS (right angle, hypotenuse, side)."
      },
      {
        "q": "Why are base angles of isosceles triangle equal?",
        "a": "In isosceles triangle, two sides are equal. The angles opposite these equal sides are equal. These are the base angles."
      }
    ]
  },
  {
    "slug": "class-10-social-science-nationalism-europe",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Nationalism in Europe",
    "intro": "Nationalism emerged as a powerful force in Europe during the 18th and 19th centuries, reshaping political boundaries and identities. It challenged the old dynastic empires and led to the creation of new nation-states based on shared culture, language, and history.",
    "sections": [
      {
        "heading": "Meaning and Development of Nationalism",
        "points": [
          "Nationalism is a sense of belonging to a nation and prioritizing national interests",
          "Rose against the autocratic rule of kings and emperors in Europe",
          "Combined with liberalism to demand democratic rights and constitutional governments",
          "Spread through newspapers, literature, music, and patriotic symbols"
        ]
      },
      {
        "heading": "Unification Movements",
        "points": [
          "Italian unification under Cavour and Garibaldi (1859-1870) created a unified Italian state",
          "German unification led by Otto von Bismarck and Prussia (1871) established the German Empire",
          "Both used military strength and diplomacy to consolidate fragmented territories",
          "Nationalism became a tool for both liberal reformers and conservative rulers"
        ]
      },
      {
        "heading": "Impact on European Politics",
        "points": [
          "Weakened the Concert of Europe established after Napoleonic Wars",
          "Led to conflicts over territory, colonial possessions, and regional power",
          "Contributed to the rise of aggressive expansionism and imperial rivalries",
          "Tensions between nationalist aspirations eventually sparked World War I"
        ]
      },
      {
        "heading": "Nationalism and Culture",
        "points": [
          "Romantic movement celebrated folk traditions, languages, and local customs",
          "National anthems, flags, and monuments became symbols of identity",
          "Education systems promoted national history and language as pillars of identity",
          "Artists and writers portrayed the nation as organic community with shared destiny"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Nation-state",
        "meaning": "A sovereign political unit based on a shared national identity rather than dynastic rule"
      },
      {
        "term": "Liberalism",
        "meaning": "Political ideology advocating for individual freedoms, constitutional government, and democratic rights"
      },
      {
        "term": "Unification",
        "meaning": "Process of bringing together fragmented regions or kingdoms into a single nation-state"
      },
      {
        "term": "Romanticism",
        "meaning": "Artistic and cultural movement emphasizing emotion, nature, and national identity"
      }
    ],
    "faqs": [
      {
        "q": "How did nationalism change the map of Europe?",
        "a": "Nationalism led to the unification of Italy and Germany and the breakup of empires, replacing dynastic kingdoms with nation-states based on shared culture and language."
      },
      {
        "q": "What role did culture play in spreading nationalism?",
        "a": "Literature, music, folk traditions, and patriotic symbols helped people identify with their nation and reject foreign rule or dynastic control."
      }
    ]
  },
  {
    "slug": "class-10-social-science-nationalism-india",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Nationalism in India",
    "intro": "Indian nationalism emerged in the late 19th century as a response to British colonial rule, combining traditional values with modern ideals of self-determination. The freedom struggle united diverse groups across religions, regions, and languages to achieve independence in 1947.",
    "sections": [
      {
        "heading": "Factors Contributing to Rise of Nationalism",
        "points": [
          "British exploitation of resources and economic drain weakened the Indian economy",
          "Spread of English education created an educated middle class questioning colonial rule",
          "Press and journalism allowed discussion of nationalist ideas across the country",
          "British racial attitudes and discrimination unified Indians across caste and community lines"
        ]
      },
      {
        "heading": "Early Nationalist Organizations",
        "points": [
          "Indian National Congress founded in 1885 initially sought reforms within the British system",
          "Extremists like Bal Gangadhar Tilak, Lala Lajpat Rai advocated direct action and self-sacrifice",
          "Moderates believed in petitions and negotiations with the British government",
          "Swadeshi movement promoted indigenous products and rejected British goods"
        ]
      },
      {
        "heading": "Role of Mahatma Gandhi",
        "points": [
          "Introduced non-violent resistance (Ahimsa) as primary weapon against colonialism",
          "Mobilized masses through Civil Disobedience Movement, Salt March, and Quit India",
          "Connected nationalism to village life, khadi, and ancient Indian values",
          "United Hindus and Muslims under one national banner before Partition"
        ]
      },
      {
        "heading": "Independence and Partition",
        "points": [
          "India gained independence on August 15, 1947 after two centuries of British rule",
          "Partition of India created Pakistan, leading to communal violence and mass migration",
          "Dr. Rajendra Prasad became first President and Pandit Nehru first Prime Minister",
          "Dr. Ambedkar drafted the Indian Constitution ensuring democratic and secular governance"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Swadeshi",
        "meaning": "Movement promoting the use of Indian-made goods and rejection of British products"
      },
      {
        "term": "Ahimsa",
        "meaning": "Principle of non-violence and peaceful resistance against oppression"
      },
      {
        "term": "Civil Disobedience",
        "meaning": "Peaceful refusal to follow unjust laws or British rules as form of protest"
      },
      {
        "term": "Partition",
        "meaning": "Division of British India into independent nations of India and Pakistan in 1947"
      }
    ],
    "faqs": [
      {
        "q": "What made the Indian independence movement unique?",
        "a": "It was based on non-violence and peaceful resistance under Gandhi, united diverse communities across religions and regions, and combined modern democratic ideas with traditional Indian values."
      },
      {
        "q": "How did the British educational system contribute to Indian nationalism?",
        "a": "English education created an educated middle class that understood modern political ideas like democracy and equality, enabling them to question British rule and organize resistance."
      }
    ]
  },
  {
    "slug": "class-10-social-science-resources-development",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Resources and Development",
    "intro": "Resources are essential materials provided by nature and developed through human effort that support economic growth and human welfare. Sustainable development ensures that present resource use does not compromise the needs of future generations.",
    "sections": [
      {
        "heading": "Classification of Resources",
        "points": [
          "Biotic resources include living organisms like forests, wildlife, crops, and animals",
          "Abiotic resources include non-living materials like minerals, soil, water, and atmosphere",
          "Renewable resources like forests and water can be regenerated naturally or through management",
          "Non-renewable resources like minerals and fossil fuels exist in limited quantities and deplete with use"
        ]
      },
      {
        "heading": "Resource Development and Planning",
        "points": [
          "Resources become useful only when technology and capital are applied for extraction and processing",
          "India has developed five-year plans to manage resources sustainably since independence",
          "Government policies control resource use to prevent depletion and environmental damage",
          "Public and private sectors work together in resource extraction and management"
        ]
      },
      {
        "heading": "Conservation and Sustainability",
        "points": [
          "Sustainable development balances economic growth with environmental protection",
          "Protected areas and national parks preserve biodiversity and natural resources",
          "Watershed management, soil conservation, and afforestation restore degraded lands",
          "Recycling and reuse reduce pressure on non-renewable resources"
        ]
      },
      {
        "heading": "Resource Challenges in India",
        "points": [
          "Over-extraction of groundwater has led to water scarcity in many regions",
          "Mining causes environmental degradation and displaces indigenous communities",
          "Deforestation reduces biodiversity and increases carbon emissions",
          "Growing population and industrial demand stress available resources"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Biotic resources",
        "meaning": "Living resources derived from the biosphere like forests, animals, and crops"
      },
      {
        "term": "Abiotic resources",
        "meaning": "Non-living resources from the physical environment like minerals, water, and sunlight"
      },
      {
        "term": "Sustainable development",
        "meaning": "Development that meets current needs without harming the ability of future generations to meet theirs"
      },
      {
        "term": "Conservation",
        "meaning": "Careful management and protection of natural resources to ensure long-term availability"
      }
    ],
    "faqs": [
      {
        "q": "Why is sustainable development important?",
        "a": "Sustainable development ensures that we use resources responsibly today while preserving them for future generations, balancing economic growth with environmental protection."
      },
      {
        "q": "What is the difference between renewable and non-renewable resources?",
        "a": "Renewable resources like forests and water can be regenerated naturally, while non-renewable resources like coal and oil exist in fixed quantities and deplete with use."
      }
    ]
  },
  {
    "slug": "class-10-social-science-agriculture",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Agriculture",
    "intro": "Agriculture is the primary economic activity in India, employing a large portion of the population and providing food security. Understanding different farming systems, crop varieties, and agricultural practices is crucial for sustainable development.",
    "sections": [
      {
        "heading": "Types of Farming",
        "points": [
          "Subsistence farming produces enough food for the farmer's family with little surplus for sale",
          "Commercial farming focuses on large-scale production of crops for profit and export",
          "Intensive farming uses high inputs of labor, capital, and technology on limited land",
          "Extensive farming uses large areas of land with lower intensity of inputs"
        ]
      },
      {
        "heading": "Crops of India",
        "points": [
          "Food grains include rice, wheat, maize, and pulses grown across diverse regions",
          "Cash crops like sugarcane, cotton, tea, and coffee are grown for profit",
          "Oilseeds such as mustard, groundnut, and sunflower provide edible oils",
          "Plantation crops like rubber, coconut, and spices are grown on large estates"
        ]
      },
      {
        "heading": "Agricultural Regions and Seasonality",
        "points": [
          "Kharif crops planted during monsoon include rice, maize, cotton, and groundnut",
          "Rabi crops planted in winter include wheat, barley, peas, and mustard",
          "Different regions specialize in specific crops based on climate, soil, and terrain",
          "Agricultural productivity varies by water availability, temperature, and soil quality"
        ]
      },
      {
        "heading": "Modern Agricultural Practices",
        "points": [
          "Green Revolution improved productivity through high-yield seeds, fertilizers, and irrigation",
          "Mechanization reduced labor needs and increased efficiency in farming",
          "Crop rotation and mixed farming maintain soil fertility and reduce pest pressure",
          "Organic farming avoids chemical inputs and uses natural methods for soil improvement"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Subsistence farming",
        "meaning": "Farming that produces mainly for the farmer's own consumption with little surplus for sale"
      },
      {
        "term": "Kharif crops",
        "meaning": "Crops planted during monsoon season and harvested in autumn"
      },
      {
        "term": "Rabi crops",
        "meaning": "Crops planted in winter season and harvested in spring"
      },
      {
        "term": "Green Revolution",
        "meaning": "Agricultural transformation using high-yield seeds and modern techniques to increase productivity"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between Kharif and Rabi crops?",
        "a": "Kharif crops are planted during the monsoon season and harvested in autumn, like rice and cotton. Rabi crops are planted in winter and harvested in spring, like wheat and barley."
      },
      {
        "q": "How has the Green Revolution changed Indian agriculture?",
        "a": "The Green Revolution introduced high-yield seeds, chemical fertilizers, and modern irrigation, significantly increasing agricultural productivity and making India self-sufficient in food grains."
      }
    ]
  },
  {
    "slug": "class-10-social-science-power-sharing",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Power Sharing",
    "intro": "Power sharing is the foundation of democratic governance, distributing political authority among multiple institutions and levels to prevent tyranny and protect rights. A well-designed power-sharing system ensures checks and balances and accommodates diverse groups.",
    "sections": [
      {
        "heading": "Need for Power Sharing",
        "points": [
          "Concentrating all power in one person or body leads to tyranny and abuse of authority",
          "Multiple groups with different interests require representation in decision-making",
          "Power sharing protects minority rights and prevents majority domination",
          "Democratic values demand that ordinary citizens have a voice in government"
        ]
      },
      {
        "heading": "Forms of Power Sharing",
        "points": [
          "Horizontal distribution separates power among executive, legislative, and judicial branches",
          "Vertical distribution divides power between central and state governments in a federation",
          "Communal power sharing reserves seats for underrepresented communities in legislatures",
          "Corporatism involves non-governmental organizations in policy-making and implementation"
        ]
      },
      {
        "heading": "Power Sharing in India",
        "points": [
          "Executive consists of President, Vice-President, Prime Minister, and Council of Ministers",
          "Legislature includes Lok Sabha and Rajya Sabha representing people and states respectively",
          "Judiciary ensures constitutional rights and resolves disputes between branches and governments",
          "Reservation system ensures representation for Scheduled Castes, Scheduled Tribes, and OBCs"
        ]
      },
      {
        "heading": "Effectiveness of Power Sharing",
        "points": [
          "Leads to stable and responsive governance that respects diverse interests",
          "Reduces political violence and conflict by providing peaceful channels for representation",
          "Ensures accountability as multiple institutions check each other's powers",
          "Promotes sustainable democracy by legitimizing government authority"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Separation of powers",
        "meaning": "Division of government authority among executive, legislative, and judicial branches"
      },
      {
        "term": "Federation",
        "meaning": "Political system where power is divided between central authority and constituent states"
      },
      {
        "term": "Checks and balances",
        "meaning": "System where each branch of government can limit the powers of the others"
      },
      {
        "term": "Communal power sharing",
        "meaning": "System ensuring representation of different religious or ethnic communities in government"
      }
    ],
    "faqs": [
      {
        "q": "Why is power sharing necessary in a democracy?",
        "a": "Power sharing prevents tyranny, ensures that diverse groups are represented in decision-making, protects minority rights, and creates a system of checks and balances."
      },
      {
        "q": "What are the different levels of power sharing in India?",
        "a": "India practices horizontal power sharing through separation of powers among executive, legislature, and judiciary, and vertical power sharing between central government and state governments."
      }
    ]
  },
  {
    "slug": "class-10-social-science-federalism",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Federalism",
    "intro": "Federalism is a system of government that divides power between a central authority and constituent state or regional governments. It allows for unity in diversity while respecting local autonomy and cultural differences.",
    "sections": [
      {
        "heading": "Key Features of Federalism",
        "points": [
          "Two or more levels of government exist with independent powers and authority",
          "Constitution clearly defines powers of each level and cannot be unilaterally changed",
          "Citizens are governed by laws of both central and state governments",
          "Independent judiciary resolves disputes between different levels of government"
        ]
      },
      {
        "heading": "Federalism in India",
        "points": [
          "Union government handles defense, foreign policy, taxation, and currency",
          "State governments manage education, agriculture, police, and local governance",
          "Concurrent list includes subjects like trade, taxation, and criminal law shared between Union and states",
          "Three-tier system includes Union, states, and local bodies like municipalities and gram panchayats"
        ]
      },
      {
        "heading": "Advantages of Federalism",
        "points": [
          "Accommodates cultural and linguistic diversity by allowing regional autonomy",
          "Brings government closer to people through decentralized decision-making",
          "Prevents concentration of power and protects against authoritarian rule",
          "Allows states to experiment with policies suited to local conditions"
        ]
      },
      {
        "heading": "Challenges in Federal Systems",
        "points": [
          "Disputes between central and state governments over resource sharing and jurisdiction",
          "Poor coordination and cooperation between different levels of governance",
          "Financial imbalance where states lack resources for assigned responsibilities",
          "Regional interests sometimes override national unity and development"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Federalism",
        "meaning": "System dividing power between central government and constituent state governments"
      },
      {
        "term": "Union list",
        "meaning": "Subjects under exclusive control of the central government like defense and foreign policy"
      },
      {
        "term": "State list",
        "meaning": "Subjects under exclusive control of state governments like education and police"
      },
      {
        "term": "Concurrent list",
        "meaning": "Subjects where both central and state governments can make laws"
      }
    ],
    "faqs": [
      {
        "q": "How does federalism help maintain unity in a diverse country like India?",
        "a": "Federalism allows states to have autonomy over cultural and linguistic matters while maintaining national unity through central control over defense, foreign policy, and currency."
      },
      {
        "q": "What is the difference between Union list and State list?",
        "a": "Union list contains subjects exclusively controlled by the central government like defense and taxation, while State list contains subjects exclusively controlled by state governments like education and police."
      }
    ]
  },
  {
    "slug": "class-10-social-science-sectors-indian-economy",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Sectors of Indian Economy",
    "intro": "The Indian economy comprises three sectors that contribute differently to GDP and employment: primary sector produces raw materials, secondary sector manufactures goods, and tertiary sector provides services. Understanding these sectors is key to economic development.",
    "sections": [
      {
        "heading": "Primary Sector",
        "points": [
          "Includes agriculture, forestry, fishing, and mining - extraction of natural resources",
          "Employs majority of rural population in India despite declining contribution to GDP",
          "Vulnerable to weather, natural disasters, and market price fluctuations",
          "Provides raw materials for secondary and tertiary sectors"
        ]
      },
      {
        "heading": "Secondary Sector",
        "points": [
          "Manufacturing industries transform raw materials into finished products",
          "Includes textile, steel, automobile, chemical, and food processing industries",
          "Contributes significantly to GDP and provides employment to millions",
          "Requires capital investment, skilled labor, and infrastructure development"
        ]
      },
      {
        "heading": "Tertiary Sector",
        "points": [
          "Service sector includes trade, transportation, communication, finance, and tourism",
          "Growing fastest in India and increasingly contributes more than primary and secondary combined",
          "Provides employment in government, education, health, and business services",
          "Depends on other sectors but also drives economic growth and development"
        ]
      },
      {
        "heading": "Structural Changes in Indian Economy",
        "points": [
          "Shift from agriculture-based economy to service-based economy since 1990s",
          "Primary sector employment declining as people move to secondary and tertiary sectors",
          "Globalization and liberalization increased manufacturing and service exports",
          "Unequal development across sectors and regions creates economic disparities"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Primary sector",
        "meaning": "Economic sector involving extraction of raw materials from nature like agriculture and mining"
      },
      {
        "term": "Secondary sector",
        "meaning": "Economic sector involving manufacturing and processing of raw materials into finished goods"
      },
      {
        "term": "Tertiary sector",
        "meaning": "Economic sector providing services like trade, transportation, communication, and finance"
      },
      {
        "term": "Organized sector",
        "meaning": "Economic activities registered with government and following labor laws and regulations"
      }
    ],
    "faqs": [
      {
        "q": "Why is the tertiary sector growing faster than other sectors in India?",
        "a": "The tertiary sector is growing due to globalization, increasing demand for services like IT and finance, higher incomes enabling more consumption, and reduced need for agricultural and manufacturing workers."
      },
      {
        "q": "What is the importance of secondary sector for India's development?",
        "a": "The secondary sector creates manufacturing jobs, adds value to raw materials, generates exports, and drives industrial development essential for economic growth and poverty reduction."
      }
    ]
  },
  {
    "slug": "class-10-social-science-money-credit",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Money and Credit",
    "intro": "Money serves as a medium of exchange, store of value, and unit of account, facilitating economic transactions. Credit extends money supply and enables productive investment, but misuse can lead to debt and economic instability.",
    "sections": [
      {
        "heading": "Role of Money",
        "points": [
          "Medium of exchange eliminates inefficiencies of barter system in transactions",
          "Store of value allows people to save and defer consumption to the future",
          "Unit of account provides common measure for comparing values of different goods",
          "Money can be commodity money like gold or fiat money issued by government"
        ]
      },
      {
        "heading": "Credit and Its Forms",
        "points": [
          "Credit involves lending money with promise of repayment plus interest",
          "Informal credit from moneylenders, landlords, and friends often lacks documentation and regulation",
          "Formal credit from banks and financial institutions follows legal procedures and fixed interest rates",
          "Agricultural credit helps farmers purchase inputs while trade credit helps businesses manage cash flow"
        ]
      },
      {
        "heading": "Banking System",
        "points": [
          "Commercial banks collect deposits from public and lend to borrowers for profit",
          "Reserve Bank of India supervises banking system and implements monetary policy",
          "Banks provide services like savings accounts, loans, mortgages, and payment transfers",
          "Central bank controls money supply to manage inflation and promote economic growth"
        ]
      },
      {
        "heading": "Credit and Debt Issues",
        "points": [
          "High interest rates in informal credit trap borrowers in perpetual debt",
          "Over-borrowing for non-productive purposes leads to financial distress",
          "Debt becomes burden when income is insufficient to repay borrowed amount",
          "Credit regulation and financial literacy help prevent debt traps and promote responsible borrowing"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Money",
        "meaning": "Medium of exchange and store of value used to facilitate transactions in economy"
      },
      {
        "term": "Credit",
        "meaning": "Lending of money with expectation of future repayment with interest"
      },
      {
        "term": "Interest rate",
        "meaning": "Price charged for borrowing money, expressed as percentage of principal per time period"
      },
      {
        "term": "Collateral",
        "meaning": "Asset pledged by borrower to secure a loan and compensate lender if default occurs"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between informal and formal credit?",
        "a": "Informal credit from moneylenders lacks documentation and regulation with often exorbitant interest rates, while formal credit from banks follows legal procedures and provides lower interest rates with consumer protection."
      },
      {
        "q": "How can credit become a burden?",
        "a": "Credit becomes a burden when borrowed for non-productive purposes, interest rates are high, or income is insufficient to make regular repayments, leading to perpetual debt."
      }
    ]
  },
  {
    "slug": "class-10-social-science-manufacturing-industries",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Manufacturing Industries",
    "intro": "Manufacturing industries transform raw materials into finished goods and are central to economic development. They create employment, generate government revenue, and contribute significantly to GDP and export earnings.",
    "sections": [
      {
        "heading": "Types of Industries",
        "points": [
          "Agro-based industries process agricultural products like sugar, oil, and textiles",
          "Mineral-based industries use mineral resources for steel, cement, and chemical production",
          "Heavy industries produce capital goods like machinery and transport equipment",
          "Light industries produce consumer goods like electronics, toys, and utensils"
        ]
      },
      {
        "heading": "Major Industries in India",
        "points": [
          "Iron and steel industry located in eastern India supports construction and manufacturing",
          "Textile industry largest employer and major export earner in Indian manufacturing",
          "Automobile industry produces vehicles and components for domestic and export markets",
          "Chemical industry produces fertilizers, drugs, plastics, and other essential products"
        ]
      },
      {
        "heading": "Factors Affecting Industrial Location",
        "points": [
          "Proximity to raw materials reduces transportation costs for mineral and agro-based industries",
          "Availability of labor skilled and unskilled is critical for manufacturing success",
          "Adequate power supply and water are essential inputs for most manufacturing processes",
          "Transport facilities, markets, and capital availability influence industry location decisions"
        ]
      },
      {
        "heading": "Environmental and Social Issues",
        "points": [
          "Industrial pollution affects air, water, and soil quality in industrial regions",
          "Waste disposal creates environmental hazards and health risks for nearby communities",
          "Labor exploitation including low wages and poor working conditions common in some industries",
          "Sustainable practices and strict regulation needed to minimize environmental and social damage"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Manufacturing",
        "meaning": "Process of transforming raw materials into finished goods through industrial production"
      },
      {
        "term": "Agro-based industries",
        "meaning": "Industries that process agricultural products as raw materials"
      },
      {
        "term": "Industrial location",
        "meaning": "Geographic area chosen for establishing industry based on availability of resources and markets"
      },
      {
        "term": "Capital goods",
        "meaning": "Equipment and machinery used in production rather than consumed directly by consumers"
      }
    ],
    "faqs": [
      {
        "q": "What factors determine where industries are located?",
        "a": "Industries locate based on proximity to raw materials, availability of labor and power, transport facilities, access to markets, and capital availability for investment."
      },
      {
        "q": "What are the environmental impacts of manufacturing industries?",
        "a": "Manufacturing causes air and water pollution, generates hazardous waste, depletes natural resources, and creates health risks for workers and nearby communities through emissions and waste."
      }
    ]
  },
  {
    "slug": "class-10-social-science-lifelines-national-economy",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Lifelines of National Economy",
    "intro": "Transportation and communication networks form the lifelines of any economy, connecting people, resources, and markets. Efficient infrastructure enables trade, reduces costs, and facilitates economic development across regions.",
    "sections": [
      {
        "heading": "Transportation Networks",
        "points": [
          "Railways carry bulk goods and passengers across country at low cost and high capacity",
          "Roads connect remote areas, provide flexibility for goods movement, and dominate short-distance transport",
          "Ports handle maritime trade connecting India to global markets and enabling import-export",
          "Airways facilitate fast transport of high-value goods and passengers for long distances"
        ]
      },
      {
        "heading": "Role of Railways",
        "points": [
          "Largest railway network in Asia connects all regions and reduces isolation of backward areas",
          "Essential for moving coal, minerals, grain, and other bulk commodities across country",
          "Provides affordable mass transport for millions of passengers daily across regions",
          "Major employer and revenue source for government through freight and passenger services"
        ]
      },
      {
        "heading": "Communication Networks",
        "points": [
          "Telegraph, postal service, and telephone connect people across distances enabling information flow",
          "Television and radio reach masses with information, education, and entertainment",
          "Internet and mobile networks revolutionized communication and enabled e-commerce and digital services",
          "Communication infrastructure essential for coordination in government, business, and social activities"
        ]
      },
      {
        "heading": "Trade and Economic Integration",
        "points": [
          "Transportation networks enable domestic trade connecting producers with consumers",
          "Ports and airways facilitate international trade and foreign exchange earnings",
          "Tourism supported by transportation and communication networks contributes to economy",
          "Efficient infrastructure reduces transaction costs and increases competitiveness of businesses"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Infrastructure",
        "meaning": "Basic facilities and systems like transport, communication, and utilities needed for economic activity"
      },
      {
        "term": "Port",
        "meaning": "Harbor facility for loading and unloading ships engaged in maritime trade"
      },
      {
        "term": "Bulk goods",
        "meaning": "Large quantities of commodities like coal, grain, and minerals transported for commercial purposes"
      },
      {
        "term": "E-commerce",
        "meaning": "Business transactions conducted electronically through internet and digital platforms"
      }
    ],
    "faqs": [
      {
        "q": "Why are railways considered lifelines of Indian economy?",
        "a": "Railways transport bulk goods like coal and grain at low cost, provide affordable mass transport, connect remote regions, and generate significant revenue for government."
      },
      {
        "q": "How has communication infrastructure changed the Indian economy?",
        "a": "Advanced communication through internet and mobile networks enabled e-commerce, digital services, real-time information flow, and reduced transaction costs in business and government."
      }
    ]
  },
  {
    "slug": "class-9-social-science-french-revolution",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "French Revolution",
    "intro": "The French Revolution (1789-1799) fundamentally transformed French society and had lasting impacts across Europe. It challenged feudalism, aristocratic privilege, and absolute monarchy while establishing principles of liberty, equality, and democracy.",
    "sections": [
      {
        "heading": "Causes of the Revolution",
        "points": [
          "Severe financial crisis from wars, luxury spending, and failed agricultural harvests",
          "Feudal system with rigid class divisions limiting opportunities for common people",
          "Enlightenment ideas promoted equality, rights, and democratic governance",
          "Resentment against absolute monarchy of King Louis XVI and privileges of nobility"
        ]
      },
      {
        "heading": "Major Events and Phases",
        "points": [
          "Storming of Bastille in 1789 symbolized popular uprising against royal authority",
          "Declaration of Rights of Man and Citizen established fundamental human rights and equality",
          "Abolition of feudalism ended seignorial dues and aristocratic privileges",
          "Reign of Terror (1793-1794) saw mass executions but also consolidated revolutionary gains"
        ]
      },
      {
        "heading": "Social and Political Changes",
        "points": [
          "Feudal system replaced by capitalist economy with private property rights",
          "Hereditary nobility abolished and careers opened based on merit not birth",
          "Church power reduced with seizure of property and reorganization of clergy",
          "Nationalism strengthened through conscription and revolutionary ideology spreading across Europe"
        ]
      },
      {
        "heading": "Legacy and Impact",
        "points": [
          "Modern concepts of citizenship, rights, and democracy emerged from revolutionary ideals",
          "Inspired nationalist and liberal movements across Europe throughout 19th century",
          "Secularization of society and state reduced role of Church in governance",
          "Social mobility increased as education and careers became accessible to common people"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Revolution",
        "meaning": "Violent overthrow of government and complete transformation of social and political system"
      },
      {
        "term": "Enlightenment",
        "meaning": "Intellectual movement promoting reason, rights, and scientific knowledge over tradition"
      },
      {
        "term": "Feudalism",
        "meaning": "Medieval system with king, nobility, and peasants in hierarchical relationship"
      },
      {
        "term": "Nationalism",
        "meaning": "Sense of loyalty to nation and prioritization of national interests over other identities"
      }
    ],
    "faqs": [
      {
        "q": "What were the main causes of the French Revolution?",
        "a": "Financial crisis, feudal system limiting opportunity, Enlightenment ideas promoting equality and democracy, and resentment against absolute monarchy sparked the revolution."
      },
      {
        "q": "How did the French Revolution change European politics?",
        "a": "It established principles of democracy, human rights, and nationalism that inspired liberal and nationalist movements across Europe in the following centuries."
      }
    ]
  },
  {
    "slug": "class-9-social-science-nazism-rise-hitler",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Nazism and Rise of Hitler",
    "intro": "Adolf Hitler and the Nazi Party rose to power in Germany during the 1930s, capitalizing on economic crisis and national humiliation. Nazi ideology based on racial supremacy, militarism, and totalitarianism led to World War II and the Holocaust.",
    "sections": [
      {
        "heading": "Context for Nazi Rise",
        "points": [
          "Treaty of Versailles imposed harsh penalties on Germany creating resentment and economic hardship",
          "Great Depression of 1929 caused mass unemployment and economic suffering in Germany",
          "Weimar Republic faced instability and citizens lost confidence in democratic system",
          "Nationalist and racist ideologies blamed Jews and foreigners for Germany's problems"
        ]
      },
      {
        "heading": "Hitler and Nazi Ideology",
        "points": [
          "Adolf Hitler emerged as charismatic leader promising to restore German greatness and honor",
          "Nazi ideology promoted racial supremacy of Aryan race and inferiority of other races",
          "Rejected democracy and parliamentary government in favor of totalitarian Fuhrer principle",
          "Promoted militarism and aggressive expansion to gain Lebensraum (living space) for Germany"
        ]
      },
      {
        "heading": "Consolidation of Power",
        "points": [
          "Nazis gained power through elections exploiting economic crisis and nationalist sentiments",
          "Hitler declared himself Fuhrer and eliminated opposition through secret police and violence",
          "Youth movements, propaganda, and education indoctrinated population with Nazi ideology",
          "Rearmament and economic policies created full employment and initial economic recovery"
        ]
      },
      {
        "heading": "Nazi Atrocities and World War",
        "points": [
          "Systematic persecution of Jews, Roma, disabled, and political opponents began in 1930s",
          "Holocaust resulted in genocide of six million Jews in concentration camps",
          "Invaded Poland in 1939 triggering World War II and territorial expansion across Europe",
          "Militarism and totalitarianism led to war crimes and destruction across occupied territories"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Nazism",
        "meaning": "Totalitarian ideology of Nazi party based on racial supremacy, nationalism, and militarism"
      },
      {
        "term": "Totalitarianism",
        "meaning": "System of government controlling all aspects of public and private life with no opposition allowed"
      },
      {
        "term": "Fascism",
        "meaning": "Authoritarian ultranationalist political ideology emphasizing strong central authority"
      },
      {
        "term": "Lebensraum",
        "meaning": "Nazi concept of living space needed for German people to expand eastward"
      }
    ],
    "faqs": [
      {
        "q": "What conditions enabled Hitler and Nazis to come to power?",
        "a": "Economic crisis from Great Depression, resentment over Treaty of Versailles, failure of Weimar democracy, and nationalist sentiment made people accept Nazi promises of strength and restoration."
      },
      {
        "q": "What were the consequences of Nazi rule?",
        "a": "Nazi rule led to World War II, the Holocaust killing six million Jews, persecution of minorities, and destruction and suffering across Europe."
      }
    ]
  },
  {
    "slug": "class-9-social-science-physical-features-india",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Physical Features of India",
    "intro": "India's diverse physical geography includes mountains, plateaus, plains, and coastal regions that influence climate, vegetation, and human activities. Understanding these features is essential for studying geography and environmental management.",
    "sections": [
      {
        "heading": "Major Physiographic Divisions",
        "points": [
          "Northern Mountains including Himalayas are young folded mountains with high peaks and deep valleys",
          "Himalayan region rich in minerals, forests, and rivers originating from glaciers",
          "Indo-Gangetic Plain vast fertile alluvial plain supporting dense population and agriculture",
          "Deccan Plateau elevated table land with rivers flowing eastward to Bay of Bengal"
        ]
      },
      {
        "heading": "Coastal and Island Features",
        "points": [
          "Western Ghats parallel to western coast create rain shadow effect and contain biodiversity",
          "Eastern Ghats lower mountains running along eastern coast with significant mineral deposits",
          "Coastal plains low-lying regions between ghats and seas suitable for agriculture and ports",
          "Andaman and Nicobar Islands and Lakshadweep Islands have tropical climate and unique ecosystems"
        ]
      },
      {
        "heading": "Climate Zones and Vegetation",
        "points": [
          "Tropical regions near equator receive high rainfall and support dense tropical forests",
          "Temperate regions in mountains have moderate climate suitable for orchards and cereals",
          "Desert regions in northwest receive scanty rainfall with sparse vegetation and grasslands",
          "Alpine vegetation on high mountains gives way to forests, grasslands, and barren peaks"
        ]
      },
      {
        "heading": "River Systems",
        "points": [
          "Himalayan rivers like Ganges and Indus carry glacial meltwater and support millions",
          "Deccan rivers like Godavari and Krishna flow from west to east into Bay of Bengal",
          "Rivers provide water for agriculture, industry, and domestic use supporting human civilization",
          "Floods and droughts related to monsoon variability affect river flow and regional development"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Physiography",
        "meaning": "Study of physical features of Earth including landforms, climate, and water systems"
      },
      {
        "term": "Alluvial plain",
        "meaning": "Flat low-lying area formed by deposition of sediments from rivers, highly fertile"
      },
      {
        "term": "Ghats",
        "meaning": "Mountain ranges running parallel to Indian coasts with varying elevations"
      },
      {
        "term": "Rain shadow effect",
        "meaning": "Phenomenon where windward side of mountains receives high rainfall while leeward side remains dry"
      }
    ],
    "faqs": [
      {
        "q": "What are the major physical regions of India?",
        "a": "India has Northern Mountains (Himalayas), Indo-Gangetic Plain, Deccan Plateau, and Coastal Plains, each with distinct topography, climate, and vegetation."
      },
      {
        "q": "How do physical features influence human activities in India?",
        "a": "Mountains provide minerals and hydroelectric power, plains support agriculture, rivers provide water and transportation, and coasts enable trade and ports."
      }
    ]
  },
  {
    "slug": "class-9-social-science-drainage",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Drainage",
    "intro": "Drainage systems refer to the network of rivers and water bodies that collect and transport water across the landscape. Understanding drainage patterns is crucial for water management, agriculture, and understanding regional geography.",
    "sections": [
      {
        "heading": "Types of Drainage Systems",
        "points": [
          "Dendritic drainage resembles tree branches with tributaries joining main river at various angles",
          "Trellis drainage occurs in folded mountains where rivers run parallel in valleys",
          "Radial drainage radiates from elevated point like mountain or plateau in different directions",
          "Rectangular drainage follows rectangular pattern determined by geological structure"
        ]
      },
      {
        "heading": "Major River Systems",
        "points": [
          "Indus River system originates in Tibet, flows through Pakistan with tributaries in Punjab region",
          "Ganges River system largest in India, originates in Himalayas, supports dense population in north India",
          "Brahmaputra River flows through northeast India, subject to severe floods and erosion",
          "Deccan rivers like Godavari, Krishna, Narmada flow eastward or southward from plateau regions"
        ]
      },
      {
        "heading": "Characteristics of Indian Rivers",
        "points": [
          "Himalayan rivers perennial with water throughout year from glacial melt and monsoon",
          "Peninsular rivers have seasonal flow depending on monsoon with flood and drought variations",
          "Rivers carry sediments from erosion and deposit them in flood plains and deltas",
          "Flood plains and deltas are most fertile regions supporting dense agricultural populations"
        ]
      },
      {
        "heading": "Drainage and Water Management",
        "points": [
          "Dams and reservoirs built to store water for irrigation, power generation, and flood control",
          "Inter-linking of rivers proposed to redistribute water from surplus to deficit regions",
          "Groundwater and aquifers provide water in regions with low surface water availability",
          "Pollution of rivers from industrial and urban waste threatens water quality and ecosystems"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Drainage",
        "meaning": "System of rivers and water bodies that collect and transport water across landscape"
      },
      {
        "term": "Tributary",
        "meaning": "Small river or stream that flows into a larger river"
      },
      {
        "term": "Perennial river",
        "meaning": "River that has water flowing throughout the year"
      },
      {
        "term": "Delta",
        "meaning": "Triangular low-lying area where river deposits sediments as it meets the sea"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between Himalayan and Peninsular rivers?",
        "a": "Himalayan rivers are perennial with water year-round from glacial melt, while Peninsular rivers are seasonal with flow dependent on monsoon rains."
      },
      {
        "q": "How do rivers contribute to human civilization in India?",
        "a": "Rivers provide water for agriculture and industry, support transportation and trade, generate hydroelectric power, and create fertile regions for settlement and agriculture."
      }
    ]
  },
  {
    "slug": "class-9-social-science-climate",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Climate",
    "intro": "Climate refers to long-term weather patterns and atmospheric conditions of a region determined by latitude, altitude, and proximity to water bodies. India's climate is influenced by monsoons and varies significantly across regions.",
    "sections": [
      {
        "heading": "Factors Determining Climate",
        "points": [
          "Latitude determines angle of sun's rays and seasonal temperature variations across regions",
          "Altitude decreases temperature with increase in elevation at approximately 1 degree per 165 meters",
          "Proximity to water bodies moderates temperature and increases precipitation in coastal areas",
          "Wind patterns and ocean currents influence temperature, precipitation, and seasonal weather"
        ]
      },
      {
        "heading": "Indian Monsoon System",
        "points": [
          "Southwest monsoon (June-September) brings heavy rainfall to most of India causing agricultural seasons",
          "Northeast monsoon (October-February) brings rainfall to southeast coast and influence dry season in north",
          "Monsoon burst marks sudden onset bringing torrential rain after dry summer season",
          "Monsoon variability causes floods and droughts affecting agriculture and water availability"
        ]
      },
      {
        "heading": "Regional Climate Variations",
        "points": [
          "Tropical regions near equator have high temperature and rainfall supporting tropical forests",
          "Temperate regions in mountains have moderate temperature suitable for specific crops",
          "Desert regions receive less than 25 cm annual rainfall with high temperatures and low vegetation",
          "Coastal regions have moderate temperature with high humidity and influence of maritime winds"
        ]
      },
      {
        "heading": "Climate and Human Activities",
        "points": [
          "Agricultural calendar follows monsoon pattern with planting and harvesting seasons",
          "Water availability from monsoon determines irrigation needs and drought management",
          "Climate influences choice of crops, type of vegetation, and biodiversity in different regions",
          "Extreme weather events like floods and droughts cause economic loss and human suffering"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Climate",
        "meaning": "Long-term average weather pattern of a region determined by atmospheric and geographical factors"
      },
      {
        "term": "Monsoon",
        "meaning": "Seasonal wind pattern bringing heavy rainfall during particular season of the year"
      },
      {
        "term": "Precipitation",
        "meaning": "Water falling from atmosphere as rain, snow, sleet, or hail"
      },
      {
        "term": "Weather",
        "meaning": "Atmospheric conditions of a region at a particular time or short period"
      }
    ],
    "faqs": [
      {
        "q": "What is the role of monsoon in Indian climate and agriculture?",
        "a": "Monsoon brings seasonal rainfall essential for agriculture, determines agricultural calendar, and affects water availability. Monsoon variability causes floods and droughts affecting food production."
      },
      {
        "q": "How does latitude and altitude affect climate?",
        "a": "Latitude determines sun angle and temperature with tropical regions hotter than polar regions. Altitude decreases temperature with elevation, creating distinct climate zones on mountains."
      }
    ]
  },
  {
    "slug": "class-9-social-science-what-is-democracy",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "What is Democracy",
    "intro": "Democracy is a system of government where power rests with the people exercised through voting and representation. It is based on principles of equality, freedom, and accountability ensuring protection of individual rights.",
    "sections": [
      {
        "heading": "Meaning and Principles of Democracy",
        "points": [
          "Democracy means rule by the people through free and fair elections at regular intervals",
          "Principles include equality before law, protection of individual rights, and peaceful transfer of power",
          "Citizens have freedom of speech, expression, and association to participate in governance",
          "Majority rule balanced by minority protection ensures protection of all groups"
        ]
      },
      {
        "heading": "Forms of Democracy",
        "points": [
          "Direct democracy citizens participate directly in decision-making like ancient Athens",
          "Representative democracy citizens elect representatives to make decisions on their behalf",
          "Parliamentary democracy legislative body is supreme and executive answers to legislature",
          "Presidential democracy separation of powers between executive and legislative branches"
        ]
      },
      {
        "heading": "Features of Democratic Governance",
        "points": [
          "Universal adult suffrage gives voting rights to all adults regardless of property or education",
          "Periodic elections allow citizens to choose representatives and hold government accountable",
          "Constitutional framework limits government power and protects fundamental rights of citizens",
          "Independent judiciary interprets laws and protects constitutional rights and rule of law"
        ]
      },
      {
        "heading": "Democracy in Practice",
        "points": [
          "Separation of powers prevents concentration of power in any single branch or person",
          "Press freedom enables media to report on government and educate public on issues",
          "Civil society organizations mobilize citizens around issues and hold government accountable",
          "Debate and discussion on policy allow different views to be heard and considered"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Democracy",
        "meaning": "System of government where power rests with people exercised through voting and representation"
      },
      {
        "term": "Suffrage",
        "meaning": "Right to vote in elections and political decision-making processes"
      },
      {
        "term": "Constitution",
        "meaning": "Written document outlining structure of government and protecting fundamental rights of citizens"
      },
      {
        "term": "Accountability",
        "meaning": "Responsibility of government to answer to people for its actions and policies"
      }
    ],
    "faqs": [
      {
        "q": "What are the key features of a democratic system?",
        "a": "Key features include universal suffrage, periodic elections, constitutional limits on power, protection of rights, independent judiciary, and separation of powers."
      },
      {
        "q": "How is representative democracy different from direct democracy?",
        "a": "In representative democracy, citizens elect representatives to make decisions on their behalf. In direct democracy, citizens participate directly in all decisions."
      }
    ]
  },
  {
    "slug": "class-9-social-science-constitutional-design",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Constitutional Design",
    "intro": "A constitution is a supreme law that defines the structure of government, distribution of powers, and fundamental rights of citizens. India's constitution is the world's longest, reflecting its diverse society and democratic values.",
    "sections": [
      {
        "heading": "Purpose of Constitution",
        "points": [
          "Defines structure and powers of government establishing separation of executive, legislature, and judiciary",
          "Lists fundamental rights and freedoms of citizens that government cannot infringe",
          "Specifies procedures for law-making, taxation, and governance at different levels",
          "Protects minorities and ensures equality before law preventing discrimination"
        ]
      },
      {
        "heading": "Indian Constitution Features",
        "points": [
          "Longest constitution reflecting diversity of India with detailed provisions for all aspects of governance",
          "Parliamentary system where executive is responsible to legislature creating checks and balances",
          "Federal structure divides power between central and state governments protecting regional autonomy",
          "Secular nature ensures no state religion and protects rights of religious minorities"
        ]
      },
      {
        "heading": "Fundamental Rights and Duties",
        "points": [
          "Right to equality ensures equal treatment and non-discrimination on grounds of religion, caste, or gender",
          "Right to freedom includes freedom of speech, expression, assembly, and movement",
          "Right to education ensures basic education for all children as fundamental right",
          "Fundamental duties encourage citizens to respect constitution and contribute to national development"
        ]
      },
      {
        "heading": "Amendment and Evolution",
        "points": [
          "Constitution can be amended through prescribed procedures requiring large parliamentary majority",
          "Supreme Court has power to interpret constitution and declare laws unconstitutional if needed",
          "Constitution has evolved through amendments protecting rights and adapting to changing times",
          "Directive Principles guide state policy towards achieving social and economic justice"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Constitution",
        "meaning": "Supreme law of the country defining government structure, powers, and citizen rights"
      },
      {
        "term": "Fundamental rights",
        "meaning": "Basic rights of citizens that government cannot violate and are enforceable in courts"
      },
      {
        "term": "Amendment",
        "meaning": "Process of changing provisions of constitution through formal legislative procedure"
      },
      {
        "term": "Secularism",
        "meaning": "Principle that state has no official religion and treats all religions equally"
      }
    ],
    "faqs": [
      {
        "q": "Why is India's constitution considered unique?",
        "a": "India's constitution is the longest, reflecting its diversity with detailed provisions for all aspects of governance, and ensures rights protection, federalism, and secularism."
      },
      {
        "q": "What are Fundamental Rights and how are they protected?",
        "a": "Fundamental Rights are basic rights guaranteed to all citizens including equality and freedom. They are protected by Supreme Court which can declare laws unconstitutional if they violate these rights."
      }
    ]
  },
  {
    "slug": "class-9-social-science-electoral-politics",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Electoral Politics",
    "intro": "Electoral politics involves the process of holding elections, casting votes, and selecting representatives in a democracy. Fair elections are essential for democratic governance and ensuring accountability of elected officials.",
    "sections": [
      {
        "heading": "Election System in India",
        "points": [
          "Universal adult suffrage gives voting rights to all citizens above 18 years regardless of literacy or property",
          "Free and fair elections conducted by independent Election Commission at regular intervals",
          "Multiple political parties compete in elections offering different ideologies and policies to voters",
          "Coalition governments formed when no single party gets absolute majority in parliamentary elections"
        ]
      },
      {
        "heading": "Types of Elections",
        "points": [
          "General elections held to elect members of national and state legislatures",
          "By-elections held to fill vacancies caused by death or resignation of elected representatives",
          "Local body elections for municipal corporations and village panchayats at grassroots level",
          "Direct elections for President of India exercised through electoral college of elected representatives"
        ]
      },
      {
        "heading": "Electoral Process",
        "points": [
          "Voter registration process adds eligible citizens to electoral rolls for voting",
          "Election campaign allows parties and candidates to present policies and appeal to voters",
          "Voting conducted on designated dates at polling stations with secrecy and security",
          "Counting of votes determines winners and announced results make elected representatives"
        ]
      },
      {
        "heading": "Role of Political Parties",
        "points": [
          "Political parties aggregate interests of different groups and present unified programs to voters",
          "Party manifesto outlines positions on major issues helping voters make informed choices",
          "Electoral competition between parties ensures accountability and responsiveness to citizens",
          "Coalition politics requires negotiation and compromise among multiple parties on policy priorities"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Suffrage",
        "meaning": "Right to vote in elections for choosing political representatives"
      },
      {
        "term": "Election commission",
        "meaning": "Independent body that conducts elections and ensures they are free, fair, and transparent"
      },
      {
        "term": "Political party",
        "meaning": "Organized group of people with common ideology competing in elections for power"
      },
      {
        "term": "Coalition government",
        "meaning": "Government formed by alliance of multiple political parties sharing power"
      }
    ],
    "faqs": [
      {
        "q": "What makes Indian elections unique and democratic?",
        "a": "Indian elections are unique due to universal adult suffrage, independent election commission ensuring fairness, multiple parties competing, and regular elections making government accountable."
      },
      {
        "q": "How do political parties contribute to democratic elections?",
        "a": "Political parties aggregate diverse interests, present programs to voters, compete in elections, and form governments ensuring that elected representatives are accountable to citizens."
      }
    ]
  },
  {
    "slug": "class-9-social-science-poverty-challenge",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Poverty as a Challenge",
    "intro": "Poverty refers to lack of income and resources to meet basic needs like food, shelter, and education. It remains a major challenge in India affecting millions and requiring coordinated efforts for reduction and elimination.",
    "sections": [
      {
        "heading": "Types and Dimensions of Poverty",
        "points": [
          "Absolute poverty inability to meet basic needs for survival like food and shelter",
          "Relative poverty deprivation relative to others in society affecting social participation",
          "Income poverty measured by income below poverty line insufficient for basic needs",
          "Multidimensional poverty includes lack of health, education, and social services besides income"
        ]
      },
      {
        "heading": "Causes of Poverty in India",
        "points": [
          "Unequal distribution of land and resources among population concentrated in few hands",
          "Lack of quality education limits opportunities for employment and income generation",
          "Unemployment and underemployment particularly in rural areas force people into poverty",
          "Discrimination against women, lower castes, and minorities restricts their economic opportunities"
        ]
      },
      {
        "heading": "Impact of Poverty",
        "points": [
          "Health deteriorates due to malnutrition and lack of access to healthcare facilities",
          "Education suffers as poor children work or stay home preventing skill development",
          "Social problems like crime and substance abuse increase in poverty-stricken areas",
          "Environmental degradation as poor people depend on natural resources for survival"
        ]
      },
      {
        "heading": "Poverty Reduction Strategies",
        "points": [
          "Land reform and asset distribution increase opportunities for wealth creation among poor",
          "Provision of quality education and skill development create employment opportunities",
          "Employment guarantee schemes like MGNREGA provide work to rural poor during lean seasons",
          "Social safety nets including food distribution and healthcare protect most vulnerable"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Poverty line",
        "meaning": "Income level below which person is classified as poor and unable to meet basic needs"
      },
      {
        "term": "Absolute poverty",
        "meaning": "State of deprivation where person lacks resources for basic survival"
      },
      {
        "term": "Underemployment",
        "meaning": "Situation where person is employed but not fully utilizing skills or working part-time"
      },
      {
        "term": "MGNREGA",
        "meaning": "Mahatma Gandhi National Rural Employment Guarantee Act providing guaranteed employment to rural poor"
      }
    ],
    "faqs": [
      {
        "q": "What are the main causes of poverty in India?",
        "a": "Unequal distribution of resources, lack of quality education, unemployment, discrimination against marginalized groups, and lack of social services perpetuate poverty."
      },
      {
        "q": "How can poverty be reduced in India?",
        "a": "Through land reform, quality education and skill development, employment guarantee schemes, redistribution of resources, and social safety nets protecting vulnerable populations."
      }
    ]
  },
  {
    "slug": "class-8-science-crop-production",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Crop Production and Management",
    "intro": "Crop production involves cultivation of plants for food and other purposes through systematic management. Understanding agricultural practices, crop varieties, and soil management is essential for sustainable farming and food security.",
    "sections": [
      {
        "heading": "Preparation of Soil",
        "points": [
          "Soil preparation involves ploughing to break soil clumps and increase water retention capacity",
          "Addition of organic matter like compost improves soil fertility and structure",
          "Soil testing determines nutrient content and guides application of fertilizers",
          "Leveling of field ensures uniform water distribution during irrigation"
        ]
      },
      {
        "heading": "Sowing of Seeds",
        "points": [
          "Selection of quality seeds ensures high germination rate and better yield",
          "Seeds are sown at optimal depth and spacing determined by crop type",
          "Traditional broadcasting and modern drilling are methods of seed sowing",
          "Seed treatment with fungicides protects against soil-borne diseases"
        ]
      },
      {
        "heading": "Nutrient Management",
        "points": [
          "Nitrogen, phosphorus, and potassium are essential nutrients for plant growth",
          "Manure and compost provide organic nutrients and improve soil structure",
          "Chemical fertilizers provide quick nutrient supply but can harm soil long-term",
          "Crop rotation helps maintain soil fertility by alternating nitrogen-fixing crops"
        ]
      },
      {
        "heading": "Protection from Diseases and Pests",
        "points": [
          "Physical methods include removal of affected plants and changing crop pattern",
          "Chemical methods use pesticides and insecticides to control pests and diseases",
          "Biological methods use natural predators and parasites to control harmful organisms",
          "Integrated pest management combines multiple approaches for sustainable control"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Tillage",
        "meaning": "Process of breaking and turning soil to prepare it for cultivation"
      },
      {
        "term": "Germination",
        "meaning": "Process of seed sprouting and developing into a plant"
      },
      {
        "term": "Nutrient",
        "meaning": "Element essential for plant growth like nitrogen, phosphorus, and potassium"
      },
      {
        "term": "Pesticide",
        "meaning": "Chemical substance used to kill or repel harmful insects and pests"
      }
    ],
    "faqs": [
      {
        "q": "Why is soil preparation important for crop production?",
        "a": "Soil preparation increases water retention capacity, improves aeration, reduces soil compaction, and enhances nutrient availability for better plant growth and higher yield."
      },
      {
        "q": "What is crop rotation and why is it practiced?",
        "a": "Crop rotation is alternating different crops on same land which helps maintain soil fertility, reduces pest buildup, and improves soil structure and productivity."
      }
    ]
  },
  {
    "slug": "class-8-science-microorganisms",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Microorganisms: Friend and Foe",
    "intro": "Microorganisms are tiny living organisms visible only under microscopes including bacteria, viruses, fungi, and protozoa. They play crucial roles in nature and human life - some are beneficial while others cause diseases.",
    "sections": [
      {
        "heading": "Types of Microorganisms",
        "points": [
          "Bacteria are single-celled prokaryotes found everywhere on Earth",
          "Fungi include yeasts and molds that decompose organic matter",
          "Viruses are non-living infectious agents that require host cells to reproduce",
          "Protozoa are single-celled eukaryotes many of which are parasitic"
        ]
      },
      {
        "heading": "Beneficial Microorganisms",
        "points": [
          "Bacteria in soil fix nitrogen making it available to plants",
          "Lactobacillus bacteria ferment milk to produce yogurt and cheese",
          "Fungi decompose dead organic matter returning nutrients to soil",
          "Yeast ferments sugars to produce bread and alcoholic beverages"
        ]
      },
      {
        "heading": "Harmful Microorganisms",
        "points": [
          "Pathogenic bacteria cause diseases like cholera, typhoid, and tuberculosis",
          "Viruses cause diseases like influenza, measles, and HIV infection",
          "Fungi cause diseases like ringworm and athlete's foot in humans",
          "Spoilage organisms damage food causing putrefaction and fermentation"
        ]
      },
      {
        "heading": "Preservation of Food",
        "points": [
          "Refrigeration slows microbial growth by reducing metabolic rate",
          "Heat treatment kills microorganisms preventing food spoilage",
          "Salting and pickling create hostile environment for microbial growth",
          "Drying removes water which microorganisms need to survive"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Microorganism",
        "meaning": "Tiny organism visible only under microscope including bacteria, virus, fungus, and protozoan"
      },
      {
        "term": "Pathogenic",
        "meaning": "Capable of causing disease in host organism"
      },
      {
        "term": "Decomposition",
        "meaning": "Process of breaking down dead organic matter by microorganisms"
      },
      {
        "term": "Fermentation",
        "meaning": "Process where microorganisms break down organic compounds in absence of oxygen"
      }
    ],
    "faqs": [
      {
        "q": "Why are some microorganisms beneficial and others harmful?",
        "a": "Beneficial microorganisms help in nitrogen fixation, food production, and decomposition. Harmful ones cause diseases or spoil food and materials."
      },
      {
        "q": "How does refrigeration preserve food?",
        "a": "Refrigeration slows the reproduction of microorganisms by lowering temperature, extending shelf life of food without using chemical preservatives."
      }
    ]
  },
  {
    "slug": "class-8-science-cell-structure",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Cell: Structure and Functions",
    "intro": "Cell is the basic unit of life and all living organisms are made of cells. Understanding cell structure and functions is essential for comprehending how life processes occur at microscopic level.",
    "sections": [
      {
        "heading": "Characteristics of Cells",
        "points": [
          "All living organisms are composed of cells",
          "Cells arise only from pre-existing cells through cell division",
          "Cells are smallest unit of life that can perform all functions of living organisms",
          "Bacteria are unicellular organisms while plants and animals are multicellular"
        ]
      },
      {
        "heading": "Plant Cell Structure",
        "points": [
          "Cell wall provides structural support and protection to plant cells",
          "Cell membrane controls movement of substances in and out of cell",
          "Nucleus contains genetic material and controls cellular activities",
          "Chloroplasts present in green cells carry out photosynthesis"
        ]
      },
      {
        "heading": "Animal Cell Structure",
        "points": [
          "Cell membrane is outer boundary controlling substance movement",
          "Nucleus contains DNA and controls cell functions",
          "Cytoplasm contains organelles like mitochondria and ribosomes",
          "Lacks cell wall and chloroplasts unlike plant cells"
        ]
      },
      {
        "heading": "Cell Organelles and Functions",
        "points": [
          "Mitochondria produce energy through cellular respiration",
          "Ribosomes are sites of protein synthesis",
          "Endoplasmic reticulum transports proteins and lipids",
          "Golgi apparatus modifies and packages proteins for transport"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Cell",
        "meaning": "Basic unit of life that is smallest living unit of organism"
      },
      {
        "term": "Nucleus",
        "meaning": "Membrane-bound organelle containing genetic material (DNA) in eukaryotic cells"
      },
      {
        "term": "Cytoplasm",
        "meaning": "Gel-like substance inside cell containing organelles and other components"
      },
      {
        "term": "Organelle",
        "meaning": "Specialized structure within cell that performs specific functions"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between plant and animal cells?",
        "a": "Plant cells have cell wall, chloroplasts, and large vacuoles while animal cells lack these. Plant cells are rigid while animal cells are more flexible."
      },
      {
        "q": "What is the function of mitochondria?",
        "a": "Mitochondria convert nutrients into ATP through cellular respiration, providing energy for cell functions. They are called powerhouse of the cell."
      }
    ]
  },
  {
    "slug": "class-8-science-reproduction-in-animals",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Reproduction in Animals",
    "intro": "Reproduction is the process by which organisms produce offspring to continue their species. Most animals reproduce sexually, involving male and female gametes.",
    "sections": [
      {
        "heading": "Modes of Reproduction",
        "points": [
          "Asexual reproduction produces offspring from a single parent without gamete fusion",
          "Sexual reproduction involves fusion of male and female gametes",
          "Budding, fission, and fragmentation are types of asexual reproduction in animals",
          "Most complex animals reproduce sexually"
        ]
      },
      {
        "heading": "Male Reproductive System",
        "points": [
          "Testes produce sperm cells through spermatogenesis",
          "Seminal vesicles add nutrients to sperm",
          "Prostate gland contributes fluid to semen",
          "Penis delivers semen during copulation",
          "Sperm are mobile male gametes with flagellum for movement"
        ]
      },
      {
        "heading": "Female Reproductive System",
        "points": [
          "Ovaries produce egg cells through oogenesis",
          "Fallopian tubes transport eggs from ovary to uterus",
          "Uterus provides a protected environment for fetal development",
          "Cervix connects uterus to vagina",
          "Vagina is the birth canal and receives sperm during mating"
        ]
      },
      {
        "heading": "Fertilization and Development",
        "points": [
          "Fertilization occurs when sperm fuses with egg nucleus in fallopian tube",
          "Zygote is formed and begins dividing",
          "Embryo implants in uterine wall",
          "Fetus develops in uterus for approximately nine months in humans",
          "Birth occurs when fetus is fully developed"
        ]
      },
      {
        "heading": "Puberty in Adolescents",
        "points": [
          "Puberty is the period of physical growth and sexual maturation",
          "Begins around ages 10-14 in females and 12-16 in males",
          "Triggered by hormones from pituitary and reproductive glands",
          "Causes development of secondary sexual characteristics"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Gamete",
        "meaning": "Reproductive cell that carries half the genetic information; sperm or egg"
      },
      {
        "term": "Fertilization",
        "meaning": "Fusion of male and female gametes to form a zygote"
      },
      {
        "term": "Puberty",
        "meaning": "Period of physical maturation and development of sexual characteristics"
      },
      {
        "term": "Zygote",
        "meaning": "Cell formed by fusion of sperm and egg after fertilization"
      }
    ],
    "faqs": [
      {
        "q": "How long does human pregnancy last?",
        "a": "Human pregnancy lasts approximately nine months or about 280 days from fertilization until birth."
      },
      {
        "q": "What is the role of the placenta during pregnancy?",
        "a": "The placenta connects the fetus to the mother, allowing exchange of nutrients, oxygen, and waste products between them."
      }
    ]
  },
  {
    "slug": "class-8-science-force-and-pressure",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Force and Pressure",
    "intro": "Force is a push or pull that can change the motion or shape of an object. Pressure is the force applied per unit area and has important applications in daily life.",
    "sections": [
      {
        "heading": "Concept of Force",
        "points": [
          "Force is a push or pull exerted on an object",
          "Forces can change the speed, direction, or shape of an object",
          "Contact forces require physical contact; non-contact forces act at a distance",
          "Weight is the force exerted by gravity on an object",
          "Friction is a force that opposes motion between surfaces"
        ]
      },
      {
        "heading": "Pressure Definition and Formula",
        "points": [
          "Pressure is force applied perpendicular to a surface divided by the area",
          "Formula: Pressure = Force / Area",
          "Unit of pressure is Pascal (Pa) in SI system",
          "Pressure depends on both force and area of contact"
        ]
      },
      {
        "heading": "Pressure in Solids",
        "points": [
          "Pressure in solids acts perpendicular to the surface",
          "Sharper objects exert greater pressure with the same force due to smaller area",
          "Demonstration: needle point creates more pressure than blunt end with same force",
          "Skiing on snow uses wide skis to reduce pressure and prevent sinking"
        ]
      },
      {
        "heading": "Pressure in Fluids",
        "points": [
          "Fluids include liquids and gases that can flow",
          "Pressure in fluids acts in all directions equally",
          "Atmospheric pressure is the weight of air above us at sea level",
          "Water pressure increases with depth due to weight of water above",
          "Buoyancy is the upward force exerted by fluids on submerged objects"
        ]
      },
      {
        "heading": "Applications of Pressure",
        "points": [
          "Hydraulic systems use fluid pressure to multiply force in machines",
          "Syringes use pressure differences to draw and expel fluids",
          "Vacuum cleaners work by creating pressure difference",
          "Suckers use pressure difference to create adhesion"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Force",
        "meaning": "A push or pull that can change motion or shape of an object"
      },
      {
        "term": "Pressure",
        "meaning": "Force per unit area exerted on a surface"
      },
      {
        "term": "Friction",
        "meaning": "Force that opposes motion between two surfaces in contact"
      },
      {
        "term": "Buoyancy",
        "meaning": "Upward force exerted by a fluid on a submerged or floating object"
      }
    ],
    "faqs": [
      {
        "q": "Why do we use sharp objects like knives instead of blunt ones?",
        "a": "Sharp objects have smaller contact area, so they exert greater pressure on the object being cut, making them more effective."
      },
      {
        "q": "Why do we feel more pressure the deeper we go in water?",
        "a": "Water pressure increases with depth because the weight of water above increases, exerting more force on objects below."
      }
    ]
  },
  {
    "slug": "class-8-science-sound",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Sound",
    "intro": "Sound is a form of energy produced by vibrating objects that travels through matter as waves. Understanding sound properties helps us perceive the world and develop technology.",
    "sections": [
      {
        "heading": "Production and Propagation of Sound",
        "points": [
          "Sound is produced by vibrating objects that cause air molecules to vibrate",
          "Sound travels as longitudinal waves through media",
          "Sound requires a medium like air, water, or solids to travel",
          "Sound cannot travel in vacuum because there are no molecules to vibrate",
          "Sound travels slower than light, which is why we see lightning before hearing thunder"
        ]
      },
      {
        "heading": "Characteristics of Sound Waves",
        "points": [
          "Wavelength is the distance between consecutive compressions or rarefactions",
          "Frequency is the number of sound waves produced per second measured in Hertz",
          "Amplitude is the maximum displacement of particles from mean position",
          "Speed of sound in air at 20 degrees Celsius is approximately 343 meters per second",
          "Speed of sound is fastest in solids, slower in liquids, and slowest in gases"
        ]
      },
      {
        "heading": "Pitch and Loudness",
        "points": [
          "Pitch is determined by frequency; higher frequency means higher pitch",
          "Loudness is determined by amplitude of sound waves",
          "Decibel is the unit used to measure loudness",
          "Sound louder than 80 decibels can cause hearing damage with prolonged exposure",
          "Different frequencies are heard by different age groups; high frequencies heard better by young people"
        ]
      },
      {
        "heading": "Echo and Reflection",
        "points": [
          "Echo is the reflection of sound from a distant surface",
          "Minimum distance for distinct echo is approximately 17 meters",
          "Sound reflects from hard surfaces like walls and cliffs",
          "Soft materials absorb sound and reduce echo",
          "Sonar and ultrasound use sound reflection for detection and imaging"
        ]
      },
      {
        "heading": "Human Hearing",
        "points": [
          "Humans can hear frequencies between 20 Hertz and 20,000 Hertz",
          "Infrasound has frequencies below 20 Hertz; ultrasound above 20,000 Hertz",
          "Ear consists of outer, middle, and inner parts",
          "Eardrum vibrates in response to sound waves",
          "Prolonged loud noise causes permanent hearing loss"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Sound",
        "meaning": "Energy produced by vibrations that travels through matter as waves"
      },
      {
        "term": "Frequency",
        "meaning": "Number of sound waves produced per second, measured in Hertz"
      },
      {
        "term": "Pitch",
        "meaning": "How high or low a sound is, determined by its frequency"
      },
      {
        "term": "Echo",
        "meaning": "Reflected sound heard after a distinct time gap from the source"
      }
    ],
    "faqs": [
      {
        "q": "Why is there a delay between seeing lightning and hearing thunder?",
        "a": "Light travels much faster than sound. Light reaches us almost instantly, but sound takes time to travel, creating a delay."
      },
      {
        "q": "Why do we use soft materials in music rooms?",
        "a": "Soft materials absorb sound waves and reduce unwanted echoes, improving acoustics for music recording and performance."
      }
    ]
  },
  {
    "slug": "class-8-science-chemical-effects-of-current",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Chemical Effects of Electric Current",
    "intro": "Electric current flowing through certain solutions can cause chemical reactions, leading to decomposition, displacement, and plating. These effects have practical applications in industry.",
    "sections": [
      {
        "heading": "Electrolysis Concept",
        "points": [
          "Electrolysis is the process of chemical decomposition using electric current",
          "Electric current flows through a solution containing ions",
          "Positive ions move to cathode, negative ions move to anode",
          "Chemical changes occur at the electrodes",
          "Electrolysis requires external source of electrical energy"
        ]
      },
      {
        "heading": "Electrolysis of Water",
        "points": [
          "Water can be decomposed into hydrogen and oxygen using electric current",
          "Hydrogen gas forms at cathode, oxygen gas forms at anode",
          "Oxygen is collected twice the volume of hydrogen",
          "Sulphuric acid is added to increase conductivity of water",
          "This demonstrates chemical change due to electric current"
        ]
      },
      {
        "heading": "Electroplating Process",
        "points": [
          "Electroplating is coating a metal object with another metal using electrolysis",
          "Object to be plated is cathode, coating metal is anode",
          "Coating metal dissolves from anode and deposits on cathode",
          "Electrolyte is a salt solution of the coating metal",
          "Applications include chrome plating, silver plating, and gold plating of jewelry"
        ]
      },
      {
        "heading": "Electrometallurgy",
        "points": [
          "Extraction of metals from ores using electrolysis",
          "Aluminum is extracted from bauxite using electrolysis",
          "Copper is refined using electrolysis for high purity",
          "More reactive metals are extracted using electrolysis rather than reduction",
          "Industrial scale electrolysis requires large amounts of electrical energy"
        ]
      },
      {
        "heading": "Conduction and Conductors",
        "points": [
          "Ionic compounds conduct electricity when dissolved or molten",
          "Aqueous solutions of acids, bases, and salts are good conductors",
          "Pure water is a poor conductor; impurities increase conductivity",
          "Metallic conductors allow electron flow; ionic solutions allow ion flow",
          "Electrode material affects the type of chemical reaction in electrolysis"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Electrolysis",
        "meaning": "Chemical decomposition of a substance using electric current"
      },
      {
        "term": "Electroplating",
        "meaning": "Process of coating an object with a thin layer of another metal using electrolysis"
      },
      {
        "term": "Electrode",
        "meaning": "Conductor through which electric current enters or leaves a solution"
      },
      {
        "term": "Electrolyte",
        "meaning": "Substance that conducts electricity when dissolved or molten"
      }
    ],
    "faqs": [
      {
        "q": "Why is sulphuric acid added to water before electrolysis?",
        "a": "Pure water is a poor conductor. Adding sulphuric acid increases the concentration of ions, improving electrical conductivity."
      },
      {
        "q": "What is the purpose of electroplating?",
        "a": "Electroplating protects metals from corrosion, provides aesthetic appeal, and improves wear resistance of surfaces."
      }
    ]
  },
  {
    "slug": "class-8-maths-rational-numbers",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Rational Numbers",
    "intro": "Rational numbers are numbers that can be expressed as the ratio of two integers. They form an important part of the number system and have properties similar to integers.",
    "sections": [
      {
        "heading": "Definition and Representation",
        "points": [
          "Rational number is a number that can be expressed as p/q where p and q are integers and q is not zero",
          "Examples include 2/3, -5/7, 4/1, and 0/5",
          "Every integer is a rational number since it can be written with denominator 1",
          "Rational numbers can be positive, negative, or zero",
          "Equivalent rational numbers represent the same value; 2/3 equals 4/6"
        ]
      },
      {
        "heading": "Standard Form of Rational Numbers",
        "points": [
          "Standard form is when numerator and denominator have no common factor other than 1",
          "Denominator should be positive in standard form",
          "To reduce to standard form, divide both by their greatest common divisor",
          "Example: 8/12 in standard form is 2/3",
          "-2/3 is in standard form but -2/-3 should be written as 2/3"
        ]
      },
      {
        "heading": "Operations on Rational Numbers",
        "points": [
          "Addition: a/b + c/d = (ad + bc)/bd",
          "Subtraction: a/b - c/d = (ad - bc)/bd",
          "Multiplication: a/b x c/d = ac/bd",
          "Division: a/b ÷ c/d = a/b x d/c = ad/bc",
          "Commutative and associative properties hold for addition and multiplication"
        ]
      },
      {
        "heading": "Properties of Rational Numbers",
        "points": [
          "Closure property: sum, difference, product of rationals are rational",
          "Additive identity is 0; a + 0 = a for any rational a",
          "Multiplicative identity is 1; a x 1 = a for any rational a",
          "Additive inverse of a/b is -a/b; their sum is zero",
          "Multiplicative inverse of a/b is b/a; their product is one"
        ]
      },
      {
        "heading": "Representation on Number Line",
        "points": [
          "Rational numbers can be plotted on a number line between integers",
          "Positive rationals are to the right of zero; negatives to the left",
          "Between any two rational numbers, infinitely many rational numbers exist",
          "Division method: divide the segment into equal parts to mark fractional positions",
          "1/2 lies midway between 0 and 1"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Rational Number",
        "meaning": "A number that can be expressed as p/q where p and q are integers and q is not zero"
      },
      {
        "term": "Standard Form",
        "meaning": "Rational number in form where numerator and denominator have no common factors"
      },
      {
        "term": "Multiplicative Inverse",
        "meaning": "For a/b, the multiplicative inverse is b/a; their product equals 1"
      },
      {
        "term": "Additive Inverse",
        "meaning": "For a number x, the additive inverse is -x; their sum equals 0"
      }
    ],
    "faqs": [
      {
        "q": "Is every integer a rational number?",
        "a": "Yes, every integer can be expressed as a rational number with denominator 1. For example, 5 equals 5/1."
      },
      {
        "q": "How many rational numbers exist between 0 and 1?",
        "a": "Infinitely many. Between any two rational numbers, infinitely more rational numbers can be found."
      }
    ]
  },
  {
    "slug": "class-8-maths-squares-and-square-roots",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Squares and Square Roots",
    "intro": "Squares are products of a number with itself, and square roots are the inverse operation. Understanding these concepts is essential for algebra and geometry.",
    "sections": [
      {
        "heading": "Perfect Squares",
        "points": [
          "Perfect square is a number that can be expressed as the product of two equal integers",
          "Examples: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100",
          "First n perfect squares are 1 squared, 2 squared through n squared",
          "Perfect squares always end in digits 0, 1, 4, 5, 6, or 9",
          "Perfect squares never end in digits 2, 3, 7, or 8"
        ]
      },
      {
        "heading": "Properties of Perfect Squares",
        "points": [
          "Square of even number is always even; of odd number is always odd",
          "Square of a negative number is positive; (-5) squared equals 25",
          "Sum of first n odd numbers equals n squared",
          "Between consecutive perfect squares, no other perfect square exists",
          "If a number ends in 5, its square ends in 25"
        ]
      },
      {
        "heading": "Square Roots",
        "points": [
          "Square root of x is a number that when multiplied by itself gives x",
          "Symbol is radical sign with value inside",
          "Positive square root is principal square root",
          "Both 5 and -5 are square roots of 25, but principal square root is 5",
          "Square root of perfect square is always an integer"
        ]
      },
      {
        "heading": "Finding Square Roots",
        "points": [
          "Prime factorization method: group prime factors in pairs",
          "Repeated subtraction: subtract odd numbers successively",
          "Long division method: systematic approach for large numbers",
          "Estimation: find closest perfect squares to estimate roots",
          "Using tables: reference square root tables for quick lookup"
        ]
      },
      {
        "heading": "Square Roots of Rational Numbers and Irrational Numbers",
        "points": [
          "Square root of a rational number p/q equals square root of p divided by square root of q",
          "Non-perfect square numbers have irrational square roots",
          "Square root of 2 is approximately 1.414 and is irrational",
          "Irrational numbers cannot be expressed as ratio of two integers",
          "Decimal expansion of irrational square roots is non-terminating and non-repeating"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Perfect Square",
        "meaning": "Number that equals the product of two equal integers"
      },
      {
        "term": "Square Root",
        "meaning": "Number that when multiplied by itself gives the original number"
      },
      {
        "term": "Irrational Number",
        "meaning": "Number that cannot be expressed as ratio of two integers"
      },
      {
        "term": "Principal Square Root",
        "meaning": "The positive square root of a number"
      }
    ],
    "faqs": [
      {
        "q": "What is the square root of 0?",
        "a": "The square root of 0 is 0, since 0 multiplied by 0 equals 0."
      },
      {
        "q": "Why is the square root of 2 irrational?",
        "a": "The square root of 2 cannot be expressed as a ratio of two integers. Its decimal expansion is non-terminating and non-repeating."
      }
    ]
  },
  {
    "slug": "class-8-maths-mensuration",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Mensuration",
    "intro": "Mensuration deals with the measurement of lengths, areas, and volumes of geometric figures. These concepts are applied in construction, engineering, and daily life.",
    "sections": [
      {
        "heading": "Perimeter and Area of Quadrilaterals",
        "points": [
          "Perimeter is the total distance around a closed figure",
          "Area is the amount of surface enclosed by a figure",
          "Rectangle: perimeter equals 2(length plus width); area equals length times width",
          "Square: perimeter equals 4 times side; area equals side squared",
          "Parallelogram: area equals base times height",
          "Rhombus: area equals half times product of diagonals"
        ]
      },
      {
        "heading": "Area of Triangle and Trapezium",
        "points": [
          "Triangle: area equals one-half times base times height",
          "Trapezium: area equals one-half times sum of parallel sides times height",
          "For triangle with sides a, b, c use Heron's formula with semi-perimeter s",
          "Heron's formula: area equals square root of s(s-a)(s-b)(s-c)",
          "Right triangle: area equals one-half times product of two perpendicular sides"
        ]
      },
      {
        "heading": "Surface Area of Solids",
        "points": [
          "Cube: surface area equals 6 times side squared",
          "Cuboid: surface area equals 2(length times width plus width times height plus height times length)",
          "Cylinder: surface area equals 2 pi r squared plus 2 pi r h",
          "Sphere: surface area equals 4 pi r squared",
          "Cone: surface area equals pi r squared plus pi r l, where l is slant height"
        ]
      },
      {
        "heading": "Volume of Solids",
        "points": [
          "Volume is the amount of space occupied by a three-dimensional figure",
          "Cube: volume equals side cubed",
          "Cuboid: volume equals length times width times height",
          "Cylinder: volume equals pi r squared h",
          "Sphere: volume equals four-thirds pi r cubed",
          "Cone: volume equals one-third pi r squared h"
        ]
      },
      {
        "heading": "Practical Applications",
        "points": [
          "Land measurement uses area calculations for property valuation",
          "Container volume determines capacity for liquids and solids",
          "Painting requires surface area to determine paint quantity needed",
          "Construction uses volume and surface area for material estimation",
          "Garden design uses perimeter and area for planning layouts"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Perimeter",
        "meaning": "Total distance around the boundary of a two-dimensional figure"
      },
      {
        "term": "Area",
        "meaning": "Measure of the surface enclosed by a two-dimensional figure"
      },
      {
        "term": "Volume",
        "meaning": "Measure of space occupied by a three-dimensional figure"
      },
      {
        "term": "Surface Area",
        "meaning": "Total area of all faces of a three-dimensional solid"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between surface area and volume?",
        "a": "Surface area measures the total area of the outer surface of a 3D object. Volume measures the space inside the object."
      },
      {
        "q": "When should Heron's formula be used?",
        "a": "Heron's formula is used to find the area of a triangle when all three side lengths are known but the height is not given."
      }
    ]
  },
  {
    "slug": "class-8-maths-exponents-and-powers",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Exponents and Powers",
    "intro": "Exponents and powers provide a compact way to express repeated multiplication. They are fundamental to algebra, science, and technology.",
    "sections": [
      {
        "heading": "Basic Concepts",
        "points": [
          "Exponent or power is the number of times a base is multiplied by itself",
          "In 2 to the power 5, 2 is the base and 5 is the exponent",
          "2 to the power 5 equals 2 times 2 times 2 times 2 times 2 equals 32",
          "Any non-zero number to the power 0 equals 1",
          "Any number to the power 1 equals that number"
        ]
      },
      {
        "heading": "Laws of Exponents",
        "points": [
          "Product rule: a to power m times a to power n equals a to power m plus n",
          "Quotient rule: a to power m divided by a to power n equals a to power m minus n",
          "Power rule: (a to power m) to power n equals a to power m times n",
          "Product to a power: (ab) to power m equals a to power m times b to power m",
          "Quotient to a power: (a/b) to power m equals a to power m divided by b to power m"
        ]
      },
      {
        "heading": "Negative and Fractional Exponents",
        "points": [
          "Negative exponent: a to power negative n equals 1 divided by a to power n",
          "2 to power negative 3 equals 1/8",
          "Fractional exponent: a to power 1/n is the nth root of a",
          "a to power m/n equals nth root of a to power m",
          "2 to power 1/2 equals square root of 2 approximately 1.414"
        ]
      },
      {
        "heading": "Scientific Notation",
        "points": [
          "Scientific notation expresses large and small numbers in compact form",
          "Form: a times 10 to power n where 1 is less than or equal to a and a is less than 10",
          "500000 in scientific notation is 5 times 10 to power 5",
          "0.0007 in scientific notation is 7 times 10 to power negative 4",
          "Used extensively in science, physics, and astronomy for very large or small quantities"
        ]
      },
      {
        "heading": "Applications of Exponents",
        "points": [
          "Compound interest calculations use exponential growth formulas",
          "Population growth modeled using exponential functions",
          "Radioactive decay described using negative exponentials",
          "Computer science uses powers of 2 for binary and data storage units",
          "Technology follows Moore's Law, which is exponential progression"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Exponent",
        "meaning": "Number indicating how many times the base is multiplied by itself"
      },
      {
        "term": "Base",
        "meaning": "Number that is repeatedly multiplied in exponential notation"
      },
      {
        "term": "Power",
        "meaning": "Result of raising a base to an exponent"
      },
      {
        "term": "Scientific Notation",
        "meaning": "Way of expressing numbers as product of a decimal and power of 10"
      }
    ],
    "faqs": [
      {
        "q": "Why does any number to the power 0 equal 1?",
        "a": "Using the quotient rule: a to power n divided by a to power n equals a to power 0. Since a to power n divided by itself equals 1, a to power 0 equals 1."
      },
      {
        "q": "What does a negative exponent mean?",
        "a": "A negative exponent means the reciprocal of the base raised to the positive exponent. For example, 2 to power negative 3 equals 1/(2 to power 3) which equals 1/8."
      }
    ]
  },
  {
    "slug": "class-9-maths-herons-formula",
    "classLevel": "Class 9",
    "subject": "Mathematics",
    "chapter": "Heron's Formula",
    "intro": "Heron's Formula provides a method to calculate the area of a triangle when all three side lengths are known. This formula is particularly useful when the height is difficult to measure.",
    "sections": [
      {
        "heading": "Statement and Derivation",
        "points": [
          "Heron's Formula: area equals square root of s(s-a)(s-b)(s-c)",
          "s is the semi-perimeter equals (a plus b plus c) divided by 2",
          "a, b, c are the lengths of the three sides of the triangle",
          "Formula derived from Pythagoras theorem and algebraic manipulation",
          "Works for any type of triangle: acute, obtuse, or right"
        ]
      },
      {
        "heading": "Application Steps",
        "points": [
          "Step 1: Find semi-perimeter s equals (a plus b plus c) divided by 2",
          "Step 2: Calculate (s minus a), (s minus b), (s minus c)",
          "Step 3: Multiply s times (s minus a) times (s minus b) times (s minus c)",
          "Step 4: Take square root of the product to get area",
          "Verify with other methods when possible"
        ]
      },
      {
        "heading": "Advantages and Limitations",
        "points": [
          "Advantage: works when height is unknown or difficult to determine",
          "Advantage: applicable to any type of triangle with known sides",
          "Limitation: requires all three side lengths to be known",
          "Limitation: calculations can be tedious with non-integer side lengths",
          "Works efficiently for integer side lengths"
        ]
      },
      {
        "heading": "Applications in Real-World Problems",
        "points": [
          "Land measurement: finding area of triangular plots",
          "Navigation: calculating areas of triangular regions on maps",
          "Construction: determining area of triangular structures",
          "Agriculture: measuring field areas with irregular triangular shapes",
          "Engineering: calculating material requirements for triangular components"
        ]
      },
      {
        "heading": "Related Concepts",
        "points": [
          "Semi-perimeter is half the perimeter of the triangle",
          "Connection to circumradius and inradius of triangle",
          "Area can also be expressed in terms of circumradius R",
          "Formula connects to Brahmagupta's formula for quadrilaterals",
          "Generalizes to polyhedra volume calculations"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Heron's Formula",
        "meaning": "Method to find triangle area using three side lengths without needing height"
      },
      {
        "term": "Semi-perimeter",
        "meaning": "Half the perimeter of a triangle, denoted as s"
      },
      {
        "term": "Triangle Inequality",
        "meaning": "Sum of any two sides must be greater than the third side"
      },
      {
        "term": "Brahmagupta's Formula",
        "meaning": "Extension of Heron's formula for the area of a cyclic quadrilateral"
      }
    ],
    "faqs": [
      {
        "q": "Can Heron's Formula be used for a right triangle?",
        "a": "Yes, Heron's Formula works for right triangles. For a right triangle with legs a and b and hypotenuse c, you can calculate the area using the formula even though the simpler method (1/2 times a times b) is easier."
      },
      {
        "q": "What happens if the three sides cannot form a triangle?",
        "a": "If the triangle inequality is violated (sum of any two sides is not greater than the third), the formula gives an imaginary result. The three sides must satisfy a plus b greater than c for all combinations."
      }
    ]
  },
  {
    "slug": "class-9-sst-climate",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Climate",
    "intro": "Climate refers to the long-term patterns of weather in a region, determined by temperature, precipitation, wind patterns, and humidity. Different climates support different ecosystems and lifestyles.",
    "sections": [
      {
        "heading": "Climate vs Weather",
        "points": [
          "Weather is short-term atmospheric conditions over days or weeks",
          "Climate is long-term average weather pattern over years or decades",
          "Weather can be unpredictable; climate is relatively stable",
          "Climate determines the type of vegetation and animals in a region",
          "Understanding climate helps in agriculture, construction, and urban planning"
        ]
      },
      {
        "heading": "Factors Affecting Climate",
        "points": [
          "Latitude determines the angle of sun's rays and seasonal variation",
          "Altitude affects temperature; higher areas are cooler",
          "Ocean currents distribute heat; warm currents raise temperature",
          "Wind patterns bring moisture and temperature changes",
          "Vegetation cover affects evaporation and local temperature"
        ]
      },
      {
        "heading": "Classification of Climates",
        "points": [
          "Tropical climate: hot and humid throughout the year near equator",
          "Subtropical climate: hot summers and mild winters with seasonal rainfall",
          "Temperate climate: four distinct seasons with moderate temperatures",
          "Desert climate: very hot days and cold nights with minimal rainfall",
          "Polar climate: extremely cold with limited precipitation in extreme north and south"
        ]
      },
      {
        "heading": "India's Climate",
        "points": [
          "India has tropical monsoon climate with distinct seasons",
          "Southwest monsoon brings heavy rainfall from June to September",
          "Northeast monsoon brings rainfall to southern regions",
          "Summer is hot and dry; winter is cool and dry",
          "Western Ghats receive heavy rainfall; interior regions receive less"
        ]
      },
      {
        "heading": "Climate Change and Human Impact",
        "points": [
          "Global warming caused by greenhouse gases like carbon dioxide",
          "Deforestation reduces oxygen production and increases carbon dioxide",
          "Fossil fuel burning releases stored carbon into atmosphere",
          "Rising temperatures cause sea level rise and extreme weather events",
          "Conservation of forests and renewable energy can mitigate climate change"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Climate",
        "meaning": "Long-term average pattern of weather conditions in a region"
      },
      {
        "term": "Monsoon",
        "meaning": "Seasonal wind pattern that brings heavy rainfall during a specific period"
      },
      {
        "term": "Latitude",
        "meaning": "Distance north or south of equator, measured in degrees"
      },
      {
        "term": "Global Warming",
        "meaning": "Long-term rise in average global temperature due to greenhouse gases"
      }
    ],
    "faqs": [
      {
        "q": "Why is India's climate called monsoon climate?",
        "a": "India's climate is called monsoon climate because the southwest monsoon winds bring heavy rainfall during summer, significantly influencing the country's weather patterns and agriculture."
      },
      {
        "q": "How does altitude affect climate?",
        "a": "As altitude increases, temperature generally decreases. Higher elevations receive less solar radiation and have thinner atmosphere, resulting in cooler temperatures."
      }
    ]
  },
  {
    "slug": "class-9-sst-constitutional-design",
    "classLevel": "Class 9",
    "subject": "Social Science",
    "chapter": "Constitutional Design",
    "intro": "India's Constitution is the supreme law that governs the country, outlining the structure of government, rights of citizens, and principles for democratic functioning.",
    "sections": [
      {
        "heading": "Making of the Indian Constitution",
        "points": [
          "Constituent Assembly was formed in 1946 to draft the Constitution",
          "Dr. Bhimrao Ambedkar is called the architect of the Constitution",
          "Constitution came into effect on January 26, 1950",
          "Drafting process took nearly 3 years with extensive discussions",
          "India adopted democratic form of government after independence"
        ]
      },
      {
        "heading": "Fundamental Rights",
        "points": [
          "Right to equality includes freedom from discrimination based on caste or creed",
          "Right to freedom includes freedom of speech, expression, and movement",
          "Right against exploitation prohibits forced labor and child labor",
          "Right to freedom of religion allows practice and propagation of faith",
          "Right to constitutional remedies allows citizens to approach courts for justice"
        ]
      },
      {
        "heading": "Fundamental Duties",
        "points": [
          "Citizens must respect the Constitution and uphold its values",
          "Citizens must spread awareness and practice democracy",
          "Citizens must protect natural resources and environment",
          "Citizens must develop scientific attitude and rational thinking",
          "Citizens must safeguard public property and show compassion"
        ]
      },
      {
        "heading": "Directive Principles of State Policy",
        "points": [
          "State should provide free and compulsory education for all children",
          "State should ensure adequate nutrition and health care for people",
          "State should eliminate economic inequalities and ensure social justice",
          "State should protect monuments of cultural importance",
          "State should follow international peace and security principles"
        ]
      },
      {
        "heading": "Federal Structure",
        "points": [
          "India is a federal union of 28 states and 8 union territories",
          "Power is divided between national and state governments",
          "Union government handles defense, foreign policy, and currency",
          "State governments handle law and order, education, and health",
          "Concurrent list includes subjects both can legislate on"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Constitution",
        "meaning": "Supreme law of the land that governs the functioning of the government"
      },
      {
        "term": "Fundamental Rights",
        "meaning": "Constitutional rights that protect citizens from state exploitation"
      },
      {
        "term": "Directive Principles",
        "meaning": "Guiding principles for the state to establish a just and equitable society"
      },
      {
        "term": "Federalism",
        "meaning": "System of government with power divided between national and state governments"
      }
    ],
    "faqs": [
      {
        "q": "Why is Dr. Bhimrao Ambedkar called the architect of the Constitution?",
        "a": "Dr. Ambedkar presided over the Drafting Committee of the Constituent Assembly and played a crucial role in shaping the Constitution and its key provisions."
      },
      {
        "q": "Are Fundamental Rights and Directive Principles the same?",
        "a": "No, Fundamental Rights are justiciable and enforceable in courts, while Directive Principles are non-justiciable guidelines for the state, though both are equally important for democracy."
      }
    ]
  },
  {
    "slug": "class-10-maths-areas-related-to-circles",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Areas Related to Circles",
    "intro": "This chapter deals with calculating areas of circles, sectors, and segments. These concepts are essential in geometry and have practical applications in design and engineering.",
    "sections": [
      {
        "heading": "Area and Circumference of Circle",
        "points": [
          "Circumference of circle equals 2 pi r where r is radius",
          "Area of circle equals pi r squared",
          "Diameter is twice the radius",
          "Pi is approximately 22/7 or 3.14159",
          "Circumference equals pi times diameter"
        ]
      },
      {
        "heading": "Sector of a Circle",
        "points": [
          "Sector is a region of circle between two radii and an arc",
          "Area of sector equals (theta/360) times pi r squared",
          "Arc length equals (theta/360) times 2 pi r",
          "theta is the angle of sector in degrees at the center",
          "Semi-circle is a sector with angle 180 degrees"
        ]
      },
      {
        "heading": "Segment of a Circle",
        "points": [
          "Segment is region between a chord and arc of circle",
          "Area of segment equals area of sector minus area of triangle",
          "Minor segment is smaller; major segment is larger",
          "For calculation, need to find area of sector and triangle separately",
          "Triangle is formed by two radii and the chord"
        ]
      },
      {
        "heading": "Combination of Figures",
        "points": [
          "Problems often combine circles with other shapes like rectangles and triangles",
          "Find areas of individual shapes and add or subtract appropriately",
          "Shaded regions require careful identification of component areas",
          "Many practical problems involve finding area of combined figures",
          "Sketching helps in understanding and solving complex problems"
        ]
      },
      {
        "heading": "Practical Applications",
        "points": [
          "Pizza size comparison uses area of circular sectors",
          "Clock problems involve calculating angle and arc length",
          "Garden design uses circular paths and flower beds",
          "Athletic tracks are oval with circular curves",
          "Gear design in machinery uses circular segments"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Sector",
        "meaning": "Region of circle bounded by two radii and an arc"
      },
      {
        "term": "Segment",
        "meaning": "Region of circle bounded by a chord and an arc"
      },
      {
        "term": "Arc Length",
        "meaning": "Distance along the circumference between two points on circle"
      },
      {
        "term": "Chord",
        "meaning": "Line segment joining two points on a circle"
      }
    ],
    "faqs": [
      {
        "q": "What is the area of a semi-circle with radius 7?",
        "a": "The area of a semi-circle equals half the area of a full circle. Area equals (1/2) times pi times 7 squared equals (1/2) times pi times 49 equals 24.5 pi or approximately 77 square units."
      },
      {
        "q": "How do you find the area of a segment if you know the radius and central angle?",
        "a": "Calculate the area of the sector using (theta/360) times pi r squared. Then calculate the area of the triangle formed by two radii using (1/2) times r squared times sin(theta). Subtract triangle from sector to get segment area."
      }
    ]
  },
  {
    "slug": "class-10-science-periodic-classification",
    "classLevel": "Class 10",
    "subject": "Science",
    "chapter": "Periodic Classification of Elements",
    "intro": "The periodic table is a systematic arrangement of all known elements based on their atomic number and chemical properties. Understanding periodic trends helps predict element behavior.",
    "sections": [
      {
        "heading": "Development of Periodic Table",
        "points": [
          "Mendeleev's periodic table arranged elements by atomic weight",
          "Mendeleev left gaps for undiscovered elements and predicted their properties",
          "Modern periodic table arranged by atomic number not atomic weight",
          "Henry Moseley determined atomic numbers using X-ray spectroscopy",
          "Current periodic table has 118 confirmed elements"
        ]
      },
      {
        "heading": "Organization of Periodic Table",
        "points": [
          "Periods are horizontal rows; there are 7 periods",
          "Groups are vertical columns; there are 18 groups",
          "Period number indicates number of electron shells",
          "Group number related to number of valence electrons",
          "Each element has unique atomic number"
        ]
      },
      {
        "heading": "Classification of Elements",
        "points": [
          "Metals are lustrous, malleable, ductile, and good conductors",
          "Non-metals are brittle and poor conductors; can be solid, liquid, or gas",
          "Metalloids have properties of both metals and non-metals",
          "s-block includes alkali metals and alkaline earth metals",
          "p-block includes halogens and noble gases"
        ]
      },
      {
        "heading": "Periodic Trends",
        "points": [
          "Atomic radius decreases from left to right across a period",
          "Atomic radius increases down a group",
          "Ionization energy increases from left to right across a period",
          "Ionization energy decreases down a group",
          "Electronegativity increases from left to right and from bottom to top"
        ]
      },
      {
        "heading": "Chemical Properties and Groups",
        "points": [
          "Group 1 alkali metals are highly reactive and form positive ions",
          "Group 2 alkaline earth metals are less reactive than alkali metals",
          "Group 17 halogens are highly reactive non-metals",
          "Group 18 noble gases are unreactive with complete electron shells",
          "Transition metals have variable oxidation states"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Atomic Number",
        "meaning": "Number of protons in nucleus of an atom"
      },
      {
        "term": "Valence Electrons",
        "meaning": "Electrons in the outermost shell that participate in bonding"
      },
      {
        "term": "Electronegativity",
        "meaning": "Measure of an atom's tendency to attract electrons in a bond"
      },
      {
        "term": "Ionization Energy",
        "meaning": "Energy required to remove an electron from an atom"
      }
    ],
    "faqs": [
      {
        "q": "Why are noble gases unreactive?",
        "a": "Noble gases have complete valence electron shells, making them extremely stable and unlikely to form chemical bonds with other elements."
      },
      {
        "q": "How does atomic radius change in the periodic table?",
        "a": "Atomic radius decreases from left to right across a period due to increasing nuclear charge pulling electrons closer. It increases down a group due to additional electron shells."
      }
    ]
  },
  {
    "slug": "class-10-sst-nationalism-in-europe",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Nationalism in Europe",
    "intro": "Nationalism emerged in 19th century Europe as a powerful force leading to unification of Italy and Germany and contributing to World War I. Nationalism shaped modern European history.",
    "sections": [
      {
        "heading": "Rise of Nationalism",
        "points": [
          "Nationalism is loyalty to one's country and belief in national identity",
          "French Revolution inspired nationalist movements across Europe",
          "Napoleonic Wars spread revolutionary ideas and nationalist sentiment",
          "Industrial Revolution created urban working class with national consciousness",
          "Romantic movement in literature and art celebrated national culture"
        ]
      },
      {
        "heading": "Unification of Italy",
        "points": [
          "Italy was divided into various kingdoms and papal states before unification",
          "Cavour, Garibaldi, and Victor Emmanuel II led the unification movement",
          "Kingdom of Piedmont-Sardinia became the center of Italian unification",
          "Italy was unified in 1870 under Victor Emmanuel II",
          "Rome was incorporated as capital only after 1870"
        ]
      },
      {
        "heading": "Unification of Germany",
        "points": [
          "Germany was a collection of independent states before unification",
          "Otto von Bismarck, Prussian Chancellor, unified Germany through wars",
          "Franco-Prussian War 1870-71 led to German unification",
          "Germany became a powerful nation-state in 1871",
          "German unification had major impact on European balance of power"
        ]
      },
      {
        "heading": "Impacts of Nationalism",
        "points": [
          "National states became primary political units in Europe",
          "Nationalism led to imperial expansion and colonialism",
          "Competition between nations contributed to tensions",
          "Nationalist movements threatened multi-ethnic empires like Austria-Hungary",
          "Nationalism was a key factor leading to World War I"
        ]
      },
      {
        "heading": "Negative Aspects of Nationalism",
        "points": [
          "Aggressive nationalism led to militarization and arms race",
          "Ultra-nationalism contributed to fascism in 20th century",
          "Nationalism was used to justify colonial domination",
          "National rivalries led to two world wars",
          "Extreme nationalism caused ethnic conflicts and persecutions"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Nationalism",
        "meaning": "Belief in the importance of national identity and loyalty to one's nation"
      },
      {
        "term": "Nation-State",
        "meaning": "Independent political unit where most people share common language and culture"
      },
      {
        "term": "Unification",
        "meaning": "Process of bringing separate territories under single political authority"
      },
      {
        "term": "Militarism",
        "meaning": "Belief in building strong military and readiness for war"
      }
    ],
    "faqs": [
      {
        "q": "Who was the key figure in German unification?",
        "a": "Otto von Bismarck, the Prussian Chancellor, was the key figure who unified Germany through strategic wars and diplomacy, making Prussia the dominant power."
      },
      {
        "q": "How did nationalism contribute to World War I?",
        "a": "Nationalism created rivalry between nation-states, led to imperial expansion and arms race, and made countries reluctant to compromise. Assassination of Archduke Franz Ferdinand triggered nationalist tensions that escalated into war."
      }
    ]
  },
  {
    "slug": "class-10-sst-agriculture",
    "classLevel": "Class 10",
    "subject": "Social Science",
    "chapter": "Agriculture",
    "intro": "Agriculture is the practice of farming for food and raw materials production. Understanding agricultural practices, crop types, and farming methods is important for food security and economic development.",
    "sections": [
      {
        "heading": "Types of Agriculture",
        "points": [
          "Subsistence farming: farmer grows food for own family with little surplus",
          "Commercial agriculture: crops grown for sale in market",
          "Shifting cultivation: plot used for few years then abandoned",
          "Settled cultivation: same land used year after year",
          "Horticulture: cultivation of vegetables, fruits, and flowers"
        ]
      },
      {
        "heading": "Factors Affecting Agriculture",
        "points": [
          "Climate determines which crops can be grown in a region",
          "Soil fertility affects crop yield and agricultural productivity",
          "Water availability through rainfall or irrigation is essential",
          "Topography influences cultivation methods and crop selection",
          "Technology and infrastructure improve farming efficiency"
        ]
      },
      {
        "heading": "Crop Classification",
        "points": [
          "Kharif crops grown in monsoon season: rice, sugarcane, cotton, maize",
          "Rabi crops grown in winter: wheat, gram, mustard, barley",
          "Zaid crops grown between Rabi and Kharif: melons, cucumber",
          "Cash crops grown for profit: cotton, tobacco, sugarcane",
          "Food crops grown for nutrition: cereals, pulses, vegetables"
        ]
      },
      {
        "heading": "Modern Agricultural Practices",
        "points": [
          "Green Revolution introduced high-yield varieties and chemicals",
          "Mechanization reduced labor requirement and increased productivity",
          "Irrigation systems expanded cultivation to non-rainy areas",
          "Fertilizers increase soil fertility and crop yield",
          "Pesticides protect crops from pests and diseases"
        ]
      },
      {
        "heading": "Agricultural Challenges",
        "points": [
          "Soil degradation reduces fertility and long-term productivity",
          "Over-reliance on chemicals causes environmental damage",
          "Water scarcity limits agricultural expansion in dry regions",
          "Climate change affects rainfall patterns and crop yields",
          "Small farm sizes reduce efficiency and income in many regions"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Agriculture",
        "meaning": "Practice of farming for production of food and raw materials"
      },
      {
        "term": "Kharif Crops",
        "meaning": "Crops sown during monsoon season and harvested in autumn"
      },
      {
        "term": "Rabi Crops",
        "meaning": "Crops sown in winter season and harvested in spring"
      },
      {
        "term": "Green Revolution",
        "meaning": "Rapid increase in agricultural production through modern technology and high-yield varieties"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between subsistence and commercial agriculture?",
        "a": "Subsistence agriculture produces food mainly for the farmer's family with little surplus for sale. Commercial agriculture focuses on growing crops for profit and sale in markets."
      },
      {
        "q": "How did the Green Revolution change Indian agriculture?",
        "a": "The Green Revolution introduced high-yield seed varieties, chemical fertilizers, and mechanization, dramatically increasing food production and making India self-sufficient in food grains."
      }
    ]
  },
  {
    "slug": "class-11-physics-units-and-measurements",
    "classLevel": "Class 11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "intro": "Physics is based on precise measurements of physical quantities. Understanding units and measurement systems is fundamental to studying physics and conducting experiments.",
    "sections": [
      {
        "heading": "Physical Quantities and Units",
        "points": [
          "Physical quantity is anything that can be measured",
          "Fundamental quantities: length, mass, time, temperature, electric current",
          "Derived quantities obtained from fundamental quantities through mathematical relations",
          "Unit is a standard amount chosen to measure a physical quantity",
          "SI system is internationally used standard system of units"
        ]
      },
      {
        "heading": "SI System of Units",
        "points": [
          "SI unit of length is meter (m)",
          "SI unit of mass is kilogram (kg)",
          "SI unit of time is second (s)",
          "SI unit of temperature is Kelvin (K)",
          "SI unit of electric current is ampere (A)",
          "SI unit of luminous intensity is candela (cd)",
          "SI unit of amount of substance is mole (mol)"
        ]
      },
      {
        "heading": "Dimensions of Physical Quantities",
        "points": [
          "Dimension shows how a physical quantity depends on fundamental quantities",
          "Dimensions are represented using symbols: L for length, M for mass, T for time",
          "Dimensional analysis checks if an equation is dimensionally correct",
          "Dimension does not include numerical constant or angles",
          "Velocity has dimension LT to power negative 1"
        ]
      },
      {
        "heading": "Measurement and Errors",
        "points": [
          "All measurements have some error due to instrument limitations",
          "Systematic error arises from faulty instrument or technique",
          "Random error arises from unpredictable fluctuations",
          "Absolute error is difference between measured and true value",
          "Relative error is absolute error divided by true value"
        ]
      },
      {
        "heading": "Significant Figures",
        "points": [
          "Significant figures are reliable digits in a measurement",
          "All non-zero digits are significant",
          "Zeros between non-zero digits are significant",
          "Leading zeros are not significant",
          "Trailing zeros after decimal point are significant"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Physical Quantity",
        "meaning": "Measurable property that can be expressed as number and unit"
      },
      {
        "term": "SI Unit",
        "meaning": "Internationally agreed standard unit for measuring physical quantities"
      },
      {
        "term": "Dimension",
        "meaning": "Expression of physical quantity in terms of fundamental quantities"
      },
      {
        "term": "Significant Figures",
        "meaning": "Reliable and meaningful digits in a measured or calculated value"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between precision and accuracy?",
        "a": "Accuracy is how close a measurement is to the true value. Precision is how close repeated measurements are to each other. A measurement can be precise but not accurate."
      },
      {
        "q": "How many significant figures are in 0.00450?",
        "a": "The number 0.00450 has three significant figures: 4, 5, and 0. Leading zeros are not significant, but the trailing zero after 5 is significant because it comes after the decimal point."
      }
    ]
  },
  {
    "slug": "class-11-physics-laws-of-motion",
    "classLevel": "Class 11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "intro": "Newton's laws of motion form the foundation of classical mechanics, explaining how objects move and respond to forces. These laws are fundamental to understanding physical phenomena.",
    "sections": [
      {
        "heading": "Newton's First Law of Motion",
        "points": [
          "An object at rest remains at rest unless acted upon by a force",
          "An object in motion continues with constant velocity unless acted upon by a force",
          "This law describes inertia: resistance to change in motion",
          "No net force means acceleration is zero",
          "Objects naturally maintain their state of motion"
        ]
      },
      {
        "heading": "Newton's Second Law of Motion",
        "points": [
          "Force equals mass times acceleration: F equals m times a",
          "Acceleration is directly proportional to net force and inversely proportional to mass",
          "A larger force produces greater acceleration",
          "A larger mass requires more force for same acceleration",
          "Direction of acceleration is same as direction of net force"
        ]
      },
      {
        "heading": "Newton's Third Law of Motion",
        "points": [
          "For every action, there is equal and opposite reaction",
          "Forces always occur in pairs between two objects",
          "Action and reaction forces act on different objects",
          "Magnitudes of action and reaction are equal",
          "Directions of action and reaction are opposite"
        ]
      },
      {
        "heading": "Applications of Laws of Motion",
        "points": [
          "Seatbelts work by applying force to stop passenger during sudden deceleration",
          "Rockets propel forward by pushing exhaust backward",
          "Walking involves pushing Earth backward; Earth pushes you forward",
          "Friction force opposes motion and causes deceleration",
          "Tension in ropes depends on mass and acceleration"
        ]
      },
      {
        "heading": "Concept of Equilibrium",
        "points": [
          "Object is in equilibrium when net force is zero",
          "Static equilibrium: object at rest with zero acceleration",
          "Dynamic equilibrium: object moving with constant velocity",
          "Equilibrium condition requires balanced forces",
          "Sum of all forces equals zero in equilibrium"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Inertia",
        "meaning": "Property of matter to resist change in state of motion"
      },
      {
        "term": "Force",
        "meaning": "Push or pull that causes change in motion or shape"
      },
      {
        "term": "Mass",
        "meaning": "Measure of amount of matter and resistance to acceleration"
      },
      {
        "term": "Equilibrium",
        "meaning": "State when net force on object is zero and acceleration is zero"
      }
    ],
    "faqs": [
      {
        "q": "Why do passengers lurch forward when a car brakes suddenly?",
        "a": "Due to inertia from Newton's first law, passengers continue moving forward even as the car stops. Seatbelts apply force to decelerate passengers along with the car."
      },
      {
        "q": "If action and reaction are equal, why does a heavier object fall faster than a lighter one?",
        "a": "Both objects experience equal gravitational force per unit mass. But lighter objects have less mass, so they accelerate more per unit force (F equals ma). Gravity provides less total force on lighter objects, so they fall slower."
      }
    ]
  },
  {
    "slug": "class-11-chemistry-basic-concepts",
    "classLevel": "Class 11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "intro": "Chemistry studies matter and its reactions. Understanding fundamental concepts like atomic mass, molar mass, and stoichiometry is essential for solving chemistry problems.",
    "sections": [
      {
        "heading": "Atomic Mass Unit and Mass Number",
        "points": [
          "Atomic mass unit (amu) is 1/12th mass of carbon-12 atom",
          "Mass number is sum of protons and neutrons in nucleus",
          "Atomic number is number of protons in nucleus",
          "Atoms of same element with different mass numbers are isotopes",
          "Atomic mass is average mass of all isotopes of an element"
        ]
      },
      {
        "heading": "Mole Concept",
        "points": [
          "Mole is unit of amount of substance equal to 6.022 times 10 to power 23 particles",
          "Avogadro's number equals 6.022 times 10 to power 23",
          "Molar mass is mass of one mole of substance in grams",
          "Number of moles equals mass divided by molar mass",
          "One mole of any gas at STP occupies 22.4 liters"
        ]
      },
      {
        "heading": "Percentage Composition",
        "points": [
          "Percentage composition shows mass percent of each element",
          "Percentage of element equals (mass of element / total mass) times 100",
          "Used to determine empirical formula from experimental data",
          "Empirical formula gives simplest whole number ratio",
          "Molecular formula is multiple of empirical formula"
        ]
      },
      {
        "heading": "Stoichiometry and Balancing Equations",
        "points": [
          "Stoichiometry relates amounts of reactants and products",
          "Balanced equation shows smallest whole number ratio",
          "Coefficient indicates number of moles in reaction",
          "Law of conservation of mass requires equal atoms on both sides",
          "Limiting reagent is consumed first; determines product amount"
        ]
      },
      {
        "heading": "Molarity and Molality",
        "points": [
          "Molarity is moles of solute per liter of solution",
          "Molality is moles of solute per kilogram of solvent",
          "Molarity depends on temperature; molality does not",
          "Used to calculate amount of solute needed for solutions",
          "Dilution formula: M1V1 equals M2V2"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Mole",
        "meaning": "Unit of amount of substance containing 6.022 times 10 to power 23 particles"
      },
      {
        "term": "Atomic Mass Unit",
        "meaning": "Standard unit of atomic mass equal to 1/12 mass of C-12"
      },
      {
        "term": "Stoichiometry",
        "meaning": "Study of quantitative relationships between reactants and products"
      },
      {
        "term": "Limiting Reagent",
        "meaning": "Reactant that is completely consumed and limits product amount"
      }
    ],
    "faqs": [
      {
        "q": "Why is the molar volume of gas at STP 22.4 liters?",
        "a": "At standard temperature and pressure, all ideal gases follow Avogadro's law. One mole of any gas occupies 22.4 liters due to the ideal gas law and these standard conditions."
      },
      {
        "q": "How do you identify the limiting reagent in a reaction?",
        "a": "Calculate the number of moles of product each reactant would produce. The reactant that produces the least amount of product is the limiting reagent."
      }
    ]
  },
  {
    "slug": "class-11-chemistry-structure-of-atom",
    "classLevel": "Class 11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "intro": "The atom consists of a nucleus containing protons and neutrons, surrounded by electrons. Understanding atomic structure is essential for understanding chemical bonding and reactions.",
    "sections": [
      {
        "heading": "Subatomic Particles",
        "points": [
          "Proton has positive charge and resides in nucleus",
          "Neutron has no charge and resides in nucleus",
          "Electron has negative charge and revolves around nucleus",
          "Proton and neutron have nearly equal mass",
          "Electron mass is approximately 1/1836 of proton mass"
        ]
      },
      {
        "heading": "Nuclear Atom Model",
        "points": [
          "Rutherford discovered that atom has dense nucleus with electrons around it",
          "Most of atom's mass is concentrated in the nucleus",
          "Nucleus is extremely small compared to overall atom size",
          "Electrons are attracted to nucleus by electrical force",
          "Electrons are in constant motion around nucleus"
        ]
      },
      {
        "heading": "Bohr's Model of Atom",
        "points": [
          "Bohr proposed that electrons occupy specific energy levels or orbits",
          "Electrons can jump between orbits by absorbing or emitting energy",
          "First orbit holds maximum 2 electrons; second holds maximum 8",
          "Energy increases with distance from nucleus",
          "Model explains hydrogen atom spectrum but fails for larger atoms"
        ]
      },
      {
        "heading": "Quantum Model of Atom",
        "points": [
          "Electrons exist in regions called orbitals with specific energy and shape",
          "Orbital is region where electron is likely to be found",
          "Probability of finding electron is shown by electron density",
          "Aufbau principle: electrons fill lowest energy orbitals first",
          "Pauli exclusion principle: no two electrons have identical quantum numbers"
        ]
      },
      {
        "heading": "Electronic Configuration",
        "points": [
          "Electronic configuration shows arrangement of electrons in atoms",
          "Written as 1s2 2s2 2p6 3s2 3p6 for example",
          "Valence electrons are outermost electrons determining chemical properties",
          "Octet rule: atoms gain, lose, or share electrons to have 8 valence electrons",
          "Configuration determines element's position in periodic table"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Atom",
        "meaning": "Smallest unit of element that retains properties of element"
      },
      {
        "term": "Nucleus",
        "meaning": "Central part of atom containing protons and neutrons"
      },
      {
        "term": "Orbital",
        "meaning": "Region of space where electron is likely to be found"
      },
      {
        "term": "Valence Electron",
        "meaning": "Electron in outermost shell that participates in chemical bonding"
      }
    ],
    "faqs": [
      {
        "q": "Why does Bohr's model work for hydrogen but not for larger atoms?",
        "a": "Bohr's model assumes one electron, so it accurately predicts hydrogen's spectrum. For larger atoms with multiple electrons, electron-electron repulsion complicates the energy levels, making the model inaccurate."
      },
      {
        "q": "What is an orbital and how is it different from an orbit?",
        "a": "An orbit is a fixed circular path where an electron moves, as proposed by Bohr. An orbital is a region where an electron is likely to be found, and has a specific shape and energy level."
      }
    ]
  },
  {
    "slug": "class-11-biology-the-living-world",
    "classLevel": "Class 11",
    "subject": "Biology",
    "chapter": "The Living World",
    "intro": "Biology is the study of life and living organisms. Understanding the diversity of life, classification, and characteristics of living things forms the foundation of biological sciences.",
    "sections": [
      {
        "heading": "Characteristics of Living Organisms",
        "points": [
          "Organization: living things have complex organized structure",
          "Metabolism: living things take in energy and convert it for use",
          "Growth: living things increase in size and complexity",
          "Reproduction: living things produce offspring",
          "Response to environment: living things react to stimuli",
          "Homeostasis: living things maintain stable internal conditions"
        ]
      },
      {
        "heading": "Diversity of Life",
        "points": [
          "Estimated 7-8 million species exist on Earth",
          "Most species remain undiscovered and unclassified",
          "Biodiversity includes genetic, species, and ecosystem diversity",
          "Tropical regions have highest species diversity",
          "Many species face extinction due to human activities"
        ]
      },
      {
        "heading": "Taxonomy and Classification",
        "points": [
          "Taxonomy is the science of classification of organisms",
          "Binomial nomenclature uses genus and species names",
          "Species is group of organisms that can breed and produce fertile offspring",
          "Classification groups: kingdom, phylum, class, order, family, genus, species",
          "Linnaeus developed modern classification system"
        ]
      },
      {
        "heading": "Major Kingdoms",
        "points": [
          "Kingdom Monera: prokaryotes including bacteria and archaea",
          "Kingdom Protista: single-celled eukaryotes like amoeba and paramecium",
          "Kingdom Fungi: eukaryotes without chloroplasts like mushrooms and yeasts",
          "Kingdom Plantae: photosynthetic eukaryotes with cell walls",
          "Kingdom Animalia: heterotrophic eukaryotes"
        ]
      },
      {
        "heading": "Nomenclature and Identification",
        "points": [
          "Scientific name has two parts: genus (capitalized) and species (lowercase)",
          "Example: Homo sapiens for humans",
          "Common names vary by region; scientific names are universal",
          "Keys and dichotomous methods aid in organism identification",
          "Morphological features used for classification and identification"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Taxonomy",
        "meaning": "Science of classification and naming of organisms"
      },
      {
        "term": "Species",
        "meaning": "Group of organisms that can interbreed and produce fertile offspring"
      },
      {
        "term": "Biodiversity",
        "meaning": "Variety of all living organisms and ecosystems on Earth"
      },
      {
        "term": "Binomial Nomenclature",
        "meaning": "System of naming organisms using two names: genus and species"
      }
    ],
    "faqs": [
      {
        "q": "Why is scientific nomenclature important in biology?",
        "a": "Scientific nomenclature provides a universal naming system that avoids confusion from common names which vary by region. It ensures clear communication among scientists worldwide."
      },
      {
        "q": "What are the smallest and largest kingdoms in terms of species?",
        "a": "Archaea (in Monera) have the fewest known species. Animalia and Plantae are the largest, with animals having about 1.3 million described species and plants having about 400,000 species."
      }
    ]
  },
  {
    "slug": "class-11-biology-cell-the-unit-of-life",
    "classLevel": "Class 11",
    "subject": "Biology",
    "chapter": "Cell: The Unit of Life",
    "intro": "The cell is the basic unit of life and all living organisms are composed of one or more cells. Understanding cell structure and function is fundamental to modern biology.",
    "sections": [
      {
        "heading": "Cell Theory",
        "points": [
          "All living organisms are composed of cells",
          "Cell is the basic unit of life",
          "All cells arise from pre-existing cells through cell division",
          "Established by scientists like Schleiden, Schwann, and Virchow",
          "Theory explains how life originates and propagates"
        ]
      },
      {
        "heading": "Prokaryotic Cells",
        "points": [
          "Lack membrane-bound nucleus; genetic material in nucleoid region",
          "Smaller than eukaryotic cells, typically 0.5 to 5 micrometers",
          "Include bacteria and archaea",
          "Have cell membrane but lack membrane-bound organelles",
          "Ribosomes are 70S type and smaller than eukaryotic ribosomes"
        ]
      },
      {
        "heading": "Eukaryotic Cell Structure",
        "points": [
          "Nucleus contains genetic material and controls cell functions",
          "Mitochondria produces energy through aerobic respiration",
          "Endoplasmic reticulum synthesizes proteins and lipids",
          "Golgi apparatus modifies and packages proteins",
          "Lysosomes contain enzymes for breaking down waste"
        ]
      },
      {
        "heading": "Cell Membrane Structure and Function",
        "points": [
          "Selectively permeable barrier controlling substance movement",
          "Phospholipid bilayer provides basic structure",
          "Proteins embedded in membrane perform various functions",
          "Allows nutrient entry and waste removal",
          "Maintains ion concentrations and cell homeostasis"
        ]
      },
      {
        "heading": "Cell Division Processes",
        "points": [
          "Mitosis produces two identical daughter cells for growth and repair",
          "Meiosis produces four haploid gametes for sexual reproduction",
          "Binary fission in prokaryotes produces two identical cells",
          "Cell cycle has G1, S, G2, and M phases",
          "Checkpoints control progression through cell cycle"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Cell",
        "meaning": "Basic unit of life and smallest living entity"
      },
      {
        "term": "Mitochondria",
        "meaning": "Organelle that produces energy through cellular respiration"
      },
      {
        "term": "Nucleus",
        "meaning": "Membrane-bound organelle containing genetic material"
      },
      {
        "term": "Enzyme",
        "meaning": "Protein that catalyzes biochemical reactions in cells"
      }
    ],
    "faqs": [
      {
        "q": "Why are mitochondria called the powerhouse of the cell?",
        "a": "Mitochondria produce ATP through aerobic respiration, which is the primary energy currency of cells. ATP powers nearly all cellular activities."
      },
      {
        "q": "What is the main difference between mitosis and meiosis?",
        "a": "Mitosis produces two identical diploid daughter cells for body growth. Meiosis produces four non-identical haploid cells for sexual reproduction."
      }
    ]
  },
  {
    "slug": "class-12-physics-electric-charges-and-fields",
    "classLevel": "Class 12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "intro": "Electric charge is a fundamental property of matter. Understanding electric charge and electric fields is essential for comprehending electromagnetism and electricity.",
    "sections": [
      {
        "heading": "Electric Charge",
        "points": [
          "Electric charge is fundamental property of matter",
          "Two types of charge: positive and negative",
          "Protons are positively charged; electrons are negatively charged",
          "Elementary charge e equals 1.6 times 10 to power negative 19 coulombs",
          "Charge is conserved; total charge in isolated system remains constant"
        ]
      },
      {
        "heading": "Coulomb's Law",
        "points": [
          "Force between two point charges is directly proportional to product of charges",
          "Force is inversely proportional to square of distance between them",
          "Formula: F equals k times q1 times q2 divided by r squared",
          "k is Coulomb's constant approximately 9 times 10 to power 9",
          "Force is repulsive for like charges; attractive for opposite charges"
        ]
      },
      {
        "heading": "Electric Field",
        "points": [
          "Electric field is region around charge where electric force acts",
          "Field strength equals force per unit charge: E equals F divided by q",
          "Field lines show direction and strength of electric field",
          "Field lines originate from positive charges and terminate on negative",
          "Electric field is vector quantity with direction and magnitude"
        ]
      },
      {
        "heading": "Electric Potential and Potential Difference",
        "points": [
          "Electric potential is work done per unit charge to bring charge to a point",
          "Potential difference is difference in potential between two points",
          "Unit of potential is volt (V)",
          "Potential difference: V equals W divided by q",
          "Equipotential surfaces are perpendicular to field lines"
        ]
      },
      {
        "heading": "Gauss's Law",
        "points": [
          "Electric flux through closed surface equals charge enclosed divided by epsilon",
          "Useful for calculating electric field with symmetry",
          "Applies to any closed surface called Gaussian surface",
          "Simplifies calculations for uniform charge distributions",
          "Foundation for understanding electric fields"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Electric Charge",
        "meaning": "Fundamental property of matter that causes electric force"
      },
      {
        "term": "Electric Field",
        "meaning": "Region of space where electric force acts on charged particles"
      },
      {
        "term": "Coulomb's Law",
        "meaning": "Law describing force between two stationary electric charges"
      },
      {
        "term": "Electric Potential",
        "meaning": "Work done per unit charge to bring charge from infinity to a point"
      }
    ],
    "faqs": [
      {
        "q": "Why is electric field a vector quantity?",
        "a": "Electric field has both magnitude and direction. The direction is the direction a positive charge would be pushed, making it a vector quantity that can be added and resolved into components."
      },
      {
        "q": "What is the relationship between electric field and potential?",
        "a": "Electric field is the negative gradient of potential. Mathematically, E equals negative dV divided by dx. The field points in the direction of decreasing potential."
      }
    ]
  },
  {
    "slug": "class-12-physics-current-electricity",
    "classLevel": "Class 12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "intro": "Electric current is the flow of charge through a conductor. Understanding current, resistance, and circuits forms the basis for practical applications of electricity.",
    "sections": [
      {
        "heading": "Electric Current",
        "points": [
          "Electric current is rate of flow of charge: I equals Q divided by t",
          "Unit of current is ampere (A)",
          "Conventional current flows from positive to negative terminal",
          "Electron flow is opposite to conventional current direction",
          "Current is due to movement of free electrons in conductor"
        ]
      },
      {
        "heading": "Resistance and Ohm's Law",
        "points": [
          "Resistance is opposition to flow of current through conductor",
          "Ohm's Law: V equals I times R",
          "Resistivity is property of material: R equals rho times L divided by A",
          "Resistance depends on length, area, and resistivity of material",
          "Unit of resistance is ohm (Ω)"
        ]
      },
      {
        "heading": "Resistivity and Temperature",
        "points": [
          "Resistivity increases with temperature for most conductors",
          "Formula: rho equals rho0 times (1 plus alpha times (T minus T0))",
          "alpha is temperature coefficient of resistivity",
          "Superconductors have zero resistance at very low temperatures",
          "Semi-conductors have resistivity between conductors and insulators"
        ]
      },
      {
        "heading": "Series and Parallel Circuits",
        "points": [
          "Series: same current flows through all components; voltages add",
          "Total resistance in series: R equals R1 plus R2 plus R3",
          "Parallel: same voltage across all components; currents add",
          "Total resistance in parallel: 1/R equals 1/R1 plus 1/R2 plus 1/R3",
          "Parallel circuits allow independent operation of components"
        ]
      },
      {
        "heading": "EMF and Internal Resistance",
        "points": [
          "EMF is electromotive force; maximum potential difference of source",
          "Internal resistance reduces output voltage of real battery",
          "Terminal voltage equals EMF minus current times internal resistance",
          "V equals E minus Ir",
          "Ideal battery has zero internal resistance"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Electric Current",
        "meaning": "Flow of charge through a conductor measured in amperes"
      },
      {
        "term": "Resistance",
        "meaning": "Opposition to flow of electric current through a conductor"
      },
      {
        "term": "Ohm's Law",
        "meaning": "Relationship stating voltage equals current times resistance"
      },
      {
        "term": "EMF",
        "meaning": "Electromotive force; maximum potential of an electrical source"
      }
    ],
    "faqs": [
      {
        "q": "Why does resistance of a conductor increase with temperature?",
        "a": "Higher temperature increases vibration of atoms. These vibrations obstruct electron flow, increasing resistance. This effect is quantified by temperature coefficient of resistivity."
      },
      {
        "q": "What is the advantage of parallel circuits over series circuits?",
        "a": "In parallel circuits, each component gets full voltage and operates independently. If one component fails, others continue working. In series, all components share voltage and failure of one breaks the circuit."
      }
    ]
  },
  {
    "slug": "class-12-chemistry-solutions",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "intro": "Solutions are homogeneous mixtures of solute and solvent with uniform composition. Understanding solubility, concentration, and colligative properties is essential in chemistry.",
    "sections": [
      {
        "heading": "Types of Solutions",
        "points": [
          "Solution is homogeneous mixture of solute and solvent",
          "Solute is substance dissolved; solvent is substance doing dissolving",
          "Aqueous solutions have water as solvent",
          "Non-aqueous solutions use other solvents like alcohol or benzene",
          "Solutions can be gaseous, liquid, or solid"
        ]
      },
      {
        "heading": "Solubility and Factors Affecting It",
        "points": [
          "Solubility is amount of solute that dissolves in solvent at given temperature",
          "Temperature affects solubility; most solids increase with temperature",
          "Pressure affects gas solubility significantly; Henry's Law applies",
          "Like dissolves like: polar solvents dissolve polar solutes",
          "Ionic compounds generally soluble in polar solvents"
        ]
      },
      {
        "heading": "Ways of Expressing Concentration",
        "points": [
          "Mass percentage equals (mass of solute / mass of solution) times 100",
          "Volume percentage equals (volume of solute / volume of solution) times 100",
          "Molarity equals moles of solute per liter of solution",
          "Molality equals moles of solute per kilogram of solvent",
          "Normality equals number of equivalents per liter of solution"
        ]
      },
      {
        "heading": "Colligative Properties",
        "points": [
          "Properties depending on number of solute particles, not their identity",
          "Relative lowering of vapor pressure affects evaporation rate",
          "Boiling point elevation: solution boils at higher temperature",
          "Freezing point depression: solution freezes at lower temperature",
          "Osmotic pressure is pressure needed to prevent osmosis"
        ]
      },
      {
        "heading": "Ideal and Non-ideal Solutions",
        "points": [
          "Ideal solution follows Raoult's Law perfectly",
          "Non-ideal solutions show positive or negative deviations",
          "Raoult's Law: P equals P0 times X",
          "Henry's Law applies to dissolved gases",
          "Real solutions are non-ideal due to intermolecular forces"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Solution",
        "meaning": "Homogeneous mixture of solute and solvent"
      },
      {
        "term": "Solubility",
        "meaning": "Amount of solute that dissolves in solvent at given conditions"
      },
      {
        "term": "Molarity",
        "meaning": "Moles of solute per liter of solution"
      },
      {
        "term": "Colligative Properties",
        "meaning": "Properties depending on number of dissolved particles, not identity"
      }
    ],
    "faqs": [
      {
        "q": "Why does salt dissolve better in hot water than cold water?",
        "a": "Higher temperature increases kinetic energy of water molecules, allowing them to break ionic bonds in salt more effectively. Also, solubility of most ionic compounds increases with temperature."
      },
      {
        "q": "What is the difference between molarity and molality?",
        "a": "Molarity is moles per liter of solution and depends on temperature. Molality is moles per kilogram of solvent and is independent of temperature, making it more accurate for temperature-dependent calculations."
      }
    ]
  },
  {
    "slug": "class-12-chemistry-electrochemistry",
    "classLevel": "Class 12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "intro": "Electrochemistry studies reactions involving electron transfer. Understanding oxidation-reduction reactions, galvanic cells, and electrolysis is fundamental to chemistry and technology.",
    "sections": [
      {
        "heading": "Oxidation and Reduction",
        "points": [
          "Oxidation is loss of electrons; reduction is gain of electrons",
          "Oxidizing agent accepts electrons; reducing agent donates electrons",
          "Oxidation number helps track electron transfer",
          "Rules for assigning oxidation numbers ensure consistency",
          "Redox reactions always involve simultaneous oxidation and reduction"
        ]
      },
      {
        "heading": "Galvanic Cells",
        "points": [
          "Galvanic cell converts chemical energy to electrical energy",
          "Anode is where oxidation occurs; cathode where reduction occurs",
          "Electrons flow from anode to cathode through external circuit",
          "Salt bridge maintains electrical neutrality",
          "Cell potential equals cathode potential minus anode potential"
        ]
      },
      {
        "heading": "Nernst Equation",
        "points": [
          "Nernst equation relates cell potential to ion concentrations",
          "E equals E0 minus (0.059/n) times log(Q) at 25 degrees Celsius",
          "Q is reaction quotient; affects voltage based on concentrations",
          "Standard cell potential E0 is measured under standard conditions",
          "At equilibrium, Q equals K and cell potential equals zero"
        ]
      },
      {
        "heading": "Electroplating and Electrolysis",
        "points": [
          "Electrolysis uses electrical energy to drive non-spontaneous reactions",
          "Electroplating deposits metal coating on object",
          "Faraday's laws relate charge to substance deposited",
          "Industrial applications include refining metals and extracting elements",
          "Electrolysis of water produces hydrogen and oxygen"
        ]
      },
      {
        "heading": "Applications of Electrochemistry",
        "points": [
          "Batteries and fuel cells provide electrical power",
          "Corrosion involves spontaneous oxidation of metals",
          "Cathodic protection prevents corrosion using sacrificial anodes",
          "Electroplating improves durability and appearance of metals",
          "Analytical techniques like potentiometry use electrochemistry"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Oxidation",
        "meaning": "Loss of electrons by a substance"
      },
      {
        "term": "Reduction",
        "meaning": "Gain of electrons by a substance"
      },
      {
        "term": "Galvanic Cell",
        "meaning": "Device that converts chemical energy to electrical energy"
      },
      {
        "term": "Electrode Potential",
        "meaning": "Voltage difference at an electrode compared to standard hydrogen electrode"
      }
    ],
    "faqs": [
      {
        "q": "Why do metals corrode when exposed to oxygen and water?",
        "a": "Metals are oxidized by oxygen and water, losing electrons. This spontaneous redox reaction forms metal oxides and hydroxides, causing corrosion and deterioration."
      },
      {
        "q": "What determines whether a redox reaction is spontaneous?",
        "a": "A reaction is spontaneous if the standard cell potential E0 is positive. Positive E0 means the reduction at cathode is thermodynamically favorable."
      }
    ]
  },
  {
    "slug": "class-12-biology-principles-of-inheritance",
    "classLevel": "Class 12",
    "subject": "Biology",
    "chapter": "Principles of Inheritance and Variation",
    "intro": "Inheritance is the transmission of genetic traits from parents to offspring. Understanding Mendel's laws and genetic principles explains how traits are passed through generations.",
    "sections": [
      {
        "heading": "Mendel's Laws of Inheritance",
        "points": [
          "Law of Segregation: alleles separate during gamete formation",
          "Law of Independent Assortment: alleles of different genes assort independently",
          "Law of Dominance: dominant allele masks recessive allele",
          "Mendel's experiments with pea plants established these laws",
          "Monohybrid cross involves single trait; dihybrid involves two traits"
        ]
      },
      {
        "heading": "Chromosomal Inheritance",
        "points": [
          "Chromosomes carry genes; genes are units of heredity",
          "Homologous chromosomes carry same genes but possibly different alleles",
          "Sex chromosomes determine organism's sex",
          "Linkage: genes on same chromosome tend to be inherited together",
          "Crossing over exchanges genetic material between homologous chromosomes"
        ]
      },
      {
        "heading": "Sex-Linked Inheritance",
        "points": [
          "Traits controlled by genes on sex chromosomes show sex-linked inheritance",
          "X-linked traits more common in males than females",
          "Males have one X chromosome; females have two X chromosomes",
          "Color blindness and hemophilia are X-linked recessive traits",
          "Y-linked traits pass from father to all sons"
        ]
      },
      {
        "heading": "Gene Interaction and Multiple Alleles",
        "points": [
          "Gene interaction: two or more genes control single trait",
          "Multiple alleles: more than two alleles exist for a gene",
          "Example: ABO blood groups have three alleles I-A, I-B, i",
          "Complementary genes both needed for trait expression",
          "Epistasis: one gene masks expression of another gene"
        ]
      },
      {
        "heading": "Mutation and Genetic Variation",
        "points": [
          "Mutation is change in DNA sequence creating genetic variation",
          "Point mutations affect single nucleotide",
          "Frameshift mutations insert or delete nucleotides",
          "Some mutations are beneficial; others harmful or neutral",
          "Variation provides raw material for natural selection"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Allele",
        "meaning": "Different forms of a gene controlling same trait"
      },
      {
        "term": "Genotype",
        "meaning": "Genetic makeup of an organism"
      },
      {
        "term": "Phenotype",
        "meaning": "Observable characteristics determined by genotype"
      },
      {
        "term": "Homozygous",
        "meaning": "Having two identical alleles for a gene"
      }
    ],
    "faqs": [
      {
        "q": "If both parents have brown eyes, can their child have blue eyes?",
        "a": "Yes, if brown is dominant and both parents carry hidden blue eye alleles. The child needs blue alleles from both parents to have blue eyes."
      },
      {
        "q": "Why are X-linked recessive traits more common in males?",
        "a": "Males have only one X chromosome. One copy of a recessive allele expresses the trait. Females need two copies to show recessive X-linked traits."
      }
    ]
  },
  {
    "slug": "class-12-biology-human-reproduction",
    "classLevel": "Class 12",
    "subject": "Biology",
    "chapter": "Human Reproduction",
    "intro": "Human reproduction involves complex physiological systems. Understanding reproductive anatomy, gametogenesis, and developmental biology is essential for understanding human health.",
    "sections": [
      {
        "heading": "Male Reproductive System",
        "points": [
          "Testes produce sperm and testosterone in seminiferous tubules",
          "Spermatogenesis is continuous process producing millions of sperm daily",
          "Epididymis stores sperm and provides final maturation",
          "Prostate gland and seminal vesicles add nutrients to semen",
          "Semen contains sperm and secretions that aid fertilization"
        ]
      },
      {
        "heading": "Female Reproductive System",
        "points": [
          "Ovaries produce ova and release them through ovulation",
          "Fallopian tubes transport egg and are site of fertilization",
          "Uterus provides protected environment for fetal development",
          "Endometrium thickens during menstrual cycle",
          "Vagina receives sperm during intercourse and is birth canal"
        ]
      },
      {
        "heading": "Menstrual Cycle",
        "points": [
          "Cycle approximately 28 days with four phases",
          "Menstrual phase: endometrium sheds causing bleeding for 3-5 days",
          "Follicular phase: FSH stimulates follicle development and estrogen increases",
          "Ovulation: surge in LH triggers release of egg from ovary",
          "Luteal phase: corpus luteum produces progesterone preparing uterus"
        ]
      },
      {
        "heading": "Fertilization and Pregnancy",
        "points": [
          "Sperm travels through uterus to fallopian tube to meet egg",
          "Fertilization occurs in fallopian tube when sperm fuses with egg",
          "Zygote divides to form blastocyst which implants in uterus",
          "Pregnancy lasts approximately 280 days or 40 weeks",
          "Placenta facilitates nutrient and waste exchange between fetus and mother"
        ]
      },
      {
        "heading": "Birth and Lactation",
        "points": [
          "Labor involves contractions of uterine muscles to push baby out",
          "Three stages of labor: dilation, expulsion, and placenta delivery",
          "Lactation begins after birth with milk production for nursing",
          "Oxytocin stimulates milk ejection during nursing",
          "Colostrum is first milk rich in antibodies"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Oogenesis",
        "meaning": "Process of egg formation in ovaries"
      },
      {
        "term": "Spermatogenesis",
        "meaning": "Process of sperm formation in testes"
      },
      {
        "term": "Ovulation",
        "meaning": "Release of egg from ovary"
      },
      {
        "term": "Placenta",
        "meaning": "Organ connecting fetus to mother for nutrient exchange"
      }
    ],
    "faqs": [
      {
        "q": "Why is the menstrual cycle approximately 28 days?",
        "a": "The cycle length is regulated by hormonal feedback. FSH and LH from pituitary coordinate with ovarian hormones to create this rhythm, though cycle length can vary from 21 to 35 days normally."
      },
      {
        "q": "At what point during the menstrual cycle is pregnancy most likely?",
        "a": "Pregnancy is most likely during ovulation and a few days before and after. Sperm can survive 3-5 days, and egg survives 12-24 hours after ovulation."
      }
    ]
  },
  {
    "slug": "class-8-science-coal-petroleum",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Coal and Petroleum",
    "intro": "Coal and petroleum are fossil fuels formed from the remains of ancient plants and organisms buried under pressure for millions of years. They are crucial energy sources but non-renewable and contribute to environmental problems.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Coal is a black mineral formed from fossilized plant remains buried deep underground over millions of years",
          "Coal forms through the process of carbonization when plant material is compressed and heated",
          "Petroleum or crude oil is a dark, viscous liquid mixture of hydrocarbons formed from ancient marine organisms",
          "Coal is mined from mines using open-pit or underground mining methods",
          "Petroleum is extracted by drilling wells deep into the Earth where oil reservoirs are located",
          "Refining processes separate crude oil into useful products like petrol, diesel, kerosene, and lubricating oil",
          "Fractional distillation uses different boiling points to separate crude oil components by molecular size",
          "Coal is used as a fuel for electricity generation, heating, and in steel production",
          "Petroleum products power vehicles, heat buildings, and serve as raw materials for plastics and chemicals",
          "Burning fossil fuels releases carbon dioxide, contributing to climate change and air pollution",
          "Coal reserves are rapidly depleting due to continuous mining and high global demand",
          "Renewable energy sources like solar, wind, and hydroelectric power are alternatives to fossil fuels"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Fossil Fuel",
        "meaning": "Non-renewable energy source formed from the fossilized remains of ancient plants and organisms"
      },
      {
        "term": "Carbonization",
        "meaning": "Process of conversion of buried plant matter into coal through heat, pressure, and time over millions of years"
      },
      {
        "term": "Crude Oil",
        "meaning": "Naturally occurring petroleum, a mixture of liquid hydrocarbons extracted from underground reservoirs"
      },
      {
        "term": "Refining",
        "meaning": "Process of separating crude oil into useful products through distillation and chemical treatment"
      },
      {
        "term": "Fractional Distillation",
        "meaning": "Separation technique that exploits different boiling points of hydrocarbons in crude oil to obtain various products"
      },
      {
        "term": "Non-renewable",
        "meaning": "Resource that cannot be naturally replenished at the rate it is consumed, like fossil fuels"
      }
    ],
    "faqs": [
      {
        "q": "How were coal and petroleum formed?",
        "a": "Coal formed from buried plant remains subjected to heat and pressure over millions of years. Petroleum formed from marine organisms and plankton buried in sediments and transformed by heat and pressure"
      },
      {
        "q": "What is fractional distillation?",
        "a": "Fractional distillation separates crude oil into different products by heating it and cooling at different levels in a fractionating column, where molecules with low boiling points rise higher"
      },
      {
        "q": "Why are coal and petroleum non-renewable?",
        "a": "Coal and petroleum take millions of years to form from ancient organisms, but are consumed at rates far exceeding their natural formation, making them non-renewable on human timescales"
      }
    ]
  },
  {
    "slug": "class-8-science-combustion-flame",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Combustion and Flame",
    "intro": "Combustion is a rapid chemical reaction between a fuel and oxygen that releases heat and light, producing a flame. Understanding combustion is essential for safe handling of fuels and fire prevention.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Combustion is an exothermic reaction where a fuel rapidly reacts with oxygen, releasing heat and light",
          "Combustion requires three elements: fuel, oxygen, and heat source, known as the fire triangle",
          "Ignition temperature is the minimum temperature at which a substance spontaneously combusts",
          "Fuels can be solid, liquid, or gas, each having different combustion characteristics",
          "Complete combustion occurs when fuel has sufficient oxygen, producing carbon dioxide and water",
          "Incomplete combustion occurs when oxygen is limited, producing carbon monoxide, which is toxic",
          "A flame is a zone of burning gas that emits light and heat during combustion",
          "Luminous flames contain unburnt carbon particles that glow, producing light",
          "Non-luminous flames are hot and blue because all carbon is completely burned",
          "Combustion reactions can be represented as: Fuel + Oxygen = Carbon Dioxide + Water + Heat",
          "Spontaneous combustion occurs when a substance self-ignites without an external heat source",
          "Fire extinguishers work by removing one element of the fire triangle: oxygen, heat, or fuel"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "C + O2 = CO2 + Heat (Complete combustion of carbon)",
          "2C + O2 = 2CO + Heat (Incomplete combustion of carbon)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Combustion",
        "meaning": "Rapid chemical reaction between a fuel and oxygen that produces heat, light, and new substances"
      },
      {
        "term": "Ignition Temperature",
        "meaning": "Minimum temperature required for a substance to catch fire and sustain combustion"
      },
      {
        "term": "Exothermic Reaction",
        "meaning": "Chemical reaction that releases energy in the form of heat to the surroundings"
      },
      {
        "term": "Luminous Flame",
        "meaning": "Bright flame produced when burning fuel contains unburnt carbon particles that glow"
      },
      {
        "term": "Non-luminous Flame",
        "meaning": "Hot, blue flame produced when fuel completely burns with sufficient oxygen, emitting little visible light"
      },
      {
        "term": "Spontaneous Combustion",
        "meaning": "Self-ignition of a substance without an external heat source due to internal chemical reactions"
      }
    ],
    "faqs": [
      {
        "q": "What are the three requirements for combustion to occur?",
        "a": "Combustion requires a fuel, oxygen, and a heat source or ignition temperature. All three must be present for combustion to take place, forming the fire triangle"
      },
      {
        "q": "What is the difference between complete and incomplete combustion?",
        "a": "Complete combustion has sufficient oxygen and produces carbon dioxide and water. Incomplete combustion lacks oxygen and produces carbon monoxide, a toxic gas"
      },
      {
        "q": "Why is carbon monoxide dangerous?",
        "a": "Carbon monoxide is a colorless, odorless toxic gas that binds to hemoglobin in blood, preventing oxygen transport to cells, causing poisoning and death at high concentrations"
      }
    ]
  },
  {
    "slug": "class-8-science-reproduction-animals",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Reproduction in Animals",
    "intro": "Reproduction is the biological process by which organisms produce offspring, ensuring the continuation of species. Animals reproduce through sexual or asexual reproduction with different strategies and adaptations.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Reproduction is the process of producing new organisms similar to parents for continuation of species",
          "Asexual reproduction involves one parent and produces genetically identical offspring",
          "Binary fission in bacteria divides a single cell into two identical daughter cells",
          "Budding is asexual reproduction where a new organism grows as an outgrowth of the parent",
          "Sexual reproduction involves two parents, combining genetic material to create genetically diverse offspring",
          "Male and female gametes unite during fertilization to form a zygote",
          "In internal fertilization, sperm fertilizes the egg inside the female body",
          "In external fertilization, sperm fertilizes the egg in water or moist environment outside the body",
          "Viviparous animals develop embryos inside the mother and give birth to live young",
          "Oviparous animals lay eggs where embryos develop outside the mother",
          "Ovoviviparous animals retain eggs inside until hatching, then release live young",
          "Metamorphosis is the dramatic body change some animals undergo during development from larva to adult",
          "The human menstrual cycle lasts about 28 days and prepares the uterus for pregnancy"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Reproduction",
        "meaning": "Biological process by which organisms produce new individuals similar to themselves"
      },
      {
        "term": "Asexual Reproduction",
        "meaning": "Reproduction involving one parent producing genetically identical offspring through cell division"
      },
      {
        "term": "Sexual Reproduction",
        "meaning": "Reproduction involving two parents whose genetic material combines to produce genetically unique offspring"
      },
      {
        "term": "Gamete",
        "meaning": "Sex cell that combines with another gamete during sexual reproduction to form a zygote"
      },
      {
        "term": "Fertilization",
        "meaning": "Union of male sperm and female egg to form a zygote that develops into a new organism"
      },
      {
        "term": "Metamorphosis",
        "meaning": "Dramatic body transformation during animal development, such as tadpole to frog or caterpillar to butterfly"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between asexual and sexual reproduction?",
        "a": "Asexual reproduction involves one parent and produces genetically identical offspring, while sexual reproduction involves two parents and produces genetically diverse offspring through gamete fusion"
      },
      {
        "q": "What is external fertilization and where does it occur?",
        "a": "External fertilization occurs when sperm fertilizes eggs outside the female body in water or moist environments, common in fish, amphibians, and many aquatic animals"
      },
      {
        "q": "What is metamorphosis and why is it important?",
        "a": "Metamorphosis is a dramatic change in body form during animal development, allowing organisms to occupy different ecological niches during different life stages and improve survival chances"
      }
    ]
  },
  {
    "slug": "class-8-science-force-pressure",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Force and Pressure",
    "intro": "Force is a push or pull that can change an object's motion, shape, or direction, while pressure is the force applied per unit area. Understanding these concepts is vital for physics and real-world applications.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Force is a push or pull acting on an object that can change its state of motion or shape",
          "Contact forces require direct contact between objects, such as friction, tension, and applied force",
          "Non-contact forces act at a distance without touching, including gravity and electromagnetic forces",
          "Newtons are the SI unit of force, named after Isaac Newton",
          "A balanced force results in zero net force and no change in motion",
          "An unbalanced force results in non-zero net force, causing acceleration or change in motion",
          "Pressure is the force applied perpendicular to a surface divided by the area of that surface",
          "Pascal is the SI unit of pressure, equal to one Newton per square meter",
          "Pressure increases when force increases or area decreases",
          "Pressure decreases when force decreases or area increases",
          "Applications include pressure in hydraulic systems, atmospheric pressure, and pressure in fluids",
          "Machines like inclined planes, levers, and pulleys reduce the force needed by distributing it over larger areas or distances"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Force = Mass × Acceleration (F = ma)",
          "Pressure = Force / Area (P = F/A)",
          "Atmospheric Pressure = 101,325 Pa or 1 atm"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Force",
        "meaning": "A push or pull acting on an object that can change its velocity, direction, or shape"
      },
      {
        "term": "Pressure",
        "meaning": "Amount of force applied perpendicular to a surface per unit area of that surface"
      },
      {
        "term": "Contact Force",
        "meaning": "Force that requires direct physical contact between two objects"
      },
      {
        "term": "Non-contact Force",
        "meaning": "Force that acts on objects at a distance without physical contact"
      },
      {
        "term": "Balanced Force",
        "meaning": "Equal and opposite forces that result in zero net force and no acceleration"
      },
      {
        "term": "Unbalanced Force",
        "meaning": "Unequal forces resulting in a net force that causes acceleration or change in motion"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between force and pressure?",
        "a": "Force is a push or pull with units of Newtons, while pressure is force applied over an area with units of Pascals. The same force can create different pressures depending on the area over which it is distributed"
      },
      {
        "q": "How does reducing area affect pressure?",
        "a": "Reducing the area over which a force acts increases pressure proportionally. For example, a sharp knife applies more pressure than a dull one with the same force because it has a smaller contact area"
      },
      {
        "q": "What is the difference between balanced and unbalanced forces?",
        "a": "Balanced forces are equal and opposite, resulting in zero net force and no change in motion. Unbalanced forces are unequal, resulting in a net force that causes acceleration or change in velocity"
      }
    ]
  },
  {
    "slug": "class-8-science-friction",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Friction",
    "intro": "Friction is the force that opposes motion between surfaces in contact, converting kinetic energy to heat. Understanding friction is crucial for everyday activities from walking to driving vehicles.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Friction is a force that opposes relative motion between two surfaces in contact",
          "Static friction acts between surfaces at rest and prevents motion until overcome",
          "Kinetic friction acts between surfaces already in relative motion",
          "Rolling friction is the resistance to rolling motion, typically smaller than sliding friction",
          "Friction depends on surface roughness and the normal force pressing the surfaces together",
          "Smooth surfaces have lower friction; rough surfaces have higher friction",
          "Friction always acts parallel to surfaces and opposes the direction of motion or applied force",
          "Friction converts kinetic energy into heat, warming objects in contact",
          "Lubricants reduce friction between surfaces by creating a thin film between them",
          "Friction is beneficial for walking, braking, and gripping objects",
          "Friction is harmful when it causes wear, energy loss, and generates unwanted heat",
          "Friction can be increased using rough surfaces and can be decreased using lubricants or by reducing normal force"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Friction = Coefficient of Friction × Normal Force (f = μN)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Friction",
        "meaning": "Force opposing relative motion between surfaces in contact"
      },
      {
        "term": "Static Friction",
        "meaning": "Friction between surfaces at rest that resists the start of motion"
      },
      {
        "term": "Kinetic Friction",
        "meaning": "Friction between surfaces already sliding relative to each other"
      },
      {
        "term": "Rolling Friction",
        "meaning": "Resistance encountered when an object rolls over a surface"
      },
      {
        "term": "Coefficient of Friction",
        "meaning": "Dimensionless number that represents the friction between two surfaces"
      },
      {
        "term": "Lubricant",
        "meaning": "Substance like oil or grease applied between surfaces to reduce friction"
      }
    ],
    "faqs": [
      {
        "q": "What causes friction?",
        "a": "Friction is caused by irregularities and imperfections on surfaces that come into contact. Even smooth-looking surfaces have microscopic bumps that interact and resist relative motion"
      },
      {
        "q": "How can friction be reduced?",
        "a": "Friction can be reduced by using lubricants to create a thin film between surfaces, polishing surfaces to make them smoother, reducing the normal force, or using rolling instead of sliding motion"
      },
      {
        "q": "Is friction always harmful?",
        "a": "No, friction is both beneficial and harmful. It enables walking, braking, and gripping, but it causes wear on objects and wastes energy through heat. The key is managing friction appropriately for each situation"
      }
    ]
  },
  {
    "slug": "class-8-science-light",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Light",
    "intro": "Light is a form of electromagnetic radiation that travels at constant speed and exhibits both particle and wave properties. Understanding light is fundamental to optics, vision, and numerous technological applications.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Light is a transverse electromagnetic wave that can travel through vacuum at 300,000 km/s",
          "Visible light is only a small portion of the electromagnetic spectrum, with wavelengths 400-700 nm",
          "Reflection is the bouncing back of light from a surface",
          "The law of reflection states incident angle equals reflected angle, both measured from normal",
          "Regular reflection occurs on smooth surfaces and produces clear images",
          "Diffuse reflection occurs on rough surfaces and scatters light in all directions",
          "Refraction is bending of light when it passes from one medium to another with different density",
          "The refractive index determines how much light bends when entering a medium",
          "Lenses use refraction to focus or diverge light for magnification",
          "Convex lenses converge light and form real, inverted images",
          "Concave lenses diverge light and form virtual, upright images",
          "Dispersion separates white light into component colors through refraction in prisms"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Speed of Light = 3 × 10^8 m/s",
          "Angle of Incidence = Angle of Reflection"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Light",
        "meaning": "Electromagnetic radiation visible to the human eye, traveling at constant speed through space"
      },
      {
        "term": "Reflection",
        "meaning": "Bouncing back of light from a surface following the law of reflection"
      },
      {
        "term": "Refraction",
        "meaning": "Bending of light when passing from one medium to another due to change in speed"
      },
      {
        "term": "Refractive Index",
        "meaning": "Ratio of speed of light in vacuum to speed of light in a medium"
      },
      {
        "term": "Lens",
        "meaning": "Transparent optical device that uses refraction to focus, diverge, or magnify light"
      },
      {
        "term": "Dispersion",
        "meaning": "Separation of white light into component colors due to different refraction rates"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between reflection and refraction?",
        "a": "Reflection is bouncing back of light from a surface, while refraction is bending of light when it passes between media with different densities. Reflection follows the law of angles, while refraction depends on refractive index"
      },
      {
        "q": "What are convex and concave lenses used for?",
        "a": "Convex lenses converge light and are used in magnifying glasses and camera lenses to form real images. Concave lenses diverge light and are used in some eyeglasses to correct myopia"
      },
      {
        "q": "Why does white light separate into colors in a prism?",
        "a": "Different colors have different wavelengths and experience different amounts of refraction in glass. Violet bends more than red because it has a shorter wavelength, causing dispersion that separates the colors"
      }
    ]
  },
  {
    "slug": "class-8-science-stars-solar-system",
    "classLevel": "Class 8",
    "subject": "Science",
    "chapter": "Stars and the Solar System",
    "intro": "The solar system consists of the Sun, planets, moons, and other celestial objects orbiting the Sun, while stars are massive luminous spheres of plasma in distant galaxies. Understanding these bodies helps us comprehend the universe.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "The Sun is the center of the solar system and contains 99.86% of its mass",
          "Planets are celestial bodies orbiting the Sun, massive enough to clear their orbital path",
          "The solar system includes Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune",
          "Inner planets are rocky and closer to the Sun, with thinner atmospheres",
          "Outer planets are gaseous giants and far from the Sun with thick atmospheres and many moons",
          "Moons are natural satellites orbiting planets, like Earth's Moon",
          "Asteroids are small rocky bodies orbiting the Sun, mostly between Mars and Jupiter",
          "Comets are icy bodies with long tails that become visible when approaching the Sun",
          "Stars are massive luminous spheres producing energy through nuclear fusion in their cores",
          "The Sun is a medium-sized star composed mainly of hydrogen and helium",
          "Constellations are patterns of stars as seen from Earth, used for navigation and mythology",
          "The Milky Way is our galaxy containing billions of stars, and the solar system is located within it"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Solar System",
        "meaning": "Gravitational system consisting of the Sun and all objects orbiting it, including planets and asteroids"
      },
      {
        "term": "Planet",
        "meaning": "Large celestial body orbiting a star with sufficient mass and gravity to clear its orbital path"
      },
      {
        "term": "Moon",
        "meaning": "Natural satellite orbiting a planet due to gravitational attraction"
      },
      {
        "term": "Asteroid",
        "meaning": "Small rocky celestial body orbiting the Sun, typically found in the asteroid belt"
      },
      {
        "term": "Comet",
        "meaning": "Icy celestial body with a tail visible from Earth when it approaches the Sun"
      },
      {
        "term": "Star",
        "meaning": "Massive celestial body producing light and heat through nuclear fusion"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between inner and outer planets?",
        "a": "Inner planets are rocky, small, and closer to the Sun with thin atmospheres and few moons. Outer planets are gaseous giants, large, and far from the Sun with thick atmospheres and many moons"
      },
      {
        "q": "Why do comets have tails?",
        "a": "Comets are icy bodies. As they approach the Sun, solar radiation heats them, causing ice to vaporize and release gases and dust that are pushed away by solar wind, forming long visible tails"
      },
      {
        "q": "What is the difference between a star and a planet?",
        "a": "Stars produce light and heat through nuclear fusion, while planets do not generate their own energy. Stars are much larger and more massive than planets"
      }
    ]
  },
  {
    "slug": "class-8-maths-linear-equations",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Linear Equations in One Variable",
    "intro": "Linear equations in one variable are equations with the variable appearing to the first power, solved by isolating the variable. They form the foundation for algebra and solving real-world problems.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "A linear equation in one variable has the form ax + b = 0, where a and b are constants and a ≠ 0",
          "The solution of an equation is the value of the variable that makes the equation true",
          "Equivalent equations have the same solution and can be obtained by adding or subtracting the same quantity from both sides",
          "Adding or subtracting the same quantity from both sides maintains equality",
          "Multiplying or dividing both sides by the same non-zero quantity maintains equality",
          "Transposition is moving a term from one side to the other by reversing its sign",
          "Linear equations can model real-world situations like distance, speed, age, and cost problems",
          "To solve, use inverse operations to isolate the variable on one side of the equation",
          "Check solutions by substituting back into the original equation",
          "Equations can have one solution, no solution, or infinitely many solutions",
          "Fractions in equations can be eliminated by multiplying all terms by the least common denominator",
          "Variables on both sides require moving variable terms to one side and constants to the other"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "ax + b = 0, Solution: x = -b/a"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Linear Equation",
        "meaning": "Equation where the variable appears to the first power and can be written as ax + b = 0"
      },
      {
        "term": "Solution",
        "meaning": "The value of the variable that satisfies the equation and makes both sides equal"
      },
      {
        "term": "Equivalent Equations",
        "meaning": "Equations that have the same solution"
      },
      {
        "term": "Transposition",
        "meaning": "Moving terms between sides of an equation by reversing their operation"
      },
      {
        "term": "Inverse Operation",
        "meaning": "Operation that reverses another operation, such as subtraction reversing addition"
      },
      {
        "term": "Variable",
        "meaning": "Symbol representing an unknown quantity in an equation"
      }
    ],
    "faqs": [
      {
        "q": "How do you solve a linear equation with variables on both sides?",
        "a": "Collect all variable terms on one side using transposition, then collect constant terms on the other side. Finally, divide both sides by the coefficient of the variable to isolate it"
      },
      {
        "q": "Why do we check solutions in linear equations?",
        "a": "Checking solutions by substituting back into the original equation verifies that no errors were made during solving and that the value truly satisfies the equation"
      },
      {
        "q": "How do you eliminate fractions in linear equations?",
        "a": "Multiply all terms in the equation by the least common multiple of all denominators to convert fractions to integers, making the equation easier to solve"
      }
    ]
  },
  {
    "slug": "class-8-maths-squares-square-roots",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Squares and Square Roots",
    "intro": "Squares are numbers multiplied by themselves, while square roots are the inverse operation finding the base number. These concepts are essential for geometry, algebra, and solving quadratic equations.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "A perfect square is the product of an integer multiplied by itself, like 4 = 2×2, 9 = 3×3",
          "All perfect squares end in 0, 1, 4, 5, 6, or 9 in the ones place",
          "Perfect squares cannot have 2, 3, 7, or 8 in the ones place",
          "A square root is the value that when multiplied by itself gives the original number",
          "The square root symbol is √, and √n means the positive square root of n",
          "Every positive number has two square roots, one positive and one negative",
          "The square root of a perfect square is always an integer",
          "The square root of non-perfect squares are irrational numbers that cannot be simplified further",
          "To estimate square roots of non-perfect squares, find perfect squares nearby",
          "Properties include √(ab) = √a × √b and √(a/b) = √a / √b",
          "Pythagorean theorem relates squares of sides in right triangles: a² + b² = c²",
          "Long division method can be used to find square roots of large perfect squares"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Perfect Square: n² = n × n",
          "Square Root: √n² = n",
          "Property: √(ab) = √a × √b",
          "Property: √(a/b) = √a / √b"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Perfect Square",
        "meaning": "Integer that is the square of another integer"
      },
      {
        "term": "Square Root",
        "meaning": "Value that when multiplied by itself gives the original number"
      },
      {
        "term": "Radical",
        "meaning": "Expression containing a root symbol, like √n"
      },
      {
        "term": "Rational Number",
        "meaning": "Number that can be expressed as a fraction of two integers"
      },
      {
        "term": "Irrational Number",
        "meaning": "Number that cannot be expressed as a fraction of two integers, like √2"
      },
      {
        "term": "Estimation",
        "meaning": "Finding an approximate value for a square root using nearby perfect squares"
      }
    ],
    "faqs": [
      {
        "q": "How can you identify if a number is a perfect square?",
        "a": "A number is a perfect square if its square root is an integer. Also, perfect squares end in 0, 1, 4, 5, 6, or 9, and numbers ending in 2, 3, 7, or 8 cannot be perfect squares"
      },
      {
        "q": "What is the difference between √9 and 3?",
        "a": "√9 means the square root of 9, which equals 3. The notation √9 represents taking the square root, while 3 is the result. Technically, ±3 are both square roots of 9"
      },
      {
        "q": "How do you find the square root of non-perfect squares?",
        "a": "Square roots of non-perfect squares are irrational and cannot be expressed as integers. You can estimate by finding perfect squares nearby, use a calculator, or use long division method"
      }
    ]
  },
  {
    "slug": "class-8-maths-cubes-cube-roots",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Cubes and Cube Roots",
    "intro": "Cubes are numbers raised to the third power, while cube roots are the inverse operation. Unlike square roots, cube roots of negative numbers are negative, expanding the number system.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "A perfect cube is a number obtained by multiplying an integer by itself three times",
          "Examples of perfect cubes: 1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64, 5³ = 125",
          "Perfect cubes can be positive or negative, unlike perfect squares",
          "The cube root of a number is the value that when multiplied by itself three times gives the original number",
          "The cube root of positive numbers is positive, and of negative numbers is negative",
          "Every real number has exactly one cube root",
          "Prime factorization method helps find cube roots by grouping factors in threes",
          "Cube roots of negative numbers follow the rule: ∛(-n) = -∛n",
          "The digits 0 through 9 cubed end in 0, 1, 8, 7, 4, 5, 6, 3, 2, 9 respectively",
          "Pattern exists in last digits of cubes, useful for identifying cubes",
          "Cube root of decimal numbers can be found using prime factorization",
          "Cube roots are used in volume calculations and solving cubic equations"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Perfect Cube: n³ = n × n × n",
          "Cube Root: ∛n³ = n",
          "Property: ∛(abc) = ∛a × ∛b × ∛c",
          "Negative Cube Root: ∛(-n³) = -n"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Perfect Cube",
        "meaning": "Integer that is the cube of another integer"
      },
      {
        "term": "Cube Root",
        "meaning": "Value that when multiplied by itself three times equals the original number"
      },
      {
        "term": "Prime Factorization",
        "meaning": "Expression of a number as a product of prime numbers"
      },
      {
        "term": "Radical",
        "meaning": "Expression containing a root symbol, like ∛n"
      },
      {
        "term": "Digit Root",
        "meaning": "The last digit of a number, used to identify perfect cubes"
      },
      {
        "term": "Real Number",
        "meaning": "Any number on the number line, including integers, fractions, and irrational numbers"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between cubes and cube roots?",
        "a": "Cubes are numbers raised to the third power, like 2³ = 8. Cube roots are the inverse operation finding the number that was cubed, like ∛8 = 2"
      },
      {
        "q": "Can cube roots be negative?",
        "a": "Yes, cube roots can be negative. The cube root of a negative number is negative, following the rule ∛(-n) = -∛n. For example, ∛(-8) = -2"
      },
      {
        "q": "How do you find cube roots of large numbers using prime factorization?",
        "a": "Find the prime factorization of the number, then group the prime factors into groups of three. Multiply one factor from each group to get the cube root"
      }
    ]
  },
  {
    "slug": "class-8-maths-comparing-quantities",
    "classLevel": "Class 8",
    "subject": "Mathematics",
    "chapter": "Comparing Quantities",
    "intro": "Comparing quantities involves ratios, proportions, percentages, and their applications in practical situations. These tools help solve problems related to profit, loss, discount, and compound interest.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "A ratio compares two quantities using division, expressed as a:b or a/b",
          "Equivalent ratios have the same value, like 2:3 and 4:6",
          "A proportion states that two ratios are equal, written as a:b = c:d or a/b = c/d",
          "Percentage is a ratio expressed out of 100, with the symbol %",
          "To convert a fraction to percentage: multiply by 100 and add %",
          "To convert a percentage to fraction: divide by 100",
          "Profit is selling price minus cost price when profit occurs",
          "Loss is cost price minus selling price when loss occurs",
          "Profit percentage = (Profit / Cost Price) × 100",
          "Discount is a reduction in price on the marked price",
          "Discount percentage = (Discount / Marked Price) × 100",
          "Simple interest = (Principal × Rate × Time) / 100",
          "Compound interest is calculated on principal plus accumulated interest, showing exponential growth"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Ratio: a:b or a/b",
          "Percentage: (Part / Whole) × 100",
          "Profit Percentage: (Profit / Cost Price) × 100",
          "Loss Percentage: (Loss / Cost Price) × 100",
          "Discount: Marked Price - Selling Price",
          "Simple Interest: (P × R × T) / 100",
          "Compound Interest: A = P(1 + r/100)^n"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Ratio",
        "meaning": "Comparison of two quantities of the same kind using division"
      },
      {
        "term": "Proportion",
        "meaning": "Statement that two ratios are equal"
      },
      {
        "term": "Percentage",
        "meaning": "Ratio expressed as a number out of 100"
      },
      {
        "term": "Profit",
        "meaning": "Amount gained when selling price exceeds cost price"
      },
      {
        "term": "Discount",
        "meaning": "Reduction in price offered on the marked price of an item"
      },
      {
        "term": "Simple Interest",
        "meaning": "Interest calculated only on the principal amount for a specified period"
      }
    ],
    "faqs": [
      {
        "q": "How do you calculate profit percentage?",
        "a": "Profit percentage = (Profit / Cost Price) × 100. First find the profit by subtracting cost price from selling price, then divide by cost price and multiply by 100"
      },
      {
        "q": "What is the difference between discount and profit?",
        "a": "Discount is a reduction in marked price to get the selling price. Profit is the difference between selling price and cost price. An item can have a discount but still yield profit"
      },
      {
        "q": "Why is compound interest higher than simple interest?",
        "a": "Compound interest is calculated on principal plus accumulated interest each period, while simple interest is only on the original principal. This causes exponential growth in compound interest over time"
      }
    ]
  },
  {
    "slug": "class-7-science-nutrition-plants",
    "classLevel": "Class 7",
    "subject": "Science",
    "chapter": "Nutrition in Plants",
    "intro": "Plants are autotrophs that produce their own food through photosynthesis using sunlight, water, and carbon dioxide. Understanding plant nutrition is fundamental to ecology and agriculture.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Photosynthesis is the process by which plants produce glucose using sunlight, carbon dioxide, and water",
          "Chlorophyll is the green pigment in chloroplasts that captures light energy",
          "The leaf is the food factory of the plant; food made there is carried to every other part, including the roots",
          "Each stoma is bounded by two guard cells, which open and close the pore",
          "Carbon dioxide is absorbed through stomata, pores on plant leaves",
          "Water is absorbed by roots and transported to leaves through the xylem",
          "Glucose produced in photosynthesis is used for plant growth and respiration",
          "Heterotrophs are organisms that depend on autotrophs for food",
          "Saprophytes are organisms that feed on dead organic matter through decomposition",
          "Parasites feed on living host organisms, harming them in the process",
          "Nitrogen, phosphorus, and potassium are essential mineral nutrients for plants",
          "Root nodules in legumes contain bacteria that fix atmospheric nitrogen"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Photosynthesis (word equation): Carbon dioxide + Water → Carbohydrate + Oxygen, in the presence of sunlight and chlorophyll",
          "Sunlight and chlorophyll are conditions and are written on the arrow, not as reactants — neither is used up"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Photosynthesis",
        "meaning": "Process by which plants produce glucose from carbon dioxide and water using light energy"
      },
      {
        "term": "Chlorophyll",
        "meaning": "Green pigment in chloroplasts that absorbs light energy for photosynthesis"
      },
      {
        "term": "Autotroph",
        "meaning": "Organism that produces its own food from inorganic substances"
      },
      {
        "term": "Heterotroph",
        "meaning": "Organism that depends on other organisms for food"
      },
      {
        "term": "Stomata",
        "meaning": "Pores on plant leaves through which gas exchange and transpiration occur"
      },
      {
        "term": "Chloroplast",
        "meaning": "Organelle in plant cells where photosynthesis takes place"
      }
    ],
    "faqs": [
      {
        "q": "Why are plants called autotrophs?",
        "a": "Plants are autotrophs because they can produce their own food through photosynthesis using sunlight, carbon dioxide, and water, without depending on other organisms"
      },
      {
        "q": "What is the role of chlorophyll in photosynthesis?",
        "a": "Chlorophyll is the green pigment present in leaves that traps energy from sunlight. Without it the plant cannot use light energy to make food, which is why photosynthesis takes place only in the green parts of a plant"
      },
      {
        "q": "How do nitrogen-fixing bacteria help plants?",
        "a": "Nitrogen-fixing bacteria in root nodules convert atmospheric nitrogen into ammonia compounds that plants can absorb and use for protein synthesis"
      }
    ]
  },
  {
    "slug": "class-7-science-heat",
    "classLevel": "Class 7",
    "subject": "Science",
    "chapter": "Heat",
    "intro": "Heat is thermal energy transfer between objects at different temperatures, measured in joules or calories. Understanding heat transfer is essential for explaining weather, cooking, and industrial processes.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Heat is the transfer of thermal energy from a hotter object to a cooler object",
          "Temperature is a measure of the average kinetic energy of particles in a substance",
          "Thermometer measures temperature and uses the expansion and contraction of liquids",
          "Conduction is heat transfer through direct contact between objects",
          "Convection is heat transfer through movement of fluids like air and water",
          "Radiation is heat transfer through electromagnetic waves that require no medium",
          "Specific heat capacity is the heat energy needed to raise the temperature of 1 kg by 1°C",
          "Latent heat is the heat energy absorbed or released during phase changes without temperature change",
          "Thermal expansion is the increase in size of objects when heated",
          "Linear expansion applies to one dimension, area expansion to two, volume to three",
          "Insulation materials reduce heat transfer by trapping air or preventing conduction",
          "Celsius, Fahrenheit, and Kelvin are temperature scales used globally"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Heat Energy: Q = m × c × ΔT (where m is mass, c is specific heat, ΔT is temperature change)",
          "Temperature Conversion: °F = (9/5) × °C + 32",
          "Temperature Conversion: K = °C + 273.15"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Heat",
        "meaning": "Transfer of thermal energy from a hotter object to a cooler object"
      },
      {
        "term": "Temperature",
        "meaning": "Measure of the average kinetic energy of particles in a substance"
      },
      {
        "term": "Conduction",
        "meaning": "Transfer of heat through direct contact between materials"
      },
      {
        "term": "Convection",
        "meaning": "Transfer of heat through movement of fluids due to density differences"
      },
      {
        "term": "Radiation",
        "meaning": "Transfer of heat through electromagnetic waves without requiring a medium"
      },
      {
        "term": "Specific Heat Capacity",
        "meaning": "Amount of heat energy needed to raise temperature of 1 kg of substance by 1°C"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between heat and temperature?",
        "a": "Temperature measures the average kinetic energy of particles, while heat is the transfer of thermal energy between objects. You can have high temperature with little heat or vice versa"
      },
      {
        "q": "How do the three methods of heat transfer differ?",
        "a": "Conduction transfers heat through direct contact, convection through movement of fluids, and radiation through electromagnetic waves without requiring a medium"
      },
      {
        "q": "What is latent heat?",
        "a": "Latent heat is the heat energy absorbed or released when a substance changes phase, like from solid to liquid or liquid to gas, without any change in temperature"
      }
    ]
  },
  {
    "slug": "class-7-science-acids-bases-salts",
    "classLevel": "Class 7",
    "subject": "Science",
    "chapter": "Acids, Bases and Salts",
    "intro": "Acids and bases are chemical compounds with opposite properties, while salts result from their neutralization. Understanding these substances is crucial for chemistry and daily life applications.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Acids are substances that taste sour, turn blue litmus red, and have pH less than 7",
          "Bases are substances that taste bitter, turn red litmus blue, and have pH greater than 7",
          "Salts are ionic compounds formed when acids react with bases in neutralization",
          "pH scale measures acidity and basicity from 0 to 14, with 7 being neutral",
          "Indicators are substances that change color to show presence of acids or bases",
          "Litmus paper turns red in acids and blue in bases",
          "Methyl orange turns red in strong acids and yellow in neutral or basic solutions",
          "Phenolphthalein turns colorless in acids and pink in bases",
          "Hydrochloric acid, sulfuric acid, and acetic acid are common acids",
          "Sodium hydroxide, potassium hydroxide, and ammonia are common bases",
          "Neutralization is the reaction between acids and bases producing salt and water",
          "Universal indicator solution shows a range of colors for different pH values"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Acid + Base = Salt + Water",
          "pH = -log[H+]",
          "pOH = 14 - pH (relationship in water)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Acid",
        "meaning": "Substance that tastes sour and turns blue litmus red, with pH below 7"
      },
      {
        "term": "Base",
        "meaning": "Substance that tastes bitter and turns red litmus blue, with pH above 7"
      },
      {
        "term": "Salt",
        "meaning": "Ionic compound formed from neutralization of an acid and base"
      },
      {
        "term": "pH",
        "meaning": "Measure of acidity and basicity on a scale from 0 to 14"
      },
      {
        "term": "Indicator",
        "meaning": "Substance that changes color in presence of acids or bases"
      },
      {
        "term": "Neutralization",
        "meaning": "Chemical reaction between acid and base producing salt and water"
      }
    ],
    "faqs": [
      {
        "q": "How do you identify if a substance is an acid or a base?",
        "a": "Use litmus paper or indicators: acids turn blue litmus red and have sour taste; bases turn red litmus blue and have bitter taste. pH less than 7 indicates acid, greater than 7 indicates base"
      },
      {
        "q": "What happens when acid and base react?",
        "a": "Acids and bases undergo neutralization, producing a salt and water. The hydrogen ions from acid combine with hydroxide ions from base, forming neutral water"
      },
      {
        "q": "What is the pH scale and why is 7 neutral?",
        "a": "pH scale ranges from 0 to 14, measuring acidity. pH 7 is neutral because it represents equal concentrations of hydrogen and hydroxide ions, as in pure water"
      }
    ]
  },
  {
    "slug": "class-7-science-respiration",
    "classLevel": "Class 7",
    "subject": "Science",
    "chapter": "Respiration",
    "intro": "Every living cell breaks down food to release the energy it needs, and that process is respiration. This chapter separates breathing from respiration, follows the path air takes through the human body, and looks at how animals from earthworms to fish manage the same job in very different ways.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Respiration is the breakdown of food inside the cells of the body to release energy; it goes on in every living cell, all the time",
          "Breathing is only one part of it — taking in oxygen-rich air and giving out carbon dioxide-rich air. Breathing is not the same as respiration",
          "One breath means one inhalation plus one exhalation, and the breathing rate is the number of breaths taken in a minute",
          "An adult at rest breathes about 15 to 18 times a minute; during heavy exercise this can rise to about 25 times a minute",
          "Aerobic respiration uses oxygen; organisms that respire this way are called aerobes",
          "Anaerobic respiration takes place without oxygen; yeast is the standard example of an anaerobe, and it is used to make alcohol and wine",
          "During heavy exercise the muscles do not get enough oxygen, so glucose breaks down into lactic acid, and the build-up causes muscle cramps",
          "A hot water bath or a massage relieves cramps because it improves blood circulation, so more oxygen reaches the muscle and the lactic acid is broken down",
          "In inhalation the ribs move up and outwards and the diaphragm moves down, making the chest cavity larger; in exhalation both move back and it becomes smaller",
          "Exhaled air turns lime water milky, which is the test showing it contains more carbon dioxide",
          "Cockroaches breathe through small openings called spiracles and a network of air tubes called tracheae; earthworms breathe through their moist skin",
          "Fish take in oxygen dissolved in water using gills; frogs can breathe through their skin as well as their lungs",
          "Plants respire too — leaves exchange gases through stomata, and roots take in air from the spaces between soil particles"
        ]
      },
      {
        "heading": "Important Word Equations",
        "points": [
          "Aerobic respiration: Glucose + Oxygen → Carbon dioxide + Water + Energy",
          "Anaerobic respiration in yeast: Glucose → Alcohol + Carbon dioxide + Energy",
          "In our muscles when oxygen runs short: Glucose → Lactic acid + Energy",
          "Note that anaerobic respiration releases much less energy than aerobic respiration from the same amount of glucose"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Respiration",
        "meaning": "The breakdown of food inside the cells of the body to release energy"
      },
      {
        "term": "Breathing",
        "meaning": "Taking in oxygen-rich air into the body and giving out air rich in carbon dioxide"
      },
      {
        "term": "Breathing rate",
        "meaning": "The number of breaths taken in one minute; about 15 to 18 for an adult at rest"
      },
      {
        "term": "Aerobic respiration",
        "meaning": "Respiration that takes place using oxygen; organisms doing this are called aerobes"
      },
      {
        "term": "Anaerobic respiration",
        "meaning": "Respiration that takes place without oxygen, as in yeast, releasing much less energy"
      },
      {
        "term": "Diaphragm",
        "meaning": "The sheet of muscle below the chest cavity that moves down during inhalation and up during exhalation"
      },
      {
        "term": "Spiracles",
        "meaning": "Small openings on the sides of a cockroach's body through which air enters the tracheae"
      },
      {
        "term": "Gills",
        "meaning": "Organs that allow fish to take in oxygen dissolved in water"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between breathing and respiration?",
        "a": "Breathing is the physical act of taking in oxygen-rich air and giving out carbon dioxide-rich air, and it involves the nose, windpipe and lungs. Respiration is the breakdown of food inside the cells to release energy. Breathing supplies the oxygen that respiration uses, so breathing is one step that supports respiration, not the same thing as it"
      },
      {
        "q": "Why do we get muscle cramps after heavy exercise?",
        "a": "During heavy exercise the muscle cells need more energy than the oxygen reaching them can supply. The cells then break down glucose without oxygen, producing lactic acid, and the build-up of lactic acid causes cramps. A hot water bath or a massage improves blood circulation so more oxygen reaches the muscle, the lactic acid is broken down and the cramp is relieved"
      },
      {
        "q": "How do we know that exhaled air contains more carbon dioxide?",
        "a": "Blow exhaled air through lime water using a straw and the lime water turns milky. Lime water turns milky in the presence of carbon dioxide, so the change shows that the air we breathe out is richer in carbon dioxide than the air around us"
      },
      {
        "q": "How do earthworms and fish breathe?",
        "a": "An earthworm breathes through its skin, which feels moist and slimy; gases pass through the moist skin into the blood. A fish takes in water through its mouth and passes it over the gills, which extract the oxygen dissolved in the water. Both are solving the same problem as our lungs do, but in the medium each animal lives in"
      }
    ]
  },
  {
    "slug": "class-11-physics-units-measurements",
    "classLevel": "Class 11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "intro": "Units and measurements form the foundation of physics, providing standardized ways to quantify physical quantities. Accurate measurement and proper unit conversion are essential for scientific work.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "The SI system provides seven fundamental units: meter, kilogram, second, ampere, kelvin, mole, candela",
          "Derived units combine fundamental units to measure complex quantities",
          "Length is measured in meters, the SI unit of distance",
          "Mass is measured in kilograms, the SI unit of amount of matter",
          "Time is measured in seconds, the SI unit of duration",
          "Prefixes indicate powers of 10, like kilo- for 10³ and milli- for 10⁻³",
          "Significant figures represent the precision of a measurement",
          "Scientific notation expresses numbers as a × 10^n for easy handling of large and small numbers",
          "Accuracy refers to how close a measurement is to the true value",
          "Precision refers to how close repeated measurements are to each other",
          "Dimensional analysis checks equation correctness and converts between units",
          "Errors in measurement include systematic errors and random errors"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Scientific Notation: a × 10^n (where 1 ≤ a < 10)",
          "Relative Error: (Measured Value - Actual Value) / Actual Value",
          "Percentage Error: (Relative Error) × 100"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "SI Unit",
        "meaning": "Standard unit of measurement in the International System of Units"
      },
      {
        "term": "Fundamental Unit",
        "meaning": "Basic unit in SI system that cannot be derived from other units"
      },
      {
        "term": "Derived Unit",
        "meaning": "Unit formed by combining fundamental units"
      },
      {
        "term": "Significant Figure",
        "meaning": "Digit in a measurement that carries meaning about precision"
      },
      {
        "term": "Accuracy",
        "meaning": "Closeness of a measured value to the actual or true value"
      },
      {
        "term": "Precision",
        "meaning": "Closeness of multiple measurements to each other"
      }
    ],
    "faqs": [
      {
        "q": "What are the seven fundamental SI units?",
        "a": "The seven fundamental SI units are: meter (length), kilogram (mass), second (time), ampere (electric current), kelvin (temperature), mole (amount of substance), and candela (luminous intensity)"
      },
      {
        "q": "How do you convert between units using dimensional analysis?",
        "a": "Dimensional analysis multiplies the given quantity by conversion factors expressed as fractions equal to 1, ensuring units cancel until the desired unit remains"
      },
      {
        "q": "What is the difference between accuracy and precision?",
        "a": "Accuracy is how close measurements are to the true value, while precision is how close repeated measurements are to each other. A measurement can be precise but inaccurate"
      }
    ]
  },
  {
    "slug": "class-11-physics-laws-motion",
    "classLevel": "Class 11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "intro": "Newton's laws of motion describe how objects move and how forces affect their motion, forming the foundation of classical mechanics. These laws explain everyday phenomena and planetary motion.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Newton's first law states objects at rest remain at rest and moving objects remain in motion unless acted upon by net force",
          "Inertia is the property of objects to resist changes in their state of motion",
          "Mass is a measure of inertia and determines how much force is needed to accelerate an object",
          "Newton's second law states F = ma, where force equals mass times acceleration",
          "Net force is the vector sum of all forces acting on an object",
          "Newton's third law states every action has an equal and opposite reaction force",
          "Action and reaction forces act on different objects and never cancel each other",
          "Friction is a force opposing motion between surfaces, depending on normal force and surface properties",
          "Tension in strings and ropes transmits forces along their length",
          "Normal force acts perpendicular to surfaces and supports objects against gravity",
          "Free body diagrams show all forces acting on an object for analysis",
          "Equations of motion relate initial velocity, final velocity, acceleration, time, and displacement"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Newton's Second Law: F = ma",
          "Weight: W = mg (where g = 9.8 m/s²)",
          "Equations of Motion: v = u + at, s = ut + 1/2 at², v² = u² + 2as",
          "Friction: f = μN (where μ is coefficient of friction, N is normal force)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Inertia",
        "meaning": "Property of objects to resist changes in their state of motion"
      },
      {
        "term": "Force",
        "meaning": "Vector quantity that changes an object's velocity or direction"
      },
      {
        "term": "Acceleration",
        "meaning": "Rate of change of velocity with respect to time"
      },
      {
        "term": "Tension",
        "meaning": "Force transmitted along a string or rope pulling at both ends"
      },
      {
        "term": "Normal Force",
        "meaning": "Contact force perpendicular to surfaces supporting objects against gravity"
      },
      {
        "term": "Free Body Diagram",
        "meaning": "Representation of an object showing all forces acting on it"
      }
    ],
    "faqs": [
      {
        "q": "What does Newton's first law mean?",
        "a": "Newton's first law states that objects at rest stay at rest and moving objects maintain constant velocity unless a net force acts on them. This is the law of inertia"
      },
      {
        "q": "How does F = ma explain everyday motion?",
        "a": "F = ma shows that the same force produces different accelerations depending on mass. A light object accelerates more than a heavy object under the same force"
      },
      {
        "q": "Why don't action and reaction forces cancel?",
        "a": "Action and reaction forces act on different objects, so they cannot cancel each other. They are equal in magnitude but opposite in direction, affecting different bodies"
      }
    ]
  },
  {
    "slug": "class-11-chemistry-structure-atom",
    "classLevel": "Class 11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "intro": "Understanding atomic structure explains chemical bonding and element properties. Modern quantum mechanics describes electron orbitals, energy levels, and configurations determining reactivity.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Electrons have negative charge and occupy regions called orbitals around the nucleus",
          "Protons have positive charge and are located in the nucleus",
          "Neutrons have no charge and are located in the nucleus",
          "Bohr model describes electron shells at fixed distances from nucleus with specific energy levels",
          "Quantum mechanical model describes electron orbitals as probability regions where electrons are likely found",
          "Energy levels or shells are designated n = 1, 2, 3, and so on",
          "Subshells are designated s, p, d, f with different shapes and orientations",
          "Orbitals hold maximum 2 electrons with opposite spins",
          "Electron configuration shows the number of electrons in each orbital",
          "Valence electrons in the outermost shell determine chemical reactivity",
          "Aufbau principle fills orbitals from lowest to highest energy",
          "Hund's rule states electrons occupy orbitals singly before pairing"
        ]
      },
      {
        "heading": "Important Formulas",
        "points": [
          "Energy Level: En = -13.6 eV / n² (for hydrogen)",
          "Maximum Electrons in Shell: 2n²"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Orbital",
        "meaning": "Region of space where electrons are likely to be found"
      },
      {
        "term": "Electron Shell",
        "meaning": "Set of orbitals having the same principal quantum number"
      },
      {
        "term": "Subshell",
        "meaning": "Set of orbitals within a shell, like s, p, d, or f"
      },
      {
        "term": "Valence Electron",
        "meaning": "Electron in the outermost shell that determines chemical behavior"
      },
      {
        "term": "Spin",
        "meaning": "Property of electrons that can be up or down in an orbital"
      },
      {
        "term": "Quantum Number",
        "meaning": "Number describing properties of electrons and orbitals"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between Bohr and quantum mechanical models of the atom?",
        "a": "Bohr model places electrons in fixed circular orbits. Quantum mechanical model describes electrons as existing in orbitals, which are probability regions, not definite paths"
      },
      {
        "q": "How many electrons can fit in each shell?",
        "a": "The first shell holds maximum 2 electrons, second shell 8, third shell 18, and so on, following the formula 2n² where n is the shell number"
      },
      {
        "q": "What are valence electrons and why are they important?",
        "a": "Valence electrons are electrons in the outermost shell. They determine how an atom bonds with other atoms and are responsible for the chemical properties of the element"
      }
    ]
  },
  {
    "slug": "class-12-biology-reproduction",
    "classLevel": "Class 12",
    "subject": "Biology",
    "chapter": "Reproduction",
    "intro": "Reproduction is the fundamental biological process for continuation of species through sexual or asexual means. Class 12 covers gametogenesis, fertilization, and early embryonic development in detail.",
    "sections": [
      {
        "heading": "Key Points to Remember",
        "points": [
          "Sexual reproduction involves meiosis producing haploid gametes that fuse during fertilization",
          "Spermatogenesis is the formation of sperm from spermatogonial stem cells in testes",
          "Oogenesis is the formation of eggs from oogonia in ovaries through meiosis",
          "Gametogenesis requires meiosis to reduce chromosome number from diploid to haploid",
          "Meiosis includes two divisions separating homologous chromosomes then sister chromatids",
          "Crossing over during meiosis I increases genetic diversity",
          "Fertilization combines haploid sperm and egg to restore diploid number",
          "The acrosome reaction allows sperm nucleus entry into the egg",
          "Mitosis in the zygote produces daughter cells for early development",
          "The morula stage has about 16 cells during cleavage",
          "The blastocyst has a hollow interior and implants in the uterus",
          "Gastrulation forms three germ layers: ectoderm, mesoderm, and endoderm",
          "Organogenesis follows gastrulation where organs and tissues differentiate"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Gametogenesis",
        "meaning": "Process of gamete formation through meiosis"
      },
      {
        "term": "Spermatogenesis",
        "meaning": "Formation of sperm cells in testes"
      },
      {
        "term": "Oogenesis",
        "meaning": "Formation of egg cells in ovaries"
      },
      {
        "term": "Meiosis",
        "meaning": "Cell division producing four haploid cells from one diploid cell"
      },
      {
        "term": "Fertilization",
        "meaning": "Fusion of sperm and egg nuclei to form a zygote"
      },
      {
        "term": "Gastrulation",
        "meaning": "Stage of embryonic development forming three germ layers"
      }
    ],
    "faqs": [
      {
        "q": "What is the main difference between mitosis and meiosis?",
        "a": "Mitosis produces two identical diploid daughter cells for growth and repair. Meiosis produces four genetically different haploid gametes for sexual reproduction"
      },
      {
        "q": "How does crossing over contribute to genetic diversity?",
        "a": "Crossing over during prophase I of meiosis exchanges genetic material between homologous chromosomes, creating new combinations of alleles and increasing genetic variation in offspring"
      },
      {
        "q": "What happens during gastrulation?",
        "a": "Gastrulation is the rearrangement and differentiation of the blastula to form three germ layers: ectoderm, mesoderm, and endoderm, which give rise to all body tissues"
      }
    ]
  },
  {
    "slug": "class-9-science-matter-surroundings",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Matter in Our Surroundings",
    "intro": "Matter is anything that has mass and occupies space, made up of atoms and molecules in constant motion. Understanding matter's properties helps us classify substances and predict their behavior in different conditions.",
    "sections": [
      {
        "heading": "States of Matter",
        "points": [
          "Solid: definite shape, definite volume, particles tightly packed, vibrate in fixed position",
          "Liquid: indefinite shape, definite volume, particles closely packed but free to move",
          "Gas: indefinite shape, indefinite volume, particles far apart, move randomly"
        ]
      },
      {
        "heading": "Physical Properties of States",
        "points": [
          "Density increases from gas to liquid to solid",
          "Compressibility highest in gases, lowest in solids",
          "Intermolecular forces strong in solids, weak in gases"
        ]
      },
      {
        "heading": "Changes of State",
        "points": [
          "Melting: solid to liquid at melting point (absorbs heat)",
          "Freezing: liquid to solid at freezing point (releases heat)",
          "Evaporation: liquid to gas (endothermic), boiling: rapid evaporation at boiling point",
          "Condensation: gas to liquid (exothermic)",
          "Sublimation: solid directly to gas without melting"
        ]
      },
      {
        "heading": "Evaporation and Factors Affecting It",
        "points": [
          "Increased surface area increases evaporation rate",
          "Higher temperature speeds up evaporation",
          "Lower humidity and wind increase evaporation",
          "Evaporation is a cooling process"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Matter",
        "meaning": "Anything that has mass and occupies space"
      },
      {
        "term": "Density",
        "meaning": "Mass per unit volume of a substance"
      },
      {
        "term": "Melting Point",
        "meaning": "Temperature at which solid changes to liquid"
      },
      {
        "term": "Boiling Point",
        "meaning": "Temperature at which liquid rapidly changes to gas"
      },
      {
        "term": "Sublimation",
        "meaning": "Direct conversion of solid to gas without becoming liquid"
      }
    ],
    "faqs": [
      {
        "q": "Why does water evaporate faster on a hot day?",
        "a": "Higher temperature provides more kinetic energy to water molecules, enabling them to overcome intermolecular forces and escape as vapor."
      },
      {
        "q": "What is the difference between boiling and evaporation?",
        "a": "Evaporation occurs at any temperature from the surface, while boiling is rapid evaporation throughout the liquid at a specific temperature."
      },
      {
        "q": "Can dry ice sublime at room temperature?",
        "a": "Yes, dry ice (solid CO2) sublimes at room temperature and atmospheric pressure, converting directly to carbon dioxide gas."
      }
    ]
  },
  {
    "slug": "class-9-science-is-matter-pure",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Is Matter Around Us Pure",
    "intro": "Pure substances have fixed physical and chemical properties, while mixtures are combinations of two or more substances that retain individual properties. This chapter explores classification, separation techniques, and properties of pure substances versus mixtures.",
    "sections": [
      {
        "heading": "Classification of Matter",
        "points": [
          "Pure substances: elements (atoms of one type) and compounds (chemically bonded atoms)",
          "Mixtures: homogeneous (uniform composition) and heterogeneous (visible different components)"
        ]
      },
      {
        "heading": "Elements vs Compounds",
        "points": [
          "Elements: made of only one type of atom, cannot be decomposed by chemical methods",
          "Compounds: made of two or more elements in fixed ratio, have different properties from constituent elements",
          "Compounds can be decomposed into elements by chemical reactions"
        ]
      },
      {
        "heading": "Solutions and Colloids",
        "points": [
          "Solutions: homogeneous mixtures with particles <1 nm, solute dissolved uniformly",
          "Colloids: heterogeneous mixtures with particles 1-1000 nm, show Tyndall effect",
          "Suspensions: heterogeneous mixtures with particles >1000 nm, particles visible and settle over time"
        ]
      },
      {
        "heading": "Separation Techniques",
        "points": [
          "Filtration: separates insoluble particles from liquid",
          "Evaporation: obtains dissolved solid from solution",
          "Distillation: separates miscible liquids by boiling point difference",
          "Chromatography: separates components based on solubility and motion",
          "Magnetic separation: uses magnetic properties to separate components"
        ]
      },
      {
        "heading": "Properties of Mixtures vs Pure Substances",
        "points": [
          "Pure substances: fixed melting and boiling points, uniform composition, definite properties",
          "Mixtures: no fixed melting/boiling points, variable composition, variable properties"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Pure Substance",
        "meaning": "Matter with definite composition and fixed physical/chemical properties"
      },
      {
        "term": "Mixture",
        "meaning": "Combination of two or more substances that retain individual properties"
      },
      {
        "term": "Homogeneous Mixture",
        "meaning": "Mixture with uniform composition throughout"
      },
      {
        "term": "Heterogeneous Mixture",
        "meaning": "Mixture with visibly different components"
      },
      {
        "term": "Tyndall Effect",
        "meaning": "Scattering of light by colloidal particles"
      },
      {
        "term": "Solvent",
        "meaning": "Component present in larger amount in a solution"
      },
      {
        "term": "Solute",
        "meaning": "Component dissolved in solvent in a solution"
      }
    ],
    "faqs": [
      {
        "q": "Is air a mixture or a pure substance?",
        "a": "Air is a homogeneous mixture of nitrogen, oxygen, and other gases in variable composition."
      },
      {
        "q": "Why does salt water boil at a higher temperature than pure water?",
        "a": "Salt dissolved in water is a mixture with no fixed boiling point; the added solute raises the boiling point above 100°C."
      },
      {
        "q": "How does distillation separate two liquids?",
        "a": "Distillation heats the mixture to boil the liquid with lower boiling point first, condenses its vapor, and separates it from the remaining liquid."
      }
    ]
  },
  {
    "slug": "class-9-science-atoms-molecules",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Atoms and Molecules",
    "intro": "Atoms are the smallest units of an element that retain its properties, while molecules are combinations of atoms bonded together. Understanding atomic and molecular structures is fundamental to chemistry.",
    "sections": [
      {
        "heading": "Atoms and Symbols",
        "points": [
          "Atom: smallest unit of an element, indivisible in chemical reactions",
          "Element symbols: one or two letter abbreviations (H, C, Fe, Cl)",
          "Relative atomic mass: compared to 1/12th mass of carbon-12 atom"
        ]
      },
      {
        "heading": "Molecules and Molecular Mass",
        "points": [
          "Molecule: group of atoms bonded together; smallest unit of a compound or element",
          "Molecular mass: sum of atomic masses of all atoms in molecule",
          "Diatomic molecules: O2, N2, Cl2, H2 (two atoms of same element)",
          "Polyatomic molecules: CO2, H2O, NH3 (combinations of different elements)"
        ]
      },
      {
        "heading": "Law of Constant Proportions",
        "points": [
          "In a compound, elements are always present in same ratio by mass",
          "Example: water always has 2 parts hydrogen to 16 parts oxygen by mass",
          "This law explains why compounds have fixed compositions and properties"
        ]
      },
      {
        "heading": "Valency and Chemical Formulae",
        "points": [
          "Valency: number of electrons lost, gained, or shared by an atom",
          "Chemical formula: represents atoms in a molecule using element symbols and numbers",
          "Ionic compounds: formed by transfer of electrons between atoms",
          "Covalent compounds: formed by sharing of electrons between atoms"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Atom",
        "meaning": "Smallest indivisible unit of an element"
      },
      {
        "term": "Molecule",
        "meaning": "Group of atoms chemically bonded together"
      },
      {
        "term": "Valency",
        "meaning": "Capacity of an atom to combine with other atoms"
      },
      {
        "term": "Relative Atomic Mass",
        "meaning": "Mass of atom compared to 1/12th of carbon-12"
      },
      {
        "term": "Ion",
        "meaning": "Charged atom or group of atoms with lost or gained electrons"
      },
      {
        "term": "Molar Mass",
        "meaning": "Mass of one mole of a substance in grams"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between an atom and a molecule?",
        "a": "An atom is the smallest unit of an element; a molecule is a group of atoms chemically bonded together."
      },
      {
        "q": "Why do different compounds have different properties even if made of the same elements?",
        "a": "Different compounds have different atomic arrangements and bonding patterns, resulting in different properties."
      },
      {
        "q": "How is chemical formula written?",
        "a": "Chemical formula uses element symbols with subscript numbers showing the number of each atom in the molecule."
      }
    ]
  },
  {
    "slug": "class-9-science-structure-atom",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Structure of the Atom",
    "intro": "Atoms contain subatomic particles—electrons, protons, and neutrons—arranged in a nucleus and electron shells with specific arrangements. Understanding atomic structure explains chemical behavior and properties.",
    "sections": [
      {
        "heading": "Discovery of Subatomic Particles",
        "points": [
          "Electrons: discovered by J.J. Thomson, negative charge, found in shells",
          "Protons: discovered by Rutherford, positive charge, located in nucleus",
          "Neutrons: discovered by Chadwick, neutral charge, located in nucleus"
        ]
      },
      {
        "heading": "Atomic Models",
        "points": [
          "Thomson's model: plum pudding model with electrons embedded in positive sphere",
          "Rutherford's model: nucleus contains protons, electrons orbit in empty space",
          "Bohr's model: electrons in fixed orbits with specific energy levels, no intermediate energies possible"
        ]
      },
      {
        "heading": "Nucleus and Atomic Structure",
        "points": [
          "Nucleus: dense center containing protons and neutrons",
          "Atomic number (Z): number of protons in nucleus, determines element identity",
          "Mass number (A): total protons plus neutrons",
          "Isotopes: atoms of same element with different neutron numbers"
        ]
      },
      {
        "heading": "Electron Distribution",
        "points": [
          "Electrons occupy shells (K, L, M, N) with maximum electrons: 2n²",
          "K shell: 2 electrons max, L shell: 8 electrons max, M shell: 18 electrons max",
          "Valence electrons: outermost shell electrons, determine chemical bonding behavior"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Nucleus",
        "meaning": "Central part of atom containing protons and neutrons"
      },
      {
        "term": "Atomic Number",
        "meaning": "Number of protons in an atom's nucleus"
      },
      {
        "term": "Mass Number",
        "meaning": "Total number of protons and neutrons in nucleus"
      },
      {
        "term": "Isotope",
        "meaning": "Atoms of same element with different number of neutrons"
      },
      {
        "term": "Valence Electrons",
        "meaning": "Electrons in the outermost shell of an atom"
      },
      {
        "term": "Electron Shell",
        "meaning": "Region around nucleus where electrons are found at specific energy levels"
      }
    ],
    "faqs": [
      {
        "q": "Why does Bohr's model explain the line spectra of hydrogen better than Rutherford's?",
        "a": "Bohr's model assigns electrons to specific energy levels; transitions between levels produce characteristic frequencies of light."
      },
      {
        "q": "How are isotopes of an element different?",
        "a": "Isotopes have same number of protons but different number of neutrons, resulting in different mass numbers."
      },
      {
        "q": "What determines the chemical properties of an element?",
        "a": "The number of valence electrons (outermost shell electrons) determines an element's chemical properties and bonding behavior."
      }
    ]
  },
  {
    "slug": "class-9-science-fundamental-unit-life",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "The Fundamental Unit of Life",
    "intro": "The cell is the smallest unit of life capable of independent existence and reproduction. All organisms are composed of one or more cells, and understanding cell structure and function is crucial to studying biology.",
    "sections": [
      {
        "heading": "Cell Theory",
        "points": [
          "All living organisms are composed of cells",
          "Cell is the basic unit of life",
          "All cells arise from pre-existing cells through division"
        ]
      },
      {
        "heading": "Prokaryotic vs Eukaryotic Cells",
        "points": [
          "Prokaryotic: no true nucleus, DNA in nucleoid region, found in bacteria and archaea",
          "Eukaryotic: true nucleus containing DNA, membrane-bound organelles, found in animals and plants"
        ]
      },
      {
        "heading": "Cell Membrane and Nucleus",
        "points": [
          "Cell membrane: semi-permeable, controls entry and exit of substances, selective permeability",
          "Nucleus: contains DNA, controls cell activities, surrounded by nuclear envelope with pores",
          "Nucleolus: produces ribosomes within nucleus"
        ]
      },
      {
        "heading": "Cytoplasm and Organelles",
        "points": [
          "Cytoplasm: gel-like substance containing organelles, site of metabolic reactions",
          "Mitochondria: powerhouse of cell, produces ATP through aerobic respiration",
          "Endoplasmic reticulum: rough (with ribosomes) for protein synthesis, smooth for lipid synthesis",
          "Golgi apparatus: modifies and packages proteins",
          "Lysosomes: contain digestive enzymes, break down waste materials"
        ]
      },
      {
        "heading": "Plant Cell-Specific Organelles",
        "points": [
          "Chloroplast: site of photosynthesis, contains chlorophyll",
          "Cell wall: rigid, outside cell membrane, provides structure and support",
          "Vacuole: large central vacuole stores water and maintains turgor pressure"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Cell",
        "meaning": "Smallest unit of life, basic structural and functional unit of all organisms"
      },
      {
        "term": "Organelle",
        "meaning": "Membrane-bound structure within cell performing specific functions"
      },
      {
        "term": "Mitochondria",
        "meaning": "Organelle producing energy in form of ATP"
      },
      {
        "term": "Chloroplast",
        "meaning": "Organelle in plant cells containing chlorophyll for photosynthesis"
      },
      {
        "term": "Ribosome",
        "meaning": "Site of protein synthesis in cytoplasm"
      }
    ],
    "faqs": [
      {
        "q": "Why is the cell membrane called semi-permeable?",
        "a": "The cell membrane selectively allows some substances to pass while blocking others, maintaining cell composition."
      },
      {
        "q": "What is the main function of mitochondria?",
        "a": "Mitochondria produce ATP through aerobic respiration, providing energy for cellular activities."
      },
      {
        "q": "Why do plant cells have chloroplasts but animal cells do not?",
        "a": "Plant cells are autotrophic and need chloroplasts for photosynthesis, while animal cells are heterotrophic."
      }
    ]
  },
  {
    "slug": "class-9-science-force-laws-motion",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Force and Laws of Motion",
    "intro": "Force is a push or pull that can change an object's motion or shape. Newton's laws of motion explain how objects move and interact, forming the foundation of classical mechanics.",
    "sections": [
      {
        "heading": "Newton's First Law of Motion",
        "points": [
          "Object in motion stays in motion; object at rest stays at rest unless acted upon by external force",
          "This law defines inertia: resistance of object to change in motion",
          "Inertia depends on mass: greater mass means greater inertia"
        ]
      },
      {
        "heading": "Newton's Second Law of Motion",
        "points": [
          "Force = mass × acceleration (F = ma)",
          "Acceleration is directly proportional to force and inversely proportional to mass",
          "Direction of acceleration is same as direction of applied force"
        ]
      },
      {
        "heading": "Newton's Third Law of Motion",
        "points": [
          "Every action has equal and opposite reaction",
          "Forces always occur in pairs acting on different bodies",
          "Action-reaction forces are equal in magnitude but opposite in direction"
        ]
      },
      {
        "heading": "Types of Forces",
        "points": [
          "Contact forces: friction, normal force, tension, applied force (require direct contact)",
          "Non-contact forces: gravitational, magnetic, electrostatic (act without direct contact)",
          "Friction: opposes motion, depends on surface roughness and normal force"
        ]
      },
      {
        "heading": "Momentum and Impulse",
        "points": [
          "Momentum: p = mv (mass × velocity), vector quantity",
          "Impulse: F × t = change in momentum",
          "Law of conservation of momentum: total momentum before = total momentum after collision"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Force",
        "meaning": "Push or pull that can change motion or shape of object"
      },
      {
        "term": "Inertia",
        "meaning": "Resistance of object to change in its state of motion"
      },
      {
        "term": "Momentum",
        "meaning": "Product of mass and velocity of an object"
      },
      {
        "term": "Friction",
        "meaning": "Force opposing relative motion between two surfaces"
      },
      {
        "term": "Impulse",
        "meaning": "Product of force and time duration of force application"
      }
    ],
    "faqs": [
      {
        "q": "Why does a seatbelt prevent injury during sudden braking?",
        "a": "Seatbelt applies force to change momentum gradually, reducing the rate of change of velocity (acceleration) and thus injury risk."
      },
      {
        "q": "What is the difference between mass and weight?",
        "a": "Mass is amount of matter (constant), weight is gravitational force on mass (W = mg, varies with gravity)."
      },
      {
        "q": "In a collision between two balls, why do both experience the same force if they have different masses?",
        "a": "By Newton's third law, forces are equal and opposite; different masses result in different accelerations."
      }
    ]
  },
  {
    "slug": "class-9-science-work-energy",
    "classLevel": "Class 9",
    "subject": "Science",
    "chapter": "Work and Energy",
    "intro": "Work is done when force causes displacement in its direction. Energy is capacity to do work, and understanding energy conservation and transformation is key to understanding physical phenomena.",
    "sections": [
      {
        "heading": "Work and Power",
        "points": [
          "Work = Force × Displacement × cos(θ), where θ is angle between force and displacement",
          "Work done is zero if force is perpendicular to displacement",
          "Power = Work/Time, measured in watts (W)",
          "1 watt = 1 joule per second"
        ]
      },
      {
        "heading": "Kinetic and Potential Energy",
        "points": [
          "Kinetic energy: KE = 1/2 mv², energy of motion",
          "Potential energy: PE = mgh, energy of position relative to reference point",
          "Elastic potential energy stored in springs: PE = 1/2 kx²"
        ]
      },
      {
        "heading": "Law of Conservation of Energy",
        "points": [
          "Total mechanical energy (KE + PE) remains constant in isolated systems",
          "Energy cannot be created or destroyed, only transformed",
          "At highest point of motion, all energy is potential; at lowest point, mostly kinetic"
        ]
      },
      {
        "heading": "Energy Transformations",
        "points": [
          "Falling object: PE converts to KE, total energy constant",
          "Bouncing ball: KE converts to PE on impact, some lost as heat/sound",
          "Pendulum: oscillates between maximum PE and maximum KE at lowest point"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Work",
        "meaning": "Force applied over distance in direction of force (unit: joule)"
      },
      {
        "term": "Energy",
        "meaning": "Capacity to do work"
      },
      {
        "term": "Kinetic Energy",
        "meaning": "Energy due to motion of object"
      },
      {
        "term": "Potential Energy",
        "meaning": "Energy due to position or configuration of object"
      },
      {
        "term": "Power",
        "meaning": "Rate of doing work (unit: watt)"
      }
    ],
    "faqs": [
      {
        "q": "Can work be negative?",
        "a": "Yes, when force opposes displacement (angle > 90°), work is negative, reducing object's energy."
      },
      {
        "q": "Why is energy conserved but work can vary?",
        "a": "Energy is conserved in total, but work done by different forces varies; sum of work equals change in kinetic energy."
      },
      {
        "q": "What happens to mechanical energy when friction acts?",
        "a": "Friction converts mechanical energy to heat; total energy is conserved but mechanical energy decreases."
      }
    ]
  },
  {
    "slug": "class-10-maths-pair-linear-equations",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Pair of Linear Equations in Two Variables",
    "intro": "Pairs of linear equations can be solved using multiple methods to find values of two unknowns. Understanding graphical and algebraic methods helps solve real-world problems.",
    "sections": [
      {
        "heading": "Representation of Linear Equations",
        "points": [
          "Linear equation: ax + by + c = 0 where a, b, c are constants and a, b not both zero",
          "General form: a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0",
          "Graphically: straight line on coordinate plane"
        ]
      },
      {
        "heading": "Types of Solutions",
        "points": [
          "Unique solution: lines intersect at one point when a1/a2 ≠ b1/b2 (consistent and independent)",
          "Infinite solutions: coincident lines when a1/a2 = b1/b2 = c1/c2 (consistent and dependent)",
          "No solution: parallel lines when a1/a2 = b1/b2 but ≠ c1/c2 (inconsistent)"
        ]
      },
      {
        "heading": "Algebraic Methods of Solution",
        "points": [
          "Substitution method: express one variable in terms of other, substitute in second equation",
          "Elimination method: make coefficients equal, add or subtract to eliminate variable",
          "Cross-multiplication method: uses formula for quick solution"
        ]
      },
      {
        "heading": "Graphical Method",
        "points": [
          "Plot both lines on coordinate plane",
          "Point of intersection gives solution",
          "Parallel lines indicate no solution, coincident lines indicate infinite solutions"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Linear Equation",
        "meaning": "Equation of degree 1 with variables, graph is straight line"
      },
      {
        "term": "Consistent Equations",
        "meaning": "System with at least one solution"
      },
      {
        "term": "Inconsistent Equations",
        "meaning": "System with no solution"
      },
      {
        "term": "Dependent Equations",
        "meaning": "Equations representing same line (infinite solutions)"
      },
      {
        "term": "Independent Equations",
        "meaning": "Equations representing different lines"
      }
    ],
    "faqs": [
      {
        "q": "How do you determine if a system has unique, infinite, or no solution without solving?",
        "a": "Check ratios: a1/a2 ≠ b1/b2 (unique), a1/a2 = b1/b2 = c1/c2 (infinite), a1/a2 = b1/b2 ≠ c1/c2 (no solution)."
      },
      {
        "q": "When should you use elimination method vs substitution method?",
        "a": "Use elimination when coefficients align easily; use substitution when one variable has coefficient 1."
      },
      {
        "q": "Can a pair of linear equations have exactly two solutions?",
        "a": "No, a pair of linear equations can have either unique solution, infinite solutions, or no solution."
      }
    ]
  },
  {
    "slug": "class-10-maths-introduction-trigonometry",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Introduction to Trigonometry",
    "intro": "Trigonometry studies relationships between angles and sides of triangles. Sine, cosine, and tangent ratios are fundamental tools for solving problems involving angles and distances.",
    "sections": [
      {
        "heading": "Trigonometric Ratios",
        "points": [
          "sin θ = opposite/hypotenuse",
          "cos θ = adjacent/hypotenuse",
          "tan θ = opposite/adjacent = sin θ / cos θ",
          "cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ"
        ]
      },
      {
        "heading": "Trigonometric Values for Standard Angles",
        "points": [
          "sin 0° = 0, cos 0° = 1, tan 0° = 0",
          "sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3",
          "sin 45° = 1/√2, cos 45° = 1/√2, tan 45° = 1",
          "sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3",
          "sin 90° = 1, cos 90° = 0, tan 90° = undefined"
        ]
      },
      {
        "heading": "Trigonometric Identities",
        "points": [
          "sin² θ + cos² θ = 1 (Pythagorean identity)",
          "sec² θ - tan² θ = 1",
          "cosec² θ - cot² θ = 1",
          "sin(90° - θ) = cos θ, cos(90° - θ) = sin θ, tan(90° - θ) = cot θ"
        ]
      },
      {
        "heading": "Applications of Trigonometry",
        "points": [
          "Angle of elevation: angle above horizontal when looking up",
          "Angle of depression: angle below horizontal when looking down",
          "Solving real-world problems involving heights, distances, and angles"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Trigonometry",
        "meaning": "Study of relationships between angles and sides of triangles"
      },
      {
        "term": "Sine",
        "meaning": "Ratio of opposite side to hypotenuse"
      },
      {
        "term": "Cosine",
        "meaning": "Ratio of adjacent side to hypotenuse"
      },
      {
        "term": "Tangent",
        "meaning": "Ratio of opposite side to adjacent side"
      },
      {
        "term": "Angle of Elevation",
        "meaning": "Angle above horizontal when looking upward"
      }
    ],
    "faqs": [
      {
        "q": "What is sin 30°?",
        "a": "sin 30° = 1/2 or 0.5."
      },
      {
        "q": "How do you remember trigonometric ratios?",
        "a": "Use mnemonic SOH-CAH-TOA: Sin=Opposite/Hypotenuse, Cos=Adjacent/Hypotenuse, Tan=Opposite/Adjacent."
      },
      {
        "q": "If sin θ = 3/5, what is cos θ?",
        "a": "Using sin² θ + cos² θ = 1: cos² θ = 1 - (3/5)² = 1 - 9/25 = 16/25, so cos θ = 4/5."
      }
    ]
  },
  {
    "slug": "class-10-maths-surface-areas-volumes",
    "classLevel": "Class 10",
    "subject": "Mathematics",
    "chapter": "Surface Areas and Volumes",
    "intro": "Surface area and volume are measurements of 3D shapes essential for solving practical problems. Understanding formulas for various shapes enables calculating space and material requirements.",
    "sections": [
      {
        "heading": "Surface Area Formulas",
        "points": [
          "Cube: SA = 6a² where a is side length",
          "Rectangular prism: SA = 2(lw + wh + lh)",
          "Sphere: SA = 4πr²",
          "Cylinder: SA = 2πr² + 2πrh",
          "Cone: SA = πr² + πrl where l is slant height"
        ]
      },
      {
        "heading": "Volume Formulas",
        "points": [
          "Cube: V = a³",
          "Rectangular prism: V = l × w × h",
          "Sphere: V = 4/3 πr³",
          "Cylinder: V = πr²h",
          "Cone: V = 1/3 πr²h"
        ]
      },
      {
        "heading": "Hemisphere and Combination Shapes",
        "points": [
          "Hemisphere surface area: 3πr² (curved surface + flat base)",
          "Hemisphere volume: 2/3 πr³",
          "Combined shapes: break into component parts and add volumes/areas"
        ]
      },
      {
        "heading": "Applications and Problem Solving",
        "points": [
          "Conversion between units (cm³ to liters, etc.)",
          "Calculating material needed for construction",
          "Finding dimensions from given surface area or volume",
          "Problems involving composite figures made of multiple shapes"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Surface Area",
        "meaning": "Total area of all surfaces of 3D shape"
      },
      {
        "term": "Volume",
        "meaning": "Space occupied by 3D shape"
      },
      {
        "term": "Lateral Surface Area",
        "meaning": "Area of curved/side surfaces excluding bases"
      },
      {
        "term": "Slant Height",
        "meaning": "Distance from apex to base edge along surface of cone/pyramid"
      },
      {
        "term": "Hemisphere",
        "meaning": "Half of a sphere"
      }
    ],
    "faqs": [
      {
        "q": "What is the volume of sphere with radius 3 cm?",
        "a": "Using V = 4/3 πr³: V = 4/3 π(3)³ = 4/3 π × 27 = 36π cm³ ≈ 113.1 cm³."
      },
      {
        "q": "How do you find slant height of cone if radius and height are known?",
        "a": "Using Pythagorean theorem: l = √(r² + h²)."
      },
      {
        "q": "What is the difference between surface area and volume?",
        "a": "Surface area measures area of all surfaces (square units); volume measures space inside (cubic units)."
      }
    ]
  }
];

export const RN_SUBJECTS = (): string[] => [...new Set(REVISION_NOTES.map((r) => `${r.classLevel} ${r.subject}`))];
export function getRevisionNote(slug: string): RevisionNote | undefined {
  return REVISION_NOTES.find((r) => r.slug === slug);
}
