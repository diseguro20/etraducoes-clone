const fs = require('fs');

// Validate programa-de-parceiros by checking for unescaped quotes
const c = fs.readFileSync('src/app/programa-de-parceiros/page.tsx', 'utf8');
const lines = c.split('\n');
const line9 = lines[8]; // 0-indexed, so line 9 in file

console.log('Line 9 length:', line9.length);

// Scan for unescaped quotes inside the string 
// The file has: const bodyHtml = "..."; where content uses \" for quotes
// An unescaped " would appear as: [non-backslash]"
// Let's find all positions of raw " in line 9 after the opening quote
let issues = [];
// Skip first char (opening ") and last char (closing ")
for (let i = 1; i < line9.length - 1; i++) {
  if (line9[i] === '"') {
    // Check how many backslashes precede it
    let backslashes = 0;
    let j = i - 1;
    while (j >= 0 && line9[j] === '\\') {
      backslashes++;
      j--;
    }
    // If even number of backslashes, the quote is "unescaped" from JS perspective
    if (backslashes % 2 === 0) {
      // This is a raw quote that terminates or breaks the string
      issues.push({ pos: i, backslashes, context: JSON.stringify(line9.substring(Math.max(0, i-20), i+20)) });
    }
  }
}

if (issues.length === 0) {
  console.log('No unescaped quotes found! File looks clean.');
} else {
  console.log(`Found ${issues.length} potentially unescaped quotes:`);
  // Only show first 5
  issues.slice(0, 5).forEach(iss => {
    console.log(`  pos ${iss.pos}: backslashes=${iss.backslashes} context=${iss.context}`);
  });
  if (issues.length > 5) console.log(`  ... and ${issues.length - 5} more`);
}
