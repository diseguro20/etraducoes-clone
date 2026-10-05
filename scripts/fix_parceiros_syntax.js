const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src/app/programa-de-parceiros/page.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// The broken pattern in the raw file:
// href=\"/avaliacoes"  (unescaped closing quote)
// Should be: href=\"/avaliacoes\"

// In the JS source string (with escaping layers):
// broken:  href=\\\"/avaliacoes\"  followed by \n
// correct: href=\\\"/avaliacoes\\\"  followed by \n

// Also fix the star icon closing - it has \"fas fa-star ml-2\" without proper closing
// Let's fix all occurrences of this specific broken pattern

const before = c.length;

// Fix 1: href=\"/avaliacoes"  -> href=\"/avaliacoes\"
// In raw file bytes, the broken sequence is: \/avaliacoes"\n
// where the " before \n is unescaped (charcode 34 plain)
// Pattern in file: /avaliacoes"\n  (with \n being literal backslash-n chars)
c = c.replace(/\/avaliacoes"\\n/g, '/avaliacoes\\"\\n');

// Fix 2: class=\"fas fa-star ml-2"  -> class=\"fas fa-star ml-2\"
// Check for similar unescaped closing quotes after class values
c = c.replace(/fa-star ml-2">/g, 'fa-star ml-2\\">');

// Verify the fix
const line9 = c.split('\n')[8];
const idx = line9.indexOf('/avaliacoes');
console.log('After fix, context around /avaliacoes:');
console.log(JSON.stringify(line9.substring(idx - 5, idx + 30)));

fs.writeFileSync(filePath, c, 'utf8');
console.log('\n[FIXED] programa-de-parceiros/page.tsx');
console.log('File length before:', before, 'after:', c.length);
