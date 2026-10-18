/* English: question games (20-preguntas.js) and the basic data lists (10-datos.js). */
Object.assign(LANGS.en.t,{
  /* 10-datos.js: questions from a bank (space, nature) */
  'La respuesta es: {a}.':'The answer is: {a}.',
  'No es esa. Prueba otra vez.':'Not that one. Try again.',

  /* names and descriptions of the games */
  'Colores':'Colours',
  'Toca el color':'Tap the colour',
  'Animales':'Animals',
  '¿Quién hace ese ruido?':'Who makes that sound?',
  'Contar':'Counting',
  'Formas':'Shapes',
  'Círculo, estrella, corazón…':'Circle, star, heart…',
  'Grande y pequeño':'Big and small',
  'El cielo':'The sky',
  'Sol, luna y cohetes':'Sun, moon and rockets',
  'Primera letra':'First letter',
  'Completa la palabra':'Finish the word',
  'Sumas':'Adding up',
  'Junta y cuenta':'Put them together and count',
  'Restas':'Taking away',
  '¿Cuántas quedan?':'How many are left?',
  'Completa la fila':'Finish the row',
  'Series':'Patterns',
  'Mayor o menor':'Bigger or smaller',
  '¿Cuál sobra?':'Odd one out',
  'Lógica: busca el intruso':'Logic: find the one that does not belong',
  '¿Dónde vive?':'Where does it live?',
  'Mar, selva, granja, polo':'Sea, jungle, farm, ice',
  'Tablas':'Times tables',
  'Multiplicar del 2 al 10':'Multiplying from 2 to 10',
  'Cálculo mental':'Mental maths',
  'Sumas y restas grandes':'Adding and taking away big numbers',
  'Secuencias':'Number sequences',
  'Lógica con números':'Logic with numbers',
  'Ortografía':'Spelling',
  '¿Cómo se escribe?':'How do you spell it?',
  'Capitales':'Capital cities',
  'Países y ciudades':'Countries and cities',
  'Seres vivos':'Living things',
  '¿Mamífero, ave o pez?':'Mammal, bird or fish?',
  'El espacio':'Space',
  'Planetas y estrellas':'Planets and stars',
  'Naturaleza':'Nature',
  'Plantas, agua y animales':'Plants, water and animals',

  /* colours */
  'Toca el {c}':'Tap {c}',
  'Toca el color {c}':'Tap the colour {c}.',
  'Es el {c}.':'It is {c}.',
  'Ese es el {c}. Prueba otra vez.':'That one is {c}. Try again.',

  /* animals */
  '¿Quién dice «{s}»?':'Who says “{s}”?',
  '¿Quién dice {s}?':'Who says {s}?',
  '{a} dice {s}.':'{a} says {s}.',
  'Ese animal es {a}, que dice {s}. Prueba otra vez.':'That is {a}. It says {s}. Try again.',

  /* counting */
  '¿Cuántas hay?':'How many are there?',
  '¿Cuántas hay? Toca las frutas para contar.':'How many are there? Tap them to count.',
  'Casi. Cuenta otra vez conmigo.':'Nearly! Count again with me.',

  /* shapes and the sky ({x} is "the circle", "the moon"…) */
  'Toca {x}':'Tap {x}',
  'Es {x}.':'It is {x}.',
  'Esa forma es {x}. Prueba otra vez.':v=>`That shape is ${String(v.x).replace(/^the /,'a ')}. Try again.`,
  '¡Es {x}!':'It is {x}!',
  'Eso es {x}. Prueba otra vez.':'That is {x}. Try again.',

  /* big and small */
  'Toca el {x}':'Tap the {x} one',
  'grande':'big',
  'pequeño':'small',
  'Toca el grande':'Tap the big one.',
  'Toca el pequeño':'Tap the small one.',
  '¡Ese es el grande!':'That is the big one!',
  '¡Ese es el pequeño!':'That is the small one!',
  'Ese es pequeño. Busca el grande.':'That one is small. Find the big one.',
  'Ese es grande. Busca el pequeño.':'That one is big. Find the small one.',

  /* first letter and missing letter */
  '¿Con qué letra empieza?':'What letter does it start with?',
  '¿Con qué letra empieza {w}?':'What letter does {w} start with?',
  '{w} empieza con {l}.':'{w} starts with the letter {l}.',
  'No. Escucha: {w}. Prueba otra vez.':'Not quite. Listen: {w}. Try again.',
  '¿Qué letra falta?':'Which letter is missing?',
  '¿Qué letra falta en {w}?':'Which letter is missing from {w}?',
  'Es la {l}: {w}.':'It is the letter {l}: {w}.',
  'Escucha bien: {w}. Prueba otra vez.':'Listen carefully: {w}. Try again.',

  /* adding and taking away */
  '¿Cuántas hay en total?':'How many are there altogether?',
  '¿Cuánto es?':'What is the answer?',
  '{a} más {b}. ¿Cuánto es?':'What is {a} plus {b}?',
  '{a} más {b} son {s}.':'{a} plus {b} is {s}.',
  'Casi. Cuenta todas despacio.':'Nearly! Count them all slowly.',
  'Casi. Cuenta con los dedos desde el número grande.':'Nearly! Start from the bigger number and count on with your fingers.',
  'Había {a}. Se comen {b}. ¿Cuántas quedan?':'There were {a}. We eat {b}. How many are left?',
  '{a} menos {b} son {r}.':'{a} take away {b} is {r}.',
  'Cuenta las que siguen brillando.':'Count the ones that are still bright.',
  '{a} menos {b}':'What is {a} take away {b}?',
  'Casi. Cuenta hacia atrás despacio.':'Nearly! Count back slowly.',

  /* missing number */
  '¿Qué número falta?':'Which number is missing?',
  'Era el {n}.':'It was {n}.',
  'Cuenta desde el principio.':'Count from the beginning.',
  'Fíjate: va de {s} en {s}.':'Look carefully: it goes up {s} at a time.',

  /* patterns */
  '¿Qué viene después?':'What comes next?',
  '¡Has encontrado la serie!':'You found the pattern!',
  'Mira cómo se repite y prueba otra vez.':'Look at how it repeats, and try again.',

  /* bigger or smaller */
  '¿Cuál es más grande?':'Which one is the biggest?',
  '¿Cuál es más pequeño?':'Which one is the smallest?',
  '¿Cuál es el número más grande?':'Which number is the biggest?',
  '¿Cuál es el número más pequeño?':'Which number is the smallest?',
  '{n} es el mayor.':'{n} is the biggest.',
  '{n} es el menor.':'{n} is the smallest.',
  'Piénsalo otra vez: mira primero cuántas cifras tiene.':'Think again: first look at how many digits each number has.',

  /* odd one out */
  '¿Cuál no es del grupo?':'Which one does not belong?',
  'Los demás son {g}.':'The others are all {g}.',
  'Ese sí es del grupo. Busca el diferente.':'That one belongs. Find the one that is different.',

  /* where does it live? ({h} is "the sea", "the farm"…: on the farm, in the sea) */
  '¿Dónde vive {a}?':'Where does {a} live?',
  '{a} vive en {h}.':v=>`${v.a} lives ${/farm|ice/.test(v.h)?'on':'in'} ${v.h}.`,
  'Ahí no. Prueba otro lugar.':'Not there. Try another place.',

  /* times tables and mental maths */
  '{a} por {b}':'What is {a} times {b}?',
  '{a} por {b} son {p}.':'{a} times {b} is {p}.',
  'No es esa. Piensa en la tabla del {a}.':'Not that one. Think about the {a} times table.',
  '{a} más {b}':'What is {a} plus {b}?',
  'Son {r}.':'The answer is {r}.',
  'Revisa las unidades y las decenas.':'Check the ones and the tens.',

  /* number sequences: the rule is said after "It is 20:" */
  'suma {k} cada vez':'add {k} each time',
  'se multiplica por {m}':'multiply by {m} each time',
  'resta {k} cada vez':'take away {k} each time',
  'suma {a} y luego {b}':'add {a}, then add {b}',
  'son números al cuadrado':'they are square numbers',
  'cada número es la suma de los dos anteriores':'each number is the two before it added together',
  '¿Qué número sigue?':'Which number comes next?',
  'Es {n}: {r}.':'It is {n}: {r}.',
  'Mira cuánto cambia de uno a otro.':'Look at how much it changes from one number to the next.',

  /* spelling */
  '¿Cuál está bien escrita?':'Which one is spelt correctly?',
  'Se escribe {w}.':'It is spelt {w}.',
  'Esa tiene una falta. Prueba la otra.':'That one has a mistake. Try the other one.',

  /* capital cities */
  '¿Cuál es la capital de {c}?':'What is the capital of {c}?',
  'La capital de {c} es {k}.':'The capital of {c} is {k}.',
  '{v} es otra capital. Prueba otra vez.':'{v} is the capital of a different country. Try again.',

  /* living things ({k} is mammal, bird, fish, reptile or insect: a mammal, an insect) */
  '¿Qué es {a}?':'What kind of animal is {a}?',
  '{a} es un {k}.':v=>`${v.a} is ${/^[aeiou]/i.test(v.k)?'an':'a'} ${v.k}.`,
  'No. Piensa cómo nace y cómo respira.':'Not quite. Think about how it is born and how it breathes.',
});

