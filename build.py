#!/usr/bin/env python3
"""Construye el Patio de Juegos a partir de src/.

  python3 build.py

Genera:
  dist/web/   la web completa para subir a Cloudflare Pages (o cualquier hosting estático):
              funciona sin internet una vez instalada, con letras propias y sin servicios de terceros.
  dist/demo/  un solo archivo HTML para la demostración (usa las letras de Google Fonts).

No necesita instalar nada: solo Python 3. Los iconos PNG se generan si está Pillow (pip install pillow)."""
import hashlib, html, json, re, shutil, struct, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, WEB, DEMO = ROOT / 'src', ROOT / 'dist' / 'web', ROOT / 'dist' / 'demo'
CONFIG = json.loads((SRC / 'config.json').read_text(encoding='utf-8'))

# Lo que se ve en los textos legales mientras falte un dato de config.json (otros idiomas usan el inglés).
PENDING = {'es': '[pendiente: {}]', 'en': '[to be filled in: {}]', 'pt': '[a preencher: {}]', 'fr': '[à compléter : {}]',
           'ro': '[de completat: {}]', 'uk': '[потрібно заповнити: {}]', 'ar': '[يُستكمل لاحقًا: {}]'}
FIELDS = {'responsable': {'es': 'nombre del responsable', 'en': 'name of the person in charge', 'pt': 'nome do responsável',
                          'fr': 'nom du responsable', 'ro': 'numele responsabilului', 'uk': 'імʼя відповідальної особи', 'ar': 'اسم المسؤول'},
          'contacto': {'es': 'correo de contacto', 'en': 'contact email', 'pt': 'e-mail de contato',
                       'fr': 'e-mail de contact', 'ro': 'e-mail de contact', 'uk': 'електронна пошта для звʼязку', 'ar': 'البريد الإلكتروني للتواصل'},
          'dominio': {'es': 'dirección web', 'en': 'web address', 'pt': 'endereço do site',
                      'fr': 'adresse du site', 'ro': 'adresa site-ului', 'uk': 'адреса сайту', 'ar': 'عنوان الموقع'},
          'alojamiento': {'es': 'proveedor de alojamiento', 'en': 'hosting provider', 'pt': 'provedor de hospedagem',
                          'fr': 'hébergeur', 'ro': 'furnizorul de găzduire', 'uk': 'хостинг-провайдер', 'ar': 'مزوّد الاستضافة'}}


def fill_legal(text, lang):
    """Rellena {{responsable}}, {{contacto}}… con config.json, o con un aviso de que falta."""
    for key, names in FIELDS.items():
        value = CONFIG.get(key) or (PENDING[lang] if lang in PENDING else PENDING['en']).format(names.get(lang, names['en']))
        text = text.replace('{{%s}}' % key, html.escape(value))
    return text.replace('{{fecha}}', date.today().isoformat())


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
            text = fill_legal(f.read_text(encoding='utf-8'), lang)
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
              '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Baloo+2:wght@500;700;800&family=Baloo+Bhaijaan+2:wght@500;700;800&family=Nunito:wght@500;700;800&display=swap">']
    else:
        h += ['<meta name="theme-color" content="#DFF3F7">',
              '<link rel="manifest" href="manifest.webmanifest">',
              '<link rel="icon" href="iconos/icono.svg" type="image/svg+xml">',
              '<link rel="apple-touch-icon" href="iconos/icono-180.png">',
              f'<link rel="stylesheet" href="{css_href}">']
        h += share_tags(desc)
    return '\n'.join(h)


def share_tags(desc):
    """Vista previa del enlace (WhatsApp, redes, portales) y ficha para los buscadores. Solo con dominio."""
    url = site_url()
    if not url:
        return []
    img = url + 'imagenes/compartir.png'
    ficha = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'WebSite', 'name': 'Patio de Juegos', 'url': url, 'inLanguage': 'es'},
        {'@type': 'WebApplication', 'name': 'Patio de Juegos', 'url': url, 'description': desc, 'image': img,
         'applicationCategory': 'EducationalApplication', 'operatingSystem': 'Web', 'isAccessibleForFree': True,
         'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR'},
         'inLanguage': ['es', 'en-GB', 'pt-BR', 'fr', 'ro', 'uk', 'ar'],
         'audience': {'@type': 'PeopleAudience', 'suggestedMinAge': 2, 'suggestedMaxAge': 12},
         'license': 'https://creativecommons.org/licenses/by-sa/4.0/'}]}
    return (['<meta property="og:type" content="website">',
            '<meta property="og:site_name" content="Patio de Juegos">',
            '<meta property="og:title" content="Patio de Juegos">',
            f'<meta property="og:description" content="{desc}">',
            f'<meta property="og:url" content="{url}">',
            f'<meta property="og:image" content="{img}">',
            '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">',
            '<meta property="og:image:alt" content="Patio de Juegos: juegos educativos gratis para niños de 2 a 12 años">',
            '<meta property="og:locale" content="es_ES">']
            + [f'<meta property="og:locale:alternate" content="{l}">' for l in ('en_GB', 'pt_BR', 'fr_FR', 'ro_RO', 'uk_UA', 'ar_AR')]
            + ['<meta name="twitter:card" content="summary_large_image">',
               '<script type="application/ld+json">' + json.dumps(ficha, ensure_ascii=False) + '</script>'])


