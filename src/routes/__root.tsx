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
import { TenantProvider } from "@/config/TenantContext";
import { tenantConfig } from "@/config/tenant";

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
      {
        name: "keywords",
        content: tenantConfig.keywords,
      },
      { name: "author", content: tenantConfig.author },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },

      // GEO Meta Tags (Local SEO)
      { name: "geo.region", content: tenantConfig.address.state }, // Simplification
      { name: "geo.placename", content: tenantConfig.address.city },
      {
        name: "geo.position",
        content: `${tenantConfig.geo.latitude};${tenantConfig.geo.longitude}`,
      },
      { name: "ICBM", content: `${tenantConfig.geo.latitude}, ${tenantConfig.geo.longitude}` },

      // Open Graph (SEO / Social Sharing)
      { property: "og:site_name", content: tenantConfig.name },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/google-review.png" }, // To be configurable later
      { property: "og:image:alt", content: `${tenantConfig.name} Logo` },
      { property: "og:locale", content: "es_ES" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/google-review.png" },

      // Theming
      { name: "theme-color", content: tenantConfig.theme.primaryColor },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        // Ideal is to make this dynamic, but hardcoding for now as fonts need specific weights
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.documentElement.classList.add("is-keyboard-nav");
      }
    };
    const handleMouseDown = () => {
      document.documentElement.classList.remove("is-keyboard-nav");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <html lang="es">
      <head>
        <HeadContent />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --background: ${tenantConfig.theme.backgroundColor};
            --gold: ${tenantConfig.theme.primaryColor};
          }
        `,
          }}
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
    <TenantProvider>
      <QueryClientProvider client={queryClient}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <FloatingWhatsApp />
        <Toaster />
      </QueryClientProvider>
    </TenantProvider>
  );
}
