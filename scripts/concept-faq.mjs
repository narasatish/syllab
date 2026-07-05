/**
 * concept-faq.mjs — curated, factual FAQs for high-value /concepts/* pages.
 *
 * The concept dataset ships ~150-char intros (thin), so pages like
 * corrosion-and-rancidity stall at position 9 despite 2k+ impressions. GSC
 * (2026-07) shows users asking exact question forms ("what is / define / explain
 * / difference between corrosion and rancidity"). We attach a factual FAQ to the
 * striking-distance concept pages so they're substantive and can win the snippet.
 * Concept pages are already indexed — this is deepening only, not re-indexing.
 *
 * Consumed in generate-prerender.mjs: FAQs are merged onto the concept objects so
 * conceptBody() renders them and the generic FAQPage-schema step picks them up.
 * Keys MUST match concept slugs. Answers are textbook-factual — no fabrication.
 */
export const CONCEPT_FAQ = {
  'corrosion-and-rancidity': [
    { q: 'What is corrosion and rancidity?', a: 'Corrosion is the slow eating away of a metal when it reacts with moisture and gases such as oxygen in the air — for example, iron rusting. Rancidity is the spoiling of fats and oils in food when they are oxidised by air, giving a bad smell and taste.' },
    { q: 'What is the difference between corrosion and rancidity?', a: 'Both are oxidation reactions, but corrosion happens to metals (rusting of iron, black coating on silver) while rancidity happens to fatty and oily foods. Corrosion damages metal objects; rancidity spoils food.' },
    { q: 'How can corrosion and rancidity be prevented?', a: 'Corrosion is prevented by painting, oiling, greasing, galvanising (a zinc coating) or using alloys like stainless steel. Rancidity is prevented by adding antioxidants, flushing packets with nitrogen gas, refrigeration and airtight packing.' },
    { q: 'Give examples of corrosion and rancidity.', a: 'Corrosion: rusting of iron gates, green coating on copper, tarnishing of silver. Rancidity: the bad smell of old butter, cooking oil or fried snacks left open.' },
  ],
  'acids-bases-ph-daily-life': [
    { q: 'What are examples of acids and bases in daily life?', a: 'Acids: lemon and citrus fruits (citric acid), vinegar (acetic acid), curd (lactic acid), tamarind. Bases: soap, baking soda, lime water, antacids and toothpaste.' },
    { q: 'Why is pH important in daily life?', a: 'Living things and many products work only in a certain pH range. Tooth decay begins when the mouth’s pH falls below 5.5; soil needs the right pH for crops; and our blood must stay close to pH 7.4.' },
    { q: 'How do antacids work?', a: 'Antacids are mild bases (such as magnesium hydroxide) that neutralise the excess hydrochloric acid in the stomach, relieving indigestion and acidity.' },
  ],
  'ohmic-non-ohmic-conductors': [
    { q: 'What is the difference between ohmic and non-ohmic conductors?', a: 'Ohmic conductors obey Ohm’s law — current is directly proportional to voltage and the V–I graph is a straight line (e.g. metals like copper). Non-ohmic conductors do not obey Ohm’s law and their V–I graph is not a straight line (e.g. a diode or a filament bulb).' },
    { q: 'Give examples of ohmic and non-ohmic conductors.', a: 'Ohmic: copper wire and most metallic conductors at constant temperature. Non-ohmic: a semiconductor diode, LED, filament lamp and transistor.' },
    { q: 'What does the V–I graph look like for each?', a: 'For an ohmic conductor the graph of voltage against current is a straight line through the origin. For a non-ohmic conductor the graph is curved or non-linear.' },
  ],
  'power-of-a-lens': [
    { q: 'What is the power of a lens?', a: 'The power of a lens is its ability to converge or diverge light. It is the reciprocal of the focal length measured in metres: P = 1/f.' },
    { q: 'What is the unit of power of a lens?', a: 'The SI unit is the dioptre (D), where 1 D = 1 m⁻¹. A lens with a focal length of 1 metre has a power of 1 dioptre.' },
    { q: 'Is the power of a convex lens positive or negative?', a: 'A convex (converging) lens has positive power; a concave (diverging) lens has negative power.' },
  ],
  'fuse-earthing': [
    { q: 'What is the difference between a fuse and earthing?', a: 'A fuse is a safety device — a thin wire that melts and breaks the circuit when too much current flows, preventing fire. Earthing connects the metal body of an appliance to the ground so that any leaking current flows safely to earth, preventing electric shock.' },
    { q: 'Why is earthing important?', a: 'Earthing protects a person from electric shock. If a live wire touches the metal body of an appliance, the current flows to the earth instead of through the person who touches it.' },
    { q: 'What is a fuse made of and why?', a: 'A fuse is made of a wire with a low melting point and high resistance (such as a tin–lead alloy) so that it melts quickly and breaks the circuit when the current exceeds a safe value.' },
  ],
  'refraction-through-a-prism': [
    { q: 'What happens when light passes through a prism?', a: 'Light bends (refracts) twice — on entering and on leaving the prism — and bends towards the base. White light also splits into its seven colours, an effect called dispersion.' },
    { q: 'What is the angle of deviation in a prism?', a: 'The angle of deviation is the angle between the direction of the incident ray and the emergent ray. It depends on the prism’s angle, its material and the angle of incidence.' },
    { q: 'Why does a prism split white light into colours?', a: 'Different colours bend by different amounts (violet bends most, red least) because they travel at slightly different speeds in glass. This spreading of colours is called dispersion.' },
  ],
  'reflection-of-sound-echo': [
    { q: 'What is an echo?', a: 'An echo is the sound heard again after it reflects off a hard surface such as a wall or hill and returns to the listener a short time after the original sound.' },
    { q: 'What is the minimum distance needed to hear an echo?', a: 'To hear a distinct echo the reflecting surface must be at least about 17 metres away, so the reflected sound returns after at least 0.1 second (the persistence of hearing).' },
    { q: 'What is the difference between an echo and reverberation?', a: 'An echo is a single, clearly separated repetition of sound. Reverberation is the persistence of sound caused by repeated reflections in a closed space such as a large hall, heard as a prolonged blur rather than a distinct repeat.' },
  ],
};
