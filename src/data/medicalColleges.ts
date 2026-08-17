/**
 * medicalColleges.ts — top MBBS/BDS medical colleges (AIIMS, govt & private) across India.
 * Indicative NEET cutoffs, MBBS fees, seats — verify on official/MCC sites.
 */
export interface MedicalCollege { slug: string; name: string; shortName: string; city: string; state: string; type: string; established: number; nirf: number | null; feesTotal: string; feesPerYear: string; mbbsSeats: number; neetCutoff: string; courses: string[]; exams: string[]; about: string; admissionSteps: string[]; internship: string; accommodation: string; website: string; }
export interface MedStateInfo { slug: string; name: string; emoji: string; blurb: string; exams: string[]; }

export const MEDICAL_STATE_INFO: MedStateInfo[] = [
  {
    "slug": "national",
    "name": "National (AIIMS/Central)",
    "emoji": "🇮🇳",
    "blurb": "AIIMS, JIPMER & central institutes admitting via NEET UG + MCC All-India counselling.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "delhi",
    "name": "Delhi",
    "emoji": "🏛️",
    "blurb": "MAMC, VMMC, UCMS & top Delhi medical colleges via NEET UG (AIQ + Delhi quota).",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "uttar-pradesh",
    "name": "Uttar Pradesh",
    "emoji": "🕌",
    "blurb": "KGMU, IMS-BHU & UP government medical colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "rajasthan",
    "name": "Rajasthan",
    "emoji": "🏰",
    "blurb": "SMS Jaipur & Rajasthan government medical colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "punjab",
    "name": "Punjab",
    "emoji": "🌾",
    "blurb": "Government & private medical colleges of Punjab via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "chandigarh",
    "name": "Chandigarh",
    "emoji": "🌹",
    "blurb": "GMCH & PGIMER Chandigarh via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "madhya-pradesh",
    "name": "Madhya Pradesh",
    "emoji": "🐯",
    "blurb": "Gandhi Medical College Bhopal & MP colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "tamil-nadu",
    "name": "Tamil Nadu",
    "emoji": "🛕",
    "blurb": "Madras Medical College, Stanley, CMC Vellore & top TN colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "kerala",
    "name": "Kerala",
    "emoji": "🌴",
    "blurb": "Thiruvananthapuram, Kozhikode & Kerala medical colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "karnataka",
    "name": "Karnataka",
    "emoji": "🌳",
    "blurb": "BMCRI, KMC Manipal, JSS & St Johns via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "telangana",
    "name": "Telangana",
    "emoji": "🏙️",
    "blurb": "Osmania, Gandhi & Kakatiya medical colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "andhra-pradesh",
    "name": "Andhra Pradesh",
    "emoji": "🌾",
    "blurb": "Andhra Medical College & AP government colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "maharashtra",
    "name": "Maharashtra",
    "emoji": "🌊",
    "blurb": "Seth GS-KEM, Grant, AFMC & top Maharashtra colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "gujarat",
    "name": "Gujarat",
    "emoji": "🦁",
    "blurb": "B.J. Medical College Ahmedabad & Gujarat colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "west-bengal",
    "name": "West Bengal",
    "emoji": "🌉",
    "blurb": "Medical College Kolkata, RG Kar, NRS & IPGMER via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "bihar",
    "name": "Bihar",
    "emoji": "🌅",
    "blurb": "PMCH & Bihar government medical colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  },
  {
    "slug": "odisha",
    "name": "Odisha",
    "emoji": "🛕",
    "blurb": "SCB Cuttack & Odisha medical colleges via NEET UG.",
    "exams": [
      "NEET UG"
    ]
  }
];

export const MEDICAL_COLLEGES: MedicalCollege[] = [
  {
    "slug": "aiims-delhi",
    "name": "All India Institute of Medical Sciences, New Delhi",
    "shortName": "AIIMS Delhi",
    "city": "New Delhi",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 1956,
    "nirf": 1,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 125,
    "neetCutoff": "General closing AIR ~50-60",
    "courses": [
      "MBBS",
      "MD/MS",
      "DM/MCh",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "India's premier medical institution established in 1956, AIIMS Delhi is a leader in medical education, research, and patient care. Known for rigorous training and cutting-edge facilities, it ranks #1 in NIRF. Home to world-class faculty and advanced diagnostic centers, AIIMS Delhi sets national standards in medical excellence.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-bhopal",
    "name": "All India Institute of Medical Sciences, Bhopal",
    "shortName": "AIIMS Bhopal",
    "city": "Bhopal",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2009,
    "nirf": 25,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~400-600",
    "courses": [
      "MBBS",
      "MD/MS",
      "DM/MCh",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Bhopal, established in 2009, combines academic rigor with modern infrastructure and patient-centric care. Located in central India, it serves as a major medical hub for the region with strong emphasis on primary care and community health.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-bhubaneswar",
    "name": "All India Institute of Medical Sciences, Bhubaneswar",
    "shortName": "AIIMS Bhubaneswar",
    "city": "Bhubaneswar",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2013,
    "nirf": 14,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~600-800",
    "courses": [
      "MBBS",
      "MD/MS",
      "DM/MCh",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in 2013, AIIMS Bhubaneswar is a state-of-the-art medical institution serving eastern India. The institute combines traditional medical wisdom with contemporary clinical practice and is recognized for excellence in teaching and research.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-jodhpur",
    "name": "All India Institute of Medical Sciences, Jodhpur",
    "shortName": "AIIMS Jodhpur",
    "city": "Jodhpur",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2013,
    "nirf": 19,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~1,000-1,200",
    "courses": [
      "MBBS",
      "MD/MS",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Jodhpur, established in 2013, serves the northwestern region of India with a strong commitment to medical excellence and rural healthcare. The campus features modern teaching facilities and a patient-friendly environment.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-patna",
    "name": "All India Institute of Medical Sciences, Patna",
    "shortName": "AIIMS Patna",
    "city": "Patna",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2012,
    "nirf": 27,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~800-1,000",
    "courses": [
      "MBBS",
      "MD/MS",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Patna, established in 2012, is a premier medical institute in eastern India committed to providing high-quality medical education and research. It plays a vital role in strengthening healthcare infrastructure in the region.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-raipur",
    "name": "All India Institute of Medical Sciences, Raipur",
    "shortName": "AIIMS Raipur",
    "city": "Raipur",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2013,
    "nirf": 31,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~900-1,100",
    "courses": [
      "MBBS",
      "MD/MS",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Raipur, established in 2013, is a state-of-the-art medical institution serving central India. Known for its comprehensive medical education and emphasis on clinical skill development, it contributes significantly to regional healthcare advancement.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-rishikesh",
    "name": "All India Institute of Medical Sciences, Rishikesh",
    "shortName": "AIIMS Rishikesh",
    "city": "Rishikesh",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2012,
    "nirf": 13,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~500-700",
    "courses": [
      "MBBS",
      "MD/MS",
      "DM/MCh",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Rishikesh, established in 2012, is a premier medical institute in the foothills of the Himalayas. The scenic location combined with advanced medical facilities creates an ideal environment for holistic medical education and patient care.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-nagpur",
    "name": "All India Institute of Medical Sciences, Nagpur",
    "shortName": "AIIMS Nagpur",
    "city": "Nagpur",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2013,
    "nirf": null,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~1,100-1,300",
    "courses": [
      "MBBS",
      "MD/MS",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Nagpur, established in 2013, serves as a major medical education center in the Deccan region. With modern infrastructure and experienced faculty, it focuses on producing competent physicians committed to healthcare excellence.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "aiims-mangalagiri",
    "name": "All India Institute of Medical Sciences, Mangalagiri",
    "shortName": "AIIMS Mangalagiri",
    "city": "Mangalagiri",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2018,
    "nirf": null,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~1,300-1,500",
    "courses": [
      "MBBS",
      "MD/MS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Mangalagiri, established in 2018, is one of the newer AIIMS campuses serving southern India. With state-of-the-art teaching facilities and a growing faculty base, it is rapidly establishing itself as a center of medical excellence.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "jipmer-puducherry",
    "name": "Jawaharlal Institute of Postgraduate Medical Education and Research, Puducherry",
    "shortName": "JIPMER Puducherry",
    "city": "Puducherry",
    "state": "National (AIIMS/Central)",
    "type": "Central Institute",
    "established": 1967,
    "nirf": 4,
    "feesTotal": "₹6,500 approx (full MBBS)",
    "feesPerYear": "₹1,625 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~200-250",
    "courses": [
      "MBBS",
      "MD/MS",
      "DM/MCh",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "JIPMER Puducherry, established in 1967, is a premier medical institution with a rich legacy in postgraduate medical education and research. Known for its research contributions and clinical excellence, it ranks among India's top medical colleges.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "jipmer.edu.in"
  },
  {
    "slug": "pgimer-chandigarh",
    "name": "Postgraduate Institute of Medical Education and Research, Chandigarh",
    "shortName": "PGIMER Chandigarh",
    "city": "Chandigarh",
    "state": "National (AIIMS/Central)",
    "type": "Central Institute",
    "established": 1966,
    "nirf": 2,
    "feesTotal": "₹6,200 approx (full MBBS)",
    "feesPerYear": "₹1,550 approx",
    "mbbsSeats": 0,
    "neetCutoff": "Not applicable (primarily postgraduate)",
    "courses": [
      "MD/MS",
      "DM/MCh",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET PG"
    ],
    "about": "PGIMER Chandigarh, established in 1966, is a premier postgraduate medical institution in northern India. Known for research excellence and advanced clinical training, it offers world-class medical education primarily at postgraduate and superspeciality levels.",
    "admissionSteps": [
      "Pursue MBBS from recognized institute",
      "Qualify NEET PG / national exam",
      "Register for counselling",
      "Seat allotment",
      "Admission formalities"
    ],
    "internship": "Not applicable for MBBS (postgraduate programs only)",
    "accommodation": "On-campus hostels for PG residents",
    "website": "pgimer.edu.in"
  },
  {
    "slug": "aiims-gorakhpur",
    "name": "All India Institute of Medical Sciences, Gorakhpur",
    "shortName": "AIIMS Gorakhpur",
    "city": "Gorakhpur",
    "state": "National (AIIMS/Central)",
    "type": "AIIMS",
    "established": 2017,
    "nirf": null,
    "feesTotal": "₹6,000 approx (full MBBS)",
    "feesPerYear": "₹1,500 approx",
    "mbbsSeats": 100,
    "neetCutoff": "General closing AIR ~1,200-1,400",
    "courses": [
      "MBBS",
      "MD/MS",
      "B.Sc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "AIIMS Gorakhpur, established in 2017, is a modern medical institute serving the eastern Uttar Pradesh region. With contemporary teaching facilities and a dedicated faculty, it aims to produce skilled medical professionals for healthcare delivery.",
    "admissionSteps": [
      "Qualify NEET UG",
      "Register for MCC AIQ counselling",
      "Choice filling",
      "Seat allotment by AIR",
      "Document verification & reporting"
    ],
    "internship": "Compulsory 1-year rotatory internship; stipend ~₹26,000/month (indicative)",
    "accommodation": "On-campus hostels for all MBBS students",
    "website": "aiims.edu"
  },
  {
    "slug": "maulana-azad-medical-college",
    "name": "Maulana Azad Medical College",
    "shortName": "MAMC",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Government",
    "established": 1957,
    "nirf": 26,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 300,
    "neetCutoff": "600",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BSc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "One of India's premier government medical institutions established in 1957. Located in central Delhi, MAMC is known for its cutting-edge research facilities and clinical training. The college has consistently ranked among the top medical colleges in India and is a center of excellence for medical education and research.",
    "admissionSteps": [
      "NEET UG qualification",
      "Merit list preparation based on NEET score",
      "Seat allotment through NEET counseling",
      "Document verification and registration",
      "Commencement of classes"
    ],
    "internship": "Mandatory 12-month rotating internship in various departments including medicine, surgery, obstetrics, pediatrics, and community medicine. Students also undergo training in skill labs and simulation centers.",
    "accommodation": "On-campus hostel facilities for both male and female students. Limited seats; preference given to outstation candidates. Off-campus rental accommodation available in nearby areas.",
    "website": "www.mamc.ac.in"
  },
  {
    "slug": "vmmc-safdarjung-hospital",
    "name": "VMMC & Safdarjung Hospital",
    "shortName": "VMMC",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Government",
    "established": 1960,
    "nirf": 22,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 250,
    "neetCutoff": "580",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in 1960, VMMC & Safdarjung Hospital is a premier government medical institution offering comprehensive medical education and training. Known for its state-of-the-art facilities, high-quality faculty, and strong emphasis on research and clinical excellence.",
    "admissionSteps": [
      "NEET UG qualification",
      "Score-based merit list generation",
      "Counseling and seat allocation",
      "Verification of credentials",
      "Admission confirmation and registration"
    ],
    "internship": "12-month internship with rotations across major departments. Hands-on training in diagnostics, patient care, and emergency medicine. Teaching hospital with high patient load ensures practical experience.",
    "accommodation": "Hostel facilities available for eligible candidates. Modern amenities in hostels. Preference given to female candidates and those from distant states.",
    "website": "www.vmmc.ac.in"
  },
  {
    "slug": "ucms-delhi",
    "name": "University College of Medical Sciences",
    "shortName": "UCMS",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Government",
    "established": 1970,
    "nirf": 38,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 200,
    "neetCutoff": "570",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DNB",
      "BDS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Founded in 1970, UCMS is located in east Delhi and is affiliated with the University of Delhi. The college emphasizes community health, epidemiology, and public health research. It has a strong commitment to training doctors who understand social responsibility and public health.",
    "admissionSteps": [
      "NEET UG score submission",
      "Merit list preparation",
      "Seat allotment through centralized counseling",
      "Document verification",
      "Final admission"
    ],
    "internship": "Comprehensive 12-month internship rotation with focus on community medicine and public health projects. Students work in hospitals and community health centers.",
    "accommodation": "Hostel accommodation for male and female students. Proximity to Delhi University campus offers additional facilities. Decent on-campus living standards.",
    "website": "www.ucmsdelhi.ac.in"
  },
  {
    "slug": "lady-hardinge-medical-college",
    "name": "Lady Hardinge Medical College",
    "shortName": "LHMC",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Government",
    "established": 1916,
    "nirf": 32,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 150,
    "neetCutoff": "560",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "BSc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "India's first medical college for women, established in 1916. Located in central Delhi, LHMC has a rich legacy of producing competent physicians. The college maintains high academic standards and is equipped with modern teaching facilities and research labs.",
    "admissionSteps": [
      "NEET UG qualification",
      "Female candidates eligible for MBBS seats",
      "Merit-based seat allocation",
      "Counseling process",
      "Registration and admission finalization"
    ],
    "internship": "12-month internship with clinical rotations in major and minor specialties. Training in government hospitals and attached nursing homes.",
    "accommodation": "Hostel facilities available for both undergraduate and postgraduate students. Well-maintained dormitories with modern amenities. Preference for outstation candidates.",
    "website": "www.lhmc.ac.in"
  },
  {
    "slug": "jamia-hamdard",
    "name": "Jamia Hamdard - Hamdard Institute of Medical Sciences and Research",
    "shortName": "Hamdard",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Private/Deemed",
    "established": 1989,
    "nirf": 40,
    "feesTotal": "6500000",
    "feesPerYear": "1300000",
    "mbbsSeats": 100,
    "neetCutoff": "480",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "Diploma courses",
      "BSc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Jamia Hamdard is a deemed university recognized by the UGC. Established in 1989, it offers quality medical education with emphasis on research and innovation. The institution integrates traditional Unani medicine with modern medical sciences.",
    "admissionSteps": [
      "NEET UG score required",
      "Merit list preparation based on NEET score",
      "Admission counseling",
      "Payment of fees and registration",
      "Commencement of academic session"
    ],
    "internship": "12-month mandatory internship with rotations across various departments. Hospital-based training with patient care emphasis. Additional training in Unani medicine practices.",
    "accommodation": "Separate hostel for male and female students. Well-equipped hostels with modern facilities. Located near Okhla, New Delhi with good connectivity.",
    "website": "www.hamdard.edu.in"
  },
  {
    "slug": "kgmu-lucknow",
    "name": "King George's Medical University",
    "shortName": "KGMU",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "type": "Government",
    "established": 1911,
    "nirf": 8,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 350,
    "neetCutoff": "550",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "BDS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in 1911, KGMU is one of the premier government medical institutions in North India. Located in Lucknow, it offers comprehensive medical education with modern facilities and experienced faculty. The university has produced many renowned medical professionals.",
    "admissionSteps": [
      "NEET UG qualification",
      "Merit list based on NEET score",
      "Seat allotment through counseling",
      "Document verification",
      "Final registration and admission"
    ],
    "internship": "12-month internship with rotations in medicine, surgery, obstetrics, pediatrics, and community medicine. Training in attached hospitals and primary health centers.",
    "accommodation": "Hostel facilities for male and female students. Located in central Lucknow with accessibility to city amenities. Preference given to outstation candidates.",
    "website": "www.kgmu.org"
  },
  {
    "slug": "bhu-varanasi",
    "name": "Institute of Medical Sciences, Banaras Hindu University",
    "shortName": "IMS BHU",
    "city": "Varanasi",
    "state": "Uttar Pradesh",
    "type": "Government",
    "established": 1910,
    "nirf": 6,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 300,
    "neetCutoff": "560",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "BDS",
      "Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in 1910 as part of Banaras Hindu University, IMS BHU is among India's oldest medical institutions. Known for academic excellence, cutting-edge research facilities, and holistic education. Located in the cultural heart of Varanasi.",
    "admissionSteps": [
      "NEET UG score requirement",
      "Merit-based seat allocation",
      "Counseling process",
      "Document verification and registration",
      "Hostel allotment"
    ],
    "internship": "12-month comprehensive internship with rotations across all major departments. Hospital-based training with exposure to diverse patient cases. Research opportunities during internship.",
    "accommodation": "Well-maintained hostels for boys and girls. Campus has residential facilities for families of faculty. Safe and secure environment with modern amenities.",
    "website": "www.bhu.ac.in/ims"
  },
  {
    "slug": "gsvm-kanpur",
    "name": "Ganesh Shankar Vidyarthi Memorial Medical College",
    "shortName": "GSVM",
    "city": "Kanpur",
    "state": "Uttar Pradesh",
    "type": "Government",
    "established": 2009,
    "nirf": null,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 150,
    "neetCutoff": "480",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "BSc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "GSVM Medical College was established in 2009 to provide quality medical education in Uttar Pradesh. Modern infrastructure with updated teaching methods and research facilities. Focuses on producing competent and compassionate healthcare professionals.",
    "admissionSteps": [
      "NEET UG qualification",
      "Score-based merit list",
      "Seat allocation through centralized counseling",
      "Verification of documents",
      "Admission and registration"
    ],
    "internship": "12-month internship with rotations across medicine, surgery, pediatrics, obstetrics, and psychiatry. Hands-on training in attached hospitals.",
    "accommodation": "Hostel facilities available for eligible students. Separate accommodation for male and female students. Located near city center with good connectivity.",
    "website": "www.gsvmmc.edu.in"
  },
  {
    "slug": "sms-jaipur",
    "name": "SMS Medical College",
    "shortName": "SMS",
    "city": "Jaipur",
    "state": "Rajasthan",
    "type": "Government",
    "established": 1946,
    "nirf": 39,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 250,
    "neetCutoff": "540",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "BDS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Founded in 1946, SMS Medical College is the premier medical institution in Rajasthan. Equipped with state-of-the-art facilities and experienced faculty. The college is committed to providing quality medical education and advancing healthcare in the region.",
    "admissionSteps": [
      "NEET UG score requirement",
      "Merit list preparation",
      "Counseling and seat allocation",
      "Document verification",
      "Final admission registration"
    ],
    "internship": "Comprehensive 12-month internship with rotations in various departments. Training in attached hospitals with significant patient load. Exposure to diverse clinical cases.",
    "accommodation": "Hostel facilities for male and female students. Located in central Jaipur. On-campus accommodation with good amenities.",
    "website": "www.smsmc.ac.in"
  },
  {
    "slug": "gmc-patiala",
    "name": "Government Medical College Patiala",
    "shortName": "GMC Patiala",
    "city": "Patiala",
    "state": "Punjab",
    "type": "Government",
    "established": 1950,
    "nirf": null,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 150,
    "neetCutoff": "500",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "Diploma courses",
      "BDS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in 1950, GMC Patiala is a well-respected government medical college in Punjab. Known for quality medical education with modern infrastructure. The institution has contributed significantly to healthcare in Punjab and northern India.",
    "admissionSteps": [
      "NEET UG qualification",
      "Merit list creation based on score",
      "Seat allotment through counseling",
      "Document verification",
      "Admission confirmation"
    ],
    "internship": "12-month internship with rotations across major departments. Training in Rajindra Hospital with good patient load. Community health and rural health postings.",
    "accommodation": "Hostel accommodation available for eligible students. Separate hostels for boys and girls. Safe and secure campus environment.",
    "website": "www.gmcpatiala.ac.in"
  },
  {
    "slug": "dmc-ludhiana",
    "name": "Dayanand Medical College and Hospital",
    "shortName": "DMC",
    "city": "Ludhiana",
    "state": "Punjab",
    "type": "Private/Deemed",
    "established": 1963,
    "nirf": 36,
    "feesTotal": "8000000",
    "feesPerYear": "1600000",
    "mbbsSeats": 100,
    "neetCutoff": "450",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "BDS",
      "Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "DMC Ludhiana is a private deemed medical institution established in 1963. It has a strong reputation for quality education and research. The college maintains excellent faculty and modern infrastructure for comprehensive medical training.",
    "admissionSteps": [
      "NEET UG score required",
      "Merit list preparation",
      "Admission counseling",
      "Fee payment and registration",
      "Admission finalization"
    ],
    "internship": "12-month internship with rotations in all major departments. Training in a large hospital with diverse patient cases. Emphasis on clinical skills and research.",
    "accommodation": "Hostel facilities for students with modern amenities. Well-maintained accommodations in campus proximity. Options for on-campus and near-campus housing.",
    "website": "www.dmch.ac.in"
  },
  {
    "slug": "gmc-chandigarh",
    "name": "Government Medical College & Hospital Chandigarh",
    "shortName": "GMC Chandigarh",
    "city": "Chandigarh",
    "state": "Chandigarh",
    "type": "Government",
    "established": 1966,
    "nirf": 34,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 200,
    "neetCutoff": "530",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "BDS",
      "BSc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in 1966, GMC Chandigarh is a premier government medical institution serving the tri-city region of Chandigarh, Mohali, and Panchkula. Known for excellence in medical education and modern healthcare delivery. State-of-the-art facilities and experienced faculty.",
    "admissionSteps": [
      "NEET UG score requirement",
      "Merit-based seat allocation",
      "Counseling process",
      "Document verification",
      "Final registration and admission"
    ],
    "internship": "Comprehensive 12-month internship with rotations across departments. Hospital-based training with significant patient exposure. Community health postings included.",
    "accommodation": "Hostel facilities for eligible students. Separate accommodations for male and female students. Located in well-planned Chandigarh city with good amenities.",
    "website": "www.gmch.gov.in"
  },
  {
    "slug": "gandhi-medical-college-bhopal",
    "name": "Gandhi Medical College",
    "shortName": "GMC Bhopal",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "type": "Government",
    "established": 1946,
    "nirf": 42,
    "feesTotal": "1200000",
    "feesPerYear": "200000",
    "mbbsSeats": 200,
    "neetCutoff": "520",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "BDS",
      "BSc Nursing"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Founded in 1946, Gandhi Medical College is the premier government medical institution in Madhya Pradesh. Located in Bhopal, it offers quality medical education with modern infrastructure. The college is committed to producing compassionate and skilled healthcare professionals.",
    "admissionSteps": [
      "NEET UG qualification",
      "Score-based merit list",
      "Seat allocation through counseling",
      "Document verification and registration",
      "Admission finalization"
    ],
    "internship": "12-month rotating internship across major departments. Training in Hamidia Hospital with large patient load. Exposure to diverse clinical presentations.",
    "accommodation": "Hostel accommodation for male and female students. On-campus facilities with modern amenities. Preference given to outstation candidates.",
    "website": "www.gandhibhopal.ac.in"
  },
  {
    "slug": "madras-medical-college-chennai",
    "name": "Madras Medical College",
    "shortName": "MMC",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Government",
    "established": 1835,
    "nirf": 16,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 150,
    "neetCutoff": "635",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "One of the oldest medical colleges in Asia, established during British rule. Premier government institution known for clinical excellence and research. Affiliated with University of Madras. Strong pediatrics and cardiology departments. Houses major teaching hospital with 2000+ beds.",
    "admissionSteps": [
      "NEET UG examination",
      "Merit list preparation",
      "Counselling at Tamil Nadu Medical Services Recruitment Board",
      "Document verification",
      "Admission confirmation"
    ],
    "internship": "18 months mandatory rotating internship covering all major departments. 4 weeks each in major departments, 8 weeks electives.",
    "accommodation": "On-campus hostel facilities available. 400+ hostel beds. Separate hostels for boys and girls. Nominal fee. Some students prefer private accommodation in Fort area.",
    "website": "mmc.tnmsc.gov.in"
  },
  {
    "slug": "stanley-medical-college-chennai",
    "name": "Stanley Medical College",
    "shortName": "SMC",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Government",
    "established": 1925,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 150,
    "neetCutoff": "620",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 1925, named after Lord Stanley. Affiliated with Tamil Nadu Dr. M.G.R. Medical University. Known for strong orthopedics, trauma, and emergency medicine. Modern tertiary care hospital with 1500+ beds. Good research output in surgery.",
    "admissionSteps": [
      "NEET UG examination",
      "Eligibility verification",
      "Counselling at TNMSC",
      "Seat allocation",
      "Admission and document submission"
    ],
    "internship": "18 months mandatory rotating internship. Structured rotation in major and minor specialties. Emphasis on emergency and trauma management.",
    "accommodation": "Hostel with 300+ beds. Separate blocks for male and female students. Basic amenities provided. Nominal monthly charges.",
    "website": "stanleymedicalcollege.edu.in"
  },
  {
    "slug": "kilpauk-medical-college-chennai",
    "name": "Kilpauk Medical College",
    "shortName": "KMC",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Government",
    "established": 1835,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 150,
    "neetCutoff": "610",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established in same year as MMC (1835). Affiliated with Tamil Nadu Dr. M.G.R. Medical University. Known for excellence in pediatrics and family medicine. Government Hospital Kilpauk has 1200+ beds. Active research and publication record.",
    "admissionSteps": [
      "NEET UG qualification",
      "Eligibility check",
      "TNMSC counselling",
      "Choice filling and seat allocation",
      "Final admission"
    ],
    "internship": "18 months rotating internship. Exposure to pediatrics, internal medicine, surgery, obstetrics, orthopedics, ENT, ophthalmology. Community health postings mandatory.",
    "accommodation": "Girls hostel with 180 beds. Boys hostel with 200 beds. Separate dining facilities. Nominal rent. Prime location near Guindy.",
    "website": "kilpaukmedicalsociety.edu.in"
  },
  {
    "slug": "madurai-medical-college",
    "name": "Madurai Medical College",
    "shortName": "MMRC",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "type": "Government",
    "established": 1963,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 100,
    "neetCutoff": "580",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 1963. Affiliated with Tamil Nadu Dr. M.G.R. Medical University. Serves Madurai and surrounding districts. Government Rajaji Hospital is the teaching hospital with 1000+ beds. Good surgical facilities and orthopedic department.",
    "admissionSteps": [
      "NEET UG examination",
      "Merit preparation",
      "TNMSC counselling",
      "Document verification",
      "Admission processing"
    ],
    "internship": "18 months mandatory internship covering all major departments. Clinical rotations in internal medicine, surgery, pediatrics, obstetrics, and community health.",
    "accommodation": "Boys hostel with 150 beds. Girls hostel with 100 beds. Nominal charges. Located near medical college campus.",
    "website": "mmc.tnmsc.gov.in"
  },
  {
    "slug": "coimbatore-medical-college",
    "name": "Coimbatore Medical College",
    "shortName": "CMC",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "type": "Government",
    "established": 1961,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 100,
    "neetCutoff": "575",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 1961. Affiliated with Tamil Nadu Dr. M.G.R. Medical University. Government Coimbatore Medical College Hospital (CMCH) is teaching hospital with 900+ beds. Known for good primary care and internal medicine teaching. Industrial exposure due to textile and manufacturing base.",
    "admissionSteps": [
      "NEET UG qualification",
      "Eligibility verification",
      "TNMSC counselling at Coimbatore",
      "Seat allocation",
      "Admission confirmation"
    ],
    "internship": "18 months rotating internship. Structured curriculum with emphasis on community medicine. Rural health postings mandatory.",
    "accommodation": "Boys and girls hostels. Total 250+ beds. Modest facilities. Nominal charges. Good connectivity to city center.",
    "website": "cmcmedical.tnmsc.gov.in"
  },
  {
    "slug": "christian-medical-college-vellore",
    "name": "Christian Medical College Vellore",
    "shortName": "CMCV",
    "city": "Vellore",
    "state": "Tamil Nadu",
    "type": "Private/Deemed",
    "established": 1900,
    "nirf": 3,
    "feesTotal": "26000000",
    "feesPerYear": "2600000",
    "mbbsSeats": 150,
    "neetCutoff": "680",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "PhD"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Prestigious private deemed university established 1900. Consistently ranked top 5 medical colleges nationally. Strong research output and publications. Modern 1500+ bed hospital with state-of-the-art facilities. Known for high ethical standards. Excellent faculty and international collaborations.",
    "admissionSteps": [
      "NEET UG examination",
      "Merit list (NEET score)",
      "CMCV entrance test",
      "Interview",
      "Final merit list and admission"
    ],
    "internship": "18 months comprehensive rotating internship. International exchange programs available. Strong mentorship and research exposure.",
    "accommodation": "Excellent hostel facilities. Separate boys and girls hostels. Well-maintained with modern amenities. Internet, dining, sports facilities. On-campus residential community.",
    "website": "cmcvellore.ac.in"
  },
  {
    "slug": "sri-ramachandra-medical-college-delhi",
    "name": "Sri Ramachandra Institute of Higher Education and Research",
    "shortName": "SRIHER",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Private/Deemed",
    "established": 1985,
    "nirf": 21,
    "feesTotal": "23000000",
    "feesPerYear": "2300000",
    "mbbsSeats": 150,
    "neetCutoff": "670",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "PhD",
      "BDS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Deemed university established 1985. Located in Chennai. Known for excellent clinical training and research facilities. Modern 1200+ bed hospital. Strong emphasis on preventive medicine and community health. Good placements and higher studies guidance.",
    "admissionSteps": [
      "NEET UG examination",
      "Merit list based on NEET scores",
      "Counselling interview",
      "Document verification",
      "Admission confirmation"
    ],
    "internship": "18 months rotating internship with structured curriculum. Research projects mandatory. Good publication opportunities.",
    "accommodation": "Comfortable hostels with modern amenities. Separate accommodations for boys and girls. Dining, sports, recreation facilities. Located in Porur area of Chennai.",
    "website": "sriramachandra.edu.in"
  },
  {
    "slug": "saveetha-medical-college-tamil-nadu",
    "name": "Saveetha Institute of Medical and Technical Sciences",
    "shortName": "SIMATS",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Private/Deemed",
    "established": 1989,
    "nirf": 11,
    "feesTotal": "22000000",
    "feesPerYear": "2200000",
    "mbbsSeats": 150,
    "neetCutoff": "665",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "PhD"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Deemed university established 1989. Modern facilities with 800+ bed hospital. Strong focus on technology integration in medical education. Active research and innovation center. Good industry connections and hospital chain across India.",
    "admissionSteps": [
      "NEET UG score",
      "Merit list preparation",
      "Counselling interview",
      "Document submission",
      "Final admission"
    ],
    "internship": "18 months internship with exposure to multiple specialties. Research components integrated. Case-based learning emphasized.",
    "accommodation": "Well-equipped hostels. Separate facilities for boys and girls. Amenities include WiFi, gym, cafeteria. Located in Thandalam, Chennai outskirts.",
    "website": "saveetha.edu.in"
  },
  {
    "slug": "government-medical-college-trivandrum",
    "name": "Government Medical College Thiruvananthapuram",
    "shortName": "GMC-TVM",
    "city": "Thiruvananthapuram",
    "state": "Kerala",
    "type": "Government",
    "established": 1951,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 100,
    "neetCutoff": "600",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 1951. Premier government medical college in Kerala. Affiliated with Kerala University of Health Sciences. Medical College Hospital (MCH) is tertiary care center with 1100+ beds. Strong reputation for clinical excellence and teaching quality.",
    "admissionSteps": [
      "NEET UG examination",
      "Eligibility check via Kerala Medical Services Committee",
      "Counselling process",
      "Seat allocation",
      "Admission and document verification"
    ],
    "internship": "18 months rotating internship covering all major departments. Strong emphasis on evidence-based medicine and clinical skills.",
    "accommodation": "Hostel facilities available. Separate hostels for boys and girls. Nominal charges. Good access to city amenities.",
    "website": "gmcthiruvananthapuram.in"
  },
  {
    "slug": "government-medical-college-kozhikode",
    "name": "Government Medical College Kozhikode",
    "shortName": "GMC-Calicut",
    "city": "Kozhikode",
    "state": "Kerala",
    "type": "Government",
    "established": 1957,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 100,
    "neetCutoff": "595",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 1957. Major government medical college in North Kerala. Affiliated with Kerala University of Health Sciences. Medical College Hospital is 1000+ bed tertiary care center. Known for strong clinical training and community health programs.",
    "admissionSteps": [
      "NEET UG score submission",
      "Eligibility verification",
      "Kerala Medical Services Committee counselling",
      "Choice filling",
      "Final seat allocation and admission"
    ],
    "internship": "18 months mandatory rotating internship. Good exposure to infectious diseases due to geographic location. Research opportunities in tropical medicine.",
    "accommodation": "Boys and girls hostels with 250+ total beds. Basic facilities. Nominal fees. Near medical college campus.",
    "website": "gmckozhikode.org"
  },
  {
    "slug": "amrita-institute-kochi",
    "name": "Amrita Institute of Medical Sciences",
    "shortName": "AIMS",
    "city": "Kochi",
    "state": "Kerala",
    "type": "Private/Deemed",
    "established": 1998,
    "nirf": null,
    "feesTotal": "25000000",
    "feesPerYear": "2500000",
    "mbbsSeats": 150,
    "neetCutoff": "675",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "PhD"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Deemed university established 1998. Part of Amrita Vishwa Vidyapeetham. Excellent infrastructure with 1200+ bed hospital. State-of-the-art research facilities. Strong focus on holistic education and skill development. International quality standards.",
    "admissionSteps": [
      "NEET UG examination",
      "Entrance merit list",
      "Counselling process",
      "Interview",
      "Final admission confirmation"
    ],
    "internship": "18 months comprehensive internship. Structured curriculum with research components. International exposure programs available.",
    "accommodation": "Premium hostel facilities. Separate accommodations for boys and girls. WiFi, sports, dining, recreational facilities. Campus life oriented.",
    "website": "amrita.edu"
  },
  {
    "slug": "td-medical-college-alappuzha",
    "name": "T.D. Medical College Alappuzha",
    "shortName": "TDMC",
    "city": "Alappuzha",
    "state": "Kerala",
    "type": "Government",
    "established": 1980,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 50,
    "neetCutoff": "570",
    "courses": [
      "MBBS",
      "MD",
      "MS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 1980. Government medical college in Alappuzha district. Affiliated with Kerala University of Health Sciences. District Hospital serving as teaching hospital with 600+ beds. Good exposure to community medicine and tropical diseases.",
    "admissionSteps": [
      "NEET UG examination",
      "Merit list based on scores",
      "Counselling at Kerala Medical Services",
      "Seat allocation",
      "Admission and verification"
    ],
    "internship": "18 months rotating internship covering major departments. Strong community health postings given geographic location.",
    "accommodation": "Hostel facilities for boys and girls. 150+ beds. Basic amenities. Nominal charges. Close to college campus.",
    "website": "tdmcalappuzha.org"
  },
  {
    "slug": "rajendra-institute-medical-sciences-kerala",
    "name": "Rajendra Institute of Medical Sciences",
    "shortName": "RIMS",
    "city": "Kottayam",
    "state": "Kerala",
    "type": "Government",
    "established": 2001,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "3000",
    "mbbsSeats": 50,
    "neetCutoff": "560",
    "courses": [
      "MBBS",
      "MD",
      "MS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Established 2001. Government medical college in central Kerala. Affiliated with Kerala University of Health Sciences. Rajendra Hospital serves as teaching hospital with 500+ beds. Good exposure to both urban and rural healthcare.",
    "admissionSteps": [
      "NEET UG score qualification",
      "Eligibility verification",
      "Kerala Medical Services counselling",
      "Seat allocation",
      "Admission processing"
    ],
    "internship": "18 months rotating internship with emphasis on primary healthcare. Rural health postings organized regularly.",
    "accommodation": "Hostel facilities available. Separate blocks for boys and girls. 100+ beds. Nominal rent. Central location.",
    "website": "rimskottayam.edu.in"
  },
  {
    "slug": "kasturba-medical-college-manipal",
    "name": "Kasturba Medical College Manipal",
    "shortName": "KMC-Manipal",
    "city": "Manipal",
    "state": "Karnataka",
    "type": "Private/Deemed",
    "established": 1953,
    "nirf": 10,
    "feesTotal": "27000000",
    "feesPerYear": "2700000",
    "mbbsSeats": 200,
    "neetCutoff": "680",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "PhD"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Deemed university established 1953. Part of Manipal Academy of Higher Education. Excellent campus with international standards. Modern 1300+ bed hospital. Strong research output and international collaborations. One of the oldest private medical colleges in India.",
    "admissionSteps": [
      "NEET UG examination",
      "Merit list preparation",
      "Manipal entrance test",
      "Interview",
      "Final merit list and admission"
    ],
    "internship": "18 months comprehensive rotating internship. High quality training and research opportunities. Publication record strong.",
    "accommodation": "Excellent hostel facilities. Boys and girls hostels with all modern amenities. WiFi, sports, dining, recreation. Vibrant campus community.",
    "website": "manipal.edu"
  },
  {
    "slug": "bangalore-medical-college-bmcri",
    "name": "Bangalore Medical College & Research Institute",
    "shortName": "BMC",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "Government",
    "established": 1878,
    "nirf": null,
    "feesTotal": "25000",
    "feesPerYear": "2500",
    "mbbsSeats": 150,
    "neetCutoff": "650",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "One of India's oldest medical colleges, established in 1878. Known for research and clinical excellence. Affiliated with University of Bangalore.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit list publication",
      "Counselling",
      "Document verification",
      "Seat allotment"
    ],
    "internship": "3 years compulsory rotating internship across departments",
    "accommodation": "On-campus hostel available for students. Separate boys and girls hostels.",
    "website": "bmcri.ac.in"
  },
  {
    "slug": "jss-medical-college-mysore",
    "name": "JSS Medical College Mysore",
    "shortName": "JSS MC",
    "city": "Mysore",
    "state": "Karnataka",
    "type": "Private/Deemed",
    "established": 1985,
    "nirf": 37,
    "feesTotal": "1500000",
    "feesPerYear": "187500",
    "mbbsSeats": 150,
    "neetCutoff": "590",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Part of JSS Academy of Higher Education. Known for quality teaching and modern facilities. Strong community health programs.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit ranking",
      "Selection and counselling",
      "Document verification",
      "Admission process"
    ],
    "internship": "2 years clinical internship with rotation across specialties",
    "accommodation": "On-campus hostel facilities. Separate boys and girls hostels with modern amenities.",
    "website": "jssahe.ac.in"
  },
  {
    "slug": "st-johns-medical-college-bangalore",
    "name": "St John's Medical College Bangalore",
    "shortName": "SJMC",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "Private/Deemed",
    "established": 1963,
    "nirf": 30,
    "feesTotal": "2000000",
    "feesPerYear": "250000",
    "mbbsSeats": 100,
    "neetCutoff": "600",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Prestigious medical college with emphasis on ethics and holistic education. Strong faculty and research orientation.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit list",
      "Counselling process",
      "Document verification",
      "Seat confirmation"
    ],
    "internship": "2 years compulsory clinical internship",
    "accommodation": "Hostel facilities available on campus. Modern and well-equipped dormitories.",
    "website": "sjmcbangalore.ac.in"
  },
  {
    "slug": "mysore-medical-college",
    "name": "Mysore Medical College & Research Institute",
    "shortName": "MMC",
    "city": "Mysore",
    "state": "Karnataka",
    "type": "Government",
    "established": 1924,
    "nirf": null,
    "feesTotal": "30000",
    "feesPerYear": "3000",
    "mbbsSeats": 120,
    "neetCutoff": "620",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Oldest medical college in southern India. Government institution with strong academics and patient care services.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit declaration",
      "Counselling",
      "Document check",
      "Final allotment"
    ],
    "internship": "3 years rotating internship in clinical departments",
    "accommodation": "On-campus hostel available. Separate facilities for male and female students.",
    "website": "mmc.ac.in"
  },
  {
    "slug": "osmania-medical-college-hyderabad",
    "name": "Osmania Medical College Hyderabad",
    "shortName": "OMC",
    "city": "Hyderabad",
    "state": "Telangana",
    "type": "Government",
    "established": 1886,
    "nirf": 48,
    "feesTotal": "22000",
    "feesPerYear": "2200",
    "mbbsSeats": 200,
    "neetCutoff": "660",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Historic institution and one of India's oldest medical colleges. Excellent clinical and teaching facilities with strong research programs.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit list publication",
      "Counselling rounds",
      "Document verification",
      "Admission confirmation"
    ],
    "internship": "3 years clinical internship with departmental rotations",
    "accommodation": "Hostel facilities available. Separate accommodations for boys and girls on campus.",
    "website": "osmaniamedicine.org"
  },
  {
    "slug": "gandhi-medical-college-hyderabad",
    "name": "Gandhi Medical College Hyderabad",
    "shortName": "GMC Hyderabad",
    "city": "Hyderabad",
    "state": "Telangana",
    "type": "Government",
    "established": 1954,
    "nirf": null,
    "feesTotal": "20000",
    "feesPerYear": "2000",
    "mbbsSeats": 160,
    "neetCutoff": "640",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Premier government medical college with strong clinical tradition. Well-equipped teaching hospital and research facilities.",
    "admissionSteps": [
      "NEET UG exam",
      "State counselling",
      "Merit-based selection",
      "Document verification",
      "Allotment"
    ],
    "internship": "2 years clinical internship with rotation",
    "accommodation": "On-campus hostel available. Modern facilities with internet and study areas.",
    "website": "gandhimedicine.ac.in"
  },
  {
    "slug": "kakatiya-medical-college-warangal",
    "name": "Kakatiya Medical College Warangal",
    "shortName": "KMC Warangal",
    "city": "Warangal",
    "state": "Telangana",
    "type": "Government",
    "established": 1975,
    "nirf": null,
    "feesTotal": "18000",
    "feesPerYear": "1800",
    "mbbsSeats": 100,
    "neetCutoff": "600",
    "courses": [
      "MBBS",
      "MD",
      "MS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Government medical college with competent faculty and good infrastructure. Known for community health programs and patient-centered approach.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit ranking",
      "Counselling process",
      "Seat allocation",
      "Admission"
    ],
    "internship": "3 years compulsory clinical internship",
    "accommodation": "Hostel facilities available on campus for students.",
    "website": "kmcwarangal.ac.in"
  },
  {
    "slug": "andhra-medical-college-visakhapatnam",
    "name": "Andhra Medical College Visakhapatnam",
    "shortName": "AMC Vizag",
    "city": "Visakhapatnam",
    "state": "Andhra Pradesh",
    "type": "Government",
    "established": 1923,
    "nirf": null,
    "feesTotal": "25000",
    "feesPerYear": "2500",
    "mbbsSeats": 150,
    "neetCutoff": "630",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Historic government medical college with strong academics and clinical training. Affiliated teaching hospital with excellent facilities.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit list declaration",
      "Counselling",
      "Document verification",
      "Final allotment"
    ],
    "internship": "3 years clinical internship with departmental rotations",
    "accommodation": "On-campus hostel with separate facilities for boys and girls.",
    "website": "amcvizag.ac.in"
  },
  {
    "slug": "kurnool-medical-college",
    "name": "Kurnool Medical College Kurnool",
    "shortName": "KMC Kurnool",
    "city": "Kurnool",
    "state": "Andhra Pradesh",
    "type": "Government",
    "established": 1975,
    "nirf": null,
    "feesTotal": "18000",
    "feesPerYear": "1800",
    "mbbsSeats": 80,
    "neetCutoff": "580",
    "courses": [
      "MBBS",
      "MD",
      "MS"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Government medical college providing quality education and clinical training. Strong emphasis on basic sciences and clinical skills.",
    "admissionSteps": [
      "NEET UG exam",
      "State merit list",
      "Counselling rounds",
      "Seat allotment",
      "Document check"
    ],
    "internship": "2 years clinical internship with rotations",
    "accommodation": "Hostel facilities available on campus.",
    "website": "kurnoolmedical.ac.in"
  },
  {
    "slug": "seth-gs-medical-college-kem-hospital-mumbai",
    "name": "Seth GS Medical College & KEM Hospital Mumbai",
    "shortName": "GSMC",
    "city": "Mumbai",
    "state": "Maharashtra",
    "type": "Government",
    "established": 1845,
    "nirf": null,
    "feesTotal": "35000",
    "feesPerYear": "3500",
    "mbbsSeats": 200,
    "neetCutoff": "700",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
      "PhD"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "One of Asia's oldest and most prestigious medical colleges. Affiliated with KEM Hospital, one of India's largest teaching hospitals. Excellent research output.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit-based selection",
      "Counselling process",
      "Document verification",
      "Seat confirmation"
    ],
    "internship": "3 years clinical internship with rotation across departments",
    "accommodation": "On-campus hostel facilities available. Separate accommodations for boys and girls.",
    "website": "gsmckem.ac.in"
  },
  {
    "slug": "grant-medical-college-mumbai",
    "name": "Grant Medical College Mumbai",
    "shortName": "GMC Mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "type": "Government",
    "established": 1822,
    "nirf": null,
    "feesTotal": "32000",
    "feesPerYear": "3200",
    "mbbsSeats": 200,
    "neetCutoff": "695",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "India's second oldest medical college. Affiliated with Sir JJ Hospital. Strong academics and clinical training with modern infrastructure.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit declaration",
      "Counselling",
      "Document check",
      "Final allotment"
    ],
    "internship": "3 years clinical internship with departmental rotations",
    "accommodation": "Hostel available on campus. Separate facilities for male and female students.",
    "website": "gmcmumbai.ac.in"
  },
  {
    "slug": "armed-forces-medical-college-pune",
    "name": "Armed Forces Medical College Pune",
    "shortName": "AFMC",
    "city": "Pune",
    "state": "Maharashtra",
    "type": "Government",
    "established": 1948,
    "nirf": null,
    "feesTotal": "500000",
    "feesPerYear": "62500",
    "mbbsSeats": 150,
    "neetCutoff": "720",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Premier defence medical institution. High-end infrastructure and faculty. Graduates serve in armed forces. Excellent research and clinical training.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit list",
      "Service bond agreement",
      "Medical fitness",
      "Admission process"
    ],
    "internship": "2 years clinical internship with armed forces posting",
    "accommodation": "On-campus hostel mandatory. Military-style discipline and excellent facilities.",
    "website": "afmc.ac.in"
  },
  {
    "slug": "bj-government-medical-college-pune",
    "name": "B.J. Government Medical College Pune",
    "shortName": "BJGMC",
    "city": "Pune",
    "state": "Maharashtra",
    "type": "Government",
    "established": 1884,
    "nirf": null,
    "feesTotal": "28000",
    "feesPerYear": "2800",
    "mbbsSeats": 180,
    "neetCutoff": "670",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Historic government medical college with strong clinical tradition and teaching. Well-equipped hospital and research facilities.",
    "admissionSteps": [
      "NEET UG exam",
      "State merit list",
      "Counselling",
      "Document verification",
      "Allotment"
    ],
    "internship": "3 years clinical internship with rotations across departments",
    "accommodation": "On-campus hostel available. Separate accommodations for boys and girls.",
    "website": "bjmc.ac.in"
  },
  {
    "slug": "bj-medical-college-ahmedabad",
    "name": "B.J. Medical College Ahmedabad",
    "shortName": "BJM Ahmedabad",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "type": "Government",
    "established": 1963,
    "nirf": 45,
    "feesTotal": "24000",
    "feesPerYear": "2400",
    "mbbsSeats": 150,
    "neetCutoff": "640",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Government medical college with strong academics and excellent clinical facilities. Part of a prominent teaching hospital. Good faculty and infrastructure.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit-based selection",
      "Counselling process",
      "Document check",
      "Seat allotment"
    ],
    "internship": "2 years clinical internship with rotations",
    "accommodation": "Hostel facilities available on campus for students.",
    "website": "bjmcahmedabad.ac.in"
  },
  {
    "slug": "medical-college-kolkata",
    "name": "Medical College Kolkata",
    "shortName": "MCK",
    "city": "Kolkata",
    "state": "West Bengal",
    "type": "Government",
    "established": 1835,
    "nirf": 41,
    "feesTotal": "180000",
    "feesPerYear": "45000",
    "mbbsSeats": 150,
    "neetCutoff": "600",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "India's first medical college, established in 1835. Pioneer in medical education with world-class infrastructure and faculty. Located in central Kolkata with excellent teaching hospital facilities.",
    "admissionSteps": [
      "NEET UG exam",
      "Merit-based counselling",
      "Document verification",
      "Physical fitness test"
    ],
    "internship": "12 months mandatory internship with rotations across all departments",
    "accommodation": "On-campus hostel available with separate facilities for boys and girls",
    "website": "mck.ac.in"
  },
  {
    "slug": "rg-kar-medical-college",
    "name": "R.G. Kar Medical College",
    "shortName": "RGKMC",
    "city": "Kolkata",
    "state": "West Bengal",
    "type": "Government",
    "established": 1967,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "45000",
    "mbbsSeats": 150,
    "neetCutoff": "580",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Premier Government medical college in Eastern India. Known for strong academics and research culture. Modern facilities with dedicated teaching hospital serving lakhs of patients annually.",
    "admissionSteps": [
      "NEET UG exam",
      "Counselling through WBJEE portal",
      "Merit verification",
      "Final admission formalities"
    ],
    "internship": "12 months mandatory clinical internship",
    "accommodation": "Government-run hostels with subsidized food services available",
    "website": "rgkarmc.ac.in"
  },
  {
    "slug": "nrs-medical-college",
    "name": "Nilratan Sircar Medical College",
    "shortName": "NRS Medical",
    "city": "Kolkata",
    "state": "West Bengal",
    "type": "Government",
    "established": 1946,
    "nirf": null,
    "feesTotal": "180000",
    "feesPerYear": "45000",
    "mbbsSeats": 150,
    "neetCutoff": "570",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Reputed Government medical college in Kolkata with strong traditions in clinical practice. Large affiliated teaching hospital with diverse patient demographics for learning.",
    "admissionSteps": [
      "NEET UG qualification",
      "West Bengal state counselling",
      "Merit-based selection",
      "Physical verification"
    ],
    "internship": "12 months internship with mandatory rotations",
    "accommodation": "Hostel accommodation for boys and girls available on campus",
    "website": "nrsmc.ac.in"
  },
  {
    "slug": "ipgmer-sskm",
    "name": "Institute of Post Graduate Medical Education and Research (SSKM)",
    "shortName": "IPGMER",
    "city": "Kolkata",
    "state": "West Bengal",
    "type": "Government",
    "established": 1946,
    "nirf": 23,
    "feesTotal": "200000",
    "feesPerYear": "50000",
    "mbbsSeats": 100,
    "neetCutoff": "610",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Leading postgraduate medical institute in India. Affiliated with Seth Sukhlal Karnani Memorial Hospital. Focus on research and advanced clinical training with international standards.",
    "admissionSteps": [
      "NEET UG exam",
      "National-level merit-based counselling",
      "Document verification",
      "Orientation"
    ],
    "internship": "12 months mandatory clinical internship with research component",
    "accommodation": "Dedicated hostel facilities for postgraduate students",
    "website": "ipgmer.gov.in"
  },
  {
    "slug": "patna-medical-college",
    "name": "Patna Medical College and Hospital",
    "shortName": "PMCH",
    "city": "Patna",
    "state": "Bihar",
    "type": "Government",
    "established": 1889,
    "nirf": null,
    "feesTotal": "160000",
    "feesPerYear": "40000",
    "mbbsSeats": 150,
    "neetCutoff": "560",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "One of India's oldest medical colleges with legacy of 130+ years. Historic institution in eastern India providing quality medical education and patient care.",
    "admissionSteps": [
      "NEET UG exam",
      "Bihar NEET counselling",
      "Merit verification",
      "Final admission"
    ],
    "internship": "12 months mandatory internship",
    "accommodation": "Government hostel on campus with nominal charges",
    "website": "pmch.bih.nic.in"
  },
  {
    "slug": "igims-patna",
    "name": "Indira Gandhi Institute of Medical Sciences",
    "shortName": "IGIMS",
    "city": "Patna",
    "state": "Bihar",
    "type": "Government",
    "established": 1983,
    "nirf": null,
    "feesTotal": "160000",
    "feesPerYear": "40000",
    "mbbsSeats": 150,
    "neetCutoff": "565",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Modern Government medical institute in Bihar. Well-equipped with latest diagnostic and therapeutic equipment. Strong faculty and comprehensive clinical training programs.",
    "admissionSteps": [
      "NEET UG qualification",
      "Bihar NEET state counselling",
      "Merit-based selection",
      "Verification"
    ],
    "internship": "12 months clinical internship with departmental rotations",
    "accommodation": "Hostel facilities available for students on campus",
    "website": "igims.org.in"
  },
  {
    "slug": "scb-medical-college-cuttack",
    "name": "Sriram Chandra Bhanj Medical College",
    "shortName": "SCB Medical",
    "city": "Cuttack",
    "state": "Odisha",
    "type": "Government",
    "established": 1948,
    "nirf": null,
    "feesTotal": "150000",
    "feesPerYear": "37500",
    "mbbsSeats": 150,
    "neetCutoff": "555",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Premier Government medical college in Odisha. Renowned for excellent clinical training and community service. Teaching hospital serves surrounding districts effectively.",
    "admissionSteps": [
      "NEET UG exam",
      "Odisha OJEE counselling",
      "Merit verification",
      "Final admission"
    ],
    "internship": "12 months mandatory internship",
    "accommodation": "Separate hostels for boys and girls available on campus",
    "website": "scbmc.ac.in"
  },
  {
    "slug": "kims-bhubaneswar",
    "name": "Kalinga Institute of Medical Sciences",
    "shortName": "KIMS",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "type": "Private/Deemed",
    "established": 1992,
    "nirf": null,
    "feesTotal": "5500000",
    "feesPerYear": "1100000",
    "mbbsSeats": 150,
    "neetCutoff": "520",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Top-ranked private deemed university with modern infrastructure. State-of-the-art teaching hospital with 1500+ beds. Strong research and clinical training programs.",
    "admissionSteps": [
      "NEET UG qualification",
      "Institute-level counselling",
      "Document verification",
      "Admission"
    ],
    "internship": "12 months clinical internship with elective rotations",
    "accommodation": "Well-maintained hostel facilities with internet and recreational amenities",
    "website": "kiit.ac.in"
  },
  {
    "slug": "srm-medical-college-chennai",
    "name": "SRM Medical College Hospital and Research Centre",
    "shortName": "SRM Medical",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Private/Deemed",
    "established": 1996,
    "nirf": null,
    "feesTotal": "6000000",
    "feesPerYear": "1200000",
    "mbbsSeats": 150,
    "neetCutoff": "530",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Leading private deemed university in South India. Modern campus with international standards. Advanced teaching hospital and research facilities.",
    "admissionSteps": [
      "NEET UG exam",
      "Direct admission through merit",
      "Document verification",
      "Final admission"
    ],
    "internship": "12 months mandatory clinical internship",
    "accommodation": "Excellent hostel facilities with all modern amenities",
    "website": "srmuniversity.ac.in"
  },
  {
    "slug": "dy-patil-pune",
    "name": "Dr. D.Y. Patil Medical College",
    "shortName": "DYP Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "type": "Private/Deemed",
    "established": 1996,
    "nirf": 12,
    "feesTotal": "5800000",
    "feesPerYear": "1160000",
    "mbbsSeats": 150,
    "neetCutoff": "525",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Prestigious private deemed medical college in Pune. Strong faculty and comprehensive curriculum. Well-equipped teaching hospital with diverse patient demographics.",
    "admissionSteps": [
      "NEET UG qualification",
      "Institute-level merit counselling",
      "Document verification",
      "Final admission"
    ],
    "internship": "12 months internship with specialized rotations",
    "accommodation": "Hostel with modern facilities and mess services",
    "website": "dypvp.edu.in"
  },
  {
    "slug": "dy-patil-navi-mumbai",
    "name": "Dr. D.Y. Patil Medical College Navi Mumbai",
    "shortName": "DYP Navi Mumbai",
    "city": "Navi Mumbai",
    "state": "Maharashtra",
    "type": "Private/Deemed",
    "established": 1997,
    "nirf": null,
    "feesTotal": "5900000",
    "feesPerYear": "1180000",
    "mbbsSeats": 150,
    "neetCutoff": "518",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Major private deemed medical institution near Mumbai. Modern teaching hospital with advanced diagnostic and therapeutic facilities. Strong clinical and research orientation.",
    "admissionSteps": [
      "NEET UG exam",
      "Direct merit-based admission",
      "Document verification",
      "Admission completion"
    ],
    "internship": "12 months mandatory clinical internship",
    "accommodation": "Purpose-built hostels with all facilities",
    "website": "dypatil.edu.in"
  },
  {
    "slug": "symbiosis-medical-college-pune",
    "name": "Symbiosis Medical College Pune",
    "shortName": "SMC Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "type": "Private/Deemed",
    "established": 2004,
    "nirf": null,
    "feesTotal": "6200000",
    "feesPerYear": "1240000",
    "mbbsSeats": 150,
    "neetCutoff": "535",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Premium private deemed medical college with international quality standards. Modern infrastructure and experienced faculty. Strong emphasis on clinical skills and research.",
    "admissionSteps": [
      "NEET UG qualification",
      "Merit-based counselling",
      "Document verification",
      "Final admission"
    ],
    "internship": "12 months internship with optional international rotations",
    "accommodation": "Excellent hostel facilities with comprehensive amenities",
    "website": "smuonline.ac.in"
  },
  {
    "slug": "amrita-school-of-medicine",
    "name": "Amrita School of Medicine",
    "shortName": "ASM",
    "city": "Kochi",
    "state": "Kerala",
    "type": "Private/Deemed",
    "established": 2005,
    "nirf": null,
    "feesTotal": "6100000",
    "feesPerYear": "1220000",
    "mbbsSeats": 150,
    "neetCutoff": "528",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Leading private deemed medical school with holistic approach to medical education. State-of-the-art infrastructure and international collaborations. Teaching hospital with 500+ beds.",
    "admissionSteps": [
      "NEET UG exam",
      "Direct admission through merit",
      "Document verification",
      "Admission formalities"
    ],
    "internship": "12 months clinical internship with elective components",
    "accommodation": "Well-appointed hostel facilities on campus",
    "website": "amrita.edu.in"
  },
  {
    "slug": "manipal-college-medical-sciences",
    "name": "Manipal College of Medical Sciences",
    "shortName": "MCOMS",
    "city": "Mangalore",
    "state": "Karnataka",
    "type": "Private/Deemed",
    "established": 1965,
    "nirf": null,
    "feesTotal": "6000000",
    "feesPerYear": "1200000",
    "mbbsSeats": 150,
    "neetCutoff": "540",
    "courses": [
      "MBBS",
      "MD",
      "MS",
      "BDS",
      "DM",
      "MCh"
    ],
    "exams": [
      "NEET UG"
    ],
    "about": "Prestigious private deemed institution with 50+ years of excellence. Modern facilities and experienced faculty. Teaching hospital serving diverse patient population.",
    "admissionSteps": [
      "NEET UG qualification",
      "Merit-based admission",
      "Document verification",
      "Final admission"
    ],
    "internship": "12 months mandatory clinical internship",
    "accommodation": "Hostel facilities with excellent support services",
    "website": "manipal.edu.in"
  },
  {
    "slug": "ms-ramaiah-bangalore",
    "name": "M.S. Ramaiah Medical College",
    "shortName": "MSRMC Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "Private",
    "established": 1979,
    "nirf": 50,
    "feesTotal": "₹50L–₹1.3 Cr (quota-dependent)",
    "feesPerYear": "₹2L (govt quota) to ₹25–40L (management quota)",
    "mbbsSeats": 150,
    "neetCutoff": "General AIQ closing rank ~11,000 (govt quota); higher for management quota",
    "courses": ["MBBS", "MD/MS", "Super-speciality"],
    "exams": ["NEET UG"],
    "about": "Established in 1979, M.S. Ramaiah Medical College is one of Bangalore's top private medical colleges, affiliated to Rajiv Gandhi University of Health Sciences and attached to a large multi-speciality teaching hospital. MBBS fees vary widely by quota (government, private and management).",
    "admissionSteps": ["Qualify NEET UG", "Register for Karnataka / MCC counselling", "Choice filling by quota", "Seat allotment by rank", "Document verification & reporting"],
    "internship": "Compulsory 1-year rotatory internship",
    "accommodation": "On-campus hostels for boys and girls",
    "website": "msrmc.ac.in"
  },
  {
    "slug": "ltmmc-sion-mumbai",
    "name": "Lokmanya Tilak Municipal Medical College (Sion)",
    "shortName": "LTMMC Mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "type": "Government",
    "established": 1964,
    "nirf": null,
    "feesTotal": "₹6.2L approx (full MBBS)",
    "feesPerYear": "₹1.5L approx",
    "mbbsSeats": 200,
    "neetCutoff": "General AIQ closing rank ~5,500",
    "courses": ["MBBS", "MD/MS", "Super-speciality"],
    "exams": ["NEET UG"],
    "about": "Established in 1964 and run by the Municipal Corporation of Greater Mumbai, LTMMC (Sion) is one of Mumbai's most prestigious government medical colleges, attached to the large Lokmanya Tilak Municipal General Hospital and affiliated to MUHS Nashik.",
    "admissionSteps": ["Qualify NEET UG", "Register for MCC (AIQ) / Maharashtra state counselling", "Choice filling", "Seat allotment by rank", "Document verification & reporting"],
    "internship": "Compulsory 1-year rotatory internship",
    "accommodation": "On-campus hostels for MBBS students",
    "website": "ltmgh.com"
  },
  {
    "slug": "gmc-nagpur",
    "name": "Government Medical College, Nagpur",
    "shortName": "GMC Nagpur",
    "city": "Nagpur",
    "state": "Maharashtra",
    "type": "Government",
    "established": 1947,
    "nirf": null,
    "feesTotal": "₹7.8L approx (full MBBS)",
    "feesPerYear": "₹1.9L approx",
    "mbbsSeats": 250,
    "neetCutoff": "General AIQ closing rank ~7,000–8,000",
    "courses": ["MBBS", "MD/MS", "Super-speciality"],
    "exams": ["NEET UG"],
    "about": "Established in 1947, Government Medical College Nagpur is one of the oldest and largest government medical colleges in India, affiliated to MUHS Nashik and known for one of the biggest teaching-hospital campuses in the region.",
    "admissionSteps": ["Qualify NEET UG", "Register for MCC (AIQ) / Maharashtra state counselling", "Choice filling", "Seat allotment by rank", "Document verification & reporting"],
    "internship": "Compulsory 1-year rotatory internship",
    "accommodation": "On-campus hostels for MBBS students",
    "website": "gmcnagpur.gov.in"
  }
];

export const medStateSlug = (name: string) => (MEDICAL_STATE_INFO.find((s) => s.name === name)?.slug) || name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export function medCollegesByState(stateSlug: string) { const info = MEDICAL_STATE_INFO.find((s)=>s.slug===stateSlug); return info ? MEDICAL_COLLEGES.filter((c)=>c.state===info.name) : []; }
export function findMedCollege(slug: string) { return MEDICAL_COLLEGES.find((c)=>c.slug===slug); }

/**
 * Full-course MBBS fee — returned ONLY when it agrees with the per-year figure.
 *
 * 39 of the 55 records holding both numbers contradict themselves, in clean
 * clusters: 16 store the total as exactly 10x the annual fee, 11 as 6x, 9 as 60x
 * and 3 as 8x. MBBS is 4.5 years of tuition, so at most one number in each pair
 * can be right, and which one cannot be settled without the official fee
 * schedules. The detail page printed the stored total regardless, showing
 * families "₹25,00,000 per year" beside "₹2,50,00,000 full course".
 *
 * Where the two disagree we return null and the page shows the per-year figure
 * alone. A curated range string ("₹25–30 L") is human-written rather than
 * derived, so it is trusted as-is.
 *
 * Mirrored in scripts/generate-prerender.mjs, which cannot import TypeScript.
 */
export function medFullCourse(c: Pick<MedicalCollege, 'feesPerYear' | 'feesTotal'>): string | null {
  const raw = String(c.feesTotal ?? '');
  if (!raw) return null;
  if (/[₹L–]/.test(raw)) return c.feesTotal;
  const y = Number(String(c.feesPerYear).replace(/[^0-9.]/g, ''));
  const t = Number(raw.replace(/[^0-9.]/g, ''));
  if (!(y > 0) || !(t > 0)) return null;
  return Math.abs(t / y - 4.5) <= 1.0 ? c.feesTotal : null;
}
