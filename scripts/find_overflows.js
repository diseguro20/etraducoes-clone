const { execSync } = require('child_process');
const fs = require('fs');

// We can run a small local server and run headless Edge with a script, or evaluate on the live site
// Let's create an HTML test or CDP script
const http = require('http');

async function checkUrl(url, width, height) {
  // Use edge with remote debugging or console log
  console.log(`Checking overflows on ${url} at ${width}x${height}`);
}

async function main() {
  // Let's write a simple script that Edge can run with --run-all-compositor-stages-before-draw or CDP
}
