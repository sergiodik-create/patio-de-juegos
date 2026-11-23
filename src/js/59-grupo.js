/* Patio de Juegos · Jugar en grupo: una sección aparte para jugar en familia o en clase.
   - Concurso por equipos: de 2 a 6 equipos se turnan para contestar preguntas de los juegos de una edad
     (todos mezclados o de un solo tema). Sirve pasando la tablet o en la pizarra digital, con letra extra grande.
   - Los juegos de mesa (tres en raya, conecta 4, damas y ajedrez), que aquí empiezan en modo «dos jugadores».
   No guarda nombres ni resultados: solo los ajustes del concurso, en este dispositivo. */
const TEAMS=[['🦁',N_('Leones'),'var(--orange)'],['🐬',N_('Delfines'),'var(--blue)'],['🦅',N_('Águilas'),'var(--purple)'],
  ['🐢',N_('Tortugas'),'var(--green)'],['🦊',N_('Zorros'),'var(--red)'],['🐝',N_('Abejas'),'var(--yellow)']];
const QAGES=[['p',N_('2 a 4 años')],['m',N_('5 a 7 años')],['g',N_('8 a 10 años')],['x',N_('11 y 12 años')]];
const GC=Object.assign({equipos:2,edad:'g',tema:'todo',rondas:5,tiempo:0,grande:false},store.get('grupo',{}));

GAMES.push({id:'grupo-concurso',age:'e',pic:'🏆',name:'Concurso por equipos',what:'Preguntas por turnos, en casa o en clase',bg:'var(--green)',custom:'concurso'});
/* Los juegos de mesa también salen aquí. */
['tresraya','conecta','damas','ajedrez'].forEach(id=>{const g=GAMES.find(x=>x.id===id);if(g)g.age+='e';});

/* Juegos de preguntas de una edad que valen para el concurso (los de idiomas no, que hablan en otra lengua). */
const quizGames=a=>GAMES.filter(g=>g.gen&&g.age.includes(a)&&g.age!=='i'&&gameInLang(g));

