#!/usr/bin/env python3
"""
Generate all missing state exam mock test JSON files.
This script creates 7 additional mocks for each of 8 state exams (56 files total).
"""

import json
import random
import os
from pathlib import Path

# Configuration
EXAMS = {
    'wbjee': {'questions': 75, 'duration': 120, 'subjects': {'Physics': 25, 'Chemistry': 25, 'Mathematics': 25}},
    'tnea': {'questions': 60, 'duration': 90, 'subjects': {'Physics': 20, 'Chemistry': 20, 'Mathematics': 20}},
    'upsee': {'questions': 100, 'duration': 180, 'subjects': {'Physics': 34, 'Chemistry': 33, 'Mathematics': 33}},
    'mhtcet': {'questions': 150, 'duration': 180, 'subjects': {'Physics': 50, 'Chemistry': 50, 'Mathematics': 50}},
    'kcet': {'questions': 60, 'duration': 80, 'subjects': {'Physics': 20, 'Chemistry': 20, 'Mathematics': 20}},
    'comedk': {'questions': 180, 'duration': 180, 'subjects': {'Physics': 60, 'Chemistry': 60, 'Mathematics': 60}},
    'gujcet': {'questions': 80, 'duration': 120, 'subjects': {'Physics': 27, 'Chemistry': 27, 'Mathematics': 26}},
    'ojee': {'questions': 60, 'duration': 60, 'subjects': {'Physics': 20, 'Chemistry': 20, 'Mathematics': 20}},
}

# Question Pool
PHYSICS_QUESTIONS = [
    ("What is the SI unit of acceleration?", ["m/s", "m/s²", "m/s³", "km/s²"], 1, "Acceleration is measured in meters per second squared (m/s²)."),
    ("A body undergoes uniform acceleration. Its velocity changes from 0 to 20 m/s in 5s. Distance covered is:", ["20m", "40m", "50m", "100m"], 2, "s = ut + (1/2)at². a = 20/5 = 4 m/s². s = 0 + (1/2)(4)(25) = 50m."),
    ("The angle of incidence equals angle of reflection according to:", ["Snell's law", "Law of reflection", "Faraday's law", "Coulomb's law"], 1, "This is the law of reflection."),
    ("Young's double slit experiment shows:", ["Particle nature", "Wave nature", "Both", "Neither"], 1, "The interference pattern demonstrates the wave nature of light."),
    ("What is the direction of magnetic force on a current-carrying conductor?", ["Along current", "Perpendicular to current", "Opposite to current", "Depends on B field"], 1, "F = IL × B. Force is perpendicular to both current and magnetic field."),
    ("A spring with spring constant 100 N/m is stretched by 0.1 m. What is the elastic potential energy?", ["0.5 J", "1 J", "5 J", "10 J"], 0, "Elastic PE = (1/2)kx² = (1/2)(100)(0.01) = 0.5 J."),
    ("What is the relative velocity if two bodies move towards each other at 30 m/s and 20 m/s?", ["10 m/s", "50 m/s", "30 m/s", "20 m/s"], 1, "Relative velocity = 30 + 20 = 50 m/s."),
    ("A projectile is launched at 45° with initial velocity 20 m/s. Maximum height reached is:", ["10 m", "20 m", "5 m", "15 m"], 0, "h = (v₀² sin²θ)/(2g) = (400 × 0.5)/(20) = 10 m."),
    ("The refractive index of a material is 1.5. Critical angle for total internal reflection is:", ["30°", "45°", "41.8°", "60°"], 2, "θc = sin⁻¹(1/n) = sin⁻¹(1/1.5) ≈ 41.8°."),
    ("What is the SI unit of electric field strength?", ["Tesla", "Newton per Coulomb", "Joule per Coulomb", "Ampere per meter"], 1, "E = F/q has units of Newton/Coulomb or V/m."),
    ("A conductor carries 5 A. Charge in 2 seconds is:", ["2.5 C", "10 C", "20 C", "0.4 C"], 1, "Q = I × t = 5 × 2 = 10 C."),
    ("SI unit of current:", ["Volt", "Ohm", "Ampere", "Watt"], 2, "SI unit of electric current is Ampere."),
    ("Work done by gravity on object raised vertically is:", ["Positive", "Negative", "Zero", "Depends on speed"], 1, "Work is negative when moving upward."),
    ("Magnetic field at center of circular loop:", ["B = μ₀I/2R", "B = μ₀I/4R", "B = μ₀I/R", "B = μ₀I/πR"], 0, "B = μ₀I/2R at center of loop."),
    ("SI unit of mass:", ["Pound", "Gram", "Kilogram", "Ounce"], 2, "SI unit of mass is kilogram."),
    ("Vector quantity:", ["Temperature", "Velocity", "Mass", "Time"], 1, "Velocity is a vector (has magnitude and direction)."),
    ("Power = Work/Time. SI unit:", ["Newton", "Joule", "Watt", "Pascal"], 2, "Power is measured in Watts (J/s)."),
    ("SI unit of velocity:", ["m/s²", "m/s", "km/h", "cm/s"], 1, "SI unit of velocity is m/s."),
    ("Negative acceleration is called:", ["Deceleration", "Acceleration", "Motion", "Force"], 0, "Negative acceleration is called deceleration."),
    ("Work is a:", ["Vector", "Scalar", "Tensor", "Neither"], 1, "Work is a scalar quantity."),
]

