#!/usr/bin/env python3
"""Dice qué falta por traducir en un idioma.

  python3 tools/revisar_idioma.py en              resumen de lo que falta en inglés
  python3 tools/revisar_idioma.py en --todo       además, la lista completa de textos que faltan
  python3 tools/revisar_idioma.py fr --plantilla  escribe src/idiomas/fr-pendiente.js con los textos sin traducir

Lee los textos en español del código (_('…'), N_('…'), los nombres de los juegos y data-t/data-ta de las páginas)
y las listas de DATA.es, y los compara con lo que trae src/idiomas/<código>*.js.
Las traducciones se escriben así:   'Texto en español': 'Translation',
y cada lista de datos así:           LANGS.en.data.ANIMALS=[...];"""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'
STR = r"""'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)\""""


def unescape(s):
    return re.sub(r"\\(u\{?[0-9a-fA-F]+\}?|.)", lambda m: chr(int(m.group(1)[1:].strip('{}'), 16)) if m.group(1)[0] == 'u' and len(m.group(1)) > 1 else {'n': '\n', 't': '\t'}.get(m.group(1), m.group(1)), s)


def source_texts():
    """Todos los textos en español que se muestran o se dicen, con el archivo donde aparecen."""
    found = {}
    def add(text, where):
        text = unescape(text)
        if text.strip() and re.search(r'[A-Za-zÁÉÍÓÚÑáéíóúñ¿¡]', text):
            found.setdefault(text, where)
    for f in sorted((SRC / 'js').glob('*.js')) + sorted((SRC / 'extra').glob('*.js')):
        code = re.sub(r'/\*.*?\*/', '', f.read_text(encoding='utf-8'), flags=re.S)  # sin comentarios
        for m in re.finditer(r'(?<![\w$.])N?_\(\s*(?:' + STR + ')', code):
            add(m.group(1) if m.group(1) is not None else m.group(2), f.name)
        for line in code.splitlines():  # nombres y descripciones de cada juego
            if re.search(r"\{id:'[^']+',age:'", line):
                for key in ('name', 'what'):
                    m = re.search(r'\b' + key + r':(?:' + STR + ')', line)
                    if m:
                        add(m.group(1) if m.group(1) is not None else m.group(2), f.name)
    for f in [SRC / 'pagina.html'] + sorted((SRC / 'extra').glob('*.html')):
        page = f.read_text(encoding='utf-8')
        for m in re.finditer(r'<(\w+)[^>]*\sdata-t(?:\s[^>]*)?>(.*?)</\1>', page, re.S):
            add(m.group(2).strip(), f.name)
        for m in re.finditer(r'data-ta="([^"]*)"', page):
            add(m.group(1), f.name)
    return found


def data_keys():
    keys = {}
    for f in sorted((SRC / 'js').glob('*.js')):
        for k in re.findall(r'DATA\.es\.(\w+)\s*=(?!=)', f.read_text(encoding='utf-8')):
            keys.setdefault(k, f.name)
    return keys


def needs_map():
    """Qué juegos dejan de verse si falta cada lista."""
    out = {}
    for f in sorted((SRC / 'js').glob('*.js')):
        for line in f.read_text(encoding='utf-8').splitlines():
            m, n = re.search(r"\{id:'([^']+)'", line), re.search(r'needs:\[([^\]]*)\]', line)
            if m and n:
                for k in re.findall(r"'(\w+)'", n.group(1)):
                    out.setdefault(k, []).append(m.group(1))
    return out


def pack(code):
    files = sorted((SRC / 'idiomas').glob(f'{code}.js')) + sorted((SRC / 'idiomas').glob(f'{code}-*.js'))
    files = [f for f in files if not f.name.endswith('-pendiente.js')]
    text = '\n'.join(f.read_text(encoding='utf-8') for f in files)
    t = {unescape(m.group(1) if m.group(1) is not None else m.group(2)) for m in re.finditer(r'(?:^|[{,])\s*(?:' + STR + r')\s*:', text, re.M)}
    data = set(re.findall(r'LANGS\.' + re.escape(code) + r'\.data\.(\w+)\s*=', text))
    return files, t, data


def main(argv):
    if not argv or argv[0].startswith('-'):
        print(__doc__)
        return 1
    code, opts = argv[0], set(argv[1:])
    texts, keys, needs = source_texts(), data_keys(), needs_map()
    files, t, data = pack(code)
    if not files:
        print(f'No hay ningún archivo src/idiomas/{code}.js todavía. Copia src/idiomas/en.js como punto de partida.')
    missing = [s for s in texts if s not in t]
    unused = sorted(s for s in t if s not in texts and re.search(r'[A-Za-zÁÉÍÓÚÑáéíóúñ]', s) and not s.isidentifier())
    lack = [k for k in keys if k not in data]
    print(f'Idioma {code}: {len(texts) - len(missing)} de {len(texts)} textos traducidos, {len(keys) - len(lack)} de {len(keys)} listas de datos.')
    if lack:
        print('\nListas de datos que faltan:')
        for k in lack:
            hidden = needs.get(k)
            print(f'  {k:16} ({keys[k]})  ' + (f'sin ella no se ven: {", ".join(hidden)}' if hidden else 'sin ella se usa la lista en español'))
    if missing:
        print(f'\nTextos sin traducir: {len(missing)}' + ('' if '--todo' in opts else ' (añade --todo para verlos todos)'))
        for s in missing if '--todo' in opts else missing[:15]:
            print(f'  [{texts[s]}] {s!r}')
    if unused and '--todo' in opts:
        print(f'\nTraducciones que ya no se usan ({len(unused)}):')
        for s in unused:
            print(f'  {s!r}')
    if '--plantilla' in opts:
        out = SRC / 'idiomas' / f'{code}-pendiente.js'
        q = lambda s: "'" + s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n') + "'"
        body = ''.join(f'  {q(s)}: {q(s)},  // {texts[s]}\n' for s in missing)
        out.write_text(f'/* Textos que faltan en «{code}». Traduce la parte de la derecha y copia las líneas dentro de t:{{…}} en src/idiomas/{code}.js.\n'
                       f'   Deja igual lo que va entre llaves, como {{n}}: se rellena solo. Después borra este archivo. */\n'
                       f'const PENDIENTE_{code.upper()}={{\n{body}}};\n', encoding='utf-8')
        print(f'\nPlantilla escrita en {out.relative_to(ROOT)} (no se incluye en la web hasta que la copies).')
    return 1 if (missing or lack) else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
