/* Français : jeux créatifs (30-creativos.js) et jeux de société (40-mesa.js). */
Object.assign(LANGS.fr.t,{
  /* ----- noms et descriptions des jeux ----- */
  'Globos':'Ballons',
  'Explota los globos':'Éclate les ballons',
  'Parejas':'Paires',
  'Encuentra las iguales':'Trouve les cartes pareilles',
  'Construir':'Construire',
  'Haz una torre':'Fais une tour',
  'Colorear':'Coloriage',
  'Pinta con los dedos':'Peins avec tes doigts',
  'Diseña tu mundo':'Crée ton monde',
  'Espacio, mar, bosque…':'Espace, mer, forêt…',
  'Inventa un cuento':'Invente une histoire',
  'Imagina y sueña':'Imagine et rêve',
  'Memoria':'Mémoire',
  'Seis parejas':'Six paires',
  'Memoria experta':'Super mémoire',
  'Ocho parejas':'Huit paires',
  'Adivina el número':'Devine le nombre',
  'Del 1 al 100':'De 1 à 100',
  'Tres en raya':'Morpion',
  'Contra la máquina o en pareja':'Contre l\'ordinateur ou à deux',
  'Conecta 4':'Puissance 4',
  'Cuatro en línea':'Quatre à la suite',
  'Damas':'Dames',
  'Salta y corona':'Saute et va à dame',
  'Ajedrez':'Échecs',
  'Aprende y juega':'Apprends et joue',

  /* ----- coloriage ----- */
  'Colorea {x}':'Colorie {x}',
  'Borrar':'Effacer',
  'Otro dibujo ➜':'Un autre dessin ➜',
  'Elige un color y toca el dibujo':'Choisis une couleur et touche le dessin',

  /* ----- construire une tour ----- */
  'Toca un color para poner un bloque':'Touche une couleur pour poser un bloc',
  '¡Derribar!':'Tout renverser !',
  'Vamos a construir una torre. Toca un color.':'On va construire une tour. Touche une couleur.',
  'Bloques: {n}':'Blocs : {n}',
  '¡Qué torre tan alta! ¡Vamos a derribarla!':'Quelle grande tour ! Allez, on la renverse !',

  /* ----- crée ton monde ----- */
  'Espacio':'Espace',
  'Mar':'Mer',
  'Bosque':'Forêt',
  'Granja':'Ferme',
  'Ciudad':'Ville',
  '📒 Mis pegatinas':'📒 Mes autocollants',
  'Borrar todo':'Tout effacer',
  'Toca los dibujos para ponerlos en tu mundo. Para moverlos, arrástralos o tócalos y luego toca el sitio nuevo.':
    'Touche les dessins pour les mettre dans ton monde. Pour en déplacer un, fais-le glisser, ou touche-le puis touche sa nouvelle place.',

  /* ----- invente une histoire ----- */
  'Escuchar otra vez':'Réécouter',
  'Otro cuento ➜':'Une autre histoire ➜',

  /* ----- mémoire ----- */
  'Encuentra las parejas':'Trouve les paires',
  'Carta':'Carte',
  'Encuentra las parejas iguales':'Trouve les paires de cartes pareilles',
  '¡Las encontraste todas!':'Tu les as toutes trouvées !',
  'Otra vez':'Rejouer',
  '¡Pareja!':'Une paire !',
  '¡Muy bien!':'Très bien !',
  '¡Iguales!':'Pareilles !',

  /* ----- ballons ----- */
  'Globos: {n}':'Ballons : {n}',
  '¡Explota los globos!':'Éclate les ballons !',
  /* {c} est un nom de couleur de COLORS, au masculin (ballon rouge, ballon vert) */
  'globo {c}':'ballon {c}',

  /* ----- devine le nombre ----- */
  'Pienso un número del 1 al 100':'Je pense à un nombre entre 1 et 100',
  'Probar':'Essayer',
  'Pienso un número del 1 al 100. ¿Cuál es?':'Je pense à un nombre entre 1 et 100. Devine lequel !',
  'Escribe un número del 1 al 100':'Écris un nombre entre 1 et 100',
  '¡Era el {n}! Lo lograste en {t} intento.':v=>+v.t===1?`C'était le ${v.n} ! Tu as trouvé du premier coup !`:`C'était le ${v.n} ! Tu as trouvé en ${v.t} essais.`,
  '¡Era el {n}! Lo lograste en {t} intentos.':v=>+v.t===1?`C'était le ${v.n} ! Tu as trouvé du premier coup !`:`C'était le ${v.n} ! Tu as trouvé en ${v.t} essais.`,
  'Jugar otra vez':'Rejouer',
  'Es mayor que {v}':'C\'est plus grand que {v}',
  'Es menor que {v}':'C\'est plus petit que {v}',

  /* ----- jeux de société : commandes communes ----- */
  '🤖 Contra la máquina':'🤖 Contre l\'ordinateur',
  '👫 Dos jugadores':'👫 Deux joueurs',
  '↻ Nueva partida':'↻ Nouvelle partie',
  'Fácil':'Facile',
  'Normal':'Normal',
  'Difícil':'Difficile',
  '¡Has ganado!':'Tu as gagné !',
  'Gana la máquina. ¡Otra!':'L\'ordinateur a gagné. On en refait une !',
  'La máquina piensa…':'L\'ordinateur réfléchit…',
  'Te toca':'À toi de jouer',
  'Empate':'Match nul.',

  /* ----- morpion ----- */
  'Tú eres la X. ¡Empiezas!':'Tu joues les X. Tu commences !',
  'Le toca a la X':'Au tour des X',
  'Le toca a la O':'Au tour des O',
  'Tú eres la equis. Empiezas tú.':'Tu joues les croix. C\'est toi qui commences.',
  'Empieza la equis':'Les croix commencent.',
  'Casilla':'Case',
  '¡Gana la X!':'Les X gagnent !',
  '¡Gana la O!':'Les O gagnent !',
  'Empate. ¡Muy bien jugado!':'Match nul. Bien joué !',

  /* ----- puissance 4 ----- */
  'Tú tienes las rojas. ¡Empiezas!':'Tu as les jetons rouges. Tu commences !',
  'Empiezan las rojas':'Les rouges commencent',
  'Junta cuatro fichas en línea':'Aligne quatre jetons',
  'Columna':'Colonne',
  '¡Ganan las rojas!':'Les rouges gagnent !',
  '¡Ganan las amarillas!':'Les jaunes gagnent !',
  'Les toca a las rojas':'Au tour des rouges',
  'Les toca a las amarillas':'Au tour des jaunes',

  /* ----- dames (et les blancs et les noirs des échecs) ----- */
  'Tú llevas las blancas. ¡Empiezas!':'Tu joues les blancs. Tu commences !',
  'Empiezan las blancas':'Les blancs commencent.',
  'Si puedes comer, tienes que hacerlo. Llega al otro lado para coronar una dama 👑.':
    'Si tu peux prendre un pion, tu dois le faire. Arrive de l\'autre côté pour faire une dame 👑.',
  'casilla':'case',
  '¡Tienes que comer!':'Tu dois prendre !',
  'Esa ficha no se puede mover':'Ce pion ne peut pas bouger',
  '¡Dama!':'Dame !',
  '¡Sigue comiendo!':'Prends encore !',
  '¡Ganan las blancas!':'Les blancs gagnent !',
  '¡Ganan las negras!':'Les noirs gagnent !',
  'Les toca a las blancas':'Au tour des blancs',
  'Les toca a las negras':'Au tour des noirs',

  /* ----- échecs ----- */
  'Toca una pieza para ver adónde puede moverse.':'Touche une pièce pour voir où elle peut aller.',
  /* {p} est un nom de pièce de CHESS.names, comme « la tour » : « la tour blanche ».
     (En français, les échecs utilisent CHESS.label, plus bas ; ces deux-là restent en réserve.) */
  '{p} blanco':v=>v.p+(/^la /i.test(v.p)?' blanche':' blanc'),
  '{p} negro':v=>v.p+(/^la /i.test(v.p)?' noire':' noir'),
  'casilla vacía':'case vide',
  'Esa pieza es del otro equipo':'Cette pièce est à l\'autre équipe',
  'Ahí no puede ir':'Elle ne peut pas aller là',
  '¡Jaque mate! ¡Has ganado!':'Échec et mat ! Tu as gagné !',
  'Jaque mate. Gana la máquina.':'Échec et mat. L\'ordinateur a gagné.',
  '¡Jaque mate! Ganan las blancas.':'Échec et mat ! Les blancs gagnent.',
  '¡Jaque mate! Ganan las negras.':'Échec et mat ! Les noirs gagnent.',
  'Tablas: no quedan movimientos.':'Pat ! Plus aucun coup n\'est possible : partie nulle.',
  'Tablas: solo quedan los reyes.':'Partie nulle : il ne reste que les deux rois.',
  '¡Jaque!':'Échec !',
});

