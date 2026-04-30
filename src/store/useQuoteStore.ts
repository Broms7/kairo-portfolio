"use client";

import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { IssueType, Urgency, Quote } from "@/types";

export type QuoteStep = 1 | 2 | 3 | 4 | 5 | 6;

export type QuoteStatus = "idle" | "submitting" | "success" | "error";

interface QuoteFields {
  issueType: IssueType | null;
  details: string;
  urgency: Urgency | null;
  zipCode: string;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface QuoteState extends QuoteFields {
  step: QuoteStep;
  status: QuoteStatus;
  errorMessage: string | null;
  result: Quote | null;

  setStep: (step: QuoteStep) => void;
  next: () => void;
  prev: () => void;
  updateField: <K extends keyof QuoteFields>(key: K, value: QuoteFields[K]) => void;
  reset: () => void;
  submitQuoteToAPI: () => Promise<void>;
}

const initialFields: QuoteFields = {
  issueType: null,
  details: "",
  urgency: null,
  zipCode: "",
  fullName: "",
  email: "",
  phone: "",
  consent: false,
};

export const useQuoteStore = create<QuoteState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialFields,
        step: 1,
        status: "idle",
        errorMessage: null,
        result: null,

        setStep: (step) => set({ step }, false, "quote/setStep"),

        next: () =>
          set(
            (s) => ({ step: Math.min(6, s.step + 1) as QuoteStep }),
            false,
            "quote/next"
          ),

        prev: () =>
          set(
            (s) => ({ step: Math.max(1, s.step - 1) as QuoteStep }),
            false,
            "quote/prev"
          ),

        updateField: (key, value) =>
          set(
            { [key]: value } as Partial<QuoteState>,
            false,
            `quote/update:${String(key)}`
          ),

        reset: () =>
          set(
            {
              ...initialFields,
              step: 1,
              status: "idle",
              errorMessage: null,
              result: null,
            },
            false,
            "quote/reset"
          ),

        submitQuoteToAPI: async () => {
          const s = get();
          set(
            { status: "submitting", errorMessage: null, step: 5 },
            false,
            "quote/submit:start"
          );

          try {
            const res = await fetch("/api/quote", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                issueType: s.issueType,
                urgency: s.urgency,
                details: s.details || undefined,
                zipCode: s.zipCode,
                fullName: s.fullName,
                email: s.email,
                phone: s.phone,
                consent: s.consent,
              }),
            });

            const data = await res.json();

            if (!res.ok || !data.ok) {
              set(
                {
                  status: "error",
                  errorMessage:
                    data?.message ?? "Une erreur est survenue. Réessayez.",
                  step: 4,
                },
                false,
                "quote/submit:error"
              );
              return;
            }

            const quote: Quote = {
              quoteId: data.quoteId,
              leadId: data.leadId,
              priceMin: data.priceRange.min,
              priceMax: data.priceRange.max,
              estimatedArrival: data.estimatedArrival,
              status: data.status,
              breakdown: data.breakdown,
              generatedAt: data.meta.generatedAt,
            };

            set(
              { status: "success", result: quote, step: 6 },
              false,
              "quote/submit:success"
            );
          } catch (err) {
            set(
              {
                status: "error",
                errorMessage:
                  err instanceof Error ? err.message : "Erreur réseau.",
                step: 4,
              },
              false,
              "quote/submit:catch"
            );
          }
        },
      }),
      {
        name: "plomberie-express:quote",
        version: 1,
        storage: createJSONStorage(() => localStorage),
        // ne persister que les champs utiles, pas le statut transitoire
        partialize: (state) => ({
          step: state.step,
          issueType: state.issueType,
          details: state.details,
          urgency: state.urgency,
          zipCode: state.zipCode,
          fullName: state.fullName,
          email: state.email,
          phone: state.phone,
          consent: state.consent,
          result: state.result,
        }),
      }
    ),
    { name: "QuoteStore" }
  )
);

// Convenience selectors
export const selectCanProceed = (s: QuoteState): boolean => {
  switch (s.step) {
    case 1:
      return s.issueType !== null;
    case 2:
      return true;
    case 3:
      return s.urgency !== null;
    case 4:
      return (
        /^\d{5}$/.test(s.zipCode) &&
        s.fullName.trim().length >= 2 &&
        /^\S+@\S+\.\S+$/.test(s.email) &&
        s.phone.trim().length >= 9 &&
        s.consent
      );
    default:
      return false;
  }
};
