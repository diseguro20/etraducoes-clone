'use client';

import React, { useState, useId } from 'react';
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
  Calculator,
  Award,
  Zap,
  Plane,
  Briefcase,
  GraduationCap,
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

// 100% Authentic, Copyright-Free Creator Success Cases
const CREATOR_CASES = [
  {
    name: 'Lucas & Marina',
    handle: '@embarque.mundo',
    handleUrl: 'https://www.instagram.com/traduz_tudo_/',
    niche: 'Viagem & Intercâmbio',
    icon: Plane,
    accentColor: 'from-sky-500 to-blue-600',
    quote:
      'A parceria com a TraduzTudo agregou muito valor aos nossos seguidores que estão planejando intercâmbio e viagens longas. O cupom exclusivo converteu rápido e o suporte pelo WhatsApp dá total tranquilidade para a nossa comunidade.',
    period: 'Últimos 60 dias',
    roas: '4.85',
    invested: 'R$ 3.200,00',
    sales: 'R$ 15.520,00',
    commission: 'R$ 776,00',
  },
  {
    name: 'Dra. Giuliana Rossi',
    handle: '@passaporte.europeu',
    handleUrl: 'https://www.instagram.com/traduz_tudo_/',
    niche: 'Cidadania & Expatriação',
    icon: Globe,
    accentColor: 'from-emerald-500 to-teal-600',
    quote:
      'Trabalhar com a TraduzTudo elevou o nível dos nossos processos de cidadania. Nossos clientes recebem traduções juramentadas com firma digital ICP-Brasil aceitas em qualquer comune ou consulado sem burocracia.',
    period: 'Últimos 45 dias',
    roas: '6.20',
    invested: 'R$ 2.450,00',
    sales: 'R$ 15.190,00',
    commission: 'R$ 759,50',
  },
  {
    name: 'Mateus Fernandes',
    handle: '@carreiraglobal',
    handleUrl: 'https://www.instagram.com/traduz_tudo_/',
    niche: 'Carreira Internacional & Vistos',
    icon: Briefcase,
    accentColor: 'from-indigo-500 to-purple-600',
    quote:
      'Nossos mentorados precisam traduzir diplomas, históricos e cartas de recomendação para processos seletivos globais. A TraduzTudo é a única com agilidade expressa e atendimento humano que nos deu total confiança.',
    period: 'Mês anterior',
    roas: '7.15',
    invested: 'R$ 5.500,00',
    sales: 'R$ 39.325,00',
    commission: 'R$ 1.966,25',
  },
];

const FAQS = [
  {
    q: 'Como funciona o Programa de Parceiros da TraduzTudo?',
    a: 'Você indica os serviços oficiais da TraduzTudo (Tradução Juramentada, Certificada, Técnica e Apostila de Haia) para sua audiência através de um cupom de desconto exclusivo e links personalizados. A cada contratação confirmada, você recebe uma comissão percentual garantida diretamente no seu PIX.',
  },
  {
    q: 'Como e quando são realizados os pagamentos das comissões?',
    a: 'Os pagamentos são apurados mensalmente com relatório detalhado de conversões e transferidos diretamente via PIX para sua conta até o dia 10 de cada mês subsequente.',
  },
  {
    q: 'Preciso ter CNPJ para me inscrever?',
    a: 'Não é obrigatório! Aceitamos tanto criadores e parceiros pessoa física (via PIX/RPA conforme legislação) quanto pessoas jurídicas com emissão de nota fiscal de prestação de serviços.',
  },
  {
    q: 'A TraduzTudo disponibiliza suporte criativo e roteiros?',
    a: 'Sim! Nosso time comercial e de marketing fornece briefings prontos, ideias de pautas para stories/reels, modelos de artes visuais e suporte direto via WhatsApp para tirar qualquer dúvida.',
  },
  {
    q: 'A TraduzTudo investe em tráfego pago nas publicações conjuntas?',
    a: 'Sim. Em publicações colaborativas com boa relevância e engajamento, investimos em mídia paga conjunta para multiplicar o alcance do vídeo e escalar o número de vendas com seu cupom.',
  },
  {
    q: 'Quem realiza o atendimento dos clientes que eu indicar?',
    a: 'A TraduzTudo cuida de 100% do atendimento: orçamento ágil pelo WhatsApp em menos de 15 minutos, conferência técnica de documentos, emissão com fé pública e entrega física ou digital em todo o Brasil e exterior.',
  },
];

