const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const popupIdx = html.indexOf('id="wpp-popup"');
console.log('--- WPP POPUP HTML ---');
console.log(html.slice(popupIdx - 150, popupIdx + 2500));

console.log('--- WPP SCRIPT ---');
const scriptIdx = html.indexOf('.wpp-btn-trigger');
console.log(html.slice(scriptIdx - 100, scriptIdx + 1500));
