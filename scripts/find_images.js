const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(walk(full));
      }
    } else {
      results.push(full);
    }
  });
  return results;
}

const files = walk('src');
const allImgUrls = new Set();

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const matches = c.match(/https?:\/\/[^\s"'`]+\.(?:png|jpg|jpeg|webp|svg)/gi) || [];
  matches.forEach(m => allImgUrls.add(`${f} -> ${m}`));
});

console.log(Array.from(allImgUrls).join('\n'));
