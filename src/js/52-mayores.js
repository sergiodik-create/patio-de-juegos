/* Juegos nuevos para 7 a 12 años: sudoku, salva la flor, robot programable, fracciones y continentes. */
GAMES.push(
 {id:'sudoku',age:'mgx',pic:'🔢',name:'Sudoku',what:'Lógica con números',bg:'var(--purple)',custom:'sudoku'},
 {id:'flor',age:'gx',pic:'🌸',name:'Salva la flor',what:'Adivina la palabra',bg:'var(--pink)',custom:'flor',needs:['HANGMAN','KEYBOARD']},
 {id:'robot',age:'mg',pic:'🤖',name:'Robot',what:'Prográmalo con flechas',bg:'var(--teal)',custom:'robot',mode:'flechas'},
 {id:'bucles',age:'x',pic:'🔁',name:'Programa con bucles',what:'El robot que repite',bg:'var(--teal)',custom:'robot',mode:'bucles'},
 {id:'fracciones',age:'gx',pic:'🍕',name:'Fracciones',what:'Partes de una pizza',bg:'var(--orange)',levels:3,needs:['FRACTION'],gen(l=0){
   if(l<2){const n=l===0?pick([2,3,4]):pick([2,3,4,5,6,8]),k=l===0?1:range(1,n-1),set=new Set([k+'/'+n]);
     while(set.size<(l?4:3)){const d=pick([2,3,4,5,6,8]),x=range(1,d-1);if(x*n!==k*d)set.add(x+'/'+d);}
     return {prompt:_('¿Qué parte de la pizza está pintada?'),speak:_('¿Qué parte de la pizza está pintada?'),answer:k+'/'+n,visual:pizzaSVG(k,n),
       opts:shuffle([...set]).map(fracBtn),right:_('Es {f}.',{f:D.FRACTION(k,n)}),wrong:()=>_('Cuenta los trozos pintados y los trozos que hay en total.')};}
   const [n,k]=pick([[4,2],[6,2],[6,3],[6,4],[8,2],[8,4],[8,6],[4,2],[10,5]]),g=gcd(k,n),ans=(k/g)+'/'+(n/g),set=new Set([ans]);
   while(set.size<4){const d=pick([2,3,4,5]),x=range(1,d-1);if(gcd(x,d)===1&&x*n!==k*d)set.add(x+'/'+d);}
   return {prompt:_('¿Qué fracción es igual?'),speak:_('{f}. ¿Qué fracción es igual?',{f:D.FRACTION(k,n)}),answer:ans,visual:pizzaSVG(k,n)+`<span class="op">=</span><span class="box q">?</span>`,
     opts:shuffle([...set]).map(fracBtn),right:_('{a} es lo mismo que {b}.',{a:D.FRACTION(k,n),b:D.FRACTION(k/g,n/g)}),wrong:()=>_('Divide arriba y abajo por el mismo número.')};}},
 {id:'continentes',age:'gx',pic:'🗺️',name:'Continentes',what:'¿Dónde está?',bg:'var(--blue)',needs:['WORLD'],gen(){
   const [e,kind,x,ci]=pick(D.WORLD.items),q=kind==='vive'?_('¿En qué continente vive {x} en libertad?',{x}):_('¿En qué continente está {x}?',{x});
   const C=D.WORLD.continents,ans=C[ci],o=shuffle([ans,...sample(C.filter(c=>c!==ans),3)]);
   return {prompt:q,speak:q,answer:ans,visual:`<span>${e}</span>`,opts:o.map(word),right:_('Está en {c}.',{c:ans}),wrong:()=>_('No es ahí. Piensa en el mapa del mundo.')};}},
);

