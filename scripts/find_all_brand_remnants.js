const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
      // ignore node_modules and .next
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk('./src');
const patterns = [
  { name: 'AIUTA', regex: /aiuta/gi },
  { name: 'FERRARA', regex: /ferrara/gi },
  { name: 'MALUCELLI', regex: /malucelli/gi },
  { name: 'EBRAHIM', regex: /ebrahim/gi },
  { name: 'YOUTUBE', regex: /(youtube\.com|youtu\.be)/gi },
  { name: 'VIDEO_BLOCK', regex: /video-block/gi },
  { name: 'J_PLAY', regex: /j_play/gi },
  { name: 'ETRADUCOES', regex: /etraducoes/gi }
];

const results = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  patterns.forEach(p => {
    let match;
    while ((match = p.regex.exec(content)) !== null) {
      if (!results[f]) results[f] = [];
      const start = Math.max(0, match.index - 40);
      const end = Math.min(content.length, match.index + 50);
      results[f].push({
        type: p.name,
        snippet: content.substring(start, end).replace(/\s+/g, ' ')
      });
    }
  });
});

console.log('Results summary:');
for (const [file, items] of Object.entries(results)) {
  console.log(`\n=== ${file} (${items.length} items) ===`);
  const grouped = {};
  items.forEach(it => {
    grouped[it.type] = (grouped[it.type] || 0) + 1;
  });
  console.log('Types:', JSON.stringify(grouped));
  items.slice(0, 5).forEach(it => {
    console.log(`  [${it.type}] ${it.snippet}`);
  });
}
