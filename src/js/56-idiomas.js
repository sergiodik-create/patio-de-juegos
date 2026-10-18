/* Sección «Idiomas»: aprender otro idioma jugando.
   Las palabras salen del vocabulario (VOCAB: emoji → palabra), de los colores, de los números y de las frases
   de cada idioma. Así, cada idioma que se añade sirve a la vez para enseñar y para aprender. */
const THEMES=[
  ['animales','🐶',N_('Animales'),'var(--green)','🐶 🐱 🐮 🐷 🐴 🐑 🐔 🦆 🐟 🐦 🐸 🦁 🐘 🐻 🐰 🐭 🐵 🦒 🐢 🐍'],
  ['comida','🍎',N_('Comida'),'var(--red)','🍎 🍌 🍓 🍊 🍇 🍉 🍞 🧀 🥛 🥚 🍦 🍪 🥕 🍅 💧 🍰'],
  ['casa','🏠',N_('En casa'),'var(--orange)','🏠 🚪 🪟 🛏️ 🪑 📖 ⚽ 🧸 🥄 🛁 ⏰ 🖍️'],
  ['cuerpo','👀',N_('El cuerpo'),'var(--pink)','👀 👂 👃 👄 ✋ 🦶 🦷 💪'],
  ['ropa','👕',N_('La ropa'),'var(--purple)','👕 👖 👗 🧦 👟 🧢 🧥 🧤'],
  ['transporte','🚗',N_('Transportes'),'var(--blue)','🚗 🚌 🚲 🚂 ✈️ 🚀 ⛵ 🚜'],
  ['naturaleza','🌳',N_('Naturaleza'),'var(--teal)','☀️ 🌙 ⭐ ☁️ 🌧️ 🌈 🌳 🌸 🌊 ⛰️']];
const PHRASE_KEYS=[['👋','hola'],['👋','adios'],['🌅','buenosdias'],['🌙','buenasnoches'],['🙏','porfavor'],['😊','gracias'],['🙂','denada'],['😔','perdon'],
  ['🤔','comotellamas'],['🙋','mellamo'],['🎂','cuantosanos'],['🖐️','tengocinco'],['😃','comoestas'],['👍','estoybien'],['🤝','jugar'],['❤️','tequiero'],
  ['🍽️','hambre'],['🥤','sed'],['🚻','bano'],['🤷','nolose']];
const fxInfo=()=>{const T=learnLang();return {T,TD:langData(T),fxLang:LANGS[T]?.voz||'es-ES',name:langName(T)};};
const inLearn=()=>_('En {l}',{l:langName(learnLang())});

