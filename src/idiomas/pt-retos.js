/* Português do Brasil: jogos para 11 e 12 anos (55-once-doce.js) e a seção de idiomas (56-idiomas.js). */
Object.assign(LANGS.pt.t,{
  /* ---------- 55-once-doce.js: nomes dos jogos ---------- */
  'Acertijos': 'Enigmas',
  'Piensa antes de contestar': 'Pense antes de responder',
  'Mecanografía': 'Digitação',
  'Escribe rápido y bien': 'Digite rápido e sem erros',
  'Ciencia': 'Ciências',
  'Cuerpo, materia y energía': 'Corpo, matéria e energia',
  'Historia': 'História',
  '¿Qué pasó antes?': 'O que veio antes?',
  'Dinero y ahorro': 'Dinheiro e poupança',
  'Ahorra, compara y decide': 'Economize, compare e decida',

  /* enigmas */
  'Si hoy es {d}, ¿qué día será dentro de {n} días?': 'Se hoje é {d}, que dia vai ser daqui a {n} dias?',
  'Si hoy es {d}, ¿qué día fue hace {n} días?': 'Se hoje é {d}, que dia foi {n} dias atrás?',
  'Cada 7 días se repite el mismo día de la semana. {n} días son {w} semanas y {r} días más.': v=>{
    const wk=v.w===1?'uma semana':`${v.w} semanas`,dy=v.r===1?'um dia':`${v.r} dias`;
    return 'A cada 7 dias, o mesmo dia da semana se repete. '+(
      v.w===0?`${v.n} dias são menos de uma semana, então é só contar um por um.`:
      v.r===0?`${v.n} dias são exatamente ${wk}, então é o mesmo dia.`:
      `${v.n} dias são ${wk} e mais ${dy}.`);},
  'Pista: quita semanas enteras de 7 días.': 'Dica: tire semanas inteiras de 7 dias.',
  'Léelo otra vez con calma: a veces la trampa está en las palabras.': 'Leia de novo com calma: às vezes a pegadinha está nas palavras.',

  /* história */
  '¿Qué pasó primero?': 'O que aconteceu primeiro?',
  '{e}: {y}.': '{e} {y}.',
  'Piensa: ¿había electricidad, imprenta o coches en esa época?': 'Pense: naquela época já existia eletricidade, livro impresso ou carro?',

  /* dinheiro e poupança */
  'Necesidad': 'Necessidade',
  'Capricho': 'Desejo',
  '¿{x} es una necesidad o un capricho?': '{x} é uma necessidade ou um desejo?',
  'Es una necesidad: la necesitamos para vivir bien.': 'É uma necessidade: precisamos disso para viver bem.',
  'Es un capricho: está bien tenerlo a veces, pero podemos vivir sin él.': 'É um desejo: é legal ter de vez em quando, mas dá para viver sem.',
  'Piensa: ¿podríamos vivir sin ello?': 'Pense: daria para viver sem isso?',
  'Quieres algo que cuesta {p}. Ahorras {s} cada semana. ¿Cuántas semanas necesitas?': 'Você quer uma coisa que custa {p}. Você guarda {s} toda semana. De quantas semanas você precisa?',
  '{p} entre {s} son {w} semanas.': '{p} dividido por {s} dá {w}: você precisa de {w} semanas.',
  'Divide el precio entre lo que ahorras cada semana.': 'Divida o preço pelo valor que você guarda por semana.',
  'Algo cuesta {p} y tiene un {d} % de descuento. ¿Cuánto pagas?': 'Uma coisa custa {p} e tem {d}% de desconto. Quanto você paga?',
  'El {d} % de {p} es {r}, así que pagas {pay}.': '{d}% de {p} dá {r}, então você paga {pay}.',
  'Primero calcula cuánto te descuentan y réstalo.': 'Primeiro calcule o valor do desconto e depois tire do preço.',
  'Compras algo de {p} y pagas con {b}. ¿Cuánto te devuelven?': 'Você compra uma coisa de {p} e paga com uma nota de {b}. Quanto você recebe de troco?',
  '{b} menos {p} son {c}.': '{b} menos {p} dá {c}.',
  'Cuenta desde el precio hasta lo que has pagado.': 'Conte a partir do preço até chegar ao valor que você pagou.',
  'Paquete de {n}': 'Pacote com {n}',
  'Un paquete de {n1} yogures cuesta {p1} y uno de {n2} cuesta {p2}. ¿Cuál es más barato por yogur?': 'Um pacote com {n1} iogurtes custa {p1} e um com {n2} custa {p2}. Qual sai mais barato por iogurte?',
  'Cada yogur cuesta {u1} en el pequeño y {u2} en el grande.': 'Cada iogurte custa {u1} no pacote pequeno e {u2} no grande.',
  'Divide cada precio entre el número de yogures.': 'Divida cada preço pelo número de iogurtes.',

  /* digitação */
  'Palabras cortas': 'Palavras curtas',
  'Palabras largas': 'Palavras longas',
  'Frases': 'Frases',
  'Palabra {i} de {n}': 'Palavra {i} de {n}',
  'Escribe aquí': 'Digite aqui',
  'Escribe la palabra que ves. Puedes usar el teclado o la pantalla.': 'Digite a palavra que você está vendo. Pode usar o teclado ou a tela.',
  '¡Terminado! {w} palabras por minuto y {e} fallos.': v=>`Pronto! ${v.w} ${v.w===1?'palavra':'palavras'} por minuto e ${v.e===0?'nenhum erro':v.e===1?'1 erro':`${v.e} erros`}.`,

  /* ---------- 56-idiomas.js: aprender outro idioma ---------- */
  'Comida': 'Comida',
  'En casa': 'Em casa',
  'El cuerpo': 'O corpo',
  'La ropa': 'As roupas',
  'Transportes': 'Transportes',
  'Frases para empezar': 'Primeiras frases',
  'Hola, gracias, ¿cómo te llamas?': 'Oi, obrigado, qual é o seu nome?',
  'Parejas de palabras': 'Pares de palavras',
  'Une el dibujo con su palabra': 'Junte cada desenho com sua palavra',
  'En {l}': 'Em {l}',
  'Escucha y toca': 'Ouça e toque',
  'Escucha. ¿Qué es?': 'Ouça. O que é?',
  '¡Sí! Es {n}.': 'Isso mesmo: {n}!',
  'No es esa. Toca la frase de arriba para oírla otra vez.': 'Não é essa. Toque na frase lá em cima para ouvir de novo.',
  '¿Cómo se dice «{x}» en {l}?': 'Como se diz “{x}” em {l}?',
  '¿Cómo se dice {x} en {l}?': 'Como se diz {x} em {l}?',
  'Se dice así:': 'É assim que se diz:',
  'Esa palabra es otra cosa. Prueba otra vez.': 'Essa palavra quer dizer outra coisa. Tente de novo.',
  'Escucha y toca el color': 'Ouça e toque na cor',
  '¡Sí! Es el {c}.': 'Isso! É o {c}.',
  'No es ese. Toca la frase de arriba para oírla otra vez.': 'Não é esse. Toque na frase lá em cima para ouvir de novo.',
  '¿Cómo se dice este color en {l}?': 'Como se diz esta cor em {l}?',
  'Ese es otro color. Prueba otra vez.': 'Essa é outra cor. Tente de novo.',
  'Escucha y toca el número': 'Ouça e toque no número',
  '¡Sí! Es el {n}.': 'Isso! É o {n}.',
  '¿Cuántas hay? Elige el número en {l}.': 'Quantos tem? Escolha o número em {l}.',
  'Hay {n}:': 'Tem {n}:',
  'Cuenta otra vez despacio.': 'Conte de novo, devagar.',
  '◀ Atrás': '◀ Voltar',
  '🔊 Escuchar': '🔊 Ouvir',
  '🐢 Despacio': '🐢 Devagar',
  'Siguiente ▶': 'Próxima ▶',
  'Escucha y repítelo en voz alta.': 'Ouça e repita em voz alta.',
  'Une cada dibujo con su palabra': 'Junte cada desenho com a sua palavra',
});

