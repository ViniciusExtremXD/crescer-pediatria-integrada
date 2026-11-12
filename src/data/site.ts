/*
 * Conteúdo do site. Fonte: Instagram oficial @crescer.pediatriaintegrada (posts de out–nov/2026),
 * Google Meu Negócio e cartão CNPJ. Itens marcados "A CONFIRMAR" estão listados no README.
 */

export const COMPANY = {
  name: "Crescer Pediatria Integrada",
  short: "Crescer",
  legalName: "CRESCER PED LTDA",
  cnpj: "41.539.910/0001-24",
  phoneDisplay: "(96) 3242-3883",
  phoneTel: "tel:+559632423883",
  whatsappDisplay: "(96) 98107-4126",
  whatsappNumber: "5596981074126",
  instagramHandle: "crescer.pediatriaintegrada",
  instagramUrl: "https://www.instagram.com/crescer.pediatriaintegrada/",
  instagramFollowers: "8 mil",
  googleRating: "4,8",
  googleReviews: 40,
  years: 4,
  address: {
    street: "Av. Raimundo Álvares da Costa, 2659",
    district: "Santa Rita",
    city: "Macapá/AP",
    cep: "68901-256",
  },
  geo: { lat: 0.0433638, lng: -51.0766207 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Crescer+Pediatria+Integrada+Macap%C3%A1",
  mapsEmbed: "https://www.google.com/maps?q=Crescer+Pediatria+Integrada,+Av.+Raimundo+%C3%81lvares+da+Costa,+2659+-+Santa+Rita,+Macap%C3%A1+-+AP&hl=pt-BR&z=16&output=embed",
  /* Exigência do CFM (Res. 2.336/2023). Preencher com o diretor técnico. A CONFIRMAR. */
  technicalDirector: "",
};

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}${path.replace(/^\//, "")}`;
}

export const DEFAULT_WA_MESSAGE = "Olá! Vim pelo site da Crescer Pediatria Integrada e gostaria de agendar uma consulta.";

export function buildWhatsAppUrl(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(withOrigin(message))}`;
}

/* Leva a origem do anúncio (utm_source / utm_campaign) para a conversa, para a recepção saber de onde veio o contato. */
function withOrigin(message: string): string {
  if (typeof window === "undefined") return message;
  try {
    const qs = new URLSearchParams(window.location.search);
    const src = qs.get("utm_source");
    if (src) {
      const camp = qs.get("utm_campaign");
      sessionStorage.setItem("crescer-origem", `(origem: ${src}${camp ? ` / ${camp}` : ""})`);
    }
    const tag = sessionStorage.getItem("crescer-origem");
    return tag ? `${message}\n\n${tag}` : message;
  } catch {
    return message;
  }
}

/* ───────────────────────── Medição (ver TRACKING.md) ───────────────────────── */

export type LeadChannel = "whatsapp" | "phone" | "form";

export function pushEvent(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/** Clique em WhatsApp/telefone ou envio do formulário. `generate_lead` é a conversão. */
export function trackLead(channel: LeadChannel, location: string, detail?: string) {
  pushEvent("lead_click", { lead_channel: channel, lead_location: location, lead_detail: detail });
  pushEvent("generate_lead", { method: channel, link_location: location });
}

/* ───────────────────────── Navegação ───────────────────────── */

export const NAV_LINKS = [
  { href: "#a-crescer", label: "A Crescer" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#equipe", label: "Equipe" },
  { href: "#servicos", label: "Serviços" },
  { href: "#espaco", label: "Espaço" },
  { href: "#contato", label: "Contato" },
];

/* ───────────────────────── Equipe médica ───────────────────────── */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  /* null = número não confirmado (não exibir). */
  crm: string | null;
  photo: string;
  instagram?: string;
}

export const DOCTORS: Doctor[] = [
  { id: "karla", name: "Dra. Karla Bussons", specialty: "Pediatria Geral", crm: "CRM-AP 1528 · RQE 767", photo: "images/dra-karla-bussons.webp", instagram: "dra.karlabussonspediatra" },
  { id: "lorena", name: "Dra. Lorena Neri", specialty: "Pediatria Geral", crm: "CRM-AP 1597 · RQE 803", photo: "images/polaroid-lorena.webp" },
  { id: "nathalia", name: "Dra. Nathalia Dias", specialty: "Gastroenterologia Pediátrica", crm: "CRM-AP 1447 · RQE 819/820", photo: "images/dra-nathalia-dias.webp", instagram: "nathaliadias.gastropediatra" },
  { id: "regiane", name: "Dra. Regiane Barreto", specialty: "Pneumologia Pediátrica", crm: "CRM-AP 1441 · RQE 898", photo: "images/dra-regiane-barreto.webp" },
  { id: "laila", name: "Dra. Laila Botelho", specialty: "Alergia e Imunologia Pediátrica", crm: "CRM-AP 1403 · RQE 1122", photo: "images/slide-laila.webp" },
  { id: "marcia", name: "Dra. Márcia Cajueiro", specialty: "Pediatria do Neurodesenvolvimento", crm: "CRM-AP 1550 · RQE 968", photo: "images/slide-marcia.webp" },
  /* O post publica o mesmo CRM/RQE da Dra. Regiane para a Dra. Helena: A CONFIRMAR antes de exibir. */
  { id: "helena", name: "Dra. Helena Progênio", specialty: "Infectologia Pediátrica", crm: null, photo: "images/slide-helena.webp" },
  { id: "luciana", name: "Dra. Luciana Campos", specialty: "Hematologia Pediátrica", crm: "CRM-AP 401 · RQE 450", photo: "images/dra-luciana-campos.webp" },
];

export const CARE_TEAM = [
  { name: "Helenilde Gibson", role: "Fisioterapia respiratória" },
  { name: "Ana Cássia", role: "Fisioterapia respiratória" },
  { name: "Luara Moreira", role: "Nutrição materno-infantil" },
  { name: "Maira Branco", role: "Nutrição materno-infantil" },
  { name: "Taynara Lima", role: "Enfermagem pediátrica" },
  { name: "Valéria Sousa", role: "Fonoaudiologia" },
  { name: "Tainan Souza", role: "Neuropsicologia infantil" },
  { name: "Cristina Dias", role: "Neuropsicopedagogia" },
];

/* ───────────────────────── Especialidades ───────────────────────── */

export interface Specialty {
  id: string;
  title: string;
  lead: string;
  topics: string[];
  doctorIds: string[];
  photo: string;
}

export const SPECIALTIES: Specialty[] = [
  {
    id: "pediatria",
    title: "Pediatria Geral",
    lead: "Acompanha a criança de forma completa e é quem identifica quando uma avaliação especializada pode ser necessária.",
    topics: ["Crescimento e desenvolvimento", "Alimentação e sono", "Vacinação e prevenção", "Consultas de rotina"],
    doctorIds: ["karla", "lorena"],
    photo: "images/dra-karla-bussons.webp",
  },
  {
    id: "gastro",
    title: "Gastroenterologia Pediátrica",
    lead: "Para questões relacionadas ao sistema digestivo da criança.",
    topics: ["Refluxo e dor abdominal", "Constipação e diarreia", "Alterações nas fezes", "Dificuldades alimentares"],
    doctorIds: ["nathalia"],
    photo: "images/dra-nathalia-dias.webp",
  },
  {
    id: "pneumo",
    title: "Pneumologia Pediátrica",
    lead: "Quando a principal preocupação está na respiração.",
    topics: ["Asma e chiado", "Tosse persistente", "Falta de ar", "Crises que se repetem"],
    doctorIds: ["regiane"],
    photo: "images/dra-regiane-barreto.webp",
  },
  {
    id: "alergia",
    title: "Alergia e Imunologia",
    lead: "Para investigar e acompanhar alergias e alterações do sistema imunológico.",
    topics: ["Alergias alimentares", "Alergias respiratórias", "Alergias de pele", "Prick Test e imunoterapia"],
    doctorIds: ["laila"],
    photo: "images/slide-laila.webp",
  },
  {
    id: "neuro",
    title: "Neurodesenvolvimento",
    lead: "O desenvolvimento infantil também faz parte do acompanhamento da criança.",
    topics: ["Marcos do desenvolvimento", "Comportamento", "Aprendizagem", "Neurodiversidade"],
    doctorIds: ["marcia"],
    photo: "images/slide-marcia.webp",
  },
  {
    id: "infecto",
    title: "Infectologia Pediátrica",
    lead: "Para situações relacionadas a infecções na infância.",
    topics: ["Infecções recorrentes", "Quadros mais complexos", "Doenças infecciosas", "Prevenção e vacinação"],
    doctorIds: ["helena"],
    photo: "images/slide-helena.webp",
  },
  {
    id: "hemato",
    title: "Hematologia Pediátrica",
    lead: "Cuida das doenças e alterações relacionadas ao sangue.",
    topics: ["Anemias", "Alterações no hemograma", "Plaquetas", "Condições hematológicas"],
    doctorIds: ["luciana"],
    photo: "images/dra-luciana-campos.webp",
  },
];

/* ───────────────────────── Serviços e exames ───────────────────────── */

export const EXAMS = [
  { title: "Teste do Olhinho", desc: "Triagem do reflexo vermelho, feita nos primeiros meses de vida." },
  { title: "Teste da Linguinha", desc: "Avaliação do frênulo da língua, importante para a amamentação e a fala." },
  { title: "Prick Test", desc: "Teste na pele que ajuda a investigar alergias." },
  { title: "Imunoterapia", desc: "Tratamento de alergias, com indicação e acompanhamento da especialista." },
  { title: "Testes rápidos", desc: "Exames de resultado rápido que apoiam a avaliação na própria consulta." },
  { title: "Bioimpedância", desc: "Avaliação da composição corporal no acompanhamento nutricional." },
  { title: "Terapia alimentar", desc: "Para crianças com seletividade e dificuldades na hora de comer." },
];

export const CARE_AREAS = [
  "Fisioterapia respiratória",
  "Nutrição materno-infantil",
  "Fonoaudiologia",
  "Neuropsicologia infantil",
  "Neuropsicopedagogia",
  "Enfermagem pediátrica",
];

export const COURSES = [
  {
    title: "Primeiros cuidados com o recém-nascido",
    for: "Para gestantes e famílias",
    desc: "Orientações práticas para os primeiros dias e meses com o bebê em casa.",
  },
  {
    title: "Descobrindo novos sabores",
    for: "Para pais e filhos de 3 a 8 anos",
    desc: "Curso prático sobre seletividade alimentar: explorar, tocar, preparar e experimentar, sem brigas à mesa.",
  },
];

/* ───────────────────────── Espaço (galeria) ───────────────────────── */

export const SPACE_GALLERY = [
  { src: "images/brinquedoteca-arvore.webp", title: "A árvore da brinquedoteca", caption: "Cada canto foi pensado para a criança se sentir em casa." },
  { src: "images/criancas-brincando.webp", title: "Brincar enquanto espera", caption: "Mesa de atividades, livros e brinquedos na área das crianças." },
  { src: "images/consulta-bebe-carimbo.webp", title: "Consulta sem pressa", caption: "Tempo para examinar, conversar e tirar todas as dúvidas." },
  { src: "images/sala-de-espera.webp", title: "Recepção acolhedora", caption: "Um espaço tranquilo para a família chegar com calma." },
  { src: "images/familia-recem-nascido.webp", title: "Desde o primeiro dia", caption: "Acompanhamento que começa nas primeiras semanas de vida." },
  { src: "images/curso-culinaria.webp", title: "Aprender brincando", caption: "Cursos práticos para pais e filhos dentro da clínica." },
  { src: "images/menina-e-pediatra.webp", title: "Vínculo que cresce junto", caption: "A mesma equipe acompanhando cada fase da infância." },
];

/* ───────────────────────── Instagram ───────────────────────── */

export const INSTAGRAM_POSTS = [
  { code: "Dfh7RmAETZ5", img: "ig/Dfh7RmAETZ5.webp", text: "Conheça nossa equipe", kind: "post" },
  { code: "DfSJP0YEVLo", img: "ig/DfSJP0YEVLo.webp", text: "Seu filho precisa de qual especialista?", kind: "post" },
  { code: "DfmofEWEbrW", img: "ig/DfmofEWEbrW.webp", text: "Curso Descobrindo Novos Sabores", kind: "post" },
  { code: "DfDTb3uiZw1", img: "ig/DfDTb3uiZw1.webp", text: "Crises respiratórias que se repetem", kind: "reel" },
  { code: "DeoikPhketS", img: "ig/DeoikPhketS.webp", text: "Feliz Dia do Médico", kind: "post" },
  { code: "DfaSrXSFQa7", img: "ig/DfaSrXSFQa7.webp", text: "Além das consultas, o que você encontra na Crescer", kind: "post" },
  { code: "Dez4-WCmUwp", img: "ig/Dez4-WCmUwp.webp", text: "Clínica Crescer, 4 anos", kind: "post" },
  { code: "Dfh7RmAETZ5", img: "ig/Dfh7RmAETZ5b.webp", text: "Seja muito bem-vindo", kind: "post" },
];

/* ───────────────────────── Dúvidas ───────────────────────── */

export const FAQ = [
  {
    q: "Quem a Crescer atende?",
    a: "Bebês, crianças e adolescentes, do recém-nascido à adolescência, e também gestantes nos cursos de preparação para a chegada do bebê.",
  },
  {
    q: "Como faço para agendar?",
    a: "Pelo WhatsApp (96) 98107-4126, pelo telefone (96) 3242-3883 ou pelo formulário deste site. Conte a idade da criança e o motivo da consulta que a equipe indica o horário e o profissional.",
  },
  {
    q: "Não sei qual especialista procurar. E agora?",
    a: "Muitas vezes o ponto de partida é a consulta com a pediatra, que avalia se há necessidade de uma especialista. Se preferir, descreva a situação para a nossa equipe, que orienta o melhor caminho.",
  },
  {
    q: "Vocês fazem exames na própria clínica?",
    a: "Sim. Teste do Olhinho, Teste da Linguinha, Prick Test, testes rápidos e bioimpedância, entre outros. A indicação é feita na consulta.",
  },
  {
    q: "Atendem convênio ou plano de saúde?",
    a: "Para saber sobre formas de pagamento e convênios, fale com a nossa equipe pelo WhatsApp.",
  },
  {
    q: "A clínica atende urgências?",
    a: "A Crescer atende com hora marcada e não funciona como pronto-socorro. Em caso de emergência, procure o pronto atendimento mais próximo ou ligue 192 (SAMU).",
  },
];