GAMES.push(
 ...THEMES.map(([id,pic,name,bg,list])=>({id:'aprende-'+id,age:'i',pic,name,what:inLearn,bg,levels:3,needs:['VOCAB'],gen(l=0){
   const {TD,fxLang,name:ln}=fxInfo(),voc=list.split(' ').filter(e=>TD.VOCAB?.[e]&&D.VOCAB[e]);
   const o=sample(voc,[3,4,4][l]),t=pick(o),fx=TD.VOCAB[t],nat=D.VOCAB[t];
   if(l<2)return {prompt:_('Escucha y toca'),speak:_('Escucha. ¿Qué es?'),sayFx:fx,fxLang,answer:t,opts:o.map(e=>({html:e,v:e,aria:D.VOCAB[e]})),
     right:_('¡Sí! Es {n}.',{n:nat}),fx,wrong:()=>_('No es esa. Toca la frase de arriba para oírla otra vez.')};
   return {prompt:_('¿Cómo se dice «{x}» en {l}?',{x:nat,l:ln}),speak:_('¿Cómo se dice {x} en {l}?',{x:nat,l:ln}),answer:fx,visual:`<span>${t}</span>`,
     opts:o.map(e=>word(TD.VOCAB[e])),right:_('Se dice así:'),fx,fxLang,wrong:()=>_('Esa palabra es otra cosa. Prueba otra vez.')};}})),
 {id:'aprende-colores',age:'i',pic:'🎨',name:'Colores',what:inLearn,bg:'var(--yellow)',levels:3,needs:['COLORS'],gen(l=0){
   const {TD,fxLang,name:ln}=fxInfo(),pairs=D.COLORS.map(c=>[c,(TD.COLORS||[]).find(x=>x.c===c.c)]).filter(x=>x[1]);
   const o=sample(pairs,[3,5,4][l]),t=pick(o),fx=t[1].n;
   if(l<2)return {prompt:_('Escucha y toca el color'),speak:_('Escucha y toca el color'),sayFx:fx,fxLang,answer:t[0].n,opts:o.map(([c])=>({dot:c.c,v:c.n,aria:c.n})),
     right:_('¡Sí! Es el {c}.',{c:t[0].n}),fx,wrong:()=>_('No es ese. Toca la frase de arriba para oírla otra vez.')};
   return {prompt:_('¿Cómo se dice este color en {l}?',{l:ln}),speak:_('¿Cómo se dice este color en {l}?',{l:ln}),answer:fx,visual:`<span class="swatch" style="background:${t[0].c}"></span>`,
     opts:o.map(([,x])=>word(x.n)),right:_('Se dice así:'),fx,fxLang,wrong:()=>_('Ese es otro color. Prueba otra vez.')};}},
 {id:'aprende-numeros',age:'i',pic:'🔢',name:'Números',what:inLearn,bg:'var(--blue)',levels:3,needs:['NUMWORDS'],gen(l=0){
   const {TD,fxLang,name:ln}=fxInfo(),max=l===0?5:10,n=range(1,max),fx=TD.NUMWORDS[n];
   if(l<2)return {prompt:_('Escucha y toca el número'),speak:_('Escucha y toca el número'),sayFx:fx,fxLang,answer:String(n),opts:numOpts(n,l?4:3,1,max),
     right:_('¡Sí! Es el {n}.',{n}),fx,wrong:()=>_('No es ese. Toca la frase de arriba para oírla otra vez.')};
   const o=new Set([n]);while(o.size<4)o.add(range(1,10));const f=pick(FRUITS);
   return {prompt:_('¿Cuántas hay? Elige el número en {l}.',{l:ln}),speak:_('¿Cuántas hay? Elige el número en {l}.',{l:ln}),answer:fx,
     visual:Array.from({length:n},()=>`<span>${f}</span>`).join(''),opts:shuffle([...o]).map(k=>word(TD.NUMWORDS[k])),right:_('Hay {n}:',{n}),fx,fxLang,wrong:()=>_('Cuenta otra vez despacio.')};}},
 {id:'aprende-frases',age:'i',pic:'💬',name:'Frases para empezar',what:N_('Hola, gracias, ¿cómo te llamas?'),bg:'var(--teal)',custom:'frases',needs:['PHRASES']},
 {id:'aprende-parejas',age:'i',pic:'🃏',name:'Parejas de palabras',what:N_('Une el dibujo con su palabra'),bg:'var(--pink)',custom:'parejasIdioma',needs:['VOCAB']},
);

/* ---------- frases: tarjetas para escuchar y repetir ---------- */
function frases(){
  const {TD,fxLang}=fxInfo(),list=PHRASE_KEYS.filter(([,k])=>TD.PHRASES?.[k]&&D.PHRASES?.[k]);let i=0,seen=0;
  const draw=()=>{const [e,k]=list[i],fx=TD.PHRASES[k];
    $('#stage').innerHTML=`<div class="screen"><div class="book"><div class="bpic" aria-hidden="true">${e}</div>
      <p class="btext fx" lang="${fxLang}">${esc(fx)}</p><p class="tip">${esc(D.PHRASES[k])}</p><p class="bpage">${i+1} / ${list.length}</p></div>
      <div class="row"><button class="pill" id="fp" ${i===0?'disabled':''}>${_('◀ Atrás')}</button><button class="pill" id="fl">${_('🔊 Escuchar')}</button>
      <button class="pill" id="fs">${_('🐢 Despacio')}</button><button class="pill" id="fn">${_('Siguiente ▶')}</button></div>
      <p class="tip">${_('Escucha y repítelo en voz alta.')}</p></div>`;
    const talk=slow=>{if(!S.voz||!('speechSynthesis' in window)){subtitle(fx);return;}try{speechSynthesis.cancel();const u=utter(fx,fxLang);if(slow)u.rate=.55*S.velocidad;subtitle(fx);speechSynthesis.speak(u);}catch(err){}};
    $('#fl').onclick=()=>talk(false);$('#fs').onclick=()=>talk(true);
    $('#fp').onclick=()=>{if(i>0){i--;draw();}};
    $('#fn').onclick=()=>{seen++;if(seen%5===0)star();i=(i+1)%list.length;draw();};
    talk(false);};
  draw();
}

