/* Patio de Juegos · Gimnasio mental (8 a 12 años): una sección aparte, con su propia tarjeta en el inicio.
   Cinco áreas: lógica visual (matrices), series de números, relaciones (analogías con dibujos),
   memoria (casillas que se encienden, como los bloques de Corsi) y rapidez (encontrar el gemelo).
   Cada área se puede practicar sola, y el «circuito completo» las hace todas seguidas y termina con un perfil.
   No es un test de inteligencia: no da un CI ni compara con otros niños, porque eso solo lo puede hacer una prueba
   baremada pasada por un profesional. El perfil dice con palabras amables cómo le ha ido hoy en cada área,
   y se guarda solo en este dispositivo (los últimos 10 circuitos). */
const M=Object.assign({nivel:{},hist:[]},store.get('mente',{}));
const saveM=()=>store.set('mente',M);

const MAREAS=[
  {id:'matrices',pic:'🔷',name:N_('Lógica visual'),what:N_('¿Qué figura falta?'),bg:'var(--blue)'},
  {id:'series',pic:'🔢',name:N_('Series'),what:N_('¿Qué número sigue?'),bg:'var(--purple)'},
  {id:'relaciones',pic:'🔗',name:N_('Relaciones'),what:N_('Parejas que van igual'),bg:'var(--orange)'},
  {id:'memoria',pic:'💡',name:N_('Memoria'),what:N_('Repite el camino de luces'),bg:'var(--teal)'},
  {id:'rapidez',pic:'⚡',name:N_('Rapidez'),what:N_('Encuentra el gemelo'),bg:'var(--pink)'}];
const MINSTR={
  matrices:N_('Mira las filas: cada una sigue una regla. Elige la figura que va en el hueco.'),
  series:N_('Descubre la regla de los números y elige el que va en el hueco.'),
  relaciones:N_('Mira cómo van juntos los dos de arriba. Elige el que va igual con el de abajo.'),
  memoria:N_('Se encienden unas casillas, una detrás de otra. Cuando terminen, tócalas en el mismo orden.'),
  rapidez:N_('Busca el dibujo igual al de arriba lo más rápido que puedas. Tienes 40 segundos.')};
/* Cinco escalones para el perfil: siempre en positivo. */
const MLAB=[N_('Empezando'),N_('Creciendo'),N_('Fuerte'),N_('Muy fuerte'),N_('Excelente')];
const MPIC=['🌱','🌿','🌳','⭐','🚀'];
const mName=id=>_(MAREAS.find(a=>a.id===id).name);
/* «a, b y c» en el idioma de la pantalla. */
const joinY=l=>l.length<2?(l[0]||''):_('{a} y {b}',{a:l.slice(0,-1).join(LANG==='ar'?'، ':', '),b:l[l.length-1]});
const clampLv=n=>Math.max(1,Math.min(5,n));

GAMES.push(
 {id:'mente-circuito',age:'r',pic:'🏅',name:'Circuito completo',what:'Las cinco pruebas y tu perfil',bg:'var(--green)',custom:'menteCircuito'},
 ...MAREAS.map(a=>({id:'mente-'+a.id,age:'r',pic:a.pic,name:a.name,what:a.what,bg:a.bg,custom:'mentePractica',area:a.id})));

/* ---------- lógica visual: matrices 3 × 3 ----------
   Cada casilla tiene forma, color, cuántas figuras hay y relleno. En cada puzle unas cosas se quedan igual y otras cambian
   con una regla: por columnas, por filas o como un cuadrado latino (cada valor una vez en cada fila y columna).
   Cuanto más alto el nivel, más cosas cambian a la vez y con reglas más difíciles. En modo daltónico el color no cambia nunca. */
const MX_COL=[['red','#E8483B'],['blue','#2F7FE0'],['green','#3DB46D'],['purple','#8B5BD6'],['orange','#F28A2E']];
const MX_SHAPES=['circle','square','triangle','diamond','star','plus','hexagon'];
const MX_LEVELS=[[['col'],['row']],[['col','row'],['col','col']],[['latin','col'],['latin','row']],
  [['latin','latin2'],['latin','col','row']],[['latin','latin2','col'],['latin','latin2','latin']]];
