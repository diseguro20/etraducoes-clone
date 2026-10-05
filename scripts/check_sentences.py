import os, re

files = [
    'src/app/avaliacoes/page.tsx',
    'src/app/trabalhe-conosco/page.tsx',
    'src/app/programa-de-parceiros/page.tsx',
    'src/app/traducao-de-arabe/page.tsx',
    'src/app/traducao-de-documentos/page.tsx',
    'src/app/traducao-juramentada/page.tsx',
]

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
            c = fp.read()
            for m in re.finditer(r'(.{0,60}(?:curitiba|joinville|madison|marechal|calogeras).{0,60})', c, re.IGNORECASE):
                print(f"{f}: {m.group(0).strip()}")
