// Imágenes para compartir y para las tiendas de apps, dibujadas desde la propia web.
//   python3 build.py && node tools/capturas.mjs && python3 build.py
// Guarda en web/imagenes/: compartir.png (1200×630, la vista previa del enlace) y capturas de
// pantalla ancha y de móvil que usan el manifiesto, Microsoft Store, Google Play y los portales.
import { createServer } from 'node:http';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', 'dist', 'web'), out = join(here, '..', 'web', 'imagenes');
await mkdir(out, { recursive: true });
const css = (await readdir(root)).find(f => /^estilos\.\w+\.css$/.test(f));
const pw = await import(process.env.PLAYWRIGHT || join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
  try {
    const b = p === '/_compartir.html' ? (await readFile(join(here, 'compartir.html'), 'utf8')).replace('{{css}}', css) : await readFile(join(root, p));
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(b);
  } catch { res.writeHead(404); res.end('no'); }
}).listen(0);
const base = `http://localhost:${server.address().port}/`;
const browser = await pw.chromium.launch();
const shot = async (name, opts, go) => {
  const ctx = await browser.newContext({ locale: 'es-ES', reducedMotion: 'reduce', serviceWorkers: 'block', ...opts });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('patio.instalarNo', JSON.stringify(Date.now() + 9e9)); } catch (e) {} });
  await page.goto(base + (go.url || '')); await page.waitForTimeout(700);
  if (go.run) { await go.run(page); await page.waitForTimeout(500); }
  await page.screenshot({ path: join(out, name) }); await ctx.close();
  console.log('✓ ' + name);
};
const game = id => async page => { await page.evaluate(id => { const g = GAMES.find(g => g.id === id); age = g.age[0]; renderDoors(); show('list'); }, id); await page.click(`#doors [data-go="${id}"]`); };
const list = a => async page => { await page.click(`.agecard[data-age="${a}"]`); };
await shot('compartir.png', { viewport: { width: 1200, height: 630 } }, { url: '_compartir.html' });
const wide = { viewport: { width: 1280, height: 800 } }, phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
await shot('ancha-1-inicio.png', wide, {});
await shot('ancha-2-juegos.png', wide, { run: list('m') });
await shot('ancha-3-juego.png', wide, { run: async p => { await game('mascota')(p); await p.click('#stage button'); } });
await shot('movil-1-inicio.png', phone, {});
await shot('movil-2-juego.png', phone, { run: game('reparte') });
await browser.close(); server.close();
