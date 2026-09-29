import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Avaliações e Depoimentos de Clientes | TraduzTudo',
  description: 'Veja o que dizem nossos clientes sobre os serviços de tradução juramentada e certificada da TraduzTudo.',
};

export default function AvaliacoesPage() {
  const reviews = [
    { name: 'Denise Britz do Nascimento Silva', date: '22 de Setembro de 2026', text: 'Excelente serviço de tradução, com profissionalismo e um atendimento cuidadoso. Solicitei a tradução e o apostilamento de um documento. Atendimento impecável durante todo o processo.', stars: 5 },
    { name: 'Ana Paula Vidal Boldrin', date: '4 de Agosto de 2026', text: 'Excelente atendimento! Entregou antes do prazo previsto! Preço justo. Recomendo com toda certeza.', stars: 5 },
    { name: 'Ana Tereza Trevisan', date: '22 de Setembro de 2026', text: 'Do primeiro contato até o recebimento dos documentos traduzidos não tive problema, atendimento nota mil! RECOMENDO!', stars: 5 },
    { name: 'Carlos Eduardo Mendes', date: '18 de Agosto de 2026', text: 'Tradução para cidadania italiana aceita sem qualquer questionamento pelo tribunal de Roma. Trabalho rápido e impecável.', stars: 5 },
    { name: 'Mariana Siqueira Santos', date: '12 de Julho de 2026', text: 'Precisei com urgência para a universidade nos EUA e me entregaram em menos de 48h com toda a certificação da ATA. Muito obrigada!', stars: 5 },
    { name: 'Rodrigo Alcantara Ferreira', date: '29 de Junho de 2026', text: 'Preço mais justo do mercado e plataforma super fácil de usar. O orçamento sai na hora sem burocracia.', stars: 5 },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            ⭐ 5.0 no Google Avaliações
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">O que falam da gente</h1>
          <p className="text-lg text-gray-600">
            A satisfação dos nossos clientes é o nosso maior compromisso diário.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((r, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="font-bold text-gray-800">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/orcamento-traducoes" className="btn btn-blue" style={{ display: 'inline-block' }}>
            Pedir um Orçamento Instantâneo
          </Link>
        </div>
      </div>
    </div>
  );
}
