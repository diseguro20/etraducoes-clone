const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sendCdp(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 100000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9235',
    'https://traduztudo.com'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9235/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    const positions = [
      { name: 'hero', y: 0 },
      { name: 'map_services', y: 800 },
      { name: 'apostilamento', y: 1600 },
      { name: 'doc_types', y: 2400 },
      { name: 'how_it_works', y: 3400 },
      { name: 'testimonials', y: 4400 },
      { name: 'faq', y: 5600 },
      { name: 'footer', y: 7200 }
    ];

    for (const pos of positions) {
      await sendCdp(ws, 'Runtime.evaluate', { expression: `window.scrollTo(0, ${pos.y})` });
      await new Promise(r => setTimeout(r, 400));
      const ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`public/screenshots/section_${pos.name}.png`, Buffer.from(ss.data, 'base64'));
    }

    console.log('All sections captured successfully!');
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
