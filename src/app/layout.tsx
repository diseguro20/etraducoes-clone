import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import './country-map.css';
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
  metadataBase: new URL('https://traduztudo.vercel.app'),
  title: 'TraduzTudo - Traduções Juramentadas e Certificadas',
  description:
    'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 98285-4183.',
  keywords:
    'tradução juramentada, tradução certificada, tradução técnica, apostilamento de haia, tradução oficial, tradutudo',
  authors: [{ name: 'TraduzTudo', url: 'https://traduztudo.vercel.app' }],
  creator: 'TraduzTudo',
  publisher: 'TraduzTudo',
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: 'TraduzTudo - Traduções Juramentadas e Certificadas',
    description:
      'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 98285-4183.',
    url: 'https://traduztudo.vercel.app',
    siteName: 'TraduzTudo',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://traduztudo.vercel.app/img/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'TraduzTudo - Traduções Juramentadas e Certificadas',
        type: 'image/png',
      },
      {
        url: 'https://traduztudo.vercel.app/img/og-square.png',
        width: 600,
        height: 600,
        alt: 'TraduzTudo - Contato e Orçamento',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TraduzTudo - Traduções Juramentadas e Certificadas',
    description:
      'Traduções Juramentadas e Certificadas válidas em todo o Brasil e no exterior. Atendimento rápido e orçamento online via WhatsApp: (11) 98285-4183.',
    images: ['https://traduztudo.vercel.app/img/og-preview.png'],
    site: '@traduztudo',
    creator: '@traduztudo',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/img/traduztudo-emblem.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  other: {
    'thumbnail': 'https://traduztudo.vercel.app/img/og-preview.png',
    'whatsapp:image': 'https://traduztudo.vercel.app/img/og-preview.png',
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

        {/* WhatsApp & Social Media Preview Meta Tags */}
        <meta property="og:image" content="https://traduztudo.vercel.app/img/og-preview.png" />
        <meta property="og:image:secure_url" content="https://traduztudo.vercel.app/img/og-preview.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TraduzTudo - Traduções Juramentadas e Certificadas" />
        <meta name="twitter:image" content="https://traduztudo.vercel.app/img/og-preview.png" />
        <link rel="image_src" href="https://traduztudo.vercel.app/img/og-preview.png" />
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
