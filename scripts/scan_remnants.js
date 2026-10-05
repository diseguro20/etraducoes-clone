const fs = require('fs');
const path = require('path');

const keywords = ['etradu', 'aiuta', 'ferrara', 'babi-avaliacoes', 'agenda.aiuta'];

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(f)) scan(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      keywords.forEach(kw => {
        let regex = new RegExp(`.{0,40}${kw}.{0,60}`, 'gi');
        let m;
        while ((m = regex.exec(content)) !== null) {
          // print snippet unless it is just /css/etraducoes.css or /js/etraducoes.js
          const snippet = m[0].replace(/\n/g, ' ');
          if (!snippet.includes('/css/etraducoes.css') && !snippet.includes('/js/etraducoes.js') && !snippet.includes('etraducoes-clone')) {
            console.log(`[${kw.toUpperCase()}] ${full}: ${snippet}`);
          }
        }
      });
    }
  }
}

scan('src');