/* ---------- dados dos jogos para 11 e 12 anos ---------- */
LANGS.pt.data.DAYS=['segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado','domingo'];
/* [emoji, enigma, resposta, [outras opções], explicação]
   Nas adivinhas «O que é, o que é?» o emoji não pode entregar a resposta: por isso vai 🤔. */
LANGS.pt.data.RIDDLES=[
  ['🐑','Um fazendeiro tem 17 ovelhas. Todas fogem, menos 9. Quantas sobram?','9',['8','17','0'],'“Todas menos 9” quer dizer que 9 ficaram.'],
  ['📏','Ana é mais alta que Lucas, e Lucas é mais alto que Marta. Quem é a pessoa mais baixa?','Marta',['Ana','Lucas','Não dá para saber'],'Se Ana é mais alta que Lucas, e Lucas é mais alto que Marta, a pessoa mais baixa é Marta.'],
  ['📅','Quantos meses têm 28 dias?','Todos',['Um','Dois','Nenhum'],'Todos os meses têm pelo menos 28 dias.'],
  ['🏃','Numa corrida, você ultrapassa quem está em segundo lugar. Em que lugar você fica?','Segundo',['Primeiro','Terceiro','Último'],'Você fica no lugar dessa pessoa: agora você está em segundo.'],
  ['🧱','Um tijolo pesa 1 quilo mais meio tijolo. Quanto pesa um tijolo inteiro?','2 quilos',['1 quilo e meio','1 quilo','3 quilos'],'Se meio tijolo pesa 1 quilo, o tijolo inteiro pesa 2.'],
  ['🏭','Se 5 máquinas fazem 5 brinquedos em 5 minutos, quanto tempo 100 máquinas levam para fazer 100 brinquedos?','5 minutos',['100 minutos','20 minutos','1 minuto'],'Cada máquina leva 5 minutos para fazer um brinquedo, então 100 máquinas fazem 100 brinquedos em 5 minutos.'],
  ['🐸','Um sapo está no fundo de um poço de 10 metros. Todo dia ele sobe 3 metros e toda noite escorrega 2. Quantos dias ele leva para sair?','8',['10','7','5'],'Depois de 7 dias e 7 noites, ele subiu 7 metros. No oitavo dia, sobe mais 3 e sai.'],
  ['⚾','Um taco de beisebol e uma bola custam R$ 1,10 juntos. O taco custa R$ 1,00 a mais que a bola. Quanto custa a bola?','5 centavos',['10 centavos','1 centavo','1 real'],'Se a bola custa 5 centavos, o taco custa R$ 1,05, e os dois juntos custam R$ 1,10.'],
  ['👧','O pai de Maria tem cinco filhas: Nana, Nene, Nini, Nono e…','Maria',['Nunu','Nina','Nona'],'A quinta filha é a própria Maria.'],
  ['🎂','Tenho o dobro da idade do meu irmão, que tem 6 anos. Quantos anos vou ter quando ele tiver 10?','16',['20','14','12'],'Agora eu tenho 12. Daqui a 4 anos, vou ter 16.'],
  ['🍎','Há 3 maçãs na mesa e você pega 2. Quantas maçãs você tem?','2',['1','3','5'],'Você tem as 2 que pegou.'],
  ['🪶','O que pesa mais: um quilo de penas ou um quilo de ferro?','Os dois pesam igual',['As penas','O ferro','Depende do dia'],'Um quilo é um quilo, seja do que for.'],
  ['🐱','Se 3 gatos caçam 3 ratos em 3 minutos, quantos gatos são necessários para caçar 60 ratos em 30 minutos?','6',['20','60','3'],'Cada gato caça um rato a cada 3 minutos, ou seja, 10 ratos em 30 minutos. Para caçar 60, são necessários 6 gatos.'],
  ['🚆','Um trem elétrico vai para o norte e o vento sopra para o sul. Para onde vai a fumaça?','Não tem fumaça',['Para o sul','Para o norte','Para cima'],'Trens elétricos não soltam fumaça.'],
  ['👨‍👩‍👧‍👦','Quatro irmãos têm, cada um, uma irmã, e é a mesma irmã para todos. Quantos filhos há na família?','5',['8','4','6'],'Quatro meninos e uma menina: cinco filhos.'],
  ['➗','Divida 30 por meio e some 10. Qual é o resultado?','70',['25','40','50'],'Dividir por meio é o mesmo que multiplicar por 2: 30 dividido por meio dá 60, e mais 10 dá 70.'],
  ['🥚','Se um ovo leva 3 minutos para cozinhar, quanto tempo 3 ovos levam juntos na mesma panela?','3 minutos',['9 minutos','6 minutos','1 minuto'],'Os ovos cozinham todos ao mesmo tempo, então levam os mesmos 3 minutos.'],
  ['🪷','Umas vitórias-régias dobram de tamanho a cada dia. Em 20 dias, elas cobrem o lago inteiro. Em que dia cobriam a metade do lago?','No dia 19',['No dia 10','No dia 15','No dia 5'],'Se no dia 20 o lago está todo coberto e elas dobram a cada dia, no dia anterior cobriam a metade.'],
  ['🔔','Um relógio dá 6 badaladas em 5 segundos. Quantos segundos ele leva para dar 12?','11',['10','12','24'],'Entre 6 badaladas há 5 intervalos de 1 segundo. Entre 12 badaladas, há 11 intervalos.'],
  ['🧦','Numa gaveta escura há meias vermelhas e azuis. Quantas você precisa tirar, no mínimo, para ter certeza de pegar duas da mesma cor?','3',['2','4','10'],'Com 3 meias e só 2 cores, com certeza duas vão ser da mesma cor.'],
  ['🤔','O que é, o que é? Quanto mais se tira, maior fica.','O buraco',['A pedra','A sombra','O cabelo'],'Quanto mais terra você tira de um buraco, maior ele fica.'],
  ['🤔','O que é, o que é? Cai em pé e corre deitado.','A chuva',['A bola','O vento','A folha'],'A chuva cai do céu em pé e depois corre deitada pelo chão.'],
  ['🤔','O que é, o que é? Quanto mais seca, mais molhada fica.','A toalha',['O sol','O guarda-chuva','A areia'],'Quanto mais a toalha seca a gente, mais molhada ela fica.'],
  ['🤔','O que é, o que é? Tem cidades, mas não tem casas; tem rios, mas não tem água.','O mapa',['O deserto','A floresta','A ilha'],'No mapa aparecem cidades e rios, mas só desenhados.'],
  ['🤔','O que é, o que é? É seu, mas os outros usam muito mais do que você.','O seu nome',['A sua roupa','A sua casa','O seu lápis'],'As outras pessoas dizem o seu nome muito mais vezes do que você.'],
  ['🤔','O que é, o que é? Tem dentes, mas não morde.','O pente',['O cachorro','O tubarão','O jacaré'],'O pente tem dentes, mas não morde ninguém.']];
