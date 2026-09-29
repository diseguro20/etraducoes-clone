import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tradução Certificada | eTraduções',
  description: 'Tradução certificada para uso nos EUA, Canadá, Reino Unido e Austrália. Disponível no par português-inglês.',
};

export default function TraducaoCertificadaPage() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Tradução Certificada</span>
              </nav>
              <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                🎓 Para EUA, Canadá, UK e Austrália
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Tradução Certificada
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Disponível exclusivamente no par <strong>português-inglês</strong>. Aceita por
                universidades, empresas e órgãos governamentais nos Estados Unidos, Canadá,
                Reino Unido e Austrália.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Aceita por USCIS, universidades americanas e canadenses',
                  'Certificação de tradutor nativo qualificado',
                  'Par português ↔ inglês',
                  'Entrega digital e física',
                  'Prazo expresso disponível',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/orcamento-traducoes"
                className="inline-block bg-[#2e7ec6] hover:bg-[#1a5fa8] text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                Solicitar Orçamento
              </Link>
            </div>
            <div>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
