/* Patio de Juegos · idiomas.
   El español es el idioma de origen: los textos se escriben en español dentro del código con _('texto').
   Cada idioma nuevo vive en src/idiomas/<código>.js y trae:
     t:    traducciones de cada texto en español ('Te toca': 'Your turn'); {n} son huecos que se rellenan solos;
     data: sus propias listas de palabras, preguntas y cuentos (las mismas claves que DATA.es en 10-datos.js);
     voz:  el idioma de la voz (por ejemplo 'en-GB').
   Un juego que necesita listas que un idioma no trae (needs:[...]) no se muestra en ese idioma.
   python3 tools/revisar_idioma.py en dice qué textos faltan por traducir. */
const LANGS={es:{name:'Español',voz:'es-ES',t:{},data:{}}};
const DATA={};
/* N_ marca un texto para traducirlo más tarde (en la lista de textos), sin traducirlo aquí. */
const N_=s=>s;
let LANG='es',D={};
function _(s,v){
  let r=LANG!=='es'&&LANGS[LANG]&&LANGS[LANG].t[s]!=null?LANGS[LANG].t[s]:s;
  if(typeof r==='function')return r(v||{});
  return v?r.replace(/\{(\w+)\}/g,(m,k)=>v[k]!=null?v[k]:m):r;
}
/* Elige el idioma: el guardado, o el del navegador si lo tenemos, o español. */
function initialLang(){
  const saved=store.get('idioma',null);if(saved&&LANGS[saved])return saved;
  const nav=(navigator.languages||[navigator.language||'es']).map(x=>String(x).slice(0,2).toLowerCase());
  return nav.find(c=>LANGS[c])||'es';
}
function setLang(code){
  LANG=LANGS[code]?code:'es';store.set('idioma',LANG);
  D=Object.assign({},DATA.es,LANG==='es'?{}:LANGS[LANG].data);
  document.documentElement.lang=LANG;
  if(!/\.html$/.test(location.pathname)||/index\.html$/.test(location.pathname))document.title=_('Patio de Juegos');
  pickVoice();translatePage();
}
const langVoice=()=>LANGS[LANG].voz||'es-ES';
/* Un juego se ve en un idioma si ese idioma trae todas las listas que el juego necesita.
   En los juegos para aprender idiomas (edad 'i') las listas son las del idioma que se aprende. */
function gameInLang(g){
  const code=g.age==='i'?learnLang():LANG;if(!code)return false;
  return code==='es'||!(g.needs||[]).some(k=>!(k in langData(code)));
}
/* Textos fijos de la página: data-t traduce el contenido y data-ta la etiqueta para lectores de pantalla. */
function translatePage(){
  document.querySelectorAll('[data-t]').forEach(el=>{if(!el.dataset.src)el.dataset.src=el.innerHTML.trim();el.innerHTML=_(el.dataset.src);});
  document.querySelectorAll('[data-ta]').forEach(el=>{el.setAttribute('aria-label',_(el.dataset.ta));});
}
/* Nombre de cada idioma, dicho en el idioma de la pantalla. */
const LANG_NAMES={es:N_('español'),en:N_('inglés'),fr:N_('francés'),pt:N_('portugués'),it:N_('italiano'),de:N_('alemán'),ca:N_('catalán'),gl:N_('gallego'),eu:N_('euskera'),ar:N_('árabe'),zh:N_('chino'),uk:N_('ucraniano'),ro:N_('rumano'),qu:N_('quechua'),gn:N_('guaraní')};
const langName=c=>_(LANG_NAMES[c]||c);
const langData=c=>c==='es'?DATA.es:(LANGS[c]?.data||{});
/* Idiomas que se pueden aprender desde el de la pantalla: los que traen vocabulario. */
const learnable=()=>Object.keys(LANGS).filter(c=>c!==LANG&&langData(c).VOCAB);
function learnLang(){const opts=learnable();return opts.includes(S.aprender)?S.aprender:(opts.includes('en')?'en':opts[0]||null);}
