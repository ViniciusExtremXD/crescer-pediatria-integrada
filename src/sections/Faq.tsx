import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { FAQ, pushEvent } from "../data/site";
import { EASE_OUT, Reveal, SectionLabel, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

export function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="duvidas" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="08">Dúvidas</SectionLabel>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
              <SplitWords text="Antes de *agendar*." />
            </h2>
            <Reveal className="mt-6 max-w-sm text-lg text-pine-800/70">Não encontrou o que procurava? Fale com a nossa equipe, ela responde pelo WhatsApp.</Reveal>
            <Reveal className="mt-8" delay={0.1}>
              <PrimaryCta location="faq" size="md" tone="rose" message="Olá! Tenho uma dúvida sobre a Crescer Pediatria Integrada.">
                Tirar uma dúvida
              </PrimaryCta>
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.04} className="border-b border-pine-600/10">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => {
                    setOpen(on ? -1 : i);
                    if (!on) pushEvent("faq_open", { question: f.q });
                  }}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-display text-xl font-medium transition-colors sm:text-2xl ${on ? "text-rose-500" : "text-pine-700"}`}>{f.q}</span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${on ? "rotate-45 bg-rose-400 text-white" : "bg-pine-100 text-pine-700"}`}>
                    <Plus weight="bold" className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    >
                      <p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-pine-800/75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
