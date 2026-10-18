/* Patio de Juegos · aplicación: pantallas, motor de preguntas con niveles, álbum, zona de padres, idiomas y descansos. */

/* ---------- pantallas ---------- */
const AGE_TITLES={p:N_('Juegos para 2 a 4 años'),m:N_('Juegos para 5 a 7 años'),g:N_('Juegos para 8 a 10 años'),x:N_('Juegos para 11 y 12 años'),t:N_('Cuentos para escuchar'),i:N_('Aprende idiomas jugando')};
const SCREENS={age:'#s-age',list:'#s-home',game:'#s-game',album:'#s-album',padres:'#s-padres',break:'#s-break'};
let age='p',cur=null,score=0,busy=false,round=null,screen='age',back='age',onKey=null;
function show(n){
  if(n==='album'||n==='padres'){if(screen!=='album'&&screen!=='padres')back=screen==='game'?'list':screen;}
  screen=n;for(const k in SCREENS)$(SCREENS[k]).hidden=k!==n;
  $('#home').hidden=n==='age'||n==='break';
  $('#home').setAttribute('aria-label',n==='game'?_('Volver a los juegos'):n==='list'?_('Cambiar de edad'):_('Volver'));
  $('#album').hidden=n==='album'||n==='break';$('#padres').hidden=n==='padres'||n==='break';
  if(n!=='game')onKey=null;
  window.scrollTo(0,0);
}
/* Todos los juegos, más los cuentos del idioma elegido. */
const allGames=()=>GAMES.concat((D.TALES||[]).map(taleGame));
const visible=g=>gameInLang(g)&&(g.age!=='i'||!!learnLang());
const label=x=>typeof x==='function'?x():_(x);
function renderDoors(){
  $('#ltitle').textContent=_(AGE_TITLES[age]);
  let head='';
  if(age==='i'){const opts=learnable(),T=learnLang();
    head=opts.length>1?`<div class="row learn" id="learn">${opts.map(c=>`<button class="pill" data-l="${c}" aria-pressed="${c===T}">${esc(cap(langName(c)))}</button>`).join('')}</div>`:
      `<p class="tip">${_('Aprendemos {l}. Toca un juego para empezar.',{l:langName(T)})}</p>`;}
  $('#lhead').innerHTML=head;
  $('#doors').innerHTML=allGames().filter(g=>g.age.includes(age)&&visible(g)).map(g=>
    `<button class="door" data-go="${g.id}" style="background:${g.bg}"><span class="pic">${g.pic}</span><span class="name">${esc(g.translated?g.name:_(g.name))}</span><span class="what">${esc(g.translated?g.what:label(g.what))}</span></button>`).join('');
}
$('#lhead').addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;S.aprender=b.dataset.l;saveSettings();renderDoors();
  say(_('Aprendemos {l}.',{l:langName(S.aprender)}));});
$('#ages').addEventListener('click',e=>{const b=e.target.closest('.agecard');if(!b)return;age=b.dataset.age;store.set('edad',age);renderDoors();show('list');tone([600],.08);say($('#ltitle').textContent);});
$('#doors').addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)start(allGames().find(g=>g.id===b.dataset.go));});
function renderAges(){const ok=!!learnLang();document.querySelector('.agecard[data-age="i"]').hidden=!ok;
  if(ok)$('#i-what').textContent=_('Palabras y frases en {l}',{l:langName(learnLang())});}

function start(g){
  if(!g)return;
  if(breakDue())return showBreak();
  clearTimers();stopVoice();$('#stage').onclick=null;$('#stage').className='';cur=g;score=0;streak=0;struggle=0;onKey=null;
  $('#stars').innerHTML='';$('#gtitle').textContent=g.translated?g.name:_(g.name);countPlay(g.id);renderLevels();show('game');
  if(g.custom)CUSTOM[g.custom](g);else next();
}
function goHome(){
  const from=screen;clearTimers();stopVoice();
  if(from==='game'){cur=null;$('#stage').innerHTML='';if(breakDue())return showBreak();renderDoors();show('list');say(_('¿A qué jugamos?'));}
  else if(from==='album'||from==='padres'){if(back==='list')renderDoors();if(back==='age')renderAges();show(back);}
  else{show('age');say(_('¿Cuántos años tienes?'));}
}
document.addEventListener('keydown',e=>{if(screen==='game'&&onKey)onKey(e);});
/* Estrella del juego actual: se ven 5 arriba y cada una cuenta para las pegatinas del álbum. */
function star(){score++;const s=document.createElement('span');s.textContent='⭐';$('#stars').appendChild(s);addStar();
  if(score>=5){score=0;later(()=>{$('#stars').innerHTML='';},1800);}}

