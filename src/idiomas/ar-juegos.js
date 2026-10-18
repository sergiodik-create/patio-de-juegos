/* العربية: games in 50-peques.js, 51-medianos.js and 52-mayores.js. */
(()=>{
/* Small helpers for this file only (kept inside this function so they do not clash with other files). */
const hour12=x=>(x-1)%12+1;
/* A number (in digits) with its counted noun: 1 → "نقطة واحدة", 2 → dual, 3–10 → plural, 11 and more → singular.
   f = [singular, dual, dual after a preposition or as object, plural, "one" agreeing with the noun]. */
const count=(n,f,obl)=>{n=+n;return n===1?f[0]+` `+f[4]:n===2?(obl?f[2]:f[1]):n>=3&&n<=10?n+` `+f[3]:n+` `+f[0];};
const PIECE=[`قطعة`,`قطعتان`,`قطعتين`,`قطع`,`واحدة`];
const DOT=[`نقطة`,`نقطتان`,`نقطتين`,`نقاط`,`واحدة`];
const STEP=[`خطوة`,`خطوتان`,`خطوتين`,`خطوات`,`واحدة`];
const TIMES=[`مرة`,`مرتان`,`مرتين`,`مرات`,`واحدة`];
const MINUTE=[`دقيقة`,`دقيقتان`,`دقيقتين`,`دقائق`,`واحدة`];
/* Letter names for tracing: "حرف الباء". */
const NAMES=Object.fromEntries([...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'].map((l,i)=>[l,('الألف الباء التاء الثاء الجيم الحاء الخاء الدال الذال الراء الزاي السين الشين الصاد الضاد '+
  'الطاء الظاء العين الغين الفاء القاف الكاف اللام الميم النون الهاء الواو الياء').split(' ')[i]]));
const letter=l=>NAMES[l]||l;
/* Telling the time as Arab children learn it: "الساعة الثالثة"، "الثالثة والربع"، "الثالثة والنصف"، "الرابعة إلا ربعًا".
   The hour is an ordinal (الساعة is feminine). hourName writes it in digits (buttons) or in words (voice). */
const HOURS=[``,`الواحدة`,`الثانية`,`الثالثة`,`الرابعة`,`الخامسة`,`السادسة`,`السابعة`,`الثامنة`,`التاسعة`,`العاشرة`,`الحادية عشرة`,`الثانية عشرة`];
const clock=(h,m,hourName)=>{
  const now=hourName(hour12(h)),next=hourName(hour12(h+1));
  if(m===0)return now;
  if(m===15)return now+` والربع`;
  if(m===20)return now+` والثلث`;
  if(m===30)return now+` والنصف`;
  if(m===40)return next+` إلا ثلثًا`;
  if(m===45)return next+` إلا ربعًا`;
  return m<30?now+` و`+count(m,MINUTE):next+` إلا `+count(60-m,MINUTE,true);
};
/* Fractions: 1/2 "نصف", 2/3 "ثُلثان", 3/4 "ثلاثة أرباع". A damma on the first letter stops the voice
   reading خُمس as "five" or سُبع as "seven". acc gives the form after يساوي (نصفًا، ثُلثين). */
const FR={2:[`نصف`,`نصفان`,`أنصاف`],3:[`ثُلث`,`ثُلثان`,`أثلاث`],4:[`رُبع`,`رُبعان`,`أرباع`],5:[`خُمس`,`خُمسان`,`أخماس`],
  6:[`سُدس`,`سُدسان`,`أسداس`],7:[`سُبع`,`سُبعان`,`أسباع`],8:[`ثُمن`,`ثُمنان`,`أثمان`],9:[`تُسع`,`تُسعان`,`أتساع`],10:[`عُشر`,`عُشران`,`أعشار`]};
const UNITS=[`صفر`,`واحد`,`اثنان`,`ثلاثة`,`أربعة`,`خمسة`,`ستة`,`سبعة`,`ثمانية`,`تسعة`,`عشرة`];
const frac=(k,n,acc)=>{const d=FR[n];
  if(!d||k<1||k>10)return k+` من `+n;
  return k===1?d[0]+(acc?`ًا`:``):k===2?(acc?d[1].replace(/ان$/,`ين`):d[1]):UNITS[k]+` `+d[2];};
/* every fraction in words, to find the form after يساوي and whether it is a dual */
const ACC={},DUAL=new Set();
for(let n=2;n<=10;n++)for(let k=1;k<n;k++){ACC[frac(k,n)]=frac(k,n,true);if(k===2)DUAL.add(frac(k,n));}

