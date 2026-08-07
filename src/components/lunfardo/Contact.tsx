import { MapPin, Phone, Clock } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Reveal, TextReveal } from "./Reveal";
import { useTenant } from "@/config/TenantContext";

export function Contact() {
  const tenant = useTenant();
  const phone = tenant.contact.phone.replace(/[^0-9]/g, "");
  const WA_LINK = `https://wa.me/${phone}?text=${encodeURIComponent(tenant.contact.whatsappMessage)}`;

  return (
    <section id="contacto" className="grain relative px-6 py-28 md:px-12 md:py-40">
      <div className="depth-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Solicitar cita</p>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.6rem]">
            <TextReveal text="Cuéntanos tu proyecto de tatuaje" stagger={0.07} />
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Preferimos el trato directo y personalizado. Escríbenos por WhatsApp para resolver
              dudas rápidas, enviarnos tus ideas o coordinar una cita en nuestro estudio privado.
            </p>
            <div className="mt-12">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MagneticButton>Escríbenos por WhatsApp</MagneticButton>
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
                value: tenant.contact.phone,
                href: WA_LINK,
              },
              {
                icon: MapPin,
                label: "Estudio",
                value: `${tenant.address.street}\n${tenant.address.zip} ${tenant.address.city}, ${tenant.address.state}, ${tenant.address.country}`,
                href: `https://maps.google.com/?q=${encodeURIComponent(`${tenant.address.street} ${tenant.address.zip} ${tenant.address.city} ${tenant.address.state}`)}`,
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
                        aria-label={`Enlace a ${item.label} de ${tenant.name}`}
                        className="mt-3 inline-block whitespace-pre-line font-display text-2xl text-foreground transition-colors duration-500 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 -ml-2"
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

          {/* Replaced broken Google Maps iframe with a highly aesthetic native link CTA */}
          <a 
            href="https://www.google.com/maps/place/Carrer+Paca+Guillem,+14,+03440+Ibi,+Alacant,+Espanha/@0,0,3z/data=!4m6!3m5!1s0xd622aedcde26541:0xd40ff72454caa04e!8m2!3d38.6259933!4d-0.5751596!16s%2Fg%2F11csmxvpgx?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDgwNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative mt-12 flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-ink-soft/30 transition-all duration-500 hover:border-gold/50 hover:bg-ink-soft/50"
          >
            {/* Subtle background gradient to simulate depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-5 px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/5 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold/10">
                <MapPin className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground transition-colors duration-300 group-hover:text-gold">
                  Abrir en Google Maps
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tenant.address.street}
                  <br />
                  {tenant.address.city}, {tenant.address.state}
                </p>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gold/50 transition-colors duration-300 group-hover:text-gold">
                Ver ubicación &rarr;
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
