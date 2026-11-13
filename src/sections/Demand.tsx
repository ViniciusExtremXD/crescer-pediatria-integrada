import { motion } from "framer-motion";
import { Stethoscope, WarningCircle } from "@phosphor-icons/react";
import { DEMAND, assetUrl } from "../data/site";
import { EASE_OUT, Reveal, SectionLabel, SplitWords } from "../components/motion";
import { PhoneCta, PrimaryCta } from "../components/cta";

/*
 * Consulta de Demanda: serviço novo da clínica, em destaque fora da lista de serviços.
 * Texto a partir do roteiro do reel oficial. O aviso de gravidade é obrigatório.
 */
export function Demand() {
  return (
    <section id="consulta-de-demanda" className="relative overflow-hidden bg-rose-50 py-24 sm:py-32">
      <div className="bg-dots mask-fade-b absolute inset-x-0 top-0 h-72 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                <Stethoscope weight="bold" className="h-3.5 w-3.5" /> Novo
              </span>
              <SectionLabel>Consulta de Demanda</SectionLabel>
            </div>

            <h2 className="font-display mt-6 text-[clamp(2.3rem,5vw,4.4rem)] font-medium leading-[1.03] tracking-tight text-pine-700">
              <SplitWords text="Seu filho ficou doente e precisa de um pediatra *ainda* *hoje?*" />
            </h2>

            <Reveal className="mt-6 max-w-xl text-lg leading-relaxed text-pine-800/75">
              Na Crescer, a Consulta de Demanda atende a criança que ficou doentinha e precisa ser avaliada no mesmo dia, conforme disponibilidade.
            </Reveal>

            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Sintomas comuns">
              {DEMAND.symptoms.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.07 }}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wider text-rose-600 shadow-soft ring-1 ring-rose-200"
                >
                  {s}
                </motion.li>
              ))}
            </ul>

            <Reveal className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <PrimaryCta location="consulta_demanda" tone="rose" message={DEMAND.whatsappMessage}>
                Consultar horário para hoje
              </PrimaryCta>
              <PhoneCta location="consulta_demanda" />
            </Reveal>

            <Reveal className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-pine-800/80 ring-1 ring-rose-200">
              <WarningCircle weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
              <p>
                Se houver qualquer sinal de gravidade, procure imediatamente um serviço de urgência e emergência hospitalar ou ligue <strong className="font-semibold text-pine-800">192 (SAMU)</strong>.
              </p>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
              className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-rose-200 shadow-lift"
            >
              <img
                src={assetUrl("images/servicos/consulta-demanda.webp")}
                alt="Dra. Lorena Neri, pediatra da Crescer, na recepção da clínica"
                loading="lazy"
                width={720}
                height={1280}
                className="h-full w-full object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/55 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