Object.assign(LANGS.ar.t,{
  /* ---------- 50-peques.js: names on the game doors ---------- */
  'Puzle':'أحجية الصور',
  'Pon cada pieza en su sitio':'ضع كل قطعة في مكانها',
  'Piano de animales':'بيانو الحيوانات',
  'Toca y repite la música':'اعزف وكرّر اللحن',
  'Sombras':'الظلال',
  '¿De quién es la sombra?':'لمن هذا الظل؟',
  '¿Cómo se siente?':'كيف يشعر؟',
  'Alegría, tristeza, miedo…':'فرح، حزن، خوف…',
  '¿Qué pasa después?':'ماذا يحدث بعد ذلك؟',
  'Huevo, pollito, gallina…':'بيضة، كتكوت، دجاجة…',

  /* shadows */
  '¿De quién es esta sombra?':'لمن هذا الظل؟',
  '¡Es la sombra de {x}!':'إنه ظل {x}!',
  'Eso es {x}. Mira bien la forma.':'اخترتَ {x}. انظر جيدًا إلى الشكل.',

  /* feelings (the feelings are adjectives: سعيد، حزين…; the situations are about سامي) */
  'Toca la cara de {f}':'أين الوجه ال{f}؟',
  'Es la cara de {f}.':'هذا هو الوجه ال{f}.',
  'Esa es la cara de {f}. Prueba otra vez.':'هذا هو الوجه ال{f}. حاول مرة أخرى.',
  '{s} ¿Cómo se siente?':'{s} كيف يشعر سامي؟',
  'Siente {f}.':'سامي {f}.',
  'Puede ser, pero piensa otra vez: ¿qué sentirías tú?':'ربما، لكن فكّر مرة أخرى: بماذا كنت ستشعر أنت؟',

  /* what happens next */
  'Piensa qué pasa primero y qué pasa luego.':'فكّر: ماذا يحدث أولًا، وماذا يحدث بعده؟',

  /* puzzle */
  '{n} piezas':v=>count(v.n,PIECE),
  'Hueco':'خانة',
  'Pieza':'قطعة',
  'Toca una pieza y luego toca su sitio en el puzle.':'اضغط على قطعة، ثم اضغط على مكانها في الأحجية.',
  '¡Puzle terminado! ¡Qué bien!':'اكتملت الأحجية! رائع!',
  'Otro puzle':'أحجية أخرى',
  'Ahí no va. Prueba en otro sitio.':'ليس هذا مكانها. جرّب مكانًا آخر.',

  /* animal piano (the song is the tune of Twinkle, Twinkle, Little Star) */
  'Toca las teclas para hacer música.':'اضغط على المفاتيح لتعزف الموسيقى.',
  'Nota':'نغمة',
  '🎵 Estrellita':'🎵 نجمة صغيرة',
  '🔁 Repite conmigo':'🔁 كرّر معي',
  '¡Eres un gran músico!':'أنت موسيقي رائع!',
  '¡Bravo! ¡Eres un gran músico!':'أحسنت! أنت موسيقي رائع!',
  '¡Muy bien! Escucha la siguiente.':'ممتاز! استمع إلى اللحن التالي.',
  '¡Casi! Escucha otra vez.':'اقتربت! استمع مرة أخرى.',
  'Escucha…':'استمع…',
  '¡Ahora tú! Repite las notas.':'دورك الآن! كرّر النغمات.',
  'Estrellita, ¿dónde estás?':'تلألئي يا نجمة صغيرة…',
  '¿La tocas tú? Empieza por el perrito.':'هل تعزفها أنت؟ ابدأ بالجرو.',
  'Escucha y repite.':'استمع ثم كرّر.',

  /* ---------- 51-medianos.js: names on the game doors ---------- */
  'Laberinto':'المتاهة',
  'Lleva al ratón al queso':'أوصل الفأر إلى الجبن',
  'Trazar letras':'كتابة الحروف',
  'Escribe con el dedo':'اكتب بإصبعك',
  'Dominó':'الدومينو',
  '¿Qué ficha encaja?':'أيّ قطعة تناسب؟',
  '¿Qué hora es?':'كم الساعة؟',
  'Aprende el reloj':'تعلّم قراءة الساعة',
  'Monedas':'النقود',
  '¿Cuánto dinero hay?':'كم من النقود هنا؟',
  'Sopa de letras':'البحث عن الكلمات',
  'Encuentra las palabras':'جِد الكلمات المخفية',

  /* dominoes */
  '¿Qué ficha puede ir al lado?':'أيّ قطعة يمكن أن توضع بجانبها؟',
  'Busca una ficha que tenga 1 punto.':'ابحث عن قطعة فيها نقطة واحدة.',
  'Busca una ficha que tenga {n} puntos.':v=>`ابحث عن قطعة فيها ${count(v.n,DOT)}.`,
  '{a} y {b}':'{a} و{b}',
  'Sí, las dos tienen {n}.':v=>`نعم، في القطعتين ${count(v.n,DOT)}.`,
  'Esa ficha no tiene {n}. Cuenta los puntos.':v=>`هذه القطعة ليس فيها ${count(v.n,DOT)}. عُدَّ النقاط.`,

  /* clock */
  'Fíjate: la aguja corta marca la hora y la larga, los minutos.':'انتبه: العقرب القصير يشير إلى الساعة، والعقرب الطويل يشير إلى الدقائق.',

  /* coins */
  '¿Cuánto dinero hay en total?':'كم مجموع النقود؟',
  'Hay {n} en total.':'المجموع {n}.',
  'Suma primero las monedas grandes.':'اجمع القطع النقدية الكبيرة أولًا.',
  'Cuenta las monedas una a una.':'عُدَّ القطع النقدية واحدة واحدة.',

  /* maze */
  'Pequeño':'صغير',
  'Mediano':'متوسط',
  'Grande':'كبير',
  'Arriba':'أعلى',
  'Izquierda':'يسار',
  'Abajo':'أسفل',
  'Derecha':'يمين',
  'Lleva al ratón hasta el queso. Usa las flechas o desliza el dedo.':'ساعد الفأر على الوصول إلى الجبن. استخدم الأسهم أو حرّك إصبعك.',
  '¡Ñam! El ratón ha encontrado el queso.':'لذيذ! وجد الفأر الجبن.',
  'Otro laberinto':'متاهة أخرى',

  /* tracing letters. Arabic has no capitals: the first tab has the letters in alphabetical order,
     the second groups the letters that look alike (ب ت ث ن ي، ج ح خ…). */
  'Mayúsculas':'الحروف',
  'minúsculas':'حروف متشابهة',
  'Números':'الأرقام',
  'el número {n}':'الرقم {n}',
  'la {l}, de {w}':v=>`حرف ${letter(v.l)}، كما في ${v.w}`,
  'la {l}':v=>`حرف ${letter(v.l)}`,
  'Repasa {l} con el dedo.':'مرِّر إصبعك على {l}.',
  'Zona para escribir':'مساحة الكتابة',
  '🔊 Oír':'🔊 استمع',
  'Siguiente ➡️':'التالي ⬅️',
  '¡Qué bien escrita! Toca «Siguiente».':'كتابة رائعة! اضغط «التالي».',
  '¡Muy bien escrita!':'كتابة رائعة جدًا!',
  /* names the same button as the 'Borrar' translation, whatever it is */
  'Intenta seguir la letra gris. Toca «Borrar» para empezar de nuevo.':()=>`حاول أن تتبع الحرف الرمادي. اضغط «${_('Borrar')}» لتبدأ من جديد.`,
  '¡Sigue! Repasa toda la letra.':'استمر! مرِّر إصبعك على الحرف كله.',

  /* word search */
  'Toca la primera letra de una palabra y después la última.':'اضغط على أول حرف في الكلمة، ثم على آخر حرف فيها.',
  '¡Has encontrado todas las palabras!':'وجدتَ كل الكلمات!',
  'Otra sopa':'شبكة أخرى',
  'Busca las palabras escondidas.':'ابحث عن الكلمات المخفية.',
  '¡{w}!':'{w}!',

  /* ---------- 52-mayores.js: names on the game doors ---------- */
  'Sudoku':'سودوكو',
  'Lógica con números':'منطق بالأعداد',
  'Salva la flor':'أنقذ الزهرة',
  'Adivina la palabra':'خمّن الكلمة',
  'Robot':'الروبوت',
  'Prográmalo con flechas':'برمجه بالأسهم',
  'Programa con bucles':'البرمجة بالتكرار',
  'El robot que repite':'الروبوت الذي يكرّر',
  'Fracciones':'الكسور',
  'Partes de una pizza':'أجزاء البيتزا',
  'Continentes':'القارات',
  '¿Dónde está?':'أين يقع؟',

  /* fractions ({f}, {a} and {b} are fractions in words, such as "نصف" or "ثلاثة أرباع") */
  '¿Qué parte de la pizza está pintada?':'ما الجزء الملوّن من البيتزا؟',
  'Es {f}.':'الجزء الملوّن هو {f}.',
  'Cuenta los trozos pintados y los trozos que hay en total.':'عُدَّ القطع الملوّنة، ثم عُدَّ كل القطع.',
  '¿Qué fracción es igual?':'أيّ كسر يساويه؟',
  '{f}. ¿Qué fracción es igual?':'{f}. أيّ كسر يساويه؟',
  '{a} es lo mismo que {b}.':v=>`${v.a} ${DUAL.has(v.a)?'يساويان':'يساوي'} ${ACC[v.b]||v.b}.`,
  'Divide arriba y abajo por el mismo número.':'اقسم البسط والمقام على العدد نفسه.',

  /* continents ("نجد" — we find — keeps the question the same for every name) */
  '¿En qué continente vive {x} en libertad?':'في أيّ قارة نجد {x} في البرية؟',
  '¿En qué continente está {x}?':'في أيّ قارة نجد {x}؟',
  'Está en {c}.':'الجواب: {c}.',
  'No es ahí. Piensa en el mapa del mundo.':'ليس هناك. فكّر في خريطة العالم.',

  /* sudoku */
  'Cada fila, cada columna y cada caja tienen todos los números sin repetir.':'في كل صف وكل عمود وكل مربع توجد كل الأعداد دون تكرار.',
  'Toca una casilla vacía y luego un número.':'اضغط على خانة فارغة، ثم على عدد.',
  '¡Sudoku resuelto! ¡Qué cabeza!':'حللتَ السودوكو! يا لك من ذكي!',
  'Otro sudoku':'سودوكو آخر',

  /* save the flower */
  'Pista: {c}':'تلميح: {c}',
  '💡 Ver dibujo':'💡 أظهر الصورة',
  'Adivina la palabra antes de que la flor pierda todos sus pétalos.':'خمّن الكلمة قبل أن تفقد الزهرة كل بتلاتها.',
  '¡Bien! Has salvado la flor: {w}.':'أحسنت! أنقذتَ الزهرة. الكلمة هي {w}.',
  '¡Oh! La flor se ha quedado sin pétalos. Era «{w}».':'أوه! سقطت كل بتلات الزهرة. كانت الكلمة «{w}».',
  'Otra palabra':'كلمة أخرى',

  /* robot (a block is "قطعة") */
  'Lleva el robot a la batería. Usa «Repetir» para gastar menos bloques.':'أوصل الروبوت إلى البطارية. استخدم «كرّر» لتحتاج إلى قطع أقل.',
  'Lleva el robot hasta la batería. Pon las flechas y pulsa «Adelante».':'أوصل الروبوت إلى البطارية. ضع الأسهم ثم اضغط «انطلق».',
  'Reto {i} de {n} · Máximo {m} bloques':v=>`التحدي ${v.i} من ${v.n} · ${count(v.m,PIECE)} على الأكثر`,
  'Reto libre':'تحدٍّ حر',
  'Programa':'البرنامج',
  '🔁 Repetir':'🔁 كرّر',
  '⤴ Fin':'⤴ نهاية',
  '▶ Adelante':'▶ انطلق',
  'Máximo {m} bloques. Usa «Repetir».':v=>`${count(v.m,PIECE)} على الأكثر. استخدم «كرّر».`,
  'Repetir {n} veces':v=>`كرّر ${count(v.n,TIMES,true)}`,
  'Tu programa aparecerá aquí.':'سيظهر برنامجك هنا.',
  'Bloques: {b} de {m}':'القطع: {b} من {m}',
  'Primero pon algunas flechas.':'ضع بعض الأسهم أولًا.',
  'El robot se ha parado antes de llegar. Cambia el programa.':'توقّف الروبوت قبل أن يصل. غيّر البرنامج.',
  '¡Uy! El robot se ha chocado. Cambia el programa.':'أوه! اصطدم الروبوت. غيّر البرنامج.',
  '¡Conseguido con {b} bloques!':v=>`أحسنت! نجحتَ باستخدام ${count(v.b,PIECE,true)}!`,
  '¡Conseguido en {n} pasos!':v=>`أحسنت! وصلتَ في ${count(v.n,STEP,true)}!`,
  'Siguiente reto':'التحدي التالي',
});

