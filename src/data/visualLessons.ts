/**
 * visualLessons.ts — step-through "explain it visually" diagrams.
 * Each lesson is a sequence of self-contained SVG frames (progressive reveal),
 * authored to be accurate, clearly labelled and mobile-friendly (viewBox 0 0 400 300).
 * Rendered by components/AnimatedDiagram.tsx on the /visual-learning pages.
 */

export interface VisualStep { caption: string; svg: string; }
export interface VisualLesson {
  slug: string;
  title: string;
  subject: string;
  classLevel: string;
  intro: string;
  whyItMatters: string;
  practice?: { label: string; tab: string };
  steps: VisualStep[];
}

const FRAME = (inner: string) =>
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,Segoe UI,Roboto,sans-serif">${inner}</svg>`;
const sky = '<rect x="0" y="0" width="400" height="300" rx="14" fill="#eff6ff"/>';
const label = (x: number, y: number, t: string, c = '#0f172a', size = 13) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="800" fill="${c}" text-anchor="middle">${t}</text>`;

export const VISUAL_LESSONS: VisualLesson[] = [
  {
    slug: 'water-cycle',
    title: 'The Water Cycle',
    subject: 'Science',
    classLevel: 'Class 6–9',
    intro: 'Watch how water moves between the earth and the sky — evaporation, condensation, precipitation and collection — one step at a time.',
    whyItMatters: 'The water cycle explains rain, rivers and why fresh water never runs out — a guaranteed exam favourite and the basis of weather and the monsoon.',
    practice: { label: 'Practice Water Cycle questions', tab: 'arena' },
    steps: [
      {
        caption: 'The Sun heats water in oceans, rivers and lakes. The water turns into invisible water vapour and rises — this is EVAPORATION.',
        svg: FRAME(`${sky}<circle cx="60" cy="55" r="26" fill="#fbbf24"/>${label(60,60,'Sun','#78350f',12)}<path d="M0 235 H400 V300 H0 Z" fill="#3b82f6"/><path d="M0 235 q100 -14 200 0 t200 0 V300 H0 Z" fill="#60a5fa"/>${[140,180,220,260].map((x)=>`<path d="M${x} 232 q4 -34 8 0" stroke="#0ea5e9" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M${x+2} 200 l4 0" stroke="#0ea5e9" stroke-width="3"/>`).join('')}${label(200,180,'Evaporation ↑','#0369a1',14)}`),
      },
      {
        caption: 'High in the cooler sky, the vapour cools and turns back into tiny water droplets that gather into clouds — this is CONDENSATION.',
        svg: FRAME(`${sky}<circle cx="60" cy="55" r="24" fill="#fbbf24"/><g fill="#cbd5e1"><ellipse cx="230" cy="80" rx="52" ry="26"/><ellipse cx="195" cy="92" rx="34" ry="22"/><ellipse cx="270" cy="92" rx="34" ry="22"/></g>${label(230,86,'Cloud','#475569',12)}${label(230,140,'Condensation','#475569',14)}<path d="M0 235 H400 V300 H0 Z" fill="#3b82f6"/><path d="M0 235 q100 -14 200 0 t200 0 V300 H0 Z" fill="#60a5fa"/>${[150,185,220].map((x)=>`<path d="M${x} 150 q3 18 0 30" stroke="#94a3b8" stroke-width="3" fill="none" stroke-dasharray="2 5"/>`).join('')}`),
      },
      {
        caption: 'When the droplets grow heavy, they fall as rain, snow or hail — this is PRECIPITATION.',
        svg: FRAME(`${sky}<g fill="#94a3b8"><ellipse cx="210" cy="80" rx="58" ry="28"/><ellipse cx="172" cy="94" rx="36" ry="24"/><ellipse cx="252" cy="94" rx="36" ry="24"/></g>${[150,180,210,240,270].map((x,i)=>`<line x1="${x}" y1="118" x2="${x-8}" y2="${150+ (i%2)*16}" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>`).join('')}${label(210,180,'Precipitation (Rain) ↓','#1d4ed8',14)}<path d="M0 235 H400 V300 H0 Z" fill="#3b82f6"/><path d="M0 235 q100 -14 200 0 t200 0 V300 H0 Z" fill="#60a5fa"/>`),
      },
      {
        caption: 'Rain water flows over land into rivers and back to the sea (COLLECTION). Then the Sun heats it again — and the cycle repeats forever.',
        svg: FRAME(`${sky}<circle cx="60" cy="50" r="22" fill="#fbbf24"/><g fill="#94a3b8"><ellipse cx="210" cy="70" rx="50" ry="24"/></g>${[170,200,230].map((x)=>`<line x1="${x}" y1="92" x2="${x-6}" y2="115" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>`).join('')}<path d="M300 150 q-40 30 -120 60" stroke="#38bdf8" stroke-width="10" fill="none" stroke-linecap="round"/>${label(300,140,'River','#0369a1',12)}<path d="M0 235 H400 V300 H0 Z" fill="#3b82f6"/><path d="M0 235 q100 -14 200 0 t200 0 V300 H0 Z" fill="#60a5fa"/>${label(110,270,'Collection','#ffffff',13)}<path d="M40 215 q12 -22 24 0" stroke="#0ea5e9" stroke-width="3" fill="none"/>${label(70,200,'↑','#0369a1',16)}`),
      },
    ],
  },
  {
    slug: 'photosynthesis',
    title: 'Photosynthesis',
    subject: 'Biology',
    classLevel: 'Class 7–10',
    intro: 'See exactly how a green leaf turns sunlight, water and carbon dioxide into food and oxygen.',
    whyItMatters: 'Photosynthesis is how almost all food and oxygen on Earth is made. Its equation and the role of chlorophyll are asked in every board exam.',
    practice: { label: 'Practice Photosynthesis questions', tab: 'arena' },
    steps: [
      {
        caption: 'Sunlight falls on the green leaf. The green pigment CHLOROPHYLL traps this light energy.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><circle cx="64" cy="56" r="26" fill="#fbbf24"/>${[100,130,160].map((x)=>`<line x1="${x}" y1="56" x2="${x+34}" y2="120" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>`).join('')}<ellipse cx="230" cy="150" rx="95" ry="55" fill="#22c55e"/><path d="M135 150 H325" stroke="#15803d" stroke-width="3"/>${label(230,150,'Leaf (chlorophyll)','#064e3b',13)}`),
      },
      {
        caption: 'Roots absorb WATER (H₂O) from the soil and tiny pores (stomata) take in CARBON DIOXIDE (CO₂) from the air.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><ellipse cx="210" cy="120" rx="90" ry="48" fill="#22c55e"/>${label(120,110,'CO₂ →','#0f766e',14)}<line x1="210" y1="168" x2="210" y2="250" stroke="#15803d" stroke-width="8"/><path d="M210 250 q-30 20 -50 36 M210 250 q30 20 50 36" stroke="#92400e" stroke-width="5" fill="none"/>${label(210,290,'Water (H₂O) ↑ from roots','#1d4ed8',13)}`),
      },
      {
        caption: 'Inside the chloroplasts, light energy converts CO₂ + water into GLUCOSE (food) and releases OXYGEN (O₂).',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><ellipse cx="200" cy="140" rx="110" ry="60" fill="#16a34a"/>${label(200,135,'GLUCOSE made','#ffffff',15)}${label(200,160,'(stored as food)','#dcfce7',11)}${[150,200,250].map((x)=>`<path d="M${x} 78 q4 -24 8 0" stroke="#0ea5e9" stroke-width="3" fill="none"/>`).join('')}${label(200,60,'Oxygen (O₂) released ↑','#0369a1',14)}`),
      },
      {
        caption: 'The whole process in one line: 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#ecfdf5"/><rect x="30" y="120" width="340" height="70" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>${label(200,150,'6CO₂ + 6H₂O','#0f172a',15)}${label(200,172,'→ C₆H₁₂O₆ + 6O₂','#16a34a',15)}${label(200,95,'☀️ in presence of sunlight + chlorophyll','#475569',12)}`),
      },
    ],
  },
  {
    slug: 'human-heart-blood-flow',
    title: 'The Human Heart & Blood Flow',
    subject: 'Biology',
    classLevel: 'Class 7–10',
    intro: 'Follow a drop of blood through the four chambers of the heart and understand double circulation.',
    whyItMatters: 'How blood flows through the heart, lungs and body (double circulation) is one of the most-asked diagrams in biology board exams.',
    practice: { label: 'Practice Circulatory System questions', tab: 'arena' },
    steps: [
      {
        caption: 'Deoxygenated (blue) blood from the body enters the RIGHT ATRIUM, then the RIGHT VENTRICLE.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><rect x="150" y="60" width="60" height="70" rx="12" fill="#60a5fa"/><rect x="150" y="135" width="60" height="95" rx="12" fill="#3b82f6"/><rect x="215" y="60" width="60" height="70" rx="12" fill="#fecaca"/><rect x="215" y="135" width="60" height="95" rx="12" fill="#fecaca"/>${label(180,100,'RA','#fff',12)}${label(180,185,'RV','#fff',12)}<line x1="120" y1="80" x2="150" y2="80" stroke="#1d4ed8" stroke-width="6" marker-end="url(#a)"/><defs><marker id="a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#1d4ed8"/></marker></defs>${label(95,76,'from body','#1d4ed8',10)}`),
      },
      {
        caption: 'The right ventricle pumps it to the LUNGS, where it picks up oxygen and becomes oxygenated (red) blood.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><rect x="150" y="60" width="60" height="70" rx="12" fill="#93c5fd"/><rect x="150" y="135" width="60" height="95" rx="12" fill="#3b82f6"/><rect x="215" y="60" width="60" height="70" rx="12" fill="#fecaca"/><rect x="215" y="135" width="60" height="95" rx="12" fill="#fecaca"/><ellipse cx="330" cy="120" rx="40" ry="55" fill="#fca5a5"/>${label(330,120,'LUNGS','#7f1d1d',11)}<path d="M180 135 q60 -40 110 -20" stroke="#1d4ed8" stroke-width="5" fill="none"/><path d="M330 175 q-40 40 -120 -30" stroke="#dc2626" stroke-width="5" fill="none"/>${label(250,90,'O₂ in','#b91c1c',10)}`),
      },
      {
        caption: 'Oxygen-rich blood returns to the LEFT ATRIUM → LEFT VENTRICLE, which pumps it powerfully to the whole body. This double loop is "double circulation".',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><rect x="150" y="60" width="60" height="70" rx="12" fill="#bfdbfe"/><rect x="150" y="135" width="60" height="95" rx="12" fill="#93c5fd"/><rect x="215" y="60" width="60" height="70" rx="12" fill="#f87171"/><rect x="215" y="135" width="60" height="95" rx="12" fill="#dc2626"/>${label(245,100,'LA','#fff',12)}${label(245,185,'LV','#fff',12)}<line x1="275" y1="150" x2="320" y2="150" stroke="#b91c1c" stroke-width="7" marker-end="url(#b)"/><defs><marker id="b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#b91c1c"/></marker></defs>${label(345,146,'to body','#b91c1c',10)}`),
      },
    ],
  },
  {
    slug: 'human-digestive-system',
    title: 'The Digestive System',
    subject: 'Biology',
    classLevel: 'Class 7–10',
    intro: 'Trace food on its journey from mouth to absorption, and see where digestion happens at each stop.',
    whyItMatters: 'The path of food and where nutrients are absorbed is core to biology — and helps you understand healthy eating and common digestion problems.',
    practice: { label: 'Practice Digestion questions', tab: 'arena' },
    steps: [
      {
        caption: 'Digestion starts in the MOUTH: teeth break food down and saliva begins digesting starch. Food then travels down the food pipe (oesophagus).',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><circle cx="200" cy="45" r="22" fill="#fca5a5"/>${label(200,49,'Mouth','#7f1d1d',10)}<rect x="190" y="65" width="20" height="80" rx="8" fill="#fdba74"/>${label(255,110,'Oesophagus','#9a3412',11)}`),
      },
      {
        caption: 'In the STOMACH, strong acids and enzymes churn the food into a paste and digest proteins.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><rect x="190" y="55" width="18" height="60" rx="8" fill="#fdba74"/><path d="M170 120 q70 -10 60 60 q-6 40 -50 28 q-30 -8 -10 -45 q14 -25 0 -43Z" fill="#f87171"/>${label(205,150,'Stomach','#7f1d1d',11)}`),
      },
      {
        caption: 'The SMALL INTESTINE is where most digestion finishes and nutrients are ABSORBED into the blood through its long, folded walls.',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><path d="M150 90 q60 -10 60 30 q-6 30 -45 24" fill="#f87171"/><path d="M140 150 q120 0 100 50 q-10 40 -60 40 q-70 0 -60 -50 q6 -34 40 -34 q40 0 36 36 q-2 24 -28 22" fill="none" stroke="#fb923c" stroke-width="10" stroke-linecap="round"/>${label(210,235,'Small intestine','#9a3412',11)}${label(210,255,'(nutrients absorbed)','#9a3412',9)}`),
      },
      {
        caption: 'Undigested waste passes to the LARGE INTESTINE, where water is absorbed, and the rest leaves the body. Journey complete!',
        svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><path d="M150 90 q50 0 50 30" fill="none" stroke="#fb923c" stroke-width="9"/><path d="M120 110 V230 H280 V110" fill="none" stroke="#a16207" stroke-width="16" stroke-linecap="round"/>${label(200,255,'Large intestine (water absorbed)','#713f12',11)}${label(200,150,'water ↑','#1d4ed8',10)}`),
      },
    ],
  },
  {
    slug: 'respiratory-system',
    title: 'The Respiratory System',
    subject: 'Biology',
    classLevel: 'Class 7–10',
    intro: 'See how air travels from your nose to the tiny air sacs in your lungs, and how oxygen reaches your blood.',
    whyItMatters: 'Breathing supplies the oxygen every cell needs to release energy. The path of air and gas exchange in the alveoli are exam essentials.',
    practice: { label: 'Practice Respiration questions', tab: 'arena' },
    steps: [
      { caption: 'Air enters through the NOSE, gets warmed and filtered, then goes down the windpipe (TRACHEA).', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><circle cx="200" cy="50" r="22" fill="#fca5a5"/>${label(200,54,'Nose','#7f1d1d',10)}<rect x="192" y="70" width="16" height="70" rx="6" fill="#93c5fd"/>${label(250,110,'Trachea','#1e40af',11)}`) },
      { caption: 'The trachea splits into two BRONCHI, one into each lung. These branch into smaller tubes ending in tiny air sacs (ALVEOLI).', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><rect x="192" y="40" width="16" height="60" rx="6" fill="#93c5fd"/><path d="M200 100 L150 140 M200 100 L250 140" stroke="#60a5fa" stroke-width="8"/><ellipse cx="135" cy="190" rx="50" ry="70" fill="#fecaca"/><ellipse cx="265" cy="190" rx="50" ry="70" fill="#fecaca"/>${label(135,195,'Lung','#7f1d1d',11)}${label(265,195,'Lung','#7f1d1d',11)}${label(200,150,'Bronchi','#1e40af',10)}`) },
      { caption: 'In the alveoli, OXYGEN passes into the blood and CARBON DIOXIDE passes out to be breathed away. This is gas exchange.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><circle cx="160" cy="150" r="55" fill="#fde68a"/>${label(160,150,'Alveolus','#92400e',11)}<circle cx="280" cy="150" r="40" fill="#fca5a5"/>${label(280,150,'Blood','#7f1d1d',10)}<path d="M210 135 H245" stroke="#dc2626" stroke-width="4" marker-end="url(#o)"/><path d="M245 170 H210" stroke="#1d4ed8" stroke-width="4" marker-end="url(#c)"/><defs><marker id="o" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#dc2626"/></marker><marker id="c" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#1d4ed8"/></marker></defs>${label(228,128,'O₂','#b91c1c',11)}${label(228,188,'CO₂','#1e40af',11)}`) },
    ],
  },
  {
    slug: 'plant-vs-animal-cell',
    title: 'Plant Cell vs Animal Cell',
    subject: 'Biology',
    classLevel: 'Class 8–10',
    intro: 'Build up a cell part by part and spot exactly what makes plant cells different from animal cells.',
    whyItMatters: 'The differences between plant and animal cells (cell wall, chloroplasts, vacuole) are one of the most common 3-mark questions in biology.',
    practice: { label: 'Practice Cell questions', tab: 'arena' },
    steps: [
      { caption: 'An ANIMAL CELL has a flexible cell membrane, jelly-like cytoplasm, and a nucleus that controls the cell.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fdf4ff"/><ellipse cx="200" cy="150" rx="130" ry="95" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/><circle cx="200" cy="150" r="34" fill="#a21caf"/>${label(200,154,'Nucleus','#fff',10)}${label(200,255,'Animal cell','#86198f',12)}${label(110,110,'Membrane','#be185d',9)}`) },
      { caption: 'A PLANT CELL has all that PLUS a rigid CELL WALL outside the membrane, green CHLOROPLASTS for photosynthesis, and a large central VACUOLE.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><rect x="55" y="55" width="290" height="190" rx="14" fill="#bbf7d0" stroke="#15803d" stroke-width="5"/>${label(200,46,'Cell wall','#14532d',10)}<circle cx="155" cy="150" r="28" fill="#a21caf"/>${label(155,154,'Nucleus','#fff',9)}<ellipse cx="255" cy="120" rx="22" ry="12" fill="#16a34a"/><ellipse cx="270" cy="175" rx="22" ry="12" fill="#16a34a"/>${label(262,205,'Chloroplasts','#14532d',9)}<ellipse cx="200" cy="150" rx="80" ry="55" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="4 4"/>${label(200,255,'Plant cell','#14532d',12)}`) },
      { caption: 'In short: only plant cells have a cell wall, chloroplasts and a large vacuole. Both have a membrane, cytoplasm and nucleus.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f8fafc"/><rect x="30" y="70" width="160" height="170" rx="12" fill="#fbcfe8"/><rect x="210" y="70" width="160" height="170" rx="12" fill="#bbf7d0"/>${label(110,60,'Animal','#86198f',12)}${label(290,60,'Plant','#14532d',12)}${label(110,110,'• membrane','#831843',10)}${label(110,135,'• nucleus','#831843',10)}${label(290,110,'• cell WALL','#14532d',10)}${label(290,135,'• chloroplast','#14532d',10)}${label(290,160,'• big vacuole','#14532d',10)}`) },
    ],
  },
  {
    slug: 'simple-electric-circuit',
    title: 'A Simple Electric Circuit',
    subject: 'Physics',
    classLevel: 'Class 6–10',
    intro: 'See why a bulb only glows when the circuit is complete, and which way the current flows.',
    whyItMatters: 'Open vs closed circuits and the direction of conventional current are the foundation of all electricity chapters and practicals.',
    practice: { label: 'Practice Electricity questions', tab: 'arena' },
    steps: [
      { caption: 'A circuit needs a CELL (battery), a BULB and connecting WIRES. With the switch OPEN, there is a gap — no current flows, so the bulb stays off.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><rect x="60" y="200" width="50" height="30" fill="#f59e0b"/>${label(85,250,'Cell','#78350f',10)}<circle cx="300" cy="90" r="26" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>${label(300,150,'Bulb (off)','#475569',10)}<path d="M110 215 H320 V116 M300 64 V40 H180 M85 200 V40 H150" stroke="#334155" stroke-width="3" fill="none"/><line x1="150" y1="40" x2="172" y2="30" stroke="#dc2626" stroke-width="3"/>${label(165,60,'switch open','#b91c1c',9)}`) },
      { caption: 'Close the SWITCH and the loop is complete. CURRENT flows from the + end of the cell, through the bulb, lighting it up. ✨', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><rect x="60" y="200" width="50" height="30" fill="#f59e0b"/>${label(85,250,'Cell','#78350f',10)}<circle cx="300" cy="90" r="26" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>${[300].map(()=>`<g stroke="#facc15" stroke-width="3"><line x1="300" y1="52" x2="300" y2="40"/><line x1="338" y1="90" x2="350" y2="90"/></g>`).join('')}${label(300,150,'Bulb (ON)','#a16207',10)}<path d="M110 215 H320 V116 M300 64 V40 H85 V200" stroke="#334155" stroke-width="3" fill="none"/>${label(210,30,'switch closed','#15803d',9)}`) },
      { caption: 'Conventional current flows from + to − around the loop. Break the loop anywhere and the bulb goes out.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><rect x="80" y="120" width="240" height="120" rx="10" fill="none" stroke="#334155" stroke-width="4"/><rect x="60" y="160" width="40" height="24" fill="#f59e0b"/><circle cx="300" cy="120" r="20" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>${[150,200,250].map((x)=>`<path d="M${x} 120 l10 -6 l0 12 Z" fill="#16a34a"/>`).join('')}${label(200,100,'current →','#15803d',11)}`) },
    ],
  },
  {
    slug: 'states-of-matter',
    title: 'States of Matter',
    subject: 'Science',
    classLevel: 'Class 5–9',
    intro: 'Watch how the same particles arrange themselves in solids, liquids and gases — and what happens when you heat them.',
    whyItMatters: 'Particle arrangement explains why solids keep shape, liquids flow and gases fill any space — and powers melting, boiling and condensation questions.',
    practice: { label: 'Practice Matter questions', tab: 'arena' },
    steps: [
      { caption: 'In a SOLID, particles are packed tightly in a fixed pattern and only vibrate. So a solid keeps its shape and volume.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eef2ff"/><rect x="120" y="90" width="160" height="120" rx="10" fill="#c7d2fe"/>${[0,1,2,3].map((r)=>[0,1,2,3,4].map((c)=>`<circle cx="${140+c*30}" cy="${110+r*30}" r="10" fill="#4338ca"/>`).join('')).join('')}${label(200,250,'Solid — fixed & packed','#3730a3',12)}`) },
      { caption: 'Heat it and it MELTS to a LIQUID. Particles are still close but can slide past each other — so a liquid flows and takes the shape of its container.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#ecfeff"/><path d="M120 120 H280 V210 H120 Z" fill="#a5f3fc"/>${[0,1,2].map((r)=>[0,1,2,3].map((c)=>`<circle cx="${150+c*35+(r%2)*12}" cy="${150+r*22}" r="10" fill="#0e7490"/>`).join('')).join('')}${label(200,250,'Liquid — close but flowing','#155e75',12)}`) },
      { caption: 'Heat more and it boils to a GAS. Particles break free and move fast in all directions — so a gas spreads to fill any space.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/>${[[150,110],[250,90],[200,150],[120,180],[290,170],[180,210],[260,210],[150,240]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#dc2626"/>`).join('')}${label(200,275,'Gas — free & far apart','#991b1b',12)}`) },
    ],
  },
  {
    slug: 'life-cycle-of-a-butterfly',
    title: 'Life Cycle of a Butterfly',
    subject: 'Science',
    classLevel: 'Class 3–7',
    intro: 'Follow a butterfly through its four amazing stages of complete metamorphosis.',
    whyItMatters: 'The egg → larva → pupa → adult cycle is the classic example of complete metamorphosis, asked across primary and middle school science.',
    practice: { label: 'Practice Life Cycle questions', tab: 'arena' },
    steps: [
      { caption: 'STAGE 1 — EGG: a female butterfly lays tiny eggs on a leaf.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><path d="M60 140 q140 -40 280 0" stroke="#16a34a" stroke-width="10" fill="none"/>${[180,210,240].map((x)=>`<ellipse cx="${x}" cy="120" rx="8" ry="11" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>`).join('')}${label(200,210,'1. Eggs on a leaf','#14532d',13)}`) },
      { caption: 'STAGE 2 — LARVA (caterpillar): the egg hatches into a caterpillar that eats leaves and grows quickly.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/>${[0,1,2,3,4,5].map((i)=>`<circle cx="${130+i*28}" cy="150" r="20" fill="#65a30d" stroke="#3f6212" stroke-width="2"/>`).join('')}<circle cx="118" cy="150" r="14" fill="#4d7c0f"/>${label(200,215,'2. Caterpillar (larva)','#365314',13)}`) },
      { caption: 'STAGE 3 — PUPA (chrysalis): the caterpillar forms a hard case and changes completely inside.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fefce8"/><line x1="200" y1="50" x2="200" y2="90" stroke="#92400e" stroke-width="3"/><path d="M200 90 q-34 10 -28 70 q6 50 28 56 q22 -6 28 -56 q6 -60 -28 -70Z" fill="#a16207"/>${label(200,235,'3. Pupa (chrysalis)','#713f12',13)}`) },
      { caption: 'STAGE 4 — ADULT: a beautiful butterfly emerges, ready to fly and lay eggs — and the cycle begins again!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/><ellipse cx="200" cy="150" rx="8" ry="46" fill="#4c1d95"/><path d="M196 120 Q120 80 130 130 Q120 165 196 150 Z" fill="#f472b6"/><path d="M204 120 Q280 80 270 130 Q280 165 204 150 Z" fill="#f472b6"/><path d="M196 150 Q140 160 150 200 Q170 215 196 175 Z" fill="#c084fc"/><path d="M204 150 Q260 160 250 200 Q230 215 204 175 Z" fill="#c084fc"/>${label(200,245,'4. Adult butterfly','#581c87',13)}`) },
    ],
  },
  {
    slug: 'phases-of-the-moon',
    title: 'Phases of the Moon',
    subject: 'Science',
    classLevel: 'Class 5–8',
    intro: 'See why the Moon seems to change shape through the month — from new moon to full moon and back.',
    whyItMatters: 'Moon phases depend on how much of the sunlit side faces Earth — a favourite question and the basis of the lunar calendar and tides.',
    practice: { label: 'Practice Astronomy questions', tab: 'arena' },
    steps: [
      { caption: 'NEW MOON: the Moon is between the Sun and Earth, so its lit side faces away from us — we see almost nothing.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/><circle cx="60" cy="150" r="20" fill="#fbbf24"/>${label(60,185,'Sun','#fde68a',10)}<circle cx="200" cy="150" r="26" fill="#1e293b" stroke="#334155" stroke-width="2"/>${label(200,210,'New Moon','#cbd5e1',12)}`) },
      { caption: 'FIRST QUARTER: a week later we see exactly half of the lit side — a half-moon shape.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/><circle cx="200" cy="150" r="34" fill="#1e293b"/><path d="M200 116 a34 34 0 0 1 0 68 Z" fill="#f8fafc"/>${label(200,215,'First Quarter','#cbd5e1',12)}`) },
      { caption: 'FULL MOON: Earth is between the Sun and Moon, so we see the entire sunlit face — a bright full circle.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/><circle cx="200" cy="150" r="40" fill="#f8fafc"/>${[[185,140],[215,160],[200,175]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#cbd5e1"/>`).join('')}${label(200,215,'Full Moon','#cbd5e1',12)}`) },
      { caption: 'LAST QUARTER: the lit half shrinks back to a half-moon on the other side, then to new moon — and the cycle (~29.5 days) repeats.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/><circle cx="200" cy="150" r="34" fill="#1e293b"/><path d="M200 116 a34 34 0 0 0 0 68 Z" fill="#f8fafc"/>${label(200,215,'Last Quarter','#cbd5e1',12)}`) },
    ],
  },
  {
    slug: 'food-chain-energy-flow',
    title: 'Food Chain & Energy Flow',
    subject: 'Biology',
    classLevel: 'Class 6–10',
    intro: 'Follow energy as it flows from the Sun through plants and animals in a simple food chain.',
    whyItMatters: 'Producers, consumers and the one-way flow of energy explain ecosystems, food webs and why there are fewer animals at the top.',
    practice: { label: 'Practice Ecosystem questions', tab: 'arena' },
    steps: [
      { caption: 'PRODUCERS: green plants (and grass) capture the Sun’s energy by photosynthesis and make their own food.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><circle cx="60" cy="50" r="20" fill="#fbbf24"/>${[0,1,2,3].map((i)=>`<path d="M${120+i*45} 230 q5 -50 0 -70" stroke="#16a34a" stroke-width="6" fill="none"/>`).join('')}${label(200,260,'Grass (Producer)','#14532d',12)}`) },
      { caption: 'PRIMARY CONSUMER: a herbivore like a grasshopper or deer eats the plants, gaining some of that energy.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/>${[0,1,2].map((i)=>`<path d="M${130+i*30} 235 q4 -34 0 -48" stroke="#16a34a" stroke-width="5" fill="none"/>`).join('')}<text x="250" y="160" font-size="56" text-anchor="middle">🦗</text><path d="M180 150 H225" stroke="#15803d" stroke-width="4" marker-end="url(#fa)"/><defs><marker id="fa" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#15803d"/></marker></defs>${label(200,260,'Herbivore eats plant','#14532d',12)}`) },
      { caption: 'SECONDARY CONSUMER: a carnivore like a frog or bird eats the herbivore. Energy flows ONE way and lessens at each step.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><text x="110" y="160" font-size="40" text-anchor="middle">🌿</text><text x="200" y="160" font-size="44" text-anchor="middle">🦗</text><text x="300" y="160" font-size="48" text-anchor="middle">🐸</text>${[150,245].map((x)=>`<path d="M${x} 150 H${x+30}" stroke="#15803d" stroke-width="4" marker-end="url(#fb)"/>`).join('')}<defs><marker id="fb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#15803d"/></marker></defs>${label(200,235,'Energy flows one way →','#14532d',12)}`) },
    ],
  },
  {
    slug: 'reflex-action',
    title: 'Reflex Action',
    subject: 'Biology',
    classLevel: 'Class 8–10',
    intro: 'See how your body pulls your hand away from a hot object before you even think about it.',
    whyItMatters: 'The reflex arc (receptor → sensory neuron → spinal cord → motor neuron → muscle) shows how the nervous system protects us instantly — a key diagram.',
    practice: { label: 'Practice Nervous System questions', tab: 'arena' },
    steps: [
      { caption: 'STIMULUS: your hand touches a hot object. Heat RECEPTORS in the skin detect the danger.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><text x="90" y="130" font-size="40" text-anchor="middle">✋</text><text x="150" y="120" font-size="34" text-anchor="middle">🔥</text>${label(120,180,'Receptor in skin senses heat','#991b1b',11)}`) },
      { caption: 'The signal races along a SENSORY NEURON to the SPINAL CORD — it does not wait to reach the brain.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><text x="70" y="120" font-size="32" text-anchor="middle">✋</text><rect x="300" y="60" width="22" height="180" rx="10" fill="#fbbf24"/>${label(311,255,'Spinal cord','#92400e',10)}<path d="M95 115 H300" stroke="#2563eb" stroke-width="4" marker-end="url(#ra)"/><defs><marker id="ra" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#2563eb"/></marker></defs>${label(180,100,'Sensory neuron →','#1d4ed8',11)}`) },
      { caption: 'The spinal cord instantly sends a signal back along a MOTOR NEURON to the arm muscle — you pull your hand away. Fast and automatic!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><rect x="300" y="60" width="22" height="180" rx="10" fill="#fbbf24"/><text x="70" y="120" font-size="32" text-anchor="middle">💪</text><path d="M300 175 H95" stroke="#dc2626" stroke-width="4" marker-end="url(#rb)"/><defs><marker id="rb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#dc2626"/></marker></defs>${label(190,160,'← Motor neuron','#b91c1c',11)}${label(180,210,'Muscle moves — hand pulls back!','#7f1d1d',11)}`) },
    ],
  },
  {
    slug: 'nitrogen-cycle',
    title: 'The Nitrogen Cycle',
    subject: 'Biology',
    classLevel: 'Class 8–10',
    intro: 'See how nitrogen moves from the air into plants, animals and soil — and back to the air again.',
    whyItMatters: 'Nitrogen is essential for proteins and DNA. Fixation, nitrification and denitrification are commonly tested in biology and environmental science.',
    practice: { label: 'Practice Nitrogen Cycle questions', tab: 'arena' },
    steps: [
      { caption: 'FIXATION: nitrogen gas (N₂) makes up 78% of air but plants can’t use it directly. Bacteria in roots and lightning fix it into usable nitrates.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/>${label(200,40,'N₂ in air (78%)','#1e40af',13)}<path d="M200 55 V110" stroke="#1d4ed8" stroke-width="3" marker-end="url(#na)"/><defs><marker id="na" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#1d4ed8"/></marker></defs>${label(200,130,'Fixed into nitrates','#15803d',12)}<rect x="0" y="220" width="400" height="80" fill="#a16207"/>${label(200,265,'Soil','#fef3c7',11)}`) },
      { caption: 'Plants ABSORB nitrates from the soil to build proteins. Animals get nitrogen by eating the plants.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><rect x="0" y="220" width="400" height="80" fill="#a16207"/><line x1="200" y1="120" x2="200" y2="220" stroke="#15803d" stroke-width="8"/><ellipse cx="200" cy="110" rx="40" ry="24" fill="#22c55e"/><text x="300" y="170" font-size="34" text-anchor="middle">🐄</text><path d="M150 130 q-30 30 -40 80" stroke="#16a34a" stroke-width="3" fill="none"/>${label(200,255,'Plants absorb nitrates','#fef3c7',11)}`) },
      { caption: 'DECOMPOSITION & DENITRIFICATION: when plants and animals die, decomposers return nitrogen to the soil, and some bacteria release N₂ back to the air. The cycle continues!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/>${label(200,40,'N₂ back to air','#1e40af',13)}<path d="M200 110 V55" stroke="#16a34a" stroke-width="3" marker-end="url(#nb)"/><defs><marker id="nb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#16a34a"/></marker></defs><rect x="0" y="220" width="400" height="80" fill="#78350f"/>${label(200,265,'Decomposers in soil','#fde68a',11)}`) },
    ],
  },
  {
    slug: 'structure-of-an-atom',
    title: 'Structure of an Atom',
    subject: 'Chemistry',
    classLevel: 'Class 8–10',
    intro: 'Build an atom from the inside out — nucleus, protons, neutrons and electron shells.',
    whyItMatters: 'Protons, neutrons, electrons and shells explain the whole periodic table, ions and bonding — the foundation of all chemistry.',
    practice: { label: 'Practice Atomic Structure questions', tab: 'arena' },
    steps: [
      { caption: 'At the centre is the NUCLEUS — packed with positively charged PROTONS and neutral NEUTRONS. It holds almost all the atom’s mass.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/><circle cx="200" cy="150" r="34" fill="#fca5a5"/><circle cx="190" cy="145" r="9" fill="#dc2626"/><circle cx="210" cy="158" r="9" fill="#dc2626"/><circle cx="205" cy="140" r="9" fill="#94a3b8"/><circle cx="188" cy="162" r="9" fill="#94a3b8"/>${label(200,215,'Nucleus: protons (+) & neutrons','#7f1d1d',11)}`) },
      { caption: 'ELECTRONS (negatively charged) move around the nucleus in fixed energy SHELLS — like planets around the Sun.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/><circle cx="200" cy="150" r="20" fill="#fca5a5"/><circle cx="200" cy="150" r="55" fill="none" stroke="#a855f7" stroke-width="2"/><circle cx="200" cy="150" r="90" fill="none" stroke="#a855f7" stroke-width="2"/><circle cx="255" cy="150" r="7" fill="#7c3aed"/><circle cx="145" cy="150" r="7" fill="#7c3aed"/><circle cx="200" cy="60" r="7" fill="#7c3aed"/>${label(200,250,'Electrons (–) in shells','#6b21a8',11)}`) },
      { caption: 'Example — a CARBON atom: 6 protons, 6 neutrons in the nucleus and 6 electrons (2 in the inner shell, 4 in the outer). That outer count decides how it bonds.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/><circle cx="200" cy="150" r="22" fill="#fca5a5"/>${label(200,153,'6p,6n','#7f1d1d',10)}<circle cx="200" cy="150" r="48" fill="none" stroke="#a855f7" stroke-width="2"/><circle cx="200" cy="150" r="85" fill="none" stroke="#a855f7" stroke-width="2"/>${[[248,150],[152,150]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="#7c3aed"/>`).join('')}${[[200,65],[200,235],[285,150],[115,150]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="#7c3aed"/>`).join('')}${label(200,285,'Carbon: 2 + 4 electrons','#6b21a8',11)}`) },
    ],
  },
  {
    slug: 'carbon-cycle',
    title: 'The Carbon Cycle',
    subject: 'Biology',
    classLevel: 'Class 8–10',
    intro: 'See how carbon moves between the air, plants, animals and the ground — and why burning fuels upsets the balance.',
    whyItMatters: 'The carbon cycle links photosynthesis, respiration and combustion — and explains the greenhouse effect and climate change.',
    practice: { label: 'Practice Carbon Cycle questions', tab: 'arena' },
    steps: [
      { caption: 'Plants take in CARBON DIOXIDE (CO₂) from the air during photosynthesis and lock the carbon into food and wood.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/>${label(200,40,'CO₂ in air','#1e40af',13)}<path d="M200 55 V100" stroke="#16a34a" stroke-width="3" marker-end="url(#ca)"/><defs><marker id="ca" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#16a34a"/></marker></defs><line x1="200" y1="180" x2="200" y2="250" stroke="#15803d" stroke-width="8"/><ellipse cx="200" cy="150" rx="46" ry="30" fill="#22c55e"/>${label(200,275,'Plants absorb CO₂','#14532d',12)}`) },
      { caption: 'Animals eat plants and RESPIRE, releasing CO₂ back into the air. Decomposers do the same when things die.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><text x="160" y="150" font-size="44" text-anchor="middle">🐄</text>${label(200,40,'CO₂ released','#1e40af',13)}<path d="M200 95 V50" stroke="#dc2626" stroke-width="3" marker-end="url(#cb)"/><defs><marker id="cb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#dc2626"/></marker></defs>${label(200,200,'Respiration returns CO₂','#7f1d1d',12)}`) },
      { caption: 'Dead plants buried for millions of years become COAL, OIL and GAS. Burning these fossil fuels adds extra CO₂ — driving global warming.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><rect x="0" y="210" width="400" height="90" fill="#1f2937"/>${label(200,255,'Coal · Oil · Gas','#fde68a',11)}<text x="120" y="150" font-size="34" text-anchor="middle">🏭</text>${[140,160,180].map((x)=>`<path d="M${x} 120 q3 -20 0 -34" stroke="#6b7280" stroke-width="4" fill="none"/>`).join('')}${label(230,90,'Extra CO₂ ↑ → warming','#991b1b',12)}`) },
    ],
  },
  {
    slug: 'dispersion-of-light',
    title: 'Dispersion of Light (Prism)',
    subject: 'Physics',
    classLevel: 'Class 8–10',
    intro: 'See how a glass prism splits white light into the seven colours of the rainbow.',
    whyItMatters: 'Dispersion explains rainbows and proves white light is a mix of colours — a classic optics diagram and experiment.',
    practice: { label: 'Practice Light questions', tab: 'arena' },
    steps: [
      { caption: 'A beam of WHITE LIGHT travels towards a triangular glass PRISM.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/><line x1="20" y1="150" x2="160" y2="150" stroke="#f8fafc" stroke-width="5"/>${label(90,135,'White light','#e2e8f0',11)}<polygon points="200,90 250,200 150,200" fill="#bae6fd" opacity="0.7" stroke="#7dd3fc" stroke-width="2"/>${label(200,225,'Prism','#7dd3fc',11)}`) },
      { caption: 'Inside the prism each colour bends by a slightly different amount (REFRACTION) — violet bends most, red least.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/><line x1="20" y1="140" x2="180" y2="150" stroke="#f8fafc" stroke-width="5"/><polygon points="200,90 250,200 150,200" fill="#bae6fd" opacity="0.5" stroke="#7dd3fc" stroke-width="2"/>${['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#6366f1','#a855f7'].map((c,i)=>`<line x1="215" y1="170" x2="360" y2="${120+i*14}" stroke="${c}" stroke-width="3"/>`).join('')}${label(200,235,'Colours bend by different amounts','#cbd5e1',10)}`) },
      { caption: 'The light spreads into a SPECTRUM — VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red. This is dispersion!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0f172a"/>${['#a855f7','#6366f1','#3b82f6','#22c55e','#eab308','#f97316','#ef4444'].map((c,i)=>`<rect x="60" y="${70+i*22}" width="280" height="20" fill="${c}"/>`).join('')}${label(200,270,'VIBGYOR spectrum','#e2e8f0',12)}`) },
    ],
  },
  {
    slug: 'the-solar-system',
    title: 'The Solar System',
    subject: 'Science',
    classLevel: 'Class 4–8',
    intro: 'Meet the eight planets in order and see how they orbit the Sun.',
    whyItMatters: 'Knowing the planet order, the inner rocky vs outer gas giants, and that everything orbits the Sun is core space science.',
    practice: { label: 'Practice Solar System questions', tab: 'arena' },
    steps: [
      { caption: 'At the centre is the SUN — a giant star whose gravity holds the whole system together.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0b1020"/><circle cx="60" cy="150" r="34" fill="#fbbf24"/>${[0,1,2,3,4,5,6,7].map((i)=>`<line x1="60" y1="150" x2="${60+Math.cos(i*0.785)*46}" y2="${150+Math.sin(i*0.785)*46}" stroke="#f59e0b" stroke-width="3"/>`).join('')}${label(60,210,'Sun','#fde68a',12)}`) },
      { caption: 'The four INNER planets — Mercury, Venus, Earth, Mars — are small and rocky, closest to the Sun.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0b1020"/><circle cx="40" cy="150" r="24" fill="#fbbf24"/>${[['#9ca3af','Me',110],['#f59e0b','V',160],['#3b82f6','E',215],['#ef4444','Ma',270]].map(([c,t,x])=>`<circle cx="${x}" cy="150" r="10" fill="${c}"/>${label(Number(x),180,String(t),'#cbd5e1',9)}`).join('')}${label(200,240,'Inner rocky planets','#cbd5e1',11)}`) },
      { caption: 'The four OUTER planets — Jupiter, Saturn, Uranus, Neptune — are huge gas giants, far from the Sun. Order: My Very Easy Method Just Speeds Up Naming!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#0b1020"/>${[['#d97706','J',90,22],['#fcd34d','S',180,18],['#67e8f9','U',260,14],['#3b82f6','N',330,14]].map(([c,t,x,r])=>`<circle cx="${x}" cy="150" r="${r}" fill="${c}"/>${label(Number(x),150+Number(r)+18,String(t),'#cbd5e1',9)}`).join('')}<circle cx="180" cy="150" r="26" fill="none" stroke="#fcd34d" stroke-width="2"/>${label(200,250,'Outer gas giants','#cbd5e1',11)}`) },
    ],
  },
  {
    slug: 'types-of-chemical-reactions',
    title: 'Types of Chemical Reactions',
    subject: 'Chemistry',
    classLevel: 'Class 10',
    intro: 'See the four main types of chemical reactions with a simple example of each.',
    whyItMatters: 'Combination, decomposition, displacement and double-displacement reactions are the backbone of the Chemical Reactions chapter.',
    practice: { label: 'Practice Chemical Reactions questions', tab: 'arena' },
    steps: [
      { caption: 'COMBINATION: two or more substances join to form one product. Example: 2Mg + O₂ → 2MgO.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/><circle cx="110" cy="150" r="26" fill="#fca5a5"/><text x="160" y="158" font-size="30" text-anchor="middle">+</text><circle cx="210" cy="150" r="26" fill="#93c5fd"/><text x="260" y="158" font-size="26" text-anchor="middle">→</text><circle cx="320" cy="150" r="34" fill="#a78bfa"/>${label(200,235,'A + B → AB','#6b21a8',13)}`) },
      { caption: 'DECOMPOSITION: one substance breaks into two or more. Example: CaCO₃ → CaO + CO₂ (on heating).', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/><circle cx="100" cy="150" r="34" fill="#a78bfa"/><text x="155" y="158" font-size="26" text-anchor="middle">→</text><circle cx="220" cy="150" r="24" fill="#fca5a5"/><text x="270" y="158" font-size="28" text-anchor="middle">+</text><circle cx="330" cy="150" r="24" fill="#93c5fd"/>${label(200,235,'AB → A + B','#6b21a8',13)}`) },
      { caption: 'DISPLACEMENT: a more reactive element pushes out a less reactive one (Fe + CuSO₄ → FeSO₄ + Cu). DOUBLE DISPLACEMENT: two compounds swap partners (AgNO₃ + NaCl → AgCl↓ + NaNO₃).', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#faf5ff"/>${label(200,70,'Displacement: A + BC → AC + B','#6b21a8',12)}<circle cx="120" cy="150" r="18" fill="#fca5a5"/><circle cx="160" cy="150" r="18" fill="#86efac"/><text x="200" y="156" font-size="22" text-anchor="middle">→</text><circle cx="240" cy="150" r="18" fill="#fca5a5"/><circle cx="280" cy="150" r="18" fill="#93c5fd"/>${label(200,235,'Double: AB + CD → AD + CB','#6b21a8',12)}`) },
    ],
  },
  {
    slug: 'human-excretory-system',
    title: 'The Excretory System',
    subject: 'Biology',
    classLevel: 'Class 8–10',
    intro: 'See how your kidneys filter the blood and remove waste as urine.',
    whyItMatters: 'The kidneys, nephron and the path of urine are key to understanding how the body removes waste and balances water.',
    practice: { label: 'Practice Excretion questions', tab: 'arena' },
    steps: [
      { caption: 'Blood full of waste flows into the two bean-shaped KIDNEYS through the renal artery.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><path d="M150 90 q-40 0 -40 50 q0 50 40 60 q20 -55 0 -110Z" fill="#f87171"/><path d="M250 90 q40 0 40 50 q0 50 -40 60 q-20 -55 0 -110Z" fill="#f87171"/>${label(200,90,'Kidneys','#7f1d1d',12)}<line x1="60" y1="120" x2="115" y2="120" stroke="#dc2626" stroke-width="6"/>${label(75,108,'blood in','#b91c1c',9)}`) },
      { caption: 'Inside, millions of tiny filters called NEPHRONS clean the blood — keeping useful things and removing urea and extra water.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><circle cx="120" cy="120" r="30" fill="#fecaca"/><path d="M120 120 q60 10 50 80 q-10 40 -50 30" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>${label(120,120,'filter','#7f1d1d',9)}${label(200,250,'Nephron filters the blood','#7f1d1d',12)}`) },
      { caption: 'The waste liquid (URINE) flows down the ureters to the BLADDER, where it is stored until it leaves the body.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><path d="M150 70 q-30 0 -30 40 M250 70 q30 0 30 40" fill="none" stroke="#f87171" stroke-width="8"/><line x1="160" y1="100" x2="200" y2="190" stroke="#fbbf24" stroke-width="4"/><line x1="240" y1="100" x2="200" y2="190" stroke="#fbbf24" stroke-width="4"/><ellipse cx="200" cy="210" rx="48" ry="36" fill="#fde68a"/>${label(200,215,'Bladder','#92400e',11)}${label(200,275,'Urine stored, then removed','#7f1d1d',11)}`) },
    ],
  },
  {
    slug: 'the-human-eye',
    title: 'The Human Eye',
    subject: 'Biology',
    classLevel: 'Class 8–10',
    intro: 'See how the eye focuses light to form a clear image — and what goes wrong in short and long sight.',
    whyItMatters: 'The parts of the eye, image formation on the retina, and defects (myopia, hypermetropia) are core to the Human Eye chapter.',
    practice: { label: 'Practice Human Eye questions', tab: 'arena' },
    steps: [
      { caption: 'Light enters through the CORNEA and PUPIL. The LENS bends it to focus a sharp, upside-down image on the RETINA at the back.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><ellipse cx="200" cy="150" rx="120" ry="80" fill="#fff" stroke="#1e3a8a" stroke-width="3"/><path d="M90 110 Q70 150 90 190" fill="none" stroke="#60a5fa" stroke-width="5"/>${label(85,95,'Cornea','#1e40af',9)}<ellipse cx="120" cy="150" rx="12" ry="34" fill="#93c5fd"/>${label(120,200,'Lens','#1e40af',9)}<line x1="290" y1="100" x2="290" y2="200" stroke="#fca5a5" stroke-width="5"/>${label(300,150,'Retina','#b91c1c',9)}<line x1="30" y1="120" x2="120" y2="150" stroke="#facc15" stroke-width="2"/><line x1="120" y1="150" x2="290" y2="185" stroke="#facc15" stroke-width="2"/>`) },
      { caption: 'MYOPIA (short sight): the eyeball is too long, so distant objects focus IN FRONT of the retina and look blurry. Fixed with a CONCAVE lens.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><ellipse cx="210" cy="150" rx="130" ry="80" fill="#fff" stroke="#1e3a8a" stroke-width="3"/><ellipse cx="120" cy="150" rx="12" ry="34" fill="#93c5fd"/><circle cx="240" cy="150" r="6" fill="#dc2626"/>${label(240,180,'focus before retina','#b91c1c',10)}${label(200,250,'Myopia → use concave lens','#7f1d1d',12)}`) },
      { caption: 'HYPERMETROPIA (long sight): the eyeball is too short, so near objects focus BEHIND the retina. Fixed with a CONVEX lens.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fefce8"/><ellipse cx="190" cy="150" rx="110" ry="80" fill="#fff" stroke="#1e3a8a" stroke-width="3"/><ellipse cx="120" cy="150" rx="12" ry="34" fill="#93c5fd"/><circle cx="320" cy="150" r="6" fill="#dc2626"/>${label(320,180,'focus behind retina','#b91c1c',10)}${label(200,250,'Hypermetropia → use convex lens','#713f12',12)}`) },
    ],
  },
  {
    slug: 'ph-scale-acids-bases',
    title: 'The pH Scale — Acids & Bases',
    subject: 'Chemistry',
    classLevel: 'Class 7–10',
    intro: 'See how the pH scale measures how acidic or basic a substance is, from 0 to 14.',
    whyItMatters: 'pH tells us if something is an acid, base or neutral — vital for chemistry, biology and everyday life (soil, soaps, antacids).',
    practice: { label: 'Practice Acids & Bases questions', tab: 'arena' },
    steps: [
      { caption: 'The pH scale runs from 0 to 14. Lower numbers are more ACIDIC; higher numbers are more BASIC (alkaline).', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f8fafc"/>${[...Array(15)].map((_,i)=>`<rect x="${30+i*24}" y="120" width="24" height="40" fill="hsl(${i*9},80%,55%)"/>`).join('')}${label(60,180,'0 acidic','#b91c1c',10)}${label(200,180,'7 neutral','#475569',10)}${label(345,180,'14 basic','#1e3a8a',10)}`) },
      { caption: 'pH 7 is NEUTRAL — pure water. Below 7: lemon (2), vinegar (3). These turn blue litmus red.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fff1f2"/><text x="120" y="120" font-size="40" text-anchor="middle">🍋</text>${label(120,160,'Lemon · pH 2','#b91c1c',11)}<text x="280" y="120" font-size="40" text-anchor="middle">💧</text>${label(280,160,'Water · pH 7','#475569',11)}${label(200,230,'Acids turn blue litmus red','#9f1239',12)}`) },
      { caption: 'Above 7 are BASES: soap (9), baking soda (9), lime water. These turn red litmus blue. Strong acids/bases can be dangerous!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><text x="120" y="120" font-size="40" text-anchor="middle">🧼</text>${label(120,160,'Soap · pH 9','#1e40af',11)}<text x="280" y="120" font-size="40" text-anchor="middle">🧂</text>${label(280,160,'Baking soda','#1e40af',11)}${label(200,230,'Bases turn red litmus blue','#1e3a8a',12)}`) },
    ],
  },
  {
    slug: 'cell-division-mitosis',
    title: 'Cell Division (Mitosis)',
    subject: 'Biology',
    classLevel: 'Class 9–10',
    intro: 'Watch one cell copy itself and split into two identical daughter cells.',
    whyItMatters: 'Mitosis lets the body grow and repair itself, making genetically identical cells — a key process in cell biology.',
    practice: { label: 'Practice Cell Division questions', tab: 'arena' },
    steps: [
      { caption: 'The cell first COPIES its DNA, so it now has two identical sets of chromosomes.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fdf4ff"/><circle cx="200" cy="150" r="80" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/><line x1="180" y1="120" x2="180" y2="180" stroke="#7e22ce" stroke-width="6"/><line x1="220" y1="120" x2="220" y2="180" stroke="#7e22ce" stroke-width="6"/>${label(200,250,'DNA copied (2 sets)','#86198f',12)}`) },
      { caption: 'The copied chromosomes LINE UP in the middle, then are pulled to opposite ends of the cell.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fdf4ff"/><ellipse cx="200" cy="150" rx="100" ry="70" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/><line x1="120" y1="120" x2="120" y2="180" stroke="#7e22ce" stroke-width="6"/><line x1="280" y1="120" x2="280" y2="180" stroke="#7e22ce" stroke-width="6"/>${label(200,250,'Chromosomes pulled apart','#86198f',12)}`) },
      { caption: 'The cell pinches in the middle and splits into TWO identical daughter cells — each with a full set of chromosomes.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fdf4ff"/><circle cx="120" cy="150" r="55" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/><circle cx="280" cy="150" r="55" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/><line x1="120" y1="125" x2="120" y2="175" stroke="#7e22ce" stroke-width="5"/><line x1="280" y1="125" x2="280" y2="175" stroke="#7e22ce" stroke-width="5"/>${label(200,250,'2 identical daughter cells','#86198f',12)}`) },
    ],
  },
  {
    slug: 'how-we-hear-sound',
    title: 'How We Hear (Sound)',
    subject: 'Physics',
    classLevel: 'Class 8–9',
    intro: 'Follow a sound wave from the air into your ear and see how you hear it.',
    whyItMatters: 'Sound travels as vibrations through a medium; understanding how the ear detects them links physics and biology.',
    practice: { label: 'Practice Sound questions', tab: 'arena' },
    steps: [
      { caption: 'A vibrating object (like a bell) makes the air vibrate, creating SOUND WAVES that travel out in all directions.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><text x="70" y="165" font-size="44" text-anchor="middle">🔔</text>${[40,70,100,130].map((r)=>`<path d="M110 ${150-r*0.5} A ${r} ${r} 0 0 1 110 ${150+r*0.5}" fill="none" stroke="#3b82f6" stroke-width="3"/>`).join('')}${label(230,150,'Sound waves →','#1d4ed8',12)}`) },
      { caption: 'The waves reach your EAR and make the EARDRUM vibrate. Tiny bones pass the vibration deeper inside.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><path d="M90 90 Q60 150 90 210 L150 180 L150 120 Z" fill="#fde68a"/>${label(110,235,'Outer ear','#92400e',10)}<line x1="150" y1="120" x2="150" y2="180" stroke="#dc2626" stroke-width="5"/>${label(170,105,'Eardrum','#b91c1c',9)}<circle cx="185" cy="140" r="6" fill="#94a3b8"/><circle cx="205" cy="155" r="6" fill="#94a3b8"/>${label(220,120,'tiny bones','#475569',9)}`) },
      { caption: 'The vibrations reach the snail-shaped COCHLEA, which turns them into nerve signals. The brain reads these as SOUND.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><path d="M180 150 q40 -40 0 -60 q-60 0 -50 60 q10 50 60 40" fill="none" stroke="#a855f7" stroke-width="8" stroke-linecap="round"/>${label(150,210,'Cochlea','#6b21a8',11)}<path d="M230 150 H320" stroke="#16a34a" stroke-width="4" marker-end="url(#he)"/><defs><marker id="he" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#16a34a"/></marker></defs>${label(300,135,'to brain','#15803d',10)}`) },
    ],
  },
  {
    slug: 'electromagnetic-induction',
    title: 'Electromagnetic Induction',
    subject: 'Physics',
    classLevel: 'Class 10–12',
    intro: 'See how moving a magnet near a coil makes electricity — the idea behind every generator.',
    whyItMatters: 'Induction (Faraday’s law) is how generators and transformers produce electricity — a cornerstone of physics.',
    practice: { label: 'Practice Magnetism questions', tab: 'arena' },
    steps: [
      { caption: 'Take a coil of wire connected to a meter (galvanometer). With everything still, no current flows — the needle stays at zero.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f8fafc"/>${[0,1,2,3].map((i)=>`<ellipse cx="${180+i*16}" cy="150" rx="10" ry="40" fill="none" stroke="#b45309" stroke-width="4"/>`).join('')}<circle cx="300" cy="220" r="26" fill="#fff" stroke="#334155" stroke-width="3"/><line x1="300" y1="220" x2="300" y2="200" stroke="#dc2626" stroke-width="3"/>${label(300,260,'meter: 0','#475569',10)}`) },
      { caption: 'Now PUSH a magnet INTO the coil. The changing magnetic field INDUCES a current — the needle swings one way!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#ecfdf5"/>${[0,1,2,3].map((i)=>`<ellipse cx="${200+i*16}" cy="150" rx="10" ry="40" fill="none" stroke="#b45309" stroke-width="4"/>`).join('')}<rect x="90" y="138" width="80" height="24" fill="#dc2626"/>${label(130,128,'magnet →','#7f1d1d',10)}<circle cx="320" cy="220" r="26" fill="#fff" stroke="#334155" stroke-width="3"/><line x1="320" y1="220" x2="338" y2="208" stroke="#16a34a" stroke-width="3"/>${label(320,260,'current!','#15803d',10)}`) },
      { caption: 'PULL the magnet out and the needle swings the OTHER way. Movement = electricity. This is electromagnetic induction.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/>${[0,1,2,3].map((i)=>`<ellipse cx="${200+i*16}" cy="150" rx="10" ry="40" fill="none" stroke="#b45309" stroke-width="4"/>`).join('')}<rect x="60" y="138" width="80" height="24" fill="#2563eb"/>${label(100,128,'← magnet out','#1e3a8a',10)}<circle cx="320" cy="220" r="26" fill="#fff" stroke="#334155" stroke-width="3"/><line x1="320" y1="220" x2="302" y2="208" stroke="#dc2626" stroke-width="3"/>${label(200,265,'Move magnet → make electricity','#1e3a8a',11)}`) },
    ],
  },
  {
    slug: 'rock-cycle',
    title: 'The Rock Cycle',
    subject: 'Science',
    classLevel: 'Class 6–9',
    intro: 'See how the three types of rock change into one another over millions of years.',
    whyItMatters: 'Igneous, sedimentary and metamorphic rocks and how they transform is key to geography and earth science.',
    practice: { label: 'Practice Rocks questions', tab: 'arena' },
    steps: [
      { caption: 'Hot molten rock (MAGMA) cools and hardens to form IGNEOUS rock — like granite and basalt.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><path d="M120 230 L200 90 L280 230 Z" fill="#f97316"/>${label(200,200,'cools →','#fff',12)}<rect x="150" y="200" width="100" height="30" fill="#6b7280"/>${label(200,250,'Igneous rock','#374151',12)}`) },
      { caption: 'Wind and water break rocks into tiny bits. These settle in layers and get pressed together into SEDIMENTARY rock — like sandstone.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/>${[0,1,2,3].map((i)=>`<rect x="80" y="${110+i*28}" width="240" height="26" fill="${['#fcd34d','#fbbf24','#f59e0b','#d97706'][i]}"/>`).join('')}${label(200,250,'Sedimentary (layers)','#92400e',12)}`) },
      { caption: 'Deep underground, heat and pressure change rocks into METAMORPHIC rock — like marble and slate. Melt it again and the cycle repeats!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f5f3ff"/><rect x="110" y="120" width="180" height="70" rx="6" fill="#a78bfa"/>${[130,160,190,220,250].map((x)=>`<path d="M${x} 125 q6 30 0 60" stroke="#6d28d9" stroke-width="3" fill="none"/>`).join('')}${label(200,150,'heat + pressure','#fff',11)}${label(200,235,'Metamorphic rock','#5b21b6',12)}`) },
    ],
  },
  {
    slug: 'greenhouse-effect',
    title: 'The Greenhouse Effect',
    subject: 'Science',
    classLevel: 'Class 7–10',
    intro: 'See how greenhouse gases trap the Sun’s heat and keep the Earth warm — and why too much of it causes global warming.',
    whyItMatters: 'The greenhouse effect explains climate change — one of the most important real-world science topics, asked across science and geography.',
    practice: { label: 'Practice Environment questions', tab: 'arena' },
    steps: [
      { caption: 'Sunlight passes through the atmosphere and warms the Earth’s surface.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#dbeafe"/><circle cx="60" cy="50" r="22" fill="#fbbf24"/>${[110,140,170].map((x)=>`<line x1="${x}" y1="60" x2="${x+30}" y2="200" stroke="#facc15" stroke-width="4"/>`).join('')}<rect x="0" y="230" width="400" height="70" fill="#65a30d"/>${label(200,270,'Earth warms up','#fff',12)}`) },
      { caption: 'The warm Earth gives off HEAT (infrared). GREENHOUSE GASES (CO₂, methane) in the air trap some of this heat instead of letting it escape.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#bfdbfe"/><path d="M40 70 H360" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6 6"/>${label(200,55,'Greenhouse gas layer','#475569',11)}<rect x="0" y="230" width="400" height="70" fill="#65a30d"/>${[120,200,280].map((x)=>`<line x1="${x}" y1="225" x2="${x}" y2="85" stroke="#dc2626" stroke-width="3" marker-end="url(#gh)"/><line x1="${x}" y1="85" x2="${x+18}" y2="160" stroke="#f97316" stroke-width="3"/>`).join('')}<defs><marker id="gh" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#dc2626"/></marker></defs>${label(200,200,'heat trapped & sent back','#7f1d1d',11)}`) },
      { caption: 'A little greenhouse effect keeps Earth warm enough for life. But burning fuels adds EXTRA CO₂ — trapping more heat and causing GLOBAL WARMING.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fee2e2"/><circle cx="200" cy="120" r="50" fill="#fca5a5"/>${label(200,123,'Earth','#7f1d1d',12)}<path d="M150 75 Q200 50 250 75" fill="none" stroke="#dc2626" stroke-width="4"/>${label(200,210,'Too much CO₂ → global warming','#991b1b',12)}<text x="320" y="240" font-size="30" text-anchor="middle">🏭</text>`) },
    ],
  },
  {
    slug: 'refraction-of-light',
    title: 'Refraction of Light',
    subject: 'Physics',
    classLevel: 'Class 8–10',
    intro: 'See why a straw looks bent in water — light changes direction when it passes between air and glass or water.',
    whyItMatters: 'Refraction explains lenses, the human eye, mirages and why pools look shallow — a core optics concept with many numericals.',
    practice: { label: 'Practice Refraction questions', tab: 'arena' },
    steps: [
      { caption: 'Light travels in a straight line through air. When it hits a denser medium (glass) at an angle, it BENDS.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0f9ff"/><rect x="150" y="60" width="100" height="180" fill="#bae6fd" opacity="0.6"/>${label(200,50,'Glass slab','#0369a1',11)}<line x1="40" y1="90" x2="150" y2="140" stroke="#facc15" stroke-width="3"/>${label(90,110,'incident ray','#a16207',9)}`) },
      { caption: 'Entering the glass, light bends TOWARDS the normal (slows down). Leaving it, light bends AWAY from the normal (speeds up).', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0f9ff"/><rect x="150" y="60" width="100" height="180" fill="#bae6fd" opacity="0.6"/><line x1="150" y1="40" x2="150" y2="240" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"/><line x1="40" y1="90" x2="150" y2="140" stroke="#facc15" stroke-width="3"/><line x1="150" y1="140" x2="250" y2="170" stroke="#f59e0b" stroke-width="3"/>${label(200,200,'bends towards normal','#92400e',9)}`) },
      { caption: 'The ray comes out parallel to how it went in, just shifted sideways. This bending is why a straw in water looks broken!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0f9ff"/><rect x="150" y="60" width="100" height="180" fill="#bae6fd" opacity="0.6"/><line x1="40" y1="90" x2="150" y2="140" stroke="#facc15" stroke-width="3"/><line x1="150" y1="140" x2="250" y2="170" stroke="#f59e0b" stroke-width="3"/><line x1="250" y1="170" x2="360" y2="220" stroke="#facc15" stroke-width="3"/>${label(200,265,'emerges parallel, shifted','#0369a1',11)}`) },
    ],
  },
  {
    slug: 'series-and-parallel-circuits',
    title: 'Series vs Parallel Circuits',
    subject: 'Physics',
    classLevel: 'Class 7–10',
    intro: 'See the two ways to connect bulbs — and why your home wiring uses one but not the other.',
    whyItMatters: 'Series vs parallel decides whether one broken bulb stops the rest — key to circuits, resistance and household wiring.',
    practice: { label: 'Practice Electricity questions', tab: 'arena' },
    steps: [
      { caption: 'In a SERIES circuit, bulbs are joined end-to-end in one loop. The same current flows through each.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fffbeb"/><rect x="60" y="200" width="40" height="24" fill="#f59e0b"/><rect x="80" y="80" width="240" height="120" fill="none" stroke="#334155" stroke-width="3"/><circle cx="160" cy="80" r="16" fill="#fde047" stroke="#ca8a04" stroke-width="2"/><circle cx="240" cy="80" r="16" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>${label(200,250,'Series: one loop','#92400e',12)}`) },
      { caption: 'Problem with series: if ONE bulb breaks, the loop opens and ALL bulbs go off — like old fairy lights.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fef2f2"/><rect x="60" y="200" width="40" height="24" fill="#f59e0b"/><rect x="80" y="80" width="240" height="120" fill="none" stroke="#334155" stroke-width="3"/><circle cx="160" cy="80" r="16" fill="#e2e8f0" stroke="#dc2626" stroke-width="3"/><line x1="150" y1="70" x2="170" y2="90" stroke="#dc2626" stroke-width="3"/><circle cx="240" cy="80" r="16" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>${label(200,250,'One breaks → all go off','#991b1b',12)}`) },
      { caption: 'In a PARALLEL circuit, each bulb is on its own branch. If one breaks, the others stay ON — that’s why homes use parallel wiring!', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#ecfdf5"/><rect x="60" y="200" width="40" height="24" fill="#f59e0b"/><rect x="100" y="80" width="220" height="120" fill="none" stroke="#334155" stroke-width="3"/><line x1="160" y1="80" x2="160" y2="200" stroke="#334155" stroke-width="3"/><line x1="240" y1="80" x2="240" y2="200" stroke="#334155" stroke-width="3"/><circle cx="160" cy="140" r="15" fill="#fde047" stroke="#ca8a04" stroke-width="2"/><circle cx="240" cy="140" r="15" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>${label(200,250,'Parallel: each on its own branch','#14532d',11)}`) },
    ],
  },
  {
    slug: 'transport-in-plants',
    title: 'Transport in Plants',
    subject: 'Biology',
    classLevel: 'Class 9–10',
    intro: 'See how water and food move through a plant using two special pipelines — xylem and phloem.',
    whyItMatters: 'Xylem (water up) and phloem (food everywhere) are essential to plant life and a common exam diagram.',
    practice: { label: 'Practice Plant Transport questions', tab: 'arena' },
    steps: [
      { caption: 'Roots absorb WATER and minerals from the soil.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><line x1="200" y1="80" x2="200" y2="220" stroke="#15803d" stroke-width="10"/><path d="M200 220 q-30 20 -50 40 M200 220 q30 20 50 40" stroke="#92400e" stroke-width="5" fill="none"/>${label(200,290,'Roots absorb water','#1d4ed8',12)}`) },
      { caption: 'XYLEM tubes carry the water UPWARDS from the roots to the leaves — a one-way trip up.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#eff6ff"/><line x1="200" y1="60" x2="200" y2="240" stroke="#15803d" stroke-width="12"/>${[100,140,180].map((y)=>`<path d="M196 ${y} l4 -10 l4 10" fill="none" stroke="#1d4ed8" stroke-width="3"/>`).join('')}${label(280,150,'Xylem: water ↑','#1d4ed8',12)}`) },
      { caption: 'Leaves make food by photosynthesis. PHLOEM tubes carry this FOOD to every part of the plant — both up and down.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#fefce8"/><line x1="200" y1="60" x2="200" y2="240" stroke="#15803d" stroke-width="12"/><ellipse cx="200" cy="60" rx="50" ry="26" fill="#22c55e"/>${[110,150,190].map((y)=>`<path d="M204 ${y} l4 10 l4 -10" fill="none" stroke="#a16207" stroke-width="3"/>`).join('')}${label(290,160,'Phloem: food ↕','#a16207',12)}`) },
    ],
  },
  {
    slug: 'magnetic-field-lines',
    title: 'Magnetic Field of a Bar Magnet',
    subject: 'Physics',
    classLevel: 'Class 6–10',
    intro: 'See the invisible field around a magnet and why opposite poles attract while like poles repel.',
    whyItMatters: 'Magnetic field lines, poles and attraction/repulsion are the basis of magnetism, compasses and electric motors.',
    practice: { label: 'Practice Magnetism questions', tab: 'arena' },
    steps: [
      { caption: 'Every bar magnet has two poles — NORTH (N) and SOUTH (S). The magnetic force is strongest at the poles.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f8fafc"/><rect x="120" y="130" width="80" height="40" fill="#ef4444"/><rect x="200" y="130" width="80" height="40" fill="#3b82f6"/>${label(160,155,'N','#fff',16)}${label(240,155,'S','#fff',16)}`) },
      { caption: 'Invisible FIELD LINES run from N to S outside the magnet. Iron filings line up along them to reveal the field.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f8fafc"/><rect x="150" y="135" width="50" height="30" fill="#ef4444"/><rect x="200" y="135" width="50" height="30" fill="#3b82f6"/>${[30,60,90].map((r)=>`<path d="M175 135 A ${r} ${r} 0 0 0 225 135" fill="none" stroke="#7c3aed" stroke-width="2"/><path d="M175 165 A ${r} ${r} 0 0 1 225 165" fill="none" stroke="#7c3aed" stroke-width="2"/>`).join('')}${label(200,260,'Field lines: N → S','#5b21b6',11)}`) },
      { caption: 'OPPOSITE poles (N–S) ATTRACT — field lines join up. LIKE poles (N–N) REPEL — field lines push apart.', svg: FRAME(`<rect width="400" height="300" rx="14" fill="#f0fdf4"/><rect x="60" y="80" width="40" height="26" fill="#ef4444"/><rect x="100" y="80" width="40" height="26" fill="#3b82f6"/><rect x="260" y="80" width="40" height="26" fill="#ef4444"/><rect x="300" y="80" width="40" height="26" fill="#ef4444"/>${label(100,135,'N–S attract ✓','#15803d',11)}${label(300,135,'N–N repel ✗','#b91c1c',11)}<path d="M150 200 H190" stroke="#15803d" stroke-width="3" marker-end="url(#ma)"/><path d="M250 200 H210" stroke="#dc2626" stroke-width="3" marker-end="url(#mb)"/><defs><marker id="ma" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#15803d"/></marker><marker id="mb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#dc2626"/></marker></defs>${label(200,235,'attract / repel','#334155',11)}`) },
    ],
  },
];

export function getVisualLesson(slug: string): VisualLesson | undefined {
  return VISUAL_LESSONS.find((l) => l.slug === slug);
}
