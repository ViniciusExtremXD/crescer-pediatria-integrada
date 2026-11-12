import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "@phosphor-icons/react";
import { DOCTORS, SPECIALTIES, assetUrl, type Specialty } from "../data/site";
import { EASE_OUT, Reveal, SectionLabel, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const doctorsOf = (s: Specialty) => s.doctorIds.map((id) => DOCTORS.find((d) => d.id === id)).filter(Boolean) as typeof DOCTORS;

export function Specialties() {
  const [active, setActive] = useState(0);
  const current = SPECIALTIES[active];

  return (
    <section id="especialidades" className="relative overflow-hidden bg-pine-800 py-24 text-cream-50 sm:py-32">
      <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-pine-500/30 blur-[140px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-rose-400/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="02" tone="dark">
              Especialidades
            </SectionLabel>
            <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight">
              <SplitWords text="Um só lugar para *cada* *fase* da infância." accentClassName="italic text-rose-300" />
            </h2>
          </div>
          <Reveal className="max-w-sm text-lg leading-relaxed text-cream-100/70">
            Quando a criança precisa de mais de uma especialidade, o cuidado acontece dentro da mesma equipe, com as médicas conversando entre si.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Índice */}
          <ul className="min-w-0 lg:col-span-6" role="tablist" aria-label="Especialidades">
            {SPECIALTIES.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="border-b border-white/10">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
                    className="group flex w-full items-center gap-5 py-5 text-left sm:py-6"
                  >
                    <span className={`w-8 text-xs font-semibold tabular-nums transition-colors ${on ? "text-rose-300" : "text-cream-100/35"}`}>0{i + 1}</span>
                    <span className={`font-display min-w-0 flex-1 text-2xl font-medium tracking-tight transition-all duration-500 sm:text-[2rem] ${on ? "translate-x-2 italic text-cream-50" : "text-cream-100/55 group-hover:text-cream-100/85"}`}>
                      {s.title}
                    </span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? "rotate-45 border-rose-300 bg-rose-300 text-pine-900" : "border-white/15 text-cream-100/60"}`}>
                      <Plus weight="bold" className="h-4 w-4" />
                    </span>
                  </button>

                  {/* No celular o painel abre logo abaixo do item */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      >
                        <Panel s={s} compact />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Painel fixo no desktop */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                >
                  <Panel s={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-white/[0.06] p-7 ring-1 ring-white/10 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="font-display text-2xl font-medium">Não sabe qual especialista procurar?</p>
            <p className="mt-1 text-cream-100/70">Conte o que está acontecendo. Nossa equipe orienta o melhor caminho.</p>
          </div>
          <PrimaryCta location="especialidades" tone="rose" message="Olá! Gostaria de ajuda para saber qual especialista procurar para meu filho.">
            Pedir orientação
          </PrimaryCta>
        </Reveal>
      </div>
    </section>
  );
}

function Panel({ s, compact = false }: { s: Specialty; compact?: boolean }) {
  const docs = doctorsOf(s);
  return (
    <div className={compact ? "pb-7" : ""}>
      <div className={`relative overflow-hidden rounded-[2rem] bg-pine-700 shadow-glass ring-1 ring-white/10 ${compact ? "aspect-[16/11]" : "aspect-[5/4]"}`}>
        <motion.img
          key={s.photo}
          src={assetUrl(s.photo)}
          alt={docs.map((d) => d.name).join(" e ")}
          loading="lazy"
          className="h-full w-full object-cover object-[50%_20%]"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-900/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5">
          {docs.map((d) => (
            <span key={d.id} className="rounded-full bg-cream-50/95 px-3.5 py-1.5 text-xs font-semibold text-pine-800 backdrop-blur">
              {d.name}
              {d.crm && <span className="ml-1.5 font-medium text-pine-800/55">{d.crm}</span>}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-lg leading-relaxed text-cream-100/85">{s.lead}</p>
      <ul className="mt-5 grid grid-cols-2 gap-2.5">
        {s.topics.map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + i * 0.06 }}
            className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3.5 py-3 text-sm text-cream-100/90 ring-1 ring-white/10"
          >
            <ArrowRight weight="bold" className="h-3.5 w-3.5 shrink-0 text-rose-300" />
            {t}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
