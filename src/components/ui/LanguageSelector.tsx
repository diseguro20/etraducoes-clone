'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flagSvg: string;
  flagEmoji: string;
}

export const LANGUAGES: Language[] = [
  {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português (Brasil)',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-brazil.svg',
    flagEmoji: '🇧🇷',
  },
  {
    code: 'en',
    name: 'Inglês',
    nativeName: 'English (Global)',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-united-states-of-america.svg',
    flagEmoji: '🇺🇸',
  },
  {
    code: 'es',
    name: 'Espanhol',
    nativeName: 'Español',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-spain.svg',
    flagEmoji: '🇪🇸',
  },
  {
    code: 'fr',
    name: 'Francês',
    nativeName: 'Français',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-france.svg',
    flagEmoji: '🇫🇷',
  },
  {
    code: 'de',
    name: 'Alemão',
    nativeName: 'Deutsch',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-germany.svg',
    flagEmoji: '🇩🇪',
  },
  {
    code: 'it',
    name: 'Italiano',
    nativeName: 'Italiano',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-italy.svg',
    flagEmoji: '🇮🇹',
  },
  {
    code: 'zh-CN',
    name: 'Chinês Mandarim',
    nativeName: '简体中文',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-china.svg',
    flagEmoji: '🇨🇳',
  },
  {
    code: 'ja',
    name: 'Japonês',
    nativeName: '日本語',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-japao.svg',
    flagEmoji: '🇯🇵',
  },
  {
    code: 'ru',
    name: 'Russo',
    nativeName: 'Русский',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-russia.svg',
    flagEmoji: '🇷🇺',
  },
  {
    code: 'ar',
    name: 'Árabe',
    nativeName: 'العربية',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-arabia.svg',
    flagEmoji: '🇸🇦',
  },
  {
    code: 'ko',
    name: 'Coreano',
    nativeName: '한국어',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-coreia-do-sul.svg',
    flagEmoji: '🇰🇷',
  },
  {
    code: 'nl',
    name: 'Holandês',
    nativeName: 'Nederlands',
    flagSvg: 'https://www.etraducoes.com.br/themes/web/assets/img/icon-holanda.svg',
    flagEmoji: '🇳🇱',
  },
];

function getInitialLang(): string {
  if (typeof document === 'undefined') return 'pt';
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  if (match && match[1]) {
    return match[1];
  }
  const saved = localStorage.getItem('traduztudo_lang');
  if (saved) return saved;
  return 'pt';
}

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<string>('pt');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [headerMounted, setHeaderMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize and load Google Translate script
  useEffect(() => {
    const initial = getInitialLang();
    setCurrentLang(initial);

    // Setup global Google Translate callback
    window.googleTranslateElementInit = function () {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'pt',
            includedLanguages: 'pt,en,es,fr,de,it,zh-CN,ja,ru,ar,ko,nl',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Check if script already exists
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Check if header slot is available for portaling
    const interval = setInterval(() => {
      if (document.getElementById('header-lang-wrapper')) {
        setHeaderMounted(true);
        clearInterval(interval);
      }
    }, 100);

    // Prevent Google Translate from shifting body or showing top frame
    const observer = new MutationObserver(() => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      const banners = document.querySelectorAll('.goog-te-banner-frame, iframe.skiptranslate, .skiptranslate iframe');
      banners.forEach((b) => {
        const el = b as HTMLElement;
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.height = '0px';
      });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Close modal on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('.lang-btn-trigger')) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    if (langCode === 'pt') {
      // Clear cookie for original Portuguese
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      const domainParts = window.location.hostname.split('.');
      if (domainParts.length > 1) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domainParts.slice(-2).join('.')};`;
      }
      localStorage.removeItem('traduztudo_lang');

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = 'pt';
        select.dispatchEvent(new Event('change'));
      }
      window.location.reload();
      return;
    }

    // Set translation cookie: /pt/{target}
    const cookieVal = `/pt/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;
    const domainParts = window.location.hostname.split('.');
    if (domainParts.length > 1) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domainParts.slice(-2).join('.')};`;
    }
    localStorage.setItem('traduztudo_lang', langCode);

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Header button component
  const HeaderButton = (
    <button
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      className="lang-btn-trigger header-lang-button"
      aria-label="Escolher idioma do site / Choose language"
      title="Alterar Idioma / Change Language"
    >
      <img
        src={activeLangObj.flagSvg}
        alt=""
        width="20"
        height="20"
        className="lang-flag-img"
        style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      />
      <span className="lang-code">{activeLangObj.code.toUpperCase()}</span>
      <i className="fas fa-chevron-down lang-chevron"></i>
    </button>
  );

  return (
    <>
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Header Language Button mounted via Portal */}
      {headerMounted &&
        typeof document !== 'undefined' &&
        document.getElementById('header-lang-wrapper') &&
        createPortal(HeaderButton, document.getElementById('header-lang-wrapper')!)}

      {/* Language Picker Modal / Dropdown */}
      {isOpen && (
        <div className="lang-modal-overlay">
          <div className="lang-modal-box" ref={modalRef} role="dialog" aria-modal="true">
            <div className="lang-modal-header">
              <div className="lang-modal-title">
                <i className="fas fa-globe lang-modal-icon"></i>
                <div>
                  <h3>Selecione seu idioma</h3>
                  <p>Choose your language / Seleccione su idioma</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="lang-modal-close"
                aria-label="Fechar"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="lang-modal-grid">
              {LANGUAGES.map((lang) => {
                const isActive = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`lang-option-btn ${isActive ? 'active' : ''}`}
                  >
                    <img
                      src={lang.flagSvg}
                      alt=""
                      width="30"
                      height="30"
                      className="option-flag-img"
                      style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0, display: 'block' }}
                    />
                    <div className="option-info">
                      <span className="option-native">{lang.nativeName}</span>
                      <span className="option-name">{lang.name}</span>
                    </div>
                    {isActive && <i className="fas fa-check option-check"></i>}
                  </button>
                );
              })}
            </div>

            <div className="lang-modal-footer">
              <span>
                <i className="fas fa-shield-alt"></i> Tradução instantânea e segura para clientes em todo o mundo.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Global TypeScript declaration
declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: any, elementId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}
