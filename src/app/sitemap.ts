import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://traduztudo.com';
  const now = new Date();

  const coreRoutes: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    // Homepage
    { url: '', priority: 1.0, changeFrequency: 'daily' },

    // Serviços Principais
    { url: '/traducao-juramentada', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/apostilamento-de-haia', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/traducao-certificada', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/traducao-tecnica', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/orcamento-traducoes', priority: 0.9, changeFrequency: 'daily' },
    { url: '/empresa-de-traducao', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/plataforma-de-traducao', priority: 0.85, changeFrequency: 'weekly' },

    // Cidadania e Destinos Internacionais
    { url: '/traducao-juramentada-para-cidadania-italiana', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/traducao-certificada-nos-eua', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/traducao-certificada-canada', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-certificada-na-inglaterra', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-certificada-naati', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-na-espanha', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-na-alemanha', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-na-argentina', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-na-holanda', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-para-intercambio', priority: 0.85, changeFrequency: 'weekly' },

    // Cidades e Localidades (SEO Local)
    { url: '/agencia-de-traducao-em-sao-paulo', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/agencia-de-traducao-em-curitiba', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/agencia-de-traducao-em-joinville', priority: 0.85, changeFrequency: 'weekly' },

    // Documentos e Casos Específicos
    { url: '/traducao-juramentada-de-certidoes', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-para-casamento', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-de-documentos', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-academica', priority: 0.8, changeFrequency: 'weekly' },

    // Idiomas
    { url: '/idiomas', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-de-ingles', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-de-espanhol', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-de-italiano', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-frances', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-de-alemao', priority: 0.85, changeFrequency: 'weekly' },
    { url: '/traducao-mandarim', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-russo', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-de-japones', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-de-coreano', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-de-arabe', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-de-hebraico', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-de-holandes', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/traducao-de-noruegues', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-de-portugues', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-de-romeno', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-arabe', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-coreano', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-hebraico', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-japones', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traducao-juramentada-romeno', priority: 0.75, changeFrequency: 'weekly' },

    // Autoridade e Confiança
    { url: '/sobre-nos', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/avaliacoes', priority: 0.75, changeFrequency: 'weekly' },
    { url: '/traduztudo-e-confiavel', priority: 0.75, changeFrequency: 'monthly' },
    { url: '/etraducoes-e-confiavel', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/perguntas-frequentes', priority: 0.75, changeFrequency: 'monthly' },
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/contato', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/programa-de-parceiros', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/programa-de-afiliados', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/trabalhe-conosco', priority: 0.5, changeFrequency: 'monthly' },

    // Institucional & Legal
    { url: '/termos-de-uso', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/politicas-de-privacidade', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/politicas-de-cookies', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return coreRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