function concurso(){
  const pills=(grp,list,cur)=>`<div class="row" data-g="${grp}">${list.map(([v,t])=>`<button class="pill" data-v="${v}" aria-pressed="${String(v)===String(cur)}">${t}</button>`).join('')}</div>`;
  const setup=()=>{clearTimers();
    const games=quizGames(GC.edad);if(GC.tema!=='todo'&&!games.some(g=>g.id===GC.tema))GC.tema='todo';
    $('#stage').innerHTML=`<div class="screen gsetup">
      <div class="opt"><b>${_('¿Cuántos equipos?')}</b>${pills('equipos',[2,3,4,5,6].map(n=>[n,TEAMS.slice(0,n).map(t=>t[0]).join('')]),GC.equipos)}</div>
      <div class="opt"><b>${_('Preguntas para')}</b>${pills('edad',QAGES.map(([a,t])=>[a,_(t)]),GC.edad)}</div>
      <div class="opt"><b>${_('Tema')}</b>${pills('tema',[['todo',_('🎲 De todo')],...games.map(g=>[g.id,g.pic+' '+esc(_(g.name))])],GC.tema)}</div>
      <div class="opt"><b>${_('Preguntas por equipo')}</b>${pills('rondas',[3,5,10].map(n=>[n,n]),GC.rondas)}</div>
      <div class="opt"><b>${_('Tiempo para contestar')}</b>${pills('tiempo',[[0,_('Sin límite')],[20,_('20 segundos')],[40,_('40 segundos')]],GC.tiempo)}</div>
      <div class="opt"><b>${_('Pantalla')}</b>${pills('grande',[['false',_('Normal')],['true',_('📺 Pizarra o proyector')]],GC.grande)}</div>
      <button class="again" id="gstart">${_('¡Empezar el concurso!')}</button></div>`;
    $('#stage .gsetup').onclick=e=>{const b=e.target.closest('[data-v]');if(!b)return;const k=b.closest('[data-g]').dataset.g,v=b.dataset.v;
      GC[k]=k==='edad'||k==='tema'?v:k==='grande'?v==='true':+v;store.set('grupo',GC);
      if(k==='edad'){setup();return;}
      b.parentNode.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));};
    $('#gstart').onclick=play;
    say(_('Elegid cuántos equipos sois y de qué van las preguntas.'));focusFirst();};

  let teams,turn,total,asked,busy,startT;  // la pregunta actual va en «round», como en el resto de juegos
  const big=()=>GC.grande?' pizarra':'';
  const board=()=>`<div class="gboard">${teams.map((t,i)=>`<span class="gchip${i===turn%teams.length&&asked<total?' now':''}" style="--c:${t.c}"><span>${t.e}</span><b>${t.p}</b></span>`).join('')}</div>`;
  const team=()=>teams[turn%teams.length];
  const play=()=>{teams=TEAMS.slice(0,GC.equipos).map(([e,n,c])=>({e,n:_(n),c,p:0}));turn=0;asked=0;total=GC.equipos*GC.rondas;ready();};
  /* Pantalla de «le toca a…», para pasar la tablet o para que el equipo se prepare. */
  const ready=()=>{clearTimers();const t=team();
    $('#stage').innerHTML=`<div class="screen${big()}">${board()}<p class="tip">${_('Pregunta {i} de {n}',{i:asked+1,n:total})}</p>
      <div class="gturn" style="background:${t.c}"><span class="pic">${t.e}</span><b>${esc(_('¡Os toca, {t}!',{t:t.n}))}</b></div>
      <button class="again" id="gask">${_('Ver la pregunta')}</button></div>`;
    say(_('¡Os toca, {t}!',{t:t.n}));$('#gask').onclick=ask;focusFirst();};
  const ask=()=>{clearTimers();stopVoice();
    const pool=GC.tema==='todo'?quizGames(GC.edad):quizGames(GC.edad).filter(g=>g.id===GC.tema),g=pick(pool);
    round=g.gen(rnd(g.levels||1));busy=false;const t=team();
    $('#stage').innerHTML=`<div class="screen${big()}">${board()}<p class="gwho" style="color:${t.c}">${t.e} ${esc(t.n)} · ${g.pic} ${esc(_(g.name))}</p>
      ${GC.tiempo?'<div class="bar" aria-hidden="true"><span id="gbar" style="width:100%"></span></div>':''}
      <p class="prompt">${round.prompt}</p>${round.visual?`<div class="visual">${round.visual}</div>`:''}<div class="choices" id="gch"></div>
      <div class="qnav"><button id="gsay" aria-label="${esc(_('Escuchar otra vez'))}" title="${esc(_('Escuchar otra vez'))}">🔊</button></div><p class="status" id="gst"></p></div>`;
    const ch=$('#gch');
    round.opts.forEach(o=>{const b=document.createElement('button');
      if(o.dot){b.className='dot';b.style.background=o.dot;b.dataset.col=colKey(o.dot);if(o.aria)b.innerHTML=`<span class="cname">${esc(o.aria)}</span>`;}
      else{b.className='tile'+(o.cls?' '+o.cls:'');b.innerHTML=o.html;}
      b.dataset.v=o.v;b.setAttribute('aria-label',o.aria||o.v);ch.appendChild(b);});
    ch.onclick=e=>{const b=e.target.closest('button');if(b&&!busy)answer(b);};
    $('#gsay').onclick=()=>say(round.speak);say(round.speak);
    if(GC.tiempo){startT=Date.now();const iv=setInterval(()=>{const left=1-(Date.now()-startT)/(GC.tiempo*1000);const bar=$('#gbar');if(bar)bar.style.width=Math.max(0,left*100)+'%';
      if(left<=0){clearInterval(iv);if(!busy)answer(null);}},100);timers.push(iv);}
    focusFirst();};
  const answer=b=>{busy=true;clearTimers();const t=team(),ok=b&&b.dataset.v===round.answer;
    [...$('#gch').children].forEach(x=>{if(x.dataset.v===round.answer)x.classList.add('right');else x.disabled=true;});
    let msg;
    if(ok){t.p++;anim(b,'pop');yay();confetti();msg=_('¡Punto para {t}!',{t:t.n})+' '+round.right;}
    else{nope();if(b)anim(b,'wobble');msg=(b?_('¡Oh, no era esa!'):_('¡Se acabó el tiempo!'))+' '+round.right;}
    $('#gst').textContent=ok?_('¡Punto para {t}!',{t:t.n}):b?_('¡Oh, no era esa!'):_('¡Se acabó el tiempo!');
    $('#stage .gboard').outerHTML=board();say(msg);asked++;turn++;
    const nx=document.createElement('button');nx.className='again';nx.id='gnext';nx.textContent=asked<total?_('Siguiente ➡️'):_('Ver quién ha ganado 🏆');
    nx.onclick=()=>{stopVoice();asked<total?ready():podium();};$('#stage .screen').appendChild(nx);focusFirst();};
  /* Clasificación: los empatados comparten puesto. */
  const podium=()=>{clearTimers();const order=teams.slice().sort((a,b)=>b.p-a.p),top=order[0].p,win=order.filter(t=>t.p===top);
    let place=0,prev=null;const rows=order.map((t,i)=>{if(t.p!==prev){place=i+1;prev=t.p;}
      return `<div class="prow"><span class="ppic">${['🥇','🥈','🥉'][place-1]||place+'.'}</span><span class="ppic">${t.e}</span><span class="ptxt"><b>${esc(t.n)}</b></span><span class="gpts">${t.p===1?_('1 punto'):_('{n} puntos',{n:t.p})}</span></div>`;}).join('');
    const msg=win.length===1?_('¡Victoria para {t}!',{t:win[0].n}):win.length===teams.length?_('¡Empate! Todos habéis jugado genial.'):_('¡Empate entre {t}!',{t:joinY(win.map(t=>t.n))});
    $('#stage').innerHTML=`<div class="screen${big()}"><p class="prompt">${esc(msg)}</p><div class="perfil">${rows}</div>
      <div class="mbtns"><button class="again" id="gre">${_('Revancha')}</button><button class="again alt" id="gset">${_('Cambiar ajustes')}</button></div></div>`;
    yay();confetti();later(confetti,700);say(msg);$('#gre').onclick=play;$('#gset').onclick=setup;focusFirst();};
  setup();
}
Object.assign(CUSTOM,{concurso});
