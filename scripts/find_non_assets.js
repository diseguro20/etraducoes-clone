const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(fullPath);
  });
  return results;
}

const nonAssets = [];
walk('./src').forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/https?:\/\/(?:www\.)?etraducoes\.com\.br[^\s"'`<>\\)]*/g) || [];
  matches.forEach(u => {
    if (!u.includes('/themes/') && !u.includes('/uploads/')) {
      nonAssets.push({ file: f, url: u });
    }
  });
});
console.log('Non-asset etraducoes URLs count:', nonAssets.length);
nonAssets.forEach(x => console.log(`${x.file}: ${x.url}`));
