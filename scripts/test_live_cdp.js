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

async function testLive() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9227',
    'https://traduztudo.vercel.app/'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  try {
    const list = await getJson('http://localhost:9227/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2500));

    const check = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify((function() {
        const btn = document.querySelector('.menu-btn');
        const r = btn ? btn.getBoundingClientRect() : null;
        const cs = btn ? window.getComputedStyle(btn) : null;
        return {
          btnExists: !!btn,
          btnRect: r,
          display: cs ? cs.display : null,
          visibility: cs ? cs.visibility : null,
          position: cs ? cs.position : null,
          right: cs ? cs.right : null,
          top: cs ? cs.top : null,
          innerWidth: window.innerWidth,
          bodyScrollWidth: document.body.scrollWidth
        };
      })())`
    });
    console.log('Live inspection:', check.result.value);

    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/live_cdp_mobile_home.png', Buffer.from(ss.data, 'base64'));

    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.menu-btn')?.click()`
    });
    await new Promise(r => setTimeout(r, 600));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/live_cdp_mobile_menu_open.png', Buffer.from(ss.data, 'base64'));

    ws.close();
    console.log('Live menu screenshot captured!');
  } catch(e) {
    console.error(e);
  } finally {
    edgeProc.kill();
  }
}
testLive();
