/* Juegos de actitudes: convivir, compartir, calmarse y cuidar de otros.
   Ninguno castiga: si se elige lo menos amable, se explica qué pasaría y se prueba otra vez. */
GAMES.push(
 {id:'harias',age:'mg',pic:'🤝',name:'¿Qué harías tú?',what:'Ayudar, compartir y hacer las paces',bg:'var(--teal)',levels:2,needs:['HARIAS'],gen(l=0){
   let i;do{i=rnd(D.HARIAS.length);}while(i===lastQ.harias&&D.HARIAS.length>1);lastQ.harias=i;
   const h=D.HARIAS[i],no=l?h.no:[pick(h.no)],opts=shuffle([h.ok,...no]),q=h.s+' '+_('¿Qué harías tú?');
   // la voz lee también las respuestas, para quien todavía no sabe leer
   return {prompt:`<span class="long">${esc(q)}</span>`,speak:q+' '+opts.map(o=>o[0]).join(' '),answer:h.ok[0],visual:`<span>${h.e}</span>`,
     opts:opts.map(o=>({html:esc(o[0]),v:o[0],cls:'act'})),right:h.ok[1],
     wrong:v=>(no.find(o=>o[0]===v)||h.ok)[1]+' '+_('¿Qué otra cosa podrías hacer?')};}},
 {id:'reparte',age:'mg',pic:'🍪',name:'Reparte justo',what:'Lo mismo para cada uno',bg:'var(--orange)',levels:3,needs:['SHARE_ITEMS'],gen(l=0){
   const it=pick(D.SHARE_ITEMS),KIDS=['🧒','👧','👦','🧑'],kind=pick([['igual'],['igual','sobra','llega'],['sobra','llega','iguala']][l]);
   const pile=n=>`<div class="pile">${`<span class="cnt">${it.e}</span>`.repeat(n)}</div>`;
   const kids=(n,extra)=>`<div class="kids">${KIDS.slice(0,n).map(k=>`<span>${k}</span>`).join('')}${extra?`<span class="op">+</span><span>${KIDS[n]}</span>`:''}</div>`;
   const nums=ans=>{const s=new Set([ans]);while(s.size<nOpts(l))s.add(Math.max(0,ans+range(-3,3)));return shuffle([...s]).map(v=>({html:String(v),v:String(v),cls:'num'}));};
   const fair=()=>_('Prueba a dar una a cada amigo, por turnos, hasta que se acaben.');
   if(kind==='iguala'){const b=range(0,3),d=2*range(1,3),a=b+d,x=d/2,q=_('El niño tiene más que la niña. ¿Cuántas tiene que darle para que los dos tengan las mismas?');
     return {prompt:q,speak:q,answer:String(x),visual:`<div class="share"><div class="who"><span>👦</span>${pile(a)}</div><div class="who"><span>👧</span>${pile(b)}</div></div>`,
       opts:nums(x),right:_('Si le da {x}, los dos tienen {y}. ¡Así es justo!',{x,y:b+x}),wrong:()=>_('Pista: cuenta cuántas tiene de más y reparte esa diferencia entre los dos.')};}
   if(kind==='llega'){const n=range(2,3),t=n*(n+1)*(n===2?range(1,2):1),k=t/(n+1),q=_('Íbamos a repartir {cosas} entre {n} amigos, pero llega uno más. ¿Cuántas le tocan ahora a cada uno, a partes iguales?',{cosas:it.n,n});
     return {prompt:q,speak:q,answer:String(k),countable:true,visual:`<div class="share">${pile(t)}${kids(n,true)}</div>`,
       opts:nums(k),right:_('Ahora son {m} amigos: {k} para cada uno. ¡Siempre hay sitio para uno más!',{m:n+1,k}),wrong:fair};}
   const n=range(2,l?4:3),k=range(1,l?3:4),r=kind==='sobra'?range(1,n-1):0,t=n*k+r;
   const q=kind==='sobra'?_('Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas sobran?',{cosas:it.n,n}):_('Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas le tocan a cada uno?',{cosas:it.n,n});
   return {prompt:q,speak:q,answer:String(kind==='sobra'?r:k),countable:true,visual:`<div class="share">${pile(t)}${kids(n)}</div>`,opts:nums(kind==='sobra'?r:k),
     right:kind==='sobra'?(r===1?_('Cada uno recibe {k} y sobra una. Se puede partir o guardar para luego.',{k}):_('Cada uno recibe {k} y sobran {r}. Se pueden guardar para luego.',{k,r})):_('{k} para cada uno. ¡Así es justo!',{k}),
     wrong:fair};}},
 {id:'respira',age:'pmgx',pic:'🎈',name:'Respira conmigo',what:'Para estar tranquilos',bg:'var(--blue)',custom:'respira'},
 {id:'mascota',age:'pm',pic:'🐶',name:'Mi mascota',what:'Dale de comer, juega y cuídala',bg:'var(--green)',custom:'mascota',needs:['PETS']},
);

