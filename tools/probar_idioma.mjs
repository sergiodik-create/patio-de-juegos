// Prueba un idioma jugando de verdad, sin construir la web (lee src/ directamente).
//   node tools/probar_idioma.mjs en              todos los juegos en inglés
//   node tools/probar_idioma.mjs en sumas reloj  solo esos juegos
// Avisa de: textos que pasan por _() sin traducción, frases que parecen español en pantalla o en la voz,
// huecos sin rellenar ({n}, undefined, NaN) y errores de JavaScript.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const pw = await import(process.env.PLAYWRIGHT || join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs'));
const [lang = 'en', ...only] = process.argv.slice(2);

const rd = p => readFileSync(join(SRC, p), 'utf8');
const js = readdirSync(join(SRC, 'js')).filter(f => f.endsWith('.js') && f !== '90-app.js').sort().map(f => 'js/' + f);
const packs = readdirSync(join(SRC, 'idiomas')).filter(f => f.endsWith('.js') && !f.endsWith('-pendiente.js'))
  .sort((a, b) => { const k = f => [f.split(/[-.]/)[0], f.includes('-') ? 1 : 0, f]; const x = k(a), y = k(b); return x < y ? -1 : x > y ? 1 : 0; })
  .map(f => 'idiomas/' + f);
// cada archivo en su propio <script>, y antes se comprueba que no tenga errores de sintaxis
let broken = 0;
const scripts = [...js, ...packs, 'js/90-app.js'].map(f => {
  try { execSync(`node --check "${join(SRC, f)}"`, { stdio: 'pipe' }); }
  catch (e) { broken++; console.log(`✗ error de sintaxis en src/${f}:\n${e.stderr.toString().split('\n').slice(0, 5).join('\n')}`); return ''; }
  return `<script>${rd(f).replace(/<\/script/gi, '<\\/script')}\n//# sourceURL=${f}\n</script>`;
}).join('\n');
const html = `<!doctype html><meta charset="utf-8"><style>${rd('estilos.css')}</style>${rd('pagina.html').replace('<!--LEGAL-->', '')}
<script>const EDICION='demo';</script>${scripts}`;

// Pistas de que un texto sigue en español (en la pantalla de otro idioma).
const SPANISH = /[ñ¿¡]|\b(el|los|las|del|una|unos|que|por|para|cuántos?|cuántas?|cuál|qué|muy|está|toca|otra vez|bien|hola|también|dónde|cómo|aquí|tiene|hay)\b/i;
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message + ' ' + ((e.stack || '').match(/\((?:js|idiomas)\/[^)]+\)|(?:js|idiomas)\/\S+:\d+/) || [''])[0]));
await page.setContent(html); await page.waitForTimeout(300);
if (!(await page.evaluate(l => !!LANGS[l], lang))) { console.log(`No existe el idioma «${lang}» (falta src/idiomas/${lang}.js).`); process.exit(1); }

