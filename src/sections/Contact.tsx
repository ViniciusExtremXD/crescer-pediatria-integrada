import { motion } from "framer-motion";
import { InstagramLogo, MapPin, NavigationArrow, Phone, Star, WhatsappLogo } from "@phosphor-icons/react";
import { COMPANY, pushEvent } from "../data/site";
import { ClipReveal, EASE_OUT, Leaf, Reveal, SectionLabel, SplitWords } from "../components/motion";
import { PhoneLink, WhatsAppLink } from "../components/cta";
import { ContactForm } from "../components/ContactForm";

export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-pine-800 py-24 text-cream-50 sm:py-32">
      <div className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-rose-400/20 blur-[140px]" />
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-pine-400/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionLabel index="09" tone="dark">
              Contato
            </SectionLabel>
            <h2 className="font-display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)] font-medium leading-[1] tracking-tight">
              <SplitWords text="Vamos *cuidar* juntos?" accentClassName="italic text-rose-300" />
            </h2>
            <Reveal className="mt-6 max-w-md text-lg leading-relaxed text-cream-100/75">
              Atendimento com hora marcada. Fale com a equipe pelo WhatsApp, por telefone ou pelo formulário.
            </Reveal>

            <ul className="mt-10 space-y-3">
              {[
                { icon: WhatsappLogo, label: "WhatsApp", value: COMPANY.whatsappDisplay, kind: "wa" as const },
                { icon: Phone, label: "Telefone", value: COMPANY.phoneDisplay, kind: "tel" as const },
                { icon: InstagramLogo, label: "Instagram", value: `@${COMPANY.instagramHandle}`, kind: "ig" as const },
              ].map(({ icon: Icon, label, value, kind }, i) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-rose-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon weight="duotone" className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/50">{label}</span>
                      <span className="text-lg font-semibold">{value}</span>
                    </span>
                  </>
                );
                const cls = "group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-white/[0.05]";
                return (
                  <motion.li key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.08 }}>
                    {kind === "wa" ? (
                      <WhatsAppLink location="contato" className={cls}>
                        {inner}
                      </WhatsAppLink>
                    ) : kind === "tel" ? (
                      <PhoneLink location="contato" className={cls}>
                        {inner}
                      </PhoneLink>
                    ) : (
                      <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent("instagram_click", { link_location: "contato" })} className={cls}>
                        {inner}
                      </a>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <Reveal className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/[0.06] py-2 pl-3 pr-5 ring-1 ring-white/10">
              <span className="flex gap-0.5 text-rose-300">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} weight="fill" className="h-4 w-4" />
                ))}
              </span>
              <span className="text-sm">
                <strong>{COMPANY.googleRating}</strong> no Google · {COMPANY.googleReviews} avaliações
              </span>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <Leaf className="absolute -right-4 -top-10 z-10 h-14 w-14" color="#F2B8BF" />
            <ContactForm />
          </div>
        </div>

        {/* Mapa */}
        <ClipReveal className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-pine-700" radius={40}>
          <div className="relative h-[420px] sm:h-[480px]">
            <iframe
              title="Mapa: Crescer Pediatria Integrada, Av. Raimundo Álvares da Costa, 2659, Macapá"
              src={COMPANY.mapsEmbed}
              className="h-full w-full border-0 grayscale-[35%] saturate-[0.85]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.4 }}
              className="absolute bottom-4 left-4 right-4 rounded-[1.75rem] bg-cream-50 p-6 text-pine-800 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:right-auto sm:max-w-sm"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                <MapPin weight="fill" className="h-4 w-4" /> Onde estamos
              </p>
              <p className="font-display mt-2 text-2xl font-medium text-pine-700">{COMPANY.address.street}</p>
              <p className="mt-1 text-pine-800/70">
                {COMPANY.address.district} · {COMPANY.address.city} · CEP {COMPANY.address.cep}
              </p>
              <a
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("maps_click", { link_location: "mapa" })}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-pine-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
              >
                <NavigationArrow weight="fill" className="h-4 w-4" /> Como chegar
              </a>
            </motion.div>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}
