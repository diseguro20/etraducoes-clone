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

async function waitForServer(port) {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/`, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) resolve();
          else reject(new Error('Status: ' + res.statusCode));
        });
        req.on('error', reject);
        req.setTimeout(1000, () => req.destroy());
      });
      return true;
    } catch {
      await new Promise(r => setTimeout(r, 400));
    }
  }
  return false;
}

async function run() {
  const port = 3012;
  console.log('Starting local next server on ' + port + '...');
  const nextProc = spawn('npx.cmd', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore'
  });

  const ready = await waitForServer(port);
  if (!ready) {
    console.error('Server failed to start');
    try { nextProc.kill(); } catch {}
    process.exit(1);
  }
  console.log('Server is ready on ' + port);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `http://localhost:${port}/`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const list = await getJson('http://localhost:9222/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // 1. Mobile Home Page 375x812
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));

    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_mobile_home.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_mobile_home.png');

    // 2. Click Menu Button
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.menu-btn')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_mobile_menu_open.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_mobile_menu_open.png');

    // 3. Navigate to /orcamento-traducoes on Mobile
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${port}/orcamento-traducoes` });
    await new Promise(r => setTimeout(r, 1500));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_mobile_orcamento.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_mobile_orcamento.png');

    // 4. Desktop Home Page
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${port}/` });
    await new Promise(r => setTimeout(r, 1500));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_desktop_home.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_desktop_home.png');

    // 5. Test Light Mode on Mobile
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('theme-dark');
        const cb = document.getElementById('checkbox');
        if (cb) cb.checked = false;
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_light_mobile_home.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_light_mobile_home.png');

    // Click Menu Button in Light Mode
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.menu-btn')?.click()`
    });
    await new Promise(r => setTimeout(r, 500));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_light_mobile_menu.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_light_mobile_menu.png');

    // Navigate to /orcamento-traducoes in Light Mode
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${port}/orcamento-traducoes` });
    await new Promise(r => setTimeout(r, 1200));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/verified_light_mobile_orcamento.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved verified_light_mobile_orcamento.png');

    ws.close();
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    edgeProc.kill();
    try {
      const { execSync } = require('child_process');
      execSync(`taskkill /F /T /PID ${nextProc.pid}`);
    } catch {}
    console.log('Verification finished!');
  }
}

run();
