import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight, Globe, Shield, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tradução para Estados Unidos (Certificação ATA) | TraduzTudo',
  description: 'Tradução certificada com declaração de exatidão (Certificate of Accuracy) aceita por 100% dos órgãos americanos, incluindo o USCIS (Serviço de Cidadania e Imigração), NVC, WES, universidades e cortes americanas.',
};

export default function Country_traducao_certificada_nos_eua_Page() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Estados Unidos</span>
              </nav>

              <span className="inline-flex items-center gap-2 bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                <span>🇺🇸</span> Válida em Estados Unidos
              </span>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Tradução para <span className="text-[#2e7ec6]">Estados Unidos</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tradução certificada com declaração de exatidão (Certificate of Accuracy) aceita por 100% dos órgãos americanos, incluindo o USCIS (Serviço de Cidadania e Imigração), NVC, WES, universidades e cortes americanas.
              </p>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-8">
                <div className="flex items-center gap-3">
                  <Award className="text-[#2e7ec6] shrink-0" size={28} />
                  <div>
                    <p className="font-bold text-blue-900">Certificação ATA</p>
                    <p className="text-xs text-blue-700">American Translators Association — Padrão oficial exigido para aceitação legal.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#orcamento-form"
                  className="btn btn-blue"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  Solicitar Orçamento
                </a>
                <a
                  href="https://wa.me/5511982854183?text=Olá!%20Preciso%20de%20tradução%20para%20Estados%20Unidos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fab fa-whatsapp"></i> Atendimento WhatsApp ((11) 98285-4183)
                </a>
              </div>
            </div>

            <div id="orcamento-form">
              <QuoteForm  />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
