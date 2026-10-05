const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const script = `
const btn = document.querySelector('.menu-btn');
if (!btn) {
  console.log('NO .menu-btn found!');
} else {
  const rect = btn.getBoundingClientRect();
  const style = window.getComputedStyle(btn);
  console.log('rect:', JSON.stringify(rect));
  console.log('display:', style.display);
  console.log('visibility:', style.visibility);
  console.log('opacity:', style.opacity);
  console.log('position:', style.position);
  console.log('zIndex:', style.zIndex);
  console.log('top:', style.top, 'right:', style.right);
}
`;

console.log('Evaluating .menu-btn on mobile');
