/* Juegos para 11 y 12 años: acertijos, mecanografía, ciencia, historia y dinero. */
GAMES.push(
 {id:'acertijos',age:'x',pic:'🕵️',name:'Acertijos',what:'Piensa antes de contestar',bg:'var(--purple)',needs:['RIDDLES','DAYS'],gen(){
   if(Math.random()<.25){const d=D.DAYS,i=rnd(7),n=range(2,25),fwd=Math.random()<.6,ans=d[((fwd?i+n:i-n)%7+7)%7];
     const q=fwd?_('Si hoy es {d}, ¿qué día será dentro de {n} días?',{d:d[i],n}):_('Si hoy es {d}, ¿qué día fue hace {n} días?',{d:d[i],n});
     return {prompt:q,speak:q,answer:ans,visual:'<span>📅</span>',opts:shuffle([ans,...sample(d.filter(x=>x!==ans),3)]).map(word),
       right:_('Cada 7 días se repite el mismo día de la semana. {n} días son {w} semanas y {r} días más.',{n,w:Math.floor(n/7),r:n%7}),wrong:()=>_('Pista: quita semanas enteras de 7 días.')};}
   let i;do{i=rnd(D.RIDDLES.length);}while(i===lastQ.acertijos&&D.RIDDLES.length>1);lastQ.acertijos=i;
   const [e,q,a,w,why]=D.RIDDLES[i];
   return {prompt:q,speak:q,answer:a,visual:`<span>${e}</span>`,opts:shuffle([a,...w]).map(word),right:why,wrong:()=>_('Léelo otra vez con calma: a veces la trampa está en las palabras.')};}},
 {id:'teclado',age:'gx',pic:'⌨️',name:'Mecanografía',what:'Escribe rápido y bien',bg:'var(--ink)',custom:'teclado',needs:['TYPING']},
 {id:'ciencia',age:'x',pic:'🔬',name:'Ciencia',what:'Cuerpo, materia y energía',bg:'var(--green)',needs:['SCIENCE_QA'],gen(){return qa(D.SCIENCE_QA,'ciencia');}},
 {id:'historia',age:'x',pic:'🏛️',name:'Historia',what:'¿Qué pasó antes?',bg:'var(--orange)',levels:2,needs:['HISTORY','YEAR'],gen(l=0){
   const k=l?3:2;let ev;do{ev=sample(D.HISTORY,k);}while(ev.some((a,i)=>ev.some((b,j)=>i!==j&&Math.abs(a[2]-b[2])<40)));
   const first=ev.reduce((a,b)=>a[2]<b[2]?a:b),sorted=ev.slice().sort((a,b)=>a[2]-b[2]);
   return {prompt:_('¿Qué pasó primero?'),speak:_('¿Qué pasó primero?'),answer:first[1],visual:ev.map(x=>`<span>${x[0]}</span>`).join(''),
     opts:ev.map(x=>({html:esc(x[1]),v:x[1],cls:'word'})),
     right:sorted.map(x=>_('{e}: {y}.',{e:x[1],y:D.YEAR(x[2],x[3])})).join(' '),wrong:()=>_('Piensa: ¿había electricidad, imprenta o coches en esa época?')};}},
 {id:'dinero',age:'x',pic:'💰',name:'Dinero y ahorro',what:'Ahorra, compara y decide',bg:'var(--yellow)',levels:3,needs:['NEEDS','MONEY'],gen(l=0){
   const M=D.MONEY,kinds=[['ahorro','deseo'],['ahorro','deseo','descuento','vuelta'],['descuento','vuelta','comparar','ahorro']][l],kind=pick(kinds);
   if(kind==='deseo'){const [e,x,need]=pick(D.NEEDS),ans=need?_('Necesidad'):_('Capricho');
     return {prompt:_('¿{x} es una necesidad o un capricho?',{x:cap(x)}),speak:_('¿{x} es una necesidad o un capricho?',{x}),answer:ans,visual:`<span>${e}</span>`,
       opts:[word(_('Necesidad')),word(_('Capricho'))],right:need?_('Es una necesidad: la necesitamos para vivir bien.'):_('Es un capricho: está bien tenerlo a veces, pero podemos vivir sin él.'),
       wrong:()=>_('Piensa: ¿podríamos vivir sin ello?')};}
   if(kind==='ahorro'){const s=pick([2,3,4,5,10]),w=range(4,15),p=s*w,q=_('Quieres algo que cuesta {p}. Ahorras {s} cada semana. ¿Cuántas semanas necesitas?',{p:M(p),s:M(s)});
     return {prompt:q,speak:q,answer:String(w),visual:'<span>🐷</span>',opts:numOpts(w,4,1,40,[1,-1,2,-2,s]),right:_('{p} entre {s} son {w} semanas.',{p:M(p),s:M(s),w}),wrong:()=>_('Divide el precio entre lo que ahorras cada semana.')};}
   if(kind==='descuento'){const [p,pct]=pick([[20,10],[40,25],[60,50],[80,25],[100,20],[120,25],[30,10],[50,20],[200,10]]),pay=p*(100-pct)/100;
     const q=_('Algo cuesta {p} y tiene un {d} % de descuento. ¿Cuánto pagas?',{p:M(p),d:pct}),o=new Set([pay]);for(const d of shuffle([p*pct/100,p-pct,pay+5,pay-5,p]))if(o.size<4&&d>0)o.add(d);
     return {prompt:q,speak:q,answer:String(pay),visual:'<span>🏷️</span>',opts:shuffle([...o]).map(v=>({html:M(v),v:String(v),cls:'word'})),
       right:_('El {d} % de {p} es {r}, así que pagas {pay}.',{d:pct,p:M(p),r:M(p*pct/100),pay:M(pay)}),wrong:()=>_('Primero calcula cuánto te descuentan y réstalo.')};}
   if(kind==='vuelta'){const cents=l>1,price=cents?range(105,1895)/100:range(3,18),bill=price<5?5:price<10?10:20,ch=Math.round((bill-price)*100)/100;
     const q=_('Compras algo de {p} y pagas con {b}. ¿Cuánto te devuelven?',{p:M(price),b:M(bill)}),o=new Set([ch]);
     for(const d of shuffle([1,-1,.5,-.5,.1,2]))if(o.size<4&&ch+d>0)o.add(Math.round((ch+d)*100)/100);
     return {prompt:q,speak:q,answer:String(ch),visual:'<span>🧾</span>',opts:shuffle([...o]).map(v=>({html:M(v),v:String(v),cls:'word'})),
       right:_('{b} menos {p} son {c}.',{b:M(bill),p:M(price),c:M(ch)}),wrong:()=>_('Cuenta desde el precio hasta lo que has pagado.')};}
   const u1=pick([.4,.5,.6,.8,1,1.2]),n1=pick([2,3,4]),n2=n1*2;let u2;do{u2=pick([.4,.5,.6,.7,.8,1,1.2]);}while(u2===u1);
   const p1=Math.round(u1*n1*100)/100,p2=Math.round(u2*n2*100)/100,a=_('Paquete de {n}',{n:n1}),b=_('Paquete de {n}',{n:n2});
   const q=_('Un paquete de {n1} yogures cuesta {p1} y uno de {n2} cuesta {p2}. ¿Cuál es más barato por yogur?',{n1,p1:M(p1),n2,p2:M(p2)});
   return {prompt:q,speak:q,answer:u1<u2?a:b,visual:'<span>🥛</span>',opts:[word(a),word(b)],
     right:_('Cada yogur cuesta {u1} en el pequeño y {u2} en el grande.',{u1:M(u1),u2:M(u2)}),wrong:()=>_('Divide cada precio entre el número de yogures.')};}},
);

