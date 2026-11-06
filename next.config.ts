import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Cidades e Localidades (SEO Local) -> Home
      { source: '/agencia-de-traducao-em-sao-paulo', destination: '/', permanent: true },
      { source: '/agencia-de-traducao-em-curitiba', destination: '/', permanent: true },
      { source: '/agencia-de-traducao-em-joinville', destination: '/', permanent: true },
      { source: '/agencia-de-traducao-:city(.*)', destination: '/', permanent: true },

      // 2. Tradução Juramentada e Destinos Internacionais -> /servico?p=juramentada
      { source: '/traducao-juramentada', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-para-cidadania-italiana', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-para-casamento', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-de-certidoes', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-na-alemanha', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-na-argentina', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-na-espanha', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-na-holanda', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-arabe', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-coreano', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-hebraico', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-japones', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-romeno', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-juramentada-:slug(.*)', destination: '/servico?p=juramentada', permanent: true },

      // 3. Apostilamento de Haia e Traduções Certificadas -> /servico?p=juramentada
      { source: '/apostilamento-de-haia', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-certificada', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-certificada-nos-eua', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-certificada-canada', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-certificada-na-inglaterra', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-certificada-naati', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-certificada-:slug(.*)', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-academica', destination: '/servico?p=juramentada', permanent: true },
      { source: '/traducao-para-intercambio', destination: '/servico?p=juramentada', permanent: true },

      // 4. Tradução Técnica -> /servico?p=tecnica
      { source: '/traducao-tecnica', destination: '/servico?p=tecnica', permanent: true },
      { source: '/traducao-tecnica-:slug(.*)', destination: '/servico?p=tecnica', permanent: true },

      // 5. Idiomas e Traduções por Língua -> /servicos
      { source: '/idiomas', destination: '/servicos', permanent: true },
      { source: '/traducao-de-documentos', destination: '/servicos', permanent: true },
      { source: '/traducao-de-ingles', destination: '/servicos', permanent: true },
      { source: '/traducao-de-espanhol', destination: '/servicos', permanent: true },
      { source: '/traducao-frances', destination: '/servicos', permanent: true },
      { source: '/traducao-de-frances', destination: '/servicos', permanent: true },
      { source: '/traducao-de-italiano', destination: '/servicos', permanent: true },
      { source: '/traducao-de-alemao', destination: '/servicos', permanent: true },
      { source: '/traducao-mandarim', destination: '/servicos', permanent: true },
      { source: '/traducao-de-mandarim', destination: '/servicos', permanent: true },
      { source: '/traducao-russo', destination: '/servicos', permanent: true },
      { source: '/traducao-de-russo', destination: '/servicos', permanent: true },
      { source: '/traducao-de-japones', destination: '/servicos', permanent: true },
      { source: '/traducao-de-portugues', destination: '/servicos', permanent: true },
      { source: '/traducao-de-coreano', destination: '/servicos', permanent: true },
      { source: '/traducao-de-arabe', destination: '/servicos', permanent: true },
      { source: '/traducao-de-hebraico', destination: '/servicos', permanent: true },
      { source: '/traducao-de-holandes', destination: '/servicos', permanent: true },
      { source: '/traducao-de-noruegues', destination: '/servicos', permanent: true },
      { source: '/traducao-de-romeno', destination: '/servicos', permanent: true },
      { source: '/traducao-de-:lang(.*)', destination: '/servicos', permanent: true },
      { source: '/traducao-:lang(.*)', destination: '/servicos', permanent: true },

      // 6. Orçamento Antigo e Plataforma -> /orcamento
      { source: '/orcamento-traducoes', destination: '/orcamento', permanent: true },
      { source: '/plataforma-de-traducao', destination: '/orcamento', permanent: true },
      { source: '/me/:slug*', destination: '/orcamento', permanent: true },

      // 7. Institucional / Sobre a Empresa -> /sobre
      { source: '/empresa-de-traducao', destination: '/sobre', permanent: true },
      { source: '/sobre-nos', destination: '/sobre', permanent: true },
      { source: '/avaliacoes', destination: '/sobre', permanent: true },
      { source: '/etraducoes-e-confiavel', destination: '/sobre', permanent: true },
      { source: '/traduztudo-e-confiavel', destination: '/sobre', permanent: true },
      { source: '/blog', destination: '/sobre', permanent: true },
      { source: '/blog/:slug*', destination: '/sobre', permanent: true },

      // 8. Contato / FAQ / Trabalhe Conosco -> /contato
      { source: '/perguntas-frequentes', destination: '/contato#faq', permanent: true },
      { source: '/trabalhe-conosco', destination: '/contato', permanent: true },

      // 9. Políticas e Termos Legais
      { source: '/politicas-de-privacidade', destination: '/privacidade', permanent: true },
      { source: '/politicas-de-cookies', destination: '/privacidade', permanent: true },

      // 10. Afiliados -> Programa de Parceiros
      { source: '/programa-de-afiliados', destination: '/programa-de-parceiros', permanent: true },

      // 11. Links Internos Legados
      { source: '/admin', destination: '/', permanent: true },
      { source: '/search', destination: '/servicos', permanent: true },
      { source: '/site-original', destination: '/', permanent: true },
      { source: '/site-original-contato', destination: '/contato', permanent: true },
      { source: '/site-original-termos-de-uso', destination: '/termos-de-uso', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/servicos.html', destination: '/servicos' },
      { source: '/servico.html', destination: '/servico' },
      { source: '/orcamento.html', destination: '/orcamento' },
      { source: '/sobre.html', destination: '/sobre' },
      { source: '/contato.html', destination: '/contato' },
      { source: '/privacidade.html', destination: '/privacidade' },
      { source: '/termos-de-uso.html', destination: '/termos-de-uso' },
    ];
  },
};

export default nextConfig;
