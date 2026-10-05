const fs = require('fs');
const js = fs.readFileSync('scripts/orig_scripts.js', 'utf8');

const idx = js.indexOf('wpp_redirect');
console.log(js.slice(idx - 200, idx + 400));
