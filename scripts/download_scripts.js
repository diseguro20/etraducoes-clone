const https = require('https');
const fs = require('fs');

https.get('https://www.etraducoes.com.br/themes/web/assets/scripts.js?v=142047', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/orig_scripts.js', data);
    console.log('Saved scripts.js, size:', data.length);
    const matches = data.match(/whatsapp[^\"]*|wpp[^\"]*|brian[^\"]*/gi) || [];
    console.log('Matches:', Array.from(new Set(matches)).slice(0, 30));
  });
});
