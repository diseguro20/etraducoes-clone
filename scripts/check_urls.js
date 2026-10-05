const fs = require('fs');

const c = fs.readFileSync('public/js/etraducoes.js', 'utf8');
const idx = c.indexOf('youtube-nocookie');
if (idx !== -1) {
  console.log(c.substring(Math.max(0, idx - 150), Math.min(c.length, idx + 250)));
}
