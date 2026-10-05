const fs = require('fs');
const path = require('path');
const https = require('https');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');
const urlMap = new Map();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match URLs starting with http:// or https:// and containing etraducoes.com.br
  const regex = /https?:\/\/(?:www\.)?etraducoes\.com\.br\/([^\s"'`<>\\)]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const fullUrl = match[0];
    const relPath = match[1];
    urlMap.set(fullUrl, relPath);
  }
});

console.log(`Found ${urlMap.size} unique URLs pointing to etraducoes.com.br`);

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve(true);
    }
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const fileStream = fs.createWriteStream(destPath);
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${url} -> ${destPath}`);
          resolve(true);
        });
      } else {
        fileStream.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        console.warn(`Failed (${res.statusCode}): ${url}`);
        resolve(false);
      }
    });
    req.on('error', (err) => {
      fileStream.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      console.warn(`Error on ${url}:`, err.message);
      resolve(false);
    });
    req.setTimeout(10000, () => {
      req.abort();
      console.warn(`Timeout: ${url}`);
      resolve(false);
    });
  });
}

async function run() {
  for (const [url, relPath] of urlMap.entries()) {
    // Determine local destination
    // e.g. themes/web/assets/img/icon-brazil.svg -> public/themes/web/assets/img/icon-brazil.svg
    const cleanRelPath = relPath.replace(/[?#].*$/, '');
    const localDest = path.join(process.cwd(), 'public', cleanRelPath);
    await downloadFile(url, localDest);
  }
  console.log('Download complete.');
}

run();
