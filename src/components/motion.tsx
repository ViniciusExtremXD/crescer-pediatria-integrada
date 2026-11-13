import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  animate,
  type MotionValue,
} from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/* Sobe e aparece ao entrar na tela. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}

/*
 * Títulos palavra por palavra, subindo de dentro de uma máscara.
 * Palavras entre *asteriscos* ficam em itálico rosa (como nos posts: "Também *contamos* com").
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  accentClassName = "italic text-rose-500",
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView;
  const words = text.split(" ");
  const plain = text.replace(/\*/g, "");
  return (
    <span ref={ref} className={className} aria-label={plain} role="text">
      {words.map((raw, i) => {
        const accent = /^\*.*\*[.,!?:]?$/.test(raw);
        const word = raw.replace(/\*/g, "");
        return (
          <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ""} ${accent ? accentClassName : ""}`}
              initial={{ y: "115%", rotate: 5 }}
              animate={show ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: 1.05, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* Parágrafo cujas palavras "acendem" conforme a rolagem. *palavra* = destaque rosa. */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollYProgress = useElementProgress(ref, ["start 85%", "end 45%"]);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <LitWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </LitWord>
      ))}
    </p>
  );
}

function LitWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const isAccent = /^\*.*\*[.,!?:]?$/.test(children);
  const clean = children.replace(/\*/g, "");
  return (
    <motion.span style={{ opacity }} className={`inline ${isAccent ? "italic text-rose-500" : ""}`}>
      {clean}{" "}
    </motion.span>
  );
}

/* Puxa o filho na direção do ponteiro — usado nos CTAs principais. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

/* Conta até o número quando aparece. Começa no valor final para o HTML pré-renderizado ter o número real. */
export function Counter({ to, duration = 1.8, className, suffix = "", prefix = "", decimals = 0 }: { to: number; duration?: number; className?: string; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: EASE_OUT, onUpdate: (v) => setValue(v) });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {prefix}
      {value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Faixa infinita que acelera e inverte com a velocidade da rolagem. Só anda enquanto está perto da tela. */
export function VelocityMarquee({ children, baseVelocity = -2, className }: { children: React.ReactNode; baseVelocity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "160px 0px 160px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.1], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let moveBy = direction.current * baseVelocity * (Math.min(delta, 64) / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={`flex overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div className="flex flex-nowrap" style={{ x, willChange: "transform" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Rótulo de seção: "01 — A Crescer". */
export function SectionLabel({ index, children, tone = "light" }: { index?: string; children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <Reveal y={12}>
      <div className={`inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${tone === "dark" ? "text-cream-200/70" : "text-pine-500"}`}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-rose-400" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
        </span>
        {index && <span className="text-rose-500">{index}</span>}
        {index && <span className={tone === "dark" ? "text-cream-200/30" : "text-pine-300"}>—</span>}
        {children}
      </div>
    </Reveal>
  );
}

/* Imagem que desliza levemente durante a rolagem (parallax). */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 10,
  eager = false,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  eager?: boolean;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useElementProgress(ref, ["start end", "end start"]);
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ y, scale: 1 + amount / 45, objectPosition: position }}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
      />
    </div>
  );
}

/* Revela imagens e painéis com um recorte (clip-path). */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  radius = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "circle";
  radius?: number;
}) {
  const hidden = {
    bottom: `inset(100% 0% 0% 0% round ${radius}px)`,
    left: `inset(0% 100% 0% 0% round ${radius}px)`,
    right: `inset(0% 0% 0% 100% round ${radius}px)`,
    circle: "circle(0% at 50% 50%)",
  }[from];
  const shown = from === "circle" ? "circle(75% at 50% 50%)" : `inset(0% 0% 0% 0% round ${radius}px)`;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: shown }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE_IN_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Cartão que inclina em 3D seguindo o ponteiro. */
export function TiltCard({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/*
 * Folhinhas do logo flutuando. O balanço fica num wrapper HTML (não dentro do SVG):
 * transform em elemento SVG não vira camada da GPU e repintava a cada frame.
 */
export function Leaf({ className, color = "#8DB3A5", delay = 0 }: { className?: string; color?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    >
      <span className="block h-full w-full origin-bottom animate-sway will-change-transform" style={{ animationDelay: `${delay}s` }}>
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <path d="M20 38 C20 26 20 20 20 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M20 22 C10 24 4 18 4 8 C14 8 20 13 20 22Z" fill={color} />
          <path d="M20 16 C27 16 33 12 34 4 C26 4 21 8 20 16Z" fill={color} opacity="0.8" />
        </svg>
      </span>
    </motion.span>
  );
}
