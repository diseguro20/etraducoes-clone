const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[1].includes('wpp-popup') || match[1].includes('wpp-btn')) {
    console.log('FOUND CSS IN STYLE TAG:');
    console.log(match[1]);
  }
}