CHEMISTRY_QUESTIONS = [
    ("What is the valency of carbon in CO₂?", ["2", "3", "4", "1"], 2, "Carbon exhibits a valency of 4 in CO₂."),
    ("Strongest acid among these:", ["HCl", "HF", "HBr", "HI"], 3, "HI is the strongest acid among hydrogen halides."),
    ("pH of neutral solution at 25°C:", ["5", "7", "8", "10"], 1, "Neutral solution has pH = 7."),
    ("Molar mass of Ca(OH)₂. (Ca = 40, O = 16, H = 1):", ["57 g/mol", "74 g/mol", "90 g/mol", "88 g/mol"], 1, "Molar mass = 40 + 2(17) = 74 g/mol."),
    ("Oxidation state of nitrogen in NO₃⁻:", ["+3", "+5", "+6", "-3"], 1, "In NO₃⁻: x + 3(-2) = -1, so x = +5."),
    ("Empirical formula of glucose:", ["C₆H₁₂O₆", "CH₂O", "C₂H₄O₂", "CHO"], 1, "Empirical formula is CH₂O."),
    ("Which compound shows isomerism?", ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"], 3, "Butane has structural isomers."),
    ("Order of hydracid strength:", ["HF > HCl > HBr > HI", "HI > HBr > HCl > HF", "All equal", "Depends on concentration"], 1, "Strength increases down: HI > HBr > HCl > HF."),
    ("Maximum oxidation state:", ["Cr in CrO₄²⁻", "Mn in MnO₄⁻", "V in VO₄³⁻", "Fe in FeO₄²⁻"], 1, "Mn has +7 oxidation state in MnO₄⁻."),
    ("Functional group in ketones:", ["C=O", "OH", "CHO", "COOH"], 0, "Ketones have C=O (carbonyl) group."),
    ("Electronic configuration of Cl⁻:", ["[Ne]3s²3p⁵", "[Ne]3s²3p⁶", "[Ar]", "[Ne]3s¹"], 1, "Cl⁻ gains one electron: [Ne]3s²3p⁶."),
    ("Ammonia is basic because:", ["It donates H⁺", "It accepts H⁺", "It is neutral", "It decomposes"], 1, "NH₃ accepts H⁺ ions."),
    ("One mole contains:", ["Mass of atom", "Unit of volume", "6.022×10²³ particles", "Unit of temperature"], 2, "Avogadro's number = 6.022×10²³."),
    ("Greenhouse gas:", ["O₂", "N₂", "CO₂", "H₂"], 2, "CO₂ is a major greenhouse gas."),
    ("Electronegativity increases in:", ["Left to right in period", "Right to left in period", "Top to bottom in group", "Bottom to top in group"], 0, "Increases from left to right across a period."),
    ("SN2 reaction stereochemistry:", ["Retention", "Inversion", "Mixture", "Depends on substrate"], 1, "SN2 undergoes inversion (Walden inversion)."),
    ("pH scale range:", ["0 to 10", "0 to 14", "1 to 14", "0 to 7"], 1, "pH ranges from 0 to 14."),
    ("Atomic number of Iron:", ["24", "25", "26", "27"], 2, "Iron (Fe) has atomic number 26."),
    ("Boiling point increases with:", ["Molecular weight", "Temperature", "Pressure", "Density"], 2, "Increases with pressure."),
    ("First ionization energy increases with:", ["Atomic number in period", "Atomic number in group", "Temperature", "Pressure"], 0, "Increases left to right in a period."),
]

MATHEMATICS_QUESTIONS = [
    ("Derivative of x³:", ["3x", "3x²", "x²", "x³"], 1, "d/dx(x³) = 3x²."),
    ("If sin θ = 3/5, cos θ = ?", ["4/5", "3/4", "5/3", "1/5"], 0, "Using sin²θ + cos²θ = 1: cosθ = 4/5."),
    ("Sum of roots of x² - 5x + 6 = 0:", ["5", "6", "-5", "1"], 0, "Sum = -b/a = 5."),
    ("Limit of (x² - 4)/(x - 2) as x→2:", ["0", "2", "4", "∞"], 2, "= lim(x→2) (x + 2) = 4."),
    ("Area of triangle with base 10 cm, height 8 cm:", ["40 cm²", "80 cm²", "20 cm²", "160 cm²"], 0, "Area = (1/2) × 10 × 8 = 40 cm²."),
    ("|−5| = ?", ["−5", "5", "0", "10"], 1, "Absolute value |−5| = 5."),
    ("Minimum value of x² + 4x + 5:", ["1", "2", "4", "5"], 0, "(x+2)² + 1, minimum = 1."),
    ("Value of i²:", ["0", "1", "−1", "2"], 2, "i² = −1 by definition."),
    ("If tan θ = 3/4, sin θ = ?", ["3/5", "4/5", "3/4", "5/4"], 0, "sin θ = 3/5 (in right triangle)."),
    ("Domain of f(x) = 1/(x-2):", ["All real numbers", "x ≠ 2", "x > 2", "x < 2"], 1, "Undefined when x = 2."),
    ("Value of log₁₀(100):", ["1", "2", "10", "100"], 1, "log₁₀(10²) = 2."),
    ("∫2x dx:", ["2", "x²", "x² + C", "2x + C"], 2, "Power rule: x² + C."),
    ("7 + 3 × 2 = ?", ["13", "20", "26", "10"], 0, "7 + 6 = 13."),
    ("Sum of first n odd numbers:", ["n", "n²", "2n", "n(n+1)/2"], 1, "1 + 3 + 5 + ... = n²."),
    ("Value of tan(30°):", ["1", "1/√3", "√3", "∞"], 1, "tan(30°) = 1/√3."),
    ("d/dx(x^x):", ["x^(x-1)", "x^x(1+ln x)", "x^x·ln x", "x^x"], 1, "d/dx(x^x) = x^x(1 + ln x)."),
    ("Distance from (1,1) to x+y=0:", ["1", "√2", "2", "1/√2"], 1, "Distance = 2/√2 = √2."),
    ("(a+b)² = ?", ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "a² - b²"], 1, "(a+b)² = a² + 2ab + b²."),
    ("sec(0°) = ?", ["0", "1", "undefined", "∞"], 1, "sec(0°) = 1/cos(0°) = 1."),
    ("d/dx(5) = ?", ["5", "1", "0", "x"], 2, "Derivative of constant is 0."),
]

