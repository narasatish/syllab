/**
 * Chemistry Formulas — Classes 9–12
 * NCERT curriculum aligned
 */

import type { FormulaSubject } from '../formulaBank';

export const chemistryFormulaData: FormulaSubject = {
  id: 'chemistry',
  label: 'Chemistry',
  icon: '🧪',
  gradient: 'from-emerald-500 to-teal-600',
  textColor: 'text-emerald-700',
  sections: [
    {
      classLabel: 'Class 9–10',
      topics: [
        {
          topic: 'Mole Concept',
          items: [
            { name: 'Number of Moles', formula: 'n = mass (g) / Molar mass (g/mol)', variables: 'n = moles, Molar mass from periodic table' },
            { name: "Avogadro's Number", formula: 'N = n × Nₐ = n × 6.022×10²³', variables: 'N = number of particles' },
            { name: 'Molar Volume (STP)', formula: '1 mole of any gas = 22.4 L at STP', variables: 'STP = 0°C, 1 atm' },
            { name: 'Molar Mass', formula: 'M = m/n', variables: 'm = mass (g), n = moles' },
          ],
        },
        {
          topic: 'Atomic Structure',
          items: [
            { name: 'Atomic Number', formula: 'Z = number of protons', variables: 'For neutral atom: protons = electrons' },
            { name: 'Mass Number', formula: 'A = protons + neutrons', variables: 'Neutrons = A − Z' },
            { name: 'Max electrons per shell', formula: 'Max = 2n²', variables: 'n = shell number (1,2,3...)' },
            { name: 'Electron Configuration', formula: '1s² 2s² 2p⁶ 3s² 3p⁶...', variables: 'Aufbau principle order' },
          ],
        },
        {
          topic: 'Chemical Equations',
          items: [
            { name: 'Percentage Composition', formula: '% element = (mass of element / molar mass of compound) × 100', variables: '' },
            { name: 'Empirical Formula', formula: 'Divide % by atomic mass, then divide by smallest', variables: 'Gives simplest whole number ratio' },
            { name: 'Combustion Analysis', formula: 'Moles of C from CO₂; Moles of H from H₂O', variables: '' },
          ],
        },
        {
          topic: 'Acids, Bases & Salts',
          items: [
            { name: 'pH Scale', formula: 'pH = −log[H⁺]', variables: '[H⁺] = concentration of H⁺ ions in mol/L' },
            { name: 'pOH Scale', formula: 'pOH = −log[OH⁻]', variables: '[OH⁻] = concentration of OH⁻ ions' },
            { name: 'pH + pOH', formula: 'pH + pOH = 14 (at 25°C)', variables: '' },
            { name: 'Neutralization', formula: 'acid + base → salt + water', variables: 'H⁺ + OH⁻ → H₂O' },
            { name: 'Acid Strength (Ka)', formula: 'Ka = [H⁺][A⁻]/[HA]', variables: 'Larger Ka = stronger acid' },
            { name: 'Base Strength (Kb)', formula: 'Kb = [B⁺][OH⁻]/[BOH]', variables: 'Larger Kb = stronger base' },
          ],
        },
        {
          topic: 'Metals & Non-metals',
          items: [
            { name: 'Activity Series', formula: 'K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au', variables: 'More reactive metals displace less reactive' },
            { name: 'Reactivity with O₂', formula: 'Metals burn to form oxides (e.g., 2Mg + O₂ → 2MgO)', variables: '' },
            { name: 'Reactivity with Water', formula: 'Alkali metals + H₂O → Metal hydroxide + H₂', variables: '2Na + 2H₂O → 2NaOH + H₂' },
            { name: 'Reactivity with Acids', formula: 'Active metals + acid → salt + H₂', variables: 'Mg + 2HCl → MgCl₂ + H₂' },
          ],
        },
        {
          topic: 'Carbon & Organic Compounds',
          items: [
            { name: 'Homologous Series', formula: 'Alkane: CₙH₂ₙ₊₂; Alkene: CₙH₂ₙ; Alkyne: CₙH₂ₙ₋₂', variables: 'Differ by CH₂ unit' },
            { name: 'Functional Groups', formula: '−OH (alcohol), −CHO (aldehyde), −COOH (carboxylic acid)', variables: 'Determine chemical properties' },
            { name: 'Combustion of Hydrocarbons', formula: 'CₙH₂ₘ + (n + m/4)O₂ → nCO₂ + (m/2)H₂O', variables: '' },
          ],
        },
      ],
    },
    {
      classLabel: 'Class 11–12',
      topics: [
        {
          topic: 'Gas Laws',
          items: [
            { name: "Boyle's Law", formula: 'P₁V₁ = P₂V₂ (constant T)', variables: 'P = pressure, V = volume' },
            { name: "Charles's Law", formula: 'V₁/T₁ = V₂/T₂ (constant P)', variables: 'T must be in Kelvin: K = °C + 273' },
            { name: 'Combined Gas Law', formula: 'P₁V₁/T₁ = P₂V₂/T₂', variables: '' },
            { name: 'Ideal Gas', formula: 'PV = nRT', variables: 'R = 0.0821 L·atm/mol·K or 8.314 J/mol·K' },
            { name: 'Dalton Law (Partial Pressure)', formula: 'P_total = P₁ + P₂ + P₃...', variables: 'Each gas exerts independent pressure' },
          ],
        },
        {
          topic: 'Equilibrium',
          items: [
            { name: 'Equilibrium Constant (Kc)', formula: 'Kc = [C]^c[D]^d / [A]^a[B]^b', variables: 'For aA + bB ⇌ cC + dD' },
            { name: 'Equilibrium Constant (Kp)', formula: 'Kp = (Pc)^c(Pd)^d / (Pa)^a(Pb)^b', variables: 'Using partial pressures' },
            { name: 'Relation between Kp and Kc', formula: 'Kp = Kc(RT)^Δn', variables: 'Δn = moles of products − moles of reactants' },
            { name: "Le Chatelier's Principle", formula: 'System shifts to counteract disturbance', variables: 'If pressure increases, shifts to fewer moles' },
            { name: 'pH Definition', formula: 'pH = −log[H⁺]', variables: '[H⁺] in mol/L' },
            { name: 'Henderson-Hasselbalch', formula: 'pH = pKa + log([A⁻]/[HA])', variables: 'For weak acid buffer solution' },
          ],
        },
        {
          topic: 'Thermodynamics',
          items: [
            { name: 'Enthalpy Change', formula: 'ΔH = ΔU + Δ(PV)', variables: 'ΔU = change in internal energy' },
            { name: 'Enthalpy Change (gases)', formula: 'ΔH = ΔU + ΔnₘRT', variables: 'Δnₘ = change in moles of gas' },
            { name: "Gibbs Energy", formula: 'ΔG = ΔH − TΔS', variables: 'ΔG < 0: spontaneous at this temperature' },
            { name: 'Spontaneity Criterion', formula: 'If ΔG < 0: spontaneous; ΔG > 0: non-spontaneous; ΔG = 0: equilibrium', variables: '' },
            { name: "Hess's Law", formula: 'ΔH(rxn) = ΣΔHf°(products) − ΣΔHf°(reactants)', variables: 'Standard enthalpy of formation' },
            { name: 'Entropy Change', formula: 'ΔS = qrev/T', variables: 'T = absolute temperature' },
          ],
        },
        {
          topic: 'Electrochemistry',
          items: [
            { name: 'Reduction-Oxidation', formula: 'Oxidation = loss of electrons; Reduction = gain of electrons', variables: 'OIL RIG mnemonic' },
            { name: 'Faraday First Law', formula: 'm = ZIt', variables: 'm = mass deposited (g), Z = electrochemical equivalent, I = current (A), t = time (s)' },
            { name: 'Electrochemical Equivalent', formula: 'Z = M / (nF)', variables: 'M = molar mass, n = electrons, F = 96500 C/mol' },
            { name: 'Nernst Equation', formula: 'E = E° − (0.0592/n) log Q (at 25°C)', variables: 'E° = standard potential, Q = reaction quotient' },
            { name: 'Cell EMF', formula: 'E°cell = E°cathode − E°anode', variables: 'Positive = spontaneous' },
            { name: 'Gibbs-Helmholtz', formula: 'ΔG° = −nFE°', variables: 'n = moles of electrons, F = Faraday constant' },
          ],
        },
        {
          topic: 'Chemical Kinetics',
          items: [
            { name: 'Rate Law', formula: 'Rate = k[A]ᵐ[B]ⁿ', variables: 'k = rate constant, m,n = orders of reaction' },
            { name: 'Order of Reaction', formula: 'Overall order = sum of individual orders', variables: '' },
            { name: 'First Order Rate', formula: 'ln[A] = −kt + ln[A₀]', variables: '[A] = concentration at time t' },
            { name: 'First Order Half-Life', formula: 't½ = 0.693/k', variables: 't½ = time for half the reactant to react' },
            { name: 'Integrated Rate Law (0th order)', formula: '[A] = [A₀] − kt', variables: '' },
            { name: 'Arrhenius Equation', formula: 'k = Ae^(−Eₐ/RT)', variables: 'Eₐ = activation energy, A = frequency factor, R = 8.314 J/mol·K' },
            { name: 'Collision Theory', formula: 'Rate = collision frequency × steric factor × fraction with E ≥ Eₐ', variables: '' },
          ],
        },
        {
          topic: 'Organic Chemistry (Reactions)',
          items: [
            { name: 'Addition Reaction', formula: 'Alkene + H₂ → Alkane (with catalyst)', variables: 'Breaks C=C double bond' },
            { name: 'Substitution Reaction', formula: 'R−H + X₂ → R−X + HX (free radical)', variables: 'Common in alkanes' },
            { name: 'Elimination Reaction', formula: 'Alcohol → Alkene + H₂O (with heat and H₂SO₄)', variables: '→ produces unsaturated compound' },
            { name: 'Polymerization', formula: 'nC₂H₄ → (−C₂H₄−)ₙ', variables: 'Monomers form long chains' },
          ],
        },
        {
          topic: 'Coordination Compounds',
          items: [
            { name: "Werner's Theory", formula: 'Coordination sphere [M(L)ₙ]^q', variables: 'M = metal, L = ligands, n = coordination number' },
            { name: 'Coordination Number', formula: 'Number of ligands directly bonded to metal center', variables: 'Usually 4 or 6' },
            { name: 'Coordination Isomerism', formula: '[Co(NH₃)₆][Cr(CN)₆] vs [Cr(NH₃)₆][Co(CN)₆]', variables: 'Exchange of ligands between metal centers' },
            { name: 'Crystal Field Splitting Energy', formula: 'CFSE depends on d-orbital splitting', variables: 'Octahedral > Tetrahedral > Square planar' },
          ],
        },
        {
          topic: 'Nuclear Chemistry',
          items: [
            { name: 'Radioactive Decay', formula: 'λ = 0.693 / t½', variables: 'λ = decay constant, t½ = half-life' },
            { name: 'Half-Life', formula: 'N(t) = N₀ × (½)^(t/t½)', variables: 'N = number of nuclei remaining' },
            { name: 'Activity', formula: 'A = λN', variables: 'Decay rate (disintegrations per second)' },
            { name: 'Nuclear Binding Energy', formula: 'BE = (Zmp + Nmn − mnucleus)c²', variables: 'mp = proton mass, mn = neutron mass' },
            { name: 'Mass Defect', formula: 'Δm = Zmp + Nmn − mnucleus', variables: '' },
            { name: 'Fission Reaction', formula: 'Heavy nucleus → lighter fragments + energy + neutrons', variables: '235U + n → fission products' },
            { name: 'Fusion Reaction', formula: 'Light nuclei → heavier nucleus + energy', variables: '²H + ³H → ⁴He + n + energy' },
          ],
        },
      ],
    },
  ],
};
