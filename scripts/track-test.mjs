// Teste de ponta a ponta do rastreamento: abre o site "como anúncio" e confere o dataLayer, o consentimento e a origem.
//
// Uso (dois terminais):
//   VITE_GTM_ID=GTM-TEST999 npm run build && npx vite preview --port 4177
//   npm run test:tracking -- http://localhost:4177/
//
// Chrome: usa CHROME_PATH ou procura o Chrome instalado. TEST_GTM_ID muda o ID de teste (padrão GTM-TEST999).
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] || "http://localhost:4177/";
const TEST_ID = process.env.TEST_GTM_ID || "GTM-TEST999";
const CHROME =
  process.env.CHROME_PATH ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find(existsSync);
if (!CHROME) throw new Error("Chrome não encontrado: defina CHROME_PATH");

const dir = join(process.env.TEMP || process.env.TMPDIR || ".", "crescer-track-" + Date.now());
mkdirSync(dir, { recursive: true });
const port = 9600 + Math.floor(Math.random() * 300);
const chrome = spawn(CHROME, ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, "--window-size=1400,900", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 60 && !target; i++) {
  await sleep(300);
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
const requests = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  } else if (m.method === "Network.requestWillBeSent") requests.push(m.params.request.url);
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) return "ERRO: " + JSON.stringify(r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text);
  return r.result?.result?.value;
};
await send("Page.enable");
await send("Network.enable");
// Não abre o WhatsApp nem disca de verdade durante o teste.
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `window.open = () => ({}); document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a'); if (a && /wa\\.me|^tel:/.test(a.href)) e.preventDefault(); }, true);`,
});

let ok = 0;
let fail = 0;
const check = (name, cond, extra = "") => {
  cond ? ok++ : fail++;
  console.log(`${cond ? "  ✔" : "  ✘"} ${name}${extra ? "  — " + extra : ""}`);
};
const dl = async () => JSON.parse(await ev(`JSON.stringify(window.dataLayer.map(x => (x && typeof x.length === 'number' && !x.event && x[0]) ? { cmd: Array.from(x) } : x))`));

