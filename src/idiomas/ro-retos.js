/* Română: jocurile pentru 11 și 12 ani (55-once-doce.js) și secțiunea de limbi străine (56-idiomas.js). */
(()=>{
/* Ajutoare doar pentru acest fișier (stau în funcție ca să nu se amestece cu alte fișiere).
   În română, 1, 2, 12, 21, 22… se schimbă după gen: „două zile”, dar „doi lei”. Ca vocea să citească bine,
   aceste numere se scriu cu litere înaintea substantivelor feminine și neutre; celelalte rămân cu cifre.
   „de” apare de la 20 în sus: „19 zile”, dar „20 de zile” (și „105 zile”, dar „120 de zile”). */
const de=n=>(n%100>=20||(n>0&&n%100===0))?' de':'';
const U=['','una','două','trei','patru','cinci','șase','șapte','opt','nouă'],
  ZECI=['','zece','douăzeci','treizeci','patruzeci','cincizeci','șaizeci','șaptezeci','optzeci','nouăzeci'];
/* g: 'f' feminin (zi, săptămână, greșeală), 'n' neutru (cuvânt, iaurt): la plural iau tot „două” */
const num=(n,g)=>{
  if(n===1)return g==='f'?'o':'un';
  if(n===2)return 'două';
  if(n===12)return 'douăsprezece';
  const u=n%10;
  if(n>20&&n<100&&(u===1||u===2))return ZECI[Math.floor(n/10)]+' și '+(u===2?'două':g==='f'?'una':'unu');
  return String(n);};
const cnt=(n,g,sg,pl)=>n===1?num(1,g)+' '+sg:num(n,g)+de(n)+' '+pl;
const up=t=>t.charAt(0).toUpperCase()+t.slice(1);
/* „Da! Este un câine.”: fiecare cuvânt din VOCAB cu articolul potrivit. */
const ART={};
'câine,porc,cal,pește,leu,elefant,urs,iepure,șoarece,șarpe,măr,pepene verde,ou,biscuit,morcov,tort,pat,scaun,ursuleț,ceas,creion cerat,tricou,autobuz,tren,avion,tractor,nor,curcubeu,copac,munte'
  .split(',').forEach(w=>{ART[w]='Este un '+w;});
'pisică,vacă,oaie,găină,rață,pasăre,broască,maimuță,girafă,țestoasă,banană,căpșună,portocală,înghețată,roșie,casă,ușă,fereastră,carte,minge,lingură,cadă,rochie,șapcă,haină,mașină,bicicletă,rachetă,barcă,stea,floare'
  .split(',').forEach(w=>{ART[w]='Este o '+w;});
'struguri,pantaloni,șosete,adidași,mănuși'.split(',').forEach(w=>{ART[w]='Sunt niște '+w;});
'pâine,brânză,lapte,apă,ploaie'.split(',').forEach(w=>{ART[w]='Este '+w;});
Object.assign(ART,{'ochi':'Sunt ochii','ureche':'Este urechea','nas':'Este nasul','gură':'Este gura','mână':'Este mâna','picior':'Este piciorul',
  'dinte':'Este dintele','braț':'Este brațul','soare':'Este soarele','lună':'Este luna','mare':'Este marea'});

Object.assign(LANGS.ro.t,{
  /* ---------- 55-once-doce.js: numele jocurilor ---------- */
  'Acertijos': 'Ghicitori',
  'Piensa antes de contestar': 'Gândește înainte să răspunzi',
  'Mecanografía': 'Tastare',
  'Escribe rápido y bien': 'Scrie repede și corect',
  'Ciencia': 'Științe',
  'Cuerpo, materia y energía': 'Corpul, materia și energia',
  'Historia': 'Istorie',
  '¿Qué pasó antes?': 'Ce a fost mai întâi?',
  'Dinero y ahorro': 'Bani și economii',
  'Ahorra, compara y decide': 'Economisește, compară și alege',

  /* ghicitori */
  'Si hoy es {d}, ¿qué día será dentro de {n} días?': v=>`Dacă azi e ${v.d}, ce zi va fi peste ${cnt(+v.n,'f','zi','zile')}?`,
  'Si hoy es {d}, ¿qué día fue hace {n} días?': v=>`Dacă azi e ${v.d}, ce zi a fost acum ${cnt(+v.n,'f','zi','zile')}?`,
  'Cada 7 días se repite el mismo día de la semana. {n} días son {w} semanas y {r} días más.': v=>{
    const z=up(cnt(+v.n,'f','zi','zile')),wk=cnt(+v.w,'f','săptămână','săptămâni'),dy=cnt(+v.r,'f','zi','zile');
    return 'La fiecare 7 zile se repetă aceeași zi a săptămânii. '+(
      +v.w===0?`${z} înseamnă mai puțin de o săptămână, așa că numără-le pe rând.`:
      +v.r===0?`${z} înseamnă exact ${wk}, deci e aceeași zi.`:
      `${z} înseamnă ${wk} și încă ${dy}.`);},
  'Pista: quita semanas enteras de 7 días.': 'Indiciu: scoate săptămânile întregi, de câte 7 zile.',
  'Léelo otra vez con calma: a veces la trampa está en las palabras.': 'Citește încă o dată, cu atenție: uneori capcana e chiar în cuvinte.',

  /* istorie */
  '¿Qué pasó primero?': 'Ce s-a întâmplat mai întâi?',
  '{e}: {y}.': '{e} {y}.',
  'Piensa: ¿había electricidad, imprenta o coches en esa época?': 'Gândește-te: pe vremea aceea existau curent electric, cărți tipărite sau mașini?',

  /* bani și economii */
  'Necesidad': 'Nevoie',
  'Capricho': 'Moft',
  '¿{x} es una necesidad o un capricho?': v=>{const x=String(v.x||'');return `Este o nevoie sau un moft să ai ${x.charAt(0).toLowerCase()+x.slice(1)}?`;},
  'Es una necesidad: la necesitamos para vivir bien.': 'Este o nevoie: ne trebuie ca să trăim bine.',
  'Es un capricho: está bien tenerlo a veces, pero podemos vivir sin él.': 'Este un moft: e plăcut să ai așa ceva din când în când, dar putem trăi și fără.',
  'Piensa: ¿podríamos vivir sin ello?': 'Gândește-te: am putea trăi fără așa ceva?',
  'Quieres algo que cuesta {p}. Ahorras {s} cada semana. ¿Cuántas semanas necesitas?': 'Vrei ceva care costă {p}. Pui deoparte {s} în fiecare săptămână. De câte săptămâni ai nevoie?',
  '{p} entre {s} son {w} semanas.': v=>`${v.p} împărțit la ${v.s} fac ${v.w}, deci îți trebuie ${cnt(+v.w,'f','săptămână','săptămâni')}.`,
  'Divide el precio entre lo que ahorras cada semana.': 'Împarte prețul la suma pe care o pui deoparte în fiecare săptămână.',
  'Algo cuesta {p} y tiene un {d} % de descuento. ¿Cuánto pagas?': 'Ceva costă {p} și are o reducere de {d}%. Cât plătești?',
  'El {d} % de {p} es {r}, así que pagas {pay}.': '{d}% din {p} înseamnă {r}, așa că plătești {pay}.',
  'Primero calcula cuánto te descuentan y réstalo.': 'Mai întâi calculează cât înseamnă reducerea, apoi scade-o din preț.',
  'Compras algo de {p} y pagas con {b}. ¿Cuánto te devuelven?': 'Cumperi ceva de {p} și plătești cu o bancnotă de {b}. Cât rest primești?',
  '{b} menos {p} son {c}.': '{b} minus {p} fac {c}.',
  'Cuenta desde el precio hasta lo que has pagado.': 'Numără de la preț până la suma pe care ai dat-o.',
  'Paquete de {n}': 'Pachetul de {n}',
  'Un paquete de {n1} yogures cuesta {p1} y uno de {n2} cuesta {p2}. ¿Cuál es más barato por yogur?': v=>`Un pachet de ${cnt(+v.n1,'n','iaurt','iaurturi')} costă ${v.p1}, iar unul de ${v.n2} costă ${v.p2}. În care pachet un iaurt costă mai puțin?`,
  'Cada yogur cuesta {u1} en el pequeño y {u2} en el grande.': 'Un iaurt costă {u1} în pachetul mic și {u2} în cel mare.',
  'Divide cada precio entre el número de yogures.': 'Împarte fiecare preț la numărul de iaurturi.',

  /* tastare */
  'Palabras cortas': 'Cuvinte scurte',
  'Palabras largas': 'Cuvinte lungi',
  'Frases': 'Propoziții',
  'Palabra {i} de {n}': 'Cuvântul {i} din {n}',
  'Escribe aquí': 'Scrie aici',
  'Escribe la palabra que ves. Puedes usar el teclado o la pantalla.': 'Scrie cuvântul pe care îl vezi. Poți folosi tastatura sau ecranul.',
  '¡Terminado! {w} palabras por minuto y {e} fallos.': v=>`Gata! Ai scris ${cnt(+v.w,'n','cuvânt','cuvinte')} pe minut și ${+v.e===0?`n-ai făcut nicio greșeală`:`ai făcut ${cnt(+v.e,'f','greșeală','greșeli')}`}.`,

  /* ---------- 56-idiomas.js: învățăm altă limbă ---------- */
  'Comida': 'Mâncare',
  'En casa': 'Acasă',
  'El cuerpo': 'Corpul',
  'La ropa': 'Hainele',
  'Transportes': 'Mijloace de transport',
  'Frases para empezar': 'Primele fraze',
  'Hola, gracias, ¿cómo te llamas?': 'Bună, mulțumesc, cum te cheamă?',
  'Parejas de palabras': 'Perechi de cuvinte',
  'Une el dibujo con su palabra': 'Potrivește desenul cu cuvântul lui',
  'En {l}': 'În {l}',
  'Escucha y toca': 'Ascultă și atinge',
  'Escucha. ¿Qué es?': 'Ascultă. Ce este?',
  '¡Sí! Es {n}.': v=>`Da! ${ART[v.n]||'Este '+v.n}.`,
  'No es esa. Toca la frase de arriba para oírla otra vez.': 'Nu e asta. Atinge textul de sus ca să-l asculți din nou.',
  '¿Cómo se dice «{x}» en {l}?': 'Cum se spune „{x}” în {l}?',
  '¿Cómo se dice {x} en {l}?': 'Cum se spune {x} în {l}?',
  'Se dice así:': 'Se spune așa:',
  'Esa palabra es otra cosa. Prueba otra vez.': 'Cuvântul acesta înseamnă altceva. Mai încearcă o dată.',
  'Escucha y toca el color': 'Ascultă și atinge culoarea',
  '¡Sí! Es el {c}.': 'Da! Este {c}.',
  'No es ese. Toca la frase de arriba para oírla otra vez.': 'Nu e asta. Atinge textul de sus ca să-l asculți din nou.',
  '¿Cómo se dice este color en {l}?': 'Cum se numește culoarea aceasta în {l}?',
  'Ese es otro color. Prueba otra vez.': 'Aceasta e altă culoare. Mai încearcă o dată.',
  'Escucha y toca el número': 'Ascultă și atinge numărul',
  '¡Sí! Es el {n}.': 'Da! Este numărul {n}.',
  '¿Cuántas hay? Elige el número en {l}.': 'Câte sunt? Alege numărul în {l}.',
  'Hay {n}:': v=>+v.n===1?'Este unul:':`Sunt ${+v.n===2?'două':v.n}:`,
  'Cuenta otra vez despacio.': 'Numără încă o dată, încet.',
  '◀ Atrás': '◀ Înapoi',
  '🔊 Escuchar': '🔊 Ascultă',
  '🐢 Despacio': '🐢 Încet',
  'Siguiente ▶': 'Înainte ▶',
  'Escucha y repítelo en voz alta.': 'Ascultă și repetă cu voce tare.',
  'Une cada dibujo con su palabra': 'Potrivește fiecare desen cu cuvântul lui',
});
})();

