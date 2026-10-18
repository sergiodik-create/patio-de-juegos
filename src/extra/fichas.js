/* Patio de Juegos · fichas para imprimir. Se generan en el navegador, en el idioma elegido, y cada vez salen distintas. */
setLang(initialLang());translatePage();
const TYPES=[['colorear',N_('🖍️ Colorear')],['laberinto',N_('🐭 Laberintos')],['letras',N_('✍️ Trazar letras')],['numeros',N_('🔢 Trazar números')],['contar',N_('🍎 Contar')],['sumas',N_('➕ Sumas')]];
const LEVELS={laberinto:[N_('Fácil'),N_('Normal'),N_('Difícil')],letras:[N_('Mayúsculas'),N_('minúsculas')],contar:[N_('Hasta 5'),N_('Hasta 10')],sumas:[N_('Hasta 10'),N_('Hasta 20'),N_('Hasta 100')]};
let tipo='colorear',nivel=0,dibujo=0;
const head=()=>`<div class="shead"><b>${_('Patio de Juegos')}</b><span>${_('Nombre')}: ____________________</span></div>`;
const dotted=(ch,solid)=>`<svg viewBox="0 0 70 100"><text x="35" y="78" text-anchor="middle" font-size="86" font-weight="800" font-family="Baloo 2, Trebuchet MS, sans-serif"
  ${solid?'fill="#000"':'fill="none" stroke="#777" stroke-width="2" stroke-dasharray="4 5"'}>${esc(ch)}</text></svg>`;
function sheet(){
  if(tipo==='colorear'){const d=DRAWINGS[dibujo%DRAWINGS.length];
    return head()+`<p class="stitle">${_('Colorea {x}',{x:D.DRAWING_NAMES[dibujo%DRAWINGS.length]})}</p><svg viewBox="0 0 200 200">${d.svg}</svg>`;}
  if(tipo==='laberinto'){const n=[8,11,14][nivel],W=makeMaze(n),c=180/n,o=10;let l='';
    W.forEach((w,i)=>{const x=o+(i%n)*c,y=o+Math.floor(i/n)*c;
      if(w.n&&i>=n)l+=`M${x} ${y}h${c}`;if(w.w&&i%n)l+=`M${x} ${y}v${c}`;});
    return head()+`<p class="stitle">${_('Lleva al ratón hasta el queso')}</p><svg viewBox="0 0 200 200"><rect x="${o}" y="${o}" width="180" height="180" fill="none" stroke="#000" stroke-width="2"/>
      <path d="${l}" stroke="#000" stroke-width="1.6" stroke-linecap="square" fill="none"/><text x="${o+c/2}" y="${o+c*.72}" font-size="${c*.7}" text-anchor="middle">🐭</text>
      <text x="${o+180-c/2}" y="${o+180-c*.28}" font-size="${c*.7}" text-anchor="middle">🧀</text></svg>`;}
  if(tipo==='letras'||tipo==='numeros'){const set=tipo==='numeros'?[...'0123456789']:[...(nivel?D.TRACE.lower:D.TRACE.upper)];
    const pickd=sample(set,Math.min(8,set.length));
    return head()+`<p class="stitle">${tipo==='numeros'?_('Repasa los números'):_('Repasa las letras')}</p>`+pickd.map(ch=>`<div class="trow">${dotted(ch,true)}${Array(7).fill(dotted(ch)).join('')}</div>`).join('');}
  if(tipo==='contar'){const max=nivel?10:5;
    return head()+`<p class="stitle">${_('Cuenta y escribe el número')}</p>`+Array.from({length:8},()=>`<div class="crow"><span>${pick(FRUITS).repeat(range(1,max))}</span><span class="ans"></span></div>`).join('');}
  const lim=[10,20,100][nivel];
  return head()+`<p class="stitle">${_('Resuelve las sumas')}</p><div class="sums">`+Array.from({length:20},()=>{const a=range(1,lim-1),b=range(1,lim-a);return `<p>${a} + ${b} =<span></span></p>`;}).join('')+'</div>';
}
function render(){
  $('#types').innerHTML=TYPES.map(([k,t])=>`<button class="pill" data-k="${k}" aria-pressed="${k===tipo}">${_(t)}</button>`).join('');
  const lv=LEVELS[tipo];$('#levels').innerHTML=lv?lv.map((t,i)=>`<button class="pill" data-l="${i}" aria-pressed="${i===nivel}">${_(t)}</button>`).join(''):'';
  $('#sheets').innerHTML=`<div class="sheet">${sheet()}</div>`;
}
$('#types').onclick=e=>{const b=e.target.closest('[data-k]');if(b){tipo=b.dataset.k;nivel=0;render();}};
$('#levels').onclick=e=>{const b=e.target.closest('[data-l]');if(b){nivel=+b.dataset.l;render();}};
$('#again').onclick=()=>{dibujo++;render();};
$('#print').onclick=()=>window.print();
render();
