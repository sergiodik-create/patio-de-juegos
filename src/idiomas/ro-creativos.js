/* Română: jocuri creative (30-creativos.js) și jocuri de masă (40-mesa.js). */
Object.assign(LANGS.ro.t,{
  /* ----- nume și descrieri ale jocurilor ----- */
  'Globos':'Baloane',
  'Explota los globos':'Sparge baloanele',
  'Parejas':'Perechi',
  'Encuentra las iguales':'Găsește-le pe cele la fel',
  'Construir':'Construiește',
  'Haz una torre':'Fă un turn',
  'Colorear':'De colorat',
  'Pinta con los dedos':'Pictează cu degetul',
  'Diseña tu mundo':'Creează-ți lumea',
  'Espacio, mar, bosque…':'Spațiu, mare, pădure…',
  'Inventa un cuento':'Inventează o poveste',
  'Imagina y sueña':'Imaginează și visează',
  'Memoria':'Memorie',
  'Seis parejas':'Șase perechi',
  'Memoria experta':'Memorie de expert',
  'Ocho parejas':'Opt perechi',
  'Adivina el número':'Ghicește numărul',
  'Del 1 al 100':'De la 1 la 100',
  'Tres en raya':'X și 0',
  'Contra la máquina o en pareja':'Cu calculatorul sau cu un prieten',
  'Conecta 4':'Conectează 4',
  'Cuatro en línea':'Patru în linie',
  'Damas':'Dame',
  'Salta y corona':'Sari și fă damă',
  'Ajedrez':'Șah',
  'Aprende y juega':'Învață și joacă',

  /* ----- de colorat ----- */
  'Colorea {x}':'Colorează {x}',
  'Borrar':'Șterge',
  'Otro dibujo ➜':'Alt desen ➜',
  'Elige un color y toca el dibujo':'Alege o culoare și atinge desenul',

  /* ----- construiește un turn ----- */
  'Toca un color para poner un bloque':'Atinge o culoare ca să pui un bloc',
  '¡Derribar!':'Dărâmă!',
  'Vamos a construir una torre. Toca un color.':'Hai să construim un turn. Atinge o culoare.',
  'Bloques: {n}':'Blocuri: {n}',
  '¡Qué torre tan alta! ¡Vamos a derribarla!':'Ce turn înalt! Hai să-l dărâmăm!',

  /* ----- creează-ți lumea ----- */
  'Espacio':'Spațiu',
  'Mar':'Mare',
  'Bosque':'Pădure',
  'Granja':'Fermă',
  'Ciudad':'Oraș',
  '📒 Mis pegatinas':'📒 Abțibildurile mele',
  'Borrar todo':'Șterge tot',
  'Toca los dibujos para ponerlos en tu mundo. Para moverlos, arrástralos o tócalos y luego toca el sitio nuevo.':
    'Atinge desenele ca să le pui în lumea ta. Ca să le muți, trage-le sau atinge-le și apoi atinge locul nou.',

  /* ----- inventează o poveste ----- */
  'Escuchar otra vez':'Ascultă din nou',
  'Otro cuento ➜':'Altă poveste ➜',

  /* ----- memorie ----- */
  'Encuentra las parejas':'Găsește perechile',
  'Carta':'Cartonaș',
  'Encuentra las parejas iguales':'Găsește perechile de cartonașe la fel',
  '¡Las encontraste todas!':'Le-ai găsit pe toate!',
  'Otra vez':'Încă o dată',
  '¡Pareja!':'Pereche!',
  '¡Muy bien!':'Foarte bine!',
  '¡Iguales!':'Sunt la fel!',

  /* ----- baloane ----- */
  'Globos: {n}':'Baloane: {n}',
  '¡Explota los globos!':'Sparge baloanele!',
  /* {c} este numele unei culori din COLORS, la masculin: «balon roșu» */
  'globo {c}':'balon {c}',

  /* ----- ghicește numărul ----- */
  'Pienso un número del 1 al 100':'Mă gândesc la un număr de la 1 la 100',
  'Probar':'Încearcă',
  'Pienso un número del 1 al 100. ¿Cuál es?':'Mă gândesc la un număr de la 1 la 100. Care este?',
  'Escribe un número del 1 al 100':'Scrie un număr de la 1 la 100',
  '¡Era el {n}! Lo lograste en {t} intento.':v=>+v.t===1?`Era numărul ${v.n}! L-ai ghicit din prima!`:`Era numărul ${v.n}! L-ai ghicit din ${v.t}${(v.t%100>=20||v.t%100===0)?' de':''} încercări.`,
  '¡Era el {n}! Lo lograste en {t} intentos.':v=>+v.t===1?`Era numărul ${v.n}! L-ai ghicit din prima!`:`Era numărul ${v.n}! L-ai ghicit din ${v.t}${(v.t%100>=20||v.t%100===0)?' de':''} încercări.`,
  'Jugar otra vez':'Joacă din nou',
  'Es mayor que {v}':'Numărul meu e mai mare decât {v}',
  'Es menor que {v}':'Numărul meu e mai mic decât {v}',

  /* ----- jocuri de masă: butoane comune ----- */
  '🤖 Contra la máquina':'🤖 Cu calculatorul',
  '👫 Dos jugadores':'👫 Doi jucători',
  '↻ Nueva partida':'↻ Joc nou',
  'Fácil':'Ușor',
  'Normal':'Normal',
  'Difícil':'Greu',
  '¡Has ganado!':'Ai câștigat!',
  'Gana la máquina. ¡Otra!':'Câștigă calculatorul. Mai jucăm o dată!',
  'La máquina piensa…':'Calculatorul se gândește…',
  'Te toca':'E rândul tău',
  'Empate':'Egalitate!',

  /* ----- X și 0 (în voce: «ics» și «zero») ----- */
  'Tú eres la X. ¡Empiezas!':'Tu ești X. Începi tu!',
  'Le toca a la X':'E rândul lui X',
  'Le toca a la O':'E rândul lui 0',
  'Tú eres la equis. Empiezas tú.':'Tu ești ics. Începi tu.',
  'Empieza la equis':'Începe ics.',
  'Casilla':'Căsuța',
  '¡Gana la X!':'Câștigă X!',
  '¡Gana la O!':'Câștigă 0!',
  'Empate. ¡Muy bien jugado!':'Egalitate. Foarte bine jucat!',

  /* ----- conectează 4 ----- */
  'Tú tienes las rojas. ¡Empiezas!':'Tu ai piesele roșii. Începi tu!',
  'Empiezan las rojas':'Încep piesele roșii',
  'Junta cuatro fichas en línea':'Pune patru piese în linie',
  'Columna':'Coloana',
  '¡Ganan las rojas!':'Câștigă piesele roșii!',
  '¡Ganan las amarillas!':'Câștigă piesele galbene!',
  'Les toca a las rojas':'E rândul pieselor roșii',
  'Les toca a las amarillas':'E rândul pieselor galbene',

  /* ----- dame (și albele și negrele pentru șah) ----- */
  'Tú llevas las blancas. ¡Empiezas!':'Tu ai piesele albe. Începi tu!',
  'Empiezan las blancas':'Încep piesele albe.',
  'Si puedes comer, tienes que hacerlo. Llega al otro lado para coronar una dama 👑.':
    'Dacă poți lua o piesă, trebuie s-o iei. Ajunge în partea cealaltă ca să faci damă 👑.',
  'casilla':'căsuță',
  '¡Tienes que comer!':'Trebuie să iei o piesă!',
  'Esa ficha no se puede mover':'Piesa aceasta nu se poate muta',
  '¡Dama!':'Damă nouă!',
  '¡Sigue comiendo!':'Mai ia o piesă!',
  '¡Ganan las blancas!':'Câștigă piesele albe!',
  '¡Ganan las negras!':'Câștigă piesele negre!',
  'Les toca a las blancas':'E rândul pieselor albe',
  'Les toca a las negras':'E rândul pieselor negre',

  /* ----- șah ----- */
  'Toca una pieza para ver adónde puede moverse.':'Atinge o piesă ca să vezi unde se poate muta.',
  /* {p} este un nume din CHESS.names, de exemplu «turnul»: «turnul alb», «regina albă».
     (Șahul în română folosește CHESS.label, mai jos; acestea rămân de rezervă.) */
  '{p} blanco':v=>v.p+' '+(/a$/.test(v.p)?'albă':'alb'),
  '{p} negro':v=>v.p+' '+(/a$/.test(v.p)?'neagră':'negru'),
  'casilla vacía':'căsuță goală',
  'Esa pieza es del otro equipo':'Piesa aceasta e a celeilalte echipe',
  'Ahí no puede ir':'Acolo nu se poate muta',
  '¡Jaque mate! ¡Has ganado!':'Șah mat! Ai câștigat!',
  'Jaque mate. Gana la máquina.':'Șah mat. Câștigă calculatorul.',
  '¡Jaque mate! Ganan las blancas.':'Șah mat! Câștigă piesele albe.',
  '¡Jaque mate! Ganan las negras.':'Șah mat! Câștigă piesele negre.',
  'Tablas: no quedan movimientos.':'Remiză: nu mai există nicio mutare posibilă.',
  'Tablas: solo quedan los reyes.':'Remiză: au rămas doar cei doi regi.',
  '¡Jaque!':'Șah!',
});

