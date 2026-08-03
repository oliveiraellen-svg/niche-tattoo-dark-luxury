import { useState } from "react";
import { Reveal, TextReveal } from "./Reveal";
import { ExpandableGallery } from "@/components/ui/gallery-animation";

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

        <Reveal delay={0.3}>
          <div className="mt-16 w-full">
            <ExpandableGallery items={visible} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