/* ---------- niveles ---------- */
const LEVEL_NAMES={2:[N_('🌱 Fácil'),N_('🌳 Difícil')],3:[N_('🌱 Fácil'),N_('🌿 Medio'),N_('🌳 Difícil')]};
let streak=0,struggle=0,roundMiss=0;
const hasLevels=g=>g&&!g.custom&&g.levels>1;
const level=()=>hasLevels(cur)?Math.min(P.nivel[cur.id]||0,cur.levels-1):0;
function renderLevels(){const box=$('#lvl');
  if(!hasLevels(cur)){box.hidden=true;box.innerHTML='';return;}
  const names=LEVEL_NAMES[cur.levels]||Array.from({length:cur.levels},(_x,i)=>_('Nivel {n}',{n:i+1}));
  box.innerHTML=names.map((n,i)=>`<button class="pill" data-l="${i}" aria-pressed="${i===level()}">${_(n)}</button>`).join('');box.hidden=false;}
$('#lvl').addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b||!cur)return;
  P.nivel[cur.id]=+b.dataset.l;saveP();streak=0;struggle=0;renderLevels();clearTimers();next();});
/* Sube un nivel tras 4 aciertos seguidos a la primera; baja si cuesta mucho dos rondas seguidas. */
function adapt(){
  if(!hasLevels(cur)||!S.niveles)return '';
  if(roundMiss===0){streak++;struggle=0;}else{streak=0;struggle=roundMiss>=2?struggle+1:0;}
  const l=level();
  if(streak>=4&&l<cur.levels-1){P.nivel[cur.id]=l+1;saveP();streak=0;renderLevels();return ' '+_('¡Subes de nivel!');}
  if(struggle>=2&&l>0){P.nivel[cur.id]=l-1;saveP();struggle=0;renderLevels();}
  return '';
}

/* ---------- motor de preguntas ---------- */
const CHEERS=[N_('¡Muy bien!'),N_('¡Genial!'),N_('¡Bravo!'),N_('¡Lo lograste!'),N_('¡Eres un crack!'),N_('¡Fantástico!')];
function next(){
  if(breakDue())return showBreak();
  busy=false;roundMiss=0;round=cur.gen(level());const r=round;
  $('#stage').innerHTML=`<div class="screen"><p class="prompt">${r.prompt}</p>${r.visual?`<div class="visual" id="vis">${r.visual}</div>`:''}<div class="choices" id="choices"></div></div>`;
  const ch=$('#choices');
  r.opts.forEach(o=>{const b=document.createElement('button');
    if(o.dot){b.className='dot';b.style.background=o.dot;if(o.aria)b.innerHTML=`<span class="cname">${esc(o.aria)}</span>`;}
    else{b.className='tile'+(o.cls?' '+o.cls:'');b.innerHTML=o.html;}
    b.dataset.v=o.v;b.setAttribute('aria-label',o.aria||o.v);ch.appendChild(b);});
  speakRound();
}
/* sayFx: palabra en el idioma que se aprende (fxLang), dicha con su voz después de la pregunta. */
function speakRound(){const r=round;if(r.sayFx)sayThen(r.speak,()=>{if(round===r&&!busy)say(r.sayFx,r.fxLang);});else say(r.speak);}
$('#stage').addEventListener('click',e=>{
  if(!cur||cur.custom)return;
  const c=e.target.closest('.cnt');
  if(c&&round.countable){const all=[...document.querySelectorAll('#vis .cnt')];
    all.forEach((x,i)=>later(()=>{anim(x,'pop');tone([440+i*60],.1);},i*450));
    say(D.NUMWORDS.slice(1,all.length+1).join(', '));return;}
  if(e.target.closest('.prompt')&&!busy){speakRound();return;}
  const b=e.target.closest('#choices button');if(!b||busy)return;
  if(b.dataset.v===round.answer){busy=true;anim(b,'pop');yay();confetti();star();
    const up=adapt(),txt=_(pick(CHEERS))+' '+round.right+up;
    if(round.fx){const r=round;sayThen(txt,()=>{if(round===r)say(r.fx,r.fxLang);});later(next,4200);}else{say(txt);later(next,up?3200:2300);}}
  else{roundMiss++;anim(b,'wobble');nope();say(round.wrong(b.dataset.v));}
});

