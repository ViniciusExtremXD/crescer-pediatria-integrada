import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, InstagramLogo } from "@phosphor-icons/react";
import { CARE_TEAM, DOCTORS, assetUrl } from "../data/site";
import { ClipReveal, EASE_OUT, Reveal, SectionLabel, SplitWords, TiltCard } from "../components/motion";

export function Team() {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };

  return (
    <section id="equipe" className="relative overflow-hidden bg-rose-50 py-24 sm:py-32">
      <div className="bg-dots absolute inset-x-0 top-0 h-80 opacity-40 mask-fade-b" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="03">Equipe</SectionLabel>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-pine-700">
              <SplitWords text="Médicas que *acolhem*, especialistas que *cuidam*." />
            </h2>
          </div>
          <Reveal className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-pine-800/70">
              Cada especialista da Crescer tem registro no CRM e título de especialista (RQE). Juntas, acompanham a criança do primeiro mês à adolescência.
            </p>
          </Reveal>
        </div>

        <ClipReveal className="relative mt-14 overflow-hidden rounded-[2.5rem]" radius={40}>
          <div className="relative aspect-[16/10] sm:aspect-[21/9]">
            <motion.img
              src={assetUrl("images/equipe-trio.webp")}
              alt="Três médicas da Crescer sentadas em um estúdio claro"
              loading="lazy"
              className="h-full w-full object-cover object-[50%_32%]"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE_OUT }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pine-900/60 via-pine-900/10 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-md p-7 sm:p-12">
              <p className="font-display text-3xl font-medium leading-tight text-cream-50 sm:text-5xl">
                Conheça nossa <span className="italic text-rose-200">equipe</span>
              </p>
              <p className="mt-3 text-cream-100/85">Pediatria e especialidades pediátricas, lado a lado.</p>
            </div>
          </div>
        </ClipReveal>
      </div>

      {/* Carrossel das médicas */}
      <div className="relative mt-16">
        <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-500">Arraste para conhecer</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Anterior" className="grid h-12 w-12 place-items-center rounded-full border border-pine-600/20 text-pine-700 transition-colors hover:bg-pine-600 hover:text-white">
              <ArrowLeft weight="bold" className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Próxima" className="grid h-12 w-12 place-items-center rounded-full border border-pine-600/20 text-pine-700 transition-colors hover:bg-pine-600 hover:text-white">
              <ArrowRight weight="bold" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto scroll-smooth px-5 pb-6 sm:scroll-pl-8 sm:px-8 xl:scroll-pl-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {DOCTORS.map((d, i) => (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px -5% 0px -5%" }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 4) * 0.08 }}
              className="w-[74vw] max-w-[300px] shrink-0 snap-start sm:w-[300px]"
            >
              <TiltCard className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-rose-200">
                  <img src={assetUrl(d.photo)} alt={`${d.name}, ${d.specialty}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-900/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pine-700 backdrop-blur">Dra.</span>
                  {d.instagram && (
                    <a
                      href={`https://www.instagram.com/${d.instagram}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram de ${d.name}`}
                      className="absolute right-4 top-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-cream-50/90 text-pine-700 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <InstagramLogo weight="bold" className="h-4 w-4" />
                    </a>
                  )}
                  <p className="absolute inset-x-4 bottom-4 text-xs font-medium text-cream-100/90">{d.crm ?? "CRM e RQE em atualização"}</p>
                </div>
                <h3 className="font-display mt-4 text-2xl font-medium tracking-tight text-pine-700">{d.name.replace("Dra. ", "")}</h3>
                <p className="mt-0.5 text-sm font-medium text-rose-600">{d.specialty}</p>
              </TiltCard>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Equipe multiprofissional */}
      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <div className="rounded-[2.5rem] bg-pine-700 p-8 text-cream-50 sm:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h3 className="font-display text-3xl font-medium leading-tight sm:text-5xl">
              Também fazem parte <span className="italic text-rose-200">da Crescer</span>
            </h3>
            <p className="max-w-sm text-cream-100/70">Profissionais que atuam com respiração, alimentação, fala, desenvolvimento e amamentação.</p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_TEAM.map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.05 }}
                className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
              >
                <span className={`font-display grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-medium transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${i % 2 ? "bg-pine-300 text-pine-900" : "bg-rose-300 text-pine-900"}`}>
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold">{p.name}</span>
                  <span className="text-sm text-cream-100/65">{p.role}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
