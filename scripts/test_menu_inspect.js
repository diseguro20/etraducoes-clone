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
  const port = 3014;
  const nextProc = spawn('npx.cmd', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore'
  });

  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://localhost:' + port + '/', (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) resolve();
          else reject(new Error('Status: ' + res.statusCode));
        });
        req.on('error', reject);
        req.setTimeout(1000, () => req.destroy());
      });
      break;
    } catch {
      await new Promise(r => setTimeout(r, 400));
    }
  }

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9224',
    'http://localhost:' + port + '/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const list = await getJson('http://localhost:9224/json');
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

    const checkState = async () => {
      const res = await sendCdp(ws, 'Runtime.evaluate', {
        expression: `JSON.stringify((function() {
          const btn = document.querySelector('.menu-btn');
          const el = document.querySelector('.mobile-menu');
          const cs = el ? window.getComputedStyle(el) : null;
          return {
            hasBtn: !!btn,
            btnClass: btn ? btn.className : '',
            menuClass: el ? el.className : '',
            display: cs ? cs.display : '',
            opacity: cs ? cs.opacity : '',
            visibility: cs ? cs.visibility : '',
            zIndex: cs ? cs.zIndex : '',
            left: cs ? cs.left : '',
            top: cs ? cs.top : '',
            width: cs ? cs.width : '',
            height: cs ? cs.height : '',
            bg: cs ? cs.backgroundColor : ''
          };
        })())`
      });
      return JSON.parse(res.result.value);
    };

    console.log('Before click:', await checkState());

    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.menu-btn').click()`
    });
    await new Promise(r => setTimeout(r, 600));

    console.log('After click:', await checkState());

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edgeProc.kill();
    try {
      require('child_process').execSync('taskkill /F /T /PID ' + nextProc.pid);
    } catch {}
  }
}
run();
