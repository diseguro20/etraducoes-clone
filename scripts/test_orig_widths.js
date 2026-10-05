const { spawn } = require('child_process');
const http = require('http');

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
    '--remote-debugging-port=9237',
    'https://www.etraducoes.com.br/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9237/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    for (const w of [1200, 1280, 1366, 1440]) {
      await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
        width: w,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: false
      });
      await new Promise(r => setTimeout(r, 500));
      const res = await sendCdp(ws, 'Runtime.evaluate', {
        expression: `(function() {
          const m = document.querySelector('.img-map');
          const cs = m ? window.getComputedStyle(m) : null;
          const rect = m ? m.getBoundingClientRect() : null;
          return {
            w: ${w},
            display: cs ? cs.display : null,
            rectX: rect ? Math.round(rect.x) : null,
            rectW: rect ? Math.round(rect.width) : null
          };
        })()`
      });
      console.log('Original at width', w, res.result.value);
    }

    ws.close();
  } finally {
    edgeProc.kill();
  }
}
run();
