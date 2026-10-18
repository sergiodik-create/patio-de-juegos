/* Patio de Juegos · aplicación: pantallas, motor de preguntas con niveles, álbum, zona de padres, idiomas y descansos. */

/* ---------- pantallas ---------- */
const AGE_TITLES={p:N_('Juegos para 2 a 4 años'),m:N_('Juegos para 5 a 7 años'),g:N_('Juegos para 8 a 10 años'),x:N_('Juegos para 11 y 12 años'),t:N_('Cuentos para escuchar'),i:N_('Aprende idiomas jugando')};
const SCREENS={age:'#s-age',list:'#s-home',game:'#s-game',album:'#s-album',padres:'#s-padres',break:'#s-break'};
let age='p',cur=null,score=0,busy=false,round=null,screen='age',back='age',onKey=null;
let newVersion=false;  // hay una versión nueva de la web: se recarga al volver al inicio (ver «versión nueva» más abajo)
function show(n){
  if((n==='age'||n==='list')&&newVersion){reloadAt(n);return;}
  if(n==='album'||n==='padres'){if(screen!=='album'&&screen!=='padres')back=screen==='game'?'list':screen;}
  screen=n;for(const k in SCREENS)$(SCREENS[k]).hidden=k!==n;
  $('#home').hidden=n==='age'||n==='break';
  $('#home').setAttribute('aria-label',n==='game'?_('Volver a los juegos'):n==='list'?_('Cambiar de edad'):_('Volver'));
  $('#album').hidden=n==='album'||n==='break';$('#padres').hidden=n==='padres'||n==='break';
  if(n!=='game')onKey=null;
  if(n!=='age'&&n!=='list')$('#inst').hidden=true;
  window.scrollTo(0,0);focusFirst();
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
/* ---------- mando de la tele y teclado ----------
   Las flechas llevan al botón más cercano en esa dirección (los juegos con flechas propias, como el laberinto, las usan ellos),
   OK o Intro lo pulsa y «Atrás» vuelve. Tras la primera flecha el marco se ve grande y el foco salta solo a cada pantalla nueva. */
let mando=false;
const focusables=()=>[...document.querySelectorAll('main button,main a[href],main input,main summary,header button,#inst button')].filter(el=>!el.disabled&&el.getClientRects().length);
function focusFirst(){if(!mando)return;setTimeout(()=>{const a=document.activeElement;if(a&&a!==document.body&&a.getClientRects().length)return;
  const f=focusables().filter(el=>el.closest('main'));(f.find(el=>el.closest('#choices,#doors,#ages'))||f[0])?.focus();},60);}
function moveFocus(k){
  const all=focusables(),a=document.activeElement;if(!all.length)return;
  if(!all.includes(a)){(all.find(el=>el.closest('main'))||all[0]).focus();return;}
  const r=a.getBoundingClientRect(),x0=r.left+r.width/2,y0=r.top+r.height/2,h=k==='ArrowLeft'||k==='ArrowRight';let best=null,bd=Infinity;
  for(const el of all){if(el===a)continue;const q=el.getBoundingClientRect(),dx=q.left+q.width/2-x0,dy=q.top+q.height/2-y0;
    const along={ArrowRight:dx,ArrowLeft:-dx,ArrowDown:dy,ArrowUp:-dy}[k],across=h?Math.abs(dy):Math.abs(dx);
    if(along<=2)continue;const d=along+across*(h?3:1.5);if(d<bd){bd=d;best=el;}}
  if(best){best.focus();best.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});}
}
document.addEventListener('keydown',e=>{
  const k=e.key,a=document.activeElement,typing=a&&a.matches('input:not([type=checkbox]),textarea');
  if(['Escape','GoBack','BrowserBack','Back'].includes(k)||e.keyCode===461||e.keyCode===10009){if(screen!=='age'){e.preventDefault();goHome();}return;}
  if(!k.startsWith('Arrow')||typing||(screen==='game'&&onKey))return;
  e.preventDefault();if(!mando){mando=true;document.documentElement.dataset.mando='si';}moveFocus(k);
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement?.matches('input[type=checkbox]')){e.preventDefault();document.activeElement.click();}});
document.addEventListener('pointerdown',()=>{if(mando){mando=false;document.documentElement.dataset.mando='no';}});
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
    if(o.dot){b.className='dot';b.style.background=o.dot;b.dataset.col=colKey(o.dot);if(o.aria)b.innerHTML=`<span class="cname">${esc(o.aria)}</span>`;}
    else{b.className='tile'+(o.cls?' '+o.cls:'');b.innerHTML=o.html;}
    b.dataset.v=o.v;b.setAttribute('aria-label',o.aria||o.v);ch.appendChild(b);});
  speakRound();focusFirst();
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
  ['daltonico',N_('Modo daltónico'),N_('Colores que se distinguen mejor y un dibujo en cada color: rayas en el rojo, puntos en el azul, estrellas en el amarillo…')],
  ['niveles',N_('Niveles automáticos'),N_('La dificultad sube o baja sola según los aciertos.')]];
