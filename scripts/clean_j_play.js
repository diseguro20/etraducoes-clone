const fs = require('fs');

const files = [
  'src/app/traducao-juramentada/page.tsx',
  'src/app/traducao-juramentada-arabe/page.tsx',
  'src/app/traducao-juramentada-coreano/page.tsx',
  'src/app/traducao-juramentada-hebraico/page.tsx',
  'src/app/traducao-juramentada-japones/page.tsx',
  'src/app/traducao-juramentada-para-cidadania-italiana/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Match <span class=\"btn btn-outline j_play\" ... > ... </span>
  const regex = /<span class=\\?"btn btn-outline j_play\\?"[^>]*>[\s\S]*?<\/span>/g;
  if (regex.test(content)) {
    content = content.replace(regex, '<a href=\\"/orcamento-traducoes\\" class=\\"btn btn-outline\\"><i class=\\"far fa-calculator\\"></i> Simular Orçamento Online</a>');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Successfully replaced j_play in:', f);
  } else {
    console.log('No j_play matched in:', f);
  }
});
