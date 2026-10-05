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

async function inspect(url, port) {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    url
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson(`http://localhost:${port}/json`);
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    const result = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify((function() {
        const solutions = document.querySelector('.solutions');
        const imgMap = document.querySelector('.img-map');
        const mapImg = imgMap ? imgMap.querySelector('img') : null;
        const sRect = solutions ? solutions.getBoundingClientRect() : null;
        const mRect = imgMap ? imgMap.getBoundingClientRect() : null;
        const iRect = mapImg ? mapImg.getBoundingClientRect() : null;
        const parent = imgMap ? imgMap.parentElement.getBoundingClientRect() : null;
        return {
          solutions: sRect ? { y: Math.round(sRect.y), h: Math.round(sRect.height) } : null,
          imgMap: mRect ? { y: Math.round(mRect.y), h: Math.round(mRect.height), top: window.getComputedStyle(imgMap).top, bottom: window.getComputedStyle(imgMap).bottom } : null,
          mapImg: iRect ? { y: Math.round(iRect.y), h: Math.round(iRect.height) } : null,
          parent: parent ? { y: Math.round(parent.y), h: Math.round(parent.h) } : null
        };
      })())`
    });

    ws.close();
    edgeProc.kill();
    return JSON.parse(result.result.value);
  } catch (e) {
    edgeProc.kill();
    throw e;
  }
}

async function main() {
  const orig = await inspect('https://www.etraducoes.com.br/', 9236);
  console.log('Original layout:', orig);
}

main();
