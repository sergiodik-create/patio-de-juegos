/* Juegos de preguntas. Cada uno define gen(nivel) y devuelve una pregunta:
   {prompt, speak, answer, opts:[{html|dot, v, aria, cls}], visual?, right, wrong(v), speakEn?, en?}.
   levels = cuántos niveles tiene (el nivel sube o baja solo según los aciertos).
   needs = listas de D que el juego necesita; si un idioma no las trae, el juego no aparece en ese idioma. */
const numBtn=v=>({html:String(v),v:String(v),cls:'num'});
const nOpts=l=>[3,4,5][l]||3;
const cap=t=>t?t[0].toUpperCase()+t.slice(1):t;
const chip=(txt,bg)=>`<b style="background:${bg}">${esc(txt)}</b>`;

GAMES.push(
 /* ---------- 2 a 4 años ---------- */
 {id:'colores',age:'p',pic:'🎨',name:'Colores',what:'Toca el color',bg:'var(--red)',levels:3,gen(l=0){
   const o=sample(D.COLORS,nOpts(l)),t=pick(o);
   return {prompt:_('Toca el {c}',{c:chip(t.n,t.c)}),speak:_('Toca el color {c}',{c:t.n}),answer:t.n,
     opts:o.map(c=>({dot:c.c,v:c.n,aria:c.n})),right:_('Es el {c}.',{c:t.n}),wrong:v=>_('Ese es el {c}. Prueba otra vez.',{c:v})};}},
 {id:'animales',age:'p',pic:'🐮',name:'Animales',what:'¿Quién hace ese ruido?',bg:'var(--green)',levels:3,gen(l=0){
   const o=sample(D.ANIMALS,nOpts(l)),t=pick(o);
   return {prompt:_('¿Quién dice «{s}»?',{s:t.s}),speak:_('¿Quién dice {s}?',{s:t.s}),answer:t.n,
     opts:o.map(a=>({html:a.e,v:a.n,aria:a.n})),right:_('{a} dice {s}.',{a:cap(t.n),s:t.s}),
     wrong:v=>{const a=D.ANIMALS.find(x=>x.n===v);return _('Ese animal es {a}, que dice {s}. Prueba otra vez.',{a:a.n,s:a.s});}};}},
 {id:'contar',age:'p',pic:'🍎',name:'Contar',what:'¿Cuántas hay?',bg:'var(--blue)',levels:3,gen(l=0){
   const max=[5,7,10][l],n=range(1,max),f=pick(FRUITS);
   return {prompt:_('¿Cuántas hay?'),speak:_('¿Cuántas hay? Toca las frutas para contar.'),answer:String(n),
     visual:Array.from({length:n},()=>`<span class="cnt">${f}</span>`).join(''),countable:true,
     opts:numOpts(n,3,1,max),right:cap(D.NUMWORDS[n])+'.',wrong:()=>_('Casi. Cuenta otra vez conmigo.')};}},
 {id:'formas',age:'p',pic:'🔺',name:'Formas',what:'Círculo, estrella, corazón…',bg:'var(--purple)',levels:3,gen(l=0){
   const o=sample(D.SHAPES,nOpts(l)),t=pick(o),fills=sample(SHAPE_FILLS,o.length);
   return {prompt:_('Toca {x}',{x:t.n}),speak:_('Toca {x}',{x:t.n}),answer:t.n,
     opts:o.map((s,i)=>({html:`<svg viewBox="0 0 100 100" fill="${fills[i]}" aria-hidden="true">${s.svg}</svg>`,v:s.n,aria:s.n})),
     right:_('Es {x}.',{x:t.n}),wrong:v=>_('Esa forma es {x}. Prueba otra vez.',{x:v})};}},
 {id:'tamanos',age:'p',pic:'🐘',name:'Grande y pequeño',what:'¿Cuál es más grande?',bg:'var(--orange)',gen(){
   const a=pick(D.ANIMALS),big=Math.random()<.5,order=shuffle(['g','p']);
   return {prompt:big?_('Toca el {x}',{x:chip(_('grande'),'var(--blue)')}):_('Toca el {x}',{x:chip(_('pequeño'),'var(--pink)')}),
     speak:big?_('Toca el grande'):_('Toca el pequeño'),answer:big?'g':'p',
     opts:order.map(s=>({html:`<span style="font-size:${s==='g'?'1em':'.45em'}">${a.e}</span>`,v:s,aria:s==='g'?_('grande'):_('pequeño')})),
     right:big?_('¡Ese es el grande!'):_('¡Ese es el pequeño!'),wrong:()=>big?_('Ese es pequeño. Busca el grande.'):_('Ese es grande. Busca el pequeño.')};}},
 {id:'cielo',age:'p',pic:'🚀',name:'El cielo',what:'Sol, luna y cohetes',bg:'var(--blue)',levels:3,gen(l=0){
   const o=sample(D.SKY,nOpts(l)),t=pick(o);
   return {prompt:_('Toca {x}',{x:t[1]}),speak:_('Toca {x}',{x:t[1]}),answer:t[1],opts:o.map(x=>({html:x[0],v:x[1],aria:x[1]})),
     right:_('¡Es {x}!',{x:t[1]}),wrong:v=>_('Eso es {x}. Prueba otra vez.',{x:v})};}},

 /* ---------- 5 a 7 años ---------- */
 {id:'letras',age:'m',pic:'🔤',name:'Primera letra',what:'¿Con qué letra empieza?',bg:'var(--red)',levels:3,needs:['WORDS','LETTERS'],gen(l=0){
   const [e,w]=pick(D.WORDS),L=plain(w)[0];
   const o=new Set([L]);while(o.size<nOpts(l))o.add(pick(D.LETTERS));
   return {prompt:_('¿Con qué letra empieza?'),speak:_('¿Con qué letra empieza {w}?',{w}),answer:L,
     visual:`<span>${e}</span><span class="word">_${w.slice(1).toUpperCase()}</span>`,
     opts:shuffle([...o]).map(x=>({html:x,v:x,cls:'num'})),right:_('{w} empieza con {l}.',{w:cap(w),l:L}),wrong:()=>_('No. Escucha: {w}. Prueba otra vez.',{w})};}},
 {id:'completa',age:'m',pic:'🧩',name:'Completa la palabra',what:'¿Qué letra falta?',bg:'var(--yellow)',levels:2,needs:['WORDS'],gen(l=0){
   /* Las vocales son las de cada idioma (data.VOWELS, en minúscula); si no trae, las del español. */
   const V=[...(D.VOWELS||'aeiou')];let e,w,idx=-1;
   for(let k=0;k<200&&idx<0;k++){[e,w]=pick(D.WORDS);const c=[...w].map((ch,i)=>V.includes(ch)?i:-1).filter(i=>i>=0);idx=c.length?pick(c):-1;}
   if(idx<0)idx=0;
   const L=[...w][idx].toUpperCase(),o=new Set([L]);while(o.size<Math.min([3,5][l],V.length))o.add(pick(V).toUpperCase());
   const shown=[...w].map((ch,i)=>i===idx?'_':ch.toUpperCase()).join('');
   return {prompt:_('¿Qué letra falta?'),speak:_('¿Qué letra falta en {w}?',{w}),answer:L,visual:`<span>${e}</span><span class="word">${shown}</span>`,
     opts:shuffle([...o]).map(x=>({html:x,v:x,cls:'num'})),right:_('Es la {l}: {w}.',{l:L,w}),wrong:()=>_('Escucha bien: {w}. Prueba otra vez.',{w})};}},
 {id:'sumas',age:'m',pic:'➕',name:'Sumas',what:'Junta y cuenta',bg:'var(--green)',levels:3,gen(l=0){
   const f=pick(FRUITS);let a,b;
   if(l===0){a=range(1,5);b=range(1,5);}else if(l===1){a=range(2,9);b=range(2,9);}else{a=range(10,30);b=range(2,20);}
   const s=a+b,vis=l===0?`<span>${f.repeat(a)}</span><span class="op">+</span><span>${f.repeat(b)}</span>`:`<span class="box">${a}</span><span class="op">+</span><span class="box">${b}</span>`;
   return {prompt:l===0?_('¿Cuántas hay en total?'):_('¿Cuánto es?'),speak:_('{a} más {b}. ¿Cuánto es?',{a,b}),answer:String(s),visual:vis,
     opts:numOpts(s,3,2,60),right:_('{a} más {b} son {s}.',{a,b,s}),wrong:()=>l===0?_('Casi. Cuenta todas despacio.'):_('Casi. Cuenta con los dedos desde el número grande.')};}},
 {id:'restas',age:'m',pic:'➖',name:'Restas',what:'¿Cuántas quedan?',bg:'var(--orange)',levels:3,gen(l=0){
   const f=pick(FRUITS);
   if(l===0){const a=range(3,9),b=range(1,a-1),r=a-b,q=_('Había {a}. Se comen {b}. ¿Cuántas quedan?',{a,b});
     return {prompt:q,speak:q,answer:String(r),
       visual:Array.from({length:a},(_x,i)=>`<span style="${i>=r?'opacity:.25':''}">${f}</span>`).join(''),
       opts:numOpts(r,3,0,9),right:_('{a} menos {b} son {r}.',{a,b,r}),wrong:()=>_('Cuenta las que siguen brillando.')};}
   const a=l===1?range(10,20):range(20,60),b=range(1,l===1?9:19),r=a-b;
   return {prompt:_('¿Cuánto es?'),speak:_('{a} menos {b}',{a,b}),answer:String(r),visual:`<span class="box">${a}</span><span class="op">−</span><span class="box">${b}</span>`,
     opts:numOpts(r,3,0,60),right:_('{a} menos {b} son {r}.',{a,b,r}),wrong:()=>_('Casi. Cuenta hacia atrás despacio.')};}},
 {id:'falta',age:'m',pic:'🔢',name:'¿Qué número falta?',what:'Completa la fila',bg:'var(--blue)',levels:3,gen(l=0){
   const step=[1,2,pick([5,10])][l],st=l===2?step*range(0,8):range(1,15),miss=range(0,4),seq=[0,1,2,3,4].map(i=>st+i*step),ans=seq[miss];
   return {prompt:_('¿Qué número falta?'),speak:_('¿Qué número falta?'),answer:String(ans),
     visual:seq.map((n,i)=>`<span class="box${i===miss?' q':''}">${i===miss?'?':n}</span>`).join(''),
     opts:numOpts(ans,3,0,100,[step,-step,1,-1,2*step]),right:_('Era el {n}.',{n:ans}),wrong:()=>step===1?_('Cuenta desde el principio.'):_('Fíjate: va de {s} en {s}.',{s:step})};}},
 {id:'series',age:'m',pic:'🔁',name:'Series',what:'¿Qué viene después?',bg:'var(--purple)',levels:3,gen(l=0){
   const pool=['🔴','🔵','🟡','🟢','🟣','⭐','🌙','❤️','🍎','🐟'],items=sample(pool,4);
   const pats=[[[0,1]],[[0,1,2],[0,0,1],[0,1,1]],[[0,1,1,2],[0,1,2,3],[0,0,1,2]]][l],p=pick(pats),len=Math.max(6,p.length*2);
   const seq=Array.from({length:len+1},(_x,i)=>items[p[i%p.length]]),ans=seq.pop(),used=[...new Set(p.map(i=>items[i]))];
   const opts=used.length>=3?shuffle(used):shuffle([...used,pool.find(x=>!used.includes(x))]);
   return {prompt:_('¿Qué viene después?'),speak:_('¿Qué viene después?'),answer:ans,
     visual:seq.map(x=>`<span>${x}</span>`).join('')+'<span class="box q">?</span>',
     opts:opts.map(x=>({html:x,v:x})),right:_('¡Has encontrado la serie!'),wrong:()=>_('Mira cómo se repite y prueba otra vez.')};}},
 {id:'mayor',age:'m',pic:'⚖️',name:'Mayor o menor',what:'¿Cuál es más grande?',bg:'var(--teal)',levels:3,gen(l=0){
   const max=[20,100,1000][l],k=l===2?3:2,s=new Set();while(s.size<k)s.add(range(1,max));const ns=[...s];
   const big=Math.random()<.5,ans=String(big?Math.max(...ns):Math.min(...ns));
   return {prompt:big?_('¿Cuál es más grande?'):_('¿Cuál es más pequeño?'),speak:big?_('¿Cuál es el número más grande?'):_('¿Cuál es el número más pequeño?'),answer:ans,
     opts:ns.map(numBtn),right:big?_('{n} es el mayor.',{n:ans}):_('{n} es el menor.',{n:ans}),wrong:()=>_('Piénsalo otra vez: mira primero cuántas cifras tiene.')};}},
 {id:'intruso',age:'m',pic:'🤔',name:'¿Cuál sobra?',what:'Lógica: busca el intruso',bg:'var(--red)',gen(){
   const [A,B]=sample(D.GROUPS,2),odd=pick(B.items),items=shuffle([...sample(A.items,3),odd]);
   return {prompt:_('¿Cuál no es del grupo?'),speak:_('¿Cuál no es del grupo?'),answer:odd,opts:items.map(x=>({html:x,v:x})),
     right:_('Los demás son {g}.',{g:A.n}),wrong:()=>_('Ese sí es del grupo. Busca el diferente.')};}},
 {id:'habitat',age:'m',pic:'🐙',name:'¿Dónde vive?',what:'Mar, selva, granja, polo',bg:'var(--teal)',gen(){
   const [e,n,h]=pick(D.HABITANTS);
   return {prompt:_('¿Dónde vive {a}?',{a:n}),speak:_('¿Dónde vive {a}?',{a:n}),answer:h,visual:`<span>${e}</span>`,
     opts:D.HABITATS.map(([pe,pn])=>({html:`<span>${pe}</span><small>${esc(pn)}</small>`,v:pn,cls:'pic'})),right:_('{a} vive en {h}.',{a:cap(n),h}),wrong:()=>_('Ahí no. Prueba otro lugar.')};}},

 /* ---------- 8 a 10 años (y algunos para 11 y 12) ---------- */
 {id:'tablas',age:'g',pic:'✖️',name:'Tablas',what:'Multiplicar del 2 al 10',bg:'var(--red)',levels:3,gen(l=0){
   const a=l===0?pick([2,5,10]):l===1?range(2,9):range(6,12),b=range(l===2?3:1,10),p=a*b;
   const o=new Set([p]);for(const v of shuffle([a*(b+1),a*(b-1),(a+1)*b,(a-1)*b,p+1,p-1,p+10]))if(o.size<4&&v>0)o.add(v);
   return {prompt:`${a} × ${b} = ?`,speak:_('{a} por {b}',{a,b}),answer:String(p),
     opts:shuffle([...o]).map(numBtn),right:_('{a} por {b} son {p}.',{a,b,p}),wrong:()=>_('No es esa. Piensa en la tabla del {a}.',{a})};}},
 {id:'calculo',age:'gx',pic:'🧮',name:'Cálculo mental',what:'Sumas y restas grandes',bg:'var(--green)',levels:3,gen(l=0){
   let a,b;const add=Math.random()<.5;
   if(l===0){a=range(10,99);b=range(1,9);}else if(l===1){a=range(10,99);b=range(10,99);}else{a=range(100,999);b=range(10,99);}
   if(!add&&b>a)[a,b]=[b,a];const r=add?a+b:a-b;
   const o=new Set([r]);for(const d of shuffle([1,-1,10,-10,2,-2,100]))if(o.size<4&&r+d>=0)o.add(r+d);
   return {prompt:`${a} ${add?'+':'−'} ${b} = ?`,speak:add?_('{a} más {b}',{a,b}):_('{a} menos {b}',{a,b}),answer:String(r),
     opts:shuffle([...o]).map(numBtn),right:_('Son {r}.',{r}),wrong:()=>_('Revisa las unidades y las decenas.')};}},
 {id:'secuencias',age:'gx',pic:'🧠',name:'Secuencias',what:'Lógica con números',bg:'var(--purple)',levels:3,gen(l=0){
   const t=l===0?pick([0,2]):l===1?pick([0,1,2,3]):pick([1,3,4,5]);let seq,rule;
   if(t===0){const k=range(2,9),s0=range(1,20);seq=[0,1,2,3,4].map(i=>s0+k*i);rule=_('suma {k} cada vez',{k});}
   else if(t===1){const m=l===2?3:2,s0=range(1,4);seq=[0,1,2,3,4].map(i=>s0*m**i);rule=_('se multiplica por {m}',{m});}
   else if(t===2){const k=range(2,9),s0=range(40,90);seq=[0,1,2,3,4].map(i=>s0-k*i);rule=_('resta {k} cada vez',{k});}
   else if(t===3){const a=range(1,5),b=range(2,6),s0=range(1,10);seq=[s0];for(let i=1;i<5;i++)seq.push(seq[i-1]+(i%2?a:b));rule=_('suma {a} y luego {b}',{a,b});}
   else if(t===4){const s0=range(1,4);seq=[0,1,2,3,4].map(i=>(s0+i)**2);rule=_('son números al cuadrado');}
   else{const s0=range(1,5);seq=[s0,s0];for(let i=2;i<5;i++)seq.push(seq[i-1]+seq[i-2]);rule=_('cada número es la suma de los dos anteriores');}
   const ans=seq.pop(),o=new Set([ans]);for(const d of shuffle([1,-1,2,-2,3,5]))if(o.size<4)o.add(ans+d);
   return {prompt:_('¿Qué número sigue?'),speak:_('¿Qué número sigue?'),answer:String(ans),
     visual:seq.map(n=>`<span class="box">${n}</span>`).join('')+'<span class="box q">?</span>',
     opts:shuffle([...o]).map(numBtn),right:_('Es {n}: {r}.',{n:ans,r:rule}),wrong:()=>_('Mira cuánto cambia de uno a otro.')};}},
 {id:'ortografia',age:'gx',pic:'✏️',name:'Ortografía',what:'¿Cómo se escribe?',bg:'var(--blue)',needs:['SPELL'],gen(){
   const [e,ok,bad]=pick(D.SPELL);
   return {prompt:_('¿Cuál está bien escrita?'),speak:_('¿Cuál está bien escrita?'),answer:ok,visual:`<span>${e}</span>`,
     opts:shuffle([word(ok),word(bad)]),right:_('Se escribe {w}.',{w:ok}),wrong:()=>_('Esa tiene una falta. Prueba la otra.')};}},
 {id:'capitales',age:'gx',pic:'🌍',name:'Capitales',what:'Países y ciudades',bg:'var(--orange)',gen(){
   const [c,k]=pick(D.CAPITALS),others=sample(D.CAPITALS.filter(x=>x[1]!==k),3).map(x=>x[1]);
   return {prompt:_('¿Cuál es la capital de {c}?',{c}),speak:_('¿Cuál es la capital de {c}?',{c}),answer:k,
     opts:shuffle([k,...others]).map(word),right:_('La capital de {c} es {k}.',{c,k}),wrong:v=>_('{v} es otra capital. Prueba otra vez.',{v})};}},
 {id:'clasifica',age:'g',pic:'🐬',name:'Seres vivos',what:'¿Mamífero, ave o pez?',bg:'var(--purple)',gen(){
   const [e,n,k]=pick(D.CREATURES);
   return {prompt:_('¿Qué es {a}?',{a:n}),speak:_('¿Qué es {a}?',{a:n}),answer:k,visual:`<span>${e}</span>`,
     opts:D.CLASSES.map(word),right:_('{a} es un {k}.',{a:cap(n),k}),wrong:()=>_('No. Piensa cómo nace y cómo respira.')};}},
 {id:'espacio',age:'mgx',pic:'🪐',name:'El espacio',what:'Planetas y estrellas',bg:'var(--ink)',gen(){return qa(D.SPACE_QA,'espacio');}},
 {id:'naturaleza',age:'mgx',pic:'🌱',name:'Naturaleza',what:'Plantas, agua y animales',bg:'var(--green)',gen(){return qa(D.NATURE_QA,'naturaleza');}},
);