const gcd=(a,b)=>b?gcd(b,a%b):a;
const fracBtn=f=>{const [k,n]=f.split('/');return {html:`<span class="frac"><span>${k}</span><span>${n}</span></span>`,v:f,aria:D.FRACTION(+k,+n),cls:'num'};};
function pizzaSVG(k,n){
  const r=44,parts=Array.from({length:n},(_x,i)=>{const a0=-Math.PI/2+i*2*Math.PI/n,a1=a0+2*Math.PI/n;
    const p=(a)=>`${(50+r*Math.cos(a)).toFixed(2)},${(50+r*Math.sin(a)).toFixed(2)}`;
    return `<path d="M50,50 L${p(a0)} A${r},${r} 0 0 1 ${p(a1)} Z" fill="${i<k?'#F28A2E':'#FFF4D6'}" stroke="#8B5A3C" stroke-width="2"/>`;}).join('');
  return `<svg class="pizza" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="#E8B26A"/>${parts}</svg>`;
}

/* ---------- sudoku ---------- */
const SD_BOX={4:[2,2],6:[2,3],9:[3,3]};
function sdCands(g,n,i){const [br,bc]=SD_BOX[n],r=Math.floor(i/n),c=i%n,used=new Set();
  for(let k=0;k<n;k++){used.add(g[r*n+k]);used.add(g[k*n+c]);}
  const r0=r-r%br,c0=c-c%bc;for(let a=0;a<br;a++)for(let b=0;b<bc;b++)used.add(g[(r0+a)*n+c0+b]);
  const out=[];for(let v=1;v<=n;v++)if(!used.has(v))out.push(v);return out;}
function sdCount(g,n,limit=2){
  let best=-1,bc=null;for(let i=0;i<n*n;i++)if(!g[i]){const c=sdCands(g,n,i);if(!c.length)return 0;if(best<0||c.length<bc.length){best=i;bc=c;if(c.length===1)break;}}
  if(best<0)return 1;let cnt=0;for(const v of bc){g[best]=v;cnt+=sdCount(g,n,limit-cnt);if(cnt>=limit)break;}g[best]=0;return cnt;}
function sdMake(n){
  const [br,bc]=SD_BOX[n],pat=(r,c)=>(bc*(r%br)+Math.floor(r/br)+c)%n;
  const rows=shuffle([...Array(n/br).keys()]).flatMap(b=>shuffle([...Array(br).keys()]).map(r=>b*br+r));
  const cols=shuffle([...Array(n/bc).keys()]).flatMap(s=>shuffle([...Array(bc).keys()]).map(c=>s*bc+c));
  const nums=shuffle([...Array(n).keys()].map(x=>x+1)),sol=[];
  for(let r=0;r<n;r++)for(let c=0;c<n;c++)sol.push(nums[pat(rows[r],cols[c])]);
  const g=sol.slice(),target={4:6,6:14,9:34}[n];let filled=n*n;
  for(const i of shuffle([...Array(n*n).keys()])){if(filled<=target)break;const v=g[i];g[i]=0;if(sdCount(g.slice(),n)!==1)g[i]=v;else filled--;}
  return {sol,g};
}
function sudoku(){
  let n=age==='m'?4:age==='g'?6:9,cur2,sel=-1;
  const draw=()=>{const {sol,g}=sdMake(n);cur2={sol,g:g.slice(),fixed:g.map(Boolean)};sel=-1;
    const [br,bc]=SD_BOX[n];
    $('#stage').innerHTML=`<div class="screen"><div class="row" id="sdz">${[4,6,9].map(k=>`<button class="pill" data-n="${k}" aria-pressed="${k===n}">${k}×${k}</button>`).join('')}</div>
      <div class="sudoku s${n}" id="sd" style="grid-template-columns:repeat(${n},1fr)">${cur2.g.map((v,i)=>{const r=Math.floor(i/n),c=i%n;
        return `<button data-i="${i}" class="${cur2.fixed[i]?'fix':''} ${c%bc===bc-1&&c<n-1?'br':''} ${r%br===br-1&&r<n-1?'bb':''}">${v||''}</button>`;}).join('')}</div>
      <div class="pad sdpad" id="sdp" style="grid-template-columns:repeat(${Math.min(n,5)},minmax(0,64px))">${[...Array(n).keys()].map(k=>`<button data-v="${k+1}">${k+1}</button>`).join('')}<button data-v="0" aria-label="${_('Borrar')}">⌫</button></div>
      <p class="tip" id="sdt">${_('Cada fila, cada columna y cada caja tienen todos los números sin repetir.')}</p></div>`;
    $('#sdz').onclick=e=>{const b=e.target.closest('[data-n]');if(b){n=+b.dataset.n;draw();}};
    $('#sd').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;if(cur2.fixed[i])return;
      sel=i;document.querySelectorAll('#sd .sel').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');tone([600],.04);};
    $('#sdp').onclick=e=>{const b=e.target.closest('button');if(!b||sel<0)return;cur2.g[sel]=+b.dataset.v;check();};
    say(_('Toca una casilla vacía y luego un número.'));
  };
  const check=()=>{const g=cur2.g,cells=$('#sd').children;let full=true;
    for(let i=0;i<n*n;i++){const v=g[i];cells[i].textContent=v||'';if(!v){full=false;cells[i].classList.remove('bad');continue;}
      const tmp=g[i];g[i]=0;const ok=sdCands(g,n,i).includes(tmp);g[i]=tmp;cells[i].classList.toggle('bad',!ok);}
    if(full&&g.every((v,i)=>v===cur2.sol[i])){yay();confetti();star();$('#sdt').textContent=_('¡Sudoku resuelto! ¡Qué cabeza!');say(_('¡Sudoku resuelto! ¡Qué cabeza!'));
      sel=-1;later(()=>{const b=document.createElement('button');b.className='again';b.textContent=_('Otro sudoku');b.onclick=draw;$('#stage .screen').appendChild(b);},800);}
    else tone([520],.04);};
  draw();
}