/* Culorile din cutia de culori și numele desenelor de colorat, în aceeași ordine ca în spaniolă.
   Desenele au articol hotărât («Colorează casa»). */
LANGS.ro.data.PAINT_NAMES=['roșu','portocaliu','galben','verde','albastru','mov','roz','maro','negru','alb'];
LANGS.ro.data.DRAWING_NAMES=['casa','floarea','racheta','peștele','mașina','pisica'];

/* Inventează o poveste. heroes: [emoji, cu «un/o», cu articol hotărât]; places răspund la «Unde locuiește?»
   (de aceea își aduc prepoziția: «în», «pe», «într-un»); objects: [emoji, cu «un/o»].
   tell() face acordul: genul vine din «un»/«o», forma hotărâtă a obiectului («steaua», «balonul»),
   genitivul eroului («în fața dragonului», «în fața zânei») și pronumele «l-a» / «-o». */
LANGS.ro.data.STORY={
  ask:['Cine este eroul poveștii noastre?','Unde locuiește eroul nostru?','Ce găsește eroul nostru?'],
  heroes:[['🐉','un dragon','dragonul'],['🧚','o zână','zâna'],['🤖','un robot','robotul'],['🦄','un unicorn','unicornul'],['🐢','o țestoasă','țestoasa'],['🐻','un ursuleț','ursulețul']],
  places:[['🌌','în spațiul cosmic'],['🌊','pe fundul mării'],['🏰','într-un castel din nori'],['🌳','într-o pădure fermecată'],['🏝️','pe o insulă din bomboane']],
  objects:[['⭐','o stea magică'],['🎈','un balon uriaș'],['🗝️','o cheie aurie'],['🍪','un biscuit vorbăreț'],['🎨','o pensulă care picta vise']],
  tell(h,p,o){const [,hi,hd]=h,[,pl]=p,[,ob]=o,
      fo=/^o /.test(ob),
      /* «o stea» → «steaua», «o cheie» → «cheia», «o pensulă» → «pensula», «un balon» → «balonul» */
      the=ob.replace(/^(un|o) (\S+)/,(m,a,w)=>a==='o'?w.replace(/ea$/,'eaua').replace(/ie$/,'ia').replace(/ă$/,'a').replace(/e$/,'ea'):w+(/e$/.test(w)?'le':/u$/.test(w)?'l':'ul')),
      /* «dragonul» → «dragonului», «zâna» → «zânei» */
      ghd=/ul$/.test(hd)?hd+'ui':hd.replace(/a$/,'ei');
    return [
      `A fost odată ca niciodată ${hi} care locuia ${pl}.`,
      pick([`Într-o dimineață, în timp ce se juca, ${hd} a găsit ${ob}.`,`Într-o zi foarte liniștită, ${ob} a apărut chiar în fața ${ghd}.`]),
      pick([`${cap(the)} strălucea atât de tare, încât totul în jur s-a umplut de culori.`,`Deodată, ${the} a început să țopăie și să cânte un cântec foarte vesel.`,`Când ${hd} ${fo?'a atins-o':'l-a atins'}, a simțit niște gâdilături magice în burtică.`]),
      pick(['Împreună au călătorit până sus de tot, acolo unde norii au gust de vată de zahăr.','Pe drum au cunoscut mulți prieteni noi care voiau să se joace.','Au găsit o comoară ascunsă, plină de râsete și îmbrățișări.','Au ajutat o păsărică rătăcită să se întoarcă la familia ei.']),
      pick([`La sfârșitul zilei, ${hd} s-a întors acasă, a închis ochii și a visat noi aventuri. Sfârșit.`,`Și din ziua aceea, ${hd} știe că visele devin realitate atunci când le împărtășim. Sfârșit.`])];}
};

/* Șah: numele pieselor (spuse când atingi o piesă), sfaturi ca să înveți cum se mută fiecare piesă,
   cuvântul pentru egalitate și label(), care acordă culoarea cu piesa: «turnul alb», «regina neagră». */
LANGS.ro.data.CHESS={names:{p:'pionul',n:'calul',b:'nebunul',r:'turnul',q:'regina',k:'regele'},
  tips:{p:'Pionul merge înainte o căsuță (două la prima lui mutare) și ia piesele pe diagonală.',
  n:'Calul sare în formă de L și poate trece peste alte piese.',
  b:'Nebunul se mută pe diagonală, câte căsuțe vrea.',
  r:'Turnul se mută în linie dreaptă: în sus, în jos, la stânga sau la dreapta.',
  q:'Regina este cea mai puternică piesă: se mută și ca turnul, și ca nebunul.',
  k:'Regele se mută o căsuță în orice direcție. Trebuie să-l aperi!'},
  draw:'Remiză',
  label:(t,white)=>{const n=LANGS.ro.data.CHESS.names[t],f=t==='q';return n+' '+(white?(f?'albă':'alb'):(f?'neagră':'negru'));}};
