const fs = require('fs');
const html = fs.readFileSync('scripts/orig_home.html', 'utf8');

const popupIdx = html.indexOf('</select>');
console.log(html.slice(popupIdx, popupIdx + 1500));
