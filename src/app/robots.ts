import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/me', '/search'],
      },
    ],
    sitemap: 'https://traduztudo.com/sitemap.xml',
    host: 'https://traduztudo.com',
  };
}
