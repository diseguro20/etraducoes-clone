const fs = require('fs');

const pages = [
  'traducao-juramentada',
  'traducao-certificada',
  'traducao-tecnica',
  'apostilamento-de-haia',
  'traducao-de-alemao',
  'traducao-mandarim',
  'traducao-de-holandes',
  'traducao-de-japones',
  'traducao-de-coreano'
];

async function checkHero() {
  for (const p of pages) {
    try {
      const res = await fetch('https://www.etraducoes.com.br/' + p);
      const html = await res.text();
      const heroMatch = html.match(/<section[\s\S]*?<\/section>/i);
      const hero = heroMatch ? heroMatch[0] : '';
      const imgMatches = hero.match(/<(img|object)[^>]+>/g) || [];
      console.log('=== PAGE:', p, '===');
      console.log('Hero tags:', imgMatches.slice(0, 5));
    } catch (e) {
      console.error(p, e.message);
    }
  }
}
checkHero();
