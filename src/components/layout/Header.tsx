'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const headerHtml = `            <header class="container-s"><div class="top"><div class="topbar"><span class="menu-btn" aria-label="Abrir Menu"></span><nav class="menu"><div class="ds-flex align-center logo-header"><a href="/" aria-label="Logo TraduzTudo" style="display:inline-flex;align-items:center;"><img src="/img/traduztudo-logo.svg" alt="TraduzTudo" class="traduztudo-logo-light" width="240" height="48" /><img src="/img/traduztudo-logo-white.svg" alt="TraduzTudo" class="traduztudo-logo-dark" width="240" height="48" /></a></div> <div class="theme-switch-wrapper"> <label class="theme-switch" for="checkbox"> <input type="checkbox" id="checkbox" aria-label="Alternar tema claro e escuro" />
    <div class="slider round"></div>
  </label></div>
<div class="lang-switch-wrapper" id="header-lang-wrapper"></div>
<div class="mobile-menu">
  <div class="mobile-menu-lang-trigger-wrapper">
    <button type="button" class="lang-btn-trigger mobile-menu-lang-btn" onclick="document.querySelector('.floating-lang-toggle')?.click();">
      <span class="mobile-lang-icon">🌐</span>
      <span>Alterar Idioma / Change Language</span>
      <i class="fas fa-chevron-right" style="margin-left:auto;font-size:12px;opacity:0.6;"></i>
    </button>
  </div>
  <div class="sub-menu">
    <div class="arrow-b">
      <p>Serviços e Idiomas</p>
    </div>
    <div class="sub-dropdown sub-all sub-language-service">
      <div class="row">
        <div class="col-xl-3 service sub-border"><span class="title-submenu">Serviços</span>
          <ul>
            <li><a href="/traducao-juramentada" title="Tradução Juramentada">Tradução Juramentada</a>
            </li>
            <li><a href="/traducao-certificada" title="Tradução Certificada">Tradução Certificada</a>
            </li>
            <li><a href="/traducao-tecnica" title="Tradução Técnica">Tradução Técnica</a> </li>
            <li><a href="/apostilamento-de-haia"
                title="Entenda tudo sobre Apostilamento de Haia">Apostilamento de Haia</a></li>
            <li><a href="/plataforma-de-traducao" title="AIUTA - Plataforma de Tradução">Plataforma de
                Tradução</a></li>
          </ul>
        </div>
        <div class="col-xl-5 sub-border"><span class="title-submenu">Idiomas</span>
          <ul class="list-language">
            <li><a title="Tradução Português" href="/traducao-de-portugues"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg" width="24" height="24" alt="Bandeira do Brasil">
                Português </a></li>
            <li><a title="Tradução Italiano" href="/traducao-de-italiano"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-italy.svg" width="24" height="24" alt="Bandeira da Itália">
                Italiano </a></li>
            <li><a title="Tradução Inglês" href="/traducao-de-ingles"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-united-states-of-america.svg" width="24" height="24"
                  alt="Bandeira dos Estados Unidos"> Inglês </a></li>
            <li><a title="Tradução Espanhol" href="/traducao-de-espanhol"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-spain.svg" width="24" height="24" alt="Bandeira da Espanha">
                Espanhol </a></li>
            <li><a title="Tradução Francês" href="/traducao-frances"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-france.svg" width="24" height="24" alt="Bandeira da França">
                Francês </a></li>
            <li><a title="Tradução Russo" href="/traducao-russo"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-russia.svg" width="24" height="24" alt="Bandeira da Russia">
                Russo </a></li>
            <li><a title="Tradução Chinês" href="/traducao-mandarim"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-china.svg" width="24" height="24" alt="Bandeira da China">
                Mandarim </a></li>
            <li><a title="Tradução Alemão" href="/traducao-de-alemao"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-germany.svg" width="24" height="24" alt="Bandeira da Alemanha">
                Alemão </a></li>
            <li><a title="Tradução Holandês" href="/traducao-de-holandes"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-holanda.svg" width="24" height="24" alt="Bandeira da Holanda">
                Holandês </a></li>
            <li><a title="Todos os idiomas" href="/idiomas"> <img
                  src="https://www.etraducoes.com.br/themes/web/assets/img/icon-mundo.svg" width="24" height="24" alt="Bandeira do Mundo">
                Ver todos </a></li>
          </ul>
        </div>
        <div class="col-xl-4"><span class="title-submenu">Áreas de atuação</span>
          <ul class="list-language list-custom" style="width: 100%">
            <li><a title="Acadêmico" href="/traducao-academica"> Acadêmico </a></li>
            <li><a title="Casamento" href="/traducao-juramentada-para-casamento"> Casamento </a></li>
            <li><a title="Certidões" href="/traducao-juramentada-de-certidoes"> Certidões </a></li>
            <li><a title="Cidadania Italiana" href="/traducao-juramentada-para-cidadania-italiana">
                Cidadania Italiana </a></li>
            <li><a title="Documentos Pessoais" href="/traducao-de-documentos"> Docs Pessoais </a></li>
            <li><a title="Documentos Técnicos" href="/traducao-tecnica"> Docs Técnicos </a> </li>
            <li><a title="Empresarial" href="/traducao-tecnica"> Empresarial </a></li>
            <li><a title="Financeiro" href="/traducao-tecnica"> Financeiro </a></li>
            <li><a title="Intercâmbio" href="/traducao-para-intercambio"> Intercâmbio </a></li>
            <li><a title="Jurídico" href="/traducao-tecnica"> Jurídico </a></li>
          </ul>
        </div>
      </div>
    </div>
  </div> <a href="/me/login" title="Acessar conta" class="menu-link"> <i class="far fa-sign-in"></i> Entrar </a>
  <div class="sub-menu b-act"><a class="btn btn-blue" href="/orcamento-traducoes"
      title="Solicite um orçamento agora">Orçamento Instantâneo</a></div>
