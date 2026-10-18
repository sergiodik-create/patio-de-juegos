/* Juegos de mesa: tres en raya, conecta 4, damas y ajedrez. Contra la máquina o entre dos personas. */
GAMES.push(
 {id:'tresraya',age:'mgx',pic:'⭕',name:'Tres en raya',what:'Contra la máquina o en pareja',bg:'var(--red)',custom:'tresraya'},
 {id:'conecta',age:'mgx',pic:'🔴',name:'Conecta 4',what:'Cuatro en línea',bg:'var(--blue)',custom:'conecta'},
 {id:'damas',age:'gx',pic:'⚫',name:'Damas',what:'Salta y corona',bg:'var(--orange)',custom:'damas'},
 {id:'ajedrez',age:'gx',pic:'♟️',name:'Ajedrez',what:'Aprende y juega',bg:'var(--ink)',custom:'ajedrez'},
);
/* ---------- juegos de mesa: controles comunes ---------- */
function mesa(title,opts,onChange){
  // opts: {vs:true, levels:[...]}
  const st={vs:'cpu',lvl:1};
  const html=`<div class="screen"><div class="ctrls" id="mctl">
    <button class="pill" data-vs="cpu" aria-pressed="true">${_('🤖 Contra la máquina')}</button><button class="pill" data-vs="2p" aria-pressed="false">${_('👫 Dos jugadores')}</button>
    ${opts.levels?opts.levels.map((l,i)=>`<button class="pill" data-lvl="${i}" aria-pressed="${i===1}">${_(l)}</button>`).join(''):''}
    <button class="pill" data-new="1">${_('↻ Nueva partida')}</button></div>
    <p class="status" id="mst"></p><div id="mboard" style="display:flex;flex-direction:column"></div><p class="tip" id="mtip"></p></div>`;
  $('#stage').innerHTML=html;
  $('#mctl').onclick=e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.vs){st.vs=b.dataset.vs;$('#mctl').querySelectorAll('[data-vs]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#mctl').querySelectorAll('[data-lvl]').forEach(x=>x.hidden=st.vs!=='cpu');}
    if(b.dataset.lvl){st.lvl=+b.dataset.lvl;$('#mctl').querySelectorAll('[data-lvl]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}
    onChange(st);};
  return st;
}
const mstatus=t=>{$('#mst').textContent=t;};

/* ---------- tres en raya ---------- */
const LINES3=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function tresraya(){
  let b,turn,over;const st=mesa('Tres en raya',{levels:[N_('Fácil'),N_('Normal'),N_('Difícil')]},()=>reset());
  const winOf=bb=>{for(const l of LINES3){const [x,y,z]=l;if(bb[x]&&bb[x]===bb[y]&&bb[x]===bb[z])return l;}return null;};
  const reset=()=>{b=Array(9).fill('');turn='X';over=false;draw();mstatus(st.vs==='cpu'?_('Tú eres la X. ¡Empiezas!'):_('Le toca a la X'));say(st.vs==='cpu'?_('Tú eres la equis. Empiezas tú.'):_('Empieza la equis'));};
  const draw=w=>{$('#mboard').innerHTML=`<div class="ttt" id="tt">${b.map((v,i)=>`<button data-i="${i}" class="${v.toLowerCase()} ${w&&w.includes(i)?'win':''}" aria-label="${_('Casilla')} ${i+1} ${v}">${v==='X'?'✕':v==='O'?'○':''}</button>`).join('')}</div>`;
    $('#tt').onclick=e=>{const c=e.target.closest('button');if(!c||over||b[+c.dataset.i])return;if(st.vs==='cpu'&&turn==='O')return;play(+c.dataset.i);};};
  const cpu=()=>{const empty=b.map((v,i)=>v?-1:i).filter(i=>i>=0);
    const find=m=>empty.find(i=>{const t=b.slice();t[i]=m;return winOf(t);});
    let mv=find('O');const smart=[0.3,0.8,1][st.lvl];
    if(mv===undefined&&Math.random()<smart)mv=find('X');
    if(mv===undefined&&st.lvl===2&&!b[4])mv=4;
    if(mv===undefined&&st.lvl===2){const corners=[0,2,6,8].filter(i=>!b[i]);if(corners.length)mv=pick(corners);}
    if(mv===undefined)mv=pick(empty);play(mv);};
  const play=i=>{b[i]=turn;tone([turn==='X'?520:660],.08);const w=winOf(b);
    if(w){over=true;draw(w);const msg=st.vs==='cpu'?(turn==='X'?_('¡Has ganado!'):_('Gana la máquina. ¡Otra!')):(turn==='X'?_('¡Gana la X!'):_('¡Gana la O!'));mstatus(msg);say(msg);if(st.vs==='2p'||turn==='X'){yay();confetti();star();}return;}
    if(b.every(Boolean)){over=true;draw();mstatus(_('Empate. ¡Muy bien jugado!'));say(_('Empate'));return;}
    turn=turn==='X'?'O':'X';draw();
    if(st.vs==='cpu'&&turn==='O'){mstatus(_('La máquina piensa…'));later(cpu,600);}else mstatus(st.vs==='cpu'?_('Te toca'):(turn==='X'?_('Le toca a la X'):_('Le toca a la O')));};
  reset();
}

