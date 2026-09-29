import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programa de Afiliados | TraduzTudo',
  description: 'Ganhe comissões indicando serviços de tradução juramentada e certificada.',
};

export default function AfiliadosPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          Afiliados & Parceiros
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Programa de Afiliados TraduzTudo</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Se você é consultor de imigração, assessor de cidadania, advogado ou produtor de conteúdo, monetize suas indicações com comissões atrativas.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">1. Cadastre-se</h3>
            <p className="text-sm text-gray-600">Receba seu link exclusivo de parceiro e material promocional personalizado.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">2. Indique Clientes</h3>
            <p className="text-sm text-gray-600">Compartilhe seu link ou faça cotações diretas para seus clientes no painel.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">3. Receba Comissões</h3>
            <p className="text-sm text-gray-600">Pagamento mensal garantido via Pix para cada serviço concluído.</p>
          </div>
        </div>

        <a
          href="https://wa.me/5511982854183?text=Olá!%20Tenho%20interesse%20no%20Programa%20de%20Afiliados."
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-blue"
          style={{ display: 'inline-block' }}
        >
          Quero ser Afiliado ((11) 98285-4183)
        </a>
      </div>
    </div>
  );
}
