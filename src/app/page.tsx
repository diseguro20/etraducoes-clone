'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { createQuote } from '@/lib/firestore';
import { readFilesAsAttachments } from '@/lib/utils';

const bodyHtml = `<section class="modern-hero-section">
  <div class="modern-hero-ambient"></div>
  <div class="container">
    <div class="modern-hero-grid">
      <!-- Left Column: Copy & Value Proposition -->
      <div class="modern-hero-col-text">
        <span class="modern-hero-eyebrow"><i class="fas fa-certificate" aria-hidden="true"></i> TRADUÇÕES OFICIAIS PARA O BRASIL E O EXTERIOR</span>
        <h1 class="modern-hero-title">
          Seus documentos prontos para <span class="modern-gradient-text">cruzar fronteiras.</span>
        </h1>

        <p class="modern-hero-desc">
          Tradução juramentada, certificada e apostilamento com atendimento especializado. Envie seus documentos e receba uma cotação com preço e prazo de entrega.
        </p>

        <div class="modern-hero-features">
          <div class="modern-feature-tag">
            <i class="fas fa-certificate"></i> Assinatura Digital ICP-Brasil
          </div>
          <div class="modern-feature-tag">
            <i class="fas fa-balance-scale"></i> Fé Pública CNJ &amp; Haia
          </div>
          <div class="modern-feature-tag">
            <i class="fas fa-globe-americas"></i> +15 Idiomas Nativos
          </div>
        </div>

        <div class="modern-hero-actions">
          <a href="javascript:void(0)" class="modern-btn-primary wpp-btn-trigger">
            <i class="fab fa-whatsapp"></i> Falar no WhatsApp com Especialista
          </a>
          <a href="/orcamento-traducoes" class="modern-btn-secondary">
            <i class="far fa-calculator"></i> Simular Orçamento Online
          </a>
        </div>

        <!-- Modern Trust Metrics Strip -->
        <div class="modern-hero-stats">
          <div class="modern-stat-item">
            <div class="modern-stat-num">⚡ 15 min</div>
            <div class="modern-stat-label">Cotação Média</div>
          </div>
          <div class="modern-stat-item">
            <div class="modern-stat-num">📜 100%</div>
            <div class="modern-stat-label">Aceito no Exterior</div>
          </div>
          <div class="modern-stat-item">
            <div class="modern-stat-num">⭐ 4.9/5</div>
            <div class="modern-stat-label">Google Avaliações</div>
          </div>
          <div class="modern-stat-item">
            <div class="modern-stat-num">🔒 LGPD</div>
            <div class="modern-stat-label">Sigilo Absoluto</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Innovative Compact Quote Card -->
      <div class="modern-hero-col-form">
        <div class="modern-form-card request">
          <div class="modern-card-glow-bar"></div>

          <div class="modern-form-header">
            <div class="modern-form-header-badge">
              <i class="fas fa-bolt"></i> COTAÇÃO INSTANTÂNEA EM MINUTOS
            </div>
            <h2 class="modern-form-title">Solicite seu Orçamento Grátis</h2>
            <p class="modern-form-subtitle">Preencha abaixo para receber preço e prazo de entrega em minutos</p>
          </div>

          <form action="/orcamento-traducoes" method="post" enctype="multipart/form-data">
            <input type="hidden" name="action" value="create">
            <input type="hidden" name="copy_docs" value="yes">

            <div class="modern-form-row">
              <div class="modern-input-group">
                <label for="name" class="modern-input-label"><i class="far fa-user"></i> Nome</label>
                <input class="form modern-input-field" id="name" type="text" name="full_name" placeholder="Seu nome" required>
              </div>

              <div class="modern-input-group">
                <label for="mail" class="modern-input-label">
                  <i class="far fa-envelope"></i> E-mail de contato
                </label>
                <input class="form modern-input-field" type="email" id="mail" name="email" required placeholder="exemplo@email.com">
              </div>
            </div>

            <div class="modern-form-row">
              <div class="modern-input-group">
                <label for="whatsapp" class="modern-input-label">
                  <i class="fab fa-whatsapp"></i> WhatsApp com DDD
                </label>
                <div class="tel">
                  <input type="tel" name="wpp" class="form modern-input-field" id="whatsapp" autocomplete="none" placeholder="(11) 98765-4321" required aria-labelledby="WhatsApp">
                  <div class="invalid-feedback" id="phone-error" style="display: none;">
                    Números brasileiros devem conter o dígito 9 após o DDD
                  </div>
                </div>
              </div>

              <div class="modern-input-group">
                <label for="service" class="modern-input-label">
                  <i class="far fa-file-alt"></i> Tipo de serviço
                </label>
                <div class="modern-select-wrapper">
                  <select name="type_service" class="form modern-input-field modern-select-field" id="service" required>
                    <option value="" selected disabled>Selecione a modalidade *</option>
                    <option value="trad">📜 Tradução Juramentada / Oficial</option>
                    <option value="apostille">🏛️ Apostilamento de Haia</option>
                    <option value="certificada">📄 Tradução Certificada Internacional</option>
                    <option value="tecnica">⚙️ Tradução Técnica &amp; Empresarial</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="modern-form-row">
              <div class="modern-input-group">
                <label for="source_lang" class="modern-input-label">
                  <i class="fas fa-language"></i> Idioma de Origem (De)
                </label>
                <div class="modern-select-wrapper">
                  <select name="source_lang" class="form modern-input-field modern-select-field" id="source_lang" required>
                    <option value="Português" selected>🇧🇷 Português</option>
                    <option value="Inglês">🇺🇸 Inglês</option>
                    <option value="Espanhol">🇪🇸 Espanhol</option>
                    <option value="Italiano">🇮🇹 Italiano</option>
                    <option value="Francês">🇫🇷 Francês</option>
                    <option value="Alemão">🇩🇪 Alemão</option>
                    <option value="Mandarim">🇨🇳 Mandarim (Chinês)</option>
                    <option value="Japonês">🇯🇵 Japonês</option>
                    <option value="Árabe">🇸🇦 Árabe</option>
                    <option value="Russo">🇷🇺 Russo</option>
                    <option value="Holandês">🇳🇱 Holandês</option>
                    <option value="Coreano">🇰🇷 Coreano</option>
                    <option value="Hebraico">🇮🇱 Hebraico</option>
                    <option value="Outro">🌐 Outro idioma</option>
                  </select>
                </div>
              </div>

              <div class="modern-input-group">
                <label for="target_lang" class="modern-input-label">
                  <i class="fas fa-exchange-alt"></i> Traduzir Para (Para)
                </label>
                <div class="modern-select-wrapper">
                  <select name="target_lang" class="form modern-input-field modern-select-field" id="target_lang" required>
                    <option value="Inglês" selected>🇺🇸 Inglês</option>
                    <option value="Espanhol">🇪🇸 Espanhol</option>
                    <option value="Português">🇧🇷 Português</option>
                    <option value="Italiano">🇮🇹 Italiano</option>
                    <option value="Francês">🇫🇷 Francês</option>
                    <option value="Alemão">🇩🇪 Alemão</option>
                    <option value="Mandarim">🇨🇳 Mandarim (Chinês)</option>
                    <option value="Japonês">🇯🇵 Japonês</option>
                    <option value="Árabe">🇸🇦 Árabe</option>
                    <option value="Russo">🇷🇺 Russo</option>
                    <option value="Holandês">🇳🇱 Holandês</option>
                    <option value="Coreano">🇰🇷 Coreano</option>
                    <option value="Hebraico">🇮🇱 Hebraico</option>
                    <option value="Outro">🌐 Outro idioma</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="modern-input-group">
              <label for="docs" class="modern-input-label">
                <i class="far fa-folder-open"></i> Documentos para tradução (opcional)
              </label>
              <div class="modern-dropzone-compact" id="dropzone-box">
                <i class="fas fa-cloud-upload-alt modern-dropzone-icon" id="dropzone-icon"></i>
                <div class="modern-dropzone-info">
                  <strong id="dropzone-title">Clique ou arraste documentos para anexar</strong>
                  <span id="dropzone-subtitle">PDF, Word, JPG ou PNG (até 1 GB)</span>
                </div>
                <input type="file" id="docs" name="files[]" class="file_uploader modern-hidden-file-input" multiple aria-label="Anexar documentos para tradução">
              </div>
              <div id="attached-files-container" class="modern-attached-files-container" style="display: none;"></div>
            </div>

            <button type="submit" class="modern-submit-btn">
              <span>Calcular Preço e Prazo Agora</span>
              <i class="fas fa-arrow-right"></i>
            </button>

            <div class="modern-security-note">
              <i class="fas fa-shield-alt"></i>
              <span>Tratamos seus documentos com sigilo absoluto e criptografia conforme a <a href="/politicas-de-privacidade" target="_blank">LGPD</a>.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 2: GLOBAL COVERAGE & GUARANTEES -->
<section class="modern-network-section" id="tradocs">
  <div class="container">
    <div class="modern-section-header text-center">
      <span class="modern-section-badge"><i class="fas fa-globe-americas"></i> COBERTURA GLOBAL &amp; IDIOMAS OFICIAIS</span>
      <h2 class="modern-section-title">Traduções Juramentadas em Mais de 15 Idiomas</h2>
      <p class="modern-section-desc">Tradutores públicos concursados pelas Juntas Comerciais do Brasil e autorizados pelas maiores associações de tradução do mundo.</p>
    </div>

    <div class="modern-guarantees-grid">
      <div class="modern-guarantee-card">
        <div class="modern-guarantee-icon"><i class="fas fa-bolt"></i></div>
        <h3>Velocidade Recorde</h3>
        <p>Orçamento online em minutos e prazos expressos de entrega a partir de 24 horas úteis para sua tranquilidade.</p>
      </div>

      <div class="modern-guarantee-card">
        <div class="modern-guarantee-icon"><i class="fas fa-stamp"></i></div>
        <h3>Fé Pública Nacional</h3>
        <p>Validade jurídica incontestável perante cartórios, bancos, juntas comerciais, tribunais e órgãos públicos.</p>
      </div>

      <div class="modern-guarantee-card">
        <div class="modern-guarantee-icon"><i class="fas fa-globe"></i></div>
        <h3>Validade Internacional</h3>
        <p>Traduções juramentadas e certificadas aceitas em consulados, embaixadas e universidades de todo o mundo.</p>
      </div>

      <div class="modern-guarantee-card">
        <div class="modern-guarantee-icon"><i class="fas fa-fingerprint"></i></div>
        <h3>Assinatura ICP-Brasil</h3>
        <p>Entrega digital criptografada com assinatura digital e carimbo de tempo com validação oficial online instantânea.</p>
      </div>
    </div>

    <!-- World Map with Country Flags (Perfeito em Desktop e Mobile) -->
    <div class="traduztudo-map-viewport" aria-label="Mapa Mundi de Idiomas TraduzTudo">
      <div class="traduztudo-map-stage">
        <img src="/themes/web/assets/img/map-etra.svg" width="873" height="401" alt="Mapa Mundi de Idiomas TraduzTudo" class="traduztudo-map-base" loading="lazy">
        <a href="/traducao-juramentada-na-argentina" class="arg" title="Tradução Juramentada na Argentina">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-argentina.svg" width="52" height="52" alt="Argentina">
        </a>
        <a href="/traducao-de-portugues" class="br" title="Tradução Português">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-brazil.svg" width="52" height="52" alt="Brasil">
        </a>
        <a href="/traducao-certificada-canada" class="ca" title="Tradução Canadá">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-canada.svg" width="52" height="52" alt="Canadá">
        </a>
        <a href="/traducao-de-ingles" class="eua" title="Tradução Inglês (EUA)">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-united-states-of-america.svg" width="52" height="52" alt="EUA">
        </a>
        <a href="/traducao-de-espanhol" class="spa" title="Tradução Espanhol">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-spain.svg" width="52" height="52" alt="Espanha">
        </a>
        <a href="/traducao-de-noruegues" class="no" title="Tradução Norueguês">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-noruega.svg" width="52" height="52" alt="Noruega">
        </a>
        <a href="/traducao-certificada-na-inglaterra" class="uk" title="Tradução Inglês (UK)">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-inglaterra.svg" width="52" height="52" alt="Reino Unido">
        </a>
        <a href="/traducao-frances" class="fr" title="Tradução Francês">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-france.svg" width="52" height="52" alt="França">
        </a>
        <a href="/traducao-de-holandes" class="nl" title="Tradução Holandês">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-holanda.svg" width="32" height="32" alt="Holanda">
        </a>
        <a href="/traducao-de-alemao" class="de" title="Tradução Alemão">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-germany.svg" width="52" height="52" alt="Alemanha">
        </a>
        <a href="/traducao-de-italiano" class="ita" title="Tradução Italiano">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-italy.svg" width="52" height="52" alt="Itália">
        </a>
        <a href="/traducao-russo" class="rus" title="Tradução Russo">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-russia.svg" width="52" height="52" alt="Rússia">
        </a>
        <a href="/traducao-mandarim" class="ch" title="Tradução Mandarim">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-china.svg" width="52" height="52" alt="China">
        </a>
        <a href="/traducao-certificada-naati" class="au" title="Tradução Austrália">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-australia.svg" width="52" height="52" alt="Austrália">
        </a>
        <a href="/traducao-juramentada-coreano" class="ko" title="Tradução Coreano">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-coreia-do-sul.svg" width="52" height="52" alt="Coreia do Sul">
        </a>
        <a href="/traducao-de-japones" class="ja" title="Tradução Japonês">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-japao.svg" width="52" height="52" alt="Japão">
        </a>
        <a href="/traducao-juramentada-arabe" class="ar" title="Tradução Árabe">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-arabia.svg" width="52" height="52" alt="Árabe">
        </a>
        <a href="/traducao-juramentada-hebraico" class="he" title="Tradução Hebraico">
          <img class="btn-hover shadow-pulse" src="/themes/web/assets/img/icon-israel.svg" width="32" height="32" alt="Israel">
        </a>
      </div>
    </div>

  </div>
</section>

<!-- SECTION 3: APOSTILAMENTO DE HAIA -->
<section class="modern-apostille-section">
  <div class="container">
    <div class="modern-apostille-card">
      <div class="row align-items-center">
        <div class="col-lg-5 text-center">
          <div class="modern-apostille-img-wrapper">
            <img class="lazyload modern-apostille-img" alt="Ilustração Apostila de Haia TraduzTudo" width="480" height="277" src="/img/apostilamento-de-haia.png">
          </div>
        </div>
        <div class="col-lg-7">
          <div class="modern-apostille-content">
            <span class="modern-section-badge"><i class="fas fa-balance-scale"></i> CONVENÇÃO DA HAIA • CARTÓRIO CNJ</span>
            <h2 class="modern-apostille-title">Apostilamento de Haia Oficial com Validade em +120 Países</h2>
            <p class="modern-apostille-desc">
              Vai apresentar seus documentos no exterior? O apostilamento confere validade jurídica internacional aos seus documentos emitidos no Brasil. A TraduzTudo entrega suas traduções e certidões apostiladas por Cartório autorizado pelo CNJ (Conselho Nacional de Justiça).
            </p>
            <div class="modern-apostille-checklist">
              <div class="modern-check-item"><i class="fas fa-check-circle"></i> <span>Reconhecimento oficial perante a Convenção de Haia</span></div>
              <div class="modern-check-item"><i class="fas fa-check-circle"></i> <span>Indispensável para Cidadania Italiana, Portuguesa e Espanhola</span></div>
              <div class="modern-check-item"><i class="fas fa-check-circle"></i> <span>Válido para imigração, vistos consulares e estudos no exterior</span></div>
              <div class="modern-check-item"><i class="fas fa-check-circle"></i> <span>Processo 100% online com envio seguro e rastreável</span></div>
            </div>
            <div class="modern-apostille-actions">
              <a href="/apostilamento-de-haia" class="modern-btn-primary"><i class="fas fa-file-signature"></i> Solicitar Apostilamento</a>
              <a href="javascript:void(0)" class="modern-btn-secondary wpp-btn-trigger"><i class="fab fa-whatsapp"></i> Tirar Dúvidas</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 4: COMO FUNCIONA -->
<section class="modern-steps-section">
  <div class="container">
    <div class="modern-section-header text-center">
      <span class="modern-section-badge"><i class="fas fa-tasks"></i> FLUXO 100% ONLINE E TRANSPARENTE</span>
      <h2 class="modern-section-title">Como Funciona seu Pedido em 4 Passos</h2>
      <p class="modern-section-desc">Da cotação à entrega oficial, um processo ágil, desburocratizado e seguro.</p>
    </div>

    <div class="modern-steps-grid">
      <div class="modern-step-card">
        <div class="modern-step-number">01</div>
        <div class="modern-step-icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <h3>Envio dos Documentos</h3>
        <p>Envie fotos ou PDFs dos seus documentos através do formulário ou diretamente pelo WhatsApp.</p>
      </div>

      <div class="modern-step-card">
        <div class="modern-step-number">02</div>
        <div class="modern-step-icon"><i class="fas fa-calculator"></i></div>
        <h3>Cotação Instantânea</h3>
        <p>Nossa equipe analisa a contagem de laudas e apresenta o orçamento exato com o menor prazo do mercado.</p>
      </div>

      <div class="modern-step-card">
        <div class="modern-step-number">03</div>
        <div class="modern-step-icon"><i class="fas fa-stamp"></i></div>
        <h3>Tradução com Fé Pública</h3>
        <p>Tradutores juramentados matriculados realizam a tradução oficial com assinatura digital ICP-Brasil e carimbo.</p>
      </div>

      <div class="modern-step-card">
        <div class="modern-step-number">04</div>
        <div class="modern-step-icon"><i class="fas fa-paper-plane"></i></div>
        <h3>Entrega Rápida</h3>
        <p>Receba a versão digital por e-mail com QR Code de validação e a via física expressa entregue onde você preferir.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 5: O QUE TRADUZIMOS -->
<section id="howtranslate" class="modern-docs-section">
  <div class="container">
    <div class="modern-section-header text-center">
      <span class="modern-section-badge"><i class="fas fa-folder-open"></i> CATEGORIAS DE SERVIÇOS</span>
      <h2 class="modern-section-title">Quais Documentos Traduzimos</h2>
      <p class="modern-section-desc">Expertise jurídica, técnica e acadêmica em todos os segmentos da tradução oficial.</p>
    </div>

    <div class="type-content-height">
      <h3 class="title-sm" style="margin-top: 40px; margin-bottom: 24px;">Traduções Juramentadas no Brasil</h3>
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-passport.svg" width="56" height="56" alt="Cidadania Italiana" loading="lazy">
            <h4>Cidadania Italiana</h4>
            <p>Tradução Juramentada Italiano para processos de Cidadania Italiana e AIRE, além de Apostila de Haia.</p>
            <a href="/traducao-juramentada-para-cidadania-italiana" title="Saiba mais" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-award.svg" width="56" height="56" alt="Acadêmico" loading="lazy">
            <h4>Acadêmico</h4>
            <p>Traduções de Diplomas, Históricos Escolares, Artigos e Acadêmicos, TCC, Resumos Abstracts e Monografias.</p>
            <a href="/traducao-academica" title="Saiba mais" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-carteira-de-motorista.svg" width="56" height="56" alt="Documentos Pessoais" loading="lazy">
            <h4>Documentos Pessoais</h4>
            <p>Traduções Juramentadas de Autorização de Viagem, Carteira de Motorista - CNH, Carteira de Vacinação e Currículo.</p>
            <a href="/traducao-de-documentos" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-file.svg" width="56" height="56" alt="Certidões" loading="lazy">
            <h4>Certidões</h4>
            <p>Traduções Juramentadas de Certidões de Nascimento, Casamento, Óbito e Antecedentes Criminais.</p>
            <a href="/traducao-juramentada-de-certidoes" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
      </div>

      <h3 class="title-sm" style="margin-top: 50px; margin-bottom: 24px;">Traduções Certificadas e Juramentadas no Mundo</h3>
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/eua.svg" width="56" height="56" alt="Estados Unidos" loading="lazy">
            <h4>Estados Unidos</h4>
            <p>Tradução feita nos EUA por tradutor certificado pela ATA (Associação Americana de Tradutores)</p>
            <a href="/traducao-certificada-nos-eua" title="Saiba mais" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/canada.svg" width="56" height="56" alt="Canadá" loading="lazy">
            <h4>Canadá</h4>
            <p>Tradução feita no Canadá por tradutor certificado pela ATIO (Associação de Tradutores de Ontário)</p>
            <a href="/traducao-certificada-canada" title="Saiba mais" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/australia.svg" width="56" height="56" alt="Austrália" loading="lazy">
            <h4>Austrália</h4>
            <p>Tradução feita na Austrália por tradutor certificado pela NAATI (Autoridade Nacional de Tradutores)</p>
            <a href="/traducao-certificada-naati" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/inglaterra.svg" width="56" height="56" alt="Inglaterra" loading="lazy">
            <h4>Inglaterra</h4>
            <p>Tradução feita na Inglaterra por tradutor certificado pelo ITI (Instituto de Tradução e Interpretação)</p>
            <a href="/traducao-certificada-na-inglaterra" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
      </div>

      <h3 class="title-sm" style="margin-top: 50px; margin-bottom: 24px;">Traduções Técnicas Especializadas</h3>
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-law.svg" width="56" height="56" alt="Jurídico" loading="lazy">
            <h4>Jurídico</h4>
            <p>Traduções Técnicas de Contratos, Laudos, Processos, Estatutos, Comprovantes, Regulamentos e Leis.</p>
            <a href="/traducao-tecnica" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-finances.svg" width="56" height="56" alt="Financeiro" loading="lazy">
            <h4>Financeiro</h4>
            <p>Traduções Técnicas de Documentos Fiscais, Bancários, Patentes, Propostas, Auditorias e Balancetes.</p>
            <a href="/traducao-tecnica" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-technical.svg" width="56" height="56" alt="Documentos Técnicos" loading="lazy">
            <h4>Documentos Técnicos</h4>
            <p>Traduções Técnicas de Manuais, Bulas, Especificações, Normas Técnicas, Licitações e Relatórios.</p>
            <a href="/traducao-tecnica" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="type-content">
            <img class="type-icon-img" src="/themes/web/assets/img/type-contract.svg" width="56" height="56" alt="Empresarial" loading="lazy">
            <h4>Empresarial</h4>
            <p>Traduções Técnicas de Especificações, Embalagens de Produtos, Comunicações Internas e Propostas.</p>
            <a href="/traducao-tecnica" class="btn btn-blue-light-outline radius">Saiba mais</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 6: BRIAN BOT & WHATSAPP INTERACTION -->
<section class="modern-brian-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <div class="modern-brian-content">
          <span class="modern-section-badge"><i class="fab fa-whatsapp"></i> ATENDIMENTO INTELIGENTE</span>
          <h2 class="modern-section-title">Orçamento Instantâneo com a TraduzTudo</h2>
          <p class="modern-section-desc">
            Tornamos rápido e intuitivo solicitar informações e cotações de serviços de traduções juramentadas e apostilamentos.
          </p>
          <ul class="modern-brian-points">
            <li><i class="fas fa-check"></i> Orçamentos apresentados em poucos minutos.</li>
            <li><i class="fas fa-check"></i> Atendimento personalizado por WhatsApp ou e-mail.</li>
            <li><i class="fas fa-check"></i> Melhores prazos e valores transparentes sem taxas ocultas.</li>
          </ul>
          <div class="modern-brian-actions">
            <a href="javascript:void(0)" class="modern-btn-primary wpp-btn-trigger"><i class="fab fa-whatsapp"></i> Iniciar Conversa no WhatsApp</a>
            <a href="/orcamento-traducoes" class="modern-btn-secondary"><i class="fas fa-calculator"></i> Simular no Site</a>
          </div>
        </div>
      </div>
      <div class="col-lg-6 text-center">
        <div class="modern-phone-wrapper">
          <img class="lazyload modern-phone-mockup" src="/img/whatsapp-conversa-brian.webp" alt="Conversa com o Brian no WhatsApp TraduzTudo" width="480" height="608">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 7: GOOGLE REVIEWS -->
<section class="modern-reviews-section">
  <div class="container">
    <div class="modern-section-header text-center">
      <span class="modern-section-badge"><i class="fab fa-google"></i> AVALIAÇÕES GOOGLE VERIFICADAS</span>
      <h2 class="modern-section-title">O Que Nossos Clientes Dizem</h2>
      <p class="modern-section-desc">⭐ 4.9 de 5 baseado em mais de 1.500 avaliações autênticas no Google Meu Negócio.</p>
    </div>

    <div class="row">
      <div class="col-md-6 col-lg-4">
        <div class="references modern-review-card">
          <div class="modern-review-top">
            <img class="ref-avatar" src="https://lh3.googleusercontent.com/a/ACg8ocLwJoiVq466-oqjqj__sz2kdJ26RwnJvfYHiqVF8Hj03EunWw=s1920-c-rp-mo-ba12-br100" alt="Beatriz V. Prado" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='/themes/web/assets/img/review-1.webp'">
            <div>
              <span class="title-reference">Beatriz V. Prado</span>
              <div class="ref-stars" role="img" aria-label="5 de 5 estrelas">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
            </div>
            <img class="modern-google-icon" src="/themes/web/assets/img/google.svg" alt="Google" width="22" height="22">
          </div>
          <p class="ref-text">Desde o primeiro orçamento no site até o recebimento dos documentos traduzidos foi tudo perfeito. Atendimento nota 10 da equipe da TraduzTudo, super prestativos e pontuais. Recomendo de olhos fechados!</p>
          <div class="ref-foot">
            <span class="modern-review-date"><i class="fas fa-check-circle"></i> Cliente Verificada • 22 de setembro</span>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="references modern-review-card">
          <div class="modern-review-top">
            <img class="ref-avatar" src="https://lh3.googleusercontent.com/a-/ALV-UjW-gQDIU7kN-Kl4UfcBuvg-SMf8W8P96E7Tu5C3_HW8yjSVOQ3l=s1920-c-rp-mo-ba12-br100" alt="Carolina V. Nogueira" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='/themes/web/assets/img/review-1.webp'">
            <div>
              <span class="title-reference">Carolina V. Nogueira</span>
              <div class="ref-stars" role="img" aria-label="5 de 5 estrelas">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
            </div>
            <img class="modern-google-icon" src="/themes/web/assets/img/google.svg" alt="Google" width="22" height="22">
          </div>
          <p class="ref-text">Excelente atendimento da TraduzTudo! Documentos entregues antes do prazo previsto e com preço muito justo. Recomendo com certeza!</p>
          <div class="ref-foot">
            <span class="modern-review-date"><i class="fas fa-check-circle"></i> Cliente Verificada • 4 de agosto</span>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="references modern-review-card">
          <div class="modern-review-top">
            <img class="ref-avatar" src="https://lh3.googleusercontent.com/a-/ALV-UjVAhD4A2azCxD44HlmRUq77oqKdE_BMhKXChq5TrAPdB1omwA0V=s1920-c-rp-mo-br100" alt="Renata G. Oliveira" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='/themes/web/assets/img/review-1.webp'">
            <div>
              <span class="title-reference">Renata G. Oliveira</span>
              <div class="ref-stars" role="img" aria-label="5 de 5 estrelas">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
            </div>
            <img class="modern-google-icon" src="/themes/web/assets/img/google.svg" alt="Google" width="22" height="22">
          </div>
          <p class="ref-text">Excelente experiência com a TraduzTudo! Profissionalismo exemplar e atendimento muito cuidadoso. Fiz a tradução juramentada e o apostilamento de Haia, tudo entregue perfeitamente com acompanhamento direto pelo WhatsApp. Muito satisfeita!</p>
          <div class="ref-foot">
            <span class="modern-review-date"><i class="fas fa-check-circle"></i> Cliente Verificada • 22 de setembro</span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center" style="margin-top: 32px">
      <a href="/avaliacoes" class="modern-btn-secondary"><i class="fas fa-external-link-alt"></i> Ver todas as avaliações no Google</a>
    </div>
  </div>
</section>

<!-- SECTION 8: PRE-FOOTER CTA BANNER -->
<section class="modern-prefooter-section">
  <div class="container">
    <div class="modern-prefooter-box">
      <div class="modern-prefooter-ambient"></div>
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h2 class="modern-prefooter-title">Pronto para Traduzir seus Documentos com Validade Oficial?</h2>
          <p class="modern-prefooter-desc">Receba sua cotação personalizada em minutos ou tire todas as suas dúvidas diretamente com nossa equipe especializada.</p>
        </div>
        <div class="col-lg-4 text-lg-right text-center mt-4 mt-lg-0">
          <div class="modern-prefooter-buttons">
            <a href="/orcamento-traducoes" class="modern-btn-primary"><i class="fas fa-calculator"></i> Orçamento Instantâneo</a>
            <a href="javascript:void(0)" class="modern-btn-whatsapp wpp-btn-trigger"><i class="fab fa-whatsapp"></i> Chamar no WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

export default function HomePage() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Intercept quote form in hero
    const form = document.querySelector('.request form') as HTMLFormElement | null;
    const fileInput = document.getElementById('docs') as HTMLInputElement | null;
    const dropzoneBox = document.getElementById('dropzone-box') || document.querySelector('.modern-dropzone-compact');
    const dropzoneIcon = document.getElementById('dropzone-icon') || dropzoneBox?.querySelector('.modern-dropzone-icon');
    const dropzoneTitle = document.getElementById('dropzone-title') || dropzoneBox?.querySelector('strong');
    const dropzoneSubtitle = document.getElementById('dropzone-subtitle') || dropzoneBox?.querySelector('span');
    const filesContainer = document.getElementById('attached-files-container');
    const phoneInput = document.getElementById('whatsapp') as HTMLInputElement | null;
    const submitBtn = form?.querySelector('.modern-submit-btn') as HTMLButtonElement | null;

    let attachedFiles: File[] = [];

    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getFileIconConfig = (fileName: string) => {
      const ext = fileName.split('.').pop()?.toLowerCase() || '';
      if (['pdf'].includes(ext)) {
        return { icon: 'fas fa-file-pdf', colorClass: 'is-pdf' };
      }
      if (['doc', 'docx', 'odt', 'rtf', 'txt'].includes(ext)) {
        return { icon: 'fas fa-file-word', colorClass: 'is-word' };
      }
      if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp', 'tiff'].includes(ext)) {
        return { icon: 'fas fa-file-image', colorClass: 'is-image' };
      }
      return { icon: 'fas fa-file-alt', colorClass: 'is-generic' };
    };

    const syncFileInput = () => {
      if (!fileInput) return;
      try {
        const dt = new DataTransfer();
        attachedFiles.forEach((file) => dt.items.add(file));
        fileInput.files = dt.files;
      } catch (err) {
        console.warn('DataTransfer sync notice:', err);
      }
    };

    const renderFilesList = () => {
      if (!filesContainer || !dropzoneBox) return;

      if (attachedFiles.length === 0) {
        filesContainer.style.display = 'none';
        filesContainer.innerHTML = '';
        dropzoneBox.classList.remove('has-files');
        if (dropzoneIcon) {
          dropzoneIcon.className = 'fas fa-cloud-upload-alt modern-dropzone-icon';
          (dropzoneIcon as HTMLElement).style.color = '';
        }
        if (dropzoneTitle) {
          dropzoneTitle.textContent = 'Clique ou arraste documentos para anexar';
        }
        if (dropzoneSubtitle) {
          dropzoneSubtitle.textContent = 'PDF, Word, JPG ou PNG (até 1 GB)';
        }
        return;
      }

      // Display attached files
      filesContainer.style.display = 'flex';
      dropzoneBox.classList.add('has-files');
      if (dropzoneIcon) {
        dropzoneIcon.className = 'fas fa-check-circle modern-dropzone-icon';
        (dropzoneIcon as HTMLElement).style.color = '#10b981';
      }
      if (dropzoneTitle) {
        dropzoneTitle.textContent = `✓ ${attachedFiles.length} documento${attachedFiles.length > 1 ? 's' : ''} anexado${attachedFiles.length > 1 ? 's' : ''}`;
      }
      if (dropzoneSubtitle) {
        dropzoneSubtitle.textContent = 'Clique ou arraste para adicionar mais documentos';
      }

      let html = '';
      attachedFiles.forEach((file, index) => {
        const { icon, colorClass } = getFileIconConfig(file.name);
        const sizeFormatted = formatFileSize(file.size);
        html += `
          <div class="modern-attached-file-item" data-index="${index}">
            <div class="modern-attached-file-left">
              <div class="modern-attached-file-icon ${colorClass}">
                <i class="${icon}"></i>
              </div>
              <div class="modern-attached-file-details">
                <span class="modern-attached-file-name" title="${file.name}">${file.name}</span>
                <span class="modern-attached-file-meta">
                  <span>${sizeFormatted}</span>
                  <span class="badge-ready"><i class="fas fa-check"></i> Anexado</span>
                </span>
              </div>
            </div>
            <button type="button" class="modern-attached-file-remove" data-remove-index="${index}" title="Remover este arquivo" aria-label="Remover ${file.name}">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
      });

      filesContainer.innerHTML = html;

      // Event listeners for remove buttons
      const removeButtons = filesContainer.querySelectorAll('.modern-attached-file-remove');
      removeButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetIndex = Number((btn as HTMLElement).getAttribute('data-remove-index'));
          if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < attachedFiles.length) {
            const removedName = attachedFiles[targetIndex].name;
            attachedFiles.splice(targetIndex, 1);
            syncFileInput();
            renderFilesList();
            toast.success(`Arquivo "${removedName}" removido.`);
          }
        });
      });
    };

    const handleAddFiles = (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) return;
      const incomingList = Array.from(newFiles);
      let countAdded = 0;

      incomingList.forEach((file) => {
        const exists = attachedFiles.some((f) => f.name === file.name && f.size === file.size);
        if (!exists) {
          attachedFiles.push(file);
          countAdded++;
        }
      });

      if (countAdded > 0) {
        syncFileInput();
        renderFilesList();
        toast.success(
          countAdded === 1
            ? `✓ Documento anexado com sucesso!`
            : `✓ ${countAdded} documentos anexados com sucesso!`,
          { duration: 4000 }
        );
      }
    };

    const handleFileInputChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleAddFiles(target.files);
      }
    };

    if (fileInput) {
      fileInput.addEventListener('change', handleFileInputChange);
    }

    // Drag & drop handlers
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropzoneBox?.classList.add('is-dragover');
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropzoneBox?.classList.remove('is-dragover');
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropzoneBox?.classList.remove('is-dragover');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleAddFiles(e.dataTransfer.files);
      }
    };

    if (dropzoneBox) {
      dropzoneBox.addEventListener('dragover', handleDragOver as EventListener);
      dropzoneBox.addEventListener('dragleave', handleDragLeave as EventListener);
      dropzoneBox.addEventListener('drop', handleDrop as EventListener);
    }

    // Phone mask
    const handlePhoneInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      let val = target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      if (val.length > 6) {
        target.value = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
      } else if (val.length > 2) {
        target.value = `(${val.slice(0, 2)}) ${val.slice(2)}`;
      } else if (val.length > 0) {
        target.value = `(${val}`;
      }
    };
    if (phoneInput) {
      phoneInput.addEventListener('input', handlePhoneInput);
    }

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (!form) return;

      const formData = new FormData(form);
      const fullName = (formData.get('full_name') as string)?.trim() || '';
      const email = (formData.get('email') as string)?.trim() || '';
      const whatsapp = (formData.get('wpp') as string)?.trim() || '';
      const serviceType = (formData.get('type_service') as string) || 'trad';
      const sourceLang = (formData.get('source_lang') as string) || 'Português';
      const targetLang = (formData.get('target_lang') as string) || 'Inglês';

      if (!fullName || !email || !whatsapp) {
        toast.error('Por favor, preencha seu nome, e-mail e WhatsApp para receber o orçamento.');
        return;
      }

      const cleanPhone = whatsapp.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        toast.error('Por favor, informe um WhatsApp válido com DDD.');
        phoneInput?.focus();
        return;
      }

      setSubmitting(true);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando solicitação...</span> <i class="fas fa-spinner fa-spin"></i>`;
      }

      const attachedData = await readFilesAsAttachments(attachedFiles);
      const fileNames: string[] = attachedData.map((f) => f.name);
      const serviceLabels: Record<string, string> = {
        trad: 'Tradução Juramentada / Oficial',
        apostille: 'Apostilamento de Haia',
        certificada: 'Tradução Certificada Internacional',
        tecnica: 'Tradução Técnica & Empresarial',
      };
      const serviceLabel = serviceLabels[serviceType] || 'Tradução de Documentos';

      try {
        await createQuote({
          fullName,
          email,
          whatsapp,
          serviceType: serviceLabel,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          fileNames,
          files: attachedData,
          notes: [
            `Idiomas: ${sourceLang} → ${targetLang}`,
            fileNames.length > 0
              ? `Solicitação via Hero da Home. Documentos anexados (${fileNames.length}): ${fileNames.join(', ')}`
              : `Solicitação via Hero da Home sem documentos anexados inicialmente.`,
          ].join('\n'),
        });

        toast.success(
          fileNames.length > 0
            ? `Orçamento solicitado com sucesso! Recebemos seus ${fileNames.length} documento(s).`
            : 'Orçamento solicitado com sucesso! Entraremos em contato em instantes.',
          { duration: 6000 }
        );

        // Pre-fill WhatsApp and open in new tab
        const docsMsg = fileNames.length > 0 ? `\n📄 Documentos anexados: ${fileNames.join(', ')}` : '';
        const text = encodeURIComponent(
          `Olá! Meu nome é ${fullName}. Acabei de solicitar um orçamento no site para ${serviceLabel} (${sourceLang} para ${targetLang}).${docsMsg}\nGostaria de agilizar o atendimento!`
        );
        setTimeout(() => {
          window.open(`https://wa.me/5511982854183?text=${text}`, '_blank');
        }, 1200);

        form.reset();
        attachedFiles = [];
        syncFileInput();
        renderFilesList();
      } catch (err) {
        console.error('Error submitting quote:', err);
        toast.error('Erro ao enviar pedido. Tente novamente ou nos chame no WhatsApp: (11) 98285-4183');
      } finally {
        setSubmitting(false);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Calcular Preço e Prazo Agora</span> <i class="fas fa-arrow-right"></i>`;
        }
      }
    };

    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    // WhatsApp trigger buttons
    const wppButtons = document.querySelectorAll('.wpp-btn-trigger');
    const handleWppClick = (e: Event) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-brian-chat'));
    };
    wppButtons.forEach((btn) => btn.addEventListener('click', handleWppClick));

    // Smooth scroll for anchors
    const scrollLinks = document.querySelectorAll('.go_to');
    const handleScroll = function(this: Element, e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const el = document.querySelector(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    scrollLinks.forEach((link) => link.addEventListener('click', handleScroll));

    return () => {
      form?.removeEventListener('submit', handleSubmit);
      fileInput?.removeEventListener('change', handleFileInputChange);
      if (dropzoneBox) {
        dropzoneBox.removeEventListener('dragover', handleDragOver as EventListener);
        dropzoneBox.removeEventListener('dragleave', handleDragLeave as EventListener);
        dropzoneBox.removeEventListener('drop', handleDrop as EventListener);
      }
      phoneInput?.removeEventListener('input', handlePhoneInput);
      wppButtons.forEach((btn) => btn.removeEventListener('click', handleWppClick));
      scrollLinks.forEach((link) => link.removeEventListener('click', handleScroll));
    };
  }, []);

  return (
    <>
      <div className="home-brand-banner">
        <Image
          src="/img/traduztudo-banner-principal.png"
          alt="TraduzTudo: tradução juramentada com alcance internacional"
          width={1024}
          height={440}
          priority
          unoptimized
          sizes="100vw"
          className="home-brand-banner-image"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
