/*
 * Animações infinitas só rodam enquanto estão perto da tela.
 * Fora dela, recebem a classe `anim-paused` (animation-play-state: paused), o que tira
 * o custo de estilo e pintura de dezenas de elementos decorativos que ninguém está vendo.
 */
const SELECTOR = [
  ".animate-sway",
  ".animate-pulse-ring",
  ".animate-marquee",
  ".animate-marquee-rev",
  ".animate-float",
  ".animate-flutter",
  ".animate-spin-slow",
  ".reel-track",
].join(",");

export function pauseOffscreenAnimations() {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle("anim-paused", !entry.isIntersecting);
    },
    { rootMargin: "160px 0px" },
  );
  document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));

  return () => io.disconnect();
}
