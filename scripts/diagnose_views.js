const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.join(__dirname, '..', 'public', 'screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  { name: 'home_desktop', url: 'https://traduztudo.vercel.app/', width: 1440, height: 900 },
  { name: 'home_mobile', url: 'https://traduztudo.vercel.app/', width: 375, height: 812 },
  { name: 'orcamento_desktop', url: 'https://traduztudo.vercel.app/orcamento-traducoes', width: 1440, height: 900 },
  { name: 'orcamento_mobile', url: 'https://traduztudo.vercel.app/orcamento-traducoes', width: 375, height: 812 },
  { name: 'juramentada_desktop', url: 'https://traduztudo.vercel.app/traducao-juramentada', width: 1440, height: 900 },
  { name: 'juramentada_mobile', url: 'https://traduztudo.vercel.app/traducao-juramentada', width: 375, height: 812 },
];

for (const t of targets) {
  const outFile = path.join(outDir, `${t.name}.png`);
  console.log(`Capturing ${t.name} (${t.width}x${t.height}) from ${t.url}...`);
  try {
    execSync(
      `"${edgePath}" --headless --disable-gpu --screenshot="${outFile}" --window-size=${t.width},${t.height} "${t.url}"`,
      { stdio: 'inherit' }
    );
    console.log(`Saved: ${outFile}`);
  } catch (err) {
    console.error(`Failed ${t.name}:`, err.message);
  }
}
console.log('Done captures!');
