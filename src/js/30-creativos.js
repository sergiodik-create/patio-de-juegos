/* Juegos con pantalla propia: colorear, construir, diseñar, inventar cuentos, memoria, globos y adivinar. */
GAMES.push(
 {id:'globos',age:'p',pic:'🎈',name:'Globos',what:'Explota los globos',bg:'var(--pink)',custom:'globos'},
 {id:'memo1',age:'p',pic:'🃏',name:'Parejas',what:'Encuentra las iguales',bg:'var(--teal)',custom:'memoria',pairs:3},
 {id:'torre',age:'p',pic:'🧱',name:'Construir',what:'Haz una torre',bg:'var(--red)',custom:'torre'},
 {id:'colorear',age:'pmgx',pic:'🖍️',name:'Colorear',what:'Pinta con los dedos',bg:'var(--orange)',custom:'colorear'},
 {id:'pegatinas',age:'pmgx',pic:'🏞️',name:'Diseña tu mundo',what:'Espacio, mar, bosque…',bg:'var(--green)',custom:'pegatinas'},
 {id:'cuento',age:'pmt',pic:'🦄',name:'Inventa un cuento',what:'Imagina y sueña',bg:'var(--purple)',custom:'cuento'},
 {id:'memo2',age:'m',pic:'🃏',name:'Memoria',what:'Seis parejas',bg:'var(--pink)',custom:'memoria',pairs:6},
 {id:'memo3',age:'gx',pic:'🃏',name:'Memoria experta',what:'Ocho parejas',bg:'var(--pink)',custom:'memoria',pairs:8},
 {id:'adivina',age:'gx',pic:'🔍',name:'Adivina el número',what:'Del 1 al 100',bg:'var(--teal)',custom:'adivina'},
);
/* ---------- colorear ---------- */
const starPts=(cx,cy,R,r)=>Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,d=i%2?r:R;return (cx+d*Math.cos(a)).toFixed(1)+','+(cy+d*Math.sin(a)).toFixed(1);}).join(' ');
const DRAWINGS=[
  {n:'la casa',svg:`<rect data-r x="0" y="160" width="200" height="40"/><circle data-r cx="165" cy="35" r="20"/><rect data-r x="122" y="48" width="14" height="30"/>
    <rect data-r x="40" y="90" width="110" height="70"/><polygon data-r points="30,92 95,40 160,92"/><rect data-r x="82" y="115" width="26" height="45"/>
    <rect data-r x="52" y="105" width="22" height="22"/><rect data-r x="118" y="105" width="22" height="22"/>`},
  {n:'la flor',svg:`<polygon data-r points="70,160 130,160 122,195 78,195"/><rect data-r x="96" y="90" width="8" height="70"/>
    <ellipse data-r cx="78" cy="128" rx="20" ry="9" transform="rotate(-25 78 128)"/><ellipse data-r cx="122" cy="128" rx="20" ry="9" transform="rotate(25 122 128)"/>
    ${[0,1,2,3,4,5].map(k=>`<ellipse data-r cx="100" cy="38" rx="14" ry="22" transform="rotate(${k*60} 100 65)"/>`).join('')}<circle data-r cx="100" cy="65" r="16"/>`},
  {n:'el cohete',svg:`<polygon data-r points="${starPts(32,40,14,6)}"/><polygon data-r points="${starPts(170,75,11,5)}"/><polygon data-r points="${starPts(40,150,10,4)}"/>
    <polygon data-r points="85,160 115,160 100,196"/><polygon data-r points="75,118 52,162 75,152"/><polygon data-r points="125,118 148,162 125,152"/>
    <rect data-r x="75" y="60" width="50" height="100" rx="8"/><path data-r d="M75 62 Q100 0 125 62Z"/><circle data-r cx="100" cy="95" r="13"/>`},
  {n:'el pez',svg:`<circle data-r cx="32" cy="45" r="8"/><circle data-r cx="48" cy="24" r="5"/><path data-r d="M75 68 Q95 35 122 70Z"/>
    <polygon data-r points="140,100 190,65 190,135"/><ellipse data-r cx="95" cy="100" rx="60" ry="38"/>
    <path data-r d="M108 66 Q98 100 108 134 L122 130 Q112 100 122 70Z"/><circle data-r cx="60" cy="92" r="8"/><rect data-r x="0" y="180" width="200" height="20"/>`},
  {n:'el coche',svg:`<rect data-r x="0" y="170" width="200" height="30"/><path data-r d="M55 100 L75 65 H130 L150 100Z"/>
    <rect data-r x="20" y="98" width="165" height="50" rx="12"/><rect data-r x="80" y="72" width="22" height="24"/><rect data-r x="108" y="72" width="22" height="24"/>
    <circle data-r cx="55" cy="150" r="20"/><circle data-r cx="150" cy="150" r="20"/><circle data-r cx="180" cy="115" r="5"/>`},
  {n:'el gato',svg:`<path data-r d="M140 150 Q190 140 175 95" fill="none" style="fill:none"/><ellipse data-r cx="100" cy="145" rx="45" ry="40"/>
    <polygon data-r points="62,70 70,30 95,58"/><polygon data-r points="138,70 130,30 105,58"/><circle data-r cx="100" cy="85" r="40"/>
    <circle data-r cx="85" cy="80" r="7"/><circle data-r cx="115" cy="80" r="7"/><polygon data-r points="94,95 106,95 100,103"/>`}];
