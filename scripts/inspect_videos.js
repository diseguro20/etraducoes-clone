const fs = require('fs');

const videoFiles = [
  'src/app/apostilamento-de-haia/page.tsx',
  'src/app/orcamento-traducoes/page.tsx',
  'src/app/page.tsx',
  'src/app/plataforma-de-traducao/page.tsx',
  'src/app/programa-de-afiliados/page.tsx',
  'src/app/programa-de-parceiros/page.tsx',
  'src/app/traducao-certificada/page.tsx',
  'src/app/traducao-juramentada/page.tsx',
  'src/app/traducao-juramentada-arabe/page.tsx',
  'src/app/traducao-juramentada-coreano/page.tsx',
  'src/app/traducao-juramentada-hebraico/page.tsx',
  'src/app/traducao-juramentada-japones/page.tsx',
  'src/app/traducao-juramentada-para-cidadania-italiana/page.tsx',
  'src/app/traducao-para-intercambio/page.tsx',
  'src/components/layout/OriginalPageTemplate.tsx'
];

videoFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  console.log(`\n=================== ${file} ===================`);
  const content = fs.readFileSync(file, 'utf8');
  
  // Find video blocks or j_play buttons
  const regex = /(?:<div[^>]*class=\\?["'][^"']*video-block[^"']*\\?["'][\s\S]*?<\/div>\s*<\/div>|<section[^>]*class=\\?["'][^"']*(?:video|tutorial)[^"']*\\?["'][\s\S]*?<\/section>|<a[^>]*class=\\?["'][^"']*j_play[^"']*\\?["'][^>]*>[\s\S]*?<\/a>|<button[^>]*class=\\?["'][^"']*j_play[^"']*\\?["'][^>]*>[\s\S]*?<\/button>|<iframe[^>]*youtube[\s\S]*?<\/iframe>)/gi;
  
  const matches = [...content.matchAll(regex)];
  if (matches.length > 0) {
    matches.forEach((m, i) => {
      console.log(`[MATCH ${i+1}] (len: ${m[0].length})`);
      console.log(m[0].slice(0, 300) + (m[0].length > 300 ? '...' : ''));
    });
  } else {
    // try to find where j_play or video is mentioned
    const idx = content.search(/j_play|video-block|youtube/i);
    if (idx !== -1) {
      console.log('Snippet around keyword:');
      console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 300)));
    }
  }
});
