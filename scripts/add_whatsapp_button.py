import os
import re
import json

wa_css = """
/* TraduzTudo Motion Floating WhatsApp Button */
.tt-floating-whatsapp{position:fixed;right:clamp(18px,2.8vw,32px);bottom:clamp(18px,2.8vw,32px);z-index:998;display:flex;align-items:center;gap:12px;text-decoration:none!important;user-select:none;-webkit-user-select:none;pointer-events:auto;transition:transform .4s cubic-bezier(.22,1,.36,1);animation:tt-wa-enter .8s cubic-bezier(.22,1,.36,1) both}
.tt-floating-whatsapp:hover{transform:translateY(-4px) scale(1.03)}
.tt-wa-btn-circle{position:relative;width:clamp(58px,4.4vw,68px);height:clamp(58px,4.4vw,68px);border-radius:50%;background:linear-gradient(135deg,#2fe574 0%,#25D366 50%,#17ad4f 100%);color:#ffffff;display:grid;place-items:center;box-shadow:0 10px 28px rgba(37,211,102,.45),0 2px 8px rgba(0,43,73,.15);transition:all .4s cubic-bezier(.22,1,.36,1);animation:tt-wa-float 4s ease-in-out infinite}
.tt-floating-whatsapp:hover .tt-wa-btn-circle{box-shadow:0 14px 36px rgba(37,211,102,.62),0 4px 14px rgba(0,43,73,.2);transform:scale(1.06)}
.tt-wa-icon{width:clamp(32px,2.5vw,38px);height:clamp(32px,2.5vw,38px);fill:#ffffff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.15));transition:transform .4s cubic-bezier(.22,1,.36,1)}
.tt-floating-whatsapp:hover .tt-wa-icon{transform:rotate(8deg) scale(1.1)}
.tt-wa-ring{position:absolute;inset:-6px;border-radius:50%;border:2px solid #25D366;opacity:0;pointer-events:none;animation:tt-wa-ripple 3.2s cubic-bezier(.1,.8,.3,1) infinite}
.tt-wa-ring-2{animation-delay:1.6s}
.tt-wa-tooltip{display:inline-flex;align-items:center;gap:8px;background:#ffffff;color:#002b49;padding:10px 18px;border-radius:999px;box-shadow:0 8px 24px rgba(0,43,73,.14),0 2px 6px rgba(0,43,73,.08);border:1px solid rgba(0,182,217,.22);font-family:var(--body,'Gilroy',sans-serif);font-weight:700;font-size:14px;white-space:nowrap;letter-spacing:-.01em;transition:all .3s cubic-bezier(.22,1,.36,1);animation:tt-wa-slide-in .8s .6s cubic-bezier(.22,1,.36,1) both}
.tt-wa-status-dot{width:9px;height:9px;border-radius:50%;background:#25D366;box-shadow:0 0 0 3px rgba(37,211,102,.25);animation:tt-wa-dot-pulse 2s infinite}
.tt-floating-whatsapp:hover .tt-wa-tooltip{border-color:#25D366;color:#0078d4;box-shadow:0 10px 30px rgba(0,43,73,.2)}
@keyframes tt-wa-ripple{0%{transform:scale(.9);opacity:.8}50%{opacity:.4}100%{transform:scale(1.6);opacity:0}}
@keyframes tt-wa-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes tt-wa-dot-pulse{0%,100%{transform:scale(1);box-shadow:0 0 0 3px rgba(37,211,102,.25)}50%{transform:scale(1.15);box-shadow:0 0 0 5px rgba(37,211,102,.45)}}
@keyframes tt-wa-enter{0%{opacity:0;transform:translateY(30px) scale(.8)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes tt-wa-slide-in{0%{opacity:0;transform:translateX(12px)}100%{opacity:1;transform:translateX(0)}}
@media(max-width:760px){.tt-wa-tooltip{display:none}}
"""