/* ---------- instalar como aplicación ----------
   Al abrir la web se ofrece instalarla (Android, Chrome y Edge con el botón del navegador; en iPhone y iPad se explica
   cómo, porque Safari no deja ofrecerlo). No sale si ya está instalada, y «Ahora no» la calla tres semanas. */
let deferredInstall=null;
const installed=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function offerInstall(){
  if(EDICION!=='web'||installed()||Date.now()<store.get('instalarNo',0)||(screen!=='age'&&screen!=='list'))return;
  const ios=!deferredInstall&&isIOS();if(!deferredInstall&&!ios)return;
  $('#inst').innerHTML=`<span class="ipic">📲</span><span class="itxt"><b>${_('Instala el Patio de Juegos')}</b><small>${ios?
    _('Toca el botón Compartir (el cuadrado con una flecha) y luego «Añadir a pantalla de inicio».'):_('Se abre como una aplicación y funciona sin internet.')}</small></span>
    <span class="ibtns">${ios?'':`<button class="pill go" id="inst-ok">${_('Instalar')}</button>`}<button class="pill" id="inst-no">${_('Ahora no')}</button></span>`;
  $('#inst').hidden=false;
}
$('#inst').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.id==='inst-ok'&&deferredInstall){deferredInstall.prompt();deferredInstall=null;}else store.set('instalarNo',Date.now()+21*864e5);
  $('#inst').hidden=true;});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;setTimeout(offerInstall,2500);});
