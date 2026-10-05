const https = require('https');
const fs = require('fs');

https.get('https://www.etraducoes.com.br', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/orig_home.html', data);
    console.log('Downloaded HTML, length:', data.length);
    // Find all occurrences of wpp, brian, popup, modal
    const regex = /<div[^>]*id=["'](wpp|brian|popup)[^>]*>[\s\S]*?<\/div>/gi;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log('Match:', match[0].slice(0, 200));
    }
    // Also look for scripts mentioning wpp or brian
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    while ((match = scriptRegex.exec(data)) !== null) {
      if (match[1].includes('wpp') || match[1].includes('brian') || match[1].includes('popup')) {
        console.log('Script match:', match[1].slice(0, 300));
      }
    }
  });
}).on('error', err => console.error(err));
