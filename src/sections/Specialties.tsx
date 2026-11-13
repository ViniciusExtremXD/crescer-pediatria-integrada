import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, SealCheck } from "@phosphor-icons/react";
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
  const solo = docs.length === 1;
  return (
    <div className={compact ? "pb-7" : ""}>
      {/* Retratos dos ensaios oficiais, com nome, especialidade, CRM e RQE */}
      <div className={`grid gap-3 ${solo ? "grid-cols-[0.95fr_1.05fr]" : "grid-cols-2"}`}>
        {docs.map((d, i) => (
          <motion.figure
            key={d.id}
            className={`relative overflow-hidden rounded-[1.6rem] bg-rose-200 ring-1 ring-white/10 ${compact ? "aspect-[4/5]" : solo ? "aspect-[4/5]" : "aspect-[5/6]"}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.1 }}
          >
            <motion.img
              src={assetUrl(d.photo)}
              alt={`${d.name}, ${d.title}`}
              loading="lazy"
              style={{ objectPosition: d.focus }}
              className="h-full w-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: EASE_OUT }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent" />
            {!solo && (
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                <p className="font-display text-lg font-medium leading-tight text-cream-50 sm:text-2xl">{d.name}</p>
                <p className="mt-0.5 text-xs font-semibold text-rose-200 sm:text-sm">{d.title}</p>
                {d.crm && <p className="mt-1 text-[11px] font-medium text-cream-100/80 sm:text-xs">{d.crm}</p>}
              </figcaption>
            )}
          </motion.figure>
        ))}
        {solo && (
          <motion.div
            className="flex flex-col justify-between rounded-[1.6rem] bg-white/[0.05] p-5 ring-1 ring-white/10 sm:p-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-300">Atendimento com</p>
              <p className="font-display mt-3 text-2xl font-medium leading-tight sm:text-[2rem]">{docs[0].name}</p>
              <p className="mt-1.5 text-sm font-semibold text-rose-200">{docs[0].title}</p>
              {docs[0].crm && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-cream-100/85 ring-1 ring-white/10">
                  <SealCheck weight="fill" className="h-3.5 w-3.5 text-rose-300" /> {docs[0].crm}
                </p>
              )}
            </div>
            <div className="mt-6">
              <PrimaryCta location={`especialidade_${s.id}`} tone="rose" size="md" message={`Olá! Gostaria de agendar uma consulta de ${s.title} com a ${docs[0].name}.`}>
                Agendar
              </PrimaryCta>
            </div>
          </motion.div>
        )}
      </div>
      <p className={`text-lg leading-relaxed text-cream-100/85 ${s.details ? "mt-5" : "mt-6"}`}>{s.lead}</p>
      {s.details ? (
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {s.topics.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 + i * 0.05 }}
              className="rounded-2xl bg-white/[0.045] px-4 py-3.5 ring-1 ring-inset ring-white/[0.08] transition-colors duration-300 hover:bg-white/[0.08]"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-cream-50">
                <ArrowRight weight="bold" className="h-3.5 w-3.5 shrink-0 text-rose-300" />
                {t}
              </p>
              <p className="mt-1 pl-[1.375rem] text-[13px] leading-snug text-cream-100/70">{s.details?.[i]}</p>
            </motion.li>
          ))}
        </ul>
      ) : (
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
      )}
    </div>
  );
}
