/* ---------- datos en español ----------
   Todo lo que está en DATA.es se puede traducir: cada idioma trae su propia versión en src/idiomas/<código>.js.
   Los emojis, colores y dibujos se dejan igual; solo cambian las palabras. */
DATA.es={};
DATA.es.COLORS=[
  {n:'rojo',c:'var(--red)'},{n:'azul',c:'var(--blue)'},{n:'amarillo',c:'var(--yellow)'},
  {n:'verde',c:'var(--green)'},{n:'morado',c:'var(--purple)'},{n:'naranja',c:'var(--orange)'},{n:'rosa',c:'var(--pink)'}];
DATA.es.ANIMALS=[
  {e:'🐮',n:'la vaca',s:'muuu'},{e:'🐶',n:'el perro',s:'guau guau'},{e:'🐱',n:'el gato',s:'miau'},
  {e:'🐷',n:'el cerdito',s:'oinc oinc'},{e:'🐑',n:'la oveja',s:'beee'},{e:'🦆',n:'el pato',s:'cua cua'},
  {e:'🐸',n:'la rana',s:'croac croac'},{e:'🦁',n:'el león',s:'grrr'},{e:'🐔',n:'la gallina',s:'co co co'},
  {e:'🐴',n:'el caballo',s:'iiiii'},{e:'🐝',n:'la abeja',s:'bzzz'},{e:'🐍',n:'la serpiente',s:'ssss'}];
const FRUITS=['🍎','🍌','🍓','🍊','🍐','🍉','🍒','🥕'];
DATA.es.SHAPES=[
  {n:'el círculo',svg:'<circle cx="50" cy="50" r="42"/>'},
  {n:'el cuadrado',svg:'<rect x="10" y="10" width="80" height="80" rx="6"/>'},
  {n:'el triángulo',svg:'<polygon points="50,8 94,90 6,90"/>'},
  {n:'la estrella',svg:'<polygon points="50,5 61,38 96,38 68,59 79,93 50,72 21,93 32,59 4,38 39,38"/>'},
  {n:'el corazón',svg:'<path d="M50 88C20 65 5 48 5 30 5 15 17 5 30 5c10 0 17 6 20 13 3-7 10-13 20-13 13 0 25 10 25 25 0 18-15 35-45 58z"/>'},
  {n:'el rectángulo',svg:'<rect x="4" y="26" width="92" height="48" rx="6"/>'}];
const SHAPE_FILLS=['#E8483B','#2F7FE0','#F6C431','#3DB46D','#8B5BD6','#F28A2E','#E25E9C'];
DATA.es.WORDS=[
  ['🐱','gato'],['🍎','manzana'],['🐘','elefante'],['☀️','sol'],['🌙','luna'],['🦆','pato'],['🐻','oso'],['🍇','uvas'],
  ['🐭','ratón'],['🌳','árbol'],['🐝','abeja'],['🐢','tortuga'],['🦋','mariposa'],['⭐','estrella'],['🏠','casa'],
  ['🐍','serpiente'],['🦉','búho'],['🍉','sandía'],['🧀','queso'],['🐄','vaca'],['🌹','rosa'],['🦊','zorro'],
  ['🍋','limón'],['🥕','zanahoria'],['🎈','globo'],['👑','corona'],['🐴','caballo'],['🦁','león'],['🐯','tigre'],
  ['🐸','rana'],['🍦','helado'],['🐟','pez'],['🌻','girasol'],['🚂','tren'],['🥚','huevo'],['🦒','jirafa'],['👓','gafas'],['🪑','silla']];
DATA.es.LETTERS='ABCDEFGHIJLMNOPQRSTUVZ'.split('');
DATA.es.SPELL=[
  ['🚲','bicicleta','vicicleta'],['🥚','huevo','uevo'],['🔑','llave','yave'],['👟','zapato','sapato'],['🦒','jirafa','girafa'],
  ['🐜','hormiga','ormiga'],['🪟','ventana','bentana'],['🐴','caballo','cabayo'],['🍒','cereza','zereza'],['🌳','árbol','árvol'],
  ['🐝','abeja','aveja'],['☁️','nube','nuve'],['🌧️','lluvia','yuvia'],['🧀','queso','keso'],['🎸','guitarra','gitarra'],
  ['🥕','zanahoria','sanahoria'],['🍃','hoja','oja'],['👄','boca','voca'],['🥛','vaso','baso'],['🦉','búho','búo'],
  ['🦓','cebra','zebra'],['🍦','helado','elado'],['🐑','oveja','obeja'],['💡','bombilla','bonbilla'],['🦌','ciervo','sierbo'],
  ['🐺','lobo','lovo'],['🏖️','playa','plalla'],['🐐','cabra','cavra'],['🐧','pingüino','pinguino'],['🦈','tiburón','tivurón']];
