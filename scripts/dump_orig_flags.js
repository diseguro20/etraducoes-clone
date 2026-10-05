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
    '--remote-debugging-port=9235',
    'https://www.etraducoes.com.br/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9235/json');
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
        const mapRect = imgMap.getBoundingClientRect();
        const mapImg = imgMap.querySelector('img');
        const imgRect = mapImg.getBoundingClientRect();
        
        const flags = Array.from(imgMap.querySelectorAll('a')).map(a => {
          const acs = window.getComputedStyle(a);
          const rect = a.getBoundingClientRect();
          return {
            class: a.className,
            bottom: acs.bottom,
            top: acs.top,
            left: acs.left,
            right: acs.right,
            // relative to mapImg
            relX: Math.round(rect.x - imgRect.x),
            relY: Math.round(rect.y - imgRect.y)
          };
        });

        return {
          mapImg: {
            x: Math.round(imgRect.x),
            y: Math.round(imgRect.y),
            w: Math.round(imgRect.width),
            h: Math.round(imgRect.height)
          },
          flags
        };
      })())`
    });

    console.log('ALL ORIGINAL FLAGS:\n', JSON.stringify(JSON.parse(data.result.value), null, 2));

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edgeProc.kill();
  }
}
run();
