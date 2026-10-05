import re

# 1. Update src/app/contato/page.tsx
with open('src/app/contato/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

idx1 = c.find('<span class=\\"sub-blue\\">ENDERE')
idx2 = c.find('</section>', idx1)

new_contato_section = (
    '<span class=\\"sub-blue\\">NOSSO ESCRITÓRIO</span>\\n'
    '            <div class=\\"row\\">\\n\\n'
    '                <div class=\\"col-xl-6 col-lg-8 mb-5\\">\\n'
    '                    <h2 class=\\"title-md\\">São Paulo</h2>\\n'
    '                    <div id=\\"map_canvas_sp\\"></div>\\n'
    '                    <div class=\\"ds-flex agency-content\\">\\n'
    '                        <img class=\\"lazyload\\" src=\\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\\" data-src=\\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\\" alt=\\"\\" />\\n'
    '                        <div>\\n'
    '                            <span>Agência de Tradução em <strong>São Paulo</strong></span>\\n'
    '                            <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</p>\\n'
    '                            <p>CEP: 02962-100 - São Paulo - SP</p>\\n'
    '                            <a href=\\"https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP\\" target=\\"_blank\\"><i\\n'
    '                                    class=\\"far fa-external-link\\"></i>Abrir no mapa</a>\\n'
    '                        </div>\\n'
    '                    </div>\\n'
    '                </div>\\n'
    '            </div>\\n'
    '        </div>\\n'
    '    </div>\\n'
)

c = c[:idx1] + new_contato_section + c[idx2:]
with open('src/app/contato/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated contato/page.tsx")


# 2. Update src/app/perguntas-frequentes/page.tsx
with open('src/app/perguntas-frequentes/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace FAQ answer 1
c = re.sub(
    r'Nossos escrit[^\\]*rios de Curitiba e S[^\\]*o Paulo atendem das 9:00',
    'Nosso escritório de São Paulo atende das 9:00',
    c
)

# Replace FAQ answer 2
c = re.sub(
    r'Possu[^\\]*mos escrit[^\\]*rios em Curitiba e S[^\\]*o Paulo, por[^\\]*m atendemos',
    'Possuímos escritório em São Paulo, porém atendemos',
    c
)

# Replace Sidebar offices
sidebar_pattern = re.compile(
    r'<div class=\\"d-flex align-items-start\\">\\n\s*<i class=\\"far fa-map-marker-alt\\"></i>\\n\\n\s*<div>.*?</div>\\n\s*</div>\\n\s*</div>\\n\s*</div>\\n\s*</div>\\n\s*</div>\\n\s*</div>\\n\s*</div>\\n</section>',
    re.DOTALL
)

new_faq_sidebar = (
    '<div class=\\"d-flex align-items-start\\">\\n'
    '                            <i class=\\"far fa-map-marker-alt\\"></i>\\n\\n'
    '                            <div>\\n'
    '                                <div>\\n'
    '                                    <h3>São Paulo - SP</h3>\\n'
    '                                    <a title=\\"Agência de Tradução em São Paulo\\" href=\\"/agencia-de-traducao-em-sao-paulo\\">\\n'
    '                                        <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2<br>\\n'
    '                                            CEP: 02962-100</p>\\n'
    '                                    </a>\\n'
    '                                </div>\\n'
    '                            </div>\\n'
    '                        </div>\\n'
    '                    </div>\\n'
    '                </div>\\n'
    '            </div>\\n'
    '        </div>\\n'
    '    </div>\\n'
    '</section>'
)

idx_sb = c.find('fa-map-marker-alt')
idx_sb_start = c.rfind('<div class=\\"d-flex align-items-start\\">', 0, idx_sb)
idx_sb_end = c.find('</section>', idx_sb) + len('</section>')
c = c[:idx_sb_start] + new_faq_sidebar + c[idx_sb_end:]

with open('src/app/perguntas-frequentes/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated perguntas-frequentes/page.tsx")


# 3. Update src/app/agencia-de-traducao-em-sao-paulo/page.tsx
with open('src/app/agencia-de-traducao-em-sao-paulo/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace address in main card
c = re.sub(
    r'<p>Avenida Ang[^\\]*lica, n[^\\]* 2447, Sala 41</p>\\n\s*<p>Consola[^\\]*o [^\\]* CEP: 01\.227-200</p>',
    '<p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</p>\\n                                <p>CEP: 02962-100 - São Paulo - SP</p>',
    c
)

c = c.replace(
    'https://goo.gl/maps/ZYFQqgKZDRAYkurv5',
    'https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP'
)

# In sidebar of SP page, remove Curitiba and keep only SP
idx_cur = c.find('<h3>Curitiba - PR</h3>')
if idx_cur != -1:
    idx_block_start = c.rfind('<div>', 0, idx_cur)
    idx_sp = c.find('<div class=\\"mt-3\\">', idx_cur)
    idx_sp_end = c.find('</div>', idx_sp + len('<div class=\\"mt-3\\">'))
    # Extract SP content
    new_sp_sidebar = (
        '<div>\\n'
        '                                        <h3>São Paulo - SP</h3>\\n'
        '                                        <a title=\\"Abrir no mapa\\" href=\\"https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP\\"\\n'
        '                                           target=\\"_blank\\">\\n'
        '                                            <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2<br>\\n'
        '                                                CEP: 02962-100</p>\\n'
        '                                        </a>\\n'
        '                                    </div>'
    )
    idx_outer_end = c.find('</div>\\n                            </div>\\n                        </div>', idx_cur)
    c = c[:idx_block_start] + new_sp_sidebar + c[idx_outer_end:]

with open('src/app/agencia-de-traducao-em-sao-paulo/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated agencia-de-traducao-em-sao-paulo/page.tsx")


# 4. Update src/app/empresa-de-traducao/page.tsx
with open('src/app/empresa-de-traducao/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(
    r'Possui ag[^\\]*ncias de tradu[^\\]*o em S[^\\]*o Paulo e Curitiba\.',
    'Possui escritório de tradução em São Paulo.',
    c
)

idx1 = c.find('nossa-agencia1.jpg')
if idx1 != -1:
    idx_col_start = c.rfind('<div class=\\"col-xl-5 col-lg-6\\">', 0, idx1)
    idx_row_end = c.find('</div>\\n            </div>\\n        </div>\\n    </div>\\n</section>', idx1)
    new_agency_block = (
        '<div class=\\"col-xl-6 col-lg-8 mx-auto\\">\\n'
        '                    <img style=\\"width: 100%\\" class=\\"radius agency-img-two\\"\\n'
        '                         src=\\"https://www.etraducoes.com.br/themes/web/assets/img/nossa-agencia2.jpg\\" alt=\\"Escritório TraduzTudo São Paulo\\"/>\\n'
        '                    <div class=\\"ds-flex agency-content \\">\\n'
        '                        <img class=\\"lazyload\\" src=\\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\\" data-src=\\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\\" alt=\\"\\"/>\\n'
        '                        <div>\\n'
        '                            <span>Agência de Tradução em <strong>São Paulo</strong></span>\\n'
        '                            <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</p>\\n'
        '                            <p>CEP: 02962-100 - São Paulo - SP</p>\\n'
        '                            <a href=\\"https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP\\" target=\\"_blank\\"><i\\n'
        '                                        class=\\"far fa-external-link\\"></i>Abrir no mapa</a>\\n'
        '                        </div>\\n'
        '                    </div>\\n'
        '                </div>'
    )
    c = c[:idx_col_start] + new_agency_block + c[idx_row_end:]

with open('src/app/empresa-de-traducao/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated empresa-de-traducao/page.tsx")


# 5. Update src/app/etraducoes-e-confiavel/page.tsx
with open('src/app/etraducoes-e-confiavel/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

idx1 = c.find('nossa-agencia1.jpg')
if idx1 != -1:
    idx_col_start = c.rfind('<div class=\\"col-xl-5 col-lg-6\\">', 0, idx1)
    idx_row_end = c.find('</div>\\n            </div>\\n        </div>\\n    </div>\\n</section>', idx1)
    new_agency_block = (
        '<div class=\\"col-xl-6 col-lg-8 mx-auto\\">\\n'
        '                    <img style=\\"width: 100%\\" class=\\"radius agency-img-two\\"\\n'
        '                         src=\\"https://www.etraducoes.com.br/themes/web/assets/img/nossa-agencia2.jpg\\" alt=\\"Escritório TraduzTudo São Paulo\\"/>\\n'
        '                    <div class=\\"ds-flex agency-content \\">\\n'
        '                        <img class=\\"lazyload\\" src=\\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\\" data-src=\\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\\" alt=\\"\\"/>\\n'
        '                        <div>\\n'
        '                            <span>Agência de Tradução em <strong>São Paulo</strong></span>\\n'
        '                            <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</p>\\n'
        '                            <p>CEP: 02962-100 - São Paulo - SP</p>\\n'
        '                            <a href=\\"https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP\\" target=\\"_blank\\"><i\\n'
        '                                        class=\\"far fa-external-link\\"></i>Abrir no mapa</a>\\n'
        '                        </div>\\n'
        '                    </div>\\n'
        '                </div>'
    )
    c = c[:idx_col_start] + new_agency_block + c[idx_row_end:]

with open('src/app/etraducoes-e-confiavel/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated etraducoes-e-confiavel/page.tsx")


# 6. Update src/app/trabalhe-conosco/page.tsx
with open('src/app/trabalhe-conosco/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(r'Ag[^\\]*ncias em Curitiba e S[^\\]*o Paulo\.', 'Escritório em São Paulo.', c)
c = re.sub(r'Possu[^\\]*mos ag[^\\]*ncias de tradu[^\\]*o em Curitiba e S[^\\]*o Paulo\.', 'Possuímos agência de tradução em São Paulo.', c)
c = c.replace('Comercial Pleno em Joinville (SC)', 'Comercial Pleno em São Paulo (SP)')
c = c.replace('para time comercial em Joinville (SC)', 'para time comercial em São Paulo (SP)')
c = c.replace('joinville</span>', 'São Paulo</span>')
c = c.replace('Joinville</span>', 'São Paulo</span>')

with open('src/app/trabalhe-conosco/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated trabalhe-conosco/page.tsx")


# 7. Update src/app/programa-de-parceiros/page.tsx
with open('src/app/programa-de-parceiros/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = re.sub(r'Escrit[^\\]*rios em S[^\\]*o Paulo, Curitiba e Joinville\.', 'Escritório localizado em São Paulo - SP.', c)
with open('src/app/programa-de-parceiros/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated programa-de-parceiros/page.tsx")


# 8. Update src/app/traducao-de-documentos/page.tsx
with open('src/app/traducao-de-documentos/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = re.sub(r'Escrit[^\\]*rios em S[^\\]*o Paulo e Curitiba\.', 'Escritório localizado em São Paulo - SP.', c)
with open('src/app/traducao-de-documentos/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated traducao-de-documentos/page.tsx")


# 9. Update src/app/traducao-juramentada/page.tsx
with open('src/app/traducao-juramentada/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = re.sub(r'Ag[^\\]*ncias em Curitiba, S[^\\]*o Paulo SP e Joinville SC\.', 'Escritório localizado em São Paulo - SP.', c)
with open('src/app/traducao-juramentada/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated traducao-juramentada/page.tsx")

print("All office files processed successfully!")
