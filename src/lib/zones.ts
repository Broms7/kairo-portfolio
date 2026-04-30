/**
 * Zones d'intervention — pages locales SEO.
 * Chaque entrée génère une route /zones/[slug] dynamique.
 */
export interface Zone {
  slug: string;
  city: string;
  postalCodes: string[];
  arrival: string; // délai moyen
  intro: string;
  popularServices: string[];
}

export const ZONES: Zone[] = [
  {
    slug: "paris-11",
    city: "Paris 11ᵉ",
    postalCodes: ["75011"],
    arrival: "30 min",
    intro:
      "Quartier dense, immeubles haussmanniens et lofts industriels — nos plombiers connaissent les contraintes spécifiques du 11ᵉ : colonnes vétustes, accès difficile, copropriétés exigeantes.",
    popularServices: ["Recherche de fuite", "Débouchage WC", "Dégorgement copropriété"],
  },
  {
    slug: "paris-15",
    city: "Paris 15ᵉ",
    postalCodes: ["75015"],
    arrival: "30 min",
    intro:
      "Le 15ᵉ arrondissement combine résidences modernes et immeubles anciens. Notre équipe intervient quotidiennement de la Tour Eiffel à Convention.",
    popularServices: ["Chaudière gaz", "Cumulus", "Recherche de fuite"],
  },
  {
    slug: "boulogne-billancourt",
    city: "Boulogne-Billancourt",
    postalCodes: ["92100"],
    arrival: "40 min",
    intro:
      "Boulogne-Billancourt et ses immeubles récents : nous maîtrisons les installations contemporaines comme les rénovations d'anciens hôtels particuliers.",
    popularServices: ["Installation salle de bain", "Mitigeur thermostatique", "Désembouage"],
  },
  {
    slug: "versailles",
    city: "Versailles",
    postalCodes: ["78000"],
    arrival: "50 min",
    intro:
      "Versailles : maisons individuelles, demeures de caractère, copropriétés. Nos compagnons plombiers respectent l'esthétique des bâtiments classés.",
    popularServices: ["Chauffe-eau", "Robinetterie", "Recherche de fuite"],
  },
  {
    slug: "saint-denis",
    city: "Saint-Denis",
    postalCodes: ["93200", "93210"],
    arrival: "45 min",
    intro:
      "Saint-Denis, du centre historique aux Docks : interventions résidentielles et tertiaires, urgences 24/7.",
    popularServices: ["Débouchage canalisation", "Chaudière", "Fuite"],
  },
  {
    slug: "creteil",
    city: "Créteil",
    postalCodes: ["94000"],
    arrival: "55 min",
    intro:
      "Créteil et ses grandes copropriétés : nous intervenons rapidement, en bonne entente avec les syndics et gardiens.",
    popularServices: ["Dégorgement copropriété", "Recherche de fuite", "Cumulus"],
  },
];

export function findZone(slug: string): Zone | undefined {
  return ZONES.find((z) => z.slug === slug);
}
