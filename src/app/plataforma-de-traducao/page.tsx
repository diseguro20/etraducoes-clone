import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plataforma AIUTA | TraduzTudo',
  description: 'AIUTA — A plataforma de tradução para empresas e clientes corporativos. Gestão de pedidos, faturamento e condições especiais.',
};

export default function PlataformaPage() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-slate-900 to-[#1a5fa8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              🚀 Para Empresas
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-5">
              Plataforma AIUTA
            </h1>
            <p className="text-lg text-blue-100 mb-6">
              A solução completa para empresas que precisam de traduções recorrentes.
              Gestão centralizada de pedidos, faturamento simplificado e condições especiais.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '📊', title: 'Dashboard completo', desc: 'Acompanhe todos os pedidos em um só lugar' },
                { icon: '💰', title: 'Faturamento flexível', desc: 'Pague mensalmente com nota fiscal' },
                { icon: '⚡', title: 'Aprovação ágil', desc: 'Fluxo de aprovação personalizado' },
                { icon: '🔗', title: 'Integração via API', desc: 'Conecte com seus sistemas internos' },
              ].map((f) => (
                <div key={f.title} className="bg-white/10 rounded-2xl p-5">
                  <span className="text-2xl block mb-2">{f.icon}</span>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-blue-100 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/5511982854183?text=Tenho%20interesse%20na%20plataforma%20AIUTA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1a5fa8] font-extrabold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors"
            >
              💬 Falar com consultor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
