import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso | TraduzTudo',
};

export default function TermosPage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Termos de Uso</h1>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>Bem-vindo à <strong>TraduzTudo</strong>. Ao acessar nossa plataforma e solicitar nossos serviços de tradução juramentada, técnica ou certificada, você concorda com estes termos.</p>
          <h2 className="text-xl font-bold text-gray-900">1. Serviços de Tradução</h2>
          <p>A TraduzTudo atua na intermediação e prestação de serviços de tradução oficial com fé pública, através de tradutores juramentados matriculados e revisores técnicos especializados.</p>
          <h2 className="text-xl font-bold text-gray-900">2. Responsabilidade sobre os Documentos</h2>
          <p>O cliente declara ser o legítimo detentor ou representante legal dos documentos submetidos para cotação e tradução, responsabilizando-se pela autenticidade dos arquivos.</p>
          <h2 className="text-xl font-bold text-gray-900">3. Prazos e Entregas</h2>
          <p>Os prazos estipulados no orçamento têm início após a confirmação do pagamento e envio de todos os documentos legíveis necessários para a tradução.</p>
        </div>
      </div>
    </div>
  );
}
