/* Português do Brasil: jogos criativos (30-creativos.js) e jogos de tabuleiro (40-mesa.js). */
Object.assign(LANGS.pt.t,{
  /* ----- nomes e descrições dos jogos ----- */
  'Globos':'Balões',
  'Explota los globos':'Estoure os balões',
  'Parejas':'Pares',
  'Encuentra las iguales':'Encontre as iguais',
  'Construir':'Construir',
  'Haz una torre':'Faça uma torre',
  'Colorear':'Colorir',
  'Pinta con los dedos':'Pinte com os dedos',
  'Diseña tu mundo':'Crie o seu mundo',
  'Espacio, mar, bosque…':'Espaço, mar, floresta…',
  'Inventa un cuento':'Invente uma história',
  'Imagina y sueña':'Imagine e sonhe',
  'Memoria':'Memória',
  'Seis parejas':'Seis pares',
  'Memoria experta':'Memória de craque',
  'Ocho parejas':'Oito pares',
  'Adivina el número':'Adivinhe o número',
  'Del 1 al 100':'De 1 a 100',
  'Tres en raya':'Jogo da velha',
  'Contra la máquina o en pareja':'Contra o computador ou em dupla',
  'Conecta 4':'Conecte 4',
  'Cuatro en línea':'Quatro em linha',
  'Damas':'Damas',
  'Salta y corona':'Pule e vire dama',
  'Ajedrez':'Xadrez',
  'Aprende y juega':'Aprenda e jogue',

  /* ----- colorir ----- */
  /* {x} é um nome de DRAWING_NAMES, com artigo: «Pinte a casa». */
  'Colorea {x}':'Pinte {x}',
  'Borrar':'Apagar',
  'Otro dibujo ➜':'Outro desenho ➜',
  'Elige un color y toca el dibujo':'Escolha uma cor e toque no desenho',

  /* ----- construir uma torre ----- */
  'Toca un color para poner un bloque':'Toque em uma cor para colocar um bloco',
  '¡Derribar!':'Derrubar!',
  'Vamos a construir una torre. Toca un color.':'Vamos construir uma torre. Toque em uma cor.',
  'Bloques: {n}':'Blocos: {n}',
  '¡Qué torre tan alta! ¡Vamos a derribarla!':'Que torre mais alta! Vamos derrubar!',

  /* ----- crie o seu mundo ----- */
  'Espacio':'Espaço',
  'Mar':'Mar',
  'Bosque':'Floresta',
  'Granja':'Fazenda',
  'Ciudad':'Cidade',
  '📒 Mis pegatinas':'📒 Minhas figurinhas',
  'Borrar todo':'Apagar tudo',
  'Toca los dibujos para ponerlos en tu mundo. Para moverlos, arrástralos o tócalos y luego toca el sitio nuevo.':
    'Toque nos desenhos para colocá-los no seu mundo. Para mudar um desenho de lugar, arraste ou toque nele e depois toque no lugar novo.',

  /* ----- invente uma história ----- */
  'Escuchar otra vez':'Ouvir de novo',
  'Otro cuento ➜':'Outra história ➜',

  /* ----- memória ----- */
  'Encuentra las parejas':'Encontre os pares',
  'Carta':'Carta',
  'Encuentra las parejas iguales':'Encontre os pares iguais',
  '¡Las encontraste todas!':'Você achou todos os pares!',
  'Otra vez':'De novo',
  '¡Pareja!':'Um par!',
  '¡Muy bien!':'Muito bem!',
  '¡Iguales!':'Iguais!',

  /* ----- balões ----- */
  'Globos: {n}':'Balões: {n}',
  '¡Explota los globos!':'Estoure os balões!',
  /* {c} é o nome de uma cor de COLORS: «balão vermelho». */
  'globo {c}':'balão {c}',

  /* ----- adivinhe o número ----- */
  'Pienso un número del 1 al 100':'Estou pensando em um número de 1 a 100',
  'Probar':'Tentar',
  'Pienso un número del 1 al 100. ¿Cuál es?':'Estou pensando em um número de 1 a 100. Qual é?',
  'Escribe un número del 1 al 100':'Digite um número de 1 a 100',
  '¡Era el {n}! Lo lograste en {t} intento.':v=>+v.t===1?`Era o ${v.n}! Você acertou de primeira!`:`Era o ${v.n}! Você acertou em ${v.t} tentativas.`,
  '¡Era el {n}! Lo lograste en {t} intentos.':v=>+v.t===1?`Era o ${v.n}! Você acertou de primeira!`:`Era o ${v.n}! Você acertou em ${v.t} tentativas.`,
  'Jugar otra vez':'Jogar de novo',
  'Es mayor que {v}':'É maior que {v}',
  'Es menor que {v}':'É menor que {v}',

  /* ----- jogos de tabuleiro: controles comuns ----- */
  '🤖 Contra la máquina':'🤖 Contra o computador',
  '👫 Dos jugadores':'👫 Dois jogadores',
  '↻ Nueva partida':'↻ Nova partida',
  'Fácil':'Fácil',
  'Normal':'Normal',
  'Difícil':'Difícil',
  '¡Has ganado!':'Você ganhou!',
  'Gana la máquina. ¡Otra!':'O computador ganhou. Vamos jogar mais uma!',
  'La máquina piensa…':'O computador está pensando…',
  'Te toca':'Sua vez',
  'Empate':'Deu empate!',

  /* ----- jogo da velha ----- */
  'Tú eres la X. ¡Empiezas!':'Você é o X. Você começa!',
  'Le toca a la X':'Vez do X',
  'Le toca a la O':'Vez do O',
  'Tú eres la equis. Empiezas tú.':'Você é o xis. Você começa.',
  'Empieza la equis':'O xis começa',
  'Casilla':'Casa',
  '¡Gana la X!':'Vitória do X!',
  '¡Gana la O!':'Vitória do O!',
  'Empate. ¡Muy bien jugado!':'Deu empate. Muito bem jogado!',

  /* ----- conecte 4 ----- */
  'Tú tienes las rojas. ¡Empiezas!':'Você joga com as vermelhas. Você começa!',
  'Empiezan las rojas':'As vermelhas começam',
  'Junta cuatro fichas en línea':'Junte quatro peças em linha',
  'Columna':'Coluna',
  '¡Ganan las rojas!':'As vermelhas ganharam!',
  '¡Ganan las amarillas!':'As amarelas ganharam!',
  'Les toca a las rojas':'Vez das vermelhas',
  'Les toca a las amarillas':'Vez das amarelas',

  /* ----- damas (e as brancas e as pretas do xadrez) ----- */
  'Tú llevas las blancas. ¡Empiezas!':'Você joga com as brancas. Você começa!',
  'Empiezan las blancas':'As brancas começam',
  'Si puedes comer, tienes que hacerlo. Llega al otro lado para coronar una dama 👑.':
    'Se você puder comer uma peça, tem que comer. Chegue ao outro lado para virar dama 👑.',
  'casilla':'casa',
  '¡Tienes que comer!':'Você tem que comer uma peça!',
  'Esa ficha no se puede mover':'Essa peça não pode se mover',
  '¡Dama!':'Virou dama!',
  '¡Sigue comiendo!':'Coma mais uma peça!',
  '¡Ganan las blancas!':'As brancas ganharam!',
  '¡Ganan las negras!':'As pretas ganharam!',
  'Les toca a las blancas':'Vez das brancas',
  'Les toca a las negras':'Vez das pretas',

  /* ----- xadrez ----- */
  'Toca una pieza para ver adónde puede moverse.':'Toque em uma peça para ver aonde ela pode ir.',
  /* {p} é um nome de CHESS.names, como «a torre»: «a torre branca», «o rei preto».
     (O xadrez em português usa CHESS.label, mais abaixo; estas ficam de reserva.) */
  '{p} blanco':v=>v.p+(/^a /i.test(v.p)?' branca':' branco'),
  '{p} negro':v=>v.p+(/^a /i.test(v.p)?' preta':' preto'),
  'casilla vacía':'casa vazia',
  'Esa pieza es del otro equipo':'Essa peça é do outro time',
  'Ahí no puede ir':'Ela não pode ir para lá',
  '¡Jaque mate! ¡Has ganado!':'Xeque-mate! Você ganhou!',
  'Jaque mate. Gana la máquina.':'Xeque-mate. O computador ganhou.',
  '¡Jaque mate! Ganan las blancas.':'Xeque-mate! As brancas ganharam.',
  '¡Jaque mate! Ganan las negras.':'Xeque-mate! As pretas ganharam.',
  'Tablas: no quedan movimientos.':'Empate: não sobrou nenhuma jogada.',
  'Tablas: solo quedan los reyes.':'Empate: só sobraram os reis.',
  '¡Jaque!':'Xeque!',
});

