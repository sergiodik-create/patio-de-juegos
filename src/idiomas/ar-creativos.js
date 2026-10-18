/* العربية: juegos creativos (30-creativos.js) y juegos de mesa (40-mesa.js). */
Object.assign(LANGS.ar.t,{
  /* ----- nombres y descripciones de los juegos ----- */
  'Globos':'البالونات',
  'Explota los globos':'هيا نفرقع البالونات',
  'Parejas':'الصور المتشابهة',
  'Encuentra las iguales':'ابحث عن الصور المتطابقة',
  'Construir':'البناء',
  'Haz una torre':'اصنع برجًا',
  'Colorear':'التلوين',
  'Pinta con los dedos':'لوِّن بإصبعك',
  'Diseña tu mundo':'صمِّم عالمك',
  'Espacio, mar, bosque…':'الفضاء، البحر، الغابة…',
  'Inventa un cuento':'اخترع قصة',
  'Imagina y sueña':'تخيَّل واحلم',
  'Memoria':'الذاكرة',
  'Seis parejas':'ستة أزواج',
  'Memoria experta':'ذاكرة الخبراء',
  'Ocho parejas':'ثمانية أزواج',
  'Adivina el número':'خمِّن الرقم',
  'Del 1 al 100':'من 1 إلى 100',
  'Tres en raya':'إكس-أو',
  'Contra la máquina o en pareja':'ضد الحاسوب أو مع صديق',
  'Conecta 4':'أربعة في صف',
  'Cuatro en línea':'أربع قطع في خط واحد',
  'Damas':'الداما',
  'Salta y corona':'اقفز واربح التاج',
  'Ajedrez':'الشطرنج',
  'Aprende y juega':'تعلَّم والعب',

  /* ----- colorear ----- */
  'Colorea {x}':'لوِّن {x}',
  'Borrar':'امسح',
  'Otro dibujo ➜':'رسمة أخرى ➜',
  'Elige un color y toca el dibujo':'اختر لونًا، ثم اضغط على الرسمة',

  /* ----- construir una torre ----- */
  'Toca un color para poner un bloque':'اضغط على لون لتضع مكعبًا',
  '¡Derribar!':'أسقِط البرج!',
  'Vamos a construir una torre. Toca un color.':'هيا نبني برجًا. اضغط على لون.',
  'Bloques: {n}':'المكعبات: {n}',
  '¡Qué torre tan alta! ¡Vamos a derribarla!':'يا له من برج عالٍ! هيا نُسقطه!',

  /* ----- diseña tu mundo ----- */
  'Espacio':'الفضاء',
  'Mar':'البحر',
  'Bosque':'الغابة',
  'Granja':'المزرعة',
  'Ciudad':'المدينة',
  '📒 Mis pegatinas':'📒 ملصقاتي',
  'Borrar todo':'امسح الكل',
  'Toca los dibujos para ponerlos en tu mundo. Para moverlos, arrástralos o tócalos y luego toca el sitio nuevo.':
    'اضغط على الرسومات لتضعها في عالمك. ولتحريك رسمة، اسحبها، أو اضغط عليها ثم اضغط على مكانها الجديد.',

  /* ----- inventa un cuento ----- */
  'Escuchar otra vez':'استمع مرة أخرى',
  'Otro cuento ➜':'قصة أخرى ➜',

  /* ----- memoria ----- */
  'Encuentra las parejas':'ابحث عن الصور المتشابهة',
  'Carta':'بطاقة',
  'Encuentra las parejas iguales':'ابحث عن كل صورتين متشابهتين',
  '¡Las encontraste todas!':'وجدتها كلها!',
  'Otra vez':'مرة أخرى',
  '¡Pareja!':'وجدت زوجًا!',
  '¡Muy bien!':'أحسنت!',
  '¡Iguales!':'متشابهتان!',

  /* ----- globos (el color va detrás y en masculino: «بالون أحمر») ----- */
  'Globos: {n}':'البالونات: {n}',
  '¡Explota los globos!':'هيا نفرقع البالونات!',
  'globo {c}':'بالون {c}',

  /* ----- adivina el número ----- */
  'Pienso un número del 1 al 100':'أفكر في رقم من 1 إلى 100',
  'Probar':'جرِّب',
  'Pienso un número del 1 al 100. ¿Cuál es?':'أفكر في رقم من 1 إلى 100. ما هو؟',
  'Escribe un número del 1 al 100':'اكتب رقمًا من 1 إلى 100',
  /* 1 «من أول محاولة», 2 «في محاولتين», 3 a 10 «في 5 محاولات», 11 o más «في 12 محاولة» */
  '¡Era el {n}! Lo lograste en {t} intento.':v=>{const t=+v.t,m=t%100;
    return `كان الرقم ${v.n}! عرفته ${t===1?'من أول محاولة!':t===2?'في محاولتين.':m>=3&&m<=10?`في ${t} محاولات.`:`في ${t} محاولة.`}`;},
  '¡Era el {n}! Lo lograste en {t} intentos.':v=>{const t=+v.t,m=t%100;
    return `كان الرقم ${v.n}! عرفته ${t===1?'من أول محاولة!':t===2?'في محاولتين.':m>=3&&m<=10?`في ${t} محاولات.`:`في ${t} محاولة.`}`;},
  'Jugar otra vez':'العب مرة أخرى',
  'Es mayor que {v}':'رقمي أكبر من {v}',
  'Es menor que {v}':'رقمي أصغر من {v}',

  /* ----- juegos de mesa: controles comunes ----- */
  '🤖 Contra la máquina':'🤖 ضد الحاسوب',
  '👫 Dos jugadores':'👫 لاعبان',
  '↻ Nueva partida':'↻ جولة جديدة',
  'Fácil':'سهل',
  'Normal':'عادي',
  'Difícil':'صعب',
  '¡Has ganado!':'لقد فزت!',
  'Gana la máquina. ¡Otra!':'فاز الحاسوب. لنلعب مرة أخرى!',
  'La máquina piensa…':'الحاسوب يفكر…',
  'Te toca':'دورك',
  'Empate':'تعادل',

  /* ----- tres en raya: la X es «الإكس» y la O «الدائرة» ----- */
  'Tú eres la X. ¡Empiezas!':'أنت تلعب بالإكس. ابدأ!',
  'Le toca a la X':'دور الإكس',
  'Le toca a la O':'دور الدائرة',
  'Tú eres la equis. Empiezas tú.':'أنت تلعب بالإكس. ابدأ أنت.',
  'Empieza la equis':'يبدأ الإكس.',
  'Casilla':'خانة',
  '¡Gana la X!':'فاز الإكس!',
  '¡Gana la O!':'فازت الدائرة!',
  'Empate. ¡Muy bien jugado!':'تعادل! لعب رائع!',

  /* ----- conecta 4 ----- */
  'Tú tienes las rojas. ¡Empiezas!':'أنت تلعب بالقطع الحمراء. ابدأ!',
  'Empiezan las rojas':'يبدأ الأحمر',
  'Junta cuatro fichas en línea':'اجمع أربع قطع في خط واحد',
  'Columna':'العمود',
  '¡Ganan las rojas!':'فاز الأحمر!',
  '¡Ganan las amarillas!':'فاز الأصفر!',
  'Les toca a las rojas':'دور الأحمر',
  'Les toca a las amarillas':'دور الأصفر',

  /* ----- damas (y blancas y negras del ajedrez) ----- */
  'Tú llevas las blancas. ¡Empiezas!':'أنت تلعب بالقطع البيضاء. ابدأ!',
  'Empiezan las blancas':'يبدأ الأبيض.',
  'Si puedes comer, tienes que hacerlo. Llega al otro lado para coronar una dama 👑.':
    'إذا استطعت أن تأكل قطعة، فعليك أن تأكلها. اعبر إلى الجهة الأخرى لتصبح قطعتك ملكًا 👑.',
  'casilla':'خانة',
  '¡Tienes que comer!':'عليك أن تأكل قطعة!',
  'Esa ficha no se puede mover':'هذه القطعة لا تستطيع أن تتحرك',
  '¡Dama!':'صارت ملكًا!',
  '¡Sigue comiendo!':'كُلْ قطعة أخرى!',
  '¡Ganan las blancas!':'فاز الأبيض!',
  '¡Ganan las negras!':'فاز الأسود!',
  'Les toca a las blancas':'دور الأبيض',
  'Les toca a las negras':'دور الأسود',

  /* ----- ajedrez ----- */
  'Toca una pieza para ver adónde puede moverse.':'اضغط على قطعة لترى أين يمكنها أن تتحرك.',
  /* {p} es un nombre de CHESS.names, como «الحصان»: «الحصان الأبيض», «القلعة البيضاء».
     (El ajedrez en árabe usa CHESS.label, más abajo; estas quedan de reserva.) */
  '{p} blanco':v=>v.p+(/ة$/.test(v.p)?' البيضاء':' الأبيض'),
  '{p} negro':v=>v.p+(/ة$/.test(v.p)?' السوداء':' الأسود'),
  'casilla vacía':'خانة فارغة',
  'Esa pieza es del otro equipo':'هذه القطعة من الفريق الآخر',
  'Ahí no puede ir':'لا يمكنها الذهاب إلى هناك',
  '¡Jaque mate! ¡Has ganado!':'كش مات! لقد فزت!',
  'Jaque mate. Gana la máquina.':'كش مات. فاز الحاسوب.',
  '¡Jaque mate! Ganan las blancas.':'كش مات! فاز الأبيض.',
  '¡Jaque mate! Ganan las negras.':'كش مات! فاز الأسود.',
  'Tablas: no quedan movimientos.':'تعادل: لا توجد حركات أخرى.',
  'Tablas: solo quedan los reyes.':'تعادل: لم يبقَ إلا الملكان.',
  '¡Jaque!':'كش ملك!',
});

