/* English: games for 11 and 12 (55-once-doce.js) and the language-learning section (56-idiomas.js). */
Object.assign(LANGS.en.t,{
  /* ---------- 55-once-doce.js: game names ---------- */
  'Acertijos': 'Riddles',
  'Piensa antes de contestar': 'Think before you answer',
  'Mecanografía': 'Typing',
  'Escribe rápido y bien': 'Type quickly and correctly',
  'Ciencia': 'Science',
  'Cuerpo, materia y energía': 'Body, matter and energy',
  'Historia': 'History',
  '¿Qué pasó antes?': 'What came first?',
  'Dinero y ahorro': 'Money and saving',
  'Ahorra, compara y decide': 'Save, compare and decide',

  /* riddles */
  'Si hoy es {d}, ¿qué día será dentro de {n} días?': 'If today is {d}, what day will it be in {n} days?',
  'Si hoy es {d}, ¿qué día fue hace {n} días?': 'If today is {d}, what day was it {n} days ago?',
  'Cada 7 días se repite el mismo día de la semana. {n} días son {w} semanas y {r} días más.': v=>{
    const wk=v.w===1?`1 week`:`${v.w} weeks`,dy=v.r===1?`1 day`:`${v.r} days`;
    return 'Every 7 days, the same day of the week comes round again. '+(
      v.w===0?`${v.n} days is less than a week, so just count them one by one.`:
      v.r===0?`${v.n} days is exactly ${wk}, so it is the same day.`:
      `${v.n} days is ${wk} and ${dy} more.`);},
  'Pista: quita semanas enteras de 7 días.': 'Hint: take away whole weeks of 7 days.',
  'Léelo otra vez con calma: a veces la trampa está en las palabras.': 'Read it again slowly: sometimes the trick is in the words.',

  /* history */
  '¿Qué pasó primero?': 'What happened first?',
  '{e}: {y}.': '{e} {y}.',
  'Piensa: ¿había electricidad, imprenta o coches en esa época?': 'Think: did people have electricity, printed books or cars back then?',

  /* money and saving */
  'Necesidad': 'Need',
  'Capricho': 'Want',
  '¿{x} es una necesidad o un capricho?': v=>{const x=String(v.x||'');return `Is ${x.charAt(0).toLowerCase()+x.slice(1)} a need or a want?`;},
  'Es una necesidad: la necesitamos para vivir bien.': 'It is a need: we need it to live well.',
  'Es un capricho: está bien tenerlo a veces, pero podemos vivir sin él.': 'It is a want: it is nice to have sometimes, but we can live without it.',
  'Piensa: ¿podríamos vivir sin ello?': 'Think: could we live without it?',
  'Quieres algo que cuesta {p}. Ahorras {s} cada semana. ¿Cuántas semanas necesitas?': 'You want something that costs {p}. You save {s} every week. How many weeks do you need?',
  '{p} entre {s} son {w} semanas.': '{p} divided by {s} is {w}, so you need {w} weeks.',
  'Divide el precio entre lo que ahorras cada semana.': 'Divide the price by the amount you save each week.',
  'Algo cuesta {p} y tiene un {d} % de descuento. ¿Cuánto pagas?': 'Something costs {p}, but there is {d}% off. How much do you pay?',
  'El {d} % de {p} es {r}, así que pagas {pay}.': '{d}% of {p} is {r}, so you pay {pay}.',
  'Primero calcula cuánto te descuentan y réstalo.': 'First work out how much money comes off, then take it away.',
  'Compras algo de {p} y pagas con {b}. ¿Cuánto te devuelven?': 'You buy something for {p} and pay with a {b} note. How much change do you get?',
  '{b} menos {p} son {c}.': '{b} minus {p} is {c}.',
  'Cuenta desde el precio hasta lo que has pagado.': 'Count up from the price to the amount you paid.',
  'Paquete de {n}': 'Pack of {n}',
  'Un paquete de {n1} yogures cuesta {p1} y uno de {n2} cuesta {p2}. ¿Cuál es más barato por yogur?': 'A pack of {n1} yogurts costs {p1} and a pack of {n2} costs {p2}. Which one is cheaper per yogurt?',
  'Cada yogur cuesta {u1} en el pequeño y {u2} en el grande.': 'Each yogurt costs {u1} in the small pack and {u2} in the big pack.',
  'Divide cada precio entre el número de yogures.': 'Divide each price by the number of yogurts.',

  /* typing */
  'Palabras cortas': 'Short words',
  'Palabras largas': 'Long words',
  'Frases': 'Sentences',
  'Palabra {i} de {n}': 'Word {i} of {n}',
  'Escribe aquí': 'Type here',
  'Escribe la palabra que ves. Puedes usar el teclado o la pantalla.': 'Type the word you see. You can use the keyboard or the screen.',
  '¡Terminado! {w} palabras por minuto y {e} fallos.': v=>`Finished! ${v.w} ${v.w===1?`word`:`words`} per minute and ${v.e===0?`no mistakes`:v.e===1?`1 mistake`:`${v.e} mistakes`}.`,

  /* ---------- 56-idiomas.js: learning another language ---------- */
  'Comida': 'Food',
  'En casa': 'At home',
  'El cuerpo': 'The body',
  'La ropa': 'Clothes',
  'Transportes': 'Transport',
  'Frases para empezar': 'First phrases',
  'Hola, gracias, ¿cómo te llamas?': 'Hello, thank you, what is your name?',
  'Parejas de palabras': 'Word pairs',
  'Une el dibujo con su palabra': 'Match each picture to its word',
  'En {l}': 'In {l}',
  'Escucha y toca': 'Listen and tap',
  'Escucha. ¿Qué es?': 'Listen. What is it?',
  '¡Sí! Es {n}.': 'Yes! You found the {n}.',
  'No es esa. Toca la frase de arriba para oírla otra vez.': 'Not that one. Tap the words at the top to listen again.',
  '¿Cómo se dice «{x}» en {l}?': 'How do you say ‘{x}’ in {l}?',
  '¿Cómo se dice {x} en {l}?': 'How do you say {x} in {l}?',
  'Se dice así:': 'You say it like this:',
  'Esa palabra es otra cosa. Prueba otra vez.': 'That word means something else. Try again.',
  'Escucha y toca el color': 'Listen and tap the colour',
  '¡Sí! Es el {c}.': 'Yes! It is {c}.',
  'No es ese. Toca la frase de arriba para oírla otra vez.': 'Not that one. Tap the words at the top to listen again.',
  '¿Cómo se dice este color en {l}?': 'How do you say this colour in {l}?',
  'Ese es otro color. Prueba otra vez.': 'That is a different colour. Try again.',
  'Escucha y toca el número': 'Listen and tap the number',
  '¡Sí! Es el {n}.': 'Yes! It is {n}.',
  '¿Cuántas hay? Elige el número en {l}.': 'How many are there? Choose the number in {l}.',
  'Hay {n}:': v=>v.n===1?`There is 1:`:`There are ${v.n}:`,
  'Cuenta otra vez despacio.': 'Count again, slowly.',
  '◀ Atrás': '◀ Back',
  '🔊 Escuchar': '🔊 Listen',
  '🐢 Despacio': '🐢 Slowly',
  'Siguiente ▶': 'Next ▶',
  'Escucha y repítelo en voz alta.': 'Listen and say it out loud.',
  'Une cada dibujo con su palabra': 'Match each picture with its word',
});