BASE_DIR = Path(__file__).parent.parent
MOCKS_DIR = BASE_DIR / 'public' / 'mocks'

def generate_question_id(subject_abbr, counter):
    """Generate unique question ID"""
    return f"{subject_abbr}_{str(counter).zfill(3)}"

def get_random_questions(subject, count):
    """Get random questions from pool"""
    if subject == 'Physics':
        pool = PHYSICS_QUESTIONS
    elif subject == 'Chemistry':
        pool = CHEMISTRY_QUESTIONS
    else:
        pool = MATHEMATICS_QUESTIONS

    questions = []
    for _ in range(count):
        q = random.choice(pool)
        questions.append({
            'question': q[0],
            'options': q[1],
            'answer': q[2],
            'explanation': q[3],
        })
    return questions

def create_mock(exam, mock_num):
    """Create a mock test"""
    config = EXAMS[exam]
    questions = []
    q_counter = 1

    for subject, count in config['subjects'].items():
        subject_abbr = {
            'Physics': 'p',
            'Chemistry': 'c',
            'Mathematics': 'm',
        }[subject]

        for q_data in get_random_questions(subject, count):
            difficulties = ['easy', 'medium', 'hard']
            q_id = f"{exam}_{subject_abbr}_{str(q_counter).zfill(3)}"
            q_counter += 1

            questions.append({
                'id': q_id,
                'subject': subject,
                'chapter': 'General',
                'difficulty': random.choice(difficulties),
                'question': q_data['question'],
                'options': q_data['options'],
                'correctAnswer': q_data['answer'],
                'explanation': q_data['explanation'],
                'year': 2024,
                'source': 'AI-Generated',
                'exam': exam.upper(),
                'marks': 1,
                'negativeMarks': -0.25,
            })

    mock = {
        'id': f"{exam}_mock_{mock_num}",
        'title': f"{exam.upper()} Full Mock Test {mock_num}",
        'type': 'full',
        'classScope': '11+12',
        'duration': config['duration'],
        'totalQuestions': config['questions'],
        'negativeMarking': True,
        'subjects': config['subjects'],
        'questions': questions,
    }

    return mock

