import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Scissors,
  Paintbrush,
  Palette,
  User,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { Reveal, TextReveal } from "./Reveal";
import { useTenant } from "@/config/TenantContext";

/* ────────────────────────────────────────────────────── types */

type ServiceType = "tattoo" | "mural" | "canvas";

interface EstimatorState {
  service: ServiceType | "";
  placementOrSize: string;
  style: string;
  name: string;
  notes: string;
}

/* ────────────────────────────────────────────────────── data */

const SERVICES = [
  {
    id: "tattoo" as ServiceType,
    label: "Tatuaje Autoral",
    icon: Scissors,
    desc: "Realismo, Fine Line en Alicante",
  },
  {
    id: "mural" as ServiceType,
    label: "Mural Urbano",
    icon: Paintbrush,
    desc: "Muralismo gran formato",
  },
  {
    id: "canvas" as ServiceType,
    label: "Cuadro por Encargo",
    icon: Palette,
    desc: "Óleos o técnicas mixtas",
  },
];

const PLACEMENTS_TATTOO = [
  "Espalda Completa",
  "Manga / Brazo",
  "Pecho / Costillas",
  "Pierna / Muslo",
  "Antebrazo",
  "Mano / Muñeca",
  "Cuello / Cabeza",
  "Otro / Pequeño",
];

const SIZES_MURAL = [
  "Pequeño (Menos de 5m²)",
  "Mediano (5 a 15m²)",
  "Grande (15 a 45m²)",
  "Fachada Completa (>45m²)",
];

const SIZES_CANVAS = [
  "Pequeño (40 x 50 cm)",
  "Mediano (80 x 100 cm)",
  "Grande (120 x 150 cm)",
  "Medida Personalizada",
];

const STYLES = [
  {
    title: "Realismo Black & Grey",
    desc: "Retratos, sombreados densos y contrastes profundos.",
  },
  {
    title: "Línea Fina / Geométrico",
    desc: "Precisión geométrica, trazos minimalistas y finos.",
  },
  {
    title: "Deconstrucción Artística",
    desc: "Fusión de realismo con elementos abstractos o color.",
  },
  {
    title: "Diseño Libre / Propuesta Artista",
    desc: "Permite a Lunfardo crear una propuesta única a su autoría.",
  },
];

const TOTAL_STEPS = 4;

/* ────────────────────────────────────────────────────── animation */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ────────────────────────────────────────────────────── component */