/* ---------- data for the games for 11 and 12 ---------- */
LANGS.en.data.DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
/* [emoji, riddle, answer, [other options], explanation] */
LANGS.en.data.RIDDLES=[
  ['🐑','A farmer has 17 sheep. All but 9 run away. How many are left?','9',['8','17','0'],'‘All but 9’ means that 9 stay behind.'],
  ['📏','Amy is taller than Leo, and Leo is taller than Mia. Who is the shortest?','Mia',['Amy','Leo','You cannot tell'],'If Amy is taller than Leo, and Leo is taller than Mia, then Mia is the shortest.'],
  ['📅','How many months have 28 days?','All of them',['One','Two','None'],'Every month has at least 28 days.'],
  ['🏃','In a race, you overtake the person in second place. What place are you in now?','Second',['First','Third','Last'],'You take their place, so now you are second.'],
  ['🧱','A brick weighs 1 kilo plus half a brick. How much does a whole brick weigh?','2 kilos',['1 and a half kilos','1 kilo','3 kilos'],'If half a brick weighs 1 kilo, the whole brick weighs 2.'],
  ['🏭','If 5 machines make 5 toys in 5 minutes, how long do 100 machines take to make 100 toys?','5 minutes',['100 minutes','20 minutes','1 minute'],'Each machine takes 5 minutes to make one toy, so 100 machines make 100 toys in 5 minutes.'],
  ['🐸','A frog is at the bottom of a well 10 metres deep. Every day it climbs up 3 metres, and every night it slides back 2. How many days does it take to get out?','8',['10','7','5'],'After 7 days and nights it has climbed 7 metres. On the eighth day it climbs 3 more and gets out.'],
  ['⚾','A bat and a ball cost £1.10 together. The bat costs £1 more than the ball. How much does the ball cost?','5p',['10p','1p','£1'],'If the ball costs 5p, the bat costs £1.05, and together they make £1.10.'],
  ['👧',"Mike's mum has four children: April, May, June and…",'Mike',['July','August','March'],'The fourth child is Mike himself.'],
  ['🎂','I am twice as old as my brother, who is 6. How old will I be when he is 10?','16',['20','14','12'],'Now I am 12. In 4 years I will be 16.'],
  ['🍎','There are 3 apples and you take 2. How many apples do you have?','2',['1','3','5'],'You have the 2 that you took.'],
  ['🪶','Which is heavier: a kilo of feathers or a kilo of iron?','They weigh the same',['The feathers','The iron','It depends on the day'],'A kilo is a kilo, whatever it is made of.'],
  ['🐱','If 3 cats catch 3 mice in 3 minutes, how many cats do you need to catch 60 mice in 30 minutes?','6',['20','60','3'],'Each cat catches one mouse every 3 minutes, so 10 mice in 30 minutes. To catch 60, you need 6 cats.'],
  ['🚆','An electric train is going north and the wind is blowing south. Which way does the smoke go?','There is no smoke',['South','North','Straight up'],'Electric trains do not make smoke.'],
  ['👨‍👩‍👧‍👦','Four brothers each have one sister, and it is the same sister for all of them. How many children are in the family?','5',['8','4','6'],'Four boys and one girl: that makes five children.'],
  ['➗','Divide 30 by a half and add 10. What do you get?','70',['25','40','50'],'Dividing by a half is the same as multiplying by 2. 30 divided by a half is 60, and 60 plus 10 is 70.'],
  ['🥚','If one egg takes 3 minutes to boil, how long do 3 eggs take together in the same pan?','3 minutes',['9 minutes','6 minutes','1 minute'],'They all boil at the same time, so it takes just as long.'],
  ['🪷','Some water lilies double in size every day. After 20 days they cover the whole pond. On which day did they cover half of it?','Day 19',['Day 10','Day 15','Day 5'],'If the pond is full on day 20 and the lilies double every day, it was half full the day before.'],
  ['🔔','A clock strikes 6 times in 5 seconds. How many seconds does it take to strike 12 times?','11',['10','12','24'],'Between 6 strikes there are 5 gaps of 1 second. Between 12 strikes there are 11 gaps.'],
  ['🧦','A dark drawer has red socks and blue socks. What is the smallest number you must take out to be sure of having two of the same colour?','3',['2','4','10'],'With 3 socks and only 2 colours, two of them must match.']];
