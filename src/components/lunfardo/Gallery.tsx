import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Reveal, TextReveal } from "./Reveal";

import fineline from "@/assets/work-fineline.jpg";
import realismo from "@/assets/work-realismo.jpg";
import blackwork from "@/assets/work-blackwork.jpg";
import tradicional from "@/assets/work-tradicional.jpg";
import coverup from "@/assets/work-coverup.jpg";
import mural1 from "@/assets/work-mural-1.jpg";
import mural2 from "@/assets/work-mural-2.jpg";

type Cat = "Tattoos" | "Murales";

const works: {
  src: string;
  style: string;
  cat: Cat;
  w: number;
  h: number;
  span?: string;
}[] = [
  { src: blackwork, style: "Blackwork", cat: "Tattoos", w: 1024, h: 1400, span: "row-span-2" },
  { src: fineline, style: "Fine Line", cat: "Tattoos", w: 1024, h: 1280 },
  { src: realismo, style: "Realismo · Retrato", cat: "Tattoos", w: 1024, h: 1024 },
  { src: coverup, style: "Cover Up", cat: "Tattoos", w: 1024, h: 1280, span: "row-span-2" },
  { src: tradicional, style: "Tradicional", cat: "Tattoos", w: 1024, h: 1024 },
  { src: mural1, style: "Mural · Interior", cat: "Murales", w: 1400, h: 1024 },
  { src: mural2, style: "Mural · Gran formato", cat: "Murales", w: 1024, h: 1280, span: "row-span-2" },
];

export function Gallery() {
  const [filter, setFilter] = useState<"Todo" | Cat>("Todo");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = works.filter((w) => filter === "Todo" || w.cat === filter);
  const current = lightbox === null ? null : works[lightbox];


  return (
    <section id="galeria" className="grain relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Galería</p>
            </Reveal>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              <TextReveal text="Trabajos seleccionados" stagger={0.07} />
            </h2>
          </div>

          <Reveal delay={0.2}>
            <div className="flex gap-2">
              {(["Todo", "Tattoos", "Murales"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.22em] transition-all duration-500 ${
                    filter === f
                      ? "border-gold/70 bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[240px] lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((w, i) => (
              <motion.button
                key={w.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(works.indexOf(w))}
                className={`group relative overflow-hidden ${w.span ?? ""}`}
              >
                <img
                  src={w.src}
                  alt={`${w.style} — Lunfardo Tattoo`}
                  width={w.w}
                  height={w.h}
                  loading="lazy"
                  className="h-full w-full object-cover brightness-[0.85] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:brightness-[0.5]"
                />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div>
                    <p className="eyebrow text-gold">{w.cat}</p>
                    <p className="mt-2 font-display text-2xl text-foreground">{w.style}</p>
                  </div>
                </div>
                <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/30" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Cerrar"
              className="absolute right-6 top-6 text-muted-foreground transition-colors hover:text-gold"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6" strokeWidth={1} />
            </button>
            <motion.figure
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[86vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={`${current.style} — Lunfardo Tattoo`}
                className="max-h-[76vh] w-auto object-contain shadow-[var(--shadow-lift)]"
              />
              <figcaption className="mt-5 flex items-center justify-between">
                <span className="font-display text-xl text-foreground">
                  {current.style}
                </span>
                <span className="eyebrow">{current.cat}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
