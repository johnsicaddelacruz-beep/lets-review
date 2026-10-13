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

// 2. Facilitating Learner-Centered Teaching (50 items)
const profed2Items = [
  {
    term: "14 Learner-Centered Psychological Principles (APA)",
    definition: "The research-based psychological framework developed by the American Psychological Association categorizing learning into four domains: Cognitive/Metacognitive, Motivational/Affective, Developmental/Social, and Individual Differences factors.",
    rationalization: "Directs teachers to design instruction centered on the learner's active construction of meaning, intrinsic motivation, and social interaction rather than passive teacher lecture.",
    mnemonic: { title: "APA 14 Principles", phrase: "Cognitive, Motivational, Developmental, Individual Differences", items: ["C - Cognitive & Metacognitive (6)", "M - Motivational & Affective (3)", "D - Developmental & Social (2)", "I - Individual Differences (3)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply the 14 Learner-Centered Psychological Principles in instructional planning",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Schema Theory (Jean Piaget)",
    definition: "The cognitive concept that knowledge is organized into mental building blocks or frameworks called 'schemas' that help individuals interpret and understand the world.",
    rationalization: "A child develops a schema for a 'dog' (four legs, furry, barks) and uses that cognitive structure to recognize new dogs encountered in the environment.",
    mnemonic: { title: "Schema Concept", phrase: "Mental File Folders of Knowledge", items: ["S - Schema", "M - Mental filing cabinet", "B - Building blocks of knowledge"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate cognitive processes: schema, assimilation, and accommodation",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Assimilation (Jean Piaget)",
    definition: "The cognitive process of fitting new incoming information into an already existing schema without altering the fundamental structure of that schema.",
    rationalization: "A toddler who knows the schema for 'dog' sees a cat for the first time and shouts 'Doggy!' because the cat fits into their existing four-legged animal schema.",
    mnemonic: { title: "Assimilation Rule", phrase: "Fit In Without Changing Schema", items: ["A - Assimilation", "S - Same schema used", "F - Fits into existing folder"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate cognitive processes: schema, assimilation, and accommodation",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Accommodation (Jean Piaget)",
    definition: "The cognitive process of modifying an existing schema or creating a brand new schema because new information clashes with old mental frameworks.",
    rationalization: "When the parent explains that cats meow and climb trees, the toddler changes their mental schema, creating a new, separate category for 'cat'.",
    mnemonic: { title: "Accommodation Rule", phrase: "Change Schema to Accommodate New Facts", items: ["A - Accommodation", "C - Change existing schema", "N - New folder created"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate cognitive processes: schema, assimilation, and accommodation",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Equilibration and Disequilibrium (Piaget)",
    definition: "Equilibration is the natural cognitive drive to find mental balance between existing schemas and new environmental experiences; Disequilibrium is the state of cognitive confusion that motivates learning.",
    rationalization: "Effective teachers deliberately induce disequilibrium through provocative questions, compelling students to accommodate new concepts to restore mental equilibrium.",
    mnemonic: { title: "Equilibrium Drive", phrase: "Disequilibrium Sparks Curiosity, Equilibration Restores Balance", items: ["E - Equilibrium (Balance)", "D - Disequilibrium (Cognitive conflict)", "L - Learning driver"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate cognitive processes: schema, assimilation, and accommodation",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Zone of Proximal Development (ZPD / Lev Vygotsky)",
    definition: "The distance between a learner's actual developmental level (what they can do independently) and their level of potential development (what they can achieve with guidance).",
    rationalization: "Teaching is most effective when it targets the ZPD; tasks below the ZPD cause boredom, while tasks far beyond the ZPD cause extreme frustration.",
    mnemonic: { title: "Vygotsky's ZPD", phrase: "The Sweet Spot of Guided Learning", items: ["Z - Zone of Proximal Development", "A - Actual level (Independent)", "P - Potential level (Assisted)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Vygotsky's Sociocultural Theory, ZPD, and scaffolding",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Scaffolding (Jerome Bruner and Lev Vygotsky)",
    definition: "The temporary instructional support provided by a teacher or More Knowledgeable Other that is gradually withdrawn as the learner becomes proficient and autonomous.",
    rationalization: "Like construction scaffolding, cues, modeling, graphic organizers, and step-by-step guidance support early learning until the student can build understanding independently.",
    mnemonic: { title: "Scaffolding Clue", phrase: "Temporary Support Faded Away Gradually", items: ["S - Scaffolding", "T - Temporary guidance", "F - Faded as student masters skill"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Vygotsky's Sociocultural Theory, ZPD, and scaffolding",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "More Knowledgeable Other (MKO / Vygotsky)",
    definition: "Anyone who has a higher level of performance, knowledge, or understanding than the learner regarding a specific task, process, or concept.",
    rationalization: "The MKO is not exclusively the classroom teacher; it can be an advanced peer, a parent, an instructional software program, or a tutor.",
    mnemonic: { title: "MKO Concept", phrase: "Anyone with Greater Expertise", items: ["M - More", "K - Knowledgeable", "O - Other (Teacher, peer, app)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Vygotsky's Sociocultural Theory, ZPD, and scaffolding",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Private Speech (Lev Vygotsky)",
    definition: "The self-directed, audible speech used by young children to guide their own thinking, regulate behavior, and solve difficult tasks, later internalizing into silent inner speech.",
    rationalization: "Piaget viewed private speech as immature 'egocentric speech'; Vygotsky proved it is a vital cognitive tool for self-regulation and executive control.",
    mnemonic: { title: "Private Speech", phrase: "Talking to Self to Solve Problems", items: ["P - Private speech", "S - Self-regulation tool", "I - Internalizes into inner thought"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Vygotsky's Sociocultural Theory, ZPD, and scaffolding",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Meaningful Learning Theory (David Ausubel)",
    definition: "The cognitive learning theory stating that new knowledge is acquired effectively only when it is non-arbitrarily and substantively related to anchored concepts already present in the learner's cognitive structure.",
    rationalization: "Opposed rote memorization; Ausubel declared: 'The most important single factor influencing learning is what the learner already knows. Ascertain this and teach him accordingly.'",
    mnemonic: { title: "Ausubel Meaningful", phrase: "Anchor New Facts to Prior Knowledge", items: ["D - David Ausubel", "M - Meaningful learning", "P - Prior knowledge anchor"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Ausubel's Meaningful Learning and Advance Organizers",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Advance Organizers (David Ausubel)",
    definition: "Instructional frameworks or introductory materials presented prior to learning to bridge the gap between what the learner already knows and what they need to learn.",
    rationalization: "Two types: Expository Organizers (used when unfamiliar new material is introduced to provide a basic conceptual scaffolding) and Comparative Organizers (used to highlight contrasts between familiar and new concepts).",
    mnemonic: { title: "Advance Organizers", phrase: "Mental Bridges Before the Lesson", items: ["A - Advance organizer", "E - Expository (Brand new topic)", "C - Comparative (Relate familiar topic)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Ausubel's Meaningful Learning and Advance Organizers",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Subsumption Theory (David Ausubel)",
    definition: "The cognitive process whereby new detailed information is linked and absorbed (subsumed) under more inclusive, broader conceptual ideas already in the learner's mind.",
    rationalization: "Includes Derivative Subsumption (new item is just a direct example of existing concept) and Correlative Subsumption (new item extends, alters, or qualifies the existing concept).",
    mnemonic: { title: "Subsumption Concept", phrase: "Subsume Specific Details Under Big Ideas", items: ["S - Subsumption", "D - Derivative (Direct example)", "C - Correlative (Expands concept)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Ausubel's Meaningful Learning and Advance Organizers",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Bruner's Three Modes of Representation",
    definition: "Jerome Bruner's developmental framework where knowledge is represented in three stages: Enactive (action-based / physical manipulation), Iconic (image-based / visuals and diagrams), and Symbolic (code-based / abstract words and mathematical symbols).",
    rationalization: "In teaching mathematics, concrete manipulatives (enactive) are followed by pictures (iconic), and finally numerical formulas (symbolic), known as the CPA approach.",
    mnemonic: { title: "Bruner's E-I-S Modes", phrase: "Enactive (Hands), Iconic (Eyes), Symbolic (Symbols)", items: ["E - Enactive (Action/Physical)", "I - Iconic (Visual/Picture)", "S - Symbolic (Abstract/Language)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Bruner's Discovery Learning, Modes of Representation, and Spiral Curriculum",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Spiral Curriculum (Jerome Bruner)",
    definition: "An educational design approach where fundamental concepts are introduced early in simple forms and continually revisited at subsequent grade levels with increasing depth, complexity, and rigor.",
    rationalization: "Adopted as the foundational structural design of the Philippine K to 12 curriculum under RA 10533 to reinforce mastery over time.",
    mnemonic: { title: "Spiral Curriculum", phrase: "Revisit Concepts at Greater Depth and Complexity", items: ["S - Spiral", "R - Revisit concepts repeatedly", "D - Deeper complexity each year"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Bruner's Discovery Learning, Modes of Representation, and Spiral Curriculum",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Discovery Learning (Jerome Bruner)",
    definition: "An inquiry-based instructional method where students actively discover relationships, facts, and principles on their own through hands-on experimentation rather than passive listening.",
    rationalization: "Encourages inductive thinking and autonomous problem-solving, making students active agents of their own knowledge construction.",
    mnemonic: { title: "Discovery Learning", phrase: "Inquire, Experiment, and Discover Principles", items: ["D - Discovery", "I - Inductive exploration", "A - Active inquiry"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Bruner's Discovery Learning, Modes of Representation, and Spiral Curriculum",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Observational Learning (Albert Bandura)",
    definition: "Learning that occurs through observing, retaining, and imitating the behavior, attitudes, and emotional reactions of others (models).",
    rationalization: "Proved in Bandura's famous Bobo Doll experiment that aggression can be acquired purely through visual observation without direct operant reinforcement.",
    mnemonic: { title: "Bandura's 4 Modeling Steps", phrase: "A-R-M-M: Attention, Retention, Motor reproduction, Motivation", items: ["A - Attention (Focus on model)", "R - Retention (Remember actions)", "M - Motor reproduction (Replicate)", "M - Motivation (Reason to perform)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Examine Bandura's Social Learning Theory and observational modeling",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Vicarious Reinforcement (Bandura)",
    definition: "The phenomenon where a learner's likelihood of exhibiting a behavior increases or decreases after observing another person (the model) being rewarded or punished for that same behavior.",
    rationalization: "When a teacher publicly praises a student for raising their hand before speaking, neighboring classmates quietly raise their hands to seek the same reward.",
    mnemonic: { title: "Vicarious Learning", phrase: "Learning from the Consequences of Others", items: ["V - Vicarious", "O - Observe peer consequences", "I - Imitate rewarded behavior"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Examine Bandura's Social Learning Theory and observational modeling",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Information Processing Model (Atkinson and Shiffrin)",
    definition: "The cognitive architecture of memory consisting of three sequential stages: Sensory Memory (brief perception), Short-Term/Working Memory (limited capacity workbench), and Long-Term Memory (permanent storage).",
    rationalization: "Sensory memory holds sensations for fractions of a second; attention transfers data to short-term memory; rehearsal and encoding transfer data to long-term memory.",
    mnemonic: { title: "Memory Stages", phrase: "Sensory -> Short-Term -> Long-Term", items: ["S - Sensory memory (Milliseconds)", "S - Short-term memory (20-30 secs)", "L - Long-term memory (Infinite capacity)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Working Memory Capacity (George Miller's 7 $\\pm$ 2)",
    definition: "The finding that human working memory can hold only approximately $7 \\pm 2$ chunks of information simultaneously without active maintenance rehearsal.",
    rationalization: "Explains cognitive overload in classrooms; teachers must chunk complex instructional material into manageable units to prevent working memory failure.",
    mnemonic: { title: "Miller's Magic Number", phrase: "Seven Plus or Minus Two Chunks", items: ["7 $\pm$ 2 items capacity", "C - Chunking increases retention", "O - Overload prevention"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Chunking Technique",
    definition: "The memory strategy of grouping individual bits of information into larger, meaningful, cohesive units to bypass working memory capacity constraints.",
    rationalization: "Remembering a telephone number as three chunks (0917-555-1234) rather than 11 separate digits makes it significantly easier to store and recall.",
    mnemonic: { title: "Chunking Clue", phrase: "Group Small Bits into Big Meaningful Units", items: ["C - Chunking", "G - Grouping items", "R - Reduces cognitive load"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Episodic vs Semantic Memory (Explicit / Declarative)",
    definition: "Episodic memory stores personally experienced autobiographical events tied to a specific time and place (e.g., your first day of high school); Semantic memory stores general knowledge, facts, and concepts independent of personal context (e.g., Manila is the capital of the Philippines).",
    rationalization: "Both are types of declarative/explicit long-term memory that can be consciously retrieved and verbalized.",
    mnemonic: { title: "Episodic vs Semantic", phrase: "Episodic = Personal Episodes; Semantic = Facts and Science", items: ["Episodic: Personal memories and dates", "Semantic: General world facts and vocabulary"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Procedural Memory (Implicit Memory)",
    definition: "The non-declarative long-term memory responsible for knowing how to execute physical motor skills and automatic behavioral routines (e.g., riding a bicycle, swimming, typing).",
    rationalization: "Operates without conscious, intentional recall; stored primarily in the cerebellum and basal ganglia, resisting amnesia better than declarative memory.",
    mnemonic: { title: "Procedural Memory", phrase: "How-To Muscle Memory", items: ["P - Procedural", "M - Motor skills", "A - Automatic execution without thinking"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Thorndike's Law of Effect",
    definition: "The foundational principle of connectionism stating that responses followed by satisfying consequences are strengthened and more likely to reoccur, while responses followed by discomfort are weakened.",
    rationalization: "Pioneered by Edward Thorndike's puzzle box experiments with cats; served as the direct precursor to B.F. Skinner's operant conditioning and positive reinforcement.",
    mnemonic: { title: "Law of Effect", phrase: "Satisfaction Strengthens, Discomfort Weakens", items: ["L - Law of Effect", "S - Satisfying = repeated", "A - Annoying = eliminated"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Thorndike's Laws of Learning (Readiness, Exercise, Effect)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Thorndike's Law of Readiness",
    definition: "The law of learning asserting that when an individual is physiologically and cognitively prepared to act, doing so is satisfying; being prevented from acting, or being forced to act when unready, causes frustration.",
    rationalization: "Teachers must ensure prerequisite mastery and developmental readiness before introducing advanced tasks, otherwise instruction produces resentment.",
    mnemonic: { title: "Law of Readiness", phrase: "Ready to Act Brings Joy, Unready Brings Pain", items: ["R - Readiness", "P - Preparedness to learn", "M - Motivation to participate"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Thorndike's Laws of Learning (Readiness, Exercise, Effect)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Thorndike's Law of Exercise",
    definition: "The law of learning stating that stimulus-response connections are strengthened through frequent practice and repetition (Law of Use) and weakened when practice is discontinued (Law of Disuse).",
    rationalization: "Explains why periodic drill, review, and application are essential to prevent skill decay and forgetfulness in mathematics and languages.",
    mnemonic: { title: "Law of Exercise", phrase: "Use It or Lose It", items: ["L - Law of Use (Drill strengthens)", "D - Law of Disuse (Neglect weakens)", "P - Practice makes permanent"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Thorndike's Laws of Learning (Readiness, Exercise, Effect)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Insight Learning (Wolfgang Köhler)",
    definition: "The Gestalt learning phenomenon where a solution to a problem appears suddenly and spontaneously as a whole ('Aha! moment') following a period of cognitive restructuring of the perceptual field.",
    rationalization: "Demonstrated by Köhler's chimpanzee Sultan, who stacked boxes and combined sticks to reach high bananas without trial-and-error repetition.",
    mnemonic: { title: "Aha! Moment", phrase: "Köhler: Sudden Insight Reorganizes the Whole", items: ["I - Insight learning", "A - Aha! moment", "K - Köhler's chimpanzee experiments"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Examine Gestalt principles and insight learning",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Gestalt Law of Closure",
    definition: "The visual perceptual principle stating that human minds automatically perceive incomplete shapes or broken outlines as complete, whole figures by mentally filling in missing gaps.",
    rationalization: "Our brains prefer symmetry and complete wholes (Prägnanz), projecting lines to close contours in diagrams and reading incomplete words smoothly.",
    mnemonic: { title: "Gestalt Closure", phrase: "Mind Fills in the Missing Gaps", items: ["C - Closure", "G - Gap filling", "W - Whole perceived over fragments"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Examine Gestalt principles and insight learning",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Gestalt Law of Proximity",
    definition: "The perceptual grouping principle stating that objects positioned close to each other are automatically perceived as forming a unified group or belonging together.",
    rationalization: "In worksheet design and user interfaces, spacing related items close together while separating unrelated items with whitespace reduces visual confusion.",
    mnemonic: { title: "Gestalt Proximity", phrase: "Closeness Creates a Group", items: ["P - Proximity", "C - Closeness in space", "G - Grouped together visually"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Examine Gestalt principles and insight learning",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Transfer of Learning: Positive, Negative, and Zero",
    definition: "Positive transfer occurs when prior learning helps/facilitates learning a new task; Negative transfer occurs when prior learning interferes with or hinders a new task; Zero transfer means prior learning has no effect.",
    rationalization: "Knowing Spanish helps in learning Portuguese (positive transfer); knowing English driving rules hinders learning UK left-side driving (negative transfer).",
    mnemonic: { title: "Transfer of Learning", phrase: "Positive Helps; Negative Hinders; Zero Has No Effect", items: ["Positive: Facilitates new skill", "Negative: Interferences/confusion", "Zero: Unrelated tasks"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Distinguish types and levels of transfer of learning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Near Transfer vs Far Transfer",
    definition: "Near transfer is applying learned skills to a new situation that is highly similar in context and structure to the original learning setting; Far transfer is applying skills to a fundamentally different, novel domain.",
    rationalization: "Solving a math problem with different numbers on a quiz is near transfer; applying mathematical game theory to resolve a playground conflict is far transfer.",
    mnemonic: { title: "Transfer Distance", phrase: "Near = Similar Task; Far = Novel Domain", items: ["Near: Closely aligned context", "Far: Remote, novel application"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Distinguish types and levels of transfer of learning",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Self-Determination Theory (Deci and Ryan)",
    definition: "The motivation theory positing that human flourishing and intrinsic motivation depend on satisfying three basic psychological needs: Autonomy, Competence, and Relatedness.",
    rationalization: "Autonomy is feeling in control of choices; Competence is feeling effective and capable; Relatedness is feeling a secure sense of belonging with others.",
    mnemonic: { title: "SDT Triad", phrase: "A-C-R: Autonomy, Competence, Relatedness", items: ["A - Autonomy (Choice)", "C - Competence (Efficacy)", "R - Relatedness (Belonging)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Intrinsic Motivation vs Extrinsic Motivation",
    definition: "Intrinsic motivation is engaging in an activity purely for its own inherent enjoyment, curiosity, and satisfaction; Extrinsic motivation is doing an activity to attain external rewards (grades, money) or avoid punishment.",
    rationalization: "Over-reliance on tangible extrinsic rewards can cause the 'Overjustification Effect', diminishing pre-existing intrinsic interest in the task.",
    mnemonic: { title: "Motivation Drivers", phrase: "Intrinsic Comes from Inside; Extrinsic Comes from Outside", items: ["Intrinsic: Passion & curiosity", "Extrinsic: Stickers, points, grades"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Attribution Theory (Bernard Weiner)",
    definition: "A cognitive theory of motivation explaining how individuals interpret the causes of their successes and failures across three dimensions: Locus (internal vs external), Stability (stable vs unstable), and Controllability.",
    rationalization: "Students who attribute failure to lack of effort (internal, unstable, controllable) remain motivated to work harder; students who attribute failure to low ability (internal, stable, uncontrollable) succumb to learned helplessness.",
    mnemonic: { title: "Weiner's 3 Dimensions", phrase: "Locus, Stability, Controllability", items: ["L - Locus (Inside vs Outside)", "S - Stability (Permanent vs Temporary)", "C - Controllability (Can I change it?)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Learned Helplessness (Martin Seligman)",
    definition: "A psychological condition where an individual, having experienced repeated uncontrollable failures, comes to believe they have no power to change the outcome, completely giving up on future attempts.",
    rationalization: "Occurs when students internalize that 'No matter how hard I study, I will always fail at math.' The antidote is attribution retraining and scaffolded success.",
    mnemonic: { title: "Learned Helplessness", phrase: "Giving Up Because You Believe Effort is Futile", items: ["L - Learned helplessness", "P - Passive resignation", "A - Attribution retraining required"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Mastery Goals vs Performance Goals",
    definition: "Mastery goals focus on deep understanding, learning, and personal improvement; Performance goals focus on demonstrating superior competence relative to peers (Performance-Approach) or avoiding looking foolish (Performance-Avoidance).",
    rationalization: "Mastery-oriented learners view mistakes as essential learning feedback; performance-avoidance learners avoid challenges to protect public self-image.",
    mnemonic: { title: "Goal Orientations", phrase: "Mastery = Want to Learn; Performance = Want to Look Smart", items: ["Mastery: Intrinsic skill growth", "Performance-Approach: Win praise", "Performance-Avoidance: Fear looking dumb"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Dual-Coding Theory (Allan Paivio)",
    definition: "The cognitive theory stating that the human brain processes information through two separate, complementary channels: a verbal channel (words, text) and a non-verbal visual channel (images, diagrams).",
    rationalization: "Presenting information simultaneously with words and matching visual diagrams creates dual memory traces, dramatically increasing retention and recall.",
    mnemonic: { title: "Dual-Coding Paivio", phrase: "Two Channels: Words and Images", items: ["D - Dual-coding", "V - Verbal code", "V - Visual code"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Cognitive Load Theory (John Sweller)",
    definition: "An instructional theory identifying three types of working memory demands: Intrinsic Load (inherent topic difficulty), Germane Load (effort dedicated to schema construction), and Extraneous Load (ineffective instructional design).",
    rationalization: "Instructional goal: Manage intrinsic load, optimize germane load, and aggressively eliminate extraneous cognitive load (clutter, confusing fonts, irrelevant decorative animations).",
    mnemonic: { title: "3 Cognitive Loads", phrase: "Intrinsic (Difficulty), Germane (Schema-Building), Extraneous (Waste)", items: ["I - Intrinsic load", "G - Germane load (Promote it)", "E - Extraneous load (Cut it)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply cognitive load theory and instructional ergonomics",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Expectancy-Value Theory (Wigfield and Eccles)",
    definition: "A motivational model proposing that a student's motivation to perform a task is determined by their Expectancy of success multiplied by the subjective Value they attach to the task: $M = E \\times V$.",
    rationalization: "If either component is zero (the student believes they have 0% chance of passing, or finds the task 100% pointless), overall motivation collapses to zero.",
    mnemonic: { title: "Motivation Formula", phrase: "Motivation = Expectancy * Value", items: ["E - Expectancy (Can I do it?)", "V - Value (Do I care about it?)", "Zero multiplier effect"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Classical Conditioning (Ivan Pavlov)",
    definition: "A learning process that occurs through associations between an environmental stimulus and a naturally occurring biological stimulus (Unconditioned Stimulus, Conditioned Stimulus, and Conditioned Response).",
    rationalization: "Pavlov conditioned dogs to salivate at the sound of a metronome/bell; in schools, a harsh, shouting teacher can become a conditioned stimulus triggering student school phobia.",
    mnemonic: { title: "Pavlov Conditioning", phrase: "Pairing Bell with Food Yields Salivation", items: ["UCS - Unconditioned stimulus", "CS - Conditioned stimulus", "CR - Learned response"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate classical and operant behavioral conditioning",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Operant Conditioning (B.F. Skinner)",
    definition: "A learning method where the strength of a behavior is modified through reinforcement (rewards) or punishment following the behavior.",
    rationalization: "Positive reinforcement ADDS a pleasant stimulus; Negative reinforcement REMOVES an unpleasant stimulus; both increase behavior frequency.",
    mnemonic: { title: "Operant Reinforcement", phrase: "Positive = Add Reward; Negative = Remove Annoyance", items: ["Positive Reinforcement: Give praise", "Negative Reinforcement: Remove homework chore", "Punishment: Decreases behavior"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate classical and operant behavioral conditioning",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Premack Principle ('Grandma's Rule')",
    definition: "An operant conditioning principle stating that a more-preferred, high-probability behavior can be used effectively to reinforce a less-preferred, low-probability behavior.",
    rationalization: "Example: 'Once you finish your math problem set (less-preferred), you can go play basketball outside for 15 minutes (high-preferred).'",
    mnemonic: { title: "Premack's Rule", phrase: "Eat Your Broccoli Before You Get Ice Cream", items: ["P - Premack principle", "H - High-frequency activity as reward", "L - Low-frequency chore reinforced"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate classical and operant behavioral conditioning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Extinction in Behavioral Learning",
    definition: "The gradual reduction and eventual disappearance of a conditioned response when reinforcement is consistently withheld.",
    rationalization: "If a student continually misbehaves to seek the teacher's attention, systematically ignoring the attention-seeking behavior (planned ignoring) leads to extinction of the habit.",
    mnemonic: { title: "Behavioral Extinction", phrase: "Stop the Reward, Extinguish the Behavior", items: ["E - Extinction", "W - Withholding reinforcement", "P - Planned ignoring"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate classical and operant behavioral conditioning",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Shaping (Method of Successive Approximations / Skinner)",
    definition: "An operant conditioning procedure where new, complex behaviors are taught by progressively reinforcing successive approximations toward the final target behavior.",
    rationalization: "Essential when teaching complex athletic movements, handwriting, or speech articulation: you reward imperfect early tries that move closer to the ideal form.",
    mnemonic: { title: "Shaping Approximations", phrase: "Reward Every Step Closer to the Goal", items: ["S - Shaping", "S - Successive approximations", "C - Step-by-step reinforcement"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Differentiate classical and operant behavioral conditioning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Epistemic Curiosity",
    definition: "The intrinsic drive to acquire knowledge, resolve cognitive ambiguities, and learn for the sheer intellectual satisfaction of discovering how things work.",
    rationalization: "Contrasted with perceptual curiosity (arousal from sudden sensory noises); epistemic curiosity fuels deep scientific inquiry and lifelong autonomous learning.",
    mnemonic: { title: "Epistemic Curiosity", phrase: "Thirst for Intellectual Understanding", items: ["E - Epistemic", "K - Knowledge seeking", "C - Cognitive satisfaction"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Metacognitive Regulation Phases (Planning, Monitoring, Evaluating)",
    definition: "The three executive control phases of metacognition: Planning (allocating time and choosing strategies), Monitoring (checking comprehension while reading), and Evaluating (assessing task mastery).",
    rationalization: "Expert learners pause periodically during reading to check comprehension (monitoring) and reread confusing paragraphs to adjust strategies.",
    mnemonic: { title: "P-M-E Metacognition", phrase: "Plan Before, Monitor During, Evaluate After", items: ["P - Plan", "M - Monitor", "E - Evaluate"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply metacognitive strategies and self-regulated learning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Elaborative Rehearsal vs Maintenance Rehearsal",
    definition: "Maintenance rehearsal is simple rote repetition of information to keep it in short-term memory temporarily; Elaborative rehearsal connects new information with established long-term memories to create deep meaning.",
    rationalization: "According to Craik and Lockhart's Levels of Processing, elaborative rehearsal generates deep semantic processing, resulting in permanent long-term memory encoding.",
    mnemonic: { title: "Rehearsal Types", phrase: "Maintenance is Rote; Elaborative is Deep Meaning", items: ["M - Maintenance (Shallow repeat)", "E - Elaborative (Deep connections)"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Analyze Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Self-Regulated Learning Strategies (Zimmerman)",
    definition: "Deliberate cognitive and behavioral tactics used by independent learners, including goal setting, environmental structuring, self-recording, seeking assistance, and self-reinforcement.",
    rationalization: "Empowering learners to structure their study environment (turning off phone notifications) directly boosts academic self-efficacy and exam achievement.",
    mnemonic: { title: "Self-Regulation Tactics", phrase: "Set Goals, Control Environment, Track Progress", items: ["G - Goal setting", "E - Environmental control", "S - Self-monitoring"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply metacognitive strategies and self-regulated learning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Mnemonic Devices",
    definition: "Systematic memory techniques (acronyms, acrostics, method of loci, pegword system) that use associations, imagery, and rhythm to enhance encoding and rapid recall of facts.",
    rationalization: "The Method of Loci associates memory items with mental spatial rooms in a familiar building, leveraging human spatial memory to recall long sequences.",
    mnemonic: { title: "Mnemonic Memory Tools", phrase: "Memory Hooks that Lock In Facts", items: ["A - Acronyms & Acrostics", "L - Method of Loci (Memory palace)", "C - Chunking and imagery"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply Information Processing Theory and memory architectures",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Constructivist Classroom vs Traditional Classroom",
    definition: "In a traditional classroom, the curriculum is presented in parts with emphasis on basic skills, teachers strictly transmit facts, and students work alone; in a constructivist classroom, concepts are presented holistically, teachers facilitate inquiry, and students collaborate.",
    rationalization: "Constructivist classrooms validate student questions, encourage peer dialogue, and view errors as valuable cognitive windows into student thinking.",
    mnemonic: { title: "Classroom Paradigms", phrase: "Traditional Transmits; Constructivist Facilitates", items: ["Traditional: Passive rote reception", "Constructivist: Active collaborative inquiry"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Apply the 14 Learner-Centered Psychological Principles in instructional planning",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pygmalion Effect (Rosenthal-Jacobson Study)",
    definition: "The psychological phenomenon where higher expectations placed by teachers on students lead directly to higher student achievement and performance (Self-Fulfilling Prophecy).",
    rationalization: "When teachers genuinely believe students have high intellectual potential, they subconsciously offer warmer emotional support, more challenging questions, and deeper feedback.",
    mnemonic: { title: "Pygmalion Power", phrase: "High Teacher Expectations Foster High Student Achievement", items: ["P - Pygmalion effect", "H - High expectations", "S - Self-fulfilling academic success"] },
    source: "PRC BLEPT ProfEd Facilitating Reviewer",
    tosCompetency: "Evaluate theories of motivation (Self-Determination, Attribution, Expectancy)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  }
];

// Write Facilitating Learner-Centered Teaching
writeDataset(
  'data/profed/facilitating_learner_centered/facilitating_learner_centered.json',
  'Professional Education',
  'Facilitating Learner-Centered Teaching',
  'Cognitivism, Metacognition, ZPD, & Motivation Theories',
  profed2Items
);
