import type { Metadata } from 'next';
import Link from 'next/link';
import { LANGUAGES } from '@/types';

export const metadata: Metadata = {
  title: 'Idiomas | TraduzTudo',
  description: 'Tradução juramentada e certificada em +14 idiomas: inglês, espanhol, italiano, francês, alemão, russo, mandarim e muito mais.',
};

export default function IdiomasPage() {
  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              🌍 Cobertura Global
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              +14 Idiomas Disponíveis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tradução juramentada, certificada e técnica nos principais idiomas do mundo.
              Tradutores públicos certificados para cada idioma.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang.code}
                href={`/traducao-de-${lang.slug}`}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 hover:shadow-lg border border-gray-100 hover:border-[#2e7ec6]/30 transition-all group"
              >
                <span className="text-4xl">{lang.flag}</span>
                <div className="text-center">
                  <p className="font-bold text-gray-900 group-hover:text-[#2e7ec6] transition-colors">
                    {lang.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Ver serviços</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2e7ec6]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Não encontrou seu idioma?
          </h2>
          <p className="text-blue-100 mb-8">
            Entre em contato conosco. Atendemos idiomas sob consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contato"
              className="bg-white text-[#2e7ec6] font-extrabold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors"
            >
              Falar com a equipe
            </Link>
            <a
              href="https://wa.me/5511920037059"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-extrabold px-8 py-4 rounded-full transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
