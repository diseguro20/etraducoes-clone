const { execSync } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const getOut = (name) => path.resolve(__dirname, '..', 'public', 'screenshots', name);

try {
  console.log('Capturing live mobile screenshot...');
  execSync(
    `"${edgePath}" --headless --disable-gpu --screenshot="${getOut('live_mobile_home.png')}" --window-size=375,812 "https://traduztudo.vercel.app/"`,
    { stdio: 'inherit' }
  );

  console.log('Capturing live desktop screenshot...');
  execSync(
    `"${edgePath}" --headless --disable-gpu --screenshot="${getOut('live_desktop_home.png')}" --window-size=1440,900 "https://traduztudo.vercel.app/"`,
    { stdio: 'inherit' }
  );

  console.log('Capturing live mobile orcamento...');
  execSync(
    `"${edgePath}" --headless --disable-gpu --screenshot="${getOut('live_mobile_orcamento.png')}" --window-size=375,812 "https://traduztudo.vercel.app/orcamento-traducoes"`,
    { stdio: 'inherit' }
  );

  console.log('All live screenshots captured successfully!');
} catch (err) {
  console.error('Error:', err.message);
}