/* Colores de la paleta (en masculino) y nombres de los dibujos para colorear (con «ال»: «لوِّن البيت»), en el mismo orden que en español. */
LANGS.ar.data.PAINT_NAMES=['أحمر','برتقالي','أصفر','أخضر','أزرق','بنفسجي','وردي','بني','أسود','أبيض'];
LANGS.ar.data.DRAWING_NAMES=['البيت','الزهرة','الصاروخ','السمكة','السيارة','القطة'];

/* Inventa un cuento. heroes: [emoji, sin artículo, con «ال»]; places responden a «¿Dónde vive?» (llevan su «في»);
   objects: [emoji, sin artículo]. tell() hace la concordancia: el verbo va en femenino si el héroe o el objeto lo son
   (la palabra acaba en «ة»), y en dual («سافرا / سافرتا») cuando los dos viajan juntos. */
LANGS.ar.data.STORY={
  ask:['مَن بطل قصتنا؟','أين يعيش بطلنا؟','ماذا يجد بطلنا؟'],
  heroes:[['🐉','تنين','التنين'],['🧚','جنية','الجنية'],['🤖','روبوت','الروبوت'],['🦄','يونيكورن','اليونيكورن'],['🐢','سلحفاة','السلحفاة'],['🐻','دب صغير','الدب الصغير']],
  places:[['🌌','في الفضاء'],['🌊','في أعماق البحر'],['🏰','في قصر فوق الغيوم'],['🌳','في غابة مسحورة'],['🏝️','في جزيرة من الحلوى']],
  objects:[['⭐','نجمة سحرية'],['🎈','بالون عملاق'],['🗝️','مفتاح ذهبي'],['🍪','بسكويتة تتكلم'],['🎨','فرشاة ترسم الأحلام']],
  tell(h,p,o){const [,hi,hd]=h,[,pl]=p,[,ob]=o;
    const fem=s=>/ة$/.test(s.split(' ')[0]),f=fem(hi),fo=fem(ob),du=f&&fo?'تا':'ا';
    /* el objeto con «ال»: «نجمة سحرية» → «النجمة السحرية»; si detrás va un verbo en presente (empieza por ت o ي),
       se añade «التي/الذي»: «بسكويتة تتكلم» → «البسكويتة التي تتكلم» */
    const [w1,w2='',...rest]=ob.split(' '),
      the=/^[تي]/.test(w2)?['ال'+w1,fo?'التي':'الذي',w2,...rest].join(' '):ob.split(' ').map(w=>'ال'+w).join(' ');
    return [
      `كان يا ما كان، في قديم الزمان، ${f?'عاشت':'عاش'} ${hi} ${pl}.`,
      pick([`وفي صباح أحد الأيام، بينما ${f?'كانت':'كان'} ${hd} ${f?'تلعب':'يلعب'}، ${f?'عثرت':'عثر'} على ${ob}.`,
        `وفي يوم هادئ جدًّا، ${fo?'ظهرت':'ظهر'} ${ob} فجأة أمام ${hd}.`]),
      pick([`${fo?'كانت':'كان'} ${the} ${fo?'تلمع':'يلمع'} بقوة، حتى امتلأ كل ما ${fo?'حولها':'حوله'} بالألوان الزاهية.`,
        `وفجأة، ${fo?'بدأت':'بدأ'} ${the} ${fo?'تقفز وتغني':'يقفز ويغني'} أغنية مضحكة جدًّا.`,
        `وعندما ${f?'لمست':'لمس'}${fo?'ها':'ه'} ${hd}، ${f?'شعرت':'شعر'} بدغدغة سحرية في ${f?'بطنها':'بطنه'}.`]),
      pick([`ثم سافر${du} معًا إلى أعلى مكان في السماء، حيث للغيوم طعم غزل البنات.`,
        `وفي الطريق، تعرَّف${du} على أصدقاء جدد كثيرين يريدون اللعب.`,
        `ثم وجد${du} كنزًا مخبَّأً مليئًا بالضحكات والأحضان.`,
        `ثم ساعد${du} عصفورًا صغيرًا تائهًا على العودة إلى عائلته.`]),
      pick([`وفي نهاية اليوم، ${f?'عادت':'عاد'} ${hd} إلى البيت، ${f?'وأغمضت عينيها، وحلمت':'وأغمض عينيه، وحلم'} بمغامرات جديدة. النهاية.`,
        `ومنذ ذلك اليوم، ${f?'صارت':'صار'} ${hd} ${f?'تعرف':'يعرف'} أن الأحلام تتحقق عندما نتشاركها. النهاية.`])];}
};

