/* Juegos nuevos para 5 a 10 años: laberinto, trazar letras, dominó, reloj, monedas y sopa de letras. */
GAMES.push(
 {id:'laberinto',age:'mg',pic:'🐭',name:'Laberinto',what:'Lleva al ratón al queso',bg:'var(--green)',custom:'laberinto'},
 {id:'trazar',age:'pm',pic:'✍️',name:'Trazar letras',what:'Escribe con el dedo',bg:'var(--blue)',custom:'trazar',needs:['TRACE','WORDS']},
 {id:'domino',age:'m',pic:'🁫',name:'Dominó',what:'¿Qué ficha encaja?',bg:'var(--ink)',levels:2,gen(l=0){
   const hi=l?6:4,lo=l?0:1,b=range(Math.max(lo,1),hi),a=range(lo,hi),c=range(lo,hi);
   const bad=new Set();while(bad.size<(l?3:2)){const x=range(lo,hi),y=range(lo,hi);if(x!==b&&y!==b)bad.add(x+'-'+y);}
   const right=Math.random()<.5?b+'-'+c:c+'-'+b,opts=shuffle([right,...bad]);
   return {prompt:_('¿Qué ficha puede ir al lado?'),speak:b===1?_('Busca una ficha que tenga 1 punto.'):_('Busca una ficha que tenga {n} puntos.',{n:b}),answer:right,
     visual:dominoSVG(a,b,true)+'<span class="op">→</span><span class="box q">?</span>',
     opts:opts.map(v=>{const [x,y]=v.split('-').map(Number);return {html:dominoSVG(x,y),v,aria:_('{a} y {b}',{a:x,b:y}),cls:'wide'};}),
     right:_('Sí, las dos tienen {n}.',{n:b}),wrong:()=>_('Esa ficha no tiene {n}. Cuenta los puntos.',{n:b})};}},
 {id:'reloj',age:'mg',needs:['TIME'],pic:'🕒',name:'¿Qué hora es?',what:'Aprende el reloj',bg:'var(--orange)',levels:3,gen(l=0){
   const mins=[[0],[0,30],[0,15,30,45]][l],set=new Map();
   while(set.size<(l?4:3)){const h=range(1,12),m=pick(mins);set.set(h+':'+m,[h,m]);}
   const all=[...set.values()],[h,m]=pick(all),ans=D.TIME(h,m);
   return {prompt:_('¿Qué hora es?'),speak:_('¿Qué hora es?'),answer:ans,visual:clockSVG(h,m),
     opts:shuffle(all.map(([x,y])=>word(D.TIME(x,y)))),right:D.TIME_SAY(h,m),
     wrong:()=>_('Fíjate: la aguja corta marca la hora y la larga, los minutos.')};}},
 {id:'monedas',age:'mg',pic:'🪙',name:'Monedas',what:'¿Cuánto dinero hay?',bg:'var(--yellow)',levels:3,gen(l=0){
   const vals=[[1],[1,2,5],[1,2,5,10]][l],k=[range(2,6),range(2,5),range(3,5)][l];
   const coins=Array.from({length:k},()=>pick(vals)).sort((a,b)=>b-a),sum=coins.reduce((a,b)=>a+b,0);
   return {prompt:_('¿Cuánto dinero hay?'),speak:_('¿Cuánto dinero hay en total?'),answer:String(sum),
     visual:coins.map(c=>`<span class="coin c${c}">${c}</span>`).join(''),opts:numOpts(sum,l?4:3,1,60),
     right:_('Hay {n} en total.',{n:sum}),wrong:()=>l?_('Suma primero las monedas grandes.'):_('Cuenta las monedas una a una.')};}},
 {id:'sopa',age:'mgx',pic:'🔠',name:'Sopa de letras',what:'Encuentra las palabras',bg:'var(--teal)',custom:'sopa',needs:['WORDS','LETTERS']},
);

