import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programa de Parceiros Corporativos | TraduzTudo',
  description: 'Soluções de tradução B2B para escritórios de advocacia, agências e multinacionais.',
};

export default function ParceirosPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          Parceria B2B
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Programa Partners TraduzTudo</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Condições comerciais diferenciadas, faturamento quinzenal/mensal e gerente de contas dedicado para sua empresa.
        </p>
        <a
          href="https://wa.me/5511982854183?text=Olá!%20Gostaria%20de%20conhecer%20as%20condições%20do%20Programa%20Partners."
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-blue"
          style={{ display: 'inline-block' }}
        >
          Falar com Gerente de Contas ((11) 98285-4183)
        </a>
      </div>
    </div>
  );
}
