import { useState } from "react";
import { Reveal, TextReveal } from "./Reveal";
import { HorizontalScrollCarousel } from "@/components/ui/horizontal-scroll-carousel";

import m1 from "@/assets/murales.webp";
import m2 from "@/assets/murales_1.webp";
import m3 from "@/assets/murales_2.jpg";
import m4 from "@/assets/murales_3.webp";
import m5 from "@/assets/murales_4.webp";

import t3 from "@/assets/insta_tattoo/imgi_12_658208501_698807273290771_58253169656219306_n.webp";
import t4 from "@/assets/insta_tattoo/imgi_13_617832073_1573096957065531_1467970652470933621_n.webp";
import t9 from "@/assets/insta_tattoo/imgi_25_472438158_18067169374855703_3592548256009544535_n.jpg";
import t12 from "@/assets/insta_tattoo/imgi_9_670741173_18112725307855703_1524149849503845705_n.webp";
import t13 from "@/assets/insta_tattoo/imgi_19_624767835_873302955343845_2394220921283452005_n.webp";
import t14 from "@/assets/insta_tattoo/imgi_21_502740012_2088303201678483_9084908500849859382_n.webp";
import t15 from "@/assets/insta_tattoo/imgi_25_497836744_1385681305820226_5989041354883606039_n.webp";
import t16 from "@/assets/insta_tattoo/imgi_30_624729857_18079760087351922_6121978448710201177_n.webp";
import t17 from "@/assets/insta_tattoo/imgi_36_625265943_18303884125260355_8760203160500000665_n.webp";
import t18 from "@/assets/insta_tattoo/imgi_37_621424247_18100807693885461_1187866611766364163_n.webp";
import t19 from "@/assets/insta_tattoo/imgi_38_619495036_18069487976438029_4980860178366068211_n.webp";
import t20 from "@/assets/insta_tattoo/imgi_40_624910264_18158142865424446_3260082954446161490_n.webp";
import t21 from "@/assets/insta_tattoo/imgi_41_620804447_18052917755429161_7614512819224371219_n.webp";
import t22 from "@/assets/insta_tattoo/imgi_42_620460656_18090486058831989_635458968883451903_n.jpg";
import t23 from "@/assets/insta_tattoo/imgi_43_631888253_18446484931110988_2748115421989862907_n.webp";
import t24 from "@/assets/insta_tattoo/imgi_47_660916577_18582596074062343_641368401206057101_n.webp";
import t25 from "@/assets/insta_tattoo/imgi_49_621176844_18109275073642588_3924405500905151153_n.jpg";

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
  { src: t3, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t4, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t9, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t12, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t13, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t14, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t15, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t16, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t17, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t18, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t19, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t20, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t21, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t22, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t23, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t24, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
  { src: t25, style: "Tattoo", cat: "Tattoos", w: 800, h: 1000 },
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
            <HorizontalScrollCarousel items={visible} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