/* ---------- data lists (same shape as DATA.es in 10-datos.js) ---------- */
LANGS.en.data.COLORS=[
  {n:'red',c:'var(--red)'},{n:'blue',c:'var(--blue)'},{n:'yellow',c:'var(--yellow)'},
  {n:'green',c:'var(--green)'},{n:'purple',c:'var(--purple)'},{n:'orange',c:'var(--orange)'},{n:'pink',c:'var(--pink)'}];
LANGS.en.data.ANIMALS=[
  {e:'🐮',n:'the cow',s:'moo'},{e:'🐶',n:'the dog',s:'woof woof'},{e:'🐱',n:'the cat',s:'miaow'},
  {e:'🐷',n:'the pig',s:'oink oink'},{e:'🐑',n:'the sheep',s:'baa baa'},{e:'🦆',n:'the duck',s:'quack quack'},
  {e:'🐸',n:'the frog',s:'ribbit ribbit'},{e:'🦁',n:'the lion',s:'roar'},{e:'🐔',n:'the hen',s:'cluck cluck'},
  {e:'🐴',n:'the horse',s:'neigh'},{e:'🐝',n:'the bee',s:'buzz'},{e:'🐍',n:'the snake',s:'hiss'}];
LANGS.en.data.SHAPES=[
  {n:'the circle',svg:'<circle cx="50" cy="50" r="42"/>'},
  {n:'the square',svg:'<rect x="10" y="10" width="80" height="80" rx="6"/>'},
  {n:'the triangle',svg:'<polygon points="50,8 94,90 6,90"/>'},
  {n:'the star',svg:'<polygon points="50,5 61,38 96,38 68,59 79,93 50,72 21,93 32,59 4,38 39,38"/>'},
  {n:'the heart',svg:'<path d="M50 88C20 65 5 48 5 30 5 15 17 5 30 5c10 0 17 6 20 13 3-7 10-13 20-13 13 0 25 10 25 25 0 18-15 35-45 58z"/>'},
  {n:'the rectangle',svg:'<rect x="4" y="26" width="92" height="48" rx="6"/>'}];
