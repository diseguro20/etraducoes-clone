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
    '--remote-debugging-port=9246',
    'https://traduztudo.vercel.app/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9246/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));

    // Verify elements
    const check = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify({
        hasHeaderBtn: !!document.querySelector('.header-lang-button'),
        hasFloatingBtn: !!document.querySelector('.floating-lang-toggle')
      })`
    });
    console.log('Live check elements:', check.result.value);

    // Open modal
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.header-lang-button').click()`
    });
    await new Promise(r => setTimeout(r, 600));

    // Take screenshot of open modal on live site
    const liveModal = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const modalPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'live_lang_modal.png');
    fs.writeFileSync(modalPath, Buffer.from(liveModal.data, 'base64'));
    console.log('Saved ' + modalPath);

    // Click English
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const btns = Array.from(document.querySelectorAll('.lang-option-btn'));
        const enBtn = btns.find(b => b.innerText.includes('English') || b.innerText.includes('Inglês'));
        if (enBtn) enBtn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 3000));

    // Check translated text
    const textCheck = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify({
        h1: document.querySelector('h1')?.innerText,
        title: document.title
      })`
    });
    console.log('After selecting English on live site:', textCheck.result.value);

    // Capture screenshot of live translated page
    const liveTranslated = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const transPath = path.resolve(__dirname, '..', 'public', 'screenshots', 'live_lang_translated_en.png');
    fs.writeFileSync(transPath, Buffer.from(liveTranslated.data, 'base64'));
    console.log('Saved ' + transPath);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edgeProc.kill();
  }
}
run();
