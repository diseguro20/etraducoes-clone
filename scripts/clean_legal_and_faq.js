const fs = require('fs');

// politicas-de-privacidade
let priv = fs.readFileSync('src/app/politicas-de-privacidade/page.tsx', 'utf8');
priv = priv.replace(/juridico@grupoferrara\.com\.br/g, 'juridico@traduztudo.com.br');
priv = priv.replace(/dpo@grupoferrara\.com\.br/g, 'dpo@traduztudo.com.br');
fs.writeFileSync('src/app/politicas-de-privacidade/page.tsx', priv, 'utf8');
console.log('Updated politicas-de-privacidade');

// politicas-de-cookies
let cookies = fs.readFileSync('src/app/politicas-de-cookies/page.tsx', 'utf8');
cookies = cookies.replace(/juridico@grupoferrara\.com\.br/g, 'juridico@traduztudo.com.br');
cookies = cookies.replace(/dpo@grupoferrara\.com\.br/g, 'dpo@traduztudo.com.br');
fs.writeFileSync('src/app/politicas-de-cookies/page.tsx', cookies, 'utf8');
console.log('Updated politicas-de-cookies');

// cidadania italiana & traducao tecnica
['src/app/traducao-juramentada-para-cidadania-italiana/page.tsx', 'src/app/traducao-tecnica/page.tsx'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/title=\\"Conhecer AIUTA\\">Conhecer AIUTA<\/a>/g, 'title=\\"Conhecer Plataforma TraduzTudo\\">Conhecer Plataforma TraduzTudo</a>');
  content = content.replace(/alt=\\"Cotação inteligente AIUTA\\"/g, 'alt=\\"Cotação inteligente TraduzTudo\\"');
  fs.writeFileSync(f, content, 'utf8');
  console.log('Updated ' + f);
});

// perguntas-frequentes
let faq = fs.readFileSync('src/app/perguntas-frequentes/page.tsx', 'utf8');
// remove youtube link in FAQ
faq = faq.replace(/<p><a href=\\"https:\/\/www\.youtube\.com\/watch\?v=kyzk3o1Snl8\\" target=\\"_blank\\" rel=\\"noopener\\">https:\/\/www\.youtube\.com\/watch\?v=kyzk3o1Snl8<\/a><\/p>/g, '');
faq = faq.replace(/class=\\"go_to faq_16\\">AIUTA<\/a>/g, 'class=\\"go_to faq_16\\">Plataforma TraduzTudo</a>');
faq = faq.replace(/<h2 class=\\"title-md\\">AIUTA<\/h2>/g, '<h2 class=\\"title-md\\">Plataforma TraduzTudo</h2>');
faq = faq.replace(/<p itemprop=\\"name\\">O que é a AIUTA\?<\/p>/g, '<p itemprop=\\"name\\">O que é a Plataforma TraduzTudo?</p>');
faq = faq.replace(/AIUTA é uma plataforma de tradução para empresas/g, 'A Plataforma TraduzTudo é a nossa tecnologia de ponta para empresas');
faq = faq.replace(/<p itemprop=\\"name\\">Quem pode usar a AIUTA\?<\/p>/g, '<p itemprop=\\"name\\">Quem pode usar a Plataforma TraduzTudo?</p>');
faq = faq.replace(/Também podem usar a AIUTA tradutores/g, 'Também podem usar a TraduzTudo parceiros, tradutores');
faq = faq.replace(/<p itemprop=\\"name\\">Qual a diferença entre a TraduzTudo e a AIUTA\?<\/p>/g, '<p itemprop=\\"name\\">Qual a diferença entre atendimento avulso e a Plataforma Corporativa?</p>');
faq = faq.replace(/Já a AIUTA é uma plataforma com ferramentas de gerenciamento/g, 'Já a nossa Plataforma Corporativa é voltada para faturamento mensal e gestão integrada');
faq = faq.replace(/<p itemprop=\\"name\\">Qual é o contato do suporte da AIUTA\?<\/p>/g, '<p itemprop=\\"name\\">Qual é o contato do suporte da Plataforma?</p>');
faq = faq.replace(/suporte@aiuta\.ai/g, 'suporte@traduztudo.com.br');
faq = faq.replace(/AIUTA/g, 'TraduzTudo');
fs.writeFileSync('src/app/perguntas-frequentes/page.tsx', faq, 'utf8');
console.log('Updated perguntas-frequentes');
