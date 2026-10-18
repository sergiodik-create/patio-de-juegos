/* English: creative games (30-creativos.js) and board games (40-mesa.js). */
Object.assign(LANGS.en.t,{
  /* ----- game names and descriptions ----- */
  'Globos':'Balloons',
  'Explota los globos':'Pop the balloons',
  'Parejas':'Pairs',
  'Encuentra las iguales':'Find the ones that match',
  'Construir':'Build',
  'Haz una torre':'Make a tower',
  'Colorear':'Colouring',
  'Pinta con los dedos':'Paint with your finger',
  'Diseña tu mundo':'Design your world',
  'Espacio, mar, bosque…':'Space, sea, forest…',
  'Inventa un cuento':'Make up a story',
  'Imagina y sueña':'Imagine and dream',
  'Memoria':'Memory',
  'Seis parejas':'Six pairs',
  'Memoria experta':'Memory master',
  'Ocho parejas':'Eight pairs',
  'Adivina el número':'Guess the number',
  'Del 1 al 100':'From 1 to 100',
  'Tres en raya':'Noughts and crosses',
  'Contra la máquina o en pareja':'Play the computer or a friend',
  'Conecta 4':'Connect 4',
  'Cuatro en línea':'Four in a row',
  'Damas':'Draughts',
  'Salta y corona':'Jump and be crowned',
  'Ajedrez':'Chess',
  'Aprende y juega':'Learn and play',

  /* ----- colouring ----- */
  'Colorea {x}':'Colour in {x}',
  'Borrar':'Rub out',
  'Otro dibujo ➜':'Another picture ➜',
  'Elige un color y toca el dibujo':'Choose a colour, then tap the picture',

  /* ----- build a tower ----- */
  'Toca un color para poner un bloque':'Tap a colour to add a block',
  '¡Derribar!':'Knock it down!',
  'Vamos a construir una torre. Toca un color.':'Let\'s build a tower. Tap a colour.',
  'Bloques: {n}':'Blocks: {n}',
  '¡Qué torre tan alta! ¡Vamos a derribarla!':'What a tall tower! Let\'s knock it down!',

  /* ----- design your world ----- */
  'Espacio':'Space',
  'Mar':'Sea',
  'Bosque':'Forest',
  'Granja':'Farm',
  'Ciudad':'Town',
  '📒 Mis pegatinas':'📒 My stickers',
  'Borrar todo':'Clear it all',
  'Toca los dibujos para ponerlos en tu mundo. Para moverlos, arrástralos o tócalos y luego toca el sitio nuevo.':
    'Tap the pictures to put them in your world. To move one, drag it, or tap it and then tap its new spot.',

  /* ----- story maker ----- */
  'Escuchar otra vez':'Listen again',
  'Otro cuento ➜':'Another story ➜',

  /* ----- memory ----- */
  'Encuentra las parejas':'Find the pairs',
  'Carta':'Card',
  'Encuentra las parejas iguales':'Find the matching pairs',
  '¡Las encontraste todas!':'You found them all!',
  'Otra vez':'Play again',
  '¡Pareja!':'A pair!',
  '¡Muy bien!':'Well done!',
  '¡Iguales!':'They match!',

  /* ----- balloons ----- */
  'Globos: {n}':'Balloons: {n}',
  '¡Explota los globos!':'Pop the balloons!',
  'globo {c}':'{c} balloon',

  /* ----- guess the number ----- */
  'Pienso un número del 1 al 100':'I\'m thinking of a number from 1 to 100',
  'Probar':'Try it',
  'Pienso un número del 1 al 100. ¿Cuál es?':'I\'m thinking of a number from 1 to 100. Can you guess it?',
  'Escribe un número del 1 al 100':'Type a number from 1 to 100',
  '¡Era el {n}! Lo lograste en {t} intento.':v=>+v.t===1?`It was ${v.n}! You got it first time!`:`It was ${v.n}! You got it in ${v.t} tries.`,
  '¡Era el {n}! Lo lograste en {t} intentos.':v=>+v.t===1?`It was ${v.n}! You got it first time!`:`It was ${v.n}! You got it in ${v.t} tries.`,
  'Jugar otra vez':'Play again',
  'Es mayor que {v}':'My number is bigger than {v}',
  'Es menor que {v}':'My number is smaller than {v}',

  /* ----- board games: shared controls ----- */
  '🤖 Contra la máquina':'🤖 Against the computer',
  '👫 Dos jugadores':'👫 Two players',
  '↻ Nueva partida':'↻ New game',
  'Fácil':'Easy',
  'Normal':'Normal',
  'Difícil':'Hard',
  '¡Has ganado!':'You win!',
  'Gana la máquina. ¡Otra!':'The computer wins. Let\'s play again!',
  'La máquina piensa…':'The computer is thinking…',
  'Te toca':'Your turn',
  'Empate':'It\'s a draw.',

  /* ----- noughts and crosses ----- */
  'Tú eres la X. ¡Empiezas!':'You are crosses. You go first!',
  'Le toca a la X':'Crosses, your turn',
  'Le toca a la O':'Noughts, your turn',
  'Tú eres la equis. Empiezas tú.':'You are crosses. You go first.',
  'Empieza la equis':'Crosses go first.',
  'Casilla':'Square',
  '¡Gana la X!':'Crosses win!',
  '¡Gana la O!':'Noughts win!',
  'Empate. ¡Muy bien jugado!':'It\'s a draw. Well played!',

  /* ----- connect 4 ----- */
  'Tú tienes las rojas. ¡Empiezas!':'You are red. You go first!',
  'Empiezan las rojas':'Red goes first',
  'Junta cuatro fichas en línea':'Get four counters in a row',
  'Columna':'Column',
  '¡Ganan las rojas!':'Red wins!',
  '¡Ganan las amarillas!':'Yellow wins!',
  'Les toca a las rojas':'Red, your turn',
  'Les toca a las amarillas':'Yellow, your turn',

  /* ----- draughts (and white and black for chess) ----- */
  'Tú llevas las blancas. ¡Empiezas!':'You are white. You go first!',
  'Empiezan las blancas':'White goes first.',
  'Si puedes comer, tienes que hacerlo. Llega al otro lado para coronar una dama 👑.':
    'If you can jump over a piece, you have to. Reach the other side to be crowned a king 👑.',
  'casilla':'square',
  '¡Tienes que comer!':'You have to jump!',
  'Esa ficha no se puede mover':'That piece cannot move',
  '¡Dama!':'A new king!',
  '¡Sigue comiendo!':'Keep jumping!',
  '¡Ganan las blancas!':'White wins!',
  '¡Ganan las negras!':'Black wins!',
  'Les toca a las blancas':'White, your turn',
  'Les toca a las negras':'Black, your turn',

  /* ----- chess ----- */
  'Toca una pieza para ver adónde puede moverse.':'Tap a piece to see where it can move.',
  /* {p} is a piece name from CHESS.names, such as «the knight»: «the white knight». */
  '{p} blanco':v=>/^the /i.test(v.p)?v.p.replace(/^the /i,'the white '):`white ${v.p}`,
  '{p} negro':v=>/^the /i.test(v.p)?v.p.replace(/^the /i,'the black '):`black ${v.p}`,
  'casilla vacía':'empty square',
  'Esa pieza es del otro equipo':'That piece is on the other team',
  'Ahí no puede ir':'It can\'t go there',
  '¡Jaque mate! ¡Has ganado!':'Checkmate! You win!',
  'Jaque mate. Gana la máquina.':'Checkmate. The computer wins.',
  '¡Jaque mate! Ganan las blancas.':'Checkmate! White wins.',
  '¡Jaque mate! Ganan las negras.':'Checkmate! Black wins.',
  'Tablas: no quedan movimientos.':'Stalemate! There are no moves left, so it\'s a draw.',
  'Tablas: solo quedan los reyes.':'It\'s a draw. Only the two kings are left.',
  '¡Jaque!':'Check!',
});

