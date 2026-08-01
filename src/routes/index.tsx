import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { Nav } from "@/components/lunfardo/Nav";
import { Hero } from "@/components/lunfardo/Hero";
import { About } from "@/components/lunfardo/About";
import { Services } from "@/components/lunfardo/Services";
import { Gallery } from "@/components/lunfardo/Gallery";
import { Contact } from "@/components/lunfardo/Contact";
import { Footer } from "@/components/lunfardo/Footer";
import { CustomCursor } from "@/components/lunfardo/CustomCursor";

const TITLE = "Lunfardo Tattoo — Estudio privado de tatuajes y piercing en Ibi";
const DESCRIPTION =
  "Estudio privado y exclusivo de tatuajes y piercing en Ibi, Alicante. Fine line, realismo, blackwork, cover up y murales. Más de una década de experiencia, solo con cita previa.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div className="cursor-none-desktop relative bg-background">
      <CustomCursor />
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gold/70"
      />
      <Nav />
      <main>
        <h1 className="sr-only">
          Lunfardo Tattoo — estudio privado de tatuajes y piercing en Ibi, Alicante
        </h1>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