wa_button_html = """<a class="tt-floating-whatsapp" href="https://wa.me/5511947485091?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o." target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">
  <span class="tt-wa-tooltip">
    <span class="tt-wa-status-dot"></span>
    <span class="tt-wa-tooltip-text">Orçamento no WhatsApp</span>
  </span>
  <span class="tt-wa-btn-circle">
    <span class="tt-wa-ring tt-wa-ring-1"></span>
    <span class="tt-wa-ring tt-wa-ring-2"></span>
    <svg viewBox="0 0 32 32" class="tt-wa-icon" aria-hidden="true">
      <path fill="currentColor" d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A14 14 0 1 0 16 2zm0 25.5c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A11.5 11.5 0 1 1 27.5 16 11.5 11.5 0 0 1 16 27.5zm6.3-8.6c-.3-.2-2-.1-2.3-.2-.3 0-.6.1-.8.4-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1a10.1 10.1 0 0 1-5.7-5c-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.1-.6-.1-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.2 1.7 4.5c.2.2 3 4.6 7.3 6.4 4.3 1.9 4.3 1.3 5 1.2.8 0 2.5-1 2.9-2 .3-1 .3-1.8.2-2-.1-.2-.3-.3-.6-.5z"/>
    </svg>
  </span>
</a>"""

# 1. Append CSS to brand.css if not present
def append_brand_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if '.tt-floating-whatsapp' not in content:
        content += '\n' + wa_css.strip() + '\n'
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Appended WhatsApp CSS to {filepath}")
    else:
        print(f"WhatsApp CSS already present in {filepath}")

append_brand_css('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/assets/brand.css')
append_brand_css('c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/assets/brand.css')

# 2. Update common-runtime-v2.js to dynamically ensure floating whatsapp button
def update_common_runtime_wa(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    wa_js_injection = """let w=document.querySelector(".tt-floating-whatsapp");if(!w){w=document.createElement("a");w.className="tt-floating-whatsapp";w.href="https://wa.me/5511947485091?text="+encodeURIComponent("Olá! Gostaria de um orçamento de tradução.");w.target="_blank";w.rel="noopener noreferrer";w.setAttribute("aria-label","Fale conosco pelo WhatsApp");w.innerHTML=`<span class="tt-wa-tooltip"><span class="tt-wa-status-dot"></span><span class="tt-wa-tooltip-text">Orçamento no WhatsApp</span></span><span class="tt-wa-btn-circle"><span class="tt-wa-ring tt-wa-ring-1"></span><span class="tt-wa-ring tt-wa-ring-2"></span><svg viewBox="0 0 32 32" class="tt-wa-icon" aria-hidden="true"><path fill="currentColor" d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A14 14 0 1 0 16 2zm0 25.5c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A11.5 11.5 0 1 1 27.5 16 11.5 11.5 0 0 1 16 27.5zm6.3-8.6c-.3-.2-2-.1-2.3-.2-.3 0-.6.1-.8.4-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1a10.1 10.1 0 0 1-5.7-5c-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.1-.6-.1-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.2 1.7 4.5c.2.2 3 4.6 7.3 6.4 4.3 1.9 4.3 1.3 5 1.2.8 0 2.5-1 2.9-2 .3-1 .3-1.8.2-2-.1-.2-.3-.3-.6-.5z"/></svg></span>`;document.body.append(w);}"""

    target = 'document.body.append(...e.children,...r.children)}'
    replacement = 'document.body.append(...e.children,...r.children);' + wa_js_injection + '}'

    if 'tt-floating-whatsapp' not in code and target in code:
        code = code.replace(target, replacement)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(code)
        print(f"Injected WhatsApp button into {filepath}")
    else:
        print(f"common-runtime-v2.js already updated or target not found in {filepath}")

update_common_runtime_wa('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/assets/common-runtime-v2.js')
update_common_runtime_wa('c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/assets/common-runtime-v2.js')

# 3. Update HTML files in dist
dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'
html_files = [
    'index.html',
    'orcamento.html',
    'servicos.html',
    'servico.html',
    'sobre.html',
    'contato.html',
    'privacidade.html',
    'termos-de-uso.html'
]

for filename in html_files:
    filepath = os.path.join(dist_dir, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Remove existing wa button if any
    html = re.sub(r'<a class="tt-floating-whatsapp".*?</a>', '', html, flags=re.DOTALL)

    # Place before </body> or <script type="module" src="/assets/accessibility-v2.js">
    if '</body>' in html:
        html = html.replace('</body>', f'\n{wa_button_html}\n</body>')
        print(f"Inserted WhatsApp button into {filename}")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

# 4. Update Next.js route handlers
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
    with open(os.path.join(dist_dir, html_file), 'r', encoding='utf-8') as f:
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
    print(f"Updated Next.js route with WhatsApp button: {route_path}")

print("WhatsApp floating button added successfully everywhere!")
