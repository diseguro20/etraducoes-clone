import os
import json
import re

orcamento_path = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/orcamento.html'
with open(orcamento_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Make email field optional
old_email_pattern = re.compile(
    r'<label>E-mail\s*<span[^>]*>\(obrigat[^\)]*\)</span>\s*<input name="email" type="email" required autocomplete="email" placeholder="voce@exemplo\.com"></label>'
)

new_email_field = '<label>E-mail <span>(opcional)</span><input name="email" type="email" autocomplete="email" placeholder="voce@exemplo.com"></label>'

assert old_email_pattern.search(html), "Email field pattern not found in orcamento.html"
html = old_email_pattern.sub(new_email_field, html)

with open(orcamento_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated traduztudo-motion/dist/orcamento.html: email is now optional")

# Update etraducoes-clone/src/app/orcamento/route.ts
route_path = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/orcamento/route.ts'
escaped_json = json.dumps(html, ensure_ascii=False)
route_content = """import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const htmlContent = """ + escaped_json + """;

export async function GET() {
  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
"""
with open(route_path, 'w', encoding='utf-8') as f:
    f.write(route_content)
print("Updated etraducoes-clone/src/app/orcamento/route.ts")

# Update pages-v2.js in both places
def update_pages_js(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Ensure fallback email handles empty email with phone identifier
    old_code = "email: email || 'contato@traduztudo.com',"
    new_code = "email: email || `${(telefone || 'cliente').replace(/\\D/g, '')}@whatsapp.traduztudo.com`,"
    if old_code in code:
        code = code.replace(old_code, new_code)
        print(f"Updated saas payload email fallback in {js_path}")

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(code)

update_pages_js('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/assets/pages-v2.js')
update_pages_js('c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/assets/pages-v2.js')

print("All email optional updates completed successfully!")
