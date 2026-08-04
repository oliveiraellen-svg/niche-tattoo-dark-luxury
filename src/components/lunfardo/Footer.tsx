import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="grain relative border-t border-border px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl tracking-[0.3em] text-foreground">LUNFARDO</p>
          <p className="eyebrow mt-3">Arte en la piel · Ibi, Alicante</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <a
            href="https://www.instagram.com/lunfardo_"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-500 hover:text-gold"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.4} />
            Instagram
          </a>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground/70">
            © {new Date().getFullYear()} Lunfardo Tattoo · Desde 2013
          </p>
        </div>
      </div>
    </footer>
  );
}