/* ---------- conecta 4 ---------- */
function conecta(){
  const R=6,C=7;let b,turn,over;const st=mesa('Conecta 4',{levels:[N_('Fácil'),N_('Normal')]},()=>reset());
  const at=(r,c)=>r>=0&&r<R&&c>=0&&c<C?b[r*C+c]:null;
  const winAt=(bb,r,c)=>{const v=bb[r*C+c];for(const[dr,dc]of[[0,1],[1,0],[1,1],[1,-1]]){const cells=[[r,c]];
      for(const s of[1,-1]){let rr=r+dr*s,cc=c+dc*s;while(rr>=0&&rr<R&&cc>=0&&cc<C&&bb[rr*C+cc]===v){cells.push([rr,cc]);rr+=dr*s;cc+=dc*s;}}
      if(cells.length>=4)return cells.map(([a,d])=>a*C+d);}return null;};
  const rowFor=(bb,c)=>{for(let r=R-1;r>=0;r--)if(!bb[r*C+c])return r;return -1;};
  const reset=()=>{b=Array(R*C).fill('');turn='r';over=false;draw();mstatus(st.vs==='cpu'?_('Tú tienes las rojas. ¡Empiezas!'):_('Empiezan las rojas'));say(_('Junta cuatro fichas en línea'));};
  const draw=w=>{$('#mboard').innerHTML=`<div class="c4" id="c4">${b.map((v,i)=>`<button data-c="${i%C}" class="${v} ${w&&w.includes(i)?'win':''}" aria-label="${_('Columna')} ${i%C+1}"></button>`).join('')}</div>`;
    $('#c4').onclick=e=>{const x=e.target.closest('button');if(!x||over)return;if(st.vs==='cpu'&&turn==='y')return;play(+x.dataset.c);};};
  const wouldWin=(c,v)=>{const r=rowFor(b,c);if(r<0)return false;const t=b.slice();t[r*C+c]=v;return !!winAt(t,r,c);};
  const cpu=()=>{const cols=[...Array(C).keys()].filter(c=>rowFor(b,c)>=0);
    let mv=cols.find(c=>wouldWin(c,'y'));
    if(mv===undefined&&(st.lvl===1||Math.random()<.5))mv=cols.find(c=>wouldWin(c,'r'));
    if(mv===undefined&&st.lvl===1){const safe=cols.filter(c=>{const r=rowFor(b,c);if(r===0)return true;const t=b.slice();t[r*C+c]='y';const tmp=b;b=t;const bad=wouldWin(c,'r');b=tmp;return !bad;});
      const pool=safe.length?safe:cols;mv=pool.sort((a,d)=>Math.abs(3-a)-Math.abs(3-d)+(Math.random()-.5)*1.5)[0];}
    if(mv===undefined)mv=pick(cols);play(mv);};
  const play=c=>{const r=rowFor(b,c);if(r<0)return;b[r*C+c]=turn;tone([turn==='r'?400:500],.08);const w=winAt(b,r,c);
    if(w){over=true;draw(w);const msg=st.vs==='cpu'?(turn==='r'?_('¡Has ganado!'):_('Gana la máquina. ¡Otra!')):(turn==='r'?_('¡Ganan las rojas!'):_('¡Ganan las amarillas!'));mstatus(msg);say(msg);if(st.vs==='2p'||turn==='r'){yay();confetti();star();}return;}
    if(b.every(Boolean)){over=true;draw();mstatus(_('Empate'));say(_('Empate'));return;}
    turn=turn==='r'?'y':'r';draw();
    if(st.vs==='cpu'&&turn==='y'){mstatus(_('La máquina piensa…'));later(cpu,600);}else mstatus(st.vs==='cpu'?_('Te toca'):(turn==='r'?_('Les toca a las rojas'):_('Les toca a las amarillas')));};
  reset();
}

