'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = (savedTheme === 'dark' || (!savedTheme && prefersDark)) ? 'dark' : 'light';
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('theme-dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('theme-dark');
    }
  }, []);

  // Theme toggle handler
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDark = e.target.checked;
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('theme-dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('theme-dark');
    }
  };

  // Close menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsAccordionOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  // Click outside to close mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle mobile drawer
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  // Open language modal from mobile drawer
  const triggerLanguageModal = () => {
    const trigger = document.querySelector('.header-lang-button') as HTMLButtonElement | null;
    if (trigger) {
      trigger.click();
    }
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Hide on standalone quote page if needed
  if (pathname === '/orcamento-traducoes') {
    return null;
  }

  return (
    <header className="modern-site-header">
      <div className="modern-header-inner">
        {/* Brand Logo */}
        <div className="modern-header-brand">
          <Link href="/" aria-label="TraduzTudo - Página Inicial">
            <img
              src="/img/traduztudo-logo.svg"
              alt="TraduzTudo"
              className="traduztudo-logo-light"
              width="210"
              height="42"
            />
            <img
              src="/img/traduztudo-logo-white.svg"
              alt="TraduzTudo"
              className="traduztudo-logo-dark"
              width="210"
              height="42"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="modern-header-nav" aria-label="Navegação Principal" ref={dropdownRef}>
          <div className={`modern-nav-dropdown-wrapper ${isDropdownOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="modern-nav-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>Serviços e Idiomas</span>
              <i className="fas fa-chevron-down modern-nav-chevron"></i>
            </button>

            {/* Mega Menu Dropdown */}
            <div className={`modern-mega-menu ${isDropdownOpen ? 'visible' : ''}`} role="region">
              <div className="modern-mega-grid">
                {/* Col 1: Serviços */}
                <div className="modern-mega-col">
                  <span className="modern-mega-title">
                    <i className="fas fa-file-signature"></i> Serviços
                  </span>
                  <ul className="modern-mega-list">
                    <li>
                      <Link href="/traducao-juramentada" title="Tradução Juramentada">
                        Tradução Juramentada
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-certificada" title="Tradução Certificada">
                        Tradução Certificada
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-tecnica" title="Tradução Técnica">
                        Tradução Técnica
                      </Link>
                    </li>
                    <li>
                      <Link href="/apostilamento-de-haia" title="Apostilamento de Haia">
                        Apostilamento de Haia
                      </Link>
                    </li>
                    <li>
                      <Link href="/plataforma-de-traducao" title="Plataforma de Tradução">
                        Plataforma de Tradução
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Col 2: Principais Idiomas */}
                <div className="modern-mega-col">
                  <span className="modern-mega-title">
                    <i className="fas fa-globe-americas"></i> Principais Idiomas
                  </span>
                  <ul className="modern-mega-lang-grid">
                    <li>
                      <Link href="/traducao-de-portugues" title="Tradução Português">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg"
                          width="20"
                          height="20"
                          alt="Brasil"
                        />
                        <span>Português</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-de-ingles" title="Tradução Inglês">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-united-states-of-america.svg"
                          width="20"
                          height="20"
                          alt="EUA"
                        />
                        <span>Inglês</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-de-espanhol" title="Tradução Espanhol">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-spain.svg"
                          width="20"
                          height="20"
                          alt="Espanha"
                        />
                        <span>Espanhol</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-de-italiano" title="Tradução Italiano">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-italy.svg"
                          width="20"
                          height="20"
                          alt="Itália"
                        />
                        <span>Italiano</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-frances" title="Tradução Francês">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-france.svg"
                          width="20"
                          height="20"
                          alt="França"
                        />
                        <span>Francês</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-de-alemao" title="Tradução Alemão">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-germany.svg"
                          width="20"
                          height="20"
                          alt="Alemanha"
                        />
                        <span>Alemão</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-mandarim" title="Tradução Chinês Mandarim">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-china.svg"
                          width="20"
                          height="20"
                          alt="China"
                        />
                        <span>Mandarim</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-russo" title="Tradução Russo">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-russia.svg"
                          width="20"
                          height="20"
                          alt="Rússia"
                        />
                        <span>Russo</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/traducao-de-holandes" title="Tradução Holandês">
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-holanda.svg"
                          width="20"
                          height="20"
                          alt="Holanda"
                        />
                        <span>Holandês</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/idiomas" title="Ver todos os idiomas" style={{ fontWeight: 700 }}>
                        <img
                          src="https://www.etraducoes.com.br/themes/web/assets/img/icon-mundo.svg"
                          width="20"
                          height="20"
                          alt="Todos"
                        />
                        <span>Ver todos</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Col 3: Áreas de Atuação */}
                <div className="modern-mega-col">
                  <span className="modern-mega-title">
                    <i className="fas fa-layer-group"></i> Áreas de Atuação
                  </span>
                  <ul className="modern-mega-tags">
                    <li><Link href="/traducao-academica">Acadêmico</Link></li>
                    <li><Link href="/traducao-juramentada-para-casamento">Casamento</Link></li>
                    <li><Link href="/traducao-juramentada-de-certidoes">Certidões</Link></li>
                    <li><Link href="/traducao-juramentada-para-cidadania-italiana">Cidadania Italiana</Link></li>
                    <li><Link href="/traducao-de-documentos">Docs Pessoais</Link></li>
                    <li><Link href="/traducao-tecnica">Docs Técnicos</Link></li>
                    <li><Link href="/traducao-tecnica">Empresarial</Link></li>
                    <li><Link href="/traducao-tecnica">Financeiro</Link></li>
                    <li><Link href="/traducao-para-intercambio">Intercâmbio</Link></li>
                    <li><Link href="/traducao-tecnica">Jurídico</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right: Actions Hub */}
        <div className="modern-header-actions">
          {/* Theme Switcher */}
          <div className="theme-switch-wrapper modern-theme-switch-wrap">
            <label className="theme-switch" htmlFor="checkbox" title="Alternar tema claro e escuro">
              <input
                type="checkbox"
                id="checkbox"
                checked={theme === 'dark'}
                onChange={handleThemeChange}
                aria-label="Alternar tema claro e escuro"
              />
              <div className="slider round"></div>
            </label>
          </div>

          {/* Language Switcher Portal Target */}
          <div className="lang-switch-wrapper modern-lang-wrap" id="header-lang-wrapper"></div>

          {/* Subtle Vertical Divider */}
          <div className="modern-header-divider"></div>

          {/* Login Link */}
          <Link href="/me/login" title="Acessar conta" className="modern-header-login">
            <i className="far fa-sign-in"></i>
            <span>Entrar</span>
          </Link>

          {/* Main Action CTA Button */}
          <Link href="/orcamento-traducoes" title="Solicite um orçamento agora" className="modern-header-cta">
            <span>Orçamento Instantâneo</span>
            <i className="fas fa-arrow-right"></i>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`modern-hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menu principal"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Full Screen Mobile Drawer */}
      <div className={`modern-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        {/* Language trigger button inside mobile drawer */}
        <button
          type="button"
          className="modern-mobile-lang-btn"
          onClick={triggerLanguageModal}
        >
          <span>🌐 Alterar Idioma / Change Language</span>
          <i className="fas fa-chevron-right" style={{ marginLeft: 'auto', opacity: 0.6 }}></i>
        </button>

        {/* Services & Languages Accordion */}
        <div className="modern-mobile-accordion">
          <button
            type="button"
            className="modern-mobile-acc-header"
            onClick={() => setIsAccordionOpen((prev) => !prev)}
          >
            <span>Serviços e Idiomas</span>
            <i
              className={`fas fa-chevron-down ${isAccordionOpen ? 'rotate' : ''}`}
              style={{
                transition: 'transform 0.2s',
                transform: isAccordionOpen ? 'rotate(180deg)' : 'none',
              }}
            ></i>
          </button>

          {isAccordionOpen && (
            <div className="modern-mobile-acc-body">
              <strong style={{ fontSize: '12px', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Serviços
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
                <Link href="/traducao-juramentada">Tradução Juramentada</Link>
                <Link href="/traducao-certificada">Tradução Certificada</Link>
                <Link href="/traducao-tecnica">Tradução Técnica</Link>
                <Link href="/apostilamento-de-haia">Apostilamento de Haia</Link>
                <Link href="/plataforma-de-traducao">Plataforma de Tradução</Link>
              </div>

              <strong style={{ fontSize: '12px', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '12px' }}>
                Idiomas Principais
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingLeft: '8px' }}>
                <Link href="/traducao-de-portugues">🇧🇷 Português</Link>
                <Link href="/traducao-de-ingles">🇺🇸 Inglês</Link>
                <Link href="/traducao-de-espanhol">🇪🇸 Espanhol</Link>
                <Link href="/traducao-de-italiano">🇮🇹 Italiano</Link>
                <Link href="/traducao-frances">🇫🇷 Francês</Link>
                <Link href="/traducao-de-alemao">🇩🇪 Alemão</Link>
                <Link href="/traducao-mandarim">🇨🇳 Mandarim</Link>
                <Link href="/idiomas" style={{ fontWeight: 'bold' }}>🌐 Ver todos</Link>
              </div>
            </div>
          )}
        </div>

        {/* Other Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <Link
            href="/me/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '15px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.03)',
            }}
          >
            <i className="far fa-sign-in"></i>
            <span>Acessar Conta / Entrar</span>
          </Link>
          <Link
            href="/avaliacoes"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '15px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.03)',
            }}
          >
            <i className="far fa-star"></i>
            <span>Avaliações de Clientes</span>
          </Link>
          <Link
            href="/contato"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '15px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.03)',
            }}
          >
            <i className="far fa-envelope"></i>
            <span>Fale Conosco</span>
          </Link>
        </div>

        {/* Mobile CTA */}
        <Link href="/orcamento-traducoes" className="modern-mobile-drawer-cta">
          <span>Solicitar Orçamento Instantâneo</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </header>
  );
}
