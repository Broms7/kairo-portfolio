import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/schemas";
import { computePriceRange, estimateArrivalLabel } from "@/lib/pricing";
import { sleep } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "INVALID_JSON", message: "Corps de requête illisible." },
      { status: 400 }
    );
  }

  const parsed = quoteFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "VALIDATION_ERROR",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // Simulate DB write + CRM webhook latency
  await sleep(2000);

  const { issueType, urgency, fullName, email, phone, zipCode } = parsed.data;
  const { min, max, breakdown } = computePriceRange(issueType, urgency);

  const leadId = `lead_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
  const quoteId = `qte_${Date.now().toString(36)}`;

  return NextResponse.json(
    {
      ok: true,
      status: "CRM_UPDATED",
      quoteId,
      leadId,
      priceRange: { min, max, currency: "EUR" },
      estimatedArrival: estimateArrivalLabel(urgency),
      breakdown,
      lead: {
        fullName,
        email,
        phone: phone.replace(/\s/g, ""),
        zipCode,
        issueType,
        urgency,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        webhooksTriggered: ["crm.lead.created", "sms.notification.artisan"],
        processingMs: 2000,
      },
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "METHOD_NOT_ALLOWED", message: "Use POST." },
    { status: 405 }
  );
}
