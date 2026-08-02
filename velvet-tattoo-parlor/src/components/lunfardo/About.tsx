import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import artistImg from "@/assets/artist.jpg";
import { MaskReveal, Reveal, TextReveal } from "./Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      id="filosofia"
      className="grain relative overflow-hidden px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-16">
          <div ref={ref} className="relative">
            <MaskReveal from="left" className="relative aspect-[3/4] overflow-hidden">
              <motion.img
                style={{ y }}
                src={artistImg}
                alt="El artista de Lunfardo trabajando en su estudio"
                width={1024}
                height={1408}
                loading="lazy"
                className="h-[112%] w-full object-cover"
              />
            </MaskReveal>
            <Reveal
              delay={0.4}
              className="glass absolute -right-4 bottom-8 px-6 py-5 md:-right-10"
            >
              <p className="font-display text-4xl text-gold">+10</p>
              <p className="eyebrow mt-1">Años de oficio</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <Reveal>
            <p className="eyebrow">Filosofía — El Artista</p>
          </Reveal>

          <h2 className="mt-8 font-display text-4xl leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            <TextReveal text="Tu estudio privado de tatuajes y piercing." stagger={0.06} />
          </h2>

          <div className="hairline my-10 max-w-xs" />

          <Reveal delay={0.15}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Somos un estudio de tatuajes y piercing privado y exclusivo, operando
              únicamente con cita previa. Esto garantiza una experiencia personalizada,
              cómoda y enfocada al 100% en tu proyecto.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Con más de una década de experiencia en el sector, ofrecemos
              profesionalismo y calidad en cada servicio.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {[
                { k: "Solo con cita", v: "Privacidad total" },
                { k: "Higiene", v: "Material estéril" },
                { k: "Diseño", v: "100% personalizado" },
              ].map((item) => (
                <div key={item.k}>
                  <p className="font-display text-2xl text-foreground">{item.k}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
