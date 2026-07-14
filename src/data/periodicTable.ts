// All 118 chemical elements with IUPAC standard atomic weights and accurate periodic table positions
// Data verified against IUPAC standard atomic weights (2021–2023)

export interface Element {
  z: number;
  symbol: string;
  name: string;
  mass: string;
  category: 'alkali-metal' | 'alkaline-earth-metal' | 'transition-metal' | 'post-transition-metal' | 'metalloid' | 'reactive-nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
  group: number | null;
  period: number;
  xpos: number;
  ypos: number;
  phase: 'solid' | 'liquid' | 'gas';
  config: string;
}

export const ELEMENTS: Element[] = [
  // Period 1
  { z: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008', category: 'reactive-nonmetal', group: 1, period: 1, xpos: 1, ypos: 1, phase: 'gas', config: '1s1' },
  { z: 2, symbol: 'He', name: 'Helium', mass: '4.0026', category: 'noble-gas', group: 18, period: 1, xpos: 18, ypos: 1, phase: 'gas', config: '1s2' },
  // Period 2
  { z: 3, symbol: 'Li', name: 'Lithium', mass: '6.94', category: 'alkali-metal', group: 1, period: 2, xpos: 1, ypos: 2, phase: 'solid', config: '[He] 2s1' },
  { z: 4, symbol: 'Be', name: 'Beryllium', mass: '9.0122', category: 'alkaline-earth-metal', group: 2, period: 2, xpos: 2, ypos: 2, phase: 'solid', config: '[He] 2s2' },
  { z: 5, symbol: 'B', name: 'Boron', mass: '10.81', category: 'metalloid', group: 13, period: 2, xpos: 13, ypos: 2, phase: 'solid', config: '[He] 2s2 2p1' },
  { z: 6, symbol: 'C', name: 'Carbon', mass: '12.011', category: 'reactive-nonmetal', group: 14, period: 2, xpos: 14, ypos: 2, phase: 'solid', config: '[He] 2s2 2p2' },
  { z: 7, symbol: 'N', name: 'Nitrogen', mass: '14.007', category: 'reactive-nonmetal', group: 15, period: 2, xpos: 15, ypos: 2, phase: 'gas', config: '[He] 2s2 2p3' },
  { z: 8, symbol: 'O', name: 'Oxygen', mass: '15.999', category: 'reactive-nonmetal', group: 16, period: 2, xpos: 16, ypos: 2, phase: 'gas', config: '[He] 2s2 2p4' },
  { z: 9, symbol: 'F', name: 'Fluorine', mass: '18.998', category: 'reactive-nonmetal', group: 17, period: 2, xpos: 17, ypos: 2, phase: 'gas', config: '[He] 2s2 2p5' },
  { z: 10, symbol: 'Ne', name: 'Neon', mass: '20.1797', category: 'noble-gas', group: 18, period: 2, xpos: 18, ypos: 2, phase: 'gas', config: '[He] 2s2 2p6' },
  // Period 3
  { z: 11, symbol: 'Na', name: 'Sodium', mass: '22.98976928', category: 'alkali-metal', group: 1, period: 3, xpos: 1, ypos: 3, phase: 'solid', config: '[Ne] 3s1' },
  { z: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.305', category: 'alkaline-earth-metal', group: 2, period: 3, xpos: 2, ypos: 3, phase: 'solid', config: '[Ne] 3s2' },
  { z: 13, symbol: 'Al', name: 'Aluminum', mass: '26.9815385', category: 'post-transition-metal', group: 13, period: 3, xpos: 13, ypos: 3, phase: 'solid', config: '[Ne] 3s2 3p1' },
  { z: 14, symbol: 'Si', name: 'Silicon', mass: '28.085', category: 'metalloid', group: 14, period: 3, xpos: 14, ypos: 3, phase: 'solid', config: '[Ne] 3s2 3p2' },
  { z: 15, symbol: 'P', name: 'Phosphorus', mass: '30.97376163', category: 'reactive-nonmetal', group: 15, period: 3, xpos: 15, ypos: 3, phase: 'solid', config: '[Ne] 3s2 3p3' },
  { z: 16, symbol: 'S', name: 'Sulfur', mass: '32.06', category: 'reactive-nonmetal', group: 16, period: 3, xpos: 16, ypos: 3, phase: 'solid', config: '[Ne] 3s2 3p4' },
  { z: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45', category: 'reactive-nonmetal', group: 17, period: 3, xpos: 17, ypos: 3, phase: 'gas', config: '[Ne] 3s2 3p5' },
  { z: 18, symbol: 'Ar', name: 'Argon', mass: '39.948', category: 'noble-gas', group: 18, period: 3, xpos: 18, ypos: 3, phase: 'gas', config: '[Ne] 3s2 3p6' },
  // Period 4
  { z: 19, symbol: 'K', name: 'Potassium', mass: '39.0983', category: 'alkali-metal', group: 1, period: 4, xpos: 1, ypos: 4, phase: 'solid', config: '[Ar] 4s1' },
  { z: 20, symbol: 'Ca', name: 'Calcium', mass: '40.078', category: 'alkaline-earth-metal', group: 2, period: 4, xpos: 2, ypos: 4, phase: 'solid', config: '[Ar] 4s2' },
  { z: 21, symbol: 'Sc', name: 'Scandium', mass: '44.955908', category: 'transition-metal', group: 3, period: 4, xpos: 3, ypos: 4, phase: 'solid', config: '[Ar] 3d1 4s2' },
  { z: 22, symbol: 'Ti', name: 'Titanium', mass: '47.867', category: 'transition-metal', group: 4, period: 4, xpos: 4, ypos: 4, phase: 'solid', config: '[Ar] 3d2 4s2' },
  { z: 23, symbol: 'V', name: 'Vanadium', mass: '50.9415', category: 'transition-metal', group: 5, period: 4, xpos: 5, ypos: 4, phase: 'solid', config: '[Ar] 3d3 4s2' },
  { z: 24, symbol: 'Cr', name: 'Chromium', mass: '51.9961', category: 'transition-metal', group: 6, period: 4, xpos: 6, ypos: 4, phase: 'solid', config: '[Ar] 3d5 4s1' },
  { z: 25, symbol: 'Mn', name: 'Manganese', mass: '54.938044', category: 'transition-metal', group: 7, period: 4, xpos: 7, ypos: 4, phase: 'solid', config: '[Ar] 3d5 4s2' },
  { z: 26, symbol: 'Fe', name: 'Iron', mass: '55.845', category: 'transition-metal', group: 8, period: 4, xpos: 8, ypos: 4, phase: 'solid', config: '[Ar] 3d6 4s2' },
  { z: 27, symbol: 'Co', name: 'Cobalt', mass: '58.933194', category: 'transition-metal', group: 9, period: 4, xpos: 9, ypos: 4, phase: 'solid', config: '[Ar] 3d7 4s2' },
  { z: 28, symbol: 'Ni', name: 'Nickel', mass: '58.6934', category: 'transition-metal', group: 10, period: 4, xpos: 10, ypos: 4, phase: 'solid', config: '[Ar] 3d8 4s2' },
  { z: 29, symbol: 'Cu', name: 'Copper', mass: '63.546', category: 'transition-metal', group: 11, period: 4, xpos: 11, ypos: 4, phase: 'solid', config: '[Ar] 3d10 4s1' },
  { z: 30, symbol: 'Zn', name: 'Zinc', mass: '65.38', category: 'transition-metal', group: 12, period: 4, xpos: 12, ypos: 4, phase: 'solid', config: '[Ar] 3d10 4s2' },
  { z: 31, symbol: 'Ga', name: 'Gallium', mass: '69.723', category: 'post-transition-metal', group: 13, period: 4, xpos: 13, ypos: 4, phase: 'solid', config: '[Ar] 3d10 4s2 4p1' },
  { z: 32, symbol: 'Ge', name: 'Germanium', mass: '72.630', category: 'metalloid', group: 14, period: 4, xpos: 14, ypos: 4, phase: 'solid', config: '[Ar] 3d10 4s2 4p2' },
  { z: 33, symbol: 'As', name: 'Arsenic', mass: '74.921595', category: 'metalloid', group: 15, period: 4, xpos: 15, ypos: 4, phase: 'solid', config: '[Ar] 3d10 4s2 4p3' },
  { z: 34, symbol: 'Se', name: 'Selenium', mass: '78.971', category: 'reactive-nonmetal', group: 16, period: 4, xpos: 16, ypos: 4, phase: 'solid', config: '[Ar] 3d10 4s2 4p4' },
  { z: 35, symbol: 'Br', name: 'Bromine', mass: '79.904', category: 'reactive-nonmetal', group: 17, period: 4, xpos: 17, ypos: 4, phase: 'liquid', config: '[Ar] 3d10 4s2 4p5' },
  { z: 36, symbol: 'Kr', name: 'Krypton', mass: '83.798', category: 'noble-gas', group: 18, period: 4, xpos: 18, ypos: 4, phase: 'gas', config: '[Ar] 3d10 4s2 4p6' },
  // Period 5
  { z: 37, symbol: 'Rb', name: 'Rubidium', mass: '85.4678', category: 'alkali-metal', group: 1, period: 5, xpos: 1, ypos: 5, phase: 'solid', config: '[Kr] 5s1' },
  { z: 38, symbol: 'Sr', name: 'Strontium', mass: '87.62', category: 'alkaline-earth-metal', group: 2, period: 5, xpos: 2, ypos: 5, phase: 'solid', config: '[Kr] 5s2' },
  { z: 39, symbol: 'Y', name: 'Yttrium', mass: '88.90584', category: 'transition-metal', group: 3, period: 5, xpos: 3, ypos: 5, phase: 'solid', config: '[Kr] 4d1 5s2' },
  { z: 40, symbol: 'Zr', name: 'Zirconium', mass: '91.224', category: 'transition-metal', group: 4, period: 5, xpos: 4, ypos: 5, phase: 'solid', config: '[Kr] 4d2 5s2' },
  { z: 41, symbol: 'Nb', name: 'Niobium', mass: '92.90637', category: 'transition-metal', group: 5, period: 5, xpos: 5, ypos: 5, phase: 'solid', config: '[Kr] 4d4 5s1' },
  { z: 42, symbol: 'Mo', name: 'Molybdenum', mass: '95.95', category: 'transition-metal', group: 6, period: 5, xpos: 6, ypos: 5, phase: 'solid', config: '[Kr] 4d5 5s1' },
  { z: 43, symbol: 'Tc', name: 'Technetium', mass: '[98]', category: 'transition-metal', group: 7, period: 5, xpos: 7, ypos: 5, phase: 'solid', config: '[Kr] 4d5 5s2' },
  { z: 44, symbol: 'Ru', name: 'Ruthenium', mass: '101.07', category: 'transition-metal', group: 8, period: 5, xpos: 8, ypos: 5, phase: 'solid', config: '[Kr] 4d7 5s1' },
  { z: 45, symbol: 'Rh', name: 'Rhodium', mass: '102.90550', category: 'transition-metal', group: 9, period: 5, xpos: 9, ypos: 5, phase: 'solid', config: '[Kr] 4d8 5s1' },
  { z: 46, symbol: 'Pd', name: 'Palladium', mass: '106.42', category: 'transition-metal', group: 10, period: 5, xpos: 10, ypos: 5, phase: 'solid', config: '[Kr] 4d10' },
  { z: 47, symbol: 'Ag', name: 'Silver', mass: '107.8682', category: 'transition-metal', group: 11, period: 5, xpos: 11, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s1' },
  { z: 48, symbol: 'Cd', name: 'Cadmium', mass: '112.414', category: 'transition-metal', group: 12, period: 5, xpos: 12, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s2' },
  { z: 49, symbol: 'In', name: 'Indium', mass: '114.818', category: 'post-transition-metal', group: 13, period: 5, xpos: 13, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s2 5p1' },
  { z: 50, symbol: 'Sn', name: 'Tin', mass: '118.711', category: 'post-transition-metal', group: 14, period: 5, xpos: 14, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s2 5p2' },
  { z: 51, symbol: 'Sb', name: 'Antimony', mass: '121.760', category: 'metalloid', group: 15, period: 5, xpos: 15, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s2 5p3' },
  { z: 52, symbol: 'Te', name: 'Tellurium', mass: '127.60', category: 'metalloid', group: 16, period: 5, xpos: 16, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s2 5p4' },
  { z: 53, symbol: 'I', name: 'Iodine', mass: '126.90447', category: 'reactive-nonmetal', group: 17, period: 5, xpos: 17, ypos: 5, phase: 'solid', config: '[Kr] 4d10 5s2 5p5' },
  { z: 54, symbol: 'Xe', name: 'Xenon', mass: '131.293', category: 'noble-gas', group: 18, period: 5, xpos: 18, ypos: 5, phase: 'gas', config: '[Kr] 4d10 5s2 5p6' },
  // Period 6
  { z: 55, symbol: 'Cs', name: 'Cesium', mass: '132.90545196', category: 'alkali-metal', group: 1, period: 6, xpos: 1, ypos: 6, phase: 'solid', config: '[Xe] 6s1' },
  { z: 56, symbol: 'Ba', name: 'Barium', mass: '137.327', category: 'alkaline-earth-metal', group: 2, period: 6, xpos: 2, ypos: 6, phase: 'solid', config: '[Xe] 6s2' },
  // Lanthanides (Period 6, displayed at ypos: 9)
  { z: 57, symbol: 'La', name: 'Lanthanum', mass: '138.90547', category: 'lanthanide', group: null, period: 6, xpos: 3, ypos: 9, phase: 'solid', config: '[Xe] 5d1 6s2' },
  { z: 58, symbol: 'Ce', name: 'Cerium', mass: '140.116', category: 'lanthanide', group: null, period: 6, xpos: 4, ypos: 9, phase: 'solid', config: '[Xe] 4f1 5d1 6s2' },
  { z: 59, symbol: 'Pr', name: 'Praseodymium', mass: '140.90766', category: 'lanthanide', group: null, period: 6, xpos: 5, ypos: 9, phase: 'solid', config: '[Xe] 4f3 6s2' },
  { z: 60, symbol: 'Nd', name: 'Neodymium', mass: '144.242', category: 'lanthanide', group: null, period: 6, xpos: 6, ypos: 9, phase: 'solid', config: '[Xe] 4f4 6s2' },
  { z: 61, symbol: 'Pm', name: 'Promethium', mass: '[145]', category: 'lanthanide', group: null, period: 6, xpos: 7, ypos: 9, phase: 'solid', config: '[Xe] 4f5 6s2' },
  { z: 62, symbol: 'Sm', name: 'Samarium', mass: '150.36', category: 'lanthanide', group: null, period: 6, xpos: 8, ypos: 9, phase: 'solid', config: '[Xe] 4f6 6s2' },
  { z: 63, symbol: 'Eu', name: 'Europium', mass: '151.964', category: 'lanthanide', group: null, period: 6, xpos: 9, ypos: 9, phase: 'solid', config: '[Xe] 4f7 6s2' },
  { z: 64, symbol: 'Gd', name: 'Gadolinium', mass: '157.25', category: 'lanthanide', group: null, period: 6, xpos: 10, ypos: 9, phase: 'solid', config: '[Xe] 4f7 5d1 6s2' },
  { z: 65, symbol: 'Tb', name: 'Terbium', mass: '158.92535', category: 'lanthanide', group: null, period: 6, xpos: 11, ypos: 9, phase: 'solid', config: '[Xe] 4f9 6s2' },
  { z: 66, symbol: 'Dy', name: 'Dysprosium', mass: '162.500', category: 'lanthanide', group: null, period: 6, xpos: 12, ypos: 9, phase: 'solid', config: '[Xe] 4f10 6s2' },
  { z: 67, symbol: 'Ho', name: 'Holmium', mass: '164.93033', category: 'lanthanide', group: null, period: 6, xpos: 13, ypos: 9, phase: 'solid', config: '[Xe] 4f11 6s2' },
  { z: 68, symbol: 'Er', name: 'Erbium', mass: '167.259', category: 'lanthanide', group: null, period: 6, xpos: 14, ypos: 9, phase: 'solid', config: '[Xe] 4f12 6s2' },
  { z: 69, symbol: 'Tm', name: 'Thulium', mass: '168.93422', category: 'lanthanide', group: null, period: 6, xpos: 15, ypos: 9, phase: 'solid', config: '[Xe] 4f13 6s2' },
  { z: 70, symbol: 'Yb', name: 'Ytterbium', mass: '173.045', category: 'lanthanide', group: null, period: 6, xpos: 16, ypos: 9, phase: 'solid', config: '[Xe] 4f14 6s2' },
  { z: 71, symbol: 'Lu', name: 'Lutetium', mass: '174.9668', category: 'lanthanide', group: null, period: 6, xpos: 17, ypos: 9, phase: 'solid', config: '[Xe] 4f14 5d1 6s2' },
  // Back to Period 6 (transition metals)
  { z: 72, symbol: 'Hf', name: 'Hafnium', mass: '178.49', category: 'transition-metal', group: 4, period: 6, xpos: 4, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d2 6s2' },
  { z: 73, symbol: 'Ta', name: 'Tantalum', mass: '180.94788', category: 'transition-metal', group: 5, period: 6, xpos: 5, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d3 6s2' },
  { z: 74, symbol: 'W', name: 'Tungsten', mass: '183.84', category: 'transition-metal', group: 6, period: 6, xpos: 6, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d4 6s2' },
  { z: 75, symbol: 'Re', name: 'Rhenium', mass: '186.207', category: 'transition-metal', group: 7, period: 6, xpos: 7, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d5 6s2' },
  { z: 76, symbol: 'Os', name: 'Osmium', mass: '190.23', category: 'transition-metal', group: 8, period: 6, xpos: 8, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d6 6s2' },
  { z: 77, symbol: 'Ir', name: 'Iridium', mass: '192.217', category: 'transition-metal', group: 9, period: 6, xpos: 9, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d7 6s2' },
  { z: 78, symbol: 'Pt', name: 'Platinum', mass: '195.084', category: 'transition-metal', group: 10, period: 6, xpos: 10, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d9 6s1' },
  { z: 79, symbol: 'Au', name: 'Gold', mass: '196.966569', category: 'transition-metal', group: 11, period: 6, xpos: 11, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d10 6s1' },
  { z: 80, symbol: 'Hg', name: 'Mercury', mass: '200.592', category: 'transition-metal', group: 12, period: 6, xpos: 12, ypos: 6, phase: 'liquid', config: '[Xe] 4f14 5d10 6s2' },
  { z: 81, symbol: 'Tl', name: 'Thallium', mass: '204.38', category: 'post-transition-metal', group: 13, period: 6, xpos: 13, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d10 6s2 6p1' },
  { z: 82, symbol: 'Pb', name: 'Lead', mass: '207.2', category: 'post-transition-metal', group: 14, period: 6, xpos: 14, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d10 6s2 6p2' },
  { z: 83, symbol: 'Bi', name: 'Bismuth', mass: '208.98040', category: 'post-transition-metal', group: 15, period: 6, xpos: 15, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d10 6s2 6p3' },
  { z: 84, symbol: 'Po', name: 'Polonium', mass: '[209]', category: 'post-transition-metal', group: 16, period: 6, xpos: 16, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d10 6s2 6p4' },
  { z: 85, symbol: 'At', name: 'Astatine', mass: '[210]', category: 'metalloid', group: 17, period: 6, xpos: 17, ypos: 6, phase: 'solid', config: '[Xe] 4f14 5d10 6s2 6p5' },
  { z: 86, symbol: 'Rn', name: 'Radon', mass: '[222]', category: 'noble-gas', group: 18, period: 6, xpos: 18, ypos: 6, phase: 'gas', config: '[Xe] 4f14 5d10 6s2 6p6' },
  // Period 7
  { z: 87, symbol: 'Fr', name: 'Francium', mass: '[223]', category: 'alkali-metal', group: 1, period: 7, xpos: 1, ypos: 7, phase: 'solid', config: '[Rn] 7s1' },
  { z: 88, symbol: 'Ra', name: 'Radium', mass: '[226]', category: 'alkaline-earth-metal', group: 2, period: 7, xpos: 2, ypos: 7, phase: 'solid', config: '[Rn] 7s2' },
  // Actinides (Period 7, displayed at ypos: 10)
  { z: 89, symbol: 'Ac', name: 'Actinium', mass: '[227]', category: 'actinide', group: null, period: 7, xpos: 3, ypos: 10, phase: 'solid', config: '[Rn] 6d1 7s2' },
  { z: 90, symbol: 'Th', name: 'Thorium', mass: '232.0377', category: 'actinide', group: null, period: 7, xpos: 4, ypos: 10, phase: 'solid', config: '[Rn] 6d2 7s2' },
  { z: 91, symbol: 'Pa', name: 'Protactinium', mass: '231.03588', category: 'actinide', group: null, period: 7, xpos: 5, ypos: 10, phase: 'solid', config: '[Rn] 5f2 6d1 7s2' },
  { z: 92, symbol: 'U', name: 'Uranium', mass: '238.02891', category: 'actinide', group: null, period: 7, xpos: 6, ypos: 10, phase: 'solid', config: '[Rn] 5f3 6d1 7s2' },
  { z: 93, symbol: 'Np', name: 'Neptunium', mass: '[237]', category: 'actinide', group: null, period: 7, xpos: 7, ypos: 10, phase: 'solid', config: '[Rn] 5f4 6d1 7s2' },
  { z: 94, symbol: 'Pu', name: 'Plutonium', mass: '[244]', category: 'actinide', group: null, period: 7, xpos: 8, ypos: 10, phase: 'solid', config: '[Rn] 5f6 7s2' },
  { z: 95, symbol: 'Am', name: 'Americium', mass: '[243]', category: 'actinide', group: null, period: 7, xpos: 9, ypos: 10, phase: 'solid', config: '[Rn] 5f7 7s2' },
  { z: 96, symbol: 'Cm', name: 'Curium', mass: '[247]', category: 'actinide', group: null, period: 7, xpos: 10, ypos: 10, phase: 'solid', config: '[Rn] 5f7 6d1 7s2' },
  { z: 97, symbol: 'Bk', name: 'Berkelium', mass: '[247]', category: 'actinide', group: null, period: 7, xpos: 11, ypos: 10, phase: 'solid', config: '[Rn] 5f9 7s2' },
  { z: 98, symbol: 'Cf', name: 'Californium', mass: '[251]', category: 'actinide', group: null, period: 7, xpos: 12, ypos: 10, phase: 'solid', config: '[Rn] 5f10 7s2' },
  { z: 99, symbol: 'Es', name: 'Einsteinium', mass: '[252]', category: 'actinide', group: null, period: 7, xpos: 13, ypos: 10, phase: 'solid', config: '[Rn] 5f11 7s2' },
  { z: 100, symbol: 'Fm', name: 'Fermium', mass: '[257]', category: 'actinide', group: null, period: 7, xpos: 14, ypos: 10, phase: 'solid', config: '[Rn] 5f12 7s2' },
  { z: 101, symbol: 'Md', name: 'Mendelevium', mass: '[258]', category: 'actinide', group: null, period: 7, xpos: 15, ypos: 10, phase: 'solid', config: '[Rn] 5f13 7s2' },
  { z: 102, symbol: 'No', name: 'Nobelium', mass: '[259]', category: 'actinide', group: null, period: 7, xpos: 16, ypos: 10, phase: 'solid', config: '[Rn] 5f14 7s2' },
  { z: 103, symbol: 'Lr', name: 'Lawrencium', mass: '[266]', category: 'actinide', group: null, period: 7, xpos: 17, ypos: 10, phase: 'solid', config: '[Rn] 5f14 6d1 7s2' },
  // Back to Period 7 (transition metals & beyond)
  { z: 104, symbol: 'Rf', name: 'Rutherfordium', mass: '[267]', category: 'transition-metal', group: 4, period: 7, xpos: 4, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d2 7s2' },
  { z: 105, symbol: 'Db', name: 'Dubnium', mass: '[268]', category: 'transition-metal', group: 5, period: 7, xpos: 5, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d3 7s2' },
  { z: 106, symbol: 'Sg', name: 'Seaborgium', mass: '[269]', category: 'transition-metal', group: 6, period: 7, xpos: 6, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d4 7s2' },
  { z: 107, symbol: 'Bh', name: 'Bohrium', mass: '[270]', category: 'transition-metal', group: 7, period: 7, xpos: 7, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d5 7s2' },
  { z: 108, symbol: 'Hs', name: 'Hassium', mass: '[277]', category: 'transition-metal', group: 8, period: 7, xpos: 8, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d6 7s2' },
  { z: 109, symbol: 'Mt', name: 'Meitnerium', mass: '[278]', category: 'transition-metal', group: 9, period: 7, xpos: 9, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d7 7s2' },
  { z: 110, symbol: 'Ds', name: 'Darmstadtium', mass: '[281]', category: 'transition-metal', group: 10, period: 7, xpos: 10, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d9 7s1' },
  { z: 111, symbol: 'Rg', name: 'Roentgenium', mass: '[280]', category: 'transition-metal', group: 11, period: 7, xpos: 11, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s1' },
  { z: 112, symbol: 'Cn', name: 'Copernicium', mass: '[285]', category: 'transition-metal', group: 12, period: 7, xpos: 12, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s2' },
  { z: 113, symbol: 'Nh', name: 'Nihonium', mass: '[286]', category: 'post-transition-metal', group: 13, period: 7, xpos: 13, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s2 7p1' },
  { z: 114, symbol: 'Fl', name: 'Flerovium', mass: '[289]', category: 'post-transition-metal', group: 14, period: 7, xpos: 14, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s2 7p2' },
  { z: 115, symbol: 'Mc', name: 'Moscovium', mass: '[290]', category: 'post-transition-metal', group: 15, period: 7, xpos: 15, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s2 7p3' },
  { z: 116, symbol: 'Lv', name: 'Livermorium', mass: '[293]', category: 'post-transition-metal', group: 16, period: 7, xpos: 16, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s2 7p4' },
  { z: 117, symbol: 'Ts', name: 'Tennessine', mass: '[294]', category: 'unknown', group: 17, period: 7, xpos: 17, ypos: 7, phase: 'solid', config: '[Rn] 5f14 6d10 7s2 7p5' },
  { z: 118, symbol: 'Og', name: 'Oganesson', mass: '[294]', category: 'noble-gas', group: 18, period: 7, xpos: 18, ypos: 7, phase: 'gas', config: '[Rn] 5f14 6d10 7s2 7p6' },
];
