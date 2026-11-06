"""
Fix WhatsApp floating button: replace ugly SVG with official WhatsApp icon,
fix ripple ring styling, and rebuild all route handlers.
"""
import os, re, json

# Official WhatsApp SVG icon (clean, crisp, correct proportions)
OFFICIAL_WA_SVG = '<svg viewBox="0 0 24 24" class="tt-wa-icon" aria-hidden="true"><path fill="#ffffff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'

# New clean button HTML
WA_BUTTON_HTML = '''<a class="tt-floating-whatsapp" href="https://wa.me/5511947485091?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o." target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">
  <span class="tt-wa-tooltip">
    <span class="tt-wa-status-dot"></span>
    <span class="tt-wa-tooltip-text">Or\u00e7amento no WhatsApp</span>
  </span>
  <span class="tt-wa-btn-circle">
    <span class="tt-wa-ring tt-wa-ring-1"></span>
    <span class="tt-wa-ring tt-wa-ring-2"></span>
    ''' + OFFICIAL_WA_SVG + '''
  </span>
</a>'''

# New improved CSS (fix ring color to green, better sizing, cleaner look)
NEW_WA_CSS = """
/* TraduzTudo Motion Floating WhatsApp Button */
.tt-floating-whatsapp{position:fixed;right:clamp(18px,2.8vw,32px);bottom:clamp(18px,2.8vw,32px);z-index:998;display:flex;align-items:center;gap:12px;text-decoration:none!important;user-select:none;-webkit-user-select:none;pointer-events:auto;transition:transform .4s cubic-bezier(.22,1,.36,1);animation:tt-wa-enter .8s cubic-bezier(.22,1,.36,1) both}
.tt-floating-whatsapp:hover{transform:translateY(-4px) scale(1.03)}
.tt-wa-btn-circle{position:relative;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#25D366 0%,#128C7E 100%);color:#fff;display:grid;place-items:center;box-shadow:0 6px 20px rgba(37,211,102,.4),0 2px 6px rgba(0,0,0,.1);transition:all .4s cubic-bezier(.22,1,.36,1);animation:tt-wa-float 3s ease-in-out infinite}
.tt-floating-whatsapp:hover .tt-wa-btn-circle{box-shadow:0 10px 30px rgba(37,211,102,.55),0 4px 12px rgba(0,0,0,.15);transform:scale(1.08)}
.tt-wa-icon{width:34px;height:34px;fill:#fff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.12));transition:transform .4s cubic-bezier(.22,1,.36,1)}
.tt-floating-whatsapp:hover .tt-wa-icon{transform:rotate(6deg) scale(1.08)}
.tt-wa-ring{position:absolute;inset:-6px;border-radius:50%;border:2.5px solid rgba(37,211,102,.6);opacity:0;pointer-events:none;animation:tt-wa-ripple 3s ease-out infinite}
.tt-wa-ring-2{animation-delay:1.5s}
.tt-wa-tooltip{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#002b49;padding:10px 18px;border-radius:999px;box-shadow:0 4px 16px rgba(0,0,0,.1),0 1px 4px rgba(0,0,0,.06);border:1px solid rgba(37,211,102,.2);font-family:var(--body,'Gilroy',sans-serif);font-weight:700;font-size:14px;white-space:nowrap;letter-spacing:-.01em;transition:all .3s cubic-bezier(.22,1,.36,1);animation:tt-wa-slide-in .8s .6s cubic-bezier(.22,1,.36,1) both}
.tt-wa-status-dot{width:9px;height:9px;border-radius:50%;background:#25D366;box-shadow:0 0 0 3px rgba(37,211,102,.25);animation:tt-wa-dot-pulse 2s infinite}
.tt-floating-whatsapp:hover .tt-wa-tooltip{border-color:#25D366;box-shadow:0 6px 20px rgba(0,0,0,.14)}
@keyframes tt-wa-ripple{0%{transform:scale(.95);opacity:.7}100%{transform:scale(1.7);opacity:0}}
@keyframes tt-wa-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes tt-wa-dot-pulse{0%,100%{transform:scale(1);box-shadow:0 0 0 3px rgba(37,211,102,.25)}50%{transform:scale(1.15);box-shadow:0 0 0 5px rgba(37,211,102,.45)}}
@keyframes tt-wa-enter{0%{opacity:0;transform:translateY(30px) scale(.8)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes tt-wa-slide-in{0%{opacity:0;transform:translateX(12px)}100%{opacity:1;transform:translateX(0)}}
@media(max-width:760px){.tt-wa-tooltip{display:none}.tt-wa-btn-circle{width:58px;height:58px}.tt-wa-icon{width:30px;height:30px}}
"""

