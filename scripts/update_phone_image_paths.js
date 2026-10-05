const fs = require('fs');
const path = require('path');

const files = [
  'src/app/page.tsx',
  'src/app/traducao-academica/page.tsx',
  'src/app/traducao-de-documentos/page.tsx',
  'src/app/traducao-juramentada-de-certidoes/page.tsx',
  'src/app/traducao-juramentada-para-cidadania-italiana/page.tsx',
  'src/app/traducao-tecnica/page.tsx'
];

const targetPattern = /https:\/\/www\.etraducoes\.com\.br\/themes\/web\/assets\/img\/whatsapp-conversa-brian\.webp/g;
const replacement = '/img/whatsapp-conversa-brian.webp';

let updatedCount = 0;

files.forEach(f => {
  const fullPath = path.resolve(f);
  if (!fs.existsSync(fullPath)) {
    console.error('File not found:', fullPath);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  if (targetPattern.test(content)) {
    content = content.replace(targetPattern, replacement);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${f}`);
    updatedCount++;
  } else {
    console.log(`Pattern not found in ${f}`);
  }
});

console.log(`Total files updated: ${updatedCount}`);
