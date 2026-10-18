/* Português: jogos de perguntas (20-preguntas.js) e as listas de dados básicas (10-datos.js). */
(()=>{
/* Ajudantes só deste arquivo (dentro desta função para não se misturarem com outros arquivos).
   Os nomes das listas levam artigo («o círculo», «a fazenda», «o Brasil») para fazer as contrações:
   em + o = no, de + a = da; sem artigo fica «em»/«de» (de Portugal, de Cuba). */
const ART=/^(o|a|os|as) /;
const em=x=>ART.test(x)?'n'+x:'em '+x;
const de=x=>ART.test(x)?'d'+x:'de '+x;
const um=x=>String(x).replace(/^o /,'um ').replace(/^a /,'uma ');

Object.assign(LANGS.pt.t,{
  /* 10-datos.js: perguntas de um banco (espaço, natureza) */
  'La respuesta es: {a}.':'A resposta é: {a}.',
  'No es esa. Prueba otra vez.':'Não é essa. Tente de novo.',

  /* nomes e descrições dos jogos */
  'Colores':'Cores',
  'Toca el color':'Toque na cor',
  'Animales':'Animais',
  '¿Quién hace ese ruido?':'Quem faz esse barulho?',
  'Contar':'Contar',
  'Formas':'Formas',
  'Círculo, estrella, corazón…':'Círculo, estrela, coração…',
  'Grande y pequeño':'Grande e pequeno',
  'El cielo':'O céu',
  'Sol, luna y cohetes':'Sol, lua e foguetes',
  'Primera letra':'Primeira letra',
  'Completa la palabra':'Complete a palavra',
  'Sumas':'Somas',
  'Junta y cuenta':'Junte e conte',
  'Restas':'Subtrações',
  '¿Cuántas quedan?':'Quantas sobram?',
  'Completa la fila':'Complete a fila',
  'Series':'Padrões',
  'Mayor o menor':'Maior ou menor',
  '¿Cuál sobra?':'Qual não combina?',
  'Lógica: busca el intruso':'Lógica: encontre o intruso',
  '¿Dónde vive?':'Onde vive?',
  'Mar, selva, granja, polo':'Mar, selva, fazenda, polo',
  'Tablas':'Tabuada',
  'Multiplicar del 2 al 10':'Multiplicar do 2 ao 10',
  'Cálculo mental':'Cálculo mental',
  'Sumas y restas grandes':'Somas e subtrações grandes',
  'Secuencias':'Sequências',
  'Lógica con números':'Lógica com números',
  'Ortografía':'Ortografia',
  '¿Cómo se escribe?':'Como se escreve?',
  'Capitales':'Capitais',
  'Países y ciudades':'Países e cidades',
  'Seres vivos':'Seres vivos',
  '¿Mamífero, ave o pez?':'Mamífero, ave ou peixe?',
  'El espacio':'O espaço',
  'Planetas y estrellas':'Planetas e estrelas',
  'Naturaleza':'Natureza',
  'Plantas, agua y animales':'Plantas, água e animais',

  /* cores ({c} é o nome da cor: «no vermelho», «no rosa») */
  'Toca el {c}':'Toque no {c}',
  'Toca el color {c}':v=>`Toque na cor ${String(v.c).replace(/o$/,'a')}.`,  /* na cor vermelha, amarela, roxa; azul, verde, laranja e rosa não mudam */
  'Es el {c}.':'É o {c}.',
  'Ese es el {c}. Prueba otra vez.':'Esse é o {c}. Tente de novo.',

  /* animais */
  '¿Quién dice «{s}»?':'Quem faz “{s}”?',
  '¿Quién dice {s}?':'Quem faz {s}?',
  '{a} dice {s}.':'{a} faz {s}.',
  'Ese animal es {a}, que dice {s}. Prueba otra vez.':'Esse animal é {a}, que faz {s}. Tente de novo.',

  /* contar */
  '¿Cuántas hay?':'Quantas tem?',
  '¿Cuántas hay? Toca las frutas para contar.':'Quantas tem? Toque nas frutas para contar.',
  'Casi. Cuenta otra vez conmigo.':'Quase! Conte de novo comigo.',

  /* formas e o céu ({x} é «o círculo», «a lua»…: toque no círculo, toque na lua) */
  'Toca {x}':v=>`Toque ${em(v.x)}`,
  'Es {x}.':'É {x}.',
  'Esa forma es {x}. Prueba otra vez.':v=>`Essa forma é ${um(v.x)}. Tente de novo.`,
  '¡Es {x}!':'É {x}!',
  'Eso es {x}. Prueba otra vez.':'Isso é {x}. Tente de novo.',

  /* grande e pequeno */
  'Toca el {x}':'Toque no {x}',
  'grande':'grande',
  'pequeño':'pequeno',
  'Toca el grande':'Toque no grande.',
  'Toca el pequeño':'Toque no pequeno.',
  '¡Ese es el grande!':'Esse é o grande!',
  '¡Ese es el pequeño!':'Esse é o pequeno!',
  'Ese es pequeño. Busca el grande.':'Esse é pequeno. Procure o grande.',
  'Ese es grande. Busca el pequeño.':'Esse é grande. Procure o pequeno.',

  /* primeira letra e letra que falta */
  '¿Con qué letra empieza?':'Com que letra começa?',
  '¿Con qué letra empieza {w}?':'Com que letra começa a palavra {w}?',
  '{w} empieza con {l}.':'{w} começa com {l}.',
  'No. Escucha: {w}. Prueba otra vez.':'Não. Escute: {w}. Tente de novo.',
  '¿Qué letra falta?':'Qual letra está faltando?',
  '¿Qué letra falta en {w}?':'Qual letra está faltando na palavra {w}?',
  'Es la {l}: {w}.':'É a letra {l}: {w}.',
  'Escucha bien: {w}. Prueba otra vez.':'Escute bem: {w}. Tente de novo.',

  /* somas e subtrações */
  '¿Cuántas hay en total?':'Quantas tem ao todo?',
  '¿Cuánto es?':'Quanto é?',
  '{a} más {b}. ¿Cuánto es?':'Quanto é {a} mais {b}?',
  '{a} más {b} son {s}.':'{a} mais {b} é igual a {s}.',
  'Casi. Cuenta todas despacio.':'Quase! Conte todas devagar.',
  'Casi. Cuenta con los dedos desde el número grande.':'Quase! Comece pelo número maior e continue contando nos dedos.',
  'Había {a}. Se comen {b}. ¿Cuántas quedan?':'Tinha {a}. Comemos {b}. Quantas sobraram?',
  '{a} menos {b} son {r}.':'{a} menos {b} é igual a {r}.',
  'Cuenta las que siguen brillando.':'Conte as que continuam brilhando.',
  '{a} menos {b}':'Quanto é {a} menos {b}?',
  'Casi. Cuenta hacia atrás despacio.':'Quase! Conte para trás devagar.',

  /* número que falta */
  '¿Qué número falta?':'Qual número está faltando?',
  'Era el {n}.':'Era o {n}.',
  'Cuenta desde el principio.':'Conte desde o começo.',
  'Fíjate: va de {s} en {s}.':'Preste atenção: vai de {s} em {s}.',

  /* padrões */
  '¿Qué viene después?':'O que vem depois?',
  '¡Has encontrado la serie!':'Você descobriu o padrão!',
  'Mira cómo se repite y prueba otra vez.':'Veja como se repete e tente de novo.',

  /* maior ou menor */
  '¿Cuál es más grande?':'Qual é o maior?',
  '¿Cuál es más pequeño?':'Qual é o menor?',
  '¿Cuál es el número más grande?':'Qual é o maior número?',
  '¿Cuál es el número más pequeño?':'Qual é o menor número?',
  '{n} es el mayor.':'{n} é o maior.',
  '{n} es el menor.':'{n} é o menor.',
  'Piénsalo otra vez: mira primero cuántas cifras tiene.':'Pense de novo: veja primeiro quantos algarismos cada número tem.',

  /* qual não combina */
  '¿Cuál no es del grupo?':'Qual não é do grupo?',
  'Los demás son {g}.':'Os outros são {g}.',
  'Ese sí es del grupo. Busca el diferente.':'Esse é do grupo, sim. Procure o diferente.',

  /* onde vive? ({h} é «o mar», «a fazenda»…: vive no mar, vive na fazenda) */
  '¿Dónde vive {a}?':'Onde vive {a}?',
  '{a} vive en {h}.':v=>`${v.a} vive ${em(v.h)}.`,
  'Ahí no. Prueba otro lugar.':'Aí não. Tente outro lugar.',

  /* tabuada e cálculo mental */
  '{a} por {b}':'Quanto é {a} vezes {b}?',
  '{a} por {b} son {p}.':'{a} vezes {b} é igual a {p}.',
  'No es esa. Piensa en la tabla del {a}.':'Não é essa. Pense na tabuada do {a}.',
  '{a} más {b}':'Quanto é {a} mais {b}?',
  'Son {r}.':'O resultado é {r}.',
  'Revisa las unidades y las decenas.':'Confira as unidades e as dezenas.',

  /* sequências: a regra vem depois de «É 20:» */
  'suma {k} cada vez':'soma {k} a cada vez',
  'se multiplica por {m}':'multiplica por {m} a cada vez',
  'resta {k} cada vez':'tira {k} a cada vez',
  'suma {a} y luego {b}':'soma {a} e depois {b}',
  'son números al cuadrado':'são números ao quadrado',
  'cada número es la suma de los dos anteriores':'cada número é a soma dos dois anteriores',
  '¿Qué número sigue?':'Qual número vem depois?',
  'Es {n}: {r}.':'É {n}: {r}.',
  'Mira cuánto cambia de uno a otro.':'Veja quanto muda de um número para o outro.',

  /* ortografia */
  '¿Cuál está bien escrita?':'Qual está escrita do jeito certo?',
  'Se escribe {w}.':'O certo é {w}.',
  'Esa tiene una falta. Prueba la otra.':'Essa tem um erro. Tente a outra.',

  /* capitais ({c} leva artigo quando o português pede: a capital do Brasil, da França, de Portugal) */
  '¿Cuál es la capital de {c}?':v=>`Qual é a capital ${de(v.c)}?`,
  'La capital de {c} es {k}.':v=>`A capital ${de(v.c)} é ${v.k}.`,
  '{v} es otra capital. Prueba otra vez.':'{v} é a capital de outro país. Tente de novo.',

  /* seres vivos ({k} é mamífero, ave, peixe, réptil ou inseto: «uma ave», «um peixe») */
  '¿Qué es {a}?':'Que tipo de animal é {a}?',
  '{a} es un {k}.':v=>`${v.a} é ${/^ave\b/.test(v.k)?'uma':'um'} ${v.k}.`,
  'No. Piensa cómo nace y cómo respira.':'Não. Pense em como nasce e como respira.',
});

/* ---------- listas de dados (mesma forma que DATA.es em 10-datos.js) ---------- */
LANGS.pt.data.COLORS=[
  {n:'vermelho',c:'var(--red)'},{n:'azul',c:'var(--blue)'},{n:'amarelo',c:'var(--yellow)'},
  {n:'verde',c:'var(--green)'},{n:'roxo',c:'var(--purple)'},{n:'laranja',c:'var(--orange)'},{n:'rosa',c:'var(--pink)'}];
/* Os nomes levam artigo («a vaca», «o gato»): também servem para «É a sombra da vaca». */
LANGS.pt.data.ANIMALS=[
  {e:'🐮',n:'a vaca',s:'muuu'},{e:'🐶',n:'o cachorro',s:'au au'},{e:'🐱',n:'o gato',s:'miau'},
  {e:'🐷',n:'o porquinho',s:'oinc oinc'},{e:'🐑',n:'a ovelha',s:'méééé'},{e:'🦆',n:'o pato',s:'quá quá'},
  {e:'🐸',n:'o sapo',s:'croac croac'},{e:'🦁',n:'o leão',s:'grrr'},{e:'🐔',n:'a galinha',s:'có có có'},
  {e:'🐴',n:'o cavalo',s:'hiiin'},{e:'🐝',n:'a abelha',s:'bzzz'},{e:'🐍',n:'a cobra',s:'ssss'}];
LANGS.pt.data.SHAPES=[
  {n:'o círculo',svg:'<circle cx="50" cy="50" r="42"/>'},
  {n:'o quadrado',svg:'<rect x="10" y="10" width="80" height="80" rx="6"/>'},
  {n:'o triângulo',svg:'<polygon points="50,8 94,90 6,90"/>'},
  {n:'a estrela',svg:'<polygon points="50,5 61,38 96,38 68,59 79,93 50,72 21,93 32,59 4,38 39,38"/>'},
  {n:'o coração',svg:'<path d="M50 88C20 65 5 48 5 30 5 15 17 5 30 5c10 0 17 6 20 13 3-7 10-13 20-13 13 0 25 10 25 25 0 18-15 35-45 58z"/>'},
  {n:'o retângulo',svg:'<rect x="4" y="26" width="92" height="48" rx="6"/>'}];
/* Uma palavra cada, em minúsculas (também enchem a caça-palavras, onde os acentos e o ç somem).
   Cada uma começa com o som de sempre da sua letra (nada de «cebola», «girafa», «chave» ou «nhoque»),
   e a primeira palavra de cada letra é a que dá nome à letra ao traçar («a, de abelha»). Sem K, W nem Y. */
LANGS.pt.data.WORDS=[
  ['🐝','abelha'],['⚽','bola'],['🏠','casa'],['🎲','dado'],['🐘','elefante'],['🦭','foca'],['🐱','gato'],['🦛','hipopótamo'],
  ['🏝️','ilha'],['🐊','jacaré'],['🌙','lua'],['🐒','macaco'],['👃','nariz'],['🥚','ovo'],['🦆','pato'],['🧀','queijo'],
  ['🐭','rato'],['☀️','sol'],['🐯','tigre'],['🍇','uva'],['🐄','vaca'],['☕','xícara'],['🦓','zebra'],
  ['✈️','avião'],['🌳','árvore'],['🍌','banana'],['⛵','barco'],['🦋','borboleta'],['🐴','cavalo'],['🐰','coelho'],['🦉','coruja'],
  ['🦕','dinossauro'],['⭐','estrela'],['🌸','flor'],['🔥','fogo'],['🐜','formiga'],['🐔','galinha'],['🚁','helicóptero'],
  ['🪟','janela'],['🐞','joaninha'],['🦁','leão'],['🍎','maçã'],['🍓','morango'],['☁️','nuvem'],['🐑','ovelha'],['🐟','peixe'],
  ['🐷','porco'],['🌹','rosa'],['🐸','sapo'],['🍦','sorvete'],['🐢','tartaruga'],['🚂','trem'],['🐻','urso'],['🦄','unicórnio'],['🎻','violino']];
/* Letras que aparecem como opções erradas em «Primeira letra» e que enchem a caça-palavras: só as que têm palavras acima. */
LANGS.pt.data.LETTERS='ABCDEFGHIJLMNOPQRSTUVXZ'.split('');
/* [desenho, forma certa, erro comum]: s/ss/ç/c, s/z, x/ch, g/j, r/rr, gu, l/u no final, m/n no final, lh/li, e/i, o/u, ei/e.
   Nenhum erro é uma palavra de verdade em português. */
LANGS.pt.data.SPELL=[
  ['🚲','bicicleta','bissicleta'],['🔑','chave','xave'],['🏠','casa','caza'],['🐸','sapo','çapo'],['🍎','maçã','massã'],
  ['🦒','girafa','jirafa'],['🧊','gelo','jelo'],['🐶','cachorro','cachoro'],['🧒','criança','criansa'],['👨‍👩‍👧','família','familha'],
  ['🍉','melancia','melansia'],['🥕','cenoura','senoura'],['🚀','foguete','fogete'],['🐧','pinguim','pinguin'],['⚽','futebol','futebou'],
  ['✂️','tesoura','tezoura'],['🌧️','chuva','xuva'],['🧀','queijo','quejo'],['🦓','zebra','sebra'],['🎁','presente','prezente'],
  ['🪟','janela','ganela'],['🐦','pássaro','páçaro'],['🐟','peixe','peiche'],['⭐','estrela','istrela'],['🍓','morango','murango'],
  ['☁️','nuvem','nuven'],['🎸','guitarra','gitarra'],['🧹','vassoura','vasoura'],['🦕','dinossauro','dinosauro'],['🐑','ovelha','ovelia'],
  ['🐌','caracol','caracou'],['🍪','biscoito','biscoto'],['🦀','caranguejo','carangueijo'],['🍬','doce','dosse'],['🚑','ambulância','ambulânsia']];
/* O país leva artigo quando o português pede (a capital do Brasil, da Espanha, dos Estados Unidos; de Portugal, de Cuba). */
LANGS.pt.data.CAPITALS=[
  ['a Espanha','Madri'],['o México','Cidade do México'],['a Argentina','Buenos Aires'],['a Colômbia','Bogotá'],['o Peru','Lima'],
  ['o Chile','Santiago'],['a Venezuela','Caracas'],['o Equador','Quito'],['o Uruguai','Montevidéu'],['o Paraguai','Assunção'],
  ['Cuba','Havana'],['a Costa Rica','San José'],['a República Dominicana','Santo Domingo'],['a França','Paris'],['a Itália','Roma'],
  ['Portugal','Lisboa'],['a Alemanha','Berlim'],['o Japão','Tóquio'],['o Brasil','Brasília'],['o Reino Unido','Londres'],
  ['o Egito','Cairo'],['o Canadá','Ottawa'],['a Austrália','Camberra'],['Angola','Luanda'],['Moçambique','Maputo'],
  ['os Estados Unidos','Washington'],['a China','Pequim'],['a Índia','Nova Délhi'],['a Grécia','Atenas']];
LANGS.pt.data.CLASSES=['mamífero','ave','peixe','réptil','inseto'];
LANGS.pt.data.CREATURES=[
  ['🐬','o golfinho','mamífero'],['🦇','o morcego','mamífero'],['🐳','a baleia','mamífero'],['🐘','o elefante','mamífero'],['🐒','o macaco','mamífero'],
  ['🐧','o pinguim','ave'],['🦉','a coruja','ave'],['🦅','a águia','ave'],['🦩','o flamingo','ave'],['🦜','o papagaio','ave'],
  ['🦈','o tubarão','peixe'],['🐠','o peixe-palhaço','peixe'],['🐡','o peixe-balão','peixe'],
  ['🐢','a tartaruga','réptil'],['🐍','a cobra','réptil'],['🐊','o jacaré','réptil'],['🦎','a lagartixa','réptil'],
  ['🦋','a borboleta','inseto'],['🐝','a abelha','inseto'],['🐜','a formiga','inseto'],['🐞','a joaninha','inseto']];
LANGS.pt.data.NUMWORDS=['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez'];
LANGS.pt.data.SKY=[['☀️','o sol'],['🌙','a lua'],['⭐','a estrela'],['☁️','a nuvem'],['🚀','o foguete'],['🪐','o planeta'],['🌈','o arco-íris'],['✈️','o avião']];
/* n se diz em «Os outros são frutas.» */
LANGS.pt.data.GROUPS=[
  {n:'frutas',items:['🍎','🍌','🍇','🍓','🍐','🍒','🍉']},{n:'animais',items:['🐶','🐱','🐮','🐷','🐴','🐑','🐸']},
  {n:'veículos',items:['🚗','🚌','🚲','🚂','✈️','🚀','🚜']},{n:'roupas',items:['👕','👖','👗','🧦','🧢','👟','🧤']},
  {n:'instrumentos musicais',items:['🎸','🥁','🎺','🎻','🎹','🪇']}];
/* A resposta diz «vive no mar», «vive na fazenda» (veja '{a} vive en {h}.' acima). */
LANGS.pt.data.HABITATS=[['🌊','o mar'],['🚜','a fazenda'],['🌴','a selva'],['❄️','o polo']];
LANGS.pt.data.HABITANTS=[['🐙','o polvo','o mar'],['🐠','o peixe-palhaço','o mar'],['🐬','o golfinho','o mar'],['🦀','o caranguejo','o mar'],
  ['🐄','a vaca','a fazenda'],['🐔','a galinha','a fazenda'],['🐷','o porco','a fazenda'],['🐑','a ovelha','a fazenda'],
  ['🐒','o macaco','a selva'],['🦜','o papagaio','a selva'],['🐅','o tigre','a selva'],['🦍','o gorila','a selva'],
  ['🐧','o pinguim','o polo'],['🐻‍❄️','o urso-polar','o polo'],['🦭','a foca','o polo']];
LANGS.pt.data.SPACE_QA=[
  ['🪐','Qual é o maior planeta?','Júpiter',['Marte','A Terra','Mercúrio']],
  ['☀️','Qual planeta fica mais perto do Sol?','Mercúrio',['Vênus','Marte','Netuno']],
  ['🔴','Qual é o planeta vermelho?','Marte',['Vênus','Saturno','Urano']],
  ['💍','Qual planeta tem anéis muito famosos?','Saturno',['Marte','Mercúrio','Vênus']],
  ['🌍','Em que planeta nós vivemos?','A Terra',['Marte','Júpiter','Vênus']],
  ['☀️','O que é o Sol?','Uma estrela',['Um planeta','Uma lua','Um cometa']],
  ['🔢','Quantos planetas tem o sistema solar?','8',['7','9','10']],
  ['🌙','O que gira em volta da Terra?','A Lua',['O Sol','Marte','Saturno']],
  ['👨‍🚀','Quem foi a primeira pessoa a pisar na Lua?','Neil Armstrong',['Cristóvão Colombo','Albert Einstein','Isaac Newton']],
  ['🌌','Como se chama a nossa galáxia?','A Via Láctea',['Andrômeda','A Ursa Maior','Órion']],
  ['🗓️','Quanto tempo a Terra leva para dar uma volta em torno do Sol?','Um ano',['Um dia','Um mês','Uma semana']],
  ['🌗','Quanto tempo a Terra leva para girar em torno de si mesma?','Um dia',['Um ano','Uma hora','Um mês']],
  ['🔥','Qual é o planeta mais quente?','Vênus',['Mercúrio','Marte','Júpiter']],
  ['🚀','Como se chamam as pessoas que viajam para o espaço?','Astronautas',['Pilotos','Marinheiros','Mergulhadores']]];
LANGS.pt.data.NATURE_QA=[
  ['🌱','Do que as plantas precisam para crescer?','Luz, água e ar',['Só areia','Escuridão','Chocolate']],
  ['🐝','O que as abelhas buscam nas flores?','Néctar',['Folhas','Sementes de pinheiro','Água salgada']],
  ['🌳','As plantas soltam um gás de que precisamos para respirar. Qual é?','Oxigênio',['Fumaça','Hélio','Gás de cozinha']],
  ['🐛','Em que a lagarta se transforma?','Borboleta',['Abelha','Besouro','Formiga']],
  ['🐸','Em que o girino se transforma?','Sapo',['Peixe','Tartaruga','Lagartixa']],
  ['🍂','Em que estação as folhas de muitas árvores caem?','Outono',['Primavera','Verão','Nenhuma']],
  ['🥕','Que parte da planta fica embaixo da terra?','A raiz',['A flor','A folha','O fruto']],
  ['🌊','Como é a água do mar?','Salgada',['Doce','Picante','Amarga']],
  ['🧊','Quando a água congela, ela vira…','Gelo',['Vapor','Nuvem','Areia']],
  ['🐋','Qual é o maior animal do mundo?','A baleia-azul',['O elefante','A girafa','O tubarão-branco']],
  ['🕷️','Quantas patas tem uma aranha?','8',['6','4','10']],
  ['🐜','Quantas patas tem um inseto?','6',['8','4','10']],
  ['🌧️','De onde cai a chuva?','Das nuvens',['Das árvores','Das montanhas','Do Sol']],
  ['🌸','Em que estação muitas plantas dão flores?','Primavera',['Inverno','Outono','Nenhuma']],
  ['♻️','O que podemos fazer para cuidar do planeta?','Reciclar e não jogar lixo no chão',['Deixar as torneiras abertas','Jogar plástico no mar','Cortar todas as árvores']]];
LANGS.pt.data.STICKER_NAMES=Object.fromEntries([
  ['🐶','cachorro'],['🐱','gato'],['🐭','rato'],['🐹','hamster'],['🐰','coelho'],['🦊','raposa'],['🐻','urso'],['🐼','panda'],['🐨','coala'],['🐯','tigre'],
  ['🦁','leão'],['🐮','vaca'],['🐷','porquinho'],['🐸','sapo'],['🐵','macaco'],['🐔','galinha'],['🐧','pinguim'],['🐦','passarinho'],['🦆','pato'],['🦉','coruja'],
  ['🦄','unicórnio'],['🐝','abelha'],['🦋','borboleta'],['🐞','joaninha'],['🐢','tartaruga'],['🐙','polvo'],['🐠','peixe'],['🐬','golfinho'],['🐳','baleia'],['🦀','caranguejo'],
  ['🦒','girafa'],['🐘','elefante'],['🍎','maçã'],['🍌','banana'],['🍓','morango'],['🍉','melancia'],['🍒','cerejas'],['🍦','sorvete'],['🍪','biscoito'],['🧁','bolinho'],
  ['🚀','foguete'],['🛸','disco voador'],['🪐','planeta'],['🌙','lua'],['⭐','estrela'],['☀️','sol'],['🌈','arco-íris'],['⛄','boneco de neve'],['🚂','trem'],['🚒','caminhão de bombeiros'],
  ['🚜','trator'],['⛵','barco a vela'],['🎈','balão'],['🎨','tintas'],['🎸','guitarra'],['⚽','bola de futebol'],['🏆','troféu'],['👑','coroa'],['💎','diamante'],['🧸','ursinho de pelúcia']]);
})();
