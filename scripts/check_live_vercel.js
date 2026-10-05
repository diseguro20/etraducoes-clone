const https = require('https');

https.get('https://traduztudo.vercel.app', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const hasBrian = data.includes('brian') || data.includes('Brian');
    console.log('Has Brian:', hasBrian);
    const hasBrianAvatar = data.includes('brian.webp');
    console.log('Has Brian Avatar:', hasBrianAvatar);
    console.log('Date header:', res.headers['date']);
    console.log('Vercel cache:', res.headers['x-vercel-cache']);
  });
}).on('error', console.error);