LANGS.pt.data.SCIENCE_QA=[
  ['💧','A que temperatura a água ferve ao nível do mar?','100 °C',['50 °C','0 °C','200 °C']],
  ['🧊','A que temperatura a água congela?','0 °C',['10 °C','−20 °C','100 °C']],
  ['♨️','Como se chama a passagem do estado líquido para o gasoso?','Evaporação',['Congelamento','Fusão','Condensação']],
  ['☁️','Como se chama a passagem do estado gasoso para o líquido?','Condensação',['Evaporação','Solidificação','Fusão']],
  ['🌿','Como se chama o processo em que as plantas produzem o próprio alimento usando a luz?','Fotossíntese',['Digestão','Respiração','Evaporação']],
  ['🌳','Que gás as plantas tiram do ar para fazer a fotossíntese?','Gás carbônico',['Oxigênio','Hélio','Hidrogênio']],
  ['❤️','Que órgão bombeia o sangue para o corpo todo?','O coração',['O fígado','Os pulmões','O estômago']],
  ['🫁','Com que órgãos nós respiramos?','Os pulmões',['Os rins','O coração','O estômago']],
  ['🦴','Mais ou menos quantos ossos tem uma pessoa adulta?','206',['50','1000','12']],
  ['🧲','Que material o ímã atrai?','O ferro',['A madeira','O plástico','O vidro']],
  ['⚡','Que material conduz bem a eletricidade?','O cobre',['A madeira','O plástico','A borracha']],
  ['🌍','Como se chama a camada de gases que envolve a Terra?','A atmosfera',['A crosta','O núcleo','O manto']],
  ['🌋','Como se chama a rocha derretida que sai de um vulcão?','Lava',['Areia','Granito','Gelo']],
  ['🔬','Qual é a menor unidade que forma todos os seres vivos?','A célula',['O órgão','O tecido','O osso']],
  ['☀️','Quanto tempo a luz do Sol leva para chegar à Terra?','Cerca de 8 minutos',['Um segundo','Um dia','Um ano']],
  ['🔊','O som consegue viajar pelo espaço vazio?','Não, ele precisa do ar ou de outro material',['Sim, mais rápido que a luz','Sim, do mesmo jeito que no ar','Só à noite']],
  ['🧪','Qual é a fórmula da água?','H₂O',['CO₂','O₂','NaCl']],
  ['🌬️','De que gás do ar nós precisamos para viver?','Oxigênio',['Gás carbônico','Hélio','Fumaça']],
  ['🍎','Que força faz as coisas caírem no chão?','A gravidade',['O magnetismo','A eletricidade','O vento']],
  ['🌡️','Com o que medimos a temperatura?','Com um termômetro',['Com uma balança','Com uma régua','Com um relógio']],
  ['🌈','O que é preciso para aparecer um arco-íris?','Luz do sol e gotas de água',['Só nuvens','Vento e areia','Neve']],
  ['🦠','Que remédios servem para combater infecções causadas por bactérias?','Os antibióticos',['Os curativos','As vitaminas','A água com sal']]];
