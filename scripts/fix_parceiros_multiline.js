const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src/app/programa-de-parceiros/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// The file has been broken: the bodyHtml string was split across multiple lines.
// Lines 10-39 are raw HTML that was injected outside the string.
// We need to:
// 1. Extract the header (lines 1-8, i.e. before bodyHtml)
// 2. Extract the closing (lines 40-44: export default function Page() ...)
// 3. Collect ALL the HTML content between the opening " on line 9 and the closing "; 
//    wherever it ends, and re-join it into a proper single-line string.

const lines = c.split('\n');
console.log('Total lines:', lines.length);

// Find the line with "const bodyHtml = "
const bodyHtmlLineIdx = lines.findIndex(l => l.trim().startsWith('const bodyHtml'));
console.log('bodyHtml starts at line (0-indexed):', bodyHtmlLineIdx);

// Find the export default line
const exportLineIdx = lines.findIndex(l => l.trim().startsWith('export default function'));
console.log('export default at line (0-indexed):', exportLineIdx);

// Header = everything before bodyHtml line
const header = lines.slice(0, bodyHtmlLineIdx).join('\n');

// Footer = everything from export default onward  
const footer = lines.slice(exportLineIdx).join('\n');

// The HTML content is spread across lines bodyHtmlLineIdx through exportLineIdx-1
// Line bodyHtmlLineIdx starts with: const bodyHtml = "...
// It might end mid-line with "; or the content continues on subsequent lines

// Extract the first line's HTML content (after the opening quote)
let firstLine = lines[bodyHtmlLineIdx];
// Remove 'const bodyHtml = "' prefix
const prefixMatch = firstLine.match(/^const bodyHtml = "(.*)/s);
let htmlContent = '';

if (prefixMatch) {
  let rest = prefixMatch[1];
  // Check if this line ends with "; (closing the string)
  if (rest.endsWith('";')) {
    // The string is entirely on this one line - already correct
    htmlContent = rest.slice(0, -2); // remove closing ";
    console.log('String was already single-line. Fixing just the broken parts.');
  } else if (rest.endsWith('";\r')) {
    htmlContent = rest.slice(0, -3);
    console.log('String was already single-line (CRLF). Done.');
  } else {
    // String continues on subsequent lines
    // The first line content (may or may not end with just the line content)
    htmlContent = rest;
    
    // Collect remaining lines until we hit the export default line
    for (let i = bodyHtmlLineIdx + 1; i < exportLineIdx; i++) {
      // These lines are raw HTML that was injected without escaping
      // We need to escape them properly for inclusion in a JS string
      let rawLine = lines[i];
      // Remove trailing \r if present
      rawLine = rawLine.replace(/\r$/, '');
      // Escape backslashes, then double quotes, then add \n
      // But we need to be careful: some content might already be partially escaped
      // The raw HTML lines (10-39) contain unescaped HTML - escape them for JS string
      htmlContent += '\\n' + rawLine.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }
    console.log('Collected HTML from', exportLineIdx - bodyHtmlLineIdx, 'lines');
  }
}

// Now rebuild the file with a proper single-line bodyHtml
const newContent = header + '\n' +
  `const bodyHtml = "${htmlContent}";\n` +
  '\n' + footer;

fs.writeFileSync(filePath, newContent, 'utf8');

const newLines = newContent.split('\n');
console.log('New file has', newLines.length, 'lines');
console.log('bodyHtml line length:', newLines[bodyHtmlLineIdx].length);
console.log('Done!');
