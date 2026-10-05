const fs = require('fs');
const path = require('path');

const results = [];
function search(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(f)) search(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      if (/aiuta/i.test(content)) {
        const matches = [...content.matchAll(/.{0,30}aiuta.{0,30}/gi)].map(m => m[0].replace(/\n/g, ' '));
        results.push({ file: full, count: matches.length, samples: matches.slice(0, 5) });
      }
    }
  }
}

search('src');
console.log('Files with AIUTA:', results.length);
results.forEach(r => {
  console.log(`\n${r.file} (${r.count} matches):`);
  r.samples.forEach(s => console.log('  ' + s));
});
