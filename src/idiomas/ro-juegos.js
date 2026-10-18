/* Română: jocurile din 50-peques.js, 51-medianos.js și 52-mayores.js. */
(()=>{
/* Ajutoare mici, doar pentru acest fișier (stau în această funcție ca să nu se amestece cu alte fișiere). */
const cap1=t=>t?String(t)[0].toUpperCase()+String(t).slice(1):t;
/* Pluralul cu numere: «un punct», «3 puncte», «20 de puncte» (dar «101 puncte»). */
const pl=(n,one,many,art=`un`)=>{n=+n;if(n===1)return art+` `+one;
  return n+` `+(n>=20&&(n%100===0||n%100>=20)?`de `:``)+many;};
/* Genitivul pentru «umbra trenului»: numele din ANIMALS, SKY și SHADOWS (feminine neregulate în listă, restul după regulă). */
const GEN={vaca:`vacii`,pisica:`pisicii`,oaia:`oii`,rața:`raței`,broasca:`broaștei`,găina:`găinii`,albina:`albinei`,
  luna:`lunii`,steaua:`stelei`,racheta:`rachetei`,planeta:`planetei`,girafa:`girafei`,țestoasa:`țestoasei`};
const gen=x=>GEN[x]||(/ul$/.test(x)?x+`ui`:/le$/.test(x)?x.slice(0,-1)+`ui`:null);
/* Ora, cum o învață copiii: «ora trei fix», «trei și un sfert», «trei și jumătate», «patru fără un sfert».
   Orele se spun la feminin: ora unu, ora două, ora douăsprezece. */
const HOURS=[``,`unu`,`două`,`trei`,`patru`,`cinci`,`șase`,`șapte`,`opt`,`nouă`,`zece`,`unsprezece`,`douăsprezece`];
const hour12=x=>(x-1)%12+1;
const clock=(h,m,hourName)=>{
  if(m===0)return hourName(hour12(h))+` fix`;
  if(m===30)return hourName(hour12(h))+` și jumătate`;
  if(m===15)return hourName(hour12(h))+` și un sfert`;
  if(m===45)return hourName(hour12(h+1))+` fără un sfert`;
  const past=m<30,mm=past?m:60-m;
  return hourName(hour12(past?h:h+1))+(past?` și `:` fără `)+pl(mm,`minut`,`minute`);
};
/* Litere fără cuvânt în WORDS (niciun cuvânt nu începe cu Ă sau Â): un exemplu în care se aude litera. */
const LETTER_EX={ă:`ca în măr`,â:`ca în câine`,k:`de la koala`,x:`ca în taxi`};

Object.assign(LANGS.ro.t,{
  /* ---------- 50-peques.js: numele de pe ușile jocurilor ---------- */
  'Puzle':'Puzzle',
  'Pon cada pieza en su sitio':'Pune fiecare piesă la locul ei',
  'Piano de animales':'Pianul animalelor',
  'Toca y repite la música':'Cântă și repetă melodia',
  'Sombras':'Umbre',
  '¿De quién es la sombra?':'A cui este umbra?',
  '¿Cómo se siente?':'Cum se simte?',
  'Alegría, tristeza, miedo…':'Bucurie, tristețe, frică…',
  '¿Qué pasa después?':'Ce se întâmplă după?',
  'Huevo, pollito, gallina…':'Ou, puișor, găină…',

  /* umbre ({x} vine cu articol: trenul, girafa) */
  '¿De quién es esta sombra?':'A cui este umbra aceasta?',
  '¡Es la sombra de {x}!':v=>{const g=gen(v.x);return g?`Este umbra ${g}!`:`Da, este ${v.x}!`;},
  'Eso es {x}. Mira bien la forma.':'Ai ales {x}. Uită-te bine la formă.',

  /* emoții (sunt adjective la feminin: fața veselă, Ana se simte veselă; situațiile sunt despre Ana) */
  'Toca la cara de {f}':'Atinge fața {f}',
  'Es la cara de {f}.':'Este fața {f}.',
  'Esa es la cara de {f}. Prueba otra vez.':'Aceasta este fața {f}. Mai încearcă o dată.',
  '{s} ¿Cómo se siente?':'{s} Cum se simte Ana?',
  'Siente {f}.':'Ana se simte {f}.',
  'Puede ser, pero piensa otra vez: ¿qué sentirías tú?':'Se poate, dar mai gândește-te: tu ce ai simți?',

  /* ce se întâmplă după */
  'Piensa qué pasa primero y qué pasa luego.':'Gândește-te ce se întâmplă întâi și ce se întâmplă după aceea.',

  /* puzzle */
  '{n} piezas':v=>pl(v.n,`piesă`,`piese`,`o`),
  'Hueco':'Locul',
  'Pieza':'Piesă',
  'Toca una pieza y luego toca su sitio en el puzle.':'Atinge o piesă și apoi atinge locul ei din puzzle.',
  '¡Puzle terminado! ¡Qué bien!':'Ai terminat puzzle-ul! Bravo!',
  'Otro puzle':'Alt puzzle',
  'Ahí no va. Prueba en otro sitio.':'Nu merge acolo. Încearcă în alt loc.',

  /* pianul animalelor (cântecul are melodia din «Twinkle, Twinkle, Little Star») */
  'Toca las teclas para hacer música.':'Atinge clapele ca să faci muzică.',
  'Nota':'Nota',
  '🎵 Estrellita':'🎵 Steluța',
  '🔁 Repite conmigo':'🔁 Repetă după mine',
  '¡Eres un gran músico!':'Ești un mare muzician!',
  '¡Bravo! ¡Eres un gran músico!':'Bravo! Ești un mare muzician!',
  '¡Muy bien! Escucha la siguiente.':'Foarte bine! Ascultă-o pe următoarea.',
  '¡Casi! Escucha otra vez.':'Aproape! Mai ascultă o dată.',
  'Escucha…':'Ascultă…',
  '¡Ahora tú! Repite las notas.':'Acum tu! Repetă notele.',
  'Estrellita, ¿dónde estás?':'Sclipește, steluță mică…',
  '¿La tocas tú? Empieza por el perrito.':'O cânți tu? Începe cu cățelușul.',
  'Escucha y repite.':'Ascultă și repetă.',

  /* ---------- 51-medianos.js: numele de pe ușile jocurilor ---------- */
  'Laberinto':'Labirint',
  'Lleva al ratón al queso':'Du șoricelul la cașcaval',
  'Trazar letras':'Scriem litere',
  'Escribe con el dedo':'Scrie cu degetul',
  'Dominó':'Domino',
  '¿Qué ficha encaja?':'Ce piesă se potrivește?',
  '¿Qué hora es?':'Cât e ceasul?',
  'Aprende el reloj':'Învață ceasul',
  'Monedas':'Monede',
  '¿Cuánto dinero hay?':'Câți bani sunt?',
  'Sopa de letras':'Cuvinte ascunse',
  'Encuentra las palabras':'Găsește cuvintele',

  /* domino */
  '¿Qué ficha puede ir al lado?':'Ce piesă poate veni alături?',
  'Busca una ficha que tenga 1 punto.':'Caută o piesă care are un punct.',
  'Busca una ficha que tenga {n} puntos.':v=>`Caută o piesă care are ${pl(v.n,`punct`,`puncte`)}.`,
  '{a} y {b}':'{a} și {b}',
  'Sí, las dos tienen {n}.':v=>`Da, amândouă au ${pl(v.n,`punct`,`puncte`)}.`,
  'Esa ficha no tiene {n}. Cuenta los puntos.':v=>`Piesa aceasta nu are nicio parte cu ${pl(v.n,`punct`,`puncte`)}. Numără punctele.`,

  /* ceasul */
  'Fíjate: la aguja corta marca la hora y la larga, los minutos.':'Uite: limba mică arată ora, iar limba mare arată minutele.',

  /* monede */
  '¿Cuánto dinero hay en total?':'Câți bani sunt în total?',
  'Hay {n} en total.':'În total sunt {n}.',
  'Suma primero las monedas grandes.':'Adună întâi monedele mari.',
  'Cuenta las monedas una a una.':'Numără monedele pe rând.',

  /* labirint */
  'Pequeño':'Mic',
  'Mediano':'Mijlociu',
  'Grande':'Mare',
  'Arriba':'Sus',
  'Izquierda':'Stânga',
  'Abajo':'Jos',
  'Derecha':'Dreapta',
  'Lleva al ratón hasta el queso. Usa las flechas o desliza el dedo.':'Ajută șoricelul să ajungă la cașcaval. Folosește săgețile sau glisează cu degetul.',
  '¡Ñam! El ratón ha encontrado el queso.':'Mmm! Șoricelul a găsit cașcavalul.',
  'Otro laberinto':'Alt labirint',

  /* scriem litere ({l} vine cu literă mică; cu majusculă vocea spune numele literei) */
  'Mayúsculas':'Litere mari',
  'minúsculas':'litere mici',
  'Números':'Cifre',
  'el número {n}':'numărul {n}',
  'la {l}, de {w}':v=>`litera ${String(v.l).toUpperCase()}, de la ${v.w}`,
  'la {l}':v=>`litera ${String(v.l).toUpperCase()}`+(LETTER_EX[v.l]?`, `+LETTER_EX[v.l]:``),
  'Repasa {l} con el dedo.':'Trasează cu degetul {l}.',
  'Zona para escribir':'Locul unde scrii',
  '🔊 Oír':'🔊 Ascultă',
  'Siguiente ➡️':'Mai departe ➡️',
  '¡Qué bien escrita! Toca «Siguiente».':'Ce frumos ai scris! Atinge „Mai departe”.',
  '¡Muy bien escrita!':'Foarte frumos scris!',
  /* numește butonul la fel ca traducerea lui 'Borrar', oricare ar fi ea */
  'Intenta seguir la letra gris. Toca «Borrar» para empezar de nuevo.':()=>`Încearcă să mergi pe litera gri. Atinge „${_('Borrar')}” ca să începi din nou.`,
  '¡Sigue! Repasa toda la letra.':'Continuă! Trasează toată litera.',

  /* cuvinte ascunse */
  'Toca la primera letra de una palabra y después la última.':'Atinge prima literă a unui cuvânt și apoi ultima.',
  '¡Has encontrado todas las palabras!':'Ai găsit toate cuvintele!',
  'Otra sopa':'Alte cuvinte',
  'Busca las palabras escondidas.':'Caută cuvintele ascunse.',
  '¡{w}!':'{w}!',

  /* ---------- 52-mayores.js: numele de pe ușile jocurilor ---------- */
  'Sudoku':'Sudoku',
  'Lógica con números':'Logică cu numere',
  'Salva la flor':'Salvează floarea',
  'Adivina la palabra':'Ghicește cuvântul',
  'Robot':'Robotul',
  'Prográmalo con flechas':'Programează-l cu săgeți',
  'Programa con bucles':'Programează cu bucle',
  'El robot que repite':'Robotul care repetă',
  'Fracciones':'Fracții',
  'Partes de una pizza':'Bucăți dintr-o pizza',
  'Continentes':'Continente',
  '¿Dónde está?':'Unde se află?',

  /* fracții ({f}, {a} și {b} sunt fracții în cuvinte: «o doime», «trei pătrimi») */
  '¿Qué parte de la pizza está pintada?':'Ce parte din pizza este colorată?',
  'Es {f}.':v=>(/^o /.test(v.f)?`Este `:`Sunt `)+v.f+`.`,
  'Cuenta los trozos pintados y los trozos que hay en total.':'Numără bucățile colorate, apoi numără toate bucățile.',
  '¿Qué fracción es igual?':'Ce fracție este egală cu aceasta?',
  '{f}. ¿Qué fracción es igual?':v=>`${cap1(v.f)}. Ce fracție este egală cu aceasta?`,
  '{a} es lo mismo que {b}.':v=>`${cap1(v.a)} ${/^o /.test(v.a)?`este egală`:`sunt egale`} cu ${v.b}.`,
  'Divide arriba y abajo por el mismo número.':'Împarte numărul de sus și pe cel de jos la același număr.',

  /* continente */
  '¿En qué continente vive {x} en libertad?':'Pe ce continent trăiește {x} în sălbăticie?',
  '¿En qué continente está {x}?':'Pe ce continent se află {x}?',
  'Está en {c}.':'Se găsește în {c}.',
  'No es ahí. Piensa en el mapa del mundo.':'Nu acolo. Gândește-te la harta lumii.',

  /* sudoku */
  'Cada fila, cada columna y cada caja tienen todos los números sin repetir.':'Fiecare rând, fiecare coloană și fiecare pătrat au toate numerele, fără să se repete.',
  'Toca una casilla vacía y luego un número.':'Atinge o căsuță goală și apoi un număr.',
  '¡Sudoku resuelto! ¡Qué cabeza!':'Ai rezolvat sudoku! Ce minte isteață!',
  'Otro sudoku':'Alt sudoku',

  /* salvează floarea */
  'Pista: {c}':'Indiciu: {c}',
  '💡 Ver dibujo':'💡 Arată desenul',
  'Adivina la palabra antes de que la flor pierda todos sus pétalos.':'Ghicește cuvântul înainte ca floarea să-și piardă toate petalele.',
  '¡Bien! Has salvado la flor: {w}.':'Bravo! Ai salvat floarea. Cuvântul era {w}.',
  '¡Oh! La flor se ha quedado sin pétalos. Era «{w}».':'Of! Floarea a rămas fără petale. Cuvântul era „{w}”.',
  'Otra palabra':'Alt cuvânt',

  /* robotul */
  'Lleva el robot a la batería. Usa «Repetir» para gastar menos bloques.':'Du robotul la baterie. Folosește „Repetă” ca să ai nevoie de mai puține blocuri.',
  'Lleva el robot hasta la batería. Pon las flechas y pulsa «Adelante».':'Du robotul până la baterie. Pune săgețile și apasă „Pornește”.',
  'Reto {i} de {n} · Máximo {m} bloques':v=>`Provocarea ${v.i} din ${v.n} · Cel mult ${pl(v.m,`bloc`,`blocuri`)}`,
  'Reto libre':'Provocare liberă',
  'Programa':'Programul',
  '🔁 Repetir':'🔁 Repetă',
  '⤴ Fin':'⤴ Gata',
  '▶ Adelante':'▶ Pornește',
  'Máximo {m} bloques. Usa «Repetir».':v=>`Poți folosi cel mult ${pl(v.m,`bloc`,`blocuri`)}. Încearcă „Repetă”.`,
  'Repetir {n} veces':v=>+v.n===1?`Repetă o dată`:`Repetă de ${v.n} `+(+v.n>=20?`de `:``)+`ori`,
  'Tu programa aparecerá aquí.':'Programul tău va apărea aici.',
  'Bloques: {b} de {m}':'Blocuri: {b} din {m}',
  'Primero pon algunas flechas.':'Pune întâi câteva săgeți.',
  'El robot se ha parado antes de llegar. Cambia el programa.':'Robotul s-a oprit înainte să ajungă. Schimbă programul.',
  '¡Uy! El robot se ha chocado. Cambia el programa.':'Ups! Robotul s-a lovit de ceva. Schimbă programul.',
  '¡Conseguido con {b} bloques!':v=>`Ai reușit cu ${pl(v.b,`bloc`,`blocuri`)}!`,
  '¡Conseguido en {n} pasos!':v=>+v.n===1?`Ai reușit dintr-un singur pas!`:`Ai reușit în ${pl(v.n,`pas`,`pași`)}!`,
  'Siguiente reto':'Următoarea provocare',
});

/* ---------- date pentru 50-peques.js ---------- */
LANGS.ro.data.SHADOWS=[['🚂','trenul'],['🦒','girafa'],['🐘','elefantul'],['🦋','fluturele'],['🐢','țestoasa'],['🌳','copacul']];
/* n este un adjectiv la feminin: «Atinge fața veselă», «Ana se simte veselă». */
LANGS.ro.data.FEELINGS=[
  {e:'😀',n:'veselă',tip:'Când ni se întâmplă ceva frumos, ne simțim veseli.'},
  {e:'😢',n:'tristă',tip:'Când suntem triști, o îmbrățișare ne ajută.'},
  {e:'😠',n:'furioasă',tip:'Când suntem furioși, putem să respirăm adânc și să spunem în cuvinte ce simțim.'},
  {e:'😨',n:'speriată',tip:'Când ne este frică, putem cere ajutorul unui adult.'},
  {e:'😲',n:'surprinsă',tip:'Suntem surprinși când se întâmplă ceva la care nu ne așteptam.'},
  {e:'😴',n:'somnoroasă',tip:'Când ne este somn, corpul ne cere să ne odihnim.'}];
/* După fiecare situație vine «Cum se simte Ana?»; al doilea element trebuie să fie unul dintre numele din FEELINGS. */
LANGS.ro.data.SITUATIONS=[
  ['Ana primește o îmbrățișare mare, mare.','veselă'],['Ana câștigă o întrecere cu prietenii.','veselă'],['Azi este ziua Anei.','veselă'],
  ['Anei i-a căzut înghețata pe jos.','tristă'],['Cea mai bună prietenă a Anei se mută departe.','tristă'],
  ['Cineva îi ia Anei jucăria fără să întrebe.','furioasă'],['Cineva îi rupe Anei desenul pe care l-a făcut.','furioasă'],
  ['Afară e o furtună mare, cu multe tunete.','speriată'],['Ana aude un zgomot ciudat în întuneric.','speriată'],
  ['Ana deschide o cutie și o jucărie sare afară.','surprinsă'],['Ana găsește un cadou sub pernă.','surprinsă'],
  ['Ana s-a jucat toată ziua și acum e noapte.','somnoroasă']];
LANGS.ro.data.NEXT_SEQS=[
  {e:['🥚','🐣','🐔'],t:'Din ou iese un puișor, iar puișorul crește și se face găină.'},
  {e:['🌱','🪴','🌳'],t:'Sămânța încolțește, crește și se face copac.'},
  {e:['🐛','🦋'],t:'Omida se transformă în fluture.'},
  {e:['🌧️','🌈'],t:'După ploaie, uneori apare curcubeul.'},
  {e:['🧦','👟'],t:'Întâi șosetele și apoi pantofii.'},
  {e:['🧼','🍽️'],t:'Ne spălăm pe mâini înainte să mâncăm.'},
  {e:['🌅','☀️','🌙'],t:'Dimineața răsare soarele, iar noaptea vedem luna.'},
  {e:['👶','🧒','🧑'],t:'Bebelușii cresc și se fac copii, apoi oameni mari.'},
  {e:['🌸','🍏','🍎'],t:'Întâi floarea, apoi fructul verde și pe urmă fructul copt.'},
  {e:['❄️','⛄','💧'],t:'Din zăpadă facem un om de zăpadă, iar soarele îl topește.'},
  {e:['🛏️','🪥','🎒'],t:'Ne trezim, ne spălăm pe dinți și mergem la școală.'},
  {e:['🎂','🕯️','🥳'],t:'Punem lumânările pe tort, le suflăm și apoi sărbătorim!'}];

/* ---------- date pentru 51-medianos.js ---------- */
/* Butoane: «Ora 3 fix», «Ora 3 și jumătate», «Ora 3 și un sfert», «Ora 4 fără un sfert» (cu cifre, ca pe cadran). */
LANGS.ro.data.TIME=(h,m)=>`Ora `+clock(h,m,String);
/* Se spune după un răspuns corect: «Este ora trei și jumătate.» */
LANGS.ro.data.TIME_SAY=(h,m)=>`Este ora `+clock(h,m,x=>HOURS[x])+`.`;
/* Alfabetul românesc în ordinea din abecedar (a, m, n, u, i, e, r, c, ă…), cu literele rare la sfârșit. */
LANGS.ro.data.TRACE={upper:'AMNUIERCĂOLTSȘPȚÎÂDVZBFGHJXKYWQ',lower:'amnuiercăoltsșpțîâdvzbfghjxkywq'};

/* ---------- date pentru 52-mayores.js ---------- */
/* Ă, Â, Î, Ș și Ț sunt litere separate: plain() nu le mai transformă în A, I, S, T (00-nucleo.js). */
LANGS.ro.data.KEEP='ĂÂÎȘȚ';
/* Alfabetul românesc complet: fiecare literă din HANGMAN trebuie să fie aici. */
LANGS.ro.data.KEYBOARD='AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ';
/* Doar litere (cu diacritice) și spații, fără cratimă. */
LANGS.ro.data.HANGMAN=[
  ['Animale',[['🐘','elefant'],['🦒','girafă'],['🐢','țestoasă'],['🦋','fluture'],['🐊','crocodil'],['🐧','pinguin'],['🦉','bufniță'],['🐬','delfin'],['🦓','zebră'],['🐿️','veveriță'],['🦔','arici'],['🐙','caracatiță']]],
  ['Fructe și mâncare',[['🍎','măr'],['🍌','banană'],['🍓','căpșună'],['🍉','pepene'],['🍊','portocală'],['🍅','roșie'],['🥕','morcov'],['🍞','pâine'],['🧀','brânză'],['🍇','struguri']]],
  ['Spațiul',[['🪐','planetă'],['⭐','stea'],['🚀','rachetă'],['👩‍🚀','astronaută'],['🌌','galaxie'],['☄️','cometă'],['🛰️','satelit'],['🌙','lună']]],
  ['Natura',[['⛰️','munte'],['🌋','vulcan'],['🏞️','râu'],['🌲','pădure'],['🌈','curcubeu'],['⛈️','furtună'],['🏜️','deșert'],['🌊','val'],['🌷','lalea']]],
  ['În casă',[['🛏️','pat'],['🪑','scaun'],['🚪','ușă'],['🪟','fereastră'],['🧸','ursuleț'],['📚','carte'],['🥄','lingură'],['🛁','cadă']]]];
/* Fracția în cuvinte, ca la școală: 1/2 → «o doime», 3/4 → «trei pătrimi», 2/3 → «două treimi» (fracțiile sunt feminine). */
LANGS.ro.data.FRACTION=(k,n)=>{
  const d={2:[`doime`,`doimi`],3:[`treime`,`treimi`],4:[`pătrime`,`pătrimi`],5:[`cincime`,`cincimi`],6:[`șesime`,`șesimi`],
    7:[`șeptime`,`șeptimi`],8:[`optime`,`optimi`],9:[`noime`,`noimi`],10:[`zecime`,`zecimi`]}[n];
  const num=[``,`o`,`două`,`trei`,`patru`,`cinci`,`șase`,`șapte`,`opt`,`nouă`,`zece`][k];
  if(!d||!num)return k+` din `+n;
  return num+` `+d[k===1?0:1];
};
/* Cele șapte continente (America de Nord și America de Sud separat).
   kind rămâne 'vive' (un animal care trăiește acolo în sălbăticie) sau 'está' (un loc); numărul este continentul. */
LANGS.ro.data.WORLD={continents:['America de Nord','America de Sud','Europa','Asia','Africa','Oceania','Antarctica'],items:[
  ['🦘','vive','cangurul',5],['🐨','vive','ursulețul koala',5],['🐼','vive','ursul panda',3],['🦒','vive','girafa',4],['🦓','vive','zebra',4],
  ['🐍','vive','anaconda',1],['🐧','vive','pinguinul imperial',6],['🦅','vive','condorul din Anzi',1],['🦍','vive','gorila',4],
  ['🗽','está','Statuia Libertății',0],['🗼','está','Turnul Eiffel',2],['🔺','está','Marea Piramidă din Giza',4],['🗻','está','muntele Fuji',3],
  ['🏟️','está','Colosseumul din Roma',2],['🏔️','está','muntele Everest',3],['🌳','está','pădurea amazoniană',1],['🏜️','está','deșertul Sahara',4],
  ['🏰','está','Castelul Bran',2],['🕌','está','Taj Mahalul',3],['🌉','está','podul Golden Gate',0],['🪸','está','Marea Barieră de Corali',5],
  ['⛪','está','Sagrada Família din Barcelona',2],['🧊','está','cea mai mare calotă de gheață din lume',6]]};
})();
