const fs = require('fs');
const css = fs.readFileSync('public/css/deals.css', 'utf8');
const urls = css.match(/url\(([^)]+)\)/g) || [];
console.log('Total URLs in deals.css:', urls.length);
console.log([...new Set(urls)].slice(0, 20));
