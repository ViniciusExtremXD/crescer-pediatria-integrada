import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CookingPot, Baby } from "@phosphor-icons/react";
import { CARE_AREAS, COURSES, EXAMS, assetUrl } from "../data/site";
import { EASE_OUT, ParallaxImage, Reveal, SectionLabel, SplitWords } from "../components/motion";
import { WhatsAppLink } from "../components/cta";

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="servicos" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <SectionLabel index="04">Serviços</SectionLabel>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
            <SplitWords text="Além das consultas, o que você *encontra* na Crescer" />
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Exames: lista editorial */}
          <Reveal className="flex flex-col rounded-[2.5rem] bg-white p-6 shadow-card ring-1 ring-pine-600/5 sm:p-10 lg:col-span-7">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-3xl font-medium text-pine-700">Exames na própria clínica</h3>
              <span className="text-sm font-semibold text-rose-500">{EXAMS.length} serviços</span>
            </div>
            <ul className="mt-6">
              {EXAMS.map((e, i) => {
                const on = open === i;
                return (
                  <li key={e.title} className="border-t border-pine-600/10 last:border-b">
                    <button type="button" onClick={() => setOpen(on ? null : i)} onMouseEnter={() => setOpen(i)} aria-expanded={on} className="group flex w-full items-center gap-5 py-4 text-left">
                      <span className="w-7 text-xs font-semibold tabular-nums text-pine-300">0{i + 1}</span>
                      <span className={`font-display flex-1 text-xl font-medium transition-colors duration-300 sm:text-2xl ${on ? "italic text-rose-500" : "text-pine-700"}`}>{e.title}</span>
                      <ArrowUpRight weight="bold" className={`h-5 w-5 transition-all duration-500 ${on ? "rotate-45 text-rose-500" : "text-pine-300 group-hover:text-pine-600"}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          className="overflow-hidden pl-12 pr-8 text-[15px] leading-relaxed text-pine-800/70"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                        >
                          <span className="block pb-5">{e.desc}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-pine-800/55">A indicação de cada exame é feita pela especialista durante a consulta.</p>
            <div className="relative mt-8 hidden min-h-[220px] flex-1 overflow-hidden rounded-[1.75rem] lg:block">
              <ParallaxImage src={assetUrl("images/pediatra-e-crianca.webp")} alt="Pediatra da Crescer abraçada a uma menina no consultório" amount={8} position="50% 35%" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-900/60 to-transparent" />
              <p className="font-display absolute bottom-5 left-6 text-2xl font-medium italic text-cream-50">tudo no mesmo lugar</p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            {/* Cuidado multiprofissional */}
            <Reveal delay={0.1} className="relative overflow-hidden rounded-[2.5rem] bg-pine-700 p-8 shadow-pine text-cream-50 sm:p-10">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pine-500/40 blur-2xl" />
              <h3 className="font-display relative text-3xl font-medium">
                Cuidado <span className="italic text-rose-200">multiprofissional</span>
              </h3>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {CARE_AREAS.map((a, i) => (
                  <motion.li
                    key={a}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 + i * 0.06 }}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15 transition-colors hover:bg-rose-300 hover:text-pine-900"
                  >
                    {a}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            {/* Cursos */}
            <Reveal delay={0.2} className="group relative overflow-hidden rounded-[2.5rem] bg-rose-100 shadow-card transition-shadow duration-500 hover:shadow-lift">
              <div className="relative h-56 overflow-hidden">
                <ParallaxImage src={assetUrl("images/curso-culinaria.webp")} alt="Crianças com as mãos sujas de massa no curso de culinária" amount={10} position="50% 40%" className="h-full w-full" />
                <span className="absolute left-5 top-5 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pine-700">Cursos para famílias</span>
              </div>
              <div className="p-8 sm:p-9">
                {COURSES.map((c, i) => (
                  <div key={c.title} className={i ? "mt-5 border-t border-pine-600/10 pt-5" : ""}>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                      {i ? <CookingPot weight="duotone" className="h-4 w-4" /> : <Baby weight="duotone" className="h-4 w-4" />}
                      {c.for}
                    </p>
                    <h4 className="font-display mt-2 text-2xl font-medium text-pine-700">{c.title}</h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-pine-800/70">{c.desc}</p>
                  </div>
                ))}
                <WhatsAppLink
                  location="cursos"
                  message="Olá! Gostaria de saber sobre as próximas turmas dos cursos da Crescer."
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-pine-700 underline decoration-pine-600/30 underline-offset-4 hover:decoration-pine-600"
                >
                  Quero saber das próximas turmas <ArrowUpRight weight="bold" className="h-4 w-4" />
                </WhatsAppLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
