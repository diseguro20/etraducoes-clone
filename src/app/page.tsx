import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { CheckCircle, Star, Clock, Shield, Globe, Award, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Tradução Juramentada',
    description:
      'Tradução oficial com fé pública, realizada por tradutor público. Válida para processos judiciais, certidões, diplomas e qualquer documento legal.',
    href: '/traducao-juramentada',
    icon: '⚖️',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Tradução Certificada',
    description:
      'Disponível no par português-inglês, para uso nos Estados Unidos, Canadá, Inglaterra e Austrália. Aceita por universidades e órgãos oficiais.',
    href: '/traducao-certificada',
    icon: '🎓',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    title: 'Tradução Técnica',
    description:
      'Textos especializados nas áreas jurídica, médica, financeira e científica. Tradutores nativos com domínio técnico da sua área.',
    href: '/traducao-tecnica',
    icon: '🔬',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    title: 'Apostilamento de Haia',
    description:
      'Preparação e encaminhamento de documentos brasileiros para apostilamento. Solução completa para validar seus documentos no exterior.',
    href: '/apostilamento-de-haia',
    icon: '🌍',
    color: 'from-sky-500 to-sky-600',
  },
];

const stats = [
  { value: '+10.000', label: 'Traduções realizadas', icon: '📄' },
  { value: '+14', label: 'Idiomas disponíveis', icon: '🌐' },
  { value: '4.9/5', label: 'Nota no Google', icon: '⭐' },
  { value: 'Desde 2016', label: 'No mercado', icon: '🏆' },
];

const features = [
  { icon: Clock, text: 'Orçamento instantâneo, sem aguardar atendimento' },
  { icon: Shield, text: 'Documentos protegidos com sigilo total' },
  { icon: Globe, text: 'Válido no Brasil e no exterior' },
  { icon: Award, text: 'Tradutores públicos certificados' },
];

const testimonials = [
  {
    name: 'Mariana Costa',
    text: 'Processo super rápido e transparente. Recebi minha tradução juramentada em 3 dias. Recomendo!',
    rating: 5,
    source: 'Google',
  },
  {
    name: 'Roberto Fernandes',
    text: 'Precisei de tradução para cidadania italiana e a eTraduções foi perfeita. Atendimento excelente.',
    rating: 5,
    source: 'Google',
  },
  {
    name: 'Ana Luiza Santos',
    text: 'Melhor empresa de tradução juramentada que já usei. Preço justo e prazo cumprido.',
    rating: 5,
    source: 'Google',
  },
];

const clients = ['Banco do Brasil', 'Spotify', 'Microsoft', 'Yamaha', 'Ambev', 'VTEX', 'EBANX', 'Banco Safra'];

const languages = [
  { name: 'Inglês', flag: '🇺🇸', href: '/traducao-de-ingles' },
  { name: 'Espanhol', flag: '🇪🇸', href: '/traducao-de-espanhol' },
  { name: 'Italiano', flag: '🇮🇹', href: '/traducao-de-italiano' },
  { name: 'Francês', flag: '🇫🇷', href: '/traducao-frances' },
  { name: 'Alemão', flag: '🇩🇪', href: '/traducao-de-alemao' },
  { name: 'Russo', flag: '🇷🇺', href: '/traducao-russo' },
  { name: 'Mandarim', flag: '🇨🇳', href: '/traducao-mandarim' },
  { name: 'Holandês', flag: '🇳🇱', href: '/traducao-de-holandes' },
  { name: 'Japonês', flag: '🇯🇵', href: '/traducao-japones' },
  { name: 'Árabe', flag: '🇸🇦', href: '/traducao-de-arabe' },
  { name: 'Hebraico', flag: '🇮🇱', href: '/traducao-de-hebraico' },
  { name: 'Coreano', flag: '🇰🇷', href: '/traducao-de-coreano' },
  { name: 'Norueguês', flag: '🇳🇴', href: '/traducao-de-noruegues' },
  { name: 'Português', flag: '🇧🇷', href: '/traducao-de-portugues' },
];

export default function HomePage() {
  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — copy */}
            <div className="pt-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
                Traduções Juramentadas{' '}
                <span className="text-[#2e7ec6]">e Certificadas</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Tudo o que você e sua empresa precisam para traduzir documentos de forma
                rápida, econômica e segura.
              </p>
              <p className="text-base text-gray-500 mb-8">Serviço de tradução profissional em +10 idiomas.</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#2e7ec6]/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#2e7ec6]" />
                    </div>
                    <span className="text-gray-700 text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Clients */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  Confiam em nossas traduções:
                </p>
                <div className="flex flex-wrap gap-3">
                  {clients.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="bg-[#2e7ec6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-blue-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] mb-2">
              SOLUÇÕES DE TRADUÇÃO
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">O que nós fazemos</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Somos uma empresa de tradução de documentos. Traduzimos com rapidez, qualidade e tecnologia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white border border-gray-100 hover:border-[#2e7ec6]/30 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2e7ec6] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{s.description}</p>
                <span className="flex items-center gap-1 text-[#2e7ec6] text-sm font-semibold">
                  Saiba mais <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511920037059'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              💬 Iniciar Conversa
            </a>
            <Link
              href="/orcamento-traducoes"
              className="bg-[#2e7ec6] hover:bg-[#1a5fa8] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              Orçamento e Prazo
            </Link>
          </div>
        </div>
      </section>

      {/* ========== LANGUAGES ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] mb-2">IDIOMAS</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              +14 idiomas disponíveis
            </h2>
            <p className="text-gray-500 mt-3">
              Traduzimos para os principais idiomas do mundo, com tradutores públicos certificados.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {languages.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 hover:shadow-md hover:border-[#2e7ec6]/30 border border-transparent transition-all text-center group"
              >
                <span className="text-3xl">{l.flag}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-[#2e7ec6] transition-colors">
                  {l.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] mb-2">COMO FUNCIONA</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              Tradução em 4 passos simples
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Envie seu documento', desc: 'Faça upload do arquivo no formulário de orçamento. Aceitamos PDF, fotos e word.', icon: '📤' },
              { step: '02', title: 'Receba o orçamento', desc: 'Em minutos você recebe o preço e prazo por e-mail e WhatsApp.', icon: '💰' },
              { step: '03', title: 'Aprovação e pagamento', desc: 'Aprove o orçamento e realize o pagamento via PIX, boleto ou cartão.', icon: '✅' },
              { step: '04', title: 'Receba a tradução', desc: 'Entregamos digitalmente por e-mail ou fisicamente pelos Correios.', icon: '📬' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#2e7ec6] rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] mb-2">DEPOIMENTOS</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              O que dizem nossos clientes
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600 font-semibold">4.9/5 no Google</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} className={s <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{t.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 bg-gradient-to-br from-[#1a5fa8] to-[#2e7ec6]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Pronto para traduzir seus documentos?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Solicite um orçamento instantâneo agora mesmo. Sem burocracia, sem espera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orcamento-traducoes"
              className="bg-white text-[#2e7ec6] font-extrabold px-8 py-4 rounded-full text-lg hover:bg-gray-50 transition-colors shadow-xl"
            >
              Solicitar Orçamento
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511920037059'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-extrabold px-8 py-4 rounded-full text-lg transition-colors"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