/* [emoji, o que aconteceu (lido como «… em 1492.»), ano (negativo = antes de Cristo), aproximado] */
LANGS.pt.data.HISTORY=[
  ['✍️','A escrita foi inventada na Mesopotâmia',-3200,true],['🔺','A Grande Pirâmide de Gizé foi construída',-2560,true],
  ['🏛️','Os primeiros Jogos Olímpicos aconteceram na Grécia',-776,false],['🏟️','O Coliseu de Roma foi inaugurado',80,false],
  ['📖','Gutenberg criou sua máquina de imprimir livros',1450,true],['⛵','Cristóvão Colombo chegou à América',1492,false],
  ['🧭','Pedro Álvares Cabral chegou ao Brasil',1500,false],['🌍','Terminou a primeira viagem de volta ao mundo',1522,false],
  ['🏔️','Os incas construíram Machu Picchu',1450,true],['📚','Foi publicada a primeira parte de Dom Quixote',1605,false],
  ['🔭','Galileu observou as luas de Júpiter',1610,false],['💉','Edward Jenner criou a primeira vacina',1796,false],['🚂','O primeiro trem de passageiros começou a funcionar',1825,false],
  ['📜','O Brasil ficou independente de Portugal',1822,false],
  ['☎️','O telefone foi patenteado',1876,false],['✈️','Os irmãos Wright fizeram seu primeiro voo',1903,false],['🛩️','Santos-Dumont voou com o 14-Bis em Paris',1906,false],
  ['💊','Alexander Fleming descobriu a penicilina',1928,false],
  ['🕊️','A ONU aprovou a Declaração Universal dos Direitos Humanos',1948,false],['🛰️','O primeiro satélite artificial foi lançado',1957,false],
  ['🌕','O ser humano pisou na Lua pela primeira vez',1969,false],['🌐','Nasceu a World Wide Web',1991,false]];
