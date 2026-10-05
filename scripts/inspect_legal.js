const fs = require('fs');

const files = [
  'src/components/layout/Footer.tsx',
  'src/app/termos-de-uso/page.tsx',
  'src/app/politicas-de-privacidade/page.tsx',
  'src/app/programa-de-afiliados/page.tsx',
  'src/app/etraducoes-e-confiavel/page.tsx',
  'src/app/empresa-de-traducao/page.tsx',
  'src/app/contato/page.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  console.log(`\n================ ${f} ================`);
  const content = fs.readFileSync(f, 'utf8');
  const regex = /(?:etradu[çc]|e-tradu[çc]|copyright|direitos reservados|cnpj|ferrara|facebook\.com|instagram\.com|youtube\.com)/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const start = Math.max(0, m.index - 50);
    const end = Math.min(content.length, m.index + 120);
    const snippet = content.substring(start, end).replace(/\n/g, ' ');
    // Filter out simple image paths like etraducoes.com.br/themes/web/assets/img/... unless it has brand text
    console.log(`[MATCH] ${snippet}`);
  }
});
