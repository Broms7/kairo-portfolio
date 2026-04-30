import type { MetadataRoute } from "next";
import { ZONES } from "@/lib/zones";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://plomberie-express.kairo.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE_URL}/services`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE_URL}/devis`, lastModified: now, priority: 0.95, changeFrequency: "monthly" },
    { url: `${SITE_URL}/tarifs`, lastModified: now, priority: 0.85, changeFrequency: "monthly" },
    { url: `${SITE_URL}/conseils`, lastModified: now, priority: 0.7, changeFrequency: "weekly" },
    { url: `${SITE_URL}/a-propos`, lastModified: now, priority: 0.5, changeFrequency: "yearly" },
    { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.5, changeFrequency: "yearly" },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, priority: 0.2 },
  ];

  const zoneRoutes: MetadataRoute.Sitemap = ZONES.map((z) => ({
    url: `${SITE_URL}/zones/${z.slug}`,
    lastModified: now,
    priority: 0.75,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...zoneRoutes];
}