export function BudgetEstimator() {
  const tenant = useTenant();
  const phone = tenant.contact.phone.replace(/[^0-9]/g, "");

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<EstimatorState>({
    service: "",
    placementOrSize: "",
    style: "",
    name: "",
    notes: "",
  });

  /* ── navigation ── */
  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  /* ── handlers ── */
  const selectService = (service: ServiceType) => {
    setFormData((p) => ({ ...p, service, placementOrSize: "" }));
    goNext();
  };

  const selectPlacement = (val: string) => {
    setFormData((p) => ({ ...p, placementOrSize: val }));
    goNext();
  };

  const selectStyle = (style: string) => {
    setFormData((p) => ({ ...p, style }));
    goNext();
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel =
      formData.service === "tattoo"
        ? "Tatuaje"
        : formData.service === "mural"
          ? "Mural Urbano"
          : "Lienzo Fino";

    const msg = encodeURIComponent(
      `¡Hola ${tenant.shortName}! Acabo de estimar mi presupuesto en la web:\n\n` +
        `▪ *Servicio:* ${serviceLabel}\n` +
        `▪ *Medidas/Colocación:* ${formData.placementOrSize}\n` +
        `▪ *Estilo:* ${formData.style}\n` +
        `▪ *Nombre:* ${formData.name}\n` +
        `▪ *Detalles:* ${formData.notes || "Sin notas adicionales."}`,
    );

    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    setDirection(1);
    setStep(5);
  };

  /* ── sub-renders ── */
  const placementOptions =
    formData.service === "tattoo"
      ? PLACEMENTS_TATTOO
      : formData.service === "mural"
        ? SIZES_MURAL
        : SIZES_CANVAS;

  const placementQuestion =
    formData.service === "tattoo"
      ? "¿En qué zona de tu cuerpo irá el tatuaje?"
      : formData.service === "mural"
        ? "¿Cuáles son las dimensiones aproximadas del muro?"
        : "¿Qué tamaño de lienzo tienes en mente?";

  const isTattoo = formData.service === "tattoo";

  return (
    <section
      id="cotizador"
      aria-label="Cotizador de proyectos"
      className="grain relative px-6 py-20 md:px-12 md:py-28"
    >
      <div className="depth-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-4xl" aria-live="polite">
        {/* ── header ── */}
        <div className="mb-10 text-center">
          <Reveal>
            <p className="eyebrow">Cotizador</p>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
            <TextReveal text="Estima tu proyecto" stagger={0.06} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Cuéntanos tu idea en unos pocos pasos. Recibe una aproximación de tiempo y cotización
              directa de Lunfardo.
            </p>
            <div className="hairline mx-auto mt-6 w-20" />
          </Reveal>
        </div>

        {/* ── card ── */}
        <Reveal delay={0.2}>
          <div className="glass relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8">
            {/* progress */}
            {step <= TOTAL_STEPS && (
              <div className="mb-6 flex items-center justify-between">
                <span className="eyebrow text-gold">
                  Paso {step} de {TOTAL_STEPS}
                </span>
                <div className="ml-4 h-px max-w-[200px] flex-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full bg-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            )}

            {/* ── steps ── */}
            <div className="flex flex-1 flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                {/* ── STEP 1 — Service ── */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-center font-display text-xl tracking-wide text-foreground md:text-2xl">
                      ¿Qué tipo de proyecto deseas realizar?
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          data-cursor="hover"
                          onClick={() => selectService(s.id)}
                          className="group rounded-xl border border-border bg-ink-soft/40 p-6 text-center transition-all duration-500 hover:border-gold/50 hover:bg-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          <s.icon className="mx-auto mb-3 h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" />
                          <span className="mb-1 block font-display text-sm text-foreground transition-colors duration-500 group-hover:text-gold">
                            {s.label}
                          </span>
                          <span className="text-[0.625rem] text-muted-foreground">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2 — Placement / Size ── */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-center font-display text-xl tracking-wide text-foreground md:text-2xl">
                      {placementQuestion}
                    </h3>
                    <div
                      className={`grid gap-3 ${isTattoo ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}
                    >
                      {placementOptions.map((opt) => (
                        <button
                          key={opt}
                          data-cursor="hover"
                          onClick={() => selectPlacement(opt)}
                          className="rounded-xl border border-border bg-ink-soft/40 p-4 font-display text-xs tracking-wider text-foreground transition-all duration-500 hover:border-gold/50 hover:bg-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3 — Style ── */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-center font-display text-xl tracking-wide text-foreground md:text-2xl">
                      Elige tu estilo artístico preferido
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {STYLES.map((st) => (
                        <button
                          key={st.title}
                          data-cursor="hover"
                          onClick={() => selectStyle(st.title)}
                          className="rounded-xl border border-border bg-ink-soft/40 p-5 text-left transition-all duration-500 hover:border-gold/50 hover:bg-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          <span className="mb-1 block font-display text-sm text-gold">
                            {st.title}
                          </span>
                          <span className="block text-[0.625rem] leading-relaxed text-muted-foreground">
                            {st.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4 — Contact ── */}
                {step === 4 && (
                  <motion.div
                    key="s5"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-center font-display text-xl tracking-wide text-foreground md:text-2xl">
                      Tus Datos de Contacto
                    </h3>

                    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
                      {/* name */}
                      <div className="relative">
                        <label htmlFor="name-input" className="sr-only">
                          Nombre Completo
                        </label>
                        <User
                          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60"
                          aria-hidden="true"
                        />
                        <input
                          id="name-input"
                          required
                          type="text"
                          name="name"
                          placeholder="Nombre Completo"
                          value={formData.name}
                          onChange={handleText}
                          className="w-full rounded-xl border border-border bg-ink-soft/40 py-3 pl-10 pr-4 text-xs text-foreground outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold"
                        />
                      </div>

                      {/* notes */}
                      <div className="relative">
                        <label htmlFor="notes-input" className="sr-only">
                          Detalles del diseño
                        </label>
                        <textarea
                          id="notes-input"
                          name="notes"
                          rows={4}
                          placeholder="Describe brevemente tu idea de diseño, dimensiones o cualquier detalle relevante..."
                          value={formData.notes}
                          onChange={handleText}
                          className="w-full rounded-xl border border-border bg-ink-soft/40 p-4 text-xs text-foreground outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold"
                        />
                      </div>

                      {/* submit */}
                      <button
                        type="submit"
                        data-cursor="hover"
                        className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gold px-6 py-4 font-display text-xs font-semibold uppercase tracking-widest text-ink transition-all duration-500 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        ENVIAR A WHATSAPP
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── STEP 5 — Success ── */}
                {step === 5 && (
                  <motion.div
                    key="s5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto max-w-sm space-y-6 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-16 w-16 animate-bounce text-gold" />
                    <h3 className="font-display text-2xl tracking-wide text-foreground">
                      ¡SOLICITUD ENVIADA!
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Los datos del cotizador se han preparado y enviado. Si tu ventana de chat de
                      WhatsApp no se abrió automáticamente, haz clic en el botón de abajo para
                      finalizar la comunicación.
                    </p>
                    <button
                      data-cursor="hover"
                      onClick={() => {
                        setStep(1);
                        setFormData({
                          service: "",
                          placementOrSize: "",
                          style: "",
                          name: "",
                          notes: "",
                        });
                      }}
                      className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 font-display text-[0.625rem] font-semibold uppercase tracking-widest text-ink transition-colors duration-500 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Estimar otro proyecto
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── back / next ── */}
            {step > 1 && step <= TOTAL_STEPS && (
              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <button
                  data-cursor="hover"
                  onClick={goBack}
                  className="eyebrow inline-flex items-center gap-1 text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Atrás
                </button>

                {step < TOTAL_STEPS && (
                  <button
                    data-cursor="hover"
                    onClick={goNext}
                    disabled={step === 2 && !formData.placementOrSize}
                    className="eyebrow inline-flex items-center gap-1 text-gold transition-colors duration-300 hover:text-gold-soft disabled:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
