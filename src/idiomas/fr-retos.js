/* Français : jeux pour 11 et 12 ans (55-once-doce.js) et section « Langues » pour apprendre une autre langue (56-idiomas.js).
   Les espaces avant ? ! : ; % € °C et à l'intérieur de « » sont insécables (U+00A0), comme le veut la typographie française. */
(()=>{
/* Petite aide pour ce fichier seulement : l'article défini devant un mot du vocabulaire (le chien, la vache, l'oiseau, les yeux). */
const FEM=/^(vache|poule|grenouille|girafe|tortue|souris|pomme|banane|fraise|orange|pastèque|glace|carotte|tomate|eau|maison|porte|fenêtre|chaise|cuillère|baignoire|oreille|bouche|main|dent|robe|casquette|voiture|fusée|lune|étoile|pluie|fleur|mer|montagne)$/;
const PLUR=/^(yeux|chaussettes|baskets|gants)$/;
const art=w=>/^[aeiouyàâéèêëîïôœû]/i.test(w)?'l\'':FEM.test(w)?'la ':'le ';

Object.assign(LANGS.fr.t,{
  /* ---------- 55-once-doce.js : noms des jeux ---------- */
  'Acertijos': 'Devinettes',
  'Piensa antes de contestar': 'Réfléchis avant de répondre',
  'Mecanografía': 'Clavier',
  'Escribe rápido y bien': 'Écris vite et bien',
  'Ciencia': 'Sciences',
  'Cuerpo, materia y energía': 'Corps, matière et énergie',
  'Historia': 'Histoire',
  '¿Qué pasó antes?': 'Qu\'est-ce qui est arrivé d\'abord ?',
  'Dinero y ahorro': 'Argent et économies',
  'Ahorra, compara y decide': 'Économise, compare et décide',

  /* devinettes */
  'Si hoy es {d}, ¿qué día será dentro de {n} días?': 'Si aujourd\'hui nous sommes {d}, quel jour serons-nous dans {n} jours ?',
  'Si hoy es {d}, ¿qué día fue hace {n} días?': 'Si aujourd\'hui nous sommes {d}, quel jour étions-nous il y a {n} jours ?',
  'Cada 7 días se repite el mismo día de la semana. {n} días son {w} semanas y {r} días más.': v=>{
    const sem=v.w===1?'une semaine':`${v.w} semaines`,jr=v.r===1?'un jour':`${v.r} jours`;
    return 'Tous les 7 jours, on retombe sur le même jour de la semaine. '+(
      v.w===0?`${v.n} jours, c'est moins d'une semaine : il suffit de les compter un par un.`:
      v.r===0?`${v.n} jours, c'est exactement ${sem} : c'est donc le même jour.`:
      `${v.n} jours, c'est ${sem} et ${jr} de plus.`);},
  'Pista: quita semanas enteras de 7 días.': 'Indice : enlève des semaines entières de 7 jours.',
  'Léelo otra vez con calma: a veces la trampa está en las palabras.': 'Relis calmement : parfois, le piège est caché dans les mots.',

  /* histoire */
  '¿Qué pasó primero?': 'Qu\'est-ce qui s\'est passé en premier ?',
  '{e}: {y}.': '{e} {y}.',
  'Piensa: ¿había electricidad, imprenta o coches en esa época?': 'Réfléchis : à cette époque, y avait-il l\'électricité, des livres imprimés ou des voitures ?',

  /* argent et économies */
  'Necesidad': 'Besoin',
  'Capricho': 'Envie',
  '¿{x} es una necesidad o un capricho?': v=>{const x=String(v.x||'');return x.charAt(0).toUpperCase()+x.slice(1)+', c\'est un besoin ou une envie ?';},
  'Es una necesidad: la necesitamos para vivir bien.': 'C\'est un besoin : c\'est nécessaire pour bien vivre.',
  'Es un capricho: está bien tenerlo a veces, pero podemos vivir sin él.': 'C\'est une envie : c\'est agréable de se faire plaisir de temps en temps, mais on peut s\'en passer.',
  'Piensa: ¿podríamos vivir sin ello?': 'Réfléchis : est-ce qu\'on pourrait s\'en passer ?',
  'Quieres algo que cuesta {p}. Ahorras {s} cada semana. ¿Cuántas semanas necesitas?': 'Tu veux quelque chose qui coûte {p}. Tu mets {s} de côté chaque semaine. Combien de semaines te faut-il ?',
  '{p} entre {s} son {w} semanas.': '{p} divisé par {s}, ça fait {w} : il te faut donc {w} semaines.',
  'Divide el precio entre lo que ahorras cada semana.': 'Divise le prix par ce que tu mets de côté chaque semaine.',
  'Algo cuesta {p} y tiene un {d} % de descuento. ¿Cuánto pagas?': 'Quelque chose coûte {p} et il y a {d} % de réduction. Combien vas-tu payer ?',
  'El {d} % de {p} es {r}, así que pagas {pay}.': '{d} % de {p}, c\'est {r} : tu paies donc {pay}.',
  'Primero calcula cuánto te descuentan y réstalo.': 'Calcule d\'abord le montant de la réduction, puis enlève-le du prix.',
  'Compras algo de {p} y pagas con {b}. ¿Cuánto te devuelven?': 'Tu achètes quelque chose à {p} et tu paies avec un billet de {b}. Combien doit-on te rendre ?',
  '{b} menos {p} son {c}.': '{b} moins {p}, ça fait {c}.',
  'Cuenta desde el precio hasta lo que has pagado.': 'Compte à partir du prix jusqu\'à la somme que tu as donnée.',
  'Paquete de {n}': 'Pack de {n}',
  'Un paquete de {n1} yogures cuesta {p1} y uno de {n2} cuesta {p2}. ¿Cuál es más barato por yogur?': 'Un pack de {n1} yaourts coûte {p1} et un pack de {n2} coûte {p2}. Lequel revient le moins cher par yaourt ?',
  'Cada yogur cuesta {u1} en el pequeño y {u2} en el grande.': 'Chaque yaourt coûte {u1} dans le petit pack et {u2} dans le grand.',
  'Divide cada precio entre el número de yogures.': 'Divise chaque prix par le nombre de yaourts.',

  /* clavier */
  'Palabras cortas': 'Mots courts',
  'Palabras largas': 'Mots longs',
  'Frases': 'Phrases',
  'Palabra {i} de {n}': 'Mot {i} sur {n}',
  'Escribe aquí': 'Écris ici',
  'Escribe la palabra que ves. Puedes usar el teclado o la pantalla.': 'Écris le mot que tu vois. Tu peux utiliser le clavier ou l\'écran.',
  '¡Terminado! {w} palabras por minuto y {e} fallos.': v=>`C'est fini ! ${v.w} ${v.w<2?'mot':'mots'} par minute et ${v.e===0?'aucune faute':v.e===1?'une faute':`${v.e} fautes`}.`,

  /* ---------- 56-idiomas.js : apprendre une autre langue ---------- */
  'Comida': 'Nourriture',
  'En casa': 'À la maison',
  'El cuerpo': 'Le corps',
  'La ropa': 'Les vêtements',
  'Transportes': 'Transports',
  'Frases para empezar': 'Premières phrases',
  'Hola, gracias, ¿cómo te llamas?': 'Salut, merci, comment tu t\'appelles ?',
  'Parejas de palabras': 'Paires de mots',
  'Une el dibujo con su palabra': 'Associe chaque image à son mot',
  'En {l}': 'En {l}',
  'Escucha y toca': 'Écoute et touche',
  'Escucha. ¿Qué es?': 'Écoute. Qu\'est-ce que c\'est ?',
  /* {n} est le mot en français (le vocabulaire plus bas, sans article) : on ajoute l'article. */
  '¡Sí! Es {n}.': v=>{const n=String(v.n??'');return PLUR.test(n)?`Oui ! Ce sont les ${n}.`:`Oui ! C'est ${art(n)}${n}.`;},
  'No es esa. Toca la frase de arriba para oírla otra vez.': 'Ce n\'est pas ça. Touche les mots en haut pour les réécouter.',
  '¿Cómo se dice «{x}» en {l}?': 'Comment dit-on « {x} » en {l} ?',
  '¿Cómo se dice {x} en {l}?': 'Comment dit-on {x} en {l} ?',
  'Se dice así:': 'On le dit comme ça :',
  'Esa palabra es otra cosa. Prueba otra vez.': 'Ce mot veut dire autre chose. Essaie encore.',
  'Escucha y toca el color': 'Écoute et touche la couleur',
  /* les couleurs sont masculines : le rouge, l'orange */
  '¡Sí! Es el {c}.': v=>{const c=String(v.c??'');return `Oui ! C'est ${/^[aeiouyàâéèêëîïôœû]/i.test(c)?'l\'':'le '}${c}.`;},
  'No es ese. Toca la frase de arriba para oírla otra vez.': 'Ce n\'est pas ça. Touche les mots en haut pour les réécouter.',
  '¿Cómo se dice este color en {l}?': 'Comment dit-on cette couleur en {l} ?',
  'Ese es otro color. Prueba otra vez.': 'C\'est une autre couleur. Essaie encore.',
  'Escucha y toca el número': 'Écoute et touche le nombre',
  '¡Sí! Es el {n}.': 'Oui ! C\'est le {n}.',
  '¿Cuántas hay? Elige el número en {l}.': 'Il y en a combien ? Choisis le nombre en {l}.',
  /* on compte des fruits (une pomme, une fraise…) : tous féminins en français */
  'Hay {n}:': v=>v.n===1?'Il y en a une :':`Il y en a ${v.n} :`,
  'Cuenta otra vez despacio.': 'Recompte doucement.',
  '◀ Atrás': '◀ Retour',
  '🔊 Escuchar': '🔊 Écouter',
  '🐢 Despacio': '🐢 Lentement',
  'Siguiente ▶': 'Suivant ▶',
  'Escucha y repítelo en voz alta.': 'Écoute et répète à voix haute.',
  'Une cada dibujo con su palabra': 'Associe chaque image à son mot',
});

/* ---------- données des jeux pour 11 et 12 ans ---------- */
LANGS.fr.data.DAYS=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
/* [emoji, devinette, réponse, [autres choix], explication] */
LANGS.fr.data.RIDDLES=[
  ['🐑','Un fermier a 17 moutons. Tous s\'échappent, sauf 9. Combien lui en reste-t-il ?','9',['8','17','0'],'« Tous sauf 9 », cela veut dire que 9 moutons restent.'],
  ['📏','Léa est plus grande que Hugo, et Hugo est plus grand que Chloé. Qui est la plus petite ?','Chloé',['Léa','Hugo','On ne peut pas savoir'],'Si Léa est plus grande que Hugo, et Hugo plus grand que Chloé, alors c\'est Chloé la plus petite.'],
  ['📅','Combien de mois ont 28 jours ?','Tous',['Un','Deux','Aucun'],'Tous les mois ont au moins 28 jours.'],
  ['🏃','Dans une course, tu doubles celui qui est deuxième. À quelle place es-tu maintenant ?','Deuxième',['Première','Troisième','Dernière'],'Tu prends sa place : maintenant, c\'est toi qui es deuxième.'],
  ['🧱','Une brique pèse 1 kilo plus une demi-brique. Combien pèse une brique entière ?','2 kilos',['1 kilo et demi','1 kilo','3 kilos'],'Si une demi-brique pèse 1 kilo, la brique entière pèse 2 kilos.'],
  ['🏭','Si 5 machines fabriquent 5 jouets en 5 minutes, combien de temps faut-il à 100 machines pour fabriquer 100 jouets ?','5 minutes',['100 minutes','20 minutes','1 minute'],'Chaque machine met 5 minutes pour fabriquer un jouet, donc 100 machines fabriquent 100 jouets en 5 minutes.'],
  ['🐸','Une grenouille est au fond d\'un puits de 10 mètres. Chaque jour, elle monte de 3 mètres, et chaque nuit, elle redescend de 2 mètres en glissant. Combien de jours lui faut-il pour sortir ?','8',['10','7','5'],'Après 7 jours et 7 nuits, elle est montée de 7 mètres. Le huitième jour, elle monte encore de 3 mètres et elle sort.'],
  ['⚾','Une batte et une balle coûtent 1,10 € en tout. La batte coûte 1 € de plus que la balle. Combien coûte la balle ?','5 centimes',['10 centimes','1 centime','1 €'],'Si la balle coûte 5 centimes, la batte coûte 1,05 €, et les deux ensemble font bien 1,10 €.'],
  ['👧','La maman de Toto a trois enfants : Riri, Fifi et…','Toto',['Loulou','Lili','Mimi'],'Le troisième enfant, c\'est Toto lui-même !'],
  ['🎂','J\'ai deux fois l\'âge de mon frère, qui a 6 ans. Quel âge aurai-je quand il aura 10 ans ?','16',['20','14','12'],'Maintenant, j\'ai 12 ans. Dans 4 ans, j\'en aurai 16.'],
  ['🍎','Il y a 3 pommes et tu en prends 2. Combien de pommes as-tu ?','2',['1','3','5'],'Tu as les 2 pommes que tu as prises.'],
  ['🪶','Qu\'est-ce qui est le plus lourd : un kilo de plumes ou un kilo de fer ?','Les deux pèsent pareil',['Les plumes','Le fer','Ça dépend du jour'],'Un kilo, c\'est un kilo, peu importe de quoi il est fait.'],
  ['🐱','Si 3 chats attrapent 3 souris en 3 minutes, combien faut-il de chats pour attraper 60 souris en 30 minutes ?','6',['20','60','3'],'Chaque chat attrape une souris toutes les 3 minutes, donc 10 souris en 30 minutes. Pour en attraper 60, il faut 6 chats.'],
  ['🚆','Un train électrique roule vers le nord et le vent souffle vers le sud. Dans quelle direction va la fumée ?','Il n\'y a pas de fumée',['Vers le sud','Vers le nord','Vers le haut'],'Les trains électriques ne font pas de fumée.'],
  ['👨‍👩‍👧‍👦','Quatre frères ont chacun une sœur, et c\'est la même pour tous. Combien d\'enfants y a-t-il dans la famille ?','5',['8','4','6'],'Quatre garçons et une fille : cela fait cinq enfants.'],
  ['➗','Divise 30 par un demi, puis ajoute 10. Combien trouves-tu ?','70',['25','40','50'],'Diviser par un demi, c\'est multiplier par 2 : 30 divisé par un demi, ça fait 60, et 60 plus 10, ça fait 70.'],
  ['🥚','Si un œuf met 3 minutes à cuire, combien de temps mettent 3 œufs ensemble dans la même casserole ?','3 minutes',['9 minutes','6 minutes','1 minute'],'Ils cuisent tous en même temps, donc il faut le même temps.'],
  ['🪷','Des nénuphars doublent de taille chaque jour. Au bout de 20 jours, ils couvrent tout l\'étang. Au bout de combien de jours en couvraient-ils la moitié ?','19 jours',['10 jours','15 jours','5 jours'],'Si l\'étang est couvert au bout de 20 jours et que les nénuphars doublent chaque jour, la veille, il était à moitié couvert.'],
  ['🔔','Une horloge sonne 6 coups en 5 secondes. Combien de secondes lui faut-il pour sonner 12 coups ?','11',['10','12','24'],'Entre 6 coups, il y a 5 intervalles d\'une seconde. Entre 12 coups, il y en a 11.'],
  ['🧦','Dans le noir, tu fouilles un tiroir plein de chaussettes rouges et bleues. Combien dois-tu en prendre, au minimum, pour avoir à coup sûr deux chaussettes de la même couleur ?','3',['2','4','10'],'Avec 3 chaussettes et seulement 2 couleurs, deux chaussettes sont forcément de la même couleur.'],
  ['🐴','De quelle couleur est le cheval blanc d\'Henri IV ?','Blanc',['Noir','Marron','Gris'],'La réponse est dans la question : le cheval blanc d\'Henri IV est blanc !']];
LANGS.fr.data.SCIENCE_QA=[
  ['💧','À quelle température l\'eau bout-elle au niveau de la mer ?','100 °C',['50 °C','0 °C','200 °C']],
  ['🧊','À quelle température l\'eau gèle-t-elle ?','0 °C',['10 °C','−20 °C','100 °C']],
  ['♨️','Comment appelle-t-on le passage de l\'état liquide à l\'état gazeux ?','L\'évaporation',['La congélation','La fusion','La condensation']],
  ['☁️','Comment appelle-t-on le passage de l\'état gazeux à l\'état liquide ?','La condensation',['L\'évaporation','La solidification','La fusion']],
  ['🌿','Comment s\'appelle le processus qui permet aux plantes de fabriquer leur nourriture grâce à la lumière ?','La photosynthèse',['La digestion','La respiration','L\'évaporation']],
  ['🌳','Quel gaz les plantes prennent-elles dans l\'air pour faire la photosynthèse ?','Le dioxyde de carbone',['L\'oxygène','L\'hélium','L\'hydrogène']],
  ['❤️','Quel organe pompe le sang dans tout le corps ?','Le cœur',['Le foie','Les poumons','L\'estomac']],
  ['🫁','Avec quels organes respirons-nous ?','Les poumons',['Les reins','Le cœur','L\'estomac']],
  ['🦴','Combien d\'os a un adulte, à peu près ?','206',['50','1000','12']],
  ['🧲','Quel matériau un aimant attire-t-il ?','Le fer',['Le bois','Le plastique','Le verre']],
  ['⚡','Quel matériau conduit bien l\'électricité ?','Le cuivre',['Le bois','Le plastique','Le caoutchouc']],
  ['🌍','Comment s\'appelle la couche de gaz qui entoure la Terre ?','L\'atmosphère',['La croûte','Le noyau','Le manteau']],
  ['🌋','Comment s\'appelle la roche fondue qui sort d\'un volcan ?','La lave',['Le sable','Le granit','La glace']],
  ['🔬','Quelle est la plus petite unité qui forme tous les êtres vivants ?','La cellule',['L\'organe','Le tissu','L\'os']],
  ['☀️','Combien de temps met la lumière du Soleil pour arriver jusqu\'à la Terre ?','Environ 8 minutes',['Une seconde','Un jour','Un an']],
  ['🔊','Le son peut-il voyager dans le vide de l\'espace ?','Non, il a besoin d\'air ou d\'une autre matière',['Oui, plus vite que la lumière','Oui, comme dans l\'air','Seulement la nuit']],
  ['🧪','Quelle est la formule chimique de l\'eau ?','H₂O',['CO₂','O₂','NaCl']],
  ['🌬️','Quel gaz de l\'air nous est indispensable pour vivre ?','L\'oxygène',['Le dioxyde de carbone','L\'hélium','La fumée']],
  ['🍎','Quelle force fait tomber les objets vers le sol ?','La gravité',['Le magnétisme','L\'électricité','Le vent']],
  ['🌡️','Avec quoi mesure-t-on la température ?','Avec un thermomètre',['Avec une balance','Avec une règle','Avec une horloge']],
  ['🌈','De quoi a-t-on besoin pour qu\'un arc-en-ciel apparaisse ?','De la lumière du soleil et des gouttes d\'eau',['Seulement des nuages','Du vent et du sable','De la neige']],
  ['🦠','Quels médicaments servent à combattre les infections dues aux bactéries ?','Les antibiotiques',['Les pansements','Les vitamines','L\'eau salée']]];
/* [emoji, ce qui s'est passé (lu « … en 1492. »), année (négative = avant Jésus-Christ), approximative] */
LANGS.fr.data.HISTORY=[
  ['✍️','L\'écriture a été inventée en Mésopotamie',-3200,true],['🔺','La grande pyramide de Gizeh a été construite',-2560,true],
  ['🏛️','Les premiers Jeux olympiques ont eu lieu en Grèce',-776,false],['🏟️','Le Colisée de Rome a été inauguré',80,false],
  ['📖','Gutenberg a mis au point son imprimerie',1450,true],['⛵','Christophe Colomb est arrivé en Amérique',1492,false],['🌍','Le premier tour du monde en bateau s\'est terminé',1522,false],
  ['🏔️','Les Incas ont construit le Machu Picchu',1450,true],['📚','La première partie de Don Quichotte a été publiée',1605,false],
  ['🔭','Galilée a observé les lunes de Jupiter',1610,false],['💉','Edward Jenner a mis au point le premier vaccin',1796,false],['🚂','Le premier train de voyageurs a commencé à rouler',1825,false],
  ['☎️','Le téléphone a été breveté',1876,false],['✈️','Les frères Wright ont fait leur premier vol',1903,false],['💊','Alexander Fleming a découvert la pénicilline',1928,false],
  ['🕊️','La Déclaration universelle des droits de l\'homme a été adoptée à Paris',1948,false],['🛰️','Le premier satellite artificiel a été lancé',1957,false],
  ['🌕','Des humains ont marché sur la Lune pour la première fois',1969,false],['🌐','Le World Wide Web est né',1991,false]];
LANGS.fr.data.YEAR=(y,approx)=>(approx?'vers ':'en ')+(y<0?`${-y} avant Jésus-Christ`:y<1000?`l'an ${y}`:String(y));
/* L'argent en euros : 5 €, 1,50 €, et en centimes en dessous d'un euro (40 centimes). */
LANGS.fr.data.MONEY=v=>{if(v<1){const c=Math.round(v*100);return c===1?'1 centime':`${c} centimes`;}
  return v.toLocaleString('fr-FR',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})+' €';};
LANGS.fr.data.NEEDS=[['🥛','du lait',true],['🧥','un manteau chaud pour l\'hiver',true],['💊','des médicaments',true],['🍞','du pain',true],['👟','des chaussures pour aller à l\'école',true],
  ['💧','de l\'eau',true],['🪥','une brosse à dents',true],['🎮','un nouveau jeu vidéo',false],['🍬','des bonbons',false],['🧸','encore une peluche',false],
  ['🕶️','des lunettes de soleil à la mode',false],['📱','un nouveau téléphone alors que le tien marche encore',false],['🎈','un ballon géant',false]];
/* Les mots longs gardent leurs accents, comme en espagnol ; les phrases n'ont pas d'apostrophe (certains claviers la changent en ’). */
LANGS.fr.data.TYPING=[
  ['mer','lit','nez','eau','ami','jeu','sel','chat','pain','lait','lune','bleu','loup','vert','rose','pomme','livre','fleur','table','neige'],
  ['papillon','éléphant','escalier','bibliothèque','chocolat','ordinateur','dinosaure','montagne','bicyclette','tempête','citrouille','hélicoptère','crocodile','calendrier','tournesol'],
  ['le chat dort','je lis un livre','il fait beau','la lune brille','on va au parc','la mer est bleue','mon chien est petit','je joue au ballon','la maison est grande','on mange des fruits']];

/* ---------- vocabulaire et phrases (un enfant qui parle une autre langue les apprend en français) ---------- */
LANGS.fr.data.VOCAB={'🐶':'chien','🐱':'chat','🐮':'vache','🐷':'cochon','🐴':'cheval','🐑':'mouton','🐔':'poule','🦆':'canard','🐟':'poisson','🐦':'oiseau',
  '🐸':'grenouille','🦁':'lion','🐘':'éléphant','🐻':'ours','🐰':'lapin','🐭':'souris','🐵':'singe','🦒':'girafe','🐢':'tortue','🐍':'serpent',
  '🍎':'pomme','🍌':'banane','🍓':'fraise','🍊':'orange','🍇':'raisin','🍉':'pastèque','🍞':'pain','🧀':'fromage','🥛':'lait','🥚':'œuf',
  '🍦':'glace','🍪':'biscuit','🥕':'carotte','🍅':'tomate','💧':'eau','🍰':'gâteau',
  '🏠':'maison','🚪':'porte','🪟':'fenêtre','🛏️':'lit','🪑':'chaise','📖':'livre','⚽':'ballon','🧸':'nounours','🥄':'cuillère','🛁':'baignoire','⏰':'réveil','🖍️':'crayon de couleur',
  '👀':'yeux','👂':'oreille','👃':'nez','👄':'bouche','✋':'main','🦶':'pied','🦷':'dent','💪':'bras',
  '👕':'t-shirt','👖':'pantalon','👗':'robe','🧦':'chaussettes','👟':'baskets','🧢':'casquette','🧥':'manteau','🧤':'gants',
  '🚗':'voiture','🚌':'bus','🚲':'vélo','🚂':'train','✈️':'avion','🚀':'fusée','⛵':'bateau','🚜':'tracteur',
  '☀️':'soleil','🌙':'lune','⭐':'étoile','☁️':'nuage','🌧️':'pluie','🌈':'arc-en-ciel','🌳':'arbre','🌸':'fleur','🌊':'mer','⛰️':'montagne'};
/* « Salut » pour hola et « Bonjour » pour buenos días : en français, bonjour sert aussi le matin. */
LANGS.fr.data.PHRASES={hola:'Salut',adios:'Au revoir',buenosdias:'Bonjour',buenasnoches:'Bonne nuit',porfavor:'S\'il te plaît',gracias:'Merci',denada:'De rien',
  perdon:'Pardon',comotellamas:'Comment tu t\'appelles ?',mellamo:'Je m\'appelle Ana',cuantosanos:'Quel âge as-tu ?',tengocinco:'J\'ai cinq ans',
  comoestas:'Comment ça va ?',estoybien:'Je vais bien, merci',jugar:'Tu veux jouer avec moi ?',tequiero:'Je t\'aime',hambre:'J\'ai faim',sed:'J\'ai soif',
  bano:'Où sont les toilettes ?',nolose:'Je ne sais pas'};
})();
