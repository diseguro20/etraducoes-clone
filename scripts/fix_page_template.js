const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Find start of bodyHtml
const startMatch = content.indexOf('const bodyHtml = ');
const s1Start = content.indexOf('<section', startMatch);
const endSection = content.indexOf('export default function');
const lastQuote = content.lastIndexOf(';', endSection);

// Get the HTML between start and end
let html = content.substring(s1Start, lastQuote).trim();

// If it starts/ends with quote, trim it
if (html.startsWith('"') || html.startsWith('`')) html = html.substring(1);
if (html.endsWith('"') || html.endsWith('`')) html = html.substring(0, html.length - 1);

// Escape any backticks or template variable interpolations inside html
html = html.replace(/`/g, '\\`').replace(/\${/g, '\\${');

const newCode = content.substring(0, startMatch) + 'const bodyHtml = `' + html + '`;\n\n' + content.substring(endSection);

fs.writeFileSync('src/app/page.tsx', newCode, 'utf8');
console.log('Fixed bodyHtml in page.tsx with template literal!');
