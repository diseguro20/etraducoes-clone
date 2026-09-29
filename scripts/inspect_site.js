const fs = require('fs');

async function inspectFaq() {
  const res = await fetch('https://www.etraducoes.com.br/perguntas-frequentes');
  const html = await res.text();
  const accordionMatches = html.match(/class="[^"]*(?:accordion|faq|card|collapse|question)[^"]*"/gi) || [];
  console.log('Accordion/FAQ matches:', [...new Set(accordionMatches)].slice(0, 20));
  
  // Look for a question container snippet
  const snippetMatch = html.match(/<div class="faq_content[\s\S]*?<\/div>\s*<\/div>/i);
  if (snippetMatch) {
    console.log('Snippet:\n', snippetMatch[0].substring(0, 600));
  }
}

inspectFaq();
