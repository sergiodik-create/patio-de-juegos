// Pruebas automáticas del Patio de Juegos con Playwright (Chromium).
//   python3 build.py && node tools/probar.mjs
// Abre la web, recorre todas las edades y juegos, prueba cada generador de preguntas cientos de veces,
// la zona de padres, el álbum, las fichas, el cartel, los idiomas y el modo sin internet.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'web');
const pw = await import(process.env.PLAYWRIGHT || join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end('no'); }
}).listen(0);
const base = `http://localhost:${server.address().port}/`;
const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
let fails = 0; const check = (ok, msg) => { if (!ok) { fails++; console.log('  ✗ ' + msg); } };

await page.goto(base); await page.waitForTimeout(400);
// 1) generadores de preguntas: cientos de rondas por juego y nivel, en cada idioma
const langs = await page.evaluate(() => Object.keys(LANGS));
for (const lang of langs) {
  const bad = await page.evaluate((lang) => {
    setLang(lang); const out = [];
    for (const g of GAMES.filter(g => g.gen && gameInLang(g) && (g.age !== 'i' || learnLang()))) {
      for (let l = 0; l < (g.levels || 1); l++) for (let k = 0; k < 150; k++) {
        let r; try { r = g.gen(l); } catch (e) { out.push(`${g.id}/${l}: ${e.message}`); break; }
        const vals = r.opts.map(o => o.v), txt = [r.prompt, r.speak, r.right, r.wrong(vals[0]), r.sayFx || '', r.fx || ''].join(' | ');
        if (!vals.includes(r.answer)) out.push(`${g.id}/${l}: la respuesta ${r.answer} no está en ${vals}`);
        if (new Set(vals).size !== vals.length) out.push(`${g.id}/${l}: opciones repetidas ${vals}`);
        if (vals.length < 2) out.push(`${g.id}/${l}: pocas opciones`);
        if (/undefined|NaN|\{\w+\}|null/.test(txt + vals.join())) out.push(`${g.id}/${l}: texto raro: ${txt} ${vals}`);
        if (out.length > 20) return out;
      }
    }
    setLang('es'); return out;
  }, lang);
  check(!bad.length, `generadores en ${lang}: ${bad.slice(0, 8).join('\n    ')}`);
  console.log(`✓ generadores (${lang})`);
}
// 2) recorrer cada edad y cada juego
for (const lang of langs) {
  await page.evaluate(l => changeLang(l), lang);
  const ages = await page.$$eval('.agecard:not([hidden])', bs => bs.map(b => b.dataset.age));
  for (const a of ages) {
    await page.click(`.agecard[data-age="${a}"]`); await page.waitForTimeout(150);
    const ids = await page.$$eval('#doors [data-go]', bs => bs.map(b => b.dataset.go));
    check(ids.length > 0, `sin juegos en la edad ${a} (${lang})`);
    for (const id of ids) {
      const before = errors.length;
      await page.click(`#doors [data-go="${id}"]`); await page.waitForTimeout(250);
      // en juegos de preguntas, pulsar la respuesta correcta
      const ans = await page.evaluate(() => (cur && !cur.custom && round) ? round.answer : null);
      if (ans != null) { await page.evaluate(a => { const b = [...document.querySelectorAll('#choices button')].find(x => x.dataset.v === a); b && b.click(); }, ans); await page.waitForTimeout(100); }
      else { // juegos propios: tocar algunos botones del escenario
        const n = await page.$$eval('#stage button', bs => bs.length);
        for (let k = 0; k < Math.min(n, 6); k++) await page.evaluate(k => { const bs = [...document.querySelectorAll('#stage button')].filter(b => !b.disabled && b.offsetParent && !b.classList.contains('again') && !/bnext|\bnew\b/.test(b.id)); const b = bs[(k * 7) % Math.max(bs.length, 1)]; b && b.click(); }, k);
        await page.waitForTimeout(150);
      }
      const t = await page.$eval('#stage', s => s.textContent);
      check(!/undefined|NaN|\{\w+\}/.test(t), `texto raro en ${id} (${lang}): ${t.slice(0, 120)}`);
      check(errors.length === before, `error en ${id} (${lang}): ${errors.slice(before).join(' / ')}`);
      await page.click('#home'); await page.waitForTimeout(80);
    }
    await page.click('#home'); await page.waitForTimeout(80);
  }
  console.log(`✓ todas las edades y juegos (${lang})`);
}
await page.evaluate(() => changeLang('es'));
// 3) zona de padres
await page.click('#padres');
const q = await page.$eval('#gate-q', e => e.textContent); const [a, b] = q.match(/(\d+) × (\d+)/).slice(1).map(Number);
for (const d of String(a * b)) await page.click(`#gate-pad [data-k="${d}"]`);
await page.click('#gate-pad [data-k="ok"]'); await page.waitForTimeout(100);
check(await page.$eval('#ajustes', e => !e.hidden), 'la zona de padres no se abre con la respuesta correcta');
for (const k of ['calma', 'grande', 'contraste', 'legible', 'nombresColor', 'subtitulos']) await page.click(`#ajustes input[data-k="${k}"]`);
const ds = await page.evaluate(() => ({ ...document.documentElement.dataset }));
check(ds.calma === 'si' && ds.contraste === 'si' && ds.nombresColor === 'si', 'los ajustes no se aplican: ' + JSON.stringify(ds));
await page.screenshot({ path: join(root, '..', 'captura-padres.png'), fullPage: true });
for (const k of ['calma', 'grande', 'contraste', 'legible', 'nombresColor', 'subtitulos']) await page.click(`#ajustes input[data-k="${k}"]`);
await page.click('#home');
// 4) álbum
await page.evaluate(() => { for (let i = 0; i < 12; i++) addStar(); });
await page.click('#album'); await page.waitForTimeout(100);
check((await page.$$('#alb-grid .got')).length >= 2, 'el álbum no muestra pegatinas ganadas');
await page.click('#home');
// 5) descanso
await page.evaluate(() => { S.descanso = 15; playMs = 16 * 60000; });
await page.click('.agecard[data-age="p"]'); await page.click('#doors [data-go="colores"]'); await page.waitForTimeout(100);
check(await page.$eval('#s-break', e => !e.hidden), 'no aparece el descanso');
await page.evaluate(() => { S.descanso = 20; playMs = 0; clearTimers(); show('age'); });
// 6) fichas y cartel
for (const p of ['fichas.html', 'cartel.html', 'privacidad.html', 'aviso-legal.html']) {
  const before = errors.length; const pg = await ctx.newPage(); pg.on('pageerror', e => errors.push(p + ': ' + e.message));
  await pg.goto(base + p); await pg.waitForTimeout(300);
  if (p === 'fichas.html') for (const k of ['colorear', 'laberinto', 'letras', 'numeros', 'contar', 'sumas']) { await pg.click(`#types [data-k="${k}"]`); await pg.waitForTimeout(60); await pg.screenshot({ path: join(root, '..', `ficha-${k}.png`) }); }
  if (p === 'cartel.html') { check((await pg.$$('#poster svg')).length === 7, 'el cartel no tiene los 7 QR'); await pg.screenshot({ path: join(root, '..', 'cartel.png'), fullPage: true }); }
  check(errors.length === before, `errores en ${p}: ${errors.slice(before).join(' / ')}`); await pg.close();
}
console.log('✓ zona de padres, álbum, descanso, fichas y cartel');
// 7) sin internet: tras la primera visita, la web debe abrir sin red
await page.reload(); await page.waitForTimeout(1500);
await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(1000);
await ctx.setOffline(true); await page.reload(); await page.waitForTimeout(500);
check(await page.$eval('#s-age', e => !e.hidden).catch(() => false), 'la web no abre sin internet');
await ctx.setOffline(false);
console.log('✓ funciona sin internet');
// 8) móvil
const m = await browser.newPage({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true });
await m.goto(base); await m.waitForTimeout(300);
const over = await m.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
check(!over, 'scroll horizontal en móvil');
await m.screenshot({ path: join(root, '..', 'captura-movil.png'), fullPage: true });
check(!errors.length, 'errores: ' + errors.join('\n'));
await browser.close(); server.close();
console.log(fails ? `\n${fails} problemas` : '\nTodo correcto ✅');
process.exit(fails ? 1 : 0);
