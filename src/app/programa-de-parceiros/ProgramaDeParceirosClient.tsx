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
  Send,
  MessageCircle,
  Calculator,
  Plane,
  Briefcase,
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
    niche: 'Viagem & Intercâmbio',
    icon: Plane,
    accentColor: 'from-blue-600 to-sky-500',
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
    niche: 'Cidadania & Expatriação',
    icon: Globe,
    accentColor: 'from-emerald-600 to-teal-500',
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
    niche: 'Carreira Internacional & Vistos',
    icon: Briefcase,
    accentColor: 'from-indigo-600 to-blue-500',
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
  const avgTicket = 850;
  const commissionRate = 0.15;
  const calculatedSales = clientCount * avgTicket;
  const calculatedCommission = calculatedSales * commissionRate;
  const calculatedSavings = calculatedSales * 0.10;

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
    <div className="lp-parceiros min-h-screen bg-white text-slate-800 antialiased font-sans">
      {/* ==============================================================
          SECTION 1: HERO SECTION (LIGHT & CLEAN)
          ============================================================== */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#f8fafc] via-white to-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#2e7ec6] bg-blue-50 px-3.5 py-1.5 rounded-full">
                PROGRAMA PARTNERS
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002b49] leading-[1.15] tracking-tight">
                Seja nosso parceiro e monetize sua audiência
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Faça parte da nossa rede de parceiros e influenciadores. Indique serviços essenciais de Tradução
                Juramentada e Apostila de Haia e comece a faturar comissões no PIX agora mesmo.
              </p>

              {/* Quick highlight pills without harsh borders */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-slate-700 text-sm font-semibold">
                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl">
                  <DollarSign className="w-4 h-4 text-[#00aa4e]" />
                  <span>Comissão de até 15%</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#2e7ec6]" />
                  <span>Repasses via PIX</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl">
                  <TrendingUp className="w-4 h-4 text-[#1e4497]" />
                  <span>Cupom com 10% OFF</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-base shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Inscrever-se agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <a
                  href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20o%20Programa%20de%20Parceiros%20da%20TraduzTudo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-[#1e4497] font-semibold text-base shadow-xs hover:text-[#2e7ec6] transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-[#00aa4e]" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Custom 3D Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
                <Image
                  src="/themes/web/assets/img/lp/hero-parceiros.jpg"
                  alt="Programa de Parceiros TraduzTudo"
                  width={600}
                  height={450}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 2: CONHEÇA A TRADUZTUDO (CLEAN 3 COLUMNS, NO BOX BORDERS)
          ============================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">
              Conheça a <span className="text-[#2e7ec6]">TraduzTudo</span>
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              A TraduzTudo é uma empresa especializada em Tradução Juramentada, Certificada e Apostila de Haia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {/* Col 1 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center mb-5">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#002b49] mb-2">50+ Especialistas</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Tradutores juramentados e especialistas com escritório em São Paulo - SP e atendimento nacional.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center mb-5">
                <Languages className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#002b49] mb-2">15+ Idiomas</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Traduções juramentadas, técnicas e certificadas válidas internacionalmente em consulados e embaixadas.
              </p>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center mb-5">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#002b49] mb-2">Entrega Global</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Brasil e no exterior, com entregas digitais certificadas ICP-Brasil de validade imediata e frete expresso.
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link
              href="/empresa-de-traducao"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#2e7ec6] hover:bg-[#1e4497] text-white font-bold text-sm shadow-md transition-all"
            >
              Conheça nossa história
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 3: NOSSOS NÚMEROS MENSAIS (SOFT BLUE BG, NO BOX BORDERS)
          ============================================================== */}
      <section className="py-20 bg-[#EFF2FC]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">
              Nossos <span className="text-[#2e7ec6]">Números</span>
            </h2>
            <p className="text-slate-500 text-xl italic mt-1">Mensais</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black text-[#2e7ec6] mb-1">+2.000</div>
              <p className="text-base font-semibold text-slate-700">Clientes Atendidos</p>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-[#2e7ec6] mb-1">+10.000</div>
              <p className="text-base font-semibold text-slate-700">Documentos</p>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-[#2e7ec6] mb-1">+3.000</div>
              <p className="text-base font-semibold text-slate-700">Projetos</p>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-[#2e7ec6] mb-1">+6.000</div>
              <p className="text-base font-semibold text-slate-700">Apostilas de Haia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 4: SIMULADOR DE GANHOS & COMISSÕES (SEM VÍDEO CONCORRENTE)
          ============================================================== */}
      <section className="py-20 bg-gradient-to-r from-[#1e4497] via-[#2458a6] to-[#2e7ec6] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Simulador de Comissões
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
              Quanto você pode ganhar todo mês?
            </h2>
            <p className="text-white/85 mt-2 text-base">
              Arraste a barra para estimar sua comissão mensal com as indicações do seu canal ou perfil.
            </p>
          </div>

          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Interactive Slider */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Volume de Clientes Indicados por Mês:
                </label>
                <span className="text-2xl font-black text-[#1e4497] bg-blue-50 px-4 py-1 rounded-xl">
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
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2e7ec6]"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>3 clientes/mês</span>
                <span>25 clientes/mês</span>
                <span>50 clientes/mês</span>
                <span>100+ clientes/mês</span>
              </div>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-slate-50 text-center">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Faturamento Estimado</span>
                <strong className="text-xl sm:text-2xl font-black text-[#002b49] block">
                  {formatCurrency(calculatedSales)}
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">Ticket médio R$ 850 / cliente</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 text-center relative">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                  Direto no seu PIX
                </div>
                <span className="text-xs font-bold text-emerald-800 block mb-1">Sua Comissão Líquida (15%)</span>
                <strong className="text-2xl sm:text-3xl font-black text-[#00aa4e] block">
                  {formatCurrency(calculatedCommission)}
                </strong>
                <span className="text-[11px] text-emerald-700 mt-1 block">Repasse pontual todo dia 10</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 text-center">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Economia do seu Público</span>
                <strong className="text-xl sm:text-2xl font-black text-[#2e7ec6] block">
                  {formatCurrency(calculatedSavings)}
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">Com seu cupom 10% OFF</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#00aa4e] shrink-0" />
                <span>Sem teto de ganhos. Quanto mais você indica, mais você recebe no PIX.</span>
              </div>

              <a
                href="#contato"
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Garantir Meu Cupom de Parceiro
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 5: CONFIANÇA & PROVA SOCIAL (DARK NAVY BAND)
          ============================================================== */}
      <section className="py-20 bg-[#002b49] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Confiança</h2>
            <p className="text-white/80 mt-2 text-base">
              Somos a empresa de Tradução <strong>mais bem avaliada</strong> do Google e do Facebook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white text-slate-800 p-7 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e4497] font-black text-base flex items-center justify-center">
                    CP
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Carla Peixoto Muniz</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  &ldquo;Recomendo demais a TraduzTudo 💙! Melhor preço do mercado e rapidez incrível. Tiraram todas as
                  minhas dúvidas pelo WhatsApp e o acompanhamento do pedido foi super transparente. Indico para todo mundo!&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                <span>Publicado em 22/09/2023</span>
                <span className="text-amber-500 font-bold">Google 5.0 ★</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white text-slate-800 p-7 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e4497] font-black text-base flex items-center justify-center">
                    GF
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Gisele S. Ferreira</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  &ldquo;A TraduzTudo é uma empresa de total confiança. Entregam as traduções com agilidade e total
                  segurança jurídica. Suporte muito atencioso desde o envio até a entrega final com assinatura digital.&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                <span>Publicado em 02/08/2023</span>
                <span className="text-amber-500 font-bold">Google 5.0 ★</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white text-slate-800 p-7 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e4497] font-black text-base flex items-center justify-center">
                    MA
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-base">Marta Carvalho Aguiar</h3>
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  &ldquo;Excelente trabalho de tradução juramentada com a TraduzTudo! Valores justos e acessíveis, além
                  de um atendimento cordial e ágil pelo WhatsApp. Equipe muito prestativa do início ao fim!&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                <span>Publicado em 08/09/2023</span>
                <span className="text-amber-500 font-bold">Google 5.0 ★</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
            <Link
              href="/avaliacoes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all"
            >
              <span>Google Avaliações</span>
              <strong className="text-amber-400 font-bold">4.9/5 ★</strong>
            </Link>

            <a
              href="https://www.facebook.com/profile.php?id=61594891905671"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1877F2] hover:bg-[#1569d6] text-white font-semibold text-sm transition-all"
            >
              <span>Facebook Oficial</span>
              <strong className="text-amber-400 font-bold">4.9/5 ★</strong>
            </a>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: NOSSA PROPOSTA (NO BOX BORDERS, CLEAN ROWS)
          ============================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 4 Clean Steps without Box Borders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">Nossa proposta</h2>
                <p className="text-slate-600 mt-2 text-base">
                  Construímos parcerias transparentes e ágeis para seu canal ou assessoria.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Step 1 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 hover:translate-x-1 transition-transform group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg group-hover:text-[#2e7ec6] transition-colors">
                      Reunião
                    </h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      30 min para definir tema, conteúdo e estratégia conjunta.
                    </p>
                  </div>
                </a>

                {/* Step 2 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 hover:translate-x-1 transition-transform group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg group-hover:text-[#2e7ec6] transition-colors">
                      Colaboração
                    </h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Juntos desenvolvemos roteiro, criativos e edições de alta conversão.
                    </p>
                  </div>
                </a>

                {/* Step 3 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 hover:translate-x-1 transition-transform group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg group-hover:text-[#2e7ec6] transition-colors">
                      Veiculação
                    </h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Distribuição nos canais: vídeos, posts, links e cupons de desconto.
                    </p>
                  </div>
                </a>

                {/* Step 4 */}
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="flex items-start gap-4 hover:translate-x-1 transition-transform group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg group-hover:text-[#2e7ec6] transition-colors">
                      Impulsionamos
                    </h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Turbinamos a publicação com tráfego pago para um maior alcance e faturamento.
                    </p>
                  </div>
                </a>
              </div>

              <div className="pt-4">
                <a
                  href="#contato"
                  onClick={scrollToContact}
                  className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#2e7ec6] hover:bg-[#1e4497] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Tenho interesse
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Right Column: Workflow Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
                <Image
                  src="/themes/web/assets/img/lp/proposta-parceiros.jpg"
                  alt="Nossa proposta de parceria TraduzTudo"
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
          SECTION 7: CASOS DE SUCESSO (CRIADORES)
          ============================================================== */}
      <section className="py-20 bg-[#EFF2FC]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">Casos de Sucesso</h2>
            <p className="text-slate-600 mt-2 text-base">
              Veja os resultados que nossos parceiros estão alcançando com o programa de afiliação da TraduzTudo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CREATOR_CASES.map((item, idx) => {
              const NicheIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                >
                  {/* Profile & Quote */}
                  <div className="p-7">
                    <div className="flex items-center gap-3.5 mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.accentColor} flex items-center justify-center text-white shadow-md shrink-0`}
                      >
                        <NicheIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002b49] text-lg leading-snug">{item.name}</h3>
                        <span className="text-xs font-semibold text-[#2e7ec6] block">{item.handle}</span>
                        <span className="text-[11px] text-slate-500 block">{item.niche}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  </div>

                  {/* Results Section */}
                  <div className="p-6 bg-slate-50/80 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#002b49] text-sm">Resultado Total</h4>
                      <span className="text-xs font-bold text-[#1e4497] bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                        ROAS {item.roas}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-200/60 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Valor investido</span>
                        <strong className="text-[#002b49] font-bold">{item.invested}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Valor vendido</span>
                        <strong className="text-[#002b49] font-bold">{item.sales}</strong>
                      </div>
                    </div>

                    {/* Highlight Commission Box */}
                    <div className="p-3.5 rounded-xl border-2 border-dashed border-[#00aa4e] bg-green-50/70 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00aa4e]">Comissão</span>
                      <div className="flex items-center gap-1.5 text-[#00aa4e]">
                        <strong className="text-lg font-black">{item.commission}</strong>
                        <CheckCircle2 className="w-5 h-5 fill-[#00aa4e] text-white" />
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
          SECTION 8: COMO TE AJUDAMOS (NO BOX BORDERS, CLEAN ROWS)
          ============================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 5 Support Pillars without Box Borders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">Como te ajudamos</h2>
                <p className="text-slate-600 mt-2 text-base">
                  Cuidamos da parte operacional para você focar em criar e conectar sua audiência.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Pillar 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg">Design</h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Criação de artes criativas que irão se destacar no feed e nos stories.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg">Suporte</h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Ajuda e orientação para capturar e converter o tráfego dos seus seguidores.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg">Monetização</h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Estratégias otimizadas e testes de comunicação visando maximizar o ROAS.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2e7ec6] flex items-center justify-center shrink-0">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg">Parceria</h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Contrato claro e transparente seguindo termos e condições seguros.
                    </p>
                  </div>
                </div>

                {/* Pillar 5 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00aa4e] flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b49] text-lg">Pagamentos</h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      Pagamentos mensais corretos via PIX com total clareza e pontualidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Support Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
                <Image
                  src="/themes/web/assets/img/lp/suporte-parceiros.jpg"
                  alt="Como te ajudamos TraduzTudo"
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
      <section id="contato" className="py-20 bg-[#EFF2FC]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002b49]">Vamos começar?</h2>
            <p className="text-slate-600 text-base mt-2 mb-8">
              Preencha o formulário que nossa equipe entrará em contato!
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-green-50 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#00aa4e] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">Inscrição Enviada com Sucesso!</h3>
                <p className="text-sm text-green-700 max-w-md mx-auto">
                  Recebemos seus dados. Para acelerar seu alinhamento, você pode falar direto conosco no WhatsApp:
                </p>
                <a
                  href="https://wa.me/5511947485091?text=Ol%C3%A1%21%20Enviei%20minha%20pr%C3%A9-inscri%C3%A7%C3%A3o%20no%20Programa%20de%20Parceiros%20da%20TraduzTudo%20e%20gostaria%20de%20falar%20com%20o%20gerente."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left max-w-2xl mx-auto">
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nome e sobrenome"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                  />
                </div>

                {/* Email & WhatsApp Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Seu melhor e-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Social Handle & Niche Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Rede social <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Instagram, YouTube, TikTok, etc."
                      value={formData.socialHandle}
                      onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nicho de atuação
                    </label>
                    <select
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
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
                      Tamanho da audiência
                    </label>
                    <select
                      value={formData.audienceSize}
                      onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                    >
                      <option value="">Selecione a faixa</option>
                      <option value="Até 10k seguidores">Até 10.000 seguidores</option>
                      <option value="10k a 50k seguidores">10.000 a 50.000 seguidores</option>
                      <option value="50k a 200k seguidores">50.000 a 200.000 seguidores</option>
                      <option value="Mais de 200k seguidores">Mais de 200.000 seguidores</option>
                      <option value="Assessoria/Agência">Assessoria / Agência</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Site (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Seu site ou blog"
                      value={formData.site}
                      onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte-nos brevemente como podemos colaborar..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-[#2e7ec6] outline-hidden transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#00aa4e] hover:bg-[#009243] text-white font-bold text-base shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando dados...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Inscrever-se</span>
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
          SECTION 10: PERGUNTAS FREQUENTES (FAQ WITHOUT BOX BORDERS)
          ============================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b49]">Perguntas Frequentes</h2>
            <p className="text-slate-600 mt-2 text-base">
              Tudo o que você precisa saber sobre o Programa de Parceiros da TraduzTudo.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left font-bold text-[#002b49] flex items-center justify-between gap-4 text-base sm:text-lg focus:outline-hidden hover:text-[#2e7ec6] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2e7ec6] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
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
            Pronto para monetizar sua audiência com a TraduzTudo?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
            Nossa equipe de parcerias está pronta para gerar seu cupom exclusivo e iniciar a colaboração.
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
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base transition-all"
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
