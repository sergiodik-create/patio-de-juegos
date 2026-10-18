/* Français : jeux de questions (20-preguntas.js) et listes de base (10-datos.js).
   Les espaces avant ? ! : ; et à l'intérieur de « » sont insécables, comme le veut la typographie française. */
(()=>{
/* Petites aides pour ce fichier seulement (dans cette fonction pour ne pas gêner les autres fichiers). */
const cap1=t=>t?String(t)[0].toUpperCase()+String(t).slice(1):t;
/* Le mot peut commencer par une balise (la pastille de couleur) : on regarde la première lettre visible. */
const vowel=x=>/^(<[^>]*>)*[aeiouyàâéèêëîïôûh]/i.test(String(x));
/* le rouge, l'orange */
const le=x=>(vowel(x)?'l’':'le ')+x;
/* de + article : du Mexique, des États-Unis, de la France, de l'Espagne, de Cuba, d'Haïti */
const de=x=>{x=String(x);
  if(/^le /i.test(x))return 'du '+x.slice(3);
  if(/^les /i.test(x))return 'des '+x.slice(4);
  if(/^(la |l'|l’)/i.test(x))return 'de '+x;
  return (vowel(x)?'d’':'de ')+x;};

Object.assign(LANGS.fr.t,{
  /* 10-datos.js : questions tirées d'une liste (espace, nature) */
  'La respuesta es: {a}.':'La réponse est : {a}.',
  'No es esa. Prueba otra vez.':'Ce n\'est pas ça. Essaie encore.',

  /* noms et descriptions des jeux */
  'Colores':'Les couleurs',
  'Toca el color':'Touche la couleur',
  'Animales':'Les animaux',
  '¿Quién hace ese ruido?':'Qui fait ce bruit ?',
  'Contar':'Compter',
  'Formas':'Les formes',
  'Círculo, estrella, corazón…':'Rond, étoile, cœur…',
  'Grande y pequeño':'Grand et petit',
  'El cielo':'Le ciel',
  'Sol, luna y cohetes':'Soleil, lune et fusées',
  'Primera letra':'Première lettre',
  'Completa la palabra':'Complète le mot',
  'Sumas':'Les additions',
  'Junta y cuenta':'Rassemble et compte',
  'Restas':'Les soustractions',
  '¿Cuántas quedan?':'Combien en reste-t-il ?',
  'Completa la fila':'Complète la suite',
  'Series':'Les suites',
  'Mayor o menor':'Plus grand ou plus petit',
  '¿Cuál sobra?':'Lequel est en trop ?',
  'Lógica: busca el intruso':'Logique : trouve l\'intrus',
  '¿Dónde vive?':'Où vit-il ?',
  'Mar, selva, granja, polo':'Mer, jungle, ferme, banquise',
  'Tablas':'Les tables',
  'Multiplicar del 2 al 10':'Multiplier de 2 à 10',
  'Cálculo mental':'Calcul mental',
  'Sumas y restas grandes':'Grandes additions et soustractions',
  'Secuencias':'Suites de nombres',
  'Lógica con números':'Logique avec les nombres',
  'Ortografía':'Orthographe',
  '¿Cómo se escribe?':'Comment ça s\'écrit ?',
  'Capitales':'Les capitales',
  'Países y ciudades':'Pays et villes',
  'Seres vivos':'Êtres vivants',
  '¿Mamífero, ave o pez?':'Mammifère, oiseau ou poisson ?',
  'El espacio':'L\'espace',
  'Planetas y estrellas':'Planètes et étoiles',
  'Naturaleza':'La nature',
  'Plantas, agua y animales':'Plantes, eau et animaux',

  /* couleurs ({c} est le nom de la couleur, parfois dans une pastille : le rouge, l'orange) */
  'Toca el {c}':v=>`Touche ${le(v.c)}`,
  'Toca el color {c}':'Touche la couleur {c}',
  'Es el {c}.':v=>`C'est ${le(v.c)}.`,
  'Ese es el {c}. Prueba otra vez.':v=>`Ça, c'est ${le(v.c)}. Essaie encore.`,

  /* animaux (en français, la vache « fait » meuh) */
  '¿Quién dice «{s}»?':'Qui fait « {s} » ?',
  '¿Quién dice {s}?':'Qui fait {s} ?',
  '{a} dice {s}.':'{a} fait {s}.',
  'Ese animal es {a}, que dice {s}. Prueba otra vez.':'Ça, c\'est {a}, qui fait {s}. Essaie encore.',

  /* compter */
  '¿Cuántas hay?':'Il y en a combien ?',
  '¿Cuántas hay? Toca las frutas para contar.':'Il y en a combien ? Touche les fruits pour compter.',
  'Casi. Cuenta otra vez conmigo.':'Presque ! Compte encore avec moi.',

  /* formes et ciel ({x} est « le rond », « la lune »…) */
  'Toca {x}':'Touche {x}',
  'Es {x}.':'C\'est {x}.',
  'Esa forma es {x}. Prueba otra vez.':'Ça, c\'est {x}. Essaie encore.',
  '¡Es {x}!':'C\'est {x} !',
  'Eso es {x}. Prueba otra vez.':'Ça, c\'est {x}. Essaie encore.',

  /* grand et petit */
  'Toca el {x}':'Touche le {x}',
  'grande':'grand',
  'pequeño':'petit',
  'Toca el grande':'Touche le grand.',
  'Toca el pequeño':'Touche le petit.',
  '¡Ese es el grande!':'C\'est le grand !',
  '¡Ese es el pequeño!':'C\'est le petit !',
  'Ese es pequeño. Busca el grande.':'Celui-là est petit. Cherche le grand.',
  'Ese es grande. Busca el pequeño.':'Celui-là est grand. Cherche le petit.',

  /* première lettre et lettre qui manque ({w} arrive avec une majuscule dans la réponse) */
  '¿Con qué letra empieza?':'Par quelle lettre ça commence ?',
  '¿Con qué letra empieza {w}?':'Par quelle lettre commence le mot {w} ?',
  '{w} empieza con {l}.':v=>`Le mot ${String(v.w).toLowerCase()} commence par ${v.l}.`,
  'No. Escucha: {w}. Prueba otra vez.':'Non. Écoute : {w}. Essaie encore.',
  '¿Qué letra falta?':'Quelle lettre manque ?',
  '¿Qué letra falta en {w}?':'Quelle lettre manque dans le mot {w} ?',
  'Es la {l}: {w}.':'C\'est la lettre {l} : {w}.',
  'Escucha bien: {w}. Prueba otra vez.':'Écoute bien : {w}. Essaie encore.',

  /* additions et soustractions */
  '¿Cuántas hay en total?':'Il y en a combien en tout ?',
  '¿Cuánto es?':'Ça fait combien ?',
  '{a} más {b}. ¿Cuánto es?':'{a} plus {b}, ça fait combien ?',
  '{a} más {b} son {s}.':'{a} plus {b} égale {s}.',
  'Casi. Cuenta todas despacio.':'Presque ! Recompte tout doucement.',
  'Casi. Cuenta con los dedos desde el número grande.':'Presque ! Pars du plus grand nombre et compte sur tes doigts.',
  'Había {a}. Se comen {b}. ¿Cuántas quedan?':'Il y en avait {a}. On en mange {b}. Il en reste combien ?',
  '{a} menos {b} son {r}.':'{a} moins {b} égale {r}.',
  'Cuenta las que siguen brillando.':'Compte les fruits qui brillent encore.',
  '{a} menos {b}':'{a} moins {b}, ça fait combien ?',
  'Casi. Cuenta hacia atrás despacio.':'Presque ! Compte à l\'envers, tout doucement.',

  /* nombre qui manque */
  '¿Qué número falta?':'Quel nombre manque ?',
  'Era el {n}.':'C\'était le {n}.',
  'Cuenta desde el principio.':'Compte depuis le début.',
  'Fíjate: va de {s} en {s}.':'Regarde bien : on compte de {s} en {s}.',

  /* suites */
  '¿Qué viene después?':'Qu\'est-ce qui vient après ?',
  '¡Has encontrado la serie!':'Tu as trouvé la suite !',
  'Mira cómo se repite y prueba otra vez.':'Regarde ce qui se répète, et essaie encore.',

  /* plus grand ou plus petit */
  '¿Cuál es más grande?':'Lequel est le plus grand ?',
  '¿Cuál es más pequeño?':'Lequel est le plus petit ?',
  '¿Cuál es el número más grande?':'Quel est le plus grand nombre ?',
  '¿Cuál es el número más pequeño?':'Quel est le plus petit nombre ?',
  '{n} es el mayor.':'{n} est le plus grand.',
  '{n} es el menor.':'{n} est le plus petit.',
  'Piénsalo otra vez: mira primero cuántas cifras tiene.':'Réfléchis encore : regarde d\'abord combien de chiffres a chaque nombre.',

  /* l'intrus ({g} est « des fruits », « des animaux »…) */
  '¿Cuál no es del grupo?':'Lequel n\'est pas du même groupe ?',
  'Los demás son {g}.':'Les autres sont {g}.',
  'Ese sí es del grupo. Busca el diferente.':'Celui-là fait partie du groupe. Cherche celui qui est différent.',

  /* où vit-il ? ({h} est « la mer », « la ferme »… : dans la mer, à la ferme, sur la banquise) */
  '¿Dónde vive {a}?':'Où vit {a} ?',
  '{a} vive en {h}.':v=>`${v.a} vit ${/ferme/.test(v.h)?'à':/banquise/.test(v.h)?'sur':'dans'} ${v.h}.`,
  'Ahí no. Prueba otro lugar.':'Pas là. Essaie un autre endroit.',

  /* tables et calcul mental */
  '{a} por {b}':'{a} fois {b}, ça fait combien ?',
  '{a} por {b} son {p}.':'{a} fois {b} égale {p}.',
  'No es esa. Piensa en la tabla del {a}.':'Ce n\'est pas ça. Pense à la table de {a}.',
  '{a} más {b}':'{a} plus {b}, ça fait combien ?',
  'Son {r}.':'Ça fait {r}.',
  'Revisa las unidades y las decenas.':'Vérifie les unités et les dizaines.',

  /* suites de nombres : la règle se dit après « C'est 20 : » */
  'suma {k} cada vez':'on ajoute {k} à chaque fois',
  'se multiplica por {m}':'on multiplie par {m} à chaque fois',
  'resta {k} cada vez':'on enlève {k} à chaque fois',
  'suma {a} y luego {b}':'on ajoute {a}, puis {b}',
  'son números al cuadrado':'ce sont des nombres au carré',
  'cada número es la suma de los dos anteriores':'chaque nombre est la somme des deux précédents',
  '¿Qué número sigue?':'Quel nombre vient après ?',
  'Es {n}: {r}.':'C\'est {n} : {r}.',
  'Mira cuánto cambia de uno a otro.':'Regarde de combien ça change d\'un nombre à l\'autre.',

  /* orthographe */
  '¿Cuál está bien escrita?':'Lequel est bien écrit ?',
  'Se escribe {w}.':'Ça s\'écrit {w}.',
  'Esa tiene una falta. Prueba la otra.':'Celui-là a une faute. Essaie l\'autre.',

  /* capitales ({c} porte son article : la France, le Mexique, les États-Unis, Cuba) */
  '¿Cuál es la capital de {c}?':v=>`Quelle est la capitale ${de(v.c)} ?`,
  'La capital de {c} es {k}.':v=>`La capitale ${de(v.c)} est ${v.k}.`,
  '{v} es otra capital. Prueba otra vez.':'{v} est la capitale d\'un autre pays. Essaie encore.',

  /* êtres vivants ({k} : mammifère, oiseau, poisson, reptile ou insecte, tous masculins) */
  '¿Qué es {a}?':'Quelle sorte d\'animal est {a} ?',
  '{a} es un {k}.':'{a} est un {k}.',
  'No. Piensa cómo nace y cómo respira.':'Non. Pense à la façon dont il naît et dont il respire.',
});

/* ---------- listes de données (même forme que DATA.es dans 10-datos.js) ---------- */
/* Les couleurs sont masculines : le rouge, l'orange (voir 'Toca el {c}' plus haut). */
LANGS.fr.data.COLORS=[
  {n:'rouge',c:'var(--red)'},{n:'bleu',c:'var(--blue)'},{n:'jaune',c:'var(--yellow)'},
  {n:'vert',c:'var(--green)'},{n:'violet',c:'var(--purple)'},{n:'orange',c:'var(--orange)'},{n:'rose',c:'var(--pink)'}];
LANGS.fr.data.ANIMALS=[
  {e:'🐮',n:'la vache',s:'meuh'},{e:'🐶',n:'le chien',s:'ouaf ouaf'},{e:'🐱',n:'le chat',s:'miaou'},
  {e:'🐷',n:'le cochon',s:'groin groin'},{e:'🐑',n:'le mouton',s:'bêêê'},{e:'🦆',n:'le canard',s:'coin coin'},
  {e:'🐸',n:'la grenouille',s:'croâ croâ'},{e:'🦁',n:'le lion',s:'grrr'},{e:'🐔',n:'la poule',s:'cot cot codet'},
  {e:'🐴',n:'le cheval',s:'hiiii'},{e:'🐝',n:'l\'abeille',s:'bzzz'},{e:'🐍',n:'le serpent',s:'sss'}];
/* « le rond » : c'est le mot de l'école maternelle pour le cercle. */
LANGS.fr.data.SHAPES=[
  {n:'le rond',svg:'<circle cx="50" cy="50" r="42"/>'},
  {n:'le carré',svg:'<rect x="10" y="10" width="80" height="80" rx="6"/>'},
  {n:'le triangle',svg:'<polygon points="50,8 94,90 6,90"/>'},
  {n:'l\'étoile',svg:'<polygon points="50,5 61,38 96,38 68,59 79,93 50,72 21,93 32,59 4,38 39,38"/>'},
  {n:'le cœur',svg:'<path d="M50 88C20 65 5 48 5 30 5 15 17 5 30 5c10 0 17 6 20 13 3-7 10-13 20-13 13 0 25 10 25 25 0 18-15 35-45 58z"/>'},
  {n:'le rectangle',svg:'<rect x="4" y="26" width="92" height="48" rx="6"/>'}];
/* Un seul mot, en minuscules, sans trait d'union ni apostrophe ni œ (ils remplissent aussi les mots mêlés).
   Chaque mot commence par le son habituel de sa première lettre : pas de « chat », « cerise », « girafe » ou « ours »,
   pour qu'un enfant qui écoute le mot trouve la bonne lettre. Le premier mot de chaque lettre sert à nommer
   la lettre quand on la trace (« la lettre A, comme avion ») : pour E, il commence par un e sans accent.
   Pas de mot en K, Q, W ni X. */
LANGS.fr.data.WORDS=[
  ['✈️','avion'],['🎈','ballon'],['🦆','canard'],['🐬','dauphin'],['🐌','escargot'],['🍓','fraise'],['🎂','gâteau'],['🦉','hibou'],
  ['🦎','iguane'],['🧃','jus'],['🦁','lion'],['🏠','maison'],['☁️','nuage'],['🍊','orange'],['🍎','pomme'],['🤖','robot'],
  ['☀️','soleil'],['🐢','tortue'],['🏭','usine'],['🐄','vache'],['🪀','yoyo'],['🦓','zèbre'],
  ['🐘','éléphant'],['⭐','étoile'],['🐭','souris'],['🌳','arbre'],['🐝','abeille'],['🦋','papillon'],['🐍','serpent'],['🦊','renard'],
  ['🌹','rose'],['🥕','carotte'],['👑','couronne'],['🐸','grenouille'],['🚂','train'],['🍇','raisin'],['🍐','poire'],['🐟','poisson'],
  ['🐰','lapin'],['🌙','lune'],['🐯','tigre'],['🍅','tomate'],['🚲','vélo'],['🎻','violon'],['🍌','banane'],['🚌','bus'],
  ['🎁','cadeau'],['🦍','gorille'],['🦔','hérisson'],['🏝️','île'],['🐺','loup'],['👃','nez'],['🫒','olive'],['🌸','fleur']];
/* Lettres proposées comme mauvaises réponses dans « Première lettre » et pour remplir les mots mêlés.
   Sans K, Q, W ni X : « canard » n'a jamais K comme piège, et la grille ressemble à du français. */
LANGS.fr.data.LETTERS='ABCDEFGHIJLMNOPRSTUVYZ'.split('');
/* [dessin, bonne orthographe, faute fréquente] : lettres muettes, ph, consonnes doubles, au/eau, ain/in, s entre deux voyelles,
   c/ç, g/gu, qu, h muet, m devant p, œ, ill… Aucune faute n'est un vrai mot français. */
LANGS.fr.data.SPELL=[
  ['🐘','éléphant','éléfant'],['🐬','dauphin','dophin'],['🦒','girafe','girrafe'],['🐸','grenouille','grenouile'],['🐰','lapin','lapain'],
  ['🍞','pain','pein'],['🎂','gâteau','gato'],['🐦','oiseau','oizeau'],['🍓','fraise','frèse'],['🏠','maison','maizon'],
  ['🦋','papillon','papiyon'],['🍎','pomme','pome'],['🐱','chat','cha'],['🦊','renard','renar'],['🥕','carotte','carote'],
  ['🍫','chocolat','chocola'],['🐒','singe','cinge'],['🍋','citron','sitron'],['🦔','hérisson','érisson'],['🦉','hibou','ibou'],
  ['🐌','escargot','escargo'],['🎸','guitare','gitare'],['🐧','pingouin','pingoin'],['🐿️','écureuil','écureil'],['🥚','œuf','euf'],
  ['❤️','cœur','keur'],['🚒','pompier','ponpier'],['🧊','glaçon','glacon'],['👦','garçon','garson'],['🍬','bonbon','bombon'],
  ['📷','photo','foto'],['🏰','château','chato'],['☂️','parapluie','parapluit'],['🏊','piscine','pissine'],['🍉','pastèque','pastèc'],
  ['🦈','requin','rekin']];
/* Le pays porte son article quand le français en met un : la capitale de la France, du Mexique, des États-Unis, de Cuba. */
LANGS.fr.data.CAPITALS=[
  ['l\'Espagne','Madrid'],['le Mexique','Mexico'],['l\'Argentine','Buenos Aires'],['la Colombie','Bogota'],['le Pérou','Lima'],
  ['le Chili','Santiago'],['le Venezuela','Caracas'],['l\'Équateur','Quito'],['Cuba','La Havane'],['Haïti','Port-au-Prince'],
  ['la France','Paris'],['l\'Italie','Rome'],['le Portugal','Lisbonne'],['l\'Allemagne','Berlin'],['le Japon','Tokyo'],['le Brésil','Brasilia'],
  ['le Royaume-Uni','Londres'],['l\'Irlande','Dublin'],['les États-Unis','Washington'],['l\'Égypte','Le Caire'],['le Canada','Ottawa'],
  ['l\'Australie','Canberra'],['la Belgique','Bruxelles'],['la Suisse','Berne'],['le Maroc','Rabat'],['l\'Algérie','Alger'],['la Tunisie','Tunis'],
  ['le Sénégal','Dakar'],['le Cameroun','Yaoundé'],['Madagascar','Antananarivo'],['l\'Inde','New Delhi'],['la Chine','Pékin'],['la Grèce','Athènes'],
  ['le Kenya','Nairobi'],['la Pologne','Varsovie'],['la Roumanie','Bucarest'],['l\'Ukraine','Kyiv'],['les Pays-Bas','Amsterdam'],['la Norvège','Oslo']];
/* Tous masculins : « Le dauphin est un mammifère. » */
LANGS.fr.data.CLASSES=['mammifère','oiseau','poisson','reptile','insecte'];
LANGS.fr.data.CREATURES=[
  ['🐬','le dauphin','mammifère'],['🦇','la chauve-souris','mammifère'],['🐳','la baleine','mammifère'],['🐘','l\'éléphant','mammifère'],['🐒','le singe','mammifère'],
  ['🐧','le manchot','oiseau'],['🦉','le hibou','oiseau'],['🦅','l\'aigle','oiseau'],['🦩','le flamant rose','oiseau'],['🦜','le perroquet','oiseau'],
  ['🦈','le requin','poisson'],['🐠','le poisson-clown','poisson'],['🐡','le poisson-globe','poisson'],
  ['🐢','la tortue','reptile'],['🐍','le serpent','reptile'],['🐊','le crocodile','reptile'],['🦎','le lézard','reptile'],
  ['🦋','le papillon','insecte'],['🐝','l\'abeille','insecte'],['🐜','la fourmi','insecte'],['🐞','la coccinelle','insecte']];
LANGS.fr.data.NUMWORDS=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'];
LANGS.fr.data.SKY=[['☀️','le soleil'],['🌙','la lune'],['⭐','l\'étoile'],['☁️','le nuage'],['🚀','la fusée'],['🪐','la planète'],['🌈','l\'arc-en-ciel'],['✈️','l\'avion']];
/* n se dit dans « Les autres sont des fruits. » */
LANGS.fr.data.GROUPS=[
  {n:'des fruits',items:['🍎','🍌','🍇','🍓','🍐','🍒','🍉']},{n:'des animaux',items:['🐶','🐱','🐮','🐷','🐴','🐑','🐸']},
  {n:'des véhicules',items:['🚗','🚌','🚲','🚂','✈️','🚀','🚜']},{n:'des vêtements',items:['👕','👖','👗','🧦','🧢','👟','🧤']},
  {n:'des instruments de musique',items:['🎸','🥁','🎺','🎻','🎹','🪇']}];
/* La réponse dit « dans la mer », « à la ferme », « dans la jungle », « sur la banquise » (voir '{a} vive en {h}.' plus haut). */
LANGS.fr.data.HABITATS=[['🌊','la mer'],['🚜','la ferme'],['🌴','la jungle'],['❄️','la banquise']];
LANGS.fr.data.HABITANTS=[['🐙','la pieuvre','la mer'],['🐠','le poisson-clown','la mer'],['🐬','le dauphin','la mer'],['🦀','le crabe','la mer'],
  ['🐄','la vache','la ferme'],['🐔','la poule','la ferme'],['🐷','le cochon','la ferme'],['🐑','le mouton','la ferme'],
  ['🐒','le singe','la jungle'],['🦜','le perroquet','la jungle'],['🐅','le tigre','la jungle'],['🦍','le gorille','la jungle'],
  ['🐧','le pingouin','la banquise'],['🐻‍❄️','l\'ours polaire','la banquise'],['🦭','le phoque','la banquise']];
LANGS.fr.data.SPACE_QA=[
  ['🪐','Quelle est la plus grosse planète ?','Jupiter',['Mars','La Terre','Mercure']],
  ['☀️','Quelle planète est la plus proche du Soleil ?','Mercure',['Vénus','Mars','Neptune']],
  ['🔴','Quelle planète appelle-t-on la planète rouge ?','Mars',['Vénus','Saturne','Uranus']],
  ['💍','Quelle planète a des anneaux très célèbres ?','Saturne',['Mars','Mercure','Vénus']],
  ['🌍','Sur quelle planète vivons-nous ?','La Terre',['Mars','Jupiter','Vénus']],
  ['☀️','Le Soleil, qu\'est-ce que c\'est ?','Une étoile',['Une planète','Une lune','Une comète']],
  ['🔢','Combien y a-t-il de planètes dans le système solaire ?','8',['7','9','10']],
  ['🌙','Qu\'est-ce qui tourne autour de la Terre ?','La Lune',['Le Soleil','Mars','Saturne']],
  ['👨‍🚀','Qui a été la première personne à marcher sur la Lune ?','Neil Armstrong',['Christophe Colomb','Albert Einstein','Isaac Newton']],
  ['🌌','Comment s\'appelle notre galaxie ?','La Voie lactée',['Andromède','La Grande Ourse','Orion']],
  ['🗓️','Combien de temps met la Terre pour faire le tour du Soleil ?','Un an',['Un jour','Un mois','Une semaine']],
  ['🌗','Combien de temps met la Terre pour tourner sur elle-même ?','Un jour',['Un an','Une heure','Un mois']],
  ['🔥','Quelle est la planète la plus chaude ?','Vénus',['Mercure','Mars','Jupiter']],
  ['🚀','Comment appelle-t-on les personnes qui voyagent dans l\'espace ?','Les astronautes',['Les pilotes','Les marins','Les plongeurs']]];
LANGS.fr.data.NATURE_QA=[
  ['🌱','De quoi les plantes ont-elles besoin pour pousser ?','De lumière, d\'eau et d\'air',['Seulement de sable','De nuit noire','De chocolat']],
  ['🐝','Qu\'est-ce que les abeilles récoltent dans les fleurs ?','Le nectar',['Des feuilles','Des graines de pin','De l\'eau salée']],
  ['🌳','Les plantes rejettent un gaz dont nous avons besoin pour respirer. Lequel ?','L\'oxygène',['La fumée','L\'hélium','Le gaz de cuisine']],
  ['🐛','En quoi se transforme une chenille ?','En papillon',['En abeille','En scarabée','En fourmi']],
  ['🐸','En quoi se transforme un têtard ?','En grenouille',['En poisson','En tortue','En lézard']],
  ['🍂','En quelle saison beaucoup d\'arbres perdent-ils leurs feuilles ?','En automne',['Au printemps','En été','Jamais']],
  ['🥕','Quelle partie de la plante pousse sous la terre ?','La racine',['La fleur','La feuille','Le fruit']],
  ['🌊','Comment est l\'eau de la mer ?','Salée',['Sucrée','Piquante','Amère']],
  ['🧊','Quand l\'eau gèle, elle devient…','De la glace',['De la vapeur','Un nuage','Du sable']],
  ['🐋','Quel est le plus grand animal du monde ?','La baleine bleue',['L\'éléphant','La girafe','Le grand requin blanc']],
  ['🕷️','Combien de pattes a une araignée ?','8',['6','4','10']],
  ['🐜','Combien de pattes a un insecte ?','6',['8','4','10']],
  ['🌧️','D\'où tombe la pluie ?','Des nuages',['Des arbres','Des montagnes','Du Soleil']],
  ['🌸','En quelle saison beaucoup de plantes fleurissent-elles ?','Au printemps',['En hiver','En automne','Jamais']],
  ['♻️','Que pouvons-nous faire pour protéger la planète ?','Recycler et ne rien jeter par terre',['Laisser les robinets ouverts','Jeter du plastique dans la mer','Couper tous les arbres']]];
LANGS.fr.data.STICKER_NAMES=Object.fromEntries([
  ['🐶','chien'],['🐱','chat'],['🐭','souris'],['🐹','hamster'],['🐰','lapin'],['🦊','renard'],['🐻','ours'],['🐼','panda'],['🐨','koala'],['🐯','tigre'],
  ['🦁','lion'],['🐮','vache'],['🐷','petit cochon'],['🐸','grenouille'],['🐵','singe'],['🐔','poule'],['🐧','pingouin'],['🐦','oiseau'],['🦆','canard'],['🦉','hibou'],
  ['🦄','licorne'],['🐝','abeille'],['🦋','papillon'],['🐞','coccinelle'],['🐢','tortue'],['🐙','pieuvre'],['🐠','poisson'],['🐬','dauphin'],['🐳','baleine'],['🦀','crabe'],
  ['🦒','girafe'],['🐘','éléphant'],['🍎','pomme'],['🍌','banane'],['🍓','fraise'],['🍉','pastèque'],['🍒','cerises'],['🍦','glace'],['🍪','biscuit'],['🧁','petit gâteau'],
  ['🚀','fusée'],['🛸','soucoupe volante'],['🪐','planète'],['🌙','lune'],['⭐','étoile'],['☀️','soleil'],['🌈','arc-en-ciel'],['⛄','bonhomme de neige'],['🚂','train'],['🚒','camion de pompiers'],
  ['🚜','tracteur'],['⛵','voilier'],['🎈','ballon'],['🎨','peinture'],['🎸','guitare'],['⚽','ballon de foot'],['🏆','coupe'],['👑','couronne'],['💎','diamant'],['🧸','nounours']]);
})();
