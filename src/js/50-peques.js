/* Juegos nuevos para 2 a 7 años: puzle, piano de animales, sombras, emociones y ¿qué pasa después? */
GAMES.push(
 {id:'puzle',age:'pm',pic:'🧩',name:'Puzle',what:'Pon cada pieza en su sitio',bg:'var(--yellow)',custom:'puzle'},
 {id:'piano',age:'p',pic:'🎹',name:'Piano de animales',what:'Toca y repite la música',bg:'var(--purple)',custom:'piano'},
 {id:'sombras',age:'pm',pic:'👤',name:'Sombras',what:'¿De quién es la sombra?',bg:'var(--ink)',levels:3,gen(l=0){
   const pool=[...D.ANIMALS.map(a=>[a.e,a.n]),...D.SKY,...D.SHADOWS];
   const o=sample(pool,nOpts(l)),t=pick(o);
   return {prompt:_('¿De quién es esta sombra?'),speak:_('¿De quién es esta sombra?'),answer:t[1],visual:`<span class="shadow">${t[0]}</span>`,
     opts:o.map(x=>({html:x[0],v:x[1],aria:x[1]})),right:_('¡Es la sombra de {x}!',{x:t[1]}),wrong:v=>_('Eso es {x}. Mira bien la forma.',{x:v})};}},
 {id:'emociones',age:'pm',pic:'😊',name:'¿Cómo se siente?',what:'Alegría, tristeza, miedo…',bg:'var(--pink)',levels:3,gen(l=0){
   if(l<2){const o=sample(D.FEELINGS,nOpts(l)),t=pick(o);
     return {prompt:_('Toca la cara de {f}',{f:t.n}),speak:_('Toca la cara de {f}',{f:t.n}),answer:t.n,opts:o.map(f=>({html:f.e,v:f.n,aria:f.n})),
       right:_('Es la cara de {f}.',{f:t.n})+' '+t.tip,wrong:v=>_('Esa es la cara de {f}. Prueba otra vez.',{f:v})};}
   const [txt,ans]=pick(D.SITUATIONS),t=D.FEELINGS.find(f=>f.n===ans),o=shuffle([t,...sample(D.FEELINGS.filter(f=>f!==t),3)]),q=_('{s} ¿Cómo se siente?',{s:txt});
   return {prompt:q,speak:q,answer:ans,opts:o.map(f=>({html:f.e,v:f.n,aria:f.n})),
     right:_('Siente {f}.',{f:ans})+' '+t.tip,wrong:()=>_('Puede ser, pero piensa otra vez: ¿qué sentirías tú?')};}},
 {id:'despues',age:'pm',pic:'🐣',name:'¿Qué pasa después?',what:'Huevo, pollito, gallina…',bg:'var(--orange)',levels:2,gen(l=0){
   const pool=l===0?D.NEXT_SEQS.filter(s=>s.e.length===2):D.NEXT_SEQS,s=pick(pool),ans=s.e.at(-1);
   const others=sample(D.NEXT_SEQS.filter(x=>x!==s).map(x=>x.e.at(-1)).filter(x=>!s.e.includes(x)),2);
   return {prompt:_('¿Qué pasa después?'),speak:_('¿Qué pasa después?'),answer:ans,
     visual:s.e.slice(0,-1).map(x=>`<span>${x}</span>`).join('<span class="op">→</span>')+'<span class="op">→</span><span class="box q">?</span>',
     opts:shuffle([ans,...others]).map(x=>({html:x,v:x,aria:x})),right:s.t,wrong:()=>_('Piensa qué pasa primero y qué pasa luego.')};}},
);

DATA.es.SHADOWS=[['🚂','el tren'],['🦒','la jirafa'],['🐘','el elefante'],['🦋','la mariposa'],['🐢','la tortuga'],['🌳','el árbol']];
DATA.es.FEELINGS=[
  {e:'😀',n:'alegría',tip:'Cuando nos pasa algo bonito, sentimos alegría.'},
  {e:'😢',n:'tristeza',tip:'Cuando estamos tristes, un abrazo ayuda.'},
  {e:'😠',n:'enfado',tip:'Si sentimos enfado, podemos respirar hondo y contarlo con palabras.'},
  {e:'😨',n:'miedo',tip:'Cuando tenemos miedo, podemos pedir ayuda a un adulto.'},
  {e:'😲',n:'sorpresa',tip:'La sorpresa llega cuando pasa algo que no esperábamos.'},
  {e:'😴',n:'sueño',tip:'Cuando tenemos sueño, el cuerpo nos pide descansar.'}];