/* ---------- date pentru jocurile de 11 și 12 ani ---------- */
LANGS.ro.data.DAYS=['luni','marți','miercuri','joi','vineri','sâmbătă','duminică'];
/* [emoji, ghicitoare, răspuns, [alte variante], explicație]. Numerele care se schimbă după gen (o, două, douăsprezece) sunt scrise cu litere, ca vocea să le citească bine. */
LANGS.ro.data.RIDDLES=[
  ['🐑','Un fermier are 17 oi. Fug toate, în afară de 9. Câte oi îi rămân?','9',['8','17','0'],'„Toate, în afară de 9” înseamnă că rămân 9.'],
  ['📏','Ana este mai înaltă decât Luca, iar Luca este mai înalt decât Maria. Cine este cel mai scund?','Maria',['Ana','Luca','Nu se poate ști'],'Dacă Ana e mai înaltă decât Luca, iar Luca e mai înalt decât Maria, atunci Maria e cea mai scundă.'],
  ['📅','Câte luni au 28 de zile?','Toate',['Una','Două','Niciuna'],'Toate lunile au cel puțin 28 de zile.'],
  ['🏃','Într-o cursă, îl depășești pe cel de pe locul al doilea. Pe ce loc ești acum?','Al doilea',['Primul','Al treilea','Ultimul'],'Îi iei locul, așa că acum ești tu al doilea.'],
  ['🧱','O cărămidă cântărește un kilogram plus încă o jumătate de cărămidă. Cât cântărește o cărămidă întreagă?','Două kilograme',['Un kilogram și jumătate','Un kilogram','Trei kilograme'],'Dacă jumătate de cărămidă cântărește un kilogram, cărămida întreagă cântărește două.'],
  ['🏭','Dacă 5 mașinării fac 5 jucării în 5 minute, în cât timp fac 100 de mașinării 100 de jucării?','5 minute',['100 de minute','20 de minute','Un minut'],'Fiecare mașinărie face o jucărie în 5 minute, așa că 100 de mașinării fac 100 de jucării tot în 5 minute.'],
  ['🐸','O broască se află pe fundul unei fântâni adânci de 10 metri. În fiecare zi urcă 3 metri, iar în fiecare noapte alunecă înapoi 2 metri. În câte zile iese din fântână?','8',['10','7','5'],'După 7 zile și 7 nopți a urcat 7 metri. În a opta zi mai urcă 3 metri și iese.'],
  ['⚾','O bâtă și o minge costă împreună un leu și 10 bani. Bâta costă cu un leu mai mult decât mingea. Cât costă mingea?','5 bani',['10 bani','Un ban','Un leu'],'Dacă mingea costă 5 bani, bâta costă un leu și 5 bani, iar împreună fac un leu și 10 bani.'],
  ['👧','Tatăl Mariei are cinci fiice: Lala, Lele, Lili, Lolo și…','Maria',['Lulu','Lina','Lola'],'A cincea fiică este chiar Maria.'],
  ['🎂','Am de două ori mai mulți ani decât fratele meu, care are 6 ani. Câți ani voi avea eu când fratele meu va avea 10?','16',['20','14','12'],'Acum am 12 ani. Peste 4 ani voi avea 16.'],
  ['🍎','Pe masă sunt trei mere și tu iei două. Câte mere ai tu?','2',['1','3','5'],'Ai cele două mere pe care le-ai luat.'],
  ['🪶','Ce cântărește mai mult: un kilogram de pene sau un kilogram de fier?','Cântăresc la fel',['Penele','Fierul','Depinde de zi'],'Un kilogram e un kilogram, indiferent din ce e făcut.'],
  ['🐱','Dacă 3 pisici prind 3 șoareci în 3 minute, de câte pisici e nevoie ca să prindă 60 de șoareci în 30 de minute?','6',['20','60','3'],'Fiecare pisică prinde un șoarece la fiecare 3 minute, adică 10 șoareci în 30 de minute. Pentru 60 de șoareci e nevoie de 6 pisici.'],
  ['🚆','Un tren electric merge spre nord, iar vântul bate spre sud. Încotro se duce fumul?','Nu scoate fum',['Spre sud','Spre nord','În sus'],'Trenurile electrice nu scot fum.'],
  ['👨‍👩‍👧‍👦','Patru frați au fiecare câte o soră, și e aceeași soră pentru toți. Câți copii sunt în familie?','5',['8','4','6'],'Patru băieți și o fată: cinci copii.'],
  ['➗','Împarte 30 la o jumătate și adună 10. Cât obții?','70',['25','40','50'],'A împărți la o jumătate înseamnă a înmulți cu 2: 30 împărțit la o jumătate fac 60, iar 60 plus 10 fac 70.'],
  ['🥚','Dacă un ou fierbe în 3 minute, în cât timp fierb 3 ouă puse împreună în aceeași oală?','3 minute',['9 minute','6 minute','Un minut'],'Fierb toate în același timp, așa că durează la fel.'],
  ['🪷','Niște nuferi își dublează mărimea în fiecare zi. În 20 de zile acoperă tot lacul. În ce zi acopereau jumătate din lac?','În ziua 19',['În ziua 10','În ziua 15','În ziua 5'],'Dacă în ziua 20 lacul e acoperit de tot și nuferii se dublează în fiecare zi, cu o zi înainte acopereau doar jumătate.'],
  ['🔔','Un ceas bate de șase ori în cinci secunde. Câte secunde îi trebuie ca să bată de douăsprezece ori?','11',['10','12','24'],'Între șase bătăi sunt cinci pauze de câte o secundă, iar între douăsprezece bătăi sunt unsprezece pauze.'],
  ['🧦','Într-un sertar întunecat sunt șosete roșii și șosete albastre. Câte trebuie să scoți, cel puțin, ca să fii sigur că ai două de aceeași culoare?','3',['2','4','10'],'Cu trei șosete și doar două culori, sigur două sunt la fel.']];
