import fs from 'node:fs';
import path from 'node:path';

function writeDataset(filePath, category, topic, subtopic, items) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const dataset = {
    category,
    topic,
    subtopic,
    difficulty: 'medium',
    items
  };
  fs.writeFileSync(filePath, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Generated ${filePath} with ${items.length} items`);
}

// 13. Teaching Internship (50 items)
const profed13Items = [
  {
    term: "Teaching Internship (Practice Teaching / Clinical Practice)",
    definition: "The culminating experiential teacher education immersion course where pre-service teacher candidates assume full instructional, classroom management, and professional responsibilities in an authentic school setting under qualified mentor supervision.",
    rationalization: "Regarded as the acid test of teacher readiness, synthesizing all content, professional education, and field study competencies into daily practice.",
    mnemonic: { title: "Teaching Internship", phrase: "Culmination of Clinical Classroom Competence", items: ["TI - Teaching Internship", "F - Full teaching responsibility", "C - Culminating clinical course"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Define nature, scope, and objectives of Teaching Internship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Joint CHED-DepEd Memorandum on Internship",
    definition: "The inter-agency national policy guideline governing the deployment, supervision, legal protection, and evaluation of pre-service teacher interns in public and private basic education schools.",
    rationalization: "Ensures institutional accountability, child protection adherence, and quality mentorship standards across all cooperating schools.",
    mnemonic: { title: "CHED-DepEd Joint MOA", phrase: "Joint Accord Anchoring Intern Deployment", items: ["J - Joint policy", "C - CHED & DepEd collaboration", "D - Deployment standards"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Analyze legal bases and policies governing teaching internships",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Memorandum of Agreement (MOA)",
    definition: "The legally binding contract executed between the Teacher Education Institution (TEI) and the Cooperating School / Division specifying mutual duties, intern slots, supervisory protocols, and safety guarantees.",
    rationalization: "Protects interns from arbitrary exploitation or non-instructional labor, guaranteeing legitimate pedagogical training.",
    mnemonic: { title: "MOA in Internship", phrase: "Memorandum of Agreement Mandating Rights and Duties", items: ["MOA - Memorandum of Agreement", "L - Legal protection", "D - Duties defined"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Analyze legal bases and policies governing teaching internships",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Pre-Deployment Orientation",
    definition: "The mandatory briefing conducted by the TEI and cooperating school prior to intern deployment covering school rules, Code of Ethics, grooming standards, daily schedule, and child protection protocols.",
    rationalization: "Prepares candidates psychologically and professionally, clarifying behavioral boundaries before meeting students.",
    mnemonic: { title: "Pre-Deployment", phrase: "Orientation Outlines Expectations Before Entry", items: ["P - Pre-deployment", "E - Ethics & grooming", "R - Rules clarified"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Identify pre-deployment protocols and professional readiness standards",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Student Intern Code of Conduct",
    definition: "The professional standard requiring teacher interns to exhibit unquestioned integrity, emotional maturity, punctual attendance, respectful collegiality, and adherence to confidentiality at all times.",
    rationalization: "Interns are bound by the same Code of Ethics for Professional Teachers as licensed educators; unethical conduct can warrant expulsion from the program.",
    mnemonic: { title: "Intern Code of Conduct", phrase: "Integrity, Punctuality, Respect, Confidentiality", items: ["I - Integrity", "P - Punctuality", "R - Respect", "C - Confidentiality"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Apply ethical standards and conduct during internship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Classroom Takeover (Gradual Immersion)",
    definition: "The progressive transition where an intern advances from observing, to team-teaching, to teaching one subject, and ultimately assuming full whole-day classroom instructional control.",
    rationalization: "Prevents intern cognitive overload and ensures students experience a seamless instructional handover without academic disruption.",
    mnemonic: { title: "Gradual Takeover", phrase: "Observe, Assist, Teach One, Take Over Full Class", items: ["1 - Observe", "2 - Assist", "3 - Lead one class", "4 - Full classroom takeover"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Manage the progressive phases of classroom immersion",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Final Demonstration Teaching",
    definition: "The high-stakes culminating capstone lesson delivered by the teacher intern, formally evaluated by a panel consisting of the Cooperating Principal, Master Teachers, and College Practicum Supervisor.",
    rationalization: "Evaluates comprehensive instructional competence: mastery of subject, pedagogical execution, questioning skills, classroom management, and assessment alignment.",
    mnemonic: { title: "Final Demo Teaching", phrase: "Capstone Classroom Showcase Evaluated by Panel", items: ["F - Final demo", "P - Panel evaluation", "M - Mastery demonstrated"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Plan, execute, and defend final demonstration teaching",
    bloomsTaxonomy: "Creating",
    highYield: true
  },
  {
    term: "Post-Demo Oral Defense and Critiquing",
    definition: "The formal evaluation conference immediately following the final demo where panelists question the intern on pedagogical choices, lesson adaptations, assessment decisions, and provide constructive critiques.",
    rationalization: "Assesses the intern's ability to articulate the theoretical and psychological rationale behind their instructional strategies.",
    mnemonic: { title: "Post-Demo Defense", phrase: "Justifying Choices, Accepting Corrections", items: ["P - Post-demo defense", "J - Justify pedagogy", "C - Constructive critique"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Plan, execute, and defend final demonstration teaching",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "SMART Learning Objectives",
    definition: "The standard criteria for formulating lesson objectives: Specific (clear action), Measurable (observable behavior), Achievable (developmentally appropriate), Relevant (curriculum aligned), and Time-bound (attainable in the period).",
    rationalization: "Vague verbs like 'to know' or 'to understand' are avoided in favor of precise behavioral verbs like 'identify', 'calculate', 'differentiate', or 'compose'.",
    mnemonic: { title: "SMART Objectives", phrase: "Specific, Measurable, Achievable, Relevant, Time-bound", items: ["S - Specific", "M - Measurable", "A - Achievable", "R - Relevant", "T - Time-bound"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Formulate behavioral objectives using SMART criteria",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pacing and Time Management in Lesson Delivery",
    definition: "The strategic allocation and monitoring of classroom instructional minutes across lesson parts (preliminaries, motivation, lesson development, practice, evaluation) to ensure comprehensive coverage without rushing.",
    rationalization: "Running out of time before reaching lesson evaluation or overdwelling on motivation represents a critical instructional planning flaw.",
    mnemonic: { title: "Lesson Time Pacing", phrase: "Every Minute Managed for Maximum Mastery", items: ["T - Time allocation", "M - Motivation brisk", "D - Development core", "E - Evaluation reached"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Manage instructional time and lesson transitions effectively",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Anticipatory Set (Motivation / Hook)",
    definition: "A captivating, brief introductory activity, puzzle, video, or provocative question designed to grab students' attention, activate prior knowledge, and establish the purpose of the lesson.",
    rationalization: "Should occupy no more than 3 to 5 minutes; must connect directly to the new concept rather than serving as unrelated entertainment.",
    mnemonic: { title: "Anticipatory Set", phrase: "Hook the Heart to Open the Head", items: ["A - Anticipatory set", "H - Hook interest", "C - Connects to topic"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Execute lesson phases from motivation to synthesis",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Lesson Closure and Synthesis",
    definition: "The concluding instructional phase where the teacher prompts students to summarize key generalizations, synthesize core concepts, and reflect on practical life applications.",
    rationalization: "Solidifies learning into long-term memory; teachers should have students summarize rather than merely doing it themselves.",
    mnemonic: { title: "Lesson Closure", phrase: "Consolidate Concepts Before Class Closes", items: ["C - Closure", "S - Synthesis by students", "A - Application confirmed"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Execute lesson phases from motivation to synthesis",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Board Work and Visual Organization",
    definition: "The disciplined aesthetic partitioning of the classroom chalkboard/whiteboard into clear sections: Date/Title, Vocabulary/Core Concepts, Class Work, and Homework.",
    rationalization: "A cluttered board creates cognitive overload; a neat, structured board models organized thinking and aids note-taking.",
    mnemonic: { title: "Board Work Layout", phrase: "Neat Boardwork Navigates Neat Notes", items: ["B - Board division", "C - Clear handwriting", "O - Organized sequence"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Utilize chalkboard and presentation media effectively",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Classroom Voice Modulation and Presence",
    definition: "The effective professional use of vocal pitch, volume, pacing, inflection, and strategic pauses to command attention, emphasize key points, and maintain engagement without straining.",
    rationalization: "Constantly shouting breeds classroom fatigue and loses authority; lowering voice volume often commands instant quiet more effectively.",
    mnemonic: { title: "Voice Modulation", phrase: "Vary Voice to Vitalize Volume", items: ["V - Voice modulation", "P - Pitch & pacing", "P - Pausing for power"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Demonstrate verbal and non-verbal teacher communication presence",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "DepEd School Forms: School Form 1 (SF1 - School Register)",
    definition: "The official master list containing detailed demographic data of each enrolled student: LRN, full name, birth date, age, address, and parents' names.",
    rationalization: "Teacher interns must learn to audit and maintain official records accurately per DepEd basic education reporting standards.",
    mnemonic: { title: "SF1 School Register", phrase: "SF1: Students' Fundamental Facts", items: ["SF1 - School Register", "D - Demographics & LRN", "M - Master student list"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Complete and maintain DepEd school forms (SF1, SF2, SF9)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "DepEd School Forms: School Form 2 (SF2 - Daily Attendance)",
    definition: "The official monthly attendance log tracking student presence, absences, tardiness, and dropouts, used to compute average daily attendance and identify at-risk learners.",
    rationalization: "Consecutive unexplained absences trigger home visitation protocols under DepEd Dropout Reduction Programs.",
    mnemonic: { title: "SF2 Daily Attendance", phrase: "SF2: Showing Faithful Attendance Daily", items: ["SF2 - Daily Attendance", "A - Absences tracked", "H - Home visits triggered"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Complete and maintain DepEd school forms (SF1, SF2, SF9)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "DepEd School Forms: School Form 9 (SF9 - Learner Progress Report Card)",
    definition: "The formal quarterly and annual report card distributed to parents displaying student transmuted grades, general averages, attendance, and observed core values.",
    rationalization: "Signed by the adviser and school head; serves as the primary formal channel of communicating achievement to families.",
    mnemonic: { title: "SF9 Report Card", phrase: "SF9: Showing Final Marks to Families", items: ["SF9 - Report Card", "G - Grades & values", "P - Parental reporting"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Complete and maintain DepEd school forms (SF1, SF2, SF9)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Learner Reference Number (LRN)",
    definition: "A unique, permanent twelve-digit identification number assigned to every basic education student in the Philippines throughout their school lifecycle in the Learner Information System (LIS).",
    rationalization: "Guarantees student tracking across school transfers and prevents duplicate identity records.",
    mnemonic: { title: "LRN 12-Digit", phrase: "Learner Reference Number Follows for Life", items: ["LRN - Learner Reference Number", "12 - 12-digit permanent ID", "LIS - DepEd database"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Complete and maintain DepEd school forms (SF1, SF2, SF9)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Classroom Disciplinary Hierarchy",
    definition: "A systematic, calm sequence of progressive classroom management interventions: 1. Nonverbal eye contact/proximity, 2. Quiet private verbal reminder, 3. Choice between compliance and consequence, 4. Seat relocation, 5. Teacher-student conference after class.",
    rationalization: "Prevents escalating power struggles in front of the peer audience and preserves student dignity.",
    mnemonic: { title: "Disciplinary Hierarchy", phrase: "Proximity, Private Whisper, Choice, Conference", items: ["1 - Nonverbal cue", "2 - Private reminder", "3 - Clear choice", "4 - Conference"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Implement progressive and non-violent positive discipline",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Positive Non-Violent Discipline (DepEd Child Protection Policy DO 40, s. 2012)",
    definition: "The strict legal and pedagogical prohibition of all corporal punishment, humiliation, sarcasm, public shaming, physical labor, or verbal abuse in disciplining students.",
    rationalization: "Focuses on teaching constructive emotional regulation and problem-solving; corporal punishment is grounds for dismissal and criminal prosecution.",
    mnemonic: { title: "DO 40 Child Protection", phrase: "Zero Tolerance for Corporal Terror", items: ["DO 40 - Child protection", "Z - Zero corporal punishment", "P - Positive discipline"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Implement progressive and non-violent positive discipline",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Parent-Teacher Conference (PTC)",
    definition: "The formal quarterly collaborative meeting between the teacher and parents/guardians to discuss the child's academic progress, behavioral growth, and home-school interventions.",
    rationalization: "Teachers should begin by highlighting the child's positive qualities and strengths before discussing academic or behavioral concerns.",
    mnemonic: { title: "Parent-Teacher Conference", phrase: "Partnering with Parents for Pupil Progress", items: ["P - Positive start", "P - Progress discussed", "P - Partnership formed"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Conduct professional parent-teacher conferences and communication",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Home Visitation Protocol",
    definition: "An outreach procedure where the teacher visits the student's residence to understand personal hardships, resolve attendance crises, and collaborate with parents on remediation.",
    rationalization: "Requires prior permission, coordination with barangay officials if necessary, and a formal Home Visit Form signed by the parent.",
    mnemonic: { title: "Home Visitation", phrase: "Visiting Homes to Validate and Help", items: ["H - Home visit", "C - Coordinated safely", "F - Form signed for records"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Conduct home visitations and community outreach",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Teaching Internship Portfolio (TIPP)",
    definition: "The comprehensive professional portfolio compiled by the intern comprising teaching philosophy, sample lesson plans, assessment tools, student work samples, observation feedback, and PPST-aligned artifacts.",
    rationalization: "Acts as tangible proof of competency during job interviews and licensing evaluations.",
    mnemonic: { title: "TIPP Portfolio", phrase: "Teaching Internship Portfolio Proves Performance", items: ["TIPP - Internship portfolio", "P - Philosophy of teaching", "A - Artifacts of growth"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Compile and present the Teaching Internship Portfolio",
    bloomsTaxonomy: "Creating",
    highYield: true
  },
  {
    term: "Philosophy of Teaching Statement",
    definition: "A concise 1-2 page personal professional manifesto articulating the educator's core beliefs about the nature of learning, the role of the teacher, student potential, and instructional goals.",
    rationalization: "Grounds daily instructional practices in a coherent personal ethical framework, typically included as the introductory chapter of the internship portfolio.",
    mnemonic: { title: "Teaching Philosophy", phrase: "My Credo for the Classroom", items: ["P - Personal beliefs", "C - Core educational values", "G - Guides daily teaching"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Articulate a personal philosophy of teaching",
    bloomsTaxonomy: "Creating",
    highYield: true
  },
  {
    term: "Mock Job Interview for Teachers",
    definition: "A simulated pre-employment interview conducted at the conclusion of internship evaluating the candidate's oral communication, situational problem-solving, and pedagogical depth.",
    rationalization: "Prepares pre-service teachers for the DepEd Teacher Hiring Guidelines (DO 7, s. 2015 / DepEd Order No. 007, s. 2023) recruitment process.",
    mnemonic: { title: "Teacher Job Interview", phrase: "Confident Answers on Pedagogy and Policy", items: ["I - Interview rehearsal", "D - DepEd hiring prep", "C - Communication excellence"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Prepare for professional teacher recruitment and hiring processes",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "DepEd Order No. 007, s. 2023 (DepEd Hiring Guidelines)",
    definition: "The updated hiring policy prescribing the evaluation criteria for Teacher I applicants based on Education, Training, Experience, PBET/LET Rating, PPST Classroom Observation, and Teacher Reflection.",
    rationalization: "Places immense weight on the demonstration teaching rated using the Classroom Observation Tool (COT-RSP).",
    mnemonic: { title: "DO 007 s. 2023", phrase: "Merit-Based DepEd Teacher Recruitment", items: ["DO 7 - Hiring policy", "COT - Classroom observation weight", "R - Reflection component"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Prepare for professional teacher recruitment and hiring processes",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Classroom Observation Tool (COT)",
    definition: "The standardized rubrics used in DepEd to assess in-service and applicant teachers across observable PPST indicators during live classroom demonstration teaching.",
    rationalization: "Uses a 7-point scale (Level 3 Consistently applies, Level 7 Masterful integration) to guarantee objective, uniform hiring and promotion scores.",
    mnemonic: { title: "COT Rubric", phrase: "Classroom Observation Tool: Standardized Scoring", items: ["COT - Classroom Observation Tool", "P - PPST indicators", "O - Objective 7-point scale"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Demonstrate competencies evaluated by the COT",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Teacher Induction Program (TIP)",
    definition: "The systematic DepEd onboarding and mentoring program provided to newly-hired teachers during their first one to three years of basic education service.",
    rationalization: "Bridges the transition from pre-service internship to full in-service career through assigned mentor master teachers and modular courses.",
    mnemonic: { title: "TIP Onboarding", phrase: "Teacher Induction Program: Mentoring New Mentors", items: ["TIP - Induction program", "N - Newly-hired teachers", "M - Master teacher mentoring"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Explain the Teacher Induction Program (TIP) transition",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Civil Service Commission (CSC) Eligibility vs PRC License",
    definition: "Passing the PRC Board Licensure Examination for Professional Teachers (BLEPT) automatically grants Civil Service Professional Eligibility under RA 1080 without taking the Civil Service exam.",
    rationalization: "Allows licensed teachers to qualify for permanent plantillla government positions in DepEd and other state agencies.",
    mnemonic: { title: "RA 1080 Automatic Eligibility", phrase: "PRC Board Passers Possess Automatic Civil Service", items: ["RA 1080 - Automatic eligibility", "BLEPT - Licensure exam", "P - Plantilla position qualification"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Analyze teacher certification and civil service laws (RA 1080)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Continuing Professional Development (CPD - RA 10912)",
    definition: "The mandatory lifelong learning requirement requiring licensed professional teachers to earn credit units through graduate studies, seminars, research, and training to renew their PRC license.",
    rationalization: "Ensures teachers continually upgrade their competencies throughout their teaching career.",
    mnemonic: { title: "CPD Law (RA 10912)", phrase: "Credit Units Renew PRC License", items: ["RA 10912 - CPD Law", "C - Credit units", "R - Renewal of license"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Analyze continuing professional development mandates (RA 10912)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Classroom Transitions and Dead Time",
    definition: "Managing the shift between instructional segments (e.g., from lecture to group work) without lost instructional minutes ('dead time') through clear signals and practiced routines.",
    rationalization: "Downtime during transitions is the primary window when student misconduct, chatter, and disruption occur.",
    mnemonic: { title: "Classroom Transitions", phrase: "Swift Shifts Prevent Dead Downtime", items: ["T - Transitions", "S - Signals practiced", "D - Dead time eliminated"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Minimize dead time and streamline classroom transitions",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Teacher's Self-Efficacy (Albert Bandura)",
    definition: "A teacher's personal belief in their capability to organize and execute courses of action required to successfully motivate and foster learning in all students, even challenging ones.",
    rationalization: "High self-efficacy teachers show greater resilience, try innovative pedagogical methods, and persist through setbacks during internship.",
    mnemonic: { title: "Teacher Self-Efficacy", phrase: "Believing I Can Boost Every Child's Brain", items: ["S - Self-efficacy", "B - Bandura", "R - Resilience and persistence"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Develop teacher self-efficacy and reflective resilience",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Burnout Prevention and Self-Care",
    definition: "Proactive emotional, physical, and psychological habits (sleep, boundary setting, mindfulness, collegial debriefing) maintained by interns to prevent professional exhaustion.",
    rationalization: "Pre-service teachers who neglect self-care experience emotional exhaustion, diminished teaching enthusiasm, and health breakdown.",
    mnemonic: { title: "Teacher Self-Care", phrase: "Rest to Recharge the Pedagogical Heart", items: ["B - Burnout prevention", "S - Self-care boundaries", "R - Resilience preserved"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Practice self-care and professional burnout prevention",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Classroom Emergency Preparedness (SDRRM)",
    definition: "The teacher's mastery of the School Disaster Risk Reduction and Management (SDRRM) protocols: fire drills, earthquake drills (Duck, Cover, Hold), and emergency first-aid procedures.",
    rationalization: "Teachers are in loco parentis and legally responsible for the physical safety and orderly evacuation of their students during emergencies.",
    mnemonic: { title: "SDRRM Safety", phrase: "Duck, Cover, Hold and Calm Evacuation", items: ["SDRRM - Disaster risk reduction", "D - Duck, Cover, Hold", "E - Evacuation leadership"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Implement school safety, DRRM, and emergency response",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Integrative Art of Questioning in Final Demo",
    definition: "Strategically distributing higher-order thinking questions across Bloom's levels during the demo: asking question first, pausing (wait time), calling student by name, and probing further.",
    rationalization: "Calling a student's name before asking the question causes the rest of the class to tune out; asking the question first keeps all learners mentally alert.",
    mnemonic: { title: "Questioning Sequence", phrase: "Ask, Pause, Call, Praise/Probe", items: ["1 - Ask question to whole class", "2 - Pause (Wait time 3-5s)", "3 - Call specific student", "4 - Probe for depth"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Execute flawless questioning technique in demo teaching",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Handling Learner Wrong Answers Graciously",
    definition: "Responding to a student's incorrect response with respect and encouragement: validating partial insight, prompting with guiding hints, and never ridiculing.",
    rationalization: "Public embarrassment shuts down student willingness to take intellectual risks; encouraging wrong attempts builds a growth mindset.",
    mnemonic: { title: "Handling Wrong Answers", phrase: "Never Shame; Guide with Gentle Prompts", items: ["N - No ridicule", "V - Validate effort", "P - Prompt towards truth"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Maintain supportive emotional climate during questioning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Use of ICT in Demonstration Teaching",
    definition: "Seamless, purposeful integration of digital multimedia, interactive quiz apps (Kahoot, Quizizz), or slide animations that directly enhance conceptual clarity without becoming distracting eye candy.",
    rationalization: "Technology must serve the pedagogical objective (TPACK framework); flashy graphics that distract from core concepts lower demo ratings.",
    mnemonic: { title: "ICT Integration in Demo", phrase: "Technology Must Serve the Objective, Not Steal the Show", items: ["T - TPACK alignment", "P - Purposeful use", "B - Backup plan prepared"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Integrate ICT seamlessly into demonstration lessons",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Instructional Contingency Plan (Plan B)",
    definition: "Having alternative offline instructional materials and activities prepared in case power outages, projector failures, or bad weather disrupt digital demonstration plans.",
    rationalization: "Demonstrates unflappable professionalism, agility, and foresight to the demonstration evaluation panel.",
    mnemonic: { title: "Plan B Contingency", phrase: "Always Carry a Chalkboard Backup", items: ["P - Plan B ready", "O - Offline materials", "A - Adaptability shown"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Demonstrate instructional adaptability and contingency planning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Debriefing with Cooperating Principal",
    definition: "The formal exit protocol where the teacher intern presents internship takeaways, submits completion clearances, and expresses formal institutional gratitude to school leadership.",
    rationalization: "Leaves an enduring positive professional impression and fosters warm institutional goodwill between university and school.",
    mnemonic: { title: "Exit Debriefing", phrase: "Gratitude and Clearance at Close of Practicum", items: ["G - Gratitude expressed", "C - Clearances completed", "P - Professional exit"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Execute professional exit and school clearance procedures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Classroom Inclusivity for Slow Learners",
    definition: "Deliberately planning scaffolded questions and accessible tasks so that struggling or shy learners experience authentic academic success and participate actively during demonstrations.",
    rationalization: "Demo evaluators specifically scrutinize whether the teacher engages the entire class or only interacts with the top 3 brightest students.",
    mnemonic: { title: "Class Inclusivity", phrase: "No Learner Left in the Shadows", items: ["I - Inclusive questions", "E - Engage whole class", "A - Avoid favoring top few"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Ensure equitable learner participation across ability levels",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Cooperating Teacher's Summative Evaluation",
    definition: "The comprehensive performance appraisal completed by the mentor teacher rating the intern on lesson planning, pedagogical execution, punctuality, classroom management, and interpersonal ethics.",
    rationalization: "Carries significant weight in determining the final internship course grade and recommendation for graduation.",
    mnemonic: { title: "CT Evaluation", phrase: "Holistic Appraisal of Clinical Readiness", items: ["CT - Cooperating Teacher score", "H - Holistic evaluation", "G - Graduation prerequisite"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Interpret clinical performance appraisals and ratings",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Student Work Evidence in Portfolio",
    definition: "Selecting representative student output (pre/post assessments, creative projects, worksheets) showing tangible learner progress under the intern's tutelage.",
    rationalization: "Demonstrates that the intern did not merely teach, but successfully facilitated actual student learning.",
    mnemonic: { title: "Student Work Evidence", phrase: "Proof of Pupils' Progress", items: ["S - Student samples", "P - Proof of learning", "T - Tangible growth"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Document student learning gains as portfolio evidence",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "Teacher's Professional Presence and Attire",
    definition: "Adhering to prescribed clean, dignified, and conservative teacher uniforms or semi-formal business attire, avoiding casual denim, slippers, or revealing clothing.",
    rationalization: "Physical presence establishes professional authority and conveys respect for the sacred teaching profession.",
    mnemonic: { title: "Professional Attire", phrase: "Dressed for Dignity and Dedication", items: ["D - Dignified attire", "U - Uniform compliance", "A - Authority projected"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Model professional grooming and teacher presence",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Collaboration with Non-Teaching Staff",
    definition: "Treating school administrative aides, security guards, utility staff, and canteen workers with cordial warmth, profound respect, and professional collegiality.",
    rationalization: "Reflects genuine character and human dignity; schools function as unified ecosystems requiring support from all personnel.",
    mnemonic: { title: "Respect for All Staff", phrase: "Every Worker Weaves the School Tapestry", items: ["R - Respect for non-teaching staff", "H - Humility & warmth", "C - Community teamwork"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Foster harmonious relations with non-teaching staff",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Teacher's Personal Growth Reflection Essay",
    definition: "The final synthesizing essay written at the conclusion of internship detailing transformational shifts in personal beliefs, pedagogical confidence gained, and dreams for future students.",
    rationalization: "Provides emotional and professional closure to the pre-service journey, crystallizing commitment to public or private service.",
    mnemonic: { title: "Growth Reflection Essay", phrase: "Transforming from Student to Sovereign Scholar", items: ["G - Growth documented", "T - Transformation acknowledged", "C - Commitment sealed"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Synthesize personal professional transformation",
    bloomsTaxonomy: "Creating",
    highYield: true
  },
  {
    term: "Commitment to Lifelong Learning",
    definition: "The philosophical mindset that graduation and passing the BLEPT are merely the beginning of professional growth, requiring continual reading, attending conferences, and pursuing advanced studies.",
    rationalization: "An educator who stops learning ceases to be qualified to teach others; staying current with pedagogical research is an ethical imperative.",
    mnemonic: { title: "Lifelong Learning", phrase: "Never Stop Learning, Never Stop Leading", items: ["L - Lifelong learning", "E - Ethical duty", "M - Mastery renewed"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Commit to lifelong learning and professional ethics",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "Licensure Examination for Teachers (LET / BLEPT) Readiness",
    definition: "The rigorous intellectual, physical, and psychological preparation for the PRC national board examination covering General Education, Professional Education, and Majorship.",
    rationalization: "Passing the BLEPT (minimum general average 75% with no grade below 50% in any subject) earns the professional teacher's license and registration.",
    mnemonic: { title: "BLEPT Standards", phrase: "Seventy-Five Average, Nothing Below Fifty", items: ["75% - Passing average", "50% - No subject below", "L - License awarded"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Analyze BLEPT examination regulations and passing standards",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Pledge of the Professional Teacher (Hippocratic Oath of Teaching)",
    definition: "The solemn public oath taken by newly licensed teachers during mass PRC oath-taking ceremonies dedicating their lives to the service of youth and the betterment of Philippine society.",
    rationalization: "Cements the sacred moral contract between the educator, the Filipino people, and the divine calling of teaching.",
    mnemonic: { title: "Teacher's Solemn Oath", phrase: "A Sacred Promise to Serve the Youth", items: ["P - Pledge", "O - Oath-taking ceremony", "D - Dedication to learners"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Internalize the ethical pledge of the professional teacher",
    bloomsTaxonomy: "Valuing",
    highYield: true
  },
  {
    term: "In Loco Parentis Responsibility in Internship",
    definition: "The special parental authority and responsibility exercised by teachers and interns over learners under their custody, requiring the highest standard of care, supervision, and diligence.",
    rationalization: "Article 218 of the Family Code; interns must actively supervise students during recess, activities, and dismissal to prevent physical injury.",
    mnemonic: { title: "In Loco Parentis", phrase: "Standing in the Place of Loving Parents", items: ["I - In loco parentis", "C - Custody and care", "D - Diligence of a good parent"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Apply legal doctrine of in loco parentis in classroom practice",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Vocation, Mission, and Profession",
    definition: "The tripartite identity of teaching: a Vocation (a sacred calling to serve), a Mission (a specific task assigned to transform lives), and a Profession (a specialized mastery requiring licensure, ethics, and continuous learning).",
    rationalization: "Teaching transcends a mere job or livelihood; viewing it as vocation and mission sustains passion through decades of service.",
    mnemonic: { title: "Vocation, Mission, Profession", phrase: "Called by Vocation, Sent on Mission, Guided by Profession", items: ["V - Vocation (calling)", "M - Mission (purpose)", "P - Profession (competence & ethics)"] },
    source: "PRC BLEPT ProfEd Teaching Internship Reviewer",
    tosCompetency: "Synthesize the teacher's identity as vocation, mission, and profession",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  }
];

// Write Teaching Internship
writeDataset(
  'data/profed/teaching_internship/teaching_internship.json',
  'Professional Education',
  'Teaching Internship',
  'Pre-Service Practice Teaching, Classroom Management, Demonstration Teaching, & Professionalism',
  profed13Items
);
