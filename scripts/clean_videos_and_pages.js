const fs = require('fs');

// 1. apostilamento-de-haia/page.tsx
let apostille = fs.readFileSync('src/app/apostilamento-de-haia/page.tsx', 'utf8');
const apostilleVideoRegex = /<div class=\\?"video-block\\?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const apostilleCard = `<div class=\\"apostille-feature-card\\" style=\\"background: linear-gradient(135deg, #0d1b3e, #142a5c); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 36px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); color: #fff;\\">
                    <div style=\\"display: flex; align-items: center; gap: 16px; margin-bottom: 24px;\\">
                        <div style=\\"width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 26px;\\">
                            <i class=\\"far fa-stamp\\"></i>
                        </div>
                        <div>
                            <h3 style=\\"font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 4px 0;\\">Apostilamento Oficial CNJ</h3>
                            <p style=\\"font-size: 14px; color: rgba(255,255,255,0.75); margin: 0;\\">Válido em mais de 120 países da Convenção</p>
                        </div>
                    </div>
                    <div style=\\"background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin-bottom: 24px;\\">
                        <div style=\\"display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;\\">
                            <i class=\\"far fa-check-circle\\" style=\\"color: #10b981; font-size: 18px; margin-top: 3px;\\"></i>
                            <span style=\\"font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.5;\\">Apostilamos certidões, diplomas, contratos e procurações de todo o Brasil</span>
                        </div>
                        <div style=\\"display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;\\">
                            <i class=\\"far fa-check-circle\\" style=\\"color: #10b981; font-size: 18px; margin-top: 3px;\\"></i>
                            <span style=\\"font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.5;\\">Trâmite 100% digital e sem filas de cartório</span>
                        </div>
                        <div style=\\"display: flex; align-items: flex-start; gap: 12px;\\">
                            <i class=\\"far fa-check-circle\\" style=\\"color: #10b981; font-size: 18px; margin-top: 3px;\\"></i>
                            <span style=\\"font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.5;\\">Envio expresso rastreado para o Brasil e Exterior</span>
                        </div>
                    </div>
                    <a href=\\"/orcamento-traducoes\\" class=\\"btn btn-green\\" style=\\"display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; font-size: 16px; font-weight: 600; padding: 14px 20px; border-radius: 12px; text-decoration: none;\\">
                        <i class=\\"far fa-calculator\\"></i> Cotar Apostilamento Online
                    </a>
                </div>`;
apostille = apostille.replace(apostilleVideoRegex, apostilleCard);
fs.writeFileSync('src/app/apostilamento-de-haia/page.tsx', apostille, 'utf8');
console.log('1. Updated apostilamento-de-haia');

// 2. traducao-certificada/page.tsx
let cert = fs.readFileSync('src/app/traducao-certificada/page.tsx', 'utf8');
const certVideoRegex = /<div class=\\?"video-block\\?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const certCard = `<div style=\\"background: linear-gradient(135deg, #111738, #1c2759); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 36px 32px; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.15); color: #fff;\\">
              <div style=\\"display: flex; align-items: center; gap: 16px; margin-bottom: 20px;\\">
                <div style=\\"width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #2e7ec6, #1e4497); display: flex; align-items: center; justify-content: center; font-size: 24px;\\">
                  <i class=\\"far fa-file-certificate\\"></i>
                </div>
                <div>
                  <h3 style=\\"color: #fff; margin: 0 0 4px 0; font-size: 20px; font-weight: 700;\\">Padrão Internacional Homologado</h3>
                  <p style=\\"color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;\\">Aceita por consulados, universidades e agências de imigração</p>
                </div>
              </div>
              <p style=\\"color: rgba(255,255,255,0.85); line-height: 1.6; margin-bottom: 20px;\\">A Tradução Certificada da TraduzTudo é emitida com declaração formal de precisão jurídica (Certificate of Accuracy), identificação de credenciamento do tradutor profissional e assinatura eletrônica avançada aceita internacionalmente por órgãos como <strong>USCIS (EUA), NAATI (Austrália) e órgãos europeus</strong>.</p>
              <div style=\\"display: flex; flex-wrap: wrap; gap: 12px;\\">
                <a href=\\"/orcamento-traducoes\\" class=\\"btn btn-blue\\" style=\\"font-weight: 600;\\"><i class=\\"far fa-calculator\\"></i> Simular Preço Imediato</a>
                <a href=\\"javascript:void(0)\\" class=\\"btn btn-green wpp-btn-trigger\\" style=\\"font-weight: 600;\\"><i class=\\"fab fa-whatsapp\\"></i> Tirar Dúvidas pelo WhatsApp</a>
              </div>
            </div>`;
cert = cert.replace(certVideoRegex, certCard);
fs.writeFileSync('src/app/traducao-certificada/page.tsx', cert, 'utf8');
console.log('2. Updated traducao-certificada');

// 3. traducao-para-intercambio/page.tsx
let interc = fs.readFileSync('src/app/traducao-para-intercambio/page.tsx', 'utf8');
const intercVideoRegex = /<div class=\\?"video-block\\?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const intercCard = `<div style=\\"background: linear-gradient(135deg, #0f172a, #1e293b); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 36px 30px; color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.2);\\">
          <div style=\\"display: flex; align-items: center; gap: 16px; margin-bottom: 22px;\\">
            <div style=\\"width: 54px; height: 54px; border-radius: 14px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); display: flex; align-items: center; justify-content: center; font-size: 24px;\\">
              <i class=\\"far fa-graduation-cap\\"></i>
            </div>
            <div>
              <h3 style=\\"margin: 0 0 4px 0; font-size: 20px; font-weight: 700; color: #fff;\\">Intercâmbio Sem Fronteiras</h3>
              <p style=\\"margin: 0; font-size: 14px; color: rgba(255,255,255,0.7);\\">Traduções aceitas em universidades do mundo todo</p>
            </div>
          </div>
          <div style=\\"background: rgba(255,255,255,0.04); border-radius: 12px; padding: 18px; margin-bottom: 24px;\\">
            <p style=\\"margin: 0 0 10px 0; font-size: 14px; color: rgba(255,255,255,0.85); line-height: 1.5;\\"><i class=\\"far fa-check-circle\\" style=\\"color: #10b981; margin-right: 8px;\\"></i><strong>Históricos e Diplomas:</strong> Formatação e terminologia acadêmica idêntica ao original.</p>
            <p style=\\"margin: 0 0 10px 0; font-size: 14px; color: rgba(255,255,255,0.85); line-height: 1.5;\\"><i class=\\"far fa-check-circle\\" style=\\"color: #10b981; margin-right: 8px;\\"></i><strong>Comprovações Financeiras:</strong> Tradução juramentada e certificada para vistos de estudante.</p>
            <p style=\\"margin: 0; font-size: 14px; color: rgba(255,255,255,0.85); line-height: 1.5;\\"><i class=\\"far fa-check-circle\\" style=\\"color: #10b981; margin-right: 8px;\\"></i><strong>Agilidade Recorde:</strong> Opções de entrega rápida para prazos consulares urgentes.</p>
          </div>
          <a href=\\"/orcamento-traducoes\\" class=\\"btn btn-blue\\" style=\\"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; font-weight: 600; padding: 14px; border-radius: 12px;\\"><i class=\\"far fa-calculator\\"></i> Simular Tradução Acadêmica</a>
        </div>`;
interc = interc.replace(intercVideoRegex, intercCard);
fs.writeFileSync('src/app/traducao-para-intercambio/page.tsx', interc, 'utf8');
console.log('3. Updated traducao-para-intercambio');

// 4. programa-de-afiliados/page.tsx
let afil = fs.readFileSync('src/app/programa-de-afiliados/page.tsx', 'utf8');
const afilVideoRegex = /<div class=\\?"video-block\\?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const afilCard = `<div style=\\"background: linear-gradient(135deg, #111738, #1e2a5a); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 36px 32px; color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.2);\\">
                    <div style=\\"display: flex; align-items: center; gap: 16px; margin-bottom: 22px;\\">
                        <div style=\\"width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; font-size: 26px;\\">
                            <i class=\\"far fa-badge-percent\\"></i>
                        </div>
                        <div>
                            <h3 style=\\"margin: 0 0 4px 0; font-size: 22px; font-weight: 700; color: #fff;\\">Comissões de até 10%</h3>
                            <p style=\\"margin: 0; font-size: 14px; color: rgba(255,255,255,0.7);\\">Pagamento direto e automático via PIX</p>
                        </div>
                    </div>
                    <div style=\\"background: rgba(255,255,255,0.04); border-radius: 14px; padding: 20px; margin-bottom: 24px;\\">
                        <div style=\\"display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;\\">
                            <span style=\\"color: rgba(255,255,255,0.7);\\">Comissão por Venda:</span>
                            <strong style=\\"color: #10b981;\\">Até 10% do pedido</strong>
                        </div>
                        <div style=\\"display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;\\">
                            <span style=\\"color: rgba(255,255,255,0.7);\\">Frequência de Pagamento:</span>
                            <strong style=\\"color: #fff;\\">Mensal via PIX</strong>
                        </div>
                        <div style=\\"display: flex; justify-content: space-between; font-size: 15px;\\">
                            <span style=\\"color: rgba(255,255,255,0.7);\\">Rastreamento de Leads:</span>
                            <strong style=\\"color: #60a5fa;\\">Painel em Tempo Real</strong>
                        </div>
                    </div>
                    <a href=\\"#register\\" class=\\"btn btn-green go_to\\" style=\\"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; font-weight: 600; padding: 14px; border-radius: 12px;\\"><i class=\\"far fa-user-plus\\"></i> Criar Conta de Afiliado Grátis</a>
                </div>`;
afil = afil.replace(afilVideoRegex, afilCard);
fs.writeFileSync('src/app/programa-de-afiliados/page.tsx', afil, 'utf8');
console.log('4. Updated programa-de-afiliados');

// 5. programa-de-parceiros/page.tsx
let parc = fs.readFileSync('src/app/programa-de-parceiros/page.tsx', 'utf8');
// Remove youtube iframe section
const parcVideoRegex = /<section class=\\?"padd-top-lg padd-bottom-lg\\?" style=\\?"background-color: #2e7ec6;\\?">[\s\S]*?<\/iframe>[\s\S]*?<\/section>/;
const parcFeatures = `<section class=\\"padd-top-lg padd-bottom-lg\\" style=\\"background: linear-gradient(135deg, #1e4497, #2e7ec6); color: #fff;\\">
    <div class=\\"container\\">
        <div class=\\"al-center mb-5\\">
            <h2 class=\\"title-md\\" style=\\"color: #fff;\\">Por que ser um Parceiro TraduzTudo?</h2>
            <p style=\\"color: rgba(255,255,255,0.85); margin: -10px 0 0 0; font-size: 18px;\\">Gere nova receita para seu negócio agregando traduções oficiais de alta demanda.</p>
        </div>
        <div class=\\"row\\">
            <div class=\\"col-md-4 mb-4\\">
                <div style=\\"background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border-radius: 16px; padding: 30px 24px; text-align: center; height: 100%; border: 1px solid rgba(255,255,255,0.2);\\">
                    <i class=\\"fas fa-hand-holding-usd fa-3x\\" style=\\"color: #10b981; margin-bottom: 16px;\\"></i>
                    <h3 style=\\"color: #fff; font-size: 20px; font-weight: 700; margin-bottom: 10px;\\">Comissões Atrativas</h3>
                    <p style=\\"color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;\\">Receba comissões sobre cada tradução ou apostilamento contratado pela sua indicação.</p>
                </div>
            </div>
            <div class=\\"col-md-4 mb-4\\">
                <div style=\\"background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border-radius: 16px; padding: 30px 24px; text-align: center; height: 100%; border: 1px solid rgba(255,255,255,0.2);\\">
                    <i class=\\"fas fa-headset fa-3x\\" style=\\"color: #60a5fa; margin-bottom: 16px;\\"></i>
                    <h3 style=\\"color: #fff; font-size: 20px; font-weight: 700; margin-bottom: 10px;\\">Atendimento Prioritário</h3>
                    <p style=\\"color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;\\">Canal direto no WhatsApp exclusivo para parceiros com cotações e prazos expressos.</p>
                </div>
            </div>
            <div class=\\"col-md-4 mb-4\\">
                <div style=\\"background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border-radius: 16px; padding: 30px 24px; text-align: center; height: 100%; border: 1px solid rgba(255,255,255,0.2);\\">
                    <i class=\\"fas fa-shield-check fa-3x\\" style=\\"color: #fbbf24; margin-bottom: 16px;\\"></i>
                    <h3 style=\\"color: #fff; font-size: 20px; font-weight: 700; margin-bottom: 10px;\\">Validade Garantida</h3>
                    <p style=\\"color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;\\">Traduções aceitas em todos os consulados, embaixadas, cartórios e tribunais.</p>
                </div>
            </div>
        </div>
    </div>
</section>`;
parc = parc.replace(parcVideoRegex, parcFeatures);

// Replace Camila Malucelli & ferraracidadaniaitaliana in parceiros
parc = parc.replace(/Camila\\s*Malucelli/g, 'Mariana Silveira');
parc = parc.replace(/https:\/\/www\.instagram\.com\/ferraracidadaniaitaliana\//g, '#contato');
parc = parc.replace(/@ferraracidadaniaitaliana/g, '@assessoriainternacional');
parc = parc.replace(/A parceria entre a TraduzTudo Cidadania Italiana e a TraduzTudo já dura há anos[\s\S]*?exclusivamente dos serviços de\s*tradução e apostilamento\./g, 
  'A parceria com a TraduzTudo é indispensável para nosso escritório. Nossos clientes têm total segurança na entrega das certidões e documentos apostilados, sempre no prazo combinado e com validade internacional incontestável.');
parc = parc.replace(/https:\/\/www\.google\.com\/search\?q=etraducoes[^\"]*/g, '/avaliacoes');

fs.writeFileSync('src/app/programa-de-parceiros/page.tsx', parc, 'utf8');
console.log('5. Updated programa-de-parceiros');

// 6. plataforma-de-traducao/page.tsx
let plat = fs.readFileSync('src/app/plataforma-de-traducao/page.tsx', 'utf8');
// Replace video block
const platVideoRegex = /<div class=\\?"video-block\\?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const platCard = `<div style=\\"background: linear-gradient(135deg, #0d1b3e, #1e3a8a); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 36px 32px; color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.2);\\">
                    <div style=\\"display: flex; align-items: center; gap: 16px; margin-bottom: 22px;\\">
                        <div style=\\"width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); display: flex; align-items: center; justify-content: center; font-size: 26px;\\">
                            <i class=\\"far fa-microchip\\"></i>
                        </div>
                        <div>
                            <h3 style=\\"margin: 0 0 4px 0; font-size: 22px; font-weight: 700; color: #fff;\\">Plataforma TraduzTudo SaaS</h3>
                            <p style=\\"margin: 0; font-size: 14px; color: rgba(255,255,255,0.7);\\">Inteligência Artificial & Tradutores Oficiais</p>
                        </div>
                    </div>
                    <div style=\\"background: rgba(255,255,255,0.04); border-radius: 14px; padding: 20px; margin-bottom: 24px;\\">
                        <div style=\\"display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;\\">
                            <i class=\\"far fa-bolt\\" style=\\"color: #fbbf24; font-size: 16px; margin-top: 3px;\\"></i>
                            <span style=\\"font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.4;\\">Orçamentos instantâneos com extração inteligente de texto</span>
                        </div>
                        <div style=\\"display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;\\">
                            <i class=\\"far fa-sync-alt\\" style=\\"color: #10b981; font-size: 16px; margin-top: 3px;\\"></i>
                            <span style=\\"font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.4;\\">Painel corporativo com faturamento mensal para empresas</span>
                        </div>
                        <div style=\\"display: flex; align-items: flex-start; gap: 12px;\\">
                            <i class=\\"far fa-lock\\" style=\\"color: #60a5fa; font-size: 16px; margin-top: 3px;\\"></i>
                            <span style=\\"font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.4;\\">Criptografia ponta a ponta e sigilo empresarial absoluto</span>
                        </div>
                    </div>
                    <a href=\\"/orcamento-traducoes\\" class=\\"btn btn-green\\" style=\\"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; font-weight: 600; padding: 14px; border-radius: 12px;\\"><i class=\\"far fa-calculator\\"></i> Começar Agora Online</a>
                </div>`;
plat = plat.replace(platVideoRegex, platCard);

// Rebrand AIUTA to Plataforma TraduzTudo
plat = plat.replace(/AIUTA/g, 'TraduzTudo');
plat = plat.replace(/aiuta/g, 'traduztudo');
plat = plat.replace(/suporte@traduztudo\.ai/g, 'suporte@traduztudo.com.br');
plat = plat.replace(/https:\/\/agenda\.traduztudo\.ai/g, '/contato');
plat = plat.replace(/data-post=\\"\/\\"\\s*data-action=\\"open_traduztudo\\"/g, 'href=\\"/orcamento-traducoes\\"');

fs.writeFileSync('src/app/plataforma-de-traducao/page.tsx', plat, 'utf8');
console.log('6. Updated plataforma-de-traducao');
