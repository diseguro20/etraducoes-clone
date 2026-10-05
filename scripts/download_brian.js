const https = require('https');
const fs = require('fs');

https.get('https://www.etraducoes.com.br/themes/web/assets/img/brian.webp', (res) => {
  if (res.statusCode === 200) {
    const file = fs.createWriteStream('public/img/brian.webp');
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Saved public/img/brian.webp successfully');
    });
  } else {
    console.log('Failed to download brian.webp, status:', res.statusCode);
  }
}).on('error', err => console.error(err));
