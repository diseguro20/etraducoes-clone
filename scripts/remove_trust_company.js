const fs = require('fs');

const files = [
  'src/app/empresa-de-traducao/page.tsx',
  'src/app/etraducoes-e-confiavel/page.tsx',
  'src/app/plataforma-de-traducao/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('trust-company')) {
    const idx = content.indexOf('trust-company');
    const secStart = content.lastIndexOf('<section', idx);
    const secEnd = content.indexOf('</section>', idx) + 10;
    if (secStart !== -1 && secEnd !== -1) {
      content = content.substring(0, secStart) + content.substring(secEnd);
      fs.writeFileSync(f, content, 'utf8');
      console.log('Removed trust-company section from:', f);
    }
  }
});
console.log('Done cleaning trust-company.');
