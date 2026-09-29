import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes (FAQ) | TraduzTudo',
  description: 'Tire suas dúvidas sobre prazos, preços, validade e formatos de tradução juramentada e certificada.',
};

export default function FAQPage() {
  const faqs = [
    { q: 'O que é tradução juramentada?', a: 'É a tradução oficial feita por um Tradutor Público matriculado na Junta Comercial do estado. Tem fé pública em todo o território nacional e é exigida por órgãos públicos e consulados.' },
    { q: 'Qual a diferença entre tradução juramentada e certificada?', a: 'A juramentada é feita no Brasil por tradutor juramentado oficial. A certificada é feita no exterior ou emitida com Certificate of Accuracy (como para a ATA nos EUA, ATIO no Canadá, etc).' },
    { q: 'Quanto custa uma tradução juramentada?', a: 'O valor depende do número de caracteres (lauda juramentada), tipo de documento e urgência. Você pode simular instantaneamente em nossa página de orçamentos.' },
    { q: 'A tradução digital é aceita em órgãos oficiais?', a: 'Sim! Desde a Medida Provisória e legislação recente, traduções assinadas com certificado digital padrão ICP-Brasil têm o mesmo valor probatório e legal da versão física.' },
    { q: 'O que é a Apostila de Haia?', a: 'É um selo internacional emitido em cartório que autentica a origem de um documento público entre os países signatários da Convenção da Haia.' },
    { q: 'Qual o prazo médio de entrega?', a: 'Documentos simples (como certidões e CNH) costumam ser entregues em 2 a 4 dias úteis. Oferecemos também prazo expresso.' },
    { q: 'Como faço para enviar meus documentos?', a: 'Basta anexar fotos nítidas ou arquivos em PDF diretamente em nosso formulário de orçamento instantâneo ou enviar pelo WhatsApp ((11) 98285-4183).' },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Dúvidas Comuns
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Perguntas Frequentes</h1>
          <p className="text-lg text-gray-600">
            Respostas claras para as principais dúvidas sobre nossos serviços.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.q}</h3>
              <p className="text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-blue-50 rounded-3xl border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Ainda ficou com alguma dúvida?</h3>
          <p className="text-blue-700 text-sm mb-4">Nossa equipe de especialistas está disponível para orientar você agora mesmo.</p>
          <a
            href="https://wa.me/5511982854183?text=Olá!%20Ainda%20tenho%20uma%20dúvida%20sobre%20tradução."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <i className="fab fa-whatsapp"></i> Falar com Especialista ((11) 98285-4183)
          </a>
        </div>
      </div>
    </div>
  );
}