/* ---------- mecanografía ---------- */
function teclado(){
  let lvl=0,list,idx,start,typed=0,errors=0;
  const ROUND=10;
  const setup=()=>{list=sample(D.TYPING[lvl],ROUND);idx=0;start=0;typed=0;errors=0;
    $('#stage').innerHTML=`<div class="screen"><div class="row" id="tz">${[N_('Palabras cortas'),N_('Palabras largas'),N_('Frases')].map((t,i)=>`<button class="pill" data-l="${i}" aria-pressed="${i===lvl}">${_(t)}</button>`).join('')}</div>
      <p class="tip" id="tc">${_('Palabra {i} de {n}',{i:1,n:ROUND})}</p><p class="target" id="tw"></p>
      <input class="typein" id="ti" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="${_('Escribe aquí')}">
      <p class="status" id="tr"></p></div>`;
    $('#tz').onclick=e=>{const b=e.target.closest('[data-l]');if(b){lvl=+b.dataset.l;setup();}};
    $('#ti').oninput=onType;paint('');say(_('Escribe la palabra que ves. Puedes usar el teclado o la pantalla.'));
    setTimeout(()=>{try{$('#ti').focus();}catch(e){}},50);};
  const paint=v=>{const t=list[idx];let ok=0;while(ok<v.length&&ok<t.length&&v[ok].toLowerCase()===t[ok].toLowerCase())ok++;
    $('#tw').innerHTML=[...t].map((ch,i)=>`<span class="${i<ok?'ok':i<v.length?'bad':i===v.length?'now':''}">${ch===' '?'&nbsp;':esc(ch)}</span>`).join('');return ok;};
  const onType=()=>{const el=$('#ti'),v=el.value,t=list[idx];if(!start)start=Date.now();
    const ok=paint(v);if(v.length>ok){errors++;anim($('#tw'),'wobble');}
    if(v.trim().toLowerCase()===t.toLowerCase()){typed+=t.length+1;tone([660,880],.05);idx++;el.value='';
      if(idx%5===0)star();
      if(idx>=ROUND){const min=(Date.now()-start)/60000,wpm=Math.round(typed/5/Math.max(min,.05));
        const m=_('¡Terminado! {w} palabras por minuto y {e} fallos.',{w:wpm,e:errors});$('#tr').textContent=m;say(m);yay();confetti();el.disabled=true;
        const b=document.createElement('button');b.className='again';b.textContent=_('Otra vez');b.onclick=setup;$('#stage .screen').appendChild(b);return;}
      $('#tc').textContent=_('Palabra {i} de {n}',{i:idx+1,n:ROUND});paint('');}};
  setup();
}
Object.assign(CUSTOM,{teclado});