/* ---------- álbum de pegatinas ---------- */
function renderAlbum(){
  const have=new Set(P.pegatinas),n=P.pegatinas.length,falta=5-P.estrellas%5,N=STICKERS.length;
  $('#alb-info').textContent=n===N?_('¡Tienes las {n} pegatinas! Eres un campeón.',{n}):
    falta===1?_('Tienes {n} de {t} pegatinas. Te falta 1 estrella para la siguiente.',{n,t:N}):_('Tienes {n} de {t} pegatinas. Te faltan {f} estrellas para la siguiente.',{n,t:N,f:falta});
  $('#alb-bar').style.width=(n===N?100:(5-falta)/5*100)+'%';
  $('#alb-grid').innerHTML=STICKERS.map(e=>{const nm=(D.STICKER_NAMES||{})[e]||'';return have.has(e)?
    `<button class="slot got" data-n="${esc(nm)}" aria-label="${esc(nm)}">${e}</button>`:
    `<button class="slot" aria-label="${_('Pegatina escondida')}">?</button>`;}).join('');
}
$('#album').addEventListener('click',()=>{stopVoice();clearTimers();renderAlbum();show('album');say($('#alb-info').textContent);});
$('#alb-grid').addEventListener('click',e=>{const b=e.target.closest('.slot');if(!b)return;
  if(b.classList.contains('got')){anim(b,'pop');tone([660,880],.07);if(b.dataset.n)say(b.dataset.n);}
  else say(_('Esta pegatina todavía no la tienes. Gana estrellas jugando para conseguirla.'));});

/* ---------- descansos ---------- */
let playMs=0,lastTick=Date.now();
setInterval(()=>{const now=Date.now();if(screen==='game'&&!document.hidden)playMs+=Math.min(now-lastTick,10000);lastTick=now;},5000);
const breakDue=()=>S.descanso>0&&playMs>=S.descanso*60000;
const MOVES=[['🙆',N_('Estira los brazos hacia el cielo, muy alto.')],['🤸',N_('Mueve los hombros y gira la cabeza despacito.')],
  ['💧',N_('Bebe un poco de agua.')],['🪟',N_('Mira algo que esté lejos, por la ventana.')],['🦘',N_('Da cinco saltitos de canguro.')]];
function showBreak(){
  clearTimers();stopVoice();cur=null;$('#stage').innerHTML='';playMs=0;show('break');
  const moves=sample(MOVES,3);let i=0,left=30;$('#brk-go').hidden=true;
  const step=()=>{const m=moves[i%moves.length];$('#brk-pic').textContent=m[0];$('#brk-txt').textContent=_(m[1]);anim($('#brk-pic'),'pop');say(_(m[1]));i++;};
  say(_('¡Hora de un descanso! Tus ojos y tu cuerpo también quieren jugar.'));later(step,3500);
  const t=setInterval(()=>{left--;$('#brk-left').textContent=left>0?left:'';if(left>0&&left%9===0)step();
    if(left<=0){clearInterval(t);$('#brk-go').hidden=false;say(_('¡Muy bien! Ya puedes volver a jugar.'));}},1000);timers.push(t);
  $('#brk-left').textContent=left;
}
$('#brk-go').addEventListener('click',()=>{clearTimers();renderDoors();show('list');say(_('¿A qué jugamos?'));});

/* ---------- idioma de la pantalla ---------- */
function renderLangs(){const codes=Object.keys(LANGS);const box=$('#langs');
  box.hidden=codes.length<2;box.innerHTML=codes.map(c=>`<button class="pill" data-lang="${c}" aria-pressed="${c===LANG}" lang="${c}">${esc(LANGS[c].name)}</button>`).join('');}
function changeLang(c){setLang(c);renderLangs();renderAges();if(screen==='list')renderDoors();if(screen==='padres'&&!$('#ajustes').hidden)renderParents();}
$('#langs').addEventListener('click',e=>{const b=e.target.closest('[data-lang]');if(!b)return;changeLang(b.dataset.lang);say(_('¿Cuántos años tienes?'));});

/* ---------- zona de padres ---------- */
let gate=null;
function openParents(){stopVoice();clearTimers();
  const a=range(12,19),b=range(3,9);gate={ans:a*b,typed:''};
  $('#gate-q').textContent=_('Para entrar, escribe cuánto es {a} × {b}',{a,b});$('#gate-v').textContent='';
  $('#gate').hidden=false;$('#ajustes').hidden=true;show('padres');}
$('#padres').addEventListener('click',openParents);
$('#gate-pad').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!gate)return;
  const k=b.dataset.k;
  if(k==='del')gate.typed=gate.typed.slice(0,-1);
  else if(k==='ok'){if(+gate.typed===gate.ans){gate=null;renderParents();$('#gate').hidden=true;$('#ajustes').hidden=false;return;}
    gate.typed='';anim($('#gate-v'),'wobble');nope();}
  else if(gate.typed.length<4)gate.typed+=k;
  $('#gate-v').textContent=gate.typed;});