# Letras locales. Las latinas se guardan para jugar sin internet desde el primer día; las demás (rumano, árabe, ucraniano)
# se descargan solo si la pantalla las usa (unicode-range) y entonces también quedan guardadas.
FONT_FACES = """@font-face{font-family:"Baloo 2";src:url(fuentes/baloo2-latin.woff2) format("woff2");font-weight:400 800;font-display:swap;unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}
@font-face{font-family:"Atkinson Hyperlegible";src:url(fuentes/atkinson-400-latin.woff2) format("woff2");font-weight:400;font-display:swap;unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}
@font-face{font-family:"Atkinson Hyperlegible";src:url(fuentes/atkinson-700-latin.woff2) format("woff2");font-weight:700;font-display:swap;unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}
@font-face{font-family:"Atkinson Hyperlegible";src:url(fuentes/atkinson-400-latin-ext.woff2) format("woff2");font-weight:400;font-display:swap;unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF}
@font-face{font-family:"Atkinson Hyperlegible";src:url(fuentes/atkinson-700-latin-ext.woff2) format("woff2");font-weight:700;font-display:swap;unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF}
@font-face{font-family:"Baloo 2";src:url(fuentes/baloo2-latin-ext.woff2) format("woff2");font-weight:400 800;font-display:swap;unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF}
@font-face{font-family:"Baloo Bhaijaan 2";src:url(fuentes/baloo-bhaijaan2-arabic.woff2) format("woff2");font-weight:400 800;font-display:swap;unicode-range:U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC7, U+10EC9-10EEE, U+10EF0-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1}
@font-face{font-family:"Nunito";src:url(fuentes/nunito-cyrillic.woff2) format("woff2");font-weight:400 800;font-display:swap;unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116}
"""


def short_hash(*texts):
    h = hashlib.sha256()
    for t in texts:
        h.update(t.encode('utf-8') if isinstance(t, str) else t)
    return h.hexdigest()[:10]


def build_demo(css, lib, app):
    DEMO.mkdir(parents=True, exist_ok=True)
    js = "const EDICION='demo';\nconst CONFIG=" + json.dumps({k: CONFIG.get(k, '') for k in ('dominio', 'contacto')}) + ';\n' + lib + '\n' + app
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
    shutil.copytree(ROOT / 'web' / 'imagenes', WEB / 'imagenes')  # vista previa y capturas (tools/capturas.mjs)
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
                + [png_icon(p) for p in pngs if '180' not in p],
                'id': './', 'dir': 'auto', 'categories': ['education', 'kids', 'games'],
                'screenshots': screenshots()}
    (WEB / 'manifest.webmanifest').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    precache = sorted(str(p.relative_to(WEB)).replace('\\', '/') for p in WEB.rglob('*') if p.is_file() and p.name not in ('sw.js', '_headers', 'robots.txt', 'sitemap.xml')
                      and p.parent.name != 'imagenes'  # solo para compartir y tiendas: no gastar datos del móvil
                      and not (p.suffix == '.woff2' and not p.name.endswith('-latin.woff2')))
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


def screenshots():
    """Capturas que enseñan el navegador al instalar y las tiendas de apps (ancha = tablet/ordenador, movil = móvil)."""
    out = []
    for p in sorted((ROOT / 'web' / 'imagenes').glob('*.png')):
        if p.stem.split('-')[0] not in ('ancha', 'movil'):
            continue
        w, h = struct.unpack('>II', p.read_bytes()[16:24])
        out.append({'src': f'imagenes/{p.name}', 'sizes': f'{w}x{h}', 'type': 'image/png',
                    'form_factor': 'wide' if p.stem.startswith('ancha') else 'narrow'})
    return out


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
                text = fill_legal(f.read_text(encoding='utf-8'), lang_dir.name)
                rtl = ' dir="rtl"' if lang_dir.name in ('ar', 'he', 'fa', 'ur') else ''
                parts.append(f'<section lang="{lang_dir.name}"{rtl}>{text}</section>')
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
