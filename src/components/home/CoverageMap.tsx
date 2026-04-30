"use client";

/**
 * Carte simplifiée de l'Île-de-France.
 * Pas une géographie exacte — un schéma stylisé en damier hexagonal +
 * ronds pour villes couvertes. Effet "dispatch logistique".
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { ZONES } from "@/lib/zones";
import { cn } from "@/lib/utils";

// Coordonnées approximatives (en pourcentage du SVG 800x500)
const CITY_POINTS: Record<string, { x: number; y: number; size?: "lg" | "md" | "sm" }> = {
  "paris-11": { x: 50, y: 50, size: "lg" },
  "paris-15": { x: 47, y: 53, size: "lg" },
  "boulogne-billancourt": { x: 41, y: 56 },
  versailles: { x: 30, y: 62 },
  "saint-denis": { x: 52, y: 38, size: "md" },
  creteil: { x: 60, y: 60 },
};

export function CoverageMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      aria-label="Zone d'intervention"
      className="container-prose py-20"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <span className="tag-spec">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Zone d&apos;intervention
          </span>
          <h2 className="mt-3 h-slab text-3xl font-bold text-petrol sm:text-4xl">
            Toute l&apos;Île-de-France,{" "}
            <span className="text-copper">en moins d&apos;une heure</span>
          </h2>
          <p className="mt-4 max-w-md text-graphite/70">
            Nos 12 artisans sont basés à Paris 11ᵉ. Survolez une ville pour voir
            le délai d&apos;arrivée moyen et nos services les plus demandés.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ZONES.map((z) => (
              <li key={z.slug}>
                <Link
                  href={`/zones/${z.slug}`}
                  onMouseEnter={() => setHovered(z.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "group flex items-center justify-between rounded-sm border-2 bg-white px-3 py-2 text-sm transition-all",
                    hovered === z.slug
                      ? "border-copper bg-copper/5"
                      : "border-petrol/10 hover:border-petrol/30"
                  )}
                >
                  <span className="flex items-center gap-2 font-medium text-petrol">
                    <MapPin className="h-3.5 w-3.5 text-copper" aria-hidden="true" />
                    {z.city}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-graphite/60">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {z.arrival}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SVG schématique */}
        <div className="relative w-full max-w-[520px] rounded-md border-2 border-petrol/10 bg-white p-4 shadow-crafted lg:w-[520px]">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-slab text-xs font-semibold uppercase tracking-wider text-petrol/60">
              Île-de-France · Schéma de couverture
            </p>
            <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          </div>
          <svg
            viewBox="0 0 100 70"
            className="w-full h-auto"
            role="img"
            aria-label="Schéma simplifié des zones d'intervention en Île-de-France"
          >
            {/* Hex grid blueprint */}
            <defs>
              <pattern id="hex" width="6" height="5.2" patternUnits="userSpaceOnUse">
                <polygon
                  points="3,0 6,1.7 6,3.7 3,5.4 0,3.7 0,1.7"
                  fill="none"
                  stroke="#0A2540"
                  strokeWidth="0.08"
                  opacity="0.18"
                />
              </pattern>
              <radialGradient id="city-glow">
                <stop offset="0%" stopColor="#B87333" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B87333" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="100" height="70" fill="#F5F1EA" />
            <rect width="100" height="70" fill="url(#hex)" />

            {/* Silhouette IDF abstraite (forme convexe stylisée) */}
            <path
              d="M 18 32 Q 22 18 38 16 L 62 14 Q 78 18 84 30 Q 88 44 82 56 Q 70 64 50 65 Q 30 64 20 54 Q 14 44 18 32 Z"
              fill="#0A2540"
              fillOpacity="0.04"
              stroke="#0A2540"
              strokeOpacity="0.25"
              strokeWidth="0.4"
              strokeDasharray="1.5 1"
            />

            {/* Paris label/box */}
            <rect
              x="42"
              y="44"
              width="16"
              height="14"
              fill="#B87333"
              fillOpacity="0.06"
              stroke="#B87333"
              strokeOpacity="0.4"
              strokeWidth="0.3"
              strokeDasharray="0.8 0.6"
            />
            <text
              x="50"
              y="42"
              textAnchor="middle"
              fontSize="2.4"
              fontWeight="700"
              fill="#0A2540"
              fontFamily="ui-monospace, monospace"
            >
              PARIS
            </text>

            {/* Cities */}
            {ZONES.map((z) => {
              const p = CITY_POINTS[z.slug];
              if (!p) return null;
              const r = p.size === "lg" ? 1.6 : p.size === "md" ? 1.3 : 1.1;
              const isActive = hovered === z.slug;
              return (
                <g key={z.slug}>
                  {isActive && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={6}
                      fill="url(#city-glow)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r + 0.4}
                    fill="#fff"
                    stroke="#B87333"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r * 0.5}
                    fill="#B87333"
                  />
                  <text
                    x={p.x}
                    y={p.y - r - 1}
                    textAnchor="middle"
                    fontSize="1.6"
                    fontWeight="600"
                    fill={isActive ? "#B87333" : "#0A2540"}
                    fontFamily="system-ui, sans-serif"
                  >
                    {z.city.replace("Paris ", "P")}
                  </text>
                </g>
              );
            })}

            {/* Camion central (icône schématique) */}
            <g transform="translate(48 50)">
              <rect x="-2" y="-1" width="4" height="2.5" fill="#B91C1C" />
              <circle cx="-1" cy="1.8" r="0.5" fill="#0A2540" />
              <circle cx="1" cy="1.8" r="0.5" fill="#0A2540" />
            </g>
          </svg>

          <p className="mt-2 text-center text-[10px] text-graphite/50">
            Schéma indicatif — temps d&apos;intervention moyen, hors heures de pointe.
          </p>
        </div>
      </div>
    </section>
  );
}
