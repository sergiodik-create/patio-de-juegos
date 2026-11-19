/* Patio de Juegos · núcleo: utilidades, ajustes, voz, sonido, progreso y pegatinas.
   Todo lo que se guarda se queda en este dispositivo (localStorage). No se envía nada a ningún sitio. */
const $=s=>document.querySelector(s);
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const sample=(a,n)=>shuffle(a).slice(0,n);
const range=(a,b)=>a+rnd(b-a+1);
/* Mayúsculas sin tildes, para comparar letras (Á cuenta como A). Las letras propias de un idioma no se tocan:
   la Ñ en español, y cada idioma puede dar las suyas en data.KEEP (por ejemplo 'ЙЇ' en ucraniano). */
const plain=t=>{const keep=[...(typeof LANG!=='undefined'&&LANGS[LANG]?.data?.KEEP)||'Ñ'];let s=String(t).toUpperCase();
  keep.forEach((c,i)=>{s=s.split(c).join(String.fromCharCode(1+i));});
  s=s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  keep.forEach((c,i)=>{s=s.split(String.fromCharCode(1+i)).join(c);});return s;};
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Lista de juegos. Cada archivo de juegos añade los suyos con GAMES.push({...}).
   Campos: id, age ('p' 2-4, 'm' 5-7, 'g' 8-10, 'x' 11-12, 't' cuentos; puede tener varias letras),
   pic, name, what, bg, y o bien gen(nivel) (juego de preguntas) o custom:'nombre' (pantalla propia en CUSTOM). */
const GAMES=[];
const CUSTOM={};

/* ---------- almacenamiento local ---------- */
const store={
  get(k,d){try{const v=localStorage.getItem('patio.'+k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem('patio.'+k,JSON.stringify(v));}catch(e){}},
  del(k){try{localStorage.removeItem('patio.'+k);}catch(e){}}
};

/* Nombre de un color de la paleta ('var(--red)' → 'red'): en modo daltónico cada color lleva su dibujo. */
const colKey=c=>(/--(\w+)/.exec(c)||[])[1]||'';

/* ---------- ajustes (zona de padres) ---------- */
const DEFAULTS={voz:true,velocidad:1,subtitulos:false,calma:false,grande:false,contraste:false,legible:false,nombresColor:false,daltonico:false,movimiento:'auto',niveles:true,descanso:20,aprender:null,tono:1.12,voces:{}};
const S=Object.assign({},DEFAULTS,store.get('ajustes',{}));
function applySettings(){
  const r=document.documentElement;
  ['calma','grande','contraste','legible','nombresColor','daltonico'].forEach(k=>{r.dataset[k]=S[k]?'si':'no';});
  r.dataset.vivo=!reduceMotion()&&(S.movimiento==='mucho'||(S.movimiento==='auto'&&potente!==false))?'si':'no';
  const b=$('#sound');if(b){b.textContent=S.voz?'🔊':'🔇';b.setAttribute('aria-label',S.voz?_('Sonido activado'):_('Sonido apagado'));}
}
function saveSettings(){store.set('ajustes',S);applySettings();}
const reduceMotion=()=>S.calma||matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Modo «vivo» (más animaciones) en los aparatos que van sobrados. «potente» se mide al abrir (ver medirPotencia):
   null = sin medir todavía, y mientras se mide se prueba con el modo vivo encendido. */
let potente=store.get('potente',null);
function medirPotencia(){
  if(S.movimiento!=='auto'||reduceMotion()||potente===false)return;
  if((navigator.hardwareConcurrency||4)<4||(navigator.deviceMemory||4)<3){potente=false;store.set('potente',false);applySettings();return;}
  let n=0,slow=0,t0=0,last=0;
  const f=t=>{if(document.hidden){t0=0;requestAnimationFrame(f);return;}
    if(!t0){t0=last=t;n=slow=0;}else{n++;if(t-last>26)slow++;last=t;}
    if(t-t0<2500)return requestAnimationFrame(f);
    potente=n/((t-t0)/1000)>=50&&slow<=n*.06;store.set('potente',potente);applySettings();};
  setTimeout(()=>requestAnimationFrame(f),800);
}

/* ---------- voz ---------- */
/* Cada aparato trae voces distintas, y la primera de la lista suele ser la más robótica.
   Puntuamos todas y usamos la que suene más natural y cálida para un niño:
   1) voces infantiles o muy amables conocidas (Maisie, Ana, Eloise…), 2) voces «naturales» o neuronales
   (Edge y Windows 11, Siri, voces mejoradas de Apple, voces de alta calidad de Android), 3) voces de Google,
   y al final las robóticas (eSpeak) y las voces de broma de Apple (Zarvox, Bubbles…).
   Las familias pueden elegir otra en la zona de padres (S.voces[idioma] = voiceURI). */
let voice=null,voiceChecked=false;
const VOICE_KID=/\b(maisie|ana|eloise|lia|abril|leila|thalita)\b/i;
const VOICE_WARM=/\b(elvira|ximena|irene|estrella|m[oó]nica|paulina|marisol|paloma|dalia|sonia|libby|mia|serena|kate|martha|stephanie|denise|vivienne|am[eé]lie|audrey|marie|aur[eé]lie|francisca|luciana|fernanda|yara|alina|ioana|polina|lesya|zariyah|salma|hala|laila|mariam|amina|sana|fatima)\b/i;
const VOICE_GOOD=/natural|neural|premium|enhanced|mejorad|am[eé]lior|aprimorad|wavenet|studio|siri/i;
const VOICE_BAD=/espeak|compact|\b(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|ralph|junior|grandma|grandpa|rocko|eddy|flo|reed|sandy|shelley)\b/i;
const brokenVoices=new Set();
const voiceScore=(v,L)=>{const n=v.name||'',vl=v.lang.toLowerCase().replace('_','-');let s=vl===L?40:0;
  if(VOICE_KID.test(n))s+=30;if(VOICE_GOOD.test(n))s+=25;if(/google/i.test(n))s+=15;if(VOICE_WARM.test(n))s+=10;
  if(VOICE_BAD.test(n))s-=60;if(v.default)s+=2;
  if(!v.localService&&(navigator.onLine===false||brokenVoices.has(v.voiceURI)))s-=100;return s;};
/* Voces del idioma, de la que mejor suena a la peor. */
const voicesFor=lang=>{const vs=window.speechSynthesis?.getVoices?.()||[],L=lang.toLowerCase().replace('_','-'),pre=L.slice(0,2);
  return vs.filter(v=>v.lang.toLowerCase().slice(0,2)===pre).map(v=>[voiceScore(v,L),v]).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);};