/* ---------- textos en español de estos juegos ---------- */
DATA.es.DAYS=['lunes','martes','miércoles','jueves','viernes','sábado','domingo'];
/* [emoji, acertijo, respuesta, [otras opciones], explicación] */
DATA.es.RIDDLES=[
  ['🐑','Un granjero tiene 17 ovejas. Se escapan todas menos 9. ¿Cuántas le quedan?','9',['8','17','0'],'«Todas menos 9» quiere decir que se quedan 9.'],
  ['📏','Ana es más alta que Luis, y Luis es más alto que Marta. ¿Quién es la más baja?','Marta',['Ana','Luis','No se sabe'],'Si Ana es más alta que Luis y Luis más que Marta, Marta es la más baja.'],
  ['📅','¿Cuántos meses tienen 28 días?','Todos',['Uno','Dos','Ninguno'],'Todos los meses tienen al menos 28 días.'],
  ['🏃','En una carrera adelantas al que va segundo. ¿En qué puesto vas ahora?','Segundo',['Primero','Tercero','Último'],'Ocupas su puesto: ahora vas segundo.'],
  ['🧱','Un ladrillo pesa 1 kilo más medio ladrillo. ¿Cuánto pesa un ladrillo entero?','2 kilos',['1 kilo y medio','1 kilo','3 kilos'],'Si medio ladrillo pesa 1 kilo, el ladrillo entero pesa 2.'],
  ['🏭','Si 5 máquinas hacen 5 juguetes en 5 minutos, ¿cuánto tardan 100 máquinas en hacer 100 juguetes?','5 minutos',['100 minutos','20 minutos','1 minuto'],'Cada máquina tarda 5 minutos en hacer un juguete, así que 100 máquinas hacen 100 juguetes en 5 minutos.'],
  ['🐸','Una rana está en el fondo de un pozo de 10 metros. Cada día sube 3 metros y cada noche resbala 2. ¿Cuántos días tarda en salir?','8',['10','7','5'],'Tras 7 días ha subido 7 metros y el octavo día sube 3 y sale.'],
  ['⚾','Un bate y una pelota cuestan 1,10 en total. El bate cuesta 1 más que la pelota. ¿Cuánto cuesta la pelota?','0,05',['0,10','0,01','1,00'],'Si la pelota cuesta 0,05, el bate cuesta 1,05 y juntos suman 1,10.'],
  ['👧','El padre de María tiene cinco hijas: Nana, Nene, Nini, Nono y…','María',['Nunu','Nina','Nona'],'La quinta hija es la propia María.'],
  ['🎂','Tengo el doble de años que mi hermano, que tiene 6. ¿Cuántos tendré cuando él tenga 10?','16',['20','14','12'],'Ahora tengo 12. Dentro de 4 años tendré 16.'],
  ['🍎','Hay 3 manzanas y te llevas 2. ¿Cuántas manzanas tienes tú?','2',['1','3','5'],'Tienes las 2 que te has llevado.'],
  ['🪶','¿Qué pesa más: un kilo de plumas o un kilo de hierro?','Pesan lo mismo',['Las plumas','El hierro','Depende del día'],'Un kilo es un kilo, sea de lo que sea.'],
  ['🐱','Si 3 gatos cazan 3 ratones en 3 minutos, ¿cuántos gatos hacen falta para cazar 60 ratones en 30 minutos?','6',['20','60','3'],'Cada gato caza un ratón cada 3 minutos, o sea, 10 en 30 minutos. Para 60 hacen falta 6 gatos.'],
  ['🚆','Un tren eléctrico va hacia el norte y el viento sopla hacia el sur. ¿Hacia dónde va el humo?','No echa humo',['Hacia el sur','Hacia el norte','Hacia arriba'],'Los trenes eléctricos no echan humo.'],
  ['👨‍👩‍👧‍👦','Cuatro hermanos tienen cada uno una hermana, y es la misma para todos. ¿Cuántos hijos hay en la familia?','5',['8','4','6'],'Cuatro chicos y una chica: cinco hijos.'],
  ['➗','Divide 30 entre medio y súmale 10. ¿Qué resultado da?','70',['25','40','50'],'Dividir entre medio es multiplicar por 2: 30 entre medio son 60, y más 10 son 70.'],
  ['🥚','Si un huevo tarda 3 minutos en cocerse, ¿cuánto tardan 3 huevos juntos en la misma olla?','3 minutos',['9 minutos','6 minutos','1 minuto'],'Se cuecen a la vez, así que tardan lo mismo.'],
  ['🪷','Unos nenúfares doblan su tamaño cada día. En 20 días cubren todo el estanque. ¿Qué día cubrían la mitad?','El día 19',['El día 10','El día 15','El día 5'],'Si el día 20 está lleno y se dobla cada día, el día anterior estaba a la mitad.'],
  ['🔔','Un reloj da 6 campanadas en 5 segundos. ¿Cuántos segundos tarda en dar 12?','11',['10','12','24'],'Entre 6 campanadas hay 5 huecos de 1 segundo. Entre 12 hay 11 huecos.'],
  ['🧦','En un cajón oscuro hay calcetines rojos y azules. ¿Cuántos tienes que sacar, como mínimo, para estar seguro de tener dos del mismo color?','3',['2','4','10'],'Con 3 calcetines y solo 2 colores, seguro que dos se repiten.']];
