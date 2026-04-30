import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Info, ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs plomberie · Grille publique transparente",
  description:
    "Tous nos tarifs plombier en clair : déplacement, dépannage, urgence, installation. Sans surprise, sans frais cachés. Devis gratuit en 60s.",
  alternates: { canonical: "/tarifs" },
};

const PRICING = [
  {
    cat: "Dépannage courant",
    items: [
      ["Déplacement + diagnostic (jour)", "60 €"],
      ["Déplacement + diagnostic (urgence/nuit)", "95 €"],
      ["Réparation fuite robinet", "90 – 140 €"],
      ["Remplacement mécanisme WC", "110 – 180 €"],
      ["Débouchage évier (furet)", "90 – 140 €"],
      ["Débouchage WC", "120 – 180 €"],
    ],
  },
  {
    cat: "Recherche de fuite",
    items: [
      ["Recherche non destructive (caméra thermique)", "180 – 280 €"],
      ["Inspection endoscopique", "150 – 230 €"],
      ["Détection acoustique", "200 – 320 €"],
      ["Réparation après détection", "Sur devis"],
    ],
  },
  {
    cat: "Chauffage & chaudière",
    items: [
      ["Entretien annuel chaudière (avec certificat)", "120 – 160 €"],
      ["Dépannage chaudière", "150 – 350 €"],
      ["Désembouage circuit", "450 – 750 €"],
      ["Remplacement chaudière gaz", "À partir de 2 500 €"],
    ],
  },
  {
    cat: "Installation & rénovation",
    items: [
      ["Pose mitigeur", "120 – 180 €"],
      ["Installation cumulus 100L", "350 – 500 €"],
      ["Pose WC suspendu", "650 – 950 €"],
      ["Salle de bain complète", "Sur devis (à partir de 4 800 €)"],
    ],
  },
];

export default function TarifsPage() {
  return (
    <main>
      <section className="relative bg-chalk py-14 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-blueprint bg-blueprint-lg opacity-50" />
        <div className="container-prose relative text-center">
          <span className="tag-spec">Grille publique</span>
          <h1 className="mt-4 h-slab text-balance text-4xl font-bold text-petrol sm:text-5xl">
            Tarifs <span className="text-copper">en clair</span>, sans surprise
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-graphite/70">
            Tous nos prix sont publics. Pas de frais cachés, pas de
            « ça dépendra ». Le devis IA affine ces fourchettes en 60 secondes
            selon votre situation précise.
          </p>
        </div>
      </section>

      <section className="container-prose py-16">
        <div className="space-y-10">
          {PRICING.map((cat) => (
            <article key={cat.cat} className="overflow-hidden rounded-md border-2 border-petrol/10 bg-white">
              <header className="flex items-center justify-between border-b-2 border-petrol/10 bg-petrol px-6 py-3 text-white">
                <h2 className="font-slab text-lg font-bold">{cat.cat}</h2>
                <span className="font-mono text-xs text-white/60">
                  {cat.items.length} prestations
                </span>
              </header>
              <ul className="divide-y divide-petrol/10">
                {cat.items.map(([label, price]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between gap-4 px-6 py-3 text-sm transition-colors hover:bg-chalk/60"
                  >
                    <span className="flex items-center gap-2 text-graphite/80">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      {label}
                    </span>
                    <span className="font-slab font-bold text-petrol whitespace-nowrap">
                      {price}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-md border-2 border-copper/30 bg-copper/5 p-5">
          <p className="flex items-start gap-3 text-sm text-graphite/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
            <span>
              <strong className="text-petrol">Tarifs TVA 10% incluse</strong>{" "}
              (taux travaux d&apos;amélioration logement). Majoration urgence
              (nuit 20h–7h, dimanche, jour férié) plafonnée à <strong>+60%</strong>.
              Les fourchettes intègrent les pièces standards. Le devis détaillé
              vous est remis avant toute intervention — vous pouvez refuser sans
              frais.
            </span>
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <h2 className="h-slab text-2xl font-bold text-petrol">
            Besoin d&apos;une estimation précise ?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/devis" className="btn-primary">
              Devis IA personnalisé
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="tel:+33970000000" className="btn-emergency">
              <Phone className="h-4 w-4" aria-hidden="true" />
              09 70 00 00 00
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