/* ---------- damas ---------- */
function damas(){
  // 'w','W' blancas (abajo), 'b','B' negras. Fichas avanzan y capturan hacia delante; damas una casilla en cualquier diagonal. Capturar es obligatorio.
  let b,turn,sel,chain,over;const st=mesa('Damas',{levels:[N_('Fácil'),N_('Normal')]},()=>reset());
  const own=(p,t)=>p&&p.toLowerCase()===t,isK=p=>p===p.toUpperCase();
  const dirsOf=p=>isK(p)?[[1,1],[1,-1],[-1,1],[-1,-1]]:p==='w'?[[-1,1],[-1,-1]]:[[1,1],[1,-1]];
  const movesFor=(bb,sq)=>{const p=bb[sq],r=sq>>3,c=sq&7,caps=[],steps=[];
    for(const[dr,dc]of dirsOf(p)){const r1=r+dr,c1=c+dc,r2=r+2*dr,c2=c+2*dc;if(r1<0||r1>7||c1<0||c1>7)continue;const m=bb[r1*8+c1];
      if(!m)steps.push({from:sq,to:r1*8+c1});else if(!own(m,p.toLowerCase())&&r2>=0&&r2<8&&c2>=0&&c2<8&&!bb[r2*8+c2])caps.push({from:sq,to:r2*8+c2,cap:r1*8+c1});}
    return{caps,steps};};
  const allMoves=(bb,t)=>{let caps=[],steps=[];bb.forEach((p,i)=>{if(own(p,t)){const m=movesFor(bb,i);caps.push(...m.caps);steps.push(...m.steps);}});return caps.length?{list:caps,cap:true}:{list:steps,cap:false};};
  const reset=()=>{b=Array(64).fill(null);for(let r=0;r<8;r++)for(let c=0;c<8;c++)if((r+c)%2){if(r<3)b[r*8+c]='b';if(r>4)b[r*8+c]='w';}
    turn='w';sel=-1;chain=-1;over=false;draw();mstatus(st.vs==='cpu'?_('Tú llevas las blancas. ¡Empiezas!'):_('Empiezan las blancas'));$('#mtip').textContent=_('Si puedes comer, tienes que hacerlo. Llega al otro lado para coronar una dama 👑.');say(_('Empiezan las blancas'));};
  const legalNow=()=>{if(chain>=0)return movesFor(b,chain).caps;return allMoves(b,turn).list;};
  const draw=()=>{const lm=legalNow(),tg=sel>=0?lm.filter(m=>m.from===sel).map(m=>m.to):[];
    $('#mboard').innerHTML=`<div class="board b8" id="dm">${b.map((p,i)=>{const d=((i>>3)+(i&7))%2;
      return `<button data-i="${i}" class="${d?'sq-d':'sq-l'} ${i===sel?'sel':''} ${tg.includes(i)?'tgt':''}" aria-label="${_('casilla')}">${p?`<span class="man ${p.toLowerCase()}">${isK(p)?'👑':''}</span>`:''}</button>`;}).join('')}</div>`;
    $('#dm').onclick=e=>{const x=e.target.closest('button');if(!x||over)return;if(st.vs==='cpu'&&turn==='b')return;click(+x.dataset.i);};};
  const click=i=>{const lm=legalNow();
    if(own(b[i],turn)&&chain<0){if(lm.some(m=>m.from===i)){sel=i;tone([600],.05);}else{sel=-1;nope();say(allMoves(b,turn).cap?_('¡Tienes que comer!'):_('Esa ficha no se puede mover'));}draw();return;}
    const m=lm.find(m=>m.from===sel&&m.to===i);if(m)doMove(m);};
  const doMove=m=>{const p=b[m.from];b[m.to]=p;b[m.from]=null;let crowned=false;
    if(m.cap!=null){b[m.cap]=null;tone([700,500],.07);}else tone([500],.06);
    if(p==='w'&&m.to<8){b[m.to]='W';crowned=true;}if(p==='b'&&m.to>55){b[m.to]='B';crowned=true;}
    if(crowned)say(_('¡Dama!'));
    if(m.cap!=null&&!crowned&&movesFor(b,m.to).caps.length){chain=m.to;sel=m.to;draw();mstatus(_('¡Sigue comiendo!'));if(st.vs==='cpu'&&turn==='b')later(cpu,500);return;}
    chain=-1;sel=-1;turn=turn==='w'?'b':'w';
    if(!allMoves(b,turn).list.length){over=true;draw();const whiteWins=turn==='b';const msg=st.vs==='cpu'?(whiteWins?_('¡Has ganado!'):_('Gana la máquina. ¡Otra!')):(whiteWins?_('¡Ganan las blancas!'):_('¡Ganan las negras!'));mstatus(msg);say(msg);if(st.vs==='2p'||whiteWins){yay();confetti();star();}return;}
    draw();if(st.vs==='cpu'&&turn==='b'){mstatus(_('La máquina piensa…'));later(cpu,650);}else mstatus(st.vs==='cpu'?_('Te toca'):(turn==='w'?_('Les toca a las blancas'):_('Les toca a las negras')));};
  const cpu=()=>{const lm=legalNow();if(!lm.length)return;
    const score=m=>{const t=b.slice();const p=t[m.from];t[m.to]=p;t[m.from]=null;if(m.cap!=null)t[m.cap]=null;let s=m.cap!=null?10:0;
      if(p==='b'&&m.to>55)s+=6;const opp=allMoves(t,'w');if(opp.cap&&opp.list.some(x=>x.cap===m.to))s-=8;return s+Math.random()*(st.lvl?1:6);};
    const mv=lm.slice().sort((x,y)=>score(y)-score(x))[0];doMove(mv);};
  reset();
}