/* La voz que se usa: la elegida por la familia si sigue en el aparato; si no, la mejor. */
const bestVoice=lang=>{const vs=voicesFor(lang),want=(S.voces||{})[lang.slice(0,2)];
  return (want&&!brokenVoices.has(want)&&vs.find(v=>v.voiceURI===want))||vs[0]||null;};
const isNiceVoice=v=>!!v&&(VOICE_KID.test(v.name)||VOICE_GOOD.test(v.name)||/google/i.test(v.name));
/* Nombre corto para la lista: «Microsoft Elvira Online (Natural) - Spanish (Spain)» → «Elvira». */
const voiceLabel=v=>(v.name||'').replace(/^(Microsoft|Apple)\s+/i,'').replace(/\s*\(.*$|\s+-\s+.*$/,'').replace(/\s+(Online|Multilingual|Desktop)\b.*$/i,'').trim()||v.name;
function pickVoice(){const vs=window.speechSynthesis?.getVoices?.()||[];if(vs.length)voiceChecked=true;voice=bestVoice(langVoice());}
if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=()=>{pickVoice();const vl=document.getElementById('voice-list');if(vl&&typeof voiceList==='function')vl.innerHTML=voiceList();};
addEventListener('online',()=>pickVoice());addEventListener('offline',()=>pickVoice());
const hasVoice=()=>!!voice;
let subTimer=null;
function subtitle(t){const el=$('#sub');if(!el)return;
  if(!S.subtitulos){el.hidden=true;return;}
  el.textContent=t;el.hidden=false;clearTimeout(subTimer);subTimer=setTimeout(()=>{el.hidden=true;},Math.max(3000,t.length*80));}
/* lang: solo para decir algo en otro idioma (por ejemplo, la palabra en inglés del juego de idiomas). */
/* Si una voz de internet (las «naturales» de Edge, por ejemplo) falla porque no hay conexión,
   se apunta como rota y a partir de la siguiente frase se usa la mejor voz del propio aparato. */
function utter(t,lang){const u=new SpeechSynthesisUtterance(t);u.lang=lang||langVoice();
  const v=lang?bestVoice(lang):voice;if(v){u.voice=v;u.lang=v.lang;}u.rate=.9*S.velocidad;u.pitch=S.tono;
  if(v&&!v.localService)u.addEventListener('error',e=>{if(e.error!=='interrupted'&&e.error!=='canceled'){brokenVoices.add(v.voiceURI);pickVoice();}});
  return u;}
/* queue: no corta lo que se está diciendo, se dice después (por ejemplo, el aviso de pegatina tras el «¡Muy bien!»). */
function say(t,lang,queue){
  subtitle(t);
  if(!S.voz||!('speechSynthesis' in window))return;
  try{if(!queue)speechSynthesis.cancel();speechSynthesis.speak(utter(t,lang));}catch(e){}
}
const talking=()=>{try{return S.voz&&'speechSynthesis' in window&&(speechSynthesis.speaking||speechSynthesis.pending);}catch(e){return false;}};
/* Llama a cb cuando la voz ha terminado de hablar (también lo que estaba en cola), para no cortarla al pasar de pantalla.
   Espera como mínimo min ms y como máximo max ms, por si el aparato no avisa nunca de que ha terminado. */
function afterVoice(cb,min=1500,max=15000){
  const t0=Date.now();let quiet=0;
  const check=()=>{quiet=talking()?0:quiet+200;const dt=Date.now()-t0;
    if(dt>=max||(dt>=min&&quiet>=400))cb();else later(check,200);};
  later(check,200);
}
/* Lee un texto y llama a cb al terminar. onWord(índice de carácter) permite resaltar palabras. */
function sayThen(t,cb,onWord){
  subtitle(t);
  if(!S.voz||!('speechSynthesis' in window)){later(cb,Math.max(2500,t.length*65));return;}
  try{speechSynthesis.cancel();const u=utter(t);u.rate=.86*S.velocidad;
    let done=false;u.onend=()=>{if(!done){done=true;cb();}};u.onerror=()=>{done=true;};
    if(onWord)u.onboundary=e=>{if(e.name==='word'||e.name===undefined)onWord(e.charIndex);};
    speechSynthesis.speak(u);}catch(e){later(cb,3000);}
}
function stopVoice(){if('speechSynthesis' in window)try{speechSynthesis.cancel();}catch(e){}}

/* ---------- sonidos ---------- */
let actx=null;
function tone(freqs,dur=.12){
  if(!S.voz)return;
  const vol=S.calma?.08:.22;
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    (S.calma?freqs.slice(0,2):freqs).forEach((f,i)=>{const o=actx.createOscillator(),g=actx.createGain();o.type=S.calma?'sine':'triangle';o.frequency.value=f;
      const t=actx.currentTime+i*dur;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur*1.6);
      o.connect(g).connect(actx.destination);o.start(t);o.stop(t+dur*1.8);});}catch(e){}
}
const yay=()=>tone([523,659,784,1047]);
const nope=()=>tone([330,262],.15);

