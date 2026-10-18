#!/usr/bin/env python3
"""Construye el Patio de Juegos a partir de src/.

  python3 build.py

Genera:
  dist/web/   la web completa para subir a Cloudflare Pages (o cualquier hosting estático):
              funciona sin internet una vez instalada, con letras propias y sin servicios de terceros.
  dist/demo/  un solo archivo HTML para la demostración (usa las letras de Google Fonts).

No necesita instalar nada: solo Python 3. Los iconos PNG se generan si está Pillow (pip install pillow)."""
import hashlib, html, json, re, shutil, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, WEB, DEMO = ROOT / 'src', ROOT / 'dist' / 'web', ROOT / 'dist' / 'demo'
CONFIG = json.loads((SRC / 'config.json').read_text(encoding='utf-8'))

PENDING = {'es': '[pendiente: {}]', 'en': '[to be filled in: {}]'}
FIELDS = {'responsable': ('nombre del responsable', 'name of the person in charge'),
          'contacto': ('correo de contacto', 'contact email'),
          'dominio': ('dirección web', 'web address'),
          'alojamiento': ('proveedor de alojamiento', 'hosting provider')}


def read(p):
    return (SRC / p).read_text(encoding='utf-8')


def lib_js():
    """Todo el código menos el arranque de la app: núcleo, idiomas, datos, juegos y traducciones."""
    files = sorted((SRC / 'js').glob('*.js'))
    core = [f for f in files if f.name != '90-app.js']
    # cada idioma: primero <código>.js, que lo crea, y después sus partes <código>-*.js
    packs = sorted((p for p in (SRC / 'idiomas').glob('*.js') if not p.name.endswith('-pendiente.js')),
                   key=lambda p: (p.stem.split('-')[0], '-' in p.stem, p.stem))
    return '\n'.join(f.read_text(encoding='utf-8') for f in core + packs)


def legal_templates():
    out = []
    for lang_dir in sorted((SRC / 'legal').iterdir()):
        if not lang_dir.is_dir():
            continue
        lang = lang_dir.name
        for f in sorted(lang_dir.glob('*.html')):
            text = f.read_text(encoding='utf-8')
            for key, names in FIELDS.items():
                value = CONFIG.get(key) or PENDING.get(lang, PENDING['en']).format(names[0] if lang == 'es' else names[1])
                text = text.replace('{{%s}}' % key, html.escape(value))
            text = text.replace('{{fecha}}', date.today().isoformat())
            out.append(f'<template id="t-{f.stem}-{lang}">{text}</template>')
    return '\n'.join(out)


def page(edition):
    body = read('pagina.html').replace('<!--LEGAL-->', legal_templates())
    return body


def head(edition, css_href=None):
    desc = 'Juegos educativos gratis para niños de 2 a 12 años. Sin anuncios, sin compras y sin registro.'
    h = ['<title>Patio de Juegos</title>',
         f'<meta name="description" content="{desc}">']
    if edition == 'demo':
        h += ['<meta name="claude:viewport-fit-sides" content="cover">',
              '<link rel="preconnect" href="https://fonts.googleapis.com">',
              '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Baloo+2:wght@500;700;800&display=swap">']
    else:
        h += ['<meta name="theme-color" content="#DFF3F7">',
              '<link rel="manifest" href="manifest.webmanifest">',
              '<link rel="icon" href="iconos/icono.svg" type="image/svg+xml">',
              '<link rel="apple-touch-icon" href="iconos/icono-180.png">',
              f'<link rel="stylesheet" href="{css_href}">']
    return '\n'.join(h)


FONT_FACES = """@font-face{font-family:"Baloo 2";src:url(fuentes/baloo2-latin.woff2) format("woff2");font-weight:400 800;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(fuentes/atkinson-400-latin.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(fuentes/atkinson-700-latin.woff2) format("woff2");font-weight:700;font-display:swap}
"""


def short_hash(*texts):
    h = hashlib.sha256()
    for t in texts:
        h.update(t.encode('utf-8') if isinstance(t, str) else t)
    return h.hexdigest()[:10]


