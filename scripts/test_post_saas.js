const https = require('https');

const postData = JSON.stringify({
  name: 'Teste Integracao SaaS',
  email: 'teste@traduztudo.com.br',
  phone: '(11) 98285-4183',
  whatsapp: '(11) 98285-4183',
  service: 'Tradução Juramentada',
  sourceLanguage: 'Português',
  targetLanguage: 'Inglês',
  estimatedVolume: '1 lauda',
  notes: 'Teste de integração direta entre o site traduztudo.com e o TraduzTudo OS SaaS.',
  origin: 'Site Oficial TraduzTudo (https://traduztudo.com)',
  files: ['documento_teste.pdf']
});

const req = https.request('https://traduztudo-os.vercel.app/api/public/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'x-api-key': 'traduztudo-saas-api-secret-key-2026'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('POST status:', res.statusCode);
    console.log('POST response:', data);
  });
});

req.on('error', console.error);
req.write(postData);
req.end();