LANGS.ro.data.SCIENCE_QA=[
  ['💧','La ce temperatură fierbe apa la nivelul mării?','100 °C',['50 °C','0 °C','200 °C']],
  ['🧊','La ce temperatură îngheață apa?','0 °C',['10 °C','−20 °C','100 °C']],
  ['♨️','Cum se numește trecerea unui lichid în gaz?','Evaporare',['Solidificare','Topire','Condensare']],
  ['☁️','Cum se numește trecerea unui gaz în lichid?','Condensare',['Evaporare','Solidificare','Topire']],
  ['🌿','Cum se numește procesul prin care plantele își fac hrana folosind lumina?','Fotosinteză',['Digestie','Respirație','Evaporare']],
  ['🌳','Ce gaz iau plantele din aer pentru fotosinteză?','Dioxidul de carbon',['Oxigenul','Heliul','Hidrogenul']],
  ['❤️','Ce organ pompează sângele în tot corpul?','Inima',['Ficatul','Plămânii','Stomacul']],
  ['🫁','Cu ce organe respirăm?','Cu plămânii',['Cu rinichii','Cu inima','Cu stomacul']],
  ['🦴','Cam câte oase are un om adult?','206',['50','1000','12']],
  ['🧲','Ce material este atras de magnet?','Fierul',['Lemnul','Plasticul','Sticla']],
  ['⚡','Ce material conduce bine curentul electric?','Cuprul',['Lemnul','Plasticul','Cauciucul']],
  ['🌍','Cum se numește stratul de gaze care înconjoară Pământul?','Atmosfera',['Scoarța','Nucleul','Mantaua']],
  ['🌋','Cum se numește roca topită care iese dintr-un vulcan?','Lavă',['Nisip','Granit','Gheață']],
  ['🔬','Care este cea mai mică unitate din care sunt alcătuite toate ființele vii?','Celula',['Organul','Țesutul','Osul']],
  ['☀️','Cât timp îi ia luminii Soarelui să ajungă pe Pământ?','Cam 8 minute',['O secundă','O zi','Un an']],
  ['🔊','Poate călători sunetul prin spațiul gol, unde nu e aer?','Nu, are nevoie de aer sau de alt material',['Da, mai repede decât lumina','Da, la fel ca prin aer','Doar noaptea']],
  ['🧪','Care este formula chimică a apei?','H₂O',['CO₂','O₂','NaCl']],
  ['🌬️','De ce gaz din aer avem nevoie ca să trăim?','Oxigen',['Dioxid de carbon','Heliu','Fum']],
  ['🍎','Ce forță face ca lucrurile să cadă pe pământ?','Gravitația',['Magnetismul','Electricitatea','Vântul']],
  ['🌡️','Cu ce se măsoară temperatura?','Cu termometrul',['Cu cântarul','Cu rigla','Cu ceasul']],
  ['🌈','De ce e nevoie ca să apară un curcubeu?','Lumina soarelui și picături de apă',['Doar nori','Vânt și nisip','Zăpadă']],
  ['🦠','Ce medicamente ajută la combaterea infecțiilor cu bacterii?','Antibioticele',['Plasturii','Vitaminele','Apa cu sare']]];
