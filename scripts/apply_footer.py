import os
import re

footer_html_template = """<footer class="site-footer">
  <svg class="wave-top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
    <path data-wave d="M0 40 Q 360 0 720 40 T 1440 40 V80 H0Z"></path>
  </svg>
  <div class="footer-grid">
    <div class="newsletter">
      <h4>Vamos conversar?</h4>
      <p>Conte para a gente o que você precisa traduzir. O próximo passo começa com uma conversa.</p>
      <form data-newsletter>
        <input type="text" required placeholder="O que você precisa traduzir?" aria-label="Sua necessidade">
        <button class="btn" type="submit">Conversar <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </form>
    </div>
    <div>
      <h4>Explore</h4>
      <ul>
        <li><a href="/">Início</a></li>
        <li><a href="/servicos">Serviços</a></li>
        <li><a href="/orcamento">Orçamento</a></li>
        <li><a href="/sobre">Sobre nós</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </div>
    <div>
      <h4>Traduções</h4>
      <ul>
        <li><a href="/servico?p=juramentada">Juramentada</a></li>
        <li><a href="/servico?p=tecnica">Técnica</a></li>
        <li><a href="/servico?p=simples">Livre</a></li>
        <li><a href="/servico?p=interpretacao">Interpretação</a></li>
      </ul>
    </div>
    <div>
      <h4>Atendimento & Sede</h4>
      <ul>
        <li><a href="mailto:contato@traduztudo.com">contato@traduztudo.com</a></li>
        <li><a href="https://wa.me/5511947485091" target="_blank" rel="noopener noreferrer">(11) 94748-5091 ↗</a></li>
        <li class="footer-address">
          <span>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</span><br>
          <span>CEP: 02962-100 — São Paulo - SP</span>
        </li>
        <li>
          <a href="https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP" target="_blank" rel="noopener noreferrer" class="footer-maps-badge">
            📍 Abrir no Google Maps ↗
          </a>
        </li>
      </ul>
    </div>
  </div>
  <a class="footer-mega" href="/" aria-label="Traduz Tudo"><span class="logo"></span></a>
  <div class="footer-bottom">
    <div class="footer-legal-copy">
      <p>Copyright © 2026 TraduzTudo. Todos os direitos reservados. • <strong>CNPJ: 69.530.655/0001-78</strong> • TraduzTudo Traduções e Interpretações Ltda.</p>
      <p class="footer-address-bar">
        📍 Sede oficial: <a href="https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP" target="_blank" rel="noopener noreferrer">Rua Monsenhor Januário Sangirardi, 135 - Sala 2, CEP: 02962-100 — São Paulo - SP (Ver no Google Maps ↗)</a>
      </p>
    </div>
    <div class="footer-legal-links">
      <a href="/termos-de-uso">Termos de Uso</a>
      <span>•</span>
      <a href="/privacidade">Política de Privacidade</a>
    </div>
  </div>
</footer>"""

