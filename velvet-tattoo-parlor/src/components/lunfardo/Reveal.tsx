import type { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Unmasks its child from one side with a sliding curtain as it enters view. */
export function MaskReveal({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}) {
  const exit =
    from === "left"
      ? { x: "100%" }
      : from === "right"
        ? { x: "-100%" }
        : { y: "-100%" };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, delay, ease: EASE }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-10 bg-background"
        initial={{ x: "0%", y: "0%" }}
        whileInView={exit}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      />
    </div>
  );
}

/** Word-by-word masked text reveal. */
export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: 1.2,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
            {"\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