/* ---------- salva la flor (adivina la palabra) ---------- */
function flor(){
  let word,hint,cat,guessed,miss,over;
  const draw=()=>{const [c,list]=pick(D.HANGMAN);cat=c;[hint,word]=pick(list);guessed=new Set();miss=0;over=false;
    $('#stage').innerHTML=`<div class="screen"><p class="tip">${_('Pista: {c}',{c:esc(cat)})} <button class="pill" id="fh">${_('💡 Ver dibujo')}</button></p>
      <div class="flower" id="ff">${flowerSVG()}</div><p class="hword" id="fw"></p>
      <div class="kb" id="fk">${[...D.KEYBOARD].map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div><p class="status" id="fs"></p></div>`;
    $('#fh').onclick=e=>{e.target.replaceWith(Object.assign(document.createElement('span'),{className:'hintpic',textContent:hint}));};
    $('#fk').onclick=e=>{const b=e.target.closest('[data-k]');if(!b||over||b.disabled)return;b.disabled=true;guess(b.dataset.k,b);};
    paint();say(_('Adivina la palabra antes de que la flor pierda todos sus pétalos.'));
  };
  const paint=()=>{$('#fw').innerHTML=[...word].map(ch=>ch===' '?'<span class="sp"></span>':`<span>${guessed.has(plain(ch))||over?ch.toUpperCase():''}</span>`).join('');};
  const guess=(k,b)=>{
    if([...word].some(ch=>plain(ch)===k)){guessed.add(k);b.classList.add('ok');tone([660,880],.06);paint();
      if([...word].every(ch=>ch===' '||guessed.has(plain(ch)))){over=true;paint();yay();confetti();star();const m=_('¡Bien! Has salvado la flor: {w}.',{w:word});$('#fs').textContent=m;say(m);again();}}
    else{b.classList.add('no');miss++;nope();const p=$('#pt'+(miss-1));if(p)p.classList.add('fall');
      if(miss>=6){over=true;paint();const m=_('¡Oh! La flor se ha quedado sin pétalos. Era «{w}».',{w:word});$('#fs').textContent=m;say(m);again();}}};
  const again=()=>later(()=>{const b=document.createElement('button');b.className='again';b.textContent=_('Otra palabra');b.onclick=draw;$('#stage .screen').appendChild(b);},900);
  draw();
}
function flowerSVG(){
  return `<svg viewBox="0 0 120 150" aria-hidden="true"><path d="M60 80 Q55 115 60 148" stroke="#3DB46D" stroke-width="5" fill="none"/>
    <ellipse cx="44" cy="120" rx="14" ry="6" fill="#3DB46D" transform="rotate(-30 44 120)"/>
    ${[0,1,2,3,4,5].map(i=>`<ellipse id="pt${i}" class="petal" cx="60" cy="28" rx="13" ry="22" fill="${['#E25E9C','#F28A2E','#F6C431','#8B5BD6','#2F7FE0','#E8483B'][i]}" transform="rotate(${i*60} 60 55)"/>`).join('')}
    <circle cx="60" cy="55" r="14" fill="#F6C431" stroke="#8B5A3C" stroke-width="2"/></svg>`;
}