DATA.es.CAPITALS=[
  ['España','Madrid'],['México','Ciudad de México'],['Argentina','Buenos Aires'],['Colombia','Bogotá'],['Perú','Lima'],
  ['Chile','Santiago'],['Venezuela','Caracas'],['Ecuador','Quito'],['Uruguay','Montevideo'],['Paraguay','Asunción'],
  ['Cuba','La Habana'],['Costa Rica','San José'],['Honduras','Tegucigalpa'],['Nicaragua','Managua'],['El Salvador','San Salvador'],
  ['República Dominicana','Santo Domingo'],['Francia','París'],['Italia','Roma'],['Portugal','Lisboa'],['Alemania','Berlín'],
  ['Japón','Tokio'],['Brasil','Brasilia'],['Reino Unido','Londres'],['Egipto','El Cairo'],['Canadá','Ottawa'],['Australia','Canberra']];
DATA.es.CLASSES=['mamífero','ave','pez','reptil','insecto'];
DATA.es.CREATURES=[
  ['🐬','el delfín','mamífero'],['🦇','el murciélago','mamífero'],['🐳','la ballena','mamífero'],['🐘','el elefante','mamífero'],['🐒','el mono','mamífero'],
  ['🐧','el pingüino','ave'],['🦉','el búho','ave'],['🦅','el águila','ave'],['🦩','el flamenco','ave'],['🦜','el loro','ave'],
  ['🦈','el tiburón','pez'],['🐠','el pez payaso','pez'],['🐡','el pez globo','pez'],
  ['🐢','la tortuga','reptil'],['🐍','la serpiente','reptil'],['🐊','el cocodrilo','reptil'],['🦎','la lagartija','reptil'],
  ['🦋','la mariposa','insecto'],['🐝','la abeja','insecto'],['🐜','la hormiga','insecto'],['🐞','la mariquita','insecto']];
DATA.es.NUMWORDS=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'];

/* helpers para opciones numéricas */
function numOpts(ans,n,lo,hi,near=[1,-1,2,-2,3]){
  const s=new Set([ans]);for(const d of shuffle(near)){if(s.size>=n)break;const v=ans+d;if(v>=lo&&v<=hi)s.add(v);}
  while(s.size<n){s.add(range(lo,hi));}
  return shuffle([...s]).map(v=>({html:String(v),v:String(v),cls:'num'}));
}
const word=t=>({html:t,v:t,cls:'word'});

/* ---------- datos nuevos ---------- */
DATA.es.SKY=[['☀️','el sol'],['🌙','la luna'],['⭐','la estrella'],['☁️','la nube'],['🚀','el cohete'],['🪐','el planeta'],['🌈','el arcoíris'],['✈️','el avión']];
DATA.es.GROUPS=[
  {n:'frutas',items:['🍎','🍌','🍇','🍓','🍐','🍒','🍉']},{n:'animales',items:['🐶','🐱','🐮','🐷','🐴','🐑','🐸']},
  {n:'vehículos',items:['🚗','🚌','🚲','🚂','✈️','🚀','🚜']},{n:'ropa',items:['👕','👖','👗','🧦','🧢','👟','🧤']},
  {n:'instrumentos',items:['🎸','🥁','🎺','🎻','🎹','🪇']}];
DATA.es.HABITATS=[['🌊','el mar'],['🚜','la granja'],['🌴','la selva'],['❄️','el polo']];
DATA.es.HABITANTS=[['🐙','el pulpo','el mar'],['🐠','el pez payaso','el mar'],['🐬','el delfín','el mar'],['🦀','el cangrejo','el mar'],
  ['🐄','la vaca','la granja'],['🐔','la gallina','la granja'],['🐷','el cerdo','la granja'],['🐑','la oveja','la granja'],
  ['🐒','el mono','la selva'],['🦜','el loro','la selva'],['🐅','el tigre','la selva'],['🦍','el gorila','la selva'],
  ['🐧','el pingüino','el polo'],['🐻‍❄️','el oso polar','el polo'],['🦭','la foca','el polo']];
DATA.es.SPACE_QA=[
  ['🪐','¿Cuál es el planeta más grande?','Júpiter',['Marte','La Tierra','Mercurio']],
  ['☀️','¿Qué planeta está más cerca del Sol?','Mercurio',['Venus','Marte','Neptuno']],
  ['🔴','¿Cuál es el planeta rojo?','Marte',['Venus','Saturno','Urano']],
  ['💍','¿Qué planeta tiene unos anillos muy famosos?','Saturno',['Marte','Mercurio','Venus']],
  ['🌍','¿En qué planeta vivimos?','La Tierra',['Marte','Júpiter','Venus']],
  ['☀️','¿Qué es el Sol?','Una estrella',['Un planeta','Una luna','Un cometa']],
  ['🔢','¿Cuántos planetas tiene el sistema solar?','8',['7','9','10']],
  ['🌙','¿Qué gira alrededor de la Tierra?','La Luna',['El Sol','Marte','Saturno']],
  ['👨‍🚀','¿Quién fue la primera persona en pisar la Luna?','Neil Armstrong',['Cristóbal Colón','Albert Einstein','Isaac Newton']],
  ['🌌','¿Cómo se llama nuestra galaxia?','La Vía Láctea',['Andrómeda','La Osa Mayor','Orión']],
  ['🗓️','¿Cuánto tarda la Tierra en dar una vuelta al Sol?','Un año',['Un día','Un mes','Una semana']],
  ['🌗','¿Cuánto tarda la Tierra en girar sobre sí misma?','Un día',['Un año','Una hora','Un mes']],
  ['🔥','¿Cuál es el planeta más caliente?','Venus',['Mercurio','Marte','Júpiter']],
  ['🚀','¿Cómo se llama a las personas que viajan al espacio?','Astronautas',['Pilotos','Marineros','Buzos']]];
