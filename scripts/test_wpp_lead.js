const https = require('https');

const postData = 'action=whatsapp_lead&full_name=Teste+da+Silva&phone_display=11982854183&phone=%2B5511982854183&addr_uf=SP';

const req = https.request('https://www.etraducoes.com.br/whatsapp-lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'X-Requested-With': 'XMLHttpRequest'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', err => console.error(err));
req.write(postData);
req.end();
