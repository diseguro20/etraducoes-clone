const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

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
    '--remote-debugging-port=9241',
    'http://localhost:3010'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const list = await getJson('http://localhost:9241/json');
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    // 1. Desktop Light Mode
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await sendCdp(ws, 'Runtime.evaluate', { expression: `localStorage.removeItem('theme'); document.documentElement.removeAttribute('data-theme'); document.body.classList.remove('theme-dark');` });
    await new Promise(r => setTimeout(r, 1000));

    let ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_hero_light.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_hero_light.png');

    // 2. Desktop Dark Mode Hero
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.documentElement.setAttribute('data-theme', 'dark'); document.body.classList.add('theme-dark');` });
    await new Promise(r => setTimeout(r, 600));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_hero_dark.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_hero_dark.png');

    // 3. Section 2: Global Network & Map
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.querySelector('#tradocs').scrollIntoView({ behavior: 'instant' });` });
    await new Promise(r => setTimeout(r, 600));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_network.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_network.png');

    // 4. Section 3: Apostilamento
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.querySelector('.modern-apostille-section').scrollIntoView({ behavior: 'instant' });` });
    await new Promise(r => setTimeout(r, 600));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_apostille.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_apostille.png');

    // 5. Section 4: Steps (Como Funciona)
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.querySelector('.modern-steps-section').scrollIntoView({ behavior: 'instant' });` });
    await new Promise(r => setTimeout(r, 600));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_steps.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_steps.png');

    // 5b. Section 6: Brian Bot
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.querySelector('.modern-brian-section').scrollIntoView({ behavior: 'instant' });` });
    await new Promise(r => setTimeout(r, 600));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_brian.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_brian.png');

    // 5c. Section 7: Google Reviews
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.querySelector('.modern-reviews-section').scrollIntoView({ behavior: 'instant' });` });
    await new Promise(r => setTimeout(r, 600));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_reviews.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_reviews.png');

    // 5d. Section 8: Prefooter Banner
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.querySelector('.modern-prefooter-section').scrollIntoView({ behavior: 'instant' });` });
    await new Promise(r => setTimeout(r, 600));
    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_desktop_prefooter.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_desktop_prefooter.png');

    // 6. Mobile Light
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await sendCdp(ws, 'Runtime.evaluate', { expression: `window.scrollTo(0, 0); localStorage.removeItem('theme'); document.documentElement.removeAttribute('data-theme'); document.body.classList.remove('theme-dark');` });
    await new Promise(r => setTimeout(r, 800));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_mobile_hero_light.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_mobile_hero_light.png');

    // 7. Mobile Dark
    await sendCdp(ws, 'Runtime.evaluate', { expression: `document.documentElement.setAttribute('data-theme', 'dark'); document.body.classList.add('theme-dark');` });
    await new Promise(r => setTimeout(r, 600));

    ss = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('public/screenshots/new_mobile_hero_dark.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved new_mobile_hero_dark.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

run();
