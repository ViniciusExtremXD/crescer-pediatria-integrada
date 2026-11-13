import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Butterfly, CookingPot, Eye, HandPalm, Microscope, Phone, ShieldCheck, Smiley, Sparkle, Virus } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { ART_SPECIALTIES, COMPANY, COURSES, LASER, NATAL_PHOTOS, OTHER_SERVICES, SABORES_PHOTOS, TESTS, assetUrl, type TestIcon } from "../data/site";
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
            Consultas, testes rápidos e terapias no mesmo endereço: menos idas e vindas para a família e uma equipe que conversa entre si sobre cada criança.
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
            <div className="mx-auto mt-6 max-w-4xl rounded-[2rem] bg-white/85 p-6 shadow-soft ring-1 ring-white sm:p-9">
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
                    className="group flex items-start gap-4 rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-white transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card"
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

        <AlemDasConsultas />
      </div>
    </section>
  );
}

/*
 * "Além das consultas, o que você encontra na Crescer?"
 * Conteúdo e linguagem visual do carrossel oficial (DfaSrXSFQa7): bloco rosa
 * com borda recortada, prancheta da laserterapia, selo de cera e polaroids do curso.
 */
function AlemDasConsultas() {
  const [terapia, bio, amamentacao, puericultura] = OTHER_SERVICES;
  const [gestantes, sabores] = COURSES;

  return (
    <div className="mt-28 sm:mt-36">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">Além das consultas</p>
          <h3 className="font-display mt-4 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.04] tracking-tight text-pine-700">
            <SplitWords text="O que você *encontra* na Crescer" accentClassName="italic text-rose-400" />
          </h3>
        </div>
        <Reveal className="text-lg leading-relaxed text-pine-800/70 lg:col-span-5">
          Serviços que completam o acompanhamento da criança, da alimentação à amamentação, com a mesma equipe e no mesmo endereço.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        {/* Terapia alimentar + bioimpedância (slide 5) */}
        <Reveal className="group relative flex flex-col overflow-hidden rounded-[2.25rem] bg-rose-400 text-cream-50 shadow-card lg:col-span-5">
          <div className="relative px-7 pb-10 pt-8 text-center sm:px-10">
            <span className="inline-block rounded-md border border-dashed border-cream-50/50 bg-pine-600 px-3 py-1.5 text-xs font-semibold tracking-wide">
              {terapia.kicker}
            </span>
            <h4 className="font-display mt-5 text-3xl font-medium sm:text-4xl">{terapia.title}</h4>
            <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-cream-50/90">{terapia.desc}</p>
            <h4 className="font-display mt-7 text-3xl font-medium sm:text-4xl">{bio.title}</h4>
            <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-cream-50/90">{bio.desc}</p>
          </div>
          <div className="relative mt-auto h-56 overflow-hidden sm:h-64">
            <img
              src={assetUrl("images/servicos/terapia-alimentar.webp")}
              alt="Mão de criança pegando pedaços de banana no prato"
              loading="lazy" decoding="async"
              className="h-full w-full object-cover object-[40%_40%] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
            />
            {/* borda recortada da arte */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-3"
              style={{ backgroundImage: "radial-gradient(circle at 50% 0, #D4898F 10px, transparent 10.5px)", backgroundSize: "20px 12px", backgroundRepeat: "repeat-x" }}
            />
            <WaxSeal className="absolute right-6 top-4 h-16 w-16" />
          </div>
        </Reveal>

        {/* Laserterapia na prancheta (slide 7) */}
        <Reveal delay={0.08} className="relative flex flex-col justify-center rounded-[2.25rem] bg-rose-200 px-4 pb-6 pt-12 shadow-card sm:px-10 sm:pb-10 lg:col-span-7">
          <Clip className="absolute left-1/2 top-0 h-16 w-32 -translate-x-1/2 -translate-y-3" />
          <div className="relative rounded-md bg-white px-6 pb-8 pt-9 text-center shadow-soft [clip-path:polygon(0_1%,6%_0,14%_1.2%,22%_0.2%,31%_1%,40%_0,49%_1.1%,58%_0.1%,67%_1%,76%_0,85%_1.2%,93%_0.2%,100%_1%,99.6%_50%,100%_99%,92%_100%,83%_98.9%,74%_99.9%,65%_99%,56%_100%,47%_98.9%,38%_99.8%,29%_99%,20%_100%,11%_98.9%,3%_99.8%,0_99%,0.4%_50%)] sm:px-10">
            <h4 className="font-display text-4xl font-medium text-rose-400 sm:text-5xl">{LASER.title}</h4>
            <p className="font-display mt-3 text-lg font-medium text-pine-700 sm:text-xl">{LASER.lead}</p>
            <ul className="mt-7 grid gap-x-8 gap-y-5 text-left sm:grid-cols-2">
              {LASER.uses.map((u, i) => (
                <motion.li
                  key={u.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + i * 0.07 }}
                >
                  <p className="flex items-center gap-2 font-semibold text-rose-500">
                    <Sparkle weight="fill" className="h-4 w-4 shrink-0" />
                    {u.title}
                  </p>
                  <p className="mt-1 pl-6 text-[15px] leading-snug text-pine-800/75">{u.desc}</p>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold text-pine-700 underline decoration-pine-600/40 underline-offset-4">{LASER.note}</p>
          </div>
        </Reveal>

        {/* Consultoria de amamentação + puericultura (slide 8) */}
        <Reveal className="group relative overflow-hidden rounded-[2.25rem] bg-pine-800 shadow-card lg:col-span-12">
          <div className="absolute inset-0">
            <ParallaxImage
              src={assetUrl("images/servicos/mao-bebe.webp")}
              alt="Mãozinha de bebê saindo da manga de tricô sobre a manta"
              amount={8}
              position="60% 50%"
              className="h-full w-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-pine-950/50 via-pine-950/15 to-transparent" />
          <div className="relative grid gap-0 p-5 sm:p-8 md:max-w-[46rem] md:grid-cols-2 lg:p-10">
            {[amamentacao, puericultura].map((s, i) => (
              <div
                key={s.id}
                className={`relative bg-rose-100/95 px-7 py-7 text-center sm:px-9 ${
                  i ? "rounded-b-2xl pt-10 md:rounded-l-none md:rounded-r-2xl md:pt-7" : "z-10 rounded-t-2xl pb-10 md:rounded-l-2xl md:rounded-tr-none md:pb-7"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-pine-500">{s.kicker}</p>
                <h4 className="font-display mt-2 text-3xl font-medium leading-tight text-rose-400 sm:text-4xl">{s.title}</h4>
                <p className="mt-2.5 text-[15px] leading-relaxed text-pine-800/80">{s.desc}</p>
                {i === 0 && (
                  <>
                    <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-cream-50/80 md:inset-x-auto md:inset-y-0 md:-right-px md:h-auto md:w-0.5" />
                    <WaxSeal className="absolute -bottom-8 left-1/2 z-10 h-16 w-16 -translate-x-1/2 md:bottom-auto md:left-auto md:-right-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0" />
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Curso para gestantes: mesmo formato da oficina de seletividade, com as fotos passando em polaroids */}
        <Reveal className="relative grid overflow-hidden rounded-[2.25rem] bg-[#8DA9A1] text-cream-50 shadow-card lg:col-span-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine-900/70">{gestantes.for}</p>
            <h4 className="font-display mt-3 text-[1.7rem] font-medium leading-tight sm:text-3xl">{gestantes.title}</h4>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream-50/90">{gestantes.desc}</p>
            <ul className="mt-6 space-y-2.5">
              {gestantes.learn.map((l) => (
                <li key={l} className="flex items-center gap-2.5 text-[15px] font-medium">
                  <Sparkle weight="fill" className="h-4 w-4 shrink-0 text-pine-700" /> {l}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg border border-dashed border-cream-50/50 bg-pine-600 px-4 py-3 text-sm font-medium">
              E outros cuidados que fazem parte da rotina com um recém-nascido.
            </p>
            <WhatsAppLink
              location="cursos"
              message="Olá! Gostaria de saber sobre a próxima turma do curso Primeiros Cuidados com o Bebê Recém-Nascido."
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cream-50 underline decoration-cream-50/40 underline-offset-4 hover:decoration-cream-50"
            >
              Quero saber da próxima turma <ArrowUpRight weight="bold" className="h-4 w-4" />
            </WhatsAppLink>
          </div>
          <PolaroidReel photos={NATAL_PHOTOS} alt="Gestantes e famílias aprendendo os cuidados com o recém-nascido no curso da Crescer" />
        </Reveal>

        {/* Curso Descobrindo Novos Sabores (dificuldades alimentares): mesmo formato do curso de gestantes, com as fotos passando em polaroids */}
        <Reveal className="relative grid overflow-hidden rounded-[2.25rem] bg-rose-200 shadow-card lg:col-span-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative p-7 sm:p-10">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
              <CookingPot weight="duotone" className="h-4 w-4" /> {sabores.for}
            </p>
            <h4 className="font-display mt-3 text-[1.9rem] font-medium leading-tight text-pine-700 sm:text-4xl">{sabores.title}</h4>
            <p className="font-display mt-2 text-xl italic text-rose-500 sm:text-2xl">{sabores.subtitle}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-pine-800/75">{sabores.desc}</p>
            <WhatsAppLink
              location="cursos"
              message="Olá! Gostaria de saber sobre a próxima turma do curso Descobrindo Novos Sabores."
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pine-700 underline decoration-pine-600/40 underline-offset-4 hover:decoration-pine-600"
            >
              Quero saber da próxima turma <ArrowUpRight weight="bold" className="h-4 w-4" />
            </WhatsAppLink>
          </div>
          <PolaroidReel photos={SABORES_PHOTOS} alt="Crianças em atividade de alimentação na Crescer" />
        </Reveal>
      </div>

      <p className="mt-6 text-center text-sm text-pine-800/55">A indicação de exames, terapias e procedimentos é feita na consulta, de acordo com cada criança.</p>
    </div>
  );
}

/*
 * Fotos do curso em polaroids que passam sozinhas para o lado.
 * - só baixa as fotos quando a seção está chegando (não disputa banda com o topo da página);
 * - espera todas decodificarem e só então começa, então nunca aparece polaroid vazia;
 * - velocidade constante em px/s, qualquer que seja o número de fotos ou a largura da tela;
 * - para fora da tela (lib/visibility.ts) e, só com mouse, quando o ponteiro passa por cima.
 */
const TILTS = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3.5, 2];
const REEL_SPEED = 42; // px por segundo

function PolaroidReel({ photos, alt }: { photos: { src: string; w: number; h: number }[]; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const loop = [...photos, ...photos];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!near || !el) return;
    let cancelled = false;
    const setDuration = () => el.style.setProperty("--reel-duration", `${Math.max(24, el.scrollWidth / 2 / REEL_SPEED).toFixed(1)}s`);
    const ro = new ResizeObserver(setDuration);
    Promise.all([...el.querySelectorAll("img")].map((img) => img.decode().catch(() => undefined))).then(() => {
      if (cancelled) return;
      setDuration();
      ro.observe(el);
      setReady(true);
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [near]);

  return (
    <div ref={root} data-ready={ready} className="reel pause-hover relative flex min-h-[300px] items-center overflow-hidden py-8 mask-fade-x lg:min-h-full">
      <div ref={track} className="reel-track items-center gap-5 pr-5">
        {loop.map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            aria-hidden={i >= photos.length}
            className="shrink-0 rounded-[3px] bg-cream-50 p-2 pb-8 shadow-soft"
            style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
          >
            <img
              src={near ? assetUrl(p.src) : undefined}
              width={p.w}
              height={p.h}
              alt={i < photos.length ? alt : ""}
              loading="eager"
              decoding="async"
              draggable={false}
              className="h-40 w-auto rounded-[2px] sm:h-56 lg:h-64"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

/* Selo de cera com o símbolo da Crescer, como nos posts. O posicionamento fica no wrapper: o transform do framer não pode disputar com o translate. */
function WaxSeal({ className }: { className?: string }) {
  return (
    <span aria-hidden className={className}>
      <motion.span
        initial={{ scale: 0, rotate: -40 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.25 }}
        className="grid h-full w-full place-items-center rounded-[46%_54%_50%_50%/52%_48%_52%_48%] bg-[radial-gradient(circle_at_35%_30%,#E9AEB4,#C9777F_55%,#A85A64)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(90,25,35,0.3),0_6px_14px_-6px_rgba(110,40,50,0.55)]"
      >
        <span className="grid h-[72%] w-[72%] place-items-center rounded-full shadow-[inset_0_2px_4px_rgba(90,25,35,0.35),0_1px_0_rgba(255,255,255,0.3)]">
          <img src={assetUrl("logo-mark-light.svg")} alt="" className="h-[70%] w-[70%] opacity-90" />
        </span>
      </motion.span>
    </span>
  );
}

/* Prendedor da prancheta. */
function Clip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="clip-metal" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F4F4F2" />
          <stop offset="0.55" stopColor="#B9BBBA" />
          <stop offset="1" stopColor="#8E9190" />
        </linearGradient>
      </defs>
      <path d="M40 30 V16 C40 6 48 2 64 2 C80 2 88 6 88 16 V30 Z" fill="url(#clip-metal)" stroke="#7E8180" strokeWidth="1.5" />
      {[50, 56, 62, 68, 74].map((x) => (
        <rect key={x} x={x} y="9" width="3" height="18" rx="1.5" fill="#8E9190" opacity="0.7" />
      ))}
      <rect x="8" y="28" width="112" height="22" rx="7" fill="url(#clip-metal)" stroke="#7E8180" strokeWidth="1.5" />
      <circle cx="20" cy="39" r="3.5" fill="#7E8180" />
      <circle cx="108" cy="39" r="3.5" fill="#7E8180" />
    </svg>
  );
}

/* Margarida da arte: brota com mola e balança devagar (o balanço fica num wrapper HTML, que a GPU anima). */
function Daisy({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block ${className ?? ""}`}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay }}
      style={{ originY: 1 }}
    >
      <span className="block h-full w-full origin-bottom animate-sway will-change-transform" style={{ animationDelay: `${delay}s` }}>
        <svg viewBox="0 0 60 84" className="h-full w-full">
          <path d="M30 30 C 32 50 28 64 30 84" stroke="#5F8F80" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M30 60 C 22 54 16 56 12 62 C 20 64 26 63 30 60Z" fill="#5F8F80" />
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse key={i} cx="30" cy="12" rx="4.4" ry="10" fill="#FFFFFF" transform={`rotate(${i * 36} 30 24)`} />
          ))}
          <circle cx="30" cy="24" r="6.5" fill="#F6C343" />
        </svg>
      </span>
    </motion.span>
  );
}

/* Borboleta que flutua pelo painel (animação CSS, só no compositor). */
function FloatingButterfly({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute hidden animate-flutter will-change-transform md:block ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      <Butterfly weight="fill" className="h-12 w-12" />
    </span>
  );
}