/* ---------- ajedrez ---------- */
const CVAL={p:100,n:300,b:310,r:500,q:900,k:0};
/* Nombres de las piezas, consejos para aprender a moverlas y la palabra del empate en ajedrez
   (va aquí y no en _() porque «Tablas» también es el nombre del juego de multiplicar). */
DATA.es.CHESS={names:{p:'el peón',n:'el caballo',b:'el alfil',r:'la torre',q:'la dama',k:'el rey'},
  tips:{p:'El peón avanza una casilla hacia delante (dos en su primer movimiento) y come en diagonal.',n:'El caballo salta en forma de L y puede pasar por encima de otras piezas.',
  b:'El alfil se mueve en diagonal todas las casillas que quiera.',r:'La torre se mueve en línea recta: arriba, abajo, izquierda o derecha.',
  q:'La dama es la pieza más poderosa: se mueve como la torre y como el alfil.',k:'El rey se mueve una casilla en cualquier dirección. ¡Hay que protegerlo!'},
  draw:'Tablas',
  /* «la torre blanca», «el rey negro»: en español el color concuerda con la pieza */
  label:(t,white)=>{const n=DATA.es.CHESS.names[t],f=/^la /.test(n);return n+' '+(white?(f?'blanca':'blanco'):(f?'negra':'negro'));}};
/* Otros idiomas pueden traer su propio CHESS.label; si no, se usan las traducciones de «{p} blanco» y «{p} negro». */
const pieceLabel=(t,white)=>D.CHESS.label?D.CHESS.label(t,white):white?_('{p} blanco',{p:D.CHESS.names[t]}):_('{p} negro',{p:D.CHESS.names[t]});
const CGLYPH={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
const cIsW=p=>p&&p===p.toUpperCase(),cCol=p=>p?(cIsW(p)?'w':'b'):null;
function cInit(){const b=Array(64).fill(null),back='rnbqkbnr';for(let c=0;c<8;c++){b[c]=back[c];b[8+c]='p';b[48+c]='P';b[56+c]=back[c].toUpperCase();}return{b,turn:'w',cr:{K:1,Q:1,k:1,q:1},ep:-1};}
const inB=(r,c)=>r>=0&&r<8&&c>=0&&c<8;
const KN=[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]],KG=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
function cAttacked(b,sq,by){const r=sq>>3,c=sq&7,W=by==='w',pr=W?r+1:r-1;
  for(const dc of[-1,1])if(inB(pr,c+dc)&&b[pr*8+c+dc]===(W?'P':'p'))return true;
  for(const[dr,dc]of KN)if(inB(r+dr,c+dc)&&b[(r+dr)*8+c+dc]===(W?'N':'n'))return true;
  for(const[dr,dc]of KG)if(inB(r+dr,c+dc)&&b[(r+dr)*8+c+dc]===(W?'K':'k'))return true;
  for(const[dr,dc]of KG){const diag=dr&&dc;let rr=r+dr,cc=c+dc;while(inB(rr,cc)){const p=b[rr*8+cc];if(p){if(cCol(p)===by){const t=p.toLowerCase();if(t==='q'||(diag?t==='b':t==='r'))return true;}break;}rr+=dr;cc+=dc;}}
  return false;}
