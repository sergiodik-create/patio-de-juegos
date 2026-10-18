/* Română: jocurile cu întrebări (20-preguntas.js) și listele de bază (10-datos.js). */
(()=>{
/* Genitivul țărilor, pentru «capitala Franței» (lista CAPITALS de mai jos are țările la nominativ). */
const GEN=Object.fromEntries([['România','României'],['Republica Moldova','Republicii Moldova'],['Ungaria','Ungariei'],
  ['Bulgaria','Bulgariei'],['Serbia','Serbiei'],['Ucraina','Ucrainei'],['Spania','Spaniei'],['Franța','Franței'],
  ['Italia','Italiei'],['Portugalia','Portugaliei'],['Germania','Germaniei'],['Austria','Austriei'],['Grecia','Greciei'],
  ['Polonia','Poloniei'],['Regatul Unit','Regatului Unit'],['Irlanda','Irlandei'],['Olanda','Olandei'],['Norvegia','Norvegiei'],
  ['Suedia','Suediei'],['Turcia','Turciei'],['Egipt','Egiptului'],['Maroc','Marocului'],['Kenya','Kenyei'],['Nigeria','Nigeriei'],
  ['Statele Unite','Statelor Unite'],['Canada','Canadei'],['Mexic','Mexicului'],['Brazilia','Braziliei'],
  ['Argentina','Argentinei'],['Columbia','Columbiei'],['Peru','Perului'],['Cuba','Cubei'],['Japonia','Japoniei'],
  ['China','Chinei'],['India','Indiei'],['Australia','Australiei'],['Noua Zeelandă','Noii Zeelande']]);
const gen=c=>GEN[c]||'țării '+c;
/* Unde trăiește: după «în» sau «la» substantivul nu mai are articol (în mare, la fermă). */
const LOC={'marea':'în mare','ferma':'la fermă','jungla':'în junglă','polul':'la pol'};
/* «o pasăre», dar «un mamifer» */
const FEM=['pasăre','reptilă','insectă'];

Object.assign(LANGS.ro.t,{
  /* 10-datos.js: întrebări dintr-o listă (spațiul, natura) */
  'La respuesta es: {a}.':'Răspunsul este: {a}.',
  'No es esa. Prueba otra vez.':'Nu e bine. Mai încearcă o dată.',

  /* numele și descrierea jocurilor */
  'Colores':'Culori',
  'Toca el color':'Atinge culoarea',
  'Animales':'Animale',
  '¿Quién hace ese ruido?':'Cine face așa?',
  'Contar':'Numărăm',
  'Formas':'Forme',
  'Círculo, estrella, corazón…':'Cerc, stea, inimă…',
  'Grande y pequeño':'Mare și mic',
  'El cielo':'Cerul',
  'Sol, luna y cohetes':'Soare, lună și rachete',
  'Primera letra':'Prima literă',
  'Completa la palabra':'Completează cuvântul',
  'Sumas':'Adunări',
  'Junta y cuenta':'Pune laolaltă și numără',
  'Restas':'Scăderi',
  '¿Cuántas quedan?':'Câte rămân?',
  'Completa la fila':'Completează șirul',
  'Series':'Modele',
  'Mayor o menor':'Mai mare sau mai mic',
  '¿Cuál sobra?':'Care e intrusul?',
  'Lógica: busca el intruso':'Logică: găsește intrusul',
  '¿Dónde vive?':'Unde trăiește?',
  'Mar, selva, granja, polo':'Mare, junglă, fermă, pol',
  'Tablas':'Tabla înmulțirii',
  'Multiplicar del 2 al 10':'Înmulțiri de la 2 la 10',
  'Cálculo mental':'Calcul mental',
  'Sumas y restas grandes':'Adunări și scăderi mari',
  'Secuencias':'Șiruri de numere',
  'Lógica con números':'Logică cu numere',
  'Ortografía':'Ortografie',
  '¿Cómo se escribe?':'Cum se scrie?',
  'Capitales':'Capitale',
  'Países y ciudades':'Țări și orașe',
  'Seres vivos':'Viețuitoare',
  '¿Mamífero, ave o pez?':'Mamifer, pasăre sau pește?',
  'El espacio':'Spațiul',
  'Planetas y estrellas':'Planete și stele',
  'Naturaleza':'Natura',
  'Plantas, agua y animales':'Plante, apă și animale',

  /* culori ({c} este «roșu», «verde»…) */
  'Toca el {c}':'Atinge culoarea {c}',
  'Toca el color {c}':'Atinge culoarea {c}.',
  'Es el {c}.':'Este {c}.',
  'Ese es el {c}. Prueba otra vez.':'Acesta este {c}. Mai încearcă o dată.',

  /* animale ({a} vine cu articol: vaca, câinele) */
  '¿Quién dice «{s}»?':'Cine face „{s}”?',
  '¿Quién dice {s}?':'Cine face {s}?',
  '{a} dice {s}.':'{a} face {s}.',
  'Ese animal es {a}, que dice {s}. Prueba otra vez.':'Ai ales {a}, care face {s}. Mai încearcă o dată.',

  /* numărat */
  '¿Cuántas hay?':'Câte sunt?',
  '¿Cuántas hay? Toca las frutas para contar.':'Câte sunt? Atinge fructele ca să le numeri.',
  'Casi. Cuenta otra vez conmigo.':'Aproape! Mai numără o dată cu mine.',

  /* forme și cerul ({x} este «cercul», «luna»…) */
  'Toca {x}':'Atinge {x}',
  'Es {x}.':'Este {x}.',
  'Esa forma es {x}. Prueba otra vez.':'Ai ales {x}. Mai încearcă o dată.',
  '¡Es {x}!':'Este {x}!',
  'Eso es {x}. Prueba otra vez.':'Ai atins {x}. Mai încearcă o dată.',

  /* mare și mic */
  'Toca el {x}':'Atinge-l pe cel {x}',
  'grande':'mare',
  'pequeño':'mic',
  'Toca el grande':'Atinge-l pe cel mare.',
  'Toca el pequeño':'Atinge-l pe cel mic.',
  '¡Ese es el grande!':'Acesta este cel mare!',
  '¡Ese es el pequeño!':'Acesta este cel mic!',
  'Ese es pequeño. Busca el grande.':'Acesta e mic. Caută-l pe cel mare.',
  'Ese es grande. Busca el pequeño.':'Acesta e mare. Caută-l pe cel mic.',

  /* prima literă și litera care lipsește */
  '¿Con qué letra empieza?':'Cu ce literă începe?',
  '¿Con qué letra empieza {w}?':'Cu ce literă începe cuvântul {w}?',
  '{w} empieza con {l}.':'{w} începe cu litera {l}.',
  'No. Escucha: {w}. Prueba otra vez.':'Nu. Ascultă: {w}. Mai încearcă o dată.',
  '¿Qué letra falta?':'Ce literă lipsește?',
  '¿Qué letra falta en {w}?':'Ce literă lipsește din cuvântul {w}?',
  'Es la {l}: {w}.':'Este litera {l}: {w}.',
  'Escucha bien: {w}. Prueba otra vez.':'Ascultă bine: {w}. Mai încearcă o dată.',

  /* adunări și scăderi */
  '¿Cuántas hay en total?':'Câte sunt în total?',
  '¿Cuánto es?':'Cât fac?',
  '{a} más {b}. ¿Cuánto es?':'Cât fac {a} plus {b}?',
  '{a} más {b} son {s}.':'{a} plus {b} fac {s}.',
  'Casi. Cuenta todas despacio.':'Aproape! Numără-le pe toate, încet.',
  'Casi. Cuenta con los dedos desde el número grande.':'Aproape! Pornește de la numărul mai mare și numără mai departe pe degete.',
  'Había {a}. Se comen {b}. ¿Cuántas quedan?':v=>`Erau ${v.a}. Mâncăm ${+v.b===1?'unul':v.b}. Câte rămân?`,
  '{a} menos {b} son {r}.':'{a} minus {b} fac {r}.',
  'Cuenta las que siguen brillando.':'Numără-le pe cele care încă strălucesc.',
  '{a} menos {b}':'Cât fac {a} minus {b}?',
  'Casi. Cuenta hacia atrás despacio.':'Aproape! Numără înapoi, încet.',

  /* numărul care lipsește */
  '¿Qué número falta?':'Ce număr lipsește?',
  'Era el {n}.':'Era numărul {n}.',
  'Cuenta desde el principio.':'Numără de la început.',
  'Fíjate: va de {s} en {s}.':'Uite: crește din {s} în {s}.',

  /* modele care se repetă */
  '¿Qué viene después?':'Ce urmează?',
  '¡Has encontrado la serie!':'Ai găsit modelul!',
  'Mira cómo se repite y prueba otra vez.':'Uită-te cum se repetă și mai încearcă o dată.',

  /* mai mare sau mai mic */
  '¿Cuál es más grande?':'Care este cel mai mare?',
  '¿Cuál es más pequeño?':'Care este cel mai mic?',
  '¿Cuál es el número más grande?':'Care este cel mai mare număr?',
  '¿Cuál es el número más pequeño?':'Care este cel mai mic număr?',
  '{n} es el mayor.':'{n} este cel mai mare.',
  '{n} es el menor.':'{n} este cel mai mic.',
  'Piénsalo otra vez: mira primero cuántas cifras tiene.':'Mai gândește-te: uită-te întâi câte cifre are fiecare număr.',

  /* intrusul ({g} este «fructe», «animale»…) */
  '¿Cuál no es del grupo?':'Care nu face parte din grup?',
  'Los demás son {g}.':'Celelalte sunt {g}.',
  'Ese sí es del grupo. Busca el diferente.':'Acesta face parte din grup. Caută-l pe cel diferit.',

  /* unde trăiește? ({h} este «marea», «ferma»…: trăiește în mare, la fermă) */
  '¿Dónde vive {a}?':'Unde trăiește {a}?',
  '{a} vive en {h}.':v=>`${v.a} trăiește ${LOC[v.h]||'în '+v.h}.`,
  'Ahí no. Prueba otro lugar.':'Nu acolo. Încearcă alt loc.',

  /* tabla înmulțirii și calcul mental */
  '{a} por {b}':'Cât fac {a} ori {b}?',
  '{a} por {b} son {p}.':'{a} ori {b} fac {p}.',
  'No es esa. Piensa en la tabla del {a}.':'Nu e bine. Gândește-te la înmulțirea cu {a}.',
  '{a} más {b}':'Cât fac {a} plus {b}?',
  'Son {r}.':'Rezultatul este {r}.',
  'Revisa las unidades y las decenas.':'Verifică unitățile și zecile.',

  /* șiruri de numere: regula se spune după «Este 20:» */
  'suma {k} cada vez':'adunăm {k} de fiecare dată',
  'se multiplica por {m}':'înmulțim cu {m} de fiecare dată',
  'resta {k} cada vez':'scădem {k} de fiecare dată',
  'suma {a} y luego {b}':'adunăm {a}, apoi {b}, și tot așa',
  'son números al cuadrado':'sunt numere ridicate la pătrat',
  'cada número es la suma de los dos anteriores':'fiecare număr este suma celor două dinaintea lui',
  '¿Qué número sigue?':'Ce număr urmează?',
  'Es {n}: {r}.':'Este {n}: {r}.',
  'Mira cuánto cambia de uno a otro.':'Uită-te cu cât se schimbă de la un număr la altul.',

  /* ortografie */
  '¿Cuál está bien escrita?':'Care variantă este scrisă corect?',
  'Se escribe {w}.':'Se scrie {w}.',
  'Esa tiene una falta. Prueba la otra.':'Aceasta are o greșeală. Încearc-o pe cealaltă.',

  /* capitale ({c} vine la nominativ și se trece la genitiv: capitala Franței) */
  '¿Cuál es la capital de {c}?':v=>`Care este capitala ${gen(v.c)}?`,
  'La capital de {c} es {k}.':v=>`Capitala ${gen(v.c)} este ${v.k}.`,
  '{v} es otra capital. Prueba otra vez.':'{v} este capitala altei țări. Mai încearcă o dată.',

  /* viețuitoare ({k}: mamifer, pasăre, pește, reptilă sau insectă: un mamifer, o pasăre) */
  '¿Qué es {a}?':'Ce fel de animal este {a}?',
  '{a} es un {k}.':v=>`${v.a} este ${FEM.includes(v.k)?'o':'un'} ${v.k}.`,
  'No. Piensa cómo nace y cómo respira.':'Nu. Gândește-te cum se naște și cum respiră.',
});

/* ---------- liste de date (aceeași formă ca DATA.es din 10-datos.js) ---------- */
/* Culorile rămân la masculin singular (roșu, galben): se spun și în «balon {c}». */
LANGS.ro.data.COLORS=[
  {n:'roșu',c:'var(--red)'},{n:'albastru',c:'var(--blue)'},{n:'galben',c:'var(--yellow)'},
  {n:'verde',c:'var(--green)'},{n:'mov',c:'var(--purple)'},{n:'portocaliu',c:'var(--orange)'},{n:'roz',c:'var(--pink)'}];
/* Numele au articol hotărât: «Vaca face muu.» */
LANGS.ro.data.ANIMALS=[
  {e:'🐮',n:'vaca',s:'muuu'},{e:'🐶',n:'câinele',s:'ham ham'},{e:'🐱',n:'pisica',s:'miau'},
  {e:'🐷',n:'purcelul',s:'guiț guiț'},{e:'🐑',n:'oaia',s:'beee'},{e:'🦆',n:'rața',s:'mac mac'},
  {e:'🐸',n:'broasca',s:'oac oac'},{e:'🦁',n:'leul',s:'grrr'},{e:'🐔',n:'găina',s:'cotcodac'},
  {e:'🐴',n:'calul',s:'ihaha'},{e:'🐝',n:'albina',s:'bzzz'},{e:'🐍',n:'șarpele',s:'sss'}];
LANGS.ro.data.SHAPES=[
  {n:'cercul',svg:'<circle cx="50" cy="50" r="42"/>'},
  {n:'pătratul',svg:'<rect x="10" y="10" width="80" height="80" rx="6"/>'},
  {n:'triunghiul',svg:'<polygon points="50,8 94,90 6,90"/>'},
  {n:'steaua',svg:'<polygon points="50,5 61,38 96,38 68,59 79,93 50,72 21,93 32,59 4,38 39,38"/>'},
  {n:'inima',svg:'<path d="M50 88C20 65 5 48 5 30 5 15 17 5 30 5c10 0 17 6 20 13 3-7 10-13 20-13 13 0 25 10 25 25 0 18-15 35-45 58z"/>'},
  {n:'dreptunghiul',svg:'<rect x="4" y="26" width="92" height="48" rx="6"/>'}];
/* Cuvinte simple, cu litere mici, fără articol (umplu și jocul «Cuvinte ascunse»).
   Primul cuvânt al fiecărei litere este cel folosit la «Scriem litere» (litera C, de la casă),
   așa că primul C și primul G au sunetul tare (casă, găină). Ă și Â nu încep cuvinte, iar K, Q, W, X, Y lipsesc.
   Ș, Ț și Î sunt litere separate (vezi KEEP în ro-juegos.js): «șarpe» începe cu Ș, nu cu S. */
LANGS.ro.data.WORDS=[
  ['🐝','albină'],['🎈','balon'],['🏠','casă'],['🐬','delfin'],['🐘','elefant'],['🦋','fluture'],['🐔','găină'],['🦛','hipopotam'],
  ['❤️','inimă'],['🍦','înghețată'],['🧸','jucărie'],['🌙','lună'],['🍎','măr'],['👃','nas'],['🥚','ou'],['🐱','pisică'],
  ['🦆','rață'],['☀️','soare'],['🐍','șarpe'],['🚂','tren'],['🐢','țestoasă'],['🐻','urs'],['🐄','vacă'],['🦓','zebră'],
  ['✈️','avion'],['🦔','arici'],['🍌','banană'],['🐸','broască'],['🐞','buburuză'],['🐴','cal'],['🐶','câine'],['👑','coroană'],
  ['🍒','cireșe'],['🦕','dinozaur'],['🌸','floare'],['🐜','furnică'],['🦒','girafă'],['🐰','iepure'],['🦁','leu'],['🍋','lămâie'],
  ['🚗','mașină'],['🐒','maimuță'],['🥕','morcov'],['🐌','melc'],['☁️','nor'],['🐑','oaie'],['👓','ochelari'],['🐟','pește'],
  ['🐷','porc'],['🐧','pinguin'],['🚀','rachetă'],['⭐','stea'],['🍇','struguri'],['🐭','șoarece'],['🧦','șosete'],['🐯','tigru'],
  ['🥁','tobă'],['🦟','țânțar'],['☂️','umbrelă'],['🦄','unicorn'],['🦊','vulpe'],['🎻','vioară'],['🪁','zmeu']];
/* Vocalele pentru «Completează cuvântul» (cu ă, â și î, ca să se exerseze și ele). */
LANGS.ro.data.VOWELS='aăâeiîou';
/* Litere date ca variante greșite la «Prima literă» și folosite să umple «Cuvinte ascunse»:
   doar literele care au cuvinte bune pentru copii (fără Ă, Â, K, Q, W, X, Y). */
LANGS.ro.data.LETTERS='ABCDEFGHIÎJLMNOPRSȘTȚUVZ'.split('');
/* [desen, scrierea corectă, greșeala obișnuită]: â/î, ce/ci și ge/gi, che/chi și ghe/ghi, x, ea/ia, ie după vocală,
   înn-, cratima (mi-e, s-a, m-am) și diacriticele. Nicio greșeală nu este un cuvânt adevărat. */
LANGS.ro.data.SPELL=[
  ['🐶','câine','cîine'],['🍞','pâine','pîine'],['🎵','cântec','cîntec'],['🍲','mâncare','mîncare'],['✋','mână','mînă'],['🏞️','râu','rîu'],
  ['🍦','înghețată','ânghețată'],['👼','înger','ânger'],['👑','împărat','âmpărat'],['☁️','înnorat','înorat'],
  ['🚕','taxi','tacsi'],['📝','examen','egzamen'],['🎸','chitară','kitară'],['🔑','cheie','ceie'],['👓','ochelari','ocelari'],
  ['👂','ureche','urece'],['🧊','gheață','geață'],['🎒','ghiozdan','giozdan'],['🌰','ghindă','gindă'],
  ['🐰','iepure','epure'],['🌿','iarbă','earbă'],['⏰','ceas','cias'],['🧅','ceapă','ciapă'],['👜','geantă','giantă'],
  ['🪟','fereastră','ferestră'],['💡','idee','ideie'],['🌧️','ploaie','ploae'],['🛁','baie','bae'],['👩','femeie','femee'],
  ['🌲','pădure','padure'],['🥶','mi-e frig','mie frig'],['🍽️','mi-e foame','mie foame'],['🛌','s-a culcat','sa culcat'],
  ['🌅','m-am trezit','mam trezit']];
/* Țările stau la nominativ; întrebarea le trece la genitiv (vezi GEN mai sus). */
LANGS.ro.data.CAPITALS=[
  ['România','București'],['Republica Moldova','Chișinău'],['Ungaria','Budapesta'],['Bulgaria','Sofia'],['Serbia','Belgrad'],
  ['Ucraina','Kiev'],['Spania','Madrid'],['Franța','Paris'],['Italia','Roma'],['Portugalia','Lisabona'],['Germania','Berlin'],
  ['Austria','Viena'],['Grecia','Atena'],['Polonia','Varșovia'],['Regatul Unit','Londra'],['Irlanda','Dublin'],['Olanda','Amsterdam'],
  ['Norvegia','Oslo'],['Suedia','Stockholm'],['Turcia','Ankara'],['Egipt','Cairo'],['Maroc','Rabat'],['Kenya','Nairobi'],
  ['Nigeria','Abuja'],['Statele Unite','Washington'],['Canada','Ottawa'],['Mexic','Ciudad de México'],['Brazilia','Brasilia'],
  ['Argentina','Buenos Aires'],['Columbia','Bogota'],['Peru','Lima'],['Cuba','Havana'],['Japonia','Tokio'],['China','Beijing'],
  ['India','New Delhi'],['Australia','Canberra'],['Noua Zeelandă','Wellington']];
LANGS.ro.data.CLASSES=['mamifer','pasăre','pește','reptilă','insectă'];
LANGS.ro.data.CREATURES=[
  ['🐬','delfinul','mamifer'],['🦇','liliacul','mamifer'],['🐳','balena','mamifer'],['🐘','elefantul','mamifer'],['🐒','maimuța','mamifer'],
  ['🐧','pinguinul','pasăre'],['🦉','bufnița','pasăre'],['🦅','acvila','pasăre'],['🦢','lebăda','pasăre'],['🦜','papagalul','pasăre'],
  ['🦈','rechinul','pește'],['🐠','peștele-clovn','pește'],['🐡','peștele-balon','pește'],
  ['🐢','țestoasa','reptilă'],['🐍','șarpele','reptilă'],['🐊','crocodilul','reptilă'],['🦎','șopârla','reptilă'],
  ['🦋','fluturele','insectă'],['🐝','albina','insectă'],['🐜','furnica','insectă'],['🐞','buburuza','insectă']];
LANGS.ro.data.NUMWORDS=['zero','unu','doi','trei','patru','cinci','șase','șapte','opt','nouă','zece'];
LANGS.ro.data.SKY=[['☀️','soarele'],['🌙','luna'],['⭐','steaua'],['☁️','norul'],['🚀','racheta'],['🪐','planeta'],['🌈','curcubeul'],['✈️','avionul']];
/* n se spune în «Celelalte sunt fructe.» */
LANGS.ro.data.GROUPS=[
  {n:'fructe',items:['🍎','🍌','🍇','🍓','🍐','🍒','🍉']},{n:'animale',items:['🐶','🐱','🐮','🐷','🐴','🐑','🐸']},
  {n:'mijloace de transport',items:['🚗','🚌','🚲','🚂','✈️','🚀','🚜']},{n:'haine',items:['👕','👖','👗','🧦','🧢','👟','🧤']},
  {n:'instrumente muzicale',items:['🎸','🥁','🎺','🎻','🎹','🪇']}];
/* Pe butoane se văd cu articol (marea, ferma); răspunsul spune «în mare», «la fermă» (vezi LOC mai sus). */
LANGS.ro.data.HABITATS=[['🌊','marea'],['🚜','ferma'],['🌴','jungla'],['❄️','polul']];
LANGS.ro.data.HABITANTS=[['🐙','caracatița','marea'],['🐠','peștele-clovn','marea'],['🐬','delfinul','marea'],['🦀','crabul','marea'],
  ['🐄','vaca','ferma'],['🐔','găina','ferma'],['🐷','porcul','ferma'],['🐑','oaia','ferma'],
  ['🐒','maimuța','jungla'],['🦜','papagalul','jungla'],['🐅','tigrul','jungla'],['🦍','gorila','jungla'],
  ['🐧','pinguinul','polul'],['🐻‍❄️','ursul polar','polul'],['🦭','foca','polul']];
LANGS.ro.data.SPACE_QA=[
  ['🪐','Care este cea mai mare planetă?','Jupiter',['Marte','Pământul','Mercur']],
  ['☀️','Care planetă este cea mai apropiată de Soare?','Mercur',['Venus','Marte','Neptun']],
  ['🔴','Care este planeta roșie?','Marte',['Venus','Saturn','Uranus']],
  ['💍','Care planetă are niște inele foarte cunoscute?','Saturn',['Marte','Mercur','Venus']],
  ['🌍','Pe ce planetă trăim?','Pământul',['Marte','Jupiter','Venus']],
  ['☀️','Ce este Soarele?','O stea',['O planetă','O lună','O cometă']],
  ['🔢','Câte planete are Sistemul Solar?','8',['7','9','10']],
  ['🌙','Ce se învârte în jurul Pământului?','Luna',['Soarele','Marte','Saturn']],
  ['👨‍🚀','Cine a fost primul om care a pășit pe Lună?','Neil Armstrong',['Cristofor Columb','Albert Einstein','Isaac Newton']],
  ['🧑‍🚀','Cine a fost primul român care a zburat în spațiu?','Dumitru Prunariu',['Aurel Vlaicu','Traian Vuia','Henri Coandă']],
  ['🌌','Cum se numește galaxia noastră?','Calea Lactee',['Andromeda','Ursa Mare','Orion']],
  ['🗓️','Cât timp îi trebuie Pământului ca să facă un ocol în jurul Soarelui?','Un an',['O zi','O lună','O săptămână']],
  ['🌗','Cât timp îi trebuie Pământului ca să se rotească o dată în jurul lui însuși?','O zi',['Un an','O oră','O lună']],
  ['🔥','Care este cea mai fierbinte planetă?','Venus',['Mercur','Marte','Jupiter']],
  ['🚀','Cum se numesc oamenii care călătoresc în spațiu?','Astronauți',['Piloți','Marinari','Scafandri']]];
LANGS.ro.data.NATURE_QA=[
  ['🌱','De ce au nevoie plantele ca să crească?','De lumină, apă și aer',['Doar de nisip','De întuneric','De ciocolată']],
  ['🐝','Ce iau albinele din flori?','Nectar',['Frunze','Semințe de pin','Apă sărată']],
  ['🌳','Ce gaz dau plantele în aer, de care avem nevoie ca să respirăm?','Oxigen',['Fum','Heliu','Gaz de aragaz']],
  ['🐛','În ce se transformă o omidă?','Într-un fluture',['Într-o albină','Într-un gândac','Într-o furnică']],
  ['🐸','În ce se transformă un mormoloc?','Într-o broască',['Într-un pește','Într-o țestoasă','Într-o șopârlă']],
  ['🍂','În ce anotimp își pierd frunzele mulți copaci?','Toamna',['Primăvara','Vara','În niciunul']],
  ['🥕','Ce parte a plantei crește sub pământ?','Rădăcina',['Floarea','Frunza','Fructul']],
  ['🌊','Cum este apa mării?','Sărată',['Dulce','Iute','Amară']],
  ['🧊','Când apa îngheață, se transformă în…','Gheață',['Abur','Nor','Nisip']],
  ['🐋','Care este cel mai mare animal din lume?','Balena albastră',['Elefantul','Girafa','Rechinul alb']],
  ['🕷️','Câte picioare are un păianjen?','8',['6','4','10']],
  ['🐜','Câte picioare are o insectă?','6',['8','4','10']],
  ['🌧️','De unde cade ploaia?','Din nori',['Din copaci','Din munți','Din Soare']],
  ['🌸','În ce anotimp înfloresc multe plante?','Primăvara',['Iarna','Toamna','În niciunul']],
  ['♻️','Ce putem face ca să avem grijă de planetă?','Să reciclăm și să nu aruncăm gunoaie',['Să lăsăm robinetele deschise','Să aruncăm plastic în mare','Să tăiem toți copacii']]];
LANGS.ro.data.STICKER_NAMES=Object.fromEntries([
  ['🐶','câine'],['🐱','pisică'],['🐭','șoricel'],['🐹','hamster'],['🐰','iepuraș'],['🦊','vulpe'],['🐻','urs'],['🐼','panda'],['🐨','koala'],['🐯','tigru'],
  ['🦁','leu'],['🐮','vacă'],['🐷','purcel'],['🐸','broască'],['🐵','maimuță'],['🐔','găină'],['🐧','pinguin'],['🐦','păsărică'],['🦆','rățușcă'],['🦉','bufniță'],
  ['🦄','unicorn'],['🐝','albină'],['🦋','fluture'],['🐞','buburuză'],['🐢','țestoasă'],['🐙','caracatiță'],['🐠','pește'],['🐬','delfin'],['🐳','balenă'],['🦀','crab'],
  ['🦒','girafă'],['🐘','elefant'],['🍎','măr'],['🍌','banană'],['🍓','căpșună'],['🍉','pepene'],['🍒','cireșe'],['🍦','înghețată'],['🍪','biscuit'],['🧁','brioșă'],
  ['🚀','rachetă'],['🛸','farfurie zburătoare'],['🪐','planetă'],['🌙','lună'],['⭐','stea'],['☀️','soare'],['🌈','curcubeu'],['⛄','om de zăpadă'],['🚂','tren'],['🚒','mașină de pompieri'],
  ['🚜','tractor'],['⛵','barcă cu pânze'],['🎈','balon'],['🎨','acuarele'],['🎸','chitară'],['⚽','minge'],['🏆','cupă'],['👑','coroană'],['💎','diamant'],['🧸','ursuleț de pluș']]);
})();
