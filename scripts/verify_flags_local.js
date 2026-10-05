const { spawn, execSync } = require('child_process');
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
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

async function main() {
  const port = 3012;
  console.log('Starting next server on port ' + port + '...');
  const nextProcess = spawn('npx.cmd', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore',
  });

  const ready = await waitForServer(port);
  if (!ready) {
    console.error('Failed to start next server');
    try { process.kill(nextProcess.pid); } catch {}
    process.exit(1);
  }

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9232',
    `http://localhost:${port}/`
  ]);
  await new Promise(r => setTimeout(r, 3000));

  try {
    const list = await getJson('http://localhost:9232/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // 1. Desktop Test
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to the solutions / map section
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = document.querySelector('.solutions') || document.querySelector('.img-map');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const desktopSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const deskPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'verify_flags_desktop.png');
    fs.writeFileSync(deskPath, Buffer.from(desktopSS.data, 'base64'));
    console.log('Saved ' + deskPath);

    // 2. Mobile Test (390px iPhone viewport)
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to the mobile flags list
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = document.querySelector('.list-tr') || document.querySelector('.solutions');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const mobileSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const mobPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'verify_flags_mobile.png');
    fs.writeFileSync(mobPath, Buffer.from(mobileSS.data, 'base64'));
    console.log('Saved ' + mobPath);

    ws.close();
  } catch (err) {
    console.error('Error during testing:', err);
  } finally {
    try { edgeProc.kill(); } catch {}
    try { execSync(`taskkill /F /T /PID ${nextProcess.pid}`); } catch {}
  }
}

main();
