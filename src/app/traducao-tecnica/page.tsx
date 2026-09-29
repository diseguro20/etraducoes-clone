import type { Metadata } from 'next';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tradução Técnica | eTraduções',
  description: 'Tradução técnica especializada nas áreas jurídica, médica, financeira e científica.',
};

const areas = [
  { icon: '⚖️', title: 'Jurídico', desc: 'Contratos, procurações, laudos, peças processuais.' },
  { icon: '💊', title: 'Médico e Farmacêutico', desc: 'Prontuários, bulas, estudos clínicos, relatórios médicos.' },
  { icon: '💰', title: 'Financeiro', desc: 'Balanços, relatórios, termos financeiros, prospetos.' },
  { icon: '🔬', title: 'Científico', desc: 'Artigos acadêmicos, pesquisas, patentes.' },
  { icon: '💼', title: 'Empresarial', desc: 'Manuais, apresentações, comunicados corporativos.' },
  { icon: '💻', title: 'Tecnologia', desc: 'Manuais técnicos, documentação de software.' },
];

export default function TraducaoTecnicaPage() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#2e7ec6]">Início</Link>
                <ChevronRight size={14} />
                <span className="text-gray-700">Tradução Técnica</span>
              </nav>
              <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                🔬 Especializada
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                Tradução Técnica
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Tradução especializada de textos que exigem conhecimento técnico aprofundado.
                Nossos tradutores são nativos e especialistas nas áreas em que atuam.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Tradutores nativos especializados por área',
                  'Revisão por especialista do setor',
                  'Terminologia precisa e consistente',
                  'Entrega em formato original (Word, PDF, etc.)',
                  'Sigilo garantido por contrato',
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

      {/* Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Áreas de Especialização
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <div key={area.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">{area.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-sm text-gray-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
