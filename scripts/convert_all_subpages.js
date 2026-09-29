const fs = require('fs');
const path = require('path');

const publicPages = [
  // 1. Language Pages
  'traducao-de-portugues',
  'traducao-de-ingles',
  'traducao-de-espanhol',
  'traducao-de-italiano',
  'traducao-frances',
  'traducao-russo',
  'traducao-mandarim',
  'traducao-de-alemao',
  'traducao-de-holandes',
  'traducao-de-noruegues',
  'traducao-de-hebraico',
  'traducao-de-arabe',
  'traducao-de-coreano',
  'traducao-de-japones',
  'traducao-de-romeno',
  'idiomas',

  // 2. Core Service Pages
  'traducao-juramentada',
  'traducao-certificada',
  'traducao-tecnica',
  'apostilamento-de-haia',
  'plataforma-de-traducao',

  // 3. Practice Areas
  'traducao-academica',
  'traducao-juramentada-para-casamento',
  'traducao-juramentada-de-certidoes',
  'traducao-juramentada-para-cidadania-italiana',
  'traducao-de-documentos',
  'traducao-para-intercambio',

  // 4. Certified Translations around the world
  'traducao-certificada-nos-eua',
  'traducao-certificada-canada',
  'traducao-certificada-naati',
  'traducao-certificada-na-inglaterra',
  'traducao-juramentada-na-espanha',
  'traducao-juramentada-na-argentina',
  'traducao-juramentada-na-alemanha',
  'traducao-juramentada-na-holanda',
  'traducao-juramentada-japones',
  'traducao-juramentada-coreano',
  'traducao-juramentada-arabe',
  'traducao-juramentada-hebraico',
  'traducao-juramentada-romeno',

  // 5. Agency / Location Pages
  'agencia-de-traducao-em-curitiba',
  'agencia-de-traducao-em-sao-paulo',
  'agencia-de-traducao-em-joinville',

  // 6. Institutional Pages
  'empresa-de-traducao',
  'sobre-nos',
  'avaliacoes',
  'contato',
  'perguntas-frequentes',
  'trabalhe-conosco',
  'programa-de-parceiros',
  'programa-de-afiliados',
  'politicas-de-privacidade',
  'termos-de-uso',
  'politicas-de-cookies',
  'etraducoes-e-confiavel'
];

async function ensureMotionSvg(name) {
  const dir = path.join('public', 'themes', 'web', 'components', 'motion');
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, name);
  if (!fs.existsSync(target)) {
    try {
      const res = await fetch('https://www.etraducoes.com.br/themes/web/components/motion/' + name);
      if (res.ok) {
        const text = await res.text();
        fs.writeFileSync(target, text, 'utf8');
        console.log('Downloaded motion SVG:', name);
      }
    } catch (e) {
      console.error('Error downloading SVG:', name, e.message);
    }
  }
}

