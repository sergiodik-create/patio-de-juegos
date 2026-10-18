/* Português do Brasil: jogos de 50-peques.js, 51-medianos.js e 52-mayores.js. */
(()=>{
/* Ajudantes só deste arquivo (ficam dentro desta função para não se misturar com os de outros arquivos). */
const cap1=t=>t?String(t)[0].toUpperCase()+String(t).slice(1):t;
const pl=(n,w)=>n+` `+w+(+n===1?``:`s`);
/* Números em palavras (masculino): 21 → "vinte e um". */
const UN=[`zero`,`um`,`dois`,`três`,`quatro`,`cinco`,`seis`,`sete`,`oito`,`nove`,`dez`,`onze`,`doze`,
  `treze`,`catorze`,`quinze`,`dezesseis`,`dezessete`,`dezoito`,`dezenove`];
const DEZ={2:`vinte`,3:`trinta`,4:`quarenta`,5:`cinquenta`};
const num=n=>n<20?UN[n]:DEZ[Math.floor(n/10)]?DEZ[Math.floor(n/10)]+(n%10?` e `+UN[n%10]:``):String(n);
/* As horas são femininas: "uma hora", "duas horas". */
const horaW=x=>({1:`uma`,2:`duas`})[x]||num(x);
const hour12=x=>(x-1)%12+1;
/* Contrações com o artigo: de + "o trem" → "do trem"; em + "a Europa" → "na Europa". */
const art=x=>/^(o|a|os|as) (.*)$/.exec(String(x));
const de=x=>{const m=art(x);return m?`d`+m[1]+` `+m[2]:`de `+x;};
const em=x=>{const m=art(x);return m?`n`+m[1]+` `+m[2]:`na `+x;};  /* sem artigo: os continentes, todos femininos */
const esse=x=>{const m=art(x);return !m?`Esse é`:{o:`Esse é`,a:`Essa é`,os:`Esses são`,as:`Essas são`}[m[1]];};
/* Hora como se ensina às crianças no Brasil: "3 em ponto", "3 e quinze", "3 e meia", "quinze para as 4".
   h vem de 1 a 12; hourName escreve a hora com algarismos (botões) ou por extenso (voz). */
const para=(x,hourName)=>(x===1?`a `:`as `)+hourName(x);
const clock=(h,m,hourName)=>{
  const hh=hourName(hour12(h));
  if(m===0)return hh+` em ponto`;
  if(m===30)return hh+` e meia`;
  if(m===45)return `quinze para `+para(hour12(h+1),hourName);
  return hh+` e `+num(m);
};

Object.assign(LANGS.pt.t,{
  /* ---------- 50-peques.js: nomes nas portas dos jogos ---------- */
  'Puzle':'Quebra-cabeça',
  'Pon cada pieza en su sitio':'Coloque cada peça no lugar',
  'Piano de animales':'Piano dos bichos',
  'Toca y repite la música':'Toque e repita a música',
  'Sombras':'Sombras',
  '¿De quién es la sombra?':'De quem é a sombra?',
  '¿Cómo se siente?':'Como você se sente?',
  'Alegría, tristeza, miedo…':'Alegria, tristeza, medo…',
  '¿Qué pasa después?':'O que acontece depois?',
  'Huevo, pollito, gallina…':'Ovo, pintinho, galinha…',

  /* sombras ({x} chega com artigo: "o trem", "a girafa") */
  '¿De quién es esta sombra?':'De quem é esta sombra?',
  '¡Es la sombra de {x}!':v=>`É a sombra ${de(v.x)}!`,
  'Eso es {x}. Mira bien la forma.':v=>`${esse(v.x)} ${v.x}. Olhe bem a forma.`,

  /* sentimentos (os sentimentos são substantivos: alegria, tristeza…; as situações são sobre o Léo) */
  'Toca la cara de {f}':'Toque na carinha de {f}',
  'Es la cara de {f}.':'É a carinha de {f}.',
  'Esa es la cara de {f}. Prueba otra vez.':'Essa é a carinha de {f}. Tente de novo.',
  '{s} ¿Cómo se siente?':'{s} Como o Léo se sente?',
  'Siente {f}.':v=>({sono:`O Léo está com sono.`,surpresa:`O Léo fica surpreso.`})[v.f]||`O Léo sente ${v.f}.`,
  'Puede ser, pero piensa otra vez: ¿qué sentirías tú?':'Pode ser, mas pense de novo: o que você sentiria?',

  /* o que acontece depois */
  'Piensa qué pasa primero y qué pasa luego.':'Pense no que acontece primeiro e no que acontece depois.',

  /* quebra-cabeça */
  '{n} piezas':'{n} peças',
  'Hueco':'Espaço',
  'Pieza':'Peça',
  'Toca una pieza y luego toca su sitio en el puzle.':'Toque em uma peça e depois toque no lugar dela no quebra-cabeça.',
  '¡Puzle terminado! ¡Qué bien!':'Quebra-cabeça montado! Muito bem!',
  'Otro puzle':'Outro quebra-cabeça',
  'Ahí no va. Prueba en otro sitio.':'Aí não encaixa. Tente outro lugar.',

  /* piano dos bichos (a música é a mesma de "Brilha, brilha, estrelinha") */
  'Toca las teclas para hacer música.':'Toque nas teclas para fazer música.',
  'Nota':'Nota',
  '🎵 Estrellita':'🎵 Brilha, brilha',
  '🔁 Repite conmigo':'🔁 Repita comigo',
  '¡Eres un gran músico!':'Você toca muito bem!',
  '¡Bravo! ¡Eres un gran músico!':'Bravo! Você toca muito bem!',
  '¡Muy bien! Escucha la siguiente.':'Muito bem! Escute a próxima.',
  '¡Casi! Escucha otra vez.':'Quase! Escute de novo.',
  'Escucha…':'Escute…',
  '¡Ahora tú! Repite las notas.':'Sua vez! Repita as notas.',
  'Estrellita, ¿dónde estás?':'Brilha, brilha, estrelinha…',
  '¿La tocas tú? Empieza por el perrito.':'Quer tocar? Comece pelo cachorrinho.',
  'Escucha y repite.':'Escute e repita.',

  /* ---------- 51-medianos.js: nomes nas portas dos jogos ---------- */
  'Laberinto':'Labirinto',
  'Lleva al ratón al queso':'Leve o ratinho até o queijo',
  'Trazar letras':'Traçar letras',
  'Escribe con el dedo':'Escreva com o dedo',
  'Dominó':'Dominó',
  '¿Qué ficha encaja?':'Qual peça encaixa?',
  '¿Qué hora es?':'Que horas são?',
  'Aprende el reloj':'Aprenda a ver as horas',
  'Monedas':'Moedas',
  '¿Cuánto dinero hay?':'Quanto dinheiro tem?',
  'Sopa de letras':'Caça-palavras',
  'Encuentra las palabras':'Encontre as palavras',

  /* dominó */
  '¿Qué ficha puede ir al lado?':'Qual peça pode ir do lado?',
  'Busca una ficha que tenga 1 punto.':'Procure uma peça que tenha 1 ponto.',
  'Busca una ficha que tenga {n} puntos.':'Procure uma peça que tenha {n} pontos.',
  '{a} y {b}':'{a} e {b}',
  'Sí, las dos tienen {n}.':v=>`Isso! As duas têm ${pl(v.n,`ponto`)}.`,
  'Esa ficha no tiene {n}. Cuenta los puntos.':v=>`Essa peça não tem nenhum lado com ${pl(v.n,`ponto`)}. Conte os pontos.`,

  /* relógio */
  'Fíjate: la aguja corta marca la hora y la larga, los minutos.':'Olhe bem: o ponteiro pequeno marca as horas, e o grande, os minutos.',

  /* moedas */
  '¿Cuánto dinero hay en total?':'Quanto dinheiro tem no total?',
  'Hay {n} en total.':'São {n} no total.',
  'Suma primero las monedas grandes.':'Some primeiro as moedas grandes.',
  'Cuenta las monedas una a una.':'Conte as moedas uma por uma.',

  /* labirinto */
  'Pequeño':'Pequeno',
  'Mediano':'Médio',
  'Grande':'Grande',
  'Arriba':'Para cima',
  'Izquierda':'Para a esquerda',
  'Abajo':'Para baixo',
  'Derecha':'Para a direita',
  'Lleva al ratón hasta el queso. Usa las flechas o desliza el dedo.':'Leve o ratinho até o queijo. Use as setas ou deslize o dedo.',
  '¡Ñam! El ratón ha encontrado el queso.':'Nham! O ratinho encontrou o queijo.',
  'Otro laberinto':'Outro labirinto',

  /* traçar letras ({l} chega em minúscula; em maiúscula a voz diz o nome da letra: "a letra B, de bola") */
  'Mayúsculas':'Maiúsculas',
  'minúsculas':'minúsculas',
  'Números':'Números',
  'el número {n}':'o número {n}',
  'la {l}, de {w}':v=>`a letra ${String(v.l).toUpperCase()}, de ${v.w}`,
  'la {l}':v=>`a letra ${String(v.l).toUpperCase()}`,
  'Repasa {l} con el dedo.':'Cubra {l} com o dedo.',
  'Zona para escribir':'Área para escrever',
  '🔊 Oír':'🔊 Ouvir',
  'Siguiente ➡️':'Próximo ➡️',
  '¡Qué bien escrita! Toca «Siguiente».':'Que capricho! Toque em “Próximo”.',
  '¡Muy bien escrita!':'Muito bem! Que capricho!',
  /* fala do mesmo botão que a tradução de 'Borrar', seja ela qual for */
  'Intenta seguir la letra gris. Toca «Borrar» para empezar de nuevo.':()=>`Tente seguir a letra cinza. Toque em “${_('Borrar')}” para começar de novo.`,
  '¡Sigue! Repasa toda la letra.':'Continue! Cubra a letra inteira.',

  /* caça-palavras */
  'Toca la primera letra de una palabra y después la última.':'Toque na primeira letra de uma palavra e depois na última.',
  '¡Has encontrado todas las palabras!':'Você encontrou todas as palavras!',
  'Otra sopa':'Outro caça-palavras',
  'Busca las palabras escondidas.':'Procure as palavras escondidas.',
  '¡{w}!':'{w}!',

  /* ---------- 52-mayores.js: nomes nas portas dos jogos ---------- */
  'Sudoku':'Sudoku',
  'Lógica con números':'Lógica com números',
  'Salva la flor':'Salve a flor',
  'Adivina la palabra':'Adivinhe a palavra',
  'Robot':'Robô',
  'Prográmalo con flechas':'Programe com setas',
  'Programa con bucles':'Programe com repetições',
  'El robot que repite':'O robô que repete',
  'Fracciones':'Frações',
  'Partes de una pizza':'Pedaços de uma pizza',
  'Continentes':'Continentes',
  '¿Dónde está?':'Onde fica?',

  /* frações ({f}, {a} e {b} são frações por extenso, como "um meio" ou "três quartos") */
  '¿Qué parte de la pizza está pintada?':'Que parte da pizza está pintada?',
  'Es {f}.':v=>(/^um /.test(v.f)?`É `:`São `)+v.f+`.`,
  'Cuenta los trozos pintados y los trozos que hay en total.':'Conte os pedaços pintados e depois todos os pedaços da pizza.',
  '¿Qué fracción es igual?':'Qual fração é igual?',
  '{f}. ¿Qué fracción es igual?':v=>`${cap1(v.f)}. Qual fração é igual?`,
  '{a} es lo mismo que {b}.':v=>`${cap1(v.a)} é igual a ${v.b}.`,
  'Divide arriba y abajo por el mismo número.':'Divida o número de cima e o de baixo pelo mesmo número.',

  /* continentes ({x} chega com artigo; {c} é o nome do continente, sem artigo) */
  '¿En qué continente vive {x} en libertad?':'Em que continente vive {x} na natureza?',
  '¿En qué continente está {x}?':'Em que continente fica {x}?',
  'Está en {c}.':v=>`É ${em(v.c)}.`,
  'No es ahí. Piensa en el mapa del mundo.':'Não é aí. Pense no mapa do mundo.',

  /* sudoku */
  'Cada fila, cada columna y cada caja tienen todos los números sin repetir.':'Cada linha, cada coluna e cada quadrado têm todos os números, sem repetir.',
  'Toca una casilla vacía y luego un número.':'Toque em uma casinha vazia e depois em um número.',
  '¡Sudoku resuelto! ¡Qué cabeza!':'Sudoku resolvido! Mandou bem!',
  'Otro sudoku':'Outro sudoku',

  /* salve a flor */
  'Pista: {c}':'Dica: {c}',
  '💡 Ver dibujo':'💡 Ver desenho',
  'Adivina la palabra antes de que la flor pierda todos sus pétalos.':'Adivinhe a palavra antes que a flor perca todas as pétalas.',
  '¡Bien! Has salvado la flor: {w}.':'Muito bem! Você salvou a flor: {w}.',
  '¡Oh! La flor se ha quedado sin pétalos. Era «{w}».':'Ah, não! A flor ficou sem pétalas. A palavra era “{w}”.',
  'Otra palabra':'Outra palavra',

  /* robô */
  'Lleva el robot a la batería. Usa «Repetir» para gastar menos bloques.':'Leve o robô até a bateria. Use “Repetir” para gastar menos blocos.',
  'Lleva el robot hasta la batería. Pon las flechas y pulsa «Adelante».':'Leve o robô até a bateria. Coloque as setas e aperte “Vai”.',
  'Reto {i} de {n} · Máximo {m} bloques':'Desafio {i} de {n} · No máximo {m} blocos',
  'Reto libre':'Desafio livre',
  'Programa':'Programa',
  '🔁 Repetir':'🔁 Repetir',
  '⤴ Fin':'⤴ Fim',
  '▶ Adelante':'▶ Vai',
  'Máximo {m} bloques. Usa «Repetir».':'No máximo {m} blocos. Use “Repetir”.',
  'Repetir {n} veces':'Repetir {n} vezes',
  'Tu programa aparecerá aquí.':'Seu programa vai aparecer aqui.',
  'Bloques: {b} de {m}':'Blocos: {b} de {m}',
  'Primero pon algunas flechas.':'Primeiro coloque algumas setas.',
  'El robot se ha parado antes de llegar. Cambia el programa.':'O robô parou antes de chegar. Mude o programa.',
  '¡Uy! El robot se ha chocado. Cambia el programa.':'Opa! O robô bateu. Mude o programa.',
  '¡Conseguido con {b} bloques!':v=>`Você conseguiu com ${pl(v.b,`bloco`)}!`,
  '¡Conseguido en {n} pasos!':v=>`Você conseguiu em ${pl(v.n,`passo`)}!`,
  'Siguiente reto':'Próximo desafio',
});

/* ---------- dados de 50-peques.js ---------- */
LANGS.pt.data.SHADOWS=[['🚂','o trem'],['🦒','a girafa'],['🐘','o elefante'],['🦋','a borboleta'],['🐢','a tartaruga'],['🌳','a árvore']];
/* n se diz em "Toque na carinha de alegria" e "O Léo sente alegria" (sono e surpresa têm frase própria acima). */
LANGS.pt.data.FEELINGS=[
  {e:'😀',n:'alegria',tip:'Quando acontece uma coisa boa, sentimos alegria.'},
  {e:'😢',n:'tristeza',tip:'Quando estamos tristes, um abraço ajuda.'},
  {e:'😠',n:'raiva',tip:'Quando sentimos raiva, podemos respirar fundo e contar com palavras o que sentimos.'},
  {e:'😨',n:'medo',tip:'Quando temos medo, podemos pedir ajuda a um adulto.'},
  {e:'😲',n:'surpresa',tip:'A surpresa chega quando acontece algo que a gente não esperava.'},
  {e:'😴',n:'sono',tip:'Quando estamos com sono, o corpo pede para descansar.'}];
/* Cada situação vem antes de "Como o Léo se sente?"; o segundo item tem de ser um dos nomes de FEELINGS. */
LANGS.pt.data.SITUATIONS=[
  ['O Léo ganha um abraço bem apertado.','alegria'],['O Léo vence uma corrida com os amigos.','alegria'],['Hoje é o aniversário do Léo.','alegria'],
  ['O sorvete do Léo caiu no chão.','tristeza'],['O melhor amigo do Léo vai morar longe.','tristeza'],
  ['Pegaram o brinquedo do Léo sem pedir.','raiva'],['Rasgaram o desenho que o Léo tinha feito.','raiva'],
  ['Está caindo uma tempestade com muitos trovões.','medo'],['O Léo ouve um barulho estranho no escuro.','medo'],
  ['O Léo abre uma caixa e um boneco pula lá de dentro.','surpresa'],['O Léo encontra um presente debaixo do travesseiro.','surpresa'],
  ['O Léo brincou o dia todo e já é de noite.','sono']];
LANGS.pt.data.NEXT_SEQS=[
  {e:['🥚','🐣','🐔'],t:'Do ovo sai um pintinho, e o pintinho cresce até virar uma galinha.'},
  {e:['🌱','🪴','🌳'],t:'A semente brota, cresce e vira uma árvore.'},
  {e:['🐛','🦋'],t:'A lagarta se transforma em borboleta.'},
  {e:['🌧️','🌈'],t:'Depois da chuva, às vezes aparece o arco-íris.'},
  {e:['🧦','👟'],t:'Primeiro as meias e depois os sapatos.'},
  {e:['🧼','🍽️'],t:'Lavamos as mãos antes de comer.'},
  {e:['🌅','☀️','🌙'],t:'De manhã o sol nasce, e à noite aparece a lua.'},
  {e:['👶','🧒','🧑'],t:'Os bebês crescem, viram crianças e depois adultos.'},
  {e:['🌸','🍏','🍎'],t:'Primeiro a flor, depois a fruta verde e por fim a fruta madura.'},
  {e:['❄️','⛄','💧'],t:'Com a neve fazemos um boneco, e com o sol ele derrete.'},
  {e:['🛏️','🪥','🎒'],t:'A gente acorda, escova os dentes e vai para a escola.'},
  {e:['🎂','🕯️','🥳'],t:'Colocamos as velas no bolo, assopramos e vamos comemorar!'}];

/* ---------- dados de 51-medianos.js ---------- */
/* Botões: "3 em ponto", "3 e quinze", "3 e meia", "Quinze para as 4" (hora em algarismos, como no relógio). */
LANGS.pt.data.TIME=(h,m)=>cap1(clock(h,m,String));
/* Dito depois de acertar: "São três e meia.", "É uma em ponto.", "São quinze para as quatro.". */
LANGS.pt.data.TIME_SAY=(h,m)=>(m===45?`São `:hour12(h)===1?`É `:`São `)+clock(h,m,horaW)+`.`;
/* Alfabeto de 26 letras na ordem da alfabetização: primeiro as vogais, depois as consoantes das sílabas mais simples
   (pa, ba, ta, da…), e por último H, Q, K, W e Y. Nas minúsculas entra também o ç. */
LANGS.pt.data.TRACE={upper:'AEIOUPBTDFVMNLRSCGJZXHQKWY',lower:'aeioupbtdfvmnlrscgjzxhqkwyç'};

/* ---------- dados de 52-mayores.js ---------- */
/* O jogo compara as letras sem acento e sem cedilha (Ã, É, Ç contam como A, E, C), por isso o teclado tem só A a Z. */
LANGS.pt.data.KEYBOARD='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/* Palavras com acentos e ç (aparecem assim ao final), mas sem hífen: só letras e espaços. */
LANGS.pt.data.HANGMAN=[
  ['Animais',[['🐘','elefante'],['🦒','girafa'],['🐢','tartaruga'],['🦋','borboleta'],['🐊','crocodilo'],['🐧','pinguim'],['🦉','coruja'],['🐬','golfinho'],['🦓','zebra'],['🐿️','esquilo'],['🦔','ouriço'],['🐙','polvo']]],
  ['Frutas e comida',[['🍎','maçã'],['🍌','banana'],['🍓','morango'],['🍉','melancia'],['🍊','laranja'],['🍅','tomate'],['🥕','cenoura'],['🍞','pão'],['🧀','queijo'],['🍇','uvas']]],
  ['O espaço',[['🪐','planeta'],['⭐','estrela'],['🚀','foguete'],['👩‍🚀','astronauta'],['🌌','galáxia'],['☄️','cometa'],['🛰️','satélite'],['🌙','lua']]],
  ['Natureza',[['⛰️','montanha'],['🌋','vulcão'],['🏞️','rio'],['🌲','floresta'],['🌵','cacto'],['⛈️','tempestade'],['🏜️','deserto'],['🌊','onda'],['🌻','girassol']]],
  ['Em casa',[['🛏️','cama'],['🪑','cadeira'],['🚪','porta'],['🪟','janela'],['🧸','ursinho'],['📚','livro'],['🥄','colher'],['🛁','banheira']]]];
/* Fração por extenso: 1/2 → "um meio", 2/3 → "dois terços", 3/4 → "três quartos". */
LANGS.pt.data.FRACTION=(k,n)=>{
  const d={2:[`meio`,`meios`],3:[`terço`,`terços`],4:[`quarto`,`quartos`],5:[`quinto`,`quintos`],6:[`sexto`,`sextos`],
    7:[`sétimo`,`sétimos`],8:[`oitavo`,`oitavos`],9:[`nono`,`nonos`],10:[`décimo`,`décimos`]}[n];
  return num(k)+` `+(d?d[k===1?0:1]:num(n)+` avos`);
};
/* Os seis continentes como se ensinam no Brasil (a América é um só continente), na mesma ordem que em espanhol.
   kind continua 'vive' (um animal que vive lá na natureza) ou 'está' (um lugar); o número é o continente. */
LANGS.pt.data.WORLD={continents:['América','Europa','Ásia','África','Oceania','Antártida'],items:[
  ['🦘','vive','o canguru',4],['🐨','vive','o coala',4],['🐼','vive','o panda-gigante',2],['🦒','vive','a girafa',3],['🦓','vive','a zebra',3],
  ['🐆','vive','a onça-pintada',0],['🐧','vive','o pinguim-imperador',5],['🦅','vive','o condor-dos-andes',0],['🦍','vive','o gorila',3],
  ['🗽','está','a Estátua da Liberdade',0],['🗼','está','a Torre Eiffel',1],['🔺','está','a Grande Pirâmide de Gizé',3],['🗻','está','o monte Fuji',2],
  ['🏟️','está','o Coliseu de Roma',1],['🏔️','está','o monte Everest',2],['🌳','está','a Floresta Amazônica',0],['🏜️','está','o deserto do Saara',3],
  ['⛪','está','a Sagrada Família de Barcelona',1],['🕌','está','o Taj Mahal',2],['🌉','está','a ponte Golden Gate',0],['🪸','está','a Grande Barreira de Coral',4],['🧊','está','a maior camada de gelo do planeta',5]]};
})();
