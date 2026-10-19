/* Português do Brasil: jogos de atitudes (57-actitudes.js) e o bloco "Compartilhar o Pátio" (90-app.js e pagina.html). */
(()=>{
/* Ajudante só deste arquivo: o pronome do bichinho conforme o gênero de PETS ("ele" ou "ela"). */
const ele=v=>v.g===`f`?`ela`:`ele`;
const Ele=v=>v.g===`f`?`Ela`:`Ele`;

Object.assign(LANGS.pt.t,{
  /* ---------- nomes nas portas dos jogos ---------- */
  '¿Qué harías tú?':'O que você faria?',
  'Ayudar, compartir y hacer las paces':'Ajudar, dividir e fazer as pazes',
  'Reparte justo':'Divida certinho',
  'Lo mismo para cada uno':'O mesmo para cada um',
  'Respira conmigo':'Respire comigo',
  'Para estar tranquilos':'Para se acalmar',
  'Mi mascota':'Meu bichinho',
  'Dale de comer, juega y cuídala':'Dê comida, brinque e cuide dele',

  /* o que você faria? (a situação vem antes da pergunta) */
  '¿Qué otra cosa podrías hacer?':'O que mais você poderia fazer?',

  /* divida certinho: as coisas de SHARE_ITEMS são todas masculinas ("os biscoitos"), para que "Quantos…?" e "um" sirvam sempre */
  'Prueba a dar una a cada amigo, por turnos, hasta que se acaben.':'Tente dar um para cada amigo, em rodadas, até acabarem.',
  'El niño tiene más que la niña. ¿Cuántas tiene que darle para que los dos tengan las mismas?':'O menino tem mais do que a menina. Quantos ele precisa dar para ela, para os dois ficarem com a mesma quantidade?',
  'Si le da {x}, los dos tienen {y}. ¡Así es justo!':'Se ele der {x}, os dois ficam com {y}. Assim fica justo!',
  'Pista: cuenta cuántas tiene de más y reparte esa diferencia entre los dos.':'Dica: conte quantos ele tem a mais e divida essa diferença entre os dois.',
  'Íbamos a repartir {cosas} entre {n} amigos, pero llega uno más. ¿Cuántas le tocan ahora a cada uno, a partes iguales?':'Íamos dividir {cosas} entre {n} amigos, mas chegou mais um. Dividindo em partes iguais, quantos cada um ganha agora?',
  'Ahora son {m} amigos: {k} para cada uno. ¡Siempre hay sitio para uno más!':'Agora são {m} amigos: {k} para cada um. Sempre cabe mais um!',
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas sobran?':'Divida {cosas} entre {n} amigos, em partes iguais. Quantos sobram?',
  'Reparte {cosas} entre {n} amigos, a partes iguales. ¿Cuántas le tocan a cada uno?':'Divida {cosas} entre {n} amigos, em partes iguais. Quantos cada um ganha?',
  'Cada uno recibe {k} y sobra una. Se puede partir o guardar para luego.':'Cada um recebe {k} e sobra um. Dá para partir em pedacinhos ou guardar para depois.',
  'Cada uno recibe {k} y sobran {r}. Se pueden guardar para luego.':'Cada um recebe {k} e sobram {r}. Dá para guardar para depois.',
  '{k} para cada uno. ¡Así es justo!':'{k} para cada um. Assim fica justo!',

  /* respire comigo */
  '🎈 Globo':'🎈 Balão',
  'Coge aire por la nariz… el globo se hincha.':'Puxe o ar pelo nariz… o balão vai enchendo.',
  'Suelta el aire despacito por la boca… el globo se deshincha.':'Solte o ar devagarinho pela boca… o balão vai murchando.',
  '🌸 Flor y vela':'🌸 Flor e vela',
  'Huele la flor despacito por la nariz.':'Cheire a flor devagarinho, pelo nariz.',
  'Sopla la vela muy despacito.':'Sopre a vela bem devagarinho.',
  'Toca «Empezar» y respira conmigo.':'Toque em “Começar” e respire comigo.',
  'Empezar':'Começar',
  'Aguanta un poquito…':'Segure o ar um pouquinho…',
  '¡Muy bien! Respirar despacio calma el cuerpo y la cabeza.':'Muito bem! Respirar devagar acalma o corpo e a cabeça.',
  'Puedes hacerlo siempre que sientas nervios o enfado.':'Você pode fazer isso sempre que bater um nervoso ou uma raiva.',

  /* meu bichinho: {P} e {p} são "Seu cachorrinho" / "seu cachorrinho"; v.g é o gênero do bichinho */
  'Dar de comer':'Dar comida',
  '{P} tiene hambre.':'{P} está com fome.',
  '¡Ñam, ñam! ¡Qué rico!':'Nham, nham! Que delícia!',
  'Dar agua':'Dar água',
  '{P} tiene sed.':'{P} está com sede.',
  '¡Glu, glu! Ya no tiene sed.':'Glu, glu! Pronto, a sede passou.',
  'Jugar':'Brincar',
  '{P} quiere jugar.':'{P} quer brincar.',
  '¡Qué divertido! Le encanta jugar contigo.':v=>`Que divertido! ${Ele(v)} adora brincar com você.`,
  'Bañar':'Dar banho',
  '{P} necesita un baño.':'{P} precisa de um banho.',
  '¡Ahora huele muy bien!':v=>`Agora ${ele(v)} está ${v.g===`f`?`cheirosinha`:`cheirosinho`}!`,
  'Dormir':'Dormir',
  '{P} tiene sueño.':'{P} está com sono.',
  'Shhh… Ya ha descansado.':'Shhh… Pronto, já descansou.',
  'Dar mimos':'Fazer carinho',
  '{P} quiere mimos.':'{P} quer carinho.',
  'Le encantan tus mimos.':v=>`${Ele(v)} adora o seu carinho.`,
  'Elige tu mascota':'Escolha o seu bichinho',
  'Cambiar de mascota':'Trocar de bichinho',
  '¡{P} está feliz! Cuidar de alguien es muy bonito.':'{P} está feliz! Cuidar de alguém é muito bonito.',
  'Ahora no le apetece eso.':'Agora não é hora disso.',
  '¡A {p} le encanta!':'{P} adorou!',
  '¡Hola! Soy {p}. ¿Me cuidas?':'Oi! Eu sou {p}. Você cuida de mim?',
  '¡{P} te ha echado de menos!':'{P} estava com saudade de você!',

  /* ---------- compartilhar o Pátio (área dos pais e capa) ---------- */
  'Compartir el Patio':'Compartilhar o Pátio',
  'Si te gusta, compártelo con otras familias, el cole o tu asociación. Es gratis para todos.':'Se você gostou, compartilhe com outras famílias, com a escola ou com a sua associação. É grátis para todo mundo.',
  '📤 Compartir el enlace':'📤 Compartilhar o link',
  '🔳 Enseñar el código QR':'🔳 Mostrar o código QR',
  'Juegos educativos gratis para niños de 2 a 12 años, sin anuncios y sin registro.':'Jogos educativos grátis para crianças de 2 a 12 anos, sem anúncios e sem cadastro.',
  'Enlace copiado. Pégalo donde quieras.':'Link copiado. Cole onde quiser.',
  'Escanéalo con la cámara del móvil para abrir el Patio.':'Escaneie com a câmera do celular para abrir o Pátio.',
  '¿Te gusta? Compártelo con otras familias desde ⚙️.':'Gostou? Compartilhe com outras famílias em ⚙️.',
});

/* ---------- o que você faria? ----------
   e: desenho; s: a situação (falando com a criança: "você"); ok: [o gentil, por quê]; no: duas opções menos gentis e o que aconteceria.
   As respostas vão na primeira pessoa e sem palavras que mudam com o gênero de quem fala ("Fico com raiva", não "Fico bravo"). */
LANGS.pt.data.HARIAS=[
  {e:'😢',s:'Um colega está chorando no recreio.',ok:['Chego perto e pergunto o que aconteceu.','Quando alguém está triste, uma pergunta carinhosa faz a pessoa se sentir acompanhada.'],
    no:[['Dou risada dele.','Se a gente ri de quem está chorando, a pessoa se sente ainda pior.'],['Faço de conta que não vi.','Se ninguém liga para ele, ele se sente sozinho.']]},
  {e:'🧍',s:'Tem uma menina nova na turma, e ela está sozinha porque não conhece ninguém.',ok:['Chamo a menina para brincar com a gente.','Convidar faz ela se sentir bem-vinda. E talvez você ganhe uma amiga nova!'],
    no:[['Digo que ela não pode brincar.','Deixar alguém de fora faz a pessoa se sentir triste e sozinha.'],['Saio de perto sem dizer nada.','Se ninguém fala com ela, vai ser muito difícil fazer amigos.']]},
  {e:'💥',s:'Sem querer, você quebra um copo em casa.',ok:['Conto o que aconteceu e peço desculpas.','Dizer a verdade é ter coragem. E assim um adulto pode limpar tudo sem ninguém se cortar.'],
    no:[['Escondo os cacos.','Os cacos escondidos podem cortar alguém, e esconder não resolve nada.'],['Digo que foi meu irmão.','Se você põe a culpa em outra pessoa, quem fica de castigo é quem não fez nada. Isso não é justo.']]},
  {e:'🧸',s:'Seu irmãozinho quer brincar com o seu brinquedo.',ok:['Brincamos juntos ou empresto um pouquinho.','Dividir deixa os dois felizes, e depois ele devolve.'],
    no:[['Arranco o brinquedo da mão dele.','Arrancar as coisas da mão dos outros pode machucar e acaba em briga.'],['Grito que é só meu.','Gritar assusta e deixa seu irmão triste. Com calma, vocês se entendem melhor.']]},
  {e:'😠',s:'Um amigo pega a sua bola, e você fica com muita raiva.',ok:['Respiro fundo e digo que isso me chateou.','Respirar ajuda a se acalmar, e falar com palavras ajuda o outro a entender.'],
    no:[['Bato nele.','Bater machuca e não resolve nada. Dá para mostrar a raiva usando palavras.'],['Quebro alguma coisa dele.','Quebrar as coisas dele ia magoar seu amigo, e o problema ficaria ainda maior.']]},
  {e:'🎨',s:'Sua amiga mostra o desenho dela, e você não gosta muito.',ok:['Digo o que achei bonito no desenho dela.','Sempre tem algo bonito para dizer. Assim ela fica contente e com vontade de continuar desenhando.'],
    no:[['Digo que está horrível.','Falar coisas feias machuca. Dá para falar a verdade com carinho.'],['Faço piada do desenho dela na frente de todo mundo.','Fazer piada na frente dos outros dá muita vergonha e tristeza.']]},
  {e:'👵',s:'Uma senhora idosa deixa as laranjas caírem da sacola.',ok:['Ajudo a pegar as laranjas.','Ajudar quem precisa deixa o mundo mais gentil.'],
    no:[['Passo direto, sem parar.','Se ninguém ajudar, vai ser muito difícil para ela pegar tudo sozinha.'],['Dou risada e sigo meu caminho.','Rir quando alguém tem um problema faz a pessoa se sentir mal.']]},
  {e:'⚽',s:'O seu time perde uma partida.',ok:['Dou parabéns ao outro time.','Saber perder é coisa de campeão. Na próxima, vamos com tudo!'],
    no:[['Digo que eles trapacearam.','Acusar sem motivo deixa os outros chateados e estraga o jogo.'],['Vou embora de mau humor, sem me despedir.','Sair assim estraga a diversão. Perder às vezes faz parte do jogo.']]},
  {e:'👛',s:'Você encontra uma carteira no parque.',ok:['Entrego a um adulto para devolver ao dono.','Assim o dono consegue a carteira de volta. Com certeza estava procurando por ela!'],
    no:[['Fico com a carteira para mim.','Ficar com o que não é nosso não está certo: o dono vai ficar preocupado.'],['Jogo a carteira no lixo.','Assim o dono nunca ia conseguir ter a carteira de volta.']]},
  {e:'🗣️',s:'Umas crianças estão caçoando de um menino pelo jeito que ele fala.',ok:['Fico do lado dele e chamo um adulto.','Quem sofre com as piadas precisa de apoio. Contar para um adulto não é dedurar: é ajudar.'],
    no:[['Dou risada junto com eles.','Rir junto com quem caçoa faz o menino se sentir ainda mais sozinho.'],['Digo que a culpa é dele.','Ninguém tem culpa quando caçoam dele. Cada pessoa fala do seu jeito.']]},
  {e:'🧹',s:'Quando você termina de brincar, o quarto fica cheio de brinquedos.',ok:['Arrumo tudo.','Arrumar é cuidar das suas coisas e ajudar em casa. Amanhã você vai achar tudo!'],
    no:[['Deixo para os outros arrumarem.','Em casa, todo mundo ajuda. Se cada um arruma o que é seu, fica mais fácil.'],['Enfio tudo debaixo da cama.','Assim os brinquedos se perdem ou quebram. É melhor cada coisa no seu lugar.']]},
  {e:'📘',s:'Seu amigo não entende um exercício que você sabe fazer.',ok:['Explico como eu faço.','Ajudar um amigo a aprender é um presente para os dois.'],
    no:[['Digo que ele é bobo.','Xingar machuca. Todo mundo acha algumas coisas mais difíceis de aprender.'],['Digo que não vou ajudar.','Quando a gente se ajuda, todo mundo aprende mais.']]},
  {e:'🤫',s:'Alguém pede para você guardar um segredo que faz você se sentir mal.',ok:['Conto para um adulto de confiança.','Segredos que fazem a gente se sentir mal não se guardam: a gente conta para um adulto de confiança.'],
    no:[['Guardo o segredo, mesmo me sentindo mal.','Guardar uma coisa que preocupa pesa muito. Contar ajuda.'],['Faço de conta que não está acontecendo nada.','Fingir que não é nada não faz o problema sumir. Um adulto pode ajudar você.']]},
  {e:'🐶',s:'Você vê um cachorrinho sem água num dia muito quente.',ok:['Aviso um adulto para dar água para ele.','Os animais também sentem calor e sede. Cuidar deles é tarefa de todos.'],
    no:[['Não faço nada.','O cachorrinho está sofrendo e precisa de ajuda.'],['Provoco o cachorrinho para ele latir.','Provocar os animais dá medo neles, e o cachorrinho já está sofrendo.']]},
  {e:'🍬',s:'Tem três balas, e vocês são três amigos.',ok:['Uma para cada um.','Dividir em partes iguais é justo, e todo mundo fica contente.'],
    no:[['Eu como duas.','Se você comer duas, alguém vai ficar sem a sua.'],['Eu como todas.','Assim seus amigos iam ficar sem nada, e tristes.']]},
  {e:'🛝',s:'A fila para o escorregador está muito grande.',ok:['Espero a minha vez.','Esperar a vez é justo: todo mundo quer brincar.'],
    no:[['Furo a fila.','Furar a fila não é justo com quem está esperando há um tempão.'],['Empurro para subir antes.','Empurrar pode fazer alguém cair e se machucar.']]},
  {e:'🗑️',s:'Você vê papéis jogados no chão do parque.',ok:['Jogo os papéis na lixeira.','Assim o parque fica limpo para todo mundo, e para os animais também.'],
    no:[['Jogo minha embalagem no chão também.','Lixo no chão suja o parque e pode machucar os animais.'],['Deixo tudo lá e vou embora.','Se cada um ajuda um pouquinho, o parque fica sempre limpo.']]},
  {e:'👟',s:'Alguém ajuda você a amarrar o cadarço.',ok:['Agradeço a ajuda.','Agradecer faz quem ajudou você se sentir bem.'],
    no:[['Não digo nada.','Se você não agradece, a pessoa pode pensar que você não gostou da ajuda.'],['Digo que ficou malfeito.','Mesmo que não fique perfeito, foi feito com carinho.']]},
  {e:'😟',s:'Você falou uma coisa feia para o seu amigo, e agora ele está triste.',ok:['Peço desculpas.','Pedir desculpas ajuda a fazer as pazes. Todo mundo erra às vezes!'],
    no:[['Faço de conta que nada aconteceu.','Se vocês não conversarem, seu amigo vai continuar triste.'],['Digo que ele está exagerando.','O que ele sente é importante. É melhor escutar e pedir desculpas.']]},
  {e:'🚌',s:'Um vovô entra no ônibus e não tem nenhum lugar livre.',ok:['Dou o meu lugar para ele.','Ceder o lugar para quem mais precisa é um gesto muito bonito.'],
    no:[['Finjo que não estou vendo.','Se ninguém prestar atenção, ele vai ter que ir em pé a viagem toda.'],['Digo para ele esperar.','É difícil para ele ficar em pé com o ônibus andando.']]}];

/* ---------- divida certinho ----------
   n vai no plural e com artigo ("os biscoitos"). Todas são masculinas, para valer "Quantos…?" e "sobra um",
   e assim os números em algarismos soam certos na voz ("2" = "dois"). Só um objeto em cada emoji (sem 🍒 nem 🍇). */
LANGS.pt.data.SHARE_ITEMS=[{e:'🍪',n:'os biscoitos'},{e:'🍓',n:'os morangos'},{e:'🧁',n:'os bolinhos'},{e:'🍬',n:'os doces'},{e:'🍫',n:'os chocolates'},{e:'🥪',n:'os sanduíches'}];

/* ---------- meu bichinho ----------
   n: nome no botão; p: com o possessivo ("seu cachorrinho"); g: gênero ('m' ou 'f') para "ele"/"ela". */
LANGS.pt.data.PETS=[{e:'🐶',n:'Cachorrinho',p:'seu cachorrinho',g:'m'},{e:'🐱',n:'Gatinha',p:'sua gatinha',g:'f'},{e:'🐰',n:'Coelhinho',p:'seu coelhinho',g:'m'},
  {e:'🐢',n:'Tartaruga',p:'sua tartaruga',g:'f'},{e:'🐹',n:'Hamster',p:'seu hamster',g:'m'},{e:'🐥',n:'Pintinho',p:'seu pintinho',g:'m'}];
})();
