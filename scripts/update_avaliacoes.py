import re

with open('src/app/avaliacoes/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Update description
c = c.replace(
    'em mais de +1.352 avaliações reais no Google de São Paulo, Curitiba e Joinville.',
    'em mais de +1.352 avaliações reais e verificadas no Google.'
)

# Update subtitle
c = c.replace(
    'avaliações reais e verificadas do Google nas unidades de São Paulo, Curitiba e Joinville.',
    'avaliações reais e verificadas do Google de clientes de todo o Brasil.'
)

# Remove Curitiba and Joinville chips
c = re.sub(r'<a class=\\"rv-chip\s*\\" href=\\"/avaliacoes\?place=PR\\">Curitiba</a>\s*', '', c)
c = re.sub(r'<a class=\\"rv-chip\s*\\" href=\\"/avaliacoes\?place=SC\\">Joinville</a>\s*', '', c)

with open('src/app/avaliacoes/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("Updated avaliacoes/page.tsx")
