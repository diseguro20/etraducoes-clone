const fs = require('fs');

async function checkDeals() {
  const res = await fetch('https://www.etraducoes.com.br/orcamento-traducoes');
  const html = await res.text();
  const dealsStart = html.indexOf('<div class="deals">');
  const appModal = html.indexOf('<div class="app_modal">');
  const dealsHtml = html.substring(dealsStart, appModal !== -1 ? appModal : html.indexOf('</body>'));
  console.log('Deals HTML length:', dealsHtml.length);
  fs.writeFileSync('scripts/deals_raw.html', dealsHtml, 'utf8');
  console.log('Saved to scripts/deals_raw.html');
}
checkDeals();
