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

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    'https://traduztudo.vercel.app/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9222/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // Desktop
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to middle
    await sendCdp(ws, 'Runtime.evaluate', { expression: 'window.scrollTo(0, 1000)' });
    await new Promise(r => setTimeout(r, 500));
    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/home_desktop_mid.png', Buffer.from(ss.data, 'base64'));

    // Scroll to bottom
    await sendCdp(ws, 'Runtime.evaluate', { expression: 'window.scrollTo(0, 3000)' });
    await new Promise(r => setTimeout(r, 500));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/home_desktop_bot.png', Buffer.from(ss.data, 'base64'));

    // Mobile
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));

    // Mobile middle
    await sendCdp(ws, 'Runtime.evaluate', { expression: 'window.scrollTo(0, 1000)' });
    await new Promise(r => setTimeout(r, 500));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/home_mobile_mid.png', Buffer.from(ss.data, 'base64'));

    // Mobile bottom
    await sendCdp(ws, 'Runtime.evaluate', { expression: 'window.scrollTo(0, 3000)' });
    await new Promise(r => setTimeout(r, 500));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/home_mobile_bot.png', Buffer.from(ss.data, 'base64'));

    console.log('Scroll screenshots saved successfully!');
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
