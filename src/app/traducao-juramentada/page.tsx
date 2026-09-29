import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tradução Juramentada | eTraduções',
  description:
    'Tradução juramentada realizada por tradutores públicos certificados. Válida para certidões, diplomas, contratos e qualquer documento oficial.',
};

const faqs = [
  {
    q: 'O que é tradução juramentada?',
    a: 'A tradução juramentada é uma tradução oficial com fé pública, realizada por um tradutor público juramentado, matriculado na Junta Comercial do estado. Ela é exigida para documentos que precisam ter validade legal em outros países ou perante órgãos públicos brasileiros.',
  },
  {
    q: 'Quais documentos precisam de tradução juramentada?',
    a: 'Certidões de nascimento, casamento e óbito, diplomas e históricos escolares, contratos, procurações, documentos de identidade, atestados médicos, entre outros documentos oficiais.',
  },
  {
    q: 'Qual o prazo para receber a tradução?',
    a: 'O prazo médio é de 3 a 7 dias úteis, dependendo do volume e complexidade do documento. Para casos urgentes, oferecemos serviço expresso.',
  },
  {
    q: 'Como funciona a entrega?',
    a: 'Entregamos digitalmente por e-mail (válido para a maioria dos usos) ou fisicamente pelos Correios. Na entrega física, incluímos reconhecimento de firma gratuitamente.',
  },
  {
    q: 'A tradução é válida no exterior?',
    a: 'Sim. A tradução juramentada feita por tradutor público matriculado em Junta Comercial brasileira é válida para uso no Brasil e, quando necessário, pode ser apostilada para uso internacional.',
  },
];

const documentTypes = [
  'Certidão de Nascimento', 'Certidão de Casamento', 'Certidão de Óbito',
  'Diploma e Histórico Escolar', 'Carteira de Identidade (RG)', 'Passaporte',
  'Contrato Social', 'Procuração', 'Escritura Pública', 'Atestado Médico',
  'Declaração de Imposto de Renda', 'Carta de Antecedentes Criminais',
];

export default function TraducaoJuramentadaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Tradução Juramentada</span>
              </nav>
              <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                ⚖️ Tradução Oficial
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Tradução Juramentada
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Realizada por tradutores públicos juramentados, matriculados na Junta Comercial.
                Válida para processos judiciais, imigração, cidadania e qualquer uso oficial.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Tradutores públicos certificados pela Junta Comercial',
                  'Válida em todo o Brasil e no exterior',
                  'Prazo expresso disponível',
                  'Entrega digital e física',
                  'Sigilo total no tratamento dos documentos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511920037059'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
                >
                  💬 Iniciar Conversa
                </a>
              </div>
            </div>
            <div>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* Document types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Documentos que traduzimos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {documentTypes.map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <CheckCircle size={16} className="text-[#2e7ec6] shrink-0" />
                <span className="text-sm text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2e7ec6]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Solicite sua tradução juramentada agora
          </h2>
          <p className="text-blue-100 mb-8">Orçamento instantâneo, sem espera.</p>
          <Link
            href="/orcamento-traducoes"
            className="bg-white text-[#2e7ec6] font-extrabold px-8 py-4 rounded-full text-lg hover:bg-gray-50 transition-colors"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </section>
    </div>
  );
}
