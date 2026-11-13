import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { bindAnchorLinks, initSmoothScroll } from "./lib/smooth-scroll";
import { CookieNotice, FloatingContact, Nav, Preloader, ScrollProgress } from "./components/chrome";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Demand } from "./sections/Demand";
import { Specialties } from "./sections/Specialties";
import { Team } from "./sections/Team";
import { Services } from "./sections/Services";
import { Space } from "./sections/Space";
import { Steps } from "./sections/Steps";
import { Reviews } from "./sections/Reviews";
import { Instagram } from "./sections/Instagram";
import { Faq } from "./sections/Faq";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const unbind = bindAnchorLinks();
    return () => {
      stopScroll();
      unbind();
    };
  }, []);

  return (
    // Motion é parte da proposta; muitos PCs Windows informam "reduzir movimento" só por terem efeitos desligados.
    <MotionConfig reducedMotion="never">
      <Preloader onDone={onIntroDone} />
      <ScrollProgress />
      <Nav />
      <main className="paper">
        <Hero ready={ready} />
        <About />
        <Demand />
        <Specialties />
        <Team />
        <Services />
        <Space />
        <Steps />
        <Reviews />
        <Instagram />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <CookieNotice />
    </MotionConfig>
  );
}