/* Colours of the paint box and names of the colouring pictures, in the same order as in Spanish. */
LANGS.en.data.PAINT_NAMES=['red','orange','yellow','green','blue','purple','pink','brown','black','white'];
LANGS.en.data.DRAWING_NAMES=['the house','the flower','the rocket','the fish','the car','the cat'];

/* Story maker. heroes: [emoji, with «a», with «the»]; places answer «Where does our hero live?»
   (so they carry their own «in», «on» or «under»); objects: [emoji, with «a» or «an»]. */
LANGS.en.data.STORY={
  ask:['Who is our hero?','Where does our hero live?','What does our hero find?'],
  heroes:[['🐉','a dragon','the dragon'],['🧚','a fairy','the fairy'],['🤖','a robot','the robot'],['🦄','a unicorn','the unicorn'],['🐢','a turtle','the turtle'],['🐻','a little bear','the little bear']],
  places:[['🌌','in outer space'],['🌊','deep under the sea'],['🏰','in a castle in the clouds'],['🌳','in an enchanted forest'],['🏝️','on an island made of sweets']],
  objects:[['⭐','a magic star'],['🎈','a giant balloon'],['🗝️','a golden key'],['🍪','a talking biscuit'],['🎨','a paintbrush that painted dreams']],
  tell(h,p,o){const [,hi,hd]=h,[,pl]=p,[,ob]=o,the=ob.replace(/^an? /,'the ');
    return [
      `Once upon a time, there was ${hi} who lived ${pl}.`,
      pick([`One morning, while playing, ${hd} found ${ob}.`,`One very quiet day, ${ob} appeared right in front of ${hd}.`]),
      pick([`${cap(the)} shone so brightly that everything around it lit up in rainbow colours.`,`All of a sudden, ${the} began to hop about and sing a very funny song.`,`${cap(hd)} touched it gently and felt a magic tickle from head to toe.`]),
      pick(['Together they travelled up and up, to a place where the clouds taste of candyfloss.','Along the way, they met lots of new friends who wanted to play.','They found a hidden treasure, full of laughter and cuddles.','They helped a little lost bird to find its way home to its family.']),
      pick([`At the end of the day, ${hd} went home, snuggled up in bed and dreamt of new adventures. The end.`,`And ever since that day, ${hd} has known that dreams come true when we share them. The end.`])];}
};

/* Chess: piece names (said aloud when a piece is tapped), tips for learning how each piece moves,
   and the word for a draw. */
LANGS.en.data.CHESS={names:{p:'the pawn',n:'the knight',b:'the bishop',r:'the rook',q:'the queen',k:'the king'},
  tips:{p:'The pawn moves forward one square, or two squares on its very first move. It captures diagonally.',
  n:'The knight jumps in the shape of an L, and it can jump over other pieces.',
  b:'The bishop moves diagonally, as many squares as it likes.',
  r:'The rook moves in a straight line: up, down, left or right.',
  q:'The queen is the most powerful piece. It moves like the rook and like the bishop.',
  k:'The king moves one square in any direction. You must keep the king safe!'},
  draw:'It\'s a draw.'};
