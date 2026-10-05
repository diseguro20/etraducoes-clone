const fs = require('fs');
const js = fs.readFileSync('scripts/orig_scripts.js', 'utf8');

const regex = /whatsapp2/gi;
let match;
while ((match = regex.exec(js)) !== null) {
  console.log(js.slice(match.index - 100, match.index + 300));
}
