const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const path = require('path');
const out = path.join(__dirname, '..', 'public', 'screenshots', 'orig_mobile.png');
execSync(`"${edge}" --headless --disable-gpu --screenshot="${out}" --window-size=375,812 "https://www.etraducoes.com.br/"`);
console.log('Saved ' + out);
