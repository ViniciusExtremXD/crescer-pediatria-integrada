import { motion } from "framer-motion";
import { ArrowUp, InstagramLogo } from "@phosphor-icons/react";
import { COMPANY, NAV_LINKS, assetUrl } from "../data/site";
import { EASE_OUT } from "../components/motion";
import { PhoneLink, WhatsAppLink } from "../components/cta";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pine-950 pb-28 pt-20 text-cream-100 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={assetUrl("logo-crescer-light.svg")} alt="Crescer Pediatria Integrada" width={340} height={130} className="h-16 w-auto" />
            <p className="mt-6 max-w-sm leading-relaxed text-cream-100/65">Clínica de especialidades pediátricas em Macapá. Cuidar, acolher e desenvolver: em cada criança, em cada família.</p>
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-200 hover:text-rose-100">
              <InstagramLogo weight="bold" className="h-5 w-5" /> @{COMPANY.instagramHandle}
            </a>
          </div>
          <nav className="md:col-span-3" aria-label="Rodapé">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Navegue</p>
            <ul className="mt-5 grid gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream-100/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Contato</p>
            <ul className="mt-5 grid gap-2.5 text-cream-100/75">
              <li>
                <WhatsAppLink location="rodape" className="hover:text-white">
                  WhatsApp {COMPANY.whatsappDisplay}
                </WhatsAppLink>
              </li>
              <li>
                <PhoneLink location="rodape" className="hover:text-white">
                  Telefone {COMPANY.phoneDisplay}
                </PhoneLink>
              </li>
              <li className="pt-2">
                {COMPANY.address.street}
                <br />
                {COMPANY.address.district} · {COMPANY.address.city} · CEP {COMPANY.address.cep}
              </li>
            </ul>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="font-display mt-16 select-none text-[clamp(4rem,15vw,13rem)] font-medium leading-none tracking-tightest text-white/[0.06]"
          aria-hidden
        >
          Crescer
        </motion.p>

        <div className="mt-6 grid gap-3 border-t border-white/10 pt-8 text-xs leading-relaxed text-cream-100/45 md:grid-cols-[1fr_auto] md:items-start">
          <div className="grid gap-1.5">
            {COMPANY.technicalDirector && <p>Responsável técnica: {COMPANY.technicalDirector}</p>}
            <p>
              {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
            </p>
            <p>As informações deste site têm caráter informativo e não substituem a consulta médica. Em emergências, procure o pronto atendimento mais próximo ou ligue 192 (SAMU).</p>
            <p>
              © {new Date().getFullYear()} Crescer Pediatria Integrada ·{" "}
              <a href={assetUrl("politica-de-privacidade.html")} className="underline underline-offset-4 hover:text-cream-100">
                Política de privacidade
              </a>{" "}
              ·{" "}
              <button type="button" onClick={() => window.dispatchEvent(new Event("crescer:cookies"))} className="underline underline-offset-4 hover:text-cream-100">
                Preferências de cookies
              </button>
            </p>
          </div>
          <a href="#topo" className="group inline-flex items-center gap-2 justify-self-start rounded-full border border-white/15 px-4 py-2 text-cream-100/70 transition-colors hover:border-white/40 hover:text-white md:justify-self-end">
            Voltar ao topo <ArrowUp weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
