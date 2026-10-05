const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const popupIdx = html.indexOf('id="wpp-popup"');
console.log(html.slice(popupIdx, popupIdx + 3000));
