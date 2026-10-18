/* English: games in 57-actitudes.js (getting along, sharing, calming down and caring for others),
   plus the "Share the Playground" texts of 90-app.js and pagina.html. */
(()=>{
/* Pronouns for the pet texts: g is 'm' (he) or 'f' (she), as set in the PETS list at the end of this file. */
const he=v=>v.g==='f'?'she':'he';
const He=v=>v.g==='f'?'She':'He';

Object.assign(LANGS.en.t,{
  /* ---------- names on the game doors ---------- */
  '¿Qué harías tú?':'What would you do?',
  'Ayudar, compartir y hacer las paces':'Help, share and make friends again',
  'Reparte justo':'Share fairly',
  'Lo mismo para cada uno':'The same for everyone',
  'Respira conmigo':'Breathe with me',
  'Para estar tranquilos':'To feel calm',
  'Mi mascota':'My pet',
  'Dale de comer, juega y cuídala':'Feed it, play with it and look after it',

  /* what would you do? */
  '¿Qué otra cosa podrías hacer?':'What else could you do?',

  /* share fairly ({cosas} is a plural noun with "the": "the biscuits"; British maths says "share between") */
  'Prueba a dar una a cada amigo, por turnos, hasta que se acaben.':'Try giving one to each friend, taking turns, until there are none left.',
  'El niño tiene más que la niña. ¿Cuántas tiene que darle para que los dos tengan las mismas?':'The boy has more than the girl. How many must he give her so that they both have the same?',
  'Si le da {x}, los dos tienen {y}. ¡Así es justo!':"If he gives her {x}, they both have {y}. That's fair!",
  'Pista: cuenta cuántas tiene de más y reparte esa diferencia entre los dos.':'Hint: count how many extra he has, and split that difference between the two of them.',
  'Íbamos a repartir {cosas} entre {n} amigos, pero llega uno más. ¿Cuántas le tocan ahora a cada uno, a partes iguales?':'We were going to share {cosas} between {n} friends, but one more friend arrives. If we share them equally, how many does each friend get now?',
  'Ahora son {m} amigos: {k} para cada uno. ¡Siempre hay sitio para uno más!':"Now there are {m} friends: {k} each. There's always room for one more!",
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas sobran?':'Share {cosas} equally between {n} friends. How many are left over?',
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas le tocan a cada uno?':'Share {cosas} equally between {n} friends. How many does each friend get?',
  'Cada uno recibe {k} y sobra una. Se puede partir o guardar para luego.':"Each friend gets {k}, and there's one left over. You can split it or save it for later.",
  'Cada uno recibe {k} y sobran {r}. Se pueden guardar para luego.':'Each friend gets {k}, and there are {r} left over. You can save them for later.',
  '{k} para cada uno. ¡Así es justo!':"{k} for each friend. That's fair!",

  /* breathe with me */
  '🎈 Globo':'🎈 Balloon',
  'Coge aire por la nariz… el globo se hincha.':'Breathe in through your nose… the balloon gets bigger.',
  'Suelta el aire despacito por la boca… el globo se deshincha.':'Breathe out slowly through your mouth… the balloon gets smaller.',
  '🌸 Flor y vela':'🌸 Flower and candle',
  'Huele la flor despacito por la nariz.':'Smell the flower slowly through your nose.',
  'Sopla la vela muy despacito.':'Blow out the candle very slowly.',
  'Toca «Empezar» y respira conmigo.':'Tap “Start” and breathe with me.',
  'Empezar':'Start',
  'Aguanta un poquito…':'Hold it for a moment…',
  '¡Muy bien! Respirar despacio calma el cuerpo y la cabeza.':'Well done! Breathing slowly calms your body and your mind.',
  'Puedes hacerlo siempre que sientas nervios o enfado.':'You can do this whenever you feel nervous or cross.',

  /* my pet ({p} is "your puppy", {P} is "Your puppy"; the buttons are labels for screen readers) */
  'Dar de comer':'Feed',
  '{P} tiene hambre.':'{P} is hungry.',
  '¡Ñam, ñam! ¡Qué rico!':'Yum, yum! Delicious!',
  'Dar agua':'Give water',
  '{P} tiene sed.':'{P} is thirsty.',
  '¡Glu, glu! Ya no tiene sed.':v=>`Glug, glug! ${He(v)}'s not thirsty any more.`,
  'Jugar':'Play',
  '{P} quiere jugar.':'{P} wants to play.',
  '¡Qué divertido! Le encanta jugar contigo.':v=>`What fun! ${He(v)} loves playing with you.`,
  'Bañar':'Give a bath',
  '{P} necesita un baño.':'{P} needs a bath.',
  '¡Ahora huele muy bien!':v=>`Now ${he(v)} smells lovely!`,
  'Dormir':'Put to bed',
  '{P} tiene sueño.':'{P} is sleepy.',
  'Shhh… Ya ha descansado.':v=>`Shhh… ${He(v)} has had a good rest.`,
  'Dar mimos':'Give a cuddle',
  '{P} quiere mimos.':'{P} wants a cuddle.',
  'Le encantan tus mimos.':v=>`${He(v)} loves your cuddles.`,
  'Elige tu mascota':'Choose your pet',
  'Cambiar de mascota':'Change pet',
  '¡{P} está feliz! Cuidar de alguien es muy bonito.':'{P} is happy! Looking after someone is a lovely thing to do.',
  'Ahora no le apetece eso.':v=>`${He(v)} doesn't want that right now.`,
  '¡A {p} le encanta!':'{P} loves it!',
  '¡Hola! Soy {p}. ¿Me cuidas?':"Hello! I'm {p}. Will you look after me?",
  '¡{P} te ha echado de menos!':'{P} has missed you!',

  /* ---------- 90-app.js and pagina.html: sharing the site ---------- */
  'Compartir el Patio':'Share the Playground',
  'Si te gusta, compártelo con otras familias, el cole o tu asociación. Es gratis para todos.':'If you like it, share it with other families, your school or your community group. It is free for everyone.',
  '📤 Compartir el enlace':'📤 Share the link',
  '🔳 Enseñar el código QR':'🔳 Show the QR code',
  'Juegos educativos gratis para niños de 2 a 12 años, sin anuncios y sin registro.':'Free educational games for children aged 2 to 12, with no adverts and no sign-up.',
  'Enlace copiado. Pégalo donde quieras.':'Link copied. Paste it wherever you like.',
  'Escanéalo con la cámara del móvil para abrir el Patio.':'Scan it with your phone camera to open the Playground.',
  '¿Te gusta? Compártelo con otras familias desde ⚙️.':'Enjoying it? Share it with other families from ⚙️.',
});

/* ---------- what would you do? ----------
   e: picture; s: the situation; ok: [the kind answer, why]; no: two less kind answers, with what would happen.
   Answers are in the first person, short, and the same for boys and girls. */
LANGS.en.data.HARIAS=[
  {e:'😢',s:'A boy in your class is crying at playtime.',ok:["I go over and ask him what's wrong.",'When someone is sad, asking them about it helps them feel less alone.'],
    no:[['I laugh at him.','If we laugh at someone who is crying, they feel even worse.'],['I pretend not to see him.','If nobody takes any notice of him, he feels lonely.']]},
  {e:'🧍',s:"There's a new girl in your class. She's on her own because she doesn't know anyone yet.",ok:['I ask her to play with us.','Asking her makes her feel welcome. And you might make a new friend!'],
    no:[["I tell her she can't play.",'Leaving someone out makes them feel sad and lonely.'],['I walk away without saying anything.','If nobody talks to her, it will be very hard for her to make friends.']]},
  {e:'💥',s:'By accident, you break a glass at home.',ok:['I tell a grown-up and say sorry.','Telling the truth is brave, and then a grown-up can clear it up before anyone gets cut.'],
    no:[['I hide the pieces.',"Hidden pieces of glass could cut someone, and hiding them doesn't fix anything."],['I say my brother did it.',"If you blame someone else, a person who did nothing gets told off. That isn't fair."]]},
  {e:'🧸',s:'Your little brother wants to play with your toy.',ok:['We play together, or I let him have it for a while.','Sharing makes you both happy, and he will give it back afterwards.'],
    no:[['I snatch it away from him.','Snatching things can hurt, and it ends in a fight.'],["I shout that it's only mine.",'Shouting scares him and makes him sad. Calm words help you understand each other better.']]},
  {e:'😠',s:'A friend takes your ball and you get really cross.',ok:["I take a deep breath and tell him I didn't like that.",'Breathing helps you calm down, and using words helps the other person understand.'],
    no:[['I hit him.',"Hitting hurts and doesn't fix anything. You can use words to say you're cross."],['I break something of his.','Breaking his things would hurt him, and the problem would get even bigger.']]},
  {e:'🎨',s:"Your friend shows you her drawing, and you don't like it very much.",ok:['I tell her something I do like about it.','There is always something nice to say. Then she feels happy and wants to keep drawing.'],
    no:[["I tell her it's horrible.",'Saying unkind things hurts. You can be honest and kind at the same time.'],['I make fun of her drawing in front of everyone.','Being laughed at in front of other people is very embarrassing and sad.']]},
  {e:'👵',s:'An old lady drops the oranges out of her shopping bag.',ok:['I help her pick them up.','Helping people who need it makes the world a kinder place.'],
    no:[['I walk straight past.','If nobody helps, it will be very hard for her to pick them all up on her own.'],['I laugh and keep walking.','Laughing when someone has a problem makes them feel bad.']]},
  {e:'⚽',s:'Your team loses a match.',ok:['I say well done to the other team.','Being a good loser is what champions do. Next time, give it your all!'],
    no:[['I say they cheated.','Blaming people for no reason makes them cross and spoils the game.'],['I go off in a bad mood without saying goodbye.','Leaving like that spoils the fun. Losing sometimes is part of playing.']]},
  {e:'👛',s:'You find a purse in the park.',ok:['I give it to a grown-up so they can return it.','That way its owner can get it back. They are probably looking for it!'],
    no:[['I keep it.',"Keeping something that isn't ours is wrong: its owner will be worried."],['I throw it in the bin.','Then its owner could never get it back.']]},
  {e:'🗣️',s:'Some children are making fun of a boy because of the way he talks.',ok:['I stand by him and tell a grown-up.',"Someone who is being teased needs support. Telling a grown-up isn't telling tales: it's helping."],
    no:[['I laugh along with them.','Laughing along with the teasing makes him feel even more alone.'],["I tell him it's his own fault.","It's never his fault when others make fun of him. Everyone talks in their own way."]]},
  {e:'🧹',s:'When you finish playing, your bedroom is full of toys.',ok:['I tidy everything away.',"Tidying up looks after your things and helps at home. Tomorrow you'll find everything!"],
    no:[['I leave it for someone else to tidy.',"At home, everyone helps. If each of us tidies our own things, it's easier."],['I push everything under the bed.',"Then the toys get lost or broken. It's better to put everything in its place."]]},
  {e:'📘',s:"Your friend can't do a sum that you know how to do.",ok:['I show him how I do it.','Helping a friend to learn is a gift for both of you.'],
    no:[['I call him stupid.','Calling people names hurts. We all find some things harder to learn.'],["I say I won't help him.",'When we help each other, we all learn more.']]},
  {e:'🤫',s:'Someone asks you to keep a secret that makes you feel bad.',ok:['I tell a grown-up I trust.','Secrets that make us feel bad are not for keeping: we tell a grown-up we trust.'],
    no:[['I keep it, even though I feel sad.','Keeping something that worries you is a heavy thing to carry. Telling someone helps.'],['I pretend nothing is happening.',"Pretending doesn't make it go away. A grown-up can help you."]]},
  {e:'🐶',s:'You see a little dog with no water on a very hot day.',ok:['I tell a grown-up so they can give it some water.',"Animals feel hot and thirsty too. Looking after them is everyone's job."],
    no:[['I do nothing.','The little dog is having a hard time and needs help.'],['I tease it to make it bark.','Teasing animals scares them, and this dog is already having a hard time.']]},
  {e:'🍬',s:'There are three sweets and there are three of you.',ok:['We have one each.','Sharing equally is fair, and everyone is happy.'],
    no:[['I eat two.',"If you eat two, someone won't get one."],['I eat them all.','Then your friends would have none, and they would feel sad.']]},
  {e:'🛝',s:"There's a long queue for the slide.",ok:['I wait for my turn.','Waiting for your turn is fair: everyone wants to play.'],
    no:[['I push in at the front.',"Pushing in isn't fair on the children who've been waiting for ages."],['I shove people out of the way to go first.','Shoving can make someone fall and hurt themselves.']]},
  {e:'🗑️',s:'You see bits of paper dropped on the ground in the park.',ok:['I put them in the bin.','Then the park stays clean for everyone, animals too.'],
    no:[['I drop my sweet wrapper on the ground too.','Litter makes the park dirty and can hurt animals.'],['I leave them there and walk off.','If everyone helps a little, the park is always clean.']]},
  {e:'👟',s:'Someone helps you tie your shoelaces.',ok:['I say thank you.','Saying thank you makes the person who helped you feel good.'],
    no:[["I don't say anything.","If you don't say thank you, they might think you didn't like their help."],['I tell them they did it wrong.',"Even if it isn't perfect, they were trying to be kind."]]},
  {e:'😟',s:'You said something unkind to your friend, and now he is sad.',ok:['I say sorry.','Saying sorry helps to put things right. Everyone makes mistakes sometimes!'],
    no:[['I act as if nothing happened.',"If you don't talk about it, your friend will stay sad."],['I tell him he is making a fuss.',"His feelings matter. It's better to listen to him and say sorry."]]},
  {e:'🚌',s:'An old man gets on the bus, and there are no seats left.',ok:['I give him my seat.','Giving your seat to someone who needs it more is a really kind thing to do.'],
    no:[["I pretend I haven't seen him.",'If nobody notices him, he will have to stand for the whole journey.'],['I tell him to wait.',"It's hard for him to stand up while the bus is moving."]]}];

/* ---------- share fairly ----------
   Plural, with "the": "Share the biscuits equally between 3 friends." Only things that can be split in half
   (one may be left over), so no stickers here; and no 🍒 or 🍇, which show more than one. */
LANGS.en.data.SHARE_ITEMS=[{e:'🍪',n:'the biscuits'},{e:'🍓',n:'the strawberries'},{e:'🍎',n:'the apples'},{e:'🧁',n:'the cupcakes'},{e:'🍬',n:'the sweets'},{e:'🍊',n:'the oranges'}];

/* ---------- my pet ----------
   n: button label; p: "your …" in lower case; g: 'm' (he) or 'f' (she), used by the texts above. */
LANGS.en.data.PETS=[{e:'🐶',n:'Puppy',p:'your puppy',g:'m'},{e:'🐱',n:'Kitten',p:'your kitten',g:'f'},{e:'🐰',n:'Bunny',p:'your bunny',g:'m'},
  {e:'🐢',n:'Tortoise',p:'your tortoise',g:'f'},{e:'🐹',n:'Hamster',p:'your hamster',g:'m'},{e:'🐥',n:'Chick',p:'your chick',g:'f'}];
})();
