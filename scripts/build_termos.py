import os
import re
import json

dist_dir = 'c:/Users/diseg/Documents/antigravity/peaceful-curie/traduztudo-motion/dist'
with open(os.path.join(dist_dir, 'privacidade.html'), 'r', encoding='utf-8') as f:
    priv_html = f.read()

# Replace title, hero and content for Termos de Uso
termos_html = priv_html.replace(
    '<title>Privacidade — Traduz Tudo</title>',
    '<title>Termos de Uso — Traduz Tudo</title>'
).replace(
    '<span class="chip">Informações sobre este site</span><h1 class="display" data-split>Seus dados.<br>Com clareza.</h1><p data-fade>Como as interações desta página funcionam.</p>',
    '<span class="chip">Condições gerais e legais</span><h1 class="display" data-split>Termos de<br>Uso.</h1><p data-fade>Transparência, integridade e compromisso em cada tradução.</p>'
)

# Content replacement
old_copy = re.search(r'<section class="section privacy-copy">.*?</section>', termos_html, re.DOTALL).group(0)
new_copy = """<section class="section privacy-copy">
<h2>1. Identificação e Objeto</h2>
<p><strong>TraduzTudo Traduções e Interpretações Ltda</strong> (“TraduzTudo”), sociedade regularmente inscrita no CNPJ/MF sob o nº <strong>69.530.655/0001-78</strong>, com sede oficial localizada na <strong>Rua Monsenhor Januário Sangirardi, 135 - Sala 2, CEP: 02962-100, São Paulo - SP</strong>, apresenta aos usuários os Termos e Condições Gerais que regem a utilização da plataforma e a contratação de soluções linguísticas.</p>
<p>A atuação da TraduzTudo compreende a intermediação e prestação de serviços de tradução juramentada com fé pública, tradução técnica especializada, tradução livre e corporativa, interpretação simultânea e consecutiva, apostilamento de documentos e assessoria documental internacional.</p>

<h2>2. Solicitação de Orçamentos e Atendimento</h2>
<p>As cotações e orçamentos solicitados por meio de nossos formulários no site são processados de forma personalizada pelo sistema interno TraduzTudo OS e direcionados à equipe de atendimento via WhatsApp oficial <strong>(11) 94748-5091</strong> e e-mail <strong>contato@traduztudo.com</strong>. Valores, prazos e condições de entrega são formalizados diretamente na proposta comercial.</p>

<h2>3. Sigilo Profissional e LGPD</h2>
<p>A TraduzTudo adota rigorosos protocolos de confidencialidade e segurança da informação em total conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD). Todos os documentos submetidos para cotação e execução de serviços são tratados sob estrito sigilo profissional, sendo acessados exclusivamente pelos tradutores e coordenadores designados.</p>

<h2>4. Prazos e Entrega</h2>
<p>Os prazos de entrega acordados passam a vigorar a partir da aprovação formal da proposta e do fornecimento de todos os documentos originais legíveis. As entregas podem ser realizadas em formato digital com assinatura eletrônica e certificado digital ICP-Brasil (com validade jurídica nacional e internacional) ou por vias físicas quando solicitado.</p>

<h2>5. Foro de Eleição</h2>
<p>Para dirimir eventuais controvérsias decorrentes destes Termos de Uso, as partes elegem o foro da Comarca de São Paulo - Estado de São Paulo, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>

<h2>6. Contato Oficial</h2>
<p>Em caso de dúvidas, esclarecimentos ou solicitações adicionais sobre os termos contratuais e serviços, nossa equipe está permanentemente à disposição através do e-mail <a href="mailto:contato@traduztudo.com">contato@traduztudo.com</a> ou pelo WhatsApp oficial <a href="https://wa.me/5511947485091" target="_blank" rel="noopener noreferrer">(11) 94748-5091</a>.</p>
</section>"""

termos_html = termos_html.replace(old_copy, new_copy)

with open(os.path.join(dist_dir, 'termos-de-uso.html'), 'w', encoding='utf-8') as f:
    f.write(termos_html)
print("Created traduztudo-motion/dist/termos-de-uso.html")

# Create route handler in etraducoes-clone/src/app/termos-de-uso/route.ts
os.makedirs('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/termos-de-uso', exist_ok=True)
escaped_json = json.dumps(termos_html, ensure_ascii=False)
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
with open('c:/Users/diseg/Documents/antigravity/peaceful-curie/etraducoes-clone/src/app/termos-de-uso/route.ts', 'w', encoding='utf-8') as f:
    f.write(route_content)
print("Created etraducoes-clone/src/app/termos-de-uso/route.ts")

# Remove obsolete dummy politicas-de-privacidade.html from dist
dummy_pol = os.path.join(dist_dir, 'politicas-de-privacidade.html')
if os.path.exists(dummy_pol):
    os.remove(dummy_pol)
    print("Removed dummy politicas-de-privacidade.html")
