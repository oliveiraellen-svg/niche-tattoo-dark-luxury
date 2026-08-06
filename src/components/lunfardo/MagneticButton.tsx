import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "ghost";
  className?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15 });
  const y = useSpring(my, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const styles =
    variant === "solid"
      ? "bg-gold text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-gold-soft"
      : "border border-border text-foreground hover:border-gold/60";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-y-full bg-foreground/10 transition-transform duration-500 group-hover:translate-y-0" />
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`inline-block ${className}`}
    >
      {href ? (
        <a href={href} className={`${base} ${styles}`}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={`${base} ${styles}`}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
