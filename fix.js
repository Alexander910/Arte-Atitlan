const fs = require('fs');

function fix(p) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<div className="app">[\s\S]*?<div className="main">/, '<>');
  c = c.replace(/<\/div>\s*<\/div>\s*\);\s*\}\s*$/, '</>\n  );\n}\n');
  fs.writeFileSync(p, c);
  console.log('Fixed', p);
}

fix('app/page.tsx');
fix('app/ventas/page.tsx');
fix('app/productos/page.tsx');
fix('app/clientes/page.tsx');