DATA.es.SCIENCE_QA=[
  ['💧','¿A qué temperatura hierve el agua al nivel del mar?','100 °C',['50 °C','0 °C','200 °C']],
  ['🧊','¿A qué temperatura se congela el agua?','0 °C',['10 °C','−20 °C','100 °C']],
  ['♨️','¿Cómo se llama el paso de líquido a gas?','Evaporación',['Congelación','Fusión','Condensación']],
  ['☁️','¿Cómo se llama el paso de gas a líquido?','Condensación',['Evaporación','Solidificación','Fusión']],
  ['🌿','¿Cómo se llama el proceso con el que las plantas fabrican su alimento usando la luz?','Fotosíntesis',['Digestión','Respiración','Evaporación']],
  ['🌳','¿Qué gas toman las plantas del aire para hacer la fotosíntesis?','Dióxido de carbono',['Oxígeno','Helio','Hidrógeno']],
  ['❤️','¿Qué órgano bombea la sangre por todo el cuerpo?','El corazón',['El hígado','Los pulmones','El estómago']],
  ['🫁','¿Con qué órganos respiramos?','Los pulmones',['Los riñones','El corazón','El estómago']],
  ['🦴','¿Cuántos huesos tiene, más o menos, una persona adulta?','206',['50','1000','12']],
  ['🧲','¿Qué material atrae un imán?','El hierro',['La madera','El plástico','El vidrio']],
  ['⚡','¿Qué material conduce bien la electricidad?','El cobre',['La madera','El plástico','La goma']],
  ['🌍','¿Cómo se llama la capa de gases que rodea la Tierra?','La atmósfera',['La corteza','El núcleo','El manto']],
  ['🌋','¿Cómo se llama la roca fundida que sale de un volcán?','Lava',['Arena','Granito','Hielo']],
  ['🔬','¿Cuál es la unidad más pequeña de todos los seres vivos?','La célula',['El órgano','El tejido','El hueso']],
  ['☀️','¿Cuánto tarda la luz del Sol en llegar a la Tierra?','Unos 8 minutos',['Un segundo','Un día','Un año']],
  ['🔊','¿Puede viajar el sonido por el espacio vacío?','No, necesita aire u otro material',['Sí, más rápido que la luz','Sí, igual que en el aire','Solo de noche']],
  ['🧪','¿Cuál es la fórmula del agua?','H₂O',['CO₂','O₂','NaCl']],
  ['🌬️','¿Qué gas del aire necesitamos para vivir?','Oxígeno',['Dióxido de carbono','Helio','Humo']],
  ['🍎','¿Qué fuerza hace que las cosas caigan al suelo?','La gravedad',['El magnetismo','La electricidad','El viento']],
  ['🌡️','¿Con qué se mide la temperatura?','Con un termómetro',['Con una balanza','Con una regla','Con un reloj']],
  ['🌈','¿Qué hace falta para que aparezca un arcoíris?','Luz del sol y gotas de agua',['Solo nubes','Viento y arena','Nieve']],
  ['🦠','¿Qué medicinas sirven para combatir las infecciones de bacterias?','Los antibióticos',['Las tiritas','Las vitaminas','El agua con sal']]];
