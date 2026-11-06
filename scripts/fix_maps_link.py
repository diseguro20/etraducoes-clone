"""Replace old Google Maps link with official short link in all HTML files + rebuild routes."""
import os, re, json

OLD_LINK = "https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP"
NEW_LINK = "https://maps.app.goo.gl/YVvTyVbkHLQckPfF6"

dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'
html_files = ['index.html','orcamento.html','servicos.html','servico.html','sobre.html','contato.html','privacidade.html','termos-de-uso.html']

for f in html_files:
    fp = os.path.join(dist_dir, f)
    if not os.path.exists(fp): continue
    with open(fp,'r',encoding='utf-8') as fh: html = fh.read()
    if OLD_LINK in html:
        html = html.replace(OLD_LINK, NEW_LINK)
        with open(fp,'w',encoding='utf-8') as fh: fh.write(html)
        print(f"Fixed maps link: {f}")
    else:
        print(f"Already OK or not found: {f}")

# Rebuild route handlers
route_map = {
    'index.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/route.ts',
    'orcamento.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/orcamento/route.ts',
    'servicos.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/servicos/route.ts',
    'servico.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/servico/route.ts',
    'sobre.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/sobre/route.ts',
    'contato.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/contato/route.ts',
    'privacidade.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/privacidade/route.ts',
    'termos-de-uso.html': 'c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/termos-de-uso/route.ts',
}

for html_file, route_path in route_map.items():
    html_path = os.path.join(dist_dir, html_file)
    with open(html_path, 'r', encoding='utf-8') as fh: html_str = fh.read()
    escaped_json = json.dumps(html_str, ensure_ascii=False)
    route_content = "import { NextResponse } from 'next/server';\n\nexport const runtime = 'nodejs';\nexport const dynamic = 'force-static';\n\nconst htmlContent = " + escaped_json + ";\n\nexport async function GET() {\n  return new NextResponse(htmlContent, {\n    status: 200,\n    headers: {\n      'Content-Type': 'text/html; charset=utf-8',\n      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',\n    },\n  });\n}\n"
    with open(route_path, 'w', encoding='utf-8') as fh: fh.write(route_content)
    print(f"Route rebuilt: {route_path}")

print("Done - all maps links updated!")
