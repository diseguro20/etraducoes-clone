const fs = require('fs');

let pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');

const s1Start = pageContent.indexOf('<section class=\\"padd-top-sm padd-bottom-lg\\">');
const s2Start = pageContent.indexOf('<section class=\\"bg-bottom-gray\\">');

if (s1Start === -1 || s2Start === -1) {
  console.error('Could not find section markers');
  process.exit(1);
}

const modernHeroHtml = `<section class=\\"modern-hero-section\\">
  <div class=\\"modern-hero-ambient\\"></div>
  <div class=\\"container\\">
    <div class=\\"modern-hero-grid\\">
      <!-- Left Column: Copy & Value Proposition -->
      <div class=\\"modern-hero-col-text\\">
        <div class=\\"modern-hero-badge\\">
          <span class=\\"modern-badge-pulse\\"></span>
          <span class=\\"modern-badge-text\\">PLATAFORMA INTELIGENTE DE TRADUÇÕES OFICIAIS</span>
        </div>

        <h1 class=\\"modern-hero-title\\">
          Traduções Juramentadas com <span class=\\"modern-gradient-text\\">Velocidade Recorde</span> e Validade Oficial
        </h1>

        <p class=\\"modern-hero-desc\\">
          A união perfeita entre tecnologia avançada e tradutores juramentados matriculados. Receba seu orçamento online em minutos com segurança jurídica, carimbo CNJ e entrega expressa em todo o Brasil e exterior.
        </p>

        <div class=\\"modern-hero-features\\">
          <div class=\\"modern-feature-tag\\">
            <i class=\\"fas fa-check-circle\\"></i> Assinatura Digital ICP-Brasil
          </div>
          <div class=\\"modern-feature-tag\\">
            <i class=\\"fas fa-check-circle\\"></i> Válido em Embaixadas e Cartórios
          </div>
          <div class=\\"modern-feature-tag\\">
            <i class=\\"fas fa-check-circle\\"></i> +10 Idiomas com Tradutor Nativo
          </div>
        </div>

        <div class=\\"modern-hero-actions\\">
          <a href=\\"javascript:void(0)\\" class=\\"modern-btn-primary wpp-btn-trigger\\">
            <i class=\\"fab fa-whatsapp\\"></i> Orçar pelo WhatsApp
          </a>
          <span class=\\"modern-btn-secondary j_play\\" data-video-id=\\"bXejuFDqILQ\\">
            <i class=\\"fas fa-play\\"></i> Conheça a TraduzTudo
          </span>
        </div>

        <!-- Modern High-Trust Strip (Replacing old logos) -->
        <div class=\\"modern-trust-grid\\">
          <div class=\\"modern-trust-card\\">
            <div class=\\"modern-trust-icon-box\\">
              <i class=\\"fas fa-bolt\\"></i>
            </div>
            <div>
              <span class=\\"modern-trust-title\\">Orçamento Ágil</span>
              <span class=\\"modern-trust-sub\\">Em até 15 minutos</span>
            </div>
          </div>

          <div class=\\"modern-trust-card\\">
            <div class=\\"modern-trust-icon-box\\">
              <i class=\\"fas fa-stamp\\"></i>
            </div>
            <div>
              <span class=\\"modern-trust-title\\">Fé Pública CNJ</span>
              <span class=\\"modern-trust-sub\\">Válido no Brasil e exterior</span>
            </div>
          </div>

          <div class=\\"modern-trust-card\\">
            <div class=\\"modern-trust-icon-box\\">
              <i class=\\"fas fa-shield-alt\\"></i>
            </div>
            <div>
              <span class=\\"modern-trust-title\\">Sigilo Absoluto</span>
              <span class=\\"modern-trust-sub\\">Protegido por criptografia</span>
            </div>
          </div>

          <div class=\\"modern-trust-card\\">
            <div class=\\"modern-trust-icon-box\\">
              <i class=\\"fas fa-star\\"></i>
            </div>
            <div>
              <span class=\\"modern-trust-title\\">Avaliação 4.9/5</span>
              <span class=\\"modern-trust-sub\\">+1.500 clientes satisfeitos</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Innovative Quote Card -->
      <div class=\\"modern-hero-col-form\\">
        <div class=\\"modern-form-card request\\">
          <div class=\\"modern-card-glow-bar\\"></div>

          <div class=\\"modern-form-header\\">
            <div class=\\"modern-form-header-badge\\">
              <i class=\\"fas fa-stopwatch\\"></i> RÁPIDO & INSTANTÂNEO
            </div>
            <h2 class=\\"modern-form-title\\">Solicite seu Orçamento</h2>
            <p class=\\"modern-form-subtitle\\">Preencha abaixo para receber preço e prazo em minutos</p>
          </div>

          <form action=\\"/orcamento-traducoes\\" method=\\"post\\" enctype=\\"multipart/form-data\\">
            <input type=\\"hidden\\" name=\\"action\\" value=\\"create\\">
            <input type=\\"hidden\\" name=\\"copy_docs\\" value=\\"yes\\">

            <div class=\\"modern-input-group\\">
              <label for=\\"name\\" class=\\"modern-input-label\\">
                <i class=\\"far fa-user\\"></i> Nome completo
              </label>
              <input class=\\"form modern-input-field\\" id=\\"name\\" type=\\"text\\" name=\\"full_name\\" placeholder=\\"Seu nome e sobrenome\\" required>
            </div>

            <div class=\\"modern-input-group\\">
              <label for=\\"mail\\" class=\\"modern-input-label\\">
                <i class=\\"far fa-envelope\\"></i> E-mail de contato
              </label>
              <input class=\\"form modern-input-field\\" type=\\"email\\" id=\\"mail\\" name=\\"email\\" required placeholder=\\"exemplo@email.com\\">
            </div>

            <div class=\\"modern-input-group\\">
              <label for=\\"whatsapp\\" class=\\"modern-input-label\\">
                <i class=\\"fab fa-whatsapp\\"></i> WhatsApp com DDD
              </label>
              <div class=\\"tel\\">
                <input type=\\"tel\\" name=\\"wpp\\" class=\\"form modern-input-field\\" id=\\"whatsapp\\" autocomplete=\\"none\\" placeholder=\\"(11) 98765-4321\\" required aria-labelledby=\\"WhatsApp\\">
                <div class=\\"invalid-feedback\\" id=\\"phone-error\\" style=\\"display: none;\\">
                  Números brasileiros devem conter o dígito 9 após o DDD
                </div>
              </div>
            </div>

            <div class=\\"modern-input-group\\">
              <label for=\\"service\\" class=\\"modern-input-label\\">
                <i class=\\"far fa-file-alt\\"></i> Tipo de serviço
              </label>
              <div class=\\"modern-select-wrapper\\">
                <select name=\\"type_service\\" class=\\"form modern-input-field modern-select-field\\" id=\\"service\\" required>
                  <option value=\\"\\" selected disabled>Selecione a modalidade desejada *</option>
                  <option value=\\"trad\\">📜 Tradução Juramentada / Oficial</option>
                  <option value=\\"apostille\\">🏛️ Apostilamento de Haia</option>
                  <option value=\\"certificada\\">📄 Tradução Certificada Internacional</option>
                  <option value=\\"tecnica\\">⚙️ Tradução Técnica & Empresarial</option>
                </select>
              </div>
            </div>

            <div class=\\"modern-input-group\\">
              <label for=\\"docs\\" class=\\"modern-input-label\\">
                <i class=\\"far fa-folder-open\\"></i> Documentos para tradução (opcional)
              </label>
              <div class=\\"modern-dropzone\\">
                <i class=\\"fas fa-cloud-upload-alt modern-dropzone-icon\\"></i>
                <div class=\\"modern-dropzone-info\\">
                  <strong>Clique aqui para anexar documentos</strong>
                  <span>PDF, Word, JPG ou PNG (até 1 GB)</span>
                </div>
                <input type=\\"file\\" id=\\"docs\\" name=\\"files[]\\" class=\\"file_uploader modern-hidden-file-input\\" multiple>
              </div>
            </div>

            <div class=\\"modern-security-note\\">
              <i class=\\"fas fa-lock\\"></i>
              <span>Tratamos seus dados com sigilo absoluto conforme nossa <a href=\\"/politicas-de-privacidade\\" target=\\"_blank\\">Política de Privacidade</a>.</span>
            </div>

            <button type=\\"submit\\" class=\\"modern-submit-btn\\">
              <span>Calcular Preço e Prazo Agora</span>
              <i class=\\"fas fa-arrow-right\\"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>\\n`;

const newPageContent = pageContent.substring(0, s1Start) + modernHeroHtml + pageContent.substring(s2Start);

fs.writeFileSync('src/app/page.tsx', newPageContent, 'utf8');
console.log('Successfully updated src/app/page.tsx with modern hero and removed old client logos!');
