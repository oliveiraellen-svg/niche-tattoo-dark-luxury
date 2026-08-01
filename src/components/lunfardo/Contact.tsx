import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { MagneticButton } from "./MagneticButton";
import { MaskReveal, Reveal, TextReveal } from "./Reveal";

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="group block">
      <span className="eyebrow block pb-3 transition-colors duration-500 group-focus-within:text-gold">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          className="w-full resize-none border-0 border-b border-border bg-transparent pb-3 text-base text-foreground outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-gold"
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          className="w-full border-0 border-b border-border bg-transparent pb-3 text-base text-foreground outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-gold"
        />
      )}
    </label>
  );
}

export function Contact() {
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Solicitud enviada", {
        description: "Te contactaremos para confirmar tu cita.",
      });
    }, 900);
  };

  return (
    <section id="contacto" className="grain relative px-6 py-28 md:px-12 md:py-40">
      <div className="depth-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Solicitar cita</p>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.6rem]">
            <TextReveal text="Cuéntanos tu proyecto" stagger={0.07} />
          </h2>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="mt-14 space-y-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <Field label="Nombre" name="nombre" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Field label="Asunto" name="asunto" />
              <Field label="Tu idea o duda" name="idea" textarea />
              <MagneticButton type="submit">
                {sending ? "Enviando…" : "Enviar solicitud"}
              </MagneticButton>
            </form>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="space-y-10">
            {[
              {
                icon: Phone,
                label: "Teléfono",
                value: "+34 603 34 28 74",
                href: "tel:+34603342874",
              },
              {
                icon: MapPin,
                label: "Estudio",
                value: "Carrer Paca Guillem, 10\n03440 Ibi, Alicante, Spain",
                href: "https://maps.google.com/?q=Carrer+Paca+Guillem+10+03440+Ibi+Alicante",
              },
              {
                icon: Clock,
                label: "Horario",
                value: "Únicamente con cita previa",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="flex gap-5 border-b border-border pb-8">
                  <item.icon className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-3 block whitespace-pre-line font-display text-2xl text-foreground transition-colors duration-500 hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-3 whitespace-pre-line font-display text-2xl text-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <MaskReveal from="bottom" delay={0.2} className="mt-12">
            <div className="relative h-[320px] overflow-hidden border border-border">
              <iframe
                title="Ubicación de Lunfardo Tattoo en Ibi, Alicante"
                src="https://www.google.com/maps?q=Carrer%20Paca%20Guillem%2010%2C%2003440%20Ibi%2C%20Alicante&output=embed"
                className="h-full w-full opacity-70 grayscale contrast-125 invert-[0.92] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
