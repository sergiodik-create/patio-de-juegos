/* English: games in 50-peques.js, 51-medianos.js and 52-mayores.js. */
(()=>{
/* Small helpers for this file only (kept inside this function so they do not clash with other files). */
const cap1=t=>t?String(t)[0].toUpperCase()+String(t).slice(1):t;
const pl=(n,w)=>n+` `+w+(+n===1?``:`s`);
const SMALL=[`zero`,`one`,`two`,`three`,`four`,`five`,`six`,`seven`,`eight`,`nine`,`ten`,`eleven`,`twelve`,
  `thirteen`,`fourteen`,`fifteen`,`sixteen`,`seventeen`,`eighteen`,`nineteen`];
const numWord=n=>n<20?SMALL[n]:n<30?`twenty`+(n>20?`-`+SMALL[n-20]:``):String(n);
const hour12=x=>(x-1)%12+1;
/* British way of telling the time: "3 o'clock", "half past 3", "quarter to 4", "ten past 2".
   hourName turns the hour into digits (for the buttons) or words (for the voice). */
const clock=(h,m,hourName)=>{
  if(m===0)return hourName(hour12(h))+` o'clock`;
  if(m===30)return `half past `+hourName(hour12(h));
  const past=m<30,mm=past?m:60-m,hh=hourName(hour12(past?h:h+1));
  const mins=mm===15?`quarter`:mm%5===0?numWord(mm):numWord(mm)+(mm===1?` minute`:` minutes`);
  return mins+(past?` past `:` to `)+hh;
};

Object.assign(LANGS.en.t,{
  /* ---------- 50-peques.js: names on the game doors ---------- */
  'Puzle':'Puzzle',
  'Pon cada pieza en su sitio':'Put each piece in its place',
  'Piano de animales':'Animal piano',
  'Toca y repite la música':'Play and copy the music',
  'Sombras':'Shadows',
  '¿De quién es la sombra?':'Whose shadow is it?',
  '¿Cómo se siente?':'How are they feeling?',
  'Alegría, tristeza, miedo…':'Happy, sad, scared…',
  '¿Qué pasa después?':'What happens next?',
  'Huevo, pollito, gallina…':'Egg, chick, hen…',

  /* shadows */
  '¿De quién es esta sombra?':'Whose shadow is this?',
  '¡Es la sombra de {x}!':v=>`It's ${v.x}'s shadow!`,
  'Eso es {x}. Mira bien la forma.':"That's {x}. Look carefully at the shape.",

  /* feelings (the feelings are adjectives: happy, sad…; the situations are about Sam) */
  'Toca la cara de {f}':'Tap the {f} face',
  'Es la cara de {f}.':"It's the {f} face.",
  'Esa es la cara de {f}. Prueba otra vez.':"That's the {f} face. Try again.",
  '{s} ¿Cómo se siente?':'{s} How does Sam feel?',
  'Siente {f}.':'Sam feels {f}.',
  'Puede ser, pero piensa otra vez: ¿qué sentirías tú?':'Maybe, but think again. How would you feel?',

  /* what happens next */
  'Piensa qué pasa primero y qué pasa luego.':'Think about what happens first, and what happens after that.',

  /* puzzle */
  '{n} piezas':'{n} pieces',
  'Hueco':'Space',
  'Pieza':'Piece',
  'Toca una pieza y luego toca su sitio en el puzle.':'Tap a piece, then tap its place in the puzzle.',
  '¡Puzle terminado! ¡Qué bien!':'Puzzle finished! Well done!',
  'Otro puzle':'Another puzzle',
  'Ahí no va. Prueba en otro sitio.':"It doesn't go there. Try another place.",

  /* animal piano (the song is the same tune as Twinkle, Twinkle, Little Star) */
  'Toca las teclas para hacer música.':'Tap the keys to make music.',
  'Nota':'Note',
  '🎵 Estrellita':'🎵 Twinkle, twinkle',
  '🔁 Repite conmigo':'🔁 Copy me',
  '¡Eres un gran músico!':"You're a great musician!",
  '¡Bravo! ¡Eres un gran músico!':"Bravo! You're a great musician!",
  '¡Muy bien! Escucha la siguiente.':'Well done! Listen to the next one.',
  '¡Casi! Escucha otra vez.':'Nearly! Listen again.',
  'Escucha…':'Listen…',
  '¡Ahora tú! Repite las notas.':'Your turn! Play the notes back.',
  'Estrellita, ¿dónde estás?':'Twinkle, twinkle, little star…',
  '¿La tocas tú? Empieza por el perrito.':'Can you play it? Start with the puppy.',
  'Escucha y repite.':'Listen, then copy me.',

  /* ---------- 51-medianos.js: names on the game doors ---------- */
  'Laberinto':'Maze',
  'Lleva al ratón al queso':'Take the mouse to the cheese',
  'Trazar letras':'Tracing letters',
  'Escribe con el dedo':'Write with your finger',
  'Dominó':'Dominoes',
  '¿Qué ficha encaja?':'Which domino fits?',
  '¿Qué hora es?':'What time is it?',
  'Aprende el reloj':'Learn to tell the time',
  'Monedas':'Coins',
  '¿Cuánto dinero hay?':'How much money is there?',
  'Sopa de letras':'Word search',
  'Encuentra las palabras':'Find the words',

  /* dominoes */
  '¿Qué ficha puede ir al lado?':'Which domino can go next to it?',
  'Busca una ficha que tenga 1 punto.':'Find a domino with 1 dot.',
  'Busca una ficha que tenga {n} puntos.':'Find a domino with {n} dots.',
  '{a} y {b}':'{a} and {b}',
  'Sí, las dos tienen {n}.':v=>`Yes, they both have ${pl(v.n,`dot`)}.`,
  'Esa ficha no tiene {n}. Cuenta los puntos.':v=>`That domino has no side with ${pl(v.n,`dot`)}. Count carefully.`,

  /* clock */
  'Fíjate: la aguja corta marca la hora y la larga, los minutos.':'Look: the short hand shows the hour, and the long hand shows the minutes.',

  /* coins */
  '¿Cuánto dinero hay en total?':'How much money is there altogether?',
  'Hay {n} en total.':"That's {n} altogether.",
  'Suma primero las monedas grandes.':'Add up the big coins first.',
  'Cuenta las monedas una a una.':'Count the coins one by one.',

  /* maze */
  'Pequeño':'Small',
  'Mediano':'Medium',
  'Grande':'Big',
  'Arriba':'Up',
  'Izquierda':'Left',
  'Abajo':'Down',
  'Derecha':'Right',
  'Lleva al ratón hasta el queso. Usa las flechas o desliza el dedo.':'Help the mouse get to the cheese. Use the arrows, or slide your finger.',
  '¡Ñam! El ratón ha encontrado el queso.':'Yum! The mouse has found the cheese.',
  'Otro laberinto':'Another maze',

  /* tracing letters ({l} arrives in lower case; a capital helps the voice say the letter's name) */
  'Mayúsculas':'Capitals',
  'minúsculas':'small letters',
  'Números':'Numbers',
  'el número {n}':'the number {n}',
  'la {l}, de {w}':v=>`the letter ${String(v.l).toUpperCase()}, as in ${v.w}`,
  'la {l}':v=>`the letter ${String(v.l).toUpperCase()}`,
  'Repasa {l} con el dedo.':v=>`Use your finger to trace ${v.l}.`,
  'Zona para escribir':'Writing area',
  '🔊 Oír':'🔊 Listen',
  'Siguiente ➡️':'Next ➡️',
  '¡Qué bien escrita! Toca «Siguiente».':'Beautifully written! Tap ‘Next’.',
  '¡Muy bien escrita!':'Beautiful writing!',
  /* names the same button as the 'Borrar' translation, whatever it is */
  'Intenta seguir la letra gris. Toca «Borrar» para empezar de nuevo.':()=>`Try to follow the grey letter. Tap ‘${_('Borrar')}’ to start again.`,
  '¡Sigue! Repasa toda la letra.':'Keep going! Trace the whole letter.',

  /* word search */
  'Toca la primera letra de una palabra y después la última.':'Tap the first letter of a word, then the last letter.',
  '¡Has encontrado todas las palabras!':'You found all the words!',
  'Otra sopa':'Another word search',
  'Busca las palabras escondidas.':'Find the hidden words.',
  '¡{w}!':'{w}!',

  /* ---------- 52-mayores.js: names on the game doors ---------- */
  'Sudoku':'Sudoku',
  'Lógica con números':'Logic with numbers',
  'Salva la flor':'Save the flower',
  'Adivina la palabra':'Guess the word',
  'Robot':'Robot',
  'Prográmalo con flechas':'Program it with arrows',
  'Programa con bucles':'Coding with loops',
  'El robot que repite':'The robot that repeats',
  'Fracciones':'Fractions',
  'Partes de una pizza':'Parts of a pizza',
  'Continentes':'Continents',
  '¿Dónde está?':'Where is it?',

  /* fractions ({f}, {a} and {b} are fractions in words, such as "a half" or "three quarters") */
  '¿Qué parte de la pizza está pintada?':'What fraction of the pizza is coloured in?',
  'Es {f}.':"It's {f}.",
  'Cuenta los trozos pintados y los trozos que hay en total.':'Count the coloured slices, then count all the slices.',
  '¿Qué fracción es igual?':'Which fraction is the same amount?',
  '{f}. ¿Qué fracción es igual?':v=>`${cap1(v.f)}. Which fraction is the same amount?`,
  '{a} es lo mismo que {b}.':v=>`${cap1(v.a)} is the same as ${v.b}.`,
  'Divide arriba y abajo por el mismo número.':'Divide the top and the bottom by the same number.',

  /* continents */
  '¿En qué continente vive {x} en libertad?':'On which continent does {x} live in the wild?',
  '¿En qué continente está {x}?':'On which continent is {x}?',
  'Está en {c}.':'You can find it in {c}.',
  'No es ahí. Piensa en el mapa del mundo.':"It's not there. Think of the map of the world.",

  /* sudoku */
  'Cada fila, cada columna y cada caja tienen todos los números sin repetir.':'Every row, every column and every box has all the numbers, with no repeats.',
  'Toca una casilla vacía y luego un número.':'Tap an empty square, then tap a number.',
  '¡Sudoku resuelto! ¡Qué cabeza!':'Sudoku solved! What a clever brain!',
  'Otro sudoku':'Another sudoku',

  /* save the flower */
  'Pista: {c}':'Clue: {c}',
  '💡 Ver dibujo':'💡 Show picture',
  'Adivina la palabra antes de que la flor pierda todos sus pétalos.':'Guess the word before the flower loses all its petals.',
  '¡Bien! Has salvado la flor: {w}.':'Well done! You saved the flower. The word was {w}.',
  '¡Oh! La flor se ha quedado sin pétalos. Era «{w}».':'Oh no! The flower has lost all its petals. The word was {w}.',
  'Otra palabra':'Another word',

  /* robot */
  'Lleva el robot a la batería. Usa «Repetir» para gastar menos bloques.':'Take the robot to the battery. Use ‘Repeat’ so you need fewer blocks.',
  'Lleva el robot hasta la batería. Pon las flechas y pulsa «Adelante».':'Take the robot to the battery. Add the arrows, then press ‘Go’.',
  'Reto {i} de {n} · Máximo {m} bloques':'Challenge {i} of {n} · Up to {m} blocks',
  'Reto libre':'Free challenge',
  'Programa':'Program',
  '🔁 Repetir':'🔁 Repeat',
  '⤴ Fin':'⤴ End',
  '▶ Adelante':'▶ Go',
  'Máximo {m} bloques. Usa «Repetir».':'You can only use {m} blocks. Try ‘Repeat’.',
  'Repetir {n} veces':'Repeat {n} times',
  'Tu programa aparecerá aquí.':'Your program will appear here.',
  'Bloques: {b} de {m}':'Blocks: {b} of {m}',
  'Primero pon algunas flechas.':'Add some arrows first.',
  'El robot se ha parado antes de llegar. Cambia el programa.':'The robot stopped before it got there. Change the program.',
  '¡Uy! El robot se ha chocado. Cambia el programa.':'Oops! The robot bumped into something. Change the program.',
  '¡Conseguido con {b} bloques!':v=>`You did it with ${pl(v.b,`block`)}!`,
  '¡Conseguido en {n} pasos!':v=>`You did it in ${pl(v.n,`step`)}!`,
  'Siguiente reto':'Next challenge',
});

/* ---------- data of 50-peques.js ---------- */
LANGS.en.data.SHADOWS=[['🚂','the train'],['🦒','the giraffe'],['🐘','the elephant'],['🦋','the butterfly'],['🐢','the turtle'],['🌳','the tree']];
/* n is said in "Tap the happy face", "Sam feels happy". */
LANGS.en.data.FEELINGS=[
  {e:'😀',n:'happy',tip:'When something lovely happens, we feel happy.'},
  {e:'😢',n:'sad',tip:'When we feel sad, a hug can help.'},
  {e:'😠',n:'angry',tip:'When we feel angry, we can take a deep breath and use words to say how we feel.'},
  {e:'😨',n:'scared',tip:'When we feel scared, we can ask a grown-up for help.'},
  {e:'😲',n:'surprised',tip:"We feel surprised when something happens that we didn't expect."},
  {e:'😴',n:'sleepy',tip:'When we feel sleepy, our body is asking us to rest.'}];
/* Each situation is followed by "How does Sam feel?"; the second item must be one of the FEELINGS names. */
LANGS.en.data.SITUATIONS=[
  ['Sam gets a big, big hug.','happy'],['Sam wins a race with friends.','happy'],["Today is Sam's birthday.",'happy'],
  ["Sam's ice cream has fallen on the floor.",'sad'],["Sam's best friend is moving far away.",'sad'],
  ["Someone takes Sam's toy without asking.",'angry'],["Someone tears up the drawing Sam made.",'angry'],
  ["There's a big storm with lots of thunder.",'scared'],['Sam hears a strange noise in the dark.','scared'],
  ['Sam opens a box, and a toy jumps out.','surprised'],['Sam finds a present under the pillow.','surprised'],
  ["Sam has played all day, and now it's night-time.",'sleepy']];
LANGS.en.data.NEXT_SEQS=[
  {e:['🥚','🐣','🐔'],t:'A chick hatches out of the egg, and the chick grows into a hen.'},
  {e:['🌱','🪴','🌳'],t:'The seed sprouts, grows and grows, and becomes a tree.'},
  {e:['🐛','🦋'],t:'The caterpillar turns into a butterfly.'},
  {e:['🌧️','🌈'],t:'After the rain, sometimes a rainbow comes out.'},
  {e:['🧦','👟'],t:'First your socks, and then your shoes.'},
  {e:['🧼','🍽️'],t:'We wash our hands before we eat.'},
  {e:['🌅','☀️','🌙'],t:'In the morning the sun comes up, and at night we see the moon.'},
  {e:['👶','🧒','🧑'],t:'Babies grow into children, and then into grown-ups.'},
  {e:['🌸','🍏','🍎'],t:'First the flower, then the green fruit, and then the ripe fruit.'},
  {e:['❄️','⛄','💧'],t:'We make a snowman from the snow, and the sun melts it.'},
  {e:['🛏️','🪥','🎒'],t:'We get up, brush our teeth and go to school.'},
  {e:['🎂','🕯️','🥳'],t:'We put the candles on the cake, blow them out, and then we celebrate!'}];

/* ---------- data of 51-medianos.js ---------- */
/* Buttons: "3 o'clock", "Half past 3", "Quarter past 3", "Quarter to 4" (digits, to match the clock face). */
LANGS.en.data.TIME=(h,m)=>cap1(clock(h,m,String));
/* Said after a right answer: "It's half past three." */
LANGS.en.data.TIME_SAY=(h,m)=>`It's `+clock(h,m,numWord)+`.`;
/* English alphabet in the usual British phonics order (s a t p i n m d…). */
LANGS.en.data.TRACE={upper:'SATPINMDGOCKEURHBFLJVWXYZQ',lower:'satpinmdgockeurhbfljvwxyzq'};

/* ---------- data of 52-mayores.js ---------- */
LANGS.en.data.KEYBOARD='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/* Only letters A to Z and spaces: every letter must be on the keyboard above. */
LANGS.en.data.HANGMAN=[
  ['Animals',[['🐘','elephant'],['🦒','giraffe'],['🐢','turtle'],['🦋','butterfly'],['🐊','crocodile'],['🐧','penguin'],['🦉','owl'],['🐬','dolphin'],['🦓','zebra'],['🐿️','squirrel'],['🦔','hedgehog'],['🐙','octopus']]],
  ['Fruit and food',[['🍎','apple'],['🍌','banana'],['🍓','strawberry'],['🍉','watermelon'],['🍊','orange'],['🍅','tomato'],['🥕','carrot'],['🍞','bread'],['🧀','cheese'],['🍇','grapes']]],
  ['Space',[['🪐','planet'],['⭐','star'],['🚀','rocket'],['👩‍🚀','astronaut'],['🌌','galaxy'],['☄️','comet'],['🛰️','satellite'],['🌙','moon']]],
  ['Nature',[['⛰️','mountain'],['🌋','volcano'],['🏞️','river'],['🌲','forest'],['🌈','rainbow'],['⛈️','storm'],['🏜️','desert'],['🌊','wave'],['🌻','sunflower']]],
  ['At home',[['🛏️','bed'],['🪑','chair'],['🚪','door'],['🪟','window'],['🧸','teddy bear'],['📚','book'],['🥄','spoon'],['🛁','bath']]]];
/* Fraction in words: 3/4 → "three quarters", 1/2 → "a half", 1/8 → "an eighth". */
LANGS.en.data.FRACTION=(k,n)=>{
  const d={2:[`half`,`halves`],3:[`third`,`thirds`],4:[`quarter`,`quarters`],5:[`fifth`,`fifths`],6:[`sixth`,`sixths`],
    7:[`seventh`,`sevenths`],8:[`eighth`,`eighths`],9:[`ninth`,`ninths`],10:[`tenth`,`tenths`]}[n];
  if(!d)return numWord(k)+` out of `+numWord(n);
  return k===1?(n===8?`an `:`a `)+d[0]:numWord(k)+` `+d[1];
};
/* The seven continents taught in British schools (North and South America are separate).
   kind stays 'vive' (an animal that lives there in the wild) or 'está' (a place); the number is the continent. */
LANGS.en.data.WORLD={continents:['North America','South America','Europe','Asia','Africa','Oceania','Antarctica'],items:[
  ['🦘','vive','the kangaroo',5],['🐨','vive','the koala',5],['🐼','vive','the giant panda',3],['🦒','vive','the giraffe',4],['🦓','vive','the zebra',4],
  ['🐍','vive','the green anaconda',1],['🐧','vive','the emperor penguin',6],['🦅','vive','the Andean condor',1],['🦍','vive','the gorilla',4],
  ['🗽','está','the Statue of Liberty',0],['🗼','está','the Eiffel Tower',2],['🔺','está','the Great Pyramid of Giza',4],['🗻','está','Mount Fuji',3],
  ['🏟️','está','the Colosseum in Rome',2],['🏔️','está','Mount Everest',3],['🌳','está','the Amazon rainforest',1],['🏜️','está','the Sahara Desert',4],
  ['⛪','está','the Sagrada Família in Barcelona',2],['🕌','está','the Taj Mahal',3],['🌉','está','the Golden Gate Bridge',0],['🪸','está','the Great Barrier Reef',5],['🧊','está','the biggest ice sheet in the world',6]]};
})();
