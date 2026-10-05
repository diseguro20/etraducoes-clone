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

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9260',
    'https://traduztudo.com/'
  ]);
  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await getJson('http://localhost:9260/json');
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

    // Scroll to the footer
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = document.querySelector('footer');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));

    const ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const p = path.resolve(__dirname, '..', 'public', 'screenshots', 'verify_live_footer_prod.png');
    fs.writeFileSync(p, Buffer.from(ss.data, 'base64'));
    console.log('Saved live footer screenshot: ' + p);

    // Also navigate to /contato and screenshot the address
    await sendCdp(ws, 'Page.navigate', { url: 'https://traduztudo.com/contato' });
    await new Promise(r => setTimeout(r, 3000));

    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `(function() {
        const el = Array.from(document.querySelectorAll('span, h2')).find(e => e.innerText.includes('ESCRITÓRIO') || e.innerText.includes('ENDEREÇO'));
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const ssContato = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const pContato = path.resolve(__dirname, '..', 'public', 'screenshots', 'verify_live_contato_prod.png');
    fs.writeFileSync(pContato, Buffer.from(ssContato.data, 'base64'));
    console.log('Saved live contato screenshot: ' + pContato);

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    try { edgeProc.kill(); } catch {}
  }
}

main();
