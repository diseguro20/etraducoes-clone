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

              {/* Atendente Principal */}
              <a
                href="https://wa.me/5511947485091?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20tradu%C3%A7%C3%A3o."
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
                  fontWeight: 700,
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
                <span>(11) 94748-5091</span>
              </a>

              {/* Atendente 2 */}
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

              {/* Atendente 3 */}
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
                href="https://www.facebook.com/profile.php?id=61594891905671"
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
                href="https://www.instagram.com/traduz_tudo_/"
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
                href="https://wa.me/5511947485091"
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
              flex: '1 1 270px',
              maxWidth: '310px',
            }}
          >
            <h3
              className="tt-section-heading"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#004b87',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
              }}
            >
              FORMAS DE PAGAMENTO
            </h3>

            {/* 2-Column Payment Logos Grid with original brand logos */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '122px 1fr',
                columnGap: '18px',
                rowGap: '20px',
                alignItems: 'center',
              }}
            >
              {/* Row 1 Left: Boleto Bancário */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '76px',
                }}
              >
                <img
                  src="/img/pagamento/boleto-bancario@2x.png"
                  alt="Boleto Bancário"
                  width={116}
                  height={74}
                  style={{
                    width: '116px',
                    height: 'auto',
                    maxHeight: '74px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Row 1 Right: Pix */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '76px',
                }}
              >
                <img
                  src="/img/pagamento/pix@2x.png"
                  alt="Pix - Pagamentos Instantâneos"
                  width={120}
                  height={34}
                  style={{
                    width: '120px',
                    height: 'auto',
                    maxHeight: '36px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Row 2 Left: PayPal */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '38px',
                }}
              >
                <img
                  src="/img/pagamento/paypal@2x.png"
                  alt="PayPal"
                  width={98}
                  height={28}
                  style={{
                    width: '98px',
                    height: 'auto',
                    maxHeight: '28px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Row 2 Right: MasterCard */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '38px',
                }}
              >
                <img
                  src="/img/pagamento/mastercard@2x.png"
                  alt="MasterCard"
                  width={56}
                  height={38}
                  style={{
                    width: '56px',
                    height: 'auto',
                    maxHeight: '38px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Row 3 Left: VISA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '34px',
                }}
              >
                <img
                  src="/img/pagamento/visa@2x.png"
                  alt="VISA"
                  width={68}
                  height={25}
                  style={{
                    width: '68px',
                    height: 'auto',
                    maxHeight: '25px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Row 3 Right: Mercado Pago */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '34px',
                }}
              >
                <img
                  src="/img/pagamento/mercadopago@2x.png"
                  alt="Mercado Pago"
                  width={82}
                  height={25}
                  style={{
                    width: '82px',
                    height: 'auto',
                    maxHeight: '25px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
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
            <span>Copyright © 2026 TraduzTudo</span>
            <span style={{ margin: '0 8px', color: '#cbd5e1' }}>•</span>
            <span style={{ fontWeight: 600, color: '#334155' }}>CNPJ: 69.530.655/0001-78</span>
            <span style={{ margin: '0 8px', color: '#cbd5e1' }}>•</span>
            <span>Todos os direitos reservados.</span>
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
