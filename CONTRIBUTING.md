# Guía para voluntarios

Gracias por querer ayudar. El Patio de Juegos es gratis para siempre y lo hacemos entre muchas personas:
quien programa, quien traduce, quien escribe cuentos, quien da clase y revisa los contenidos, quien presta su voz.

*English summary: the source language is Spanish. To translate, copy `src/idiomas/en*.js` to your language code, translate the right-hand side of every line and the data lists, and check with `python3 tools/revisar_idioma.py <code>` and `node tools/probar_idioma.mjs <code>`. To add a game, push an entry to `GAMES` with a `gen(level)` function. Keep it free, ad-free, offline-friendly and without any personal data.*

## Las reglas del Patio

1. **Gratis y sin anuncios**, sin compras, sin enlaces a tiendas ni a redes sociales.
2. **Ningún dato personal.** Nada sale del dispositivo: ni analítica, ni cookies, ni servicios de terceros. Todo se sirve desde la propia web.
3. **Para todos los niños:** que se pueda jugar sin saber leer (la voz lo dice todo), con una mano pequeña, en una tablet antigua y con los ajustes de accesibilidad (modo calma, letra grande, alto contraste, subtítulos).
4. **Amable:** un error nunca castiga; se explica y se vuelve a intentar.
5. **Sin dependencias:** JavaScript sencillo en el navegador y Python 3 para construir. Nada que instalar para publicar.

## Antes de enviar un cambio

```sh
python3 build.py && node tools/probar.mjs   # recorre todos los juegos en todos los idiomas
node tools/probar_idioma.mjs en              # si has tocado textos
```

Si no programas, también puedes escribirnos (el contacto está en el aviso legal de la web) con tu idea, tu cuento o tu corrección.

## Añadir un juego de preguntas

Los juegos de preguntas están en `src/js/20-preguntas.js` y en los demás archivos de `src/js/`. Cada juego es una línea en `GAMES`:

```js
GAMES.push(
 {id:'pares', age:'m', pic:'🧦', name:'Pares e impares', what:'¿Es par o impar?', bg:'var(--teal)', levels:2, gen(l=0){
   const n=range(1,l?100:20), par=n%2===0, ok=par?_('par'):_('impar');
   return {prompt:_('¿El {n} es par o impar?',{n}), speak:_('¿El {n} es par o impar?',{n}), answer:ok,
     opts:[_('par'),_('impar')].map(v=>({html:v, v})),
     right:_('El {n} es {x}.',{n, x:ok}), wrong:()=>_('Fíjate en la última cifra.')};}},
);
```

- `age`: `p` (2 a 4), `m` (5 a 7), `g` (8 a 10), `x` (11 y 12), `t` (cuentos), `i` (idiomas). Puede ser varias: `'mg'`.
- `gen(nivel)` devuelve una pregunta nueva cada vez: `prompt` (lo que se ve), `speak` (lo que dice la voz), `answer`, `opts` (los botones: `html` o `dot` para un color, `v` el valor, `aria` lo que lee un lector de pantalla), `visual` (dibujo opcional), `right` y `wrong(valor)`.
- `levels`: cuántos niveles tiene. El juego sube de nivel tras 4 aciertos seguidos y baja si cuesta mucho.
- **Todo texto que se ve o se oye va dentro de `_('…')`**, escrito en español. Los huecos van entre llaves: `_('Tienes {n}',{n})`.
- Las listas de palabras van en `DATA.es.MI_LISTA` y se leen con `D.MI_LISTA`, para que cada idioma traiga las suyas. Si el juego no tiene sentido sin una lista, pon `needs:['MI_LISTA']` y no aparecerá en los idiomas que no la tengan.

Para un juego con pantalla propia (como el laberinto o el ajedrez), usa `custom:'nombre'` y registra la función con `Object.assign(CUSTOM,{nombre})`. Dibuja dentro de `#stage`, llama a `star()` en cada acierto y a `say()` para hablar.

## Traducir el Patio a otro idioma