const PAINT=['#E8483B','#F28A2E','#F6C431','#3DB46D','#2F7FE0','#8B5BD6','#E25E9C','#8B5A3C','#2B2B2B','#FFFFFF'];
const PAINT_COL=['red','orange','yellow','green','blue','purple','pink','brown','',''];  // dibujo de cada color en modo daltónico
/* Nombres de los colores de la paleta y de los dibujos, en el mismo orden. */
DATA.es.PAINT_NAMES=['rojo','naranja','amarillo','verde','azul','morado','rosa','marrón','negro','blanco'];
DATA.es.DRAWING_NAMES=['la casa','la flor','el cohete','el pez','el coche','el gato'];
function colorear(){
  let di=0,ci=0;
  const draw=()=>{
    $('#stage').innerHTML=`<div class="screen"><p class="prompt">${_('Colorea {x}',{x:D.DRAWING_NAMES[di]})}</p>
      <div class="palette" id="pal">${PAINT.map((c,i)=>`<button style="background:${c}" data-col="${PAINT_COL[i]}" data-i="${i}" aria-label="${D.PAINT_NAMES[i]}" aria-pressed="${i===ci}"><span class="cname">${D.PAINT_NAMES[i]}</span></button>`).join('')}</div>
      <div class="paper"><svg viewBox="0 0 200 200" id="pic" fill="#fff">${DRAWINGS[di].svg}</svg></div>
      <div class="row"><button class="pill" id="clr">${_('Borrar')}</button><button class="pill" id="nxt">${_('Otro dibujo ➜')}</button></div></div>`;
    say(_('Elige un color y toca el dibujo'));
    $('#pal').onclick=e=>{const b=e.target.closest('button');if(!b)return;ci=+b.dataset.i;
      [...$('#pal').children].forEach(x=>x.setAttribute('aria-pressed',String(x===b)));say(D.PAINT_NAMES[ci]);tone([600],.06);};
    $('#pic').onclick=e=>{const r=e.target.closest('[data-r]');if(!r||r.style.fill==='none')return;r.setAttribute('fill',PAINT[ci]);tone([700,900],.05);};
    $('#clr').onclick=()=>{document.querySelectorAll('#pic [data-r]').forEach(r=>r.removeAttribute('fill'));};
    $('#nxt').onclick=()=>{di=(di+1)%DRAWINGS.length;draw();};
  };
  draw();
}

/* ---------- construir ---------- */
function torre(){
  let n=0,lock=false;
  $('#stage').innerHTML=`<div class="screen"><p class="prompt" id="tp">${_('Toca un color para poner un bloque')}</p><div class="tower" id="tw"></div>
    <div class="palette" id="tc">${D.COLORS.map(c=>`<button style="background:${c.c}" data-col="${colKey(c.c)}" data-n="${c.n}" data-c="${c.c}" aria-label="${c.n}"><span class="cname">${c.n}</span></button>`).join('')}</div>
    <div class="row"><button class="pill" id="fall">${_('¡Derribar!')}</button></div></div>`;
  say(_('Vamos a construir una torre. Toca un color.'));
  const fall=()=>{lock=true;const bl=[...$('#tw').children];tone([300,200,120],.15);
    bl.forEach(b=>{b.style.transform=`translate(${range(-160,160)}px,${range(40,200)}px) rotate(${range(-90,90)}deg)`;b.style.opacity='0';});
    timers.push(setTimeout(()=>{$('#tw').innerHTML='';n=0;lock=false;$('#tp').textContent=_('Toca un color para poner un bloque');},950));};
  $('#tc').onclick=e=>{const b=e.target.closest('button');if(!b||lock)return;n++;
    const d=document.createElement('div');d.className='block';d.style.background=b.dataset.c;d.dataset.col=colKey(b.dataset.c);d.style.width=range(55,95)+'%';$('#tw').appendChild(d);
    tone([300+n*50],.1);say(D.NUMWORDS[n]+'. '+b.dataset.n);$('#tp').textContent=_('Bloques: {n}',{n});
    if(n===10){lock=true;star();confetti();timers.push(setTimeout(()=>{say(_('¡Qué torre tan alta! ¡Vamos a derribarla!'));},900));timers.push(setTimeout(fall,3200));}};
  $('#fall').onclick=()=>{if(!lock&&n)fall();};
}

