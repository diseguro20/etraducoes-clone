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
  const port = 3015;
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
    '--remote-debugging-port=9245',
    `http://localhost:${port}/`
  ]);
  await new Promise(r => setTimeout(r, 3000));

  try {
    const list = await getJson('http://localhost:9245/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // 1. Desktop Test - verify buttons exist
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    const checkButtons = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify((function() {
        const headerBtn = document.querySelector('.header-lang-button');
        const floatingBtn = document.querySelector('.floating-lang-toggle');
        return {
          hasHeaderBtn: !!headerBtn,
          headerBtnText: headerBtn ? headerBtn.innerText : null,
          hasFloatingBtn: !!floatingBtn,
          floatingBtnText: floatingBtn ? floatingBtn.innerText : null
        };
      })())`
    });
    console.log('Buttons check:', checkButtons.result.value);

    // 2. Click the header language button to open modal
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const btn = document.querySelector('.header-lang-button');
        if (btn) btn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot of desktop modal
    const deskModalSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const deskModalPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'lang_modal_desktop.png');
    fs.writeFileSync(deskModalPath, Buffer.from(deskModalSS.data, 'base64'));
    console.log('Saved ' + deskModalPath);

    // 3. Mobile Test - iPhone 390x844
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));

    const mobModalSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const mobModalPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'lang_modal_mobile.png');
    fs.writeFileSync(mobModalPath, Buffer.from(mobModalSS.data, 'base64'));
    console.log('Saved ' + mobModalPath);

    // Close modal
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const close = document.querySelector('.lang-modal-close');
        if (close) close.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 500));

    // Capture mobile topbar screenshot showing the button
    const mobTopbarSS = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const mobTopbarPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'lang_mobile_topbar.png');
    fs.writeFileSync(mobTopbarPath, Buffer.from(mobTopbarSS.data, 'base64'));
    console.log('Saved ' + mobTopbarPath);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    try { edgeProc.kill(); } catch {}
    try { execSync(`taskkill /F /T /PID ${nextProcess.pid}`); } catch {}
  }
}

main();
