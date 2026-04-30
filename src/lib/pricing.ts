import type { IssueType, Urgency } from "@/types";

const BASE_PRICE: Record<IssueType, [number, number]> = {
  fuite: [120, 280],
  debouchage: [90, 220],
  chauffage: [150, 450],
  installation: [200, 800],
};

const URGENCY_MULTIPLIER: Record<Urgency, number> = {
  immediate: 1.6,
  "24h": 1.15,
  planned: 1.0,
};

export function computePriceRange(
  issueType: IssueType,
  urgency: Urgency
): { min: number; max: number; breakdown: { label: string; amount: number }[] } {
  const [baseMin, baseMax] = BASE_PRICE[issueType];
  const mult = URGENCY_MULTIPLIER[urgency];
  const min = Math.round(baseMin * mult);
  const max = Math.round(baseMax * mult);

  // Ventilation déterministe — somme = milieu de fourchette, jamais négative
  const mid = Math.round((min + max) / 2);
  const callout = 60;                                 // Déplacement & diagnostic
  const parts = Math.max(20, Math.round(mid * 0.18)); // Pièces & fournitures (~18%, plancher 20€)
  const surcharge = Math.max(
    0,
    Math.round(((mult - 1) * (baseMin + baseMax)) / 2)
  );
  const labour = Math.max(40, mid - callout - parts - surcharge); // toujours ≥ 40€

  const breakdown = [
    { label: "Déplacement & diagnostic", amount: callout },
    { label: "Main d'œuvre estimée", amount: labour },
    { label: "Pièces & fournitures", amount: parts },
  ];
  if (surcharge > 0) {
    breakdown.push({ label: "Majoration urgence", amount: surcharge });
  }

  return { min, max, breakdown };
}

export function estimateArrivalLabel(urgency: Urgency): string {
  switch (urgency) {
    case "immediate":
      return "Sous 60 minutes";
    case "24h":
      return "Sous 24 heures";
    case "planned":
      return "Sur rendez-vous (3–5 jours)";
  }
}