/* ---------- ¿qué harías tú? ----------
   e: dibujo; s: la situación; ok: [lo amable, por qué]; no: dos opciones menos amables con lo que pasaría.
   Las respuestas van en primera persona y sin género («Me acerco», no «Me quedo callado»), para que sirvan a niños y niñas. */
DATA.es.HARIAS=[
  {e:'😢',s:'Un compañero está llorando en el recreo.',ok:['Me acerco y le pregunto qué le pasa.','Cuando alguien está triste, que le pregunten le ayuda a sentirse acompañado.'],
    no:[['Me río de él.','Si nos reímos de alguien que llora, se siente todavía peor.'],['Hago como que no lo veo.','Si nadie le hace caso, se siente solo.']]},
  {e:'🧍',s:'Hay una niña nueva en clase y está sola porque no conoce a nadie.',ok:['La invito a jugar con nosotros.','Invitarla hace que se sienta bienvenida. ¡Y a lo mejor tienes una amiga nueva!'],
    no:[['Le digo que no puede jugar.','Dejar a alguien fuera le hace sentirse triste y sola.'],['Me alejo sin decir nada.','Si nadie le habla, le costará mucho hacer amigos.']]},
  {e:'💥',s:'Sin querer, rompes un vaso en casa.',ok:['Lo cuento y pido perdón.','Decir la verdad es valiente, y así un adulto puede recogerlo sin que nadie se corte.'],
    no:[['Escondo los trozos.','Los trozos escondidos pueden cortar a alguien, y esconderlos no lo arregla.'],['Digo que ha sido mi hermano.','Si culpas a otro, castigan a quien no ha sido. Eso no es justo.']]},
  {e:'🧸',s:'Tu hermano pequeño quiere jugar con tu juguete.',ok:['Jugamos juntos o se lo dejo un rato.','Compartir hace felices a los dos, y luego te lo devolverá.'],
    no:[['Se lo quito de un tirón.','Quitar las cosas a tirones puede hacer daño y acaba en pelea.'],['Le grito que es solo mío.','Gritar le asusta y le pone triste. Con palabras tranquilas os entendéis mejor.']]},
  {e:'😠',s:'Un amigo te quita la pelota y te enfadas mucho.',ok:['Respiro hondo y le digo que me ha molestado.','Respirar ayuda a calmarse, y decirlo con palabras ayuda a que el otro entienda.'],
    no:[['Le pego.','Pegar hace daño y no arregla nada. El enfado se puede contar con palabras.'],['Le rompo algo suyo.','Romper sus cosas le haría daño y el problema se haría más grande.']]},
  {e:'🎨',s:'Tu amiga te enseña su dibujo y a ti no te gusta mucho.',ok:['Le digo algo que sí me gusta de su dibujo.','Siempre hay algo bonito que decir. Así se siente contenta y con ganas de seguir dibujando.'],
    no:[['Le digo que es horrible.','Decir cosas feas hace daño. Se puede ser sincero con amabilidad.'],['Me burlo de su dibujo delante de todos.','Burlarse delante de otros da mucha vergüenza y tristeza.']]},
  {e:'👵',s:'A una señora mayor se le caen las naranjas de la bolsa.',ok:['La ayudo a recogerlas.','Ayudar a quien lo necesita hace el mundo más amable.'],
    no:[['Paso de largo.','Si nadie ayuda, a ella le costará mucho recogerlas sola.'],['Me río y sigo andando.','Reírse cuando alguien tiene un problema le hace sentir mal.']]},
  {e:'⚽',s:'Tu equipo pierde un partido.',ok:['Felicito al otro equipo.','Saber perder es de campeones. ¡La próxima vez, a por todas!'],
    no:[['Digo que han hecho trampa.','Acusar sin razón enfada a los demás y estropea el juego.'],['Me voy de mal humor sin despedirme.','Irse así estropea la diversión. Perder a veces es parte de jugar.']]},
  {e:'👛',s:'Encuentras una cartera en el parque.',ok:['Se la doy a un adulto para que la devuelva.','Así su dueño puede recuperarla. ¡Seguro que la estaba buscando!'],
    no:[['Me la quedo.','Quedarse con lo que no es nuestro no está bien: su dueño estará preocupado.'],['La tiro a la papelera.','Así su dueño nunca podría recuperarla.']]},
  {e:'🗣️',s:'Unos niños se burlan de otro por cómo habla.',ok:['Me pongo a su lado y aviso a un adulto.','Quien sufre burlas necesita apoyo. Contarlo a un adulto no es chivarse: es ayudar.'],
    no:[['Me río con ellos.','Reírse con los que se burlan hace que el niño se sienta todavía más solo.'],['Le digo que es culpa suya.','Nadie tiene la culpa de que se burlen de él. Cada persona habla a su manera.']]},
  {e:'🧹',s:'Al terminar de jugar, la habitación está llena de juguetes.',ok:['Lo recojo todo.','Recoger es cuidar tus cosas y ayudar en casa. ¡Mañana lo encontrarás todo!'],
    no:[['Lo dejo para que lo recojan otros.','En casa todos ayudamos. Si cada uno recoge lo suyo, es más fácil.'],['Meto todo debajo de la cama.','Así los juguetes se pierden o se rompen. Mejor cada cosa en su sitio.']]},
  {e:'📘',s:'Tu amigo no entiende un ejercicio que tú sí sabes hacer.',ok:['Le explico cómo lo hago.','Ayudar a un amigo a aprender es un regalo para los dos.'],
    no:[['Le digo que es tonto.','Insultar hace daño. A todos nos cuesta más aprender algunas cosas.'],['Le digo que no pienso ayudarle.','Si nos ayudamos, aprendemos todos más.']]},
  {e:'🤫',s:'Alguien te pide que guardes un secreto que te hace sentir mal.',ok:['Se lo cuento a un adulto de confianza.','Los secretos que nos hacen sentir mal no se guardan: se cuentan a un adulto de confianza.'],
    no:[['Me lo guardo aunque esté triste.','Guardar algo que te preocupa pesa mucho. Contarlo ayuda.'],['Hago como si no pasara nada.','Hacer como si nada no hace que desaparezca. Un adulto puede ayudarte.']]},
  {e:'🐶',s:'Ves un perrito sin agua en un día de mucho calor.',ok:['Aviso a un adulto para que le ponga agua.','Los animales también sienten calor y sed. Cuidarlos es cosa de todos.'],
    no:[['No hago nada.','El perrito lo está pasando mal y necesita ayuda.'],['Le molesto para que ladre.','Molestar a los animales les asusta, y él ya lo está pasando mal.']]},
  {e:'🍬',s:'Hay tres caramelos y sois tres amigos.',ok:['Uno para cada uno.','Repartir a partes iguales es justo y todos quedan contentos.'],
    no:[['Me como dos.','Si te comes dos, a alguien le faltará el suyo.'],['Me los como todos.','Así tus amigos se quedarían sin nada y se sentirían tristes.']]},
  {e:'🛝',s:'Hay mucha cola para subir al tobogán.',ok:['Espero mi turno.','Esperar el turno es justo: todos quieren jugar.'],
    no:[['Me cuelo delante.','Colarse no es justo para los que llevan rato esperando.'],['Empujo para subir antes.','Empujar puede hacer que alguien se caiga y se haga daño.']]},
  {e:'🗑️',s:'Ves papeles tirados en el suelo del parque.',ok:['Los tiro a la papelera.','Así el parque queda limpio para todos, también para los animales.'],
    no:[['Tiro también mi envoltorio al suelo.','La basura en el suelo ensucia el parque y puede hacer daño a los animales.'],['Los dejo ahí y me voy.','Si cada uno ayuda un poco, el parque está siempre limpio.']]},
  {e:'👟',s:'Alguien te ayuda a atarte los cordones.',ok:['Le doy las gracias.','Dar las gracias hace sentir bien a quien te ayuda.'],
    no:[['No digo nada.','Si no das las gracias, puede pensar que no te ha gustado su ayuda.'],['Le digo que lo ha hecho mal.','Aunque no quede perfecto, lo ha hecho con cariño.']]},
  {e:'😟',s:'Has dicho algo feo a tu amigo y ahora está triste.',ok:['Le pido perdón.','Pedir perdón ayuda a arreglar las cosas. ¡Todos nos equivocamos alguna vez!'],
    no:[['Hago como si no hubiera pasado.','Si no lo habláis, tu amigo seguirá triste.'],['Le digo que es un exagerado.','Lo que siente es importante. Mejor escucharle y pedir perdón.']]},
  {e:'🚌',s:'En el autobús sube un abuelo y no quedan asientos libres.',ok:['Le dejo mi asiento.','Ceder el asiento a quien lo necesita más es un gesto muy bonito.'],
    no:[['Hago como que no lo veo.','Si nadie se fija, tendrá que ir de pie todo el viaje.'],['Le digo que se espere.','Para él es difícil ir de pie mientras el autobús se mueve.']]}];