DATA.es.NATURE_QA=[
  ['🌱','¿Qué necesitan las plantas para crecer?','Luz, agua y aire',['Solo arena','Oscuridad','Chocolate']],
  ['🐝','¿Qué toman las abejas de las flores?','Néctar',['Hojas','Semillas de pino','Agua salada']],
  ['🌳','¿Qué gas sueltan las plantas que necesitamos para respirar?','Oxígeno',['Humo','Helio','Gas de cocina']],
  ['🐛','¿En qué se convierte una oruga?','Mariposa',['Abeja','Escarabajo','Hormiga']],
  ['🐸','¿En qué se convierte un renacuajo?','Rana',['Pez','Tortuga','Lagartija']],
  ['🍂','¿En qué estación se caen las hojas de muchos árboles?','Otoño',['Primavera','Verano','Ninguna']],
  ['🥕','¿Qué parte de la planta está bajo la tierra?','La raíz',['La flor','La hoja','El fruto']],
  ['🌊','¿Cómo es el agua del mar?','Salada',['Dulce','Picante','Amarga']],
  ['🧊','Cuando el agua se congela se convierte en…','Hielo',['Vapor','Nube','Arena']],
  ['🐋','¿Cuál es el animal más grande del mundo?','La ballena azul',['El elefante','La jirafa','El tiburón blanco']],
  ['🕷️','¿Cuántas patas tiene una araña?','8',['6','4','10']],
  ['🐜','¿Cuántas patas tiene un insecto?','6',['8','4','10']],
  ['🌧️','¿De dónde cae la lluvia?','De las nubes',['De los árboles','De las montañas','Del Sol']],
  ['🌸','¿En qué estación florecen muchas plantas?','Primavera',['Invierno','Otoño','Ninguna']],
  ['♻️','¿Qué podemos hacer para cuidar el planeta?','Reciclar y no tirar basura',['Dejar los grifos abiertos','Tirar plástico al mar','Cortar todos los árboles']]];
DATA.es.STICKER_NAMES={'🐶':'perro','🐱':'gato','🐭':'ratón','🐹':'hámster','🐰':'conejo','🦊':'zorro','🐻':'oso','🐼':'panda','🐨':'koala','🐯':'tigre',
  '🦁':'león','🐮':'vaca','🐷':'cerdito','🐸':'rana','🐵':'mono','🐔':'gallina','🐧':'pingüino','🐦':'pájaro','🦆':'pato','🦉':'búho',
  '🦄':'unicornio','🐝':'abeja','🦋':'mariposa','🐞':'mariquita','🐢':'tortuga','🐙':'pulpo','🐠':'pez','🐬':'delfín','🐳':'ballena','🦀':'cangrejo',
  '🦒':'jirafa','🐘':'elefante','🍎':'manzana','🍌':'plátano','🍓':'fresa','🍉':'sandía','🍒':'cerezas','🍦':'helado','🍪':'galleta','🧁':'magdalena',
  '🚀':'cohete','🛸':'platillo volante','🪐':'planeta','🌙':'luna','⭐':'estrella','☀️':'sol','🌈':'arcoíris','⛄':'muñeco de nieve','🚂':'tren','🚒':'camión de bomberos',
  '🚜':'tractor','⛵':'barco de vela','🎈':'globo','🎨':'pinturas','🎸':'guitarra','⚽':'pelota','🏆':'copa','👑':'corona','💎':'diamante','🧸':'osito de peluche'};
const lastQ={};
/* Pregunta de un banco [emoji, pregunta, respuesta, [otras opciones]]. */
function qa(bank,key){
  let i;do{i=rnd(bank.length);}while(i===lastQ[key]&&bank.length>1);lastQ[key]=i;
  const [e,q,a,w]=bank[i];
  return {prompt:q,speak:q,answer:a,visual:`<span>${e}</span>`,opts:shuffle([a,...w]).map(word),right:_('La respuesta es: {a}.',{a}),wrong:()=>_('No es esa. Prueba otra vez.')};
}

