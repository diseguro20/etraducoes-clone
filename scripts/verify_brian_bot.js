const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

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
    '--remote-debugging-port=9230',
    'http://localhost:3005/'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9230/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Opening chat...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('wpp-btn').click();`
    });
    await new Promise(r => setTimeout(r, 1600));

    // Type name via React input setter
    console.log('Submitting name...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const input = document.querySelector('.brian-chat-input');
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(input, 'Roberto Andrade');
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        })()
      `
    });
    await new Promise(r => setTimeout(r, 200));
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.brian-chat-send-btn').click();`
    });
    await new Promise(r => setTimeout(r, 1200));

    // Screenshot Step 1 (Services)
    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/wpp_chat_step1.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/wpp_chat_step1.png');

    // Click "Tradução Juramentada" chip
    console.log('Selecting service...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const chips = Array.from(document.querySelectorAll('.brian-chip-btn'));
          const chip = chips.find(c => c.textContent.includes('Juramentada'));
          if (chip) chip.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1200));

    // Screenshot Step 2 (Languages)
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/wpp_chat_step2.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/wpp_chat_step2.png');

    // Click "Português ➔ Inglês" chip
    console.log('Selecting language...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const chips = Array.from(document.querySelectorAll('.brian-chip-btn'));
          const chip = chips.find(c => c.textContent.includes('Inglês'));
          if (chip) chip.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1200));

    // Screenshot Step 3 (Phone prompt)
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/wpp_chat_step3.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/wpp_chat_step3.png');

    // Type phone
    console.log('Submitting phone...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const input = document.querySelector('.brian-chat-input');
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(input, '(11) 98285-4183');
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        })()
      `
    });
    await new Promise(r => setTimeout(r, 200));
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.brian-chat-send-btn').click();`
    });
    await new Promise(r => setTimeout(r, 1800));

    // Screenshot Step 4 (Final CTA card + message)
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/wpp_chat_step4.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/wpp_chat_step4.png');

    // Mobile Viewport test
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1000));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/wpp_chat_mobile.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved scripts/wpp_chat_mobile.png');

    ws.close();
  } catch (err) {
    console.error('Error running test:', err);
  } finally {
    edgeProc.kill();
  }
}

run();
