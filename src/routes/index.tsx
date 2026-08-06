import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Nav } from "@/components/lunfardo/Nav";
import { Hero } from "@/components/lunfardo/Hero";
import { About } from "@/components/lunfardo/About";
import { CustomCursor } from "@/components/lunfardo/CustomCursor";

const Services = lazy(() =>
  import("@/components/lunfardo/Services").then((m) => ({ default: m.Services })),
);
const Gallery = lazy(() =>
  import("@/components/lunfardo/Gallery").then((m) => ({ default: m.Gallery })),
);
const Contact = lazy(() =>
  import("@/components/lunfardo/Contact").then((m) => ({ default: m.Contact })),
);
const BudgetEstimator = lazy(() =>
  import("@/components/lunfardo/BudgetEstimator").then((m) => ({ default: m.BudgetEstimator })),
);
const FAQ = lazy(() => import("@/components/lunfardo/FAQ").then((m) => ({ default: m.FAQ })));
const Reviews = lazy(() =>
  import("@/components/lunfardo/Reviews").then((m) => ({ default: m.Reviews })),
);
const Footer = lazy(() =>
  import("@/components/lunfardo/Footer").then((m) => ({ default: m.Footer })),
);
import { tenantConfig } from "@/config/tenant";

const TITLE = `${tenantConfig.name} — ${tenantConfig.description.split(".")[0]}`;
const DESCRIPTION = tenantConfig.description;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: tenantConfig.url },
      { name: "twitter:url", content: tenantConfig.url },
    ],
    links: [{ rel: "canonical", href: tenantConfig.url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": tenantConfig.business.type,
          name: tenantConfig.name,
          image: `${tenantConfig.url}/google-review.png`,
          "@id": tenantConfig.url,
          url: tenantConfig.url,
          telephone: tenantConfig.contact.phone,
          priceRange: tenantConfig.business.priceRange,
          founder: {
            "@type": "Person",
            name: tenantConfig.business.founderName,
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: tenantConfig.address.street,
            addressLocality: tenantConfig.address.city,
            addressRegion: tenantConfig.address.state,
            postalCode: tenantConfig.address.zip,
            addressCountry: tenantConfig.address.countryCode,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: tenantConfig.geo.latitude,
            longitude: tenantConfig.geo.longitude,
          },
          openingHoursSpecification: tenantConfig.business.openingHours,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tenantConfig.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div className="cursor-none-desktop relative bg-background">
      <CustomCursor />
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gold/70"
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Suspense fallback={<div className="h-[20vh] w-full" />}>
          <Services />
          <Gallery />
          <BudgetEstimator />
          <Reviews />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-[10vh] w-full" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
