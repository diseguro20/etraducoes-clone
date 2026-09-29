import type { Metadata } from 'next';
import { CheckCircle, Award, Users, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nós | eTraduções',
  description: 'Conheça a eTraduções, empresa brasileira de tradução juramentada e certificada fundada em 2016. Parte do Grupo Ferrara.',
};

const timeline = [
  { year: '2016', event: 'Fundação da eTraduções em Curitiba, PR.' },
  { year: '2018', event: 'Abertura do escritório em São Paulo, SP.' },
  { year: '2020', event: 'Lançamento da plataforma digital de orçamentos instantâneos.' },
  { year: '2022', event: 'Ingresso na American Translators Association (ATA).' },
  { year: '2023', event: 'Abertura do escritório em Joinville, SC. Lançamento da Plataforma AIUTA.' },
  { year: '2024', event: '+10.000 traduções realizadas. Expansão para +14 idiomas.' },
];

const values = [
  { icon: Award, title: 'Qualidade', desc: 'Cada documento é revisado por especialistas antes da entrega.' },
  { icon: Shield, title: 'Sigilo', desc: 'Seus documentos são tratados com total confidencialidade.' },
  { icon: Zap, title: 'Agilidade', desc: 'Orçamentos instantâneos e prazos cumpridos rigorosamente.' },
  { icon: Heart, title: 'Transparência', desc: 'Preços claros, sem surpresas ou taxas ocultas.' },
];

// We need lucide imports
import { Shield, Zap } from 'lucide-react';

export default function SobreNosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#2e7ec6]/10 text-[#2e7ec6] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              🏆 Desde 2016
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
              A empresa que digitalizou a{' '}
              <span className="text-[#2e7ec6]">tradução juramentada</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              A eTraduções é uma empresa brasileira de tradução juramentada, certificada e técnica,
              fundada em 2016 em Curitiba, PR. Fazemos parte do <strong>Grupo Ferrara</strong> e
              somos membros da <strong>American Translators Association (ATA)</strong>.
            </p>
            <p className="text-base text-gray-500">
              Nossa missão é simplificar e digitalizar o processo de tradução de documentos,
              tornando-o mais rápido, econômico e acessível para pessoas físicas e empresas
              em todo o Brasil e no exterior.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#2e7ec6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '+10.000', label: 'Traduções realizadas' },
              { value: '+14', label: 'Idiomas disponíveis' },
              { value: '3', label: 'Escritórios no Brasil' },
              { value: '4.9/5', label: 'Avaliação no Google' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-blue-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-[#2e7ec6]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#2e7ec6]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-10 text-center">
            Nossa História
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#2e7ec6]/20" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#2e7ec6] flex items-center justify-center text-white font-extrabold text-xs shrink-0 z-10 shadow-lg">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Associações e Certificações</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center max-w-xs">
              <Globe size={32} className="text-[#2e7ec6] mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">American Translators Association</h3>
              <p className="text-sm text-gray-500 mt-1">Membros desde 2022</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center max-w-xs">
              <Award size={32} className="text-[#2e7ec6] mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Tradutores Públicos</h3>
              <p className="text-sm text-gray-500 mt-1">Matriculados nas Juntas Comerciais</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center max-w-xs">
              <Users size={32} className="text-[#2e7ec6] mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Grupo Ferrara</h3>
              <p className="text-sm text-gray-500 mt-1">Empresa do Grupo Ferrara</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
