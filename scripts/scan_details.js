const fs = require('fs');
const path = require('path');

function getMatches() {
  const videoPages = [];
  const copyrightPages = [];

  function scan(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (!['node_modules', '.next', '.git'].includes(f)) scan(full);
      } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.html')) {
        const content = fs.readFileSync(full, 'utf8');
        
        // Video matches
        const vMatches = [...content.matchAll(/class=\\?["'][^"']*(?:video-block|play-video|j_play|video-responsive|embed-responsive)[^"']*\\?["']|id=\\?["'][^"']*(?:video|player)[^"']*\\?["']|<iframe[^>]*youtube/gi)];
        if (vMatches.length > 0) {
          videoPages.push({
            file: full,
            matches: vMatches.map(m => m[0])
          });
        }

        // Copyright / brand text mentions (excluding external asset urls like etraducoes.com.br/themes/...)
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          // Look for text mentions of etraducoes / copyright
          const textOnly = line.replace(/https?:\/\/[^\s"'>]+/g, '');
          if (/(?:e-?tradu[çc][oõ]es|copyright|todos os direitos reservados|direitos reservados|cnpj)/i.test(textOnly)) {
            copyrightPages.push({
              file: full,
              line: idx + 1,
              text: line.trim()
            });
          }
        });
      }
    }
  }

  scan('src');
  return { videoPages, copyrightPages };
}

const res = getMatches();
console.log('=== PAGES WITH VIDEOS (' + res.videoPages.length + ') ===');
res.videoPages.forEach(p => {
  console.log(`- ${p.file}: ${p.matches.join(', ')}`);
});

console.log('\n=== COPYRIGHT / BRAND TEXT MENTIONS (' + res.copyrightPages.length + ') ===');
res.copyrightPages.forEach(c => {
  console.log(`- ${c.file}:${c.line} -> ${c.text.slice(0, 140)}`);
});
