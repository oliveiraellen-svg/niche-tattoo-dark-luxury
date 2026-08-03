import { Star, ExternalLink } from "lucide-react";
import { Reveal, TextReveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

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

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps?sca_esv=c76ec80322be5402&output=search&q=lunfardo+tattoo&source=lnms&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2no1YAFtlsByIZaJlK7yr6gIQnNXX16KI5TUYfGThGd0K0jJO7sUAqEUhqNyzNIeEtdWK_A2onKhMr-rMvWGPv8PHpQePAlnY3skSyPveMzBIVeM8I1D5i73MRXFxjQnGTg9Ql4hYFuK3ugU-TxSL3rqWIfobQ&entry=mc&ved=1t:200715&ictx=111";

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

/* ────────────────────────────────────────────────────── card */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass flex w-[300px] shrink-0 flex-col justify-between rounded-xl p-6 transition-all duration-500 hover:border-gold/30 md:w-[360px] md:p-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            {review.name}
          </span>
          <span className="eyebrow text-[0.5625rem]">{review.date}</span>
        </div>
        <Stars count={review.rating} />
        <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground md:text-sm">
          "{review.text}"
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="eyebrow text-[0.5625rem] text-gold">
          Opinión Verificada
        </span>
        <span className="eyebrow text-[0.5625rem]">Google Maps España</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── component */

export function Reviews() {
  // Triple for seamless infinite loop
  const marquee = [...REVIEWS, ...REVIEWS, ...REVIEWS];

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
            <span className="text-xs font-medium text-foreground">
              5.0 Estrellas en Google
            </span>
            <span className="hidden text-[0.625rem] text-muted-foreground sm:inline">
              (+120 opiniones de clientes verificados)
            </span>
          </div>
        </Reveal>
      </div>

      {/* ── marquee ── */}
      <Reveal delay={0.2}>
        <div className="relative z-10 flex w-full overflow-x-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @keyframes lunfardo-marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-33.3333%); }
              }
              .marquee-track {
                animation: lunfardo-marquee 40s linear infinite;
                will-change: transform;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            `,
            }}
          />
          <div className="marquee-track flex w-max gap-6">
            {marquee.map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── CTA button ── */}
      <Reveal delay={0.3}>
        <div className="relative z-10 mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            ¿Ya nos visitaste? Nos encantaría conocer tu experiencia.
          </p>
          <MagneticButton href={GOOGLE_REVIEW_URL} variant="ghost">
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