/* Ajedrez: nombres de las piezas (se dicen al tocar una pieza), consejos para aprender a moverlas,
   la palabra del empate y label(), que hace concordar el color con la pieza: «القلعة البيضاء», «الملك الأسود». */
LANGS.ar.data.CHESS={names:{p:'الجندي',n:'الحصان',b:'الفيل',r:'القلعة',q:'الوزير',k:'الملك'},
  tips:{p:'يتقدم الجندي خانة واحدة إلى الأمام، أو خانتين في أول حركة له، ويأكل القطع بشكل مائل.',
  n:'يقفز الحصان على شكل زاوية: خانتين في اتجاه، ثم خانة واحدة إلى الجانب. ويستطيع أن يقفز فوق القطع الأخرى.',
  b:'يتحرك الفيل في خط مائل، بقدر ما يريد من الخانات.',
  r:'تتحرك القلعة في خط مستقيم: إلى الأعلى أو إلى الأسفل أو إلى اليمين أو إلى اليسار.',
  q:'الوزير أقوى قطعة: يتحرك مثل القلعة ومثل الفيل.',
  k:'يتحرك الملك خانة واحدة في أي اتجاه. يجب أن تحميه جيدًا!'},
  draw:'تعادل',
  label:(t,white)=>{const n=LANGS.ar.data.CHESS.names[t],f=/ة$/.test(n);return n+' '+(white?(f?'البيضاء':'الأبيض'):(f?'السوداء':'الأسود'));}};
