const fs = require('fs');

const pages = [
  'src/app/apostilamento-de-haia/page.tsx',
  'src/app/plataforma-de-traducao/page.tsx',
  'src/app/programa-de-afiliados/page.tsx',
  'src/app/programa-de-parceiros/page.tsx',
  'src/app/traducao-certificada/page.tsx',
  'src/app/traducao-para-intercambio/page.tsx',
  'src/app/orcamento-traducoes/page.tsx'
];

pages.forEach(p => {
  console.log(`\n============================= ${p} =============================`);
  const c = fs.readFileSync(p, 'utf8');
  // find the section or row surrounding the video
  const idx = c.search(/video-block|<iframe/);
  if (idx !== -1) {
    const start = Math.max(0, c.lastIndexOf('<section', idx));
    let end = c.indexOf('</section>', idx);
    if (end === -1) end = Math.min(c.length, idx + 1000);
    else end += 10;
    console.log(c.substring(start, end));
  }
});
