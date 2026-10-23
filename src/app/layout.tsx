import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import LanguageSelector from '@/components/ui/LanguageSelector';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://traduztudo.com'),
  alternates: {
    canonical: 'https://traduztudo.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  title: 'TraduzTudo | Tradução Juramentada, Técnica e Certificada',
  description:
    'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 94748-5091.',
  keywords:
    'Traduz Tudo, TraduzTudo, traduztudo, traduz tudo traducoes, tradução juramentada, tradução certificada, tradução técnica, apostilamento de haia, tradução oficial, tradução juramentada sp, tradução para cidadania italiana',
  authors: [{ name: 'TraduzTudo', url: 'https://traduztudo.com' }],
  creator: 'TraduzTudo',
  publisher: 'TraduzTudo',
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: 'TraduzTudo | Tradução Juramentada, Técnica e Certificada',
    description:
      'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 94748-5091.',
    url: 'https://traduztudo.com',
    siteName: 'TraduzTudo',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://traduztudo.com/img/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'TraduzTudo - Traduções Juramentadas e Certificadas',
        type: 'image/png',
      },
      {
        url: 'https://traduztudo.com/img/og-square.png',
        width: 800,
        height: 800,
        alt: 'TraduzTudo - Contato e Orçamento',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TraduzTudo | Tradução Juramentada, Técnica e Certificada',
    description:
      'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 94748-5091.',
    images: ['https://traduztudo.com/img/og-preview.png'],
    site: '@traduztudo',
    creator: '@traduztudo',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-512x512.png', type: 'image/png', sizes: '512x512' },
      { url: '/img/traduztudo-favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/img/traduztudo-favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/img/traduztudo-emblem.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.json',
  other: {
    'thumbnail': 'https://traduztudo.com/img/og-preview.png',
    'whatsapp:image': 'https://traduztudo.com/img/og-preview.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/css/etraducoes.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />

        {/* Favicon & Search Engine App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/traduztudo-favicon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* WhatsApp & Social Media Preview Meta Tags */}
        <meta property="og:image" content="https://traduztudo.com/img/og-preview.png" />
        <meta property="og:image:secure_url" content="https://traduztudo.com/img/og-preview.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TraduzTudo - Traduções Juramentadas e Certificadas" />
        <meta name="twitter:image" content="https://traduztudo.com/img/og-preview.png" />
        <link rel="image_src" href="https://traduztudo.com/img/og-preview.png" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              'name': 'TraduzTudo',
              'alternateName': [
                'Traduz Tudo',
                'TraduzTudo Traduções',
                'Traduz Tudo Oficial',
                'TraduzTudo Traduções e Interpretações',
                'TraduzTudo - Traduções Juramentadas e Certificadas'
              ],
              'knowsAbout': [
                'Tradução Juramentada',
                'Apostilamento de Haia',
                'Tradução Certificada',
                'Tradução Técnica',
                'Tradução para Cidadania Italiana'
              ],
              'legalName': 'TraduzTudo Traduções e Interpretações Ltda',
              'taxID': '69.530.655/0001-78',
              'url': 'https://traduztudo.com',
              'logo': 'https://traduztudo.com/favicon-512x512.png',
              'image': 'https://traduztudo.com/favicon-512x512.png',
              'telephone': '+55 11 94748-5091',
              'email': 'contato@traduztudo.com',
              'description':
                'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 94748-5091.',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Rua Monsenhor Januário Sangirardi, 135 - Sala 2',
                'addressLocality': 'São Paulo',
                'addressRegion': 'SP',
                'postalCode': '02962-100',
                'addressCountry': 'BR',
              },
              'sameAs': [
                'https://www.instagram.com/traduz_tudo_/',
                'https://www.facebook.com/profile.php?id=61594891905671',
              ],
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <LanguageSelector />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontFamily: "'Catamaran', sans-serif" },
            }}
          />
        </AuthProvider>
        <Script src="/js/etraducoes.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
