import { motion } from "framer-motion";
import { ArrowUpRight, Quotes, Star } from "@phosphor-icons/react";
import { COMPANY, GOOGLE_REVIEWS, pushEvent } from "../data/site";
import { Counter, EASE_OUT, Reveal, SectionLabel, SplitWords } from "../components/motion";

type Review = (typeof GOOGLE_REVIEWS)[number];

/*
 * Avaliações reais do perfil da clínica no Google. Duas faixas correm em sentidos opostos
 * e param quando o mouse passa por cima, para dar tempo de ler.
 */
export function Reviews() {
  const half = Math.ceil(GOOGLE_REVIEWS.length / 2);
  const rowA = GOOGLE_REVIEWS.slice(0, half);
  const rowB = GOOGLE_REVIEWS.slice(half);

  return (
    <section id="avaliacoes" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-rose-200/50 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="07">Avaliações</SectionLabel>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
              <SplitWords text="O que as *famílias* dizem." />
            </h2>
          </div>

          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-6 rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-pine-600/5 sm:p-7">
              <div className="font-display text-6xl font-medium leading-none text-pine-700 sm:text-7xl">
                <Counter to={4.8} decimals={1} />
              </div>
              <div className="min-w-0">
                <div className="flex gap-1 text-[#F4B400]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span key={i} initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.2 + i * 0.08 }}>
                      <Star weight="fill" className="h-5 w-5" />
                    </motion.span>
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-pine-800">{COMPANY.googleReviews} avaliações no Google</p>
                <a
                  href={COMPANY.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pushEvent("google_reviews_click", { link_location: "avaliacoes" })}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-rose-600 underline decoration-rose-300 underline-offset-4 hover:decoration-rose-600"
                >
                  Ver todas no Google <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-16 space-y-5">
        <Row items={rowA} direction="left" />
        <Row items={rowB} direction="right" />
      </div>

      <p className="relative mx-auto mt-10 max-w-7xl px-5 text-xs text-pine-800/50 sm:px-8">
        Avaliações publicadas por pacientes no perfil da Crescer Pediatria Integrada no Google. Nomes abreviados.
      </p>
    </section>
  );
}

function Row({ items, direction }: { items: Review[]; direction: "left" | "right" }) {
  const loop = [...items, ...items];
  return (
    <div className="group mask-fade-x relative flex overflow-hidden py-4">
      <div
        className={`flex w-max shrink-0 gap-5 pr-5 ${direction === "left" ? "animate-marquee" : "animate-marquee-rev"} group-hover:[animation-play-state:paused]`}
        aria-hidden={false}
      >
        {loop.map((r, i) => (
          <ReviewCard key={`${r.author}-${i}`} r={r} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r, hidden }: { r: Review; hidden: boolean }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      aria-hidden={hidden}
      className="relative flex w-[300px] shrink-0 flex-col rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-pine-600/5 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:w-[380px] sm:p-7"
    >
      <Quotes weight="fill" className="absolute right-6 top-6 h-8 w-8 text-rose-100" />
      <div className="flex gap-0.5 text-[#F4B400]">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} weight="fill" className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-pine-800/85">“{r.text}”</blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-pine-600/10 pt-4">
        <span className="font-display text-lg font-medium text-pine-700">{r.author}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-pine-400">Google</span>
      </figcaption>
    </motion.figure>
  );
}