/* Single words, lower case, letters a to z only (they also fill the word search).
   Each one starts with the usual sound of its first letter (no "giraffe", "sheep" or "knife"),
   and the first word for each letter is the one used to name that letter when tracing. No K, Q or X words. */
LANGS.en.data.WORDS=[
  ['🍎','apple'],['🐻','bear'],['🐱','cat'],['🦆','duck'],['🥚','egg'],['🐟','fish'],['🐐','goat'],['🏠','house'],
  ['🧊','ice'],['👖','jeans'],['🦁','lion'],['🌙','moon'],['👃','nose'],['🐙','octopus'],['🐷','pig'],['🐰','rabbit'],
  ['☀️','sun'],['🐯','tiger'],['☂️','umbrella'],['🚐','van'],['🕸️','web'],['🦓','zebra'],
  ['🐘','elephant'],['🐭','mouse'],['🌳','tree'],['🐝','bee'],['🐢','turtle'],['🦋','butterfly'],['⭐','star'],['🐍','snake'],
  ['🦉','owl'],['🐄','cow'],['🌹','rose'],['🦊','fox'],['🍋','lemon'],['🥕','carrot'],['🎈','balloon'],['👑','crown'],
  ['🐴','horse'],['🐸','frog'],['🚂','train'],['🐶','dog'],['🍇','grapes'],['🍐','pear'],['🐜','ant'],['🦀','crab'],
  ['🚌','bus'],['🍌','banana'],['🎩','hat'],['🥛','milk'],['🍕','pizza'],['🐞','ladybird'],['🎻','violin']];
