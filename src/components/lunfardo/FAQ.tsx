import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal, TextReveal } from "./Reveal";
import { useTenant } from "@/config/TenantContext";

export function FAQ() {
  const tenant = useTenant();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="grain depth-glow relative px-6 py-28 md:px-12 md:py-40"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Preguntas Frecuentes</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
              <TextReveal text="Resolvemos tus dudas" stagger={0.06} />
            </h2>
            <p className="mt-6 text-sm text-muted-foreground max-w-sm">
              En {tenant.name} queremos que tu experiencia sea perfecta. Aquí tienes las respuestas
              a las consultas más habituales.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6 mt-12 lg:mt-0">
            {tenant.faqs.map((item, i) => {
              const isOpen = open === i;
              const n = String(i + 1).padStart(2, "0");
              return (
                <Reveal key={n} delay={i * 0.06}>
                  <div
                    data-cursor="hover"
                    onMouseEnter={() => setOpen(i)}
                    className="group border-t border-border py-7 last:border-b"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      onClick={() => setOpen(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="flex w-full items-baseline gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded p-2 -ml-2"
                    >
                      <span className="text-[0.65rem] tracking-[0.2em] text-gold/70">{n}</span>
                      <h3
                        itemProp="name"
                        className={`flex-1 font-display text-xl transition-colors duration-500 sm:text-2xl ${
                          isOpen ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {item.question}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 1 : 0.4 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Plus className="h-4 w-4 text-gold" strokeWidth={1} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                        >
                          <p
                            itemProp="text"
                            className="max-w-lg pl-12 pt-5 text-sm leading-relaxed text-muted-foreground"
                          >
                            {item.answer}
                          </p>
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