/* ---------- robot programable ---------- */
const ROBOT_LEVELS=[
  {n:7,start:[3,0],goal:[3,6],rocks:[],max:2},
  {n:7,start:[6,0],goal:[0,6],rocks:[],max:3},
  {n:7,start:[6,0],goal:[6,6],rocks:[[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]],max:6},
  {n:7,start:[6,0],goal:[0,6],rocks:[[5,1],[3,3],[1,5]],max:5},
  {n:7,start:[6,0],goal:[0,6],rocks:[[6,4],[2,0],[5,1],[5,2]],max:5}];
const ARROW={n:'⬆️',s:'⬇️',w:'⬅️',e:'➡️'},DELTA={n:[-1,0],s:[1,0],w:[0,-1],e:[0,1]};
function robotRandom(n){
  for(;;){const rocks=[],start=[n-1,0];
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(Math.random()<.2&&!(r===n-1&&c===0))rocks.push([r,c]);
    const isRock=(r,c)=>rocks.some(x=>x[0]===r&&x[1]===c),dist={},q=[start];dist[start]=0;
    while(q.length){const [r,c]=q.shift();for(const [dr,dc] of Object.values(DELTA)){const a=r+dr,b=c+dc;if(a<0||b<0||a>=n||b>=n||isRock(a,b)||dist[[a,b]]!=null)continue;dist[[a,b]]=dist[[r,c]]+1;q.push([a,b]);}}
    const far=Object.entries(dist).filter(([,d])=>d>=n-1);if(!far.length)continue;
    const goal=pick(far)[0].split(',').map(Number);return {n,start,goal,rocks,max:30};}
}
function robot(g){
  const loops=g.mode==='bucles';let li=0,size=age==='m'?5:6,L,prog=[],pos,running=false;
  const expand=list=>list.flatMap(x=>typeof x==='string'?[x]:Array.from({length:x.n},()=>expand(x.body)).flat());
  const flat=()=>{const root=[],st=[{body:root}];for(const t of prog){if(t.t==='r'){const f={n:t.n,body:[]};st.at(-1).body.push(f);st.push(f);}else if(t.t==='e'){if(st.length>1)st.pop();}else st.at(-1).body.push(t.d);}return expand(root);};
  const blocks=()=>prog.filter(t=>t.t!=='e').length;
  const setup=()=>{L=loops?(li<ROBOT_LEVELS.length?ROBOT_LEVELS[li]:robotRandom(7)):robotRandom(size);prog=[];pos=L.start.slice();running=false;draw();
    say(loops?_('Lleva el robot a la batería. Usa «Repetir» para gastar menos bloques.'):_('Lleva el robot hasta la batería. Pon las flechas y pulsa «Adelante».'));};
  const draw=()=>{const n=L.n,isRock=(r,c)=>L.rocks.some(x=>x[0]===r&&x[1]===c);
    $('#stage').innerHTML=`<div class="screen">${loops?`<p class="tip">${li<ROBOT_LEVELS.length?_('Reto {i} de {n} · Máximo {m} bloques',{i:li+1,n:ROBOT_LEVELS.length,m:L.max}):_('Reto libre')}</p>`:
      `<div class="row" id="rz">${[[5,N_('Fácil')],[6,N_('Normal')],[7,N_('Difícil')]].map(([k,t])=>`<button class="pill" data-n="${k}" aria-pressed="${k===size}">${_(t)}</button>`).join('')}</div>`}
      <div class="rgrid" id="rg" style="grid-template-columns:repeat(${n},1fr)">${Array.from({length:n*n},(_x,i)=>{const r=Math.floor(i/n),c=i%n;
        return `<div class="rc">${isRock(r,c)?'🪨':r===L.goal[0]&&c===L.goal[1]?'🔋':''}</div>`;}).join('')}</div>
      <div class="prog" id="rp" aria-label="${_('Programa')}"></div>
      <div class="arrows rk" id="rk"><button data-d="n" aria-label="${_('Arriba')}">⬆️</button><button data-d="w" aria-label="${_('Izquierda')}">⬅️</button><button data-d="s" aria-label="${_('Abajo')}">⬇️</button><button data-d="e" aria-label="${_('Derecha')}">➡️</button>
        ${loops?`<button data-x="r" class="wide">${_('🔁 Repetir')}</button><button data-x="e" class="wide">${_('⤴ Fin')}</button>`:''}
        <button data-x="del" aria-label="${_('Borrar')}">⌫</button><button data-x="go" class="go wide">${_('▶ Adelante')}</button></div>
      <p class="status" id="rs"></p></div>`;
    if(!loops)$('#rz').onclick=e=>{const b=e.target.closest('[data-n]');if(b){size=+b.dataset.n;setup();}};
    $('#rk').onclick=e=>{const b=e.target.closest('button');if(!b||running)return;
      if(b.dataset.x==='go')return run();
      if(b.dataset.x==='del'){prog.pop();paintProg();return;}
      if(b.dataset.x!=='e'&&blocks()>=L.max){nope();$('#rs').textContent=_('Máximo {m} bloques. Usa «Repetir».',{m:L.max});return;}
      prog.push(b.dataset.d?{t:'m',d:b.dataset.d}:b.dataset.x==='r'?{t:'r',n:2}:{t:'e'});tone([600],.04);paintProg();};
    $('#rp').onclick=e=>{const c=e.target.closest('[data-k]');if(!c||running)return;const t=prog[+c.dataset.k];if(t.t==='r'){t.n=t.n>=6?2:t.n+1;paintProg();}};
    paintProg();paintBot();};
  const paintProg=()=>{let depth=0;
    $('#rp').innerHTML=prog.length?prog.map((t,k)=>{if(t.t==='e')depth=Math.max(0,depth-1);
      const html=t.t==='m'?`<span class="chip">${ARROW[t.d]}</span>`:t.t==='r'?`<button class="chip rep" data-k="${k}" aria-label="${_('Repetir {n} veces',{n:t.n})}">🔁×${t.n} (</button>`:`<span class="chip">)</span>`;
      if(t.t==='r')depth++;return html;}).join(''):`<span class="note">${_('Tu programa aparecerá aquí.')}</span>`;
    if(loops)$('#rs').textContent=_('Bloques: {b} de {m}',{b:blocks(),m:L.max});};
  const paintBot=()=>{const cells=$('#rg').children,n=L.n;[...cells].forEach(c=>{if(c.textContent==='🤖')c.textContent='';});
    const i=pos[0]*n+pos[1];cells[i].textContent='🤖';};
  const restore=()=>{const n=L.n;[...$('#rg').children].forEach((c,i)=>{const r=Math.floor(i/n),k=i%n;c.classList.remove('trail');
    c.textContent=L.rocks.some(x=>x[0]===r&&x[1]===k)?'🪨':r===L.goal[0]&&k===L.goal[1]?'🔋':'';});pos=L.start.slice();paintBot();};
  const run=()=>{const steps=flat();if(!steps.length){say(_('Primero pon algunas flechas.'));return;}
    running=true;restore();let k=0;
    const step=()=>{if(k>=steps.length){running=false;nope();$('#rs').textContent=_('El robot se ha parado antes de llegar. Cambia el programa.');say($('#rs').textContent);return;}
      const [dr,dc]=DELTA[steps[k++]],r=pos[0]+dr,c=pos[1]+dc,n=L.n;
      if(r<0||c<0||r>=n||c>=n||L.rocks.some(x=>x[0]===r&&x[1]===c)){running=false;nope();anim($('#rg'),'wobble');$('#rs').textContent=_('¡Uy! El robot se ha chocado. Cambia el programa.');say($('#rs').textContent);return;}
      $('#rg').children[pos[0]*n+pos[1]].classList.add('trail');pos=[r,c];paintBot();tone([440+k*20],.05);
      if(r===L.goal[0]&&c===L.goal[1]){running=false;yay();confetti();star();
        const m=loops?_('¡Conseguido con {b} bloques!',{b:blocks()}):_('¡Conseguido en {n} pasos!',{n:k});$('#rs').textContent=m;say(m);
        later(()=>{const b=document.createElement('button');b.className='again';b.textContent=_('Siguiente reto');b.onclick=()=>{if(loops)li++;setup();};$('#stage .screen').appendChild(b);},700);return;}
      later(step,S.calma?650:420);};
    later(step,300);};
  setup();
}

