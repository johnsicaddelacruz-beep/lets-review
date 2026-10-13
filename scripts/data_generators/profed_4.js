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

// 4. Building and Enhancing New Literacies Across the Curriculum (50 items)
const profed4Items = [
  {
    term: "The 4Cs of 21st Century Skills (P21 Framework)",
    definition: "The core cognitive and interpersonal competencies essential for modern success: Critical Thinking, Communication, Collaboration, and Creativity.",
    rationalization: "Identified by the Partnership for 21st Century Learning; shifts education from rote memorization toward deep problem solving and innovative teamwork.",
    mnemonic: { title: "The 4Cs", phrase: "Critical Thinking, Communication, Collaboration, Creativity", items: ["C - Critical Thinking (Problem solving)", "C - Communication (Clear expression)", "C - Collaboration (Teamwork)", "C - Creativity (Innovation)"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Analyze the 21st century skills framework and new literacies across disciplines",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Basic Literacy vs Functional Literacy",
    definition: "Basic literacy is the elementary ability to read, write, and compute simple messages; Functional literacy is the advanced capacity to apply reading, writing, and numeracy skills to effectively function and participate in daily community, work, and civic life.",
    rationalization: "A person who can decipher alphabet letters has basic literacy; a person who can understand a bank loan contract, fill out a tax form, and read medicine labels has functional literacy.",
    mnemonic: { title: "Basic vs Functional", phrase: "Basic = Reads Letters; Functional = Functions in Society", items: ["Basic: Simple mechanical reading", "Functional: Practical life application"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Analyze the 21st century skills framework and new literacies across disciplines",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Multiliteracies (New London Group, 1996)",
    definition: "An educational approach recognizing that literacy encompasses meaning-making across diverse cultural contexts and multiple semiotic modes: Linguistic, Visual, Audio, Gestural, and Spatial.",
    rationalization: "Moves beyond traditional printed text to prepare students for digital multimodal environments where images, videos, and layouts communicate meaning.",
    mnemonic: { title: "5 Semiotic Modes", phrase: "Linguistic, Visual, Audio, Gestural, Spatial", items: ["1. Linguistic (Words)", "2. Visual (Images)", "3. Audio (Sound)", "4. Gestural (Body language)", "5. Spatial (Layout)"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Analyze the 21st century skills framework and new literacies across disciplines",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "James Banks' 4 Approaches to Multicultural Curriculum",
    definition: "The sequential stages for integrating multicultural content: 1. Contributions Approach (holidays, heroes, food); 2. Additive Approach (adding cultural concepts without altering curriculum structure); 3. Transformation Approach (viewing concepts from multiple ethnic perspectives); 4. Social Action Approach (taking action on social problems).",
    rationalization: "The Transformation and Social Action approaches represent the deepest, most authentic levels of multicultural literacy.",
    mnemonic: { title: "Banks' 4 Approaches", phrase: "C-A-T-S: Contributions, Additive, Transformation, Social Action", items: ["C - Contributions (Holidays & heroes)", "A - Additive (Book chapters added)", "T - Transformation (Shifted viewpoints)", "S - Social Action (Civic action taken)"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply multicultural literacy and culturally responsive teaching approaches",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Culturally Responsive Teaching (Geneva Gay)",
    definition: "A pedagogy that uses the cultural knowledge, prior experiences, frames of reference, and performance styles of ethnically diverse students to make learning encounters more relevant and effective.",
    rationalization: "Validates students' indigenous or cultural heritage as an intellectual asset rather than a learning deficit.",
    mnemonic: { title: "Culturally Responsive", phrase: "Teach Through the Lens of the Learner's Culture", items: ["C - Culture as an asset", "R - Relevant curriculum", "T - Trust and validation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply multicultural literacy and culturally responsive teaching approaches",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Social Literacy and CASEL 5 SEL Competencies",
    definition: "The Collaborative for Academic, Social, and Emotional Learning (CASEL) framework identifying five core competencies: Self-Awareness, Self-Management, Social Awareness, Relationship Skills, and Responsible Decision-Making.",
    rationalization: "Promotes empathy, constructive conflict resolution, and teamwork, leading to higher academic performance and reduced behavioral infractions.",
    mnemonic: { title: "CASEL 5 Competencies", phrase: "Self-Awareness, Self-Management, Social Awareness, Relationships, Decision-Making", items: ["1. Self-Awareness", "2. Self-Management", "3. Social Awareness (Empathy)", "4. Relationship Skills", "5. Responsible Decision-Making"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Integrate social-emotional learning (SEL) and social literacy",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Republic Act No. 10627 (Anti-Bullying Act of 2013)",
    definition: "The Philippine law requiring all elementary and secondary schools to adopt policies against bullying (written, verbal, physical, and cyberbullying) and establish clear reporting protocols.",
    rationalization: "Mandates that school administrators investigate complaints, provide counseling for both the victim and bully, and protect the confidentiality of involved minors.",
    mnemonic: { title: "RA 10627 Anti-Bullying", phrase: "10627 = Ban Bullying in All Philippine Schools", items: ["10627 - Anti-Bullying Act", "Physical, emotional, & cyberbullying banned", "Counseling and child protection"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Integrate social-emotional learning (SEL) and social literacy",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Media and Information Literacy (MIL)",
    definition: "The essential capacity to access, critically analyze, evaluate, and responsibly create information across various media formats and channels.",
    rationalization: "Empowers citizens to navigate digital noise, interrogate biased narratives, protect privacy, and become proactive producers of ethical content.",
    mnemonic: { title: "MIL Pillars", phrase: "Access, Analyze, Evaluate, Create Responsibly", items: ["Access information", "Analyze biases", "Evaluate credibility", "Create ethical media"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The CRAAP Test (Evaluating Media and Sources)",
    definition: "A critical evaluation checklist for assessing the credibility of information sources based on five criteria: Currency (timeliness), Relevance (importance), Authority (source credentials), Accuracy (truthfulness/evidence), and Purpose (intent/bias).",
    rationalization: "Essential tool for spotting online misinformation, sponsored propaganda, and predatory scholarly journals.",
    mnemonic: { title: "CRAAP Test Acronym", phrase: "Currency, Relevance, Authority, Accuracy, Purpose", items: ["C - Currency (Date)", "R - Relevance (Audience fit)", "A - Authority (Author expertise)", "A - Accuracy (Evidence check)", "P - Purpose (Bias or selling?)"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Echo Chambers and Filter Bubbles",
    definition: "An echo chamber is an online environment where a person only encounters beliefs that reinforce their own; A filter bubble is an algorithmic state where website algorithms isolate users by presenting only content matching their past clicks.",
    rationalization: "Polarizes political discourse and spreads conspiracy theories by shielding individuals from dissenting viewpoints and factual counter-evidence.",
    mnemonic: { title: "Echo Chamber vs Filter Bubble", phrase: "Echo Chamber = People Agreeing; Filter Bubble = Algorithms Isolating", items: ["Echo Chamber: Social confirmation", "Filter Bubble: Algorithmic isolation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Deepfake Technology",
    definition: "Synthetic digital media in which a person's face, voice, or body is convincingly replaced with someone else's using deep learning artificial intelligence neural networks.",
    rationalization: "Poses acute ethical and societal dangers regarding misinformation, election interference, identity theft, and fabricated compromising media.",
    mnemonic: { title: "Deepfake Threat", phrase: "AI-Generated Fake Video and Voice", items: ["D - Deep learning AI", "F - Fabricated reality", "M - Misinformation weapon"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The 50/30/20 Budgeting Rule",
    definition: "A financial literacy guideline allocating after-tax income into three categories: 50% for Needs (rent, food, utilities), 30% for Wants (entertainment, dining out), and 20% for Savings and Debt repayment.",
    rationalization: "Provides a practical, balanced budgeting structure that prevents overspending on lifestyle wants and builds financial resilience.",
    mnemonic: { title: "50-30-20 Rule", phrase: "50% Needs, 30% Wants, 20% Savings", items: ["50% Needs (Rent, groceries)", "30% Wants (Hobbies, dining)", "20% Savings (Emergency fund, debt)"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Assets vs Liabilities (Robert Kiyosaki)",
    definition: "In personal financial literacy: an Asset is anything that puts money in your pocket (stocks, rental properties, businesses); a Liability is anything that takes money out of your pocket (car loans, credit card balances, mortgages).",
    rationalization: "Many people mistakenly view their luxury personal car or heavily mortgaged home as an asset when it continuously drains cash flow through maintenance and interest payments.",
    mnemonic: { title: "Assets vs Liabilities", phrase: "Assets Feed You; Liabilities Bleed You", items: ["Asset: Puts cash in pocket", "Liability: Drains cash out of pocket"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The Rule of 72",
    definition: "A financial shortcut formula to estimate the number of years required to double an investment at a fixed annual compound interest rate: $\\text{Years to Double} \\approx \\frac{72}{\\text{Annual Rate } (\\%)}$.",
    rationalization: "If an investment yields an 8% annual return, it will take approximately $72 / 8 = 9$ years for the money to double.",
    mnemonic: { title: "Rule of 72 Formula", phrase: "72 Divided by Interest Rate = Years to Double", items: ["72 / Rate = Doubling years", "Shows power of compound interest", "Fast financial calculation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Emergency Fund",
    definition: "A liquid reserve of money set aside in a readily accessible savings account covering 3 to 6 months of essential living expenses, reserved exclusively for unexpected life crises.",
    rationalization: "Acts as a primary financial safety net preventing individuals from falling into predatory high-interest debt when facing job loss or medical emergencies.",
    mnemonic: { title: "Emergency Fund Goal", phrase: "3 to 6 Months Living Expenses in Liquid Savings", items: ["3-6 Months living costs", "Liquid and accessible", "Prevents debt traps"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Ponzi Scheme vs Legitimate Business",
    definition: "A fraudulent investment scam where returns to existing investors are paid using funds contributed by new investors rather than legitimate business profits, inevitably collapsing when recruitment slows.",
    rationalization: "Characteristics include promises of unrealistically high, guaranteed returns with zero risk, complex secretive investment strategies, and heavy pressure to recruit others.",
    mnemonic: { title: "Ponzi Red Flags", phrase: "Paying Old Investors with New Investors' Money", items: ["P - Ponzi scam", "G - Guaranteed unrealistic returns", "C - Collapses when recruiting stops"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Seven (7) Environmental Principles",
    definition: "The core foundational principles of environmental literacy in the Philippines: 1. Nature knows best; 2. All forms of life are important; 3. Everything is connected; 4. Everything changes; 5. Everything must go somewhere; 6. Ours is a finite earth; 7. Nature is beautiful and we are stewards.",
    rationalization: "Developed by Miriam College Environmental Studies; forms the guiding philosophical framework for Philippine eco-literacy and sustainability education.",
    mnemonic: { title: "7 Environmental Principles", phrase: "Nature Knows Best, All Life Matters, Earth is Finite", items: ["1. Nature knows best", "2. All life is important", "3. Everything is connected", "4. Everything changes", "5. Everything goes somewhere", "6. Earth is finite", "7. Humans are stewards"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply eco-literacy and sustainable development principles",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Republic Act No. 9512 (Environmental Awareness and Education Act of 2008)",
    definition: "The Philippine law mandating the integration of environmental education into the curricula of all public and private schools at all levels, whether basic, technical, or tertiary.",
    rationalization: "Requires theoretical and practical environmental action: tree-planting, waste reduction, energy conservation, and marine sanctuary awareness.",
    mnemonic: { title: "RA 9512 Eco-Education", phrase: "9512 = Environmental Education in All Schools", items: ["9512 - Republic Act", "Mandatory in all curriculum levels", "Tree planting and waste awareness"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply eco-literacy and sustainable development principles",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Nine Elements of Digital Citizenship (Mike Ribble)",
    definition: "The foundational framework for ethical digital life: Digital Access, Digital Commerce, Digital Communication, Digital Literacy, Digital Etiquette, Digital Law, Digital Rights & Responsibilities, Digital Health & Wellness, and Digital Security.",
    rationalization: "Prepares students to act as responsible, safe, and respectful participants in online spaces rather than reckless internet users.",
    mnemonic: { title: "Ribble's 9 Elements", phrase: "Access, Commerce, Comm, Literacy, Etiquette, Law, Rights, Health, Security", items: ["1. Access", "2. Commerce", "3. Communication", "4. Literacy", "5. Etiquette", "6. Law", "7. Rights", "8. Health", "9. Security"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Digital Footprint: Active vs Passive",
    definition: "An active digital footprint is data deliberately shared by a user online (social media posts, photos, blog comments); A passive digital footprint is data collected about a user without their direct awareness (cookies, IP address, browsing history, GPS tracking).",
    rationalization: "Digital footprints are largely permanent; prospective employers, colleges, and scholarship committees routinely review applicants' active digital footprints.",
    mnemonic: { title: "Digital Footprint", phrase: "Active = What You Post; Passive = What Tech Tracks", items: ["Active: Intentional social posts", "Passive: Cookies, location logs", "Permanent digital trail"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Netiquette (Core Rules by Virginia Shea)",
    definition: "The social conventions, etiquette, and respectful behavioral norms governing online communication and interaction in digital spaces.",
    rationalization: "Core rules: Rule 1: Remember the human; Rule 2: Adhere to the same standards of behavior online that you follow in real life; Rule 3: Do not write in ALL CAPS (viewed as shouting); Rule 4: Respect other people's time and bandwidth.",
    mnemonic: { title: "Netiquette Golden Rule", phrase: "Remember the Human Behind the Screen", items: ["R - Remember the human", "N - No all-caps shouting", "R - Respect privacy & bandwidth"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Divergent Thinking vs Convergent Thinking (J.P. Guilford)",
    definition: "Divergent thinking generates multiple, creative, and novel solutions to an open-ended problem (brainstorming); Convergent thinking narrows down multiple options to find the single correct, optimal answer.",
    rationalization: "Four dimensions of creative divergent thinking: Fluency (number of ideas), Flexibility (different categories of ideas), Originality (uniqueness), and Elaboration (adding detail).",
    mnemonic: { title: "Creative Dimensions", phrase: "F-F-O-E: Fluency, Flexibility, Originality, Elaboration", items: ["F - Fluency (Quantity)", "F - Flexibility (Variety)", "O - Originality (Novelty)", "E - Elaboration (Detail)"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Foster arts, creativity, and innovative design thinking",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Design Thinking Framework",
    definition: "A human-centered, iterative problem-solving methodology comprising five phases: 1. Empathize (understand user needs); 2. Define (state the problem); 3. Ideate (brainstorm solutions); 4. Prototype (build experimental models); 5. Test (try solutions).",
    rationalization: "Originating at Stanford d.school; teaches students to design authentic solutions by putting human empathy and rapid experimentation at the center.",
    mnemonic: { title: "5 Design Thinking Steps", phrase: "E-D-I-P-T: Empathize, Define, Ideate, Prototype, Test", items: ["E - Empathize", "D - Define", "I - Ideate", "P - Prototype", "T - Test"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Foster arts, creativity, and innovative design thinking",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Six Thinking Hats (Edward de Bono)",
    definition: "A creative thinking and decision-making model where participants wear metaphorical colored hats representing distinct modes of thought: White (Data), Red (Emotion), Black (Caution), Yellow (Optimism), Green (Creativity), and Blue (Process control).",
    rationalization: "Prevents heated adversarial arguments in committee and classroom discussions by directing all participants to view a challenge from the same perspective simultaneously.",
    mnemonic: { title: "De Bono's 6 Hats", phrase: "White (Facts), Red (Feelings), Black (Risks), Yellow (Benefits), Green (Ideas), Blue (Control)", items: ["White: Facts & Data", "Red: Intuition & Feelings", "Black: Critical Caution", "Yellow: Optimism & Value", "Green: Creative Growth", "Blue: Metacognitive Process"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Foster arts, creativity, and innovative design thinking",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Lateral Thinking (Edward de Bono)",
    definition: "A problem-solving strategy that involves looking at a challenge from unconventional, non-linear, and unexpected angles rather than traditional, step-by-step vertical logic.",
    rationalization: "Vertical thinking digs the same hole deeper; lateral thinking digs a new hole in an entirely different spot to uncover innovative solutions.",
    mnemonic: { title: "Lateral Thinking", phrase: "Think Sideways, Outside the Box", items: ["L - Lateral", "S - Sideways creative jump", "V - Breaks vertical logic constraints"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Foster arts, creativity, and innovative design thinking",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Republic Act No. 11036 (Mental Health Act)",
    definition: "The landmark Philippine law that integrates mental health services into basic education, mandating schools to foster mental wellness, provide counseling, and eliminate mental illness stigma.",
    rationalization: "Mandates that educational institutions develop policies to identify students at risk of depression and suicide, offering timely psychosocial support.",
    mnemonic: { title: "RA 11036 Mental Health", phrase: "11036 = Mental Health Rights and School Wellness", items: ["11036 - Mental Health Act", "Psychosocial support in schools", "Anti-stigma policies"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Promote health, wellness, and mental health literacy",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Phishing and Social Engineering",
    definition: "A fraudulent cybercrime technique where attackers impersonate trustworthy institutions (banks, DepEd, universities) via deceptive emails or links to trick victims into revealing sensitive passwords or financial credentials.",
    rationalization: "Educating students to inspect sender domain addresses and avoid clicking unverified links is a core skill of cyber-defense literacy.",
    mnemonic: { title: "Phishing Trap", phrase: "Fishing for Your Passwords with Fake Links", items: ["P - Phishing", "F - Fake emails & links", "S - Social engineering trap"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Confirmation Bias in Media Consumption",
    definition: "The psychological tendency of individuals to search for, interpret, favor, and recall information that confirms their pre-existing beliefs while ignoring or dismissing contradictory evidence.",
    rationalization: "Media literacy training requires students to actively seek out reputable opposing viewpoints to counter confirmation bias.",
    mnemonic: { title: "Confirmation Bias", phrase: "Believing Only What Confirms My Prejudice", items: ["C - Confirmation bias", "B - Blind to opposite facts", "F - Fuels fake news spread"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Big6 Information Problem-Solving Model (Eisenberg and Berkowitz)",
    definition: "A widely taught information literacy process consisting of 6 stages: 1. Task Definition; 2. Information Seeking Strategies; 3. Location and Access; 4. Use of Information; 5. Synthesis; 6. Evaluation.",
    rationalization: "Provides a structured systematic method for students conducting academic research and solving information problems.",
    mnemonic: { title: "Big6 Model", phrase: "Define, Seek, Locate, Use, Synthesize, Evaluate", items: ["1. Task Definition", "2. Seeking Strategies", "3. Location & Access", "4. Use of Information", "5. Synthesis", "6. Evaluation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Digital Wellness and Screen Time Management",
    definition: "The practice of maintaining a healthy physical and psychological balance between digital technology usage and real-world offline living.",
    rationalization: "Excessive screen time is clinically associated with digital eye strain (computer vision syndrome), sleep disruption (blue light suppressing melatonin), and sedentary obesity.",
    mnemonic: { title: "Digital Wellness 20-20-20", phrase: "Every 20 Minutes, Look 20 Feet Away for 20 Seconds", items: ["20-20-20 Rule for eye strain", "Blue light filter", "Offline digital detox"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Promote health, wellness, and mental health literacy",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Culturally Sustaining Pedagogy (Django Paris)",
    definition: "An evolution of culturally responsive teaching that seeks to not only acknowledge but actively sustain and revitalize linguistic and cultural pluralism in classrooms.",
    rationalization: "Supports indigenous languages (like Mother Tongue education) and traditional storytelling as enduring cultural rights rather than temporary bridges to English assimilation.",
    mnemonic: { title: "Culturally Sustaining", phrase: "Sustain and Revitalize Native Cultures", items: ["C - Culturally Sustaining", "P - Pluralism preserved", "L - Linguistic heritage nurtured"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply multicultural literacy and culturally responsive teaching approaches",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Inflation and Purchasing Power",
    definition: "Inflation is the general increase in prices and fall in the purchasing power of money over time, meaning a fixed amount of currency buys fewer goods and services.",
    rationalization: "Understanding inflation teaches students why simply storing cash under a mattress guarantees wealth erosion, highlighting the necessity of investments yielding returns above the inflation rate.",
    mnemonic: { title: "Inflation Erosion", phrase: "Prices Rise, Money Buys Less", items: ["I - Inflation", "P - Purchasing power drops", "I - Invest above inflation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Compounding Effect: 'The Eighth Wonder of the World'",
    definition: "The mathematical and financial phenomenon where investment earnings generate their own earnings over time, resulting in exponential wealth accumulation.",
    rationalization: "Attributed to Albert Einstein; starting to save and invest in one's early 20s leverages the compounding effect far more effectively than starting in one's 40s.",
    mnemonic: { title: "Compound Growth", phrase: "Interest on Interest Across Decades", items: ["C - Compound interest", "E - Exponential growth", "T - Time is the greatest multiplier"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Opportunity Cost",
    definition: "The financial and economic principle referring to the value of the next best alternative that is forgone when a choice is made between mutually exclusive options.",
    rationalization: "When a student spends ₱5,000 on a luxury concert ticket, the opportunity cost is the emergency savings or textbook purchase that the ₱5,000 could have provided.",
    mnemonic: { title: "Opportunity Cost", phrase: "The Value of What You Sacrificed", items: ["O - Opportunity cost", "F - Forgone alternative", "T - Trade-off in every choice"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Climate Literacy",
    definition: "The fundamental understanding of human impacts on climate systems, the principles of global warming, climate vulnerability, and the mitigation strategies required to secure environmental resilience.",
    rationalization: "Empowers learners to critically assess carbon emissions, support green initiatives, and advocate for climate justice policies.",
    mnemonic: { title: "Climate Literacy", phrase: "Understand Climate Science, Take Action", items: ["C - Climate science basics", "V - Vulnerability & adaptation", "M - Mitigation action"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply eco-literacy and sustainable development principles",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Circular Economy vs Linear Economy",
    definition: "A linear economy follows a 'take-make-dispose' model depleting finite resources; A circular economy designs out waste, keeps products and materials in high-value circulation through reuse and repair, and regenerates nature.",
    rationalization: "Promoted globally to eliminate single-use plastics and create closed-loop industrial ecosystems.",
    mnemonic: { title: "Circular Economy", phrase: "Design Out Waste, Keep Materials in Use", items: ["Linear: Take, Make, Waste", "Circular: Reduce, Reuse, Recycle, Regenerate"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply eco-literacy and sustainable development principles",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Creative Problem Solving (CPS / Alex Osborn & Sid Parnes)",
    definition: "A structured process for developing imaginative solutions to problems through alternating phases of divergent thinking (generating ideas) and convergent thinking (evaluating ideas).",
    rationalization: "Comprises six stages: Objective Finding, Fact Finding, Problem Finding, Idea Finding, Solution Finding, and Acceptance Finding.",
    mnemonic: { title: "CPS Framework", phrase: "Diverge to Discover, Converge to Decide", items: ["O - Osborn & Parnes", "D - Divergent generation", "C - Convergent selection"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Foster arts, creativity, and innovative design thinking",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Intellectual Property Rights and Plagiarism Literacy",
    definition: "The ethical and legal literacy regarding the ownership of creative works, patents, trademarks, and copyright, ensuring proper attribution and fair use of intellectual assets.",
    rationalization: "Educates students to avoid plagiarism (intellectual theft) by using paraphrasing, in-text citations, and Creative Commons licensing.",
    mnemonic: { title: "IPR Literacy", phrase: "Respect Authorship: Cite Your Sources", items: ["C - Copyright compliance", "A - Attribution & citation", "F - Fair use guidelines"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Fair Use Doctrine",
    definition: "A legal doctrine permitting the limited use of copyrighted material without obtaining permission from the copyright holder for purposes such as criticism, news reporting, teaching, and research.",
    rationalization: "Determined by 4 factors: 1. Purpose of the use (commercial vs educational); 2. Nature of the work; 3. Amount used; 4. Effect on the commercial market value.",
    mnemonic: { title: "4 Fair Use Factors", phrase: "Purpose, Nature, Amount, Market Effect", items: ["1. Educational purpose", "2. Factual nature", "3. Small portion used", "4. No market harm"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Creative Commons (CC) Licenses",
    definition: "Public copyright licenses that enable the free distribution of an otherwise copyrighted work, giving creators a standardized way to grant permissions to the public.",
    rationalization: "Key licenses: CC BY (Attribution required), CC BY-SA (ShareAlike), CC BY-NC (Non-Commercial), CC BY-ND (No Derivatives), CC0 (Public Domain dedication).",
    mnemonic: { title: "Creative Commons Symbols", phrase: "BY (Credit), NC (No Sale), ND (No Change), SA (Share Alike)", items: ["BY: Attribute author", "NC: Non-commercial only", "ND: No modifications", "SA: Share alike under same license"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Clickbait and Algorithmic Outrage",
    definition: "Online media headlines designed with sensational, exaggerated phrasing to entice users to click, often exploiting emotional anger to maximize social media engagement metrics.",
    rationalization: "MIL instructs students to look past sensationalized headlines and verify full articles before sharing emotionally triggering posts.",
    mnemonic: { title: "Clickbait Danger", phrase: "Sensational Headliner Seeking Cheap Clicks", items: ["C - Clickbait", "S - Sensationalized headline", "E - Emotional manipulation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Evaluate media, information, and digital literacy tools",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Health Literacy",
    definition: "The degree to which individuals have the capacity to obtain, process, understand, and apply basic health information and services needed to make appropriate health decisions.",
    rationalization: "Enables students to understand nutritional food labels, interpret prescription drug dosages, and differentiate evidence-based medical treatments from unverified quackery.",
    mnemonic: { title: "Health Literacy", phrase: "Read, Understand, and Apply Health Decisions", items: ["H - Health literacy", "N - Nutrition label mastery", "M - Medication dosage understanding"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Promote health, wellness, and mental health literacy",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Active Listening in Social Literacy",
    definition: "A structured communication technique requiring the listener to fully concentrate, understand, respond, and remember what is being said, withholding judgment and interrupting.",
    rationalization: "Utilizes verbal paraphrasing ('What I hear you saying is...'), open posture, nodding, and validating the emotional tone of the speaker.",
    mnemonic: { title: "Active Listening", phrase: "Listen to Understand, Not Just to Reply", items: ["A - Active attention", "P - Paraphrase meaning", "N - Non-verbal validation"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Integrate social-emotional learning (SEL) and social literacy",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Cyberbullying Forms: Flaming, Doxxing, Harassment",
    definition: "Specific forms of online aggression where Flaming is sending hostile, insulting messages in public forums; Doxxing is malicious publication of private personal info (home address, phone); and Harassment is sustained targeted online threats.",
    rationalization: "Penalized under the Anti-Bullying Act (RA 10627) and the Cybercrime Prevention Act (RA 10175).",
    mnemonic: { title: "Cyberbullying Forms", phrase: "Flaming (Public Insults), Doxxing (Leaking Address), Harassment (Threats)", items: ["Flaming: Hostile public rants", "Doxxing: Leaking private data", "Harassment: Repeated malicious attacks"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Examine cyber-literacy, netiquette, and digital citizenship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Visual Literacy",
    definition: "The ability to interpret, negotiate, and make meaning from information presented in the form of an image, infographic, photograph, chart, or visual design.",
    rationalization: "In an image-saturated culture, visual literacy teaches students how framing, color temperature, cropping, and lighting subtly shape narrative bias.",
    mnemonic: { title: "Visual Literacy", phrase: "Reading Meaning in Pictures and Graphics", items: ["V - Visual literacy", "I - Infographic analysis", "F - Framing and composition decoding"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Analyze the 21st century skills framework and new literacies across disciplines",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Delayed Gratification in Financial Self-Regulation",
    definition: "The ability to resist the temptation for an immediate, smaller reward in order to obtain a much more valuable, enduring reward in the future.",
    rationalization: "Demonstrated by Walter Mischel's famous Stanford Marshmallow Test; proven to be the single most potent predictor of long-term financial success, saving habits, and emotional health.",
    mnemonic: { title: "Delayed Gratification", phrase: "Sacrifice Short-Term Pleasures for Long-Term Wealth", items: ["D - Delayed gratification", "M - Marshmallow experiment", "R - Resists impulse spending"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply financial literacy concepts in consumer decision-making",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Ecological Footprint Metric (Mathis Wackernagel)",
    definition: "A standardized resource accounting tool measuring how much biologically productive land and sea area an individual or population requires to produce the resources consumed and absorb the waste generated.",
    rationalization: "Calculates 'Earth Overshoot Day', the annual calendar date when humanity has consumed all ecological resources that Earth can regenerate that year.",
    mnemonic: { title: "Eco-Footprint Metric", phrase: "Human Nature Demand vs Earth Biocapacity", items: ["E - Ecological footprint", "O - Overshoot day", "S - Sustainability accounting"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Apply eco-literacy and sustainable development principles",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Critical Thinking: Fact vs Opinion",
    definition: "A fact is an objective statement that can be proven true or false through verifiable empirical evidence; An opinion is a subjective expression of personal belief, feeling, or judgment that cannot be objectively verified.",
    rationalization: "Core foundational skill of media literacy: identifying when news broadcasts disguise editorial opinion as objective fact.",
    mnemonic: { title: "Fact vs Opinion", phrase: "Fact is Proven with Evidence; Opinion is Personal View", items: ["Fact: Verifiable proof", "Opinion: Subjective judgment"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Analyze the 21st century skills framework and new literacies across disciplines",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Cross-Disciplinary Literacy Integration",
    definition: "The intentional weaving of reading, writing, mathematical numeracy, and 21st-century literacies into all content subjects (science, social studies, physical education), rather than isolating literacy strictly to English and Filipino classes.",
    rationalization: "Reflects the principle: 'Every teacher is a teacher of reading and critical literacy in their specialized discipline.'",
    mnemonic: { title: "Disciplinary Literacy", phrase: "Every Teacher is a Literacy Teacher", items: ["C - Cross-curricular", "I - Integrated across subjects", "D - Disciplinary reading skills"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Analyze the 21st century skills framework and new literacies across disciplines",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Responsible Decision-Making in Social Literacy",
    definition: "The CASEL SEL competence defined as the ability to make caring, constructive choices about personal behavior and social interactions across diverse situations based on ethical standards, safety concerns, and social norms.",
    rationalization: "Involves anticipating the realistic consequences of one's actions on oneself and others before making a choice.",
    mnemonic: { title: "Responsible Decisions", phrase: "Pause, Reflect on Consequences, Choose Ethically", items: ["R - Responsible decision", "C - Consequence analysis", "E - Ethical choice"] },
    source: "PRC BLEPT ProfEd New Literacies Reviewer",
    tosCompetency: "Integrate social-emotional learning (SEL) and social literacy",
    bloomsTaxonomy: "Applying",
    highYield: true
  }
];

// Write Building and Enhancing New Literacies Across the Curriculum
writeDataset(
  'data/profed/new_literacies/new_literacies.json',
  'Professional Education',
  'Building and Enhancing New Literacies Across the Curriculum',
  '21st Century Literacies, Media Literacy, Financial, & Eco-Literacy',
  profed4Items
);
