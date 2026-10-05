import re

# 1. Update src/app/avaliacoes/page.tsx
with open('src/app/avaliacoes/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'unidades de São Paulo, Curitiba e Joinville',
    'TraduzTudo em São Paulo e atendimento em todo o Brasil'
)
with open('src/app/avaliacoes/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Cleaned avaliacoes/page.tsx")

# 2. Update src/app/trabalhe-conosco/page.tsx
with open('src/app/trabalhe-conosco/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('/vaga/comercial-pleno-em-joinville', '/contato')
c = c.replace('https://www.etraducoes.com.br/vaga/comercial-pleno-em-joinville', '/contato')
with open('src/app/trabalhe-conosco/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Cleaned trabalhe-conosco/page.tsx")

# 3. Update src/app/programa-de-parceiros/page.tsx
with open('src/app/programa-de-parceiros/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('pesquisei em Curitiba.', 'pesquisei.')
with open('src/app/programa-de-parceiros/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Cleaned programa-de-parceiros/page.tsx")

# 4. Update src/app/traducao-juramentada-para-cidadania-italiana/page.tsx
with open('src/app/traducao-juramentada-para-cidadania-italiana/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('italiano em Curitiba.', 'italiano em São Paulo.')
with open('src/app/traducao-juramentada-para-cidadania-italiana/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Cleaned cidadania-italiana/page.tsx")

# 5. Clean reviews mentioning "Com escritorio em nossa cidade de joinville"
review_files = [
    'src/app/traducao-de-arabe/page.tsx',
    'src/app/traducao-de-coreano/page.tsx',
    'src/app/traducao-de-italiano/page.tsx',
    'src/app/traducao-juramentada-coreano/page.tsx',
    'src/app/traducao-juramentada-hebraico/page.tsx',
    'src/app/traducao-mandarim/page.tsx',
    'src/app/traducao-russo/page.tsx',
]

for rf in review_files:
    with open(rf, 'r', encoding='utf-8') as f:
        c = f.read()
    c = re.sub(r'Com escritorio\s+em nossa cidade\s+de joinville\s+', 'Com atendimento rápido para ', c, flags=re.IGNORECASE)
    with open(rf, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"Cleaned {rf}")

print("All remaining files cleaned!")
