import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const htmlContent = "<!doctype html><html lang=\"pt-BR\"><head><script src=\"/assets/navigation.js\"></script><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"><meta name=\"theme-color\" content=\"#002b49\"><title>Conhe\u00e7a nossos servi\u00e7os \u2014 Traduz Tudo</title><meta name=\"description\" content=\"Tradu\u00e7\u00e3o juramentada, t\u00e9cnica, livre e interpreta\u00e7\u00e3o. Conhe\u00e7a a Traduz Tudo e solicite seu or\u00e7amento personalizado.\"><link rel=\"icon\" href=\"/assets/img/logo-icon.png\"><script>try{document.documentElement.classList.add(\"is-entering\")}catch(e){document.documentElement.classList.add('is-entering')}</script><style>html.is-entering::after,html.is-loading-first::after{content:'';position:fixed;inset:0;z-index:198;background:#0078d4}html.is-loading-first::after{background:#f0f7fb}</style><link rel=\"stylesheet\" href=\"/assets/common-7nUs9TrF.css\"><link rel=\"stylesheet\" href=\"/assets/pages-DmoVKLQY.css\"><link rel=\"stylesheet\" href=\"/assets/brand.css\"><script type=\"module\" src=\"/assets/pages-v2.js\"></script></head><body><a class=\"skip-link\" href=\"#conteudo\">Pular para o conte\u00fado</a><main id=\"conteudo\"><div data-service-detail></div><section class=\"section next-step\"><span class=\"chip\">Vamos come\u00e7ar?</span><h2 class=\"display\" data-split>Seu pr\u00f3ximo passo<br>cabe em uma conversa.</h2><a class=\"btn\" href=\"/orcamento\" data-magnetic>Solicitar or\u00e7amento <svg class=\"arrow\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></a></section><div class=\"ticker\" data-ticker><div class=\"ticker-track\"><span>Seu mundo, em qualquer idioma</span><span>Traduz Tudo</span><span>Conex\u00f5es sem fronteiras</span></div></div></main><script type=\"module\" src=\"/assets/accessibility-v2.js\"></script></body></html>";

export async function GET() {
  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