LANGS.en.data.SCIENCE_QA=[
  ['💧','At what temperature does water boil at sea level?','100 °C',['50 °C','0 °C','200 °C']],
  ['🧊','At what temperature does water freeze?','0 °C',['10 °C','−20 °C','100 °C']],
  ['♨️','What do we call it when a liquid turns into a gas?','Evaporation',['Freezing','Melting','Condensation']],
  ['☁️','What do we call it when a gas turns into a liquid?','Condensation',['Evaporation','Freezing','Melting']],
  ['🌿','What is the name of the process plants use to make their food from light?','Photosynthesis',['Digestion','Respiration','Evaporation']],
  ['🌳','Which gas do plants take from the air for photosynthesis?','Carbon dioxide',['Oxygen','Helium','Hydrogen']],
  ['❤️','Which organ pumps blood all around the body?','The heart',['The liver','The lungs','The stomach']],
  ['🫁','Which organs do we breathe with?','The lungs',['The kidneys','The heart','The stomach']],
  ['🦴','About how many bones does an adult have?','206',['50','1000','12']],
  ['🧲','Which material does a magnet attract?','Iron',['Wood','Plastic','Glass']],
  ['⚡','Which material is good at carrying electricity?','Copper',['Wood','Plastic','Rubber']],
  ['🌍','What is the layer of gases around the Earth called?','The atmosphere',['The crust','The core','The mantle']],
  ['🌋','What is the melted rock that comes out of a volcano called?','Lava',['Sand','Granite','Ice']],
  ['🔬','All living things are made of tiny units. What are they called?','Cells',['Organs','Tissues','Bones']],
  ['☀️','How long does light from the Sun take to reach the Earth?','About 8 minutes',['One second','One day','One year']],
  ['🔊','Can sound travel through empty space?','No, it needs air or another material',['Yes, faster than light','Yes, just like in air','Only at night']],
  ['🧪','What is the chemical formula for water?','H₂O',['CO₂','O₂','NaCl']],
  ['🌬️','Which gas in the air do we need to live?','Oxygen',['Carbon dioxide','Helium','Smoke']],
  ['🍎','Which force makes things fall to the ground?','Gravity',['Magnetism','Electricity','The wind']],
  ['🌡️','What do we use to measure temperature?','A thermometer',['A set of scales','A ruler','A clock']],
  ['🌈','What do we need for a rainbow to appear?','Sunlight and drops of water',['Only clouds','Wind and sand','Snow']],
  ['🦠','Which medicines help to fight infections caused by bacteria?','Antibiotics',['Plasters','Vitamins','Salty water']]];
