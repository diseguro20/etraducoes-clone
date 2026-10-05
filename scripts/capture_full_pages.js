const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

async function capture(url, name, isMobile = false) {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    url
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9222/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    if (isMobile) {
      await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });
    } else {
      await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });
    }

    await new Promise(r => setTimeout(r, 1500));

    // Capture full page screenshot
    const ss = await sendCdp(ws, 'Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const outPath = path.join(__dirname, '..', 'public', 'screenshots', `${name}.png`);
    fs.writeFileSync(outPath, Buffer.from(ss.data, 'base64'));
    console.log(`Saved ${name}.png`);

    ws.close();
  } catch (e) {
    console.error(`Error capturing ${name}:`, e.message);
  } finally {
    proc.kill();
  }
}

async function main() {
  await capture('https://traduztudo.vercel.app/', 'full_home_desktop', false);
  await capture('https://traduztudo.vercel.app/', 'full_home_mobile', true);
  await capture('https://traduztudo.vercel.app/orcamento-traducoes', 'full_orcamento_mobile', true);
  await capture('https://traduztudo.vercel.app/traducao-juramentada', 'full_juramentada_mobile', true);
  await capture('https://traduztudo.vercel.app/contato', 'full_contato_mobile', true);
  console.log('All captures finished!');
}

main();
