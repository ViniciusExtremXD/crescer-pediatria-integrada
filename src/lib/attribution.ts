/*
 * Origem do visitante (anúncio, busca, rede social), guardada só na sessão.
 *
 * Lê utm_* e os identificadores de clique (gclid, gbraid, wbraid, fbclid, msclkid) assim que o site abre e guarda
 * em sessionStorage (some ao fechar a aba). Serve para uma coisa: a recepção ver de onde veio o contato, porque a
 * mensagem do WhatsApp termina com "(origem: google / 123456)". Nada disso vai para o dataLayer: o GTM e as tags de
 * anúncio leem a própria URL e os cookies do Google (_gcl_aw) pelo Vinculador de conversões.
 */
const KEY = "crescer-attr";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid", "msclkid"] as const;

type Attribution = Partial<Record<(typeof PARAMS)[number], string>>;

function read(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

/** Chame uma vez ao abrir o site. Se a URL trouxer parâmetros novos, eles substituem os antigos (último clique vale). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of PARAMS) {
      const value = qs.get(key);
      if (value) found[key] = value.slice(0, 120);
    }
    if (Object.keys(found).length) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* armazenamento bloqueado: segue sem origem */
  }
}

/** "(origem: google / 123456)" ou null quando o visitante chegou direto. */
export function originTag(): string | null {
  if (typeof window === "undefined") return null;
  const a = read();
  const source = a.utm_source || (a.gclid || a.gbraid || a.wbraid ? "google" : a.fbclid ? "meta" : a.msclkid ? "bing" : "");
  if (!source) return null;
  return `(origem: ${source}${a.utm_campaign ? ` / ${a.utm_campaign}` : ""})`;
}