/* ---------- data of 50-peques.js ---------- */
LANGS.ar.data.SHADOWS=[['🚂','القطار'],['🦒','الزرافة'],['🐘','الفيل'],['🦋','الفراشة'],['🐢','السلحفاة'],['🌳','الشجرة']];
/* n is an adjective without the article: "أين الوجه السعيد؟", "سامي سعيد". */
LANGS.ar.data.FEELINGS=[
  {e:'😀',n:'سعيد',tip:'عندما يحدث لنا شيء جميل، نشعر بالسعادة.'},
  {e:'😢',n:'حزين',tip:'عندما نشعر بالحزن، يساعدنا حضن دافئ.'},
  {e:'😠',n:'غاضب',tip:'عندما نغضب، نستطيع أن نتنفّس بعمق ونقول بالكلام ما نشعر به.'},
  {e:'😨',n:'خائف',tip:'عندما نخاف، نستطيع أن نطلب المساعدة من شخص كبير.'},
  {e:'😲',n:'مندهش',tip:'نندهش عندما يحدث شيء لم نكن نتوقّعه.'},
  {e:'😴',n:'نعسان',tip:'عندما نشعر بالنعاس، يطلب منا جسمنا أن نرتاح.'}];
/* Each situation is followed by "كيف يشعر سامي؟"; the second item must be one of the FEELINGS names. */
LANGS.ar.data.SITUATIONS=[
  ['يحصل سامي على حضن كبير.','سعيد'],['يفوز سامي بسباق مع أصدقائه.','سعيد'],['اليوم عيد ميلاد سامي.','سعيد'],
  ['وقع الآيس كريم من سامي على الأرض.','حزين'],['صديق سامي سينتقل ليعيش في مكان بعيد.','حزين'],
  ['أخذ أحدهم لعبة سامي دون أن يستأذن.','غاضب'],['مزّق أحدهم الرسمة التي رسمها سامي.','غاضب'],
  ['هناك عاصفة فيها رعد كثير.','خائف'],['يسمع سامي صوتًا غريبًا في الظلام.','خائف'],
  ['يفتح سامي علبة، فتقفز منها دمية!','مندهش'],['يجد سامي هدية تحت وسادته.','مندهش'],
  ['لعب سامي طوال اليوم، والآن حلّ الليل.','نعسان']];
