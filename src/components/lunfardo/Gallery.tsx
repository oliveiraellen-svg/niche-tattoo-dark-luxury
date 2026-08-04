import { useState } from "react";
import { Reveal, TextReveal } from "./Reveal";
import { ExpandableGallery } from "@/components/ui/gallery-animation";

import m1 from "@/assets/IMG_7709-1-600x800.webp";
import m2 from "@/assets/calavera-600x800.webp";
import m3 from "@/assets/full-mural-600x450.webp";
import m4 from "@/assets/persina-600x800.webp";
import m5 from "@/assets/simio-mural-1-600x800.webp";

import t1 from "@/assets/Imagen-de-WhatsApp-2025-03-21-a-las-09.48.35_603c811a-768x1024.webp";
import t2 from "@/assets/Imagen-de-WhatsApp-2025-03-21-a-las-09.50.12_174f526d-768x1024.webp";
import t3 from "@/assets/Imagen-de-WhatsApp-2025-03-21-a-las-09.51.19_c058714f-768x1024.webp";
import t4 from "@/assets/Imagen-de-WhatsApp-2025-03-21-a-las-09.52.13_7e92aa2a-768x1024.webp";
import t5 from "@/assets/Imagen-de-WhatsApp-2025-03-21-a-las-09.52.32_27d53f8f-585x1024.webp";
import t6 from "@/assets/buho-tattoo-1-768x1024.webp";
import t7 from "@/assets/face-tattoo-818x1024.webp";
import t8 from "@/assets/ilustracion_sin_titulo.webp";
import t9 from "@/assets/ilustracion_sin_titulo2.webp";
import t10 from "@/assets/img_8462.webp";

type Cat = "Tattoos" | "Murales";

const works: {
  src: string;
  style: string;
  cat: Cat;
  w: number;
  h: number;
  span?: string;
}[] = [
    { src: m1, style: "Mural", cat: "Murales", w: 600, h: 800 },
    { src: m2, style: "Mural", cat: "Murales", w: 600, h: 800 },
    { src: m3, style: "Mural", cat: "Murales", w: 600, h: 450 },
    { src: m4, style: "Mural", cat: "Murales", w: 600, h: 800 },
    { src: m5, style: "Mural", cat: "Murales", w: 600, h: 800 },
    { src: t1, style: "Tattoo", cat: "Tattoos", w: 768, h: 1024 },
    { src: t2, style: "Tattoo", cat: "Tattoos", w: 768, h: 1024 },
    { src: t3, style: "Tattoo", cat: "Tattoos", w: 768, h: 1024 },
    { src: t4, style: "Tattoo", cat: "Tattoos", w: 768, h: 1024 },
    { src: t5, style: "Tattoo", cat: "Tattoos", w: 585, h: 1024 },
    { src: t6, style: "Búho", cat: "Tattoos", w: 768, h: 1024 },
    { src: t7, style: "Retrato", cat: "Tattoos", w: 818, h: 1024 },
    { src: t8, style: "Ilustración", cat: "Tattoos", w: 1024, h: 1024 },
    { src: t9, style: "Ilustración", cat: "Tattoos", w: 1024, h: 1024 },
    { src: t10, style: "Tattoo", cat: "Tattoos", w: 1024, h: 1024 },
  ];

export function Gallery() {
  const [filter, setFilter] = useState<"Todo" | Cat>("Todo");

  const visible = works.filter((w) => filter === "Todo" || w.cat === filter);

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
                  className={`rounded-full border px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.22em] transition-all duration-500 ${filter === f
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

        <Reveal delay={0.3}>
          <div className="mt-16 w-full">
            <ExpandableGallery items={visible} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