Cada idioma son unos pocos archivos en `src/idiomas/`. El inglés sirve de modelo:

1. Copia `en.js` y los `en-*.js` cambiando `en` por el código de tu idioma (por ejemplo `fr.js`, `fr-preguntas.js`…). En `fr.js` cambia la primera línea: `LANGS.fr={name:'Français',voz:'fr-FR',t:{},data:{}};` y en todos los archivos `LANGS.en` por `LANGS.fr`.
2. **Textos:** cada línea es `'texto en español': 'tu traducción'`. Traduce solo la parte de la derecha y deja igual lo que va entre llaves, como `{n}`. Si tu idioma necesita plurales o géneros distintos, la traducción puede ser una función: `'Tienes {n}': v=>v.n===1?'…':'…'`.
3. **Listas de datos** (`LANGS.fr.data.ANIMALS=[…]`): mismas posiciones y campos que en español. Adapta en lugar de traducir palabra por palabra: las palabras de los juegos de letras, la ortografía, los acertijos, la hora o la moneda tienen que funcionar en tu idioma.
4. **Textos legales:** copia `src/legal/en/` a `src/legal/fr/` y tradúcelos.
5. **Comprueba:**
   ```sh
   python3 tools/revisar_idioma.py fr            # cuántos textos y listas faltan
   python3 tools/revisar_idioma.py fr --plantilla  # crea src/idiomas/fr-pendiente.js con lo que falta
   node tools/probar_idioma.mjs fr               # juega en tu idioma y avisa de lo que se quedó en español
   ```

Puedes publicar un idioma a medias: los juegos cuyas listas faltan simplemente no aparecen en ese idioma.

Al añadir un idioma con vocabulario (`VOCAB`), aparece también en la sección **Idiomas** para aprenderlo jugando desde los demás idiomas.

## Cambiar la moneda

El juego de dinero usa `D.MONEY`, una función que escribe una cantidad. En español es en euros:

```js
DATA.es.MONEY=v=>v.toLocaleString('es-ES',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})+' €';
```

Para otra moneda basta con cambiar esa línea; por ejemplo, para pesos mexicanos: `DATA.es.MONEY=v=>'$'+v.toLocaleString('es-MX')`. Cada idioma trae la suya: el inglés usa libras. El juego de monedas de 5 a 7 años usa monedas de 1, 2, 5 y 10 sin símbolo, así que vale para cualquier moneda.

## Añadir un cuento

Los cuentos están en `src/js/60-cuentos.js` (español) y en `src/idiomas/en-cuentos.js` (inglés). Cada cuento es:

```js
{id:'tortuga', name:'La tortuga y la liebre', origen:'Fábula de Esopo', pic:'🐢', bg:'var(--green)', pages:[
  ['🐢🐇','Una liebre muy presumida se reía de la tortuga porque andaba despacio.'],
  ['🏁','—¿Hacemos una carrera? —dijo la tortuga.'],
  …]},
```

- Una frase o dos por página, para leer en voz alta. Un dibujo de emojis por página.
- Cuentos propios o versiones con tus palabras de cuentos populares. No copies textos con derechos de autor.
- Nos encantan los cuentos de otras culturas: indica de dónde vienen en `origen`.

## Revisar contenidos (docentes)

Si das clase, ayuda mucho que revises un grupo de edad: que las preguntas sean correctas, que el lenguaje sea adecuado y que los niveles tengan sentido. Juega en la edad que conozcas y anota el juego, lo que has visto y lo que cambiarías.

## Voces

Ahora la voz es la del propio dispositivo. Si quieres prestar tu voz para grabar los cuentos o las palabras de los juegos de idiomas, escríbenos: estamos preparando cómo hacerlo sin que la web pese demasiado.

## Licencia de lo que aportes

Al enviar código aceptas publicarlo con licencia MIT; los textos, cuentos, traducciones y dibujos, con CC BY-SA 4.0. Así cualquier colegio o asociación puede usarlos y mejorarlos.
