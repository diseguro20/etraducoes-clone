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

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));

    // Evaluate all elements on the entire page
    const evalRes = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (function() {
          const winWidth = window.innerWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          
          const overflowing = [];
          document.querySelectorAll('*').forEach(el => {
            // Check offsetWidth, clientWidth, and bounding rect
            const r = el.getBoundingClientRect();
            if (r.right > winWidth + 5 || el.scrollWidth > winWidth + 5 || r.width > winWidth + 5) {
              overflowing.push({
                tag: el.tagName,
                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
                id: el.id || '',
                width: Math.round(r.width),
                right: Math.round(r.right),
                scrollWidth: el.scrollWidth,
                html: el.outerHTML ? el.outerHTML.slice(0, 80) : ''
              });
            }
          });

          return {
            winWidth,
            docScrollWidth,
            bodyScrollWidth,
            overflowCount: overflowing.length,
            overflowing: overflowing
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Full Page Overflow Inspection:', JSON.stringify(evalRes.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
