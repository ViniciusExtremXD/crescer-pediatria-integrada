import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { COMPANY, DOCTORS, FAQ } from "./data/site";

/* Só no build: scripts/prerender.mjs injeta este HTML e o JSON-LD em dist/index.html. */

export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

const SITE = "https://crescerpediatriaintegrada.com.br/";

export function structuredData() {
  const clinic = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE}#clinica`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    description: "Clínica de especialidades pediátricas em Macapá/AP: pediatria geral, gastroenterologia, pneumologia, alergia e imunologia, neurodesenvolvimento, infectologia e hematologia pediátricas, com equipe multiprofissional.",
    url: SITE,
    logo: `${SITE}logo-crescer.svg`,
    image: `${SITE}images/fundadoras-recepcao.webp`,
    telephone: "+55-96-3242-3883",
    medicalSpecialty: "Pediatric",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: "Macapá",
      addressRegion: "AP",
      postalCode: COMPANY.address.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: COMPANY.geo.lat, longitude: COMPANY.geo.lng },
    hasMap: COMPANY.mapsUrl,
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+55-96-98107-4126", contactType: "reservations", availableLanguage: "Portuguese" },
      { "@type": "ContactPoint", telephone: "+55-96-3242-3883", contactType: "customer service", availableLanguage: "Portuguese" },
    ],
    sameAs: [COMPANY.instagramUrl],
    employee: DOCTORS.map((d) => ({ "@type": "Physician", name: d.name, medicalSpecialty: d.specialty })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const website = { "@context": "https://schema.org", "@type": "WebSite", name: COMPANY.name, url: SITE, inLanguage: "pt-BR", publisher: { "@id": `${SITE}#clinica` } };

  return [clinic, faq, website];
}
