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

// 10. Understanding the Self (50 items)
const selfItems = [
  {
    term: "Socrates: 'An Unexamined Life is Not Worth Living'",
    definition: "The classical philosophical foundation of selfhood stating that true wisdom and happiness begin with rigorous self-knowledge and moral examination ('Know Thyself' / Gnothi Seauton).",
    rationalization: "Socrates proposed a dualistic view of man composed of a mortal, physical body and an immortal, rational soul; genuine virtue requires purifying the soul through intellectual inquiry.",
    mnemonic: { title: "Socrates Self", phrase: "Know Thyself: Examine Your Soul", items: ["S - Socrates", "E - Examined life", "K - Know Thyself (Gnothi Seauton)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Plato: Tripartite Soul",
    definition: "Plato's psychological theory dividing the human soul into three parts: Rational Soul (mind/reason located in the head), Spirited Soul (passion/courage in the chest), and Appetitive Soul (bodily desires/appetites in the belly).",
    rationalization: "In 'The Republic', justice and psychological harmony exist when Reason governs the Appetites with the spirited support of Courage (analogous to a charioteer controlling two horses).",
    mnemonic: { title: "Plato's 3 Souls", phrase: "R-S-A: Reason in Head, Spirit in Chest, Appetite in Belly", items: ["R - Rational (Reason)", "S - Spirited (Passion/Courage)", "A - Appetitive (Physical desires)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Rene Descartes: 'Cogito, Ergo Sum'",
    definition: "Descartes' foundational epistemological principle ('I think, therefore I am') asserting that the act of doubting one's own existence proves the reality of the thinking self.",
    rationalization: "Established Cartesian Mind-Body Dualism: the self is a thinking non-physical substance (res cogitans) distinct from the material machine of the physical body (res extensa).",
    mnemonic: { title: "Descartes Cogito", phrase: "I Think, Therefore I Am (Res Cogitans)", items: ["D - Descartes", "C - Cogito ergo sum", "M - Mind-body dualism"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "John Locke: Tabula Rasa and Consciousness",
    definition: "Locke's empiricist doctrine that the human mind begins as a blank slate (Tabula Rasa) upon which experience writes, and that personal identity is founded on continuity of consciousness and memory over time.",
    rationalization: "Rejected innate ideas; argued that you are the same person as yesterday because you can remember your past experiences and identify with them through consciousness.",
    mnemonic: { title: "Locke Tabula Rasa", phrase: "Blank Slate Formed by Experience and Memory", items: ["J - John Locke", "T - Tabula rasa (Blank slate)", "M - Memory defines identity"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "David Hume: Bundle Theory of Self",
    definition: "The radical skeptical assertion that there is no fixed, permanent, unified 'self', but merely a fluid, ever-changing 'bundle or collection of different perceptions' passing in rapid succession.",
    rationalization: "When Hume looked introspectively inside himself, he only ever encountered specific temporary impressions (heat, cold, joy, pain), never an unchanging 'self' underlying them.",
    mnemonic: { title: "Hume's Bundle", phrase: "No Fixed Self, Only a Bundle of Sensations", items: ["D - David Hume", "B - Bundle theory", "N - No permanent underlying self"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Immanuel Kant: The Synthesizing Self",
    definition: "Kant's philosophical bridge asserting that while we have varied sensory impressions, the human mind possesses an active, transcendental synthesizing ego that unifies all experiences into a coherent self-concept.",
    rationalization: "The self is not just a passive bundle of perceptions; the mind actively organizes sensory chaos using innate categories of space, time, and causality.",
    mnemonic: { title: "Kant Synthesizer", phrase: "Mind Synthesizes and Organizes Experience", items: ["I - Immanuel Kant", "S - Synthesizing self", "A - A priori categories"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Gilbert Ryle: 'Ghost in the Machine' Critique",
    definition: "Ryle's behavioral philosophy rejecting Cartesian dualism as a 'category mistake', arguing that there is no hidden mental 'ghost' inside the physical body machine; the self is how one acts in observable behavior.",
    rationalization: "Published in 'The Concept of Mind' (1949); what we call 'mind' is simply a pattern of physical dispositions and actions in daily life.",
    mnemonic: { title: "Ryle's Ghost Buster", phrase: "No Ghost in the Machine: Self is Behavior", items: ["G - Gilbert Ryle", "B - Behaviorism", "C - Category mistake exposed"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Paul Churchland: Eliminative Materialism",
    definition: "The neurophilosophical perspective asserting that common-sense 'folk psychology' concepts (beliefs, desires, soul, free will) are scientifically false and will be eliminated by neuroscience.",
    rationalization: "The physical brain is all there is; what people historically called 'mind' or 'spirit' is purely electrochemical neuronal activity in the physical brain architecture.",
    mnemonic: { title: "Churchland Brain", phrase: "The Brain IS the Mind", items: ["P - Paul Churchland", "E - Eliminative materialism", "N - Neurobiology replaces soul"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Maurice Merleau-Ponty: The Embodied Self",
    definition: "The phenomenological view asserting that the self is an indivisible, living embodiment where the mind and physical body are inextricably intertwined in everyday sensory perception.",
    rationalization: "Rejects both pure intellectualism and pure mechanistic materialism: we do not merely have a body; we ARE our living body experiencing the world directly.",
    mnemonic: { title: "Merleau-Ponty Embodiment", phrase: "Body and Mind Intertwined as One Living Being", items: ["M - Merleau-Ponty", "E - Embodied phenomenology", "U - Unified body-subject"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze philosophical perspectives on the self and identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "George Herbert Mead: The 'I' and the 'Me'",
    definition: "Mead's social theory of the self where the 'Me' is the socialized, conventional self reflecting society's expectations, and the 'I' is the spontaneous, creative, individual response to that social self.",
    rationalization: "The self develops through social interaction across three distinct stages: Preparatory (imitation), Play (role-taking of significant others), and Game (internalizing the 'Generalized Other').",
    mnemonic: { title: "Mead's I and Me", phrase: "Me is Society's Voice; I is My Spontaneous Choice", items: ["I - Spontaneous, creative self", "Me - Socialized, rule-following self", "G - Generalized Other internalized"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze sociological perspectives on the self and social development",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The Looking-Glass Self (Charles Horton Cooley)",
    definition: "The sociological theory that an individual's self-concept and self-esteem are shaped by imagining how one appears to others, imagining how others judge that appearance, and internalizing those judgments.",
    rationalization: "We see ourselves mirrored in the social reactions of our peers: 'I am not what I think I am, and I am not what you think I am; I am what I think you think I am.'",
    mnemonic: { title: "Looking-Glass Self", phrase: "Society is the Mirror for My Identity", items: ["C - Charles Cooley", "L - Looking-glass mirror", "J - Judgments imagined"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze sociological perspectives on the self and social development",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Egocentric Self vs Sociocentric Self",
    definition: "The egocentric self (characteristic of Western cultures) views the individual as autonomous, distinct, self-contained, and independent; the sociocentric self (collectivist/Asian cultures) views the self as interdependent, context-dependent, and defined by social relations.",
    rationalization: "In sociocentric societies (like the Philippines), personal success and identity are intimately tied to family welfare, community harmony, and social role compliance.",
    mnemonic: { title: "Egocentric vs Sociocentric", phrase: "Egocentric = Independent; Sociocentric = Interdependent", items: ["E - Egocentric: Individual autonomous", "S - Sociocentric: Interdependent collective"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Examine anthropological perspectives on culture and selfhood",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Sigmund Freud: Id, Ego, and Superego",
    definition: "Freud's structural model of personality where the Id operates on the pleasure principle seeking instinctual gratification; the Ego operates on the reality principle as a mediator; and the Superego acts as the moral conscience.",
    rationalization: "Anxiety arises when the Ego is overwhelmed by the clashing demands of the instinctual Id and the punitive Superego, prompting psychological defense mechanisms.",
    mnemonic: { title: "Freud's Personality Triad", phrase: "Id (Desires), Ego (Reality), Superego (Conscience)", items: ["Id - Pleasure principle (Unconscious)", "Ego - Reality principle (Executive)", "Superego - Moral conscience (Rules)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Psychosexual Stages of Development (Freud)",
    definition: "Freud's developmental theory where childhood personality forms as the libido fixates on different erogenous zones: Oral (0-1 yr), Anal (1-3 yrs), Phallic (3-6 yrs), Latency (6-puberty), and Genital (puberty onwards).",
    rationalization: "Fixation occurs if a child is overindulged or frustrated at a stage (e.g., anal retentive personality showing obsessive cleanliness and perfectionism).",
    mnemonic: { title: "Freud's 5 Stages", phrase: "O-A-P-L-G: Oral, Anal, Phallic, Latency, Genital", items: ["O - Oral (Mouth/Sucking)", "A - Anal (Bowel control)", "P - Phallic (Oedipus complex)", "L - Latency (Sublimation)", "G - Genital (Mature sexuality)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "William James: The 'I-Self' and the 'Me-Self'",
    definition: "James's psychological distinction where the 'I-Self' is the pure ego or subjective agent of consciousness (the self as knower), while the 'Me-Self' is the empirical self (the self as known).",
    rationalization: "The 'Me-Self' consists of three sub-components: Material Self (body, clothes, family, home), Social Self (how one is recognized by others), and Spiritual Self (inner core of subjective values).",
    mnemonic: { title: "James Self Duality", phrase: "I = The Knower; Me = The Known", items: ["I-Self - Subjective thinker", "Me-Self - Material, Social, Spiritual"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Carl Rogers: Real Self vs Ideal Self",
    definition: "Rogers' humanistic theory contrasting the Real Self (who an individual actually is based on lived reality) with the Ideal Self (who the person aspires or wishes to be).",
    rationalization: "When a large discrepancy exists between the real and ideal self, the individual experiences Incongruence (maladjustment, neurosis); Congruence brings psychological peace and self-actualization.",
    mnemonic: { title: "Rogers Congruence", phrase: "Align Real Self with Ideal Self", items: ["R - Real Self (Current reality)", "I - Ideal Self (Aspirations)", "C - Congruence brings peace"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Self-Efficacy (Albert Bandura)",
    definition: "An individual's belief in their personal capability to organize and execute the courses of action required to produce given attainments and master new challenges.",
    rationalization: "High self-efficacy fosters resilience, perseverance through setbacks, and lower stress; developed through Mastery Experiences, Vicarious Modeling, Social Persuasion, and Physiological States.",
    mnemonic: { title: "Bandura's Self-Efficacy", phrase: "I Believe I Can Achieve It", items: ["M - Mastery experiences (Past wins)", "V - Vicarious models (Seeing peers win)", "S - Social persuasion (Encouragement)", "P - Physiological state (Calm nerves)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Erik Erikson: Stage 5 - Identity vs Role Confusion",
    definition: "The crucial adolescent stage (ages 12-18) where individuals explore independence, occupational identity, and ideological values to develop a coherent sense of personal self.",
    rationalization: "Failure to establish clear personal identity leads to role confusion, identity crisis, and drifting vulnerability to negative peer pressure.",
    mnemonic: { title: "Adolescent Crisis", phrase: "Identity vs Role Confusion in Teens", items: ["Stage 5 - Adolescence", "Identity formation", "Fidelity is the virtue"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Trace Erikson's 8 psychosocial stages of lifespan development",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Erik Erikson: Stage 6 - Intimacy vs Isolation",
    definition: "The young adulthood stage (ages 18-40) where individuals seek meaningful, mutually committed romantic partnerships, deep friendships, and love.",
    rationalization: "Overcoming fear of vulnerability yields the virtue of Love; avoiding intimacy leads to emotional isolation, loneliness, and depression.",
    mnemonic: { title: "Young Adult Crisis", phrase: "Intimacy vs Isolation in Young Adulthood", items: ["Stage 6 - Young adult", "Commitment & deep love", "Avoid loneliness/isolation"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Trace Erikson's 8 psychosocial stages of lifespan development",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Metacognition (John Flavell)",
    definition: "Higher-order thinking that involves active control over the cognitive processes engaged in learning, commonly defined as 'thinking about one's own thinking'.",
    rationalization: "Comprises Metacognitive Knowledge (person, task, and strategy variables) and Metacognitive Regulation (planning, monitoring, and evaluating one's learning).",
    mnemonic: { title: "Metacognition Formula", phrase: "Think About How You Think", items: ["M - Monitor comprehension", "P - Plan study strategies", "E - Evaluate outcome"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply metacognitive strategies and self-regulated learning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Growth Mindset vs Fixed Mindset (Carol Dweck)",
    definition: "A Growth Mindset views intelligence and abilities as qualities that can be cultivated and developed through effort, good strategies, and learning from failure; a Fixed Mindset views intelligence as static and unchangeable.",
    rationalization: "Students with a growth mindset embrace difficulties as learning opportunities, whereas students with a fixed mindset give up quickly to avoid looking unintelligent.",
    mnemonic: { title: "Dweck's Mindsets", phrase: "Growth = Effort Builds Ability; Fixed = Born with It", items: ["G - Growth: Learn through grit", "F - Fixed: Talent is static", "Y - Power of 'Yet'"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply self-regulation, mindset theories, and stress coping mechanisms",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Problem-Focused Coping vs Emotion-Focused Coping (Lazarus & Folkman)",
    definition: "Problem-focused coping aims to directly alter or eliminate the stressor (e.g., creating a study schedule, resolving conflict); Emotion-focused coping aims to manage and reduce emotional distress caused by the stressor (e.g., meditation, seeking emotional support).",
    rationalization: "Problem-focused coping is most effective when the stressor is controllable; emotion-focused coping is valuable when the stressor is uncontrollable (e.g., terminal illness or sudden loss).",
    mnemonic: { title: "Coping Strategies", phrase: "Problem-Focused Fixes; Emotion-Focused Calms", items: ["P - Problem-focused: Solves the root cause", "E - Emotion-focused: Regulates feelings"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply self-regulation, mindset theories, and stress coping mechanisms",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Self-Regulated Learning (Barry Zimmerman)",
    definition: "The proactive process whereby learners systematically direct their thoughts, feelings, and actions toward the attainment of academic goals across three cyclical phases: Forethought, Performance, and Self-Reflection.",
    rationalization: "Self-regulated students set goals, monitor their attention, adapt study strategies, and reflect objectively on feedback, leading to superior academic success.",
    mnemonic: { title: "Zimmerman's Cycle", phrase: "Plan, Perform, Reflect", items: ["1. Forethought (Goal setting)", "2. Performance (Self-monitoring)", "3. Self-Reflection (Evaluation)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply metacognitive strategies and self-regulated learning",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "The Digital Self and Online Disinhibition Effect",
    definition: "The tendency of people to express themselves more openly, uninhibitedly, and sometimes aggressively online compared to face-to-face interactions, driven by perceived anonymity and invisibility.",
    rationalization: "Coined by John Suler; produces Benign Disinhibition (sharing deep vulnerabilities, acts of kindness) or Toxic Disinhibition (cyberbullying, flaming, hate speech).",
    mnemonic: { title: "Online Disinhibition", phrase: "Behind the Screen, Restraints Disappear", items: ["A - Anonymity online", "B - Benign disinhibition", "T - Toxic cyberbullying"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Examine the digital self, cyber-identity, and social media impacts",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Fear of Missing Out (FOMO)",
    definition: "A pervasive apprehension that others might be having rewarding experiences from which one is absent, characterized by the compulsive desire to continually stay connected via social media.",
    rationalization: "Fuels smartphone addiction, sleep deprivation, and reduced subjective well-being due to constant social comparison with friends' curated highlight reels.",
    mnemonic: { title: "FOMO Clue", phrase: "Anxiety Over Missing Peer Experiences", items: ["F - Fear of missing out", "C - Compulsive checking", "S - Social comparison trap"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Examine the digital self, cyber-identity, and social media impacts",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Body Image and Self-Esteem",
    definition: "Body image is an individual's subjective mental representation, feelings, and attitudes toward their physical body; it directly influences overall self-esteem and mental health.",
    rationalization: "Unrealistic media beauty standards can trigger body dissatisfaction, muscle dysmorphia, or eating disorders (anorexia, bulimia nervosa).",
    mnemonic: { title: "Body Image", phrase: "Subjective Mental View of One's Body", items: ["B - Body perception", "S - Self-esteem connection", "M - Media influence"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze the physical and sexual self, body image, and adolescent changes",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Gender Identity vs Gender Expression vs Sexual Orientation",
    definition: "Gender identity is a person's deeply felt internal sense of being male, female, or another gender; Gender expression is how one presents gender externally through dress and demeanor; Sexual orientation refers to enduring emotional and sexual attraction.",
    rationalization: "Clarified in the SOGIESC framework (Sexual Orientation, Gender Identity, Gender Expression, and Sex Characteristics); distinct dimensions of human identity.",
    mnemonic: { title: "SOGIE Distinctions", phrase: "Identity (Mind), Expression (Style), Orientation (Heart)", items: ["Identity: Who you feel you are", "Expression: How you dress/behave", "Orientation: Who you are attracted to"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze the physical and sexual self, body image, and adolescent changes",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The Material Self (William James)",
    definition: "The component of the empirical self that consists of the physical body, clothing, family, home, and economic possessions with which a person identifies.",
    rationalization: "We invest our personal identity into our belongings; when a cherished possession is destroyed or stolen, a part of our material self feels amputated.",
    mnemonic: { title: "Material Possessions", phrase: "Body, Clothes, Home, Belongings", items: ["M - Material self", "B - Body and clothes", "P - Possessions define status"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Conspicuous Consumption (Thorstein Veblen)",
    definition: "The public spending of money on luxury goods and services primarily for the purpose of displaying wealth, economic power, and social prestige rather than utility.",
    rationalization: "Coined in 'The Theory of the Leisure Class' (1899); prevalent in modern consumerism where brand logos are flashed to validate identity and social status.",
    mnemonic: { title: "Veblen's Conspicuous Spend", phrase: "Buy to Flash Wealth and Status", items: ["C - Conspicuous", "V - Veblen concept", "P - Prestige over utility"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Examine economic self, consumer culture, and material identity",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The Spiritual Self and Animism",
    definition: "The inner, non-physical dimension of the self dealing with purpose, transcendent meaning, sacred values, and indigenous beliefs in spirits (anitos / diwatas) animating nature.",
    rationalization: "Filipino spirituality synthesizes indigenous animist beliefs (respect for spirit realms, 'tabi-tabi po') with Catholic religious piety.",
    mnemonic: { title: "Spiritual Dimension", phrase: "Inner Purpose, Soul, and the Sacred", items: ["S - Spiritual core", "A - Animist roots", "M - Meaning of existence"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze the spiritual self, religion, and indigenous beliefs",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Sikolohiyang Pilipino (Virgilio Enriquez)",
    definition: "The indigenous psychology movement founded by Dr. Virgilio Enriquez ('Ama ng Sikolohiyang Pilipino') based on the genuine experience, culture, and orientation of the Filipino people.",
    rationalization: "Identified 'Kapwa' (shared inner self / shared identity) as the core value of Filipino psychology, rejecting foreign Western psychological constructs that alienated native culture.",
    mnemonic: { title: "Kapwa Core Value", phrase: "Enriquez = Kapwa Shared Inner Self", items: ["V - Virgilio Enriquez", "K - Kapwa (Shared identity)", "S - Sikolohiyang Pilipino"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze indigenous Filipino values and ethics (Sikolohiyang Pilipino)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Kapwa: Ibang-Tao vs Hindi-Ibang-Tao",
    definition: "The two structural categories of social interaction in Sikolohiyang Pilipino: Ibang-Tao (outsider: pakikitungo, pakikisalamuha, pakikibagay) and Hindi-Ibang-Tao (one-of-us: pakikipagpalagayang-loob, pakikiisa).",
    rationalization: "Pakikiisa (being one with others in total trust and shared destiny) represents the highest, deepest level of interpersonal relationship in Filipino culture.",
    mnemonic: { title: "Levels of Interpersonal Ties", phrase: "Pakikitungo (Civility) to Pakikiisa (Oneness)", items: ["I - Ibang-Tao: Outsiders", "H - Hindi-Ibang-Tao: Insiders", "P - Pakikiisa: Highest unity"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze indigenous Filipino values and ethics (Sikolohiyang Pilipino)",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pakikiramdam (Shared Inner Perception)",
    definition: "The pivotal interpersonal value in Sikolohiyang Pilipino referring to heightened emotional sensitivity, feeling for another, and unexpressed intuition that guides social interactions.",
    rationalization: "Acts as the internal emotional sensor allowing Filipinos to navigate social relationships smoothly without causing embarrassment or hiya.",
    mnemonic: { title: "Pakikiramdam Radar", phrase: "Emotional Radar to Sense Another's Heart", items: ["P - Pakikiramdam", "S - Shared perception", "I - Intuitive empathy"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze indigenous Filipino values and ethics (Sikolohiyang Pilipino)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Bahala Na (Enriquez Reinterpretation)",
    definition: "The traditional Filipino cultural value reinterpreted by Virgilio Enriquez not as fatalistic resignation, but as courageous determination in the face of uncertainty ('fatalistic determination').",
    rationalization: "Originates from 'Bathala na' (trust in God); gives the Filipino inner strength to confront immense danger and take risks after doing everything humanly possible.",
    mnemonic: { title: "Bahala Na Courage", phrase: "Courage to Face the Unknown with Faith", items: ["B - Bahala na", "C - Courageous determination", "F - Faith under adversity"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze indigenous Filipino values and ethics (Sikolohiyang Pilipino)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Hiya (Sense of Propriety)",
    definition: "The Filipino social value reinterpreted by Sikolohiyang Pilipino not merely as Western 'shame', but as a profound sense of propriety, dignity, and respectful delicacy toward others.",
    rationalization: "Distinguishes between 'may hiya' (having good manners and dignity) versus 'walang hiya' (shameless, disrespectful person lacking moral decency).",
    mnemonic: { title: "Hiya Meaning", phrase: "Dignified Propriety, Not Mere Shame", items: ["H - Hiya", "P - Propriety & decency", "D - Dignity in social conduct"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze indigenous Filipino values and ethics (Sikolohiyang Pilipino)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Self-Concept vs Self-Esteem",
    definition: "Self-concept is the cognitive description and mental picture of who one is (e.g., 'I am a teacher, I am tall'); Self-esteem is the emotional and evaluative judgment of one's worth (e.g., 'I feel proud of who I am').",
    rationalization: "Self-concept is descriptive knowledge about self; self-esteem is the emotional value placed on that self-concept.",
    mnemonic: { title: "Concept vs Esteem", phrase: "Self-Concept = Description; Self-Esteem = Value", items: ["Concept: Cognitive 'Who I am'", "Esteem: Evaluative 'How I value myself'"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Locus of Control (Julian Rotter)",
    definition: "The psychological belief regarding the degree of control one has over events in one's life, divided into Internal (believing outcomes stem from one's own efforts) and External (believing outcomes stem from luck, fate, or others).",
    rationalization: "Individuals with an internal locus of control exhibit higher academic achievement, healthier lifestyle choices, and proactive stress management.",
    mnemonic: { title: "Locus of Control", phrase: "Internal = In My Hands; External = In Fate's Hands", items: ["I - Internal: My choices decide", "E - External: Luck/others decide"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply self-regulation, mindset theories, and stress coping mechanisms",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Johari Window (Luft and Ingham)",
    definition: "A psychological model of interpersonal awareness mapping knowledge about oneself across four quadrants: Open/Arena, Blind Spot, Hidden/Façade, and Unknown.",
    rationalization: "Open area is known to self and others; Blind spot is known to others but unknown to self; Hidden area is known to self but concealed from others; Unknown is known to neither.",
    mnemonic: { title: "Johari 4 Panes", phrase: "Open, Blind, Hidden, Unknown", items: ["O - Open (Both know)", "B - Blind (Others only)", "H - Hidden (Self only)", "U - Unknown (Neither knows)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze interpersonal awareness models and self-disclosure",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Dunning-Kruger Effect",
    definition: "A cognitive bias where people with low ability at a task overestimate their competence, while experts tend to underestimate their relative ability.",
    rationalization: "Incompetent individuals lack the very metacognitive skill needed to recognize their own errors and ignorance.",
    mnemonic: { title: "Dunning-Kruger Bias", phrase: "Ignorance Breeds False Confidence", items: ["D - Dunning-Kruger", "O - Overestimate low skill", "M - Metacognitive blindness"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply metacognitive strategies and self-regulated learning",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Maslow's Hierarchy of Needs: Self-Actualization",
    definition: "Abraham Maslow's theory that human motivation progresses upward from physiological needs to safety, love/belonging, esteem, and finally Self-Actualization (realizing one's highest personal potential).",
    rationalization: "Self-actualized individuals exhibit accurate reality perception, spontaneity, autonomy, democratic character, and frequent 'peak experiences'.",
    mnemonic: { title: "Maslow Pyramid", phrase: "Physiological, Safety, Love, Esteem, Self-Actualization", items: ["P - Physiological", "S - Safety", "L - Love/Belonging", "E - Esteem", "S - Self-Actualization (Peak)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze humanistic psychology and motivation theories",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Carl Jung: Persona and Shadow",
    definition: "Jungian archetypes where the Persona is the public social mask presented to the world, and the Shadow is the repressed, dark, unconscious part of personality containing primitive instincts and denied impulses.",
    rationalization: "Psychological wholeness (Individuation) requires confronting and integrating the Shadow rather than repressing or projecting it onto other people.",
    mnemonic: { title: "Jung's Masks", phrase: "Persona is the Social Mask; Shadow is the Hidden Darkness", items: ["P - Persona (Public face)", "S - Shadow (Repressed traits)", "I - Individuation (Integration)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychoanalytic and analytical psychology perspectives on the self",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Carl Jung: Anima and Animus",
    definition: "The Jungian archetypes representing the unconscious opposite-gender component within every psyche: the Anima is the feminine archetype in a man, and the Animus is the masculine archetype in a woman.",
    rationalization: "Guides how individuals project romantic ideals onto partners and achieve inner balance by integrating both masculine and feminine psychological qualities.",
    mnemonic: { title: "Anima and Animus", phrase: "Anima in Men; Animus in Women", items: ["Anima: Female soul in man", "Animus: Male soul in woman", "Inner balance"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychoanalytic and analytical psychology perspectives on the self",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Emotional Intelligence (Daniel Goleman)",
    definition: "The capacity to recognize our own feelings and those of others, motivate ourselves, and effectively manage emotions in ourselves and in relationships.",
    rationalization: "Identified five key competencies: Self-Awareness, Self-Regulation, Internal Motivation, Empathy, and Social Skills; proven to be a stronger predictor of life success than traditional IQ.",
    mnemonic: { title: "Goleman's 5 EQ Pillars", phrase: "Self-Awareness, Self-Regulation, Motivation, Empathy, Social Skills", items: ["1. Self-Awareness", "2. Self-Regulation", "3. Motivation", "4. Empathy", "5. Social Skills"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply emotional intelligence and social-emotional competencies",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Impression Management (Erving Goffman)",
    definition: "The conscious or subconscious process in sociological dramaturgical theory where people attempt to influence the perceptions of others by regulating information in social interaction.",
    rationalization: "Goffman divided human behavior into 'Front Stage' (performance for an audience adhering to social etiquette) and 'Back Stage' (private area where actors drop their roles and relax).",
    mnemonic: { title: "Goffman's Theater", phrase: "Front Stage Performance vs Back Stage Reality", items: ["E - Erving Goffman", "F - Front stage persona", "B - Back stage authenticity"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze sociological perspectives on the self and social development",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Psychological Resilience",
    definition: "The mental capacity to successfully adapt to adversity, trauma, tragedy, threats, or significant sources of stress, 'bouncing back' from difficult life experiences.",
    rationalization: "Fostered by strong social support, realistic goal planning, emotional regulation, and an optimistic growth mindset.",
    mnemonic: { title: "Resilience Bounce", phrase: "Bouncing Back Stronger from Adversity", items: ["R - Resilience", "B - Bounce back capacity", "A - Adaptation under stress"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply self-regulation, mindset theories, and stress coping mechanisms",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Triarchic Theory of Love (Robert Sternberg)",
    definition: "The psychological model identifying three components of romantic love: Intimacy (emotional closeness), Passion (physical attraction/drive), and Commitment (cognitive decision to stay together).",
    rationalization: "Consummate Love is the complete, ideal form of love that successfully balances all three components; romantic love is intimacy + passion without commitment.",
    mnemonic: { title: "Sternberg's Love Triangle", phrase: "Intimacy, Passion, Commitment", items: ["I - Intimacy (Closeness)", "P - Passion (Physical attraction)", "C - Commitment (Decision)"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze the physical and sexual self, body image, and adolescent changes",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Attribution Theory: Fundamental Attribution Error (Fritz Heider)",
    definition: "The cognitive bias where observers attribute other people's negative behaviors to internal personal character flaws while attributing their own mistakes to external situational factors.",
    rationalization: "When someone cuts us off in traffic, we assume they are a reckless jerk (internal); when we cut someone off, we excuse it because we are rushing an emergency (situational).",
    mnemonic: { title: "Fundamental Attribution Error", phrase: "Blame Their Character, Excuse My Situation", items: ["F - Fundamental error", "I - Internal blame for others", "E - External excuses for self"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Cognitive Dissonance (Leon Festinger)",
    definition: "The psychological discomfort and tension experienced by an individual who holds two conflicting beliefs, or when their behavior directly clashes with their values.",
    rationalization: "Individuals are driven to reduce dissonance by changing their attitude, rationalizing the action, or acquiring new beliefs to justify the contradiction.",
    mnemonic: { title: "Dissonance Tension", phrase: "Tension Between Belief and Action", items: ["C - Cognitive dissonance", "T - Tension reduction", "R - Rationalizing behavior"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze psychological perspectives and theories of personality",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Self-Actualizing Tendency",
    definition: "The innate human drive recognized by humanistic psychologist Carl Rogers to develop all one's capacities in ways that serve to maintain, enhance, and fulfill the organism.",
    rationalization: "Occurs naturally when an individual is provided with a supportive environment featuring unconditional positive regard, empathy, and authenticity.",
    mnemonic: { title: "Rogers Growth Drive", phrase: "Innate Drive to Bloom and Flourish", items: ["S - Self-actualizing tendency", "U - Unconditional positive regard", "B - Becoming a fully functioning person"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Analyze humanistic psychology and motivation theories",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Gratitude and Well-Being in Positive Psychology",
    definition: "The conscious practice of recognizing and appreciating positive experiences, benefits, and support received, proven to enhance neurotransmitters (dopamine and serotonin) and life satisfaction.",
    rationalization: "Pioneered by Martin Seligman in the PERMA model of flourishing; keeping a daily gratitude journal lowers depressive symptoms and strengthens personal relationships.",
    mnemonic: { title: "Gratitude Practice", phrase: "Count Your Blessings, Rewire Your Brain", items: ["G - Gratitude", "P - Positive psychology", "S - Seligman's PERMA model"] },
    source: "PRC BLEPT GenEd Self Reviewer",
    tosCompetency: "Apply self-regulation, mindset theories, and stress coping mechanisms",
    bloomsTaxonomy: "Applying",
    highYield: true
  }
];

// Write Understanding the Self
writeDataset(
  'data/gened/understanding_self/understanding_self.json',
  'General Education',
  'Understanding the Self',
  'Philosophical, Sociological, & Psychological Dimensions of Selfhood',
  selfItems
);