function cPseudo(s){const{b,turn}=s,ms=[],opp=turn==='w'?'b':'w';
  for(let sq=0;sq<64;sq++){const p=b[sq];if(cCol(p)!==turn)continue;const t=p.toLowerCase(),r=sq>>3,c=sq&7,add=(to,x)=>ms.push({from:sq,to,...x});
    if(t==='p'){const d=turn==='w'?-1:1,start=turn==='w'?6:1,last=turn==='w'?0:7,r1=r+d;
      if(inB(r1,c)&&!b[r1*8+c]){add(r1*8+c,r1===last?{promo:1}:{});if(r===start&&!b[(r+2*d)*8+c])add((r+2*d)*8+c,{dbl:1});}
      for(const dc of[-1,1]){if(!inB(r1,c+dc))continue;const to=r1*8+c+dc;if(cCol(b[to])===opp)add(to,r1===last?{promo:1}:{});else if(to===s.ep)add(to,{ep:1});}}
    else if(t==='n'||t==='k'){for(const[dr,dc]of(t==='n'?KN:KG)){if(!inB(r+dr,c+dc))continue;const to=(r+dr)*8+c+dc;if(cCol(b[to])!==turn)add(to);}
      if(t==='k'){const home=turn==='w'?60:4,K=turn==='w'?'K':'k',Q=turn==='w'?'Q':'q',R=turn==='w'?'R':'r';
        if(sq===home&&!cAttacked(b,sq,opp)){
          if(s.cr[K]&&!b[sq+1]&&!b[sq+2]&&b[sq+3]===R&&!cAttacked(b,sq+1,opp)&&!cAttacked(b,sq+2,opp))add(sq+2,{castle:'k'});
          if(s.cr[Q]&&!b[sq-1]&&!b[sq-2]&&!b[sq-3]&&b[sq-4]===R&&!cAttacked(b,sq-1,opp)&&!cAttacked(b,sq-2,opp))add(sq-2,{castle:'q'});}}}
    else{const dirs=t==='r'?KG.slice(0,4):t==='b'?KG.slice(4):KG;
      for(const[dr,dc]of dirs){let rr=r+dr,cc=c+dc;while(inB(rr,cc)){const to=rr*8+cc;if(cCol(b[to])===turn)break;add(to);if(b[to])break;rr+=dr;cc+=dc;}}}}
  return ms;}
function cApply(s,m){const b=s.b.slice(),p=b[m.from],W=s.turn==='w';b[m.to]=m.promo?(W?'Q':'q'):p;b[m.from]=null;
  if(m.ep)b[m.to+(W?8:-8)]=null;
  if(m.castle==='k'){b[m.to-1]=b[m.to+1];b[m.to+1]=null;}if(m.castle==='q'){b[m.to+1]=b[m.to-2];b[m.to-2]=null;}
  const cr={...s.cr};if(p==='K')cr.K=cr.Q=0;if(p==='k')cr.k=cr.q=0;
  for(const[q,k]of[[63,'K'],[56,'Q'],[7,'k'],[0,'q']])if(m.from===q||m.to===q)cr[k]=0;
  return{b,turn:W?'b':'w',cr,ep:m.dbl?(m.from+m.to)/2:-1};}
const cKing=(s,t)=>s.b.indexOf(t==='w'?'K':'k');
function cLegal(s){return cPseudo(s).filter(m=>{const n=cApply(s,m);return !cAttacked(n.b,cKing(n,s.turn),n.turn);});}
const cInCheck=s=>cAttacked(s.b,cKing(s,s.turn),s.turn==='w'?'b':'w');
function cEval(s){let v=0;s.b.forEach((p,i)=>{if(!p)return;const t=p.toLowerCase(),r=i>>3,c=i&7;let x=CVAL[t];
  if(t!=='k'&&t!=='q'&&t!=='r')x+=(7-Math.abs(3.5-c)*2)*3+(7-Math.abs(3.5-r)*2)*2;if(t==='p')x+=(cIsW(p)?6-r:r-1)*5;v+=cIsW(p)?x:-x;});return s.turn==='w'?v:-v;}
