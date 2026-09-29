import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog de Tradução Juramentada e Notícias | TraduzTudo',
  description: 'Artigos, guias práticos e dicas sobre tradução juramentada, apostila de Haia, cidadania italiana e estudos no exterior.',
};

export default function BlogPage() {
  const posts = [
    { title: 'Tudo o que você precisa saber sobre Tradução Juramentada em 2026', date: '25 de Setembro, 2026', cat: 'Tradução Juramentada', read: '5 min' },
    { title: 'Apostila de Haia: Como legalizar documentos para uso no exterior', date: '20 de Setembro, 2026', cat: 'Apostilamento', read: '4 min' },
    { title: 'Cidadania Italiana via Judicial: Certidões e Traduções necessárias', date: '15 de Setembro, 2026', cat: 'Cidadania Italiana', read: '6 min' },
    { title: 'Tradução Certificada ATA para o USCIS nos Estados Unidos', date: '10 de Setembro, 2026', cat: 'Imigração EUA', read: '4 min' },
    { title: 'Como validar seu diploma brasileiro no exterior passo a passo', date: '05 de Setembro, 2026', cat: 'Acadêmico', read: '7 min' },
    { title: 'Casamento no exterior: Quais documentos precisam de tradução?', date: '01 de Setembro, 2026', cat: 'Casamento', read: '5 min' },
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Conhecimento & Dicas
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Blog TraduzTudo</h1>
          <p className="text-lg text-gray-600">
            Fique por dentro das principais novidades sobre legalização de documentos, imigração e traduções oficiais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-[#2e7ec6]/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#2e7ec6] uppercase tracking-wider">{p.cat}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-4">Guia completo e orientações legais para acelerar o seu processo.</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                <span>{p.date}</span>
                <span>{p.read} de leitura</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
