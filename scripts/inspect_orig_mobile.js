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
    'https://www.etraducoes.com.br/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

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

    const evalRes = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (function() {
          const menuBtn = document.querySelector('.menu-btn');
          const theme = document.querySelector('.theme-switch-wrapper');
          const logo = document.querySelector('.logo-header');
          const topbar = document.querySelector('.topbar');
          
          return {
            menuBtn: menuBtn ? {
              rect: menuBtn.getBoundingClientRect(),
              computed: {
                display: getComputedStyle(menuBtn).display,
                position: getComputedStyle(menuBtn).position,
                right: getComputedStyle(menuBtn).right,
                top: getComputedStyle(menuBtn).top,
                margin: getComputedStyle(menuBtn).margin,
                zIndex: getComputedStyle(menuBtn).zIndex
              }
            } : null,
            theme: theme ? {
              rect: theme.getBoundingClientRect(),
              computed: {
                display: getComputedStyle(theme).display,
                position: getComputedStyle(theme).position,
                margin: getComputedStyle(theme).margin
              }
            } : null,
            logo: logo ? {
              rect: logo.getBoundingClientRect()
            } : null,
            topbar: topbar ? {
              rect: topbar.getBoundingClientRect(),
              html: topbar.outerHTML.slice(0, 500)
            } : null
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Original Site Mobile Inspection:', JSON.stringify(evalRes.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
