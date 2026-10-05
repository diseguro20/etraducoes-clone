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

function evaluateCdp(wsUrl, expression) {
  return new Promise((resolve, reject) => {
    // Built-in WebSocket in Node 21+
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: { expression, returnByValue: true }
      }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1) {
        ws.close();
        if (msg.result?.result) {
          resolve(msg.result.result.value);
        } else {
          resolve(msg);
        }
      }
    };
    ws.onerror = reject;
  });
}

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=375,812',
    'https://traduztudo.vercel.app/'
  ]);

  // wait 2s
  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9222/json');
    console.log('Pages count:', list.length);
    const page = list.find(p => p.type === 'page');
    if (!page) {
      console.log('No page found');
      return;
    }

    const res = await evaluateCdp(page.webSocketDebuggerUrl, `
      (function() {
        const bodyWidth = document.body.scrollWidth;
        const innerWidth = window.innerWidth;
        const overflowing = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > innerWidth + 5) {
            overflowing.push({
              tag: el.tagName,
              className: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 50) : '') : '',
              width: Math.round(r.width),
              right: Math.round(r.right),
              text: el.innerText ? el.innerText.slice(0, 30) : ''
            });
          }
        });
        
        const menuBtn = document.querySelector('.menu-btn');
        let menuBtnInfo = null;
        if (menuBtn) {
          const r = menuBtn.getBoundingClientRect();
          const s = window.getComputedStyle(menuBtn);
          menuBtnInfo = {
            rect: { top: r.top, right: r.right, width: r.width, height: r.height },
            display: s.display,
            visibility: s.visibility,
            opacity: s.opacity,
            position: s.position,
            zIndex: s.zIndex,
            margin: s.margin
          };
        }

        const topbar = document.querySelector('.topbar');
        const themeWrapper = document.querySelector('.theme-switch-wrapper');
        let themeInfo = null;
        if (themeWrapper) {
          const r = themeWrapper.getBoundingClientRect();
          themeInfo = { top: r.top, right: r.right, left: r.left, width: r.width, height: r.height };
        }

        return {
          bodyWidth,
          innerWidth,
          menuBtnInfo,
          themeInfo,
          overflowCount: overflowing.length,
          topOverflowing: overflowing.slice(0, 10)
        };
      })()
    `);

    console.log('Diagnosis Result:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error in diagnosis:', err);
  } finally {
    proc.kill();
  }
}

run();
