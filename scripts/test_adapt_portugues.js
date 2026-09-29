const fs = require('fs');
const path = require('path');

async function run() {
  const slug = 'traducao-de-portugues';
  console.log('Fetching', slug);
  const res = await fetch(`https://www.etraducoes.com.br/${slug}`);
  const html = await res.text();

  // Extract title and description
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1] : 'Tradução de Português | TraduzTudo';
  title = title.replace(/eTraduções|eTraducoes/gi, 'TraduzTudo');

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  let description = descMatch ? descMatch[1] : '';
  description = description.replace(/eTraduções|eTraducoes/gi, 'TraduzTudo');

  // Extract body between </header> and <footer
  const headerEnd = html.indexOf('</header>');
  const footerStart = html.indexOf('<footer');
  if (headerEnd === -1 || footerStart === -1) {
    console.error('Could not find header or footer');
    return;
  }

  let body = html.substring(headerEnd + 9, footerStart);

  // 1. Convert data-src to src
  body = body.replace(/<img([^>]*?)data-src="([^"]+)"([^>]*?)>/gi, (match, before, url, after) => {
    if (before.includes('src=') || after.includes('src=')) {
      return `<img${before}src="${url}" data-src="${url}"${after}>`.replace(/src="[^"]*"/, `src="${url}"`);
    }
    return `<img${before}src="${url}" data-src="${url}"${after}>`;
  });

  // 2. Localize motion SVGs if downloaded
  body = body.replace(/https:\/\/www\.etraducoes\.com\.br\/themes\/web\/components\/motion\/(ilustracao-(pt|en|es|it|fr|ru|tecnica)\.svg)/g, '/themes/web/components/motion/$1');

  // 3. Links replacement (only internal links, preserve assets)
  body = body.replace(/href="https:\/\/www\.etraducoes\.com\.br\//g, 'href="/');
  body = body.replace(/href="https:\/\/etraducoes\.com\.br\//g, 'href="/');
  body = body.replace(/action="https:\/\/www\.etraducoes\.com\.br\//g, 'action="/');
  body = body.replace(/action="https:\/\/etraducoes\.com\.br\//g, 'action="/');
  body = body.replace(/data-select-post="https:\/\/www\.etraducoes\.com\.br\/"/g, 'data-select-post="/"');

  // 4. Phone & Contact replacement
  body = body.replace(/0800\s*604\s*24\s*84/g, '(11) 98285-4183');
  body = body.replace(/0800\s*604\s*2484/g, '(11) 98285-4183');
  body = body.replace(/08006042484/g, '11982854183');
  body = body.replace(/\+55\s*\(41\)\s*3017-5521/g, '(11) 98285-4183');
  body = body.replace(/\(41\)\s*3017-5521/g, '(11) 98285-4183');
  body = body.replace(/\(11\)\s*3231-1239/g, '(11) 98285-4183');
  body = body.replace(/contato@etraducoes\.com\.br/g, 'contato@traduztudo.com.br');
  body = body.replace(/tel:(?:0800\s*604\s*2484|08006042484|\+?554130175521)/g, 'tel:5511982854183');
  body = body.replace(/https?:\/\/wa\.me\/(?:55\d+)/g, 'https://wa.me/5511982854183');

  // 5. Branding replacement in text (do not replace in asset URLs)
  // We can safely replace eTraduções and ETRADUÇÕES
  body = body.replace(/eTraduções/g, 'TraduzTudo');
  body = body.replace(/ETRADUÇÕES/g, 'TRADUZTUDO');
  body = body.replace(/eTraducoes/g, 'TraduzTudo');
  body = body.replace(/e-Traduções/g, 'TraduzTudo');

  // Generate page content
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

  const targetPath = path.join('src', 'app', slug, 'page.tsx');
  fs.writeFileSync(targetPath, pageTsx, 'utf8');
  console.log('Successfully written to', targetPath, 'length:', pageTsx.length);
}

run();