/* ---------- reparte justo ----------
   Cosas que se reparten: el nombre va en plural y con artículo («las galletas»). En español todas son femeninas
   para que valga «¿Cuántas…?»; cada idioma puede elegir las suyas. Sin 🍒, que son dos cerezas y lían al contar. */
DATA.es.SHARE_ITEMS=[{e:'🍪',n:'las galletas'},{e:'🍓',n:'las fresas'},{e:'🍎',n:'las manzanas'},{e:'🧁',n:'las magdalenas'},{e:'🍬',n:'las chucherías'},{e:'🍊',n:'las naranjas'}];

/* ---------- respira conmigo ----------
   Coger aire mientras el dibujo crece y soltarlo mientras encoge, cinco veces. Los peques respiran algo más deprisa
   y sin aguantar el aire. La voz guía las dos primeras respiraciones; luego solo suena un tono suave. */
function respira(){
  const T=age==='p'?{i:3000,h:0,o:4000}:{i:4000,h:1500,o:5000},N=5;
  const THEMES=[
    {b:N_('🎈 Globo'),in:'🎈',out:'🎈',ti:N_('Coge aire por la nariz… el globo se hincha.'),to:N_('Suelta el aire despacito por la boca… el globo se deshincha.')},
    {b:N_('🌸 Flor y vela'),in:'🌸',out:'🕯️',ti:N_('Huele la flor despacito por la nariz.'),to:N_('Sopla la vela muy despacito.')}];
  let th=0,n=0,run=false;
  $('#stage').innerHTML=`<div class="screen breathe"><div class="row" id="br-th">${THEMES.map((t,i)=>`<button class="pill" data-i="${i}" aria-pressed="${i===th}">${_(t.b)}</button>`).join('')}</div>
    <p class="prompt" id="br-t"><span class="long">${_('Toca «Empezar» y respira conmigo.')}</span></p>
    <div class="breath" id="br"><span id="br-e">${THEMES[th].in}</span><b id="br-c" aria-hidden="true"></b></div>
    <div class="br-dots" id="br-n" aria-hidden="true"></div>
    <button class="again" id="br-go">${_('Empezar')}</button></div>`;
  const br=$('#br'),txt=t=>{$('#br-t').innerHTML=`<span class="long">${esc(t)}</span>`;},dots=()=>{$('#br-n').innerHTML=Array.from({length:N},(_x,i)=>`<i class="${i<n?'on':''}"></i>`).join('');};
  // cuenta 1, 2, 3… dentro del dibujo: guía también con el modo calma, cuando apenas se mueve
  const count=ms=>{const s=Math.round(ms/1000);for(let k=0;k<s;k++)later(()=>{if(run)$('#br-c').textContent=k+1;},k*1000);};
  const grow=(big,ms)=>{br.style.transitionDuration=ms+'ms';br.classList.toggle('big',big);};
  const breath=()=>{const t=THEMES[th],talk=n<2;
    $('#br-e').textContent=t.in;txt(_(t.ti));if(talk)say(_(t.ti));else tone([330,392],.5);grow(true,T.i);count(T.i);
    if(T.h)later(()=>{txt(_('Aguanta un poquito…'));$('#br-c').textContent='';},T.i);
    later(()=>{$('#br-e').textContent=t.out;txt(_(t.to));if(talk)say(_(t.to));else tone([392,330],.6);grow(false,T.o);count(T.o);},T.i+T.h);
    later(()=>{n++;dots();$('#br-c').textContent='';if(n<N){breath();return;}
      run=false;star();yay();txt(_('¡Muy bien! Respirar despacio calma el cuerpo y la cabeza.'));
      say(_('¡Muy bien! Respirar despacio calma el cuerpo y la cabeza.')+' '+_('Puedes hacerlo siempre que sientas nervios o enfado.'));
      $('#br-go').textContent=_('Otra vez');$('#br-go').hidden=false;},T.i+T.h+T.o);};
  const go=()=>{if(run)return;clearTimers();run=true;n=0;dots();$('#br-go').hidden=true;breath();};
  $('#br-go').onclick=go;br.onclick=go;
  $('#br-th').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;th=+b.dataset.i;clearTimers();run=false;grow(false,300);
    $('#br-th').querySelectorAll('[data-i]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#br-e').textContent=THEMES[th].in;$('#br-c').textContent='';
    $('#br-go').textContent=_('Empezar');$('#br-go').hidden=false;txt(_('Toca «Empezar» y respira conmigo.'));};
  dots();say(_('Toca «Empezar» y respira conmigo.'));
}