LANGS.pt.data.YEAR=(y,approx)=>y<0?(approx?'por volta de ':'em ')+(-y)+' antes de Cristo':y<1000?(approx?'por volta do ano ':'no ano ')+y:(approx?'por volta de ':'em ')+y;
/* Dinheiro em reais: R$ 5, R$ 1,50, e os valores abaixo de 1 real em centavos (40 centavos), que a voz lê melhor. */
LANGS.pt.data.MONEY=v=>{if(v<1){const c=Math.round(v*100);return c===1?'1 centavo':`${c} centavos`;}
  return 'R$ '+v.toLocaleString('pt-BR',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2});};
LANGS.pt.data.NEEDS=[['🥛','o leite',true],['🧥','um casaco para o inverno',true],['💊','o remédio',true],['🍞','o pão',true],['👟','um par de sapatos para ir à escola',true],
  ['💧','a água',true],['🪥','a escova de dentes',true],['🎮','um videogame novo',false],['🍬','um pacote de balas',false],['🧸','mais um bichinho de pelúcia',false],
  ['🛹','um skate novo',false],['📱','um celular novo quando o seu ainda funciona',false],['🎈','um balão gigante',false]];
/* Como em espanhol: palavras curtas e frases sem acentos; algumas palavras longas têm acento. */
LANGS.pt.data.TYPING=[
  ['sol','mar','luz','casa','gato','mesa','lua','pato','rosa','nuvem','leite','bola','livro','verde','fruta','jogo','flor','peixe','bolo','sapo'],
  ['borboleta','elefante','escorregador','biblioteca','chocolate','computador','dinossauro','montanha','bicicleta','tempestade','cenoura','helicóptero','morcego','calendário','girassol'],
  ['o gato dorme','eu gosto de ler','o sol saiu cedo','a lua brilha','vamos ao parque','o mar tem peixes','eu tenho um cachorro','eu gosto de brincar','nossa casa tem jardim','vamos comer fruta']];

