import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SPACE_GALLERY, assetUrl } from "../data/site";
import { EASE_OUT, Leaf, SectionLabel, SplitWords } from "../components/motion";

/*
 * Galeria do espaço: no desktop a seção fica presa enquanto as fotos correm na horizontal
 * conforme a rolagem; no celular vira um carrossel de arrastar.
 */
export function Space() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ["0%", "-68%"]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="espaco" ref={ref} className="relative bg-rose-100 md:h-[340vh]">
      {/* Desktop: pinado */}
      <div className="sticky top-0 hidden h-screen flex-col overflow-hidden md:flex">
        <div className="bg-dots absolute inset-0 opacity-50" />
        <div className="relative mx-auto flex w-full max-w-7xl items-end justify-between gap-8 px-8 pt-28">
          <div>
            <SectionLabel index="05">O espaço</SectionLabel>
            <h2 className="font-display mt-5 max-w-2xl text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
              <SplitWords text="Pensado para a criança se sentir *em* *casa*." />
            </h2>
          </div>
          <Leaf className="mb-2 h-16 w-16" />
        </div>

        <div className="relative mt-10 flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-6 pl-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            {SPACE_GALLERY.map((g, i) => (
              <figure key={g.src} className={`group relative shrink-0 overflow-hidden rounded-[2rem] bg-cream-200 ${i % 2 ? "mt-16 h-[46vh] w-[34vw]" : "h-[54vh] w-[30vw]"}`}>
                <img src={assetUrl(g.src)} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-900/75 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-2xl font-medium italic text-cream-50">{g.title}</p>
                  <p className="mt-1 max-w-xs text-sm text-cream-100/85">{g.caption}</p>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto mb-10 w-full max-w-7xl px-8">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-pine-600/10">
            <motion.div style={{ width: progress }} className="h-full rounded-full bg-pine-600" />
          </div>
        </div>
      </div>

      {/* Celular: carrossel */}
      <div className="py-24 md:hidden">
        <div className="px-5">
          <SectionLabel index="05">O espaço</SectionLabel>
          <h2 className="font-display mt-5 text-[2.5rem] font-medium leading-[1.04] tracking-tight text-pine-700">
            <SplitWords text="Pensado para a criança se sentir *em* *casa*." />
          </h2>
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
          {SPACE_GALLERY.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: Math.min(i, 2) * 0.08 }}
              className="relative h-[62vh] max-h-[520px] w-[80vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem]"
            >
              <img src={assetUrl(g.src)} alt={g.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-900/75 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl font-medium italic text-cream-50">{g.title}</p>
                <p className="mt-1 text-sm text-cream-100/85">{g.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