/* ---------- mi mascota ----------
   Pide comer, beber, jugar, bañarse, dormir y mimos. Lo que necesita baja poco a poco (también con la web cerrada),
   pero nunca enferma ni se va: como mucho se pone triste y se alegra al volver. Se guarda solo en este aparato. */
const PET_NEEDS=[
  {k:'comer',e:'🍎',a:N_('Dar de comer'),w:N_('{P} tiene hambre.'),d:N_('¡Ñam, ñam! ¡Qué rico!')},
  {k:'beber',e:'💧',a:N_('Dar agua'),w:N_('{P} tiene sed.'),d:N_('¡Glu, glu! Ya no tiene sed.')},
  {k:'jugar',e:'⚽',a:N_('Jugar'),w:N_('{P} quiere jugar.'),d:N_('¡Qué divertido! Le encanta jugar contigo.')},
  {k:'banar',e:'🛁',a:N_('Bañar'),w:N_('{P} necesita un baño.'),d:N_('¡Ahora huele muy bien!')},
  {k:'dormir',e:'🛏️',a:N_('Dormir'),w:N_('{P} tiene sueño.'),d:N_('Shhh… Ya ha descansado.')},
  {k:'mimos',e:'❤️',a:N_('Dar mimos'),w:N_('{P} quiere mimos.'),d:N_('Le encantan tus mimos.')}];
