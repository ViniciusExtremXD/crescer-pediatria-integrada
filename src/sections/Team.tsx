import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight, InstagramLogo, Plus, Quotes, SealCheck, Star, X } from "@phosphor-icons/react";
import { CARE_TEAM, DOCTORS, SPECIALTIES, assetUrl, pushEvent, type Doctor } from "../data/site";
import { lockScroll } from "../lib/smooth-scroll";
import { ClipReveal, EASE_OUT, Reveal, SectionLabel, SplitWords, TiltCard } from "../components/motion";
import { PrimaryCta } from "../components/cta";

export function Team() {
  const track = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };

  const open = (id: string) => {
    setOpenId(id);
    pushEvent("doctor_open", { doctor: id });
  };

  return (
    <section id="equipe" className="relative overflow-hidden bg-rose-50 py-24 sm:py-32">
      <div className="bg-dots mask-fade-b absolute inset-x-0 top-0 h-80 opacity-40" />
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

        {/* Foto do grupo inteira, sem cortar ninguém */}
        <ClipReveal className="mt-14 overflow-hidden rounded-[2.5rem] bg-pine-700 shadow-lift" radius={40}>
          <div className="grid md:grid-cols-[1fr_1.15fr]">
            <div className="relative flex flex-col justify-end p-8 text-cream-50 sm:p-12">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-pine-500/40 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-rose-200">Pediatria e especialidades</p>
              <p className="font-display relative mt-4 text-4xl font-medium leading-[1.05] sm:text-6xl">
                Conheça nossa <span className="italic text-rose-200">equipe</span>
              </p>
              <p className="relative mt-4 max-w-sm text-cream-100/80">Pediatras e subespecialistas lado a lado. Se o seu filho precisar de outro olhar, a próxima especialista está na sala ao lado.</p>
              <dl className="relative mt-8 flex gap-8">
                <div>
                  <dd className="font-display text-4xl font-medium">{DOCTORS.length}</dd>
                  <dt className="text-sm text-cream-100/70">médicas</dt>
                </div>
                <div>
                  <dd className="font-display text-4xl font-medium">{CARE_TEAM.length}</dd>
                  <dt className="text-sm text-cream-100/70">profissionais de apoio</dt>
                </div>
              </dl>
            </div>
            <div className="relative aspect-[1600/1240] overflow-hidden bg-cream-200">
              <motion.img
                src={assetUrl("images/equipe-socias.webp")}
                alt="Dra. Nathalia Dias, Dra. Karla Bussons e Dra. Regiane Barreto na recepção da Crescer"
                width={1600}
                height={1240}
                loading="lazy"
                className="h-full w-full object-cover"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: EASE_OUT }}
              />
            </div>
          </div>
        </ClipReveal>
      </div>

      {/* Carrossel das médicas: clique abre o card completo */}
      <LayoutGroup>
        <div className="relative mt-16">
          <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-500">Toque em uma médica para conhecer</p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Anterior" className="grid h-12 w-12 place-items-center rounded-full border border-pine-600/20 bg-white text-pine-700 shadow-soft transition-colors hover:bg-pine-600 hover:text-white">
                <ArrowLeft weight="bold" className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Próxima" className="grid h-12 w-12 place-items-center rounded-full border border-pine-600/20 bg-white text-pine-700 shadow-soft transition-colors hover:bg-pine-600 hover:text-white">
                <ArrowRight weight="bold" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={track}
            className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto scroll-smooth px-5 pb-10 pt-2 sm:scroll-pl-8 sm:px-8 xl:scroll-pl-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
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
                <TiltCard>
                  <button type="button" onClick={() => open(d.id)} className="group block w-full text-left" aria-label={`Conhecer ${d.name}, ${d.specialty}`}>
                    <motion.div
                      layoutId={`doc-photo-${d.id}`}
                      className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-rose-200 shadow-card transition-shadow duration-500 group-hover:shadow-float"
                    >
                      <img
                        src={assetUrl(d.photo)}
                        alt=""
                        loading="lazy"
                        style={{ objectPosition: d.focus }}
                        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pine-900/75 via-pine-900/5 to-transparent" />
                      {d.crm && (
                        <p className="absolute inset-x-3 bottom-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-pine-950/45 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-cream-50 ring-1 ring-white/15 backdrop-blur-md">
                          <SealCheck weight="fill" className="h-3.5 w-3.5 text-rose-300" /> {d.crm}
                        </p>
                      )}
                      <span className="absolute right-4 top-4 flex h-10 items-center gap-0 overflow-hidden rounded-full bg-cream-50/95 pl-2.5 pr-2.5 text-pine-700 shadow-soft backdrop-blur transition-all duration-500 group-hover:gap-1.5 group-hover:pr-3.5">
                        <Plus weight="bold" className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-[max-width] duration-500 group-hover:max-w-[80px]">Conhecer</span>
                      </span>
                    </motion.div>
                    <h3 className="font-display mt-4 text-2xl font-medium tracking-tight text-pine-700 transition-colors group-hover:text-rose-600">{d.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-rose-600">{d.title}</p>
                  </button>
                </TiltCard>
              </motion.article>
            ))}
          </div>
        </div>

        <DoctorModal openId={openId} onChange={setOpenId} />
      </LayoutGroup>

      {/* Equipe multiprofissional com as fotos reais */}
      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-pine-700 p-8 text-cream-50 shadow-lift sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-400/20 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h3 className="font-display text-3xl font-medium leading-tight sm:text-5xl">
              Também fazem parte <span className="italic text-rose-200">da Crescer</span>
            </h3>
            <p className="max-w-sm text-cream-100/70">Profissionais que cuidam da respiração, da alimentação, da fala, do desenvolvimento e da amamentação.</p>
          </div>
          <ul className="relative mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {CARE_TEAM.map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: (i % 4) * 0.06 }}
                className="group flex min-w-0 flex-col items-center rounded-3xl bg-white/[0.045] px-3 pb-6 pt-6 text-center ring-1 ring-inset ring-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <span className={`relative grid h-24 w-24 place-items-center rounded-full p-1 sm:h-28 sm:w-28 ${i % 2 ? "bg-pine-300" : "bg-rose-300"}`}>
                  <img
                    src={assetUrl(p.photo)}
                    alt={`${p.name}, ${p.role}`}
                    loading="lazy"
                    width={240}
                    height={240}
                    className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </span>
                <span className="font-display mt-4 text-lg font-medium leading-tight sm:text-xl">{p.name}</span>
                <span className="mt-1 text-pretty text-[13px] leading-snug text-cream-100/75 sm:text-sm">{p.role}</span>
                <span className="mt-2 break-all text-[11px] font-medium tracking-wide text-rose-200/80">{p.reg}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Card expandido da médica (com fundo desfocado) ───────────── */