/* [emoji, what happened (read as «… in 1492.»), year (negative = BC), approximate] */
LANGS.en.data.HISTORY=[
  ['✍️','Writing was invented in Mesopotamia',-3200,true],['🔺','The Great Pyramid of Giza was built',-2560,true],
  ['🏛️','The first Olympic Games were held in Greece',-776,false],['🏟️','The Colosseum in Rome opened',80,false],
  ['📖','Gutenberg built his printing press',1450,true],['⛵','Columbus reached America',1492,false],['🌍','The first voyage around the world ended',1522,false],
  ['🏔️','The Incas built Machu Picchu',1450,true],['📚','The first part of Don Quixote was published',1605,false],
  ['🔭','Galileo saw the moons of Jupiter',1610,false],['💉','Edward Jenner made the first vaccine',1796,false],['🚂','The first passenger train started running',1825,false],
  ['☎️','The telephone was patented',1876,false],['✈️','The Wright brothers made their first flight',1903,false],['💊','Alexander Fleming discovered penicillin',1928,false],
  ['🕊️','The United Nations approved the Universal Declaration of Human Rights',1948,false],['🛰️','The first artificial satellite was launched',1957,false],
  ['🌕','People walked on the Moon for the first time',1969,false],['🌐','The World Wide Web was born',1991,false]];
