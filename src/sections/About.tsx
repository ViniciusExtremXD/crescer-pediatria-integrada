import { motion } from "framer-motion";
import { assetUrl } from "../data/site";
import { EASE_OUT, Leaf, ParallaxImage, Reveal, ScrollLitText, SectionLabel } from "../components/motion";

const PILLARS = [
  {
    word: "Cuidar",
    text: "Consultas com tempo para examinar, ouvir e explicar. A criança no centro de cada decisão.",
    img: "images/consulta-bebe-carimbo.webp",
    alt: "Médica atendendo um bebê no consultório da Crescer",
    pos: "62% 50%",
    tone: "bg-rose-100",
  },
  {
    word: "Acolher",
    text: "Um ambiente pensado nos mínimos detalhes para a criança se sentir em casa e a família, segura.",
    img: "images/brinquedoteca-arvore.webp",
    alt: "Árvore de madeira com bichinhos de pelúcia na brinquedoteca",
    pos: "50% 40%",
    tone: "bg-pine-100",
  },
  {
    word: "Desenvolver",
    text: "Acompanhamento em todas as fases e cursos para pais e filhos aprenderem juntos.",
    img: "images/curso-culinaria.webp",
    alt: "Crianças com toucas de chef no curso Descobrindo Novos Sabores",
    pos: "50% 45%",
    tone: "bg-cream-200",
  },
];

export function About() {
  return (
    <section id="a-crescer" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <Leaf className="absolute right-[8%] top-16 h-14 w-14 opacity-80" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="01">A Crescer</SectionLabel>

        <ScrollLitText
          className="font-display mt-8 max-w-5xl text-[clamp(1.9rem,4.3vw,3.6rem)] font-medium leading-[1.15] tracking-tight text-pine-700"
          text="A Crescer nasceu de um sonho e, ao longo de quatro anos, ganhou vida em cada criança acolhida e em cada família acompanhada. Hoje, *diferentes* *especialidades* trabalham juntas para cuidar da saúde e do desenvolvimento infantil em *todas* *as* *fases.*"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.word}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE_OUT, delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-[2rem] shadow-card transition-shadow duration-500 hover:shadow-float ${p.tone} md:even:translate-y-14`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <ParallaxImage src={assetUrl(p.img)} alt={p.alt} amount={8} position={p.pos} className="h-full w-full" imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-900/85 via-pine-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200">0{i + 1}</p>
                  <h3 className="font-display mt-2 text-5xl font-medium italic tracking-tight text-cream-50">{p.word}.</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-cream-100/85">{p.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal className="mt-28 flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-pine-600/10 bg-white/60 p-8 sm:p-10 md:flex-row md:items-center">
          <p className="font-display max-w-2xl text-2xl font-medium leading-snug text-pine-700 sm:text-3xl">
            “Nossa marca se renova, mas o compromisso com cada criança e cada família <span className="italic text-rose-500">permanece</span>.”
          </p>
          <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-pine-500">Crescemos. Evoluímos.</p>
        </Reveal>
      </div>
    </section>
  );
}