/* Letters offered as wrong answers in "First letter" and used to fill the word search.
   K, Q and X are left out so that "cat" never has K as a trap and "kite" never needs C. */
LANGS.en.data.LETTERS='ABCDEFGHIJLMNOPRSTUVWYZ'.split('');
/* [picture, right spelling, common mistake]: silent letters, ph, double letters, soft c and g, wh, qu, ie and more.
   No mistake is a real English word. */
LANGS.en.data.SPELL=[
  ['🚲','bicycle','bicicle'],['🔪','knife','nife'],['👻','ghost','gost'],['🐘','elephant','elefant'],['🐬','dolphin','dolfin'],
  ['🐋','whale','whail'],['🏰','castle','casle'],['✂️','scissors','sissors'],['🏝️','island','iland'],['👍','thumb','thum'],
  ['🍂','autumn','autum'],['❓','question','qwestion'],['🥪','sandwich','sandwhich'],['👫','friends','freinds'],['📚','library','libary'],
  ['🍫','chocolate','choclate'],['🥦','vegetables','vegtables'],['🦏','rhinoceros','rinoceros'],['🐿️','squirrel','squirel'],['🐛','caterpillar','caterpiller'],
  ['🦕','dinosaur','dinosore'],['🚑','ambulance','ambulence'],['🔬','science','sience'],['⛰️','mountain','mountin'],['🥔','potato','potatoe'],
  ['✈️','aeroplane','airoplane'],['🍪','biscuit','biskit'],['🦒','giraffe','jiraffe'],['🎸','guitar','gitar'],['🦔','hedgehog','hejhog'],
  ['🐧','penguin','pengwin'],['⚡','lightning','litening'],['☂️','umbrella','umbrela'],['🎈','balloon','baloon'],['🍓','strawberry','strawbery'],
  ['🩺','doctor','docter']];
/* "the" goes with the country when English needs it: the capital of the United Kingdom. */
LANGS.en.data.CAPITALS=[
  ['Spain','Madrid'],['Mexico','Mexico City'],['Argentina','Buenos Aires'],['Colombia','Bogotá'],['Peru','Lima'],
  ['Chile','Santiago'],['Venezuela','Caracas'],['Ecuador','Quito'],['Cuba','Havana'],['the Dominican Republic','Santo Domingo'],
  ['France','Paris'],['Italy','Rome'],['Portugal','Lisbon'],['Germany','Berlin'],['Japan','Tokyo'],['Brazil','Brasília'],
  ['the United Kingdom','London'],['Ireland','Dublin'],['the United States','Washington'],['Egypt','Cairo'],['Canada','Ottawa'],
  ['Australia','Canberra'],['New Zealand','Wellington'],['India','New Delhi'],['China','Beijing'],['Greece','Athens'],
  ['Kenya','Nairobi'],['Nigeria','Abuja'],['Morocco','Rabat'],['Poland','Warsaw'],['Romania','Bucharest'],['Ukraine','Kyiv'],
  ['the Netherlands','Amsterdam'],['Norway','Oslo'],['Jamaica','Kingston'],['Pakistan','Islamabad']];
