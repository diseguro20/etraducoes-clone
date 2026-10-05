const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const regex = /<script[^>]+src=["']([^"']+)["']/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1]);
}
