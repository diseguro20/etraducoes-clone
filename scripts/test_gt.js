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
    '--remote-debugging-port=9242',
    'https://traduztudo.vercel.app/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9242/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    const testResult = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `new Promise((resolve) => {
        window.googleTranslateElementInit = function() {
          new window.google.translate.TranslateElement({
            pageLanguage: 'pt',
            autoDisplay: false
          }, 'gt_test');
          setTimeout(() => {
            const select = document.querySelector('.goog-te-combo');
            resolve(JSON.stringify({
              initialized: true,
              hasSelect: !!select,
              optionsCount: select ? select.options.length : 0
            }));
          }, 1500);
        };

        const div = document.createElement('div');
        div.id = 'gt_test';
        div.style.display = 'none';
        document.body.appendChild(div);

        const s = document.createElement('script');
        s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(s);
      })`,
      awaitPromise: true
    });

    console.log('Google Translate test:', testResult.result.value);

    const translateResult = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `new Promise((resolve) => {
        const select = document.querySelector('.goog-te-combo');
        if (!select) return resolve(JSON.stringify({ error: 'no select' }));
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
        setTimeout(() => {
          const h1 = document.querySelector('h1');
          resolve(JSON.stringify({
            h1Text: h1 ? h1.innerText : null
          }));
        }, 3000);
      })`,
      awaitPromise: true
    });

    console.log('After switching to EN:', translateResult.result.value);

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    edgeProc.kill();
  }
}
run();
