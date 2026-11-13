import { useEffect, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/*
 * Progresso de rolagem de um elemento (0 a 1), no lugar de useScroll({ target }).
 *
 * O useScroll com alvo mede o layout (offsetTop/scrollHeight de toda a cadeia de pais) a cada
 * frame de rolagem, para cada alvo, o que força layout síncrono e era o maior gasto de JS ao rolar.
 * Aqui:
 *  - a posição do elemento é medida uma vez (e de novo só se ele ou a página mudar de tamanho);
 *  - só os elementos perto da tela são atualizados, todos por um único listener em rAF;
 *  - ao sair da tela, o valor assenta em 0 ou 1, como antes.
 * Aceita os mesmos offsets do framer: "start" | "center" | "end" | "NN%", ex.: ["start 85%", "end 45%"].
 */

type Edge = number;
const EDGES: Record<string, Edge> = { start: 0, center: 0.5, end: 1 };
const edge = (token: string): Edge => (token in EDGES ? EDGES[token] : token.endsWith("%") ? parseFloat(token) / 100 : 0);

interface Entry {
  el: HTMLElement;
  value: MotionValue<number>;
  t0: Edge; // ponto do elemento no início do trecho
  c0: Edge; // ponto da janela no início do trecho
  t1: Edge;
  c1: Edge;
  s0: number; // rolagem (px) em que o progresso é 0
  s1: number; // rolagem (px) em que o progresso é 1
  visible: boolean;
}

const entries = new Set<Entry>();
const byElement = new WeakMap<Element, Entry>();
let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;
let frame = 0;
let started = false;

function docTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

function measure(e: Entry) {
  const top = docTop(e.el);
  const h = e.el.offsetHeight;
  const vh = window.innerHeight;
  e.s0 = top + e.t0 * h - e.c0 * vh;
  e.s1 = top + e.t1 * h - e.c1 * vh;
}

function compute(e: Entry) {
  const span = e.s1 - e.s0;
  const p = span === 0 ? (window.scrollY >= e.s0 ? 1 : 0) : (window.scrollY - e.s0) / span;
  e.value.set(p < 0 ? 0 : p > 1 ? 1 : p);
}

function tick() {
  frame = 0;
  entries.forEach((e) => e.visible && compute(e));
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function remeasureAll() {
  entries.forEach((e) => {
    measure(e);
    if (e.visible) compute(e);
  });
}

function start() {
  if (started) return;
  started = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", remeasureAll);
  window.addEventListener("load", remeasureAll);
  document.fonts?.ready.then(remeasureAll);

  io = new IntersectionObserver(
    (list) => {
      for (const item of list) {
        const e = byElement.get(item.target);
        if (!e) continue;
        e.visible = item.isIntersecting;
        measure(e);
        compute(e); // ao entrar atualiza; ao sair assenta em 0 ou 1
      }
    },
    { rootMargin: "300px 0px" },
  );

  // Muda a altura da página (imagem carregou, fonte trocou): refaz as medidas uma vez por frame.
  let pending = 0;
  ro = new ResizeObserver(() => {
    if (pending) return;
    pending = requestAnimationFrame(() => {
      pending = 0;
      remeasureAll();
    });
  });
  ro.observe(document.body);
}

function register(el: HTMLElement, value: MotionValue<number>, offset: [string, string]) {
  start();
  const [a0, b0] = offset[0].split(" ");
  const [a1, b1] = offset[1].split(" ");
  const entry: Entry = { el, value, t0: edge(a0), c0: edge(b0), t1: edge(a1), c1: edge(b1), s0: 0, s1: 1, visible: false };
  entries.add(entry);
  byElement.set(el, entry);
  io!.observe(el);
  ro!.observe(el);
  return () => {
    entries.delete(entry);
    byElement.delete(el);
    io?.unobserve(el);
    ro?.unobserve(el);
  };
}

export function useElementProgress(ref: RefObject<HTMLElement>, offset: [string, string]): MotionValue<number> {
  const value = useMotionValue(0);
  const [start, end] = offset;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return register(el, value, [start, end]);
  }, [ref, value, start, end]);
  return value;
}
