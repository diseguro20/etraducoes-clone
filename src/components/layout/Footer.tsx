'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/orcamento-traducoes') {
    return null;
  }

  return (
    <footer className="w-full bg-white dark:bg-[#0b1329] border-t border-slate-200/90 dark:border-slate-800 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Column 1: Vamos Conversar */}
          <div className="md:col-span-5 lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#002b49] dark:text-white tracking-tight leading-tight">
              Vamos Conversar<span className="text-[#00aa4e]">.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mt-4 max-w-md font-normal">
              Conte conosco para soluções de tradução e interpretação personalizadas para o seu negócio.
            </p>
          </div>

          {/* Column 2: Entre em Contato */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-bold text-[#002b49] dark:text-sky-400 uppercase tracking-widest mb-4">
              ENTRE EM CONTATO
            </h3>

            <div className="flex flex-col space-y-3">
              {/* E-mail */}
              <a
                href="mailto:contato@traduztudo.com.br"
                className="inline-flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 hover:text-[#2e7ec6] transition-colors group"
              >
                <i className="far fa-envelope text-[#00aa4e] text-base w-5 text-center shrink-0"></i>
                <span className="group-hover:underline">contato@traduztudo.com.br</span>
              </a>

              {/* Atendente 1 */}
              <a
                href="https://wa.me/5511983522358?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 hover:text-[#00aa4e] transition-colors group"
              >
                <i className="fab fa-whatsapp text-[#00aa4e] text-lg w-5 text-center shrink-0"></i>
                <span className="font-medium group-hover:underline">(11) 98352-2358</span>
              </a>

              {/* Atendente 2 */}
              <a
                href="https://wa.me/5511947306122?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 hover:text-[#00aa4e] transition-colors group"
              >
                <i className="fab fa-whatsapp text-[#00aa4e] text-lg w-5 text-center shrink-0"></i>
                <span className="font-medium group-hover:underline">(11) 94730-6122</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href="https://www.facebook.com/traduztudo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded bg-[#002b49] hover:bg-[#2e7ec6] text-white flex items-center justify-center transition-all text-sm shadow-xs"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/traduztudo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded bg-[#002b49] hover:bg-[#2e7ec6] text-white flex items-center justify-center transition-all text-sm shadow-xs"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/5511983522358"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded bg-[#002b49] hover:bg-[#00aa4e] text-white flex items-center justify-center transition-all text-sm shadow-xs"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Column 3: Formas de Pagamento */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-xs font-bold text-[#002b49] dark:text-sky-400 uppercase tracking-widest mb-4">
              FORMAS DE PAGAMENTO
            </h3>

            {/* Grid com badges no estilo da referência */}
            <div className="grid grid-cols-2 gap-3 max-w-[290px]">
              {/* Boleto Bancário */}
              <div className="h-[62px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 flex flex-col items-center justify-center p-2 shadow-2xs hover:border-slate-400 transition-colors">
                <svg className="w-10 h-5" viewBox="0 0 44 20" fill="none">
                  <rect x="2" y="1" width="2" height="18" fill="#1e293b" />
                  <rect x="6" y="1" width="1" height="18" fill="#1e293b" />
                  <rect x="9" y="1" width="3" height="18" fill="#1e293b" />
                  <rect x="14" y="1" width="1" height="18" fill="#1e293b" />
                  <rect x="17" y="1" width="2.5" height="18" fill="#1e293b" />
                  <rect x="21.5" y="1" width="1" height="18" fill="#1e293b" />
                  <rect x="24.5" y="1" width="3.5" height="18" fill="#1e293b" />
                  <rect x="30" y="1" width="1" height="18" fill="#1e293b" />
                  <rect x="33" y="1" width="2" height="18" fill="#1e293b" />
                  <rect x="37" y="1" width="1" height="18" fill="#1e293b" />
                  <rect x="40" y="1" width="2" height="18" fill="#1e293b" />
                </svg>
                <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mt-1 leading-none">
                  Boleto Bancário
                </span>
              </div>

              {/* Pix */}
              <div className="h-[62px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 flex items-center justify-center gap-2 px-3 shadow-2xs hover:border-slate-400 transition-colors">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 512 512" fill="none">
                  <path
                    d="M126.6 138.8l63.6-63.6c7.8-7.8 20.5-7.8 28.3 0l68 68c19.5 19.5 51.2 19.5 70.7 0l68-68c7.8-7.8 20.5-7.8 28.3 0l63.6 63.6c7.8 7.8 7.8 20.5 0 28.3l-68 68c-19.5 19.5-19.5 51.2 0 70.7l68 68c7.8 7.8 7.8 20.5 0 28.3l-63.6 63.6c-7.8 7.8-20.5 7.8-28.3 0l-68-68c-19.5-19.5-51.2-19.5-70.7 0l-68 68c-7.8 7.8-20.5 7.8-28.3 0l-63.6-63.6c-7.8-7.8-7.8-20.5 0-28.3l68-68c19.5-19.5 19.5-51.2 0-70.7l-68-68c-7.8-7.8-7.8-20.5 0-28.3z"
                    fill="#32BCAD"
                  />
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-black tracking-tight text-[#32BCAD]">pix</span>
                  <span className="text-[7.5px] text-slate-400 font-medium">instantâneo</span>
                </div>
              </div>

              {/* MasterCard */}
              <div className="h-[62px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 flex flex-col items-center justify-center p-2 shadow-2xs hover:border-slate-400 transition-colors">
                <div className="flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#EB001B] inline-block -mr-2 z-10 opacity-95"></span>
                  <span className="w-5 h-5 rounded-full bg-[#F79E1B] inline-block opacity-95"></span>
                </div>
                <span className="text-[9.5px] font-bold text-slate-800 dark:text-slate-200 tracking-tight mt-1 leading-none">
                  mastercard
                </span>
              </div>

              {/* PayPal */}
              <div className="h-[62px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 flex items-center justify-center px-3 shadow-2xs hover:border-slate-400 transition-colors">
                <span className="font-black italic text-lg tracking-tight">
                  <span className="text-[#003087]">Pay</span>
                  <span className="text-[#0079C1]">Pal</span>
                </span>
              </div>

              {/* VISA */}
              <div className="h-[62px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 flex items-center justify-center px-3 shadow-2xs hover:border-slate-400 transition-colors">
                <span className="font-black italic text-2xl tracking-wider text-[#1A1F71] dark:text-[#38bdf8]">
                  VISA
                </span>
              </div>

              {/* Mercado Pago */}
              <div className="h-[62px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 flex items-center justify-center gap-1.5 px-2.5 shadow-2xs hover:border-slate-400 transition-colors">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="17" fill="#009EE3" />
                  <path
                    d="M10 19c1-1 3-1 4 0l3 3 8-7c1-1 3-1 4 0"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 22l3-3"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[8.5px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                    mercado
                  </span>
                  <span className="text-[8.5px] font-extrabold text-[#009EE3] uppercase tracking-tight">
                    pago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="border-t border-slate-200/90 dark:border-slate-800/80 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p className="text-center sm:text-left">
              Copyright © 2026 TraduzTudo, Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/termos-de-uso"
                className="hover:text-[#2e7ec6] transition-colors"
              >
                Termos de Uso
              </Link>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <Link
                href="/politicas-de-privacidade"
                className="hover:text-[#2e7ec6] transition-colors"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
