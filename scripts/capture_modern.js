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

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9230',
    'http://localhost:3009/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9230/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // Desktop Light
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await sendCdp(ws, 'Runtime.evaluate', { expression: `localStorage.removeItem('theme'); document.documentElement.removeAttribute('data-theme'); document.body.classList.remove('theme-dark');` });
    await new Promise(r => setTimeout(r, 1000));
    const ss1 = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/modern_desktop_light.png', Buffer.from(ss1.data, 'base64'));
    console.log('Saved modern_desktop_light.png');

    // Desktop Dark
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.documentElement.setAttribute('data-theme', 'dark'); document.body.classList.add('theme-dark');` });
    await new Promise(r => setTimeout(r, 800));
    const ss2 = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/modern_desktop_dark.png', Buffer.from(ss2.data, 'base64'));
    console.log('Saved modern_desktop_dark.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    edgeProc.kill();
  }
}

capture();
