/* Patio de Juegos · funciona sin internet: guarda todos los archivos la primera vez y luego los sirve desde el dispositivo.
   Las páginas se piden primero a la red (si responde en 3 segundos), para que al abrir se vea siempre la última versión;
   sin conexión, o si la red tarda, se usa la copia guardada. El resto de archivos lleva la versión en el nombre y sale de la copia. */
const CACHE='patio-__VERSION__';
const FILES=__FILES__;
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
/* Al activarse, avisa a las pestañas abiertas de qué versión trae: si enseñan otra, se recargan solas (ver 90-app.js). */
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  .then(()=>self.clients.claim()).then(()=>self.clients.matchAll({type:'window'})).then(cs=>cs.forEach(c=>c.postMessage({v:'__VERSION__'}))));});
const fresh=req=>fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;});
const saved=req=>caches.match(req,{ignoreSearch:true}).then(hit=>hit||caches.match('./'));
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
  if(req.mode==='navigate'){
    e.respondWith(new Promise(ok=>{let done=false;const give=r=>{if(!done&&r){done=true;ok(r);}};
      const t=setTimeout(()=>saved(req).then(give),3000);
      fresh(req).then(res=>{clearTimeout(t);give(res);}).catch(()=>{clearTimeout(t);saved(req).then(hit=>give(hit||Response.error()));});}));
    return;}
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fresh(req)));
});
