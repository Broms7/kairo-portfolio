export type IssueType =
  | "fuite"
  | "debouchage"
  | "chauffage"
  | "installation";

export type Urgency = "immediate" | "24h" | "planned";

export type LeadStatus =
  | "NEW_AI_LEAD"
  | "QUALIFIED"
  | "IN_PROGRESS"
  | "EN_ROUTE"
  | "COMPLETED";

export interface Lead {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  issueType: IssueType;
  urgency: Urgency;
  details?: string;
  status: LeadStatus;
}

export interface Quote {
  quoteId: string;
  leadId: string;
  priceMin: number;
  priceMax: number;
  estimatedArrival: string;
  status: "CRM_UPDATED" | "PENDING" | "FAILED";
  breakdown: { label: string; amount: number }[];
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  attachment?: {
    type: "image";
    name: string;
    simulatedAnalysis?: string;
  };
  isTyping?: boolean;
}
