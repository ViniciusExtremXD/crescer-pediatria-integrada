import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";
import { ArrowDown, ArrowRight, Star } from "@phosphor-icons/react";
import { COMPANY, DOCTORS, assetUrl } from "../data/site";
import { Counter, EASE_IN_OUT, EASE_OUT, Leaf, SplitWords, VelocityMarquee } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const AUDIENCES = ["bebês", "crianças", "adolescentes", "famílias"];

const MARQUEE = [
  "Pediatria",
  "Gastroenterologia",
  "Pneumologia",
  "Alergia e Imunologia",
  "Neurodesenvolvimento",
  "Infectologia",
  "Hematologia",
  "Nutrição",
  "Fisioterapia respiratória",
  "Fonoaudiologia",
];

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useElementProgress(ref, ["start start", "end start"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const polaroidY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);

  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  return (
    <section
      id="topo"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream-50 pt-28 sm:pt-32"
    >
      {/* Atmosfera */}
      <div className="bg-dots mask-fade-b absolute inset-0 -z-10 opacity-50" />
      <div className="glow absolute -right-64 -top-48 -z-10 h-[900px] w-[900px] [--glow-a:0.7] [--glow:251_218_221]" />
      <div className="glow absolute -left-56 -bottom-10 -z-10 h-[640px] w-[640px] [--glow-a:0.85] [--glow:220_234_228]" />
      <motion.div aria-hidden className="glow pointer-events-none absolute left-0 top-0 -z-10 hidden h-[660px] w-[660px] [--glow-a:0.45] [--glow:242_184_191] md:block" style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", willChange: "transform" }} />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative lg:col-span-7">
          <Leaf className="absolute -left-2 -top-10 hidden h-10 w-10 sm:block" delay={0.4} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="mb-7 inline-flex max-w-full items-center gap-1.5 rounded-full border border-pine-600/10 bg-white/70 py-1.5 pl-1.5 pr-2.5 text-[12px] font-medium text-pine-700 shadow-soft min-[360px]:gap-2.5 min-[360px]:pr-4 min-[360px]:text-[13px]"
          >
            <span className="shrink-0 whitespace-nowrap rounded-full bg-pine-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white min-[360px]:tracking-widest">Macapá · AP</span>
            <span className="min-w-0 truncate">
              <span className="sm:hidden">Especialidades pediátricas</span>
              <span className="hidden sm:inline">Clínica de especialidades pediátricas</span>
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,7vw,5.9rem)] font-medium leading-[0.98] tracking-tightest text-pine-700">
            <SplitWords text="Pediatria feita" immediate={ready} delay={0.1} className="block" />
            <SplitWords text="com *amor* e" immediate={ready} delay={0.28} className="block" />
            <SplitWords text="dedicação." immediate={ready} delay={0.45} className="block" />
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.75 }}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-pine-800/75 sm:text-xl">
              Pediatria, subespecialidades, testes e terapias no mesmo endereço. Do recém-nascido à adolescência, uma equipe que acompanha{" "}
              <RotatingWord words={AUDIENCES} /> com tempo para ouvir, examinar e explicar.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-5">
              <PrimaryCta location="hero">
                <span className="sm:hidden">Agendar consulta</span>
                <span className="hidden sm:inline">Agendar pelo WhatsApp</span>
              </PrimaryCta>
              <a href="#equipe" className="group inline-flex h-14 items-center gap-3 rounded-full px-2 text-[15px] font-semibold text-pine-700">
                <span className="relative">
                  Conheça a equipe
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-pine-600/40 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0" />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-pine-600/20 transition-colors group-hover:bg-pine-600 group-hover:text-white">
                  <ArrowDown weight="bold" className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" />
                </span>
              </a>
            </div>

            <a
              href="#consulta-de-demanda"
              className="group mt-7 inline-flex max-w-full items-center gap-2.5 rounded-full bg-rose-100 py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-pine-700 ring-1 ring-rose-200 transition-colors hover:bg-rose-200"
            >
              <span className="shrink-0 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Novo</span>
              <span className="min-w-0 truncate">
                <span className="sm:hidden">Pediatra no mesmo dia</span>
                <span className="hidden sm:inline">Consulta de Demanda: pediatra no mesmo dia</span>
              </span>
              <ArrowRight weight="bold" className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-pine-600/10 pt-6">
              <div>
                <dt className="sr-only">Avaliação no Google</dt>
                <dd className="font-display flex items-baseline gap-1 text-3xl font-medium text-pine-700 sm:text-4xl">
                  <Counter to={4.8} decimals={1} />
                  <Star weight="fill" className="h-5 w-5 self-center text-rose-400" />
                </dd>
                <p className="mt-1 text-xs font-medium text-pine-800/60 sm:text-sm">{COMPANY.googleReviews} avaliações no Google</p>
              </div>
              <div>
                <dt className="sr-only">Médicas especialistas</dt>
                <dd className="font-display text-3xl font-medium text-pine-700 sm:text-4xl">
                  <Counter to={DOCTORS.length} />
                </dd>
                <p className="mt-1 text-xs font-medium text-pine-800/60 sm:text-sm">médicas especialistas</p>
              </div>
              <div>
                <dt className="sr-only">Anos de história</dt>
                <dd className="font-display text-3xl font-medium text-pine-700 sm:text-4xl">
                  <Counter to={COMPANY.years} /> anos
                </dd>
                <p className="mt-1 text-xs font-medium text-pine-800/60 sm:text-sm">cuidando de Macapá</p>
              </div>
            </dl>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="relative lg:col-span-5">
          <HeroVisual ready={ready} polaroidY={polaroidY} />
        </motion.div>
      </div>

      {/* Faixa de especialidades */}
      <div className="relative border-y border-pine-600/10 bg-rose-100/70 py-5">
        <VelocityMarquee baseVelocity={-0.7}>
          {MARQUEE.map((m) => (
            <span key={m} className="flex items-center">
              <span className="font-display px-7 text-3xl font-medium italic tracking-tight text-pine-600 sm:text-5xl">{m}</span>
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-rose-400 sm:h-7 sm:w-7" aria-hidden>
                <path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.7 1.2 5.3 3 1.6-1.8 3.2-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" />
              </svg>
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="font-display inline-block font-medium italic text-rose-500"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroVisual({ ready, polaroidY }: { ready: boolean; polaroidY: MotionValue<string> }) {
  const faces = DOCTORS.filter((d) => ["karla", "nathalia", "regiane", "luciana"].includes(d.id));
  return (
    <div className="relative mx-auto max-w-[460px] lg:max-w-none">
      <Leaf className="absolute -right-3 -top-8 z-20 h-12 w-12" delay={1.2} />

      {/* Foto principal em arco */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 36px 36px)" }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 36px 36px)" } : undefined}
        transition={{ duration: 1.35, ease: EASE_IN_OUT, delay: 0.3 }}
        className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[36px] bg-rose-100 shadow-float"
      >
        <motion.img
          src={assetUrl("images/criancas-brincando.webp")}
          alt="Crianças brincando na mesa de atividades da brinquedoteca da Crescer"
          width={1600}
          height={1066}
          className="h-full w-full object-cover object-[52%_50%]"
          initial={{ scale: 1.35 }}
          animate={ready ? { scale: 1.04 } : undefined}
          transition={{ duration: 2.2, ease: EASE_OUT, delay: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-900/35 via-transparent to-transparent" />
      </motion.div>

      {/* Polaroid da consulta */}
      <motion.figure
        style={{ y: polaroidY }}
        initial={{ opacity: 0, y: 40, rotate: -12 }}
        animate={ready ? { opacity: 1, y: 0, rotate: -6 } : undefined}
        transition={{ duration: 1, ease: EASE_OUT, delay: 1.05 }}
        className="absolute -bottom-10 -left-4 w-40 rounded-2xl bg-white p-2 pb-3 shadow-lift sm:-left-12 sm:w-48"
      >
        <img src={assetUrl("images/menina-e-pediatra.webp")} alt="Pediatra da Crescer sorrindo ao lado de uma menina" width={1400} height={1026} loading="eager" className="aspect-square w-full rounded-xl object-cover object-[55%_35%]" />
        <figcaption className="font-display mt-2 text-center text-sm italic text-pine-600">cuidado que acolhe</figcaption>
      </motion.figure>

      {/* Selo Google */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={ready ? { opacity: 1, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 1.35 }}
        className="absolute right-3 top-[16%] rounded-2xl bg-white/95 px-4 py-3 shadow-lift 2xl:-right-8"
      >
        <div className="flex gap-0.5 text-rose-400">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} weight="fill" className="h-3.5 w-3.5" />
          ))}
        </div>
        <p className="mt-1 text-sm font-bold text-pine-800">
          {COMPANY.googleRating} <span className="font-medium text-pine-800/60">no Google</span>
        </p>
      </motion.div>

      {/* Equipe */}
      <motion.a
        href="#equipe"
        initial={{ opacity: 0, x: 30 }}
        animate={ready ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.5 }}
        className="group absolute right-3 bottom-[12%] flex items-center gap-3 rounded-full bg-pine-700 py-2 pl-2 pr-5 text-white shadow-pine 2xl:-right-10"
      >
        <span className="flex -space-x-3">
          {faces.map((d) => (
            <img key={d.id} src={assetUrl(d.photo)} alt="" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-pine-700 object-cover object-top transition-transform duration-300 group-hover:-translate-y-0.5" />
          ))}
        </span>
        <span className="text-sm font-semibold leading-tight">
          {DOCTORS.length} especialistas
          <span className="block text-xs font-medium text-pine-100/80">em um só lugar</span>
        </span>
      </motion.a>
    </div>
  );
}
