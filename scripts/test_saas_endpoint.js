const https = require('https');

https.get('https://traduztudo-os.vercel.app/api/public/requests', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('GET status:', res.statusCode);
    console.log('GET response:', data);
  });
}).on('error', console.error);
