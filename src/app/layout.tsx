import type { Metadata } from 'next';
import { Catamaran } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const catamaran = Catamaran({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-catamaran',
});

export const metadata: Metadata = {
  title: 'eTraduções - Traduções Juramentadas e Certificadas',
  description:
    'Empresa especializada em traduções oficiais de documentos. Oferecemos traduções juramentadas e certificadas válidas no Brasil e no mundo.',
  keywords:
    'tradução juramentada, tradução certificada, tradução técnica, apostilamento de haia, tradução oficial',
  openGraph: {
    title: 'eTraduções - Traduções Juramentadas e Certificadas',
    description:
      'Empresa especializada em traduções oficiais de documentos. Oferecemos traduções juramentadas e certificadas válidas no Brasil e no mundo.',
    url: 'https://www.etraducoes.com.br',
    siteName: 'eTraduções',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@etraducoes',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={catamaran.variable}>
      <body className={`${catamaran.className} antialiased bg-white text-gray-900`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontFamily: 'var(--font-catamaran)' },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