/* ---------- diseñar ---------- */
const SCENES=[
  {n:N_('Espacio'),bg:'radial-gradient(circle at 70% 20%,#3b4a9a,#0b1a3a 70%)',s:['🚀','🪐','🌙','⭐','👽','🛸','☄️','🌍','👩‍🚀','🛰️']},
  {n:N_('Mar'),bg:'linear-gradient(#8fdcf5,#1f6fb0)',s:['🐠','🐙','🐬','🦀','🐳','🐚','🪸','🐢','🧜','⛵']},
  {n:N_('Bosque'),bg:'linear-gradient(#bfe8f3 58%,#7cc46b 58%)',s:['🌳','🌲','🍄','🦊','🐻','🦉','🌸','🦋','🏕️','🐿️']},
  {n:N_('Granja'),bg:'linear-gradient(#cdeefa 58%,#9bd16a 58%)',s:['🏡','🐮','🐷','🐔','🐴','🚜','🌻','🐑','☀️','🌈']},
  {n:N_('Ciudad'),bg:'linear-gradient(#ffd9b8 55%,#9aa7b0 55%)',s:['🏢','🏠','🚗','🚌','🚲','🌳','🚦','🎡','🏪','👫']}];
function pegatinas(){
  let si=0;
  /* Las pegatinas ganadas en el álbum se pueden usar en una escena propia. */
  const all=P.pegatinas.length?[...SCENES,{n:N_('📒 Mis pegatinas'),bg:'linear-gradient(#fff4d6,#ffd98a)',s:P.pegatinas}]:SCENES;
  const draw=()=>{const sc=all[si];
    $('#stage').innerHTML=`<div class="screen"><div class="row" id="scn">${all.map((x,i)=>`<button class="pill" data-i="${i}" aria-pressed="${i===si}">${_(x.n)}</button>`).join('')}</div>
      <div class="scene" id="sc" style="background:${sc.bg}" aria-label="${esc(_(sc.n))}"></div>
      <div class="stickers" id="stk">${sc.s.map(x=>`<button data-s="${x}" aria-label="${x}">${x}</button>`).join('')}</div>
      <div class="row"><button class="pill" id="wipe">${_('Borrar todo')}</button></div></div>`;
    say(_('Toca los dibujos para ponerlos en tu mundo. Para moverlos, arrástralos o tócalos y luego toca el sitio nuevo.'));
    const scene=$('#sc');
    $('#scn').onclick=e=>{const b=e.target.closest('[data-i]');if(b){si=+b.dataset.i;draw();}};
    $('#wipe').onclick=()=>{scene.innerHTML='';};
    $('#stk').onclick=e=>{const b=e.target.closest('[data-s]');if(!b||scene.children.length>=40)return;
      const s=document.createElement('span');s.className='stk';s.textContent=b.dataset.s;s.style.left=range(15,85)+'%';s.style.top=range(15,85)+'%';
      scene.appendChild(s);tone([660,880],.06);};
    let drag=null,moved=false,sel=null,x0=0,y0=0;
    const place=(el,e)=>{const r=scene.getBoundingClientRect();
      el.style.left=Math.min(100,Math.max(0,(e.clientX-r.left)/r.width*100))+'%';el.style.top=Math.min(100,Math.max(0,(e.clientY-r.top)/r.height*100))+'%';};
    scene.onpointerdown=e=>{const s=e.target.closest('.stk');e.preventDefault();
      if(!s){if(sel){place(sel,e);sel.classList.remove('sel');sel=null;tone([520],.05);}return;}
      drag=s;moved=false;x0=e.clientX;y0=e.clientY;s.setPointerCapture(e.pointerId);scene.appendChild(s);};
    scene.onpointermove=e=>{if(!drag)return;if(Math.abs(e.clientX-x0)+Math.abs(e.clientY-y0)>8)moved=true;if(moved)place(drag,e);};
    scene.onpointerup=scene.onpointercancel=()=>{if(drag&&!moved){if(sel&&sel!==drag)sel.classList.remove('sel');
        sel=sel===drag?null:drag;drag.classList.toggle('sel',sel===drag);}drag=null;};
  };
  draw();
}