LANGS.en.data.YEAR=(y,approx)=>(approx?`around `:`in `)+(y<0?`${-y} BC`:y<1000?`the year ${y}`:String(y));
/* Money in pounds: £5, £1.50, and amounts under a pound in pence (40p). */
LANGS.en.data.MONEY=v=>v<1?`${Math.round(v*100)}p`:v.toLocaleString('en-GB',{style:'currency',currency:'GBP',minimumFractionDigits:v%1?2:0,maximumFractionDigits:2});
LANGS.en.data.NEEDS=[['🥛','milk',true],['🧥','a warm coat for winter',true],['💊','medicine',true],['🍞','bread',true],['👟','a pair of shoes for school',true],
  ['💧','water',true],['🪥','a toothbrush',true],['🎮','a new video game',false],['🍬','a bag of sweets',false],['🧸','another teddy bear',false],
  ['🕶️','a pair of trendy sunglasses',false],['📱','a new phone when yours still works',false],['🎈','a giant balloon',false]];
LANGS.en.data.TYPING=[
  ['sun','sea','cat','dog','hat','book','tree','milk','fish','bird','duck','star','ship','frog','cake','rain','blue','jump','play','home'],
  ['butterfly','elephant','dinosaur','chocolate','computer','umbrella','adventure','mountain','sandwich','strawberry','helicopter','kangaroo','calendar','sunflower','library'],
  ['the cat is asleep','I like to read','it is sunny today','the moon is bright','we go to the park','the sea is blue','I have a dog','I love to play','the house is big','we eat fruit']];

/* ---------- vocabulary and phrases (a Spanish-speaking child learns these in English) ---------- */
LANGS.en.data.VOCAB={'🐶':'dog','🐱':'cat','🐮':'cow','🐷':'pig','🐴':'horse','🐑':'sheep','🐔':'chicken','🦆':'duck','🐟':'fish','🐦':'bird',
  '🐸':'frog','🦁':'lion','🐘':'elephant','🐻':'bear','🐰':'rabbit','🐭':'mouse','🐵':'monkey','🦒':'giraffe','🐢':'turtle','🐍':'snake',
  '🍎':'apple','🍌':'banana','🍓':'strawberry','🍊':'orange','🍇':'grapes','🍉':'watermelon','🍞':'bread','🧀':'cheese','🥛':'milk','🥚':'egg',
  '🍦':'ice cream','🍪':'biscuit','🥕':'carrot','🍅':'tomato','💧':'water','🍰':'cake',
  '🏠':'house','🚪':'door','🪟':'window','🛏️':'bed','🪑':'chair','📖':'book','⚽':'ball','🧸':'teddy bear','🥄':'spoon','🛁':'bath','⏰':'clock','🖍️':'crayon',
  '👀':'eyes','👂':'ear','👃':'nose','👄':'mouth','✋':'hand','🦶':'foot','🦷':'tooth','💪':'arm',
  '👕':'T-shirt','👖':'trousers','👗':'dress','🧦':'socks','👟':'trainers','🧢':'cap','🧥':'coat','🧤':'gloves',
  '🚗':'car','🚌':'bus','🚲':'bike','🚂':'train','✈️':'plane','🚀':'rocket','⛵':'boat','🚜':'tractor',
  '☀️':'sun','🌙':'moon','⭐':'star','☁️':'cloud','🌧️':'rain','🌈':'rainbow','🌳':'tree','🌸':'flower','🌊':'sea','⛰️':'mountain'};
LANGS.en.data.PHRASES={hola:'Hello',adios:'Goodbye',buenosdias:'Good morning',buenasnoches:'Good night',porfavor:'Please',gracias:'Thank you',denada:"You're welcome",
  perdon:'Sorry',comotellamas:"What's your name?",mellamo:'My name is Ana',cuantosanos:'How old are you?',tengocinco:"I'm five years old",
  comoestas:'How are you?',estoybien:"I'm fine, thank you",jugar:'Do you want to play with me?',tequiero:'I love you',hambre:"I'm hungry",sed:"I'm thirsty",
  bano:'Where is the toilet?',nolose:"I don't know"};