def main():
    """Generate all missing mocks"""
    print('Generating missing state exam mocks...\n')

    exams_to_generate = [
        ('wbjee', [4, 5, 6, 7, 8, 9, 10]),
        ('tnea', [4, 5, 6, 7, 8, 9, 10]),
        ('upsee', [4, 5, 6, 7, 8, 9, 10]),
        ('mhtcet', [4, 5, 6, 7, 8, 9, 10]),
        ('kcet', [4, 5, 6, 7, 8, 9, 10]),
        ('comedk', [4, 5, 6, 7, 8, 9, 10]),
        ('gujcet', [4, 5, 6, 7, 8, 9, 10]),
        ('ojee', [4, 5, 6, 7, 8, 9, 10]),
    ]

    total = 0
    errors = []

    for exam, mocks in exams_to_generate:
        exam_dir = MOCKS_DIR / exam
        print(f'{exam.upper()}: ', end='', flush=True)

        for mock_num in mocks:
            try:
                mock = create_mock(exam, mock_num)
                filepath = exam_dir / f'{exam}-mock-{mock_num}.json'

                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(mock, f, ensure_ascii=False)

                print('.', end='', flush=True)
                total += 1
            except Exception as e:
                errors.append(f'{exam}-mock-{mock_num}: {str(e)}')
                print('E', end='', flush=True)

        print()

    print(f'\nGenerated {total} mock files')

    if errors:
        print('\nErrors:')
        for err in errors:
            print(f'  - {err}')
    else:
        print('All mocks generated successfully!')

if __name__ == '__main__':
    main()