/* [emoji, ce s-a întâmplat (se citește „… în anul 1492.”), anul (negativ = înainte de Hristos), aproximativ] */
LANGS.ro.data.HISTORY=[
  ['✍️','Scrisul a fost inventat în Mesopotamia',-3200,true],['🔺','A fost construită Marea Piramidă de la Giza',-2560,true],
  ['🏛️','Au avut loc primele Jocuri Olimpice în Grecia',-776,false],['🏟️','A fost inaugurat Colosseumul din Roma',80,false],
  ['📖','Gutenberg a inventat tiparul',1450,true],['⛵','Columb a ajuns în America',1492,false],['🌍','S-a încheiat prima călătorie în jurul lumii',1522,false],
  ['🏔️','Incașii au construit Machu Picchu',1450,true],['📚','A apărut prima parte din Don Quijote',1605,false],
  ['🔭','Galileo Galilei a observat lunile lui Jupiter',1610,false],['💉','Edward Jenner a creat primul vaccin',1796,false],['🚂','A pornit primul tren de călători',1825,false],
  ['☎️','A fost brevetat telefonul',1876,false],['✈️','Frații Wright au făcut primul lor zbor',1903,false],['💊','Alexander Fleming a descoperit penicilina',1928,false],
  ['🕊️','A fost adoptată Declarația Universală a Drepturilor Omului',1948,false],['🛰️','A fost lansat primul satelit artificial',1957,false],
  ['🌕','Oamenii au pășit pentru prima dată pe Lună',1969,false],['🌐','A apărut World Wide Web',1991,false]];
