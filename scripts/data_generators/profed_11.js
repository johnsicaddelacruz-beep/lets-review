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

// 11. Action Research (50 items)
const profed11Items = [
  {
    term: "Action Research (Kurt Lewin / Stephen Corey)",
    definition: "A systematic, reflective inquiry conducted by classroom teachers and educators to diagnose practical pedagogical problems, implement targeted interventions, and improve teaching practices.",
    rationalization: "Unlike basic research which seeks universal theories, action research focuses on immediate practical problem-solving in a specific classroom or school setting.",
    mnemonic: { title: "Action Research Essence", phrase: "Action Solves Actual Classroom Ailments", items: ["A - Action-oriented", "R - Reflective practitioner", "P - Practical classroom solutions"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Define action research concepts and differentiate from traditional research",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Action Research Cycle (Kemmis & McTaggart)",
    definition: "The cyclical, iterative four-stage process of action research: 1. Plan (identify problem & design intervention), 2. Act (implement innovation), 3. Observe (gather data), and 4. Reflect (evaluate outcomes).",
    rationalization: "The cycle is continuous; reflection on the initial results leads to a revised plan and subsequent cycles until the educational problem is resolved.",
    mnemonic: { title: "PAOR Cycle", phrase: "Plan, Act, Observe, Reflect", items: ["P - Plan", "A - Act", "O - Observe", "R - Reflect"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Sequence and describe the phases of the action research cycle",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "DepEd Order No. 16, s. 2017 (Research Management Guidelines)",
    definition: "The policy governing research governance in DepEd, institutionalizing the Basic Education Research Agenda (BERA) and the Basic Education Research Fund (BERF).",
    rationalization: "Establishes research committees at the National, Regional, and Schools Division Office (SDO) levels to screen and fund teacher-led action research proposals.",
    mnemonic: { title: "DO 16 s. 2017", phrase: "DepEd Order Sixteen: Research Management Standard", items: ["DO 16 - Research management", "BERA - Research agenda", "BERF - Research funding"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply DepEd policies on research management (DO 16, s. 2017)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Basic Education Research Fund (BERF)",
    definition: "The competitive funding grant provided by DepEd to support eligible school teachers and personnel conducting basic or action research.",
    rationalization: "Grantees receive financial assistance to cover legitimate research supplies, reproduction, and dissemination expenses upon proposal approval.",
    mnemonic: { title: "BERF Grant", phrase: "Basic Education Research Fund Fuels Teachers", items: ["B - Basic Education", "R - Research Fund", "F - Financial grant for action research"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply DepEd policies on research management (DO 16, s. 2017)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Action Research Title Formulation",
    definition: "A concise, descriptive statement capturing the target intervention/strategy, the specific problem or learning competency to improve, and the target group of participants.",
    rationalization: "E.g., 'Enhancing Reading Comprehension of Grade 7 Students Through Interactive Digital Gamification.' Clear, actionable, and focused.",
    mnemonic: { title: "Action Research Title", phrase: "Intervention + Target Competency + Target Learners", items: ["I - Intervention named", "C - Competency addressed", "P - Population specified"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Formulate action research problems and titles",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Classroom Intervention / Innovation",
    definition: "The novel instructional strategy, tailored teaching package, manipulative tool, or remedial activity introduced by the teacher to remediate an identified learning deficiency.",
    rationalization: "Must be directly actionable and teacher-managed (e.g., peer-tutoring circles, mnemonic drills, mobile learning apps, contextualized modules).",
    mnemonic: { title: "Classroom Intervention", phrase: "Intervention Introduces Impactful Innovation", items: ["I - Intervention", "T - Targeted solution", "A - Actionable by teacher"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Design classroom interventions and instructional innovations",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Action Research Questions",
    definition: "Specific inquiry questions guiding the study, typically investigating: baseline status before intervention, post-intervention status, significant difference, and proposed action plan.",
    rationalization: "Guides data collection and analysis; e.g., 'What is the pre-test score?', 'What is the post-test score?', 'Is there a significant difference?'",
    mnemonic: { title: "Research Questions", phrase: "Pre, Post, Difference, and Future Direction", items: ["1 - Baseline status", "2 - Post-intervention status", "3 - Significant difference", "4 - Plan of action"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Formulate action research problems and titles",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Purposive Sampling (Intact Class)",
    definition: "A non-probability sampling technique where respondents are intentionally selected because they exhibit the specific learning deficit under investigation (e.g., struggling readers in Section B).",
    rationalization: "Action researchers typically work with their own assigned intact classes rather than disrupting school operations with random assignment.",
    mnemonic: { title: "Purposive Sampling", phrase: "Purposive Pick for Particular Problems", items: ["P - Purposive", "I - Intact classroom", "D - Deficit-focused selection"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Select sampling methods appropriate for action research",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Triangulation in Research",
    definition: "The method of using multiple data sources, investigators, theoretical perspectives, or research methods to cross-validate findings and increase credibility in qualitative and mixed studies.",
    rationalization: "For example, combining pre/post test scores with classroom observations and student interview logs ensures robust, trustworthy conclusions.",
    mnemonic: { title: "Triangulation", phrase: "Three Angles Anchor True Accuracy", items: ["T - Triangulation", "M - Multiple sources / methods", "V - Validation of evidence"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply triangulation to enhance research validity",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Methodological Triangulation",
    definition: "Combining qualitative and quantitative data gathering methods (e.g., test scores plus focus group discussion and reflective journals) to examine a single classroom phenomenon.",
    rationalization: "Compensates for the limitations of a single data collection tool and provides holistic insight into learner growth.",
    mnemonic: { title: "Methodological Triangulation", phrase: "Mixing Quantitative Numbers with Qualitative Narratives", items: ["M - Methodological", "Q - Quantitative scores", "Q - Qualitative interviews"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply triangulation to enhance research validity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Pre-Experimental Design: One-Group Pretest-Posttest Design",
    definition: "The most common action research design: O1 -> X -> O2 (where O1 is baseline pre-test, X is classroom intervention, and O2 is post-intervention assessment of the same group).",
    rationalization: "Feasible and practical for single classroom teachers without requiring a withheld control group, measuring gain scores directly.",
    mnemonic: { title: "One-Group Pre-Post", phrase: "Test Before, Teach Intervention, Test After", items: ["O1 - Pre-test", "X - Intervention", "O2 - Post-test"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Design action research methodologies and experimental frameworks",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Quasi-Experimental Design (Non-Equivalent Control Group)",
    definition: "An experimental design comparing two intact classes (e.g., Section A receives gamified intervention, Section B receives traditional modular lecture) without random assignment of individual students.",
    rationalization: "Provides stronger internal validity than a single group design while respecting existing school sectioning.",
    mnemonic: { title: "Quasi-Experimental", phrase: "Comparing Two Sections Without Shuffling Students", items: ["Q - Quasi-experimental", "I - Intact sections", "C - Control vs Experimental"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Design action research methodologies and experimental frameworks",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Paired-Samples t-Test (Dependent t-Test)",
    definition: "The statistical test used to determine whether there is a statistically significant difference between the pre-test and post-test mean scores of the same group of students.",
    rationalization: "Appropriate because the two sets of observations come from the identical participants measured before and after the classroom intervention.",
    mnemonic: { title: "Paired t-Test", phrase: "Paired Pre-Post Proves Progress", items: ["P - Paired t-test", "D - Dependent samples", "S - Same students compared"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Select appropriate statistical tools for data analysis",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Independent Samples t-Test",
    definition: "The statistical test used to compare the mean scores of two separate, unrelated groups (e.g., Experimental Section vs Control Section) to see if their performance differs significantly.",
    rationalization: "Used when evaluating whether students taught using a new strategy scored significantly higher than students taught traditionally in a different section.",
    mnemonic: { title: "Independent t-Test", phrase: "Two Independent Teams Tested Against Each Other", items: ["I - Independent t-test", "T - Two different groups", "M - Mean difference compared"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Select appropriate statistical tools for data analysis",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Descriptive Statistics in Action Research",
    definition: "Statistical techniques including Frequency, Percentage, Mean, and Standard Deviation used to summarize, organize, and describe raw classroom data meaningfully.",
    rationalization: "Allows the teacher to clearly communicate student passing rates and average performance gains to school heads and parents.",
    mnemonic: { title: "Descriptive Stats", phrase: "Summarizing School Scores Simply", items: ["D - Descriptive stats", "M - Mean and SD", "P - Percentages and frequencies"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Select appropriate statistical tools for data analysis",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Thematic Analysis in Qualitative Action Research",
    definition: "A method of analyzing qualitative data (from interview transcripts, student reflection journals, and field notes) by coding patterns and organizing them into coherent themes.",
    rationalization: "Uncovers student emotional attitudes, perceived difficulties, and engagement factors during instructional innovations.",
    mnemonic: { title: "Thematic Analysis", phrase: "Coding Clues to Create Coherent Themes", items: ["T - Thematic analysis", "C - Coding qualitative data", "T - Themes extracted"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Analyze qualitative data from journals and interviews",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Classroom Observation Protocol / Checklist",
    definition: "A standardized data gathering instrument used by teacher-researchers or peer observers to record the frequency, duration, and nature of specific student or teacher behaviors.",
    rationalization: "Provides objective empirical behavioral evidence during the implementation of a new pedagogical intervention.",
    mnemonic: { title: "Observation Checklist", phrase: "Checking Classroom Conduct Consistently", items: ["O - Observation checklist", "B - Behavioral tally", "O - Objective evidence"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Develop data collection instruments for action research",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Teacher's Reflective Journal",
    definition: "A personal, systematic record kept by the teacher-researcher detailing daily observations, thoughts, frustrations, pedagogical triumphs, and spontaneous instructional adjustments during the study.",
    rationalization: "Captures the evolving lived experience of teaching and serves as primary qualitative data for the reflection phase of the action research cycle.",
    mnemonic: { title: "Reflective Journal", phrase: "Recording Reflections on Routine Realities", items: ["R - Reflective journal", "D - Daily entries", "I - Insights and adjustments"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Utilize reflective journaling as a qualitative data source",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Focus Group Discussion (FGD)",
    definition: "A guided, interactive group discussion with a small group of students (typically 6-8 participants) facilitated by the teacher to explore in-depth perceptions of an intervention.",
    rationalization: "Generates rich interactive responses as student comments trigger shared insights that individual written surveys might miss.",
    mnemonic: { title: "Focus Group Discussion", phrase: "Focused Group Generating Great Groundwork", items: ["F - FGD", "S - Small group interaction (6-8)", "P - Perceptions explored"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Conduct focus group discussions and interviews with learners",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Informed Consent and Assent",
    definition: "Informed Consent is the voluntary agreement signed by adult participants or parents/guardians; Assent is the affirmative willingness expressed by minor students to participate in the study.",
    rationalization: "Crucial research ethics principle: teachers cannot coerce minor students to participate without parental consent and child assent.",
    mnemonic: { title: "Consent and Assent", phrase: "Parental Consent, Child Assent", items: ["C - Consent from parents/adults", "A - Assent from minor learners", "V - Voluntary participation"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply ethical considerations in conducting educational research",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Confidentiality and Anonymity",
    definition: "Confidentiality protects participant identities by keeping identifiable information secure; Anonymity means the researcher cannot identify individual participant responses at all.",
    rationalization: "In classroom action research, pseudonyms (e.g., Student A, Teacher X) are used in research reports to protect learner privacy and dignity.",
    mnemonic: { title: "Anonymity & Confidentiality", phrase: "Pseudonyms Protect Personal Privacy", items: ["A - Anonymity", "C - Confidentiality", "P - Pseudonyms used"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply ethical considerations in conducting educational research",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Beneficence and Non-Maleficence",
    definition: "Beneficence requires maximizing positive educational benefits for students; Non-maleficence is the ethical duty to do no harm and ensure no learner is disadvantaged by the research.",
    rationalization: "If a teacher discovers an intervention significantly boosts performance, control groups must be given access to the same beneficial intervention after the study.",
    mnemonic: { title: "Beneficence & Non-Maleficence", phrase: "Do Good and Do No Harm", items: ["B - Beneficence (maximize good)", "N - Non-maleficence (do no harm)", "E - Equal access post-study"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply ethical considerations in conducting educational research",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Gantt Chart (Work Plan / Timetable)",
    definition: "A visual horizontal bar chart scheduling the sequential timeline of action research activities, phases, deliverables, and milestones across weeks or months.",
    rationalization: "Ensures the teacher keeps the project on schedule from proposal writing through data collection to final dissemination.",
    mnemonic: { title: "Gantt Chart", phrase: "Graphic Timetable Tracking Tasks", items: ["G - Gantt chart", "T - Timeline of activities", "M - Milestones tracked"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Construct action research work plans and Gantt charts",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Financial Plan / Cost Estimates",
    definition: "The itemized, justified budget breakdown in an action research proposal detailing necessary expenditures (printing, supplies, communication, travel) adhering to BERF allowable expense rules.",
    rationalization: "BERF guidelines strictly disallow purchasing capital outlay equipment like laptops or smartphones; only consumable operational supplies are eligible.",
    mnemonic: { title: "BERF Financial Rules", phrase: "Operational Supplies Allowed, Capital Outlay Banned", items: ["A - Allowable = Supplies & printing", "D - Disallowed = Gadgets/laptops/salaries"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Prepare cost estimates adhering to BERF guidelines",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Action Plan / Dissemination Plan",
    definition: "The concrete roadmap outlining how research findings and successful interventions will be sustained, shared, integrated into school improvement plans, or scaled up.",
    rationalization: "Action research is useless if filed away; findings must lead to concrete changes in school policy, teacher training, or instructional practice.",
    mnemonic: { title: "Dissemination Plan", phrase: "Sharing Solutions for Schoolwide Success", items: ["D - Dissemination", "U - Utilization in classes", "S - Scaling up good practice"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Formulate action plans based on research findings",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Learning Action Cell (LAC) Dissemination",
    definition: "The school-based community of practice where teachers present their action research results, share successful interventions, and mentor colleagues during weekly/monthly sessions.",
    rationalization: "DepEd Order No. 35, s. 2016 establishes LAC as the primary vehicle for continuous teacher professional development through peer research sharing.",
    mnemonic: { title: "LAC Sharing", phrase: "LAC Levels Up Local Learning", items: ["L - Learning Action Cell", "D - DO 35, s. 2016", "S - School-based dissemination"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Disseminate research findings via LAC and conferences",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Continuous Improvement (CI) Project",
    definition: "A structured methodology adapted by DepEd from Lean Six Sigma that identifies school operational/instructional bottlenecks and executes rapid, data-driven cycle solutions.",
    rationalization: "Follows Assess, Analyze, and Act stages; closely linked with action research in improving school drop-out rates, reading levels, and nutritional status.",
    mnemonic: { title: "CI Project", phrase: "Assess, Analyze, Act for School Excellence", items: ["C - Continuous Improvement", "A - Assess", "A - Analyze", "A - Act"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Differentiate CI projects from academic action research",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Basic Education Research Agenda (BERA)",
    definition: "The priority thematic research areas set by DepEd under DO 39, s. 2016: 1. Teaching and Learning, 2. Child Protection, 3. Human Resource Development, and 4. Governance.",
    rationalization: "Teacher action research proposals must align with one of these four BERA themes to qualify for national or division endorsement and funding.",
    mnemonic: { title: "BERA 4 Themes", phrase: "Teaching, Protection, HR, Governance (TPHG)", items: ["1 - Teaching and Learning", "2 - Child Protection", "3 - Human Resource Dev", "4 - Governance"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Align research proposals with DepEd's BERA themes",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Internal Validity in Action Research",
    definition: "The degree to which the observed improvement in student learning can be conclusively attributed to the teacher's intervention rather than confounding extraneous variables.",
    rationalization: "Threats include maturation (natural aging), history (events outside class), testing effects (remembering pre-test items), and regression to the mean.",
    mnemonic: { title: "Internal Validity", phrase: "Did the Intervention Truly Cause the Improvement?", items: ["I - Internal validity", "C - Cause-and-effect confidence", "T - Threats controlled"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Analyze threats to internal and external validity in classroom studies",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "External Validity (Generalizability)",
    definition: "The extent to which research findings can be generalized to other populations, settings, and grade levels beyond the immediate classroom sample.",
    rationalization: "Action research prioritizes local classroom relevance (high ecological validity) over broad external generalizability; its goal is local improvement, not universal theory.",
    mnemonic: { title: "External Validity", phrase: "Generalizing Beyond Given Classrooms", items: ["E - External validity", "G - Generalizability", "L - Local relevance prioritized in AR"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Analyze threats to internal and external validity in classroom studies",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Maturation Threat",
    definition: "An extraneous threat to internal validity where biological or psychological changes in students over time (growing older, fatigue, natural cognitive development) cause test score gains.",
    rationalization: "In long-term studies, students may improve simply because they grew older and smarter, not necessarily due to the intervention alone.",
    mnemonic: { title: "Maturation Threat", phrase: "Maturing Naturally Makes Scores Move", items: ["M - Maturation threat", "G - Growing older & wiser", "C - Confounding variable"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Analyze threats to internal and external validity in classroom studies",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Hawthorne Effect",
    definition: "The psychological phenomenon where participants alter their behavior or perform better simply because they know they are being studied or observed.",
    rationalization: "Students in an action research study may put in extra effort because of the novel attention from the teacher, not strictly the pedagogical method itself.",
    mnemonic: { title: "Hawthorne Effect", phrase: "Performing Better Because We Are Being Watched", items: ["H - Hawthorne effect", "A - Awareness of observation", "B - Boosts behavior temporarily"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Identify experimental observation artifacts (Hawthorne, Pygmalion)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "John Henry Effect (Compensatory Rivalry)",
    definition: "A threat where students in the untreated control group discover they are in the comparison group and exert extraordinary effort to outperform the experimental group.",
    rationalization: "Can obscure the true benefits of an innovative intervention by artificially inflating the control group's performance.",
    mnemonic: { title: "John Henry Effect", phrase: "Underdog Control Group Fights Back Fiercely", items: ["J - John Henry", "C - Compensatory rivalry", "C - Control group overexerts"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Identify experimental observation artifacts (Hawthorne, Pygmalion)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Statistical Significance (p-value < 0.05)",
    definition: "The conventional benchmark in educational research meaning that there is less than a 5% probability that the observed score gain occurred merely by random chance.",
    rationalization: "If p < 0.05, researchers reject the null hypothesis and conclude that the classroom intervention produced a real, significant effect.",
    mnemonic: { title: "p < 0.05 Benchmark", phrase: "Probability Below Five Percent Proves Significance", items: ["p < 0.05 - Significant", "Reject null hypothesis", "Real intervention effect"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Interpret p-values and hypothesis testing decisions",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Null Hypothesis (H0)",
    definition: "The statistical proposition stating that there is no significant difference, relationship, or effect between the variables under study (e.g., 'There is no significant difference between pre- and post-test scores').",
    rationalization: "The hypothesis that researchers test and seek to reject based on statistical evidence.",
    mnemonic: { title: "Null Hypothesis", phrase: "Null Means No Significant Difference", items: ["H0 - Null hypothesis", "N - No difference claimed", "R - Rejected when p < 0.05"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Formulate and test null and alternative hypotheses",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Alternative Hypothesis (H1 / Ha)",
    definition: "The directional or non-directional proposition stating that a significant difference or relationship exists between variables as a result of the intervention.",
    rationalization: "Reflects the teacher's expected outcome: e.g., 'There is a significant improvement in reading fluency following the phonics intervention.'",
    mnemonic: { title: "Alternative Hypothesis", phrase: "Actual Difference Affirmed by Ha", items: ["H1 - Alternative hypothesis", "S - Significant difference exists", "A - Affirmed when null is rejected"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Formulate and test null and alternative hypotheses",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Type I Error (Alpha Error, False Positive)",
    definition: "The statistical error of rejecting the null hypothesis when it is actually true (concluding an intervention worked when it actually did not).",
    rationalization: "Controlled by setting the significance level alpha (typically 0.05).",
    mnemonic: { title: "Type I Error", phrase: "Type I: False Alarm Claiming Success", items: ["T1 - Type I error", "F - False positive", "R - Rejecting a true null"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Distinguish Type I and Type II errors in research",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Type II Error (Beta Error, False Negative)",
    definition: "The statistical error of failing to reject (accepting) the null hypothesis when it is actually false (concluding an intervention failed when it actually worked).",
    rationalization: "Often caused by small sample sizes or high measurement error leading to low statistical power.",
    mnemonic: { title: "Type II Error", phrase: "Type II: Missing a True Miracle", items: ["T2 - Type II error", "F - False negative", "A - Accepting a false null"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Distinguish Type I and Type II errors in research",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Effect Size (Cohen's d)",
    definition: "A standardized metric quantifying the practical magnitude or meaningful strength of the intervention effect independent of sample size: d = (Mean1 - Mean2) / Pooled SD.",
    rationalization: "Guidelines: d = 0.2 is small; d = 0.5 is medium; d = 0.8+ is large. Unlike p-values which only show significance, effect size indicates real educational impact.",
    mnemonic: { title: "Cohen's d Effect Size", phrase: "0.2 Small, 0.5 Medium, 0.8 Large Effect", items: ["d = 0.2 - Small", "d = 0.5 - Medium", "d = 0.8+ - Large magnitude"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Calculate and interpret Cohen's d effect size",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Plagiarism and Academic Integrity",
    definition: "The unethical act of presenting another person's words, ideas, data, or methods as one's own without proper citation, attribution, or acknowledgment.",
    rationalization: "DepEd researchers must follow standard citation styles (APA 7th edition) and maintain zero tolerance for plagiarism and data falsification.",
    mnemonic: { title: "Academic Integrity", phrase: "Attribute All Authors Accurately", items: ["P - Plagiarism avoided", "A - APA citation required", "H - Honest reporting"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply citation guidelines and uphold academic integrity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "APA Citation Style (7th Edition)",
    definition: "The standardized referencing author-date format established by the American Psychological Association, used in education and social science research papers.",
    rationalization: "In-text citation format: (Author, Year, p. XX); Reference list: Author, A. A. (Year). Title of work. Publisher.",
    mnemonic: { title: "APA 7th Style", phrase: "Author, Year, and Accurate References", items: ["A - Author-date in-text", "P - Publication details in references", "A - Academic standard"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Apply citation guidelines and uphold academic integrity",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Action Research Proposal Components",
    definition: "The standard DepEd proposal structure: I. Context and Rationale, II. Research Questions, III. Proposed Innovation/Intervention, IV. Methodology, V. Work Plan and Timetable, VI. Cost Estimates, VII. Dissemination Plan, VIII. References.",
    rationalization: "Required format submitted to Division Research Committees (SDRC) for evaluation and BERF consideration.",
    mnemonic: { title: "AR Proposal Structure", phrase: "Rationale, Questions, Innovation, Method, Plan, Budget", items: ["R - Rationale & Context", "Q - Questions", "I - Innovation", "M - Methodology", "B - Budget & Gantt"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Structure an action research proposal per DepEd guidelines",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Likert Scale",
    definition: "A psychometric rating scale offering respondents multiple ordered response options to measure attitudes, beliefs, or perceptions (e.g., Strongly Agree to Strongly Disagree).",
    rationalization: "Frequently used in student perception questionnaires regarding new teaching strategies; analyzed using weighted mean.",
    mnemonic: { title: "Likert Scale", phrase: "Level of Agreement Along a Spectrum", items: ["L - Likert scale", "A - Attitude measurement", "W - Weighted mean analysis"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Design and analyze survey questionnaires using Likert scales",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Weighted Mean",
    definition: "An average calculated by giving different weights or frequencies to each score category: Weighted Mean = Sum(Weight * Frequency) / Total Respondents.",
    rationalization: "The primary descriptive statistical tool for interpreting 4-point or 5-point Likert scale survey responses.",
    mnemonic: { title: "Weighted Mean Formula", phrase: "Sum of Weight Times Frequency Divided by N", items: ["WM = Sum(w * f) / N", "Interprets scale averages"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Calculate and interpret weighted mean scores",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Action Research as Reflective Practice (Donald Schön)",
    definition: "The conceptualization of action research as 'reflection-in-action' (thinking on one's feet during instruction) and 'reflection-on-action' (analyzing lesson outcomes after class).",
    rationalization: "Transforms teachers from technical implementers into autonomous, critically conscious professionals who continually refine their craft.",
    mnemonic: { title: "Reflection in and on Action", phrase: "Schön: Reflecting During and After Delivery", items: ["R - Reflection-in-action (live)", "R - Reflection-on-action (retrospective)", "S - Schön"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Analyze Donald Schön's reflective practitioner model",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Participatory Action Research (PAR)",
    definition: "A collaborative action research approach where teachers, students, parents, and community stakeholders co-investigate problems, co-design interventions, and share power.",
    rationalization: "Empowers marginalized school communities to analyze systemic inequities and collectively enact educational democracy.",
    mnemonic: { title: "Participatory Action Research", phrase: "Partnership, Action, and Shared Power", items: ["P - Participatory", "C - Co-investigation", "S - Stakeholder empowerment"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Differentiate individual from participatory action research (PAR)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Data Saturation in Qualitative Inquiry",
    definition: "The point during qualitative data collection (e.g., student interviews) when no new information, themes, or perspectives emerge from subsequent respondents.",
    rationalization: "Signals the researcher that sample size is sufficient and data collection may conclude.",
    mnemonic: { title: "Data Saturation", phrase: "Saturated When Nothing New Surfaces", items: ["D - Data saturation", "N - No new themes", "C - Collection concludes"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Determine sample size adequacy and qualitative data saturation",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Member Checking (Respondent Validation)",
    definition: "A qualitative trustworthiness technique where interview transcripts, summaries, and thematic interpretations are shared back with participants to verify accuracy and fidelity.",
    rationalization: "Ensures the teacher-researcher did not misinterpret or bias student voices.",
    mnemonic: { title: "Member Checking", phrase: "Checking Back with Candidates for Accuracy", items: ["M - Member checking", "V - Validation by participants", "T - Trustworthiness secured"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Establish qualitative trustworthiness (credibility, dependability)",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Policy Brief / Executive Summary",
    definition: "A concise 2-4 page policy document summarizing the key research problem, empirical findings, and actionable policy recommendations for school administrators and DepEd leaders.",
    rationalization: "Bridges the gap between classroom research evidence and school-wide educational policy decision-making.",
    mnemonic: { title: "Policy Brief", phrase: "Concise Case for Administrative Action", items: ["P - Policy brief", "E - Evidence-based advice", "A - Action for administrators"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Translate research findings into policy briefs and school interventions",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Sustainability of Action Research Interventions",
    definition: "The institutionalization and continued integration of effective instructional innovations into regular school operations, departmental syllabi, and Annual Implementation Plans (AIP).",
    rationalization: "Ensures that positive student gains are not lost once the formal study period ends, creating lasting institutional improvement.",
    mnemonic: { title: "Intervention Sustainability", phrase: "Sustaining Successful Strategies Systemwide", items: ["S - Sustainability", "I - Institutionalization into AIP", "L - Lasting schoolwide impact"] },
    source: "PRC BLEPT ProfEd Action Research Reviewer",
    tosCompetency: "Design sustainability plans for successful interventions",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  }
];

// Write Action Research
writeDataset(
  'data/profed/action_research/action_research.json',
  'Professional Education',
  'Action Research',
  'Action Research Cycles, Classroom Interventions, Data Gathering, & Reflective Practice',
  profed11Items
);