/* ---------- dominó y reloj: dibujos ---------- */
const PIPS={0:[],1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function dominoSVG(a,b,mark){
  const half=(n,x0)=>PIPS[n].map(i=>`<circle cx="${x0+14+(i%3)*16}" cy="${14+Math.floor(i/3)*16}" r="5.2" fill="#1F3A4D"/>`).join('');
  return `<svg class="domino" viewBox="0 0 124 60" aria-hidden="true"><rect x="1" y="1" width="122" height="58" rx="10" fill="#fff" stroke="#1F3A4D" stroke-width="2"/>
    ${mark?'<rect x="63" y="3" width="57" height="54" rx="8" fill="#FFE9A8"/>':''}<line x1="62" y1="6" x2="62" y2="54" stroke="#1F3A4D" stroke-width="2"/>${half(a,0)}${half(b,62)}</svg>`;
}
/* Cómo se dice la hora en cada idioma (en punto, y media, y cuarto, menos cuarto). */
DATA.es.TIME=(h,m)=>{const art=x=>{x=(x-1)%12+1;return x===1?'La 1':'Las '+x;};
  return m===0?art(h)+' en punto':m===30?art(h)+' y media':m===15?art(h)+' y cuarto':art(h+1)+' menos cuarto';};
DATA.es.TIME_SAY=(h,m)=>{const t=DATA.es.TIME(h,m);return (t.startsWith('La 1')?'Es ':'Son ')+t[0].toLowerCase()+t.slice(1)+'.';};
function clockSVG(h,m){
  const ha=((h%12)+m/60)*30,ma=m*6;
  const nums=Array.from({length:12},(_,i)=>{const a=(i+1)*Math.PI/6;return `<text x="${50+38*Math.sin(a)}" y="${50-38*Math.cos(a)+5}" text-anchor="middle" font-size="11" font-weight="800" fill="#1F3A4D">${i+1}</text>`;}).join('');
  return `<svg class="clock" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="#fff" stroke="#1F3A4D" stroke-width="3"/>${nums}
    <line x1="50" y1="50" x2="50" y2="22" stroke="#E8483B" stroke-width="5" stroke-linecap="round" transform="rotate(${ha} 50 50)"/>
    <line x1="50" y1="50" x2="50" y2="12" stroke="#2F7FE0" stroke-width="3" stroke-linecap="round" transform="rotate(${ma} 50 50)"/>
    <circle cx="50" cy="50" r="4" fill="#1F3A4D"/></svg>`;
}

/* ---------- laberinto ---------- */
function makeMaze(n){
  const W=Array.from({length:n*n},()=>({n:1,e:1,s:1,w:1})),seen=new Set([0]),st=[0];
  const D=[['n',-n,'s'],['s',n,'n'],['e',1,'w'],['w',-1,'e']];
  while(st.length){const c=st.at(-1),r=Math.floor(c/n),k=c%n;
    const opts=D.filter(([d,o])=>{const t=c+o;if(d==='e'&&k===n-1||d==='w'&&k===0||t<0||t>=n*n)return false;return !seen.has(t);});
    if(!opts.length){st.pop();continue;}
    const [d,o,back]=pick(opts),t=c+o;W[c][d]=0;W[t][back]=0;seen.add(t);st.push(t);}
  return W;
}
function laberinto(){
  let n=age==='m'?5:7,maze,pos,goal;
  const draw=()=>{maze=makeMaze(n);pos=0;goal=n*n-1;
    $('#stage').innerHTML=`<div class="screen"><div class="row" id="lz">${[[5,N_('Pequeño')],[7,N_('Mediano')],[9,N_('Grande')]].map(([k,t])=>`<button class="pill" data-n="${k}" aria-pressed="${k===n}">${_(t)}</button>`).join('')}</div>
      <div class="maze" id="mz" style="grid-template-columns:repeat(${n},1fr)">${maze.map((w,i)=>`<div class="mc${w.n?' wn':''}${w.e?' we':''}${w.s?' ws':''}${w.w?' ww':''}" data-i="${i}"></div>`).join('')}</div>
      <div class="arrows" id="ar"><button data-d="n" aria-label="${_('Arriba')}">⬆️</button><button data-d="w" aria-label="${_('Izquierda')}">⬅️</button><button data-d="s" aria-label="${_('Abajo')}">⬇️</button><button data-d="e" aria-label="${_('Derecha')}">➡️</button></div></div>`;
    $('#lz').onclick=e=>{const b=e.target.closest('[data-n]');if(b){n=+b.dataset.n;draw();}};
    $('#ar').onclick=e=>{const b=e.target.closest('[data-d]');if(b)move(b.dataset.d);};
    $('#mz').onclick=e=>{const c=e.target.closest('.mc');if(!c)return;const t=+c.dataset.i,d=t===pos-n?'n':t===pos+n?'s':t===pos+1&&t%n?'e':t===pos-1&&pos%n?'w':null;if(d)move(d);};
    let sx=0,sy=0;$('#mz').onpointerdown=e=>{sx=e.clientX;sy=e.clientY;};
    $('#mz').onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<30)return;move(Math.abs(dx)>Math.abs(dy)?(dx>0?'e':'w'):(dy>0?'s':'n'));};
    paint();say(_('Lleva al ratón hasta el queso. Usa las flechas o desliza el dedo.'));
  };
  const paint=()=>{document.querySelectorAll('#mz .mc').forEach((c,i)=>{c.textContent=i===pos?'🐭':i===goal?'🧀':'';});};
  const move=d=>{if(pos===goal)return;
    if(maze[pos][d]){nope();anim($('#mz'),'wobble');return;}
    document.querySelector(`#mz [data-i="${pos}"]`).classList.add('trail');
    pos+=({n:-n,s:n,e:1,w:-1})[d];paint();tone([520+rnd(4)*60],.05);
    if(pos===goal){yay();confetti();star();say(_('¡Ñam! El ratón ha encontrado el queso.'));
      later(()=>{const b=document.createElement('button');b.className='again';b.textContent=_('Otro laberinto');b.onclick=draw;$('#stage .screen').appendChild(b);},800);}};
  onKey=e=>{const d={ArrowUp:'n',ArrowDown:'s',ArrowLeft:'w',ArrowRight:'e'}[e.key];if(d){e.preventDefault();move(d);}};
  draw();
}

