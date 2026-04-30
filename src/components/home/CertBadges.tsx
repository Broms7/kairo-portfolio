/**
 * Bandeau de certifications — SVG locaux pour rester offline & rapide.
 * Look "tampon officiel" pour signaler la légitimité métier.
 */

import { Check } from "lucide-react";

const CERTS = [
  {
    id: "rge",
    label: "RGE",
    sub: "Reconnu Garant\nde l'Environnement",
    color: "#0A8A4D",
  },
  {
    id: "qualibat",
    label: "Qualibat",
    sub: "Certification\n8211",
    color: "#005EAA",
  },
  {
    id: "pg",
    label: "PG",
    sub: "Professionnel\nGaz",
    color: "#D4A017",
  },
  {
    id: "decennale",
    label: "Décennale",
    sub: "MAAF Pro\nactive 2024+",
    color: "#0A2540",
  },
  {
    id: "capeb",
    label: "CAPEB",
    sub: "Membre\nIle-de-France",
    color: "#B91C1C",
  },
];

export function CertBadges() {
  return (
    <section
      aria-label="Certifications et garanties"
      className="border-y-2 border-petrol/10 bg-chalk"
    >
      <div className="container-prose py-10">
        <p className="mb-6 text-center font-slab text-xs font-semibold uppercase tracking-[0.18em] text-petrol/60">
          Certifications &amp; garanties officielles
        </p>
        <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {CERTS.map((c) => (
            <CertStamp key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertStamp({
  label,
  sub,
  color,
}: {
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      className="group relative flex h-24 w-full max-w-[180px] items-center gap-3 rounded-sm border-2 bg-white px-3 py-2 transition-transform hover:-translate-y-0.5"
      style={{ borderColor: `${color}33` }}
    >
      {/* Tampon rond */}
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 font-slab font-extrabold uppercase"
        style={{ borderColor: color, color }}
      >
        <span className="text-sm tracking-tight">{label}</span>
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-petrol/60">
          <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
          Certifié
        </p>
        <p className="whitespace-pre-line text-xs font-medium leading-tight text-graphite/80">
          {sub}
        </p>
      </div>
    </div>
  );
}
