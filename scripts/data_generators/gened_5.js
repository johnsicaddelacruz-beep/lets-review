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

// 5. Readings in Philippine History and Society (50 items)
const historyItems = [
  {
    term: "Primary Source",
    definition: "An authentic, firsthand piece of evidence created by an eyewitness or contemporary participant during the historical time period under study.",
    rationalization: "Examples include Antonio Pigafetta's travel diary, Emilio Jacinto's Kartilya ng Katipunan, photographs, treaties, and archaeological artifacts.",
    mnemonic: { title: "Primary Source Clue", phrase: "Eyewitness at the Event", items: ["P - Primary", "E - Eyewitness testimony", "F - Firsthand artifact"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Distinguish primary and secondary historical sources and analyze historical credibility",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Secondary Source",
    definition: "A historical account that interprets, analyzes, or synthesizes primary sources, written after the events occurred by someone who did not experience them firsthand.",
    rationalization: "Examples include modern history textbooks, scholarly journal articles by Teodoro Agoncillo or Gregorio Zaide, and historical documentary films.",
    mnemonic: { title: "Secondary Source Clue", phrase: "Secondhand Historical Analysis", items: ["S - Secondary", "A - Analyzes primary sources", "T - Textbooks and commentaries"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Distinguish primary and secondary historical sources and analyze historical credibility",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "External Criticism (Lower Criticism)",
    definition: "The historical analysis that examines the physical authenticity, provenance, physical age, paper, ink, and authorship of a document to detect forgeries.",
    rationalization: "External criticism asks: 'Is the document genuine?' (e.g., exposing the fabricated Code of Kalantiaw written by Jose Marco using modern paper and false claims).",
    mnemonic: { title: "External vs Internal Criticism", phrase: "External = Authenticity of Paper; Internal = Credibility of Words", items: ["E - External: Authenticity / Physical", "I - Internal: Credibility / Meaning"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Apply historical methodology: internal and external criticism",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Internal Criticism (Higher Criticism)",
    definition: "The critical analysis of a document's contents, looking at the author's credibility, potential biases, truthfulness, and the accuracy of the statements made.",
    rationalization: "Internal criticism asks: 'Is the narrative credible and trustworthy?' examining motives, hidden agendas, and corroboration with other independent witnesses.",
    mnemonic: { title: "Internal Criticism", phrase: "Look Inside the Author's Truth", items: ["I - Inside text", "C - Credibility check", "B - Bias evaluation"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Apply historical methodology: internal and external criticism",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Antonio Pigafetta",
    definition: "The Italian scholar and Venetian chronicler of Ferdinand Magellan's expedition whose travel journal is the principal primary source for the first European contact with the Philippines in 1521.",
    rationalization: "Pigafetta survived the entire circumnavigation aboard the Victoria under Juan Sebastian Elcano, documenting the First Mass, native languages, and the Battle of Mactan.",
    mnemonic: { title: "Pigafetta the Scribe", phrase: "Pen of the Magellan Voyage", items: ["P - Pigafetta", "I - Italian chronicler", "M - Magellan voyage diary"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze Pigafetta's account of the first voyage around the world",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "First Catholic Mass in the Philippines",
    definition: "The historical religious event held on Easter Sunday, March 31, 1521, officiated by Father Pedro de Valderrama on the island of Mazaua (Limasawa, Southern Leyte).",
    rationalization: "The National Historical Commission of the Philippines (NHCP) and multiple historical panels reaffirm Limasawa over Butuan based on Pigafetta and Francisco Albo's navigational coordinates.",
    mnemonic: { title: "First Mass Limasawa", phrase: "March 31, 1521: Limasawa Easter Sunday", items: ["M - March 31, 1521", "E - Easter Sunday", "L - Limasawa (Mazaua)"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Resolve historical controversies (First Mass in the Philippines)",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "Battle of Mactan (April 27, 1521)",
    definition: "The armed encounter where chieftain Lapu-Lapu and his Mactan warriors defeated the Spanish forces, leading to the death of Ferdinand Magellan.",
    rationalization: "Magellan underestimated the native warriors and tidal reefs; Lapu-Lapu's triumph delayed Spanish colonization of the archipelago for 44 years until Miguel Lopez de Legazpi arrived in 1565.",
    mnemonic: { title: "Mactan Date", phrase: "April 27, 1521: Lapu-Lapu Prevails", items: ["A - April 27, 1521", "L - Lapu-Lapu", "M - Magellan slain"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the Battle of Mactan and early Philippine resistance",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Customs of the Tagalogs (Juan de Plasencia, 1589)",
    definition: "A detailed ethnographic account written by the Franciscan friar Juan de Plasencia documenting pre-colonial Tagalog social hierarchy, property laws, and religious practices.",
    rationalization: "Served as the primary administrative reference for Spanish colonial magistrates to govern indigenous communities without violating ancient native customary laws.",
    mnemonic: { title: "Plasencia Tagalogs", phrase: "Plasencia Documented Datu, Maharlika, Alipin", items: ["J - Juan de Plasencia", "1589 - Year written", "C - Customs of the Tagalogs"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine Plasencia's Customs of the Tagalogs and pre-colonial social structures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Maharlika (Nobility)",
    definition: "The freeborn warrior class in pre-colonial Tagalog society who accompanied the Datu in war without paying tribute, but shared in battle spoils.",
    rationalization: "Contrasted with the Timawa (freemen) and the Alipin classes (Aliping Namamahay and Aliping Saguiguilid) in pre-colonial stratified communities.",
    mnemonic: { title: "Tagalog Social Hierarchy", phrase: "Datu -> Maharlika / Timawa -> Alipin", items: ["D - Datu (Ruling chieftain)", "M - Maharlika (Freeborn warriors)", "A - Alipin (Servants/Debtors)"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine Plasencia's Customs of the Tagalogs and pre-colonial social structures",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Aliping Namamahay",
    definition: "Pre-colonial servants who owned their private house, held gold and properties, and could not be sold by their master, serving only during harvests and boat journeys.",
    rationalization: "They enjoyed high personal autonomy; contrasted with the Aliping Saguiguilid who lived inside the master's house and could be sold to settle debts.",
    mnemonic: { title: "Namamahay Clue", phrase: "May Bahay (Owns a House)", items: ["N - Namamahay", "B - May sariling bahay", "H - Cannot be sold"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine Plasencia's Customs of the Tagalogs and pre-colonial social structures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Aliping Saguiguilid",
    definition: "Servants in pre-colonial Tagalog society who lived inside the master's house (sa gilid ng bahay), possessed no property of their own, and could be transferred or sold.",
    rationalization: "Usually captives of tribal warfare or individuals burdened by overwhelming generational debts; could purchase freedom by accumulating gold.",
    mnemonic: { title: "Saguiguilid Clue", phrase: "Sa Gilid ng Bahay (Inside Master's House)", items: ["S - Saguiguilid", "G - Gilid ng bahay", "S - Suffer lowest rank, can be sold"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine Plasencia's Customs of the Tagalogs and pre-colonial social structures",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Kartilya ng Katipunan",
    definition: "The 14-rule ethical and moral primer of the Katipunan (KKK) written by Emilio Jacinto, outlining the duties of a true patriot and moral character.",
    rationalization: "Andres Bonifacio graciously set aside his own written Dekalogo ('Katungkulang Gagawin ng mga Z.Ll.B.') in favor of Jacinto's Kartilya because of its superior literary elegance and philosophical depth.",
    mnemonic: { title: "Kartilya Author", phrase: "Jacinto Wrote the Kartilya Primer", items: ["E - Emilio Jacinto", "U - Utak ng Katipunan", "14 - Moral rules"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the Kartilya ng Katipunan and revolutionary ethics",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Emilio Jacinto",
    definition: "The youthful revolutionary known as the 'Brain of the Katipunan' (Utak ng Katipunan) who served as fiscal, secretary, and editor of the revolutionary newspaper 'Kalayaan'.",
    rationalization: "Wrote under the pen names 'Dimas-Ilaw' and 'Pingkian'; died of malaria in Magdalena, Laguna in 1899 at the young age of 23.",
    mnemonic: { title: "Jacinto Titles", phrase: "Utak ng Katipunan = Emilio Jacinto", items: ["E - Emilio Jacinto", "U - Utak ng Katipunan", "P - Pingkian / Dimas-Ilaw"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the Kartilya ng Katipunan and revolutionary ethics",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "1872 Cavite Mutiny (Filipino Perspective)",
    definition: "The localized uprising of around 200 Filipino soldiers and arsenal workers led by Sergeant Fernando La Madrid protesting Governor-General Izquierdo's revocation of tax and labor exemptions.",
    rationalization: "Dr. Trinidad Hermenegildo Pardo de Tavera articulated that the mutiny was a mere workplace strike, not a nationwide conspiracy; Spanish reactionaries exaggerated it to justify executing secular priests.",
    mnemonic: { title: "Tavera's View", phrase: "Labor Strike Exaggerated into Conspiracy", items: ["T - Tavera account", "L - Labor exemption revoked", "I - Izquierdo's brutal overreaction"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Evaluate conflicting perspectives on the 1872 Cavite Mutiny",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "1872 Cavite Mutiny (Spanish Perspective)",
    definition: "The official Spanish colonial account by Jose Montero y Vidal claiming the mutiny was part of a grand treasonous conspiracy orchestrated by native secular clergy and educated Creoles to overthrow Spain.",
    rationalization: "Governor-General Rafael de Izquierdo used this pretext to crack down on the emerging Filipino reform movement, banishing prominent intellectuals and executing GOMBURZA.",
    mnemonic: { title: "Montero & Izquierdo", phrase: "Grand Treasonous Plot Narrative", items: ["M - Montero y Vidal", "I - Izquierdo", "C - Conspiracy narrative"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Evaluate conflicting perspectives on the 1872 Cavite Mutiny",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Martyrdom of GOMBURZA (February 17, 1872)",
    definition: "The public execution by garrote vil of secular priests Fathers Mariano Gomez, Jose Burgos, and Jacinto Zamora at Bagumbayan on false charges of sedition.",
    rationalization: "Widely regarded by historians as the watershed moment that awakened Filipino national consciousness, inspiring Jose Rizal to dedicate his second novel, 'El Filibusterismo', in their memory.",
    mnemonic: { title: "GOMBURZA Date", phrase: "February 17, 1872: The Spark of Nationalism", items: ["G - Gomez (Oldest)", "B - Burgos (Brilliant leader)", "Z - Zamora (Youngest)", "Garrote - Execution device"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the secularization movement and the martyrdom of GOMBURZA",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Padre Jose Burgos",
    definition: "The brilliant Filipino creole priest and intellectual who championed the rights of native secular clergy against Spanish regular friar orders (Dominicans, Augustinians, Franciscans).",
    rationalization: "A close friend of Paciano Rizal (Jose Rizal's older brother); authored the celebrated manifesto 'Manifiesto que a la noble nacion española dirigen los leales filipinos' (1864).",
    mnemonic: { title: "Burgos the Leader", phrase: "Burgos Championed Secular Clergy", items: ["J - Jose Burgos", "S - Secularization leader", "P - Paciano's mentor"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the secularization movement and the martyrdom of GOMBURZA",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Cry of Pugad Lawin (August 23, 1896)",
    definition: "The official event marking the start of the Philippine Revolution against Spain where Andres Bonifacio and Katipuneros tore their cedulas personales, shouting 'Mabuhay ang Pilipinas!'.",
    rationalization: "Tearing the cedula symbolized defiance of Spanish sovereignty and tax oppression; designated by the NHCP as August 23, 1896 at the yard of Juan Ramos in Pugad Lawin.",
    mnemonic: { title: "Cry of Pugad Lawin", phrase: "Tear Cedulas, Freedom Begins", items: ["A - August 23, 1896", "C - Cedula torn", "P - Pugad Lawin"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine controversies on the Cry of Balintawak/Pugad Lawin",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Cedula Personal",
    definition: "The certificate of identification and poll tax imposed by Spain in 1884 on all Philippine residents aged 18 and older, replacing the ancient tribute system.",
    rationalization: "Every resident had to carry it at all times; failing to present a cedula to the Guardia Civil resulted in immediate detention and physical abuse.",
    mnemonic: { title: "Cedula Symbol", phrase: "Document of Spanish Vassalage", items: ["C - Cedula", "1884 - Replaced tribute", "T - Torn by Katipuneros"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine controversies on the Cry of Balintawak/Pugad Lawin",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Tributo (Tribute)",
    definition: "A direct tax imposed on native Filipinos under Spanish colonial rule amounting initially to 8 reales, later increased to 10 reales, payable in cash or produce.",
    rationalization: "Symbolized vassalage and subjugation to the King of Spain; sparked numerous indigenous uprisings (e.g., Cagayan and Dingras revolts of 1589).",
    mnemonic: { title: "Tributo Reales", phrase: "8 to 10 Reales of Subjugation", items: ["T - Tributo", "8 Reales - Initial rate", "V - Vassalage symbol"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace the history of Philippine taxation systems",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Polo y Servicio",
    definition: "The system of forced labor imposed by the Spanish colonial government on all able-bodied Filipino males aged 16 to 60 for 40 days annually (reduced to 15 days in 1884).",
    rationalization: "Polistas were forced to construct roads, bridges, churches, and galleons; wealthy natives could avoid labor by paying the 'falla' exemption fee.",
    mnemonic: { title: "Polo y Servicio", phrase: "Forced Labor for 40 Days", items: ["P - Polistas", "40 Days - Annual forced labor", "F - Falla fee for exemption"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace the history of Philippine taxation systems",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Falla",
    definition: "The daily exemption fee paid by wealthy Filipinos to be excused from the physically exhausting compulsory forced labor of Polo y Servicio.",
    rationalization: "Cost about 7 pesos annually; widened the socioeconomic divide because poor peasants who could not afford the falla bore the brutal brunt of manual labor.",
    mnemonic: { title: "Falla Fee", phrase: "Pay to Fall Away from Forced Labor", items: ["F - Falla", "P - Pay exemption fee", "P - Privilege of the rich"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace the history of Philippine taxation systems",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Encomienda System",
    definition: "A royal grant from the Spanish Crown awarding an encomendero the right to collect tribute and command labor from indigenous inhabitants of a designated territory.",
    rationalization: "In exchange, the encomendero was tasked with protecting the natives and instructing them in the Catholic faith; in reality, it devolved into rampant extortion and cruelty.",
    mnemonic: { title: "Encomienda Clue", phrase: "Royal Grant to Collect Native Tribute", items: ["E - Encomienda", "R - Royal grant", "T - Tribute collection"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine colonial land tenure and socioeconomic systems",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Hacienda System",
    definition: "Large private landed agricultural estates that arose in the 19th century in the Philippines producing cash crops (sugar, abaca, tobacco, rice) for global export.",
    rationalization: "Concentrated fertile land in the hands of religious orders (friar lands) and Spanish-Chinese mestizos, creating severe tenancy conflicts (e.g., the Calamba Hacienda eviction).",
    mnemonic: { title: "Hacienda Cash Crops", phrase: "Vast Estates, Oppressed Inquilinos", items: ["H - Hacienda", "C - Cash crops", "I - Inquilino leaseholders"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine colonial land tenure and socioeconomic systems",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Inquilino System",
    definition: "The land tenure arrangement where a tenant leased land from a hacienda owner (such as a friar estate) for a fixed annual rent (canon) and sublet it to sharecroppers (kasama).",
    rationalization: "Jose Rizal's father, Francisco Mercado, was a prominent inquilino in Calamba leasing sugarcane fields from the Dominican hacienda.",
    mnemonic: { title: "Inquilino Three-Tier", phrase: "Friar Landlord -> Inquilino Tenant -> Kasama Peasant", items: ["F - Friar estate owner", "I - Inquilino (Middle lessee)", "K - Kasama (Direct sharecropper)"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Examine colonial land tenure and socioeconomic systems",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "1899 Malolos Constitution",
    definition: "The first democratic, republican constitution in the Philippines and throughout Asia, drafted by Felipe Calderon and promulgated by the First Philippine Republic.",
    rationalization: "Established a government with three separate branches: a dominant unicameral assembly, executive, and judiciary, and provided for separation of church and state.",
    mnemonic: { title: "Malolos Constitution", phrase: "First Asian Republic 1899", items: ["M - Malolos, Bulacan", "F - Felipe Calderon author", "A - Asia's first democratic charter"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Compare historical Philippine Constitutions",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "1935 Commonwealth Constitution",
    definition: "The fundamental law drafted under the Tydings-McDuffie Act that established the Commonwealth of the Philippines as a transition toward full independence.",
    rationalization: "Presided over by Claro M. Recto; established a presidential system modeled on the United States with a bicameral legislature and a 4-year presidential term.",
    mnemonic: { title: "1935 Commonwealth Charter", phrase: "Tydings-McDuffie Transition Law", items: ["1935 - Year enacted", "T - Tydings-McDuffie Act", "R - Recto convention president"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Compare historical Philippine Constitutions",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "1973 Constitution",
    definition: "The fundamental law ratified during Ferdinand Marcos's Martial Law through citizen assemblies (viva voce voting) that established a modified parliamentary form of government.",
    rationalization: "Subsequent 1976 amendments introduced Amendment No. 6, granting President Marcos legislative powers to issue decrees alongside the Batasang Pambansa.",
    mnemonic: { title: "1973 Martial Law Charter", phrase: "Citizen Assemblies and Amendment No. 6", items: ["1973 - Parliamentary charter", "C - Citizen assemblies by hand raising", "6 - Amendment No. 6 decree power"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Compare historical Philippine Constitutions",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "1987 Philippine Constitution",
    definition: "The current fundamental law of the Republic of the Philippines, drafted by the 1986 Constitutional Commission led by Cecilia Muñoz-Palma and ratified on February 2, 1987.",
    rationalization: "Restored a presidential bicameral democracy, limited the President to a single 6-year term with no reelection, and established rigorous safeguards against Martial Law abuse.",
    mnemonic: { title: "1987 Charter Features", phrase: "One 6-Year Term, Strong Human Rights", items: ["1987 - Ratified February 2", "6 - Six-year term no reelection", "B - Bill of Rights (Article III)"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Compare historical Philippine Constitutions",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Article III of the 1987 Constitution: Bill of Rights",
    definition: "The section of the Philippine Constitution guaranteeing fundamental civil liberties, due process, equal protection, freedom of speech, and protection against unreasonable searches.",
    rationalization: "Regarded as the heart of constitutional democracy; Section 1 mandates: 'No person shall be deprived of life, liberty, or property without due process of law.'",
    mnemonic: { title: "Article III Rights", phrase: "Article III = Bill of Rights", items: ["3 - Roman numeral III", "B - Bill of Rights", "D - Due process guarantee"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze constitutional rights and citizenship principles",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Writ of Habeas Corpus",
    definition: "A judicial order commanding an authority detaining a person to produce the prisoner in court and show lawful justification for their detention.",
    rationalization: "Protects against unlawful arrest and arbitrary imprisonment. Under the 1987 Constitution, suspension is restricted to invasion or rebellion when public safety requires it.",
    mnemonic: { title: "Habeas Corpus", phrase: "Produce the Body in Court", items: ["H - Habeas corpus", "P - Produce the body", "A - Anti-arbitrary detention"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze constitutional rights and citizenship principles",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Writ of Amparo",
    definition: "A legal remedy available to any person whose right to life, liberty, and security is violated or threatened with violation by an unlawful act of a public official or private individual.",
    rationalization: "Adopted by the Supreme Court of the Philippines in 2007 to address extrajudicial killings and enforced disappearances.",
    mnemonic: { title: "Writ of Amparo", phrase: "Shield for Life, Liberty, and Security", items: ["A - Amparo (Spanish for shelter/protect)", "E - Extrajudicial killings remedy", "L - Life and security shield"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze constitutional rights and citizenship principles",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Writ of Habeas Data",
    definition: "A legal remedy available to any person whose right to privacy in life, liberty, or security is violated by an unlawful gathering, collecting, or storing of data or information.",
    rationalization: "Allows an aggrieved citizen to compel the military, police, or state agents to disclose, rectify, or expunge erroneous intelligence files and dossiers.",
    mnemonic: { title: "Habeas Data Clue", phrase: "Access and Purge Secret Surveillance Files", items: ["H - Habeas Data", "D - Data disclosure and correction", "P - Privacy protection"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze constitutional rights and citizenship principles",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Writ of Kalikasan",
    definition: "A special legal remedy available to persons whose constitutional right to a balanced and healthful ecology is violated by an environmental damage of such magnitude as to prejudice two or more cities or provinces.",
    rationalization: "Adopted by the Philippine Supreme Court in 2010 under the landmark Oposa v. Factoran doctrine (Intergenerational Responsibility).",
    mnemonic: { title: "Writ of Kalikasan", phrase: "Environmental Shield Across 2+ Cities", items: ["K - Kalikasan (Nature)", "E - Environmental catastrophe remedy", "2+ - Affects two or more provinces/cities"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze constitutional rights and citizenship principles",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Comprehensive Agrarian Reform Program (CARP / RA 6657)",
    definition: "The landmark agrarian reform law signed by President Corazon Aquino on June 10, 1988, redistributing public and private agricultural lands to landless farmers and farmworkers.",
    rationalization: "Established a 5-hectare retention limit for landowners; later extended and funded under President Gloria Macapagal-Arroyo as CARPER (RA 9700) in 2009.",
    mnemonic: { title: "CARP RA 6657", phrase: "RA 6657 = Cory's Agrarian Reform", items: ["6657 - Republic Act number", "1988 - Year enacted", "5 ha - Landowner retention limit"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace agrarian reform programs in the Philippines",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Presidential Decree No. 27 (PD 27)",
    definition: "President Ferdinand Marcos's agrarian reform decree of October 21, 1972, declaring the entire country an agrarian reform area for tenanted rice and corn lands.",
    rationalization: "Known as Operation Land Transfer (OLT); restricted strictly to rice and corn lands, giving tenant-farmers up to 3 hectares of irrigated or 5 hectares of unirrigated land.",
    mnemonic: { title: "PD 27 Focus", phrase: "Marcos Rice and Corn Land Reform", items: ["27 - PD 27", "1972 - Year decreed", "R - Rice and corn lands only"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace agrarian reform programs in the Philippines",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "RA 3844: Agricultural Land Reform Code of 1963",
    definition: "The landmark agrarian legislation signed by President Diosdado Macapagal that abolished agricultural share tenancy and instituted the agricultural leasehold system.",
    rationalization: "Replaced oppressive sharecropping (where tenants gave 50% of produce to landlords) with fixed rental leaseholds, hailed as the 'Emancipation of the Filipino Farmer'.",
    mnemonic: { title: "RA 3844 Macapagal", phrase: "Abolished Share Tenancy", items: ["3844 - Republic Act", "M - Macapagal", "A - Abolished 50-50 sharecropping"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace agrarian reform programs in the Philippines",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "TRAIN Law (RA 10963)",
    definition: "The Tax Reform for Acceleration and Inclusion act signed in 2017 that exempted individuals earning ₱250,000 or below annually from personal income tax while raising excise taxes on fuel and sugary drinks.",
    rationalization: "A major overhaul of the National Internal Revenue Code to finance the 'Build, Build, Build' infrastructure program and social protection services.",
    mnemonic: { title: "TRAIN Law", phrase: "Zero Tax Under 250k, Higher Fuel Excise", items: ["10963 - RA number", "250k - Annual income exemption", "T - Tax reform for infrastructure"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Trace the history of Philippine taxation systems",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teodoro Agoncillo: Revolt of the Masses",
    definition: "The seminal 1956 historical book that pioneered a nationalist, 'from-below' historiographical perspective focusing on the plebeian roots of Andres Bonifacio and the Katipunan.",
    rationalization: "Shifted Philippine historiography away from Spanish colonial viewpoints and elite-dominated narratives toward the agency of the working-class Filipino masses.",
    mnemonic: { title: "Agoncillo Masses", phrase: "History of the Filipino People From Below", items: ["T - Teodoro Agoncillo", "R - Revolt of the Masses", "B - Bonifacio and the plebeians"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze nationalist historiography and Philippine revolutionary scholarship",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Oposa v. Factoran (1993)",
    definition: "The landmark Philippine Supreme Court decision recognizing the legal standing of minor children to sue on behalf of future generations based on the concept of 'Intergenerational Responsibility'.",
    rationalization: "Pioneered worldwide environmental law; held that every generation has a legal obligation to preserve the balance of the ecosystem for future unborn generations.",
    mnemonic: { title: "Oposa Doctrine", phrase: "Intergenerational Responsibility for Nature", items: ["O - Oposa case", "I - Intergenerational standing", "E - Ecology protection"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze constitutional rights and citizenship principles",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Treaty of Paris (December 10, 1898)",
    definition: "The treaty ending the Spanish-American War where Spain ceded the Philippines, Guam, and Puerto Rico to the United States for 20 million dollars.",
    rationalization: "Signed without any Filipino consultation or representation; the Filipino revolutionary government under Emilio Aguinaldo protested and launched the Philippine-American War in 1899.",
    mnemonic: { title: "Treaty of Paris 1898", phrase: "20 Million Dollars Sold the Archipelago", items: ["1898 - Year signed", "20M - US dollars payment", "S - Spain ceded Philippines to US"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze treaties and international interventions in Philippine sovereignty",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Bates Treaty (1899)",
    definition: "An agreement between the US military represented by General John C. Bates and the Sultanate of Sulu (Sultan Jamalul Kiram II) acknowledging American sovereignty while preserving Islamic customs and autonomy.",
    rationalization: "A diplomatic tactic by the Americans to prevent a simultaneous Moro uprising while fighting the Philippine-American War in Luzon; later unilaterally abrogated by the US in 1904.",
    mnemonic: { title: "Bates Treaty", phrase: "US Pact with Sulu Sultanate", items: ["B - Bates treaty", "S - Sulu Sultanate", "1899 - Temporary neutrality pact"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze treaties and international interventions in Philippine sovereignty",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Tydings-McDuffie Act (Philippine Independence Act of 1934)",
    definition: "The United States federal law that provided for Philippine self-governance and the transition toward full national independence after a ten-year Commonwealth period.",
    rationalization: "Secured through the lobbying of Manuel L. Quezon, replacing the Hare-Hawes-Cutting Act brought home by the OsRox (Sergio Osmeña and Manuel Roxas) mission.",
    mnemonic: { title: "Tydings-McDuffie Law", phrase: "10-Year Commonwealth Path to Independence", items: ["1934 - Year enacted", "10 Years - Commonwealth transition", "Q - Quezon leadership"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze treaties and international interventions in Philippine sovereignty",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Bell Trade Act of 1946 and Parity Rights",
    definition: "The controversial American economic act granting US citizens and corporations equal rights (Parity Rights) with Filipinos to exploit natural resources and operate public utilities in the Philippines.",
    rationalization: "Tied US financial post-WWII rehabilitation aid ($620 million) directly to the passage of a constitutional amendment granting parity rights to Americans, undermining real economic independence.",
    mnemonic: { title: "Bell Trade Parity", phrase: "Parity Rights Exploited Philippine Resources", items: ["B - Bell Trade Act", "P - Parity rights amendment", "1946 - Post-war economic strings"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze treaties and international interventions in Philippine sovereignty",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Gregoria de Jesus (Oriang)",
    definition: "The wife of Andres Bonifacio hailed as the 'Lakambini ng Katipunan' who served as custodian of Katipunan secret documents, seals, and revolvers.",
    rationalization: "Safeguarded revolutionary documents in her skirt when Spanish Guardia Civil raided houses; later married Julio Nakpil after Bonifacio's execution.",
    mnemonic: { title: "Lakambini Oriang", phrase: "Lakambini ng Katipunan", items: ["G - Gregoria de Jesus", "L - Lakambini ng Katipunan", "K - Keeper of secret papers"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Highlight women's roles in Philippine revolutionary history",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teresa Magbanua",
    definition: "The school teacher from Iloilo recognized as the 'Joan of Arc of the Visayas' who led victorious combat charges against both Spanish and American imperial troops.",
    rationalization: "One of the few Filipino women commanders who commanded infantry and cavalry troops in actual battlefield warfare during the revolution.",
    mnemonic: { title: "Visayan Joan of Arc", phrase: "Teresa Magbanua Fought on Horseback", items: ["T - Teresa Magbanua", "J - Joan of Arc of the Visayas", "I - Iloilo combat leader"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Highlight women's roles in Philippine revolutionary history",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Melchora Aquino (Tandang Sora)",
    definition: "The venerable octogenarian known as the 'Mother of the Katipunan' and 'Mother of Balintawak' who sheltered, fed, and nursed wounded Katipuneros at her farm in Banlat.",
    rationalization: "Exiled by Spanish authorities to Guam for refusing to disclose the whereabouts of Andres Bonifacio and the revolutionary forces; returned home under American rule.",
    mnemonic: { title: "Tandang Sora", phrase: "Mother of the Katipunan", items: ["M - Melchora Aquino", "T - Tandang Sora", "E - Exiled to Guam"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Highlight women's roles in Philippine revolutionary history",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "General Antonio Luna",
    definition: "The brilliant Filipino pharmacist, chemist, and military general regarded as the fiercest tactician of the Philippine-American War who established the military academy.",
    rationalization: "Founded the revolutionary paper 'La Independencia' and created the formidable defensive trench network known as the 'Luna Defense Line'; assassinated in Cabanatuan, Nueva Ecija in 1899.",
    mnemonic: { title: "General Luna", phrase: "Fierce Military Tactician", items: ["A - Antonio Luna", "L - Luna Defense Line", "I - La Independencia editor"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the Philippine-American War and military leadership",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Apolinario Mabini",
    definition: "The brilliant lawyer and legal philosopher known as the 'Brain of the Revolution' (Utak ng Himagsikan) and 'Sublime Paralytic' who served as prime minister and foreign minister of the First Republic.",
    rationalization: "Penned the 'Verdadero Decalogo' (True Decalogue) and the constitutional program of the Republic; fiercely refused to swear allegiance to the US until months before his death.",
    mnemonic: { title: "Mabini Sublime Mind", phrase: "Utak ng Himagsikan and Sublime Paralytic", items: ["A - Apolinario Mabini", "U - Utak ng Himagsikan", "V - Verdadero Decalogo"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze revolutionary philosophies and ideological foundations",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Macario Sakay",
    definition: "The revolutionary general who continued the armed struggle against American occupation by establishing the 'Republika ng Katagalugan' in the mountains of Southern Tagalog.",
    rationalization: "Unjustly branded a common bandit under the American Brigandage Act of 1902; deceived by false surrender promises and executed by hanging in 1907 with the words 'Death is not important when you die for the motherland.'",
    mnemonic: { title: "Sakay Patriot", phrase: "Republika ng Katagalugan Fighter", items: ["M - Macario Sakay", "R - Republika ng Katagalugan", "H - Hanged as 'bandit' by US"] },
    source: "PRC BLEPT GenEd History Reviewer",
    tosCompetency: "Analyze the Philippine-American War and military leadership",
    bloomsTaxonomy: "Remembering",
    highYield: true
  }
];

// Write Readings in Philippine History and Society
writeDataset(
  'data/gened/readings_philippine_history/readings_philippine_history.json',
  'General Education',
  'Readings in Philippine History and Society',
  'Primary Sources, Historical Controversies, Constitutions, & Agrarian Reform',
  historyItems
);
