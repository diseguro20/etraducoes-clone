const fs = require('fs');
const path = require('path');

const pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["']/g;
let match;
const srcList = [];

while ((match = regex.exec(pageContent)) !== null) {
  srcList.push(match[1]);
}

console.log(`Found ${srcList.length} img tags in src/app/page.tsx`);

srcList.forEach(src => {
  if (src.startsWith('http')) {
    console.log('[EXTERNAL]', src);
    return;
  }
  // Local path relative to public
  const cleanPath = src.split('?')[0].replace(/^\//, '');
  const decodedPath = decodeURIComponent(cleanPath);
  
  const existsClean = fs.existsSync(path.join('public', cleanPath));
  const existsDecoded = fs.existsSync(path.join('public', decodedPath));
  
  if (existsClean || existsDecoded) {
    console.log('[OK]', src);
  } else {
    console.log('[MISSING]', src);
  }
});