DATA.es.SITUATIONS=[
  ['Le dan un abrazo muy fuerte.','alegría'],['Gana una carrera con sus amigos.','alegría'],['Hoy es su cumpleaños.','alegría'],
  ['Se le ha caído el helado al suelo.','tristeza'],['Su amigo se va a vivir lejos.','tristeza'],
  ['Le quitan su juguete sin pedírselo.','enfado'],['Le rompen el dibujo que había hecho.','enfado'],
  ['Hay una tormenta con muchos truenos.','miedo'],['Oye un ruido raro en la oscuridad.','miedo'],
  ['Abre una caja y sale un muñeco de un salto.','sorpresa'],['Encuentra un regalo debajo de la almohada.','sorpresa'],
  ['Ha jugado todo el día y ya es de noche.','sueño']];
DATA.es.NEXT_SEQS=[
  {e:['🥚','🐣','🐔'],t:'Del huevo sale un pollito, y el pollito crece hasta ser una gallina.'},
  {e:['🌱','🪴','🌳'],t:'La semilla brota, crece y se hace un árbol.'},
  {e:['🐛','🦋'],t:'La oruga se convierte en mariposa.'},
  {e:['🌧️','🌈'],t:'Después de la lluvia, a veces sale el arcoíris.'},
  {e:['🧦','👟'],t:'Primero los calcetines y después los zapatos.'},
  {e:['🧼','🍽️'],t:'Nos lavamos las manos antes de comer.'},
  {e:['🌅','☀️','🌙'],t:'Por la mañana sale el sol, y por la noche, la luna.'},
  {e:['👶','🧒','🧑'],t:'Los bebés crecen y se hacen niños y luego mayores.'},
  {e:['🌸','🍏','🍎'],t:'Primero la flor, después la fruta verde y luego madura.'},
  {e:['❄️','⛄','💧'],t:'Con la nieve hacemos un muñeco, y con el sol se derrite.'},
  {e:['🛏️','🪥','🎒'],t:'Nos levantamos, nos lavamos los dientes y vamos al cole.'},
  {e:['🎂','🕯️','🥳'],t:'Ponemos las velas en la tarta, las soplamos y ¡a celebrar!'}];

/* ---------- puzle ---------- */
const PUZZLE_PICS=['🦁','🐘','🚀','🏠','🌈','🐢','🦄','🚂','🐙','🌻','🐳','🦋'];
function puzle(g){
  let n=age==='p'?2:3,pic=null,placed=0,sel=null;
  const draw=()=>{
    pic=pick(PUZZLE_PICS.filter(x=>x!==pic));placed=0;sel=null;
    const W=Math.min(340,Math.floor(($('#stage').clientWidth||340)*.9)),s=Math.floor(W/n),B=s*n;
    const inner=(i)=>`<span class="pz-img" style="width:${B}px;height:${B}px;font-size:${Math.round(B*.82)}px;left:${-(i%n)*s}px;top:${-Math.floor(i/n)*s}px">${pic}</span>`;
    const ids=[...Array(n*n).keys()];
    $('#stage').innerHTML=`<div class="screen"><div class="row">${[2,3].map(k=>`<button class="pill" data-n="${k}" aria-pressed="${k===n}">${_('{n} piezas',{n:k*k})}</button>`).join('')}</div>
      <div class="pz-board" id="pzb" style="width:${B}px;height:${B}px;grid-template-columns:repeat(${n},${s}px)">
        <span class="pz-ghost" style="font-size:${Math.round(B*.82)}px">${pic}</span>
        ${ids.map(i=>`<button class="pz-slot" data-i="${i}" aria-label="${_('Hueco')} ${i+1}" style="width:${s}px;height:${s}px"></button>`).join('')}</div>
      <div class="pz-tray" id="pzt">${shuffle(ids).map(i=>`<button class="pz-pc" data-i="${i}" aria-label="${_('Pieza')}" style="width:${s}px;height:${s}px">${inner(i)}</button>`).join('')}</div></div>`;
    say(_('Toca una pieza y luego toca su sitio en el puzle.'));
    $('#stage').querySelector('.row').onclick=e=>{const b=e.target.closest('[data-n]');if(b){n=+b.dataset.n;draw();}};
    const choose=pc=>{if(sel)sel.classList.remove('sel');sel=sel===pc?null:pc;if(sel){sel.classList.add('sel');tone([600],.05);}};
    const tryPlace=slot=>{if(!sel||slot.firstChild)return;
      if(slot.dataset.i===sel.dataset.i){slot.innerHTML=sel.innerHTML;slot.classList.add('done');sel.remove();sel=null;placed++;tone([660,880],.07);
        if(placed===n*n){$('#pzb').classList.add('full');yay();confetti();star();say(_('¡Puzle terminado! ¡Qué bien!'));
          later(()=>{const b=document.createElement('button');b.className='again';b.textContent=_('Otro puzle');b.onclick=draw;$('#stage .screen').appendChild(b);},900);}}
      else{anim(sel,'wobble');nope();say(_('Ahí no va. Prueba en otro sitio.'));}};
    let drag=null,x0=0,y0=0,moved=false;
    $('#pzt').onpointerdown=e=>{const pc=e.target.closest('.pz-pc');if(!pc)return;e.preventDefault();drag=pc;x0=e.clientX;y0=e.clientY;moved=false;pc.setPointerCapture(e.pointerId);};
    $('#pzt').onpointermove=e=>{if(!drag)return;const dx=e.clientX-x0,dy=e.clientY-y0;if(Math.abs(dx)+Math.abs(dy)>8)moved=true;
      if(moved)drag.style.transform=`translate(${dx}px,${dy}px)`;};
    $('#pzt').onpointerup=e=>{if(!drag)return;const pc=drag;drag=null;pc.style.transform='';
      if(!moved){choose(pc);return;}
      const slot=document.elementsFromPoint(e.clientX,e.clientY).find(x=>x.classList?.contains('pz-slot'));
      if(slot){if(sel!==pc)choose(pc);tryPlace(slot);}};
    $('#pzt').onpointercancel=()=>{if(drag)drag.style.transform='';drag=null;};
    $('#pzb').onclick=e=>{const slot=e.target.closest('.pz-slot');if(slot)tryPlace(slot);};
  };
  draw();
}

