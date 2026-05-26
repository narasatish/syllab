/**
 * Physics Formulas — Classes 9–12
 * NCERT curriculum aligned
 */

import type { FormulaSubject } from '../formulaBank';

export const physicsFormulaData: FormulaSubject = {
  id: 'physics',
  label: 'Physics',
  icon: '⚡',
  gradient: 'from-amber-500 to-orange-600',
  textColor: 'text-amber-700',
  sections: [
    {
      classLabel: 'Class 9–10',
      topics: [
        {
          topic: 'Motion',
          items: [
            { name: 'Speed', formula: 'v = d/t', variables: 'v = speed, d = distance, t = time' },
            { name: 'Velocity', formula: 'v = s/t', variables: 'v = velocity (vector), s = displacement' },
            { name: 'Acceleration', formula: 'a = (v−u)/t', variables: 'v = final velocity, u = initial velocity, t = time' },
            { name: 'First Equation of Motion', formula: 'v = u + at', variables: 'u = initial, v = final velocity, a = acceleration, t = time' },
            { name: 'Second Equation of Motion', formula: 's = ut + ½at²', variables: 's = displacement' },
            { name: 'Third Equation of Motion', formula: 'v² = u² + 2as', variables: 's = displacement' },
          ],
        },
        {
          topic: 'Force & Laws of Motion',
          items: [
            { name: "Newton's First Law", formula: 'An object remains at rest unless acted upon by force', variables: 'Law of Inertia' },
            { name: "Newton's Second Law", formula: 'F = ma', variables: 'F = force (N), m = mass (kg), a = acceleration (m/s²)' },
            { name: "Newton's Third Law", formula: 'Action = Reaction (equal and opposite)', variables: '' },
            { name: 'Momentum', formula: 'p = mv', variables: 'p = momentum (kg·m/s), m = mass, v = velocity' },
            { name: 'Impulse', formula: 'J = F × t = Δp', variables: 'J = impulse, F = force, t = time' },
          ],
        },
        {
          topic: 'Work, Energy & Power',
          items: [
            { name: 'Work Done', formula: 'W = F × d × cos θ', variables: 'F = force, d = displacement, θ = angle between F and d' },
            { name: 'Kinetic Energy', formula: 'KE = ½mv²', variables: 'm = mass, v = velocity' },
            { name: 'Potential Energy', formula: 'PE = mgh', variables: 'm = mass, g = 9.8 m/s², h = height' },
            { name: 'Work-Energy Theorem', formula: 'W = ΔKE = ½m(v₂² − v₁²)', variables: '' },
            { name: 'Power', formula: 'P = W/t', variables: 'P = power (W), W = work (J), t = time (s)' },
            { name: 'Power (alternative)', formula: 'P = F·v = Fv cos θ', variables: '' },
          ],
        },
        {
          topic: 'Gravitation',
          items: [
            { name: "Newton's Law of Gravitation", formula: 'F = G·m₁m₂/r²', variables: 'G = 6.67×10⁻¹¹ N·m²/kg², m₁,m₂ = masses, r = distance' },
            { name: 'g on Earth', formula: 'g = GM/R² ≈ 9.8 m/s²', variables: 'M = Earth mass, R = Earth radius' },
            { name: 'Weight', formula: 'W = mg', variables: 'm = mass (kg), g = 9.8 m/s²' },
            { name: 'Gravitational Potential', formula: 'V = −GM/r', variables: '' },
          ],
        },
        {
          topic: 'Sound',
          items: [
            { name: 'Sound Speed', formula: 'v = f × λ', variables: 'f = frequency (Hz), λ = wavelength (m)' },
            { name: 'Speed in Air', formula: 'v ≈ 343 m/s at 20°C', variables: 'Depends on temperature: v increases ~0.6 m/s per °C' },
            { name: 'Decibel Scale', formula: 'L = 10 log(I/I₀)', variables: 'I = intensity, I₀ = reference intensity = 10⁻¹² W/m²' },
            { name: 'Echo Condition', formula: 'Distance = (v × t) / 2', variables: 'v = sound speed, t = time for echo to return' },
            { name: 'Doppler Effect', formula: 'f′ = f(v ± v_observer)/(v ∓ v_source)', variables: 'Upper sign: source/observer approaching' },
          ],
        },
        {
          topic: 'Light & Refraction',
          items: [
            { name: 'Refractive Index', formula: 'n = c/v', variables: 'c = speed of light in vacuum, v = speed in medium' },
            { name: "Snell's Law (Refraction)", formula: 'n₁ sin θ₁ = n₂ sin θ₂', variables: 'n = refractive index, θ = angle with normal' },
            { name: 'Critical Angle', formula: 'sin θc = n₂/n₁ (when n₂ < n₁)', variables: 'Total internal reflection occurs when θ > θc' },
            { name: 'Lens Formula', formula: '1/f = 1/v + 1/u', variables: 'v = image distance, u = object distance, f = focal length (can be negative)' },
            { name: 'Magnification (Lens)', formula: 'm = v/u = h_image/h_object', variables: 'm > 0: virtual, m < 0: real' },
          ],
        },
        {
          topic: 'Electricity',
          items: [
            { name: "Ohm's Law", formula: 'V = IR', variables: 'V = Voltage (V), I = Current (A), R = Resistance (Ω)' },
            { name: 'Resistance', formula: 'R = ρL/A', variables: 'ρ = resistivity, L = length, A = cross-section area' },
            { name: 'Electric Power', formula: 'P = VI = I²R = V²/R', variables: 'P = power (W)' },
            { name: 'Electric Energy', formula: 'E = P × t = VIt', variables: 'E = energy (J), t = time (s)' },
            { name: 'Resistors in Series', formula: 'R_total = R₁ + R₂ + R₃', variables: 'Same current through all' },
            { name: 'Resistors in Parallel', formula: '1/R_total = 1/R₁ + 1/R₂ + 1/R₃', variables: 'Same voltage across all' },
          ],
        },
        {
          topic: 'Magnetism',
          items: [
            { name: 'Magnetic Force on Current', formula: 'F = BIL sin θ', variables: 'B = magnetic field, I = current, L = length of conductor' },
            { name: 'Magnetic Force on Charge', formula: 'F = qvB sin θ', variables: 'q = charge, v = velocity, B = magnetic field' },
            { name: 'Lorentz Force', formula: 'F = q(E + v × B)', variables: 'Combined electric and magnetic force' },
          ],
        },
      ],
    },
    {
      classLabel: 'Class 11–12',
      topics: [
        {
          topic: 'Rotational Motion',
          items: [
            { name: 'Angular Velocity', formula: 'ω = θ/t', variables: 'θ = angle (radians), t = time' },
            { name: 'Angular Acceleration', formula: 'α = (ω₂ − ω₁)/t', variables: '' },
            { name: 'Torque', formula: 'τ = I·α', variables: 'I = moment of inertia, α = angular acceleration' },
            { name: 'Angular Momentum', formula: 'L = I·ω', variables: 'I = moment of inertia, ω = angular velocity' },
            { name: 'Rotational Kinetic Energy', formula: 'KE_rot = ½Iω²', variables: 'I = moment of inertia' },
            { name: 'Moment of Inertia (point)', formula: 'I = mr²', variables: 'r = distance from axis' },
          ],
        },
        {
          topic: 'Fluid Mechanics',
          items: [
            { name: "Bernoulli's Equation", formula: 'P + ½ρv² + ρgh = constant', variables: 'P = pressure, ρ = density, v = velocity, h = height' },
            { name: "Pascal's Law", formula: 'Pressure in fluids transmits equally in all directions', variables: '' },
            { name: "Archimedes' Principle", formula: 'Buoyant force = Weight of fluid displaced', variables: 'F_b = ρVg' },
            { name: 'Continuity Equation', formula: 'A₁v₁ = A₂v₂', variables: 'A = cross-section, v = velocity' },
            { name: 'Stokes Law', formula: 'F = 6πηrv', variables: 'η = viscosity, r = radius, v = velocity' },
          ],
        },
        {
          topic: 'Thermodynamics',
          items: [
            { name: 'First Law', formula: 'ΔU = Q − W', variables: 'ΔU = change in internal energy, Q = heat added, W = work done by system' },
            { name: 'Ideal Gas Law', formula: 'PV = nRT', variables: 'P = pressure, V = volume, n = moles, R = 8.314 J/mol·K, T = temp (K)' },
            { name: 'Efficiency (Carnot)', formula: 'η = 1 − T₂/T₁', variables: 'T₁ = hot reservoir (K), T₂ = cold reservoir (K)' },
            { name: 'Specific Heat Capacity', formula: 'Q = mcΔT', variables: 'Q = heat, m = mass, c = specific heat, ΔT = temperature change' },
          ],
        },
        {
          topic: 'Waves & Oscillations',
          items: [
            { name: 'Wave Speed', formula: 'v = fλ', variables: 'f = frequency (Hz), λ = wavelength (m)' },
            { name: 'Time Period', formula: 'T = 1/f', variables: 'T = time period (s), f = frequency (Hz)' },
            { name: 'Simple Harmonic Motion', formula: 'y = A sin(ωt + φ)', variables: 'A = amplitude, ω = angular frequency, φ = phase' },
            { name: 'Simple Pendulum Period', formula: 'T = 2π√(L/g)', variables: 'L = length of pendulum (m), g = 9.8 m/s²' },
            { name: 'Spring-Mass Period', formula: 'T = 2π√(m/k)', variables: 'k = spring constant' },
          ],
        },
        {
          topic: 'Optics (Advanced)',
          items: [
            { name: "Snell's Law", formula: 'n₁ sin θ₁ = n₂ sin θ₂', variables: 'n = refractive index, θ = angle with normal' },
            { name: 'Critical Angle', formula: 'sin θc = n₂/n₁ (when light from denser to rarer)', variables: '' },
            { name: 'Lens Formula', formula: '1/v − 1/u = 1/f (REAL: −ve, VIRTUAL: +ve)', variables: '' },
            { name: 'Magnification (Lens)', formula: 'm = v/u = h_i/h_o', variables: '' },
            { name: 'Mirror Formula', formula: '1/v + 1/u = 1/f = 2/R', variables: 'R = radius of curvature' },
            { name: 'Power of Lens', formula: 'P = 1/f (in meters)', variables: 'P in diopters (D), 1 diopter = 1 m⁻¹' },
          ],
        },
        {
          topic: 'Electrostatics',
          items: [
            { name: "Coulomb's Law", formula: 'F = k·q₁q₂/r²', variables: 'k = 9×10⁹ N·m²/C², q = charge (C), r = distance (m)' },
            { name: 'Electric Field', formula: 'E = F/q', variables: 'Force per unit charge' },
            { name: 'Electric Field (point charge)', formula: 'E = kQ/r²', variables: '' },
            { name: 'Electric Potential', formula: 'V = W/q', variables: 'Work done to move unit charge' },
            { name: 'Capacitance', formula: 'C = Q/V', variables: 'Q = charge, V = potential difference' },
            { name: 'Parallel Plate Capacitor', formula: 'C = ε₀εᵣA/d', variables: 'ε₀ = 8.854×10⁻¹² F/m, εᵣ = relative permittivity, A = area, d = distance' },
          ],
        },
        {
          topic: 'Electromagnetic Induction',
          items: [
            { name: "Faraday's Law", formula: 'EMF = −dΦ/dt', variables: 'Φ = magnetic flux' },
            { name: "Lenz's Law", formula: 'Induced current opposes the change in magnetic flux', variables: '' },
            { name: 'Magnetic Flux', formula: 'Φ = BA cos θ', variables: 'B = magnetic field, A = area, θ = angle' },
            { name: 'Transformer Equation', formula: 'Ns/Np = Vs/Vp = Ip/Is', variables: 'Ns,Np = turns, Vs,Vp = voltages, I = currents' },
          ],
        },
        {
          topic: 'Alternating Current',
          items: [
            { name: 'RMS Voltage', formula: 'Vrms = V₀/√2', variables: 'V₀ = peak voltage' },
            { name: 'RMS Current', formula: 'Irms = I₀/√2', variables: 'I₀ = peak current' },
            { name: 'Impedance', formula: 'Z = √(R² + X²)', variables: 'X = XL − Xc (net reactance)' },
            { name: 'Inductive Reactance', formula: 'XL = ωL = 2πfL', variables: 'L = inductance, f = frequency' },
            { name: 'Capacitive Reactance', formula: 'Xc = 1/(ωC) = 1/(2πfC)', variables: 'C = capacitance' },
            { name: 'AC Power', formula: 'P = Vrms × Irms × cos φ', variables: 'φ = phase angle' },
            { name: 'Resonance Frequency', formula: 'fr = 1/(2π√LC)', variables: 'XL = Xc at resonance' },
          ],
        },
        {
          topic: 'Modern Physics',
          items: [
            { name: "Planck's Equation", formula: 'E = hf', variables: 'h = 6.626×10⁻³⁴ J·s, f = frequency' },
            { name: 'Photon Energy', formula: 'E = hc/λ', variables: 'c = 3×10⁸ m/s, λ = wavelength' },
            { name: 'de Broglie Wavelength', formula: 'λ = h/mv = h/p', variables: 'm = mass, v = velocity, p = momentum' },
            { name: 'Mass-Energy Equivalence', formula: 'E = mc²', variables: 'c = 3×10⁸ m/s' },
            { name: 'Photoelectric Effect', formula: 'K.E.max = hf − φ', variables: 'φ = work function' },
          ],
        },
      ],
    },
  ],
};
