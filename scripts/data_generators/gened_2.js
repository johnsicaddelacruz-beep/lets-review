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

// 2. Malayuning Komunikasyon sa Wikang Filipino (50 items)
const filipinoItems = [
  {
    term: "Ponema (Phoneme)",
    definition: "Ang pinakamaliit na makabuluhang yunit ng tunog sa isang wika na nagpapaiba ng kahulugan ng salita.",
    rationalization: "Kapag pinalitan ang isang ponema, nagbabago ang kahulugan ng salita (hal. paso vs paso o tela vs tila). May 21 ponema ang wikang Filipino (16 na katinig at 5 patinig).",
    mnemonic: { title: "Ponema Clue", phrase: "Tunog na Makabuluhan", items: ["P - Pinakamaliit", "T - Tunog", "M - Makabuluhang yunit"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagtukoy sa mga salik at yunit ng ponolohiya sa wikang Filipino",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Pares Minimal (Minimal Pairs)",
    definition: "Pares ng mga salita na magkatulad sa bigkas maliban sa isang ponema sa magkatulad na posisyon na nagiging sanhi ng pagkakaiba ng kahulugan.",
    rationalization: "Halimbawa: /pala/ at /bala/, /mesa/ at /misa/, /pantog/ at /bantog/. Ginagamit upang patunayang magkaibang ponema ang dalawang tunog.",
    mnemonic: { title: "Pares Minimal", phrase: "Iisang Ponema ang Kaibhan", items: ["P - Pareho halos lahat", "I - Isa lang ang kaibahan", "K - Kahulugan ay nagbago"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri ng mga pares minimal at tunog ng wika",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Diptonggo (Diphthong)",
    definition: "Tunog na nabubuo sa pagsasama ng anumang patinig (a, e, i, o, u) at ng malapatinig na /w/ o /y/ sa loob ng iisang pantig.",
    rationalization: "Ang mga diptonggo sa Filipino ay aw, iw, ay, ey, iy, oy, at uy sa iisang pantig (hal. si-daw, a-raw, ba-hay). Kapag nagkahiwalay ang pantig tulad ng ka-a-li-wan, hindi ito diptonggo.",
    mnemonic: { title: "Diptonggo Formula", phrase: "Patinig + W o Y sa Iisang Pantig", items: ["P - Patinig", "W - /w/ o /y/", "I - Iisang pantig"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagtukoy sa diptonggo at klaster sa pantig",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Klaster (Kambal-Katinig)",
    definition: "Magkasunod na dalawa o higit pang katinig sa loob ng iisang pantig.",
    rationalization: "Halimbawa: /pl/ sa pla-to, /tr/ sa tra-ba-ho, /kr/ sa kris-tal, /br/ sa bra-so. Karaniwang matatagpuan sa mga hiram na salita.",
    mnemonic: { title: "Klaster Clue", phrase: "Kambal-Katinig sa Isang Pantig", items: ["K - Katinig + Katinig", "I - Iisang pantig", "H - Hiram na salita kadalasan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagtukoy sa diptonggo at klaster sa pantig",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Ponemang Suprasegmental",
    definition: "Mga yunit ng tunog na karaniwang hindi tinutumbasan ng titik sa pagsulat tulad ng diin, tono/intonasyon, at antala/hinto na nagpapabago ng kahulugan.",
    rationalization: "Binubuo ng Diin (stress), Tono/Intonasyon (pitch), at Antala/Hinto (juncture). Nagbibigay-buhay at tamang damdamin sa pagbigkas.",
    mnemonic: { title: "Tatlong Suprasegmental", phrase: "Diin, Tono, Antala (DTA)", items: ["D - Diin (lakas ng bigkas)", "T - Tono (taas o baba ng tinig)", "A - Antala (saglit na paghinto)"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Paggamit ng ponemang suprasegmental sa tamang komunikasyon",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Antala o Hinto (Juncture)",
    definition: "Ang saglit na pagtigil sa pagsasalita upang higit na maging malinaw ang mensahe at maiwasan ang maling interpretasyon.",
    rationalization: "Halimbawa: 'Hindi, puti.' (It is not, it's white) vs 'Hindi puti.' (It is not white). Ang kuwit o slash ang sumisimbolo sa antala.",
    mnemonic: { title: "Antala Clue", phrase: "Hinto para sa Malinaw na Punto", items: ["A - Antala", "H - Hinto saglit", "K - Kuwit o slash"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Paggamit ng ponemang suprasegmental sa tamang komunikasyon",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Morpema (Morpheme)",
    definition: "Ang pinakamaliit na makabuluhang yunit ng salita na nagtataglay ng sariling kahulugan.",
    rationalization: "Maaaring isang salitang-ugat (hal. ganda), panlapi (hal. ma-, um-), o ponemang may kahulugan (hal. -a para sa babae tulad ng doktora).",
    mnemonic: { title: "Morpema vs Ponema", phrase: "Morpema = Salita/Yunit; Ponema = Tunog", items: ["M - Makabuluhang salita", "S - Salitang-ugat", "P - Panlapi"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kayarian at anyo ng morpema",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Asimilasyong Parsyal (Di-Ganap)",
    definition: "Pagbabagong morpoponemiko kung saan ang /ng/ ng panlaping pang-, mang-, sing- ay nagiging /m/ bago ang /p, b/ at /n/ bago ang /d, l, r, s, t/ nang hindi nawawala ang unang titik ng salitang-ugat.",
    rationalization: "Halimbawa: pang + paaralan = pampaaralan; sing + ganda = singganda; mang + dukot = mandukot. Nanatili ang p, b, d, l, r, s, t.",
    mnemonic: { title: "Asimilasyong Parsyal", phrase: "Titik ay Nagpalit, Salita ay Nanatili", items: ["P - Parsyal", "M - /m/ bago p/b", "N - /n/ bago d/l/r/s/t"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga uri ng pagbabagong morpoponemiko",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Asimilasyong Ganap",
    definition: "Pagbabagong morpoponemiko kung saan bukod sa pagbabago ng /ng/ sa /m/ o /n/, nawawala o nakakaltas pa ang unang titik ng salitang-ugat at napapaloob sa panlapi.",
    rationalization: "Halimbawa: pang + palo = pampalo -> pamalo; mang + dukot = mandukot -> manukot; pang + tali = pantali -> panali.",
    mnemonic: { title: "Asimilasyong Ganap", phrase: "Ganap na Nabura ang Unang Titik", items: ["G - Ganap", "K - Kinaltas ang unang titik", "P - Pamalo mula sa pampalo"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga uri ng pagbabagong morpoponemiko",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Metatesis (Paglilipat)",
    definition: "Pagbabagong morpoponemiko kung saan nagpapalitan ng posisyon ang dalawang ponema sa loob ng salita kapag kinabitan ng panlapi.",
    rationalization: "Halimbawa: in + lipad = nilipad (nagpalit ang /n/ at /l/); in + tanim = tinanim -> nitanim; tanim + an = tamnan.",
    mnemonic: { title: "Metatesis Clue", phrase: "Lipat ng Posisyon", items: ["M - Metatesis", "L - Lipat titik", "N - Nilipad mula sa inlipad"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga uri ng pagbabagong morpoponemiko",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Pagkakaltas ng Ponema",
    definition: "Pagbabagong morpoponemiko kung saan may nawawalang ponema o patinig sa loob ng salita kapag kinakabitan ng hulapi.",
    rationalization: "Halimbawa: takip + an = takpan (nawala ang /i/); sara + an = sarhan; dakip + an = dakpin (nawala ang /i/).",
    mnemonic: { title: "Pagkakaltas Clue", phrase: "Kaltas = Bawas Patinig", items: ["P - Pagkakaltas", "B - Bawas titik", "T - Takpan mula sa takipan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga uri ng pagbabagong morpoponemiko",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pagpapalit ng Ponema",
    definition: "Pagbabagong morpoponemiko kung saan ang isang ponema ay napapalitan ng isa pa, karaniwan ay /d/ tungo sa /r/ o /o/ tungo sa /u/.",
    rationalization: "Halimbawa: ma + dapat = marapat; tawa + han = tawanan (h -> n); lalo + han = laluan.",
    mnemonic: { title: "Pagpapalit Ponema", phrase: "D Nagiging R sa Pagitan ng Patinig", items: ["D - /d/ to /r/", "M - Marapat mula madapat", "P - Pagitan ng patinig"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga uri ng pagbabagong morpoponemiko",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Karaniwang Ayos ng Pangungusap",
    definition: "Ayos ng pangungusap sa Filipino kung saan nauuna ang Panaguri bago ang Paksa/Simuno nang walang panandang 'ay'.",
    rationalization: "Ito ang likas at orihinal na ayos ng pangungusap sa wikang Filipino. Halimbawa: 'Masipag mag-aral ang mga mag-aaral.'",
    mnemonic: { title: "Karaniwang Ayos", phrase: "Panaguri Muna, Walang 'AY'", items: ["P - Panaguri una", "S - Simuno huli", "W - Walang 'ay'"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa ayos ng pangungusap sa wikang Filipino",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Di-Karaniwang Ayos ng Pangungusap",
    definition: "Ayos ng pangungusap kung saan nauuna ang Paksa/Simuno bago ang Panaguri at ginagamitan ng panandang 'ay'.",
    rationalization: "Halimbawa: 'Ang mga mag-aaral ay masipag mag-aral.' Naaayon ito sa impluwensya ng wikang Ingles (S-V-O format).",
    mnemonic: { title: "Di-Karaniwan Ayos", phrase: "May 'AY', Simuno ang Una", items: ["S - Simuno una", "A - Ay pananda", "P - Panaguri huli"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa ayos ng pangungusap sa wikang Filipino",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Pokus sa Tagaganap (Aktor)",
    definition: "Pokus ng pandiwa kung saan ang paksa ng pangungusap ang mismong tagaganap o gumagawa ng kilos (gumagamit ng panlaping mag-, um-, mang-).",
    rationalization: "Halimbawa: 'Nagluto si Nanay ng masarap na sinigang.' Paksa: si Nanay (ang gumawa ng kilos).",
    mnemonic: { title: "Pokus sa Tagaganap", phrase: "Sino ang Gumawa ng Kilos?", items: ["T - Tagaganap", "M - Mag-, um-, mang-", "S - Si Nanay ang paksa"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pokus sa Layon (Gol)",
    definition: "Pokus ng pandiwa kung saan ang paksa ng pangungusap ay ang layon o direktang tumatanggap ng kilos (gumagamit ng panlaping -in, i-, -an).",
    rationalization: "Halimbawa: 'Niluto ni Nanay ang sinigang.' Paksa: ang sinigang (ang niluto).",
    mnemonic: { title: "Pokus sa Layon", phrase: "Ano ang Ginawa o Niluto?", items: ["L - Layon ang paksa", "I - -in, i-, -an", "A - Ang sinigang"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pokus sa Ganapan (Lokatib)",
    definition: "Pokus ng pandiwa kung saan ang paksa ng pangungusap ay ang lugar o pook na pinangyarihan ng kilos (panlaping pag-...-an, pinag-...-an).",
    rationalization: "Halimbawa: 'Pinaglutuan ni Nanay ng sinigang ang bagong kusina.' Paksa: ang bagong kusina.",
    mnemonic: { title: "Pokus sa Ganapan", phrase: "Saan Naganap ang Kilos?", items: ["G - Ganapan", "L - Lugar ang paksa", "P - Pinag-aralan/Pinaglutuan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pokus sa Tagatanggap (Benepaktib)",
    definition: "Pokus ng pandiwa kung saan ang paksa ay ang tao o bagay na pinaglalaanan o nakikinabang sa kilos (panlaping i-, ipag-).",
    rationalization: "Halimbawa: 'Ipinagluto ni Nanay ng sinigang ang kanyang pamilya.' Paksa: ang kanyang pamilya (ang nakinabang).",
    mnemonic: { title: "Pokus sa Tagatanggap", phrase: "Para Kanino ang Kilos?", items: ["B - Benepaktib", "P - Para kanino", "I - Ipinagluto"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pokus sa Gamit (Instrumental)",
    definition: "Pokus ng pandiwa kung saan ang paksa ay ang kasangkapan o instrumentong ginamit upang maisagawa ang kilos (panlaping ipang-).",
    rationalization: "Halimbawa: 'Ipinanghiwa niya ng karne ang matalim na kutsilyo.' Paksa: ang matalim na kutsilyo.",
    mnemonic: { title: "Pokus sa Gamit", phrase: "Anong Kasangkapan ang Ginamit?", items: ["I - Instrumental", "K - Kasangkapan", "P - Ipinanghiwa"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pokus sa Sanhi (Kawsatib)",
    definition: "Pokus ng pandiwa kung saan ang paksa ay ang dahilan, sanhi, o rason ng pagkaganap ng kilos (panlaping ika-, ikina-).",
    rationalization: "Halimbawa: 'Ikinatuwa ng guro ang mataas na marka ng mga bata.' Paksa: ang mataas na marka (ang dahilan).",
    mnemonic: { title: "Pokus sa Sanhi", phrase: "Bakit Naganap ang Kilos?", items: ["S - Sanhi", "D - Dahilan ang paksa", "I - Ikinatuwa / Ikinagalak"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pokus sa Direksyon",
    definition: "Pokus ng pandiwa kung saan ang paksa ay nagsasaad ng direksyon o patutunguhan ng kilos (panlaping -an, -in).",
    rationalization: "Halimbawa: 'Pinuntahan ng mag-aaral ang aklatan.' Paksa: ang aklatan (ang patutunguhan ng kilos).",
    mnemonic: { title: "Pokus sa Direksyon", phrase: "Saan Patungo ang Kilos?", items: ["D - Direksyon", "P - Patutunguhan", "P - Pinuntahan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa pitong pokus ng pandiwa",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Dayalek (Dialect)",
    definition: "Barayti ng wika na nalilikha dahil sa heograpikal na dimensiyon o pagkakaiba ng lokasyon at rehiyon.",
    rationalization: "Halimbawa: Tagalog-Bulacan vs Tagalog-Batangas ('Ala eh!') vs Tagalog-Maynila. Iba ang tono at ilang bokabularyo batay sa lugar.",
    mnemonic: { title: "Dayalek Clue", phrase: "Dayalek = Dibisyon ng Lugar", items: ["D - Dayalek", "L - Lugar o rehiyon", "B - Batangas Tagalog"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga barayti ng wika sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Idyolek (Idiolect)",
    definition: "Ang indibidwal, natatangi, at personal na paraan o tatak ng pagsasalita ng isang tao.",
    rationalization: "Halimbawa: 'Aha! Handa na ba kayo?' ni Korina Sanchez, 'Magandang Gabi Bayan' ni Noli de Castro, o ang boses ni Mike Enriquez.",
    mnemonic: { title: "Idyolek Clue", phrase: "Idyolek = Indibidwal na Tatak", items: ["I - Idyolek", "I - Indibidwal", "T - Tatak ng personalidad"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga barayti ng wika sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Sosyolek (Sociolect)",
    definition: "Barayti ng wika na nabubuo batay sa dimensiyong sosyal o katayuan sa lipunan ng pangkat ng mga tao.",
    rationalization: "Kabilang dito ang bekimon/gay lingo, salitang kanto, wika ng kabataan/jejemon, at conyo English-Tagalog ng mataas na antas sa lipunan.",
    mnemonic: { title: "Sosyolek Clue", phrase: "Sosyal na Grupo at Katayuan", items: ["S - Sosyolek", "S - Sektor panlipunan", "G - Gay lingo o conyo"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga barayti ng wika sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Ekolek (Ecolect)",
    definition: "Barayti ng wika na karaniwang sinasalita at ginagamit lamang sa loob ng tahanan o pamilya.",
    rationalization: "Halimbawa: 'pappy', 'momsy', 'palanggana', 'itaktak mo', o mga pantanging tawag sa mga gamit sa loob ng sariling bahay.",
    mnemonic: { title: "Ekolek Clue", phrase: "Eko = Tahanan at Bahay", items: ["E - Ekolek", "T - Tahanan", "P - Pamilya"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga barayti ng wika sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Etnolek (Ethnolect)",
    definition: "Barayti ng wika na nadedebelop mula sa mga salita ng mga etnolingguwistikong grupo.",
    rationalization: "Halimbawa: 'vakuul' (panakip sa ulo ng mga Ivatan sa Batanes), 'palangga' (mahal sa Bisaya), 't'nalak' ng mga T'boli.",
    mnemonic: { title: "Etnolek Clue", phrase: "Etniko at Katutubong Grupo", items: ["E - Etnolek", "E - Etnikong grupo", "V - Vakuul ng Ivatan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga barayti ng wika sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Register ng Wika",
    definition: "Barayti ng wika kung saan ang kahulugan ng salita ay umaangkop batay sa partikular na larangan, propesyon, o disiplina.",
    rationalization: "Ang salitang 'mouse' ay hayop sa biyolohiya, ngunit kagamitang pang-kompyuter sa Information Technology. Ang 'appeal' ay iba sa batas kaysa sa karaniwang buhay.",
    mnemonic: { title: "Register Clue", phrase: "Propesyon at Larangan", items: ["R - Register", "P - Propesyon", "D - Disiplina ng salita"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga barayti ng wika sa Pilipinas",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Pidgin (Nobody's Native Language)",
    definition: "Isang bagong wika na nabubuo kapag ang dalawang tagapagsalita na may magkaibang wika ay nagtangkang mag-usap nang walang komong wika.",
    rationalization: "Kilala bilang 'makeshift language'; walang pormal na balarila (hal. 'Ikaw bili tinda, ako bigay tawad'). Walang katutubong tagapagsalita.",
    mnemonic: { title: "Pidgin vs Creole", phrase: "Pidgin = Walang Katutubong Tagapagsalita; Creole = Naging Katutubo", items: ["P - Pidgin: pansamantala", "C - Creole: naging unang wika"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagtukoy sa pinagmulan at ebolusyon ng pidgin at creole",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Creole (Chavacano)",
    definition: "Isang pidgin na lumawak, nagkaroon ng pormal na balarila, at naging unang wika (katutubong wika) ng isang komunidad.",
    rationalization: "Ang Chavacano sa Zamboanga at Cavite ay isang creole na pinaghalong wikang Espanyol at katutubong wika sa Pilipinas.",
    mnemonic: { title: "Creole Halimbawa", phrase: "Chavacano ng Zamboanga", items: ["C - Creole", "C - Chavacano", "K - Katutubong wika na"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagtukoy sa pinagmulan at ebolusyon ng pidgin at creole",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Saligang Batas ng 1987 (Artikulo XIV Seksiyon 6)",
    definition: "Ang probisyong nagtatadhana na 'Ang wikang pambansa ng Pilipinas ay Filipino. Samantalang nililinang, ito ay dapat payabungin at pagyamanin pa salig sa umiiral na wika sa Pilipinas at sa iba pang mga wika.'",
    rationalization: "Ito ang legal na batayan ng kasalukuyang pambansang wika ng Pilipinas na binabaybay bilang 'Filipino' (may letrang F).",
    mnemonic: { title: "1987 Art. XIV Sek. 6", phrase: "Filipino ang Wikang Pambansa", items: ["F - Filipino", "14 - Artikulo XIV", "6 - Seksiyon 6"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kasaysayan at batas ng Wikang Pambansa",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Saligang Batas ng 1987 (Artikulo XIV Seksiyon 7)",
    definition: "Nagtatakda na ukol sa mga layunin ng komunikasyon at pagtuturo, ang mga wikang opisyal ng Pilipinas ay Filipino at, hangga't walang ibang itinatadhana ang batas, Ingles.",
    rationalization: "Kaya dalawa ang opisyal na wika ng pamahalaan at edukasyon sa Pilipinas: Filipino at Ingles.",
    mnemonic: { title: "Artikulo XIV Sek. 7", phrase: "Opisyal: Filipino at Ingles", items: ["7 - Seksiyon 7", "O - Opisyal na wika", "F - Filipino + Ingles"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kasaysayan at batas ng Wikang Pambansa",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Manuel L. Quezon",
    definition: "Ang Pangulo ng Komonwelt na kinikilala bilang 'Ama ng Wikang Pambansa' dahil sa kanyang pagsusumikap na magtatag ng isang pambansang wika.",
    rationalization: "Nilagdaan niya ang Kautusang Tagapagpaganap Blg. 134 noong Disyembre 30, 1937 na nagpoproklama sa Tagalog bilang batayan ng wikang pambansa.",
    mnemonic: { title: "Ama ng Wikang Pambansa", phrase: "Quezon = Tagalog Batayan", items: ["M - Manuel Quezon", "A - Ama ng Wikang Pambansa", "134 - EO 134 noong 1937"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kasaysayan at batas ng Wikang Pambansa",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Lope K. Santos",
    definition: "Kinikilalang 'Ama ng Balarilang Filipino' na sumulat ng 'Balarila ng Wikang Pambansa' at lumikha ng orihinal na Abakada na may 20 titik.",
    rationalization: "Ang Abakada ni Lope K. Santos ay binubuo ng 5 patinig (a, e, i, o, u) at 15 katinig (b, k, d, g, h, l, m, n, ng, p, r, s, t, w, y).",
    mnemonic: { title: "Ama ng Balarila", phrase: "Lope K. Santos = Abakada", items: ["L - Lope K. Santos", "B - Balarila", "A - Abakada na may 20 titik"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kasaysayan at batas ng Wikang Pambansa",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Kautusang Pangkagawaran Blg. 7 (1959)",
    definition: "Ipinatupad ni Kalihim Jose E. Romero ng Edukasyon na nag-aatas na kailanman at tutukuyin ang Wikang Pambansa, ang salitang 'Pilipino' (may letrang P) ang gagamitin.",
    rationalization: "Layunin nitong alisin ang rehiyonalistikong tatak ng salitang 'Tagalog' upang maging katanggap-tanggap sa buong bansa.",
    mnemonic: { title: "Romero Memo 1959", phrase: "Pilipino may P ni Romero", items: ["R - Romero", "P - Pilipino", "7 - Kautusan Blg. 7"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kasaysayan at batas ng Wikang Pambansa",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Komisyon sa Wikang Filipino (KWF / RA 7104)",
    definition: "Ang ahensya ng pamahalaan na nilikha noong 1991 alinsunod sa Saligang Batas upang magsagawa, mag-ugnay, at magtaguyod ng mga pananaliksik para sa pagpapaunlad ng Filipino.",
    rationalization: "Pinalitan nito ang Linangan ng mga Wika sa Pilipinas (LWP) at ang dating Surian ng Wikang Pambansa (SWP).",
    mnemonic: { title: "KWF Batas", phrase: "RA 7104 = Komisyon sa Wikang Filipino", items: ["7104 - Batas Republika", "K - KWF", "P - Pananaliksik at pagpapaunlad"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa kasaysayan at batas ng Wikang Pambansa",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Salawikain (Proverb)",
    definition: "Mga butil ng karunungang minana sa mga ninuno na naglalaman ng aral, talinghaga, at patnubay sa tamang pamumuhay.",
    rationalization: "Halimbawa: 'Aanhin pa ang damo kung patay na ang kabayo.' Nagtuturo ng mabuting asal gamit ang matalinhagang salita.",
    mnemonic: { title: "Salawikain Clue", phrase: "Aral at Talinghaga ng Ninuno", items: ["S - Salawikain", "A - Aral sa buhay", "T - Talinghaga"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa mga anyo ng katutubong panitikan",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Sawikain (Idyoma)",
    definition: "Mga salita o pahayag na may nakatagong kahulugan at hindi maaaring unawain nang literal.",
    rationalization: "Halimbawa: 'balat-sibuyas' (maramdamin), 'buto't balat' (payat na payat), 'ilaw ng tahanan' (ina).",
    mnemonic: { title: "Sawikain vs Salawikain", phrase: "Sawikain = Idyoma; Salawikain = Aral", items: ["S - Sawikain = Idyoma (figurative)", "S - Salawikain = Aral (moral lesson)"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa mga anyo ng katutubong panitikan",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Florante at Laura ni Francisco Balagtas",
    definition: "Isang dakilang awit na binubuo ng 12 pantig bawat taludtod, tumatalakay sa pag-iibigan nina Florante at Laura at alegorya ng kalupitan ng Espanya sa Pilipinas.",
    rationalization: "Si Francisco Balagtas Baltazar ang 'Prinsipe ng Makatang Tagalog'. Sinulat niya ito habang nakabilanggo at inihandog kay Selya (Maria Asuncion Rivera).",
    mnemonic: { title: "Awit ni Balagtas", phrase: "12 Pantig, Florante at Laura", items: ["12 - Labindalawang pantig", "A - Awit", "B - Balagtas"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa mga akdang pampanitikan sa Pilipinas",
    bloomsTaxonomy: "Understanding",
    highYield: true
  },
  {
    term: "Ibong Adarna",
    definition: "Isang tanyag na korido na may sukat na 8 pantig bawat taludtod, tungkol sa mahiwagang ibon na nagpapagaling ng karamdaman ng Hari ng Berbanya sa pamamagitan ng awit.",
    rationalization: "Si Don Juan ang bunso at pinakamatapat na prinsipe na nakahuli sa Adarna gamit ang labaha at dayap upang hindi makatulog at maging bato.",
    mnemonic: { title: "Awit vs Korido", phrase: "Awit = 12 pantig (mabagal); Korido = 8 pantig (mabilis)", items: ["A - Awit: 12 pantig (Florante)", "K - Korido: 8 pantig (Adarna)"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa mga akdang pampanitikan sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Biag ni Lam-ang",
    definition: "Ang pinakatanyag na epiko ng mga Ilokano tungkol sa bayaning si Lam-ang na nakapagsasalita na noong sanggol pa lamang at nagtataglay ng mahiwagang tandang at aso.",
    rationalization: "Sinulat/itinala ni Pedro Bukaneg, ang 'Ama ng Panitikang Ilokano'. Nilamon si Lam-ang ng isdang berkakan ngunit muling nabuhay mula sa kanyang mga buto.",
    mnemonic: { title: "Biag ni Lam-ang", phrase: "Bukaneg, Ilokano, Berkakan", items: ["B - Bukaneg", "I - Ilokano", "L - Lam-ang at Ines Kannoyan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa mga epiko ng iba't ibang rehiyon sa Pilipinas",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teoryang Bow-wow",
    definition: "Teorya ng pinagmulan ng wika na nagsasaad na ang wika ay nagmula sa panggagaya ng tao sa mga tunog na nililikha ng kalikasan at hayop (hal. tahol ng aso, tilaok ng manok).",
    rationalization: "Ang mga sinaunang tao ay gumaya sa naririnig nilang tunog ng hayop sa paligid upang magpahiwatig ng mensahe.",
    mnemonic: { title: "Bow-wow Tunog", phrase: "Tahol ng Aso sa Kalikasan", items: ["B - Bow-wow", "A - Aso at hayop", "T - Tunog ng kalikasan"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga teorya ng pinagmulan ng wika",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teoryang Pooh-pooh",
    definition: "Teorya na nagsasaad na ang wika ay nagmula sa mga tunog na hindi sinasadyang naibubulalas ng tao dulot ng matinding damdamin tulad ng sakit, tuwa, sarap, o takot.",
    rationalization: "Halimbawa: 'Aray!' kapag nasaktan, o 'Ay!' kapag nagulat. Ang emosyon ang nagtulak sa unang paglikha ng tunog.",
    mnemonic: { title: "Pooh-pooh Emosyon", phrase: "Aray ng Damdamin", items: ["P - Pooh-pooh", "D - Damdamin at sakit", "A - Aray at sigaw"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga teorya ng pinagmulan ng wika",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teoryang Ding-dong",
    definition: "Teorya na nagsasaad na ang wika ay nagmula sa panggagaya ng tao sa mga tunog ng mga bagay na gawa ng tao o kapaligiran (hal. tunog ng kampana, lagaslas ng tubig).",
    rationalization: "Ipinanukala ni Max Muller; naniniwalang may misteryosong ugnayan ang tunog ng mga bagay sa paligid sa kahulugan nito.",
    mnemonic: { title: "Ding-dong Kampana", phrase: "Kling-klang ng mga Bagay", items: ["D - Ding-dong", "B - Bagay na walang buhay", "K - Kampana"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga teorya ng pinagmulan ng wika",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teoryang Yo-he-ho",
    definition: "Teorya na nagsasaad na ang wika ay nagmula sa mga tunog at ingay na nalilikha ng tao kapag nagtutulungan at gumagamit ng matinding puwersang pisikal.",
    rationalization: "Ipinanukala ni A.S. Diamond; kapag nagbubuhat ng mabigat na troso o nagtutulak ng bangka, naglalabas ng tunog ang tao tulad ng 'Heave-ho!'.",
    mnemonic: { title: "Yo-he-ho Puwersa", phrase: "Puwersang Pisikal at Bayanihan", items: ["Y - Yo-he-ho", "P - Pisikal na puwersa", "B - Buhat at tulak"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga teorya ng pinagmulan ng wika",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Teoryang Ta-ta",
    definition: "Teorya na nagsasaad na ang wika ay nagmula sa kumpas at galaw ng kamay ng tao na ginagaya ng dila at bibig.",
    rationalization: "Galing sa wikang Pranses na 'ta-ta' na nangangahulugang 'paalam' kung saan ang pagwawagayway ng kamay ay ginaya ng bibig.",
    mnemonic: { title: "Ta-ta Kumpas", phrase: "Kumpas ng Kamay Ginaya ng Dila", items: ["T - Ta-ta", "K - Kamay kumpas", "P - Paalam"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagkilala sa mga teorya ng pinagmulan ng wika",
    bloomsTaxonomy: "Remembering",
    highYield: true
  },
  {
    term: "Pahiwatig sa Kulturang Pilipino",
    definition: "Ang di-tuwirang paraan ng pagpapahayag ng damdamin o kaisipan sa pamamagitan ng mga pahiwatig, kilos, at pakiramdaman upang mapanatili ang kapayapaan at pakikisama.",
    rationalization: "Ipinaliwanag ni Dr. Melba Maggay na ang mga Pilipino ay gumagamit ng parinig, pasaring, paramdam, at papansin bilang bahagi ng mataas na konteksto ng komunikasyon.",
    mnemonic: { title: "Pahiwatig Konsepto", phrase: "Di-Direkta upang Di Makasakit", items: ["P - Pahiwatig", "P - Pakiramdaman", "M - Maggay pag-aaral"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Pagsusuri sa katutubong komunikasyon at sikolohiyang Pilipino",
    bloomsTaxonomy: "Analyzing",
    highYield: true
  },
  {
    term: "Pagkakaiba ng 'Nang' at 'Ng'",
    definition: "'Nang' ang ginagamit bilang kasingkahulugan ng 'noong', paraan ng kilos (paano), at sa inuulit na pandiwa; 'Ng' ang ginagamit bilang pananda ng layon at pag-aari.",
    rationalization: "Halimbawa: 'Takbo nang takbo' (inuulit na pandiwa); 'Kumain siya nang mabilis' (paano); 'Umalis siya nang dumating ako' (noong); samantalang 'Kumain siya ng mangga' (ng).",
    mnemonic: { title: "Nang vs Ng Tuntunin", phrase: "Nang = Noong / Paano / Paulit-ulit; Ng = Pag-aari / Layon", items: ["Nang = Noong, Paano, Paulit", "Ng = Niluluto, Ni Nanay"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Wastong gamit ng mga salita sa balarilang Filipino",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pagkakaiba ng 'May' at 'Mayroon'",
    definition: "'May' ang ginagamit kapag ang susunod na salita ay pangngalan, pandiwa, pang-uri, o pang-abay; 'Mayroon' ang ginagamit kapag may kataga sa pagitan, pambalana, o pamilang.",
    rationalization: "Halimbawa: 'May pera ako' (pangngalan) vs 'Mayroon ba siyang pera?' (may kataga) at sa maikling sagot na 'Mayroon.'",
    mnemonic: { title: "May vs Mayroon", phrase: "May Diretso Salita; Mayroon May Kataga", items: ["May + Pangngalan/Pandiwa", "Mayroon + Ba/Din/Rin"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Wastong gamit ng mga salita sa balarilang Filipino",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pagkakaiba ng 'Subukin' at 'Subukan'",
    definition: "'Subukin' ay nangangahulugang pagsusuri ng bisa o husay ng isang bagay/tao (to test); 'Subukan' ay pagmamanman o paniniktik nang lihim (to spy/monitor).",
    rationalization: "Halimbawa: 'Subukin natin ang bagong gamot' (test the medicine); 'Subukan mo kung saan pumupunta ang kapatid mo' (spy on your sibling).",
    mnemonic: { title: "Subukin vs Subukan", phrase: "Subukin ang Husay; Subukan ang Lakad ng Tao", items: ["Subukin = Test efficacy", "Subukan = Spy/observe secretly"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Wastong gamit ng mga salita sa balarilang Filipino",
    bloomsTaxonomy: "Applying",
    highYield: true
  },
  {
    term: "Pagkakaiba ng 'Pahirin' at 'Pahiran'",
    definition: "'Pahirin' ay pag-aalis o pagtatanggal ng dumi o luha; 'Pahiran' ay paglalagay o paglalahid ng bagay tulad ng mantikilya o gamot sa sugat.",
    rationalization: "Halimbawa: 'Pahirin mo ang iyong mga luha' (wipe off tears); 'Pahiran mo ng mantikilya ang tinapay' (apply butter).",
    mnemonic: { title: "Pahirin vs Pahiran", phrase: "Pahirin = Alisin; Pahiran = Lagyan", items: ["Pahirin = Remove/wipe off", "Pahiran = Apply/put on"] },
    source: "PRC BLEPT GenEd Filipino Reviewer",
    tosCompetency: "Wastong gamit ng mga salita sa balarilang Filipino",
    bloomsTaxonomy: "Applying",
    highYield: true
  }
];

// Write Malayuning Komunikasyon sa Wikang Filipino
writeDataset(
  'data/gened/malayuning_komunikasyon/malayuning_komunikasyon.json',
  'General Education',
  'Malayuning Komunikasyon sa Wikang Filipino',
  'Ponolohiya, Morpolohiya, Sintaksis, at Kasaysayan ng Wikang Pambansa',
  filipinoItems
);
