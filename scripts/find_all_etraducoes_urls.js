const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');
const urlMap = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/https?:\/\/[^\s"'`<>)]+/g) || [];
  matches.forEach(u => {
    if (/etraducoes|aiuta|ferrara|youtube/i.test(u)) {
      if (!urlMap[u]) urlMap[u] = [];
      urlMap[u].push(f);
    }
  });
});

console.log('Found URLs:');
for (const [url, fileList] of Object.entries(urlMap)) {
  console.log(`\nURL: ${url}\nUsed in: ${fileList.join(', ')}`);
}
