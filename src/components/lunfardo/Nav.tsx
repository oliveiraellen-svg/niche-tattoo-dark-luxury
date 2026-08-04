import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { label: "Filosofía", href: "#filosofia" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.22, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 border border-transparent bg-transparent ${
          solid ? "glass py-4" : "py-7"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12">
          <a href="#top" className="font-display text-xl tracking-[0.4em] text-foreground">
            LUNFARDO
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <a
              href="tel:+34603342874"
              className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-gold"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              603 34 28 74
            </a>
          </nav>

          <button
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6 text-foreground" strokeWidth={1} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="glass grain fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col justify-between p-8 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Menú</span>
                <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5 text-foreground" strokeWidth={1} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                    className="font-display text-4xl text-foreground"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-2">
                <div className="hairline" />
                <a href="tel:+34603342874" className="block pt-4 text-sm text-gold">
                  +34 603 34 28 74
                </a>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Carrer Paca Guillem, 10
                  <br />
                  03440 Ibi, Alicante
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
