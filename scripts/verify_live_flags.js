const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9239',
    'https://traduztudo.vercel.app/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9239/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // 1. Desktop Test (1440x1200)
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to the solutions / map section
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = document.querySelector('.solutions') || document.querySelector('.img-map');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const deskSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const deskFile = path.resolve(__dirname, '..', 'public', 'screenshots', 'live_flags_desktop.png');
    fs.writeFileSync(deskFile, Buffer.from(deskSS.data, 'base64'));
    console.log('Saved ' + deskFile);

    // 2. Mobile Test (390x844 iPhone)
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to the language list
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = document.querySelector('.list-tr') || document.querySelector('.solutions');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const mobSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const mobFile = path.resolve(__dirname, '..', 'public', 'screenshots', 'live_flags_mobile.png');
    fs.writeFileSync(mobFile, Buffer.from(mobSS.data, 'base64'));
    console.log('Saved ' + mobFile);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edgeProc.kill();
  }
}

main();