const result = await page.evaluate(async ({ lang, only, spanish }) => {
  const SP = new RegExp(spanish.source, spanish.flags);
  const miss = new Map(), said = [], report = {}; let where = 'pantallas';
  const orig = window._;
  window._ = function (s, v) { if (LANG !== 'es' && typeof s === 'string' && s && LANGS[LANG].t[s] == null) { if (!miss.has(s)) miss.set(s, new Set()); miss.get(s).add(where); } return orig(s, v); };
  const origUtter = window.utter;
  window.utter = function (t, l) { said.push([t, l || langVoice()]); return origUtter(t, l); };
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const note = (id, kind, msg) => { const r = report[id] = report[id] || { spanish: new Set(), holes: new Set(), errors: [] }; r[kind].add ? r[kind].add(msg) : r[kind].push(msg); };
  const look = (id, txt, learning) => {
    if (!txt) return;
    if (/undefined|NaN|\{\w+\}|\bnull\b|\[object/.test(txt)) note(id, 'holes', txt.slice(0, 140));
    for (const c in LANGS) txt = txt.split(LANGS[c].name).join('');  // los botones de idioma van en su propio idioma
    const m = !learning && LANG !== 'es' && SP.exec(txt);
    if (m) note(id, 'spanish', '…' + txt.slice(Math.max(0, m.index - 60), m.index + 60).replace(/\s+/g, ' ') + '…');
  };
  changeLang(lang);
  const games = allGames().filter(g => gameInLang(g) && (!only.length || only.includes(g.id)));
  for (const g of games) {
    const learning = g.age === 'i', mark = said.length; where = g.id;
    if (g.gen) for (let l = 0; l < (g.levels || 1); l++) for (let k = 0; k < 60; k++) {
      let r; try { r = g.gen(l); } catch (e) { note(g.id, 'errors', `nivel ${l}: ${e.message}`); break; }
      const vals = r.opts.map(o => o.v);
      look(g.id, [r.prompt, r.speak, r.right, typeof r.wrong === 'function' ? r.wrong(vals[0]) : r.wrong].join(' | '), learning);
      look(g.id, r.opts.map(o => (o.aria || '') + ' ' + (o.html || '').replace(/<[^>]+>/g, ' ')).join(' | '), learning);
    }
    // jugar en la pantalla: abrir, tocar algunos botones y leer lo que se ve
    try {
      age = g.age; start(g); await wait(120);
      look(g.id, $('#gtitle').textContent + ' ' + $('#stage').innerText, learning);
      for (let k = 0; k < 8; k++) {
        const bs = [...document.querySelectorAll('#stage button')].filter(b => !b.disabled && b.offsetParent);
        const b = bs[(k * 7) % Math.max(bs.length, 1)]; if (!b) break; b.click(); await wait(60);
        look(g.id, $('#stage').innerText, learning);
      }
      goHome();
    } catch (e) { note(g.id, 'errors', e.message); }
    for (const [t, l] of said.slice(mark)) if (l.startsWith(lang)) look(g.id, t, learning && false);
  }
  // pantallas comunes
  where = 'pantallas';
  renderAges(); look('pantallas', $('#s-age').innerText, false);
  for (const b of document.querySelectorAll('.agecard:not([hidden])')) { age = b.dataset.age; renderDoors(); look('pantallas', $('#s-home').innerText, age === 'i'); }
  openParents(); renderParents(); $('#ajustes').hidden = false; look('pantallas', $('#s-padres').innerText, false);
  stopVoice?.();
  const out = {};
  for (const [id, r] of Object.entries(report)) out[id] = { spanish: [...r.spanish].slice(0, 6), holes: [...r.holes].slice(0, 6), errors: r.errors.slice(0, 4) };
  return { games: games.length, hidden: GAMES.filter(g => !gameInLang(g)).map(g => g.id), miss: [...miss].map(([s, w]) => [s, [...w].join(', ')]), report: out };
}, { lang, only, spanish: { source: SPANISH.source, flags: SPANISH.flags } });

let bad = broken;
console.log(`Idioma ${lang}: ${result.games} juegos probados.` + (result.hidden.length ? ` Ocultos por falta de datos: ${result.hidden.join(', ')}` : ''));
for (const [id, r] of Object.entries(result.report)) {
  if (!r.spanish.length && !r.holes.length && !r.errors.length) continue;
  console.log(`\n${id}`);
  for (const e of r.errors) { bad++; console.log('  ✗ error: ' + e); }
  for (const h of r.holes) { bad++; console.log('  ✗ hueco: ' + h); }
  for (const s of r.spanish) { bad++; console.log('  ? ¿español?: ' + s); }
}
if (result.miss.length) { bad += result.miss.length; console.log(`\nTextos sin traducción (${result.miss.length}):`); for (const [s, w] of result.miss) console.log(`  ${JSON.stringify(s)}   (${w})`); }
for (const e of errors) { bad++; console.log('✗ ' + e); }
console.log(bad ? `\n${bad} avisos.` : '\nTodo traducido ✅');
await browser.close();
process.exit(bad ? 1 : 0);
