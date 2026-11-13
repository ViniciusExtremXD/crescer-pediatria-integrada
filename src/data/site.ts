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
  googleReviewsUrl: "https://www.google.com/maps?cid=15194554536432631035",
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

export interface DoctorReview {
  text: string;
  author: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  /* Título usado pela clínica na arte "Pediatria e subespecialidades". */
  title: string;
  specialtyId: string;
  /* null = número não confirmado (não exibir). */
  crm: string | null;
  photo: string;
  /* Posição do recorte da foto no card (CSS object-position). */
  focus?: string;
  about: string;
  instagram?: string;
  /* Trechos reais de avaliações do Google que citam a médica. */
  reviews?: DoctorReview[];
}

export const DOCTORS: Doctor[] = [
  {
    id: "karla",
    name: "Dra. Karla Bussons",
    specialty: "Pediatria Geral",
    title: "Pediatra geral",
    specialtyId: "pediatria",
    crm: "CRM-AP 1528 · RQE 767",
    photo: "images/ensaios/karla-bussons.webp",
    focus: "50% 30%",
    about: "Pediatra geral da Crescer. Acompanha o desenvolvimento, o sono, a alimentação e a rotina de saúde da criança, cuida do recém-nascido e identifica quando uma avaliação especializada pode ser necessária.",
    instagram: "dra.karlabussonspediatra",
    reviews: [
      { text: "Atendimento humanizado, cuidadoso e cheio de carinho Dra Karla é incrível. Toda a equipe é muito atenciosa e transmite segurança e confiança.", author: "Alessandra Z." },
      { text: "A minha primeira impressão foi maravilhosa, a Dr. Karla, super atenciosa e cuidadosa!", author: "Wanessa A." },
    ],
  },
  {
    id: "lorena",
    name: "Dra. Lorena Neri",
    specialty: "Pediatria Geral",
    title: "Pediatra geral",
    specialtyId: "pediatria",
    crm: "CRM-AP 1597 · RQE 803",
    photo: "images/ensaios/lorena-neri.webp",
    focus: "50% 30%",
    about: "Pediatra geral. Faz o acompanhamento de rotina do recém-nascido ao adolescente: desenvolvimento, sono, alimentação, sintomas comuns da infância, vacinação e prevenção.",
  },
  {
    id: "nathalia",
    name: "Dra. Nathalia Dias",
    specialty: "Gastroenterologia Pediátrica",
    title: "Gastropediatra",
    specialtyId: "gastro",
    crm: "CRM-AP 1447 · RQE 819/820",
    photo: "images/ensaios/nathalia-dias.webp",
    focus: "50% 8%",
    about: "Gastroenterologista pediátrica. Cuida do sistema digestivo da criança: APLV, intolerância à lactose, constipação intestinal, dor abdominal, doença celíaca e seletividade alimentar.",
    instagram: "nathaliadias.gastropediatra",
    reviews: [{ text: "Dra Natalia Dias (Gastropediatra) é bem atenciosa, o atendimento é humanizado do início ao fim. Me senti segura e bem orientada.", author: "Debby R." }],
  },
  {
    id: "regiane",
    name: "Dra. Regiane Barreto",
    specialty: "Pneumologia Pediátrica",
    title: "Pneumopediatra",
    specialtyId: "pneumo",
    crm: "CRM-AP 1441 · RQE 898",
    photo: "images/ensaios/regiane-barreto.webp",
    focus: "50% 8%",
    about: "Pneumologista pediátrica. Atende quando a principal preocupação é a respiração: asma, chiado, tosse persistente, falta de ar e crises respiratórias que se repetem.",
    reviews: [{ text: "Atendem meu filho sempre com muita paciência, sem pressa, tiram todas as minhas dúvidas. Quero deixar meu agradecimento especial para a Dra. Regiane e Dra. Luara.", author: "Sarina S." }],
  },
  {
    id: "laila",
    name: "Dra. Laila Botelho",
    specialty: "Alergia e Imunologia Pediátrica",
    title: "Alergopediatra",
    specialtyId: "alergia",
    crm: "CRM-AP 1403 · RQE 1103/1122",
    photo: "images/ensaios/laila-botelho.webp",
    focus: "50% 8%",
    about: "Alergista e imunologista pediátrica. Investiga e acompanha alergias alimentares, respiratórias e de pele, outras reações e alterações do sistema imunológico.",
  },
  {
    id: "marcia",
    name: "Dra. Márcia Cajueiro",
    specialty: "Neurodesenvolvimento Infantil",
    title: "Pediatra do Desenvolvimento Infantil",
    specialtyId: "neuro",
    crm: "CRM-AP 1550 · RQE 968",
    photo: "images/ensaios/marcia-cajueiro.webp",
    focus: "50% 8%",
    about: "Pediatra especialista em neurodesenvolvimento infantil, com formação em Psiquiatria Infantil. Acompanha questões de desenvolvimento, comportamento, aprendizagem e outras particularidades do neurodesenvolvimento.",
  },
  /* CRM/RQE conforme a tabela oficial de registros enviada pela clínica (12/11/2026). */
  {
    id: "helena",
    name: "Dra. Helena Progênio",
    specialty: "Infectologia Pediátrica",
    title: "Infectopediatra",
    specialtyId: "infecto",
    crm: "CRM-AP 1036 · RQE 214/810",
    photo: "images/ensaios/helena-progenio.webp",
    focus: "50% 8%",
    about: "Infectologista pediátrica. Acompanha infecções recorrentes, quadros mais complexos, doenças infecciosas específicas e dúvidas sobre prevenção e vacinação.",
  },
  {
    id: "luciana",
    name: "Dra. Luciana Campos",
    specialty: "Hematologia Pediátrica",
    title: "Hematopediatra",
    specialtyId: "hemato",
    crm: "CRM-AP 401 · RQE 450",
    photo: "images/ensaios/luciana-campos.webp",
    focus: "50% 8%",
    about: "Hematologista pediátrica. Cuida de anemias, alterações no hemograma e nas plaquetas, problemas de coagulação e outras condições hematológicas.",
  },
];

