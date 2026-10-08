'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const links = [
    { title: 'Tradução Juramentada', href: '/traducao-juramentada', desc: 'Tradução oficial válida em órgãos públicos e cartórios.' },
    { title: 'Tradução Certificada', href: '/traducao-certificada', desc: 'Tradução aceita no exterior (EUA, Canadá, UK, Austrália).' },
    { title: 'Tradução Técnica', href: '/traducao-tecnica', desc: 'Traduções jurídicas, financeiras, médicas e de engenharia.' },
    { title: 'Apostilamento de Haia', href: '/apostilamento-de-haia', desc: 'Legalização internacional de documentos em cartório.' },
    { title: 'Orçamento Instantâneo', href: '/orcamento-traducoes', desc: 'Calcule o preço e prazo dos seus documentos online.' },
    { title: 'Tradução para Cidadania Italiana', href: '/traducao-juramentada-para-cidadania-italiana', desc: 'Certidões em inteiro teor e certidão de naturalização.' },
    { title: 'Tradução Acadêmica', href: '/traducao-academica', desc: 'Diplomas, históricos e planos de ensino.' },
    { title: 'Tradução para Casamento', href: '/traducao-juramentada-para-casamento', desc: 'Certidões de nascimento, solteirice e pacto antenupcial.' },
    { title: 'Perguntas Frequentes', href: '/perguntas-frequentes', desc: 'Tire dúvidas sobre prazos e funcionamento.' },
    { title: 'Fale Conosco', href: '/contato', desc: 'Telefones, WhatsApp e endereços dos escritórios.' },
  ];

  const filtered = query.trim() === '' ? links : links.filter(l => 
    l.title.toLowerCase().includes(query.toLowerCase()) || 
    l.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Busca na Plataforma TraduzTudo</h1>
        <div className="mb-10">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o que procura (ex: cidadania, diploma, inglês, orçamento)..."
            className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#2e7ec6] focus:outline-none shadow-sm"
          />
        </div>

        <div className="space-y-4">
          {filtered.map((item, idx) => (
            <Link key={idx} href={item.href} className="block p-5 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#2e7ec6]/40 rounded-2xl transition-colors">
              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nenhum resultado encontrado para "{query}". Tente buscar por outros termos ou fale no nosso WhatsApp ((11) 94748-5091).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
