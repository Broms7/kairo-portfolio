import type { LeadStatus } from "@/types";

export interface KanbanCard {
  id: string;
  customerName: string;
  issue: string;
  zipCode: string;
  priceMin: number;
  priceMax: number;
  urgency: "immediate" | "24h" | "planned";
  status: LeadStatus;
  createdAt: string;
  source: "ai_chat" | "ai_form" | "phone" | "web";
  isFresh?: boolean;
}

export const KANBAN_COLUMNS: { id: LeadStatus; label: string; tone: string }[] = [
  { id: "NEW_AI_LEAD", label: "Nouveaux Leads IA", tone: "blue" },
  { id: "EN_ROUTE", label: "En Déplacement", tone: "orange" },
  { id: "COMPLETED", label: "Terminé", tone: "emerald" },
];

export const MOCK_CARDS: KanbanCard[] = [
  {
    id: "lead_001",
    customerName: "Marie Dubois",
    issue: "Fuite robinet cuisine",
    zipCode: "75011",
    priceMin: 140,
    priceMax: 220,
    urgency: "24h",
    status: "NEW_AI_LEAD",
    createdAt: new Date(Date.now() - 8 * 60_000).toISOString(),
    source: "ai_chat",
  },
  {
    id: "lead_002",
    customerName: "Ahmed Belkacem",
    issue: "WC bouché — appartement",
    zipCode: "92100",
    priceMin: 110,
    priceMax: 180,
    urgency: "24h",
    status: "NEW_AI_LEAD",
    createdAt: new Date(Date.now() - 22 * 60_000).toISOString(),
    source: "ai_form",
  },
  {
    id: "lead_003",
    customerName: "Camille Roy",
    issue: "Recherche fuite plafond",
    zipCode: "75015",
    priceMin: 240,
    priceMax: 380,
    urgency: "immediate",
    status: "EN_ROUTE",
    createdAt: new Date(Date.now() - 45 * 60_000).toISOString(),
    source: "ai_chat",
  },
  {
    id: "lead_004",
    customerName: "Pierre Lambert",
    issue: "Chaudière ne s'allume plus",
    zipCode: "94200",
    priceMin: 180,
    priceMax: 320,
    urgency: "24h",
    status: "EN_ROUTE",
    createdAt: new Date(Date.now() - 62 * 60_000).toISOString(),
    source: "phone",
  },
  {
    id: "lead_005",
    customerName: "Sophie Martin",
    issue: "Installation mitigeur lavabo",
    zipCode: "78000",
    priceMin: 200,
    priceMax: 280,
    urgency: "planned",
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 4 * 60 * 60_000).toISOString(),
    source: "web",
  },
  {
    id: "lead_006",
    customerName: "Laurent Petit",
    issue: "Débouchage canalisation",
    zipCode: "93200",
    priceMin: 130,
    priceMax: 200,
    urgency: "24h",
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 6 * 60 * 60_000).toISOString(),
    source: "ai_chat",
  },
];

export interface AdminNotif {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  tone: "blue" | "orange" | "emerald" | "gold";
}

export const MOCK_NOTIFS: AdminNotif[] = [
  {
    id: "n1",
    title: "Nouveau devis IA généré",
    detail: "Jean D. — Fuite urgente — 250€",
    timeAgo: "il y a 2 min",
    tone: "gold",
  },
  {
    id: "n2",
    title: "Lead qualifié automatiquement",
    detail: "Marie D. — Chatbot Vision AI",
    timeAgo: "il y a 8 min",
    tone: "blue",
  },
  {
    id: "n3",
    title: "Intervention validée",
    detail: "Sophie M. — Paiement reçu",
    timeAgo: "il y a 1 h",
    tone: "emerald",
  },
  {
    id: "n4",
    title: "SMS envoyé au technicien",
    detail: "Camille R. — En route 75015",
    timeAgo: "il y a 3 h",
    tone: "orange",
  },
];
