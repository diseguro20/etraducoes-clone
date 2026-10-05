const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const pageFile = path.join(projectRoot, 'src/app/page.tsx');
let pageContent = fs.readFileSync(pageFile, 'utf8');

// 1. Update the Map section in src/app/page.tsx
const oldMapSectionRegex = /<!-- World Map with Country Flags[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const newMapSection = `<!-- World Map with Country Flags (Perfeito em Desktop e Mobile) -->
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

    <!-- Quick language chips below map -->
    <div class="modern-network-hub">
      <div class="modern-network-hub-header">
        <span class="modern-badge-pulse"></span>
        <span>ATENDIMENTO OFICIAL EM MAIS DE 15 IDIOMAS NATIVOS</span>
      </div>
      <div class="modern-lang-chips">
        <a href="/traducao-de-ingles" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-united-states-of-america.svg" width="22" height="22" alt="EUA"> <div><strong>Inglês</strong><span>EUA / UK</span></div></a>
        <a href="/traducao-de-espanhol" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-spain.svg" width="22" height="22" alt="Espanha"> <div><strong>Espanhol</strong><span>América Latina</span></div></a>
        <a href="/traducao-de-italiano" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-italy.svg" width="22" height="22" alt="Itália"> <div><strong>Italiano</strong><span>Cidadania</span></div></a>
        <a href="/traducao-frances" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-france.svg" width="22" height="22" alt="França"> <div><strong>Francês</strong><span>França / Canadá</span></div></a>
        <a href="/traducao-de-alemao" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-germany.svg" width="22" height="22" alt="Alemanha"> <div><strong>Alemão</strong><span>Alemanha</span></div></a>
        <a href="/traducao-mandarim" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-china.svg" width="22" height="22" alt="China"> <div><strong>Mandarim</strong><span>China</span></div></a>
        <a href="/traducao-de-japones" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-japao.svg" width="22" height="22" alt="Japão"> <div><strong>Japonês</strong><span>Japão</span></div></a>
        <a href="/traducao-de-portugues" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-brazil.svg" width="22" height="22" alt="Brasil"> <div><strong>Português</strong><span>Fé Pública</span></div></a>
        <a href="/traducao-russo" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-russia.svg" width="22" height="22" alt="Rússia"> <div><strong>Russo</strong><span>Leste Europeu</span></div></a>
        <a href="/traducao-juramentada-coreano" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-coreia-do-sul.svg" width="22" height="22" alt="Coreia"> <div><strong>Coreano</strong><span>Juramentado</span></div></a>
        <a href="/traducao-juramentada-arabe" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-arabia.svg" width="22" height="22" alt="Árabe"> <div><strong>Árabe</strong><span>Oriente Médio</span></div></a>
        <a href="/traducao-de-noruegues" class="modern-lang-chip"><img src="/themes/web/assets/img/icon-noruega.svg" width="22" height="22" alt="Noruega"> <div><strong>Norueguês</strong><span>Escandinávia</span></div></a>
      </div>
    </div>
  </div>
</section>`;

if (oldMapSectionRegex.test(pageContent)) {
  pageContent = pageContent.replace(oldMapSectionRegex, newMapSection);
  console.log('[OK] Map section replaced in src/app/page.tsx');
} else {
  console.log('[WARN] oldMapSectionRegex did not match directly, checking fallback...');
  const marker = '<div class="img-map-container"';
  const endMarker = '<!-- SECTION 3: APOSTILAMENTO DE HAIA -->';
  const startIdx = pageContent.indexOf(marker);
  const endIdx = pageContent.indexOf(endMarker);
  if (startIdx !== -1 && endIdx !== -1) {
    pageContent = pageContent.substring(0, startIdx) + newMapSection + '\n\n' + pageContent.substring(endIdx);
    console.log('[OK] Map section replaced via index slice');
  } else {
    console.log('[ERROR] Could not find markers for map section');
  }
}

// 2. Make form fields in Hero more compact ("Nome" instead of "Nome completo")
pageContent = pageContent.replace(
  /<label for="name" class="modern-input-label">\s*<i class="far fa-user"><\/i> Nome completo\s*<\/label>/,
  '<label for="name" class="modern-input-label"><i class="far fa-user"></i> Nome</label>'
);
pageContent = pageContent.replace(
  /placeholder="Seu nome completo"/,
  'placeholder="Seu nome"'
);

fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('[DONE] page.tsx updated successfully');
