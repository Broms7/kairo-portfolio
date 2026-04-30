import type { Metadata } from "next";
import { QuoteSimulator } from "@/components/quote/QuoteSimulator";
import { ShieldCheck, Clock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Devis IA gratuit en 60 secondes",
  description:
    "Obtenez un devis plomberie instantané grâce à notre simulateur IA. Sans engagement, sans inscription. Intervention sous 1h en urgence.",
  alternates: { canonical: "/devis" },
};

export default function DevisPage() {
  return (
    <main>
      <section className="relative bg-petrol py-12 text-white sm:py-16"><div aria-hidden className="absolute inset-0 bg-blueprint bg-blueprint-sm opacity-15" />
        <div className="container-prose relative text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Votre devis en 60 secondes
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Notre IA analyse votre demande et génère une estimation transparente,
            instantanément.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <li className="inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="h-4 w-4 text-kairo-gold" aria-hidden="true" />
              Sous 60 secondes
            </li>
            <li className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-kairo-gold" aria-hidden="true" />
              0€ engagement
            </li>
            <li className="inline-flex items-center gap-1.5 text-slate-300">
              <Award className="h-4 w-4 text-kairo-gold" aria-hidden="true" />
              Artisans certifiés
            </li>
          </ul>
        </div>
      </section>

      <section className="container-prose -mt-8 pb-20">
        <QuoteSimulator />
      </section>
    </main>
  );
}