Object.assign(CUSTOM,{sudoku,flor,robot});

/* ---------- textos en español de estos juegos ---------- */
DATA.es.KEYBOARD='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
DATA.es.HANGMAN=[
  ['Animales',[['🐘','elefante'],['🦒','jirafa'],['🐢','tortuga'],['🦋','mariposa'],['🐊','cocodrilo'],['🐧','pingüino'],['🦉','búho'],['🐬','delfín'],['🦓','cebra'],['🐿️','ardilla'],['🦔','erizo'],['🐙','pulpo']]],
  ['Frutas y comida',[['🍎','manzana'],['🍌','plátano'],['🍓','fresa'],['🍉','sandía'],['🍊','naranja'],['🍅','tomate'],['🥕','zanahoria'],['🍞','pan'],['🧀','queso'],['🍇','uvas']]],
  ['El espacio',[['🪐','planeta'],['⭐','estrella'],['🚀','cohete'],['👩‍🚀','astronauta'],['🌌','galaxia'],['☄️','cometa'],['🛰️','satélite'],['🌙','luna']]],
  ['Naturaleza',[['⛰️','montaña'],['🌋','volcán'],['🏞️','río'],['🌲','bosque'],['🌈','arcoíris'],['⛈️','tormenta'],['🏜️','desierto'],['🌊','ola'],['🌻','girasol']]],
  ['En casa',[['🛏️','cama'],['🪑','silla'],['🚪','puerta'],['🪟','ventana'],['🧸','juguete'],['📚','libro'],['🥄','cuchara'],['🛁','bañera']]]];