/* ---------- vocabulário e frases (uma criança que fala outro idioma aprende estas em português) ---------- */
LANGS.pt.data.VOCAB={'🐶':'cachorro','🐱':'gato','🐮':'vaca','🐷':'porco','🐴':'cavalo','🐑':'ovelha','🐔':'galinha','🦆':'pato','🐟':'peixe','🐦':'pássaro',
  '🐸':'sapo','🦁':'leão','🐘':'elefante','🐻':'urso','🐰':'coelho','🐭':'rato','🐵':'macaco','🦒':'girafa','🐢':'tartaruga','🐍':'cobra',
  '🍎':'maçã','🍌':'banana','🍓':'morango','🍊':'laranja','🍇':'uvas','🍉':'melancia','🍞':'pão','🧀':'queijo','🥛':'leite','🥚':'ovo',
  '🍦':'sorvete','🍪':'biscoito','🥕':'cenoura','🍅':'tomate','💧':'água','🍰':'bolo',
  '🏠':'casa','🚪':'porta','🪟':'janela','🛏️':'cama','🪑':'cadeira','📖':'livro','⚽':'bola','🧸':'ursinho','🥄':'colher','🛁':'banheira','⏰':'relógio','🖍️':'giz de cera',
  '👀':'olhos','👂':'orelha','👃':'nariz','👄':'boca','✋':'mão','🦶':'pé','🦷':'dente','💪':'braço',
  '👕':'camiseta','👖':'calça','👗':'vestido','🧦':'meias','👟':'tênis','🧢':'boné','🧥':'casaco','🧤':'luvas',
  '🚗':'carro','🚌':'ônibus','🚲':'bicicleta','🚂':'trem','✈️':'avião','🚀':'foguete','⛵':'barco','🚜':'trator',
  '☀️':'sol','🌙':'lua','⭐':'estrela','☁️':'nuvem','🌧️':'chuva','🌈':'arco-íris','🌳':'árvore','🌸':'flor','🌊':'mar','⛰️':'montanha'};
LANGS.pt.data.PHRASES={hola:'Oi',adios:'Tchau',buenosdias:'Bom dia',buenasnoches:'Boa noite',porfavor:'Por favor',gracias:'Obrigado',denada:'De nada',
  perdon:'Desculpa',comotellamas:'Qual é o seu nome?',mellamo:'Meu nome é Ana',cuantosanos:'Quantos anos você tem?',tengocinco:'Tenho cinco anos',
  comoestas:'Como você está?',estoybien:'Estou bem, obrigado',jugar:'Você quer brincar comigo?',tequiero:'Eu te amo',hambre:'Estou com fome',sed:'Estou com sede',
  bano:'Onde fica o banheiro?',nolose:'Não sei'};
