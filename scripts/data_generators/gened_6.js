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

// 6. The Life and Works of Rizal (50 items)
const rizalItems = [
  {
    term: "Republic Act No. 1425 (Rizal Law)",
    definition: "The landmark Philippine law that mandates all public and private schools, colleges, and universities to include in their curricula courses on the life, works, and writings of Jose Rizal, particularly his novels Noli Me Tangere and El Filibusterismo.",
    rationalization: "Signed into law by President Ramon Magsaysay on June 12, 1956 (Independence Day) to instill patriotism, civic virtues, and nationalism in Filipino students.",
    mnemonic: { title: "Rizal Law RA Number", phrase: "Rizal Always 1425", items: ["R - Republic Act", "1425 - Number of the law", "June 12, 1956 - Date signed"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze the historical context and legislative provisions of RA 1425",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Senator Claro M. Recto",
    definition: "The principal author and champion of the original Rizal Bill (Senate Bill No. 438) who courageously defended it against fierce opposition from the Catholic hierarchy.",
    rationalization: "Recto argued that understanding Rizal's patriotic ideals is indispensable to true nation-building, refusing to water down the compulsory reading of the unexpurgated novels.",
    mnemonic: { title: "Recto the Writer", phrase: "Recto Wrote It, Laurel Sponsored It", items: ["R - Recto author", "L - Laurel sponsor", "C - Compulsory reading champion"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze the historical context and legislative provisions of RA 1425",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Senator Jose P. Laurel Sr.",
    definition: "The Chairman of the Committee on Education who co-sponsored and drafted the compromise amendment to the Rizal Bill allowing religious exemption from unexpurgated editions.",
    rationalization: "Laurel successfully harmonized conflicting legislative factions, securing unanimous passage of the compromise substitute bill in both houses of Congress.",
    mnemonic: { title: "Laurel the Peacemaker", phrase: "Laurel Sponsored Compromise Bill", items: ["L - Laurel", "P - Pacified opposition", "C - Committee on Education chairman"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze the historical context and legislative provisions of RA 1425",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Unexpurgated Edition of Noli and Fili",
    definition: "The original, complete, and unedited versions of Rizal's novels mandated for collegiate study under Section 1 of RA 1425.",
    rationalization: "Catholic opponents lobbied to censor anti-clerical passages; the law settled on unexpurgated texts at the university level with an exemption procedure for students with religious objections.",
    mnemonic: { title: "Unexpurgated Meaning", phrase: "Uncensored and Complete", items: ["U - Unexpurgated", "C - College mandatory", "N - No censorship"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze the historical context and legislative provisions of RA 1425",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Calamba, Laguna (June 19, 1861)",
    definition: "The birthplace and birthdate of Jose Protacio Rizal Mercado y Alonso Realonda.",
    rationalization: "Born on a moonlit Wednesday between eleven and twelve o'clock at night; baptized in the Catholic church of Calamba by Father Rufino Collantes, with Father Pedro Casanas as godfather.",
    mnemonic: { title: "Rizal Birth Details", phrase: "June 19, 1861: Calamba cradle", items: ["June 19, 1861 - Date", "Calamba, Laguna - Birthplace", "Collantes - Baptized him"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Trace Rizal's childhood, family background, and early education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Doña Teodora Alonso Realonda",
    definition: "Rizal's highly cultured, disciplined mother and his first teacher who taught him the alphabet, prayers, and the moral parable of the Moth and the Flame.",
    rationalization: "A graduate of Colegio de Santa Rosa; suffered unjust imprisonment by the Spanish authorities when falsely accused of poisoning her sister-in-law, deeply impacting young Jose.",
    mnemonic: { title: "Mother Teodora", phrase: "First Teacher and Moth Parable", items: ["T - Teodora Alonso", "M - Moth story teacher", "I - Incarcerated unjustly"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Trace Rizal's childhood, family background, and early education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Don Francisco Mercado",
    definition: "Rizal's industrious, quiet father who leased sugarcane fields from the Dominican hacienda in Calamba and provided for the education of his children.",
    rationalization: "Rizal described him as a 'model of fathers' who possessed great strength of character, honesty, and agricultural diligence.",
    mnemonic: { title: "Father Francisco", phrase: "Model Father and Calamba Inquilino", items: ["F - Francisco Mercado", "M - Model father", "I - Inquilino of Dominican estate"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Trace Rizal's childhood, family background, and early education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Paciano Rizal",
    definition: "Jose Rizal's older and only brother who acted as his mentor, confidant, and financier during his studies abroad, later becoming a revolutionary general.",
    rationalization: "A protégé of Father Jose Burgos; convinced Jose to study in Europe without alerting their parents to escape friar persecution in Manila.",
    mnemonic: { title: "Paciano the Pillar", phrase: "Older Brother and Guardian Angel", items: ["P - Paciano", "B - Burgos disciple", "G - General in revolution"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Trace Rizal's childhood, family background, and early education",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Origin of the Surnames Mercado and Rizal",
    definition: "'Mercado' (meaning market) was adopted in 1731 by his Chinese ancestor Domingo Lamco; 'Rizal' (from ricial, meaning green pasture or wheatfield) was chosen by the family under the Claveria decree.",
    rationalization: "Jose used 'Rizal' in Manila to avoid suspicion because 'Mercado' was associated with his brother Paciano's vocal ties to Father Burgos.",
    mnemonic: { title: "Surname Origins", phrase: "Mercado = Market; Rizal = Green Pasture", items: ["Mercado - Market (Domingo Lamco)", "Rizal - Ricial (Green fields)", "Claveria decree - Surname law"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Trace Rizal's childhood, family background, and early education",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Ateneo Municipal de Manila",
    definition: "The Jesuit-run educational institution where Rizal obtained his Bachiller en Artes degree with highest honors (sobresaliente) in 1877.",
    rationalization: "Ateneo fostered rigid discipline, humanistic arts, and fair academic competition through two student ranks: the Roman Empire (boarders) and the Carthaginian Empire (interns). Rizal rose to become 'Emperor'.",
    mnemonic: { title: "Ateneo Jesuit Days", phrase: "Sobresaliente Emperor at Ateneo", items: ["J - Jesuit education", "S - Sobresaliente grades", "E - Emperor of Carthaginians"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine Rizal's higher education at Ateneo, UST, and abroad",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "University of Santo Tomas (UST)",
    definition: "The Dominican university where Rizal took Philosophy and Letters and subsequently studied Medicine (Ophthalmology) from 1877 to 1882.",
    rationalization: "Rizal left UST for Spain due to Dominican faculty hostility, racial discrimination against native students, and obsolete scholastic teaching methods depicted in the 'Class in Physics' chapter of El Fili.",
    mnemonic: { title: "UST Experience", phrase: "Medicine Under Dominican Hostility", items: ["U - UST", "D - Dominican teachers", "P - Placido Penitente physics satire"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine Rizal's higher education at Ateneo, UST, and abroad",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Universidad Central de Madrid",
    definition: "The prestigious Spanish university where Rizal completed his Licentiate in Medicine (1884) and Licentiate in Philosophy and Letters (1885).",
    rationalization: "During this period, Rizal joined the Propaganda Movement, joined the Masonic lodge Acacia, and began drafting Noli Me Tangere.",
    mnemonic: { title: "Madrid Degrees", phrase: "Double Licentiate in Medicine and Philosophy", items: ["M - Madrid", "M - Medicine licentiate", "P - Philosophy & Letters licentiate"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine Rizal's higher education at Ateneo, UST, and abroad",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Dr. Louis de Wecker and Dr. Otto Becker",
    definition: "Renowned European ophthalmologists under whom Rizal trained in Paris and Heidelberg, respectively, to master surgical treatments for cataracts.",
    rationalization: "Rizal pursued ophthalmology with urgency specifically to restore the failing eyesight of his beloved mother, Doña Teodora.",
    mnemonic: { title: "Ophthalmology Masters", phrase: "Wecker in Paris, Becker in Heidelberg", items: ["W - Wecker (Paris)", "B - Becker (Heidelberg)", "M - Mother's cataract motivation"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine Rizal's higher education at Ateneo, UST, and abroad",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "A La Juventud Filipina (To the Filipino Youth, 1879)",
    definition: "Rizal's award-winning poem presented at the Liceo Artistico-Literario de Manila that first proclaimed the youth as the 'Bella esperanza de la patria mia' ('Fair hope of my fatherland').",
    rationalization: "A groundbreaking nationalist poem because it openly referred to the Philippines, rather than Spain, as the 'patria' (motherland) of Filipinos.",
    mnemonic: { title: "Juventud Filipina", phrase: "Youth is the Fair Hope of the Fatherland", items: ["Y - Youth as fair hope", "P - Patria is the Philippines", "1879 - Manila literary prize"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's major literary works, poetry, and essays",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Amor Patrio (Love of Country, 1882)",
    definition: "Rizal's first nationalistic essay written on Spanish soil, published simultaneously in Spanish and Tagalog in the Diariong Tagalog under the pseudonym Laong Laan.",
    rationalization: "Translated into Tagalog by Marcelo H. del Pilar; urged Filipinos to cultivate unconditional love for their homeland and sacrifice for its welfare.",
    mnemonic: { title: "Amor Patrio Clue", phrase: "Laong Laan in Diariong Tagalog", items: ["A - Amor Patrio", "L - Laong Laan pseudonym", "D - Diariong Tagalog"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's major literary works, poetry, and essays",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Brindis Speech (Toast Speech, June 25, 1884)",
    definition: "Rizal's celebrated banquet speech in Madrid celebrating the triumphs of Juan Luna (Gold for Spoliarium) and Felix Resurreccion Hidalgo (Silver for Christian Virgins Exposed to the Populace).",
    rationalization: "Rizal declared that creative genius knows no race or country, boldly criticizing friar despotism and establishing his fame among Spanish liberals.",
    mnemonic: { title: "Brindis Toast", phrase: "Genius Knows No Country: Luna and Hidalgo", items: ["L - Luna (Spoliarium)", "H - Hidalgo (Virgenes)", "G - Genius is universal"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's major literary works, poetry, and essays",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Noli Me Tangere (Berlin, March 1887)",
    definition: "Rizal's first socio-political novel exposing the cancerous corruption, hypocrisy, and abuses of the Spanish friars and colonial administrators in 19th-century Philippines.",
    rationalization: "Latin title meaning 'Touch Me Not' taken from the Gospel of St. John (20:17); dedicated to his motherland ('A Mi Patria').",
    mnemonic: { title: "Noli Details", phrase: "Berlin 1887: Touch Me Not", items: ["B - Berlin publication", "1887 - Year printed", "T - Touch Me Not (St. John 20:17)"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Dr. Maximo Viola",
    definition: "The affluent medical doctor from San Miguel, Bulacan known as the 'Savior of Noli Me Tangere' who loaned Rizal 300 pesos to print the first 2,000 copies in Berlin.",
    rationalization: "In gratitude, Rizal gifted Viola the original gallery proof-sheets and the quill pen used in writing the masterpiece.",
    mnemonic: { title: "Viola Savior", phrase: "Viola Saved the Noli", items: ["M - Maximo Viola", "N - Noli savior", "300 Pesos - Printing loan"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Crisostomo Ibarra",
    definition: "The idealistic, wealthy European-educated protagonist of Noli Me Tangere who aims to reform his motherland through education by establishing a public school in San Diego.",
    rationalization: "Represents the reformist, assimilationist dreams of the early Propaganda Movement; falsely implicated in an orchestrated uprising and targeted by Padre Salvi.",
    mnemonic: { title: "Ibarra Symbol", phrase: "Idealistic Reform Through Education", items: ["C - Crisostomo Ibarra", "E - Education advocate", "R - Reformist archetype"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Elias",
    definition: "The noble fugitive and boatman in Noli Me Tangere who represents the suffering, awakened working masses believing that only violent revolution can overthrow Spanish tyranny.",
    rationalization: "Sacrifices his life to save Ibarra in the Pasig River, dying with the iconic dying words: 'I die without seeing the dawn brighten over my native land...'",
    mnemonic: { title: "Elias the Revolutionary", phrase: "Died for the Dawn of Freedom", items: ["E - Elias", "R - Revolutionary action", "D - Dawn of freedom quote"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Maria Clara",
    definition: "The beautiful sweetheart of Ibarra representing traditional 19th-century Filipino womanhood, piety, and submissiveness, revealed as the biological daughter of Padre Damaso.",
    rationalization: "Forced to enter the Santa Clara convent upon hearing of Ibarra's reported death; modeled after Leonor Rivera, Rizal's real-life true love who married an Englishman.",
    mnemonic: { title: "Maria Clara Archetype", phrase: "Leonor Rivera in Literature", items: ["M - Maria Clara", "L - Leonor Rivera model", "D - Damaso's secret daughter"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Padre Damaso Verdolagas",
    definition: "The tyrannical, arrogant Franciscan friar who served as parish priest of San Diego for 20 years, representing friar despotism, greed, and moral hypocrisy.",
    rationalization: "Ordered the exhumation of Don Rafael Ibarra's body from the Catholic cemetery to be thrown into the Chinese cemetery; biological father of Maria Clara.",
    mnemonic: { title: "Padre Damaso", phrase: "Franciscan Friar Tyranny", items: ["P - Padre Damaso", "F - Franciscan", "E - Exhumed Don Rafael's body"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Sisa",
    definition: "The tragic mother in Noli Me Tangere driven into complete insanity by the unbearable grief of losing her two sons, Basilio and Crispin, to friar brutality.",
    rationalization: "An allegorical representation of the battered, helpless Filipino motherland enduring centuries of colonial degradation and domestic tragedy.",
    mnemonic: { title: "Sisa's Tragedy", phrase: "Motherland Driven to Mad Sorrow", items: ["S - Sisa", "M - Mother of Basilio and Crispin", "A - Allegory of the Motherland"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pilosopo Tasyo (Don Anastacio)",
    definition: "The wise, forward-looking scholar of San Diego ridiculed as insane ('Tasyo el Loco') by the ignorant townsfolk because his progressive ideas were ahead of his time.",
    rationalization: "Modeled after Jose Rizal's intellectual older brother, Paciano; advocated for rational enlightenment, scientific education, and critical free thought.",
    mnemonic: { title: "Tasyo the Sage", phrase: "Wisdom Mistaken for Madness", items: ["T - Tasyo", "P - Paciano model", "A - Ahead of his time"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Doña Victorina de los Reyes de Espadaña",
    definition: "The ridiculous, heavily powdered Filipina character in Rizal's novels who despises everything Filipino, affects European manners, and abuses Spanish grammar.",
    rationalization: "A biting caricature of colonial mentality, self-hatred, and cultural alienation among aspiring social-climbing indios.",
    mnemonic: { title: "Doña Victorina", phrase: "Colonial Mentality Caricature", items: ["V - Victorina", "C - Colonial mentality", "P - Powdered European affectation"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in Noli Me Tangere",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "El Filibusterismo (Ghent, September 1891)",
    definition: "Rizal's darker, politically radical second novel depicting the inevitable catastrophic failure of a revolution motivated solely by personal vengeance rather than moral righteousness.",
    rationalization: "Subtitled 'The Reign of Greed'; dedicated to the three martyred priests of 1872 (GOMBURZA); contains 38 chapters; printed in Ghent, Belgium.",
    mnemonic: { title: "Fili Facts", phrase: "Ghent 1891: Dedicated to GOMBURZA", items: ["G - Ghent publication", "1891 - Year printed", "G - GOMBURZA dedication"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Valentin Ventura",
    definition: "The wealthy Filipino compatriot in Paris known as the 'Savior of El Filibusterismo' who provided the necessary funds to resume and finish printing the novel in Ghent.",
    rationalization: "Rizal gifted Ventura the original autographed manuscript of El Filibusterismo along with a printed copy.",
    mnemonic: { title: "Ventura Savior", phrase: "Ventura Rescued the Fili", items: ["V - Valentin Ventura", "F - Fili savior", "G - Ghent printing financed"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Simoun",
    definition: "The cynical, vengeful jeweler in El Filibusterismo who is Crisostomo Ibarra in disguise, wielding gold to accelerate colonial decay and foment bloody rebellion.",
    rationalization: "Simoun fails because his uprising was animated by personal revenge (to retrieve Maria Clara and punish enemies) rather than pure national virtue and moral integrity.",
    mnemonic: { title: "Simoun's Motive", phrase: "Vengeance Behind Dark Glasses", items: ["S - Simoun", "I - Ibarra disguised", "V - Vengeance causes failure"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Padre Florentino",
    definition: "The noble, wise Filipino secular priest in El Filibusterismo who listens to Simoun's dying confession and casts Simoun's cursed treasure chest into the depths of the Pacific Ocean.",
    rationalization: "Speaks Rizal's definitive political thesis: 'What is the use of independence if the slaves of today will become the tyrants of tomorrow? Only love, virtue, and sacrifice can save us.'",
    mnemonic: { title: "Padre Florentino Thesis", phrase: "Slaves Today into Tyrants Tomorrow", items: ["P - Padre Florentino", "T - Threw treasures to sea", "V - Virtue before independence"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Kabesang Tales (Telesforo Juan de Dios)",
    definition: "The industrious farmer in El Filibusterismo whose cleared land is stolen through successive rent hikes by friar landlords, driving him to join the outlaws as 'Matanglawin'.",
    rationalization: "Symbolizes agrarian injustice, peasant dispossession, and armed resistance to land-grabbing friar corporations in colonial Philippines.",
    mnemonic: { title: "Kabesang Tales", phrase: "Dispossessed Farmer Turned Matanglawin", items: ["K - Kabesang Tales", "M - Matanglawin", "A - Agrarian dispossession victim"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Juli (Juliana de Dios)",
    definition: "The innocent, virtuous daughter of Kabesang Tales and sweetheart of Basilio who leaps to her death from the convent tower of Tiani to preserve her honor from Padre Camorra.",
    rationalization: "Represents pure, defenseless Filipino womanhood victimized by the predatory lust of the monastic clergy.",
    mnemonic: { title: "Juli's Sacrifice", phrase: "Chastity Over Friar Predation", items: ["J - Juli", "C - Camorra escape", "T - Tower leap at Tiani"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Isagani",
    definition: "The passionate, idealistic poet and student leader in El Filibusterismo who sabotages Simoun's explosive lamp plot at the wedding banquet to save his former sweetheart Paulita Gomez.",
    rationalization: "Contrasted with the pragmatic Basilio; Isagani champions high ideals and student rights to an academy of the Spanish language, but allows emotional attachment to thwart the revolution.",
    mnemonic: { title: "Isagani the Poet", phrase: "Threw the Bomb into the River", items: ["I - Isagani", "P - Paulita Gomez love", "L - Lamp bomb thrown into river"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine characters, themes, and social commentary in El Filibusterismo",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Annotations to Morga's Sucesos de las Islas Filipinas (1890)",
    definition: "Rizal's scholarly historical work in Paris where he hand-copied, footnoted, and corrected Antonio de Morga's 1609 book to prove that Filipinos possessed advanced civilization prior to Spanish arrival.",
    rationalization: "A monumental work of nationalist historiography demonstrating indigenous literacy, seafaring trade, metalcraft, and ethical customs before Spanish conquest.",
    mnemonic: { title: "Morga Annotations", phrase: "British Museum Proof of Native Civilized Past", items: ["M - Morga's 1609 text", "B - British Museum research", "P - Pre-colonial civilized glory"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Evaluate Rizal's historical scholarship and annotations of Morga",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "Sobre la Indolencia de los Filipinos (On the Indolence of the Filipinos, 1890)",
    definition: "Rizal's brilliant socio-economic treatise published in La Solidaridad refuting the racist Spanish assertion that native Filipinos are inherently lazy.",
    rationalization: "Rizal argued that native 'indolence' was a consequence, not a cause, of colonial ills: brutal tropical climate, forced labor, pirate raids, friar gambling monopolies, and denial of education.",
    mnemonic: { title: "Indolence Defense", phrase: "Indolence is an Effect, Not a Cause", items: ["S - Sobre la Indolencia", "C - Climate and colonial exploitation", "D - Defense of native industry"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's essays in La Solidaridad",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Filipinas Dentro de Cien Años (The Philippines A Century Hence, 1889-1890)",
    definition: "Rizal's prophetic essay in La Solidaridad forecasting that if Spain failed to grant liberal reforms and press freedom, the Philippines would declare independence and the United States would intervene.",
    rationalization: "Remarkably predicted the Spanish-American War of 1898 and American geopolitical expansion into the Pacific a decade before it occurred.",
    mnemonic: { title: "Century Hence Prediction", phrase: "Predicted American Intervention a Decade Prior", items: ["100 Years - Century Hence", "P - Prophecy of revolution", "U - US imperial intervention forecast"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's essays in La Solidaridad",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "To the Young Women of Malolos (February 1889)",
    definition: "Rizal's famous letter written in Tagalog upon the request of Marcelo H. del Pilar, praising the 20 courageous Malolos women who petitioned Governor-General Weyler for a Spanish night school.",
    rationalization: "Emphasized women's crucial role as first educators of children, critical thinking over blind religious obedience, and civic duty for daughters and wives.",
    mnemonic: { title: "Women of Malolos", phrase: "Educated Mothers Build Free Nations", items: ["M - Malolos women", "W - Weyler petition", "E - Education over blind prayer"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's essays in La Solidaridad",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "La Liga Filipina (July 3, 1892)",
    definition: "The progressive civic association founded by Jose Rizal at the home of Doroteo Ongjunco in Ilaya Street, Tondo, Manila, uniting the archipelago into a compact, vigorous body.",
    rationalization: "Motto: 'Unus Instar Omnium' (One Like All); three days after its founding, Governor-General Eulogio Despujol ordered Rizal's immediate arrest and exile to Dapitan, splitting members into the Cuerpo de Compromisarios and the Katipunan.",
    mnemonic: { title: "La Liga Facts", phrase: "Unus Instar Omnium: One Like All", items: ["July 3, 1892 - Date founded", "Tondo - Place of birth", "D - Despujol deported Rizal"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine La Liga Filipina, deportation to Dapitan, and exile activities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Exile in Dapitan (1892-1896)",
    definition: "The four-year period where Rizal lived in Dapitan, Zamboanga del Norte, serving as physician, educator, agricultural engineer, naturalist, and community leader.",
    rationalization: "Rizal lived in fruitful isolation: built a gravity water system, established a free school for 16 boys, made a giant relief map of Mindanao in front of the parish church, and collected scientific specimens.",
    mnemonic: { title: "Dapitan Four Years", phrase: "Dapitan = Doctor, Teacher, Engineer, Scientist", items: ["1892-1896 - Four years", "W - Waterworks engineered", "R - Relief map of Mindanao"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine La Liga Filipina, deportation to Dapitan, and exile activities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Scientific Discoveries in Dapitan",
    definition: "The three animal species discovered by Rizal and named in his honor by European scientists: Draco rizali (flying lizard), Apogonia rizali (small beetle), and Rhacophorus rizali (tree frog).",
    rationalization: "Rizal shipped specimens of rare flora and fauna to the Dresden Museum in Germany in exchange for medical books and surgical instruments.",
    mnemonic: { title: "Rizali Species", phrase: "Draco (Lizard), Apogonia (Beetle), Rhacophorus (Frog)", items: ["D - Draco rizali (Lizard)", "A - Apogonia rizali (Beetle)", "R - Rhacophorus rizali (Frog)"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine La Liga Filipina, deportation to Dapitan, and exile activities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Josephine Bracken",
    definition: "The Irish woman who accompanied her blind foster father, George Taufer, to Dapitan for eye treatment, becoming Rizal's common-law wife and companion during his final years.",
    rationalization: "She bore Rizal a premature baby boy who died hours after birth, named Francisco; Rizal dedicated the poem 'Mi Retiro' and referred to her as his 'sweet foreigner' ('dulce extranjera') in Mi Ultimo Adios.",
    mnemonic: { title: "Josephine Bracken", phrase: "Dulce Extranjera in Final Hours", items: ["J - Josephine Bracken", "D - Dulce extranjera", "T - Taufer's adopted daughter"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine La Liga Filipina, deportation to Dapitan, and exile activities",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Dr. Pio Valenzuela's Secret Mission to Dapitan (June 1896)",
    definition: "The secret journey by the Katipunan emissary to consult Rizal regarding the planned armed uprising against Spain and a plan to rescue Rizal from exile.",
    rationalization: "Rizal cautioned against premature revolution without adequate firearms, military training, financial backing, and naval support, urging the Katipunan to enlist Antonio Luna's military expertise first.",
    mnemonic: { title: "Valenzuela in Dapitan", phrase: "Premature Without Weapons or Wealth", items: ["P - Pio Valenzuela", "K - Katipunan consultation", "C - Cautioned against premature war"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Examine La Liga Filipina, deportation to Dapitan, and exile activities",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Volunteer Medical Officer in Cuba",
    definition: "Rizal's accepted application to Governor-General Ramon Blanco to serve as a military surgeon in the Spanish army in Cuba during the yellow fever epidemic.",
    rationalization: "Rizal sought to leave Dapitan peacefully; however, while aboard the Isla de Panay bound for Cuba, the revolution broke out in Manila, and Blanco's successor, Camilo de Polavieja, ordered Rizal's arrest.",
    mnemonic: { title: "Cuba Mission", phrase: "Volunteer Doctor En Route to Arrest", items: ["C - Cuba yellow fever", "B - Blanco accepted offer", "P - Polavieja ordered court martial"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Lieutenant Luis Taviel de Andrade",
    definition: "The Spanish artillery lieutenant chosen by Rizal to act as his defense counsel during his court-martial trial before the Spanish military tribunal in Fort Santiago.",
    rationalization: "Brother of Jose Taviel de Andrade, Rizal's former Spanish bodyguard in 1887; courageously defended Rizal, arguing that there was zero direct evidence linking Rizal to the Katipunan rebellion.",
    mnemonic: { title: "Taviel Defense", phrase: "Taviel Defended Rizal with Honor", items: ["L - Luis Taviel de Andrade", "D - Defense counsel", "S - Spanish officer of noble honor"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Three Charges Against Rizal",
    definition: "The formal criminal accusations leveled against Rizal by Spanish Judge Advocate General Nicolas de la Peña: Rebellion, Sedition, and Illegal Association.",
    rationalization: "The court-martial found him guilty on all counts in a kangaroo trial and sentenced him to death by firing squad, approved by Governor-General Camilo de Polavieja.",
    mnemonic: { title: "Rizal's Three Charges", phrase: "RSI: Rebellion, Sedition, Illegal association", items: ["R - Rebellion", "S - Sedition", "I - Illegal association"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Governor-General Camilo de Polavieja",
    definition: "The reactionary, friar-backed Spanish Governor-General of the Philippines who signed Rizal's death warrant on December 28, 1896.",
    rationalization: "Known as the 'Christian General' by the friars but regarded as a ruthless butcher by Filipinos for executing dozens of revolutionary patriots.",
    mnemonic: { title: "Polavieja Death Warrant", phrase: "Polavieja Signed the Execution Order", items: ["P - Polavieja", "D - Death warrant signed", "D - December 28, 1896"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Mi Ultimo Adios (My Last Farewell)",
    definition: "Rizal's 14-stanza masterwork poem written without title or date inside his Fort Santiago cell on the eve of his execution, hidden inside an alcohol cooking stove.",
    rationalization: "Handed to his sister Trinidad with the whisper 'There is something inside'; Mariano Ponce gave it the title 'Mi Ultimo Pensamiento', while Father Mariano Dacanay titled it 'Ultimo Adios'.",
    mnemonic: { title: "Mi Ultimo Adios", phrase: "Hidden Inside the Alcohol Stove", items: ["14 Stanzas", "Trinidad handed the stove", "Bagumbayan farewell"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Bagumbayan (December 30, 1896, 7:03 AM)",
    definition: "The exact location, date, and time of Jose Rizal's execution by firing squad at the age of 35.",
    rationalization: "He requested to be shot facing the firing squad, which the military captain denied; at the moment of the rifle shots, he twisted his body to fall face upward, gazing into the dawn sky.",
    mnemonic: { title: "Execution Details", phrase: "Dec 30, 1896, 7:03 AM at Bagumbayan", items: ["Dec 30, 1896 - Date", "7:03 AM - Exact time", "Bagumbayan (Luneta) - Execution ground"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Consummatum Est!",
    definition: "The dramatic final Latin words uttered by Jose Rizal as the fatal bullets pierced his back, meaning 'It is finished!'.",
    rationalization: "The same words spoken by Jesus Christ on the cross (John 19:30), symbolizing his final sacrifice and the fulfillment of his life mission for the Filipino nation.",
    mnemonic: { title: "Final Words", phrase: "Consummatum Est = It is Finished", items: ["C - Consummatum Est", "I - It is finished", "L - Last words before falling"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze Rizal's trial, final days, and martyrdom",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Rizal's Retraction Controversy",
    definition: "The enduring historical debate regarding whether Rizal signed a formal Catholic retraction document renouncing Masonry and his religious writings hours before his execution.",
    rationalization: "Defended by Jesuit Father Vicente Balaguer who claimed he officiated a Catholic wedding for Rizal and Josephine; contested by nationalist historians citing handwriting discrepancies and the absence of the document in official registry archives until 1935.",
    mnemonic: { title: "Retraction Debate", phrase: "Did Rizal Retract or Die Unbroken?", items: ["B - Balaguer claimed retraction", "1935 - Document 'rediscovered'", "U - Unbroken patriot legacy"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Analyze historical controversies in Rizal's biography",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  },
  {
    term: "Criteria for Choosing the National Hero",
    definition: "The historical standards applied by the Taft Commission in 1901 when recognizing Rizal as the foremost National Hero over Andres Bonifacio, Emilio Aguinaldo, and Marcelo H. del Pilar.",
    rationalization: "Rizal was selected because he was an intellectual martyr whose pen ignited the national consciousness, embraced peace and reform over factional armed discord, and possessed worldwide stature.",
    mnemonic: { title: "National Hero Criteria", phrase: "Martyr of the Pen Who United All Regions", items: ["P - Pen over sword", "M - Martyrdom symbol", "U - United national appeal"] },
    source: "PRC BLEPT GenEd Rizal Reviewer",
    tosCompetency: "Evaluate criteria and historical recognition of Rizal as National Hero",
    bloomsTaxonomy: "Evaluating",
    highYield: true
  }
];

// Write The Life and Works of Rizal
writeDataset(
  'data/gened/life_works_rizal/life_works_rizal.json',
  'General Education',
  'The Life and Works of Rizal',
  'Rizal Law, Family, Higher Education, Novels, & Martyrdom',
  rizalItems
);
