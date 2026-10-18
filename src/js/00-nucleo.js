/* Patio de Juegos · núcleo: utilidades, ajustes, voz, sonido, progreso y pegatinas.
   Todo lo que se guarda se queda en este dispositivo (localStorage). No se envía nada a ningún sitio. */
const $=s=>document.querySelector(s);
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const sample=(a,n)=>shuffle(a).slice(0,n);
const range=(a,b)=>a+rnd(b-a+1);
/* Mayúsculas sin tildes (la Ñ se queda): para comparar letras. */
const plain=t=>String(t).toUpperCase().replace(/Ñ/g,'\u0001').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\u0001/g,'Ñ');
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

/* ---------- ajustes (zona de padres) ---------- */
const DEFAULTS={voz:true,velocidad:1,subtitulos:false,calma:false,grande:false,contraste:false,legible:false,nombresColor:false,niveles:true,descanso:20,aprender:null};
const S=Object.assign({},DEFAULTS,store.get('ajustes',{}));
function applySettings(){
  const r=document.documentElement;
  ['calma','grande','contraste','legible','nombresColor'].forEach(k=>{r.dataset[k]=S[k]?'si':'no';});
  const b=$('#sound');if(b){b.textContent=S.voz?'🔊':'🔇';b.setAttribute('aria-label',S.voz?_('Sonido activado'):_('Sonido apagado'));}
}
function saveSettings(){store.set('ajustes',S);applySettings();}
const reduceMotion=()=>S.calma||matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- voz ---------- */
let voice=null,voiceChecked=false;
const voicesFor=lang=>{const vs=window.speechSynthesis?.getVoices?.()||[],L=lang.toLowerCase().replace('_','-'),pre=L.slice(0,2);
  return vs.filter(v=>v.lang.toLowerCase().replace('_','-')===L).concat(vs.filter(v=>v.lang.toLowerCase().slice(0,2)===pre&&v.lang.toLowerCase().replace('_','-')!==L));};
function pickVoice(){const vs=window.speechSynthesis?.getVoices?.()||[];if(vs.length)voiceChecked=true;voice=voicesFor(langVoice())[0]||null;}
if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=()=>pickVoice();
const hasVoice=()=>!!voice;
let subTimer=null;
function subtitle(t){const el=$('#sub');if(!el)return;
  if(!S.subtitulos){el.hidden=true;return;}
  el.textContent=t;el.hidden=false;clearTimeout(subTimer);subTimer=setTimeout(()=>{el.hidden=true;},Math.max(3000,t.length*80));}
/* lang: solo para decir algo en otro idioma (por ejemplo, la palabra en inglés del juego de idiomas). */
function utter(t,lang){const u=new SpeechSynthesisUtterance(t);u.lang=lang||langVoice();
  const v=lang?voicesFor(lang)[0]:voice;if(v)u.voice=v;u.rate=.9*S.velocidad;u.pitch=1.12;return u;}
function say(t,lang){
  subtitle(t);
  if(!S.voz||!('speechSynthesis' in window))return;
  try{speechSynthesis.cancel();speechSynthesis.speak(utter(t,lang));}catch(e){}
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
  say(_('¡Has ganado una pegatina nueva para tu álbum!'));setTimeout(()=>{el.hidden=true;},3500);}

/* ---------- confeti ---------- */
let cv,cx,parts=[],raf=null;
function confetti(){
  if(reduceMotion())return;cv=cv||$('#fx');cx=cx||cv.getContext('2d');
  const w=cv.width=innerWidth,h=cv.height=innerHeight;
  const cols=['#E8483B','#2F7FE0','#F6C431','#3DB46D','#8B5BD6','#F28A2E'];
  for(let i=0;i<70;i++)parts.push({x:w/2,y:h*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*13-4,r:5+Math.random()*6,c:cols[i%6],a:Math.random()*6,life:90});
  if(!raf)tick();
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts.forEach(p=>{p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.a+=.2;p.life--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillStyle=p.c;cx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);cx.restore();});
  parts=parts.filter(p=>p.life>0&&p.y<cv.height+20);
  raf=parts.length?requestAnimationFrame(tick):(cx.clearRect(0,0,cv.width,cv.height),null);
}
/* Animación corta (rebote o temblor) que respeta el modo calma. */
function anim(el,cls){if(!el||reduceMotion())return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);}
