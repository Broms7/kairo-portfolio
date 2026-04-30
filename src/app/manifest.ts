import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plomberie Express",
    short_name: "Plomberie Express",
    description: "Plombier 24/7 en Île-de-France — devis instantané, intervention rapide",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1EA",
    theme_color: "#0A2540",
    orientation: "portrait",
    lang: "fr-FR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    categories: ["business", "lifestyle"],
  };
}