LANGS.ar.data.NEXT_SEQS=[
  {e:['🥚','🐣','🐔'],t:'يخرج الكتكوت من البيضة، ثم يكبر ويصبح دجاجة.'},
  {e:['🌱','🪴','🌳'],t:'تنبت البذرة، وتكبر وتكبر حتى تصبح شجرة.'},
  {e:['🐛','🦋'],t:'تتحوّل اليرقة إلى فراشة.'},
  {e:['🌧️','🌈'],t:'بعد المطر، يظهر قوس قزح أحيانًا.'},
  {e:['🧦','👟'],t:'نلبس الجوارب أولًا، ثم الحذاء.'},
  {e:['🧼','🍽️'],t:'نغسل أيدينا قبل الأكل.'},
  {e:['🌅','☀️','🌙'],t:'في الصباح تشرق الشمس، وفي الليل نرى القمر.'},
  {e:['👶','🧒','🧑'],t:'يكبر الأطفال الصغار فيصبحون أولادًا، ثم كبارًا.'},
  {e:['🌸','🍏','🍎'],t:'أولًا الزهرة، ثم الثمرة الخضراء، ثم الثمرة الناضجة.'},
  {e:['❄️','⛄','💧'],t:'نصنع رجل الثلج من الثلج، ثم تذيبه الشمس.'},
  {e:['🛏️','🪥','🎒'],t:'نستيقظ، وننظّف أسناننا، ثم نذهب إلى المدرسة.'},
  {e:['🎂','🕯️','🥳'],t:'نضع الشموع على الكعكة، ثم نطفئها، ثم نحتفل!'}];

