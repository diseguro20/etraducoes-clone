const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const popupIdx = html.indexOf('id="wpp-popup"');
console.log(html.slice(popupIdx + 1500, popupIdx + 4000));
