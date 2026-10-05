const fs = require('fs');
const path = require('path');

function removeOurJobs(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeOurJobs(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      while (content.includes('our-jobs')) {
        const jobsIdx = content.indexOf('our-jobs');
        const start = content.lastIndexOf('<div', jobsIdx);
        const endUl = content.indexOf('</ul>', jobsIdx);
        if (start !== -1 && endUl !== -1) {
          const end = content.indexOf('</div>', endUl) + 6;
          content = content.substring(0, start) + content.substring(end);
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Removed our-jobs from:', fullPath);
        } else {
          break;
        }
      }
    }
  }
}

removeOurJobs('src/app');
console.log('Done removing our-jobs.');
