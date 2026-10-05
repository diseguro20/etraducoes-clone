const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const regex = /whatsapp-lead|wpp-popup-form/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Match at index:', match.index);
  console.log(html.slice(Math.max(0, match.index - 100), match.index + 400));
}