addEventListener('appinstalled',()=>{deferredInstall=null;$('#inst').hidden=true;});
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
      <h3>${_('Compartir el Patio')}</h3>
      <p>${_('Si te gusta, compártelo con otras familias, el cole o tu asociación. Es gratis para todos.')}</p>
      <div class="row start"><button class="pill go" id="share">${_('📤 Compartir el enlace')}</button>${EDICION==='web'?`<button class="pill" id="qr">${_('🔳 Enseñar el código QR')}</button>`:''}</div>
      <p class="note" id="share-msg">${esc(siteUrl().replace(/^https?:\/\//,'').replace(/\/$/,''))}</p>
      <div class="qr-box" id="qr-box" hidden></div>
    </div>
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
      <div class="opt"><b>${_('Animaciones')}</b><div class="row" data-group="movimiento">
        ${[['auto',N_('Automático')],['poco',N_('Pocas')],['mucho',N_('Muchas')]].map(([v,t])=>`<button class="pill" data-v="${v}" aria-pressed="${S.movimiento===v}">${_(t)}</button>`).join('')}</div>
        <small>${_('En «Automático», el Patio mide lo rápido que va este aparato y añade más movimiento solo si va sobrado. El modo calma siempre manda.')}</small></div>
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
/* Compartir: el menú de compartir del propio aparato (WhatsApp, correo…) o, si no lo tiene (ordenador, tele),
   copiar el enlace y enseñar un código QR. No usa ningún servicio de fuera: el QR se dibuja aquí mismo. */
const siteUrl=()=>typeof CONFIG!=='undefined'&&CONFIG.dominio?'https://'+CONFIG.dominio.replace(/^https?:\/\//,'').replace(/\/$/,'')+'/':
  /^https?:$/.test(location.protocol)?location.origin+location.pathname.replace(/[^/]*$/,''):'';
function shareSite(){const url=siteUrl(),msg=t=>{const m=$('#share-msg');if(m)m.textContent=t;};
  if(navigator.share){navigator.share({title:_('Patio de Juegos'),text:_('Juegos educativos gratis para niños de 2 a 12 años, sin anuncios y sin registro.'),url}).catch(()=>{});return;}
  if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>msg(_('Enlace copiado. Pégalo donde quieras.')),()=>msg(url));else msg(url);
  if(EDICION==='web')showQr();}
function showQr(){const box=$('#qr-box');if(!box)return;
  const draw=()=>{const q=qrcode(0,'M');q.addData(siteUrl());q.make();
    box.innerHTML=q.createSvgTag({cellSize:6,margin:12,scalable:true})+`<p class="note">${_('Escanéalo con la cámara del móvil para abrir el Patio.')}</p>`;box.hidden=false;};
  if(typeof qrcode==='function'){draw();return;}
  const s=document.createElement('script');s.src='vendor/qrcode.js';s.onload=draw;document.head.appendChild(s);}
/* Textos legales: el del idioma elegido si existe; si no, el español. */
const legal=k=>($('#t-'+k+'-'+LANG)||$('#t-'+k+'-es')||{innerHTML:''}).innerHTML;
$('#ajustes').addEventListener('change',e=>{const i=e.target.closest('input[data-k]');if(!i)return;
  S[i.dataset.k]=i.checked;saveSettings();if(i.dataset.k==='voz'&&!i.checked)stopVoice();});
$('#ajustes').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const grp=b.closest('[data-group]');
  if(grp){const k=grp.dataset.group;
    if(k==='idioma'){changeLang(b.dataset.v);return;}
    S[k]=k==='aprender'||k==='movimiento'?b.dataset.v:+b.dataset.v;saveSettings();if(k==='movimiento')medirPotencia();grp.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(k==='velocidad')say(_('Así hablaré a partir de ahora.'));if(k==='aprender')renderAges();return;}
  if(b.id==='voice-test'){pickVoice();say(_('Hola, soy la voz del Patio de Juegos.'));
    later(()=>{pickVoice();const m=$('#voice-msg');if(m)m.textContent=hasVoice()?voiceMsg():_('Si no has oído nada, sube el volumen o instala una voz en los ajustes del dispositivo.');},1500);}
  if(b.id==='share')shareSite();
  if(b.id==='qr')showQr();
  if(b.id==='install'&&deferredInstall){deferredInstall.prompt();deferredInstall=null;b.remove();$('#inst').hidden=true;}
  if(b.id==='reset'){if(b.dataset.sure){P.estrellas=0;P.pegatinas=[];P.jugado={};P.nivel={};saveP();renderParents();}
    else{b.dataset.sure='1';b.textContent=_('¿Seguro? Toca otra vez para borrar');}}
});

/* ---------- botones generales e inicio ---------- */
$('#home').addEventListener('click',goHome);
$('#sound').addEventListener('click',()=>{S.voz=!S.voz;saveSettings();if(!S.voz)stopVoice();else say(_('Sonido activado'));});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopVoice();});
/* Recarga y, si estaba en la lista de juegos de una edad, vuelve a ella. */
function reloadAt(n){try{if(n==='list')sessionStorage.setItem('patio.volver',age);}catch(e){}location.reload();}
/* ---------- versión nueva ----------
   Al publicar cambios, el service worker nuevo avisa de su versión. Si no es la que se está viendo, la página se recarga sola:
   enseguida si está en la pantalla de inicio y, si no, al volver a ella, para no cortar a nadie a mitad de un juego. */
if(EDICION==='web'&&'serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
  const mine=((document.querySelector('script[src^="app."]')||{}).getAttribute?.('src')||'').split('.')[1];
  navigator.serviceWorker.addEventListener('message',e=>{if(!mine||!e.data?.v||e.data.v===mine)return;newVersion=true;if(screen==='age'||screen==='list')reloadAt(screen);});
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
applySettings();
setLang(initialLang());
renderLangs();renderAges();
let volver=null;try{volver=sessionStorage.getItem('patio.volver');sessionStorage.removeItem('patio.volver');}catch(e){}
if(volver&&AGE_TITLES[volver]&&(volver!=='i'||learnLang())){age=volver;renderDoors();show('list');}else show('age');
medirPotencia();
if(isIOS())setTimeout(offerInstall,4000);
