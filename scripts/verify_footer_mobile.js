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
  const port = 3022;
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
    '--remote-debugging-port=9258',
    `http://localhost:${port}/`
  ]);
  await new Promise(r => setTimeout(r, 3000));

  try {
    const list = await getJson('http://localhost:9258/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // Mobile viewport (iPhone 14 / standard 390px)
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll to the footer office
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = Array.from(document.querySelectorAll('.title-footer')).find(e => e.innerText.includes('Escritório'));
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const p = path.resolve(__dirname, '..', 'public', 'screenshots', 'verify_footer_office_mobile.png');
    fs.writeFileSync(p, Buffer.from(ss.data, 'base64'));
    console.log('Saved mobile screenshot of footer: ' + p);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    try { edgeProc.kill(); } catch {}
    try { execSync(`taskkill /F /T /PID ${nextProcess.pid}`); } catch {}
  }
}

main();
