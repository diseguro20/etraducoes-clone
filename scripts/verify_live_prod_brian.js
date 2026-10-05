const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

function getJson(url) {
  return new Promise((res, rej) => {
    http.get(url, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });
}

function sendCdp(ws, method, params = {}) {
  return new Promise((res, rej) => {
    const id = Math.floor(Math.random() * 100000);
    const h = (e) => {
      const m = JSON.parse(e.data);
      if (m.id === id) { ws.removeEventListener('message', h); res(m.result); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9231',
    'https://traduztudo.com'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9231/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Waiting for live page load...');
    await new Promise(r => setTimeout(r, 4000));

    // Capture closed state on production
    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/live_prod_brian_closed.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/live_prod_brian_closed.png');

    // Click WhatsApp button on production
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('wpp-btn')?.click();`
    });
    await new Promise(r => setTimeout(r, 1600));

    // Capture open chat on production
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/live_prod_brian_chat.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/live_prod_brian_chat.png');

    ws.close();
  } catch (err) {
    console.error('Error on live prod test:', err);
  } finally {
    edgeProc.kill();
  }
}

run();
