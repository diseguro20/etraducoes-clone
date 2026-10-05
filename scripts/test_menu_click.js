const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

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

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });

    await new Promise(r => setTimeout(r, 1000));

    // Click menu button
    const clickRes = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (function() {
          const btn = document.querySelector('.menu-btn');
          if (btn) {
            btn.click();
            return {
              clicked: true,
              mobileMenuClasses: document.querySelector('.mobile-menu')?.className,
              topbarClasses: document.querySelector('.topbar')?.className
            };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });

    console.log('After click:', JSON.stringify(clickRes.result.value, null, 2));

    await new Promise(r => setTimeout(r, 500));

    // Capture screenshot after menu click
    const ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/menu_clicked_375.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved menu_clicked_375.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