# 1. Update common-runtime-v2.js in both locations
def update_common_runtime(filepath):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    # Pattern for footer creation
    old_footer_pattern = re.compile(
        r'(?:const|let)\s+i\s*=\s*(?:document\.createElement\("footer"\)|document\.querySelector\("\.site-footer"\)).*?<div class="footer-bottom">.*?</div>`;',
        re.DOTALL
    )

    new_footer_code = """let i=document.querySelector(".site-footer");const oFooter=!!i;if(!i){i=document.createElement("footer");i.className="site-footer";}i.innerHTML=`
    ${ah("wave-top")}
    <div class="footer-grid">
      <div class="newsletter"><h4>Vamos conversar?</h4><p>Conte para a gente o que você precisa traduzir. O próximo passo começa com uma conversa.</p><form data-newsletter><input type="text" required placeholder="O que você precisa traduzir?" aria-label="Sua necessidade"><button class="btn" type="submit">Conversar ${is}</button></form></div>
      <div><h4>Explore</h4><ul>${ba.map(([n,o])=>`<li><a href="${n}">${o}</a></li>`).join("")}</ul></div>
      <div><h4>Traduções</h4><ul>${Ks.map(o=>`<li><a href="/servico?p=${o.id}">${o.name}</a></li>`).join("")}</ul></div>
      <div><h4>Atendimento & Sede</h4><ul><li><a href="mailto:contato@traduztudo.com">contato@traduztudo.com</a></li><li><a href="https://wa.me/5511947485091" target="_blank" rel="noopener noreferrer">(11) 94748-5091 ↗</a></li><li class="footer-address"><span>Rua Monsenhor Januário Sangirardi, 135 - Sala 2</span><br><span>CEP: 02962-100 — São Paulo - SP</span></li><li><a href="https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP" target="_blank" rel="noopener noreferrer" class="footer-maps-badge">📍 Abrir no Google Maps ↗</a></li></ul></div>
    </div>
    <a class="footer-mega" href="/" aria-label="Traduz Tudo"><span class="logo"></span></a>
    <div class="footer-bottom"><div class="footer-legal-copy"><p>Copyright © 2026 TraduzTudo. Todos os direitos reservados. • <strong>CNPJ: 69.530.655/0001-78</strong> • TraduzTudo Traduções e Interpretações Ltda.</p><p class="footer-address-bar">📍 Sede oficial: <a href="https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP" target="_blank" rel="noopener noreferrer">Rua Monsenhor Januário Sangirardi, 135 - Sala 2, CEP: 02962-100 — São Paulo - SP (Ver no Google Maps ↗)</a></p></div><div class="footer-legal-links"><a href="/termos-de-uso">Termos de Uso</a><span>•</span><a href="/privacidade">Política de Privacidade</a></div></div>`;"""

    if old_footer_pattern.search(code):
        code = old_footer_pattern.sub(new_footer_code, code)
        print("  -> Footer generation code replaced.")
    else:
        print("  -> WARNING: footer pattern not matched in common-runtime-v2.js")

    # Pattern for append
    old_append = 'document.body.prepend(s,t),document.body.append(i,...e.children,...r.children)}'
    new_append = 'document.body.prepend(s,t),oFooter||document.body.append(i),document.body.append(...e.children,...r.children)}'
    if old_append in code:
        code = code.replace(old_append, new_append)
        print("  -> Append logic updated.")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)

update_common_runtime('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/public/assets/common-runtime-v2.js')
update_common_runtime('c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist/assets/common-runtime-v2.js')

# 2. Update HTML files in traduztudo-motion/dist
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

dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'

for filename in html_files:
    filepath = os.path.join(dist_dir, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Remove existing footer if any
    html = re.sub(r'<footer class="site-footer">.*?</footer>', '', html, flags=re.DOTALL)

    if '</main>' in html:
        html = html.replace('</main>', f'</main>\n{footer_html_template}')
        print(f"Inserted footer into {filename}")
    else:
        print(f"WARNING: </main> not found in {filename}")

    # Special for contato.html: add official address channel if not already there
    if filename == 'contato.html' and 'Rua Monsenhor Januário Sangirardi' not in html:
        old_channel_block = '<a class="channel" style="--c:#c5ecf5" href="/orcamento"><span><small>Seu projeto</small><strong>Solicitar orçamento</strong></span><span>↗</span></a>'
        new_channel_block = old_channel_block + '\n<a class="channel" style="--c:#e4f4fb" href="https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Janu%C3%A1rio+Sangirardi+135+S%C3%A3o+Paulo+SP" target="_blank" rel="noopener noreferrer"><span><small>Endereço Oficial</small><strong>Rua Monsenhor Januário Sangirardi, 135 - Sala 2, São Paulo - SP</strong></span><span>📍</span></a>'
        html = html.replace(old_channel_block, new_channel_block)
        print("Added address channel card to contato.html")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

# 3. Now sync the updated HTML into etraducoes-clone route handlers
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

import json

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
    print(f"Updated Next.js route: {route_path}")

print("ALL FOOTER UPDATES COMPLETED SUCCESSFULLY!")
