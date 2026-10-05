const https = require('https');

const req = https.request('https://traduztudo-os.vercel.app/api/public/requests', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://traduztudo.com',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'x-api-key, content-type'
  }
}, (res) => {
  console.log('OPTIONS status:', res.statusCode);
  console.log('OPTIONS headers:', res.headers);
});

req.on('error', console.error);
req.end();
