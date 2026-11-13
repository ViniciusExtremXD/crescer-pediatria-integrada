import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Butterfly, CookingPot, Eye, ForkKnife, HandPalm, Microscope, Phone, Scales, ShieldCheck, Smiley, Sparkle, Virus } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { ART_SPECIALTIES, COMPANY, COURSES, OTHER_SERVICES, TESTS, assetUrl, type TestIcon } from "../data/site";
import { EASE_OUT, ParallaxImage, Reveal, SectionLabel, SplitWords } from "../components/motion";
import { PhoneLink, PrimaryCta, WhatsAppLink } from "../components/cta";

const TEST_ICONS: Record<TestIcon, Icon> = {
  microscope: Microscope,
  virus: Virus,
  baby: Baby,
  eye: Eye,
  smiley: Smiley,
  hand: HandPalm,
  shield: ShieldCheck,
};

/*
 * Inspirada na arte oficial "Cuidado completo para cada fase do seu filho":
 * fundo rosa com árvores suaves, lista de especialidades com estrelinhas,
 * testes em selos redondos e a faixa verde ondulada com o telefone.
 */
export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <SectionLabel index="04">Especialidades e testes</SectionLabel>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,5.2vw,4.6rem)] font-medium leading-[1.02] tracking-tight">
            <SplitWords text="Cuidado completo para cada" className="text-rose-400" wordClassName="text-rose-400" />{" "}
            <SplitWords text="fase do seu filho." delay={0.25} className="text-pine-600" />
          </h2>
          <Reveal className="mt-5 max-w-xl text-lg leading-relaxed text-pine-800/70">
            Consultas, testes e acompanhamento no mesmo lugar, com uma equipe que conversa entre si sobre cada criança.
          </Reveal>
        </div>

        {/* Painel no estilo da arte */}
        <Reveal className="relative mt-14 overflow-hidden rounded-[2.75rem] bg-rose-100 shadow-lift">
          {/* árvores suaves ao fundo */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 top-24 h-[70%] w-28 rounded-t-full bg-rose-200/60" />
            <div className="absolute left-[18%] top-10 h-[80%] w-20 rounded-t-full bg-rose-200/40" />
            <div className="absolute right-[8%] top-16 h-[75%] w-28 rounded-t-full bg-rose-200/60" />
            <div className="absolute right-[30%] top-32 h-[60%] w-16 rounded-t-full bg-rose-200/40" />
            <div className="bg-dots absolute inset-0 opacity-30" />
          </div>
          <FloatingButterfly className="left-[6%] top-[46%] text-pine-300" delay={0} />
          <FloatingButterfly className="right-[7%] top-[44%] text-rose-400" delay={1.5} />

          <div className="relative px-5 pb-[20rem] pt-10 sm:px-12 sm:pb-52 sm:pt-14">
            {/* Especialidades */}
            <div className="flex justify-center">
              <motion.span
                initial={{ opacity: 0, y: 14, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="font-display rounded-2xl bg-pine-600 px-7 py-3 text-2xl font-medium text-cream-50 shadow-pine sm:text-4xl"
              >
                Especialidades:
              </motion.span>
            </div>
            <div className="mx-auto mt-6 max-w-4xl rounded-[2rem] bg-white/75 p-6 shadow-soft ring-1 ring-white backdrop-blur sm:p-9">
              <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                {ART_SPECIALTIES.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 * i }}
                    className="group flex items-start gap-3 text-[17px] font-medium leading-snug text-pine-700"
                  >
                    <motion.span
                      initial={{ rotate: -90, scale: 0 }}
                      whileInView={{ rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 + 0.05 * i }}
                      className="mt-0.5 shrink-0 text-rose-400 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-125"
                    >
                      <Sparkle weight="fill" className="h-5 w-5" />
                    </motion.span>
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Testes */}
            <h3 className="font-display mt-14 text-center text-5xl font-medium text-pine-600 sm:text-6xl">Testes</h3>
            <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-4 [&>li]:w-full sm:[&>li]:w-[calc(50%-0.5rem)] lg:[&>li]:w-[calc(33.333%-0.7rem)]">
              {TESTS.map((t, i) => {
                const Ico = TEST_ICONS[t.icon];
                return (
                  <motion.li
                    key={t.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: (i % 3) * 0.08 }}
                    className="group flex items-start gap-4 rounded-3xl bg-white/80 p-5 shadow-soft ring-1 ring-white backdrop-blur transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card"
                  >
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-cream-50 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 ${
                        i % 2 ? "bg-pine-600 shadow-pine" : "bg-rose-400 shadow-rose"
                      }`}
                    >
                      <Ico weight="duotone" className="h-7 w-7" />
                    </span>
                    <span>
                      <span className="block font-semibold leading-tight text-pine-800">{t.title}</span>
                      <span className="mt-1 block text-sm leading-snug text-pine-800/65">{t.desc}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Faixa verde ondulada com margaridas, logo e telefone */}
          <div className="absolute inset-x-0 bottom-0">
            <svg viewBox="0 0 1200 90" preserveAspectRatio="none" className="block h-14 w-full sm:h-20" aria-hidden>
              <path d="M0 55 C 180 5 380 95 600 50 S 1000 0 1200 45 V90 H0Z" fill="#8DB3A5" />
            </svg>
            <div className="relative flex flex-col items-center justify-between gap-4 bg-pine-300 px-6 pb-7 pt-1 sm:flex-row sm:px-12 sm:pb-8">
              <Daisy className="absolute -top-16 left-[14%] h-20 w-14" delay={0.2} />
              <Daisy className="absolute -top-12 left-[22%] hidden h-14 w-10 sm:block" delay={0.4} />
              <Daisy className="absolute -top-16 right-[16%] h-20 w-14" delay={0.3} />
              <Daisy className="absolute -top-11 right-[24%] hidden h-14 w-10 sm:block" delay={0.5} />
              <img src={assetUrl("logo-crescer-light.svg")} alt="Crescer Pediatria Integrada" width={340} height={130} className="h-12 w-auto sm:h-14" />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <PhoneLink location="servicos" className="inline-flex items-center gap-2 text-2xl font-bold text-cream-50 drop-shadow sm:text-3xl">
                  <Phone weight="fill" className="h-6 w-6" /> {COMPANY.whatsappDisplay}
                </PhoneLink>
                <PrimaryCta location="servicos" size="md" tone="cream" message="Olá! Vi as especialidades e os testes no site da Crescer e gostaria de agendar.">
                  Agendar agora
                </PrimaryCta>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Outros serviços e cursos */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Reveal delay={0.05} className="relative overflow-hidden rounded-[2.5rem] bg-pine-700 p-8 text-cream-50 shadow-pine sm:p-10 lg:col-span-5">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pine-500/40 blur-2xl" />
            <h3 className="font-display relative text-3xl font-medium">
              Também na <span className="italic text-rose-200">Crescer</span>
            </h3>
            <ul className="relative mt-6 space-y-4">
              {OTHER_SERVICES.map((o, i) => {
                const Ico = i ? ForkKnife : Scales;
                return (
                  <li key={o.title} className="flex items-start gap-4 rounded-2xl bg-white/[0.06] p-4 shadow-glass ring-1 ring-white/10">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rose-300 text-pine-900">
                      <Ico weight="duotone" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{o.title}</span>
                      <span className="text-sm text-cream-100/70">{o.desc}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="relative mt-6 text-sm text-cream-100/60">A indicação de exames e terapias é feita pela especialista durante a consulta.</p>
          </Reveal>

          <Reveal delay={0.12} className="group relative grid overflow-hidden rounded-[2.5rem] bg-rose-100 shadow-card transition-shadow duration-500 hover:shadow-lift sm:grid-cols-[0.9fr_1.1fr] lg:col-span-7">
            <div className="relative min-h-[220px] overflow-hidden">
              <ParallaxImage src={assetUrl("images/curso-culinaria.webp")} alt="Crianças com as mãos sujas de massa no curso de culinária" amount={10} position="50% 40%" className="absolute inset-0" />
              <span className="absolute left-5 top-5 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pine-700 shadow-soft">Cursos para famílias</span>
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
    </section>
  );
}

/* Margarida da arte: brota com mola e balança devagar. */
function Daisy({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 60 84"
      className={className}
      aria-hidden
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay }}
      style={{ originY: 1 }}
    >
      <g className="animate-sway" style={{ transformOrigin: "30px 84px", animationDelay: `${delay}s` }}>
        <path d="M30 30 C 32 50 28 64 30 84" stroke="#5F8F80" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M30 60 C 22 54 16 56 12 62 C 20 64 26 63 30 60Z" fill="#5F8F80" />
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse key={i} cx="30" cy="12" rx="4.4" ry="10" fill="#FFFFFF" transform={`rotate(${i * 36} 30 24)`} />
        ))}
        <circle cx="30" cy="24" r="6.5" fill="#F6C343" />
      </g>
    </motion.svg>
  );
}

/* Borboleta que flutua pelo painel. */
function FloatingButterfly({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute hidden md:block ${className ?? ""}`}
      animate={{ y: [0, -18, 0, 10, 0], x: [0, 10, 18, 6, 0], rotate: [0, -8, 4, -4, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Butterfly weight="fill" className="h-12 w-12 drop-shadow-sm" />
    </motion.span>
  );
}
