'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Users,
  Languages,
  Globe,
  Calendar,
  Layers,
  Video,
  Rocket,
  CheckCircle2,
  TrendingUp,
  Palette,
  Headphones,
  PieChart,
  Handshake,
  DollarSign,
  ArrowRight,
  Star,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Send,
  MessageCircle,
} from 'lucide-react';
import { createQuote } from '@/lib/firestore';

interface FormDataState {
  fullName: string;
  email: string;
  whatsapp: string;
  socialHandle: string;
  niche: string;
  audienceSize: string;
  site: string;
  notes: string;
}

const initialForm: FormDataState = {
  fullName: '',
  email: '',
  whatsapp: '',
  socialHandle: '',
  niche: '',
  audienceSize: '',
  site: '',
  notes: '',
};

const SUCCESS_CASES = [
  {
    name: 'Paulo Basso Jr.',
    handle: '@rotadeferias',
    handleUrl: 'https://www.instagram.com/rotadeferias/',
    image: '/themes/web/assets/img/lp/paulo.png',
    quote:
      'Achei muito positiva a parceria com a TraduzTudo. Acredito que conseguimos alinhar uma informação útil para os seguidores ao serviço da empresa, agregando valor ao conteúdo. Todas as tratativas ocorreram de forma cordial e os resultados superaram o esperado.',
    period: '25/02/2025 ao 23/04/2025',
    roas: '4.12',
    invested: 'R$ 3.650,41',
    sales: 'R$ 15.041,20',
    commission: 'R$ 752,06',
  },
  {
    name: 'Deborah',
    handle: '@rotina_de_expatriacao',
    handleUrl: 'https://www.instagram.com/rotina_de_expatriacao/',
    image: '/themes/web/assets/img/lp/deborah.png',
    quote:
      'Minha experiência com a TraduzTudo foi excelente! Desde o primeiro contato, tudo foi conduzido com extrema clareza. A comunicação e o alinhamento de ideias fluíram muito bem e o retorno da campanha com meu público de expatriação foi incrível.',
    period: '13/03/2025 ao 23/04/2025',
    roas: '5.63',
    invested: 'R$ 2.036,35',
    sales: 'R$ 11.483,35',
    commission: 'R$ 574,14',
  },
  {
    name: 'Camila Silveira',
    handle: '@assessoriainternacional',
    handleUrl: 'https://www.instagram.com/traduz_tudo_/',
    image: '/themes/web/assets/img/lp/camila.png',
    quote:
      'A parceria entre a nossa assessoria de cidadania e a TraduzTudo tem gerado frutos consistentes. A criação de conteúdos em conjunto foi uma excelente estratégia, gerando valor real para nossos clientes que precisam de traduções juramentadas e apostila de Haia.',
    period: '01/02/2025 ao 28/02/2025',
    roas: '6.10',
    invested: 'R$ 6.000,00',
    sales: 'R$ 42.840,00',
    commission: 'R$ 2.142,00',
  },
];

const FAQS = [
  {
    q: 'Como funciona o Programa de Parceiros da TraduzTudo?',
    a: 'Você indica os serviços oficiais da TraduzTudo (Tradução Juramentada, Certificada, Técnica e Apostila de Haia) para sua audiência através de um cupom exclusivo e links personalizados. A cada contratação confirmada, você recebe uma comissão percentual sobre o valor total do serviço.',
  },
  {
    q: 'Como e quando são realizados os pagamentos das comissões?',
    a: 'Os pagamentos são apurados mensalmente de forma 100% transparente e transferidos diretamente via PIX para sua conta até o dia 10 do mês subsequente, com relatório detalhado de conversões.',
  },
  {
    q: 'Preciso ter empresa (CNPJ) para me inscrever?',
    a: 'Não é obrigatório! Aceitamos tanto criadores e parceiros pessoa física (com emissão de RPA ou PIX direto conforme legislação) quanto pessoas jurídicas com emissão de nota fiscal de prestação de serviços.',
  },
  {
    q: 'A TraduzTudo disponibiliza suporte criativo e roteiros?',
    a: 'Sim! Nosso time de marketing fornece briefings, sugestões de pautas, criativos prontos para stories/feed e suporte direto no WhatsApp para tirar dúvidas e otimizar suas publicações.',
  },
  {
    q: 'A TraduzTudo impulsiona os conteúdos que eu produzir?',
    a: 'Sim. Em publicações colaborativas com boa tração e relevância para o público-alvo, investimos em tráfego pago conjunto para multiplicar o alcance do vídeo e escalar o número de contratações do seu cupom.',
  },
  {
    q: 'Quem realiza o atendimento dos clientes que eu indicar?',
    a: 'Nossa equipe comercial cuida de 100% do atendimento: orçamentos rápidos pelo WhatsApp, conferência de documentos, execução jurídica e envio para todo o Brasil e exterior. Você não precisa se preocupar com nenhuma etapa operacional.',
  },
];