/* Equipe multiprofissional: fotos e registros do post oficial "Também contamos com" (nov/2026). */
export const CARE_TEAM = [
  { name: "Helenilde Gibson", role: "Fisioterapia respiratória", reg: "CREFITO 12 106558.1-F", photo: "images/equipe/helenilde-gibson.webp" },
  { name: "Ana Cássia", role: "Fisioterapia respiratória", reg: "CREFITO 213505-F", photo: "images/equipe/ana-cassia.webp" },
  { name: "Luara Moreira", role: "Nutricionista materno-infantil", reg: "CRN 7-4847", photo: "images/equipe/luara-moreira.webp" },
  { name: "Maira Lima", role: "Nutricionista materno-infantil", reg: "CRN 7-5223", photo: "images/equipe/maira-branco.webp" },
  { name: "Taynara Lima", role: "Enfermeira materno-infantil · consultoria em amamentação", reg: "COREN-AP 514138", photo: "images/equipe/taynara-lima.webp" },
  { name: "Valéria Sousa", role: "Fonoaudióloga", reg: "CRFa 9.6291-5", photo: "images/equipe/valeria-sousa.webp" },
  { name: "Tainan Souza", role: "Neuropsicóloga infantil", reg: "CRP 10/06786", photo: "images/equipe/tainan-souza.webp" },
  { name: "Cristina Dias", role: "Neuropsicopedagoga", reg: "CBO 2394-40", photo: "images/equipe/cristina-dias.webp" },
];

/* ───────────────────────── Avaliações reais do Google ─────────────────────────
 * Copiadas do perfil da clínica no Google Maps em 12/11/2026 (todas 5 estrelas),
 * mantidas como escritas pelas famílias. Nomes abreviados por privacidade.
 */
export const GOOGLE_REVIEWS = [
  { author: "Sarina S.", text: "Profissionais maravilhosas. Muito competentes, cuidadosas. Atendem meu filho sempre com muita paciência, sem pressa, tiram todas as minhas dúvidas. Além de terem um espaço muito bem equipado e preparado para atender crianças. Meu filho ama a clínica, brinca do início ao fim da consulta." },
  { author: "Alessandra Z.", text: "Adorei a experiência na clínica! Atendimento humanizado, cuidadoso e cheio de carinho. Toda a equipe é muito atenciosa e transmite segurança e confiança. É muito bom saber que nossos pequenos estão em boas mãos! ❤️" },
  { author: "Mariane F.", text: "Um ótimo atendimento, lugar acolhedor, equipe muito simpática e prestativa, lá tem diversas especialidades e as crianças amam ir, pois a brinquedoteca é incrível!" },
  { author: "Anderson M.", text: "Sou muito satisfeito com os profissionais que atendem meus filhos, já frequentamos a clínica desde 2022 e sempre fomos muito bem atendidos." },
  { author: "Antonia V.", text: "As profissionais são extremamente competentes, atenciosas e comprometidas com o cuidado integral do paciente. O atendimento é humanizado, ético e transmite muita segurança desde o primeiro contato." },
  { author: "Ruy G.", text: "Ótimas profissionais! Transmitem todo o conhecimento que possuem mas sem deixar de prestar o devido cuidado. Meu filho foi muito bem tratado." },
  { author: "Wanessa A.", text: "A minha primeira impressão foi maravilhosa, a Dr. Karla, super atenciosa e cuidadosa!" },
  { author: "Dayse M.", text: "Atendimento de excelência, as profissionais são competentes e muito qualificadas. Super recomendo!!!" },
];