# JS injection snippet (with official SVG)
WA_JS_SVG_INLINE = OFFICIAL_WA_SVG.replace('"', '\\"')
WA_JS_INJECTION = 'let w=document.querySelector(".tt-floating-whatsapp");if(!w){w=document.createElement("a");w.className="tt-floating-whatsapp";w.href="https://wa.me/5511947485091?text="+encodeURIComponent("Olá! Gostaria de um orçamento de tradução.");w.target="_blank";w.rel="noopener noreferrer";w.setAttribute("aria-label","Fale conosco pelo WhatsApp");w.innerHTML=`<span class="tt-wa-tooltip"><span class="tt-wa-status-dot"></span><span class="tt-wa-tooltip-text">Orçamento no WhatsApp</span></span><span class="tt-wa-btn-circle"><span class="tt-wa-ring tt-wa-ring-1"></span><span class="tt-wa-ring tt-wa-ring-2"></span>' + OFFICIAL_WA_SVG + '</span>`;document.body.append(w);}'

# ===== 1. Fix brand.css in both locations =====
def fix_brand_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    # Remove old WA CSS block
    content = re.sub(
        r'\n?/\* TraduzTudo Motion Floating WhatsApp Button \*/.*?@media\(max-width:760px\)\{\.tt-wa-tooltip\{display:none\}\}',
        '', content, flags=re.DOTALL
    )
    content = content.rstrip() + '\n' + NEW_WA_CSS.strip() + '\n'
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed brand.css: {filepath}")

fix_brand_css('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/assets/brand.css')
fix_brand_css('c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/assets/brand.css')

# ===== 2. Fix common-runtime-v2.js in both locations =====
def fix_runtime_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()
    # Replace the old WA injection with the new one
    # Find the old injection pattern
    old_pattern = r'let w=document\.querySelector\("\.tt-floating-whatsapp"\);if\(!w\)\{.*?\}(?=\})'
    match = re.search(old_pattern, code, re.DOTALL)
    if match:
        code = code[:match.start()] + WA_JS_INJECTION + code[match.end():]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(code)
        print(f"Fixed runtime JS: {filepath}")
    else:
        print(f"Could not find old WA injection in {filepath}")

fix_runtime_js('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/assets/common-runtime-v2.js')
fix_runtime_js('c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/assets/common-runtime-v2.js')

# ===== 3. Fix HTML files in dist =====
dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'
html_files = [
    'index.html', 'orcamento.html', 'servicos.html', 'servico.html',
    'sobre.html', 'contato.html', 'privacidade.html', 'termos-de-uso.html'
]

for filename in html_files:
    filepath = os.path.join(dist_dir, filename)
    if not os.path.exists(filepath):
        print(f"Skipped (not found): {filename}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    # Remove old wa button
    html = re.sub(r'<a class="tt-floating-whatsapp".*?</a>', '', html, flags=re.DOTALL)
    # Insert new button before </body>
    if '</body>' in html:
        html = html.replace('</body>', WA_BUTTON_HTML + '\n</body>')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Fixed HTML: {filename}")

# ===== 4. Rebuild Next.js route handlers =====
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
    with open(html_path, 'r', encoding='utf-8') as f:
        html_str = f.read()

    escaped_json = json.dumps(html_str, ensure_ascii=False)
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
    print(f"Rebuilt route: {route_path}")

print("\n✅ WhatsApp button fixed with official icon everywhere!")