const MX_ATTR={s:N_('la forma'),c:N_('el color'),n:N_('cuántas hay'),f:N_('el relleno')};
function mxShape(k,cx,cy,r,st){
  const P=pts=>`<polygon points="${pts.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" ${st}/>`;
  const poly=(n,rot)=>Array.from({length:n},(_x,i)=>{const a=rot+i*2*Math.PI/n;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];});
  if(k==='circle')return `<circle cx="${cx}" cy="${cy}" r="${(r*.9).toFixed(1)}" ${st}/>`;
  if(k==='square')return `<rect x="${(cx-r*.78).toFixed(1)}" y="${(cy-r*.78).toFixed(1)}" width="${(r*1.56).toFixed(1)}" height="${(r*1.56).toFixed(1)}" rx="${(r*.12).toFixed(1)}" ${st}/>`;
  if(k==='triangle')return P(poly(3,-Math.PI/2).map(([x,y])=>[x,y+r*.18]));
  if(k==='diamond')return P(poly(4,-Math.PI/2));
  if(k==='hexagon')return P(poly(6,0));
  if(k==='star')return P(Array.from({length:10},(_x,i)=>{const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;return [cx+q*Math.cos(a),cy+q*Math.sin(a)];}));
  const w=r*.34;return P([[-w,-r],[w,-r],[w,-w],[r,-w],[r,w],[w,w],[w,r],[-w,r],[-w,w],[-r,w],[-r,-w],[-w,-w]].map(([x,y])=>[cx+x,cy+y]));
}
function mxCell(c){
  const col=c.c[1],st=[`fill="${col}"`,`fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="5" stroke-linejoin="round"`,
    `fill="none" stroke="${col}" stroke-width="6" stroke-linejoin="round"`][c.f];
  const pos={1:[[50,50,32]],2:[[27,50,20],[73,50,20]],3:[[50,27,18],[27,71,18],[73,71,18]]}[c.n];
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${pos.map(([x,y,r])=>mxShape(c.s,x,y,r,st)).join('')}</svg>`;
}
const mxKey=c=>[c.s,c.c[0],c.n,c.f].join('-');
function genMatriz(l){
  const attrs=S.daltonico?['s','n','f']:['s','c','n','f'],rules=pick(MX_LEVELS[l]),vary=sample(attrs,rules.length);
  const vals={s:sample(MX_SHAPES,3),c:S.daltonico?[MX_COL[1],MX_COL[1],MX_COL[1]]:sample(MX_COL,3),n:shuffle([1,2,3]),f:shuffle([0,1,2])};
  const rule={s:'const',c:'const',n:'const',f:'const'};vary.forEach((a,i)=>{rule[a]=rules[i];});
  const at=(r,i,j)=>({const:0,col:j,row:i,latin:(i+j)%3,latin2:(i+2*j)%3})[r];
  const cell=(i,j)=>({s:vals.s[at(rule.s,i,j)],c:vals.c[at(rule.c,i,j)],n:vals.n[at(rule.n,i,j)],f:vals.f[at(rule.f,i,j)]});
  const ans=cell(2,2),swap=(b,a,v)=>Object.assign({},b,{[a]:v}),others=a=>shuffle(vals[a].filter(v=>v!==ans[a]));
  /* Opciones falsas: primero las que solo fallan en una de las cosas que cambian, luego en dos, y al final en una que no cambia. */
  const one=shuffle(vary.flatMap(a=>others(a).map(v=>swap(ans,a,v))));
  const two=shuffle(vary.flatMap((a,i)=>vary.slice(i+1).map(b=>swap(swap(ans,a,others(a)[0]),b,others(b)[0]))));
  const fixed=shuffle(attrs.filter(a=>!vary.includes(a)).map(a=>swap(ans,a,others(a)[0])));
  const n=l<2?4:6,opts=[ans],seen=new Set([mxKey(ans)]);
  for(const c of [...one,...two,...fixed]){if(opts.length>=n)break;if(!seen.has(mxKey(c))){seen.add(mxKey(c));opts.push(c);}}
  const grid=[0,1,2].flatMap(i=>[0,1,2].map(j=>i===2&&j===2?'<span class="mc q">?</span>':`<span class="mc">${mxCell(cell(i,j))}</span>`)).join('');
  const what=joinY(vary.map(a=>_(MX_ATTR[a])));
  return {prompt:_('¿Qué figura va en el hueco?'),speak:_('¿Qué figura va en el hueco?'),visual:`<div class="mx">${grid}</div>`,answer:mxKey(ans),
    opts:shuffle(opts).map(c=>({html:mxCell(c),v:mxKey(c),cls:'mxo'})),
    right:_('Lo que cambia es {x}, y cada fila sigue la misma regla.',{x:what}),wrong:_('Mira fila por fila: ¿qué cambia y qué se queda igual?')};
}

/* ---------- series de números ---------- */
const SR_LEVELS=[['suma','resta'],['suma','doble','dos'],['crece','triple','resta','dos'],['mezcla','fibo','cuadrados'],['dobla','cuadrados1','mezcla','fibo']];
function genSerie(l){
  const k=pick(SR_LEVELS[l]),s=[];let why;
  if(k==='suma'){const d=l?range(6,12):range(2,5),a=range(1,12);for(let i=0;i<6;i++)s.push(a+i*d);why=_('Cada número suma {d}.',{d});}
  else if(k==='resta'){const d=l?range(6,9):range(2,5),a=d*6+range(2,20);for(let i=0;i<6;i++)s.push(a-i*d);why=_('Cada número resta {d}.',{d});}
  else if(k==='doble'){const a=range(1,5);for(let i=0;i<6;i++)s.push(a*2**i);why=_('Cada número es el doble del anterior.');}
  else if(k==='triple'){const a=range(1,3);for(let i=0;i<6;i++)s.push(a*3**i);why=_('Cada número es el triple del anterior.');}
  else if(k==='dos'){const p=range(1,4),q=range(5,9);s.push(range(1,10));for(let i=1;i<6;i++)s.push(s[i-1]+(i%2?p:q));why=_('Se suma {p}, luego {q}, y así por turnos.',{p,q});}
  else if(k==='crece'){const d=range(1,3);s.push(range(1,10));for(let i=1;i<6;i++)s.push(s[i-1]+d+i-1);why=_('Cada vez se suma uno más que la vez anterior.');}
  else if(k==='mezcla'){const a=range(1,9),b=range(20,40),p=range(1,4),q=range(2,5);for(let i=0;i<3;i++)s.push(a+i*p,b+i*q);
    why=_('Hay dos series mezcladas: una suma {p} y la otra suma {q}.',{p,q});}
  else if(k==='fibo'){const a=range(1,4);s.push(a,range(a,a+3));for(let i=2;i<6;i++)s.push(s[i-1]+s[i-2]);why=_('Cada número es la suma de los dos anteriores.');}
  else if(k==='cuadrados'){const t=range(1,4);for(let i=0;i<6;i++)s.push((t+i)**2);why=_('Son números multiplicados por sí mismos: {a} × {a}, {b} × {b}…',{a:t,b:t+1});}
  else if(k==='cuadrados1'){const t=range(1,4);for(let i=0;i<6;i++)s.push((t+i)**2+1);why=_('Son números multiplicados por sí mismos, más 1.');}
  else{const d=range(1,3);s.push(range(1,10));for(let i=1;i<6;i++)s.push(s[i-1]+d*2**(i-1));why=_('Lo que se suma se dobla cada vez.');}
  /* En los niveles altos, a veces el hueco está en medio. En las series mezcladas siempre al final. */
  const h=l>=2&&k!=='mezcla'&&rnd(3)===0?3:5,ans=s[h],prev=h===5?s[4]:s[2],naive=prev+(prev-(h===5?s[3]:s[1]));
  const o=new Set([ans]);for(const v of [naive,...shuffle([ans+1,ans-1,ans+2,ans-2,ans+10,ans-10])])if(o.size<4&&v>=0&&v!==ans)o.add(v);
  const cls=[...o].some(v=>v>99)?'word':'num';
  return {prompt:_('¿Qué número va en el hueco?'),speak:_('¿Qué número va en el hueco?'),answer:String(ans),
    visual:`<div class="srow">${s.map((v,i)=>i===h?'<span class="box q">?</span>':`<span class="box">${v}</span>`).join('')}</div>`,
    opts:shuffle([...o]).map(v=>({html:String(v),v:String(v),cls})),right:why,wrong:_('Mira cuánto cambia de un número al siguiente.')};
}

/* ---------- relaciones: analogías con dibujos ----------
   «Esto va con esto; ¿qué va igual con aquello?». Solo dibujos, así que vale para todos los idiomas.
   Cada grupo es una manera de ir juntos, con su explicación. */
const REL=[
  [N_('Cada animal con algo que le gusta comer.'),[['🐶','🦴'],['🐰','🥕'],['🐒','🍌'],['🐭','🧀'],['🐱','🐟'],['🐝','🌻']]],
  [N_('Primero es pequeño y luego crece así.'),[['🐣','🐔'],['🐛','🦋'],['🌱','🌳'],['👶','🧑']]],
  [N_('Cada tiempo con algo que usamos con él.'),[['🌧️','☂️'],['☀️','🕶️'],['❄️','🧣'],['🌬️','🪁']]],
  [N_('Cada cosa con aquello con lo que se usa.'),[['🔑','🔒'],['🪥','🦷'],['✏️','📝'],['⚽','🥅']]],
  [N_('Cada transporte con por dónde va.'),[['⛵','🌊'],['🚂','🛤️'],['✈️','☁️'],['🚗','🛣️'],['🚀','🪐']]],
  [N_('Son contrarios.'),[['⬆️','⬇️'],['➡️','⬅️'],['😀','😢'],['🔥','🧊']]],
  [N_('Cada parte del cuerpo con lo que se pone.'),[['🦶','👟'],['🖐️','🧤'],['👀','👓']]],
  [N_('Cada sentido con algo que se nota con él.'),[['👃','🌸'],['👂','🎵'],['👅','🍦']]]];
function genRelacion(l){
  const ci=rnd(REL.length),[why,pairs]=REL[ci],[p1,p2]=sample(pairs,2),ans=p2[1];
  const otherB=shuffle(REL.filter((_x,i)=>i!==ci).flatMap(g=>g[1].map(p=>p[1])));
  /* Fácil: las opciones falsas son de otros grupos. Difícil: también del mismo grupo, y la del ejemplo como trampa. */
  const near=l>=2?shuffle(pairs.filter(p=>p!==p2).map(p=>p[1])).slice(0,l>=3?3:2):[];
  const o=[ans];for(const e of [...near,...otherB])if(o.length<4&&!o.includes(e))o.push(e);
  const row=(a,b)=>`<div><span>${a}</span><span class="op">➡️</span>${b}</div>`;
  return {prompt:_('¿Qué va en el hueco?'),speak:_('Mira la pareja de arriba. ¿Qué va con el de abajo de la misma manera?'),answer:ans,
    visual:`<div class="ana">${row(p1[0],`<span>${p1[1]}</span>`)}${row(p2[0],'<span class="box q">?</span>')}</div>`,
    opts:shuffle(o).map(e=>({html:e,v:e,cls:'pic'})),right:_(why),wrong:_('Piensa qué tienen que ver los dos de arriba.')};
}
const MGEN={matrices:genMatriz,series:genSerie,relaciones:genRelacion};

/* ---------- pantallas comunes ---------- */
const mDots=(n,i)=>`<div class="mdots" aria-label="${esc(_('Reto {i} de {n}',{i:i+1,n}))}">${Array.from({length:n},(_x,k)=>`<span class="${k<i?'done':k===i?'now':''}"></span>`).join('')}</div>`;
function mIntro(a,top,go){
  $('#stage').innerHTML=`<div class="screen">${top?`<p class="tip">${top}</p>`:''}
    <div class="mintro" style="background:${a.bg}"><span class="pic">${a.pic}</span><b>${esc(_(a.name))}</b><span>${esc(_(MINSTR[a.id]))}</span></div>
    <button class="again" id="mgo">${_('¡Vamos!')}</button></div>`;
  $('#mgo').onclick=()=>{stopVoice();go();};say(_(a.name)+'. '+_(MINSTR[a.id]));focusFirst();
}

/* Retos de elegir (matrices, series y relaciones).
   En el circuito hay un solo intento: si falla, se enseña la buena y se baja un nivel; si acierta, se sube.
   Al practicar se puede volver a intentar, y el nivel se guarda: sube tras dos aciertos seguidos a la primera y baja al fallar. */
function mQuiz(area,n,test,done){
  let lvl=test?2:(M.nivel[area]??1),i=0,ok=0,pts=0,run=0,first,busy,q;
  const ask=()=>{q=MGEN[area](lvl);first=true;busy=false;
    $('#stage').innerHTML=`<div class="screen">${mDots(n,i)}<p class="prompt">${q.prompt}</p><div class="visual">${q.visual}</div>
      <div class="choices" id="mch">${q.opts.map((o,k)=>`<button class="tile ${o.cls}" data-v="${esc(o.v)}" aria-label="${esc(area==='matrices'?_('Opción {n}',{n:k+1}):o.v)}">${o.html}</button>`).join('')}</div>
      <div class="qnav"><button id="msay" aria-label="${esc(_('Escuchar otra vez'))}" title="${esc(_('Escuchar otra vez'))}">🔊</button></div></div>`;
    $('#msay').onclick=()=>say(q.speak);
    $('#mch').onclick=e=>{const b=e.target.closest('button');if(!b||busy)return;
      if(b.dataset.v===q.answer){busy=true;anim(b,'pop');yay();
        if(first){ok++;pts+=lvl+1;star();if(test||++run>=2){lvl=Math.min(4,lvl+1);run=0;}}
        say(_(pick(CHEERS))+' '+q.right);afterVoice(nextQ,1800);return;}
      anim(b,'wobble');nope();if(first){lvl=Math.max(0,lvl-1);run=0;}first=false;
      if(test){busy=true;[...$('#mch').children].forEach(x=>{if(x.dataset.v===q.answer)x.classList.add('right');else x.disabled=true;});
        say(_('Esta era la buena.')+' '+q.right);afterVoice(nextQ,3000);}
      else say(q.wrong);};
    say(q.speak);focusFirst();};
  const nextQ=()=>{i++;if(!test){M.nivel[area]=lvl;saveM();}
    if(i<n)ask();else done({nivel:clampLv(Math.ceil(pts/n)),txt:_('Has acertado {a} de {n} a la primera.',{a:ok,n})});};
  ask();
}

/* Memoria: se encienden casillas en orden y hay que repetirlas. Empieza con 3 y sube una cada vez que acierta;
   con dos fallos seguidos en la misma longitud, se acaba. Al practicar también se puede jugar «al revés». */
function mMemoria(test,done,reves=false){
  let len=3,fails=0,best=2,seq=[],pos=0,input=false;
  $('#stage').innerHTML=`<div class="screen">${test?'':`<div class="row" id="mrev">${[N_('En orden'),N_('Al revés')].map((t,k)=>`<button class="pill" data-r="${k}" aria-pressed="${!!k===reves}">${_(t)}</button>`).join('')}</div>`}
    <p class="status" id="mst"></p><div class="corsi wait" id="mg">${Array.from({length:9},(_x,k)=>`<button data-i="${k}" aria-label="${esc(_('Casilla {n}',{n:k+1}))}"></button>`).join('')}</div>
    <p class="tip" id="mlen"></p></div>`;
  if(!test)$('#mrev').onclick=e=>{const b=e.target.closest('[data-r]');if(b){clearTimers();stopVoice();mMemoria(false,done,b.dataset.r==='1');}};
  const cells=[...$('#mg').children],st=t=>{$('#mst').textContent=t;};
  const lock=()=>{input=false;$('#mg').classList.add('wait');};
  const flash=(k,ms)=>{cells[k].classList.add('on');later(()=>cells[k].classList.remove('on'),ms);};
  const play=()=>{lock();pos=0;seq=sample([0,1,2,3,4,5,6,7,8],len);
    $('#mlen').textContent=_('{n} casillas',{n:len});st(_('Mira bien…'));say(_('Mira bien.'));
    seq.forEach((k,i)=>later(()=>{flash(k,600);tone([523],.1);},1200+i*900));
    later(()=>{input=true;$('#mg').classList.remove('wait');const t=reves?_('¡Ahora tú, al revés!'):_('¡Ahora tú!');st(t);say(t);},1200+len*900);};
  const end=()=>{lock();done({nivel:clampLv(best-2),txt:_('Has recordado hasta {n} casillas seguidas.',{n:best})});};
  $('#mg').onclick=e=>{const b=e.target.closest('[data-i]');if(!b||!input)return;const k=+b.dataset.i,want=reves?seq[seq.length-1-pos]:seq[pos];
    flash(k,250);
    if(k===want){tone([660],.08);if(++pos<seq.length)return;
      lock();best=Math.max(best,len);fails=0;star();yay();st(_(pick(CHEERS)));say(_(pick(CHEERS)));
      if(len>=9)return later(end,1500);len++;later(play,1800);return;}
    lock();nope();anim(b,'wobble');fails++;
    if(fails>=2){st(_('¡Buen intento!'));say(_('¡Buen intento!'));later(end,1600);return;}
    st(_('Casi. Vamos a probar otra vez.'));say(_('Casi. Vamos a probar otra vez.'));later(play,2200);};
  play();
}

/* Rapidez: encontrar entre ocho dibujos parecidos el que es igual al de arriba, durante 40 segundos. */
const FIND_POOLS=[['🍎','🍅','🍒','🍓','🌶️','🍑','🥭','🍊'],['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'],['🚗','🚕','🚙','🚌','🚓','🚑','🚒','🚐'],
  ['⭐','🌟','✨','💫','☀️','🌞','🌙','⚡'],['😀','😃','😄','😁','😆','😊','🙂','😉'],['🌲','🌳','🌴','🌵','🌿','🍀','🌾','🌱']];
const FIND_MS=40000;
function mRapidez(test,done){
  let hits=0,errs=0,goal,t0=0,on=false;
  $('#stage').innerHTML=`<div class="screen"><div class="bar" aria-hidden="true"><span id="mbar" style="width:100%"></span></div>
    <p class="status" id="mst">${_('Aciertos: {n}',{n:0})}</p><div class="ftarget" id="mtg" aria-live="polite">❓</div>
    <div class="fgrid" id="mfg"></div><button class="again" id="mgo2">${_('¡Empezar!')}</button></div>`;
  const round=()=>{const pool=pick(FIND_POOLS);goal=pick(pool);$('#mtg').textContent=goal;
    $('#mfg').innerHTML=shuffle(pool).map(e=>`<button data-e="${e}" aria-label="${e}">${e}</button>`).join('');};
  const stop=()=>{on=false;const sc=Math.max(0,hits-errs);
    done({nivel:sc<10?1:sc<15?2:sc<20?3:sc<26?4:5,txt:_('{h} aciertos y {e} fallos en 40 segundos.',{h:hits,e:errs})});};
  $('#mgo2').onclick=()=>{$('#mgo2').remove();stopVoice();on=true;t0=Date.now();round();focusFirst();
    const t=setInterval(()=>{const left=1-(Date.now()-t0)/FIND_MS;$('#mbar').style.width=Math.max(0,left*100)+'%';
      if(left<=0){clearInterval(t);if(on)stop();}},100);timers.push(t);};
  $('#mfg').onclick=e=>{const b=e.target.closest('[data-e]');if(!b||!on)return;
    if(b.dataset.e===goal){hits++;tone([700],.05);if(hits%5===0)star();$('#mst').textContent=_('Aciertos: {n}',{n:hits});round();}
    else{errs++;nope();anim(b,'wobble');}};
  say(_('Toca «Empezar» cuando estés preparado.'));focusFirst();
}

function runArea(id,test,done){
  if(MGEN[id])mQuiz(id,test?6:10,test,done);else if(id==='memoria')mMemoria(test,done);else mRapidez(test,done);
}

/* ---------- practicar un área sola ---------- */
function mentePractica(g){
  const a=MAREAS.find(x=>x.id===g.area);
  mIntro(a,'',()=>runArea(a.id,false,r=>{yay();confetti();
    $('#stage').innerHTML=`<div class="screen"><div class="mintro" style="background:${a.bg}"><span class="pic">${MPIC[r.nivel-1]}</span><b>${esc(r.txt)}</b></div>
      <div class="mbtns"><button class="again" id="magain">${_('Otra vez')}</button><button class="again alt" id="mback">${_('Volver')}</button></div></div>`;
    say(r.txt);$('#magain').onclick=()=>{clearTimers();mentePractica(g);};$('#mback').onclick=goHome;focusFirst();}));
}

/* ---------- circuito completo y perfil ---------- */
function menteCircuito(){
  const res={};let k=0;
  const step=()=>{if(k>=MAREAS.length)return finish();const a=MAREAS[k];
    mIntro(a,_('Prueba {i} de {n}',{i:k+1,n:MAREAS.length}),()=>runArea(a.id,true,r=>{res[a.id]=r.nivel;k++;step();}));};
  const finish=()=>{const rec={f:Date.now(),r:res},prev=M.hist[M.hist.length-1];M.hist.push(rec);M.hist=M.hist.slice(-10);saveM();
    yay();confetti();star();mPerfil(rec,prev);};
  $('#stage').innerHTML=`<div class="screen"><div class="mintro" style="background:var(--green)"><span class="pic">🏅</span><b>${_('Circuito completo')}</b>
    <span>${_('Cinco retos cortos: lógica, series, relaciones, memoria y rapidez. Tardarás unos 10 minutos.')}</span>
    <span>${_('No pasa nada por fallar: es para ver cómo piensas, no para aprobar.')}</span></div>
    <button class="again" id="mstart">${_('¡Empezar!')}</button></div>`;
  $('#mstart').onclick=()=>{stopVoice();step();};
  say(_('Cinco retos cortos: lógica, series, relaciones, memoria y rapidez. Tardarás unos 10 minutos.')+' '+_('No pasa nada por fallar: es para ver cómo piensas, no para aprobar.'));focusFirst();
}
function mPerfil(rec,prev){
  const lv=id=>rec.r[id]||1,vals=MAREAS.map(a=>lv(a.id)),hi=Math.max(...vals),lo=Math.min(...vals);
  const best=MAREAS.filter(a=>lv(a.id)===hi).map(a=>_(a.name)),low=MAREAS.filter(a=>lv(a.id)===lo).map(a=>_(a.name));
  const up=prev?MAREAS.filter(a=>prev.r[a.id]&&lv(a.id)>prev.r[a.id]).map(a=>_(a.name)):[];
  const lines=[hi===lo?_('¡Te ha ido igual de bien en todo!'):_('Tu punto fuerte hoy: {a}.',{a:joinY(best)})];
  if(hi>lo)lines.push(_('Para entrenar: {a}. ¡Practica en su juego!',{a:joinY(low)}));
  if(up.length)lines.push(_('Has mejorado en {a} desde la última vez.',{a:joinY(up)}));
  $('#gtitle').textContent=_('Mi perfil');
  $('#stage').innerHTML=`<div class="screen"><p class="tip">${esc(new Date(rec.f).toLocaleDateString(LANG))}</p><div class="perfil">${MAREAS.map(a=>{const n=lv(a.id);
      return `<div class="prow" role="img" aria-label="${esc(_(a.name)+': '+_(MLAB[n-1]))}"><span class="ppic">${a.pic}</span><span class="ptxt"><b>${esc(_(a.name))}</b><small>${MPIC[n-1]} ${esc(_(MLAB[n-1]))}</small></span>
        <span class="pdots" aria-hidden="true">${'●'.repeat(n)}<i>${'●'.repeat(5-n)}</i></span></div>`;}).join('')}</div>
    ${lines.map(t=>`<p class="status small">${esc(t)}</p>`).join('')}
    <p class="parents">${_('Para las familias: esto es un juego para entrenar, no un test de inteligencia. No da un CI ni sirve para diagnosticar; para eso está el orientador del colegio o un psicólogo.')}</p>
    <button class="again" id="mback">${_('Volver')}</button></div>`;
  $('#mback').onclick=goHome;say(lines.join(' '));focusFirst();
}
/* El último perfil, desde la cabecera de la sección (sin contar como partida). */
const MPERFIL={id:'mente-perfil',age:'',pic:'📊',name:N_('Mi perfil'),what:'',bg:'',custom:'mentePerfil'};
function verPerfil(){const last=M.hist[M.hist.length-1];if(!last)return;
  clearTimers();stopVoice();cur=MPERFIL;$('#stars').innerHTML='';renderLevels();show('game');mPerfil(last,M.hist[M.hist.length-2]);}
function menteHead(){const last=M.hist[M.hist.length-1];
  return `<p class="tip">${_('Entrena tu mente con retos de lógica, memoria y rapidez. Haz el circuito completo para ver tu perfil.')}</p>`+
    (last?`<div class="row"><button class="pill" id="mperfil">${_('📊 Mi último perfil ({d})',{d:new Date(last.f).toLocaleDateString(LANG)})}</button></div>`:'')+
    `<p class="parents">${_('No es un test de inteligencia ni da un CI: es un juego para practicar.')}</p>`;}
/* (fichas.html y cartel.html cargan este código sin la página principal) */
$('#lhead')?.addEventListener('click',e=>{if(e.target.closest('#mperfil'))verPerfil();});
Object.assign(CUSTOM,{menteCircuito,mentePractica});
