import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Palette "Atelier" — Plomberie Express ──
        // Identités métier : pétrole (eau profonde, fonte) + cuivre (tuyau) + brique (urgence)
        // Tokens conservés pour éviter le refactor mais remappés
        brand: {
          navy: "#0A2540",        // pétrole profond — fond marque, headings
          "navy-soft": "#143559", // pétrole clair — variantes
          blue: "#B87333",        // CUIVRE — primary action (ex-blue)
          "blue-hover": "#8B5A2B", // cuivre patiné
          orange: "#B91C1C",      // BRIQUE — urgence (ex-orange)
          "orange-hover": "#991B1B",
        },
        // Nouveaux tokens disponibles
        copper: {
          DEFAULT: "#B87333",
          dark: "#8B5A2B",
          light: "#D4945C",
          patina: "#5C8374", // cuivre oxydé (vert-de-gris) — accent rare
        },
        petrol: {
          DEFAULT: "#0A2540",
          soft: "#143559",
          deep: "#061829",
        },
        brick: {
          DEFAULT: "#B91C1C",
          dark: "#991B1B",
        },
        concrete: "#E8E4DC",  // béton chaud — fond pages
        chalk: "#F5F1EA",     // craie — surface
        graphite: "#1F2937",  // gris fonte
        surface: {
          light: "#F5F1EA",   // remplacé : chalk au lieu du slate-50
          white: "#ffffff",
        },
        kairo: {
          gold: "#BA7517",    // signature Kaïro — usage limité
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        slab: ["var(--font-roboto-slab)", "ui-serif", "Georgia", "serif"],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "draw-pipe": {
          "0%": { strokeDashoffset: "120" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "draw-pipe": "draw-pipe 1.6s ease-out forwards",
      },
      boxShadow: {
        // Ombres plus chaudes, en accord avec la palette
        premium: "0 10px 40px -10px rgba(184, 115, 51, 0.30)", // cuivre
        "premium-brick": "0 10px 40px -10px rgba(185, 28, 28, 0.35)",
        crafted: "0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(10,37,64,0.15)",
      },
      backgroundImage: {
        // Trame plan technique (façon BIM/blueprint) — fines lignes pétrole
        "blueprint":
          "linear-gradient(rgba(10,37,64,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,37,64,0.06) 1px, transparent 1px)",
        // Hachure copper subtle
        "hatch":
          "repeating-linear-gradient(135deg, rgba(184,115,51,0.04) 0 2px, transparent 2px 8px)",
      },
      backgroundSize: {
        "blueprint-sm": "24px 24px",
        "blueprint-lg": "48px 48px",
      },
      letterSpacing: {
        "tight-pro": "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
