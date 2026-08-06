import { Star, ExternalLink } from "lucide-react";
import { Reveal, TextReveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef } from "react";

/* ────────────────────────────────────────────────────── data */

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    rating: 5,
    text: "Un artista increíble. El realismo del retrato de león que me tatuó superó todas mis expectativas. La textura y los sombreados son perfectos.",
    date: "Hace 2 semanas",
  },
  {
    id: 2,
    name: "Sofía Ramos",
    rating: 5,
    text: "Excelente atención y profesionalidad. Lunfardo diseñó e intervino un mural comercial en nuestro local y los clientes siempre nos felicitan por el diseño.",
    date: "Hace 1 mes",
  },
  {
    id: 3,
    name: "Laura G. Castro",
    rating: 5,
    text: "El mejor pulso de Alicante para Fine Line. Los trazos curaron impecables y el trato en el estudio privado de Ibi es de primera clase.",
    date: "Hace 3 meses",
  },
  {
    id: 4,
    name: "David Ferrer",
    rating: 5,
    text: "Totalmente recomendable. Muy meticuloso con la higiene, te asesora de forma honesta con el tamaño y diseño. El sombreado negro y gris es brutal.",
    date: "Hace 1 mes",
  },
  {
    id: 5,
    name: "Elena Benítez",
    rating: 5,
    text: "Tengo un diseño autoral en el brazo que combina retrato clásico con geometría. Es una verdadera obra de arte en mi piel. Un maestro.",
    date: "Hace 2 meses",
  },
];

const REVIEWS2: Review[] = [
  {
    id: 6,
    name: "Javier H.",
    rating: 5,
    text: "El nivel de detalle en el cover up es impresionante. Parecía imposible tapar mi tatuaje antiguo, pero Lunfardo hizo magia.",
    date: "Hace 4 meses",
  },
  {
    id: 7,
    name: "Camila Ortiz",
    rating: 5,
    text: "Llevo 3 tatuajes hechos aquí y siempre es una experiencia increíble. La vibra del estudio y la atención son inmejorables.",
    date: "Hace 1 semana",
  },
  {
    id: 8,
    name: "Marcos V.",
    rating: 5,
    text: "Me hice mi primer tatuaje y me explicaron todo el proceso con mucha paciencia. El diseño quedó tal cual lo imaginaba.",
    date: "Hace 5 meses",
  },
  {
    id: 9,
    name: "Ana P.",
    rating: 5,
    text: "Un trabajo hiperrealista espectacular. Las sombras suaves y los contrastes fuertes hacen que el tatuaje resalte muchísimo.",
    date: "Hace 2 semanas",
  },
  {
    id: 10,
    name: "Leo Giménez",
    rating: 5,
    text: "Pintó un mural en el salón de mi casa y le dio vida al espacio. El talento que tiene con el aerosol es de otro planeta.",
    date: "Hace 3 meses",
  },
];

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/Lunfardo+Tattoo/@38.6261976,-0.5751578,17z/data=!4m16!1m9!3m8!1s0x6bdc05fe67ad91a3:0xfdf136ae52ea6c6d!2sLunfardo+Tattoo!8m2!3d38.62603!4d-0.57519!9m1!1b1!16s%2Fg%2F11lthxxyhd!3m5!1s0x6bdc05fe67ad91a3:0xfdf136ae52ea6c6d!8m2!3d38.62603!4d-0.57519!16s%2Fg%2F11lthxxyhd?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";

/* ────────────────────────────────────────────────────── stars */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
      ))}
    </div>
  );
}

function GoogleReviewLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 697.81 261.1"
      {...props}
    >
      <defs>
        <style>
          {`.cls-1{fill:#4285f4;}.cls-2{fill:#34a853;}.cls-3{fill:#fbbc05;}.cls-4{fill:#eb4335;}.cls-5{fill:#f9af0b;}.cls-6,.cls-7{fill:currentColor;font-size:105px;font-family:ArialMT, Arial;}.cls-6{letter-spacing:0.09em;}.cls-7{letter-spacing:0.09em;}`}
        </style>
      </defs>
      <title>google-Reviews</title>
      <path
        className="cls-1"
        d="M130.55,106.76v48.45H202.5c-1.45,12-9.29,30.17-26.69,42.36L217,229.48c24.66-22.78,38.88-56.28,38.88-96a111.61,111.61,0,0,0-2.76-26.69Z"
      />
      <path
        className="cls-2"
        d="M130.55,210.62c-34.52,0-63.82-22.77-74.27-54.25L13.92,189.15a130.46,130.46,0,0,0,116.63,72c35.25,0,64.84-11.61,86.45-31.62l-41.19-31.91C164.78,205.25,150,210.62,130.55,210.62Z"
      />
      <path
        className="cls-3"
        d="M51.93,130.55a84.49,84.49,0,0,1,4.21-25.82L13.92,72a130.31,130.31,0,0,0,0,117.2l42.36-32.78A80.53,80.53,0,0,1,51.93,130.55Z"
      />
      <path
        className="cls-4"
        d="M130.55,50.48c24.51,0,41,10.59,50.48,19.44l36.84-36C195.24,12.91,165.8,0,130.55,0A130.46,130.46,0,0,0,13.92,72l42.22,32.78C66.73,73.25,96,50.48,130.55,50.48Z"
      />
      <polygon
        className="cls-5"
        points="326.7 178.35 316.43 157.54 306.16 178.35 283.2 181.69 299.81 197.89 295.89 220.76 316.43 209.96 336.97 220.76 333.05 197.89 349.67 181.69 326.7 178.35"
      />
      <polygon
        className="cls-5"
        points="413.25 178.35 402.98 157.54 392.71 178.35 369.75 181.69 386.36 197.89 382.44 220.76 402.98 209.96 423.52 220.76 419.6 197.89 436.22 181.69 413.25 178.35"
      />
      <polygon
        className="cls-5"
        points="499.8 178.35 489.53 157.54 479.26 178.35 456.3 181.69 472.91 197.89 468.99 220.76 489.53 209.96 510.07 220.76 506.15 197.89 522.76 181.69 499.8 178.35"
      />
      <polygon
        className="cls-5"
        points="587.32 178.35 577.05 157.54 566.78 178.35 543.82 181.69 560.43 197.89 556.51 220.76 577.05 209.96 597.59 220.76 593.67 197.89 610.29 181.69 587.32 178.35"
      />
      <polygon
        className="cls-5"
        points="697.81 181.69 674.85 178.35 664.57 157.54 654.3 178.35 631.34 181.69 647.96 197.89 644.03 220.76 664.57 209.96 685.12 220.76 681.19 197.89 697.81 181.69"
      />
      <text className="cls-6" transform="translate(280 114.18)">
        R
      </text>
      <text className="cls-7" transform="translate(365.38 114.18) scale(0.7)">
        EVIEWS
      </text>
    </svg>
  );
} /* ────────────────────────────────────────────────────── card */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass flex w-[300px] shrink-0 flex-col justify-between rounded-xl p-6 transition-all duration-500 hover:border-gold/30 md:w-[360px] md:p-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">{review.name}</span>
          <span className="eyebrow text-[0.5625rem]">{review.date}</span>
        </div>
        <Stars count={review.rating} />
        <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground md:text-sm">
          "{review.text}"
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="eyebrow text-[0.5625rem] text-gold">Opinión Verificada</span>
        <div className="flex items-center gap-1.5 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
          <GoogleReviewLogo className="h-6 w-auto text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── component */

function DraggableMarquee({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    if (isHovered.current) return;

    // speed based on delta (time passed) to keep it smooth regardless of framerate
    const moveBy = reverse ? delta * 0.05 : -(delta * 0.05);
    let nextValue = baseX.get() + moveBy;

    if (containerRef.current) {
      // The track contains 3 copies of the items, so 1 set is 1/3 of the total width
      const trackWidth = containerRef.current.scrollWidth;
      const setWidth = trackWidth / 3;

      // Infinite wrap logic
      if (nextValue > 0) {
        nextValue = (nextValue % setWidth) - setWidth;
      } else {
        nextValue = nextValue % setWidth;
      }
    }

    baseX.set(nextValue);
  });

  return (
    <div
      className="overflow-hidden w-full touch-none"
      onPointerEnter={() => (isHovered.current = true)}
      onPointerLeave={() => (isHovered.current = false)}
      onTouchStart={() => (isHovered.current = true)}
      onTouchEnd={() => (isHovered.current = false)}
    >
      <motion.div
        ref={containerRef}
        style={{ x: baseX }}
        drag="x"
        dragDirectionLock={true}
        dragConstraints={{ left: -100000, right: 100000 }}
        dragElastic={0}
        dragMomentum={true}
        onDrag={(e, info) => {
          // Keep bounding within the wrap limits during drag to avoid visual jumps
          if (containerRef.current) {
            const setWidth = containerRef.current.scrollWidth / 3;
            const val = baseX.get();
            if (val > 0) baseX.set((val % setWidth) - setWidth);
            else baseX.set(val % setWidth);
          }
        }}
        className="flex w-max gap-6 cursor-grab active:cursor-grabbing px-6 will-change-transform"
      >
        {items.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

export function Reviews() {
  // Triple for seamless infinite loop
  const marquee = [...REVIEWS, ...REVIEWS, ...REVIEWS];
  const marqueeReverse = [...REVIEWS2, ...REVIEWS2, ...REVIEWS2];

  return (
    <section
      id="reseñas"
      className="grain relative overflow-hidden border-y border-border py-28 md:py-40"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-destructive/5 blur-[100px]" />
      <div className="depth-glow pointer-events-none absolute inset-0" />

      {/* ── header ── */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-6 text-center md:px-12">
        <Reveal>
          <p className="eyebrow">Reseñas</p>
        </Reveal>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
          <TextReveal text="La voz de nuestros clientes" stagger={0.06} />
        </h2>

        {/* rating badge */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-ink-soft/50 px-5 py-2.5">
            <Stars count={5} />
            <span className="text-xs font-medium text-foreground">5.0 Estrellas en Google</span>
            <span className="hidden text-[0.625rem] text-muted-foreground sm:inline">
              (+120 opiniones de clientes verificados)
            </span>
          </div>
        </Reveal>
      </div>

      {/* ── marquee ── */}
      <Reveal delay={0.2}>
        <div className="relative z-10 flex flex-col gap-6 w-full py-4 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <DraggableMarquee items={marquee} />
          <DraggableMarquee items={marqueeReverse} reverse />
        </div>
      </Reveal>

      {/* ── CTA button ── */}
      <Reveal delay={0.2}>
        <div className="relative z-10 mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            ¿Ya nos visitaste? Nos encantaría conocer tu experiencia.
          </p>
          <MagneticButton href={GOOGLE_REVIEW_URL} variant="solid">
            <span className="inline-flex items-center gap-2">
              Dejar una Reseña
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