LANGS.ro.data.YEAR=(y,approx)=>(approx?'în jurul anului ':'în anul ')+(y<0?(-y)+' înainte de Hristos':y);
/* Bani în lei: 1 leu, 5 lei, 20 de lei, 7,63 lei; sub un leu, în bani (40 de bani). */
LANGS.ro.data.MONEY=v=>{
  if(v<1){const b=Math.round(v*100);return b===1?'1 ban':b+((b%100>=20)?' de':'')+' bani';}
  if(v%1)return v.toLocaleString('ro-RO',{minimumFractionDigits:2,maximumFractionDigits:2})+' lei';
  return v===1?'1 leu':v.toLocaleString('ro-RO')+((v%100>=20||v%100===0)?' de':'')+' lei';};
/* Se citește: „Este o nevoie sau un moft să ai …?” */
LANGS.ro.data.NEEDS=[['🥛','lapte',true],['🧥','o haină groasă pentru iarnă',true],['💊','medicamente când ești bolnav',true],['🍞','pâine',true],['👟','o pereche de pantofi pentru școală',true],
  ['💧','apă',true],['🪥','o periuță de dinți',true],['🎮','un joc video nou',false],['🍬','o pungă de bomboane',false],['🧸','încă un ursuleț de pluș',false],
  ['🕶️','niște ochelari de soare la modă',false],['📱','un telefon nou când al tău încă merge',false],['🎈','un balon uriaș',false]];
