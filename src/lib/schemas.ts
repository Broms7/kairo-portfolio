import { z } from "zod";

export const issueTypeSchema = z.enum([
  "fuite",
  "debouchage",
  "chauffage",
  "installation",
]);

export const urgencySchema = z.enum(["immediate", "24h", "planned"]);

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const zipRegex = /^\d{5}$/;

export const quoteFormSchema = z.object({
  issueType: issueTypeSchema,
  urgency: urgencySchema,
  details: z.string().max(500).optional(),
  zipCode: z.string().regex(zipRegex, "Code postal invalide (5 chiffres)"),
  fullName: z
    .string()
    .min(2, "Nom trop court")
    .max(80, "Nom trop long"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(phoneRegex, "Numéro de téléphone français invalide"),
  consent: z
    .boolean()
    .refine((v) => v === true, "Consentement requis"),
});

export type QuoteFormInput = z.infer<typeof quoteFormSchema>;

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  hasAttachment: z.boolean().optional(),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