/* ───────────────────────── Especialidades ───────────────────────── */

export interface Specialty {
  id: string;
  title: string;
  lead: string;
  topics: string[];
  /* Descrição de cada tema (mesma ordem de topics). Opcional. */
  details?: string[];
  doctorIds: string[];
}

export const SPECIALTIES: Specialty[] = [
  {
    id: "pediatria",
    title: "Pediatria Geral",
    lead: "Acompanha a criança de forma completa e é quem identifica quando uma avaliação especializada pode ser necessária.",
    /* Textos enviados pela clínica (WhatsApp, 12/11/2026). */
    topics: [
      "Desenvolvimento infantil",
      "Sono infantil",
      "Dificuldades na alimentação",
      "Doenças e sintomas comuns na infância",
      "Cuidados com o recém-nascido",
      "Acompanhamento pediátrico de rotina",
    ],
    details: [
      "Acompanhamento dos marcos do desenvolvimento, da aquisição de novas habilidades e das etapas do crescimento da criança.",
      "Dificuldades para dormir, despertares noturnos e orientações sobre o sono do bebê e da criança.",
      "Introdução alimentar, recusa de alimentos e dúvidas sobre a alimentação adequada em cada fase da infância.",
      "Febre, tosse, alterações nas fezes, alergias e outros sintomas que costumam gerar dúvidas nos pais.",
      "Banho, higiene, troca de fraldas, cuidados com o umbigo e orientações para os primeiros dias de vida do bebê.",
      "Consultas de puericultura, vacinação, orientações preventivas e acompanhamento da saúde e do desenvolvimento infantil.",
    ],
    doctorIds: ["karla", "lorena"],
  },
  {
    id: "gastro",
    title: "Gastroenterologia Pediátrica",
    lead: "Para questões relacionadas ao sistema digestivo da criança.",
    /* Lista enviada pela clínica (WhatsApp, 12/11/2026). */
    topics: ["APLV (alergia à proteína do leite de vaca)", "Intolerância à lactose", "Constipação intestinal", "Dor abdominal", "Doença celíaca", "Seletividade alimentar"],
    doctorIds: ["nathalia"],
  },
  {
    id: "pneumo",
    title: "Pneumologia Pediátrica",
    lead: "Quando a principal preocupação está na respiração.",
    topics: ["Asma e chiado", "Tosse persistente", "Falta de ar", "Crises que se repetem"],
    doctorIds: ["regiane"],
  },
  {
    id: "alergia",
    title: "Alergia e Imunologia",
    lead: "Para investigar e acompanhar alergias e alterações do sistema imunológico.",
    topics: ["Alergias alimentares", "Alergias respiratórias", "Alergias de pele", "Prick Test e imunoterapia"],
    doctorIds: ["laila"],
  },
  {
    id: "neuro",
    title: "Neurodesenvolvimento Infantil",
    lead: "O desenvolvimento infantil também faz parte do acompanhamento da criança.",
    topics: ["Marcos do desenvolvimento", "Comportamento", "Aprendizagem", "Neurodiversidade"],
    doctorIds: ["marcia"],
  },
  {
    id: "infecto",
    title: "Infectologia Pediátrica",
    lead: "Para situações relacionadas a infecções na infância.",
    topics: ["Infecções recorrentes", "Quadros mais complexos", "Doenças infecciosas", "Prevenção e vacinação"],
    doctorIds: ["helena"],
  },
  {
    id: "hemato",
    title: "Hematologia Pediátrica",
    lead: "Cuida das doenças e alterações relacionadas ao sangue.",
    topics: ["Anemias", "Alterações no hemograma", "Plaquetas", "Condições hematológicas"],
    doctorIds: ["luciana"],
  },
];

/* ───────────────────────── Serviços e exames ───────────────────────── */

/* Arte oficial "Cuidado completo para cada fase do seu filho" (12/11/2026). */
export const ART_SPECIALTIES = [
  "Pediatria Geral",
  "Pneumologia Pediátrica",
  "Gastroenterologia Pediátrica",
  "Alergia e Imunologia Pediátrica",
  "Neurodesenvolvimento Infantil (formação em Psiquiatria Infantil)",
  "Infectologia Pediátrica",
  "Hematologia Pediátrica",
  "Enfermeira materno-infantil · consultoria em amamentação",
  "Nutricionista infantil",
  "Fisioterapia respiratória",
  "Fonoaudiologia",
  "Neuropsicologia infantil",
  "Neuropsicopedagogia",
];

