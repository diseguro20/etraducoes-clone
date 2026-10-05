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
    '--remote-debugging-port=9228',
    'https://traduztudo.com'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9228/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));

    // Click wpp-btn
    const clickRes = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.getElementById('wpp-btn');
          if (btn) {
            btn.click();
            const popup = document.getElementById('wpp-popup');
            return {
              btnFound: true,
              popupFound: !!popup,
              popupDisplay: popup ? getComputedStyle(popup).display : null,
              popupHtml: popup ? popup.outerHTML : null
            };
          }
          return { btnFound: false };
        })()
      `,
      returnByValue: true
    });
    console.log('Click result:', clickRes.result.value);

    await new Promise(r => setTimeout(r, 1000));
    const ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/live_wpp_click.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved screenshot to scripts/live_wpp_click.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edgeProc.kill();
  }
}
run();
