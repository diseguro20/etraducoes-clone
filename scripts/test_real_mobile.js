const { spawn } = require('child_process');
const http = require('http');

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

    // Override to mobile device (iPhone 375x812)
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });

    await new Promise(r => setTimeout(r, 1000));

    const evalRes = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (function() {
          const bodyWidth = document.body.scrollWidth;
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          
          const overflowing = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > winWidth + 2) {
              overflowing.push({
                tag: el.tagName,
                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
                id: el.id || '',
                right: Math.round(r.right),
                width: Math.round(r.width),
                html: el.outerHTML ? el.outerHTML.slice(0, 80) : ''
              });
            }
          });

          const menuBtn = document.querySelector('.menu-btn');
          let menuBtnRect = null;
          let menuBtnStyle = null;
          if (menuBtn) {
            const r = menuBtn.getBoundingClientRect();
            const s = window.getComputedStyle(menuBtn);
            menuBtnRect = { top: r.top, right: r.right, left: r.left, width: r.width, height: r.height };
            menuBtnStyle = { display: s.display, visibility: s.visibility, position: s.position, zIndex: s.zIndex, right: s.right, margin: s.margin };
          }

          const logo = document.querySelector('.logo-header');
          let logoRect = logo ? logo.getBoundingClientRect() : null;

          const theme = document.querySelector('.theme-switch-wrapper');
          let themeRect = theme ? theme.getBoundingClientRect() : null;

          return {
            bodyWidth,
            docWidth,
            winWidth,
            menuBtnRect,
            menuBtnStyle,
            logoRect,
            themeRect,
            overflowCount: overflowing.length,
            overflowing: overflowing.slice(0, 15)
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Mobile Emulation Result:', JSON.stringify(evalRes.result.value, null, 2));

    // Capture mobile screenshot with exact device emulation
    const ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const fs = require('fs');
    fs.writeFileSync('public/screenshots/real_mobile_375.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved real_mobile_375.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
