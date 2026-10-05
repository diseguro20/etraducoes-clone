const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        searchFiles(full);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      
      // Video patterns
      const videoMatches = [...content.matchAll(/(?:video-block|j_play|youtube\.com|youtu\.be|<video|play-video|modal_video)/gi)];
      if (videoMatches.length > 0) {
        console.log(`[VIDEO] ${full} (${videoMatches.length} matches)`);
      }

      // Old brand & copyright patterns
      const brandMatches = [...content.matchAll(/(?:etradu[çc]|e-tradu[çc]|copyright|direitos reservados|cnpj|ferrara)/gi)];
      if (brandMatches.length > 0) {
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (/(?:etradu[çc]|e-tradu[çc]|copyright|direitos reservados|cnpj|ferrara)/i.test(l)) {
            const trimmed = l.trim();
            // Ignore trivial references to local CSS or JS files if just loading etraducoes.css/js
            console.log(`[BRAND/CR] ${full}:${idx+1} -> ${trimmed.slice(0, 160)}`);
          }
        });
      }
    }
  }
}

console.log('--- SCANNING SRC DIRECTORY ---');
searchFiles('src');
console.log('\n--- SCANNING PUBLIC DIRECTORY ---');
searchFiles('public');
