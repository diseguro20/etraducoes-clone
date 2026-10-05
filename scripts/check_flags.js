const { spawn } = require('child_process');
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

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9230',
    'https://traduztudo.vercel.app/'
  ]);
  await new Promise(r => setTimeout(r, 3000));

  try {
    const list = await getJson('http://localhost:9230/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // Desktop viewport (where the flags map shows)
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 2000,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));

    // Check the .img-map computed style
    const check = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify((function() {
        const imgMap = document.querySelector('.img-map');
        const cs = imgMap ? window.getComputedStyle(imgMap) : null;
        const flags = imgMap ? imgMap.querySelectorAll('a') : [];
        const flagInfo = [];
        flags.forEach(f => {
          const fcs = window.getComputedStyle(f);
          const rect = f.getBoundingClientRect();
          flagInfo.push({
            class: f.className,
            display: fcs.display,
            position: fcs.position,
            bottom: fcs.bottom,
            left: fcs.left,
            right: fcs.right,
            rectX: Math.round(rect.x),
            rectY: Math.round(rect.y),
            rectW: Math.round(rect.width),
            rectH: Math.round(rect.height)
          });
        });
        return {
          imgMapExists: !!imgMap,
          imgMapDisplay: cs ? cs.display : null,
          imgMapPosition: cs ? cs.position : null,
          imgMapWidth: cs ? cs.width : null,
          imgMapLeft: cs ? cs.left : null,
          imgMapBottom: cs ? cs.bottom : null,
          flagCount: flags.length,
          flags: flagInfo
        };
      })())`
    });
    console.log('Desktop check:', check.result.value);

    // Full-page screenshot showing the flags area
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `window.scrollTo(0, 600)`
    });
    await new Promise(r => setTimeout(r, 500));

    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.resolve(__dirname, '..', 'public', 'screenshots', 'flags_desktop_area.png'), Buffer.from(ss.data, 'base64'));
    console.log('Saved flags_desktop_area.png');

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edgeProc.kill();
  }
}
run();
