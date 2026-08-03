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

/* ────────────────────────────────────────────────────── types */

type ServiceType = "tattoo" | "mural" | "canvas";

interface EstimatorState {
  service: ServiceType | "";
  placementOrSize: string;
  style: string;
  references: File[];
  name: string;
  email: string;
  phone: string;
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

const WHATSAPP_NUMBER = "34603342874";
const TOTAL_STEPS = 5;

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
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<EstimatorState>({
    service: "",
    placementOrSize: "",
    style: "",
    references: [],
    name: "",
    email: "",
    phone: "",
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFormData((p) => ({
        ...p,
        references: [...p.references, ...Array.from(e.dataTransfer.files)],
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((p) => ({
        ...p,
        references: [...p.references, ...Array.from(e.target.files!)],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((p) => ({
      ...p,
      references: p.references.filter((_, i) => i !== index),
    }));
  };

  const handleText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      `¡Hola Lunfardo! Acabo de estimar mi presupuesto en la web:\n\n` +
        `▪ *Servicio:* ${serviceLabel}\n` +
        `▪ *Medidas/Colocación:* ${formData.placementOrSize}\n` +
        `▪ *Estilo:* ${formData.style}\n` +
        `▪ *Imágenes de Referencia:* ${formData.references.length} adjuntas\n` +
        `▪ *Nombre:* ${formData.name}\n` +
        `▪ *Contacto:* Tel: ${formData.phone} / Email: ${formData.email}\n` +
        `▪ *Detalles:* ${formData.notes || "Sin notas adicionales."}`,
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setDirection(1);
    setStep(6);
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
      className="grain relative px-6 py-20 md:px-12 md:py-28"
    >
      <div className="depth-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-4xl">
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
              Cuéntanos tu idea en unos pocos pasos. Recibe una aproximación de
              tiempo y cotización directa de Lunfardo.
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
                          className="group rounded-xl border border-border bg-ink-soft/40 p-6 text-center transition-all duration-500 hover:border-gold/50 hover:bg-gold/5"
                        >
                          <s.icon className="mx-auto mb-3 h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" />
                          <span className="mb-1 block font-display text-sm text-foreground transition-colors duration-500 group-hover:text-gold">
                            {s.label}
                          </span>
                          <span className="text-[0.625rem] text-muted-foreground">
                            {s.desc}
                          </span>
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
                          className="rounded-xl border border-border bg-ink-soft/40 p-4 font-display text-xs tracking-wider text-foreground transition-all duration-500 hover:border-gold/50 hover:bg-gold/5"
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
                          className="rounded-xl border border-border bg-ink-soft/40 p-5 text-left transition-all duration-500 hover:border-gold/50 hover:bg-gold/5"
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

                {/* ── STEP 4 — References ── */}
                {step === 4 && (
                  <motion.div
                    key="s4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-center font-display text-xl tracking-wide text-foreground md:text-2xl">
                      Imágenes de Referencia (Opcional)
                    </h3>
                    <p className="mx-auto max-w-sm text-center text-[0.625rem] leading-relaxed text-muted-foreground">
                      Sube capturas, fotos de la zona corporal o mural, o
                      bocetos que inspiren tu idea.
                    </p>

                    {/* dropzone */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative w-full cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-300 ${
                        dragActive
                          ? "border-gold bg-gold/5"
                          : "border-border bg-ink-soft/20 hover:border-gold/40"
                      }`}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <Upload className="mx-auto mb-3 h-7 w-7 text-gold" />
                      <span className="mb-1 block text-xs text-foreground">
                        Arrastra tus imágenes aquí o haz clic para buscar
                      </span>
                      <span className="block text-[0.5625rem] text-muted-foreground">
                        Formatos admitidos: JPG, PNG, WEBP
                      </span>
                    </div>

                    {/* thumbnails */}
                    {formData.references.length > 0 && (
                      <div className="mt-4 grid grid-cols-4 gap-3">
                        {formData.references.map((file, i) => (
                          <div
                            key={i}
                            className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt="preview"
                              className="h-full w-full object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(i);
                              }}
                              className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-bold text-destructive opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            >
                              Eliminar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 5 — Contact ── */}
                {step === 5 && (
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

                    <form
                      onSubmit={handleSubmit}
                      className="mx-auto max-w-md space-y-4"
                    >
                      {/* name */}
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Nombre Completo"
                          value={formData.name}
                          onChange={handleText}
                          className="w-full rounded-xl border border-border bg-ink-soft/40 py-3 pl-10 pr-4 text-xs text-foreground outline-none transition-colors duration-300 focus:border-gold"
                        />
                      </div>

                      {/* email + phone */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                          <input
                            required
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={handleText}
                            className="w-full rounded-xl border border-border bg-ink-soft/40 py-3 pl-10 pr-4 text-xs text-foreground outline-none transition-colors duration-300 focus:border-gold"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                          <input
                            required
                            type="tel"
                            name="phone"
                            placeholder="WhatsApp / Teléfono"
                            value={formData.phone}
                            onChange={handleText}
                            className="w-full rounded-xl border border-border bg-ink-soft/40 py-3 pl-10 pr-4 text-xs text-foreground outline-none transition-colors duration-300 focus:border-gold"
                          />
                        </div>
                      </div>

                      {/* notes */}
                      <textarea
                        name="notes"
                        rows={4}
                        placeholder="Describe brevemente tu idea de diseño, dimensiones o cualquier detalle relevante..."
                        value={formData.notes}
                        onChange={handleText}
                        className="w-full rounded-xl border border-border bg-ink-soft/40 p-4 text-xs text-foreground outline-none transition-colors duration-300 focus:border-gold"
                      />

                      {/* submit */}
                      <button
                        type="submit"
                        data-cursor="hover"
                        className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gold px-6 py-4 font-display text-xs font-semibold uppercase tracking-widest text-ink transition-all duration-500 hover:bg-gold-soft"
                      >
                        Enviar Solicitud a WhatsApp
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── STEP 6 — Success ── */}
                {step === 6 && (
                  <motion.div
                    key="s6"
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
                      Los datos del cotizador se han preparado y enviado. Si tu
                      ventana de chat de WhatsApp no se abrió automáticamente,
                      haz clic en el botón de abajo para finalizar la
                      comunicación.
                    </p>
                    <button
                      data-cursor="hover"
                      onClick={() => {
                        setStep(1);
                        setFormData({
                          service: "",
                          placementOrSize: "",
                          style: "",
                          references: [],
                          name: "",
                          email: "",
                          phone: "",
                          notes: "",
                        });
                      }}
                      className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 font-display text-[0.625rem] font-semibold uppercase tracking-widest text-ink transition-colors duration-500 hover:bg-gold-soft"
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
                  className="eyebrow inline-flex items-center gap-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Atrás
                </button>

                {step < TOTAL_STEPS && (
                  <button
                    data-cursor="hover"
                    onClick={goNext}
                    disabled={step === 2 && !formData.placementOrSize}
                    className="eyebrow inline-flex items-center gap-1 text-gold transition-colors duration-300 hover:text-gold-soft disabled:text-muted-foreground/40"
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