/* ---------- temporizadores del juego actual ---------- */
let timers=[];
const later=(f,ms)=>{const t=setTimeout(f,ms);timers.push(t);return t;};
function clearTimers(){timers.forEach(t=>{clearTimeout(t);clearInterval(t);});timers=[];}

/* ---------- progreso y pegatinas (solo en este dispositivo) ---------- */
/* Pegatinas del álbum (sus nombres, para decirlos en voz alta, están en D.STICKERS de cada idioma). */
const STICKERS=['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🦆','🦉','🦄','🐝','🦋','🐞',
  '🐢','🐙','🐠','🐬','🐳','🦀','🦒','🐘','🍎','🍌','🍓','🍉','🍒','🍦','🍪','🧁','🚀','🛸','🪐','🌙','⭐','☀️','🌈','⛄',
  '🚂','🚒','🚜','⛵','🎈','🎨','🎸','⚽','🏆','👑','💎','🧸'];
const P=Object.assign({estrellas:0,pegatinas:[],jugado:{},nivel:{}},store.get('progreso',{}));
function saveP(){store.set('progreso',P);}
function countPlay(id){P.jugado[id]=(P.jugado[id]||0)+1;saveP();}
/* Suma una estrella; cada 5 estrellas regala una pegatina nueva para el álbum. */
function addStar(){
  P.estrellas++;let nueva=null;
  if(P.estrellas%5===0){const faltan=STICKERS.filter(s=>!P.pegatinas.includes(s));if(faltan.length){nueva=pick(faltan);P.pegatinas.push(nueva);}}
  saveP();if(nueva)later(()=>stickerToast(nueva),900);
}
function stickerToast(s){const el=$('#toast');if(!el)return;
  el.innerHTML=`<span class="tbig">${s}</span><span>${_('¡Pegatina nueva para tu álbum!')}</span>`;el.hidden=false;
  say(_('¡Has ganado una pegatina nueva para tu álbum!'),null,true);setTimeout(()=>{el.hidden=true;},3500);}

/* ---------- confeti ---------- */
let cv,cx,parts=[],raf=null;
function confetti(){
  if(reduceMotion())return;cv=cv||$('#fx');cx=cx||cv.getContext('2d');
  const w=cv.width=innerWidth,h=cv.height=innerHeight;
  const cols=['#E8483B','#2F7FE0','#F6C431','#3DB46D','#8B5BD6','#F28A2E'];
  const vivo=document.documentElement.dataset.vivo==='si';  // en modo vivo, el doble de confeti y también estrellitas
  for(let i=0;i<(vivo?140:70);i++)parts.push({x:w/2,y:h*.45,vx:(Math.random()-.5)*(vivo?18:14),vy:-Math.random()*(vivo?15:13)-4,r:5+Math.random()*6,c:cols[i%6],a:Math.random()*6,life:vivo?110:90,s:vivo&&i%4===0});
  if(!raf)tick();
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts.forEach(p=>{p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.a+=.2;p.life--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillStyle=p.c;if(p.s){cx.font=`${p.r*2.4}px sans-serif`;cx.fillText('⭐',-p.r,p.r);}else cx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);cx.restore();});
  parts=parts.filter(p=>p.life>0&&p.y<cv.height+20);
  raf=parts.length?requestAnimationFrame(tick):(cx.clearRect(0,0,cv.width,cv.height),null);
}
/* Animación corta (rebote o temblor) que respeta el modo calma. */
function anim(el,cls){if(!el||reduceMotion())return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);}
