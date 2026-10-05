const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');
let totalReplacements = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const original = content;

  // Replace themes and assets
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br\/themes\//g, '/themes/');
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br\/uploads\//g, '/uploads/');
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br\/orcamento-traducoes/g, '/orcamento-traducoes');
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br\/contato/g, '/contato');
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br\/empresa-de-traducao/g, '/empresa-de-traducao');
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br\//g, '/');
  content = content.replace(/https?:\/\/(?:www\.)?etraducoes\.com\.br/g, 'https://traduztudo.com');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    totalReplacements++;
    console.log(`Updated URLs in: ${f}`);
  }
});

console.log(`Finished updating URLs in ${totalReplacements} files.`);
