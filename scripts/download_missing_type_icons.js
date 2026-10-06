const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../public/themes/web/assets/img');

const filesToDownload = [
  'type-passport%20(4)%201.svg',
  'type-file%20(2)%201.svg',
  'type-passport (4) 1.svg',
  'type-file (2) 1.svg'
];

async function download(file) {
  const url = `https://www.etraducoes.com.br/themes/web/assets/img/${encodeURIComponent(file).replace(/%2520/g, '%20')}`;
  console.log(`Downloading: ${url}`);
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`Status for ${file}: ${res.statusCode}`);
      if (res.statusCode === 200) {
        // Save both with decoded and encoded name so both work
        const savePath1 = path.join(targetDir, file);
        const savePath2 = path.join(targetDir, decodeURIComponent(file));
        const fileStream = fs.createWriteStream(savePath1);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          if (savePath1 !== savePath2) {
            fs.copyFileSync(savePath1, savePath2);
          }
          console.log(`[SUCCESS] Saved ${file}`);
          resolve(true);
        });
      } else {
        console.log(`[FAILED] Status ${res.statusCode} for ${file}`);
        resolve(false);
      }
    }).on('error', (e) => {
      console.log(`[ERROR] ${e.message}`);
      resolve(false);
    });
  });
}

(async () => {
  await download('type-passport%20(4)%201.svg');
  await download('type-file%20(2)%201.svg');
})();
