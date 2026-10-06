const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, '../public/themes/web/assets/img');

// Copy with clean filenames
const mappings = [
  { from: 'type-passport%20(4)%201.svg', to: 'type-passport.svg' },
  { from: 'type-award%201.svg', to: 'type-award.svg' },
  { from: 'type-carteira-de-motorista%201.svg', to: 'type-carteira-de-motorista.svg' },
  { from: 'type-file%20(2)%201.svg', to: 'type-file.svg' }
];

mappings.forEach(({ from, to }) => {
  const fromPath = path.join(imgDir, from);
  const toPath = path.join(imgDir, to);
  
  if (fs.existsSync(fromPath)) {
    fs.copyFileSync(fromPath, toPath);
    console.log(`[COPIED] ${from} -> ${to}`);
  } else {
    // Try decoded name
    const decodedPath = path.join(imgDir, decodeURIComponent(from));
    if (fs.existsSync(decodedPath)) {
      fs.copyFileSync(decodedPath, toPath);
      console.log(`[COPIED DECODED] ${decodeURIComponent(from)} -> ${to}`);
    } else {
      console.log(`[NOT FOUND] ${from}`);
    }
  }
});

// Also check all files with %20 in public/themes/web/assets/img and create clean copies
const allFiles = fs.readdirSync(imgDir);
allFiles.forEach(f => {
  if (f.includes('%20')) {
    const cleanName = f.replace(/%20/g, '-').replace(/[()]/g, '');
    const cleanPath = path.join(imgDir, cleanName);
    if (!fs.existsSync(cleanPath)) {
      fs.copyFileSync(path.join(imgDir, f), cleanPath);
      console.log(`[AUTO-CLEAN] ${f} -> ${cleanName}`);
    }
  }
});