/* Fracción dicha en palabras: 3/4 → «tres cuartos». */
DATA.es.FRACTION=(k,n)=>{const d={2:['medio','medios'],3:['tercio','tercios'],4:['cuarto','cuartos'],5:['quinto','quintos'],6:['sexto','sextos'],7:['séptimo','séptimos'],8:['octavo','octavos'],9:['noveno','novenos'],10:['décimo','décimos']}[n];
  return (k===1?'un':DATA.es.NUMWORDS[k])+' '+(d?d[k===1?0:1]:'entre '+n);};
DATA.es.WORLD={continents:['América','Europa','Asia','África','Oceanía','la Antártida'],items:[
  ['🦘','vive','el canguro',4],['🐨','vive','el koala',4],['🐼','vive','el panda gigante',2],['🦒','vive','la jirafa',3],['🦓','vive','la cebra',3],
  ['🐆','vive','el jaguar',0],['🐧','vive','el pingüino emperador',5],['🦅','vive','el cóndor de los Andes',0],['🦍','vive','el gorila',3],
  ['🗽','está','la Estatua de la Libertad',0],['🗼','está','la Torre Eiffel',1],['🔺','está','la gran pirámide de Guiza',3],['🗻','está','el monte Fuji',2],
  ['🏟️','está','el Coliseo de Roma',1],['🏔️','está','el monte Everest',2],['🌳','está','la selva del Amazonas',0],['🏜️','está','el desierto del Sahara',3],
  ['⛪','está','la Sagrada Familia de Barcelona',1],['🕌','está','el Taj Mahal',2],['🌉','está','el puente Golden Gate',0],['🪸','está','la Gran Barrera de Coral',4],['🧊','está','la mayor capa de hielo del planeta',5]]};
