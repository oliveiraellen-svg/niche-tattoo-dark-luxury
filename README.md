# Lunfardo Studio Design

**Role & Objective:**
Act as a world-class UI/UX Designer and Senior React/Frontend Engineer who specializes in creating "Awwwards-winning" luxury websites. Your task is to build an extremely high-end, premium, and exclusive website for "Lunfardo Tattoo", a private tattoo and piercing studio.

**Vibe & Quality Standard:**
This cannot look like a cheap template. It must look like a €10,000 website built by an elite agency. It must exude exclusivity, artistry, and luxury. The aesthetic must be sophisticated "Dark Mode" (deep blacks, charcoal, subtle grain textures, and muted gold/bronze or sleek white accents).

**Tech Stack & Tools (Strict Requirements):**

- React (Functional components, hooks)
- Tailwind CSS (for ultra-precise, modern styling)
- Framer Motion (Mandatory for ALL complex animations, scroll effects, and page transitions. Use it aggressively but tastefully to simulate GSAP-level scroll-jacking and parallax).
- Lucide React (for minimalist, elegant icons)

**Visual Identity & Typography:**

- **Backgrounds:** Deep rich blacks (e.g., `#0a0a0a`), subtle radial gradients for depth, dark glassy elements for cards (backdrop-blur).
- **Typography:**
  - Headings: Use an elegant, high-end Serif font (like 'Playfair Display', 'Cinzel', or 'Cormorant Garamond') to reflect the artistic, fine-art nature of the studio.
  - Body/UI: A clean, highly readable geometric sans-serif (like 'Inter', 'Montserrat', or 'Helvetica Now').
- **Layout:** Asymmetrical grids, generous whitespace (padding/margins), large high-resolution image placeholders, overlapping elements with depth.

**Advanced Animations & Interactions (Crucial for the €10k look):**

- **Smooth Scrolling:** Implement a smooth scroll feel (e.g., using Framer Motion scroll hooks or a simulated Lenis smooth scroll).
- **Hero Reveal:** A dramatic, slow-motion fade-in and text-reveal (masking effect, letter-by-letter) on initial load.
- **Scroll Effects:** Parallax background images, elements that fade and slide up as they enter the viewport (`whileInView`), and image reveal effects (unmasking from the side).
- **Micro-interactions:** Magnetic buttons (buttons that slightly follow the cursor on hover), custom cursor (a small elegant dot with a larger hollow circle that expands on interactive elements), smooth scale-ups on gallery images.

**Website Structure & Content (Single Page Application or Seamless Routing):**

**1. Hero Section:**

- Full-screen height (`100vh`).
- Background: A cinematic, darkened, slow-moving video background or a highly striking parallax image of a tattoo artist at work.
- Overlay text:
  - Supertitle: "ESTUDIO PRIVADO DE TATUAJES Y PIERCING" (small, tracked out sans-serif).
  - Main Title: "LUNFARDO" (Massive, elegant serif, high contrast).
  - Subtitle: "Arte en la piel. Desde 2013."
- CTA: A sleek, glowing magnetic button saying "Solicitar Cita", which scrolls smoothly to the contact section.

**2. About Section (Filosofía & El Artista):**

- Layout: Split screen or asymmetrical overlapping grid.
- Include the following exact copy (in Spanish):
  "Tu Estudio Privado de Tatuajes y Piercing. Somos un estudio de tatuajes y piercing privado y exclusivo, operando únicamente con cita previa. Esto garantiza una experiencia personalizada, cómoda y enfocada al 100% en tu proyecto. Con más de una década de experiencia en el sector, ofrecemos profesionalismo y calidad en cada servicio."
- Visual: A parallax image of the artist (referencing the old site's "Lunfardo El Artista" section but modernized).

**3. Services / Especialidades:**

- Design as an interactive, sleek accordion or hover-reveal cards.
- **Tatuajes:**
  - Fine Line y Tatuaje Pequeño (Para detalles sutiles y delicados).
  - Tatuaje Realista y Retratos (Capturando imágenes con precisión).
  - Blackwork y Tradicional.
  - Cover Up (Expertos en la transformación y renovación de antiguos tatuajes).
- **Murales:** Llevamos el arte más allá de la piel con la realización de murales artísticos de cualquier tamaño.

**4. Portfolio / Galería (Tattoo & Murales):**

- A stunning masonry grid layout or a horizontal scroll section (using Framer Motion `useScroll`) showcasing their best work.
- Must include interactive tabs or pills to filter between "Tattoos" and "Murales".
- Hover effects on images: The image slightly scales up, darkens, and text appears indicating the style.
- Include a Lightbox feature (clicking an image expands it beautifully over a blurred background).

**5. Booking / Contact Section:**

- High-end, minimalist form (Name, Email, Subject, Idea/Doubt). Inputs should have no visible borders until focused, just a bottom line (material/elegant style).
- Display contact info beautifully:
  - Phone: +34 603 34 28 74
  - Address: Carrer Paca Guillem, 10, 03440 Ibi, Alicante, Spain
- Integrate a stylized, dark-mode Google Maps iframe or a beautiful static map image with a location pin.

**Final Directives for the AI:**

- Do not use standard white backgrounds or generic Bootstrap-like layouts.
- Ensure all components are responsive, but maintain the luxury feel on mobile (use side-drawers for mobile menus instead of basic dropdowns).
- Write clean, modular React code. Put styles in Tailwind utility classes. Build custom animations with Framer Motion.
- Take a deep breath and design a masterpiece.

---

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ad08a26b-ea67-4452-8057-9688e0b20ba0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
