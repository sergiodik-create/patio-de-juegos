/* Patio de Juegos · cartel con código QR para imprimir. */
setLang(initialLang());translatePage();
const here=location.href.replace(/cartel\.html.*$/,'');
$('#url').value=(typeof CONFIG!=='undefined'&&CONFIG.dominio)?'https://'+CONFIG.dominio.replace(/^https?:\/\//,'')+'/':here;
const qrSvg=(url,cell)=>{const q=qrcode(0,'M');q.addData(url);q.make();return q.createSvgTag({cellSize:cell,margin:cell*2,scalable:true});};
function draw(){const url=$('#url').value.trim()||here,short=url.replace(/^https?:\/\//,'').replace(/\/$/,'');
  $('#poster').innerHTML=`<div><h2>${_('Patio de Juegos')}</h2><p class="tag">${_('Juegos educativos gratis para niños de 2 a 12 años')}</p></div>
    <ul><li>${_('✅ Sin anuncios y sin compras')}</li><li>${_('✅ Sin registro y sin datos personales')}</li><li>${_('✅ Funciona en el móvil, la tablet y el ordenador')}</li>
    <li>${_('✅ Se puede usar sin internet una vez instalado')}</li><li>${_('✅ Cuentos, lógica, letras, números, idiomas y mucho más')}</li></ul>
    <div class="qr">${qrSvg(url,6)}</div><p class="url">${esc(short)}</p>
    <div class="tabs">${Array.from({length:6},()=>`<div>${qrSvg(url,3)}<span>${esc(short)}</span></div>`).join('')}</div>`;}
$('#url').oninput=draw;$('#print').onclick=()=>window.print();
draw();