function mascota(){
  let pet=store.get('mascota',null);
  const info=()=>D.PETS.find(p=>p.e===pet.e),vars=()=>{const p=info();return {p:p.p,P:cap(p.p),g:p.g};};
  const save=()=>{pet.t=Date.now();store.set('mascota',pet);};
  const choose=()=>{
    $('#stage').innerHTML=`<div class="screen"><p class="prompt">${_('Elige tu mascota')}</p>
      <div class="choices" id="pets">${D.PETS.map(p=>`<button class="tile pic" data-e="${p.e}" aria-label="${esc(p.n)}">${p.e}<small>${esc(p.n)}</small></button>`).join('')}</div></div>`;
    say(_('Elige tu mascota'));
    $('#pets').onclick=e=>{const b=e.target.closest('[data-e]');if(!b)return;
      pet={e:b.dataset.e,v:Object.fromEntries(PET_NEEDS.map(x=>[x.k,80])),t:Date.now()};save();tone([600,800],.08);play(true);};
  };
  if(!pet||!D.PETS.some(p=>p.e===pet.e)){choose();return;}
  play(false);
  function play(nueva){
    // lo que ha bajado mientras no estaba: unos 10 puntos por hora, y nunca por debajo de 15
    const h=(Date.now()-(pet.t||Date.now()))/3600000,miss=h>12;
    PET_NEEDS.forEach(x=>{pet.v[x.k]=Math.max(15,Math.min(100,(pet.v[x.k]??80)-h*(8+rnd(5))));});save();
    $('#stage').innerHTML=`<div class="screen pet-screen"><p class="prompt" id="pt-t"></p>
      <div class="pet-home" id="ph"><span class="want" id="pw" hidden></span><span class="pet" id="pp">${pet.e}</span><span class="fx" id="pf"></span></div>
      <div class="acts" id="pa">${PET_NEEDS.map(x=>`<button class="act-btn" data-k="${x.k}" aria-label="${_(x.a)}"><span>${x.e}</span><i><b data-bar="${x.k}"></b></i></button>`).join('')}</div>
      <div class="row"><button class="pill" id="pc">${_('Cambiar de mascota')}</button></div></div>`;
    const V=vars();
    const want=()=>{const low=PET_NEEDS.filter(x=>pet.v[x.k]<50).sort((a,b)=>pet.v[a.k]-pet.v[b.k]);return low[0]||null;};
    const bars=()=>PET_NEEDS.forEach(x=>{const b=$(`[data-bar="${x.k}"]`);if(b)b.style.width=pet.v[x.k]+'%';});
    const paint=(talk,extra)=>{const w=want();bars();$('#pw').hidden=!w;$('#ph').classList.toggle('sad',!!w);
      if(w)$('#pw').textContent='💭'+w.e;
      const t=w?_(w.w,V):_('¡{P} está feliz! Cuidar de alguien es muy bonito.',V);$('#pt-t').innerHTML=`<span class="long">${esc(t)}</span>`;
      if(talk)say((extra?extra+' ':'')+t);};
    // de vez en cuando le apetece algo nuevo, para que siempre haya algo que hacer
    const tick=()=>{later(()=>{if(!want()){const x=pick(PET_NEEDS);pet.v[x.k]=range(25,45);save();paint(true);}tick();},range(14000,22000));};
    const fx=e=>{const f=$('#pf');f.textContent=e;f.classList.remove('go');void f.offsetWidth;f.classList.add('go');};
    $('#pa').onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;const x=PET_NEEDS.find(n=>n.k===b.dataset.k),w=want();
      if(w&&w!==x){anim(b,'wobble');tone([330],.12);say(_('Ahora no le apetece eso.',V)+' '+_(w.w,V));return;}
      pet.v[x.k]=100;save();fx(x.e);anim($('#pp'),'pop');
      if(x.k==='dormir'){$('#ph').classList.add('night');later(()=>$('#ph').classList.remove('night'),2600);}
      if(w){yay();star();paint(true,_(x.d,V));if(!want())confetti();}
      else{tone([523,659],.1);bars();say(_('¡A {p} le encanta!',V));}};
    $('#pc').onclick=()=>{clearTimers();choose();};
    if(nueva){paint(true,_('¡Hola! Soy {p}. ¿Me cuidas?',V));later(()=>{const x=pick(PET_NEEDS);pet.v[x.k]=range(25,45);save();paint(true);},5000);}
    else{if(!want()){const x=pick(PET_NEEDS);pet.v[x.k]=range(25,45);save();}paint(true,miss?_('¡{P} te ha echado de menos!',V):'');}
    tick();
  }
}

DATA.es.PETS=[{e:'🐶',n:'Perrito',p:'tu perrito',g:'m'},{e:'🐱',n:'Gatita',p:'tu gatita',g:'f'},{e:'🐰',n:'Conejito',p:'tu conejito',g:'m'},
  {e:'🐢',n:'Tortuga',p:'tu tortuga',g:'f'},{e:'🐹',n:'Hámster',p:'tu hámster',g:'m'},{e:'🐥',n:'Pollito',p:'tu pollito',g:'m'}];

Object.assign(CUSTOM,{respira,mascota});