function DoctorModal({ openId, onChange }: { openId: string | null; onChange: (id: string | null) => void }) {
  const idx = DOCTORS.findIndex((d) => d.id === openId);
  const doctor = idx >= 0 ? DOCTORS[idx] : null;
  // A foto "voa" do card de origem; ao navegar entre médicas dentro do card, a origem fica fixa.
  const [origin, setOrigin] = useState<string | null>(null);
  useEffect(() => {
    if (openId && !origin) setOrigin(openId);
    if (!openId) setOrigin(null);
  }, [openId, origin]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (idx < 0) return;
      onChange(DOCTORS[(idx + dir + DOCTORS.length) % DOCTORS.length].id);
    },
    [idx, onChange],
  );

  useEffect(() => {
    if (!doctor) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [doctor, go, onChange]);

  return (
    <AnimatePresence>
      {doctor && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[90] grid place-items-center bg-pine-950/45 p-3 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => onChange(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${doctor.name}, ${doctor.specialty}`}
          data-lenis-prevent
        >
          <motion.div
            className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-y-auto overscroll-contain rounded-[2rem] bg-cream-50 shadow-float md:grid md:grid-cols-[0.95fr_1.05fr] md:overflow-hidden"
            initial={{ y: 30, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div layoutId={`doc-photo-${origin ?? doctor.id}`} className="relative aspect-[4/5] shrink-0 overflow-hidden bg-rose-200 md:aspect-auto md:min-h-[600px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={doctor.id}
                  src={assetUrl(doctor.photo)}
                  alt={doctor.name}
                  style={{ objectPosition: doctor.focus }}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-pine-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Médica anterior" className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/90 text-pine-700 shadow-soft backdrop-blur transition-transform hover:scale-105">
                  <CaretLeft weight="bold" className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Próxima médica" className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/90 text-pine-700 shadow-soft backdrop-blur transition-transform hover:scale-105">
                  <CaretRight weight="bold" className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <div className="relative flex flex-col p-7 sm:p-10 md:max-h-[92svh] md:overflow-y-auto" data-lenis-prevent>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <DoctorInfo d={doctor} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream-50/95 text-pine-800 shadow-soft backdrop-blur transition-transform hover:rotate-90"
              autoFocus
            >
              <X weight="bold" className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DoctorInfo({ d }: { d: Doctor }) {
  const spec = SPECIALTIES.find((s) => s.id === d.specialtyId);
  const first = d.name.replace("Dra. ", "").split(" ")[0];
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">{d.specialty}</span>
      <h3 className="font-display mt-4 pr-12 text-4xl font-medium leading-[1.05] tracking-tight text-pine-700 sm:text-5xl">{d.name}</h3>
      <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-pine-500">
        <SealCheck weight="fill" className="h-4 w-4 text-pine-400" />
        {d.crm ?? "CRM e RQE em atualização"}
      </p>

      <p className="mt-6 text-[17px] leading-relaxed text-pine-800/80">{d.about}</p>

      {spec && (
        <>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-pine-500">Pode ajudar com</p>
          {spec.details ? (
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {spec.topics.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 + i * 0.05 }}
                  className="rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-pine-600/5"
                >
                  <p className="text-sm font-semibold text-pine-700">{t}</p>
                  <p className="mt-1 text-[13px] leading-snug text-pine-800/65">{spec.details?.[i]}</p>
                </motion.li>
              ))}
            </ul>
          ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {spec.topics.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 + i * 0.05 }}
                className="rounded-full bg-white px-3.5 py-2 text-sm font-medium text-pine-700 shadow-soft ring-1 ring-pine-600/5"
              >
                {t}
              </motion.li>
            ))}
          </ul>
          )}
        </>
      )}

      {d.reviews?.map((r) => (
        <figure key={r.author} className="relative mt-7 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-pine-600/5">
          <Quotes weight="fill" className="absolute right-5 top-5 h-7 w-7 text-rose-200" />
          <div className="flex gap-0.5 text-rose-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} weight="fill" className="h-3.5 w-3.5" />
            ))}
          </div>
          <blockquote className="font-display mt-3 text-lg italic leading-snug text-pine-700">“{r.text}”</blockquote>
          <figcaption className="mt-3 text-xs font-semibold text-pine-500">
            {r.author} · avaliação no Google
          </figcaption>
        </figure>
      ))}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <PrimaryCta location="card_medica" detail={d.id} size="md" message={`Olá! Gostaria de agendar uma consulta com a ${d.name} (${d.specialty}).`}>
          Agendar com a Dra. {first}
        </PrimaryCta>
        {d.instagram && (
          <a
            href={`https://www.instagram.com/${d.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushEvent("instagram_click", { link_location: "card_medica", doctor: d.id })}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-pine-600/20 px-5 text-sm font-semibold text-pine-700 transition-colors hover:bg-pine-600 hover:text-white"
          >
            <InstagramLogo weight="bold" className="h-4 w-4" /> @{d.instagram}
          </a>
        )}
      </div>
    </div>
  );
}
