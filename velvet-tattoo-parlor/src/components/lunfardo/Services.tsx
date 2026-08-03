import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal, TextReveal } from "./Reveal";

const services = [
  {
    n: "01",
    title: "Fine Line y Tatuaje Pequeño",
    body: "Para detalles sutiles y delicados.",
    tag: "Tatuajes",
  },
  {
    n: "02",
    title: "Tatuaje Realista y Retratos",
    body: "Capturando imágenes con precisión.",
    tag: "Tatuajes",
  },
  {
    n: "03",
    title: "Blackwork y Tradicional",
    body: "Negro sólido, líneas rotundas y códigos clásicos del tatuaje.",
    tag: "Tatuajes",
  },
  {
    n: "04",
    title: "Cover Up",
    body: "Expertos en la transformación y renovación de antiguos tatuajes.",
    tag: "Tatuajes",
  },
  {
    n: "05",
    title: "Murales",
    body: "Llevamos el arte más allá de la piel con la realización de murales artísticos de cualquier tamaño.",
    tag: "Murales",
  },
];

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="especialidades"
      className="grain depth-glow relative px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Especialidades</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
              <TextReveal text="Técnica al servicio de tu idea" stagger={0.06} />
            </h2>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={s.n} delay={i * 0.06}>
                  <div
                    data-cursor="hover"
                    onMouseEnter={() => setOpen(i)}
                    onClick={() => setOpen(i)}
                    className="group cursor-pointer border-t border-border py-7 last:border-b"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="text-[0.65rem] tracking-[0.2em] text-gold/70">
                        {s.n}
                      </span>
                      <h3
                        className={`flex-1 font-display text-2xl transition-colors duration-500 sm:text-3xl ${
                          isOpen ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 1 : 0.4 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Plus className="h-4 w-4 text-gold" strokeWidth={1} />
                      </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-lg pl-12 pt-5 text-sm leading-relaxed text-muted-foreground">
                            {s.body}
                          </p>
                          <p className="eyebrow pl-12 pt-4">{s.tag}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