const TOGGLES=[
  ['voz',N_('Voz y sonidos'),N_('El juego lee las preguntas en voz alta.')],
  ['subtitulos',N_('Subtítulos'),N_('Muestra escrito lo que dice la voz. Útil sin sonido o con dificultades auditivas.')],
  ['calma',N_('Modo calma'),N_('Menos animaciones y confeti, colores más suaves, sonidos más bajos y globos más lentos.')],
  ['grande',N_('Botones y letra más grandes'),N_('Para manos pequeñas o vista cansada.')],
  ['contraste',N_('Alto contraste'),N_('Bordes y textos más marcados.')],
  ['legible',N_('Letra fácil de leer'),N_('Usa una letra pensada para personas con baja visión o dislexia.')],
  ['nombresColor',N_('Nombres en los colores'),N_('Escribe el nombre de cada color. Ayuda a niños con daltonismo.')],
  ['niveles',N_('Niveles automáticos'),N_('La dificultad sube o baja sola según los aciertos.')]];
let deferredInstall=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;});
const voiceMsg=()=>!('speechSynthesis' in window)?_('Este navegador no puede leer en voz alta. Prueba con Chrome, Edge o Safari.'):
  hasVoice()?_('Hay una voz en {l} en este dispositivo. ✅',{l:langName(LANG)}):
  voiceChecked?_('No hemos encontrado una voz en {l}. En Android: Ajustes › Accesibilidad › Salida de texto a voz. En iPad: Ajustes › Accesibilidad › Contenido leído › Voces.',{l:langName(LANG)}):
  _('Comprobando la voz… pulsa «Probar la voz».');
