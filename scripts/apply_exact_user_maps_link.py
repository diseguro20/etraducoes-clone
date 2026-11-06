"""Replace all Google Maps links with the EXACT URL requested by the user."""
import os, json, re

EXACT_USER_MAPS_URL = "https://www.google.com/maps/place/Traduz+Tudo/@-23.4895648,-46.7010797,1162m/data=!3m1!1e3!4m15!1m8!3m7!1s0x94cef9ae71e2febb:0xfc103cd1a7bcfe10!2sR.+Monsenhor+Janu%C3%A1rio+Sangirardi,+135+-+Vila+Cavaton,+S%C3%A3o+Paulo+-+SP,+02962-100!3b1!8m2!3d-23.4895648!4d-46.7010797!16s%2Fg%2F11c4jypt4m!3m5!1s0x94cef9220376cc17:0xe6e2b83004c3f418!8m2!3d-23.4895648!4d-46.7010797!16s%2Fg%2F11zy3fz9_6?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D"

dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'
html_files = [
    'index.html', 'orcamento.html', 'servicos.html', 'servico.html',
    'sobre.html', 'contato.html', 'privacidade.html', 'termos-de-uso.html'
]

# We will regex replace any href pointing to google.com/maps or maps.app.goo.gl in the footer
for f in html_files:
    fp = os.path.join(dist_dir, f)
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8') as fh:
        html = fh.read()

    # Replace href="https://...maps..." with exact URL
    def replace_maps_href(match):
        return f'href="{EXACT_USER_MAPS_URL}"'

    html = re.sub(r'href="https?://(?:www\.)?(?:google\.com/maps|maps\.app\.goo\.gl|maps\.google\.com)[^"]*"', replace_maps_href, html)

    with open(fp, 'w', encoding='utf-8') as fh:
        fh.write(html)
    print(f"Updated HTML: {f}")

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

print("Applied exact user Google Maps link everywhere!")
