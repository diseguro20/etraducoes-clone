import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agência de Tradução em Joinville - SC | TraduzTudo',
  description: 'Escritório de tradução juramentada e certificada em Joinville - SC. Atendimento presencial e online com orçamentos instantâneos.',
};

export default function Agency_agencia_de_traducao_em_joinville_Page() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Joinville - SC</span>
              </nav>

              <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                📍 Escritório Físico & Digital
              </span>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Agência de Tradução em <span className="text-[#2e7ec6]">Joinville</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Atendemos pessoas físicas e empresas de Joinville e toda a região com traduções juramentadas, técnicas e certificadas válidas no Brasil e exterior.
              </p>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#2e7ec6] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-gray-900">Endereço:</p>
                    <p className="text-gray-600 text-sm">Rua Ministro Calógeras, 343, 5º andar, Bucarein</p>
                    <p className="text-gray-400 text-xs">CEP: 89.202-207</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-[#2e7ec6] shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-gray-900">Telefone / WhatsApp:</p>
                    <p className="text-gray-600 text-sm">(11) 98285-4183</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-[#2e7ec6] shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-gray-900">Horário:</p>
                    <p className="text-gray-600 text-sm">Segunda a Sexta, das 9h às 18h</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#orcamento-form" className="btn btn-blue">Orçamento Imediato</a>
                <a
                  href="https://wa.me/5511982854183?text=Olá!%20Gostaria%20de%20orçamento%20em%20Joinville."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fab fa-whatsapp"></i> Falar no WhatsApp ((11) 98285-4183)
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
