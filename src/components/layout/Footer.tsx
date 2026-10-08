'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/orcamento-traducoes') {
    return null;
  }

  return (
    <footer
      id="tt-main-footer"
      className="tt-footer-isolated w-full"
      style={{
        backgroundColor: '#ffffff',
        color: '#002b49',
        borderTop: '1px solid #e2e8f0',
        fontFamily: "'Catamaran', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '70px 24px 0 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Main 3-Column Footer Grid */}
        <div
          className="tt-footer-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '40px',
          }}
        >
          {/* Column 1: Vamos Conversar. */}
          <div
            className="tt-footer-col-1"
            style={{
              flex: '1 1 360px',
              maxWidth: '460px',
            }}
          >
            <h2
              className="tt-footer-title"
              style={{
                fontSize: '44px',
                fontWeight: 800,
                color: '#002b49',
                letterSpacing: '-0.02em',
                lineHeight: '1.12',
                margin: '0 0 16px 0',
                fontFamily: "'Catamaran', sans-serif",
              }}
            >
              Vamos Conversar<span style={{ color: '#00aa4e' }}>.</span>
            </h2>
            <p
              className="tt-footer-desc"
              style={{
                fontSize: '17px',
                fontWeight: 400,
                color: '#50667a',
                lineHeight: '1.6',
                margin: 0,
                maxWidth: '420px',
                fontFamily: "'Catamaran', sans-serif",
              }}
            >
              Conte conosco para soluções de tradução e interpretação personalizadas para o seu negócio.
            </p>
          </div>

          {/* Column 2: Entre em Contato */}
          <div
            className="tt-footer-col-2"
            style={{
              flex: '1 1 240px',
              maxWidth: '300px',
            }}
          >
            <h3
              className="tt-section-heading"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#002b49',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
              }}
            >
              ENTRE EM CONTATO
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* E-mail */}
              <a
                href="mailto:contato@traduztudo.com.br"
                className="tt-contact-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#002b49',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
              >
                <i
                  className="far fa-envelope"
                  style={{
                    color: '#00aa4e',
                    fontSize: '16px',
                    width: '18px',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                />
                <span>contato@traduztudo.com.br</span>
              </a>

              {/* Atendente 1 */}
              <a
                href="https://wa.me/5511983522358?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="tt-contact-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#002b49',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                <i
                  className="fab fa-whatsapp"
                  style={{
                    color: '#00aa4e',
                    fontSize: '18px',
                    width: '18px',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                />
                <span>(11) 98352-2358</span>
              </a>

              {/* Atendente 2 */}
              <a
                href="https://wa.me/5511947306122?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="tt-contact-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#002b49',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                <i
                  className="fab fa-whatsapp"
                  style={{
                    color: '#00aa4e',
                    fontSize: '18px',
                    width: '18px',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                />
                <span>(11) 94730-6122</span>
              </a>
            </div>

            {/* Social Icons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '22px',
              }}
            >
              <a
                href="https://www.facebook.com/traduztudo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  backgroundColor: '#002b49',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="https://www.instagram.com/traduztudo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  backgroundColor: '#002b49',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://wa.me/5511983522358"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  backgroundColor: '#002b49',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
              >
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>

          {/* Column 3: Formas de Pagamento */}
          <div
            className="tt-footer-col-3"
            style={{
              flex: '1 1 260px',
              maxWidth: '300px',
            }}
          >
            <h3
              className="tt-section-heading"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#002b49',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
              }}
            >
              FORMAS DE PAGAMENTO
            </h3>

            {/* 2 Sub-Columns Grid for Payment Logos */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '116px 1fr',
                gap: '16px 20px',
                alignItems: 'center',
              }}
            >
              {/* Row 1 Left: Boleto Bancário */}
              <div
                style={{
                  width: '116px',
                  height: '74px',
                  border: '1.5px solid #111111',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px 8px',
                  boxSizing: 'border-box',
                }}
              >
                <svg width="48" height="22" viewBox="0 0 48 22" fill="#111111">
                  <rect x="1" y="0" width="3" height="22" />
                  <rect x="6" y="0" width="1.5" height="22" />
                  <rect x="9.5" y="0" width="4" height="22" />
                  <rect x="15.5" y="0" width="2" height="22" />
                  <rect x="19" y="0" width="1.5" height="22" />
                  <rect x="22.5" y="0" width="3.5" height="22" />
                  <rect x="28" y="0" width="1.5" height="22" />
                  <rect x="31.5" y="0" width="4" height="22" />
                  <rect x="37.5" y="0" width="2" height="22" />
                  <rect x="41.5" y="0" width="1.5" height="22" />
                  <rect x="45" y="0" width="3" height="22" />
                </svg>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#111111',
                    marginTop: '4px',
                    lineHeight: '1.1',
                    textAlign: 'center',
                    fontFamily: "'Catamaran', sans-serif",
                  }}
                >
                  Boleto
                  <br />
                  Bancário
                </span>
              </div>

              {/* Row 1 Right: Pix */}
              <div
                style={{
                  height: '74px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 512 512" fill="none">
                  <path
                    d="M126.6 138.8l63.6-63.6c7.8-7.8 20.5-7.8 28.3 0l68 68c19.5 19.5 51.2 19.5 70.7 0l68-68c7.8-7.8 20.5-7.8 28.3 0l63.6 63.6c7.8 7.8 7.8 20.5 0 28.3l-68 68c-19.5 19.5-19.5 51.2 0 70.7l68 68c7.8 7.8 7.8 20.5 0 28.3l-63.6 63.6c-7.8 7.8-20.5 7.8-28.3 0l-68-68c-19.5-19.5-51.2-19.5-70.7 0l-68 68c-7.8 7.8-20.5 7.8-28.3 0l-63.6-63.6c-7.8-7.8-7.8-20.5 0-28.3l68-68c19.5-19.5 19.5-51.2 0-70.7l-68-68c-7.8-7.8-7.8-20.5 0-28.3z"
                    fill="#6b7280"
                  />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                  <span
                    style={{
                      fontSize: '26px',
                      fontWeight: 800,
                      color: '#4b5563',
                      letterSpacing: '-0.5px',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    pix
                  </span>
                  <span
                    style={{
                      fontSize: '7.5px',
                      color: '#9ca3af',
                      fontWeight: 500,
                      letterSpacing: '0.2px',
                      marginTop: '2px',
                    }}
                  >
                    pagamentos instantâneos
                  </span>
                </div>
              </div>

              {/* Row 2 Left: PayPal */}
              <div
                style={{
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '27px',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    letterSpacing: '-0.8px',
                    color: '#222222',
                    fontFamily: 'sans-serif',
                  }}
                >
                  PayPal
                </span>
              </div>

              {/* Row 2 Right: MasterCard */}
              <div
                style={{
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="74" height="42" viewBox="0 0 100 60" fill="none">
                  <circle cx="36" cy="30" r="26" fill="#374151" />
                  <circle cx="64" cy="30" r="26" fill="#6b7280" opacity="0.9" />
                  <path
                    d="M50 13.5a25.9 25.9 0 0 0-14 16.5 25.9 25.9 0 0 0 14 16.5 25.9 25.9 0 0 0 14-16.5A25.9 25.9 0 0 0 50 13.5z"
                    fill="#4b5563"
                  />
                  <text
                    x="50"
                    y="34"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12.5"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    letterSpacing="-0.2px"
                  >
                    MasterCard
                  </text>
                </svg>
              </div>

              {/* Row 3 Left: VISA */}
              <div
                style={{
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="80" height="26" viewBox="0 0 110 36" fill="none">
                  <path
                    d="M44.7 3.5l-10.7 25.4h-6.8L19.8 8.8c-.8-3.1-2.2-4.2-4.9-5.3-4.4-1.9-8.4-3.5-12.9-4.5L2.3 0h17.8c2.4 0 4.5 1.5 5.1 4.5l4.3 22.9 10.7-23.9h4.5zm25.9 17.1c.1-6.6-9.1-7-9-10 .1-1 1-1.9 3.2-2.2 1.1-.1 4.1-.2 7.6 1.4l1.3-6.2C71.9 3 69.3 2.5 66 2.5c-7 0-11.9 3.7-12 9 0 3.9 3.5 6.1 6.2 7.4 2.8 1.4 3.7 2.3 3.7 3.5 0 1.9-2.3 2.7-4.4 2.7-3.7 0-5.8-.6-8.9-2l-1.3 6.1c1.8.8 5 1.5 8.4 1.5 7.9 0 13-3.9 12.9-9.6zm22.4 8.3h6L94.7 3.5h-5.6c-1.8 0-3.2.5-3.9 2.4l-11.3 26.5h7.2l1.4-3.9h8.8l1.7 3.9zm-7.6-9.3l3.6-9.9 2.1 9.9h-5.7zM60.1 3.5l-5.4 25.4H48l5.4-25.4h6.7z"
                    fill="#222222"
                  />
                </svg>
              </div>

              {/* Row 3 Right: Mercado Pago */}
              <div
                style={{
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <svg width="30" height="24" viewBox="0 0 36 28" fill="none">
                  <ellipse cx="18" cy="14" rx="17" ry="13" stroke="#333333" strokeWidth="1.8" />
                  <path
                    d="M10 14.5c1-1 3.2-1 4.2 0l3 3 7.8-6.5c1-1 3.2-1 4.2 0"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 17.5l3-3"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#333333',
                      letterSpacing: '0.2px',
                      fontFamily: "'Catamaran', sans-serif",
                    }}
                  >
                    mercado
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#333333',
                      letterSpacing: '0.2px',
                      fontFamily: "'Catamaran', sans-serif",
                    }}
                  >
                    pago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div
          className="tt-footer-bottom-bar"
          style={{
            borderTop: '1px solid #e2e8f0',
            marginTop: '56px',
            paddingTop: '26px',
            paddingBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
            color: '#64748b',
            fontFamily: "'Catamaran', sans-serif",
          }}
        >
          <div className="tt-footer-bottom-text" style={{ color: '#64748b' }}>
            Copyright © 2026 TraduzTudo, Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href="/termos-de-uso"
              className="tt-footer-bottom-link"
              style={{
                color: '#64748b',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              Termos de Uso
            </Link>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <Link
              href="/politicas-de-privacidade"
              className="tt-footer-bottom-link"
              style={{
                color: '#64748b',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