/* Couleurs de la palette et noms des dessins à colorier, dans le même ordre qu'en espagnol. */
LANGS.fr.data.PAINT_NAMES=['rouge','orange','jaune','vert','bleu','violet','rose','marron','noir','blanc'];
LANGS.fr.data.DRAWING_NAMES=['la maison','la fleur','la fusée','le poisson','la voiture','le chat'];

/* Invente une histoire. heroes : [emoji, avec « un/une », avec « le/la »] ; places répondent à « Où vit notre héros ? »
   (elles portent donc leur « dans », « au » ou « sur ») ; objects : [emoji, avec « un/une »].
   tell() fait les accords : « le/la/l' » de l'objet, « apparu/apparue », « l'a touché/touchée »,
   « rentré/rentrée » pour le héros, et « ils/elles » quand le héros et l'objet sont tous les deux féminins. */
LANGS.fr.data.STORY={
  ask:['Qui est le héros de notre histoire ?','Où vit notre héros ?','Que trouve notre héros ?'],
  heroes:[['🐉','un dragon','le dragon'],['🧚','une fée','la fée'],['🤖','un robot','le robot'],['🦄','une licorne','la licorne'],['🐢','une tortue','la tortue'],['🐻','un petit ours','le petit ours']],
  places:[['🌌','dans l\'espace'],['🌊','au fond de la mer'],['🏰','dans un château de nuages'],['🌳','dans une forêt enchantée'],['🏝️','sur une île en bonbons']],
  objects:[['⭐','une étoile magique'],['🎈','un ballon géant'],['🗝️','une clé dorée'],['🍪','un biscuit qui parlait'],['🎨','un pinceau qui peignait les rêves']],
  tell(h,p,o){const [,hi,hd]=h,[,pl]=p,[,ob]=o,
      fh=/^une /.test(hi),fo=/^une /.test(ob),e=fo?'e':'',
      rest=ob.replace(/^une? /,''),
      the=/^[aeiouéèê]/i.test(rest)?'l\''+rest:(fo?'la ':'le ')+rest,
      they=fh&&fo?'elles':'ils';
    return [
      `Il était une fois ${hi} qui vivait ${pl}.`,
      pick([`Un matin, en jouant, ${hd} a trouvé ${ob}.`,`Un jour tout tranquille, ${ob} est apparu${e} juste devant ${hd}.`]),
      pick([`${cap(the)} brillait si fort que tout autour s'est rempli des couleurs de l'arc-en-ciel.`,`Tout à coup, ${the} s'est mis${e} à sautiller et à chanter une chanson très rigolote.`,`${cap(hd)} l'a touché${e} tout doucement et a senti des chatouilles magiques dans son ventre.`]),
      pick([`Ensemble, ${they} sont mont${fh&&fo?'ées':'és'} tout là-haut, là où les nuages ont un goût de barbe à papa.`,`En chemin, ${they} ont rencontré plein de nouveaux amis qui voulaient jouer.`,`${cap(they)} ont trouvé un trésor caché, rempli de rires et de câlins.`,`${cap(they)} ont aidé un petit oiseau perdu à retrouver sa famille.`]),
      pick([`À la fin de la journée, ${hd} est rentré${fh?'e':''} à la maison, a fermé les yeux et a rêvé de nouvelles aventures. Fin.`,`Et depuis ce jour, ${hd} sait que les rêves se réalisent quand on les partage. Fin.`])];}
};

