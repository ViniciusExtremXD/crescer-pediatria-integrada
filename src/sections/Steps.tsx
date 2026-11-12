import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChatCircleDots, CalendarHeart, HeartStraight } from "@phosphor-icons/react";
import { EASE_OUT, SectionLabel, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const STEPS = [
  { icon: ChatCircleDots, title: "Chame no WhatsApp", text: "Conte a idade da criança e o motivo da consulta. Pode ser rápido." },
  { icon: CalendarHeart, title: "A equipe orienta", text: "Indicamos a especialista mais adequada e os próximos horários." },
  { icon: HeartStraight, title: "Consulta sem pressa", text: "Tempo para examinar, conversar e tirar todas as dúvidas." },
];

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="06">Como agendar</SectionLabel>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
              <SplitWords text="Três passos até a *consulta*." />
            </h2>
          </div>
          <PrimaryCta location="como_agendar" size="md">
            Começar agora
          </PrimaryCta>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Linha que se desenha com a rolagem (estetoscópio) */}
          <svg className="absolute left-0 top-10 hidden h-24 w-full md:block" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M60 50 C 260 -20, 340 120, 600 50 S 940 -20, 1140 50"
              fill="none"
              stroke="#D4898F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 0"
              style={{ pathLength: draw }}
            />
          </svg>

          <ol className="relative grid gap-6 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.15 }}
                className="group relative rounded-[2rem] bg-white p-8 shadow-card transition-shadow duration-500 hover:shadow-lift ring-1 ring-pine-600/5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-rose-100 text-rose-500 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                    <Icon weight="duotone" className="h-8 w-8" />
                  </span>
                  <span className="font-display text-6xl font-medium italic text-pine-100">{i + 1}</span>
                </div>
                <h3 className="font-display mt-6 text-2xl font-medium text-pine-700">{title}</h3>
                <p className="mt-2 leading-relaxed text-pine-800/70">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
