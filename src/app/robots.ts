import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/me', '/search'],
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image'],
        allow: ['/', '/favicon.ico', '/favicon-*.png', '/img/', '/themes/'],
      },
    ],
    sitemap: 'https://traduztudo.com/sitemap.xml',
    host: 'https://traduztudo.com',
  };
}
