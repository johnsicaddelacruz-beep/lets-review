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

// 12. Field Study (50 items)
const profed12Items = [
  {
    term: "Field Study 1 (FS 1: Observations of Teaching-Learning)",
    definition: "The initial experiential teacher education course focused on systematic observation of learners, classroom dynamics, school facilities, and teacher pedagogical practices in actual school environments.",
    rationalization: "Connects foundational educational theories with authentic live classroom reality through structured observation checklists and guided reflection.",
    mnemonic: { title: "FS 1 Focus", phrase: "Field Study One: Systematic School Observation", items: ["FS 1 - Observation", "S - School environment", "R - Reflective analysis of learners"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Analyze objectives and competencies of Field Study courses (FS 1 and FS 2)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Field Study 2 (FS 2: Participation and Teaching Assistantship)",
    definition: "The pre-internship experiential course where pre-service teachers actively participate as teaching assistants, assisting cooperating teachers with instructional materials, routines, small-group tutoring, and action research.",
    rationalization: "Serves as the experiential bridge between passive observation (FS 1) and full-time independent practice teaching (Internship).",
    mnemonic: { title: "FS 2 Focus", phrase: "Field Study Two: Active Assistantship and Action", items: ["FS 2 - Participation", "A - Assistantship to teacher", "B - Bridge to internship"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Analyze objectives and competencies of Field Study courses (FS 1 and FS 2)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Cooperating Teacher (CT)",
    definition: "The licensed, master or mentor in-service teacher assigned to mentor, guide, model instructional strategies, and evaluate the pre-service teacher during school immersion.",
    rationalization: "Acts as a primary professional role model providing real-time feedback, classroom management tips, and lesson planning mentorship.",
    mnemonic: { title: "Cooperating Teacher", phrase: "Mentor Modeling Masterful Teaching", items: ["CT - Cooperating Teacher", "M - Mentor in classroom", "G - Guidance & evaluation"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Identify roles of key participants in Field Study and practicum",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Practicum / College Supervisor",
    definition: "The faculty member from the Teacher Education Institution (TEI) who coordinates school placements, observes practicum students, conducts debriefing sessions, and assigns course grades.",
    rationalization: "Liaises between the university and the cooperating school to ensure adherence to memorandum of agreement (MOA) and CHED experiential standards.",
    mnemonic: { title: "College Supervisor", phrase: "Supervising Success from the University", items: ["CS - College Supervisor", "T - TEI faculty liaison", "O - Observation & grading"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Identify roles of key participants in Field Study and practicum",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Pre-Service Teacher (PST)",
    definition: "The teacher education college student enrolled in bachelor's degree programs (BEEd/BSEd/BECEd/BSNEd) completing mandatory experiential school immersion and practicum requirements.",
    rationalization: "Expected to demonstrate professional ethics, punctual attendance, content knowledge, and child-safe behavior at all times during immersion.",
    mnemonic: { title: "Pre-Service Teacher", phrase: "Practicing Skills Towards Teacher Licensing", items: ["PST - Pre-Service Teacher", "E - Experiential immersion", "P - Professional conduct"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Identify roles of key participants in Field Study and practicum",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "PPST Domain 1: Content Knowledge and Pedagogy",
    definition: "The professional standard requiring teachers to possess deep mastery of subject matter, understand research-based pedagogical principles, and integrate ICT and literacy across disciplines.",
    rationalization: "Field study observers examine how effectively the teacher explains difficult subject concepts and corrects learner misconceptions.",
    mnemonic: { title: "PPST Domain 1", phrase: "Mastering What to Teach and How to Teach It", items: ["D1 - Content Knowledge", "P - Pedagogical skill", "I - ICT & literacy integration"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "PPST Domain 2: Learning Environment",
    definition: "The standard focusing on creating a safe, secure, fair, and positive psychological and physical classroom environment that nurtures student engagement and mutual respect.",
    rationalization: "Field study observers document physical classroom ergonomics, positive reinforcement routines, and prevention of bullying and discrimination.",
    mnemonic: { title: "PPST Domain 2", phrase: "Safe, Supportive, and Stimulating Spaces", items: ["D2 - Learning Environment", "S - Safety & fairness", "P - Positive discipline"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "PPST Domain 3: Diversity of Learners",
    definition: "The standard requiring teachers to design responsive teaching strategies honoring learners' varied gender, religious, cultural, socio-economic, indigenous, and disability backgrounds.",
    rationalization: "Field study students observe how teachers differentiate instruction and adapt examples to include all learners without marginalization.",
    mnemonic: { title: "PPST Domain 3", phrase: "Embracing Every Exceptional and Diverse Learner", items: ["D3 - Diversity of Learners", "I - Inclusive strategies", "D - Differentiated instruction"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "PPST Domain 4: Curriculum and Planning",
    definition: "The standard covering the preparation of developmentally sequenced lesson plans, alignment with curriculum standards, and selection of relevant instructional resources.",
    rationalization: "Evaluated during FS 2 when pre-service teachers assist in preparing DLLs, contextualized instructional media, and learning activity sheets.",
    mnemonic: { title: "PPST Domain 4", phrase: "Planning Purposeful Pedagogical Pathways", items: ["D4 - Curriculum and Planning", "S - Sequenced lesson plans", "A - Alignment with standards"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "PPST Domain 5: Assessment and Reporting",
    definition: "The standard requiring the design, selection, and use of diagnostic, formative, and summative assessment tools, and transparent communication of learner achievement to parents.",
    rationalization: "Observed in how teachers use rubrics, administer quarterly exams, conduct item analysis, and participate in parent-teacher conferences.",
    mnemonic: { title: "PPST Domain 5", phrase: "Appraising Achievement and Reporting Results", items: ["D5 - Assessment & Reporting", "F - Formative & summative tools", "R - Reporting to parents"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "PPST Domain 6: Community Linkages and Professional Engagement",
    definition: "The standard emphasizing constructive school-community partnerships, involvement of local stakeholders, and adherence to legal professional ethics.",
    rationalization: "Observed during Brigada Eskwela, PTA assemblies, community immersion programs, and inter-agency collaboration.",
    mnemonic: { title: "PPST Domain 6", phrase: "Connecting Classrooms with the Community", items: ["D6 - Community Linkages", "P - Partnerships & PTA", "E - Ethical engagement"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "PPST Domain 7: Personal Growth and Professional Development",
    definition: "The standard requiring continuous self-reflection, high personal ethical conduct, commitment to lifelong learning, and active participation in professional development networks.",
    rationalization: "Reflected in the pre-service teacher's reflective journals, self-assessment inventories, and readiness to accept constructive critique.",
    mnemonic: { title: "PPST Domain 7", phrase: "Pursuing Personal and Professional Perfection", items: ["D7 - Personal Growth", "R - Reflective practice", "L - Lifelong learning"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Demonstrate alignment with the 7 Domains of the PPST",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Classroom Observation Protocol",
    definition: "The formal ethical guidelines and systematic procedures observed by field study students: securing prior permission, arriving early, dressing professionally, sitting inconspicuously, and avoiding distractions.",
    rationalization: "Pre-service observers must never disrupt ongoing classes or intervene in student discipline unless explicitly instructed by the cooperating teacher.",
    mnemonic: { title: "Observation Ethics", phrase: "Silent, Respectful, and Objective Observer", items: ["O - Objective notes", "S - Silent presence", "P - Professional attire"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Execute ethical and non-intrusive classroom observation protocols",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Field Notes",
    definition: "Detailed, objective, contemporaneous qualitative notes recorded during live observation describing physical layout, verbatim teacher dialogue, student interactions, and chronologies.",
    rationalization: "Must separate descriptive factual records ('Teacher asked 4 questions') from subjective reflective interpretations ('Teacher seemed impatient').",
    mnemonic: { title: "Field Notes", phrase: "Facts First, Feelings in Reflection", items: ["F - Factual descriptions", "O - Objective tracking", "S - Separate subjective thoughts"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Record and analyze observational field notes and checklists",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Observation Checklist / Rating Scale",
    definition: "A pre-designed evaluative tool listing targeted observable teacher and student behaviors, rated on presence/absence or qualitative scales (e.g., Likert rating).",
    rationalization: "Focuses observer attention on specific pedagogical competencies such as wait time, reinforcement techniques, or questioning depth.",
    mnemonic: { title: "Observation Checklist", phrase: "Targeted Tally of Teaching Traits", items: ["C - Checklist", "T - Targeted behaviors", "R - Rating scale criteria"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Record and analyze observational field notes and checklists",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Physical Classroom Ergonomics",
    definition: "The physical design and arrangement of desks, lighting, ventilation, acoustics, walkways, and board visibility to ensure optimal comfort, safety, and learning focus.",
    rationalization: "Poor ventilation or glare on the chalkboard induces fatigue and behavioral restlessness, diminishing instructional time on task.",
    mnemonic: { title: "Classroom Ergonomics", phrase: "Comfortable Classrooms Cultivate Concentration", items: ["E - Ergonomics", "L - Lighting & ventilation", "S - Seating arrangement flow"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Evaluate classroom physical ergonomics and safety",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "Seating Arrangement: Horseshoe / U-Shape",
    definition: "A classroom desk arrangement shaped like a U, facing the board and teacher, maximizing eye contact, whole-group discussion, and teacher access to all learners.",
    rationalization: "Highly effective for interactive discussions, demonstrations, and multimedia presentations; prevents back-row disengagement.",
    mnemonic: { title: "U-Shape Seating", phrase: "Unobstructed View and United Discussion", items: ["U - U-Shape", "D - Discussion-friendly", "E - Eye contact for all"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Analyze classroom seating patterns and spatial dynamics",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Seating Arrangement: Cluster / Pods",
    definition: "Arranging student desks in small groups of 4 to 6 facing each other to facilitate small-group collaboration, cooperative learning, and peer-assisted discussions.",
    rationalization: "Best for project-based learning and group experiments, though requires strong management to prevent off-task chatter during teacher presentations.",
    mnemonic: { title: "Cluster Pods", phrase: "Clusters Catalyze Cooperative Collaboration", items: ["C - Cluster pods", "C - Cooperative work", "P - Peer discussions"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Analyze classroom seating patterns and spatial dynamics",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Classroom Routines and Procedures",
    definition: "Pre-established, repeatedly practiced classroom habits for recurring daily activities: line formation, passing papers, requesting bathroom breaks, sharpening pencils, and dismissal.",
    rationalization: "Smooth routines conserve instructional time, eliminate chaotic downtime, and create predictable psychological security for children.",
    mnemonic: { title: "Classroom Routines", phrase: "Practiced Procedures Prevent Pandemonium", items: ["R - Routines", "P - Practiced procedures", "T - Time saved for learning"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Establish and observe effective classroom routines",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Classroom Display Boards and Learning Corners",
    definition: "Purposeful bulletin boards, word walls, reading corners, science discovery tables, and math manipulative stations that enrich classroom environment.",
    rationalization: "Must celebrate student work and reinforce current learning competencies rather than merely serving decorative purposes.",
    mnemonic: { title: "Display Boards", phrase: "Showcasing Student Success and Schema", items: ["B - Bulletin boards", "S - Student work highlighted", "L - Learning corners active"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Design learning corners and instructional bulletin boards",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Learner Diversity: Gender-Responsive Teaching",
    definition: "Instructional practices that eliminate gender stereotypes, encourage equal participation across genders in STEM and leadership, and model inclusive non-sexist language.",
    rationalization: "Aligned with DepEd Gender and Development (GAD) mandates and DepEd Order No. 32, s. 2017 (Gender-Responsive Basic Education Policy).",
    mnemonic: { title: "Gender-Responsive", phrase: "Equal Opportunities for Every Gender", items: ["G - Gender responsiveness", "N - Non-sexist language", "E - Equal leadership roles"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement gender-responsive and culturally-sensitive teaching",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Learner Diversity: Indigenous Peoples Education (IPEd)",
    definition: "Pedagogical accommodation of indigenous learners' cultural heritage, oral traditions, and ancestral context per DepEd Order No. 62, s. 2011 (National IPEd Policy Framework).",
    rationalization: "Field study students observe how indigenous knowledge systems and practices (IKSPs) are respectfully honored and integrated into lessons.",
    mnemonic: { title: "IPEd Framework", phrase: "Honoring Indigenous Heritage in the Classroom", items: ["IPEd - Indigenous Peoples Education", "IKSP - Indigenous Knowledge Systems", "C - Cultural respect"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement gender-responsive and culturally-sensitive teaching",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Anecdotal Record",
    definition: "A concise, objective written narrative record describing a specific significant student incident, behavior, or crisis event, noted immediately after its occurrence.",
    rationalization: "Includes date, time, setting, factual description of behavior, and a separate section for the observer's tentative interpretation and recommended action.",
    mnemonic: { title: "Anecdotal Record", phrase: "Accurate Narrative of an Actual Act", items: ["A - Anecdotal record", "O - Objective narrative", "I - Incident documented"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Record and interpret anecdotal records and learner profiles",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Learner Profile / Case Study in Field Study",
    definition: "An in-depth holistic developmental study of an individual learner documenting academic, cognitive, socio-emotional, behavioral, and home background factors.",
    rationalization: "Enables pre-service teachers to understand the multifaceted roots of learning difficulties and formulate tailored instructional recommendations.",
    mnemonic: { title: "Learner Profile", phrase: "Holistic Picture of the Individual Pupil", items: ["L - Learner profile", "H - Holistic development", "T - Tailored support plan"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Record and interpret anecdotal records and learner profiles",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Gibbs' Reflective Cycle (Graham Gibbs)",
    definition: "A 6-stage structured reflection model: 1. Description (what happened?), 2. Feelings (what were you thinking?), 3. Evaluation (what was good/bad?), 4. Analysis (making sense), 5. Conclusion (what else could be done?), 6. Action Plan (future steps).",
    rationalization: "Guides pre-service teachers to move beyond mere storytelling into critical self-reflection and actionable pedagogical growth.",
    mnemonic: { title: "Gibbs' 6 Stages", phrase: "Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan", items: ["1 - Description", "2 - Feelings", "3 - Evaluation", "4 - Analysis", "5 - Conclusion", "6 - Action Plan"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Apply Gibbs' and Kolb's reflective cycles in practicum journals",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pre-Observation Conference",
    definition: "A preparatory meeting between the cooperating teacher and student observer/intern prior to lesson delivery to review lesson objectives, target competencies, and observation focus areas.",
    rationalization: "Clarifies expectations and allows the intern to ask questions about specific learner needs before entering the classroom.",
    mnemonic: { title: "Pre-Observation", phrase: "Preparing Purpose Prior to Presentation", items: ["P - Pre-observation", "O - Objectives clarified", "F - Focus areas agreed"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Participate in pre- and post-observation supervisory conferences",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Post-Observation Conference (Debriefing)",
    definition: "A constructive, collaborative feedback meeting following lesson observation where the observer and teacher analyze lesson delivery, highlight strengths, and formulate improvement plans.",
    rationalization: "Uses the 'praise-critique-praise' (feedback sandwich) technique to foster professional self-efficacy and reflective insight.",
    mnemonic: { title: "Post-Observation", phrase: "Praising Progress and Planning Perfection", items: ["P - Post-observation", "C - Constructive feedback", "A - Actionable improvements"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Participate in pre- and post-observation supervisory conferences",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Feedback Sandwich Technique",
    definition: "A supervisory communication method framing constructive criticism between two positive accolades: praise for a strength, gentle constructive critique, and closing encouragement.",
    rationalization: "Minimizes defensive reactions and encourages pre-service teachers to embrace corrective feedback constructively.",
    mnemonic: { title: "Feedback Sandwich", phrase: "Praise, Polish, Praise", items: ["P - Praise initial strength", "P - Polish weakness (critique)", "P - Praise future potential"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Provide and receive constructive pedagogical feedback",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Co-Teaching Models: One Teach, One Observe",
    definition: "A co-teaching structure where one teacher leads instructional delivery while the other intentionally collects specific observational data on student engagement and understanding.",
    rationalization: "Ideal during early FS 2 assistantship so the intern gathers objective data without feeling overwhelmed by whole-class management.",
    mnemonic: { title: "One Teach, One Observe", phrase: "One Instructs, One Investigates", items: ["T - Teaching partner", "O - Observing data collector"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement co-teaching models during assistantship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Co-Teaching Models: One Teach, One Assist (Drift)",
    definition: "A co-teaching model where the master teacher conducts main instruction while the student intern circulates around the room providing individual help, monitoring notes, and quietly curbing off-task behavior.",
    rationalization: "Provides struggling learners immediate assistance without disrupting the master teacher's instructional momentum.",
    mnemonic: { title: "One Teach, One Assist", phrase: "Leader Leads, Assistant Assists", items: ["L - Lead teacher lectures", "A - Assistant roams & supports"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement co-teaching models during assistantship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Co-Teaching Models: Station Teaching",
    definition: "A model where the lesson is divided into distinct content stations; the cooperating teacher and student intern each teach a specific station while students rotate between them.",
    rationalization: "Reduces student-teacher ratio and allows pre-service teachers to master a specific lesson segment with smaller groups.",
    mnemonic: { title: "Station Co-Teaching", phrase: "Splitting Content Across Simultaneous Stations", items: ["S - Station teaching", "R - Rotating groups", "S - Shared instructional load"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement co-teaching models during assistantship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Co-Teaching Models: Parallel Teaching",
    definition: "A co-teaching model where the class is divided into two halves, with the cooperating teacher and intern teaching the exact same material simultaneously to their respective halves.",
    rationalization: "Doubles student participation opportunities and enables more individualized checking for understanding.",
    mnemonic: { title: "Parallel Teaching", phrase: "Two Halves Taught Simultaneously", items: ["P - Parallel teaching", "H - Half class each", "S - Same curriculum"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement co-teaching models during assistantship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Co-Teaching Models: Team Teaching (Tag-Team)",
    definition: "Both teachers simultaneously deliver instruction to the entire class as equal partners, conversing, role-playing, demonstrating experiments, and interjecting points collaboratively.",
    rationalization: "Requires high professional rapport and mutual planning; models mature collaborative discourse for students.",
    mnemonic: { title: "Team Teaching", phrase: "Two Voices Harmonizing in Harmony", items: ["T - Team teaching", "S - Simultaneous instruction", "P - Partnership in presentation"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Implement co-teaching models during assistantship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Microteaching",
    definition: "A scaled-down simulated teaching practice session where a pre-service teacher delivers a short 5 to 15 minute mini-lesson to a small group of peers (or students) targeting a single specific pedagogical skill.",
    rationalization: "Allows safe practice, videotaping, immediate peer critique, and reteaching of core skills like probing questioning or introducing a lesson.",
    mnemonic: { title: "Microteaching", phrase: "Mini Lessons Mastering Specific Skills", items: ["M - Microteaching", "S - Scaled-down lesson", "F - Focused feedback"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Execute microteaching demonstrations and self-critiques",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Instructional Scaffolding Materials",
    definition: "Concrete learning aids constructed by pre-service teachers to support student comprehension: flashcards, graphic organizers, sentence frames, phonics charts, and step-by-step cue cards.",
    rationalization: "Assisting teachers in creating these low-cost indigenous materials develops resourcefulness and pedagogical dexterity.",
    mnemonic: { title: "Scaffolding Aids", phrase: "Low-Cost Aids for High-Impact Learning", items: ["S - Scaffolding aids", "L - Low-cost materials", "C - Concrete support"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Produce instructional media and supplementary learning aids",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pre-Service Teacher e-Portfolio",
    definition: "A structured digital archive curated by the practicum student showcasing lesson plans, observation notes, video clips of teaching, student work samples, and reflective essays aligned with PPST domains.",
    rationalization: "Provides comprehensive authentic evidence of readiness for professional licensing and graduation.",
    mnemonic: { title: "PST e-Portfolio", phrase: "Digital Showcase of Teaching Competence", items: ["P - Portfolio", "E - Electronic curation", "P - PPST domain alignment"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Compile an authentic pre-service teacher practicum portfolio",
    bloomsTaxonomy: "Creating",
    highYield: true
  },
  {
    term: "School Culture and Climate Observation",
    definition: "Assessing the unwritten values, traditions, teacher collegiality, leadership transparency, and emotional safety characterizing a cooperating school community.",
    rationalization: "A positive school culture is evident when teachers collaborate willingly and students feel safe, welcomed, and respected.",
    mnemonic: { title: "School Climate", phrase: "The Atmosphere and Attitude of the Academy", items: ["C - Culture & climate", "C - Collegiality", "S - Safety & belonging"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Analyze school organizational climate and community relations",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "School Learning Resource Center (LRC / Library)",
    definition: "The dedicated facility in a school housing print books, digital learning devices, supplementary modules, science kits, and audio-visual resources.",
    rationalization: "FS students assess LRC accessibility, cataloging quality, and how effectively classroom teachers integrate LRC resources into daily assignments.",
    mnemonic: { title: "Learning Resource Center", phrase: "LRC: Library and Learning Lifeline", items: ["LRC - Learning Resource Center", "M - Multimedia & books", "A - Accessibility for all"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Audit school learning resource centers and library facilities",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "School Guidance Office and Child Protection Committee",
    definition: "The specialized school support units handling student counseling, psychological assessments, behavioral interventions, and child abuse/bullying complaints under RA 10627.",
    rationalization: "Pre-service teachers observe how the guidance counselor collaborates with classroom teachers to support students facing emotional trauma or family distress.",
    mnemonic: { title: "Guidance and CPC", phrase: "Counseling and Caring for Child Well-being", items: ["G - Guidance office", "CPC - Child Protection Committee", "R - RA 10627 anti-bullying"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Examine student support services (Guidance, CPC, Clinic)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "School Feeding Program and Clinic Observations",
    definition: "The DepEd School-Based Feeding Program (SBFP) providing hot meals or nutritious food products to wasted and severely wasted learners.",
    rationalization: "Field study observers witness the vital link between physical nutrition and cognitive attentiveness: hungry children cannot learn effectively.",
    mnemonic: { title: "SBFP Feeding Program", phrase: "Nourishing the Body to Nurture the Brain", items: ["SBFP - School-Based Feeding", "N - Nutrition priority", "L - Learning readiness enabled"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Examine student support services (Guidance, CPC, Clinic)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Punctuality and Professional Presence in Practicum",
    definition: "The ethical commitment to arrive at the cooperating school ahead of time, sign the official logbook, maintain professional grooming, and fulfill all assigned supervisory duties.",
    rationalization: "Habitual tardiness or casual attire violates the Code of Ethics and can result in cancellation of student practicum placement.",
    mnemonic: { title: "Professional Presence", phrase: "Punctual, Polished, and Professional Presence", items: ["P - Punctuality", "P - Professional attire", "L - Logbook accuracy"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Uphold professional presence, decorum, and practicum work ethics",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Child Safeguarding and Privacy in Field Study",
    definition: "The strict prohibition against taking unauthorized photographs or videos of students, posting minors' faces on social media, or disclosing students' sensitive personal records.",
    rationalization: "Mandated by the Data Privacy Act (RA 10173) and the DepEd Child Protection Policy (DO 40, s. 2012); violations are subject to legal sanctions.",
    mnemonic: { title: "Child Safeguarding", phrase: "Protecting Student Privacy and Safety Always", items: ["D - Data privacy (RA 10173)", "C - Child protection (DO 40)", "N - No unauthorized social media posts"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Comply with child protection and data privacy policies during practicum",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Formative Lesson Checkpoints",
    definition: "Rapid, informal checks for understanding during live lessons (e.g., thumbs up/down, mini-whiteboards, exit tickets, 3-2-1 summaries) observed by pre-service teachers.",
    rationalization: "Provides the teacher live data on student comprehension before proceeding to independent practice.",
    mnemonic: { title: "Formative Checkpoints", phrase: "Checking Comprehension Constantly", items: ["C - Checkpoints", "E - Exit tickets", "M - Mini whiteboards"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Observe and apply formative assessment techniques during lessons",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Exit Ticket",
    definition: "A concise formative end-of-class prompt answered by students on an index card or slip of paper before leaving the room, assessing mastery of the day's core competency.",
    rationalization: "Enables the teacher to sort responses into piles (mastered, developing, needing remediation) to plan the next day's review or intervention.",
    mnemonic: { title: "Exit Ticket", phrase: "A Quick Pass Before You Pass Out the Door", items: ["E - Exit ticket", "Q - Quick formative check", "P - Planning next lesson"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Observe and apply formative assessment techniques during lessons",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Diagnostic Reading Inventory (Phil-IRI)",
    definition: "The Philippine Informal Reading Inventory (Phil-IRI), an informal diagnostic assessment tool used to determine elementary students' reading performance in Filipino and English.",
    rationalization: "Classifies learners into Independent, Instructional, and Frustration reading levels; field study students frequently assist in administering it.",
    mnemonic: { title: "Phil-IRI Reading Levels", phrase: "Independent, Instructional, Frustration", items: ["I - Independent (easy)", "I - Instructional (optimal)", "F - Frustration (too hard)"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Assist in administering diagnostic assessments (Phil-IRI)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Instructional Material: Realia and Manipulatives",
    definition: "Real, authentic physical objects and tactile hands-on materials brought into the classroom to make abstract concepts concrete (e.g., real leaves for biology, play money for economics).",
    rationalization: "Connects with Bruner's enactive representation and Dale's direct purposeful experiences, anchoring lasting memories.",
    mnemonic: { title: "Realia and Manipulatives", phrase: "Real Objects for Real Learning", items: ["R - Realia (authentic objects)", "M - Manipulatives (hands-on math/science)"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Produce instructional media and supplementary learning aids",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Teacher's Affective Presence",
    definition: "The emotional disposition, enthusiasm, warmth, vocal inflection, humor, and empathy exhibited by a teacher that sets the motivational tone of the classroom.",
    rationalization: "Observed to be a major determinant of student engagement; teachers who project passion inspire reciprocal excitement in learners.",
    mnemonic: { title: "Affective Presence", phrase: "Warmth and Wonder Wake Up Weak Students", items: ["A - Affective presence", "E - Enthusiasm & warmth", "M - Motivation sparked"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Observe teacher affective qualities and communication impact",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Debriefing and Mentoring Circles",
    definition: "Regular weekly collaborative sharing sessions among field study peers and practicum professors to process classroom challenges, vent anxieties, and celebrate teaching milestones.",
    rationalization: "Reduces pre-service teacher burnout and builds a lasting professional community of practice.",
    mnemonic: { title: "Mentoring Circles", phrase: "Peers Processing Practicum Problems Together", items: ["D - Debriefing circles", "P - Peer support", "M - Mentorship guidance"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Engage in peer debriefing and collaborative mentoring",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Transitioning from Observer to Practitioner",
    definition: "The psychological and developmental evolution of a pre-service teacher from an outside passive observer to an active, responsible classroom participant and co-teacher.",
    rationalization: "Requires overcoming imposter syndrome, asserting professional confidence, and viewing classroom events through an analytical pedagogical lens.",
    mnemonic: { title: "Observer to Practitioner", phrase: "From Spectator in the Back to Teacher in the Front", items: ["O - Observer status initial", "P - Practitioner mindset final", "C - Confidence built"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Track developmental transitions from observer to practitioner",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Continuous Professional Growth Plan (IPCRF Alignment)",
    definition: "A personalized developmental plan drafted by pre-service teachers identifying their pedagogical gaps and outlining specific workshops, readings, and mentoring goals to achieve mastery.",
    rationalization: "Prepares pre-service teachers for the Individual Performance Commitment and Review Form (IPCRF) used in professional DepEd service.",
    mnemonic: { title: "Professional Growth Plan", phrase: "Planning Progress from Practicum to Profession", items: ["P - Professional growth plan", "I - IPCRF alignment", "G - Goal-driven development"] },
    source: "PRC BLEPT ProfEd Field Study Reviewer",
    tosCompetency: "Draft individual professional development and growth plans",
    bloomsTaxonomy: "Creating",
    highYield: true
  }
];

// Write Field Study
writeDataset(
  'data/profed/field_study/field_study.json',
  'Professional Education',
  'Field Study',
  'Learner Diversity, Classroom Observation, Lesson Delivery, & School Environment',
  profed12Items
);
