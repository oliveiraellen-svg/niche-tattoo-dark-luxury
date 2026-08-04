import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { FloatingWhatsApp } from "@/components/lunfardo/FloatingWhatsApp";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Lunfardo Tattoo — Estudio de Tatuajes en Ibi, Alicante" },
      {
        name: "description",
        content:
          "Estudio privado y exclusivo de tatuajes y piercing en Ibi, Alicante. Especialistas en Fine Line, Realismo, Blackwork y Murales. Solo con cita previa.",
      },
      { name: "keywords", content: "tatuajes, piercing, Ibi, Alicante, fine line, realismo, blackwork, cover up, murales, tattoo studio" },
      { name: "author", content: "Lunfardo Tattoo" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      
      // GEO Meta Tags (Local SEO)
      { name: "geo.region", content: "ES-A" },
      { name: "geo.placename", content: "Ibi" },
      { name: "geo.position", content: "38.6253;-0.5752" },
      { name: "ICBM", content: "38.6253, -0.5752" },
      
      // Open Graph (SEO / Social Sharing)
      { property: "og:site_name", content: "Lunfardo Tattoo" },
      { property: "og:title", content: "Lunfardo Tattoo — Estudio de Tatuajes en Ibi, Alicante" },
      {
        property: "og:description",
        content: "Arte en la piel. Estudio privado y exclusivo de tatuajes y piercing desde 2013 en Ibi, Alicante.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/favicon.svg" },
      { property: "og:image:alt", content: "Lunfardo Tattoo Logo" },
      { property: "og:locale", content: "es_ES" },
      
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lunfardo Tattoo — Estudio de Tatuajes en Ibi, Alicante" },
      { name: "twitter:description", content: "Arte en la piel. Estudio privado de tatuajes en Ibi, Alicante." },
      { name: "twitter:image", content: "/favicon.svg" },
      
      // Theming
      { name: "theme-color", content: "#0c0c0c" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "name": "Lunfardo Tattoo",
    "image": "/favicon.svg",
    "description": "Estudio privado y exclusivo de tatuajes y piercing en Ibi, Alicante. Especialistas en Fine Line, Realismo, Blackwork y Murales.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ibi",
      "addressRegion": "Alicante",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.6253,
      "longitude": -0.5752
    },
    "telephone": "+34600000000",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ]
  };

  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <FloatingWhatsApp />
      <Toaster />
    </QueryClientProvider>
  );
}