</div> </nav></div></div></header>`;

export default function Header() {
  const pathname = usePathname();

  useEffect(() => {
    // Whenever pathname changes, ensure mobile menu is closed
    const menuBtn = document.querySelector('.menu-btn');
    const topbar = document.querySelector('.topbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    menuBtn?.classList.remove('active');
    topbar?.classList.remove('open');
    mobileMenu?.classList.remove('active', 'open');
    document.body.style.overflow = '';
  }, [pathname]);

  useEffect(() => {
    const menuBtn = document.querySelector('.menu-btn');
    const topbar = document.querySelector('.topbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const arrowB = document.querySelector('.arrow-b');
    const subDropdown = document.querySelector('.sub-language-service');
    const themeCheckbox = document.getElementById('checkbox') as HTMLInputElement | null;

    // Check theme initially
    const currentTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('theme-dark');
      if (themeCheckbox) themeCheckbox.checked = true;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('theme-dark');
      if (themeCheckbox) themeCheckbox.checked = false;
    }

    const closeMobileMenu = () => {
      menuBtn?.classList.remove('active', 'open');
      topbar?.classList.remove('open', 'active');
      mobileMenu?.classList.remove('active', 'open');
      document.body.style.overflow = '';
    };

    const handleMenuClick = (e: Event) => {
      e.stopPropagation();
      const isActive = menuBtn?.classList.toggle('active');
      menuBtn?.classList.toggle('open');
      topbar?.classList.toggle('open');
      topbar?.classList.toggle('active');
      mobileMenu?.classList.toggle('active');
      mobileMenu?.classList.toggle('open');
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    const handleArrowClick = (e: Event) => {
      e.stopPropagation();
      subDropdown?.classList.toggle('active');
      arrowB?.classList.toggle('open');
    };

    const handleThemeChange = (e: any) => {
      if (e.target?.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('theme-dark');
        localStorage.setItem('theme', 'light');
      }
    };

    menuBtn?.addEventListener('click', handleMenuClick);
    arrowB?.addEventListener('click', handleArrowClick);
    themeCheckbox?.addEventListener('change', handleThemeChange);

    // Close menu when links are clicked
    const links = mobileMenu?.querySelectorAll('a');
    links?.forEach((link) => link.addEventListener('click', closeMobileMenu));

    return () => {
      menuBtn?.removeEventListener('click', handleMenuClick);
      arrowB?.removeEventListener('click', handleArrowClick);
      themeCheckbox?.removeEventListener('change', handleThemeChange);
      links?.forEach((link) => link.removeEventListener('click', closeMobileMenu));
    };
  }, []);

  if (pathname === '/orcamento-traducoes') {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: headerHtml }} />;
}