/* Fără ș și ț: unele tastaturi vechi le scriu cu sedilă (ş, ţ) și cuvântul n-ar mai fi recunoscut. */
LANGS.ro.data.TYPING=[
  ['lup','urs','cal','pom','nor','nas','lac','sat','pat','joc','vis','ou','stea','tren','lapte','carte','soare','verde','munte','floare'],
  ['fluture','elefant','dinozaur','bibliotecă','ciocolată','calculator','bicicletă','elicopter','calendar','curcubeu','crocodil','ghiozdan','pinguin','trotinetă','castravete'],
  ['pisica doarme','îmi place să citesc','azi e soare','luna e plină','mergem în parc','marea e albastră','am un câine','cerul e senin','casa e mare','mâncăm fructe']];

/* ---------- vocabular și fraze (un copil care vorbește altă limbă le învață în română) ---------- */
LANGS.ro.data.VOCAB={'🐶':'câine','🐱':'pisică','🐮':'vacă','🐷':'porc','🐴':'cal','🐑':'oaie','🐔':'găină','🦆':'rață','🐟':'pește','🐦':'pasăre',
  '🐸':'broască','🦁':'leu','🐘':'elefant','🐻':'urs','🐰':'iepure','🐭':'șoarece','🐵':'maimuță','🦒':'girafă','🐢':'țestoasă','🐍':'șarpe',
  '🍎':'măr','🍌':'banană','🍓':'căpșună','🍊':'portocală','🍇':'struguri','🍉':'pepene verde','🍞':'pâine','🧀':'brânză','🥛':'lapte','🥚':'ou',
  '🍦':'înghețată','🍪':'biscuit','🥕':'morcov','🍅':'roșie','💧':'apă','🍰':'tort',
  '🏠':'casă','🚪':'ușă','🪟':'fereastră','🛏️':'pat','🪑':'scaun','📖':'carte','⚽':'minge','🧸':'ursuleț','🥄':'lingură','🛁':'cadă','⏰':'ceas','🖍️':'creion cerat',
  '👀':'ochi','👂':'ureche','👃':'nas','👄':'gură','✋':'mână','🦶':'picior','🦷':'dinte','💪':'braț',
  '👕':'tricou','👖':'pantaloni','👗':'rochie','🧦':'șosete','👟':'adidași','🧢':'șapcă','🧥':'haină','🧤':'mănuși',
  '🚗':'mașină','🚌':'autobuz','🚲':'bicicletă','🚂':'tren','✈️':'avion','🚀':'rachetă','⛵':'barcă','🚜':'tractor',
  '☀️':'soare','🌙':'lună','⭐':'stea','☁️':'nor','🌧️':'ploaie','🌈':'curcubeu','🌳':'copac','🌸':'floare','🌊':'mare','⛰️':'munte'};
LANGS.ro.data.PHRASES={hola:'Bună',adios:'La revedere',buenosdias:'Bună dimineața',buenasnoches:'Noapte bună',porfavor:'Te rog',gracias:'Mulțumesc',denada:'Cu plăcere',
  perdon:'Îmi pare rău',comotellamas:'Cum te cheamă?',mellamo:'Mă cheamă Ana',cuantosanos:'Câți ani ai?',tengocinco:'Am cinci ani',
  comoestas:'Ce mai faci?',estoybien:'Sunt bine, mulțumesc',jugar:'Vrei să te joci cu mine?',tequiero:'Te iubesc',hambre:'Mi-e foame',sed:'Mi-e sete',
  bano:'Unde este baia?',nolose:'Nu știu'};
