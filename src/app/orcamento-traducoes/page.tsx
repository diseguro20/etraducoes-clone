import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Solicitar Orçamento | eTraduções',
  description: 'Solicite um orçamento instantâneo para tradução juramentada, certificada ou técnica. Preço e prazo em minutos.',
};

export default function OrcamentoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div className="pt-4">
            <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              ⚡ Resposta em minutos
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
              Solicite um Orçamento de Tradução
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Preencha o formulário ao lado com seus dados e envie o documento.
              Nossa equipe analisará e retornará com o preço e prazo rapidamente.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {[
                { step: '1', title: 'Envie o documento', desc: 'Faça upload do arquivo ou tire uma foto. Aceitamos PDF, fotos, Word.' },
                { step: '2', title: 'Aguarde o orçamento', desc: 'Em minutos você recebe o preço e prazo por e-mail e WhatsApp.' },
                { step: '3', title: 'Aprove e pague', desc: 'Pague via PIX, boleto ou cartão. Iniciamos imediatamente após confirmação.' },
                { step: '4', title: 'Receba a tradução', desc: 'Digital por e-mail ou físico pelos Correios, conforme sua preferência.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#2e7ec6] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{s.title}</p>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                '✅ Tradutores certificados',
                '🔒 Documentos sigilosos',
                '⚡ Prazo garantido',
                '💳 PIX, Boleto e Cartão',
              ].map((badge) => (
                <div key={badge} className="bg-white rounded-xl p-3 border border-gray-100 text-sm text-gray-700 font-medium">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-24">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
