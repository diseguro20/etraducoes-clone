import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Solicitar Orçamento | TraduzTudo',
  description: 'Solicite um orçamento instantâneo para tradução juramentada, certificada ou técnica. Preço e prazo em minutos.',
};

export default function OrcamentoPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] py-12 lg:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 bg-[#2e7ec6]/10 text-[#2e7ec6] dark:bg-[#38bdf8]/15 dark:text-[#38bdf8] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
              ⚡ Resposta em minutos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 !leading-tight">
              Solicite um Orçamento de Tradução
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Preencha o formulário ao lado com seus dados e envie o documento.
              Nossa equipe analisará e retornará com o preço e prazo rapidamente.
            </p>

            {/* Steps */}
            <div className="space-y-3.5 mb-8">
              {[
                { step: '1', title: 'Envie o documento', desc: 'Faça upload do arquivo ou tire uma foto. Aceitamos PDF, fotos, Word.' },
                { step: '2', title: 'Aguarde o orçamento', desc: 'Em minutos você recebe o preço e prazo por e-mail e WhatsApp.' },
                { step: '3', title: 'Aprove e pague', desc: 'Pague via PIX, boleto ou cartão. Iniciamos imediatamente após confirmação.' },
                { step: '4', title: 'Receba a tradução', desc: 'Digital por e-mail ou físico pelos Correios, conforme sua preferência.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-3.5 rounded-xl bg-white dark:bg-[#1a2233] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#2e7ec6] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-base">{s.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { icon: '✅', text: 'Tradutores certificados' },
                { icon: '🔒', text: 'Documentos sigilosos' },
                { icon: '⚡', text: 'Prazo garantido' },
                { icon: '💳', text: 'PIX, Boleto e Cartão' },
              ].map((badge) => (
                <div key={badge.text} className="bg-white dark:bg-[#1a2233] rounded-xl p-3.5 border border-gray-200/80 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200 font-semibold flex items-center gap-2.5 shadow-sm transition-colors">
                  <span className="text-lg">{badge.icon}</span>
                  <span>{badge.text}</span>
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
