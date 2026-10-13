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

// 8. The Contemporary World (50 items)
const contemporaryWorldItems = [
  {
    term: "Globalization (Manfred Steger)",
    definition: "The expansion and intensification of social relations and consciousness across world-time and world-space, characterized by multidimensional economic, political, cultural, and ecological flows.",
    rationalization: "Steger differentiates between 'Globality' (a social condition of interconnectedness), 'Globalism' (ideology), and 'Globalization' (the dynamic ongoing process).",
    mnemonic: { title: "Steger's Triad", phrase: "Globality (Condition), Globalism (Ideology), Globalization (Process)", items: ["Globality: End state", "Globalism: Ideological vision", "Globalization: Active expansion"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze concepts, definitions, and dimensions of globalization",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Hyperglobalist Perspective",
    definition: "The perspective viewing globalization as a revolutionary epoch that dissolves national borders, resulting in a borderless global marketplace and the decline of the nation-state.",
    rationalization: "Pioneered by Kenichi Ohmae; argues that global economic forces, multinational corporations, and capital mobility supersede domestic government control.",
    mnemonic: { title: "Hyperglobalists", phrase: "Borderless World, Nation-State Dies", items: ["H - Hyperglobalist", "B - Borderless world", "D - Demise of state borders"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Compare three perspectives on globalization (Hyperglobalist, Skeptic, Transformationalist)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Skeptic Perspective on Globalization",
    definition: "The view arguing that globalization is exaggerated, asserting that current international trade is primarily 'regionalization' among advanced blocs rather than truly global, and that the nation-state remains supreme.",
    rationalization: "Held by Paul Hirst and Grahame Thompson; note that trade is heavily concentrated in North America, Europe, and East Asia, and states still regulate borders, militaries, and passports.",
    mnemonic: { title: "Skeptics on Globalism", phrase: "Regionalization, Not True Globalization", items: ["S - Skeptic", "R - Regional blocs dominate", "S - State remains powerful"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Compare three perspectives on globalization (Hyperglobalist, Skeptic, Transformationalist)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Transformationalist Perspective",
    definition: "The perspective asserting that globalization is an unprecedented, complex, and contradictory historical driving force that is actively transforming state power, rather than simply destroying or preserving it.",
    rationalization: "Proposed by David Held and Anthony Giddens; emphasizes that states are adapting to new global networks, creating both fragmentation and integration simultaneously.",
    mnemonic: { title: "Transformationalists", phrase: "Transforming State Power Unprecedentedly", items: ["T - Transformationalist", "A - Adapting states", "U - Unprecedented complexity"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Compare three perspectives on globalization (Hyperglobalist, Skeptic, Transformationalist)",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Bretton Woods Conference (1944)",
    definition: "The historic gathering of 44 Allied nations in New Hampshire that established the post-WWII international monetary order, creating the International Monetary Fund (IMF) and the World Bank.",
    rationalization: "Pegged world currencies to the US dollar, which was in turn convertible to gold at $35 per ounce, establishing American economic hegemony until Nixon ended gold convertibility in 1971.",
    mnemonic: { title: "Bretton Woods Twin", phrase: "Bretton Woods Built the IMF and World Bank", items: ["1944 - Year held", "IMF - Balance of payments stabilizer", "World Bank - Reconstruction & development"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the history of global economic institutions and monetary regimes",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "International Monetary Fund (IMF)",
    definition: "An international financial institution that oversees the global financial system, provides emergency loans to member nations facing balance-of-payments crises, and stabilizes exchange rates.",
    rationalization: "Often criticized by Global South nations for imposing strict Structural Adjustment Programs (SAPs) mandating cuts in public health and education budgets.",
    mnemonic: { title: "IMF Mission", phrase: "Emergency Lender for Balance-of-Payments Crises", items: ["I - International Monetary Fund", "E - Emergency balance-of-payments loans", "S - Structural adjustments"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the history of global economic institutions and monetary regimes",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "World Bank (IBRD)",
    definition: "An international development bank established to finance long-term development projects, poverty reduction programs, and major infrastructure in developing countries.",
    rationalization: "Comprises the International Bank for Reconstruction and Development (IBRD) and the International Development Association (IDA); focuses on dams, highways, energy, and school construction.",
    mnemonic: { title: "World Bank Goal", phrase: "Funds Long-Term Infrastructure and Development", items: ["W - World Bank", "I - Infrastructure financing", "D - Development loans"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the history of global economic institutions and monetary regimes",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "World Trade Organization (WTO / 1995)",
    definition: "The intergovernmental body that regulates and enforces international trade rules, reduces tariffs, and mediates cross-border trade disputes, replacing the GATT.",
    rationalization: "Headquartered in Geneva, Switzerland; established on January 1, 1995 under the 1994 Marrakesh Agreement, replacing the General Agreement on Tariffs and Trade (GATT).",
    mnemonic: { title: "WTO Launch", phrase: "GATT Transformed into WTO in 1995", items: ["W - WTO", "1995 - Established", "M - Marrakesh Agreement"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the history of global economic institutions and monetary regimes",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Neoliberalism (Washington Consensus)",
    definition: "An economic doctrine advocating free-market capitalism, deregulation, privatization of state-owned enterprises, reduction of government spending, and elimination of trade tariffs.",
    rationalization: "Pioneered by Milton Friedman, Ronald Reagan, and Margaret Thatcher; coined by John Williamson in 1989 as the 'Washington Consensus' enforced by the IMF and World Bank.",
    mnemonic: { title: "Neoliberal Pillars", phrase: "Privatize, Deregulate, Free Trade", items: ["P - Privatization", "D - Deregulation", "A - Austerity spending cuts"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Evaluate economic systems, neoliberalism, and Washington Consensus",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Global North vs Global South",
    definition: "The socio-economic and political divide separating wealthy, technologically advanced, industrialized nations (Global North) from developing, post-colonial, economically marginalized nations (Global South).",
    rationalization: "Not strictly geographic (e.g., Australia and New Zealand are in the Southern Hemisphere but belong economically to the Global North); replaced the outdated 'First/Third World' terminology.",
    mnemonic: { title: "North-South Distinction", phrase: "Socio-Economic Inequality, Not Pure Latitude", items: ["North: Wealthy/Core states", "South: Developing/Post-colonial", "Brandt Line: Visual divide"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the Global North vs Global South divide and dependency theory",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "The Brandt Line (1980)",
    definition: "A visual line proposed by former German Chancellor Willy Brandt encircling the globe at roughly 30° North latitude to represent the economic divide between the rich North and the poor South.",
    rationalization: "Dips south around Australia and New Zealand to group them with the Global North, illustrating the economic nature of the classification.",
    mnemonic: { title: "Brandt Line Clue", phrase: "Dividing Line of Global Wealth", items: ["B - Brandt line", "1980 - Commission report", "N - North vs South visualizer"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the Global North vs Global South divide and dependency theory",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Dependency Theory (Raul Prebisch)",
    definition: "The economic theory arguing that resources flow from a 'periphery' of poor and underdeveloped states to a 'core' of wealthy states, enriching the latter at the expense of the former.",
    rationalization: "Developed in Latin America; asserts that the international trade system locks developing nations into supplying cheap raw materials while importing expensive manufactured goods (unequal exchange).",
    mnemonic: { title: "Dependency Core-Periphery", phrase: "Periphery Exploited to Enrich the Core", items: ["D - Dependency", "C - Core nations exploit", "P - Periphery stays poor"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the Global North vs Global South divide and dependency theory",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "World Systems Theory (Immanuel Wallerstein)",
    definition: "The macro-sociological theory that divides the capitalist world-economy into three structural tiers: Core, Semi-Periphery, and Periphery.",
    rationalization: "Core nations (USA, Japan, Germany) dominate high-tech capital and exploit; Periphery nations (resource extractors) supply raw goods; Semi-Periphery nations (Brazil, South Africa, India) buffer the system.",
    mnemonic: { title: "Wallerstein's Three Tiers", phrase: "Core, Semi-Periphery, Periphery", items: ["C - Core (High-skill, dominant)", "S - Semi-periphery (Intermediate)", "P - Periphery (Low-skill, exploited)"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the Global North vs Global South divide and dependency theory",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Modernization Theory (Walt Rostow)",
    definition: "The developmental theory proposing that all societies progress through five linear stages of economic growth to achieve modernization: Traditional Society, Preconditions, Take-off, Drive to Maturity, and High Mass Consumption.",
    rationalization: "Assumes developing nations simply need capital investment and Western institutions to 'take off'; critiqued by Dependency theorists for ignoring colonialism and global trade exploitation.",
    mnemonic: { title: "Rostow's 5 Stages", phrase: "Traditional -> Take-off -> High Mass Consumption", items: ["1. Traditional", "2. Preconditions", "3. Take-off", "4. Drive to maturity", "5. High mass consumption"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the Global North vs Global South divide and dependency theory",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "ASEAN (Bangkok Declaration, August 8, 1967)",
    definition: "The regional intergovernmental organization established in Bangkok by Indonesia, Malaysia, the Philippines, Singapore, and Thailand to accelerate economic growth and regional peace.",
    rationalization: "Later expanded to 10 Southeast Asian nations (adding Brunei, Vietnam, Laos, Myanmar, and Cambodia); operates under the principle of non-interference and consensus.",
    mnemonic: { title: "Five ASEAN Founders", phrase: "IMS-PT: Indonesia, Malaysia, Singapore, Philippines, Thailand", items: ["I - Indonesia", "M - Malaysia", "S - Singapore", "P - Philippines", "T - Thailand"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine regionalism and the ASEAN community pillars",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "The ASEAN Way",
    definition: "The distinct diplomatic culture and decision-making norm of ASEAN emphasizing quiet diplomacy, informality, non-confrontational dialogue, consensus (musyawarah), and strict non-interference in internal affairs.",
    rationalization: "Ensured regional peace among diverse political systems, but criticized by human rights advocates for hampering collective action during political crises (e.g., Myanmar junta).",
    mnemonic: { title: "ASEAN Way Principles", phrase: "Consensus and Non-Interference", items: ["C - Consensus decision-making", "N - Non-interference", "I - Informal quiet diplomacy"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine regionalism and the ASEAN community pillars",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Three Pillars of the ASEAN Community",
    definition: "The structural pillars established under the ASEAN Charter: ASEAN Political-Security Community (APSC), ASEAN Economic Community (AEC), and ASEAN Socio-Cultural Community (ASCC).",
    rationalization: "Formally launched in 2015 to create a single market and production base with free flow of goods, services, investment, and skilled labor across Southeast Asia.",
    mnemonic: { title: "ASEAN Pillars", phrase: "Political-Security, Economic, Socio-Cultural", items: ["A - APSC (Security)", "A - AEC (Economic market)", "A - ASCC (Socio-cultural identity)"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine regionalism and the ASEAN community pillars",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "United Nations (October 24, 1945)",
    definition: "The premier global intergovernmental organization founded in San Francisco after WWII by 51 nations to maintain international peace and security, foster human rights, and promote sustainable development.",
    rationalization: "Replaced the ineffective League of Nations; headquartered in New York City with universal sovereign state representation.",
    mnemonic: { title: "UN Founding", phrase: "Oct 24, 1945: San Francisco Charter", items: ["Oct 24, 1945 - UN Day", "51 - Original signers", "N - New York headquarters"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the United Nations system and global governance organs",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "UN Security Council (UNSC) Permanent Five (P5)",
    definition: "The five permanent members of the UN Security Council holding veto power over substantive resolutions: United States, United Kingdom, France, Russia, and China.",
    rationalization: "A single negative vote ('veto') from any one of the P5 blocks a resolution, even if supported by all other 14 members, frequently paralyzing UN action during geopolitical conflicts.",
    mnemonic: { title: "UN P5 Powers", phrase: "FRUCK: France, Russia, USA, China, UK", items: ["F - France", "R - Russia", "U - USA", "C - China", "K - UK"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the United Nations system and global governance organs",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "International Court of Justice (ICJ)",
    definition: "The principal judicial organ of the United Nations located at the Peace Palace in The Hague, Netherlands, resolving legal disputes between sovereign states.",
    rationalization: "Contrasts with the International Criminal Court (ICC), which prosecutes individual persons for war crimes, genocide, and crimes against humanity; the ICJ hears cases strictly between states.",
    mnemonic: { title: "ICJ vs ICC", phrase: "ICJ = State vs State; ICC = Individual Criminals", items: ["ICJ - State disputes (The Hague)", "ICC - Individual war criminals"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the United Nations system and global governance organs",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Sustainable Development Goals (SDGs 2030 Agenda)",
    definition: "The 17 universal global goals adopted by all 193 UN member states in 2015 to end poverty, protect the planet, and ensure peace and prosperity for all by 2030.",
    rationalization: "Succeeded the Millennium Development Goals (MDGs 2000-2015); encompasses Goal 1 (No Poverty), Goal 4 (Quality Education), Goal 5 (Gender Equality), and Goal 13 (Climate Action).",
    mnemonic: { title: "17 SDGs", phrase: "17 Goals for People, Planet, and Prosperity by 2030", items: ["17 Goals", "2030 Target year", "Universal coverage"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine the UN Sustainable Development Goals (SDGs)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "SDG Goal 4: Quality Education",
    definition: "The UN Sustainable Development Goal that aims to 'ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'",
    rationalization: "Directly relevant to professional teachers; targets free, equitable primary and secondary schooling, technical vocational training, and gender equality in literacy.",
    mnemonic: { title: "SDG 4 Education", phrase: "Goal 4 = Quality Education for All", items: ["4 - SDG number", "Q - Quality education", "L - Lifelong learning"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine the UN Sustainable Development Goals (SDGs)",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Malthusian Theory of Population (Thomas Malthus)",
    definition: "The demographic theory asserting that human population grows exponentially/geometrically (1, 2, 4, 8, 16...) while food production increases only arithmetically (1, 2, 3, 4, 5...).",
    rationalization: "Predicted that unchecked reproduction leads to a 'Malthusian Catastrophe' (famine, plague, war); disproved by the agricultural Green Revolution and synthetic fertilizers.",
    mnemonic: { title: "Malthus Trap", phrase: "Population Geometric, Food Arithmetic", items: ["P - Population: Exponential", "F - Food: Linear/Arithmetic", "C - Catastrophe check"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze global demography, migration, and population theories",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Demographic Transition Theory (DTT)",
    definition: "The demographic model illustrating the shift of societies from high birth and death rates to low birth and death rates through four economic development stages.",
    rationalization: "Stage 1: High birth and death rates (Pre-industrial); Stage 2: Rapid growth (death rate drops due to sanitation/medicine); Stage 3: Birth rate drops (urbanization/contraception); Stage 4: Low birth and death rates (Stable).",
    mnemonic: { title: "DTT Four Stages", phrase: "Stage 1 (High/High) -> Stage 2 (Boom) -> Stage 3 (Drop) -> Stage 4 (Low/Low)", items: ["1. High stationary", "2. Early expanding", "3. Late expanding", "4. Low stationary"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze global demography, migration, and population theories",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Push-Pull Factors in Migration",
    definition: "Push factors are adverse domestic conditions that compel people to leave their homeland (war, poverty, drought, persecution); Pull factors are attractive conditions in destination countries that draw immigrants (jobs, safety, freedom).",
    rationalization: "The primary driver of modern international migration flows, including Overseas Filipino Workers (OFWs) seeking higher wages abroad.",
    mnemonic: { title: "Push vs Pull", phrase: "Push Drives You Out; Pull Attracts You In", items: ["Push: Poverty, war, tyranny", "Pull: Higher wages, liberty, stability"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze global demography, migration, and population theories",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Brain Drain vs Brain Gain",
    definition: "Brain drain is the large-scale emigration of highly trained, skilled professionals (doctors, engineers, teachers) from developing nations; Brain gain is the influx of talent into destination host nations.",
    rationalization: "The Philippines experiences severe brain drain in nursing and education as professionals seek lucrative compensation in North America, Europe, and the Middle East.",
    mnemonic: { title: "Brain Drain Clue", phrase: "Losing Talented Minds Abroad", items: ["D - Drain: Origin country loses experts", "G - Gain: Host nation absorbs talent"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze global demography, migration, and population theories",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Transnationalism",
    definition: "The process by which immigrants forge and sustain multi-stranded social, economic, and political relations linking together their societies of origin and settlement.",
    rationalization: "OFWs who send remittances, vote in absentee elections, watch Filipino television channels, and maintain active daily contact via video calls exemplify transnational citizens.",
    mnemonic: { title: "Transnational Ties", phrase: "Feet in Host Country, Heart in Motherland", items: ["T - Transnationalism", "D - Dual connection", "R - Remittance flows"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze global demography, migration, and population theories",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Arjun Appadurai's Five Global 'Scapes'",
    definition: "The theoretical framework conceptualizing global cultural flows across five dimensions: Ethnoscapes (people), Technoscapes (technology), Financescapes (capital), Mediascapes (images/info), and Ideoscapes (political ideologies).",
    rationalization: "Demonstrates that cultural globalization is fluid, non-isomorphic, and uneven rather than a simple one-way Western imposition.",
    mnemonic: { title: "Appadurai's 5 Scapes", phrase: "E-T-F-M-I: People, Tech, Money, Media, Ideas", items: ["E - Ethnoscapes (tourists, migrants)", "T - Technoscapes (hardware/software)", "F - Financescapes (global cash)", "M - Mediascapes (films, news)", "I - Ideoscapes (democracy, human rights)"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze cultural globalization, media scapes, and glocalization",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "McDonaldization (George Ritzer)",
    definition: "The sociological process by which the principles of the fast-food restaurant come to dominate more and more sectors of American society as well as the rest of the world.",
    rationalization: "Four core operational dimensions: Efficiency (fastest route), Calculability (quantity over quality), Predictability (identical experience everywhere), and Control through non-human technology.",
    mnemonic: { title: "Ritzer's 4 Dimensions", phrase: "E-C-P-C: Efficiency, Calculability, Predictability, Control", items: ["E - Efficiency", "C - Calculability", "P - Predictability", "C - Control"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze cultural globalization, media scapes, and glocalization",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Glocalization (Roland Robertson)",
    definition: "The adaptation and customization of international global products, ideas, or media to fit local cultural tastes, traditions, and market preferences.",
    rationalization: "Blend of 'globalization' and 'localization'. Example: McDonald's offering McSpaghetti and Chicken with Rice in the Philippines, or Teriyaki burgers in Japan.",
    mnemonic: { title: "Glocalization Concept", phrase: "Think Globally, Customize Locally", items: ["G - Global product", "L - Local adaptation", "M - McSpaghetti in PH"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze cultural globalization, media scapes, and glocalization",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Cultural Homogenization vs Heterogenization",
    definition: "Homogenization is the reduction in cultural diversity as local cultures are subsumed by dominant Western popular culture ('Americanization'); Heterogenization is the hybridization and emergence of new diverse cultural expressions.",
    rationalization: "Scholars debate whether the world is becoming culturally monolithic or creatively generating syncretic hybrid forms (like K-Pop, anime, or fusion cuisine).",
    mnemonic: { title: "Culture Clashing", phrase: "Homogenize = Monolithic; Heterogenize = Hybrid", items: ["Homogenization: Cultural uniformity", "Heterogenization: Creative diversity"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze cultural globalization, media scapes, and glocalization",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Westphalian Peace Treaty (1648)",
    definition: "The peace accords ending the Thirty Years' War in Europe that established the modern international state system based on national sovereignty, territorial integrity, and non-interference.",
    rationalization: "Established the fundamental legal principle that sovereign states have exclusive authority over their own territory and domestic religious laws.",
    mnemonic: { title: "Westphalian Sovereignty", phrase: "1648: Birth of the Sovereign Nation-State", items: ["1648 - Treaty of Westphalia", "S - Sovereign borders", "N - Non-interference principle"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the evolution of the interstate system from Westphalia to modern day",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Nation vs State",
    definition: "A Nation is a cultural and psychological community of people bound by common language, history, and identity; a State is a political entity with four elements: people, territory, government, and sovereignty.",
    rationalization: "A nation-state merges both (e.g., Japan); a stateless nation is a cultural group without sovereign territory (e.g., Kurds, Palestinians).",
    mnemonic: { title: "Nation vs State", phrase: "Nation = Cultural People; State = Sovereign Territory", items: ["Nation: Shared cultural identity", "State: People, Territory, Government, Sovereignty"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the evolution of the interstate system from Westphalia to modern day",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Four Elements of a State",
    definition: "The four essential legal elements required for statehood in international law: Population (people), Territory, Government, and Sovereignty.",
    rationalization: "Codified in the Montevideo Convention on the Rights and Duties of States (1933); sovereignty has two aspects: internal (control inside) and external (independence from foreign rule).",
    mnemonic: { title: "State Elements", phrase: "P-T-G-S: People, Territory, Government, Sovereignty", items: ["P - Population", "T - Territory", "G - Government", "S - Sovereignty"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Trace the evolution of the interstate system from Westphalia to modern day",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Multinational Corporation (MNC) / Transnational Corporation (TNC)",
    definition: "A corporate enterprise that owns or controls facilities, assets, and production in at least one country other than its home country.",
    rationalization: "Drives foreign direct investment (FDI) and global supply chains, but often criticized for tax avoidance, environmental dumping, and exploiting cheap sweatshop labor in developing nations.",
    mnemonic: { title: "MNC Power", phrase: "Global Production Across Multiple Borders", items: ["M - Multinational", "F - Foreign direct investment", "G - Global supply chain"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine multinational corporations and global commodity chains",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Race to the Bottom",
    definition: "The socio-economic phenomenon where governments deregulate the business environment, slash corporate taxes, suppress labor wages, and weaken environmental laws to attract multinational investment.",
    rationalization: "Developing countries compete against each other to offer the cheapest, most permissive conditions, eroding worker protections and ecological standards.",
    mnemonic: { title: "Race to the Bottom", phrase: "Slashing Protections to Attract Foreign Capital", items: ["R - Race to bottom", "W - Weakened environmental rules", "L - Lowered labor standards"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine multinational corporations and global commodity chains",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Global City (Saskia Sassen)",
    definition: "A strategic urban center that serves as a primary hub of global finance, corporate headquarters, international trade, and specialized legal and accounting services.",
    rationalization: "Coined by sociologist Saskia Sassen (1991); classic top global cities include New York, London, and Tokyo ('The Global Triad'), commanding global capital flows.",
    mnemonic: { title: "Sassen's Global Cities", phrase: "Command Hubs of the Global Economy", items: ["S - Saskia Sassen", "N - New York, London, Tokyo", "C - Command centers of finance"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze the role and characteristics of global cities",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Offshoring and Business Process Outsourcing (BPO)",
    definition: "The relocation of business operational processes and services (customer support, IT, payroll) from one country to another, where labor costs are significantly lower.",
    rationalization: "The Philippines is recognized globally as the 'BPO Capital of the World' for voice-based call centers, driven by high English proficiency and cultural empathy.",
    mnemonic: { title: "BPO in the Philippines", phrase: "Call Center Capital of the World", items: ["B - BPO", "O - Offshoring voice services", "E - English proficiency advantage"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine multinational corporations and global commodity chains",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Universal Declaration of Human Rights (UDHR / 1948)",
    definition: "The foundational international human rights manifesto proclaimed by the UN General Assembly in Paris on December 10, 1948, establishing 30 articles of inalienable rights for all people.",
    rationalization: "Chaired by Eleanor Roosevelt; drafted in response to the atrocities of the Holocaust to assert that all human beings are born free and equal in dignity and rights.",
    mnemonic: { title: "UDHR Launch", phrase: "Dec 10, 1948: 30 Articles of Human Rights", items: ["Dec 10, 1948 - Human Rights Day", "30 Articles", "Universal inalienable dignity"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze international human rights law and global governance",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Religious Fundamentalism in the Global Era",
    definition: "A modern religious movement that asserts strict, literal adherence to fundamental sacred scriptures, often reacting against secular globalization and modern moral permissiveness.",
    rationalization: "Sociologists note that religious fundamentalism is not merely an ancient relic, but a defensive reaction against the cultural dislocation and moral relativism brought by globalization.",
    mnemonic: { title: "Fundamentalist Reaction", phrase: "Literal Scripture Defense Against Secularism", items: ["F - Fundamentalism", "L - Literal scriptural adherence", "D - Defensive against globalization"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine religion, secularism, and fundamentalism in a globalized world",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Digital Divide",
    definition: "The economic and social inequality between demographic groups and geographic regions in their access to, use of, or knowledge of information and communication technologies (ICT).",
    rationalization: "Revealed acutely during the COVID-19 pandemic when poor students in remote rural areas lacked internet and laptops for remote education.",
    mnemonic: { title: "Digital Divide", phrase: "Information Have's vs Have-Not's", items: ["D - Digital inequality", "A - Access barrier", "R - Rural vs urban gap"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze information technology, digital divides, and media access",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Global Civil Society and NGOs",
    definition: "Non-governmental organizations (NGOs), social movements, and advocacy networks operating internationally across state boundaries to advance humanitarian, environmental, and human rights causes.",
    rationalization: "Examples include Amnesty International, Greenpeace, and Doctors Without Borders; they hold governments and multinational corporations accountable to global ethical standards.",
    mnemonic: { title: "Global NGOs", phrase: "Citizens Beyond Borders Holding Power Accountable", items: ["G - Greenpeace", "A - Amnesty International", "D - Doctors Without Borders"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze international human rights law and global governance",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Kyoto Protocol (1997)",
    definition: "The international environmental treaty extending the UNFCCC that committed industrialized nations to mandatory, legally binding emission reduction targets for greenhouse gases.",
    rationalization: "Adopted the principle of 'Common But Differentiated Responsibilities', placing the legal burden on historic polluter nations of the Global North while exempting developing nations.",
    mnemonic: { title: "Kyoto Protocol", phrase: "Binding Carbon Targets for Developed Nations", items: ["K - Kyoto 1997", "B - Binding reduction targets", "C - Common but differentiated responsibilities"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine international climate accords and global environmentalism",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Global Supply Chain Fragility",
    definition: "The vulnerability of interconnected multinational production networks to systemic disruption from localized pandemics, natural disasters, geopolitical wars, or canal blockages.",
    rationalization: "Exemplified by the COVID-19 microchip shortages and the 2021 Suez Canal blockage, prompting companies to transition from 'Just-in-Time' to 'Just-in-Case' manufacturing.",
    mnemonic: { title: "Supply Chain Shock", phrase: "One Broken Link Stops the Whole World", items: ["S - Supply chain breakdown", "J - Just-in-case inventory shift", "V - Vulnerability of globalization"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Examine multinational corporations and global commodity chains",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Remittances and the Philippine Economy",
    definition: "The financial transfers sent home by Overseas Filipino Workers (OFWs) to their families in the Philippines, which comprise approximately 8-10% of the national Gross Domestic Product (GDP).",
    rationalization: "Remittances stabilize the Philippine peso, maintain national foreign exchange reserves, and fuel domestic consumer spending in housing and retail.",
    mnemonic: { title: "Remittance Power", phrase: "OFW Remittances Fuel the National Economy", items: ["R - Remittances", "8-10% - GDP contribution", "F - Foreign exchange stabilizer"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze global demography, migration, and population theories",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "South China Sea Arbitration (Philippines v. China, 2016)",
    definition: "The landmark ruling by the Permanent Court of Arbitration in The Hague under UNCLOS declaring China's 'nine-dash line' and historic maritime claims to have no legal basis.",
    rationalization: "Affirmed the Philippines' sovereign rights over its 200-nautical-mile Exclusive Economic Zone (EEZ) in the West Philippine Sea, including Mischief Reef and Scarborough Shoal.",
    mnemonic: { title: "The Hague 2016 Victory", phrase: "Nine-Dash Line Declared Illegal Under UNCLOS", items: ["2016 - Arbitral award", "U - UNCLOS maritime law", "E - EEZ sovereignty affirmed"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze international law, treaties, and the West Philippine Sea disputes",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "United Nations Convention on the Law of the Sea (UNCLOS)",
    definition: "The 1982 international maritime agreement defining the rights and responsibilities of nations regarding their use of the world's oceans, establishing Territorial Seas (12 nautical miles) and EEZs (200 nautical miles).",
    rationalization: "Regarded as the 'Constitution for the Oceans'; provides the authoritative legal framework for maritime boundary demarcation and marine resource conservation.",
    mnemonic: { title: "UNCLOS Zones", phrase: "12 Miles Territorial, 200 Miles EEZ", items: ["12 nm - Territorial sea sovereignty", "200 nm - Exclusive Economic Zone", "C - Constitution of oceans"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze international law, treaties, and the West Philippine Sea disputes",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Economic Sanctions",
    definition: "Commercial, trade, and financial penalties applied by one or more countries against a targeted country, group, or individual to force political compliance or punish aggression.",
    rationalization: "Include asset freezes, trade embargoes, and expulsion from SWIFT international banking; widely deployed by the UN and Western coalitions against rogue states.",
    mnemonic: { title: "Sanctions Tool", phrase: "Economic Pressure Without Battlefield Troops", items: ["S - Sanctions", "F - Financial freeze", "T - Trade embargo"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze international relations, statecraft, and diplomatic interventions",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Soft Power vs Hard Power (Joseph Nye)",
    definition: "Hard power is the use of military coercion and economic inducement to force behavior; Soft power is the ability to attract, persuade, and co-opt through culture, political values, and foreign policies.",
    rationalization: "American Hollywood movies, South Korean K-Pop (Hallyu wave), and Japanese anime represent immense soft power that inspires admiration worldwide.",
    mnemonic: { title: "Nye's Power Types", phrase: "Hard Power Coerces; Soft Power Attracts", items: ["H - Hard: Military & sanctions", "S - Soft: Culture, values, arts", "S - Smart power: Strategic mix"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Analyze international relations, statecraft, and diplomatic interventions",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Fair Trade Movement",
    definition: "An organized social movement that promotes sustainable and equitable trade partnerships, guaranteeing fair minimum prices and safe working conditions for smallholder farmers in developing nations.",
    rationalization: "Directly combats predatory agricultural middlemen in coffee, cacao, and cotton trade, empowering Global South agricultural cooperatives.",
    mnemonic: { title: "Fair Trade Clue", phrase: "Fair Prices for Smallholder Farmers", items: ["F - Fair wages guaranteed", "S - Sustainable agriculture", "C - Community development premium"] },
    source: "PRC BLEPT GenEd Contemporary World Reviewer",
    tosCompetency: "Evaluate economic systems, neoliberalism, and Washington Consensus",
    bloomsTaxonomy: "Understanding",
    highYield: true
  }
];

// Write The Contemporary World
writeDataset(
  'data/gened/contemporary_world/contemporary_world.json',
  'General Education',
  'The Contemporary World',
  'Globalization Dimensions, Global Economy, UN, & Regionalism',
  contemporaryWorldItems
);
