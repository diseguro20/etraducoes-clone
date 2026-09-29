import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apostilamento de Haia | eTraduções',
  description:
    'Preparação e encaminhamento de documentos para apostilamento de Haia. Facilitamos a validação internacional dos seus documentos brasileiros.',
};

const faqs = [
  {
    q: 'O que é o Apostilamento de Haia?',
    a: 'O apostilamento de Haia é um processo de legalização simplificada de documentos para uso internacional, estabelecido pela Convenção de Haia de 1961. Ele substitui a cadeia de legalizações consulares entre países signatários.',
  },
  {
    q: 'Quem pode apostilar documentos no Brasil?',
    a: 'No Brasil, o apostilamento é feito por cartórios credenciados pelo CNJ (Conselho Nacional de Justiça). A eTraduções auxilia na preparação e encaminhamento dos documentos a esses cartórios.',
  },
  {
    q: 'Preciso de tradução juramentada junto com o apostilamento?',
    a: 'Depende do país de destino. Muitos países exigem que o documento seja traduzido para o idioma local por um tradutor juramentado antes do apostilamento. Nossa equipe te orienta sobre o que é necessário.',
  },
  {
    q: 'Quais documentos podem ser apostilados?',
    a: 'Certidões de nascimento, casamento, óbito, diplomas, históricos escolares, procurações, contratos e outros documentos públicos emitidos por autoridades brasileiras.',
  },
];

export default function ApostilamentoPage() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Apostilamento de Haia</span>
              </nav>
              <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                🌍 Validade Internacional
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Apostilamento de Haia
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Auxiliamos na preparação e encaminhamento de documentos brasileiros para
                apostilamento em cartório autorizado pelo CNJ. Validade em +120 países.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Orientação completa sobre documentos necessários',
                  'Encaminhamento a cartório autorizado pelo CNJ',
                  'Combinamos com tradução juramentada quando necessário',
                  'Atendemos todo o Brasil de forma online',
                  'Suporte por WhatsApp durante todo o processo',
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

      {/* Info box */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <p className="text-amber-800 text-sm font-semibold">
              ⚠️ <strong>Atenção:</strong> A eTraduções não emite apostilas nem atua como cartório.
              Realizamos o processo de preparação e intermediação com cartórios credenciados pelo CNJ.
            </p>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Perguntas Frequentes sobre Apostilamento
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-100 p-6 group shadow-sm">
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
    </div>
  );
}
