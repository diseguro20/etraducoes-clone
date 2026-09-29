import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight, Award, Shield, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tradução Juramentada para Casamento | TraduzTudo',
  description: 'Tradução oficial de certidões civis, pactos antenupciais e atestados para habilitação de casamento no Brasil ou no exterior.',
};

export default function Specialty_traducao_juramentada_para_casamento_Page() {
  const items = [{"title":"Certidão de Nascimento","desc":"Indispensável para comprovação de filiação e estado civil originário."},{"title":"Certidão de Solteirice / Capacidade Matrimonial","desc":"Exigida para casamento de estrangeiros no Brasil ou brasileiros no exterior."},{"title":"Certidão de Divórcio / Sentença Judicial","desc":"Comprovação da dissolução de união anterior para contrair novo matrimônio."},{"title":"Pacto Antenupcial","desc":"Tradução juramentada de acordos pré-nupciais e regime de bens."},{"title":"Certidão de Óbito de Cônjuge","desc":"Para comprovação de viuvez e liberação de novo casamento."},{"title":"Apostila de Haia para Casamento","desc":"Legalização internacional de certidões emitida junto aos cartórios conveniados."}];

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Tradução Juramentada para Casamento</span>
              </nav>

              <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                💍 Casamento no Brasil & Exterior
              </span>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Tradução Juramentada para Casamento
              </h1>

              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Tradução oficial de certidões civis, pactos antenupciais e atestados para habilitação de casamento no Brasil ou no exterior.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Cartórios brasileiros e estrangeiros exigem que qualquer documento expedido em outra língua passe por tradução juramentada com fé pública e, quando aplicável, Apostilamento de Haia.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#orcamento-form"
                  className="btn btn-blue"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  Calcular Preço e Prazo
                </a>
                <a
                  href="https://wa.me/5511982854183?text=Olá!%20Preciso%20de%20informações%20sobre%20Tradu%C3%A7%C3%A3o%20Juramentada%20para%20Casamento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp ((11) 98285-4183)
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#2e7ec6] font-bold text-sm uppercase tracking-wider">Documentos Atendidos</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Principais Documentos</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                <FileText className="text-[#2e7ec6] shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
