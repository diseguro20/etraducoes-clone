const fs = require('fs');

const c = fs.readFileSync('scripts/orig_home.html', 'utf8');
const matches = c.match(/type-[^"'\s>]+/g) || [];
console.log('Matches in orig_home.html:');
console.log([...new Set(matches)]);
