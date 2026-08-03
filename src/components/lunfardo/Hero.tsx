import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-lunfardo.jpg";
import { MagneticButton } from "./MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const letters = "LUNFARDO".split("");

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: imgY, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Artista de Lunfardo Tattoo tatuando en su estudio privado"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-60"
        />
      </motion.div>
      <div className="veil absolute inset-0" />
      <div className="depth-glow absolute inset-0" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
          className="eyebrow text-[0.6rem] md:text-[0.7rem]"
        >
          Estudio Privado de Tatuajes y Piercing
        </motion.p>

        <h1 className="mt-6 flex overflow-hidden md:mt-8">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 + i * 0.085, ease: EASE }}
              className="font-display text-[18vw] leading-[0.85] tracking-[0.02em] text-foreground sm:text-[15vw] lg:text-[11rem]"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 1.6, ease: EASE }}
          className="hairline mt-8 w-56 md:w-80"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.9, ease: EASE }}
          className="mt-8 font-display text-xl italic text-muted-foreground md:text-2xl"
        >
          Arte en la piel. Desde 2013.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.2, ease: EASE }}
          className="mt-12"
        >
          <MagneticButton href="#contacto">Solicitar Cita</MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-gold/70" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