/* Échecs : noms des pièces (dits quand on touche une pièce), conseils pour apprendre comment chaque pièce se déplace,
   le mot pour la partie nulle et label(), qui accorde la couleur avec la pièce : « la tour blanche », « le roi noir ». */
LANGS.fr.data.CHESS={names:{p:'le pion',n:'le cavalier',b:'le fou',r:'la tour',q:'la dame',k:'le roi'},
  tips:{p:'Le pion avance d\'une case (de deux cases à son tout premier déplacement) et il prend en diagonale.',
  n:'Le cavalier saute en forme de L et il peut passer par-dessus les autres pièces.',
  b:'Le fou se déplace en diagonale, d\'autant de cases qu\'il veut.',
  r:'La tour se déplace en ligne droite : vers le haut, vers le bas, à gauche ou à droite.',
  q:'La dame (on l\'appelle aussi la reine) est la pièce la plus puissante : elle se déplace comme la tour et comme le fou.',
  k:'Le roi se déplace d\'une case dans n\'importe quelle direction. Il faut bien le protéger !'},
  draw:'Partie nulle.',
  label:(t,white)=>{const n=LANGS.fr.data.CHESS.names[t],f=/^la /.test(n);return n+' '+(white?(f?'blanche':'blanc'):(f?'noire':'noir'));}};
