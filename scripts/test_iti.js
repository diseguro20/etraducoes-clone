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
    '--remote-debugging-port=9239',
    'https://traduztudo.com'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9239/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    const res = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const inp = document.querySelector('#whatsapp');
        const iti = document.querySelector('.iti');
        const selectedFlag = document.querySelector('.iti__selected-flag');
        const selectedDialCode = document.querySelector('.iti__selected-dial-code');
        return {
          inpPadLeft: inp ? window.getComputedStyle(inp).paddingLeft : null,
          inpVal: inp ? inp.value : null,
          inpPlaceholder: inp ? inp.placeholder : null,
          flagBoxWidth: selectedFlag ? selectedFlag.offsetWidth : null,
          dialCodeText: selectedDialCode ? selectedDialCode.textContent : null,
          html: iti ? iti.outerHTML.slice(0, 400) : null
        };
      })()`,
      returnByValue: true
    });

    console.log('Result:', res.result.value);
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
