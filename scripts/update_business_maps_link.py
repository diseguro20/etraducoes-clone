"""Replace shortlink with Google Maps Universal Business Profile URL."""
import os, json

OLD_LINK = "https://maps.app.goo.gl/YVvTyVbkHLQckPfF6"
# Google Maps Universal Cross-Platform Business Profile URL
NEW_LINK = "https://www.google.com/maps/search/?api=1&query=Traduz+Tudo&query_place_id=ChIJF8x2AyL5zpQRGPTDBDC44uY"

dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'
html_files = [
    'index.html', 'orcamento.html', 'servicos.html', 'servico.html',
    'sobre.html', 'contato.html', 'privacidade.html', 'termos-de-uso.html'
]

for f in html_files:
    fp = os.path.join(dist_dir, f)
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8') as fh:
        html = fh.read()
    if OLD_LINK in html:
        html = html.replace(OLD_LINK, NEW_LINK)
        with open(fp, 'w', encoding='utf-8') as fh:
            fh.write(html)
        print(f"Replaced in: {f}")
    else:
        print(f"Not found in: {f}")

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
    with open(html_path, 'r', encoding='utf-8') as fh:
        html_str = fh.read()
    escaped_json = json.dumps(html_str, ensure_ascii=False)
    route_content = "import { NextResponse } from 'next/server';\n\nexport const runtime = 'nodejs';\nexport const dynamic = 'force-static';\n\nconst htmlContent = " + escaped_json + ";\n\nexport async function GET() {\n  return new NextResponse(htmlContent, {\n    status: 200,\n    headers: {\n      'Content-Type': 'text/html; charset=utf-8',\n      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',\n    },\n  });\n}\n"
    with open(route_path, 'w', encoding='utf-8') as fh:
        fh.write(route_content)
    print(f"Rebuilt route: {route_path}")

print("All routes and HTML files updated successfully!")
