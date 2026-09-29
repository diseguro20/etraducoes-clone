const { spawn, execSync } = require('child_process');
const http = require('http');

async function waitForServer(port) {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/orcamento-traducoes`, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) resolve();
          else reject(new Error('Status: ' + res.statusCode));
        });
        req.on('error', reject);
        req.setTimeout(1000, () => req.destroy());
      });
      console.log('Server is ready on port ' + port);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

async function main() {
  const port = 3009;
  console.log('Starting next server on port ' + port + '...');
  const nextProcess = spawn('npx.cmd', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore',
  });

  const ready = await waitForServer(port);
  if (!ready) {
    console.error('Failed to start next server');
    try { process.kill(nextProcess.pid); } catch {}
    process.exit(1);
  }

  console.log('Taking screenshot...');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outPath = 'C:\\Users\\diseg\\Documents\\antigravity\\peaceful-curie\\etraducoes-clone\\public\\screenshot_local.png';
  try {
    execSync(
      `"${edgePath}" --headless --disable-gpu --screenshot="${outPath}" --window-size=1440,1080 "http://localhost:${port}/orcamento-traducoes"`,
      { stdio: 'inherit' }
    );
    console.log('Screenshot saved to ' + outPath);
  } catch (err) {
    console.error('Screenshot error:', err.message);
  }

  // Kill server
  try {
    execSync(`taskkill /F /T /PID ${nextProcess.pid}`);
  } catch {}
  console.log('Done!');
}

main();
