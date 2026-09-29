'use client';

import { useEffect } from 'react';

const headerHtml = "            <header class=\"container-s\"><div class=\"top\"><div class=\"topbar\"><span class=\"menu-btn\"></span><nav class=\"menu\"><div class=\"ds-flex align-center logo-header\"><a href=\"/\" aria-label=\"Logo TraduzTudo\" style=\"display:inline-flex;align-items:center;\"><img src=\"/img/traduztudo-logo.svg\" alt=\"TraduzTudo\" class=\"traduztudo-logo-light\" width=\"240\" height=\"48\" style=\"height:44px;width:auto;\" /><img src=\"/img/traduztudo-logo-white.svg\" alt=\"TraduzTudo\" class=\"traduztudo-logo-dark\" width=\"240\" height=\"48\" style=\"height:44px;width:auto;\" /></a></div> <div class=\"theme-switch-wrapper\"> <label class=\"theme-switch\" for=\"checkbox\"> <input type=\"checkbox\" id=\"checkbox\" />\n    <div class=\"slider round\"></div>\n  </label></div>\n<div class=\"mobile-menu\">\n  <div class=\"sub-menu\">\n    <div class=\"arrow-b\">\n      <p >Serviços e Idiomas</p>\n    </div>\n    <div class=\"sub-dropdown sub-all sub-language-service\">\n      <div class=\"row\">\n        <div class=\"col-xl-3 service sub-border\"><span class=\"title-submenu\">Serviços</span>\n          <ul>\n            <li><a href=\"/traducao-juramentada\" title=\"Tradução Juramentada\">Tradução Juramentada</a>\n            </li>\n            <li><a href=\"/traducao-certificada\" title=\"Tradução Certificada\">Tradução Certificada</a>\n            </li>\n            <li><a href=\"/traducao-tecnica\" title=\"Tradução Técnica\">Tradução Técnica</a> </li>\n            <li><a href=\"/apostilamento-de-haia\"\n                title=\"Entenda tudo sobre Apostilamento de Haia\">Apostilamento de Haia</a></li>\n            <li><a href=\"/plataforma-de-traducao\" title=\"AIUTA - Plataforma de Tradução\">Plataforma de\n                Tradução</a></li>\n          </ul>\n        </div>\n        <div class=\"col-xl-5 sub-border\"><span class=\"title-submenu\">Idiomas</span>\n          <ul class=\"list-language\">\n            <li><a title=\"Tradução Português\" href=\"/traducao-de-portugues\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg\" width=\"24\" height=\"24\" alt=\"Bandeira do Brasil\">\n                Português </a></li>\n            <li><a title=\"Tradução Italiano\" href=\"/traducao-de-italiano\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-italy.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da Itália\">\n                Italiano </a></li>\n            <li><a title=\"Tradução Inglês\" href=\"/traducao-de-ingles\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-united-states-of-america.svg\" width=\"24\" height=\"24\"\n                  alt=\"Bandeira dos Estados Unidos\"> Inglês </a></li>\n            <li><a title=\"Tradução Espanhol\" href=\"/traducao-de-espanhol\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-spain.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da Espanha\">\n                Espanhol </a></li>\n            <li><a title=\"Tradução Francês\" href=\"/traducao-frances\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-france.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da França\">\n                Francês </a></li>\n            <li><a title=\"Tradução Russo\" href=\"/traducao-russo\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-russia.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da Russia\">\n                Russo </a></li>\n            <li><a title=\"Tradução Chinês\" href=\"/traducao-mandarim\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-china.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da China\">\n                Mandarim </a></li>\n            <li><a title=\"Tradução Alemão\" href=\"/traducao-de-alemao\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-germany.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da Alemanha\">\n                Alemão </a></li>\n            <li><a title=\"Tradução Holandês\" href=\"/traducao-de-holandes\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-holanda.svg\" width=\"24\" height=\"24\" alt=\"Bandeira da Holanda\">\n                Holandês </a></li>\n            <li><a title=\"Todos os idiomas\" href=\"/idiomas\"> <img\n                  src=\"https://www.etraducoes.com.br/themes/web/assets/img/icon-mundo.svg\" width=\"24\" height=\"24\" alt=\"Bandeira do Mundo\">\n                Ver todos </a></li>\n          </ul>\n        </div>\n        <div class=\"col-xl-4\"><span class=\"title-submenu\">Áreas de atuação</span>\n          <ul class=\"list-language list-custom\" style=\"width: 100%\">\n            <li><a title=\"Acadêmico\" href=\"/traducao-academica\"> Acadêmico </a></li>\n            <li><a title=\"Casamento\" href=\"/traducao-juramentada-para-casamento\"> Casamento </a></li>\n            <li><a title=\"Certidões\" href=\"/traducao-juramentada-de-certidoes\"> Certidões </a></li>\n            <li><a title=\"Cidadania Italiana\" href=\"/traducao-juramentada-para-cidadania-italiana\">\n                Cidadania Italiana </a></li>\n            <li><a title=\"Documentos Pessoais\" href=\"/traducao-de-documentos\"> Docs Pessoais </a></li>\n            <li><a title=\"Documentos Técnicos\" href=\"/traducao-tecnica\"> Docs Técnicos </a> </li>\n            <li><a title=\"Empresarial\" href=\"/traducao-tecnica\"> Empresarial </a></li>\n            <li><a title=\"Financeiro\" href=\"/traducao-tecnica\"> Financeiro </a></li>\n            <li><a title=\"Intercâmbio\" href=\"/traducao-para-intercambio\"> Intercâmbio </a></li>\n            <li><a title=\"Jurídico\" href=\"/traducao-tecnica\"> Jurídico </a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div> <a href=\"/me/login\" title=\"Acessar conta\" class=\"menu-link\"> <i class=\"far fa-sign-in\"></i> Entrar </a>\n  <div class=\"sub-menu b-act\"><a class=\"btn btn-blue\" href=\"/orcamento-traducoes\"\n      title=\"Solicite um orçamento agora\">Orçamento Instantâneo</a></div>\n</div> </nav></div></div></header>";

export default function Header() {
  useEffect(() => {
    const menuBtn = document.querySelector('.menu-btn');
    const topbar = document.querySelector('.topbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const arrowB = document.querySelector('.arrow-b');
    const subDropdown = document.querySelector('.sub-language-service');
    const themeCheckbox = document.getElementById('checkbox') as HTMLInputElement | null;

    // Check theme initially
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('theme-dark');
      if (themeCheckbox) themeCheckbox.checked = true;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('theme-dark');
      if (themeCheckbox) themeCheckbox.checked = false;
    }

    const handleMenuClick = () => {
      topbar?.classList.toggle('open');
      mobileMenu?.classList.toggle('open');
    };

    const handleArrowClick = (e: Event) => {
      e.stopPropagation();
      subDropdown?.classList.toggle('active');
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

    return () => {
      menuBtn?.removeEventListener('click', handleMenuClick);
      arrowB?.removeEventListener('click', handleArrowClick);
      themeCheckbox?.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: headerHtml }} />;
}