/* ---------- inventa un cuento ----------
   Cada idioma trae sus personajes, lugares y objetos y su propia forma de contar (D.STORY.tell). */
DATA.es.STORY={
  ask:['¿Quién es el protagonista?','¿Dónde vive?','¿Qué encuentra?'],
  heroes:[['🐉','un dragón','el dragón'],['🧚','un hada','el hada'],['🤖','un robot','el robot'],['🦄','un unicornio','el unicornio'],['🐢','una tortuga','la tortuga'],['🐻','un osito','el osito']],
  places:[['🌌','el espacio'],['🌊','el fondo del mar'],['🏰','un castillo de nubes'],['🌳','un bosque encantado'],['🏝️','una isla de caramelo']],
  objects:[['⭐','una estrella mágica'],['🎈','un globo gigante'],['🗝️','una llave dorada'],['🍪','una galleta que hablaba'],['🎨','un pincel que pintaba sueños']],
  tell(h,p,o){const [,hi,hd]=h,[,pl]=p,[,ob]=o;
    return [
      `Había una vez ${hi} que vivía en ${pl}.`,
      pick([`Una mañana, mientras jugaba, encontró ${ob}.`,`Un día muy tranquilo, apareció ${ob} justo delante.`]),
      pick([`${cap(ob)} brillaba tanto que todo a su alrededor se llenó de colores.`,`De repente, ${ob} empezó a dar saltitos y a cantar una canción muy divertida.`,`Cuando ${hd} ${ob.startsWith('un ')?'lo':'la'} tocó, sintió unas cosquillas mágicas en la barriga.`]),
      pick(['Juntos viajaron hasta lo más alto, donde las nubes saben a algodón de azúcar.','Por el camino conocieron a muchos amigos nuevos que querían jugar.','Encontraron un tesoro escondido lleno de risas y abrazos.','Ayudaron a un pajarito perdido a volver con su familia.']),
      pick([`Al final del día, ${hd} volvió a casa, cerró los ojos y soñó con nuevas aventuras. Fin.`,`Y desde aquel día, ${hd} sabe que los sueños se cumplen cuando los compartimos. Fin.`])];}
};
function cuento(){
  const ST=D.STORY,pickd=[],lists=[ST.heroes,ST.places,ST.objects];
  const ask=k=>{const q=ST.ask[k],opts=sample(lists[k],3);
    $('#stage').innerHTML=`<div class="screen"><p class="prompt">${esc(q)}</p><div class="choices" id="cc">${opts.map((x,i)=>`<button class="tile pic" data-i="${i}"><span>${x[0]}</span><small>${esc(x[1])}</small></button>`).join('')}</div></div>`;
    say(q);
    $('#cc').onclick=e=>{const b=e.target.closest('button');if(!b)return;pickd[k]=opts[+b.dataset.i];tone([600,800],.07);
      if(k<2)ask(k+1);else tell();};};
  const tell=()=>{const lines=ST.tell(...pickd);
    $('#stage').innerHTML=`<div class="screen"><div class="story"><div class="pics">${pickd.map(x=>x[0]).join('')}</div>${lines.map(l=>`<p>${esc(l)}</p>`).join('')}</div>
      <div class="row"><button class="pill" id="again">${_('Escuchar otra vez')}</button><button class="pill" id="new">${_('Otro cuento ➜')}</button></div></div>`;
    const full=lines.join(' ');say(full);confetti();star();
    $('#again').onclick=()=>say(full);$('#new').onclick=()=>ask(0);};
  ask(0);
}

/* ---------- memoria ---------- */
function memoria(pairs){
  const pool=['🐶','🐱','🦁','🐸','🐵','🐼','🦊','🐰','🐯','🐨','🐷','🐮'],faces=sample(pool,pairs);
  const deck=shuffle([...faces,...faces]),cols=pairs<=3?3:4;
  $('#stage').innerHTML=`<div class="screen"><p class="prompt">${_('Encuentra las parejas')}</p><div class="mem" style="grid-template-columns:repeat(${cols},auto)">${
    deck.map((f,i)=>`<button class="card" data-f="${f}" aria-label="${_('Carta')} ${i+1}">${f}</button>`).join('')}</div></div>`;
  say(_('Encuentra las parejas iguales'));
  let open=[],found=0,lock=false;
  $('#stage').onclick=e=>{const c=e.target.closest('.card');if(!c||lock||c.classList.contains('up'))return;
    c.classList.add('up');c.setAttribute('aria-label',c.dataset.f);tone([500],.08);open.push(c);
    if(open.length<2)return;const [a,b]=open;open=[];
    if(a.dataset.f===b.dataset.f){a.classList.add('done');b.classList.add('done');found++;yay();star();
      if(found===pairs){confetti();say(_('¡Las encontraste todas!'));
        timers.push(setTimeout(()=>{const p=document.querySelector('#stage .screen');const btn=document.createElement('button');btn.className='again';btn.textContent=_('Otra vez');btn.onclick=()=>{$('#stage').onclick=null;memoria(pairs);};p.appendChild(btn);},900));}
      else say(pick([_('¡Pareja!'),_('¡Muy bien!'),_('¡Iguales!')]));}
    else{lock=true;nope();timers.push(setTimeout(()=>{a.classList.remove('up');b.classList.remove('up');a.setAttribute('aria-label',_('Carta'));b.setAttribute('aria-label',_('Carta'));lock=false;},950));}
  };
}

