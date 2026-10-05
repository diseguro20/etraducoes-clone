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
// 1. empresa-de-traducao/page.tsx
// ──────────────────────────────────────────────
cleanFile('src/app/empresa-de-traducao/page.tsx', (c) => {
  // Names
  c = c.replace(/Felipe\s*Coelho\s*Malucelli/gi, 'Carlos Eduardo Silveira');
  c = c.replace(/Felipe\s*Malucelli/gi, 'Carlos Silveira');
  c = c.replace(/Malucelli/gi, 'Silveira');
  c = c.replace(/Ebrahim\s*Paula\s*Leite/gi, 'André Costa');
  c = c.replace(/Ebrahim\s*P\.\s*Leite/gi, 'André Costa');
  c = c.replace(/Ebrahim\s*Leite/gi, 'André Costa');
  c = c.replace(/Ebrahim/gi, 'André');

  // AIUTA references
  c = c.replace(/Plataforma\s*AIUTA/gi, 'Plataforma TraduzTudo');
  c = c.replace(/plataforma\s*AIUTA/gi, 'plataforma TraduzTudo');
  c = c.replace(/AIUTA/gi, 'TraduzTudo');

  // aiuta.ai profile photos → local no_avatar
  c = c.replace(/https?:\/\/files\.aiuta\.ai\/profiles\/[^\s"')>]+/gi, '/themes/web/assets/img/no_avatar.jpg');
  c = c.replace(/https?:\/\/aiuta\.ai\/[^\s"')>]*/gi, '/plataforma-de-traducao');

  // ui-avatars with competitor names
  c = c.replace(/Felipe\+Coelho\+Malucelli/gi, 'Carlos+Eduardo+Silveira');
  c = c.replace(/Felipe\+Malucelli/gi, 'Carlos+Silveira');
  c = c.replace(/Ebrahim\+Paula\+Leite/gi, 'Andre+Costa');
  c = c.replace(/Ebrahim\+P\.?\+Leite/gi, 'Andre+Costa');

  // eTraduções brand
  c = c.replace(/eTradu[çc][õo]es/gi, 'TraduzTudo');
  c = c.replace(/e-tradu[çc][õo]es/gi, 'traduztudo');

  return c;
});

// ──────────────────────────────────────────────
// 2. etraducoes-e-confiavel/page.tsx
// ──────────────────────────────────────────────
cleanFile('src/app/etraducoes-e-confiavel/page.tsx', (c) => {
  // Names
  c = c.replace(/Felipe\s*Coelho\s*Malucelli/gi, 'Carlos Eduardo Silveira');
  c = c.replace(/Felipe\s*Malucelli/gi, 'Carlos Silveira');
  c = c.replace(/Malucelli/gi, 'Silveira');
  c = c.replace(/Ebrahim\s*Paula\s*Leite/gi, 'André Costa');
  c = c.replace(/Ebrahim\s*P\.\s*Leite/gi, 'André Costa');
  c = c.replace(/Ebrahim\s*Leite/gi, 'André Costa');
  c = c.replace(/Ebrahim/gi, 'André');

  // ui-avatars with competitor names
  c = c.replace(/Felipe\+Coelho\+Malucelli/gi, 'Carlos+Eduardo+Silveira');
  c = c.replace(/Felipe\+Malucelli/gi, 'Carlos+Silveira');
  c = c.replace(/Ebrahim\+Paula\+Leite/gi, 'Andre+Costa');
  c = c.replace(/Ebrahim\+P\.?\+Leite/gi, 'Andre+Costa');

  // AIUTA
  c = c.replace(/Plataforma\s*AIUTA/gi, 'Plataforma TraduzTudo');
  c = c.replace(/plataforma\s*AIUTA/gi, 'plataforma TraduzTudo');
  c = c.replace(/AIUTA/gi, 'TraduzTudo');

  // aiuta.ai profile photos → local no_avatar
  c = c.replace(/https?:\/\/files\.aiuta\.ai\/profiles\/[^\s"')>]+/gi, '/themes/web/assets/img/no_avatar.jpg');
  c = c.replace(/https?:\/\/aiuta\.ai\/[^\s"')>]*/gi, '/plataforma-de-traducao');

  // eTraduções brand
  c = c.replace(/eTradu[çc][õo]es/gi, 'TraduzTudo');
  c = c.replace(/e-tradu[çc][õo]es/gi, 'traduztudo');

  return c;
});

console.log('\nDone! Now creating /traduztudo-e-confiavel redirect...');

// ──────────────────────────────────────────────
// 3. Create /traduztudo-e-confiavel/page.tsx redirect
// ──────────────────────────────────────────────
const redirectDir = path.join(projectRoot, 'src/app/traduztudo-e-confiavel');
fs.mkdirSync(redirectDir, { recursive: true });
const redirectContent = `import { redirect } from 'next/navigation';

export default function TraduzTudoConfiavel() {
  redirect('/etraducoes-e-confiavel');
}

export const metadata = {
  title: 'TraduzTudo é Confiável? | TraduzTudo',
  description: 'Descubra por que a TraduzTudo é a escolha mais segura e confiável para suas traduções juramentadas e certificadas.',
};
`;
const redirectPath = path.join(redirectDir, 'page.tsx');
fs.writeFileSync(redirectPath, redirectContent, 'utf8');
console.log('[CREATED] src/app/traduztudo-e-confiavel/page.tsx');

console.log('\nAll done!');