LANGS.en.data.CLASSES=['mammal','bird','fish','reptile','insect'];
LANGS.en.data.CREATURES=[
  ['🐬','the dolphin','mammal'],['🦇','the bat','mammal'],['🐳','the whale','mammal'],['🐘','the elephant','mammal'],['🐒','the monkey','mammal'],
  ['🐧','the penguin','bird'],['🦉','the owl','bird'],['🦅','the eagle','bird'],['🦩','the flamingo','bird'],['🦜','the parrot','bird'],
  ['🦈','the shark','fish'],['🐠','the clownfish','fish'],['🐡','the pufferfish','fish'],
  ['🐢','the turtle','reptile'],['🐍','the snake','reptile'],['🐊','the crocodile','reptile'],['🦎','the lizard','reptile'],
  ['🦋','the butterfly','insect'],['🐝','the bee','insect'],['🐜','the ant','insect'],['🐞','the ladybird','insect']];
LANGS.en.data.NUMWORDS=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
LANGS.en.data.SKY=[['☀️','the sun'],['🌙','the moon'],['⭐','the star'],['☁️','the cloud'],['🚀','the rocket'],['🪐','the planet'],['🌈','the rainbow'],['✈️','the aeroplane']];
/* n is said as "The others are all fruit." */
LANGS.en.data.GROUPS=[
  {n:'fruit',items:['🍎','🍌','🍇','🍓','🍐','🍒','🍉']},{n:'animals',items:['🐶','🐱','🐮','🐷','🐴','🐑','🐸']},
  {n:'vehicles',items:['🚗','🚌','🚲','🚂','✈️','🚀','🚜']},{n:'clothes',items:['👕','👖','👗','🧦','🧢','👟','🧤']},
  {n:'musical instruments',items:['🎸','🥁','🎺','🎻','🎹','🪇']}];
/* The answer says "on the farm", "on the polar ice", "in the sea", "in the jungle" (see '{a} vive en {h}.' above). */
LANGS.en.data.HABITATS=[['🌊','the sea'],['🚜','the farm'],['🌴','the jungle'],['❄️','the polar ice']];
LANGS.en.data.HABITANTS=[['🐙','the octopus','the sea'],['🐠','the clownfish','the sea'],['🐬','the dolphin','the sea'],['🦀','the crab','the sea'],
  ['🐄','the cow','the farm'],['🐔','the hen','the farm'],['🐷','the pig','the farm'],['🐑','the sheep','the farm'],
  ['🐒','the monkey','the jungle'],['🦜','the parrot','the jungle'],['🐅','the tiger','the jungle'],['🦍','the gorilla','the jungle'],
  ['🐧','the penguin','the polar ice'],['🐻‍❄️','the polar bear','the polar ice'],['🦭','the seal','the polar ice']];
LANGS.en.data.SPACE_QA=[
  ['🪐','Which is the biggest planet?','Jupiter',['Mars','Earth','Mercury']],
  ['☀️','Which planet is closest to the Sun?','Mercury',['Venus','Mars','Neptune']],
  ['🔴','Which planet is called the red planet?','Mars',['Venus','Saturn','Uranus']],
  ['💍','Which planet has very famous rings?','Saturn',['Mars','Mercury','Venus']],
  ['🌍','Which planet do we live on?','Earth',['Mars','Jupiter','Venus']],
  ['☀️','What is the Sun?','A star',['A planet','A moon','A comet']],
  ['🔢','How many planets are there in the solar system?','8',['7','9','10']],
  ['🌙','What goes round and round the Earth?','The Moon',['The Sun','Mars','Saturn']],
  ['👨‍🚀','Who was the first person to walk on the Moon?','Neil Armstrong',['Christopher Columbus','Albert Einstein','Isaac Newton']],
  ['🌌','What is our galaxy called?','The Milky Way',['Andromeda','The Great Bear','Orion']],
  ['🗓️','How long does the Earth take to go once round the Sun?','One year',['One day','One month','One week']],
  ['🌗','How long does the Earth take to spin round once?','One day',['One year','One hour','One month']],
  ['🔥','Which is the hottest planet?','Venus',['Mercury','Mars','Jupiter']],
  ['🚀','What do we call people who travel into space?','Astronauts',['Pilots','Sailors','Divers']]];