/* ---------- data of 51-medianos.js ---------- */
/* Buttons: "الساعة 3"، "الساعة 3 والربع"، "الساعة 3 والنصف"، "الساعة 4 إلا ربعًا" (digits, to match the clock face). */
LANGS.ar.data.TIME=(h,m)=>`الساعة `+clock(h,m,String);
/* Said after a right answer: "الساعة الثالثة والنصف." */
LANGS.ar.data.TIME_SAY=(h,m)=>`الساعة `+clock(h,m,x=>HOURS[x])+(m===0?` تمامًا`:``)+`.`;
/* Arabic has no capital letters: "upper" is the alphabet in order (أ ب ت…) and "lower" the same 28 letters
   grouped by shape (ب ت ث ن ي، ج ح خ، د ذ، ر ز و، س ش، ص ض، ط ظ، ع غ، ف ق، ا ك ل م ه); see the tab names above. */
LANGS.ar.data.TRACE={upper:'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',lower:'بتثنيجحخدذرزوسشصضطظعغفقاكلمه'};

/* ---------- data of 52-mayores.js ---------- */
/* The 28 letters, then taa marbuta and alif maqsura. */
LANGS.ar.data.KEYBOARD='ابتثجحخدذرزسشصضطظعغفقكلمنهويةى';
/* No tashkeel and no hamza seats (أ إ آ ؤ ئ ء): every letter must be one of the KEYBOARD keys. */
LANGS.ar.data.HANGMAN=[
  ['حيوانات',[['🐘','فيل'],['🦒','زرافة'],['🐢','سلحفاة'],['🦋','فراشة'],['🐊','تمساح'],['🐧','بطريق'],['🦉','بومة'],['🐬','دلفين'],['🦓','حمار وحشي'],['🐿️','سنجاب'],['🦔','قنفذ'],['🐫','جمل']]],
  ['فواكه وطعام',[['🍎','تفاحة'],['🍌','موزة'],['🍓','فراولة'],['🍉','بطيخ'],['🍊','برتقالة'],['🍅','طماطم'],['🥕','جزر'],['🍞','خبز'],['🧀','جبن'],['🍇','عنب']]],
  ['الفضاء',[['🪐','كوكب'],['⭐','نجمة'],['🚀','صاروخ'],['🌌','مجرة'],['☄️','مذنب'],['🛰️','قمر صناعي'],['🌙','قمر'],['☀️','شمس']]],
  ['الطبيعة',[['⛰️','جبل'],['🌋','بركان'],['🏞️','نهر'],['🌲','غابة'],['🌈','قوس قزح'],['⛈️','عاصفة'],['🌳','شجرة'],['🌊','موجة'],['🌻','عباد الشمس']]],
  ['في البيت',[['🛏️','سرير'],['🪑','كرسي'],['🚪','باب'],['🪟','نافذة'],['🧸','دبدوب'],['📚','كتاب'],['🥄','ملعقة'],['🛁','حوض استحمام']]]];
