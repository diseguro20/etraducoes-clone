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
    '--remote-debugging-port=9238',
    'https://www.etraducoes.com.br/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9238/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));

    const res = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify((function() {
        const solutions = document.querySelector('.solutions');
        const container = solutions ? solutions.closest('.container') : null;
        const imgMap = document.querySelector('.img-map');
        const parent = imgMap ? imgMap.parentElement : null;

        function getInfo(el) {
          if (!el) return null;
          const cs = window.getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            class: el.className,
            position: cs.position,
            display: cs.display,
            float: cs.float,
            marginTop: cs.marginTop,
            marginBottom: cs.marginBottom,
            top: cs.top,
            bottom: cs.bottom,
            left: cs.left,
            height: cs.height,
            rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
          };
        }

        return {
          parent: getInfo(parent),
          container: getInfo(container),
          solutions: getInfo(solutions),
          imgMap: getInfo(imgMap)
        };
      })())`
    });

    console.log(JSON.stringify(JSON.parse(res.result.value), null, 2));
    ws.close();
  } finally {
    edgeProc.kill();
  }
}
run();
