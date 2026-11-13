import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { List, Phone, WhatsappLogo, X, InstagramLogo } from "@phosphor-icons/react";
import { COMPANY, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { lockScroll } from "../lib/smooth-scroll";
import { EASE_IN_OUT, EASE_OUT } from "./motion";
import { PhoneLink, WhatsAppLink } from "./cta";

/* ───────────── Abertura: o símbolo da Crescer se desenha e a cortina sobe ───────────── */

function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem("crescer-intro") === "1";
  } catch {
    return false;
  }
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;
    lockScroll(true);
    const quick = introAlreadyPlayed();
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("crescer-intro", "1");
      } catch {
        /* armazenamento bloqueado: a abertura completa toca de novo */
      }
      setShow(false);
      onDone();
    }, quick ? 400 : 1900);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence onExitComplete={() => lockScroll(false)}>
      {show && (
        <motion.div
          className="crescer-preloader fixed inset-0 z-[100] grid place-items-center bg-rose-100"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.95, ease: EASE_IN_OUT }}
        >
          <div className="bg-dots absolute inset-0 opacity-40" />
          <div className="relative flex flex-col items-center px-6">
            <motion.img
              src={assetUrl("logo-crescer.svg")}
              alt="Crescer Pediatria Integrada"
              width={340}
              height={130}
              className="w-[260px] sm:w-[320px]"
              initial={{ clipPath: "circle(0% at 18% 60%)", scale: 0.92 }}
              animate={{ clipPath: "circle(140% at 18% 60%)", scale: 1 }}
              transition={{ duration: 1.25, ease: EASE_OUT }}
            />
            <motion.span
              className="mt-6 h-px w-40 origin-left bg-rose-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT }}
            />
            <motion.p
              className="font-display mt-4 text-lg italic text-pine-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
            >
              Pediatria feita com amor e dedicação
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Barra de progresso no topo ───────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-rose-400 via-rose-300 to-pine-300" />;
}

/* ───────────── Navegação ───────────── */

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 480 && !open);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <nav
          className={`mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-[22px] border border-white/70 px-2.5 pl-4 backdrop-blur-md transition-[background-color,box-shadow] duration-500 sm:px-3 sm:pl-5 ${
            solid ? "bg-cream-50/90 shadow-lift" : "bg-cream-50/70 shadow-soft"
          }`}
          aria-label="Principal"
        >
          <a href="#topo" className="flex items-center" aria-label="Crescer Pediatria Integrada — início">
            <img src={assetUrl("logo-crescer.svg")} alt="Crescer Pediatria Integrada" width={340} height={130} className="h-11 w-auto sm:h-12" />
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative block overflow-hidden whitespace-nowrap px-3.5 py-2 text-[15px] font-medium text-pine-800 transition-colors hover:text-rose-600">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{l.label}</span>
                  <span className="absolute inset-x-3.5 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[calc(100%+0.5rem)]">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <PhoneLink location="nav" className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-pine-800 transition-colors hover:text-rose-600 lg:inline-flex">
              <Phone weight="fill" className="h-4 w-4 text-rose-400" />
              {COMPANY.phoneDisplay}
            </PhoneLink>
            <a
              href={COMPANY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushEvent("instagram_click", { link_location: "nav" })}
              aria-label={`Instagram @${COMPANY.instagramHandle}`}
              className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-pine-600/15 bg-white text-pine-700 shadow-soft transition-colors hover:border-transparent hover:text-white"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-rose-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
              <InstagramLogo weight="bold" className="relative h-5 w-5 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
            </a>
            <WhatsAppLink
              location="nav"
              className="hidden h-11 items-center gap-2 rounded-full bg-pine-600 px-5 text-sm font-semibold text-white shadow-pine transition-colors hover:bg-pine-800 sm:inline-flex"
            >
              <WhatsappLogo weight="fill" className="h-4 w-4" />
              Agendar consulta
            </WhatsAppLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-pine-600/15 text-pine-800 xl:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-pine-800 px-6 pb-8 pt-6"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <img src={assetUrl("logo-crescer-light.svg")} alt="Crescer Pediatria Integrada" className="h-11 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-cream-50" aria-label="Fechar menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-12 flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-[2.6rem] font-medium leading-tight tracking-tight text-cream-50"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 + i * 0.06 }}
                  >
                    <span className="mr-3 align-middle text-xs font-semibold text-rose-300">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div className="mt-auto grid gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT }}>
              <WhatsAppLink location="menu_mobile" className="flex h-14 items-center justify-center gap-2 rounded-full bg-rose-400 font-semibold text-white">
                <WhatsappLogo weight="fill" className="h-5 w-5" /> Agendar pelo WhatsApp
              </WhatsAppLink>
              <PhoneLink location="menu_mobile" className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 font-semibold text-cream-50">
                <Phone weight="fill" className="h-5 w-5" /> {COMPANY.phoneDisplay}
              </PhoneLink>
              <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-cream-200/80">
                <InstagramLogo className="h-4 w-4" /> @{COMPANY.instagramHandle}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Contato sempre à mão: barra no celular e botão pulsante no desktop ───────────── */