/* ---------- parejas: dibujo con su palabra en el otro idioma ---------- */
function parejasIdioma(){
  const {TD,fxLang}=fxInfo(),pool=THEMES.flatMap(t=>t[4].split(' ')).filter(e=>TD.VOCAB?.[e]),faces=sample(pool,5);
  const deck=shuffle([...faces.map(f=>({k:f,html:f,cls:'pic'})),...faces.map(f=>({k:f,html:esc(TD.VOCAB[f]),cls:'txt'}))]);
  $('#stage').innerHTML=`<div class="screen"><p class="prompt">${_('Une cada dibujo con su palabra')}</p><div class="mem" style="grid-template-columns:repeat(${faces.length<=3?3:5},auto)">${
    deck.map((c,i)=>`<button class="card ${c.cls}" data-k="${c.k}" data-side="${c.cls}" aria-label="${_('Carta')} ${i+1}">${c.html}</button>`).join('')}</div></div>`;
  say(_('Une cada dibujo con su palabra'));
  let open=[],found=0,lock=false;
  $('#stage').onclick=e=>{const c=e.target.closest('.card');if(!c||lock||c.classList.contains('up'))return;
    c.classList.add('up');if(c.dataset.side==='txt')say(TD.VOCAB[c.dataset.k],fxLang);else tone([500],.08);open.push(c);
    if(open.length<2)return;const [a,b]=open;open=[];
    if(a.dataset.k===b.dataset.k&&a.dataset.side!==b.dataset.side){a.classList.add('done');b.classList.add('done');found++;yay();star();
      later(()=>say(TD.VOCAB[a.dataset.k],fxLang),400);
      if(found===faces.length){confetti();later(()=>{const p=$('#stage .screen'),btn=document.createElement('button');btn.className='again';btn.textContent=_('Otra vez');btn.onclick=()=>{$('#stage').onclick=null;parejasIdioma();};p.appendChild(btn);},900);}}
    else{lock=true;nope();later(()=>{a.classList.remove('up');b.classList.remove('up');lock=false;},1100);}};
}

Object.assign(CUSTOM,{frases,parejasIdioma});

/* ---------- vocabulario y frases en español ---------- */
DATA.es.VOCAB={'🐶':'perro','🐱':'gato','🐮':'vaca','🐷':'cerdo','🐴':'caballo','🐑':'oveja','🐔':'gallina','🦆':'pato','🐟':'pez','🐦':'pájaro',
  '🐸':'rana','🦁':'león','🐘':'elefante','🐻':'oso','🐰':'conejo','🐭':'ratón','🐵':'mono','🦒':'jirafa','🐢':'tortuga','🐍':'serpiente',
  '🍎':'manzana','🍌':'plátano','🍓':'fresa','🍊':'naranja','🍇':'uvas','🍉':'sandía','🍞':'pan','🧀':'queso','🥛':'leche','🥚':'huevo',
  '🍦':'helado','🍪':'galleta','🥕':'zanahoria','🍅':'tomate','💧':'agua','🍰':'tarta',
  '🏠':'casa','🚪':'puerta','🪟':'ventana','🛏️':'cama','🪑':'silla','📖':'libro','⚽':'pelota','🧸':'osito','🥄':'cuchara','🛁':'bañera','⏰':'reloj','🖍️':'cera de colores',
  '👀':'ojos','👂':'oreja','👃':'nariz','👄':'boca','✋':'mano','🦶':'pie','🦷':'diente','💪':'brazo',
  '👕':'camiseta','👖':'pantalones','👗':'vestido','🧦':'calcetines','👟':'zapatillas','🧢':'gorra','🧥':'abrigo','🧤':'guantes',
  '🚗':'coche','🚌':'autobús','🚲':'bicicleta','🚂':'tren','✈️':'avión','🚀':'cohete','⛵':'barco','🚜':'tractor',
  '☀️':'sol','🌙':'luna','⭐':'estrella','☁️':'nube','🌧️':'lluvia','🌈':'arcoíris','🌳':'árbol','🌸':'flor','🌊':'mar','⛰️':'montaña'};
DATA.es.PHRASES={hola:'Hola',adios:'Adiós',buenosdias:'Buenos días',buenasnoches:'Buenas noches',porfavor:'Por favor',gracias:'Gracias',denada:'De nada',
  perdon:'Perdón',comotellamas:'¿Cómo te llamas?',mellamo:'Me llamo Ana',cuantosanos:'¿Cuántos años tienes?',tengocinco:'Tengo cinco años',
  comoestas:'¿Cómo estás?',estoybien:'Estoy bien, gracias',jugar:'¿Quieres jugar conmigo?',tequiero:'Te quiero',hambre:'Tengo hambre',sed:'Tengo sed',
  bano:'¿Dónde está el baño?',nolose:'No lo sé'};
