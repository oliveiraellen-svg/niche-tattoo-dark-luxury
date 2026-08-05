import { MapPin, Phone, Clock } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { MaskReveal, Reveal, TextReveal } from "./Reveal";
import { useRef } from "react";
import { useInView } from "motion/react";

export function Contact() {
  const WA_LINK = "https://api.whatsapp.com/message/OIDQ3CNT5KEZA1?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20hacerles%20una%20consulta.&autoload=1&app_absent=0";
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapInView = useInView(mapRef, { once: true, margin: "200px" });

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
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Preferimos el trato directo y personalizado. Escríbenos por WhatsApp para resolver dudas rápidas, enviarnos tus ideas o coordinar una cita en nuestro estudio privado.
            </p>
            <div className="mt-12">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MagneticButton>
                  Escríbenos por WhatsApp
                </MagneticButton>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="space-y-10">
            {[
              {
                icon: Phone,
                label: "WhatsApp",
                value: "+34 603 34 28 74",
                href: WA_LINK,
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
            <div ref={mapRef} className="relative h-[320px] overflow-hidden border border-border bg-ink-soft/30">
              {isMapInView && (
                <iframe
                  title="Ubicación de Lunfardo Tattoo en Ibi, Alicante"
                  src="https://www.google.com/maps?q=Carrer%20Paca%20Guillem%2010%2C%2003440%20Ibi%2C%20Alicante&output=embed"
                  className="h-full w-full opacity-70 grayscale contrast-125 invert-[0.92] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
