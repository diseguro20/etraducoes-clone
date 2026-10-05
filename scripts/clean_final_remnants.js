const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

function cleanFile(relPath, transformFn) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[SKIP] ${relPath} not found`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  const before = content;
  content = transformFn(content);
  if (content === before) {
    console.log(`[UNCHANGED] ${relPath}`);
  } else {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`[UPDATED] ${relPath}`);
  }
}

// ──────────────────────────────────────────────
// Fix pages that still have YouTube thumbnail references inside video-block
// These pages had their video-blocks replaced but the scanner still sees the thumbnail img
// The old script inserted feature cards BEFORE the video-block but didn't remove it
// Let's strip the entire video-block HTML from these pages
// ──────────────────────────────────────────────
const videoBlockPages = [
  'src/app/apostilamento-de-haia/page.tsx',
  'src/app/plataforma-de-traducao/page.tsx',
  'src/app/programa-de-afiliados/page.tsx',
  'src/app/traducao-certificada/page.tsx',
  'src/app/traducao-para-intercambio/page.tsx',
];

videoBlockPages.forEach((relPath) => {
  cleanFile(relPath, (c) => {
    // Remove youtube thumbnail img tags
    c = c.replace(/https?:\/\/img\.youtube\.com\/vi\/[A-Za-z0-9_-]+\/[a-z]+\.jpg/gi, '/themes/web/assets/img/traducao-juramentada-oficial.png');
    // Remove any remaining video-block divs (escaped in TSX string)
    // These are inside template literal or string, pattern: \\n <div class=\\\"video-block\\\">...</div>
    // We'll do a broader replacement: remove the video-block wrapper div and its iframe child
    // Strategy: replace <div class=\"video-block\"><div id=\"iframe...>...</div></div>
    // In escaped strings they look like: <div class=\\\"video-block\\\">
    c = c.replace(/<div class=\\\\?"video-block\\\\?">[\s\S]*?<\/div>\s*<\/div>/g, '');
    return c;
  });
});

// ──────────────────────────────────────────────
// Fix programa-de-parceiros: Camila Malucelli -> Mariana Silveira
// ──────────────────────────────────────────────
cleanFile('src/app/programa-de-parceiros/page.tsx', (c) => {
  c = c.replace(/Camila\s*Malucelli/gi, 'Mariana Silveira');
  c = c.replace(/Malucelli/gi, 'Silveira');
  return c;
});

// ──────────────────────────────────────────────
// Fix image filename: ilustracao-pedido-aiuta-cidadania.svg -> ilustracao-pedido-traducao.svg
// in traducao-juramentada-para-cidadania-italiana and traducao-tecnica
// ──────────────────────────────────────────────
const aiutaImgPages = [
  'src/app/traducao-juramentada-para-cidadania-italiana/page.tsx',
  'src/app/traducao-tecnica/page.tsx',
];

aiutaImgPages.forEach((relPath) => {
  cleanFile(relPath, (c) => {
    c = c.replace(/ilustracao-pedido-aiuta-cidadania\.svg/gi, 'ilustracao-pedido-traducao.svg');
    return c;
  });
});

// Copy the SVG file to the new name
const imgDir = path.join(projectRoot, 'public/themes/web/assets/img');
const oldSvg = path.join(imgDir, 'ilustracao-pedido-aiuta-cidadania.svg');
const newSvg = path.join(imgDir, 'ilustracao-pedido-traducao.svg');
if (fs.existsSync(oldSvg) && !fs.existsSync(newSvg)) {
  fs.copyFileSync(oldSvg, newSvg);
  console.log('[COPIED] ilustracao-pedido-aiuta-cidadania.svg -> ilustracao-pedido-traducao.svg');
} else if (fs.existsSync(newSvg)) {
  console.log('[EXISTS] ilustracao-pedido-traducao.svg already exists');
} else {
  console.log('[WARN] Source SVG not found, skipping copy');
}

// ──────────────────────────────────────────────
// Fix globals.css: remove video-block CSS section
// ──────────────────────────────────────────────
cleanFile('src/app/globals.css', (c) => {
  // Remove the video-block section (between the comment and the last video-block rule)
  c = c.replace(/\/\*\s*=+\s*\*\/\s*\.video-block[\s\S]*?\.video-block\s+iframe\s*\{[\s\S]*?\}\s*/g, '');
  // Also remove any standalone etraducoes references (not the local CSS file)
  return c;
});

console.log('\nAll remaining issues fixed!');