function renderParents(){
  const games=allGames(),gname=g=>esc(g.translated?g.name:_(g.name));
  const top=Object.entries(P.jugado).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([id,n])=>{const g=games.find(x=>x.id===id);return g?`<li>${g.pic} ${gname(g)}: ${n===1?_('1 vez'):_('{n} veces',{n})}</li>`:'';}).join('');
  const lv=Object.entries(P.nivel).filter(([,l])=>l>0).map(([id,l])=>{const g=games.find(x=>x.id===id);return g?`${gname(g)} (${_((LEVEL_NAMES[g.levels]||[])[l]||'')||l+1})`:'';}).filter(Boolean).join(', ');
  const learn=learnable();
  $('#ajustes').innerHTML=`
    <h2>${_('Zona de padres y educadores')}</h2>
    <p class="note">${_('Los ajustes y el progreso se guardan solo en este dispositivo. Nada sale de aquí.')}</p>
    <div class="set">
      <h3>${_('Idiomas')}</h3>
      <div class="opt"><b>${_('Idioma de la pantalla y de la voz')}</b><div class="row" data-group="idioma">
        ${Object.keys(LANGS).map(c=>`<button class="pill" data-v="${c}" aria-pressed="${c===LANG}" lang="${c}">${esc(LANGS[c].name)}</button>`).join('')}</div></div>
      ${learn.length?`<div class="opt"><b>${_('Idioma para aprender jugando')}</b><div class="row" data-group="aprender">
        ${learn.map(c=>`<button class="pill" data-v="${c}" aria-pressed="${c===learnLang()}">${esc(cap(langName(c)))}</button>`).join('')}</div></div>`:''}
      <small>${_('¿Quieres traducir el Patio a tu idioma? Solo hay que traducir unos archivos de texto; mira la guía para voluntarios.')}</small>
    </div>
    <div class="set">
      <h3>${_('Sonido, pantalla y accesibilidad')}</h3>
      ${TOGGLES.map(([k,t,d])=>`<label class="sw"><input type="checkbox" data-k="${k}" ${S[k]?'checked':''}><span><b>${_(t)}</b><small>${_(d)}</small></span></label>`).join('')}
      <div class="opt"><b>${_('Velocidad de la voz')}</b><div class="row" data-group="velocidad">
        ${[[.8,N_('🐢 Lenta')],[1,N_('Normal')],[1.15,N_('🐇 Rápida')]].map(([v,t])=>`<button class="pill" data-v="${v}" aria-pressed="${S.velocidad===v}">${_(t)}</button>`).join('')}</div></div>
      <div class="opt"><b>${_('Voz')}</b><p class="note" id="voice-msg">${voiceMsg()}</p><button class="pill" id="voice-test">${_('🔊 Probar la voz')}</button></div>
    </div>
    <div class="set">
      <h3>${_('Tiempo de pantalla')}</h3>
      <div class="opt"><b>${_('Proponer un descanso cada')}</b><div class="row" data-group="descanso">
        ${[[0,N_('Nunca')],[15,N_('15 min')],[20,N_('20 min')],[30,N_('30 min')],[45,N_('45 min')]].map(([v,t])=>`<button class="pill" data-v="${v}" aria-pressed="${S.descanso===v}">${_(t)}</button>`).join('')}</div>
        <small>${_('Al llegar el tiempo, el juego invita a estirarse, beber agua y mirar lejos durante 30 segundos.')}</small></div>
    </div>
    <div class="set">
      <h3>${_('Progreso en este dispositivo')}</h3>
      <p>${_('⭐ {e} estrellas · 📒 {p} de {t} pegatinas',{e:P.estrellas,p:P.pegatinas.length,t:STICKERS.length})}</p>
      ${top?`<p><b>${_('Lo que más juega:')}</b></p><ul>${top}</ul>`:`<p class="note">${_('Todavía no hay partidas.')}</p>`}
      ${lv?`<p><b>${_('Niveles alcanzados:')}</b> ${lv}</p>`:''}
      <button class="pill danger" id="reset">${_('Borrar el progreso')}</button>
    </div>
    <div class="set">
      <h3>${_('Usarlo sin internet')}</h3>
      ${EDICION==='web'?`<p>${_('Instálalo en la tablet y funcionará aunque no haya conexión.')}</p>
        ${deferredInstall?`<button class="pill go" id="install">${_('📲 Instalar en este dispositivo')}</button>`:''}
        <p class="note">${_('<b>Android (Chrome):</b> menú ⋮ › «Añadir a pantalla de inicio» o «Instalar aplicación».<br><b>iPad o iPhone (Safari):</b> botón Compartir › «Añadir a pantalla de inicio».')}</p>
        <p><a href="fichas.html" target="_blank" rel="noopener">${_('🖨️ Fichas para imprimir')}</a> · <a href="cartel.html" target="_blank" rel="noopener">${_('📌 Cartel con QR')}</a></p>`:
        `<p class="note">${_('Esta es la demostración. La versión web publicada se podrá instalar en la tablet y usar sin internet, y tendrá fichas para imprimir y un cartel con código QR.')}</p>`}
    </div>
    <div class="set">
      <h3>${_('Privacidad y aviso legal')}</h3>
      <details><summary>${_('Privacidad')}</summary>${legal('privacidad')}</details>
      <details><summary>${_('Aviso legal')}</summary>${legal('aviso')}</details>
      <details><summary>${_('Créditos y licencias')}</summary>${legal('creditos')}</details>
    </div>`;
}
/* Textos legales: el del idioma elegido si existe; si no, el español. */
const legal=k=>($('#t-'+k+'-'+LANG)||$('#t-'+k+'-es')||{innerHTML:''}).innerHTML;
$('#ajustes').addEventListener('change',e=>{const i=e.target.closest('input[data-k]');if(!i)return;
  S[i.dataset.k]=i.checked;saveSettings();if(i.dataset.k==='voz'&&!i.checked)stopVoice();});
$('#ajustes').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const grp=b.closest('[data-group]');
  if(grp){const k=grp.dataset.group;
    if(k==='idioma'){changeLang(b.dataset.v);return;}
    S[k]=k==='aprender'?b.dataset.v:+b.dataset.v;saveSettings();grp.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(k==='velocidad')say(_('Así hablaré a partir de ahora.'));if(k==='aprender')renderAges();return;}
  if(b.id==='voice-test'){pickVoice();say(_('Hola, soy la voz del Patio de Juegos.'));
    later(()=>{pickVoice();const m=$('#voice-msg');if(m)m.textContent=hasVoice()?voiceMsg():_('Si no has oído nada, sube el volumen o instala una voz en los ajustes del dispositivo.');},1500);}
  if(b.id==='install'&&deferredInstall){deferredInstall.prompt();deferredInstall=null;b.remove();}
  if(b.id==='reset'){if(b.dataset.sure){P.estrellas=0;P.pegatinas=[];P.jugado={};P.nivel={};saveP();renderParents();}
    else{b.dataset.sure='1';b.textContent=_('¿Seguro? Toca otra vez para borrar');}}
});

/* ---------- botones generales e inicio ---------- */
$('#home').addEventListener('click',goHome);
$('#sound').addEventListener('click',()=>{S.voz=!S.voz;saveSettings();if(!S.voz)stopVoice();else say(_('Sonido activado'));});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopVoice();});
if(EDICION==='web'&&'serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('sw.js').catch(()=>{});
applySettings();
setLang(initialLang());
renderLangs();renderAges();
show('age');
