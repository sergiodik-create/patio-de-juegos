/* Français : jeux de 50-peques.js, 51-medianos.js et 52-mayores.js.
   Les espaces avant ? ! : ; et à l'intérieur de « » sont insécables, comme le veut la typographie française. */
(()=>{
/* Petites aides pour ce fichier seulement (dans cette fonction pour ne pas gêner les autres fichiers). */
const cap1=t=>t?String(t)[0].toUpperCase()+String(t).slice(1):t;
const pl=(n,w)=>n+` `+w+(+n===1?``:`s`);
const vowel=x=>/^[aeiouyàâéèêëîïôûh]/i.test(String(x));
/* de + article : l'ombre du train, de la girafe, de l'arbre */
const de=x=>{x=String(x);
  if(/^le /i.test(x))return `du `+x.slice(3);
  if(/^les /i.test(x))return `des `+x.slice(4);
  if(/^(la |l'|l’)/i.test(x))return `de `+x;
  return (vowel(x)?`d'`:`de `)+x;};
/* que + voyelle : « la même chose qu'un demi » */
const que=x=>(/^une? /.test(String(x))?`qu'`:`que `)+x;
const SMALL=[`zéro`,`un`,`deux`,`trois`,`quatre`,`cinq`,`six`,`sept`,`huit`,`neuf`,`dix`,`onze`,`douze`,
  `treize`,`quatorze`,`quinze`,`seize`,`dix-sept`,`dix-huit`,`dix-neuf`];
const TENS={2:`vingt`,3:`trente`,4:`quarante`,5:`cinquante`};
const numWord=n=>n<20?SMALL[n]:n<60?TENS[Math.floor(n/10)]+(n%10===0?``:n%10===1?` et un`:`-`+SMALL[n%10]):String(n);
const hour12=x=>(x-1)%12+1;
/* L'heure comme on l'apprend à l'école : « trois heures », « trois heures et quart », « trois heures et demie »,
   « quatre heures moins le quart », « une heure », « midi » (12 sur l'horloge), « midi et demi ».
   digits : chiffres pour les boutons (« 3 heures »), mots pour la voix (« trois heures »). */
const HOURS=[``,`une`,`deux`,`trois`,`quatre`,`cinq`,`six`,`sept`,`huit`,`neuf`,`dix`,`onze`];
const hourName=(h,digits)=>{h=hour12(h);if(h===12)return `midi`;return (digits?String(h):HOURS[h])+(h===1?` heure`:` heures`);};
const clock=(h,m,digits)=>{
  const noon=hour12(h)===12;
  if(m===0)return hourName(h,digits);
  if(m===15)return hourName(h,digits)+` et quart`;
  if(m===30)return hourName(h,digits)+(noon?` et demi`:` et demie`);
  if(m===45)return hourName(h+1,digits)+` moins le quart`;
  return m<30?hourName(h,digits)+` `+(digits?m:numWord(m)):hourName(h+1,digits)+` moins `+(digits?60-m:numWord(60-m));
};

Object.assign(LANGS.fr.t,{
  /* ---------- 50-peques.js : noms sur les portes des jeux ---------- */
  'Puzle':'Puzzle',
  'Pon cada pieza en su sitio':'Mets chaque pièce à sa place',
  'Piano de animales':'Le piano des animaux',
  'Toca y repite la música':'Joue et répète la musique',
  'Sombras':'Les ombres',
  '¿De quién es la sombra?':'À qui est cette ombre ?',
  '¿Cómo se siente?':'Quelle émotion ?',
  'Alegría, tristeza, miedo…':'Joie, tristesse, peur…',
  '¿Qué pasa después?':'Qu\'est-ce qui se passe après ?',
  'Huevo, pollito, gallina…':'Œuf, poussin, poule…',

  /* ombres ({x} porte son article : l'ombre du chien, de la vache, de l'abeille) */
  '¿De quién es esta sombra?':'À qui est cette ombre ?',
  '¡Es la sombra de {x}!':v=>`C'est l'ombre ${de(v.x)} !`,
  'Eso es {x}. Mira bien la forma.':'Ça, c\'est {x}. Regarde bien la forme.',

  /* émotions : {f} complète « le visage… » (content, triste, en colère, qui a peur…) ; les situations parlent de Léo */
  'Toca la cara de {f}':'Touche le visage {f}',
  'Es la cara de {f}.':'C\'est le visage {f}.',
  'Esa es la cara de {f}. Prueba otra vez.':'Ça, c\'est le visage {f}. Essaie encore.',
  '{s} ¿Cómo se siente?':'{s} Comment se sent Léo ?',
  /* « qui a peur » → « Léo a peur. » ; « content » → « Léo se sent content. » */
  'Siente {f}.':v=>/^qui /.test(v.f)?`Léo ${String(v.f).slice(4)}.`:`Léo se sent ${v.f}.`,
  'Puede ser, pero piensa otra vez: ¿qué sentirías tú?':'Peut-être, mais réfléchis encore : et toi, qu\'est-ce que tu ressentirais ?',

  /* qu'est-ce qui se passe après ? */
  'Piensa qué pasa primero y qué pasa luego.':'Réfléchis : qu\'est-ce qui se passe d\'abord, et ensuite ?',

  /* puzzle */
  '{n} piezas':'{n} pièces',
  'Hueco':'Case',
  'Pieza':'Pièce',
  'Toca una pieza y luego toca su sitio en el puzle.':'Touche une pièce, puis touche sa place dans le puzzle.',
  '¡Puzle terminado! ¡Qué bien!':'Puzzle terminé ! Bravo !',
  'Otro puzle':'Un autre puzzle',
  'Ahí no va. Prueba en otro sitio.':'Elle ne va pas là. Essaie ailleurs.',

  /* piano des animaux (la chanson a la même mélodie que « Ah ! vous dirai-je, maman » et « Brille, brille, petite étoile ») */
  'Toca las teclas para hacer música.':'Appuie sur les touches pour faire de la musique.',
  'Nota':'Note',
  '🎵 Estrellita':'🎵 Petite étoile',
  '🔁 Repite conmigo':'🔁 Répète avec moi',
  '¡Eres un gran músico!':'Quelle belle musique !',
  '¡Bravo! ¡Eres un gran músico!':'Bravo ! Quelle belle musique !',
  '¡Muy bien! Escucha la siguiente.':'Très bien ! Écoute la suivante.',
  '¡Casi! Escucha otra vez.':'Presque ! Écoute encore.',
  'Escucha…':'Écoute…',
  '¡Ahora tú! Repite las notas.':'À toi ! Répète les notes.',
  'Estrellita, ¿dónde estás?':'Brille, brille, petite étoile…',
  '¿La tocas tú? Empieza por el perrito.':'Tu la joues ? Commence par le petit chien.',
  'Escucha y repite.':'Écoute et répète.',

  /* ---------- 51-medianos.js : noms sur les portes des jeux ---------- */
  'Laberinto':'Labyrinthe',
  'Lleva al ratón al queso':'Emmène la souris jusqu\'au fromage',
  'Trazar letras':'Tracer les lettres',
  'Escribe con el dedo':'Écris avec ton doigt',
  'Dominó':'Dominos',
  '¿Qué ficha encaja?':'Quel domino va à côté ?',
  '¿Qué hora es?':'Quelle heure est-il ?',
  'Aprende el reloj':'Apprends à lire l\'heure',
  'Monedas':'Les pièces',
  '¿Cuánto dinero hay?':'Il y a combien d\'argent ?',
  'Sopa de letras':'Mots mêlés',
  'Encuentra las palabras':'Trouve les mots',

  /* dominos */
  '¿Qué ficha puede ir al lado?':'Quel domino peut aller à côté ?',
  'Busca una ficha que tenga 1 punto.':'Cherche un domino qui a 1 point.',
  'Busca una ficha que tenga {n} puntos.':'Cherche un domino qui a {n} points.',
  '{a} y {b}':'{a} et {b}',
  'Sí, las dos tienen {n}.':v=>`Oui, les deux ont ${pl(v.n,`point`)}.`,
  'Esa ficha no tiene {n}. Cuenta los puntos.':v=>`Ce domino n'a pas de côté avec ${pl(v.n,`point`)}. Compte bien les points.`,

  /* horloge */
  'Fíjate: la aguja corta marca la hora y la larga, los minutos.':'Regarde bien : la petite aiguille montre les heures, et la grande, les minutes.',

  /* pièces de monnaie */
  '¿Cuánto dinero hay en total?':'Il y a combien d\'argent en tout ?',
  'Hay {n} en total.':'Il y a {n} en tout.',
  'Suma primero las monedas grandes.':'Additionne d\'abord les grosses pièces.',
  'Cuenta las monedas una a una.':'Compte les pièces une par une.',

  /* labyrinthe */
  'Pequeño':'Petit',
  'Mediano':'Moyen',
  'Grande':'Grand',
  'Arriba':'En haut',
  'Izquierda':'À gauche',
  'Abajo':'En bas',
  'Derecha':'À droite',
  'Lleva al ratón hasta el queso. Usa las flechas o desliza el dedo.':'Emmène la souris jusqu\'au fromage. Utilise les flèches, ou fais glisser ton doigt.',
  '¡Ñam! El ratón ha encontrado el queso.':'Miam ! La souris a trouvé le fromage.',
  'Otro laberinto':'Un autre labyrinthe',

  /* tracer les lettres ({l} arrive en minuscule ; la majuscule aide la voix à dire le nom de la lettre) */
  'Mayúsculas':'Majuscules',
  'minúsculas':'minuscules',
  'Números':'Chiffres',
  'el número {n}':'le chiffre {n}',
  'la {l}, de {w}':v=>`la lettre ${String(v.l).toUpperCase()}, comme ${v.w}`,
  'la {l}':v=>`la lettre ${String(v.l).toUpperCase()}`,
  'Repasa {l} con el dedo.':'Repasse {l} avec ton doigt.',
  'Zona para escribir':'Zone pour écrire',
  '🔊 Oír':'🔊 Écouter',
  'Siguiente ➡️':'Suivant ➡️',
  '¡Qué bien escrita! Toca «Siguiente».':'Bravo, c\'est bien écrit ! Touche « Suivant ».',
  '¡Muy bien escrita!':'C\'est très bien écrit !',
  /* nomme le même bouton que la traduction de 'Borrar', quelle qu'elle soit */
  'Intenta seguir la letra gris. Toca «Borrar» para empezar de nuevo.':()=>`Essaie de suivre la lettre grise. Touche « ${_('Borrar')} » pour recommencer.`,
  '¡Sigue! Repasa toda la letra.':'Continue ! Repasse toute la lettre.',

  /* mots mêlés */
  'Toca la primera letra de una palabra y después la última.':'Touche la première lettre d\'un mot, puis la dernière.',
  '¡Has encontrado todas las palabras!':'Tu as trouvé tous les mots !',
  'Otra sopa':'Une autre grille',
  'Busca las palabras escondidas.':'Cherche les mots cachés.',
  '¡{w}!':'{w} !',

  /* ---------- 52-mayores.js : noms sur les portes des jeux ---------- */
  'Sudoku':'Sudoku',
  'Lógica con números':'Logique avec les nombres',
  'Salva la flor':'Sauve la fleur',
  'Adivina la palabra':'Devine le mot',
  'Robot':'Robot',
  'Prográmalo con flechas':'Programme-le avec des flèches',
  'Programa con bucles':'Programme avec des boucles',
  'El robot que repite':'Le robot qui répète',
  'Fracciones':'Les fractions',
  'Partes de una pizza':'Les parts d\'une pizza',
  'Continentes':'Les continents',
  '¿Dónde está?':'C\'est où ?',

  /* fractions ({f}, {a} et {b} sont des fractions en mots : « un demi », « trois quarts ») */
  '¿Qué parte de la pizza está pintada?':'Quelle partie de la pizza est coloriée ?',
  'Es {f}.':'C\'est {f}.',
  'Cuenta los trozos pintados y los trozos que hay en total.':'Compte les parts coloriées, puis toutes les parts.',
  '¿Qué fracción es igual?':'Quelle fraction est égale ?',
  '{f}. ¿Qué fracción es igual?':v=>`${cap1(v.f)}. Quelle fraction est égale ?`,
  '{a} es lo mismo que {b}.':v=>`${cap1(v.a)}, c'est la même chose ${que(v.b)}.`,
  'Divide arriba y abajo por el mismo número.':'Divise le nombre du haut et celui du bas par le même nombre.',

  /* continents ({c} sans article : en Europe, en Asie, en Antarctique) */
  '¿En qué continente vive {x} en libertad?':'Sur quel continent vit {x} à l\'état sauvage ?',
  '¿En qué continente está {x}?':'Sur quel continent se trouve {x} ?',
  'Está en {c}.':'C\'est en {c}.',
  'No es ahí. Piensa en el mapa del mundo.':'Ce n\'est pas là. Pense à la carte du monde.',

  /* sudoku */
  'Cada fila, cada columna y cada caja tienen todos los números sin repetir.':'Chaque ligne, chaque colonne et chaque bloc ont tous les chiffres, sans en répéter aucun.',
  'Toca una casilla vacía y luego un número.':'Touche une case vide, puis un chiffre.',
  '¡Sudoku resuelto! ¡Qué cabeza!':'Sudoku résolu ! Quel cerveau !',
  'Otro sudoku':'Un autre sudoku',

  /* sauve la fleur */
  'Pista: {c}':'Indice : {c}',
  '💡 Ver dibujo':'💡 Voir le dessin',
  'Adivina la palabra antes de que la flor pierda todos sus pétalos.':'Devine le mot avant que la fleur perde tous ses pétales.',
  '¡Bien! Has salvado la flor: {w}.':'Bravo ! Tu as sauvé la fleur. Le mot était {w}.',
  '¡Oh! La flor se ha quedado sin pétalos. Era «{w}».':'Oh non ! La fleur n\'a plus de pétales. Le mot était « {w} ».',
  'Otra palabra':'Un autre mot',

  /* robot (les noms des boutons « Répéter » et « En avant » sont les mêmes que plus bas) */
  'Lleva el robot a la batería. Usa «Repetir» para gastar menos bloques.':'Emmène le robot jusqu\'à la batterie. Utilise « Répéter » pour avoir besoin de moins de blocs.',
  'Lleva el robot hasta la batería. Pon las flechas y pulsa «Adelante».':'Emmène le robot jusqu\'à la batterie. Ajoute les flèches, puis appuie sur « En avant ».',
  'Reto {i} de {n} · Máximo {m} bloques':'Défi {i} sur {n} · {m} blocs au maximum',
  'Reto libre':'Défi libre',
  'Programa':'Programme',
  '🔁 Repetir':'🔁 Répéter',
  '⤴ Fin':'⤴ Fin',
  '▶ Adelante':'▶ En avant',
  'Máximo {m} bloques. Usa «Repetir».':'Pas plus de {m} blocs. Utilise « Répéter ».',
  'Repetir {n} veces':'Répéter {n} fois',
  'Tu programa aparecerá aquí.':'Ton programme apparaîtra ici.',
  'Bloques: {b} de {m}':'Blocs : {b} sur {m}',
  'Primero pon algunas flechas.':'Ajoute d\'abord quelques flèches.',
  'El robot se ha parado antes de llegar. Cambia el programa.':'Le robot s\'est arrêté avant d\'arriver. Change le programme.',
  '¡Uy! El robot se ha chocado. Cambia el programa.':'Oups ! Le robot s\'est cogné. Change le programme.',
  '¡Conseguido con {b} bloques!':v=>`Réussi avec ${pl(v.b,`bloc`)} !`,
  '¡Conseguido en {n} pasos!':'Réussi en {n} pas !',
  'Siguiente reto':'Défi suivant',
});

/* ---------- données de 50-peques.js ---------- */
LANGS.fr.data.SHADOWS=[['🚂','le train'],['🦒','la girafe'],['🐘','l\'éléphant'],['🦋','le papillon'],['🐢','la tortue'],['🌳','l\'arbre']];
/* n se dit dans « Touche le visage content » et « Léo se sent content » (ou « Léo a peur » pour « qui a peur »). */
LANGS.fr.data.FEELINGS=[
  {e:'😀',n:'content',tip:'Quand il nous arrive quelque chose de beau, on est content.'},
  {e:'😢',n:'triste',tip:'Quand on est triste, un câlin, ça aide.'},
  {e:'😠',n:'en colère',tip:'Quand on est en colère, on peut respirer profondément et le dire avec des mots.'},
  {e:'😨',n:'qui a peur',tip:'Quand on a peur, on peut demander de l\'aide à un adulte.'},
  {e:'😲',n:'surpris',tip:'On est surpris quand il se passe quelque chose qu\'on n\'attendait pas.'},
  {e:'😴',n:'qui a sommeil',tip:'Quand on a sommeil, notre corps nous demande de nous reposer.'}];
/* Chaque situation est suivie de « Comment se sent Léo ? » ; le deuxième élément doit être un des noms de FEELINGS. */
LANGS.fr.data.SITUATIONS=[
  ['Léo reçoit un très, très gros câlin.','content'],['Léo gagne une course avec ses copains.','content'],['Aujourd\'hui, c\'est l\'anniversaire de Léo.','content'],
  ['La glace de Léo est tombée par terre.','triste'],['Le meilleur ami de Léo part habiter loin.','triste'],
  ['Quelqu\'un prend le jouet de Léo sans lui demander.','en colère'],['Quelqu\'un déchire le dessin que Léo avait fait.','en colère'],
  ['Il y a un gros orage avec beaucoup de tonnerre.','qui a peur'],['Léo entend un bruit bizarre dans le noir.','qui a peur'],
  ['Léo ouvre une boîte, et un jouet en sort d\'un bond.','surpris'],['Léo trouve un cadeau sous son oreiller.','surpris'],
  ['Léo a joué toute la journée, et maintenant il fait nuit.','qui a sommeil']];
LANGS.fr.data.NEXT_SEQS=[
  {e:['🥚','🐣','🐔'],t:'Le poussin sort de l\'œuf, et le poussin grandit jusqu\'à devenir une poule.'},
  {e:['🌱','🪴','🌳'],t:'La graine germe, pousse, pousse, et devient un arbre.'},
  {e:['🐛','🦋'],t:'La chenille se transforme en papillon.'},
  {e:['🌧️','🌈'],t:'Après la pluie, parfois, un arc-en-ciel apparaît.'},
  {e:['🧦','👟'],t:'D\'abord les chaussettes, et ensuite les chaussures.'},
  {e:['🧼','🍽️'],t:'On se lave les mains avant de manger.'},
  {e:['🌅','☀️','🌙'],t:'Le matin, le soleil se lève, et la nuit, on voit la lune.'},
  {e:['👶','🧒','🧑'],t:'Les bébés grandissent, deviennent des enfants, puis des adultes.'},
  {e:['🌸','🍏','🍎'],t:'D\'abord la fleur, puis le fruit vert, et ensuite le fruit mûr.'},
  {e:['❄️','⛄','💧'],t:'Avec la neige, on fait un bonhomme, et le soleil le fait fondre.'},
  {e:['🛏️','🪥','🎒'],t:'On se lève, on se brosse les dents et on va à l\'école.'},
  {e:['🎂','🕯️','🥳'],t:'On met les bougies sur le gâteau, on souffle, et c\'est la fête !'}];

/* ---------- données de 51-medianos.js ---------- */
/* Boutons : « 3 heures », « 3 heures et demie », « 3 heures et quart », « 4 heures moins le quart », « Midi » (en chiffres, comme sur l'horloge). */
LANGS.fr.data.TIME=(h,m)=>cap1(clock(h,m,true));
/* Dit après une bonne réponse : « Il est trois heures et demie. » */
LANGS.fr.data.TIME_SAY=(h,m)=>`Il est `+clock(h,m,false)+`.`;
/* Toutes les lettres, les voyelles d'abord, puis les consonnes dans l'ordre où on les apprend souvent au CP ;
   le é en minuscule, comme le ñ en espagnol (« la lettre É, comme éléphant »). */
LANGS.fr.data.TRACE={upper:'AEIOUYLMRSTPNDFVCBGJHZKQWX',lower:'aeéiouylmrstpndfvcbgjhzkqwx'};

/* ---------- données de 52-mayores.js ---------- */
/* Les lettres accentuées (é, è, à, ç…) se devinent avec la lettre sans accent : la touche E découvre aussi les É. */
LANGS.fr.data.KEYBOARD='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/* Seulement des lettres (avec ou sans accent) et des espaces : pas de trait d'union, d'apostrophe ni de œ, qui ne sont pas sur le clavier. */
LANGS.fr.data.HANGMAN=[
  ['Animaux',[['🐘','éléphant'],['🦒','girafe'],['🐢','tortue'],['🦋','papillon'],['🐊','crocodile'],['🐧','pingouin'],['🦉','hibou'],['🐬','dauphin'],['🦓','zèbre'],['🐿️','écureuil'],['🦔','hérisson'],['🐙','pieuvre']]],
  ['Fruits et nourriture',[['🍎','pomme'],['🍌','banane'],['🍓','fraise'],['🍉','pastèque'],['🍊','orange'],['🍅','tomate'],['🥕','carotte'],['🍞','pain'],['🧀','fromage'],['🍇','raisin']]],
  ['L\'espace',[['🪐','planète'],['⭐','étoile'],['🚀','fusée'],['👩‍🚀','astronaute'],['🌌','galaxie'],['☄️','comète'],['🛰️','satellite'],['🌙','lune']]],
  ['La nature',[['⛰️','montagne'],['🌋','volcan'],['🏞️','rivière'],['🌲','forêt'],['🌻','tournesol'],['⛈️','orage'],['🏜️','désert'],['🌊','vague'],['🍄','champignon']]],
  ['À la maison',[['🛏️','lit'],['🪑','chaise'],['🚪','porte'],['🪟','fenêtre'],['🧸','nounours'],['📚','livre'],['🥄','cuillère'],['🛁','baignoire']]]];
/* Fraction en mots : 1/2 → « un demi », 1/3 → « un tiers », 3/4 → « trois quarts », 2/5 → « deux cinquièmes ». */
LANGS.fr.data.FRACTION=(k,n)=>{
  const d={2:[`demi`,`demis`],3:[`tiers`,`tiers`],4:[`quart`,`quarts`],5:[`cinquième`,`cinquièmes`],6:[`sixième`,`sixièmes`],
    7:[`septième`,`septièmes`],8:[`huitième`,`huitièmes`],9:[`neuvième`,`neuvièmes`],10:[`dixième`,`dixièmes`]}[n];
  if(!d)return numWord(k)+` sur `+numWord(n);
  return numWord(k)+` `+d[k===1?0:1];
};
/* Les six continents qu'on apprend à l'école en France (l'Amérique en un seul), comme DATA.es.
   kind reste 'vive' (un animal qui y vit à l'état sauvage) ou 'está' (un lieu) ; le nombre est le continent.
   Sans article : « C'est en Europe. », « C'est en Antarctique. » */
LANGS.fr.data.WORLD={continents:['Amérique','Europe','Asie','Afrique','Océanie','Antarctique'],items:[
  ['🦘','vive','le kangourou',4],['🐨','vive','le koala',4],['🐼','vive','le panda géant',2],['🦒','vive','la girafe',3],['🦓','vive','le zèbre',3],
  ['🐆','vive','le jaguar',0],['🐧','vive','le manchot empereur',5],['🦅','vive','le condor des Andes',0],['🦍','vive','le gorille',3],
  ['🗽','está','la statue de la Liberté',0],['🗼','está','la tour Eiffel',1],['🔺','está','la grande pyramide de Gizeh',3],['🗻','está','le mont Fuji',2],
  ['🏟️','está','le Colisée de Rome',1],['🏔️','está','le mont Everest',2],['🌳','está','la forêt amazonienne',0],['🏜️','está','le désert du Sahara',3],
  ['⛪','está','la Sagrada Família de Barcelone',1],['🕌','está','le Taj Mahal',2],['🌉','está','le pont du Golden Gate',0],['🪸','está','la Grande Barrière de corail',4],['🧊','está','la plus grande couche de glace de la planète',5]]};
})();
