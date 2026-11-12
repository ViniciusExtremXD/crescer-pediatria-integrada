// Injeta o app renderizado no servidor e o JSON-LD em dist/index.html, para que buscadores
// (e a primeira pintura) recebam a página completa sem precisar rodar JavaScript.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const htmlPath = path.join(root, "dist", "index.html");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const { render, structuredData } = await import(pathToFileURL(serverEntry).href);

const appHtml = render();
const jsonLd = structuredData()
  .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`)
  .join("\n    ");

let html = fs.readFileSync(htmlPath, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("root placeholder not found in dist/index.html");
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
html = html.replace("<!--structured-data-->", jsonLd);
fs.writeFileSync(htmlPath, html);

fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} kB de HTML injetados`);
