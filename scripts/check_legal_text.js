const fs = require('fs');

['src/app/termos-de-uso/page.tsx', 'src/app/politicas-de-privacidade/page.tsx'].forEach(f => {
  console.log(`\n================= ${f} =================`);
  const c = fs.readFileSync(f, 'utf8');
  // find CNPJ, names, emails, addresses
  const matches = [...c.matchAll(/(?:CNPJ|e-mail|email|contato@|razão social|razao social|endereço|endereco|etradu|traduztudo)/gi)];
  matches.forEach(m => {
    console.log(c.substring(Math.max(0, m.index - 40), Math.min(c.length, m.index + 80)).replace(/\n/g, ' '));
  });
});
