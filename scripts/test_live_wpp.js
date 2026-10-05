const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://traduztudo.com', { waitUntil: 'networkidle2' });

  // Click #wpp-btn
  await page.click('#wpp-btn');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/wpp_click_live.png' });
  console.log('Screenshot saved to scripts/wpp_click_live.png');

  const popupHtml = await page.evaluate(() => {
    const el = document.getElementById('wpp-popup');
    return el ? el.outerHTML : 'NOT FOUND';
  });
  console.log('Popup HTML on live:', popupHtml);

  await browser.close();
})();
