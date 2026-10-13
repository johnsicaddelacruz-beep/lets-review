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

// 3. Foundations of Special and Inclusive Education (50 items)
const profed3Items = [
  {
    term: "Republic Act No. 11650 (Inclusive Education Act of 2022)",
    definition: "The landmark Philippine law that institutes a national policy of inclusion and services for learners with disabilities, establishing Inclusive Learning Resource Centers (ILRCs) in all school divisions.",
    rationalization: "Signed in March 2022; guarantees that no learner with a disability shall be denied admission to public or private basic education schools, mandating multi-disciplinary assessments and free instructional support.",
    mnemonic: { title: "RA 11650 Inclusive Law", phrase: "11650 = Inclusion for Learners with Disabilities", items: ["11650 - Inclusive Education Act", "ILRCs in every division", "Zero rejection policy"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Analyze legal mandates, policies, and frameworks governing inclusive education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Salamanca Statement and Framework for Action (1994)",
    definition: "The groundbreaking UNESCO declaration adopted in Salamanca, Spain affirming that regular schools with an inclusive orientation are the most effective means of combating discriminatory attitudes and achieving education for all.",
    rationalization: "Established the fundamental global principle: 'Every child has a fundamental right to education and must be given the opportunity to achieve and maintain an acceptable level of learning.'",
    mnemonic: { title: "Salamanca 1994", phrase: "Salamanca Spain: Origin of Inclusive Schools for All", items: ["1994 - Salamanca, Spain", "Regular schools must include all", "Education for All cornerstone"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Analyze legal mandates, policies, and frameworks governing inclusive education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Republic Act No. 7277 (Magna Carta for Disabled Persons)",
    definition: "The Philippine law that affirms the rehabilitation, self-development, and self-reliance of persons with disabilities (PWDs), guaranteeing equal rights and opportunities in education, employment, and health.",
    rationalization: "Mandates that at least 1% of all positions in government agencies and public schools be reserved for persons with disabilities, and prohibits discrimination in school admissions.",
    mnemonic: { title: "RA 7277 Magna Carta", phrase: "7277 = Magna Carta for PWDs", items: ["7277 - Magna Carta for PWDs", "Equal access to education", "Prohibition of discrimination"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Analyze legal mandates, policies, and frameworks governing inclusive education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Batas Pambansa Blg. 344 (Accessibility Law)",
    definition: "The law requiring public and private buildings, institutions, streets, and school facilities to install architectural accommodations such as wheelchair ramps, handrails, elevators, and tactile paving.",
    rationalization: "Eliminates physical architectural barriers so that individuals with mobility and visual impairments can navigate school grounds with independence and dignity.",
    mnemonic: { title: "BP 344 Accessibility", phrase: "344 = Wheelchair Ramps and Barrier-Free Schools", items: ["344 - Accessibility Law", "Wheelchair ramps & handrails", "Barrier-free physical access"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Analyze legal mandates, policies, and frameworks governing inclusive education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Filipino Sign Language Act (RA 11106)",
    definition: "The law declaring Filipino Sign Language (FSL) as the national sign language of the Filipino Deaf and the official sign language of government, education, and media in the Philippines.",
    rationalization: "Mandates FSL as the medium of instruction for deaf learners in basic education and requires FSL interpreters in broadcast television news and judicial proceedings.",
    mnemonic: { title: "RA 11106 FSL", phrase: "11106 = Filipino Sign Language as Official Medium", items: ["11106 - FSL Act", "FSL official language for Deaf", "Medium of instruction in Deaf schools"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Analyze legal mandates, policies, and frameworks governing inclusive education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Impairment vs Disability vs Handicap",
    definition: "Impairment is a biological loss or abnormality of anatomical/physiological structure (e.g., damaged optic nerve); Disability is the functional limitation in performing a normal activity (e.g., inability to read text); Handicap is the social disadvantage imposed by environmental barriers (e.g., absence of Braille books).",
    rationalization: "A person with a physical impairment becomes 'handicapped' only when society fails to provide wheelchair ramps or adaptive accommodations.",
    mnemonic: { title: "Impairment-Disability-Handicap", phrase: "Impairment (Body) -> Disability (Function) -> Handicap (Social Barrier)", items: ["Impairment: Anatomical damage", "Disability: Functional limitation", "Handicap: Environmental disadvantage"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Differentiate concepts: impairment, disability, and handicap",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Inclusion vs Integration vs Mainstreaming",
    definition: "Mainstreaming places students with disabilities into regular classrooms only for specific non-academic subjects (music, PE); Integration brings the student into regular classes if the student adapts; Inclusion restructures the entire school environment and curriculum to welcome every student unconditionally.",
    rationalization: "In full inclusion, the system changes to fit the child, rather than demanding the child change to fit the system.",
    mnemonic: { title: "Inclusion vs Integration", phrase: "Integration Expects Child to Adapt; Inclusion Adapts the School", items: ["Mainstreaming: Selective subjects only", "Integration: Assimilate into existing class", "Inclusion: System redesigns for all"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Compare educational placement models (Mainstreaming, Integration, Inclusion)",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Universal Design for Learning (UDL): Principle 1 - Multiple Means of Representation",
    definition: "The UDL principle addressing the 'WHAT' of learning by presenting instructional content in diverse sensory formats (text, audio, video, tactile manipulatives, graphic organizers).",
    rationalization: "Accommodates learners with visual, auditory, or cognitive differences; ensures information is accessible to visual, auditory, and kinesthetic modalities alike.",
    mnemonic: { title: "UDL Principle 1", phrase: "The WHAT: Present Content in Many Ways", items: ["Principle 1: Representation", "The WHAT of learning", "Text, audio, video, graphics"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply Universal Design for Learning (UDL) principles and accommodations",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Universal Design for Learning (UDL): Principle 2 - Multiple Means of Action and Expression",
    definition: "The UDL principle addressing the 'HOW' of learning by providing diverse options and tools for learners to navigate environments and demonstrate what they know.",
    rationalization: "Instead of relying solely on written pencil-and-paper exams, students can demonstrate mastery through oral presentations, video creations, dioramas, or digital portfolios.",
    mnemonic: { title: "UDL Principle 2", phrase: "The HOW: Express Learning Through Many Options", items: ["Principle 2: Action & Expression", "The HOW of learning", "Speeches, dioramas, essays, projects"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply Universal Design for Learning (UDL) principles and accommodations",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Universal Design for Learning (UDL): Principle 3 - Multiple Means of Engagement",
    definition: "The UDL principle addressing the 'WHY' of learning by offering options for recruiting student interest, sustaining effort, persistence, and self-regulation.",
    rationalization: "Taps into learners' passions by providing choice in assignment topics, varying levels of challenge, collaborative teamwork, and authentic real-world connections.",
    mnemonic: { title: "UDL Principle 3", phrase: "The WHY: Ignite Motivation and Passion", items: ["Principle 3: Engagement", "The WHY of learning", "Choice, challenge, and real-world relevance"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply Universal Design for Learning (UDL) principles and accommodations",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Individualized Education Program (IEP)",
    definition: "A legally binding, personalized written plan tailored to the unique educational needs of a child with an exceptionality, detailing present performance levels, measurable annual goals, and specific accommodations.",
    rationalization: "Drafted collaboratively by an IEP team comprising the special education teacher, general education teacher, school principal, parents, psychologist, and the student when appropriate.",
    mnemonic: { title: "IEP Components", phrase: "PLOP, Annual Goals, Services, Accommodations", items: ["P - Present Level of Performance (PLOP)", "G - Measurable annual goals", "S - Special education services & accommodations"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Formulate Individualized Education Programs (IEP) components",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Accommodations vs Modifications",
    definition: "Accommodations alter HOW a student learns or is tested without lowering the academic learning standard (e.g., extra time on tests, audiobooks, large-print font); Modifications change WHAT the student is taught by altering or reducing curriculum expectations.",
    rationalization: "A blind student taking the standard board exam with screen-reading software is receiving an accommodation; a student with severe intellectual disability given a kindergarten counting test in 6th grade is receiving a modification.",
    mnemonic: { title: "Accommodation vs Modification", phrase: "Accommodation Changes HOW; Modification Changes WHAT", items: ["Accommodation: Same standard, different access", "Modification: Simplified curriculum content"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Differentiate instructional accommodations from curricular modifications",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Differentiated Instruction (Carol Ann Tomlinson)",
    definition: "A pedagogical framework where teachers proactively modify Content (what is learned), Process (how it is learned), Product (how it is demonstrated), and Learning Environment based on students' Readiness, Interests, and Learning Profiles.",
    rationalization: "Rejects the outdated 'one-size-fits-all' lecture method; ensures struggling learners receive scaffolding while advanced learners encounter enrichment.",
    mnemonic: { title: "Tomlinson's Differentiation", phrase: "Content, Process, Product, Environment (CPPE)", items: ["Content: Materials input", "Process: Sense-making activities", "Product: Summative outputs", "Environment: Classroom climate"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply differentiated instruction strategies across diverse classrooms",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Down Syndrome (Trisomy 21)",
    definition: "A chromosomal condition caused by an extra 21st chromosome, characterized by mild to moderate intellectual disability, characteristic physical traits (flattened facial profile, upward slanting eyes, single palmar crease / simian crease), and heart defects.",
    rationalization: "Children with Down syndrome benefit immensely from inclusive general classrooms, early speech therapy, and visual-spatial instructional cues.",
    mnemonic: { title: "Down Syndrome Trisomy", phrase: "Trisomy 21: Extra Chromosome, High Warmth", items: ["Trisomy 21", "Simian crease on palm", "Strong visual-social learning style"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Identify characteristics of intellectual and developmental disabilities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Intellectual Disability (ID)",
    definition: "A developmental condition characterized by significant limitations both in intellectual functioning (IQ score below 70) and in adaptive behavior across conceptual, social, and practical life skills, originating before age 18.",
    rationalization: "Requires life-skills curriculum, task analysis (breaking skills into tiny sequential steps), and concrete manipulative learning tools.",
    mnemonic: { title: "Intellectual Disability Criteria", phrase: "IQ Under 70 + Adaptive Behavior Deficits", items: ["IQ below 70-75", "Adaptive skill deficits (Practical/Social)", "Originates before age 18"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Identify characteristics of intellectual and developmental disabilities",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Specific Learning Disability (SLD)",
    definition: "A neurodevelopmental disorder in one or more of the basic psychological processes involved in understanding or using language, manifested in an imperfect ability to listen, speak, read, write, spell, or do mathematical calculations.",
    rationalization: "Classified when a student of normal or above-average intellectual ability shows an unexpected, severe academic achievement deficit that is not due to sensory loss or intellectual disability.",
    mnemonic: { title: "SLD Discrepancy", phrase: "Normal Intelligence, Severe Specific Skill Deficit", items: ["Normal IQ potential", "Specific deficit (Reading, Math, Writing)", "Neurological processing roots"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Diagnose and support specific learning disabilities (Dyslexia, Dyscalculia, Dysgraphia)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Dyslexia",
    definition: "A specific learning disability of neurobiological origin characterized by severe difficulties with accurate and/or fluent word recognition, poor phonological decoding, and spelling problems.",
    rationalization: "Not caused by low vision or letter reversals alone; stems from a deficit in the phonological component of language. Accommodated with multisensory structured literacy (Orton-Gillingham) and audio text.",
    mnemonic: { title: "Dyslexia Clue", phrase: "Phonological Decoding and Reading Deficit", items: ["D - Dyslexia", "P - Phonological decoding hurdle", "O - Orton-Gillingham multisensory remedy"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Diagnose and support specific learning disabilities (Dyslexia, Dyscalculia, Dysgraphia)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Dyscalculia",
    definition: "A specific learning disability involving severe difficulty understanding numbers, learning arithmetic facts, grasping math concepts, calculating time, and processing mathematical symbols.",
    rationalization: "Accommodated by using concrete Base-10 blocks, visual number lines, color-coded arithmetic steps, and permitting calculators during problem-solving tasks.",
    mnemonic: { title: "Dyscalculia Clue", phrase: "Math Calculation and Number Sense Hurdle", items: ["D - Dyscalculia", "M - Math and numbers struggle", "B - Base-10 manipulatives and calculators"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Diagnose and support specific learning disabilities (Dyslexia, Dyscalculia, Dysgraphia)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Dysgraphia",
    definition: "A specific learning disability that affects written expression, characterized by distorted handwriting, poor fine-motor coordination, improper letter spacing, and difficulty organizing thoughts on paper.",
    rationalization: "Accommodated by providing pencil grips, graphic organizers, permitting typing on tablets/laptops, and allowing oral exams instead of lengthy essay tests.",
    mnemonic: { title: "Dysgraphia Clue", phrase: "Handwriting and Written Expression Struggle", items: ["D - Dysgraphia", "H - Handwriting motor hurdle", "T - Typing & speech-to-text tools"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Diagnose and support specific learning disabilities (Dyslexia, Dyscalculia, Dysgraphia)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Attention-Deficit / Hyperactivity Disorder (ADHD)",
    definition: "A neurodevelopmental disorder marked by persistent, developmentally inappropriate levels of inattention, hyperactivity, and impulsivity that interfere with functioning or learning across multiple settings.",
    rationalization: "Three presentations: Predominantly Inattentive, Predominantly Hyperactive-Impulsive, and Combined. Accommodated through frequent movement breaks, clear routines, and seating near the front.",
    mnemonic: { title: "ADHD Triad", phrase: "Inattention, Hyperactivity, Impulsivity", items: ["I - Inattention (Distractibility)", "H - Hyperactivity (Fidgeting)", "I - Impulsivity (Blurting answers)"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Implement classroom behavioral strategies for ADHD",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Autism Spectrum Disorder (ASD)",
    definition: "A complex neurodevelopmental spectrum condition characterized by persistent deficits in social communication and social interaction, alongside restricted, repetitive patterns of behavior, interests, or routines.",
    rationalization: "Accommodated through visual schedules, social stories, predictable classroom transitions, quiet sensory break zones, and explicit instruction in social communication.",
    mnemonic: { title: "ASD Core Features", phrase: "Social Communication Deficits + Repetitive Behaviors", items: ["S - Social communication difficulty", "R - Repetitive routines & stimming", "V - Visual schedules help"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Design structured interventions for Autism Spectrum Disorder (ASD)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Social Stories (Carol Gray)",
    definition: "Short, individualized descriptive narratives used to teach social cues, expectations, and appropriate behavioral responses to students with Autism Spectrum Disorder during novel or stressful situations.",
    rationalization: "Written from the child's perspective with simple illustrations; prepares children for fire drills, field trips, or classroom turn-taking by reducing anxiety and ambiguity.",
    mnemonic: { title: "Social Stories", phrase: "Predictable Narratives for Social Success", items: ["S - Social stories", "C - Carol Gray technique", "R - Reduces anxiety in transitions"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Design structured interventions for Autism Spectrum Disorder (ASD)",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Sensory Processing Sensitivity in ASD",
    definition: "The hyper-reactivity (hypersensitivity) or hypo-reactivity (hyposensitivity) to sensory inputs (fluorescent lights, loud school bells, clothing tags, textures, smells) common in individuals with ASD.",
    rationalization: "A sensory meltdown is not a willful temper tantrum; it is an involuntary fight-or-flight neurological response to sensory overload.",
    mnemonic: { title: "Sensory Overload", phrase: "Meltdown is Overload, Not Bad Behavior", items: ["S - Sensory overload", "N - Noise-canceling headphones", "Q - Quiet corner retreat"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Design structured interventions for Autism Spectrum Disorder (ASD)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Braille System (Louis Braille)",
    definition: "A tactile writing system used by people who are visually impaired, consisting of raised dots arranged in cells of up to six dots in a 3-by-2 matrix representing letters and numbers.",
    rationalization: "Allows blind students to read and write with speed; accompanied by tactile graphics and screen-reader software (JAWS, NVDA).",
    mnemonic: { title: "Braille 6 Dots", phrase: "6 Raised Dots per Cell for Touch Reading", items: ["6 Dots in 3x2 matrix", "Tactile reading system", "Louis Braille 1824"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply assistive technologies and accommodations for sensory impairments",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Conductive vs Sensorineural Hearing Loss",
    definition: "Conductive hearing loss occurs when sound waves are blocked in the outer or middle ear (earwax, punctured eardrum, otitis media; medically treatable); Sensorineural hearing loss involves permanent damage to the inner ear hair cells (cochlea) or auditory nerve.",
    rationalization: "Sensorineural hearing loss is permanent and cannot be reversed by medication; managed with hearing aids, cochlear implants, and sign language.",
    mnemonic: { title: "Hearing Loss Types", phrase: "Conductive = Blocked Outer/Middle; Sensorineural = Inner Nerve Damage", items: ["Conductive: Blockage in ear canal", "Sensorineural: Permanent nerve/cochlea damage"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply assistive technologies and accommodations for sensory impairments",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Cerebral Palsy (CP)",
    definition: "A group of permanent non-progressive disorders of movement and posture caused by damage to the developing motor control centers of the brain before, during, or shortly after birth.",
    rationalization: "Common types include Spastic CP (stiff, tight muscles), Athetoid/Dyskinetic CP (involuntary writhing movements), and Ataxic CP (poor balance and coordination). Does not automatically imply cognitive disability.",
    mnemonic: { title: "Cerebral Palsy Nature", phrase: "Motor Movement Disorder, Not an Intellectual Deficit", items: ["C - Cerebral motor cortex damage", "P - Posture and mobility affected", "N - Non-progressive condition"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Identify characteristics of physical and motor exceptionalities",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Spina Bifida",
    definition: "A congenital neural tube defect where the embryonic spine fails to close completely during early gestation, often resulting in paralysis of the lower limbs, bowel dysfunction, and mobility challenges.",
    rationalization: "Prevention is linked to maternal Folic Acid (Vitamin B9) intake before and during pregnancy; students often require wheelchair ramps and catheterization accommodations.",
    mnemonic: { title: "Spina Bifida", phrase: "Split Spine Neural Tube Defect", items: ["S - Spina Bifida", "N - Neural tube closure failure", "F - Folic acid prevention"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Identify characteristics of physical and motor exceptionalities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Gifted and Talented Students",
    definition: "Learners who possess significantly advanced intellectual abilities, high creativity, or exceptional artistic talent compared to peers of their age, requiring differentiated curriculum beyond the standard program.",
    rationalization: "Often identified by an IQ score of 130 or higher; can experience asynchronous development (intellect far ahead of physical or emotional maturity).",
    mnemonic: { title: "Giftedness Profile", phrase: "Rapid Learning, Deep Passion, High Creativity", items: ["IQ 130+ benchmark", "Advanced abstract reasoning", "Asynchronous developmental challenges"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply enrichment and acceleration strategies for gifted and talented learners",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Renzulli's Three-Ring Conception of Giftedness",
    definition: "Joseph Renzulli's model proposing that gifted behavior occurs at the intersection of three interacting human traits: Above-Average Intellectual Ability, High Creativity, and High Task Commitment (perseverance).",
    rationalization: "Proves that high IQ alone is insufficient for real-world gifted achievement; passion, perseverance, and original creative problem-solving are equally required.",
    mnemonic: { title: "Renzulli's 3 Rings", phrase: "Above-Average Ability, Creativity, Task Commitment", items: ["1. Above-average ability", "2. High creativity", "3. High task commitment"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply enrichment and acceleration strategies for gifted and talented learners",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Acceleration vs Enrichment (Gifted Education)",
    definition: "Acceleration advances gifted students through academic material at a faster pace than usual (early kindergarten entry, skipping grades, subject-specific advanced placement); Enrichment broadens and deepens learning at the current grade level with complex real-world projects.",
    rationalization: "Both strategies prevent gifted students from underachieving and suffering severe classroom boredom from repetitive drills.",
    mnemonic: { title: "Gifted Strategies", phrase: "Acceleration Goes Faster; Enrichment Goes Deeper", items: ["Acceleration: Grade-skipping, fast pace", "Enrichment: Deep projects, complex investigations"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply enrichment and acceleration strategies for gifted and talented learners",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Positive Behavioral Interventions and Supports (PBIS)",
    definition: "A proactive multi-tiered framework used by schools to promote positive school climate, teach expected social behaviors explicitly, and prevent student problem behaviors.",
    rationalization: "Tier 1: Universal support for all students (80-90%); Tier 2: Targeted group interventions for at-risk students (10-15%); Tier 3: Intensive individualized behavioral support plans (1-5%).",
    mnemonic: { title: "PBIS 3 Tiers", phrase: "Tier 1 Universal, Tier 2 Targeted, Tier 3 Intensive", items: ["Tier 1: 100% of students (Rules taught)", "Tier 2: At-risk groups (Check-in/out)", "Tier 3: Individual behavior plans"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Implement classroom behavioral strategies and positive discipline",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Functional Behavioral Assessment (FBA)",
    definition: "A systematic problem-solving process for identifying the specific triggers, environmental antecedents, and underlying function (purpose) of a student's challenging behavior.",
    rationalization: "Behaviors generally serve one of two core functions: to OBTAIN something (attention, tangible items, sensory sensation) or to ESCAPE/AVOID something (difficult tasks, peer embarrassment).",
    mnemonic: { title: "FBA Functions", phrase: "ABC: Antecedent, Behavior, Consequence", items: ["A - Antecedent (Trigger)", "B - Behavior (What student did)", "C - Consequence (What maintained it)"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Implement classroom behavioral strategies and positive discipline",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Least Restrictive Environment (LRE)",
    definition: "The special education legal mandate requiring that children with disabilities be educated with non-disabled peers in general education classrooms to the maximum extent appropriate.",
    rationalization: "Special classes, separate schooling, or removal from the regular educational environment occurs only when the severity of the disability precludes education in regular classes with supplemental aids.",
    mnemonic: { title: "LRE Principle", phrase: "With General Peers as Much as Possible", items: ["L - Least", "R - Restrictive", "E - Environment (General class first)"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Compare educational placement models (Mainstreaming, Integration, Inclusion)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Task Analysis in Special Education",
    definition: "The instructional procedure of breaking down a complex skill or academic task into small, discrete, sequentially ordered micro-steps to facilitate mastery for learners with developmental delays.",
    rationalization: "Used for life skills (tying shoelaces, washing hands) and academic algorithms (long division); each step is taught and reinforced systematically.",
    mnemonic: { title: "Task Analysis", phrase: "Break Big Skills into Tiny Achievable Steps", items: ["T - Task analysis", "B - Break down skills", "S - Step-by-step chaining"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply differentiated instruction strategies across diverse classrooms",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Augmentative and Alternative Communication (AAC)",
    definition: "Communication systems, devices, and techniques used by individuals with severe speech and language impairments to express their thoughts, needs, and feelings.",
    rationalization: "Ranges from unaided systems (sign language, gestures) and low-tech communication boards (PECS / Picture Exchange Communication System) to high-tech eye-tracking speech-generating tablets.",
    mnemonic: { title: "AAC Systems", phrase: "Picture Boards and Speech Devices Give a Voice", items: ["A - Augmentative", "A - Alternative", "C - Communication (PECS, speech tablets)"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply assistive technologies and accommodations for sensory impairments",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Picture Exchange Communication System (PECS)",
    definition: "An augmentative communication system developed for non-verbal children with Autism where the child learns to hand a picture card of a desired item to a communication partner in exchange for that item.",
    rationalization: "Progresses through 6 phases: from physical exchange to expanding spontaneous sentences ('I want juice') and answering questions.",
    mnemonic: { title: "PECS Picture Trade", phrase: "Hand a Picture to Get the Desired Item", items: ["P - Picture Exchange", "C - Communication System", "A - Autism non-verbal support"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply assistive technologies and accommodations for sensory impairments",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Asperger Syndrome",
    definition: "A profile on the Autism spectrum previously classified separately, characterized by normal to superior intellectual and language abilities, but significant difficulties in social interaction, non-verbal cues, and intense hyper-fixated interests.",
    rationalization: "Now integrated under Autism Spectrum Disorder Level 1 in the DSM-5; students excel in detailed intellectual subjects but require explicit social skills coaching.",
    mnemonic: { title: "Asperger Profile", phrase: "High Verbal Intellect, Quirky Social Interactions", items: ["Intact language and IQ", "Social pragmatics challenge", "Specialized intense interests"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Design structured interventions for Autism Spectrum Disorder (ASD)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Sensory Diets in Inclusive Classrooms",
    definition: "A personalized activity schedule of sensory activities and physical accommodations designed by an occupational therapist to help a child with sensory processing challenges maintain an optimal state of arousal and focus.",
    rationalization: "Includes weighted lap pads, resistance bands on chair legs, fidget toys, therapy ball seating, and scheduled heavy-work jumping breaks.",
    mnemonic: { title: "Sensory Diet", phrase: "Sensory Tools to Keep the Nervous System Calm", items: ["S - Sensory diet", "W - Weighted lap pads", "F - Fidget bands on chairs"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply Universal Design for Learning (UDL) principles and accommodations",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Tiered Assignments",
    definition: "A differentiated instructional strategy where all students focus on the same essential learning objective, but work on tasks structured at varying levels of complexity, abstractness, and scaffolding.",
    rationalization: "Tier 1 works with concrete manipulatives; Tier 2 works with guided practice; Tier 3 works with open-ended synthesis. No student feels left out or unchallenged.",
    mnemonic: { title: "Tiered Assignments", phrase: "Same Core Concept, Three Difficulty Tiers", items: ["T - Tiered tasks", "S - Same objective", "V - Varied complexity levels"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply differentiated instruction strategies across diverse classrooms",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Peer Tutoring in Inclusive Settings",
    definition: "An instructional arrangement where students work in pairs, with one student acting as the tutor and the other as the tutee to review, practice, and reinforce learning concepts.",
    rationalization: "Includes ClassWide Peer Tutoring (CWPT) and Cross-Age Tutoring; benefits both partners: tutees gain individualized attention, while tutors deepen their own mastery through teaching.",
    mnemonic: { title: "Peer Tutoring", phrase: "To Teach is to Learn Twice", items: ["P - Peer tutoring", "C - Classwide pairing", "M - Mutual learning benefits"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply differentiated instruction strategies across diverse classrooms",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Co-Teaching Models in Inclusive Classrooms",
    definition: "The partnership between a general education teacher and a special education teacher sharing responsibility for instructing all students in a single classroom.",
    rationalization: "Six models (Friend & Cook): One Teach-One Observe, One Teach-One Assist, Station Teaching, Parallel Teaching, Alternative Teaching, and Team Teaching.",
    mnemonic: { title: "Co-Teaching Models", phrase: "Station, Parallel, Alternative, Team Teaching", items: ["1. One Teach-One Assist", "2. Station Teaching", "3. Parallel Teaching", "4. Alternative Teaching", "5. Team Teaching"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Collaborate effectively within multi-disciplinary and co-teaching teams",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Parallel Teaching",
    definition: "A co-teaching model where the class is divided into two equal heterogeneous groups, and both teachers teach the exact same material simultaneously to their respective groups.",
    rationalization: "Lowers the student-to-teacher ratio by half, increasing student participation opportunities and behavior management efficiency.",
    mnemonic: { title: "Parallel Teaching", phrase: "Split the Class in Half, Teach Side-by-Side", items: ["P - Parallel", "S - Split class in half", "S - Same lesson taught simultaneously"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Collaborate effectively within multi-disciplinary and co-teaching teams",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Station Teaching",
    definition: "A co-teaching model where instructional content is divided into stations; teachers facilitate separate stations, and students rotate through each station during the period.",
    rationalization: "Allows each teacher to present specialized components of a lesson while providing an independent learning station for student self-study.",
    mnemonic: { title: "Station Teaching", phrase: "Rotate Through Teacher Stations", items: ["S - Station teaching", "R - Rotate groups", "M - Multi-part lesson delivery"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Collaborate effectively within multi-disciplinary and co-teaching teams",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Alternative Teaching",
    definition: "A co-teaching model where one teacher manages instruction for the large group while the other teacher works with a small group for remediation, pre-teaching, or enrichment.",
    rationalization: "Provides intensive individualized support for struggling students without segregating them into a completely separate special education room.",
    mnemonic: { title: "Alternative Teaching", phrase: "One Big Group, One Small Intervention Group", items: ["A - Alternative teaching", "B - Big group general lesson", "S - Small group remediation"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Collaborate effectively within multi-disciplinary and co-teaching teams",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Transition Program in Special Education",
    definition: "A coordinated set of activities for learners with disabilities preparing them to transition successfully from secondary school to post-secondary education, vocational training, integrated employment, and independent adult living.",
    rationalization: "Mandated in the IEP starting at age 14 or 16; focuses on community mobility, job-shadowing, financial literacy, and self-advocacy skills.",
    mnemonic: { title: "Transition Program", phrase: "Bridging School to Independent Adult Life", items: ["T - Transition plan", "V - Vocational training", "I - Independent living skills"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Formulate Individualized Education Programs (IEP) components",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Multidisciplinary Team (MDT) in Special Education",
    definition: "The group of diverse professionals—including general ed teachers, special ed specialists, school psychologists, speech therapists, physical therapists, and occupational therapists—who evaluate and support the child.",
    rationalization: "Conducts comprehensive evaluations to identify exceptionalities and ensure diagnostic decisions are never made by a single test or a single person.",
    mnemonic: { title: "MDT Team", phrase: "Diverse Specialists Evaluating the Whole Child", items: ["M - Multidisciplinary", "T - Therapists & teachers unite", "H - Holistic evaluation"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Collaborate effectively within multi-disciplinary and co-teaching teams",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Tourette Syndrome",
    definition: "A neurological disorder characterized by involuntary, repetitive, rapid movements and vocalizations called tics (motor tics like blinking/shoulder shrugging and vocal tics like throat clearing).",
    rationalization: "Tics are involuntary; classroom stress exacerbates tics; teachers should provide private testing spaces and educate classmates to prevent ridicule and bullying.",
    mnemonic: { title: "Tourette Syndrome", phrase: "Involuntary Motor and Vocal Tics", items: ["T - Tourette syndrome", "T - Tics involuntary", "S - Stress increases frequency"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Identify characteristics of physical and motor exceptionalities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Oppositional Defiant Disorder (ODD)",
    definition: "A childhood behavioral disorder characterized by a persistent pattern of angry, irritable mood, argumentative and defiant behavior, and vindictiveness toward authority figures lasting at least six months.",
    rationalization: "Managed using calm de-escalation, clear consistent rules, avoiding public power struggles, and using 'choice language' (giving two acceptable options).",
    mnemonic: { title: "ODD Defiance", phrase: "Defiant Against Authority, Avoid Power Struggles", items: ["O - Oppositional Defiant Disorder", "A - Argumentative with teachers", "C - Choice language de-escalation"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Implement classroom behavioral strategies and positive discipline",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Epilepsy and Classroom Seizure Protocol",
    definition: "A neurological disorder characterized by recurrent, unprovoked seizures caused by sudden surges of abnormal electrical activity in the brain.",
    rationalization: "Classroom First Aid Protocol during a tonic-clonic seizure: 1. Keep calm; 2. Ease child to floor and clear hard objects; 3. Turn child gently on side to clear airway; 4. Cushion head; 5. NEVER put anything in the mouth; 6. Time the seizure.",
    mnemonic: { title: "Seizure First Aid", phrase: "Ease Down, Side Turn, Cushion Head, Never Insert Objects", items: ["E - Ease to floor", "S - Side position", "N - Never insert spoon or finger in mouth"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Implement health and emergency protocols for learners with chronic conditions",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Person-First Language",
    definition: "The respectful linguistic convention that puts the person before the disability or diagnosis (e.g., 'student with autism' instead of 'autistic student'; 'child who uses a wheelchair' instead of 'wheelchair-bound child').",
    rationalization: "Emphasizes that a disability is only one characteristic of a human being, not their defining essence or totality.",
    mnemonic: { title: "Person-First Rule", phrase: "Person Comes First, Not the Disability", items: ["P - Person-first language", "D - Dignity emphasized", "S - 'Child with disability', not 'disabled child'"] },
    source: "PRC BLEPT ProfEd Special Ed Reviewer",
    tosCompetency: "Apply respectful terminology and inclusive mindsets",
    bloomsTaxonomy: "Applying",
    highYield: true
  }
];

// Write Foundations of Special and Inclusive Education
writeDataset(
  'data/profed/foundations_special_inclusive/foundations_special_inclusive.json',
  'Professional Education',
  'Foundations of Special and Inclusive Education',
  'Inclusive Policies, Exceptionalities, UDL, & Accommodations',
  profed3Items
);
