const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
const s1 = content.indexOf('<section class=\\"padd-top-sm padd-bottom-lg\\">');
const s2 = content.indexOf('<section class=\\"bg-bottom-gray\\">');
console.log('s1 index:', s1);
console.log('s2 index:', s2);
console.log('--- Section 1 ---');
console.log(content.substring(s1, s2));