/* ---------- trazar letras ---------- */
/* Letras para practicar, en el orden en que se suelen aprender. */
DATA.es.TRACE={upper:'AEIOUMPLSTNDBCRFGJV',lower:'aeioumplstndbcrfgjvñ'};
const traceSets=()=>({[N_('Mayúsculas')]:[...D.TRACE.upper],[N_('minúsculas')]:[...D.TRACE.lower],[N_('Números')]:[...'0123456789']});
function traceName(ch){
  if(/\d/.test(ch))return _('el número {n}',{n:D.NUMWORDS[+ch]});
  const w=D.WORDS.find(x=>x[1][0].toLowerCase()===ch.toLowerCase());
  return w?_('la {l}, de {w}',{l:ch.toLowerCase(),w:w[1]}):_('la {l}',{l:ch.toLowerCase()});
}
function trazar(){
  const SETS=traceSets();let set=Object.keys(SETS)[0],i=0,ink=[],drawing=false;
  const draw=()=>{
    const ch=SETS[set][i%SETS[set].length],W=Math.min(400,Math.floor(($('#stage').clientWidth||400)*.92));
    $('#stage').innerHTML=`<div class="screen"><div class="row" id="ts">${Object.keys(SETS).map(k=>`<button class="pill" data-s="${k}" aria-pressed="${k===set}">${_(k)}</button>`).join('')}</div>
      <p class="tip" id="tt">${_('Repasa {l} con el dedo.',{l:traceName(ch)})}</p>
      <div class="trace" style="width:${W}px;height:${W}px"><canvas id="tg" width="${W}" height="${W}"></canvas><canvas id="ti" width="${W}" height="${W}" aria-label="${_('Zona para escribir')}"></canvas></div>
      <div class="row"><button class="pill" id="tsay">${_('🔊 Oír')}</button><button class="pill" id="tclr">${_('Borrar')}</button><button class="pill" id="tnext">${_('Siguiente ➡️')}</button></div></div>`;
    const g=$('#tg').getContext('2d'),c=$('#ti').getContext('2d'),font=`800 ${Math.round(W*.78)}px "Baloo 2", "Baloo Bhaijaan 2", "Nunito", "Trebuchet MS", sans-serif`;
    const guide=()=>{g.clearRect(0,0,W,W);g.font=font;const [gx,gy]=place(g,ch,W);
      g.fillStyle='#E4EEF2';g.fillText(ch,gx,gy);g.setLineDash([6,8]);g.lineWidth=3;g.strokeStyle='#9DB4C0';g.strokeText(ch,gx,gy);};
    (document.fonts?.load?document.fonts.load(font,ch).catch(()=>{}):Promise.resolve()).then(guide);guide();
    ink=[];c.lineCap='round';c.lineJoin='round';c.lineWidth=W*.075;c.strokeStyle=pick(['#E8483B','#2F7FE0','#3DB46D','#8B5BD6','#F28A2E']);
    const pt=e=>{const r=$('#ti').getBoundingClientRect();return [(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*W/r.height];};
    $('#ti').onpointerdown=e=>{e.preventDefault();drawing=true;$('#ti').setPointerCapture(e.pointerId);const p=pt(e);ink.push([p]);c.beginPath();c.moveTo(...p);c.lineTo(p[0]+.1,p[1]);c.stroke();};
    $('#ti').onpointermove=e=>{if(!drawing)return;const p=pt(e);ink.at(-1).push(p);c.lineTo(...p);c.stroke();};
    $('#ti').onpointerup=$('#ti').onpointercancel=()=>{if(!drawing)return;drawing=false;check(ch,W,font);};
    $('#ts').onclick=e=>{const b=e.target.closest('[data-s]');if(b){set=b.dataset.s;i=0;draw();}};
    $('#tsay').onclick=()=>say(traceName(ch));
    $('#tclr').onclick=()=>{c.clearRect(0,0,W,W);ink=[];};
    $('#tnext').onclick=()=>{i++;draw();};
    say(_('Repasa {l} con el dedo.',{l:traceName(ch)}));
  };
  /* Centra el dibujo de la letra, no su caja: así las letras árabes o con rabito no se salen por abajo. */
  const place=(x,ch,S)=>{x.textAlign='center';x.textBaseline='alphabetic';const m=x.measureText(ch),a=m.actualBoundingBoxAscent,d=m.actualBoundingBoxDescent;
    if(!(a+d>0)){x.textBaseline='middle';return [S/2,S*.56];}return [S/2+(m.actualBoundingBoxLeft-m.actualBoundingBoxRight)/2,S/2+(a-d)/2];};
  /* Compara, a baja resolución, la tinta del niño con la forma de la letra. */
  const check=(ch,W,font)=>{
    const N=48,m=document.createElement('canvas');m.width=m.height=N;const x=m.getContext('2d');
    x.font=font.replace(/\d+px/,Math.round(N*.78)+'px');const [cx,cy]=place(x,ch,N);x.fillText(ch,cx,cy);
    const mask=x.getImageData(0,0,N,N).data;x.clearRect(0,0,N,N);x.lineWidth=N*.16;x.strokeText(ch,cx,cy);x.fillText(ch,cx,cy);
    const wide=x.getImageData(0,0,N,N).data;x.clearRect(0,0,N,N);x.drawImage($('#ti'),0,0,N,N);const inkd=x.getImageData(0,0,N,N).data;
    let inMask=0,covered=0,inkN=0,outside=0;
    for(let p=3;p<mask.length;p+=4){const mk=mask[p]>100,ik=inkd[p]>60;if(mk){inMask++;if(ik)covered++;}if(ik){inkN++;if(wide[p]<60)outside++;}}
    if(!inMask)return;const cov=covered/inMask,out=inkN?outside/inkN:0;
    if(cov>.62&&out<.3){yay();confetti();star();$('#tt').textContent=_('¡Qué bien escrita! Toca «Siguiente».');say(_('¡Muy bien escrita!'));later(()=>{i++;draw();},2600);}
    else if(out>=.45){$('#tt').textContent=_('Intenta seguir la letra gris. Toca «Borrar» para empezar de nuevo.');}
    else $('#tt').textContent=_('¡Sigue! Repasa toda la letra.');
  };
  draw();
}

/* ---------- sopa de letras ---------- */
function sopa(){
  const n=age==='m'?6:8,count=age==='m'?3:age==='g'?4:6,dirs=age==='m'?[[0,1],[1,0]]:age==='g'?[[0,1],[1,0],[1,1]]:[[0,1],[1,0],[1,1],[0,-1],[-1,1]];
  let grid,words,found,first=null;
  const build=()=>{
    for(let tries=0;tries<50;tries++){
      grid=Array(n*n).fill('');words=[];
      for(const [e,w] of shuffle(D.WORDS.filter(x=>plain(x[1]).length<=n&&plain(x[1]).length>=3))){
        if(words.length>=count)break;const W=plain(w);let ok=false;
        for(let t=0;t<60&&!ok;t++){const [dr,dc]=pick(dirs),r0=rnd(n),c0=rnd(n),r1=r0+dr*(W.length-1),c1=c0+dc*(W.length-1);
          if(r1<0||r1>=n||c1<0||c1>=n)continue;
          let fits=true;for(let k=0;k<W.length;k++){const g=grid[(r0+dr*k)*n+c0+dc*k];if(g&&g!==W[k]){fits=false;break;}}
          if(!fits)continue;for(let k=0;k<W.length;k++)grid[(r0+dr*k)*n+c0+dc*k]=W[k];words.push({e,w,W});ok=true;}}
      if(words.length===count)break;}
    const AB=D.LETTERS;grid=grid.map(x=>x||pick(AB));found=new Set();first=null;
    $('#stage').innerHTML=`<div class="screen"><div class="wlist" id="wl">${words.map((x,i)=>`<span data-i="${i}">${x.e} ${x.w}</span>`).join('')}</div>
      <div class="soup" id="sp" style="grid-template-columns:repeat(${n},1fr)">${grid.map((ch,i)=>`<button data-i="${i}">${ch}</button>`).join('')}</div>
      <p class="tip">${_('Toca la primera letra de una palabra y después la última.')}</p></div>`;
    $('#sp').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
      if(first===null){first=i;b.classList.add('sel');tone([600],.05);return;}
      const a=first;first=null;document.querySelectorAll('#sp .sel').forEach(x=>x.classList.remove('sel'));
      const r0=Math.floor(a/n),c0=a%n,r1=Math.floor(i/n),c1=i%n,dr=Math.sign(r1-r0),dc=Math.sign(c1-c0),len=Math.max(Math.abs(r1-r0),Math.abs(c1-c0))+1;
      if(!(r0===r1||c0===c1||Math.abs(r1-r0)===Math.abs(c1-c0))||a===i){if(a!==i)nope();return;}
      const cells=Array.from({length:len},(_,k)=>(r0+dr*k)*n+c0+dc*k),txt=cells.map(k=>grid[k]).join(''),rev=[...txt].reverse().join('');
      const wi=words.findIndex((x,j)=>!found.has(j)&&(x.W===txt||x.W===rev));
      if(wi<0){nope();cells.forEach(k=>anim($('#sp').children[k],'wobble'));return;}
      found.add(wi);cells.forEach(k=>$('#sp').children[k].classList.add('found'));$(`#wl [data-i="${wi}"]`).classList.add('done');
      yay();say(_('¡{w}!',{w:words[wi].w}));
      if(found.size===words.length){confetti();star();later(()=>{say(_('¡Has encontrado todas las palabras!'));const b2=document.createElement('button');b2.className='again';b2.textContent=_('Otra sopa');b2.onclick=build;$('#stage .screen').appendChild(b2);},1200);}};
    say(_('Busca las palabras escondidas.'));
  };
  build();
}

Object.assign(CUSTOM,{laberinto,trazar,sopa});
