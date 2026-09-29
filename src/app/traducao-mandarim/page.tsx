import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight, Globe, Award, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tradução em Mandarim (Chinês) (🇨🇳) | TraduzTudo',
  description: 'Tradução juramentada, certificada e técnica em Mandarim (Chinês). Atendimento rápido com envio de orçamento instantâneo e entrega em todo o Brasil e exterior.',
};

export default function Traducao_traducao_mandarim_Page() {
  const commonDocs = ["Contratos de Importação e Exportação","Licenças Comerciais e Alvarás","Certidões Civis","Procurações Internacionais","Especificações Técnicas de Produtos"];

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <Link href="/idiomas" className="hover:text-[#2e7ec6]">Idiomas</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Mandarim (Chinês)</span>
              </nav>

              <span className="inline-flex items-center gap-2 bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                <span>🇨🇳</span> Tradução Oficial em Mandarim (Chinês)
              </span>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Tradução em <span className="text-[#2e7ec6]">Mandarim (Chinês)</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tradução profissional e juramentada em chinês / mandarim para comércio exterior, vistos de negócios, acordos de representação comercial, contratos e certificações aduaneiras.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Award className="text-[#2e7ec6] shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Tradutores Juramentados</p>
                    <p className="text-xs text-gray-500">Matriculados na Junta Comercial</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Clock className="text-[#2e7ec6] shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Prazo Ágil</p>
                    <p className="text-xs text-gray-500">Orçamento em minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Globe className="text-[#2e7ec6] shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Validade Internacional</p>
                    <p className="text-xs text-gray-500">Aceito em consulados e embaixadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Shield className="text-[#2e7ec6] shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Sigilo Total</p>
                    <p className="text-xs text-gray-500">Documentos sob confidencialidade</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#orcamento-form"
                  className="btn btn-blue"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  Pedir Orçamento Agora
                </a>
                <a
                  href="https://wa.me/5511982854183?text=Olá!%20Gostaria%20de%20um%20orçamento%20de%20tradução%20em%20Mandarim%20(Chin%C3%AAs)."
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

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#2e7ec6] font-bold text-sm uppercase tracking-wider">Documentos Frequentes</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
              O que traduzimos em Mandarim (Chinês)
            </h2>
            <p className="text-gray-600 mt-3">
              Cobrimos todos os tipos de documentos civis, acadêmicos, jurídicos e corporativos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {commonDocs.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#2e7ec6]/40 transition-colors">
                <CheckCircle className="text-green-500 shrink-0" size={18} />
                <span className="text-sm font-semibold text-gray-800">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
