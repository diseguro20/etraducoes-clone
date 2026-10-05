with open('src/components/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

idx1 = c.find('col-xl-4 footer-right-border')
idx2 = c.find('<div class=\\"col-xl-4 footer-paddtop\\">')

old_chunk = c[idx1:idx2]
new_chunk = (
    'col-xl-4 footer-right-border footer-paddtop\\">\\n'
    '          <span class=\\"title-footer\\">\\n'
    '            Escritório de tradução em:</span> <a title=\\"Agência de Tradução em São Paulo\\" href=\\"/agencia-de-traducao-em-sao-paulo\\"><span\\n'
    '              class=\\"subtitle-footer\\">São Paulo - SP</span>\\n'
    '            <div class=\\"ds-flex footer-local\\"><i class=\\"far fa-map-marker-alt\\"></i>\\n'
    '              <div>\\n'
    '                <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</p>\\n'
    '                <p>CEP: 02962-100</p>\\n'
    '              </div>\\n'
    '            </div>\\n'
    '          </a>\\n\\n'
    '        </div>\\n        '
)

updated = c[:idx1] + new_chunk + c[idx2:]

with open('src/components/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(updated)

print("Updated Footer.tsx successfully!")
