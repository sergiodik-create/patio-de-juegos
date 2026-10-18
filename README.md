# Patio de Juegos

Juegos educativos gratis para niños y niñas de 2 a 12 años, pensados para familias que no pueden pagar aplicaciones.
Sin anuncios, sin compras, sin registro y sin enviar ningún dato: todo se queda en el dispositivo.
Funciona en el móvil, la tablet y el ordenador, y se puede instalar para usarlo sin internet.

*Free educational games for children aged 2 to 12, for families who cannot pay for apps. No ads, no purchases, no sign-up, no data collected. Works offline once installed. Available in Spanish and English; more languages welcome (see [CONTRIBUTING.md](CONTRIBUTING.md)).*

## Qué tiene

- **Por edades:** 2 a 4 años, 5 a 7, 8 a 10 y 11 a 12, con más de 60 juegos: colores, animales, contar, formas, letras, sumas y restas, series, reloj, monedas, laberintos, trazar letras, sopa de letras, sudoku, fracciones, continentes, programar un robot, acertijos, mecanografía, ciencia, historia, dinero y ahorro…
- **Juegos de mesa:** tres en raya, conecta 4, damas y ajedrez contra el ordenador.
- **Creativos:** colorear, escenas con pegatinas, inventar cuentos, piano, memoria, globos.
- **Cuentos** para escuchar y leer con la palabra resaltada, incluidos cuentos de otras culturas.
- **Idiomas:** aprender inglés (o español, si la pantalla está en inglés) con vocabulario, colores, números, frases y parejas.
- **Niveles automáticos:** la dificultad sube o baja sola según los aciertos.
- **Álbum de pegatinas:** cada cinco estrellas, una pegatina.
- **Zona de padres** (con una pregunta para adultos): voz, subtítulos, modo calma, letra grande, alto contraste, letra para dislexia, nombres en los colores, descansos, progreso, privacidad.
- **Fichas para imprimir** (colorear, laberintos, trazar letras y números, contar, sumas) y **cartel con QR** para colegios y asociaciones.

## Probarlo en tu ordenador

Solo hace falta Python 3.

```sh
python3 build.py                          # genera dist/web (la web) y dist/demo (un solo archivo)
python3 -m http.server -d dist/web 8000   # y abre http://localhost:8000
```

`build.py` vuelve a dibujar los iconos PNG si está Pillow (`pip install pillow`); si no, usa los que ya vienen en `src/iconos/`.

## Publicarlo en Cloudflare Pages

1. **Rellena `src/config.json`**: responsable, correo de contacto y dominio. Salen en la privacidad, el aviso legal y el cartel. Vuelve a ejecutar `python3 build.py`.
2. **Sube la web.** Hay dos formas:
   - *Subida directa:* en el panel de Cloudflare, Workers y Pages › Crear › Pages › Subir recursos, y arrastra la carpeta `dist/web`.
   - *Desde un repositorio de GitHub:* conecta el repositorio en Workers y Pages, con comando de compilación `python3 build.py` y directorio de salida `dist/web`. Cada cambio que se suba al repositorio se publica solo.
3. **Dominio.** Si lo compras en Cloudflare Registrar, en el proyecto de Pages ve a Dominios personalizados y añádelo; Cloudflare configura el DNS y el certificado.

El archivo `dist/web/_headers` ya trae las cabeceras de seguridad: la web no carga nada de fuera (ni letras, ni analítica, ni anuncios).

## Carpetas

| Carpeta | Qué hay |
| --- | --- |
| `src/js/` | El código, por partes: núcleo, idiomas, datos, cada grupo de juegos y la aplicación (`90-app.js`). |
| `src/idiomas/` | Las traducciones: `en.js` crea el inglés y `en-*.js` añaden los textos de cada grupo de juegos. |
| `src/legal/<idioma>/` | Privacidad, aviso legal y créditos de cada idioma. |
| `src/extra/` | Fichas para imprimir, cartel con QR y la plantilla de las páginas legales. |
| `src/pagina.html`, `src/estilos.css` | La página y los estilos. |
| `web/` | Letras propias (con su licencia) y la librería del código QR. |
| `tools/` | Pruebas automáticas y revisión de traducciones. |

## Pruebas

```sh
python3 build.py && node tools/probar.mjs   # recorre todas las edades y juegos, la zona de padres, las fichas y el modo sin internet
node tools/probar_idioma.mjs en              # juega en inglés y avisa de textos sin traducir
python3 tools/revisar_idioma.py en          # cuenta lo que falta por traducir en un idioma
```

Las pruebas usan Playwright con Chromium (`npm install -g playwright`).

## Licencias

- Código: [MIT](LICENSE).
- Textos, cuentos y dibujos propios: [CC BY-SA 4.0](LICENSE-CONTENIDO.md).
- Letras Baloo 2 y Atkinson Hyperlegible: SIL Open Font License 1.1 (en `web/fuentes/`).
- qrcode-generator de Kazuhiko Arase: MIT.

¿Quieres ayudar con juegos, cuentos, traducciones, voces o revisando contenidos? Mira la [guía para voluntarios](CONTRIBUTING.md).