/* Cores da paleta e nomes dos desenhos para colorir, na mesma ordem que em espanhol. */
LANGS.pt.data.PAINT_NAMES=['vermelho','laranja','amarelo','verde','azul','roxo','rosa','marrom','preto','branco'];
LANGS.pt.data.DRAWING_NAMES=['a casa','a flor','o foguete','o peixe','o carro','o gato'];

/* Invente uma história. heroes: [emoji, com «um/uma», com «o/a»]; places respondem «Onde o nosso herói mora?»
   (por isso já trazem «no», «num» ou «numa»); objects: [emoji, com «um/uma»].
   tell() faz a concordância: «o/a» do objeto, «do/da» do herói, «nele/nela» e «Juntos/Juntas». */
LANGS.pt.data.STORY={
  ask:['Quem é o herói da nossa história?','Onde o nosso herói mora?','O que o nosso herói encontra?'],
  heroes:[['🐉','um dragão','o dragão'],['🧚','uma fada','a fada'],['🤖','um robô','o robô'],['🦄','um unicórnio','o unicórnio'],['🐢','uma tartaruga','a tartaruga'],['🐻','um ursinho','o ursinho']],
  places:[['🌌','no espaço'],['🌊','no fundo do mar'],['🏰','num castelo de nuvens'],['🌳','numa floresta encantada'],['🏝️','numa ilha de doces']],
  objects:[['⭐','uma estrela mágica'],['🎈','um balão gigante'],['🗝️','uma chave dourada'],['🍪','um biscoito que falava'],['🎨','um pincel que pintava sonhos']],
  tell(h,p,o){const [,hi,hd]=h,[,pl]=p,[,ob]=o,
      fo=/^uma /.test(ob),fh=/^a /.test(hd),
      the=ob.replace(/^uma /,'a ').replace(/^um /,'o '),
      dhd=hd.replace(/^o /,'do ').replace(/^a /,'da ');
    return [
      `Era uma vez ${hi} que vivia ${pl}.`,
      pick([`Certa manhã, enquanto brincava, ${hd} encontrou ${ob}.`,`Num dia muito tranquilo, ${ob} apareceu bem na frente ${dhd}.`]),
      pick([`${cap(the)} brilhava tanto que tudo ao redor ficou cheio de cores.`,`De repente, ${the} começou a dar pulinhos e a cantar uma música muito divertida.`,`Quando ${hd} tocou ${fo?'nela':'nele'}, sentiu umas cócegas mágicas na barriga.`]),
      pick([`${fh&&fo?'Juntas':'Juntos'} viajaram até o lugar mais alto do céu, onde as nuvens têm gosto de algodão-doce.`,'Pelo caminho, conheceram muitos amigos novos que queriam brincar.','Encontraram um tesouro escondido, cheio de risadas e abraços.','Ajudaram um passarinho perdido a voltar para a sua família.']),
      pick([`No fim do dia, ${hd} voltou para casa, fechou os olhos e sonhou com novas aventuras. Fim.`,`E desde aquele dia, ${hd} sabe que os sonhos se realizam quando são compartilhados. Fim.`])];}
};

/* Xadrez: nomes das peças (ditos ao tocar em uma peça), dicas para aprender como cada peça se move,
   a palavra do empate e label(), que faz a cor concordar com a peça: «a torre branca», «o rei preto». */
LANGS.pt.data.CHESS={names:{p:'o peão',n:'o cavalo',b:'o bispo',r:'a torre',q:'a rainha',k:'o rei'},
  tips:{p:'O peão anda uma casa para a frente (duas no seu primeiro movimento) e come na diagonal.',
  n:'O cavalo pula em forma de L e pode passar por cima de outras peças.',
  b:'O bispo anda na diagonal quantas casas quiser.',
  r:'A torre anda em linha reta: para cima, para baixo, para a esquerda ou para a direita.',
  q:'A rainha é a peça mais poderosa: anda como a torre e como o bispo.',
  k:'O rei anda uma casa em qualquer direção. É preciso protegê-lo!'},
  draw:'Empate',
  label:(t,white)=>{const n=LANGS.pt.data.CHESS.names[t],f=/^a /.test(n);return n+' '+(white?(f?'branca':'branco'):(f?'preta':'preto'));}};