LANGS.en.data.NATURE_QA=[
  ['🌱','What do plants need to grow?','Light, water and air',['Only sand','Darkness','Chocolate']],
  ['🐝','What do bees collect from flowers?','Nectar',['Leaves','Pine seeds','Salty water']],
  ['🌳','Which gas do plants give out that we need to breathe?','Oxygen',['Smoke','Helium','Cooking gas']],
  ['🐛','What does a caterpillar turn into?','A butterfly',['A bee','A beetle','An ant']],
  ['🐸','What does a tadpole turn into?','A frog',['A fish','A turtle','A lizard']],
  ['🍂','In which season do lots of trees lose their leaves?','Autumn',['Spring','Summer','None of them']],
  ['🥕','Which part of a plant grows under the ground?','The root',['The flower','The leaf','The fruit']],
  ['🌊','What does seawater taste like?','Salty',['Sweet','Spicy','Sour']],
  ['🧊','When water freezes, it turns into…','Ice',['Steam','Cloud','Sand']],
  ['🐋','What is the biggest animal in the world?','The blue whale',['The elephant','The giraffe','The great white shark']],
  ['🕷️','How many legs does a spider have?','8',['6','4','10']],
  ['🐜','How many legs does an insect have?','6',['8','4','10']],
  ['🌧️','Where does rain fall from?','From the clouds',['From the trees','From the mountains','From the Sun']],
  ['🌸','In which season do lots of plants flower?','Spring',['Winter','Autumn','None of them']],
  ['♻️','What can we do to look after the planet?','Recycle and never drop litter',['Leave the taps running','Throw plastic in the sea','Cut down all the trees']]];
LANGS.en.data.STICKER_NAMES=Object.fromEntries([
  ['🐶','dog'],['🐱','cat'],['🐭','mouse'],['🐹','hamster'],['🐰','rabbit'],['🦊','fox'],['🐻','bear'],['🐼','panda'],['🐨','koala'],['🐯','tiger'],
  ['🦁','lion'],['🐮','cow'],['🐷','piglet'],['🐸','frog'],['🐵','monkey'],['🐔','hen'],['🐧','penguin'],['🐦','bird'],['🦆','duck'],['🦉','owl'],
  ['🦄','unicorn'],['🐝','bee'],['🦋','butterfly'],['🐞','ladybird'],['🐢','turtle'],['🐙','octopus'],['🐠','fish'],['🐬','dolphin'],['🐳','whale'],['🦀','crab'],
  ['🦒','giraffe'],['🐘','elephant'],['🍎','apple'],['🍌','banana'],['🍓','strawberry'],['🍉','watermelon'],['🍒','cherries'],['🍦','ice cream'],['🍪','biscuit'],['🧁','cupcake'],
  ['🚀','rocket'],['🛸','flying saucer'],['🪐','planet'],['🌙','moon'],['⭐','star'],['☀️','sun'],['🌈','rainbow'],['⛄','snowman'],['🚂','train'],['🚒','fire engine'],
  ['🚜','tractor'],['⛵','sailing boat'],['🎈','balloon'],['🎨','paints'],['🎸','guitar'],['⚽','football'],['🏆','trophy'],['👑','crown'],['💎','diamond'],['🧸','teddy bear']]);
