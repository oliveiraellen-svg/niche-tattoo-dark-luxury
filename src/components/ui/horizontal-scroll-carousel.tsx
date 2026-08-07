import { motion, useTransform, useScroll, useSpring, useInView } from "motion/react";
import { useRef } from "react";

interface CarouselProps {
  items: {
    src: string;
    style: string;
    cat: string;
    w?: number;
    h?: number;
  }[];
}

export const HorizontalScrollCarousel = ({ items }: CarouselProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Apply spring physics for smoother inertia during scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to horizontal translation
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-90%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-4 md:pl-12 will-change-transform">
          {items.map((item, index) => {
            return <Card card={item} key={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CarouselProps["items"][0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "300px" });

  return (
    <div ref={ref} className="group relative h-[450px] w-[320px] shrink-0 overflow-hidden md:h-[600px] md:w-[450px] border border-border bg-ink/20">
      {isInView && (
        <img
          src={card.src}
          alt={card.style}
          loading="lazy"
          decoding="async"
          width={card.w}
          height={card.h}
          className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
        />
      )}
    </div>
  );
};