/* ---------- piano de animales ---------- */
const KEYS=[['🐶',262,'var(--red)'],['🐱',294,'var(--orange)'],['🐮',330,'var(--yellow)'],['🐷',349,'var(--green)'],
  ['🐸',392,'var(--teal)'],['🐥',440,'var(--blue)'],['🐵',494,'var(--purple)'],['🦁',523,'var(--pink)']];
/* Estrellita, ¿dónde estás?: do do sol sol la la sol, fa fa mi mi re re do. */
const TWINKLE=[0,0,4,4,5,5,4,-1,3,3,2,2,1,1,0];
function piano(){
  let simon=null;
  $('#stage').innerHTML=`<div class="screen"><p class="tip" id="pt">${_('Toca las teclas para hacer música.')}</p>
    <div class="piano" id="pk">${KEYS.map((k,i)=>`<button data-i="${i}" style="background:${k[2]}" aria-label="${_('Nota')} ${i+1}"><span>${k[0]}</span></button>`).join('')}</div>
    <div class="row"><button class="pill" id="song">${_('🎵 Estrellita')}</button><button class="pill" id="sim">${_('🔁 Repite conmigo')}</button></div></div>`;
  const keys=[...document.querySelectorAll('#pk button')];
  const play=i=>{const k=KEYS[i];if(S.voz)tone([k[1]],.28);const b=keys[i];b.classList.add('on');setTimeout(()=>b.classList.remove('on'),260);anim(b.firstChild,'pop');};
  const playSeq=(seq,gap,done)=>{seq.forEach((i,j)=>later(()=>{if(i>=0)play(i);},j*gap));if(done)later(done,seq.length*gap+200);};
  $('#pk').onpointerdown=e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();const i=+b.dataset.i;play(i);
    if(!simon||simon.busy)return;
    if(i===simon.seq[simon.pos]){simon.pos++;if(simon.pos===simon.seq.length){simon.busy=true;star();
        if(simon.seq.length>=6){$('#pt').textContent=_('¡Eres un gran músico!');say(_('¡Bravo! ¡Eres un gran músico!'));confetti();simon=null;return;}
        $('#pt').textContent=_('¡Muy bien! Escucha la siguiente.');later(()=>{simon.seq.push(rnd(5));turn();},1200);}}
    else{simon.busy=true;nope();$('#pt').textContent=_('¡Casi! Escucha otra vez.');later(turn,1300);}};
  const turn=()=>{if(!simon)return;simon.pos=0;simon.busy=true;$('#pt').textContent=_('Escucha…');
    playSeq(simon.seq,600,()=>{if(simon){simon.busy=false;$('#pt').textContent=_('¡Ahora tú! Repite las notas.');}});};
  $('#song').onclick=()=>{simon=null;clearTimers();$('#pt').textContent=_('Estrellita, ¿dónde estás?');playSeq(TWINKLE,420,()=>{$('#pt').textContent=_('¿La tocas tú? Empieza por el perrito.');});};
  $('#sim').onclick=()=>{clearTimers();simon={seq:[rnd(5),rnd(5)],pos:0,busy:true};say(_('Escucha y repite.'));later(turn,1400);};
  say(_('Toca las teclas para hacer música.'));
}

Object.assign(CUSTOM,{puzle,piano});