console.log("\n1) Visitante vindo de anúncio (gclid + utm), GTM ligado com ?track=1");
await send("Page.navigate", { url: `${base}?track=1&utm_source=google&utm_medium=cpc&utm_campaign=123456&gclid=TESTE123` });
await sleep(7000);
let d = await dl();
const cmds = d.filter((x) => x.cmd).map((x) => x.cmd);
const consentDefault = cmds.find((c) => c[0] === "consent" && c[1] === "default");
check("consentimento padrão negado (ad_storage, ad_user_data, ad_personalization, analytics_storage)", consentDefault && ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"].every((k) => consentDefault[2][k] === "denied"));
check("consent default vem antes do gtm.js", d.findIndex((x) => x.cmd?.[0] === "consent") < d.findIndex((x) => x["gtm.start"]) || d.findIndex((x) => x["gtm.start"]) === -1);
check("url_passthrough e ads_data_redaction ligados", cmds.some((c) => c[0] === "set" && c[1] === "url_passthrough" && c[2] === true) && cmds.some((c) => c[0] === "set" && c[1] === "ads_data_redaction" && c[2] === true));
check("GTM carregado só com ?track=1", requests.some((u) => u.includes("googletagmanager.com/gtm.js?id=" + TEST_ID)), requests.filter((u) => u.includes("googletagmanager")).join(" | ") || "nenhum pedido");
check("noscript do GTM no <body>", await ev(`document.documentElement.innerHTML.includes('ns.html?id=${TEST_ID}')`));
check("origem guardada na sessão", (await ev(`sessionStorage.getItem('crescer-attr')`))?.includes("TESTE123"));

console.log("\n2) Cliques de conversão");
await ev(`document.querySelectorAll('a[data-lead-channel="whatsapp"]')[1].click(); 1`);
await sleep(300);
await ev(`const a=document.querySelectorAll('a[data-lead-channel="whatsapp"]')[1]; a.click(); a.click(); 1`); // toque duplo
await sleep(2300);
await ev(`document.querySelectorAll('a[data-lead-channel="whatsapp"]')[2].click(); 1`);
await ev(`document.querySelector('a[data-lead-channel="phone"]').click(); 1`);
await sleep(500);
d = await dl();
const leads = d.filter((x) => x.event === "generate_lead");
check("WhatsApp: toque duplo conta uma vez; depois de 2 s conta de novo", leads.filter((l) => l.method === "whatsapp").length === 2, `whatsapp=${leads.filter((l) => l.method === "whatsapp").length}`);
const KNOWN = ["nav", "menu_mobile", "hero", "especialidades", "consulta_demanda", "cursos", "como_agendar", "faq", "contato", "formulario", "rodape", "botao_flutuante", "barra_mobile", "card_medica", "servicos"];
const locs = JSON.parse(await ev(`JSON.stringify([...new Set([...document.querySelectorAll('[data-lead-location]')].map(a => a.dataset.leadLocation))])`));
check("todo local de clique da página está na lista conhecida (nenhum com especialidade no nome)", locs.every((l) => KNOWN.includes(l)), locs.filter((l) => !KNOWN.includes(l)).join(", ") || `${locs.length} locais`);
check("generate_lead de telefone", leads.some((l) => l.method === "phone"));
check("cada conversão tem lead_id único", new Set(leads.map((l) => l.lead_id)).size === leads.length && leads.every((l) => l.lead_id), leads.map((l) => l.lead_id).join(", "));
const href = await ev(`document.querySelectorAll('a[data-lead-channel="whatsapp"]')[1].href`);
check("WhatsApp leva a origem do anúncio", decodeURIComponent(href).includes("(origem: google / 123456)"), decodeURIComponent(href).split("\n").pop());

console.log("\n3) Formulário");
await ev(`document.getElementById('contato').scrollIntoView(); 1`);
await sleep(1500);
await ev(`(() => { const f = document.querySelector('form'); const set = (el, v) => { const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };
  f.querySelector('input[name=name]').dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
  set(f.querySelector('input[name=name]'), 'Maria Teste Silva'); set(f.querySelector('input[name=phone]'), '(96) 98888-7777'); set(f.querySelector('select[name=age]'), f.querySelector('select[name=age]').options[3].value); set(f.querySelector('select[name=topic]'), f.querySelector('select[name=topic]').options[2].value); f.requestSubmit(); return 1; })()`);
await sleep(800);
d = await dl();
check("form_start e form_submit", d.some((x) => x.event === "form_start") && d.some((x) => x.event === "form_submit"), d.filter((x) => x.event).map((x) => x.event).join(", "));
check("generate_lead method=form", d.some((x) => x.event === "generate_lead" && x.method === "form"));
check("nenhum nome, telefone ou assunto no dataLayer", !/Maria|Teste Silva|98888|7777|Gastro|Pneumo|Alergia/i.test(JSON.stringify(d).replace(/"section_id":"[^"]*"/g, "")));

console.log("\n4) Privacidade nos demais eventos");
await ev(`document.getElementById('equipe').scrollIntoView(); 1`);
await sleep(1500);
await ev(`document.querySelector('#equipe article button').click(); 1`);
await sleep(900);
d = await dl();
const doc = d.find((x) => x.event === "doctor_open");
check("doctor_open sem médica/especialidade", doc && Object.keys(doc).filter((k) => !k.startsWith("gtm.")).join(",") === "event", JSON.stringify(doc));
check("nenhum lead_click com detail", !d.some((x) => x.lead_detail));
check("section_view dispara uma vez por seção", (() => { const s = d.filter((x) => x.event === "section_view").map((x) => x.section_id); return s.length > 0 && new Set(s).size === s.length; })(), d.filter((x) => x.event === "section_view").map((x) => x.section_id).join(", "));

console.log("\n5) Consentimento");
check("aviso de cookies visível com Aceitar", await ev(`[...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Aceitar')`));
await ev(`[...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Aceitar').click(); 1`);
await sleep(600);
d = await dl();
const upd = d.filter((x) => x.cmd?.[0] === "consent" && x.cmd[1] === "update").map((x) => x.cmd[2]);
check("Aceitar envia consent update com os 4 sinais granted", upd.length === 1 && ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"].every((k) => upd[0][k] === "granted"), JSON.stringify(upd[0]));
check("evento consent_update=granted para o gatilho do GTM", d.some((x) => x.event === "consent_update" && x.consent_state === "granted"));

console.log("\n6) Volta do mesmo visitante (consentimento guardado)");
await send("Page.navigate", { url: `${base}?track=1` });
await sleep(5000);
d = await dl();
const firstUpdate = d.findIndex((x) => x.cmd?.[0] === "consent" && x.cmd[1] === "update");
const gtmStart = d.findIndex((x) => x["gtm.start"]);
check("consent update granted aplicado antes de o GTM carregar", firstUpdate !== -1 && (gtmStart === -1 || firstUpdate < gtmStart));
check("não repete o aviso de cookies", !(await ev(`[...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Aceitar')`)));

console.log("\n7) Prévia sem ?track=1 não manda nada ao GTM");
requests.length = 0;
await send("Page.navigate", { url: base });
await sleep(4000);
check("sem pedido ao googletagmanager.com", !requests.some((u) => /googletagmanager\.com\/gtm\.js/.test(u)));

console.log(`\n${ok} ok, ${fail} falhas`);
ws.close();
chrome.kill();
process.exit(fail ? 1 : 0);
