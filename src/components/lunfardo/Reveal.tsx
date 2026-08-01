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

/** Unmasks its child from one side as it enters the viewport. */
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
  const hidden =
    from === "left"
      ? "inset(0 100% 0 0)"
      : from === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: hidden, opacity: 0.2 }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      {children}
    </motion.div>
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
        <span key={`${word}-${i}`} className="overflow-hidden pb-[0.08em]">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
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