/* Fraction in words: 3/4 → "ثلاثة أرباع", 1/2 → "نصف", 2/3 → "ثُلثان". */
LANGS.ar.data.FRACTION=(k,n)=>frac(k,n);
/* The seven continents as they are taught in most Arab schools (North and South America are separate).
   kind stays 'vive' (an animal that lives there in the wild) or 'está' (a place); the number is the continent. */
LANGS.ar.data.WORLD={continents:['أمريكا الشمالية','أمريكا الجنوبية','أوروبا','آسيا','أفريقيا','أوقيانوسيا','القارة القطبية الجنوبية'],items:[
  ['🦘','vive','الكنغر',5],['🐨','vive','الكوالا',5],['🐼','vive','الباندا العملاقة',3],['🦒','vive','الزرافة',4],['🦓','vive','الحمار الوحشي',4],
  ['🐍','vive','الأناكوندا الخضراء',1],['🐧','vive','البطريق الإمبراطور',6],['🦅','vive','كوندور الأنديز',1],['🦍','vive','الغوريلا',4],
  ['🗽','está','تمثال الحرية',0],['🗼','está','برج إيفل',2],['🔺','está','هرم الجيزة الأكبر',4],['🗻','está','جبل فوجي',3],
  ['🏟️','está','الكولوسيوم في روما',2],['🏔️','está','جبل إيفرست',3],['🌳','está','غابات الأمازون',1],['🏜️','está','الصحراء الكبرى',4],
  ['⛪','está','كنيسة ساغرادا فاميليا في برشلونة',2],['🕌','está','تاج محل',3],['🌉','está','جسر البوابة الذهبية',0],['🪸','está','الحاجز المرجاني العظيم',5],['🧊','está','أكبر غطاء جليدي في العالم',6],
  ['🕌','está','مسجد الحسن الثاني في الدار البيضاء',4],['🏙️','está','برج خليفة في دبي',3]]};
})();
