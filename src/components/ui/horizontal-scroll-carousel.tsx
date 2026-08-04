import { motion, useTransform, useScroll } from "motion/react";
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

  // Transform scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-4 md:pl-12">
          {items.map((item, index) => {
            return <Card card={item} key={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CarouselProps["items"][0] }) => {
  return (
    <div className="group relative h-[450px] w-[320px] shrink-0 overflow-hidden md:h-[600px] md:w-[450px] border border-border">
      <div
        style={{
          backgroundImage: `url(${card.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
      ></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/0 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pointer-events-none">
        <p className="font-display text-2xl tracking-[0.2em] text-white">
          {card.style}
        </p>
        <p className="text-xs uppercase tracking-widest text-gold mt-2">
          {card.cat}
        </p>
      </div>
    </div>
  );
};