/* [emoji, qué pasó, año (negativo = antes de Cristo), aproximado] */
DATA.es.HISTORY=[
  ['✍️','Se inventa la escritura en Mesopotamia',-3200,true],['🔺','Se construye la gran pirámide de Guiza',-2560,true],
  ['🏛️','Primeros Juegos Olímpicos en Grecia',-776,false],['🏟️','Se inaugura el Coliseo de Roma',80,false],
  ['📖','Gutenberg crea su imprenta',1450,true],['⛵','Colón llega a América',1492,false],['🌍','Termina la primera vuelta al mundo',1522,false],
  ['🏔️','Los incas construyen Machu Picchu',1450,true],['📚','Se publica la primera parte del Quijote',1605,false],
  ['🔭','Galileo observa las lunas de Júpiter',1610,false],['💉','Jenner crea la primera vacuna',1796,false],['🚂','Empieza a funcionar el primer tren de pasajeros',1825,false],
  ['☎️','Se patenta el teléfono',1876,false],['✈️','Primer vuelo de los hermanos Wright',1903,false],['💊','Fleming descubre la penicilina',1928,false],
  ['🕊️','Se firma la Declaración Universal de los Derechos Humanos',1948,false],['🛰️','Se lanza el primer satélite artificial',1957,false],
  ['🌕','Las personas pisan la Luna por primera vez',1969,false],['🌐','Nace la World Wide Web',1991,false]];
DATA.es.YEAR=(y,approx)=>(approx?'hacia el año ':'en el año ')+(y<0?(-y)+' antes de Cristo':y);
/* Cómo se escribe una cantidad de dinero. Cada país puede cambiar el símbolo. */
DATA.es.MONEY=v=>v.toLocaleString('es-ES',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})+' €';
DATA.es.NEEDS=[['🥛','la leche',true],['🧥','un abrigo para el invierno',true],['💊','las medicinas',true],['🍞','el pan',true],['👟','unos zapatos para ir al cole',true],
  ['💧','el agua',true],['🪥','el cepillo de dientes',true],['🎮','un videojuego nuevo',false],['🍬','unas chucherías',false],['🧸','otro peluche',false],
  ['🕶️','unas gafas de sol de moda',false],['📱','un móvil nuevo cuando el tuyo funciona',false],['🎈','un globo gigante',false]];
DATA.es.TYPING=[
  ['sol','mar','pan','luz','casa','gato','mesa','luna','pato','rosa','nube','agua','leche','perro','silla','libro','verde','fruta','juego','plaza'],
  ['mariposa','elefante','escalera','biblioteca','chocolate','ordenador','dinosaurio','montaña','bicicleta','tormenta','zanahoria','helicóptero','murciélago','calendario','girasol'],
  ['el gato duerme','me gusta leer','hoy hace sol','la luna brilla','vamos al parque','el mar es azul','tengo un perro','me gusta jugar','la casa es grande','comemos fruta']];