def build_demo(css, lib, app):
    DEMO.mkdir(parents=True, exist_ok=True)
    js = "const EDICION='demo';\n" + lib + '\n' + app
    out = head('demo') + f'\n<style>\n{css}\n</style>\n' + page('demo') + f'\n<script>\n{js}\n</script>\n'
    (DEMO / 'juegos.html').write_text(out, encoding='utf-8')
    return DEMO / 'juegos.html'


def icons():
    (WEB / 'iconos').mkdir(parents=True, exist_ok=True)
    svg = read('iconos/icono.svg')
    (WEB / 'iconos' / 'icono.svg').write_text(svg, encoding='utf-8')
    try:
        from PIL import Image, ImageDraw
    except ImportError:  # sin Pillow se usan los PNG ya generados que vienen en src/iconos
        made = []
        for png in sorted((SRC / 'iconos').glob('icono-*.png')):
            shutil.copy(png, WEB / 'iconos' / png.name)
            made.append('iconos/' + png.name)
        return made
    made = []
    for size, maskable in ((192, False), (512, False), (512, True), (180, False)):
        s = 4  # dibujar grande y reducir para suavizar bordes
        S = size * s
        img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        pad = 0 if maskable else int(S * .04)
        d.rounded_rectangle([pad, pad, S - pad, S - pad], radius=0 if maskable else int(S * .22), fill='#DFF3F7')
        k = .78 if maskable else 1  # zona segura de los iconos adaptables
        cx = cy = S / 2
        def box(x, y, w, h):
            return [cx + (x - .5) * S * k, cy + (y - .5) * S * k, cx + (x - .5 + w) * S * k, cy + (y - .5 + h) * S * k]
        d.rounded_rectangle(box(.16, .58, .68, .14), radius=int(S * .03 * k), fill='#3DB46D')   # suelo
        d.rectangle(box(.24, .26, .06, .34), fill='#1F3A4D')                                      # escalera
        d.polygon([tuple(box(.30, .26, 0, 0)[:2]), tuple(box(.70, .58, 0, 0)[:2]), tuple(box(.80, .58, 0, 0)[:2]), tuple(box(.30, .36, 0, 0)[:2])], fill='#E8483B')  # tobogán
        d.ellipse(box(.58, .14, .2, .2), fill='#F6C431')                                          # sol
        d.ellipse(box(.36, .64, .1, .1), fill='#2F7FE0')
        d.ellipse(box(.52, .64, .1, .1), fill='#8B5BD6')
        img = img.resize((size, size), Image.LANCZOS)
        name = f'icono-{size}{"-adaptable" if maskable else ""}.png'
        img.save(WEB / 'iconos' / name)
        made.append('iconos/' + name)
    return made


def build_web(css, lib, app):
    if WEB.exists():
        shutil.rmtree(WEB)
    WEB.mkdir(parents=True)
    shutil.copytree(ROOT / 'web' / 'fuentes', WEB / 'fuentes')
    shutil.copytree(ROOT / 'web' / 'vendor', WEB / 'vendor')
    css_full = FONT_FACES + css
    lib_full = "const EDICION='web';\nconst CONFIG=" + json.dumps({k: CONFIG.get(k, '') for k in ('dominio', 'contacto')}) + ';\n' + lib
    ver = short_hash(css_full, lib_full, app)
    files = {f'estilos.{ver}.css': css_full, f'lib.{ver}.js': lib_full, f'app.{ver}.js': app}
    for name, text in files.items():
        (WEB / name).write_text(text, encoding='utf-8')
    (WEB / 'index.html').write_text(
        '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head('web', f'estilos.{ver}.css') + canonical('') + '\n</head>\n<body>\n' + page('web')
        + f'\n<script src="lib.{ver}.js"></script>\n<script src="app.{ver}.js"></script>\n</body>\n</html>\n', encoding='utf-8')
    # páginas extra: fichas para imprimir, cartel con QR, privacidad y aviso legal
    for extra in sorted(p for p in (SRC / 'extra').glob('*.html') if not p.name.startswith('_')):
        text = extra.read_text(encoding='utf-8').replace('{{lib}}', f'lib.{ver}.js').replace('{{css}}', f'estilos.{ver}.css')
        (WEB / extra.name).write_text(text, encoding='utf-8')
    for extra in sorted(list((SRC / 'extra').glob('*.js')) + list((SRC / 'extra').glob('*.css'))):
        shutil.copy(extra, WEB / extra.name)
    legal_pages()
    pngs = icons()
    manifest = {'name': 'Patio de Juegos', 'short_name': 'Patio', 'description': 'Juegos educativos gratis para niños de 2 a 12 años.',
                'lang': 'es', 'start_url': './', 'scope': './', 'display': 'standalone', 'orientation': 'any',
                'background_color': '#DFF3F7', 'theme_color': '#DFF3F7',
                'icons': [{'src': 'iconos/icono.svg', 'sizes': 'any', 'type': 'image/svg+xml'}]
                + [png_icon(p) for p in pngs if '180' not in p]}
    (WEB / 'manifest.webmanifest').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    precache = sorted(str(p.relative_to(WEB)).replace('\\', '/') for p in WEB.rglob('*') if p.is_file() and p.name not in ('sw.js', '_headers', 'robots.txt', 'sitemap.xml'))
    sw = read('sw.js').replace('__VERSION__', ver).replace('__FILES__', json.dumps(['./'] + precache, ensure_ascii=False))
    (WEB / 'sw.js').write_text(sw, encoding='utf-8')
    shutil.copy(SRC / '_headers', WEB / '_headers')
    robots = 'User-agent: *\nAllow: /\n'
    if site_url():  # mapa del sitio para Google Search Console y otros buscadores
        pages = [''] + [n for n in ('fichas.html', 'privacidad.html', 'aviso-legal.html') if (WEB / n).exists()]
        (WEB / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                         + ''.join(f'  <url><loc>{site_url()}{n}</loc></url>\n' for n in pages)
                                         + '</urlset>\n', encoding='utf-8')
        robots += f'Sitemap: {site_url()}sitemap.xml\n'
    (WEB / 'robots.txt').write_text(robots, encoding='utf-8')
    return WEB


