import { motion } from "framer-motion";
import { InstagramLogo, Play, ArrowUpRight } from "@phosphor-icons/react";
import { COMPANY, INSTAGRAM_POSTS, assetUrl, pushEvent } from "../data/site";
import { EASE_OUT, Magnetic, Reveal, SectionLabel, SplitWords } from "../components/motion";

export function Instagram() {
  return (
    <section id="instagram" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="08">Instagram</SectionLabel>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
              <SplitWords text="Acompanhe a Crescer de *pertinho*." />
            </h2>
            <p className="mt-4 max-w-md text-lg text-pine-800/70">Dicas das especialistas, novidades da clínica e os bastidores do cuidado.</p>
          </div>
          <Reveal>
            <Magnetic strength={0.2}>
              <a
                href={COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("instagram_click", { link_location: "secao_instagram" })}
                className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-pine-600 p-1.5 pr-6 text-white shadow-rose"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/20">
                  <InstagramLogo weight="bold" className="h-6 w-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">@{COMPANY.instagramHandle}</span>
                  <span className="text-xs text-white/80">{COMPANY.instagramFollowers} seguidores · seguir</span>
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {INSTAGRAM_POSTS.map((p, i) => (
            <motion.li
              key={p.img}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 4) * 0.08 }}
            >
              <a
                href={`https://www.instagram.com/${p.kind === "reel" ? "reel" : "p"}/${p.code}/`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("instagram_click", { link_location: "post", post: p.code })}
                className="group relative block aspect-square overflow-hidden rounded-[1.5rem] bg-rose-200 shadow-soft transition-shadow duration-500 hover:shadow-lift"
              >
                <img src={assetUrl(p.img)} alt={p.text} loading="lazy" width={640} height={640} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col justify-between bg-pine-800/0 p-4 transition-colors duration-500 group-hover:bg-pine-800/70">
                  <span className="flex justify-end">
                    {p.kind === "reel" ? (
                      <Play weight="fill" className="h-5 w-5 text-white drop-shadow" />
                    ) : (
                      <InstagramLogo weight="bold" className="h-5 w-5 text-white opacity-0 drop-shadow transition-opacity duration-500 group-hover:opacity-100" />
                    )}
                  </span>
                  <span className="translate-y-3 text-sm font-semibold leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {p.text}
                    <ArrowUpRight weight="bold" className="ml-1 inline h-4 w-4" />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
