// Troca o ID do Google Tag Manager em todos os pontos do index.html.
// Uso: node tools/set-gtm.mjs GTM-ABC1234
import { readFileSync, writeFileSync } from 'node:fs';

const id = process.argv[2] || '';
if (!/^GTM-[A-Z0-9]{4,10}$/.test(id)) {
  console.error('Uso: node tools/set-gtm.mjs GTM-XXXXXXX   (ID do contêiner, formato GTM-ABC1234)');
  process.exit(1);
}

const file = new URL('../index.html', import.meta.url);
let html = readFileSync(file, 'utf8');

const current = html.match(/'dataLayer','(GTM-[A-Z0-9]+)'/)?.[1];
if (!current) { console.error('Não encontrei o snippet do GTM no index.html.'); process.exit(1); }
if (current === id) { console.log(`O ID já é ${id}. Nada a fazer.`); process.exit(0); }

const count = html.split(current).length - 1;
html = html.replaceAll(current, id);
writeFileSync(file, html);
console.log(`OK: ${current} -> ${id} (${count} ocorrências em index.html).`);
