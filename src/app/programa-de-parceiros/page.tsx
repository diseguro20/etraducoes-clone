import type { Metadata } from 'next';
import Script from 'next/script';
import ProgramaDeParceirosClient from './ProgramaDeParceirosClient';

export const metadata: Metadata = {
  title: 'Programa de Parceiros e Influenciadores | TraduzTudo',
  description:
    'Monetize sua audiência com a TraduzTudo. Programa oficial de parcerias para influenciadores, criadores de conteúdo e assessorias. Comissões atrativas, pagamentos mensais via PIX e suporte comercial completo.',
  keywords: [
    'programa de parceiros traduztudo',
    'parceria com influenciadores tradução',
    'afiliados tradução juramentada',
    'monetização para criadores viagem',
    'parceria para assessoria de cidadania',
    'comissão por indicação de documentos',
  ],
  alternates: {
    canonical: 'https://traduztudo.com/programa-de-parceiros',
  },
  openGraph: {
    title: 'Programa de Parceiros e Influenciadores | TraduzTudo',
    description:
      'Monetize sua audiência com a TraduzTudo. Comissões atrativas, pagamentos via PIX e suporte de marketing e vendas completo.',
    url: 'https://traduztudo.com/programa-de-parceiros',
    siteName: 'TraduzTudo',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://traduztudo.com/themes/web/assets/img/lp/hero.png',
        width: 1200,
        height: 630,
        alt: 'Programa de Parceiros TraduzTudo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa de Parceiros e Influenciadores | TraduzTudo',
    description:
      'Monetize sua audiência com a TraduzTudo. Comissões atrativas, pagamentos via PIX e suporte dedicado.',
    images: ['https://traduztudo.com/themes/web/assets/img/lp/hero.png'],
  },
};

export default function ProgramaDeParceirosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Programa de Parceiros e Influenciadores TraduzTudo',
    url: 'https://traduztudo.com/programa-de-parceiros',
    description:
      'Programa oficial de parcerias da TraduzTudo para influenciadores e assessorias internacionais.',
    publisher: {
      '@type': 'Organization',
      name: 'TraduzTudo',
      url: 'https://traduztudo.com',
      logo: 'https://traduztudo.com/icon.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+55-11-94748-5091',
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: ['Portuguese', 'English', 'Spanish', 'Italian'],
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como funciona o Programa de Parceiros da TraduzTudo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Você indica os serviços oficiais da TraduzTudo para sua audiência através de um cupom exclusivo e links personalizados, recebendo comissões automáticas via PIX.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como são realizados os pagamentos das comissões?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os pagamentos são apurados mensalmente com extrato detalhado e pagos via PIX até o dia 10 do mês seguinte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso ter CNPJ para me inscrever?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não é obrigatório. Aceitamos criadores pessoa física via RPA/PIX e também pessoas jurídicas.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProgramaDeParceirosClient />
    </>
  );
}