def site_url():
    """https://dominio/ si config.json trae el dominio; vacío si no."""
    d = CONFIG.get('dominio', '').strip().rstrip('/')
    return 'https://' + d.split('://')[-1] + '/' if d else ''


def canonical(path):
    """Dice a los buscadores cuál es la dirección principal (sin www)."""
    return f'\n<link rel="canonical" href="{site_url()}{path}">' if site_url() else ''


def png_icon(p):
    n = re.search(r'(\d+)', p).group(1)
    icon = {'src': p, 'sizes': f'{n}x{n}', 'type': 'image/png'}
    if 'adaptable' in p:
        icon['purpose'] = 'maskable'
    return icon


def legal_pages():
    """privacidad.html y aviso-legal.html: las mismas páginas que se ven en la zona de padres, para enlazarlas desde fuera."""
    tpl = read('extra/_legal.html')
    for stem, out, title in (('privacidad', 'privacidad.html', 'Privacidad'), ('aviso', 'aviso-legal.html', 'Aviso legal')):
        parts = []
        for lang_dir in sorted((SRC / 'legal').iterdir()):
            f = lang_dir / f'{stem}.html'
            if f.exists():
                text = f.read_text(encoding='utf-8')
                for key, names in FIELDS.items():
                    value = CONFIG.get(key) or PENDING.get(lang_dir.name, PENDING['en']).format(names[0] if lang_dir.name == 'es' else names[1])
                    text = text.replace('{{%s}}' % key, html.escape(value))
                text = text.replace('{{fecha}}', date.today().isoformat())
                parts.append(f'<section lang="{lang_dir.name}">{text}</section>')
        (WEB / out).write_text(tpl.replace('{{title}}', title).replace('{{body}}', '\n<hr>\n'.join(parts)), encoding='utf-8')


def main():
    css, lib, app = read('estilos.css'), lib_js(), read('js/90-app.js')
    demo = build_demo(css, lib, app)
    web = build_web(css, lib, app)
    missing = [k for k in ('responsable', 'contacto', 'dominio') if not CONFIG.get(k)]
    print(f'Demo: {demo} ({demo.stat().st_size // 1024} KB)')
    print(f'Web:  {web} ({sum(p.stat().st_size for p in web.rglob("*") if p.is_file()) // 1024} KB en {sum(1 for p in web.rglob("*") if p.is_file())} archivos)')
    if missing:
        print('Falta rellenar en src/config.json antes de publicar:', ', '.join(missing))


if __name__ == '__main__':
    sys.exit(main())
