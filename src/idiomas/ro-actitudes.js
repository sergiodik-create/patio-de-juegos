/* Română: jocurile de atitudini din 57-actitudes.js și secțiunea „Distribuie” din zona pentru părinți (90-app.js). */
(()=>{
/* Ajutoare mici, doar pentru acest fișier. */
/* Numerele mici la feminin, în cuvinte: «câte două», «rămâne una». Toate lucrurile din SHARE_ITEMS sunt feminine,
   așa că «Câte…?», «una» și «două» se potrivesc mereu (și vocea nu mai spune «doi» în loc de «două»). */
const NF=[`zero`,`una`,`două`,`trei`,`patru`,`cinci`,`șase`,`șapte`,`opt`,`nouă`,`zece`];
const nf=n=>NF[+n]??String(n);
/* Acordul cu animăluțul: v.g este 'm' sau 'f' (din PETS). */
const ag=(v,m,f)=>v.g===`f`?f:m;

Object.assign(LANGS.ro.t,{
  /* ---------- numele de pe ușile jocurilor ---------- */
  '¿Qué harías tú?':'Tu ce ai face?',
  'Ayudar, compartir y hacer las paces':'Ajutăm, împărțim și ne împăcăm',
  'Reparte justo':'Împarte corect',
  'Lo mismo para cada uno':'La fel pentru fiecare',
  'Respira conmigo':'Respiră cu mine',
  'Para estar tranquilos':'Ca să ne liniștim',
  'Mi mascota':'Animăluțul meu',
  'Dale de comer, juega y cuídala':'Hrănește-l, joacă-te și îngrijește-l',

  /* tu ce ai face? (situațiile și răspunsurile sunt în HARIAS, mai jos) */
  '¿Qué otra cosa podrías hacer?':'Ce altceva ai putea face?',

  /* împarte corect ({cosas} vine cu articol: «căpșunile»; numărul de prieteni e între 2 și 4) */
  'Prueba a dar una a cada amigo, por turnos, hasta que se acaben.':'Încearcă să dai câte una fiecărui prieten, pe rând, până se termină toate.',
  'El niño tiene más que la niña. ¿Cuántas tiene que darle para que los dos tengan las mismas?':'Băiatul are mai multe decât fata. Câte trebuie să-i dea, ca să aibă amândoi la fel de multe?',
  'Si le da {x}, los dos tienen {y}. ¡Así es justo!':v=>`Dacă băiatul îi dă ${nf(v.x)}, amândoi au câte ${nf(v.y)}. Așa e corect!`,
  'Pista: cuenta cuántas tiene de más y reparte esa diferencia entre los dos.':'Indiciu: numără câte are băiatul în plus și împarte diferența aceea între ei doi.',
  'Íbamos a repartir {cosas} entre {n} amigos, pero llega uno más. ¿Cuántas le tocan ahora a cada uno, a partes iguales?':'Voiam să împărțim {cosas} la {n} prieteni, dar mai vine unul. Câte primește acum fiecare, dacă împărțim în părți egale?',
  'Ahora son {m} amigos: {k} para cada uno. ¡Siempre hay sitio para uno más!':v=>`Acum sunt ${v.m} prieteni: câte ${nf(v.k)} pentru fiecare. Mereu e loc pentru încă unul!`,
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas sobran?':'Împarte {cosas} la {n} prieteni, în părți egale. Câte rămân?',
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas le tocan a cada uno?':'Împarte {cosas} la {n} prieteni, în părți egale. Câte primește fiecare?',
  'Cada uno recibe {k} y sobra una. Se puede partir o guardar para luego.':v=>`Fiecare primește ${nf(v.k)} și rămâne una. O putem împărți în bucăți sau o putem păstra pentru mai târziu.`,
  'Cada uno recibe {k} y sobran {r}. Se pueden guardar para luego.':v=>`Fiecare primește ${nf(v.k)} și rămân ${nf(v.r)}. Le putem păstra pentru mai târziu.`,
  '{k} para cada uno. ¡Así es justo!':v=>`Câte ${nf(v.k)} pentru fiecare. Așa e corect!`,

  /* respiră cu mine */
  '🎈 Globo':'🎈 Balon',
  'Coge aire por la nariz… el globo se hincha.':'Trage aer pe nas… balonul se umflă.',
  'Suelta el aire despacito por la boca… el globo se deshincha.':'Lasă aerul să iasă încetișor pe gură… balonul se dezumflă.',
  '🌸 Flor y vela':'🌸 Floare și lumânare',
  'Huele la flor despacito por la nariz.':'Trage aer încetișor pe nas, ca să miroși floarea.',
  'Sopla la vela muy despacito.':'Suflă în lumânare foarte încetișor.',
  'Toca «Empezar» y respira conmigo.':'Atinge „Începe” și respiră cu mine.',
  'Empezar':'Începe',
  'Aguanta un poquito…':'Ține aerul puțin…',
  '¡Muy bien! Respirar despacio calma el cuerpo y la cabeza.':'Foarte bine! Când respiri încet, corpul și mintea se liniștesc.',
  'Puedes hacerlo siempre que sientas nervios o enfado.':'Poți face asta oricând ai emoții sau te superi.',

  /* animăluțul meu: {p} = «cățelușul tău», {P} = «Cățelușul tău».
     Butoanele nu primesc animalul, de aceea nu au pronume cu gen («Dă-i», nu «Culcă-l»). */
  'Dar de comer':'Dă-i de mâncare',
  '{P} tiene hambre.':'{P} vrea să mănânce.',
  '¡Ñam, ñam! ¡Qué rico!':'Mmm, ce bun!',
  'Dar agua':'Dă-i apă',
  '{P} tiene sed.':'{P} vrea să bea apă.',
  '¡Glu, glu! Ya no tiene sed.':'Gâl, gâl! Nu-i mai e sete.',
  'Jugar':'Joacă-te',
  '{P} quiere jugar.':'{P} vrea să se joace.',
  '¡Qué divertido! Le encanta jugar contigo.':'Ce distracție! Îi place tare mult să se joace cu tine.',
  'Bañar':'Fă-i baie',
  '{P} necesita un baño.':'{P} are nevoie de o baie.',
  '¡Ahora huele muy bien!':'Acum miroase foarte frumos!',
  'Dormir':'La somn',
  '{P} tiene sueño.':v=>`${v.P} e ${ag(v,`somnoros`,`somnoroasă`)}.`,
  'Shhh… Ya ha descansado.':'Șșș… Acum s-a odihnit.',
  'Dar mimos':'Dă-i o îmbrățișare',
  '{P} quiere mimos.':'{P} vrea o îmbrățișare.',
  'Le encantan tus mimos.':'Îi plac tare mult îmbrățișările tale.',
  'Elige tu mascota':'Alege-ți animăluțul',
  'Cambiar de mascota':'Schimbă animăluțul',
  '¡{P} está feliz! Cuidar de alguien es muy bonito.':v=>`${v.P} e ${ag(v,`fericit`,`fericită`)}! E foarte frumos să ai grijă de cineva.`,
  'Ahora no le apetece eso.':'Acum nu are chef de asta.',
  '¡A {p} le encanta!':'{P} se bucură tare mult!',
  '¡Hola! Soy {p}. ¿Me cuidas?':'Bună! Sunt {p}. Ai grijă de mine?',
  '¡{P} te ha echado de menos!':'{P} ți-a dus dorul!',

  /* ---------- 90-app.js: distribuie Locul de Joacă ---------- */
  'Compartir el Patio':'Distribuie Locul de Joacă',
  'Si te gusta, compártelo con otras familias, el cole o tu asociación. Es gratis para todos.':'Dacă îți place, trimite-l și altor familii, școlii, grădiniței sau asociației tale. Este gratuit pentru toată lumea.',
  '📤 Compartir el enlace':'📤 Trimite linkul',
  '🔳 Enseñar el código QR':'🔳 Arată codul QR',
  'Juegos educativos gratis para niños de 2 a 12 años, sin anuncios y sin registro.':'Jocuri educative gratuite pentru copiii de la 2 la 12 ani, fără reclame și fără cont.',
  'Enlace copiado. Pégalo donde quieras.':'Linkul a fost copiat. Lipește-l unde vrei.',
  'Escanéalo con la cámara del móvil para abrir el Patio.':'Scanează-l cu camera telefonului ca să deschizi Locul de Joacă.',

  /* ---------- pagina.html ---------- */
  '¿Te gusta? Compártelo con otras familias desde ⚙️.':'Îți place? Trimite-l și altor familii, din ⚙️.',
});

/* ---------- tu ce ai face? ----------
   După situație vine «Tu ce ai face?». Răspunsurile sunt la persoana întâi și fără gen («Mă bosumflu», nu «Sunt supărat»),
   ca să fie bune și pentru băieți, și pentru fete. Vocea le citește pe toate. */
LANGS.ro.data.HARIAS=[
  {e:'😢',s:'Un coleg plânge în pauză.',ok:['Mă apropii și îl întreb ce s-a întâmplat.','Când cineva e trist și îl întrebi ce are, se simte mai puțin singur.'],
    no:[['Râd de el.','Dacă râdem de cineva care plânge, se simte și mai rău.'],['Mă prefac că nu-l văd.','Dacă nimeni nu-l bagă în seamă, se simte singur.']]},
  {e:'🧍',s:'În clasă a venit o fetiță nouă și stă singură, pentru că nu cunoaște pe nimeni.',ok:['O invit să se joace cu noi.','Dacă o inviți, se simte binevenită. Și poate îți faci o prietenă nouă!'],
    no:[['Îi spun că nu are voie să se joace cu noi.','Când e lăsată deoparte, se simte tristă și singură.'],['Plec fără să spun nimic.','Dacă nimeni nu vorbește cu ea, îi va fi foarte greu să-și facă prieteni.']]},
  {e:'💥',s:'Fără să vrei, spargi un pahar acasă.',ok:['Spun ce s-a întâmplat și îmi cer iertare.','Să spui adevărul e un lucru curajos. Și așa un adult poate strânge cioburile fără să se taie cineva.'],
    no:[['Ascund cioburile.','Cioburile ascunse pot tăia pe cineva, iar dacă le ascunzi nu se rezolvă nimic.'],['Spun că a fost fratele meu.','Dacă dai vina pe altcineva, va fi certat cineva care nu a greșit. Nu e corect.']]},
  {e:'🧸',s:'Frățiorul tău vrea să se joace cu jucăria ta.',ok:['Ne jucăm împreună sau i-o împrumut puțin.','Când împarți, vă bucurați amândoi. Și apoi ți-o dă înapoi.'],
    no:[['I-o smulg din mână.','Dacă smulgi lucrurile din mână, îl poți răni, și totul se termină cu o ceartă.'],['Țip la el că e doar a mea.','Când țipi, se sperie și se întristează. Cu vorbe liniștite vă înțelegeți mai bine.']]},
  {e:'😠',s:'Un prieten îți ia mingea și te superi foarte tare.',ok:['Respir adânc și îi spun că m-a supărat.','Respirația adâncă te ajută să te liniștești. Iar dacă spui în cuvinte ce simți, celălalt te înțelege.'],
    no:[['Îl lovesc.','Când lovești, doare și nu rezolvi nimic. Supărarea se poate spune în cuvinte.'],['Îi stric ceva de-al lui.','Dacă îi strici lucrurile, îl întristezi, iar problema se face și mai mare.']]},
  {e:'🎨',s:'Prietena ta îți arată desenul ei, dar ție nu-ți place prea mult.',ok:['Îi spun un lucru care chiar îmi place la desenul ei.','Întotdeauna e ceva frumos de spus. Așa se bucură și are chef să deseneze mai departe.'],
    no:[['Îi spun că desenul e urât.','Vorbele urâte rănesc. Poți spune ce crezi și cu blândețe.'],['Râd de desenul ei în fața tuturor.','Dacă râzi de ea în fața celorlalți, se rușinează și se întristează tare.']]},
  {e:'👵',s:'Unei doamne în vârstă îi cad portocalele din sacoșă.',ok:['O ajut să le strângă.','Când ajuți pe cineva care are nevoie, lumea devine mai bună.'],
    no:[['Trec pe lângă ea.','Dacă nu o ajută nimeni, îi va fi foarte greu să le strângă singură.'],['Râd și merg mai departe.','Dacă râzi de ea când are o problemă, o faci să se simtă rău.']]},
  {e:'⚽',s:'Echipa ta pierde un meci.',ok:['Felicit cealaltă echipă.','Să știi să pierzi e un lucru de campioni. Data viitoare, dați tot ce puteți!'],
    no:[['Spun că au trișat.','Dacă acuzi fără motiv, ceilalți se supără și se strică jocul.'],['Mă bosumflu și plec fără să salut.','Dacă pleci așa, se strică distracția. Să mai și pierzi face parte din joc.']]},
  {e:'👛',s:'Găsești un portofel în parc.',ok:['Îl dau unui adult, ca să-l dea înapoi.','Așa, cel care l-a pierdut îl poate primi înapoi. Sigur îl caută!'],
    no:[['Îl păstrez pentru mine.','Nu e bine să păstrăm ce nu e al nostru: cel care l-a pierdut e îngrijorat.'],['Îl arunc la coșul de gunoi.','Așa, cel care l-a pierdut nu l-ar mai putea găsi niciodată.']]},
  {e:'🗣️',s:'Niște copii râd de alt copil din cauza felului în care vorbește.',ok:['Îi țin partea și anunț un adult.','Cine e luat în râs are nevoie de sprijin. Să-i spui unui adult nu înseamnă să pârăști: înseamnă să ajuți.'],
    no:[['Râd și eu cu ei.','Dacă râzi cu cei care îl iau în râs, copilul se simte și mai singur.'],['Îi spun că e vina lui.','Nu e vina lui că alții râd de el. Fiecare om vorbește în felul lui.']]},
  {e:'🧹',s:'Ai terminat joaca și camera e plină de jucării.',ok:['Strâng toate jucăriile.','Când strângi, ai grijă de lucrurile tale și ajuți acasă. Mâine le găsești pe toate!'],
    no:[['Le las să le strângă alții.','Acasă, toți ajutăm. Dacă fiecare strânge ce e al lui, e mai ușor.'],['Bag totul sub pat.','Așa jucăriile se pierd sau se strică. E mai bine ca fiecare lucru să stea la locul lui.']]},
  {e:'📘',s:'Prietenul tău nu înțelege un exercițiu pe care tu știi să-l faci.',ok:['Îi explic cum îl fac eu.','Să ajuți un prieten să învețe e un dar pentru amândoi.'],
    no:[['Îi spun că e prost.','Jignirile dor. Tuturor ne e mai greu să învățăm unele lucruri.'],['Îi spun că n-am de gând să-l ajut.','Dacă ne ajutăm unii pe alții, învățăm toți mai mult.']]},
  {e:'🤫',s:'Cineva îți cere să păstrezi un secret care te face să te simți rău.',ok:['Îi spun unui adult în care am încredere.','Secretele care ne fac să ne simțim rău nu se păstrează: se spun unui adult de încredere.'],
    no:[['Îl păstrez, chiar dacă mă întristează.','Un secret care te îngrijorează apasă greu. Când îl spui cuiva, îți e mai ușor.'],['Mă prefac că nu se întâmplă nimic.','Dacă te prefaci că nu e nimic, problema nu dispare. Un adult te poate ajuta.']]},
  {e:'🐶',s:'Vezi un cățeluș fără apă, într-o zi foarte călduroasă.',ok:['Chem un adult ca să-i pună apă.','Și animalelor le e cald și le e sete. Toți trebuie să avem grijă de ele.'],
    no:[['Nu fac nimic.','Cățelușul suferă din cauza căldurii și are nevoie de ajutor.'],['Îl necăjesc ca să latre.','Când necăjești animalele, se sperie, iar cățelușului îi e deja greu.']]},
  {e:'🍬',s:'Sunt trei bomboane, iar voi sunteți trei prieteni.',ok:['Luăm câte una fiecare.','Când împărțim în mod egal, e corect și toți sunt mulțumiți.'],
    no:[['Mănânc două.','Dacă mănânci două, un prieten rămâne fără bomboană.'],['Le mănânc pe toate.','Așa prietenii tăi ar rămâne fără nimic și s-ar întrista.']]},
  {e:'🛝',s:'E o coadă mare la tobogan.',ok:['Îmi aștept rândul.','E corect să-ți aștepți rândul: toți vor să se joace.'],
    no:[['Mă bag în față.','Nu e corect să te bagi în față când alții așteaptă de mult.'],['Îi împing pe ceilalți ca să urc mai repede.','Dacă împingi, cineva poate să cadă și să se lovească.']]},
  {e:'🗑️',s:'Vezi hârtii aruncate pe jos în parc.',ok:['Le arunc la coșul de gunoi.','Așa parcul rămâne curat pentru toți, și pentru animale.'],
    no:[['Arunc și eu pe jos ambalajul meu.','Gunoiul de pe jos murdărește parcul și poate face rău animalelor.'],['Le las acolo și plec.','Dacă fiecare ajută puțin, parcul e mereu curat.']]},
  {e:'👟',s:'Cineva te ajută să-ți legi șireturile.',ok:['Îi mulțumesc.','Când spui „mulțumesc”, cel care te-a ajutat se simte bine.'],
    no:[['Nu spun nimic.','Dacă nu mulțumești, poate crede că nu ți-a plăcut că te-a ajutat.'],['Îi spun că le-a legat prost.','Chiar dacă nu iese perfect, te-a ajutat cu drag.']]},
  {e:'😟',s:'I-ai spus ceva urât prietenului tău și acum e trist.',ok:['Îi cer iertare.','Când ceri iertare, lucrurile se repară. Toți greșim uneori!'],
    no:[['Mă prefac că nu s-a întâmplat nimic.','Dacă nu vorbiți despre asta, prietenul tău rămâne trist.'],['Îi spun că exagerează.','Ce simte el e important. E mai bine să-l asculți și să-i ceri iertare.']]},
  {e:'🚌',s:'În autobuz urcă un bunic și nu mai sunt locuri libere.',ok:['Îi dau locul meu.','E un gest foarte frumos să-i dai locul cuiva care are mai multă nevoie de el.'],
    no:[['Mă prefac că nu-l văd.','Dacă nimeni nu-l observă, va trebui să stea în picioare tot drumul.'],['Îi spun să aștepte.','Îi e greu să stea în picioare cât timp autobuzul merge.']]}];

/* ---------- împarte corect ----------
   Numele merge la plural și cu articol («căpșunile»): «Împarte căpșunile la 3 prieteni…».
   Toate sunt feminine, ca să se potrivească «Câte…?» și «rămâne una». Fără 🍪 (biscuiți e masculin) și fără 🍒 🍇. */
LANGS.ro.data.SHARE_ITEMS=[{e:'🍓',n:'căpșunile'},{e:'🍬',n:'bomboanele'},{e:'🧁',n:'brioșele'},{e:'🍰',n:'prăjiturile'},{e:'🍌',n:'bananele'},{e:'🍊',n:'portocalele'}];

/* ---------- animăluțul meu ----------
   n: numele de pe buton; p: «al tău» cu literă mică (în frază); g: genul, pentru «fericit/fericită». */
LANGS.ro.data.PETS=[{e:'🐶',n:'Cățeluș',p:'cățelușul tău',g:'m'},{e:'🐱',n:'Pisicuță',p:'pisicuța ta',g:'f'},{e:'🐰',n:'Iepuraș',p:'iepurașul tău',g:'m'},
  {e:'🐢',n:'Țestoasă',p:'țestoasa ta',g:'f'},{e:'🐹',n:'Hamster',p:'hamsterul tău',g:'m'},{e:'🐥',n:'Puișor',p:'puișorul tău',g:'m'}];
})();
