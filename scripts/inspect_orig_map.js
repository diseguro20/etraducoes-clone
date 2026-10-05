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
    '--remote-debugging-port=9233',
    'https://www.etraducoes.com.br/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9233/json');
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

    const data = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify((function() {
        const imgMap = document.querySelector('.img-map');
        if (!imgMap) return { error: 'no img-map' };
        const cs = window.getComputedStyle(imgMap);
        const parent = imgMap.parentElement;
        const pcs = window.getComputedStyle(parent);
        const mapImg = imgMap.querySelector('img');
        const mcs = mapImg ? window.getComputedStyle(mapImg) : null;
        
        const flags = Array.from(imgMap.querySelectorAll('a')).map(a => {
          const acs = window.getComputedStyle(a);
          const rect = a.getBoundingClientRect();
          return {
            class: a.className,
            position: acs.position,
            bottom: acs.bottom,
            top: acs.top,
            left: acs.left,
            right: acs.right,
            transform: acs.transform,
            display: acs.display,
            rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) }
          };
        });

        const mapRect = imgMap.getBoundingClientRect();
        const imgRect = mapImg ? mapImg.getBoundingClientRect() : null;

        return {
          parent: {
            class: parent.className,
            position: pcs.position,
            display: pcs.display
          },
          imgMap: {
            position: cs.position,
            top: cs.top,
            bottom: cs.bottom,
            left: cs.left,
            right: cs.right,
            width: cs.width,
            height: cs.height,
            rect: { x: Math.round(mapRect.x), y: Math.round(mapRect.y), w: Math.round(mapRect.width), h: Math.round(mapRect.height) }
          },
          mapImg: {
            position: mcs ? mcs.position : null,
            bottom: mcs ? mcs.bottom : null,
            rect: imgRect ? { x: Math.round(imgRect.x), y: Math.round(imgRect.y), w: Math.round(imgRect.width), h: Math.round(imgRect.height) } : null
          },
          flags: flags.slice(0, 8)
        };
      })())`
    });

    console.log('Original site details:\n', JSON.stringify(JSON.parse(data.result.value), null, 2));

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edgeProc.kill();
  }
}
run();
