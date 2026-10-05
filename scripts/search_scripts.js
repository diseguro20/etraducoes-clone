const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const regex = /<script[\s\S]*?<\/script>/gi;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
  if (match[0].includes('wpp-popup') || match[0].includes('wpp-btn') || match[0].includes('whatsapp') || match[0].includes('lead')) {
    console.log(`--- SCRIPT ${i++} ---`);
    console.log(match[0]);
  }
}
