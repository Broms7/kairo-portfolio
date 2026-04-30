import { NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/schemas";
import { sleep } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TriageRule {
  keywords: string[];
  reply: string;
  urgency: "immediate" | "24h" | "planned";
  suggestIssue?: "fuite" | "debouchage" | "chauffage" | "installation";
}

const TRIAGE_RULES: TriageRule[] = [
  {
    keywords: ["inondation", "inonde", "déluge", "noyé"],
    reply:
      "Situation critique détectée. Coupez l'arrivée d'eau générale immédiatement. Un plombier d'urgence peut être chez vous sous 60 minutes — souhaitez-vous lancer le devis express ?",
    urgency: "immediate",
    suggestIssue: "fuite",
  },
  {
    keywords: ["fuite", "goutte", "goutte à goutte", "humidité", "tuyau percé"],
    reply:
      "J'ai bien identifié une fuite. Pour affiner le devis : la fuite est-elle visible (tuyau apparent) ou cachée (mur / plafond) ? Vous pouvez aussi joindre une photo via le trombone.",
    urgency: "24h",
    suggestIssue: "fuite",
  },
  {
    keywords: ["bouché", "bouchée", "évier", "wc", "toilette", "écoulement"],
    reply:
      "Débouchage compris. Évier, WC, douche ou canalisation principale ? Je peux vous proposer un créneau dans les 24h.",
    urgency: "24h",
    suggestIssue: "debouchage",
  },
  {
    keywords: ["chaudière", "chauffage", "radiateur", "froid", "pas d'eau chaude"],
    reply:
      "Souci de chauffage / eau chaude noté. Un diagnostic chaudière est recommandé. Souhaitez-vous un rendez-vous planifié ou une intervention rapide ?",
    urgency: "24h",
    suggestIssue: "chauffage",
  },
  {
    keywords: ["installation", "poser", "remplacer", "nouveau", "salle de bain"],
    reply:
      "Pour une installation, nous établissons un devis sur mesure. Pouvez-vous me dire le type d'équipement (lavabo, douche, WC, mitigeur...) ?",
    urgency: "planned",
    suggestIssue: "installation",
  },
];

const FALLBACK_REPLY =
  "Merci pour votre message. Pour vous orienter au mieux, pouvez-vous préciser : s'agit-il d'une fuite, d'un bouchage, d'un problème de chauffage ou d'une installation ? Vous pouvez aussi lancer le devis IA en haut de la page.";

function matchRule(message: string): TriageRule | null {
  const lower = message.toLowerCase();
  for (const rule of TRIAGE_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule;
  }
  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { message, hasAttachment } = parsed.data;

  // Simulate LLM round-trip latency (variable)
  await sleep(700 + Math.random() * 900);

  // Vision AI illusion: if attachment, override response
  if (hasAttachment) {
    return NextResponse.json({
      ok: true,
      reply:
        "Analyse de l'image en cours... Je détecte un tuyau en cuivre percé avec corrosion localisée. Je majore l'urgence : intervention recommandée sous 2h.",
      urgency: "immediate",
      suggestIssue: "fuite",
      vision: {
        detected: ["cuivre", "perforation", "corrosion"],
        confidence: 0.92,
      },
      meta: {
        model: "kairo-vision-mock-v1",
        latencyMs: 1400,
      },
    });
  }

  const rule = matchRule(message);
  return NextResponse.json({
    ok: true,
    reply: rule?.reply ?? FALLBACK_REPLY,
    urgency: rule?.urgency ?? "planned",
    suggestIssue: rule?.suggestIssue,
    meta: {
      model: "kairo-triage-mock-v1",
      matched: Boolean(rule),
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "METHOD_NOT_ALLOWED", message: "Use POST." },
    { status: 405 }
  );
}
