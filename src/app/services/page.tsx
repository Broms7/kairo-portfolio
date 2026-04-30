import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplet,
  Pipette,
  Flame,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services de plomberie · Dépannage, urgence, installation",
  description:
    "Recherche de fuite, débouchage, dépannage chaudière, installation sanitaire. Plomberie Express intervient en Île-de-France 24/7.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    id: "fuite",
    label: "Recherche & réparation de fuite",
    icon: Droplet,
    accent: "from-blue-500/15 to-blue-500/5 text-blue-600",
    intro:
      "Une fuite non traitée peut causer plusieurs milliers d'euros de dégâts en quelques jours. Notre équipement de détection non destructive identifie la source sans casser vos murs.",
    items: [
      "Caméra thermique haute définition",
      "Inspection endoscopique",
      "Détection acoustique de fuite cachée",
      "Réparation cuivre / PER / multicouche",
      "Diagnostic d'humidité après intervention",
    ],
    priceFrom: 120,
  },
  {
    id: "debouchage",
    label: "Débouchage de canalisation",
    icon: Pipette,
    accent: "from-cyan-500/15 to-cyan-500/5 text-cyan-600",
    intro:
      "Évier, WC, douche, baignoire ou canalisation principale : nous intervenons rapidement avec du matériel professionnel adapté à chaque obstruction.",
    items: [
      "Furet électrique haute pression",
      "Hydrocureur 200 bars (canalisation principale)",
      "Inspection vidéo après débouchage",
      "Conseils anti-récidive personnalisés",
    ],
    priceFrom: 90,
  },
  {
    id: "chauffage",
    label: "Chauffage & chaudière",
    icon: Flame,
    accent: "from-orange-500/15 to-orange-500/5 text-orange-600",
    intro:
      "Dépannage urgent ou entretien annuel obligatoire : nos techniciens sont formés sur toutes les marques majeures (Frisquet, Saunier Duval, Vaillant, ELM Leblanc, Atlantic, Viessmann).",
    items: [
      "Dépannage chaudière gaz / fioul",
      "Entretien annuel (certificat fourni)",
      "Remplacement chaudière (devis sur mesure)",
      "Désembouage circuit de chauffage",
      "Mise en service eau chaude / chauffage",
    ],
    priceFrom: 150,
  },
  {
    id: "installation",
    label: "Installation sanitaire",
    icon: Wrench,
    accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
    intro:
      "De la simple robinetterie à la rénovation complète d'une salle de bain : nous coordonnons l'ensemble de votre projet, des plans à la mise en eau.",
    items: [
      "Salle de bain clés en main",
      "Pose de WC suspendu / cuvette",
      "Installation cumulus / chauffe-eau",
      "Robinetterie & mitigeurs thermostatiques",
      "Création / déplacement d'arrivées d'eau",
    ],
    priceFrom: 200,
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="relative bg-chalk py-14 sm:py-20"><div aria-hidden className="absolute inset-0 bg-blueprint bg-blueprint-lg opacity-50" />
        <div className="container-prose text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Nos services de plomberie
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-600">
            Une expertise complète pour tous vos besoins, du dépannage urgent à
            la rénovation. Tarifs transparents, sans surprise.
          </p>
        </div>
      </section>

      <div className="container-prose space-y-16 py-16">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          const reversed = idx % 2 === 1;
          return (
            <article
              key={s.id}
              id={s.id}
              className="grid scroll-mt-32 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-sm border-2 ${s.accent}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy">
                  {s.label}
                </h2>
                <p className="mt-3 text-slate-600">{s.intro}</p>
                <ul className="mt-5 space-y-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link href="/devis" className="btn-primary">
                    Devis pour ce service
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <span className="text-sm text-slate-500">
                    À partir de{" "}
                    <strong className="text-brand-navy">{s.priceFrom}€</strong>
                  </span>
                </div>
              </div>

              <div className={reversed ? "lg:order-1" : ""}>
                <div className="relative overflow-hidden rounded-md border-2 border-petrol/10 bg-white p-10">
                  <div aria-hidden="true" className="absolute inset-0 bg-blueprint bg-blueprint-sm opacity-40" />
                  <div className="relative flex flex-col items-center justify-center gap-3 py-10 text-copper/40">
                    <Icon className="h-32 w-32" aria-hidden="true" />
                    <span className="font-slab text-sm font-semibold uppercase tracking-wider text-petrol/60">
                      {s.label}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