export type TestIcon = "microscope" | "virus" | "baby" | "eye" | "smiley" | "hand" | "shield";

export const TESTS: { title: string; desc: string; icon: TestIcon }[] = [
  { title: "Streptococcus do Grupo A", desc: "Identifica a bactéria causadora de muitas amigdalites.", icon: "microscope" },
  { title: "Covid-19, Influenza A e B", desc: "Para diagnóstico ágil de gripes e resfriados.", icon: "virus" },
  { title: "Vírus Sincicial Respiratório (VSR)", desc: "Comum em bebês e crianças pequenas.", icon: "baby" },
  { title: "Teste do Olhinho", desc: "Avalia estruturas dos olhos do bebê e ajuda a identificar alterações que precisam de investigação e acompanhamento.", icon: "eye" },
  { title: "Teste da Linguinha", desc: "Avalia o frênulo da língua e alterações que podem interferir na sucção, na amamentação e nos movimentos da língua.", icon: "smiley" },
  { title: "Prick Test", desc: "Teste na pele que investiga a sensibilização a alimentos, ácaros, pelos de animais e outros alérgenos.", icon: "hand" },
  { title: "Imunoterapia", desc: "Tratamento que busca modificar a resposta do organismo a alérgenos, indicado em alguns casos após avaliação especializada.", icon: "shield" },
];

/*
 * Carrossel oficial "Além das consultas, o que você encontra na Crescer?"
 * (Instagram, DfaSrXSFQa7, slides 5 a 8).
 */
export const OTHER_SERVICES = [
  {
    id: "terapia-alimentar",
    title: "Terapia alimentar",
    kicker: "Alimentação também faz parte do cuidado",
    desc: "Acompanhamento para crianças com dificuldades relacionadas à alimentação, como seletividade, recusa ou resistência a determinados alimentos.",
  },
  {
    id: "bioimpedancia",
    title: "Bioimpedância",
    kicker: "Composição corporal",
    desc: "Avaliação que mostra a composição corporal: massa muscular, percentual e distribuição de gordura e água corporal.",
  },
  {
    id: "amamentacao",
    title: "Consultoria de amamentação",
    kicker: "Para a mãe e o bebê",
    desc: "Orientação individualizada para dúvidas e desafios da amamentação, da pega e do posicionamento do bebê ao manejo das dificuldades.",
  },
  {
    id: "puericultura",
    title: "Puericultura",
    kicker: "Consulta de rotina",
    desc: "Acompanhamento periódico da saúde e do desenvolvimento da criança e do adolescente: crescimento, alimentação, sono, vacinação e cada fase.",
  },
];

export const LASER = {
  title: "Laserterapia",
  lead: "Entre as aplicações realizadas na Crescer, estão:",
  uses: [
    { title: "Cicatrização", desc: "Assaduras, lesões mamárias, dermatites, queimaduras, granuloma umbilical e cuidados no pós-operatório." },
    { title: "Ação antimicrobiana", desc: "Estomatite, impetigo, herpes, candidíase mamária e mão-pé-boca." },
    { title: "Ação anti-inflamatória", desc: "Pneumonia e asma, dermatites e outros." },
    { title: "Ação analgésica", desc: "Nascimento dos dentes e dor durante a amamentação." },
  ],
  note: "E outras indicações, sempre de acordo com a avaliação individual.",
};

export const COURSES = [
  {
    title: "Primeiros Cuidados com o Bebê Recém-Nascido e Iniciando a Amamentação",
    for: "Para quem está esperando um bebê",
    desc: "Um encontro para aprender, na teoria e na prática, os cuidados dos primeiros dias com o bebê.",
    learn: ["Banho do bebê", "Troca de fralda", "Amamentação", "Manobra de desengasgo", "Cólicas e refluxo"],
  },
  {
    title: "Descobrindo Novos Sabores",
    for: "Para pais e filhos de 3 a 8 anos",
    desc: "Curso prático sobre seletividade alimentar: explorar, tocar, preparar e experimentar, sem brigas à mesa.",
    learn: [] as string[],
  },
];

/* ───────────────────────── Espaço (galeria) ───────────────────────── */

export const SPACE_GALLERY = [
  { src: "images/brinquedoteca-arvore.webp", title: "A árvore da brinquedoteca", caption: "Cada canto foi pensado para a criança se sentir em casa." },
  { src: "images/criancas-brincando.webp", title: "Brincar enquanto espera", caption: "Mesa de atividades, livros e brinquedos na área das crianças." },
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