export default function ProgramaDeParceirosClient() {
  const [formData, setFormData] = useState<FormDataState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Auto-mask Brazilian phone number: (99) 99999-9999
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.substring(0, 11);
    let formatted = val;
    if (val.length > 10) {
      formatted = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
    } else if (val.length > 6) {
      formatted = `(${val.substring(0, 2)}) ${val.substring(2, 6)}-${val.substring(6)}`;
    } else if (val.length > 2) {
      formatted = `(${val.substring(0, 2)}) ${val.substring(2)}`;
    } else if (val.length > 0) {
      formatted = `(${val}`;
    }
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSubmitting(true);
    const notesSummary = [
      '[INSCRIÇÃO PROGRAMA DE PARCEIROS & INFLUENCIADORES]',
      `Nome: ${formData.fullName}`,
      `E-mail: ${formData.email}`,
      `WhatsApp: ${formData.whatsapp}`,
      `Rede Social / Perfil: ${formData.socialHandle || 'Não informado'}`,
      `Nicho de Atuação: ${formData.niche || 'Geral'}`,
      `Tamanho da Audiência: ${formData.audienceSize || 'Não informado'}`,
      `Site: ${formData.site || 'Nenhum'}`,
      `Mensagem / Observações: ${formData.notes || 'Sem observações adicionais'}`,
    ].join('\n');

    try {
      await createQuote({
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        serviceType: 'juramentada',
        sourceLanguage: 'pt',
        targetLanguage: 'pt',
        notes: notesSummary,
        fileNames: [],
      });

      setSubmitted(true);
      toast.success('Inscrição enviada com sucesso! Nossa equipe entrará em contato.');

      // Also trigger direct WhatsApp chat opening
      const encodedMsg = encodeURIComponent(
        `Olá! Acabei de me inscrever no Programa de Parceiros da TraduzTudo:\n\n*Nome:* ${formData.fullName}\n*E-mail:* ${formData.email}\n*WhatsApp:* ${formData.whatsapp}\n*Rede Social:* ${formData.socialHandle}\n*Nicho:* ${formData.niche || 'Geral'}\n*Audiência:* ${formData.audienceSize || 'N/A'}\n\nGostaria de falar com o time de parcerias para acelerar nosso alinhamento!`
      );
      window.open(`https://wa.me/5511947485091?text=${encodedMsg}`, '_blank');
    } catch (err) {
      console.error('Erro ao enviar formulário de parceiros:', err);
      toast.error('Ocorreu um erro ao enviar. Redirecionando para o WhatsApp comercial...');
      const fallbackMsg = encodeURIComponent(
        `Olá! Tentei me inscrever no Programa de Parceiros da TraduzTudo:\nNome: ${formData.fullName}\nWhatsApp: ${formData.whatsapp}\nRede: ${formData.socialHandle}`
      );
      window.open(`https://wa.me/5511947485091?text=${fallbackMsg}`, '_blank');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('contato');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111738] antialiased">
      {/* ==============================================================
          SECTION 1: HERO SECTION
          ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f0f5ff] to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-blue-100/60">
        <div className="absolute inset-0 bg-[radial-gradient(#2e7ec6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-[#1e4497] font-semibold text-xs tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2e7ec6]" />
                PROGRAMA PARTNERS & INFLUENCIADORES
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#002b49] leading-[1.18] tracking-tight">
                Seja nosso parceiro e monetize sua audiência com a{' '}
                <span className="text-[#2e7ec6]">TraduzTudo</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Faça parte da nossa rede exclusiva de parceiros, criadores e influenciadores.
                Indique serviços essenciais de Tradução Juramentada e Apostila de Haia para quem vai viajar, estudar
                ou morar no exterior — e receba comissões automáticas via PIX.
              </p>

              {/* Quick highlight pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-1 text-left">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-blue-100 shadow-xs">
                  <DollarSign className="w-5 h-5 text-[#00aa4e] shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Comissões até 15%</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-blue-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#2e7ec6] shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Pagamentos no PIX</span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-blue-100 shadow-xs">
                  <TrendingUp className="w-5 h-5 text-[#1e4497] shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Cupom Exclusivo</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-base shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Inscrever-se agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <a
                  href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20Programa%20de%20Parceiros%20da%20TraduzTudo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-[#1e4497] font-semibold text-base border-2 border-blue-200/80 shadow-xs hover:border-[#2e7ec6] transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-[#00aa4e]" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Hero Graphic */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[480px]">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#2e7ec6]/20 to-[#38bdf8]/10 rounded-3xl blur-2xl -z-10" />
                <Image
                  src="/themes/web/assets/img/lp/hero.png"
                  alt="Programa de Parceiros TraduzTudo"
                  width={560}
                  height={520}
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 2: CONHEÇA A TRADUZTUDO
          ============================================================== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] bg-blue-50 px-3 py-1 rounded-full">
              Autoridade Nacional
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49] mt-3">
              Conheça a <span className="text-[#2e7ec6]">TraduzTudo</span>
            </h2>
            <p className="text-slate-600 mt-3 text-base md:text-lg">
              A TraduzTudo é referência em Tradução Juramentada, Tradução Certificada Internacional e Apostilamento de
              Haia com atendimento em todo o país e no exterior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100/70 text-[#2e7ec6] flex items-center justify-center mb-5 shadow-xs">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#002b49] mb-2">50+ Especialistas</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Tradutores juramentados e especialistas com sede física em São Paulo - SP e cobertura nacional.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100/70 text-[#2e7ec6] flex items-center justify-center mb-5 shadow-xs">
                <Languages className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#002b49] mb-2">15+ Idiomas</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Traduções Juramentadas, técnicas e certificadas válidas em consulados, tribunais e universidades.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100/70 text-[#2e7ec6] flex items-center justify-center mb-5 shadow-xs">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#002b49] mb-2">Entrega Global</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Envio com assinatura digital ICP-Brasil aceita em todo o mundo, além de entregas físicas expressas.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/empresa-de-traducao"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1e4497] hover:bg-[#163478] text-white font-semibold text-sm shadow-md transition-all"
            >
              Conheça nossa história
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 3: NOSSOS NÚMEROS MENSAIS
          ============================================================== */}
      <section className="py-16 md:py-20 bg-[#EFF2FC] relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">
              Nossos <span className="text-[#2e7ec6]">Números</span>
            </h2>
            <p className="text-slate-500 text-lg italic mt-1">Resultados mensais consistentes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-blue-100 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#2e7ec6] mb-1">+2.000</div>
              <p className="text-sm font-medium text-slate-600">Clientes Atendidos</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-blue-100 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#2e7ec6] mb-1">+10.000</div>
              <p className="text-sm font-medium text-slate-600">Documentos Traduzidos</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-blue-100 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#2e7ec6] mb-1">+3.000</div>
              <p className="text-sm font-medium text-slate-600">Projetos Concluídos</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-blue-100 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-black text-[#2e7ec6] mb-1">+6.000</div>
              <p className="text-sm font-medium text-slate-600">Apostilas de Haia</p>
            </div>
          </div>

          {/* Decorative document image */}
          <div className="hidden lg:block absolute -right-6 -bottom-10 pointer-events-none opacity-40">
            <Image
              src="/themes/web/assets/img/lp/documento-portugues.png"
              alt="Documento TraduzTudo"
              width={260}
              height={260}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 4: CONFIANÇA & PROVA SOCIAL (Google & Facebook)
          ============================================================== */}
      <section className="py-20 bg-[#002b49] text-white relative overflow-hidden">
        {/* Subtle decorative doc image */}
        <div className="hidden md:block absolute left-6 top-8 opacity-25 pointer-events-none">
          <Image
            src="/themes/web/assets/img/lp/documento-italiano.png"
            alt="Documento Italiano"
            width={210}
            height={210}
            className="object-contain"
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/40 px-3 py-1 rounded-full">
              Credibilidade Comprovada
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
              Confiança que <span className="text-[#38bdf8]">Gera Resultados</span>
            </h2>
            <p className="text-slate-300 mt-3 text-base">
              Somos a empresa de tradução mais bem avaliada do Google e do Facebook. Seu seguidor será atendido com
              excelência.
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 flex flex-col justify-between hover:border-sky-400/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/themes/web/assets/img/review-1.webp"
                    alt="Carla Peixoto Muniz"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/60"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base">Carla Peixoto Muniz</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-6">
                  &ldquo;Recomendo demais a TraduzTudo 💙! Melhor preço do mercado e rapidez incrível. Tiraram todas as
                  minhas dúvidas pelo WhatsApp e o acompanhamento do pedido foi super transparente. Indico para todo mundo!&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400">
                <span>Publicado em 22/09/2023</span>
                <Image
                  src="/themes/web/assets/img/google.svg"
                  alt="Google Review"
                  width={20}
                  height={20}
                  className="opacity-90"
                />
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 flex flex-col justify-between hover:border-sky-400/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/themes/web/assets/img/review-6.webp"
                    alt="Gisele S. Ferreira"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/60"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base">Gisele S. Ferreira</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-6">
                  &ldquo;A TraduzTudo é uma empresa de total confiança. Entregam as traduções com agilidade e total
                  segurança jurídica. Suporte muito atencioso desde o envio até a entrega final com assinatura digital.&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400">
                <span>Publicado em 02/08/2023</span>
                <Image
                  src="/themes/web/assets/img/google.svg"
                  alt="Google Review"
                  width={20}
                  height={20}
                  className="opacity-90"
                />
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 flex flex-col justify-between hover:border-sky-400/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/themes/web/assets/img/review-4.webp"
                    alt="Marta Carvalho Aguiar"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/60"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base">Marta Carvalho Aguiar</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-6">
                  &ldquo;Excelente trabalho de tradução juramentada com a TraduzTudo! Valores justos e acessíveis, além
                  de um atendimento cordial e ágil pelo WhatsApp. Equipe muito prestativa do início ao fim!&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400">
                <span>Publicado em 08/09/2023</span>
                <Image
                  src="/themes/web/assets/img/google.svg"
                  alt="Google Review"
                  width={20}
                  height={20}
                  className="opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
            <Link
              href="/avaliacoes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-all"
            >
              <span>Google Avaliações</span>
              <strong className="text-amber-400 font-bold">4.9/5 ★</strong>
            </Link>

            <a
              href="https://www.facebook.com/profile.php?id=61594891905671"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white font-medium text-sm border border-[#1877F2]/40 transition-all"
            >
              <span>Facebook Oficial</span>
              <strong className="text-amber-400 font-bold">4.9/5 ★</strong>
            </a>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 5: NOSSA PROPOSTA (4 PASSOS)
          ============================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 4 Steps */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] bg-blue-50 px-3 py-1 rounded-full">
                  Fluxo Simplificado
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49] mt-3">
                  Nossa Proposta de Parceria
                </h2>
                <p className="text-slate-600 mt-2 text-base">
                  Construímos parcerias de longo prazo, fornecendo todo o apoio comercial e técnico para sua audiência.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Step 1 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 hover:border-[#2e7ec6] hover:bg-blue-50/40 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base group-hover:text-[#2e7ec6] transition-colors">
                      01. Reunião de Alinhamento
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      30 minutos para definirmos temas, perfil de público, cupom exclusivo e estratégia conjunta.
                    </p>
                  </div>
                </a>

                {/* Step 2 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 hover:border-[#2e7ec6] hover:bg-blue-50/40 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base group-hover:text-[#2e7ec6] transition-colors">
                      02. Colaboração & Conteúdo
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Desenvolvemos juntos roteiros, materiais visuais, briefings informativos e artes personalizadas.
                    </p>
                  </div>
                </a>

                {/* Step 3 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 hover:border-[#2e7ec6] hover:bg-blue-50/40 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base group-hover:text-[#2e7ec6] transition-colors">
                      03. Veiculação nos Canais
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Distribuição em stories, reels, posts, vídeos no YouTube e bio com seu link e cupom promocional.
                    </p>
                  </div>
                </a>

                {/* Step 4 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 hover:border-[#2e7ec6] hover:bg-blue-50/40 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base group-hover:text-[#2e7ec6] transition-colors">
                      04. Impulsionamento com Tráfego Pago
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Investimos mídia paga nos melhores criativos para escalar o alcance da campanha e suas comissões.
                    </p>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#2e7ec6] hover:bg-[#1e4497] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Tenho interesse na parceria
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Right Column: Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[540px]">
                <Image
                  src="/themes/web/assets/img/lp/nossa-proposta.png"
                  alt="Nossa proposta de parceria"
                  width={640}
                  height={560}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: VÍDEO DO PROGRAMA DE AFILIAÇÃO
          ============================================================== */}
      <section className="py-20 bg-gradient-to-r from-[#1e4497] via-[#2e7ec6] to-[#1e4497] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200 bg-white/10 px-3 py-1 rounded-full">
              Vídeo Explicativo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">Programa de Afiliação</h2>
            <p className="text-white/85 text-base mt-2">Assista ao vídeo para entender como funciona na prática.</p>
          </div>

          {/* 16:9 Video Box */}
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 aspect-video">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/EgM6Daz-8mc"
              title="Programa de Afiliação e Parcerias TraduzTudo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 7: CASOS REAIS DE SUCESSO (INFLUENCIADORES)
          ============================================================== */}
      <section className="py-20 bg-[#EFF2FC]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] bg-blue-100/70 px-3 py-1 rounded-full">
              Resultados Comprovados
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49] mt-3">Casos de Sucesso</h2>
            <p className="text-slate-600 mt-2 text-base">
              Veja os resultados reais que nossos parceiros estão alcançando com o programa de afiliação da TraduzTudo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUCCESS_CASES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all"
              >
                {/* Profile header & testimonial */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={72}
                      height={72}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#2e7ec6]"
                    />
                    <div>
                      <h3 className="font-bold text-[#002b49] text-lg leading-snug">{item.name}</h3>
                      <a
                        href={item.handleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#2e7ec6] hover:underline"
                      >
                        {item.handle}
                      </a>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                </div>

                {/* Metrics Box */}
                <div className="p-6 bg-slate-50/90 border-t border-slate-100 space-y-4">
                  <div>
                    <h4 className="font-bold text-[#002b49] text-base">Resultado Total</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Período: {item.period} |{' '}
                      <span className="font-bold text-[#1e4497]">ROAS: {item.roas}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-200/60">
                    <div>
                      <span className="text-xs text-slate-500 block">Valor investido</span>
                      <strong className="text-sm sm:text-base font-bold text-[#002b49]">{item.invested}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Valor vendido</span>
                      <strong className="text-sm sm:text-base font-bold text-[#002b49]">{item.sales}</strong>
                    </div>
                  </div>

                  {/* Highlight Commission Pill */}
                  <div className="p-3.5 rounded-xl border-2 border-dashed border-[#00aa4e] bg-green-50/70 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00aa4e]">Comissão</span>
                    <div className="flex items-center gap-1.5 text-[#00aa4e]">
                      <strong className="text-lg font-black">{item.commission}</strong>
                      <CheckCircle2 className="w-5 h-5 fill-[#00aa4e] text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 8: COMO TE AJUDAMOS (5 PILARES)
          ============================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 5 Support Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] bg-blue-50 px-3 py-1 rounded-full">
                  Suporte Integral
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49] mt-3">Como te ajudamos</h2>
                <p className="text-slate-600 mt-2 text-base">
                  Cuidamos de toda a infraestrutura operacional para você se concentrar no que faz de melhor: criar
                  conteúdo e conectar pessoas.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {/* Pillar 1 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Design & Criativos</h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Criação de artes profissionais e banners que se destacam no feed e nos stories da sua audiência.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Suporte Comercial Dedicado</h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Canal de atendimento direto no WhatsApp com rapidez para converter e tirar dúvidas de seus leads.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Monetização & ROAS</h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Estratégias otimizadas e testes de comunicação com foco em maximizar suas conversões e lucros.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Parceria com Segurança Jurídica</h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Termos claros, transparência e respeito irrestrito aos direitos e à reputação do criador.
                    </p>
                  </div>
                </div>

                {/* Pillar 5 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-200 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5 text-[#00aa4e]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Pagamentos Pontuais via PIX</h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Repasses mensais programados com extrato detalhado para total tranquilidade financeira.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[500px]">
                <Image
                  src="/themes/web/assets/img/lp/como-ajudamos.png"
                  alt="Como te ajudamos"
                  width={600}
                  height={540}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 9: FORMULÁRIO DE PRÉ-INSCRIÇÃO (#contato)
          ============================================================== */}
      <section id="contato" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 relative">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="/themes/web/assets/img/Vector-1.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6]">
                  Inscrição Rápida
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b49]">Vamos começar?</h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1 mb-8">
                Preencha o formulário abaixo. Nossa equipe de parcerias entrará em contato em poucas horas.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-[#00aa4e] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">Inscrição Enviada com Sucesso!</h3>
                  <p className="text-sm text-green-700 max-w-md mx-auto">
                    Recebemos seus dados e nossa equipe de parcerias já foi notificada. Para agilizar o atendimento, você
                    também pode falar direto conosco no WhatsApp:
                  </p>
                  <a
                    href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Enviei%20minha%20pr%C3%A9-inscri%C3%A7%C3%A3o%20no%20Programa%20de%20Parceiros%20da%20TraduzTudo%20e%20gostaria%20de%20falar%20com%20o%20gerente."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Abrir Conversa no WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Nome Completo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all"
                    />
                  </div>

                  {/* Email & WhatsApp Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        E-mail de contato <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        WhatsApp (com DDD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Social Handle & Niche Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Rede Social Principal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: @seuperfil ou youtube.com/canal"
                        value={formData.socialHandle}
                        onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nicho de Conteúdo
                      </label>
                      <select
                        value={formData.niche}
                        onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all bg-white"
                      >
                        <option value="">Selecione o nicho</option>
                        <option value="Viagem e Turismo">Viagem & Turismo</option>
                        <option value="Cidadania Italiana/Europeia">Cidadania Italiana / Europeia</option>
                        <option value="Intercâmbio e Estudos">Intercâmbio & Estudos no Exterior</option>
                        <option value="Carreira e Vistos">Carreira Internacional & Vistos</option>
                        <option value="Direito e Imigração">Direito & Assessoria de Imigração</option>
                        <option value="Estilo de Vida e Cultura">Estilo de Vida & Outros</option>
                      </select>
                    </div>
                  </div>

                  {/* Audience size & Site */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Tamanho da Audiência
                      </label>
                      <select
                        value={formData.audienceSize}
                        onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all bg-white"
                      >
                        <option value="">Selecione a faixa</option>
                        <option value="Até 10k seguidores">Até 10.000 seguidores</option>
                        <option value="10k a 50k seguidores">10.000 a 50.000 seguidores</option>
                        <option value="50k a 200k seguidores">50.000 a 200.000 seguidores</option>
                        <option value="Mais de 200k seguidores">Mais de 200.000 seguidores</option>
                        <option value="Assessoria/Agência">Assessoria / Agência com clientes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Site / Blog (opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://seusite.com.br"
                        value={formData.site}
                        onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mensagem / Ideia de Ação (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Conte-nos brevemente como podemos colaborar juntos..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2e7ec6] focus:ring-2 focus:ring-[#2e7ec6]/20 text-slate-800 text-sm outline-hidden transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-6 rounded-xl bg-[#2e7ec6] hover:bg-[#1e4497] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Enviando dados...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Enviar Inscrição de Parceiro</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px]">
                <Image
                  src="/themes/web/assets/img/lp/bg-contato.png"
                  alt="Contato Parceiros TraduzTudo"
                  width={560}
                  height={560}
                  className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 10: PERGUNTAS FREQUENTES (FAQ)
          ============================================================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2e7ec6] bg-blue-50 px-3 py-1 rounded-full">
              Tire suas Dúvidas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49] mt-3">Perguntas Frequentes</h2>
            <p className="text-slate-600 mt-2 text-base">
              Tudo o que você precisa saber sobre o Programa de Parceiros e Afiliados da TraduzTudo.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white hover:border-blue-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left font-bold text-[#002b49] flex items-center justify-between gap-4 text-base sm:text-lg focus:outline-hidden"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2e7ec6] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 11: FINAL CTA BANNER
          ============================================================== */}
      <section className="py-16 bg-[#002b49] text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Pronto para faturar com o maior ecossistema de traduções do Brasil?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Nossa equipe de parcerias está pronta para alinhar um cupom exclusivo para sua audiência.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contato"
              onClick={scrollToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-base shadow-lg transition-all"
            >
              Fazer Minha Inscrição
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>

            <a
              href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Quero%20conversar%20sobre%20a%20parceria%20com%20a%20TraduzTudo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-[#00aa4e]" />
              Falar Direto no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
