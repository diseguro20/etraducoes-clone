const fs = require('fs');

const rawHtml = fs.readFileSync('scripts/deals_raw.html', 'utf8');

// Clean and transform rawHtml
let html = rawHtml;

// 1. Replace logo
const oldLogoRegex = /<div class="deals_content_header_logo">\s*<a[\s\S]*?<\/a>\s*<\/div>/i;
const newLogo = `<div class="deals_content_header_logo">
    <a href="/" title="Voltar para página inicial" style="display:inline-flex;align-items:center;">
        <img src="/img/traduztudo-logo.svg" alt="TraduzTudo" class="traduztudo-logo-light" width="220" height="46" style="height:44px;width:auto;" />
        <img src="/img/traduztudo-logo-white.svg" alt="TraduzTudo" class="traduztudo-logo-dark" width="220" height="46" style="height:44px;width:auto;" />
    </a>
</div>`;
html = html.replace(oldLogoRegex, newLogo);

// 2. Replace login link
html = html.replace(/href="https:\/\/www\.etraducoes\.com\.br\/me\/login"/g, 'href="/me/login"');
html = html.replace(/href="https:\/\/etraducoes\.com\.br\/me\/login"/g, 'href="/me/login"');

// 3. Replace links and actions
html = html.replace(/href="https:\/\/www\.etraducoes\.com\.br\//g, 'href="/');
html = html.replace(/href="https:\/\/etraducoes\.com\.br\//g, 'href="/');
html = html.replace(/action="https:\/\/www\.etraducoes\.com\.br\/orcamento-traducoes"/g, 'action="/orcamento-traducoes"');
html = html.replace(/action="https:\/\/etraducoes\.com\.br\/orcamento-traducoes"/g, 'action="/orcamento-traducoes"');

// 4. Replace WhatsApp links
html = html.replace(/https?:\/\/wa\.me\/[+0-9]+/g, 'https://wa.me/5511982854183');

// 5. Replace branding
html = html.replace(/eTraduções/g, 'TraduzTudo');
html = html.replace(/ETRADUÇÕES/g, 'TRADUZTUDO');
html = html.replace(/eTraducoes/g, 'TraduzTudo');

// 6. Remove ld+json scripts from body string (we can put metadata in Next.js)
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

fs.writeFileSync('scripts/deals_clean.html', html, 'utf8');
console.log('Saved cleaned deals HTML! Length:', html.length);