/* ---------- globos ---------- */
function globos(){
  $('#stage').onclick=null;
  $('#stage').innerHTML=`<div class="screen"><p class="counter" id="cnt">${_('Globos: {n}',{n:0})}</p><div class="sky" id="sky"></div></div>`;
  say(_('¡Explota los globos!'));let n=0;const sky=$('#sky');
  const spawn=()=>{if(!document.body.contains(sky))return;const c=pick(D.COLORS),b=document.createElement('button');
    b.className='balloon';b.style.background=c.c;b.dataset.col=colKey(c.c);b.style.left=range(2,78)+'%';b.style.animationDuration=range(55,85)/10+'s';
    b.setAttribute('aria-label',_('globo {c}',{c:c.n}));b.innerHTML=`<span class="cname">${c.n}</span>`;if(S.calma)b.style.animationDuration=range(90,120)/10+'s';
    b.addEventListener('pointerdown',ev=>{ev.preventDefault();if(!b.isConnected)return;const r=sky.getBoundingClientRect(),br=b.getBoundingClientRect();
      const boom=document.createElement('span');boom.className='boom';boom.textContent='💥';boom.style.left=(br.left-r.left+20)+'px';boom.style.top=(br.top-r.top+20)+'px';
      sky.appendChild(boom);timers.push(setTimeout(()=>boom.remove(),450));b.remove();n++;$('#cnt').textContent=_('Globos: {n}',{n});
      tone([880,1320],.06);say(c.n);if(n%10===0){confetti();star();}});
    b.addEventListener('animationend',()=>b.remove());sky.appendChild(b);};
  spawn();timers.push(setInterval(spawn,S.calma?1800:1100));
}

/* ---------- adivina ---------- */
function adivina(){
  $('#stage').onclick=null;
  const secret=range(1,100);let txt='',tries=0;
  $('#stage').innerHTML=`<div class="screen"><p class="prompt" id="hint">${_('Pienso un número del 1 al 100')}</p><p class="guess" id="g">&nbsp;</p>
    <div class="pad" id="pad">${[1,2,3,4,5,6,7,8,9].map(d=>`<button data-d="${d}">${d}</button>`).join('')}<button data-d="del" aria-label="${_('Borrar')}">⌫</button><button data-d="0">0</button><button data-d="ok" class="go" aria-label="${_('Probar')}">✓</button></div>
    <div class="hist" id="hist"></div></div>`;
  say(_('Pienso un número del 1 al 100. ¿Cuál es?'));
  $('#pad').onclick=e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset.d;
    if(d==='del')txt=txt.slice(0,-1);
    else if(d==='ok'){const v=+txt;if(!v||v>100){say(_('Escribe un número del 1 al 100'));return;}tries++;txt='';
      const h=document.createElement('span');h.textContent=v;$('#hist').appendChild(h);
      if(v===secret){$('#hint').textContent=tries===1?_('¡Era el {n}! Lo lograste en {t} intento.',{n:secret,t:tries}):_('¡Era el {n}! Lo lograste en {t} intentos.',{n:secret,t:tries});say($('#hint').textContent);yay();confetti();star();
        const p=document.querySelector('#stage .screen'),btn=document.createElement('button');btn.className='again';btn.textContent=_('Jugar otra vez');btn.onclick=adivina;p.appendChild(btn);$('#pad').onclick=null;}
      else{const t=v<secret?_('Es mayor que {v}',{v}):_('Es menor que {v}',{v});$('#hint').textContent=t;say(t);nope();}}
    else if(txt.length<3)txt+=d;
    $('#g').textContent=txt||' ';tone([520],.05);};
}

Object.assign(CUSTOM,{memoria:g=>memoria(g.pairs),globos,adivina,colorear,torre,pegatinas,cuento});