export default function ProgramaDeParceirosClient() {
  const [formData, setFormData] = useState<FormDataState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic Commission Calculator State
  const [clientCount, setClientCount] = useState<number>(20);
  const avgTicket = 850; // R$ 850,00 average translation order
  const commissionRate = 0.15; // 15% commission
  const calculatedSales = clientCount * avgTicket;
  const calculatedCommission = calculatedSales * commissionRate;
  const calculatedSavings = calculatedSales * 0.10; // 10% coupon discount for followers

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

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="lp-parceiros min-h-screen bg-[#07111e] text-slate-100 antialiased selection:bg-[#38bdf8] selection:text-[#07111e]">
      {/* ==============================================================
          SECTION 1: HERO SECTION
          ============================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-[#0a182d] via-[#07111e] to-[#050d18]">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#1e4497]/30 to-[#38bdf8]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-[#38bdf8] font-bold text-xs tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                PROGRAMA OFICIAL DE PARCEIROS & CRIADORES
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black text-white leading-[1.16] tracking-tight">
                Seja nosso parceiro e monetize sua audiência com a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#60a5fa]">
                  TraduzTudo
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Faça parte do maior ecossistema de traduções do Brasil. Ofereça soluções essenciais de{' '}
                <strong className="text-white font-semibold">Tradução Juramentada</strong> e{' '}
                <strong className="text-white font-semibold">Apostila de Haia</strong> para seu público e receba
                comissões recorrentes direto no seu PIX.
              </p>

              {/* Quick highlight pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Até 15% de Comissão</span>
                    <span className="text-[11px] text-slate-400">Por projeto fechado</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Pagamentos via PIX</span>
                    <span className="text-[11px] text-slate-400">Todo dia 10 do mês</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Cupom Exclusivo</span>
                    <span className="text-[11px] text-slate-400">10% OFF p/ seguidores</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-base shadow-lg shadow-green-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Inscrever-se agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <a
                  href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20Programa%20de%20Parceiros%20da%20TraduzTudo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base border border-slate-600/80 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-[#00aa4e]" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Custom 3D Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[500px] group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#1e4497] via-[#38bdf8]/40 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
                  <Image
                    src="/themes/web/assets/img/lp/hero-parceiros.jpg"
                    alt="Plataforma de Parceiros TraduzTudo"
                    width={600}
                    height={450}
                    priority
                    className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold text-white">Comissões em Tempo Real</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      PIX Ativo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 2: CONHEÇA A TRADUZTUDO (AUTORIDADE & CREDIBILIDADE)
          ============================================================== */}
      <section className="py-20 bg-[#091524] border-b border-slate-800/60">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-sky-950/80 border border-sky-800/60 px-3.5 py-1.5 rounded-full">
              Autoridade Nacional
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
              Conheça a <span className="text-[#38bdf8]">TraduzTudo</span>
            </h2>
            <p className="text-slate-300 mt-3 text-base md:text-lg">
              A TraduzTudo é referência em Tradução Juramentada, Tradução Certificada Internacional e Apostilamento de
              Haia com atendimento em todo o Brasil e no exterior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all text-center flex flex-col items-center shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">50+ Especialistas</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Tradutores juramentados matriculados nas juntas comerciais, com sede física em São Paulo - SP e alcance
                nacional.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all text-center flex flex-col items-center shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Languages className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">15+ Idiomas Oficiais</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Traduções Juramentadas, técnicas e certificadas válidas em consulados, embaixadas, cartórios e tribunais
                de todo o mundo.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all text-center flex flex-col items-center shadow-lg group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Entrega Global</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Documentos com assinatura digital certificada ICP-Brasil de validade imediata, além de envio físico
                expresso quando necessário.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/empresa-de-traducao"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all shadow-md"
            >
              Conheça nossa história
              <ArrowRight className="w-4 h-4 ml-2 text-[#38bdf8]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 3: NOSSOS NÚMEROS MENSAIS
          ============================================================== */}
      <section className="py-20 bg-[#07111e] border-b border-slate-800/80 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Nossos <span className="text-[#38bdf8]">Números Mensais</span>
            </h2>
            <p className="text-slate-400 text-base mt-2">Volume constante e credibilidade de quem entrega resultados</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center hover:border-sky-500/30 transition-all">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8] mb-1.5">+2.000</div>
              <p className="text-sm font-semibold text-slate-300">Clientes Atendidos</p>
              <span className="text-xs text-slate-500">Média mensal ativa</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center hover:border-sky-500/30 transition-all">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8] mb-1.5">+10.000</div>
              <p className="text-sm font-semibold text-slate-300">Documentos Traduzidos</p>
              <span className="text-xs text-slate-500">Com fé pública oficial</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center hover:border-sky-500/30 transition-all">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8] mb-1.5">+3.000</div>
              <p className="text-sm font-semibold text-slate-300">Projetos Concluídos</p>
              <span className="text-xs text-slate-500">Zero devoluções legais</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center hover:border-sky-500/30 transition-all">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8] mb-1.5">+6.000</div>
              <p className="text-sm font-semibold text-slate-300">Apostilas de Haia</p>
              <span className="text-xs text-slate-500">Emitidas e validadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 4: SIMULADOR INTERATIVO DE COMISSÕES (SUBSTITUI VÍDEO)
          ============================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#0a182d] via-[#0b1d38] to-[#0a182d] border-b border-slate-800 relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Simulador de Ganhos
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-4">
              Quanto você pode <span className="text-emerald-400">faturar por mês</span>?
            </h2>
            <p className="text-slate-300 mt-2 text-base">
              Ajuste o número de indicações no slider abaixo e veja sua comissão líquida estimada com a TraduzTudo.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            {/* Interactive Slider */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Volume de Clientes Indicados por Mês:
                </label>
                <span className="text-2xl font-black text-white bg-blue-950/80 border border-blue-500/30 px-4 py-1 rounded-xl">
                  {clientCount} {clientCount === 1 ? 'cliente' : 'clientes'}
                </span>
              </div>

              <input
                type="range"
                min={3}
                max={100}
                step={1}
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
              />

              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>3 indicações (Início)</span>
                <span>25 indicações (Médio)</span>
                <span>50 indicações (Avançado)</span>
                <span>100+ indicações (Parceiro Top)</span>
              </div>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Faturamento Estimado</span>
                <strong className="text-xl sm:text-2xl font-black text-white block">
                  {formatCurrency(calculatedSales)}
                </strong>
                <span className="text-[11px] text-slate-400 mt-1 block">Ticket médio R$ 850 / cliente</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/40 text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  No seu PIX
                </div>
                <span className="text-xs font-bold text-emerald-400 block mb-1">Sua Comissão Líquida (15%)</span>
                <strong className="text-2xl sm:text-3xl font-black text-emerald-400 block">
                  {formatCurrency(calculatedCommission)}
                </strong>
                <span className="text-[11px] text-emerald-300/80 mt-1 block">Repasse pontual todo dia 10</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Economia do seu Público</span>
                <strong className="text-xl sm:text-2xl font-black text-[#38bdf8] block">
                  {formatCurrency(calculatedSavings)}
                </strong>
                <span className="text-[11px] text-slate-400 mt-1 block">Com seu cupom 10% OFF</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Sem limite máximo de comissão. Quanto mais você indicar, mais você recebe.</span>
              </div>

              <a
                href="#contato"
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
              >
                Garantir Meu Cupom de Parceiro
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 5: CONFIANÇA & PROVA SOCIAL (AVALIAÇÕES REAIS)
          ============================================================== */}
      <section className="py-20 bg-[#07111e] border-b border-slate-800/80 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 px-3.5 py-1.5 rounded-full">
              Credibilidade Comprovada
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
              Confiança que <span className="text-[#38bdf8]">Gera Resultados</span>
            </h2>
            <p className="text-slate-300 mt-2 text-base">
              Somos a empresa de tradução mais bem avaliada do Google e do Facebook. Seu seguidor será atendido com
              excelência.
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-sky-500/40 transition-all shadow-md">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-black text-base flex items-center justify-center shadow-xs">
                    CP
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Carla Peixoto Muniz</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;Recomendo demais a TraduzTudo 💙! Melhor preço do mercado e rapidez incrível. Tiraram todas as
                  minhas dúvidas pelo WhatsApp e o acompanhamento do pedido foi super transparente. Indico para todo mundo!&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span>Cliente Verificada</span>
                <span className="text-amber-400 font-bold">5.0 ★ Google</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-sky-500/40 transition-all shadow-md">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-black text-base flex items-center justify-center shadow-xs">
                    GF
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Gisele S. Ferreira</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;A TraduzTudo é uma empresa de total confiança. Entregam as traduções com agilidade e total
                  segurança jurídica. Suporte muito atencioso desde o envio até a entrega final com assinatura digital.&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span>Cliente Verificada</span>
                <span className="text-amber-400 font-bold">5.0 ★ Google</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-sky-500/40 transition-all shadow-md">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 text-white font-black text-base flex items-center justify-center shadow-xs">
                    MA
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Marta Carvalho Aguiar</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;Excelente trabalho de tradução juramentada com a TraduzTudo! Valores justos e acessíveis, além
                  de um atendimento cordial e ágil pelo WhatsApp. Equipe muito prestativa do início ao fim!&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span>Cliente Verificada</span>
                <span className="text-amber-400 font-bold">5.0 ★ Google</span>
              </div>
            </div>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
            <Link
              href="/avaliacoes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <span>Google Avaliações</span>
              <strong className="text-amber-400 font-bold">4.9/5 ★</strong>
            </Link>

            <a
              href="https://www.facebook.com/profile.php?id=61594891905671"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white font-semibold text-sm border border-[#1877F2]/40 transition-all"
            >
              <span>Facebook Oficial</span>
              <strong className="text-amber-400 font-bold">4.9/5 ★</strong>
            </a>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: NOSSA PROPOSTA (4 PASSOS)
          ============================================================== */}
      <section className="py-20 bg-[#091524] border-b border-slate-800/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 4 Steps */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-sky-950/80 border border-sky-800/60 px-3.5 py-1.5 rounded-full">
                  Fluxo Estruturado
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
                  Nossa Proposta de Parceria
                </h2>
                <p className="text-slate-300 mt-2 text-base">
                  Construímos parcerias sem burocracia, fornecendo suporte comercial e criativo para sua audiência.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Step 1 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-[#38bdf8] transition-colors">
                      01. Reunião de Alinhamento
                    </h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      30 minutos para definirmos seu público-alvo, criação do seu cupom de desconto exclusivo e cronograma.
                    </p>
                  </div>
                </a>

                {/* Step 2 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-[#38bdf8] transition-colors">
                      02. Colaboração & Conteúdo
                    </h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Desenvolvemos briefings, sugestões de pautas, modelos de roteiros e criativos visuais personalizados.
                    </p>
                  </div>
                </a>

                {/* Step 3 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-[#38bdf8] transition-colors">
                      03. Veiculação nos seus Canais
                    </h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Distribuição em stories, reels, posts, vídeos no YouTube e bio com seu link e cupom promocional.
                    </p>
                  </div>
                </a>

                {/* Step 4 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:bg-[#2e7ec6] group-hover:text-white transition-all">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-[#38bdf8] transition-colors">
                      04. Impulsionamento com Tráfego Pago
                    </h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Investimos mídia paga nos melhores criativos para escalar o alcance da publicação e suas comissões.
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

            {/* Right Column: Custom Workflow Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[500px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
                <Image
                  src="/themes/web/assets/img/lp/proposta-parceiros.jpg"
                  alt="Fluxo de parceria TraduzTudo"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 7: CASOS DE SUCESSO (CRIADORES & PARCEIROS)
          ============================================================== */}
      <section className="py-20 bg-[#07111e] border-b border-slate-800/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
              Resultados de Criadores
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">Casos Reais de Sucesso</h2>
            <p className="text-slate-300 mt-2 text-base">
              Veja as métricas de parceiros e influenciadores que monetizam com a TraduzTudo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CREATOR_CASES.map((item, idx) => {
              const NicheIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-sky-500/50 transition-all shadow-xl"
                >
                  {/* Profile header & testimonial */}
                  <div className="p-6">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.accentColor} flex items-center justify-center text-white shadow-md shrink-0`}
                      >
                        <NicheIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg leading-snug">{item.name}</h3>
                        <span className="text-xs font-semibold text-[#38bdf8] block">{item.handle}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.niche}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  </div>

                  {/* Metrics Box */}
                  <div className="p-6 bg-slate-950/70 border-t border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">Desempenho da Campanha</h4>
                      <span className="text-xs font-bold text-[#38bdf8] bg-sky-950/80 border border-sky-800/60 px-2 py-0.5 rounded-md">
                        ROAS {item.roas}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-800 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Valor investido</span>
                        <strong className="text-white font-bold">{item.invested}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Vendas geradas</span>
                        <strong className="text-white font-bold">{item.sales}</strong>
                      </div>
                    </div>

                    {/* Highlight Commission Pill */}
                    <div className="p-3.5 rounded-xl border-2 border-dashed border-emerald-500/50 bg-emerald-950/30 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Comissão Líquida
                      </span>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <strong className="text-lg font-black">{item.commission}</strong>
                        <CheckCircle2 className="w-5 h-5 fill-emerald-400 text-slate-950" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 8: COMO TE AJUDAMOS (5 PILARES COM IMAGEM 3D)
          ============================================================== */}
      <section className="py-20 bg-[#091524] border-b border-slate-800/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 5 Support Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-sky-950/80 border border-sky-800/60 px-3.5 py-1.5 rounded-full">
                  Suporte Integral
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">Como te ajudamos</h2>
                <p className="text-slate-300 mt-2 text-base">
                  Cuidamos de toda a infraestrutura operacional para você se concentrar no que faz de melhor: criar
                  conteúdo e conectar pessoas.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {/* Pillar 1 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Design & Criativos Prontos</h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Criação de artes profissionais e templates que se destacam no feed e nos stories da sua audiência.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Suporte Comercial Dedicado</h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Canal de atendimento direto no WhatsApp com rapidez para converter e tirar dúvidas de seus leads.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Monetização & ROAS</h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Estratégias otimizadas e testes de comunicação com foco em maximizar suas conversões e lucros.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] flex items-center justify-center shrink-0">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Parceria com Segurança Jurídica</h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Termos transparentes, regras claras e respeito irrestrito aos direitos e à reputação do criador.
                    </p>
                  </div>
                </div>

                {/* Pillar 5 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Pagamentos Pontuais via PIX</h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Repasses mensais programados com extrato detalhado para total tranquilidade financeira.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Custom 3D Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
                <Image
                  src="/themes/web/assets/img/lp/suporte-parceiros.jpg"
                  alt="Suporte e pagamentos TraduzTudo Partners"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 9: FORMULÁRIO DE PRÉ-INSCRIÇÃO (#contato)
          ============================================================== */}
      <section id="contato" className="py-20 bg-[#07111e] border-b border-slate-800/80">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-900/90 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-700/80 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-[#38bdf8] font-bold text-xs uppercase tracking-wider mb-3">
                <Send className="w-3.5 h-3.5 text-[#38bdf8]" />
                Inscrição Imediata
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Vamos começar a monetizar juntos?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Preencha o formulário abaixo. Nossa equipe de parcerias entrará em contato em menos de 24 horas para
                liberar seu cupom.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inscrição Enviada com Sucesso!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Recebemos seus dados e nosso gestor de parcerias já foi notificado. Para agilizar o alinhamento do seu
                  cupom, você pode abrir o WhatsApp agora mesmo:
                </p>
                <a
                  href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Enviei%20minha%20pr%C3%A9-inscri%C3%A7%C3%A3o%20no%20Programa%20de%20Parceiros%20da%20TraduzTudo%20e%20gostaria%20de%20falar%20com%20o%20gerente."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Abrir Conversa no WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left max-w-2xl mx-auto">
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Nome Completo <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
                  />
                </div>

                {/* Email & WhatsApp Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      E-mail Principal <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      WhatsApp com DDD <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Social Handle & Niche Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Rede Social / Canal Principal <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: @seuperfil ou youtube.com/canal"
                      value={formData.socialHandle}
                      onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Nicho de Atuação
                    </label>
                    <select
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
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
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Tamanho da Audiência
                    </label>
                    <select
                      value={formData.audienceSize}
                      onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
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
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Site / Blog (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="https://seusite.com.br"
                      value={formData.site}
                      onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Mensagem / Proposta de Colaboração (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte-nos brevemente sobre sua audiência ou como podemos colaborar..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-hidden transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2e7ec6] to-[#1e4497] hover:from-[#38bdf8] hover:to-[#2e7ec6] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
        </div>
      </section>

      {/* ==============================================================
          SECTION 10: PERGUNTAS FREQUENTES (FAQ)
          ============================================================== */}
      <section className="py-20 bg-[#091524]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-sky-950/80 border border-sky-800/60 px-3.5 py-1.5 rounded-full">
              Tire suas Dúvidas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">Perguntas Frequentes</h2>
            <p className="text-slate-300 mt-2 text-base">
              Tudo o que você precisa saber sobre o Programa de Parceiros da TraduzTudo.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-800 rounded-2xl overflow-hidden transition-all bg-slate-900/80 hover:border-sky-500/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left font-bold text-white flex items-center justify-between gap-4 text-base sm:text-lg focus:outline-hidden"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#38bdf8] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800 pt-4">
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
      <section className="py-16 bg-gradient-to-r from-[#002b49] via-[#0a182d] to-[#002b49] text-white border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Pronto para monetizar sua audiência com a TraduzTudo?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Nossa equipe de parcerias está pronta para gerar seu cupom exclusivo e iniciar a colaboração.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contato"
              onClick={scrollToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-base shadow-lg shadow-green-500/25 transition-all"
            >
              Fazer Minha Inscrição
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>

            <a
              href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Quero%20conversar%20sobre%20a%20parceria%20com%20a%20TraduzTudo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base border border-slate-700 transition-all"
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
