/* Français : jeux de 57-actitudes.js (vivre ensemble, partager, se calmer, prendre soin d'un animal)
   et la partie « Partager la Cour de Récré » de l'espace parents (90-app.js, pagina.html).
   On tutoie l'enfant et on vouvoie les adultes. Espace insécable avant ? ! : ; et à l'intérieur des « ». */
(()=>{
/* Animal : v.p = « ton petit chien », v.P = « Ton petit chien », v.g = 'm' ou 'f' (voir PETS plus bas). */
const il=v=>v.g==='f'?'Elle':'Il';

Object.assign(LANGS.fr.t,{
  /* ---------- noms sur les portes des jeux ---------- */
  '¿Qué harías tú?':'Et toi, que ferais-tu ?',
  'Ayudar, compartir y hacer las paces':'Aider, partager et faire la paix',
  'Reparte justo':'À parts égales',
  'Lo mismo para cada uno':'Autant pour chacun',
  'Respira conmigo':'Respire avec moi',
  'Para estar tranquilos':'Pour retrouver son calme',
  'Mi mascota':'Mon petit animal',
  'Dale de comer, juega y cuídala':'Donne-lui à manger, joue avec lui et prends-en soin',

  /* et toi, que ferais-tu ? */
  '¿Qué otra cosa podrías hacer?':'Que pourrais-tu faire d\'autre ?',

  /* à parts égales : {cosas} porte son article (« les fraises ») ; toutes les choses à partager sont féminines,
     pour que « il en reste une » et « en donner une » soient toujours justes */
  'Prueba a dar una a cada amigo, por turnos, hasta que se acaben.':'Essaie d\'en donner une à chaque ami, chacun son tour, jusqu\'à ce qu\'il n\'en reste plus.',
  'El niño tiene más que la niña. ¿Cuántas tiene que darle para que los dos tengan las mismas?':'Le garçon en a plus que la fille. Combien doit-il lui en donner pour qu\'ils en aient autant tous les deux ?',
  'Si le da {x}, los dos tienen {y}. ¡Así es justo!':'S\'il lui en donne {x}, ils en ont {y} chacun. Comme ça, c\'est juste !',
  'Pista: cuenta cuántas tiene de más y reparte esa diferencia entre los dos.':'Indice : compte combien il en a de plus, puis partage cette différence en deux.',
  'Íbamos a repartir {cosas} entre {n} amigos, pero llega uno más. ¿Cuántas le tocan ahora a cada uno, a partes iguales?':'On allait partager {cosas} entre {n} amis, mais un autre ami arrive. Combien chacun en reçoit-il maintenant, à parts égales ?',
  'Ahora son {m} amigos: {k} para cada uno. ¡Siempre hay sitio para uno más!':'Maintenant, ils sont {m} : {k} pour chacun. Il y a toujours de la place pour un ami de plus !',
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas sobran?':'Partage {cosas} entre {n} amis, à parts égales. Combien en reste-t-il ?',
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas le tocan a cada uno?':'Partage {cosas} entre {n} amis, à parts égales. Combien chacun en reçoit-il ?',
  'Cada uno recibe {k} y sobra una. Se puede partir o guardar para luego.':'Chacun en reçoit {k} et il en reste une. On peut la couper en morceaux ou la garder pour plus tard.',
  'Cada uno recibe {k} y sobran {r}. Se pueden guardar para luego.':'Chacun en reçoit {k} et il en reste {r}. On peut les garder pour plus tard.',
  '{k} para cada uno. ¡Así es justo!':'{k} pour chacun. Comme ça, c\'est juste !',

  /* respire avec moi */
  '🎈 Globo':'🎈 Ballon',
  'Coge aire por la nariz… el globo se hincha.':'Inspire par le nez… le ballon se gonfle.',
  'Suelta el aire despacito por la boca… el globo se deshincha.':'Souffle tout doucement par la bouche… le ballon se dégonfle.',
  '🌸 Flor y vela':'🌸 Fleur et bougie',
  'Huele la flor despacito por la nariz.':'Sens la fleur tout doucement par le nez.',
  'Sopla la vela muy despacito.':'Souffle sur la bougie, tout doucement.',
  'Toca «Empezar» y respira conmigo.':'Touche « Commencer » et respire avec moi.',
  'Empezar':'Commencer',
  'Aguanta un poquito…':'Retiens ton souffle un petit peu…',
  '¡Muy bien! Respirar despacio calma el cuerpo y la cabeza.':'Bravo ! Respirer lentement calme le corps et la tête.',
  'Puedes hacerlo siempre que sientas nervios o enfado.':'Tu peux le faire chaque fois que tu sens du stress ou de la colère.',

  /* mon petit animal */
  'Dar de comer':'Donner à manger',
  '{P} tiene hambre.':'{P} a faim.',
  '¡Ñam, ñam! ¡Qué rico!':'Miam, miam ! C\'est trop bon !',
  'Dar agua':'Donner de l\'eau',
  '{P} tiene sed.':'{P} a soif.',
  '¡Glu, glu! Ya no tiene sed.':v=>`Glou, glou ! ${il(v)} n'a plus soif.`,
  'Jugar':'Jouer',
  '{P} quiere jugar.':'{P} veut jouer.',
  '¡Qué divertido! Le encanta jugar contigo.':v=>`Comme c'est amusant ! ${il(v)} adore jouer avec toi.`,
  'Bañar':'Donner le bain',
  '{P} necesita un baño.':'{P} a besoin d\'un bain.',
  '¡Ahora huele muy bien!':v=>`Maintenant, ${il(v).toLowerCase()} sent très bon !`,
  'Dormir':'Dormir',
  '{P} tiene sueño.':'{P} a sommeil.',
  'Shhh… Ya ha descansado.':v=>`Chut… ${il(v)} a fait une bonne sieste.`,
  'Dar mimos':'Faire un câlin',
  '{P} quiere mimos.':'{P} veut un câlin.',
  'Le encantan tus mimos.':v=>`${il(v)} adore tes câlins.`,
  'Elige tu mascota':'Choisis ton petit animal',
  'Cambiar de mascota':'Changer d\'animal',
  '¡{P} está feliz! Cuidar de alguien es muy bonito.':v=>`${v.P} est ${v.g==='f'?'contente':'content'} ! Prendre soin de quelqu'un, c'est très beau.`,
  'Ahora no le apetece eso.':'Pour l\'instant, ça ne lui dit rien.',
  '¡A {p} le encanta!':'{P} adore ça !',
  '¡Hola! Soy {p}. ¿Me cuidas?':'Coucou ! Je suis {p}. Tu t\'occupes de moi ?',
  '¡{P} te ha echado de menos!':'Tu as manqué à {p} !',

  /* ---------- 90-app.js et pagina.html : partager le site (pour les adultes, on vouvoie) ---------- */
  'Compartir el Patio':'Partager la Cour de Récré',
  'Si te gusta, compártelo con otras familias, el cole o tu asociación. Es gratis para todos.':'Si la Cour de Récré vous plaît, partagez-la avec d\'autres familles, l\'école ou votre association. C\'est gratuit pour tout le monde.',
  '📤 Compartir el enlace':'📤 Partager le lien',
  '🔳 Enseñar el código QR':'🔳 Afficher le QR code',
  'Juegos educativos gratis para niños de 2 a 12 años, sin anuncios y sin registro.':'Des jeux éducatifs gratuits pour les enfants de 2 à 12 ans, sans publicité et sans inscription.',
  'Enlace copiado. Pégalo donde quieras.':'Lien copié. Collez-le où vous voulez.',
  'Escanéalo con la cámara del móvil para abrir el Patio.':'Scannez-le avec l\'appareil photo de votre téléphone pour ouvrir la Cour de Récré.',
  '¿Te gusta? Compártelo con otras familias desde ⚙️.':'Ça vous plaît ? Partagez la Cour de Récré avec d\'autres familles depuis ⚙️.',
});

/* ---------- et toi, que ferais-tu ? ----------
   Mêmes situations, dans le même ordre, que DATA.es.HARIAS. Les réponses sont à la première personne et sans accord
   de genre (« Je pars de mauvaise humeur », pas « Je suis fâché »), pour aller aux garçons comme aux filles. */
LANGS.fr.data.HARIAS=[
  {e:'😢',s:'Un copain pleure pendant la récré.',ok:['Je vais le voir et je lui demande ce qui ne va pas.','Quand quelqu\'un est triste, lui poser la question l\'aide à se sentir moins seul.'],
    no:[['Je me moque de lui.','Si on se moque de quelqu\'un qui pleure, il se sent encore plus mal.'],['Je fais comme si je ne le voyais pas.','Si personne ne s\'occupe de lui, il se sent tout seul.']]},
  {e:'🧍',s:'Il y a une nouvelle dans la classe, et elle est toute seule parce qu\'elle ne connaît personne.',ok:['Je l\'invite à jouer avec nous.','L\'inviter l\'aide à se sentir bienvenue. Et peut-être que tu auras une nouvelle amie !'],
    no:[['Je lui dis qu\'elle ne peut pas jouer.','Être mise à l\'écart la rend triste, et elle se sent seule.'],['Je m\'éloigne sans rien dire.','Si personne ne lui parle, ce sera très difficile pour elle de se faire des amis.']]},
  {e:'💥',s:'Sans faire exprès, tu casses un verre à la maison.',ok:['Je le dis et je demande pardon.','Dire la vérité, c\'est courageux. Et comme ça, un adulte peut ramasser les morceaux sans que personne ne se coupe.'],
    no:[['Je cache les morceaux.','Des morceaux cachés peuvent couper quelqu\'un, et les cacher ne répare rien.'],['Je dis que c\'est mon frère qui l\'a cassé.','Si tu accuses quelqu\'un d\'autre, c\'est lui qui sera puni alors qu\'il n\'a rien fait. Ce n\'est pas juste.']]},
  {e:'🧸',s:'Ton petit frère veut jouer avec ton jouet.',ok:['On joue ensemble, ou je le lui prête un moment.','Partager rend heureux tous les deux. Et ensuite, il te le rendra.'],
    no:[['Je le lui arrache des mains.','Arracher les choses des mains peut faire mal, et ça finit en dispute.'],['Je lui crie que c\'est à moi, rien qu\'à moi.','Crier lui fait peur et le rend triste. Avec des mots calmes, vous vous comprendrez mieux.']]},
  {e:'😠',s:'Un copain te prend ton ballon, et tu te mets très en colère.',ok:['Je respire profondément et je lui dis que ça ne me plaît pas.','Respirer aide à se calmer, et le dire avec des mots aide l\'autre à comprendre.'],
    no:[['Je le tape.','Taper fait mal et ne règle rien. La colère, on peut la dire avec des mots.'],['Je casse un de ses jouets.','Casser ses affaires lui ferait de la peine, et le problème deviendrait encore plus gros.']]},
  {e:'🎨',s:'Ton amie te montre son dessin, et tu ne l\'aimes pas beaucoup.',ok:['Je lui dis ce qui me plaît dans son dessin.','Il y a toujours quelque chose de joli à dire. Comme ça, elle est contente et elle a envie de continuer à dessiner.'],
    no:[['Je lui dis qu\'il est horrible.','Dire des choses méchantes fait de la peine. On peut dire la vérité avec gentillesse.'],['Je me moque de son dessin devant tout le monde.','Si on se moque d\'elle devant tout le monde, elle aura très honte et elle sera triste.']]},
  {e:'👵',s:'Une vieille dame fait tomber les oranges de son sac.',ok:['Je l\'aide à les ramasser.','Aider ceux qui en ont besoin rend le monde plus gentil.'],
    no:[['Je passe mon chemin.','Si personne ne l\'aide, ce sera très difficile pour elle de tout ramasser seule.'],['Je rigole et je continue à marcher.','Rire quand quelqu\'un a un problème, ça lui fait de la peine.']]},
  {e:'⚽',s:'Ton équipe perd un match.',ok:['Je félicite l\'autre équipe.','Savoir perdre, c\'est ça, l\'esprit des champions. La prochaine fois, on donnera tout !'],
    no:[['Je dis qu\'ils ont triché.','Accuser sans raison fâche les autres et gâche le jeu.'],['Je pars de mauvaise humeur sans dire au revoir.','Partir comme ça gâche le plaisir. Perdre, parfois, ça fait partie du jeu.']]},
  {e:'👛',s:'Tu trouves un porte-monnaie au parc.',ok:['Je le donne à un adulte pour qu\'il le rende.','Comme ça, son propriétaire pourra le récupérer. Il le cherche sûrement !'],
    no:[['Je le garde.','Garder ce qui ne nous appartient pas, ça ne se fait pas : son propriétaire doit s\'inquiéter.'],['Je le jette à la poubelle.','Comme ça, son propriétaire ne pourrait jamais le retrouver.']]},
  {e:'🗣️',s:'Des enfants se moquent d\'un autre à cause de sa façon de parler.',ok:['Je me mets à côté de lui et je préviens un adulte.','Celui dont on se moque a besoin de soutien. Le dire à un adulte, ce n\'est pas rapporter : c\'est aider.'],
    no:[['Je rigole avec eux.','Rire avec ceux qui se moquent, ça le fait se sentir encore plus seul.'],['Je lui dis que c\'est de sa faute.','Ce n\'est jamais la faute de celui dont on se moque. Chacun parle à sa façon.']]},
  {e:'🧹',s:'Quand tu as fini de jouer, ta chambre est pleine de jouets.',ok:['Je range tout.','Ranger, c\'est prendre soin de tes affaires et aider à la maison. Demain, tu retrouveras tout !'],
    no:[['Je laisse les autres ranger.','À la maison, tout le monde aide. Si chacun range ses affaires, c\'est plus facile.'],['Je mets tout sous le lit.','Comme ça, les jouets se perdent ou se cassent. C\'est mieux de mettre chaque chose à sa place.']]},
  {e:'📘',s:'Ton copain ne comprend pas un exercice que toi, tu sais faire.',ok:['Je lui explique comment je fais.','Aider un ami à apprendre, c\'est un cadeau pour vous deux.'],
    no:[['Je lui dis qu\'il est bête.','Les insultes font mal. Tout le monde a des choses plus difficiles à apprendre.'],['Je lui dis que je ne vais pas l\'aider.','Quand on s\'entraide, tout le monde apprend mieux.']]},
  {e:'🤫',s:'Quelqu\'un te demande de garder un secret qui te met mal à l\'aise.',ok:['J\'en parle à un adulte de confiance.','Les secrets qui nous font du mal, on ne les garde pas : on les raconte à un adulte de confiance.'],
    no:[['Je le garde pour moi, même si ça me rend triste.','Garder pour soi quelque chose qui inquiète, c\'est très lourd. En parler, ça aide.'],['Je fais comme si de rien n\'était.','Faire comme si de rien n\'était ne fait pas disparaître le problème. Un adulte peut t\'aider.']]},
  {e:'🐶',s:'Tu vois un petit chien sans eau, un jour où il fait très chaud.',ok:['Je préviens un adulte pour qu\'il lui donne de l\'eau.','Les animaux aussi ont chaud et soif. Prendre soin d\'eux, c\'est l\'affaire de tous.'],
    no:[['Je ne fais rien.','Le petit chien souffre, et il a besoin d\'aide.'],['Je l\'embête pour qu\'il aboie.','Embêter les animaux leur fait peur, et lui, il souffre déjà.']]},
  {e:'🍬',s:'Il y a trois bonbons et vous êtes trois amis.',ok:['Un pour chacun.','Partager à parts égales, c\'est juste, et tout le monde est content.'],
    no:[['J\'en mange deux.','Si tu en manges deux, un de tes amis n\'aura pas le sien.'],['Je les mange tous.','Comme ça, tes amis n\'auraient rien, et ils seraient tristes.']]},
  {e:'🛝',s:'Il y a une longue file d\'attente pour le toboggan.',ok:['J\'attends mon tour.','Attendre son tour, c\'est juste : tout le monde veut jouer.'],
    no:[['Je passe devant tout le monde.','Passer devant, ce n\'est pas juste pour ceux qui attendent depuis longtemps.'],['Je pousse pour monter plus vite.','Pousser peut faire tomber quelqu\'un, et il pourrait se faire mal.']]},
  {e:'🗑️',s:'Tu vois des papiers par terre dans le parc.',ok:['Je les jette à la poubelle.','Comme ça, le parc reste propre pour tout le monde, et aussi pour les animaux.'],
    no:[['Je jette aussi mon papier de bonbon par terre.','Les déchets par terre salissent le parc et peuvent faire du mal aux animaux.'],['Je les laisse là et je m\'en vais.','Si chacun aide un peu, le parc reste toujours propre.']]},
  {e:'👟',s:'Quelqu\'un t\'aide à faire tes lacets.',ok:['Je dis merci.','Dire merci fait plaisir à la personne qui t\'aide.'],
    no:[['Je ne dis rien.','Si tu ne dis pas merci, on pourrait croire que son aide ne t\'a pas plu.'],['Je dis que c\'est mal fait.','Même si ce n\'est pas parfait, c\'était fait avec gentillesse.']]},
  {e:'😟',s:'Tu as dit quelque chose de méchant à ton copain, et maintenant il est triste.',ok:['Je lui demande pardon.','Demander pardon aide à arranger les choses. Tout le monde se trompe un jour !'],
    no:[['Je fais comme s\'il ne s\'était rien passé.','Si vous n\'en parlez pas, ton copain restera triste.'],['Je lui dis qu\'il exagère.','Ce qu\'il ressent est important. Mieux vaut l\'écouter et lui demander pardon.']]},
  {e:'🚌',s:'Dans le bus, un papi monte et il n\'y a plus de place assise.',ok:['Je lui laisse ma place.','Laisser sa place à quelqu\'un qui en a plus besoin, c\'est un très joli geste.'],
    no:[['Je fais semblant de ne pas le voir.','Si personne ne fait attention à lui, il devra rester debout pendant tout le trajet.'],['Je lui dis d\'attendre.','Pour lui, c\'est difficile de rester debout quand le bus roule.']]}];

/* ---------- à parts égales ----------
   Au pluriel, avec l'article (« les fraises »). Toutes féminines, pour que « il en reste une » soit toujours juste.
   Une seule chose par dessin (pas de 🍒 ni de 🍇), pour bien compter. */
LANGS.fr.data.SHARE_ITEMS=[{e:'🍓',n:'les fraises'},{e:'🍎',n:'les pommes'},{e:'🍊',n:'les clémentines'},{e:'🧇',n:'les gaufres'},{e:'🍭',n:'les sucettes'},{e:'🍐',n:'les poires'}];

/* ---------- mon petit animal ----------
   n : le nom sur le bouton ; p : avec le possessif, en minuscule ; g : le genre, pour l'accord (il/elle, content/contente).
   Pour 🐱 on dit « chaton » (masculin). */
LANGS.fr.data.PETS=[{e:'🐶',n:'Petit chien',p:'ton petit chien',g:'m'},{e:'🐱',n:'Chaton',p:'ton chaton',g:'m'},{e:'🐰',n:'Petit lapin',p:'ton petit lapin',g:'m'},
  {e:'🐢',n:'Tortue',p:'ta tortue',g:'f'},{e:'🐹',n:'Hamster',p:'ton hamster',g:'m'},{e:'🐥',n:'Poussin',p:'ton poussin',g:'m'}];
})();
