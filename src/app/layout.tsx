import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: 'TraduzTudo - Traduções Juramentadas e Certificadas',
  description:
    'Empresa especializada em traduções oficiais de documentos. Oferecemos traduções juramentadas e certificadas válidas no Brasil e no mundo.',
  keywords:
    'tradução juramentada, tradução certificada, tradução técnica, apostilamento de haia, tradução oficial',
  openGraph: {
    title: 'TraduzTudo - Traduções Juramentadas e Certificadas',
    description:
      'Empresa especializada em traduções oficiais de documentos. Oferecemos traduções juramentadas e certificadas válidas no Brasil e no mundo.',
    url: 'https://traduztudo.vercel.app',
    siteName: 'TraduzTudo',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@traduztudo',
  },
  icons: {
    icon: '/img/traduztudo-emblem.svg',
    apple: '/img/traduztudo-emblem.svg',
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
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
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