function cSearch(s,d,a,bt){const ms=cLegal(s);if(!ms.length)return cInCheck(s)?-100000-d:0;if(!d)return cEval(s);
  ms.sort((x,y)=>(s.b[y.to]?CVAL[s.b[y.to].toLowerCase()]:0)-(s.b[x.to]?CVAL[s.b[x.to].toLowerCase()]:0));
  for(const m of ms){const v=-cSearch(cApply(s,m),d-1,-bt,-a);if(v>a)a=v;if(a>=bt)break;}return a;}
function cBest(s,depth,noise){const ms=shuffle(cLegal(s));let best=ms[0],bv=-Infinity;
  for(const m of ms){const v=-cSearch(cApply(s,m),depth-1,-Infinity,Infinity)+Math.random()*noise;if(v>bv){bv=v;best=m;}}return best;}
function ajedrez(){
  let s,sel,last,over,hist;const st=mesa('Ajedrez',{levels:[N_('Fácil'),N_('Normal'),N_('Difícil')]},()=>reset());
  const reset=()=>{s=cInit();sel=-1;last=null;over=false;hist=[];draw();mstatus(st.vs==='cpu'?_('Tú llevas las blancas. ¡Empiezas!'):_('Empiezan las blancas'));
    $('#mtip').textContent=_('Toca una pieza para ver adónde puede moverse.');say(_('Toca una pieza para ver adónde puede moverse.'));};
  const draw=()=>{const lm=sel>=0?cLegal(s).filter(m=>m.from===sel).map(m=>m.to):[],chk=cInCheck(s)?cKing(s,s.turn):-1;
    $('#mboard').innerHTML=`<div class="board b8" id="ch">${s.b.map((p,i)=>{const d=((i>>3)+(i&7))%2;
      const cls=[d?'sq-d':'sq-l',i===sel?'sel':'',lm.includes(i)?'tgt':'',last&&(i===last.from||i===last.to)?'last':'',i===chk?'chk':''].join(' ');
      return `<button data-i="${i}" class="${cls}" aria-label="${p?pieceLabel(p.toLowerCase(),cIsW(p)):_('casilla vacía')}">${p?`<span class="cp ${cCol(p)}">${CGLYPH[p.toLowerCase()]}︎</span>`:''}</button>`;}).join('')}</div>`;
    $('#ch').onclick=e=>{const x=e.target.closest('button');if(!x||over)return;if(st.vs==='cpu'&&s.turn==='b')return;click(+x.dataset.i);};};
  const click=i=>{const p=s.b[i];
    if(p&&cCol(p)===s.turn){sel=i;const t=p.toLowerCase();$('#mtip').textContent=D.CHESS.tips[t];say(D.CHESS.names[t]);tone([600],.05);draw();return;}
    if(sel<0)return;const m=cLegal(s).find(m=>m.from===sel&&m.to===i);
    if(!m){nope();if(p)say(_('Esa pieza es del otro equipo'));else say(_('Ahí no puede ir'));return;}
    move(m);};
  const move=m=>{const cap=s.b[m.to]||m.ep;hist.push(s);s=cApply(s,m);last=m;sel=-1;tone(cap?[700,500]:[500],.07);
    const lm=cLegal(s);
    if(!lm.length){over=true;draw();if(cInCheck(s)){const whiteWins=s.turn==='b';const msg=st.vs==='cpu'?(whiteWins?_('¡Jaque mate! ¡Has ganado!'):_('Jaque mate. Gana la máquina.')):(whiteWins?_('¡Jaque mate! Ganan las blancas.'):_('¡Jaque mate! Ganan las negras.'));
        mstatus(msg);say(msg);if(st.vs==='2p'||whiteWins){yay();confetti();star();}}else{mstatus(_('Tablas: no quedan movimientos.'));say(D.CHESS.draw);}return;}
    if(s.b.filter(Boolean).length===2){over=true;draw();mstatus(_('Tablas: solo quedan los reyes.'));say(D.CHESS.draw);return;}
    draw();const chk=cInCheck(s);if(chk)say(_('¡Jaque!'));
    if(st.vs==='cpu'&&s.turn==='b'){mstatus(_('La máquina piensa…'));later(()=>{const [d,n]=[[1,120],[2,25],[3,5]][st.lvl];move(cBest(s,d,n));},350);}
    else mstatus((chk?_('¡Jaque!')+' ':'')+(st.vs==='cpu'?_('Te toca'):(s.turn==='w'?_('Les toca a las blancas'):_('Les toca a las negras'))));};
  reset();
}

Object.assign(CUSTOM,{tresraya,conecta,damas,ajedrez});