async function convertPage(slug) {
  console.log(`Processing [${slug}]...`);
  try {
    const res = await fetch(`https://www.etraducoes.com.br/${slug}`);
    if (!res.ok) {
      console.warn(`Warning: failed to fetch ${slug} (${res.status})`);
      return false;
    }
    const html = await res.text();

    // 1. Title and Description
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1] : `${slug} | TraduzTudo`;
    title = title.replace(/eTraduções|eTraducoes/gi, 'TraduzTudo');

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
    let description = descMatch ? descMatch[1] : '';
    description = description.replace(/eTraduções|eTraducoes/gi, 'TraduzTudo');
    description = description.replace(/0800\s*604\s*2484/g, '(11) 98285-4183');

    // 2. Extract body between </header> and <footer
    const headerEnd = html.indexOf('</header>');
    const footerStart = html.indexOf('<footer');
    let body = '';

    if (headerEnd !== -1 && footerStart !== -1 && footerStart > headerEnd) {
      body = html.substring(headerEnd + 9, footerStart);
    } else {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      body = bodyMatch ? bodyMatch[1] : html;
    }

    // 3. Remove ajax loaders and modals that belong outside body
    body = body.replace(/<div class="ajax_load">[\s\S]*?<\/div>\s*<\/div>/gi, '');
    body = body.replace(/<div class="ajax_response"><\/div>/gi, '');
    body = body.replace(/<div class="app_modal">[\s\S]*?<\/div>\s*<\/div>/gi, '');

    // 4. Ensure data-src images have src attribute populated
    body = body.replace(/<img([^>]*?)data-src="([^"]+)"([^>]*?)>/gi, (match, before, url, after) => {
      if (before.includes('src=') || after.includes('src=')) {
        return `<img${before}src="${url}" data-src="${url}"${after}>`.replace(/src="[^"]*"/, `src="${url}"`);
      }
      return `<img${before}src="${url}" data-src="${url}"${after}>`;
    });

    // 5. Localize motion illustrations if applicable
    body = body.replace(/https:\/\/www\.etraducoes\.com\.br\/themes\/web\/components\/motion\/(ilustracao-(pt|en|es|it|fr|ru|cn|tecnica)\.svg)/g, '/themes/web/components/motion/$1');

    // 6. Fix internal links (preserve assets)
    body = body.replace(/href="https:\/\/www\.etraducoes\.com\.br\//g, 'href="/');
    body = body.replace(/href="https:\/\/etraducoes\.com\.br\//g, 'href="/');
    body = body.replace(/action="https:\/\/www\.etraducoes\.com\.br\//g, 'action="/');
    body = body.replace(/action="https:\/\/etraducoes\.com\.br\//g, 'action="/');
    body = body.replace(/data-select-post="https:\/\/www\.etraducoes\.com\.br\/"/g, 'data-select-post="/"');

    // 7. Contact replacements
    body = body.replace(/0800\s*604\s*24\s*84/g, '(11) 98285-4183');
    body = body.replace(/0800\s*604\s*2484/g, '(11) 98285-4183');
    body = body.replace(/08006042484/g, '11982854183');
    body = body.replace(/\+55\s*\(41\)\s*3017-5521/g, '(11) 98285-4183');
    body = body.replace(/\(41\)\s*3017-5521/g, '(11) 98285-4183');
    body = body.replace(/\(11\)\s*3231-1239/g, '(11) 98285-4183');
    body = body.replace(/contato@etraducoes\.com\.br/g, 'contato@traduztudo.com.br');
    body = body.replace(/tel:(?:0800\s*604\s*2484|08006042484|\+?554130175521|\+?551132311239)/g, 'tel:5511982854183');
    body = body.replace(/https?:\/\/wa\.me\/(?:55\d+)/g, 'https://wa.me/5511982854183');

    // 8. Branding replacement
    body = body.replace(/eTraduções/g, 'TraduzTudo');
    body = body.replace(/ETRADUÇÕES/g, 'TRADUZTUDO');
    body = body.replace(/eTraducoes/g, 'TraduzTudo');
    body = body.replace(/e-Traduções/g, 'TraduzTudo');

    // 9. Write target page.tsx
    const targetDir = path.join('src', 'app', slug);
    fs.mkdirSync(targetDir, { recursive: true });

    const pageTsx = `import type { Metadata } from 'next';
import OriginalPageTemplate from '@/components/layout/OriginalPageTemplate';

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

const bodyHtml = ${JSON.stringify(body)};

export default function Page() {
  return <OriginalPageTemplate html={bodyHtml} />;
}
`;

    fs.writeFileSync(path.join(targetDir, 'page.tsx'), pageTsx, 'utf8');
    console.log(`[${slug}] successfully generated (${pageTsx.length} bytes).`);
    return true;
  } catch (err) {
    console.error(`Error processing ${slug}:`, err.message);
    return false;
  }
}

async function main() {
  await ensureMotionSvg('ilustracao-cn.svg');

  let successCount = 0;
  for (const page of publicPages) {
    const ok = await convertPage(page);
    if (ok) successCount++;
  }
  console.log(`\nDONE! Converted ${successCount}/${publicPages.length} subpages.`);
}

main();