export function FloatingContact() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 680));

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="bar"
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] gap-2 border-t border-pine-600/10 bg-cream-50/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <WhatsAppLink location="barra_mobile" className="flex h-12 items-center justify-center gap-2 rounded-full bg-pine-600 text-[15px] font-semibold text-white">
              <WhatsappLogo weight="fill" className="h-5 w-5" /> Agendar pelo WhatsApp
            </WhatsAppLink>
            <PhoneLink location="barra_mobile" className="grid h-12 w-12 place-items-center rounded-full border border-pine-600/20 text-pine-800" aria-label={`Ligar ${COMPANY.phoneDisplay}`}>
              <Phone weight="fill" className="h-5 w-5" />
            </PhoneLink>
          </motion.div>

          <motion.div
            key="fab"
            className="fixed bottom-6 right-6 z-40 hidden md:block"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <WhatsAppLink
              location="botao_flutuante"
              className="group relative flex h-16 items-center overflow-hidden rounded-full bg-[#25D366] pl-5 pr-5 text-white shadow-[0_18px_40px_-10px_rgba(37,211,102,0.6)] transition-[padding] duration-500 hover:pr-6"
              aria-label="Falar no WhatsApp"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
              <WhatsappLogo weight="fill" className="relative h-7 w-7" />
              <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,margin] duration-500 group-hover:ml-2 group-hover:max-w-[180px]">
                Agendar consulta
              </span>
            </WhatsAppLink>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Cookies (LGPD) com Consent Mode v2 ───────────── */

const CONSENT_KEY = "crescer-consent";

function applyConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v, personalization_storage: v });
  pushEvent("consent_update", { consent_state: v });
}

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(CONSENT_KEY);
    } catch {
      seen = null;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("crescer:cookies", reopen);
    return () => window.removeEventListener("crescer:cookies", reopen);
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      /* modo privado: só fecha */
    }
    applyConsent(granted);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[45] rounded-2xl border border-pine-600/10 bg-cream-50/95 p-4 text-[13px] text-pine-900 shadow-float backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:max-w-sm md:text-sm"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <p className="leading-relaxed text-pine-800/80">
            Usamos cookies para entender o uso do site e melhorar nossos anúncios. Você escolhe. Saiba mais na{" "}
            <a href={assetUrl("politica-de-privacidade.html")} className="font-semibold text-pine-700 underline underline-offset-4">
              Política de Privacidade
            </a>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose(false)} className="h-10 flex-1 rounded-full border border-pine-600/25 text-sm font-semibold text-pine-800 transition-colors hover:bg-pine-600/5">
              Recusar
            </button>
            <button type="button" onClick={() => choose(true)} className="h-10 flex-1 rounded-full bg-pine-600 text-sm font-semibold text-white transition-colors hover:bg-pine-800">
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
