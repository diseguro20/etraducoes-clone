import re

# 1. Update src/components/layout/Footer.tsx
with open('src/components/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    footer_content = f.read()

# Pattern for the entire office div in Footer.tsx
footer_office_pattern = re.compile(
    r'<div class=\\"col-xl-4 footer-right-border footer-paddtop\\">\\n\s*<span class=\\"title-footer\\">\\n\s*Escrit[^\\]*em:</span>.*?</div>\\n\s*</div>\\n\s*<div class=\\"col-xl-4 footer-paddtop\\">',
    re.DOTALL
)

new_footer_office = """<div class=\\"col-xl-4 footer-right-border footer-paddtop\\">\\n          <span class=\\"title-footer\\">\\n            Escritório de tradução em:</span> <a title=\\"Agência de Tradução em São Paulo\\" href=\\"/agencia-de-traducao-em-sao-paulo\\"><span\\n              class=\\"subtitle-footer\\">São Paulo - SP</span>\\n            <div class=\\"ds-flex footer-local\\"><i class=\\"far fa-map-marker-alt\\"></i>\\n              <div>\\n                <p>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</p>\\n                <p>CEP: 02962-100</p>\\n              </div>\\n            </div>\\n          </a>\\n\\n        </div>\\n        <div class=\\"col-xl-4 footer-paddtop\\">"""

assert footer_office_pattern.search(footer_content), "Footer office pattern didn't match"
footer_content = footer_office_pattern.sub(new_footer_office, footer_content)

with open('src/components/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(footer_content)

print("1. Successfully updated Footer.tsx")
